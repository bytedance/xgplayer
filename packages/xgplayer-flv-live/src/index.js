import FetchLoader from "xgplayer-loader-fetch";
import XgBuffer from "xgplayer-buffer";
import Context from "xgplayer-utils/Context";
import FlvDemuxer from 'xgplayer-flv/demux'

const Tag = 'FLVLiveController'

class FlvLiveController {
  constructor () {
    this.TAG = Tag
    this.context = new Context()
    FlvDemuxer(this.context)
  }

  _init() {
    this._registry();
  }

  _registry() {
    this._context.registry("LOADER", FetchLoader);
    this._context.registry("LOADER_BUBBER", XgBuffer);
    // TODO: this._context.registry("DEMUXER", FLVDE)
  
  }

  _initInstances() {
    this._context.initInstance("LOADER", {buffer: "LOADER_BUFFER"});
    this._context.initInstance("LOADER_BUBBER");
  }

  load(url, opts) {
    let loader = this._context.getInstance("LOADER");
    loader.load(url, opts);
  }
}

export default FlvLiveController;

