import React, { useState } from 'react'; interface SelfAssessmentProps { flashCards: FlashCard[]; onFinish: () => void; } const SelfAssessment: React.FC<SelfAssessmentProps> = ({ flashCards, onFinish }) => { const [currentIndex, setCurrentIndex] = useState(0); const [userInput, setUserInput] = useState<string>(''); const [scores, setScores] = useState<{ [key: string]: boolean }>({}); const currentCard = flashCards[currentIndex]; const handleNext = () => { setScores({ ...scores, [currentCard.id]: userInput.trim().toLowerCase() === currentCard.fields.map(f => f.value).join(' ').toLowerCase(), }); setUserInput('');
    if (currentIndex < flashCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div>
      <h2>Self Assessment</h2>
      <p>FlashCard {currentIndex + 1}</p>
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter what you wrote down"
      />
      <button onClick={handleNext}>Next</button>
      {/* Optionally, display the correct answer for comparison */}
      <div>
        <h3>Correct Answer:</h3>
        {currentCard.fields.map(field => (
          <div key={field.id}>
            <strong>{field.fieldType}:</strong> {field.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelfAssessment;

