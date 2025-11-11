import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../lib/api';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    api.get(`/api/posts/${slug}`).then(({ data }) => setPost(data));
  }, [slug]);

  if (!post) return <div className="mx-auto max-w-3xl px-4 py-10">Loading...</div>;

  const cover = post.coverImage ? (post.coverImage.startsWith('http') ? post.coverImage : `${apiUrl}${post.coverImage}`) : null;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-3 text-3xl font-extrabold">{post.title}</h1>
      <p className="mb-6 text-gray-300">By {post.author?.name || post.author?.email} • {new Date(post.createdAt).toLocaleDateString()}</p>
      {cover && <img className="mb-6 w-full rounded" src={cover} alt={post.title} />} 
      <div className="prose max-w-none">
        {post.content.split('\n').map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </article>
  );
}


