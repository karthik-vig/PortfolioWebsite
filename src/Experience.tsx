import {
    Container, 
    Heading,
    Text,
    Flex,
} from '@radix-ui/themes';
import {
    // useCallback,
    useEffect,
    useRef,
    useState,
    useContext,
} from'react';
import {
    useImmer,
} from 'use-immer';
import Data from './assets/data/data';
import GlobalContext from './globalContext';

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

    const globalContext = useContext(GlobalContext);
    const setGlobalContextVal = globalContext["setGlobalContextVal"]

    // register the useImmer state variable used to trigger the 
    // animation to the globalContext. Now, the intersection observer
    // can trigger the animation
    // using useEffect is important as whenever the animationTrigger value
    // changes we need to update it, so that the intersection observer has the necessary information
    useEffect(() => {
        if (setGlobalContextVal === undefined) return;
        setGlobalContextVal(state => {
            if (state.componentAnimationTriggerMap === undefined ||
                state.componenentSetAnimationTriggerMap === undefined
            ) {
                state.componentAnimationTriggerMap = {};
                state.componenentSetAnimationTriggerMap = {}; 
            }
            state.componentAnimationTriggerMap["experience"] = animationTriggered;
            state.componenentSetAnimationTriggerMap["experience"] = setAnimationTriggered;
            return state;
        })
    },[
        setGlobalContextVal,
        animationTriggered,
        setAnimationTriggered,
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