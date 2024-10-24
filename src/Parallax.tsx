// import {
//     Flex,
// } from '@radix-ui/themes';
import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

export const svgID: string = "#parallax";

export interface parallaxLayersTemplate {
    src: string;
    // both start and end are pixel values 
    // can be positive or negative. We go from the start
    // to the end value from the top of the 
    // main window scroll to the the end of it
    movementY: {
        start: number;
        end: number;
    };
    dimension: {
        width: number; 
        height: number;
    };
}


function ParallayLayer({
    parallaxLayer,
    zIndex,
    screenDisplayWidth,
}:{
    parallaxLayer: parallaxLayersTemplate;
    zIndex: number;
    screenDisplayWidth: number | undefined;
}) {

    const svgLayer = useRef<HTMLImageElement>(null);

    const [ svgLayerYPosition, setSvgLayerYPosition ] = useState<number>(parallaxLayer.movementY.start);
    const [ svgLayerXPosition, setSvgLayerXPosition ] = useState<number>(0);

    const handleSetSVGLayerYPosition = useCallback(() => {
        if (svgLayer.current === null) return;
        const domScrollHeight = document.documentElement.scrollHeight;
        const currentDomScrollYPosition = document.documentElement.scrollTop;
        const scrolledRatio = (currentDomScrollYPosition) / (domScrollHeight - window.innerHeight);
        const movementYRange = parallaxLayer.movementY.end - parallaxLayer.movementY.start;
        const currentImageYPosition = parallaxLayer.movementY.start + movementYRange * scrolledRatio;
        setSvgLayerYPosition(currentImageYPosition);
    }, [
        setSvgLayerYPosition,
        parallaxLayer.movementY.start,
        parallaxLayer.movementY.end,
    ]);

    useEffect(() => {
        window.addEventListener("scroll", handleSetSVGLayerYPosition);
        return () => {
            window.removeEventListener("scroll", handleSetSVGLayerYPosition);
        }
    }, [
        handleSetSVGLayerYPosition,
    ]);
    

    useLayoutEffect(() => {
        if (svgLayer.current === null) return;
        const { width: svgLayerWidth, } = svgLayer.current.getBoundingClientRect();
        setSvgLayerXPosition( screenDisplayWidth? (screenDisplayWidth - svgLayerWidth) / 2 : 0);
    }, [
        screenDisplayWidth,
        setSvgLayerXPosition,
        svgLayer,
    ]);

    return (
        <img 
            ref={svgLayer}
            src={parallaxLayer.src}
            alt="test svg image"
            className="\
            absolute \
            "
            style={{
                height: "100vh",
                width: screenDisplayWidth + "px",
                objectFit: "cover",
                zIndex: String(zIndex),
                top: `${svgLayerYPosition}px`,
                left: `${svgLayerXPosition}px`,
            }}
        />
    );
}

export default function Parallax({
    screenDisplayWidth,
    parallaxLayers,
}:{
    screenDisplayWidth: number | undefined;
    parallaxLayers: parallaxLayersTemplate[];
}) {
  
    return (
        <div
            className="\
            fixed z-10 top-0 left-0 \
            "
            style={{
            width: screenDisplayWidth + "px",
            height:"100vh",
            }}
        >
            {
                parallaxLayers.map((element: parallaxLayersTemplate, idx: number) => {
                    return (
                        <ParallayLayer
                            key={idx}
                            parallaxLayer={element}
                            zIndex={idx + 1}
                            screenDisplayWidth={screenDisplayWidth}
                        />
                    );
                })
            }
        </div>
    );
}