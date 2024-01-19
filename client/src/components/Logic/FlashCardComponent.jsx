// FlashCardComponent.jsx

import React, { useState, useEffect } from 'react';
import FlashCard from './FlashCard';
import './FlashCardComponent.css';

const FlashCardComponent = () => {
  const [pairs, setPairs] = useState([{ terms: ['Term 1', 'Term 2'] }]);
  const [cards, setCards] = useState([]);
  const [inputTerm, setInputTerm] = useState('');
  const [showUI, setShowUI] = useState(true);
  const [timerStarted, setTimerStarted] = useState(false);
  const [countdown, setCountdown] = useState(5); // Initial countdown value in seconds

  const addTerm = () => {
    const updatedPairs = [...pairs];
    updatedPairs[0].terms.push(inputTerm);
    setPairs(updatedPairs);
    setInputTerm('');
  };

  const removeTerm = (termIndex) => {
    if (pairs[0].terms.length > 1) {
      const updatedPairs = [...pairs];
      updatedPairs[0].terms.splice(termIndex, 1);
      setPairs(updatedPairs);
    }
  };

  const handleTermChange = (termIndex, value) => {
    const updatedPairs = [...pairs];
    updatedPairs[0].terms[termIndex] = value;
    setPairs(updatedPairs);
  };

  const createCard = () => {
    const newCard = pairs[0].terms.join('\n');
    setCards((prevCards) => [...prevCards, newCard]);

    const updatedPairs = [{ terms: Array.from({ length: pairs[0].terms.length }, (_, i) => pairs[0].terms[i]) }];
    setPairs(updatedPairs);
  };

  const removeCard = (index) => {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
  };

  const startTimer = () => {
    setCountdown(5); // Reset countdown when the timer starts
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          setShowUI(false);
          clearInterval(timer);
          // Perform actions after the timer expires (e.g., retrieve terms)
        }
        return prevCountdown - 1;
      });
    }, 1000); // Update the countdown every second (1000 milliseconds)
  };

  const handleStartTest = () => {
    setTimerStarted(true);
    startTimer();
    console.log('Timer started');
  };

  useEffect(() => {
    if (timerStarted && showUI) {
      startTimer();
    }
  }, [timerStarted, showUI]);

  useEffect(() => {
    console.log(`Countdown: ${countdown} seconds`);
  }, [countdown]);


  return (
    <div className={`flash-card-container ${showUI ? '' : 'hidden'}`}>
      <h1 className="heading">Flash Card App</h1>
      <div className="terms-container">
        {pairs[0].terms.map((term, termIndex) => (
          <div key={termIndex} className="term-item">
            <input
              type="text"
              placeholder={`Term ${termIndex + 1}`}
              value={term}
              onChange={(e) => handleTermChange(termIndex, e.target.value)}
              className="input"
            />
            <button onClick={() => removeTerm(termIndex)} className="remove-button">
              Remove Term
            </button>
          </div>
        ))}
      </div>
      <button onClick={addTerm} className="button">
        Add Term
      </button>
      <button onClick={createCard} className="button">
        Create Card
      </button>

      <div className="cards-container">
        <h2 className="cards-heading">Flash Cards</h2>
        {cards.map((card, index) => (
          <div key={index} className="card-item">
            <FlashCard card={card} onDelete={() => removeCard(index)} />
            {index < cards.length - 1 && <hr className="hr" />}
          </div>
        ))}
      </div>

      {!timerStarted && (
        <button onClick={handleStartTest} className="button">
          Start Test
        </button>
      )}
    </div>
  );
};

export default FlashCardComponent;
