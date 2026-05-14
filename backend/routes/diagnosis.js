const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const cloudinary = require('../config/cloudinary');
const Diagnosis = require('../models/Diagnosis');
const auth = require('../middleware/auth'); // Protects the route
const fs = require('fs');
const FormData = require('form-data');

// Multer Setup (Temporary storage)
const upload = multer({ dest: 'uploads/' });

/**
 * @route   POST api/diagnosis/analyze
 * @desc    Upload image, get AI prediction, and save to DB
 * @access  Private
 */
router.post('/analyze', auth, upload.single('leafImage'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No image uploaded" });

    // 1. Cloudinary Upload (Same as before)
    const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, { folder: 'cassava' });

    // 2. Call Railway AI
    const formData = new FormData();
    formData.append('file', fs.createReadStream(req.file.path));
    const aiResponse = await axios.post(process.env.AI_ENDPOINT, formData, {
      headers: { ...formData.getHeaders() }
    });

    const ai = aiResponse.data; // The whole object { status, data/message }

    // 3. Dynamic Save
    const newDiagnosis = new Diagnosis({
      userId: req.user,
      imageUrl: cloudinaryResult.secure_url,
      status: ai.status,
      // If PASS, save the data object. If FAIL, save the message object.
      predictionData: ai.status === "PASS" ? ai.data : { message: ai.message }
    });

    await newDiagnosis.save();
    fs.unlinkSync(req.file.path);
    
    res.status(200).json(newDiagnosis);
  } catch (error) {
    res.status(500).json({ msg: "Server Error", error: error.message });
  }
});

/**
 * @route   GET api/diagnosis/history
 * @desc    Get all previous scans for the logged-in user
 * @access  Private
 */
router.get('/history', auth, async (req, res) => {
  try {
    const history = await Diagnosis.find({ userId: req.user }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   GET api/diagnosis/:id
// @desc    Get a specific diagnosis by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    // Find the diagnosis in the database
    const diagnosis = await Diagnosis.findById(req.params.id);

    // 1. Check if it exists
    if (!diagnosis) {
      return res.status(404).json({ msg: 'Diagnosis record not found' });
    }

    // 2. Security Check: Ensure the person asking for it is the owner
    // diagnosis.userId is an object, so we convert to string to compare with req.user (from auth)
    if (diagnosis.userId.toString() !== req.user) {
      return res.status(401).json({ msg: 'Not authorized to view this analysis' });
    }

    // 3. Send the data to the frontend
    res.json(diagnosis);
    
  } catch (err) {
    console.error("🔥 Error fetching single diagnosis:", err.message);
    
    // If the ID is formatted wrong (too short/long), Mongoose throws an 'ObjectId' error
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Invalid ID format' });
    }
    
    res.status(500).send('Server Error');
  }
});


module.exports = router;