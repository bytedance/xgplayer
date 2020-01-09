/**
* an ui Plugin class
*
**/
import delegate from 'delegate-events'
import pluginsManager from './pluginsManager'
import BasePlugin from './basePlugin'

function _createElement(tag, name){
  const dom =  document.createElement(tag)
  dom.name = name
  return dom
}
/**
 * 插入dom结构
 * @param {String} html html字符串
 * @param {DocumentElemebt } parent 
 * @param {*} index 
 */
function insert(html, parent, index) {
  const len = parent.children.length
  const insertIdx = parseInt(index)
  if (typeof index === 'undefined' || len <= insertIdx) {
    parent.insertAdjacentHTML('beforeend', html)
    return parent.children[parent.children.length - 1]
  } else if (insertIdx === 0) {
    parent.insertAdjacentHTML('afterbegin', html)
    return parent.children[0]
  }
  const el = parent.children[insertIdx]
  if (el && el.insertAdjacentHTML) {
    el.insertAdjacentHTML('beforebegin', html)
    return parent.children[insertIdx]
  }
}


function registerIconsObj(iconsConfig, plugin) {
  Object.keys(iconsConfig).map((iconKey) => {
    Object.defineProperty(plugin.icons, iconKey, {
      get: () => {
        const _icons = plugin.config.icons || plugin.playerConfig.icons
        if (_icons && _icons[iconKey]) {
          return _icons[iconKey]
        } else{
          return iconsConfig[iconKey]
        }
      }
    })
  })
}

function registerTextObj(textConfig, plugin) {
  Object.keys(textConfig).map((key) => {
    Object.defineProperty(plugin.text, key, {
      get: () => {
        const lang = plugin.playerConfig.lang || 'zh'
        console.log(textConfig[key][lang])
        return textConfig[key][lang]
      }
    })
  })
}

export default class Plugin extends BasePlugin {
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
    console.log('registerLangauageTexts', defaultTexConfig)
    registerTextObj(defaultTexConfig, this)
    // Object.keys(defaultTexConfig).map((key) => {
    //   Object.defineProperty(this.text, key, {
    //     get: () => {
    //       let lang = this.playerConfig.lang || 'zh-cn'
    //       lang = lang === 'zh' ? 'zh' : lang
    //       return defaultTexConfig[lang]
    //     },

    //     set: (value) => {
    //       let lang = this.playerConfig.lang || 'zh-cn'
    //       if (defaultTexConfig[lang]) {
    //         defaultTexConfig[lang] = value
    //       }
    //     }
    //   })
    // })
    let renderStr = ''
    try {
      renderStr = this.render()
    } catch(e) {
      throw(new Error(`Plugin:${this.pluginName}:render:${e.message}`))
    }

    if (renderStr) {
      _el = insert(renderStr, _parent, args.index)
    } else if (args.tag) {
      _el = _createElement(args.tag, args.name)
      _parent.appendChild(_el)
    }

    Plugin.defineGetterOrSetter(this, {
      'el': {
        get:() => {
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
    this.__registeChildren()
  }

  __registeChildren () {
    const children = this.children()
    if (children && typeof children === 'object') {
      if (!this._children) {
        this._children = []
      }
      if (Object.keys(children).length > 0) {
        for (const item of Object.keys(children)) {
          const name = item
          const c = this._registerPlugin(name, children[item], this.config[name])
          this._children.push(c)
        }
      }
    }
  }

  plugins() {
    return this._children
  }

  children () {
    return {}
  }

  _registerPlugin (name, item, options) {
    const opts = (typeof options === 'object' ? options : {})
    opts.root = this.el
    opts.pluginName = name
    return pluginsManager.register(this.player, item, opts)
  }

  registerIcons() {
    return {}
  }

  registerLangauageTexts() {
    return {}
  }

  getPlugin (name) {
    return pluginsManager.findPlugin(this.player, name)
  }

  find (qs) {
    return this.el.querySelector(qs)
  }

  bind (querySelector, eventType, callback) {
    // if no querySelector passed to the method
    if (arguments.length < 3 && typeof eventType === 'function') {
      this.bindEL(querySelector, eventType)
    } else if (arguments.length === 3 && typeof callback === 'function') {
      delegate.bind(this.el, querySelector, eventType, callback, false)
    }
  }

  unbind (querySelector, eventType, callback) {
    // if no querySelector passed to the method
    if (arguments.length < 3 && typeof eventType === 'function') {
      this.unbindEL(querySelector, eventType)
    } else if (typeof callback === 'function') {
      delegate.ubind(this.el, querySelector, eventType, callback, false)
    }
  }

  setStyle (name, value) {
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
    this.el.innerHtml = htmlStr
    if (typeof callback === 'function') {
      callback()
    }
  }

  bindEL (event, eventHandle, isBubble = false) {
    if (`on${event}` in this.el && typeof eventHandle === 'function') {
      this.el.addEventListener(event, eventHandle, isBubble)
    }
  }

  unbindEL (event, eventHandle, isBubble = false) {
    if (`on${event}` in this.el && typeof eventHandle === 'function') {
      this.el.removeEventListener(event, eventHandle, isBubble)
    }
  }

  show () {
    this.el.style.display = ''
    const cs = window.getComputedStyle(this.el, null)
    const cssDisplayValue = cs.getPropertyValue('display')
    if (cssDisplayValue === 'none') {
      return (this.el.style.display = 'block')
    }
  }

  hide () {
    this.el.style.display = 'none'
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
