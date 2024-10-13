import {Flex} from '@radix-ui/themes'
import NavBar from './NavBar'
import About from './About'
import Skills from './Skills'
import Projects from './projects'
import Education from './Education'
import Experience from './Experience'
import Certificates from './Certificates'
import Publications from './Publications'

function App() {

  return (
    <Flex 
      direction="column" 
      gap="1"
      overflowY="auto"
      maxWidth="100vw"
      minHeight="100vh"
      className="\
      bg-gradient-to-r from-sky-500 to-purple-500 \
      mb-20 \
      "
    >
      <NavBar />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Experience />
      <Certificates />
      <Publications />
    </Flex>
  )
}

export default App
