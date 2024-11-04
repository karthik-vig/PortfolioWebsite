export interface parallaxLayersTemplate {
    src: string;
    // both start and end are pixel values 
    // can be positive or negative. We go from the start
    // to the end value from the top of the 
    // main window scroll to the the end of it
    movementY: {
        start: number;
        end: number;
    };
    dimension: {
        width: number; 
        height: number;
    };
}


export const horizontalParallaxLayers: parallaxLayersTemplate[] = [
    {
        src: "./images/parallaxLayers/horizontalLayers/white_base_bg.svg",
        movementY: {
        start: 0,
        end: 0,
        },
        dimension: {
        height: 100,
        width: 100,
        }
    },
    {
        src: "./images/parallaxLayers/horizontalLayers/bg_layer.svg",
        movementY: {
        start: -25,
        end: 0,
        },
        dimension: {
        height: 100,
        width: 100,
        }
    },
    {
        src: "./images/parallaxLayers/horizontalLayers/middle_layer.svg",
        movementY: {
        start: 50,
        end: 0,
        },
        dimension: {
        height: 100,
        width: 100,
        }
    },
    {
        src: "./images/parallaxLayers/horizontalLayers/fg_layer.svg",
        movementY: {
        start: 100,
        end: 0,
        },
        dimension: {
        height: 100,
        width: 100,
        }
    },
];
      
      
export const verticalParallaxLayers: parallaxLayersTemplate[] = [
    {
        src: "./images/parallaxLayers/verticalLayers/white_base_bg.svg",
        movementY: {
        start: 0,
        end: 0,
        },
        dimension: {
        height: 100,
        width: 100,
        }
    },
    {
        src: "./images/parallaxLayers/verticalLayers/bg_layer.svg",
        movementY: {
        start: -25,
        end: 0,
        },
        dimension: {
        height: 100,
        width: 100,
        }
    },
    {
        src: "./images/parallaxLayers/verticalLayers/middle_layer.svg",
        movementY: {
        start: 50,
        end: 0,
        },
        dimension: {
        height: 100,
        width: 100,
        }
    },
    {
        src: "./images/parallaxLayers/verticalLayers/fg_layer.svg",
        movementY: {
        start: 100,
        end: 0,
        },
        dimension: {
        height: 100,
        width: 100,
        }
    },
];
