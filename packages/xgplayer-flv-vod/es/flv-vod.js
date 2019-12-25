var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import FlvDemuxer from '../../xgplayer-demux/src/flv';
import Remuxer from 'xgplayer-remux';
import { Tracks, XgBuffer, PreSource } from 'xgplayer-buffer';
import { FetchLoader } from 'xgplayer-loader';
import { Mse, EVENTS } from 'xgplayer-utils';
import { Compatibility } from 'xgplayer-codec';
import Player from 'xgplayer';

var REMUX_EVENTS = EVENTS.REMUX_EVENTS;
var DEMUX_EVENTS = EVENTS.DEMUX_EVENTS;
var LOADER_EVENTS = EVENTS.LOADER_EVENTS;

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
  function FlvController(player, mse) {
    _classCallCheck(this, FlvController);

    this.TAG = Tag;
    this._player = player;

    this.mse = mse;
    this.state = {
      initSegmentArrived: false,
      range: {
        start: 0,
        end: ''
      },
      rangeSupport: true
    };
  }

  _createClass(FlvController, [{
    key: 'init',
    value: function init() {
      this._context.registry('FETCH_LOADER', FetchLoader);
      this._context.registry('LOADER_BUFFER', XgBuffer);

      this._context.registry('FLV_DEMUXER', FlvDemuxer);
      this._context.registry('TRACKS', Tracks);

      this._context.registry('MP4_REMUXER', Remuxer.Mp4Remuxer)(this._player.currentTime);
      this._context.registry('PRE_SOURCE_BUFFER', PreSource);

      // this._context.registry('COMPATIBILITY', Compatibility)

      this._context.registry('LOGGER', Logger);
      if (!this.mse) {
        this.mse = new Mse({ container: this._player.video }, this._context);
        this.mse.init();
      }

      this.initListeners();
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

      this.on(REMUX_EVENTS.INIT_SEGMENT, this._handleAppendInitSegment.bind(this));
      this.on(REMUX_EVENTS.MEDIA_SEGMENT, this._handleMediaSegment.bind(this));
    }
  }, {
    key: '_handleMediaInfo',
    value: function _handleMediaInfo() {
      var _this = this;

      if (!this._context.onMetaData) {
        this.emit(DEMUX_EVENTS.DEMUX_ERROR, new Error('failed to get mediainfo'));
      }
      var buffer = this._context.getInstance('LOADER_BUFFER');
      var loader = this._context.getInstance('FETCH_LOADER');
      if (this.isSeekable) {
        loader.cancel();
        // 初始化点播的range
        this.state.range = {
          start: 0,
          end: buffer.historyLen - 1
        };
        setTimeout(function () {
          _this.loadNext(0);
        });
      }
    }
  }, {
    key: '_handleLoaderDataLoaded',
    value: function _handleLoaderDataLoaded() {
      this.emitTo('FLV_DEMUXER', DEMUX_EVENTS.DEMUX_START);
    }
  }, {
    key: '_handleMetadataParsed',
    value: function _handleMetadataParsed(type) {
      this.emit(REMUX_EVENTS.REMUX_METADATA, type);
    }
  }, {
    key: '_handleDemuxComplete',
    value: function _handleDemuxComplete() {
      this.emit(REMUX_EVENTS.REMUX_MEDIA);
    }
  }, {
    key: '_handleAppendInitSegment',
    value: function _handleAppendInitSegment() {
      this.state.initSegmentArrived = true;
      this.mse.addSourceBuffers();
    }
  }, {
    key: '_handleMediaSegment',
    value: function _handleMediaSegment() {
      this.mse.addSourceBuffers();
      this.mse.doAppend();
    }
  }, {
    key: '_handleNetworkError',
    value: function _handleNetworkError(tag, err) {
      this._player.emit('error', new Player.Errors('network', this._player.config.url));
      this._onError(LOADER_EVENTS.LOADER_ERROR, tag, err, true);
    }
  }, {
    key: '_handleDemuxError',
    value: function _handleDemuxError(tag, err, fatal) {
      if (fatal === undefined) {
        fatal = false;
      }
      this._player.emit('error', new Player.Errors('parse', this._player.config.url));
      this._onError(LOADER_EVENTS.LOADER_ERROR, tag, err, fatal);
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
    value: function seek(time) {
      if (!this._context.onMetaData) {
        this.loadMeta();
        return;
      }
      if (!this.isSeekable) {
        return;
      }

      var buffer = this._context.getInstance('LOADER_BUFFER');
      buffer.clear();

      var _player$config$preloa = this._player.config.preloadTime,
          preloadTime = _player$config$preloa === undefined ? 15 : _player$config$preloa;

      var range = this.getSeekRange(time, preloadTime);
      this.state.range = range;

      if (this.compat) {
        this.compat.reset();
      }

      this.loadData();
    }
  }, {
    key: 'loadNext',
    value: function loadNext(curTime) {
      if (!this._context.onMetaData) {
        return;
      }

      if (this.loader.loading) {
        return;
      }

      if (this.getNextRange(curTime)) {
        this.loadData();
      }
    }
  }, {
    key: 'loadData',
    value: function loadData() {
      var _state$range = this.state.range,
          start = _state$range.start,
          end = _state$range.end;

      this.emit(LOADER_EVENTS.LADER_START, this._player.config.url, {
        headers: {
          method: 'get',
          Range: 'bytes=' + start + '-' + end
        }
      });
    }
  }, {
    key: 'loadMeta',
    value: function loadMeta() {
      var _this2 = this;

      this.loader.load(this._player.config.url, {
        headers: {
          Range: 'bytes=0-'
        }
      }).catch(function () {
        // 在尝试获取视频数据失败时，尝试使用直播方式加载整个视频
        _this2.state.rangeSupport = false;
        _this2.loadFallback();
      });
    }
  }, {
    key: 'loadFallback',
    value: function loadFallback() {
      var _this3 = this;

      this.loader.load(this._player.config.url).catch(function () {
        // 在尝试获取视频数据失败时，尝试使用直播方式加载整个视频
        _this3._player.emit('error', new Player.Errors('network', _this3._player.config.url));
      });
    }
  }, {
    key: 'getSeekRange',
    value: function getSeekRange(time, preloadTime) {
      var keyframes = this._context.onMetaData.keyframes;

      var duration = this._context.mediaInfo.duration;
      var seekStartTime = time;
      var seekEndTime = time + preloadTime;

      var seekStartFilePos = FlvController.findFilePosition(seekStartTime, keyframes);

      if (seekEndTime >= duration || seekStartTime >= duration) {
        return {
          start: seekStartFilePos,
          end: ''
        };
      }
      var seekEndFilePos = FlvController.findFilePosition(seekEndTime, keyframes);

      return {
        start: seekStartFilePos,
        end: seekEndFilePos
      };
    }
  }, {
    key: 'getNextRange',
    value: function getNextRange(time) {
      if (this.state.range.end === '') {
        return;
      }

      var _getSeekRange = this.getSeekRange(time, this.config.preloadTime || 15),
          end = _getSeekRange.end;

      if (end <= this.state.range.end && end !== '') {
        return;
      }

      this.state.range = {
        start: this.state.range.end + 1,
        end: end
      };
      return true;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this._player = null;
      this.mse = null;
      this.state = {
        initSegmentArrived: false,
        range: {
          start: 0,
          end: ''
        },
        rangeSupport: true
      };
    }
  }, {
    key: 'isSeekable',
    get: function get() {
      if (!this.state.rangeSupport || !this._context) {
        return false;
      }

      return this._context.onMetaData.keyframes !== null && this._context.onMetaData.keyframes !== undefined;
    }
  }, {
    key: 'config',
    get: function get() {
      return this._player.config;
    }
  }, {
    key: 'loader',
    get: function get() {
      return this._context.getInstance('FETCH_LOADER');
    }
  }, {
    key: 'compat',
    get: function get() {
      return this._context.getInstance('COMPATIBILITY');
    }
  }, {
    key: 'loadBuffer',
    get: function get() {
      return this_context.getInstance('LOADER_BUFFER');
    }
  }], [{
    key: 'findFilePosition',
    value: function findFilePosition(time, keyframes) {
      for (var i = 0, len = keyframes.times.length; i < len; i++) {
        var currentKeyframeTime = keyframes.times[i];
        var nextKeyframeTime = i + 1 < len ? keyframes.times[i + 1] : Number.MAX_SAFE_INTEGER;

        if (currentKeyframeTime <= time && time <= nextKeyframeTime) {
          return keyframes.filepositions[i];
        }
      }

      return '';
    }
  }]);

  return FlvController;
}();

export default FlvController;