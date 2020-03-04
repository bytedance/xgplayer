var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Draggabilly from 'draggabilly';
import Plugin from '../../plugin';
import MiniScreenIcon from './miniScreenIcon';
import './index.scss';

var Util = Plugin.Util,
    Events = Plugin.Events;

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
        width: 320,
        height: 180,
        left: 0,
        top: 200,
        'z-index': 110,
        isShowIcon: true, // 是否显示icon
        isCachePosition: true // 是否缓存位置信息
      };
    }
  }]);

  function MiniScreen(args) {
    _classCallCheck(this, MiniScreen);

    var _this = _possibleConstructorReturn(this, (MiniScreen.__proto__ || Object.getPrototypeOf(MiniScreen)).call(this, args));

    _this.isMini = false;
    _this.position = {
      left: _this.config.left,
      top: _this.config.top,
      height: _this.config.height,
      width: _this.config.width
    };
    _this.coordinate = {};
    _this.lastStyle = null;
    return _this;
  }

  _createClass(MiniScreen, [{
    key: 'changPosition',
    value: function changPosition() {
      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { left: 0, rigth: 0, top: null, bottom: null };

      console.log(position);
    }
  }, {
    key: 'afterCreate',
    value: function afterCreate() {
      var _this2 = this;

      this.getMini = this.getMini.bind(this);
      this.exitMini = this.exitMini.bind(this);
      this.onMousemove = this.onMousemove.bind(this);
      this.onMousedown = this.onMousedown.bind(this);
      this.onMouseup = this.onMouseup.bind(this);
      var player = this.player;

      if (this.config.isShowIcon) {
        var options = {
          onClick: function onClick() {
            _this2.getMini();
          }
        };
        this.miniIcon = player.controls.registerPlugin(MiniScreenIcon.pluginName, MiniScreenIcon, options);
      }
      this.bind('xg-mini-drag', 'click', function () {
        console.log('xg-mini-drag');
        _this2.exitMini();
      });
      // this.bind(['click', 'touchend'], this.getMini)
      // this.bind('mousedown', this.onMousedown)
      // this.bind('mouseup', this.onMouseup)
      // this.draggie = new Draggabilly(this.player.root, {grid: [ 20, 20 ]})
      // this.draggie.isEnabled = false
      this.bind('mouseenter', function () {
        console.log('onMouseEnter');
      });
      this.bind('mouseleave', function () {
        console.log('onMouseLeave');
      });
    }
  }, {
    key: 'onMouseEnter',
    value: function onMouseEnter() {
      console.log('onMouseEnter');
    }
  }, {
    key: 'onMouseLeave',
    value: function onMouseLeave() {
      console.log('onMouseLeave');
    }
  }, {
    key: 'onMousedown',
    value: function onMousedown(e) {
      console.log('onMousedown');
      console.log('x:' + e.clientX + '  y:' + e.clientY);
      this.bind('mousemove', this.onMousemove);
    }
  }, {
    key: 'onMouseup',
    value: function onMouseup(e) {
      console.log('onMouseup');
      this.unbind('mousemove', this.onMousemove);
    }
  }, {
    key: 'onMousemove',
    value: function onMousemove(e) {
      var nx = e.clientX;
      var ny = e.clientY;
      var _coordinate = this.coordinate,
          x = _coordinate.x,
          y = _coordinate.y;
      var _position = this.position,
          right = _position.right,
          left = _position.left;

      if (nx === x && ny === y) {
        return;
      }
      if (right === 0) {} else if (left === 0) {}
      this.coordinate.x = nx;
      this.coordinate.y = ny;
      console.log('coordinate', this.coordinate);
    }
  }, {
    key: 'getMini',
    value: function getMini() {
      var _this3 = this;

      if (this.isMini) {
        return;
      }
      var player = this.player,
          playerConfig = this.playerConfig;

      player.isMini = this.isMini = true;
      // this.draggie.enable()
      this.lastStyle = {};
      Util.addClass(player.root, 'xgplayer-mini');
      this.show();
      console.log('position', this.position);
      Object.keys(this.position).map(function (key) {
        _this3.lastStyle[key] = player.root.style[key];
        player.root.style[key] = _this3.position[key] + 'px';
      });
      if (playerConfig.fluid) {
        player.root.style['padding-top'] = '';
      }
      console.log('this.lastStyle', this.lastStyle);
      this.createDraggie();
      this.emit(Events.MINI_STATE_CHANGE, true);
    }
  }, {
    key: 'exitMini',
    value: function exitMini() {
      var _this4 = this;

      this.hide();
      if (!this.isMini) {
        return false;
      }
      // this.draggie.disable()
      var player = this.player,
          playerConfig = this.playerConfig;

      this.isMini = player.isMini = false;
      Util.removeClass(player.root, 'xgplayer-mini');
      if (this.lastStyle) {
        console.log('this.lastStyle', this.lastStyle);
        // player.root.removeAttribute('style')
        // player.root.setAttribute('style', this.lastStyle)
        Object.keys(this.lastStyle).map(function (key) {
          player.root.style[key] = _this4.lastStyle[key];
        });
      }
      this.lastStyle = null;
      if (playerConfig.fluid) {
        player.root.style['width'] = '100%';
        player.root.style['height'] = '0';
        player.root.style['padding-top'] = playerConfig.height * 100 / playerConfig.width + '%';
      }
      this.draggie.destroy();
      this.draggie = null;
      this.emit(Events.MINI_STATE_CHANGE, false);
    }
  }, {
    key: 'createDraggie',
    value: function createDraggie() {
      this.draggie = new Draggabilly(this.player.root, {
        // grid: [ 5, 5 ]
        // handle: '.xg-mini-layer'
      });
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.unbind(['click', 'touchend'], this.getMini);
    }
  }, {
    key: 'render',
    value: function render() {
      return '\n      <xg-mini-layer class="xg-mini-layer">\n      <xg-mini-drag>\u5173\u95ED</xg-mini-drag>\n      </xg-mini-layer>';
    }
  }]);

  return MiniScreen;
}(Plugin);

export default MiniScreen;