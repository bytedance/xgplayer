import { XhrLoader, FetchLoader, Crypto, Mse } from 'xgplayer-helper-utils'
import { TsDemuxer, M3U8ParserNew, Mp4Remuxer } from 'xgplayer-helper-transmuxers'
import { CompatHls as Compatibility } from 'xgplayer-helper-codec'
import { PlaylistNew, Buffer as XgBuffer, Tracks, RemuxedBufferManager } from 'xgplayer-helper-models'

export default {
  Mse,
  Tracks,
  RemuxedBufferManager,
  XgBuffer,
  FetchLoader,
  XhrLoader,
  Compatibility,
  Mp4Remuxer,
  Crypto,
  TsDemuxer,
  Playlist: PlaylistNew,
  M3U8Parser: M3U8ParserNew
}
