(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["xgplayer"] = factory();
	else
		root["xgplayer"] = factory();
})(window, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _proxy = __webpack_require__(8);

var _proxy2 = _interopRequireDefault(_proxy);

var _util = __webpack_require__(3);

var _util2 = _interopRequireDefault(_util);

var _database = __webpack_require__(28);

var _database2 = _interopRequireDefault(_database);

var _sniffer = __webpack_require__(29);

var _sniffer2 = _interopRequireDefault(_sniffer);

var _error = __webpack_require__(4);

var _error2 = _interopRequireDefault(_error);

var _draggabilly = __webpack_require__(30);

var _draggabilly2 = _interopRequireDefault(_draggabilly);

var _url = __webpack_require__(35);

var _downloadjs = __webpack_require__(36);

var _downloadjs2 = _interopRequireDefault(_downloadjs);

var _package = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = function (_Proxy) {
  _inherits(Player, _Proxy);

  function Player(options) {
    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, options));

    _this.config = _util2.default.deepCopy({
      width: 600,
      height: 337.5,
      ignores: [],
      whitelist: [],
      lang: (document.documentElement.getAttribute('lang') || navigator.language || 'zh-cn').toLocaleLowerCase(),
      inactive: 3000,
      volume: 0.6,
      controls: true,
      controlsList: ['nodownload']
    }, options);
    _this.version = _package.version;
    _this.userTimer = null;
    _this.waitTimer = null;
    _this.database = new _database2.default();
    _this.history = [];
    _this.isProgressMoving = false;
    _this.root = _util2.default.findDom(document, '#' + _this.config.id);
    _this.controls = _util2.default.createDom('xg-controls', '', {
      unselectable: 'on',
      onselectstart: 'return false'
    }, 'xgplayer-controls');
    if (_this.config.isShowControl) {
      _this.controls.style.display = 'none';
    }
    if (!_this.root) {
      var el = _this.config.el;
      if (el && el.nodeType === 1) {
        _this.root = el;
      } else {
        var _ret;

        _this.emit('error', new _error2.default({
          type: 'use',
          errd: {
            line: 45,
            handle: 'Constructor',
            msg: 'container id can\'t be empty'
          },
          vid: _this.config.vid
        }));
        console.error('container id can\'t be empty');
        return _ret = false, _possibleConstructorReturn(_this, _ret);
      }
    }
    // this.rootBackup = util.copyDom(this.root)
    _util2.default.addClass(_this.root, 'xgplayer xgplayer-' + _sniffer2.default.device + ' xgplayer-nostart ' + (_this.config.controls ? '' : 'no-controls'));
    _this.root.appendChild(_this.controls);
    if (_this.config.fluid) {
      _this.root.style['max-width'] = '100%';
      _this.root.style['width'] = '100%';
      _this.root.style['height'] = '0';
      _this.root.style['padding-top'] = _this.config.height * 100 / _this.config.width + '%';

      _this.video.style['position'] = 'absolute';
      _this.video.style['top'] = '0';
      _this.video.style['left'] = '0';
    } else {
      // this.root.style.width = `${this.config.width}px`
      // this.root.style.height = `${this.config.height}px`
      if (_this.config.width) {
        if (typeof _this.config.width !== 'number') {
          _this.root.style.width = _this.config.width;
        } else {
          _this.root.style.width = _this.config.width + 'px';
        }
      }
      if (_this.config.height) {
        if (typeof _this.config.height !== 'number') {
          _this.root.style.height = _this.config.height;
        } else {
          _this.root.style.height = _this.config.height + 'px';
        }
      }
    }
    if (_this.config.execBeforePluginsCall) {
      _this.config.execBeforePluginsCall.forEach(function (item) {
        item.call(_this, _this);
      });
    }
    if (_this.config.controlStyle && _util2.default.typeOf(_this.config.controlStyle) === 'String') {
      var self = _this;
      fetch(self.config.controlStyle, {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      }).then(function (res) {
        if (res.ok) {
          res.json().then(function (obj) {
            for (var prop in obj) {
              if (obj.hasOwnProperty(prop)) {
                self.config[prop] = obj[prop];
              }
            }
            self.pluginsCall();
          });
        }
      }).catch(function (err) {
        console.log('Fetch错误:' + err);
      });
    } else {
      _this.pluginsCall();
    }
    _this.ev.forEach(function (item) {
      var evName = Object.keys(item)[0];
      var evFunc = _this[item[evName]];
      if (evFunc) {
        _this.on(evName, evFunc);
      }
    });

    ['focus', 'blur'].forEach(function (item) {
      _this.on(item, _this['on' + item.charAt(0).toUpperCase() + item.slice(1)]);
    });
    var player = _this;
    _this.mousemoveFunc = function () {
      player.emit('focus');
      if (!player.config.closeFocusVideoFocus) {
        player.video.focus();
      }
    };
    _this.root.addEventListener('mousemove', _this.mousemoveFunc);
    _this.playFunc = function () {
      player.emit('focus');
      if (!player.config.closePlayVideoFocus) {
        player.video.focus();
      }
    };
    player.once('play', _this.playFunc);

    _this.getVideoSize = function () {
      if (this.video.videoWidth && this.video.videoHeight) {
        var containerSize = player.root.getBoundingClientRect();
        if (player.config.fitVideoSize === 'auto') {
          if (containerSize.width / containerSize.height > this.video.videoWidth / this.video.videoHeight) {
            player.root.style.height = this.video.videoHeight / this.video.videoWidth * containerSize.width + 'px';
          } else {
            player.root.style.width = this.video.videoWidth / this.video.videoHeight * containerSize.height + 'px';
          }
        } else if (player.config.fitVideoSize === 'fixWidth') {
          player.root.style.height = this.video.videoHeight / this.video.videoWidth * containerSize.width + 'px';
        } else if (player.config.fitVideoSize === 'fixHeight') {
          player.root.style.width = this.video.videoWidth / this.video.videoHeight * containerSize.height + 'px';
        }
      }
    };
    player.once('loadeddata', _this.getVideoSize);

    setTimeout(function () {
      _this.emit('ready');
      _this.isReady = true;
    }, 0);

    if (!_this.config.keyShortcut || _this.config.keyShortcut === 'on') {
      ['video', 'controls'].forEach(function (item) {
        player[item].addEventListener('keydown', function (e) {
          player.onKeydown(e, player);
        });
      });
    }
    if (_this.config.videoInit) {
      if (_util2.default.hasClass(_this.root, 'xgplayer-nostart')) {
        _this.start();
      }
    }
    if (player.config.rotate) {
      player.on('requestFullscreen', _this.updateRotateDeg);
      player.on('exitFullscreen', _this.updateRotateDeg);
    }

    function onDestroy() {
      player.root.removeEventListener('mousemove', player.mousemoveFunc);
      player.off('destroy', onDestroy);
    }
    player.once('destroy', onDestroy);
    return _this;
  }

  _createClass(Player, [{
    key: 'start',
    value: function start() {
      var _this2 = this;

      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.config.url;

      var root = this.root;
      var player = this;
      if (!url || url === '') {
        this.emit('urlNull');
      }
      this.logParams.playSrc = url;
      this.canPlayFunc = function () {
        player.off('canplay', player.canPlayFunc);
        var playPromise = player.video.play();
        if (playPromise !== undefined && playPromise) {
          playPromise.then(function () {
            player.emit('autoplay started');
          }).catch(function () {
            player.emit('autoplay was prevented');
            Player.util.addClass(player.root, 'xgplayer-is-autoplay');
          });
        }
      };
      if (_util2.default.typeOf(url) === 'String') {
        if (url.indexOf('blob:') > -1 && url === this.video.src) {
          // 在Chromium环境下用mse url给video二次赋值会导致错误
        } else {
          this.video.src = url;
        }
      } else {
        url.forEach(function (item) {
          _this2.video.appendChild(_util2.default.createDom('source', '', {
            src: '' + item.src,
            type: '' + (item.type || '')
          }));
        });
      }
      this.logParams.pt = new Date().getTime();
      this.logParams.vt = this.logParams.pt;
      this.loadeddataFunc = function () {
        player.logParams.vt = new Date().getTime();
        if (player.logParams.pt > player.logParams.vt) {
          player.logParams.pt = player.logParams.vt;
        }
        player.logParams.vd = player.video.duration;
      };
      this.once('loadeddata', this.loadeddataFunc);
      if (this.config.autoplay) {
        if (_sniffer2.default.os.isPhone) {
          this.canPlayFunc();
        } else {
          this.on('canplay', this.canPlayFunc);
        }
      }
      if (!this.config.disableStartLoad) {
        this.video.load();
      }
      root.insertBefore(this.video, root.firstChild);
      setTimeout(function () {
        _this2.emit('complete');
        if (_this2.danmu && typeof _this2.danmu.resize === 'function') {
          _this2.danmu.resize();
        }
      }, 1);
    }
  }, {
    key: 'reload',
    value: function reload() {
      this.video.load();
      this.reloadFunc = function () {
        // eslint-disable-next-line handle-callback-err
        var playPromise = this.play();
        if (playPromise !== undefined && playPromise) {
          playPromise.catch(function (err) {});
        }
      };
      this.once('loadeddata', this.reloadFunc);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this3 = this;

      var isDelDom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var player = this;
      clearInterval(this.bulletResizeTimer);
      for (var k in this._interval) {
        clearInterval(this._interval[k]);
        this._interval[k] = null;
      }
      if (this.checkTimer) {
        clearInterval(this.checkTimer);
      }
      if (this.waitTimer) {
        clearTimeout(this.waitTimer);
      }
      this.ev.forEach(function (item) {
        var evName = Object.keys(item)[0];
        var evFunc = _this3[item[evName]];
        if (evFunc) {
          _this3.off(evName, evFunc);
        }
      });
      if (this.loadeddataFunc) {
        this.off('loadeddata', this.loadeddataFunc);
      }
      if (this.reloadFunc) {
        this.off('loadeddata', this.reloadFunc);
      }
      if (this.replayFunc) {
        this.off('play', this.replayFunc);
      }
      if (this.playFunc) {
        this.off('play', this.playFunc);
      }
      if (this.getVideoSize) {
        this.off('loadeddata', this.getVideoSize);
      };
      ['focus', 'blur'].forEach(function (item) {
        _this3.off(item, _this3['on' + item.charAt(0).toUpperCase() + item.slice(1)]);
      });
      if (!this.config.keyShortcut || this.config.keyShortcut === 'on') {
        ['video', 'controls'].forEach(function (item) {
          if (_this3[item]) {
            _this3[item].removeEventListener('keydown', function (e) {
              player.onKeydown(e, player);
            });
          }
        });
      }

      function destroyFunc() {
        this.emit('destroy');
        // this.root.id = this.root.id + '_del'
        // parentNode.insertBefore(this.rootBackup, this.root)

        // fix video destroy https://stackoverflow.com/questions/3258587/how-to-properly-unload-destroy-a-video-element
        this.video.removeAttribute('src'); // empty source
        this.video.load();
        if (isDelDom) {
          // parentNode.removeChild(this.root)
          this.root.innerHTML = '';
          var classNameList = this.root.className.split(' ');
          if (classNameList.length > 0) {
            this.root.className = classNameList.filter(function (name) {
              return name.indexOf('xgplayer') < 0;
            }).join(' ');
          } else {
            this.root.className = '';
          }
        }

        for (var _k in this) {
          // if (k !== 'config') {
          delete this[_k];
          // }
        }
        this.off('pause', destroyFunc);
      }

      if (!this.paused) {
        this.pause();
        this.once('pause', destroyFunc);
      } else {
        destroyFunc.call(this);
      }
      _get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'destroy', this).call(this);
    }
  }, {
    key: 'replay',
    value: function replay() {
      var self = this;
      var _replay = this._replay;
      // ie9 bugfix
      _util2.default.removeClass(this.root, 'xgplayer-ended');
      this.logParams = {
        bc: 0,
        bu_acu_t: 0,
        played: [],
        pt: new Date().getTime(),
        vt: new Date().getTime(),
        vd: 0
      };
      this.logParams.pt = new Date().getTime();
      this.logParams.vt = this.logParams.pt;
      this.replayFunc = function () {
        self.logParams.vt = new Date().getTime();
        if (self.logParams.pt > self.logParams.vt) {
          self.logParams.pt = self.logParams.vt;
        }
        self.logParams.vd = self.video.duration;
      };
      this.once('play', this.replayFunc);
      this.logParams.playSrc = this.video.currentSrc;
      if (_replay && _replay instanceof Function) {
        _replay();
      } else {
        this.currentTime = 0;
        // eslint-disable-next-line handle-callback-err
        var playPromise = this.play();
        if (playPromise !== undefined && playPromise) {
          playPromise.catch(function (err) {});
        }
      }
    }
  }, {
    key: 'getFullscreen',
    value: function getFullscreen(el) {
      var player = this;
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen();
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen(window.Element.ALLOW_KEYBOARD_INPUT);
      } else if (player.video.webkitSupportsFullscreen) {
        player.video.webkitEnterFullscreen();
      } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen();
      } else {
        _util2.default.addClass(el, 'xgplayer-is-cssfullscreen');
      }
    }
  }, {
    key: 'exitFullscreen',
    value: function exitFullscreen(el) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      _util2.default.removeClass(el, 'xgplayer-is-cssfullscreen');
    }
  }, {
    key: 'getCssFullscreen',
    value: function getCssFullscreen() {
      var player = this;
      if (player.config.fluid) {
        player.root.style['padding-top'] = '';
      }
      _util2.default.addClass(player.root, 'xgplayer-is-cssfullscreen');
      player.emit('requestCssFullscreen');
    }
  }, {
    key: 'exitCssFullscreen',
    value: function exitCssFullscreen() {
      var player = this;
      if (player.config.fluid) {
        player.root.style['width'] = '100%';
        player.root.style['height'] = '0';
        player.root.style['padding-top'] = player.config.height * 100 / player.config.width + '%';
      }
      _util2.default.removeClass(player.root, 'xgplayer-is-cssfullscreen');
      player.emit('exitCssFullscreen');
    }
  }, {
    key: 'getRotateFullscreen',
    value: function getRotateFullscreen() {
      var player = this;
      document.documentElement.style.width = '100%';
      document.documentElement.style.height = '100%';
      if (player.root && !Player.util.hasClass(player.root, 'xgplayer-rotate-fullscreen')) {
        Player.util.addClass(player.root, 'xgplayer-rotate-fullscreen');
      }
      player.emit('getRotateFullscreen');
    }
  }, {
    key: 'exitRotateFullscreen',
    value: function exitRotateFullscreen() {
      var player = this;
      document.documentElement.style.width = 'unset';
      document.documentElement.style.height = 'unset';
      if (player.root && Player.util.hasClass(player.root, 'xgplayer-rotate-fullscreen')) {
        Player.util.removeClass(player.root, 'xgplayer-rotate-fullscreen');
      }
      player.emit('exitRotateFullscreen');
    }
  }, {
    key: 'download',
    value: function download() {
      var url = (0, _url.getAbsoluteURL)(this.config.url);
      (0, _downloadjs2.default)(url);
    }
  }, {
    key: 'pluginsCall',
    value: function pluginsCall() {
      var _this4 = this;

      var self = this;
      if (Player.plugins) {
        var ignores = this.config.ignores;
        Object.keys(Player.plugins).forEach(function (name) {
          var descriptor = Player.plugins[name];
          if (!ignores.some(function (item) {
            return name === item || name === 's_' + item;
          })) {
            if (['pc', 'tablet', 'mobile'].some(function (type) {
              return type === name;
            })) {
              if (name === _sniffer2.default.device) {
                setTimeout(function () {
                  descriptor.call(self, self);
                }, 0);
              }
            } else {
              descriptor.call(_this4, _this4);
            }
          }
        });
      }
    }
  }, {
    key: 'getPIP',
    value: function getPIP() {
      // let ro = this.root.getBoundingClientRect()
      // let Top = ro.top
      // let Left = ro.left
      var dragLay = _util2.default.createDom('xg-pip-lay', '<div></div>', {}, 'xgplayer-pip-lay');
      this.root.appendChild(dragLay);
      var dragHandle = _util2.default.createDom('xg-pip-drag', '<div class="drag-handle"><span>' + this.lang.PIP_DRAG + '</span></div>', { tabindex: 9 }, 'xgplayer-pip-drag');
      this.root.appendChild(dragHandle);
      // eslint-disable-next-line no-unused-vars
      var draggie = new _draggabilly2.default('.xgplayer', {
        handle: '.drag-handle'
      });
      _util2.default.addClass(this.root, 'xgplayer-pip-active');
      this.root.style.right = 0;
      this.root.style.bottom = '200px';
      this.root.style.top = '';
      this.root.style.left = '';
      this.root.style.width = '320px';
      this.root.style.height = '180px';
      if (this.config.pipConfig) {
        if (this.config.pipConfig.top !== undefined) {
          this.root.style.top = this.config.pipConfig.top + 'px';
          this.root.style.bottom = '';
        }
        if (this.config.pipConfig.bottom !== undefined) {
          this.root.style.bottom = this.config.pipConfig.bottom + 'px';
        }
        if (this.config.pipConfig.left !== undefined) {
          this.root.style.left = this.config.pipConfig.left + 'px';
          this.root.style.right = '';
        }
        if (this.config.pipConfig.right !== undefined) {
          this.root.style.right = this.config.pipConfig.right + 'px';
        }
        if (this.config.pipConfig.width !== undefined) {
          this.root.style.width = this.config.pipConfig.width + 'px';
        }
        if (this.config.pipConfig.height !== undefined) {
          this.root.style.height = this.config.pipConfig.height + 'px';
        }
      }
      if (this.config.fluid) {
        this.root.style['padding-top'] = '';
      }
      var player = this;
      ['click', 'touchend'].forEach(function (item) {
        dragLay.addEventListener(item, function (e) {
          e.preventDefault();
          e.stopPropagation();
          player.exitPIP();
          // player.root.style.top = `${Top}px`
          // player.root.style.left = `${Left}px`
        });
      });
    }
  }, {
    key: 'exitPIP',
    value: function exitPIP() {
      _util2.default.removeClass(this.root, 'xgplayer-pip-active');
      this.root.style.right = '';
      this.root.style.bottom = '';
      this.root.style.top = '';
      this.root.style.left = '';
      if (this.config.fluid) {
        this.root.style['width'] = '100%';
        this.root.style['height'] = '0';
        this.root.style['padding-top'] = this.config.height * 100 / this.config.width + '%';
      } else {
        if (this.config.width) {
          if (typeof this.config.width !== 'number') {
            this.root.style.width = this.config.width;
          } else {
            this.root.style.width = this.config.width + 'px';
          }
        }
        if (this.config.height) {
          if (typeof this.config.height !== 'number') {
            this.root.style.height = this.config.height;
          } else {
            this.root.style.height = this.config.height + 'px';
          }
        }
      }

      var dragLay = _util2.default.findDom(this.root, '.xgplayer-pip-lay');
      if (dragLay && dragLay.parentNode) {
        dragLay.parentNode.removeChild(dragLay);
      }
      var dragHandle = _util2.default.findDom(this.root, '.xgplayer-pip-drag');
      if (dragHandle && dragHandle.parentNode) {
        dragHandle.parentNode.removeChild(dragHandle);
      }
    }
  }, {
    key: 'updateRotateDeg',
    value: function updateRotateDeg() {
      var player = this;
      if (!player.rotateDeg) {
        player.rotateDeg = 0;
      }

      var width = player.root.offsetWidth;
      var height = player.root.offsetHeight;
      var targetWidth = player.video.videoWidth;
      var targetHeight = player.video.videoHeight;

      if (!player.config.rotate.innerRotate && player.config.rotate.controlsFix) {
        player.root.style.width = height + 'px';
        player.root.style.height = width + 'px';
      }

      var scale = void 0;
      if (player.rotateDeg === 0.25 || player.rotateDeg === 0.75) {
        if (player.config.rotate.innerRotate) {
          if (targetWidth / targetHeight > height / width) {
            // 旋转后纵向撑满
            var videoWidth = 0;
            if (targetHeight / targetWidth > height / width) {
              // 旋转前是纵向撑满
              videoWidth = height * targetWidth / targetHeight;
            } else {
              // 旋转前是横向撑满
              videoWidth = width;
            }
            scale = height / videoWidth;
          } else {
            // 旋转后横向撑满
            var videoHeight = 0;
            if (targetHeight / targetWidth > height / width) {
              // 旋转前是纵向撑满
              videoHeight = height;
            } else {
              // 旋转前是横向撑满
              videoHeight = width * targetHeight / targetWidth;
            }
            scale = width / videoHeight;
          }
        } else {
          if (width >= height) {
            scale = width / height;
          } else {
            scale = height / width;
          }
        }
        scale = Number(scale.toFixed(5));
      } else {
        scale = 1;
      }

      if (player.config.rotate.innerRotate) {
        player.video.style.transformOrigin = 'center center';
        player.video.style.transform = 'rotate(' + player.rotateDeg + 'turn) scale(' + scale + ')';
        player.video.style.webKitTransform = 'rotate(' + player.rotateDeg + 'turn) scale(' + scale + ')';
      } else {
        if (player.config.rotate.controlsFix) {
          player.video.style.transformOrigin = 'center center';
          player.video.style.transform = 'rotate(' + player.rotateDeg + 'turn) scale(' + scale + ')';
          player.video.style.webKitTransform = 'rotate(' + player.rotateDeg + 'turn) scale(' + scale + ')';
        } else {
          player.root.style.transformOrigin = 'center center';
          player.root.style.transform = 'rotate(' + player.rotateDeg + 'turn) scale(' + 1 + ')';
          player.root.style.webKitTransform = 'rotate(' + player.rotateDeg + 'turn) scale(' + 1 + ')';
        }
      }
    }
  }, {
    key: 'rotate',
    value: function rotate() {
      var clockwise = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var innerRotate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var times = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

      var player = this;
      if (!player.rotateDeg) {
        player.rotateDeg = 0;
      }
      var factor = clockwise ? 1 : -1;

      player.rotateDeg = (player.rotateDeg + 1 + factor * 0.25 * times) % 1;
      this.updateRotateDeg();

      player.emit('rotate', player.rotateDeg * 360);
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      var player = this;
      _util2.default.removeClass(this.root, 'xgplayer-inactive');
      if (player.userTimer) {
        clearTimeout(player.userTimer);
      }
      player.userTimer = setTimeout(function () {
        player.emit('blur');
      }, player.config.inactive);
    }
  }, {
    key: 'onBlur',
    value: function onBlur() {
      // this.video.blur()
      if ((this.config.enablePausedInactive || !this.paused) && !this.ended && !this.config.closeInactive) {
        _util2.default.addClass(this.root, 'xgplayer-inactive');
      }
    }
  }, {
    key: 'onPlay',
    value: function onPlay() {
      _util2.default.addClass(this.root, 'xgplayer-isloading');
      _util2.default.addClass(this.root, 'xgplayer-playing');
      _util2.default.removeClass(this.root, 'xgplayer-pause');
    }
  }, {
    key: 'onPause',
    value: function onPause() {
      _util2.default.addClass(this.root, 'xgplayer-pause');
      if (this.userTimer) {
        clearTimeout(this.userTimer);
      }
      this.emit('focus');
    }
  }, {
    key: 'onEnded',
    value: function onEnded() {
      _util2.default.addClass(this.root, 'xgplayer-ended');
      _util2.default.removeClass(this.root, 'xgplayer-playing');
    }
  }, {
    key: 'onSeeking',
    value: function onSeeking() {
      this.isSeeking = true;
      // 兼容IE下无法触发waiting事件的问题 seeking的时候直接出发waiting
      this.onWaiting();
      // util.addClass(this.root, 'seeking');
    }
  }, {
    key: 'onTimeupdate',
    value: function onTimeupdate() {
      // for ie,playing fired before waiting
      if (this.waitTimer) {
        clearTimeout(this.waitTimer);
      }
      _util2.default.removeClass(this.root, 'xgplayer-isloading');
    }
  }, {
    key: 'onSeeked',
    value: function onSeeked() {
      // for ie,playing fired before waiting
      this.isSeeking = false;
      if (this.waitTimer) {
        clearTimeout(this.waitTimer);
      }
      _util2.default.removeClass(this.root, 'xgplayer-isloading');
    }
  }, {
    key: 'onWaiting',
    value: function onWaiting() {
      var self = this;
      if (self.waitTimer) {
        clearTimeout(self.waitTimer);
      }
      if (self.checkTimer) {
        clearInterval(self.checkTimer);
        self.checkTimer = null;
      }
      var time = self.currentTime;
      self.waitTimer = setTimeout(function () {
        _util2.default.addClass(self.root, 'xgplayer-isloading');
        self.checkTimer = setInterval(function () {
          if (self.currentTime !== time) {
            _util2.default.removeClass(this.root, 'xgplayer-isloading');
            clearInterval(self.checkTimer);
            self.checkTimer = null;
          }
        }, 1000);
      }, 500);
    }
  }, {
    key: 'onPlaying',
    value: function onPlaying() {
      // 兼容safari下无法自动播放会触发该事件的场景
      if (this.paused) {
        return;
      }
      this.isSeeking = false;
      if (this.waitTimer) {
        clearTimeout(this.waitTimer);
      }
      _util2.default.removeClass(this.root, 'xgplayer-isloading xgplayer-nostart xgplayer-pause xgplayer-ended xgplayer-is-error xgplayer-replay');
      _util2.default.addClass(this.root, 'xgplayer-playing');
    }
  }, {
    key: 'onKeydown',
    value: function onKeydown(event, player) {
      // let player = this
      var e = event || window.event;
      if (e && (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 32)) {
        player.emit('focus');
      }
      if (e && (e.keyCode === 40 || e.keyCode === 38)) {
        if (player.controls) {
          var volumeSlider = player.controls.querySelector('.xgplayer-slider');
          if (volumeSlider) {
            if (_util2.default.hasClass(volumeSlider, 'xgplayer-none')) {
              _util2.default.removeClass(volumeSlider, 'xgplayer-none');
            }
            if (player.sliderTimer) {
              clearTimeout(player.sliderTimer);
            }
            player.sliderTimer = setTimeout(function () {
              _util2.default.addClass(volumeSlider, 'xgplayer-none');
            }, player.config.inactive);
          }
        }
        if (e && e.keyCode === 40) {
          // 按 down
          if (player.volume - 0.1 >= 0) {
            player.volume = Number((player.volume - 0.1).toFixed(1));
          } else {
            player.volume = 0;
          }
        } else if (e && e.keyCode === 38) {
          // 按 up
          if (player.volume + 0.1 <= 1) {
            player.volume = Number((player.volume + 0.1).toFixed(1));
          } else {
            player.volume = 1;
          }
        }
      } else if (e && e.keyCode === 39) {
        // 按 right
        if (player.currentTime + 10 <= player.duration) {
          player.currentTime += 10;
        } else {
          player.currentTime = player.duration - 1;
        }
      } else if (e && e.keyCode === 37) {
        // 按 left
        if (player.currentTime - 10 >= 0) {
          player.currentTime -= 10;
        } else {
          player.currentTime = 0;
        }
      } else if (e && e.keyCode === 32) {
        // 按 spacebar
        if (player.paused) {
          // eslint-disable-next-line handle-callback-err
          var playPromise = player.play();
          if (playPromise !== undefined && playPromise) {
            playPromise.catch(function (err) {});
          }
        } else {
          player.pause();
        }
      }
    }
  }, {
    key: 'cumulateTime',
    get: function get() {
      if (this.logParams && this.logParams.played instanceof Array) {
        var accTime = _util2.default.computeWatchDur(this.logParams.played) || 0;
        return Number(accTime.toFixed(3));
      }
      return 0;
    }
  }], [{
    key: 'install',
    value: function install(name, descriptor) {
      if (!Player.plugins) {
        Player.plugins = {};
      }
      if (!Player.plugins[name]) {
        Player.plugins[name] = descriptor;
      }
    }
  }, {
    key: 'use',
    value: function use(name, descriptor) {
      if (!Player.plugins) {
        Player.plugins = {};
      }
      Player.plugins[name] = descriptor;
    }
  }]);

  return Player;
}(_proxy2.default);

Player.util = _util2.default;
Player.sniffer = _sniffer2.default;
Player.Errors = _error2.default;

exports.default = Player;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _undefined = __webpack_require__(21)(); // Support ES3 engines

module.exports = function (val) {
  return val !== _undefined && val !== null;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// ES3 safe

var _undefined = void 0;

module.exports = function (value) {
  return value !== _undefined && value !== null;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var util = {};

util.createDom = function () {
  var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
  var tpl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var attrs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var cname = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

  var dom = document.createElement(el);
  dom.className = cname;
  dom.innerHTML = tpl;
  Object.keys(attrs).forEach(function (item) {
    var key = item;
    var value = attrs[item];
    if (el === 'video' || el === 'audio') {
      if (value) {
        dom.setAttribute(key, value);
      }
    } else {
      dom.setAttribute(key, value);
    }
  });
  return dom;
};

util.hasClass = function (el, className) {
  if (!el) {
    return false;
  }

  if (el.classList) {
    return Array.prototype.some.call(el.classList, function (item) {
      return item === className;
    });
  } else {
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
  }
};

util.addClass = function (el, className) {
  if (!el) {
    return;
  }

  if (el.classList) {
    className.replace(/(^\s+|\s+$)/g, '').split(/\s+/g).forEach(function (item) {
      item && el.classList.add(item);
    });
  } else if (!util.hasClass(el, className)) {
    el.className += ' ' + className;
  }
};

util.removeClass = function (el, className) {
  if (!el) {
    return;
  }

  if (el.classList) {
    className.split(/\s+/g).forEach(function (item) {
      el.classList.remove(item);
    });
  } else if (util.hasClass(el, className)) {
    className.split(/\s+/g).forEach(function (item) {
      var reg = new RegExp('(\\s|^)' + item + '(\\s|$)');
      el.className = el.className.replace(reg, ' ');
    });
  }
};

util.toggleClass = function (el, className) {
  if (!el) {
    return;
  }

  className.split(/\s+/g).forEach(function (item) {
    if (util.hasClass(el, item)) {
      util.removeClass(el, item);
    } else {
      util.addClass(el, item);
    }
  });
};

util.findDom = function () {
  var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var sel = arguments[1];

  var dom = void 0;
  // fix querySelector IDs that start with a digit
  // https://stackoverflow.com/questions/37270787/uncaught-syntaxerror-failed-to-execute-queryselector-on-document
  try {
    dom = el.querySelector(sel);
  } catch (e) {
    if (sel.indexOf('#') === 0) {
      dom = el.getElementById(sel.slice(1));
    }
  }
  return dom;
};

util.padStart = function (str, length, pad) {
  var charstr = String(pad);
  var len = length >> 0;
  var maxlen = Math.ceil(len / charstr.length);
  var chars = [];
  var r = String(str);
  while (maxlen--) {
    chars.push(charstr);
  }
  return chars.join('').substring(0, len - r.length) + r;
};

util.format = function (time) {
  if (window.isNaN(time)) {
    return '';
  }
  var hour = util.padStart(Math.floor(time / 3600), 2, 0);
  var minute = util.padStart(Math.floor((time - hour * 3600) / 60), 2, 0);
  var second = util.padStart(Math.floor(time - hour * 3600 - minute * 60), 2, 0);
  return (hour === '00' ? [minute, second] : [hour, minute, second]).join(':');
};

util.event = function (e) {
  if (e.touches) {
    var touch = e.touches[0] || e.changedTouches[0];
    e.clientX = touch.clientX || 0;
    e.clientY = touch.clientY || 0;
    e.offsetX = touch.pageX - touch.target.offsetLeft;
    e.offsetY = touch.pageY - touch.target.offsetTop;
  }
  e._target = e.target || e.srcElement;
};

util.typeOf = function (obj) {
  return Object.prototype.toString.call(obj).match(/([^\s.*]+)(?=]$)/g)[0];
};

util.deepCopy = function (dst, src) {
  if (util.typeOf(src) === 'Object' && util.typeOf(dst) === 'Object') {
    Object.keys(src).forEach(function (key) {
      if (util.typeOf(src[key]) === 'Object' && !(src[key] instanceof Node)) {
        if (!dst[key]) {
          dst[key] = src[key];
        } else {
          util.deepCopy(dst[key], src[key]);
        }
      } else if (util.typeOf(src[key]) === 'Array') {
        dst[key] = util.typeOf(dst[key]) === 'Array' ? dst[key].concat(src[key]) : src[key];
      } else {
        dst[key] = src[key];
      }
    });
    return dst;
  }
};
util.getBgImage = function (el) {
  // fix: return current page url when url is none
  var url = (el.currentStyle || window.getComputedStyle(el, null)).backgroundImage;
  if (!url || url === 'none') {
    return '';
  }
  var a = document.createElement('a');
  a.href = url.replace(/url\("|"\)/g, '');
  return a.href;
};

util.copyDom = function (dom) {
  if (dom && dom.nodeType === 1) {
    var back = document.createElement(dom.tagName);
    Array.prototype.forEach.call(dom.attributes, function (node) {
      back.setAttribute(node.name, node.value);
    });
    if (dom.innerHTML) {
      back.innerHTML = dom.innerHTML;
    }
    return back;
  } else {
    return '';
  }
};

util.setInterval = function (context, eventName, intervalFunc, frequency) {
  if (!context._interval[eventName]) {
    context._interval[eventName] = setInterval(intervalFunc.bind(context), frequency);
  }
};

util.clearInterval = function (context, eventName) {
  clearInterval(context._interval[eventName]);
  context._interval[eventName] = null;
};

util.createImgBtn = function (name, imgUrl, width, height) {
  var btn = util.createDom('xg-' + name, '', {}, 'xgplayer-' + name + '-img');
  btn.style.backgroundImage = 'url("' + imgUrl + '")';
  if (width && height) {
    var w = void 0,
        h = void 0,
        unit = void 0;
    ['px', 'rem', 'em', 'pt', 'dp', 'vw', 'vh', 'vm', '%'].every(function (item) {
      if (width.indexOf(item) > -1 && height.indexOf(item) > -1) {
        w = Number(width.slice(0, width.indexOf(item)).trim());
        h = Number(height.slice(0, height.indexOf(item)).trim());
        unit = item;
        return false;
      } else {
        return true;
      }
    });
    btn.style.width = '' + w + unit;
    btn.style.height = '' + h + unit;
    btn.style.backgroundSize = '' + w + unit + ' ' + h + unit;
    if (name === 'start') {
      btn.style.margin = '-' + h / 2 + unit + ' auto auto -' + w / 2 + unit;
    } else {
      btn.style.margin = 'auto 5px auto 5px';
    }
  }
  return btn;
};

util.Hex2RGBA = function (hex, alpha) {
  var rgb = []; // 定义rgb数组
  if (/^\#[0-9A-F]{3}$/i.test(hex)) {
    var sixHex = '#';
    hex.replace(/[0-9A-F]/ig, function (kw) {
      sixHex += kw + kw;
    });
    hex = sixHex;
  }
  if (/^#[0-9A-F]{6}$/i.test(hex)) {
    hex.replace(/[0-9A-F]{2}/ig, function (kw) {
      rgb.push(eval('0x' + kw));
    });
    return 'rgba(' + rgb.join(',') + ', ' + alpha + ')';
  } else {
    return 'rgba(255, 255, 255, 0.1)';
  }
};

util.isWeiXin = function () {
  var ua = window.navigator.userAgent.toLowerCase();
  return ua.indexOf('micromessenger') > -1;
};

util.isUc = function () {
  var ua = window.navigator.userAgent.toLowerCase();
  return ua.indexOf('ucbrowser') > -1;
};

util.computeWatchDur = function () {
  var played = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var minBegin = 0;
  var end = 0;
  var arr = [];
  for (var i = 0; i < played.length; i++) {
    if (!played[i].end || played[i].begin < 0 || played[i].end < 0 || played[i].end < played[i].begin) {
      continue;
    }
    if (arr.length < 1) {
      arr.push({ begin: played[i].begin, end: played[i].end });
    } else {
      for (var j = 0; j < arr.length; j++) {
        var begin = played[i].begin;
        var _end = played[i].end;
        if (_end < arr[j].begin) {
          arr.splice(j, 0, { begin: begin, end: _end });
          break;
        } else if (begin > arr[j].end) {
          if (j > arr.length - 2) {
            arr.push({ begin: begin, end: _end });
            break;
          }
        } else {
          var b = arr[j].begin;
          var e = arr[j].end;
          arr[j].begin = Math.min(begin, b);
          arr[j].end = Math.max(_end, e);
          break;
        }
      }
    }
  }
  var watch_dur = 0;
  for (var _i = 0; _i < arr.length; _i++) {
    watch_dur += arr[_i].end - arr[_i].begin;
  }
  return watch_dur;
};

util.downloadFile = function (url) {
  var me = this;
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", url);
    xhr.responseType = "arraybuffer";
    xhr.onload = function () {
      var blob = void 0;
      var ctx = xhr.response;
      try {
        blob = new Blob([ctx], { type: 'application/x-mpegURL' });
      } catch (e) {
        // Backwards-compatibility
        window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
        blob = new BlobBuilder();
        blob.append(ctx);
        blob = blob.getBlob();
      }
      var blobUrl = URL.createObjectURL(blob);
      me.cacheBuffer[url] = {
        blobUrl: blobUrl,
        blob: blob
      };
      if (me.options.backupUrls && me.options.backupUrls.length && !me.backup_download_success) {
        if (me.options.backupUrls.every(function (url) {
          return me.cacheBuffer[url] && !isPromise(me.cacheBuffer[url]);
        })) {
          me.emit('backup_download_success');
          me.backup_download_success = true;
        }
      }
      resolve({
        blobUrl: blobUrl,
        blob: blob
      });
    };
    xhr.onerror = function (e) {
      delete me.cacheBuffer[url];
      resolve(url);
    };
    xhr.onprogress = function (e) {
      if (me.cacheBuffer[url] == -1 && xhr) {
        xhr.abort();
        delete me.cacheBuffer[url];
      }
    };
    xhr.send();
  });
};

exports.default = util;
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _package = __webpack_require__(5);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ErrorTypes = {
  network: {
    code: 1,
    msg: '视频下载错误',
    remark: '只要视频下载错误就使用此类型，无论是video本身的超时还是xhr的分段请求超时或者资源不存在'
  },
  mse: {
    code: 2,
    msg: '流追加错误',
    remark: '追加流的时候如果类型不对、无法被正确解码则会触发此类错误'
  },
  parse: {
    code: 3,
    msg: '解析错误',
    remark: 'mp4、hls、flv我们都是使用js进行格式解析，如果解析失败则会触发此类错误'
  },
  format: {
    code: 4,
    msg: '格式错误',
    remark: '如果浏览器不支持的格式导致播放错误'
  },
  decoder: {
    code: 5,
    msg: '解码错误',
    remark: '浏览器解码异常会抛出此类型错误'
  },
  runtime: {
    code: 6,
    msg: '语法错误',
    remark: '播放器语法错误'
  },
  timeout: {
    code: 7,
    msg: '播放超时',
    remark: '播放过程中无法正常请求下一个分段导致播放中断'
  },
  other: {
    code: 8,
    msg: '其他错误',
    remark: '不可知的错误或被忽略的错误类型'
  }
};

var Errors = function Errors(type, currentTime, duration, networkState, readyState, src, currentSrc, ended) {
  var errd = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : { line: '', handle: '', msg: '', version: '' };
  var errorCode = arguments[9];
  var mediaError = arguments[10];

  _classCallCheck(this, Errors);

  var r = {};
  if (arguments.length > 1) {
    r.playerVersion = _package.version; // 播放器版本
    r.errorType = type;
    r.domain = document.domain; // domain
    r.duration = duration; // 视频时长
    r.currentTime = currentTime;
    r.networkState = networkState;
    r.readyState = readyState;
    r.currentSrc = currentSrc;
    r.src = src;
    r.ended = ended;
    r.errd = errd; // 错误详情
    r.ex = (ErrorTypes[type] || {}).msg; // 补充信息
    r.errorCode = errorCode;
    r.mediaError = mediaError;
  } else {
    var arg = arguments[0];
    Object.keys(arg).map(function (key) {
      r[key] = arg[key];
    });
    r.ex = (arg.type && ErrorTypes[arg.type] || {}).msg;
  }
  return r;
};

exports.default = Errors;
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"xgplayer\",\"version\":\"2.9.15\",\"description\":\"video player\",\"main\":\"./dist/index.js\",\"typings\":\"./types/index.d.ts\",\"bin\":{\"xgplayer\":\"bin/xgplayer.js\"},\"scripts\":{\"prepare\":\"npm run build\",\"postpublish\":\"git push --tags\",\"build\":\"webpack --progress --display-chunks -p\",\"watch\":\"webpack --progress --display-chunks -p --watch --mode development\",\"release:stable\":\"npm version patch && npm publish --registry=http://registry.npmjs.org\",\"release:alpha\":\"npm version prerelease --preid=alpha && npm publish --tag alpha --registry=http://registry.npmjs.org\",\"release:alpha-test\":\"npm publish --tag alpha-test --registry=http://registry.npmjs.org\"},\"keywords\":[\"video\",\"player\"],\"babel\":{\"presets\":[\"es2015\"],\"plugins\":[\"add-module-exports\",\"babel-plugin-bulk-import\"]},\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/bytedance/xgplayer.git\"},\"author\":\"yinguohui@bytedance.com\",\"license\":\"MIT\",\"dependencies\":{\"chalk\":\"^2.3.2\",\"commander\":\"^2.15.1\",\"danmu.js\":\"^0.2.17\",\"deepmerge\":\"^1.5.0\",\"downloadjs\":\"1.4.7\",\"draggabilly\":\"^2.2.0\",\"event-emitter\":\"^0.3.5\",\"fs-extra\":\"^5.0.0\",\"install\":\"^0.13.0\",\"pasition\":\"^1.0.1\",\"request-frame\":\"^1.5.3\"},\"browserslist\":[\"> 5%\",\"IE 9\",\"iOS 7\",\"Firefox > 20\"],\"devDependencies\":{\"@types/events\":\"^3.0.0\",\"autoprefixer\":\"^9.1.5\",\"babel-core\":\"^6.26.3\",\"babel-loader\":\"^7.1.4\",\"babel-plugin-add-module-exports\":\"^0.2.1\",\"babel-plugin-bulk-import\":\"^1.0.2\",\"babel-plugin-transform-object-rest-spread\":\"^6.26.0\",\"babel-plugin-transform-runtime\":\"^6.23.0\",\"babel-preset-es2015\":\"^6.24.1\",\"chai\":\"^4.1.2\",\"core-js\":\"^2.5.4\",\"css-loader\":\"^0.28.11\",\"json-loader\":\"^0.5.7\",\"node-sass\":\"^4.8.3\",\"postcss-cssnext\":\"^3.1.0\",\"postcss-loader\":\"^2.1.5\",\"raw-loader\":\"^2.0.0\",\"sass-loader\":\"^6.0.7\",\"style-loader\":\"^0.20.3\",\"sugarss\":\"^1.0.1\",\"webpack\":\"^4.11.0\",\"webpack-cli\":\"^3.0.2\",\"zlib\":\"^1.0.5\"}}");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

var _volume = __webpack_require__(37);

var _volume2 = _interopRequireDefault(_volume);

var _start = __webpack_require__(38);

var _start2 = _interopRequireDefault(_start);

var _screenShot = __webpack_require__(39);

var _screenShot2 = _interopRequireDefault(_screenShot);

var _rotate = __webpack_require__(40);

var _rotate2 = _interopRequireDefault(_rotate);

var _replay = __webpack_require__(41);

var _replay2 = _interopRequireDefault(_replay);

var _reload = __webpack_require__(42);

var _reload2 = _interopRequireDefault(_reload);

var _playNext = __webpack_require__(43);

var _playNext2 = _interopRequireDefault(_playNext);

var _play = __webpack_require__(44);

var _play2 = _interopRequireDefault(_play);

var _pip = __webpack_require__(45);

var _pip2 = _interopRequireDefault(_pip);

var _pc = __webpack_require__(46);

var _pc2 = _interopRequireDefault(_pc);

var _mobile = __webpack_require__(47);

var _mobile2 = _interopRequireDefault(_mobile);

var _memoryPlay = __webpack_require__(48);

var _memoryPlay2 = _interopRequireDefault(_memoryPlay);

var _localPreview = __webpack_require__(49);

var _localPreview2 = _interopRequireDefault(_localPreview);

var _i18n = __webpack_require__(50);

var _i18n2 = _interopRequireDefault(_i18n);

var _fullscreen = __webpack_require__(51);

var _fullscreen2 = _interopRequireDefault(_fullscreen);

var _errorRetry = __webpack_require__(52);

var _errorRetry2 = _interopRequireDefault(_errorRetry);

var _download = __webpack_require__(53);

var _download2 = _interopRequireDefault(_download);

var _definition = __webpack_require__(54);

var _definition2 = _interopRequireDefault(_definition);

var _danmu = __webpack_require__(55);

var _danmu2 = _interopRequireDefault(_danmu);

var _cssFullscreen = __webpack_require__(56);

var _cssFullscreen2 = _interopRequireDefault(_cssFullscreen);

var _skin = __webpack_require__(57);

var _skin2 = _interopRequireDefault(_skin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Controls = {};

function _buildTree(v, p, a) {
  var o = v;
  p.map(function (_, i) {
    o[_] = i == p.length - 1 ? a : o[_] || {};
    o = o[_];
  });
}

_buildTree(Controls, ['controls', 'cssFullscreen'], _cssFullscreen2.default);

_buildTree(Controls, ['controls', 'danmu'], _danmu2.default);

_buildTree(Controls, ['controls', 'definition'], _definition2.default);

_buildTree(Controls, ['controls', 'download'], _download2.default);

_buildTree(Controls, ['controls', 'errorRetry'], _errorRetry2.default);

_buildTree(Controls, ['controls', 'fullscreen'], _fullscreen2.default);

_buildTree(Controls, ['controls', 'i18n'], _i18n2.default);

_buildTree(Controls, ['controls', 'localPreview'], _localPreview2.default);

_buildTree(Controls, ['controls', 'memoryPlay'], _memoryPlay2.default);

_buildTree(Controls, ['controls', 'mobile'], _mobile2.default);

_buildTree(Controls, ['controls', 'pc'], _pc2.default);

_buildTree(Controls, ['controls', 'pip'], _pip2.default);

_buildTree(Controls, ['controls', 'play'], _play2.default);

_buildTree(Controls, ['controls', 'playNext'], _playNext2.default);

_buildTree(Controls, ['controls', 'reload'], _reload2.default);

_buildTree(Controls, ['controls', 'replay'], _replay2.default);

_buildTree(Controls, ['controls', 'rotate'], _rotate2.default);

_buildTree(Controls, ['controls', 'screenShot'], _screenShot2.default);

_buildTree(Controls, ['controls', 'start'], _start2.default);

_buildTree(Controls, ['controls', 'volume'], _volume2.default);

exports.default = _player2.default;
module.exports = exports['default'];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventEmitter = __webpack_require__(9);

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

var _util = __webpack_require__(3);

var _util2 = _interopRequireDefault(_util);

var _error = __webpack_require__(4);

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Proxy = function () {
  function Proxy(options) {
    _classCallCheck(this, Proxy);

    this.logParams = {
      bc: 0,
      bu_acu_t: 0,
      played: []
    };
    this._hasStart = false;
    this.videoConfig = {
      controls: !!options.isShowControl,
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
    if (options.muted) {
      this.videoConfig.muted = 'muted';
    }
    if (options.loop) {
      this.videoConfig.loop = 'loop';
    }
    var textTrackDom = '';
    this.textTrackShowDefault = true;
    if (options.textTrack && Array.isArray(options.textTrack)) {
      if (options.textTrack.length > 0 && !options.textTrack.some(function (track) {
        return track.default;
      })) {
        options.textTrack[0].default = true;
        this.textTrackShowDefault = false;
      }
      options.textTrack.some(function (track) {
        if (track.src && track.label && track.default) {
          textTrackDom += '<track src="' + track.src + '" ';
          if (track.kind) {
            textTrackDom += 'kind="' + track.kind + '" ';
          }
          textTrackDom += 'label="' + track.label + '" ';
          if (track.srclang) {
            textTrackDom += 'srclang="' + track.srclang + '" ';
          }
          textTrackDom += (track.default ? 'default' : '') + '>';
          return true;
        }
      });
      this.videoConfig.crossorigin = 'anonymous';
    }
    if (options.textTrackStyle) {
      var style = document.createElement('style');
      this.textTrackStyle = style;
      document.head.appendChild(style);
      var styleStr = '';
      for (var index in options.textTrackStyle) {
        styleStr += index + ': ' + options.textTrackStyle[index] + ';';
      }
      var wrap = options.id ? '#' + options.id : options.el.id ? '#' + options.el.id : '.' + options.el.className;
      if (style.sheet.insertRule) {
        style.sheet.insertRule(wrap + ' video::cue { ' + styleStr + ' }', 0);
      } else if (style.sheet.addRule) {
        style.sheet.addRule(wrap + ' video::cue', styleStr);
      }
    }
    this.video = _util2.default.createDom(this.videoConfig.mediaType, textTrackDom, this.videoConfig, '');
    if (!this.textTrackShowDefault && textTrackDom) {
      var trackDoms = this.video.getElementsByTagName('Track');
      trackDoms[0].track.mode = 'hidden';
    }
    if (options.autoplay) {
      this.video.autoplay = true;
      if (options.autoplayMuted) {
        this.video.muted = true;
      }
    }
    this.ev = ['play', 'playing', 'pause', 'ended', 'error', 'seeking', 'seeked', 'timeupdate', 'waiting', 'canplay', 'canplaythrough', 'durationchange', 'volumechange', 'loadeddata', 'loadstart'].map(function (item) {
      return _defineProperty({}, item, 'on' + item.charAt(0).toUpperCase() + item.slice(1));
    });
    (0, _eventEmitter2.default)(this);

    this._interval = {};
    var lastBuffer = '0,0';
    var self = this;

    this.ev.forEach(function (item) {
      self.evItem = Object.keys(item)[0];
      var name = Object.keys(item)[0];
      self.video.addEventListener(Object.keys(item)[0], function () {
        // fix when video destroy called and video reload
        if (!self || !self.logParams) {
          return;
        }
        if (name === 'play') {
          self.hasStart = true;
        } else if (name === 'canplay') {
          _util2.default.removeClass(self.root, 'xgplayer-is-enter');
        } else if (name === 'waiting') {
          self.logParams.bc++;
          self.inWaitingStart = new Date().getTime();
        } else if (name === 'playing') {
          _util2.default.removeClass(self.root, 'xgplayer-is-enter');
          if (self.inWaitingStart) {
            self.logParams.bu_acu_t += new Date().getTime() - self.inWaitingStart;
            self.inWaitingStart = undefined;
          }
        } else if (name === 'loadeddata') {
          self.logParams.played.push({
            begin: 0,
            end: -1
          });
        } else if (name === 'seeking') {
          self.logParams.played.push({
            begin: self.video.currentTime,
            end: -1
          });
        } else if (self && self.logParams && self.logParams.played && name === 'timeupdate') {
          if (self.logParams.played.length < 1) {
            self.logParams.played.push({
              begin: self.video.currentTime,
              end: -1
            });
          }
          self.logParams.played[self.logParams.played.length - 1].end = self.video.currentTime;
        }
        if (name === 'error') {
          // process the error
          self._onError(name);
        } else {
          self.emit(name, self);
        }

        if (self.hasOwnProperty('_interval')) {
          if (['ended', 'error', 'timeupdate'].indexOf(name) < 0) {
            clearInterval(self._interval['bufferedChange']);
            _util2.default.setInterval(self, 'bufferedChange', function () {
              if (self.video && self.video.buffered) {
                var curBuffer = [];
                for (var i = 0, len = self.video.buffered.length; i < len; i++) {
                  curBuffer.push([self.video.buffered.start(i), self.video.buffered.end(i)]);
                }
                if (curBuffer.toString() !== lastBuffer) {
                  lastBuffer = curBuffer.toString();
                  self.emit('bufferedChange', curBuffer);
                }
              }
            }, 200);
          } else {
            if (name !== 'timeupdate') {
              _util2.default.clearInterval(self, 'bufferedChange');
            }
          }
        }
      }, false);
    });
  }
  /**
   * 错误监听处理逻辑抽离
   */


  _createClass(Proxy, [{
    key: '_onError',
    value: function _onError(name) {
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
      if (this.textTrackStyle) {
        this.textTrackStyle.parentNode.removeChild(this.textTrackStyle);
      }
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
      if (typeof bool === 'boolean' && bool === true && !this._hasStart) {
        this._hasStart = true;
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
      return this.video.currentTime;
    },
    set: function set(time) {
      var _this = this;

      if (typeof isFinite === 'function' && !isFinite(time)) return;
      if (_util2.default.hasClass(this.root, 'xgplayer-ended')) {
        this.once('playing', function () {
          _this.video.currentTime = time;
        });
        this.replay();
      } else {
        this.video.currentTime = time;
      }
      this.emit('currentTimeChange');
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
      return this.video.duration;
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
      var self = this;
      if (!_util2.default.hasClass(this.root, 'xgplayer-ended')) {
        this.emit('urlchange', JSON.parse(JSON.stringify(self.logParams)));
      }
      this.logParams = {
        bc: 0,
        bu_acu_t: 0,
        played: [],
        pt: new Date().getTime(),
        vt: new Date().getTime(),
        vd: 0
      };
      this.video.pause();
      this.video.src = url;
      this.emit('srcChange');
      this.logParams.playSrc = url;
      this.logParams.pt = new Date().getTime();
      this.logParams.vt = this.logParams.pt;
      function ldFunc() {
        self.logParams.vt = new Date().getTime();
        if (self.logParams.pt > self.logParams.vt) {
          self.logParams.pt = self.logParams.vt;
        }
        self.logParams.vd = self.video.duration;
        self.off('loadeddata', ldFunc);
      }
      this.once('loadeddata', ldFunc);
    }
  }, {
    key: 'poster',
    set: function set(posterUrl) {
      var poster = _util2.default.findDom(this.root, '.xgplayer-poster');
      if (poster) {
        poster.style.backgroundImage = 'url(' + posterUrl + ')';
      }
    }
  }, {
    key: 'volume',
    get: function get() {
      return this.video.volume;
    },
    set: function set(vol) {
      this.video.volume = vol;
    }
  }, {
    key: 'fullscreen',
    get: function get() {
      return _util2.default.hasClass(this.root, 'xgplayer-is-fullscreen') || _util2.default.hasClass(this.root, 'xgplayer-fullscreen-active');
    }
  }, {
    key: 'bullet',
    get: function get() {
      return _util2.default.findDom(this.root, 'xg-danmu') ? _util2.default.hasClass(_util2.default.findDom(this.root, 'xg-danmu'), 'xgplayer-has-danmu') : false;
    }
  }, {
    key: 'textTrack',
    get: function get() {
      return _util2.default.hasClass(this.root, 'xgplayer-is-textTrack');
    }
  }, {
    key: 'pip',
    get: function get() {
      return _util2.default.hasClass(this.root, 'xgplayer-pip-active');
    }
  }]);

  return Proxy;
}();

exports.default = Proxy;
module.exports = exports['default'];

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var d = __webpack_require__(10),
    callable = __webpack_require__(27),
    apply = Function.prototype.apply,
    call = Function.prototype.call,
    create = Object.create,
    defineProperty = Object.defineProperty,
    defineProperties = Object.defineProperties,
    hasOwnProperty = Object.prototype.hasOwnProperty,
    descriptor = { configurable: true, enumerable: false, writable: true },
    on,
    _once2,
    off,
    emit,
    methods,
    descriptors,
    base;

on = function on(type, listener) {
	var data;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) {
		data = descriptor.value = create(null);
		defineProperty(this, '__ee__', descriptor);
		descriptor.value = null;
	} else {
		data = this.__ee__;
	}
	if (!data[type]) data[type] = listener;else if (_typeof(data[type]) === 'object') data[type].push(listener);else data[type] = [data[type], listener];

	return this;
};

_once2 = function once(type, listener) {
	var _once, self;

	callable(listener);
	self = this;
	on.call(this, type, _once = function once() {
		off.call(self, type, _once);
		apply.call(listener, this, arguments);
	});

	_once.__eeOnceListener__ = listener;
	return this;
};

off = function off(type, listener) {
	var data, listeners, candidate, i;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) return this;
	data = this.__ee__;
	if (!data[type]) return this;
	listeners = data[type];

	if ((typeof listeners === 'undefined' ? 'undefined' : _typeof(listeners)) === 'object') {
		for (i = 0; candidate = listeners[i]; ++i) {
			if (candidate === listener || candidate.__eeOnceListener__ === listener) {
				if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];else listeners.splice(i, 1);
			}
		}
	} else {
		if (listeners === listener || listeners.__eeOnceListener__ === listener) {
			delete data[type];
		}
	}

	return this;
};

emit = function emit(type) {
	var i, l, listener, listeners, args;

	if (!hasOwnProperty.call(this, '__ee__')) return;
	listeners = this.__ee__[type];
	if (!listeners) return;

	if ((typeof listeners === 'undefined' ? 'undefined' : _typeof(listeners)) === 'object') {
		l = arguments.length;
		args = new Array(l - 1);
		for (i = 1; i < l; ++i) {
			args[i - 1] = arguments[i];
		}listeners = listeners.slice();
		for (i = 0; listener = listeners[i]; ++i) {
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
	once: _once2,
	off: off,
	emit: emit
};

descriptors = {
	on: d(on),
	once: d(_once2),
	off: d(off),
	emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function exports(o) {
	return o == null ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(2),
    isPlainFunction = __webpack_require__(11),
    assign = __webpack_require__(15),
    normalizeOpts = __webpack_require__(23),
    contains = __webpack_require__(24);

var d = module.exports = function (dscr, value /*, options*/) {
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
};

d.gs = function (dscr, get, set /*, options*/) {
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isFunction = __webpack_require__(12);

var classRe = /^\s*class[\s{/}]/,
    functionToString = Function.prototype.toString;

module.exports = function (value) {
	if (!isFunction(value)) return false;
	if (classRe.test(functionToString.call(value))) return false;
	return true;
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isPrototype = __webpack_require__(13);

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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(14);

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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isValue = __webpack_require__(2);

// prettier-ignore
var possibleTypes = { "object": true, "function": true, "undefined": true /* document.all */ };

module.exports = function (value) {
	if (!isValue(value)) return false;
	return hasOwnProperty.call(possibleTypes, typeof value === "undefined" ? "undefined" : _typeof(value));
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(16)() ? Object.assign : __webpack_require__(17);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var assign = Object.assign,
	    obj;
	if (typeof assign !== "function") return false;
	obj = { foo: "raz" };
	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
	return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = __webpack_require__(18),
    value = __webpack_require__(22),
    max = Math.max;

module.exports = function (dest, src /*, …srcn*/) {
	var error,
	    i,
	    length = max(arguments.length, 2),
	    assign;
	dest = Object(value(dest));
	assign = function assign(key) {
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(19)() ? Object.keys : __webpack_require__(20);

/***/ }),
/* 19 */
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(1);

var keys = Object.keys;

module.exports = function (object) {
  return keys(isValue(object) ? Object(object) : object);
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// eslint-disable-next-line no-empty-function

module.exports = function () {};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(1);

module.exports = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(1);

var forEach = Array.prototype.forEach,
    create = Object.create;

var process = function process(src, obj) {
	var key;
	for (key in src) {
		obj[key] = src[key];
	}
};

// eslint-disable-next-line no-unused-vars
module.exports = function (opts1 /*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (!isValue(options)) return;
		process(Object(options), result);
	});
	return result;
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(25)() ? String.prototype.contains : __webpack_require__(26);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.contains !== "function") return false;
	return str.contains("dwa") === true && str.contains("foo") === false;
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var indexOf = String.prototype.indexOf;

module.exports = function (searchString /*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (fn) {
	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
	return fn;
};

/***/ }),
/* 28 */
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

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var sniffer = {
  get device() {
    var r = sniffer.os;
    return r.isPc ? 'pc' : 'mobile';
    // return r.isPc ? 'pc' : r.isTablet ? 'tablet' : 'mobile'
  },
  get browser() {
    var ua = navigator.userAgent.toLowerCase();
    var reg = {
      ie: /rv:([\d.]+)\) like gecko/,
      firfox: /firefox\/([\d.]+)/,
      chrome: /chrome\/([\d.]+)/,
      opera: /opera.([\d.]+)/,
      safari: /version\/([\d.]+).*safari/
    };
    return [].concat(Object.keys(reg).filter(function (key) {
      return reg[key].test(ua);
    }))[0];
  },
  get os() {
    var ua = navigator.userAgent;
    var isWindowsPhone = /(?:Windows Phone)/.test(ua);
    var isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
    var isAndroid = /(?:Android)/.test(ua);
    var isFireFox = /(?:Firefox)/.test(ua);
    var isTablet = /(?:iPad|PlayBook)/.test(ua) || isAndroid && !/(?:Mobile)/.test(ua) || isFireFox && /(?:Tablet)/.test(ua);
    var isPhone = /(?:iPhone)/.test(ua) && !isTablet;
    var isPc = !isPhone && !isAndroid && !isSymbian && !isTablet;
    return {
      isTablet: isTablet,
      isPhone: isPhone,
      isAndroid: isAndroid,
      isPc: isPc,
      isSymbian: isSymbian,
      isWindowsPhone: isWindowsPhone,
      isFireFox: isFireFox
    };
  }
};

exports.default = sniffer;
module.exports = exports['default'];

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Draggabilly v2.3.0
 * Make that shiz draggable
 * https://draggabilly.desandro.com
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */

(function (window, factory) {
  // universal module definition
  /* jshint strict: false */ /* globals define */
  if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(31), __webpack_require__(32)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (getSize, Unidragger) {
      return factory(window, getSize, Unidragger);
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(window, function factory(window, getSize, Unidragger) {

  // -------------------------- helpers & variables -------------------------- //

  // extend objects
  function extend(a, b) {
    for (var prop in b) {
      a[prop] = b[prop];
    }
    return a;
  }

  function noop() {}

  var jQuery = window.jQuery;

  // --------------------------  -------------------------- //

  function Draggabilly(element, options) {
    // querySelector if string
    this.element = typeof element == 'string' ? document.querySelector(element) : element;

    if (jQuery) {
      this.$element = jQuery(this.element);
    }

    // options
    this.options = extend({}, this.constructor.defaults);
    this.option(options);

    this._create();
  }

  // inherit Unidragger methods
  var proto = Draggabilly.prototype = Object.create(Unidragger.prototype);

  Draggabilly.defaults = {};

  /**
   * set options
   * @param {Object} opts
   */
  proto.option = function (opts) {
    extend(this.options, opts);
  };

  // css position values that don't need to be set
  var positionValues = {
    relative: true,
    absolute: true,
    fixed: true
  };

  proto._create = function () {
    // properties
    this.position = {};
    this._getPosition();

    this.startPoint = { x: 0, y: 0 };
    this.dragPoint = { x: 0, y: 0 };

    this.startPosition = extend({}, this.position);

    // set relative positioning
    var style = getComputedStyle(this.element);
    if (!positionValues[style.position]) {
      this.element.style.position = 'relative';
    }

    // events, bridge jQuery events from vanilla
    this.on('pointerMove', this.onPointerMove);
    this.on('pointerUp', this.onPointerUp);

    this.enable();
    this.setHandles();
  };

  /**
   * set this.handles and bind start events to 'em
   */
  proto.setHandles = function () {
    this.handles = this.options.handle ? this.element.querySelectorAll(this.options.handle) : [this.element];

    this.bindHandles();
  };

  /**
   * emits events via EvEmitter and jQuery events
   * @param {String} type - name of event
   * @param {Event} event - original event
   * @param {Array} args - extra arguments
   */
  proto.dispatchEvent = function (type, event, args) {
    var emitArgs = [event].concat(args);
    this.emitEvent(type, emitArgs);
    this.dispatchJQueryEvent(type, event, args);
  };

  proto.dispatchJQueryEvent = function (type, event, args) {
    var jquery = window.jQuery;
    // trigger jQuery event
    if (!jquery || !this.$element) {
      return;
    }
    // create jQuery event
    /* eslint-disable-next-line new-cap */
    var $event = jquery.Event(event);
    $event.type = type;
    this.$element.trigger($event, args);
  };

  // -------------------------- position -------------------------- //

  // get x/y position from style
  proto._getPosition = function () {
    var style = getComputedStyle(this.element);
    var x = this._getPositionCoord(style.left, 'width');
    var y = this._getPositionCoord(style.top, 'height');
    // clean up 'auto' or other non-integer values
    this.position.x = isNaN(x) ? 0 : x;
    this.position.y = isNaN(y) ? 0 : y;

    this._addTransformPosition(style);
  };

  proto._getPositionCoord = function (styleSide, measure) {
    if (styleSide.indexOf('%') != -1) {
      // convert percent into pixel for Safari, #75
      var parentSize = getSize(this.element.parentNode);
      // prevent not-in-DOM element throwing bug, #131
      return !parentSize ? 0 : parseFloat(styleSide) / 100 * parentSize[measure];
    }
    return parseInt(styleSide, 10);
  };

  // add transform: translate( x, y ) to position
  proto._addTransformPosition = function (style) {
    var transform = style.transform;
    // bail out if value is 'none'
    if (transform.indexOf('matrix') !== 0) {
      return;
    }
    // split matrix(1, 0, 0, 1, x, y)
    var matrixValues = transform.split(',');
    // translate X value is in 12th or 4th position
    var xIndex = transform.indexOf('matrix3d') === 0 ? 12 : 4;
    var translateX = parseInt(matrixValues[xIndex], 10);
    // translate Y value is in 13th or 5th position
    var translateY = parseInt(matrixValues[xIndex + 1], 10);
    this.position.x += translateX;
    this.position.y += translateY;
  };

  // -------------------------- events -------------------------- //

  proto.onPointerDown = function (event, pointer) {
    this.element.classList.add('is-pointer-down');
    this.dispatchJQueryEvent('pointerDown', event, [pointer]);
  };

  proto.pointerDown = function (event, pointer) {
    var isOkay = this.okayPointerDown(event);
    if (!isOkay || !this.isEnabled) {
      this._pointerReset();
      return;
    }
    // track start event position
    // Safari 9 overrides pageX and pageY. These values needs to be copied. flickity#842
    this.pointerDownPointer = {
      pageX: pointer.pageX,
      pageY: pointer.pageY
    };

    event.preventDefault();
    this.pointerDownBlur();
    // bind move and end events
    this._bindPostStartEvents(event);
    this.element.classList.add('is-pointer-down');
    this.dispatchEvent('pointerDown', event, [pointer]);
  };

  /**
   * drag start
   * @param {Event} event
   * @param {[Event, Touch]} pointer
   */
  proto.dragStart = function (event, pointer) {
    if (!this.isEnabled) {
      return;
    }
    this._getPosition();
    this.measureContainment();
    // position _when_ drag began
    this.startPosition.x = this.position.x;
    this.startPosition.y = this.position.y;
    // reset left/top style
    this.setLeftTop();

    this.dragPoint.x = 0;
    this.dragPoint.y = 0;

    this.element.classList.add('is-dragging');
    this.dispatchEvent('dragStart', event, [pointer]);
    // start animation
    this.animate();
  };

  proto.measureContainment = function () {
    var container = this.getContainer();
    if (!container) {
      return;
    }

    var elemSize = getSize(this.element);
    var containerSize = getSize(container);
    var elemRect = this.element.getBoundingClientRect();
    var containerRect = container.getBoundingClientRect();

    var borderSizeX = containerSize.borderLeftWidth + containerSize.borderRightWidth;
    var borderSizeY = containerSize.borderTopWidth + containerSize.borderBottomWidth;

    var position = this.relativeStartPosition = {
      x: elemRect.left - (containerRect.left + containerSize.borderLeftWidth),
      y: elemRect.top - (containerRect.top + containerSize.borderTopWidth)
    };

    this.containSize = {
      width: containerSize.width - borderSizeX - position.x - elemSize.width,
      height: containerSize.height - borderSizeY - position.y - elemSize.height
    };
  };

  proto.getContainer = function () {
    var containment = this.options.containment;
    if (!containment) {
      return;
    }
    var isElement = containment instanceof HTMLElement;
    // use as element
    if (isElement) {
      return containment;
    }
    // querySelector if string
    if (typeof containment == 'string') {
      return document.querySelector(containment);
    }
    // fallback to parent element
    return this.element.parentNode;
  };

  // ----- move event ----- //

  proto.onPointerMove = function (event, pointer, moveVector) {
    this.dispatchJQueryEvent('pointerMove', event, [pointer, moveVector]);
  };

  /**
   * drag move
   * @param {Event} event
   * @param {[Event, Touch]} pointer
   * @param {Object} moveVector - x and y coordinates
   */
  proto.dragMove = function (event, pointer, moveVector) {
    if (!this.isEnabled) {
      return;
    }
    var dragX = moveVector.x;
    var dragY = moveVector.y;

    var grid = this.options.grid;
    var gridX = grid && grid[0];
    var gridY = grid && grid[1];

    dragX = applyGrid(dragX, gridX);
    dragY = applyGrid(dragY, gridY);

    dragX = this.containDrag('x', dragX, gridX);
    dragY = this.containDrag('y', dragY, gridY);

    // constrain to axis
    dragX = this.options.axis == 'y' ? 0 : dragX;
    dragY = this.options.axis == 'x' ? 0 : dragY;

    this.position.x = this.startPosition.x + dragX;
    this.position.y = this.startPosition.y + dragY;
    // set dragPoint properties
    this.dragPoint.x = dragX;
    this.dragPoint.y = dragY;

    this.dispatchEvent('dragMove', event, [pointer, moveVector]);
  };

  function applyGrid(value, grid, method) {
    method = method || 'round';
    return grid ? Math[method](value / grid) * grid : value;
  }

  proto.containDrag = function (axis, drag, grid) {
    if (!this.options.containment) {
      return drag;
    }
    var measure = axis == 'x' ? 'width' : 'height';

    var rel = this.relativeStartPosition[axis];
    var min = applyGrid(-rel, grid, 'ceil');
    var max = this.containSize[measure];
    max = applyGrid(max, grid, 'floor');
    return Math.max(min, Math.min(max, drag));
  };

  // ----- end event ----- //

  /**
   * pointer up
   * @param {Event} event
   * @param {[Event, Touch]} pointer
   */
  proto.onPointerUp = function (event, pointer) {
    this.element.classList.remove('is-pointer-down');
    this.dispatchJQueryEvent('pointerUp', event, [pointer]);
  };

  /**
   * drag end
   * @param {Event} event
   * @param {[Event, Touch]} pointer
   */
  proto.dragEnd = function (event, pointer) {
    if (!this.isEnabled) {
      return;
    }
    // use top left position when complete
    this.element.style.transform = '';
    this.setLeftTop();
    this.element.classList.remove('is-dragging');
    this.dispatchEvent('dragEnd', event, [pointer]);
  };

  // -------------------------- animation -------------------------- //

  proto.animate = function () {
    // only render and animate if dragging
    if (!this.isDragging) {
      return;
    }

    this.positionDrag();

    var _this = this;
    requestAnimationFrame(function animateFrame() {
      _this.animate();
    });
  };

  // left/top positioning
  proto.setLeftTop = function () {
    this.element.style.left = this.position.x + 'px';
    this.element.style.top = this.position.y + 'px';
  };

  proto.positionDrag = function () {
    this.element.style.transform = 'translate3d( ' + this.dragPoint.x + 'px, ' + this.dragPoint.y + 'px, 0)';
  };

  // ----- staticClick ----- //

  proto.staticClick = function (event, pointer) {
    this.dispatchEvent('staticClick', event, [pointer]);
  };

  // ----- methods ----- //

  /**
   * @param {Number} x
   * @param {Number} y
   */
  proto.setPosition = function (x, y) {
    this.position.x = x;
    this.position.y = y;
    this.setLeftTop();
  };

  proto.enable = function () {
    this.isEnabled = true;
  };

  proto.disable = function () {
    this.isEnabled = false;
    if (this.isDragging) {
      this.dragEnd();
    }
  };

  proto.destroy = function () {
    this.disable();
    // reset styles
    this.element.style.transform = '';
    this.element.style.left = '';
    this.element.style.top = '';
    this.element.style.position = '';
    // unbind handles
    this.unbindHandles();
    // remove jQuery data
    if (this.$element) {
      this.$element.removeData('draggabilly');
    }
  };

  // ----- jQuery bridget ----- //

  // required for jQuery bridget
  proto._init = noop;

  if (jQuery && jQuery.bridget) {
    jQuery.bridget('draggabilly', Draggabilly);
  }

  // -----  ----- //

  return Draggabilly;
});

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */
/* globals console: false */

(function (window, factory) {
  /* jshint strict: false */ /* globals define, module */
  if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(window, function factory() {
  'use strict';

  // -------------------------- helpers -------------------------- //

  // get a number from a string, not a percentage

  function getStyleSize(value) {
    var num = parseFloat(value);
    // not a percent like '100%', and a number
    var isValid = value.indexOf('%') == -1 && !isNaN(num);
    return isValid && num;
  }

  function noop() {}

  var logError = typeof console == 'undefined' ? noop : function (message) {
    console.error(message);
  };

  // -------------------------- measurements -------------------------- //

  var measurements = ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'marginLeft', 'marginRight', 'marginTop', 'marginBottom', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderBottomWidth'];

  var measurementsLength = measurements.length;

  function getZeroSize() {
    var size = {
      width: 0,
      height: 0,
      innerWidth: 0,
      innerHeight: 0,
      outerWidth: 0,
      outerHeight: 0
    };
    for (var i = 0; i < measurementsLength; i++) {
      var measurement = measurements[i];
      size[measurement] = 0;
    }
    return size;
  }

  // -------------------------- getStyle -------------------------- //

  /**
   * getStyle, get style of element, check for Firefox bug
   * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
   */
  function getStyle(elem) {
    var style = getComputedStyle(elem);
    if (!style) {
      logError('Style returned ' + style + '. Are you running this code in a hidden iframe on Firefox? ' + 'See https://bit.ly/getsizebug1');
    }
    return style;
  }

  // -------------------------- setup -------------------------- //

  var isSetup = false;

  var isBoxSizeOuter;

  /**
   * setup
   * check isBoxSizerOuter
   * do on first getSize() rather than on page load for Firefox bug
   */
  function setup() {
    // setup once
    if (isSetup) {
      return;
    }
    isSetup = true;

    // -------------------------- box sizing -------------------------- //

    /**
     * Chrome & Safari measure the outer-width on style.width on border-box elems
     * IE11 & Firefox<29 measures the inner-width
     */
    var div = document.createElement('div');
    div.style.width = '200px';
    div.style.padding = '1px 2px 3px 4px';
    div.style.borderStyle = 'solid';
    div.style.borderWidth = '1px 2px 3px 4px';
    div.style.boxSizing = 'border-box';

    var body = document.body || document.documentElement;
    body.appendChild(div);
    var style = getStyle(div);
    // round value for browser zoom. desandro/masonry#928
    isBoxSizeOuter = Math.round(getStyleSize(style.width)) == 200;
    getSize.isBoxSizeOuter = isBoxSizeOuter;

    body.removeChild(div);
  }

  // -------------------------- getSize -------------------------- //

  function getSize(elem) {
    setup();

    // use querySeletor if elem is string
    if (typeof elem == 'string') {
      elem = document.querySelector(elem);
    }

    // do not proceed on non-objects
    if (!elem || (typeof elem === 'undefined' ? 'undefined' : _typeof(elem)) != 'object' || !elem.nodeType) {
      return;
    }

    var style = getStyle(elem);

    // if hidden, everything is 0
    if (style.display == 'none') {
      return getZeroSize();
    }

    var size = {};
    size.width = elem.offsetWidth;
    size.height = elem.offsetHeight;

    var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

    // get all measurements
    for (var i = 0; i < measurementsLength; i++) {
      var measurement = measurements[i];
      var value = style[measurement];
      var num = parseFloat(value);
      // any 'auto', 'medium' value will be 0
      size[measurement] = !isNaN(num) ? num : 0;
    }

    var paddingWidth = size.paddingLeft + size.paddingRight;
    var paddingHeight = size.paddingTop + size.paddingBottom;
    var marginWidth = size.marginLeft + size.marginRight;
    var marginHeight = size.marginTop + size.marginBottom;
    var borderWidth = size.borderLeftWidth + size.borderRightWidth;
    var borderHeight = size.borderTopWidth + size.borderBottomWidth;

    var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

    // overwrite width and height if we can get it from style
    var styleWidth = getStyleSize(style.width);
    if (styleWidth !== false) {
      size.width = styleWidth + (
      // add padding and border unless it's already including it
      isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth);
    }

    var styleHeight = getStyleSize(style.height);
    if (styleHeight !== false) {
      size.height = styleHeight + (
      // add padding and border unless it's already including it
      isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight);
    }

    size.innerWidth = size.width - (paddingWidth + borderWidth);
    size.innerHeight = size.height - (paddingHeight + borderHeight);

    size.outerWidth = size.width + marginWidth;
    size.outerHeight = size.height + marginHeight;

    return size;
  }

  return getSize;
});

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Unidragger v2.3.1
 * Draggable base class
 * MIT license
 */

/*jshint browser: true, unused: true, undef: true, strict: true */

(function (window, factory) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(33)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Unipointer) {
      return factory(window, Unipointer);
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(window, function factory(window, Unipointer) {

  'use strict';

  // -------------------------- Unidragger -------------------------- //

  function Unidragger() {}

  // inherit Unipointer & EvEmitter
  var proto = Unidragger.prototype = Object.create(Unipointer.prototype);

  // ----- bind start ----- //

  proto.bindHandles = function () {
    this._bindHandles(true);
  };

  proto.unbindHandles = function () {
    this._bindHandles(false);
  };

  /**
   * Add or remove start event
   * @param {Boolean} isAdd
   */
  proto._bindHandles = function (isAdd) {
    // munge isAdd, default to true
    isAdd = isAdd === undefined ? true : isAdd;
    // bind each handle
    var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';
    var touchAction = isAdd ? this._touchActionValue : '';
    for (var i = 0; i < this.handles.length; i++) {
      var handle = this.handles[i];
      this._bindStartEvent(handle, isAdd);
      handle[bindMethod]('click', this);
      // touch-action: none to override browser touch gestures. metafizzy/flickity#540
      if (window.PointerEvent) {
        handle.style.touchAction = touchAction;
      }
    }
  };

  // prototype so it can be overwriteable by Flickity
  proto._touchActionValue = 'none';

  // ----- start event ----- //

  /**
   * pointer start
   * @param {Event} event
   * @param {Event or Touch} pointer
   */
  proto.pointerDown = function (event, pointer) {
    var isOkay = this.okayPointerDown(event);
    if (!isOkay) {
      return;
    }
    // track start event position
    // Safari 9 overrides pageX and pageY. These values needs to be copied. flickity#842
    this.pointerDownPointer = {
      pageX: pointer.pageX,
      pageY: pointer.pageY
    };

    event.preventDefault();
    this.pointerDownBlur();
    // bind move and end events
    this._bindPostStartEvents(event);
    this.emitEvent('pointerDown', [event, pointer]);
  };

  // nodes that have text fields
  var cursorNodes = {
    TEXTAREA: true,
    INPUT: true,
    SELECT: true,
    OPTION: true
  };

  // input types that do not have text fields
  var clickTypes = {
    radio: true,
    checkbox: true,
    button: true,
    submit: true,
    image: true,
    file: true
  };

  // dismiss inputs with text fields. flickity#403, flickity#404
  proto.okayPointerDown = function (event) {
    var isCursorNode = cursorNodes[event.target.nodeName];
    var isClickType = clickTypes[event.target.type];
    var isOkay = !isCursorNode || isClickType;
    if (!isOkay) {
      this._pointerReset();
    }
    return isOkay;
  };

  // kludge to blur previously focused input
  proto.pointerDownBlur = function () {
    var focused = document.activeElement;
    // do not blur body for IE10, metafizzy/flickity#117
    var canBlur = focused && focused.blur && focused != document.body;
    if (canBlur) {
      focused.blur();
    }
  };

  // ----- move event ----- //

  /**
   * drag move
   * @param {Event} event
   * @param {Event or Touch} pointer
   */
  proto.pointerMove = function (event, pointer) {
    var moveVector = this._dragPointerMove(event, pointer);
    this.emitEvent('pointerMove', [event, pointer, moveVector]);
    this._dragMove(event, pointer, moveVector);
  };

  // base pointer move logic
  proto._dragPointerMove = function (event, pointer) {
    var moveVector = {
      x: pointer.pageX - this.pointerDownPointer.pageX,
      y: pointer.pageY - this.pointerDownPointer.pageY
    };
    // start drag if pointer has moved far enough to start drag
    if (!this.isDragging && this.hasDragStarted(moveVector)) {
      this._dragStart(event, pointer);
    }
    return moveVector;
  };

  // condition if pointer has moved far enough to start drag
  proto.hasDragStarted = function (moveVector) {
    return Math.abs(moveVector.x) > 3 || Math.abs(moveVector.y) > 3;
  };

  // ----- end event ----- //

  /**
   * pointer up
   * @param {Event} event
   * @param {Event or Touch} pointer
   */
  proto.pointerUp = function (event, pointer) {
    this.emitEvent('pointerUp', [event, pointer]);
    this._dragPointerUp(event, pointer);
  };

  proto._dragPointerUp = function (event, pointer) {
    if (this.isDragging) {
      this._dragEnd(event, pointer);
    } else {
      // pointer didn't move enough for drag to start
      this._staticClick(event, pointer);
    }
  };

  // -------------------------- drag -------------------------- //

  // dragStart
  proto._dragStart = function (event, pointer) {
    this.isDragging = true;
    // prevent clicks
    this.isPreventingClicks = true;
    this.dragStart(event, pointer);
  };

  proto.dragStart = function (event, pointer) {
    this.emitEvent('dragStart', [event, pointer]);
  };

  // dragMove
  proto._dragMove = function (event, pointer, moveVector) {
    // do not drag if not dragging yet
    if (!this.isDragging) {
      return;
    }

    this.dragMove(event, pointer, moveVector);
  };

  proto.dragMove = function (event, pointer, moveVector) {
    event.preventDefault();
    this.emitEvent('dragMove', [event, pointer, moveVector]);
  };

  // dragEnd
  proto._dragEnd = function (event, pointer) {
    // set flags
    this.isDragging = false;
    // re-enable clicking async
    setTimeout(function () {
      delete this.isPreventingClicks;
    }.bind(this));

    this.dragEnd(event, pointer);
  };

  proto.dragEnd = function (event, pointer) {
    this.emitEvent('dragEnd', [event, pointer]);
  };

  // ----- onclick ----- //

  // handle all clicks and prevent clicks when dragging
  proto.onclick = function (event) {
    if (this.isPreventingClicks) {
      event.preventDefault();
    }
  };

  // ----- staticClick ----- //

  // triggered after pointer down & up with no/tiny movement
  proto._staticClick = function (event, pointer) {
    // ignore emulated mouse up clicks
    if (this.isIgnoringMouseUp && event.type == 'mouseup') {
      return;
    }

    this.staticClick(event, pointer);

    // set flag for emulated clicks 300ms after touchend
    if (event.type != 'mouseup') {
      this.isIgnoringMouseUp = true;
      // reset flag after 300ms
      setTimeout(function () {
        delete this.isIgnoringMouseUp;
      }.bind(this), 400);
    }
  };

  proto.staticClick = function (event, pointer) {
    this.emitEvent('staticClick', [event, pointer]);
  };

  // ----- utils ----- //

  Unidragger.getPointerPoint = Unipointer.getPointerPoint;

  // -----  ----- //

  return Unidragger;
});

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * Unipointer v2.3.0
 * base class for doing one thing with pointer event
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

(function (window, factory) {
  // universal module definition
  /* jshint strict: false */ /*global define, module, require */
  if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(34)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (EvEmitter) {
      return factory(window, EvEmitter);
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(window, function factory(window, EvEmitter) {

  'use strict';

  function noop() {}

  function Unipointer() {}

  // inherit EvEmitter
  var proto = Unipointer.prototype = Object.create(EvEmitter.prototype);

  proto.bindStartEvent = function (elem) {
    this._bindStartEvent(elem, true);
  };

  proto.unbindStartEvent = function (elem) {
    this._bindStartEvent(elem, false);
  };

  /**
   * Add or remove start event
   * @param {Boolean} isAdd - remove if falsey
   */
  proto._bindStartEvent = function (elem, isAdd) {
    // munge isAdd, default to true
    isAdd = isAdd === undefined ? true : isAdd;
    var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';

    // default to mouse events
    var startEvent = 'mousedown';
    if (window.PointerEvent) {
      // Pointer Events
      startEvent = 'pointerdown';
    } else if ('ontouchstart' in window) {
      // Touch Events. iOS Safari
      startEvent = 'touchstart';
    }
    elem[bindMethod](startEvent, this);
  };

  // trigger handler methods for events
  proto.handleEvent = function (event) {
    var method = 'on' + event.type;
    if (this[method]) {
      this[method](event);
    }
  };

  // returns the touch that we're keeping track of
  proto.getTouch = function (touches) {
    for (var i = 0; i < touches.length; i++) {
      var touch = touches[i];
      if (touch.identifier == this.pointerIdentifier) {
        return touch;
      }
    }
  };

  // ----- start event ----- //

  proto.onmousedown = function (event) {
    // dismiss clicks from right or middle buttons
    var button = event.button;
    if (button && button !== 0 && button !== 1) {
      return;
    }
    this._pointerDown(event, event);
  };

  proto.ontouchstart = function (event) {
    this._pointerDown(event, event.changedTouches[0]);
  };

  proto.onpointerdown = function (event) {
    this._pointerDown(event, event);
  };

  /**
   * pointer start
   * @param {Event} event
   * @param {Event or Touch} pointer
   */
  proto._pointerDown = function (event, pointer) {
    // dismiss right click and other pointers
    // button = 0 is okay, 1-4 not
    if (event.button || this.isPointerDown) {
      return;
    }

    this.isPointerDown = true;
    // save pointer identifier to match up touch events
    this.pointerIdentifier = pointer.pointerId !== undefined ?
    // pointerId for pointer events, touch.indentifier for touch events
    pointer.pointerId : pointer.identifier;

    this.pointerDown(event, pointer);
  };

  proto.pointerDown = function (event, pointer) {
    this._bindPostStartEvents(event);
    this.emitEvent('pointerDown', [event, pointer]);
  };

  // hash of events to be bound after start event
  var postStartEvents = {
    mousedown: ['mousemove', 'mouseup'],
    touchstart: ['touchmove', 'touchend', 'touchcancel'],
    pointerdown: ['pointermove', 'pointerup', 'pointercancel']
  };

  proto._bindPostStartEvents = function (event) {
    if (!event) {
      return;
    }
    // get proper events to match start event
    var events = postStartEvents[event.type];
    // bind events to node
    events.forEach(function (eventName) {
      window.addEventListener(eventName, this);
    }, this);
    // save these arguments
    this._boundPointerEvents = events;
  };

  proto._unbindPostStartEvents = function () {
    // check for _boundEvents, in case dragEnd triggered twice (old IE8 bug)
    if (!this._boundPointerEvents) {
      return;
    }
    this._boundPointerEvents.forEach(function (eventName) {
      window.removeEventListener(eventName, this);
    }, this);

    delete this._boundPointerEvents;
  };

  // ----- move event ----- //

  proto.onmousemove = function (event) {
    this._pointerMove(event, event);
  };

  proto.onpointermove = function (event) {
    if (event.pointerId == this.pointerIdentifier) {
      this._pointerMove(event, event);
    }
  };

  proto.ontouchmove = function (event) {
    var touch = this.getTouch(event.changedTouches);
    if (touch) {
      this._pointerMove(event, touch);
    }
  };

  /**
   * pointer move
   * @param {Event} event
   * @param {Event or Touch} pointer
   * @private
   */
  proto._pointerMove = function (event, pointer) {
    this.pointerMove(event, pointer);
  };

  // public
  proto.pointerMove = function (event, pointer) {
    this.emitEvent('pointerMove', [event, pointer]);
  };

  // ----- end event ----- //


  proto.onmouseup = function (event) {
    this._pointerUp(event, event);
  };

  proto.onpointerup = function (event) {
    if (event.pointerId == this.pointerIdentifier) {
      this._pointerUp(event, event);
    }
  };

  proto.ontouchend = function (event) {
    var touch = this.getTouch(event.changedTouches);
    if (touch) {
      this._pointerUp(event, touch);
    }
  };

  /**
   * pointer up
   * @param {Event} event
   * @param {Event or Touch} pointer
   * @private
   */
  proto._pointerUp = function (event, pointer) {
    this._pointerDone();
    this.pointerUp(event, pointer);
  };

  // public
  proto.pointerUp = function (event, pointer) {
    this.emitEvent('pointerUp', [event, pointer]);
  };

  // ----- pointer done ----- //

  // triggered on pointer up & pointer cancel
  proto._pointerDone = function () {
    this._pointerReset();
    this._unbindPostStartEvents();
    this.pointerDone();
  };

  proto._pointerReset = function () {
    // reset properties
    this.isPointerDown = false;
    delete this.pointerIdentifier;
  };

  proto.pointerDone = noop;

  // ----- pointer cancel ----- //

  proto.onpointercancel = function (event) {
    if (event.pointerId == this.pointerIdentifier) {
      this._pointerCancel(event, event);
    }
  };

  proto.ontouchcancel = function (event) {
    var touch = this.getTouch(event.changedTouches);
    if (touch) {
      this._pointerCancel(event, touch);
    }
  };

  /**
   * pointer cancel
   * @param {Event} event
   * @param {Event or Touch} pointer
   * @private
   */
  proto._pointerCancel = function (event, pointer) {
    this._pointerDone();
    this.pointerCancel(event, pointer);
  };

  // public
  proto.pointerCancel = function (event, pointer) {
    this.emitEvent('pointerCancel', [event, pointer]);
  };

  // -----  ----- //

  // utility function for getting x/y coords from event
  Unipointer.getPointerPoint = function (pointer) {
    return {
      x: pointer.pageX,
      y: pointer.pageY
    };
  };

  // -----  ----- //

  return Unipointer;
});

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

(function (global, factory) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if (true) {
    // AMD - RequireJS
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(typeof window != 'undefined' ? window : undefined, function () {

  "use strict";

  function EvEmitter() {}

  var proto = EvEmitter.prototype;

  proto.on = function (eventName, listener) {
    if (!eventName || !listener) {
      return;
    }
    // set events hash
    var events = this._events = this._events || {};
    // set listeners array
    var listeners = events[eventName] = events[eventName] || [];
    // only add once
    if (listeners.indexOf(listener) == -1) {
      listeners.push(listener);
    }

    return this;
  };

  proto.once = function (eventName, listener) {
    if (!eventName || !listener) {
      return;
    }
    // add event
    this.on(eventName, listener);
    // set once flag
    // set onceEvents hash
    var onceEvents = this._onceEvents = this._onceEvents || {};
    // set onceListeners object
    var onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
    // set flag
    onceListeners[listener] = true;

    return this;
  };

  proto.off = function (eventName, listener) {
    var listeners = this._events && this._events[eventName];
    if (!listeners || !listeners.length) {
      return;
    }
    var index = listeners.indexOf(listener);
    if (index != -1) {
      listeners.splice(index, 1);
    }

    return this;
  };

  proto.emitEvent = function (eventName, args) {
    var listeners = this._events && this._events[eventName];
    if (!listeners || !listeners.length) {
      return;
    }
    // copy over to avoid interference if .off() in listener
    listeners = listeners.slice(0);
    args = args || [];
    // once stuff
    var onceListeners = this._onceEvents && this._onceEvents[eventName];

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      var isOnce = onceListeners && onceListeners[listener];
      if (isOnce) {
        // remove listener
        // remove before trigger to prevent recursion
        this.off(eventName, listener);
        // unset once flag
        delete onceListeners[listener];
      }
      // trigger listener
      listener.apply(this, args);
    }

    return this;
  };

  proto.allOff = function () {
    delete this._events;
    delete this._onceEvents;
  };

  return EvEmitter;
});

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getAbsoluteURL = exports.getAbsoluteURL = function getAbsoluteURL(url) {
  // Check if absolute URL
  if (!url.match(/^https?:\/\//)) {
    var div = document.createElement('div');
    div.innerHTML = '<a href="' + url + '">x</a>';
    url = div.firstChild.href;
  }
  return url;
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//download.js v4.2, by dandavis; 2008-2016. [MIT] see http://danml.com/download.html for tests/usage
// v1 landed a FF+Chrome compat way of downloading strings to local un-named files, upgraded to use a hidden frame and optional mime
// v2 added named files via a[download], msSaveBlob, IE (10+) support, and window.URL support for larger+faster saves than dataURLs
// v3 added dataURL and Blob Input, bind-toggle arity, and legacy dataURL fallback was improved with force-download mime and base64 support. 3.1 improved safari handling.
// v4 adds AMD/UMD, commonJS, and plain browser support
// v4.1 adds url download capability via solo URL argument (same domain/CORS only)
// v4.2 adds semantic variable names, long (over 2MB) dataURL support, and hidden by default temp anchors
// https://github.com/rndme/download

(function (root, factory) {
	if (true) {
		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
})(undefined, function () {

	return function download(data, strFileName, strMimeType) {

		var self = window,
		    // this script is only for browsers anyway...
		defaultMime = "application/octet-stream",
		    // this default mime also triggers iframe downloads
		mimeType = strMimeType || defaultMime,
		    payload = data,
		    url = !strFileName && !strMimeType && payload,
		    anchor = document.createElement("a"),
		    toString = function toString(a) {
			return String(a);
		},
		    myBlob = self.Blob || self.MozBlob || self.WebKitBlob || toString,
		    fileName = strFileName || "download",
		    blob,
		    reader;
		myBlob = myBlob.call ? myBlob.bind(self) : Blob;

		if (String(this) === "true") {
			//reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
			payload = [payload, mimeType];
			mimeType = payload[0];
			payload = payload[1];
		}

		if (url && url.length < 2048) {
			// if no filename and no mime, assume a url was passed as the only argument
			fileName = url.split("/").pop().split("?")[0];
			anchor.href = url; // assign href prop to temp anchor
			if (anchor.href.indexOf(url) !== -1) {
				// if the browser determines that it's a potentially valid url path:
				var ajax = new XMLHttpRequest();
				ajax.open("GET", url, true);
				ajax.responseType = 'blob';
				ajax.onload = function (e) {
					download(e.target.response, fileName, defaultMime);
				};
				setTimeout(function () {
					ajax.send();
				}, 0); // allows setting custom ajax headers using the return:
				return ajax;
			} // end if valid url?
		} // end if url?


		//go ahead and download dataURLs right away
		if (/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(payload)) {

			if (payload.length > 1024 * 1024 * 1.999 && myBlob !== toString) {
				payload = dataUrlToBlob(payload);
				mimeType = payload.type || defaultMime;
			} else {
				return navigator.msSaveBlob ? // IE10 can't do a[download], only Blobs:
				navigator.msSaveBlob(dataUrlToBlob(payload), fileName) : saver(payload); // everyone else can save dataURLs un-processed
			}
		} else {
			//not data url, is it a string with special needs?
			if (/([\x80-\xff])/.test(payload)) {
				var i = 0,
				    tempUiArr = new Uint8Array(payload.length),
				    mx = tempUiArr.length;
				for (i; i < mx; ++i) {
					tempUiArr[i] = payload.charCodeAt(i);
				}payload = new myBlob([tempUiArr], { type: mimeType });
			}
		}
		blob = payload instanceof myBlob ? payload : new myBlob([payload], { type: mimeType });

		function dataUrlToBlob(strUrl) {
			var parts = strUrl.split(/[:;,]/),
			    type = parts[1],
			    decoder = parts[2] == "base64" ? atob : decodeURIComponent,
			    binData = decoder(parts.pop()),
			    mx = binData.length,
			    i = 0,
			    uiArr = new Uint8Array(mx);

			for (i; i < mx; ++i) {
				uiArr[i] = binData.charCodeAt(i);
			}return new myBlob([uiArr], { type: type });
		}

		function saver(url, winMode) {

			if ('download' in anchor) {
				//html5 A[download]
				anchor.href = url;
				anchor.setAttribute("download", fileName);
				anchor.className = "download-js-link";
				anchor.innerHTML = "downloading...";
				anchor.style.display = "none";
				document.body.appendChild(anchor);
				setTimeout(function () {
					anchor.click();
					document.body.removeChild(anchor);
					if (winMode === true) {
						setTimeout(function () {
							self.URL.revokeObjectURL(anchor.href);
						}, 250);
					}
				}, 66);
				return true;
			}

			// handle non-a[download] safari as best we can:
			if (/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
				if (/^data:/.test(url)) url = "data:" + url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
				if (!window.open(url)) {
					// popup blocked, offer direct download:
					if (confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")) {
						location.href = url;
					}
				}
				return true;
			}

			//do iframe dataURL download (old ch+FF):
			var f = document.createElement("iframe");
			document.body.appendChild(f);

			if (!winMode && /^data:/.test(url)) {
				// force a mime that will download:
				url = "data:" + url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
			}
			f.src = url;
			setTimeout(function () {
				document.body.removeChild(f);
			}, 333);
		} //end saver


		if (navigator.msSaveBlob) {
			// IE10+ : (has Blob, but not a[download] or URL)
			return navigator.msSaveBlob(blob, fileName);
		}

		if (self.URL) {
			// simple fast and modern way using Blob and URL:
			saver(self.URL.createObjectURL(blob), true);
		} else {
			// handle non-Blob()+non-URL browsers:
			if (typeof blob === "string" || blob.constructor === toString) {
				try {
					return saver("data:" + mimeType + ";base64," + self.btoa(blob));
				} catch (y) {
					return saver("data:" + mimeType + "," + encodeURIComponent(blob));
				}
			}

			// Blob but not URL support:
			reader = new FileReader();
			reader.onload = function (e) {
				saver(this.result);
			};
			reader.readAsDataURL(blob);
		}
		return true;
	}; /* end download() */
});

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var volume = function volume() {
  var player = this;
  var root = player.root;
  var util = _player2.default.util;
  var container = void 0,
      slider = void 0,
      bar = void 0,
      selected = void 0;
  function onCanplay() {
    // player.volume = Player.sniffer.device === 'mobile' ? 1 : player.config.volume
    if (!player.controls) return;
    player.volume = player.config.volume;
    container = player.controls.querySelector('.xgplayer-volume');
    if (!container) return;
    slider = container.querySelector('.xgplayer-slider');
    bar = container.querySelector('.xgplayer-bar');
    selected = container.querySelector('.xgplayer-drag');
    if (_player2.default.sniffer.device === 'mobile') {
      onVolumeChange();
    }
  }
  player.once('canplay', onCanplay);

  function onVolumeBarClick(e) {
    player.video.muted = false;
    slider.focus();
    util.event(e);

    var barRect = bar.getBoundingClientRect();
    var pos = { x: e.clientX, y: e.clientY };
    var height = selected.getBoundingClientRect().height;
    var isMove = false;
    var onMove = function onMove(e) {
      e.preventDefault();
      e.stopPropagation();
      util.event(e);
      isMove = true;
      var w = height - e.clientY + pos.y;
      var now = w / barRect.height;
      selected.style.height = w + 'px';
      player.volume = Math.max(Math.min(now, 1), 0);
    };
    var onUp = function onUp(e) {
      e.preventDefault();
      e.stopPropagation();
      util.event(e);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);

      if (!isMove) {
        var w = barRect.height - (e.clientY - barRect.top);
        var now = w / barRect.height;
        selected.style.height = w + 'px';
        if (now <= 0) {
          if (player.volume > 0) {
            selected.volume = player.video.volume;
          } else {
            now = selected.volume;
          }
        }
        player.volume = Math.max(Math.min(now, 1), 0);
      }
      slider.volume = player.volume;
      isMove = false;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    return false;
  }
  player.on('volumeBarClick', onVolumeBarClick);

  function onVolumeIconClick() {
    if (_player2.default.sniffer.device === 'mobile') {
      if (player.video.muted) {
        player.video.muted = false;
        player.emit('unmute');
        player.volume = 1;
      } else {
        player.video.muted = true;
        player.emit('mute');
        player.volume = 0;
      }
    } else {
      player.video.muted = false;
      if (player.volume < 0.1) {
        if (slider.volume < 0.1) {
          player.volume = 0.6;
        } else {
          player.volume = slider.volume;
        }
        player.emit('unmute');
      } else {
        player.volume = 0;
        player.emit('mute');
      }
    }
    // onVolumeChange ()
  }
  player.on('volumeIconClick', onVolumeIconClick);

  function onVolumeIconEnter() {
    util.addClass(root, 'xgplayer-volume-active');
    if (container) {
      container.focus();
    }
  }
  player.on('volumeIconEnter', onVolumeIconEnter);

  function onVolumeIconLeave() {
    util.removeClass(root, 'xgplayer-volume-active');
  }
  player.on('volumeIconLeave', onVolumeIconLeave);

  var _changeTimer = null;
  function onVolumeChange() {
    if (_changeTimer) {
      clearTimeout(_changeTimer);
    }
    _changeTimer = setTimeout(function () {
      if (_player2.default.sniffer.device === 'mobile') {
        util.removeClass(root, 'xgplayer-volume-muted');
        util.removeClass(root, 'xgplayer-volume-large');
        if (player.video.muted || player.video.defaultMuted) {
          if (!player.video.muted) {
            player.video.muted = true;
          }
          player.video.defaultMuted = false;
          util.addClass(root, 'xgplayer-volume-muted');
        } else {
          util.addClass(root, 'xgplayer-volume-large');
        }
      } else {
        util.removeClass(root, 'xgplayer-volume-muted');
        util.removeClass(root, 'xgplayer-volume-small');
        util.removeClass(root, 'xgplayer-volume-large');
        if (player.volume === 0) {
          util.addClass(root, 'xgplayer-volume-muted');
        } else if (player.volume < 0.5) {
          util.addClass(root, 'xgplayer-volume-small');
        } else {
          util.addClass(root, 'xgplayer-volume-large');
        }
        if (!bar) return;
        var containerHeight = bar.getBoundingClientRect().height || 76;
        selected.style.height = player.volume * containerHeight + 'px';
      }
    }, 50);
  }
  player.on('volumechange', onVolumeChange);

  function onDestroy() {
    player.off('canplay', onCanplay);
    player.off('volumeBarClick', onVolumeBarClick);
    player.off('volumeIconClick', onVolumeIconClick);
    player.off('volumeIconEnter', onVolumeIconEnter);
    player.off('volumeIconLeave', onVolumeIconLeave);
    player.off('volumechange', onVolumeChange);
    player.off('destroy', onDestroy);
    if (_changeTimer) {
      clearTimeout(_changeTimer);
      _changeTimer = null;
    }
  }
  player.once('destroy', onDestroy);
};

_player2.default.install('volume', volume);

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var start = function start() {
  var player = this;
  var root = player.root;
  var util = _player2.default.util;

  function onStartBtnClick() {
    if (util.hasClass(root, 'xgplayer-nostart')) {
      util.removeClass(root, 'xgplayer-nostart'); // for ie quick switch
      util.addClass(root, 'xgplayer-is-enter');
      if (!root.querySelector('video')) {
        player.start();
      }
      var playPromise = player.play();
      if (playPromise !== undefined && playPromise) {
        playPromise.catch(function (err) {});
      }
    } else {
      if (player.paused) {
        util.removeClass(root, 'xgplayer-nostart xgplayer-isloading');
        setTimeout(function () {
          var playPromise = player.play();
          if (playPromise !== undefined && playPromise) {
            playPromise.catch(function (err) {});
          }
        }, 10);
      }
    }
  }
  player.on('startBtnClick', onStartBtnClick);

  function onDestroy() {
    player.off('startBtnClick', onStartBtnClick);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

_player2.default.install('start', start);

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var screenShot = function screenShot() {
  var player = this;
  var root = player.root;
  var screenShotOptions = player.config.screenShot;
  if (!screenShotOptions) {
    return;
  }

  var encoderOptions = 0.92;
  if (screenShotOptions.quality || screenShotOptions.quality === 0) {
    encoderOptions = screenShotOptions.quality;
  }
  var type = screenShotOptions.type === undefined ? 'image/png' : screenShotOptions.type;
  var format = screenShotOptions.format === undefined ? '.png' : screenShotOptions.format;

  var canvas = document.createElement('canvas');
  var canvasCtx = canvas.getContext('2d');
  var img = new Image();
  canvas.width = this.config.width || 600;
  canvas.height = this.config.height || 337.5;

  var saveScreenShot = function saveScreenShot(data, filename) {
    var saveLink = document.createElement('a');
    saveLink.href = data;
    saveLink.download = filename;
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    saveLink.dispatchEvent(event);
  };

  function onScreenShotBtnClick() {
    var save = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    canvas.width = player.video.videoWidth || 600;
    canvas.height = player.video.videoHeight || 337.5;
    img.onload = function () {
      canvasCtx.drawImage(player.video, 0, 0, canvas.width, canvas.height);
      img.setAttribute('crossOrigin', 'anonymous');
      img.src = canvas.toDataURL(type, encoderOptions).replace(type, 'image/octet-stream');
      var screenShotImg = img.src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
      player.emit('screenShot', screenShotImg);
      save && saveScreenShot(screenShotImg, '截图' + format);
    }();
  }
  player.on('screenShotBtnClick', onScreenShotBtnClick);

  function onDestroy() {
    player.off('screenShotBtnClick', onScreenShotBtnClick);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

_player2.default.install('screenShot', screenShot);

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rotate = function rotate() {
  var player = this;
  var rotateConfig = player.config.rotate;
  if (!rotateConfig) {
    return;
  }

  function onRotateBtnClick() {
    player.rotate(rotateConfig.clockwise, rotateConfig.innerRotate);
  }
  player.on('rotateBtnClick', onRotateBtnClick);

  function onDestroy() {
    player.off('rotateBtnClick', onRotateBtnClick);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

_player2.default.install('rotate', rotate);

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var replay = function replay() {
  var player = this;
  var util = _player2.default.util;
  var root = player.root;

  function onReplayBtnClick() {
    util.removeClass(root, 'replay');
    player.replay();
  }
  player.on('replayBtnClick', onReplayBtnClick);

  function onEnded() {
    if (!player.config.loop) {
      util.addClass(root, 'replay');
    }
  }
  player.on('ended', onEnded);

  function onDestroy() {
    player.off('replayBtnClick', onReplayBtnClick);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

_player2.default.install('replay', replay);

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reload = function reload() {
  var player = this;
  var reloadConfig = player.config.reload;
  if (!reloadConfig) {
    return;
  }

  function onReloadBtnClick() {
    _player2.default.util.removeClass(player.root, 'xgplayer-is-error');
    player.src = player.config.url;
  }
  player.on('reloadBtnClick', onReloadBtnClick);

  function onDestroy() {
    player.off('reloadBtnClick', onReloadBtnClick);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

_player2.default.install('reload', reload);

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var playNext = function playNext() {
  var player = this;
  var nextBtn = player.config.playNext;
  player.currentVideoIndex = -1;

  function onPlayNextBtnClick() {
    if (player.currentVideoIndex + 1 < nextBtn.urlList.length) {
      player.currentVideoIndex++;
      player.video.autoplay = true;
      player.src = nextBtn.urlList[player.currentVideoIndex];
      player.emit('playerNext', player.currentVideoIndex + 1);
      if (player.currentVideoIndex + 1 === nextBtn.urlList.length) {
        player.emit('urlListEnd');
      }
    }
  }
  player.on('playNextBtnClick', onPlayNextBtnClick);

  function onDestroy() {
    player.off('playNextBtnClick', onPlayNextBtnClick);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

_player2.default.install('playNext', playNext);

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var play = function play() {
  var player = this;

  function onPlayBtnClick() {
    if (!player.config.allowPlayAfterEnded && player.ended) {
      return;
    }
    if (player.paused) {
      var playPromise = player.play();
      if (playPromise !== undefined && playPromise) {
        playPromise.catch(function (err) {});
      }
    } else {
      player.pause();
    }
  }
  player.on('playBtnClick', onPlayBtnClick);

  function onDestroy() {
    player.off('playBtnClick', onPlayBtnClick);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

_player2.default.install('play', play);

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pip = function pip() {
  var player = this;
  var util = _player2.default.util;
  var root = player.root;
  function onPipBtnClick() {
    if (util.hasClass(root, 'xgplayer-pip-active')) {
      player.exitPIP();
    } else {
      player.getPIP();
    }
  }
  player.on('pipBtnClick', onPipBtnClick);

  function onDestroy() {
    player.off('pipBtnClick', onPipBtnClick);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

_player2.default.install('pip', pip);

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pc = function pc() {
  var player = this;
  var util = _player2.default.util;var controls = player.controls;var root = player.root;
  var clk = 0;var _click_ = void 0;

  player.onElementClick = function (e, element) {
    e.preventDefault();
    if (!this.config.closeVideoStopPropagation) {
      e.stopPropagation();
    }
    var player = this;
    if (!player.config.closeVideoClick) {
      clk++;
      if (_click_) {
        clearTimeout(_click_);
      }
      if (clk === 1) {
        _click_ = setTimeout(function () {
          if (util.hasClass(player.root, 'xgplayer-nostart')) {
            return false;
          } else if (!player.ended) {
            if (player.paused) {
              var playPromise = player.play();
              if (playPromise !== undefined && playPromise) {
                playPromise.catch(function (err) {});
              }
            } else {
              player.pause();
            }
          }
          clk = 0;
        }, 200);
      } else {
        clk = 0;
      }
    }
  };
  player.video.addEventListener('click', function (e) {
    player.onElementClick(e, player.video);
  }, false);

  player.onElementDblclick = function (e, element) {
    e.preventDefault();
    e.stopPropagation();
    var player = this;
    if (!player.config.closeVideoDblclick) {
      var fullscreen = controls.querySelector('.xgplayer-fullscreen');
      if (fullscreen) {
        var _clk = void 0;
        if (document.createEvent) {
          _clk = document.createEvent('Event');
          _clk.initEvent('click', true, true);
        } else {
          _clk = new Event('click');
        }
        fullscreen.dispatchEvent(_clk);
      }
    }
  };
  player.video.addEventListener('dblclick', function (e) {
    player.onElementDblclick(e, player.video);
  }, false);

  function onMouseEnter() {
    clearTimeout(player.leavePlayerTimer);
    player.emit('focus', player);
  }
  root.addEventListener('mouseenter', onMouseEnter);

  function onMouseLeave() {
    if (!player.config.closePlayerBlur) {
      player.leavePlayerTimer = setTimeout(function () {
        player.emit('blur', player);
      }, player.config.leavePlayerTime || 0);
    }
  }
  root.addEventListener('mouseleave', onMouseLeave);

  function onControlMouseEnter(e) {
    if (player.userTimer) {
      clearTimeout(player.userTimer);
    }
  }
  controls.addEventListener('mouseenter', onControlMouseEnter, false);

  function onControlMouseLeave(e) {
    if (!player.config.closeControlsBlur) {
      player.emit('focus', player);
    }
  }
  controls.addEventListener('mouseleave', onControlMouseLeave, false);

  function onReady(e) {
    if (player.config.autoplay) {
      player.start();
    }
  }
  player.once('ready', onReady);

  function onDestroy() {
    root.removeEventListener('mouseenter', onMouseEnter);
    root.removeEventListener('mouseleave', onMouseLeave);
    player.off('ready', onReady);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

_player2.default.install('pc', pc);

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mobile = function mobile() {
  var player = this;
  var util = _player2.default.util;var controls = player.controls;var root = player.root;

  player.onElementTouchend = function (e, element) {
    e.preventDefault();
    e.stopPropagation();
    var player = this;
    if (util.hasClass(root, 'xgplayer-inactive')) {
      player.emit('focus');
    } else {
      player.emit('blur');
    }
    if (!player.config.closeVideoTouch && !player.isTouchMove) {
      if (util.hasClass(player.root, 'xgplayer-nostart')) {
        return false;
      } else if (!player.ended) {
        if (player.paused) {
          var playPromise = player.play();
          if (playPromise !== undefined && playPromise) {
            playPromise.catch(function (err) {});
          }
        } else {
          player.pause();
        }
      }
    }
  };

  function onReady(e) {
    player.video.addEventListener('touchend', function (e) {
      player.onElementTouchend(e, player.video);
    });
    player.video.addEventListener('touchstart', function () {
      player.isTouchMove = false;
    });
    player.video.addEventListener('touchmove', function () {
      player.isTouchMove = true;
    });
    if (player.config.autoplay) {
      player.start();
    }
  }
  player.once('ready', onReady);

  function onDestroy() {
    player.off('ready', onReady);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

_player2.default.install('mobile', mobile);

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var memoryPlay = function memoryPlay() {
  var player = this;
  player.on('memoryPlayStart', function (lastPlayTime) {
    player.currentTime = lastPlayTime;
  });
};

_player2.default.install('memoryPlay', memoryPlay);

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localPreview = function localPreview() {
  var player = this;
  var root = player.root;
  function onUpload(upload) {
    player.uploadFile = upload.files[0];
    var url = URL.createObjectURL(player.uploadFile);
    if (_player2.default.util.hasClass(root, 'xgplayer-nostart')) {
      player.config.url = url;
      player.start();
    } else {
      player.src = url;
      var playPromise = player.play();
      if (playPromise !== undefined && playPromise) {
        playPromise.catch(function (err) {});
      }
    }
  }
  player.on('upload', onUpload);

  function onDestroy() {
    player.off('upload', onUpload);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

_player2.default.install('localPreview', localPreview);

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var i18n = function i18n() {
  var player = this;var lang = {};var util = player.constructor.util;
  lang.en = {
    HAVE_NOTHING: 'There is no information on whether audio/video is ready',
    HAVE_METADATA: 'Audio/video metadata is ready ',
    HAVE_CURRENT_DATA: 'Data about the current play location is available, but there is not enough data to play the next frame/millisecond',
    HAVE_FUTURE_DATA: 'Current and at least one frame of data is available',
    HAVE_ENOUGH_DATA: 'The available data is sufficient to start playing',
    NETWORK_EMPTY: 'Audio/video has not been initialized',
    NETWORK_IDLE: 'Audio/video is active and has been selected for resources, but no network is used',
    NETWORK_LOADING: 'The browser is downloading the data',
    NETWORK_NO_SOURCE: 'No audio/video source was found',
    MEDIA_ERR_ABORTED: 'The fetch process is aborted by the user',
    MEDIA_ERR_NETWORK: 'An error occurred while downloading',
    MEDIA_ERR_DECODE: 'An error occurred while decoding',
    MEDIA_ERR_SRC_NOT_SUPPORTED: 'Audio/video is not supported',
    REPLAY: 'Replay',
    ERROR: 'Network is offline',
    PLAY_TIPS: 'Play',
    PAUSE_TIPS: 'Pause',
    PLAYNEXT_TIPS: 'Play next',
    DOWNLOAD_TIPS: 'Download',
    ROTATE_TIPS: 'Rotate',
    RELOAD_TIPS: 'Reload',
    FULLSCREEN_TIPS: "Fullscreen",
    EXITFULLSCREEN_TIPS: 'Exit fullscreen',
    CSSFULLSCREEN_TIPS: 'Cssfullscreen',
    EXITCSSFULLSCREEN_TIPS: 'Exit cssfullscreen',
    TEXTTRACK: 'Caption',
    PIP: 'Pip',
    SCREENSHOT: 'Screenshot',
    LIVE: 'LIVE',
    OFF: 'Off',
    PIP_DRAG: 'Click and hold to drag'
  };
  lang['zh-cn'] = {
    HAVE_NOTHING: '没有关于音频/视频是否就绪的信息',
    HAVE_METADATA: '音频/视频的元数据已就绪',
    HAVE_CURRENT_DATA: '关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒',
    HAVE_FUTURE_DATA: '当前及至少下一帧的数据是可用的',
    HAVE_ENOUGH_DATA: '可用数据足以开始播放',
    NETWORK_EMPTY: '音频/视频尚未初始化',
    NETWORK_IDLE: '音频/视频是活动的且已选取资源，但并未使用网络',
    NETWORK_LOADING: '浏览器正在下载数据',
    NETWORK_NO_SOURCE: '未找到音频/视频来源',
    MEDIA_ERR_ABORTED: '取回过程被用户中止',
    MEDIA_ERR_NETWORK: '当下载时发生错误',
    MEDIA_ERR_DECODE: '当解码时发生错误',
    MEDIA_ERR_SRC_NOT_SUPPORTED: '不支持的音频/视频格式',
    REPLAY: '重播',
    ERROR: '网络连接似乎出现了问题',
    PLAY_TIPS: '播放',
    PAUSE_TIPS: '暂停',
    PLAYNEXT_TIPS: '下一集',
    DOWNLOAD_TIPS: '下载',
    ROTATE_TIPS: '旋转',
    RELOAD_TIPS: '重新载入',
    FULLSCREEN_TIPS: "进入全屏",
    EXITFULLSCREEN_TIPS: '退出全屏',
    CSSFULLSCREEN_TIPS: '进入样式全屏',
    EXITCSSFULLSCREEN_TIPS: '退出样式全屏',
    TEXTTRACK: '字幕',
    PIP: '画中画',
    SCREENSHOT: '截图',
    LIVE: '正在直播',
    OFF: '关闭',
    PIP_DRAG: '点击按住可拖动视频'
  };
  lang['zh-hk'] = {
    HAVE_NOTHING: '沒有關於音頻/視頻是否就緒的信息',
    HAVE_METADATA: '音頻/視頻的元數據已就緒',
    HAVE_CURRENT_DATA: '關於當前播放位置的數據是可用的，但沒有足夠的數據來播放下壹幀/毫秒',
    HAVE_FUTURE_DATA: '當前及至少下壹幀的數據是可用的',
    HAVE_ENOUGH_DATA: '可用數據足以開始播放',
    NETWORK_EMPTY: '音頻/視頻尚未初始化',
    NETWORK_IDLE: '音頻/視頻是活動的且已選取資源，但並未使用網絡',
    NETWORK_LOADING: '瀏覽器正在下載數據',
    NETWORK_NO_SOURCE: '未找到音頻/視頻來源',
    MEDIA_ERR_ABORTED: '取回過程被用戶中止',
    MEDIA_ERR_NETWORK: '當下載時發生錯誤',
    MEDIA_ERR_DECODE: '當解碼時發生錯誤',
    MEDIA_ERR_SRC_NOT_SUPPORTED: '不支持的音頻/視頻格式',
    REPLAY: '重播',
    ERROR: '網絡連接似乎出現了問題',
    PLAY_TIPS: '播放',
    PAUSE_TIPS: '暫停',
    PLAYNEXT_TIPS: '下壹集',
    DOWNLOAD_TIPS: '下載',
    ROTATE_TIPS: '旋轉',
    RELOAD_TIPS: '重新載入',
    FULLSCREEN_TIPS: "進入全屏",
    EXITFULLSCREEN_TIPS: '退出全屏',
    CSSFULLSCREEN_TIPS: '進入樣式全屏',
    EXITCSSFULLSCREEN_TIPS: '退出樣式全屏',
    TEXTTRACK: '字幕',
    PIP: '畫中畫',
    SCREENSHOT: '截圖',
    LIVE: '正在直播',
    OFF: '關閉',
    PIP_DRAG: '點擊按住可拖動視頻'
  };
  lang['jp'] = {
    HAVE_NOTHING: 'オーディオ/ビデオが準備できているか情報がありません',
    HAVE_METADATA: 'オーディオ/ビデオのメタデータは準備できています',
    HAVE_CURRENT_DATA: '現在の再生位置に関するデータは利用可能ですが、次のフレーム/ミリ秒を再生するのに十分なデータがありません',
    HAVE_FUTURE_DATA: '現在、少なくとも次のフレームのデータが利用可能です',
    HAVE_ENOUGH_DATA: '利用可能なデータは再生を開始するのに十分です',
    NETWORK_EMPTY: 'オーディオ/ビデオが初期化されていません',
    NETWORK_IDLE: 'オーディオ/ビデオはアクティブでリソースが選択されていますが、ネットワークが使用されていません',
    NETWORK_LOADING: 'ブラウザーはデータをダウンロードしています',
    NETWORK_NO_SOURCE: 'オーディオ/ビデオ のソースが見つかりません',
    MEDIA_ERR_ABORTED: 'ユーザーによってフェッチプロセスが中止されました',
    MEDIA_ERR_NETWORK: 'ダウンロード中にエラーが発生しました',
    MEDIA_ERR_DECODE: 'デコード中にエラーが発生しました',
    MEDIA_ERR_SRC_NOT_SUPPORTED: 'オーディオ/ビデオ の形式がサポートされていません',
    REPLAY: 'リプレイ',
    ERROR: 'ネットワークの接続に問題が発生しました',
    PLAY_TIPS: 'プレイ',
    PAUSE_TIPS: '一時停止',
    PLAYNEXT_TIPS: '次をプレイ',
    DOWNLOAD_TIPS: 'ダウンロード',
    ROTATE_TIPS: '回転',
    RELOAD_TIPS: '再読み込み',
    FULLSCREEN_TIPS: "フルスクリーン",
    EXITFULLSCREEN_TIPS: 'フルスクリーンを終了',
    CSSFULLSCREEN_TIPS: 'シアターモード',
    EXITCSSFULLSCREEN_TIPS: 'シアターモードを終了',
    TEXTTRACK: '字幕',
    PIP: 'ミニプレーヤー',
    SCREENSHOT: 'スクリーンショット',
    LIVE: '生放送',
    OFF: 'オフ',
    PIP_DRAG: 'ボタンを押して働画をドラッグする'
  };

  Object.defineProperty(player, 'lang', {
    get: function get() {
      if (player.config) {
        return lang[player.config.lang] || lang['en'];
      } else {
        return lang['en'];
      }
    },
    set: function set(value) {
      if (util.typeOf(value) === 'Object') {
        Object.keys(value).forEach(function (key) {
          lang[key] = value[key];
        });
      }
    }
  });
};

_player2.default.install('i18n', i18n);

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fullscreen = function fullscreen() {
  var player = this;
  var root = player.root;
  var util = _player2.default.util;

  function onFullscreenBtnClick() {
    if (player.config.rotateFullscreen) {
      if (util.hasClass(root, 'xgplayer-rotate-fullscreen')) {
        player.exitRotateFullscreen();
      } else {
        player.getRotateFullscreen();
      }
    } else {
      if (util.hasClass(root, 'xgplayer-is-fullscreen')) {
        player.exitFullscreen(root);
      } else {
        player.getFullscreen(root);
      }
    }
  }
  player.on('fullscreenBtnClick', onFullscreenBtnClick);

  function onFullscreenChange() {
    var fullscreenEl = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    if (fullscreenEl && fullscreenEl === root) {
      util.addClass(root, 'xgplayer-is-fullscreen');
      player.emit('requestFullscreen');
    } else if (util.hasClass(root, 'xgplayer-is-fullscreen')) {
      util.removeClass(root, 'xgplayer-is-fullscreen');
      player.emit('exitFullscreen');
    }
    if (player.danmu && typeof player.danmu.resize === 'function') {
      player.danmu.resize();
    }
  };
  ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(function (item) {
    document.addEventListener(item, onFullscreenChange);
  });

  function onDestroy() {
    player.off('fullscreenBtnClick', onFullscreenBtnClick);
    ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(function (item) {
      document.removeEventListener(item, onFullscreenChange);
    });
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

_player2.default.install('fullscreen', fullscreen);

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Error retry plugin
 * get config from player.config.errorConfig
 * The Plugin is just deal with the situation that play with video.src,
 * and get the http status of current video.src
 */

var defaultConfig = {
  maxCount: 3, // max number of retries
  backupUrl: '', // the backup url for retry
  isFetch: true, //  is need to check the cdn url statud
  fetchTimeout: 100 // timeout time for get cdn status
};

function errorRetry() {
  var _this = this;

  var player = this;
  // 无设置参数或者是通过扩展播放的不做处理
  if (!player.config.errorConfig || player.src.indexOf('blob:') > -1) {
    return;
  }
  var errorConfig = {};
  var _inConfig = player.config.errorConfig;
  for (var key in defaultConfig) {
    if (_inConfig[key] === undefined) {
      errorConfig[key] = defaultConfig[key];
    } else {
      errorConfig[key] = _inConfig[key];
    }
  }
  player.retryData = {
    count: 0, // 重试次数
    errfTimer: null, // 超时设置定时器
    isFetchReturn: false, // fetch请求是否已经返回
    currentTime: 0 // 出错的时候时间
  };

  function errorfetch(player, url, timeout) {
    var resolveFun = function resolveFun(resolve, data) {
      if (!player.retryData.isFetchReturn) {
        player.retryData.isFetchReturn = true;
        resolve(data);
      }
    };
    return new Promise(function (resolve, reject) {
      try {
        var xhr = new window.XMLHttpRequest();
        xhr.open('get', url);
        xhr.onload = function () {
          resolveFun(resolve, { status: xhr.status, statusText: xhr.statusText, xhr: xhr });
        };
        xhr.onerror = function () {
          resolveFun(resolve, { status: xhr.status, statusText: xhr.statusText || 'The network environment is disconnected or the address is invalid', xhr: xhr });
        };
        xhr.onabort = function () {
          // console.log('task onerror', xhr)
        };
        player.retryData.errfTimer = window.setTimeout(function () {
          var errfTimer = player.retryData.errfTimer;
          window.clearTimeout(errfTimer);
          player.retryData.errfTimer = null;
          resolveFun(resolve, { status: -1, statusText: 'request timeout' });
        }, timeout);
        xhr.send();
      } catch (err) {
        player.retryData.isFetchReturn = true;
        resolveFun(resolve, { status: -2, statusText: 'request error' });
      }
    });
  }

  function retryCanPlay() {
    // console.log(`retryCanPlay this.retryData.currentTime:${this.retryData.currentTime}`)
    this.currentTime = this.retryData.currentTime;
    this.play();
    this.retryData.retryCode = 0;
    this.retryData.isFetchReturn = false;
    this.retryData.currentTime = 0;
  }

  var _originErrorEmit = player._onError;
  player._onError = function (data) {
    var errorCount = _this.retryData.count;
    // console.log(`originErrorEmit:errorCount:${errorCount}`, data)
    if (errorCount > errorConfig.maxCount) {
      if (errorConfig.isFetch) {
        errorfetch(_this, _this.currentSrc, errorConfig.fetchTimeout).then(function (data) {
          _this.emit('error', new _player2.default.Errors({
            type: 'network',
            currentTime: _this.currentTime,
            duration: _this.duration || 0,
            networkState: _this.networkState,
            readyState: _this.readyState,
            currentSrc: _this.currentSrc,
            src: _this.src,
            ended: _this.ended,
            httpCode: data.status,
            httpMsg: data.statusText,
            errd: {
              line: 101,
              msg: _this.error,
              handle: 'plugin errorRetry'
            },
            errorCode: _this.video && _this.video.error.code,
            mediaError: _this.video && _this.video.error
          }));
          _originErrorEmit.call(_this, data);
        });
      } else {
        _originErrorEmit.call(_this, data);
      }
      return;
    }
    if (errorCount === 0) {
      _this.retryData.currentTime = _this.currentTime;
      _this.once('canplay', retryCanPlay.bind(_this));
    }
    var src = '';
    if (errorConfig.count < 2) {
      src = errorConfig.backupUrl ? errorConfig.backupUrl : player.currentSrc;
    } else {
      src = errorConfig.backupUrl && errorCount > 1 ? errorConfig.backupUrl : player.currentSrc;
    }
    _this.retryData.count++;
    _this.src = src;
  };
}

_player2.default.install('errorretry', errorRetry);

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var download = function download() {
  var player = this;

  function onDownloadBtnClick() {
    // must pass an absolute url for download
    player.download();
  }
  player.on('downloadBtnClick', onDownloadBtnClick);

  function onDestroy() {
    player.off('downloadBtnClick', onDownloadBtnClick);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

_player2.default.install('download', download);

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = function definition() {
  var player = this;
  var root = player.root;

  function onDestroy() {
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

_player2.default.install('definition', definition);

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var danmu = function danmu() {
  var player = this;
  var root = player.root;
  var util = _player2.default.util;

  function onInitDanmu(danmujs) {
    var container = player.root.querySelector('xg-danmu');
    util.addClass(container, 'xgplayer-has-danmu');
    if (!player.config.danmu.closeDefaultBtn) {
      var onTimeupdate = function onTimeupdate() {
        danmujs.start();
      };

      var onPause = function onPause() {
        if (util.hasClass(player.danmuBtn, 'danmu-switch-active')) {
          danmujs.pause();
        }
      };

      var onPlay = function onPlay() {
        if (util.hasClass(player.danmuBtn, 'danmu-switch-active')) {
          danmujs.play();
        }
      };

      var onSeeked = function onSeeked() {
        if (util.hasClass(player.danmuBtn, 'danmu-switch-active')) {
          danmujs.stop();
          danmujs.start();
        }
      };

      var onDestroy = function onDestroy() {
        player.off('timeupdate', onTimeupdate);
        player.off('pause', onPause);
        player.off('play', onPlay);
        player.off('seeked', onSeeked);
        player.off('destroy', onDestroy);
      };

      player.danmuBtn = util.copyDom(danmujs.bulletBtn.createSwitch(true));
      player.controls.appendChild(player.danmuBtn);

      ['click', 'touchend'].forEach(function (item) {
        player.danmuBtn.addEventListener(item, function (e) {
          e.preventDefault();
          e.stopPropagation();
          util.toggleClass(player.danmuBtn, 'danmu-switch-active');
          if (util.hasClass(player.danmuBtn, 'danmu-switch-active')) {
            player.emit('danmuBtnOn');
            util.addClass(container, 'xgplayer-has-danmu');
            player.once('timeupdate', onTimeupdate);
          } else {
            player.emit('danmuBtnOff');
            util.removeClass(container, 'xgplayer-has-danmu');
            danmujs.stop();
          }
        });
      });

      player.onElementClick && container.addEventListener('click', function (e) {
        player.onElementClick(e, container);
      }, false);
      player.onElementDblclick && container.addEventListener('dblclick', function (e) {
        player.onElementDblclick(e, container);
      }, false);

      player.on('pause', onPause);

      player.on('play', onPlay);

      player.on('seeked', onSeeked);

      player.once('destroy', onDestroy);
    }
  }
  player.on('initDefaultDanmu', onInitDanmu);
};

_player2.default.install('danmu', danmu);

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cssFullscreen = function cssFullscreen() {
  var player = this;
  var root = player.root;
  var util = _player2.default.util;

  function onCssFullscreenBtnClick() {
    if (util.hasClass(root, 'xgplayer-is-cssfullscreen')) {
      player.exitCssFullscreen();
    } else {
      player.getCssFullscreen();
    }
  }
  player.on('cssFullscreenBtnClick', onCssFullscreenBtnClick);
  player.on('exitFullscreen', function () {
    util.removeClass(root, 'xgplayer-is-cssfullscreen');
  });

  function onDestroy() {
    player.off('cssFullscreenBtnClick', onCssFullscreenBtnClick);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

_player2.default.install('cssFullscreen', cssFullscreen);

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(58);

__webpack_require__(63);

__webpack_require__(64);

__webpack_require__(67);

__webpack_require__(70);

__webpack_require__(71);

__webpack_require__(72);

__webpack_require__(75);

__webpack_require__(78);

__webpack_require__(82);

__webpack_require__(83);

__webpack_require__(85);

__webpack_require__(86);

__webpack_require__(87);

__webpack_require__(89);

__webpack_require__(90);

__webpack_require__(91);

__webpack_require__(93);

__webpack_require__(97);

__webpack_require__(98);

__webpack_require__(100);

__webpack_require__(102);

__webpack_require__(104);

__webpack_require__(105);

__webpack_require__(106);

__webpack_require__(107);

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(59);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(61)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(60)(false);
// imports


// module
exports.push([module.i, ".xgplayer-skin-default{background:#000;width:100%;height:100%;position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;-ms-user-select:none}.xgplayer-skin-default *{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}.xgplayer-skin-default.xgplayer-rotate-fullscreen{position:absolute;top:0;left:100%;bottom:0;right:0;height:100vw!important;width:100vh!important;-webkit-transform-origin:top left;-ms-transform-origin:top left;transform-origin:top left;-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}.xgplayer-skin-default.xgplayer-is-fullscreen{width:100%!important;height:100%!important;padding-top:0!important;z-index:9999}.xgplayer-skin-default.xgplayer-is-fullscreen.xgplayer-inactive{cursor:none}.xgplayer-skin-default video{width:100%;height:100%;outline:none}.xgplayer-skin-default .xgplayer-none{display:none}@-webkit-keyframes loadingRotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes loadingRotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@-webkit-keyframes loadingDashOffset{0%{stroke-dashoffset:236}to{stroke-dashoffset:0}}@keyframes loadingDashOffset{0%{stroke-dashoffset:236}to{stroke-dashoffset:0}}.xgplayer-skin-default .xgplayer-play,.xgplayer-skin-default .xgplayer-play-img{width:40px;position:relative;-webkit-order:0;-moz-box-ordinal-group:1;order:0;display:block;cursor:pointer;margin-left:3px}.xgplayer-skin-default .xgplayer-play-img .xgplayer-icon,.xgplayer-skin-default .xgplayer-play .xgplayer-icon{margin-top:3px;width:32px}.xgplayer-skin-default .xgplayer-play-img .xgplayer-icon div,.xgplayer-skin-default .xgplayer-play .xgplayer-icon div{position:absolute}.xgplayer-skin-default .xgplayer-play-img .xgplayer-icon .xgplayer-icon-play,.xgplayer-skin-default .xgplayer-play .xgplayer-icon .xgplayer-icon-play{display:block}.xgplayer-skin-default .xgplayer-play-img .xgplayer-icon .xgplayer-icon-pause,.xgplayer-skin-default .xgplayer-play .xgplayer-icon .xgplayer-icon-pause{display:none}.xgplayer-skin-default .xgplayer-play-img .xgplayer-tips .xgplayer-tip-play,.xgplayer-skin-default .xgplayer-play .xgplayer-tips .xgplayer-tip-play{display:block}.xgplayer-skin-default .xgplayer-play-img .xgplayer-tips .xgplayer-tip-pause,.xgplayer-skin-default .xgplayer-play .xgplayer-tips .xgplayer-tip-pause{display:none}.xgplayer-skin-default .xgplayer-play-img:hover,.xgplayer-skin-default .xgplayer-play:hover{opacity:.85}.xgplayer-skin-default .xgplayer-play-img:hover .xgplayer-tips,.xgplayer-skin-default .xgplayer-play:hover .xgplayer-tips{display:block}.xgplayer-skin-default.xgplayer-playing .xgplayer-play-img .xgplayer-icon .xgplayer-icon-play,.xgplayer-skin-default.xgplayer-playing .xgplayer-play .xgplayer-icon .xgplayer-icon-play{display:none}.xgplayer-skin-default.xgplayer-playing .xgplayer-play-img .xgplayer-icon .xgplayer-icon-pause,.xgplayer-skin-default.xgplayer-playing .xgplayer-play .xgplayer-icon .xgplayer-icon-pause{display:block}.xgplayer-skin-default.xgplayer-playing .xgplayer-play-img .xgplayer-tips .xgplayer-tip-play,.xgplayer-skin-default.xgplayer-playing .xgplayer-play .xgplayer-tips .xgplayer-tip-play{display:none}.xgplayer-skin-default.xgplayer-pause .xgplayer-play-img .xgplayer-icon .xgplayer-icon-play,.xgplayer-skin-default.xgplayer-pause .xgplayer-play .xgplayer-icon .xgplayer-icon-play,.xgplayer-skin-default.xgplayer-playing .xgplayer-play-img .xgplayer-tips .xgplayer-tip-pause,.xgplayer-skin-default.xgplayer-playing .xgplayer-play .xgplayer-tips .xgplayer-tip-pause{display:block}.xgplayer-skin-default.xgplayer-pause .xgplayer-play-img .xgplayer-icon .xgplayer-icon-pause,.xgplayer-skin-default.xgplayer-pause .xgplayer-play .xgplayer-icon .xgplayer-icon-pause{display:none}.xgplayer-skin-default.xgplayer-pause .xgplayer-play-img .xgplayer-tips .xgplayer-tip-play,.xgplayer-skin-default.xgplayer-pause .xgplayer-play .xgplayer-tips .xgplayer-tip-play{display:block}.xgplayer-skin-default.xgplayer-pause .xgplayer-play-img .xgplayer-tips .xgplayer-tip-pause,.xgplayer-skin-default.xgplayer-pause .xgplayer-play .xgplayer-tips .xgplayer-tip-pause{display:none}.xgplayer-skin-default .xgplayer-start{border-radius:50%;display:inline-block;width:70px;height:70px;background:rgba(0,0,0,.38);overflow:hidden;text-align:center;line-height:70px;vertical-align:middle;position:absolute;left:50%;top:50%;z-index:115;margin:-35px auto auto -35px;cursor:pointer}.xgplayer-skin-default .xgplayer-start div{position:absolute}.xgplayer-skin-default .xgplayer-start div svg{fill:hsla(0,0%,100%,.7)}.xgplayer-skin-default .xgplayer-start .xgplayer-icon-play{display:block}.xgplayer-skin-default .xgplayer-start .xgplayer-icon-pause{display:none}.xgplayer-skin-default .xgplayer-start:hover{opacity:.85}.xgplayer-skin-default.xgplayer-playing .xgplayer-start,.xgplayer-skin-default.xgplayer-playing .xgplayer-start .xgplayer-icon-play{display:none}.xgplayer-skin-default.xgplayer-playing .xgplayer-start .xgplayer-icon-pause{display:block}.xgplayer-skin-default.xgplayer-pause .xgplayer-start{display:inline-block}.xgplayer-skin-default.xgplayer-pause .xgplayer-start .xgplayer-icon-play{display:block}.xgplayer-skin-default.replay .xgplayer-start,.xgplayer-skin-default.xgplayer-pause .xgplayer-start .xgplayer-icon-pause{display:none}.xgplayer-skin-default.replay .xgplayer-start .xgplayer-icon-play{display:block}.xgplayer-skin-default.replay .xgplayer-start .xgplayer-icon-pause{display:none}.xgplayer-skin-default .xgplayer-enter{display:none;position:absolute;left:0;top:0;width:100%;height:100%;background:#000;z-index:120}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner{display:block;position:absolute;left:50%;top:50%;height:100px;width:100px;position:relative;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div{width:12%;height:26%;background-color:hsla(0,0%,100%,.7);position:absolute;left:44%;top:37%;opacity:0;border-radius:30px;-webkit-animation:fade 1s linear infinite;animation:fade 1s linear infinite}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar1{-webkit-transform:rotate(0deg) translateY(-142%);-ms-transform:rotate(0deg) translateY(-142%);transform:rotate(0deg) translateY(-142%);-webkit-animation-delay:0s;animation-delay:0s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar2{-webkit-transform:rotate(30deg) translateY(-142%);-ms-transform:rotate(30deg) translateY(-142%);transform:rotate(30deg) translateY(-142%);-webkit-animation-delay:-.9163s;animation-delay:-.9163s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar3{-webkit-transform:rotate(60deg) translateY(-142%);-ms-transform:rotate(60deg) translateY(-142%);transform:rotate(60deg) translateY(-142%);-webkit-animation-delay:-.833s;animation-delay:-.833s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar4{-webkit-transform:rotate(90deg) translateY(-142%);-ms-transform:rotate(90deg) translateY(-142%);transform:rotate(90deg) translateY(-142%);-webkit-animation-delay:-.7497s;animation-delay:-.7497s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar5{-webkit-transform:rotate(120deg) translateY(-142%);-ms-transform:rotate(120deg) translateY(-142%);transform:rotate(120deg) translateY(-142%);-webkit-animation-delay:-.6664s;animation-delay:-.6664s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar6{-webkit-transform:rotate(150deg) translateY(-142%);-ms-transform:rotate(150deg) translateY(-142%);transform:rotate(150deg) translateY(-142%);-webkit-animation-delay:-.5831s;animation-delay:-.5831s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar7{-webkit-transform:rotate(180deg) translateY(-142%);-ms-transform:rotate(180deg) translateY(-142%);transform:rotate(180deg) translateY(-142%);-webkit-animation-delay:-.4998s;animation-delay:-.4998s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar8{-webkit-transform:rotate(210deg) translateY(-142%);-ms-transform:rotate(210deg) translateY(-142%);transform:rotate(210deg) translateY(-142%);-webkit-animation-delay:-.4165s;animation-delay:-.4165s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar9{-webkit-transform:rotate(240deg) translateY(-142%);-ms-transform:rotate(240deg) translateY(-142%);transform:rotate(240deg) translateY(-142%);-webkit-animation-delay:-.3332s;animation-delay:-.3332s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar10{-webkit-transform:rotate(270deg) translateY(-142%);-ms-transform:rotate(270deg) translateY(-142%);transform:rotate(270deg) translateY(-142%);-webkit-animation-delay:-.2499s;animation-delay:-.2499s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar11{-webkit-transform:rotate(300deg) translateY(-142%);-ms-transform:rotate(300deg) translateY(-142%);transform:rotate(300deg) translateY(-142%);-webkit-animation-delay:-.1666s;animation-delay:-.1666s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar12{-webkit-transform:rotate(330deg) translateY(-142%);-ms-transform:rotate(330deg) translateY(-142%);transform:rotate(330deg) translateY(-142%);-webkit-animation-delay:-.0833s;animation-delay:-.0833s}@-webkit-keyframes fade{0%{opacity:1}to{opacity:.25}}@keyframes fade{0%{opacity:1}to{opacity:.25}}.xgplayer-skin-default.xgplayer-is-enter .xgplayer-enter{display:block}.xgplayer-skin-default .xgplayer-poster{display:none;position:absolute;left:0;top:0;width:100%;height:100%;z-index:100;background-size:cover;background-position:50%}.xgplayer-skin-default.xgplayer-nostart .xgplayer-poster{display:block}.xgplayer-skin-default .xgplayer-placeholder{-webkit-flex:1;-moz-box-flex:1;flex:1;-webkit-order:3;-moz-box-ordinal-group:4;order:3;display:block}.xgplayer-skin-default .xgplayer-fullscreen,.xgplayer-skin-default .xgplayer-fullscreen-img{position:relative;-webkit-order:13;-moz-box-ordinal-group:14;order:13;display:block;cursor:pointer;margin-left:5px;margin-right:3px}.xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-icon,.xgplayer-skin-default .xgplayer-fullscreen .xgplayer-icon{margin-top:3px}.xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-icon div,.xgplayer-skin-default .xgplayer-fullscreen .xgplayer-icon div{position:absolute}.xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-icon .xgplayer-icon-requestfull,.xgplayer-skin-default .xgplayer-fullscreen .xgplayer-icon .xgplayer-icon-requestfull{display:block}.xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-icon .xgplayer-icon-exitfull,.xgplayer-skin-default .xgplayer-fullscreen .xgplayer-icon .xgplayer-icon-exitfull{display:none}.xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-tips,.xgplayer-skin-default .xgplayer-fullscreen .xgplayer-tips{position:absolute;right:0;left:auto}.xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-tips .xgplayer-tip-requestfull,.xgplayer-skin-default .xgplayer-fullscreen .xgplayer-tips .xgplayer-tip-requestfull{display:block}.xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-tips .xgplayer-tip-exitfull,.xgplayer-skin-default .xgplayer-fullscreen .xgplayer-tips .xgplayer-tip-exitfull{display:none}.xgplayer-skin-default .xgplayer-fullscreen-img:hover,.xgplayer-skin-default .xgplayer-fullscreen:hover{opacity:.85}.xgplayer-skin-default .xgplayer-fullscreen-img:hover .xgplayer-tips,.xgplayer-skin-default .xgplayer-fullscreen:hover .xgplayer-tips{display:block}.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen-img .xgplayer-icon .xgplayer-icon-requestfull,.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen .xgplayer-icon .xgplayer-icon-requestfull,.xgplayer-skin-default.xgplayer-rotate-fullscreen .xgplayer-fullscreen-img .xgplayer-icon .xgplayer-icon-requestfull,.xgplayer-skin-default.xgplayer-rotate-fullscreen .xgplayer-fullscreen .xgplayer-icon .xgplayer-icon-requestfull{display:none}.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen-img .xgplayer-icon .xgplayer-icon-exitfull,.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen .xgplayer-icon .xgplayer-icon-exitfull,.xgplayer-skin-default.xgplayer-rotate-fullscreen .xgplayer-fullscreen-img .xgplayer-icon .xgplayer-icon-exitfull,.xgplayer-skin-default.xgplayer-rotate-fullscreen .xgplayer-fullscreen .xgplayer-icon .xgplayer-icon-exitfull{display:block}.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen-img .xgplayer-tips .xgplayer-tip-requestfull,.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen .xgplayer-tips .xgplayer-tip-requestfull,.xgplayer-skin-default.xgplayer-rotate-fullscreen .xgplayer-fullscreen-img .xgplayer-tips .xgplayer-tip-requestfull,.xgplayer-skin-default.xgplayer-rotate-fullscreen .xgplayer-fullscreen .xgplayer-tips .xgplayer-tip-requestfull{display:none}.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen-img .xgplayer-tips .xgplayer-tip-exitfull,.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen .xgplayer-tips .xgplayer-tip-exitfull,.xgplayer-skin-default.xgplayer-rotate-fullscreen .xgplayer-fullscreen-img .xgplayer-tips .xgplayer-tip-exitfull,.xgplayer-skin-default.xgplayer-rotate-fullscreen .xgplayer-fullscreen .xgplayer-tips .xgplayer-tip-exitfull{display:block}.xgplayer-skin-default .xgplayer-cssfullscreen,.xgplayer-skin-default .xgplayer-cssfullscreen-img{position:relative;-webkit-order:12;-moz-box-ordinal-group:13;order:12;display:block;cursor:pointer}.xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-icon,.xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-icon{width:32px;margin-top:5px}.xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-icon div,.xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-icon div{position:absolute}.xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-icon .xgplayer-icon-requestfull,.xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-icon .xgplayer-icon-requestfull{display:block}.xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-icon .xgplayer-icon-exitfull,.xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-icon .xgplayer-icon-exitfull{display:none}.xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-tips,.xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-tips{margin-left:-40px}.xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-tips .xgplayer-tip-requestfull,.xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-tips .xgplayer-tip-requestfull{display:block}.xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-tips .xgplayer-tip-exitfull,.xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-tips .xgplayer-tip-exitfull{display:none}.xgplayer-skin-default .xgplayer-cssfullscreen-img:hover,.xgplayer-skin-default .xgplayer-cssfullscreen:hover{opacity:.85}.xgplayer-skin-default .xgplayer-cssfullscreen-img:hover .xgplayer-tips,.xgplayer-skin-default .xgplayer-cssfullscreen:hover .xgplayer-tips{display:block}.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-icon .xgplayer-icon-requestfull,.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-icon .xgplayer-icon-requestfull{display:none}.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-icon .xgplayer-icon-exitfull,.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-icon .xgplayer-icon-exitfull{display:block}.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-tips,.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-tips{margin-left:-47px}.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-tips .xgplayer-tip-requestfull,.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-tips .xgplayer-tip-requestfull{display:none}.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-tips .xgplayer-tip-exitfull,.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-tips .xgplayer-tip-exitfull{display:block}.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-cssfullscreen,.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-cssfullscreen-img{display:none}.xgplayer-skin-default.xgplayer-is-cssfullscreen{position:fixed!important;left:0!important;top:0!important;width:100%!important;height:100%!important;z-index:99999!important}.lang-is-en .xgplayer-cssfullscreen-img .xgplayer-tips,.lang-is-en .xgplayer-cssfullscreen .xgplayer-tips,.lang-is-en.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-tips,.lang-is-en.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-tips{margin-left:-46px}.lang-is-jp .xgplayer-cssfullscreen-img .xgplayer-tips,.lang-is-jp .xgplayer-cssfullscreen .xgplayer-tips{margin-left:-120px}.lang-is-jp.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-tips,.lang-is-jp.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-tips{margin-left:-60px}.xgplayer-skin-default .xgplayer-volume{outline:none;-webkit-order:4;-moz-box-ordinal-group:5;order:4;width:40px;height:40px;display:block;position:relative;z-index:18}.xgplayer-skin-default .xgplayer-volume .xgplayer-icon{margin-top:8px;cursor:pointer;position:absolute;bottom:-9px}.xgplayer-skin-default .xgplayer-volume .xgplayer-icon div{position:absolute}.xgplayer-skin-default .xgplayer-volume .xgplayer-icon .xgplayer-icon-large{display:block}.xgplayer-skin-default .xgplayer-volume .xgplayer-icon .xgplayer-icon-muted,.xgplayer-skin-default .xgplayer-volume .xgplayer-icon .xgplayer-icon-small{display:none}.xgplayer-skin-default .xgplayer-slider{display:none;position:absolute;width:28px;height:92px;background:rgba(0,0,0,.54);border-radius:1px;bottom:42px;outline:none}.xgplayer-skin-default .xgplayer-slider:after{content:\" \";display:block;height:15px;width:28px;position:absolute;bottom:-15px;left:0;z-index:20}.xgplayer-skin-default .xgplayer-bar,.xgplayer-skin-default .xgplayer-drag{display:block;position:absolute;bottom:6px;left:12px;background:hsla(0,0%,100%,.3);border-radius:100px;width:4px;height:76px;outline:none;cursor:pointer}.xgplayer-skin-default .xgplayer-drag{bottom:0;left:0;background:#fa1f41;max-height:76px}.xgplayer-skin-default .xgplayer-drag:after{content:\" \";display:inline-block;width:8px;height:8px;background:#fff;box-shadow:0 0 5px 0 rgba(0,0,0,.26);position:absolute;border-radius:50%;left:-2px;top:-6px}.xgplayer-skin-default.xgplayer-volume-active .xgplayer-slider,.xgplayer-skin-default.xgplayer-volume-large .xgplayer-volume .xgplayer-icon .xgplayer-icon-large{display:block}.xgplayer-skin-default.xgplayer-volume-large .xgplayer-volume .xgplayer-icon .xgplayer-icon-muted,.xgplayer-skin-default.xgplayer-volume-large .xgplayer-volume .xgplayer-icon .xgplayer-icon-small,.xgplayer-skin-default.xgplayer-volume-small .xgplayer-volume .xgplayer-icon .xgplayer-icon-large{display:none}.xgplayer-skin-default.xgplayer-volume-small .xgplayer-volume .xgplayer-icon .xgplayer-icon-small{display:block}.xgplayer-skin-default.xgplayer-volume-muted .xgplayer-volume .xgplayer-icon .xgplayer-icon-large,.xgplayer-skin-default.xgplayer-volume-muted .xgplayer-volume .xgplayer-icon .xgplayer-icon-small,.xgplayer-skin-default.xgplayer-volume-small .xgplayer-volume .xgplayer-icon .xgplayer-icon-muted{display:none}.xgplayer-skin-default.xgplayer-volume-muted .xgplayer-volume .xgplayer-icon .xgplayer-icon-muted{display:block}.xgplayer-skin-default.xgplayer-mobile .xgplayer-volume .xgplayer-slider{display:none}.xgplayer-skin-default .xgplayer-definition{-webkit-order:5;-moz-box-ordinal-group:6;order:5;width:60px;height:42px;z-index:18;position:relative;outline:none;display:none;cursor:default;margin-left:10px;margin-top:-7px}.xgplayer-skin-default .xgplayer-definition ul{display:none;list-style:none;width:78px;background:rgba(0,0,0,.54);border-radius:1px;position:absolute;bottom:42px;left:0;text-align:center;white-space:nowrap;margin-left:-10px;z-index:26;cursor:pointer}.xgplayer-skin-default .xgplayer-definition ul li{opacity:.7;font-family:PingFangSC-Regular;font-size:11px;color:hsla(0,0%,100%,.8);padding:6px 13px}.xgplayer-skin-default .xgplayer-definition ul li.selected,.xgplayer-skin-default .xgplayer-definition ul li:hover{color:#fff;opacity:1}.xgplayer-skin-default .xgplayer-definition .name{text-align:center;font-family:PingFangSC-Regular;font-size:13px;cursor:pointer;color:hsla(0,0%,100%,.8);position:absolute;bottom:5px;width:60px;height:20px;line-height:20px;background:rgba(0,0,0,.38);border-radius:10px;display:inline-block;vertical-align:middle}.xgplayer-skin-default.xgplayer-definition-active .xgplayer-definition ul,.xgplayer-skin-default.xgplayer-is-definition .xgplayer-definition{display:block}.xgplayer-skin-default .xgplayer-time{-webkit-order:2;-moz-box-ordinal-group:3;order:2;font-family:ArialMT;font-size:13px;color:#fff;line-height:40px;height:40px;text-align:center;display:inline-block;margin:auto 8px}.xgplayer-skin-default .xgplayer-time span{color:hsla(0,0%,100%,.5)}.xgplayer-skin-default .xgplayer-time .xgplayer-time-current{color:#fff}.xgplayer-skin-default .xgplayer-time .xgplayer-time-current:after{content:\"/\";display:inline-block;padding:0 3px}.xgplayer-skin-default .xgplayer-controls{display:-webkit-flex;display:-moz-box;display:flex;position:absolute;bottom:0;left:0;right:0;height:40px;background-image:linear-gradient(180deg,transparent,rgba(0,0,0,.37),rgba(0,0,0,.75),rgba(0,0,0,.75));z-index:10}.xgplayer-skin-default.no-controls .xgplayer-controls,.xgplayer-skin-default.xgplayer-inactive .xgplayer-controls,.xgplayer-skin-default.xgplayer-is-live .xgplayer-controls .xgplayer-progress,.xgplayer-skin-default.xgplayer-is-live .xgplayer-controls .xgplayer-time,.xgplayer-skin-default.xgplayer-nostart .xgplayer-controls{display:none}.xgplayer-skin-default.xgplayer-is-live .xgplayer-controls .xgplayer-live{display:block}.xgplayer-skin-default .xgplayer-live{display:block;font-size:12px;color:#fff;line-height:40px;-webkit-order:1;-moz-box-ordinal-group:2;order:1}.xgplayer-skin-default .xgplayer-loading{display:none;width:100px;height:100px;overflow:hidden;-webkit-transform:scale(.7);-ms-transform:scale(.7);transform:scale(.7);position:absolute;left:50%;top:50%;margin:-50px auto auto -50px}.xgplayer-skin-default .xgplayer-loading svg{border-radius:50%;-webkit-transform-origin:center;-ms-transform-origin:center;transform-origin:center;-webkit-animation:loadingRotate 1s linear infinite;animation:loadingRotate 1s linear infinite}.xgplayer-skin-default .xgplayer-loading svg path{stroke:#ddd;stroke-dasharray:236;-webkit-animation:loadingDashOffset 2s linear infinite;animation:loadingDashOffset 2s linear infinite;animation-direction:alternate-reverse;fill:none;stroke-width:12px}.xgplayer-skin-default.xgplayer-nostart .xgplayer-loading{display:none}.xgplayer-skin-default.xgplayer-pause .xgplayer-loading{display:none!important}.xgplayer-skin-default.xgplayer-isloading .xgplayer-loading{display:block}.xgplayer-skin-default .xgplayer-progress{display:block;position:absolute;height:20px;line-height:20px;left:12px;right:12px;outline:none;top:-15px;z-index:35}.xgplayer-skin-default .xgplayer-progress-outer{background:hsla(0,0%,100%,.3);display:block;height:3px;line-height:3px;margin-top:8.5px;width:100%;position:relative;cursor:pointer}.xgplayer-skin-default .xgplayer-progress-cache,.xgplayer-skin-default .xgplayer-progress-played{display:block;height:100%;line-height:1;position:absolute;left:0;top:0}.xgplayer-skin-default .xgplayer-progress-cache{width:0;background:hsla(0,0%,100%,.5)}.xgplayer-skin-default .xgplayer-progress-played{display:block;width:0;background-image:linear-gradient(-90deg,#fa1f41,#e31106);border-radius:0 1.5px 1.5px 0}.xgplayer-skin-default .xgplayer-progress-btn{display:none;position:absolute;left:0;top:-5px;width:13px;height:13px;border-radius:30px;background:#fff;box-shadow:0 0 2px 0 rgba(0,0,0,.26);left:100%;-webkit-transform:translate(-50%);-ms-transform:translate(-50%);transform:translate(-50%)}.xgplayer-skin-default .xgplayer-progress-point{position:absolute}.xgplayer-skin-default .xgplayer-progress-point.xgplayer-tips{margin-left:0;top:-25px;display:none;z-index:100}.xgplayer-skin-default .xgplayer-progress-dot{display:inline-block;position:absolute;height:3px;width:5px;top:0;background:#fff;border-radius:6px;z-index:16}.xgplayer-skin-default .xgplayer-progress-dot .xgplayer-progress-tip{position:absolute;left:0;top:-40px;height:auto;line-height:30px;width:auto;-webkit-transform:scale(.8);-ms-transform:scale(.8);transform:scale(.8);background:rgba(0,0,0,.3);border-radius:6px;border:1px solid rgba(0,0,0,.8);cursor:default;white-space:nowrap;display:none}.xgplayer-skin-default .xgplayer-progress-dot-show .xgplayer-progress-tip{display:block}.xgplayer-skin-default .xgplayer-progress-thumbnail{position:absolute;-moz-box-sizing:border-box;box-sizing:border-box}.xgplayer-skin-default .xgplayer-progress-thumbnail.xgplayer-tips{margin-left:0;display:none;z-index:99}.xgplayer-skin-default .xgplayer-progress:focus .xgplayer-progress-outer,.xgplayer-skin-default .xgplayer-progress:hover .xgplayer-progress-outer{height:6px;margin-top:7px}.xgplayer-skin-default .xgplayer-progress:focus .xgplayer-progress-dot,.xgplayer-skin-default .xgplayer-progress:hover .xgplayer-progress-dot{height:6px}.xgplayer-skin-default .xgplayer-progress:focus .xgplayer-progress-btn,.xgplayer-skin-default .xgplayer-progress:hover .xgplayer-progress-btn{display:block;top:-3px}.xgplayer-skin-default.xgplayer-definition-active .xgplayer-progress,.xgplayer-skin-default.xgplayer-playbackrate-active .xgplayer-progress,.xgplayer-skin-default.xgplayer-texttrack-active .xgplayer-progress,.xgplayer-skin-default.xgplayer-volume-active .xgplayer-progress{z-index:15}.xgplayer-skin-default.xgplayer-mobile .xgplayer-progress-btn{display:block!important}.xgplayer-skin-default.xgplayer-mobile .xgplayer-progress:focus .xgplayer-progress-outer,.xgplayer-skin-default.xgplayer-mobile .xgplayer-progress:hover .xgplayer-progress-outer{height:3px!important;margin-top:8.5px!important}.xgplayer-skin-default.xgplayer-mobile .xgplayer-progress:focus .xgplayer-progress-btn,.xgplayer-skin-default.xgplayer-mobile .xgplayer-progress:hover .xgplayer-progress-btn{display:block!important;top:-5px!important}.xgplayer-skin-default .xgplayer-replay{position:absolute;left:0;top:0;width:100%;height:100%;z-index:105;display:none;-webkit-justify-content:center;-moz-box-pack:center;justify-content:center;-webkit-align-items:center;-moz-box-align:center;align-items:center;background:rgba(0,0,0,.54);-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;flex-direction:column}.xgplayer-skin-default .xgplayer-replay svg{background:rgba(0,0,0,.58);border-radius:100%;cursor:pointer}.xgplayer-skin-default .xgplayer-replay svg path{-webkit-transform:translate(20px,21px);-ms-transform:translate(20px,21px);transform:translate(20px,21px);fill:#ddd}.xgplayer-skin-default .xgplayer-replay svg:hover{background:rgba(0,0,0,.38)}.xgplayer-skin-default .xgplayer-replay svg:hover path{fill:#fff}.xgplayer-skin-default .xgplayer-replay .xgplayer-replay-txt{display:inline-block;font-family:PingFangSC-Regular;font-size:14px;color:#fff;line-height:34px}.xgplayer-skin-default.xgplayer.xgplayer-ended .xgplayer-controls{display:none}.xgplayer-skin-default.xgplayer.xgplayer-ended .xgplayer-replay{display:-webkit-flex;display:-moz-box;display:flex}.xgplayer-skin-default .xgplayer-playbackrate{-webkit-order:8;-moz-box-ordinal-group:9;order:8;width:60px;height:20px;z-index:18;position:relative;display:inline-block;cursor:default}.xgplayer-skin-default .xgplayer-playbackrate ul{display:none;list-style:none;width:78px;background:rgba(0,0,0,.54);border-radius:1px;position:absolute;bottom:20px;left:50%;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%);text-align:left;white-space:nowrap;z-index:26;cursor:pointer}.xgplayer-skin-default .xgplayer-playbackrate ul li{opacity:.7;font-family:PingFangSC-Regular;font-size:11px;color:hsla(0,0%,100%,.8);position:relative;padding:4px 0;text-align:center}.xgplayer-skin-default .xgplayer-playbackrate ul li.selected,.xgplayer-skin-default .xgplayer-playbackrate ul li:hover{color:#fff;opacity:1}.xgplayer-skin-default .xgplayer-playbackrate ul li:first-child{position:relative;margin-top:12px}.xgplayer-skin-default .xgplayer-playbackrate ul li:last-child{position:relative;margin-bottom:12px}.xgplayer-skin-default .xgplayer-playbackrate .name{height:20px;position:relative;top:11px;text-align:center;background:rgba(0,0,0,.38);color:hsla(0,0%,100%,.8);border-radius:10px;line-height:20px}.xgplayer-skin-default .xgplayer-playbackrate span{position:relative;top:19px;font-weight:700;text-shadow:0 0 4px rgba(0,0,0,.6)}.xgplayer-skin-default .xgplayer-playbackrate:hover{opacity:1}.xgplayer-skin-default.xgplayer-playbackrate-active .xgplayer-playbackrate ul{display:block}.xgplayer-skin-default .xgplayer-download{position:relative;-webkit-order:9;-moz-box-ordinal-group:10;order:9;display:block;cursor:pointer}.xgplayer-skin-default .xgplayer-download .xgplayer-icon{margin-top:3px}.xgplayer-skin-default .xgplayer-download .xgplayer-icon div{position:absolute}.xgplayer-skin-default .xgplayer-download .xgplayer-icon svg{position:relative;top:5px;left:5px}.xgplayer-skin-default .xgplayer-download .xgplayer-tips{margin-left:-20px}.xgplayer-skin-default .xgplayer-download .xgplayer-tips .xgplayer-tip-download{display:block}.xgplayer-skin-default .xgplayer-download:hover{opacity:.85}.xgplayer-skin-default .xgplayer-download:hover .xgplayer-tips{display:block}.lang-is-en .xgplayer-download .xgplayer-tips{margin-left:-32px}.lang-is-jp .xgplayer-download .xgplayer-tips{margin-left:-40px}.xgplayer-skin-default .danmu-switch{-webkit-order:6;-moz-box-ordinal-group:7;order:6;z-index:26}.xgplayer-skin-default .xgplayer-danmu{display:none;position:absolute;top:0;left:0;right:0;height:100%;overflow:hidden;z-index:9;outline:none}.xgplayer-skin-default .xgplayer-danmu>*{position:absolute;white-space:nowrap;z-index:9}.xgplayer-skin-default .xgplayer-danmu.xgplayer-has-danmu{display:block}.xgplayer-skin-default .xgplayer-panel{outline:none;-webkit-order:7;-moz-box-ordinal-group:8;order:7;width:40px;height:40px;display:inline-block;position:relative;font-family:PingFangSC-Regular;font-size:13px;color:hsla(0,0%,100%,.8);z-index:36}.xgplayer-skin-default .xgplayer-panel .xgplayer-panel-icon{cursor:pointer;position:absolute;margin-left:5px;top:10px}.xgplayer-skin-default .xgplayer-panel-active{display:block!important;bottom:30px}.xgplayer-skin-default .xgplayer-panel-slider{z-index:36;display:none;position:absolute;width:230px;height:230px;background:rgba(0,0,0,.54);border-radius:1px;padding:10px 20px;outline:none;left:-115px;bottom:40px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-hidemode{padding-bottom:10px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-hidemode-radio li{display:inline;list-style:none;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-hidemode ul{display:-webkit-flex;display:-moz-box;display:flex;-webkit-justify-content:space-around;justify-content:space-around}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-hidemode li{margin:0 12px;font-size:11px;color:#aaa}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-hidemode-font{margin-bottom:10px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency{display:block;margin-top:10px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-line{-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;outline:none;width:150px;height:4px;background:#aaa;border-radius:4px;border-style:none;margin-left:10px;margin-top:-2px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-line::-moz-focus-outer{border:0!important}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-color::-webkit-slider-runnable-track{outline:none;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-color::-moz-range-track{outline:none;background-color:#aaa;border-color:transparent;cursor:pointer;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-color::-ms-track{outline:none;background-color:#aaa;color:transparent;border-color:transparent;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-bar::-webkit-slider-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:6px;width:6px;margin-top:-4px;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-bar::-moz-range-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:0;width:0;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-bar::-ms-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:6px;width:6px;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-bar::-moz-range-progress{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;height:4px;border-radius:4px;background:linear-gradient(90deg,#f85959,#f85959 100%,#aaa)}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea{display:block;margin-top:8px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-name{display:inline-block;position:relative;top:-10px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-control{display:inline-block}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-control-up{width:150px;margin-left:10px;display:-moz-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-between;-moz-box-pack:justify;justify-content:space-between;color:#aaa}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-control-down{position:relative;top:-10px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-control-down-dots{display:-webkit-flex;display:-moz-box;display:flex;width:150px;margin-left:10px;-webkit-justify-content:space-between;-moz-box-pack:justify;justify-content:space-between}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-threequarters,.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-twoquarters{margin-left:-6px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-full{margin-right:3px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-line{-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;outline:none;width:150px;height:4px;background:#aaa;border-radius:4px;border-style:none;margin-left:10px;margin-top:-2px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-line::-moz-focus-outer{border:0!important}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-color::-webkit-slider-runnable-track{outline:none;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-color::-moz-range-track{outline:none;background-color:#aaa;border-color:transparent;cursor:pointer;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-color::-ms-track{outline:none;background-color:#aaa;color:transparent;border-color:transparent;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-bar::-webkit-slider-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:6px;width:6px;margin-top:-4px;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-bar::-moz-range-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:0;width:0;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-bar::-ms-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:6px;width:6px;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-full-dot,.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-onequarters-dot,.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-threequarters-dot,.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-twoquarters-dot,.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-zero-dot{width:3px;height:3px;border:3px solid #aaa;border-radius:50%;background-color:#aaa;position:relative;top:16px;z-index:-1}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed{display:block}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed-name{display:inline-block;position:relative;top:-10px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed-control{display:inline-block}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed-control-up{width:150px;margin-left:10px;display:-moz-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-between;-moz-box-pack:justify;justify-content:space-between;color:#aaa}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed-control-down{position:relative;top:-10px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed-control-down-dots{display:-webkit-flex;display:-moz-box;display:flex;width:150px;margin-left:10px;-webkit-justify-content:space-between;-moz-box-pack:justify;justify-content:space-between}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-line{-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;outline:none;width:150px;height:4px;background:#aaa;border-radius:4px;border-style:none;margin-left:10px;margin-top:-2px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-line::-moz-focus-outer{border:0!important}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-color::-webkit-slider-runnable-track{outline:none;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-color::-moz-range-track{outline:none;background-color:#aaa;border-color:transparent;cursor:pointer;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-color::-ms-track{outline:none;background-color:#aaa;color:transparent;border-color:transparent;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-bar::-webkit-slider-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:6px;width:6px;margin-top:-4px;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-bar::-moz-range-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:0;width:0;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-bar::-ms-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:6px;width:6px;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-large-dot,.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-middle-dot,.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-small-dot{width:3px;height:3px;border:3px solid #aaa;border-radius:50%;background-color:#aaa;position:relative;top:16px;z-index:-1}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont{display:block}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont-name{display:inline-block;position:relative;top:-10px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont-control{display:inline-block}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont-control-up{width:150px;margin-left:10px;display:-moz-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-between;-moz-box-pack:justify;justify-content:space-between;color:#aaa}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont-control-down{position:relative;top:-10px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont-control-down-dots{display:-webkit-flex;display:-moz-box;display:flex;width:150px;margin-left:10px;-webkit-justify-content:space-between;-moz-box-pack:justify;justify-content:space-between}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-line{-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;outline:none;width:150px;height:4px;background:#aaa;border-radius:4px;border-style:none;margin-left:10px;margin-top:-2px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-line::-moz-focus-outer{border:0!important}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-color::-webkit-slider-runnable-track{outline:none;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-color::-moz-range-track{outline:none;background-color:#aaa;border-color:transparent;cursor:pointer;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-color::-ms-track{outline:none;background-color:#aaa;color:transparent;border-color:transparent;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-bar::-webkit-slider-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:6px;width:6px;margin-top:-4px;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-bar::-moz-range-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:0;width:0;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-bar::-ms-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:6px;width:6px;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-large-dot,.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-middle-dot,.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-small-dot{width:3px;height:3px;border:3px solid #aaa;border-radius:50%;background-color:#aaa;position:relative;top:16px;z-index:-1}.xgplayer-skin-default .xgplayer-playnext{position:relative;-webkit-order:1;-moz-box-ordinal-group:2;order:1;display:block;cursor:pointer;top:-2px}.xgplayer-skin-default .xgplayer-playnext .xgplayer-icon div{position:absolute}.xgplayer-skin-default .xgplayer-playnext .xgplayer-tips .xgplayer-tip-playnext{display:block}.xgplayer-skin-default .xgplayer-playnext:hover{opacity:.85}.xgplayer-skin-default .xgplayer-playnext:hover .xgplayer-tips{display:block}.lang-is-en .xgplayer-playnext .xgplayer-tips{margin-left:-25px}.lang-is-jp .xgplayer-playnext .xgplayer-tips{margin-left:-38px}.xgplayer-skin-default.xgplayer-playnext-inactive .xgplayer-playnext{display:none}.xgplayer-skin-default .xgplayer-pip{-webkit-order:9;-moz-box-ordinal-group:10;order:9;position:relative;outline:none;display:block;cursor:pointer;height:20px;top:8px}.xgplayer-skin-default .xgplayer-pip .name{text-align:center;font-family:PingFangSC-Regular;font-size:13px;line-height:20px;height:20px;color:hsla(0,0%,100%,.8)}.xgplayer-skin-default .xgplayer-pip .name span{width:60px;height:20px;line-height:20px;background:rgba(0,0,0,.38);border-radius:10px;display:inline-block;vertical-align:middle}.xgplayer-skin-default .xgplayer-pip-lay{position:absolute;top:26px;left:0;width:100%;height:100%;z-index:130;cursor:pointer;background-color:transparent;display:none}.xgplayer-skin-default .xgplayer-pip-lay div{width:100%;height:100%}.xgplayer-skin-default .xgplayer-pip-drag{cursor:move;position:absolute;top:0;left:0;width:100%;height:26px;line-height:26px;background-image:linear-gradient(rgba(0,0,0,.3),transparent);z-index:130;display:none}.xgplayer-skin-default.xgplayer-pip-active{position:fixed;right:0;bottom:200px;width:320px!important;height:180px!important;z-index:110!important}.xgplayer-skin-default.xgplayer-pip-active .xgplayer-controls,.xgplayer-skin-default.xgplayer-pip-active .xgplayer-danmu{display:none}.xgplayer-skin-default.xgplayer-pip-active .xgplayer-pip-lay{display:block}.xgplayer-skin-default.xgplayer-pip-active .xgplayer-pip-drag{display:-webkit-flex;display:-moz-box;display:flex}.xgplayer-skin-default.xgplayer-inactive .xgplayer-pip-drag{display:none}.lang-is-jp .xgplayer-pip .name span{width:70px;height:20px}.xgplayer-skin-default .xgplayer-rotate{position:relative;-webkit-order:10;-moz-box-ordinal-group:11;order:10;display:block;cursor:pointer}.xgplayer-skin-default .xgplayer-rotate .xgplayer-icon{margin-top:7px;width:26px}.xgplayer-skin-default .xgplayer-rotate .xgplayer-icon div{position:absolute}.xgplayer-skin-default .xgplayer-rotate .xgplayer-tips{margin-left:-22px}.xgplayer-skin-default .xgplayer-rotate .xgplayer-tips .xgplayer-tip-rotate{display:block}.xgplayer-skin-default .xgplayer-rotate:hover{opacity:.85}.xgplayer-skin-default .xgplayer-rotate:hover .xgplayer-tips{display:block}.lang-is-en .xgplayer-rotate .xgplayer-tips{margin-left:-26px}.lang-is-jp .xgplayer-rotate .xgplayer-tips{margin-left:-38px}.xgplayer-skin-default .xgplayer-reload{position:relative;-webkit-order:1;-moz-box-ordinal-group:2;order:1;display:block;width:40px;height:40px;cursor:pointer}.xgplayer-skin-default .xgplayer-reload .xgplayer-icon{margin-top:7px;width:26px}.xgplayer-skin-default .xgplayer-reload .xgplayer-icon div{position:absolute}.xgplayer-skin-default .xgplayer-reload .xgplayer-tips{margin-left:-22px}.xgplayer-skin-default .xgplayer-reload .xgplayer-tips .xgplayer-tip-reload{display:block}.xgplayer-skin-default .xgplayer-reload:hover{opacity:.85}.xgplayer-skin-default .xgplayer-reload:hover .xgplayer-tips{display:block}.lang-is-en .xgplayer-reload .xgplayer-tips{margin-left:-26px}.lang-is-jp .xgplayer-reload .xgplayer-tips{margin-left:-38px}.xgplayer-skin-default .xgplayer-screenshot{-webkit-order:11;-moz-box-ordinal-group:12;order:11;position:relative;outline:none;display:block;cursor:pointer;height:20px;top:8px}.xgplayer-skin-default .xgplayer-screenshot .name{text-align:center;font-family:PingFangSC-Regular;font-size:13px;line-height:20px;height:20px;color:hsla(0,0%,100%,.8)}.xgplayer-skin-default .xgplayer-screenshot .name span{width:60px;height:20px;line-height:20px;background:rgba(0,0,0,.38);border-radius:10px;display:inline-block;vertical-align:middle}.lang-is-en .xgplayer-screenshot .name span,.lang-is-jp .xgplayer-screenshot .name span{width:75px;height:20px}.xgplayer-skin-default .xgplayer-texttrack{-webkit-order:7;-moz-box-ordinal-group:8;order:7;width:60px;height:150px;z-index:18;position:relative;outline:none;display:none;cursor:default;margin-top:-119px}.xgplayer-skin-default .xgplayer-texttrack ul{display:none;list-style:none;min-width:78px;background:rgba(0,0,0,.54);border-radius:1px;position:absolute;bottom:30px;text-align:center;white-space:nowrap;left:50%;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%);width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;z-index:26;cursor:pointer}.xgplayer-skin-default .xgplayer-texttrack ul li{opacity:.7;font-family:PingFangSC-Regular;font-size:11px;color:hsla(0,0%,100%,.8);width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;margin:auto;padding:6px 13px}.xgplayer-skin-default .xgplayer-texttrack ul li.selected,.xgplayer-skin-default .xgplayer-texttrack ul li:hover{color:#fff;opacity:1}.xgplayer-skin-default .xgplayer-texttrack .name{text-align:center;font-family:PingFangSC-Regular;font-size:13px;cursor:pointer;color:hsla(0,0%,100%,.8);position:absolute;bottom:0;width:60px;height:20px;line-height:20px;background:rgba(0,0,0,.38);border-radius:10px;display:inline-block;vertical-align:middle}.xgplayer-skin-default.xgplayer-is-texttrack .xgplayer-texttrack,.xgplayer-skin-default.xgplayer-texttrack-active .xgplayer-texttrack ul{display:block}.xgplayer-skin-default .xgplayer-icon{display:block;width:40px;height:40px;overflow:hidden;fill:#fff}.xgplayer-skin-default .xgplayer-icon svg{position:absolute}.xgplayer-skin-default .xgplayer-tips{background:rgba(0,0,0,.54);border-radius:1px;display:none;position:absolute;font-family:PingFangSC-Regular;font-size:11px;color:#fff;padding:2px 4px;text-align:center;top:-30px;left:50%;margin-left:-16px;width:auto;white-space:nowrap}.xgplayer-skin-default.xgplayer-mobile .xgplayer-tips{display:none!important}.xgplayer-skin-default .xgplayer-error{background:#000;display:none;position:absolute;left:0;top:0;width:100%;height:100%;z-index:125;font-family:PingFangSC-Regular;font-size:14px;color:#fff;text-align:center;line-height:100%;-webkit-justify-content:center;-moz-box-pack:center;justify-content:center;-webkit-align-items:center;-moz-box-align:center;align-items:center}.xgplayer-skin-default .xgplayer-error .xgplayer-error-refresh{color:#fa1f41;padding:0 3px;cursor:pointer}.xgplayer-skin-default .xgplayer-error .xgplayer-error-text{line-height:18px;margin:auto 6px}.xgplayer-skin-default.xgplayer-is-error .xgplayer-error{display:-webkit-flex;display:-moz-box;display:flex}.xgplayer-skin-default .xgplayer-memoryplay-spot{position:absolute;height:32px;left:10px;bottom:46px;background:rgba(0,0,0,.5);border-radius:32px;line-height:32px;color:#ddd;z-index:15;padding:0 32px 0 16px}.xgplayer-skin-default .xgplayer-memoryplay-spot .xgplayer-lasttime{color:red;font-weight:700}.xgplayer-skin-default .xgplayer-memoryplay-spot .btn-close{position:absolute;width:16px;height:16px;right:10px;top:2px;cursor:pointer;color:#fff;font-size:16px}", ""]);

// exports


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
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
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
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
/* 61 */
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

var	fixUrls = __webpack_require__(62);

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
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

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
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_enter = function s_enter() {
  var player = this;
  var root = player.root;
  var util = _player2.default.util;

  var barStr = '';
  for (var i = 1; i <= 12; i++) {
    barStr += '<div class="xgplayer-enter-bar' + i + '"></div>';
  }
  var enter = util.createDom('xg-enter', '<div class="xgplayer-enter-spinner">\n                                                  ' + barStr + '\n                                                </div>', {}, 'xgplayer-enter');
  root.appendChild(enter);
};

_player2.default.install('s_enter', s_enter);

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

var _play = __webpack_require__(65);

var _play2 = _interopRequireDefault(_play);

var _pause = __webpack_require__(66);

var _pause2 = _interopRequireDefault(_pause);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_play = function s_play() {
  var player = this;
  var util = _player2.default.util;
  var playBtn = player.config.playBtn ? player.config.playBtn : {};
  var btn = void 0,
      iconPlay = void 0,
      iconPause = void 0;
  if (playBtn.type === 'img') {
    btn = util.createImgBtn('play', playBtn.url.play, playBtn.width, playBtn.height);
  } else {
    btn = util.createDom('xg-play', '<xg-icon class="xgplayer-icon">\n                                      <div class="xgplayer-icon-play">' + _play2.default + '</div>\n                                      <div class="xgplayer-icon-pause">' + _pause2.default + '</div>\n                                     </xg-icon>', {}, 'xgplayer-play');
  }

  var tipsText = {};
  tipsText.play = player.lang.PLAY_TIPS;
  tipsText.pause = player.lang.PAUSE_TIPS;
  var tips = util.createDom('xg-tips', '<span class="xgplayer-tip-play">' + tipsText.play + '</span>\n                                        <span class="xgplayer-tip-pause">' + tipsText.pause + '</span>', {}, 'xgplayer-tips');
  btn.appendChild(tips);
  player.once('ready', function () {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.emit('playBtnClick');
    });
  });
};

_player2.default.install('s_play', s_play);

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\">\n  <path transform=\"translate(2,2) scale(0.0320625 0.0320625)\" d=\"M576,363L810,512L576,661zM342,214L576,363L576,661L342,810z\"></path>\n</svg>\n");

/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\">\n  <path transform=\"translate(2,2) scale(0.0320625 0.0320625)\" d=\"M598,214h170v596h-170v-596zM256 810v-596h170v596h-170z\"></path>\n</svg>\n");

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

var _startPlay = __webpack_require__(68);

var _startPlay2 = _interopRequireDefault(_startPlay);

var _startPause = __webpack_require__(69);

var _startPause2 = _interopRequireDefault(_startPause);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_start = function s_start() {
  var player = this;
  var root = player.root;
  var util = _player2.default.util;
  var btn = util.createDom('xg-start', '<div class="xgplayer-icon-play">' + _startPlay2.default + '</div>\n                                      <div class="xgplayer-icon-pause">' + _startPause2.default + '</div>', {}, 'xgplayer-start');
  function onPlayerReady(player) {
    util.addClass(player.root, 'xgplayer-skin-default');
    if (player.config) {
      player.config.autoplay && !util.isWeiXin() && !util.isUc() && util.addClass(player.root, 'xgplayer-is-enter');
      if (player.config.lang && player.config.lang === 'en') {
        util.addClass(player.root, 'lang-is-en');
      } else if (player.config.lang === 'jp') {
        util.addClass(player.root, 'lang-is-jp');
      }
      if (!player.config.enableContextmenu) {
        player.video.addEventListener('contextmenu', function (e) {
          e.preventDefault();
          e.stopPropagation();
        });
      }
    }
  }

  if (player.isReady) {
    root.appendChild(btn);
    onPlayerReady(player);
  } else {
    player.once('ready', function () {
      root.appendChild(btn);
      onPlayerReady(player);
    });
  }

  player.once('autoplay was prevented', function () {
    util.removeClass(player.root, 'xgplayer-is-enter');
    util.addClass(player.root, 'xgplayer-nostart');
  });

  player.once('canplay', function () {
    util.removeClass(player.root, 'xgplayer-is-enter');
  });

  btn.onclick = function (e) {
    e.preventDefault();
    e.stopPropagation();
    player.emit('startBtnClick');
  };
};

_player2.default.install('s_start', s_start);

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"70\" height=\"70\" viewBox=\"0 0 70 70\">\n  <path transform=\"translate(15,15) scale(0.04,0.04)\" d=\"M576,363L810,512L576,661zM342,214L576,363L576,661L342,810z\"></path>\n</svg>\n");

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"70\" height=\"70\" viewBox=\"0 0 70 70\">\n  <path transform=\"translate(15,15) scale(0.04 0.04)\" d=\"M598,214h170v596h-170v-596zM256 810v-596h170v596h-170z\"></path>\n</svg>\n");

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_poster = function s_poster() {
  var player = this;
  var root = player.root;
  var util = _player2.default.util;
  if (!player.config.poster) {
    return;
  }
  var poster = util.createDom('xg-poster', '', {}, 'xgplayer-poster');
  poster.style.backgroundImage = 'url(' + player.config.poster + ')';
  root.appendChild(poster);
};

_player2.default.install('s_poster', s_poster);

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_flex = function s_flex() {
  var player = this;
  var root = player.root;
  var util = _player2.default.util;
  var playceholder = util.createDom('xg-placeholder', '', {}, 'xgplayer-placeholder');
  player.controls.appendChild(playceholder);
};

_player2.default.install('s_flex', s_flex);

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

var _requestFull = __webpack_require__(73);

var _requestFull2 = _interopRequireDefault(_requestFull);

var _exitFull = __webpack_require__(74);

var _exitFull2 = _interopRequireDefault(_exitFull);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_fullscreen = function s_fullscreen() {
  var player = this;
  var util = _player2.default.util;
  var fullscreenBtn = player.config.fullscreenBtn ? player.config.fullscreenBtn : {};
  var btn = void 0,
      iconRequestFull = void 0,
      iconExitFull = void 0;
  if (fullscreenBtn.type === 'img') {
    btn = util.createImgBtn('fullscreen', fullscreenBtn.url.request, fullscreenBtn.width, fullscreenBtn.height);
  } else {
    btn = util.createDom('xg-fullscreen', '<xg-icon class="xgplayer-icon">\n                                             <div class="xgplayer-icon-requestfull">' + _requestFull2.default + '</div>\n                                             <div class="xgplayer-icon-exitfull">' + _exitFull2.default + '</div>\n                                           </xg-icon>', {}, 'xgplayer-fullscreen');
  }

  var tipsText = {};
  tipsText.requestfull = player.lang.FULLSCREEN_TIPS;
  tipsText.exitfull = player.lang.EXITFULLSCREEN_TIPS;
  var tips = util.createDom('xg-tips', '<span class="xgplayer-tip-requestfull">' + tipsText.requestfull + '</span>\n                                        <span class="xgplayer-tip-exitfull">' + tipsText.exitfull + '</span>', {}, 'xgplayer-tips');
  btn.appendChild(tips);
  player.once('ready', function () {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.emit('fullscreenBtnClick');
    });
  });
};

_player2.default.install('s_fullscreen', s_fullscreen);

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\">\n  <path transform=\"scale(0.0320625 0.0320625)\" d=\"M598 214h212v212h-84v-128h-128v-84zM726 726v-128h84v212h-212v-84h128zM214 426v-212h212v84h-128v128h-84zM298 598v128h128v84h-212v-212h84z\"></path>\n</svg>\n");

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\">\n  <path transform=\"scale(0.0320625 0.0320625)\" d=\"M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z\"></path>\n</svg>\n");

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

var _requestCssFull = __webpack_require__(76);

var _requestCssFull2 = _interopRequireDefault(_requestCssFull);

var _exitCssFull = __webpack_require__(77);

var _exitCssFull2 = _interopRequireDefault(_exitCssFull);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_cssFullscreen = function s_cssFullscreen() {
  var player = this;
  var util = _player2.default.util;
  if (!player.config.cssFullscreen) {
    return;
  }
  var btn = util.createDom('xg-cssfullscreen', '<xg-icon class="xgplayer-icon">\n                                             <div class="xgplayer-icon-requestfull">' + _requestCssFull2.default + '</div>\n                                             <div class="xgplayer-icon-exitfull">' + _exitCssFull2.default + '</div>\n                                           </xg-icon>', {}, 'xgplayer-cssfullscreen');

  var tipsText = {};
  tipsText.requestfull = player.lang.CSSFULLSCREEN_TIPS;
  tipsText.exitfull = player.lang.EXITCSSFULLSCREEN_TIPS;
  var tips = util.createDom('xg-tips', '<span class="xgplayer-tip-requestfull">' + tipsText.requestfull + '</span>\n                                        <span class="xgplayer-tip-exitfull">' + tipsText.exitfull + '</span>', {}, 'xgplayer-tips');
  btn.appendChild(tips);
  player.once('ready', function () {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.emit('cssFullscreenBtnClick');
    });
  });
};

_player2.default.install('s_cssFullscreen', s_cssFullscreen);

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\">\n  <path transform=\"scale(0.028 0.028)\" d=\"M843.617212 67.898413 175.411567 67.898413c-61.502749 0-111.367437 49.856501-111.367437 111.367437l0 668.205645c0 61.510936 49.864688 111.367437 111.367437 111.367437L843.617212 958.838931c61.510936 0 111.367437-49.856501 111.367437-111.367437L954.984648 179.26585C954.984648 117.754914 905.12917 67.898413 843.617212 67.898413zM398.146441 736.104057c15.380292 0 27.842115 12.461823 27.842115 27.842115 0 15.379269-12.461823 27.841092-27.842115 27.841092L259.725858 791.787264c-7.785314 0-14.781658-3.217275-19.838837-8.365528-5.383614-4.577249-8.791224-11.228739-8.791224-19.475564L231.095797 624.736621c0-15.371082 12.471033-27.842115 27.842115-27.842115 15.380292 0 27.842115 12.471033 27.842115 27.842115l-0.61603 71.426773 133.036969-133.037992 39.378869 39.378869L324.962651 736.113267 398.146441 736.104057zM419.199942 463.611943 286.162974 330.565764l0.61603 71.435982c0 15.380292-12.461823 27.842115-27.842115 27.842115-15.371082 0-27.842115-12.461823-27.842115-27.842115L231.094774 262.791172c0-8.256034 3.40761-14.908548 8.791224-19.476587 5.057179-5.148253 12.053524-8.374738 19.838837-8.374738l138.420583 0.00921c15.380292 0 27.842115 12.461823 27.842115 27.842115s-12.461823 27.842115-27.842115 27.842115l-73.175603-0.00921 133.607974 133.607974L419.199942 463.611943zM787.932981 763.946172c0 8.247848-3.40761 14.899338-8.791224 19.475564-5.057179 5.148253-12.053524 8.365528-19.839861 8.365528L620.881314 791.787264c-15.379269 0-27.841092-12.461823-27.841092-27.841092 0-15.380292 12.461823-27.842115 27.841092-27.842115l73.185836 0.00921L560.449967 602.50427l39.378869-39.378869L732.875015 696.163393l-0.62524-71.426773c0-15.371082 12.462846-27.842115 27.842115-27.842115 15.380292 0 27.842115 12.471033 27.842115 27.842115L787.934005 763.946172zM787.932981 402.000724c0 15.380292-12.461823 27.842115-27.842115 27.842115-15.379269 0-27.842115-12.461823-27.842115-27.842115l0.62524-71.435982L599.828836 463.611943l-39.378869-39.378869 133.617184-133.607974-73.185836 0.00921c-15.379269 0-27.841092-12.461823-27.841092-27.842115s12.461823-27.842115 27.841092-27.842115l138.421606-0.00921c7.785314 0 14.781658 3.226484 19.839861 8.374738 5.383614 4.568039 8.791224 11.219529 8.791224 19.476587L787.934005 402.000724z\"></path>\n</svg>\n");

/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\">\n  <path transform=\"scale(0.028 0.028)\" d=\"M834.56 81.92H189.44c-59.392 0-107.52 48.128-107.52 107.52v645.12c0 59.392 48.128 107.52 107.52 107.52h645.12c59.392 0 107.52-48.128 107.52-107.52V189.44c0-59.392-48.128-107.52-107.52-107.52zM458.24 727.04c0 14.848-12.288 26.624-26.624 26.624S404.48 741.888 404.48 727.04v-69.632L289.28 773.12c-10.752 10.24-27.648 10.24-37.888 0-10.24-10.752-10.24-27.648 0-37.888L366.592 619.52H296.96c-14.848 0-26.624-12.288-26.624-26.624s12.288-26.624 26.624-26.624h134.144c14.848 0 26.624 12.288 26.624 26.624V727.04z m0-295.936c0 14.848-12.288 26.624-26.624 26.624H296.96c-14.848 0-26.624-12.288-26.624-26.624S282.112 404.48 296.96 404.48h69.632L251.392 289.28c-10.24-10.752-10.24-27.648 0-37.888 5.12-5.12 12.288-7.68 18.944-7.68 6.656 0 13.824 2.56 18.944 7.68L404.48 366.592V296.96c0-14.848 12.288-26.624 26.624-26.624s26.624 12.288 26.624 26.624v134.144zM773.12 773.12c-10.752 10.24-27.648 10.24-37.888 0L619.52 657.408V727.04c0 14.848-12.288 26.624-26.624 26.624s-26.624-11.776-26.624-26.624v-134.144c0-14.848 12.288-26.624 26.624-26.624H727.04c14.848 0 26.624 12.288 26.624 26.624s-12.288 26.624-26.624 26.624h-69.632l115.2 115.2c10.752 10.752 10.752 27.648 0.512 38.4z m0-483.84L657.408 404.48H727.04c14.848 0 26.624 12.288 26.624 26.624 0 14.848-12.288 26.624-26.624 26.624h-134.144c-14.848 0-26.624-12.288-26.624-26.624V296.96c0-14.848 12.288-26.624 26.624-26.624s26.624 12.288 26.624 26.624v69.632L734.72 250.88c5.12-5.12 12.288-7.68 18.944-7.68s13.824 2.56 18.944 7.68c10.752 10.752 10.752 27.648 0.512 38.4z\"></path>\n</svg>\n");

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

var _volumeMuted = __webpack_require__(79);

var _volumeMuted2 = _interopRequireDefault(_volumeMuted);

var _volumeSmall = __webpack_require__(80);

var _volumeSmall2 = _interopRequireDefault(_volumeSmall);

var _volumeLarge = __webpack_require__(81);

var _volumeLarge2 = _interopRequireDefault(_volumeLarge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_volume = function s_volume() {
  var player = this;
  var util = _player2.default.util;
  var container = util.createDom('xg-volume', '<xg-icon class="xgplayer-icon">\n                                         <div class="xgplayer-icon-large">' + _volumeLarge2.default + '</div>\n                                         <div class="xgplayer-icon-small">' + _volumeSmall2.default + '</div>\n                                         <div class="xgplayer-icon-muted">' + _volumeMuted2.default + '</div>\n                                       </xg-icon>\n                                       <xg-slider class="xgplayer-slider" tabindex="2">\n                                         <xg-bar class="xgplayer-bar">\n                                           <xg-drag class="xgplayer-drag"></xg-drag>\n                                         </xg-bar>\n                                       </xg-slider>', {}, 'xgplayer-volume');
  player.once('ready', function () {
    player.controls.appendChild(container);
  });
  var slider = container.querySelector('.xgplayer-slider');
  var bar = container.querySelector('.xgplayer-bar');
  var selected = container.querySelector('.xgplayer-drag');
  var icon = container.querySelector('.xgplayer-icon');
  selected.style.height = player.config.volume * 100 + '%';
  slider.volume = player.config.volume;

  bar.addEventListener('mousedown', function (e) {
    e.preventDefault();
    e.stopPropagation();
    player.emit('volumeBarClick', e);
  });

  ['click', 'touchend'].forEach(function (item) {
    icon.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.emit('volumeIconClick');
    });
  });

  icon.addEventListener('mouseenter', function (e) {
    e.preventDefault();
    e.stopPropagation();
    player.emit('volumeIconEnter');
  });

  ['blur', 'mouseleave'].forEach(function (item) {
    container.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.emit('volumeIconLeave');
    });
  });
};

_player2.default.install('s_volume', s_volume);

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"28\" viewBox=\"0 0 28 28\">\n  <path transform=\"scale(0.0220625 0.0220625)\" d=\"M358.4 358.4h-204.8v307.2h204.8l256 256v-819.2l-256 256z\"></path>\n  <path transform=\"scale(0.0220625 0.0220625)\" d=\"M920.4 439.808l-108.544-109.056-72.704 72.704 109.568 108.544-109.056 108.544 72.704 72.704 108.032-109.568 108.544 109.056 72.704-72.704-109.568-108.032 109.056-108.544-72.704-72.704-108.032 109.568z\"></path>\n</svg>\n");

/***/ }),
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"28\" viewBox=\"0 0 28 28\">\n  <path transform=\"scale(0.0220625 0.0220625)\" d=\"M358.4 358.4h-204.8v307.2h204.8l256 256v-819.2l-256 256z\"></path>\n  <path transform=\"scale(0.0220625 0.0220625)\" d=\"M795.648 693.248l-72.704-72.704c27.756-27.789 44.921-66.162 44.921-108.544s-17.165-80.755-44.922-108.546l0.002 0.002 72.704-72.704c46.713 46.235 75.639 110.363 75.639 181.248s-28.926 135.013-75.617 181.227l-0.021 0.021zM795.648 693.248l-72.704-72.704c27.756-27.789 44.921-66.162 44.921-108.544s-17.165-80.755-44.922-108.546l0.002 0.002 72.704-72.704c46.713 46.235 75.639 110.363 75.639 181.248s-28.926 135.013-75.617 181.227l-0.021 0.021z\"></path>\n</svg>\n");

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"28\" viewBox=\"0 0 28 28\">\n  <path transform=\"scale(0.0220625 0.0220625)\" d=\"M358.4 358.4h-204.8v307.2h204.8l256 256v-819.2l-256 256z\"></path>\n  <path transform=\"scale(0.0220625 0.0220625)\" d=\"M940.632 837.632l-72.192-72.192c65.114-64.745 105.412-154.386 105.412-253.44s-40.299-188.695-105.396-253.424l-0.016-0.016 72.192-72.192c83.639 83.197 135.401 198.37 135.401 325.632s-51.762 242.434-135.381 325.612l-0.020 0.020zM795.648 693.248l-72.704-72.704c27.756-27.789 44.921-66.162 44.921-108.544s-17.165-80.755-44.922-108.546l0.002 0.002 72.704-72.704c46.713 46.235 75.639 110.363 75.639 181.248s-28.926 135.013-75.617 181.227l-0.021 0.021z\"></path>\n</svg>\n");

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_definition = function s_definition() {
  var player = this;
  var root = player.root;
  var util = _player2.default.util;
  var sniffer = _player2.default.sniffer;
  var paused = void 0;
  var container = util.createDom('xg-definition', '', { tabindex: 3 }, 'xgplayer-definition');
  if (sniffer.device === 'mobile') {
    player.config.definitionActive = 'click';
  }

  function onCanplayResourceReady() {
    var list = player.definitionList;
    var tmp = ['<ul>'],
        src = player.config.url,
        a = document.createElement('a');
    if (player.switchURL) {
      ['mp4', 'hls', '__flv__', 'dash'].every(function (item) {
        if (player[item]) {
          if (player[item].url) {
            a.href = player[item].url;
          }
          if (item === '__flv__') {
            if (player[item]._options) {
              a.href = player[item]._options.url;
            } else {
              a.href = player[item]._mediaDataSource.url;
            }
          }
          src = a.href;
          return false;
        } else {
          return true;
        }
      });
    } else {
      src = player.currentSrc || player.src;
    }
    if (player['hls']) {
      a.href = player['hls'].url;
      src = a.href;
    }
    list.forEach(function (item) {
      a.href = item.url;
      if (player.dash) {
        tmp.push('<li url=\'' + item.url + '\' cname=\'' + item.name + '\' class=\'' + (item.selected ? 'selected' : '') + '\'>' + item.name + '</li>');
      } else {
        tmp.push('<li url=\'' + item.url + '\' cname=\'' + item.name + '\' class=\'' + (a.href === src ? 'selected' : '') + '\'>' + item.name + '</li>');
      }
    });
    var cursrc = list.filter(function (item) {
      a.href = item.url;
      if (player.dash) {
        return item.selected === true;
      } else {
        return a.href === src;
      }
    });
    tmp.push('</ul><p class=\'name\'>' + (cursrc[0] || { name: '' }).name + '</p>');
    var urlInRoot = root.querySelector('.xgplayer-definition');
    if (urlInRoot) {
      urlInRoot.innerHTML = tmp.join('');
      var cur = urlInRoot.querySelector('.name');
      if (!player.config.definitionActive || player.config.definitionActive === 'hover') {
        cur.addEventListener('mouseenter', function (e) {
          e.preventDefault();
          e.stopPropagation();
          util.addClass(player.root, 'xgplayer-definition-active');
          urlInRoot.focus();
        });
      }
    } else {
      container.innerHTML = tmp.join('');
      var _cur = container.querySelector('.name');
      if (!player.config.definitionActive || player.config.definitionActive === 'hover') {
        _cur.addEventListener('mouseenter', function (e) {
          e.preventDefault();
          e.stopPropagation();
          util.addClass(player.root, 'xgplayer-definition-active');
          container.focus();
        });
      }
      player.controls.appendChild(container);
    }
  }
  function onResourceReady(list) {
    player.definitionList = list;
    if (list && list instanceof Array && list.length > 1) {
      util.addClass(root, 'xgplayer-is-definition');
      player.on('canplay', onCanplayResourceReady);
    }
  }
  player.on('resourceReady', onResourceReady);

  function onCanplayChangeDefinition() {
    player.currentTime = player.curTime;
    if (!paused) {
      var playPromise = player.play();
      if (playPromise !== undefined && playPromise) {
        playPromise.catch(function (err) {});
      }
    }
  };
  ['touchend', 'click'].forEach(function (item) {
    container.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      var list = player.definitionList;
      var li = e.target || e.srcElement,
          a = document.createElement('a');
      if (li && li.tagName.toLocaleLowerCase() === 'li') {
        player.emit('beforeDefinitionChange', a.href);
        var from = void 0,
            to = void 0;
        Array.prototype.forEach.call(li.parentNode.childNodes, function (item) {
          if (util.hasClass(item, 'selected')) {
            from = item.getAttribute('cname');
            util.removeClass(item, 'selected');
          }
        });
        if (player.dash) {
          list.forEach(function (item) {
            item.selected = false;
            if (item.name === li.innerHTML) {
              item.selected = true;
            }
          });
        }

        util.addClass(li, 'selected');
        to = li.getAttribute('cname');
        li.parentNode.nextSibling.innerHTML = '' + li.getAttribute('cname');
        a.href = li.getAttribute('url');
        if (player.switchURL) {
          var curRUL = document.createElement('a');
          ['mp4', 'hls', '__flv__', 'dash'].every(function (item) {
            if (player[item]) {
              if (player[item].url) {
                curRUL.href = player[item].url;
              }
              if (item === '__flv__') {
                if (player[item]._options) {
                  curRUL.href = player[item]._options.url;
                } else {
                  curRUL.href = player[item]._mediaDataSource.url;
                }
              }
              return false;
            } else {
              return true;
            }
          });
          if (curRUL.href !== a.href && !player.ended) {
            player.switchURL(a.href);
          }
        } else {
          if (player['hls']) {
            var _curRUL = document.createElement('a');
            _curRUL = player['hls'].url;
          }
          if (a.href !== player.currentSrc) {
            player.curTime = player.currentTime, paused = player.paused;
            if (!player.ended) {
              player.src = a.href;
              player.once('canplay', onCanplayChangeDefinition);
            }
          }
        }
        player.emit('definitionChange', { from: from, to: to });
        if (sniffer.device === 'mobile') {
          util.removeClass(player.root, 'xgplayer-definition-active');
        }
      } else if (player.config.definitionActive === 'click' && li && (li.tagName.toLocaleLowerCase() === 'p' || li.tagName.toLocaleLowerCase() === 'em')) {
        if (sniffer.device === 'mobile') {
          util.toggleClass(player.root, 'xgplayer-definition-active');
        } else {
          util.addClass(player.root, 'xgplayer-definition-active');
        }
        container.focus();
      }
      player.emit('focus');
    }, false);
  });

  container.addEventListener('mouseleave', function (e) {
    e.preventDefault();
    e.stopPropagation();
    util.removeClass(root, 'xgplayer-definition-active');
  });

  function onBlur() {
    util.removeClass(root, 'xgplayer-definition-active');
  }
  player.on('blur', onBlur);

  function onDestroy() {
    player.off('resourceReady', onResourceReady);
    player.off('canplay', onCanplayResourceReady);
    player.off('canplay', onCanplayChangeDefinition);
    player.off('blur', onBlur);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

_player2.default.install('s_definition', s_definition);

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

var _loading = __webpack_require__(84);

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_loading = function s_loading() {
  var player = this;
  var root = player.root;
  var util = _player2.default.util;
  var container = util.createDom('xg-loading', '' + _loading2.default, {}, 'xgplayer-loading');
  player.once('ready', function () {
    root.appendChild(container);
  });
};

_player2.default.install('s_loading', s_loading);

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewbox=\"0 0 100 100\">\n  <path d=\"M100,50A50,50,0,1,1,50,0\"></path>\n</svg>\n");

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isRotateFullscreen = function isRotateFullscreen(player) {
  return _player2.default.util.hasClass(player.root, 'xgplayer-rotate-fullscreen');
};

var s_progress = function s_progress() {
  var player = this;
  var util = _player2.default.util;
  var container = util.createDom('xg-progress', '<xg-outer class="xgplayer-progress-outer">\n                                                   <xg-cache class="xgplayer-progress-cache"></xg-cache>\n                                                   <xg-played class="xgplayer-progress-played">\n                                                     <xg-progress-btn class="xgplayer-progress-btn"></xg-progress-btn>\n                                                     <xg-point class="xgplayer-progress-point xgplayer-tips"></xg-point>\n                                                     <xg-thumbnail class="xgplayer-progress-thumbnail xgplayer-tips"></xg-thumbnail>\n                                                   </xg-played>\n                                                 </xg-outer>', { tabindex: 1 }, 'xgplayer-progress');
  var containerWidth = void 0;
  player.controls.appendChild(container);
  var progress = container.querySelector('.xgplayer-progress-played');
  var btn = container.querySelector('.xgplayer-progress-btn');
  var outer = container.querySelector('.xgplayer-progress-outer');
  var cache = container.querySelector('.xgplayer-progress-cache');
  var point = container.querySelector('.xgplayer-progress-point');
  var thumbnail = container.querySelector('.xgplayer-progress-thumbnail');
  player.dotArr = {};
  function dotEvent(dotItem, text) {
    dotItem.addEventListener('mouseenter', function (e) {
      if (text) {
        util.addClass(dotItem, 'xgplayer-progress-dot-show');
        util.addClass(container, 'xgplayer-progress-dot-active');
      }
    });
    dotItem.addEventListener('mouseleave', function (e) {
      if (text) {
        util.removeClass(dotItem, 'xgplayer-progress-dot-show');
        util.removeClass(container, 'xgplayer-progress-dot-active');
      }
    });
    dotItem.addEventListener('touchend', function (e) {
      // e.preventDefault()
      e.stopPropagation();
      if (text) {
        if (!util.hasClass(dotItem, 'xgplayer-progress-dot-show')) {
          Object.keys(player.dotArr).forEach(function (key) {
            if (player.dotArr[key]) {
              util.removeClass(player.dotArr[key], 'xgplayer-progress-dot-show');
            }
          });
        }
        util.toggleClass(dotItem, 'xgplayer-progress-dot-show');
        util.toggleClass(container, 'xgplayer-progress-dot-active');
      }
    });
  }
  function onCanplay() {
    if (player.config.progressDot && util.typeOf(player.config.progressDot) === 'Array') {
      player.config.progressDot.forEach(function (item) {
        if (item.time >= 0 && item.time <= player.duration) {
          var dot = util.createDom('xg-progress-dot', item.text ? '<span class="xgplayer-progress-tip">' + item.text + '</span>' : '', {}, 'xgplayer-progress-dot');
          dot.style.left = item.time / player.duration * 100 + '%';
          if (item.duration >= 0) {
            dot.style.width = Math.min(item.duration, player.duration - item.time) / player.duration * 100 + '%';
          }
          outer.appendChild(dot);
          player.dotArr[item.time] = dot;
          dotEvent(dot, item.text);
        }
      });
    }
  }
  player.once('canplay', onCanplay);
  player.addProgressDot = function (time, text, duration) {
    if (player.dotArr[time]) {
      return;
    }
    if (time >= 0 && time <= player.duration) {
      var dot = util.createDom('xg-progress-dot', '', {}, 'xgplayer-progress-dot');
      dot.style.left = time / player.duration * 100 + '%';
      if (duration >= 0) {
        dot.style.width = Math.min(duration, player.duration - time) / player.duration * 100 + '%';
      }
      outer.appendChild(dot);
      player.dotArr[time] = dot;
      dotEvent(dot, text);
    }
  };
  player.removeProgressDot = function (time) {
    if (time >= 0 && time <= player.duration && player.dotArr[time]) {
      var dot = player.dotArr[time];
      dot.parentNode.removeChild(dot);
      dot = null;
      player.dotArr[time] = null;
    }
  };
  player.removeAllProgressDot = function () {
    Object.keys(player.dotArr).forEach(function (key) {
      if (player.dotArr[key]) {
        var dot = player.dotArr[key];
        dot.parentNode.removeChild(dot);
        dot = null;
        player.dotArr[key] = null;
      }
    });
  };
  var tnailPicNum = 0;
  var tnailWidth = 0;
  var tnailHeight = 0;
  var tnailCol = 0;
  var tnailRow = 0;
  var interval = 0;
  var tnailUrls = [];
  if (player.config.thumbnail) {
    tnailPicNum = player.config.thumbnail.pic_num;
    tnailWidth = player.config.thumbnail.width;
    tnailHeight = player.config.thumbnail.height;
    tnailCol = player.config.thumbnail.col;
    tnailRow = player.config.thumbnail.row;
    tnailUrls = player.config.thumbnail.urls;
    thumbnail.style.width = tnailWidth + 'px';
    thumbnail.style.height = tnailHeight + 'px';
  };

  if (typeof player.config.disableSwipeHandler === 'function' && typeof player.config.enableSwipeHandler === 'function') {
    player.root.addEventListener('touchmove', function (e) {
      e.preventDefault();
      // e.stopPropagation();
      if (!player.disableSwipe) {
        player.disableSwipe = true;
        player.config.disableSwipeHandler.call(player);
      }
    });
    player.root.addEventListener('touchstart', function (e) {
      // e.preventDefault();
      player.disableSwipe = true;
      player.config.disableSwipeHandler.call(player);
    });
    player.root.addEventListener('touchend', function (e) {
      // e.preventDefault();
      player.disableSwipe = false;
      player.config.enableSwipeHandler.call(player);
    });
  };

  ['touchstart', 'mousedown'].forEach(function (item) {
    container.addEventListener(item, function (e) {
      if (player.config.disableProgress) return;
      // e.preventDefault()
      e.stopPropagation();
      util.event(e);
      if (e._target === point || !player.config.allowSeekAfterEnded && player.ended) {
        return true;
      }

      container.focus();

      var _progress$getBounding = progress.getBoundingClientRect(),
          left = _progress$getBounding.left;

      var isRotate = isRotateFullscreen(player);
      if (isRotate) {
        left = progress.getBoundingClientRect().top;
        containerWidth = container.getBoundingClientRect().height;
      } else {
        containerWidth = container.getBoundingClientRect().width;
        left = progress.getBoundingClientRect().left;
      }

      var move = function move(e) {
        // e.preventDefault()
        e.stopPropagation();
        util.event(e);
        player.isProgressMoving = true;
        var w = (isRotate ? e.clientY : e.clientX) - left;
        if (w > containerWidth) {
          w = containerWidth;
        }
        var now = w / containerWidth * player.duration;
        progress.style.width = w * 100 / containerWidth + '%';

        if (player.videoConfig.mediaType === 'video' && !player.dash && !player.config.closeMoveSeek) {
          player.currentTime = Number(now).toFixed(1);
        } else {
          var time = util.findDom(player.controls, '.xgplayer-time');
          if (time) {
            time.innerHTML = '<span class="xgplayer-time-current">' + util.format(now || 0) + '</span><span>' + util.format(player.duration) + '</span>';
          }
        }
        player.emit('focus');
      };
      var up = function up(e) {
        // e.preventDefault()
        e.stopPropagation();
        util.event(e);
        window.removeEventListener('mousemove', move);
        window.removeEventListener('touchmove', move, { passive: false });
        window.removeEventListener('mouseup', up);
        window.removeEventListener('touchend', up);
        container.blur();
        if (!player.isProgressMoving || player.videoConfig.mediaType === 'audio' || player.dash || player.config.closeMoveSeek) {
          var w = (isRotate ? e.clientY : e.clientX) - left;
          if (w > containerWidth) {
            w = containerWidth;
          }
          var now = w / containerWidth * player.duration;
          progress.style.width = w * 100 / containerWidth + '%';
          player.currentTime = Number(now).toFixed(1);
        }
        player.emit('focus');
        player.isProgressMoving = false;
      };
      window.addEventListener('mousemove', move);
      window.addEventListener('touchmove', move, { passive: false });
      window.addEventListener('mouseup', up);
      window.addEventListener('touchend', up);
      return true;
    });
  });

  container.addEventListener('mouseenter', function (e) {
    if (!player.config.allowSeekAfterEnded && player.ended) {
      return true;
    }
    var isRotate = isRotateFullscreen(player);
    var containerLeft = isRotate ? container.getBoundingClientRect().top : container.getBoundingClientRect().left;
    var containerWidth = isRotate ? container.getBoundingClientRect().height : container.getBoundingClientRect().width;

    var compute = function compute(e) {
      var now = ((isRotate ? e.clientY : e.clientX) - containerLeft) / containerWidth * player.duration;
      now = now < 0 ? 0 : now;
      point.textContent = util.format(now);
      var pointWidth = point.getBoundingClientRect().width;
      if (player.config.thumbnail) {
        interval = player.duration / tnailPicNum;
        var index = Math.floor(now / interval);
        thumbnail.style.backgroundImage = 'url(' + tnailUrls[Math.ceil((index + 1) / (tnailCol * tnailRow)) - 1] + ')';
        var indexInPage = index + 1 - tnailCol * tnailRow * (Math.ceil((index + 1) / (tnailCol * tnailRow)) - 1);
        var tnaiRowIndex = Math.ceil(indexInPage / tnailRow) - 1;
        var tnaiColIndex = indexInPage - tnaiRowIndex * tnailRow - 1;
        thumbnail.style['background-position'] = '-' + tnaiColIndex * tnailWidth + 'px -' + tnaiRowIndex * tnailHeight + 'px';
        var left = (isRotate ? e.clientY : e.clientX) - containerLeft - tnailWidth / 2;
        left = left > 0 ? left : 0;
        left = left < containerWidth - tnailWidth ? left : containerWidth - tnailWidth;
        thumbnail.style.left = left + 'px';
        thumbnail.style.top = -10 - tnailHeight + 'px';
        thumbnail.style.display = 'block';
        point.style.left = left + tnailWidth / 2 - pointWidth / 2 + 'px';
      } else {
        var _left = e.clientX - containerLeft - pointWidth / 2;
        _left = _left > 0 ? _left : 0;
        _left = _left > containerWidth - pointWidth ? containerWidth - pointWidth : _left;
        point.style.left = _left + 'px';
      }
      if (util.hasClass(container, 'xgplayer-progress-dot-active')) {
        point.style.display = 'none';
      } else {
        point.style.display = 'block';
      }
    };
    var move = function move(e) {
      compute(e);
    };
    var leave = function leave(e) {
      container.removeEventListener('mousemove', move, false);
      container.removeEventListener('mouseleave', leave, false);
      compute(e);
      point.style.display = 'none';
      thumbnail.style.display = 'none';
    };
    container.addEventListener('mousemove', move, false);
    container.addEventListener('mouseleave', leave, false);
    compute(e);
  }, false);

  // let lastBtnLeft = false
  var onTimeupdate = function onTimeupdate() {
    if (!containerWidth && container) {
      containerWidth = container.getBoundingClientRect().width;
    }
    if (player.videoConfig.mediaType !== 'audio' || !player.isProgressMoving || !player.dash) {
      var precent = player.currentTime / player.duration;
      var prevPrecent = Number(progress.style.width.replace('%', '') || '0') / Number(container.style.width || '100');
      if (Math.abs(precent - prevPrecent) <= 1) {
        progress.style.width = player.currentTime * 100 / player.duration + '%';
      }
    }
  };
  player.on('timeupdate', onTimeupdate);

  var onCurrentTimeChange = function onCurrentTimeChange() {
    progress.style.width = player.currentTime * 100 / player.duration + '%';
  };
  player.on('currentTimeChange', onCurrentTimeChange);

  var onSrcChange = function onSrcChange() {
    progress.style.width = '0%';
  };
  player.on('srcChange', onSrcChange);

  var onCacheUpdate = function onCacheUpdate() {
    var buffered = player.buffered;
    if (buffered && buffered.length > 0) {
      var end = buffered.end(buffered.length - 1);
      for (var i = 0, len = buffered.length; i < len; i++) {
        if (player.currentTime >= buffered.start(i) && player.currentTime <= buffered.end(i)) {
          end = buffered.end(i);
          for (var j = i + 1; j < buffered.length; j++) {
            if (buffered.start(j) - buffered.end(j - 1) >= 2) {
              end = buffered.end(j - 1);
              break;
            }
          }
          break;
        }
      }
      cache.style.width = end / player.duration * 100 + '%';
    }
  };
  var cacheUpdateEvents = ['bufferedChange', 'cacheupdate', 'ended', 'timeupdate'];
  cacheUpdateEvents.forEach(function (item) {
    player.on(item, onCacheUpdate);
  });

  function destroyFunc() {
    player.removeAllProgressDot();
    player.off('canplay', onCanplay);
    player.off('timeupdate', onTimeupdate);
    player.off('currentTimeChange', onCurrentTimeChange);
    player.off('srcChange', onSrcChange);
    cacheUpdateEvents.forEach(function (item) {
      player.off(item, onCacheUpdate);
    });
    player.off('destroy', destroyFunc);
  }
  player.once('destroy', destroyFunc);
};

_player2.default.install('s_progress', s_progress);

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_time = function s_time() {
  var player = this;
  var root = player.root;
  var util = _player2.default.util;
  var container = util.createDom('xg-time', '<span class="xgplayer-time-current">' + (player.currentTime || util.format(0)) + '</span>\n                                           <span>' + (player.duration || util.format(0)) + '</span>', {}, 'xgplayer-time');
  player.once('ready', function () {
    player.controls.appendChild(container);
  });
  var onTimeChange = function onTimeChange() {
    // let liveText = player.lang.LIVE
    // if(player.duration === Infinity) {
    //   util.addClass(player.root, 'xgplayer-is-live')
    //   if(!util.findDom(player.root, '.xgplayer-live')) {
    //     const live = util.createDom('xg-live', liveText, {}, 'xgplayer-live')
    //     player.controls.appendChild(live)
    //   }
    // }
    if (player.videoConfig.mediaType !== 'audio' || !player.isProgressMoving || !player.dash) {
      container.innerHTML = '<span class="xgplayer-time-current">' + util.format(player.currentTime || 0) + '</span>' + ('<span>' + util.format(player.duration) + '</span>');
    }
  };
  player.on('durationchange', onTimeChange);
  player.on('timeupdate', onTimeChange);

  function onDestroy() {
    player.off('durationchange', onTimeChange);
    player.off('timeupdate', onTimeChange);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

_player2.default.install('s_time', s_time);

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

var _replay = __webpack_require__(88);

var _replay2 = _interopRequireDefault(_replay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_replay = function s_replay() {
  var player = this;
  var util = _player2.default.util;
  var root = player.root;

  var replayText = player.lang.REPLAY;
  var btn = util.createDom('xg-replay', _replay2.default + '\n                                         <xg-replay-txt class="xgplayer-replay-txt">' + replayText + '</xg-replay-txt>\n                                        ', {}, 'xgplayer-replay');
  player.once('ready', function () {
    root.appendChild(btn);
  });

  function onEnded() {
    var path = btn.querySelector('path');
    if (path) {
      var transform = window.getComputedStyle(path).getPropertyValue('transform');
      if (typeof transform === 'string' && transform.indexOf('none') > -1) {
        return;
      } else {
        path.setAttribute('transform', transform);
      }
    }
  }
  player.on('ended', onEnded);

  var svg = btn.querySelector('svg');

  ['click', 'touchend'].forEach(function (item) {
    svg.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.emit('replayBtnClick');
    });
  });

  function destroyFunc() {
    player.off('ended', onEnded);
    player.off('destroy', destroyFunc);
  }
  player.once('destroy', destroyFunc);
};

_player2.default.install('s_replay', s_replay);

/***/ }),
/* 88 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg class=\"xgplayer-replay-svg\" xmlns=\"http://www.w3.org/2000/svg\" width=\"78\" height=\"78\" viewbox=\"0 0 78 78\">\n  <path d=\"M8.22708362,13.8757234 L11.2677371,12.6472196 C11.7798067,12.4403301 12.3626381,12.6877273 12.5695276,13.1997969 L12.9441342,14.1269807 C13.1510237,14.6390502 12.9036264,15.2218816 12.3915569,15.4287712 L6.8284538,17.6764107 L5.90126995,18.0510173 C5.38920044,18.2579068 4.80636901,18.0105096 4.5994795,17.49844 L1.97723335,11.0081531 C1.77034384,10.4960836 2.0177411,9.91325213 2.52981061,9.70636262 L3.45699446,9.33175602 C3.96906396,9.12486652 4.5518954,9.37226378 4.75878491,9.88433329 L5.67885163,12.1615783 C7.99551726,6.6766934 13.3983951,3 19.5,3 C27.7842712,3 34.5,9.71572875 34.5,18 C34.5,26.2842712 27.7842712,33 19.5,33 C15.4573596,33 11.6658607,31.3912946 8.87004692,28.5831991 C8.28554571,27.9961303 8.28762719,27.0463851 8.87469603,26.4618839 C9.46176488,25.8773827 10.4115101,25.8794641 10.9960113,26.466533 C13.2344327,28.7147875 16.263503,30 19.5,30 C26.127417,30 31.5,24.627417 31.5,18 C31.5,11.372583 26.127417,6 19.5,6 C14.4183772,6 9.94214483,9.18783811 8.22708362,13.8757234 Z\"></path>\n</svg>\n");

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_playbackRate = function s_playbackRate() {
  var player = this;
  var sniffer = _player2.default.sniffer;
  var util = _player2.default.util;
  if (player.config.playbackRate) {
    player.config.playbackRate.sort(function (a, b) {
      return b - a;
    });
  } else {
    return false;
  }
  var container = util.createDom('xg-playbackrate', " ", {}, 'xgplayer-playbackrate');
  if (sniffer.device === 'mobile') {
    player.config.playbackRateActive = 'click';
  }

  var list = [];
  player.config.playbackRate.forEach(function (item) {
    list.push({ name: '' + item, rate: item + 'x', selected: false });
  });
  var selectedSpeed = 1;
  var tmp = ['<ul>'];
  list.forEach(function (item) {
    if (player.config.defaultPlaybackRate && player.config.defaultPlaybackRate.toString() === item.name) {
      item.selected = true;
      selectedSpeed = player.config.defaultPlaybackRate;
      player.once('playing', function () {
        player.video.playbackRate = player.config.defaultPlaybackRate;
      });
    } else if (item.name === '1.0' || item.name === '1') {
      if (!player.config.defaultPlaybackRate || player.config.defaultPlaybackRate === 1) {
        item.selected = true;
      }
    }
    tmp.push('<li cname=\'' + item.name + '\' class=\'' + (item.selected ? 'selected' : '') + '\'>' + item.rate + '</li>');
  });
  tmp.push('</ul><p class=\'name\'>' + selectedSpeed + 'x</p>');
  var playbackDom = player.root.querySelector('.xgplayer-playbackrate');
  if (playbackDom) {
    playbackDom.innerHTML = tmp.join('');
    var cur = playbackDom.querySelector('.name');
    if (!player.config.playbackRateActive || player.config.playbackRateActive === 'hover') {
      cur.addEventListener('mouseenter', function (e) {
        e.preventDefault();
        e.stopPropagation();
        util.addClass(player.root, 'xgplayer-playbackrate-active');
        playbackDom.focus();
      });
    }
  } else {
    container.innerHTML = tmp.join('');
    var _cur = container.querySelector('.name');
    if (!player.config.playbackRateActive || player.config.playbackRateActive === 'hover') {
      _cur.addEventListener('mouseenter', function (e) {
        e.preventDefault();
        e.stopPropagation();
        util.addClass(player.root, 'xgplayer-playbackrate-active');
        container.focus();
      });
    }
    player.once('ready', function () {
      player.controls.appendChild(container);
    });
  }

  var ev = ['touchend', 'click'];
  ev.forEach(function (item) {
    container.addEventListener(item, function (e) {
      e.stopPropagation();
      e.preventDefault();
      var li = e.target;
      if (li && li.tagName.toLocaleLowerCase() === 'li') {
        var from = void 0,
            to = void 0;
        list.forEach(function (item) {
          item.selected = false;
          if (li.textContent.replace(/\s+/g, "") === item.rate) {
            Array.prototype.forEach.call(li.parentNode.childNodes, function (item) {
              if (util.hasClass(item, 'selected')) {
                from = Number(item.getAttribute('cname'));
                util.removeClass(item, 'selected');
              }
            });
            item.selected = true;
            player.video.playbackRate = item.name * 1;
            selectedSpeed = item.name * 1;
          }
        });
        util.addClass(li, 'selected');
        to = Number(li.getAttribute('cname'));
        li.parentNode.nextSibling.innerHTML = li.getAttribute('cname') + 'x';
        player.emit('playbackrateChange', { from: from, to: to });
        if (sniffer.device === 'mobile') {
          util.removeClass(player.root, 'xgplayer-playbackrate-active');
        }
      } else if (player.config.playbackRateActive === 'click' && li && (li.tagName.toLocaleLowerCase() === 'p' || li.tagName.toLocaleLowerCase() === 'span')) {
        if (sniffer.device === 'mobile') {
          util.toggleClass(player.root, 'xgplayer-playbackrate-active');
        } else {
          util.addClass(player.root, 'xgplayer-playbackrate-active');
        }
        container.focus();
      }
      player.emit('focus');
    }, false);
  });
  container.addEventListener('mouseleave', function (e) {
    e.preventDefault();
    e.stopPropagation();
    util.removeClass(player.root, 'xgplayer-playbackrate-active');
  });

  function onBlur() {
    util.removeClass(player.root, 'xgplayer-playbackrate-active');
  }
  player.on('blur', onBlur);

  player.on('play', function () {
    if (player.video.playbackRate.toFixed(1) !== selectedSpeed.toFixed(1)) {
      player.video.playbackRate = selectedSpeed;
    }
  });
};

_player2.default.install('s_playbackRate', s_playbackRate);

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_localPreview = function s_localPreview() {
  var player = this;
  var root = player.root;
  var util = _player2.default.util;
  if (player.config.preview && player.config.preview.uploadEl) {
    var preview = util.createDom('xg-preview', '<input type="file">', {}, 'xgplayer-preview');
    var upload = preview.querySelector('input');
    player.config.preview.uploadEl.appendChild(preview);
    upload.onchange = function () {
      player.emit('upload', upload);
    };
  }
};

_player2.default.install('s_localPreview', s_localPreview);

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

var _download = __webpack_require__(92);

var _download2 = _interopRequireDefault(_download);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_download = function s_download() {
  var player = this;
  var util = _player2.default.util;
  if (!player.config.download) {
    return;
  }
  var btn = util.createDom('xg-download', '<xg-icon class="xgplayer-icon">' + _download2.default + '</xg-icon>', {}, 'xgplayer-download');

  var tipsText = player.lang.DOWNLOAD_TIPS;
  var tips = util.createDom('xg-tips', '<span class="xgplayer-tip-download">' + tipsText + '</span>', {}, 'xgplayer-tips');
  btn.appendChild(tips);
  player.once('ready', function () {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.emit('downloadBtnClick');
    });
  });
};

_player2.default.install('s_download', s_download);

/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\">\n  <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n    <g transform=\"translate(-488.000000, -340.000000)\" fill=\"#FFFFFF\">\n      <g id=\"Group-2\">\n        <g id=\"volme_big-copy\" transform=\"translate(488.000000, 340.000000)\">\n          <rect id=\"Rectangle-18\" x=\"11\" y=\"4\" width=\"2\" height=\"12\" rx=\"1\"></rect>\n          <rect id=\"Rectangle-2\" x=\"3\" y=\"18\" width=\"18\" height=\"2\" rx=\"1\"></rect>\n          <rect id=\"Rectangle-2\" transform=\"translate(4.000000, 17.500000) rotate(90.000000) translate(-4.000000, -17.500000) \" x=\"1.5\" y=\"16.5\" width=\"5\" height=\"2\" rx=\"1\"></rect><rect id=\"Rectangle-2-Copy-3\" transform=\"translate(20.000000, 17.500000) rotate(90.000000) translate(-20.000000, -17.500000) \" x=\"17.5\" y=\"16.5\" width=\"5\" height=\"2\" rx=\"1\"></rect>\n          <path d=\"M9.48791171,8.26502656 L9.48791171,14.2650266 C9.48791171,14.8173113 9.04019646,15.2650266 8.48791171,15.2650266 C7.93562696,15.2650266 7.48791171,14.8173113 7.48791171,14.2650266 L7.48791171,7.26502656 C7.48791171,6.71274181 7.93562696,6.26502656 8.48791171,6.26502656 L15.4879117,6.26502656 C16.0401965,6.26502656 16.4879117,6.71274181 16.4879117,7.26502656 C16.4879117,7.81731131 16.0401965,8.26502656 15.4879117,8.26502656 L9.48791171,8.26502656 Z\" id=\"Combined-Shape\" transform=\"translate(11.987912, 10.765027) scale(1, -1) rotate(45.000000) translate(-11.987912, -10.765027) \"></path>\n        </g>\n      </g>\n    </g>\n  </g>\n</svg>\n");

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

var _danmu = __webpack_require__(94);

var _danmu2 = _interopRequireDefault(_danmu);

var _panel = __webpack_require__(96);

var _panel2 = _interopRequireDefault(_panel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_danmu = function s_danmu() {
  var player = this;
  var root = player.root;
  var util = _player2.default.util;
  if (!player.config.danmu) {
    return;
  }
  var container = util.createDom('xg-danmu', '', {}, 'xgplayer-danmu');
  player.once('ready', function () {
    root.appendChild(container);
  });
  var config = util.deepCopy({
    container: container,
    player: player.video,
    comments: [],
    area: {
      start: 0,
      end: 1
    }
  }, player.config.danmu);
  var panelBtn = void 0;
  if (player.config.danmu.panel) {
    panelBtn = _player2.default.util.createDom('xg-panel', '<xg-panel-icon class="xgplayer-panel-icon">\n                                                ' + _panel2.default + '\n                                              </xg-panel-icon>\n                                              <xg-panel-slider class="xgplayer-panel-slider">\n                                                <xg-hidemode class="xgplayer-hidemode">\n                                                  <p class="xgplayer-hidemode-font">\u5C4F\u853D\u7C7B\u578B</p>\n                                                  <ul class="xgplayer-hidemode-radio">\n                                                    <li class="xgplayer-hidemode-scroll" id="false">\u6EDA\u52A8</li><li class="xgplayer-hidemode-top" id="false">\u9876\u90E8</li><li class="xgplayer-hidemode-bottom" id="false">\u5E95\u90E8</li><li class="xgplayer-hidemode-color" id="false">\u8272\u5F69</li>\n                                                  </ul>\n                                                </xg-hidemode>\n                                                <xg-transparency class="xgplayer-transparency">\n                                                  <span>\u4E0D\u900F\u660E\u5EA6</span>\n                                                  <input class="xgplayer-transparency-line xgplayer-transparency-color xgplayer-transparency-bar xgplayer-transparency-gradient" type="range" min="0" max="100" step="0.1" value="50"></input>\n                                                </xg-transparency>\n                                                <xg-showarea class="xgplayer-showarea">\n                                                  <div class="xgplayer-showarea-name">\u663E\u793A\u533A\u57DF</div>\n                                                  <div class="xgplayer-showarea-control">\n                                                    <div class="xgplayer-showarea-control-up">\n                                                      <span class="xgplayer-showarea-control-up-item xgplayer-showarea-onequarters">1/4</span>\n                                                      <span class="xgplayer-showarea-control-up-item xgplayer-showarea-twoquarters selected-color">1/2</span>\n                                                      <span class="xgplayer-showarea-control-up-item xgplayer-showarea-threequarters">3/4</span>\n                                                      <span class="xgplayer-showarea-control-up-item xgplayer-showarea-full">1</span>\n                                                    </div>\n                                                    <div class="xgplayer-showarea-control-down">\n                                                      <div class="xgplayer-showarea-control-down-dots">\n                                                        <span class="xgplayer-showarea-onequarters-dot"></span>\n                                                        <span class="xgplayer-showarea-twoquarters-dot"></span>\n                                                        <span class="xgplayer-showarea-threequarters-dot"></span>\n                                                        <span class="xgplayer-showarea-full-dot"></span>\n                                                      </div>\n                                                      <input class="xgplayer-showarea-line xgplayer-showarea-color xgplayer-showarea-bar xgplayer-gradient" type="range" min="1" max="4" step="1" value="1">\n                                                    </div>\n                                                  </div>\n                                                </xg-showarea>\n                                                <xg-danmuspeed class="xgplayer-danmuspeed">\n                                                  <div class="xgplayer-danmuspeed-name">\u5F39\u5E55\u901F\u5EA6</div>\n                                                  <div class="xgplayer-danmuspeed-control">\n                                                    <div class="xgplayer-danmuspeed-control-up">\n                                                      <span class="xgplayer-danmuspeed-control-up-item xgplayer-danmuspeed-small">\u6162</span>\n                                                      <span class="xgplayer-danmuspeed-control-up-item xgplayer-danmuspeed-middle selected-color">\u4E2D</span>\n                                                      <span class="xgplayer-danmuspeed-control-up-item xgplayer-danmuspeed-large">\u5FEB</span>\n                                                    </div>\n                                                    <div class="xgplayer-danmuspeed-control-down">\n                                                      <div class="xgplayer-danmuspeed-control-down-dots">\n                                                        <span class="xgplayer-danmuspeed-small-dot"></span>\n                                                        <span class="xgplayer-danmuspeed-middle-dot"></span>\n                                                        <span class="xgplayer-danmuspeed-large-dot"></span>\n                                                      </div>\n                                                      <input class="xgplayer-danmuspeed-line xgplayer-danmuspeed-color xgplayer-danmuspeed-bar xgplayer-gradient" type="range" min="50" max="150" step="50" value="100">\n                                                    </div>\n                                                  </div>\n                                                </xg-danmuspeed>\n                                                <xg-danmufont class="xgplayer-danmufont">\n                                                  <div class="xgplayer-danmufont-name">\u5B57\u4F53\u5927\u5C0F</div>\n                                                  <div class="xgplayer-danmufont-control">\n                                                    <div class="xgplayer-danmufont-control-up">\n                                                      <span class="xgplayer-danmufont-control-up-item xgplayer-danmufont-small">\u5C0F</span>\n                                                      <span class="xgplayer-danmufont-control-up-item xgplayer-danmufont-middle">\u4E2D</span>\n                                                      <span class="xgplayer-danmufont-control-up-item xgplayer-danmufont-large selected-color">\u5927</span>\n                                                    </div>\n                                                    <div class="xgplayer-danmufont-control-down">\n                                                      <div class="xgplayer-danmufont-control-down-dots">\n                                                        <span class="xgplayer-danmufont-small-dot"></span>\n                                                        <span class="xgplayer-danmufont-middle-dot"></span>\n                                                        <span class="xgplayer-danmufont-large-dot"></span>\n                                                      </div>\n                                                      <input class="xgplayer-danmufont-line xgplayer-danmufont-color xgplayer-danmufont-bar xgplayer-gradient" type="range" min="20" max="30" step="5" value="25">\n                                                    </div>\n                                                  </div>\n                                                </xg-danmufont>\n                                              </xg-panel-slider>', { tabindex: 7 }, 'xgplayer-panel');
    player.once('ready', function () {
      player.controls.appendChild(panelBtn);
    });
  }
  player.once('complete', function () {
    var danmujs = new _danmu2.default(config);
    player.emit('initDefaultDanmu', danmujs);
    player.danmu = danmujs;

    if (!player.config.danmu.panel) {
      return;
    }

    var slider = panelBtn.querySelector('.xgplayer-panel-slider');
    var focusStatus = void 0;
    var focusarray = ['mouseenter', 'touchend', 'click'];
    focusarray.forEach(function (item) {
      panelBtn.addEventListener(item, function (e) {
        e.preventDefault();
        e.stopPropagation();
        _player2.default.util.addClass(slider, 'xgplayer-panel-active');
        panelBtn.focus();
        focusStatus = true;
      });
    });
    panelBtn.addEventListener('mouseleave', function (e) {
      e.preventDefault();
      e.stopPropagation();
      _player2.default.util.removeClass(slider, 'xgplayer-panel-active');
      focusStatus = false;
    });
    slider.addEventListener('mouseleave', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (focusStatus === false) {
        _player2.default.util.removeClass(slider, 'xgplayer-panel-active');
      }
    });

    var danmuConfig = player.config.danmu;
    var hidemodeScroll = panelBtn.querySelector('.xgplayer-hidemode-scroll');
    var hidemodeTop = panelBtn.querySelector('.xgplayer-hidemode-top');
    var hidemodeBottom = panelBtn.querySelector('.xgplayer-hidemode-bottom');
    var hidemodeColor = panelBtn.querySelector('.xgplayer-hidemode-color');
    var hidemodeArray = {
      'scroll': hidemodeScroll,
      'top': hidemodeTop,
      'bottom': hidemodeBottom,
      'color': hidemodeColor
    };

    var _loop = function _loop(key) {
      var keys = key;
      var ev = ['touchend', 'click'];
      ev.forEach(function (item) {
        hidemodeArray[keys].addEventListener(item, function (e) {
          if (hidemodeArray[keys].getAttribute('id') !== 'true') {
            hidemodeArray[keys].style.color = '#f85959';
            hidemodeArray[keys].setAttribute('id', 'true');
            player.danmu.hide(keys);
          } else {
            hidemodeArray[keys].style.color = '#aaa';
            hidemodeArray[keys].setAttribute('id', 'false');
            player.danmu.show(keys);
          }
        });
      });
    };

    for (var key in hidemodeArray) {
      _loop(key);
    }
    var transparency = panelBtn.querySelector('.xgplayer-transparency-line');
    var transparencyGradient = panelBtn.querySelector('.xgplayer-transparency-gradient');
    var transparencyValue = 50;
    transparencyGradient.style.background = 'linear-gradient(to right, #f85959 0%, #f85959 ' + transparencyValue + '%, #aaa ' + transparencyValue + '%, #aaa)';
    transparency.addEventListener('input', function (e) {
      e.preventDefault();
      e.stopPropagation();
      transparencyValue = e.target.value;
      transparencyGradient.style.background = 'linear-gradient(to right, #f85959 0%, #f85959 ' + transparencyValue + '%, #aaa ' + transparencyValue + '%, #aaa)';
      danmuConfig.comments.forEach(function (item) {
        item.style.opacity = transparencyValue / 100;
      });
    });
    var showarea = panelBtn.querySelector('.xgplayer-showarea-line');
    showarea.addEventListener('input', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var showareaValue = e.target.value;
      player.danmu.config.area.end = showareaValue / 100;
      player.config.danmu.area.end = showareaValue / 100;
      player.danmu.bulletBtn.main.channel.resize();
    });
    var danmuspeed = panelBtn.querySelector('.xgplayer-danmuspeed-line');
    danmuspeed.addEventListener('input', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var danmuspeedValue = e.target.value;
      danmuConfig.comments.forEach(function (item) {
        item.duration = (200 - danmuspeedValue) * 100;
      });
    });
    var danmufont = panelBtn.querySelector('.xgplayer-danmufont-line');
    danmufont.addEventListener('input', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var danmufontValue = e.target.value;
      danmuConfig.comments.forEach(function (item) {
        item.style.fontSize = danmufontValue + 'px';
      });
    });
    if (navigator.userAgent.indexOf("Firefox") > -1) {
      for (var i = 0; i < slider.querySelectorAll('input').length; i++) {
        slider.querySelectorAll('input')[i].style.marginTop = '10px';
      }
    }
  });
};

_player2.default.install('s_danmu', s_danmu);

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (t, e) {
  "object" == ( false ? undefined : _typeof(exports)) && "object" == ( false ? undefined : _typeof(module)) ? module.exports = e() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (e),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(window, function () {
  return function (t) {
    var e = {};function n(i) {
      if (e[i]) return e[i].exports;var o = e[i] = { i: i, l: !1, exports: {} };return t[i].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
    }return n.m = t, n.c = e, n.d = function (t, e, i) {
      n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i });
    }, n.r = function (t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 });
    }, n.t = function (t, e) {
      if (1 & e && (t = n(t)), 8 & e) return t;if (4 & e && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && t && t.__esModule) return t;var i = Object.create(null);if (n.r(i), Object.defineProperty(i, "default", { enumerable: !0, value: t }), 2 & e && "string" != typeof t) for (var o in t) {
        n.d(i, o, function (e) {
          return t[e];
        }.bind(null, o));
      }return i;
    }, n.n = function (t) {
      var e = t && t.__esModule ? function () {
        return t.default;
      } : function () {
        return t;
      };return n.d(e, "a", e), e;
    }, n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }, n.p = "", n(n.s = 3);
  }([function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var i = { createDom: function createDom() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "div",
            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
            n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "",
            o = document.createElement(t);return o.className = i, o.innerHTML = e, Object.keys(n).forEach(function (e) {
          var i = e,
              r = n[e];"video" === t || "audio" === t ? r && o.setAttribute(i, r) : o.setAttribute(i, r);
        }), o;
      }, hasClass: function hasClass(t, e) {
        return t.classList ? Array.prototype.some.call(t.classList, function (t) {
          return t === e;
        }) : !!t.className.match(new RegExp("(\\s|^)" + e + "(\\s|$)"));
      }, addClass: function addClass(t, e) {
        t.classList ? e.replace(/(^\s+|\s+$)/g, "").split(/\s+/g).forEach(function (e) {
          e && t.classList.add(e);
        }) : i.hasClass(t, e) || (t.className += " " + e);
      }, removeClass: function removeClass(t, e) {
        t.classList ? e.split(/\s+/g).forEach(function (e) {
          t.classList.remove(e);
        }) : i.hasClass(t, e) && e.split(/\s+/g).forEach(function (e) {
          var n = new RegExp("(\\s|^)" + e + "(\\s|$)");t.className = t.className.replace(n, " ");
        });
      }, toggleClass: function toggleClass(t, e) {
        e.split(/\s+/g).forEach(function (e) {
          i.hasClass(t, e) ? i.removeClass(t, e) : i.addClass(t, e);
        });
      }, findDom: function findDom() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document,
            e = arguments[1],
            n = void 0;try {
          n = t.querySelector(e);
        } catch (i) {
          e.startsWith("#") && (n = t.getElementById(e.slice(1)));
        }return n;
      }, deepCopy: function deepCopy(t, e) {
        if ("Object" === i.typeOf(e) && "Object" === i.typeOf(t)) return Object.keys(e).forEach(function (n) {
          "Object" !== i.typeOf(e[n]) || e[n] instanceof Node ? "Array" === i.typeOf(e[n]) ? t[n] = "Array" === i.typeOf(t[n]) ? t[n].concat(e[n]) : e[n] : t[n] = e[n] : t[n] ? i.deepCopy(t[n], e[n]) : t[n] = e[n];
        }), t;
      }, typeOf: function typeOf(t) {
        return Object.prototype.toString.call(t).match(/([^\s.*]+)(?=]$)/g)[0];
      }, copyDom: function copyDom(t) {
        if (t && 1 === t.nodeType) {
          var e = document.createElement(t.tagName);return Array.prototype.forEach.call(t.attributes, function (t) {
            e.setAttribute(t.name, t.value);
          }), t.innerHTML && (e.innerHTML = t.innerHTML), e;
        }return "";
      }, formatTime: function formatTime(t) {
        var e = Math.floor(t);return 1e3 * e + (t - e);
      }, offInDestroy: function offInDestroy(t, e, n, i) {
        t.once(i, function o() {
          t.off(e, n), t.off(i, o);
        });
      }, on: function on(t, e, n, o) {
        if (o) t.on(e, n), i.offInDestroy(t, e, n, o);else {
          t.on(e, function i(o) {
            n(o), t.off(e, i);
          });
        }
      } };e.default = i, t.exports = e.default;
  }, function (t, e, n) {
    "use strict";
    var i = n(18)();t.exports = function (t) {
      return t !== i && null !== t;
    };
  }, function (t, e, n) {
    "use strict";
    t.exports = function (t) {
      return null != t;
    };
  }, function (t, e, n) {
    t.exports = n(4);
  }, function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var i,
        o = n(5),
        r = (i = o) && i.__esModule ? i : { default: i };n(30), e.default = r.default, t.exports = e.default;
  }, function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var i = function () {
      function t(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
        }
      }return function (e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
      };
    }(),
        o = u(n(6)),
        r = u(n(25)),
        a = u(n(29)),
        s = u(n(0));function u(t) {
      return t && t.__esModule ? t : { default: t };
    }var l = function () {
      function t(e) {
        !function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, t);var n = this;if (n.config = s.default.deepCopy({ overlap: !1, area: { start: 0, end: 1 }, live: !1, comments: [], direction: "r2l" }, e), n.hideArr = [], n.domObj = new a.default(), (0, o.default)(n), n.config.comments.forEach(function (t) {
          t.duration = t.duration ? t.duration : 5e3, t.mode || (t.mode = "scroll");
        }), !n.config.container || 1 !== n.config.container.nodeType) return n.emit("error", "container id can't be empty"), !1;if (n.container = n.config.container, n.config.containerStyle) {
          var i = n.config.containerStyle;Object.keys(i).forEach(function (t) {
            n.container.style[t] = i[t];
          });
        }n.live = n.config.live, n.player = n.config.player, n.direction = n.config.direction, s.default.addClass(n.container, "danmu"), n.bulletBtn = new r.default(n), n.emit("ready");
      }return i(t, [{ key: "start", value: function value() {
          this.bulletBtn.main.start();
        } }, { key: "pause", value: function value() {
          this.bulletBtn.main.pause();
        } }, { key: "play", value: function value() {
          this.bulletBtn.main.play();
        } }, { key: "stop", value: function value() {
          this.bulletBtn.main.stop();
        } }, { key: "destroy", value: function value() {
          for (var t in this.stop(), this.bulletBtn.destroy(), this.domObj.destroy(), this) {
            delete this[t];
          }this.emit("destroy");
        } }, { key: "sendComment", value: function value(t) {
          t.duration || (t.duration = 15e3), t && t.id && t.duration && (t.el || t.txt) && (t.duration = t.duration ? t.duration : 5e3, t.style && (this.opacity && this.opacity !== t.style.opacity && (t.style.opacity = this.opacity), this.fontSize && this.fontSize !== t.style.fontSize && (t.style.fontSize = this.fontSize), this.like && (t.like = t.like ? t.like : this.like)), t.prior || t.realTime ? (this.bulletBtn.main.data.unshift(t), t.realTime && (this.bulletBtn.main.readData(), this.bulletBtn.main.dataHandle())) : this.bulletBtn.main.data.push(t));
        } }, { key: "setCommentID", value: function value(t, e) {
          var n = this,
              i = this.container.getBoundingClientRect();t && e && (this.bulletBtn.main.data.some(function (n) {
            return n.id === t && (n.id = e, !0);
          }), this.bulletBtn.main.queue.some(function (o) {
            return o.id === t && (o.id = e, o.pauseMove(i), "paused" !== n.bulletBtn.main.status && o.startMove(i), !0);
          }));
        } }, { key: "setCommentDuration", value: function value(t, e) {
          var n = this,
              i = this.container.getBoundingClientRect();t && e && (e = e || 5e3, this.bulletBtn.main.data.some(function (n) {
            return n.id === t && (n.duration = e, !0);
          }), this.bulletBtn.main.queue.some(function (o) {
            return o.id === t && (o.duration = e, o.pauseMove(i), "paused" !== n.bulletBtn.main.status && o.startMove(i), !0);
          }));
        } }, { key: "setCommentLike", value: function value(t, e) {
          var n = this.container.getBoundingClientRect();this.like = e, t && e && (this.bulletBtn.main.data.some(function (n) {
            return n.id === t && (n.like = e, !0);
          }), this.bulletBtn.main.queue.some(function (i) {
            return i.id === t && (i.pauseMove(n), i.setLikeDom(e.el, e.style), "paused" !== i.danmu.bulletBtn.main.status && i.startMove(n), !0);
          }));
        } }, { key: "restartComment", value: function value(t) {
          this.mouseControl = !1;var e = this.container.getBoundingClientRect();t && this.bulletBtn.main.queue.some(function (n) {
            return n.id === t && ("paused" !== n.danmu.bulletBtn.main.status ? n.startMove(e, !0) : n.status = "paused", !0);
          });
        } }, { key: "freezeComment", value: function value(t) {
          this.mouseControl = !0;var e = this.container.getBoundingClientRect();t && this.bulletBtn.main.queue.some(function (n) {
            return n.id === t && (n.status = "forcedPause", n.pauseMove(e), n.el && n.el.style && (n.el.style.zIndex = 10), !0);
          });
        } }, { key: "removeComment", value: function value(t) {
          t && (this.bulletBtn.main.queue.some(function (e) {
            return e.id === t && (e.remove(), !0);
          }), this.bulletBtn.main.data = this.bulletBtn.main.data.filter(function (e) {
            return e.id !== t;
          }));
        } }, { key: "setAllDuration", value: function value() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "scroll",
              e = arguments[1],
              n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
              i = this.container.getBoundingClientRect();e && (e = e || 5e3, n && (this.bulletBtn.main.forceDuration = e), this.bulletBtn.main.data.forEach(function (n) {
            t === n.mode && (n.duration = e);
          }), this.bulletBtn.main.queue.forEach(function (n) {
            t === n.mode && (n.duration = e, n.pauseMove(i), "paused" !== n.danmu.bulletBtn.main.status && n.startMove(i));
          }));
        } }, { key: "setOpacity", value: function value(t) {
          this.container.style.opacity = t;
        } }, { key: "setFontSize", value: function value(t, e) {
          var n = this;this.fontSize = t + "px", t && (this.bulletBtn.main.data.forEach(function (t) {
            t.style && (t.style.fontSize = n.fontSize);
          }), this.bulletBtn.main.queue.forEach(function (t) {
            t.options.style || (t.options.style = {}), t.options.style.fontSize = n.fontSize, t.setFontSize(n.fontSize), e && (t.top = t.channel_id[0] * e, t.topInit());
          })), e && (this.config.channelSize = e, this.bulletBtn.main.channel.resize(!0));
        } }, { key: "setArea", value: function value(t) {
          this.config.area = t, this.bulletBtn.main.channel.resize(!0);
        } }, { key: "hide", value: function value() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "scroll";this.hideArr.indexOf(t) < 0 && this.hideArr.push(t);var e = this.bulletBtn.main.queue.filter(function (e) {
            return t === e.mode || "color" === t && e.color;
          });e.forEach(function (t) {
            return t.remove();
          });
        } }, { key: "show", value: function value() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "scroll",
              e = this.hideArr.indexOf(t);e > -1 && this.hideArr.splice(e, 1);
        } }, { key: "setDirection", value: function value() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "r2l";this.emit("changeDirection", t);
        } }, { key: "resize", value: function value() {
          this.emit("channel_resize");
        } }]), t;
    }();e.default = l, t.exports = e.default;
  }, function (t, e, n) {
    "use strict";
    var i,
        o,
        r,
        a,
        s,
        u,
        l,
        c = n(7),
        h = n(24),
        f = Function.prototype.apply,
        d = Function.prototype.call,
        m = Object.create,
        p = Object.defineProperty,
        g = Object.defineProperties,
        v = Object.prototype.hasOwnProperty,
        b = { configurable: !0, enumerable: !1, writable: !0 };o = function o(t, e) {
      var _n, o;return h(e), o = this, i.call(this, t, _n = function n() {
        r.call(o, t, _n), f.call(e, this, arguments);
      }), _n.__eeOnceListener__ = e, this;
    }, s = { on: i = function i(t, e) {
        var n;return h(e), v.call(this, "__ee__") ? n = this.__ee__ : (n = b.value = m(null), p(this, "__ee__", b), b.value = null), n[t] ? "object" == _typeof(n[t]) ? n[t].push(e) : n[t] = [n[t], e] : n[t] = e, this;
      }, once: o, off: r = function r(t, e) {
        var n, i, o, r;if (h(e), !v.call(this, "__ee__")) return this;if (!(n = this.__ee__)[t]) return this;if ("object" == _typeof(i = n[t])) for (r = 0; o = i[r]; ++r) {
          o !== e && o.__eeOnceListener__ !== e || (2 === i.length ? n[t] = i[r ? 0 : 1] : i.splice(r, 1));
        } else i !== e && i.__eeOnceListener__ !== e || delete n[t];return this;
      }, emit: a = function a(t) {
        var e, n, i, o, r;if (v.call(this, "__ee__") && (o = this.__ee__[t])) if ("object" == (typeof o === "undefined" ? "undefined" : _typeof(o))) {
          for (n = arguments.length, r = new Array(n - 1), e = 1; e < n; ++e) {
            r[e - 1] = arguments[e];
          }for (o = o.slice(), e = 0; i = o[e]; ++e) {
            f.call(i, this, r);
          }
        } else switch (arguments.length) {case 1:
            d.call(o, this);break;case 2:
            d.call(o, this, arguments[1]);break;case 3:
            d.call(o, this, arguments[1], arguments[2]);break;default:
            for (n = arguments.length, r = new Array(n - 1), e = 1; e < n; ++e) {
              r[e - 1] = arguments[e];
            }f.call(o, this, r);}
      } }, u = { on: c(i), once: c(o), off: c(r), emit: c(a) }, l = g({}, u), t.exports = e = function e(t) {
      return null == t ? m(l) : g(Object(t), u);
    }, e.methods = s;
  }, function (t, e, n) {
    "use strict";
    var i = n(2),
        o = n(8),
        r = n(12),
        a = n(20),
        s = n(21);(t.exports = function (t, e) {
      var n, o, u, l, c;return arguments.length < 2 || "string" != typeof t ? (l = e, e = t, t = null) : l = arguments[2], i(t) ? (n = s.call(t, "c"), o = s.call(t, "e"), u = s.call(t, "w")) : (n = u = !0, o = !1), c = { value: e, configurable: n, enumerable: o, writable: u }, l ? r(a(l), c) : c;
    }).gs = function (t, e, n) {
      var u, l, c, h;return "string" != typeof t ? (c = n, n = e, e = t, t = null) : c = arguments[3], i(e) ? o(e) ? i(n) ? o(n) || (c = n, n = void 0) : n = void 0 : (c = e, e = n = void 0) : e = void 0, i(t) ? (u = s.call(t, "c"), l = s.call(t, "e")) : (u = !0, l = !1), h = { get: e, set: n, configurable: u, enumerable: l }, c ? r(a(c), h) : h;
    };
  }, function (t, e, n) {
    "use strict";
    var i = n(9),
        o = /^\s*class[\s{/}]/,
        r = Function.prototype.toString;t.exports = function (t) {
      return !!i(t) && !o.test(r.call(t));
    };
  }, function (t, e, n) {
    "use strict";
    var i = n(10);t.exports = function (t) {
      if ("function" != typeof t) return !1;if (!hasOwnProperty.call(t, "length")) return !1;try {
        if ("number" != typeof t.length) return !1;if ("function" != typeof t.call) return !1;if ("function" != typeof t.apply) return !1;
      } catch (t) {
        return !1;
      }return !i(t);
    };
  }, function (t, e, n) {
    "use strict";
    var i = n(11);t.exports = function (t) {
      if (!i(t)) return !1;try {
        return !!t.constructor && t.constructor.prototype === t;
      } catch (t) {
        return !1;
      }
    };
  }, function (t, e, n) {
    "use strict";
    var i = n(2),
        o = { object: !0, function: !0, undefined: !0 };t.exports = function (t) {
      return !!i(t) && hasOwnProperty.call(o, typeof t === "undefined" ? "undefined" : _typeof(t));
    };
  }, function (t, e, n) {
    "use strict";
    t.exports = n(13)() ? Object.assign : n(14);
  }, function (t, e, n) {
    "use strict";
    t.exports = function () {
      var t,
          e = Object.assign;return "function" == typeof e && (e(t = { foo: "raz" }, { bar: "dwa" }, { trzy: "trzy" }), t.foo + t.bar + t.trzy === "razdwatrzy");
    };
  }, function (t, e, n) {
    "use strict";
    var i = n(15),
        o = n(19),
        r = Math.max;t.exports = function (t, e) {
      var n,
          a,
          s,
          u = r(arguments.length, 2);for (t = Object(o(t)), s = function s(i) {
        try {
          t[i] = e[i];
        } catch (t) {
          n || (n = t);
        }
      }, a = 1; a < u; ++a) {
        e = arguments[a], i(e).forEach(s);
      }if (void 0 !== n) throw n;return t;
    };
  }, function (t, e, n) {
    "use strict";
    t.exports = n(16)() ? Object.keys : n(17);
  }, function (t, e, n) {
    "use strict";
    t.exports = function () {
      try {
        return Object.keys("primitive"), !0;
      } catch (t) {
        return !1;
      }
    };
  }, function (t, e, n) {
    "use strict";
    var i = n(1),
        o = Object.keys;t.exports = function (t) {
      return o(i(t) ? Object(t) : t);
    };
  }, function (t, e, n) {
    "use strict";
    t.exports = function () {};
  }, function (t, e, n) {
    "use strict";
    var i = n(1);t.exports = function (t) {
      if (!i(t)) throw new TypeError("Cannot use null or undefined");return t;
    };
  }, function (t, e, n) {
    "use strict";
    var i = n(1),
        o = Array.prototype.forEach,
        r = Object.create,
        a = function a(t, e) {
      var n;for (n in t) {
        e[n] = t[n];
      }
    };t.exports = function (t) {
      var e = r(null);return o.call(arguments, function (t) {
        i(t) && a(Object(t), e);
      }), e;
    };
  }, function (t, e, n) {
    "use strict";
    t.exports = n(22)() ? String.prototype.contains : n(23);
  }, function (t, e, n) {
    "use strict";
    var i = "razdwatrzy";t.exports = function () {
      return "function" == typeof i.contains && !0 === i.contains("dwa") && !1 === i.contains("foo");
    };
  }, function (t, e, n) {
    "use strict";
    var i = String.prototype.indexOf;t.exports = function (t) {
      return i.call(this, t, arguments[1]) > -1;
    };
  }, function (t, e, n) {
    "use strict";
    t.exports = function (t) {
      if ("function" != typeof t) throw new TypeError(t + " is not a function");return t;
    };
  }, function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var i = function () {
      function t(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
        }
      }return function (e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
      };
    }(),
        o = a(n(0)),
        r = a(n(26));function a(t) {
      return t && t.__esModule ? t : { default: t };
    }var s = function () {
      function t(e) {
        !function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, t), this.danmu = e, this.main = new r.default(e), e.config.defaultOff || this.main.start();
      }return i(t, [{ key: "createSwitch", value: function value() {
          var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];return this.switchBtn = o.default.createDom("dk-switch", '<span class="txt">弹</span>', {}, "danmu-switch " + (t ? "danmu-switch-active" : "")), this.switchBtn;
        } }, { key: "destroy", value: function value() {
          for (var t in this.main.destroy(), this) {
            delete this[t];
          }
        } }]), t;
    }();e.default = s, t.exports = e.default;
  }, function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var i = function () {
      function t(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
        }
      }return function (e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
      };
    }(),
        o = s(n(27)),
        r = s(n(28)),
        a = s(n(0));function s(t) {
      return t && t.__esModule ? t : { default: t };
    }var u = function () {
      function t(e) {
        !function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, t), this.danmu = e, this.container = e.container, this.channel = new o.default(e), this.data = [].concat(e.config.comments), this.playedData = [], this.queue = [], this.timer = null, this.retryTimer = null, this.retryStatus = "normal", this.interval = e.config.interval || 2e3, this.status = "idle", a.default.on(e, "bullet_remove", this.updateQueue.bind(this), "destroy");var n = this;a.default.on(this.danmu, "changeDirection", function (t) {
          n.danmu.direction = t;
        }, "destroy"), this.nums = 0;
      }return i(t, [{ key: "destroy", value: function value() {
          for (var t in clearTimeout(this.dataHandleTimer), this.channel.destroy(), this.data = [], this) {
            delete this[t];
          }
        } }, { key: "updateQueue", value: function value(t) {
          var e = this;e.queue.some(function (n, i) {
            return n.id === t.bullet.id && (e.queue.splice(i, 1), !0);
          });
        } }, { key: "init", value: function value(t, e) {
          e || (e = this), e.retryStatus = "normal", e.data.sort(function (t, e) {
            return t.start - e.start;
          });e.retryTimer || function t() {
            "closed" === e.status && "stop" === e.retryStatus || ("playing" === e.status && (e.readData(), e.dataHandle()), "stop" === e.retryStatus && "paused" !== this.status || (e.dataHandleTimer = setTimeout(function () {
              t();
            }, e.interval - 1e3)));
          }();
        } }, { key: "start", value: function value() {
          this.status = "playing", this.queue = [], this.container.innerHTML = "", this.channel.resetWithCb(this.init, this);
        } }, { key: "stop", value: function value() {
          this.status = "closed", this.retryTimer = null, this.retryStatus = "stop", this.channel.reset(), this.queue = [], this.container.innerHTML = "";
        } }, { key: "play", value: function value() {
          var t = this;this.status = "playing";var e = this.channel.channels,
              n = this.danmu.container.getBoundingClientRect();e && e.length > 0 && ["scroll", "top", "bottom"].forEach(function (i) {
            t.queue.forEach(function (t) {
              t.startMove(n), t.resized = !0;
            });for (var o = 0; o < e.length; o++) {
              e[o].queue[i].forEach(function (t) {
                t.resized = !1;
              });
            }
          });
        } }, { key: "pause", value: function value() {
          this.status = "paused";var t = this.channel.channels,
              e = this.danmu.container.getBoundingClientRect();t && t.length > 0 && this.queue.forEach(function (t) {
            t.pauseMove(e);
          });
        } }, { key: "dataHandle", value: function value() {
          var t = this;"paused" !== this.status && "closed" !== this.status && t.queue.length && t.queue.forEach(function (e) {
            "waiting" === e.status && e.startMove(t.channel.containerPos);
          });
        } }, { key: "readData", value: function value() {
          var t = this,
              e = this.danmu,
              n = 0;e.player && e.player.currentTime && (n = a.default.formatTime(e.player.currentTime));var i = void 0,
              o = t.interval,
              s = t.channel,
              u = void 0;e.player ? (u = t.data.filter(function (e) {
            return !e.start && t.danmu.hideArr.indexOf(e.mode) < 0 && (!e.color || t.danmu.hideArr.indexOf("color") < 0) && (e.start = n), t.danmu.hideArr.indexOf(e.mode) < 0 && (!e.color || t.danmu.hideArr.indexOf("color") < 0) && e.start - o <= n && n <= e.start + o;
          }), e.live && (t.data = t.data.filter(function (t) {
            return t.start || (t.start = n), t.start > n - 3 * o;
          }))) : 0 === (u = t.data.splice(0, 1)).length && (u = t.playedData.splice(0, 1)), u.length > 0 && u.forEach(function (n) {
            t.forceDuration && t.forceDuration != n.duration && (n.duration = t.forceDuration), i = new r.default(e, n), n.hasAttached || (i.attach(), n.hasAttach = !0), s.addBullet(i).result ? (t.queue.push(i), t.nums++, i.topInit()) : (i.detach(), n.noDiscard && (n.prior ? t.data.unshift(n) : t.data.push(n)));
          });
        } }]), t;
    }();e.default = u, t.exports = e.default;
  }, function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var i,
        o = function () {
      function t(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
        }
      }return function (e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
      };
    }(),
        r = n(0),
        a = (i = r) && i.__esModule ? i : { default: i };var s = function () {
      function t(e) {
        !function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, t), this.danmu = e, this.reset();var n = this;a.default.on(this.danmu, "bullet_remove", function (t) {
          n.removeBullet(t.bullet);
        }, "destroy"), this.direction = e.direction, a.default.on(this.danmu, "changeDirection", function (t) {
          n.direction = t;
        }, "destroy"), this.containerPos = this.danmu.container.getBoundingClientRect(), this.containerWidth = this.containerPos.width, this.containerHeight = this.containerPos.height, this.containerLeft = this.containerPos.left, this.containerRight = this.containerPos.right, a.default.on(this.danmu, "channel_resize", function () {
          n.containerPos = n.danmu.container.getBoundingClientRect(), n.resizing || (n.containerWidth = n.containerPos.width, n.containerHeight = n.containerPos.height, n.containerLeft = n.containerPos.left, n.containerRight = n.containerPos.right, n.resize(!0));
        }, "destroy");
      }return o(t, [{ key: "destroy", value: function value() {
          for (var t in clearTimeout(this.resizeTimer), clearTimeout(this.resetTimer), this.channels = [], this) {
            delete this[t];
          }
        } }, { key: "resize", value: function value() {
          var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
              e = this.danmu.container,
              n = this;n.resizing || (n.resizing = !0, this.resizeTimer = setTimeout(function () {
            n.danmu.bulletBtn.main.status;n.danmu.bulletBtn.main.data && n.danmu.bulletBtn.main.data.forEach(function (t) {
              t.bookChannelId && delete t.bookChannelId;
            });var i = e.getBoundingClientRect();n.width = i.width, n.height = i.height, n.danmu.config.area && n.danmu.config.area.start >= 0 && n.danmu.config.area.end >= n.danmu.config.area.start && ("b2t" === n.direction ? n.width = n.width * (n.danmu.config.area.end - n.danmu.config.area.start) : n.height = n.height * (n.danmu.config.area.end - n.danmu.config.area.start)), n.container = e;var o = n.danmu.config.channelSize || (/mobile/gi.test(navigator.userAgent) ? 10 : 12),
                r = void 0;r = "b2t" === n.direction ? Math.floor(n.width / o) : Math.floor(n.height / o);for (var a = [], s = 0; s < r; s++) {
              a[s] = { id: s, queue: { scroll: [], top: [], bottom: [] }, operating: { scroll: !1, top: !1, bottom: !1 }, bookId: {} };
            }if (n.channels && n.channels.length <= a.length) {
              for (var u = function u(e) {
                a[e] = { id: e, queue: { scroll: [], top: [], bottom: [] }, operating: { scroll: !1, top: !1, bottom: !1 }, bookId: {} }, ["scroll", "top"].forEach(function (i) {
                  n.channels[e].queue[i].forEach(function (o) {
                    o.el && (a[e].queue[i].push(o), o.resized || (o.pauseMove(n.containerPos, t), "paused" !== o.danmu.bulletBtn.main.status && o.startMove(n.containerPos), o.resized = !0));
                  });
                }), n.channels[e].queue.bottom.forEach(function (i) {
                  if (i.el) {
                    if (a[e + a.length - n.channels.length].queue.bottom.push(i), i.channel_id[0] + i.channel_id[1] - 1 === e) {
                      var r = [].concat(i.channel_id);i.channel_id = [r[0] - n.channels.length + a.length, r[1]], i.top = i.channel_id[0] * o, n.danmu.config.area && n.danmu.config.area.start && (i.top += n.containerHeight * n.danmu.config.area.start), i.topInit();
                    }i.resized || (i.pauseMove(n.containerPos, t), "paused" !== i.danmu.bulletBtn.main.status && i.startMove(n.containerPos), i.resized = !0);
                  }
                });
              }, l = 0; l < n.channels.length; l++) {
                u(l);
              }for (var c = function c(t) {
                ["scroll", "top", "bottom"].forEach(function (e) {
                  a[t].queue[e].forEach(function (t) {
                    t.resized = !1;
                  });
                });
              }, h = 0; h < a.length; h++) {
                c(h);
              }n.channels = a, "b2t" === n.direction ? n.channelWidth = o : n.channelHeight = o;
            } else if (n.channels && n.channels.length > a.length) {
              for (var f = function f(e) {
                a[e] = { id: e, queue: { scroll: [], top: [], bottom: [] }, operating: { scroll: !1, top: !1, bottom: !1 }, bookId: {} }, ["scroll", "top", "bottom"].forEach(function (i) {
                  if ("top" === i && e > Math.floor(a.length / 2)) ;else if ("bottom" === i && e <= Math.floor(a.length / 2)) ;else {
                    var r = "bottom" === i ? e - a.length + n.channels.length : e;n.channels[r].queue[i].forEach(function (s, u) {
                      if (s.el) {
                        if (a[e].queue[i].push(s), "bottom" === i && s.channel_id[0] + s.channel_id[1] - 1 === r) {
                          var l = [].concat(s.channel_id);s.channel_id = [l[0] - n.channels.length + a.length, l[1]], s.top = s.channel_id[0] * o, n.danmu.config.area && n.danmu.config.area.start && (s.top += n.containerHeight * n.danmu.config.area.start), s.topInit();
                        }s.pauseMove(n.containerPos, t), "paused" !== s.danmu.bulletBtn.main.status && s.startMove(n.containerPos), s.resized || (s.resized = !0);
                      }n.channels[r].queue[i].splice(u, 1);
                    });
                  }
                });
              }, d = 0; d < a.length; d++) {
                f(d);
              }for (var m = function m(t) {
                ["scroll", "top", "bottom"].forEach(function (e) {
                  a[t].queue[e].forEach(function (t) {
                    t.resized = !1;
                  });
                });
              }, p = 0; p < a.length; p++) {
                m(p);
              }n.channels = a, "b2t" === n.direction ? n.channelWidth = o : n.channelHeight = o;
            }n.resizing = !1;
          }, 10));
        } }, { key: "addBullet", value: function value(t) {
          var e = this,
              n = this.danmu,
              i = this.channels,
              o = void 0,
              r = void 0,
              a = void 0;if ("b2t" === e.direction ? (r = this.channelWidth, a = Math.ceil(t.width / r)) : (o = this.channelHeight, a = Math.ceil(t.height / o)), a > i.length) return { result: !1, message: "exceed channels.length, occupy=" + a + ",channelsSize=" + i.length };for (var s = !0, u = void 0, l = -1, c = 0, h = i.length; c < h; c++) {
            if (i[c].queue[t.mode].some(function (e) {
              return e.id === t.id;
            })) return { result: !1, message: "exsited, channelOrder=" + c + ",danmu_id=" + t.id };
          }if ("scroll" === t.mode) for (var f = 0, d = i.length - a; f <= d; f++) {
            s = !0;for (var m = f; m < f + a; m++) {
              if ((u = i[m]).operating.scroll) {
                s = !1;break;
              }if ((u.bookId.scroll || t.prior) && u.bookId.scroll !== t.id) {
                s = !1;break;
              }u.operating.scroll = !0;var p = u.queue.scroll[0];if (p) {
                var g = p.el.getBoundingClientRect();if ("b2t" === e.direction) {
                  if (g.bottom > e.containerPos.bottom) {
                    s = !1, u.operating.scroll = !1;break;
                  }
                } else if (g.right > e.containerPos.right) {
                  s = !1, u.operating.scroll = !1;break;
                }var v,
                    b = void 0,
                    y = void 0,
                    w = void 0,
                    k = void 0;if ("b2t" === e.direction ? (y = (g.top - e.containerPos.top + g.height) / (b = (e.containerPos.height + g.height) / p.duration), w = e.containerPos.height, k = (e.containerPos.height + t.height) / t.duration) : (y = (g.left - e.containerPos.left + g.width) / (b = (e.containerPos.width + g.width) / p.duration), w = e.containerPos.width, k = (e.containerPos.width + t.width) / t.duration), v = w / k, n.config.bOffset || (n.config.bOffset = 0), b < k && y + n.config.bOffset > v) {
                  s = !1, u.operating.scroll = !1;break;
                }
              }u.operating.scroll = !1;
            }if (s) {
              l = f;break;
            }
          } else if ("top" === t.mode) for (var x = 0, _ = i.length - a; x <= _; x++) {
            s = !0;for (var M = x; M < x + a; M++) {
              if (M > Math.floor(i.length / 2)) {
                s = !1;break;
              }if ((u = i[M]).operating[t.mode]) {
                s = !1;break;
              }if ((u.bookId[t.mode] || t.prior) && u.bookId[t.mode] !== t.id) {
                s = !1;break;
              }if (u.operating[t.mode] = !0, u.queue[t.mode].length > 0) {
                s = !1, u.operating[t.mode] = !1;break;
              }u.operating[t.mode] = !1;
            }if (s) {
              l = x;break;
            }
          } else if ("bottom" === t.mode) for (var C = i.length - a; C >= 0; C--) {
            s = !0;for (var O = C; O < C + a; O++) {
              if (O <= Math.floor(i.length / 2)) {
                s = !1;break;
              }if ((u = i[O]).operating[t.mode]) {
                s = !1;break;
              }if ((u.bookId[t.mode] || t.prior) && u.bookId[t.mode] !== t.id) {
                s = !1;break;
              }if (u.operating[t.mode] = !0, u.queue[t.mode].length > 0) {
                s = !1, u.operating[t.mode] = !1;break;
              }u.operating[t.mode] = !1;
            }if (s) {
              l = C;break;
            }
          }if (-1 !== l) {
            for (var B = l, T = l + a; B < T; B++) {
              (u = i[B]).operating[t.mode] = !0, u.queue[t.mode].unshift(t), t.prior && delete u.bookId[t.mode], u.operating[t.mode] = !1;
            }if (t.prior) if (delete t.bookChannelId, n.player) n.bulletBtn.main.data.some(function (e) {
              return e.id === t.id && (delete e.bookChannelId, !0);
            });return t.channel_id = [l, a], "b2t" === e.direction ? (t.top = l * r, e.danmu.config.area && e.danmu.config.area.start && (t.top += e.containerWidth * e.danmu.config.area.start)) : (t.top = l * o, e.danmu.config.area && e.danmu.config.area.start && (t.top += e.containerHeight * e.danmu.config.area.start)), { result: t, message: "success" };
          }if (t.options.realTime) {
            var j = 0,
                E = null;if (e.danmu.bulletBtn.main.queue.forEach(function (t, n) {
              t.el && t.el.getBoundingClientRect().right > e.containerPos.right && t.start >= j && (j = t.start, n, E = t);
            }), E) {
              t.channel_id = E.channel_id;for (var P = E.channel_id[0], z = E.channel_id[0] + E.channel_id[1]; P < z; P++) {
                (u = i[P]).operating[t.mode] = !0, u.queue[t.mode].unshift(t), t.prior && delete u.bookId[t.mode], u.operating[t.mode] = !1;
              }return t.top = E.top, e.danmu.config.area && e.danmu.config.area.start && (t.top += e.containerHeight * e.danmu.config.area.start), { result: t, message: "success" };
            }
          }if (t.prior) if (t.bookChannelId) {
            if (n.player) n.bulletBtn.main.data.some(function (e) {
              return e.id === t.id && (e.start += 2e3, !0);
            });
          } else {
            l = -1;for (var q = 0, L = i.length - a; q <= L; q++) {
              s = !0;for (var S = q; S < q + a; S++) {
                if (i[S].bookId[t.mode]) {
                  s = !1;break;
                }
              }if (s) {
                l = q;break;
              }
            }if (-1 !== l) {
              for (var D = l; D < l + a; D++) {
                i[D].bookId[t.mode] = t.id;
              }if (n.player) n.bulletBtn.main.data.some(function (e) {
                return e.id === t.id && (e.start += 2e3, e.bookChannelId = [l, a], !0);
              });
            }
          }return { result: !1, message: "no surplus will right" };
        } }, { key: "removeBullet", value: function value(t) {
          for (var e = this.channels, n = t.channel_id, i = void 0, o = n[0], r = n[0] + n[1]; o < r; o++) {
            if (i = e[o]) {
              i.operating[t.mode] = !0;var a = -1;i.queue[t.mode].some(function (e, n) {
                return e.id === t.id && (a = n, !0);
              }), a > -1 && i.queue[t.mode].splice(a, 1), i.operating[t.mode] = !1;
            }
          }t.options.loop && this.danmu.bulletBtn.main.playedData.push(t.options);
        } }, { key: "resetArea", value: function value() {
          var t = this.danmu.container,
              e = this,
              n = t.getBoundingClientRect();e.width = n.width, e.height = n.height, e.danmu.config.area && e.danmu.config.area.start >= 0 && e.danmu.config.area.end >= e.danmu.config.area.start && ("b2t" === e.direction ? e.width = e.width * (e.danmu.config.area.end - e.danmu.config.area.start) : e.height = e.height * (e.danmu.config.area.end - e.danmu.config.area.start)), e.container = t;var i = e.danmu.config.channelSize || (/mobile/gi.test(navigator.userAgent) ? 10 : 12),
              o = void 0;o = "b2t" === e.direction ? Math.floor(e.width / i) : Math.floor(e.height / i);for (var r = [], a = 0; a < o; a++) {
            r[a] = { id: a, queue: { scroll: [], top: [], bottom: [] }, operating: { scroll: !1, top: !1, bottom: !1 }, bookId: {} };
          }if (e.channels && e.channels.length <= r.length) {
            for (var s = function s(t) {
              r[t] = { id: t, queue: { scroll: [], top: [], bottom: [] }, operating: { scroll: !1, top: !1, bottom: !1 }, bookId: {} }, ["scroll", "top"].forEach(function (n) {
                e.channels[t].queue[n].forEach(function (i) {
                  i.el && (r[t].queue[n].push(i), i.resized || (i.pauseMove(e.containerPos, !1), i.startMove(e.containerPos), i.resized = !0));
                });
              }), e.channels[t].queue.bottom.forEach(function (n) {
                if (n.el) {
                  if (r[t + r.length - e.channels.length].queue.bottom.push(n), n.channel_id[0] + n.channel_id[1] - 1 === t) {
                    var o = [].concat(n.channel_id);n.channel_id = [o[0] - e.channels.length + r.length, o[1]], n.top = n.channel_id[0] * i, e.danmu.config.area && e.danmu.config.area.start && (n.top += e.containerHeight * e.danmu.config.area.start), n.topInit();
                  }n.resized || (n.pauseMove(e.containerPos, !1), n.startMove(e.containerPos), n.resized = !0);
                }
              });
            }, u = 0; u < e.channels.length; u++) {
              s(u);
            }for (var l = function l(t) {
              ["scroll", "top", "bottom"].forEach(function (e) {
                r[t].queue[e].forEach(function (t) {
                  t.resized = !1;
                });
              });
            }, c = 0; c < r.length; c++) {
              l(c);
            }e.channels = r, "b2t" === e.direction ? e.channelWidth = i : e.channelHeight = i;
          } else if (e.channels && e.channels.length > r.length) {
            for (var h = function h(t) {
              r[t] = { id: t, queue: { scroll: [], top: [], bottom: [] }, operating: { scroll: !1, top: !1, bottom: !1 }, bookId: {} }, ["scroll", "top", "bottom"].forEach(function (n) {
                if ("top" === n && t > Math.floor(r.length / 2)) ;else if ("bottom" === n && t <= Math.floor(r.length / 2)) ;else {
                  var o = "bottom" === n ? t - r.length + e.channels.length : t;e.channels[o].queue[n].forEach(function (a, s) {
                    if (a.el) {
                      if (r[t].queue[n].push(a), "bottom" === n && a.channel_id[0] + a.channel_id[1] - 1 === o) {
                        var u = [].concat(a.channel_id);a.channel_id = [u[0] - e.channels.length + r.length, u[1]], a.top = a.channel_id[0] * i, e.danmu.config.area && e.danmu.config.area.start && (a.top += e.containerHeight * e.danmu.config.area.start), a.topInit();
                      }a.resized || (a.pauseMove(e.containerPos, !1), a.startMove(e.containerPos), a.resized = !0);
                    }e.channels[o].queue[n].splice(s, 1);
                  });
                }
              });
            }, f = 0; f < r.length; f++) {
              h(f);
            }for (var d = function d(t) {
              ["scroll", "top", "bottom"].forEach(function (e) {
                r[t].queue[e].forEach(function (t) {
                  t.resized = !1;
                });
              });
            }, m = 0; m < r.length; m++) {
              d(m);
            }e.channels = r, "b2t" === e.direction ? e.channelWidth = i : e.channelHeight = i;
          }
        } }, { key: "reset", value: function value() {
          var t = this.danmu.container,
              e = this;e.danmu.bulletBtn && e.danmu.bulletBtn.main && e.danmu.bulletBtn.main.queue.forEach(function (t) {
            t.pauseMove(e.containerPos), t.remove();
          }), e.channels && e.channels.length > 0 && ["scroll", "top", "bottom"].forEach(function (t) {
            for (var n = 0; n < e.channels.length; n++) {
              e.channels[n].queue[t].forEach(function (t) {
                t.pauseMove(e.containerPos), t.remove();
              });
            }
          }), this.resetTimer = setTimeout(function () {
            var n = t.getBoundingClientRect();e.width = n.width, e.height = n.height, e.danmu.config.area && e.danmu.config.area.start >= 0 && e.danmu.config.area.end >= e.danmu.config.area.start && ("b2t" === e.direction ? e.width = e.width * (e.danmu.config.area.end - e.danmu.config.area.start) : e.height = e.height * (e.danmu.config.area.end - e.danmu.config.area.start)), e.container = t;var i = e.danmu.config.channelSize || (/mobile/gi.test(navigator.userAgent) ? 10 : 12),
                o = void 0;o = "b2t" === e.direction ? Math.floor(e.width / i) : Math.floor(e.height / i);for (var r = [], a = 0; a < o; a++) {
              r[a] = { id: a, queue: { scroll: [], top: [], bottom: [] }, operating: { scroll: !1, top: !1, bottom: !1 }, bookId: {} };
            }e.channels = r, "b2t" === e.direction ? e.channelWidth = i : e.channelHeight = i;
          }, 200);
        } }, { key: "resetWithCb", value: function value(t, e) {
          var n = this.danmu.container,
              i = this;i.channels && i.channels.length > 0 && ["scroll", "top", "bottom"].forEach(function (t) {
            for (var e = 0; e < i.channels.length; e++) {
              i.channels[e].queue[t].forEach(function (t) {
                t.pauseMove(i.containerPos), t.remove();
              });
            }
          });var o = n.getBoundingClientRect();i.width = o.width, i.height = o.height, i.danmu.config.area && i.danmu.config.area.start >= 0 && i.danmu.config.area.end >= i.danmu.config.area.start && ("b2t" === i.direction ? i.width = i.width * (i.danmu.config.area.end - i.danmu.config.area.start) : i.height = i.height * (i.danmu.config.area.end - i.danmu.config.area.start)), i.container = n;var r = i.danmu.config.channelSize || (/mobile/gi.test(navigator.userAgent) ? 10 : 12),
              a = void 0;a = "b2t" === i.direction ? Math.floor(i.width / r) : Math.floor(i.height / r);for (var s = [], u = 0; u < a; u++) {
            s[u] = { id: u, queue: { scroll: [], top: [], bottom: [] }, operating: { scroll: !1, top: !1, bottom: !1 }, bookId: {} };
          }i.channels = s, i.channelHeight = r, t && t(!0, e);
        } }]), t;
    }();e.default = s, t.exports = e.default;
  }, function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var i,
        o = function () {
      function t(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
        }
      }return function (e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
      };
    }(),
        r = n(0),
        a = (i = r) && i.__esModule ? i : { default: i };var s = function () {
      function t(e, n) {
        !function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, t), this.danmu = e, this.options = n, this.duration = n.duration, this.moveV = n.moveV, this.id = n.id, this.container = e.container, this.start = n.start, this.prior = n.prior, this.color = n.color, this.bookChannelId = n.bookChannelId, this.direction = e.direction;var i = this;this.onChangeDirection = function (t) {
          i.direction = t;
        }, this.danmu.on("changeDirection", this.onChangeDirection);var o = void 0;if (this.domObj = e.domObj, n.el && 1 === n.el.nodeType) (o = this.domObj.use()).appendChild(a.default.copyDom(n.el));else if ((o = this.domObj.use()).textContent = n.txt, n.style) {
          var r = n.style;Object.keys(r).forEach(function (t) {
            o.style[t] = r[t];
          });
        }"top" === n.mode || "bottom" === n.mode ? this.mode = n.mode : this.mode = "scroll", this.el = o, n.like && n.like.el && this.setLikeDom(n.like.el, n.like.style), this.status = "waiting";var s = this.container.getBoundingClientRect(),
            u = Math.floor(Math.random() * (s.width / 10 > 100 ? 200 : s.width / 10));n.realTime && (u = 0), this.el.style.left = s.width + u + "px", this.containerPos = s;
      }return o(t, [{ key: "attach", value: function value() {
          if (this.container.appendChild(this.el), this.elPos = this.el.getBoundingClientRect(), "b2t" === this.direction ? (this.width = this.elPos.height, this.height = this.elPos.width) : (this.width = this.elPos.width, this.height = this.elPos.height), this.moveV) {
            var t = this.containerPos;this.duration = (t.width + this.width) / this.moveV * 1e3;
          }this.danmu.config.mouseControl && this.el.addEventListener("mouseover", this.mouseoverFun.bind(this));
        } }, { key: "mouseoverFun", value: function value(t) {
          this.danmu.mouseControl && this.danmu.config.mouseControlPause || "waiting" === this.status || "end" === this.status || this.danmu.emit("bullet_hover", { bullet: this, event: t });
        } }, { key: "detach", value: function value() {
          this.container && this.el && this.domObj.unuse(this.el), this.danmu.off("changeDirection", this.onChangeDirection);
        } }, { key: "topInit", value: function value() {
          if ("b2t" === this.direction) {
            var t = this.containerPos;this.el.style.transformOrigin = "left top", this.el.style.transform = "translateX(-" + this.top + "px) translateY(" + t.height + "px) translateZ(0px) rotate(90deg)", this.el.style.transition = "transform 0s linear 0s";
          } else this.el.style.top = this.top + "px";
        } }, { key: "pauseMove", value: function value(t) {
          var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
              n = this;if ("paused" !== this.status && ("forcedPause" !== n.status && (this.status = "paused"), clearTimeout(n.removeTimer), this.el)) if (this.el.style.willChange = "auto", "scroll" === this.mode) {
            if (e) {
              var i = (new Date().getTime() - n.moveTime) / 1e3,
                  o = i * this.moveV,
                  r = 0;r = n.moveMoreS - o >= 0 ? "b2t" === this.direction ? (n.moveMoreS - o) / n.moveContainerHeight * t.height : (n.moveMoreS - o) / n.moveContainerWidth * t.width : n.moveMoreS - o, "b2t" === this.direction ? this.el.style.transform = "translateX(-" + this.top + "px) translateY(" + r + "px) translateZ(0px) rotate(90deg)" : this.el.style.left = r + "px";
            } else "b2t" === this.direction ? this.el.style.transform = "translateX(-" + this.top + "px) translateY(" + (this.el.getBoundingClientRect().top - t.top) + "px) translateZ(0px) rotate(90deg)" : this.el.style.left = this.el.getBoundingClientRect().left - t.left + "px";"b2t" === this.direction || (this.el.style.transform = "translateX(0px) translateY(0px) translateZ(0px)"), this.el.style.transition = "transform 0s linear 0s";
          } else this.pastDuration && this.startTime ? this.pastDuration = this.pastDuration + new Date().getTime() - this.startTime : this.pastDuration = 1;
        } }, { key: "startMove", value: function value(t, e) {
          var n = this;if (n.hasMove || (n.danmu.emit("bullet_start", n), n.hasMove = !0), ("forcedPause" !== n.status || e) && this.el && "start" !== this.status) if (this.status = "start", this.el.style.willChange = "transform", "scroll" === this.mode) {
            if ("b2t" === this.direction) {
              this.moveV = (t.height + this.height) / this.duration * 1e3;var i = (n.el.getBoundingClientRect().bottom - t.top) / this.moveV;this.el.style.transition = "transform " + i + "s linear 0s", this.startMoveTimer = setTimeout(function () {
                n.el && (n.el.style.transform = "translateX(-" + n.top + "px) translateY(-" + n.height + "px) translateZ(0px) rotate(90deg)", n.moveTime = new Date().getTime(), n.moveMoreS = n.el.getBoundingClientRect().top - t.top, n.moveContainerHeight = t.height, n.removeTimer = setTimeout(a, 1e3 * i));
              }, 20);
            } else {
              this.moveV = (t.width + this.width) / this.duration * 1e3;var o = (n.el.getBoundingClientRect().right - t.left) / this.moveV;this.el.style.transition = "transform " + o + "s linear 0s", this.startMoveTimer = setTimeout(function () {
                n.el && (n.el.style.transform = "translateX(-" + (n.el.getBoundingClientRect().right - t.left) + "px) translateY(0px) translateZ(0px)", n.moveTime = new Date().getTime(), n.moveMoreS = n.el.getBoundingClientRect().left - t.left, n.moveContainerWidth = t.width, n.removeTimer = setTimeout(a, 1e3 * o));
              }, 20);
            }
          } else {
            this.el.style.left = "50%", this.el.style.margin = "0 0 0 -" + this.width / 2 + "px", this.pastDuration || (this.pastDuration = 1);var r = this.duration >= this.pastDuration ? this.duration - this.pastDuration : 0;this.removeTimer = setTimeout(a, r), this.startTime = new Date().getTime();
          }function a() {
            if (n.el) if ("scroll" === n.mode) {
              var t = n.containerPos,
                  e = n.el.getBoundingClientRect();"b2t" === n.direction ? e && e.bottom <= t.top + 100 ? (n.status = "end", n.remove()) : (n.pauseMove(t), "paused" !== n.danmu.bulletBtn.main.status && n.startMove(t)) : e && e.right <= t.left + 100 ? (n.status = "end", n.remove()) : (n.pauseMove(t), "paused" !== n.danmu.bulletBtn.main.status && n.startMove(t));
            } else n.status = "end", n.remove();
          }
        } }, { key: "remove", value: function value() {
          (this.removeTimer && clearTimeout(this.removeTimer), this.startMoveTimer && clearTimeout(this.startMoveTimer), this.el && this.el.parentNode) && (this.el.style.willChange = "auto", this.danmu.off("changeDirection", this.onChangeDirection), this.domObj.unuse(this.el), this.el.parentNode.removeChild(this.el), this.el = null, this.danmu.emit("bullet_remove", { bullet: this }));
        } }, { key: "setFontSize", value: function value(t) {
          this.el && (this.el.style.fontSize = t);
        } }, { key: "setLikeDom", value: function value(t, e) {
          if (t) {
            Object.keys(e).forEach(function (n) {
              t.style[n] = e[n];
            });if (t.className = "danmu-like", this.el) {
              var n = this.el.querySelector(".danmu-like");n && this.el.removeChild(n), this.el.innerHTML = "" + this.el.innerHTML + t.outerHTML;
            }
          }return t;
        } }]), t;
    }();e.default = s, t.exports = e.default;
  }, function (t, e, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var i = function () {
      function t(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
        }
      }return function (e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
      };
    }();var o = function () {
      function t(e) {
        !function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, t), e = { initDOM: function initDOM() {
            return document.createElement("div");
          }, initSize: 10 }, this.init(e);
      }return i(t, [{ key: "init", value: function value(t) {
          this.idleList = [], this.usingList = [], this._id = 0, this.options = t, this._expand(t.initSize);
        } }, { key: "use", value: function value() {
          this.idleList.length || this._expand(1);var t = this.idleList.shift();return this.usingList.push(t), t;
        } }, { key: "unuse", value: function value(t) {
          var e = this.usingList.indexOf(t);e < 0 || (this.usingList.splice(e, 1), t.innerHTML = "", t.textcontent = "", t.style = "", this.idleList.push(t));
        } }, { key: "_expand", value: function value(t) {
          for (var e = 0; e < t; e++) {
            this.idleList.push(this.options.initDOM(this._id++));
          }
        } }, { key: "destroy", value: function value() {
          for (var t = 0; t < this.idleList.length; t++) {
            this.idleList[t].innerHTML = "", this.idleList[t].textcontent = "", this.idleList[t].style = "";
          }for (var e = 0; e < this.usingList.length; e++) {
            this.usingList[e].innerHTML = "", this.usingList[e].textcontent = "", this.usingList[e].style = "";
          }for (var n in this) {
            delete this[n];
          }
        } }]), t;
    }();e.default = o, t.exports = e.default;
  }, function (t, e, n) {
    var i = n(31);"string" == typeof i && (i = [[t.i, i, ""]]);var o = { hmr: !0, transform: void 0, insertInto: void 0 };n(33)(i, o);i.locals && (t.exports = i.locals);
  }, function (t, e, n) {
    (t.exports = n(32)(!1)).push([t.i, ".danmu{overflow:hidden;-webkit-user-select:none;-moz-user-select:none;user-select:none;-ms-user-select:none}.danmu>*{position:absolute;white-space:nowrap}.danmu-switch{width:32px;height:20px;border-radius:100px;background-color:#ccc;-webkit-box-sizing:border-box;box-sizing:border-box;outline:none;cursor:pointer;position:relative;text-align:center;margin:10px auto}.danmu-switch.danmu-switch-active{padding-left:12px;background-color:#f85959}.danmu-switch span.txt{width:20px;height:20px;line-height:20px;text-align:center;display:block;border-radius:100px;background-color:#ffffff;-webkit-box-shadow:-2px 0 0 0 rgba(0, 0, 0, .04);box-shadow:-2px 0 0 0 rgba(0, 0, 0, .04);font-family:PingFangSC;font-size:10px;font-weight:500;color:#f44336}\n", ""]);
  }, function (t, e) {
    t.exports = function (t) {
      var e = [];return e.toString = function () {
        return this.map(function (e) {
          var n = function (t, e) {
            var n = t[1] || "",
                i = t[3];if (!i) return n;if (e && "function" == typeof btoa) {
              var o = (a = i, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(a)))) + " */"),
                  r = i.sources.map(function (t) {
                return "/*# sourceURL=" + i.sourceRoot + t + " */";
              });return [n].concat(r).concat([o]).join("\n");
            }var a;return [n].join("\n");
          }(e, t);return e[2] ? "@media " + e[2] + "{" + n + "}" : n;
        }).join("");
      }, e.i = function (t, n) {
        "string" == typeof t && (t = [[null, t, ""]]);for (var i = {}, o = 0; o < this.length; o++) {
          var r = this[o][0];"number" == typeof r && (i[r] = !0);
        }for (o = 0; o < t.length; o++) {
          var a = t[o];"number" == typeof a[0] && i[a[0]] || (n && !a[2] ? a[2] = n : n && (a[2] = "(" + a[2] + ") and (" + n + ")"), e.push(a));
        }
      }, e;
    };
  }, function (t, e, n) {
    var i,
        o,
        r = {},
        a = (i = function i() {
      return window && document && document.all && !window.atob;
    }, function () {
      return void 0 === o && (o = i.apply(this, arguments)), o;
    }),
        s = function s(t) {
      return document.querySelector(t);
    },
        u = function (t) {
      var e = {};return function (t) {
        if ("function" == typeof t) return t();if (void 0 === e[t]) {
          var n = s.call(this, t);if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement) try {
            n = n.contentDocument.head;
          } catch (t) {
            n = null;
          }e[t] = n;
        }return e[t];
      };
    }(),
        l = null,
        c = 0,
        h = [],
        f = n(34);function d(t, e) {
      for (var n = 0; n < t.length; n++) {
        var i = t[n],
            o = r[i.id];if (o) {
          o.refs++;for (var a = 0; a < o.parts.length; a++) {
            o.parts[a](i.parts[a]);
          }for (; a < i.parts.length; a++) {
            o.parts.push(y(i.parts[a], e));
          }
        } else {
          var s = [];for (a = 0; a < i.parts.length; a++) {
            s.push(y(i.parts[a], e));
          }r[i.id] = { id: i.id, refs: 1, parts: s };
        }
      }
    }function m(t, e) {
      for (var n = [], i = {}, o = 0; o < t.length; o++) {
        var r = t[o],
            a = e.base ? r[0] + e.base : r[0],
            s = { css: r[1], media: r[2], sourceMap: r[3] };i[a] ? i[a].parts.push(s) : n.push(i[a] = { id: a, parts: [s] });
      }return n;
    }function p(t, e) {
      var n = u(t.insertInto);if (!n) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var i = h[h.length - 1];if ("top" === t.insertAt) i ? i.nextSibling ? n.insertBefore(e, i.nextSibling) : n.appendChild(e) : n.insertBefore(e, n.firstChild), h.push(e);else if ("bottom" === t.insertAt) n.appendChild(e);else {
        if ("object" != _typeof(t.insertAt) || !t.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o = u(t.insertInto + " " + t.insertAt.before);n.insertBefore(e, o);
      }
    }function g(t) {
      if (null === t.parentNode) return !1;t.parentNode.removeChild(t);var e = h.indexOf(t);e >= 0 && h.splice(e, 1);
    }function v(t) {
      var e = document.createElement("style");return void 0 === t.attrs.type && (t.attrs.type = "text/css"), b(e, t.attrs), p(t, e), e;
    }function b(t, e) {
      Object.keys(e).forEach(function (n) {
        t.setAttribute(n, e[n]);
      });
    }function y(t, e) {
      var n, i, o, r;if (e.transform && t.css) {
        if (!(r = e.transform(t.css))) return function () {};t.css = r;
      }if (e.singleton) {
        var a = c++;n = l || (l = v(e)), i = x.bind(null, n, a, !1), o = x.bind(null, n, a, !0);
      } else t.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (n = function (t) {
        var e = document.createElement("link");return void 0 === t.attrs.type && (t.attrs.type = "text/css"), t.attrs.rel = "stylesheet", b(e, t.attrs), p(t, e), e;
      }(e), i = M.bind(null, n, e), o = function o() {
        g(n), n.href && URL.revokeObjectURL(n.href);
      }) : (n = v(e), i = _.bind(null, n), o = function o() {
        g(n);
      });return i(t), function (e) {
        if (e) {
          if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap) return;i(t = e);
        } else o();
      };
    }t.exports = function (t, e) {
      if ("undefined" != typeof DEBUG && DEBUG && "object" != (typeof document === "undefined" ? "undefined" : _typeof(document))) throw new Error("The style-loader cannot be used in a non-browser environment");(e = e || {}).attrs = "object" == _typeof(e.attrs) ? e.attrs : {}, e.singleton || "boolean" == typeof e.singleton || (e.singleton = a()), e.insertInto || (e.insertInto = "head"), e.insertAt || (e.insertAt = "bottom");var n = m(t, e);return d(n, e), function (t) {
        for (var i = [], o = 0; o < n.length; o++) {
          var a = n[o];(s = r[a.id]).refs--, i.push(s);
        }t && d(m(t, e), e);for (o = 0; o < i.length; o++) {
          var s;if (0 === (s = i[o]).refs) {
            for (var u = 0; u < s.parts.length; u++) {
              s.parts[u]();
            }delete r[s.id];
          }
        }
      };
    };var w,
        k = (w = [], function (t, e) {
      return w[t] = e, w.filter(Boolean).join("\n");
    });function x(t, e, n, i) {
      var o = n ? "" : i.css;if (t.styleSheet) t.styleSheet.cssText = k(e, o);else {
        var r = document.createTextNode(o),
            a = t.childNodes;a[e] && t.removeChild(a[e]), a.length ? t.insertBefore(r, a[e]) : t.appendChild(r);
      }
    }function _(t, e) {
      var n = e.css,
          i = e.media;if (i && t.setAttribute("media", i), t.styleSheet) t.styleSheet.cssText = n;else {
        for (; t.firstChild;) {
          t.removeChild(t.firstChild);
        }t.appendChild(document.createTextNode(n));
      }
    }function M(t, e, n) {
      var i = n.css,
          o = n.sourceMap,
          r = void 0 === e.convertToAbsoluteUrls && o;(e.convertToAbsoluteUrls || r) && (i = f(i)), o && (i += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + " */");var a = new Blob([i], { type: "text/css" }),
          s = t.href;t.href = URL.createObjectURL(a), s && URL.revokeObjectURL(s);
    }
  }, function (t, e) {
    t.exports = function (t) {
      var e = "undefined" != typeof window && window.location;if (!e) throw new Error("fixUrls requires window.location");if (!t || "string" != typeof t) return t;var n = e.protocol + "//" + e.host,
          i = n + e.pathname.replace(/\/[^\/]*$/, "/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (t, e) {
        var o,
            r = e.trim().replace(/^"(.*)"$/, function (t, e) {
          return e;
        }).replace(/^'(.*)'$/, function (t, e) {
          return e;
        });return (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(r) ? t : (o = 0 === r.indexOf("//") ? r : 0 === r.indexOf("/") ? n + r : i + r.replace(/^\.\//, ""), "url(" + JSON.stringify(o) + ")")
        );
      });
    };
  }]);
});
//# sourceMappingURL=index.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(95)(module)))

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 40 40\" width=\"40\" height=\"40\">\n  <path fill=\"#f85959\" transform=\"scale(0.8 0.8)\" d=\"M36.5,18.73a1.19,1.19,0,0,0,1-1.14V16.33a1.2,1.2,0,0,0-1-1.13l-.61-.08a1.75,1.75,0,0,1-1.3-.86l-.21-.36-.2-.36A1.72,1.72,0,0,1,34,12l.23-.58a1.18,1.18,0,0,0-.5-1.42l-1.1-.62a1.18,1.18,0,0,0-1.47.3l-.39.51a1.82,1.82,0,0,1-1.41.72c-.44,0-1.88-.27-2.22-.7l-.39-.49a1.18,1.18,0,0,0-1.48-.28l-1.09.64a1.19,1.19,0,0,0-.47,1.43l.25.59a1.87,1.87,0,0,1-.08,1.58c-.26.37-1.17,1.5-1.71,1.58l-.63.09a1.19,1.19,0,0,0-1,1.14l0,1.27a1.17,1.17,0,0,0,1,1.12l.61.08a1.74,1.74,0,0,1,1.3.87l.21.36.2.35A1.69,1.69,0,0,1,24,22.08l-.23.59a1.19,1.19,0,0,0,.5,1.42l1.1.62a1.19,1.19,0,0,0,1.48-.31l.38-.5a1.83,1.83,0,0,1,1.41-.72c.44,0,1.88.25,2.22.69l.39.49a1.18,1.18,0,0,0,1.48.28L33.86,24a1.19,1.19,0,0,0,.47-1.43L34.09,22a1.84,1.84,0,0,1,.07-1.58c.26-.37,1.17-1.5,1.72-1.58ZM31,18.94a2.76,2.76,0,0,1-4.65-1.2A2.71,2.71,0,0,1,27,15.13a2.76,2.76,0,0,1,4.64,1.2A2.7,2.7,0,0,1,31,18.94Z\"/>\n  <path fill=\"#f85959\" transform=\"scale(0.8 0.8)\" d=\"M32,0H3.59A3.59,3.59,0,0,0,0,3.59v17A3.59,3.59,0,0,0,3.59,24.2H19.72a12.59,12.59,0,0,1-.81-1.2A11.73,11.73,0,0,1,35.54,7.28V3.59A3.59,3.59,0,0,0,32,0ZM13,14.18H4.29a1.52,1.52,0,0,1,0-3H13a1.52,1.52,0,0,1,0,3ZM16.45,8H4.29a1.51,1.51,0,0,1,0-3H16.45a1.51,1.51,0,1,1,0,3Z\"/>\n</svg>\n");

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_pip = function s_pip() {
  var player = this;
  var util = _player2.default.util;
  if (!player.config.pip) {
    return;
  }
  var pip = player.lang.PIP;
  var btn = util.createDom('xg-pip', '<p class="name"><span>' + pip + '</span></p>', { tabindex: 9 }, 'xgplayer-pip');

  player.once('ready', function () {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.emit('pipBtnClick');
    });
  });
};

_player2.default.install('s_pip', s_pip);

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

var _playNext = __webpack_require__(99);

var _playNext2 = _interopRequireDefault(_playNext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_playNext = function s_playNext() {
  var player = this;
  var util = _player2.default.util;
  var nextBtn = player.config.playNext;
  if (!nextBtn || !nextBtn.urlList) {
    return;
  }
  var btn = util.createDom('xg-playnext', '<xg-icon class="xgplayer-icon">' + _playNext2.default + '</xg-icon>', {}, 'xgplayer-playnext');
  var tipsText = player.lang.PLAYNEXT_TIPS;
  var tips = util.createDom('xg-tips', '<span class="xgplayer-tip-playnext">' + tipsText + '</span>', {}, 'xgplayer-tips');
  btn.appendChild(tips);
  player.once('ready', function () {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      _player2.default.util.addClass(player.root, 'xgplayer-is-enter');
      player.emit('playNextBtnClick');
    });
  });

  var onUrlListEnd = function onUrlListEnd() {
    _player2.default.util.addClass(player.root, 'xgplayer-playnext-inactive');
  };
  player.on('urlListEnd', onUrlListEnd);

  function onDestroy() {
    player.off('urlListEnd', onUrlListEnd);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

_player2.default.install('s_playNext', s_playNext);

/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\">\n  <path transform=\"scale(0.038 0.028)\" d=\"M800 380v768h-128v-352l-320 320v-704l320 320v-352z\"></path>\n</svg>\n");

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

var _rotate = __webpack_require__(101);

var _rotate2 = _interopRequireDefault(_rotate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_rotate = function s_rotate() {
  var player = this;
  var util = _player2.default.util;
  if (!player.config.rotate) {
    return;
  }
  var btn = util.createDom('xg-rotate', '<xg-icon class="xgplayer-icon">' + _rotate2.default + '</xg-icon>', {}, 'xgplayer-rotate');

  var tipsText = player.lang.ROTATE_TIPS;
  var tips = util.createDom('xg-tips', '<span class="xgplayer-tip-rotate">' + tipsText + '</span>', {}, 'xgplayer-tips');
  btn.appendChild(tips);
  player.once('ready', function () {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.emit('rotateBtnClick');
    });
  });
};

_player2.default.install('s_rotate', s_rotate);

/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 40 40\" fill=\"none\">\n  <g clip-path=\"url(#clip0)\">\n    <path transform=\"scale(1.5 1.5)\" d=\"M11.6665 9.16663H4.1665C2.78579 9.16663 1.6665 10.2859 1.6665 11.6666V15.8333C1.6665 17.214 2.78579 18.3333 4.1665 18.3333H11.6665C13.0472 18.3333 14.1665 17.214 14.1665 15.8333V11.6666C14.1665 10.2859 13.0472 9.16663 11.6665 9.16663Z\" fill=\"white\"/>\n    <path transform=\"scale(1.5 1.5)\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.88148 4.06298C3.75371 4.21005 3.67667 4.40231 3.67749 4.61242C3.67847 4.87253 3.79852 5.10435 3.98581 5.25646L6.99111 8.05895C7.32771 8.37283 7.85502 8.35443 8.16891 8.01782C8.48279 7.68122 8.46437 7.15391 8.12778 6.84003L6.62061 5.43457L9.8198 5.4224C9.82848 5.42239 9.8372 5.42221 9.84591 5.4219C10.9714 5.38233 12.0885 5.6285 13.0931 6.13744C14.0976 6.64635 14.957 7.40148 15.5908 8.33234C16.2246 9.2632 16.6122 10.3394 16.7177 11.4606C16.823 12.5819 16.6427 13.7115 16.1934 14.7442C16.0098 15.1661 16.203 15.6571 16.6251 15.8408C17.0471 16.0243 17.5381 15.8311 17.7216 15.4091C18.2833 14.1183 18.5087 12.7063 18.3771 11.3047C18.2453 9.90318 17.7607 8.55792 16.9684 7.39433C16.1761 6.23073 15.1021 5.28683 13.8463 4.65065C12.5946 4.01651 11.203 3.70872 9.80072 3.75583L6.43415 3.76862L7.96326 2.12885C8.27715 1.79225 8.25872 1.26494 7.92213 0.951061C7.58553 0.63718 7.05822 0.655585 6.74433 0.99219L3.90268 4.0395C3.89545 4.04724 3.88841 4.05509 3.88154 4.06303L3.88148 4.06298Z\" fill=\"white\"/>\n  </g>\n  <defs>\n    <clipPath id=\"clip0\">\n      <rect width=\"40\" height=\"40\" fill=\"white\"/>\n    </clipPath>\n  </defs>\n</svg>\n");

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

var _reload = __webpack_require__(103);

var _reload2 = _interopRequireDefault(_reload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_reload = function s_reload() {
  var player = this;
  var util = _player2.default.util;
  if (!player.config.reload) {
    return;
  }
  var btn = util.createDom('xg-reload', '<xg-icon class="xgplayer-icon">' + _reload2.default + '</xg-icon>', {}, 'xgplayer-reload');

  var tipsText = player.lang.RELOAD_TIPS;
  var tips = util.createDom('xg-tips', '<span class="xgplayer-tip-reload">' + tipsText + '</span>', {}, 'xgplayer-tips');
  btn.appendChild(tips);
  player.once('ready', function () {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.emit('reloadBtnClick');
    });
  });
};

_player2.default.install('s_reload', s_reload);

/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"28\" viewBox=\"0 0 28 28\">\n    <path fill=\"#FFF\" fill-opacity=\"1\" fill-rule=\"nonzero\" d=\"M18.17 19.988a7.182 7.182 0 0 1-4.256 1.318 7.806 7.806 0 0 1-.595-.03c-.08-.008-.16-.021-.242-.031a8.004 8.004 0 0 1-.458-.071c-.094-.018-.185-.042-.276-.063a7.743 7.743 0 0 1-.439-.113c-.068-.022-.136-.047-.205-.07a7.03 7.03 0 0 1-.492-.181c-.037-.015-.072-.032-.108-.049a7.295 7.295 0 0 1-.554-.269l-.025-.012a7.347 7.347 0 0 1-2.111-1.753c-.03-.036-.057-.074-.086-.11a7.305 7.305 0 0 1-1.594-4.557h1.686a.123.123 0 0 0 .108-.064.119.119 0 0 0-.006-.125L5.684 9.532a.123.123 0 0 0-.103-.056.123.123 0 0 0-.102.056l-2.834 4.276a.121.121 0 0 0-.005.125c.022.04.064.064.107.064h1.687c0 2.025.627 3.902 1.693 5.454.013.021.022.044.037.066.11.159.233.305.352.455.043.057.085.116.13.171.175.213.36.413.55.61.02.018.036.038.054.055a9.447 9.447 0 0 0 2.91 1.996c.058.026.115.054.175.079.202.084.41.158.619.228.098.034.196.069.296.1.183.054.37.1.558.145.125.029.249.06.376.085.052.01.102.027.155.035.177.032.355.05.533.071.064.007.128.018.19.026.32.03.639.052.956.052a9.46 9.46 0 0 0 5.47-1.746 1.16 1.16 0 0 0 .282-1.608 1.143 1.143 0 0 0-1.6-.283zm5.397-5.991a9.604 9.604 0 0 0-1.685-5.441c-.016-.027-.026-.054-.043-.078-.132-.19-.276-.366-.419-.543-.017-.022-.032-.044-.05-.065a9.467 9.467 0 0 0-3.571-2.7l-.114-.051a11.2 11.2 0 0 0-.673-.248c-.082-.027-.163-.057-.247-.082a9.188 9.188 0 0 0-.6-.156c-.113-.026-.224-.055-.337-.077-.057-.011-.109-.028-.164-.037-.151-.027-.304-.039-.455-.058-.104-.013-.208-.03-.313-.04a10.05 10.05 0 0 0-.759-.039c-.045 0-.09-.007-.136-.007l-.025.003a9.45 9.45 0 0 0-5.46 1.737 1.16 1.16 0 0 0-.284 1.608c.363.523 1.08.65 1.6.284a7.182 7.182 0 0 1 4.222-1.32c.217.002.429.013.639.033.065.007.129.017.193.025.173.021.344.046.513.08.075.014.149.033.221.05.166.037.331.077.494.127l.152.051c.185.061.366.127.545.201l.054.025a7.308 7.308 0 0 1 2.741 2.067l.013.018a7.302 7.302 0 0 1 1.652 4.633h-1.686a.123.123 0 0 0-.108.064.12.12 0 0 0 .006.124l2.834 4.277c.022.033.06.054.103.054.042 0 .08-.021.102-.054l2.833-4.277a.12.12 0 0 0 .005-.124.123.123 0 0 0-.108-.064h-1.685z\"/>\n</svg>\n");

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_screenShot = function s_screenShot() {
  var player = this;
  var util = _player2.default.util;
  if (!player.config.screenShot) {
    return;
  }
  var screenShotText = player.lang.SCREENSHOT;
  var btn = util.createDom('xg-screenshot', '<p class="name"><span>' + screenShotText + '</span></p>', { tabindex: 11 }, 'xgplayer-screenshot');
  player.once('ready', function () {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.emit('screenShotBtnClick');
    });
  });
};

_player2.default.install('s_screenShot', s_screenShot);

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_textTrack = function s_textTrack() {
  if (!this.config.textTrack) {
    return;
  }
  var player = this;
  var root = player.root;
  var util = _player2.default.util;
  var sniffer = _player2.default.sniffer;
  var controls = player.controls;
  var container = util.createDom('xg-texttrack', '', { tabindex: 7 }, 'xgplayer-texttrack');
  var list = player.config.textTrack;
  if (list && Array.isArray(list) && list.length > 0) {
    util.addClass(player.root, 'xgplayer-is-texttrack');
    player.once('canplay', function () {
      var _this = this;

      var tmp = ['<ul>'];
      tmp.push('<li class=\'' + (this.textTrackShowDefault ? '' : 'selected') + '\'}\'>' + player.lang.OFF + '</li>');
      list.forEach(function (item) {
        tmp.push('<li class=\'' + (item.default && _this.textTrackShowDefault ? 'selected' : '') + '\'>' + item.label + '</li>');
      });
      var controlText = player.lang.TEXTTRACK;
      tmp.push('</ul><p class="name">' + controlText + '</p>');

      var urlInRoot = root.querySelector('.xgplayer-texttrack');
      if (urlInRoot) {
        urlInRoot.innerHTML = tmp.join('');
        var cur = urlInRoot.querySelector('.name');
        if (!player.config.textTrackActive || player.config.textTrackActive === 'hover') {
          cur.addEventListener('mouseenter', function (e) {
            e.preventDefault();
            e.stopPropagation();
            util.addClass(root, 'xgplayer-texttrack-active');
            urlInRoot.focus();
          });
        }
      } else {
        container.innerHTML = tmp.join('');
        var _cur = container.querySelector('.name');
        if (!player.config.textTrackActive || player.config.textTrackActive === 'hover') {
          _cur.addEventListener('mouseenter', function (e) {
            e.preventDefault();
            e.stopPropagation();
            util.addClass(player.root, 'xgplayer-texttrack-active');
            container.focus();
          });
        }
        player.controls.appendChild(container);
      }
    });
  };

  ['touchend', 'click'].forEach(function (item) {
    container.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      var li = e.target || e.srcElement;
      if (li && li.tagName.toLocaleLowerCase() === 'li') {
        Array.prototype.forEach.call(li.parentNode.childNodes, function (item) {
          util.removeClass(item, 'selected');
        });
        util.addClass(li, 'selected');
        var trackDoms = player.root.getElementsByTagName('Track');
        if (li.innerHTML === player.lang.OFF) {
          trackDoms[0].track.mode = 'hidden';
          trackDoms[0].src = '';
          util.removeClass(player.root, 'xgplayer-texttrack-active');
        } else {
          trackDoms[0].style.display = 'block';
          util.addClass(player.root, 'xgplayer-texttrack-active');
          trackDoms[0].track.mode = 'showing';

          list.some(function (item) {
            if (item.label === li.innerHTML) {
              trackDoms[0].src = item.src;
              if (item.kind) {
                trackDoms[0].kind = item.kind;
              }
              trackDoms[0].label = item.label;
              if (item.srclang) {
                trackDoms[0].srclang = item.srclang;
              }
              return true;
            }
          });
          player.emit('textTrackChange', li.innerHTML);
        }
      } else if (player.config.textTrackActive === 'click' && li && (li.tagName.toLocaleLowerCase() === 'p' || li.tagName.toLocaleLowerCase() === 'em')) {
        util.addClass(player.root, 'xgplayer-texttrack-active');
        container.focus();
      }
    }, false);
  });

  player.on('play', function () {
    var ul = root.querySelector('.xgplayer-texttrack ul');
    var trackDoms = root.getElementsByTagName('Track');
    if (!player['hls'] || !ul || !trackDoms) return;
    trackDoms[0].src = '';
    Array.prototype.forEach.call(ul.childNodes, function (li) {
      if (util.hasClass(li, 'selected')) {
        if (li.innerHTML === player.lang.OFF) {
          trackDoms[0].track.mode = 'hidden';
          trackDoms[0].src = '';
        } else {
          trackDoms[0].track.mode = 'hidden';

          list.some(function (item) {
            if (item.label !== li.innerHTML) {
              trackDoms[0].src = item.src;
              if (item.kind) {
                trackDoms[0].kind = item.kind;
              }
              trackDoms[0].label = item.label;
              if (item.srclang) {
                trackDoms[0].srclang = item.srclang;
              }
              return true;
            }
          });

          list.some(function (item) {
            if (item.label === li.innerHTML) {
              setTimeout(function () {
                trackDoms[0].src = item.src;
                if (item.kind) {
                  trackDoms[0].kind = item.kind;
                }
                trackDoms[0].label = item.label;
                if (item.srclang) {
                  trackDoms[0].srclang = item.srclang;
                }
                trackDoms[0].track.mode = 'showing';
              });
              return true;
            }
          });
        }
      }
    });
    util.removeClass(player.root, 'xgplayer-texttrack-active');
  });

  container.addEventListener('mouseleave', function (e) {
    e.preventDefault();
    e.stopPropagation();
    util.removeClass(player.root, 'xgplayer-texttrack-active');
  });
};

_player2.default.install('s_textTrack', s_textTrack);

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_error = function s_error() {
  var player = this;
  var root = player.root;
  var util = _player2.default.util;

  var error = util.createDom('xg-error', '<span class="xgplayer-error-text">请<span class="xgplayer-error-refresh">刷新</span>试试</span>', {}, 'xgplayer-error');
  player.once('ready', function () {
    root.appendChild(error);
  });

  var text = error.querySelector('.xgplayer-error-text');
  var refresh = null;

  function onError() {
    // player.controls.style.display = 'none'
    // if (player.error) {
    //   text.innerHTML = player.error
    // } else {
    if (player.config.lang && player.config.lang === 'zh-cn') {
      text.innerHTML = player.config.errorTips || '\u8BF7<span class="xgplayer-error-refresh">\u5237\u65B0</span>\u8BD5\u8BD5';
    } else {
      text.innerHTML = player.config.errorTips || 'please try to <span class="xgplayer-error-refresh">refresh</span>';
    }
    // }
    util.addClass(player.root, 'xgplayer-is-error');
    refresh = error.querySelector('.xgplayer-error-refresh');
    if (refresh) {
      ['touchend', 'click'].forEach(function (item) {
        refresh.addEventListener(item, function (e) {
          e.preventDefault();
          e.stopPropagation();
          player.autoplay = true;
          player.once('playing', function () {
            util.removeClass(player.root, 'xgplayer-is-error');
          });
          player.src = player.config.url;
        });
      });
    }
  }
  player.on('error', onError);
  function onDestroy() {
    player.off('error', onError);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

_player2.default.install('s_error', s_error);

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var smemoryPlay = function smemoryPlay() {
  var player = this;
  var util = _player2.default.util;
  var lastPlayTime = player.config.lastPlayTime || 0;
  var lastPlayTimeHideDelay = player.config.lastPlayTimeHideDelay || 3;
  var dom = null;
  if (lastPlayTime <= 0) {
    return;
  }
  dom = util.createDom('xg-memoryplay', '<div class="xgplayer-memoryplay-spot"><div class="xgplayer-progress-tip">\u60A8\u4E0A\u6B21\u89C2\u770B\u5230 <span class="xgplayer-lasttime">' + util.format(lastPlayTime) + '</span> \uFF0C\u4E3A\u60A8\u81EA\u52A8\u7EED\u64AD <span class="btn-close"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg></span></div></div>', {}, 'xgplayer-memoryplay');
  dom.addEventListener('mouseover', function (e) {
    e.stopPropagation();
  });
  var removeFunc = function removeFunc() {
    dom && dom.parentNode.removeChild(dom);
    dom = null;
  };
  dom.querySelector('.xgplayer-progress-tip .btn-close').addEventListener('click', removeFunc);
  var handlePlay = function handlePlay() {
    player.root.appendChild(dom);
    player.emit('memoryPlayStart', lastPlayTime);
    if (lastPlayTimeHideDelay > 0) {
      setTimeout(function () {
        removeFunc();
      }, lastPlayTimeHideDelay * 1000);
    }
  };
  player.once('play', handlePlay);
  player.once('ended', removeFunc);
};

_player2.default.install('s_memoryPlay', smemoryPlay);

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map