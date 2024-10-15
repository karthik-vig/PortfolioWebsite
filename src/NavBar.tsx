import { 
    Heading,
    Link,
    Flex,
    Button,
    Box,
 } from '@radix-ui/themes'
import Data from './assets/data/data.ts'
import {  
    useState,
    useEffect,
    useRef,
} from 'react';


function ToggleNavBar({
    toggle,
}:{
    toggle: string;
}) {

    const Line = ({
        toggle,
        position,
    }:{
        toggle: string;
        position: number;
    }) => {
        let cssClassName = "\
            w-5 \
            h-[2px] \
            my-[5px] \
            bg-slate-100 \
            border-0 \
            rounded-lg \
            ";
        switch(position) {
            case 0:
                cssClassName += (toggle === "true")? " rotate-45 translate-y-[6.5px]": " rotate-0 translate-y-0";
                break;
            case 1:
                cssClassName += (toggle === "true")? " opacity-0": " opacity-1";
                break;
            case 2:
                cssClassName += (toggle === "true")? " -rotate-45 -translate-y-[6.5px]": " rotate-0 translate-y-0";
                break;
        }
        return (
            <div
                className={cssClassName}
            >
            </div>
        );
    };

    return (
        <Box
            data-toggle={toggle}
            className="\
            p-1 \
            max-h-8 \
            max-w-8 \
            "
        >
            <Line 
                toggle={toggle}
                position={0}
            />
            <Line 
                toggle={toggle}
                position={1}
            />
            <Line 
                toggle={toggle}
                position={2}
            />
        </Box>
    );
}

function NavBarTab({
    children, 
    link,
    setShowNavBar,
}:{
    children: string;
    link: string;
    setShowNavBar: React.Dispatch<React.SetStateAction<string>>;
}) {
    return (
        <Link 
            href={link}
            underline="none"
        >
            <Heading
                as="h6"
                size={{
                    sm: "4",
                    md: "4",
                    lg: "4",
                }}
                weight="regular"
                style={{
                    marginLeft: "20px", 
                    marginRight: "20px",
                    color: "whitesmoke",
                }}
                className="\
                border-transparent \
                rounded-md \
                hover:bg-black/30 \
                pl-3 \
                pr-3 \
                pt-2 \
                pb-2 \
                "
                onClick={() => setShowNavBar("false")}
            >
                {children}
            </Heading>
        </Link>
    );
}

export default function NavBar() {
    const [ changeNavBarBg ,setChangeNavBarBg ] = useState("false");
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            setChangeNavBarBg("true");
        } else {
            setChangeNavBarBg("false");
        }
    });

    // swap out the entire CSS className based on the screen size
    // necessary to deploy different animation action based on the 
    // screen size.
    const largeScreenCssClassName = "\
    fixed top-0 z-40 \
    min-h-20 \
    w-[100%] \
    data-[change-nav-bar-bg=true]:bg-black/30 \
    data-[change-nav-bar-bg=true]:backdrop-blur-sm \
    data-[change-nav-bar-bg=false]:bg-transparent \
    data-[change-nav-bar-bg=true]:animate-bgFadeIn \
    data-[change-nav-bar-bg=false]:animate-bgFadeOut \
    ";
    const smallScreenCssClassName =  "\
    fixed z-40 \
    data-[show-nav-bar=false]:-top-[var(--nav-bar-height)] \
    data-[show-nav-bar=true]:top-0 \
    data-[show-nav-bar=false]:animate-slideIn \
    data-[show-nav-bar=true]:animate-slideOut \
    bg-black/30 \
    backdrop-blur-sm \
    min-h-20 \
    w-[100%] \
    ";

    const smallScreenBreakPointSize = 1024;

    const [ cssClassName, setCssClassName ] = useState<string>(largeScreenCssClassName);

    const navBar = useRef<HTMLDivElement>(null);

    const [ showNavBar, setShowNavBar ] = useState<string>("false");

    const [ toggleNavBarButtonDisplay, setToggleNavBarButtonDisplay ] = useState<boolean>(true);

    const changeShowNavBar = () => {
        if (showNavBar === "true") {
            setShowNavBar("false");
        } else {
            setShowNavBar("true");
        }
    }

    const changeNavBarClass = () => {
        if (window.innerWidth < smallScreenBreakPointSize) {
            setCssClassName(smallScreenCssClassName);
            setToggleNavBarButtonDisplay(false);
        } else {
            setCssClassName(largeScreenCssClassName);
            setToggleNavBarButtonDisplay(true);
        }
    };

    window.addEventListener('resize', changeNavBarClass);

    useEffect(changeNavBarClass, [
        setCssClassName,
        largeScreenCssClassName,
        smallScreenCssClassName,
        navBar,
        smallScreenBreakPointSize,
        setToggleNavBarButtonDisplay,
    ]);

    useEffect(() => {
        if (window.innerWidth > smallScreenBreakPointSize ||
            !navBar.current) return;
        const navBarheight = navBar.current.clientHeight;
        console.log(navBarheight)
        const rootElement = document.querySelector(":root");
        if (rootElement !== null &&
            "style" in rootElement &&
            typeof rootElement.style === "object" &&
            rootElement.style !== null &&
            "setProperty" in rootElement.style &&
             typeof rootElement.style.setProperty === "function"
         ) {
            rootElement.style.setProperty("--nav-bar-height", `${navBarheight}px`);
         }
    }, [
        navBar,
        smallScreenBreakPointSize,
    ]);

    return (
        <>
        <Button
            hidden={toggleNavBarButtonDisplay}
            onClick={changeShowNavBar}
            className="\
            fixed top-3 left-3 z-50 \
            bg-transparent \
            max-w-8 \
            max-h-8 \
            "
        >
            <ToggleNavBar 
                toggle={showNavBar}
            />
        </Button>
        <Flex
            data-change-nav-bar-bg={changeNavBarBg}
            data-show-nav-bar={showNavBar}
            direction={{
                xs: "column",
                sm: "column",
                md: "row",
                lg: "row",
                xl: "row",
            }}
            gap="3"
            justify="center"
            align="center"
            className={cssClassName}
            ref={navBar}
        >
            {
                Data.navBar.map((element: object, idx: number) => {
                    if (!("link" in element && "title" in element)){
                        return (<></>);
                    } 
                    return (
                        <NavBarTab
                            key={idx}
                            link={element.link as string}
                            setShowNavBar={setShowNavBar}
                        >   
                            {element.title as string}
                        </NavBarTab>
                    );
                })
            }
        </Flex>
        </> 
    );
}