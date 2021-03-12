(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("xgplayer"));
	else if(typeof define === 'function' && define.amd)
		define(["xgplayer"], factory);
	else if(typeof exports === 'object')
		exports["xgplayer-music.js"] = factory(require("xgplayer"));
	else
		root["xgplayer-music.js"] = factory(root["xgplayer"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Analyze = exports.Lyric = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xgplayer = __webpack_require__(2);

var _xgplayer2 = _interopRequireDefault(_xgplayer);

var _lyric = __webpack_require__(11);

var _lyric2 = _interopRequireDefault(_lyric);

var _analyze = __webpack_require__(12);

var _analyze2 = _interopRequireDefault(_analyze);

var _xhr = __webpack_require__(14);

var _xhr2 = _interopRequireDefault(_xhr);

var _backward = __webpack_require__(34);

var _backward2 = _interopRequireDefault(_backward);

var _cover = __webpack_require__(35);

var _cover2 = _interopRequireDefault(_cover);

var _forward = __webpack_require__(36);

var _forward2 = _interopRequireDefault(_forward);

var _meta = __webpack_require__(37);

var _meta2 = _interopRequireDefault(_meta);

var _next = __webpack_require__(38);

var _next2 = _interopRequireDefault(_next);

var _prev = __webpack_require__(39);

var _prev2 = _interopRequireDefault(_prev);

var _database = __webpack_require__(40);

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mode = void 0;
var timeScale = 15;

var util = _xgplayer2.default.util;

var Music = function (_Player) {
  _inherits(Music, _Player);

  function Music(options) {
    _classCallCheck(this, Music);

    var opts = util.deepCopy({
      controls: true,
      mediaType: 'audio',
      ignores: ['fullscreen', 'start', 'definition', 'makeBullet', 'textTrack', 'loading', 'pc', 'mobile', 'playbackRate', 'replay', 'error', 'poster']
    }, options);
    if (!opts.volumeShow) {
      opts.ignores.push('volume');
    }

    var _this = _possibleConstructorReturn(this, (Music.__proto__ || Object.getPrototypeOf(Music)).call(this, opts));

    var player = _this;
    player.database = new _database2.default();

    if (player.config.ignores.indexOf('backward') < 0) {
      new _backward2.default(player);
    }
    if (player.config.ignores.indexOf('cover') < 0) {
      new _cover2.default(player);
    }
    if (player.config.ignores.indexOf('forward') < 0) {
      new _forward2.default(player);
    }
    if (player.config.ignores.indexOf('meta') < 0) {
      new _meta2.default(player);
    }
    if (player.config.ignores.indexOf('next') < 0) {
      new _next2.default(player);
    }
    if (player.config.ignores.indexOf('prev') < 0) {
      new _prev2.default(player);
    }

    _this.rawConfig = options;
    _this.list = util.typeOf(opts.url) === 'Array' ? opts.url : [{
      src: opts.url,
      name: opts.name,
      vid: opts.vid,
      poster: opts.poster
    }];
    _this.name = _this.list[0].name;
    _this.vid = _this.list[0].vid;
    _this.poster = _this.list[0].poster;
    _this.nextIndex = 1;
    _this.prevIndex = _this.list.length - 1;
    _this.halfPass = false;
    _this.history = [];
    _this.index = 0;
    if (!opts.controls) {
      _this.root.style.display = 'none';
      return _possibleConstructorReturn(_this);
    }

    util.addClass(_this.root, 'xgplayer-music');
    if (!opts.width) {
      _this.config.width = '100%';
      _this.root.style.width = '100%';
    }
    if (!opts.height) {
      _this.config.height = '50px';
      _this.root.style.height = '50px';
    }
    Object.defineProperty(_this, 'src', {
      get: function get() {
        return this.video.currentSrc;
      },
      set: function set(v) {
        var cur = util.typeOf(v) === 'String' ? { src: v, name: '' } : v;
        this.history.push(cur);
        this.video.src = cur.src;
      },

      configurable: true
    });
    if (_this.config.autoplayMuted) {
      _this.config.volume = _this.config.autoplay ? 0 : _this.config.volume;
    }
    _this.once('ready', function () {
      util.addClass(player.root, 'xgplayer-skin-default');
      if (_this.config.lang && _this.config.lang === 'en') {
        util.addClass(_this.root, 'xgplayer-lang-is-en');
      } else if (_this.config.lang === 'jp') {
        util.addClass(_this.root, 'xgplayer-lang-is-jp');
      }
    });
    _this.once('canplay', function () {
      if (this.config.autoplay && this.config.autoplayMuted) {
        this.volume = 0;
      } else {
        this.volume = this.config.volume;
      }
      if (this.config.abCycle) {
        if (typeof this.addProgressDot === 'function') {
          this.addProgressDot(this.config.abCycle.start || 0);
          this.addProgressDot(this.config.abCycle.end || this.duration);
        }
      }
    });
    _this.on('timeupdate', function () {
      if (!_this.halfPass && _this.currentTime > _this.duration / 2) {
        _this.confirmOrder();
      }
      if (_this.config.abCycle) {
        if (_this.currentTime >= (_this.config.abCycle.end || _this.duration)) {
          if (!_this.config.abCycle.loop) {
            _this.pause();
            _this.emit('abCycle ended');
          }
          _this.currentTime = _this.config.abCycle.start || 0;
        } else if (_this.currentTime < (_this.config.abCycle.start || 0)) {
          _this.currentTime = _this.config.abCycle.start || 0;
        }
      }
    });
    _this.on('ended', function () {
      if (_this.config.abCycle) {
        if (_this.config.abCycle.loop) {
          _this.change();
        }
        return;
      }
      if (_this.mode === 'order' && _this.index + 1 >= _this.list.length) {
        _this.once('playing', function () {
          _this.pause();
        });
        _this.currentTime = 0;
        return;
      }
      switch (_this.mode) {
        case 'sloop':
          _this.change();
          break;
        case 'order':
        case 'loop':
        default:
          _this.next();
          break;
      }
    });
    if (!_this.config.segPlay) {
      _this.checkOffline(player.list[0].src, player.list[0].vid || player.list[0].name).then(function (url) {
        player.config.url = url;
        player.start(url);
      });
    }
    return _this;
  }

  _createClass(Music, [{
    key: 'lyric',
    value: function lyric(lyricTxts, Dom) {
      if (this.__lyric__) {
        this.__lyric__.unbind(this);
      }
      if (_xgplayer2.default.util.typeOf(lyricTxts) !== 'Array') {
        lyricTxts = [].concat(lyricTxts);
      }
      this.__lyric__ = new _lyric2.default(lyricTxts, Dom, this.config.lyricOpts || {});
      this.__lyric__.bind(this);
      return this.__lyric__;
    }
  }, {
    key: 'confirmOrder',
    value: function confirmOrder() {
      var player = this;
      this.halfPass = true;
      this.nextComput();
      this.prevComput();
      if (this.config.preloadNext) {
        this.checkOffline(this.list[this.nextIndex].src, this.list[this.nextIndex].vid || this.list[this.nextIndex].name).then(function (url) {
          if (url.indexOf('blob:') < 0) {
            var offlineVid = player.list[player.nextIndex].vid || player.list[player.nextIndex].name;
            var xhr = new _xhr2.default(player.list[player.nextIndex].src, function (res) {
              player.database.openDB(function () {
                player.database.addData(player.database.myDB.ojstore.name, [{ vid: offlineVid, blob: new Blob([res], { type: 'audio/mp4; codecs="mp4a.40.5"' }) }]);
                setTimeout(function () {
                  player.database.closeDB();
                }, 5000);
              });
            });
          }
        });
      }
    }
  }, {
    key: 'nextComput',
    value: function nextComput() {
      switch (this.mode) {
        case 'sloop':
        case 'order':
        case 'loop':
          if (this.index + 1 < this.list.length) {
            this.nextIndex = this.index + 1;
          } else {
            this.nextIndex = 0;
          }
          break;
        default:
          this.nextIndex = Math.ceil(Math.random() * this.list.length);
          break;
      }
    }
  }, {
    key: 'prevComput',
    value: function prevComput() {
      switch (this.mode) {
        case 'sloop':
        case 'order':
        case 'loop':
          if (this.index - 1 >= 0) {
            this.prevIndev = this.index - 1;
          } else {
            this.prevIndev = this.list.length - 1;
          }
          break;
        default:
          this.prevIndev = Math.ceil(Math.random() * this.list.length);
          break;
      }
    }
  }, {
    key: 'add',
    value: function add(meta) {
      this.list.push({
        src: meta.src,
        name: meta.name,
        vid: meta.vid,
        poster: meta.poster
      });
    }
  }, {
    key: 'remove',
    value: function remove(url) {
      var idx = -1;
      this.list.every(function (item, index) {
        if (item.src === url || item.name === url || item.vid === url) {
          idx = index;
          return false;
        } else {
          return true;
        }
      });
      if (idx > -1) {
        this.list.splice(idx, 1);
      }
    }
  }, {
    key: 'updateList',
    value: function updateList() {
      var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      this.removeAbCycle();
      this.pause();
      this.currentTime = 0;
      this.list = list;
      this.nextIndex = 0;
      this.index = 0;
      this.change();
    }
  }, {
    key: 'change',
    value: function change() {
      var _this2 = this;

      var self = this;
      var offlineVid = self.list[self.index].vid || self.list[self.index].name;
      this.halfPass = false;
      this.checkOffline(self.list[self.index].src, offlineVid).then(function (url) {
        if (_xgplayer2.default.m4a) {
          self.video.load();
          self.name = self.list[self.index].name;
          self.vid = self.list[self.index].vid;
          self.poster = self.list[self.index].poster;
          self.emit('change', { src: url, name: self.name, vid: self.vid, poster: self.poster });
        } else {
          self.video.pause();
          if (_this2.config.switchKeepProgress && !_this2.ended) {
            var currentTime = self.currentTime;
            _this2.once('playing', function () {
              self.currentTime = currentTime;
            });
          } else {
            self.currentTime = 0;
          }
          self.src = url;
          self.name = self.list[self.index].name;
          self.vid = self.list[self.index].vid;
          self.poster = self.list[self.index].poster;
          setTimeout(function () {
            self.video.play().then(function () {
              self.emit('change', { src: url, name: self.name, vid: self.vid, poster: self.poster });
            });
          }, 60);
        }
      });
    }
  }, {
    key: 'checkOffline',
    value: function checkOffline(url, offlineVid) {
      var self = this;
      return new Promise(function (resolve) {
        if (!self.config.offline) {
          resolve(url);
        }
        self.database.openDB(function () {
          self.database.getDataByKey(self.database.myDB.ojstore.name, offlineVid, function (result) {
            setTimeout(function () {
              self.database.closeDB();
            }, 5000);
            if (result) {
              resolve(URL.createObjectURL(result.blob));
            } else {
              resolve(url);
            }
          });
        });
      });
    }
  }, {
    key: 'next',
    value: function next() {
      if (!this.halfPass) {
        this.halfPass = true;
        this.nextComput();
      }
      this.index = this.nextIndex;
      this.change();
    }
  }, {
    key: 'prev',
    value: function prev() {
      if (!this.halfPass) {
        this.halfPass = true;
        this.prevComput();
      }
      this.index = this.prevIndex;
      this.change();
    }
  }, {
    key: 'setIndex',
    value: function setIndex() {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this.nextIndex = index;
      this.index = index;
      this.change();
    }
  }, {
    key: 'forward',
    value: function forward() {
      // console.log(`music go forward ${timeScale}s`)
      this.currentTime = this.currentTime + timeScale < this.duration ? this.currentTime + timeScale : this.duration - 0.1;
    }
  }, {
    key: 'backward',
    value: function backward() {
      // console.log(`music go backward ${timeScale}s`)
      this.currentTime = this.currentTime - timeScale > 0 ? this.currentTime - timeScale : 0;
    }
  }, {
    key: 'analyze',
    value: function analyze(canvas) {
      return new _analyze2.default(this, canvas);
    }
  }, {
    key: 'setAbCycle',
    value: function setAbCycle(start, end, loop) {
      this.config.abCycle = {
        start: start || 0,
        end: end || this.duration,
        loop: loop
      };
      if (typeof this.removeAllProgressDot === 'function') {
        this.removeAllProgressDot();
      }
      if (typeof this.addProgressDot === 'function') {
        this.addProgressDot(this.config.abCycle.start);
        this.addProgressDot(this.config.abCycle.end);
      }
    }
  }, {
    key: 'removeAbCycle',
    value: function removeAbCycle() {
      this.config.abCycle = null;
      if (typeof this.removeAllProgressDot === 'function') {
        this.removeAllProgressDot();
      }
    }
  }, {
    key: 'mode',
    get: function get() {
      return mode || Music.ModeType[2];
    },
    set: function set(idx) {
      switch (idx) {
        case 0:
        case 1:
        case 2:
        case 3:
          mode = Music.ModeType[idx];
      }
      this.confirmOrder();
    }
  }, {
    key: 'timeScale',
    get: function get() {
      return timeScale || 15;
    },
    set: function set(scale) {
      timeScale = scale;
    }
  }], [{
    key: 'AudioCtx',
    get: function get() {
      return window.AudioContext || window.webkitAudioContext;
    }
  }, {
    key: 'ModeType',
    get: function get() {
      return ['order', 'random', 'loop', 'sloop'];
    }
  }]);

  return Music;
}(_xgplayer2.default);

exports.default = Music;
exports.Lyric = _lyric2.default;
exports.Analyze = _analyze2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _undefined = __webpack_require__(27)(); // Support ES3 engines

module.exports = function (val) { return val !== _undefined && val !== null; };


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// ES3 safe
var _undefined = void 0;

module.exports = function (value) { return value !== _undefined && value !== null; };


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(6);

var _music = __webpack_require__(0);

var _music2 = _interopRequireDefault(_music);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _music2.default;
module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(7);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(9)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, ".xgplayer-skin-default.xgplayer-music .xgplayer-controls{display:-webkit-box;display:-ms-flexbox;display:flex;height:50px;cursor:default}.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-backward,.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-backward-img{-webkit-box-ordinal-group:1;-ms-flex-order:0;order:0;cursor:pointer}.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-backward-img .xgplayer-icon,.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-backward .xgplayer-icon{margin-top:4px}.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-backward-img:hover,.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-backward:hover{opacity:.85}.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-prev,.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-prev-img{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1;cursor:pointer}.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-prev-img .xgplayer-icon,.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-prev .xgplayer-icon{margin-top:3px}.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-prev-img:hover,.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-prev:hover{opacity:.85}.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-play,.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-play-img{-webkit-box-ordinal-group:3;-ms-flex-order:2;order:2;margin:1px -5px 0}.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-play-img .xgplayer-tips,.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-play .xgplayer-tips{display:none}.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-next,.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-next-img{-webkit-box-ordinal-group:4;-ms-flex-order:3;order:3;cursor:pointer}.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-next-img .xgplayer-icon,.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-next .xgplayer-icon{margin-top:3px}.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-next-img:hover,.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-next:hover{opacity:.85}.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-forward,.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-forward-img{-webkit-box-ordinal-group:5;-ms-flex-order:4;order:4;cursor:pointer}.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-forward-img .xgplayer-icon,.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-forward .xgplayer-icon{margin-top:4px}.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-forward-img:hover,.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-forward:hover{opacity:.85}.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-volume{-webkit-box-ordinal-group:6;-ms-flex-order:5;order:5;cursor:pointer}.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-volume .xgplayer-icon{bottom:-13px}.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-cover{position:static;-webkit-box-ordinal-group:7;-ms-flex-order:6;order:6;width:40px;height:40px;text-align:center;vertical-align:middle;position:relative;top:50%;margin-top:-17px}.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-cover img{max-width:100%;max-height:100%}.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-progress{position:relative;-webkit-box-ordinal-group:8;-ms-flex-order:7;order:7;top:70%;left:20px;margin-top:-11px;-webkit-box-flex:99;-ms-flex:99;flex:99}.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-progress .xgplayer-name{position:absolute;left:0;top:-120%;font-size:12px;color:#ddd}.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-progress>*{height:3px;margin-top:8.5px}.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-progress .xgplayer-progress-played:after{top:-4px;width:10px;height:10px;content:\" \";display:block}.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-progress .xgplayer-tips{display:none!important}.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-progress:focus .xgplayer-progress-btn,.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-progress:hover .xgplayer-progress-btn{top:-5px}.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-time{-webkit-box-ordinal-group:9;-ms-flex-order:8;order:8;line-height:1;position:relative;margin:0 8px 0 30px;top:55%}.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-placeholder{-webkit-box-ordinal-group:1000;-ms-flex-order:999;order:999;width:0}.xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-icon{padding-top:5px}.xgplayer-skin-default.xgplayer-music.xgplayer-ended .xgplayer-controls,.xgplayer-skin-default.xgplayer-music.xgplayer-nostart .xgplayer-controls{display:-webkit-box;display:-ms-flexbox;display:flex}.xgplayer-lyric-item{display:block;line-height:22px;font-size:14px;color:#000}.xgplayer-lyric-item.xgplayer-lyric-item-active{color:#7fffd4}.xgplayer-lrcWrap{overflow:auto;height:300px;border:1px solid #ddd;padding:20px}.xgplayer-lrcForward{top:20%;border-width:0 10px 10px;border-color:transparent transparent #333}.xgplayer-lrcBack,.xgplayer-lrcForward{position:absolute;left:300px;cursor:pointer;width:0;height:0;border-style:solid}.xgplayer-lrcBack{top:80%;border-width:10px 10px 0;border-color:#333 transparent transparent}", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(10);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LyricTime = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xgplayer = __webpack_require__(2);

var _xgplayer2 = _interopRequireDefault(_xgplayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LyricTime = function LyricTime(timeTxt) {
  _classCallCheck(this, LyricTime);

  this.regRule = /(\d{2}(?=:)):(\d{2}(?=\.))\.(\d{2,3})/g;
  if (this.regRule.test(timeTxt)) {
    this.time = RegExp.$1 * 60 + RegExp.$2 * 1 + ('0.' + RegExp.$3) * 1;
  } else {
    this.time = -1;
  }
};

exports.LyricTime = LyricTime;

var Lyric = function () {
  function Lyric(txts, dom, options) {
    var _this = this;

    _classCallCheck(this, Lyric);

    this.rawTxts = txts;
    this.txts = txts.map(function (item) {
      return item.replace(/^[\r\n]|[\r\n]$/g, '').match(/(\[.*\])[^[]+/g);
    });
    this.isDynamics = txts.map(function (item, idx) {
      return [].concat(item.match(/\[\d{2}:\d{2}\.\d{2,3}\]/g)).length > 0 && _this.txts[idx].length === _this.txts[0].length && _this.txts[idx].length > 1;
    });
    this.isDynamic = this.isDynamics.some(function (item) {
      return item;
    });
    this.__ainimateInterval__ = 0;
    this.__offset__ = 0;
    this.__offsetScale__ = 0.5;
    this.dom = dom;
    this.lists = [];
    this.isDynamics.map(function (item, idx) {
      if (item) {
        _this.lists.push(_this.txts[idx].map(function (txt, index) {
          var reg = /(\[[\d:\S]+\])([^[]+)/g.test(txt);
          var time = RegExp.$1;
          var lyric = RegExp.$2;
          return {
            time: reg ? new LyricTime(time).time : -1,
            lyric: lyric,
            idx: index
          };
        }));
      }
    });
    this.list = this.lists.reduce(function (pre, cur) {
      return pre.map(function (item, idx) {
        return {
          time: item.time,
          lyric: item.lyric === '\n' ? '' + item.lyric + cur[idx].lyric : item.lyric + '<br/>' + cur[idx].lyric,
          idx: idx
        };
      });
    }).filter(function (item) {
      if (options.removeBlankLine) return item.lyric !== '\r\n' && item.lyric !== '\n' && item.lyric !== '';else return true;
    });

    this.line = 0;
  }

  _createClass(Lyric, [{
    key: 'adjust',
    value: function adjust() {
      var list = this.list;
      for (var i = 0, j, k, len = list.length; i < len; i++) {
        for (j = i + 1; j < len; j++) {
          if (list[j].time > list[i].time) {
            break;
          }
        }
        if (j < len) {
          var sep = (list[j].time - list[i].time) / (j - i);
          for (k = i + 1; k < j; k++) {
            list[k].time = list[k - 1].time + sep;
          }
        }
      }
    }
  }, {
    key: 'find',
    value: function find(curTime) {
      var list = this.list;
      var interval = this.__ainimateInterval__;
      var offset = this.__offset__;
      curTime = curTime + offset > 0 ? curTime + offset : 0;
      return list.filter(function (_ref, idx) {
        var time = _ref.time;

        var idxy = idx + 1;
        return curTime >= time && (list[idxy] && curTime * 1 + interval * 1 <= list[idxy].time || idxy >= list.length);
      });
    }
  }, {
    key: 'bind',
    value: function bind(player) {
      var _this2 = this;

      var self = this;
      this.__player__ = player;
      if (self.isDynamic) {
        self.__handle__ = function () {
          var f = _this2.find(player.currentTime)[0];
          if (f && f.idx !== _this2.line) {
            _this2.line = f.idx;
            player.emit('lyricUpdate', f);
          }
        }.bind(self, player);
        player.on('timeupdate', self.__handle__);

        self.__startHandle__ = function () {
          player.emit('lyricUpdate', self.list[0]);
        }.bind(self, player);
        player.once('playing', self.__startHandle__);
        //
        // self.__endHandle__ = (() => {
        //   player.emit('lyricUpdate', self.list[self.list.length - 1])
        // }).bind(self, player)
        // player.on('ended', self.__endHandle__)
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: 'unbind',
    value: function unbind(player) {
      delete this.__player__;
      if (this.__handle__) {
        player.off('lyricUpdate', this.__handle__);
        delete this.__handle__;
      }
    }
  }, {
    key: 'show',
    value: function show() {
      var _this3 = this;

      var dom = this.dom;
      var lyrbicTxts = [];
      var self = this;
      var ev = ['click', 'touchstart'];
      if (dom && dom.nodeType === 1) {
        var lrcWrap = _xgplayer2.default.util.createDom('div', '<div></div>', {}, 'xgplayer-lrcWrap');
        dom.appendChild(lrcWrap);
        this.list.forEach(function (item) {
          lyrbicTxts.push('<xg-lyric-item class="xgplayer-lyric-item" data-idx="' + item.idx + '">' + item.lyric.replace(/[\r\n]/g, '') + '</xg-lyric-item>');
        });
        lrcWrap.innerHTML = lyrbicTxts.join('');
        var lrcForward = _xgplayer2.default.util.createDom('xg-lrcForward', '<div></div>', {}, 'xgplayer-lrcForward');
        dom.appendChild(lrcForward);
        ev.forEach(function (item) {
          lrcForward.addEventListener(item, function (e) {
            e.preventDefault();
            e.stopPropagation();
            self.offset -= self.offsetScale;
            console.log('lyric go forward ' + self.offsetScale + 's');
          }, false);
        });

        var lrcBack = _xgplayer2.default.util.createDom('xg-lrcBack', '<div></div>', {}, 'xgplayer-lrcBack');
        dom.appendChild(lrcBack);
        ev.forEach(function (item) {
          lrcBack.addEventListener(item, function (e) {
            e.preventDefault();
            e.stopPropagation();
            self.offset += self.offsetScale;
            console.log('lyric go back ' + self.offsetScale + 's');
          }, false);
        });
        this.__updateHandle__ = function (item) {
          var domWrap = _this3.dom.querySelector('.xgplayer-lrcWrap');
          var activeDom = domWrap.querySelector('.xgplayer-lyric-item-active');
          var offsetHeight = domWrap.offsetHeight;
          var activeTop = void 0;
          if (activeDom) {
            activeDom.className = 'xgplayer-lyric-item';
          }
          activeDom = domWrap.querySelector('.xgplayer-lyric-item[data-idx="' + item.idx + '"]');
          if (activeDom) {
            activeDom.className = 'xgplayer-lyric-item xgplayer-lyric-item-active';
            activeTop = activeDom.getBoundingClientRect().top - domWrap.getBoundingClientRect().top + domWrap.scrollTop - offsetHeight / 2;
            if (activeTop) {
              domWrap.scrollTop = activeTop;
            }
          }
        };
        this.__player__.on('lyricUpdate', this.__updateHandle__);
      } else {
        this.__player__.emit('error', 'lyric container can not be empty');
      }
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.__updateHandle__.off('lyricUpdate', this.__updateHandle__);
    }
  }, {
    key: 'interval',
    set: function set(val) {
      this.__ainimateInterval__ = val;
    },
    get: function get() {
      return this.__ainimateInterval__;
    }
  }, {
    key: 'offset',
    set: function set(val) {
      this.__offset__ = val;
    },
    get: function get() {
      return this.__offset__;
    }
  }, {
    key: 'offsetScale',
    set: function set(val) {
      this.__offsetScale__ = val;
    },
    get: function get() {
      return this.__offsetScale__;
    }
  }]);

  return Lyric;
}();

exports.default = Lyric;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(13);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Analyze = function () {
  function Analyze(player, canvas) {
    var _this = this;

    _classCallCheck(this, Analyze);

    this.canvas = canvas;
    this.player = player;
    if (!Analyze.AudioCtx) {
      return;
    }
    var audioCtx = new Analyze.AudioCtx();
    var analyser = audioCtx.createAnalyser();
    var gainNode = audioCtx.createGain();
    analyser.minDecibels = -90;
    analyser.maxDecibels = -10;
    analyser.smoothingTimeConstant = 0.85;
    gainNode.gain.setValueAtTime(player.volume, player.currentTime);
    this.er = audioCtx.createMediaElementSource(player.video);
    this.analyser = analyser;
    this.ctx = canvas.getContext('2d');
    this.er.connect(analyser);
    analyser.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    this.style = {
      bgColor: '#c8c8c8',
      color: '#643232'
    };
    this.__type__ = 'bars';
    this.__size__ = 256;
    this.__status__ = {
      switch: 'on'
    };
    ['play', 'playing', 'seeked'].forEach(function (name) {
      player.on(name, function () {
        _this['__' + _this.__type__ + '__']();
      });
    });
    ['seeking', 'waiting', 'pause', 'ended'].forEach(function (name) {
      (0, _util.cancelAnimationFrame)(_this.__status__[_this.__type__]);
    });
    player.on('volumechange', function () {
      gainNode.gain.setValueAtTime(player.volume, player.currentTime);
    });
    player.on('destroy', function () {
      audioCtx.close();
    });
  }

  _createClass(Analyze, [{
    key: '__wave__',
    value: function __wave__() {
      var _this2 = this;

      (0, _util.cancelAnimationFrame)(this.__status__['wave']);
      (0, _util.cancelAnimationFrame)(this.__status__['bars']);
      if (this.__status__.switch === 'off') {
        return;
      }
      var analyser = this.analyser;
      var canvas = this.canvas;
      var ctx = this.ctx;
      var bufferLen = analyser.frequencyBinCount;
      var dataArray = new Uint8Array(bufferLen);
      var WIDTH = canvas.width;
      var HEIGHT = canvas.height;
      var color = new _util.Color(this.style.color).toRGB();
      var bgColor = new _util.Color(this.style.color).toRGB();
      analyser.fftSize = this.__size__;
      var draw = function draw() {
        _this2.__status__['wave'] = (0, _util.requestAnimationFrame)(draw);
        analyser.getByteTimeDomainData(dataArray);
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        ctx.fillStyle = bgColor;
        ctx.lineWidth = 2;
        ctx.strokeStyle = color;
        ctx.beginPath();
        var sliceWidth = WIDTH * 1.0 / bufferLen;
        var x = 0;
        for (var i = 0; i < bufferLen; i++) {
          var v = dataArray[i] / 128.0;
          var y = v * HEIGHT / 2;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
      };
      draw();
    }
  }, {
    key: '__bars__',
    value: function __bars__() {
      var _this3 = this;

      (0, _util.cancelAnimationFrame)(this.__status__['wave']);
      (0, _util.cancelAnimationFrame)(this.__status__['bars']);
      if (this.__status__.switch === 'off') {
        return;
      }
      var analyser = this.analyser;
      var canvas = this.canvas;
      var ctx = this.ctx;
      var bufferLen = analyser.frequencyBinCount;
      var dataArray = new Uint8Array(bufferLen);
      var WIDTH = canvas.width;
      var HEIGHT = canvas.height;
      var color = new _util.Color(this.style.color).toArray();
      var bgColor = new _util.Color(this.style.color).toRGB();
      analyser.fftSize = this.__size__;

      var draw = function draw() {
        _this3.__status__['bars'] = (0, _util.requestAnimationFrame)(draw);
        analyser.getByteFrequencyData(dataArray);
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        var barWidth = WIDTH / bufferLen * 2.5;
        var barHeight = void 0;
        var x = 0;
        for (var i = 0; i < bufferLen; i++) {
          barHeight = dataArray[i];
          ctx.fillStyle = 'rgb(' + (barHeight + color[0]) + ',' + color[1] + ',' + color[2] + ')';
          ctx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);
          x += barWidth + 1;
        }
      };
      draw();
    }
  }, {
    key: 'on',
    value: function on() {
      this.__status__.switch = 'on';
      this['__' + this.__type__ + '__']();
    }
  }, {
    key: 'off',
    value: function off() {
      this.__status__.switch = 'off';
      (0, _util.cancelAnimationFrame)(this.__status__['wave']);
      (0, _util.cancelAnimationFrame)(this.__status__['bars']);
    }
  }, {
    key: 'mode',
    set: function set(mode) {
      if (Analyze.Mode.filter(function (item) {
        return item === mode;
      }).length) {
        this.__type__ = mode;
        if (this.__status__.switch === 'on') {
          this['__' + mode + '__']();
        }
      }
    },
    get: function get() {
      return this.__type__;
    }
  }, {
    key: 'size',
    set: function set(num) {
      if (num < 65536 && (0, _util.isSqrt)(num, 2)) {
        this.__size__ = num;
        this.analyser.fftSize = num;
        this['__' + this.__type__ + '__']();
      }
    },
    get: function get() {
      return this.__size__;
    }
  }, {
    key: 'status',
    get: function get() {
      return this.__status__.switch;
    }
  }], [{
    key: 'AudioCtx',
    get: function get() {
      return window.AudioContext || window.webkitAudioContext;
    }
  }, {
    key: 'Mode',
    get: function get() {
      return ['wave', 'bars'];
    }
  }]);

  return Analyze;
}();

exports.default = Analyze;
module.exports = exports['default'];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// @filename https://gist.github.com/chaping/88813f56e75b0fd43f8c
var lastTime = 0;
var prefixes = 'webkit moz ms o'.split(' '); // 各浏览器前缀

var requestAnimationFrame = window.requestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame;

var prefix;
// 通过遍历各浏览器前缀，来得到requestAnimationFrame和cancelAnimationFrame在当前浏览器的实现形式
for (var i = 0; i < prefixes.length; i++) {
  if (requestAnimationFrame && cancelAnimationFrame) {
    break;
  }
  prefix = prefixes[i];
  requestAnimationFrame = requestAnimationFrame || window[prefix + 'RequestAnimationFrame'];
  cancelAnimationFrame = cancelAnimationFrame || window[prefix + 'CancelAnimationFrame'] || window[prefix + 'CancelRequestAnimationFrame'];
}

// 如果当前浏览器不支持requestAnimationFrame和cancelAnimationFrame，则会退到setTimeout
if (!requestAnimationFrame || !cancelAnimationFrame) {
  requestAnimationFrame = function requestAnimationFrame(callback, element) {
    var currTime = new Date().getTime();
    // 为了使setTimteout的尽可能的接近每秒60帧的效果
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function () {
      callback.call(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };

  cancelAnimationFrame = function cancelAnimationFrame(id) {
    window.clearTimeout(id);
  };
}

var isSqrt = function isSqrt(num, base) {
  if (num !== 1) {
    while (num !== 1) {
      if (num % base === 0) {
        num = num / base;
      } else {
        return false;
      }
    }
    return true;
  } else {
    return true;
  }
};

var Color = function () {
  function Color(color) {
    var opacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    _classCallCheck(this, Color);

    this.color = Color.Valid.test(color) ? color : '#ffffff';
    this.opacity = opacity;
  }

  _createClass(Color, [{
    key: 'toArray',
    value: function toArray() {
      var color = this.color.slice(1);
      var rgb = [];
      if (color.length === 6) {
        color = color.match(/\d{2}/g);
        rgb = color.map(function (item) {
          return Number('0x' + item);
        });
      }
      return rgb;
    }
  }, {
    key: 'toRGB',
    value: function toRGB() {
      var rgb = this.toArray();
      return rgb.length === 3 ? 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')' : '';
    }
  }, {
    key: 'toGRBA',
    value: function toGRBA() {
      var rgb = this.toArray();
      return rgb.length === 3 ? 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + this.opacity + ')' : '';
    }
  }], [{
    key: 'Valid',
    get: function get() {
      return (/^#[0-9A-F]{6}$|^#[0-9A-F]{3}$/i
      );
    }
  }]);

  return Color;
}();

exports.default = {
  requestAnimationFrame: requestAnimationFrame,
  cancelAnimationFrame: cancelAnimationFrame,
  isSqrt: isSqrt,
  Color: Color
};
module.exports = exports['default'];

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventEmitter = __webpack_require__(15);

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Xhr = function () {
  function Xhr(url, callback) {
    _classCallCheck(this, Xhr);

    (0, _eventEmitter2.default)(this);
    this.url = url;
    var xhr = new window.XMLHttpRequest();
    xhr.target = this;
    xhr.responseType = 'arraybuffer';
    xhr.open('get', url);
    xhr.onload = function () {
      if (xhr.status === 200 || xhr.status === 206) {
        if (callback && callback instanceof Function) {
          callback(xhr.response);
        }
      }
    };
    xhr.onerror = function (e) {
      xhr.target.emit('error' + e.message);
    };
    this.xhr = xhr;
    this.run();
  }

  _createClass(Xhr, [{
    key: 'cancel',
    value: function cancel() {
      this.xhr.abort();
    }
  }, {
    key: 'run',
    value: function run() {
      if (this.xhr.readyState === 1) {
        this.xhr.send();
      }
    }
  }]);

  return Xhr;
}();

exports.default = Xhr;
module.exports = exports['default'];

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var d        = __webpack_require__(16)
  , callable = __webpack_require__(33)

  , apply = Function.prototype.apply, call = Function.prototype.call
  , create = Object.create, defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , descriptor = { configurable: true, enumerable: false, writable: true }

  , on, once, off, emit, methods, descriptors, base;

on = function (type, listener) {
	var data;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) {
		data = descriptor.value = create(null);
		defineProperty(this, '__ee__', descriptor);
		descriptor.value = null;
	} else {
		data = this.__ee__;
	}
	if (!data[type]) data[type] = listener;
	else if (typeof data[type] === 'object') data[type].push(listener);
	else data[type] = [data[type], listener];

	return this;
};

once = function (type, listener) {
	var once, self;

	callable(listener);
	self = this;
	on.call(this, type, once = function () {
		off.call(self, type, once);
		apply.call(listener, this, arguments);
	});

	once.__eeOnceListener__ = listener;
	return this;
};

off = function (type, listener) {
	var data, listeners, candidate, i;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) return this;
	data = this.__ee__;
	if (!data[type]) return this;
	listeners = data[type];

	if (typeof listeners === 'object') {
		for (i = 0; (candidate = listeners[i]); ++i) {
			if ((candidate === listener) ||
					(candidate.__eeOnceListener__ === listener)) {
				if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
				else listeners.splice(i, 1);
			}
		}
	} else {
		if ((listeners === listener) ||
				(listeners.__eeOnceListener__ === listener)) {
			delete data[type];
		}
	}

	return this;
};

emit = function (type) {
	var i, l, listener, listeners, args;

	if (!hasOwnProperty.call(this, '__ee__')) return;
	listeners = this.__ee__[type];
	if (!listeners) return;

	if (typeof listeners === 'object') {
		l = arguments.length;
		args = new Array(l - 1);
		for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

		listeners = listeners.slice();
		for (i = 0; (listener = listeners[i]); ++i) {
			apply.call(listener, this, args);
		}
	} else {
		switch (arguments.length) {
		case 1:
			call.call(listeners, this);
			break;
		case 2:
			call.call(listeners, this, arguments[1]);
			break;
		case 3:
			call.call(listeners, this, arguments[1], arguments[2]);
			break;
		default:
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) {
				args[i - 1] = arguments[i];
			}
			apply.call(listeners, this, args);
		}
	}
};

methods = {
	on: on,
	once: once,
	off: off,
	emit: emit
};

descriptors = {
	on: d(on),
	once: d(once),
	off: d(off),
	emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function (o) {
	return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue         = __webpack_require__(3)
  , isPlainFunction = __webpack_require__(17)
  , assign          = __webpack_require__(21)
  , normalizeOpts   = __webpack_require__(29)
  , contains        = __webpack_require__(30);

var d = (module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if (arguments.length < 2 || typeof dscr !== "string") {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
		w = contains.call(dscr, "w");
	} else {
		c = w = true;
		e = false;
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
});

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== "string") {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (!isValue(get)) {
		get = undefined;
	} else if (!isPlainFunction(get)) {
		options = get;
		get = set = undefined;
	} else if (!isValue(set)) {
		set = undefined;
	} else if (!isPlainFunction(set)) {
		options = set;
		set = undefined;
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
	} else {
		c = true;
		e = false;
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isFunction = __webpack_require__(18);

var classRe = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;

module.exports = function (value) {
	if (!isFunction(value)) return false;
	if (classRe.test(functionToString.call(value))) return false;
	return true;
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isPrototype = __webpack_require__(19);

module.exports = function (value) {
	if (typeof value !== "function") return false;

	if (!hasOwnProperty.call(value, "length")) return false;

	try {
		if (typeof value.length !== "number") return false;
		if (typeof value.call !== "function") return false;
		if (typeof value.apply !== "function") return false;
	} catch (error) {
		return false;
	}

	return !isPrototype(value);
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(20);

module.exports = function (value) {
	if (!isObject(value)) return false;
	try {
		if (!value.constructor) return false;
		return value.constructor.prototype === value;
	} catch (error) {
		return false;
	}
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(3);

// prettier-ignore
var possibleTypes = { "object": true, "function": true, "undefined": true /* document.all */ };

module.exports = function (value) {
	if (!isValue(value)) return false;
	return hasOwnProperty.call(possibleTypes, typeof value);
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(22)() ? Object.assign : __webpack_require__(23);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== "function") return false;
	obj = { foo: "raz" };
	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
	return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys  = __webpack_require__(24)
  , value = __webpack_require__(28)
  , max   = Math.max;

module.exports = function (dest, src/*, …srcn*/) {
	var error, i, length = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try {
			dest[key] = src[key];
		} catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < length; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(25)() ? Object.keys : __webpack_require__(26);


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	try {
		Object.keys("primitive");
		return true;
	} catch (e) {
		return false;
	}
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(1);

var keys = Object.keys;

module.exports = function (object) { return keys(isValue(object) ? Object(object) : object); };


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// eslint-disable-next-line no-empty-function
module.exports = function () {};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(1);

module.exports = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(1);

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

// eslint-disable-next-line no-unused-vars
module.exports = function (opts1/*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (!isValue(options)) return;
		process(Object(options), result);
	});
	return result;
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(31)() ? String.prototype.contains : __webpack_require__(32);


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.contains !== "function") return false;
	return str.contains("dwa") === true && str.contains("foo") === false;
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (fn) {
	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
	return fn;
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _music = __webpack_require__(0);

var _music2 = _interopRequireDefault(_music);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Backward = function Backward(player) {
  _classCallCheck(this, Backward);

  var util = _music2.default.util;
  var controlEl = player.controls;
  var ev = ['click', 'touchstart'];
  var backwardBtn = player.config.backwardBtn ? player.config.backwardBtn : {};
  var backward = void 0;
  if (backwardBtn.type === 'img') {
    backward = _music2.default.util.createImgBtn('backward', backwardBtn.url, backwardBtn.width, backwardBtn.height);
  } else {
    backward = util.createDom('xg-backward', '<xg-icon class="xgplayer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">\n                <path transform = "scale(1.5 1.5) translate(8 4.5)"\n                d="m 14,2.99996 0,10 -7,-5 7,-5 z m -7,5 0,5 -7,-5 7,-5 0,5 z m -7,0 0,0 z"></path>\n            </svg></xg-icon>', {}, 'xgplayer-backward');
  }
  controlEl.appendChild(backward);
  ev.forEach(function (item) {
    backward.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.backward();
    }, false);
  });
};

exports.default = Backward;
module.exports = exports['default'];

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _music = __webpack_require__(0);

var _music2 = _interopRequireDefault(_music);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cover = function Cover(player) {
  _classCallCheck(this, Cover);

  var util = _music2.default.util;
  var controlEl = player.controls;
  var poster = util.createDom('xg-cover', '<img src="' + (player.config.poster || player.config.url[0].poster) + '">', {}, 'xgplayer-cover');
  controlEl.appendChild(poster);
  player.on('change', function (item) {
    if (item.poster) {
      poster.innerHTML = '<img src="' + item.poster + '">';
    }
  });
};

exports.default = Cover;
module.exports = exports['default'];

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _music = __webpack_require__(0);

var _music2 = _interopRequireDefault(_music);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Forward = function Forward(player) {
  _classCallCheck(this, Forward);

  var util = _music2.default.util;
  var controlEl = player.controls;
  var ev = ['click', 'touchstart'];
  var forwardBtn = player.config.forwardBtn ? player.config.forwardBtn : {};
  var forward = void 0;
  if (forwardBtn.type === 'img') {
    forward = _music2.default.util.createImgBtn('forward', forwardBtn.url, forwardBtn.width, forwardBtn.height);
  } else {
    forward = util.createDom('xg-forward', '<xg-icon class="xgplayer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">\n                <path transform = "scale(1.5 1.5) translate(-2 4.5)"\n                d="m 2,2.99996 0,10 7,-5 -7,-5 z m 7,5 0,5 7,-5 -7,-5 0,5 z m 7,0 0,0 z"></path>\n            </svg></xg-icon>', {}, 'xgplayer-forward');
  }
  controlEl.appendChild(forward);
  ev.forEach(function (item) {
    forward.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.forward();
    }, false);
  });
};

exports.default = Forward;
module.exports = exports['default'];

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _music = __webpack_require__(0);

var _music2 = _interopRequireDefault(_music);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Meta = function Meta(player) {
  _classCallCheck(this, Meta);

  var util = _music2.default.util;
  var progressEl = player.controls.querySelector('.xgplayer-progress');
  var name = util.createDom('xg-name', '' + (player.config.name || player.config.url[0].name), {}, 'xgplayer-name');
  progressEl.appendChild(name);
  player.on('change', function (item) {
    name.innerHTML = '' + item.name;
  });
};

exports.default = Meta;
module.exports = exports['default'];

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _music = __webpack_require__(0);

var _music2 = _interopRequireDefault(_music);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Next = function Next(player) {
  _classCallCheck(this, Next);

  var util = _music2.default.util;
  var controlEl = player.controls;
  var ev = ['click', 'touchstart'];
  var nextBtn = player.config.nextBtn ? player.config.nextBtn : {};
  var next = void 0;
  if (nextBtn.type === 'img') {
    next = _music2.default.util.createImgBtn('next', nextBtn.url, nextBtn.width, nextBtn.height);
  } else {
    next = util.createDom('xg-next', '<xg-icon class="xgplayer-icon"><svg t="1599462191231" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1796" width="40" height="40"><path d="M298.666667 298.666667v426.666666l298.666666-213.333333z m384 426.666666V298.666667h-85.333334v426.666666z" p-id="1797" fill="#ffffff"></path></svg></xg-icon>', {}, 'xgplayer-next');
  }
  controlEl.appendChild(next);
  ev.forEach(function (item) {
    next.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.next();
    }, false);
  });
};

exports.default = Next;
module.exports = exports['default'];

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _music = __webpack_require__(0);

var _music2 = _interopRequireDefault(_music);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Prev = function Prev(player) {
  _classCallCheck(this, Prev);

  var util = _music2.default.util;
  var controlEl = player.controls;
  var ev = ['click', 'touchstart'];
  var prevBtn = player.config.prevBtn ? player.config.prevBtn : {};
  var prev = void 0;
  if (prevBtn.type === 'img') {
    prev = _music2.default.util.createImgBtn('prev', prevBtn.url, prevBtn.width, prevBtn.height);
  } else {
    prev = util.createDom('xg-prev', '<xg-icon class="xgplayer-icon"><svg t="1599462285788" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18654" width="40" height="40"><path d="M682.666667 298.666667l-298.666667 213.333333 298.666667 213.333333z m-298.666667 213.333333V298.666667H298.666667v426.666666h85.333333z" p-id="18655" fill="#ffffff"></path></svg></xg-icon>', {}, 'xgplayer-prev');
  }
  controlEl.appendChild(prev);

  ev.forEach(function (item) {
    prev.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.prev();
    }, false);
  });
};

exports.default = Prev;
module.exports = exports['default'];

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var INDEXDB = function () {
  function INDEXDB() {
    var mydb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { name: 'xgplayer', version: 1, db: null, ojstore: { name: 'xg-m4a', keypath: 'vid' } };

    _classCallCheck(this, INDEXDB);

    this.indexedDB = window.indexedDB || window.webkitindexedDB;
    this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange; // 键范围
    this.myDB = mydb;
  }

  _createClass(INDEXDB, [{
    key: 'openDB',
    value: function openDB(callback) {
      var _this = this;

      // 建立或打开数据库，建立对象存储空间(ObjectStore)
      var self = this;
      var version = this.myDB.version || 1;
      var request = self.indexedDB.open(self.myDB.name, version);
      request.onerror = function (e) {
        // console.log('e.currentTarget.error.message')
      };
      request.onsuccess = function (e) {
        _this.myDB.db = e.target.result;
        // console.log('成功建立并打开数据库:' + this.myDB.name + ' version' + this.myDB.version)
        callback.call(self);
      };
      request.onupgradeneeded = function (e) {
        var db = e.target.result;
        var transaction = e.target.transaction;
        var store = void 0;
        if (!db.objectStoreNames.contains(self.myDB.ojstore.name)) {
          // 没有该对象空间时创建该对象空间
          store = db.createObjectStore(self.myDB.ojstore.name, { keyPath: self.myDB.ojstore.keypath });
          // console.log('成功建立对象存储空间：' + this.myDB.ojstore.name)
        }
      };
    }
  }, {
    key: 'deletedb',
    value: function deletedb() {
      // 删除数据库
      var self = this;
      self.indexedDB.deleteDatabase(this.myDB.name);
      // console.log(this.myDB.name + '数据库已删除')
    }
  }, {
    key: 'closeDB',
    value: function closeDB() {
      // 关闭数据库
      this.myDB.db.close();
      // console.log('数据库已关闭')
    }
  }, {
    key: 'addData',
    value: function addData(storename, data) {
      // 添加数据，重复添加会报错
      var store = this.myDB.db.transaction(storename, 'readwrite').objectStore(storename);
      var request = void 0;
      for (var i = 0; i < data.length; i++) {
        request = store.add(data[i]);
        request.onerror = function () {
          // console.error('add添加数据库中已有该数据')
        };
        request.onsuccess = function () {
          // console.log('add添加数据已存入数据库')
        };
      }
    }
  }, {
    key: 'putData',
    value: function putData(storename, data) {
      // 添加数据，重复添加会更新原有数据
      var store = this.myDB.db.transaction(storename, 'readwrite').objectStore(storename);
      var request = void 0;
      for (var i = 0; i < data.length; i++) {
        request = store.put(data[i]);
        request.onerror = function () {
          // console.error('put添加数据库中已有该数据')
        };
        request.onsuccess = function () {
          // console.log('put添加数据已存入数据库')
        };
      }
    }
  }, {
    key: 'getDataByKey',
    value: function getDataByKey(storename, key, callback) {
      var self = this;
      // 根据存储空间的键找到对应数据
      var store = this.myDB.db.transaction(storename, 'readwrite').objectStore(storename);
      var request = store.get(key);
      request.onerror = function () {
        // console.error('getDataByKey error')
        callback.call(self, null);
      };
      request.onsuccess = function (e) {
        var result = e.target.result;
        // console.log('查找数据成功')
        callback.call(self, result);
      };
    }
  }, {
    key: 'deleteData',
    value: function deleteData(storename, key) {
      // 删除某一条记录
      var store = this.myDB.db.transaction(storename, 'readwrite').objectStore(storename);
      store.delete(key);
      // console.log('已删除存储空间' + storename + '中' + key + '记录')
    }
  }, {
    key: 'clearData',
    value: function clearData(storename) {
      // 删除存储空间全部记录
      var store = this.myDB.db.transaction(storename, 'readwrite').objectStore(storename);
      store.clear();
      // console.log('已删除存储空间' + storename + '全部记录')
    }
  }]);

  return INDEXDB;
}();

exports.default = INDEXDB;
module.exports = exports['default'];

/***/ })
/******/ ]);
});