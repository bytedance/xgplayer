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

  constructor (args) {
    if (Util.checkIsFunction(this.beforeCreate)) {
      this.beforeCreate(args)
    }
    this.__args = args
    this.__events = {} // 对player的事件监听缓存
    this.config = args.config || {}
    this.__init(args)
  }

  onPluginsReady () {}

  __init (args) {
    BasePlugin.defineGetterOrSetter(this, {
      'player': {
        get: () => {
          return args.player
        },
        configurable: true
      },
      'playerConfig': {
        get: () => {
          return args.player && args.player.config
        },
        configurable: true
      },
      'pluginName': {
        get: () => {
          if (args.pluginName) {
            return args.pluginName.toLowerCase()
          } else {
            return this.constructor.pluginName.toLowerCase()
          }
        },
        configurable: true
      },
      'logger': {
        get: () => {
          return args.player.logger
        },
        configurable: true
      }
    })
  }

  updateLang (lang) {
    if (!lang) {
      lang = this.lang
    }
  }

  get lang () {
    return this.player.lang
  }

  get i18n () {
    return this.player.i18n
  }

  get i18nKeys () {
    return this.player.i18nKeys
  }

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

  once (event, callback) {
    if (!event || !callback) {
      showErrorMsg(this.pluginName, 'plugin.once(event, callback)')
      return
    }
    this.player.once(event, callback)
  }

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

  emit (event, res) {
    this.player.emit(event, res)
  }

  registerPlugin (plugin, options = {}, name = '') {
    name && (options.pluginName = name)
    return this.player.registerPlugin({plugin, options})
  }

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
