/**
* an ui Plugin class
*
**/
import pluginsManager from './pluginsManager'
import BasePlugin from './basePlugin'
import * as delegate from 'delegate-events'

function _createElement (tag, name) {
  const dom = document.createElement(tag)
  dom.name = name
  return dom
}

function registerIconsObj (iconsConfig, plugin) {
  Object.keys(iconsConfig).map((iconKey) => {
    Object.defineProperty(plugin.icons, iconKey, {
      get: () => {
        const _icons = plugin.config.icons || plugin.playerConfig.icons
        if (_icons && _icons[iconKey]) {
          return _icons[iconKey]
        } else {
          return iconsConfig[iconKey]
        }
      }
    })
  })
}

function registerTextObj (textConfig, plugin) {
  Object.keys(textConfig).map((key) => {
    Object.defineProperty(plugin.text, key, {
      get: () => {
        let lang = plugin.playerConfig.lang || 'zh'
        if (lang.indexOf('-') > 0) {
          lang = lang.split('-')[0]
        }
        return textConfig[key][lang]
      }
    })
  })
}

export default class Plugin extends BasePlugin {
  /**
    * 插入dom结构
    * @param {String} html html字符串或者dom
    * @param {DocumentElemebt } parent
    * @param {*} index
    */
  static insert (html, parent, index) {
    const len = parent.children.length
    const insertIdx = parseInt(index)
    const isDomElement = html instanceof window.HTMLElement
    if (typeof index === 'undefined' || len <= insertIdx) {
      isDomElement ? parent.appendChild(html) : parent.insertAdjacentHTML('beforeend', html)
      return parent.children[parent.children.length - 1]
    } else if (insertIdx === 0) {
      isDomElement ? parent.insertBefore(html, parent.children.length > 0 ? parent.children[0] : null) : parent.insertAdjacentHTML('afterbegin', html)
      return parent.children[0]
    }
    const el = parent.children[insertIdx]
    if (el && el.insertAdjacentHTML) {
      isDomElement ? parent.insertBefore(html, el) : el.insertAdjacentHTML('beforebegin', html)
      return parent.children[insertIdx]
    }
  }

  static get defaultConfig () {
    return {}
  }
  constructor (args = {}) {
    super(args)
  }

  __init (args) {
    super.__init(args)
    let _parent = args.root
    let _el = null
    this.icons = {}
    const defaultIcons = this.registerIcons() || {}
    registerIconsObj(defaultIcons, this)

    this.text = {}
    const defaultTexConfig = this.registerLangauageTexts() || {}
    registerTextObj(defaultTexConfig, this)
    let renderStr = ''
    try {
      renderStr = this.render()
    } catch (e) {
      throw (new Error(`Plugin:${this.pluginName}:render:${e.message}`))
    }
    if (renderStr) {
      _el = Plugin.insert(renderStr, _parent, args.index)
    } else if (args.tag) {
      _el = _createElement(args.tag, args.name)
      _parent.appendChild(_el)
    } else {
      return
    }

    Plugin.defineGetterOrSetter(this, {
      'el': {
        get: () => {
          return _el
        }
      },
      'parent': {
        get: () => {
          return _parent
        }
      }
    })

    const attr = this.config.attr || {}
    const style = this.config.style || {}

    this.setAttr(attr)
    this.setStyle(style)
    if (this.config.index) {
      this.el.setAttribute('data-index', this.config.index)
    }
    this.__registeChildren()
  }

  __registeChildren () {
    if (!this.el) {
      return
    }
    const children = this.children()
    if (children && typeof children === 'object') {
      if (!this._children) {
        this._children = []
      }
      if (Object.keys(children).length > 0) {
        for (const item of Object.keys(children)) {
          const name = item
          let _plugin = children[name]
          const options = {
            root: this.el
          }
          // eslint-disable-next-line no-unused-vars
          let config, Plugin
          if (typeof _plugin === 'function') {
            config = this.config[name] || {}
            Plugin = _plugin
          } else if (typeof _plugin === 'object' && typeof _plugin.plugin === 'function') {
            config = _plugin.options ? BasePlugin.Util.deepCopy((this.config[name] || {}), _plugin.options) : (this.config[name] || {})
            Plugin = _plugin.plugin
          }
          options.config = config
          config.index !== undefined && (options.index = config.index)
          config.root && (options.root = config.root)
          const c = this.registerPlugin(Plugin, options, name)
          this._children.push(c)
        }
      }
    }
  }

  plugins () {
    return this._children
  }

  children () {
    return {}
  }

  registerPlugin (plugin, options = {}, name = '') {
    options.root = options.root || this.el
    name && (options.pluginName = name)
    const _c = pluginsManager.register(this.player, plugin, options)
    this._children.push(_c)
    return _c
  }

  registerIcons () {
    return {}
  }

  registerLangauageTexts () {
    return {}
  }

  getPlugin (name) {
    return pluginsManager.findPlugin(this.player, name)
  }

  find (qs) {
    if (!this.el) {
      return
    }
    return this.el.querySelector(qs)
  }

  bind (querySelector, eventType, callback) {
    // if no querySelector passed to the method
    if (arguments.length < 3 && typeof eventType === 'function') {
      if (Array.isArray(querySelector)) {
        querySelector.forEach((item) => {
          this.bindEL(item, eventType)
        })
      } else {
        this.bindEL(querySelector, eventType)
      }
    } else if (arguments.length === 3 && typeof callback === 'function') {
      if (!this.el) {
        return
      }
      if (Array.isArray(eventType)) {
        eventType.forEach((item) => {
          delegate.bind(this.el, querySelector, item, callback, false)
        })
      } else {
        delegate.bind(this.el, querySelector, eventType, callback, false)
      }
    }
  }

  unbind (querySelector, eventType, callback) {
    // if no querySelector passed to the method
    if (arguments.length < 3 && typeof eventType === 'function') {
      if (Array.isArray(querySelector)) {
        querySelector.forEach((item) => {
          this.unbindEL(item, eventType)
        })
      } else {
        this.unbindEL(querySelector, eventType)
      }
    } else if (typeof callback === 'function') {
      if (Array.isArray(eventType)) {
        eventType.forEach((item) => {
          delegate.unbind(this.el, querySelector, item, callback, false)
        })
      } else {
        delegate.unbind(this.el, querySelector, eventType, callback, false)
      }
    }
  }

  setStyle (name, value) {
    if (!this.el) {
      return
    }
    if (typeof name === 'string') {
      this.style[name] = value
      return (this.el.style[name] = value)
    } else if (typeof name === 'object') {
      const obj = name
      for (const item of Object.keys(obj)) {
        this.el.style[item] = obj[item]
      }
    }
  }

  setAttr (name, value) {
    if (!this.el) {
      return
    }
    if (typeof name === 'string') {
      return this.el.setAttribute(name, value)
    } else if (typeof name === 'object') {
      const obj = name
      for (const item of Object.keys(obj)) {
        this.el.setAttribute(item, obj[item])
      }
    }
  }

  setHtml (htmlStr, callback) {
    if (!this.el) {
      return
    }
    this.el.innerHtml = htmlStr
    if (typeof callback === 'function') {
      callback()
    }
  }

  bindEL (event, eventHandle, isBubble = false) {
    if (!this.el) {
      return
    }
    if (`on${event}` in this.el && typeof eventHandle === 'function') {
      this.el.addEventListener(event, eventHandle, isBubble)
    }
  }

  unbindEL (event, eventHandle, isBubble = false) {
    if (!this.el) {
      return
    }
    if (`on${event}` in this.el && typeof eventHandle === 'function') {
      this.el.removeEventListener(event, eventHandle, isBubble)
    }
  }

  show (value) {
    if (!this.el) {
      return;
    }
    this.el.style.display = value !== undefined ? value : 'block'
    const cs = window.getComputedStyle(this.el, null)
    const cssDisplayValue = cs.getPropertyValue('display')
    if (cssDisplayValue === 'none') {
      return (this.el.style.display = 'block')
    }
  }

  hide () {
    this.el && (this.el.style.display = 'none')
  }

  render () {
    return ''
  }

  _destroy () {
    this.offAll()
    if (BasePlugin.Util.checkIsFunction(this.destroy)) {
      this.destroy();
    }
    if (this.el) {
      if (this.el.hasOwnProperty('remove')) {
        this.el.remove()
      } else if (this.el.parentNode) {
        this.el.parentNode.removeChild(this.el)
      }
    }
  }
}

Plugin.ROOT_TYPES = {
  CONTROLS: 'controls',
  BASE_BAR: 'base_bar',
  ROOT: 'root'
}

Plugin.POSITIONS = {
  LEFT: 'left',
  RIGHT: 'right',
  CENTER: 'center',
  TOP: 'top'
}
