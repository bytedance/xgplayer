export default FlvPlayer;
/**
 *  拉流播放逻辑
 *  *指定autoplay:true
 *    xgplayer初始化后执行start()
 *      start() -> pluginsManager.beforeInit(this) -> _startInit() -> videoPlay()
 *      等插件列表初始化ready后,监听canplay事件，等canplay触发后，调用video.play()，处理video.play()是否自动播放了
 *
 * *指定autoplay:false
 *    config.videoInit 默认为true, xgplayer初始化后执行start()
 *       start() -> pluginsManager.beforeInit(this) -> _startInit()
 *
 * start插件什么时候展示
 *  autoplay:flase
 *  autoplay:true 但是浏览器不允许自动播放
 *
 *
 * *点击start插件播放
 *  点击start插件主要是为了调用videoPlay(), 通过hook实现直播插件层重新拉流逻辑
 *
 */
declare class FlvPlayer extends BasePlugin {
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
        seiOnDemand: boolean;
    };
    static isSupported(): boolean;
    constructor(config: any);
    get version(): string;
    _stopStreamWhenNotAutoPlay(): void;
    _initFlvCtr(): void;
    flv: any;
    set context(arg: any);
    get context(): any;
    mse: any;
    _bindFlvEvents(): void;
    _bindPlayerEvents(): void;
    /** ********* flv controller event handlers *********************** */
    _onLoadCompleteHandler: () => void;
    _onMseWrongTrackAddHandler: () => void;
    /** ********* flv event handlers end *********************** */
    /** *********** player event handler *********************** */
    _playHandler: () => Promise<void> | Promise<[any, any]>;
    _pauseHandler: () => void;
    _seekingHandler: () => void;
    _definitionChangeHandler: (change: any) => void;
    _switchURLHandler: (url: any, abr: any) => void;
    _destroyHandler: () => any;
    /** *********** player event handler end *********************** */
    _loadStream(time?: any): void;
    _reloadStream(): void;
    _waitBackupStream(flv: any, ctx: any): Promise<any>;
    _switchURLInternal(url: any, abr: any): void;
    _destroyInternal(): any;
    get core(): any;
    _context: any;
}
import { BasePlugin } from "xgplayer";
