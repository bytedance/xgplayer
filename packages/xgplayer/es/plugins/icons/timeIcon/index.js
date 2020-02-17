var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Plugin from '../../../plugin';

var Util = Plugin.Util,
    Events = Plugin.Events;

var TimeIcon = function (_Plugin) {
  _inherits(TimeIcon, _Plugin);

  function TimeIcon() {
    _classCallCheck(this, TimeIcon);

    return _possibleConstructorReturn(this, (TimeIcon.__proto__ || Object.getPrototypeOf(TimeIcon)).apply(this, arguments));
  }

  _createClass(TimeIcon, [{
    key: 'onTimeUpdate',
    value: function onTimeUpdate() {
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

      this.durationDom = this.find('.time-duration');
      this.timeDom = this.find('.time-current');
      this.once(Events.READY, function () {
        if (player.duration === Infinity || _this2.playerConfig.isLive) {
          Util.hide(_this2.durationDom);
          Util.hide(_this2.timeDom);
          Util.hide(_this2.find('.time-separator'));
          Util.show(_this2.find('.time-live-tag'));
        } else {
          Util.hide(_this2.find('.time-live-tag'));
        }
        _this2.show();
      });
      this.on(Events.DURATION_CHANGE, function () {
        _this2.onTimeUpdate();
      });
      this.on(Events.TIME_UPDATE, function () {
        _this2.onTimeUpdate();
      });
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
      return '<xg-icon class="xgplayer-time" style="display:none">\n    <span class="time-current">00:00</span>\n    <span class="time-separator">/</span>\n    <span class="time-duration">00:00</span>\n    <span class="time-live-tag">\u76F4\u64AD</span>\n    </xg-icon>';
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