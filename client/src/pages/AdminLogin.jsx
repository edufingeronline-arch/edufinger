import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import SEO from '../components/SEO.jsx';

export default function AdminLogin() {
  // Start with empty fields; avoid prefilled demo credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      navigate('/admin/posts');
    } catch (e) {
      let msg = e?.response?.data?.error || '';
      if (!msg) {
        if (e?.code === 'ERR_NETWORK') {
          msg = `Cannot reach API: ${api.defaults.baseURL}`;
        } else {
          msg = 'Invalid credentials';
        }
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-12">
      <SEO title="Admin Login | Edufinger" description="Admin access for Edufinger" path="/admin/login" noindex />
      <h1 className="mb-6 text-center text-2xl font-bold">Admin Login</h1>
      <form onSubmit={onSubmit} autoComplete="off" className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            inputMode="email"
            autoComplete="off"
            placeholder="you@example.com"
            className="w-full rounded border px-3 py-2 bg-gray-900 text-white placeholder-gray-400 border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            className="w-full rounded border px-3 py-2 bg-gray-900 text-white placeholder-gray-400 border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="w-full rounded bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">{loading ? 'Logging in...' : 'Login'}</button>
      </form>
    </div>
  );
}
