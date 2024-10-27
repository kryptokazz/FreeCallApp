// /client/src/components/Logic/FlashCardEditor.tsx
import React, { useState } from 'react';

interface FlashCardField {
  id: string;
  fieldName: string;
  value: string;
}

interface FlashCard {
  id: string;
  fields: FlashCardField[];
}

interface FlashCardEditorProps {
  onSave: (flashCard: FlashCard) => void;
  onCancel: () => void;
  existingFlashCard?: FlashCard;
}

const FlashCardEditor: React.FC<FlashCardEditorProps> = ({ onSave, onCancel, existingFlashCard }) => {
  const [fields, setFields] = useState<FlashCardField[]>(existingFlashCard?.fields || [
    { id: Date.now().toString() + '-front', fieldName: 'Front', value: '' },
    { id: Date.now().toString() + '-back', fieldName: 'Back', value: '' },
  ]);

  const addField = () => {
    setFields([...fields, { id: Date.now().toString(), fieldName: '', value: '' }]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const updateField = (id: string, key: 'fieldName' | 'value', value: string) => {
    setFields(fields.map(field => field.id === id ? { ...field, [key]: value } : field));
  };

  const handleSubmit = () => {
    if (fields.length === 0) return;
    onSave({ id: existingFlashCard?.id || Date.now().toString(), fields });
  };

  return (
    <div>
      <h2>{existingFlashCard ? 'Edit FlashCard' : 'Create New FlashCard'}</h2>
      {fields.map(field => (
        <div key={field.id}>
          <input
            type="text"
            value={field.fieldName}
            onChange={(e) => updateField(field.id, 'fieldName', e.target.value)}
            placeholder="Field Name"
          />
          <input
            type="text"
            value={field.value}
            onChange={(e) => updateField(field.id, 'value', e.target.value)}
            placeholder="Field Value"
          />
          <button onClick={() => removeField(field.id)}>Remove Field</button>
        </div>
      ))}
      <button onClick={addField}>Add Field</button>
      <button onClick={handleSubmit}>Save FlashCard</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default FlashCardEditor;

