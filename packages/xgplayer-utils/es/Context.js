import MediaInfo from './models/media-info';
import { EventEmitter } from 'events';

var DIRECT_EMIT_FLAG = '__TO__';

var Context = function () {
  function Context() {
    var allowedEvents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    babelHelpers.classCallCheck(this, Context);

    this._emitter = new EventEmitter();
    if (!this._emitter.off) {
      this._emitter.off = this._emitter.removeListener;
    }
    this._instanceMap = {}; // 所有的解码流程实例
    this._clsMap = {}; // 构造函数的map
    this._inited = false;
    this.mediaInfo = new MediaInfo();
    this.allowedEvents = allowedEvents;
    this._hooks = {}; // 注册在事件前/后的钩子，例如 before('DEMUX_COMPLETE')
    this._emitCounter = {};
  }

  /**
   * 从上下文中获取解码流程实例，如果没有实例，构造一个
   * @param tag
   * @param args
   * @returns {*}
   */


  babelHelpers.createClass(Context, [{
    key: 'getInstance',
    value: function getInstance(tag) {
      var instance = this._instanceMap[tag];
      if (instance) {
        return instance;
      } else {
        // throw new Error(`${tag}实例尚未初始化`)
        return null;
      }
    }

    /**
     * 初始化具体实例
     * @param tag
     * @param args
     */

  }, {
    key: 'initInstance',
    value: function initInstance(tag) {
      if (this._clsMap[tag]) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var newInstance = new (Function.prototype.bind.apply(this._clsMap[tag], [null].concat(args)))();
        this._instanceMap[tag] = newInstance;
        if (newInstance.init) {
          newInstance.init(); // TODO: lifecircle
        }
        return newInstance;
      } else {
        throw new Error(tag + '\u672A\u5728context\u4E2D\u6CE8\u518C');
      }
    }

    /**
     * 避免大量的initInstance调用，初始化所有的组件
     * @param config
     */

  }, {
    key: 'init',
    value: function init(config) {
      if (this._inited) {
        return;
      }
      for (var tag in this._clsMap) {
        // if not inited, init an instance
        if (this._clsMap.hasOwnProperty(tag) && !this._instanceMap[tag]) {
          this.initInstance(tag, config);
        }
      }
      this._inited = true;
    }

    /**
     * 注册一个上下文流程，提供安全的事件发送机制
     * @param tag
     * @param cls
     */

  }, {
    key: 'registry',
    value: function registry(tag, cls) {
      var _this2 = this;

      var emitter = this._emitter;
      var checkMessageName = this._isMessageNameValid.bind(this);
      var self = this;
      var enhanced = function (_cls) {
        babelHelpers.inherits(enhanced, _cls);

        function enhanced(a, b, c) {
          babelHelpers.classCallCheck(this, enhanced);

          var _this = babelHelpers.possibleConstructorReturn(this, (enhanced.__proto__ || Object.getPrototypeOf(enhanced)).call(this, a, b, c));

          _this.listeners = {};
          _this.onceListeners = {};
          _this.TAG = tag;
          _this._context = self;
          return _this;
        }

        babelHelpers.createClass(enhanced, [{
          key: 'on',
          value: function on(messageName, callback) {
            checkMessageName(messageName);

            if (this.listeners[messageName]) {
              this.listeners[messageName].push(callback);
            } else {
              this.listeners[messageName] = [callback];
            }

            emitter.on('' + messageName + DIRECT_EMIT_FLAG + tag, callback); // 建立定向通信监听
            return emitter.on(messageName, callback);
          }

          /**
           * 在某个事件触发前执行
           * @param messageName
           * @param callback
           */

        }, {
          key: 'before',
          value: function before(messageName, callback) {
            checkMessageName(messageName);
            if (self._hooks[messageName]) {
              self._hooks[messageName].push(callback);
            } else {
              self._hooks[messageName] = [callback];
            }
          }
        }, {
          key: 'once',
          value: function once(messageName, callback) {
            checkMessageName(messageName);

            if (this.onceListeners[messageName]) {
              this.onceListeners[messageName].push(callback);
            } else {
              this.onceListeners[messageName] = [callback];
            }

            emitter.once('' + messageName + DIRECT_EMIT_FLAG + tag, callback);
            return emitter.once(messageName, callback);
          }
        }, {
          key: 'emit',
          value: function emit(messageName) {
            checkMessageName(messageName);
            if (self._emitCounter[messageName]) {
              self._emitCounter[messageName] += 1;
              if (self._emitCounter[messageName] % 1000 === 0) {
                var a = 'con';
                var b = 'sole';
                if (window.console) {
                  window[a + b].warn('invoke: ', messageName);
                  window.localStorage.setItem('xgplayer_invoke_' + messageName, self._emitCounter[messageName]);
                }
              }
            } else {
              self._emitCounter[messageName] = 1;
            }

            var beforeList = self._hooks ? self._hooks[messageName] : null;

            if (beforeList) {
              for (var i = 0, len = beforeList.length; i < len; i++) {
                var callback = beforeList[i];
                callback();
              }
            }

            for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }

            return emitter.emit.apply(emitter, [messageName].concat(args));
          }

          /**
           * 定向发送给某个组件单例的消息
           * @param messageName
           * @param args
           */

        }, {
          key: 'emitTo',
          value: function emitTo(tag, messageName) {
            checkMessageName(messageName);

            for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
              args[_key3 - 2] = arguments[_key3];
            }

            return emitter.emit.apply(emitter, ['' + messageName + DIRECT_EMIT_FLAG + tag].concat(args));
          }
        }, {
          key: 'off',
          value: function off(messageName, callback) {
            checkMessageName(messageName);
            return emitter.off(messageName, callback);
          }
        }, {
          key: 'removeListeners',
          value: function removeListeners() {
            var hasOwn = Object.prototype.hasOwnProperty.bind(this.listeners);

            for (var messageName in this.listeners) {
              if (hasOwn(messageName)) {
                var callbacks = this.listeners[messageName] || [];
                for (var i = 0; i < callbacks.length; i++) {
                  var callback = callbacks[i];
                  emitter.off(messageName, callback);
                  emitter.off('' + messageName + DIRECT_EMIT_FLAG + tag, callback);
                }
              }
            }

            for (var _messageName in this.onceListeners) {
              if (hasOwn(_messageName)) {
                var _callbacks = this.onceListeners[_messageName] || [];
                for (var _i = 0; _i < _callbacks.length; _i++) {
                  var _callback = _callbacks[_i];
                  emitter.off(_messageName, _callback);
                  emitter.off('' + _messageName + DIRECT_EMIT_FLAG + tag, _callback);
                }
              }
            }
          }

          /**
           * 在组件销毁时，默认将它注册的事件全部卸载，确保不会造成内存泄漏
           */

        }, {
          key: 'destroy',
          value: function destroy() {
            // step1 unlisten events
            this.removeListeners();
            this.listeners = {};

            // step2 release from context
            delete self._instanceMap[tag];
            if (babelHelpers.get(enhanced.prototype.__proto__ || Object.getPrototypeOf(enhanced.prototype), 'destroy', this)) {
              return babelHelpers.get(enhanced.prototype.__proto__ || Object.getPrototypeOf(enhanced.prototype), 'destroy', this).call(this);
            }
          }
        }]);
        return enhanced;
      }(cls);
      this._clsMap[tag] = enhanced;

      /**
       * get instance immediately
       * e.g const instance = context.registry(tag, Cls)(config)
       * */
      return function () {
        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        return _this2.initInstance.apply(_this2, [tag].concat(args));
      };
    }

    /**
     * 对存在的实例进行
     */

  }, {
    key: 'destroyInstances',
    value: function destroyInstances() {
      var _this3 = this;

      Object.keys(this._instanceMap).forEach(function (tag) {
        if (_this3._instanceMap[tag].destroy) {
          _this3._instanceMap[tag].destroy();
        }
      });
    }

    /**
     * 编解码流程无需关注事件的解绑
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this._emitter = null;
      this.allowedEvents = [];
      this._clsMap = null;
      this._context = null;
      this._hooks = null;
      this._emitCounter = {};
      this.destroyInstances();
    }

    /**
     * 对信道进行收拢
     * @param messageName
     * @private
     */

  }, {
    key: '_isMessageNameValid',
    value: function _isMessageNameValid(messageName) {
      if (!this.allowedEvents.indexOf(messageName) < 0) {
        throw new Error('unregistered message name: ' + messageName);
      }
    }
  }]);
  return Context;
}();

export default Context;