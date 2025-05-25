import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function Post({ isDarkMode }) {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the specific post from index.json
    fetch('/content/index.json')
      .then(response => response.json())
      .then(data => {
        const foundPost = data.find(p => p.slug === slug);
        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('Post not found');
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading blog post:', error);
        setError('Error loading post');
        setIsLoading(false);
      });
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className={`animate-pulse text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Loading post...
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Post Not Found
          </h1>
          <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            The blog post you're looking for doesn't exist.
          </p>
          <Link 
            to="/blog" 
            className={`inline-block px-6 py-3 rounded-lg transition-colors ${
              isDarkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="pt-4 mb-8 flex items-center justify-between">
          <Link 
            to="/blog" 
            className={`text-sm hover:underline ${
              isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            ← Back to Blog
          </Link>
          <Link 
            to="/" 
            className={`text-sm hover:underline ${
              isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Home
          </Link>
        </div>

        {/* Article Header */}
        <article className={`rounded-lg p-8 ${
          isDarkMode 
            ? 'bg-neutral-900/60 backdrop-blur-sm' 
            : 'bg-white/80 backdrop-blur-sm shadow-lg'
        }`}>
          <header className="mb-8">
            <h1 className={`text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <time className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span className={`text-sm ${
                isDarkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                •
              </span>
              <span className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                5 min read
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map(tag => (
                <span 
                  key={tag} 
                  className={`text-xs px-3 py-1 rounded-full ${
                    isDarkMode 
                      ? 'bg-blue-500/20 text-blue-300' 
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Hero Image */}
          <div className="mb-8">
            <img 
              src={post.hero || '/blog_img/default.jpg'} 
              alt={post.title} 
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>

          {/* Article Content */}
          <div className={`prose prose-lg max-w-none ${
            isDarkMode ? 'prose-invert' : ''
          }`}>
            <p className={`text-lg leading-relaxed mb-6 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {post.excerpt}
            </p>

            {/* Sample content - In a real implementation, you'd fetch this from a separate content file */}
            <div className={`space-y-6 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <p>
                This is where the full blog post content would appear. In a complete implementation, 
                you would store the full article content in separate markdown files or a content management system.
              </p>

              <h2 className={`text-2xl font-semibold mt-8 mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Key Highlights
              </h2>

              <ul className="list-disc list-inside space-y-2">
                <li>Modern development practices and frameworks</li>
                <li>Performance optimization techniques</li>
                <li>Best practices for scalable applications</li>
                <li>Future trends in web development</li>
              </ul>

              <h2 className={`text-2xl font-semibold mt-8 mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Conclusion
              </h2>

              <p>
                This article provides insights into the latest developments in the tech industry. 
                For the complete implementation, you would integrate with a content management system 
                or markdown files to display the full article content.
              </p>
            </div>
          </div>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <Link 
                to="/blog" 
                className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                ← Back to All Posts
              </Link>
              
              <div className="text-sm text-gray-500">
                Share this article
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}

export default Post; 