/**
* an ui Plugin class
*
**/
import pluginsManager from './pluginsManager'
import BasePlugin, {Util} from './basePlugin'
import * as delegate from 'delegate-events'

function isUrl (str) {
  if (!str) {
    return false;
  }
  return str.indexOf && /^http/.test(str);
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

function createIcon (icon, key, classname = '', attr = {}) {
  let newIcon = null;
  if (icon instanceof window.Element) {
    Util.addClass(icon, classname);
    Object.keys(attr).map(key => {
      icon.setAttribute(key, attr[key]);
    })
    return icon;
  }

  if (isUrl(icon) || isUrl(icon.url)) {
    attr.src = isUrl(icon) ? icon : (icon.url || '');
    newIcon = Util.createDom(icon.tag || 'img', '', attr, `xg-img ${classname}`);
    return newIcon;
  }

  if (typeof icon === 'function') {
    try {
      newIcon = icon();
      if (newIcon instanceof window.Element) {
        Util.addClass(newIcon, classname);
        Object.keys(attr).map(key => {
          newIcon.setAttribute(key, attr[key]);
        })
        return newIcon;
      } else {
        console.warn(`[xgplayer]warn>>config of icons.${key} is a function mast return an Element Object`)
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  if (typeof icon === 'string') {
    return Util.createDomFromHtml(icon, attr, classname);
  }
  console.warn(`[xgplayer]warn>>config of icons.${key} is invalid`);
  return null;
}

function registerIconsObj (iconsConfig, plugin) {
  const _icons = plugin.config.icons || plugin.playerConfig.icons
  Object.keys(iconsConfig).map(key => {
    const orgIcon = iconsConfig[key] || {};
    let classname = orgIcon.class || '';
    let attr = orgIcon.attr || {};
    let newIcon = null;
    if (_icons && _icons[key]) {
      classname = mergeIconClass(_icons[key], classname);
      attr = mergeIconAttr(_icons[key], attr);
      newIcon = createIcon(_icons[key], key, classname, attr)
    }
    if (!newIcon) {
      newIcon = orgIcon.icon ? orgIcon.icon : orgIcon
      newIcon = newIcon instanceof window.Element ? newIcon : Util.createDomFromHtml(newIcon, attr, classname)
    }
    plugin.icons[key] = newIcon
  })
}

function registerTextObj (textConfig, plugin) {
  Object.keys(textConfig).map((key) => {
    Object.defineProperty(plugin.langText, key, {
      get: () => {
        let lang = plugin.lang
        return textConfig[key][lang]
      }
    })
  })
}

export default class Plugin extends BasePlugin {
  /**
    * 插入dom结构
    * @param {String | Element} html html字符串或者dom
    * @param {Element} parent
    * @param {*} index
    */
  static insert (html, parent, index = 0) {
    const len = parent.children.length
    const insertIdx = Number(index)
    const isDomElement = html instanceof window.Node

    if (len) {
      let i = 0;
      let coordinate = null;
      let mode = '';
      for (;i < len; i++) {
        coordinate = parent.children[i];
        const curIdx = Number(coordinate.getAttribute('data-index'));
        if (curIdx >= insertIdx) {
          mode = 'beforebegin';
          break;
        } else if (curIdx < insertIdx) {
          mode = 'afterend';
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
      return mode === 'afterend' ? parent.children[parent.children.length - 1] : parent.children[i];
    } else {
      isDomElement ? parent.appendChild(html) : parent.insertAdjacentHTML('beforeend', html)
      return parent.children[parent.children.length - 1];
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

    this.langText = {}
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
      _el = Util.createDom(args.tag, '', args.attr, args.name)
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

  set lang (lang) {
    this.config.lang = lang
    function checkChildren (node, callback) {
      for (let i = 0; i < node.children.length; i++) {
        if (node.children[i].children.length > 0) {
          checkChildren(node.children[i], callback)
        } else {
          callback(node.children[i])
        }
      }
    }
    if (this.root) {
      checkChildren(this.root, (node) => {
        const langKey = node.getAttribute && node.getAttribute('lang-key')
        if (langKey && this.langText[langKey]) {
          const langTextShow = this.langText[langKey]
          node.innerHTML = typeof langTextShow === 'function' ? langTextShow(lang) : langTextShow
        }
      })
    }
  }

  get lang () {
    let lang = this.config.lang || this.playerConfig.lang || 'zh'
    if (lang.indexOf('-') > 0) {
      lang = lang.split('-')[0]
    }
    return lang
  }

  changeLangTextKey (dom, key) {
    dom.getAttribute && dom.setAttribute('lang-key', key)
    dom.innerHTML = this.langText[key]
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

  __destroy () {
    super.__destroy();
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
