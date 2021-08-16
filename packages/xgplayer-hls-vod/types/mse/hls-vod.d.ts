export default HlsVodController;
declare class HlsVodController extends BaseController {
    constructor(mse: any);
    TAG: string;
    _presource: any;
    _onInitSegment: () => void;
    _onMediaSegment: () => void;
    _onSourceUpdateEnd: () => void;
    _seekToBufferStart: () => void;
    _detectBufferGap: () => {
        gap: boolean;
        start: number;
    };
    _onRemuxError(mod: any, error: any, fatal: any): void;
}
import BaseController from "../base-controller";
