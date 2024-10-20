import React, { useState } from 'react';
import FlashCard from './FlashCard';
import './FlashCardComponent.css';

interface Topic {
  title: string;
  terms: { text: string; selected: boolean }[];
}

const FlashCardComponent: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [inputTerm, setInputTerm] = useState<string>('');
  const [flashCards, setFlashCards] = useState<{ terms: string[] }[]>([]);
  const [currentTopicIndex, setCurrentTopicIndex] = useState<number | null>(null);
  const [newTopicTitle, setNewTopicTitle] = useState<string>('');
  const [recallInProgress, setRecallInProgress] = useState<boolean>(false);
  const [recallTime, setRecallTime] = useState<number | null>(null);
  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const [selections, setSelections] = useState<boolean[]>([]);
  const [score, setScore] = useState<number | null>(null);

  const createTopic = () => {
    if (newTopicTitle.trim() !== '') {
      const newTopic = { title: newTopicTitle, terms: [{ text: '', selected: false }] };
      setTopics([...topics, newTopic]);
      setCurrentTopicIndex(topics.length);
      setNewTopicTitle('');
    }
  };

  const addTerm = () => {
    if (currentTopicIndex !== null) {
      setTopics((prevTopics) =>
        prevTopics.map((topic, index) =>
          index === currentTopicIndex
            ? { ...topic, terms: [...topic.terms, { text: inputTerm, selected: false }] }
            : topic
        )
      );
      setInputTerm('');
    }
  };

  const removeTerm = (topicIndex: number, termIndex: number) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic, index) =>
        index === topicIndex
          ? { ...topic, terms: topic.terms.filter((_, i) => i !== termIndex) }
          : topic
      )
    );
  };

  const handleStartRecall = () => {
    if (recallTime && topics.length > 0) {
      setRecallInProgress(true);
      setShowAnswers(false);
      setSelections(Array(topics[currentTopicIndex!].terms.length).fill(false));

      setTimeout(() => {
        setRecallInProgress(false);
        setShowAnswers(true);
      }, recallTime * 1000);
    }
  };

  const createCard = () => {
    if (currentTopicIndex !== null && topics[currentTopicIndex].terms.length > 0) {
      setFlashCards([{ terms: topics[currentTopicIndex].terms.map((term) => term.text) }]);
    }
  };

  const handleSelectTerm = (topicIndex: number, termIndex: number) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic, index) =>
        index === topicIndex
          ? {
              ...topic,
              terms: topic.terms.map((term, i) =>
                i === termIndex ? { ...term, selected: !term.selected } : term
              )
            }
          : topic
      )
    );
  };

  const handleSelectionChange = (index: number) => {
    const newSelections = [...selections];
    newSelections[index] = !newSelections[index];
    setSelections(newSelections);
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    selections.forEach((selected, index) => {
      if (selected && topics[currentTopicIndex!].terms[index].selected) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
  };

  return (
    <div className="flash-card-container">
      <h1 className="heading">Flash Card App</h1>

      {!recallInProgress && !showAnswers && (
        <>
          {currentTopicIndex === null && (
            <div className="topic-input-container">
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
                      value={term.text}
                      onChange={(e) => {
                        setTopics((prevTopics) =>
                          prevTopics.map((topic, index) =>
                            index === currentTopicIndex
                              ? {
                                  ...topic,
                                  terms: topic.terms.map((t, i) =>
                                    i === termIndex ? { ...t, text: e.target.value } : t
                                  )
                                }
                              : topic
                          )
                        );
                      }}
                      className="input"
                    />
                    <button onClick={() => removeTerm(currentTopicIndex!, termIndex)} className="remove-button">
                      Remove Term
                    </button>
                  </div>
                ))}
              </div>
              <div className="button-container">
                <button onClick={addTerm} className="button">
                  Add Term
                </button>
                <button onClick={createCard} className="button">
                  Create Card
                </button>
              </div>
            </>
          )}

          {currentTopicIndex !== null && (
            <div className="recall-time-container">
              <input
                type="number"
                placeholder="Custom Recall Time (seconds)"
                value={recallTime || ''}
                onChange={(e) => setRecallTime(parseInt(e.target.value))}
                className="input"
              />
              <button
                onClick={() => {
                  handleStartRecall();
                }}
                className="start-recall-button"
              >
                Start Recall
              </button>
            </div>
          )}
        </>
      )}

      {recallInProgress && (
        <div>
          <p>Recall in progress...</p>
        </div>
      )}

      {showAnswers && (
        <div className="cards-container">
          <h2 className="cards-heading">Flash Cards - Answers</h2>
          {flashCards.map((card, index) => (
            <div key={index} className="card-item">
              <FlashCard card={card} handleSelectTerm={handleSelectTerm} topicIndex={currentTopicIndex!} />
              <div className="selection-boxes">
                {topics[currentTopicIndex!].terms.map((term, termIndex) => (
                  <label key={termIndex}>
                    <input
                      type="checkbox"
                      checked={selections[termIndex]}
                      onChange={() => handleSelectionChange(termIndex)}
                    />
                    Term {termIndex + 1}
                  </label>
                ))}
              </div>
              <hr className="hr" />
            </div>
          ))}
          <div className="score-container">
            {score !== null && (
              <p>Your score: {score}/{flashCards.length}</p>
            )}
            <button onClick={handleSubmit} className="submit-button">
              Submit Selections
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashCardComponent;

