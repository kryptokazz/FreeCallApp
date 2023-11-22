// auth.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'testkey';

// POST login user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (user.rowCount === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const hashedPassword = user.rows[0].password_hash;

    // Compare the provided password with the stored hash
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Passwords match, user is authenticated
    const userData = {
      user_id: user.rows[0].user_id,
      username: user.rows[0].username,
    };

    // Generate a token
    const token = jwt.sign(userData, secretKey, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error executing login query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST register user
router.post('/register', async (req, res) => {
  const { username, password, profile_name } = req.body;

  try {
    const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await pool.query('INSERT INTO users (username, password_hash, profile_name) VALUES ($1, $2, $3) RETURNING *', [username, hashedPassword, profile_name]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error executing register query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

