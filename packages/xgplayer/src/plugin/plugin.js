/**
* an ui Plugin class
*
**/
import BasePlugin, { Util, XG_DEBUG } from './basePlugin'
import delegate from 'delegate'

const ROOT_TYPES = {
  CONTROLS: 'controls',
  ROOT: 'root'
}

const POSITIONS = {
  ROOT: 'root',
  ROOT_LEFT: 'rootLeft',
  ROOT_RIGHT: 'rootRight',
  ROOT_TOP: 'rootTop',
  CONTROLS_LEFT: 'controlsLeft',
  CONTROLS_RIGTH: 'controlsRight',
  CONTROLS_RIGHT: 'controlsRight',
  CONTROLS_CENTER: 'controlsCenter',
  CONTROLS: 'controls'
}

/**
 * Check if the url is a link address
 * @param { string } str
 */
function isUrl (str) {
  if (!str) {
    return false
  }
  return str.indexOf && /^http/.test(str)
}

function mergeIconClass (icon, classname) {
  if (typeof icon === 'object' && icon.class && typeof icon.class === 'string') {
    return `${classname} ${icon.class}`
  }
  return classname
}

function mergeIconAttr (icon, attr) {
  if (typeof icon === 'object' && icon.attr && typeof icon.attr === 'object') {
    Object.keys(icon.attr).map(key => {
      attr[key] = icon.attr[key]
    })
  }
  return attr
}

function createIcon (icon, key, classname = '', attr = {}, pluginName = '') {
  let newIcon = null
  if (icon instanceof window.Element) {
    Util.addClass(icon, classname)
    Object.keys(attr).map(key => {
      icon.setAttribute(key, attr[key])
    })
    return icon
  }

  if (isUrl(icon) || isUrl(icon.url)) {
    attr.src = isUrl(icon) ? icon : (icon.url || '')
    newIcon = Util.createDom(icon.tag || 'img', '', attr, `xg-img ${classname}`)
    return newIcon
  }

  if (typeof icon === 'function') {
    try {
      newIcon = icon()
      if (newIcon instanceof window.Element) {
        Util.addClass(newIcon, classname)
        Object.keys(attr).map(key => {
          newIcon.setAttribute(key, attr[key])
        })
        return newIcon
      } else {
        XG_DEBUG.logWarn(`warn>>icons.${key} in config of plugin named [${pluginName}] is a function mast return an Element Object`)
      }
      return null
    } catch (e) {
      XG_DEBUG.logError(`Plugin named [${pluginName}]:createIcon`, e)
      return null
    }
  }

  if (typeof icon === 'string') {
    return Util.createDomFromHtml(icon, attr, classname)
  }
  XG_DEBUG.logWarn(`warn>>icons.${key} in config of plugin named [${pluginName}] is invalid`)
  return null
}

function registerIconsObj (iconsConfig, plugin) {
  const _icons = plugin.config.icons || plugin.playerConfig.icons
  Object.keys(iconsConfig).map(key => {
    const orgIcon = iconsConfig[key]
    let classname = orgIcon && orgIcon.class ? orgIcon.class : ''
    let attr = orgIcon && orgIcon.attr ? orgIcon.attr : {}
    let newIcon = null
    if (_icons && _icons[key]) {
      classname = mergeIconClass(_icons[key], classname)
      attr = mergeIconAttr(_icons[key], attr)
      newIcon = createIcon(_icons[key], key, classname, attr, plugin.pluginName)
    }
    if (!newIcon && orgIcon) {
      newIcon = createIcon((orgIcon.icon ? orgIcon.icon : orgIcon), attr, classname, {}, plugin.pluginName)
    }
    plugin.icons[key] = newIcon
  })
}

function registerTextObj (textConfig, plugin) {
  Object.keys(textConfig).map((key) => {
    Object.defineProperty(plugin.langText, key, {
      get: () => {
        const lang = plugin.lang
        return textConfig[key][lang] || textConfig[key].zh
      }
    })
  })
}
/**
 * @typedef { import ('../player').default } Player
 */

/**
 * @typedef {{
 *  index?: number,
 *  player: Player,
 *  pluginName: string,
 *  config: {
 *   [propName: string]: any
 *  },
 *  root?: HTMLElement,
 *  position?: string,
 *  [propName: string]: any
 * }} IPluginOptions
*/
class Plugin extends BasePlugin {
  /**
    * 插入dom结构
    * @param { String | HTMLElement } html html字符串或者dom
    * @param { HTMLElement } parent
    * @param { number } index
    * @returns { HTMLElement }
    */
  static insert (html, parent, index = 0) {
    const len = parent.children.length
    const insertIdx = Number(index)
    const isDomElement = html instanceof window.Node

    if (len) {
      let i = 0
      let coordinate = null
      let mode = ''
      for (;i < len; i++) {
        coordinate = parent.children[i]
        const curIdx = Number(coordinate.getAttribute('data-index'))
        if (curIdx >= insertIdx) {
          mode = 'beforebegin'
          break
        } else if (curIdx < insertIdx) {
          mode = 'afterend'
        }
      }

      if (isDomElement) {
        if (mode === 'afterend') {
          // as last element
          parent.appendChild(html)
        } else {
          parent.insertBefore(html, coordinate)
        }
      } else {
        coordinate.insertAdjacentHTML(mode, html)
      }
      return mode === 'afterend' ? parent.children[parent.children.length - 1] : parent.children[i]
    } else {
      isDomElement ? parent.appendChild(html) : parent.insertAdjacentHTML('beforeend', html)
      return parent.children[parent.children.length - 1]
    }
  }

  static get defaultConfig () {
    return {}
  }

  /**
   *
   * @param { HTMLElement } root
   * @param { String } querySelector
   * @param { String | Array<String> } eventType
   * @param { Function } callback
   * @param { boolean } [capture=false]
   * @returns
   */
  static delegate (root, querySelector, eventType, callback, capture = false) {
    const dels = []
    if (root instanceof window.Node && typeof callback === 'function') {
      if (Array.isArray(eventType)) {
        eventType.forEach((item) => {
          const ret = delegate(root, querySelector, item, callback, capture)
          ret.key = `${querySelector}_${item}`
          dels.push(ret)
        })
      } else {
        const ret = delegate(root, querySelector, eventType, callback, capture)
        ret.key = `${querySelector}_${eventType}`
        dels.push(ret)
      }
    }
    return dels
  }

  static get ROOT_TYPES () {
    return ROOT_TYPES
  }

  static get POSITIONS () {
    return POSITIONS
  }

  /**
   * @param { IPluginOptions } args
   */
  constructor (args = {}) {
    super(args)
    /**
     * @private
     */
    this.__delegates = []
  }

  /**
   * @private
   */
  __init (args) {
    super.__init(args)
    const _parent = args.root
    let _el = null
    /**
     * @readonly
     */
    this.icons = {}
    /**
     * @readonly
     * @type { HTMLElement }
     */
    this.root = null
    /**
     * @readonly
     * @type { HTMLElement }
     */
    this.parent = null

    const _orgicons = this.registerIcons() || {}
    registerIconsObj(_orgicons, this)
    /**
     * @readonly
     */
    this.langText = {}
    const defaultTexConfig = this.registerLanguageTexts() || {}
    registerTextObj(defaultTexConfig, this)
    let renderStr = ''
    try {
      renderStr = this.render()
    } catch (e) {
      XG_DEBUG.logError(`Plugin:${this.pluginName}:render`, e)
      throw (new Error(`Plugin:${this.pluginName}:render:${e.message}`))
    }

    if (renderStr) {
      _el = Plugin.insert(renderStr, _parent, args.index)
      _el.setAttribute('data-index', args.index)
    } else if (args.tag) {
      _el = Util.createDom(args.tag, '', args.attr, args.name)
      _el.setAttribute('data-index', args.index)
      _parent.appendChild(_el)
    } else {
      return
    }

    Plugin.defineGetterOrSetter(this, {
      /**
       * @readonly
       * @type { HTMLElement }
       */
      root: {
        get: () => {
          return _el
        },
        configurable: true
      },
      /**
       * @readonly
       * @type { HTMLElement }
       */
      parent: {
        get: () => {
          return _parent
        },
        configurable: true
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

  /**
   * @private
   */
  __registeChildren () {
    if (!this.root) {
      return
    }
    /**
     * @private
     */
    this._children = []
    const children = this.children()
    if (children && typeof children === 'object') {
      if (Object.keys(children).length > 0) {
        Object.keys(children).map(item => {
          const name = item
          const _plugin = children[name]
          const options = {
            root: this.root
          }
          // eslint-disable-next-line no-unused-vars
          let config, Plugin
          if (typeof _plugin === 'function') {
            config = this.config[name] || {}
            Plugin = _plugin
          } else if (typeof _plugin === 'object' && typeof _plugin.plugin === 'function') {
            config = _plugin.options ? Util.deepCopy((this.config[name] || {}), _plugin.options) : (this.config[name] || {})
            Plugin = _plugin.plugin
          }
          options.config = config
          config.index !== undefined && (options.index = config.index)
          config.root && (options.root = config.root)
          this.registerPlugin(Plugin, options, name)
        })
      }
    }
  }

  updateLang (lang) {
    if (!lang) {
      lang = this.lang
    }
    function checkChildren (node, callback) {
      for (let i = 0; i < node.children.length; i++) {
        if (node.children[i].children.length > 0) {
          checkChildren(node.children[i], callback)
        } else {
          callback(node.children[i])
        }
      }
    }
    const { root, i18n, langText } = this
    if (root) {
      checkChildren(root, (node) => {
        const langKey = node.getAttribute && node.getAttribute('lang-key')
        if (!langKey) {
          return
        }
        const langTextShow = i18n[langKey.toUpperCase()] || langText[langKey]
        if (langTextShow) {
          node.innerHTML = typeof langTextShow === 'function' ? langTextShow(lang) : langTextShow
        }
      })
    }
  }

  get lang () {
    return this.player.lang
  }

  changeLangTextKey (dom, key = '') {
    const i18n = this.i18n || {}
    const langText = this.langText
    dom.setAttribute && dom.setAttribute('lang-key', key)
    const text = i18n[key.toUpperCase()] || langText[key]
    if (text) {
      dom.innerHTML = text
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
    const _c = super.registerPlugin(plugin, options, name)
    this._children.push(_c)
    return _c
  }

  registerIcons () {
    return {}
  }

  registerLanguageTexts () {
    return {}
  }

  /**
   *
   * @param { string } qs
   * @returns { HTMLElement | null }
   */
  find (qs) {
    if (!this.root) {
      return
    }
    return this.root.querySelector(qs)
  }

  /**
   * 绑定事件
   * @param { string | Array<string> } querySelector
   * @param { string | Function } eventType
   * @param { Function } [callback]
   */
  bind (querySelector, eventType, callback) {
    if (arguments.length < 3 && typeof eventType === 'function') {
      if (Array.isArray(querySelector)) {
        querySelector.forEach((item) => {
          this.bindEL(item, eventType)
        })
      } else {
        this.bindEL(querySelector, eventType)
      }
    } else {
      const ret = Plugin.delegate.call(this, this.root, querySelector, eventType, callback)
      this.__delegates = this.__delegates.concat(ret)
    }
  }

  /**
   * 绑定事件
   * @param { string | Array<string> } querySelector
   * @param { string | Function } eventType
   */
  unbind (querySelector, eventType) {
    if (arguments.length < 3 && typeof eventType === 'function') {
      if (Array.isArray(querySelector)) {
        querySelector.forEach((item) => {
          this.unbindEL(item, eventType)
        })
      } else {
        this.unbindEL(querySelector, eventType)
      }
    } else {
      const key = `${querySelector}_${eventType}`
      for (let i = 0; i < this.__delegates.length; i++) {
        if (this.__delegates[i].key === key) {
          this.__delegates[i].destroy()
          this.__delegates.splice(i, 1)
          break
        }
      }
    }
  }

  /**
   * 给插件设置样式
   * @param { string | {[propName: string]: any} } name
   * @param { ？ | any } value
   * @returns
   */
  setStyle (name, value) {
    if (!this.root) {
      return
    }
    if (Util.typeOf(name) === 'String') {
      return (this.root.style[name] = value)
    } else if (Util.typeOf(name) === 'Object') {
      Object.keys(name).map(key => {
        this.root.style[key] = name[key]
      })
    }
  }

  /**
   * 给插件根节点设置属性
   * @param { string | {[propName: string]: any} } name
   * @param { ？ | any } value
   * @returns
   */
  setAttr (name, value) {
    if (!this.root) {
      return
    }
    if (Util.typeOf(name) === 'String') {
      return this.root.setAttribute(name, value)
    } else if (Util.typeOf(name) === 'Object') {
      Object.keys(name).map(key => {
        this.root.setAttribute(key, name[key])
      })
    }
  }

  /**
   *
   * @param { string } htmlStr
   * @param { Function } [callback]
   * @returns
   */
  setHtml (htmlStr, callback) {
    if (!this.root) {
      return
    }
    this.root.innerHTML = htmlStr
    if (typeof callback === 'function') {
      callback()
    }
  }

  /**
   *
   * @param { string } event
   * @param { Function } eventHandle
   * @param { boolean } [isBubble=false]
   * @returns
   */
  bindEL (event, eventHandle, isBubble = false) {
    if (!this.root) {
      return
    }
    if (`on${event}` in this.root && typeof eventHandle === 'function') {
      this.root.addEventListener(event, eventHandle, isBubble)
    }
  }

  /**
   *
   * @param { string } event
   * @param { Function } eventHandle
   * @param { boolean } [isBubble]
   * @returns
   */
  unbindEL (event, eventHandle, isBubble = false) {
    if (!this.root) {
      return
    }
    if (`on${event}` in this.root && typeof eventHandle === 'function') {
      this.root.removeEventListener(event, eventHandle, isBubble)
    }
  }

  /**
   *
   * @param { string } [value]
   * @returns
   */
  show (value) {
    if (!this.root) {
      return
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

  /**
   *
   * @param { string | HTMLElement } pdom
   * @param { HTMLElement} child
   * @returns { HTMLElement | nul }
   */
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
      XG_DEBUG.logError('Plugin:appendChild', err)
      return null
    }
  }

  /**
   *
   * @returns { string | HTMLElement }
   */
  render () {
    return ''
  }

  destroy () {}

  __destroy () {
    const { player } = this
    this.__delegates.map(item => {
      item.destroy()
    })
    this.__delegates = []
    // destroy the sub-plugin instance
    if (this._children instanceof Array) {
      this._children.map(item => {
        player.unRegisterPlugin(item.pluginName)
      })
      this._children = null
    }
    if (this.root) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.root.hasOwnProperty('remove')) {
        this.root.remove()
      } else if (this.root.parentNode) {
        this.root.parentNode.removeChild(this.root)
      }
    }

    super.__destroy();

    ['root', 'parent'].map(item => {
      Object.defineProperty(this, item, {
        writable: true
      })
    })
  }
}

export {
  Plugin as default,
  ROOT_TYPES,
  POSITIONS
}
