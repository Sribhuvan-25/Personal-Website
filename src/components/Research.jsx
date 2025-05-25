import { RESEARCH } from "../constants"
import { useState, useEffect, useRef } from "react"

const Research = () => {
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
      <h2 className="my-20 text-center text-4xl">Research Experience</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {RESEARCH.map((research, idx) => (
          <div 
            key={idx}
            ref={el => tileRefs.current[idx] = el}
            className={`bg-neutral-900 rounded-xl overflow-hidden shadow-lg transition-all duration-300 
              hover:shadow-teal-500/20 group cursor-pointer relative`}
            onClick={() => toggleExpand(idx)}
          >
            <div className="relative h-52 overflow-hidden">
              <div className="absolute top-0 right-0 bg-neutral-800/80 backdrop-blur-sm px-3 py-1 m-2 rounded-full text-sm text-neutral-300 z-10">
                {research.year}
              </div>
              <div className="flex items-center justify-center h-full bg-gradient-to-br from-neutral-950 to-teal-950/20">
                <img 
                  src={research.image} 
                  alt={research.company}
                  className="h-28 w-28 object-contain drop-shadow-lg"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-sm text-white line-clamp-3">
                  {research.description && research.description.length > 0 ? research.description[0] : "Click to view details"}
                </p>
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-1 text-white group-hover:text-teal-300 transition-colors">
                {research.role}
              </h3>
              <p className="text-sm text-neutral-400 mb-3">{research.company}</p>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {research.technologies.map((tech, techIdx) => (
                  <span 
                    key={techIdx} 
                    className="bg-neutral-800 text-teal-400 text-xs px-2 py-1 rounded-full"
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
            className="fixed inset-5 m-auto h-auto max-h-[90vh] w-[95%] max-w-4xl overflow-y-auto bg-gradient-to-br from-neutral-950 to-teal-950/20 rounded-xl shadow-2xl shadow-teal-500/30 z-50"
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
                    src={RESEARCH[expandedId].image} 
                    alt={RESEARCH[expandedId].company}
                    className="w-full max-w-[160px] h-auto object-contain drop-shadow-lg"
                  />
                </div>
                <h3 className="text-3xl font-bold text-teal-300 mb-2">
                  {RESEARCH[expandedId].role}
                </h3>
                <p className="text-lg text-neutral-300 mb-4">
                  {RESEARCH[expandedId].company}
                </p>
                <p className="text-sm text-neutral-400 font-medium">
                  {RESEARCH[expandedId].year}
                </p>
              </div>

              {/* Content Section */}
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-teal-300 mb-4 text-center">Research Details</h3>
                  {RESEARCH[expandedId].description && RESEARCH[expandedId].description.length > 0 ? (
                    <ul className="space-y-4 text-neutral-300">
                      {RESEARCH[expandedId].description.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block h-2 w-2 mt-2 mr-3 rounded-full bg-teal-400 flex-shrink-0"></span>
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
                  <h3 className="text-xl font-semibold text-teal-300 mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {RESEARCH[expandedId].technologies.map((tech, techIdx) => (
                      <span 
                        key={techIdx} 
                        className="bg-neutral-800/80 backdrop-blur-sm text-teal-400 text-sm px-4 py-2 rounded-full border border-teal-500/20"
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

export default Research;
