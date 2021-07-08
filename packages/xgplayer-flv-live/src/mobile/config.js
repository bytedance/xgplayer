import { PageVisibility, FetchLoader } from 'xgplayer-helper-utils'
import { FlvDemuxer, Mp4Remuxer as Remuxer } from 'xgplayer-helper-transmuxers'
import { Buffer as XgBuffer, Tracks, XGDataView, RemuxedBufferManager } from 'xgplayer-helper-models'

class Logger {
  warn () {}
}

export default {
  PageVisibility,
  FlvDemuxer,
  FetchLoader,
  Tracks,
  XgBuffer,
  Logger,
  Remuxer,
  RemuxedBufferManager,
  XGDataView
}
