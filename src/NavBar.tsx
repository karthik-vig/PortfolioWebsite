import { 
    Heading,
    Link,
    Flex,
 } from '@radix-ui/themes'
import Data from './assets/data/data.ts'
import {  
    useState,
} from 'react';

function NavBarTab({children, link}: {children: string, link: string}) {
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
    return (  
        <Flex
            data-change-nav-bar-bg={changeNavBarBg}
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
            className="\
            fixed top-0 z-50 \
            min-h-20 \
            w-[100%] \
            data-[change-nav-bar-bg=true]:bg-black/30 \
            data-[change-nav-bar-bg=true]:backdrop-blur-sm \
            data-[change-nav-bar-bg=false]:bg-transparent \
            data-[change-nav-bar-bg=true]:animate-bgFadeIn \
            data-[change-nav-bar-bg=false]:animate-bgFadeOut \
            "
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
                        >   
                            {element.title as string}
                        </NavBarTab>
                    );
                })
            }
        </Flex> 
    );
}