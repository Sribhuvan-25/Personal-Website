import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Me'
import Experience from './components/Experience'
import Research from './components/Research'
import Projects from './components/Projects'
import TechStack from './components/TechStack'
import Contact from './components/Contact'

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`overflow-x-hidden antialiased selection:bg-cyan-300 selection:text-cyan-900 ${
      isDarkMode ? 'text-neutral-300' : 'text-slate-800'
    }`}>
      <div className="fixed top-0 -z-10 h-full w-full">
        {/* Base gradient background */}
        <div className={`absolute top-0 z-[-3] h-screen w-screen ${
          isDarkMode 
            ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900' 
            : 'bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-400'
        }`}>
        </div>
        
        {/* Subtle gradient overlay for depth */}
        <div className={`absolute top-0 z-[-1] h-screen w-screen ${
          isDarkMode 
            ? 'bg-gradient-to-t from-indigo-950/30 via-transparent to-gray-800/20'
            : 'bg-gradient-to-t from-purple-300/20 via-transparent to-blue-200/30'
        }`}>
        </div>
      </div>

      {/* Dark mode toggle button */}
      <button
        onClick={toggleDarkMode}
        className={`fixed top-4 right-4 z-50 p-2 rounded-full transition-all duration-300 text-sm ${
          isDarkMode 
            ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300' 
            : 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
        }`}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      <div className='container mx-auto px-4'> 
        <Navbar />
        <Hero />
        <Experience />
        <Research />
        <Projects />
        <TechStack />
        <Contact />
      </div>
    </div>
  )
}

export default App
