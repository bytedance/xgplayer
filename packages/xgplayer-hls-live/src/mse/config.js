import { XhrLoader, FetchLoader, Crypto, Mse } from 'xgplayer-helper-utils'
import { TsDemuxer, Mp4Remuxer, M3U8Parser } from 'xgplayer-helper-transmuxers';
import { CompatHls as Compatibility } from 'xgplayer-helper-codec'
import { Playlist, Buffer as XgBuffer, Tracks, RemuxedBufferManager } from 'xgplayer-helper-models';

const Loader = FetchLoader.isSupported() ? FetchLoader : XhrLoader;

export default {
  Mse,
  Tracks,
  RemuxedBufferManager,
  XgBuffer,
  Loader,
  Compatibility,
  Mp4Remuxer,
  Crypto,
  M3U8Parser,
  TsDemuxer,
  Playlist
};
