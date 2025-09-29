import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { API } from '@/services/api';
import { getToken, isAuthenticated as isAuthFn } from '@/services/authService';
import '@/styles/components/Modal.scss';

const isHttpUrl = (v) => /^https?:\/\/[^\s]+$/i.test(v);
const isPublicPath = (v) => typeof v === 'string' && v.startsWith('/');
const normUrl = (v) => (isHttpUrl(v) || isPublicPath(v) ? v : '');
const splitTech = (v) =>
  Array.isArray(v)
    ? v
    : typeof v === 'string'
      ? v
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

const MAX_IMG_MB = 20;
const ACCEPTED_IMG = ['image/jpeg', 'image/jpg'];

export default function ProjectModal({
  isOpen,
  project,
  index,
  total,
  onClose,
  onPrev,
  onNext,
  onUpdated,
  onDeleted,
}) {
  const backdropRef = useRef(null);
  const closeBtnRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: '',
    description: '',
    githubUrl: '',
    demoUrl: '',
    tech: '',
    coverFile: null,
    coverPreview: '',
  });

  const isAuthenticated = isAuthFn();
  const tags = useMemo(() => splitTech(project?.tech), [project]);

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => closeBtnRef.current?.focus(), 10);
    document.body.classList.add('is-modal-open');
    return () => {
      clearTimeout(t);
      document.body.classList.remove('is-modal-open');
    };
  }, [isOpen]);

  useEffect(() => {
    if (!project) return;
    setIsEditing(false);
    setError('');
    setForm({
      title: project.title || '',
      description: project.description || '',
      githubUrl: project.githubUrl || '',
      demoUrl: project.demoUrl || '',
      tech:
        Array.isArray(project.tech) && project.tech.length
          ? project.tech.join(', ')
          : typeof project.tech === 'string'
            ? project.tech
            : '',
      coverFile: null,
      coverPreview: project.coverImage ? project.coverImage : '',
    });
  }, [project]);

  const coverSrc = useMemo(() => {
    if (form.coverPreview) return form.coverPreview;
    if (project?.coverImage) return project.coverImage;
    return '';
  }, [form.coverPreview, project]);

  function onKeyDown(e) {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose?.();
    }
    if (e.key === 'ArrowLeft') onPrev?.();
    if (e.key === 'ArrowRight') onNext?.();
  }
  function onBackdropClick(e) {
    if (e.target === backdropRef.current) onClose?.();
  }
  function updateField(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  function onPickCover(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ACCEPTED_IMG.includes(file.type)) {
      setError('Seuls les fichiers .jpg et .jpeg sont acceptés.');
      return;
    }
    if (file.size > MAX_IMG_MB * 1024 * 1024) {
      setError(`L’image dépasse ${MAX_IMG_MB} Mo.`);
      return;
    }
    setError('');
    setForm((f) => ({ ...f, coverFile: file }));
    const reader = new FileReader();
    reader.onload = (ev) => setForm((f) => ({ ...f, coverPreview: ev.target.result }));
    reader.readAsDataURL(file);
  }

  async function handleSave() {
    if (!isAuthenticated) return;
    const title = form.title.trim();
    if (!title) {
      setError('Le titre est obligatoire.');
      return;
    }

    const githubUrl = form.githubUrl.trim();
    const demoUrl = form.demoUrl.trim();
    if (githubUrl && !isHttpUrl(githubUrl)) {
      setError('L’URL GitHub doit commencer par http(s)://');
      return;
    }
    if (demoUrl && !(isHttpUrl(demoUrl) || isPublicPath(demoUrl))) {
      setError('La Démo doit être une URL http(s):// ou un chemin /public.');
      return;
    }

    setBusy(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('title', title);
      fd.append('description', form.description || '');
      fd.append('githubUrl', githubUrl || '');
      fd.append('demoUrl', demoUrl || '');
      fd.append('tech', form.tech || '');
      if (form.coverFile) fd.append('image', form.coverFile); // IMPORTANT

      const res = await fetch(`${API}/projects/${project._id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${getToken() || ''}` },
        body: fd,
      });
      if (!res.ok) throw new Error((await safeErr(res)) || 'Échec de la sauvegarde.');
      const updated = await res.json();
      setIsEditing(false);
      onUpdated?.(updated);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (!isAuthenticated) return;
    const ok = window.confirm('Supprimer ce projet ? Cette action est définitive.');
    if (!ok) return;
    setBusy(true);
    setError('');
    try {
      const res = await fetch(`${API}/projects/${project._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken() || ''}` },
      });
      if (!res.ok) throw new Error((await safeErr(res)) || 'Impossible de supprimer ce projet.');
      onDeleted?.(project._id);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  function openLink(e, url) {
    e.stopPropagation();
    if (!url) return;
    const u = normUrl(url);
    if (!u) return;
    const final = u.startsWith('http') ? u : `${window.location.origin}${u.replace(/^\//, '/')}`;
    window.open(final, '_blank', 'noopener,noreferrer');
  }

  if (!isOpen || !project) return null;

  return createPortal(
    <div
      className="modal__backdrop"
      ref={backdropRef}
      onMouseDown={onBackdropClick}
      onKeyDown={onKeyDown}
      role="dialog"
      aria-modal="true"
      aria-label={`Projet ${project.title}`}
    >
      <div className="modal-content" onMouseDown={(e) => e.stopPropagation()}>
        <button ref={closeBtnRef} className="modal__close" aria-label="Fermer" onClick={onClose}>
          ✕
        </button>

        <div className="modal__header">
          <h2>
            {isEditing ? 'Modifier le projet' : project.title}
            {typeof index === 'number' && typeof total === 'number' && (
              <span style={{ marginLeft: 8, color: 'var(--muted)', fontSize: '.9rem' }}>
                {index + 1}/{total}
              </span>
            )}
          </h2>
        </div>

        <div className="modal__body">
          {!isEditing ? (
            <>
              {/** Zone image scrollable uniquement */}
              {coverSrc && (
                <div className="modal__media">
                  <img src={coverSrc} alt={`Aperçu ${project.title}`} />
                </div>
              )}

              {project.description && <p className="modal__description">{project.description}</p>}

              {tags.length > 0 && (
                <ul className="modal__tags">
                  {tags.map((t, i) => (
                    <li key={i} className="tag">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <form className="modal__form" onSubmit={(e) => e.preventDefault()}>
              <div className="grid">
                <div className="field">
                  <label htmlFor="title">Titre *</label>
                  <input
                    id="title"
                    type="text"
                    value={form.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="tech">Technologies (séparées par des virgules)</label>
                  <input
                    id="tech"
                    type="text"
                    value={form.tech}
                    onChange={(e) => updateField('tech', e.target.value)}
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => updateField('description', e.target.value)}
                />
              </div>

              <div className="grid">
                <div className="field">
                  <label htmlFor="githubUrl">URL GitHub</label>
                  <input
                    id="githubUrl"
                    type="url"
                    value={form.githubUrl}
                    onChange={(e) => updateField('githubUrl', e.target.value)}
                    placeholder="https://github.com/..."
                  />
                </div>
                <div className="field">
                  <label htmlFor="demoUrl">URL Démo (http(s):// ou /public)</label>
                  <input
                    id="demoUrl"
                    type="text"
                    value={form.demoUrl}
                    onChange={(e) => updateField('demoUrl', e.target.value)}
                    placeholder="https://... ou /demos/mon-projet/index.html"
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="cover">Image de couverture (.jpg/.jpeg, max {MAX_IMG_MB} Mo)</label>
                <input
                  id="cover"
                  type="file"
                  accept=".jpg,.jpeg,image/jpeg"
                  onChange={onPickCover}
                />
                {form.coverPreview && (
                  <div className="modal__media" style={{ maxHeight: 220 }}>
                    <img src={form.coverPreview} alt="Aperçu de l’image sélectionnée" />
                  </div>
                )}
              </div>

              {error && (
                <div className="error" role="alert">
                  {error}
                </div>
              )}
            </form>
          )}
        </div>

        <div className="modal__floating-actions">
          <div className="nav">
            <button className="icon-btn" onClick={onPrev} aria-label="Précédent">
              ←
            </button>
            <button className="icon-btn" onClick={onNext} aria-label="Suivant">
              →
            </button>
          </div>

          <div className="actions-right">
            {!isEditing ? (
              <>
                {project.githubUrl && (
                  <button
                    className="button small outline"
                    onClick={(e) => openLink(e, project.githubUrl)}
                  >
                    Code
                  </button>
                )}
                {project.demoUrl && (
                  <button className="button small" onClick={(e) => openLink(e, project.demoUrl)}>
                    Démo
                  </button>
                )}
                {isAuthenticated && (
                  <>
                    <button
                      className="button small"
                      onClick={() => setIsEditing(true)}
                      disabled={busy}
                    >
                      Modifier
                    </button>
                    <button className="button small danger" onClick={handleDelete} disabled={busy}>
                      Supprimer
                    </button>
                  </>
                )}
                <button className="button small" onClick={onClose}>
                  Fermer
                </button>
              </>
            ) : (
              <>
                <button
                  className="button small"
                  onClick={() => setIsEditing(false)}
                  disabled={busy}
                >
                  Annuler
                </button>
                <button className="button small" onClick={handleSave} disabled={busy}>
                  {busy ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

ProjectModal.propTypes = {
  isOpen: PropTypes.bool,
  project: PropTypes.object,
  index: PropTypes.number,
  total: PropTypes.number,
  onClose: PropTypes.func,
  onPrev: PropTypes.func,
  onNext: PropTypes.func,
  onUpdated: PropTypes.func,
  onDeleted: PropTypes.func,
};

async function safeErr(res) {
  try {
    const t = await res.text();
    return t || res.statusText;
  } catch {
    return res.statusText;
  }
}
