import Data from './assets/data/data';
import {
    Container,
    Heading,
    Flex,
    Box,
    Text,
} from '@radix-ui/themes';
import {
    CaretRightIcon,
} from '@radix-ui/react-icons'
import { 
    useState,
    useRef,
} from 'react';

function SkillSection({children, title}: {children: string[], title: string}) {
    
    const [dataState, setDataState] = useState("closed");
    const listRef = useRef<HTMLUListElement>(null);

    const changeState = () => {
        if (dataState == "open") {
            setDataState("closed")
        } else {
            setDataState("open")
        }
        if (listRef?.current) {
            // get the list box height
            const listHeight = listRef.current.clientHeight;
            // set the list box height and animation duration 
            // based on the list box height
            const cssRootElement = document.querySelector(":root");
            if (cssRootElement != null && 
                "style" in cssRootElement &&
                typeof cssRootElement.style == "object" &&
                cssRootElement.style != null &&
                "setProperty" in cssRootElement.style &&
                typeof cssRootElement.style.setProperty == "function") {
                const animationTime = "400"; // String((300 / listHeight) * 50)
                cssRootElement.style.setProperty("--height-animation-rate", animationTime + "ms")
                cssRootElement.style.setProperty("--skills-box-height", String(listHeight)+"px");
                // console.log(String((listHeight / 50) * 100) + "ms")
            }
        }
    };

    return (
    <Box 
        className="\
        my-2 \
        ml-10 \
        "
    >
        <Flex
            direction="row"
            gap="2"
            onClick={changeState}
            className="cursor-pointer"
        >
            <Text
                weight="bold"
                size={{
                    initial: "4",
                    xs: "4",
                    sm: "4",
                    md:"5",
                }}
                className="\
                drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)] \
                "
            >
                {title}
            </Text>
            <CaretRightIcon
                data-state={dataState}
                className="\
                            h-5 \
                            w-5 \
                            mt-1 \
                            data-[state=open]:animate-rotate90 \
                            data-[state=closed]:animate-unrotate90 \
                            data-[state=open]:rotate-90 \
                            data-[state-closed]:-rotate-90 \
                            "
            />
        </Flex>
        <Box
            data-state={dataState}
            className="\
            overflow-y-hidden \
            ml-10 \
            data-[state=closed]:animate-decheight \
            data-[state=open]:animate-incheight \
            data-[state=closed]:h-0 \
            "
        >
            <ul 
                ref={listRef}
            >
                {
                    children.map( (element: string, idx: number) => {
                        return (
                            <li
                                key={idx}
                            >   
                                <Text
                                    className="\
                                    drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)] \
                                    "
                                >
                                    {`⭐️ ${element}`}
                                </Text>
                            </li>
                        );
                    })
                }
            </ul>
        </Box>
    </Box>
    );
}

export default function Skills() {
    return (
        <Container
            id="skills"
        >
            <Heading
                as="h3"
                mb="6"
                mt="100px"
                align="left"
                className="\
                drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)] \
                "
            >
                💪 Skills
            </Heading>
            <Flex
                direction="column"
            >
                {
                    Data.skills.map((element: object, idx: number) => {
                        if (!("skillName" in element && "skills" in element)) {
                            return (<></>);
                        }
                        return (
                            <SkillSection
                                key={idx}
                                title={element.skillName as string}
                            >
                                {element.skills as string[]}
                            </SkillSection>
                        );
                    })
                }
            </Flex>
        </Container>
    );
}