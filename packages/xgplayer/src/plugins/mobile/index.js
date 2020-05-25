import Plugin from '../../plugin'

const {Events, Util} = Plugin
const ACTIONS = {AUTO: 'auto', SEEKING: 'seeking'}

class MobilePlugin extends Plugin {
  static get pluginName () {
    return 'mobile'
  }

  static get defaultConfig () {
    return {
      index: 0,
      disableGesture: false, // 是否禁用手势
      gestureX: true, // 是否启用水平手势
      gestureY: true, // 是否启用垂直手势
      updateGesture: () => {}, // 手势处理回调
      gradient: 'normal', // 是否启用阴影
      isTouchingSeek: false, // 是否在touchMove的同时更新currentTime
      miniMoveStep: 5, // 最小差异，用于move节流
      scopeL: 0.4, // 左侧手势范围比例
      scopeR: 0.4, // 右侧手势范围比例
      darkness: true, // 是否启用右侧调暗功能
      maxDarkness: 0.6, // 调暗最大暗度，即蒙层最大透明度
      disableActive: false // 事件面板
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
    this.config.disableGesture = !!this.playerConfig.disableGesture

    this.xgMask = Util.createDom('xg-mask', '', {}, 'xgmask')
    player.root.appendChild(this.xgMask)

    this.onTouchMove = this.onTouchMove.bind(this)
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
    this.root.addEventListener('touchstart', this.onTouchStart)
    this.once(Events.AUTOPLAY_PREVENTED, () => {
      this.onAutoPlayPrevented()
    })
    this.once(Events.CANPLAY, this.onEntered.bind(this))
    if (playerConfig.autoplay) {
      this.onEnter()
    }
    if (!config.disableActive) {
      // 添加进度条拖拽事件回调
      const progressPlugin = player.plugins.progress
      if (progressPlugin) {
        progressPlugin.addDragCallBack('drag', (data) => {
          this.activeSeekNote(data.currentTime)
        })
        progressPlugin.addDragCallBack('dragend', () => {
          this.changeAction(ACTIONS.AUTO)
        })
      }
    }
  }

  changeAction (action) {
    this.root.setAttribute('data-xg-action', action)
  }

  onEnter () {
    const { player } = this
    Util.addClass(player.root, 'xgplayer-is-enter')
  }

  onEntered () {
    const { player } = this
    Util.removeClass(player.root, 'xgplayer-is-enter')
  }

  onAutoPlayPrevented () {
    const { player } = this
    Util.removeClass(player.root, 'xgplayer-is-enter')
    this.once(Events.PLAY, () => {
      Util.addClass(player.root, 'xgplayer-is-enter')
      this.once(Events.TIME_UPDATE, () => {
        Util.removeClass(player.root, 'xgplayer-is-enter')
      })
    })
  }

  getTouche (touches) {
    if (touches && touches.length > 0) {
      return touches[touches.length - 1]
    } else {
      return null
    }
  }

  onTouchStart (e) {
    const {player, config, pos} = this
    // 直播或者duration没有获取到之前不做操作
    if (!(player.duration !== Infinity && player.duration > 0) || this.isTouchStart || config.disableGesture) {
      return
    }
    this.find('.dur').innerHTML = Util.format(player.duration)
    this.isTouchStart = true
    e.preventDefault()
    e.stopPropagation()
    const touche = this.getTouche(e.touches)
    if (touche) {
      pos.x = parseInt(touche.pageX, 10)
      pos.y = parseInt(touche.pageY, 10)
      pos.time = player.currentTime * 1000
      pos.volume = player.volume
      pos.width = parseInt(Util.getCss(this.root, 'width'), 10)
      pos.height = parseInt(Util.getCss(this.root, 'height'), 10) - 48
      pos.scopeL = config.scopeL * pos.width
      pos.scopeR = (1 - config.scopeR) * pos.width
      this.root.addEventListener('touchmove', this.onTouchMove, false)
      this.root.addEventListener('touchend', this.onTouchEnd, false)
    }
  }

  onTouchMove (e) {
    e.preventDefault()
    e.stopPropagation()
    const touche = this.getTouche(e.touches)
    if (!touche) {
      return
    }
    if (Math.abs(touche.pageX - this.pos.x) > this.config.miniMoveStep || Math.abs(touche.pageX - this.pos.x) > this.config.miniMoveStep) {
      this.player.emit(Events.PLAYER_FOCUS, true)
      const {pos, config} = this
      const x = parseInt(touche.pageX, 10)
      const y = parseInt(touche.pageY, 10)
      const diffx = x - pos.x
      const diffy = y - pos.y
      const tan = Math.abs(diffy) / Math.abs(diffx)
      if (config.gestureY && tan > 1.73 && (x < pos.scopeL || x > pos.scopeR)) {
        if (x < pos.scopeL && config.darkness) {
          pos.op = 3
          this.updateBrightness(diffy / this.pos.height)
        } else {
          pos.op = 2
          this.updateVolume(diffy / this.pos.height)
        }
      } else if (config.gestureX && tan < 0.27) {
        pos.op = 1
        this.updateTime(diffx / pos.width)
      }
      pos.x = x
      pos.y = y
      if (config.updateGesture && typeof config.updateGesture === 'function') {
        config.updateGesture({diffx: diffx, diffy: diffy, x: x, y: y}, pos)
      }
      this.isTouchMove = true
    }
  }

  onTouchEnd (e) {
    e.preventDefault()
    e.stopPropagation()
    const {root, player, pos} = this
    root.removeEventListener('touchmove', this.onTouchMove, false)
    root.removeEventListener('touchend', this.onTouchEnd, false)
    if (this.isTouchMove) {
      const time = pos.time / 1000
      if (pos.op === 1) {
        if (time > player.duration) {
          player.currentTime = player.duration
        } else {
          player.currentTime = time < 0 ? 0 : time
        }
        this.once(Events.CANPLAY, () => {
          this.player.isSeeking = false
        })
      }
      setTimeout(() => {
        player.getPlugin('progress') && (player.getPlugin('progress').isProgressMoving = false)
      }, 0)
      pos.op = 0
      this.player.emit(Events.PLAYER_FOCUS)
    } else {
      if (!this.playerConfig.closeVideoClick && player.isActive) {
        this.switchPlayPause(e)
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
      player.currentTime = time / 1000
    }
    this.pos.time = time
  }

  updateVolume (percent) {
    let volume = this.pos.volume - percent
    this.pos.volume = volume < 0.1 ? 0 : (volume > 1 ? 1 : volume)
    this.player.volume = this.pos.volume
    this.pos.volume > 0 && (this.player.muted = false)
  }

  updateBrightness (percent) {
    let light = this.pos.light - (0.8 * percent)
    light = light > this.config.maxDarkness ? this.config.maxDarkness : (light < 0 ? 0 : light)
    if (this.xgMask) {
      this.xgMask.style.backgroundColor = `rgba(0,0,0,${light})`
    }
    this.pos.light = light
  }

  activeSeekNote (time) {
    if (!time || typeof time !== 'number' || this.config.disableActive) {
      return
    }
    this.changeAction(ACTIONS.SEEKING)
    this.find('.cur').innerHTML = Util.format(time)
    // Util.addClass(this.player.root, 'xgplayer-seeking')
    this.find('.curbar').style.width = `${time / this.player.duration * 100}%`
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

  render () {
    const className = this.config.gradient !== 'normal' ? `gradient ${this.config.gradient}` : 'gradient'
    return `
     <xg-trigger class="trigger">
     <div class="${className}"></div>
     <div class="timenote">
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
