import React, { useState } from 'react';
import axios from 'axios';
import './TopicCreationForm.css';

interface TopicCreationFormProps {
  user_id: number; // Pass user_id as a prop
}

const TopicCreationForm: React.FC<TopicCreationFormProps> = ({ user_id }) => {
  const [topicName, setTopicName] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = {
        user_id: user_id,
        topic_name: topicName
      };

      const response = await axios.post("http://localhost:5000/topics", body);

      if (response.status === 201) {
        // Handle success
        window.location.href = `/topic/${response.data.topic_id}`;
      } else {
        // Handle other responses or errors
        console.error("Topic creation failed");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="topic-creation-form">
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

