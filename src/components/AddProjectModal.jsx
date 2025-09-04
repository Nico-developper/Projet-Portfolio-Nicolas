import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { API, authHeader } from '../services/api';

/**
 * Modale d’ajout de projet.
 * Alignée avec pages/Projects.jsx :
 *  - pas de prop isOpen (affichée conditionnellement par le parent)
 *  - callbacks : onClose(), onAdd(newProject)
 */
export default function AddProjectModal({ onClose, onAdd }) {
  const dialogRef = useRef(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tech, setTech] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [featured, setFeatured] = useState(false);
  const [order, setOrder] = useState(0);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const node = dialogRef.current;
    if (!node) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose?.();
      }
    };
    node?.addEventListener('keydown', onKeyDown);
    const t = setTimeout(() => node?.focus?.(), 0);
    return () => {
      node?.removeEventListener('keydown', onKeyDown);
      clearTimeout(t);
    };
  }, [onClose]);

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith?.('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const onPickImage = (e) => {
    const f = e.target.files?.[0];
    setError('');
    if (!f) return;

    if (!/^image\/(jpe?g|png|webp)$/i.test(f.type)) {
      setError('Format image invalide (JPEG/PNG/WebP uniquement).');
      return;
    }
    if (f.size > 4 * 1024 * 1024) {
      setError('Taille maximale 4 Mo.');
      return;
    }
    setImageFile(f);
    const url = URL.createObjectURL(f);
    setImagePreview(url);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setTech('');
    setGithubUrl('');
    setDemoUrl('');
    setFeatured(false);
    setOrder(0);
    setImageFile(null);
    if (imagePreview?.startsWith?.('blob:')) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    try {
      setSaving(true);
      setError('');

      const form = new FormData();
      form.append('title', title.trim());
      form.append('description', description.trim());
      form.append('tech', tech); // string séparée par virgules
      form.append('githubUrl', githubUrl.trim());
      form.append('demoUrl', demoUrl.trim());
      form.append('featured', String(Boolean(featured)));
      form.append('order', String(Number(order) || 0));
      if (imageFile) form.append('image', imageFile);

      const res = await fetch(`${API}/projects`, {
        method: 'POST',
        headers: { ...authHeader() },
        body: form,
      });

      if (!res.ok) {
        const t = await res.json().catch(() => ({}));
        throw new Error(t?.message || 'Création impossible');
      }
      const created = await res.json();
      onAdd?.(created);
      resetForm();
      onClose?.();
    } catch (err) {
      setError(err.message || 'Erreur lors de l’ajout');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal__backdrop" aria-hidden={false}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-project-title"
        ref={dialogRef}
        tabIndex={-1}
      >
        <button className="modal__close" onClick={onClose} aria-label="Fermer">
          ×
        </button>

        <form className="modal__form" onSubmit={handleSubmit}>
          <header className="modal__header">
            <h2 id="add-project-title">Ajouter un projet</h2>
            <div className="modal__actions">
              <button type="button" onClick={onClose}>
                Annuler
              </button>
              <button type="submit" disabled={saving}>
                {saving ? 'Ajout...' : 'Créer'}
              </button>
            </div>
          </header>

          <div className="modal__body">
            <div className="field">
              <label htmlFor="title">Titre</label>
              <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="field">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="tech">Technologies (séparées par des virgules)</label>
              <input
                id="tech"
                value={tech}
                onChange={(e) => setTech(e.target.value)}
                placeholder="React, Node, MongoDB, ..."
              />
            </div>

            <div className="grid">
              <div className="field">
                <label htmlFor="githubUrl">GitHub</label>
                <input
                  id="githubUrl"
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/..."
                />
              </div>

              <div className="field">
                <label htmlFor="demoUrl">Démo</label>
                <input
                  id="demoUrl"
                  type="url"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="grid">
              <div className="field checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                  />
                  Mettre en avant
                </label>
              </div>

              <div className="field">
                <label htmlFor="order">Ordre d’affichage</label>
                <input
                  id="order"
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  min={0}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="image">Image de couverture (JPEG/PNG/WebP, ≤ 4 Mo)</label>
              <input id="image" type="file" accept=".jpg,.jpeg,.png,.webp" onChange={onPickImage} />
            </div>

            {imagePreview && (
              <div className="preview">
                <img src={imagePreview} alt="Aperçu de l’image" className="modal__cover" />
              </div>
            )}

            {error && <p className="error">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

AddProjectModal.propTypes = {
  onClose: PropTypes.func,
  onAdd: PropTypes.func, // onAdd(newProject)
};
