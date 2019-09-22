"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MediaInfo = require("./models/MediaInfo");

var _MediaInfo2 = _interopRequireDefault(_MediaInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const events = require('events');

class Context {
  constructor(allowedEvents = []) {
    this._emitter = new events.EventEmitter();
    this._instanceMap = {}; // 所有的解码流程实例

    this._clsMap = {}; // 构造函数的map

    this._inited = false;
    this.mediaInfo = new _MediaInfo2.default();
    this.allowedEvents = allowedEvents;
  }
  /**
   * 从上下文中获取解码流程实例，如果没有实例，构造一个
   * @param tag
   * @param args
   * @returns {*}
   */


  getInstance(tag) {
    if (this._instanceMap[tag]) {
      return this._instanceMap[tag];
    } else {
      throw new Error(`${tag}实例尚未初始化`);
    }
  }
  /**
   * 初始化具体实例
   * @param tag
   * @param args
   */


  initInstance(tag, ...args) {
    if (this._clsMap[tag]) {
      const newInstance = new this._clsMap[tag](...args);
      this._instanceMap[tag] = newInstance;

      if (newInstance.init) {
        newInstance.init(); // TODO: lifecircle
      }

      return newInstance;
    } else {
      throw new Error(`${tag}未在context中注册`);
    }
  }
  /**
   * 避免大量的initInstance调用，初始化所有的组件
   * @param config
   */


  init(config) {
    if (this._inited) {
      return;
    }

    for (let tag in this._clsMap) {
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


  registry(tag, cls) {
    const emitter = this._emitter;

    const checkMessageName = this._isMessageNameValid.bind(this);

    const self = this;
    const enhanced = class extends cls {
      constructor(...args) {
        super(...args);
        this.listeners = {};
        this.TAG = tag;
        this._context = self;
      }

      on(messageName, callback) {
        checkMessageName(messageName);

        if (this.listeners[messageName]) {
          this.listeners[messageName].push(callback);
        } else {
          this.listeners[messageName] = [callback];
        }

        return emitter.on(messageName, callback);
      }

      once(messageName, callback) {
        checkMessageName(messageName);
        return emitter.once(messageName, callback);
      }

      emit(messageName, ...args) {
        checkMessageName(messageName);
        console.log(`[${this.TAG}] ${messageName}`, this);
        return emitter.emit(messageName, ...args);
      }

      off(messageName, callback) {
        checkMessageName(messageName);
        return emitter.off(messageName, callback);
      }

      removeListeners() {
        const hasOwn = Object.prototype.hasOwnProperty.bind(this.listeners);

        for (let messageName in this.listeners) {
          if (hasOwn(messageName)) {
            const callbacks = this.listeners[messageName] || [];

            for (let i = 0; i < callbacks.length; i++) {
              const callback = callbacks[i];
              emitter.off(messageName, callback);
            }
          }
        }
      }
      /**
       * 在组件销毁时，默认将它注册的事件全部卸载，确保不会造成内存泄漏
       */


      destroy() {
        // step1 unlisten events
        this.removeListeners(); // step2 release from context

        delete self._instanceMap[tag];
        super.destroy();
      }

    };
    this._clsMap[tag] = enhanced;
    /**
     * get instance immediately
     * e.g const instance = context.registry(tag, Cls)(config)
     * */

    return (...args) => {
      return this.initInstance(tag, ...args);
    };
  }
  /**
   * 对存在的实例进行
   */


  destroyInstances() {
    Object.keys(this._instanceMap).forEach(tag => {
      if (this._instanceMap[tag].destroy) {
        this._instanceMap[tag].destroy();
      }
    });
  }
  /**
   * 编解码流程无需关注事件的解绑
   */


  destroy() {
    this._emitter = null;
    this.allowedEvents = null;
    this._clsMap = null;
    this.destroyInstances();
  }
  /**
   * 对信道进行收拢
   * @param messageName
   * @private
   */


  _isMessageNameValid(messageName) {
    if (!this.allowedEvents.indexOf(messageName) < 0) {
      throw new Error(`unregistered message name: ${messageName}`);
    }
  }

}

exports.default = Context;