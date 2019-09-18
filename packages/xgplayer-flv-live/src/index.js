import FetchLoader from "xgplayer-loader-fetch";
import XgBuffer from "xgplayer-buffer";
import FlvDemuxer from 'xgplayer-flv/demux'
import FetchLoader from 'xgplayer-loader-fetch'

const Tag = 'FLVLiveController'

class FlvLiveController {
  constructor () {
    this.TAG = Tag
  }

  init () {
    this._context.registry('FLV_DEMUXER', FlvDemuxer)
    this._context.registry('FETCH_LOADER', FetchLoader)
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

