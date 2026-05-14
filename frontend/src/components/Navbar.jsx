/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX, HiSun, HiMoon, HiChip } from 'react-icons/hi';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { token, logout } = useContext(AuthContext);
  
  // 1. Theme Logic
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Analyze', path: '/analyze' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <nav className="fixed w-full z-[100] top-0 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 z-[110]">
          <div className="p-2 bg-green-600 rounded-xl">
            <HiChip className="text-white text-2xl" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
            CASSAVA<span className="text-green-600">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation - RESTORED */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-bold tracking-wide transition-colors hover:text-green-600 ${
                location.pathname === link.path 
                ? 'text-green-600' 
                : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3 z-[110]">
          {/* <button
            onClick={() => setIsDark(!isDark)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-yellow-400 border border-slate-200 dark:border-slate-800"
            aria-label="Toggle Theme"
          >
            {isDark ? <HiSun size={20} /> : <HiMoon size={20} />}
          </button> */}

          {/* Desktop Auth Button */}
          <div className="hidden md:block">
            {token ? (
              <button 
                onClick={logout}
                className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-sm transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-xl text-slate-900 dark:text-white"
          >
            {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
          </button>
        </div>
      </div>

      {/* Full Screen Mobile Menu Overlay - FIXES GHOSTING */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 h-screen w-screen bg-white dark:bg-slate-950 z-[105] flex flex-col p-8 pt-32 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-5xl font-black text-slate-900 dark:text-white"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-slate-200 dark:border-slate-800 my-4" />
              {token ? (
                <button 
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="text-4xl font-black text-red-500 text-left"
                >
                  Logout
                </button>
              ) : (
                <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-black text-green-600"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;