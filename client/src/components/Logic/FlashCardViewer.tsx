// /client/src/components/Logic/FlashCardViewer.tsx
import React, { useEffect, useState } from 'react';

interface FlashCardField {
  id: string;
  fieldName: string;
  value: string;
}

interface FlashCard {
  id: string;
  fields: FlashCardField[];
}

interface FlashCardViewerProps {
  flashCards: FlashCard[];
  onComplete: () => void;
  cardsToDisplay: number;
}

const FlashCardViewer: React.FC<FlashCardViewerProps> = ({ flashCards, onComplete, cardsToDisplay }) => {
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [timer, setTimer] = useState<number>(5);
  const [writingTimer, setWritingTimer] = useState<number>(30);
  const [phase, setPhase] = useState<'viewing' | 'writing' | 'done'>('viewing');

  const totalBatches = Math.ceil(flashCards.length / cardsToDisplay);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (phase === 'viewing' && timer > 0) {
      intervalId = setInterval(() => setTimer(timer - 1), 1000);
    } else if (phase === 'viewing' && timer === 0) {
      setPhase('writing');
    } else if (phase === 'writing' && writingTimer > 0) {
      intervalId = setInterval(() => setWritingTimer(writingTimer - 1), 1000);
    } else if (phase === 'writing' && writingTimer === 0) {
      setPhase('done');
    }
    return () => clearInterval(intervalId);
  }, [phase, timer, writingTimer]);

  const handleNextBatch = () => {
    if (currentBatchIndex < totalBatches - 1) {
      setCurrentBatchIndex(currentBatchIndex + 1);
      resetTimers();
    } else {
      onComplete();
    }
  };

  const resetTimers = () => {
    setTimer(5);
    setWritingTimer(30);
    setPhase('viewing');
  };

  const currentBatch = flashCards.slice(
    currentBatchIndex * cardsToDisplay,
    currentBatchIndex * cardsToDisplay + cardsToDisplay
  );

  return (
    <div>
      <h2>FlashCard Batch {currentBatchIndex + 1} of {totalBatches}</h2>
      {phase === 'viewing' && (
        <div>
          {currentBatch.map((flashCard, index) => (
            <div key={flashCard.id}>
              <h3>Card {currentBatchIndex * cardsToDisplay + index + 1}</h3>
              {flashCard.fields.map(field => (
                <div key={field.id}>
                  <strong>{field.fieldName}:</strong> {field.value}
                </div>
              ))}
            </div>
          ))}
          <p>Time left to view: {timer}s</p>
        </div>
      )}

      {phase === 'writing' && (
        <div>
          <p>Please write down what you remember.</p>
          <p>Time left: {writingTimer}s</p>
        </div>
      )}

      {phase === 'done' && (
        <div>
          <button onClick={handleNextBatch}>Next Batch</button>
        </div>
      )}
    </div>
  );
};

export default FlashCardViewer;

