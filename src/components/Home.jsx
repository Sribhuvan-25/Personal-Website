import Hero from './Me'
import Experience from './Experience'
import Research from './Research'
import Projects from './Projects'
import TechStack from './TechStack'
import Contact from './Contact'

const Home = ({ isDarkMode }) => {
  return (
    <>
      <Hero />
      <Experience isDarkMode={isDarkMode} />
      <Research isDarkMode={isDarkMode} />
      <Projects isDarkMode={isDarkMode} />
      <TechStack />
      <Contact />
    </>
  )
}

export default Home 