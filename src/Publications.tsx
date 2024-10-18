import {
    Container,
    Flex,
    Box,
    Heading,
    Text,
    Link,
} from '@radix-ui/themes';
import Data from './assets/data/data';

interface PublicationInfoTemplate {
    title: string;
    publisher: string;
    link: string;
    date: string;
}

function PublicationInfo({ 
    children,
 }:{ 
    children: PublicationInfoTemplate 
}) {
    return (
        <Box>
            <Flex
                direction="column"
                gap="1"
            >
                <Heading
                    className="\
                    mb-3 \
                    "
                    size={{
                        initial: "3",
                        xs: "3",
                        sm: "3",
                        md:"5",
                    }}
                >   
                    <Link
                        href={children.link}
                        target="_blank"
                        className="\
                        text-slate-100 \
                        "
                    >  
                        {children.title}
                    </Link>
                </Heading>
                <Text>
                    {`${children.publisher} (${children.date})`}
                </Text>
            </Flex>
        </Box>
    );
}

export default function Publications() {
    return (
        <Container
            id="publications"
            width="100%"
        >
            <Heading
                as="h3"
                mb="6"
                mt="100px"
                align="left"
            >
                📜 Publications
            </Heading>
            <Flex
                direction="column"
                gap="5"
                className="\
                ml-10 \
                mr-10 \ 
                "
                justify="center"
            >
                {
                    Data.publications.map((element: object, idx: number) => {
                        return (
                            <PublicationInfo
                                key={idx}
                            >
                                {element as PublicationInfoTemplate}
                            </PublicationInfo>
                        );
                    })
                }
            </Flex>
        </Container>
    );
}