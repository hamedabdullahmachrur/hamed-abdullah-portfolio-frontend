import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Experience', to: '/experience' },
  { label: 'Education', to: '/education' },
  { label: 'Contact', to: '/contact' },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-950/90 backdrop-blur-md border-b border-primary-900/30 shadow-2xl' : 'bg-transparent'
      }`}
    >
      <nav className="max-container px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-primary-800/40 border border-primary-600/30 flex items-center justify-center group-hover:bg-primary-700/50 transition-colors">
            <Terminal size={17} className="text-accent-400" />
          </div>
          <span className="font-display font-bold text-lg text-white">
            Hamed<span className="text-accent-400">.</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-accent-400 bg-primary-900/40'
                      : 'text-slate-400 hover:text-white hover:bg-dark-700/60'
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Hire Me CTA */}
        <Link to="/contact" className="hidden md:inline-flex btn-primary text-xs py-2 px-4">
          Hire Me
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-9 h-9 rounded-lg bg-dark-700 border border-dark-600 flex items-center justify-center text-white"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-dark-900/95 backdrop-blur-md border-b border-dark-700/50 overflow-hidden"
          >
            <ul className="px-4 py-3 space-y-1">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-accent-400 bg-primary-900/40'
                          : 'text-slate-400 hover:text-white hover:bg-dark-700'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-1 pb-2">
                <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary w-full justify-center text-sm">
                  Hire Me
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
