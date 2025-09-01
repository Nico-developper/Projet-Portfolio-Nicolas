import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { getToken } from '@/services/authService';
import { API, authHeader } from '@/services/api';
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

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  }

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!/\.jpe?g$/i.test(file.name)) return setMessage('Image invalide : uniquement .jpg / .jpeg');
    if (file.size > 20 * 1024 * 1024) return setMessage('Image trop lourde (max 20 Mo).');
    setFormData((p) => ({ ...p, imageFile: file }));
    setPreview(URL.createObjectURL(file));
    setMessage('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const token = getToken();
      if (!token) return setMessage('Vous devez être connecté.');

      const body = new FormData();
      body.append('title', formData.title);
      body.append('description', formData.description);
      body.append('tech', formData.tech);
      body.append('githubUrl', formData.githubUrl);
      body.append('demoUrl', formData.demoUrl);
      if (formData.imageFile) body.append('image', formData.imageFile);

      const res = await fetch(`${API}/projects`, {
        method: 'POST',
        headers: { ...authHeader() },
        body,
      });

      if (!res.ok) throw new Error('Erreur lors de la création du projet');
      const newProject = await res.json();
      setMessage('Projet ajouté ✅');
      onAdd?.(newProject);
    } catch (err) {
      setMessage(err.message || 'Erreur lors de l’ajout');
    }
  }

  return (
    <motion.div
      className="modal-backdrop"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <button className="close-btn" onClick={onClose} aria-label="Fermer">
          <X />
        </button>

        <h3>Ajouter un projet</h3>
        <form onSubmit={handleSubmit} className="add-form">
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
            <span>Image (.jpg/.jpeg, max 20 Mo)</span>
            <input type="file" accept=".jpg,.jpeg" onChange={handleFile} />
          </label>

          {preview && <img src={preview} alt="Aperçu" className="preview" />}

          {message && <p className="message">{message}</p>}
          <div className="actions">
            <button type="button" onClick={onClose}>
              Annuler
            </button>
            <button type="submit">Ajouter</button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
