const API_BASE = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL?.replace(/\/+$/, '') || ''
  : '';
// In dev: API_BASE = "" -> use Vite proxy => fetch('/api/...')
// In prod: API_BASE = 'http://localhost:4000' (via .env.production) -> fetch('http://localhost:4000/api/...')
const API = API_BASE ? `${API_BASE}/api` : '/api';

export async function fetchProjects(params = {}) {
  const url = new URL(`${API}/projects`, window.location.origin);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
  });
  const res = await fetch(url, { credentials: 'include' });
  if (!res.ok) throw new Error(`Erreur API ${res.status}`);
  const raw = await res.json();
  return raw.map((p) => ({
    _id: p._id,
    slug: p.slug,
    title: p.title,
    description: p.description,
    coverImage: p.coverImage,
    tech: p.tech,
    githubUrl: p.githubUrl,
    demoUrl: p.demoUrl,
  }));
}

export async function fetchProject(slug) {
  const res = await fetch(`${API}/projects/${encodeURIComponent(slug)}`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Projet introuvable');
  return res.json();
}
