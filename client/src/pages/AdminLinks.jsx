import { useEffect, useState } from 'react';
import api from '../lib/api';
import SEO from '../components/SEO.jsx';

const buttonOptions = ['Site', 'PDF', 'Read More', 'Download Now', 'Watch Now'];

export default function AdminLinks() {
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [buttonTitle, setButtonTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function load() {
    try {
      setLoading(true);
      const { data } = await api.get('/api/links');
      setLinks(data || []);
    } catch (e) {
      console.error(e);
      setError('Failed to load links');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    if (!title.trim() || !url.trim()) {
      setError('Title and URL are required');
      return;
    }
    setSaving(true);
    try {
      await api.post('/api/admin/links', { title, url, buttonTitle });
      setTitle('');
      setUrl('');
      setButtonTitle('');
      await load();
    } catch (e) {
      console.error(e);
      setError(e?.response?.data?.error || 'Failed to save link');
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(id) {
    if (!window.confirm('Delete this link?')) return;
    try {
      await api.delete(`/api/admin/links/${id}`);
      await load();
    } catch (e) {
      console.error(e);
      setError('Failed to delete link');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1f3b7a] via-[#0b1426] to-[#0b1426] text-white">
      <SEO title="Admin Link Builder" description="Create and manage links" path="/admin/links" noindex />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-blue-200/80">Admin</p>
            <h1 className="text-3xl font-bold text-blue-100">Link Builder</h1>
          </div>
          <a
            href="/links"
            className="rounded-xl bg-gradient-to-r from-[#4f79ff] to-[#39d2ff] px-4 py-2 text-base font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:translate-y-[-1px] hover:shadow-blue-800/60"
          >
            View page
          </a>
        </div>

        {error && <div className="mb-4 rounded-lg border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}

        <div className="grid gap-6 lg:grid-cols-2">
          <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-[#111a2a] bg-[#0b1426]/90 p-6 shadow-[0_15px_50px_rgba(0,0,0,0.45)] backdrop-blur">
            <div>
              <p className="text-lg font-semibold text-blue-100">Add a link</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-blue-100">Name / Label</label>
              <input
                className="w-full rounded-xl border border-[#1f2d45] bg-[#0f1b33] px-4 py-3 text-white placeholder-gray-400 focus:border-[#4f79ff] focus:outline-none focus:ring-2 focus:ring-[#4f79ff]/50"
                placeholder="Example: Science Blog"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-blue-100">URL</label>
              <input
                className="w-full rounded-xl border border-[#1f2d45] bg-[#0f1b33] px-4 py-3 text-white placeholder-gray-400 focus:border-[#4f79ff] focus:outline-none focus:ring-2 focus:ring-[#4f79ff]/50"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-blue-100">Button title</label>
              <select
                className="w-full rounded-xl border border-[#1f2d45] bg-[#0f1b33] px-4 py-3 text-white focus:border-[#4f79ff] focus:outline-none focus:ring-2 focus:ring-[#4f79ff]/50"
                value={buttonTitle}
                onChange={(e) => setButtonTitle(e.target.value)}
              >
                <option value="">Select a button</option>
                {buttonOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-gradient-to-r from-[#4f79ff] to-[#39d2ff] px-4 py-3 text-center text-base font-semibold text-white shadow-lg shadow-blue-900/40 transition hover:translate-y-[-1px] hover:shadow-blue-800/60 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save link'}
            </button>
            <p className="text-xs text-gray-400">Links appear on the public page immediately after saving.</p>
          </form>

          <div className="space-y-4 rounded-3xl border border-[#111a2a] bg-[#0b1426]/90 p-6 shadow-[0_15px_50px_rgba(0,0,0,0.45)] backdrop-blur">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-blue-100">Current links</p>
              {loading && <span className="text-xs text-gray-400">Loading...</span>}
            </div>
            {links.length === 0 && !loading && (
              <p className="text-sm text-gray-400">No links yet. Add your first link on the left.</p>
            )}
            <div className="space-y-4">
              {links.map((item) => (
                <div key={item.id} className="rounded-2xl border border-[#121c2f] bg-[#0f1b33] p-4 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-xs text-blue-200/90">{item.url}</p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center rounded-full bg-[#1a2540] px-3 py-1 text-xs font-semibold text-blue-100">
                      Button: {item.buttonTitle || 'View'}
                    </span>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="rounded-lg border border-red-500/50 px-3 py-1 text-sm font-semibold text-red-300 transition hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
