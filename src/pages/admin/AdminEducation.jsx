import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Loader2, GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminModal from '../../components/admin/AdminModal';
import Spinner from '../../components/common/Spinner';
import useApi from '../../hooks/useApi';
import { getEducations, createEducation, updateEducation, deleteEducation } from '../../services/api';

const EMPTY_FORM = {
  degree: '', institution: '', location: '', fieldOfStudy: '',
  startDate: '', endDate: '', current: false,
  grade: '', description: '', order: 0,
};

function EducationForm({ form, setForm, onSubmit, loading, onClose }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Degree / Certificate *</label>
          <input value={form.degree} onChange={(e) => setForm({ ...form, degree: e.target.value })}
            required placeholder="e.g. B.Sc in CSE" className="input-field" />
        </div>
        <div>
          <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Institution *</label>
          <input value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })}
            required placeholder="University or institution name" className="input-field" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Field of Study</label>
          <input value={form.fieldOfStudy} onChange={(e) => setForm({ ...form, fieldOfStudy: e.target.value })}
            placeholder="e.g. Computer Science" className="input-field" />
        </div>
        <div>
          <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Location</label>
          <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="e.g. Chittagong, Bangladesh" className="input-field" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Start Date *</label>
          <input value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            required placeholder="e.g. 2020" className="input-field" />
        </div>
        <div>
          <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">End Date</label>
          <input value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            placeholder="e.g. 2024 or Present" disabled={form.current}
            className={`input-field ${form.current ? 'opacity-40 cursor-not-allowed' : ''}`} />
        </div>
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" checked={form.current}
          onChange={(e) => setForm({ ...form, current: e.target.checked, endDate: e.target.checked ? 'Present' : '' })}
          className="w-4 h-4 accent-primary-500" />
        <span className="text-slate-300 text-sm">Currently studying here</span>
      </label>

      <div>
        <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Grade / CGPA</label>
        <input value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })}
          placeholder="e.g. 3.80 / 4.00" className="input-field" />
      </div>

      <div>
        <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Description</label>
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3} placeholder="Relevant coursework, achievements, activities..."
          className="input-field resize-none" />
      </div>

      <div>
        <label className="block text-slate-500 text-xs uppercase tracking-widest mb-2">Order</label>
        <input type="number" value={form.order}
          onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
          className="input-field" />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">
          {loading ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : 'Save Education'}
        </button>
        <button type="button" onClick={onClose} className="btn-outline px-5">Cancel</button>
      </div>
    </form>
  );
}

function AdminEducation() {
  const { data: educations, loading, refetch } = useApi(getEducations);
  const [modal, setModal] = useState({ open: false, mode: 'add', item: null });
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setModal({ open: true, mode: 'add', item: null });
  };

  const openEdit = (edu) => {
    setForm({
      degree: edu.degree, institution: edu.institution,
      location: edu.location || '', fieldOfStudy: edu.fieldOfStudy || '',
      startDate: edu.startDate, endDate: edu.endDate || '',
      current: edu.current, grade: edu.grade || '',
      description: edu.description || '', order: edu.order,
    });
    setModal({ open: true, mode: 'edit', item: edu });
  };

  const closeModal = () => setModal({ open: false, mode: 'add', item: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (modal.mode === 'add') {
        await createEducation(form);
        toast.success('Education entry added!');
      } else {
        await updateEducation(modal.item._id, form);
        toast.success('Education updated!');
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
    if (!window.confirm('Delete this education entry? This cannot be undone.')) return;
    setDeleteId(id);
    try {
      await deleteEducation(id);
      toast.success('Education entry deleted!');
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
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-1">Education</h1>
          <p className="text-slate-500 text-sm">{educations?.length ?? 0} entries</p>
        </div>
        <button onClick={openAdd} className="btn-primary">
          <Plus size={16} /> Add Education
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <Spinner text="Loading education..." />
      ) : !educations || educations.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <GraduationCap size={36} className="text-dark-600 mx-auto mb-4" />
          <p className="text-slate-500 mb-4">No education entries yet.</p>
          <button onClick={openAdd} className="btn-primary">
            <Plus size={15} /> Add First Entry
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {educations.map((edu, i) => (
            <motion.div key={edu._id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="glass rounded-xl p-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-blue-900/40 border border-blue-700/40 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={17} className="text-blue-400" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start gap-2 mb-1">
                    <h3 className="font-display font-bold text-white text-lg">{edu.degree}</h3>
                    {edu.current && (
                      <span className="text-xs text-green-400 bg-green-900/30 px-2 py-0.5 rounded font-mono">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-accent-400 text-sm mb-1">{edu.institution}</p>
                  {edu.fieldOfStudy && (
                    <p className="text-slate-500 text-xs mb-2">{edu.fieldOfStudy}</p>
                  )}
                  <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} /> {edu.startDate} — {edu.current ? 'Present' : edu.endDate}
                    </span>
                    {edu.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={11} /> {edu.location}
                      </span>
                    )}
                    {edu.grade && (
                      <span className="flex items-center gap-1 text-blue-400">
                        <Award size={11} /> {edu.grade}
                      </span>
                    )}
                  </div>
                  {edu.description && (
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">{edu.description}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(edu)}
                    className="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-dark-600 transition-colors">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDelete(edu._id)} disabled={deleteId === edu._id}
                    className="w-8 h-8 rounded-lg bg-red-900/20 flex items-center justify-center text-red-400 hover:bg-red-900/40 transition-colors">
                    {deleteId === edu._id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
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
        title={modal.mode === 'add' ? 'Add Education' : 'Edit Education'}
      >
        <EducationForm form={form} setForm={setForm} onSubmit={handleSubmit} loading={saving} onClose={closeModal} />
      </AdminModal>
    </AdminLayout>
  );
}

export default AdminEducation;
