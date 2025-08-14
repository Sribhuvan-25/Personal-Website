import { motion } from "framer-motion";
import { usePersonalInfo, useImageUrl } from "../hooks/useContent";

const Me = () => {
  const { data: personalInfo, isLoading, error } = usePersonalInfo();
  const profileImageUrl = useImageUrl(personalInfo?.profileImage);

  // Show loading state
  if (isLoading) {
    return (
      <div className="pb-4 lg:mb-35">
        <div className="flex flex-col items-center">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="pb-4 lg:mb-35">
        <div className="flex flex-col items-center">
          <div className="text-lg text-red-500">Error loading content</div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-4 lg:mb-35">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="pb-16 text-4xl font-thin tracking-tight lg:mt-16 lg:text-6xl"
          >
            {personalInfo?.name || "Sribhuvan Reddy Yellu"}
          </motion.h1>
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-3xl tracking-tight text-transparent"
          >
            {personalInfo?.title || "Developer"}
          </motion.span>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
            className="my-2 max-w-xl py-6 font-light tracking-tighter text-center"
          >
            {personalInfo?.intro || "Welcome to my personal website!"}
          </motion.p>
        </div>
        <div className="w-full flex justify-center lg:w-1/2 lg:p-8">
          <div className="flex justify-center">
            <motion.img 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
              className="rounded-2xl w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover" 
              src={profileImageUrl || "https://via.placeholder.com/384x384?text=Profile"} 
              alt={personalInfo?.name || "Sribhuvan Reddy Yellu"} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Me
