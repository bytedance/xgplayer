'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('../utils/util');

var _util2 = _interopRequireDefault(_util);

var _sniffer = require('../utils/sniffer');

var _sniffer2 = _interopRequireDefault(_sniffer);

var _error = require('../error');

var _error2 = _interopRequireDefault(_error);

var _events = require('../events');

var event = _interopRequireWildcard(_events);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BasePlugin = function () {
  _createClass(BasePlugin, null, [{
    key: 'defineGetterOrSetter',
    value: function defineGetterOrSetter(Obj, map) {
      for (var key in map) {
        Object.defineProperty(Obj, key, map[key]);
      }
    }
  }]);

  function BasePlugin(args) {
    _classCallCheck(this, BasePlugin);

    this.__args = args;
    this.__events = {}; // 对player的事件监听缓存
    this.config = args.config || {};
    if (_util2.default.checkIsFunction(this.beforeCreate)) {
      this.beforeCreate();
    }
    this.__init(args);
    if (_util2.default.checkIsFunction(this.afterCreate)) {
      this.afterCreate();
    }
  }

  _createClass(BasePlugin, [{
    key: '__init',
    value: function __init(args) {
      var _this = this;

      BasePlugin.defineGetterOrSetter(this, {
        'player': {
          get: function get() {
            return args.player;
          }
        },
        'playerConfig': {
          get: function get() {
            return args.player && args.player.config;
          }
        },
        'pluginName': {
          get: function get() {
            if (args.pluginName) {
              return args.pluginName;
            } else {
              return _this.constructor.pluginName;
            }
          }
        },
        'root': {
          get: function get() {
            return args.player.root;
          }
        },
        'logger': {
          get: function get() {
            return args.player.logger;
          }
        }
      });
    }
  }, {
    key: 'on',
    value: function on(event, callback) {
      var _this2 = this;

      if (typeof event === 'string') {
        this.__events[event] = callback;
        this.player.on(event, callback);
      } else if (Array.isArray(event)) {
        event.forEach(function (item) {
          _this2.__events[item] = callback;
          _this2.player.on(item, callback);
        });
      }
    }
  }, {
    key: 'once',
    value: function once(event, callback) {
      this.player.once(event, callback);
    }
  }, {
    key: 'off',
    value: function off(event, callback) {
      var _this3 = this;

      if (typeof event === 'string') {
        this.__events[event] = undefined;
        this.player.off(event, callback);
      } else if (Array.isArray(event)) {
        event.forEach(function (item) {
          _this3.__events[item] = undefined;
          _this3.player.off(item, callback);
        });
      }
    }
  }, {
    key: 'offAll',
    value: function offAll() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(this.__events)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          this.off(item, this.__events[item]);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'emit',
    value: function emit(event, res) {
      this.player.emit(event, res);
    }
  }, {
    key: '_destroy',
    value: function _destroy() {
      this.offAll();
      if (_util2.default.checkIsFunction(this.destroy)) {
        this.destroy();
      }
    }
  }]);

  return BasePlugin;
}();

BasePlugin.Util = _util2.default;
BasePlugin.Sniffer = _sniffer2.default;
BasePlugin.Errors = _error2.default;
BasePlugin.Events = event;
exports.default = BasePlugin;