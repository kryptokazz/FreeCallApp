import React, { useState } from 'react';
import './SetCreationForm.css';

interface SetCreationFormProps {
  topicId: string; // Pass topicId as a prop
}

const SetCreationForm: React.FC<SetCreationFormProps> = ({ topicId }) => {
  const [setName, setSetName] = useState('');

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
      {/* Use the passed topicId */}
      <input type="hidden" value={topicId} />
      <button type="submit">Create Set</button>
    </form>
  );
};

export default SetCreationForm;

