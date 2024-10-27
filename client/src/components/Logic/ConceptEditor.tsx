import React, { useState } from 'react';

interface ConceptEditorProps {
  onSave: (concept: Concept) => void;
  onCancel: () => void;
}

const ConceptEditor: React.FC<ConceptEditorProps> = ({ onSave, onCancel }) => {
  const [conceptName, setConceptName] = useState('');

  const handleSubmit = () => {
    if (conceptName.trim() === '') return;
    const newConcept: Concept = {
      id: Date.now().toString(),
      name: conceptName,
      flashCards: [],
      lastStudied: null,
      nextReview: null,
    };
    onSave(newConcept);
  };

  return (
    <div>
      <h2>Create New Concept</h2>
      <input
        type="text"
        value={conceptName}
        onChange={(e) => setConceptName(e.target.value)}
        placeholder="Concept Name"
      />
      <button onClick={handleSubmit}>Save Concept</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default ConceptEditor;

