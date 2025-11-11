import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import PostCard from '../components/PostCard.jsx';

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  async function load() {
    const { data } = await api.get('/api/posts', { params: { page, search } });
    setPosts(data.items);
    setPages(data.pages);
  }

  useEffect(() => { load(); }, [page]);

  const onSearch = (e) => { e.preventDefault(); setPage(1); load(); };

  return (
    <section className="bg-black">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Latest Posts</h1>
          <form onSubmit={onSearch} className="flex gap-2">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts..." className="w-56 rounded border border-gray-700 bg-black px-3 py-2 text-white placeholder-gray-400" />
            <button className="rounded bg-indigo-600 px-4 py-2 text-white">Search</button>
          </form>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((p) => <PostCard key={p.id} post={p} apiUrl={apiUrl} />)}
        </div>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button disabled={page <= 1} onClick={() => setPage((n) => n - 1)} className="rounded border px-3 py-1 disabled:opacity-50">Prev</button>
          <span className="text-sm">Page {page} / {pages}</span>
          <button disabled={page >= pages} onClick={() => setPage((n) => n + 1)} className="rounded border px-3 py-1 disabled:opacity-50">Next</button>
        </div>
        <div className="mt-6 text-right text-sm">
          <Link className="text-blue-300 hover:underline" to="/admin/login">Admin Login</Link>
        </div>
      </div>
    </section>
  );
}

