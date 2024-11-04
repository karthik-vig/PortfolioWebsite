import {
    Container,
    Flex,
    Heading,
    Text,
    Link,
    Box,
} from '@radix-ui/themes';
import {
    // useCallback,
    useEffect,
    useRef,
    useState,
    useContext,
    // useMemo,
} from 'react';
import Data from './assets/data/data';
import GlobalContext, {
    // GlobalContextTemplate,
    // GlobalContextValTemplate,
    // ObserverThresholdValTemplate,
} from './globalContext';
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

    const globalContext = useContext(GlobalContext);
    const setGlobalContextVal = globalContext["setGlobalContextVal"]

    // register the useImmer state variable used to trigger the 
    // animation to the globalContext. Now, the intersection observer
    // can trigger the animation
    // using useEffect is important as whenever the animationTrigger value
    // changes we need to update it, so that the intersection observer has the necessary information
    useEffect(() => {
        if (setGlobalContextVal === undefined) return;
        setGlobalContextVal(state => {
            if (state.componentAnimationTriggerMap === undefined ||
                state.componenentSetAnimationTriggerMap === undefined
            ) {
                state.componentAnimationTriggerMap = {};
                state.componenentSetAnimationTriggerMap = {}; 
            }
            state.componentAnimationTriggerMap["certificates"] = animationTriggered;
            state.componenentSetAnimationTriggerMap["certificates"] = setAnimationTriggered;
            return state;
        })
    },[
        setGlobalContextVal,
        animationTriggered,
        setAnimationTriggered,
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