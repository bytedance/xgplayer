import { EventEmitter } from 'events';
export default Proxy;
export type IVideoProxy = {
    duration: number;
    currentTime: number;
    muted: boolean;
    defaultMuted: boolean;
    volume: number;
    playbackRate: number;
    defaultPlaybackRate: number;
    autoplay: boolean;
    readonly paused: boolean;
    readonly ended: boolean;
    readonly networkState: number;
    readonly readyState: number;
    readonly seeking: boolean;
    src: any;
    play: Function;
    pause: Function;
};
declare class Proxy extends EventEmitter {
    /**
     * @constructor
     * @param {any} options
     */
    constructor(options: any);
    /**
     * @private
     */
    private _hasStart;
    /**
     * @private
     */
    private _currentTime;
    /**
     * @private
     */
    private _duration;
    videoConfig: any;
    /**
     * @type { HTMLVideoElement | HTMLAudioElement | HTMLElement | IVideoProxy | null }
     */
    video: HTMLVideoElement | HTMLAudioElement | HTMLElement | IVideoProxy | null;
    /**
     * @private
     */
    private _interval;
    /**
     * @readonly
     */
    readonly videoEventMiddleware: {};
    /**
     * @description set middleware
     * @param { Array<{[propName: string]: function}> } middlewares
     */
    setEventsMiddleware(middlewares: {
        [propName: string]: Function;
    }[]): void;
    /**
     * @description remove middleware
     * @param { Array<{[propName: string]: function}> } middlewares
     */
    removeEventsMiddleware(middlewares: {
        [propName: string]: Function;
    }[]): void;
    /**
     * Add media eventListener to the video object
     * @param { any } [video]
     */
    attachVideoEvents(video?: any): void;
    /**
     * @private
     */
    private _evHandlers;
    /**
     * @description remove media eventListener from the video object
     * @param { any } [video]
     */
    detachVideoEvents(video?: any): void;
    /**
     * @description Media Error handler
     * @param { string } eventName
     */
    errorHandler(name: any): void;
    set hasStart(arg: boolean);
    /**
     * @type { boolean }
     */
    get hasStart(): boolean;
    destroy(): void;
    /**
     *
     * @returns {  Promise<void> | null }
     */
    play(): Promise<void> | null;
    pause(): void;
    /**
     *
     * @param { string } type
     * @returns { boolean }
     */
    canPlayType(type: string): boolean;
    /**
     *
     * @param { any } [buffered]
     * @returns { Array<number> }
     */
    getBufferedRange(buffered?: any): Array<number>;
    /**
     * @type { boolean }
     */
    set autoplay(arg: any);
    get autoplay(): any;
    /**
     * @type { TimeRanges }
     */
    get buffered(): TimeRanges;
    /**
     * @type { Array<{start: number, end: number}> }
     */
    get buffered2(): {
        start: number;
        end: number;
    }[];
    /**
     * @type { {start: number, end: number} }
     */
    get bufferedPoint(): {
        start: number;
        end: number;
    };
    set crossOrigin(arg: string);
    /** @type { string}  */
    get crossOrigin(): string;
    set currentSrc(arg: string);
    /** @type { string }  */
    get currentSrc(): string;
    set currentTime(arg: number);
    /** @type { number }  */
    get currentTime(): number;
    set defaultMuted(arg: boolean);
    /** @type { boolean }  */
    get defaultMuted(): boolean;
    /** @type { number }  */
    get duration(): number;
    /**
     * @type { boolean }
     * */
    get ended(): boolean;
    /**
     * @type { MEDIA_ERR_ABORTED | MEDIA_ERR_NETWORK | MEDIA_ERR_DECODE | MEDIA_ERR_SRC_NOT_SUPPORTED }
     */
    get error(): any;
    set loop(arg: boolean);
    /**
     * @type { boolean }
     */
    get loop(): boolean;
    set muted(arg: boolean);
    /**
     * @type { boolean }
     */
    get muted(): boolean;
    /**
     * @type { NETWORK_EMPTY | NETWORK_IDLE | NETWORK_LOADING | NETWORK_NO_SOURCE}
     */
    get networkState(): any;
    /**
     * @type { boolean }
     */
    get paused(): boolean;
    set playbackRate(arg: number);
    /**
     * @type { number }
     */
    get playbackRate(): number;
    /**
     * @type { TimeRanges }
     */
    get played(): TimeRanges;
    set preload(arg: boolean);
    /**
     * @type { boolean }
     */
    get preload(): boolean;
    /**
     */
    get readyState(): string;
    /**
     * @type { boolean }
     */
    get seekable(): boolean;
    /**
     * @type { boolean }
     */
    get seeking(): boolean;
    set src(arg: any);
    /**
     * @type { any }
     */
    get src(): any;
    set volume(arg: number);
    /**
     * @type { number }
     */
    get volume(): number;
}