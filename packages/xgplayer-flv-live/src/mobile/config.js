import { PageVisibility, FetchLoader } from 'xgplayer-helper-utils'
import { FlvDemuxer } from 'xgplayer-helper-transmuxers'
import { Buffer as XgBuffer, Tracks, XGDataView } from 'xgplayer-helper-models';

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
  XGDataView
};
