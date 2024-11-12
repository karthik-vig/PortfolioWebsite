import {
    Container, 
    Heading,
    Text,
    Flex,
} from '@radix-ui/themes';
import {
    useEffect,
    useRef,
    useState,
} from'react';
import {
    useImmer,
} from 'use-immer';
import Data from './assets/data/data';


interface ExperienceInfo {
    companyName: string;
    location: string;
    designation: string;
    duration: string;
    description: string;
}

function ExperienceInstance({
    children,
    animationTriggered,
    position,
} : {
    children: ExperienceInfo;
    animationTriggered: boolean;
    position: number;
}) {
    const [startAnimation, setStartAnimation] = useState<string>("false");
    useEffect(()=>{
        if (animationTriggered) {
            setTimeout(setStartAnimation, position * 150, "true");
        } else {
            setStartAnimation("false");
        }
    },[
        setStartAnimation,
        animationTriggered,
        position,
    ]);
    return (
        <Flex
            data-animationstate={startAnimation}
            direction="column"
            gap="1"
            className="\
            border-1 \
            rounded-md \
            bg-black/30 \
            backdrop-blur-lg \
            p-4 \
            data-[animationstate=true]:animate-slideOutRight \
            data-[animationstate=false]:opacity-0 \
            data-[animationstate=true]:opacity-1 \
            "
            style={{
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)"
            }}
        >
            <Heading
                className="\
                mb-3 \
                "
                size="6"
            >
               {children.companyName}
            </Heading>
            <Text
                weight="bold"
                className="\
                text-slate-100 \
                "
            >
                {`💻 ${children.designation} - ${children.duration}` }
            </Text>
            <Text
                weight="bold"
                className="\
                text-slate-100 \
                "
            >
                {`📍️ ${children.location}`}
            </Text>
            <Text
                className="\
                mt-5 \
                "
            >
                {children.description}
            </Text>
        </Flex>
    );
}


export default function Experience() {
    
    const [animationTriggered, setAnimationTriggered] = useImmer<boolean>(false);
    const experienceContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const throttle = (callback: () => void, throttleTime: number) => {
            let wait = false;
            return () => {
                if (wait) return;
                callback();
                wait = true;
                setTimeout(() => {
                    wait = false;
                }, throttleTime);
            };
        };
        const scrollTrigger = () => {
            if (experienceContainer.current === null) return;
            const experienceContainerElement = experienceContainer.current;
            const {   
                top: experienceContainerYLocation,
                bottom: experienceContainerBottomHeight 
            } = experienceContainerElement.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            // if the entire element is in view then display it
            if ( experienceContainerBottomHeight <= 1.05 * windowHeight &&
                animationTriggered === false
            ){
                setAnimationTriggered(true);
                return;
            }
            // if the element is large; then when enought of it covers the
            // screen trigger the animation; else reset the animation
            const experienceContainerYLocationToWindowHeightRatio = experienceContainerYLocation / windowHeight;
            if (experienceContainerYLocationToWindowHeightRatio <= 0.3 &&
                animationTriggered === false
            ) {
                setAnimationTriggered(true);
            } else if (
                experienceContainerYLocationToWindowHeightRatio >= 0.95 &&
                animationTriggered === true
            ) {
                setAnimationTriggered(false);
            }
        };
        const throttledScrollTrigger = throttle(scrollTrigger, 25);
        window.addEventListener("scroll", throttledScrollTrigger);
        return () => {
            window.removeEventListener("scroll", throttledScrollTrigger);
        }
    }, [
        animationTriggered,
        setAnimationTriggered,
        experienceContainer,
    ]);

    
    return (
        <Container
           id="experience"
           width="100%"
           ref={experienceContainer}
        >
            <Heading
                as="h3"
                mb="6"
                mt="100px"
                align="left"
                className="\
                highlight-text \
                "
            >
                💼 Experience
            </Heading>
            <Flex
                direction="column"
                gap="5"
                className="\
                ml-10 \
                mr-10 \ 
                "
            >
                {
                    Data.experience.map((element: object, idx: number) => {
                        return (
                            <ExperienceInstance
                               key={idx}
                            // startAnimation={startAnimation[idx]}
                                animationTriggered={animationTriggered}
                                position={idx}
                            >
                                {element as ExperienceInfo}
                            </ExperienceInstance>
                        );
                    })
                }
            </Flex>
        </Container>
    )
}