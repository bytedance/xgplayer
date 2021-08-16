export default HlsVodMobileController;
declare class HlsVodMobileController extends BaseController {
    TAG: string;
    configs: any;
    _setMetaToAudio: (audioMeta: any) => void;
    _setMetaToVideo: (videoMeta: any) => void;
}
import BaseController from "../base-controller";
