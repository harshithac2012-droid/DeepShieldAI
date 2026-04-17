import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Chrome, Phone, ArrowRight, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row pt-20">
      {/* Left side: Visual (Hidden on mobile) */}
      <div className="hidden lg:flex flex-1 flex-col justify-center p-20 border-r border-white/5 relative overflow-hidden bg-[#020202]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(6,182,212,0.1),transparent_50%)]"></div>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-500 text-[10px] font-mono tracking-widest uppercase mb-8">
            Secure Terminal Access
          </div>
          <h1 className="text-7xl font-bold uppercase tracking-tighter mb-8 relative z-10 leading-[0.9]">
            Verify Your <br /><span className="text-cyan-400">Digital Identity.</span>
          </h1>
          <p className="text-gray-500 font-mono text-sm tracking-widest uppercase relative z-10 mb-12 max-w-md">
            The era of synthetic media requires a new standard of credentialing. 
          </p>
          
          <div className="flex gap-12 relative z-10 border-t border-white/5 pt-12">
             <div>
               <div className="text-3xl font-bold">2.5M+</div>
               <div className="text-[8px] font-mono tracking-widest uppercase text-gray-600">Scans Completed</div>
             </div>
             <div>
               <div className="text-3xl font-bold">99.7%</div>
               <div className="text-[8px] font-mono tracking-widest uppercase text-gray-600">Detection Precision</div>
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
            <h2 className="text-4xl font-bold uppercase tracking-tighter mb-2">Welcome Back</h2>
            <p className="text-gray-500 font-mono text-[10px] tracking-widest uppercase">Encryption active. Enter your credentials.</p>
          </motion.div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase text-gray-400 tracking-widest ml-1">Identity Endpoint (Email)</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cyan-500 transition-colors" size={18} />
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@secure-mail.com"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-5 pl-12 pr-4 outline-none focus:border-cyan-500 transition-all text-sm placeholder:text-gray-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-mono uppercase text-gray-400 tracking-widest">Access Key (Password)</label>
                <span className="text-[8px] font-mono uppercase text-cyan-900 hover:text-cyan-500 cursor-pointer transition-colors tracking-widest">Recovery?</span>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-cyan-500 transition-colors" size={18} />
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-5 pl-12 pr-4 outline-none focus:border-cyan-500 transition-all text-sm"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-xs font-mono">
                ⚠ {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="glass-btn group w-full font-bold uppercase py-5 rounded-xl text-xs tracking-widest flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <><Loader2 size={16} className="animate-spin" /> Authenticating...</>
              ) : (
                <>Initialize Session <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <div className="relative my-12">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center text-[8px] font-mono uppercase"><span className="bg-black px-4 text-gray-700 tracking-[0.3em]">Neural ID Bridge</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="glass-btn flex items-center justify-center gap-3 py-4 rounded-xl text-[10px] font-mono uppercase tracking-widest">
              <Chrome size={18} /> Google Login
            </button>
            <button className="glass-btn flex items-center justify-center gap-3 py-4 rounded-xl text-[10px] font-mono uppercase tracking-widest">
              <Phone size={18} /> Phone Auth
            </button>
          </div>

          <div className="mt-16 text-center text-[10px] font-mono uppercase text-gray-600 tracking-widest">
            Identity missing? <Link to="/register" className="text-cyan-500 hover:text-cyan-400 font-bold transition-colors ml-2 underline underline-offset-4">Register Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
