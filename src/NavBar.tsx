import { 
    Box,
    Heading,
    Link,
    Flex,
    // Card,
 } from '@radix-ui/themes'
import Data from './assets/data/data.ts'

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
    return (
        <Box
            style={{
                padding: "20px"
            }}
            width="100%"
            overflowY="auto"
            className="\
            group \
            fixed top-0 left-0 \
            "
        >   
            {/* <Card
                className="\
                w-[100%]
                relative \
                xs:group-[:not(:hover)]:-top-[300px] \
                sm:group-[:not(:hover)]:-top-[300px] \
                md:group-[:not(:hover)]:-top-[80px] \
                group-hover:animate-slideOut \
                group-[:not(:hover)]:animate-slideIn \
                bg-transparent \
                "
            > */}
            <Flex
                direction={{
                    xs: "column",
                    sm: "column",
                    md: "row",
                    lg: "row",
                    xl: "row",
                }}
                gap="3"
                justify="center"
                className="\
                relative \
                xs:group-[:not(:hover)]:-top-[300px] \
                sm:group-[:not(:hover)]:-top-[300px] \
                md:group-[:not(:hover)]:-top-[80px] \
                group-hover:animate-slideOut \
                group-[:not(:hover)]:animate-slideIn \
                bg-transparent \
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
            {/* </Card>  */}
        </Box>
    );
}