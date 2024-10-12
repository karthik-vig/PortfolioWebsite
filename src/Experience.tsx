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
    // startAnimation,
    animationTriggered,
    position,
} : {
    children: ExperienceInfo;
    // startAnimation: string;
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
    // const [startAnimation, setStartAnimation] = useImmer<string[]>(Array<string>(Data.experience.length).fill("false"))
    const [animationTriggered, setAnimationTriggered] = useState<boolean>(false);
    const experienceContainer = useRef<HTMLDivElement>(null);
    window.addEventListener("scroll", ()=>{
        const experienceContainerXTopLocation = experienceContainer.current?.getBoundingClientRect().top;
        const experienceContainerXBottomLocation = experienceContainer.current?.getBoundingClientRect().bottom;
        if (experienceContainerXTopLocation === undefined ||
            experienceContainerXBottomLocation === undefined
        ) return;
        const windowHeight = window.innerHeight;
        if ( experienceContainerXBottomLocation <= 1.05 * windowHeight && 
            animationTriggered === false
        ) {
            // console.log("bottom animation triggered", animationTriggered)
            setAnimationTriggered(true);
            return;
        }
        const experienceContainerXTopLocationToWindowHeightRatio = experienceContainerXTopLocation / windowHeight;
        if ( experienceContainerXTopLocationToWindowHeightRatio <= 0.4 &&
            animationTriggered === false
        ) { 
            // console.log("top animation triggered", animationTriggered)
            setAnimationTriggered(true);
        } else if ( experienceContainerXTopLocationToWindowHeightRatio >= 0.95 &&
            animationTriggered === true
        ){
            // console.log("reset animation triggered", animationTriggered)
            setAnimationTriggered(false);
        }
    });
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