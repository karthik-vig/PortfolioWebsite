import {
    Container,
    Flex,
    Heading,
    Text,
    Link,
    Box,
} from '@radix-ui/themes';
import {
    useCallback,
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
            data-[animationstate=true]:animate-popIntoExistence \
            data-[animationstate=true]:opacity-1 \
            data-[animationstate=false]:opacity-0 \
            bg-black/30 \
            backdrop-blur-md \
            p-3 \
            border-0 \
            rounded-md \
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
                        highlight-text \
                        "
                        size={{
                            initial: "4",
                            xs: "4",
                            sm: "4",
                            md:"7",
                        }}
                    >   
                        <Link
                            href={children.link}
                            target="_blank"
                            className="\
                            text-orange-400 \
                            hover:text-orange-500 \
                            "
                        >
                            {children.certificateTitle}
                        </Link>
                    </Heading>
                    <Text
                        weight="bold"
                        className="\
                        text-slate-100 \
                        highlight-text \
                        "
                        size={{
                            initial: "3",
                            xs: "3",
                            sm: "3",
                            md:"6",
                        }}
                    >
                        {children.provider}
                    </Text>
                </Flex>
                <img 
                    src={`./src/assets/images/certificates/${children.imageName}`}
                    className="\
                    h-32 \
                    w-auto \
                    max-w-[50%] \
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

    const handleCertificateAnimationTrigger = useCallback(()=>{
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
    }, [
        animationTriggered,
        setAnimationTriggered,
    ]);

    useEffect( () => {
        window.addEventListener("scroll", handleCertificateAnimationTrigger);
        return () => {
            window.removeEventListener("scroll", handleCertificateAnimationTrigger);
        }
    }, [
        handleCertificateAnimationTrigger,
    ])
    

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
                className="\
                highlight-text \
                "
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