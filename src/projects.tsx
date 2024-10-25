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
    useMemo,
} from 'react';
import Data from './assets/data/data';

// function used by both the touch input handlers
// as well as the mouse input handlers to tilt the card
function handleCardTiltAction(
    pointerPosition: {x: number; y: number;},
    event: React.MouseEvent | React.TouchEvent,
    setRotateBox: React.Dispatch<React.SetStateAction<{x: number; y: number;}>>,
    setBoxShadow: React.Dispatch<React.SetStateAction<{x: number; y: number;}>>,
) {
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
    const localInputPointerPosition = {
        x: pointerPosition.x - boxPositionX,
        y: pointerPosition.y - boxPositionY,
    };
    // convert the local mouse position to percentage ratio
    // so that we can assign an angle out of the max allowed
    // angle
    const rotationRatio = {
        x: (localInputPointerPosition.x - boxHalfDim.halfWidth) / boxHalfDim.halfWidth,
        y: (localInputPointerPosition.y - boxHalfDim.halfHeight) / boxHalfDim.halfHeight,
    };
    // set the + / - degree of rotation based on the quadrant 
    // the mouse is currently in
    const maxRotation = 10;
    const rotationDirection = {
        x: (localInputPointerPosition.y >= boxHalfDim.halfHeight)? -1: 1,
        y: (localInputPointerPosition.x >= boxHalfDim.halfWidth)? 1: -1,
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

    // const rotate3d = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    // console.log(rotate3d);
    setRotateBox({x: rotateX, y: rotateY});

    // dynamically set the box shadow based on the same
    // rotationRatio calculated earlier
    const maxBoxShadow = {
        x: 30,
        y: 30,
    };
    const boxShadowDirection = {
        x: (localInputPointerPosition.x >= boxHalfDim.halfWidth)? -1: 1,
        y: (localInputPointerPosition.y >= boxHalfDim.halfHeight )? -1: 1,
    }
    const currentBoxShadow = {
        x: Math.abs(maxBoxShadow.x * rotationRatio.x) * boxShadowDirection.x,
        y: Math.abs(maxBoxShadow.y * rotationRatio.y) * boxShadowDirection.y,
    }
    setBoxShadow(currentBoxShadow);
}

// function closure to generate the functions
// needed to handle the touch input on project cards
function generateTouchHandlers(
    setRotateBox: React.Dispatch<React.SetStateAction<{x: number; y: number;}>>,
    setBoxShadow: React.Dispatch<React.SetStateAction<{x: number; y: number;}>>,
) {
    const touchPosition = {
        x: 0,
        y: 0,
    };

    const tiltCard = (event: React.TouchEvent) => {
        const touch = event.touches[0];
        touchPosition.x = touch.clientX;
        touchPosition.y = touch.clientY;
        handleCardTiltAction(
            touchPosition,
            event,
            setRotateBox,
            setBoxShadow,
        );
    }

    // no functionality to be triggered on touch
    const handleTouchStart = () => {};
    
    const handleTouchMove = tiltCard;

    const handleTouchEnd = () => {
        touchPosition.x = 0;
        touchPosition.y = 0;
        setRotateBox({x: 0, y: 0});
        setBoxShadow({x: 0, y: 0});
    };

    return [handleTouchStart, handleTouchMove, handleTouchEnd];
}

// function closure to generate the functions
// needed to handle the mounse input on project cards
function generateMouseHandlers(
    setRotateBox: React.Dispatch<React.SetStateAction<{x: number; y: number;}>>,
    setBoxShadow: React.Dispatch<React.SetStateAction<{x: number; y: number;}>>,
) {
    const rotateOnMouseMovement = (event: React.MouseEvent) => {
        if (window.innerWidth < 500) return;
        const pointerPosition = {
            x: event.clientX,
            y: event.clientY,
        }
        handleCardTiltAction(
            pointerPosition,
            event,
            setRotateBox,
            setBoxShadow
        );
    };

    const resetRotation = () => {
        setRotateBox({x: 0, y: 0});
        setBoxShadow({x: 0, y: 0});
    }

    return [rotateOnMouseMovement, resetRotation];
}

// the project card component; forms a single 
// item in a list of project cards
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
    const [boxShadow, setBoxShadow] = useState<{x: number; y: number;}>({x: 0, y: 0});

    const [
        rotateOnMouseMovement,
        resetRotation,
    ] = useMemo(() => {
        return generateMouseHandlers(
            setRotateBox,
            setBoxShadow
        );
    },[
        setRotateBox,
        setBoxShadow,
    ]);

    const [
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
    ] = useMemo(() => {
        return generateTouchHandlers(
            setRotateBox,
            setBoxShadow
        );
    }, [
        setRotateBox,
        setBoxShadow,
    ]);

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
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
                transform: `perspective(1000px) rotateX(${rotateBox.x}deg) rotateY(${rotateBox.y}deg)`,
                transition: `transform 50ms ease-out, box-shadow 50ms ease-out`,
                boxShadow: `${boxShadow.x}px ${boxShadow.y}px 10px rgba(0,0,0,0.3)`,
            }}
        >
            <Flex
                direction="column"
                gap="2"
            >
            <img 
                src={`/src/assets/images/projects/${imageName}`} 
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
                className="\
                highlight-component \
                "
            >
                📦 Projects
            </Heading>
            <ScrollArea
                
            >
            <Flex
                direction="row"
                wrap={{
                    initial: "nowrap",
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