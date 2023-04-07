
import Plugin, { Events, Util, Sniffer, POSITIONS } from '../../plugin'
import OptionList from './optionList'
import './optionsIcon.scss'

const LIST_TYPES = {
  RIGHT_SIDE:'rightSide',
  MIDDLE: 'middle'
}

/**
 * @typedef {{
 *   isShow?: boolean,
 *   index?: number,
 *   list?: Array<any>,
 *   listType?: string,
 *   hidePortrait?: boolean,
 *   [propName: string]: any
 * }} IOptionsIconConfig
 */

const IS_MOBILE = Sniffer.device === 'mobile'

export default class OptionsIcon extends Plugin {
  static get pluginName () {
    return 'optionsIcon'
  }

  /**
   * @type { IOptionsIconConfig }
   */
  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGHT,
      index: 100,
      list: [],
      listType: 'middle', // 模式 rightSide-右侧边栏  middle-中间显示
      listStyle: {},
      hidePortrait: true,
      isShowIcon: false,
      isItemClickHide: true // 列表点击之后是否隐藏列表
    }
  }

  constructor (args) {
    super(args)
    this.isIcons = false
    this.isActive = false
    this.curValue = null // 当前值
    this.curIndex = 0
  }

  updateLang (value) {
    this.renderItemList(this.config.list, this.curIndex)
  }

  afterCreate () {
    const { config } = this
    this.initIcons()
    if (IS_MOBILE && config.listType !== LIST_TYPES.MIDDLE) {
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
      this.optionsList && this.optionsList.hide()
      this.isActive = false
    })
    this.activeEvent = IS_MOBILE ? 'touchend' : 'mouseenter'
    this.bind(this.activeEvent, this.onEnter)
    this.bind('mouseleave', this.onLeave)
    this.isIcons && this.bind('click', this.onIconClick)
  }

  initIcons () {
    const { icons } = this
    const _c = Object.keys(icons)
    let _isIcons = false
    if (_c.length > 0) {
      _c.forEach(key => {
        this.appendChild('.xgplayer-icon', icons[key])
        !_isIcons && (_isIcons = icons[key])
      })
      this.isIcons = _isIcons
    }
    if (_isIcons) {
      return
    }
    this.appendChild('.xgplayer-icon', Util.createDom('span', '', {}, 'icon-text'))
    Util.addClass(this.find('.xgplayer-icon'), 'btn-text')
  }

  show () {
    if (!this.config.list || this.config.list.length < 2) {
      return
    }
    Util.addClass(this.root, 'show')
  }

  hide () {
    Util.removeClass(this.root, 'show')
  }

  getTextByLang (item, key, lang) {
    if (item === undefined) {
      return ''
    }
    const { list } = this.config
    !lang && (lang = this.player.lang)
    key = (!key || Util.isUndefined(item[key])) ? 'text' : key
    typeof item === 'number' && (item = list[item])
    try {
      if (typeof item[key] === 'object') {
        return item[key][lang] || item[key].zh
      } else {
        return item[key]
      }
    } catch (err) {
      console.warn(err)
      return ''
    }
  }

  onEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.emit('icon_mouseenter', {
      pluginName: this.pluginName
    })
    this.toggle(true)
  }

  onLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.emit('icon_mouseleave', {
      pluginName: this.pluginName
    })
    if (this.config.listType !== LIST_TYPES.RIGHT_SIDE) {
      this.isActive && this.toggle(false)
    }
  }

  onListEnter = (e) => {
    console.log('onListEnter')
    this.enterType = 2
  }

  onListLeave = (e) => {
    console.log('onListLeave', e.target)
    this.enterType = 0
    this.isActive && this.toggle(false)
  }

  // 状态切换
  toggle (isActive) {
    if (isActive === this.isActive) return
    const { controls } = this.player
    const { listType } = this.config
    if (isActive) {
      listType === 'rightSide' ? controls.blur() : controls.focus()
      this.optionsList && this.optionsList.show()
    } else {
      listType === 'rightSide' ? controls.focus() : controls.focusAwhile()
      this.optionsList && this.optionsList.hide()
    }
    this.isActive = isActive
  }

  // 列表点击回调
  onItemClick (e, data) {
    e.preventDefault()
    e.stopPropagation()
    const { listType, list } = this.config
    this.curIndex = data.to.index
    this.curItem = list[this.curIndex]
    this.changeCurrentText()
    const { isItemClickHide } = this.config
    (isItemClickHide || IS_MOBILE || listType === LIST_TYPES.RIGHT_SIDE) && this.toggle(false)
  }

  onIconClick (e) {
    //
  }

  changeCurrentText () {
    if (this.isIcons) {
      return
    }
    const { list } = this.config
    const index = this.curIndex < list.length ? this.curIndex : 0
    const curItem = list[index]
    if (!curItem) return
    this.find('.icon-text').innerHTML = this.getTextByLang(curItem, 'iconText')
  }

  renderItemList (itemList, curIndex) {
    const { config, optionsList, player } = this
    if (typeof curIndex === 'number') {
      this.curIndex = curIndex
      this.curItem = config.list[curIndex]
    }

    if (optionsList) {
      optionsList.renderItemList(itemList)
      this.changeCurrentText()
      return
    }

    const options = {
      config: {
        data: itemList || [],
        className: config.listType === LIST_TYPES.RIGHT_SIDE ? 'right-side' : '',
        onItemClick: (e, data) => {
          this.onItemClick(e, data)
        }
      },
      root: config.listType === LIST_TYPES.RIGHT_SIDE ? player.root : this.root
    }

    if (this.config.isShowIcon) {
      this.optionsList = new OptionList(options)
      // this.optionsList.root.addEventListener('mouseenter', this.onListEnter)
      // this.optionsList.root.addEventListener('mouseleave', this.onListLeave)
      this.changeCurrentText()
      this.show()
    }
  }

  destroy () {
    this.unbind(this.activeEvent, this.onEnter)
    this.unbind('mouseleave', this.onLeave)
    if (this.optionsList) {
      this.optionsList.destroy()
      this.optionsList = null
    }
  }

  render () {
    if (!this.config.isShowIcon) {
      return
    }
    return `<xg-icon class="xg-options-icon ${this.config.className || ''}">
    <div class="xgplayer-icon">
    </div>
   </xg-icon>`
  }
}
