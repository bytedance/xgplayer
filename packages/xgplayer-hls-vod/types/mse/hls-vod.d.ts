export default HlsVodController;
declare class HlsVodController extends BaseController {
    constructor(mse: any);
    TAG: string;
    _presource: any;
    _onInitSegment: () => void;
    _onMediaSegment: () => void;
    _onSourceUpdateEnd: () => void;
    _checkEndOfStream: () => void;
}
import BaseController from "../base-controller";
