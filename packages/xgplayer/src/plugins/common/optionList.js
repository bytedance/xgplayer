import Plugin, { Util } from '../../plugin'

export default class OptionList {
  constructor (args) {
    this.config = args.config
    this.parent = args.root
    this.root = Util.createDom('ul', '', {}, `xg-options-list xg-list-slide-scroll ${this.config.className}`)
    args.root.appendChild(this.root)
    const { maxHeight } = this.config
    if (maxHeight) {
      this.setStyle({ maxHeight })
    }
    this.onItemClick = this.onItemClick.bind(this)
    this.renderItemList()
    const eventName = this.config.domEventType === 'touch' ? 'touchend' : 'click'
    this._delegates = Plugin.delegate.call(this, this.root, 'li', eventName, this.onItemClick)
  }

  renderItemList (data) {
    const { config, root } = this
    if (data) {
      config.data = data
    } else {
      data = config.data
    }

    if (config.style) {
      Object.keys(config.style).map(key => {
        root.style[key] = config[key]
      })
    }

    if (data.length > 0) {
      this.attrKeys = Object.keys(data[0])
    }

    this.root.innerHTML = ''

    data.map((item, index) => {
      const className = item.selected ? 'option-item selected' : 'option-item'
      item['data-index'] = index
      this.root.appendChild(Util.createDom('li', `<span>${item.showText}</span>`, item, className))
    })
  }

  onItemClick (e) {
    if (!e.delegateTarget) {
      e.delegateTarget = e.target
    }
    const target = e.delegateTarget
    if (target && Util.hasClass(target, 'selected')) {
      return false
    }
    const changeCallback = typeof this.config.onItemClick === 'function' ? this.config.onItemClick : null
    const curSelected = this.root.querySelector('.selected')
    Util.addClass(target, 'selected')
    curSelected && Util.removeClass(curSelected, 'selected')
    changeCallback(e, {
      from: curSelected ? this.getAttrObj(curSelected, this.attrKeys) : null,
      to: this.getAttrObj(target, this.attrKeys)
    })
  }

  getAttrObj (dom, keys) {
    if (!dom || !keys) {
      return {}
    }
    const obj = {}
    keys.map(key => {
      obj[key] = dom.getAttribute(key)
    })
    const index = dom.getAttribute('data-index')
    if (index) {
      obj.index = Number(index)
    }
    return obj
  }


  show () {
    Util.removeClass(this.root, 'hide')
    Util.addClass(this.root, 'active')
  }

  hide () {
    Util.removeClass(this.root, 'active')
    Util.addClass(this.root, 'hide')
  }

  setStyle (style) {
    Object.keys(style).forEach((key) => {
      this.root.style[key] = style[key]
    })
  }

  destroy () {
    if (this._delegates) {
      this._delegates.map(item => {
        item.destroy && item.destroy()
      })
      this._delegates = null
    }
    this.root.innerHTML = null
    this.parent.removeChild(this.root)
    this.root = null
  }
}
