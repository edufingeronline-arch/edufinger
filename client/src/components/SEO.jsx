import { Helmet } from 'react-helmet-async';

export default function SEO({
  title = 'Edufinger | Notes for Class 10 and 12',
  description = 'Edufinger — notes for Class 10th and 12th, chapter-wise study material, MCQs, and board exam prep.',
  path = '/',
  image = '/Edufinger-Education.png',
  type = 'website',
  siteName = 'Edufinger',
  canonical,
  noindex = false,
  jsonLd,
}) {
  const host = typeof window !== 'undefined' ? window.location.origin : 'https://www.edufinger.com';
  const url = canonical || `${host}${path}`;
  const imgAbs = image?.startsWith('http') ? image : `${host}${image}`;

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={imgAbs} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={imgAbs} />}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
