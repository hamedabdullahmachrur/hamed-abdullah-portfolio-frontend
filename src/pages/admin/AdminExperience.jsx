import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Loader2, Briefcase, Calendar, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminModal from '../../components/admin/AdminModal';
import Spinner from '../../components/common/Spinner';
import useApi from '../../hooks/useApi';
import { getExperiences, createExperience, updateExperience, deleteExperience } from '../../services/api';

const EMPTY_FORM = {
  title: '', company: '', location: '', type: 'Full-time',
  startDate: '', endDate: '', current: false,
  description: '', technologies: '',  order: 0,
};

function ExperienceForm({ form, setForm, onSubmit, loading, onClose }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Job Title *</label>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            required placeholder="e.g. Junior Web Developer" className="input-field" />
        </div>
        <div>
          <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Company *</label>
          <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
            required placeholder="Company name" className="input-field" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Location</label>
          <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="e.g. Chittagong, BD" className="input-field" />
        </div>
        <div>
          <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Type</label>
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="input-field">
            {['Full-time', 'Part-time', 'Freelance', 'Internship', 'Contract'].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Start Date *</label>
          <input value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            required placeholder="e.g. Jan 2023" className="input-field" />
        </div>
        <div>
          <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">End Date</label>
          <input value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            placeholder="e.g. Dec 2023 or Present" disabled={form.current}
            className={`input-field ${form.current ? 'opacity-40 cursor-not-allowed' : ''}`} />
        </div>
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" checked={form.current}
          onChange={(e) => setForm({ ...form, current: e.target.checked, endDate: e.target.checked ? 'Present' : '' })}
          className="w-4 h-4 accent-primary-500" />
        <span className="text-slate-300 text-sm">I currently work here</span>
      </label>

      <div>
        <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Description *</label>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
          required rows={4} placeholder="Describe your role, responsibilities, and achievements..."
          className="input-field resize-none" />
      </div>

      <div>
        <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Technologies (comma-separated)</label>
        <input value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })}
          placeholder="React, Node.js, MongoDB" className="input-field" />
      </div>

      <div>
        <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Order</label>
        <input type="number" value={form.order}
          onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
          className="input-field" />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">
          {loading ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : 'Save Experience'}
        </button>
        <button type="button" onClick={onClose} className="btn-outline px-5">Cancel</button>
      </div>
    </form>
  );
}

function AdminExperience() {
  const { data: experiences, loading, refetch } = useApi(getExperiences);
  const [modal, setModal] = useState({ open: false, mode: 'add', item: null });
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setModal({ open: true, mode: 'add', item: null });
  };

  const openEdit = (exp) => {
    setForm({
      title: exp.title, company: exp.company, location: exp.location || '',
      type: exp.type, startDate: exp.startDate, endDate: exp.endDate || '',
      current: exp.current, description: exp.description,
      technologies: exp.technologies?.join(', ') || '', order: exp.order,
    });
    setModal({ open: true, mode: 'edit', item: exp });
  };

  const closeModal = () => setModal({ open: false, mode: 'add', item: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        technologies: form.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      };
      if (modal.mode === 'add') {
        await createExperience(payload);
        toast.success('Experience entry added!');
      } else {
        await updateExperience(modal.item._id, payload);
        toast.success('Experience updated!');
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
    if (!window.confirm('Delete this experience entry? This cannot be undone.')) return;
    setDeleteId(id);
    try {
      await deleteExperience(id);
      toast.success('Experience deleted!');
      refetch();
    } catch {
      toast.error('Failed to delete');
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">Experience</h1>
          <p className="text-slate-500 text-sm">{experiences?.length ?? 0} entries</p>
        </div>
        <button onClick={openAdd} className="btn-primary">
          <Plus size={16} /> Add Experience
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <Spinner text="Loading experience..." />
      ) : !experiences || experiences.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <Briefcase size={36} className="text-dark-600 mx-auto mb-4" />
          <p className="text-slate-500 mb-4">No experience entries yet.</p>
          <button onClick={openAdd} className="btn-primary">
            <Plus size={15} /> Add First Entry
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp, i) => (
            <motion.div key={exp._id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="glass rounded-xl p-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-primary-900/50 border border-primary-700/40 flex items-center justify-center flex-shrink-0">
                  <Briefcase size={17} className="text-accent-400" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start gap-2 mb-1">
                    <h3 className="font-display font-bold text-white text-lg">{exp.title}</h3>
                    <span className="text-xs font-mono text-primary-400 bg-primary-900/30 px-2 py-0.5 rounded">
                      {exp.type}
                    </span>
                    {exp.current && (
                      <span className="text-xs text-green-400 bg-green-900/30 px-2 py-0.5 rounded font-mono">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-accent-400 text-sm mb-2">{exp.company}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} /> {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={11} /> {exp.location}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-3 line-clamp-2">{exp.description}</p>
                  {exp.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((t) => (
                        <span key={t} className="px-2 py-0.5 text-xs font-mono text-accent-400 bg-primary-900/30 border border-primary-800/40 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(exp)}
                    className="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-dark-600 transition-colors">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDelete(exp._id)} disabled={deleteId === exp._id}
                    className="w-8 h-8 rounded-lg bg-red-900/20 flex items-center justify-center text-red-400 hover:bg-red-900/40 transition-colors">
                    {deleteId === exp._id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
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
        title={modal.mode === 'add' ? 'Add Experience' : 'Edit Experience'}
      >
        <ExperienceForm form={form} setForm={setForm} onSubmit={handleSubmit} loading={saving} onClose={closeModal} />
      </AdminModal>
    </AdminLayout>
  );
}

export default AdminExperience;
