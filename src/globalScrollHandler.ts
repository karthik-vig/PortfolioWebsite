import {
    Updater,
} from 'use-immer';


export default function InitIntersectionObserver(
    componentIDs: string[],
    componentAnimationTriggerMap: {
        [componentID: string]: boolean;
    },
    componenentSetAnimationTriggerMap: {
        [componentID: string]: Updater<boolean>;
    }
) {
    // get the threshold for each component
    const getThresholds = () => {
        const thresholds = componentIDs.map((componentID: string) => {
            const element = document.querySelector(`#${componentID}`);
            if (!element) return;
            const maxIntersectionRatio = window.innerHeight / element.getBoundingClientRect().height;
            if (maxIntersectionRatio >= 1.0) {
                return 1.0;
            } else {
                return maxIntersectionRatio * 0.4;
            }
        });
        if (thresholds === undefined) return [0, ];
        return thresholds;
    };
    const thresholds = getThresholds() as number[];
    // map the componenent id to the threshold values
    const componentToThresholdMap: {
        [component: string]: number;
    } = {};
    thresholds.forEach((threshold: number, idx: number) => {
        componentToThresholdMap[componentIDs[idx]] = threshold;
    });
    // create the options for intersection observer 
    // with the threshold values we found
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: [0, ].concat(thresholds),
    }
    // The callback function for the intersection observer
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
            // check if the element being observered is current intersecting
            if (entry.isIntersecting) {
                if (componentAnimationTriggerMap[entry.target.id] === false &&
                    entry.intersectionRatio >= componentToThresholdMap[entry.target.id]
                ) {
                    componenentSetAnimationTriggerMap[entry.target.id]( state => {
                        state = true; 
                        return state;
                    });
                } 
            // if not intersecting; then reset the animation: ONLY if
            // the element is below the current view
            } else if (componentAnimationTriggerMap[entry.target.id] === true) {
                const {
                    top: containerXTopLocation,
                } = entry.target.getBoundingClientRect();
                if (containerXTopLocation < window.innerHeight) return;
                componenentSetAnimationTriggerMap[entry.target.id]( state => {
                    state = false; 
                    return state;
                });
            }
        });
    };
    // create the interesection observer
    const observer = new IntersectionObserver(handleIntersection, options);
    // register & observe each of the element in the intersection observer
    componentIDs.forEach((componentID: string) => {
        const element = document.querySelector(`#${componentID}`);
        if (!element) return;
        observer.observe(element);
    });
    return observer;
}