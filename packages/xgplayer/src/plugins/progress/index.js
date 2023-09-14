import Plugin, { Events, Util, POSITIONS, Sniffer } from '../../plugin'
import InnerList from './innerList'
import './index.scss'

/**
 * @typedef {{
 *   position?:string,
 *   disable?: boolean,
 *   isDragingSeek?: boolean, // 是否在拖拽的过程中更新currentTime
 *   closeMoveSeek?: boolean, // 是否关闭滑块seek能力
 *   isPauseMoving?: boolean, // 是否在move的时候暂停视频内容
 *   isCloseClickSeek?: boolean, // 是否关闭点击进度条的时候seek
 *   fragments?: Array<{percent: number}>,
 *   fragFocusClass?: string, // 进度条分段高亮类名
 *   fragAutoFocus?: boolean, // 是否hover的时候自动高亮
 *   miniMoveStep?: number,
 *   miniStartStep?: number,
 *   onMoveStart?: () => any, // 手势开始移动回调,
 *   onMoveEnd?: () => any, // 手势移动结束回调
 *   endedDiff?: number,
 *   [propName: string]: any
 * }} IProgressConfig
 */
/**
 * 进度条组件
 */

// 分段获取焦点显示的时候的两种class类型
const FRAGMENT_FOCUS_CLASS = {
  POINT: 'inner-focus-point',
  HIGHLIGHT: 'inner-focus-highlight'
}
class Progress extends Plugin {
  static get pluginName () {
    return 'progress'
  }

  /**
   * @type IProgressConfig
   */
  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_CENTER,
      index: 0,
      disable: false,
      isDragingSeek: true, // 是否在拖拽的过程中更新currentTime
      closeMoveSeek: false, // 是否关闭滑块seek能力
      isPauseMoving: false, // 是否在move的时候暂停视频内容
      isCloseClickSeek: false, // 是否关闭点击进度条的时候seek
      fragments: [{ percent: 1 }],
      fragFocusClass: FRAGMENT_FOCUS_CLASS.POINT,
      fragClass: '', // 内置进度条类名
      fragAutoFocus: false, // 是否hover的时候自动高亮
      miniMoveStep: 5,
      miniStartStep: 2,
      onMoveStart: () => {
      }, // 手势开始移动回调
      onMoveEnd: () => {}, // 手势移动结束回调
      endedDiff: 0.2
    }
  }

  static get FRAGMENT_FOCUS_CLASS () {
    return FRAGMENT_FOCUS_CLASS
  }

  constructor (args) {
    super(args)
    /**
     * @readonly
     */
    this.useable = false
    /**
     * @readonly
     */
    this.isProgressMoving = false

    /**
     * @private
     */
    this.__dragCallBacks = []
    /**
     * @private
     */
    this._state = {
      now: -1,
      direc: 0,
      time: 0,
      prePlayTime: -1
    }

    this._disableBlur = false
  }

  get offsetDuration () {
    return this.playerConfig.customDuration || this.player.offsetDuration || this.player.duration
  }

  get duration () {
    return this.playerConfig.customDuration || this.player.duration
  }

  get timeOffset () {
    return this.playerConfig.timeOffset || 0
  }

  get currentTime () {
    const { offsetCurrentTime, currentTime } = this.player
    return offsetCurrentTime >= 0 ? offsetCurrentTime : (currentTime + this.timeOffset)
  }

  changeState (useable = true) {
    this.useable = useable
  }

  show () {
    this.root && (this.root.style.display = 'flex')
  }
  /**
   * @description 创建内部进度条，并挂载到xg-outer上,
   *              并把一些对外API绑定在progress上供外部调用
   *
   */
  _initInner (fragments = [], config = {}) {
    if (!fragments || fragments.length === 0) {
      fragments = [{ percent: 1 }]
    }
    const _c = {
      fragments,
      ...config,
      actionCallback: (data) => {
        this.emitUserAction('fragment_focus', 'fragment_focus', data)
      }
    }
    if (!this.innerList) {
      this.innerList = new InnerList(_c)
      this.outer.insertBefore(this.innerList.render(), this.outer.children[0]);
      ['findHightLight', 'unHightLight', 'setHightLight', 'findFragment'].map(item => {
        this[item] = this.innerList[item].bind(this.innerList)
      })
    } else {
      this.innerList.reset(_c)
    }
  }

  _updateInnerFocus (data) {
    this.innerList && this.innerList.updateFocus(data)
  }

  afterCreate () {
    if (this.config.disable || this.playerConfig.isLive) {
      return
    }
    this.pos = {
      x: 0, // 水平方向位移
      y: 0, // 垂直方向位移
      moving: false, // 是否正在移动
      isDown: false, // 是否mouseDown
      isEnter: false, // 是否触发了mouseEnter
      isLocked: false // 是否刚刚锁定回过进度条
    }
    this.outer = this.find('xg-outer')
    const { fragFocusClass, fragAutoFocus, fragClass } = this.config
    this._initInner(this.config.fragments, { fragFocusClass, fragAutoFocus, fragClass, style: this.playerConfig.commonStyle || {} })
    if (Sniffer.device === 'mobile') {
      this.config.isDragingSeek = false
      this.isMobile = true
    }

    this.progressBtn = this.find('.xgplayer-progress-btn')

    this.on(Events.DURATION_CHANGE, () => {
      this.onMouseLeave()
    })

    this.on(Events.TIME_UPDATE, () => {
      this.onTimeupdate()
    })

    this.on(Events.SEEKED, () => {
      this.onTimeupdate()
      this.onCacheUpdate()
    })

    this.on(Events.PROGRESS, () => {
      this.onCacheUpdate()
    })

    this.on(Events.ENDED, () => {
      this.onCacheUpdate(true)
      this.onTimeupdate(true)
      this._state.now = 0
    })

    this.on(Events.EMPTIED, () => {
      this.onReset()
    })

    this.on(Events.VIDEO_RESIZE, () => {
      this.onVideoResize()
    })

    this.bindDomEvents()
    this.initCustomStyle()
  }

  /**
   * @description 配置更新响应，插件内置调用api, 播放器整体配置更新的时候调用
   * @param {IProgressConfig} config
   */
  setConfig (config) {
    let frags = null
    Object.keys(config).forEach(key => {
      this.config[key] = config[key]
      if (key === 'fragments') {
        frags = config[key]
      }
    })
    if (frags) {
      this._initInner(frags, config)
    }
  }

  initCustomStyle () {
    const { commonStyle } = this.playerConfig || {}
    const { sliderBtnStyle } = commonStyle
    const { progressBtn } = this
    if (sliderBtnStyle) {
      if (typeof sliderBtnStyle === 'string') {
        progressBtn.style.boxShadow = sliderBtnStyle
      } else if (typeof sliderBtnStyle === 'object') {
        Object.keys(sliderBtnStyle).map(key => {
          progressBtn.style[key] = sliderBtnStyle[key]
        })
      }
    }
  }

  /**
   * 触发某一类回调监听
   * @param { string } type 类型 drag/dragend
   * @param { any} data 具体数据
   */
  triggerCallbacks (type, data, event) {
    if (this.__dragCallBacks.length > 0) {
      this.__dragCallBacks.map(item => {
        if (item && item.handler && item.type === type) {
          try {
            item.handler(data, event)
          } catch (error) {
            console.error(`[XGPLAYER][triggerCallbacks] ${item} error`, error)
          }
        }
      })
    }
  }

  /**
   * 供外部插件添加回调
   * @param {string} type 类型 drag/dragend
   * @param {function} handle 回调函数句柄
   */
  addCallBack (type, handle) {
    if (handle && typeof handle === 'function') {
      this.__dragCallBacks.push({ type: type, handler: handle })
    }
  }

  /**
   * 供外部插件移除回调
   * @param {string} type 类型 drag/dragend
   * @param {Function} event 回调函数句柄
   */
  removeCallBack (type, event) {
    const { __dragCallBacks } = this
    let _index = -1
    __dragCallBacks.map((item, index) => {
      if (item && item.type === type && item.handler === event) {
        _index = index
      }
    })
    if (_index > -1) {
      __dragCallBacks.splice(_index, 1)
    }
  }

  /**
   * @description 解除进度条的所动状态
   * @returns
   */
  unlock () {
    const { player, pos } = this
    pos.isEnter = false
    if (player.isMini) {
      return
    }
    this.unbind('mousemove', this.onMoveOnly)
    if (pos.isDown) {
      this.unbind('mouseleave', this.onMouseLeave)
      return
    }
    this.blur()
  }

  bindDomEvents () {
    const { controls, config } = this.player
    this._mouseDownHandlerHook = this.hook('dragstart', this._mouseDownHandler)
    this._mouseUpHandlerHook = this.hook('dragend', this._mouseUpHandler)
    this._mouseMoveHandlerHook = this.hook('drag', this._mouseMoveHandler)

    if (this.domEventType === 'touch' || this.domEventType === 'compatible') {
      this.root.addEventListener('touchstart', this.onMouseDown)
      if (controls) {
        controls.root && controls.root.addEventListener('touchmove', Util.stopPropagation)
        controls.center && controls.center.addEventListener('touchend', Util.stopPropagation)
      }
    }

    if (this.domEventType === 'mouse' || this.domEventType === 'compatible') {
      this.bind('mousedown', this.onMouseDown)
      config.isMobileSimulateMode !== 'mobile' && this.bind('mouseenter', this.onMouseEnter)
      this.bind('mouseover', this.onMouseOver)
      this.bind('mouseout', this.onMouseOut)
      // 避免触发videoClick 暂停/播放切换
      this.player.root.addEventListener('click', this.onBodyClick, true)
    }
  }

  focus () {
    this.player.controls.pauseAutoHide()
    Util.addClass(this.root, 'active')
  }

  blur () {
    if (this._disableBlur) {
      return
    }
    this.player.controls.recoverAutoHide()
    Util.removeClass(this.root, 'active')
  }

  disableBlur () {
    this._disableBlur = true
  }

  enableBlur () {
    this._disableBlur = false
  }

  onMoveOnly = (e, data) => {
    const { pos, config, player } = this
    let ret = data
    if (e) {
      Util.event(e)
      const _ePos = Util.getEventPos(e, player.zoom)
      const x = player.rotateDeg === 90 ? _ePos.clientY : _ePos.clientX
      if (pos.moving && Math.abs(pos.x - x) < config.miniMoveStep) {
        return
      }
      pos.moving = true
      pos.x = x
      ret = this.computeTime(e, x)
    }
    this.triggerCallbacks('dragmove', ret, e)
    this._updateInnerFocus(ret)
  }

  /**
   * 避免mouseup的时候触发父辈节点的click事件，和单击视频区域切换暂停/播放互斥
   * @param {*} e
   * @returns
   */
  onBodyClick = (e) => {
    if (!this.pos.isLocked) {
      return
    }
    this.pos.isLocked = false
    e.preventDefault()
    e.stopPropagation()
  }

  _mouseDownHandler = (event, data) => {
    this._state.time = data.currentTime
    this.updateWidth(data.currentTime, data.seekTime, data.percent, 0)
    this._updateInnerFocus(data)
  }

  _mouseUpHandler = (e, data) => {
    const { pos } = this
    pos.moving && this.updateWidth(data.currentTime, data.seekTime, data.percent, 2)
  }

  _mouseMoveHandler = (e, data) => {
    const { _state, pos, config, player } = this
    if (_state.time < data.currentTime) {
      data.forward = true
    } else {
      data.forward = false
    }
    _state.time = data.currentTime
    if (pos.isDown && !pos.moving) {
      pos.moving = true
      config.isPauseMoving && player.pause()
      this.triggerCallbacks('dragstart', data, e)
      this.emitUserAction('drag', 'dragstart', data)
    }
    this.updateWidth(data.currentTime, data.seekTime, data.percent, 1)
    this.triggerCallbacks('dragmove', data, e)
    this._updateInnerFocus(data)
  }

  onMouseDown = (e) => {
    const { _state, player, pos, config, playerConfig } = this
    const _ePos = Util.getEventPos(e, player.zoom)
    const x = player.rotateDeg === 90 ? _ePos.clientY : _ePos.clientX
    if (player.isMini || config.closeMoveSeek || (!playerConfig.allowSeekAfterEnded && player.ended)) {
      return
    }

    if (!player.duration && !player.isPlaying) {
      player.play()
      return
    }
    e.stopPropagation()
    // e.preventDefault()
    this.focus()
    Util.checkIsFunction(playerConfig.disableSwipeHandler) && playerConfig.disableSwipeHandler()
    Util.checkIsFunction(config.onMoveStart) && config.onMoveStart()
    Util.event(e)
    pos.x = x
    pos.isDown = true
    pos.moving = false
    _state.prePlayTime = player.currentTime

    // 交互开始 禁止控制栏的自动隐藏功能
    player.focus({ autoHide: false })
    this.isProgressMoving = true
    Util.addClass(this.progressBtn, 'active')

    const ret = this.computeTime(e, x)
    ret.prePlayTime = _state.prePlayTime
    this._mouseDownHandlerHook(e, ret)

    const eventType = e.type
    if (eventType === 'touchstart') {
      this.root.addEventListener('touchmove', this.onMouseMove)
      this.root.addEventListener('touchend', this.onMouseUp)
    } else {
      this.unbind('mousemove', this.onMoveOnly)

      document.addEventListener('mousemove', this.onMouseMove, false)
      document.addEventListener('mouseup', this.onMouseUp, false)
      // this.bind('mouseup', this.onMouseUp, false)
    }
    return true
  }

  onMouseUp = (e) => {
    const { player, config, pos, playerConfig, _state } = this
    e.stopPropagation()
    e.preventDefault()
    Util.checkIsFunction(playerConfig.enableSwipeHandler) && playerConfig.enableSwipeHandler()
    Util.checkIsFunction(config.onMoveEnd) && config.onMoveEnd()
    Util.event(e)
    Util.removeClass(this.progressBtn, 'active')

    const ret = this.computeTime(e, pos.x)
    ret.prePlayTime = _state.prePlayTime
    if (pos.moving) {
      this.triggerCallbacks('dragend', ret, e)
      this.emitUserAction('drag', 'dragend', ret)
    } else {
      this.triggerCallbacks('click', ret, e)
      this.emitUserAction('click', 'click', ret)
    }
    this._mouseUpHandlerHook(e, ret)

    pos.moving = false
    pos.isDown = false
    pos.x = 0
    pos.y = 0
    pos.isLocked = true
    _state.prePlayTime = 0
    _state.time = 0
    const eventType = e.type
    if (eventType === 'touchend') {
      this.root.removeEventListener('touchmove', this.onMouseMove)
      this.root.removeEventListener('touchend', this.onMouseUp)
      // 交互结束 恢复控制栏的隐藏流程
      this.blur()
    } else {
      document.removeEventListener('mousemove', this.onMouseMove, false)
      document.removeEventListener('mouseup', this.onMouseUp, false)
      if (!pos.isEnter) {
        this.onMouseLeave(e)
      } else {
        playerConfig.isMobileSimulateMode !== 'mobile' && this.bind('mousemove', this.onMoveOnly)
      }
    }
    // 延迟复位，状态复位要在dom相关时间回调执行之后
    Util.setTimeout(this, () => {
      this.resetSeekState()
    }, 10)
    // 交互结束 恢复控制栏的隐藏流程
    player.focus()
  }

  onMouseMove = (e) => {
    const { _state, pos, player, config } = this
    if (Util.checkTouchSupport()) {
      // e.stopPropagation()
      e.preventDefault()
    }
    Util.event(e)
    const _ePos = Util.getEventPos(e, player.zoom)
    const x = player.rotateDeg === 90 ? _ePos.clientY : _ePos.clientX
    const diff = Math.abs(pos.x - x)
    if ((pos.moving && diff < config.miniMoveStep) || (!pos.moving && diff < config.miniStartStep)) {
      return
    }
    pos.x = x
    const ret = this.computeTime(e, x)
    ret.prePlayTime = _state.prePlayTime
    this._mouseMoveHandlerHook(e, ret)
  }

  onMouseOut = (e) => {
    this.triggerCallbacks('mouseout', null, e)
  }

  onMouseOver = (e) => {
    this.triggerCallbacks('mouseover', null, e)
  }

  onMouseEnter = (e) => {
    const { player, pos } = this
    if (pos.isDown || pos.isEnter || player.isMini || (!player.config.allowSeekAfterEnded && player.ended)) {
      return
    }
    pos.isEnter = true
    this.bind('mousemove', this.onMoveOnly)
    this.bind('mouseleave', this.onMouseLeave)
    // 计算预览位置
    Util.event(e)
    const _ePos = Util.getEventPos(e, player.zoom)
    const x = player.rotateDeg === 90 ? _ePos.clientY : _ePos.clientX
    const ret = this.computeTime(e, x)
    this.triggerCallbacks('mouseenter', ret, e)
    this.focus()
  }

  onMouseLeave = (e) => {
    this.triggerCallbacks('mouseleave', null, e)
    this.unlock()
    this._updateInnerFocus(null)
  }

  onVideoResize = () => {
    const { x, isDown, isEnter } = this.pos
    if (isEnter && !isDown) {
      const ret = this.computeTime(null, x)
      this.onMoveOnly(null, ret)
    }
  }

  /**
   * @description 根据currenTime和占用百分比更新进度条
   * @param {Number} currentTime 需要更新到的时间
   * @param {Number} seekTime 实际seek的时间
   * @param {Number} percent 更新时间占比
   * @param {Int} type 触发类型 0-down 1-move 2-up
   */
  updateWidth (currentTime, seekTime, percent, type) {
    const { config, player } = this
    if (config.isCloseClickSeek && type === 0) {
      return
    }

    const realTime = seekTime = seekTime >= player.duration ? player.duration - config.endedDiff : Number(seekTime).toFixed(1)

    this.updatePercent(percent)
    this.updateTime(currentTime)
    if (type === 1 && (!config.isDragingSeek || player.config.mediaType === 'audio')) {
      return
    }
    this._state.now = realTime
    this._state.direc = realTime > player.currentTime ? 0 : 1
    player.pause()
    player.seek(realTime)
  }

  computeTime (e, x) {
    const { player } = this
    const { width, height, top, left } = this.root.getBoundingClientRect()
    let rWidth, rLeft
    const clientX = x
    if (player.rotateDeg === 90) {
      rWidth = height
      rLeft = top
    } else {
      rWidth = width
      rLeft = left
    }
    let offset = clientX - rLeft
    offset = offset > rWidth ? rWidth : (offset < 0 ? 0 : offset)
    let percent = offset / rWidth
    percent = percent < 0 ? 0 : (percent > 1 ? 1 : percent)
    const currentTime = parseInt(percent * this.offsetDuration * 1000, 10) / 1000
    const seekTime = Util.getCurrentTimeByOffset(currentTime, player.timeSegments)
    return {
      percent,
      currentTime,
      seekTime,
      offset,
      width: rWidth,
      left: rLeft,
      e
    }
  }

  /**
   * @description 更新时间插件，在拖拽状态下要接管时间插件的更新状态
   *             本位置会和time插件交互
   * @param {number} time 根据拖拽距离计算出的时间
   */
  updateTime (time) {
    const { player, duration } = this
    if (time > duration) {
      time = duration
    } else if (time < 0) {
      time = 0
    }
    const timeIcon = player.plugins.time
    if (timeIcon) {
      timeIcon.updateTime(time)
    }
  }

  /**
   * @description 复位正在拖拽状态 ，拖拽的时候要避免timeupdate更新
   */
  resetSeekState () {
    this.isProgressMoving = false
    const timeIcon = this.player.plugins.time
    timeIcon && timeIcon.resetActive()
  }

  /**
   * @description 拖拽过程中更新UI
   * @param {number} percent 小于0的小数
   *
   */
  updatePercent (percent, notSeek) {
    this.isProgressMoving = true
    if (this.config.disable) {
      return
    }
    percent = percent > 1 ? 1 : (percent < 0 ? 0 : percent)
    this.progressBtn.style.left = `${percent * 100}%`
    this.innerList.update({ played: percent * this.offsetDuration }, this.offsetDuration)
    const { miniprogress } = this.player.plugins
    miniprogress && miniprogress.update({ played: percent * this.offsetDuration }, this.offsetDuration)
  }

  /**
   * @description 播放进度更新
   * @param { boolean } isEnded 是否是播放结束的时候调用
   * @returns
   */
  onTimeupdate (isEnded) {
    const { player, _state, offsetDuration } = this
    if (player.isSeeking || this.isProgressMoving) {
      return
    }
    if (_state.now > -1) {
      const abs = parseInt(_state.now * 1000, 10) - parseInt(player.currentTime * 1000, 10)
      if ((_state.direc === 0 && abs > 300) || (_state.direc === 1 && abs > -300)) {
        _state.now = -1
        return
      } else {
        _state.now = -1
      }
    }
    let time = this.currentTime // this.timeOffset + player.currentTime
    time = Util.adjustTimeByDuration(time, offsetDuration, isEnded)
    this.innerList.update({ played: time }, offsetDuration)
    this.progressBtn.style.left = `${time / offsetDuration * 100}%`
    const { miniprogress } = this.player.plugins
    miniprogress && miniprogress.update({ played: time }, offsetDuration)
  }

  /**
   * @description 缓存进度更新
   * @param { boolean } isEnded 是否是结束时触发
   * @returns
   */
  onCacheUpdate (isEnded) {
    const { player, duration } = this
    if (!player) {
      return
    }
    // 兼容设置了customDuration, 实际时长和要显示的时不一致问题
    let _end = player.bufferedPoint.end
    _end = Util.adjustTimeByDuration(_end, duration, isEnded)
    this.innerList.update({ cached: _end }, duration)
    const { miniprogress } = this.player.plugins
    miniprogress && miniprogress.update({ cached: _end }, duration)
  }

  onReset () {
    this.innerList.update({ played: 0, cached: 0 }, 0)
    const { miniprogress } = this.player.plugins
    miniprogress && miniprogress.update({ cached: 0, played: 0 }, 0)
  }

  destroy () {
    const { player } = this
    const { controls } = player
    this.thumbnailPlugin = null
    this.innerList.destroy()
    this.innerList = null
    const { domEventType } = this
    if (domEventType === 'touch' || domEventType === 'compatible') {
      this.root.removeEventListener('touchstart', this.onMouseDown)
      this.root.removeEventListener('touchmove', this.onMouseMove)
      this.root.removeEventListener('touchend', this.onMouseUp)
      if (controls) {
        controls.root && controls.root.removeEventListener('touchmove', Util.stopPropagation)
        controls.center && controls.center.removeEventListener('touchend', Util.stopPropagation)
      }
    }
    if (domEventType === 'mouse' || domEventType === 'compatible') {
      this.unbind('mousedown', this.onMouseDown)
      this.unbind('mouseenter', this.onMouseEnter)
      this.unbind('mousemove', this.onMoveOnly)
      this.unbind('mouseleave', this.onMouseLeave)
      document.removeEventListener('mousemove', this.onMouseMove, false)
      document.removeEventListener('mouseup', this.onMouseUp, false)
      player.root.removeEventListener('click', this.onBodyClick, true)
    }
  }

  render () {
    if (this.config.disable || this.playerConfig.isLive) {
      return
    }
    const controlsMode = this.player.controls ? this.player.controls.config.mode : ''
    const className = controlsMode === 'bottom' ? 'xgplayer-progress-bottom' : ''
    return `
    <xg-progress class="xgplayer-progress ${className}">
      <xg-outer class="xgplayer-progress-outer">
        <xg-progress-btn class="xgplayer-progress-btn"></xg-progress-btn>
      </xg-outer>
    </xg-progress>
    `
  }
}

export default Progress
