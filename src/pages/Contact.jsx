import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Send, MapPin, Mail, Phone, GitBranch, Users, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

function Contact() {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ from_name: '', from_email: '', subject: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,   // service_u3flf9s
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,  // template_7rvstvp
        {
          from_name: form.from_name,
          from_email: form.from_email,
          subject: form.subject,
          message: form.message,
          to_name: 'Hamed Abdullah',
        },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY } // oFhfznNc_GlbPIOpp
      )
      .then(
        () => {
          toast.success('Message sent! I\'ll get back to you soon.');
          setForm({ from_name: '', from_email: '', subject: '', message: '' });
        },
        (error) => {
          toast.error('Failed to send message. Please try again or email me directly.');
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <section className="section-pad pt-28 md:pt-36">
      <div className="max-container">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="text-center mb-16">
          <p className="font-mono text-accent-400 text-xs tracking-[0.25em] uppercase mb-3">Let's Talk</p>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold text-white mb-4">Contact Me</h1>
          <div className="w-14 h-[3px] bg-gradient-to-r from-accent-400 to-primary-600 rounded-full mx-auto mb-6" />
          <p className="text-slate-400 max-w-md mx-auto text-sm">
            Have a project or opportunity? I'd love to hear from you. Let's build something amazing.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left: Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            className="lg:col-span-2 space-y-5">

            <div className="glass rounded-xl p-6">
              <h3 className="font-display font-bold text-white text-lg mb-2">Let's Build Together</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                I'm available for freelance projects, full-time roles, and collaborations. I typically respond within 24 hours.
              </p>
            </div>

            {[
              { icon: Mail, label: 'Email', value: 'hamedabdullahmachrur@gmail.com', href: 'mailto:hamedabdullahmachrur@gmail.com' },
              { icon: Phone, label: 'Phone', value: '+8801765-868671', href: 'tel:+8801765868671' },
              { icon: MapPin, label: 'Location', value: 'Chittagong, Bangladesh' },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="glass rounded-xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-900/50 border border-primary-700/30 flex items-center justify-center flex-shrink-0">
                  <Icon size={17} className="text-accent-400" />
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-widest mb-0.5">{label}</p>
                  {href ? (
                    <a href={href} className="text-white text-sm hover:text-accent-400 transition-colors">{value}</a>
                  ) : (
                    <p className="text-white text-sm">{value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="glass rounded-xl p-5">
              <p className="text-slate-500 text-xs uppercase tracking-widest mb-4"> Social</p>
              <div className="flex gap-3">
                {[
                  { icon: GitBranch, href: 'https://github.com/hamedabdullahmachrur', label: 'GitHub' },
                  { icon: Users, href: 'https://www.facebook.com/hamedabdullahmachrur', label: 'Users' },
                  { icon: Mail, href: 'mailto:hamedabdullahmachrur@gmail.com', label: 'Email' },
                ].map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-10 h-10 rounded-lg bg-dark-700 border border-dark-600 flex items-center justify-center text-slate-400   hover:text-accent-400 hover:border-primary-600/50 transition-all duration-200">
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
            className="lg:col-span-3">
            <div className="glass rounded-xl p-6 md:p-8">
              <h3 className="font-display font-bold text-white text-xl mb-6">Send a Message</h3>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Your Name *</label>
                    <input
                      type="text" name="from_name" value={form.from_name}
                      onChange={handleChange} required placeholder="John Doe"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Email *</label>
                    <input
                      type="email" name="from_email" value={form.from_email}
                      onChange={handleChange} required placeholder="john@example.com"
                      className="input-field"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Subject</label>
                  <input
                    type="text" name="subject" value={form.subject}
                    onChange={handleChange} placeholder="Project inquiry"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Message *</label>
                  <textarea
                    name="message" value={form.message}
                    onChange={handleChange} required rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    className="input-field resize-none"
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                  {loading ? (
                    <><Loader2 size={16} className="animate-spin" /> Sending...</>
                  ) : (
                    <><Send size={16} /> Send Message</>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
