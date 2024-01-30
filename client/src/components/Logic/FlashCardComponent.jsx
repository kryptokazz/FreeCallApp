import React, { useState, useEffect } from 'react';
import FlashCard from './FlashCard';
import ConfirmationPage from './ConfirmationPage'; // Import the ConfirmationPage component
import './FlashCardComponent.css';

const FlashCardComponent = () => {
  const [topics, setTopics] = useState([]);
  const [inputTerm, setInputTerm] = useState('');
  const [cards, setCards] = useState([]);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(null);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [showUI, setShowUI] = useState(true); // State to control UI visibility
  const [recallTime, setRecallTime] = useState(5); // Default time for recall in seconds
  const [customTime, setCustomTime] = useState(''); // State to store custom recall time
  const [evaluationMode, setEvaluationMode] = useState(false); // State to control evaluation mode
  const [rememberedTerms, setRememberedTerms] = useState([]); // State to store remembered terms
  const [sessionScore, setSessionScore] = useState(null); // State to store session score

  const createTopic = () => {
    if (newTopicTitle.trim() !== '') {
      const newTopic = { title: newTopicTitle, terms: [] };
      setTopics([...topics, newTopic]);
      setCurrentTopicIndex(topics.length); // Set the current topic index to the last one created
      setNewTopicTitle(''); // Reset the input field after creating the topic
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

  const createCard = () => {
    if (currentTopicIndex !== null) {
      const newCard = topics[currentTopicIndex].terms.join('\n');
      setCards((prevCards) => [...prevCards, newCard]);
    }
  };

  const removeCard = (index) => {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
  };

  const handleStartRecall = () => {
    if (customTime !== '') {
      const timeInSeconds = parseInt(customTime);
      if (!isNaN(timeInSeconds) && timeInSeconds > 0) {
        setRecallTime(timeInSeconds);
      }
    }
    setShowUI(false); // Hide the UI when recall starts
  };

  const handleCustomTimeChange = (e) => {
    setCustomTime(e.target.value);
  };

  const handleTermClick = (term) => {
    if (!rememberedTerms.includes(term)) {
      setRememberedTerms([...rememberedTerms, term]);
    } else {
      setRememberedTerms(rememberedTerms.filter((t) => t !== term));
    }
  };

  useEffect(() => {
    if (!showUI) {
      const timer = setTimeout(() => {
        setShowUI(true); // Show the UI after the recall time
        setEvaluationMode(true); // Enter evaluation mode
      }, recallTime * 1000); // Convert recall time to milliseconds
      return () => clearTimeout(timer);
    }
  }, [showUI, recallTime]);

  const handleConfirmationSubmit = (score) => {
    setSessionScore(score);
  };

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
        <ConfirmationPage terms={topics[currentTopicIndex].terms} onSubmit={handleConfirmationSubmit} />
      )}

      {sessionScore !== null && (
        <div>
          <p>Your session score: {sessionScore}%</p>
          {/* Additional UI or actions based on the score */}
        </div>
      )}

      <div className="cards-container">
        <h2 className="cards-heading">Flash Cards</h2>
        {showUI &&
          cards.map((card, index) => (
            <div key={index} className="card-item">
              <FlashCard card={card} onDelete={() => removeCard(index)} />
              <hr className="hr" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default FlashCardComponent;

