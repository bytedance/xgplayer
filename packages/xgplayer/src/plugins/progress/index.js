import Plugin, { Events, Util, POSITIONS, Sniffer } from '../../plugin'
import InnerList from './innerList'

/**
 * @typedef {{
 *   position?:string,
 *   disable?: boolean,
 *   isDragingSeek?: boolean, // 是否在拖拽的过程中更新currentTime
 *   closeMoveSeek?: boolean, // 是否关闭滑块seek能力
 *   isPauseMoving?: boolean, // 是否在move的时候暂停视频内容
 *   isCloseClickSeek?: boolean, // 是否关闭点击进度条的时候seek
 *   fragments?: Array<{percent: number}>,
 *   miniMoveStep?: number,
 *   miniStartStep?: number,
 *   onMoveStart?: () => any, // 手势开始移动回调,
 *   onMoveEnd?: () => any, // 手势移动结束回调
 *   [propName: string]: any
 * }} IProgressConfig
 */
/**
 * 进度条组件
 */
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
      miniMoveStep: 5,
      miniStartStep: 2,
      onMoveStart: () => {
      }, // 手势开始移动回调
      onMoveEnd: () => {} // 手势移动结束回调
    }
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
      time: 0
    }
  }

  get duration () {
    return this.playerConfig.customDuration || this.player.duration
  }

  get timeOffset () {
    return this.playerConfig.timeOffset || 0
  }

  changeState (useable = true) {
    this.useable = useable
  }

  beforeCreate (args) {
    if (typeof args.player.config.progress === 'boolean') {
      args.config.disable = !args.player.config.progress
    }
  }

  /**
   * @description 创建内部进度条，并挂载到xg-outer上,
   *              并把一些对外API绑定在progress上供外部调用
   *
   */
  createInner () {
    this.innerList = new InnerList({
      fragments: this.config.fragments,
      style: this.playerConfig.commonStyle || {}
    })
    this.outer.insertBefore(this.innerList.render(), this.outer.children[0]);
    ['findHightLight', 'unHightLight', 'setHightLight', 'findFragment'].map(item => {
      this[item] = this.innerList[item].bind(this.innerList)
    })
  }

  afterCreate () {
    if (this.config.disable) {
      return
    }
    this.pos = {
      x: 0, // 水平方向位移
      y: 0, // 垂直方向位移
      moving: false, // 是否正在移动
      isDown: false, // 是否mouseDown
      isEnter: false // 是否触发了mouseEnter
    }
    this.outer = this.find('xg-outer')
    this.createInner()
    if (Sniffer.device === 'mobile') {
      this.config.isDragingSeek = false
      this.isMobile = true
    }

    this.progressBtn = this.find('.xgplayer-progress-btn')

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
      this.onCacheUpdate()
      this._state.now = 0
    })

    this.bindDomEvents()
    this.initCustomStyle()
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
   * @param {*} type 类型 drag/dragend
   * @param {Object} data 具体数据
   */
  triggerCallbacks (type, data) {
    if (this.__dragCallBacks.length > 0) {
      this.__dragCallBacks.map(item => {
        if (item && item.handler && item.type === type) {
          try {
            item.handler(data)
          } catch (error) {
            console.error(`[XGPLAYER][triggerCallbacks] ${item} error`, error)
          }
        }
      })
    }
  }

  /**
   * 供外部插件添加回调
   * @param {String} type 类型 drag/dragend
   * @param {Function} event 回调函数句柄
   */
  addCallBack (type, event) {
    if (event && typeof event === 'function') {
      this.__dragCallBacks.push({ type: type, handler: event })
    }
  }

  /**
   * 供外部插件移除回调
   * @param {String} type 类型 drag/dragend
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

  bindDomEvents () {
    const { controls, config } = this.player
    if (this.isMobile) {
      this.bind('touchstart', this.onMouseDown)
      if (controls) {
        controls.root && controls.root.addEventListener('touchmove', Util.stopPropagation)
        controls.center && controls.center.addEventListener('touchend', Util.stopPropagation)
      }
    } else {
      this.bind('mousedown', this.onMouseDown)
      !config.isMobileSimulateMode && this.bind('mouseenter', this.onMouseEnter)
    }
  }

  focus () {
    this.player.controls.pauseAutoHide()
    Util.addClass(this.root, 'active')
  }

  blur () {
    this.player.controls.recoverAutoHide()
    Util.removeClass(this.root, 'active')
  }

  onMoveOnly = (e) => {
    const { pos, config, player } = this
    Util.event(e)
    const _ePos = Util.getEventPos(e, player.zoom)
    const x = player.rotateDeg === 90 ? _ePos.clientY : _ePos.clientX
    if (pos.moving && Math.abs(pos.x - x) < config.miniMoveStep) {
      return
    }
    pos.moving = true
    pos.x = x
    const ret = this.computeTime(e)
    this.triggerCallbacks('dragmove', ret)
  }

  onBodyClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  onMouseDown = (e) => {
    const { player, pos, config, playerConfig } = this
    const _ePos = Util.getEventPos(e, player.zoom)
    const x = player.rotateDeg === 90 ? _ePos.clientY : _ePos.clientX
    if (player.isMini || config.closeMoveSeek || (!playerConfig.allowSeekAfterEnded && player.ended)) {
      return
    }
    e.stopPropagation()
    e.preventDefault()
    this.focus()
    Util.checkIsFunction(playerConfig.disableSwipeHandler) && playerConfig.disableSwipeHandler()
    Util.checkIsFunction(config.onMoveStart) && config.onMoveStart()
    Util.event(e)
    pos.x = x
    pos.isDown = true
    pos.moving = false

    // 交互开始 禁止控制栏的自动隐藏功能
    player.focus({ autoHide: false })
    this.isProgressMoving = true
    Util.addClass(this.progressBtn, 'active')

    const ret = this.computeTime(e)
    this._state.time = ret.currentTime
    this.updateWidth(ret.currentTime, ret.percent, 0)

    if (this.isMobile) {
      this.bind('touchmove', this.onMouseMove)
      this.bind('touchend', this.onMouseUp)
    } else {
      this.unbind('mousemove', this.onMoveOnly)

      document.addEventListener('mousemove', this.onMouseMove, false)
      document.addEventListener('mouseup', this.onMouseUp, false)
      // 避免触发videoClick 暂停/播放切换
      player.root.addEventListener('click', this.onBodyClick, false)
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

    const ret = this.computeTime(e)
    if (pos.moving) {
      this.updateWidth(ret.currentTime, ret.percent, 2)
      this.triggerCallbacks('dragend', ret)
    } else {
      // this.updateWidth(ret.currentTime, ret.percent, 2)
      this.triggerCallbacks('click', ret)
    }

    pos.moving = false
    pos.isDown = false
    pos.x = 0
    pos.y = 0
    _state.time = 0
    if (this.isMobile) {
      this.unbind('touchmove', this.onMouseMove)
      this.unbind('touchend', this.onMouseUp)
      // 交互结束 恢复控制栏的隐藏流程
      this.blur()
    } else {
      document.removeEventListener('mousemove', this.onMouseMove, false)
      document.removeEventListener('mouseup', this.onMouseUp, false)
      player.root.removeEventListener('click', this.onBodyClick, false)
      if (!pos.isEnter) {
        this.onMouseLeave(e)
      } else {
        !playerConfig.isMobileSimulateMode && this.bind('mousemove', this.onMoveOnly)
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
    const { pos, player, config, _state } = this
    if (this.isMobile) {
      e.stopPropagation()
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
    const ret = this.computeTime(e)
    if (_state.time < ret.currentTime) {
      ret.forward = true
    } else {
      ret.forward = false
    }
    _state.time = ret.currentTime
    if (pos.isDown && !pos.moving) {
      pos.moving = true
      config.isPauseMoving && player.pause()
      this.triggerCallbacks('dragstart', ret)
    }
    this.updateWidth(ret.currentTime, ret.percent, 1)
    this.triggerCallbacks('dragmove', ret)
  }

  onMouseEnter = (e) => {
    const { player, pos } = this
    if (pos.isDown || pos.isEnter || player.isMini || (!player.config.allowSeekAfterEnded && player.ended)) {
      return
    }
    pos.isEnter = true
    this.bind('mousemove', this.onMoveOnly)
    this.bind('mouseleave', this.onMouseLeave)
    this.focus()
  }

  onMouseLeave = (e) => {
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

  /**
   * @description 根据currenTime和占用百分比更新进度条
   * @param {Number} currentTime 需要更新到的时间
   * @param {Number} percent 更新时间占比
   * @param {Int} type 触发类型 0-down 1-move 2-up
   */
  updateWidth (currentTime, percent, type) {
    const { config, player } = this
    if (config.isCloseClickSeek && type === 0) {
      return
    }
    const realTime = currentTime > player.duration ? player.duration - 0.2 : Number(currentTime).toFixed(1)
    // currentTime = currentTime > player.duration ? player.duration - 0.2 : Number(currentTime).toFixed(1)
    this.updatePercent(percent)
    this.updateTime(currentTime)
    if (type === 1 && (!config.isDragingSeek || player.videoConfig.mediaType === 'audio')) {
      return
    }
    this._state.now = realTime
    this._state.direc = realTime > player.currentTime ? 0 : 1
    player.seek(realTime)
  }

  computeTime (e) {
    const { player } = this
    const { width, height, top, left } = this.root.getBoundingClientRect()
    const _ePos = Util.getEventPos(e, player.zoom)
    let rWidth, rLeft, clientX
    if (player.rotateDeg === 90) {
      rWidth = height
      rLeft = top
      clientX = _ePos.clientY
    } else {
      rWidth = width
      rLeft = left
      clientX = _ePos.clientX
    }
    let offset = clientX - rLeft
    offset = offset > rWidth ? rWidth : (offset < 0 ? 0 : offset)

    let percent = offset / rWidth
    percent = percent < 0 ? 0 : (percent > 1 ? 1 : percent)
    const currentTime = parseInt(percent * this.duration * 1000, 10) / 1000
    return {
      percent,
      currentTime,
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
    this.innerList.update({ played: percent * this.duration }, this.duration)
    const { miniprogress } = this.player.plugins
    miniprogress && miniprogress.update({ played: percent * this.duration }, this.duration)
  }

  /**
   * @description 播放进度更新
   */
  onTimeupdate () {
    const { player, _state, duration } = this
    if (player.isSeeking || this.isProgressMoving) {
      return
    }
    if (_state.now > -1) {
      const abs = parseInt(_state.now * 1000, 10) - parseInt(player.currentTime * 1000, 10)
      if ((_state.direc === 0 && abs > 300) || (_state.direc === 1 && abs > -300)) {
        return
      } else {
        _state.now = -1
      }
    }
    const time = this.timeOffset + player.currentTime
    this.innerList.update({ played: time }, duration)
    this.progressBtn.style.left = `${time / duration * 100}%`
    const { miniprogress } = this.player.plugins
    miniprogress && miniprogress.update({ played: time }, duration)
  }

  /**
   * @description 缓存进度更新
   */
  onCacheUpdate () {
    const { player, duration } = this
    const point = player.bufferedPoint
    this.innerList.update({ cached: point.end }, duration)
    const { miniprogress } = this.player.plugins
    miniprogress && miniprogress.update({ cached: point.end }, duration)
  }

  destroy () {
    const { player } = this
    const { controls } = player
    this.thumbnailPlugin = null
    this.innerList.destroy()
    this.innerList = null
    if (this.isMobile) {
      this.unbind('touchstart', this.onMouseDown)
      this.unbind('touchmove', this.onMouseMove)
      this.unbind('touchend', this.onMouseUp)
      if (controls) {
        controls.root && controls.root.removeEventListener('touchmove', Util.stopPropagation)
        controls.center && controls.center.removeEventListener('touchend', Util.stopPropagation)
      }
    } else {
      this.unbind('mousedown', this.onMouseDown)
      this.unbind('mouseenter', this.onMouseEnter)
      this.unbind('mousemove', this.onMoveOnly)
      document.removeEventListener('mousemove', this.onMouseMove, false)
      document.removeEventListener('mouseup', this.onMouseUp, false)
      player.root.removeEventListener('click', this.onBodyClick, false)
    }
  }

  render () {
    if (this.config.disable) {
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
