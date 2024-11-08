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
import { useImmer } from 'use-immer';

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
                    src={`./images/certificates/${children.imageName}`}
                    alt={`Certificate provider logo: ${children.imageName}`}
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

    const [animationTriggered, setAnimationTriggered] = useImmer<boolean>(false);
    const certificateContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const throttle = (callback: () => void, throttleTime: number) => {
            let wait = false;
            return () => {
                if (wait) return;
                callback();
                wait = true;
                setTimeout(() => {
                    wait = false;
                }, throttleTime);
            };
        };
        const scrollTrigger = () => {
            if (certificateContainer.current === null) return;
            const certificateContainerElement = certificateContainer.current;
            const {   
                top: certificateContainerYLocation,
                bottom: certificateContainerBottomHeight 
            } = certificateContainerElement.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            // if the entire element is in view then display it
            if ( certificateContainerBottomHeight <= 1.05 * windowHeight &&
                animationTriggered === false
            ){
                setAnimationTriggered(true);
                return;
            }
            // if the element is large; then when enought of it covers the
            // screen trigger the animation; else reset the animation
            const certificateContainerYLocationToWindowHeightRatio = certificateContainerYLocation / windowHeight;
            if (certificateContainerYLocationToWindowHeightRatio <= 0.2 &&
                animationTriggered === false
            ) {
                setAnimationTriggered(true);
            } else if (
                certificateContainerYLocationToWindowHeightRatio >= 0.95 &&
                animationTriggered === true
            ) {
                setAnimationTriggered(false);
            }
        };
        const throttledScrollTrigger = throttle(scrollTrigger, 25);
        window.addEventListener("scroll", throttledScrollTrigger);
        return () => {
            window.removeEventListener("scroll", throttledScrollTrigger);
        }
    }, [
        animationTriggered,
        setAnimationTriggered,
        certificateContainer,
    ]);
    

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