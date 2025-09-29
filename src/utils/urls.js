// src/utils/urls.js
/** Préfixe le chemin avec le base path Vite (utile sur GitHub Pages). */
export function withBase(path = '') {
  const base = import.meta.env.BASE_URL || '/';
  if (!path) return base;
  if (/^https?:\/\//i.test(path)) return path;
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}

/** Retourne une source d'image exploitable (data:, http(s) ou chemin public). */
export function makePublicSrc(src) {
  if (!src) return '';
  if (/^data:|^https?:\/\//i.test(src)) return src;
  return withBase(src.startsWith('/') ? src : `/${src}`);
}
