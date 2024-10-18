import { 
  StrictMode,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  Theme,
  Flex,
} from '@radix-ui/themes'
import NavBar from './NavBar'
import About from './About'
import Skills from './Skills'
import Projects from './projects'
import Education from './Education'
import Experience from './Experience'
import Certificates from './Certificates'
import Publications from './Publications'
import Overlay from './Overlay'

function App({
  appOverflow,
}:{
  appOverflow: boolean;
}) {

  return (
    <Flex 
      direction="column" 
      gap="1"
      overflowY={appOverflow? "auto": "hidden"}
      maxWidth="100vw"
      className="\
      bg-transparent \
      pb-96 \
      "
      // overflow={appOverflow? "scroll": "hidden"}
      height={appOverflow? "auto": "100vh"}
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

function Main() {
  const main = useRef<HTMLDivElement>(null);
  const [screenDisplayWidth, setScreenDisplayWidth] = useState<number | undefined>(0);
  const [appOverflow, setAppOverflow] = useState<boolean>(false);
  const [triggerOverlay, setTriggerOverlay] = useState<boolean>(true);

  const handleSetMainScreenSize = () => {
    if (main.current === null) return;
    const mainWidth = main.current.getBoundingClientRect().width;
    setScreenDisplayWidth(mainWidth);
  };

  useEffect(handleSetMainScreenSize, [
    setScreenDisplayWidth,
    screenDisplayWidth,
    appOverflow,
  ]);

  window.addEventListener('resize', handleSetMainScreenSize);

  setTimeout(setAppOverflow, 2000, true);

  setTimeout(setTriggerOverlay, 2000, false);

  return (
    <StrictMode>
      <Theme
        ref={main}
        accentColor="blue"
        grayColor="slate"
        appearance="dark"
        radius="large"
        scaling="100%"
        panelBackground="translucent"
        style={{
          width: "100%",
          minHeight: "100vh",
        }}
        className="\
        bg-gradient-to-r from-sky-500 to-purple-500 \
        "
      >
        <Overlay 
          screenDisplayWidth={screenDisplayWidth}
          triggerOverlay={triggerOverlay}
        />
        <App 
          appOverflow={appOverflow}
        />
    </Theme>    
  </StrictMode>
  );
}

export default Main;
