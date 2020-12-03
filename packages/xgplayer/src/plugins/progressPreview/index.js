import Plugin, {hooksDescriptor} from '../../plugin'
import initDotsAPI from './dotsApi'
const {Util, Sniffer} = Plugin

const CALLBACK_MAP = {
  'dragmove': 'onProgressMove',
  'dragstart': 'onProgressDragStart',
  'dragend': 'onProgressDragEnd'
}

export default class ProgressPreview extends Plugin {
  constructor (args) {
    super(args)
    this._ispots = []
    this.videoPreview = null
    this.videothumbnail = null
    this.thumbnail = null
    this._state = {
      now: 0,
      f: false
    }
  }

  static get pluginName () {
    return 'progresspreview'
  }

  static get defaultConfig () {
    return {
      index: 1,
      miniWidth: 6,
      ispots: [],
      defaultText: '',
      isFocusDots: true,
      isShowThumbnail: true,
      isShowCoverPreview: false, // 进度条拖动时是否显示播放区域预览图
      mode: '' // short // production
    }
  }

  beforeCreate (args) {
    const progress = args.player.plugins.progress
    if (progress) {
      args.root = progress.root
    }
  }

  onPluginsReady () {
    const {player} = this
    if (!player.plugins.progress) {
      return
    }
    this.previewLine = this.find('.xg-spot-line')
    this.timePoint = this.find('.xgplayer-progress-point')
    this.timeText = this.find('.xg-spot-time')
    this.tipText = this.find('.spot-inner-text')

    this.registerThumbnail()
    initDotsAPI(this)

    this.bindEvents()
  }

  afterCreate () {
    hooksDescriptor(this)
  }

  bindEvents () {
    const {progress} = this.player.plugins
    if (Sniffer.device === 'mobile' || !progress) {
      return
    }
    Object.keys(CALLBACK_MAP).map(key => {
      this[CALLBACK_MAP[key]] = this[CALLBACK_MAP[key]].bind(this)
      progress.addCallBack(key, this[CALLBACK_MAP[key]])
    })

    this.bind('.xg-spot-info', 'mousemove', this.onMousemove)

    this.bind('.xg-spot-info', 'mousedown', this.onMousedown)

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
    if (this._state.f || Util.hasClass(e.target, 'xg-spot-content')) {
      Util.event(e)
      e.stopPropagation()
    }
  }

  onMousedown = (e) => {
    if (this._state.f || Util.hasClass(e.target, 'xg-spot-content')) {
      Util.event(e)
      e.stopPropagation()
    }
  }
  

  onProgressMove (data) {
    this.updatePosition(data.offset, data.width, data.e)
  }

  onProgressDragStart (data) {
    this.isDrag = true
    this.videoPreview && Util.addClass(this.videoPreview, 'show')
  }

  onProgressDragEnd (data) {
    this.isDrag = false
    this.videoPreview && Util.removeClass(this.videoPreview, 'show')
  }

  updateLinePos (offset, cwidth) {
    const {root, previewLine, timePoint, player} = this
    const {mode} = player.controls
    const isflex = mode === 'flex'
    const lwidth = root.getBoundingClientRect().width
    const tWidth = timePoint.getBoundingClientRect().width
    let x = offset - lwidth / 2
    let _t, _tt
    if (x < 0 && !isflex) {
      x = 0
      _t = offset - lwidth / 2;
      !this.thumbnail && (_tt = offset - lwidth / 2 - tWidth / 2)
    } else if (x > cwidth - lwidth && !isflex) {
      _t = x - (cwidth - lwidth)
      !this.thumbnail && (_tt = x - (cwidth - lwidth) - tWidth / 2)
      x = cwidth - lwidth
    } else {
      _t = 0
      !this.thumbnail && (_tt = -tWidth / 2)
    }
    _t !== undefined && (previewLine.style.transform = `translateX(${_t}px)`)
    _tt !== undefined && (timePoint.style.transform  = `translateX(${_tt}px)`)
    root.style.transform = `translateX(${x}px)`
  }

  updateTimeText (time) {
    const {timeText, timePoint} = this
    timeText.textContent = Util.format(time)
    !this.thumbnail && (timePoint.textContent = Util.format(time))
  }

  updatePosition (offset, cwidth, e) {
    const {root, config, player, _state} = this
    if (!root) {
      return
    }

    this.updateLinePos(offset, cwidth)
    let now = offset / cwidth * player.duration
    now = now < 0 ? 0 : (now > player.duration ? player.duration : now)
    _state.now = now
    if (e && e.target && Util.hasClass(e.target, 'xgplayer-spot')) {
      const rec = e.target.getBoundingClientRect()
      this.showTips(e.target.getAttribute('data-text'))
      _state.f = true
      config.isFocusDots && _state.f && (_state.now = parseInt(e.target.getAttribute('data-time'), 10))
    } else if (config.defaultText) {
      _state.f = false
      this.showTips(config.defaultText, true)
    } else {
      _state.f = false
      this.hideTips('')
    }
    this.updateTimeText(_state.now)
    this.updateThumbnails(_state.now)
  }

  updateThumbnails (time) {
    const {player, videoPreview} = this
    const {thumbnail} = player.plugins
    if (thumbnail && thumbnail.usable) {
      this.thumbnail && thumbnail.update(this.thumbnail, time, 160, 90)
      const rect = videoPreview && videoPreview.getBoundingClientRect()
      this.videothumbnail && thumbnail.update(this.videothumbnail, time, rect.width, rect.height)
    }
  }

  registerThumbnail () {
    if (Sniffer.device === 'mobile') {
      return
    }
    const {player, config} = this
    const thumbnail = player.getPlugin('thumbnail')
    if (!thumbnail || !thumbnail.usable || !config.isShowThumbnail) {
      Util.addClass(this.root, 'short-line no-thumbnail')
      return;
    }
    const tRoot = this.find('.xg-spot-thumbnail')
    this.thumbnail = thumbnail.createThumbnail(tRoot, 'progress-thumbnail')
    if (config.isShowCoverPreview) {
      this.videoPreview = Util.createDom('xg-video-preview', '', {}, 'xgvideo-preview')
      player.root.appendChild(this.videoPreview)
      this.videothumbnail = thumbnail.createThumbnail(this.videoPreview, 'xgvideo-thumbnail')
    }
  }

  calcuPosition (time, duration) {
    const {progress} = this.player.plugins
    const {player} = this
    const totalWidth = progress.root.getBoundingClientRect().width
    const widthPerSeconds = player.duration / totalWidth * 6
    const ret = {}
    ret.left = time / player.duration * 100
    ret.width = duration / player.duration
    ret.isMini = widthPerSeconds > duration
    return {
      left: time / player.duration * 100,
      width: duration / player.duration * 100,
      isMini: duration < widthPerSeconds
    }
  }

  showDot (id) {
    const dot = this.findDot(id)
    if (dot) {
      const rect = this.root.getBoundingClientRect()
      const {width} = rect
      const offset = dot.time / this.player.duration * width
      this.updatePosition(offset, width)
    }
  }

  showTips (text, isDefault) {
    this.tipText.textContent = text
    Util.addClass(this.find('.xg-spot-content'), 'show-text')
    if (isDefault && this.config.mode === 'production') {
      Util.addClass(this.root, 'product')
    } else {
      Util.removeClass(this.root, 'product')
    }
  }

  hideTips () {
    this.tipText.textContent = ''
    Util.removeClass(this.find('.xg-spot-content'), 'show-text')
    Util.removeClass(this.root, 'product')
  }

  destroy () {
    const {progress} = this.player.plugins
    progress && Object.keys(CALLBACK_MAP).map(key => {
      progress.removeCallBack(key, this[CALLBACK_MAP[key]])
    })
    this.videothumbnail = null
    this.thumbnail = null
    this.videoPreview && this.player.root.removeChild(this.videoPreview)
    this.unbind('.xg-spot-info', 'mousemove', this.onMousemove)
    this.unbind('.xg-spot-info', 'mousedown', this.onMousedown)
    this.unbind('.xg-spot-content', 'mouseup', this.handlerPreviewClick)
  }

  render () {
    if (Sniffer.device === 'mobile') {
      return ''
    }

    return `<div class="xg-spot-info ${this.config.mode === 'short' ? 'short-line' : ''}">
      <div class="xg-spot-content">
      <div class="xg-spot-thumbnail">
        <span class="xg-spot-time"></span>
        </div>
          <div class="xg-spot-text"><span class="spot-inner-text"></span></div>
      </div>
      <div class="xgplayer-progress-point">00:00</div>
      <div class="xg-spot-line"></div>
    </div>`
  }
}
