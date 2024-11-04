import {
    Flex,
    Container,
    Box,
    Heading,
    Text,
    TextProps,
} from '@radix-ui/themes';
import Data from './assets/data/data';
import {
    // useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    useContext,
} from 'react';
import GlobalContext from './globalContext';
import { useImmer } from 'use-immer';

interface educationalQualification {
    institute: string;
    degree: string;
    course: string;
    duration: string;
    location: string;
    degreeMark: string;
}

type directionSet = "row" | "row-reverse" | "column" | "column-reverse" | undefined;

function CourseInformation({
    children,
    direction,
}: {
    children: educationalQualification, 
    direction: directionSet,
}) {
    const textSize: TextProps["size"] = {
        initial: "2",
        xs: "2",
        sm: "2",
        md: "4",
    };
    const durationComp = (
        <Flex
            direction="column"
            justify="center"
        >   
            <Text
                weight="medium"
                size={textSize}
                className="
                highlight-text \
                text-orange-400 \
                "
            >
                {children.duration}
            </Text>
        </Flex>
    );
    let placeOnTop = false;
    let placeOnBottom = true;
    if (window.innerWidth < 770 ) {
        placeOnTop = true;
        placeOnBottom = false;
    } else if (direction === "row-reverse") {
        placeOnTop = true;
        placeOnBottom = false;
    }
    // console.log(placeOnTop, placeOnBottom)
    return (
        <Flex
            direction={{
                initial: "column",
                xs: "column",
                sm: "row",
                md: "row",
                lg: "row",
                xl: "row",
            }}
            gap={{
                initial: "4",
                xs: "4",
                sm: "4",
                md: "1"
            }}
            width="100%"
            justify="between"
            align="center"
            className="\
            bg-black/30 \
            backdrop-blur-md \
            p-2 \
            border-0 \
            rounded-md \
            "
        >
            { placeOnTop? durationComp: <></> }
            <Flex
                direction="column"
                gap={{
                    initial: "3",
                    xs: "3",
                    sm: "3",
                    md: "1",
                }}
                width="auto"
                dir="ltr"
                className="\
                highlight-text \
                "
            >
                <Heading 
                    as="h4"
                    size={{
                        initial: "4",
                        xs: "4",
                        sm: "4",
                        md:"5",
                    }}
                >
                    {children.institute}
                </Heading>
                <Text
                    size={textSize}
                >
                    {`📚 ${children.degree} - ${children.course}`}
                </Text>
                <Text
                    size={textSize}
                >
                    {`🏫 ${children.location}`}
                </Text>
                <Text
                    size={textSize}
                >
                    {`🎓 ${children.degreeMark}`}
                </Text>
            </Flex>
            { placeOnBottom? durationComp: <></> }
        </Flex>
    );
}


function Course({
    children, 
    direction,
    drawEmpty,
} : {
    children: educationalQualification, 
    direction: directionSet,
    drawEmpty: boolean,
}) {
    const courseBox = useRef<HTMLDivElement>(null);
    const [drawComponent, setDrawComponent] = useState((
        <Box
            ref={courseBox}
            width="100%"
        >
            <Flex
                direction={direction}
                gap="1"
            >   
                <CourseInformation 
                    direction={direction}
                >
                    {children}
                </CourseInformation>
            </Flex>
        </Box>
    ));

    useLayoutEffect(() => {
        if (drawEmpty && courseBox?.current != null) {
            const courseBoxHeight = courseBox.current.clientHeight;
            setDrawComponent((
                <Box
                    width="100%"
                    height={`${courseBoxHeight}px`}
                >
                </Box>
            ));
        }
    }, [
        drawEmpty,
        courseBox,
        setDrawComponent,
    ]);

    return drawComponent;
}

function EducationSide({
    forceDrawAllOrNone,
    checkNoDrawCond,
    contentViewStatus,
}: {
    forceDrawAllOrNone: "all"| "none" | "default",
    checkNoDrawCond: (cond: number) => boolean,
    contentViewStatus: boolean,
}) {
    let cssClassNames = "\
    data-[state=true]:opacity-1 \
    data-[state=false]:opacity-0 \
    ";
    if (forceDrawAllOrNone === "none") return (<></>);
    if (!checkNoDrawCond(0)) {
        cssClassNames += " data-[state=true]:animate-slideOutLeft"
    } else {
        cssClassNames += " data-[state=true]:animate-slideOutRight"
    }
    return (
            <Flex
                direction="column"
                gap="5"
                height="auto"
                width={forceDrawAllOrNone === "all"? "95%": "48%"}
                data-state={contentViewStatus? "true": "false"}
                className={cssClassNames}
                justify="center"
            >
                {
                    Data.education.map((element: object, idx: number) => {
                        let direction: directionSet = "row";
                        if (idx % 2 !== 0) direction = "row-reverse";
                        // console.log(`idx: ${idx} and direction ${direction}`)
                        const drawEmpty = forceDrawAllOrNone === "all"? false: checkNoDrawCond(idx);
                        return (
                            <Course
                                key={idx}
                                direction={direction}
                                drawEmpty={drawEmpty}
                            >
                                {element as educationalQualification}
                            </Course>
                        );
                    })
                }
            </Flex>
    );
}

function EducationVerticalLine({
    contentViewStatus,
    height,
}:{
    contentViewStatus: boolean;
    height: number | undefined;
}) {

    useLayoutEffect(() => {
        if (!contentViewStatus) return;
        const rootElement: HTMLHtmlElement | null = document.querySelector(":root");
        if (rootElement === null) return;
        rootElement.style.setProperty("--timeline-height", String(height) + "px");
    }, [
        contentViewStatus,
        height,
    ])

    return (
        <Flex
            direction="row"
            gap="5"
            height="auto"
            width="4%"
            justify="center"
        >
            <div
                data-content-view-status={contentViewStatus? "true": "false"}
                className="\
                bg-lime-300 \
                w-2 \
                border-0 \
                rounded-lg \
                data-[content-view-status=true]:animate-inctimelineheight \
                data-[content-view-status=true]:h-[100%] \
                data-[content-view-status=false]:h-0 \
                highlight-component \
                "
            >
            </div>
        </Flex>
    );
}

export default function Education() {

    const educationContainer = useRef<HTMLDivElement>(null);
    const mainFlexBox = useRef<HTMLDivElement>(null);
    const [animationTriggered, setAnimationTriggered] = useImmer(false);
    
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
            state.componentAnimationTriggerMap["education"] = animationTriggered;
            state.componenentSetAnimationTriggerMap["education"] = setAnimationTriggered;
            return state;
        })
    },[
        setGlobalContextVal,
        animationTriggered,
        setAnimationTriggered,
    ]);
    

    return (
        <Container
            id="education"
            width="100%"
            ref={educationContainer}
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
                🎓 Education
            </Heading>
            <Flex
                ref={mainFlexBox}
                direction="row"
                gap="5"
                height="auto"
                className="\
                ml-10 \
                mr-10 \
                "
                justify="center"
            >
                <EducationSide 
                    forceDrawAllOrNone={window.innerWidth < 770? "none": "default"}
                    checkNoDrawCond={(cond: number) => cond % 2 !== 0}
                    contentViewStatus={animationTriggered}
                />
                <EducationVerticalLine 
                    contentViewStatus={animationTriggered}
                    height={mainFlexBox.current?.getBoundingClientRect().height}
                />
                <EducationSide
                    forceDrawAllOrNone={window.innerWidth < 770? "all": "default"}
                    checkNoDrawCond={(cond: number) => cond % 2 === 0}
                    contentViewStatus={animationTriggered}
                />
            </Flex>
        </Container>
    );
}