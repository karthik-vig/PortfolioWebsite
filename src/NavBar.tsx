import { 
    Heading,
    Link,
    Flex,
    Button,
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
        const cssClassName = "\
            min-w-10 \
            max-w-10 \
            min-h-1 \
            max-h-1 \
            my-1 \
            bg-slate-100 \
            border-0 \
            rounded-lg \
            data-[toggle=true]:data-[position=0]:rotate-45 \
            data-[toggle=true]:data-[position=0]:translate-y-[0.7rem] \
            data-[toggle=false]:data-[position=0]:rotate-0 \
            data-[toggle=false]:data-[position=0]:translate-y-0 \
            data-[toggle=true]:data-[position=1]:opacity-0 \
            data-[toggle=false]:data-[position=1]:opacity-1 \
            data-[toggle=true]:data-[position=2]:-rotate-45 \
            data-[toggle=true]:data-[position=2]:-translate-y-[0.7rem] \
            data-[toggle=false]:data-[position=2]:rotate-0 \
            data-[toggle=false]:data-[position=2]:translate-y-0 \
            data-[toggle=true]:data-[position=0]:animate-topLineToCross \
            data-[toggle=false]:data-[position=0]:animate-topLineToUnCross \
            data-[toggle=true]:data-[position=2]:animate-bottomLineToCross \
            data-[toggle=false]:data-[position=2]:animate-bottomLineToUnCross \
            ";
        return (
            <div
                data-toggle={toggle}
                data-position={String(position)}
                className={cssClassName}
            >
            </div>
        );
    };

    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            data-toggle={toggle}
            className="\
            p-1 \
            max-h-auto \
            max-w-10 \
            mt-5 \
            ml-5 \
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
        </Flex>
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
                    initial: "7",
                    xs: "7",
                    sm: "7",
                    md: "4",
                    lg: "4",
                }}
                weight="bold"
                style={{
                    marginLeft: "20px", 
                    marginRight: "20px",
                    // color: "whitesmoke",
                }}
                className="\
                border-transparent \
                rounded-md \
                pl-3 \
                pr-3 \
                pt-2 \
                pb-2 \
                hover:text-orange-400 \
                hover:animate- \
                text-slate-200 \
                "
                // hover:bg-black/30 \
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
                initial: "column",
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
            <img
                height="50px"
                width="50px"
                src="./src/assets/images/personal_portfolio_icon.svg"
                alt="personal portfolio logo"
                className="\
                max-[520px]:mt-5 \
                drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)] \
                "
            />
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