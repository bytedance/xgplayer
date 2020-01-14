var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import './polyfills/custom-elements.min';
import './polyfills/native-element';
import { getTicker } from './helpers/ticker';
import VideoCtx from './core/video-context';
import AudioCtx from './core/audio-context';
import AVReconciler from './helpers/reconciler';

// eslint-disable-next-line no-undef

var MobileVideo = function (_HTMLElement) {
  _inherits(MobileVideo, _HTMLElement);

  _createClass(MobileVideo, null, [{
    key: 'resolveVideoGOP',

    /**
     * 保证当前播放的视频以gop为单位
     * @param videoTrack
     */
    value: function resolveVideoGOP(videoTrack) {
      var samples = videoTrack.samples;

      if (!samples.length) {
        return;
      }

      var firstIframeIdx = null;
      var lastIframeIdx = null;

      if (videoTrack.tempSamples && videoTrack.tempSamples.length) {
        // 将缓存帧放置到队列的头部
        samples.unshift.apply(samples, videoTrack.tempSamples);
      }

      // 寻找第一个I帧
      for (var i = 0, len = samples.length; i < len; i++) {
        var current = samples[i];
        if (current.isKeyframe) {
          firstIframeIdx = i;
          break;
        }
      }

      // 寻找最后一个I帧
      for (var _i = samples.length - 1; _i > 0; _i++) {
        var _current = samples[_i];

        if (_current.isKeyframe) {
          lastIframeIdx = _i;
          break;
        }
      }

      if (firstIframeIdx !== 0) {
        samples.splice(0, firstIframeIdx - 1);
      }

      videoTrack.samples = samples.slice(0, lastIframeIdx);
      var rest = samples.slice(lastIframeIdx);
      if (videoTrack.tempSamples) {
        videoTrack.tempSamples.push.apply(videoTrack.tempSamples, rest);
      } else {
        // 将剩下的帧缓存，等待一个完整的gop
        videoTrack.tempSamples = rest;
      }
    }
  }]);

  function MobileVideo() {
    _classCallCheck(this, MobileVideo);

    var _this = _possibleConstructorReturn(this, (MobileVideo.__proto__ || Object.getPrototypeOf(MobileVideo)).call(this));

    _this._canvas = document.createElement('canvas');
    _this.handleAudioSourceEnd = _this.handleAudioSourceEnd.bind(_this);
    _this.played = false;
    _this.pendingPlayTask = null;
    _this._paused = true;
    _this.videoMetaInited = false;
    _this.audioMetaInited = false;
    _this.init();
    return _this;
  }

  _createClass(MobileVideo, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      this.vCtx = new VideoCtx(Object.assign({
        canvas: this._canvas
      }, { style: { width: this.width, height: this.height } }));
      this.aCtx = new AudioCtx({});
      this.ticker = new (getTicker())();
      this.reconciler = new AVReconciler({
        vCtx: this.vCtx,
        aCtx: this.aCtx,
        video: this
      });

      this.dispatchEvent(new Event('waiting'));
      this.vCtx.oncanplay = function () {
        if (!_this2.played) {
          _this2.appendChild(_this2._canvas);
        }
        _this2.dispatchEvent(new Event('canplay'));
      };

      this.aCtx.on('AUDIO_SOURCE_END', this.handleAudioSourceEnd);
    }
  }, {
    key: 'handleAudioSourceEnd',
    value: function handleAudioSourceEnd() {
      this.reconciler.doReconcile();
      this.vCtx.cleanBuffer();
    }
  }, {
    key: '_cleanBuffer',
    value: function _cleanBuffer() {
      this.vCtx.cleanBuffer();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.videoMetaInited = false;
      this.audioMetaInited = false;

      this.aCtx.destroy();
      this.vCtx.destroy();
      this.ticker.stop();
      this.start = null;
      this.reconciler.destroy();
      this.aCtx = null;
      this.vCtx = null;
      this.ticker = null;
    }
  }, {
    key: 'onDemuxComplete',
    value: function onDemuxComplete(videoTrack, audioTrack) {
      // MobileVideo.resolveVideoGOP(videoTrack)
      this.aCtx.decodeAudio(audioTrack);
      this.vCtx.decodeVideo(videoTrack);
    }
  }, {
    key: 'setAudioMeta',
    value: function setAudioMeta(meta) {
      if (this.audioMetaInited) {
        this.aCtx.destroy();
        this.aCtx = new AudioCtx({});
      }
      this.aCtx.setAudioMetaData(meta);
      this.audioMetaInited = true;
    }
  }, {
    key: 'setVideoMeta',
    value: function setVideoMeta(meta) {
      if (this.videoMetaInited) {
        this.vCtx.destroy();
        this.vCtx = new VideoCtx(Object.assign({
          canvas: this._canvas
        }, { style: { width: this.width, height: this.height } }));
      }
      this.vCtx.setVideoMetaData(meta);
      this.videoMetaInited = true;
    }
  }, {
    key: 'play',
    value: function play() {
      var _this3 = this;

      if (this.pendingPlayTask) {
        return;
      }

      if (this.played) {
        this.destroy();
        this.init();
      }
      this.pendingPlayTask = Promise.all([this.vCtx.play(), this.aCtx.play().then(function () {
        // this.aCtx.muted = true
      })]).then(function () {
        // this.aCtx.muted = false
        _this3.ticker.start(function () {
          if (!_this3.start) {
            _this3.start = Date.now();
          }
          _this3._currentTime = Date.now() - _this3.start;
          _this3.vCtx._onTimer(_this3._currentTime);
        });

        _this3.pendingPlayTask = null;
        _this3.played = true;
        _this3.dispatchEvent(new Event('playing'));
        _this3.dispatchEvent(new Event('play'));
        _this3._paused = false;
      });
    }
  }, {
    key: 'pause',
    value: function pause() {
      this._paused = true;
      this.aCtx.pause();
      this.vCtx.pause();

      this.dispatchEvent(new Event('pause'));
    }
  }, {
    key: 'width',
    get: function get() {
      return this.getAttribute('width') || this.videoWidth;
    },
    set: function set(val) {
      this.style.display = 'inline-block';
      var pxVal = typeof val === 'number' ? val + 'px' : val;
      this.setAttribute('width', pxVal);
      this.style.width = pxVal;
      this._canvas.width = val;
    }
  }, {
    key: 'height',
    get: function get() {
      return this.getAttribute('height');
    },
    set: function set(val) {
      this.style.display = 'inline-block';
      var pxVal = typeof val === 'number' ? val + 'px' : val;
      this.setAttribute('height', pxVal);
      this.style.height = pxVal;
      this._canvas.height = val;
    }
  }, {
    key: 'videoWidth',
    get: function get() {
      if (this.vCtx && this.vCtx.videoWidth) {
        return this.vCtx.videoWidth;
      }
      return 0;
    }
  }, {
    key: 'videoHeight',
    get: function get() {
      if (this.vCtx && this.vCtx.videoHeight) {
        return this.vCtx.videoHeight;
      }
      return 0;
    }
  }, {
    key: 'src',
    get: function get() {
      return this.getAttribute('src');
    },
    set: function set(val) {
      this.setAttribute('src', val);
    }
  }, {
    key: 'readyState',
    get: function get() {
      return this.videoMetaInited ? this.vCtx.readyState : 0;
    }
  }, {
    key: 'seeking',
    get: function get() {
      return this.videoMetaInited ? this.vCtx.seeking : false;
    }
  }, {
    key: 'currentTime',
    get: function get() {
      return this.videoMetaInited ? this.vCtx.currentTime / 1000 : 0;
    }
  }, {
    key: 'duration',
    get: function get() {
      return this.audioMetaInited ? this.aCtx.duration : 0;
    }
  }, {
    key: 'paused',
    get: function get() {
      return this._paused;
    }
  }, {
    key: 'playbackRate',
    get: function get() {
      if (this.hasAttribute('playbackRate')) {
        return this.getAttribute('playbackRate');
      } else {
        return 1.0;
      }
    },
    set: function set(val) {
      this.setAttribute('playbackrate', val);
      this.aCtx.playbackRate = val;
      this.vCtx.playbackRate = val;

      this.dispatchEvent(new Event('ratechange'));
    }
  }, {
    key: 'ended',
    get: function get() {
      if (this.audioMetaInited) {
        return this.aCtx.ended;
      }
      return false;
    }
  }, {
    key: 'autoplay',
    get: function get() {
      if (this.hasAttribute('autoplay')) {
        return this.getAttribute('autoplay');
      } else {
        return false;
      }
    },
    set: function set(value) {
      this.setAttribute('autoplay', value);
    }
  }, {
    key: 'volume',
    get: function get() {
      return this.aCtx.volume;
    },
    set: function set(vol) {
      this.setAttribute('volume', vol);
      this.aCtx.volume = vol;
      this.dispatchEvent(new Event('volumechange'));
    }
  }, {
    key: 'muted',
    get: function get() {
      var attrMuted = this.getAttribute('muted') === 'true';
      if (attrMuted !== undefined) {
        return attrMuted;
      } else if (this.getAttribute('volume')) {
        return Number.parseInt(this.getAttribute('volume')) === 0;
      } else {
        return false;
      }
    },
    set: function set(val) {
      this.setAttribute('muted', val);
      if (!val) {
        this.aCtx.muted = false;
      } else {
        this.aCtx.muted = true;
      }
      this.dispatchEvent(new Event('volumechange'));
    }
  }, {
    key: 'error',
    get: function get() {
      return this.vCtx.error || this.aCtx.error;
    }
  }, {
    key: 'buffered',
    get: function get() {
      return this.vCtx.buffered;
    }
  }]);

  return MobileVideo;
}(HTMLElement);
// eslint-disable-next-line no-undef


customElements.define('mobile-video', MobileVideo);