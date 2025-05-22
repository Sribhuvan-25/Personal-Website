import React from 'react';

function TagFilter({ tags, selectedTags, onToggleTag }) {
  if (tags.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-8">
      <h2 className="text-xl font-medium mb-4 text-center">Filter by tags</h2>
      <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => onToggleTag(tag)}
            className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
              selectedTags.includes(tag)
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30'
                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
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