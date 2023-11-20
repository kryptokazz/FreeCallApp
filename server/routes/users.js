// routes/users.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all users
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching users', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET user by ID
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user by ID', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE user by ID
router.delete('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await pool.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [userId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user by ID', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

