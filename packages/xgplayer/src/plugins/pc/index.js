import { BasePlugin, Sniffer } from '../../plugin'
import { runHooks } from '../../plugin/hooksDescriptor'

const MOUSE_EVENTS = {
  mouseenter: 'onMouseEnter',
  mouseleave: 'onMouseLeave',
  mousemove: 'onMouseMove'
}

const HOOKS = ['videoClick', 'videoDbClick']

export default class PCPlugin extends BasePlugin {
  static get pluginName () {
    return 'pc'
  }

  static get defaultConfig () {
    return {
      disableContextmenu: true
    }
  }

  afterCreate () {
    this._clickCount = 0
    HOOKS.map(item => {
      this.__hooks[item] = null
    })
    const { enableContextmenu, isMobileSimulateMode } = this.playerConfig
    if (isMobileSimulateMode || Sniffer.device === 'mobile') {
      return
    }
    this.config.disableContextmenu = !enableContextmenu
    this.initEvents()
  }

  initEvents () {
    const { video, root } = this.player

    root.addEventListener('click', this.onVideoClick, false)
    video.addEventListener('dblclick', this.onVideoDblClick, false)
    Object.keys(MOUSE_EVENTS).map(item => {
      root.addEventListener(item, this[MOUSE_EVENTS[item]], false)
    })
    this.config.disableContextmenu && video.addEventListener('contextmenu', this.onContextmenu, false)
  }

  switchPlayPause (e) {
    const { player } = this
    this.emitUserAction(e, 'switch_play_pause')
    if (!player.ended) {
      player.paused ? player.play() : player.pause()
    } else {
      player.duration !== Infinity && player.duration > 0 && player.replay()
    }
  }

  onMouseMove = (e) => {
    const { player, playerConfig } = this
    if (!player.isActive) {
      player.focus()
      !playerConfig.closeFocusVideoFocus && player.video.focus()
    }
  }

  onMouseEnter = (e) => {
    const { playerConfig, player } = this
    !playerConfig.closeFocusVideoFocus && player.video.focus()
    if (playerConfig.closeDelayBlur) {
      player.focus({ autoHide: false })
    } else {
      player.focus()
    }
  }

  onMouseLeave = (e) => {
    const { closePlayerBlur, leavePlayerTime } = this.playerConfig
    if (!closePlayerBlur) {
      if (leavePlayerTime) {
        this.player.focus({ autoHide: true, delay: leavePlayerTime })
      } else {
        this.player.blur()
      }
    }
  }

  onContextmenu (e) {
    e = e || window.event
    if (e.preventDefault) {
      e.preventDefault()
    }
    if (e.stopPropagation) {
      e.stopPropagation()
    } else {
      e.returnValue = false // 解决IE8右键弹出
      e.cancelBubble = true
    }
  }

  onVideoClick = (e) => {
    const { player, playerConfig } = this
    if (e.target && playerConfig.closeVideoClick) {
      return
    }
    if (e.target === player.root || e.target === player.video || e.target === player.innerContainer || e.target === player.video.__canvas) {
      e.preventDefault()
      if (!playerConfig.closeVideoStopPropagation) {
        e.stopPropagation()
      }
      this._clickCount++
      if (this.clickTimer) {
        clearTimeout(this.clickTimer)
        this.clickTimer = null
      }
      this.clickTimer = setTimeout(() => {
        if (!this._clickCount) {
          return
        }
        this._clickCount--
        runHooks(this, HOOKS[0], (plugin, data) => {
          this.switchPlayPause(data.e)
        }, { e, paused: player.paused })
        clearTimeout(this.clickTimer)
        this.clickTimer = null
      }, 300)
    }
  }

  onVideoDblClick = (e) => {
    const { player, playerConfig } = this
    if (!e.target || (e.target !== player.video && e.target !== player.video.__canvas) || playerConfig.closeVideoDblclick) {
      return
    }
    if (this._clickCount < 2) {
      this._clickCount = 0
      return
    }
    this._clickCount = 0
    if (this.clickTimer) {
      clearTimeout(this.clickTimer)
      this.clickTimer = null
    }
    e.preventDefault()
    e.stopPropagation()
    runHooks(this, HOOKS[1], (plugin, data) => {
      this.emitUserAction(data.e, 'switch_fullscreen', { fullscreen: player.fullscreen })
      player.fullscreen ? player.exitFullscreen() : player.getFullscreen()
    }, { e, fullscreen: player.fullscreen })
  }

  destroy () {
    const { video, root } = this.player
    this.clickTimer && clearTimeout(this.clickTimer)
    root.removeEventListener('click', this.onVideoClick, false)
    video.removeEventListener('dblclick', this.onVideoDblClick, false)
    video.removeEventListener('contextmenu', this.onContextmenu, false)
    Object.keys(MOUSE_EVENTS).map(item => {
      root.removeEventListener(item, this[MOUSE_EVENTS[item]], false)
    })
  }
}
