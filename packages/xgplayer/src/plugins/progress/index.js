import Plugin from '../../plugin'
import ProgressDots from './progressdots'
import Thumbnail from '../common/thumbnail'
import InnerList from './innerList'

const {Events, Util, POSITIONS, Sniffer} = Plugin

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
      progressDot: [],
      thumbnail: null,
      disable: false,
      isDragingSeek: true, // 是否在拖拽的过程中更新currentTime
      closeMoveSeek: false, // 是否关闭滑块seek能力
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
    const outer = this.find('xg-outer')
    this.innerList = new InnerList({
      fragments: this.config.fragments,
      style: this.playerConfig.commonStyle || {}
    })
    outer.insertBefore(this.innerList.render(), outer.children[0]);
    ['findHightLight', 'unHightLight', 'setHightLight', 'findFragment'].map(item => {
      this[item] = this.innerList[item].bind(this.innerList)
    })
  }

  afterCreate () {
    if (this.config.disable) {
      return;
    }
    this.createInner()
    if (Sniffer.device === 'mobile') {
      this.config.isDragingSeek = false
    }
    this.pointTip = this.find('.xgplayer-progress-point')
    this.progressBtn = this.find('.xgplayer-progress-btn')

    this.registerThumbnail()

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

  children () {
    return {
      ProgressDots: {
        plugin: ProgressDots,
        options: {
          root: this.find('xg-outer'),
          dots: this.playerConfig.progressDot || this.config.progressDot
        }
      }
    }
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
        item.type === type && item.handler(data)
      })
    }
  }

  /**
   * 供外部插件添加回调
   * @param {String} type 类型 drag/dragend
   * @param {Function} event 回调函数句柄
   */
  addDragCallBack (type, event) {
    if (event && typeof event === 'function') {
      this.__dragCallBacks.push({type: type, handler: event})
    }
  }

  registerThumbnail () {
    const {thumbnail} = this.playerConfig
    // 移动端缩略图预览不在进度条上
    if (!thumbnail || Sniffer.device === 'mobile') {
      return;
    }
    thumbnail.className = 'progress-thumbnail xg-tips'
    this.thumbnailPlugin = this.registerPlugin(Thumbnail, {
      root: this.find('.xgplayer-progress-played')
    })
  }

  bindDomEvents () {
    this.mouseDown = this.mouseDown.bind(this)
    this.mouseMove = this.mouseMove.bind(this)
    this.mouseEnter = this.mouseEnter.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)
    if (Sniffer.device === 'mobile') {
      this.root.addEventListener('touchstart', this.mouseDown, false)
    } else {
      this.root.addEventListener('mousedown', this.mouseDown, false)
      this.root.addEventListener('mouseenter', this.mouseEnter, false)
    }
  }

  mouseDown (e) {
    const {player, config, playerConfig, pointTip} = this
    if (player.isMini || config.closeMoveSeek) {
      return
    }
    e.preventDefault()
    e.stopPropagation()
    Util.checkIsFunction(playerConfig.disableSwipeHandler) && playerConfig.disableSwipeHandler()
    Util.event(e)
    // this.pointTip为tip信息 不做seek操作
    if (e.target === pointTip || (!playerConfig.allowSeekAfterEnded && player.ended)) {
      return true
    }

    Util.checkIsFunction(config.onMoveStart) && config.onMoveStart()
    // 交互开始 禁止控制栏的自动隐藏功能
    player.emit(Events.PLAYER_FOCUS, {autoHide: false})
    this.isProgressMoving = true
    Util.addClass(this.progressBtn, 'moving')

    this.computeWidth(e, false)

    const move = (e) => {
      e.preventDefault()
      e.stopPropagation()
      Util.event(e)
      this.isProgressMoving = true
      this.computeWidth(e, true)
    }

    const up = (e) => {
      const {player, config} = this
      e.preventDefault()
      e.stopPropagation()
      Util.checkIsFunction(playerConfig.enableSwipeHandler) && playerConfig.enableSwipeHandler()
      Util.event(e)
      Util.removeClass(this.progressBtn, 'moving')
      if (Sniffer.device === 'mobile') {
        this.root.removeEventListener('touchmove', move)
        this.root.removeEventListener('touchend', up)
      } else {
        this.root.removeEventListener('mousemove', move)
        this.root.removeEventListener('mouseup', up)
        this.root.removeEventListener('mouseleave', up)
      }
      Util.checkIsFunction(config.onMoveEnd) && config.onMoveEnd()
      this.computeWidth(e, false)
      // 延迟复位，状态复位要在dom相关时间回调执行之后
      setTimeout(() => {
        this.resetSeekState()
      }, 10)
      this.triggerCallbacks('dragend', {})
      // 交互结束 恢复控制栏的隐藏流程
      player.emit(Events.PLAYER_FOCUS)
    }

    if (Sniffer.device === 'mobile') {
      this.root.addEventListener('touchmove', move, false)
      this.root.addEventListener('touchend', up, false)
    } else {
      this.root.addEventListener('mousemove', move)
      this.root.addEventListener('mouseup', up)
      this.root.addEventListener('mouseleave', up)
    }
    return true
  }

  mouseEnter (e) {
    const {player} = this
    if (player.isMini || (!player.config.allowSeekAfterEnded && player.ended)) {
      return
    }
    this.root.addEventListener('mousemove', this.mouseMove, false)
    this.root.addEventListener('mouseleave', this.mouseLeave, false)
  }

  mouseLeave (e) {
    const {player, root, pointTip, thumbnailPlugin} = this
    if (player.isMini) {
      return
    }
    pointTip.style.display = 'none'
    thumbnailPlugin && thumbnailPlugin.hide()
    root.removeEventListener('mousemove', this.mouseMove, false)
    root.removeEventListener('mouseleave', this.mouseLeave, false)
  }

  mouseMove (e) {
    const {player, thumbnailPlugin, root} = this
    const { left, width } = root.getBoundingClientRect()
    let now = (e.clientX - left) / width * player.duration
    now = now < 0 ? 0 : now
    this.pointTip.textContent = Util.format(now)
    let pointWidth = this.pointTip.getBoundingClientRect().width
    let pleft = e.clientX - left - pointWidth / 2
    pleft = pleft > 0 ? pleft : 0
    pleft = pleft > width - pointWidth ? width - pointWidth : pleft
    this.pointTip.style.left = `${pleft}px`
    if (e.target && e.target.className === 'xgplayer-progress-dot') {
      this.pointTip.style.display = 'none'
    } else {
      this.pointTip.style.display = 'block'
    }
    thumbnailPlugin && thumbnailPlugin.update(now, e.clientX, width)
  }

  /**
   * @description 根据事件回调计算位置
   * @param {Event} e
   * @param {Boolean} isMove
   */
  computeWidth (e, isMove) {
    const containerWidth = this.root.getBoundingClientRect().width
    const {player, config} = this
    let {left} = this.root.getBoundingClientRect()
    let w = e.clientX - left
    if (w > containerWidth) {
      w = containerWidth
    }
    const percent = w / containerWidth
    const currentTime = percent * this.player.duration
    const now = percent * player.duration
    isMove && this.triggerCallbacks('drag', {percent, currentTime})
    this.updatePercent(w / containerWidth)
    this.updateTime(now)
    // 音频在移动move的时候不做seek
    if (isMove && (!config.isDragingSeek || player.videoConfig.mediaType === 'audio')) {
      return
    }
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

  // compute (e) {
  //   const containerLeft = this.root.getBoundingClientRect().left
  //   const containerWidth = this.root.getBoundingClientRect().width
  //   const pointWidth = this.pointTip.getBoundingClientRect().width
  //   let left = e.clientX - containerLeft - pointWidth / 2
  //   left = left > 0 ? left : 0
  //   left = left > containerWidth - pointWidth ? containerWidth - pointWidth : left
  //   this.pointTip.style.left = `${left}px`
  // }

  /**
   * @description 播放进度更新
   */
  onTimeupdate () {
    const {player} = this
    if (player.isSeeking || this.isProgressMoving) {
      return;
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
    this.thumbnailPlugin = null
    this.innerList.destroy()
    this.innerList = null
    if (Sniffer.device === 'mobile') {
      this.root.removeEventListener('touchstart', this.mouseDown, false)
    } else {
      this.root.removeEventListener('mousedown', this.mouseDown, false)
      this.root.removeEventListener('mouseenter', this.mouseEnter, false)
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
        <xg-point class="xgplayer-progress-point">00:00</xg-point>
      </xg-outer>
    </xg-progress>
    `
  }
}

export default Progress
