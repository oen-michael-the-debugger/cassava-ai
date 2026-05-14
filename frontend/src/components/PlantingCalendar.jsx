/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { HiSun, HiCloud, HiRefresh, HiCheck } from 'react-icons/hi';

const PlantingCalendar = () => {
  const stages = [
    {
      label: "Planting",
      month: "Mar - May",
      desc: "Select healthy stems and plant at a 45° angle.",
      icon: <HiSun className="text-orange-500" />,
      active: true,
    },
    {
      label: "Vegetative",
      month: "Jun - Aug",
      desc: "Focus on weeding and nitrogen-rich fertilizer.",
      icon: <HiCloud className="text-blue-500" />,
      active: false,
    },
    {
      label: "Rooting",
      month: "Sep - Nov",
      desc: "Tuber formation begins. Maintain soil moisture.",
      icon: <HiRefresh className="text-green-500" />,
      active: false,
    },
    {
      label: "Harvest",
      month: "Dec - Feb",
      desc: "Check for starch maturity and harvest carefully.",
      icon: <HiCheck className="text-emerald-600" />,
      active: false,
    },
  ];

  return (
    <div className="mt-10 p-8 bg-white dark:bg-slate-900 rounded-[3rem] shadow-xl border border-slate-50 dark:border-slate-800">
      <div className="mb-8">
        <h3 className="text-2xl font-black dark:text-white">Seasonal Guide</h3>
        <p className="text-slate-500">Optimized planting cycle for high-yield cassava.</p>
      </div>

      <div className="relative">
        {/* The Connection Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-100 dark:bg-slate-800 hidden md:block" />

        <div className="space-y-8">
          {stages.map((stage, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative flex flex-col md:flex-row items-start md:items-center gap-6"
            >
              {/* Icon/Indicator */}
              <div className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-lg transition-all ${
                stage.active 
                ? 'bg-green-600 text-white scale-110 ring-4 ring-green-100 dark:ring-green-900/30' 
                : 'bg-white dark:bg-slate-800 text-slate-400 border border-slate-100 dark:border-slate-700'
              }`}>
                {stage.icon}
              </div>

              {/* Content */}
              <div className="flex-1 w-full bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[2rem] border border-transparent hover:border-green-500/30 transition-all">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-black text-xl dark:text-white">{stage.label}</h4>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    stage.active ? 'bg-green-100 text-green-700' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                  }`}>
                    {stage.month}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{stage.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlantingCalendar;