// routes/fieldsRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all fields
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM fields');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching fields', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST a new field
router.post('/', async (req, res) => {
  const { field_name, field_type, set_id } = req.body;
  try {
    const result = await pool.query('INSERT INTO fields (field_name, field_type, set_id) VALUES ($1, $2, $3) RETURNING *', [field_name, field_type, set_id]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error executing field query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

