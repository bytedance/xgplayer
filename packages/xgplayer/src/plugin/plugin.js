/**
* an ui Plugin class
*
**/
import pluginsManager from './pluginsManager'
import BasePlugin, {Util} from './basePlugin'
import * as delegate from 'delegate-events'

// const {Util} = BasePlugin
function _createElement (tag, name, attr = {}) {
  const dom = document.createElement(tag)
  dom.className = name
  attr && Object.keys(attr).map(key => {
    dom.setAttribute(key, attr[key])
  })
  return dom
}

function isUrl (str) {
  return str.indexOf && /^http/.test(str);
}

function registerIconsObj (iconsConfig, plugin) {
  const _icons = plugin.config.icons || plugin.playerConfig.icons
  Object.keys(iconsConfig).map(key => {
    const orgIcon = iconsConfig[key] || {}
    const classname = orgIcon.class || ''
    const attr = orgIcon.attr || {}
    let _icon = null
    if (_icons && _icons[key]) {
      _icon = _icons[key]
      if (_icon instanceof window.Element) {
        Util.addClass(_icon, classname)
        Object.keys(attr).map(key => {
          _icon.setAttribute(key, attr[key])
        })
      } else if (isUrl(_icon)) {
        _icon = Util.createDom('img', '', {src: _icon}, attr, `xg-img ${classname}`)
      } else if (typeof _icon === 'function') {
        _icon = _icon(classname, attr)
        if (_icon instanceof window.Element) {
          Util.addClass(_icon, classname)
          Object.keys(attr).map(key => {
            _icon.setAttribute(key, attr[key])
          })
        }
      } else {
        _icon = Util.createDomFromHtml(_icon, attr, classname)
      }
    }
    if (!_icon) {
      _icon = orgIcon.icon ? orgIcon.icon : orgIcon
      _icon = _icon instanceof window.Element ? _icon : Util.createDomFromHtml(_icon, attr, classname)
    }
    plugin.icons[key] = _icon
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
    const _orgicons = this.registerIcons() || {}
    registerIconsObj(_orgicons, this)

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
      'root': {
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
      this.root.setAttribute('data-index', this.config.index)
    }
    this.__registeChildren()
  }

  __registeChildren () {
    if (!this.root) {
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
            root: this.root
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
    options.root = options.root || this.root
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
    if (!this.root) {
      return
    }
    return this.root.querySelector(qs)
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
      if (!this.root) {
        return
      }
      if (Array.isArray(eventType)) {
        eventType.forEach((item) => {
          delegate.bind(this.root, querySelector, item, callback, false)
        })
      } else {
        delegate.bind(this.root, querySelector, eventType, callback, false)
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
          delegate.unbind(this.root, querySelector, item, callback, false)
        })
      } else {
        delegate.unbind(this.root, querySelector, eventType, callback, false)
      }
    }
  }

  setStyle (name, value) {
    if (!this.root) {
      return
    }
    if (typeof name === 'string') {
      return (this.root.style[name] = value)
    } else if (typeof name === 'object') {
      const obj = name
      for (const item of Object.keys(obj)) {
        this.root.style[item] = obj[item]
      }
    }
  }

  setAttr (name, value) {
    if (!this.root) {
      return
    }
    if (typeof name === 'string') {
      return this.root.setAttribute(name, value)
    } else if (typeof name === 'object') {
      const obj = name
      for (const item of Object.keys(obj)) {
        this.root.setAttribute(item, obj[item])
      }
    }
  }

  setHtml (htmlStr, callback) {
    if (!this.root) {
      return
    }
    this.root.innerHtml = htmlStr
    if (typeof callback === 'function') {
      callback()
    }
  }

  bindEL (event, eventHandle, isBubble = false) {
    if (!this.root) {
      return
    }
    if (`on${event}` in this.root && typeof eventHandle === 'function') {
      this.root.addEventListener(event, eventHandle, isBubble)
    }
  }

  unbindEL (event, eventHandle, isBubble = false) {
    if (!this.root) {
      return
    }
    if (`on${event}` in this.root && typeof eventHandle === 'function') {
      this.root.removeEventListener(event, eventHandle, isBubble)
    }
  }

  show (value) {
    if (!this.root) {
      return;
    }
    this.root.style.display = value !== undefined ? value : 'block'
    const cs = window.getComputedStyle(this.root, null)
    const cssDisplayValue = cs.getPropertyValue('display')
    if (cssDisplayValue === 'none') {
      return (this.root.style.display = 'block')
    }
  }

  hide () {
    this.root && (this.root.style.display = 'none')
  }

  appendChild (pdom, child) {
    if (arguments.length < 2 && arguments[0] instanceof window.Element) {
      return this.root.appendChild(arguments[0])
    }
    if (!child || !(child instanceof window.Element)) {
      return null
    }
    try {
      if (typeof pdom === 'string') {
        return this.find(pdom).appendChild(child)
      } else {
        return pdom.appendChild(child)
      }
    } catch (err) {
      console.warn(err)
      return null
    }
  }

  render () {
    return ''
  }

  _destroy () {
    this.offAll()
    if (BasePlugin.Util.checkIsFunction(this.destroy)) {
      this.destroy();
    }
    if (this.root) {
      if (this.root.hasOwnProperty('remove')) {
        this.root.remove()
      } else if (this.root.parentNode) {
        this.root.parentNode.removeChild(this.root)
      }
    }
  }
}

Plugin.ROOT_TYPES = {
  CONTROLS: 'controls',
  ROOT: 'root'
}

Plugin.POSITIONS = {
  ROOT: 'root',
  ROOT_LEFT: 'rootLeft',
  ROOT_RIGHT: 'rootRight',
  ROOT_TOP: 'rootTop',
  CONTROLS_LEFT: 'controlsLeft',
  CONTROLS_RIGTH: 'controlsRight',
  CONTROLS_CENTER: 'controlsCenter',
  CONTROLS: 'controls'
}
