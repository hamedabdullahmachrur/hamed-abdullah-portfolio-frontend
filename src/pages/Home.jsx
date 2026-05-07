import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Download, GitBranch, Users, Mail,
  Code2, Server, Database, Globe, Sparkles, ExternalLink,
} from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';
import useApi from '../hooks/useApi';
import { getProjects } from '../services/api';
import Spinner from '../components/common/Spinner';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Home() {
  const { data: projects, loading } = useApi(getProjects);
  const featured = projects?.filter((p) => p.featured).slice(0, 3) || (projects || []).slice(0, 3);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(23,158,122,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(23,158,122,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Radial glow */}
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 55% at 50% -5%, rgba(23,158,122,0.14) 0%, transparent 70%)' }}
        />

        {/* Decorative blobs */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 right-8 w-72 h-72 rounded-full bg-primary-800/10 blur-3xl pointer-events-none hidden lg:block"
        />

        <div className="max-container section-pad relative z-10 pt-28 md:pt-36">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left */}
            <div>
              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-900/40 border border-primary-700/30 text-accent-400 text-xs font-mono mb-6">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Open to freelance & full-time opportunities
              </motion.div>

              <motion.p variants={fadeUp} initial="hidden" animate="show" custom={1}
                className="text-slate-400 text-lg mb-1">Hi, I'm</motion.p>

              <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={2}
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4">
                Hamed <span className="text-gradient">Abdullah</span>
              </motion.h1>

              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}
                className="flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-accent-400/50" />
                <span className="font-mono text-accent-400 text-sm tracking-widest uppercase">MERN Stack Developer</span>
              </motion.div>

              <motion.p variants={fadeUp} initial="hidden" animate="show" custom={4}
                className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
                Programming Hero Web Development Course Graduate, passionate about building
                full-stack web applications with <span className="text-accent-400">MongoDB</span>,{' '}
                <span className="text-accent-400">Express</span>,{' '}
                <span className="text-accent-400">React</span> &{' '}
                <span className="text-accent-400">Node.js</span>.
              </motion.p>

              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={5}
                className="flex flex-wrap gap-4 mb-10">
                <Link to="/projects" className="btn-primary">
                  View My Projects <ArrowRight size={15} />
                </Link>
                <Link to="/contact" className="btn-outline">
                  Get In Touch
                </Link>
              </motion.div>

              {/* Socials */}
              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={6}
                className="flex items-center gap-4">
                <span className="text-slate-600 text-xs uppercase tracking-widest">Follow</span>
                {[
                  { icon: GitBranch, href: 'https://github.com/hamedabdullahmachrur' },
                  { icon: Users, href: 'https://www.facebook.com/hamedabdullahmachrur' },
                  { icon: Mail, href: 'mailto:hamedabdullahmachrur@gmail.com' },
                ].map(({ icon: Icon, href }, i) => (
                  <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-dark-800 border border-dark-600 flex items-center justify-center text-slate-400 hover:text-accent-400 hover:border-primary-600/50 transition-all duration-200">
                    <Icon size={16} />
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Right: Floating card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative w-80 h-80">
                <motion.div
                  animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border border-dashed border-primary-700/30"
                />
                <motion.div
                  animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-6 rounded-full border border-dashed border-accent-400/20"
                />

                {/* Center card */}
                <div className="absolute inset-12 rounded-2xl glass flex flex-col items-center justify-center text-center p-4 glow">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-400 to-primary-600 flex items-center justify-center text-white font-display font-bold text-2xl mb-3">
                    H
                  </div>
                  <h3 className="font-display font-bold text-white text-base">Hamed Abdullah</h3>
                  <p className="text-accent-400 text-xs font-mono mt-0.5">MERN Developer</p>
                </div>

                {/* Floating badges */}
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-3 -right-3 px-3 py-1.5 glass rounded-lg text-xs font-mono text-green-400 border-green-500/20">
                  ✓ Available
                </motion.div>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-3 -left-3 px-3 py-1.5 glass rounded-lg text-xs font-mono text-accent-400">
                  PH Graduate
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-dark-700/50"
          >
            {[
              { v: 'MERN', l: 'Stack Expert' },
              { v: 'PH', l: 'Bootcamp Grad' },
              { v: '100%', l: 'Dedication' },
              { v: 'BD', l: 'Based' },
            ].map(({ v, l }) => (
              <div key={l} className="text-center">
                <p className="font-display text-2xl font-bold text-gradient mb-1">{v}</p>
                <p className="text-slate-500 text-sm">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT PREVIEW ── */}
      <section className="section-pad bg-dark-900/40">
        <div className="max-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle eyebrow="Who I Am" title="Passionate MERN Developer" />
              <p className="text-slate-400 leading-relaxed mb-4">
                I'm Hamed Abdullah, a graduate of the Programming Hero Web Development Course, based in
                Chittagong, Bangladesh. I specialize in building full-stack web applications using the
                MERN stack — from elegant React frontends to robust Node.js/Express backends.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                My focus is on writing clean, maintainable code and delivering real-world solutions
                that make a difference. Always learning, always building.
              </p>
              <Link to="/about" className="btn-outline">
                More About Me <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Code2, title: 'React.js', desc: 'Hooks, Context, Router' },
                { icon: Server, title: 'Node & Express', desc: 'REST APIs, Auth' },
                { icon: Database, title: 'MongoDB', desc: 'Mongoose, Atlas' },
                { icon: Globe, title: 'Full Stack', desc: 'MERN end-to-end' },
              ].map(({ icon: Icon, title, desc }, i) => (
                <motion.div key={title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card p-5"
                >
                  <Icon size={20} className="text-accent-400 mb-3" />
                  <h4 className="text-white font-semibold text-sm mb-1">{title}</h4>
                  <p className="text-slate-500 text-xs">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section className="section-pad">
        <div className="max-container">
          <SectionTitle eyebrow="My Work" title="Featured Projects" center />
          {loading ? (
            <Spinner text="Loading projects..." />
          ) : featured.length === 0 ? (
            <p className="text-center text-slate-500 py-12">No projects yet. Add them from the admin panel.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((p, i) => (
                <motion.div key={p._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="card overflow-hidden group"
                >
                  <div className="h-44 overflow-hidden bg-dark-700">
                    {p.image ? (
                      <img src={p.image} alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Code2 size={32} className="text-primary-700" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-mono text-accent-400 bg-primary-900/40 px-2 py-0.5 rounded mb-2 inline-block">
                      {p.category}
                    </span>
                    <h3 className="font-display font-bold text-white text-lg mb-2 group-hover:text-accent-400 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {p.techStack?.slice(0, 4).map((t) => (
                        <span key={t} className="px-2 py-0.5 text-xs font-mono text-accent-400 bg-primary-900/30 border border-primary-800/40 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {p.liveUrl && (
                        <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-slate-400 hover:text-accent-400 transition-colors">
                          <ExternalLink size={13} /> Live
                        </a>
                      )}
                      {p.githubUrl && (
                        <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-slate-400 hover:text-accent-400 transition-colors">
                          <GitBranch size={13} /> Code
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link to="/projects" className="btn-outline">
              View All Projects <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-pad bg-dark-900/40">
        <div className="max-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="glass rounded-2xl p-10 md:p-16 text-center glow"
          >
            <Sparkles className="w-10 h-10 text-accent-400 mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Have a project in mind?
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
              I'm available for freelance work and open to full-time opportunities. Let's create something great together.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="btn-primary">
                Let's Talk <ArrowRight size={15} />
              </Link>
              <a href="mailto:hamedabdullahmachrur@gmail.com" className="btn-outline">
                Send an Email
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default Home;
