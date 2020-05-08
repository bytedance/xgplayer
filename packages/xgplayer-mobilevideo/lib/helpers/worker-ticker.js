'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _ticker = require('./ticker');

var _ticker2 = _interopRequireDefault(_ticker);

var _tickworker = require('worker!./tickworker.js');

var _tickworker2 = _interopRequireDefault(_tickworker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WorkerTicker = function (_Ticker) {
  _inherits(WorkerTicker, _Ticker);

  function WorkerTicker(config) {
    _classCallCheck(this, WorkerTicker);

    var _this = _possibleConstructorReturn(this, (WorkerTicker.__proto__ || Object.getPrototypeOf(WorkerTicker)).call(this, config));

    _this.timeoutId = null;
    _this.worker = new _tickworker2.default();
    _this.handleMessage = _this.handleMessage.bind(_this);
    _this.worker.addEventListener('message', _this.handleMessage);
    return _this;
  }

  _createClass(WorkerTicker, [{
    key: 'handleMessage',
    value: function handleMessage() {
      this.onTick();
    }
  }, {
    key: 'start',
    value: function start() {
      var _get2;

      for (var _len = arguments.length, callbacks = Array(_len), _key = 0; _key < _len; _key++) {
        callbacks[_key] = arguments[_key];
      }

      (_get2 = _get(WorkerTicker.prototype.__proto__ || Object.getPrototypeOf(WorkerTicker.prototype), 'start', this)).call.apply(_get2, [this].concat(callbacks));
      this.onTick();
      this.worker.postMessage({
        msg: 'start',
        interval: this.options.interval
      });
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.worker.postMessage({
        msg: 'stop'
      });
      this.worker.removeEventListener('message', this.handleMessage);
      this.worker = null;
      this.handleMessage = function () {};
      this.callbacks = [];
    }
  }, {
    key: 'setInterval',
    value: function setInterval(interval) {
      _get(WorkerTicker.prototype.__proto__ || Object.getPrototypeOf(WorkerTicker.prototype), 'setInterval', this).call(this, interval);
      this.onTick();
      this.worker.postMessage({
        msg: 'start',
        interval: this.config.interval
      });
    }
  }]);

  return WorkerTicker;
}(_ticker2.default);

exports.default = WorkerTicker;