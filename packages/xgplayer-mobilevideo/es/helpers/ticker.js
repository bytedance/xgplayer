var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author fuyuhao@bytedance.com
 */

var Ticker = function () {
  function Ticker(options) {
    _classCallCheck(this, Ticker);

    this.options = Object.assign({}, options || {}, {
      interval: 16
    });

    this.callbacks = [];
  }

  _createClass(Ticker, [{
    key: "start",
    value: function start() {
      for (var _len = arguments.length, callbacks = Array(_len), _key = 0; _key < _len; _key++) {
        callbacks[_key] = arguments[_key];
      }

      this.callbacks = callbacks;
    }
  }, {
    key: "onTick",
    value: function onTick() {
      for (var i = 0, len = this.callbacks.length; i < len; i++) {
        var callback = this.callbacks[i];
        callback();
      }
    }
  }, {
    key: "setInterval",
    value: function setInterval(interval) {
      this.options.interval = interval;
      return this;
    }
  }]);

  return Ticker;
}();

/**
 * ticker use requestAnimationFrame
 */


var RafTicker = function (_Ticker) {
  _inherits(RafTicker, _Ticker);

  function RafTicker(props) {
    _classCallCheck(this, RafTicker);

    var _this = _possibleConstructorReturn(this, (RafTicker.__proto__ || Object.getPrototypeOf(RafTicker)).call(this, props));

    _this.prev = null;
    _this.timerId = null;
    _this._subTimerId = null;

    _this._tickFunc = RafTicker.getTickFunc();
    _this.tick = _this.tick.bind(_this);
    return _this;
  }

  _createClass(RafTicker, [{
    key: "start",
    value: function start() {
      var _get2;

      for (var _len2 = arguments.length, callbacks = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        callbacks[_key2] = arguments[_key2];
      }

      (_get2 = _get(RafTicker.prototype.__proto__ || Object.getPrototypeOf(RafTicker.prototype), "start", this)).call.apply(_get2, [this].concat(callbacks));
      this.tick();
    }
  }, {
    key: "tick",
    value: function tick() {
      this.nextTick();
      this.onTick();
    }
  }, {
    key: "nextTick",
    value: function nextTick() {
      var _tickFunc = this._tickFunc;

      this.timerId = _tickFunc(this.tick);
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.timerId) {
        var cancelFunc = RafTicker.getCancelFunc();

        cancelFunc(this.timerId);
      }
    }
  }, {
    key: "resume",
    value: function resume() {
      this.nextTick();
    }
  }], [{
    key: "getTickFunc",
    value: function getTickFunc() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame;
    }
  }, {
    key: "getCancelFunc",
    value: function getCancelFunc() {
      return window.cancelAnimationFrame || window.webkitCancelAnimationFrame;
    }
  }, {
    key: "isSupported",
    value: function isSupported() {
      return RafTicker.getTickFunc() !== undefined;
    }
  }]);

  return RafTicker;
}(Ticker);

/**
 * use setTimeout for browsers without raf support
 */


var TimeoutTicker = function (_Ticker2) {
  _inherits(TimeoutTicker, _Ticker2);

  function TimeoutTicker(config) {
    _classCallCheck(this, TimeoutTicker);

    var _this2 = _possibleConstructorReturn(this, (TimeoutTicker.__proto__ || Object.getPrototypeOf(TimeoutTicker)).call(this, config));

    _this2.timeoutId = null;
    return _this2;
  }

  _createClass(TimeoutTicker, [{
    key: "start",
    value: function start() {
      var _get3,
          _this3 = this;

      for (var _len3 = arguments.length, callbacks = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        callbacks[_key3] = arguments[_key3];
      }

      (_get3 = _get(TimeoutTicker.prototype.__proto__ || Object.getPrototypeOf(TimeoutTicker.prototype), "nextTick", this)).call.apply(_get3, [this].concat(callbacks));
      this.timeoutId = window.setInterval(function () {
        _this3.onTick();
      }, this.options.interval || 16);
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.timeoutId) {
        window.clearInterval(this.timeoutId);
      }
    }
  }]);

  return TimeoutTicker;
}(Ticker);

/**
 * 返回Ticker构造函数
 * @returns {Ticker}
 */


export var getTicker = function getTicker() {
  if (RafTicker.isSupported()) {
    return RafTicker;
  } else {
    return TimeoutTicker;
  }
};