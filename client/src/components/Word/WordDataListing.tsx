import React, { useEffect, useState } from 'react';

const WordDataListing: React.FC = () => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    // Fetch and set the word data from the server
  }, []);

  return (
    <div>
      <h2>Word Data Listing</h2>
      <ul>
        {words.map((word) => (
          <li key={word.word_id}>{word.word_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default WordDataListing;

