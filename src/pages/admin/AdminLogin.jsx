import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal, Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(form.email, form.password);
    if (result.success) navigate('/admin/dashboard');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-dark-950"
      style={{
        backgroundImage: 'linear-gradient(rgba(23,158,122,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(23,158,122,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary-800/40 border border-primary-600/30 flex items-center justify-center mx-auto mb-4">
            <Terminal size={24} className="text-accent-400" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white">Admin Panel</h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to manage your portfolio</p>
        </div>

        {/* Form */}
        <div className="glass rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email" value={form.email} required
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="admin@example.com"
                  className="input-field pl-9"
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'} value={form.password} required
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="input-field pl-9 pr-10"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-2">
              {loading ? <><Loader2 size={16} className="animate-spin" /> Signing in...</> : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          Default: use your .env ADMIN_EMAIL & ADMIN_PASSWORD after seeding
        </p>
      </motion.div>
    </div>
  );
}

export default AdminLogin;
