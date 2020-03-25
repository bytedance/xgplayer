'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MiniScreenIcon = exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plugin = require('../../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _play = require('../assets/play.svg');

var _play2 = _interopRequireDefault(_play);

var _pause = require('../assets/pause.svg');

var _pause2 = _interopRequireDefault(_pause);

var _miniScreenIcon = require('./miniScreenIcon');

var _miniScreenIcon2 = _interopRequireDefault(_miniScreenIcon);

require('./index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Util = _plugin2.default.Util,
    Events = _plugin2.default.Events;

var MiniScreen = function (_Plugin) {
  _inherits(MiniScreen, _Plugin);

  _createClass(MiniScreen, null, [{
    key: 'pluginName',
    get: function get() {
      return 'miniscreen';
    }
  }, {
    key: 'defaultConfig',
    get: function get() {
      return {
        disable: false,
        width: 320,
        height: 180,
        left: -1, // 默认左下角
        top: -1, // 默认左下角
        isShowIcon: false, // 是否显示icon
        isScrollSwitch: false, // 滚动自动切换自动切换
        scrollTop: 0, // 触发滚动的高度
        disableDrag: false // 禁用拖拽
      };
    }
  }]);

  function MiniScreen(args) {
    _classCallCheck(this, MiniScreen);

    var _this = _possibleConstructorReturn(this, (MiniScreen.__proto__ || Object.getPrototypeOf(MiniScreen)).call(this, args));

    _this.isMini = false;
    var config = _this.config;

    _this.pos = {
      left: config.left < 0 ? window.innerWidth - config.width - 20 : config.left,
      top: config.top < 0 ? window.innerHeight - config.height - 20 : config.top,
      height: _this.config.height,
      width: _this.config.width
    };
    _this.coordinate = {
      currentX: 0,
      currentY: 0,
      scrollY: window.scrollY || 0
    };
    _this.lastStyle = null;
    _this.isMoveing = false;
    return _this;
  }

  _createClass(MiniScreen, [{
    key: 'beforeCreate',
    value: function beforeCreate(args) {
      if (typeof args.player.config.mini === 'boolean') {
        args.config.isShowIcon = args.player.config.mini;
      }
    }
  }, {
    key: 'afterCreate',
    value: function afterCreate() {
      var _this2 = this;

      var bindFunKeys = ['onMousemove', 'onMousedown', 'onMouseup', 'onCancelClick', 'onCenterClick', 'onScroll'];
      bindFunKeys.map(function (key) {
        _this2[key] = _this2[key].bind(_this2);
      });
      this.initIcons();
      this.on(Events.PAUSE, function () {
        _this2.setAttr('data-state', 'pause');
      });
      this.on(Events.PLAY, function () {
        _this2.setAttr('data-state', 'play');
      });
    }
  }, {
    key: 'onPluginsReady',
    value: function onPluginsReady() {
      var _this3 = this;

      var player = this.player,
          config = this.config;

      if (config.disable) {
        return;
      }
      if (this.config.isShowIcon) {
        var options = {
          config: {
            onClick: function onClick() {
              _this3.getMini();
            }
          }
        };
        this.miniIcon = player.controls.registerPlugin(_miniScreenIcon2.default, options, _miniScreenIcon2.default.pluginName);
      }
      this.bind('.mini-cancel-btn', 'click', this.onCancelClick);
      this.bind('.play-icon', 'click', this.onCenterClick);
      if (!this.config.disableDrag) {
        this.bind('mousedown', this.onMousedown);
      }
      if (this.config.isScrollSwitch) {
        window.addEventListener('scroll', this.onScroll);
      }
    }
  }, {
    key: 'registerIcons',
    value: function registerIcons() {
      return {
        play: { icon: _play2.default, class: 'xg-icon-play' },
        pause: { icon: _pause2.default, class: 'xg-icon-pause' }
      };
    }
  }, {
    key: 'initIcons',
    value: function initIcons() {
      var icons = this.icons;

      this.appendChild('.play-icon', icons.play);
      this.appendChild('.play-icon', icons.pause);
    }
  }, {
    key: 'onCancelClick',
    value: function onCancelClick(e) {
      this.exitMini();
    }
  }, {
    key: 'onCenterClick',
    value: function onCenterClick(e) {
      var player = this.player;

      player.paused ? player.play() : player.pause();
    }
  }, {
    key: 'onScroll',
    value: function onScroll(e) {
      if (!window.scrollY && window.scrollY !== 0 || Math.abs(window.scrollY - this.coordinate.scrollY) < 50) {
        return;
      }
      var scrollHeight = parseInt(Util.getCss(this.player.root, 'height'));
      scrollHeight += this.config.scrollTop;
      this.coordinate.scrollY = window.scrollY;
      if (window.scrollY > scrollHeight + 5 && !this.isMini) {
        this.getMini();
      } else if (window.scrollY <= scrollHeight && this.isMini) {
        this.exitMini();
      }
    }
  }, {
    key: 'onMousedown',
    value: function onMousedown(e) {
      if (e.target !== this.root || this.isMoveing) {
        return;
      }
      this.isMoveing = true;
      this.coordinate.currentX = e.clientX;
      this.coordinate.currentY = e.clientY;
      this.bind('mouseup', this.onMouseup);
      this.bind('mousemove', this.onMousemove);
    }
  }, {
    key: 'onMouseup',
    value: function onMouseup(e) {
      if (e.target !== this.root || !this.isMoveing) {
        return;
      }
      this.isMoveing = false;
      this.clientWidth = window.innerWidth;
      var target = this.config.target || this.player.root;
      this.pos.top = parseInt(Util.getCss(target, 'top'));
      this.pos.left = parseInt(Util.getCss(target, 'left'));
      this.unbind('mousemove', this.onMousemove);
      this.unbind('mouseup', this.onMouseup);
    }
  }, {
    key: 'onMousemove',
    value: function onMousemove(e, callback) {
      e = e || window.event;
      var target = this.config.target || this.player.root;
      var maxTop = window.innerHeight - parseInt(Util.getCss(target, 'height'));
      var maxLeft = window.innerWidth - parseInt(Util.getCss(target, 'width'));
      if (this.isMoveing) {
        var nowX = e.clientX;
        var nowY = e.clientY;
        var disX = nowX - this.coordinate.currentX;
        var disY = nowY - this.coordinate.currentY;
        var top = parseInt(this.pos.top) + disY;
        var left = parseInt(this.pos.left) + disX;
        if (left < 0) {
          left = 0;
        } else if (left > maxLeft) {
          left = maxLeft;
        }

        if (top < 0) {
          top = 0;
        } else if (top > maxTop) {
          top = maxTop;
        }
        target.style.left = left + 'px';
        target.style.top = top + 'px';
        if (typeof callback === 'function') {
          callback(left, top);
        }

        if (e.preventDefault) {
          e.preventDefault();
        }
        return false;
      }
    }
  }, {
    key: 'getMini',
    value: function getMini() {
      var _this4 = this;

      if (this.isMini) {
        return;
      }
      var player = this.player,
          playerConfig = this.playerConfig;

      var target = this.config.target || this.player.root;
      // this.draggie.enable()
      this.lastStyle = {};
      Util.addClass(player.root, 'xgplayer-mini');
      Object.keys(this.pos).map(function (key) {
        _this4.lastStyle[key] = target.style[key];
        target.style[key] = _this4.pos[key] + 'px';
      });
      if (playerConfig.fluid) {
        target.style['padding-top'] = '';
      }
      this.emit(Events.MINI_STATE_CHANGE, true);
      player.isMini = this.isMini = true;
    }
  }, {
    key: 'exitMini',
    value: function exitMini() {
      var _this5 = this;

      if (!this.isMini) {
        return false;
      }
      var player = this.player,
          playerConfig = this.playerConfig;

      var target = this.config.target || this.player.root;
      Util.removeClass(player.root, 'xgplayer-mini');
      if (this.lastStyle) {
        Object.keys(this.lastStyle).map(function (key) {
          target.style[key] = _this5.lastStyle[key];
        });
      }
      this.lastStyle = null;
      if (playerConfig.fluid) {
        player.root.style['width'] = '100%';
        player.root.style['height'] = '0';
        player.root.style['padding-top'] = playerConfig.height * 100 / playerConfig.width + '%';
      }
      this.emit(Events.MINI_STATE_CHANGE, false);
      this.isMini = player.isMini = false;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.unbind('mousedown', this.onMousedown);
      window.removeEventListener('scroll', this.onScroll);
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.config.disable) {
        return;
      }
      return '\n      <xg-mini-layer class="xg-mini-layer">\n      <div class="mask"></div>\n      <xg-mini-header class="xgplayer-mini-header">\n        <div>\u6309\u4F4F\u753B\u9762\u53EF\u79FB\u52A8\u5C0F\u7A97</div>\n      </xg-mini-header>\n      <div class="mini-cancel-btn">X</div>\n      <div class="play-icon">\n      </div>\n      </xg-mini-layer>';
    }
  }]);

  return MiniScreen;
}(_plugin2.default);

exports.default = MiniScreen;
exports.MiniScreenIcon = _miniScreenIcon2.default;