import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, GitBranch, Users, Download, CheckCircle2 } from 'lucide-react';
import SectionTitle from '../components/common/SectionTitle';

const skills = [
  { name: 'React.js', level: 85, color: 'from-blue-400 to-blue-600' },
  { name: 'Node.js & Express', level: 80, color: 'from-green-400 to-green-600' },
  { name: 'MongoDB & Mongoose', level: 78, color: 'from-emerald-400 to-emerald-600' },
  { name: 'JavaScript (ES6+)', level: 88, color: 'from-yellow-400 to-yellow-600' },
  { name: 'HTML & CSS', level: 92, color: 'from-orange-400 to-orange-600' },
  { name: 'Tailwind CSS', level: 87, color: 'from-teal-400 to-teal-600' },
  { name: 'REST API Design', level: 80, color: 'from-purple-400 to-purple-600' },
  { name: 'Git & GitHub', level: 82, color: 'from-red-400 to-red-600' },
];

function About() {
  return (
    <>
      {/* Hero */}
      <section className="section-pad pt-28 md:pt-36">
        <div className="max-container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="text-center mb-16">
            <p className="font-mono text-accent-400 text-xs tracking-[0.25em] uppercase mb-3">Know More</p>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold text-white mb-4">About Me</h1>
            <div className="w-14 h-[3px] bg-gradient-to-r from-accent-400 to-primary-600 rounded-full mx-auto" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-14 items-start">
            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
              {/* Avatar */}
              <div className="w-36 h-36 rounded-2xl bg-gradient-to-br from-accent-400 via-primary-600 to-primary-800 flex items-center justify-center text-white font-display font-extrabold text-5xl mb-8 glow">
                H
              </div>
              <h2 className="font-display text-3xl font-bold text-white mb-1">Hamed Abdullah</h2>
              <p className="text-accent-400 font-mono text-sm mb-6">MERN Stack Developer</p>

              <div className="space-y-3 mb-8">
                {[
                  { icon: MapPin, text: 'Chittagong, Bangladesh' },
                  { icon: Mail, text: 'hamedabdullahmachrur@gmail.com' },
                  { icon: Phone, text: '+8801765-868671' },
                  { icon: GitBranch, text: 'github.com/hamedabdullahmachrur', href: 'https://github.com/hamedabdullahmachrur' },
                  { icon: Users, text: 'fb.com/hamedabdullahmachrur', href: 'https://www.facebook.com/hamedabdullahmachrur' },
                ].map(({ icon: Icon, text, href }) => (
                  <div key={text} className="flex items-center gap-3 text-slate-400 text-sm">
                    <Icon size={14} className="text-accent-400 flex-shrink-0" />
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-accent-400 transition-colors">{text}</a>
                    ) : <span>{text}</span>}
                  </div>
                ))}
              </div>
              <a
                href="/Hamed-Abdullah-CV.pdf"
                download="Hamed-Abdullah-CV.pdf"
                className="btn-primary"
              >
                <Download size={15} /> Download CV
              </a>
            </motion.div>

            {/* Right */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.7 }}>
              <SectionTitle eyebrow="My Story" title="Who Am I?" />
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  I'm a passionate MERN Stack Developer based in Chittagong, Bangladesh. I graduated from the
                  <span className="text-accent-400"> Programming Hero Web Development Course</span> — one of the most
                  comprehensive bootcamps in Bangladesh — where I mastered full-stack JavaScript development.
                </p>
                <p>
                  I specialize in building complete web applications from scratch using MongoDB, Express, React, and Node.js.
                  I love turning ideas into functional, beautiful, and performant digital experiences.
                </p>
                <p>
                  Currently seeking freelance projects and full-time opportunities where I can contribute my skills,
                  grow professionally, and deliver real value through quality code.
                </p>
              </div>

              {/* Quick facts */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  'MERN Stack Specialist',
                  'Programming Hero Graduate',
                  'REST API Developer',
                  'Responsive UI Builder',
                  'JWT Auth Implementation',
                  'MongoDB Database Design',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle2 size={14} className="text-accent-400 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section >

      {/* Skills */}
      < section className="section-pad bg-dark-900/40" >
        <div className="max-container">
          <SectionTitle eyebrow="Technical Skills" title="My Tech Stack" center />
          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {skills.map((skill, i) => (
              <motion.div key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="glass rounded-xl p-5"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white text-sm font-medium">{skill.name}</span>
                  <span className="text-accent-400 text-xs font-mono">{skill.level}%</span>
                </div>
                <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.07, ease: 'easeOut' }}
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section >
    </>
  );
}

export default About;
