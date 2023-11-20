// routes/topics.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all topics
router.get('/', async (req, res) => {
  // ... (Your get all topics route logic)
});

// POST a new topic
router.post('/', async (req, res) => {
  // ... (Your post new topic route logic)
});

module.exports = router;

