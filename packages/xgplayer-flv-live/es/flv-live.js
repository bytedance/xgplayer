var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import Remuxer from 'xgplayer-transmuxer-remux-mp4';
import FlvDemuxer from 'xgplayer-transmuxer-demux-flv';
import FetchLoader from 'xgplayer-transmuxer-loader-fetch';
import EVENTS from 'xgplayer-transmuxer-constant-events';

import Tracks from 'xgplayer-transmuxer-buffer-track';
import PreSource from 'xgplayer-transmuxer-buffer-presource';
import XgBuffer from 'xgplayer-transmuxer-buffer-xgbuffer';
import Compatibility from 'xgplayer-transmuxer-codec-compatibility';

import Mse from 'xgplayer-utils-mse';
import Player from 'xgplayer';

var REMUX_EVENTS = EVENTS.REMUX_EVENTS;
var DEMUX_EVENTS = EVENTS.DEMUX_EVENTS;
var LOADER_EVENTS = EVENTS.LOADER_EVENTS;
var MSE_EVENTS = EVENTS.MSE_EVENTS;

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
    this.state = {
      initSegmentArrived: false,
      randomAccessPoints: []
    };

    this.mse = mse;

    this.bufferClearTimer = null;

    this._handleTimeUpdate = this._handleTimeUpdate.bind(this);
  }

  _createClass(FlvController, [{
    key: 'init',
    value: function init() {
      if (!this.mse) {
        this.mse = new Mse({ container: this._player.video }, this._context);
        this.mse.init();
      }

      this.initComponents();
      this.initListeners();
    }
  }, {
    key: 'initComponents',
    value: function initComponents() {
      this._context.registry('FETCH_LOADER', FetchLoader);
      this._context.registry('LOADER_BUFFER', XgBuffer);

      this._context.registry('FLV_DEMUXER', FlvDemuxer);
      this._context.registry('TRACKS', Tracks);

      this._context.registry('MP4_REMUXER', Remuxer)(this._player.currentTime);
      this._context.registry('PRE_SOURCE_BUFFER', PreSource);

      if (this._player.config.compatibility !== false) {
        this._context.registry('COMPATIBILITY', Compatibility);
      }

      this._context.registry('LOGGER', Logger);
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

      this.on(REMUX_EVENTS.INIT_SEGMENT, this._handleAppendInitSegment.bind(this));
      this.on(REMUX_EVENTS.MEDIA_SEGMENT, this._handleMediaSegment.bind(this));
      this.on(REMUX_EVENTS.RANDOM_ACCESS_POINT, this._handleAddRAP.bind(this));

      this.on(MSE_EVENTS.SOURCE_UPDATE_END, this._handleSourceUpdateEnd.bind(this));

      this._player.on('timeupdate', this._handleTimeUpdate);
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
    key: '_handleMetadataParsed',
    value: function _handleMetadataParsed(type) {
      this.emit(REMUX_EVENTS.REMUX_METADATA, type);
    }
  }, {
    key: '_handleSEIParsed',
    value: function _handleSEIParsed(sei) {
      this._player.emit('SEI_PARSED', sei);
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
    key: '_handleSourceUpdateEnd',
    value: function _handleSourceUpdateEnd() {
      var time = this._player.currentTime;
      var video = this._player.video;
      var preloadTime = this._player.config.preloadTime || 5;

      var length = video.buffered.length;


      if (length === 0) {
        return;
      }

      var bufferEnd = video.buffered.end(length - 1);
      if (bufferEnd - time > preloadTime * 2) {
        this._player.currentTime = bufferEnd - preloadTime;
      }
      this.mse.doAppend();
    }
  }, {
    key: '_handleTimeUpdate',
    value: function _handleTimeUpdate() {
      var _this = this;

      var time = this._player.currentTime;

      var video = this._player.video;
      var buffered = video.buffered;

      if (!buffered || !buffered.length) {
        return;
      }

      var range = [0, 0];
      var currentTime = video.currentTime;
      if (buffered) {
        for (var i = 0, len = buffered.length; i < len; i++) {
          range[0] = buffered.start(i);
          range[1] = buffered.end(i);
          if (range[0] <= currentTime && currentTime <= range[1]) {
            break;
          }
        }
      }

      var bufferStart = range[0];
      var bufferEnd = range[1];

      if (currentTime > bufferEnd || currentTime < bufferStart) {
        video.currentTime = bufferStart;
        return;
      }

      if (time - bufferStart > 10 || buffered.length > 1) {
        // 在直播时及时清空buffer，降低直播内存占用
        if (this.bufferClearTimer || !this.state.randomAccessPoints.length) {
          return;
        }
        var rap = Infinity;
        for (var _i = 0; _i < this.state.randomAccessPoints.length; _i++) {
          var temp = Math.ceil(this.state.randomAccessPoints[_i] / 1000);
          if (temp > time - 10) {
            break;
          } else {
            rap = temp;
          }
        }

        // console.log('rap', rap, `time ${time}`, `bufferEnd ${bufferEnd}`,`clean ${Math.min(rap, time - 10, bufferEnd - 10)}`)
        this.mse.remove(Math.max(Math.min(rap, time - 10, bufferEnd - 10), 0.1), 0);

        this.bufferClearTimer = setTimeout(function () {
          _this.bufferClearTimer = null;
        }, 5000);
      }
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
      this._player.off('timeupdate', this._handleTimeUpdate);
      this._player = null;
      this.mse = null;
      this.state.randomAccessPoints = [];
    }
  }]);

  return FlvController;
}();

export default FlvController;