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

    // actual functional implementation to handle the
	// Y position
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

    // change the Y position on scroll
    useEffect(() => {
        // function to slow down the number of recalculations on scroll
        const throttle = (callback: () => void, throttleTimeLimit: number) => {
            let wait = false;
            return () => {
                if(wait) return;
                callback();
                wait = true;
                setTimeout(() => {
                    wait = false;
                }, throttleTimeLimit);
            }
        };
        const throttledHandleSetSVGLayerYPosition = throttle(handleSetSVGLayerYPosition, 25);
        window.addEventListener("scroll", throttledHandleSetSVGLayerYPosition);
        return () => {
            window.removeEventListener("scroll", throttledHandleSetSVGLayerYPosition);
        }
    }, [
        handleSetSVGLayerYPosition,
    ]);
    
    // calculate the X position and center the image on the
	// screen
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
            alt={`parallax layer: ${zIndex}`}
            className="\
            absolute \
            "
            style={{
                height: "100vh",
                width: screenDisplayWidth + "px",
                objectFit: "cover",
                zIndex: String(zIndex),
                top: `0px`,
                left: `${svgLayerXPosition}px`,
                transform: `translateY(${svgLayerYPosition}px)`,
            }}
        />
    );
}

export default function Parallax({
    screenDisplayWidth,
    parallaxLayers,
    children,
}:{
    screenDisplayWidth: number | undefined;
    parallaxLayers: parallaxLayersTemplate[];
    children: JSX.Element;
}) {
  
    return (
        <div>
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
            <div
                className="\
                relative z-20 top-0 left-0 \
                "
            >
                {children}
            </div>
        </div>
    );
}