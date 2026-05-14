/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Analyze from './pages/Analyze';
import FullAnalysis from './pages/FullAnalysis';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute'; // Import your wrapper

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          
          {/* Protected Routes */}
          <Route path="/analyze" element={
            <ProtectedRoute> <Analyze /> </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute> <Dashboard /> </ProtectedRoute>
          } />
          
          <Route path="/analysis/:id" element={<FullAnalysis />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;