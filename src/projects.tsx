import {
    Card,
    Container,
    Flex,
    Heading,
    Text,
    Link,
    ScrollArea,
    Badge,
    Box,
} from '@radix-ui/themes';
import Data from './assets/data/data';

function ProjectInfoCard({
    projectName, 
    technologyStack,
    projectLink,
    imageName,
    children,
    } : {
    projectName: string,
    technologyStack: string[],
    projectLink: string,
    imageName: string,
    children: string,
    }) {
    // animate the scale part
    return (
        <Card
            className="\
            w-80 \
            max-h-auto \
            hover:scale-105 \
            [:not(:hover)]:scale-100 \
            hover:animate-incscale \
            [&:not(:hover)]:animate-decscale \
            p-0 \
            my-5 \
            "
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
                        {/* <Flex
                            direction="row"
                            wrap="wrap"
                            gap="1"

                        > */}
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
                        {/* </Flex> */}
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
                        "
                    >
                        Github
                    </Link>
                </Flex>
            </Box>
            </Flex>
        </Card>
    );
}

export default function Projects() {
    return (
        <Container
            id="projects"
        >
            <Heading
                as="h3"
                mb="6"
                mt="100px"
                align="left"
            >
                📦 Projects
            </Heading>
            <Flex
                direction="row"
                wrap="wrap"
                gap="9"
                className="\
                ml-10 \
                "
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
        </Container>
    );
}