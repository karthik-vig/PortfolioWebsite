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
  parallaxLayersTemplate
} from './Parallax'
import PortfolioData from './assets/data/data';



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
      <Education />
      <Projects />
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
  const [parallaxLayer, setParallaxLayer] = useState<parallaxLayersTemplate[]>(PortfolioData.horizontalParallaxLayers as parallaxLayersTemplate[]);


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
      setParallaxLayer(PortfolioData.horizontalParallaxLayers as parallaxLayersTemplate[]);
    } else {
      setParallaxLayer(PortfolioData.verticalParallaxLayers as parallaxLayersTemplate[]);
    }

  }, [
    setParallaxLayer,
  ]);

  useEffect(handleSetMainScreenSize, [
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
  

  useEffect(() => {
    setTimeout(setAppOverflow, 2000, true);
    setTimeout(setTriggerOverlay, 2000, false);
  },[
    setAppOverflow,
    setTriggerOverlay,
  ]);
  

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
