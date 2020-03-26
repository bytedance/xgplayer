'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xgplayerTransmuxerCodecAvc = require('xgplayer-transmuxer-codec-avc');

var _xgplayerTransmuxerBufferStream = require('xgplayer-transmuxer-buffer-stream');

var _xgplayerTransmuxerBufferStream2 = _interopRequireDefault(_xgplayerTransmuxerBufferStream);

var _xgplayerTransmuxerModelTrackmeta = require('xgplayer-transmuxer-model-trackmeta');

var _xgplayerTransmuxerConstantEvents = require('xgplayer-transmuxer-constant-events');

var _xgplayerTransmuxerConstantEvents2 = _interopRequireDefault(_xgplayerTransmuxerConstantEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var H264Demuxer = function () {
  function H264Demuxer() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, H264Demuxer);

    this._player = options.player;

    this.videoMeta = new _xgplayerTransmuxerModelTrackmeta.VideoTrackMeta();
    this.videoTrack = {
      samples: []
    };
    this.fps = options.fps || 30;
    this.currentSampleIdx = 0;
    this.duration = 0;
  }

  _createClass(H264Demuxer, [{
    key: 'init',
    value: function init() {
      this.initEvents();
    }
  }, {
    key: 'initEvents',
    value: function initEvents() {
      this.on(_xgplayerTransmuxerConstantEvents2.default.LOADER_EVENTS.LOADER_DATALOADED, this.handleDataLoaded.bind(this));
      // this.on(Events.LOADER_EVENTS.LOADER_COMPLETE, this.handleDataLoaded.bind(this))
    }
  }, {
    key: 'load',
    value: function load(url) {
      this.emit(_xgplayerTransmuxerConstantEvents2.default.LOADER_EVENTS.LADER_START, url);
    }
  }, {
    key: 'handleDataLoaded',
    value: function handleDataLoaded() {
      var _this = this;

      var buffer = this.buffer;
      var data = buffer.shift(buffer.length);
      buffer.clear();
      var stream = new _xgplayerTransmuxerBufferStream2.default(data.buffer);
      var units = _xgplayerTransmuxerCodecAvc.NalUnit.getNalunits(stream);

      var lastUnit = units.pop();
      var lastUnitData = new Uint8Array(lastUnit.body.byteLength + 4);
      lastUnitData.set(new Uint8Array(lastUnit.header), 0);
      lastUnitData.set(new Uint8Array(lastUnit.body), 4);
      buffer.push(lastUnitData);

      var sps = void 0;
      var pps = void 0;
      units.forEach(function (unit) {
        var ts = Math.floor(1000 * _this.currentSampleIdx++ / _this.fps);
        var currentSample = {
          dts: ts,
          pts: ts,
          data: null,
          isKeyframe: false
        };
        if (unit.sps) {
          sps = true;
          _this.videoMeta.sps = unit.body;
          _this.videoMeta.presentHeight = unit.sps.present_size.height;
          _this.videoMeta.presentWidth = unit.sps.present_size.width;
        } else if (unit.pps) {
          pps = true;
          _this.videoMeta.pps = unit.body;
        }

        var data = new Uint8Array(unit.body.byteLength + 4);
        data.set([0, 0, 0, 1], 0);
        data.set(unit.body, 4);
        currentSample.data = data;
        currentSample.isKeyframe = unit.idr;

        _this.videoTrack.samples.push(currentSample);
      });

      if (sps && pps && !this.videoMetaInited) {
        this._player.video.setVideoMeta(this.videoMeta);
        this.videoMetaInited = true;
      }
      if (!this.intervalId) {
        this.intervalId = setInterval(function () {
          if (_this.videoTrack.samples.length) {
            _this._player.video.onDemuxComplete(_this.videoTrack);
          } else {
            clearInterval(_this.intervalId);
          }
        }, 500);
      }
      this.duration = Math.round(Math.floor(this.currentSampleIdx / this.fps));
      this._player.emit('durationchange');
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this._player = null;
      this.videoMeta = null;
      this.videoTrack = {
        samples: []
      };
      this.fps = null;
      this.currentSampleIdx = null;
    }
  }, {
    key: 'buffer',
    get: function get() {
      return this._context.getInstance('LOADER_BUFFER');
    }
  }]);

  return H264Demuxer;
}();

exports.default = H264Demuxer;