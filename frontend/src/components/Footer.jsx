/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { HiChip } from 'react-icons/hi';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="p-1.5 bg-green-600 rounded-lg">
                <HiChip className="text-white text-xl" />
              </div>
              <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">
                CASSAVA<span className="text-green-600">AI</span>
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
              Empowering smallholder farmers with world-class AI diagnostics to ensure global food security.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-green-600 transition-colors"><FaTwitter size={20}/></a>
              <a href="#" className="text-slate-400 hover:text-green-600 transition-colors"><FaGithub size={20}/></a>
              <a href="#" className="text-slate-400 hover:text-green-600 transition-colors"><FaLinkedin size={20}/></a>
            </div>
          </div>

          {/* Nav Columns */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/analyze" className="hover:text-green-600 transition-colors">AI Scanner</Link></li>
              <li><Link to="/dashboard" className="hover:text-green-600 transition-colors">Farmer Dashboard</Link></li>
              <li><Link to="/" className="hover:text-green-600 transition-colors">Disease Library</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/" className="hover:text-green-600 transition-colors">Documentation</Link></li>
              <li><Link to="/" className="hover:text-green-600 transition-colors">API Access</Link></li>
              <li><Link to="/" className="hover:text-green-600 transition-colors">Community Forum</Link></li>
            </ul>
          </div>

          {/* Status Column */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6">System Status</h4>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">AI MODELS ONLINE</span>
              </div>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Latency: 240ms</p>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 font-medium">
            © 2026 CassavaAI Diagnostics. Built for the future of farming.
          </p>
          <div className="flex gap-6 text-xs text-slate-400 font-medium">
            <a href="#" className="hover:text-slate-900 dark:hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;