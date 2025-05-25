import { PROJECTS } from "../constants"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { XMarkIcon } from '@heroicons/react/24/outline'

const Projects = () => {
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

  const handleGitHubClick = (e, githubUrl) => {
    e.stopPropagation();
    window.open(githubUrl, '_blank');
  };

  return (
    <div className="pb-4 relative">
      <motion.h2 
        whileInView={{opacity: 1, y: 0}}
        initial={{opacity: 0, y: -100}}
        transition={{duration: 0.5}} 
        className="my-20 text-center text-4xl">Projects</motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {PROJECTS.map((project, idx) => (
          <motion.div 
            key={idx}
            ref={el => tileRefs.current[idx] = el}
            whileInView={{opacity: 1, y: 0}}
            initial={{opacity: 0, y: 50}}
            transition={{duration: 0.5, delay: idx * 0.1}}
            className={`bg-neutral-900 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 
              hover:scale-105 hover:shadow-cyan-500/20 group cursor-pointer relative`}
            onClick={() => toggleExpand(idx)}
          >
            <div className="relative h-52 overflow-hidden bg-gradient-to-br from-neutral-950 to-cyan-950/10">
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="h-36 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-lg"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-sm text-white line-clamp-3">
                  {project.description && project.description.length > 0 ? project.description[0] : "Click to view details"}
                </p>
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                {project.github && (
                  <button
                    onClick={(e) => handleGitHubClick(e, project.github)}
                    className="bg-neutral-800 rounded-full p-1.5 hover:bg-neutral-700 transition-colors"
                    title="View on GitHub"
                  >
                    <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {project.technologies.map((tech, techIdx) => (
                  <span 
                    key={techIdx} 
                    className="bg-neutral-800 text-cyan-400 text-xs px-2 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {expandedId !== null && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={() => {
                setExpandedId(null);
                document.body.style.overflow = 'auto';
              }}
            />
            
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-5 m-auto h-auto max-h-[90vh] w-[95%] max-w-4xl overflow-y-auto bg-gradient-to-br from-neutral-950 to-cyan-950/20 rounded-xl shadow-2xl shadow-cyan-500/30 z-50"
            >
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedId(null);
                  document.body.style.overflow = 'auto';
                }}
                className="absolute top-4 right-4 z-50 bg-neutral-800/80 backdrop-blur-sm rounded-full p-1.5 hover:bg-neutral-700 transition-colors"
              >
                <XMarkIcon className="h-6 w-6 text-white" />
              </button>

              <div className="p-8">
                {/* Header Section */}
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-6">
                    <img 
                      src={PROJECTS[expandedId].image} 
                      alt={PROJECTS[expandedId].title}
                      className="w-full max-w-[280px] h-auto object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <h2 className="text-3xl font-bold text-cyan-300">
                      {PROJECTS[expandedId].title}
                    </h2>
                    {PROJECTS[expandedId].github && (
                      <button
                        onClick={(e) => handleGitHubClick(e, PROJECTS[expandedId].github)}
                        className="bg-neutral-800/80 backdrop-blur-sm rounded-full p-2.5 hover:bg-neutral-700 transition-colors"
                        title="View on GitHub"
                      >
                        <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="max-w-4xl mx-auto">
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-cyan-300 mb-4 text-center">Project Details</h3>
                    {PROJECTS[expandedId].description && PROJECTS[expandedId].description.length > 0 ? (
                      <ul className="space-y-4 text-neutral-300">
                        {PROJECTS[expandedId].description.map((point, index) => (
                          <li key={index} className="flex items-start">
                            <span className="inline-block h-2 w-2 mt-2 mr-3 rounded-full bg-cyan-400 flex-shrink-0"></span>
                            <span className="text-base leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-neutral-400 text-center italic">Details coming soon...</p>
                    )}
                  </div>
                  
                  {/* Technologies Section */}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-cyan-300 mb-4">Technologies Used</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                      {PROJECTS[expandedId].technologies.map((tech, techIdx) => (
                        <span 
                          key={techIdx} 
                          className="bg-neutral-800/80 backdrop-blur-sm text-cyan-400 text-sm px-4 py-2 rounded-full border border-cyan-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Projects;
