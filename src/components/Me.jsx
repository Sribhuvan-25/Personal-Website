import { INTRO_CONTENT } from "../constants";
import profilePic from "../assets/profile.jpg";

const Me = () => {
  return (
    <div className="pb-4 lg:mb-35">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <h1 className="pb-16 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl">
            Sribhuvan Reddy Yellu
          </h1>
          <span className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-3xl tracking-tight text-transparent">
            Software Engineer
          </span>
          <p className="my-2 max-w-xl py-6 font-light tracking-tighter text-center">
            {INTRO_CONTENT}
          </p>
        </div>
        <div className="w-full flex justify-center lg:w-1/2 lg:p-8">
          <div className="flex justify-center">
            <img className="rounded-2xl" src={profilePic} alt="Sribhuvan Reddy Yellu" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Me
