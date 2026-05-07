import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, GitBranch, Code2 } from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';
import Spinner from '../components/common/Spinner';
import useApi from '../hooks/useApi';
import { getProjects } from '../services/api';

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Full Stack', 'Other'];

function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { data: projects, loading, error } = useApi(getProjects);

  const filtered = !projects ? [] :
    activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="section-pad pt-28 md:pt-36">
      <div className="max-container">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="text-center mb-12">
          <p className="font-mono text-accent-400 text-xs tracking-[0.25em] uppercase mb-3">What I've Built</p>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold text-white mb-4">Projects</h1>
          <div className="w-14 h-[3px] bg-gradient-to-r from-accent-400 to-primary-600 rounded-full mx-auto mb-6" />
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            A showcase of full-stack applications, REST APIs, and frontend projects built with the MERN stack.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/40'
                  : 'glass text-slate-400 hover:text-white hover:border-primary-700/50'
              }`}>
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        {loading ? (
          <Spinner text="Loading projects..." />
        ) : error ? (
          <p className="text-center text-red-400 py-12">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-slate-500 py-16">No projects found. Add them from the admin panel.</p>
        ) : (
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <motion.div key={p._id} layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="card overflow-hidden group"
                >
                  {/* Image */}
                  <div className="h-44 bg-dark-700 overflow-hidden relative">
                    {p.image ? (
                      <img src={p.image} alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Code2 size={32} className="text-primary-800" />
                      </div>
                    )}
                    {/* Overlay links */}
                    <div className="absolute inset-0 bg-dark-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center hover:bg-accent-400 transition-colors">
                          <ExternalLink size={16} className="text-dark-950" />
                        </a>
                      )}
                      {p.githubUrl && (
                        <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-dark-700 border border-white/20 flex items-center justify-center hover:bg-dark-600 transition-colors">
                          <GitBranch size={16} className="text-white" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <span className="text-xs font-mono text-accent-400 bg-primary-900/40 px-2 py-0.5 rounded mb-3 inline-block">
                      {p.category}
                    </span>
                    <h3 className="font-display font-bold text-white text-lg mb-2 group-hover:text-accent-400 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.techStack?.slice(0, 5).map((t) => (
                        <span key={t} className="px-2 py-0.5 text-xs font-mono text-accent-400 bg-primary-900/30 border border-primary-800/40 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Projects;
