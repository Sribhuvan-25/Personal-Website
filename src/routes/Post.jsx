import React from 'react';
import { useParams, Link } from 'react-router-dom';

function Post() {
  const { slug } = useParams();

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/blog" className="text-cyan-400 hover:text-cyan-300 transition-colors mb-8 inline-block">
          ← Back to all posts
        </Link>
        
        <div className="text-center py-20">
          <div className="mb-8">
            <div className="text-6xl mb-4">📝</div>
            <h1 className="text-4xl font-bold mb-4 text-white">
              Blog Post Coming Soon
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The AI/ML blog post "{slug}" is currently being written. 
              Check back soon for this exciting content!
            </p>
          </div>
          
          <div className="bg-neutral-900 rounded-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-300">What to Expect</h2>
            <p className="text-gray-400 mb-4">
              I'm working hard to bring you high-quality, informative content about artificial intelligence and machine learning.
            </p>
            <div className="flex justify-center space-x-4 text-sm text-gray-500">
              <span>🤖 AI tutorials</span>
              <span>🧠 ML algorithms</span>
              <span>📊 Data insights</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post; 