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
    // both start and end are between 0 and 1
    // which denotes the percentage ratio of the 
    // vertical position of the background image
    // ex: start=0.3 and end =0.7, then we move from
    // 30 percent to 70 percent
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

    const svgLayer = useRef<SVGImageElement>(null);

    const [ svgLayerYPosition, setSvgLayerYPosition ] = useState<number>(parallaxLayer.movementY.start);
    const [ svgLayerXPosition, setSvgLayerXPosition ] = useState<number>(0);

    const handleSetSVGLayerYPosition = useCallback(() => {
        if (svgLayer.current === null) return;
        const domScrollHeight = document.documentElement.scrollHeight;
        const currentDomScrollYPosition = document.documentElement.scrollTop;
        // console.log(domScrollHeight, currentDomScrollYPosition, window.innerHeight);
        const scrolledRatio = (currentDomScrollYPosition) / (domScrollHeight - window.innerHeight);
        // console.log(scrolledRatio);
        const movementYRange = parallaxLayer.movementY.end - parallaxLayer.movementY.start;
        const currentImageYPosition = parallaxLayer.movementY.start + movementYRange * scrolledRatio;
        // console.log(currentImageYPosition);
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
        setSvgLayerYPosition,
        svgLayerYPosition,
    ]);
    

    useLayoutEffect(() => {
        // console.log("svg image layer use layout effect called");
        if (svgLayer.current === null) return;
        const { width: svgLayerWidth, } = svgLayer.current.getBoundingClientRect();
        // console.log(screenDisplayWidth? svgLayerWidth / screenDisplayWidth: null);
        setSvgLayerXPosition( screenDisplayWidth? (screenDisplayWidth - svgLayerWidth) / 2 : 0);
    }, [
        screenDisplayWidth,
        setSvgLayerXPosition,
    ]);

    return (
        <image
            ref={svgLayer}
            href={parallaxLayer.src}
            x={`${svgLayerXPosition}%`}
            y={`${svgLayerYPosition * 100}%`}
            width={`${parallaxLayer.dimension.width}%`}
            height={`${parallaxLayer.dimension.height}%`}
            className="absolute top-0 left-0"
            style={{
                zIndex: String(zIndex),
                padding: "0",
                margin: "0",
                border: "0",
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
    // dynamically set the the viewbox with hard coded
    // dimensions
    const svgComponent = useRef<SVGSVGElement>(null);
    const [ viewBox, setViewBox ] = useState<string>("0 0 100 100");

    const calculateViewBox = useCallback(() => {
        if (svgComponent.current === null) return;
        const {
            height: svgComponentHeight,
        } = svgComponent.current.getBoundingClientRect();
        setViewBox(`0 0 ${screenDisplayWidth} ${svgComponentHeight}`);
    },[
        svgComponent,
        setViewBox,
        screenDisplayWidth,
    ]);

    useLayoutEffect(calculateViewBox, [
        svgComponent,
        viewBox,
        setViewBox,
        screenDisplayWidth,
        calculateViewBox
    ]);

    useEffect(() => {
        window.addEventListener("resize", calculateViewBox);
        return () => {
            window.removeEventListener("resize", calculateViewBox);
        }
    }, [
        svgComponent,
        viewBox,
        setViewBox,
        screenDisplayWidth,
        calculateViewBox,
    ]);
    

    return (
        <svg
            ref={svgComponent}
            className="\
            fixed z-10 top-0 left-0 \
            "
            viewBox={viewBox}
            preserveAspectRatio="xMaxYMax slice"
            // preserveAspectRatio="none"
            height="100vh"
            width={screenDisplayWidth+"px"}
            style={{
                padding: "0",
                margin: "0",
                border: "0",
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
        </svg>
    );
}