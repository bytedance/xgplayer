'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventEmitter = require('event-emitter');

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

var _allOff = require('event-emitter/all-off');

var _allOff2 = _interopRequireDefault(_allOff);

var _util = require('./utils/util');

var _util2 = _interopRequireDefault(_util);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

var _events = require('./events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Proxy = function () {
  function Proxy(options) {
    var _this = this;

    _classCallCheck(this, Proxy);

    this._hasStart = false;
    this._currentTime = 0;
    this._duration = 0;
    this.videoConfig = {
      controls: false,
      autoplay: options.autoplay,
      playsinline: options.playsinline,
      'webkit-playsinline': options.playsinline,
      'x5-playsinline': options.playsinline,
      'x5-video-player-type': options['x5-video-player-type'] || options['x5VideoPlayerType'],
      'x5-video-player-fullscreen': options['x5-video-player-fullscreen'] || options['x5VideoPlayerFullscreen'],
      'x5-video-orientation': options['x5-video-orientation'] || options['x5VideoOrientation'],
      airplay: options['airplay'],
      'webkit-airplay': options['airplay'],
      tabindex: 2,
      mediaType: options.mediaType || 'video'
    };
    if (options.videoAttrbutes) {
      Object.keys(options.videoAttrbutes).map(function (key) {
        _this.videoConfig[key] = options.videoAttrbutes[key];
      });
    }
    if (options.loop) {
      this.videoConfig.loop = 'loop';
    }

    if (options.defaultPlaybackRate) {
      this.videoConfig.defaultPlaybackRate = options.defaultPlaybackRate;
    }

    this.video = _util2.default.createDom(this.videoConfig.mediaType, '', this.videoConfig, '');
    if (options.autoplay) {
      this.video.autoplay = true;
      if (options.autoplayMuted) {
        this.video.muted = true;
      }
    }

    (0, _eventEmitter2.default)(this);
    this._interval = {};
    this._initEvents();
  }

  _createClass(Proxy, [{
    key: '_initEvents',
    value: function _initEvents() {
      var _this2 = this;

      var lastBuffer = '0,0';
      this.ev = ['play', 'playing', 'pause', 'ended', 'error', 'seeking', 'seeked', 'timeupdate', 'waiting', 'canplay', 'canplaythrough', 'durationchange', 'volumechange', 'loadeddata'].map(function (item) {
        return _defineProperty({}, item, 'on' + item.charAt(0).toUpperCase() + item.slice(1));
      });
      /**
       * 和video事件对应的on[EventKey]接口的触发
       * @param {String} funName
       */
      function _emitEvent(funName, player) {
        player[funName] && typeof player[funName] === 'function' && player[funName](player);
      }
      this.ev.forEach(function (item) {
        _this2.evItem = Object.keys(item)[0];
        var name = Object.keys(item)[0];
        var funName = item[name];
        _this2.video.addEventListener(Object.keys(item)[0], function () {
          if (name === 'error') {
            _this2.errorHandler(name);
            _emitEvent(funName, _this2);
          } else {
            _this2.emit(name, _this2);
            _emitEvent(funName, _this2);
          }

          if (name === 'timeupdate') {
            _this2._currentTime = _this2.video.currentTime;
          }

          if (name === 'durationchange') {
            _this2._duration = _this2.video.duration;
          }

          if (_this2.hasOwnProperty('_interval')) {
            if (['ended', 'error', 'timeupdate'].indexOf(name) < 0) {
              clearInterval(_this2._interval['bufferedChange']);
              _util2.default.setInterval(_this2, 'bufferedChange', function () {
                var curBuffer = [];
                for (var i = 0, len = this.video.buffered.length; i < len; i++) {
                  curBuffer.push([this.video.buffered.start(i), this.video.buffered.end(i)]);
                }
                if (curBuffer.toString() !== lastBuffer) {
                  lastBuffer = curBuffer.toString();
                  this.emit(_events.BUFFER_CHANGE, curBuffer);
                }
              }, 200);
            } else {
              if (name !== 'timeupdate') {
                _util2.default.clearInterval(_this2, 'bufferedChange');
              }
            }
          }
        }, false);
      });
    }

    /**
     * 错误监听处理逻辑抽离
     */

  }, {
    key: 'errorHandler',
    value: function errorHandler(name) {
      if (this.video && this.video.error) {
        this.emit(name, new _error2.default('other', this.currentTime, this.duration, this.networkState, this.readyState, this.currentSrc, this.src, this.ended, {
          line: 162,
          msg: this.error,
          handle: 'Constructor'
        }, this.video.error.code, this.video.error));
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this3 = this;

      this.pause();
      this.video.removeAttribute('src'); // empty source
      this.video.load();
      this._currentTime = 0;
      this._duration = 0;
      for (var k in this._interval) {
        clearInterval(this._interval[k]);
        this._interval[k] = null;
      }
      this.emit(_events.DESTROY);
      this.ev.forEach(function (item) {
        var evName = Object.keys(item)[0];
        var evFunc = _this3[item[evName]];
        if (evFunc) {
          _this3.off(evName, evFunc);
        }
      });
      (0, _allOff2.default)(this);
    }
  }, {
    key: 'play',
    value: function play() {
      return this.video.play();
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.video.pause();
    }
  }, {
    key: 'canPlayType',
    value: function canPlayType(type) {
      return this.video.canPlayType(type);
    }
  }, {
    key: 'getBufferedRange',
    value: function getBufferedRange() {
      var range = [0, 0];
      var video = this.video;
      var buffered = video.buffered;
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
      if (range[0] - currentTime <= 0 && currentTime - range[1] <= 0) {
        return range;
      } else {
        return [0, 0];
      }
    }
  }, {
    key: 'hasStart',
    get: function get() {
      return this._hasStart;
    },
    set: function set(bool) {
      if (typeof bool === 'boolean') {
        this._hasStart = bool;
        this.emit('hasstart');
      }
    }
  }, {
    key: 'autoplay',
    set: function set(isTrue) {
      this.video.autoplay = isTrue;
    },
    get: function get() {
      return this.video.autoplay;
    }
  }, {
    key: 'buffered',
    get: function get() {
      return this.video.buffered;
    }
  }, {
    key: 'crossOrigin',
    get: function get() {
      return this.video.crossOrigin;
    },
    set: function set(isTrue) {
      this.video.crossOrigin = isTrue;
    }
  }, {
    key: 'currentSrc',
    get: function get() {
      return this.video.currentSrc;
    },
    set: function set(src) {
      this.video.currentSrc = src;
    }
  }, {
    key: 'currentTime',
    get: function get() {
      return this._currentTime;
    },
    set: function set(time) {
      this.video.currentTime = time;
    }
  }, {
    key: 'defaultMuted',
    get: function get() {
      return this.video.defaultMuted;
    },
    set: function set(isTrue) {
      this.video.defaultMuted = isTrue;
    }
  }, {
    key: 'duration',
    get: function get() {
      return this._duration;
    }
  }, {
    key: 'ended',
    get: function get() {
      return this.video.ended;
    }
  }, {
    key: 'error',
    get: function get() {
      var err = this.video.error;
      if (!err) {
        return null;
      }
      var status = [{
        en: 'MEDIA_ERR_ABORTED',
        cn: '取回过程被用户中止'
      }, {
        en: 'MEDIA_ERR_NETWORK',
        cn: '当下载时发生错误'
      }, {
        en: 'MEDIA_ERR_DECODE',
        cn: '当解码时发生错误'
      }, {
        en: 'MEDIA_ERR_SRC_NOT_SUPPORTED',
        cn: '不支持音频/视频'
      }];
      return this.lang ? this.lang[status[err.code - 1].en] : status[err.code - 1].en;
    }
  }, {
    key: 'loop',
    get: function get() {
      return this.video.loop;
    },
    set: function set(isTrue) {
      this.video.loop = isTrue;
    }
  }, {
    key: 'muted',
    get: function get() {
      return this.video.muted;
    },
    set: function set(isTrue) {
      this.video.muted = isTrue;
    }
  }, {
    key: 'networkState',
    get: function get() {
      var status = [{
        en: 'NETWORK_EMPTY',
        cn: '音频/视频尚未初始化'
      }, {
        en: 'NETWORK_IDLE',
        cn: '音频/视频是活动的且已选取资源，但并未使用网络'
      }, {
        en: 'NETWORK_LOADING',
        cn: '浏览器正在下载数据'
      }, {
        en: 'NETWORK_NO_SOURCE',
        cn: '未找到音频/视频来源'
      }];
      return this.lang ? this.lang[status[this.video.networkState].en] : status[this.video.networkState].en;
    }
  }, {
    key: 'paused',
    get: function get() {
      return this.video.paused;
    }
  }, {
    key: 'playbackRate',
    get: function get() {
      return this.video.playbackRate;
    },
    set: function set(rate) {
      this.video.playbackRate = rate;
    }
  }, {
    key: 'played',
    get: function get() {
      return this.video.played;
    }
  }, {
    key: 'preload',
    get: function get() {
      return this.video.preload;
    },
    set: function set(isTrue) {
      this.video.preload = isTrue;
    }
  }, {
    key: 'readyState',
    get: function get() {
      var status = [{
        en: 'HAVE_NOTHING',
        cn: '没有关于音频/视频是否就绪的信息'
      }, {
        en: 'HAVE_METADATA',
        cn: '关于音频/视频就绪的元数据'
      }, {
        en: 'HAVE_CURRENT_DATA',
        cn: '关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒'
      }, {
        en: 'HAVE_FUTURE_DATA',
        cn: '当前及至少下一帧的数据是可用的'
      }, {
        en: 'HAVE_ENOUGH_DATA',
        cn: '可用数据足以开始播放'
      }];
      return this.lang ? this.lang[status[this.video.readyState].en] : status[this.video.readyState];
    }
  }, {
    key: 'seekable',
    get: function get() {
      return this.video.seekable;
    }
  }, {
    key: 'seeking',
    get: function get() {
      return this.video.seeking;
    }
  }, {
    key: 'src',
    get: function get() {
      return this.video.src;
    },
    set: function set(url) {
      if (!this.ended) {
        this.emit(_events.URL_CHANGE, url);
      }
      this.video.pause();
      this._currentTime = 0;
      this._duration = 0;
      this.video.src = url;
    }
  }, {
    key: 'volume',
    get: function get() {
      return this.video.volume;
    },
    set: function set(vol) {
      this.video.volume = vol;
    }
  }]);

  return Proxy;
}();

exports.default = Proxy;