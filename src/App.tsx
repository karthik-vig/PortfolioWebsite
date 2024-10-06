import {Flex} from '@radix-ui/themes'
import NavBar from './NavBar'

function App() {

  return (
    <Flex 
      direction="column" 
      gap="1"
      overflowY="auto"
      minHeight="100vh"
      className="bg-gradient-to-r from-sky-500 to-indigo-500"
    >
      <NavBar />
    </Flex>
  )
}

export default App
