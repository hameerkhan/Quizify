import React, { useState } from 'react';

const Dashboard = ({ answers, handleRetakeQuiz, handleChooseTopic }) => {
  const [reviewMode, setReviewMode] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [filter, setFilter] = useState('all'); // State to manage filter

  const correctAnswers = answers.filter(
    (answer) => answer.selectedOption === answer.question.answer
  );

  const handleToggleReviewMode = () => {
    setReviewMode(!reviewMode);
    setSelectedQuestion(null); // Reset selected question when toggling review mode
  };

  const handleSelectQuestion = (questionNumber) => {
    setSelectedQuestion(questionNumber);
  };

  const handleFilter = (type) => {
    setFilter(type);
  };

  return (
    <div className="p-4 text-center">
      <div className="max-w-lg mx-auto bg-black-100 rounded-md p-2">
        <h2 className="text-2xl font-bold">Quiz Results</h2>
        <p className="mt-2">
          Score: {correctAnswers.length} / {answers.length}
        </p>
        <div className="mt-4">
          <button
            onClick={handleRetakeQuiz}
            className="mt-4 p-2 bg-blue-500 text-white rounded mr-2"
          >
            Retake Quiz
          </button>
          <button
            onClick={handleChooseTopic}
            className="mt-4 p-2 bg-green-500 text-white rounded"
          >
            Choose Another Topic
          </button>
        </div>
        {reviewMode ? (
          <div className="mt-4">
            <div>
              <button onClick={() => handleFilter('all')} className="mr-2 mb-2">All</button>
              <button onClick={() => handleFilter('correct')} className="mr-2 mb-2">Correct</button>
              <button onClick={() => handleFilter('incorrect')} className="mr-2 mb-2">Incorrect</button>
              <button onClick={() => handleFilter('skipped')} className="mr-2 mb-2">Skipped</button>
            </div>
            {selectedQuestion !== null ? (
              <div>
                <h3 className="text-xl">{answers[selectedQuestion].question.question}</h3>
                <p>
                  Your answer: {answers[selectedQuestion].selectedOption} -{' '}
                  {answers[selectedQuestion].selectedOption === answers[selectedQuestion].question.answer ? (
                    <span className="text-green-500">Correct</span>
                  ) : (
                    <span className="text-red-500">Incorrect</span>
                  )}
                </p>
                <p className="text-yellow-500">
                  Explanation: {answers[selectedQuestion].question.explanation}
                </p>
                <button
                  onClick={() => setSelectedQuestion(null)}
                  className="mt-2 p-2 bg-blue-500 text-white rounded"
                >
                  Back to Question Sequence
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-xl">Choose Question:</h3>
                {filter === 'all' ? (
                  answers.map((answer, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectQuestion(index)}
                      className="p-2 bg-blue-500 text-white rounded-full mr-2 mb-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                      style={{ width: '40px', height: '40px', borderRadius: '50%', padding: '8px' }}
                    >
                      {index + 1}
                    </button>
                  ))
                ) : filter === 'correct' ? (
                  correctAnswers.map((answer, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectQuestion(answers.indexOf(answer))}
                      className="p-2 bg-green-500 text-white rounded-full mr-2 mb-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
                      style={{ width: '40px', height: '40px', borderRadius: '50%', padding: '8px' }}
                    >
                      {answers.indexOf(answer) + 1}
                    </button>
                  ))
                ) : (
                  answers.filter(answer => answer.selectedOption === null).map((answer, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectQuestion(answers.indexOf(answer))}
                      className="p-2 bg-yellow-500 text-white rounded-full mr-2 mb-2 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50"
                      style={{ width: '40px', height: '40px', borderRadius: '50%', padding: '8px' }}
                    >
                      {answers.indexOf(answer) + 1}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="mt-4">
            <button
              onClick={handleToggleReviewMode}
              className="mt-4 p-2 bg-gray-500 text-white rounded"
            >
              Review Answers
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
