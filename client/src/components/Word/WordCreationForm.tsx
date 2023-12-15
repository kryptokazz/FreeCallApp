import React, { useState } from 'react';
import './WordCreationForm.css';
const WordCreationForm: React.FC = () => {
  const [wordName, setWordName] = useState('');
  const [setId, setSetId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform logic to submit the form data to the server
  };

  return (
    <form onSubmit={handleSubmit} className="word-creation-form">
      <label>
        Word Name:
        <input type="text" value={wordName} onChange={(e) => setWordName(e.target.value)} />
      </label>
      <label>
        Set ID:
        <input type="text" value={setId} onChange={(e) => setSetId(e.target.value)} />
      </label>
      <button type="submit">Create Word</button>
    </form>
  );
};

export default WordCreationForm;
