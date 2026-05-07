import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * Reusable modal wrapper for admin forms
 * Props: open, onClose, title, children
 */
function AdminModal({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-dark-800 border border-dark-600 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}>

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-dark-700/50 flex-shrink-0">
                <h3 className="font-display font-bold text-white text-xl">{title}</h3>
                <button onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-dark-600 transition-colors">
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto px-6 py-5">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default AdminModal;
