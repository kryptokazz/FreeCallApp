// FlashCardComponent.jsx

import React, { useState, useEffect } from 'react';
import FlashCard from './FlashCard';
import './FlashCardComponent.css';

const FlashCardComponent = () => {
  const [pairs, setPairs] = useState([{ terms: ['Term 1', 'Term 2'] }]);
  const [cards, setCards] = useState([]);
  const [inputTerm, setInputTerm] = useState('');
  const [showUI, setShowUI] = useState(true);

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
    setTimeout(() => {
      setShowUI(false);
      // Perform actions after the timer expires (e.g., retrieve terms)
    }, 5000); // Adjust the time (in milliseconds) according to your needs
  };

  useEffect(() => {
    startTimer(); // Start the timer when the component mounts
    // You can add other dependencies for useEffect if needed
  }, []); // Empty dependency array ensures that this effect runs only once on mount

  return (
    <div className={`flash-card-container ${showUI ? '' : 'hidden'}`}>
      {/* ... (rest of the component) */}
    </div>
  );
};

export default FlashCardComponent;

