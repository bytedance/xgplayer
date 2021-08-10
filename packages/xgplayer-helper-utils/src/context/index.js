import EVENTS from '../events'
import { MediaInfo } from 'xgplayer-helper-models'
import EventEmitter from 'eventemitter3'
import CoreEventMaps from './core-event-maps'

const DIRECT_EMIT_FLAG = '__TO__'

class Context {
  /**
   *
   * @param {*} player
   * @param {*} configs
   * @param {string[]}allowedEvents
   */
  constructor (player, configs, allowedEvents = []) {
    this._emitter = new EventEmitter()
    if (!this._emitter.off) {
      this._emitter.off = this._emitter.removeListener
    }

    this.mediaInfo = new MediaInfo()
    this._instanceMap = {} // store instance of components registed
    this._clsMap = {} // store constructor of components
    this._inited = false
    this.allowedEvents = allowedEvents
    this._configs = configs
    this._player = player
    this._hooks = {} // store hook before、after event，eg: before('DEMUX_COMPLETE')
  }

  /**
   * singleton of component
   * @param {string} tag
   * @returns {*}
   */
  getInstance (tag) {
    const instance = this._instanceMap[tag]
    if (instance) {
      return instance
    } else {
      return null
    }
  }

  /**
   * @param {string} tag
   * @param {any[]}args
   */
  initInstance (tag, ...args) {
    const [a, b, c, d] = args
    if (this._clsMap[tag]) {
      const newInstance = new this._clsMap[tag](a, b, c, d)
      this._instanceMap[tag] = newInstance
      if (newInstance.init) {
        newInstance.init() // TODO: lifecircle
      }
      return newInstance
    } else {
      throw new Error(`${tag} no registed`)
    }
  }

  /**
   * init all components registed in context
   * @param {*} config
   */
  init (config) {
    if (this._inited) {
      return
    }
    for (const tag in this._clsMap) {
      // if not inited, init an instance
      if (this._clsMap.hasOwnProperty(tag) && !this._instanceMap[tag]) {
        this.initInstance(tag, config)
      }
    }
    this._inited = true
  }

  /**
   * append common capacity for a component
   * @param {string} tag
   * @param {*} cls
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

      /**
       * @param {string} messageName
       * @param {function} callback
       */
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
       * @param {string} messageName
       * @param {function} callback
       */
      before (messageName, callback) {
        checkMessageName(messageName)
        if (self._hooks[messageName]) {
          self._hooks[messageName].push(callback)
        } else {
          self._hooks[messageName] = [callback]
        }
      }

      /**
       * @param {string} messageName
       * @param {function} callback
       */
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

      /**
       * @param {string} messageName
       * @param {any[]} args
       */
      emit (messageName, ...args) {
        checkMessageName(messageName)
        // console.log('emit ', messageName);

        const beforeList = self._hooks ? self._hooks[messageName] : null

        if (beforeList) {
          for (let i = 0, len = beforeList.length; i < len; i++) {
            const callback = beforeList[i]
            // eslint-disable-next-line standard/no-callback-literal
            callback(...args)
          }
        }
        return emitter.emit(messageName, ...args)
      }

      /**
       * 定向发送给某个组件单例的消息
       * @param {string} messageName
       * @param {any[]} args
       */
      emitTo (tag, messageName, ...args) {
        checkMessageName(messageName)
        return emitter.emit(`${messageName}${DIRECT_EMIT_FLAG}${tag}`, ...args)
      }

      /**
       * 定向发送给某个组件单例的消息
       * @param {string} messageName
       * @param {function} callback
       */
      off (messageName, callback) {
        checkMessageName(messageName)
        return emitter.off(messageName, callback)
      }

      removeListeners () {
        const hasOwn = Object.prototype.hasOwnProperty.bind(this.listeners)

        for (const messageName in this.listeners) {
          if (hasOwn(messageName)) {
            const callbacks = this.listeners[messageName] || []
            for (let i = 0; i < callbacks.length; i++) {
              const callback = callbacks[i]
              emitter.off(messageName, callback)
              emitter.off(`${messageName}${DIRECT_EMIT_FLAG}${tag}`, callback)
            }
          }
        }

        for (const messageName in this.onceListeners) {
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

      _mergeParams (eventName, paramsList) {
        const keysList = CoreEventMaps[eventName]
        const len = keysList ? keysList.length : 0
        const param0 = paramsList[0]

        if (!len && !param0) {
          return {
            eventName
          }
        }

        if (!len) {
          return {
            eventName,
            ...param0
          }
        }

        const params = {
          eventName
        }

        for (let i = 0; i < len; i++) {
          params[keysList[i]] = paramsList[i]
        }

        return params
      }

      emitCoreEvent (eventName, ...info) {
        if (!this._player) return

        this._player.emit('core_event', this._mergeParams(eventName, info))
      }

      // 内部模块间的事件直接转换成外部事件
      connectEvent (innerEventName, outEventName) {
        if (!this._player) return

        this.on(innerEventName, (...info) => {
          this._player.emit('core_event', this._mergeParams(outEventName, info))
        })
      }

      connectEventTo (innerEventName, targetName, outEventName) {
        if (!this._player) return
        this.on(`${innerEventName}${DIRECT_EMIT_FLAG}${targetName}`, (...info) => {
          this._player.emit('core_event', this._mergeParams(outEventName, info))
        })
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
        this._context = null
      }

      get _player () {
        if (!this._context) {
          return null
        }
        return this._context._player
      }

      set _player (v) {
        if (this._context) {
          this._context._player = v
        }
      }

      get _pluginConfig () {
        if (!this._context) {
          return null
        }
        return this._context._configs
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
   * @param {number} time
   */
  seek (time) {
    this._emitter.emit(EVENTS.PLAYER_EVENTS.SEEK, time)
  }

  destroyInstances () {
    Object.keys(this._instanceMap).forEach((tag) => {
      if (this._instanceMap[tag].destroy) {
        this._instanceMap[tag].destroy()
      }
    })
  }

  /**
   * destroy all compeont registed in the context
   */
  destroy () {
    this.destroyInstances()
    if (this._emitter) {
      this._emitter.removeAllListeners()
    }
    this._emitter = null
    this.allowedEvents = []
    this._clsMap = null
    this._hooks = null
    this._player = null
    this._configs = null
  }

  /**
   * 对信道进行收拢
   * @param {string} messageName
   * @private
   */
  _isMessageNameValid (messageName) {
    if (!this.allowedEvents.indexOf(messageName) < 0) {
      throw new Error(`unregistered message name: ${messageName}`)
    }
  }
}

export default Context
