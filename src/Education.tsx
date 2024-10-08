import {
    Flex,
    Container,
    Box,
    Heading,
    Text,
} from '@radix-ui/themes';
import Data from './assets/data/data';

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
            <Text>
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
    console.log(placeOnTop, placeOnBottom)
    return (
        <Flex
            direction="row"
            gap="1"
            width="45%"
        >
            { placeOnTop? durationComp: <></> }
            <Flex
                direction="column"
                gap="1"
                width="auto"
                dir="ltr"
            >
                <Heading as="h4">
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
} : {
    children: educationalQualification, 
    direction: directionSet
}) {
    return (
        <Box
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
                direction="column"
                gap="5"
                height="auto"
                className="\
                ml-10 \
                "
            >
                {
                    Data.education.map((element: object, idx: number) => {
                        let direction: directionSet = "row";
                        if (idx % 2 !== 0) direction = "row-reverse";
                        return (
                            <Course
                                key={idx}
                                direction={direction}
                            >
                                {element as educationalQualification}
                            </Course>
                        );
                    })
                }
            </Flex>
        </Container>
    );
}