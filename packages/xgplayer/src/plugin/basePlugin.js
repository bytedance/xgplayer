import Util from '../utils/util'
import Sniffer from '../utils/sniffer'
import Errors from '../error'
import * as Events from '../events'
import XG_DEBUG from '../utils/debug'

function showErrorMsg (pluginName, msg) {
  console.error(`[${pluginName}] event or callback cant be undefined or null when call ${msg}`)
}

class BasePlugin {
  static defineGetterOrSetter (Obj, map) {
    for (const key in map) {
      Object.defineProperty(Obj, key, map[key])
    }
  }

  /**
   * @type { object }
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
   * @constructor
   * @param { { index: number, player: object, pluginName: string, config: { [propName: string]: any }, [propName: string]: any;}  } args
   */
  constructor (args) {
    if (Util.checkIsFunction(this.beforeCreate)) {
      this.beforeCreate(args)
    }
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
     * @type {object}
     */
    this.player = null
    /**
       * @readonly
       * @type {object}
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
    BasePlugin.defineGetterOrSetter(this, {
      player: {
        get: () => {
          return args.player
        },
        configurable: true
      },
      playerConfig: {
        get: () => {
          return args.player && args.player.config
        },
        configurable: true
      },

      pluginName: {
        get: () => {
          if (args.pluginName) {
            return args.pluginName.toLowerCase()
          } else {
            return this.constructor.pluginName.toLowerCase()
          }
        },
        configurable: true
      },
      logger: {
        get: () => {
          return args.player.logger
        },
        configurable: true
      }
    })
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
   * @param { any } res
   * @returns
   */
  emit (event, res) {
    this.player.emit(event, res)
  }

  /**
   * 注册子插件
   * @param { any } plugin
   * @param { any } [options]
   * @param { string } [name]
   * @returns { object }
   */
  registerPlugin (plugin, options = {}, name = '') {
    name && (options.pluginName = name)
    return this.player.registerPlugin({ plugin, options })
  }

  /**
   *
   * @param { string } name
   * @returns { object | null }
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

    ['player', 'playerConfig', 'pluginName', 'logger'].map(item => {
      Object.defineProperty(this, item, {
        writable: true
      })
    })
    Object.keys(this).map(key => {
      this[key] = null
      delete this[key]
    })
    Object.setPrototypeOf && Object.setPrototypeOf(this, null)
    player.unRegisterPlugin(pluginName)
  }
}

// BasePlugin.Util = Util
// BasePlugin.Sniffer = Sniffer
// BasePlugin.Errors = Errors
// BasePlugin.Events = Events
// BasePlugin.XG_DEBUG = XG_DEBUG
export {
  BasePlugin as default,
  Util,
  Sniffer,
  Errors,
  Events,
  XG_DEBUG
}
