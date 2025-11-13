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
  // Ensure the From header uses the authenticated address to avoid provider rejection (e.g., Gmail)
  let from = process.env.SMTP_FROM || '';
  const displayName = process.env.SMTP_NAME || '';
  if (!from) {
    from = displayName ? { name: displayName, address: user } : user;
  } else if (!from.includes('<')) {
    // If a raw name is given (e.g., "Edufinger"), pair it with the SMTP user address
    from = { name: from, address: user };
  }

  if (!host || !user || !pass || !to) {
    return res.status(500).json({ error: 'Email is not configured on the server' });
  }

  const isGmail = /gmail\.com$/i.test(String(user)) || /gmail/i.test(String(host));
  const baseTransport = isGmail
    ? { service: 'gmail', auth: { user, pass } }
    : { host, port, secure: port === 465, auth: { user, pass } };
  const transporter = nodemailer.createTransport({
    ...baseTransport,
    // Add conservative timeouts so failures return quickly instead of hanging
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });

  try {
    // Optional: verify the connection/auth first to fail fast with clearer errors
    await transporter.verify();
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
    // Surface a brief hint even in production without leaking secrets
    const code = err?.code || err?.responseCode || 'UNKNOWN';
    const expose = process.env.NODE_ENV !== 'production';
    const baseMsg = 'Failed to send email';
    const detail = expose && err?.message ? `: ${err.message}` : ` (${code})`;
    return res.status(500).json({ error: `${baseMsg}${detail}` });
  }
});

module.exports = router;
