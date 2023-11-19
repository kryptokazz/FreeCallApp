import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopicDataListing = () => {
  const [topics, setTopics] = useState([]);

  const getTopic = async () => {
    try {
      const response = await axios.get("http://localhost:5000/topics");
      setTopics(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTopic();
  }, []);

  console.log(topics);

  return (
    <div>
      <h2>Topic Data Listing</h2>
      <ul>
        {topics.map((topic) => (
          <li key={topic.topic_id}>{topic.topic_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopicDataListing;

