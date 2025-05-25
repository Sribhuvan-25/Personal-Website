import { INTRO_CONTENT } from "../constants";
import profilePic from "../assets/profile.jpg";

const Me = () => {
  return (
    <div className="pb-4 lg:mb-35">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <h1 className="pb-16 text-4xl font-thin tracking-tight lg:mt-16 lg:text-6xl">
            Sribhuvan Reddy Yellu
          </h1>
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-3xl tracking-tight text-transparent">
            Developer
          </span>
          <p className="my-2 max-w-xl py-6 font-light tracking-tighter text-center">
            {INTRO_CONTENT}
          </p>
        </div>
        <div className="w-full flex justify-center lg:w-1/2 lg:p-8">
          <div className="flex justify-center">
            <img 
              className="rounded-2xl w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover" 
              src={profilePic} 
              alt="Sribhuvan Reddy Yellu" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Me
