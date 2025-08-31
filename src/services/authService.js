const API_BASE = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL?.replace(/\/+$/, '') || ''
  : '';
const API = API_BASE ? `${API_BASE}/api` : '/api';

export async function login(arg1, arg2) {
  let email, password;
  if (typeof arg1 === 'object' && arg1 !== null) {
    ({ email, password } = arg1);
  } else {
    email = arg1;
    password = arg2;
  }
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(msg || 'Identifiants invalides');
  }
  const data = await res.json();
  if (data?.token) localStorage.setItem('token', data.token);
  return data;
}

export function logout() {
  localStorage.removeItem('token');
}
export function getToken() {
  return localStorage.getItem('token');
}
export function isAuthenticated() {
  return !!localStorage.getItem('token');
}

const authService = { login, logout, getToken, isAuthenticated };
export default authService;
