import { Link } from 'react-router-dom';
import { GitBranch, Link2, Users, Mail, Terminal, Heart, Phone, MapPin } from 'lucide-react';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Experience', to: '/experience' },
  { label: 'Education', to: '/education' },
  { label: 'Contact', to: '/contact' },
];

const socials = [
  { icon: GitBranch, href: 'https://github.com/hamedabdullahmachrur', label: 'GitHub' },
  { icon: Users, href: 'https://www.facebook.com/hamedabdullahmachrur', label: 'Users' },
  { icon: Mail, href: 'mailto:hamedabdullahmachrur@gmail.com', label: 'Email' },
];

function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-dark-700/50">
      <div className="max-container px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary-800/40 border border-primary-600/30 flex items-center justify-center">
                <Terminal size={17} className="text-accent-400" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                Hamed<span className="text-accent-400">.</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-4">
              MERN Stack Developer | Programming Hero Graduate | Building impactful web applications.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-lg bg-dark-800 border border-dark-600 flex items-center justify-center text-slate-400 hover:text-accent-400 hover:border-primary-600/50 transition-all duration-200">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-slate-500 hover:text-accent-400 text-sm transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-4">Contact</h4>
            <div className="space-y-3">
              {[
                { icon: Mail, text: 'hamedabdullahmachrur@gmail.com' },
                { icon: Phone, text: '+8801765-868671' },
                { icon: MapPin, text: 'Chittagong, Bangladesh' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-slate-500 text-sm">
                  <Icon size={13} className="text-accent-400 flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-dark-700/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Hamed Abdullah. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs flex items-center gap-1">
            Made with <Heart size={11} className="text-accent-400 fill-accent-400" /> in Chittagong, BD
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
