// src/services/api.js
import { getToken } from './authService';

/** Base API (VITE_API_BASE en priorité, Render par défaut) */
export const API =
  import.meta.env.VITE_API_BASE || 'https://portfolio-backend-emb9.onrender.com/api';

export function authHeader() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getJSON(path) {
  const res = await fetch(`${API}${path}`, { headers: { ...authHeader() } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

export async function postJSON(path, body) {
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`POST ${path} -> ${res.status} ${t}`);
  }
  return res.json();
}
