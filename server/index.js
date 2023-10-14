const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const axios = require('axios');

app.use(cors());
app.use(express.json());

app.get('/alldata', (req, res) => {
  const usersPromise = axios.get('http://localhost:5000/users');
  const topicsPromise = axios.get('http://localhost:5000/topics');
  const setsPromise = axios.get('http://localhost:5000/sets');
  const fieldsPromise = axios.get('http://localhost:5000/fields');
  const wordsPromise = axios.get('http://localhost:5000/words');

  Promise.all([usersPromise, topicsPromise, setsPromise, fieldsPromise, wordsPromise])
    .then((responses) => {
      const allData = {
        users: responses[0].data,
        topics: responses[1].data,
        sets: responses[2].data,
        fields: responses[3].data,
        words: responses[4].data
      };
      res.json(allData);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to fetch data' });
    });
});


// POST a new user
app.post('/users', async (req, res) => {
  const { username, profile_name } = req.body;
  try {
    const result = await pool.query('INSERT INTO users (username, profile_name) VALUES ($1, $2) RETURNING *', [username, profile_name]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET all users
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/users/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// POST a new topic
app.post('/topics', async (req, res) => {
  const { topic_name, user_id } = req.body;
  try {
    const result = await pool.query('INSERT INTO topics (topic_name, user_id) VALUES ($1, $2) RETURNING *', [topic_name, user_id]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// GET all topics
app.get('/topics', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM topics');
    const topics = result.rows.map(topic => ({
      id: topic.id, // Assuming the topic table has an 'id' column
      name: topic.name
    }));
    res.json(topics);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});






// POST a new set
app.post('/sets', async (req, res) => {
  const { set_name, topic_id } = req.body;
  try {
    const result = await pool.query('INSERT INTO sets (set_name, topic_id) VALUES ($1, $2) RETURNING *', [set_name, topic_id]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET all sets
app.get('/sets', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sets');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST a new field
app.post('/fields', async (req, res) => {
  const { field_name, field_type, set_id } = req.body;
  try {
    const result = await pool.query('INSERT INTO fields (field_name, field_type, set_id) VALUES ($1, $2, $3) RETURNING *', [field_name, field_type, set_id]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET all fields
app.get('/fields', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM fields');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST a new word
app.post('/words', async (req, res) => {
  const { word_name, set_id } = req.body;
  try {
    const result = await pool.query('INSERT INTO words (word_name, set_id) VALUES ($1, $2) RETURNING *', [word_name, set_id]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET all words
app.get('/words', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM words');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.delete('/:tableName/:recordId', async (req, res) => {
  const tableName = req.params.tableName;
  const recordId = req.params.recordId;

  try {
    const result = await pool.query(`DELETE FROM ${tableName} WHERE ${tableName}_id = $1`, [recordId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.put('/:tableName/:recordId', async (req, res) => {
  const tableName = req.params.tableName;
  const recordId = req.params.recordId;
  const { ...updatedData } = req.body;

  try {
    const columns = Object.keys(updatedData);
    const values = Object.values(updatedData);
    const updateQuery = columns.map((column, index) => `${column} = $${index + 1}`).join(', ');

    const result = await pool.query(`UPDATE ${tableName} SET ${updateQuery} WHERE ${tableName}_id = $${columns.length + 1} RETURNING *`, [...values, recordId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(5000, () => {
    console.log("server has started on port 5000")
});




