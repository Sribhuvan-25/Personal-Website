import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Me'
import About from './components/About'
import TechStack from './components/TechStack'
import Experience from './components/Experience'
import Research from './components/Research'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Blog from './routes/Blog'
import Post from './routes/Post'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const HomePage = () => (
  <>
    <Hero />
    <About />
    <TechStack />
    <Experience />
    <Research />
    <Projects />
    <Contact />
  </>
);

const App = () => {
  return (
    <Router>
      <div className='overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900'>
        <div className="fixed top-0 -z-10 h-full w-full">
          <div className="absolute top-0 z-[-2] h-screen w-screen
           bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),
           rgba(255,255,255,0))]">
           </div>
        </div>
        <div className='container mx-auto px-4'> 
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Post />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
