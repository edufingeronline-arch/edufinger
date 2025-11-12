const path = require('path');
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const slugify = require('slugify');

const prisma = new PrismaClient();

function parseCommaList(value) {
  if (!value) return [];
  return String(value)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

exports.listPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page || '1', 10);
    const limit = Math.min(50, parseInt(req.query.limit || '10', 10));
    const search = (req.query.search || '').toString().trim();
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { content: { contains: search, mode: 'insensitive' } }
          ],
          published: true
        }
      : { published: true };

    const [total, items] = await Promise.all([
      prisma.post.count({ where }),
      prisma.post.findMany({
        where,
        include: {
          author: { select: { id: true, email: true, name: true, role: true } },
          categories: { select: { id: true, name: true } },
          tags: { select: { id: true, name: true } }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      })
    ]);

    return res.json({ total, page, pages: Math.ceil(total / limit), items });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Failed to list posts' });
  }
};

exports.getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: { select: { id: true, email: true, name: true, role: true } },
        categories: { select: { id: true, name: true } },
        tags: { select: { id: true, name: true } }
      }
    });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    return res.json(post);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Failed to get post' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, excerpt, content } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });
    const published = String(req.body.published || 'true') === 'true';
    const categories = parseCommaList(req.body.categories);
    const tags = parseCommaList(req.body.tags);

    const slug = slugify(title, { lower: true, strict: true });

    const coverImage = req.file ? `/uploads/${req.file.filename}` : undefined;

    const connectOrCreateCategories = categories.map((name) => ({
      where: { name },
      create: { name }
    }));
    const connectOrCreateTags = tags.map((name) => ({
      where: { name },
      create: { name }
    }));

    const authorId = req.user?.userId;
    if (!authorId) return res.status(403).json({ error: 'Missing author' });

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        coverImage,
        published,
        authorId,
        categories: { connectOrCreate: connectOrCreateCategories },
        tags: { connectOrCreate: connectOrCreateTags }
      }
    });

    return res.status(201).json(post);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Failed to create post' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Post not found' });

    const { title, excerpt, content } = req.body;
    const published = req.body.published === undefined ? existing.published : String(req.body.published) === 'true';
    const categories = parseCommaList(req.body.categories);
    const tags = parseCommaList(req.body.tags);

    let coverImage = existing.coverImage;
    if (req.file) {
      // remove old file (best effort)
      if (coverImage && coverImage.startsWith('/uploads/')) {
        const filePath = path.join(__dirname, '..', '..', coverImage);
        fs.unlink(filePath, () => {});
      }
      coverImage = `/uploads/${req.file.filename}`;
    }

    const data = {
      title: title ?? existing.title,
      excerpt: excerpt === undefined ? existing.excerpt : excerpt,
      content: content ?? existing.content,
      coverImage,
      published
    };

    // Rebuild categories/tags if provided; if omitted, keep unchanged
    if (req.body.categories !== undefined) {
      await prisma.post.update({
        where: { id },
        data: { categories: { set: [] } }
      });
      if (categories.length) {
        await prisma.post.update({
          where: { id },
          data: {
            categories: {
              connectOrCreate: categories.map((name) => ({ where: { name }, create: { name } }))
            }
          }
        });
      }
    }
    if (req.body.tags !== undefined) {
      await prisma.post.update({
        where: { id },
        data: { tags: { set: [] } }
      });
      if (tags.length) {
        await prisma.post.update({
          where: { id },
          data: {
            tags: {
              connectOrCreate: tags.map((name) => ({ where: { name }, create: { name } }))
            }
          }
        });
      }
    }

    const updated = await prisma.post.update({ where: { id }, data });
    return res.json(updated);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Failed to update post' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Post not found' });
    if (existing.coverImage && existing.coverImage.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '..', '..', existing.coverImage);
      fs.unlink(filePath, () => {});
    }
    await prisma.post.delete({ where: { id } });
    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Failed to delete post' });
  }
};
