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
    hlsVod: any;
}
import { BasePlugin } from "xgplayer";
