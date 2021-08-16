export default class FlvBaseController {
    constructor(mse: any, configs: any);
    mse: any;
    configs: any;
    _compat: any;
    _seiOndemand: SEIOnDemand;
    state: {
        initSegmentArrived: boolean;
        randomAccessPoints: any[];
    };
    init(): void;
    _initComponents(): void;
    _bindEvents(): void;
    /** *********** context components events handler ********************/
    _handleLoaderDataLoaded: () => void;
    _handleMediaInfo: () => void;
    _handleMetadataParsed: () => never;
    _handleDemuxComplete: () => never;
    _handleAddRAP: (rap: any) => void;
    /** *********** emit to out ********************/
    _handleSEI: (sei: any) => void;
    _handleKeyFrame: (pts: any) => void;
    _handleFetchRetry: (tag: any, info: any) => void;
    _onError: (_: any, error: any) => void;
    /** *********** call by plugin ********************/
    seek(): void;
    loadData(url?: any): void;
    pause(): void;
    destroy(): void;
    get tracks(): any;
}
import SEIOnDemand from "./sei-ondmand";
