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

  return (
    <div className="border-b border-neutral-900 pb-4 relative">
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
            <div className="relative h-52 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-sm text-white line-clamp-3">
                  {project.description[0]}
                </p>
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-cyan-300 transition-colors">
                {project.title}
              </h3>
              
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
              className="fixed inset-5 m-auto h-auto max-h-[90vh] w-[95%] max-w-3xl overflow-y-auto bg-neutral-900 rounded-xl shadow-2xl shadow-cyan-500/30 z-50"
            >
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedId(null);
                  document.body.style.overflow = 'auto';
                }}
                className="absolute top-4 right-4 z-50 bg-neutral-800 rounded-full p-1.5 hover:bg-neutral-700 transition-colors"
              >
                <XMarkIcon className="h-6 w-6 text-white" />
              </button>

              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-2/5 bg-gradient-to-br from-neutral-950 to-cyan-950/20 p-6">
                  <div className="flex justify-center mb-6">
                    <img 
                      src={PROJECTS[expandedId].image} 
                      alt={PROJECTS[expandedId].title}
                      className="w-full max-w-[220px] h-auto object-cover rounded-lg shadow-md"
                    />
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-cyan-300 text-center">
                    {PROJECTS[expandedId].title}
                  </h2>
                </div>
                
                <div className="p-6 lg:w-3/5 overflow-y-auto">
                  <h2 className="text-2xl font-bold mb-4 text-cyan-300 lg:hidden text-center">
                    {PROJECTS[expandedId].title}
                  </h2>
                  
                  <div className="mt-4 mb-6">
                    <ul className="space-y-4 text-neutral-300">
                      {PROJECTS[expandedId].description.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block h-2 w-2 mt-2 mr-3 rounded-full bg-cyan-400 flex-shrink-0"></span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-6 pb-4">
                    {PROJECTS[expandedId].technologies.map((tech, techIdx) => (
                      <span 
                        key={techIdx} 
                        className="bg-neutral-800 text-cyan-400 text-sm px-3 py-1.5 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
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
