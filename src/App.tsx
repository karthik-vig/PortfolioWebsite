import { 
  StrictMode,
  useCallback,
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
import Parallax, {
  parallaxLayersTemplate,
} from './Parallax'


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
      relative z-20 top-0 left-0 \
      pb-96 \
      "
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

  const handleSetMainScreenSize = useCallback(() => {
    if (main.current === null) return;
    const mainWidth = main.current.getBoundingClientRect().width;
    setScreenDisplayWidth(mainWidth);
  }, [
    main,
    setScreenDisplayWidth,
  ]);

  useEffect(handleSetMainScreenSize, [
    screenDisplayWidth,
    appOverflow,
    handleSetMainScreenSize,
  ]);

  useEffect( () => {
    window.addEventListener('resize', handleSetMainScreenSize);
    return () => {
      window.removeEventListener('resize', handleSetMainScreenSize);
    };
  }, [
    handleSetMainScreenSize,
  ]);
  

  setTimeout(setAppOverflow, 2000, true);

  setTimeout(setTriggerOverlay, 2000, false);

  const parallaxLayers: parallaxLayersTemplate[] = [
    {
      src: "./src/assets/images/parallaxLayers/white_base_bg.svg",
      movementY: {
        start: 0,
        end: 0,
      },
      dimension: {
        height: 100,
        width: 100,
      }
    },
    {
      src: "./src/assets/images/parallaxLayers/bg_layer.svg",
      movementY: {
        start: -0.05,
        end: 0,
      },
      dimension: {
        height: 100,
        width: 100,
      }
    },
    {
      src: "./src/assets/images/parallaxLayers/middle_layer.svg",
      movementY: {
        start: 0.1,
        end: 0,
      },
      dimension: {
        height: 100,
        width: 100,
      }
    },
    {
      src: "./src/assets/images/parallaxLayers/fg_layer.svg",
      movementY: {
        start: 0.2,
        end: 0,
      },
      dimension: {
        height: 100,
        width: 100,
      }
    },
  ];

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
          height: "100%",
          minHeight: "100vh",
          maxHeight: "auto",
        }}
        className="\
        bg-gradient-to-r from-sky-500 to-purple-500 \
        "
      >
        <Parallax 
          screenDisplayWidth={screenDisplayWidth}
          parallaxLayers={parallaxLayers}
        />
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
