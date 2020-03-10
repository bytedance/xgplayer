'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plugin = require('../../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Util = _plugin2.default.Util,
    Events = _plugin2.default.Events,
    POSITIONS = _plugin2.default.POSITIONS;

var Time = function (_Plugin) {
  _inherits(Time, _Plugin);

  function Time() {
    _classCallCheck(this, Time);

    return _possibleConstructorReturn(this, (Time.__proto__ || Object.getPrototypeOf(Time)).apply(this, arguments));
  }

  _createClass(Time, [{
    key: 'afterCreate',
    value: function afterCreate() {
      var _this2 = this;

      if (this.config.disable) {
        return;
      }
      this.durationDom = this.find('.time-duration');
      this.timeDom = this.find('.time-current');
      this.on(Events.DURATION_CHANGE, function () {
        _this2.onTimeUpdate();
      });
      this.on(Events.TIME_UPDATE, function () {
        _this2.onTimeUpdate();
      });
    }
  }, {
    key: 'onTimeUpdate',
    value: function onTimeUpdate() {
      var player = this.player,
          config = this.config;

      if (config.disable) {
        return;
      }
      var current = player.currentTime;
      this.timeDom.innerHTML = Util.format(current);
      if (player.duration !== Infinity) {
        this.durationDom.innerHTML = Util.format(player.duration);
      }
    }
  }, {
    key: 'afterPlayerInit',
    value: function afterPlayerInit() {
      var player = this.player,
          config = this.config;

      if (player.duration === Infinity || this.playerConfig.isLive) {
        Util.hide(this.durationDom);
        Util.hide(this.timeDom);
        Util.hide(this.find('.time-separator'));
        Util.show(this.find('.time-live-tag'));
      } else {
        Util.hide(this.find('.time-live-tag'));
      }
      if (config.hide) {
        this.hide();
        return;
      }
      this.show();
    }
  }, {
    key: 'changeLiveState',
    value: function changeLiveState(isLive) {
      if (isLive) {
        Util.hide(this.durationDom);
        Util.hide(this.timeDom);
        Util.hide(this.find('.time-separator'));
        Util.show(this.find('.time-live-tag'));
      } else {
        Util.hide(this.find('.time-live-tag'));
        Util.show(this.find('.time-separator'));
        Util.show(this.durationDom);
        Util.show(this.timeDom);
      }
    }
  }, {
    key: 'updateTime',
    value: function updateTime(time) {
      var player = this.player;

      if (!time && time !== 0 || time > player.duration) {
        return;
      }
      this.timeDom.innerHTML = Util.format(time);
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.config.disable) {
        return;
      }
      return '<xg-icon class="xgplayer-time" style="display:none">\n    <span class="time-current">00:00</span>\n    <span class="time-separator">/</span>\n    <span class="time-duration">00:00</span>\n    <span class="time-live-tag">\u76F4\u64AD</span>\n    </xg-icon>';
    }
  }], [{
    key: 'pluginName',
    get: function get() {
      return 'time';
    }
  }, {
    key: 'defaultConfig',
    get: function get() {
      return {
        position: POSITIONS.CONTROLS_LEFT,
        index: 2,
        disable: false
      };
    }
  }]);

  return Time;
}(_plugin2.default);

exports.default = Time;