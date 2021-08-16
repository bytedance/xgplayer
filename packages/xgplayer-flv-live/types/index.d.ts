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
    flvLive: any;
}
import { BasePlugin } from "xgplayer";
