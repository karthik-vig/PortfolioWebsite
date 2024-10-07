import Data from './assets/data/data';
import {
    Container,
    Text,
    Heading,
    Box,
} from '@radix-ui/themes';

export default function About() {
    return (
        <Container 
            id="about"
            mt="100px"
        >
            <Heading
                mb="6"
                align="center"
            >
                🎯 About Me 🎯
            </Heading>
            <Box
                className="\
                mx-10 \
                "
            >
                <Text
                    size={{
                        xs: "3",
                        sm: "3",
                        md: "3",
                        lg: "3",
                        xl: "5",
                    }}
                >
                    {("profile" in Data.about[0])? Data.about[0].profile as string: ""}
                </Text>
            </Box>
        </Container>
    );
}