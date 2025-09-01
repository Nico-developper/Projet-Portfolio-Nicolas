// src/services/api.js
const BASE = import.meta.env.PROD ? (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '') : ''; // en dev on passe par le proxy Vite

export const API = BASE ? `${BASE}/api` : '/api';

export const authHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};
