const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function formatTicket(id) {
  return `eduf-2025-${String(id).padStart(4, '0')}`;
}

function buildMessage({ name, school, classLevel, ticketNumber }) {
  return `Thanks ${name} from ${school} (Class ${classLevel}). Your entry is received. Ticket: ${ticketNumber}.`;
}

function csvEscape(value) {
  if (value === null || value === undefined) return '';
  const text = String(value);
  if (/[",\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

exports.createEntry = async (req, res) => {
  try {
    const body = req.body || {};
    const name = String(body.name || '').trim();
    const school = String(body.school || '').trim();
    const classLevel = String(body.classLevel || body.class || '').trim();
    const phone = String(body.phone || '').trim();
    const email = String(body.email || '').trim();
    const address = String(body.address || '').trim();

    if (!name || !school || !classLevel || !phone || !email || !address) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const created = await prisma.entry.create({
      data: {
        name,
        school,
        classLevel,
        phone,
        email,
        address,
        message: ''
      }
    });

    const ticketNumber = formatTicket(created.id);
    const message = buildMessage({ name, school, classLevel, ticketNumber });
    const updated = await prisma.entry.update({
      where: { id: created.id },
      data: { ticketNumber, message }
    });

    return res.status(201).json({
      ticketNumber: updated.ticketNumber,
      message: updated.message
    });
  } catch (err) {
    console.error('create entry error:', err);
    return res.status(500).json({ error: 'Failed to create entry.' });
  }
};

exports.exportEntries = async (req, res) => {
  try {
    const entries = await prisma.entry.findMany({
      orderBy: { createdAt: 'desc' }
    });

    const header = [
      'Ticket',
      'Name',
      'School',
      'Class',
      'Phone',
      'Email',
      'Address',
      'Message',
      'CreatedAt'
    ];

    const rows = entries.map((entry) => [
      entry.ticketNumber,
      entry.name,
      entry.school,
      entry.classLevel,
      entry.phone,
      entry.email,
      entry.address,
      entry.message,
      entry.createdAt.toISOString()
    ]);

    const csv = [header, ...rows]
      .map((row) => row.map(csvEscape).join(','))
      .join('\n');

    const filename = `entries-${new Date().toISOString().slice(0, 10)}.csv`;
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    return res.send(csv);
  } catch (err) {
    console.error('export entries error:', err);
    return res.status(500).json({ error: 'Failed to export entries.' });
  }
};
