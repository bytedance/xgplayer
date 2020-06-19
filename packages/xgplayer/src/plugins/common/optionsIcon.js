
import Plugin from '../../plugin'
import OptionList from './optionList'
const {Events, Util, Sniffer, POSITIONS} = Plugin
const IS_MOBILE = Sniffer.device === 'mobile'
export default class OptionsIcon extends Plugin {
  static get pluginName () {
    return 'optionsIcon'
  }

  static get defaultConfig () {
    return {
      pluginName: '',
      position: POSITIONS.CONTROLS_RIGTH,
      index: 100,
      list: [],
      listType: '' // 模式 rightSide-右侧边栏  middle-中间显示
    }
  }

  constructor (args) {
    super(args)
    this.isActive = false
    this.curValue = null // 当前值
  }

  afterCreate () {
    const {config} = this
    if (IS_MOBILE && config.listType !== 'middle') {
      config.listType = 'rightSide'
    }
    this.once(Events.CANPLAY, () => {
      if (this.config.list && this.config.list.length > 0) {
        this.renderItemList()
        this.show()
      }
    })
    // 移动端控制栏和列表互斥
    IS_MOBILE && this.on(Events.PLAYER_FOCUS, () => {
      if (!this.isActive) {
        return
      }
      this.optionsPlugin && this.optionsPlugin.hide()
      this.isActive = false
    })
    this.activeEvent = IS_MOBILE ? 'touchend' : 'mouseenter'
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
    !this.isActive && this.onToggle(true)
  }

  onLeave (e) {
    e.preventDefault()
    e.stopPropagation()
    this.isActive && this.onToggle(false)
  }

  // 状态切换
  onToggle (isActive) {
    if (isActive === this.isActive) return
    const {controls} = this.player
    const {listType} = this.config
    if (isActive) {
      listType === 'rightSide' ? controls.blur() : controls.focus()
      this.optionsPlugin && this.optionsPlugin.show()
    } else {
      listType === 'rightSide' ? controls.focus() : controls.unFocus()
      this.optionsPlugin && this.optionsPlugin.hide()
    }
    this.isActive = isActive
  }

  // 列表点击回调
  onItemClick (e) {
    e.preventDefault()
    e.stopPropagation()
    const {listType} = this.config;
    (IS_MOBILE || listType === 'rightSide') && this.onToggle(false)
  }

  changeCurrent (val, text) {
    if (!val) return
    this.find('.icon-text').innerHTML = text || val
    this.curValue = val
  }

  getCurrentIconText (lang) {
    const {curRate, config, player} = this
    if (!lang) {
      lang = player.lang
    }
    let text = ''
    config.list.map(item => {
      if (Number(item) === curRate || Number(item.rate) === curRate) {
        if (item[lang]) {
          text = item[lang]
        } else if (item.iconText) {
          text = item.iconText[lang] ? item.iconText[lang] : (typeof item.iconText === 'string' && (!lang || lang === 'zh') ? item.iconText : '')
        } else {
          text = typeof item === 'number' ? `${item}x` : `${item.rate}x`
        }
      }
    })
    return text
  }

  renderItemList (list, currentText) {
    const {listType} = this.config
    if (this.optionsPlugin) {
      this.optionsPlugin.renderItemList(list)
      this.find('.icon-text').innerHTML = currentText
      return
    }

    const options = {
      config: {
        data: list,
        className: listType === 'rightSide' ? 'right-side' : '',
        onItemClick: (e, data) => {
          this.onItemClick(e, data)
        }
      },
      root: listType === 'rightSide' ? this.player.root : this.root
    }
    this.find('.icon-text').innerHTML = currentText
    this.show()
    const listPluginName = `${this.pluginName}_optionslist`
    this.optionsPlugin = this.registerPlugin(OptionList, options, listPluginName)
  }

  destroy () {
    this.unbind(this.activeEvent, this.onToggle)
    this.unbind('mouseleave', this.onToggle)
    this.optionsPlugin && this.optionsPlugin.destroy()
  }

  render () {
    return `<xg-icon class="xg-options-icon ${this.config.className || ''}">
    <div class="xgplayer-icon btn-text">
    <span class="icon-text"></span>
    </div>
   </xg-icon>`
  }
}
