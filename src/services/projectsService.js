// src/services/projectsService.js
import { API } from '@/services/api';

function normalizeTech(value) {
  if (Array.isArray(value)) return value;
  return String(value || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

export async function fetchProjects(params = {}) {
  const url = new URL(`${API}/projects`); // ne pas passer window.location.origin
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
  });

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Erreur API ${res.status}`);

  const raw = await res.json();
  return raw.map((p) => ({
    _id: p._id,
    title: p.title,
    slug: p.slug,
    description: p.description,
    order: p.order,
    featured: p.featured,
    coverImage: p.coverImage,
    tech: normalizeTech(p.tech),
    githubUrl: p.githubUrl,
    demoUrl: p.demoUrl,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  }));
}

export async function fetchProject(id) {
  const res = await fetch(`${API}/projects/${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error('Projet introuvable');
  const p = await res.json();
  return { ...p, tech: normalizeTech(p.tech) };
}
