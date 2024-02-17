import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ConfirmationPage = () => {
  const location = useLocation();
  const { flashCards } = location.state;
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
    // Here, you can define the onSubmit function or call the appropriate function to handle form submission
    // For example:
    console.log('Remembered Cards:', rememberedCards);
    // Reset rememberedCards state or take further actions as needed
  };

  return (
    <div className="confirmation-page">
      <h2>Confirm Your Memory</h2>
      <form onSubmit={handleSubmit}>
        {flashCards.map((card, index) => (
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

