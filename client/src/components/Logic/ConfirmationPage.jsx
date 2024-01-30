import React, { useState } from 'react';

const ConfirmationPage = ({ terms, onSubmit }) => {
  const [rememberedTerms, setRememberedTerms] = useState([]);
  const [score, setScore] = useState(0);

  // Handle checkbox change
  const handleTermClick = (term) => {
    if (!rememberedTerms.includes(term)) {
      setRememberedTerms([...rememberedTerms, term]);
    } else {
      setRememberedTerms(rememberedTerms.filter((t) => t !== term));
    }
  };

  // Calculate score
  const calculateScore = () => {
    const totalTerms = terms.length;
    const correctlyRemembered = rememberedTerms.length;
    const percentage = (correctlyRemembered / totalTerms) * 100;
    setScore(percentage);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    calculateScore();
    // Submit the results
    onSubmit(score);
  };

  return (
    <div className="confirmation-page">
      <h2>Confirm Your Memory</h2>
      <form onSubmit={handleSubmit}>
        {terms.map((term, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`term-${index}`}
              value={term}
              checked={rememberedTerms.includes(term)}
              onChange={() => handleTermClick(term)}
            />
            <label htmlFor={`term-${index}`}>{term}</label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      {score > 0 && <p>Your score: {score}%</p>}
    </div>
  );
};

export default ConfirmationPage;

