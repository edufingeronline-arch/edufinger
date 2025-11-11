import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import api from '../lib/api';

export default function RequireAuth({ children }) {
  const location = useLocation();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const [checked, setChecked] = useState(!token ? true : false);
  const [authorized, setAuthorized] = useState(!!token);

  useEffect(() => {
    let mounted = true;
    async function verify() {
      if (!token) return;
      try {
        await api.get('/api/auth/me');
        if (mounted) { setAuthorized(true); setChecked(true); }
      } catch {
        try { localStorage.removeItem('token'); } catch {}
        if (mounted) { setAuthorized(false); setChecked(true); }
      }
    }
    if (token) verify(); else setChecked(true);
    return () => { mounted = false; };
  }, [token]);

  if (!token) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  // While verifying token, avoid flashing the admin page
  if (!checked) return null;

  return authorized ? children : <Navigate to="/admin/login" replace state={{ from: location }} />;
}
