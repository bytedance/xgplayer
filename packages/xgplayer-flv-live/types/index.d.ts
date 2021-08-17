export default class FlvLiveWrapperPlayer extends BasePlugin {
    static get defaultConfig(): {
        preloadTime: number;
        options: {};
        loadTimeout: number;
        retryCount: number;
        retryDelay: number;
        backupURL: string;
        backupConstructor: any;
        decodeMode: number;
        innerDegrade: number;
        seiOnDemand: boolean;
    };
    static isSupported(mediaType: any): any;
    constructor(config: any);
    /** @type {FlvLiveMsePlayer | FlvLiveMobilePlayer} */
    flvLive: FlvLiveMsePlayer | FlvLiveMobilePlayer;
}
import { BasePlugin } from "xgplayer";
import FlvLiveMsePlayer from "./mse/index";
import FlvLiveMobilePlayer from "./mobile/index";
