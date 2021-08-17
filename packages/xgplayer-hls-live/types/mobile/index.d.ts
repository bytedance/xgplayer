export default HlsPlayer;
declare class HlsPlayer extends BasePlugin {
    static get defaultConfig(): {
        FetchLoader: typeof import("xgplayer-helper-utils/lib/loader-fetch/fetch-loader").default;
        Crypto: typeof import("xgplayer-helper-utils/lib/crypto").default;
        TsDemuxer: typeof import("xgplayer-helper-transmuxers/lib/hls/ts").default;
        M3U8Parser: any;
        Playlist: typeof import("xgplayer-helper-models").PlaylistNew;
        XgBuffer: typeof import("xgplayer-helper-models/lib/u8a-buffer").default;
        Tracks: typeof import("xgplayer-helper-models").Tracks;
        Compatibility: typeof import("xgplayer-helper-codec/es/compat/hls").default;
    } & {
        options: {};
        loadTimeout: number;
        retryTimes: number;
        retryCount: number;
        retryDelay: number;
        innerDegrade: number;
    };
    static isSupported(): any;
    get version(): string;
    _prepareForLiveVideo(): void;
    _initHlsCtr(): void;
    _context: Context;
    hls: any;
    _bindPlayerEvents(): void;
    _largeavgap: () => void;
    _lowdecode: () => void;
    /**
     * @param {string} url  the live url for degrade use
     */
    _degrade: (url: string) => void;
    _forceDegradeToVideo: (url: any) => void;
    _handlePlay: () => void;
    _handlePause: () => void;
    _loadData: () => void;
    _handleDefinitionChange: (change: any) => void;
    _switchURL: (url: any) => void;
    _reloadStream: () => void;
    switchURL: (url: any) => void;
    _destroyInternal: () => void;
    /** @type {HlsLiveController} */
    get core(): HlsLiveController;
    get context(): Context;
}
import { BasePlugin } from "xgplayer";
import { Context } from "xgplayer-helper-utils";
import HlsLiveController from "../hls-live-controller";
