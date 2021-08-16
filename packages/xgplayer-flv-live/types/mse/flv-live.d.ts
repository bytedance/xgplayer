export default class FlvController extends FlvBaseController {
    TAG: string;
    _handleAppendInitSegment: () => void;
    _handleMediaSegment: () => void;
    _handleSourceUpdateEnd: () => void;
    urlSwitching: boolean;
    _handleTimeUpdate: () => void;
    bufferClearTimer: any;
}
import FlvBaseController from "../base-controller";
