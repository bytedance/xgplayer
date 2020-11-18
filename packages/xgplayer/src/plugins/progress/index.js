import Plugin, {Events, Util, POSITIONS, Sniffer} from '../../plugin'
import InnerList from './innerList'

/**
 * 进度条组件
 */
class Progress extends Plugin {
  static get pluginName () {
    return 'progress'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_CENTER,
      index: 0,
      disable: false,
      isDragingSeek: false, // 是否在拖拽的过程中更新currentTime
      closeMoveSeek: false, // 是否关闭滑块seek能力
      isPauseMoving: false, // 是否在move的时候暂停视频内容
      isCloseClickSeek: true, // 是否关闭点击的时候seek
      fragments: [{percent: 1}],
      onMoveStart: () => {
      }, // 手势开始移动回调
      onMoveEnd: () => {} // 手势移动结束回调
    }
  }

  constructor (args) {
    super(args)
    this.useable = false
    this.isProgressMoving = false
    this.__dragCallBacks = []
    this._state = {
      now: -1,
      direc: 0
    }
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
      return;
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
    });

    this.on(Events.SEEKED, () => {
      this.onTimeupdate()
      this.onCacheUpdate()
    });

    this.on([Events.PROGRESS, Events.ENDED], () => {
      this.onCacheUpdate()
    })

    this.bindDomEvents()
  }

  initCustomStyle () {
    const {commonStyle} = this.playerConfig || {}
    const {sliderBtnStyle} = commonStyle
    const {progressBtn} = this
    if (sliderBtnStyle) {
      if (typeof sliderBtnStyle === 'string') {
        progressBtn.style.boxShadow = sliderBtnStyle;
      } else if (typeof sliderBtnStyle === 'object') {
        Object.keys(sliderBtnStyle).map(key => {
          progressBtn.style[key] = sliderBtnStyle[key];
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
        item && item.handler && item.type === type && item.handler(data)
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
      this.__dragCallBacks.push({type: type, handler: event})
    }
  }

  /**
   * 供外部插件移除回调
   * @param {String} type 类型 drag/dragend
   * @param {Function} event 回调函数句柄
   */
  removeCallBack (type, event) {
    const {__dragCallBacks} = this
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
    ['onMoveOnly', 'onMouseDown', 'onMouseUp', 'onMouseMove', 'onMouseEnter', 'onMouseLeave', 'onBodyClick'].map(item => {
      this[item] = this[item].bind(this)
    })

    if (this.isMobile) {
      this.root.addEventListener('touchstart', this.onMouseDown, false)
    } else {
      this.root.addEventListener('mousedown', this.onMouseDown, false)
      this.root.addEventListener('mouseenter', this.onMouseEnter, false)
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

  onMoveOnly (e) {
    const {root, pos} = this
    Util.event(e)
    if (pos.moving && Math.abs(pos.x - e.clientX) < 2) {
      return
    }
    pos.moving = true
    pos.x = e.clientX
    const { left, width } = root.getBoundingClientRect()
    this.triggerCallbacks('dragmove', {offset: e.clientX - left, left, width, e})
  }

  onBodyClick (e) {
    e.preventDefault()
    e.stopPropagation()
  }

  onMouseDown (e) {
    const {player, pos, config, playerConfig, root} = this
    if (player.isMini || config.closeMoveSeek || (!playerConfig.allowSeekAfterEnded && player.ended)) {
      return
    }
    e.stopPropagation()
    e.preventDefault()
    this.focus()
    Util.checkIsFunction(playerConfig.disableSwipeHandler) && playerConfig.disableSwipeHandler()
    Util.checkIsFunction(config.onMoveStart) && config.onMoveStart()
    Util.event(e)
    pos.x = e.clientX
    pos.y = e.clientY
    pos.isDown = true
    pos.moving = false

    // 交互开始 禁止控制栏的自动隐藏功能
    player.emit(Events.PLAYER_FOCUS, {autoHide: false})
    this.isProgressMoving = true
    Util.addClass(this.progressBtn, 'active')

    this.computeWidth(e.clientX, false)

    if (Sniffer.device === 'mobile') {
      root.addEventListener('touchmove', this.onMouseMove, false)
      root.addEventListener('touchend', this.onMouseUp, false)
    } else {
      root.removeEventListener('mousemove', this.onMoveOnly, false)

      document.addEventListener('mousemove', this.onMouseMove, false)
      document.addEventListener('mouseup', this.onMouseUp, false)
      // 避免触发videoClick 暂停/播放切换
      player.root.addEventListener('click', this.onBodyClick, false)
      // root.addEventListener('mouseup', this.onMouseUp, false)
    }
    return true
  }

  onMouseUp (e) {
    const {player, config, pos, playerConfig, root} = this
    // e.stopPropagation()
    // e.preventDefault()
    Util.checkIsFunction(playerConfig.enableSwipeHandler) && playerConfig.enableSwipeHandler()
    Util.checkIsFunction(config.onMoveEnd) && config.onMoveEnd()
    Util.event(e)
    Util.removeClass(this.progressBtn, 'active')

    if (pos.moving) {
      this.computeWidth(e.clientX, false)
    }

    pos.moving = false
    pos.isDown = false
    pos.x = 0
    pos.y = 0

    if (this.isMobile) {
      root.removeEventListener('touchmove', this.onMouseMove, false)
      root.removeEventListener('touchend', this.onMouseUp, false)
      // 交互结束 恢复控制栏的隐藏流程
      this.blur()
    } else {
      document.removeEventListener('mousemove', this.onMouseMove, false)
      document.removeEventListener('mouseup', this.onMouseUp, false)
      player.root.removeEventListener('click', this.onBodyClick, false)
      if (!pos.isEnter) {
        this.onMouseLeave(e)
      } else {
        root.addEventListener('mousemove', this.onMoveOnly, false)
      }
    }
    // 延迟复位，状态复位要在dom相关时间回调执行之后
    setTimeout(() => {
      this.resetSeekState()
    }, 10)
    this.triggerCallbacks('dragend', {})
    // // 交互结束 恢复控制栏的隐藏流程
    // player.emit(Events.PLAYER_FOCUS)
  }

  onMouseMove (e) {
    const {root, pos, player, config} = this
    if (this.isMobile) {
      e.stopPropagation()
      e.preventDefault()
    }
    Util.event(e)
    if (pos.moving && Math.abs(pos.x - e.clientX) < 2) {
      return
    }
    pos.x = e.clientX
    if (pos.isDown && !pos.moving) {
      pos.moving = true
      config.isPauseMoving && player.pause()
      this.triggerCallbacks('dragstart', {})
    }
    this.computeWidth(e.clientX, true)
    const { left, width } = root.getBoundingClientRect()
    this.triggerCallbacks('dragmove', {offset: e.clientX - left, width, left, e})
  }

  onMouseEnter (e) {
    const {player, pos, root} = this
    pos.isEnter = true
    if (pos.isDown || player.isMini || (!player.config.allowSeekAfterEnded && player.ended)) {
      return
    }
    root.addEventListener('mousemove', this.onMoveOnly, false)
    root.addEventListener('mouseleave', this.onMouseLeave, false)
    this.focus()
  }

  onMouseLeave (e) {
    const {player, root, pos} = this
    pos.isEnter = false
    if (player.isMini) {
      return
    }
    root.removeEventListener('mousemove', this.onMoveOnly, false)
    if (pos.isDown) {
      root.removeEventListener('mouseleave', this.onMouseLeave, false)
      return
    }
    this.blur()
  }

  /**
   * @description 根据事件回调计算位置
   * @param {Number} clientX
   * @param {Boolean} isMove
   */
  computeWidth (clientX, isMove) {
    const containerWidth = this.root.getBoundingClientRect().width
    const {player, config} = this
    let {left} = this.root.getBoundingClientRect()
    let w = clientX - left
    if (w > containerWidth) {
      w = containerWidth
    }
    const percent = w / containerWidth
    const currentTime = percent * player.duration
    const now = percent * player.duration
    isMove && this.triggerCallbacks('drag', {percent, currentTime})
    if (config.isCloseClickSeek && !isMove) {
      console.log('isCloseClickSeek', config.isCloseClickSeek)
      return
    }
    this.updatePercent(w / containerWidth)
    this.updateTime(now)
    // 音频在移动move的时候不做seek
    if (isMove && (!config.isDragingSeek || player.videoConfig.mediaType === 'audio')) {
      return
    }
    this._state.now = now
    this._state.direc = now > player.currentTime ? 0 : 1
    player.seek(Number(now).toFixed(1))
  }

  /**
   * @description 更新时间插件，在拖拽状态下要接管时间插件的更新状态
   *             本位置会和time插件交互
   * @param {number} time 根据拖拽距离计算出的时间
   */
  updateTime (time) {
    const {player} = this
    if (time > player.duration) {
      time = player.duration
    } else if (time < 0) {
      time = 0
    }
    let timeIcon = player.plugins.time
    if (timeIcon) {
      timeIcon.updateTime(time)
    }
  }

  /**
   * @description 复位正在拖拽状态 ，拖拽的时候要避免timeupdate更新
   */
  resetSeekState () {
    this.isProgressMoving = false
    let timeIcon = this.player.plugins.time
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
      return;
    }
    percent = percent > 1 ? 1 : (percent < 0 ? 0 : percent)
    this.progressBtn.style.left = `${percent * 100}%`
    this.innerList.update({played: percent * this.player.duration}, this.player.duration)
  }

  /**
   * @description 播放进度更新
   */
  onTimeupdate () {
    const {player, _state} = this
    if (player.isSeeking || this.isProgressMoving) {
      return;
    }
    if (_state.now > -1) {
      const abs = parseInt(_state.now * 1000, 10) - parseInt(player.currentTime * 1000, 10)
      if ((_state.direc === 0 && abs > 300) || (_state.direc === 1 && abs > -300)) {
        return
      } else {
        _state.now = -1
      }
    }
    this.innerList.update({played: player.currentTime}, player.duration)
    this.progressBtn.style.left = `${player.currentTime / player.duration * 100}%`
  }

  /**
   * @description 缓存进度更新
   */
  onCacheUpdate () {
    const {player} = this
    const point = player.bufferedPoint
    this.innerList.update({cached: point.end}, player.duration)
  }

  destroy () {
    const {root, player} = this
    this.thumbnailPlugin = null
    this.innerList.destroy()
    this.innerList = null
    if (Sniffer.device === 'mobile') {
      root.removeEventListener('touchstart', this.mouseDown, false)
      root.removeEventListener('touchmove', this.onMouseMove, false)
      root.removeEventListener('touchend', this.onMouseUp, false)
    } else {
      root.removeEventListener('mousedown', this.mouseDown, false)
      root.removeEventListener('mouseenter', this.mouseEnter, false)
      root.removeEventListener('mousemove', this.onMoveOnly, false)
      document.removeEventListener('mousemove', this.onMouseMove, false)
      document.removeEventListener('mouseup', this.onMouseUp, false)
      player.root.removeEventListener('click', this.onBodyClick, false)
    }
  }

  render () {
    if (this.config.disable) {
      return
    }
    return `
    <xg-progress class="xgplayer-progress">
      <xg-outer class="xgplayer-progress-outer">
        <xg-progress-btn class="xgplayer-progress-btn"></xg-progress-btn>
        <!--<xg-point class="xgplayer-progress-point">00:00</xg-point>-->
      </xg-outer>
    </xg-progress>
    `
  }
}

export default Progress
