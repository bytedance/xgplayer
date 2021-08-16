export default HlsVodController;
declare class HlsVodController {
    url: string;
    baseurl: string;
    sequence: number;
    _playlist: any;
    _lastSeekTime: number;
    m3u8Text: any;
    init(): void;
    _tsBuffer: any;
    _tracks: any;
    _compat: any;
    _tsloader: any;
    _demuxer: any;
    retrytimes: any;
    preloadTime: any;
    _bindEvents(): void;
    _onTimeUpdate: () => never;
    _onWaiting: () => never;
    _onMetadataParsed: () => never;
    _onDemuxComplete: () => never;
    _onLoaderCompete: (buffer: any) => void;
    _keyLoader: any;
    _crypto: any;
    _onDcripted: () => void;
    seek: (time: any) => void;
    load: (url: any) => void;
    _preload: (time: any) => void;
    _logDownSegment: (frag: any) => void;
    /** *********** emit to out ********************/
    _onLoadError: (mod: any, error: any) => void;
    _onError: (_: any, error: any) => void;
    destroy(): void;
    mse: any;
}
