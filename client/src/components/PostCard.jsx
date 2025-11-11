import { Link } from 'react-router-dom';

export default function PostCard({ post, apiUrl }) {
  const cover = post.coverImage ? (post.coverImage.startsWith('http') ? post.coverImage : `${apiUrl}${post.coverImage}`) : null;
  return (
    <article className="overflow-hidden rounded-lg border border-gray-800 bg-black">
      {cover && (
        <img src={cover} alt={post.title} className="h-48 w-full object-cover" />
      )}
      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold">
          <Link to={`/blog/${post.slug}`} className="hover:underline">{post.title}</Link>
        </h3>
        {post.excerpt && <p className="mb-3 line-clamp-3 text-sm text-gray-300">{post.excerpt}</p>}
        <Link to={`/blog/${post.slug}`} className="text-sm font-medium text-blue-300 hover:underline">Read more</Link>
      </div>
    </article>
  );
}

