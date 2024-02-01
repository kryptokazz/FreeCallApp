import React, { useState, useEffect } from 'react';
import FlashCard from './FlashCard';
import './FlashCardComponent.css';
import { useNavigate } from 'react-router-dom';


const FlashCardComponent = () => {
  const [topics, setTopics] = useState([]);
  const [inputTerm, setInputTerm] = useState('');
  const [flashCards, setFlashCards] = useState([]);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(null);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [showUI, setShowUI] = useState(true);
  const [recallTime, setRecallTime] = useState();
  const [customTime, setCustomTime] = useState('');
  const navigate = useNavigate(); 

   const handleManualNavigation = () => {
    navigate('/confirmation');
  };


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

  const createCard = () => {
    if (currentTopicIndex !== null && topics[currentTopicIndex].terms.length > 0) {
      const newCard = { terms: topics[currentTopicIndex].terms.slice() };
      setFlashCards(prevCards => [...prevCards, newCard]);
    }
  };

  const removeCard = (cardIndex) => {
    const updatedCards = [...flashCards];
    updatedCards.splice(cardIndex, 1);
    setFlashCards(updatedCards);
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
	navigate('/confirmation');
      }, recallTime * 1000);
      return () => clearTimeout(timer);
    }
  }, [showUI, recallTime, navigate]);

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
<button onClick={handleManualNavigation}>Go to Confirmation</button>



        </>
      ) : (
        <div>
          <p>Recall in progress...</p>
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
