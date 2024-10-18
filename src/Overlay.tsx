import {
    // Flex,
    Box,
} from '@radix-ui/themes';

export default function Overlay({
    screenDisplayWidth,
    triggerOverlay,
}:{
    screenDisplayWidth: number | undefined;
    triggerOverlay: boolean;
}) {

    const cssClassName = "\
    absolute \
    top-0 \
    left-0 \
    z-50 \
    h-[100vh] \
    bg-white/20 \
    backdrop-blur-lg \
    ";
    return (
        // <Flex
        //     direction="column"
        //     justify="center"
        //     align="center"
        //     className="\
        //     bg-white/30 \
        //     backdrop-blur-lg \
        //     "
        // >
            <Box
                className={cssClassName}
                width={String(screenDisplayWidth)+"px"}
                hidden={!triggerOverlay}
            >
                <img 
                    src="./src/assets/images/personal_portfolio_icon_bg.svg"
                    alt="logo background"
                    className="\
                    absolute \
                    top-[37.5vh] \
                    left-[37.5vw] \
                    z-10 \
                    max-h-[25vh] \
                    max-w-[25vw] \
                    min-h-[25vh] \
                    min-w-[25vw] \
                    "
                />
                <img 
                    src="./src/assets/images/personal_portfolio_icon_fg.svg"
                    alt="logo foreground"
                    className="\
                    absolute \
                    top-[37.5vh] \
                    left-[37.5vw] \
                    z-20 \
                    max-h-[25vh] \
                    max-w-[25vw] \
                    min-h-[25vh] \
                    min-w-[25vw] \
                    animate-spin \
                    "
                />
            </Box>
        // </Flex>
    );
}