/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  HiArrowRight, 
  HiChip, 
  HiLightningBolt, 
  HiShieldCheck, 
  HiGlobe,
  HiChevronLeft,
  HiChevronRight
} from 'react-icons/hi';
import Footer from '../components/Footer';

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    { 
      name: "Dr. Samuel Okoro", 
      role: "Agricultural Researcher", 
      content: "The diagnostic accuracy of CassavaAI rivals laboratory testing in the field. It's a game-changer for remote diagnostics.", 
      avatar: "https://i.pravatar.cc/150?u=sam" 
    },
    { 
      name: "Maria Gomez", 
      role: "Smallholder Farmer", 
      content: "I caught CBB early thanks to this app. It saved my entire harvest this season. Highly recommended!", 
      avatar: "https://i.pravatar.cc/150?u=maria" 
    },
    { 
      name: "Anita Chen", 
      role: "Plant Pathologist", 
      content: "The UI is intuitive, and the AI model behind it is incredibly robust. Truly the future of AgTech.", 
      avatar: "https://i.pravatar.cc/150?u=anita" 
    }
  ];

  // Slider Navigation Logic
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block py-2 px-4 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-black uppercase tracking-widest mb-6"
          >
            The Future of AgTech is Here
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white leading-[1.1] mb-6 tracking-tighter"
          >
            Detect Cassava <br />
            <span className="text-green-600">Diseases Instantly.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Upload a single leaf photo and let our trained AI provide a full diagnosis, causes, and treatment recommendations in seconds.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/analyze" className="w-full sm:w-auto px-10 py-5 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-green-600/20">
              Analyze a Leaf <HiArrowRight />
            </Link>
            <Link to="/signup" className="w-full sm:w-auto px-10 py-5 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
              Get Started Free
            </Link>
          </motion.div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] -z-0" />
      </section>

      {/* 2. ANIMATED STATS SECTION */}
      <section className="py-20 border-y border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Images Scanned", value: "1.2M+" },
              { label: "Accuracy Rate", value: "98.2%" },
              { label: "Active Farmers", value: "50k+" },
              { label: "Countries", value: "12" },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2">{stat.value}</h3>
                <p className="text-xs font-black text-green-600 uppercase tracking-[0.2em]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">3 Steps to Healthier Crops</h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">Empowering farmers with AI-driven insights that fit in their pocket.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: "01", icon: <HiLightningBolt className="text-green-600" />, title: "Snap a Photo", desc: "Take a clear picture of a single cassava leaf using your smartphone camera." },
              { step: "02", icon: <HiChip className="text-green-600" />, title: "AI Analysis", desc: "Our neural network identifies patterns of CBB, CMD, or Brown Streak instantly." },
              { step: "03", icon: <HiShieldCheck className="text-green-600" />, title: "Get Treatment", desc: "Receive biological and chemical treatment plans to save your yield." },
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="relative p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 group transition-all duration-300 shadow-sm hover:shadow-xl"
              >
                <div className="text-6xl font-black text-slate-100 dark:text-slate-800 absolute top-6 right-8 transition-colors group-hover:text-green-500/10">
                  {item.step}
                </div>
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS SLIDER WITH BUTTONS */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-12 tracking-tight">Trusted by Experts</h2>
          
          <div className="relative flex items-center justify-center">
            {/* Left Button */}
            <button 
              onClick={prevSlide}
              className="absolute -left-4 md:-left-20 z-20 p-4 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:bg-green-600 hover:text-white transition-all shadow-xl active:scale-90"
            >
              <HiChevronLeft size={24} />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full p-10 md:p-16 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl"
              >
                <p className="text-xl md:text-2xl italic text-slate-700 dark:text-slate-300 mb-10 leading-relaxed">
                  "{testimonials[currentIndex].content}"
                </p>
                <div className="flex flex-col items-center gap-4">
                  <img 
                    src={testimonials[currentIndex].avatar} 
                    className="w-16 h-16 rounded-full border-4 border-green-500 shadow-lg" 
                    alt={testimonials[currentIndex].name} 
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg">{testimonials[currentIndex].name}</h4>
                    <p className="text-xs text-green-600 font-black uppercase tracking-widest">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right Button */}
            <button 
              onClick={nextSlide}
              className="absolute -right-4 md:-right-20 z-20 p-4 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:bg-green-600 hover:text-white transition-all shadow-xl active:scale-90"
            >
              <HiChevronRight size={24} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all ${currentIndex === i ? 'w-8 bg-green-600' : 'w-2 bg-slate-300 dark:bg-slate-700'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA SECTION */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-green-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-green-600/40">
           <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Ready to protect your farm?</h2>
              <p className="text-green-100 text-lg mb-10 max-w-xl mx-auto font-medium">Join over 50,000 farmers and researchers worldwide using CassavaAI.</p>
              <Link to="/analyze" className="px-12 py-5 bg-white text-green-600 rounded-2xl font-bold text-xl hover:scale-105 transition-transform inline-block">
                Scan Now
              </Link>
           </div>
           <HiGlobe className="absolute -bottom-20 -right-20 text-[25rem] text-white/10 rotate-12" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;