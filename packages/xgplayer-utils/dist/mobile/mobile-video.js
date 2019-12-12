'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _videoContext = require('./video-context');

var _videoContext2 = _interopRequireDefault(_videoContext);

var _audioContext = require('./audio-context');

var _audioContext2 = _interopRequireDefault(_audioContext);

var _ticker = require('./ticker');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 音画同步调和器
 */
let AVReconciler = function () {
  function AVReconciler(props) {
    _classCallCheck(this, AVReconciler);

    this.aCtx = props.aCtx;
    this.vCtx = props.vCtx;
    this.video = props.video;
    this.timeoutId = null;
    this.start = null;
  }

  _createClass(AVReconciler, [{
    key: 'doReconcile',
    value: function doReconcile() {
      const vCurTime = this.vCtx.currentTime || 0;
      const aCurTime = (this.aCtx.currentTime || 0) * 1000;

      const gap = vCurTime - aCurTime;
      if (this.timeoutId) {
        return;
      }
      if (gap > 200) {
        // audio delayed for more than 100ms
        this.video.start += gap;
        this.vCtx.pause();
        this.timeoutId = setTimeout(() => {
          this.vCtx.play();
          this.timeoutId = null;
        }, gap);
      } else if (gap < -120) {
        this.video.start += gap;
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.start = null;
      this.aCtx = null;
      this.vCtx = null;
    }
  }]);

  return AVReconciler;
}();

// eslint-disable-next-line no-undef


let MobileVideo = function (_HTMLElement) {
  _inherits(MobileVideo, _HTMLElement);

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
      this.vCtx = new _videoContext2.default(Object.assign({
        canvas: this._canvas
      }, { style: { width: this.width, height: this.height } }));
      this.aCtx = new _audioContext2.default({});
      this.ticker = new ((0, _ticker.getTicker)())();
      this.reconciler = new AVReconciler({
        vCtx: this.vCtx,
        aCtx: this.aCtx,
        video: this
      });

      this.dispatchEvent('waiting');
      this.vCtx.oncanplay = () => {
        if (!this.played) {
          this.appendChild(this._canvas);
        }
        this.dispatchEvent(new Event('canplay'));
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
      this.aCtx.decodeAudio(audioTrack);
      this.vCtx.decodeVideo(videoTrack);
    }
  }, {
    key: 'setAudioMeta',
    value: function setAudioMeta(meta) {
      if (this.audioMetaInited) {
        this.aCtx.destroy();
        this.aCtx = new _audioContext2.default({});
      }
      this.aCtx.setAudioMetaData(meta);
      this.audioMetaInited = true;
    }
  }, {
    key: 'setVideoMeta',
    value: function setVideoMeta(meta) {
      if (this.videoMetaInited) {
        this.vCtx.destroy();
        this.vCtx = new _videoContext2.default(Object.assign({
          canvas: this._canvas
        }, { style: { width: this.width, height: this.height } }));
      }
      this.vCtx.setVideoMetaData(meta);
      this.videoMetaInited = true;
    }
  }, {
    key: 'play',
    value: function play() {
      if (this.pendingPlayTask) {
        return;
      }

      if (this.played) {
        this.destroy();
        this.init();
      }
      this.pendingPlayTask = Promise.all([this.vCtx.play(), this.aCtx.play().then(() => {
        this.aCtx.muted = true;
      })]).then(() => {
        this.aCtx.muted = false;
        this.ticker.start(() => {
          if (!this.start) {
            this.start = Date.now();
          }
          this._currentTime = Date.now() - this.start;
          this.vCtx._onTimer(this._currentTime);
        });

        this.pendingPlayTask = null;
        this.played = true;
        this.dispatchEvent(new Event('playing'));
        this.dispatchEvent(new Event('play'));
        this._paused = false;
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
    get: function () {
      return this.getAttribute('width') || this.videoWidth;
    },
    set: function (val) {
      this.style.display = 'inline-block';
      const pxVal = typeof val === 'number' ? `${val}px` : val;
      this.setAttribute('width', pxVal);
      this.style.width = pxVal;
      this._canvas.style.width = pxVal;
      this._canvas.width = val;
    }
  }, {
    key: 'height',
    get: function () {
      return this.getAttribute('height');
    },
    set: function (val) {
      this.style.display = 'inline-block';
      const pxVal = typeof val === 'number' ? `${val}px` : val;
      this.setAttribute('height', pxVal);
      this.style.height = pxVal;
      this._canvas.style.height = pxVal;
      this._canvas.height = val;
    }
  }, {
    key: 'videoWidth',
    get: function () {
      if (this.vCtx && this.vCtx.videoWidth) {
        return this.vCtx.videoWidth;
      }
      return 0;
    }
  }, {
    key: 'videoHeight',
    get: function () {
      if (this.vCtx && this.vCtx.videoHeight) {
        return this.vCtx.videoHeight;
      }
      return 0;
    }
  }, {
    key: 'src',
    get: function () {
      return this.getAttribute('src');
    },
    set: function (val) {
      this.setAttribute('src', val);
    }
  }, {
    key: 'readyState',
    get: function () {
      return this.videoMetaInited ? this.vCtx.readyState : 0;
    }
  }, {
    key: 'seeking',
    get: function () {
      return this.videoMetaInited ? this.vCtx.seeking : false;
    }
  }, {
    key: 'currentTime',
    get: function () {
      return this.videoMetaInited ? this.vCtx.currentTime / 1000 : 0;
    }
  }, {
    key: 'duration',
    get: function () {
      return this.audioMetaInited ? this.aCtx.duration : 0;
    }
  }, {
    key: 'paused',
    get: function () {
      return this._paused;
    }
  }, {
    key: 'playbackRate',
    get: function () {
      if (this.hasAttribute('playbackRate')) {
        return this.getAttribute('playbackRate');
      } else {
        return 1.0;
      }
    },
    set: function (val) {
      this.setAttribute('playbackrate', val);
      this.aCtx.playbackRate = val;
      this.vCtx.playbackRate = val;

      this.dispatchEvent(new Event('ratechange'));
    }
  }, {
    key: 'ended',
    get: function () {
      if (this.audioMetaInited) {
        return this.aCtx.ended;
      }
      return false;
    }
  }, {
    key: 'autoplay',
    get: function () {
      if (this.hasAttribute('autoplay')) {
        return this.getAttribute('autoplay');
      } else {
        return false;
      }
    },
    set: function (value) {
      this.setAttribute('autoplay', value);
    }
  }, {
    key: 'volume',
    get: function () {
      return this.aCtx.volume;
    },
    set: function (vol) {
      this.setAttribute('volume', vol);
      this.aCtx.volume = vol;
    }
  }, {
    key: 'muted',
    get: function () {
      const attrMuted = this.getAttribute('muted') === 'true';
      if (attrMuted !== undefined) {
        return attrMuted;
      } else if (this.getAttribute('volume')) {
        return Number.parseInt(this.getAttribute('volume')) === 0;
      } else {
        return false;
      }
    },
    set: function (val) {
      this.setAttribute('muted', val);
      if (!val) {
        this.aCtx.muted = false;
      } else {
        this.aCtx.muted = true;
      }
    }
  }, {
    key: 'error',
    get: function () {
      return this.vCtx.error || this.aCtx.error;
    }
  }, {
    key: 'buffered',
    get: function () {
      return this.vCtx.buffered;
    }
  }]);

  return MobileVideo;
}(HTMLElement);
// eslint-disable-next-line no-undef


customElements.define('mobile-video', MobileVideo);