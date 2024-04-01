
import React from 'react';

export interface FlashCardProps {
  card: {
    terms: string[];
  };
  onDelete: () => void;
  onAddTerm: (term: string) => void; // Added missing prop
  onRemoveTerm: (termIndex: number) => void; // Added missing prop
}

const FlashCard: React.FC<FlashCardProps> = ({ card, onDelete }) => {
  const { terms } = card;

  return (
    <div>
      <div style={{ whiteSpace: 'pre-line' }}>
        {terms.map((term, index) => (
          <p key={index}>{term}</p>
        ))}
      </div>
      <button onClick={onDelete}>Delete</button>
      <hr />
    </div>
  );
};

export default FlashCard;

