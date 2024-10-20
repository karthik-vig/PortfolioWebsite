import {
    Flex,
} from '@radix-ui/themes';
import {
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
}:{
    parallaxLayer: parallaxLayersTemplate;
    zIndex: number;
}) {

    const svgLayer = useRef<HTMLDivElement>(null);

    const [ svgLayerYPosition, setSvgLayerYPosition ] = useState<number>(parallaxLayer.movementY.start);

    window.addEventListener('scroll', () => {
        if (svgLayer.current === null) return;
        const domScrollHeight = document.documentElement.scrollHeight;
        const currentDomScrollYPosition = document.documentElement.scrollTop;
        // console.log(domScrollHeight, currentDomScrollYPosition, window.innerHeight);
        const scrolledRatio = (currentDomScrollYPosition) / domScrollHeight;
        // console.log(scrolledRatio);
        const movementYRange = parallaxLayer.movementY.end - parallaxLayer.movementY.start;
        setSvgLayerYPosition(parallaxLayer.movementY.start + movementYRange * scrolledRatio);
    });

    return (
        <div
            ref={svgLayer}
            style={{
                backgroundImage: `url(${parallaxLayer.src})`,
                backgroundRepeat: "no-repeat",
                backgroundPositionX: "center",
                backgroundPositionY: `${svgLayerYPosition * 100}%`,
                backgroundSize: `${parallaxLayer.dimension.width}% ${parallaxLayer.dimension.height}%`,
                zIndex: `${zIndex}`,
            }}
            className="absolute top-0 left-0 w-[100%] h-[100%]"
        >
        </div> 
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
        <Flex
            className="\
            fixed z-10 top-0 left-0 h-[100vh] \
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
                        />
                    );
                })
            }
        </Flex>
    );
}