import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Code2, Briefcase, GraduationCap,
  LogOut, Terminal, Menu, X, ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Projects', to: '/admin/projects', icon: Code2 },
  { label: 'Experience', to: '/admin/experience', icon: Briefcase },
  { label: 'Education', to: '/admin/education', icon: GraduationCap },
];

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-dark-700/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary-800/40 border border-primary-600/30 flex items-center justify-center">
            <Terminal size={17} className="text-accent-400" />
          </div>
          <div>
            <p className="font-display font-bold text-white text-base leading-tight">Hamed.</p>
            <p className="text-slate-500 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink key={to} to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-primary-700/30 text-accent-400 border border-primary-700/40'
                  : 'text-slate-400 hover:text-white hover:bg-dark-700/60'
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <Icon size={17} />
            {label}
            <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-dark-700/50">
        <div className="px-4 py-3 mb-2">
          <p className="text-slate-500 text-xs">Logged in as</p>
          <p className="text-white text-sm font-medium truncate">{user?.email}</p>
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200">
          <LogOut size={17} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-dark-950">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-dark-900 border-r border-dark-700/50 flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-dark-950/80 backdrop-blur-sm z-30 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-dark-900 border-r border-dark-700/50 z-40 flex flex-col lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile) */}
        <header className="lg:hidden h-14 flex items-center justify-between px-4 bg-dark-900 border-b border-dark-700/50">
          <button onClick={() => setSidebarOpen(true)} className="w-9 h-9 rounded-lg bg-dark-700 flex items-center justify-center text-white">
            <Menu size={18} />
          </button>
          <span className="font-display font-bold text-white">Admin Panel</span>
          <div className="w-9" />
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
