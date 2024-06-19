import profile from "../assets/profile.jpg";
import { motion } from "framer-motion";

const container = (delay) => ({
  hidden: {x: -100, opacity: 0},
  visible: {
    x:0,
    opacity: 1,
    transition: { duration: 0.5, delay: delay},
  },

})

const Me = () => {
  return (
    <div className="border-b border-neutral-900 pd-4 lg:mb-35">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start">
            <motion.h1 
            variants={container(0)}
            initial="hidden"
            animate="visible"
            className="pb-16 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl">
              Sribhuvan Yellu
            </motion.h1>
            <motion.span 
            variants={container(0.2)}
            initial="hidden"
            animate="visible"
            className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 
            bg-clip-text text-4xl tracking-tight text-transparent"> 
              Developer
            </motion.span>
            <motion.p 
            variants={container(0.4)}
            initial="hidden"
            animate="visible"
            className="my-2 max-w-xl py-6 font-light tracking-tighter">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas facilis eum similique ad dolore. 
              Nam, distinctio quia obcaecati explicabo perspiciatis accusamus, omnis suscipit dolorem ut atque libero nemo earum fugiat.
            </motion.p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:p-8">
          <div className="flex justify-center">
            <motion.img
            className="rounded-2xl"
            initial={{x: 100, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            transition={{duration: 1, delay: 0.8}}
            src={profile} 
            alt="Sirbhuvan"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Me
