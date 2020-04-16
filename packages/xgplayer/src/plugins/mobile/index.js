import Plugin from '../../plugin';

const {Events, Util} = Plugin

class MobilePlugin extends Plugin {
  static get pluginName () {
    return 'mobile';
  }

  static get defaultConfig () {
    return {
      index: 0,
      disableGesture: false, // 是否禁用手势
      gestureX: true, // 是否启用水平手势
      gestureY: true, // 是否启用垂直手势
      updateGesture: () => {}, // 手势处理回调
      gradient: true, // 是否启用阴影
      isTouchingSeek: false, // 是否在touchMove的同时更新currentTime
      miniMoveStep: 5, // 最小差异，用于move节流
      scopeL: 0.4, // 左侧手势范围比例
      scopeR: 0.4, // 右侧手势范围比例
      darkness: true, // 是否启用右侧调暗功能
      maxDarkness: 0.6 // 调暗最大暗度，即蒙层最大透明度
    }
  }

  constructor (options) {
    super(options);
    this.isTouchMove = false;
    this.isMoving = false
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
    const {playerConfig} = this
    this.config.disableGesture = !!this.playerConfig.disableGesture

    this.xgMask = Util.createDom('xg-mask', '', {}, 'xgmask')
    this.player.root.appendChild(this.xgMask)

    this.onTouchMove = this.onTouchMove.bind(this)
    this.onTouchStart = this.onTouchStart.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
    this.onClick = this.onClick.bind(this)
    this.root.addEventListener('touchstart', this.onTouchStart)
    this.root.addEventListener('click', this.onClick, false)
    this.once(Events.AUTOPLAY_PREVENTED, () => {
      this.onAutoPlayPrevented()
    })
    this.once(Events.CANPLAY, this.onEntered.bind(this));
    if (playerConfig.autoplay) {
      this.onEnter()
    }
  }

  onEnter () {
    const { player } = this;
    Util.addClass(player.root, 'xgplayer-is-enter')
  }

  onEntered () {
    const { player } = this;
    Util.removeClass(player.root, 'xgplayer-is-enter')
  }

  onAutoPlayPrevented () {
    const { player } = this;
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
    const {player, config} = this
    // 直播或者duration没有获取到之前不做操作
    if (!(this.player.duration !== Infinity && this.player.duration > 0) || this.isMoving || config.disableGesture) {
      return;
    }
    this.isMoving = true
    const touche = this.getTouche(e.touches)
    if (touche) {
      this.pos.time = player.currentTime
      this.pos.volume = player.volume
      this.pos.width = parseInt(Util.getCss(this.root, 'width'), 10)
      this.pos.height = parseInt(Util.getCss(this.root, 'height'), 10) - 48
      this.pos.scopeL = config.scopeL * this.pos.width
      this.pos.scopeR = (1 - config.scopeR) * this.pos.width
      this.root.addEventListener('touchmove', this.onTouchMove, false)
      this.root.addEventListener('touchend', this.onTouchEnd, false)
      this.player.emit(Events.PLAYER_FOCUS, true)
    }
  }

  onTouchMove (e) {
    const touche = this.getTouche(e.touches)
    if (!touche) {
      return
    }
    if (Math.abs(touche.pageX - this.pos.x) > this.config.miniMoveStep || Math.abs(touche.pageX - this.pos.x) > this.config.miniMoveStep) {
      const {pos, config} = this
      const x = parseInt(touche.pageX, 10)
      const y = parseInt(touche.pageY, 10)
      const diffx = x - this.pos.x
      const diffy = y - this.pos.y
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
    }
  }

  onTouchEnd (e) {
    const {root, player, pos} = this
    root.removeEventListener('touchmove', this.onTouchMove, false)
    root.removeEventListener('touchend', this.onTouchEnd, false)
    player.emit(Events.PLAYER_FOCUS, false)
    if (pos.op === 1) {
      if (pos.time > player.duration) {
        player.currentTime = player.duration
      } else {
        player.currentTime = pos.time < 0 ? 0 : pos.time
      }
      this.once(Events.CANPLAY, () => {
        this.player.isSeeking = false
      })
    }
    pos.op = 0
    this.isMoving = false
  }

  updateTime (percent) {
    const {player} = this
    player.isSeeking = true
    let time = percent * player.duration
    time += this.pos.time
    time = time < 0 ? 0 : (time > player.duration ? player.duration : time)
    player.getPlugin('time') && player.getPlugin('time').updateTime(time)
    player.getPlugin('progress') && player.getPlugin('progress').updatePercent(time / this.player.duration, true)
    if (this.config.isTouchingSeek) {
      player.currentTime = Number(time).toFixed(1)
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

  onClick (e) {
    e.preventDefault();
    const util = Plugin.Util;
    e.stopPropagation();
    const {player, playerConfig} = this;

    if (!playerConfig.closeVideoTouch && !player.isTouchMove) {
      if (util.hasClass(player.root, 'xgplayer-nostart')) {
        return false;
      } else if (!player.ended) {
        if (player.paused) {
          let playPromise = player.play();
          if (playPromise !== undefined && playPromise) {
            // playPromise.catch(err => {});
          }
        } else {
          player.pause();
        }
      }
    }
  }

  render () {
    const className = this.config.gradient ? 'gradient' : ''
    return `
     <xg-trigger class="trigger ${className}">
     <!--<div class="bar">
        <span class=""></span>
     </div>
     <div class="timenote">
        <span class="cur">00:00</span>
        <span>/</span>
        <span class="dur">00:00</span>
        <div class="bar timebar">
          <span class=""></span>
        </class>
     </div>-->
     </xg-trigger>
    `
  }
}

export default MobilePlugin;
