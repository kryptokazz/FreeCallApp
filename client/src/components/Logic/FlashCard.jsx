import React from 'react';

const FlashCard = ({ card, onDelete }) => {
  // Assuming card is an object with a 'terms' property
  const { terms } = card;

  return (
    <div>
      <div style={{ whiteSpace: 'pre-line' }}>
        {/* Render each term in 'terms' array */}
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

