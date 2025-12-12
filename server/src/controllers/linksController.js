const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function normalizeUrl(url) {
  if (!url) return '';
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

exports.listLinks = async (req, res) => {
  try {
    const items = await prisma.link.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return res.json(items);
  } catch (e) {
    console.error('listLinks error', e);
    return res.status(500).json({ error: 'Failed to load links' });
  }
};

exports.createLink = async (req, res) => {
  try {
    const title = (req.body?.title || '').trim();
    const url = normalizeUrl(req.body?.url || '');
    const buttonTitle = (req.body?.buttonTitle || 'View').trim();
    if (!title || !url) return res.status(400).json({ error: 'Title and URL are required' });

    const created = await prisma.link.create({
      data: { title, url, buttonTitle: buttonTitle || 'View' }
    });
    return res.status(201).json(created);
  } catch (e) {
    console.error('createLink error', e);
    return res.status(500).json({ error: 'Failed to create link' });
  }
};

exports.deleteLink = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
    const existing = await prisma.link.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Link not found' });
    await prisma.link.delete({ where: { id } });
    return res.json({ ok: true });
  } catch (e) {
    console.error('deleteLink error', e);
    return res.status(500).json({ error: 'Failed to delete link' });
  }
};
