import React, { useState, useEffect } from 'react';
import FlashCard from './FlashCard';
import ConfirmationPage from './ConfirmationPage';
import './FlashCardComponent.css';

const FlashCardComponent = () => {
  const [topics, setTopics] = useState([]);
  const [inputTerm, setInputTerm] = useState('');
  const [flashCards, setFlashCards] = useState([]);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(null);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [showUI, setShowUI] = useState(true);
  const [recallTime, setRecallTime] = useState(5);
  const [customTime, setCustomTime] = useState('');
  const [evaluationMode, setEvaluationMode] = useState(false);
  const [sessionScore, setSessionScore] = useState(null);

  const createTopic = () => {
    if (newTopicTitle.trim() !== '') {
      const newTopic = { title: newTopicTitle, terms: [''] };
      setTopics([...topics, newTopic]);
      setCurrentTopicIndex(topics.length);
      setNewTopicTitle('');
    }
  };

  const addTerm = () => {
    if (currentTopicIndex !== null) {
      const updatedTopics = [...topics];
      updatedTopics[currentTopicIndex].terms.push(inputTerm);
      setTopics(updatedTopics);
      setInputTerm('');
    }
  };

  const removeTerm = (termIndex) => {
    if (currentTopicIndex !== null && topics[currentTopicIndex].terms.length > 1) {
      const updatedTopics = [...topics];
      updatedTopics[currentTopicIndex].terms.splice(termIndex, 1);
      setTopics(updatedTopics);
    }
  };

  const handleStartRecall = () => {
    if (customTime !== '') {
      const timeInSeconds = parseInt(customTime);
      if (!isNaN(timeInSeconds) && timeInSeconds > 0) {
        setRecallTime(timeInSeconds);
      }
    }
    setShowUI(false);
  };

  const handleCustomTimeChange = (e) => {
    setCustomTime(e.target.value);
  };

  const handleConfirmationSubmit = (score) => {
    setSessionScore(score);
  };

 // Inside FlashCardComponent
const createCard = () => {
  if (currentTopicIndex !== null) {
    const newCard = { terms: topics[currentTopicIndex].terms.slice() };
    setFlashCards(prevCards => [...prevCards, newCard]);
  }
};

  const addTermToCard = (term) => {
    if (flashCards.length > 0) {
      const updatedCards = [...flashCards];
      updatedCards[flashCards.length - 1].terms.push(term);
      setFlashCards(updatedCards);
    }
  };

  const removeTermFromCard = (cardIndex, termIndex) => {
    const updatedCards = [...flashCards];
    updatedCards[cardIndex].terms.splice(termIndex, 1);
    setFlashCards(updatedCards);
  };

  useEffect(() => {
    if (!showUI) {
      const timer = setTimeout(() => {
        setShowUI(true);
        setEvaluationMode(true);
      }, recallTime * 1000);
      return () => clearTimeout(timer);
    }
  }, [showUI, recallTime]);

  return (
    <div className="flash-card-container">
      <h1 className="heading">Flash Card App</h1>

      {showUI ? (
        <>
          {currentTopicIndex === null && (
            <div>
              <input
                type="text"
                placeholder="Enter Topic Title"
                value={newTopicTitle}
                onChange={(e) => setNewTopicTitle(e.target.value)}
                className="input"
              />
              <button onClick={createTopic} className="button">
                Create Topic
              </button>
            </div>
          )}

          {currentTopicIndex !== null && (
            <>
              <div className="terms-container">
                {topics[currentTopicIndex].terms.map((term, termIndex) => (
                  <div key={termIndex} className="term-item">
                    <input
                      type="text"
                      placeholder={`Term ${termIndex + 1}`}
                      value={term}
                      onChange={(e) => {
                        const updatedTopics = [...topics];
                        updatedTopics[currentTopicIndex].terms[termIndex] = e.target.value;
                        setTopics(updatedTopics);
                      }}
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
            </>
          )}
          {currentTopicIndex !== null && (
            <div>
              <input
                type="number"
                placeholder="Custom Recall Time (seconds)"
                value={customTime}
                onChange={handleCustomTimeChange}
                className="input"
              />
              <button onClick={handleStartRecall} className="start-recall-button">
                Start Recall
              </button>
            </div>
          )}
        </>
      ) : (
        <div>
          <p>Recall in progress...</p>
        </div>
      )}

      {evaluationMode && (
        <ConfirmationPage terms={flashCards.map(card => card.terms).flat()} onSubmit={handleConfirmationSubmit} />
      )}

      {sessionScore !== null && (
        <div>
          <p>Your session score: {sessionScore}%</p>
        </div>
      )}

      <div className="cards-container">
        <h2 className="cards-heading">Flash Cards</h2>
        {showUI &&
          flashCards.map((card, index) => (
            <div key={index} className="card-item">
              <FlashCard
                card={card}
                onDelete={() => removeCard(index)}
                onAddTerm={addTermToCard}
                onRemoveTerm={(termIndex) => removeTermFromCard(index, termIndex)}
              />
              <hr className="hr" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default FlashCardComponent;

