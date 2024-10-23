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
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

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
                "
            >
                {children.duration}
            </Text>
        </Flex>
    );
    let placeOnTop = false;
    let placeOnBottom = true;
    if (direction === "row-reverse") {
        placeOnTop = true;
        placeOnBottom = false;
    }
    // console.log(placeOnTop, placeOnBottom)
    return (
        <Flex
            direction="row"
            gap={{
                initial: "4",
                xs: "4",
                sm: "4",
                md: "1"
            }}
            width="100%"
            justify="between"
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
        drawComponent,
    ]);
    return drawComponent;
}

function EducationSide({
    checkNoDrawCond,
    contentViewStatus,
}: {
    checkNoDrawCond: (cond: number) => boolean,
    contentViewStatus: string,
}) {
    let cssClassNames = "\
    data-[state=true]:opacity-1 \
    data-[state=false]:opacity-0 \
    ";
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
                width="48%"
                data-state={contentViewStatus}
                className={cssClassNames}
                justify="center"
            >
                {
                    Data.education.map((element: object, idx: number) => {
                        let direction: directionSet = "row";
                        if (idx % 2 !== 0) direction = "row-reverse";
                        // console.log(`idx: ${idx} and direction ${direction}`)
                        return (
                            <Course
                                key={idx}
                                direction={direction}
                                drawEmpty={checkNoDrawCond(idx)}
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
    contentViewStatus: "true" | "false";
    height: number | undefined;
}) {
    // const timelineDiv = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        if (contentViewStatus === "false") return;
        const rootElement: HTMLHtmlElement | null = document.querySelector(":root");
        if (rootElement === null) return;
        rootElement.style.setProperty("--timeline-height", String(height) + "px");
    }, [
        contentViewStatus,
        height,
    ])

    return (
        <Flex
            // ref={timelineDiv}
            direction="row"
            gap="5"
            height="auto"
            width="4%"
            justify="center"
        >
            <div
                // ref={timelineDiv}
                data-content-view-status={contentViewStatus}
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
    const [contentViewStatus, setContentViewStatus] = useState("false");
    window.addEventListener('scroll', () => { 
        // get the bottom height and if it is less than the height of 
        // the window, meaning the element is fully visible, then 
        // go ahead with the animation
        const educationContainerBottomHeight = educationContainer.current?.getBoundingClientRect().bottom;
        if (educationContainerBottomHeight == undefined) return;
        if ( educationContainerBottomHeight <= 1.05 * window.innerHeight &&
            contentViewStatus !== "true"
        ) {
            setContentViewStatus("true");
            return;
        }
        // even if the entire element is not visible, but occupies
        // significant portion of the screen, then start the animation
        // anyway.
        // only reset the condition for the animation to occur again, 
        // if the element is fully out of view area.
        const educationContainerYLocation = educationContainer.current?.getBoundingClientRect().top;
        if (educationContainerYLocation == undefined) return;
        const windowHeight = window.innerHeight;
        const educationContainerYLocationToWindowHeightRatio = educationContainerYLocation / windowHeight;
        if ( educationContainerYLocationToWindowHeightRatio <= 0.2 &&
            contentViewStatus !== "true"
        ) {
            setContentViewStatus("true");
        } else if ( educationContainerYLocationToWindowHeightRatio >= 0.95 &&
            contentViewStatus !== "false"
        ){
            setContentViewStatus("false");
        }
    })

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
                    checkNoDrawCond={(cond: number) => cond % 2 !== 0}
                    contentViewStatus={contentViewStatus}
                />
                <EducationVerticalLine 
                    contentViewStatus={contentViewStatus as ("true" | "false")}
                    height={mainFlexBox.current?.getBoundingClientRect().height}
                />
                <EducationSide
                    checkNoDrawCond={(cond: number) => cond % 2 === 0}
                    contentViewStatus={contentViewStatus}
                />
            </Flex>
        </Container>
    );
}