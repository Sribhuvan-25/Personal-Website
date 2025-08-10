import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import frontmatter from 'front-matter';

function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the markdown file
    fetch(`/content/posts/${slug}.md`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Post not found');
        }
        return response.text();
      })
      .then(text => {
        // Parse frontmatter
        const parsed = frontmatter(text);
        setPost({
          content: parsed.body,
          ...parsed.attributes
        });
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error loading post:', err);
        setError(err.message);
        setIsLoading(false);
      });
  }, [slug]);

  if (isLoading) {
    return <div className="container mx-auto p-4">Loading post...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-red-500">{error}</p>
        <Link to="/blog" className="text-blue-600 hover:underline mt-4 inline-block">
          ← Back to all posts
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Link to="/blog" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to all posts
      </Link>
      
      <article>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <span 
              key={tag} 
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <p className="text-gray-500 mb-6">{post.date}</p>
        
        {post.hero && (
          <div className="mb-6">
            <img 
              src={post.hero} 
              alt={post.title} 
              className="w-full h-auto rounded-lg"
            />
            {post.image_credit && (
              <p className="text-sm text-gray-500 mt-1">
                Photo by {post.image_credit}
                {post.image_link && (
                  <a 
                    href={post.image_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ml-1 text-blue-600 hover:underline"
                  >
                    on Unsplash
                  </a>
                )}
              </p>
            )}
          </div>
        )}
        
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}

export default Post; 