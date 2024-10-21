import {
    Flex,
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
    data-[opacity-change=full]:animate-overlayOpacityFadeOut \
    data-[opacity-change=none]:animate-overlayOpacityFadeOut \
    ";
    return (
        <Flex
            direction="column"
            gap="2"
            //justify="center"
            align="center"
            data-opacity-change={triggerOverlay? "full": "none"}
            className={cssClassName}
            width={String(screenDisplayWidth)+"px"}
            hidden={!triggerOverlay}
        >
            <Box
                className="\
                relative top-[10vh] \
                h-[40%] w-[40%] \
                sm:h-[50%] md:w-[50%] \
                "
            >
                <img 
                    src="./src/assets/images/personal_portfolio_icon_bg.svg"
                    alt="logo background"
                    className="\
                    absolute \
                    top-0 \
                    left-0 \
                    z-10 \
                    h-[100%] w-[100%] \
                    "
                />
                <img 
                    src="./src/assets/images/personal_portfolio_icon_fg.svg"
                    alt="logo foreground"
                    className="\
                    absolute \
                    top-0 left-[25%] \
                    z-20 \
                    h-[100%] w-[50%] \
                    animate-gearWheelSpin \
                    "
                />
            </Box>
            <img 
                src="./src/assets/images/website enter text.svg"
                alt="introductary hello text"
                className="\
                h-auto \
                w-[100%] \
                p-10 \
                min-h-20 \
                min-w-40 \
                max-h-[300px] \
                max-w-[800px] \
                m-1 \
                md:mt-[30vh] \
                "
            />
        </Flex>
    );
}