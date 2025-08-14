import { motion } from "framer-motion"
import { usePersonalInfo } from "../hooks/useContent"

const About = () => {
  const { data: personalInfo, isLoading, error } = usePersonalInfo();

  // Show loading state
  if (isLoading) {
    return (
      <div className="border-b border-neutral-900 pb-4">
        <h2 className="my-20 text-center text-4xl">
          About{" "}
          <span className="text-neutral-500">Me</span>
        </h2>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="border-b border-neutral-900 pb-4">
        <h2 className="my-20 text-center text-4xl">
          About{" "}
          <span className="text-neutral-500">Me</span>
        </h2>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-500">Error loading content</div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-neutral-900 pb-4">
        <h2 className="my-20 text-center text-4xl">
        About{" "}
        <span className="text-neutral-500">Me</span>
        </h2>
        <div className="flex flex-wrap">
            <motion.div 
            whileInView={{opacity: 1, x:0}}
            initial={{opacity: 0, x:-100}}
            transition={{duration: 0.5}}
            className="w-full lg:w-1/2 lg:p-8">
                <div className="flex items-center justify-center">
                    <img 
                        className="rounded-2xl" 
                        src={personalInfo?.aboutImage || "https://via.placeholder.com/400x300?text=About+Me"} 
                        alt="About Me" 
                    />
                </div>
            </motion.div>
            <motion.div 
            whileInView={{opacity: 1, x:0}}
            initial={{opacity: 0, x:100}}
            transition={{duration: 0.75}}
            className="w-full lg:w-1/2">
                    <div className="flex justify-center lg:justify-start">
                        <p className="my-2 max-w-xl py-6">
                            {personalInfo?.about || "About me content not available."}
                        </p>
                    </div>
            </motion.div>
        </div>
    </div>
  )
}

export default About
