import React, { useState, useEffect } from 'react';
import Quiz from './components/Quiz';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
  const [topics, setTopics] = useState([]);
  const [topic, setTopic] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [quizInProgress, setQuizInProgress] = useState(false);

  useEffect(() => {
    fetch('/questions.json')
      .then((response) => response.json())
      .then((data) => setTopics(data.topics));
  }, []);

  const handleTopicSelect = (selectedTopic) => {
    console.log('Selected topic:', selectedTopic); // Debugging log
    setTopic(selectedTopic);
    setShowDashboard(false);
    setQuizInProgress(true);
  };

  const handleQuizEnd = (quizAnswers) => {
    setAnswers(quizAnswers);
    setShowDashboard(true);
    setQuizInProgress(false);
  };

  const handleQuitQuiz = () => {
    setShowDashboard(true);
    setQuizInProgress(false);
  };

  const handleRetakeQuiz = () => {
    setShowDashboard(false);
    setAnswers([]);
    setQuizInProgress(true);
  };

  const handleChooseTopic = () => {
    setTopic(null);
    setShowDashboard(false);
    setAnswers([]);
    setQuizInProgress(false);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="logo">Quizify</h1>
      </header>
      <main className="main-content">
        {!topic ? (
          <div className="topic-selection">
            <h2 className="sub-heading">Select a Topic</h2>
            <div className="topic-list">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => handleTopicSelect(topic)}
                  className="topic-button"
                >
                  {topic.name}
                </button>
              ))}
            </div>
          </div>
        ) : showDashboard ? (
          <Dashboard
            answers={answers}
            handleRetakeQuiz={handleRetakeQuiz}
            handleChooseTopic={handleChooseTopic}
          />
        ) : (
          <Quiz
            questions={topic.questions}
            onQuizEnd={handleQuizEnd}
            handleQuitQuiz={handleQuitQuiz}
            answers={answers}
          />
        )}
      </main>
      <footer className="footer">
        <p>&copy; 2024 Quizify</p>
      </footer>
    </div>
  );
};

export default App;
