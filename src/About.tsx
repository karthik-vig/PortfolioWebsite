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
    linkedin: string;
    github: string;
}


function SVGIcons({
    svgName,
}:{
    svgName: string;
}) {
    return (
        <img 
            src={`./images/${svgName}.svg`}
            alt={`${svgName} svg icon`}
            className="inline m-2 h-7 w-7"
        />
    )
}

function ContactInfo({
    children,
}:{
    children: ContactInfoTemplate
}) {
    const linkRenderSetting: LinkProps = {
        target: "_black",
        weight: "bold",
        size: {
            initial: "3",
            xs: "3",
            sm: "3",
            md: "6",
        },
        className: "\
        text-red-400 \
        hover:text-red-500 \
        "
    };
    return (
        <Flex
            direction={{
                initial: "column",
                xs: "column",
                sm: "column",
                md: "row",
            }}
            gap="2"
            justify="center"
            align="center"
            className="\
            highlight-component \
            "
        >
            <Link
                href={`mailto:${children.email}`}
                target={linkRenderSetting.target}
                weight={linkRenderSetting.weight}
                size={linkRenderSetting.size}
                color={linkRenderSetting.color}
                className={linkRenderSetting.className}
            >
                <SVGIcons 
                    svgName='mail'
                />
                {children.email}
            </Link>
            <Link
                href={children.github}
                target={linkRenderSetting.target}
                weight={linkRenderSetting.weight}
                size={linkRenderSetting.size}
                color={linkRenderSetting.color}
                className={linkRenderSetting.className}
            >
                <SVGIcons 
                    svgName='github'
                />
                Github
            </Link>
            <Link
                href={children.linkedin}
                target={linkRenderSetting.target}
                weight={linkRenderSetting.weight}
                size={linkRenderSetting.size}
                color={linkRenderSetting.color}
                className={linkRenderSetting.className}
            >
                <SVGIcons 
                    svgName='linkedin'
                />
                Linkedin
            </Link>
        </Flex>
    );
}

export default function About() {
    const emptyContactInfo: ContactInfoTemplate = {
        name: "",
        email: "",
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
                    initial: "9",
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
                    mb="5%"
                    mt="5%"
                    align="center"
                    size={{
                        initial: "7",
                        xs: "7",
                        sm: "7",
                        md: "9"
                    }}
                    className="\
                    highlight-text \
                    "
                >
                    🎯 <img 
                            src="./images/aboutme.svg"
                            alt="about me title"
                            className="\
                            inline \
                            w-auto \
                            h-16 \
                            sm:h-20 \
                            md:h-20 \
                            lg:h-32 \
                            p-0 \
                            m-0 \
                            "
                        /> 🎯
                </Heading>
                <Text
                    size={{
                        initial: "3",
                        xs: "3",
                        sm: "3",
                        md: "6",
                        lg: "7",
                        xl: "7",
                    }}
                    className="\
                    mx-10 \
                    text-justify \
                    highlight-text \
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