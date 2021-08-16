export default FlvPlayer;
declare class FlvPlayer extends BasePlugin {
    static isSupported(): any;
    static get defaultConfig(): {
        Remuxer: typeof import("xgplayer-helper-transmuxers").Mp4Remuxer;
        FlvDemuxer: typeof import("xgplayer-helper-transmuxers/lib/flv").default;
        FetchLoader: typeof import("xgplayer-helper-utils/lib/loader-fetch/fetch-loader").default;
        Tracks: typeof import("xgplayer-helper-models").Tracks;
        RemuxedBufferManager: typeof import("xgplayer-helper-models/lib/remuxed-buffer").default;
        XgBuffer: typeof import("xgplayer-helper-models/lib/u8a-buffer").default;
        Compatibility: typeof import("xgplayer-helper-codec/es/compat/flv").default;
        Mse: typeof import("xgplayer-helper-utils/lib/mse").default;
    } & {
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
    constructor(options: any);
    get version(): string;
    _stopStreamWhenNotAutoPlay(): void;
    _initFlvCtr: () => void;
    flv: any;
    set context(arg: any);
    get context(): any;
    _prepareForLiveVideo: () => void;
    _bindFlvEvents(): void;
    _bindPlayerEvents(): void;
    /** ********* livevideo degrade *********************** */
    _lowdecodeHandler: () => void;
    /**
     * @param {string | undefined} url
     */
    _degrade: (url: string | undefined) => void;
    _toUseMse: (url: any) => void;
    forceDegradeToVideo: (url: any) => void;
    /** ********* livevideo degrade end *********************** */
    /** *********** player event handler *********************** */
    _onLoadCompleteHandler: () => void;
    _playHandler: () => Promise<void>;
    _pauseHandler: () => void;
    _switchURLHandler: (url: any) => void;
    _definitionChangeHandler: (change: any) => void;
    _progressHandler: () => void;
    /** *********** player event handler end *********************** */
    _loadStream: (time?: any) => void;
    _reloadStream(): void;
    _destroyInternal(): Promise<any>;
    _context: any;
    get core(): any;
}
import { BasePlugin } from "xgplayer";
