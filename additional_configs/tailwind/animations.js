import { transform } from "typescript";


const Animations = {
    keyframes: {
        slideOut: {
            from: {
                // transform: "translateY(-100px)"
                top: "-80px"
            },
            to: {
                // transform: "translateY(0px)"
                top: "0px"
            }
        },
        slideIn: {
            from: {
                // transform: "translateY(0px)"
                top: "0px"
            },
            to: {
                // transform: "translateY(-100px)"
                top: "-80px"
            }
        },
        rotate90: {
            from: {
                transform: "rotate(0deg)"
            },
            to: {
                transform: "rotate(90deg)"
            }
        },
        unrotate90: {
            from: {
                transform: "rotate(90deg)"
            },
            to: {
                transform: "rotate(0deg)"
            }
        },
        incheight: {
            from: {
                height: "0px",
            },
            to: {
                height: "var(--skills-box-height)",

            }
        },
        decheight: {
            from: {
                height: "var(--skills-box-height)",
            },
            to: {
                height: "0px",
            }
        },
    },
    animation: {
        slideOut: "slideOut 400ms ease-in-out",
        slideIn: "slideIn 500ms ease-in-out",
        rotate90: "rotate90 200ms ease-in",
        unrotate90: "unrotate90 200ms ease-in",
        incheight: "incheight var(--height-animation-rate) ease-in-out",
        decheight: "decheight var(--height-animation-rate) ease-in-out",
    }
};

export default Animations;