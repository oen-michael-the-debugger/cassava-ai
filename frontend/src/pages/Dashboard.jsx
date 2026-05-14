/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { LayoutDashboard, History, ShieldCheck, ShieldAlert, Ban, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext); // Ensure your AuthContext provides the 'user' object
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/diagnosis/history`, {
          headers: { 'x-auth-token': token }
        });
        setHistory(res.data);
      } catch (err) {
        console.error("History fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // Truncate function to keep card heights uniform
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const healthy = history.filter(h => h.predictionData?.name === "Healthy").length;
  const diseased = history.filter(h => h.status === "PASS" && h.predictionData?.name !== "Healthy").length;
  const invalid = history.filter(h => h.status === "FAIL").length;

  const chartData = [
    { name: 'Healthy', count: healthy, color: '#10b981' },
    { name: 'Diseased', count: diseased, color: '#f59e0b' },
    { name: 'Invalid', count: invalid, color: '#ef4444' }
  ];
  
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#050505] text-green-500">Syncing Records...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 pb-20 pt-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header - Dynamically shows name or 'farmer' as fallback */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-8">
          <div>
            <h1 className="text-4xl sm:text-6xl font-black text-white capitalize tracking-tighter">
              <span className="text-green-500">
                {loading ? '...' : (user?.name || user?.username || 'farmer')}
              </span>'s Farm.
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Cassava surveillance overview.</p>
          </div>
          <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/10 text-xs font-bold">
            {history.length} SCANS RECORDED
          </div>
        </div>

        {/* Chart Section - Fixed with aspect ratio for Mobile Responsiveness */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-6 sm:p-8">
            <h3 className="text-white font-bold mb-8 flex items-center gap-2">
              <LayoutDashboard size={18} className="text-green-500" /> Health Statistics
            </h3>
            <div className="w-full text-white">
              {/* aspect={2} ensures the height is half the width, fixing the -1 width error */}
              <ResponsiveContainer width="100%" aspect={window.innerWidth < 640 ? 1.5 : 3}>
                <BarChart data={chartData} layout="vertical" margin={{ left: -10, right: 20 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} width={80} />
                  <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#111', border: 'none', borderRadius: '8px' }} className="text-white" />
                  <Bar dataKey="count" radius={[0, 12, 12, 0]} barSize={32}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} contentStyle={{color:"white" }} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-1 gap-4">
            <div className="bg-green-500/5 border border-green-500/10 p-8 rounded-[2.5rem] flex flex-col justify-center">
              <ShieldCheck className="text-green-500 mb-2" size={32} />
              <span className="text-4xl font-black text-white">{healthy}</span>
              <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Healthy Plants</p>
            </div>
            <div className="bg-orange-500/5 border border-orange-500/10 p-8 rounded-[2.5rem] flex flex-col justify-center">
              <ShieldAlert className="text-orange-500 mb-2" size={32} />
              <span className="text-4xl font-black text-white">{diseased}</span>
              <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Diseases Found</p>
            </div>
          </div>
        </div>

        {/* History Cards */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-white px-2">Analysis History</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((item) => {
              const isInvalid = item.status === "FAIL";
              const name = isInvalid ? "Invalid Scan" : item.predictionData?.name;
              const rawDesc = isInvalid ? item.predictionData?.message : (item.predictionData?.description || item.predictionData?.maintenance);

              return (
                <motion.div key={item._id} whileHover={{ y: -5 }} className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-6 flex flex-col">
                  <div className="flex gap-4 mb-6">
                    <img src={item.imageUrl} className="w-20 h-20 rounded-2xl object-cover" alt="Leaf" />
                    <div>
                      <div className={`text-[10px] font-black uppercase mb-1 ${isInvalid ? 'text-red-500' : 'text-green-500'}`}>
                        {isInvalid ? 'Rejected' : 'Verified'}
                      </div>
                      <h4 className="text-lg font-bold text-white truncate w-40">{name}</h4>
                      <p className="text-[10px] text-slate-600 uppercase font-bold">{new Date(item.createdAt).toDateString()}</p>
                    </div>
                  </div>

                  {/* Truncated Description to keep cards at same height */}
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">
                    {truncate(rawDesc, 100)}
                  </p>

                  {!isInvalid ? (
                    <Link
                      to={`/analysis/${item._id}`}
                      state={{ result: item }}
                      className="flex items-center justify-between w-full p-4 bg-white/5 hover:bg-green-600 rounded-2xl text-white text-[10px] font-black transition-all"
                    >
                      VIEW FULL DETAILS
                      <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2 p-4 bg-red-500/10 text-red-500 rounded-2xl text-[10px] font-black">
                      <Ban size={14} /> ACTION RESTRICTED
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;