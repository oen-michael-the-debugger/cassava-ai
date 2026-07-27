/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { HiMail, HiLockClosed, HiUser, HiEye, HiEyeOff } from 'react-icons/hi';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Auth Context & Navigation
  const { setToken, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle Social Auth (Logic Placeholder)
  const handleSocialAuth = (provider) => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/${provider}`;
  };

  // Handle Email/Password Auth
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const url = isLogin 
      ? `${import.meta.env.VITE_API_URL}/auth/login` 
      : `${import.meta.env.VITE_API_URL}/auth/signup`;

    try {
      const res = await axios.post(url, formData);
      
      // Update Global State
      setToken(res.data.token);
      setUser(res.data.user);
      
      // Persistent Login
      localStorage.setItem('token', res.data.token);
      
      // Success! Move to Analyze
      navigate('/analyze');
    } catch (err) {
      setError(err.response?.data?.msg || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen flex items-center justify-center px-6 bg-slate-50 dark:bg-slate-950">
      <motion.div
        layout
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-2xl border border-slate-100 dark:border-slate-800"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black dark:text-white">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            {isLogin ? 'Log in to track your plant history' : 'Join our community of smart farmers'}
          </p>
        </div>

        {/* Social Auth Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button 
            onClick={() => handleSocialAuth('google')}
            className="flex items-center justify-center gap-2 py-3 border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold text-sm dark:text-white"
          >
            <FcGoogle size={20} /> Google
          </button>
          <button 
            onClick={() => handleSocialAuth('github')}
            className="flex items-center justify-center gap-2 py-3 border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold text-sm dark:text-white"
          >
            <FaGithub size={20} /> GitHub
          </button>
        </div>

        <div className="relative flex items-center justify-center mb-8">
          <hr className="w-full border-slate-200 dark:border-slate-800" />
          <span className="absolute bg-white dark:bg-slate-900 px-4 text-xs font-black text-slate-400 uppercase tracking-widest">
            Or use email
          </span>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-sm bg-red-100 text-red-600 rounded-xl font-bold text-center">
              {error}
            </div>
          )}

          {!isLogin && (
            <div className="relative">
              <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={onChange}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-green-500 dark:text-white"
              />
            </div>
          )}

          <div className="relative">
            <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={onChange}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-green-500 dark:text-white"
            />
          </div>

          <div className="relative">
            <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={onChange}
              className="w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-green-500 dark:text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors focus:outline-none"
            >
              {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-green-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-green-600/20 hover:bg-green-700 transition-all disabled:opacity-50"
          >
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-500 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-600 font-bold hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
    setLoading(true);
    setError('');

    const url = isLogin 
      ? `${import.meta.env.VITE_API_URL}/auth/login` 
      : `${import.meta.env.VITE_API_URL}/auth/signup`;

    try {
      const res = await axios.post(url, formData);
      
      // Update Global State
      setToken(res.data.token);
      setUser(res.data.user);
      
      // Persistent Login
      localStorage.setItem('token', res.data.token);
      
      // Success! Move to Analyze
      navigate('/analyze');
    } catch (err) {
      setError(err.response?.data?.msg || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen flex items-center justify-center px-6 bg-slate-50 dark:bg-slate-950">
      <motion.div
        layout
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-2xl border border-slate-100 dark:border-slate-800"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black dark:text-white">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            {isLogin ? 'Log in to track your plant history' : 'Join our community of smart farmers'}
          </p>
        </div>

        {/* Social Auth Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button 
            onClick={() => handleSocialAuth('google')}
            className="flex items-center justify-center gap-2 py-3 border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold text-sm dark:text-white"
          >
            <FcGoogle size={20} /> Google
          </button>
          <button 
            onClick={() => handleSocialAuth('github')}
            className="flex items-center justify-center gap-2 py-3 border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold text-sm dark:text-white"
          >
            <FaGithub size={20} /> GitHub
          </button>
        </div>

        <div className="relative flex items-center justify-center mb-8">
          <hr className="w-full border-slate-200 dark:border-slate-800" />
          <span className="absolute bg-white dark:bg-slate-900 px-4 text-xs font-black text-slate-400 uppercase tracking-widest">
            Or use email
          </span>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-sm bg-red-100 text-red-600 rounded-xl font-bold text-center">
              {error}
            </div>
          )}

          {!isLogin && (
            <div className="relative">
              <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={onChange}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-green-500 dark:text-white"
              />
            </div>
          )}

          <div className="relative">
            <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={onChange}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-green-500 dark:text-white"
            />
          </div>

          <div className="relative">
            <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={onChange}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-green-500 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-green-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-green-600/20 hover:bg-green-700 transition-all disabled:opacity-50"
          >
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-500 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-600 font-bold hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
