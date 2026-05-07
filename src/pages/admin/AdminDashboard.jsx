import { motion } from 'framer-motion';
import { Code2, Briefcase, GraduationCap, ExternalLink, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import useApi from '../../hooks/useApi';
import { getProjects, getExperiences, getEducations } from '../../services/api';
import Spinner from '../../components/common/Spinner';

function StatCard({ icon: Icon, title, count, to, color, loading }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-6 hover:border-primary-700/40 transition-all duration-300">
      <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mb-4`}>
        <Icon size={22} className="text-white" />
      </div>
      <p className="text-slate-400 text-sm mb-1">{title}</p>
      {loading ? (
        <div className="h-8 w-12 bg-dark-700 rounded animate-pulse" />
      ) : (
        <p className="font-display font-bold text-white text-3xl">{count ?? 0}</p>
      )}
      <Link to={to} className="mt-4 inline-flex items-center gap-1 text-xs text-accent-400 hover:text-accent-300 transition-colors">
        Manage <ExternalLink size={11} />
      </Link>
    </motion.div>
  );
}

function AdminDashboard() {
  const { data: projects, loading: lP } = useApi(getProjects);
  const { data: experiences, loading: lE } = useApi(getExperiences);
  const { data: educations, loading: lEd } = useApi(getEducations);

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-slate-500 text-sm">Overview of your portfolio content</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        <StatCard icon={Code2} title="Total Projects" count={projects?.length}
          to="/admin/projects" color="bg-primary-700/50" loading={lP} />
        <StatCard icon={Briefcase} title="Experience Entries" count={experiences?.length}
          to="/admin/experience" color="bg-blue-700/50" loading={lE} />
        <StatCard icon={GraduationCap} title="Education Entries" count={educations?.length}
          to="/admin/education" color="bg-violet-700/50" loading={lEd} />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="font-display font-bold text-white text-lg mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Add New Project', to: '/admin/projects', icon: Code2 },
            { label: 'Add Experience', to: '/admin/experience', icon: Briefcase },
            { label: 'Add Education', to: '/admin/education', icon: GraduationCap },
          ].map(({ label, to, icon: Icon }) => (
            <Link key={to} to={to}
              className="glass rounded-xl p-4 flex items-center gap-3 hover:border-primary-700/40 transition-all duration-200 group">
              <Icon size={18} className="text-accent-400" />
              <span className="text-slate-300 text-sm group-hover:text-white transition-colors">{label}</span>
              <Plus size={14} className="ml-auto text-slate-500 group-hover:text-accent-400 transition-colors" />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <h2 className="font-display font-bold text-white text-lg mb-4">Recent Projects</h2>
        {lP ? (
          <Spinner size="sm" text="Loading..." />
        ) : !projects || projects.length === 0 ? (
          <div className="glass rounded-xl p-8 text-center">
            <p className="text-slate-500 text-sm">No projects yet.</p>
            <Link to="/admin/projects" className="btn-primary inline-flex mt-4">
              <Plus size={15} /> Add First Project
            </Link>
          </div>
        ) : (
          <div className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-700/50">
                    <th className="text-left px-5 py-3 text-slate-500 text-xs uppercase tracking-widest font-medium">Title</th>
                    <th className="text-left px-5 py-3 text-slate-500 text-xs uppercase tracking-widest font-medium hidden sm:table-cell">Category</th>
                    <th className="text-left px-5 py-3 text-slate-500 text-xs uppercase tracking-widest font-medium hidden md:table-cell">Featured</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.slice(0, 5).map((p) => (
                    <tr key={p._id} className="border-b border-dark-700/30 last:border-0 hover:bg-dark-700/20 transition-colors">
                      <td className="px-5 py-3 text-white text-sm font-medium">{p.title}</td>
                      <td className="px-5 py-3 hidden sm:table-cell">
                        <span className="text-xs font-mono text-accent-400 bg-primary-900/40 px-2 py-0.5 rounded">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-5 py-3 hidden md:table-cell">
                        <span className={`text-xs font-mono px-2 py-0.5 rounded ${p.featured ? 'text-green-400 bg-green-900/30' : 'text-slate-500 bg-dark-700'}`}>
                          {p.featured ? 'Yes' : 'No'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
