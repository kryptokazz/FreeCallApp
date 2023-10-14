import React, { useState } from 'react';
import axios from 'axios';

const TopicCreationForm: React.FC = () => {
  const [topicName, setTopicName] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = { topic_name: topicName };
      await axios.post("http://localhost:5000/topics", body);
      window.location.href = "/"; // Use href instead of assigning to window.location directly
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Topic Name:
        <input
          type="text"
          value={topicName}
          onChange={(e) => setTopicName(e.target.value)}
        />
      </label>
      <button type="submit">Create Topic</button>
    </form>
  );
};

export default TopicCreationForm;

