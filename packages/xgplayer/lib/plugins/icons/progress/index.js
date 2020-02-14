'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plugin = require('../../../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Events = _plugin2.default.Events;
/**
 * 进度条组件
 */

var Progress = function (_Plugin) {
  _inherits(Progress, _Plugin);

  _createClass(Progress, null, [{
    key: 'pluginName',
    get: function get() {
      return 'Progress';
    }
  }, {
    key: 'defaultConfig',
    get: function get() {
      return {
        progressDot: []
      };
    }
  }]);

  function Progress(args) {
    _classCallCheck(this, Progress);

    var _this = _possibleConstructorReturn(this, (Progress.__proto__ || Object.getPrototypeOf(Progress)).call(this, args));

    _this.useable = false;
    return _this;
  }

  _createClass(Progress, [{
    key: 'changeState',
    value: function changeState() {
      var useable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.useable = useable;
    }
  }, {
    key: 'afterCreate',
    value: function afterCreate() {
      var _this2 = this;

      this.playedBar = this.find('.xgplayer-progress-played');
      this.cachedBar = this.find('.xgplayer-progress-cache');
      this.pointTip = this.find('.xgplayer-progress-cache');
      this.progressBtn = this.find('.xgplayer-progress-btn');
      this.on(Events.TIME_UPDATE, function () {
        _this2.onTimeupdate();
      });
      this.on([Events.BUFFER_CHANGE, Events.ENDED], this.onCacheUpdate);
    }
  }, {
    key: 'onTimeupdate',
    value: function onTimeupdate() {}
  }, {
    key: 'onCacheUpdate',
    value: function onCacheUpdate() {}
  }, {
    key: 'render',
    value: function render() {
      return '\n      <xg-progress class="xgplayer-progress">\n        <xg-outer class="xgplayer-progress-outer">\n          <xg-cache class="xgplayer-progress-cache" style="width:0">\n          </xg-cache>\n          <xg-played class="xgplayer-progress-played" style="width:0">\n            <xg-progress-btn class="xgplayer-progress-btn"></xg-progress-btn>\n            <xg-point class="xgplayer-progress-point xgplayer-tips">01:22</xg-point>\n            <xg-thumbnail class="xgplayer-progress-thumbnail xgplayer-tips"></xg-thumbnail>\n          </xg-played>\n        </xg-outer>\n      </xg-progress>\n    ';
    }
  }]);

  return Progress;
}(_plugin2.default);

exports.default = Progress;