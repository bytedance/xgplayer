import Context from 'xgplayer-utils'
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
}

export default FlvLiveController
