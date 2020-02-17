'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _proxy = require('./proxy');

var _proxy2 = _interopRequireDefault(_proxy);

var _util = require('./utils/util');

var _util2 = _interopRequireDefault(_util);

var _sniffer = require('./utils/sniffer');

var _sniffer2 = _interopRequireDefault(_sniffer);

var _error = require('./error');

var _error2 = _interopRequireDefault(_error);

var _events = require('./events');

var Events = _interopRequireWildcard(_events);

var _plugin = require('./plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _stateClassMap = require('./stateClassMap');

var _stateClassMap2 = _interopRequireDefault(_stateClassMap);

var _default = require('./plugins/presets/default');

var _default2 = _interopRequireDefault(_default);

var _defaultConfig = require('./defaultConfig');

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

var _preset = require('./plugin/preset');

var _controls = require('./plugins/controls');

var _controls2 = _interopRequireDefault(_controls);

var _package = require('../package.json');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FULLSCREEN_EVENTS = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'];

var Player = function (_Proxy) {
  _inherits(Player, _Proxy);

  function Player(options) {
    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, options));

    _this.config = _util2.default.deepCopy((0, _defaultConfig2.default)(), options);
    _this.config.plugins = [_controls2.default].concat(_this.config.plugins);
    console.log('this.config.plugins', _this.config.plugins);
    _this.config.presets = [_default2.default];
    // timer and flags
    _this.userTimer = null;
    _this.waitTimer = null;
    _this.isProgressMoving = false;
    _this.isReady = false;
    _this.isPlaying = false;
    _this.isSeeking = false;
    _this.isActive = true;

    _this._initDOM();

    _this._bindEvents();

    _this._registerPresets();
    _this._registerPlugins();

    setTimeout(function () {
      _this.emit(Events.READY);
      _this.isReady = true;
    }, 0);

    if (_this.config.videoInit || _this.config.autoplay) {
      if (!_this.hasStart) {
        _this.start();
      }
    }
    return _this;
  }

  /**
   * init control bar
   * @private
   */


  _createClass(Player, [{
    key: '_initDOM',
    value: function _initDOM() {
      this.root = _util2.default.findDom(document, '#' + this.config.id);
      this.controls = _util2.default.createDom('xg-controls', '', {
        unselectable: 'on',
        onselectstart: 'return false'
      }, 'xgplayer-controls');
      if (!this.root) {
        var el = this.config.el;
        if (el && el.nodeType === 1) {
          this.root = el;
        } else {
          this.emit(Events.ERROR, new _error2.default('use', this.config.vid, {
            line: 32,
            handle: 'Constructor',
            msg: 'container id can\'t be empty'
          }));
          return false;
        }
      }

      this.addClass(_stateClassMap2.default.DEFAULT + ' xgplayer-' + _sniffer2.default.device + ' ' + _stateClassMap2.default.NO_START + ' ' + (this.config.controls ? '' : _stateClassMap2.default.NO_CONTROLS));
      this.root.appendChild(this.controls);
      if (this.config.fluid) {
        this.root.style['max-width'] = '100%';
        this.root.style['width'] = '100%';
        this.root.style['height'] = '0';
        this.root.style['padding-top'] = this.config.height * 100 / this.config.width + '%';

        this.video.style['position'] = 'absolute';
        this.video.style['top'] = '0';
        this.video.style['left'] = '0';
      } else {
        // this.root.style.width = `${this.config.width}px`
        // this.root.style.height = `${this.config.height}px`
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
    }
  }, {
    key: '_bindEvents',
    value: function _bindEvents() {
      var _this2 = this;

      ['focus', 'blur'].forEach(function (item) {
        _this2.on(item, _this2['on' + item.charAt(0).toUpperCase() + item.slice(1)]);
      });

      // deal with the fullscreen state change callback
      this.onFullscreenChange = function () {
        var fullEl = _util2.default.getFullScreenEl();
        if (fullEl && (fullEl === _this2._fullscreenEl || fullEl.tagName === 'VIDEO')) {
          _this2.fullscreen = true;
          _this2.addClass(_stateClassMap2.default.FULLSCREEN);
          _this2.emit(Events.FULLSCREEN_CHANGE, true);
        } else {
          _this2.fullscreen = false;
          _this2._fullscreenEl = null;
          _this2.removeClass(_stateClassMap2.default.FULLSCREEN);
          _this2.emit(Events.FULLSCREEN_CHANGE, false);
        }
      };

      FULLSCREEN_EVENTS.forEach(function (item) {
        document.addEventListener(item, _this2.onFullscreenChange);
      });

      this.once('loadeddata', this.getVideoSize);

      this.mousemoveFunc = function () {
        _this2.emit(Events.PLAYER_FOCUS);
        if (!_this2.config.closeFocusVideoFocus) {
          _this2.video.focus();
        }
      };
      this.root.addEventListener('mousemove', this.mousemoveFunc);

      this.playFunc = function () {
        _this2.emit(Events.PLAYER_FOCUS);
        if (!_this2.config.closePlayVideoFocus) {
          _this2.video.focus();
        }
      };
      this.once('play', this.playFunc);
      // if (!this.config.closeVideoClick) {
      //   ['touched', 'click'].map((key) => {
      //     this.video.addEventListener(key, () => {
      //       console.log('this.video.addEventListener')
      //       if (this.paused) {
      //         this.play()
      //       } else {
      //         this.pause()
      //       }
      //     })
      //   })
      // }
      var player = this;
      function onDestroy() {
        var _this3 = this;

        player.root.removeEventListener('mousemove', player.mousemoveFunc);
        FULLSCREEN_EVENTS.forEach(function (item) {
          document.removeEventListener(item, _this3.onFullscreenChange);
        });
        player.off('destroy', onDestroy);
      }
      player.once('destroy', onDestroy);
    }
  }, {
    key: '_startInit',
    value: function _startInit(url) {
      var _this4 = this;

      var root = this.root;
      var player = this;
      if (!url || url === '') {
        this.emit(Events.URL_NULL);
      }
      this.canPlayFunc = function () {
        this.volume = this.config.volume;
        this.play();
        player.off(Events.CANPLAY, this.canPlayFunc);
      };

      if (_util2.default.typeOf(url) === 'String') {
        this.video.src = url;
      } else {
        url.forEach(function (item) {
          _this4.video.appendChild(_util2.default.createDom('source', '', {
            src: '' + item.src,
            type: '' + (item.type || '')
          }));
        });
      }

      this.loadeddataFunc && this.once('loadeddata', this.loadeddataFunc);

      if (this.config.autoplay) {
        this.once(Events.CANPLAY, this.canPlayFunc);
      }
      root.insertBefore(this.video, root.firstChild);
      setTimeout(function () {
        _this4.emit(Events.COMPLETE);
      }, 1);
      this.hasStart = true;
      _plugin.pluginsManager.afterInit(this);
    }
    /**
     * 注册组件 组件列表config.plugins
     */

  }, {
    key: '_registerPlugins',
    value: function _registerPlugins() {
      var _this5 = this;

      var ignores = this.config.ignores || [];
      var plugins = this.config.plugins || [];
      var ignoresStr = ignores.join('||');
      plugins.map(function (plugin) {
        try {
          // 在ignores中的不做组装
          if (plugin.pluginName && ignoresStr.indexOf(plugin.pluginName.toLowerCase()) > -1) {
            return null;
          }
          if (plugin.options) {
            return _plugin.pluginsManager.register(_this5, plugin.plugin, plugin.options);
          }
          return _plugin.pluginsManager.register(_this5, plugin);
        } catch (err) {
          return null;
        }
      });
    }
  }, {
    key: '_registerPresets',
    value: function _registerPresets() {
      var _this6 = this;

      this.config.presets.forEach(function (preset) {
        (0, _preset.usePreset)(_this6, preset);
      });
    }
  }, {
    key: 'registerPlugin',
    value: function registerPlugin() {}
  }, {
    key: 'unRegistePlugin',
    value: function unRegistePlugin() {}

    /**
     * 当前播放器挂在的插件实例代码
     */

  }, {
    key: 'getPlugin',
    value: function getPlugin(pluginName) {
      return _plugin.pluginsManager.findPlugin(this, pluginName);
    }
  }, {
    key: 'addClass',
    value: function addClass(className) {
      if (!this.root) {
        return;
      }
      if (!_util2.default.hasClass(this.root, className)) {
        _util2.default.addClass(this.root, className);
      }
    }
  }, {
    key: 'removeClass',
    value: function removeClass(className) {
      if (!this.root) {
        return;
      }
      _util2.default.removeClass(this.root, className);
    }
  }, {
    key: 'start',
    value: function start(url) {
      var _this7 = this;

      // 已经开始初始化播放了 则直接调用play
      if (this.hasStart) {
        return this.play();
      } else {
        return _plugin.pluginsManager.beforeInit(this).then(function () {
          if (!url) {
            url = _this7.url || _this7.config.url;
          }
          return _this7._startInit(url);
        }).catch(function (e) {
          e.fileName = 'player';
          e.lineNumber = '236';
          throw e;
        });
      }
    }
  }, {
    key: 'play',
    value: function play() {
      var _this8 = this;

      if (!this.hasStart) {
        this.start();
        return;
      }
      var playPromise = _get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'play', this).call(this);
      if (playPromise !== undefined && playPromise && playPromise.then) {
        playPromise.then(function () {
          _this8.removeClass(_stateClassMap2.default.AUTOPLAY);
          _this8.removeClass(_stateClassMap2.default.NO_START);
          _this8.addClass(_stateClassMap2.default.PLAYING);
        }).catch(function (e) {
          // 避免AUTOPLAY_PREVENTED先于playing和play触发
          setTimeout(function () {
            _this8.emit(Events.AUTOPLAY_PREVENTED);
            _this8.addClass(_stateClassMap2.default.AUTOPLAY);
          }, 0);
          throw e;
        });
      }
      return playPromise;
    }
  }, {
    key: 'reload',
    value: function reload() {
      this.video.load();
      this.reloadFunc = function () {
        this.play().catch(function (err) {
          console.log(err);
        });
      };
      this.once('loadeddata', this.reloadFunc);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var isDelDom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      _plugin.pluginsManager.destroy(this);
      _get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'destroy', this).call(this);
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
      for (var k in this) {
        // if (k !== 'config') {
        delete this[k];
        // }
      }
    }
  }, {
    key: 'replay',
    value: function replay() {
      var _this9 = this;

      this.removeClass(_stateClassMap2.default.ENDED);
      this.once(Events.CANPLAY, function () {
        var playPromise = _this9.play();
        if (playPromise && playPromise.catch) {
          playPromise.catch(function (err) {
            console.log(err);
          });
        }
      });
      this.emit(Events.REPLAY);
      this.currentTime = 0;
    }
  }, {
    key: 'getFullscreen',
    value: function getFullscreen(el) {
      var player = this;
      if (!el) {
        el = this.root;
      }
      this._fullscreenEl = el;
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
        this.addClass(_stateClassMap2.default.CSS_FULLSCREEN);
      }
    }
  }, {
    key: 'exitFullscreen',
    value: function exitFullscreen(el) {
      if (el) {
        el = this.root;
      }
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      this.removeClass(_stateClassMap2.default.CSS_FULLSCREEN);
    }
  }, {
    key: 'getCssFullscreen',
    value: function getCssFullscreen() {
      var player = this;
      this.addClass(_stateClassMap2.default.CSS_FULLSCREEN);
      player.emit('requestCssFullscreen');
    }
  }, {
    key: 'exitCssFullscreen',
    value: function exitCssFullscreen() {
      var player = this;
      this.removeClass(_stateClassMap2.default.CSS_FULLSCREEN);
      player.emit('exitCssFullscreen');
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      this.isActive = true;
      var player = this;
      this.addClass(_stateClassMap2.default.ACTIVE);
      if (player.userTimer) {
        clearTimeout(player.userTimer);
      }
      player.userTimer = setTimeout(function () {
        this.isActive = false;
        player.emit(Events.PLAYER_BLUR);
      }, player.config.inactive);
    }
  }, {
    key: 'onBlur',
    value: function onBlur() {
      if (!this.paused && !this.ended) {
        this.removeClass(_stateClassMap2.default.ACTIVE);
      }
    }
  }, {
    key: 'onPlay',
    value: function onPlay() {
      this.addClass(_stateClassMap2.default.PLAYING);
      this.removeClass(_stateClassMap2.default.PAUSED);
      this.ended && this.removeClass(_stateClassMap2.default.ENDED);
      this.emit(Events.PLAYER_FOCUS);
    }
  }, {
    key: 'onPause',
    value: function onPause() {
      this.addClass(_stateClassMap2.default.PAUSED);
      if (this.userTimer) {
        clearTimeout(this.userTimer);
      }
      this.emit(Events.PLAYER_FOCUS);
    }
  }, {
    key: 'onEnded',
    value: function onEnded() {
      this.addClass(_stateClassMap2.default.ENDED);
      this.removeClass(_stateClassMap2.default.PLAYING);
    }
  }, {
    key: 'onSeeking',
    value: function onSeeking() {
      this.isSeeking = true;
      // util.addClass(this.root, 'seeking');
    }
  }, {
    key: 'onSeeked',
    value: function onSeeked() {
      this.isSeeking = false;
      // for ie,playing fired before waiting
      if (this.waitTimer) {
        clearTimeout(this.waitTimer);
      }
      this.removeClass(_stateClassMap2.default.LOADING);
    }
  }, {
    key: 'onWaiting',
    value: function onWaiting() {
      var _this10 = this;

      var self = this;
      if (self.waitTimer) {
        clearTimeout(self.waitTimer);
      }
      self.waitTimer = setTimeout(function () {
        _this10.addClass(_stateClassMap2.default.LOADING);
      }, 500);
    }
  }, {
    key: 'onPlaying',
    value: function onPlaying() {
      var _this11 = this;

      if (this.waitTimer) {
        clearTimeout(this.waitTimer);
      }
      var NO_START = _stateClassMap2.default.NO_START,
          PAUSED = _stateClassMap2.default.PAUSED,
          ENDED = _stateClassMap2.default.ENDED,
          ERROR = _stateClassMap2.default.ERROR,
          REPLAY = _stateClassMap2.default.REPLAY,
          LOADING = _stateClassMap2.default.LOADING;

      var clsList = [NO_START, PAUSED, ENDED, ERROR, REPLAY, LOADING];
      clsList.forEach(function (cls) {
        _this11.removeClass(cls);
      });
      this.addClass(_stateClassMap2.default.PLAYING);
    }
  }, {
    key: 'getVideoSize',
    value: function getVideoSize() {
      if (this.video.videoWidth && this.video.videoHeight) {
        var containerSize = this.root.getBoundingClientRect();
        if (this.config.fitVideoSize === 'auto') {
          if (containerSize.width / containerSize.height > this.video.videoWidth / this.video.videoHeight) {
            this.root.style.height = this.video.videoHeight / this.video.videoWidth * containerSize.width + 'px';
          } else {
            this.root.style.width = this.video.videoWidth / this.video.videoHeight * containerSize.height + 'px';
          }
        } else if (this.config.fitVideoSize === 'fixWidth') {
          this.root.style.height = this.video.videoHeight / this.video.videoWidth * containerSize.width + 'px';
        } else if (this.config.fitVideoSize === 'fixHeight') {
          this.root.style.width = this.video.videoWidth / this.video.videoHeight * containerSize.height + 'px';
        }
      }
    }
  }, {
    key: 'plugins',
    get: function get() {
      return _plugin.pluginsManager.getPlugins(this);
    }
  }, {
    key: 'version',
    get: function get() {
      return _package.version;
    }
  }, {
    key: 'url',
    set: function set(url) {
      this.__url = url;
    },
    get: function get() {
      return this.__url || this.config.url;
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
    key: 'fullscreen',
    get: function get() {
      return this._isFullScreen;
    },
    set: function set(val) {
      this._isFullScreen = val;
    }
  }, {
    key: 'bullet',
    get: function get() {
      return _util2.default.findDom(this.root, 'xg-bullet') ? _util2.default.hasClass(_util2.default.findDom(this.root, 'xg-bullet'), 'xgplayer-has-bullet') : false;
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

    /***
     * TODO
     * 插件全部迁移完成再做删除
     */

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

    /***
     * TODO
     * 插件全部迁移完成再做删除
     */

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
Player.Events = Events;
Player.Plugin = _plugin2.default;
Player.BasePlugin = _plugin.BasePlugin;
exports.default = Player;