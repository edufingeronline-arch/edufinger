import { useState } from 'react';
import api from '../lib/api';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState({ state: 'idle', note: '' });

  async function onSubmit(e) {
    e.preventDefault();
    if (status.state === 'loading') return;
    setStatus({ state: 'loading', note: '' });
    try {
      await api.post('/api/contact', { name, email, message });
      setStatus({ state: 'success', note: "Thanks! We'll get back to you soon." });
      setName(''); setEmail(''); setMessage('');
    } catch (err) {
      const note = err?.response?.data?.error || 'Failed to send. Please try again later.';
      setStatus({ state: 'error', note });
    }
  }

  return (
    <section className="bg-black">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="mb-6 text-center text-2xl font-bold">Contact Us</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded border border-gray-700 bg-black px-3 py-2 text-white placeholder-gray-400" required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full rounded border border-gray-700 bg-black px-3 py-2 text-white placeholder-gray-400" required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Message</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full rounded border border-gray-700 bg-black px-3 py-2 text-white placeholder-gray-400" rows="4" required />
          </div>
          <button disabled={status.state==='loading'} className="rounded bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">
            {status.state==='loading' ? 'Sending...' : 'Send'}
          </button>
          {status.state==='success' && <p className="text-green-400">{status.note}</p>}
          {status.state==='error' && <p className="text-red-400">{status.note}</p>}
        </form>
      </div>
    </section>
  );
}



