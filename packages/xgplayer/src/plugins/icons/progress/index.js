import Plugin from '../../../plugin'
import ProgressDots from './progressdots'
import './index.scss'

const {Events, Util} = Plugin
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
    return 'Progress'
  }

  static get defaultConfig () {
    return {
      progressDot: []
    }
  }

  constructor (args) {
    super(args)
    this.useable = false
    this.isProgressMoving = false
  }

  changeState (useable = true) {
    this.useable = useable
  }

  afterCreate () {
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
          dots: this.playerConfig.progressDot
        }
      }
    }
  }

  initThumbnail () {
    if (this.playerConfig.thumbnail) {
      const {thumbnail} = this.playerConfig
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
    this.mouseLeave = this.mouseLeave.bind(this);
    ['touchstart', 'mousedown'].forEach(event => {
      this.el.addEventListener(event, this.mouseDown);
    })
    this.el.addEventListener('mouseenter', this.mouseEnter, false)
  }

  mouseDown (e) {
    const {player} = this
    const self = this
    e.stopPropagation()
    Util.event(e)
    // this.pointTip为tip信息 不做seek操作
    if (e.target === this.pointTip || (!player.config.allowSeekAfterEnded && player.ended)) {
      return true
    }
    this.el.focus()
    const containerWidth = this.el.getBoundingClientRect().width
    let {left} = this.playedBar.getBoundingClientRect()
    let move = function (e) {
      e.preventDefault()
      e.stopPropagation()
      Util.event(e)
      self.isProgressMoving = true
      let w = e.clientX - left
      if (w > containerWidth) {
        w = containerWidth
      }
      let now = w / containerWidth * player.duration
      self.playedBar.style.width = `${w * 100 / containerWidth}%`

      if (player.videoConfig.mediaType === 'video' && !player.dash && !player.config.closeMoveSeek) {
        player.currentTime = Number(now).toFixed(1)
      } else {
        self.updateTime(now)
      }
      player.emit('focus')
    }
    let up = function (e) {
      // e.preventDefault()
      e.stopPropagation()
      Util.event(e)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('touchmove', move, { passive: false })
      window.removeEventListener('mouseup', up)
      window.removeEventListener('touchend', up)
      self.el.blur()
      if (!self.isProgressMoving || player.videoConfig.mediaType === 'audio' || player.dash || player.config.closeMoveSeek) {
        let w = e.clientX - left
        if (w > containerWidth) {
          w = containerWidth
        }
        let now = w / containerWidth * player.duration
        self.playedBar.style.width = `${w * 100 / containerWidth}%`
        player.currentTime = Number(now).toFixed(1)
      }
      player.emit('focus')
      self.isProgressMoving = false
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('touchmove', move, { passive: false })
    window.addEventListener('mouseup', up)
    window.addEventListener('touchend', up)
    return true
  }

  mouseEnter (e) {
    console.log('mouseEnter')
    const {player} = this
    if (!player.config.allowSeekAfterEnded && player.ended) {
      return true
    }
    this.el.addEventListener('mousemove', this.mouseMove, false)
    this.el.addEventListener('mouseleave', this.mouseLeave, false)
  }

  mouseLeave (e) {
    console.log('mouseLeave')
    this.pointTip.style.display = 'none'
    this.thumbnailDom.style.display = 'none'
    this.el.removeEventListener('mousemove', this.mouseMove, false)
    this.el.removeEventListener('mouseleave', this.mouseLeave, false)
  }

  mouseMove (e) {
    const {player} = this
    let left = this.el.getBoundingClientRect().left
    let width = this.el.getBoundingClientRect().width
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
    const thumbnail = this.thumbnailConfig
    if (!thumbnail.pic_num === 0 || thumbnail.urls.length === 0) {
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

  updateTime (time) {
    const {player} = this
    let timeIcon = player.plugins.timeicon
    console.log('uopdateTime', timeIcon)
    if (timeIcon) {
      timeIcon.updateTime(time)
    }
  }

  compute (e) {
    const containerLeft = this.el.getBoundingClientRect().left
    const containerWidth = this.el.getBoundingClientRect().width
    const pointWidth = this.pointTip.getBoundingClientRect().width
    let left = e.clientX - containerLeft - pointWidth / 2
    left = left > 0 ? left : 0
    left = left > containerWidth - pointWidth ? containerWidth - pointWidth : left
    this.pointTip.style.left = `${left}px`
  }

  onTimeupdate () {
    const {player} = this
    if (player.isSeeking) {
      return;
    }
    if (player.videoConfig.mediaType !== 'audio' || !this.isProgressMoving || !player.dash) {
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
    ['touchstart', 'mousedown'].forEach(event => {
      this.el.removeEventListener(event, this.mouseDown);
    })
    this.el.removeEventListener('mouseenter', this.mouseEnter, false)
  }

  render () {
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
