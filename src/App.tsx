import {Flex} from '@radix-ui/themes'
import NavBar from './NavBar'
import About from './About'
import Skills from './Skills'

function App() {

  return (
    <Flex 
      direction="column" 
      gap="1"
      overflowY="auto"
      maxWidth="100vw"
      minHeight="100vh"
      className="bg-gradient-to-r from-sky-500 to-purple-500"
    >
      <NavBar />
      <About />
      <Skills />
    </Flex>
  )
}

export default App
