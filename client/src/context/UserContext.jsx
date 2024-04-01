import React, { useState } from 'react';
import axios from 'axios';
import './TopicCreationForm.css';
import { useAuth } from '@user/AuthContext';

const TopicCreationForm: React.FC = () => {
  const { user } = useAuth();
  const [topicName, setTopicName] = useState('');
  const [topics, setTopics] = useState([]); // Local state for created topics

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log('User before API request:', user);

      // Simulating API request, using local state for simplicity
      const newTopic = {
        topic_id: Date.now(), // Use a unique identifier (e.g., timestamp) for simplicity
        topic_name: topicName,
        user_id: user?.user_id,
      };

      // Update local state with the new topic
      setTopics([...topics, newTopic]);

      const body = {
        user_id: user?.user_id,
        topic_name: topicName,
      };

      // Simulated response data
      const responseData = {
        status: 201,
        data: {
          topic_id: newTopic.topic_id,
        },
      };

      console.log('API Response:', responseData.data);

      if (responseData.status === 201) {
        // Handle success
        window.location.href = `/topic/${responseData.data.topic_id}`;
      } else {
        // Handle other responses or errors
        console.error('Topic creation failed');
      }

      // Clear the input field after submission
      setTopicName('');

      console.log('New Topic:', newTopic);
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

      {/* Display created topics */}
      <div className="created-topics">
        <h2>Created Topics</h2>
        <ul>
          {topics.map((topic) => (
            <li key={topic.topic_id}>{topic.topic_name}</li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default UserContext;

