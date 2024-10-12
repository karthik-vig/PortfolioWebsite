import {
    Container,
    Flex,
    Heading,
    Text,
    Link,
    Box,
} from '@radix-ui/themes';
import Data from './assets/data/data';

interface CertificateTemplate {
    certificateTitle: string;
    provider: string;
    link: string;
    imageName: string;
}

function CertificateInfo({
    children,
}:{
    children: CertificateTemplate;
}) {

    return (
        <Box
            className="\
            border-1 \
            rounded-md \
            bg-black/25 \
            backdrop-blur-lg \
            p-4 \
            "
        >
            <Flex
                direction="row"
                gap="5"
                justify="between"
            >
                <Flex
                    direction="column"
                    gap="0"
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
                            color="orange"
                        >
                            {children.certificateTitle}
                        </Link>
                    </Heading>
                    <Text
                        weight="bold"
                        className="\
                        text-slate-100 \
                        "
                    >
                        {children.provider}
                    </Text>
                </Flex>
                <img 
                    src={`./src/assets/images/${children.imageName}`}
                    className="\
                    h-32 \
                    w-32 \
                    border-0 \
                    rounded-lg \
                    "
                />
            </Flex>
        </Box>
    );
}

export default function Certificates(){

    return(
        <Container
            id="certificates"
        >
            <Heading
                as="h3"
                mb="6"
                mt="100px"
                align="left"
            >
                📜 Certificates
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
                    Data.certificates.map((element: object, idx: number) => {
                        return (
                            <CertificateInfo
                                key={idx}
                            >
                                {element as CertificateTemplate}
                            </CertificateInfo>
                        );
                    })
                }
            </Flex>
        </Container>
    );
}