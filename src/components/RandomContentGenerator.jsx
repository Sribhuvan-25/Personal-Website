import React, { useState } from 'react';

const RandomContentGenerator = () => {
  const [content, setContent] = useState('');

  const generateRandomContent = () => {
    const randomContentArray = [
      'Random Quote 1',
      'Random Quote 2',
      'Random Quote 3',
      'Random Quote 4',
      'Random Quote 5'
    ];
    const randomIndex = Math.floor(Math.random() * randomContentArray.length);
    setContent(randomContentArray[randomIndex]);
  };

  return (
    <div className="my-4 p-4 border rounded shadow-md">
      <button 
        onClick={generateRandomContent} 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Generate Random Content
      </button>
      <div className="mt-4 text-lg">
        {content}
      </div>
    </div>
  );
};

export default RandomContentGenerator;