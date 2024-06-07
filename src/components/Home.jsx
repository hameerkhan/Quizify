import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ topics, handleTopicSelect }) => {
  return (
    <div className="home-container p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Quiz App</h1>
      <p className="mb-4">Test your knowledge on various topics and improve your skills.</p>
      <div>
        <h2 className="text-2xl font-bold">Select a Topic</h2>
        {topics.map((topic) => (
          <Link to="/quiz" key={topic.id}>
            <button
              onClick={() => handleTopicSelect(topic)}
              className="block w-full p-2 my-2 bg-blue-500 text-white rounded"
            >
              {topic.name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
