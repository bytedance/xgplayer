export default HlsVodPlayer;
declare class HlsVodPlayer extends BasePlugin {
    static get defaultConfig(): {
        options: {};
        preloadTime: number;
        retryCount: number;
        retryDelay: number;
    };
    static isSupported(): boolean;
    constructor(options: any);
    get version(): string;
    _handleSetCurrentTime: () => void;
    _initHlsCtr(): void;
    _context: Context;
    hls: any;
    _bindPlayerEvents(): void;
    /** *********** player event handler *********************** */
    _handleSetStartTime: () => void;
    _handleUrlChange: (url: any) => void;
    _handleDefinitionChange: (change: any) => void;
    _replay: () => void;
    switchURL: (url: any) => void;
    _handleUrlChangeInternal: (url: any) => void;
    _reloadStream(): void;
    _destroyInternal: () => Promise<any>;
    /** @type {HlsVodController} */
    get core(): HlsVodController;
    get loader(): any;
}
import { BasePlugin } from "xgplayer";
import { Context } from "xgplayer-helper-utils";
import HlsVodController from "./hls-vod";
