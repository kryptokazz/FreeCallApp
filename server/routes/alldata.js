// routes/alldataRoutes.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/alldata', async (req, res) => {
  try {
    const usersPromise = axios.get('http://localhost:5000/users');
    const topicsPromise = axios.get('http://localhost:5000/topics');
    const setsPromise = axios.get('http://localhost:5000/sets');
    const fieldsPromise = axios.get('http://localhost:5000/fields');
    const wordsPromise = axios.get('http://localhost:5000/words');

    const [usersResponse, topicsResponse, setsResponse, fieldsResponse, wordsResponse] = await Promise.all([usersPromise, topicsPromise, setsPromise, fieldsPromise, wordsPromise]);

    const allData = {
      users: usersResponse.data,
      topics: topicsResponse.data,
      sets: setsResponse.data,
      fields: fieldsResponse.data,
      words: wordsResponse.data
    };

    res.json(allData);
  } catch (error) {
    console.error('Error fetching data', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

module.exports = router;

