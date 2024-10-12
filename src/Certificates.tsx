import {
    Container,
    Flex,
    Heading,
    Text,
    Link,
    Box,
} from '@radix-ui/themes';
import {
    useEffect,
    useRef,
    useState,
} from 'react';
import Data from './assets/data/data';

interface CertificateTemplate {
    certificateTitle: string;
    provider: string;
    link: string;
    imageName: string;
}

function CertificateInfo({
    children,
    animationTriggered,
    position,
}:{
    children: CertificateTemplate;
    animationTriggered: boolean;
    position: number;
}) {
    const [startAnimation, setStartAnimation ] = useState<string>("false");
    useEffect(() => {
        if (animationTriggered) {
            setTimeout(setStartAnimation, position * 150, "true")
        } else {
            setStartAnimation("false")
        }
    }, [
        setStartAnimation,
        animationTriggered,
        position,
    ]);

    return (
        <Box
            data-animationstate={startAnimation}
            className="\
            border-1 \
            rounded-md \
            p-4 \
            data-[animationstate=true]:animate-popIntoExistence \
            data-[animationstate=true]:opacity-1 \
            data-[animationstate=false]:opacity-0 \
            "
            // bg-black/25 \
            // backdrop-blur-lg \
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
            <div
                className="\
                border-1 \
                rounded-xl \
                bg-slate-200 \
                min-w-[100%] \
                min-h-1 \
                max-h-1 \
                mt-5 \
                "
            >
            </div>
        </Box>
    );
}

export default function Certificates(){

    const [animationTriggered, setAnimationTriggered] = useState<boolean>(false);
    const certificateContainer = useRef<HTMLDivElement>(null);
    window.addEventListener("scroll", ()=>{
        const certificatesContainerXTopLocation = certificateContainer.current?.getBoundingClientRect().top;
        const certificatesContainerXBottomLocation = certificateContainer.current?.getBoundingClientRect().bottom;
        if (certificatesContainerXTopLocation === undefined ||
            certificatesContainerXBottomLocation === undefined
        ) return;
        const windowHeight = window.innerHeight;
        if ( certificatesContainerXBottomLocation <= 1.05 * windowHeight && 
            animationTriggered === false
        ) {
            // console.log("bottom animation triggered", animationTriggered)
            setAnimationTriggered(true);
            return;
        }
        const experienceContainerXTopLocationToWindowHeightRatio = certificatesContainerXTopLocation / windowHeight;
        if ( experienceContainerXTopLocationToWindowHeightRatio <= 0.4 &&
            animationTriggered === false
        ) { 
            // console.log("top animation triggered", animationTriggered)
            setAnimationTriggered(true);
        } else if ( experienceContainerXTopLocationToWindowHeightRatio >= 0.95 &&
            animationTriggered === true
        ){
            // console.log("reset animation triggered", animationTriggered)
            setAnimationTriggered(false);
        }
    });

    return(
        <Container
            id="certificates"
            width="100%"
            ref={certificateContainer}
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
                                    animationTriggered={animationTriggered}
                                    position={idx}
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