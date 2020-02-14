var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Plugin from '../../../plugin';
import './index.scss';
var Util = Plugin.Util,
    Events = Plugin.Events;

var TimeIcon = function (_Plugin) {
  _inherits(TimeIcon, _Plugin);

  function TimeIcon() {
    _classCallCheck(this, TimeIcon);

    return _possibleConstructorReturn(this, (TimeIcon.__proto__ || Object.getPrototypeOf(TimeIcon)).apply(this, arguments));
  }

  _createClass(TimeIcon, [{
    key: 'updateTime',
    value: function updateTime() {
      var player = this.player;

      var current = player.currentTime;
      this.timeDom.innerHTML = Util.format(current);
      if (player.duration !== Infinity) {
        this.durationDom.innerHTML = Util.format(player.duration);
      }
    }
  }, {
    key: 'afterCreate',
    value: function afterCreate() {
      var _this2 = this;

      var player = this.player;

      this.durationDom = this.find('.duration');
      this.timeDom = this.find('.current');
      this.once(Events.READY, function () {
        player.duration !== Infinity && _this2.show();
      });
      this.on(Events.DURATION_CHANGE, function () {
        _this2.updateTime();
      });
      this.on(Events.TIME_UPDATE, function () {
        _this2.updateTime();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return '<xg-icon class="xgplayer-time" style="display:none">\n    <span class="current">00:00</span>\n    <em class="duration">00:00</em>\n    </xg-icon>';
    }
  }], [{
    key: 'pluginName',
    get: function get() {
      return 'TimeIcon';
    }
  }]);

  return TimeIcon;
}(Plugin);

export default TimeIcon;