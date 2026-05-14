const mongoose = require('mongoose');

const DiagnosisSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageUrl: { type: String, required: true },
  status: { type: String }, // To store "PASS" or "FAIL"
  // Using Mixed allows us to store the varying AI objects directly
  predictionData: { type: mongoose.Schema.Types.Mixed }, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Diagnosis', DiagnosisSchema);