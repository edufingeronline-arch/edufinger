import { useEffect, useState } from 'react';
import api from '../lib/api';
import SEO from '../components/SEO.jsx';

export default function Links() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const { data } = await api.get('/api/links');
        if (mounted) setLinks(data || []);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#436ccf] via-[#0b1933] to-[#0b1933] text-white">
      <SEO title="Amazing Content" description="Curated links from Edufinger" path="/links" />
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:pt-16">
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-blue-100 md:text-4xl">Amazing Content</h1>
          <p className="text-sm text-blue-100/80">Hand-picked resources you can open, read, download or watch.</p>
        </div>

        {loading && (
          <p className="mt-12 text-center text-sm text-gray-300">Loading links...</p>
        )}

        {!loading && links.length === 0 && (
          <p className="mt-12 text-center text-sm text-gray-300">No links published yet. Check back soon.</p>
        )}

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <div
              key={link.id}
              className="rounded-2xl border border-[#111a2a] bg-[#0c1426] p-5 shadow-[0_15px_45px_rgba(0,0,0,0.4)] transition hover:translate-y-[-1px]"
            >
              <h3 className="text-lg font-semibold text-white">{link.title}</h3>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block rounded-xl bg-white px-4 py-3 text-center text-base font-semibold text-[#0c1426] transition hover:scale-[1.01]"
              >
                {link.buttonTitle || 'View'}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
