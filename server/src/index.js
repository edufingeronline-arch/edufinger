const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const contactRoutes = require('./routes/contact');
const seoRoutes = require('./routes/seo');
const linkRoutes = require('./routes/links');

const app = express();

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || '0.0.0.0';
const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',').map((s) => s.trim()).filter(Boolean);
const allowAllInDev = process.env.NODE_ENV !== 'production';

// Helmet's default Cross-Origin-Resource-Policy is "same-origin",
// which blocks loading images from this API (localhost:5000)
// on the frontend origin (localhost:5173). Allow cross-origin so
// the client can display uploaded images served from /uploads.
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use(cors({
  origin: (origin, cb) => {
    if (allowAllInDev) return cb(null, true);
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'), false);
  },
  credentials: true
}));

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api', postRoutes);
app.use('/api', contactRoutes);
app.use('/api', linkRoutes);
app.use('/', seoRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  const expose = process.env.NODE_ENV !== 'production';
  const code = err?.code || err?.name;
  let status = 500;
  let error = 'Internal server error';
  if (code === 'LIMIT_FILE_SIZE') {
    status = 400; error = 'File too large (max 5MB)';
  } else if (typeof err?.message === 'string' && err.message.includes('Only image uploads are allowed')) {
    status = 400; error = 'Only image uploads are allowed';
  }
  if (expose && err?.message) {
    error = `${error}: ${err.message}`;
  }
  res.status(status).json({ error });
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening on ${HOST}:${PORT}`);
});
