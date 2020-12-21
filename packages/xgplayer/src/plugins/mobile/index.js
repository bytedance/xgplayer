import Plugin, {Events, Util} from '../../plugin'
// import Thumbnail from '../common/thumbnail'

const ACTIONS = {AUTO: 'auto', SEEKING: 'seeking'}

class MobilePlugin extends Plugin {
  static get pluginName () {
    return 'mobile'
  }

  static get defaultConfig () {
    return {
      stopPropagation: true, // 是否阻止冒泡
      index: 0,
      disableGesture: false, // 是否禁用手势
      gestureX: true, // 是否启用水平手势
      gestureY: true, // 是否启用垂直手势
      updateGesture: () => {}, // 手势处理回调
      onTouchStart: () => {}, // 手势开始移动回调
      onTouchEnd: () => {}, // 手势移动结束回调
      gradient: 'normal', // 是否启用阴影
      isTouchingSeek: false, // 是否在touchMove的同时更新currentTime
      miniMoveStep: 10, // 最小差异，用于move节流
      scopeL: 0.4, // 左侧手势范围比例
      scopeR: 0.4, // 右侧手势范围比例
      darkness: true, // 是否启用右侧调暗功能
      maxDarkness: 0.6, // 调暗最大暗度，即蒙层最大透明度
      disableActive: false, // 是否禁用时间面板
      disableTimeProgress: false, // 是否禁用时间进度条
      hideControlsActive: true, // 手势拖动的时候是否隐控制栏
      hideControlsEnd: false // 手势结束的时候隐控制栏
    }
  }

  constructor (options) {
    super(options)
    this.isTouchMove = false
    this.isTouchStart = false
    this.pos = {
      x: 0,
      y: 0,
      time: 0,
      volume: 0,
      light: 0,
      width: 0,
      height: 0,
      scopeL: 0,
      scopeR: 0,
      op: 0
    }
  }

  afterCreate () {
    const {playerConfig, config, player} = this
    if (!Util.isUndefined(playerConfig.disableGesture)) {
      config.disableGesture = !!playerConfig.disableGesture
    }

    this.xgMask = Util.createDom('xg-mask', '', {}, 'xgmask')
    player.root.appendChild(this.xgMask)

    this.initCustomStyle()

    this.registerThumbnail()

    this.onTouchMove = this.onTouchMove.bind(this)
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
    this.root.addEventListener('touchstart', this.onTouchStart)

    if (!config.disableActive) {
      // 添加进度条拖拽事件回调
      const progressPlugin = player.plugins.progress
      if (progressPlugin) {
        progressPlugin.addCallBack('dragmove', (data) => {
          this.activeSeekNote(data.currentTime)
        })
        progressPlugin.addCallBack('dragend', () => {
          this.changeAction(ACTIONS.AUTO)
        })
      }
    }
  }

  registerThumbnail () {
    const {player} = this
    const {thumbnail} = player.plugins
    if (thumbnail && thumbnail.usable) {
      this.thumbnailPlugin = thumbnail.createThumbnail(null, 'mobile-thumbnail')
      const timePreview = this.find('.time-preview')
      timePreview.insertBefore(this.thumbnailPlugin, timePreview.children[0])
    }
  }

  initCustomStyle () {
    const {commonStyle} = this.playerConfig || {}
    const {playedColor, progressColor} = commonStyle
    if (playedColor) {
      this.find('.curbar').style.backgroundColor = playedColor
      this.find('.cur').style.color = playedColor
    }
    if (progressColor) {
      this.find('.bar').style.backgroundColor = progressColor
      this.find('.time-preview').style.color = progressColor
    }
    this.config.disableTimeProgress && Util.addClass(this.find('.bar'), 'hide')
  }

  changeAction (action) {
    this.root.setAttribute('data-xg-action', action)
  }

  getTouche (touches) {
    if (touches && touches.length > 0) {
      return touches[touches.length - 1]
    } else {
      return null
    }
  }

  onTouchStart (e) {
    const {player, config, pos, playerConfig} = this
    // 直播或者duration没有获取到之前不做操作
    if (this.isTouchStart) {
      return true
    }
    this.isTouchStart = true
    const touche = this.getTouche(e.touches)

    if (touche && !config.disableGesture && player.duration > 0) {
      // if (config.stopPropagation) {
      //   e.preventDefault()
      //   e.stopPropagation()
      // }
      Util.checkIsFunction(playerConfig.disableSwipeHandler) && playerConfig.disableSwipeHandler()
      this.find('.dur').innerHTML = Util.format(player.duration)
      pos.x = parseInt(touche.pageX, 10)
      pos.y = parseInt(touche.pageY, 10)
      pos.time = player.currentTime * 1000
      pos.volume = player.volume * 100
      pos.width = parseInt(Util.getCss(this.root, 'width'), 10)
      pos.height = parseInt(Util.getCss(this.root, 'height'), 10) - 48
      pos.scopeL = config.scopeL * pos.width
      pos.scopeR = (1 - config.scopeR) * pos.width
      this.root.addEventListener('touchmove', this.onTouchMove, false)
      this.root.addEventListener('touchend', this.onTouchEnd, false)
    } else {
      this.root.addEventListener('touchend', this.onTouchEnd, false)
    }
  }

  onTouchMove (e) {
    const touche = this.getTouche(e.touches)
    const {pos, config, player} = this
    if (!touche || config.disableGesture) {
      return
    }
    if (Math.abs(touche.pageX - this.pos.x) > this.config.miniMoveStep || Math.abs(touche.pageY - pos.y) > this.config.miniMoveStep) {
      !config.hideControlsActive ? player.emit(Events.PLAYER_FOCUS, {autoHide: false}) : player.emit(Events.PLAYER_BLUR)
      const x = parseInt(touche.pageX, 10)
      const y = parseInt(touche.pageY, 10)
      const diffx = x - pos.x
      const diffy = y - pos.y
      const tan = Math.abs(diffy) / Math.abs(diffx)
      if (config.gestureY && tan > 1.73 && (x < pos.scopeL || x > pos.scopeR)) {
        if (x < pos.scopeL && config.darkness) {
          pos.op = 3
          this.updateBrightness(diffy / pos.height)
        } else {
          pos.op = 2
          this.updateVolume(diffy / pos.height)
        }
      } else if (config.gestureX && tan < 0.27) {
        pos.op = 1
        this.updateTime(diffx / pos.width)
      } else {
        pos.op = 0
      }
      Util.stopPropagation(e)
      pos.x = x
      pos.y = y
      if (config.updateGesture && typeof config.updateGesture === 'function') {
        config.updateGesture({diffx: diffx, diffy: diffy, x: x, y: y}, pos)
      }
      this.isTouchMove = true
    }
  }

  onTouchEnd (e) {
    const {root, player, pos, config, playerConfig} = this
    root.removeEventListener('touchmove', this.onTouchMove, false)
    root.removeEventListener('touchend', this.onTouchEnd, false)
    !config.disableGesture && Util.checkIsFunction(playerConfig.enableSwipeHandler) && playerConfig.enableSwipeHandler()
    if (this.isTouchMove) {
      if (config.stopPropagation) {
        Util.stopPropagation(e)
      }
      const time = pos.time / 1000
      if (pos.op === 1) {
        player.seek(Number(time).toFixed(1))
      }
      setTimeout(() => {
        player.getPlugin('progress') && player.getPlugin('progress').resetSeekState()
      }, 10)
      pos.op = 0
      !config.hideControlsEnd && this.player.emit(Events.PLAYER_FOCUS)
    } else {
      if (player.isActive && config.stopPropagation) {
        Util.stopPropagation(e)
      }
      if (!playerConfig.closeVideoClick && player.isActive) {
        e.cancelable && this.switchPlayPause(e)
      } else {
        if (player.isActive) {
          this.player.emit(Events.PLAYER_BLUR)
        } else {
          this.player.emit(Events.PLAYER_FOCUS)
        }
      }
    }
    this.changeAction(ACTIONS.AUTO)
    this.isTouchStart = false
    this.isTouchMove = false
  }

  updateTime (percent) {
    const {player} = this
    percent = Number(percent.toFixed(4))
    let time = parseInt(percent * player.duration * 1000, 10)
    time += this.pos.time
    time = time < 0 ? 0 : (time > player.duration * 1000 ? player.duration * 1000 : time)
    player.getPlugin('time') && player.getPlugin('time').updateTime(time / 1000)
    player.getPlugin('progress') && player.getPlugin('progress').updatePercent(time / 1000 / this.player.duration, true)
    this.activeSeekNote(time / 1000)
    // 在滑动的同时实时seek
    if (this.config.isTouchingSeek) {
      // player.currentTime = time / 1000
      player.seek(Number(time / 1000).toFixed(1))
    }
    this.pos.time = time
  }

  updateVolume (percent) {
    const {pos, player} = this
    const volume = pos.volume - parseInt(percent * 100)
    pos.volume = volume < 1 ? 0 : (volume > 100 ? 100 : volume)
    player.volume = pos.volume / 100
    pos.volume > 0 && (player.muted = false)
  }

  updateBrightness (percent) {
    const {pos, config, xgMask} = this
    let light = pos.light - (0.8 * percent)
    light = light > config.maxDarkness ? config.maxDarkness : (light < 0 ? 0 : light)
    if (xgMask) {
      xgMask.style.backgroundColor = `rgba(0,0,0,${light})`
    }
    pos.light = light
  }

  activeSeekNote (time) {
    const {player, config} = this
    const isLive = !(player.duration !== Infinity && player.duration > 0)
    if (!time || typeof time !== 'number' || isLive || config.disableActive) {
      return
    }
    if (time < 0) {
      time = 0
    } else if (time > this.player.duration) {
      time = this.player.duration
    }
    this.changeAction(ACTIONS.SEEKING)
    this.find('.dur').innerHTML = Util.format(player.duration)
    this.find('.cur').innerHTML = Util.format(time)
    this.find('.curbar').style.width = `${time / player.duration * 100}%`
    const {thumbnail} = player.plugins
    thumbnail && thumbnail.usable && this.thumbnailPlugin && thumbnail.update(this.thumbnailPlugin, time, 160, 90)
  }

  switchPlayPause () {
    const {player} = this
    if (!player.hasStart) {
      return false
    } else if (!player.ended) {
      if (player.paused) {
        player.play()
      } else {
        player.pause()
      }
    }
  }

  destroy () {
    const {root, player} = this
    this.thumbnailPlugin = null
    player.root.removeChild(this.xgMask)
    this.xgMask = null
    root.removeEventListener('touchstart', this.onTouchStart)
    root.removeEventListener('touchmove', this.onTouchMove, false)
    root.removeEventListener('touchend', this.onTouchEnd, false)
  }

  render () {
    const className = this.config.gradient !== 'normal' ? `gradient ${this.config.gradient}` : 'gradient'
    return `
     <xg-trigger class="trigger">
     <div class="${className}"></div>
        <div class="time-preview">
            <span class="cur">00:00</span>
            <span>/</span>
            <span class="dur">00:00</span>
            <div class="bar timebar">
              <div class="curbar"></div>
            </class>
        </div>
     </xg-trigger>
    `
  }
}

export default MobilePlugin
