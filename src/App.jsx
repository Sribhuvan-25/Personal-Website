import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Me';
import Experience from './components/Experience';
import Research from './components/Research';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import About from './components/About'; // New component import
import ContactForm from './components/ContactForm'; // New component import

// Particle Network Component
const ParticleNetwork = ({ isDarkMode }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Your existing ParticleNetwork logic here
};

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <About /> {/* New component added here */}
        <Experience />
        <Projects />
        <Research />
        <TechStack />
        {/* Replace Contact with ContactForm if needed */}
        <ContactForm />
      </main>
    </div>
  );
}

export default App;