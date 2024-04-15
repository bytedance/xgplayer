
import Plugin, { Events, Util, Sniffer, POSITIONS } from '../../plugin'
import OptionList from './optionList'
// import './optionsIcon.scss'

const LIST_TYPES = {
  SIDE: 'side',
  MIDDLE: 'middle',
  DEFAULT: 'default',
}

const TOGGLE_MODES = {
  CLICK: 'click',
  HOVER: 'hover'
}

function getListClassName (listType, position) {
  if (listType === LIST_TYPES.SIDE) {
    return position === POSITIONS.CONTROLS_LEFT ? 'xg-side-list xg-left-side' : 'xg-side-list xg-right-side'
  } else {
    return ''
  }
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

let IS_MOBILE = Sniffer.device === 'mobile'

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
      listType: 'default', // 模式 side-右侧边栏  middle-中间显示
      listStyle: {},
      hidePortrait: true,
      isShowIcon: false,
      isItemClickHide: true, // 列表点击之后是否隐藏列表
      toggleMode: TOGGLE_MODES.HOVER, // 激活状态切换模式
      heightLimit: true
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
    IS_MOBILE = IS_MOBILE || this.domEventType === 'touch'
    if (IS_MOBILE && config.listType === LIST_TYPES.DEFAULT) {
      config.listType = LIST_TYPES.SIDE
    }

    config.hidePortrait && Util.addClass(this.root, 'portrait')

    this.on([Events.VIDEO_RESIZE, Events.FULLSCREEN_CHANGE], () => {
      this._resizeList()
    })

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

    if (IS_MOBILE) {
      config.toggleMode = TOGGLE_MODES.CLICK
      this.activeEvent = 'touchend'
    } else {
      this.activeEvent = config.toggleMode === TOGGLE_MODES.CLICK ? 'click' : 'mouseenter'
    }

    if (config.toggleMode === TOGGLE_MODES.CLICK) {
      this.bind(this.activeEvent, this.switchActiveState)
    } else {
      this.bind(this.activeEvent, this.onEnter)
      this.bind('mouseleave', this.onLeave)
    }
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

  /**
   * @param {string} [value]
   * @returns
   */
  show (value) {
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
        return item[key][lang] || item[key].en
      } else {
        return item[key]
      }
    } catch (err) {
      console.warn(err)
      return ''
    }
  }

  onEnter = (e) => {
    e.stopPropagation()
    this.emit('icon_mouseenter', {
      pluginName: this.pluginName
    })
    this.switchActiveState(e)
  }

  switchActiveState = (e) => {
    e.stopPropagation()
    const { toggleMode } = this.config
    if (toggleMode === TOGGLE_MODES.CLICK) {
      this.toggle(!this.isActive)
    } else {
      this.toggle(true)
    }
  }

  onLeave = (e) => {
    e.stopPropagation()
    this.emit('icon_mouseleave', {
      pluginName: this.pluginName
    })
    if (this.config.listType !== LIST_TYPES.SIDE) {
      this.isActive && this.toggle(false)
    }
  }

  onListEnter = (e) => {
    // console.log('onListEnter')
    this.enterType = 2
  }

  onListLeave = (e) => {
    // console.log('onListLeave', e.target)
    this.enterType = 0
    this.isActive && this.toggle(false)
  }

  // 状态切换
  toggle (isActive) {
    if (isActive === this.isActive || this.config.disable) return
    const { controls } = this.player
    const { listType } = this.config
    if (isActive) {
      listType === LIST_TYPES.SIDE ? controls.blur() : controls.focus()
      this.optionsList && this.optionsList.show()
    } else {
      listType === LIST_TYPES.SIDE ? controls.focus() : controls.focusAwhile()
      this.optionsList && this.optionsList.hide()
    }
    this.isActive = isActive
  }

  // 列表点击回调
  onItemClick (e, data) {
    e.stopPropagation()
    const { listType, list } = this.config
    this.curIndex = data.to.index
    this.curItem = list[this.curIndex]
    this.changeCurrentText()
    const { isItemClickHide } = this.config;
    (isItemClickHide || IS_MOBILE || listType === LIST_TYPES.SIDE) && this.toggle(false)
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
        className: getListClassName(config.listType, config.position), // config.listType === LIST_TYPES.SIDE ? 'xg-right-side' : '',
        onItemClick: (e, data) => {
          this.onItemClick(e, data)
        },
        domEventType: IS_MOBILE ? 'touch' : 'mouse'
      },
      root: config.listType === LIST_TYPES.SIDE ? (player.innerContainer || player.root) : this.root
    }

    if (this.config.isShowIcon) {
      const { height } = this.player.root.getBoundingClientRect()
      const _maxH = config.listType === LIST_TYPES.MIDDLE ? height - 50 : height
      if (_maxH && config.heightLimit) {
        options.config.maxHeight = `${_maxH}px`
      }
      this.optionsList = new OptionList(options)
      this.changeCurrentText()
      this.show()
    }
    this._resizeList()
  }

  _resizeList () {
    if (!this.config.heightLimit) {
      return
    }
    const { height } = this.player.root.getBoundingClientRect()
    const _maxH = this.config.listType === LIST_TYPES.MIDDLE ? height - 50 : height
    this.optionsList && this.optionsList.setStyle({ maxHeight: `${_maxH}px` })
  }

  destroy () {
    const { config } = this
    if (config.toggleMode === TOGGLE_MODES.CLICK) {
      this.unbind(this.activeEvent, this.switchActiveState)
    } else {
      this.unbind(this.activeEvent, this.onEnter)
      this.unbind('mouseleave', this.onLeave)
    }
    this.isIcons && this.unbind('click', this.onIconClick)
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
