import React from 'react';

const TagFilter = ({ tags, selectedTags, onToggleTag }) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-center">Filter by Tags</h3>
      <div className="flex flex-wrap justify-center gap-2">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => onToggleTag(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedTags.includes(tag)
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700 hover:text-white'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      {selectedTags.length > 0 && (
        <div className="text-center mt-4">
          <button
            onClick={() => onToggleTag('clear-all')}
            className="text-cyan-400 hover:text-cyan-300 text-sm underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default TagFilter;
