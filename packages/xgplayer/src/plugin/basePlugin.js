import Util from '../utils/util'
import Sniffer from '../utils/sniffer'
import Errors from '../error'
import * as Events from '../events'

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
            return args.pluginName
          } else {
            return this.constructor.pluginName
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

  on (event, callback) {
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
    this.player.once(event, callback)
  }

  off (event, callback) {
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
    for (const item of Object.keys(this.__events)) {
      this.__events[item] && this.off(item, this.__events[item])
      delete this.__events[item]
    }
    this.__events = {}
  }

  emit (event, res) {
    this.player.emit(event, res)
  }

  __destroy () {
    this.offAll()
    if (Util.checkIsFunction(this.destroy)) {
      this.destroy();
    }
    ['player', 'playerConfig', 'pluginName', 'logger'].map(item => {
      Object.defineProperty(this, item, {
        writable: true
      });
    })
    Object.keys(this).map(key => {
      delete this[key]
    })
  }
}

BasePlugin.Util = Util
BasePlugin.Sniffer = Sniffer
BasePlugin.Errors = Errors
BasePlugin.Events = Events
export {
  BasePlugin as default,
  Util,
  Sniffer,
  Errors,
  Events
}
