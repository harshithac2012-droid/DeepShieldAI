import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    const { error } = await signUp(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess('Account created! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row pt-20">
      {/* Left side: Visual */}
      <div className="hidden lg:flex flex-1 flex-col justify-center p-20 border-r border-white/5 relative overflow-hidden bg-[#020202]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-500 text-[10px] font-mono tracking-widest uppercase mb-8">
            Create New Identity
          </div>
          <h1 className="text-7xl font-bold uppercase tracking-tighter mb-8 relative z-10 leading-[0.9]">
            Join The <br /><span className="text-emerald-400">Shield Network.</span>
          </h1>
          <p className="text-gray-500 font-mono text-sm tracking-widest uppercase relative z-10 mb-12 max-w-md">
            Register your credentials to gain access to neural voice verification technology.
          </p>
          
          <div className="flex gap-12 relative z-10 border-t border-white/5 pt-12">
             <div>
               <div className="text-3xl font-bold">256-BIT</div>
               <div className="text-[8px] font-mono tracking-widest uppercase text-gray-600">AES Encryption</div>
             </div>
             <div>
               <div className="text-3xl font-bold">ZERO</div>
               <div className="text-[8px] font-mono tracking-widest uppercase text-gray-600">Data Breaches</div>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Right side: Form */}
      <div className="flex-1 flex flex-col justify-center p-8 md:p-20 bg-black relative">
        <div className="max-w-md w-full mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold uppercase tracking-tighter mb-2">Create Account</h2>
            <p className="text-gray-500 font-mono text-[10px] tracking-widest uppercase">Initialize a new secure identity node.</p>
          </motion.div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase text-gray-400 tracking-widest ml-1">Identity Endpoint (Email)</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@secure-mail.com"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-5 pl-12 pr-4 outline-none focus:border-emerald-500 transition-all text-sm placeholder:text-gray-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase text-gray-400 tracking-widest ml-1">Access Key (Password)</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-5 pl-12 pr-4 outline-none focus:border-emerald-500 transition-all text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase text-gray-400 tracking-widest ml-1">Confirm Access Key</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input 
                  required
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-5 pl-12 pr-4 outline-none focus:border-emerald-500 transition-all text-sm"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-xs font-mono">
                ⚠ {error}
              </div>
            )}

            {success && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 text-emerald-400 text-xs font-mono">
                ✓ {success}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="glass-btn group w-full font-bold uppercase py-5 rounded-xl text-xs tracking-widest flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" /> Creating Identity...</>
              ) : (
                <><UserPlus size={16} /> Register Identity <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <div className="mt-16 text-center text-[10px] font-mono uppercase text-gray-600 tracking-widest">
            Already have access? <Link to="/login" className="text-cyan-500 hover:text-cyan-400 font-bold transition-colors ml-2 underline underline-offset-4">Login Here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
