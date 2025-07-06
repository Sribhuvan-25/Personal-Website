import { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Me'
import Experience from './components/Experience'
import Research from './components/Research'
import Projects from './components/Projects'
import TechStack from './components/TechStack'
import Contact from './components/Contact'
import RandomContentButton from './components/RandomContentButton';

// Particle Network Component
const ParticleNetwork = ({ isDarkMode }) => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])
  const resizeTimeoutRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const particles = particlesRef.current

    // Particle class
    class Particle {
      constructor(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth
        this.y = Math.random() * canvasHeight
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.radius = Math.random() * 2 + 1
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1

        // Keep particles in bounds
        this.x = Math.max(0, Math.min(canvas.width, this.x))
        this.y = Math.max(0, Math.min(canvas.height, this.y))
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = isDarkMode 
          ? 'rgba(147, 197, 253, 0.6)' // blue-300 with opacity
          : 'rgba(99, 102, 241, 0.4)'  // indigo-500 with opacity
        ctx.fill()
      }
    }

    // Initialize particles
    const initializeParticles = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      // Clear existing particles
      particles.length = 0
      
      // Create new particles based on screen size
      const particleCount = Math.floor((canvas.width * canvas.height) / 8000)
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height))
      }
    }

    // Initial setup
    initializeParticles()

    // Handle resize with debouncing
    const handleResize = () => {
      // Clear any existing timeout
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
      
      // Set new timeout to reinitialize particles after resize stops
      resizeTimeoutRef.current = setTimeout(() => {
        initializeParticles()
      }, 150) // 150ms debounce
    }
    
    window.addEventListener('resize', handleResize)

    // Draw connections between nearby particles
    const drawConnections = () => {
      const maxDistance = 150
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.4
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = isDarkMode 
              ? `rgba(147, 197, 253, ${opacity})` // blue-300
              : `rgba(99, 102, 241, ${opacity})`  // indigo-500
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      // Draw connections
      drawConnections()

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isDarkMode])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: -2 }}
    />
  )
}

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true)

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
        
        {/* Particle Network */}
        <ParticleNetwork isDarkMode={isDarkMode} />
        
        {/* Subtle gradient overlay for depth */}
        <div className={`absolute top-0 z-[-1] h-screen w-screen ${
          isDarkMode 
            ? 'bg-gradient-to-t from-indigo-950/30 via-transparent to-gray-800/20'
            : 'bg-gradient-to-t from-purple-300/20 via-transparent to-blue-200/30'
        }`}>
        </div>
      </div>

      <div className='container mx-auto px-4'> 
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <Hero />
        <Experience isDarkMode={isDarkMode} />
        <Research isDarkMode={isDarkMode} />
        <Projects isDarkMode={isDarkMode} />
        <TechStack />
        <Contact />
        <RandomContentButton />
      </div>
    </div>
  )
}

export default App
