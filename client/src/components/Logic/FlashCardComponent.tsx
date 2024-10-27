// /client/src/components/Logic/FlashCardComponent.tsx
import React, { useState, useEffect } from 'react';
import FlashCardEditor from './FlashCardEditor';
import FlashCardViewer from './FlashCardViewer';
import SelfAssessment from './SelfAssessment';
import ConceptEditor from './ConceptEditor'; // Import ConceptEditor

interface FlashCardField {
  id: string;
  fieldName: string;
  value: string;
}

interface FlashCard {
  id: string;
  fields: FlashCardField[];
}

interface Concept {
  id: string;
  name: string;
  flashCards: FlashCard[];
  lastStudied: Date | null;
  nextReview: Date | null;
  easeFactor: number;
}

const FlashCardComponent: React.FC = () => {
  const [concepts, setConcepts] = useState<Concept[]>(() => {
    const storedConcepts = localStorage.getItem('concepts');
    return storedConcepts ? JSON.parse(storedConcepts) : [];
  });
  const [currentConcept, setCurrentConcept] = useState<Concept | null>(null);
  const [currentView, setCurrentView] = useState<'conceptList' | 'flashCardList' | 'createConcept' | 'createFlashCard' | 'test' | 'assess'>('conceptList');
  const [currentFlashCardIndex, setCurrentFlashCardIndex] = useState<number>(0);
  const [cardsToDisplay, setCardsToDisplay] = useState<number>(1);

  useEffect(() => {
    localStorage.setItem('concepts', JSON.stringify(concepts));
  }, [concepts]);

  const addConcept = (concept: Concept) => {
    setConcepts([...concepts, concept]);
    setCurrentView('conceptList');
  };

  const selectConcept = (conceptId: string) => {
    const concept = concepts.find(c => c.id === conceptId) || null;
    setCurrentConcept(concept);
    setCurrentView('flashCardList');
  };

  const addFlashCardToConcept = (flashCard: FlashCard) => {
    if (currentConcept) {
      const updatedConcept = {
        ...currentConcept,
        flashCards: [...currentConcept.flashCards, flashCard],
      };
      setConcepts(concepts.map(c => c.id === currentConcept.id ? updatedConcept : c));
      setCurrentConcept(updatedConcept);
      setCurrentView('flashCardList');
    }
  };

  const startTest = () => {
    if (currentConcept && currentConcept.flashCards.length > 0) {
      setCurrentFlashCardIndex(0);
      setCurrentView('test');
    }
  };

  const updateConceptReview = (conceptId: string, scores: { [key: string]: boolean }) => {
    setConcepts(concepts.map(concept => {
      if (concept.id === conceptId) {
        const now = new Date();
        const correctAnswers = Object.values(scores).filter(v => v).length;
        const successRate = correctAnswers / Object.values(scores).length;
        let easeFactor = concept.easeFactor || 2.5;
        if (successRate >= 0.6) {
          easeFactor += 0.1;
        } else {
          easeFactor -= 0.2;
        }
        easeFactor = Math.max(1.3, easeFactor);

        const interval = calculateInterval(easeFactor);
        const nextReviewDate = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000);

        return {
          ...concept,
          lastStudied: now,
          nextReview: nextReviewDate,
          easeFactor: easeFactor,
        };
      }
      return concept;
    }));
  };

  const calculateInterval = (easeFactor: number) => {
    return Math.round(easeFactor);
  };

  return (
    <div>
      {currentView === 'conceptList' && (
        <div className="flash-card-container">
          <h1 className="heading">My Concepts</h1>
          <button className="button" onClick={() => setCurrentView('createConcept')}>Create Concept</button>
          <ul>
            {concepts.map(concept => {
              const isDueForReview = concept.nextReview && new Date(concept.nextReview) <= new Date();
              return (
                <li key={concept.id}>
                  <button className="button" onClick={() => selectConcept(concept.id)}>
                    {concept.name} {isDueForReview && <span style={{ color: 'red' }}>(Review Due)</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {currentView === 'createConcept' && (
        <ConceptEditor
          onSave={addConcept}
          onCancel={() => setCurrentView('conceptList')}
        />
      )}

      {currentView === 'flashCardList' && currentConcept && (
        <div className="flash-card-container">
          <h1 className="heading">Concept: {currentConcept.name}</h1>
          <button className="button" onClick={() => setCurrentView('createFlashCard')}>Add FlashCard</button>
          <button className="button" onClick={startTest}>Start Test</button>
          <label>
            Number of cards to display at once:
            <input
              type="number"
              value={cardsToDisplay}
              min={1}
              max={currentConcept.flashCards.length}
              onChange={(e) => setCardsToDisplay(Number(e.target.value))}
              className="input"
            />
          </label>
          <ul>
            {currentConcept.flashCards.map((card, index) => (
              <li key={card.id}>FlashCard {index + 1}</li>
            ))}
          </ul>
          <button className="button" onClick={() => setCurrentView('conceptList')}>Back to Concepts</button>
        </div>
      )}

      {currentView === 'createFlashCard' && currentConcept && (
        <FlashCardEditor
          onSave={addFlashCardToConcept}
          onCancel={() => setCurrentView('flashCardList')}
        />
      )}

      {currentView === 'test' && currentConcept && (
        <FlashCardViewer
          flashCards={currentConcept.flashCards}
          onComplete={() => setCurrentView('assess')}
          cardsToDisplay={cardsToDisplay}
        />
      )}

      {currentView === 'assess' && currentConcept && (
        <SelfAssessment
          flashCards={currentConcept.flashCards}
          onFinish={(scores) => {
            updateConceptReview(currentConcept.id, scores);
            setCurrentView('flashCardList');
          }}
        />
      )}
    </div>
  );
};

export default FlashCardComponent;

