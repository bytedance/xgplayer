import {BasePlugin} from '../../plugin';

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
    const eventHandlers = ['onVideoClick', 'onVideoDblClick', 'onContextmenu']
    eventHandlers.map(key => {
      if (this[key]) {
        this[key] = this[key].bind(this)
      }
    })
    this.initEvents();
  }

  initEvents () {
    const { player } = this;

    player.video.addEventListener('click', this.onVideoClick, false)
    player.video.addEventListener('dblclick', this.onVideoDblClick, false)
    this.config.disableContextmenu && player.video.addEventListener('contextmenu', this.onContextmenu, false)
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

  onVideoClick (e) {
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
    console.log('onVideoClick')

    this.clickTimer = setTimeout(() => {
      console.log('onVideoClick clickTimer', player.paused)
      if (!player.ended) {
        player.paused ? player.play() : player.pause()
      }
      clearTimeout(this.clickTimer)
      this.clickTimer = null
    }, 200)
  }

  onVideoDblClick (e) {
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

  onControlMouseEnter () {
    const { player } = this;
    if (player.userTimer) {
      clearTimeout(player.userTimer)
    }
  }

  onControlMouseLeave () {
    const { player } = this;
    if (!player.config.closeControlsBlur) {
      player.emit('focus', player)
    }
  }

  destroy () {
    const { player } = this;
    player.video.removeEventListener('click', this.onVideoClick, false)
    player.video.removeEventListener('dblclick', this.onVideoDblClick, false)
    player.video.removeEventListener('contextmenu', this.onContextmenu, false)
  }
}
