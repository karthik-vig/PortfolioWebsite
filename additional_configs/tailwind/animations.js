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
        incscale: {
            from: {
                transform: "scale(1)"
            },
            to: {
                transform: "scale(1.05)"
            }
        },
        decscale: {
            from: {
                transform: "scale(1.05)"
            },
            to: {
                transform: "scale(1)"
            }
        },
        slideOutLeft: {
            from: {
                opacity: "0",
                transform: "translateX(50px)"
            }, 
            to: {
                opacity: "1",
                transform: "translateX(0px)"
            }
        },
        slideOutRight: {
            from: {
                opacity: "0",
                transform: "translateX(-50px)"
            }, 
            to: {
                opacity: "1",
                transform: "translateX(0px)"
            }
        },
        popIntoExistence: {
            from: {
                opacity: "0",
                transform: "translateY(-50px)"
            },
            to: {
                opacity: "1",
                transform: "translateY(0px)"
            }
        }
    },
    animation: {
        slideOut: "slideOut 400ms ease-in-out",
        slideIn: "slideIn 500ms ease-in-out",
        rotate90: "rotate90 200ms ease-in",
        unrotate90: "unrotate90 200ms ease-in",
        incheight: "incheight var(--height-animation-rate) ease-in-out",
        decheight: "decheight var(--height-animation-rate) ease-in-out",
        incscale: "incscale 300ms ease-in-out",
        decscale: "decscale 400ms ease-in-out",
        slideOutLeft: "slideOutLeft 250ms ease-in-out",
        slideOutRight: "slideOutRight 250ms ease-in-out",
        popIntoExistence: "popIntoExistence 250ms ease-in-out",
    }
};

export default Animations;