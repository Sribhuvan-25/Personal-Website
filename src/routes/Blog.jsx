import React from 'react';
import { Link } from 'react-router-dom';

function Blog() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 to-blue-500 text-transparent bg-clip-text mb-4">
            Tech Blog
          </h1>
          <div className="flex justify-start">
            <Link 
              to="/" 
              className="text-neutral-300 hover:text-cyan-300 transition-colors flex items-center gap-2"
            >
              <span>←</span>
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Home</span>
            </Link>
          </div>
        </div>
        
        <div className="text-center py-20">
          <div className="mb-8">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-3xl font-bold mb-4 text-white">
              Coming Soon
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              I'm working on some exciting blog posts about artificial intelligence, machine learning, and data science. 
              Check back soon for insightful articles and tutorials!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="bg-neutral-900 rounded-lg p-6 max-w-sm">
              <h3 className="text-lg font-semibold mb-2 text-cyan-300">Machine Learning</h3>
              <p className="text-gray-400 text-sm">Deep learning, neural networks, and ML algorithms</p>
            </div>
            <div className="bg-neutral-900 rounded-lg p-6 max-w-sm">
              <h3 className="text-lg font-semibold mb-2 text-cyan-300">AI Applications</h3>
              <p className="text-gray-400 text-sm">Real-world AI implementations and use cases</p>
            </div>
            <div className="bg-neutral-900 rounded-lg p-6 max-w-sm">
              <h3 className="text-lg font-semibold mb-2 text-cyan-300">Data Science</h3>
              <p className="text-gray-400 text-sm">Data analysis, visualization, and statistical modeling</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog; 