import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Loader2, Star, Code2 } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminModal from '../../components/admin/AdminModal';
import Spinner from '../../components/common/Spinner';
import useApi from '../../hooks/useApi';
import { getProjects, createProject, updateProject, deleteProject } from '../../services/api';

const EMPTY_FORM = {
  title: '', description: '', longDescription: '', image: '',
  techStack: '', liveUrl: '', githubUrl: '',
  category: 'Full Stack', featured: false, order: 0,
};

function ProjectForm({ form, setForm, onSubmit, loading, onClose }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Title *</label>
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
          required placeholder="Project title" className="input-field" />
      </div>
      <div>
        <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Short Description *</label>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
          required rows={2} placeholder="Brief description (shown in cards)" className="input-field resize-none" />
      </div>
      <div>
        <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Full Description</label>
        <textarea value={form.longDescription} onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
          rows={3} placeholder="Detailed description (optional)" className="input-field resize-none" />
      </div>
      <div>
        <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Image URL</label>
        <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
          placeholder="https://..." className="input-field" />
      </div>
      <div>
        <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Tech Stack (comma-separated)</label>
        <input value={form.techStack} onChange={(e) => setForm({ ...form, techStack: e.target.value })}
          placeholder="React, Node.js, MongoDB, Tailwind" className="input-field" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Live URL</label>
          <input value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
            placeholder="https://..." className="input-field" />
        </div>
        <div>
          <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">GitHub URL</label>
          <input value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
            placeholder="https://github.com/..." className="input-field" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Category</label>
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="input-field">
            {['Frontend', 'Backend', 'Full Stack', 'Other'].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Order</label>
          <input type="number" value={form.order}
            onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
            className="input-field" />
        </div>
      </div>
      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" checked={form.featured}
          onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          className="w-4 h-4 accent-primary-500" />
        <span className="text-slate-300 text-sm">Featured project (shown on home page)</span>
      </label>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">
          {loading ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : 'Save Project'}
        </button>
        <button type="button" onClick={onClose} className="btn-outline flex-shrink-0 px-5">Cancel</button>
      </div>
    </form>
  );
}

function AdminProjects() {
  const { data: projects, loading, refetch } = useApi(getProjects);
  const [modal, setModal] = useState({ open: false, mode: 'add', project: null });
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setModal({ open: true, mode: 'add', project: null });
  };

  const openEdit = (p) => {
    setForm({
      title: p.title, description: p.description, longDescription: p.longDescription || '',
      image: p.image || '', techStack: p.techStack?.join(', ') || '',
      liveUrl: p.liveUrl || '', githubUrl: p.githubUrl || '',
      category: p.category, featured: p.featured, order: p.order,
    });
    setModal({ open: true, mode: 'edit', project: p });
  };

  const closeModal = () => setModal({ open: false, mode: 'add', project: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        techStack: form.techStack.split(',').map((t) => t.trim()).filter(Boolean),
      };
      if (modal.mode === 'add') {
        await createProject(payload);
        toast.success('Project created!');
      } else {
        await updateProject(modal.project._id, payload);
        toast.success('Project updated!');
      }
      closeModal();
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project? This cannot be undone.')) return;
    setDeleteId(id);
    try {
      await deleteProject(id);
      toast.success('Project deleted!');
      refetch();
    } catch {
      toast.error('Failed to delete project');
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">Projects</h1>
          <p className="text-slate-500 text-sm">{projects?.length ?? 0} total projects</p>
        </div>
        <button onClick={openAdd} className="btn-primary">
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <Spinner text="Loading projects..." />
      ) : !projects || projects.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <Code2 size={36} className="text-dark-600 mx-auto mb-4" />
          <p className="text-slate-500 mb-4">No projects yet.</p>
          <button onClick={openAdd} className="btn-primary">
            <Plus size={15} /> Add First Project
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <motion.div key={p._id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="glass rounded-xl overflow-hidden"
            >
              {/* Image */}
              <div className="h-36 bg-dark-700 overflow-hidden relative">
                {p.image ? (
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Code2 size={28} className="text-primary-800" />
                  </div>
                )}
                {p.featured && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 text-xs text-yellow-400 bg-dark-950/80 px-2 py-0.5 rounded">
                    <Star size={11} fill="currentColor" /> Featured
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display font-bold text-white text-base leading-tight">{p.title}</h3>
                  <span className="text-xs font-mono text-accent-400 bg-primary-900/40 px-2 py-0.5 rounded flex-shrink-0">
                    {p.category}
                  </span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed mb-3 line-clamp-2">{p.description}</p>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(p)}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-dark-700 text-slate-300 hover:text-white hover:bg-dark-600 transition-colors flex-1 justify-center">
                    <Pencil size={13} /> Edit
                  </button>
                  <button onClick={() => handleDelete(p._id)} disabled={deleteId === p._id}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-red-900/20 text-red-400 hover:bg-red-900/40 transition-colors flex-1 justify-center">
                    {deleteId === p._id ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AdminModal
        open={modal.open} onClose={closeModal}
        title={modal.mode === 'add' ? 'Add New Project' : 'Edit Project'}
      >
        <ProjectForm form={form} setForm={setForm} onSubmit={handleSubmit} loading={saving} onClose={closeModal} />
      </AdminModal>
    </AdminLayout>
  );
}

export default AdminProjects;
