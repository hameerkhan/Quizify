// Flashcards.js

import React from 'react';

const Flashcards = ({ flashcards, onNext, onPrev }) => {
  const handleNext = () => {
    onNext(); // Call the onNext function to move to the next flashcard
  };

  const handlePrev = () => {
    onPrev(); // Call the onPrev function to move to the previous flashcard
  };

  return (
    <div className="flashcards-container">
      {/* Render the current flashcard */}
      <div className="flashcard">
        <div className="flashcard-question">{flashcards[currentIndex].question}</div>
        <div className="flashcard-answer">{flashcards[currentIndex].answer}</div>
      </div>

      {/* Navigation buttons */}
      <div className="flashcards-navigation">
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Flashcards;
