import util from '../utils/util'
import sniffer from '../utils/sniffer'
import Errors from '../error'
import * as event from '../events'

const type = 'base'


function checkIsFunction (fun) {
  return fun && typeof fun === 'function'
}

function checkIsObj(obj) {
  return obj && typeof obj === ''
}

class BasePlugin {
  static get PluginType () {
    return type
  }

  static get name () {
    return ''
  }

  constructor (args) {
    this.__args = args
    this.__events = {} // 对player的事件监听缓存
    this.__children = [] // 子组件缓存
    this.__name = ''
    this.__player = null
    this.__playerConfig = null
    this.__parentDom = null
    this.__el = null
    this.config = args.config || {}
    if (checkIsFunction(this.beforeCreate)) {
      this.beforeCreate()
    }
    this.__init(args)
    if (checkIsFunction(this.afterCreate)) {
      this.afterCreate()
    }
  }

  __init (args) {
    this.__player = args.player
    this.__playerConfig = args.player && args.player.config
    this.__name = args.name
  }

  get player () {
    return this.__player
  }

  get playerConfig () {
    return this.__playerConfig
  }

  get name () {
    return this.__name
  }

  get parentDom () {
    return this.__parentDom
  }

  get el () {
    return this.__el
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
      this.__events[event] = undefined
      this.player.off(event, callback)
    } else if (Array.isArray(event)) {
      event.forEach((item) => {
        this.__events[item] = undefined
        this.player.off(item, callback)
      })
    }
  }

  offAll () {
    for (const item of Object.keys(this.__events)) {
      this.off(item, this.__events[item])
    }
  }

  emit (event, res) {
    this.player.emit(event, res)
  }

  _destroy () {
    this.offAll()
    if (checkIsFunction(this.destroy)) {
      this.destroy();
    }
  }
}

BasePlugin.Util = util
BasePlugin.Sniffer = sniffer
BasePlugin.Errors = Errors
BasePlugin.Event = event
export default BasePlugin
