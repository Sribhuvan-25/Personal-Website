// src/App.jsx
import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Me';
import Experience from './components/Experience';
import Research from './components/Research';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import Footer from './components/Footer'; // Import the Footer component

// Particle Network Component
const ParticleNetwork = ({ isDarkMode }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const resizeTimeoutRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = particlesRef.current;

    // Particle class
    class Particle {
      constructor(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }
    }

    // Additional code for particles...

  }, []);

  return <canvas ref={canvasRef} />;
};

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Experience />
      <Research />
      <Projects />
      <TechStack />
      <Contact />
      <Footer /> {/* Add the Footer component here */}
    </div>
  );
}

export default App;