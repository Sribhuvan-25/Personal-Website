import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Me';
import Experience from './components/Experience';
import Research from './components/Research';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import SignUp from './components/SignUp';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <div className={`overflow-x-hidden antialiased selection:bg-cyan-300 selection:text-cyan-900 ${
      isDarkMode ? 'text-neutral-300' : 'text-slate-800'
    }`}>
      <div className="fixed top-0 -z-10 h-full w-full">
        <div className={`absolute top-0 z-[-3] h-screen w-screen ${
          isDarkMode 
            ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900' 
            : 'bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-400'
        }`}>
        </div>
        <ParticleNetwork isDarkMode={isDarkMode} />
        <div className={`absolute top-0 z-[-1] h-screen w-screen ${
          isDarkMode 
            ? 'bg-gradient-to-t from-indigo-950/30 via-transparent to-gray-800/20'
            : 'bg-gradient-to-t from-purple-300/20 via-transparent to-blue-200/30'
        }`}>
        </div>
      </div>

      <div className='container mx-auto px-4'> 
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <button onClick={toggleSignUp} className="mt-4 mb-4 px-4 py-2 bg-blue-500 text-white rounded">
          {showSignUp ? 'Hide Sign Up' : 'Show Sign Up'}
        </button>
        {showSignUp ? <SignUp /> : (
          <>
            <Hero />
            <Experience isDarkMode={isDarkMode} />
            <Research isDarkMode={isDarkMode} />
            <Projects isDarkMode={isDarkMode} />
            <TechStack />
            <Contact />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
