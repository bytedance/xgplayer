import EVENTS from 'xgplayer-transmuxer-constant-events'
import Mse from 'xgplayer-utils-mse'
import Tracks from 'xgplayer-transmuxer-buffer-track'
import PreSource from 'xgplayer-transmuxer-buffer-presource'
import XgBuffer from 'xgplayer-transmuxer-buffer-xgbuffer'
import FetchLoader from 'xgplayer-transmuxer-loader-fetch'
import Compatibility from 'xgplayer-transmuxer-codec-compatibility'
import Mp4Remuxer from 'xgplayer-transmuxer-remux-mp4'
import Crypto from 'xgplayer-utils-crypto';

import M3U8Parser from 'xgplayer-transmuxer-demux-m3u8';
import TsDemuxer from 'xgplayer-transmuxer-demux-ts';
import Playlist from 'xgplayer-transmuxer-buffer-playlist';

const LOADER_EVENTS = EVENTS.LOADER_EVENTS;
const REMUX_EVENTS = EVENTS.REMUX_EVENTS;
const DEMUX_EVENTS = EVENTS.DEMUX_EVENTS;
const HLS_EVENTS = EVENTS.HLS_EVENTS;
const CRYTO_EVENTS = EVENTS.CRYTO_EVENTS;
const HLS_ERROR = 'HLS_ERROR';
class HlsLiveController {
  constructor (configs) {
    this.configs = Object.assign({}, configs);
    this.url = '';
    this.baseurl = '';
    this.sequence = 0;
    this._playlist = null;
    this.retrytimes = this.configs.retrytimes || 3;
    this.preloadTime = this.configs.preloadTime;
    this._m3u8lasttime = 0;
    this._timmer = setInterval(this._checkStatus.bind(this), 50);
    this._lastCheck = 0;
    this._player = this.configs.player;
    this.m3u8Text = null
  }

  init () {
    // 初始化Buffer （M3U8/TS/Playlist);
    this._context.registry('M3U8_BUFFER', XgBuffer);
    this._context.registry('TS_BUFFER', XgBuffer);
    this._context.registry('TRACKS', Tracks);

    this._playlist = this._context.registry('PLAYLIST', Playlist)({autoclear: true});
    this._context.registry('PRE_SOURCE_BUFFER', PreSource);

    this._context.registry('COMPATIBILITY', Compatibility);

    // 初始化M3U8Loader;
    this._m3u8loader = this._context.registry('M3U8_LOADER', FetchLoader)({ buffer: 'M3U8_BUFFER', readtype: 1 });
    this._tsloader = this._context.registry('TS_LOADER', FetchLoader)({ buffer: 'TS_BUFFER', readtype: 3 });

    // 初始化TS Demuxer
    this._context.registry('TS_DEMUXER', TsDemuxer)({ inputbuffer: 'TS_BUFFER' });

    // 初始化MP4 Remuxer
    this._context.registry('MP4_REMUXER', Mp4Remuxer);

    // 初始化MSE
    this.mse = this._context.registry('MSE', Mse)();
    this.initEvents();
  }

  initEvents () {
    this.on(LOADER_EVENTS.LOADER_COMPLETE, this._onLoadComplete.bind(this));

    this.on(REMUX_EVENTS.INIT_SEGMENT, this.mse.addSourceBuffers.bind(this.mse));

    this.on(REMUX_EVENTS.MEDIA_SEGMENT, this._onMediaSegment.bind(this));

    this.on(DEMUX_EVENTS.METADATA_PARSED, this._onMetadataParsed.bind(this));

    this.on(DEMUX_EVENTS.SEI_PARSED, this._handleSEIParsed.bind(this))

    this.on(DEMUX_EVENTS.DEMUX_COMPLETE, this._onDemuxComplete.bind(this));

    this.on(LOADER_EVENTS.LOADER_ERROR, this._onLoadError.bind(this));

    this.on(DEMUX_EVENTS.DEMUX_ERROR, this._onDemuxError.bind(this));

    this.on(REMUX_EVENTS.REMUX_ERROR, this._onRemuxError.bind(this));
  }

  _onError (type, mod, err, fatal) {
    let error = {
      errorType: type,
      errorDetails: `[${mod}]: ${err.message}`,
      errorFatal: fatal
    }
    this._player.emit(HLS_ERROR, error);
  }

  _onDemuxComplete () {
    this.emit(REMUX_EVENTS.REMUX_MEDIA)
  }
  _onMetadataParsed (type) {
    this.emit(REMUX_EVENTS.REMUX_METADATA, type)
  }

  _onMediaSegment () {
    this.mse.addSourceBuffers()
    this.mse.doAppend();
  }

  _onLoadError (loader, error) {
    if (!this._tsloader.loading && !this._m3u8loader.loading && this.retrytimes > 1) {
      this.retrytimes--;
      this._onError(LOADER_EVENTS.LOADER_ERROR, loader, error, false);
    } else if (this.retrytimes <= 1) {
      this._onError(LOADER_EVENTS.LOADER_ERROR, loader, error, true);
      this.emit(HLS_EVENTS.RETRY_TIME_EXCEEDED);
      this.mse.endOfStream();
    }
  }

  _onDemuxError (mod, error, fatal) {
    if (fatal === undefined) {
      fatal = true;
    }
    this._onError(LOADER_EVENTS.LOADER_ERROR, mod, error, fatal);
  }

  _onRemuxError (mod, error, fatal) {
    if (fatal === undefined) {
      fatal = true;
    }
    this._onError(REMUX_EVENTS.REMUX_ERROR, mod, error, fatal);
  }

  _handleSEIParsed (sei) {
    this._player.emit('SEI_PARSED', sei)
  }

  _onLoadComplete (buffer) {
    if (buffer.TAG === 'M3U8_BUFFER') {
      let mdata;
      try {
        this.m3u8Text = buffer.shift();
        mdata = M3U8Parser.parse(this.m3u8Text, this.baseurl);
      } catch (error) {
        this._onError('M3U8_PARSER_ERROR', 'M3U8_PARSER', error, false);
      }

      if (!mdata) {
        if (this.retrytimes > 0) {
          this.retrytimes--;
          this._preload();
        } else {
          this.emit(HLS_EVENTS.RETRY_TIME_EXCEEDED);
          this.mse.endOfStream();
        }
        return;
      }

      try {
        this._playlist.pushM3U8(mdata, true);
      } catch (error) {
        this._onError('M3U8_PARSER_ERROR', 'PLAYLIST', error, false);
      }

      if (this._playlist.encrypt && this._playlist.encrypt.uri && !this._playlist.encrypt.key) {
        this._context.registry('DECRYPT_BUFFER', XgBuffer)();
        this._context.registry('KEY_BUFFER', XgBuffer)();
        this._tsloader.buffer = 'DECRYPT_BUFFER';
        this._keyLoader = this._context.registry('KEY_LOADER', FetchLoader)({buffer: 'KEY_BUFFER', readtype: 3});
        this.emitTo('KEY_LOADER', LOADER_EVENTS.LADER_START, this._playlist.encrypt.uri);
      } else {
        this._m3u8Loaded(mdata);
      }
    } else if (buffer.TAG === 'TS_BUFFER') {
      this.retrytimes = this.configs.retrytimes || 3;
      this._playlist.downloaded(this._tsloader.url, true);
      this.emit(DEMUX_EVENTS.DEMUX_START);
    } else if (buffer.TAG === 'DECRYPT_BUFFER') {
      this.retrytimes = this.configs.retrytimes || 3;
      this._playlist.downloaded(this._tsloader.url, true);
      this.emitTo('CRYPTO', CRYTO_EVENTS.START_DECRYPT);
    } else if (buffer.TAG === 'KEY_BUFFER') {
      this.retrytimes = this.configs.retrytimes || 3;
      this._playlist.encrypt.key = buffer.shift();
      this._crypto = this._context.registry('CRYPTO', Crypto)({
        key: this._playlist.encrypt.key,
        iv: this._playlist.encrypt.ivb,
        method: this._playlist.encrypt.method,
        inputbuffer: 'DECRYPT_BUFFER',
        outputbuffer: 'TS_BUFFER'
      });
      this._crypto.on(CRYTO_EVENTS.DECRYPTED, this._onDcripted.bind(this));
    }
  }

  _onDcripted () {
    this.emit(DEMUX_EVENTS.DEMUX_START);
  }

  _m3u8Loaded (mdata) {
    if (!this.preloadTime) {
      this.preloadTime = this._playlist.targetduration ? this._playlist.targetduration : 5;
    }
    if (this._playlist.fragLength > 0 && this._playlist.sequence < mdata.sequence) {
      this.retrytimes = this.configs.retrytimes || 3;
    } else {
      if (this.retrytimes > 0) {
        this.retrytimes--;
        this._preload();
      } else {
        this.emit(HLS_EVENTS.RETRY_TIME_EXCEEDED);
        this.mse.endOfStream();
      }
    }
  }
  _checkStatus () {
    if (this.retrytimes < 1 && (new Date().getTime() - this._lastCheck < 10000)) {
      return;
    }
    this._lastCheck = new Date().getTime();
    if (this._player.buffered.length < 1) {
      this._preload()
    } else {
      // Check for load.
      let currentTime = this._player.currentTime;
      let bufferstart = this._player.buffered.start(this._player.buffered.length - 1);
      if (this._player.readyState <= 2) {
        if (currentTime < bufferstart) {
          this._player.currentTime = bufferstart;
          currentTime = bufferstart;
        } else {
          this._preload();
        }
      }
      let bufferend = this._player.buffered.end(this._player.buffered.length - 1);
      if (currentTime < bufferend - (this.preloadTime * 2)) {
        this._player.currentTime = bufferend - (this.preloadTime * 2);
      }
      if (bufferend > this.preloadTime * 2) {
        this.mse.remove(bufferend - (this.preloadTime * 2));
      }
      if (currentTime > bufferend - this.preloadTime) {
        this._preload();
      }
    }
  }

  _preload () {
    if (this._tsloader.loading || this._m3u8loader.loading) {
      return;
    }
    let frag = this._playlist.getTs();

    if (frag && !frag.downloaded && !frag.downloading) {
      this._playlist.downloading(frag.url, true);
      this.emitTo('TS_LOADER', LOADER_EVENTS.LADER_START, frag.url)
    } else {
      let preloadTime = this.preloadTime ? this.preloadTime : 0;
      let current = new Date().getTime();
      if ((!frag || frag.downloaded) &&
        (current - this._m3u8lasttime) / 1000 > preloadTime) {
        this._m3u8lasttime = current
        this.emitTo('M3U8_LOADER', LOADER_EVENTS.LADER_START, this.url);
      }
    }
  }

  load (url) {
    this.baseurl = M3U8Parser.parseURL(url);
    this.url = url;
    this._preload();
  }

  destroy () {
    clearInterval(this._timmer);

    this.mse = null
    this.m3u8Text = null
  }
}
export default HlsLiveController;
