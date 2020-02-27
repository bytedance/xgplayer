var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Proxy from './proxy';
import util from './utils/util';
import sniffer from './utils/sniffer';
import Errors from './error';
import * as Events from './events';
import Plugin, { pluginsManager, BasePlugin } from './plugin';
import STATE_CLASS from './stateClassMap';
import defaultPreset from './presets/default';
import getDefaultConfig from './defaultConfig';
import { usePreset } from './plugin/preset';
import Controls from './plugins/controls';
import BaseBar from './plugins/baseBar';
import { version } from '../package.json';

var FULLSCREEN_EVENTS = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'];

var Player = function (_Proxy) {
  _inherits(Player, _Proxy);

  function Player(options) {
    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, options));

    _this.config = util.deepCopy(getDefaultConfig(), options);
    _this.config.presets = [defaultPreset];
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
      var _this2 = this;

      this.root = util.findDom(document, '#' + this.config.id);
      if (!this.root) {
        var el = this.config.el;
        if (el && el.nodeType === 1) {
          this.root = el;
        } else {
          this.emit(Events.ERROR, new Errors('use', this.config.vid, {
            line: 32,
            handle: 'Constructor',
            msg: 'container id can\'t be empty'
          }));
          return false;
        }
      }
      var baseBar = pluginsManager.register(this, BaseBar);
      this.baseBar = baseBar;
      var controls = pluginsManager.register(this, Controls, { isHide: !!this.config.controls });
      this.controls = controls;
      this.addClass(STATE_CLASS.DEFAULT + ' xgplayer-' + sniffer.device + ' ' + STATE_CLASS.NO_START + ' ' + (this.config.controls ? '' : STATE_CLASS.NO_CONTROLS));
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
        console.log('style', style);
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
        var fullEl = util.getFullScreenEl();
        if (fullEl && (fullEl === _this3._fullscreenEl || fullEl.tagName === 'VIDEO')) {
          _this3.fullscreen = true;
          _this3.addClass(STATE_CLASS.FULLSCREEN);
          _this3.emit(Events.FULLSCREEN_CHANGE, true);
        } else {
          _this3.fullscreen = false;
          _this3._fullscreenEl = null;
          _this3.removeClass(STATE_CLASS.FULLSCREEN);
          _this3.emit(Events.FULLSCREEN_CHANGE, false);
        }
      };

      FULLSCREEN_EVENTS.forEach(function (item) {
        document.addEventListener(item, _this3.onFullscreenChange);
      });

      this.once('loadeddata', this.getVideoSize);

      this.mousemoveFunc = function () {
        _this3.emit(Events.PLAYER_FOCUS);
        if (!_this3.config.closeFocusVideoFocus) {
          _this3.video.focus();
        }
      };
      this.root.addEventListener('mousemove', this.mousemoveFunc);

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
      var player = this;
      if (!url || url === '') {
        this.emit(Events.URL_NULL);
      }
      this.canPlayFunc = function () {
        this.volume = this.config.volume;
        this.play();
        player.off(Events.CANPLAY, this.canPlayFunc);
      };

      if (util.typeOf(url) === 'String') {
        this.video.src = url;
      } else {
        url.forEach(function (item) {
          _this5.video.appendChild(util.createDom('source', '', {
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
      this.hasStart = true;
      pluginsManager.afterInit(this);
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
            var loadingPlugin = pluginsManager.lazyRegister(_this6, plugin);
            if (plugin.forceBeforeInited) {
              loadingPlugin.then(function () {
                _this6._loadingPlugins.splice(_this6._loadingPlugins.indexOf(loadingPlugin), 1);
              }).catch(function () {
                _this6._loadingPlugins.splice(_this6._loadingPlugins.indexOf(loadingPlugin), 1);
              });
              _this6._loadingPlugins.push(loadingPlugin);
            }

            return;
          }
          console.log(plugin.pluginName);
          return _this6.registerPlugin(plugin);
        } catch (err) {
          return null;
        }
      });
    }
  }, {
    key: '_registerPresets',
    value: function _registerPresets() {
      var _this7 = this;

      this.config.presets.forEach(function (preset) {
        usePreset(_this7, preset);
      });
    }
  }, {
    key: 'registerPlugin',
    value: function registerPlugin(plugin) {
      var PLUFGIN = null;
      var options = {};
      if (plugin.plugin && typeof plugin.plugin === 'function') {
        PLUFGIN = plugin.plugin;
        options = plugin.options;
      } else {
        PLUFGIN = plugin;
        options = {};
      }
      if (!options.root) {
        var rootType = options.rootType ? options.rootType : PLUFGIN.defaultConfig && PLUFGIN.defaultConfig.rootType;
        var ROOT_TYPES = Plugin.ROOT_TYPES;

        if (rootType === ROOT_TYPES.CONTROLS) {
          return this.controls.registerPlugin(PLUFGIN.pluginName, PLUFGIN, options);
        } else if (rootType === ROOT_TYPES.BASE_BAR) {
          return this.baseBar.registerPlugin(PLUFGIN.pluginName, PLUFGIN, options);
        }
      }
      return pluginsManager.register(this, PLUFGIN, options);
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
      return pluginsManager.findPlugin(this, pluginName);
    }
  }, {
    key: 'addClass',
    value: function addClass(className) {
      if (!this.root) {
        return;
      }
      if (!util.hasClass(this.root, className)) {
        util.addClass(this.root, className);
      }
    }
  }, {
    key: 'removeClass',
    value: function removeClass(className) {
      if (!this.root) {
        return;
      }
      util.removeClass(this.root, className);
    }
  }, {
    key: 'start',
    value: function start(url) {
      var _this8 = this;

      // 已经开始初始化播放了 则直接调用play
      if (this.hasStart) {
        return this.play();
      } else {
        return pluginsManager.beforeInit(this).then(function () {
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
        this.start();
        return;
      }
      var playPromise = _get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'play', this).call(this);
      if (playPromise !== undefined && playPromise && playPromise.then) {
        playPromise.then(function () {
          _this9.removeClass(STATE_CLASS.AUTOPLAY);
          _this9.removeClass(STATE_CLASS.NO_START);
          _this9.addClass(STATE_CLASS.PLAYING);
        }).catch(function (e) {
          // 避免AUTOPLAY_PREVENTED先于playing和play触发
          setTimeout(function () {
            _this9.emit(Events.AUTOPLAY_PREVENTED);
            _this9.addClass(STATE_CLASS.AUTOPLAY);
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

      pluginsManager.destroy(this);
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

      this.removeClass(STATE_CLASS.ENDED);
      this.once(Events.CANPLAY, function () {
        var playPromise = _this10.play();
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
        this.addClass(STATE_CLASS.CSS_FULLSCREEN);
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
      this.removeClass(STATE_CLASS.CSS_FULLSCREEN);
    }
  }, {
    key: 'getCssFullscreen',
    value: function getCssFullscreen() {
      var player = this;
      this.addClass(STATE_CLASS.CSS_FULLSCREEN);
      player.emit('requestCssFullscreen');
    }
  }, {
    key: 'exitCssFullscreen',
    value: function exitCssFullscreen() {
      var player = this;
      this.removeClass(STATE_CLASS.CSS_FULLSCREEN);
      player.emit('exitCssFullscreen');
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      console.log('onFocus');
      this.isActive = true;
      var player = this;
      this.removeClass(STATE_CLASS.ACTIVE);
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
      console.log('onBlur');
      if (!this.paused && !this.ended) {
        this.addClass(STATE_CLASS.ACTIVE);
      }
    }
  }, {
    key: 'onPlay',
    value: function onPlay() {
      this.addClass(STATE_CLASS.PLAYING);
      this.removeClass(STATE_CLASS.PAUSED);
      this.ended && this.removeClass(STATE_CLASS.ENDED);
      this.emit(Events.PLAYER_FOCUS);
    }
  }, {
    key: 'onPause',
    value: function onPause() {
      this.addClass(STATE_CLASS.PAUSED);
      if (this.userTimer) {
        clearTimeout(this.userTimer);
      }
      this.emit(Events.PLAYER_FOCUS);
    }
  }, {
    key: 'onEnded',
    value: function onEnded() {
      this.addClass(STATE_CLASS.ENDED);
      this.removeClass(STATE_CLASS.PLAYING);
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
      this.removeClass(STATE_CLASS.LOADING);
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
        _this11.addClass(STATE_CLASS.LOADING);
      }, 500);
    }
  }, {
    key: 'onPlaying',
    value: function onPlaying() {
      var _this12 = this;

      if (this.waitTimer) {
        clearTimeout(this.waitTimer);
      }
      var NO_START = STATE_CLASS.NO_START,
          PAUSED = STATE_CLASS.PAUSED,
          ENDED = STATE_CLASS.ENDED,
          ERROR = STATE_CLASS.ERROR,
          REPLAY = STATE_CLASS.REPLAY,
          LOADING = STATE_CLASS.LOADING;

      var clsList = [NO_START, PAUSED, ENDED, ERROR, REPLAY, LOADING];
      clsList.forEach(function (cls) {
        _this12.removeClass(cls);
      });
      this.addClass(STATE_CLASS.PLAYING);
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
      return pluginsManager.getPlugins(this);
    }
  }, {
    key: 'version',
    get: function get() {
      return version;
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
      var poster = util.findDom(this.root, '.xgplayer-poster');
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
      return util.findDom(this.root, 'xg-bullet') ? util.hasClass(util.findDom(this.root, 'xg-bullet'), 'xgplayer-has-bullet') : false;
    }
  }, {
    key: 'textTrack',
    get: function get() {
      return util.hasClass(this.root, 'xgplayer-is-textTrack');
    }
  }, {
    key: 'pip',
    get: function get() {
      return util.hasClass(this.root, 'xgplayer-pip-active');
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
}(Proxy);

Player.util = util;
Player.sniffer = sniffer;
Player.Errors = Errors;
Player.Events = Events;
Player.Plugin = Plugin;
Player.BasePlugin = BasePlugin;
export default Player;