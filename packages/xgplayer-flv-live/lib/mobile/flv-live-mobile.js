'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xgplayerTransmuxerDemuxFlv = require('xgplayer-transmuxer-demux-flv');

var _xgplayerTransmuxerDemuxFlv2 = _interopRequireDefault(_xgplayerTransmuxerDemuxFlv);

var _xgplayerTransmuxerLoaderFetch = require('xgplayer-transmuxer-loader-fetch');

var _xgplayerTransmuxerLoaderFetch2 = _interopRequireDefault(_xgplayerTransmuxerLoaderFetch);

var _xgplayerTransmuxerConstantEvents = require('xgplayer-transmuxer-constant-events');

var _xgplayerTransmuxerConstantEvents2 = _interopRequireDefault(_xgplayerTransmuxerConstantEvents);

var _xgplayerTransmuxerBufferTrack = require('xgplayer-transmuxer-buffer-track');

var _xgplayerTransmuxerBufferTrack2 = _interopRequireDefault(_xgplayerTransmuxerBufferTrack);

var _xgplayerTransmuxerBufferXgbuffer = require('xgplayer-transmuxer-buffer-xgbuffer');

var _xgplayerTransmuxerBufferXgbuffer2 = _interopRequireDefault(_xgplayerTransmuxerBufferXgbuffer);

var _xgplayerUtilsSniffer = require('xgplayer-utils-sniffer');

var _xgplayer = require('xgplayer');

var _xgplayer2 = _interopRequireDefault(_xgplayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEMUX_EVENTS = _xgplayerTransmuxerConstantEvents2.default.DEMUX_EVENTS;
var LOADER_EVENTS = _xgplayerTransmuxerConstantEvents2.default.LOADER_EVENTS;
var BROWSER_EVENTS = _xgplayerTransmuxerConstantEvents2.default.BROWSER_EVENTS;

var Tag = 'FLVController';

var Logger = function () {
  function Logger() {
    _classCallCheck(this, Logger);
  }

  _createClass(Logger, [{
    key: 'warn',
    value: function warn() {}
  }]);

  return Logger;
}();

var FLV_ERROR = 'FLV_ERROR';

var FlvController = function () {
  function FlvController(player) {
    _classCallCheck(this, FlvController);

    this.TAG = Tag;
    this._player = player;
    this.state = {
      initSegmentArrived: false,
      randomAccessPoints: []
    };

    this.bufferClearTimer = null;
  }

  _createClass(FlvController, [{
    key: 'init',
    value: function init() {

      this.initComponents();
      this.initListeners();
    }
  }, {
    key: 'initComponents',
    value: function initComponents() {
      this._context.registry('FETCH_LOADER', _xgplayerTransmuxerLoaderFetch2.default);
      this._context.registry('LOADER_BUFFER', _xgplayerTransmuxerBufferXgbuffer2.default);

      this._context.registry('FLV_DEMUXER', _xgplayerTransmuxerDemuxFlv2.default);
      this._context.registry('TRACKS', _xgplayerTransmuxerBufferTrack2.default);

      this._context.registry('LOGGER', Logger);
      this._context.registry('PAGE_VISIBILITY', _xgplayerUtilsSniffer.PageVisibility);
    }
  }, {
    key: 'initListeners',
    value: function initListeners() {
      this.on(LOADER_EVENTS.LOADER_DATALOADED, this._handleLoaderDataLoaded.bind(this));
      this.on(LOADER_EVENTS.LOADER_ERROR, this._handleNetworkError.bind(this));

      this.on(DEMUX_EVENTS.MEDIA_INFO, this._handleMediaInfo.bind(this));
      this.on(DEMUX_EVENTS.METADATA_PARSED, this._handleMetadataParsed.bind(this));
      this.on(DEMUX_EVENTS.DEMUX_COMPLETE, this._handleDemuxComplete.bind(this));
      this.on(DEMUX_EVENTS.DEMUX_ERROR, this._handleDemuxError.bind(this));
      this.on(DEMUX_EVENTS.SEI_PARSED, this._handleSEIParsed.bind(this));
      this.on(BROWSER_EVENTS.VISIBILITY_CHANGE, this._handleVisibilityChange.bind(this));
    }
  }, {
    key: '_handleMediaInfo',
    value: function _handleMediaInfo() {
      if (!this._context.mediaInfo) {
        this.emit(DEMUX_EVENTS.DEMUX_ERROR, new Error('failed to get mediainfo'));
      }
    }
  }, {
    key: '_handleLoaderDataLoaded',
    value: function _handleLoaderDataLoaded() {
      this.emitTo('FLV_DEMUXER', DEMUX_EVENTS.DEMUX_START);
    }
  }, {
    key: '_handleSEIParsed',
    value: function _handleSEIParsed(sei) {
      this._player.emit('SEI_PARSED', sei);
    }
  }, {
    key: '_handleDemuxComplete',
    value: function _handleDemuxComplete() {
      if (this._player.video) {
        var _context$getInstance = this._context.getInstance('TRACKS'),
            videoTrack = _context$getInstance.videoTrack,
            audioTrack = _context$getInstance.audioTrack;

        this._player.video.onDemuxComplete(videoTrack, audioTrack);
      }
    }
  }, {
    key: '_handleVisibilityChange',
    value: function _handleVisibilityChange(visible) {
      if (!visible && !this._player.paused) {
        this._player.pause();
      }
    }
  }, {
    key: '_handleMetadataParsed',
    value: function _handleMetadataParsed(type) {
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
    key: '_handleAppendInitSegment',
    value: function _handleAppendInitSegment() {
      this.state.initSegmentArrived = true;
    }
  }, {
    key: '_handleNetworkError',
    value: function _handleNetworkError(tag, err) {
      this._player.emit('error', new _xgplayer2.default.Errors('network', this._player.config.url));
      this._onError(LOADER_EVENTS.LOADER_ERROR, tag, err, true);
    }
  }, {
    key: '_handleDemuxError',
    value: function _handleDemuxError(tag, err, fatal) {
      if (fatal === undefined) {
        fatal = false;
      }
      this._player.emit('error', new _xgplayer2.default.Errors('parse', this._player.config.url));
      this._onError(DEMUX_EVENTS.DEMUX_ERROR, tag, err, fatal);
    }
  }, {
    key: '_handleAddRAP',
    value: function _handleAddRAP(rap) {
      if (this.state.randomAccessPoints) {
        this.state.randomAccessPoints.push(rap);
      }
    }
  }, {
    key: '_onError',
    value: function _onError(type, mod, err, fatal) {
      var error = {
        errorType: type,
        errorDetails: '[' + mod + ']: ' + err.message,
        errorFatal: fatal || false
      };
      this._player.emit(FLV_ERROR, error);
    }
  }, {
    key: 'seek',
    value: function seek() {
      if (!this.state.initSegmentArrived) {
        this.loadData();
      }
    }
  }, {
    key: 'loadData',
    value: function loadData() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._player.config.url;

      this.emit(LOADER_EVENTS.LADER_START, url);
    }
  }, {
    key: 'pause',
    value: function pause() {
      var loader = this._context.getInstance('FETCH_LOADER');

      if (loader) {
        loader.cancel();
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this._player = null;
      this.state.randomAccessPoints = [];
    }
  }]);

  return FlvController;
}();

exports.default = FlvController;