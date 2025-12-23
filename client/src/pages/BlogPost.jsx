import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api, { apiBase } from '../lib/api';
import SEO from '../components/SEO.jsx';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const apiUrl = apiBase;

  useEffect(() => {
    api.get(`/api/posts/${slug}`).then(({ data }) => setPost(data));
  }, [slug]);

  if (!post) return <div className="mx-auto max-w-xl px-4 py-8">Loading...</div>;

  const cover = post.coverImage ? (post.coverImage.startsWith('http') ? post.coverImage : `${apiUrl}${post.coverImage}`) : null;
  const urlPath = `/blog/${post.slug}`;
  const description = post.excerpt || (post.content || '').slice(0, 150);

  return (
    <article className="mx-auto max-w-xl px-4 py-8">
      <SEO
        title={`${post.title} | Edufinger`}
        description={description}
        path={urlPath}
        image={cover || '/Edufinger-Education.png'}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          image: cover || undefined,
          datePublished: post.createdAt,
          dateModified: post.updatedAt || post.createdAt,
          author: {
            '@type': 'Person',
            name: post.author?.name || post.author?.email || 'Edufinger',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Edufinger',
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.edufinger.com/Edufinger-Education.png'
            }
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://www.edufinger.com${urlPath}`
          },
          description
        }}
      />
      {cover && <img className="ig-media aspect-square rounded-lg" src={cover} alt={post.title} />}
      <div className="ig-caption">
        <p>{post.content || post.excerpt || post.title}</p>
        <p className="mt-2 text-xs text-gray-400">
          {(post.author?.name || post.author?.email)} | {new Date(post.createdAt).toLocaleDateString()}
        </p>
      </div>
    </article>
  );
}
