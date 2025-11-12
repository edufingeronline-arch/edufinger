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

  if (!post) return <div className="mx-auto max-w-xl px-4 py-8">Loading...</div>;

  const cover = post.coverImage ? (post.coverImage.startsWith('http') ? post.coverImage : `${apiUrl}${post.coverImage}`) : null;

  return (
    <article className="mx-auto max-w-xl px-4 py-8">
      {cover && <img className="ig-media aspect-square rounded-lg" src={cover} alt={post.title} />}
      <div className="ig-caption">
        <p>{post.content || post.excerpt || post.title}</p>
        <p className="mt-2 text-xs text-gray-400">
          {(post.author?.name || post.author?.email)} · {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
    </article>
  );
}

