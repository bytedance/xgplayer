export default class HlsLivePlayer extends BasePlugin {
    static get defaultConfig(): {
        options: {};
        loadTimeout: number;
        preloadTime: number;
        retryTimes: number;
        retryCount: number;
        retryDelay: number;
        innerDegrade: number;
    };
    static isSupported(mediaType: any): any;
    constructor(options?: {});
    hlsLive: any;
}
import { BasePlugin } from "xgplayer";
