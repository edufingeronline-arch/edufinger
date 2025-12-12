const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' });
  }

  const to = process.env.CONTACT_TO || process.env.SMTP_USER;
  const resendApiKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM || 'onboarding@resend.dev';

  // If RESEND is configured, prefer HTTPS email API to avoid SMTP blocks
  if (resendApiKey) {
    if (!to) return res.status(500).json({ error: 'CONTACT_TO not configured on the server' });
    try {
      const subject = `New contact form message from ${name}`;
      const text = `From: ${name} <${email}>\n\n${message}`;
      const html = `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p>${String(message).replace(/\n/g, '<br/>')}</p>`;
      const resp = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ from: resendFrom, to, subject, text, html, reply_to: email }),
      });
      if (!resp.ok) {
        const body = await resp.text();
        throw new Error(`Resend ${resp.status}: ${body}`);
      }
      return res.json({ ok: true });
    } catch (err) {
      console.error('contact email error (resend):', err);
      const expose = process.env.NODE_ENV !== 'production';
      const msg = expose && err?.message ? `Failed to send email: ${err.message}` : 'Failed to send email (EMAIL_API)';
      return res.status(500).json({ error: msg });
    }
  }

  // Fallback to SMTP using Nodemailer
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  // Ensure the From header uses the authenticated address to avoid provider rejection (e.g., Gmail)
  let from = process.env.SMTP_FROM || '';
  const displayName = process.env.SMTP_NAME || '';
  if (!from) {
    from = displayName ? { name: displayName, address: user } : user;
  } else if (!from.includes('<')) {
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
