'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xgplayerUtils = require('xgplayer-utils');

var _xgplayerBuffer = require('xgplayer-buffer');

var _xgplayerLoader = require('xgplayer-loader');

var _xgplayerCodec = require('xgplayer-codec');

var _index = require('xgplayer-remux/src/mp4/index');

var _index2 = _interopRequireDefault(_index);

var _xgplayerDemux = require('xgplayer-demux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LOADER_EVENTS = _xgplayerUtils.EVENTS.LOADER_EVENTS;
var REMUX_EVENTS = _xgplayerUtils.EVENTS.REMUX_EVENTS;
var DEMUX_EVENTS = _xgplayerUtils.EVENTS.DEMUX_EVENTS;
var HLS_EVENTS = _xgplayerUtils.EVENTS.HLS_EVENTS;
var CRYTO_EVENTS = _xgplayerUtils.EVENTS.CRYTO_EVENTS;
var HLS_ERROR = 'HLS_ERROR';

var HlsVodController = function () {
  function HlsVodController(configs) {
    _classCallCheck(this, HlsVodController);

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
    this.m3u8Text = null;
  }

  _createClass(HlsVodController, [{
    key: 'init',
    value: function init() {
      // 初始化Buffer （M3U8/TS/Playlist);
      this._context.registry('M3U8_BUFFER', _xgplayerBuffer.XgBuffer);
      this._tsBuffer = this._context.registry('TS_BUFFER', _xgplayerBuffer.XgBuffer)();
      this._tracks = this._context.registry('TRACKS', _xgplayerBuffer.Tracks)();

      this._playlist = this._context.registry('PLAYLIST', _xgplayerDemux.Playlist)({ autoclear: true });
      this._presource = this._context.registry('PRE_SOURCE_BUFFER', _xgplayerBuffer.PreSource)();

      this._compat = this._context.registry('COMPATIBILITY', _xgplayerCodec.Compatibility)();

      // 初始化M3U8Loader;
      this._context.registry('M3U8_LOADER', _xgplayerLoader.FetchLoader)({ buffer: 'M3U8_BUFFER', readtype: 1 });
      this._tsloader = this._context.registry('TS_LOADER', _xgplayerLoader.FetchLoader)({ buffer: 'TS_BUFFER', readtype: 3 });

      // 初始化TS Demuxer
      this._context.registry('TS_DEMUXER', _xgplayerDemux.TsDemuxer)({ inputbuffer: 'TS_BUFFER' });

      // 初始化MP4 Remuxer
      this._context.registry('MP4_REMUXER', _index2.default);

      // 初始化MSE
      this.mse = this._context.registry('MSE', _xgplayerUtils.Mse)({ container: this.container, preloadTime: this.preloadTime });
      this.initEvents();
    }
  }, {
    key: 'initEvents',
    value: function initEvents() {
      this.on(LOADER_EVENTS.LOADER_COMPLETE, this._onLoaderCompete.bind(this));

      this.on(LOADER_EVENTS.LOADER_ERROR, this._onLoadError.bind(this));

      this.on(REMUX_EVENTS.INIT_SEGMENT, this._onInitSegment.bind(this));

      this.on(REMUX_EVENTS.MEDIA_SEGMENT, this._onMediaSegment.bind(this));

      this.on(DEMUX_EVENTS.METADATA_PARSED, this._onMetadataParsed.bind(this));

      this.on(DEMUX_EVENTS.DEMUX_COMPLETE, this._onDemuxComplete.bind(this));

      this.on(DEMUX_EVENTS.DEMUX_ERROR, this._onDemuxError.bind(this));

      this.on(REMUX_EVENTS.REMUX_ERROR, this._onRemuxError.bind(this));

      this.on('TIME_UPDATE', this._onTimeUpdate.bind(this));

      this.on('WAITING', this._onWaiting.bind(this));
    }
  }, {
    key: '_onError',
    value: function _onError(type, mod, err, fatal) {
      var error = {
        errorType: type,
        errorDetails: '[' + mod + ']: ' + err.message,
        errorFatal: fatal
      };
      this._player && this._player.emit(HLS_ERROR, error);
    }
  }, {
    key: '_onLoadError',
    value: function _onLoadError(mod, error) {
      this._onError(LOADER_EVENTS.LOADER_ERROR, mod, error, true);
      this.emit(HLS_EVENTS.RETRY_TIME_EXCEEDED);
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
    key: '_onRemuxError',
    value: function _onRemuxError(mod, error, fatal) {
      if (fatal === undefined) {
        fatal = true;
      }
      this._onError(REMUX_EVENTS.REMUX_ERROR, mod, error, fatal);
    }
  }, {
    key: '_onWaiting',
    value: function _onWaiting(container) {
      var end = true;

      var playListLen = Object.keys(this._playlist.list).length;
      if (!playListLen) {
        return;
      }

      for (var i = 0; i < Object.keys(this._playlist.list).length; i++) {
        if (this.container.currentTime * 1000 < parseInt(Object.keys(this._playlist.list)[i])) {
          end = false;
        }
      }
      if (end) {
        var ts = this._playlist.getTs(this.container.currentTime * 1000);
        if (!ts) {
          this._player.emit('ended');
          this.mse.endOfStream();
        } else {
          if (ts.downloaded) {
            this._player.emit('ended');
            this.mse.endOfStream();
          }
        }
      }
    }
  }, {
    key: '_onTimeUpdate',
    value: function _onTimeUpdate(container) {
      this._preload(container.currentTime);
    }
  }, {
    key: '_onDemuxComplete',
    value: function _onDemuxComplete() {
      this.emit(REMUX_EVENTS.REMUX_MEDIA);
    }
  }, {
    key: '_onMetadataParsed',
    value: function _onMetadataParsed(type) {
      var duration = parseInt(this._playlist.duration);
      if (type === 'video') {
        this._tracks.videoTrack.meta.duration = duration;
      } else if (type === 'audio') {
        this._tracks.audioTrack.meta.duration = duration;
      }
      this.emit(REMUX_EVENTS.REMUX_METADATA, type);
    }
  }, {
    key: '_onMediaSegment',
    value: function _onMediaSegment() {
      if (Object.keys(this.mse.sourceBuffers).length < 1) {
        this.mse.addSourceBuffers();
      }

      this.mse.doAppend();
    }
  }, {
    key: '_onInitSegment',
    value: function _onInitSegment() {
      this.mse.addSourceBuffers();
    }
  }, {
    key: '_onLoaderCompete',
    value: function _onLoaderCompete(buffer) {
      if (buffer.TAG === 'M3U8_BUFFER') {
        this.m3u8Text = buffer.shift();
        var mdata = _xgplayerDemux.M3U8Parser.parse(this.m3u8Text, this.baseurl);
        try {
          this._playlist.pushM3U8(mdata);
        } catch (error) {
          this._onError('M3U8_PARSER_ERROR', 'PLAYLIST', error, true);
        }
        if (this._playlist.encrypt && this._playlist.encrypt.uri && !this._playlist.encrypt.key) {
          this._context.registry('DECRYPT_BUFFER', _xgplayerBuffer.XgBuffer)();
          this._context.registry('KEY_BUFFER', _xgplayerBuffer.XgBuffer)();
          this._tsloader.buffer = 'DECRYPT_BUFFER';
          this._keyLoader = this._context.registry('KEY_LOADER', _xgplayerLoader.FetchLoader)({ buffer: 'KEY_BUFFER', readtype: 3 });
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

          var frag = this._playlist.getTs();
          if (frag) {
            this._playlist.downloading(frag.url, true);
            this.emitTo('TS_LOADER', LOADER_EVENTS.LADER_START, frag.url);
          } else {
            if (this.retrytimes > 0) {
              this.retrytimes--;
              this.emitTo('M3U8_LOADER', LOADER_EVENTS.LADER_START, this.url);
            }
          }
        }
      } else if (buffer.TAG === 'TS_BUFFER') {
        this._preload(this.mse.container.currentTime);
        this._playlist.downloaded(this._tsloader.url, true);
        this.emit(DEMUX_EVENTS.DEMUX_START, Object.assign({ url: this._tsloader.url }, this._playlist._ts[this._tsloader.url]));
      } else if (buffer.TAG === 'DECRYPT_BUFFER') {
        this.retrytimes = this.configs.retrytimes || 3;
        this._playlist.downloaded(this._tsloader.url, true);
        this.emitTo('CRYPTO', CRYTO_EVENTS.START_DECRYPT, Object.assign({ url: this._tsloader.url }, this._playlist._ts[this._tsloader.url]));
      } else if (buffer.TAG == 'KEY_BUFFER') {
        this.retrytimes = this.configs.retrytimes || 3;
        this._playlist.encrypt.key = buffer.shift();
        this._crypto = this._context.registry('CRYPTO', _xgplayerUtils.Crypto)({
          key: this._playlist.encrypt.key,
          iv: this._playlist.encrypt.ivb,
          method: this._playlist.encrypt.method,
          inputbuffer: 'DECRYPT_BUFFER',
          outputbuffer: 'TS_BUFFER'
        });

        this._crypto.on(CRYTO_EVENTS.DECRYPTED, this._onDcripted.bind(this));

        var _frag = this._playlist.getTs();
        if (_frag) {
          this._playlist.downloading(_frag.url, true);
          this.emitTo('TS_LOADER', LOADER_EVENTS.LADER_START, _frag.url);
        } else {
          if (this.retrytimes > 0) {
            this.retrytimes--;
            this.emitTo('M3U8_LOADER', LOADER_EVENTS.LADER_START, this.url);
          }
        }
      }
    }
  }, {
    key: '_onDcripted',
    value: function _onDcripted() {
      this.emit(DEMUX_EVENTS.DEMUX_START);
    }
  }, {
    key: 'seek',
    value: function seek(time) {
      var video = this._player.video;

      for (var i = 0; i < video.buffered.length; i++) {
        if (time >= video.buffered.start(i) && time < video.buffered.end(i)) {
          return;
        }
      }

      this._lastSeekTime = time;
      this._tsloader.destroy();
      this._tsloader = this._context.registry('TS_LOADER', _xgplayerLoader.FetchLoader)({ buffer: 'TS_BUFFER', readtype: 3 });
      if (this._presource.sources.video) {
        this._presource.sources.video.data = [];
      }
      if (this._presource.sources.audio) {
        this._presource.sources.audio.data = [];
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
  }, {
    key: 'load',
    value: function load(url) {
      this.baseurl = _xgplayerDemux.M3U8Parser.parseURL(url);
      this.url = url;
      this.emitTo('M3U8_LOADER', LOADER_EVENTS.LADER_START, url);
    }
  }, {
    key: '_preload',
    value: function _preload(time) {
      time = Math.floor(time);
      if (this._tsloader.loading) {
        return;
      }
      var video = this.mse.container;
      if (video.buffered.length < 1) {
        var frag = this._playlist.getTs(0);
        if (frag && !frag.downloading && !frag.downloaded) {
          this._playlist.downloading(frag.url, true);
          this.emitTo('TS_LOADER', LOADER_EVENTS.LADER_START, frag.url);
        }
      } else {
        // Get current time range
        var currentbufferend = -1;
        if (!time) {
          time = video.buffered.end(0);
        }

        for (var i = 0; i < video.buffered.length; i++) {
          if (time >= video.buffered.start(i) && time < video.buffered.end(i)) {
            currentbufferend = video.buffered.end(i);
          }
        }

        if (currentbufferend < 0) {
          var _frag2 = this._playlist.getTs((time + 0.5) * 1000); // FIXME: Last frame buffer shortens duration
          if (_frag2 && !_frag2.downloading && !_frag2.downloaded) {
            this._playlist.downloading(_frag2.url, true);
            this.emitTo('TS_LOADER', LOADER_EVENTS.LADER_START, _frag2.url);
          }
        } else if (currentbufferend < time + this.preloadTime) {
          var _frag3 = this._playlist.getTs(currentbufferend * 1000);

          if (!_frag3) {
            return;
          }

          // let fragend = frag ? (frag.time + frag.duration) / 1000 : 0;

          var curTime = _frag3.time;
          var curFragTime = _frag3.time;

          if (_frag3.downloaded) {
            var loopMax = 1000;
            while (loopMax-- > 0) {
              curTime += 50;
              _frag3 = this._playlist.getTs(curTime);
              if (!_frag3 || _frag3.time > curFragTime) {
                break;
              }
            }
          }

          if (_frag3 && !_frag3.downloading && !_frag3.downloaded) {
            this._playlist.downloading(_frag3.url, true);
            this.emitTo('TS_LOADER', LOADER_EVENTS.LADER_START, _frag3.url);
          }
        }
      }
    }
  }, {
    key: 'destory',
    value: function destory() {
      this.configs = {};
      this.url = '';
      this.baseurl = '';
      this.sequence = 0;
      this._playlist = null;
      this.retrytimes = 3;
      this.container = undefined;
      this.preloadTime = 5;
      this._lastSeekTime = 0;
      this.m3u8Text = null;
      this.mse = null;

      this.off(LOADER_EVENTS.LOADER_COMPLETE, this._onLoaderCompete);

      this.off(REMUX_EVENTS.INIT_SEGMENT, this._onInitSegment);

      this.off(REMUX_EVENTS.MEDIA_SEGMENT, this._onMediaSegment);

      this.off(DEMUX_EVENTS.METADATA_PARSED, this._onMetadataParsed);

      this.off(DEMUX_EVENTS.DEMUX_COMPLETE, this._onDemuxComplete);

      this.off('TIME_UPDATE', this._onTimeUpdate);

      this.off('WAITING', this._onWaiting);
    }
  }]);

  return HlsVodController;
}();

exports.default = HlsVodController;