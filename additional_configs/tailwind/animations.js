

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
        }
    },
    animation: {
        slideOut: "slideOut 400ms ease-in-out",
        slideIn: "slideIn 500ms ease-in-out"
    }
};

export default Animations;