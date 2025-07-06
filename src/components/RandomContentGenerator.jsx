import React, { useState } from 'react';

const RandomContentGenerator = () => {
  const [content, setContent] = useState('Click the button to generate random content!');

  const randomContentArray = [
    'Random Quote 1',
    'Random Quote 2',
    'Random Quote 3',
    'Random Quote 4',
    'Random Quote 5'
  ];

  const generateRandomContent = () => {
    const randomIndex = Math.floor(Math.random() * randomContentArray.length);
    setContent(randomContentArray[randomIndex]);
  };

  return (
    <div className="random-content-generator">
      <button onClick={generateRandomContent} className="bg-blue-500 text-white px-4 py-2 rounded">
        Generate Random Content
      </button>
      <p className="mt-4">{content}</p>
    </div>
  );
};

export default RandomContentGenerator;
