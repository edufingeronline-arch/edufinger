import { useEffect, useRef, useState } from 'react';
import api from '../lib/api';
import SEO from '../components/SEO.jsx';
import { useNavigate } from 'react-router-dom';

export default function AdminPosts() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState('');
  const [tags, setTags] = useState('');
  const [published, setPublished] = useState(true);
  const [editing, setEditing] = useState(null);
  const fileRef = useRef();
  const navigate = useNavigate();

  async function load() {
    try {
      const { data } = await api.get('/api/posts', { params: { page: 1 } });
      setItems(data.items);
    } catch (e) {
      if (e.response?.status === 401) navigate('/admin/login');
    }
  }

  useEffect(() => { load(); }, []);

  function resetForm() {
    setTitle(''); setExcerpt(''); setContent(''); setCategories(''); setTags(''); setPublished(true);
    if (fileRef.current) fileRef.current.value = '';
    setEditing(null);
  }

  async function onCreateOrUpdate(e) {
    e.preventDefault();
    const form = new FormData();
    form.append('title', title);
    form.append('excerpt', excerpt);
    form.append('content', content);
    form.append('categories', categories);
    form.append('tags', tags);
    form.append('published', String(published));
    if (fileRef.current?.files?.[0]) form.append('coverImage', fileRef.current.files[0]);

    try {
      if (editing) {
        await api.put(`/api/admin/posts/${editing}`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await api.post('/api/admin/posts', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      await load();
      resetForm();
    } catch (e) {
      if (e.response?.status === 401) navigate('/admin/login');
      console.error(e);
    }
  }

  async function onDelete(id) {
    if (!confirm('Delete this post?')) return;
    await api.delete(`/api/admin/posts/${id}`);
    await load();
  }

  function onEdit(p) {
    setEditing(p.id);
    setTitle(p.title);
    setExcerpt(p.excerpt || '');
    setContent(p.content || '');
    setCategories((p.categories || []).map((c) => c.name).join(', '));
    setTags((p.tags || []).map((t) => t.name).join(', '));
    setPublished(!!p.published);
    if (fileRef.current) fileRef.current.value = '';
  }

  function logout() {
    localStorage.removeItem('token');
    navigate('/admin/login');
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SEO title="Admin | Edufinger" description="Admin posts dashboard" path="/admin/posts" noindex />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Posts</h1>
        <button onClick={logout} className="text-sm text-red-600">Logout</button>
      </div>

      <form onSubmit={onCreateOrUpdate} className="mb-8 grid grid-cols-1 gap-4 rounded border border-gray-800 bg-black p-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded border px-3 py-2" required />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Excerpt</label>
          <input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="w-full rounded border px-3 py-2" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={6} className="w-full rounded border px-3 py-2" required />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Categories (comma)</label>
            <input value={categories} onChange={(e) => setCategories(e.target.value)} className="w-full rounded border px-3 py-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Tags (comma)</label>
            <input value={tags} onChange={(e) => setTags(e.target.value)} className="w-full rounded border px-3 py-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Published</label>
            <select value={published ? 'true' : 'false'} onChange={(e) => setPublished(e.target.value === 'true')} className="w-full rounded border px-3 py-2">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Cover Image</label>
          <input ref={fileRef} type="file" accept="image/*" />
        </div>
        <div className="flex gap-3">
          <button className="rounded bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700">{editing ? 'Update Post' : 'Create Post'}</button>
          {editing && <button type="button" onClick={resetForm} className="rounded border border-gray-700 px-4 py-2 text-white hover:bg-gray-800">Cancel</button>}
        </div>
      </form>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((p) => (
          <div key={p.id} className="rounded border border-gray-800 bg-black p-4">
            <h3 className="mb-1 text-lg font-semibold">{p.title}</h3>
            <p className="mb-2 text-sm text-gray-400">Slug: {p.slug}</p>
            <div className="flex gap-3">
              <button onClick={() => onEdit(p)} className="rounded border border-gray-700 px-3 py-1 text-white hover:bg-gray-800">Edit</button>
              <button onClick={() => onDelete(p.id)} className="rounded border border-gray-700 px-3 py-1 text-red-500 hover:bg-gray-800">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
