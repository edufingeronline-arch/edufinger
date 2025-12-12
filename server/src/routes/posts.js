const path = require('path');
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const router = express.Router();

const auth = require('../middleware/auth');
const posts = require('../controllers/postsController');

// Configure multer disk storage (for production use S3 or other storage)
const uploadDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Use memory storage when CLOUDINARY_URL is configured to forward uploads
// to Cloudinary in the controller; otherwise store locally on disk.
const storage = process.env.CLOUDINARY_URL
  ? multer.memoryStorage()
  : multer.diskStorage({
      destination: (req, file, cb) => cb(null, uploadDir),
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const base = path.basename(file.originalname, ext).replace(/[^a-z0-9-_]/gi, '_');
        cb(null, `${Date.now()}_${base}${ext}`);
      }
    });

function fileFilter(req, file, cb) {
  const okMime = /^image\//.test(file.mimetype || '');
  const okExt = /(\.jpe?g|\.png|\.gif|\.webp|\.bmp)$/i.test(file.originalname || '');
  if (okMime || okExt) cb(null, true);
  else cb(new Error('Only image uploads are allowed'));
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

// Public post routes
router.get('/posts', posts.listPosts);
router.get('/posts/:slug', posts.getPostBySlug);

// Admin post routes (protected)
router.post('/admin/posts', auth, upload.single('coverImage'), posts.createPost);
router.put('/admin/posts/:id', auth, upload.single('coverImage'), posts.updatePost);
router.delete('/admin/posts/:id', auth, posts.deletePost);

module.exports = router;
