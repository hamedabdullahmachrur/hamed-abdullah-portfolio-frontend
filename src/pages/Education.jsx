import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';
import Spinner from '../components/common/Spinner';
import useApi from '../hooks/useApi';
import { getEducations } from '../services/api';

function Education() {
  const { data: educations, loading, error } = useApi(getEducations);

  return (
    <section className="section-pad pt-28 md:pt-36">
      <div className="max-container">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="text-center mb-16">
          <p className="font-mono text-accent-400 text-xs tracking-[0.25em] uppercase mb-3">Academic</p>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold text-white mb-4">Education</h1>
          <div className="w-14 h-[3px] bg-gradient-to-r from-accent-400 to-primary-600 rounded-full mx-auto mb-6" />
          <p className="text-slate-400 max-w-xl mx-auto text-sm">
            My academic background and professional training in software development.
          </p>
        </motion.div>

        {loading ? (
          <Spinner text="Loading education..." />
        ) : error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : !educations || educations.length === 0 ? (
          <div className="text-center py-20">
            <GraduationCap size={40} className="text-dark-600 mx-auto mb-4" />
            <p className="text-slate-500">No education entries yet. Add them from the admin panel.</p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {educations.map((edu, i) => (
              <motion.div key={edu._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-12 pb-10 last:pb-0"
              >
                {i < educations.length - 1 && (
                  <div className="absolute left-[18px] top-6 bottom-0 w-px bg-dark-600" />
                )}
                <div className="absolute left-0 top-1 w-9 h-9 rounded-full bg-blue-900/40 border border-blue-700/40 flex items-center justify-center">
                  <GraduationCap size={15} className="text-blue-400" />
                </div>

                <div className="glass rounded-xl p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-display font-bold text-white text-xl">{edu.degree}</h3>
                      <p className="text-accent-400 font-medium text-sm mt-0.5">{edu.institution}</p>
                      {edu.fieldOfStudy && (
                        <p className="text-slate-500 text-xs mt-0.5">{edu.fieldOfStudy}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1.5 flex-shrink-0">
                      <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-mono bg-dark-700 px-2.5 py-1 rounded-full">
                        <Calendar size={11} /> {edu.startDate} — {edu.current ? 'Present' : edu.endDate}
                      </span>
                      {edu.location && (
                        <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                          <MapPin size={11} /> {edu.location}
                        </span>
                      )}
                      {edu.grade && (
                        <span className="inline-flex items-center gap-1 text-xs text-blue-400">
                          <Award size={11} /> {edu.grade}
                        </span>
                      )}
                    </div>
                  </div>

                  {edu.description && (
                    <p className="text-slate-400 text-sm leading-relaxed">{edu.description}</p>
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

export default Education;
