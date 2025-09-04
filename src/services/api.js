// src/services/api.js
// Dev: proxy Vite -> "/api" ; Prod: VITE_API_URL + "/api"
const isProd = import.meta?.env?.PROD;
const envBase = (import.meta?.env?.VITE_API_URL || '').trim().replace(/\/+$/, '');
export const API = isProd && envBase ? `${envBase}/api` : '/api';

export function authHeader() {
  try {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token') || null;
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

export default { API, authHeader };
