export default HlsVodMobilePlayer;
declare class HlsVodMobilePlayer extends BasePlugin {
    static get defaultConfig(): {
        options: {};
        loadTimeout: number;
        preloadTime: number;
        retryCount: number;
        retryDelay: number;
        retryTimes: number;
        innerDegrade: number;
    };
    static isSupported(): any;
    constructor(options: any);
    get version(): string;
    /** *********** player event handler *********************** */
    _handleSetCurrentTime: () => void;
    _initHlsCtr(): void;
    _context: Context;
    hls: any;
    _bindPlayerEvents(): void;
    _handleUrlChange: (url: any) => void;
    _handleDefinitionChange: (change: any) => void;
    _handleUrlChangeInternal: (url: any) => void;
    _replay: () => void;
    _reloadStream(): void;
    switchURL: (url: any) => void;
    _destroyInternal: () => void;
    get core(): any;
    get context(): Context;
}
import { BasePlugin } from "xgplayer";
import { Context } from "xgplayer-helper-utils";
