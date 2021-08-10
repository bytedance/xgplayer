import Util from '../utils/util'
import Sniffer from '../utils/sniffer'
import Errors from '../error'
import * as Events from '../events'
import XG_DEBUG from '../utils/debug'
import hooksDescriptor, { hook, useHooks, delHooksDescriptor } from '../plugin/hooksDescriptor'

function showErrorMsg (pluginName, msg) {
  console.error(`[${pluginName}] event or callback cant be undefined or null when call ${msg}`)
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
      Object.defineProperty(Obj, key, map[key])
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

  beforeCreate () {}
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
   *
   * @param { string | Array<string> } event
   * @param { Function } callback
   * @returns
   */
  on (event, callback) {
    if (!event || !callback) {
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
    if (!event || !callback) {
      showErrorMsg(this.pluginName, 'plugin.once(event, callback)')
      return
    }
    this.player.once(event, callback)
  }

  /**
   *
   * @param { string } event
   * @param { Function } callback
   * @returns
   */
  off (event, callback) {
    if (!event || !callback) {
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
    Object.keys(this.__events).map(item => {
      this.__events[item] && this.off(item, this.__events[item])
      item && delete this.__events[item]
    })
    this.__events = {}
  }

  /**
   *
   * @param { string } event
   * @param { any } [res]
   * @returns
   */
  emit (event, res) {
    this.player.emit(event, res)
  }

  emitUserAction (event, action, params = {}) {
    if (!action || !event) {
      return
    }
    const eventType = Util.typeOf(event) === 'String' ? event : (event.type || '')

    if (action === 'switch_play_pause') {
      Util.typeOf(params.paused) === 'Undefined' && (params.paused = this.player.paused)
      params.isFirstStart = !this.player.playing
    }
    this.emit(Events.USER_ACTION, {
      eventType,
      action,
      pluginName: this.pluginName,
      currentTime: this.player.currentTime,
      duration: this.player.duration,
      ended: this.player.ended,
      target: event.target || null,
      ...params
    })
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

  useHooks

  /**
   * 注册子插件
   * @param { any } plugin
   * @param { any } [options]
   * @param { string } [name]
   * @returns { any }
   */
  registerPlugin (plugin, options = {}, name = '') {
    name && (options.pluginName = name)
    return this.player.registerPlugin({ plugin, options })
  }

  /**
   *
   * @param { string } name
   * @returns { any | null }
   */
  getPlugin (name) {
    return this.player.getPlugin(name)
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
