const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const entries = require('../controllers/entriesController');

router.post('/entries', entries.createEntry);
router.get('/admin/entries/export', auth, entries.exportEntries);

module.exports = router;
