import Data from './assets/data/data';
import {
    Container,
    Text,
    Heading
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
            <Text
                size={{
                    xs: "2",
                    sm: "2",
                    md: "4",
                    lg: "4",
                    xl: "5",
                }}
            >
                {("profile" in Data.about[0])? Data.about[0].profile as string: ""}
            </Text>
        </Container>
    );
}