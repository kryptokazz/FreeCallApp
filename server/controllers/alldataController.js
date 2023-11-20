const axios = require('axios');

const getAllData = async (req, res) => {
  try {
    const usersResponse = await axios.get('http://localhost:5000/users');
    // ... other axios requests ...

    const allData = {
      users: usersResponse.data,
      // ... other data ...
    };

    res.json(allData);
  } catch (error) {
    console.error('Error fetching data', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};

module.exports = {
  getAllData,
};

