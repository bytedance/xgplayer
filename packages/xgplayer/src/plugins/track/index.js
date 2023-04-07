import SubTitles from 'xgplayer-subtitles'
import { Util, POSITIONS, Events } from '../../plugin'
import OptionsIcon from '../common/optionsIcon'
import NativeSubTitle from './nativeSubTitle'
import './index.scss'

/**
 * @typedef {{
 *   start: number,
 *   end: number,
 *   list: Array<{
 *     start: number,
 *     end: number,
 *     text: string[],
 *     index?: number,
 *     [propName: string]: any
 *   }>
 * }} ListItem
 */

/**
 * @typedef {{
 *      language?: string | number,
 *      id?: number | string,
 *      isDefault?: boolean,
 *      text?: any,
 *      url?: string,
 *      stringContent?: string,
 *      list?: Array<{
 *         start: number,
 *         end: number,
 *         list: Array<ListItem>,
 *         [propName: string]: any
 *      }>
 *    }} SubTitleItem
 */
/**
 * @typedef {{
 *   position?: string,
 *   index?: number,
 *   list?: Array<SubTitleItem>,
 *   isDefaultOpen?: boolean,
 *   style?: {
 *      follow:? boolean,
 *      mode?: 'stroke' | 'bg',
 *      followBottom?: number,
 *      fitVideo?: boolean,
 *      offsetBottom?: number,
 *      baseSizeX?: number,
 *      baseSizeY?: number,
 *      minSize?: number,
 *      minMobileSize?: number,
 *      line?: 'double' | 'single' | 'three',
 *      fontColor?: string
 *   },
 *   closeText?: { text: string, iconText: string },
 *   className?: string,
 *   hidePortrait?: boolean,
 *   isShowIcon?: boolean,
 *   updateMode?: 'live' | 'vod',
 *   debugger?: boolean
 *   [propName: string]: any
 * }} ITextTrackConfig
 */

const DEFAULT_TYPE = {
  CLOSE: 'close',
  OPEN: 'open',
  TEXT_CLOSE: 'text-close'
}

function formatList (list) {
  let defaultIndex = -1
  list.forEach((item, index) => {
    if (!item.id && !item.language) {
      item.id = index
    }
    !item.url && (item.url = item.src)
    !item.text && (item.text = item.label)
    !item.language && (item.language = item.srclang)
    item.isDefault === undefined && (item.isDefault = item.default)
    if (item.isDefault || item.default) {
      if (defaultIndex < 0) {
        defaultIndex = index
      } else {
        item.isDefault = item.default = false
      }
    }
  })
  return defaultIndex
}

export default class TextTrack extends OptionsIcon {
  static get pluginName () {
    return 'texttrack'
  }

  /**
   * @type ITextTrackConfig
   */
  static get defaultConfig () {
    return {
      ...OptionsIcon.defaultConfig,
      position: POSITIONS.CONTROLS_RIGHT,
      index: 6,
      list: [],
      isDefaultOpen: true,
      style: {
        follow: true, // 是否跟随控制栏调整位置
        mode: 'stroke', // 字体显示模式，默认是描边
        followBottom: 50, // 跟随底部控制栏的高度
        fitVideo: true, // 是否跟随视频自动调整字号
        offsetBottom: 2, // 字幕距离画面底部百分比，默认2%
        baseSizeX: 49, // 横屏视频适配基准字号
        baseSizeY: 28, // 竖屏视频适配基准字号
        minSize: 16, // pc端最小字号
        minMobileSize: 13, // 移动端最小字号
        line: 'double', // 最大显示行数 single/double/three
        fontColor: '#fff' // 字体颜色
      },
      closeText: { text: '不开启', iconText: '字幕' },
      needCloseText: true,
      className: 'xgplayer-texttrack',
      hidePortrait: false,
      isShowIcon: true,
      mode: 'external', // external - 外挂字幕 native - 原生字幕
      debugger: false // 是否开启外挂字幕log
    }
  }

  beforeCreate (args) {
    const texttrack = args.player.config.texttrack || args.player.config.textTrack
    if (Util.typeOf(texttrack) === 'Array') {
      args.config.list = texttrack
    }
  }

  afterCreate () {
    const { list, mode } = this.config
    const defaultIndex = formatList(list)
    super.afterCreate()

    this.curIndex = -1
    this.lastIndex = -1 // 上一次显示的语言
    this.curItem = null
    this._nativeTracks = null // 用于存储原生字幕

    this.handlerClickSwitch = this.hook('subtitle_change', this.clickSwitch)
    if (mode === 'native') {
      this._initNativeSubtitle()
    } else {
      this._initExtSubTitle(defaultIndex)
    }
  }

  /**
   * @description 初始化原生字幕
   *
   */
  _initNativeSubtitle () {
    const { player } = this
    if (!player._subTitles) {
      player._subTitles = new NativeSubTitle(player.media)
    }

    this.subTitles = player._subTitles

    this.subTitles.on('off', this._onOff)

    this.subTitles.on('change', this._onChange)

    this.subTitles.on('reset', this._onListReset)
  }

  /**
   * 初始化外挂字幕
   * @param {number} defaultIndex
   */
  _initExtSubTitle (defaultIndex) {
    const { list, style, isDefaultOpen } = this.config
    const config = {
      subTitles: list,
      defaultOpen: isDefaultOpen,
      debugger: this.config.debugger
    }
    Object.keys(style).map(key => {
      config[key] = style[key]
    })
    config.updateMode = this.config.updateMode
    // 控制栏分离或者没有控制栏，不做重定位
    const _needPos = !this.playerConfig.marginControls && this.player.controls.root
    if (_needPos) {
      this.on(Events.PLAYER_FOCUS, this.onPlayerFocus)
      this.on(Events.PLAYER_BLUR, this.onPlayerBlur)
    }

    const { player } = this

    if (!player._subTitles) {
      player._subTitles = new SubTitles(config)
      player._subTitles.attachPlayer(this.player)
    } else {
      player._subTitles._isOpen && (defaultIndex = this.getSubTitleIndex(this.config.list, player._subTitles.currentText))
    }

    this.subTitles = player._subTitles

    this.subTitles.on('off', this._onOff)

    this.subTitles.on('change', this._onChange)

    this.subTitles.on('reset', this._onListReset)

    if (style.follow && this.subTitles.root) {
      Util.addClass(this.subTitles.root, 'follow-control')
    }

    this._renderList(list, isDefaultOpen, defaultIndex)
  }

  _renderList (list, isDefaultOpen, defaultIndex) {
  // 如果配置信息为默认开启，但是没有默认开启的语言，则默认第一个
    if (!list || list.length === 0) {
      return
    }

    // 默认开启, 但是没有指定
    if (isDefaultOpen) {
      defaultIndex = defaultIndex < 0 ? 0 : defaultIndex
      list[defaultIndex].isDefault = true
      this.curIndex = defaultIndex
      this.curItem = list[defaultIndex]
      this.switchIconState(true)
    } else {
      this.switchIconState(false)
    }
    if (this.player.isCanplay && list.length > 0) {
      this.renderItemList(list)
      this.show()
    }
  }

  registerIcons () {
    return {
      textTrackOpen: { icon: '', class: 'xg-texttrak-open' },
      textTrackClose: { icon: '', class: 'xg-texttrak-close' }
    }
  }

  show () {
    if (!this.config.list || this.config.list.length < 1){
      return
    }
    Util.addClass(this.root, 'show')
  }

  _onOff = () => {
    this.switchOffSubtitle()
  }

  _onChange = (data) => {
    const _curIndex = this.getSubTitleIndex(this.config.list, data)
    if (_curIndex < 0) {
      return
    }
    this.updateCurItem(_curIndex, data)
  }

  _onListReset = (data) => {
    console.log('_onListReset', data)
    this.updateList(data)
  }

  getSubTitleIndex (list, subtitle = { id: '', language: '' }) {
    let cIndex = -1
    if (!subtitle || (!subtitle.id && !subtitle.language)) {
      return cIndex
    }
    list.forEach((item, index) => {
      if (item.id === subtitle.id || item.language === subtitle.language) {
        cIndex = index
      }
    })
    return cIndex
  }

  // 更新字幕信息
  /**
   *
   * @param { Array<SubTitleItem> } list
   * @param { boolean } needRemove 是否移除原来的字幕
   */
  updateSubtitles (list = [], needRemove = true) {
    if (!list) {
      return
    }
    this.updateList()
    this.subTitles && this.subTitles.setSubTitles(this.config.list, this.curIndex > -1, needRemove)
  }

  updateList (data = {}) {
    if (!data.list) {
      return
    }
    const nList = []
    data.list.forEach(item => {
      nList.push(item)
    })

    const defaultIndex = formatList(nList)
    if (data.isOpen) {
      this.curIndex = defaultIndex
      this.curItem = defaultIndex > -1 ? nList[defaultIndex] : null
    } else {
      this.curIndex = -1
      this.curItem = null
    }
    this.config.list = nList
    if (nList.length > 0) {
      this.show()
    } else {
      this.switchOffSubtitle()
      this.hide()
    }
    this.renderItemList()
  }

  /**
   *
   * @param {{
   *   language?: string | number,
   *   id?: number | string,
   * }} subtitle
   * @returns
   */
  switchSubTitle (subtitle = { id: '', language: '' }) {
    this.switchIconState(true)
    const cIndex = this.getSubTitleIndex(this.config.list, subtitle)
    if (cIndex < 0) {
      return
    }
    this.subTitles.switch(subtitle).catch(e=>{})
  }

  /**
   * 关闭字幕
   */
  switchOffSubtitle (e) {
    this.emit('subtitle_change', {
      off: true,
      isListUpdate: false,
      list: []
    })
    this.lastIndex = this.curIndex
    this.curIndex = -1
    this.curItem = null
    this.switchIconState(false)
    this.renderItemList()
  }

  switchOnSubtitle () {
    const { list } = this.config
    const _sub = this.lastIndex > -1 ? this.lastIndex : 0
    const _item = list[_sub]
    this.switchIconState(true)
    this.switchSubTitle(_item)
  }

  /**
   * 切换按钮状态
   * @param {boolean} isopen
   */
  switchIconState (isopen) {
    this.setAttr('data-state', isopen ? 'open' : 'close')
  }

  clickSwitch = (e, data) => {
    const isActionClose = data.type === DEFAULT_TYPE.CLOSE || data.type === DEFAULT_TYPE.TEXT_CLOSE
    if (this.subTitles) {
      if (isActionClose) {
        this.subTitles.switchOff()
        // this.switchOffSubtitle()
      } else {
        this.switchSubTitle({ language: data.language, id: data.id })
      }
    }
  }

  onIconClick = (e) => {
    if (this.curItem) {
      this.subTitles.switchOff()
    } else {
      this.switchOnSubtitle(e)
    }
  }

  onItemClick (e, data) {
    const target = e.delegateTarget
    const language = target.getAttribute('language')
    let id = target.getAttribute('data-id')
    const type = target.getAttribute('data-type')
    if (id && !Number.isNaN(parseInt(id))) {
      id = parseInt(id)
    }
    super.onItemClick(...arguments)
    this.handlerClickSwitch(e, { language, id, type })
  }

  changeCurrentText () {
    if (this.isIcons) {
      return
    }
    const { list, closeText } = this.config
    const index = this.curIndex
    if (index - 1 < 0) {
      this.find('.icon-text').innerHTML = this.getTextByLang(closeText, 'iconText')
    } else if (index - 1 < list.length) {
      const curItem = list[index - 1]
      if (!curItem) return
      this.find('.icon-text').innerHTML = this.getTextByLang(curItem, 'iconText')
    }
  }

  updateCurItem (cIndex, subtitle) {
    this.curIndex = cIndex
    this.curItem = this.config.list[cIndex - 1]
    this.renderItemList()
    this.emit('subtitle_change', {
      off: false,
      isListUpdate:false,
      list: [],
      ...subtitle
    })
  }

  renderItemList () {
    const { list, closeText, needCloseText } = this.config
    const items = []
    let cIndex = this.curIndex
    const _curI = this.curIndex
    if (needCloseText) {
      items.push({
        showText: this.getTextByLang(closeText),
        'data-type': DEFAULT_TYPE.TEXT_CLOSE,
        selected: this.curIndex === -1
      })
      cIndex++
    }
    list.map((item, index) => {
      const itemInfo = {
        language: item.language || item.srclang,
        'data-id': item.id
      }
      itemInfo.selected = this.curIndex === index
      itemInfo.showText = this.getTextByLang(item)
      items.push(itemInfo)
    })
    super.renderItemList(items, cIndex)
    this.curIndex = _curI
    this.curItem = list[_curI]
  }

  onPlayerFocus = (e) => {
    if (!this.subTitles || !this.config.style.follow) {
      return
    }
    this.rePosition()
  }

  onPlayerBlur = (e) => {
    if (!this.subTitles || !this.config.style.follow || this.playerConfig.marginControls) {
      return
    }
    this.subTitles.root && (this.subTitles.root.style.transform = 'translate(0, 0)')
  }

  rePosition () {
    const { fitVideo } = this.config.style
    const _rect = this.player.controls.root.getBoundingClientRect()
    const cHeight = 0 - _rect.height
    if (!fitVideo) {
      this.subTitles.root.style.transform = `translate(0, ${cHeight}px)`
      return
    }
    const { video, root } = this.player
    const { height, width } = root.getBoundingClientRect()
    const { videoHeight, videoWidth } = video
    const pi = parseInt(videoHeight / videoWidth * 100, 10)
    let vHeight = pi * width / 100
    if (vHeight > height) {
      vHeight = height
    }
    const margin = (height - vHeight) / 2 - cHeight
    if (margin < 0) {
      this.subTitles.root.style.transform = `translate(0, ${margin}px)`
    }
  }

  destroy () {
    if (this.subTitles) {
      this.subTitles.destroy()
      this.subTitles = null
    }
    super.destroy()
  }
}
