import React, { useState } from 'react';
import './FieldCreationForm.css';
const FieldCreationForm: React.FC = () => {
  const [fieldName, setFieldName] = useState('');
  const [fieldType, setFieldType] = useState('');
  const [setId, setSetId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform logic to submit the form data to the server
  };

  return (
    <form onSubmit={handleSubmit} className="field-creation-form">
      <label>
        Field Name:
        <input type="text" value={fieldName} onChange={(e) => setFieldName(e.target.value)} />
      </label>
      <label>
        Field Type:
        <input type="text" value={fieldType} onChange={(e) => setFieldType(e.target.value)} />
      </label>
      <label>
        Set ID:
        <input type="text" value={setId} onChange={(e) => setSetId(e.target.value)} />
      </label>
      <button type="submit">Create Field</button>
    </form>
  );
};

export default FieldCreationForm;
