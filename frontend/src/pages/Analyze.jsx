/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from 'framer-motion';
import { HiUpload, HiRefresh, HiCheckCircle, HiExclamation } from 'react-icons/hi';

const Analyze = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];
  if (selectedFile) {
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    // CRITICAL: Clear the previous result so a new request can be made
    setResult(null); 
    setError(null);
  }
};

  const handleUpload = async () => {
  if (!file) return;

  setLoading(true);
  setError(null);
  // Ensure result is null before starting
  setResult(null); 

  const formData = new FormData();
  formData.append('leafImage', file);

  try {
    const token = localStorage.getItem('token');
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/diagnosis/analyze`, formData, {
      headers: { 
        'Content-Type': 'multipart/form-data',
        'x-auth-token': token 
      }
    });

    setResult(res.data);
  } catch (err) {
    console.error(err);
    setError("Analysis failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            AI Leaf <span className="text-green-600">Scanner</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Upload a clear photo of a cassava leaf for instant disease detection.
          </p>
        </div>

        {/* Upload Zone */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 text-center relative overflow-hidden">
          {!preview ? (
            <label className="cursor-pointer flex flex-col items-center py-12">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-2xl flex items-center justify-center mb-4">
                <HiUpload size={32} />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">Choose a photo</span>
              <span className="text-sm text-slate-500">or drag and drop here</span>
              <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
            </label>
          ) : (
            <div className="relative group">
              <img
                src={preview}
                alt="Preview"
                className="max-h-[400px] mx-auto rounded-2xl shadow-2xl"
              />
              <button
                onClick={() => { setPreview(null); setFile(null); }}
                className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
              >
                <HiRefresh size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Action Button */}
        {preview && !result && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            disabled={loading}
            onClick={handleUpload}
            className="w-full mt-8 py-5 bg-green-600 text-white rounded-2xl font-black text-xl shadow-xl shadow-green-600/20 hover:bg-green-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing with AI...
              </>
            ) : "Run Diagnosis"}
          </motion.button>
        )}

        {/* Result Display */}
        <AnimatePresence>
          {result && (
            <div className="mt-8 p-6 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 animate-in fade-in zoom-in duration-300">
              <img src={result.imageUrl} className="w-full h-64 object-cover rounded-[2rem] mb-6" />

              <div className="px-2">
                {result.status === "FAIL" ? (
                  <div className="text-center">
                    <h2 className="text-red-500 text-xl font-black mb-2">Invalid Image</h2>
                    <p className="text-slate-500 mb-6">{result.predictionData.message}</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <h2 className="text-3xl font-black dark:text-white mb-2">
                      {result.predictionData.name}
                    </h2>
                    <p className="text-slate-500 mb-8">
                      {result.predictionData.name === "Healthy"
                        ? "Your cassava plant appears to be in excellent condition."
                        : "We've identified potential issues that need your attention."}
                    </p>

                    <Link
                      to={`/analysis/${result._id}`}
                      className="block w-full py-5 bg-green-600 text-white rounded-2xl font-black text-lg hover:bg-green-700 transition-all shadow-lg shadow-green-600/20"
                    >
                      View Full Analysis & Treatment
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 p-6 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-2xl flex items-center gap-3"
            >
              <HiExclamation size={24} />
              <p className="font-bold">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Analyze;