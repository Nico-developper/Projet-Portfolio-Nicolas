import { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { API, authHeader } from '../services/api';
import { isAuthenticated as checkAuth } from '@/services/authService';

export default function ProjectModal({ project, onClose, onNext, onPrev, onDelete, onUpdate }) {
  const dialogRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  // Auth
  const [canEdit, setCanEdit] = useState(false);
  useEffect(() => {
    setCanEdit(checkAuth());
  }, [project]);

  // Form state
  const [title, setTitle] = useState(project?.title ?? '');
  const [description, setDescription] = useState(project?.description ?? '');
  const [tech, setTech] = useState(
    Array.isArray(project?.tech)
      ? project.tech.join(', ')
      : typeof project?.tech === 'string'
        ? project.tech
        : '',
  );
  const [githubUrl, setGithubUrl] = useState(project?.githubUrl ?? '');
  const [demoUrl, setDemoUrl] = useState(project?.demoUrl ?? '');
  const [featured, setFeatured] = useState(Boolean(project?.featured));
  const [order, setOrder] = useState(Number.isFinite(project?.order) ? project.order : 0);

  // Image preview & fichier
  const initialCover = useMemo(() => {
    if (!project?.coverImage) return null;
    if (project.coverImage?.startsWith?.('data:')) return project.coverImage;
    return `data:image/jpeg;base64,${project.coverImage}`;
  }, [project]);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialCover);

  useEffect(() => {
    setTitle(project?.title ?? '');
    setDescription(project?.description ?? '');
    setTech(
      Array.isArray(project?.tech)
        ? project.tech.join(', ')
        : typeof project?.tech === 'string'
          ? project.tech
          : '',
    );
    setGithubUrl(project?.githubUrl ?? '');
    setDemoUrl(project?.demoUrl ?? '');
    setFeatured(Boolean(project?.featured));
    setOrder(Number.isFinite(project?.order) ? project.order : 0);
    setImageFile(null);
    setImagePreview(initialCover);
    setEditing(false);
    setError('');
  }, [project, initialCover]);

  // Focus trap + ESC + ← →
  useEffect(() => {
    const node = dialogRef.current;
    if (!node) return;

    const focusable = () =>
      node?.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose?.();
      }
      if (e.key === 'Tab') {
        const items = Array.from(focusable() ?? []);
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
      if (!editing && e.key === 'ArrowRight') onNext?.();
      if (!editing && e.key === 'ArrowLeft') onPrev?.();
    };

    node?.addEventListener('keydown', onKeyDown);
    const timer = setTimeout(() => node?.focus?.(), 0);
    return () => {
      node?.removeEventListener('keydown', onKeyDown);
      clearTimeout(timer);
    };
  }, [onClose, onNext, onPrev, editing]);

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith?.('blob:')) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const onPickImage = (e) => {
    const f = e.target.files?.[0];
    setError('');
    if (!f) return;
    if (!/^image\/(jpe?g|png|webp)$/i.test(f.type))
      return setError('Format image invalide (JPEG/PNG/WebP uniquement).');
    if (f.size > 4 * 1024 * 1024) return setError('Taille maximale 4 Mo.');
    setImageFile(f);
    setImagePreview(URL.createObjectURL(f));
  };

  const identifier = project?._id ?? project?.slug;

  const handleSave = async (e) => {
    e?.preventDefault();
    if (!identifier) return;
    try {
      setSaving(true);
      setError('');
      const form = new FormData();
      form.append('title', title.trim());
      form.append('description', description.trim());
      form.append('tech', tech);
      form.append('githubUrl', githubUrl.trim());
      form.append('demoUrl', demoUrl.trim());
      form.append('featured', String(Boolean(featured)));
      form.append('order', String(Number(order) || 0));
      if (imageFile) form.append('image', imageFile);

      const res = await fetch(`${API}/projects/${identifier}`, {
        method: 'PUT',
        headers: { ...authHeader() },
        body: form,
      });
      if (!res.ok) {
        const t = await res.json().catch(() => ({}));
        throw new Error(t?.message || 'Erreur serveur');
      }
      const updated = await res.json();
      onUpdate?.(updated);
      setEditing(false);
    } catch (err) {
      setError(err.message || 'Impossible d’enregistrer');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!identifier) return;
    // eslint-disable-next-line no-alert
    const ok = window.confirm(`Supprimer définitivement le projet « ${project.title} » ?`);
    if (!ok) return;
    try {
      setDeleting(true);
      setError('');
      const res = await fetch(`${API}/projects/${identifier}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
      });
      if (!res.ok) {
        const t = await res.json().catch(() => ({}));
        throw new Error(t?.message || 'Suppression refusée');
      }
      onDelete?.(project.slug);
      onClose?.();
    } catch (err) {
      setError(err.message || 'Erreur de suppression');
    } finally {
      setDeleting(false);
    }
  };

  // Fermer au clic en dehors
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  if (!project) return null;

  const readCover = imagePreview || initialCover || null;
  const viewTechs = useMemo(() => {
    if (editing) return [];
    if (Array.isArray(project?.tech)) return project.tech;
    if (typeof project?.tech === 'string')
      return project.tech
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    return [];
  }, [project, editing]);

  return (
    <div className="modal__backdrop" onMouseDown={handleBackdropClick} aria-hidden={false}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        ref={dialogRef}
        tabIndex={-1}
        onMouseDown={(e) => e.stopPropagation()} // évite de propager à la backdrop
      >
        <button className="modal__close" onClick={onClose} aria-label="Fermer">
          ×
        </button>

        {!editing ? (
          <>
            <header className="modal__header">
              <h2 id="project-modal-title">{project.title}</h2>
            </header>

            <div className="modal__body">
              {readCover && (
                <img
                  src={readCover}
                  alt={`Couverture ${project.title}`}
                  className="modal__cover"
                  loading="lazy"
                />
              )}

              <p className="modal__description">{project.description}</p>

              {viewTechs.length > 0 && (
                <ul className="modal__tags">
                  {viewTechs.map((t, i) => (
                    <li key={`${t}-${i}`} className="tag">
                      {t}
                    </li>
                  ))}
                </ul>
              )}

              <div className="modal__links">
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="button">
                    Code
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="button outline"
                  >
                    Démo
                  </a>
                )}
              </div>
            </div>

            {/* Actions flottantes en bas à droite */}
            <div className="modal__floating-actions">
              <div className="nav">
                {onPrev && (
                  <button
                    className="icon-btn"
                    onClick={onPrev}
                    aria-label="Projet précédent"
                    title="Projet précédent"
                  >
                    ←
                  </button>
                )}
                {onNext && (
                  <button
                    className="icon-btn"
                    onClick={onNext}
                    aria-label="Projet suivant"
                    title="Projet suivant"
                  >
                    →
                  </button>
                )}
              </div>

              {canEdit && (
                <div className="crud">
                  <button onClick={() => setEditing(true)} className="button small">
                    Modifier
                  </button>
                  <button
                    onClick={handleDelete}
                    className="button small danger"
                    disabled={deleting}
                  >
                    {deleting ? 'Suppression…' : 'Supprimer'}
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <form className="modal__form" onSubmit={handleSave}>
            <header className="modal__header">
              <h2 id="project-modal-title">Modifier le projet</h2>
              <div className="modal__actions">
                <button
                  type="button"
                  className="button small outline"
                  onClick={() => setEditing(false)}
                >
                  Annuler
                </button>
                <button type="submit" className="button small" disabled={saving}>
                  {saving ? 'Enregistrement…' : 'Enregistrer'}
                </button>
              </div>
            </header>

            <div className="modal__body">
              <div className="field">
                <label htmlFor="title">Titre</label>
                <input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
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

              <div className="field">
                <label htmlFor="image">Image de couverture (JPEG/PNG/WebP, ≤ 4 Mo)</label>
                <input
                  id="image"
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={onPickImage}
                />
              </div>

              {imagePreview && (
                <div className="preview">
                  <img
                    src={imagePreview}
                    alt="Aperçu de la nouvelle image"
                    className="modal__cover"
                  />
                </div>
              )}

              {error && <p className="error">{error}</p>}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

ProjectModal.propTypes = {
  project: PropTypes.object,
  onClose: PropTypes.func,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  onDelete: PropTypes.func, // onDelete(slug)
  onUpdate: PropTypes.func, // onUpdate(updatedProject)
};
