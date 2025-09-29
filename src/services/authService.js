// src/services/authService.js
import { API } from './api';

const STORAGE_KEY = 'token';

export function setToken(token) {
  if (typeof token === 'string' && token.trim()) {
    localStorage.setItem(STORAGE_KEY, token.trim());
  }
}
export function getToken() {
  const t = localStorage.getItem(STORAGE_KEY);
  return t && t.trim() ? t.trim() : null;
}
export function clearToken() {
  localStorage.removeItem(STORAGE_KEY);
}
export function isAuthenticated() {
  return !!getToken();
}

export async function login(email, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    let msg = 'Connexion impossible';
    try {
      const j = await res.json();
      if (j?.error) msg = j.error;
      if (j?.message) msg = j.message;
    } catch {}
    throw new Error(msg);
  }
  const data = await res.json();
  if (!data?.token) throw new Error('Token manquant dans la réponse');
  setToken(data.token);
  return data;
}

export function logout() {
  clearToken();
}
