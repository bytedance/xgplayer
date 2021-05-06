import { FlvDemuxer, Mp4Remuxer as Remuxer } from 'xgplayer-helper-transmuxers'
import { FetchLoader, Mse } from 'xgplayer-helper-utils'
import { Tracks, ProcessedBufferManager, Buffer as XgBuffer } from 'xgplayer-helper-models'
import { Compat as Compatibility } from 'xgplayer-helper-codec';

class Logger {
  warn () {}
}

export default {
  Remuxer,
  FlvDemuxer,
  FetchLoader,
  Tracks,
  ProcessedBufferManager,
  XgBuffer,
  Compatibility,
  Mse,
  Logger
};
