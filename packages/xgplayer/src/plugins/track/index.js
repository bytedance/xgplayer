import SubTitles from 'xgplayer-subtitles'
import BasePlugin, { Util, Events } from '../../plugin'
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
 *   renderMode?: 'normal'
 *   debugger?: boolean
 *   [propName: string]: any
 * }} ITextTrackConfig
 */

function formatList (list) {
  let defaultIndex = -1
  list.forEach((item, index) => {
    if (!item.id && !item.language) {
      item.id = index
    }
    // 如果是数字类型，转成字符串
    item.id = String(item.id)
    !item.url && (item.url = item.src)
    !item.text && (item.text = item.label)
    !item.language && (item.language = item.srclang)
    item.isDefault === undefined && (item.isDefault = item.default || false)
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

function checkIsSame (src, dist) {
  const isIdS = Util.isNotNull(src.id) && Util.isNotNull(dist.id) && src.id === dist.id
  const isLS = Util.isNotNull(src.language) && Util.isNotNull(dist.language) && src.language === dist.language
  return isIdS || isLS
}

export default class TextTrackParse extends BasePlugin{
  static get pluginName () {
    return 'texttrack'
  }

  /**
   * @type ITextTrackConfig
   */
  static get defaultConfig () {
    return {
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
      renderMode: 'normal', // 外挂字幕渲染方式
      mode: 'external', // external - 外挂字幕 native - 原生字幕
      debugger: false // 是否开启外挂字幕log
    }
  }

  afterCreate () {
    this._initExtSubTitle()
    this._updateCallback = null
  }

  /**
   * 初始化外挂字幕
   * @param {number} defaultIndex
   */
  _initExtSubTitle (defaultIndex) {
    const { list, style, isDefaultOpen, updateMode, renderMode } = this.config
    // 默认开启，但是没有指定开启项的时候, 默认启用第一个字幕
    if (isDefaultOpen && defaultIndex < 0 && list.length > 0) {
      defaultIndex = 0
      list[0].isDefault = true
    }
    const config = {
      subTitles: list,
      defaultOpen: isDefaultOpen,
      updateMode,
      renderMode,
      debugger: this.config.debugger,
      domRender: false,
    }
    Object.keys(style).map(key => {
      config[key] = style[key]
    })
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

    this.subTitles.on('update', this._onUpdate)

    this.subTitles.on('reset', this._onListReset)

    if (style.follow && this.subTitles.root) {
      Util.addClass(this.subTitles.root, 'follow-control')
    }
  }

  /**
   * @param {string} [value]
   * @returns
   */
  show (value) {
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

  _onUpdate = (text) => {
    if (!text || text.length < 1) {
      return
    }
    const retText = text.map(item => {
      return {
        startTime: item.start,
        endTime: item.end,
        text: item.text.length > 0 ? item.text[0] : '',
        textTag: item.textTag
      }
    })
    if (this._updateCallback) {
      this._updateCallback(retText[0])
    }
    this.emit('subtitle_update', retText[0])
  }

  _onListReset = (data) => {
    this.updateList(data)
  }

  getSubTitleIndex (list, subtitle = { id: '', language: '' }) {
    let cIndex = -1
    if (!subtitle || (!subtitle.id && !subtitle.language)) {
      return cIndex
    }
    list.forEach((item, index) => {
      if (checkIsSame(item, subtitle)) {
        cIndex = index
      }
    })
    return cIndex
  }

  // 更新字幕信息
  /**
   *
   * @param { string | Array<SubTitleItem> } list
   * @param {} updateCallback 字幕更新的回调
   * @param { boolean } [needRemove] 是否移除原来的字幕
   */
  updateSubtitles (list = [], updateCallback, needRemove = true) {
    if (!list) {
      return
    }
    if (Util.typeOf(list) === 'String') {
      list = [{
        id: parseInt(Math.random() * 100),
        isDefault: true,
        url: list
      }]
    }
    if (updateCallback) {
      this._updateCallback = updateCallback
    }
    this.updateList({list})
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
    if (nList.length === 0) {
      this.switchOffSubtitle()
    }
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
  }

  switchOnSubtitle () {
    const { list } = this.config
    const _sub = this.lastIndex > -1 ? this.lastIndex : 0
    const _item = list[_sub]
    this.switchIconState(true)
    this.switchSubTitle(_item)
  }

  destroy () {
    if (this.subTitles) {
      this.subTitles.destroy()
      this.subTitles = null
    }
    super.destroy()
  }
}
