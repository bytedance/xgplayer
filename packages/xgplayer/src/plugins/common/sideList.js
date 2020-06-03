import Plugin from '../../plugin'
import { Sniffer } from '../../plugin/basePlugin'

const { Util } = Plugin
export default class SideList extends Plugin {
  static get pluginName () {
    return 'definition'
  }

  static defaultConfig () {
    return {
      data: [],
      className: '',
      onItemClick: null,
      index: 7
    }
  }

  afterCreate () {
    this.attrKeys = []
    this.onItemClick = this.onItemClick.bind(this)
    const eventName = Sniffer.device === 'mobile' ? 'touchend' : 'click'
    this.bind('li', eventName, this.onItemClick)
    this.renderItemList()
  }

  getAttrObj (dom, keys) {
    if (!dom || !keys) {
      return {}
    }
    const obj = {}
    keys.map(key => {
      obj[key] = dom.getAttribute(key)
    })
    return obj
  }

  renderItemList (data) {
    if (data) {
      this.config.data = data
    } else {
      data = this.config.data
    }

    if (data.length > 0) {
      this.attrKeys = Object.keys(data[0])
    }

    data.map(item => {
      const className = item.isCurrent ? 'sideitem selected' : 'sideitem'
      const li = Util.createDom('li', `<span>${item.name || item.text}</span>`, item, className)
      this.root.appendChild(li)
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
    const curlSelected = this.find('.selected')
    Util.addClass(target, 'selected')
    curlSelected && Util.removeClass(curlSelected, 'selected')
    changeCallback(e, {
      from: this.getAttrObj(curlSelected, this.attrKeys),
      to: this.getAttrObj(target, this.attrKeys)
    })
  }

  show () {
    Util.removeClass(this.root, 'hide')
    Util.addClass(this.root, 'active')
  }

  hide () {
    Util.removeClass(this.root, 'active')
    Util.addClass(this.root, 'hide')
  }

  destroy () {
    this.unbind('li', ['touchend', 'click'], this.onItemClick)
  }

  render () {
    return `<ul class="xgplayer-side-list ${this.config.className}">
    </ul>`
  }
}
