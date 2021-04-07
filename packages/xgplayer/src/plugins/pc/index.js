import {BasePlugin, Events, Sniffer} from '../../plugin';
const MOUSE_EVENTS = {
  mouseenter: 'onMouseEnter',
  mouseleave: 'onMouseLeave',
  mousemove: 'onMouseMove'
}
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
    const {enableContextmenu, isMobileSimulateMode} = this.playerConfig
    if (isMobileSimulateMode || Sniffer.device === 'mobile') {
      return
    }
    this.config.disableContextmenu = !enableContextmenu
    this.initEvents();
  }

  initEvents () {
    const { video, root } = this.player;

    video.addEventListener('click', this.onVideoClick, false)
    video.addEventListener('dblclick', this.onVideoDblClick, false)
    Object.keys(MOUSE_EVENTS).map(item => {
      root.addEventListener(item, this[MOUSE_EVENTS[item]], false)
    })
    this.config.disableContextmenu && video.addEventListener('contextmenu', this.onContextmenu, false)
  }

  onMouseMove = (e) => {
    const {player, playerConfig} = this
    if (!player.isActive) {
      this.emit(Events.PLAYER_FOCUS)
      !playerConfig.closeFocusVideoFocus && player.video.focus()
    }
  }

  onMouseEnter = (e) => {
    if (this.playerConfig.closeDelayBlur) {
      this.emit(Events.PLAYER_FOCUS, {autoHide: false})
    } else {
      this.emit(Events.PLAYER_FOCUS)
    }
  }

  onMouseLeave = (e) => {
    const {closePlayerBlur, leavePlayerTime} = this.playerConfig
    if (!closePlayerBlur) {
      if (leavePlayerTime) {
        this.emit(Events.PLAYER_FOCUS, {autoHide: true, delay: leavePlayerTime})
      } else {
        this.emit(Events.PLAYER_BLUR)
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
    if (!e.target || e.target !== player.video || playerConfig.closeVideoClick) {
      return
    }
    e.preventDefault()
    if (!playerConfig.closeVideoStopPropagation) {
      e.stopPropagation()
    }
    if (this.clickTimer) {
      clearTimeout(this.clickTimer)
      this.clickTimer = null
    }
    let fun = null
    if (!player.ended) {
      fun = player.paused ? player.play : player.pause
    } else {
      fun = player.duration !== Infinity && player.duration > 0 ? player.replay : null
    }
    if (!fun) {
      return
    }
    this.clickTimer = setTimeout(() => {
      fun.call(player)
      clearTimeout(this.clickTimer)
      this.clickTimer = null
    }, 200)
  }

  onVideoDblClick = (e) => {
    const { player, playerConfig } = this
    if (!e.target || e.target !== player.video || playerConfig.closeVideoDblclick) {
      return
    }
    if (this.clickTimer) {
      clearTimeout(this.clickTimer)
      this.clickTimer = null
    }
    e.preventDefault()
    e.stopPropagation()
    player.fullscreen ? player.exitFullscreen() : player.getFullscreen()
  }

  destroy () {
    const { video, root } = this.player;
    this.clickTimer && clearTimeout(this.clickTimer)
    video.removeEventListener('click', this.onVideoClick, false)
    video.removeEventListener('dblclick', this.onVideoDblClick, false)
    video.removeEventListener('contextmenu', this.onContextmenu, false)
    Object.keys(MOUSE_EVENTS).map(item => {
      root.removeEventListener(item, this[MOUSE_EVENTS[item]], false)
    })
  }
}
