import { EVENTS, Mse, Crypto } from 'xgplayer-utils';
import { XgBuffer, PreSource, Tracks } from 'xgplayer-buffer';
import { FetchLoader } from 'xgplayer-loader';
import { Compatibility } from 'xgplayer-codec';
import Mp4Remuxer from 'xgplayer-remux/src/mp4/index';

import {Playlist, M3U8Parser, TsDemuxer} from 'xgplayer-demux';

const LOADER_EVENTS = EVENTS.LOADER_EVENTS;
const REMUX_EVENTS = EVENTS.REMUX_EVENTS;
const DEMUX_EVENTS = EVENTS.DEMUX_EVENTS;
const HLS_EVENTS = EVENTS.HLS_EVENTS;
const CRYTO_EVENTS = EVENTS.CRYTO_EVENTS;
const HLS_ERROR = 'HLS_ERROR';
class HlsVodController {
  constructor (configs) {
    this.configs = Object.assign({}, configs);
    this.url = '';
    this.baseurl = '';
    this.sequence = 0;
    this._playlist = null;
    this.retrytimes = this.configs.retrytimes || 3;
    this.container = this.configs.container;
    this.preloadTime = this.configs.preloadTime || 5;
    this._lastSeekTime = 0;
    this._player = this.configs.player;
    this.m3u8Text = null
  }

  init () {
    // 初始化Buffer （M3U8/TS/Playlist);
    this._context.registry('M3U8_BUFFER', XgBuffer);
    this._tsBuffer = this._context.registry('TS_BUFFER', XgBuffer)();
    this._tracks = this._context.registry('TRACKS', Tracks)();

    this._playlist = this._context.registry('PLAYLIST', Playlist)({autoclear: true});
    this._presource = this._context.registry('PRE_SOURCE_BUFFER', PreSource)();

    this._compat = this._context.registry('COMPATIBILITY', Compatibility)();

    // 初始化M3U8Loader;
    this._context.registry('M3U8_LOADER', FetchLoader)({ buffer: 'M3U8_BUFFER', readtype: 1 });
    this._tsloader = this._context.registry('TS_LOADER', FetchLoader)({ buffer: 'TS_BUFFER', readtype: 3 });

    // 初始化TS Demuxer
    this._context.registry('TS_DEMUXER', TsDemuxer)({ inputbuffer: 'TS_BUFFER' });

    // 初始化MP4 Remuxer
    this._context.registry('MP4_REMUXER', Mp4Remuxer);

    // 初始化MSE
    this.mse = this._context.registry('MSE', Mse)({container: this.container, preloadTime: this.preloadTime});
    this.initEvents();
  }

  initEvents () {
    this.on(LOADER_EVENTS.LOADER_COMPLETE, this._onLoaderCompete.bind(this));

    this.on(LOADER_EVENTS.LOADER_ERROR, this._onLoadError.bind(this))

    this.on(REMUX_EVENTS.INIT_SEGMENT, this._onInitSegment.bind(this));

    this.on(REMUX_EVENTS.MEDIA_SEGMENT, this._onMediaSegment.bind(this));


    this.on(DEMUX_EVENTS.METADATA_PARSED, this._onMetadataParsed.bind(this));

    this.on(DEMUX_EVENTS.DEMUX_COMPLETE, this._onDemuxComplete.bind(this));

    this.on(DEMUX_EVENTS.DEMUX_ERROR, this._onDemuxError.bind(this));

    this.on(REMUX_EVENTS.REMUX_ERROR, this._onRemuxError.bind(this));

    this.on('TIME_UPDATE', this._onTimeUpdate.bind(this));

    this.on('WAITING', this._onWaiting.bind(this));
  }

  _onError(type, mod, err, fatal) {
    let error = {
      errorType: type,
      errorDetails: `[${mod}]: ${err.message}`,
      errorFatal: fatal
    }
    this._player && this._player.emit(HLS_ERROR, error);
  }

  _onLoadError (mod, error) {
    this._onError(LOADER_EVENTS.LOADER_ERROR, mod, error, true);
    this.emit(HLS_EVENTS.RETRY_TIME_EXCEEDED)
  }

  _onDemuxError (mod, error, fatal) {
    if(fatal === undefined) {
      fatal = true;
    }
    this._onError(LOADER_EVENTS.LOADER_ERROR, mod, error, fatal);
  }

  _onRemuxError (mod, error, fatal) {
    if(fatal === undefined) {
      fatal = true;
    }
    this._onError(REMUX_EVENTS.REMUX_ERROR, mod, error, fatal);
  }

  _onWaiting (container) {
    let end = true;

    const playListLen = Object.keys(this._playlist.list).length
    if (!playListLen) {
      return;
    }

    for (let i = 0; i < Object.keys(this._playlist.list).length; i++) {
      if (this.container.currentTime * 1000 < parseInt(Object.keys(this._playlist.list)[i])) {
        end = false;
      }
    }
    if (end) {
      let ts = this._playlist.getTs(this.container.currentTime * 1000);
      if (!ts) {
        this._player.emit('ended')
        this.mse.endOfStream();
      } else {
        if (ts.downloaded) {
          this._player.emit('ended')
          this.mse.endOfStream();
        }
      }
    }
  }

  _onTimeUpdate (container) {
    this._preload(container.currentTime);
  }
  _onDemuxComplete () {
    this.emit(REMUX_EVENTS.REMUX_MEDIA)
  }

  _onMetadataParsed (type) {
    let duration = parseInt(this._playlist.duration);
    if (type === 'video') {
      this._tracks.videoTrack.meta.duration = duration;
    } else if (type === 'audio') {
      this._tracks.audioTrack.meta.duration = duration;
    }
    this.emit(REMUX_EVENTS.REMUX_METADATA, type)
  }

  _onMediaSegment () {
    if (Object.keys(this.mse.sourceBuffers).length < 1) {
      this.mse.addSourceBuffers();
    }

    this.mse.doAppend();
  }

  _onInitSegment () {
    this.mse.addSourceBuffers();
  }

  _onLoaderCompete (buffer) {
    if (buffer.TAG === 'M3U8_BUFFER') {
      this.m3u8Text = buffer.shift()
      let mdata = M3U8Parser.parse(this.m3u8Text, this.baseurl);
      try {
        this._playlist.pushM3U8(mdata);
      } catch (error) {
        this._onError('M3U8_PARSER_ERROR', 'PLAYLIST', error, true);
      }
      if (this._playlist.encrypt && this._playlist.encrypt.uri && !this._playlist.encrypt.key) {
        this._context.registry('DECRYPT_BUFFER', XgBuffer)();
        this._context.registry('KEY_BUFFER', XgBuffer)();
        this._tsloader.buffer = 'DECRYPT_BUFFER';
        this._keyLoader = this._context.registry('KEY_LOADER', FetchLoader)({buffer:'KEY_BUFFER',readtype: 3});
        this.emitTo('KEY_LOADER', LOADER_EVENTS.LADER_START, this._playlist.encrypt.uri);
      } else {
        if (!this.preloadTime) {
          if (this._playlist.targetduration) {
            this.preloadTime = this._playlist.targetduration;
            this.mse.preloadTime = this._playlist.targetduration;
          } else {
            this.preloadTime = 5;
            this.mse.preloadTime = 5;
          }
        }

        let frag = this._playlist.getTs();
        if (frag) {
          this._playlist.downloading(frag.url, true);
          this.emitTo('TS_LOADER', LOADER_EVENTS.LADER_START, frag.url)
        } else {
          if (this.retrytimes > 0) {
            this.retrytimes--;
            this.emitTo('M3U8_LOADER', LOADER_EVENTS.LADER_START, this.url)
          }
        }
      }
    } else if (buffer.TAG === 'TS_BUFFER') {
      this._preload(this.mse.container.currentTime);
      this._playlist.downloaded(this._tsloader.url, true);
      this.emit(DEMUX_EVENTS.DEMUX_START, Object.assign({url:this._tsloader.url},this._playlist._ts[this._tsloader.url]));
    } else if (buffer.TAG === 'DECRYPT_BUFFER') {
      this.retrytimes = this.configs.retrytimes || 3;
      this._playlist.downloaded(this._tsloader.url, true);
      this.emitTo('CRYPTO', CRYTO_EVENTS.START_DECRYPT, Object.assign({url:this._tsloader.url},this._playlist._ts[this._tsloader.url]));
    } else if (buffer.TAG == 'KEY_BUFFER') {
      this.retrytimes = this.configs.retrytimes || 3;
      this._playlist.encrypt.key = buffer.shift();
      this._crypto = this._context.registry('CRYPTO', Crypto)({
        key: this._playlist.encrypt.key,
        iv: this._playlist.encrypt.ivb,
        method: this._playlist.encrypt.method,
        inputbuffer:'DECRYPT_BUFFER',
        outputbuffer:'TS_BUFFER'
      });

      this._crypto.on(CRYTO_EVENTS.DECRYPTED, this._onDcripted.bind(this));

      let frag = this._playlist.getTs();
      if (frag) {
        this._playlist.downloading(frag.url, true);
        this.emitTo('TS_LOADER', LOADER_EVENTS.LADER_START, frag.url)
      } else {
        if (this.retrytimes > 0) {
          this.retrytimes--;
          this.emitTo('M3U8_LOADER', LOADER_EVENTS.LADER_START, this.url)
        }
      }
    }
  }

  _onDcripted() {
    this.emit(DEMUX_EVENTS.DEMUX_START);
  }

  seek (time) {
    const { video } = this._player;
    for (let i = 0; i < video.buffered.length; i++) {
      if (time >= video.buffered.start(i) && time < video.buffered.end(i)) {
        return;
      }
    }

    this._lastSeekTime = time;
    this._tsloader.destroy();
    this._tsloader = this._context.registry('TS_LOADER', FetchLoader)({ buffer: 'TS_BUFFER', readtype: 3 });
    if (this._presource.sources.video) {
      this._presource.sources.video.data = [];
    }
    if (this._presource.sources.audio) {
      this._presource.sources.audio.data = []
    }
    if (this._tracks.audioTrack) {
      this._tracks.audioTrack.samples = [];
    }
    if (this._tracks.audioTrack) {
      this._tracks.videoTrack.samples = [];
    }

    if (this._compat) {
      this._compat.reset();
    }

    if (this._tsBuffer) {
      this._tsBuffer.array = [];
      this._tsBuffer.length = 0;
      this._tsBuffer.offset = 0;
    }

    this._playlist.clearDownloaded();
    this._preload(time);
  }

  load (url) {
    this.baseurl = M3U8Parser.parseURL(url);
    this.url = url;
    this.emitTo('M3U8_LOADER', LOADER_EVENTS.LADER_START, url)
  }

  _preload (time) {
    time = Math.floor(time);
    if (this._tsloader.loading) {
      return;
    }
    let video = this.mse.container;
    if (video.buffered.length < 1) {
      let frag = this._playlist.getTs(0);
      if (frag && !frag.downloading && !frag.downloaded) {
        this._playlist.downloading(frag.url, true);
        this.emitTo('TS_LOADER', LOADER_EVENTS.LADER_START, frag.url)
      }
    } else {
      // Get current time range
      let currentbufferend = -1;
      if (!time) {
        time = video.buffered.end(0);
      }

      for (let i = 0; i < video.buffered.length; i++) {
        if (time >= video.buffered.start(i) && time < video.buffered.end(i)) {
          currentbufferend = video.buffered.end(i)
        }
      }

      if (currentbufferend < 0) {
        let frag = this._playlist.getTs((time + 0.5) * 1000); // FIXME: Last frame buffer shortens duration
        if (frag && !frag.downloading && !frag.downloaded) {
          this._playlist.downloading(frag.url, true);
          this.emitTo('TS_LOADER', LOADER_EVENTS.LADER_START, frag.url)
        }
      } else if (currentbufferend < time + this.preloadTime) {
        let frag = this._playlist.getTs(currentbufferend * 1000);

        if (!frag) {
          return;
        }

        // let fragend = frag ? (frag.time + frag.duration) / 1000 : 0;

        let curTime = frag.time;
        const curFragTime = frag.time;

        if (frag.downloaded) {
          let loopMax = 1000
          while (loopMax-- > 0) {
            curTime += 50
            frag = this._playlist.getTs(curTime);
            if (!frag || frag.time > curFragTime) {
              break;
            }
          }
        }

        if (frag && !frag.downloading && !frag.downloaded) {
          this._playlist.downloading(frag.url, true);
          this.emitTo('TS_LOADER', LOADER_EVENTS.LADER_START, frag.url)
        }
      }
    }
  }

  destory () {
    this.configs = {};
    this.url = '';
    this.baseurl = '';
    this.sequence = 0;
    this._playlist = null;
    this.retrytimes = 3;
    this.container = undefined;
    this.preloadTime = 5;
    this._lastSeekTime = 0
    this.m3u8Text = null;
    this.mse = null

    this.off(LOADER_EVENTS.LOADER_COMPLETE, this._onLoaderCompete);

    this.off(REMUX_EVENTS.INIT_SEGMENT, this._onInitSegment);

    this.off(REMUX_EVENTS.MEDIA_SEGMENT, this._onMediaSegment);

    this.off(DEMUX_EVENTS.METADATA_PARSED, this._onMetadataParsed);

    this.off(DEMUX_EVENTS.DEMUX_COMPLETE, this._onDemuxComplete)

    this.off('TIME_UPDATE', this._onTimeUpdate);

    this.off('WAITING', this._onWaiting);
  }
}
export default HlsVodController;
