var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import Workerify from 'webworkify-webpack'
// eslint-disable-next-line import/no-webpack-loader-syntax
import VideoWorker from 'worker!./worker.js';
import Stream from 'xgplayer-transmuxer-buffer-stream';
import { NalUnit } from 'xgplayer-transmuxer-codec-avc';
// import Render from 'xgplayer-render/src';
import Render from './yuv-canvas';
import SourceBuffer from '../models/sourcebuffer';
import TimeRanges from '../models/time-ranges';
import EventEmitter from 'events';

var HAVE_NOTHING = 0;
var HAVE_METADATA = 1;
var HAVE_CURRENT_DATA = 2;
var HAVE_FUTURE_DATA = 3;
var HAVE_ENOUGH_DATA = 4;

var NOT_SEEK = 1;
var SEEKING = 2;
var SEEKED = 4;

export var VIDEO_CANVAS_EVENTS = {
  VIDEO_EVENTS: 'VIDEO_EVENTS'
};

var VideoCanvas = function (_EventEmitter) {
  _inherits(VideoCanvas, _EventEmitter);

  function VideoCanvas(config) {
    _classCallCheck(this, VideoCanvas);

    var _this = _possibleConstructorReturn(this, (VideoCanvas.__proto__ || Object.getPrototypeOf(VideoCanvas)).call(this));

    _this.config = Object.assign({}, config);
    _this.canvas = _this.config.canvas ? _this.config.canvas : document.createElement('canvas');
    _this.source = new SourceBuffer({ type: 'video' });
    _this.preloadTime = _this.config.preloadTime || 3;
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
      this.wasmworker = new VideoWorker();
      this.wasmworker.postMessage({
        msg: 'init',
        meta: this.meta
      });
      this.wasmworker.addEventListener('message', this.handleMessage);
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
        this.yuvCanvas = new Render(config);
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
      if (!this._lastSampleDts || this._lastSampleDts - this._baseDts < this.currentTime + this.preloadTime * 1000) {
        var sample = this.source.get();
        if (sample) {
          this._lastSampleDts = sample.dts;
          this._analyseNal(sample);
        }

        while (sample && this._lastSampleDts - this._baseDts < this.currentTime + this.preloadTime * 1000) {
          sample = this.source.get();
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
      var nals = NalUnit.getNalunits(new Stream(sample.data.buffer));

      var length = 0;
      for (var i = 0; i < nals.length; i++) {
        var nal = nals[i];
        length += nal.body.byteLength + 4;
      }
      var offset = 0;
      var data = new Uint8Array(length);
      for (var _i = 0; _i < nals.length; _i++) {
        var _nal = nals[_i];
        data.set([0, 0, 0, 1], offset);
        offset += 4;
        data.set(new Uint8Array(_nal.body), offset);
        offset += _nal.body.byteLength;
      }
      this.wasmworker.postMessage({
        msg: 'decode',
        data: data,
        info: {
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
      var dts = data.info.dts;

      this._decodedFrames[dts] = data;
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
      var _this2 = this;

      this.paused = false;
      return new Promise(function (resolve) {
        _this2.playFinish = resolve;
      }).then(function () {
        _this2.playFinish = null;
      });
    }
  }, {
    key: '_onTimer',
    value: function _onTimer(currentTime) {
      if (this.paused) {
        return false;
      }

      if (this.meta) {
        var frameTimes = Object.keys(this._decodedFrames);
        if (frameTimes.length > 0) {
          this.currentTime = currentTime;
          var frameTime = -1;
          for (var i = 0; i < frameTimes.length && Number.parseInt(frameTimes[i]) - this._baseDts <= this.currentTime; i++) {
            frameTime = Number.parseInt(frameTimes[i - 1]);
          }

          var frame = this._decodedFrames[frameTime];
          if (frame) {
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
            this.yuvCanvas.render(frame.buffer, frame.width, frame.height, frame.yLinesize, frame.uvLinesize);

            return true;
          } else {
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
          this._decoderInited = true;
          this.pushAvcc(this.meta);
          break;
        case 'DECODED':
          this._onDecoded(msg.data);
          break;
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
        currentRange.start = (currentRange.start - this._baseDts) / 1000;
        currentRange.end = (currentRange.end - this._baseDts) / 1000;
        ranges.push(currentRange);
      }

      return new TimeRanges(ranges);
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
}(EventEmitter);

export default VideoCanvas;