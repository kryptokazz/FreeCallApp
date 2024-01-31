
import React from 'react';

const FlashCard = ({ card, onDelete }) => {
  return (
    <div>
      <p style={{ whiteSpace: 'pre-line' }}>
        {card}
      </p>
      <button onClick={onDelete}>Delete</button>
      <hr />
    </div>
  );
};

export default FlashCard;
