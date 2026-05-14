/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { HiExclamation, HiCheckCircle, HiLightBulb, HiShieldCheck } from 'react-icons/hi';
import PlantingCalendar from '../components/PlantingCalendar';

const FullAnalysis = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const [data, setData] = useState(state?.result || null);
  const [loading, setLoading] = useState(!state?.result);

  useEffect(() => {
    // If we don't have data from the 'Link' state, fetch it from the backend
    if (!data) {
      const fetchAnalysis = async () => {
        try {
          const token = localStorage.getItem('token');
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/diagnosis/${id}`, {
            headers: { 'x-auth-token': token }
          });
          setData(res.data);
        } catch (err) {
          console.error("Error fetching analysis:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchAnalysis();
    }
  }, [id, data]);

  if (loading) return <div className="pt-32 text-center dark:text-white">Loading analysis...</div>;
  if (!data) return <div className="pt-32 text-center text-red-500">Analysis not found.</div>;

  // Now 'data' contains your predictionData (name, maintenance, solution, etc.)
  const info = data.predictionData;
  // const data = diagnosis.predictionData;
  const isHealthy = info.name === "Healthy";
  const image = data.imageUrl;

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* 1. Health Status Animation Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative overflow-hidden rounded-[3rem] p-10 mb-12 text-center border-2 ${
            isHealthy 
            ? 'border-green-500 bg-green-50/30 dark:bg-green-900/10' 
            : 'border-red-500 bg-red-50/30 dark:bg-red-900/10'
          }`}
        >
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className={`absolute inset-0 z-0 ${isHealthy ? 'bg-green-400/20' : 'bg-red-400/20'} blur-3xl`}
          />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${isHealthy ? 'bg-green-500' : 'bg-red-500'} text-white shadow-2xl`}>
              {isHealthy ? <HiShieldCheck className="text-5xl" /> : <HiExclamation className="text-5xl" />}
            </div>
            <h1 className="text-4xl md:text-6xl font-black dark:text-white uppercase tracking-tighter">
              {info.name}
            </h1>
            <p className={`mt-2 font-bold ${isHealthy ? 'text-green-600' : 'text-red-600'}`}>
              {isHealthy ? "Plant health is optimal" : "Immediate action required"}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12  gap-10">
          
          {/* Left Column: Image & Confidence */}
          <div className="lg:col-span-12 space-y-8">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-900"
            >
              <img src={image} alt="Analyzed Crop" className="w-full h-96 object-cover" />
            </motion.div>

            <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-black uppercase tracking-widest opacity-50 mb-6 dark:text-white">Analysis Confidence</h4>
              <div className="relative h-6 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(info.confidence?info.confidence:80)}%` }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className={`h-full ${info.confidence>35?"bg-green-500":"bg-orange-500"}  shadow-[0_0_20px_rgba(34,197,94,0.5)]`}
                />
              </div>
              <p className="mt-4 text-3xl font-mono font-black text-right dark:text-white">
                {(info.confidence)?.toFixed(1)||80}%
              </p>
            </div>
          </div>

          {/* Right Column: Breakdown */}
          <div className="lg:col-span-12 space-y-8">
            <section className="p-6 bg-white dark:bg-slate-900 rounded-[3rem] shadow-xl border border-slate-50 dark:border-slate-800">
              <h4 className="text-2xl font-black mb-4 dark:text-white flex items-center gap-3">
                <HiExclamation className="text-4xl rounded-full bg-red-500" /> Low Confidence Level Might Be Due To Low Picture Quality !!!
              </h4>
            </section>
            <section className="p-6 bg-white dark:bg-slate-900 rounded-[3rem] shadow-xl border border-slate-50 dark:border-slate-800">
              <h3 className="text-2xl font-black mb-4 dark:text-white flex items-center gap-3">
                <HiCheckCircle className="text-green-500" /> {isHealthy?"Maintainance":"Full Description"}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                {info.description || info.maintenance}
              </p>
            </section>

            {!isHealthy && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                  initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                  className="p-8 bg-amber-50/50 dark:bg-amber-900/10 rounded-[2.5rem] border border-amber-100 dark:border-amber-900/20"
                >
                  <h4 className="font-black text-amber-700 dark:text-amber-500 text-xl mb-4 uppercase">Common Causes</h4>
                  <p className="text-slate-700 dark:text-slate-300 leading-snug">{info.causes}</p>
                </motion.div>

                <motion.div 
                  initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                  className="p-8 bg-blue-50/50 dark:bg-blue-900/10 rounded-[2.5rem] border border-blue-100 dark:border-blue-900/20"
                >
                  <h4 className="font-black text-blue-700 dark:text-blue-500 text-xl mb-4 uppercase flex items-center gap-2">
                    <HiLightBulb /> Solutions
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300 leading-snug">{info.solution}</p>
                </motion.div>
              </div>
            )}
            
            {/* 2. Planting Calendar Section */}
            <PlantingCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullAnalysis;