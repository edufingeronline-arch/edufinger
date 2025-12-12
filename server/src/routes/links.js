const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const links = require('../controllers/linksController');

// Public links
router.get('/links', links.listLinks);

// Admin (protected)
router.post('/admin/links', auth, links.createLink);
router.delete('/admin/links/:id', auth, links.deleteLink);

module.exports = router;
