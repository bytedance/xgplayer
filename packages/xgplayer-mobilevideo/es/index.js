var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import './polyfills/custom-elements.min';
import './polyfills/native-element';
import { getTicker, DEFAULT_FPS, validateFPS } from './helpers/ticker';
import VideoCtx, { VIDEO_CANVAS_EVENTS } from './core/video-context';
import AudioCtx from './core/audio-context';
import AVReconciler from './helpers/reconciler';
import WorkerTicker from './helpers/worker-ticker';
// eslint-disable-next-line no-undef

var MobileVideo = function (_HTMLElement) {
  _inherits(MobileVideo, _HTMLElement);

  function MobileVideo() {
    _classCallCheck(this, MobileVideo);

    var _this = _possibleConstructorReturn(this, (MobileVideo.__proto__ || Object.getPrototypeOf(MobileVideo)).call(this));

    _this._canvas = document.createElement('canvas');
    _this.handleAudioSourceEnd = _this.handleAudioSourceEnd.bind(_this);
    _this.played = false;
    _this.pendingPlayTask = null;
    _this._waiting = false;
    _this._paused = true;
    _this.videoMetaInited = false;
    _this.audioMetaInited = false;
    _this.handleVCtxInnerEvent = _this.handleVCtxInnerEvent.bind(_this);
    _this._err = null;
    _this._lastTimeupdateStamp = 0;
    _this._volumeEventStamp = 0;
    _this._hasDispatch = false;
    _this._fps = DEFAULT_FPS;
    return _this;
  }

  _createClass(MobileVideo, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      this._destroyed = false;
      if (this.vCtx) {
        this.vCtx.destroy();
      }
      this.vCtx = new VideoCtx(Object.assign({
        canvas: this._canvas,
        preloadTime: this.preloadTime
      }, { style: { width: this.width, height: this.height } }));

      // this._innerDispatchEvent('waiting')
      this.vCtx.oncanplay = function () {
        if (!_this2.played) {
          if (!_this2.contains(_this2._canvas)) {
            _this2.appendChild(_this2._canvas);
            // if (this.autoplay) {
            //   this._innerDispatchEvent('play')
            // }
          }
        }
      };
      this.vCtx.on(VIDEO_CANVAS_EVENTS.VIDEO_EVENTS, this.handleVCtxInnerEvent);
    }
  }, {
    key: '_initAudio',
    value: function _initAudio() {
      var attrVolume = this.getAttribute('volume');
      var volume = this.muted ? 0 : Number.parseFloat(attrVolume);
      if (!this.noAudio) {
        this.aCtx = new AudioCtx({
          volume: volume
        });
      }
      this.ticker = new WorkerTicker({ interval: 1000 / this._fps });
      // this.ticker = new (getTicker({interval: 1000 / this._fps}))()
      this.reconciler = new AVReconciler({
        vCtx: this.vCtx,
        aCtx: this.aCtx,
        video: this
      });
      if (!this.noAudio) {
        this.aCtx.on('AUDIO_SOURCE_END', this.handleAudioSourceEnd);
      }
    }
  }, {
    key: 'handleVCtxInnerEvent',
    value: function handleVCtxInnerEvent(eventName) {
      this._innerDispatchEvent(eventName);
    }
  }, {
    key: 'handleAudioSourceEnd',
    value: function handleAudioSourceEnd() {
      this.reconciler.doReconcile();
      this.vCtx.cleanBuffer();
      this.aCtx.preload();
      this.vCtx.preload();
    }
  }, {
    key: '_cleanBuffer',
    value: function _cleanBuffer() {
      this.vCtx.cleanBuffer();
    }
  }, {
    key: '_destroyAudio',
    value: function _destroyAudio() {
      this.audioMetaInited = false;
      if (!this.noAudio && this.aCtx) {
        this.aCtx.removeListener('AUDIO_SOURCE_END', this.handleAudioSourceEnd);
        this.aCtx.destroy();
      }
      this.start = null;
      this.aCtx = null;
      this.ticker.stop();
      this.ticker = null;
      this.pendingPlayTask = null;
      this.played = false;
      this._hasDispatch = false;
    }
  }, {
    key: '_destroyVideo',
    value: function _destroyVideo() {
      this.videoMetaInited = false;
      this.vCtx.removeAllListeners();
      this.vCtx.destroy();
      this.vCtx = null;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      if (this._destroyed) {
        return;
      }

      this.reconciler.destroy();
      this._destroyed = true;
      this._destroyVideo();
      this._destroyAudio();
    }
  }, {
    key: 'onDemuxComplete',
    value: function onDemuxComplete(videoTrack, audioTrack) {
      if (!this.noAudio) {
        this.aCtx.decodeAudio(audioTrack);
      }
      this.vCtx.decodeVideo(videoTrack);
    }
  }, {
    key: 'decodeVideoBuffer',
    value: function decodeVideoBuffer(buffer) {
      this.vCtx.decodeVideoBuffer(buffer);
    }
  }, {
    key: 'setAudioMeta',
    value: function setAudioMeta(meta) {
      if (this.noAudio) {
        return;
      }
      this.aCtx.setAudioMetaData(meta);
      this.audioMetaInited = true;
    }
  }, {
    key: 'setVideoMeta',
    value: function setVideoMeta(meta) {
      this.vCtx.setVideoMetaData(meta);
      this.videoMetaInited = true;
    }
  }, {
    key: 'handleMediaInfo',
    value: function handleMediaInfo() {
      this._innerDispatchEvent('durationchange');
      this._innerDispatchEvent('loadedmetadata');
      this._innerDispatchEvent('seeking');
      this._innerDispatchEvent('seeked');
    }
  }, {
    key: 'handleEnded',
    value: function handleEnded() {
      this._innerDispatchEvent('ended');
    }
  }, {
    key: 'handleErr',
    value: function handleErr(code, message) {
      this._err = {};
      this._err.code = code;
      this._err.message = message;
      this._innerDispatchEvent('error');
    }
  }, {
    key: '_innerDispatchEvent',
    value: function _innerDispatchEvent(type) {
      this.dispatchEvent(new Event(type));
    }
  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      this.destroy();
    }
  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      // console.log('connected callback', this.noAudio)
      this._currentTime = 0;
      this.start = undefined;
      this.init();
      this._initAudio();
      this.vCtx.reset();
    }
  }, {
    key: 'play',
    value: function play() {
      var _this3 = this;

      if (this.pendingPlayTask) {
        return;
      }

      if (this.played) {
        this.connectedCallback();
      }

      if (!this.autoplay && !this._hasDispatch) {
        this._innerDispatchEvent('waiting');
        this._hasDispatch = true;
        this._waiting = true;
      }

      this._paused = false;
      this._innerDispatchEvent('play');
      var audioPlayTask = null;

      if (this.noAudio) {
        audioPlayTask = Promise.resolve();
      } else {
        audioPlayTask = this.aCtx.play();
      }
      this.pendingPlayTask = Promise.all([this.vCtx.play(), audioPlayTask.then(function () {
        if (_this3.aCtx) {
          _this3.aCtx.muted = true;
        }
      })]).then(function () {
        if (_this3.aCtx) {
          _this3.aCtx.muted = false;
        }
        _this3.ticker.start(function () {
          _this3.vCtx.preload();
          if (!_this3.start) {
            _this3.start = Date.now();
            _this3._lastTimeupdateStamp = _this3.start;
          }
          var prevTime = _this3._currentTime;

          _this3._currentTime = Date.now() - _this3.start;

          // console.log(this._currentTime, ' ', this.start)
          var rendered = _this3.vCtx._onTimer(_this3._currentTime);
          if (rendered) {
            if (_this3._waiting) {
              _this3._innerDispatchEvent('playing');
              _this3._waiting = false;
            }
            var now = Date.now();
            if (now - _this3._lastTimeupdateStamp >= 250) {
              // debounce
              _this3._lastTimeupdateStamp = now;
              _this3._innerDispatchEvent('timeupdate');
            }
          } else {
            _this3._currentTime = prevTime;
            _this3.start += Date.now() - _this3.start - prevTime;
            if (!_this3._waiting && !_this3.paused) {
              _this3._waiting = true;
              _this3._innerDispatchEvent('waiting');
            }
          }
        });
        _this3.pendingPlayTask = null;
        _this3.played = true;
        // this._innerDispatchEvent('playing')
      }).catch(function (e) {
        _this3.pendingPlayTask = null;
        _this3._paused = true;
        console.error(e);
        throw e;
      });
      return this.pendingPlayTask;
    }
  }, {
    key: 'pause',
    value: function pause() {
      var _this4 = this;

      this._paused = true;
      if (!this.noAudio) {
        this.aCtx.pause();
        this.aCtx.destroy();
      }

      this.vCtx.pause();

      this.ticker.stop();

      Promise.resolve().then(function () {
        _this4._innerDispatchEvent('pause');
      });
    }
  }, {
    key: 'load',
    value: function load() {
      // no-op for now
    }
  }, {
    key: 'onValueChange',
    value: function onValueChange() {
      var now = Date.now();
      if (now - this._volumeEventStamp < 200) {
        return;
      }
      this._volumeEventStamp = now;
      this._innerDispatchEvent('volumechange');
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
    },
    set: function set(val) {
      var nVal = Number.parseFloat(val);
      if (!isNaN(nVal)) {
        if (this.start && this.currentTime) {
          this.vCtx.setVideoSeeking();
          var gap = this.currentTime - nVal;
          this.start += gap * 1000;
        }
      }
      return nVal;
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
      if (!this.noAudio) {
        this.aCtx.playbackRate = val;
      }
      this.vCtx.playbackRate = val;

      this._innerDispatchEvent('ratechange');
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
        return this.getAttribute('autoplay') == 'true';
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
      if (this.noAudio) {
        return 0;
      }
      return this.aCtx ? this.aCtx.volume : 0;
    },
    set: function set(vol) {
      if (this.noAudio) {
        return;
      }
      this.setAttribute('volume', vol);
      this.aCtx.volume = vol;
      if (vol > 0 && this.muted) {
        this.aCtx.mute();
      }
      this.onValueChange();
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
      if (this.noAudio) {
        return;
      }
      this.setAttribute('muted', val);
      if (!val) {
        this.aCtx.muted = false;
      } else {
        this.aCtx.muted = true;
      }
      this.onValueChange();
    }
  }, {
    key: 'error',
    get: function get() {
      return this._err || this.vCtx.error || (this.noAudio ? null : this.aCtx.error);
    }
  }, {
    key: 'buffered',
    get: function get() {
      return this.vCtx.buffered;
    }
  }, {
    key: 'noAudio',
    get: function get() {
      return this.getAttribute('noaudio') === 'true';
    }
  }, {
    key: 'networkState',
    get: function get() {
      return 0;
    }
  }, {
    key: 'fps',
    get: function get() {
      return this._fps;
    },
    set: function set(val) {
      if (!validateFPS(val)) {
        val = DEFAULT_FPS;
      }
      this._fps = val;
      if (this.ticker) {
        this.ticker.setInterval(1000 / val);
      }
    }
  }, {
    key: 'preloadTime',
    get: function get() {
      var attrPreloadTime = this.getAttribute('preloadtime');
      if (attrPreloadTime) {
        var preloadTime = Number.parseFloat(attrPreloadTime);
        if (preloadTime > 0 && !Number.isNaN(preloadTime)) {
          return preloadTime;
        }
      }
      return Infinity;
    },
    set: function set(val) {
      if (val && Number(val) > 0) {
        this.setAttribute('preloadtime', val);
        this.vCtx.config.preloadTime = this.preloadTime;
      }
    }
  }]);

  return MobileVideo;
}(HTMLElement);
// eslint-disable-next-line no-undef


customElements.define('mobile-video', MobileVideo);