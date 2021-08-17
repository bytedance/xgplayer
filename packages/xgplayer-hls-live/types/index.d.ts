export default class HlsLivePlayer extends BasePlugin {
    static get defaultConfig(): {
        options: {};
        loadTimeout: number;
        retryTimes: number;
        retryCount: number;
        retryDelay: number;
        innerDegrade: number;
    };
    static isSupported(mediaType: any): any;
    constructor(options?: {});
    /** @type {HlsMSELivePlayer | HlsMobileLivePlayer} */
    hlsLive: HlsMSELivePlayer | HlsMobileLivePlayer;
}
import { BasePlugin } from "xgplayer";
import HlsMSELivePlayer from "./mse";
import HlsMobileLivePlayer from "./mobile";
