import Plugin from '../../plugin'
import ProgressDots from './progressdots'
import Thumbnail from '../common/thumbnail'

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

  afterCreate () {
    if (this.config.disable) {
      return;
    }
    if (Sniffer.device === 'mobile') {
      this.config.isDragingSeek = false
    }
    this.playedBar = this.find('.xgplayer-progress-played')
    this.cachedBar = this.find('.xgplayer-progress-cache')
    this.pointTip = this.find('.xgplayer-progress-point')
    this.progressBtn = this.find('.xgplayer-progress-btn')
    this.initCustomStyle()
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
    const {playedColor, cachedColor, sliderBtnStyle, progressColor} = commonStyle
    const {playedBar, cachedBar, progressBtn} = this
    if (playedColor) {
      playedBar.style.backgroundImage = 'initilal';
      playedBar.style.background = playedColor;
    }
    if (cachedColor) {
      cachedBar.style.background = cachedColor;
    }

    if (progressColor) {
      this.find('.xgplayer-progress-outer').style.backgroundColor = progressColor;
    }

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
      }
      Util.checkIsFunction(config.onMoveEnd) && config.onMoveEnd()
      this.computeWidth(e, false)
      setTimeout(() => {
        this.resetSeekState()
      }, 10)
      this.triggerCallbacks('dragend', {})
      player.emit(Events.PLAYER_FOCUS)
    }

    if (Sniffer.device === 'mobile') {
      this.root.addEventListener('touchmove', move, false)
      this.root.addEventListener('touchend', up, false)
    } else {
      this.root.addEventListener('mousemove', move)
      this.root.addEventListener('mouseup', up)
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

  computeWidth (e, isMove) {
    const containerWidth = this.root.getBoundingClientRect().width
    const {player, config} = this
    let {left} = this.playedBar.getBoundingClientRect()
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
    if (!isMove || config.isDragingSeek) {
      if (player.videoConfig.mediaType === 'video') {
        player.seek(Number(now).toFixed(1))
      }
    }
  }

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

  resetSeekState () {
    this.isProgressMoving = false
    let timeIcon = this.player.plugins.time
    timeIcon && timeIcon.resetActive()
  }

  updatePercent (percent, notSeek) {
    this.isProgressMoving = true
    if (this.config.disable) {
      return;
    }
    this.playedBar.style.width = `${percent * 100}%`
  }

  compute (e) {
    const containerLeft = this.root.getBoundingClientRect().left
    const containerWidth = this.root.getBoundingClientRect().width
    const pointWidth = this.pointTip.getBoundingClientRect().width
    let left = e.clientX - containerLeft - pointWidth / 2
    left = left > 0 ? left : 0
    left = left > containerWidth - pointWidth ? containerWidth - pointWidth : left
    this.pointTip.style.left = `${left}px`
  }

  triggerCallbacks (type, data) {
    if (this.__dragCallBacks.length > 0) {
      this.__dragCallBacks.map(item => {
        item.type === type && item.handler(data)
      })
    }
  }

  onTimeupdate () {
    const {player} = this
    if (player.isSeeking || this.isProgressMoving) {
      return;
    }
    if (player.videoConfig.mediaType !== 'audio' || !player.dash) {
      this.playedBar.style.width = `${player.currentTime * 100 / player.duration}%`
    }
  }

  onCacheUpdate () {
    const {player} = this
    const point = player.bufferedPoint
    this.cachedBar.style.width = `${point.end / player.duration * 100}%`
  }

  destroy () {
    this.thumbnailPlugin = null
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
          <xg-cache class="xgplayer-progress-cache" style="width:0">
          </xg-cache>
          <xg-played class="xgplayer-progress-played" style="width:0">
            <xg-progress-btn class="xgplayer-progress-btn"></xg-progress-btn>
            <xg-point class="xgplayer-progress-point xg-tips">00:00</xg-point>
          </xg-played>
        </xg-outer>
      </xg-progress>
    `
  }
}

export default Progress
