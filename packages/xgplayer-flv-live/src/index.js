import Context from 'xgplayer-utils/Context'
import FlvDemuxer from 'xgplayer-flv/demux'

const Tag = 'FLVLiveController'

class FlvLiveController {
  constructor () {
    this.TAG = Tag
    this.context = new Context()
    FlvDemuxer(this.context)
  }
}

export default FlvLiveController
