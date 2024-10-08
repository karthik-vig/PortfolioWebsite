import {
    Flex,
    Container,
    Box,
    Heading
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

function Course({children} : {children: educationalQualification}) {
    console.log(children);
    return (
        <Box>
            <Flex>
            </Flex>
        </Box>
    );
}

export default function Education() {

    return (
        <Container
            id="education"
        >
            <Heading
                as="h3"
                mb="6"
                mt="100px"
                align="left"
            >
                🎓 Education
            </Heading>
            <Flex>
                {
                    Data.education.map((element: object, idx: number) => {
                        return (
                            <Course
                                key={idx}
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