import {
    createContext,
} from 'react';
import {
    Updater,
} from 'use-immer';

export interface GlobalContextValTemplate {
    componentAnimationTriggerMap?: {
        [componentID: string]: boolean;
    },
    componenentSetAnimationTriggerMap?: {
        [componentID: string]: Updater<boolean>;
    }
}

export interface GlobalContextTemplate {
    globalContextVal?: GlobalContextValTemplate;
    setGlobalContextVal?: Updater<GlobalContextValTemplate>;
}

const GlobalContext = createContext<GlobalContextTemplate>({});

export default GlobalContext;