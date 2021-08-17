export default class HlsLivePlayer extends BasePlugin {
    static get defaultConfig(): {
        Mse: typeof import("xgplayer-helper-utils/lib/mse").default;
        Tracks: typeof import("xgplayer-helper-models").Tracks;
        RemuxedBufferManager: typeof import("xgplayer-helper-models/lib/remuxed-buffer").default;
        XgBuffer: typeof import("xgplayer-helper-models/lib/u8a-buffer").default;
        FetchLoader: typeof import("xgplayer-helper-utils/lib/loader-fetch/fetch-loader").default;
        XhrLoader: typeof import("xgplayer-helper-utils/lib/loader-fetch/xhr-loader").default;
        Compatibility: typeof import("xgplayer-helper-codec/es/compat/hls").default;
        Mp4Remuxer: typeof import("xgplayer-helper-transmuxers").Mp4Remuxer;
        Crypto: typeof import("xgplayer-helper-utils/lib/crypto").default;
        TsDemuxer: typeof import("xgplayer-helper-transmuxers/lib/hls/ts").default;
        Playlist: typeof import("xgplayer-helper-models").PlaylistNew;
        M3U8Parser: any;
    } & {
        options: {};
        loadTimeout: number;
        retryTimes: number;
        retryCount: number;
        retryDelay: number;
    };
    static isSupported(): boolean;
    get version(): string;
    _initHlsCtr(): void;
    _context: Context;
    hls: any;
    _bindPlayerEvents(): void;
    _handlePlay: () => Promise<void> | Promise<[any, any]>;
    _handlePause: () => void;
    _handleUrlChange: (url: any) => void;
    _handleDefinitionChange: (change: any) => void;
    _reloadStream: () => void;
    switchURL: (url: any) => void;
    _destroyInternal: () => any;
    /** @type {HlsLiveController} */
    get core(): HlsLiveController;
    get context(): Context;
}
import { BasePlugin } from "xgplayer";
import { Context } from "xgplayer-helper-utils";
import HlsLiveController from "../hls-live-controller";
