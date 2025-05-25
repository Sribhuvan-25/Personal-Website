import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import contentService from "../services/contentService";
import profilePic from "../assets/profile.jpg";

const Me = () => {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPersonalInfo = async () => {
      try {
        const data = await contentService.getPersonalInfo();
        setPersonalInfo(data);
      } catch (error) {
        console.error('Error loading personal info:', error);
        // Fallback to default data
        setPersonalInfo({
          name: "Sribhuvan Reddy Yellu",
          position: "Developer",
          intro: "Welcome to my personal website! Here, you'll discover the highlights of my professional journey, encompassing my diverse work experience, impactful research, and personal passions."
        });
      } finally {
        setLoading(false);
      }
    };

    loadPersonalInfo();
  }, []);

  if (loading) {
    return (
      <div className="pb-4 lg:mb-35">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="animate-pulse text-slate-600">Loading...</div>
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
            {personalInfo?.position || "Developer"}
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
              src={personalInfo?.image ? contentService.getImageUrl(personalInfo.image) : profilePic}
              alt={personalInfo?.name || "Sribhuvan Reddy Yellu"}
              onError={(e) => {
                e.target.src = profilePic; // Fallback to local image
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Me
