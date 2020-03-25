var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import EVENTS from 'xgplayer-transmuxer-constant-events';
import Tracks from 'xgplayer-transmuxer-buffer-track';
import XgBuffer from 'xgplayer-transmuxer-buffer-xgbuffer';
import FetchLoader from 'xgplayer-transmuxer-loader-fetch';
import Crypto from 'xgplayer-utils-crypto';

import M3U8Parser from 'xgplayer-transmuxer-demux-m3u8';
import TsDemuxer from 'xgplayer-transmuxer-demux-ts';
import Playlist from 'xgplayer-transmuxer-buffer-playlist';

var LOADER_EVENTS = EVENTS.LOADER_EVENTS;
var DEMUX_EVENTS = EVENTS.DEMUX_EVENTS;
var HLS_EVENTS = EVENTS.HLS_EVENTS;
var CRYTO_EVENTS = EVENTS.CRYTO_EVENTS;
var HLS_ERROR = 'HLS_ERROR';

var HlsLiveController = function () {
  function HlsLiveController(configs) {
    _classCallCheck(this, HlsLiveController);

    this.configs = Object.assign({}, configs);
    this.url = '';
    this.baseurl = '';
    this.sequence = 0;
    this._playlist = null;
    this.retrytimes = this.configs.retrytimes || 3;
    this.preloadTime = this.configs.preloadTime;
    this.container = this.configs.container;
    this._m3u8lasttime = 0;
    this._timmer = setInterval(this._checkStatus.bind(this), 50);
    this._lastCheck = 0;
    this._player = this.configs.player;
    this.m3u8Text = null;
  }

  _createClass(HlsLiveController, [{
    key: 'init',
    value: function init() {
      // 初始化Buffer （M3U8/TS/Playlist);
      this._context.registry('M3U8_BUFFER', XgBuffer);
      this._context.registry('TS_BUFFER', XgBuffer);
      this._context.registry('TRACKS', Tracks);

      this._playlist = this._context.registry('PLAYLIST', Playlist)({ autoclear: true });

      // 初始化M3U8Loader;
      this._m3u8loader = this._context.registry('M3U8_LOADER', FetchLoader)({ buffer: 'M3U8_BUFFER', readtype: 1 });
      this._tsloader = this._context.registry('TS_LOADER', FetchLoader)({ buffer: 'TS_BUFFER', readtype: 3 });

      // 初始化TS Demuxer
      this._context.registry('TS_DEMUXER', TsDemuxer)({ inputbuffer: 'TS_BUFFER' });

      this.initEvents();
    }
  }, {
    key: 'initEvents',
    value: function initEvents() {
      this.on(LOADER_EVENTS.LOADER_COMPLETE, this._onLoadComplete.bind(this));

      this.on(DEMUX_EVENTS.METADATA_PARSED, this._onMetadataParsed.bind(this));

      this.on(DEMUX_EVENTS.SEI_PARSED, this._handleSEIParsed.bind(this));

      this.on(DEMUX_EVENTS.DEMUX_COMPLETE, this._onDemuxComplete.bind(this));

      this.on(LOADER_EVENTS.LOADER_ERROR, this._onLoadError.bind(this));

      this.on(DEMUX_EVENTS.DEMUX_ERROR, this._onDemuxError.bind(this));
    }
  }, {
    key: '_onError',
    value: function _onError(type, mod, err, fatal) {
      var error = {
        errorType: type,
        errorDetails: '[' + mod + ']: ' + (err ? err.message : ''),
        errorFatal: fatal
      };
      this._player.emit(HLS_ERROR, error);
    }
  }, {
    key: '_onDemuxComplete',
    value: function _onDemuxComplete() {
      if (this._player.video) {
        var _context$getInstance = this._context.getInstance('TRACKS'),
            videoTrack = _context$getInstance.videoTrack,
            audioTrack = _context$getInstance.audioTrack;

        this._player.video.onDemuxComplete(videoTrack, audioTrack);
      }
    }
  }, {
    key: '_onMetadataParsed',
    value: function _onMetadataParsed(type) {
      if (type === 'audio') {
        // 将音频meta信息交给audioContext，不走remux封装
        var _context$getInstance2 = this._context.getInstance('TRACKS'),
            audioTrack = _context$getInstance2.audioTrack;

        if (audioTrack && audioTrack.meta) {
          this._setMetaToAudio(audioTrack.meta);
        }
      } else {
        var _context$getInstance3 = this._context.getInstance('TRACKS'),
            videoTrack = _context$getInstance3.videoTrack;

        if (videoTrack && videoTrack.meta) {
          this._setMetaToVideo(videoTrack.meta);
        }
      }
    }
  }, {
    key: '_setMetaToAudio',
    value: function _setMetaToAudio(audioMeta) {
      if (this._player.video) {
        this._player.video.setAudioMeta(audioMeta);
      }
    }
  }, {
    key: '_setMetaToVideo',
    value: function _setMetaToVideo(videoMeta) {
      if (this._player.video) {
        this._player.video.setVideoMeta(videoMeta);
      }
    }
  }, {
    key: '_onLoadError',
    value: function _onLoadError(loader, error) {
      if (!this._tsloader.loading && !this._m3u8loader.loading && this.retrytimes > 1) {
        this.retrytimes--;
        this._onError(LOADER_EVENTS.LOADER_ERROR, loader, error, false);
      } else if (this.retrytimes <= 1) {
        this._onError(LOADER_EVENTS.LOADER_ERROR, loader, error, true);
        this.emit(HLS_EVENTS.RETRY_TIME_EXCEEDED);
        if (this._player.video) {
          this._player.video.handleEnded();
        }
      }
    }
  }, {
    key: '_onDemuxError',
    value: function _onDemuxError(mod, error, fatal) {
      if (fatal === undefined) {
        fatal = true;
      }
      this._onError(LOADER_EVENTS.LOADER_ERROR, mod, error, fatal);
    }
  }, {
    key: '_handleSEIParsed',
    value: function _handleSEIParsed(sei) {
      this._player.emit('SEI_PARSED', sei);
    }
  }, {
    key: '_onLoadComplete',
    value: function _onLoadComplete(buffer) {
      if (buffer.TAG === 'M3U8_BUFFER') {
        var mdata = void 0;
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
            if (this._player.video) {
              this._player.video.handleEnded();
            }
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
          this._keyLoader = this._context.registry('KEY_LOADER', FetchLoader)({ buffer: 'KEY_BUFFER', readtype: 3 });
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
  }, {
    key: '_onDcripted',
    value: function _onDcripted() {
      this.emit(DEMUX_EVENTS.DEMUX_START);
    }
  }, {
    key: '_m3u8Loaded',
    value: function _m3u8Loaded(mdata) {
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
          if (this._player.video) {
            this._player.video.handleEnded();
          }
        }
      }
    }
  }, {
    key: '_checkStatus',
    value: function _checkStatus() {
      if (this.retrytimes < 1 && new Date().getTime() - this._lastCheck < 10000) {
        return;
      }
      this._lastCheck = new Date().getTime();
      if (this.container.buffered.length < 1) {
        this._preload();
      } else {
        // Check for load.
        var currentTime = this.container.currentTime;
        var bufferstart = this.container.buffered.start(this.container.buffered.length - 1);
        if (this.container.readyState <= 2) {
          if (currentTime < bufferstart) {
            this.container.currentTime = bufferstart;
            currentTime = bufferstart;
          } else {
            this._preload();
          }
        }
        var bufferend = this.container.buffered.end(this.container.buffered.length - 1);
        if (currentTime < bufferend - this.preloadTime * 2) {
          this.container.currentTime = bufferend - this.preloadTime * 2;
        }
        if (currentTime > bufferend - this.preloadTime) {
          this._preload();
        }
      }
    }
  }, {
    key: '_preload',
    value: function _preload() {
      if (this._tsloader.loading || this._m3u8loader.loading) {
        return;
      }
      var frag = this._playlist.getTs();

      if (frag && !frag.downloaded && !frag.downloading) {
        this._playlist.downloading(frag.url, true);
        this.emitTo('TS_LOADER', LOADER_EVENTS.LADER_START, frag.url);
      } else {
        var preloadTime = this.preloadTime ? this.preloadTime : 0;
        var current = new Date().getTime();
        if ((!frag || frag.downloaded) && (current - this._m3u8lasttime) / 1000 > preloadTime) {
          this._m3u8lasttime = current;
          this.emitTo('M3U8_LOADER', LOADER_EVENTS.LADER_START, this.url);
        }
      }
    }
  }, {
    key: 'load',
    value: function load(url) {
      this.baseurl = M3U8Parser.parseURL(url);
      this.url = url;
      this._preload();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      clearInterval(this._timmer);
      this.off(LOADER_EVENTS.LOADER_COMPLETE, this._onLoadComplete);
      // this.off(REMUX_EVENTS.REMUX_ERROR);
      this.off(DEMUX_EVENTS.METADATA_PARSED, this._onMetadataParsed);
      this.off(DEMUX_EVENTS.DEMUX_COMPLETE, this._onDemuxComplete);

      this.m3u8Text = null;
    }
  }]);

  return HlsLiveController;
}();

export default HlsLiveController;