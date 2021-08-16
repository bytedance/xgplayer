export default FlvPlayer;
declare class FlvPlayer extends BasePlugin {
    static get defaultConfig(): {
        options: {};
        loadTimeout: number;
        retryCount: number;
        retryDelay: number;
    };
    static isSupported(): boolean;
    constructor(config: any);
    get version(): string;
    _initFlvCtr(): void;
    flv: any;
    set context(arg: any);
    get context(): any;
    mse: any;
    _bindPlayerEvents(): void;
    /** ********* flv event handlers end *********************** */
    /** *********** player event handler *********************** */
    _replayHandler: () => any;
    _seekingHandler: () => void;
    _definitionChangeHandler: (change: any) => void;
    _switchURLHandler: (url: any, abr: any) => void;
    _destroyHandler: () => any;
    /** *********** player event handler end *********************** */
    _loadStream(): void;
    _switchURLInternal(url: any): any;
    _destroyInternal(): any;
    get core(): any;
    _context: any;
}
import { BasePlugin } from "xgplayer";
