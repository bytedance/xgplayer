'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _plugin = require('../../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Events = _plugin2.default.Events,
    Util = _plugin2.default.Util,
    POSITIONS = _plugin2.default.POSITIONS;

var Controls = function (_Plugin) {
  _inherits(Controls, _Plugin);

  function Controls() {
    _classCallCheck(this, Controls);

    return _possibleConstructorReturn(this, (Controls.__proto__ || Object.getPrototypeOf(Controls)).apply(this, arguments));
  }

  _createClass(Controls, [{
    key: 'beforeCreate',
    value: function beforeCreate(args) {
      if (typeof args.player.config.controls === 'boolean') {
        args.config.disable = !args.player.config.controls;
      }
    }
  }, {
    key: 'afterCreate',
    value: function afterCreate() {
      var _this2 = this;

      var height = this.config.height;

      var style = {
        height: height + 'px'
      };
      Object.keys(style).map(function (key) {
        _this2.root.style[key] = style[key];
      });
      this.left = this.find('left-grid');
      this.center = this.find('center');
      this.right = this.find('right-grid');
      this.on(Events.MINI_STATE_CHANGE, function (isMini) {
        isMini ? Util.addClass(_this2.root, 'mini') : Util.removeClass(_this2.root, 'mini');
      });
      this.bind('mouseenter', function (e) {
        _this2.mouseEnter(e);
      });
      this.bind('mouseou', function (e) {
        _this2.mouseOut(e);
      });
    }
  }, {
    key: 'mouseEnter',
    value: function mouseEnter() {
      console.log('mouseenter');
    }
  }, {
    key: 'mouseOut',
    value: function mouseOut() {
      console.log('mouseout');
    }
  }, {
    key: 'showTips',
    value: function showTips() {}
  }, {
    key: 'registerPlugin',
    value: function registerPlugin(plugin) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var name = arguments[2];

      if (!this.root) {
        return;
      }
      if (!options.root) {
        var position = options.config && options.config.position ? options.config.position : plugin.defaultConfig.position;
        switch (position) {
          case POSITIONS.CONTROLS_LEFT:
            options.root = this.left;
            break;
          case POSITIONS.CONTROLS_RIGTH:
            options.root = this.right;
            break;
          case POSITIONS.CONTROLS_CENTER:
            options.root = this.center;
            break;
          default:
            options.root = this.left;
        }
        return _get(Controls.prototype.__proto__ || Object.getPrototypeOf(Controls.prototype), 'registerPlugin', this).call(this, plugin, options, name);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.config.disable) {
        return;
      }
      return '<xg-controls class="xgplayer-controls" unselectable="on" onselectstart="return false">\n    <left-grid class="left-grid">\n    </Left-grid>\n    <center class="center"></center>\n    <right-grid class="right-grid">\n    </right-grid>\n    </xg-controls>';
    }
  }], [{
    key: 'pluginName',
    get: function get() {
      return 'Controls';
    }
  }, {
    key: 'defaultConfig',
    get: function get() {
      return {
        disable: false
      };
    }
  }]);

  return Controls;
}(_plugin2.default);

exports.default = Controls;