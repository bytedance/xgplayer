var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import Workerify from 'webworkify-webpack'
// eslint-disable-next-line import/no-webpack-loader-syntax
import VideoWorker from 'worker!./worker.js';
import Stream from 'xgplayer-transmuxer-buffer-stream';
import { NalUnit } from 'xgplayer-transmuxer-codec-avc';
import Render from 'xgplayer-render/src/index';
import SourceBuffer from './sourcebuffer';
import TimeRanges from './time-ranges';

var VideoCanvas = function () {
  function VideoCanvas(config) {
    _classCallCheck(this, VideoCanvas);

    this.config = Object.assign({}, config);
    this.canvas = this.config.canvas ? this.config.canvas : document.createElement('canvas');
    this.source = new SourceBuffer({ type: 'video' });
    this.preloadTime = this.config.preloadTime || 3;
    this.oncanplay = undefined;
    this.onFirstFrame = undefined;
    this.meta = undefined;
    this.readyStatus = 0;
    this.paused = true;
    this.count = 0;
    this.currentTime = 0;
    this.lastPlayed = 0;

    this._decoderInited = false;
    this._avccpushed = false;
    this._decodedFrames = {};
    this._lastSampleDts = undefined;
    this._baseDts = undefined;
    this._lastRenderTime = null;
    this.playFinish = null;

    this.canvas.style.maxWidth = '100%';
    this.canvas.style.maxHeight = '100%';
    this.canvas.style.top = 0;
    this.canvas.style.bottom = 0;
    this.canvas.style.left = 0;
    this.canvas.style.right = 0;
    this.canvas.style.margin = 'auto';
    this.canvas.style.position = 'absolute';
  }

  _createClass(VideoCanvas, [{
    key: 'pause',
    value: function pause() {
      this.paused = true;
    }
  }, {
    key: 'initWasmWorker',
    value: function initWasmWorker() {
      var _this2 = this;

      var _this = this;
      // eslint-disable-next-line no-undef
      this.wasmworker = new VideoWorker();
      this.wasmworker.postMessage({
        msg: 'init',
        meta: this.meta
      });
      this.wasmworker.addEventListener('message', function (msg) {
        switch (msg.data.msg) {
          case 'DECODER_READY':
            _this._decoderInited = true;
            break;
          case 'DECODED':
            _this2._onDecoded(msg.data);
            break;
        }
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
        var format = 'YUV420';
        if (meta.chromaFormat === 422) {
          format = 'YUV422P';
        }
        var config = Object.assign({ format: format, canvas: this.canvas }, this.config);
        this.yuvCanvas = new Render(config);
      }
      this.readyStatus = 1;
    }
  }, {
    key: 'decodeVideo',
    value: function decodeVideo(videoTrack) {
      if (!this._decoderInited) {
        return;
      }

      if (!this._avccpushed) {
        this.setVideoMetaData(this.meta);
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

      this._preload();
    }
  }, {
    key: '_preload',
    value: function _preload() {
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
      var nals = NalUnit.getAvccNals(new Stream(sample.data.buffer));

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
    key: '_onDecoded',
    value: function _onDecoded(data) {
      var dts = data.info.dts;

      this._decodedFrames[dts] = data;
      if (Object.keys(this._decodedFrames).length > 10) {
        if (this.playFinish) {
          this.playFinish();
        }
        if (this.oncanplay) {
          this.oncanplay();
        }
      }
    }
  }, {
    key: 'play',
    value: function play() {
      var _this3 = this;

      this.paused = false;
      return new Promise(function (resolve) {
        _this3.playFinish = resolve;
      }).then(function () {
        _this3.playFinish = null;
      });
    }
  }, {
    key: '_onTimer',
    value: function _onTimer(currentTime) {
      if (this.paused) {
        return;
      }

      if (this.meta) {
        if (this.meta.frameRate && this.meta.frameRate.fixed && this.meta.frameRate.fps) {}
        var frameTimes = Object.keys(this._decodedFrames);
        if (frameTimes.length > 0) {
          this.currentTime = currentTime;
          var frameTime = -1;
          for (var i = 0; i < frameTimes.length && Number.parseInt(frameTimes[i]) - this._baseDts <= this.currentTime; i++) {
            frameTime = Number.parseInt(frameTimes[i - 1]);
          }

          var frame = this._decodedFrames[frameTime];
          if (frame) {
            var buf = [];
            if (this.meta.chromaFormat === 420) {

              var buf0 = frame.buffer.slice(0, frame.yLinesize * frame.height);
              var buf1 = frame.buffer.slice(frame.yLinesize * frame.height, frame.yLinesize * frame.height * 1.25);
              var buf2 = frame.buffer.slice(frame.yLinesize * frame.height * 1.25, frame.yLinesize * frame.height * 1.5);
              buf = [new Uint8Array(buf0), new Uint8Array(buf1), new Uint8Array(buf2)];
            }
            this.yuvCanvas.render(buf, frame.yLinesize, frame.height);
          }
          for (var _i2 = 0; _i2 < frameTimes.length; _i2++) {
            if (Number.parseInt(frameTimes[_i2]) < frameTime) {
              delete this._decodedFrames[frameTimes[_i2]];
            }
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
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.wasmworker.postMessage({ msg: 'destroy' });
      this.wasmworker = null;
      this.canvas = null;
      this.source = null;
      this._decoderInited = false;
    }
  }, {
    key: 'buffered',
    get: function get() {
      var ranges = [];
      var currentRange = {
        start: null,
        end: null
      };
      for (var i = 0; i < this.source.buffer.length; i++) {
        var _source$buffer$i = this.source.buffer[i],
            start = _source$buffer$i.start,
            end = _source$buffer$i.end;

        if (!currentRange.start) {
          currentRange.start = start;
        }
        if (!currentRange.end) {
          currentRange.end = end;
        }

        if (start - currentRange.end > 1000) {
          currentRange.start = currentRange.start / 1000;
          currentRange.end = currentRange.end / 1000;
          currentRange = {
            start: start,
            end: end
          };
        } else {
          currentRange.end = end;
        }
      }

      if (currentRange.start !== null && currentRange.end !== null) {
        currentRange.start = currentRange.start / 1000;
        currentRange.end = currentRange.end / 1000;
        ranges.push(currentRange);
      }

      return new TimeRanges(ranges);
    }
  }]);

  return VideoCanvas;
}();

export default VideoCanvas;