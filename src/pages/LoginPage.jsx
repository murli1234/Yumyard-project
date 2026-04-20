import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import GlassButton from '../components/GlassButton';
import { Lock, User, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('admin_auth', 'true');
      navigate('/admin');
    } else {
      alert('Invalid credentials! (Try admin / admin123)');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
            <h1 className="text-5xl font-black italic bg-gradient-to-b from-yellow-200 to-yellow-500 bg-clip-text text-transparent tracking-tighter">YUMYARD</h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.4em] mt-2">Central Control</p>
        </div>

        <GlassCard className="border-yellow-500/20">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-slate-500 group-focus-within:text-yellow-500 transition-colors" />
                </div>
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="glass-input w-full pl-12 pr-4 py-4 rounded-2xl font-bold"
                  required
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-500 group-focus-within:text-yellow-500 transition-colors" />
                </div>
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-input w-full pl-12 pr-4 py-4 rounded-2xl font-bold"
                  required
                />
              </div>
            </div>

            <GlassButton type="submit" variant="solid" className="w-full py-4 text-lg">
              ESTABLISH CONNECTION
            </GlassButton>
            
            <div className="flex items-center justify-center space-x-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest opacity-60">
                <Terminal className="w-3 h-3" />
                <span>Default: admin / admin123</span>
            </div>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default LoginPage;
