// routes/words.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all words
router.get('/', async (req, res) => {
  // ... (Your get all words route logic)
});

// POST a new word
router.post('/', async (req, res) => {
  // ... (Your post new word route logic)
});

module.exports = router;

