const axios = require('axios');

// Define the API endpoint and topic data
const apiUrl = 'http://localhost:5000/topics'; // Update with your server's URL
const topicData = {
  topic_name: 'Test Topic', // Replace with the desired topic name
  user_id: 23, // Replace with the user ID you want to associate with the topic
};

// Make a POST request to create a new topic
axios
  .post(apiUrl, topicData)
  .then((response) => {
    console.log('Topic Created:', response.data);
  })
  .catch((error) => {
    console.error('Error Creating Topic:', error.message);
  });

