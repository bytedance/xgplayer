var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import Util from '../utils/util';
import Sniffer from '../utils/sniffer';
import Errors from '../error';
import * as event from '../events';

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

    if (Util.checkIsFunction(this.beforeCreate)) {
      this.beforeCreate(args);
    }
    this.__args = args;
    this.__events = {}; // 对player的事件监听缓存
    this.config = args.config || {};
    this.__init(args);
  }

  _createClass(BasePlugin, [{
    key: 'onPluginsReady',
    value: function onPluginsReady() {}
  }, {
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
      if (Util.checkIsFunction(this.destroy)) {
        this.destroy();
      }
    }
  }]);

  return BasePlugin;
}();

BasePlugin.Util = Util;
BasePlugin.Sniffer = Sniffer;
BasePlugin.Errors = Errors;
BasePlugin.Events = event;
export default BasePlugin;