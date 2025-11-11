const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' });
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO || user;
  const from = process.env.SMTP_FROM || user;

  if (!host || !user || !pass || !to) {
    return res.status(500).json({ error: 'Email is not configured on the server' });
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from,
      to,
      subject: `New contact form message from ${name}`,
      replyTo: email,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p>${String(message).replace(/\n/g, '<br/>')}</p>`,
    });
    return res.json({ ok: true });
  } catch (err) {
    console.error('contact email error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;

