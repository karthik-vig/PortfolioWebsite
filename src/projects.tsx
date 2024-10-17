import {
    // Card,
    Container,
    Flex,
    Heading,
    Text,
    Link,
    ScrollArea,
    Badge,
    Box,
    Button,
} from '@radix-ui/themes';
import {
    useState,
} from 'react';
import Data from './assets/data/data';


function ProjectInfoCard({
    projectName, 
    technologyStack,
    projectLink,
    imageName,
    children,
    } : {
    projectName: string;
    technologyStack: string[];
    projectLink: string;
    imageName: string;
    children: string;
    }) {

    const [rotateBox, setRotateBox] = useState<{x: number; y: number;}>({x: 0, y: 0});

    const rotateOnMouseMovement = (event: React.MouseEvent) => {
        // get the dimension and location of the element
        const {
            left: boxPositionX,
            top: boxPositionY,
            height: boxHeight,
            width: boxWidth
        } = event.currentTarget.getBoundingClientRect();
        // essentiallly finding the center of the element
        const boxHalfDim = {
            halfHeight: boxHeight / 2,
            halfWidth: boxWidth / 2,
        }
        // calculate the local mouse position
        const mousePosition = {
            x: event.clientX - boxPositionX,
            y: event.clientY - boxPositionY,
        };
        // convert the local mouse position to percentage ratio
        // so that we can assign an angle out of the max allowed
        // angle
        const rotationRatio = {
            x: (mousePosition.x - boxHalfDim.halfWidth) / boxHalfDim.halfWidth,
            y: (mousePosition.y - boxHalfDim.halfHeight) / boxHalfDim.halfHeight,
        };
        // set the + / - degree of rotation based on the quadrant 
        // the mouse is currently in
        const maxRotation = 20;
        const rotationDirection = {
            x: (mousePosition.y >= boxHalfDim.halfHeight)? -1: 1,
            y: (mousePosition.x >= boxHalfDim.halfWidth)? 1: -1,
        };
        // implement a cutoff; so that the user don't
        // feel sick
        let allowRotation = 1;
        const allowRotationCutoff = {
            x: 0.3,
            y: 0.4,
        };
        if ( Math.abs(rotationRatio.x) <= allowRotationCutoff.x &&
        Math.abs(rotationRatio.y) <= allowRotationCutoff.y ) {
            allowRotation = 0;
        }
        const rotateX = Math.abs(maxRotation * rotationRatio.y) * rotationDirection.x * allowRotation;
        const rotateY = Math.abs(maxRotation * rotationRatio.x) * rotationDirection.y * allowRotation;

        const rotate3d = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        console.log(rotate3d);
        setRotateBox({x: rotateX, y: rotateY});
    };

    const resetRotation = () => {
        setRotateBox({x: 0, y: 0});
    }

    return (
        <Box
            className="\
            min-w-72 \
            max-w-72 \
            max-h-auto \
            p-0 \
            my-5 \
            border-1 \
            rounded-lg \
            backdrop-blur-3xl \
            bg-black/25 \
            "
            onMouseMoveCapture={rotateOnMouseMovement}
            onMouseLeave={resetRotation}
            style={{
                transform: `perspective(1000px) rotateX(${rotateBox.x}deg) rotateY(${rotateBox.y}deg)`,
                transition: `transform 400ms ease-out`
            }}
        >
            <Flex
                direction="column"
                gap="2"
            >
            <img 
                src={`/src/assets/images/${imageName}`} 
                alt={imageName}
                className="\
                border-0 \
                rounded-t-md \
                w-auto \
                h-auto \
                "
            />
            <Box
                className="\
                px-4 \
                pb-4 \
                "
            >
                <Flex
                    direction="column"
                    gap="2"
                >
                    <Heading>
                        {projectName}
                    </Heading>
                    <ScrollArea
                        className="\
                        max-h-20 \
                        "
                    >
                        {
                            technologyStack.map((element: string, idx: number) => {
                                return (
                                    <Badge
                                        key={idx}
                                        color="green"
                                        className="\
                                        mx-1 \
                                        my-1 \
                                        "
                                    >
                                        {element}
                                    </Badge>
                                );
                            })
                        }
                    </ScrollArea>
                    <ScrollArea
                        className="\
                        max-h-40 \
                        "
                    >
                        <Text>
                            {children}
                        </Text>
                    </ScrollArea>
                    <Link 
                        href={projectLink}
                        target="_blank"
                        className="\
                        w-16 \
                        mt-1 \
                        "
                    >
                        <Button>
                            Github
                        </Button>
                    </Link>
                </Flex>
            </Box>
            </Flex>
        </Box>
    );
}

export default function Projects() {
    return (
        <Container
            id="projects"
            width="100%"
        >
            <Heading
                as="h3"
                mb="6"
                mt="100px"
                align="left"
            >
                📦 Projects
            </Heading>
            <ScrollArea
                
            >
            <Flex
                direction="row"
                wrap={{
                    xs: "nowrap",
                    sm: "nowrap",
                    md: "wrap"
                }}
                gap="9"
                className="\
                ml-10 \
                p-5 \
                "
                justify="center"
            >
                {
                    Data.projects.map((element: object, idx: number) => {
                        if (!( 
                                "projectName" in element &&
                                "technologyStack" in element &&
                                "links" in element &&
                                typeof element.links == "object" &&
                                element.links &&
                                "github" in element.links &&
                                "description" in element &&
                                "imageName" in element
                            )) return (<></>);
                        return (
                            <ProjectInfoCard
                                key={idx}
                                projectName={element.projectName as string}
                                technologyStack={element.technologyStack as string[]}
                                projectLink={element.links.github as string}
                                imageName={element.imageName as string}
                            >
                                {element.description as string}
                            </ProjectInfoCard>
                        );
                    })
                }
            </Flex>
            </ScrollArea>
        </Container>
    );
}