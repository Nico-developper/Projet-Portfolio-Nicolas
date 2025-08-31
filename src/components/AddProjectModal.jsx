import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { getToken } from '@/services/authService';
import '../styles/components/AddProjectModal.scss';

export default function AddProjectModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tech: '',
    githubUrl: '',
    demoUrl: '',
    imageFile: null,
  });
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');

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
    setPreview(URL.createObjectURL(file));
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const token = getToken();
      const body = new FormData();
      body.append('title', formData.title);
      body.append('description', formData.description);
      body.append('tech', formData.tech);
      if (formData.githubUrl) body.append('githubUrl', formData.githubUrl);
      if (formData.demoUrl) body.append('demoUrl', formData.demoUrl);
      if (formData.imageFile) body.append('image', formData.imageFile);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body,
      });

      if (!res.ok) throw new Error('Erreur lors de la création du projet');
      const newProject = await res.json();
      onAdd?.(newProject);
    } catch (err) {
      setMessage(err.message || 'Erreur lors de l’ajout');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="add-project-modal"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Ajouter un projet"
      >
        <button className="close-btn" onClick={onClose} aria-label="Fermer">
          <X />
        </button>
        <h3>Ajouter un projet</h3>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="title">Titre</label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: Kasa"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brève description du projet"
              rows={4}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="tech">Technologies</label>
            <input
              id="tech"
              name="tech"
              value={formData.tech}
              onChange={handleChange}
              placeholder="React, SCSS, Node..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="githubUrl">Lien GitHub</label>
              <input
                id="githubUrl"
                name="githubUrl"
                type="url"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/..."
              />
            </div>
            <div className="form-group">
              <label htmlFor="demoUrl">Lien Démo</label>
              <input
                id="demoUrl"
                name="demoUrl"
                type="url"
                value={formData.demoUrl}
                onChange={handleChange}
                placeholder="https://exemple.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image">Image (jpg/jpeg, max 20 Mo)</label>
            <input id="image" type="file" accept=".jpg,.jpeg" onChange={handleFile} />
            {preview && <img src={preview} alt="Aperçu" className="preview" />}
          </div>

          <button type="submit" className="submit-btn">
            Créer
          </button>
          {message && <p className="message">{message}</p>}
        </form>
      </motion.div>
    </div>
  );
}
