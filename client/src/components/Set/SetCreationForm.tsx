import React, { useState } from 'react';
import './SetCreationForm.css';

const SetCreationForm: React.FC = () => {
  const [setName, setSetName] = useState('');
  const [topicId, setTopicId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform logic to submit the form data to the server
  };

  return (
    <form onSubmit={handleSubmit} className="set-creation-form">
      <label>
        Set Name:
        <input type="text" value={setName} onChange={(e) => setSetName(e.target.value)} />
      </label>
      <label>
        Topic ID:
        <input type="text" value={topicId} onChange={(e) => setTopicId(e.target.value)} />
      </label>
      <button type="submit">Create Set</button>
    </form>
  );
};

export default SetCreationForm;
