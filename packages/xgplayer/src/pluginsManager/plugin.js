/**
* an ui Plugin class
*
**/
import delegate from 'delegate-events'
import pluginsManager from './pluginsManager'
import BasePlugin from './basePlugin'

export default class Plugin extends BasePlugin {
  static get PluginType () {
    return 'ui'
  }

  constructor (args = {}) {
    super(args)
  }

  __init (args) {
    super.__init(args)
    if (Plugin.PluginType !== 'ui') {
      return
    }
    this.__parent = args.root
    const renderStr = this.render()
    if (renderStr) {
      this.__el = this.insert(renderStr, args.index)
    } else if (args.tag) {
      this.__el = this.createElement(args.tag, args.name)
      this.__parent.appendChild(this.__el)
    }
    const attr = this.config.attr || {}
    const style = this.config.style || {}

    this.setAttr(attr)
    this.setStyle(style)
    this.__registeChildren()
  }

  __registeChildren () {
    const children = this.children()
    if (Object.keys(children).length > 0) {
      for (const item of Object.keys(children)) {
        const name = item
        const c = this._registerPlugin(name, children[item])
        this._children.push(c)
      }
    }
  }

  insert (html, index) {
    const len = this.__parent.children.length
    const insertIdx = parseInt(index)
    if (typeof index === 'undefined' || len <= insertIdx) {
      this.__parent.insertAdjacentHTML('beforeend', html)
      return this.__parent.children[this.__parent.children.length - 1]
    } else if (insertIdx === 0) {
      this.__parent.insertAdjacentHTML('afterbegin', html)
      return this.__parent.children[0]
    }
    const el = this.__parent.children[insertIdx]
    if (el && el.insertAdjacentHTML) {
      el.insertAdjacentHTML('beforebegin', html)
      return this.__parent.children[insertIdx]
    }
  }

  children () {
    return {}
  }

  _registerPlugin (name, item, options) {
    const opts = (typeof options === 'object' ? options : {})
    opts.root = this.el
    return pluginsManager.register(this.player, item, opts)
  }

  getPlugin (name) {
    return pluginsManager.findPlugin(this.player, name)
  }

  _createElement (tag, name) {
    this.el = document.createElement(tag)
    this.el.name = name
  }

  find (qs) {
    return this.el.querySelector(qs)
  }

  bind (querySelector, eventType, callback) {
    // if no querySelector passed to the method
    if (arguments.length < 3 && typeof eventType === 'function') {
      this.bindEL(querySelector, eventType)
    } else if (arguments.length === 3 && typeof callback === 'function') {
      delegate.bind(this.el, querySelector, eventType, callback)
    }
  }

  unbind (querySelector, eventType, callback) {
    // if no querySelector passed to the method
    if (arguments.length < 3 && typeof eventType === 'function') {
      this.unbindEL(querySelector, eventType)
    } else if (typeof callback === 'function') {
      delegate.ubind(this.el, eventType, callback, false)
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
    if (checkIsFunction(this.destroy)) {
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
