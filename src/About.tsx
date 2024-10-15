import Data from './assets/data/data';
import {
    Container,
    Text,
    Heading,
    Flex,
    Link,
    LinkProps,
} from '@radix-ui/themes';

interface ContactInfoTemplate {
    name: string;
    email: string;
    address: string;
    linkedin: string;
    github: string;
}

function Seperator() {
    return (
        <div
            className="\
            xs:opacity-0 \
            sm:opacity-1 \
            md:opacity-1 \
            lg:opacity-1 \
            xl:opacity-1 \
            xs:min-w-[100%] \
            sm:min-w-[100%] \
            md:min-w-1 \
            lg:min-w-1 \
            xl:min-w-1 \
            xs:min-h-1 \
            sm:min-h-1 \
            md:min-h-5 \
            lg:min-h-5 \
            xl:min-h-5 \
            bg-slate-200 \
            border-1 \
            rounded-lg \
            "
        >
        </div>
    );
}

function ContactInfo({
    children,
}:{
    children: ContactInfoTemplate
}) {
    const linkRenderSetting: LinkProps = {
        target: "_black",
        weight: "regular",
        size: {
            xs: "3",
            sm: "3",
            md: "6",
        },
        color: "red",
        className: ""
    };
    return (
        <Flex
            direction={{
                xs: "column",
                sm: "column",
                md: "row",
            }}
            gap="2"
            justify="center"
            align="center"
        >
            <Heading>
                ✉️
            </Heading>
            <Link
                href={`mailto:${children.email}`}
                target={linkRenderSetting.target}
                weight={linkRenderSetting.weight}
                size={linkRenderSetting.size}
                color={linkRenderSetting.color}
            >
                {children.email}
            </Link>
            <Seperator />
            <Link
                href={children.github}
                target={linkRenderSetting.target}
                weight={linkRenderSetting.weight}
                size={linkRenderSetting.size}
                color={linkRenderSetting.color}
            >
                Github
            </Link>
            <Seperator />
            <Link
                href={children.linkedin}
                target={linkRenderSetting.target}
                weight={linkRenderSetting.weight}
                size={linkRenderSetting.size}
                color={linkRenderSetting.color}
            >
                Linkedin
            </Link>
        </Flex>
    );
}

export default function About() {
    const emptyContactInfo: ContactInfoTemplate = {
        name: "",
        email: "",
        address: "",
        linkedin: "",
        github: "",
    };
    return (
        <Container 
            id="about"
            mt="100px"
            className="\
            h-[100vh] \
            "
        >
            <Flex
                mt={{
                    xs: "9",
                    sm: "9",
                    md: "5",
                }}
                direction="column"
                gap="5"
                className="\
                min-h-[80vh] \
                "
            >
                <Heading
                    mb="10%"
                    mt="10%"
                    align="center"
                    size={{
                        xs: "7",
                        sm: "7",
                        md: "9"
                    }}
                    className="\
                    font-pacifico \
                    "
                >
                    🎯 About Me 🎯
                    {/* <p
                        className="font-pacifico"
                    >
                        Hello
                    </p> */}
                </Heading>
                <Text
                    size={{
                        xs: "3",
                        sm: "3",
                        md: "6",
                        lg: "7",
                        xl: "7",
                    }}
                    className="\
                    mx-10 \
                    text-justify \
                    "
                >
                    {("profile" in Data.about[0])? Data.about[0].profile as string: ""}
                </Text>
                <ContactInfo>
                    {("contactInfo" in Data.about[0])? Data.about[0].contactInfo as ContactInfoTemplate: emptyContactInfo}
                </ContactInfo>
            </Flex>
        </Container>
    );
}