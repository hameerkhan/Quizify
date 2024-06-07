import React, { useState, useEffect } from 'react';
import Question from './Questions';
import './quiz.css';

const Quiz = ({ questions, onQuizEnd }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [timerDuration, setTimerDuration] = useState(45);
  const [timer, setTimer] = useState(timerDuration);
  const [answers, setAnswers] = useState([]);
  const [questionStatus, setQuestionStatus] = useState([]);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  useEffect(() => {
    shuffleQuestions();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerEnabled && timer > 0) {
        setTimer((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, timerEnabled]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffleQuestions = () => {
    const shuffledQuestions = shuffleArray([...questions]);
    shuffledQuestions.forEach((question) => {
      question.options = shuffleArray([...question.options]);
    });
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedOption(null);
    setTimer(timerDuration);
    setQuestionStatus(new Array(shuffledQuestions.length).fill(null));
  };

  const handleOptionClick = (option) => {
    if (!answerSubmitted) {
      console.log('Selected option:', option); // Debugging log
      setSelectedOption(option);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;

    const correct = selectedOption === questions[currentQuestionIndex].answer;
    const newAnswers = [
      ...answers,
      { question: questions[currentQuestionIndex], selectedOption },
    ];
    setAnswers(newAnswers);

    const newStatus = [...questionStatus];
    newStatus[currentQuestionIndex] = correct ? 'correct' : 'incorrect';
    setQuestionStatus(newStatus);

    setAnswerSubmitted(true);
    setTimerEnabled(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      const nextAnswer = answers.find(
        (ans) => ans.question === questions[currentQuestionIndex + 1]
      );
      setSelectedOption(nextAnswer ? nextAnswer.selectedOption : null);
      setAnswerSubmitted(!!nextAnswer);
      setTimer(timerDuration);
      setTimerEnabled(!nextAnswer);
    } else {
      onQuizEnd(answers);
    }
  };

  const handleSkipQuestion = () => {
    const newStatus = [...questionStatus];
    newStatus[currentQuestionIndex] = 'skipped';
    setQuestionStatus(newStatus);

    const skippedAnswer = {
      question: questions[currentQuestionIndex],
      selectedOption: null,
    };

    const newAnswers = [...answers, skippedAnswer];
    setAnswers(newAnswers);

    handleNextQuestion();
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const prevAnswer = answers.find(
        (ans) => ans.question === questions[currentQuestionIndex - 1]
      );
      setSelectedOption(prevAnswer ? prevAnswer.selectedOption : null);
      setAnswerSubmitted(!!prevAnswer);
      setTimer(timerDuration);
      setTimerEnabled(false);
    }
  };

  const handleTimerChange = (e) => {
    const duration = parseInt(e.target.value);
    setTimerDuration(duration);
    setTimer(duration);
  };

  useEffect(() => {
    if (timer === 0) {
      handleNextQuestion();
    }
  }, [timer]);

  return (
    <div>
      <div className="question-count mt-4">
        {questions.map((_, index) => (
          <div
            key={index}
            className={`inline-block w-8 h-8 text-center rounded-full mx-1 ${
              questionStatus[index] === 'correct'
                ? 'bg-green-500'
                : questionStatus[index] === 'incorrect'
                ? 'bg-red-500'
                : questionStatus[index] === 'skipped'
                ? 'bg-yellow-500'
                : 'bg-gray-900'
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <Question
        question={questions[currentQuestionIndex].question}
        options={questions[currentQuestionIndex].options}
        selectedOption={selectedOption}
        handleOptionClick={handleOptionClick}
        disabled={answerSubmitted} // Disable options if the answer is already submitted
      />
     <div id="allquizbutton" className="quiz-buttons-container">
  <button
    onClick={handlePreviousQuestion}
    disabled={currentQuestionIndex === 0}
    className="quiz-button bg-blue-500"
  >
    Previous
  </button>
  <button
    onClick={handleNextQuestion}
    disabled={!answerSubmitted && questionStatus[currentQuestionIndex] !== 'skipped'}
    className="quiz-button bg-blue-500"
  >
    Next
  </button>
  <button
    onClick={handleSubmitAnswer}
    disabled={answerSubmitted || selectedOption === null}
    className="quiz-button bg-yellow-500"
  >
    Submit Answer
  </button>
  <button
    onClick={handleSkipQuestion}
    className="quiz-button bg-red-500"
  >
    Skip Question
  </button>
</div>

      <div className="timer mt-4">
        <p>Time remaining: {timer} seconds</p>
      </div>
      <div className="timer-customization mt-4">
        <label htmlFor="timerDuration">Timer Duration:</label>
        <input
          type="number"
          id="timerDuration"
          name="timerDuration"
          value={timerDuration}
          onChange={handleTimerChange}
          min="0"
          step="1"
        />
      </div>
      <div className="timer-customization mt-4">
        <label htmlFor="timerEnabled">Enable Timer:</label>
        <input
          type="checkbox"
          id="timerEnabled"
          name="timerEnabled"
          checked={timerEnabled}
          onChange={(e) => setTimerEnabled(e.target.checked)}
        />
      </div>
    </div>
  );
};

export default Quiz;
