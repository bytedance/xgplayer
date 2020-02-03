import BasePlugin from '../../plugin/basePlugin';

export default class PCPlugin extends BasePlugin {
  static get pluginName () {
    return 'pc'
  }

  afterCreate () {
    this.onVideoClick = this.onVideoClick.bind(this)
    this.onVideoDblClick = this.onVideoDblClick.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.onControlMouseEnter = this.onControlMouseEnter.bind(this)
    this.onControlMouseLeave = this.onControlMouseLeave.bind(this)
    this.onReady = this.onReady.bind(this)
    this.onDestroy = this.onDestroy.bind(this)
    this.initEvents();
  }

  initEvents () {
    const { player } = this;

    player.video.addEventListener('click', this.onVideoClick, false)

    player.video.addEventListener('dblclick', this.onVideoDblClick, false)

    player.root.addEventListener('mouseenter', this.onMouseEnter)

    player.root.addEventListener('mouseleave', this.onMouseLeave)

    player.controls.addEventListener('mouseenter', this.onControlMouseEnter, false)

    player.controls.addEventListener('mouseleave', this.onControlMouseLeave, false)
  }

  onVideoClick (e) {
    e.preventDefault()
    e.stopPropagation()
    const { player } = this
    let clk = 0; let timer;
    if (!player.config.closeVideoClick) {
      clk++
      if (timer) {
        clearTimeout(timer)
      }
      if (clk === 1) {
        timer = setTimeout(function () {
          if (BasePlugin.Util.hasClass(player.root, 'xgplayer-nostart')) {
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
      let fullscreen = player.controls.querySelector('.xgplayer-fullscreen')
      if (fullscreen) {
        let clk
        if (document.createEvent) {
          clk = document.createEvent('Event')
          clk.initEvent('click', true, true)
        } else {
          // eslint-disable-next-line no-undef
          clk = new Event('click')
        }
        fullscreen.dispatchEvent(clk)
      }
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

  onReady () {
    const { player } = this;
    if (player.config.autoplay) {
      player.start()
    }
  }

  onDestroy () {
    const { player } = this;
    player.root.removeEventListener('mouseenter', this.onMouseEnter)
    player.root.removeEventListener('mouseleave', this.onMouseLeave)
    player.off('ready', this.onReady)
    player.off('destroy', this.onDestroy)
  }
}
