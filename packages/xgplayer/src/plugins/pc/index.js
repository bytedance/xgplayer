import BasePlugin from '../../plugin/basePlugin';
const {Events, Util} = BasePlugin
export default class PCPlugin extends BasePlugin {
  static get pluginName () {
    return 'pc'
  }

  afterCreate () {
    const eventHandlers = ['onVideoClick', 'onVideoDblClick', 'onMouseEnter', 'onMouseLeave', 'onControlMouseEnter',
    'onControlMouseLeave']
    eventHandlers.map (key => {
      if (this[key]) {
        this[key] = this[key].bind(this)
      }
    })
    // this.onVideoClick = this.onVideoClick.bind(this)
    // this.onVideoDblClick = this.onVideoDblClick.bind(this)
    // this.onMouseEnter = this.onMouseEnter.bind(this)
    // this.onMouseLeave = this.onMouseLeave.bind(this)
    // this.onControlMouseEnter = this.onControlMouseEnter.bind(this)
    // this.onControlMouseLeave = this.onControlMouseLeave.bind(this)
    this.initEvents();
    const {playerConfig} = this
    if (playerConfig.autoplay) {
      this.onEnter()
    }
  }

  onPlayerReady () {
    const { player } = this;
    if (player.config.autoplay) {
      player.start()
    }
  }

  initEvents () {
    const { player } = this;

    player.video.addEventListener('click', this.onVideoClick, false)

    player.video.addEventListener('dblclick', this.onVideoDblClick, false)

    this.once(Events.CANPLAY, this.onEntered.bind(this));
    this.once(Events.AUTOPLAY_PREVENTED, () => {
      this.onAutoPlayPrevented()
    })

    player.root.addEventListener('mouseenter', this.onMouseEnter)

    player.root.addEventListener('mouseleave', this.onMouseLeave)

    // player.controls.addEventListener('mouseenter', this.onControlMouseEnter, false)

    // player.controls.addEventListener('mouseleave', this.onControlMouseLeave, false)
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
    // e.stopPropagation()
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
              let playPromise = player.play()
              if (playPromise !== undefined && playPromise) {
                playPromise.catch(err => {})
              }
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

  onMouseEnter () {
    const { player } = this
    clearTimeout(player.leavePlayerTimer)
    player.emit('focus', player)
  }

  onMouseLeave () {
    const { player } = this;
    if (!player.config.closePlayerBlur) {
      player.leavePlayerTimer = setTimeout(function () {
        player.emit('blur', player)
      }, player.config.leavePlayerTime || 1500)
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
    player.root.removeEventListener('mouseenter', this.onMouseEnter)
    player.root.removeEventListener('mouseleave', this.onMouseLeave)
    player.off('ready', this.onReady)
  }
}
