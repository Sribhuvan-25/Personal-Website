import { RiReactjsLine } from "react-icons/ri"
import { TbBrandNextjs } from "react-icons/tb"
import { SiMongodb } from "react-icons/si"
import { FaNodeJs } from "react-icons/fa"
import { inView, motion } from "framer-motion"
import { FaPython } from "react-icons/fa";
import { SiTensorflow } from "react-icons/si";
import { SiPytorch } from "react-icons/si";
import { GrGraphQl } from "react-icons/gr";
import { FaAngular } from "react-icons/fa";
import { SiSpringboot } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";

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

const TechStack = () => {
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
           <motion.div 
        variants={iconAnimaiton(2.5)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 borer-neutral-800 p-4">
            <SiTypescript className="text-7xl text-blue-400"/>
        </motion.div>
        <motion.div 
        variants={iconAnimaiton(2.5)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 borer-neutral-800 p-4">
            <RiReactjsLine className="text-7xl text-cyan-400"/>
        </motion.div>
        <motion.div 
        variants={iconAnimaiton(2.0)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 borer-neutral-800 p-4">
            <SiMongodb className="text-7xl text-green-500"/>
        </motion.div>
        <motion.div 
        variants={iconAnimaiton(1.5)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 borer-neutral-800 p-4">
            <TbBrandNextjs className="text-7xl"/>
        </motion.div>
        <motion.div 
        variants={iconAnimaiton(0.5)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 borer-neutral-800 p-4">
            <FaNodeJs className="text-7xl text-green-500"/>
        </motion.div>
        <motion.div 
        variants={iconAnimaiton(1.5)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 borer-neutral-800 p-4">
            <FaPython className="text-7xl text-green-500"/>
        </motion.div>
        <motion.div 
        variants={iconAnimaiton(2)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 borer-neutral-800 p-4">
            <SiTensorflow  className="text-7xl text-orange-500"/>
        </motion.div>
        <motion.div 
        variants={iconAnimaiton(0.5)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 borer-neutral-800 p-4">
            <SiPytorch  className="text-7xl text-orange-400"/>
        </motion.div>
        <motion.div 
        variants={iconAnimaiton(2)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 borer-neutral-800 p-4">
            <GrGraphQl  className="text-7xl text-purple-600"/>
        </motion.div>
        <motion.div 
        variants={iconAnimaiton(1.5)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 borer-neutral-800 p-4">
            <FaAngular  className="text-7xl text-red-600"/>
        </motion.div>
        <motion.div 
        variants={iconAnimaiton(3)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 borer-neutral-800 p-4">
            <SiSpringboot  className="text-7xl text-green-500"/>
        </motion.div>
        <motion.div 
        variants={iconAnimaiton(2.5)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 borer-neutral-800 p-4">
            <FaJava  className="text-7xl text-red-600"/>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default TechStack
