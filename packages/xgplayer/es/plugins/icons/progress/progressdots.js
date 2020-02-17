var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Plugin from '../../../plugin';
var defaultDot = {
  time: 10, // 出现的时间点
  text: '', // hover显示的文案
  duration: 1, // 显示时长
  style: {}, // 指定样式
  color: '#fff' // 颜色
};

var Util = Plugin.Util,
    Events = Plugin.Events;

var ProgressDot = function (_Plugin) {
  _inherits(ProgressDot, _Plugin);

  _createClass(ProgressDot, null, [{
    key: 'pluginName',
    get: function get() {
      return 'ProgressDots';
    }
  }, {
    key: 'defaultConfig',
    get: function get() {
      return {
        dots: []
      };
    }
  }]);

  function ProgressDot(args) {
    _classCallCheck(this, ProgressDot);

    var _this = _possibleConstructorReturn(this, (ProgressDot.__proto__ || Object.getPrototypeOf(ProgressDot)).call(this, args));

    _this.dotsList = {};
    return _this;
  }

  _createClass(ProgressDot, [{
    key: 'afterCreate',
    value: function afterCreate() {
      var _this2 = this;

      this.once(Events.CANPLAY, function () {
        var dots = _this2.config.dots;

        if (!dots || !Array.isArray(dots)) {
          return;
        }
        dots.map(function (dot) {
          _this2.createDotDom(dot);
        });
        _this2.initEvents();
      });
    }
  }, {
    key: 'initEvents',
    value: function initEvents() {
      // this.bind('.xgplayer-progress-dot', 'mouseenter', (e) => {
      //   console.log('mouseenter', e.target)
      // })
      // this.bind('.xgplayer-progress-dot', 'mouseleave', (e) => {
      //   console.log('mouseleave', e.target)
      // })
    }
  }, {
    key: 'addDot',
    value: function addDot(time, text, duration) {
      var newDots = null;
      if (arguments.length === 1 && (typeof time === 'undefined' ? 'undefined' : _typeof(time)) === 'object') {
        newDots = arguments[0];
      } else {
        newDots = {
          time: time,
          text: text,
          duration: duration
        };
      }
      newDots = Util.deepCopy(arguments[0], defaultDot);
      this.createDotDom(newDots);
    }
  }, {
    key: 'removeDot',
    value: function removeDot(time) {
      var player = this.player;

      if (time >= 0 && time <= player.duration && this.dotsList[time]) {
        var dot = this.dotsList[time];
        dot.parentNode.removeChild(dot);
        dot = null;
        this.dotsList[time] = null;
      }
    }
  }, {
    key: 'removeAllProgressDots',
    value: function removeAllProgressDots() {
      var _this3 = this;

      Object.keys(this.dotsList).forEach(function (key) {
        if (_this3.dotsList[key]) {
          var dot = _this3.dotsList[key];
          dot.parentNode.removeChild(dot);
          dot = null;
          _this3.dotsList[key] = null;
        }
      });
    }
  }, {
    key: 'createDotDom',
    value: function createDotDom(dot) {
      var player = this.player;

      var dom = Util.createDom('xg-progress-dot', '' + (dot.text ? '<span class="xgplayer-progress-tip">' + dot.text + '</span>' : ''), {}, 'xgplayer-progress-dot');
      var style = dot.style || {};
      style.left = dot.time / player.duration * 100 + '%';
      style.width = Math.min(dot.duration, player.duration - dot.time) / player.duration * 100 + '%';
      Object.keys(style).map(function (item) {
        dom.style[item] = style[item];
      });
      this.dotsList[dot.time] = dom;
      this.el.appendChild(dom);
    }
  }, {
    key: 'render',
    value: function render() {
      return '<xg-dots></xg-dots>';
    }
  }, {
    key: 'destroy',
    value: function destroy() {}
  }]);

  return ProgressDot;
}(Plugin);

export default ProgressDot;