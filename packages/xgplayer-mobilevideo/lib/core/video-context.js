'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIDEO_CANVAS_EVENTS = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _worker = require('worker!./worker.js');

var _worker2 = _interopRequireDefault(_worker);

var _backupWorker = require('worker!./backupWorker.js');

var _backupWorker2 = _interopRequireDefault(_backupWorker);

var _yuvCanvas = require('./yuv-canvas');

var _yuvCanvas2 = _interopRequireDefault(_yuvCanvas);

var _sourcebuffer = require('../models/sourcebuffer');

var _sourcebuffer2 = _interopRequireDefault(_sourcebuffer);

var _timeRanges = require('../models/time-ranges');

var _timeRanges2 = _interopRequireDefault(_timeRanges);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import Workerify from 'webworkify-webpack'
// eslint-disable-next-line import/no-webpack-loader-syntax

// import BackUpCodec from './backup-codec';


var HAVE_NOTHING = 0;
var HAVE_METADATA = 1;
var HAVE_CURRENT_DATA = 2;
var HAVE_FUTURE_DATA = 3;
var HAVE_ENOUGH_DATA = 4;

var NOT_SEEK = 1;
var SEEKING = 2;
var SEEKED = 4;

var VIDEO_CANVAS_EVENTS = exports.VIDEO_CANVAS_EVENTS = {
  VIDEO_EVENTS: 'VIDEO_EVENTS'
};

var VideoCanvas = function (_EventEmitter) {
  _inherits(VideoCanvas, _EventEmitter);

  function VideoCanvas(config) {
    _classCallCheck(this, VideoCanvas);

    var _this = _possibleConstructorReturn(this, (VideoCanvas.__proto__ || Object.getPrototypeOf(VideoCanvas)).call(this));

    _this.config = Object.assign({}, config);
    _this.canvas = _this.config.canvas ? _this.config.canvas : document.createElement('canvas');
    _this.source = new _sourcebuffer2.default({ type: 'video' });
    _this.onFirstFrame = undefined;
    _this.oncanplay = undefined;
    _this.initParameters();
    _this.canvas.style.maxWidth = '100%';
    _this.canvas.style.maxHeight = '100%';
    _this.canvas.style.top = 0;
    _this.canvas.style.bottom = 0;
    _this.canvas.style.left = 0;
    _this.canvas.style.right = 0;
    _this.canvas.style.margin = 'auto';
    _this.canvas.style.position = 'absolute';
    _this.handleMessage = _this.handleMessage.bind(_this);
    _this.useBackupTimer = null;
    return _this;
  }

  _createClass(VideoCanvas, [{
    key: 'initParameters',
    value: function initParameters() {
      this.meta = undefined;
      this.readyStatus = HAVE_NOTHING;
      this.paused = true;
      this.currentTime = 0;
      this._seekState = NOT_SEEK;
      this._avccpushed = false;
      this._decodedFrames = {};
      this._lastSampleDts = undefined;
      this._baseDts = undefined;
      this._lastRenderTime = null;
      this.playFinish = null;
      this._seekState = NOT_SEEK;
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.initParameters();
      this.source.reset();
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.paused = true;
    }
  }, {
    key: 'initWasmWorker',
    value: function initWasmWorker() {
      // eslint-disable-next-line no-undef
      window._shimWorkerDocument = document;
      window._shimWorkerWindow = window;
      this.initWorker(false);
    }
  }, {
    key: 'initWorker',
    value: function initWorker(isBackup) {
      var _this2 = this;

      if (this.wasmworker) {
        this.destroyWorker();
      }
      var VideoWorkerCls = isBackup ? _backupWorker2.default : _worker2.default;
      this.wasmworker = new VideoWorkerCls(false);
      this.wasmworker.onmessage = isBackup ? function (msg) {
        if (msg.data.msg === 'INIT_FAILED') {
          _this2.emit('error', new Error('backup worker init failed'));
        } else {
          _this2.handleMessage(msg);
        }
      } : this.handleMessage;

      this.wasmworker.postMessage({
        msg: 'init',
        meta: this.meta
      });
    }
  }, {
    key: 'setVideoMetaData',
    value: function setVideoMetaData(meta) {
      this.meta = meta;
      if (!this._decoderInited) {
        this.initWasmWorker();
        return;
      }
      this.wasmworker.postMessage({
        msg: 'updatemeta',
        meta: this.meta
      });
      this.pushAvcc(meta);
    }
  }, {
    key: 'pushAvcc',
    value: function pushAvcc(meta) {
      this._avccpushed = true;
      var data = new Uint8Array(meta.sps.byteLength + 4);
      data.set([0, 0, 0, 1]);
      data.set(meta.sps, 4);
      this.wasmworker.postMessage({
        msg: 'decode',
        data: data
      });

      data = new Uint8Array(meta.pps.byteLength + 4);
      data.set([0, 0, 0, 1]);
      data.set(meta.pps, 4);
      this.wasmworker.postMessage({
        msg: 'decode',
        data: data
      });

      if (!this.yuvCanvas) {
        var config = Object.assign({ meta: meta, canvas: this.canvas }, this.config);
        this.yuvCanvas = new _yuvCanvas2.default(config);
      } else {
        this.yuvCanvas.resetMeta(meta);
      }
      this.readyStatus = HAVE_METADATA;
    }
  }, {
    key: 'decodeVideo',
    value: function decodeVideo(videoTrack) {
      if (!this._decoderInited) {
        return;
      }
      if (!this._avccpushed) {
        this.pushAvcc(this.meta);
      }
      var samples = videoTrack.samples;

      var sample = samples.shift();

      while (sample) {
        if (!this._baseDts) {
          this._baseDts = sample.dts;
        }
        this.source.push(sample);
        sample = samples.shift();
      }

      this.preload();
    }
  }, {
    key: 'preload',
    value: function preload() {
      var bufferedEnd = this.buffered.end(0);
      if (!this._lastSampleDts || bufferedEnd - this.currentTime / 1000 < 4) {
        var sample = this.source.get();
        if (sample) {
          this._lastSampleDts = sample.dts;
          this._analyseNal(sample);
        }

        while (sample && this._lastSampleDts - this._baseDts < this.currentTime + this.config.preloadTime * 2000) {
          sample = this.source.get();
          // console.log(sample)
          if (sample) {
            this._analyseNal(sample);
            this._lastSampleDts = sample.dts;
          }
        }
      }
    }
  }, {
    key: '_analyseNal',
    value: function _analyseNal(sample) {
      // console.log('送入解码', sample.dts,data)
      this.wasmworker.postMessage({
        msg: 'decode',
        data: sample.data,
        info: {
          decodeTime: Date.now(),
          dts: sample.dts,
          pts: sample.pts ? sample.pts : sample.dts + sample.cts,
          key: sample.isKeyframe
        }
      });
    }
  }, {
    key: 'decodeVideoBuffer',
    value: function decodeVideoBuffer(buffer) {
      if (!this._decoderInited) {
        this.initWasmWorker();
        return;
      }
      this.wasmworker.postMessage({
        msg: 'decode',
        data: buffer
      });
    }
  }, {
    key: '_onDecoded',
    value: function _onDecoded(data) {
      if (!data.info) {
        return;
      }
      var dts = data.info.dts;

      this._decodedFrames[dts - this._baseDts] = data;
      var decodedFrameLen = Object.keys(this._decodedFrames).length;
      if (this.readyStatus == HAVE_METADATA && decodedFrameLen > 0) {
        this.readyStatus = HAVE_CURRENT_DATA;
        this.emit(VIDEO_CANVAS_EVENTS.VIDEO_EVENTS, 'loadeddata');
      }
      if (this._seekState == SEEKED) {
        this.readyStatus = HAVE_CURRENT_DATA;
        this._seekState = NOT_SEEK;
      }
      if (decodedFrameLen > 10) {
        if (this.playFinish) {
          this.playFinish();
        }
        if (this.readyStatus == HAVE_CURRENT_DATA) {
          this.readyStatus = HAVE_FUTURE_DATA;
          this.emit(VIDEO_CANVAS_EVENTS.VIDEO_EVENTS, 'canplay');
        }
        if (this.oncanplay) {
          this.oncanplay();
        }
        // 2s的时间
        if (this.readyStatus == HAVE_FUTURE_DATA && decodedFrameLen > 2 * (this.meta.frameRate.fps || 60)) {
          this.readyStatus = HAVE_ENOUGH_DATA;
          this.emit(VIDEO_CANVAS_EVENTS.VIDEO_EVENTS, 'canplaythrough');
        }
      } else {
        this.readyStatus = HAVE_CURRENT_DATA;
      }
    }
  }, {
    key: 'play',
    value: function play() {
      var _this3 = this;

      this.paused = false;
      if (!this.paused) {
        return Promise.resolve();
      }
      return new Promise(function (resolve) {
        _this3.playFinish = resolve;
      }).then(function () {
        _this3.playFinish = null;
      });
    }
  }, {
    key: '_onTimer',
    value: function _onTimer(currentTime) {
      var _this4 = this;

      // console.log(currentTime)
      if (this.paused) {
        return false;
      }

      if (this.meta) {
        var frameTimes = Object.keys(this._decodedFrames);
        // console.log(frameTimes)
        if (frameTimes.length > 0) {
          this.currentTime = currentTime;
          var frameTime = -1;
          for (var i = 0; i < frameTimes.length && Number.parseInt(frameTimes[i]) <= this.currentTime; i++) {
            frameTime = Number.parseInt(frameTimes[Math.max(i - 1, 0)]);
          }
          var frame = this._decodedFrames[frameTime];
          // console.log('source', this.source)
          // console.log('frametime,', frameTime)
          if (frame) {
            // console.log('render frame ', frameTime, Date.now())
            // let buf = []
            // if (this.meta.chromaFormat === 420) {
            //
            //   let buf0 = frame.buffer.slice(0, frame.yLinesize * frame.height);
            //   let buf1 = frame.buffer.slice(frame.yLinesize * frame.height, frame.yLinesize * frame.height * 1.25);
            //   let buf2 = frame.buffer.slice(frame.yLinesize * frame.height * 1.25, frame.yLinesize * frame.height * 1.5);
            //   buf = [new Uint8Array(buf0), new Uint8Array(buf1), new Uint8Array(buf2)];
            // }
            if (this._seekState == SEEKING) {
              this._seekState = SEEKED;
              this.emit(VIDEO_CANVAS_EVENTS.VIDEO_EVENTS, 'seeked');
            }
            frameTimes.forEach(function (time) {
              if (Number.parseInt(time) <= frameTime) {
                delete _this4._decodedFrames[time];
              }
            });
            this.yuvCanvas.render(frame.buffer, frame.width, frame.height, frame.yLinesize, frame.uvLinesize);

            return true;
          } else {
            if (frameTimes.length && Number(frameTimes[0]) > currentTime) {
              return true;
            }
            return false;
          }
        }
      }
      this._lastRenderTime = Date.now();
    }
  }, {
    key: 'cleanBuffer',
    value: function cleanBuffer() {
      if (this.currentTime > 1) {
        this.source.remove(0, this.currentTime - 1);
      }
      var frameTimes = Object.keys(this._decodedFrames);

      for (var i = 0; i < frameTimes.length; i++) {
        if (Number.parseInt(frameTimes[i]) < this.currentTime) {
          delete this._decodedFrames[frameTimes[i]];
        }
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.destroyWorker();
      this.canvas = null;
      this._decodedFrames = {};
      this.source = null;
      this._decoderInited = false;
      this._isSeeking = false;
    }
  }, {
    key: 'destroyWorker',
    value: function destroyWorker() {
      if (this.wasmworker) {
        this.wasmworker.removeEventListener('message', this.handleMessage);
        this.wasmworker.postMessage({ msg: 'destroy' });
      }
      this.wasmworker = null;
    }
  }, {
    key: 'handleMessage',
    value: function handleMessage(msg) {
      switch (msg.data.msg) {
        case 'DECODER_READY':
          console.log('wasm worker ready');
          this._decoderInited = true;
          this.pushAvcc(this.meta);
          break;
        case 'DECODED':
          this._onDecoded(msg.data);
          break;
        case 'LOG':
          console.log(msg.data.log);
          break;
        default:
          console.error('invalid messaeg', msg);
      }
    }
  }, {
    key: 'setVideoSeeking',
    value: function setVideoSeeking() {
      this._seekState = SEEKING;
      this.emit(VIDEO_CANVAS_EVENTS.VIDEO_EVENTS, 'seeking');
    }
  }, {
    key: 'buffered',
    get: function get() {
      var ranges = [];
      var currentRange = {
        start: null,
        end: null
      };
      var decodedTimes = Object.keys(this._decodedFrames);
      if (decodedTimes.length) {
        currentRange.start = Number.parseInt(decodedTimes[0]);
        currentRange.end = Number.parseInt(decodedTimes[decodedTimes.length - 1]);
      }

      if (currentRange.start !== null && currentRange.end !== null) {
        currentRange.start = currentRange.start / 1000;
        currentRange.end = currentRange.end / 1000;
        ranges.push(currentRange);
      }

      return new _timeRanges2.default(ranges);
    }
  }, {
    key: 'videoWidth',
    get: function get() {
      return this.canvas.width;
    }
  }, {
    key: 'videoHeight',
    get: function get() {
      return this.canvas.height;
    }
  }, {
    key: 'seeking',
    get: function get() {
      return this._seekState == SEEKING;
    }
  }, {
    key: 'readyState',
    get: function get() {
      return this.readyStatus;
    }
  }]);

  return VideoCanvas;
}(_events2.default);

exports.default = VideoCanvas;