// import {
//     Flex,
// } from '@radix-ui/themes';
import {
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

    window.addEventListener('scroll', () => {
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
    });

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
            x={`${svgLayerXPosition}px`}
            y={`${svgLayerYPosition * 100}%`}
            width={`${parallaxLayer.dimension.width}%`}
            height={`${parallaxLayer.dimension.height}%`}
            className="absolute top-0 left-0"
            style={{
                zIndex: String(zIndex),
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
        <svg
            className="\
            fixed z-10 top-0 left-0 h-[100vh] w-auto\
            "
            width={screenDisplayWidth+"px"}
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