import React, { useState } from 'react';

const ConfirmationPage = ({ cards, onSubmit }) => {
  const [rememberedCards, setRememberedCards] = useState([]);

// Handle checkbox change
const handleCardClick = (cardIndex) => {
  if (!rememberedCards.includes(cardIndex)) {
    setRememberedCards([...rememberedCards, cardIndex]);
  } else {
    setRememberedCards(rememberedCards.filter((index) => index !== cardIndex));
  }
};

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the results
    onSubmit(rememberedCards);
  };

  return (
    <div className="confirmation-page">
      <h2>Confirm Your Memory</h2>
      <form onSubmit={handleSubmit}>
        {cards.map((card, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`card-${index}`}
              checked={rememberedCards.includes(index)}
              onChange={() => handleCardClick(index)}
            />
            <label htmlFor={`card-${index}`}>Card {index + 1}</label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ConfirmationPage;

