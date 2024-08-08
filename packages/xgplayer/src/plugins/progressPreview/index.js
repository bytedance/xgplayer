import Plugin, { Util, Sniffer, Events } from '../../plugin'
import initDotsAPI, { getOffSetISpot } from './dotsApi'
import './index.scss'
/**
 * @typedef {{
 *   miniWidth?: number, // 故事点显示最小宽度
 *   ispots?: Array<{ //故事点列表
 *     time?: number, // 进度条在此时间戳打点 单位为s
 *     text?: string, // 打点处的自定义文案
 *     id?: number | string, // 标记唯一标识，用于删除的时候索引
 *     duration:? number, // 进度条标识点的时长 默认1s【可选】单位为s
 *     color?: string, // 进度条标识点的显示颜色【可选】
 *     style?: { [propName: string]: any }, // 指定样式
 *     width?: number,
 *     height?: number
 *    }>,
 *   defaultText?: '', // 故事点hover默认文案
 *   isFocusDots?: true, //
 *   isShowThumbnail?: true, // 是否显示预览图
 *   isShowCoverPreview?: false, // 进度条拖动时是否显示播放区域预览图
 *   mode?: 'short' | 'production', // short // production
 *   [propName: string]: any
 * }} IProgressPreviewConfig
 */

const CALLBACK_MAP = {
  dragmove: 'onProgressMove',
  dragstart: 'onProgressDragStart',
  dragend: 'onProgressDragEnd',
  click: 'onProgressClick',
  mouseover: 'onProgressMouseOver',
  mouseenter: 'onProgressMouseOver'
}

/** */
export default class ProgressPreview extends Plugin {
  constructor (args) {
    super(args)
    this._ispots = []
    this.videoPreview = null
    this.videothumbnail = null
    this.thumbnail = null
    this.timeStr = ''
    this._state = {
      now: 0,
      f: false
    }
  }

  static get pluginName () {
    return 'progresspreview'
  }

  /**
   * @type IProgressPreviewConfig
   */
  static get defaultConfig () {
    return {
      index: 1,
      miniWidth: 6, // 故事点显示最小宽度
      ispots: [], // 故事点列表
      defaultText: '', // 故事点hover默认文案
      isFocusDots: true, //
      isHideThumbnailHover: true, // 是否在hover在预览图的时候隐藏
      isShowThumbnail: true, // 是否显示预览图
      isShowCoverPreview: false, // 进度条拖动时是否显示播放区域预览图
      mode: '', // short // production
      disable: false,
      width: 160, // 显示宽度
      height: 90 // 显示高度
    }
  }

  beforeCreate (args) {
    const progress = args.player.plugins.progress
    if (progress) {
      args.root = progress.root
    }
  }

  afterCreate () {
    this._curDot = null
    this.handlerSpotClick = this.hook('spotClick', (_event, data) => {
      if (data.seekTime) {
        this.player.seek(data.seekTime)
      }
    })
    this.transformTimeHook = this.hook('transformTime', (time) => {
      this.setTimeContent(Util.format(time))
    })
    initDotsAPI(this)

    this.on(Events.DURATION_CHANGE, () => {
      this.show()
    })

    if (this.config.disable) {
      this.disable()
    }
    // 用于进度条预览的扩展
    this.extTextRoot = this.find('.xg-spot-ext-text')
  }

  setConfig (config) {
    if (!config) {
      return
    }
    Object.keys(config).map(key => {
      this.config[key] = config[key]
    })
  }

  onPluginsReady () {
    const { player } = this
    if (!player.plugins.progress) {
      return
    }
    this.previewLine = this.find('.xg-spot-line')
    this.timePoint = this.find('.xgplayer-progress-point')
    this.timeText = this.find('.xg-spot-time')
    this.tipText = this.find('.spot-inner-text')

    this._hasThumnail = false

    this.registerThumbnail()

    this.bindEvents()
  }

  bindEvents () {
    const { progress } = this.player.plugins
    if (!progress) {
      return
    }
    Object.keys(CALLBACK_MAP).map(key => {
      this[CALLBACK_MAP[key]] = this[CALLBACK_MAP[key]].bind(this)
      progress.addCallBack(key, this[CALLBACK_MAP[key]])
    })

    if (Sniffer.device === 'mobile') return

    this.bind('.xg-spot-info', 'mousemove', this.onMousemove)

    this.bind('.xg-spot-info', 'mousedown', this.onMousedown)

    this.bind('.xg-spot-info', 'mouseup', this.onMouseup)

    const fun = this.hook('previewClick', (...args) => {
      // console.log('args', args)
    })

    this.handlerPreviewClick = (e) => {
      e.stopPropagation()
      fun(parseInt(this._state.now * 1000, 10) / 1000, e)
    }

    this.bind('.xg-spot-content', 'mouseup', this.handlerPreviewClick)
  }

  onMousemove = (e) => {
    if (this.config.disable) {
      return
    }
    if (Util.hasClass(e.target, 'xg-spot-content') && this.config.isHideThumbnailHover) {
      this.player.plugins.progress.onMouseLeave(e)
      return
    }
    if (this._state.f || Util.hasClass(e.target, 'xg-spot-content')) {
      Util.event(e)
      e.stopPropagation()
    }
  }

  onMousedown = (e) => {
    if (this.config.disable) {
      return
    }
    if (this._state.f || Util.hasClass(e.target, 'xg-spot-content')) {
      Util.event(e)
      e.stopPropagation()
    }
  }

  onMouseup = (e) => {
    if (!this.isDrag) {
      return
    }
    const { progress } = this.player.plugins
    if (progress && progress.pos) {
      progress.onMouseUp(e)
      !progress.pos.isEnter && progress.onMouseLeave(e)
    }
  }

  onDotMouseLeave = (e) => {
    if (this.config.disable) {
      return
    }
    this._curDot.removeEventListener('mouseleave', this.onDotMouseLeave)
    this.blurDot(e.target)
    this._curDot = null
    const { progress } = this.player.plugins
    progress && progress.enableBlur()
    this.show()
  }

  onProgressMouseOver = (data, e) => {
    if (this.config.disable) {
      return
    }
    if (Util.hasClass(e.target, 'xgplayer-spot') && !this._curDot) {
      this._curDot = e.target
      this.focusDot(e.target)
      if (this._curDot.children.length > 0) {
        this.hide()
      }
      const { progress } = this.player.plugins
      progress && progress.disableBlur()
      this._curDot.addEventListener('mouseleave', this.onDotMouseLeave)
    }
  }

  onProgressMove (data, e) {
    if (this.config.disable || !this.player.duration) {
      return
    }
    this.updatePosition(data.offset, data.width, data.currentTime, data.e)
  }

  onProgressDragStart (data) {
    if (this.config.disable || !this.player.duration) {
      return
    }
    this.isDrag = true
    this.videoPreview && Util.addClass(this.videoPreview, 'show')
  }

  onProgressDragEnd (data) {
    if (this.config.disable || !this.player.duration) {
      return
    }
    this.isDrag = false
    this.videoPreview && Util.removeClass(this.videoPreview, 'show')
  }

  onProgressClick (data, e) {
    if (this.config.disable) {
      return
    }
    if (Util.hasClass(e.target, 'xgplayer-spot')) {
      e.stopPropagation()
      e.preventDefault();
      ['time', 'id', 'text'].map(key => {
        data[key] = e.target.getAttribute(`data-${key}`)
      })
      data.time && (data.time = Number(data.time))
      this.handlerSpotClick(e, data)
    }
  }

  updateLinePos (offset, cwidth) {
    const { root, previewLine, player, config } = this
    const { mode } = player.controls
    const isflex = mode === 'flex'
    let lwidth = root.getBoundingClientRect().width
    // 如果当前预览图宽度获取不到，无法计算位移，不做渲染
    if (!lwidth && this._hasThumnail) {
      return
    }
    lwidth = this._hasThumnail && lwidth < config.width ? config.width : lwidth
    let x = offset - lwidth / 2
    let _t
    if (x < 0 && !isflex) {
      x = 0
      _t = offset - lwidth / 2
    } else if (x > cwidth - lwidth && !isflex) {
      _t = x - (cwidth - lwidth)
      x = cwidth - lwidth
    } else {
      _t = 0
    }
    _t !== undefined && (previewLine.style.transform = `translateX(${_t.toFixed(2)}px)`)
    root.style.transform = `translateX(${x.toFixed(2)}px) translateZ(0)`
  }

  updateTimeText (timeStr) {
    const { timeText, timePoint } = this
    timeText.innerHTML = timeStr
    !this.thumbnail && (timePoint.innerHTML = timeStr)
  }

  updatePosition (offset, cwidth, time, e) {
    const { root, config, _state } = this
    if (!root) {
      return
    }

    // let now = offset / cwidth * player.duration
    // now = now < 0 ? 0 : (now > player.duration ? player.duration : now)
    _state.now = time
    this.transformTimeHook(time)
    const timeStr = this.timeStr
    if (e && e.target && Util.hasClass(e.target, 'xgplayer-spot')) {
      this.showTips(e.target.getAttribute('data-text'), false, timeStr)
      this.focusDot(e.target)
      _state.f = true
      config.isFocusDots && _state.f && (_state.now = parseInt(e.target.getAttribute('data-time'), 10))
    } else if (config.defaultText) {
      _state.f = false
      this.showTips(config.defaultText, true, timeStr)
    } else {
      _state.f = false
      this.hideTips('')
      // this.blurDot()
    }
    this.updateTimeText(timeStr)
    this.updateThumbnails(_state.now)
    this.updateLinePos(offset, cwidth)
  }

  /**
   * @description 设置自定义时间显示字符串
   * @param {string} str
   */
  setTimeContent (str) {
    this.timeStr = str
  }

  updateThumbnails (time) {
    const { player, videoPreview, config } = this
    const { thumbnail } = player.plugins
    if (thumbnail && thumbnail.usable) {
      this.thumbnail && thumbnail.update(this.thumbnail, time, config.width, config.height)
      const rect = videoPreview && videoPreview.getBoundingClientRect()
      this.videothumbnail && thumbnail.update(this.videothumbnail, time, rect.width, rect.height)
    }
  }

  registerThumbnail (thumbnailConfig = {}) {
    if (Sniffer.device === 'mobile') {
      return
    }
    const { player, config } = this
    const thumbnail = player.getPlugin('thumbnail')
    if (thumbnail) {
      thumbnail.setConfig(thumbnailConfig)
    }
    if (!thumbnail || !thumbnail.usable || !config.isShowThumbnail) {
      Util.addClass(this.root, 'short-line no-thumbnail')
      return
    } else {
      Util.removeClass(this.root, 'short-line no-thumbnail')
    }
    if (config.mode === 'short') {
      Util.addClass(this.root, 'short-line')
    }
    this._hasThumnail = true
    const tRoot = this.find('.xg-spot-thumbnail')
    this.thumbnail = thumbnail.createThumbnail(tRoot, 'progress-thumbnail')
    if (config.isShowCoverPreview) {
      this.videoPreview = Util.createDom('xg-video-preview', '', {}, 'xgvideo-preview')
      player.root.appendChild(this.videoPreview)
      this.videothumbnail = thumbnail.createThumbnail(this.videoPreview, 'xgvideo-thumbnail')
    }
    this.updateThumbnails(0)
  }

  calcuPosition (time, dur) {
    const { progress } = this.player.plugins
    const { player } = this
    const duration = player.offsetDuration
    const totalWidth = progress.root.getBoundingClientRect().width
    const widthPerSeconds = duration / totalWidth * 6
    const ret = {}
    if (time + dur > duration) {
      dur = duration - time
    }
    ret.left = time / duration * 100
    ret.width = dur / duration
    ret.isMini = widthPerSeconds > dur
    return {
      left: time / duration * 100,
      width: dur / duration * 100,
      isMini: dur < widthPerSeconds
    }
  }

  showDot (id) {
    const dot = this.findDot(id)
    if (dot) {
      const rect = this.root.getBoundingClientRect()
      const { width } = rect
      const offset = dot.time / this.player.duration * width
      this.updatePosition(offset, width, dot.time)
    }
  }

  focusDot (target, id) {
    if (!target) {
      return
    }
    if (!id) {
      id = target.getAttribute('data-id')
    }
    Util.addClass(target, 'active')
    this._activeDotId = id
  }

  blurDot (target) {
    if (!target) {
      const id = this._activeDotId
      target = this.getDotDom(id)
    }
    if (!target) {
      return
    }
    Util.removeClass(target, 'active')
    this._activeDotId = null
  }

  showTips (text, isDefault, timeStr = '') {
    Util.addClass(this.root, 'no-timepoint')
    if (!text) {
      return
    }
    Util.addClass(this.find('.xg-spot-content'), 'show-text')
    if (isDefault && this.config.mode === 'production') {
      Util.addClass(this.root, 'product')
      this.tipText.textContent = text
    } else {
      Util.removeClass(this.root, 'product')
      this.tipText.textContent = this._hasThumnail ? text : `${timeStr} ${text}`
    }
  }

  hideTips () {
    Util.removeClass(this.root, 'no-timepoint')
    this.tipText.textContent = ''
    Util.removeClass(this.find('.xg-spot-content'), 'show-text')
    Util.removeClass(this.root, 'product')
  }

  hide () {
    Util.addClass(this.root, 'hide')
  }

  /**
   * @param {string} [value]
   * @returns
   */
  show (value) {
    Util.removeClass(this.root, 'hide')
  }

  enable () {
    const { config, playerConfig } = this
    this.config.disable = false
    this.show()
    if (!this.thumbnail && config.isShowThumbnail) {
      this.registerThumbnail(playerConfig.thumbnail || {})
    }
  }

  disable () {
    this.config.disable = true
    this.hide()
  }

  destroy () {
    const { progress } = this.player.plugins
    progress && Object.keys(CALLBACK_MAP).map(key => {
      progress.removeCallBack(key, this[CALLBACK_MAP[key]])
    })
    this.videothumbnail = null
    this.thumbnail = null
    this.videoPreview && this.player.root.removeChild(this.videoPreview)
    this.unbind('.xg-spot-info', 'mousemove', this.onMousemove)
    this.unbind('.xg-spot-info', 'mousedown', this.onMousedown)
    this.unbind('.xg-spot-info', 'mouseup', this.onMouseup)
    this.unbind('.xg-spot-content', 'mouseup', this.handlerPreviewClick)
  }

  render () {
    if (Sniffer.device === 'mobile' || this.playerConfig.isMobileSimulateMode === 'mobile') {
      return ''
    }

    return `<div class="xg-spot-info hide ${this.config.mode === 'short' ? 'short-line' : ''}">
      <div class="xg-spot-content">
        <div class="xg-spot-thumbnail">
          <span class="xg-spot-time"></span>
        </div>
        <div class="xg-spot-text"><span class="spot-inner-text"></span></div>
      </div>
      <div class="xgplayer-progress-point">00:00</div>
      <div class="xg-spot-ext-text"></div>
      <div class="xg-spot-line"></div>
    </div>`
  }
}

export {
  getOffSetISpot
}