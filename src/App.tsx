import { 
  StrictMode,
  useCallback,
  useEffect,
  useLayoutEffect,
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


const horizonalParallaxLayers: parallaxLayersTemplate[] = [
  {
    src: "./src/assets/images/parallaxLayers/horizontalLayers/white_base_bg.svg",
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
    src: "./src/assets/images/parallaxLayers/horizontalLayers/bg_layer.svg",
    movementY: {
      start: -25,
      end: 0,
    },
    dimension: {
      height: 100,
      width: 100,
    }
  },
  {
    src: "./src/assets/images/parallaxLayers/horizontalLayers/middle_layer.svg",
    movementY: {
      start: 50,
      end: 0,
    },
    dimension: {
      height: 100,
      width: 100,
    }
  },
  {
    src: "./src/assets/images/parallaxLayers/horizontalLayers/fg_layer.svg",
    movementY: {
      start: 100,
      end: 0,
    },
    dimension: {
      height: 100,
      width: 100,
    }
  },
];


const verticalParallaxLayers: parallaxLayersTemplate[] = [
  {
    src: "./src/assets/images/parallaxLayers/verticalLayers/white_base_bg.svg",
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
    src: "./src/assets/images/parallaxLayers/verticalLayers/bg_layer.svg",
    movementY: {
      start: -25,
      end: 0,
    },
    dimension: {
      height: 100,
      width: 100,
    }
  },
  {
    src: "./src/assets/images/parallaxLayers/verticalLayers/middle_layer.svg",
    movementY: {
      start: 50,
      end: 0,
    },
    dimension: {
      height: 100,
      width: 100,
    }
  },
  {
    src: "./src/assets/images/parallaxLayers/verticalLayers/fg_layer.svg",
    movementY: {
      start: 100,
      end: 0,
    },
    dimension: {
      height: 100,
      width: 100,
    }
  },
];


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
  const [parallaxLayer, setParallaxLayer] = useState<parallaxLayersTemplate[]>(horizonalParallaxLayers);

  const handleSetMainScreenSize = useCallback(() => {
    if (main.current === null) return;
    const mainWidth = main.current.getBoundingClientRect().width;
    setScreenDisplayWidth(mainWidth);
  }, [
    main,
    setScreenDisplayWidth,
  ]);

  const handleSelectParallaxLayerType = useCallback(() => {
    if (window.innerWidth > 1024 ) {
      setParallaxLayer(horizonalParallaxLayers);
    } else {
      setParallaxLayer(verticalParallaxLayers);
    }

  }, [
    setParallaxLayer,
  ]);

  useEffect(handleSetMainScreenSize, [
    screenDisplayWidth,
    appOverflow,
    handleSetMainScreenSize,
  ]);

  useLayoutEffect(handleSelectParallaxLayerType, [
    handleSelectParallaxLayerType,
  ]);

  useEffect( () => {
    window.addEventListener("resize", handleSetMainScreenSize);
    window.addEventListener("resize", handleSelectParallaxLayerType);
    return () => {
      window.removeEventListener("resize", handleSetMainScreenSize);
      window.removeEventListener("resize", handleSelectParallaxLayerType);
    };
  }, [
    handleSetMainScreenSize,
    handleSelectParallaxLayerType,
  ]);
  

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
          parallaxLayers={parallaxLayer}
        >
          <App
            appOverflow={appOverflow}
          />
        </Parallax>
        <Overlay 
          screenDisplayWidth={screenDisplayWidth}
          triggerOverlay={triggerOverlay}
        />
    </Theme>    
  </StrictMode>
  );
}

export default Main;
