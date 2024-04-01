
import React, { useState, useEffect } from 'react';
import FlashCard from './FlashCard';
import './FlashCardComponent.css';
import { useNavigate } from 'react-router-dom';

interface FlashCard {
  terms: string[];
}

const FlashCardComponent: React.FC = () => {
  const [topics, setTopics] = useState<{ title: string; terms: string[] }[]>([]);
  const [inputTerm, setInputTerm] = useState<string>('');
  const [flashCards, setFlashCards] = useState<FlashCard[]>([]);
  const [currentTopicIndex, setCurrentTopicIndex] = useState<number | null>(null);
  const [newTopicTitle, setNewTopicTitle] = useState<string>('');
  const [showUI, setShowUI] = useState<boolean>(true);
  const [recallTime, setRecallTime] = useState<number>();
  const [customTime, setCustomTime] = useState<string>('');
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

  const removeTerm = (termIndex: number) => {
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
        setShowUI(false);
        navigate('/confirmation', { state: { flashCards } });
      }
    }
  };

  const handleCustomTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTime(e.target.value);
  };

  const createCard = () => {
    if (currentTopicIndex !== null && topics[currentTopicIndex].terms.length > 0) {
      const newCard = { terms: topics[currentTopicIndex].terms.slice() };
      setFlashCards(prevCards => [...prevCards, newCard]);
    }
  };

  const removeCard = (cardIndex: number) => {
    const updatedCards = [...flashCards];
    updatedCards.splice(cardIndex, 1);
    setFlashCards(updatedCards);
  };

  const addTermToCard = (term: string) => {
    if (flashCards.length > 0) {
      const updatedCards = [...flashCards];
      updatedCards[flashCards.length - 1].terms.push(term);
      setFlashCards(updatedCards);
    }
  };

  const removeTermFromCard = (cardIndex: number, termIndex: number) => {
    const updatedCards = [...flashCards];
    updatedCards[cardIndex].terms.splice(termIndex, 1);
    setFlashCards(updatedCards);
  };

  useEffect(() => {
    if (!showUI && recallTime) {
      const timer = setTimeout(() => {
        setShowUI(true);
        navigate('/confirmation');
      }, recallTime * 1000);

      // Clear the timer when the component unmounts or when recallTime changes
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
