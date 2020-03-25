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

    _this.config = _util2.default.deepMerge((0, _defaultConfig2.default)(), options);
    _this.config.presets = [];

    // resolve default preset
    if (_this.config.presets.length) {
      var defaultIdx = _this.config.presets.indexOf('default');
      if (defaultIdx >= 0 && Player.defaultPreset) {
        _this.config.presets.push(Player.defaultPreset);
        _this.config.presets.splice(defaultIdx, 1);
      }
    } else if (Player.defaultPreset) {
      _this.config.presets.push(Player.defaultPreset);
    }

    // timer and flags
    _this.userTimer = null;
    _this.waitTimer = null;
    _this.isReady = false;
    _this.isPlaying = false;
    _this.isSeeking = false;
    _this.isActive = true;
    _this.isCssfullScreen = false;

    _this._initDOM();

    _this._bindEvents();
    _this._registerPresets();
    _this._registerPlugins();
    _plugin.pluginsManager.onPluginsReady(_this);

    setTimeout(function () {
      _this.emit(Events.READY);
      _this.onReady && _this.onReady();
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
      var _this2 = this;

      this.root = _util2.default.findDom(document, '#' + this.config.id);
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
      this.topBar = _util2.default.createDom('xg-bar', '', '', 'xg-top-bar');
      this.leftBar = _util2.default.createDom('xg-bar', '', '', 'xg-left-bar');
      this.rightBar = _util2.default.createDom('xg-bar', '', '', 'xg-right-bar');
      this.root.appendChild(this.topBar);
      this.root.appendChild(this.leftBar);
      this.root.appendChild(this.rightBar);
      // const baseBar = pluginsManager.register(this, BaseBar)
      // this.baseBar = baseBar
      var controls = _plugin.pluginsManager.register(this, _controls2.default);
      this.controls = controls;
      this.addClass(_stateClassMap2.default.DEFAULT + ' xgplayer-' + _sniffer2.default.device + ' ' + _stateClassMap2.default.NO_START + ' ' + (this.config.controls ? '' : _stateClassMap2.default.NO_CONTROLS));
      if (this.config.autoplay) {
        this.addClass(_stateClassMap2.default.ENTER);
      }
      if (this.config.fluid) {
        var style = {
          'max-width': '100%',
          'width': '100%',
          'height': '0',
          'padding-top': this.config.height * 100 / this.config.width + '%',
          'position': 'position',
          'top': '0',
          'left': '0'
        };
        Object.keys(style).map(function (key) {
          _this2.root.style[key] = style[key];
        });
      } else {
        ['width', 'height'].map(function (key) {
          if (_this2.config[key]) {
            if (typeof _this2.config[key] !== 'number') {
              _this2.root.style[key] = _this2.config[key];
            } else {
              _this2.root.style[key] = _this2.config[key] + 'px';
            }
          }
        });
      }
    }
  }, {
    key: '_bindEvents',
    value: function _bindEvents() {
      var _this3 = this;

      ['focus', 'blur'].forEach(function (item) {
        _this3.on(item, _this3['on' + item.charAt(0).toUpperCase() + item.slice(1)]);
      });

      // deal with the fullscreen state change callback
      this.onFullscreenChange = function () {
        var fullEl = _util2.default.getFullScreenEl();
        if (fullEl && (fullEl === _this3._fullscreenEl || fullEl.tagName === 'VIDEO')) {
          _this3.fullscreen = true;
          _this3.addClass(_stateClassMap2.default.FULLSCREEN);
          _this3.emit(Events.FULLSCREEN_CHANGE, true);
        } else {
          _this3.fullscreen = false;
          _this3._fullscreenEl = null;
          _this3.removeClass(_stateClassMap2.default.FULLSCREEN);
          _this3.emit(Events.FULLSCREEN_CHANGE, false);
        }
      };

      FULLSCREEN_EVENTS.forEach(function (item) {
        document.addEventListener(item, _this3.onFullscreenChange);
      });

      this.once('loadeddata', this.getVideoSize);

      this.mousemoveFunc = function () {
        // 加上判断减少触发次数
        if (_this3.isActive) {
          return;
        }
        _this3.emit(Events.PLAYER_FOCUS);
        if (!_this3.config.closeFocusVideoFocus) {
          _this3.video.focus();
        }
      };
      var eventkey = _sniffer2.default.service === 'mobile' ? 'touchstart' : 'mousemove';
      this.root.addEventListener(eventkey, this.mousemoveFunc);

      this.playFunc = function () {
        _this3.emit(Events.PLAYER_FOCUS);
        if (!_this3.config.closePlayVideoFocus) {
          _this3.video.focus();
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
        var _this4 = this;

        player.root.removeEventListener('mousemove', player.mousemoveFunc);
        player.root.removeEventListener(eventkey, this.mousemoveFunc);
        FULLSCREEN_EVENTS.forEach(function (item) {
          document.removeEventListener(item, _this4.onFullscreenChange);
        });
        player.off('destroy', onDestroy);
      }
      player.once('destroy', onDestroy);
    }
  }, {
    key: '_startInit',
    value: function _startInit(url) {
      var _this5 = this;

      var root = this.root;
      if (!url || url === '') {
        this.emit(Events.URL_NULL);
      }
      this.canPlayFunc = function () {
        this.volume = this.config.volume;
        this.play();
        this.off(Events.CANPLAY, this.canPlayFunc);
        this.removeClass(_stateClassMap2.default.ENTER);
      };

      if (_util2.default.typeOf(url) === 'String') {
        this.video.src = url;
      } else {
        url.forEach(function (item) {
          _this5.video.appendChild(_util2.default.createDom('source', '', {
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
        _this5.emit(Events.COMPLETE);
      }, 1);
      if (!this.hasStart) {
        _plugin.pluginsManager.afterInit(this);
      }
      this.hasStart = true;
    }
    /**
     * 注册组件 组件列表config.plugins
     */

  }, {
    key: '_registerPlugins',
    value: function _registerPlugins() {
      var _this6 = this;

      this._loadingPlugins = [];
      var ignores = this.config.ignores || [];
      var plugins = this.config.plugins || [];
      var ignoresStr = ignores.join('||');
      plugins.map(function (plugin) {
        try {
          // 在ignores中的不做组装
          if (plugin.pluginName && ignoresStr.indexOf(plugin.pluginName.toLowerCase()) > -1) {
            return null;
          }
          if (plugin.lazy && plugin.loader) {
            var loadingPlugin = _plugin.pluginsManager.lazyRegister(_this6, plugin);
            if (plugin.forceBeforeInit) {
              loadingPlugin.then(function () {
                _this6._loadingPlugins.splice(_this6._loadingPlugins.indexOf(loadingPlugin), 1);
              }).catch(function () {
                _this6._loadingPlugins.splice(_this6._loadingPlugins.indexOf(loadingPlugin), 1);
              });
              _this6._loadingPlugins.push(loadingPlugin);
            }

            return;
          }
          return _this6.registerPlugin(plugin);
        } catch (err) {
          console.error(err);
          return null;
        }
      });
    }
  }, {
    key: '_registerPresets',
    value: function _registerPresets() {
      var _this7 = this;

      this.config.presets.forEach(function (preset) {
        (0, _preset.usePreset)(_this7, preset);
      });
    }
  }, {
    key: 'registerPlugin',
    value: function registerPlugin(plugin) {
      var PLUFGIN = null;
      var options = null;
      if (plugin.plugin && typeof plugin.plugin === 'function') {
        PLUFGIN = plugin.plugin;
        options = plugin.options;
      } else {
        PLUFGIN = plugin;
        options = {};
      }

      var position = options.position ? options.position : PLUFGIN.defaultConfig && PLUFGIN.defaultConfig.position;
      var POSITIONS = _plugin2.default.POSITIONS;

      if (!options.root && typeof position === 'string' && position.indexOf('controls') > -1) {
        return this.controls.registerPlugin(PLUFGIN, options, PLUFGIN.pluginName);
      }
      switch (position) {
        case POSITIONS.ROOT_RIGHT:
          options.root = this.rightBar;
          break;
        case POSITIONS.ROOT_LEFT:
          options.root = this.leftBar;
          break;
        case POSITIONS.ROOT_TOP:
          options.root = this.topBar;
          break;
        default:
          options.root = this.root;
          break;
      }
      return _plugin.pluginsManager.register(this, PLUFGIN, options);
    }
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
      var _this8 = this;

      // 已经开始初始化播放了 则直接调用play
      if (this.hasStart) {
        return this.play();
      } else {
        return _plugin.pluginsManager.beforeInit(this).then(function () {
          if (!url) {
            url = _this8.url || _this8.config.url;
          }
          return _this8._startInit(url);
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
      var _this9 = this;

      if (!this.hasStart) {
        this.start().then(function (resolve) {
          _this9.play();
        });
        return;
      }
      var playPromise = _get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'play', this).call(this);
      if (playPromise !== undefined && playPromise && playPromise.then) {
        playPromise.then(function () {
          _this9.removeClass(_stateClassMap2.default.NOT_ALLOW_AUTOPLAY);
          _this9.removeClass(_stateClassMap2.default.NO_START);
          _this9.addClass(_stateClassMap2.default.PLAYING);
          _this9.isPlaying = true;
        }).catch(function (e) {
          // 避免AUTOPLAY_PREVENTED先于playing和play触发
          setTimeout(function () {
            _this9.emit(Events.AUTOPLAY_PREVENTED);
            _this9.addClass(_stateClassMap2.default.NOT_ALLOW_AUTOPLAY);
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
      var _this10 = this;

      this.removeClass(_stateClassMap2.default.ENDED);
      this.once(Events.CANPLAY, function () {
        var playPromise = _this10.play();
        if (playPromise && playPromise.catch) {
          playPromise.catch(function (err) {
            console.log(err);
          });
        }
      });
      this.currentTime = 0;
      this.play();
      this.emit(Events.REPLAY);
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
      this.addClass(_stateClassMap2.default.CSS_FULLSCREEN);
      if (this.config.fluid) {
        this.root.style['padding-top'] = '';
      }
      this.isCssfullScreen = true;
      this.emit(Events.CSS_FULLSCREEN_CHANGE, true);
    }
  }, {
    key: 'exitCssFullscreen',
    value: function exitCssFullscreen() {
      if (this.config.fluid) {
        this.root.style['width'] = '100%';
        this.root.style['height'] = '0';
        this.root.style['padding-top'] = this.config.height * 100 / this.config.width + '%';
      }
      this.removeClass(_stateClassMap2.default.CSS_FULLSCREEN);
      this.isCssfullScreen = false;
      this.emit(Events.CSS_FULLSCREEN_CHANGE, false);
    }
  }, {
    key: 'onFocus',
    value: function onFocus(notAutoHide) {
      this.isActive = true;
      var player = this;
      this.removeClass(_stateClassMap2.default.ACTIVE);
      if (player.userTimer) {
        clearTimeout(player.userTimer);
      }
      if (notAutoHide) {
        return;
      }
      player.userTimer = setTimeout(function () {
        this.isActive = false;
        player.emit(Events.PLAYER_BLUR);
      }, player.config.inactive);
    }
  }, {
    key: 'onBlur',
    value: function onBlur() {
      this.isActive = false;
      if (!this.paused && !this.ended) {
        this.addClass(_stateClassMap2.default.ACTIVE);
      }
    }
  }, {
    key: 'onPlay',
    value: function onPlay() {
      // this.addClass(STATE_CLASS.PLAYING)
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
      var _this11 = this;

      var self = this;
      if (self.waitTimer) {
        clearTimeout(self.waitTimer);
      }
      self.waitTimer = setTimeout(function () {
        _this11.addClass(_stateClassMap2.default.LOADING);
      }, 500);
    }
  }, {
    key: 'onPlaying',
    value: function onPlaying() {
      var _this12 = this;

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
        _this12.removeClass(cls);
      });
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
    key: 'seek',
    value: function seek(time) {
      if (!this.video || isNaN(Number(time)) || time > this.duration) {
        return;
      }
      time = time < 0 ? 0 : time;
      this.currentTime = time;
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

Player.Util = _util2.default;
Player.Sniffer = _sniffer2.default;
Player.Errors = _error2.default;
Player.Events = Events;
Player.Plugin = _plugin2.default;
Player.BasePlugin = _plugin.BasePlugin;
exports.default = Player;