import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TagFilter from '../components/TagFilter';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch posts from index.json
    fetch('/content/index.json')
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setFilteredPosts(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading blog posts:', error);
        setIsLoading(false);
      });
  }, []);

  // Filter posts when selected tags change
  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => 
        selectedTags.some(tag => post.tags.includes(tag))
      );
      setFilteredPosts(filtered);
    }
  }, [selectedTags, posts]);

  // Extract all unique tags from posts
  const allTags = [...new Set(posts.flatMap(post => post.tags))];

  // Handle tag selection
  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-300 to-blue-500 text-transparent bg-clip-text">
          Tech Blog
        </h1>
        
        <TagFilter 
          tags={allTags} 
          selectedTags={selectedTags} 
          onToggleTag={handleTagToggle} 
        />
        
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400">No posts found with the selected tags.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {filteredPosts.map(post => (
              <div 
                key={post.slug} 
                className="bg-neutral-900 rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-cyan-500/20 group"
              >
                <Link to={`/blog/${post.slug}`} className="block h-full">
                  <div className="relative h-52 overflow-hidden">
                    <img 
                      src={post.hero || '/blog_img/default.jpg'} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-sm text-white line-clamp-3">
                        {post.excerpt || "Click to read this interesting article about tech news and innovations."}
                      </p>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 3).map(tag => (
                        <span 
                          key={tag} 
                          className="bg-neutral-800 text-cyan-300 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="text-xs text-neutral-500">+{post.tags.length - 3} more</span>
                      )}
                    </div>
                    <h2 className="text-xl font-semibold mb-2 text-white group-hover:text-cyan-300 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-neutral-400 text-sm">{post.date}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog; 