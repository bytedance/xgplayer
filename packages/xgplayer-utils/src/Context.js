import MediaInfo from './models/media-info'
import EVENTS from 'xgplayer-transmuxer-constant-events'
import { EventEmitter } from 'events'

const DIRECT_EMIT_FLAG = '__TO__'

class Context {
  constructor (allowedEvents = []) {
    this._emitter = new EventEmitter()
    if (!this._emitter.off) {
      this._emitter.off = this._emitter.removeListener;
    }
    this._instanceMap = {} // 所有的解码流程实例
    this._clsMap = {} // 构造函数的map
    this._inited = false
    this.mediaInfo = new MediaInfo()
    this.allowedEvents = allowedEvents
    this._hooks = {} // 注册在事件前/后的钩子，例如 before('DEMUX_COMPLETE')
  }

  /**
   * 从上下文中获取解码流程实例，如果没有实例，构造一个
   * @param tag
   * @param args
   * @returns {*}
   */
  getInstance (tag) {
    const instance = this._instanceMap[tag]
    if (instance) {
      return instance
    } else {
      // throw new Error(`${tag}实例尚未初始化`)
      return null
    }
  }

  /**
   * 初始化具体实例
   * @param tag
   * @param args
   */
  initInstance (tag, ...args) {
    const [a, b, c, d] = args;
    if (this._clsMap[tag]) {
      const newInstance = new this._clsMap[tag](a, b, c, d)
      this._instanceMap[tag] = newInstance
      if (newInstance.init) {
        newInstance.init() // TODO: lifecircle
      }
      return newInstance
    } else {
      throw new Error(`${tag}未在context中注册`)
    }
  }

  /**
   * 避免大量的initInstance调用，初始化所有的组件
   * @param config
   */
  init (config) {
    if (this._inited) {
      return
    }
    for (let tag in this._clsMap) {
      // if not inited, init an instance
      if (this._clsMap.hasOwnProperty(tag) && !this._instanceMap[tag]) {
        this.initInstance(tag, config)
      }
    }
    this._inited = true
  }

  /**
   * 注册一个上下文流程，提供安全的事件发送机制
   * @param tag
   * @param cls
   */
  registry (tag, cls) {
    const emitter = this._emitter
    const checkMessageName = this._isMessageNameValid.bind(this)
    const self = this
    const enhanced = class extends cls {
      constructor (a, b, c) {
        super(a, b, c)
        this.listeners = {}
        this.onceListeners = {}
        this.TAG = tag
        this._context = self
      }

      on (messageName, callback) {
        checkMessageName(messageName)

        if (this.listeners[messageName]) {
          this.listeners[messageName].push(callback)
        } else {
          this.listeners[messageName] = [callback]
        }

        emitter.on(`${messageName}${DIRECT_EMIT_FLAG}${tag}`, callback) // 建立定向通信监听
        return emitter.on(messageName, callback)
      }

      /**
       * 在某个事件触发前执行
       * @param messageName
       * @param callback
       */
      before (messageName, callback) {
        checkMessageName(messageName)
        if (self._hooks[messageName]) {
          self._hooks[messageName].push(callback)
        } else {
          self._hooks[messageName] = [callback]
        }
      }

      once (messageName, callback) {
        checkMessageName(messageName)

        if (this.onceListeners[messageName]) {
          this.onceListeners[messageName].push(callback)
        } else {
          this.onceListeners[messageName] = [callback]
        }

        emitter.once(`${messageName}${DIRECT_EMIT_FLAG}${tag}`, callback)
        return emitter.once(messageName, callback)
      }

      emit (messageName, ...args) {
        checkMessageName(messageName)
        // console.log('emit ', messageName);

        const beforeList = self._hooks ? self._hooks[messageName] : null

        if (beforeList) {
          for (let i = 0, len = beforeList.length; i < len; i++) {
            const callback = beforeList[i]
            callback()
          }
        }
        return emitter.emit(messageName, ...args)
      }

      /**
       * 定向发送给某个组件单例的消息
       * @param messageName
       * @param args
       */
      emitTo (tag, messageName, ...args) {
        checkMessageName(messageName)

        return emitter.emit(`${messageName}${DIRECT_EMIT_FLAG}${tag}`, ...args)
      }

      off (messageName, callback) {
        checkMessageName(messageName)
        return emitter.off(messageName, callback)
      }

      removeListeners () {
        const hasOwn = Object.prototype.hasOwnProperty.bind(this.listeners)

        for (let messageName in this.listeners) {
          if (hasOwn(messageName)) {
            const callbacks = this.listeners[messageName] || []
            for (let i = 0; i < callbacks.length; i++) {
              const callback = callbacks[i]
              emitter.off(messageName, callback)
              emitter.off(`${messageName}${DIRECT_EMIT_FLAG}${tag}`, callback)
            }
          }
        }

        for (let messageName in this.onceListeners) {
          if (hasOwn(messageName)) {
            const callbacks = this.onceListeners[messageName] || []
            for (let i = 0; i < callbacks.length; i++) {
              const callback = callbacks[i]
              emitter.off(messageName, callback)
              emitter.off(`${messageName}${DIRECT_EMIT_FLAG}${tag}`, callback)
            }
          }
        }
      }

      /**
       * 在组件销毁时，默认将它注册的事件全部卸载，确保不会造成内存泄漏
       */
      destroy () {
        // step1 unlisten events
        this.removeListeners()
        this.listeners = {}

        // step2 release from context
        delete self._instanceMap[tag]
        if (super.destroy) {
          return super.destroy()
        }
      }
    }
    this._clsMap[tag] = enhanced

    /**
     * get instance immediately
     * e.g const instance = context.registry(tag, Cls)(config)
     * */
    return (...args) => {
      return this.initInstance(tag, ...args)
    }
  }

  /**
   * 各个模块处理seek
   * @param time
   */
  seek (time) {
    this._emitter.emit(EVENTS.PLAYER_EVENTS.SEEK, time)
  }

  /**
   * 对存在的实例进行
   */
  destroyInstances () {
    Object.keys(this._instanceMap).forEach((tag) => {
      if (this._instanceMap[tag].destroy) {
        this._instanceMap[tag].destroy()
      }
    })
  }

  /**
   * 编解码流程无需关注事件的解绑
   */
  destroy () {
    this._emitter = null
    this.allowedEvents = []
    this._clsMap = null
    this._context = null
    this._hooks = null
    this.destroyInstances()
  }

  /**
   * 对信道进行收拢
   * @param messageName
   * @private
   */
  _isMessageNameValid (messageName) {
    if (!this.allowedEvents.indexOf(messageName) < 0) {
      throw new Error(`unregistered message name: ${messageName}`)
    }
  }
}

export default Context
