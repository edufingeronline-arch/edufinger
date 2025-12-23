import axios from 'axios';

let computedBase = 'http://localhost:5000';
if (typeof window !== 'undefined') {
  const host = window.location.hostname;
  if (host && host.endsWith('edufinger.com')) {
    computedBase = 'https://api.edufinger.com';
  } else {
    computedBase = `${window.location.protocol}//${host}:5000`;
  }
}

export const apiBase = import.meta.env.VITE_API_URL || computedBase;
const api = axios.create({ baseURL: apiBase });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
// Redirect to login on 401 responses
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      try { localStorage.removeItem('token'); } catch {}
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/admin/login')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);
