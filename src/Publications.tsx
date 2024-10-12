import {
    Container,
    Flex,
    Box,
    Heading,
    Text,
    Link,
} from '@radix-ui/themes';
import {
    ArrowTopRightIcon,
} from '@radix-ui/react-icons';
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
                    size="6"
                >   
                    <Link
                        href={children.link}
                        target="_blank"
                        className="\
                        text-slate-100 \
                        "
                    >   
                        <Flex
                            direction="row"
                            gap="0"
                        >
                            {children.title}
                            <ArrowTopRightIcon 
                                className="\
                                mt-2 \
                                ml-1 \
                                scale-150 \
                                text-teal-500
                                "
                            />
                        </Flex>
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