import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { API } from '@/services/api';
import { getToken, isAuthenticated as isAuthFn } from '@/services/authService';
import '@/styles/components/AddProjectModal.scss';

const MAX_IMG_MB = 20;
const ACCEPTED_IMG = ['image/jpeg', 'image/jpg'];

const isHttpUrl = (v) => /^https?:\/\/[^\s]+$/i.test(v);
const isPublicPath = (v) => typeof v === 'string' && v.startsWith('/');

export default function AddProjectModal({ isOpen, onClose, onCreated }) {
  const backdropRef = useRef(null);
  const closeBtnRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: '',
    description: '',
    tech: '',
    githubUrl: '',
    demoUrl: '',
    coverFile: null,
    coverPreview: '',
  });

  const isAuthenticated = isAuthFn();

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => closeBtnRef.current?.focus(), 10);
    document.body.classList.add('is-modal-open');
    return () => {
      clearTimeout(t);
      document.body.classList.remove('is-modal-open');
    };
  }, [isOpen]);

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
    updateField('coverFile', file);
    const reader = new FileReader();
    reader.onload = (ev) => updateField('coverPreview', ev.target.result);
    reader.readAsDataURL(file);
  }

  async function handleCreate(e) {
    e?.preventDefault?.();
    if (!isAuthenticated) {
      setError('Tu dois être connecté pour ajouter un projet.');
      return;
    }

    const title = form.title.trim();
    if (!title) {
      setError('Le titre est obligatoire.');
      return;
    }

    const githubUrl = form.githubUrl.trim();
    if (githubUrl && !isHttpUrl(githubUrl)) {
      setError('L’URL GitHub doit commencer par http(s)://');
      return;
    }

    const demoUrl = form.demoUrl.trim();
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
      if (form.coverFile) fd.append('image', form.coverFile);

      const res = await fetch(`${API}/projects`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken() || ''}` },
        body: fd,
      });

      if (!res.ok) {
        const msg = await safeErr(res);
        throw new Error(msg || 'Échec de la création.');
      }
      const created = await res.json();

      setForm({
        title: '',
        description: '',
        tech: '',
        githubUrl: '',
        demoUrl: '',
        coverFile: null,
        coverPreview: '',
      });
      onCreated?.(created);
      onClose?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (!isOpen) return null;

  return createPortal(
    <div
      className="modal__backdrop"
      ref={backdropRef}
      onMouseDown={onBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Ajouter un projet"
    >
      <div className="modal">
        <div className="modal__header">
          <h2>Ajouter un projet</h2>
          <button
            ref={closeBtnRef}
            className="close modal__close"
            aria-label="Fermer"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="modal__body">
          <form className="form" onSubmit={handleCreate}>
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
              <input id="cover" type="file" accept=".jpg,.jpeg,image/jpeg" onChange={onPickCover} />
              {form.coverPreview && (
                <div className="preview">
                  <img
                    src={form.coverPreview}
                    alt="Aperçu de l’image sélectionnée"
                    className="cover"
                  />
                </div>
              )}
            </div>

            {error && (
              <div className="error" role="alert">
                {error}
              </div>
            )}
          </form>
        </div>

        <div className="modal__floating-actions">
          <button className="button small" onClick={onClose} disabled={busy}>
            Annuler
          </button>
          <button className="button small" onClick={handleCreate} disabled={busy}>
            {busy ? 'Ajout en cours...' : 'Ajouter'}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

AddProjectModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onCreated: PropTypes.func,
};

async function safeErr(res) {
  try {
    const t = await res.text();
    return t || res.statusText;
  } catch {
    return res.statusText;
  }
}
