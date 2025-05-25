import { EXPERIENCES } from "../constants"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { XMarkIcon } from '@heroicons/react/24/outline'

const Experience = () => {
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
    <div className="pb-4 relative">
      <motion.h2 
        whileInView={{opacity: 1, y: 0}}
        initial={{opacity: 0, y: -100}}
        transition={{duration: 0.5}} 
        className="my-20 text-center text-4xl">Experience</motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {EXPERIENCES.map((experience, idx) => (
          <motion.div 
            key={idx}
            ref={el => tileRefs.current[idx] = el}
            whileInView={{opacity: 1, y: 0}}
            initial={{opacity: 0, y: 50}}
            transition={{duration: 0.5, delay: idx * 0.1}}
            className={`bg-neutral-900 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 
              hover:scale-105 hover:shadow-purple-500/20 group cursor-pointer relative`}
            onClick={() => toggleExpand(idx)}
          >
            <div className="relative h-52 overflow-hidden">
              <div className="absolute top-0 right-0 bg-neutral-800/80 backdrop-blur-sm px-3 py-1 m-2 rounded-full text-sm text-neutral-300 z-10">
                {experience.year}
              </div>
              <div className="flex items-center justify-center h-full bg-gradient-to-br from-neutral-950 to-purple-950/20">
                <img 
                  src={experience.image} 
                  alt={experience.company}
                  className="h-28 w-28 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-lg"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-sm text-white line-clamp-3">
                  {experience.description[0]}
                </p>
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-1 text-white group-hover:text-purple-300 transition-colors">
                {experience.role}
              </h3>
              <p className="text-sm text-neutral-400 mb-3">{experience.company}</p>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {experience.technologies.map((tech, techIdx) => (
                  <span 
                    key={techIdx} 
                    className="bg-neutral-800 text-purple-400 text-xs px-2 py-1 rounded-full"
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
              className="fixed inset-5 m-auto h-auto max-h-[90vh] w-[95%] max-w-4xl overflow-y-auto bg-gradient-to-br from-neutral-950 to-purple-950/20 rounded-xl shadow-2xl shadow-purple-500/30 z-50"
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
                      src={EXPERIENCES[expandedId].image} 
                      alt={EXPERIENCES[expandedId].company}
                      className="w-full max-w-[160px] h-auto object-contain drop-shadow-lg"
                    />
                  </div>
                  <h3 className="text-3xl font-bold text-purple-300 mb-2">
                    {EXPERIENCES[expandedId].role}
                  </h3>
                  <p className="text-lg text-neutral-300 mb-4">
                    {EXPERIENCES[expandedId].company}
                  </p>
                  <p className="text-sm text-neutral-400 font-medium">
                    {EXPERIENCES[expandedId].year}
                  </p>
                </div>

                {/* Content Section */}
                <div className="max-w-4xl mx-auto">
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-purple-300 mb-4 text-center">Experience Details</h3>
                    <ul className="space-y-4 text-neutral-300">
                      {EXPERIENCES[expandedId].description.map((point, index) => (
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
                      {EXPERIENCES[expandedId].technologies.map((tech, techIdx) => (
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Experience;
