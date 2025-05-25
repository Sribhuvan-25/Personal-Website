import { useState, useEffect } from "react"
import { RiReactjsLine } from "react-icons/ri"
import { TbBrandNextjs } from "react-icons/tb"
import { SiMongodb } from "react-icons/si"
import { FaNodeJs } from "react-icons/fa"
import { motion } from "framer-motion"
import { FaPython } from "react-icons/fa";
import { SiTensorflow } from "react-icons/si";
import { SiPytorch } from "react-icons/si";
import { GrGraphQl } from "react-icons/gr";
import { FaAngular } from "react-icons/fa";
import { SiSpringboot } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { SiJavascript } from "react-icons/si";
import { SiPostgresql } from "react-icons/si";
import { SiAzuredevops } from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { SiDocker } from "react-icons/si";
import { FaGitAlt } from "react-icons/fa";
import contentService from '../services/contentService.js'

// Icon mapping for technologies
const iconMap = {
  // Languages
  'JavaScript': { icon: SiJavascript, color: 'text-yellow-400' },
  'TypeScript': { icon: SiTypescript, color: 'text-blue-400' },
  'Python': { icon: FaPython, color: 'text-green-500' },
  'Java': { icon: FaJava, color: 'text-red-600' },
  
  // Frontend
  'React': { icon: RiReactjsLine, color: 'text-cyan-400' },
  'Angular': { icon: FaAngular, color: 'text-red-600' },
  'Next.js': { icon: TbBrandNextjs, color: 'text-white' },
  
  // Backend
  'Node.js': { icon: FaNodeJs, color: 'text-green-500' },
  'Spring Boot': { icon: SiSpringboot, color: 'text-green-500' },
  'GraphQL': { icon: GrGraphQl, color: 'text-purple-600' },
  
  // AI/ML
  'TensorFlow': { icon: SiTensorflow, color: 'text-orange-500' },
  'PyTorch': { icon: SiPytorch, color: 'text-orange-400' },
  
  // Databases
  'MongoDB': { icon: SiMongodb, color: 'text-green-500' },
  'PostgreSQL': { icon: SiPostgresql, color: 'text-blue-600' },
  
  // Cloud & DevOps
  'Azure': { icon: SiAzuredevops, color: 'text-blue-500' },
  'AWS': { icon: FaAws, color: 'text-orange-400' },
  'Docker': { icon: SiDocker, color: 'text-blue-400' },
  
  // Tools
  'Git': { icon: FaGitAlt, color: 'text-orange-500' },
  
  // Fallback for unknown technologies
  'default': { icon: RiReactjsLine, color: 'text-gray-400' }
};

const iconAnimaiton = (duration) => ({
    initial: { y: -10 },
    animate: {
        y: [10, -10],
        transition: {
            duration: duration,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
        }
    }
})

const TechStack = ({ isDarkMode }) => {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch technologies data
  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        setLoading(true);
        const data = await contentService.getTechnologies();
        
        // Extract technologies from categorized structure
        const allTechs = [];
        if (Array.isArray(data)) {
          data.forEach(category => {
            if (category.items && Array.isArray(category.items)) {
              allTechs.push(...category.items);
            }
          });
        }
        
        // Filter to only show technologies that have icons
        const techsWithIcons = allTechs.filter(tech => iconMap[tech]);
        
        setTechnologies(techsWithIcons);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch technologies data:', err);
        setError(err.message);
        setTechnologies([]); // Fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchTechnologies();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="pb-24">
        <motion.h2
          whileInView={{opacity: 1, y: 0}}
          initial={{opacity: 0, y: -100}}
          transition={{duration: 1.5}} 
          className="my-20 text-center text-4xl">
          Technologies
        </motion.h2>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="pb-24">
        <motion.h2
          whileInView={{opacity: 1, y: 0}}
          initial={{opacity: 0, y: -100}}
          transition={{duration: 1.5}} 
          className="my-20 text-center text-4xl">
          Technologies
        </motion.h2>
        <div className="text-center py-20">
          <p className="text-red-500 mb-2">Failed to load technologies data</p>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!technologies || technologies.length === 0) {
    return (
      <div className="pb-24">
        <motion.h2
          whileInView={{opacity: 1, y: 0}}
          initial={{opacity: 0, y: -100}}
          transition={{duration: 1.5}} 
          className="my-20 text-center text-4xl">
          Technologies
        </motion.h2>
        <div className="text-center py-20">
          <p className="text-gray-500">No technologies data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24">
        <motion.h2
        whileInView={{opacity: 1, y: 0}}
        initial={{opacity: 0, y: -100}}
        transition={{duration: 1.5}} 
        className="my-20 text-center text-4xl">
        Technologies
        </motion.h2>
      <motion.div 
      whileInView={{opacity: 1, x:0}}
      initial={{opacity: 0, x: -100}}
      transition={{duration: 1.5}}
      className="flex flex-wrap items-center justify-center gap-4">
        {technologies.map((tech, index) => {
          const iconConfig = iconMap[tech] || iconMap['default'];
          const IconComponent = iconConfig.icon;
          const animationDuration = 0.5 + (index % 5) * 0.5; // Vary animation duration
          
          return (
            <motion.div 
              key={index}
              variants={iconAnimaiton(animationDuration)}
              initial="initial"
              animate="animate"
              className="rounded-2xl border-4 border-white p-4"
              title={tech}
            >
              <IconComponent className={`text-7xl ${iconConfig.color}`}/>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  )
}

export default TechStack
