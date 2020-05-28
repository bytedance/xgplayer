import Plugin from '../../plugin'
import ProgressDots from './progressdots'

const {Events, Util, POSITIONS, Sniffer} = Plugin

const defaultThumbnailConfig = {
  isShow: false,
  urls: [],
  pic_num: 0,
  row: 0,
  col: 0,
  height: 160,
  width: 90,
  scale: 1
}

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
      closeMoveSeek: false // 是否关闭滑块seek能力
    }
  }

  constructor (args) {
    super(args)
    this.useable = false
    this.isProgressMoving = false
    this.__dragCallBacks = []
    if (Sniffer.device !== 'mobile' && this.playerConfig.thumbnail) {
      this.config.thumbnail = this.playerConfig.thumbnail
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
    this.thumbnailDom = this.find('xg-thumbnail')
    this.initThumbnail()
    this.on(Events.TIME_UPDATE, () => {
      this.onTimeupdate()
      this.onCacheUpdate()
    });
    this.on(Events.SEEKING, () => {
      this.onTimeupdate()
      this.onCacheUpdate()
    });
    this.on([Events.BUFFER_CHANGE, Events.ENDED], () => {
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

  addDragCallBack (type, event) {
    if (event && typeof event === 'function') {
      this.__dragCallBacks.push({type: type, handler: event})
    }
  }

  initThumbnail () {
    if (this.config.thumbnail) {
      const {thumbnail} = this.config
      this.thumbnailConfig = {}
      Object.keys(defaultThumbnailConfig).map(key => {
        if (typeof thumbnail[key] === 'undefined') {
          this.thumbnailConfig[key] = defaultThumbnailConfig[key]
        } else {
          this.thumbnailConfig[key] = thumbnail[key]
        }
      })
      const {width, height, scale} = this.thumbnailConfig
      this.thumbnailDom.style.width = `${width * scale}px`
      this.thumbnailDom.style.height = `${height * scale}px`
    }
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
    const {player} = this
    if (player.isMini || this.config.closeMoveSeek) {
      return
    }
    e.preventDefault()
    e.stopPropagation()
    Util.event(e)
    // this.pointTip为tip信息 不做seek操作
    if (e.target === this.pointTip || (!player.config.allowSeekAfterEnded && player.ended)) {
      return true
    }
    this.player.emit(Events.PLAYER_FOCUS, true)
    this.isProgressMoving = true
    Util.addClass(this.progressBtn, 'btn-move')
    this.computeWidth(e, false)
    const move = (e) => {
      e.preventDefault()
      e.stopPropagation()
      Util.event(e)
      this.isProgressMoving = true
      this.computeWidth(e, true)
    }

    const up = (e) => {
      e.preventDefault()
      e.stopPropagation()
      Util.event(e)
      Util.removeClass(this.progressBtn, 'btn-move')
      if (Sniffer.device === 'mobile') {
        this.root.removeEventListener('touchmove', move)
        this.root.removeEventListener('touchend', up)
      } else {
        this.root.removeEventListener('mousemove', move)
        this.root.removeEventListener('mouseup', up)
      }
      this.computeWidth(e, false)
      setTimeout(() => {
        this.isProgressMoving = false
      }, 10)
      this.triggerCallbacks('dragend', {})
      this.player.emit(Events.PLAYER_FOCUS)
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
    const {player} = this
    if (player.isMini) {
      return
    }
    this.pointTip.style.display = 'none'
    this.thumbnailDom.style.display = 'none'
    this.root.removeEventListener('mousemove', this.mouseMove, false)
    this.root.removeEventListener('mouseleave', this.mouseLeave, false)
  }

  mouseMove (e) {
    const {player} = this
    let left = this.root.getBoundingClientRect().left
    let width = this.root.getBoundingClientRect().width
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
    this.updateThumbnailPosition(e, now, width)
  }

  updateThumbnailPosition (e, now, containerWidth) {
    if (!this.config.thumbnail) {
      return;
    }
    const thumbnail = this.thumbnailConfig
    if (!thumbnail || !thumbnail.pic_num === 0 || thumbnail.urls.length === 0) {
      return
    }
    this.interval = this.player.duration / thumbnail.pic_num
    let index = Math.floor(now / this.interval)
    const {urls, row, col, height, width, scale} = thumbnail
    const indexInPage = index + 1 - (col * row) * (Math.ceil((index + 1) / (col * row)) - 1)
    const rowIndex = Math.ceil(indexInPage / row) - 1
    const colIndex = indexInPage - rowIndex * row - 1
    let left = e.clientX - width * scale / 2
    left = left > 0 ? left : 0
    left = left < containerWidth - width * scale ? left : containerWidth - width * scale
    const style = {
      backgroundImage: `url(${urls[Math.ceil((index + 1) / (col * row)) - 1]})`,
      'background-position': `-${colIndex * width}px -${rowIndex * height}px`,
      left: `${left}px`,
      top: `${-10 - height * scale}px`,
      display: 'block'
    }
    Object.keys(style).map((key) => {
      this.thumbnailDom.style[key] = style[key]
    })
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
    let timeIcon = player.plugins.time
    if (time) {
      timeIcon.updateTime(time)
    }
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
    let buffered = player.buffered
    if (buffered && buffered.length > 0) {
      let end = buffered.end(buffered.length - 1)
      for (let i = 0, len = buffered.length; i < len; i++) {
        if (player.currentTime >= buffered.start(i) && player.currentTime <= buffered.end(i)) {
          end = buffered.end(i)
          for (let j = i + 1; j < buffered.length; j++) {
            if (buffered.start(j) - buffered.end(j - 1) >= 2) {
              end = buffered.end(j - 1)
              break
            }
          }
          break
        }
      }
      this.cachedBar.style.width = `${end / player.duration * 100}%`
    }
  }

  destroy () {
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
            <xg-thumbnail class="xgplayer-progress-thumbnail xg-tips"></xg-thumbnail>
          </xg-played>
        </xg-outer>
      </xg-progress>
    `
  }
}

export default Progress
