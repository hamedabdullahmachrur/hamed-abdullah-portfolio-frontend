import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';
import Spinner from '../components/common/Spinner';
import useApi from '../hooks/useApi';
import { getExperiences } from '../services/api';

function Experience() {
  const { data: experiences, loading, error } = useApi(getExperiences);

  return (
    <section className="section-pad pt-28 md:pt-36">
      <div className="max-container">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="text-center mb-16">
          <p className="font-mono text-accent-400 text-xs tracking-[0.25em] uppercase mb-3">Career</p>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold text-white mb-4">Experience</h1>
          <div className="w-14 h-[3px] bg-gradient-to-r from-accent-400 to-primary-600 rounded-full mx-auto mb-6" />
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            My professional journey and work experience as a developer.
          </p>
        </motion.div>

        {loading ? (
          <Spinner text="Loading experience..." />
        ) : error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : !experiences || experiences.length === 0 ? (
          <div className="text-center py-20">
            <Briefcase size={40} className="text-dark-600 mx-auto mb-4" />
            <p className="text-slate-500">No experience entries yet. Add them from the admin panel.</p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {experiences.map((exp, i) => (
              <motion.div key={exp._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-12 pb-10 last:pb-0"
              >
                {/* Timeline line */}
                {i < experiences.length - 1 && (
                  <div className="absolute left-[18px] top-6 bottom-0 w-px bg-dark-600" />
                )}
                {/* Timeline dot */}
                <div className="absolute left-0 top-1 w-9 h-9 rounded-full bg-primary-900/50 border border-primary-700/50 flex items-center justify-center">
                  <Briefcase size={15} className="text-accent-400" />
                </div>

                <div className="glass rounded-xl p-6">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-display font-bold text-white text-xl">{exp.title}</h3>
                      <p className="text-accent-400 font-medium text-sm mt-0.5">{exp.company}</p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1.5 flex-shrink-0">
                      <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-mono bg-dark-700 px-2.5 py-1 rounded-full">
                        <Calendar size={11} /> {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                      </span>
                      {exp.location && (
                        <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                          <MapPin size={11} /> {exp.location}
                        </span>
                      )}
                      <span className="text-xs text-primary-400 bg-primary-900/30 px-2 py-0.5 rounded font-mono">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{exp.description}</p>

                  {exp.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((t) => (
                        <span key={t} className="px-2 py-0.5 text-xs font-mono text-accent-400 bg-primary-900/30 border border-primary-800/40 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Experience;
