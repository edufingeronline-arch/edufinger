import { Link } from 'react-router-dom';

export default function PostCard({ post, apiUrl }) {
  const cover = post.coverImage ? (post.coverImage.startsWith('http') ? post.coverImage : `${apiUrl}${post.coverImage}`) : null;
  const caption = post.excerpt || post.content || post.title;
  return (
    <article className="ig-card max-w-xl mx-auto">
      <Link to={`/blog/${post.slug}`} aria-label={post.title}>
        {cover && (
          <img src={cover} alt={post.title} className="ig-media aspect-square" />
        )}
      </Link>
      <div className="ig-caption">
        <p>{caption}</p>
        <p className="mt-2 text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</p>
      </div>
    </article>
  );
}

