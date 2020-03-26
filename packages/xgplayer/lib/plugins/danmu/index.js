'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DanmuPanel = exports.DanmuIcon = exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _danmu = require('danmu.js');

var _danmu2 = _interopRequireDefault(_danmu);

var _plugin = require('../../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _danmuPanel = require('./danmuPanel');

var _danmuPanel2 = _interopRequireDefault(_danmuPanel);

var _danmuIcon = require('./danmuIcon');

var _danmuIcon2 = _interopRequireDefault(_danmuIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Events = _plugin2.default.Events;

var Danmu = function (_Plugin) {
  _inherits(Danmu, _Plugin);

  function Danmu(args) {
    _classCallCheck(this, Danmu);

    var _this = _possibleConstructorReturn(this, (Danmu.__proto__ || Object.getPrototypeOf(Danmu)).call(this, args));

    _this.danmujs = null;
    _this.danmuPanel = null;
    return _this;
  }

  _createClass(Danmu, [{
    key: 'afterCreate',
    value: function afterCreate() {
      var _this2 = this;

      this.once(Events.COMPLETE, function () {
        _this2.initDanmu();
        _this2.registerExtIcons();
      });

      this.config.defaultOpen && this.once(Events.TIME_UPDATE, function () {
        _this2.start();
      });
    }
  }, {
    key: 'onPluginsReady',
    value: function onPluginsReady() {
      // 添加点击触发事件触发 依赖pc插件
      var pcPlugin = this.player.plugins.pc;
      if (pcPlugin) {
        pcPlugin.onVideoDblClick && this.bind('dblclick', pcPlugin.onVideoDblClick);
        pcPlugin.onVideoClick && this.bind('click', pcPlugin.onVideoClick);
      }
    }
  }, {
    key: 'initDanmu',
    value: function initDanmu() {
      var player = this.player,
          config = this.config;

      var danmuConfig = {
        container: this.root,
        player: player.video,
        comments: config.comments,
        area: config.area
      };
      player.danmu = this.danmujs = new _danmu2.default(danmuConfig);
    }
  }, {
    key: 'registerExtIcons',
    value: function registerExtIcons() {
      var _this3 = this;

      console.log('registerExtIcons');
      var player = this.player,
          config = this.config;

      if (config.panel) {
        var panelOptions = {
          config: {
            onChangeset: function onChangeset(set) {
              _this3.changeSet(set);
            }
          }
        };
        this.danmuPanel = player.controls.registerPlugin(_danmuPanel2.default, panelOptions, _danmuPanel2.default.pluginName);
      }
      if (!config.closeDefaultBtn) {
        var buttonOptions = {
          config: {
            onSwitch: function onSwitch(isOpen) {
              _this3.onSwitch(isOpen);
            },
            defaultOpen: this.config.defaultOpen
          }
        };
        this.danmuButton = player.controls.registerPlugin(_danmuIcon2.default, buttonOptions, _danmuIcon2.default.pluginName);
      }
    }
  }, {
    key: 'changeSet',
    value: function changeSet(set) {
      console.log('changeSet', set);
    }
  }, {
    key: 'onSwitch',
    value: function onSwitch(defaultOpen) {
      if (defaultOpen) {
        this.start();
      } else {
        this.stop();
      }
    }
  }, {
    key: 'start',
    value: function start() {
      this.danmujs && this.danmujs.start();
      this.show();
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.danmujs && this.danmujs.stop();
      this.hide();
    }
  }, {
    key: 'render',
    value: function render() {
      return '<xg-danmu class="xgplayer-danmu">\n    <p>vrevtrbtr</p>\n    </xg-danmu>';
    }
  }], [{
    key: 'pluginName',
    get: function get() {
      return 'danmu';
    }
  }, {
    key: 'defaultConfig',
    get: function get() {
      return {
        comments: [], // 弹幕数组,
        area: { // 弹幕显示区域
          start: 0, // 区域顶部到播放器顶部所占播放器高度的比例
          end: 1 // 区域底部到播放器顶部所占播放器高度的比例
        },
        closeDefaultBtn: true, // TODO: 开启此项后不使用默认提供的弹幕开关，默认使用西瓜播放器提供的开关
        defaultOff: true, // TODO: 开启此项后弹幕不会初始化，默认初始化弹幕
        panel: false, // 是否安装配置面板
        panelConfig: {}, // 配置面板促使配置
        switchConfig: {}, // 开关按钮配置信息
        defaultOpen: true // 是否默认开启弹幕
      };
    }
  }]);

  return Danmu;
}(_plugin2.default);

exports.default = Danmu;
exports.DanmuIcon = _danmuIcon2.default;
exports.DanmuPanel = _danmuPanel2.default;