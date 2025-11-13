const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

function siteUrl() {
  const url = process.env.SITE_URL || 'https://www.edufinger.com';
  return url.replace(/\/$/, '');
}

router.get('/sitemap.xml', async (req, res) => {
  try {
    const base = siteUrl();
    const [posts] = await Promise.all([
      prisma.post.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
        orderBy: { updatedAt: 'desc' },
        take: 5000,
      }),
    ]);

    const staticUrls = [
      { loc: `${base}/`, changefreq: 'weekly', priority: '1.0' },
      { loc: `${base}/blog`, changefreq: 'daily', priority: '0.8' },
      { loc: `${base}/books`, changefreq: 'monthly', priority: '0.5' },
      { loc: `${base}/contact`, changefreq: 'monthly', priority: '0.5' },
    ];

    const postUrls = posts.map((p) => ({
      loc: `${base}/blog/${p.slug}`,
      lastmod: new Date(p.updatedAt || new Date()).toISOString(),
      changefreq: 'weekly',
      priority: '0.9',
    }));

    const urls = [...staticUrls, ...postUrls]
      .map((u) =>
        `<url>` +
        `<loc>${u.loc}</loc>` +
        (u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : '') +
        (u.changefreq ? `<changefreq>${u.changefreq}</changefreq>` : '') +
        (u.priority ? `<priority>${u.priority}</priority>` : '') +
        `</url>`
      )
      .join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

    res.set('Content-Type', 'application/xml');
    return res.status(200).send(xml);
  } catch (e) {
    console.error('sitemap error', e);
    return res.status(500).send('');
  }
});

module.exports = router;

