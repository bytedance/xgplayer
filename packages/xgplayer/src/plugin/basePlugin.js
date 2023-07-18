import Util from '../utils/util'
import Sniffer from '../utils/sniffer'
import Errors from '../error'
import * as Events from '../events'
import XG_DEBUG from '../utils/debug'
import hooksDescriptor, { hook, useHooks, removeHooks, delHooksDescriptor } from './hooksDescriptor'

function showErrorMsg (pluginName, msg) {
  XG_DEBUG.logError(`[${pluginName}] event or callback cant be undefined or null when call ${msg}`)
}

/**
 * @typedef { import ('../player').default } Player
 */

/**
 * @typedef { import ('../defaultConfig').IPlayerOptions } IPlayerOptions
 */

/**
  * @typedef {{
  * index?: number,
  * player: Player,
  * pluginName: string,
  * config: {
  *   [propName: string]: any
  * },
  * [propName: string]: any;
  * }} IBasePluginOptions
 */
class BasePlugin {
  static defineGetterOrSetter (Obj, map) {
    for (const key in map) {
      if (Object.prototype.hasOwnProperty.call(map, key)) {
        Object.defineProperty(Obj, key, map[key])
      }
    }
  }
  static defineMethod (Obj, map) {
    for (const key in map) {
      if (Object.prototype.hasOwnProperty.call(map, key) && typeof map[key] === 'function') {
        Object.defineProperty(Obj, key, {
          configurable: true,
          value: map[key]
        })
      }
    }
  }

  /**
   * @type { { [propName: string]: any } }
   */
  static get defaultConfig () {
    return {}
  }

  /**
   * @type { string }
   */
  static get pluginName () {
    return 'pluginName'
  }

  /**
   * @param { IBasePluginOptions } args
   */
  constructor (args) {
    if (Util.checkIsFunction(this.beforeCreate)) {
      this.beforeCreate(args)
    }
    hooksDescriptor(this)
    /**
     * @private
     */
    this.__args = args
    /**
     * @private
     */
    this.__events = {} // 对player的事件监听缓存
    this.__onceEvents = {}
    this.config = args.config || {}
    /**
     * @readonly
     * @type { Player }
     */
    this.player = null
    /**
       * @readonly
       * @type { IPlayerOptions }
       */
    this.playerConfig = {}
    /**
       * @readonly
       * @type {string}
       */
    this.pluginName = ''
    this.__init(args)
  }

  /**
   * @param { IBasePluginOptions } args
   */
  beforeCreate (args) {}
  afterCreate () {}
  beforePlayerInit () {}
  onPluginsReady () {}
  afterPlayerInit () {}
  destroy () {}

  /**
   * @private
   * @param { any } args
   */
  __init (args) {
    this.player = args.player
    this.playerConfig = args.player && args.player.config
    this.pluginName = args.pluginName ? args.pluginName.toLowerCase() : this.constructor.pluginName.toLowerCase()
    this.logger = args.player && args.player.logger
    // BasePlugin.defineGetterOrSetter(this, {
    //   player: {
    //     get: () => {
    //       return args.player
    //     },
    //     configurable: true
    //   },
    //   playerConfig: {
    //     get: () => {
    //       return args.player && args.player.config
    //     },
    //     configurable: true
    //   },

    //   pluginName: {
    //     get: () => {
    //       if (args.pluginName) {
    //         return args.pluginName.toLowerCase()
    //       } else {
    //         return this.constructor.pluginName.toLowerCase()
    //       }
    //     },
    //     configurable: true
    //   },
    //   logger: {
    //     get: () => {
    //       return args.player.logger
    //     },
    //     configurable: true
    //   }
    // })
  }

  /**
   * 更新语言
   * @param { string } lang
   */
  updateLang (lang) {
    if (!lang) {
      lang = this.lang
    }
  }

  /**
   * @type { string }
   */
  get lang () {
    return this.player.lang
  }

  get i18n () {
    return this.player.i18n
  }

  get i18nKeys () {
    return this.player.i18nKeys
  }

  /**
   * @description当前支持的事件类型
   * @type { 'touch' | 'mouse' }
   */
  get domEventType () {
    let _e = Util.checkTouchSupport() ? 'touch' : 'mouse'
    if (this.playerConfig && (this.playerConfig.domEventType === 'touch' || this.playerConfig.domEventType === 'mouse')) {
      _e = this.playerConfig.domEventType
    }
    return _e
  }

  /**
   *
   * @param { string | Array<string> } event
   * @param { Function } callback
   * @returns
   */
  on (event, callback) {
    if (!event || !callback || !this.player) {
      showErrorMsg(this.pluginName, 'plugin.on(event, callback)')
      return
    }
    if (typeof event === 'string') {
      this.__events[event] = callback
      this.player.on(event, callback)
    } else if (Array.isArray(event)) {
      event.forEach((item) => {
        this.__events[item] = callback
        this.player.on(item, callback)
      })
    }
  }

  /**
   *
   * @param { string } event
   * @param { Function } callback
   * @returns
   */
  once (event, callback) {
    if (!event || !callback || !this.player) {
      showErrorMsg(this.pluginName, 'plugin.once(event, callback)')
      return
    }
    if (typeof event === 'string') {
      this.__onceEvents[event] = callback
      this.player.once(event, callback)
    } else if (Array.isArray(event)) {
      event.forEach((item) => {
        this.__onceEvents[item] = callback
        this.player.once(event, callback)
      })
    }
  }

  /**
   *
   * @param { string } event
   * @param { Function } callback
   * @returns
   */
  off (event, callback) {
    if (!event || !callback || !this.player) {
      showErrorMsg(this.pluginName, 'plugin.off(event, callback)')
      return
    }
    if (typeof event === 'string') {
      delete this.__events[event]
      this.player.off(event, callback)
    } else if (Array.isArray(event)) {
      event.forEach((item) => {
        delete this.__events[event]
        this.player.off(item, callback)
      })
    }
  }

  offAll () {
    ['__events', '__onceEvents'].forEach(key => {
      Object.keys(this[key]).forEach(item => {
        this[key][item] && this.off(item, this[key][item])
        item && delete this[key][item]
      })
    })
    this.__events = {}
    this.__onceEvents = {}
  }

  /**
   *
   * @param { string } event
   * @param  {...any} res
   * @returns
   */
  emit (event, ...res) {
    if (!this.player) {
      return
    }
    this.player.emit(event, ...res)
  }

  emitUserAction (event, action, params = {}) {
    if (!this.player) {
      return
    }
    const nParams = {
      ...params,
      pluginName: this.pluginName
    }
    this.player.emitUserAction(event, action, nParams)
  }

  /**
   * @param { string } hookName
   * @param { Function } handler
   * @param { {pre: Function| null , next: Function | null} } preset
   * @returns
   */
  hook (hookName, handler, preset = { pre: null, next: null }) {
    // eslint-disable-next-line no-return-assign
    return hook.call(this, ...arguments)
  }

  /**
   * @param { string } hookName
   * @param { (plugin: any, ...args) => boolean | Promise<any> } handler
   * @param  {...any} args
   * @returns { boolean } isSuccess
   */
  useHooks (hookName, handler, ...args) {
    return useHooks.call(this, ...arguments)
  }

  /**
   * @param { string } hookName
   * @param { (plugin: any, ...args) => boolean | Promise<any> } handler
   * @param  {...any} args
   * @returns { boolean } isSuccess
   */
  removeHooks (hookName, handler, ...args) {
    return removeHooks.call(this, ...arguments)
  }

  /**
   * 注册子插件
   * @param { any } plugin
   * @param { any } [options]
   * @param { string } [name]
   * @returns { any }
   */
  registerPlugin (plugin, options = {}, name = '') {
    if (!this.player) {
      return
    }
    name && (options.pluginName = name)
    return this.player.registerPlugin({ plugin, options })
  }

  /**
   *
   * @param { string } name
   * @returns { any | null }
   */
  getPlugin (name) {
    return this.player ? this.player.getPlugin(name) : null
  }

  __destroy () {
    const player = this.player
    const pluginName = this.pluginName
    this.offAll()
    Util.clearAllTimers(this)
    if (Util.checkIsFunction(this.destroy)) {
      this.destroy()
    }

    ['player', 'playerConfig', 'pluginName', 'logger', '__args', '__hooks'].map(item => {
      this[item] = null
    })
    player.unRegisterPlugin(pluginName)
    delHooksDescriptor(this)
  }
}
export {
  BasePlugin as default,
  Util,
  Sniffer,
  Errors,
  Events,
  XG_DEBUG
}
