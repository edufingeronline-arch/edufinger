import { useState } from 'react';
import SEO from '../components/SEO.jsx';
import api, { apiBase } from '../lib/api';

export default function Entry() {
  const [form, setForm] = useState({
    name: '',
    school: '',
    classLevel: '',
    phone: '',
    email: '',
    address: '',
  });
  const [status, setStatus] = useState({ state: 'idle', note: '' });
  const [ticket, setTicket] = useState('');
  const [serverMessage, setServerMessage] = useState('');
  const [downloadStatus, setDownloadStatus] = useState({ state: 'idle', note: '' });

  function updateField(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (status.state === 'loading') return;
    setStatus({ state: 'loading', note: '' });
    setTicket('');
    setServerMessage('');

    try {
      const response = await api.post('/api/entries', {
        name: form.name.trim(),
        school: form.school.trim(),
        classLevel: form.classLevel.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
      });
      const data = response?.data || {};
      setTicket(data.ticketNumber || '');
      setServerMessage(data.message || '');
      setStatus({ state: 'success', note: 'Entry submitted successfully.' });
      setForm({
        name: '',
        school: '',
        classLevel: '',
        phone: '',
        email: '',
        address: '',
      });
    } catch (err) {
      const note = err?.response?.data?.error || 'Failed to submit entry. Please try again later.';
      setStatus({ state: 'error', note });
    }
  }

  async function onDownload() {
    if (downloadStatus.state === 'loading') return;
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
    if (!token) {
      setDownloadStatus({ state: 'error', note: 'Login required to download entries.' });
      return;
    }

    setDownloadStatus({ state: 'loading', note: '' });
    try {
      const response = await fetch(`${apiBase}/api/admin/entries/export`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to download export.');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `entries-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      setDownloadStatus({ state: 'success', note: 'Export downloaded.' });
    } catch (err) {
      const note = err?.message || 'Failed to download export.';
      setDownloadStatus({ state: 'error', note });
    }
  }

  const hasToken = typeof window !== 'undefined' && localStorage.getItem('token');

  return (
    <div className="bg-black">
      <SEO
        title="Edufinger | Lucky Draw Entry"
        description="Submit your details for the Edufinger lucky draw entry."
        path="/entry"
      />
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold">Lucky Draw Entry</h1>
          <p className="mt-2 text-sm text-gray-300">Fill in your details to receive a unique ticket number.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-white/10 bg-black/60 p-6 shadow-sm">
            <div>
              <label className="mb-1 block text-sm font-medium">Name</label>
              <input value={form.name} onChange={updateField('name')} className="w-full rounded border border-gray-700 bg-black px-3 py-2 text-white placeholder-gray-400" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">School</label>
              <input value={form.school} onChange={updateField('school')} className="w-full rounded border border-gray-700 bg-black px-3 py-2 text-white placeholder-gray-400" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Class</label>
              <input value={form.classLevel} onChange={updateField('classLevel')} className="w-full rounded border border-gray-700 bg-black px-3 py-2 text-white placeholder-gray-400" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Phone</label>
              <input value={form.phone} onChange={updateField('phone')} type="tel" className="w-full rounded border border-gray-700 bg-black px-3 py-2 text-white placeholder-gray-400" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <input value={form.email} onChange={updateField('email')} type="email" className="w-full rounded border border-gray-700 bg-black px-3 py-2 text-white placeholder-gray-400" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Address</label>
              <textarea value={form.address} onChange={updateField('address')} className="w-full rounded border border-gray-700 bg-black px-3 py-2 text-white placeholder-gray-400" rows="3" required />
            </div>

            <button disabled={status.state === 'loading'} className="rounded bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">
              {status.state === 'loading' ? 'Submitting...' : 'Submit Entry'}
            </button>
            {status.state === 'success' && <p className="text-green-400">{status.note}</p>}
            {status.state === 'error' && <p className="text-red-400">{status.note}</p>}
          </form>

          <aside className="space-y-4 rounded-xl border border-white/10 bg-black/60 p-6 shadow-sm">
            <div>
              <h2 className="text-xl font-semibold">Your Ticket</h2>
              <p className="mt-2 text-sm text-gray-300">After submitting, your unique ticket number and a message will appear here.</p>
              <div className="mt-6 rounded-lg border border-white/10 bg-black/70 p-4">
                <p className="text-xs uppercase tracking-wide text-gray-400">Ticket Number</p>
                <p className="mt-2 text-2xl font-bold text-blue-200">{ticket || 'eduf-2025-0001'}</p>
              </div>
              <div className="mt-4 rounded-lg border border-white/10 bg-black/70 p-4">
                <p className="text-xs uppercase tracking-wide text-gray-400">Message</p>
                <p className="mt-2 text-sm text-gray-200">{serverMessage || 'Your entry confirmation will show here once submitted.'}</p>
              </div>
            </div>

            {hasToken && (
              <div className="rounded-lg border border-white/10 bg-black/70 p-4">
                <h3 className="text-sm font-semibold">Admin Export</h3>
                <p className="mt-2 text-xs text-gray-400">Download all entries as CSV for Excel.</p>
                <button onClick={onDownload} className="mt-3 rounded border border-white/20 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10">
                  {downloadStatus.state === 'loading' ? 'Downloading...' : 'Download CSV'}
                </button>
                {downloadStatus.state === 'success' && <p className="mt-2 text-xs text-green-400">{downloadStatus.note}</p>}
                {downloadStatus.state === 'error' && <p className="mt-2 text-xs text-red-400">{downloadStatus.note}</p>}
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}
