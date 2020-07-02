import BasePlugin from '../../plugin/basePlugin';
const {Events, Util} = BasePlugin
export default class PCPlugin extends BasePlugin {
  static get pluginName () {
    return 'pc'
  }

  afterCreate () {
    const eventHandlers = ['onVideoClick', 'onVideoDblClick', 'onContextmenu']
    eventHandlers.map(key => {
      if (this[key]) {
        this[key] = this[key].bind(this)
      }
    })
    this.initEvents();
    const {playerConfig} = this
    if (playerConfig.autoplay) {
      this.onEnter()
    }
  }

  initEvents () {
    const { player } = this;

    player.root.addEventListener('click', this.onVideoClick, false)
    player.video.addEventListener('dblclick', this.onVideoDblClick, false)
    player.video.addEventListener('contextmenu', this.onContextmenu, false)

    this.once(Events.CANPLAY, this.onEntered.bind(this));
    this.once(Events.AUTOPLAY_PREVENTED, () => {
      this.onAutoPlayPrevented()
    })
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
