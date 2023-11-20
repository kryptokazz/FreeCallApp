const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/alldata', (req, res) => {
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
        words: responses[4].data,
      };
      res.json(allData);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to fetch data' });
    });
});

module.exports = router;

