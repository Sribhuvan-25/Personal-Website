import React from 'react';

function TagFilter({ tags, selectedTags, onToggleTag, isDarkMode }) {
  if (tags.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-8">
      <h2 className={`text-xl font-medium mb-4 text-center ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        Filter by tags
      </h2>
      <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => onToggleTag(tag)}
            className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
              selectedTags.includes(tag)
                ? isDarkMode 
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/30'
                  : 'bg-orange-600 text-white shadow-lg shadow-orange-500/30'
                : isDarkMode
                  ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TagFilter; 