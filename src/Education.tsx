import {
    Flex,
    Container,
    Box,
    Heading,
    Text,
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
    const durationComp = (
        <Flex
            direction="column"
            justify="center"
        >
            <Text
                weight="medium"
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
            gap="1"
            width="100%"
            justify="between"
        >
            { placeOnTop? durationComp: <></> }
            <Flex
                direction="column"
                gap={{
                    xs: "5",
                    sm: "5",
                    md: "1",
                }}
                width="auto"
                dir="ltr"
            >
                <Heading 
                    as="h4"
                    size="6"
                >
                    {children.institute}
                </Heading>
                <Text>
                    {children.degree + " - " + children.course}
                </Text>
                <Text>
                    {children.location}
                </Text>
                <Text>
                    {children.degreeMark}
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
    checkNoDrawCond
}: {
    checkNoDrawCond: (cond: number) => boolean 
}) {
    return (
            <Flex
                direction="column"
                gap="5"
                height="auto"
                width="48%"
            >
                {
                    Data.education.map((element: object, idx: number) => {
                        let direction: directionSet = "row";
                        if (idx % 2 !== 0) direction = "row-reverse";
                        console.log(`idx: ${idx} and direction ${direction}`)
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

function EducationVerticalLine() {
    return (
        <Flex
            direction="row"
            gap="5"
            height="auto"
            width="4%"
            justify="center"
        >
            <div
                className="\
                bg-lime-300 \
                w-2 \
                h-[100%] \
                border-0 \
                rounded-lg \
                "
            >
            </div>
        </Flex>
    );
}

export default function Education() {
    return (
        <Container
            id="education"
            width="100%"
        >
            <Heading
                as="h3"
                mb="6"
                mt="100px"
                align="left"
            >
                🎓 Education
            </Heading>
            <Flex
                direction="row"
                gap="5"
                height="auto"
                className="\
                ml-10 \
                mr-10 \
                "
            >
                <EducationSide 
                    checkNoDrawCond={(cond: number) => cond % 2 !== 0}
                />
                <EducationVerticalLine />
                <EducationSide
                    checkNoDrawCond={(cond: number) => cond % 2 === 0}
                />
            </Flex>
        </Container>
    );
}