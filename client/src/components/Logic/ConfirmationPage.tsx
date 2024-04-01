
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

interface FlashCard {
  question: string;
  answer: string;
}

const ConfirmationPage: React.FC = () => {
  const location = useLocation();
  const { flashCards } = location.state as { flashCards: FlashCard[] };

  const [rememberedCards, setRememberedCards] = useState<number[]>([]);

  const handleCardClick = (cardIndex: number) => {
    if (!rememberedCards.includes(cardIndex)) {
      setRememberedCards([...rememberedCards, cardIndex]);
    } else {
      setRememberedCards(rememberedCards.filter((index) => index !== cardIndex));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

