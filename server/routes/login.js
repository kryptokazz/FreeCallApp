const express = require('express');
const router = express.Router();
const pool = require('../db');
// routes/auth.js
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

    const hashedPassword = user.rows[0].password_hash; // Retrieve the stored hashed password

    // Compare the provided password with the stored hash
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Passwords match, user is authenticated
    const userData = {
      user_id: user.rows[0].user_id,
      username: user.rows[0].username,
      // Include other user data as needed
    };

    const token = jwt.sign(userData, secretKey, { expiresIn: '1h' });

    // Retrieve topics associated with the user
    const topics = await pool.query('SELECT * FROM topics WHERE user_id = $1', [user.rows[0].user_id]);

    // Include topics in the response
    userData.topics = topics.rows;

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error executing login query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

