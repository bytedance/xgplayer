
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
      position: POSITIONS.CONTROLS_RIGTH,
      index: 100,
      list: [],
      listType: 'middle', // 模式 rightSide-右侧边栏  middle-中间显示
      listStyle: {},
      hidePortrait: true
    }
  }

  constructor (args) {
    super(args)
    this.isActive = false
    this.curValue = null // 当前值
    this.curIndex = 0
  }

  set lang (value) {
    super.lang = value
    this.renderItemList(this.config.list, this.curIndex)
  }

  afterCreate () {
    const {config} = this
    if (IS_MOBILE && config.listType !== 'middle') {
      config.listType = 'rightSide'
    }

    config.hidePortrait && Util.addClass(this.root, 'portrait')

    this.once(Events.CANPLAY, () => {
      if (config.list && config.list.length > 0) {
        this.renderItemList(config.list)
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

  getTextByLang (item, key, lang) {
    if (item === undefined) {
      return ''
    }
    const {list} = this.config
    !lang && (lang = this.player.lang)
    key = (!key || Util.isUndefined(item[key])) ? 'text' : key
    typeof item === 'number' && (item = list[item])
    try {
      if (typeof item[key] === 'object') {
        return item[key][lang] || item[key]['zh']
      } else {
        return item[key]
      }
    } catch (err) {
      console.warn(err)
      return ''
    }
  }

  onEnter (e) {
    e.preventDefault()
    e.stopPropagation()
    this.onToggle(true)
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
  onItemClick (e, data) {
    e.preventDefault()
    e.stopPropagation()
    const {listType, list} = this.config;
    (IS_MOBILE || listType === 'rightSide') && this.onToggle(false)
    this.curIndex = data.to.index
    this.curItem = list[this.curIndex]
    this.changeCurrentText()
  }

  changeCurrentText () {
    const {list} = this.config
    let index = this.curIndex < list.length ? this.curIndex : 0
    const curItem = list[index]
    if (!curItem) return
    this.find('.icon-text').innerHTML = this.getTextByLang(curItem, 'iconText')
  }

  renderItemList (itemList, curIndex) {
    const {config, optionsPlugin, player} = this
    if (typeof curIndex === 'number') {
      this.curIndex = curIndex
      this.curItem = config.list[curIndex]
    }

    if (optionsPlugin) {
      optionsPlugin.renderItemList(itemList)
      this.changeCurrentText()
      return
    }

    const options = {
      config: {
        data: itemList || [],
        className: config.listType === 'rightSide' ? 'right-side' : '',
        onItemClick: (e, data) => {
          this.onItemClick(e, data)
        }
      },
      root: config.listType === 'rightSide' ? player.root : this.root
    }

    this.optionsPlugin = new OptionList(options)
    this.changeCurrentText()
    this.show()
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
