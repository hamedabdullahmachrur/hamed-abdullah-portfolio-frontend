import { motion } from 'framer-motion';

function SectionTitle({ eyebrow, title, subtitle, center = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 md:mb-16 ${center ? 'text-center' : ''}`}
    >
      {eyebrow && (
        <p className="font-mono text-accent-400 text-xs tracking-[0.25em] uppercase mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-slate-400 text-base max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: center ? '50px' : '64px' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`h-[3px] mt-4 rounded-full bg-gradient-to-r from-accent-400 to-primary-600 ${center ? 'mx-auto' : ''}`}
      />
    </motion.div>
  );
}

export default SectionTitle;
