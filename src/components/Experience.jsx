import { EXPERIENCES } from "../constants"
import { motion } from "framer-motion"

const Experience = () => {
  return (
    <div className="border-b border-neutral-900 pb-4">
        <motion.h2
        whileInView={{opacity: 1, y: 0}}
        initial={{opacity: 0, y: -100}}
        transition={{duration: 1.5}}  
        className="my-20 text-center text-4xl">
            Experience
        </motion.h2>
      <div>
        {EXPERIENCES.map((exp, idx) => (
            <div 
                key={idx} 
                className="mb-8 flex flex-wrap lg:justify-center">
                <motion.div 
                whileInView={{opacity: 1, x: 0}}
                initial={{opacity: 0, x: -100}}
                transition={{duration: 1.5}} 
                className="w-full lg:w-1/4">
                <p className="mb-2 text-sm text-neutral-400">{exp.year}</p>   
                <img 
                src={exp.image} 
                width={200} 
                height={200}
                alt={exp.company}
                className="mb-6 rounded object-cover"
                style={{ width: '120px', height: '120px' }}
                />

                </motion.div>
                <motion.div 
                whileInView={{opacity: 1, x: 0}}
                initial={{opacity: 0, x: 100}}
                transition={{duration: 1}} 
                className="w-full max-w-xl lg:w-3/4">
                    <h6 className="mb-2 font-semibold">
                        {exp.role} - <span className="text-sm text-purple-100">{exp.company}</span>
                    </h6>
                    {/* Render description as bullet points */}
                    <ul className="mb-4 text-neutral-400 list-disc list-inside">
                      {exp.description.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                    {exp.technologies.map((technology, idx) => (
                        <span key={idx} className="mr-2 mt-4 rounded bg-neutral-900 
                        px-2 py-1 text-sm font-medium text-pink-500">
                            {technology}
                        </span>
                    ))}
                </motion.div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Experience;
