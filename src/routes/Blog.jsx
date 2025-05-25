import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TagFilter from '../components/TagFilter';

function Blog({ isDarkMode }) {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

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
    <div className="min-h-screen pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-4 mb-8">
          <Link 
            to="/" 
            className={`text-sm hover:underline ${
              isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            ← Back to Home
          </Link>
        </div>
        
        <h2 className={`my-20 text-center text-4xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Tech Blog
        </h2>
        
        <TagFilter 
          tags={allTags} 
          selectedTags={selectedTags} 
          onToggleTag={handleTagToggle}
          isDarkMode={isDarkMode}
        />
        
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className={`text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No posts found with the selected tags.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {filteredPosts.map((post, index) => (
              <div 
                key={post.slug} 
                className={`relative rounded-lg p-6 cursor-pointer transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-neutral-900/60 backdrop-blur-sm hover:bg-neutral-800/70' 
                    : 'bg-gradient-to-br from-white via-gray-50 to-orange-50/30 backdrop-blur-sm hover:shadow-lg'
                }`}
                onClick={() => setSelectedPost(post)}
              >
                {/* Year Badge */}
                <div className={`absolute top-4 right-4 px-2 py-1 rounded text-xs font-medium ${
                  isDarkMode ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-700'
                }`}>
                  {new Date(post.date).getFullYear()}
                </div>

                {/* Blog Image */}
                <div className="w-full h-36 mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={post.hero || '/blog_img/default.jpg'} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className={`text-xl font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {post.title}
                  </h3>
                  
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {post.excerpt || "Click to read this interesting article about tech news and innovations."}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map(tag => (
                      <span 
                        key={tag} 
                        className={`text-xs px-2 py-1 rounded ${
                          isDarkMode 
                            ? 'bg-orange-500/20 text-orange-300' 
                            : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        +{post.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  <p className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {post.date}
                  </p>
                </div>

                {/* Hover Overlay */}
                <div className={`absolute inset-0 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 ${
                  isDarkMode 
                    ? 'bg-black/50 backdrop-blur-sm' 
                    : 'bg-white/70 backdrop-blur-sm'
                }`}>
                  <span className={`text-sm font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Click to read article
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for blog post details */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className={`max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-lg p-6 ${
              isDarkMode ? 'bg-neutral-900' : 'bg-white'
            }`}>
              <div className="flex justify-between items-start mb-4">
                <h3 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {selectedPost.title}
                </h3>
                <button
                  onClick={() => setSelectedPost(null)}
                  className={`text-2xl font-bold ${
                    isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  ×
                </button>
              </div>
              
              <div className="mb-4">
                <img 
                  src={selectedPost.hero || '/blog_img/default.jpg'} 
                  alt={selectedPost.title} 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              <div className="space-y-4">
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {selectedPost.date}
                </p>

                <div className="flex flex-wrap gap-2">
                  {selectedPost.tags.map(tag => (
                    <span 
                      key={tag} 
                      className={`text-xs px-2 py-1 rounded ${
                        isDarkMode 
                          ? 'bg-orange-500/20 text-orange-300' 
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className={`${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {selectedPost.excerpt || "This is an interesting article about tech news and innovations. Click the link below to read the full article."}
                </p>

                <div className="pt-4">
                  <Link
                    to={`/blog/${selectedPost.slug}`}
                    className={`inline-block px-4 py-2 rounded transition-colors ${
                      isDarkMode 
                        ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                        : 'bg-orange-600 hover:bg-orange-700 text-white'
                    }`}
                  >
                    Read Full Article
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog; 