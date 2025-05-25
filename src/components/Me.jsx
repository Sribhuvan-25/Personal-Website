import profile from "../assets/profile.jpg";
import { motion } from "framer-motion";
import { INTRO_CONTENT} from "../constants";

const container = (delay) => ({
  hidden: {y: -50, opacity: 0},
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: delay},
  },
})

const Me = () => {
  return (
    <div className="pb-20 pt-10">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        <motion.h1 
          variants={container(0)}
          initial="hidden"
          animate="visible"
          className="text-6xl font-thin tracking-tight mb-4">
          Sribhuvan Yellu
        </motion.h1>
        
        <motion.span 
          variants={container(0.2)}
          initial="hidden"
          animate="visible"
          className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 
          bg-clip-text text-4xl tracking-tight text-transparent mb-8"> 
          Developer
        </motion.span>
        
        <motion.p 
          variants={container(0.4)}
          initial="hidden"
          animate="visible"
          className="max-w-3xl font-light tracking-tighter text-lg leading-relaxed mb-12">
          {INTRO_CONTENT}
        </motion.p>
        
        <motion.div
          variants={container(0.6)}
          initial="hidden"
          animate="visible"
          className="flex justify-center">
          <img
            className="rounded-2xl w-80 h-80 object-cover shadow-2xl"
            src={profile} 
            alt="Sribhuvan"
          />
        </motion.div>
      </div>
    </div>
  )
}

export default Me
