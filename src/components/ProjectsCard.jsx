// => Version complète avec navigation/édition/suppression + onUpdate (remontée d'état)
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { isAuthenticated, getToken } from '@/services/authService';
import { API, authHeader } from '@/services/api';
import '../styles/components/ProjectModal.scss';

export default function ProjectModal({ project, onClose, onPrev, onNext, onDelete, onUpdate }) {
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech: '',
    githubUrl: '',
    demoUrl: '',
    imageFile: null,
  });

  useEffect(() => {
    if (!project) return;
    setFormData({
      title: project.title || '',
      description: project.description || '',
      tech: Array.isArray(project.tech) ? project.tech.join(', ') : project.tech || '',
      githubUrl: project.githubUrl || '',
      demoUrl: project.demoUrl || '',
      imageFile: null,
    });
    setPreviewImage(null);
    setMessage('');
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!/\.jpe?g$/i.test(file.name)) return setMessage('Image invalide : uniquement .jpg / .jpeg');
    if (file.size > 20 * 1024 * 1024) return setMessage('Image trop lourde (max 20 Mo).');
    setFormData((p) => ({ ...p, imageFile: file }));
    setPreviewImage(URL.createObjectURL(file));
    setMessage('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      if (!token) return setMessage('Vous devez être connecté.');

      const form = new FormData();
      form.append('title', formData.title);
      form.append('description', formData.description);
      form.append('tech', formData.tech);
      form.append('githubUrl', formData.githubUrl);
      form.append('demoUrl', formData.demoUrl);
      if (formData.imageFile) form.append('image', formData.imageFile);

      const res = await fetch(`${API}/projects/${project.slug}`, {
        method: 'PUT',
        headers: { ...authHeader() },
        body: form,
      });
      if (!res.ok) throw new Error('Erreur lors de la mise à jour');

      const updated = await res.json();
      setMessage('Projet mis à jour ✅');
      setEditMode(false);
      onUpdate?.(updated); // ⬅️ remontée d'état à la page
    } catch (err) {
      setMessage(err.message || 'Erreur mise à jour');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Supprimer ce projet ?')) return;
    try {
      const token = getToken();
      if (!token) return setMessage('Vous devez être connecté.');

      const res = await fetch(`${API}/projects/${project.slug}`, {
        method: 'DELETE',
        headers: { ...authHeader() },
      });
      if (!res.ok) throw new Error('Erreur lors de la suppression');
      onDelete?.(project.slug);
    } catch (err) {
      setMessage(err.message || 'Erreur suppression');
    }
  };

  return (
    <motion.div
      className="modal-backdrop"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="modal"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className="close-btn" onClick={onClose} aria-label="Fermer">
          <X />
        </button>

        {editMode ? (
          <form onSubmit={handleUpdate} className="edit-form">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Titre"
              required
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              rows={4}
              required
            />
            <input
              name="tech"
              value={formData.tech}
              onChange={handleChange}
              placeholder="Technologies (séparées par des virgules)"
            />
            <input
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              placeholder="URL GitHub"
            />
            <input
              name="demoUrl"
              value={formData.demoUrl}
              onChange={handleChange}
              placeholder="URL Démo"
            />
            <label className="file">
              <span>Remplacer l’image (.jpg/.jpeg, max 20 Mo)</span>
              <input type="file" accept=".jpg,.jpeg" onChange={handleFile} />
            </label>
            {previewImage ? (
              <img src={previewImage} alt="Aperçu" className="preview" />
            ) : (
              project?.coverImage && <img src={project.coverImage} alt="" className="preview" />
            )}
            {message && <p className="message">{message}</p>}
            <div className="actions">
              <button type="button" onClick={() => setEditMode(false)}>
                Annuler
              </button>
              <button type="submit">Enregistrer</button>
            </div>
          </form>
        ) : (
          <>
            <div className="content">
              {project?.coverImage && <img src={project.coverImage} alt="" className="cover" />}
              <h3>{project?.title}</h3>
              {project?.tech?.length ? (
                <p className="tech">
                  {Array.isArray(project.tech) ? project.tech.join(' • ') : project.tech}
                </p>
              ) : null}
              <p className="description">{project?.description}</p>
              <div className="links">
                {project?.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                )}
                {project?.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noreferrer">
                    Démo
                  </a>
                )}
              </div>
            </div>

            {isAuthenticated() && (
              <div className="admin-actions">
                <button onClick={() => setEditMode(true)}>Modifier</button>
                <button onClick={handleDelete} className="danger">
                  Supprimer
                </button>
              </div>
            )}
          </>
        )}

        <div className="nav-buttons">
          <button onClick={onPrev} aria-label="Projet précédent">
            <ChevronLeft size={24} />
          </button>
          <button onClick={onNext} aria-label="Projet suivant">
            <ChevronRight size={24} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
