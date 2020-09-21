import BasePlugin from '../../plugin/basePlugin';
const {Util} = BasePlugin
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

    player.root.addEventListener('click', this.onVideoClick, false)
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
    e.preventDefault()
    if (!this.config.closeVideoStopPropagation) {
      e.stopPropagation()
    }
    const { player } = this
    let clk = 0; let timer;
    if (!player.config.closeVideoClick) {
      clk++
      if (timer) {
        clearTimeout(timer)
      }
      if (clk === 1) {
        timer = setTimeout(function () {
          if (Util.hasClass(player.root, 'xgplayer-nostart')) {
            return false
          } else if (!player.ended) {
            if (player.paused) {
              player.play()
            } else {
              player.pause()
            }
          }
          clk = 0
        }, 200)
      } else {
        clk = 0
      }
    }
  }

  onVideoDblClick (e) {
    e.preventDefault()
    e.stopPropagation()
    const { player } = this
    if (!player.config.closeVideoDblclick) {
      player.fullscreen ? player.exitFullscreen() : player.getFullscreen()
    }
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
    player.root.removeEventListener('click', this.onVideoClick, false)
    player.video.removeEventListener('dblclick', this.onVideoDblClick, false)
    player.video.removeEventListener('contextmenu', this.onContextmenu, false)
    player.off('ready', this.onReady)
  }
}
