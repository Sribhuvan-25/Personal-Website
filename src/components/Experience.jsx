import { useExperiences } from "../hooks/useContent"
import contentService from "../services/contentService"
import { useState, useEffect, useRef } from "react"

const Experience = ({ isDarkMode }) => {
  const { data: experiences, isLoading, error } = useExperiences();
  const [expandedId, setExpandedId] = useState(null);
  const tileRefs = useRef({});
  const modalRef = useRef(null);

  const toggleExpand = (idx) => {
    setExpandedId(expandedId === idx ? null : idx);
    // When expanding a tile, prevent body scroll
    if (expandedId === null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // Handle click outside to close expanded tile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (expandedId !== null && 
          modalRef.current && 
          !modalRef.current.contains(event.target)) {
        setExpandedId(null);
        document.body.style.overflow = 'auto';
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [expandedId]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="pb-4 relative">
        <h2 className="my-20 text-center text-4xl">Experience</h2>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading experiences...</div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="pb-4 relative">
        <h2 className="my-20 text-center text-4xl">Experience</h2>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-500">Error loading experiences</div>
        </div>
      </div>
    );
  }

  // Show empty state
  if (!experiences || experiences.length === 0) {
    return (
      <div className="pb-4 relative">
        <h2 className="my-20 text-center text-4xl">Experience</h2>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">No experiences found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-4 relative">
      <h2 className="my-20 text-center text-4xl">Experience</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {experiences.map((experience, idx) => (
          <div 
            key={idx}
            ref={el => tileRefs.current[idx] = el}
            className={`${
              isDarkMode ? 'bg-neutral-900' : 'bg-gradient-to-br from-white via-gray-50 to-purple-50/30 backdrop-blur-sm'
            } rounded-xl overflow-hidden shadow-lg transition-all duration-300 
              hover:shadow-purple-500/20 group cursor-pointer relative`}
            onClick={() => toggleExpand(idx)}
          >
            <div className="relative h-52 overflow-hidden">
              <div className={`absolute top-0 right-0 backdrop-blur-sm px-3 py-1 m-2 rounded-full text-sm z-10 ${
                isDarkMode ? 'bg-neutral-800/80 text-neutral-300' : 'bg-white/80 text-gray-700'
              }`}>
                {experience.year}
              </div>
              <div className={`flex items-center justify-center h-full ${
                isDarkMode ? 'bg-gradient-to-br from-neutral-950 to-purple-950/20' : 'bg-gradient-to-br from-gray-50 to-purple-100/30'
              }`}>
                <img 
                  src={contentService.getImageUrl(experience.image)} 
                  alt={experience.company}
                  className="h-28 w-28 object-contain drop-shadow-lg"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-sm text-white line-clamp-3">
                  {experience.description[0]}
                </p>
              </div>
            </div>
            
            <div className="p-5">
              <h3 className={`text-xl font-semibold mb-1 transition-colors ${
                isDarkMode ? 'text-white group-hover:text-purple-300' : 'text-gray-900 group-hover:text-purple-600'
              }`}>
                {experience.role}
              </h3>
              <p className={`text-sm mb-3 ${
                isDarkMode ? 'text-neutral-400' : 'text-gray-600'
              }`}>{experience.company}</p>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {experience.technologies.map((tech, techIdx) => (
                  <span 
                    key={techIdx} 
                    className={`text-xs px-2 py-1 rounded-full ${
                      isDarkMode ? 'bg-neutral-800 text-purple-400' : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Overlay */}
      {expandedId !== null && (
        <>
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            onClick={() => {
              setExpandedId(null);
              document.body.style.overflow = 'auto';
            }}
          />
          
          <div
            ref={modalRef}
            className="fixed inset-5 m-auto h-auto max-h-[90vh] w-[95%] max-w-4xl overflow-y-auto bg-gradient-to-br from-neutral-950 to-purple-950/20 rounded-xl shadow-2xl shadow-purple-500/30 z-50"
          >
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setExpandedId(null);
                document.body.style.overflow = 'auto';
              }}
              className="absolute top-4 right-4 z-50 bg-neutral-800/80 backdrop-blur-sm rounded-full p-2 hover:bg-neutral-700 transition-colors flex items-center justify-center w-8 h-8"
            >
              <span className="text-white text-lg font-bold">×</span>
            </button>

            <div className="p-8">
              {/* Header Section */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <img 
                    src={contentService.getImageUrl(experiences[expandedId].image)} 
                    alt={experiences[expandedId].company}
                    className="w-full max-w-[160px] h-auto object-contain drop-shadow-lg"
                  />
                </div>
                <h3 className="text-3xl font-bold text-purple-300 mb-2">
                  {experiences[expandedId].role}
                </h3>
                <p className="text-lg text-neutral-300 mb-4">
                  {experiences[expandedId].company}
                </p>
                <p className="text-sm text-neutral-400 font-medium">
                  {experiences[expandedId].year}
                </p>
              </div>

              {/* Content Section */}
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-purple-300 mb-4 text-center">Experience Details</h3>
                  <ul className="space-y-4 text-neutral-300">
                    {experiences[expandedId].description.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block h-2 w-2 mt-2 mr-3 rounded-full bg-purple-400 flex-shrink-0"></span>
                        <span className="text-base leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Technologies Section */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-purple-300 mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {experiences[expandedId].technologies.map((tech, techIdx) => (
                      <span 
                        key={techIdx} 
                        className="bg-neutral-800/80 backdrop-blur-sm text-purple-400 text-sm px-4 py-2 rounded-full border border-purple-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Experience;
