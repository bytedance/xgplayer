
import Plugin from '../../plugin'
import SideList from './sideList'
const {Events, Util, Sniffer, POSITIONS} = Plugin

export default class SideListIcon extends Plugin {
  static get pluginName () {
    return 'sideListicon'
  }

  static get defaultConfig () {
    return {
      pluginName: '',
      position: POSITIONS.CONTROLS_RIGTH,
      index: 4,
      list: []
    }
  }

  constructor (args) {
    super(args)
    this.isActive = false
    this.curValue = null
  }

  afterCreate () {
    this.once(Events.CANPLAY, () => {
      if (this.config.list && this.config.list.length > 0) {
        this.renderItemList()
        this.show()
      }
    })
    const isMobile = Sniffer.device === 'mobile'
    // 移动端控制栏和列表互斥
    isMobile && this.on(Events.PLAYER_FOCUS, () => {
      if (!this.isActive) {
        return
      }
      this.sideList && this.sideList.hide()
      this.isActive = false
    })
    if (isMobile) {
      this.activeEvent = 'touchend'
    } else {
      this.activeEvent = 'mouseenter'
    }
    this.onEnter = this.onEnter.bind(this)
    this.onLeave = this.onLeave.bind(this)
    this.bind(this.activeEvent, this.onEnter)
    this.bind('mouseleave', this.onLeave)
  }

  show () {
    if (!this.config.list || this.config.list.length === 0) {
      return;
    }
    Util.addClass(this.root, 'show')
  }

  onEnter (e) {
    e.preventDefault()
    e.stopPropagation()
    this.onToggle(true)
  }

  onLeave (e) {
    e.preventDefault()
    e.stopPropagation()
    this.onToggle(false)
  }

  onToggle (isActive) {
    if (isActive === this.isActive) return
    const {controls} = this.player
    if (isActive) {
      Sniffer.device === 'mobile' ? controls.blur() : controls.focus()
      // Util.removeClass(ulDom, 'active')
      this.sideList && this.sideList.show()
    } else {
      Sniffer.device === 'mobile' ? controls.focus() : controls.unFocus()
      // Util.addClass(ulDom, 'active')
      this.sideList && this.sideList.hide()
    }
    this.isActive = isActive
  }

  onItemClick (e) {
    Sniffer.device === 'mobile' && this.onToggle(false)
  }

  changeCurrent (val, text) {
    if (!val) return
    this.find('.icon-text').innerHTML = text || val
    this.curValue = val
  }

  destroy () {
    this.unbind(this.activeEvent, this.onToggle)
    this.unbind('mouseleave', this.onToggle)
    this.sideList && this.sideList.destroy()
  }

  renderItemList (list, currentText) {
    if (this.sideList) {
      this.sideList.renderItemList(list)
      this.find('.icon-text').innerHTML = currentText
      return
    }
    const isMobile = Sniffer.device === 'mobile'
    const options = {
      config: {
        data: list,
        className: isMobile ? 'mobile' : '',
        onItemClick: (e, data) => {
          this.onItemClick(e, data)
        }
      },
      root: isMobile ? this.player.root : this.root
    }
    this.find('.icon-text').innerHTML = currentText
    this.show()
    const listPluginName = `${this.config.pluginName}_sidelist`
    this.sideList = this.registerPlugin(SideList, options, listPluginName)
  }

  render () {
    return `<xg-icon class="xgplayer-sidelisticon ${this.config.className || ''}">
    <div class="xgplayer-icon btn-text">
    <span class="icon-text"></span>
    </div>
   </xg-icon>`
  }
}
