import Plugin, { Events, Util, Sniffer, STATES } from '../../plugin'
import Touche from './touch'
import SeekTipIcon from '../assets/seekicon.svg'
import { runHooks } from '../../plugin/hooksDescriptor'
// import BackSvg from './back.svg'
import './index.scss'

/**
 * @typedef {{
 *   index?: number,
 *   disableGesture?: boolean,
 *   gestureX?: boolean,
 *   gestureY?: boolean,
 *   gradient?: 'normal' | 'none' | 'top' | 'bottom',
 *   isTouchingSeek?: boolean,
 *   miniMoveStep?: number,
 *   miniYPer?: number,
 *   scopeL?: number,
 *   scopeR?: number,
 *   pressRate?: number,
 *   darkness?: boolean,
 *   maxDarkness?: number,
 *   disableActive?: boolean,
 *   disableTimeProgress?: boolean,
 *   hideControlsActive?: boolean,
 *   hideControlsEnd?: boolean,
 *   moveDuration?: number,
 *   closedbClick?: boolean,
 *   disablePress?: boolean,
 *   disableSeekIcon?: boolean,
 *   focusVideoClick?: boolean,
 *   [propName: string]: any
 * }} IMobileConfig
 */

const ACTIONS = {
  AUTO: 'auto',
  SEEKING: 'seeking',
  PLAYBACK: 'playbackrate',
  LIGHT: ''
}

const HOOKS = ['videoClick', 'videoDbClick']

class MobilePlugin extends Plugin {
  static get pluginName () {
    return 'mobile'
  }

  /**
   * @type IMobileConfig & { [propName: string]: any}
   */
  static get defaultConfig () {
    return {
      index: 0,
      disableGesture: false, // Whether to disable gestures
      gestureX: true, // Whether to enable horizontal gestures
      gestureY: true, // Whether to enable vertical gestures
      gradient: 'normal', // Gradient shadow, 'none'/'top'/'bottom'
      isTouchingSeek: false, // Whether to update currentTime at the same time as touchMove
      miniMoveStep: 5, // Minimum moving distance, used for move throttling
      miniYPer: 5, // Percentage of minimum displacement in y direction
      scopeL: 0.25, // Gesture range on the left
      scopeR: 0.25, // Gesture range on the right
      scopeM: 0.9, // Middle gesture range
      pressRate: 2, // playbackRate when long press
      darkness: true, // Whether to enable the dimming function on the left
      maxDarkness: 0.8, // Maximum darkness，maximum transparency of the mask
      disableActive: false, // Whether to disable the time prompt
      disableTimeProgress: false, // Whether to disable the time progress bar
      hideControlsActive: false, // Whether to hide the control bar when dragging by gesture
      hideControlsEnd: false, // Whether to hide the control bar when the gesture ended
      moveDuration: 60 * 6 * 1000, // The duration corresponding to the dragging width of the player
      closedbClick: false, // Whether to turn off the double tap gesture
      disablePress: true, // Whether to turn off the long press gesture
      disableSeekIcon: false, // Disable seek prompt
      focusVideoClick: false // Click on force toggle to pause/play
    }
  }

  constructor (options) {
    super(options)
    /**
     * @readonly
     */
    this.pos = {
      isStart: false,
      x: 0,
      y: 0,
      time: 0,
      volume: 0,
      rate: 1,
      light: 0,
      width: 0,
      height: 0,
      scopeL: 0,
      scopeR: 0,
      scopeM1: 0,
      scopeM2: 0,
      scope: -1
    }
    /**
     * @private
     */
    this.timer = null
  }

  get duration () {
    return this.playerConfig.customDuration || this.player.duration
  }

  get timeOffset () {
    return this.playerConfig.timeOffset || 0
  }

  registerIcons () {
    return {
      seekTipIcon: { icon: SeekTipIcon, class: 'xg-seek-pre' }
    }
  }

  afterCreate () {
    HOOKS.map(item => {
      this.__hooks[item] = null
    })
    const { playerConfig, config, player } = this
    if (playerConfig.closeVideoDblclick === true) {
      config.closedbClick = true
    }
    this.resetPos()
    if (!Util.isUndefined(playerConfig.disableGesture)) {
      config.disableGesture = !!playerConfig.disableGesture
    }
    this.appendChild('.xg-seek-icon', this.icons.seekTipIcon)

    this.xgMask = Util.createDom('xg-mask', '', {}, 'xgmask')
    player.root.appendChild(this.xgMask)

    this.initCustomStyle()

    this.registerThumbnail()

    const eventType = this.domEventType === 'mouse' ? 'mouse' : 'touch'
    const { disableGesture, disablePress } = this.config
    this.touch = new Touche(this.root, {
      eventType,
      needPreventDefault: !disableGesture,
      disablePress,
    })

    this.root.addEventListener('contextmenu', e => {
      e.preventDefault()
    })

    /**
     * 对根节点做touchmove和touchend绑定，解决控制栏手势无作用的问题
     */
    player.root.addEventListener('touchmove', this.onRootTouchMove, true)
    player.root.addEventListener('touchend', this.onRootTouchEnd, true)
    player.root.addEventListener('touchcancel', this.onRootTouchEnd, true)
    const { controls } = this.player
    if (controls && controls.center) {
      controls.center.addEventListener('touchmove', this.onRootTouchMove, true)
      controls.center.addEventListener('touchend', this.onRootTouchEnd, true)
      controls.center.addEventListener('touchcancel', this.onRootTouchEnd, true)
    }
    this.on(Events.DURATION_CHANGE, () => {
      const { player, config } = this
      if (player.duration > 0 && player.duration * 1000 < config.moveDuration) {
        config.moveDuration = player.duration * 1000
      }
    })

    this.on([Events.CANPLAY, Events.ENDED], () => {
      const { time, isStart } = this.pos
      if (!isStart && time > 0) {
        this.pos.time = 0
      }
    })

    const eventsMap = {
      touchstart: 'onTouchStart',
      touchmove: 'onTouchMove',
      touchend: 'onTouchEnd',
      press: 'onPress',
      pressend: 'onPressEnd',
      click: 'onClick',
      doubleclick: 'onDbClick'
    }

    Object.keys(eventsMap).map(key => {
      this.touch.on(key, (e) => {
        this[eventsMap[key]](e)
      })
    })

    if (!config.disableActive) {
      // Add progress bar drag event callback
      const progressPlugin = player.plugins.progress
      if (progressPlugin) {
        progressPlugin.addCallBack('dragmove', (data) => {
          this.activeSeekNote(data.currentTime, data.forward)
        });
        ['dragend', 'click'].forEach(key => {
          progressPlugin.addCallBack(key, () => {
            this.changeAction(ACTIONS.AUTO)
          })
        })
      }
    }
  }

  registerThumbnail () {
    const { player } = this
    const { thumbnail } = player.plugins
    if (thumbnail && thumbnail.usable) {
      this.thumbnail = thumbnail.createThumbnail(null, 'mobile-thumbnail')
      const timePreview = this.find('.time-preview')
      timePreview.insertBefore(this.thumbnail, timePreview.children[0])
    }
  }

  initCustomStyle () {
    const { commonStyle } = this.playerConfig || {}
    const { playedColor, progressColor, timePreviewStyle, curTimeColor, durationColor } = commonStyle
    if (playedColor) {
      this.find('.xg-curbar').style.backgroundColor = playedColor
    }
    if (progressColor) {
      this.find('.xg-bar').style.backgroundColor = progressColor
    }
    if (timePreviewStyle) {
      const previewDom = this.find('.time-preview')
      Object.keys(timePreviewStyle).forEach(key => {
        previewDom.style[key] = timePreviewStyle[key]
      })
    }
    const curColor = curTimeColor || playedColor
    const durColor = durationColor
    curColor && (this.find('.xg-cur').style.color = curColor)
    durColor && (this.find('.xg-dur').style.color = durColor)
    this.config.disableTimeProgress && Util.addClass(this.find('.xg-timebar'), 'hide')
  }

  resetPos (time = 0) {
    if (this.pos) {
      this.pos.isStart = false
      this.pos.scope = -1;
      ['x', 'y', 'width', 'height', 'scopeL', 'scopeR', 'scopeM1', 'scopeM2'].map(item => {
        this.pos[item] = 0
      })
    } else {
      this.pos = {
        isStart: false,
        x: 0,
        y: 0,
        volume: 0,
        rate: 1,
        light: 0,
        width: 0,
        height: 0,
        scopeL: 0,
        scopeR: 0,
        scopeM1: 0,
        scopeM2: 0,
        scope: -1,
        time: 0
      }
    }
  }

  changeAction (action) {
    const { player, root } = this
    root.setAttribute('data-xg-action', action)
    const startPlugin = player.plugins.start
    startPlugin && startPlugin.recover()
  }

  getTouche (e) {
    const rotateDeg = this.player.rotateDeg
    const touche = e.touches && e.touches.length > 0 ? e.touches[e.touches.length - 1] : e
    // if (touches && touches.length > 0) {
    //   const touche = touches[touches.length - 1]
    //   if (rotateDeg === 0) {
    //     return {
    //       pageX: touche.pageX,
    //       pageY: touche.pageY
    //     }
    //   } else {
    //     return {
    //       pageX: touche.pageY,
    //       pageY: touche.pageX
    //     }
    //   }
    // } else {
    // }
    return rotateDeg === 0
      ? {
        pageX: touche.pageX,
        pageY: touche.pageY
      }
      : {
        pageX: touche.pageX,
        pageY: touche.pageY
      }
  }

  /**
   * 校验具体的操作范围
   * @param { number } x 方向位移
   * @param { number } y 方向位移
   * @param { number } diffx 方向位移差
   * @param { number } diffy 方向位移差
   * @param { any } pos 当前操作区域位置信息 包含{width, height}
   * @return { number } scope 区域 0=>中间x方向滑动  1=>左侧上下滑动 2=>右侧上下滑动
   */
  checkScope (x, y, diffx, diffy, pos) {
    const { width } = pos
    let scope = -1
    if (x < 0 || x > width) {
      return scope
    }
    const mold = diffy === 0 ? Math.abs(diffx) : Math.abs(diffx / diffy)
    if (Math.abs(diffx) > 0 && mold >= 1.73 && x > pos.scopeM1 && x < pos.scopeM2) {
      scope = 0
    } else if (Math.abs(diffx) === 0 || mold <= 0.57) {
      scope = x < pos.scopeL ? 1 : (x > pos.scopeR ? 2 : 3)
    }
    return scope
  }

  /**
   * 根据位移和操作类型进行对应处理
   * @param {number} diffx x方向位移差
   * @param {number} diffy y方向位移差
   * @param {number} scope scope 区域 0=>中间x方向滑动  1=>左侧上下滑动 2=>右侧上下滑动
   * @param {number} width 总体宽度
   * @param {number} height 总高度
   */
  executeMove (diffx, diffy, scope, width, height) {
    switch (scope) {
      case 0:
        this.updateTime(diffx / width * this.config.scopeM)
        break
      case 1:
        this.updateBrightness(diffy / height)
        break
      case 2:
        // ios系统不支持音量调节
        if (!Sniffer.os.isIos) {
          this.updateVolume(diffy / height)
        }
        break
      default:
    }
  }

  /**
   * 结束手势操作
   * @param {number} scope 当前手势类型 区域 0=>中间x方向滑动  1=>左侧上下滑动 2=>右侧上下滑动
   * @param {number} lastScope 上一次手势类型
   */
  endLastMove (lastScope) {
    const { pos, player, config } = this

    const time = (pos.time - this.timeOffset) / 1000
    switch (lastScope) {
      case 0:
        player.seek(Number(time).toFixed(1))
        config.hideControlsEnd ? player.blur() : player.focus()
        this.timer = setTimeout(() => {
          this.pos.time = 0
        }, 500)
        break
      case 1:
      case 2:
      default:
    }
    this.changeAction(ACTIONS.AUTO)
  }

  onTouchStart = (e) => {
    const { player, config, pos, playerConfig } = this
    const touche = this.getTouche(e)
    if (touche && !config.disableGesture && this.duration > 0 && !player.ended) {
      pos.isStart = true
      this.timer && clearTimeout(this.timer)
      // e.cancelable && e.preventDefault()
      Util.checkIsFunction(playerConfig.disableSwipeHandler) && playerConfig.disableSwipeHandler()
      this.find('.xg-dur').innerHTML = Util.format(this.duration)
      // pos.volume = player.volume * 100
      const rect = this.root.getBoundingClientRect()
      if (player.rotateDeg === 90) {
        pos.top = rect.left
        pos.left = rect.top
        pos.width = rect.height
        pos.height = rect.width
      } else {
        pos.top = rect.top
        pos.left = rect.left
        pos.width = rect.width
        pos.height = rect.height
      }
      const _x = parseInt(touche.pageX - pos.left, 10)
      const _y = parseInt(touche.pageY - pos.top, 10)

      pos.x = player.rotateDeg === 90 ? _y : _x // parseInt(touche.pageX - pos.left, 10)
      pos.y = player.rotateDeg === 90 ? _x : _y // parseInt(touche.pageY - pos.top, 10)
      pos.scopeL = config.scopeL * pos.width
      pos.scopeR = (1 - config.scopeR) * pos.width
      pos.scopeM1 = pos.width * (1 - config.scopeM) / 2
      pos.scopeM2 = pos.width - pos.scopeM1
    }
  }

  onTouchMove = (e) => {
    const touche = this.getTouche(e)
    const { pos, config, player } = this
    if (!touche || config.disableGesture || !this.duration || !pos.isStart) {
      return
    }
    const { miniMoveStep, hideControlsActive } = config

    const _x = parseInt(touche.pageX - pos.left, 10)
    const _y = parseInt(touche.pageY - pos.top, 10)

    const x = player.rotateDeg === 90 ? _y : _x
    const y = player.rotateDeg === 90 ? _x : _y

    if (Math.abs(x - pos.x) > miniMoveStep || Math.abs(y - pos.y) > miniMoveStep) {
      const diffx = x - pos.x
      const diffy = y - pos.y
      let scope = pos.scope
      if (scope === -1) {
        scope = this.checkScope(x, y, diffx, diffy, pos)
        // 手势为快进快退记录起始操作时间
        if (scope === 0) {
          !hideControlsActive ? player.focus({ autoHide: false }) : player.blur()
          !pos.time && (pos.time = parseInt(player.currentTime * 1000, 10) + this.timeOffset * 1000)
        }
        pos.scope = scope
      }
      if (scope === -1 || (scope > 0 && !config.gestureY) || (scope === 0 && !config.gestureX)) {
        return
      }
      // e.cancelable && e.preventDefault()
      this.executeMove(diffx, diffy, scope, pos.width, pos.height)
      pos.x = x
      pos.y = y
    } else {
      // console.log('touche.pageX - pos.x', touche.pageX - pos.x)
    }
  }

  onTouchEnd = (e) => {
    const { player, pos, playerConfig } = this
    setTimeout(() => {
      player.getPlugin('progress') && player.getPlugin('progress').resetSeekState()
    }, 10)
    if (!pos.isStart) {
      return
    }
    if (pos.scope > -1) {
      e.cancelable && e.preventDefault()
    }

    const { disableGesture, gestureX } = this.config
    if (!disableGesture && gestureX) {
      this.endLastMove(pos.scope)
    } else {
      pos.time = 0
    }
    pos.scope = -1
    this.resetPos()
    Util.checkIsFunction(playerConfig.enableSwipeHandler) && playerConfig.enableSwipeHandler()
    this.changeAction(ACTIONS.AUTO)
  }

  checkIsRootTarget (e) {
    const plugins = this.player.plugins || {}
    if (plugins.progress && plugins.progress.root.contains(e.target)) {
      return false
    }
    return (plugins.start && plugins.start.root.contains(e.target)) || (plugins.controls && plugins.controls.root.contains(e.target))
  }

  onRootTouchMove = (e) => {
    if (this.config.disableGesture || !this.config.gestureX) {
      return
    }
    if (this.checkIsRootTarget(e)) {
      e.stopPropagation()
      if (!this.pos.isStart) {
        this.onTouchStart(e)
      } else {
        this.onTouchMove(e)
      }
    }
  }

  onRootTouchEnd = (e) => {
    if (this.pos.scope > -1) {
      this.onTouchEnd(e)
      // const { controls } = this.player
      // controls && controls.recoverAutoHide()
    }
  }

  sendUseAction (event) {
    const { paused } = this.player
    this.emitUserAction(event, 'switch_play_pause', {
      prop: 'paused',
      from: paused,
      to: !paused
    })
  }

  clickHandler (e) {
    const { player, config, playerConfig } = this
    if (player.state < STATES.RUNNING) {
      if (!playerConfig.closeVideoClick) {
        this.sendUseAction(Util.createEvent('click'))
        player.play()
      }
      return
    }

    if (!config.closedbClick || playerConfig.closeVideoClick) {
      player.isActive ? player.blur() : player.focus()
    } else if (!playerConfig.closeVideoClick) {
      if (player.isActive || config.focusVideoClick) {
        this.sendUseAction(Util.createEvent('click'))
        this.switchPlayPause()
      }
      player.focus()
    }
  }

  dbClickHandler (e) {
    const { config, player } = this
    if (!config.closedbClick && player.state >= STATES.RUNNING) {
      this.sendUseAction(Util.createEvent('dblclick'))
      this.switchPlayPause()
    }
  }

  onClick (e) {
    const { player } = this
    runHooks(this, HOOKS[0], (plugin, data) => {
      this.clickHandler(data.e)
    }, { e, paused: player.paused })
  }

  onDbClick (e) {
    const { player } = this
    runHooks(this, HOOKS[1], (plugin, data) => {
      this.dbClickHandler(data.e)
    }, { e, paused: player.paused })
  }

  onPress (e) {
    const { pos, config, player } = this
    if (config.disablePress || player.paused) {
      return
    }
    pos.rate = this.player.playbackRate
    this.emitUserAction('press', 'change_rate', {
      prop: 'playbackRate',
      from: player.playbackRate,
      to: config.pressRate
    })
    player.playbackRate = config.pressRate
    this.changeAction(ACTIONS.PLAYBACK)
  }

  onPressEnd (e) {
    const { pos, config, player } = this
    if (config.disablePress) {
      return
    }
    this.emitUserAction('pressend', 'change_rate', { prop: 'playbackRate', from: player.playbackRate, to: pos.rate })
    player.playbackRate = pos.rate
    pos.rate = 1
    this.changeAction(ACTIONS.AUTO)
  }

  updateTime (percent) {
    const { player, config } = this
    const { duration } = this.player
    percent = Number(percent.toFixed(4))
    let time = parseInt(percent * config.moveDuration, 10) + this.timeOffset
    time += this.pos.time
    time = time < 0 ? 0 : (time > duration * 1000 ? duration * 1000 - 200 : time)
    player.getPlugin('time') && player.getPlugin('time').updateTime(time / 1000)
    player.getPlugin('progress') && player.getPlugin('progress').updatePercent(time / 1000 / this.duration, true)
    this.activeSeekNote(time / 1000, percent > 0)
    // 在滑动的同时实时seek
    if (config.isTouchingSeek) {
      // player.currentTime = time / 1000
      player.seek(Number((time - this.timeOffset) / 1000).toFixed(1))
    }
    this.pos.time = time
  }

  updateVolume (percent) {
    if (this.player.rotateDeg) {
      percent = -percent
    }
    const { player, pos } = this
    percent = parseInt(percent * 100, 10)
    pos.volume += percent
    if (Math.abs(pos.volume) < 10) {
      return
    }
    let volume = parseInt(player.volume * 10, 10) - parseInt(pos.volume / 10, 10)
    volume = volume > 10 ? 10 : (volume < 1 ? 0 : volume)
    player.volume = volume / 10
    pos.volume = 0
  }

  updateBrightness (percent) {
    const { pos, config, xgMask } = this
    if (!config.darkness) {
      return
    }
    if (this.player.rotateDeg) {
      percent = -percent
    }
    let light = pos.light + (0.8 * percent)
    light = light > config.maxDarkness ? config.maxDarkness : (light < 0 ? 0 : light)
    if (xgMask) {
      xgMask.style.backgroundColor = `rgba(0,0,0,${light})`
    }
    pos.light = light
  }

  activeSeekNote (time, isForward = true) {
    const { player, config } = this
    const isLive = !(this.duration !== Infinity && this.duration > 0)
    if (!time || typeof time !== 'number' || isLive || config.disableActive) {
      return
    }
    if (time < 0) {
      time = 0
    } else if (time > player.duration) {
      time = player.duration - 0.2
    }
    this.changeAction(ACTIONS.SEEKING)

    const startPlugin = player.plugins.start
    startPlugin && startPlugin.focusHide()

    this.find('.xg-dur').innerHTML = Util.format(this.duration)
    this.find('.xg-cur').innerHTML = Util.format(time)
    this.find('.xg-curbar').style.width = `${time / this.duration * 100}%`
    if (isForward) {
      Util.removeClass(this.find('.xg-seek-show'), 'xg-back')
    } else {
      Util.addClass(this.find('.xg-seek-show'), 'xg-back')
    }
    this.updateThumbnails(time)
    // const {thumbnail} = player.plugins
    // this.thumbnailPlugin && thumbnail.update(time)
  }

  updateThumbnails (time) {
    const { player } = this
    const { thumbnail } = player.plugins
    if (thumbnail && thumbnail.usable) {
      this.thumbnail && thumbnail.update(this.thumbnail, time, 160, 90)
      // this.videothumbnail && thumbnail.update(this.videothumbnail, time, rect.width, rect.height)
    }
  }

  switchPlayPause () {
    const { player } = this
    if (player.state < STATES.ATTACHED) {
      return false
    } else if (!player.ended) {
      if (player.paused) {
        player.play()
      } else {
        player.pause()
      }
    }
  }

  // 动态禁用手势
  disableGesture () {
    this.config.disableGesture = true
  }

  // 动态启用手势
  enableGesture () {
    this.config.disableGesture = false
  }

  destroy () {
    const { player } = this
    this.timer && clearTimeout(this.timer)
    this.thumbnail = null
    player.root.removeChild(this.xgMask)
    this.xgMask = null
    this.touch && this.touch.destroy()
    this.touch = null
    player.root.removeEventListener('touchmove', this.onRootTouchMove, true)
    player.root.removeEventListener('touchend', this.onRootTouchEnd, true)
    player.root.removeEventListener('touchcancel', this.onRootTouchEnd, true)
    const { controls } = this.player
    if (controls && controls.center) {
      controls.center.removeEventListener('touchmove', this.onRootTouchMove, true)
      controls.center.removeEventListener('touchend', this.onRootTouchEnd, true)
      controls.center.removeEventListener('touchcancel', this.onRootTouchEnd, true)
    }
  }

  render () {
    const className = this.config.gradient !== 'normal' ? `gradient ${this.config.gradient}` : 'gradient'
    return `
     <xg-trigger class="trigger">
     <div class="${className}"></div>
        <div class="time-preview">
            <div class="xg-seek-show ${this.config.disableSeekIcon ? ' hide-seek-icon' : ''}">
              <i class="xg-seek-icon"></i>
              <span class="xg-cur">00:00</span>
              <span class="xg-separator">/</span>
              <span class="xg-dur">00:00</span>
            </div>
              <div class="xg-bar xg-timebar">
                <div class="xg-curbar"></div>
              </div>
        </div>
        <div class="xg-playbackrate xg-top-note">
            <span><i>${this.config.pressRate}X</i>${this.i18n.FORWARD}</span>
        </div>
     </xg-trigger>
    `
  }
}

export default MobilePlugin
