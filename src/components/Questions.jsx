import React from 'react';

const Question = ({ question, options, selectedOption, handleOptionClick, disabled }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{question}</h2>
      <div className="mt-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => {
              if (!disabled) {
                console.log(`Option ${index + 1} clicked: ${option}`);
                handleOptionClick(option);
              }
            }}
            className={`block w-full p-2 my-2 border rounded ${
              selectedOption === option
                ? 'bg-blue-500 text-white'
                : 'bg-white text-black'
            }`}
            disabled={disabled}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
