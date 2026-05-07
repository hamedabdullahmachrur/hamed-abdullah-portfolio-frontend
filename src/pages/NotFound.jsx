import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, type: 'spring' }}
        >
          <span className="font-display font-extrabold leading-none block"
            style={{
              fontSize: 'clamp(8rem, 20vw, 14rem)',
              background: 'linear-gradient(135deg, rgba(23,158,122,0.15), rgba(23,158,122,0.04))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >404</span>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="font-display text-3xl font-bold text-white mb-3">Page Not Found</h2>
          <p className="text-slate-400 mb-8 max-w-xs mx-auto">
            This page doesn't exist or has been moved. Let's get you back on track.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/" className="btn-primary"><Home size={16} /> Go Home</Link>
            <button onClick={() => window.history.back()} className="btn-outline">
              <ArrowLeft size={16} /> Go Back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default NotFound;
