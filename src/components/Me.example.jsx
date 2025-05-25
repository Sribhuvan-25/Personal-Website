import React, { useState, useEffect } from 'react';
import contentService from '../services/contentService';

const Me = () => {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPersonalInfo = async () => {
      try {
        setLoading(true);
        const data = await contentService.getPersonalInfo();
        setPersonalInfo(data);
      } catch (err) {
        setError('Failed to load personal information');
        console.error('Error loading personal info:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPersonalInfo();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-slate-600">Loading...</div>
      </div>
    );
  }

  if (error || !personalInfo) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-600">Error loading content</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Image */}
        <div className="mb-8">
          <img
            src={contentService.getImageUrl(personalInfo.image)}
            alt={personalInfo.name}
            className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
            onError={(e) => {
              e.target.src = '/default-avatar.jpg'; // Fallback image
            }}
          />
        </div>

        {/* Name and Position */}
        <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4">
          {personalInfo.name}
        </h1>
        
        <h2 className="text-xl md:text-2xl text-slate-600 mb-8">
          {personalInfo.position}
        </h2>

        {/* Description */}
        <div className="space-y-4 text-slate-700 max-w-3xl mx-auto">
          {personalInfo.description.map((paragraph, index) => (
            <p key={index} className="text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Contact Information */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="text-slate-600">{personalInfo.location}</span>
          <span className="hidden sm:block text-slate-400">•</span>
          <a 
            href={`mailto:${personalInfo.email}`}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            {personalInfo.email}
          </a>
        </div>

        {/* Social Links */}
        <div className="mt-6 flex justify-center gap-6">
          {personalInfo.social.github && (
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-800 transition-colors"
            >
              GitHub
            </a>
          )}
          {personalInfo.social.linkedin && (
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-800 transition-colors"
            >
              LinkedIn
            </a>
          )}
          {personalInfo.social.twitter && (
            <a
              href={personalInfo.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-800 transition-colors"
            >
              Twitter
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Me; 