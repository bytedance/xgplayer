export default class HlsVodWrapperPlayer extends BasePlugin {
    static get defaultConfig(): {
        options: {};
        loadTimeout: number;
        preloadTime: number;
        retryCount: number;
        retryDelay: number;
        retryTimes: number;
        innerDegrade: number;
    };
    static isSupported(mediaType: any): any;
    constructor(config: any);
    /** @type {HlsVodMsePlayer | HlsVodMobilePlayer} */
    hlsVod: HlsVodMsePlayer | HlsVodMobilePlayer;
}
import { BasePlugin } from "xgplayer";
import HlsVodMsePlayer from "./mse/index";
import HlsVodMobilePlayer from "./mobile/index";
