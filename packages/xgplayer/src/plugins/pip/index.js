import Plugin from '../../plugin'

const {Events, POSITIONS} = Plugin

class PIP extends Plugin {
  static get pluginName () {
    return 'Pip'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGTH,
      index: 6,
      showIcon: false
    }
  }

  beforeCreate (args) {
    if (typeof args.player.config.pip === 'boolean') {
      args.config.showIcon = args.player.config.pip
    }
  }

  afterCreate () {
    this.btnClick = (e) => {
      this.switchPIP(e)
    }
    // video初始化之后再做判断是否显示
    this.once(Events.COMPLETE, () => {
      console.log(this.config.showIcon && this.isPIPAvailable())
      if (this.config.showIcon && this.isPIPAvailable()) {
        this.show()
        this.bind('click', this.btnClick)
      }
      this.initPipEvents()
    })
  }

  initPipEvents () {
    const {player} = this
    this.leavePIPCallback = () => {
      // 处理点击x关闭画中画的时候暂停问题
      const paused = player.paused
      setTimeout(() => {
        !paused && player.play()
      }, 0)
      player.emit('pip_change', false)
    }

    this.enterPIPCallback = () => {
      player.emit('pip_change', true)
    }

    if (player.video) {
      player.video.addEventListener('enterpictureinpicture', this.enterPIPCallback)
      // Video left Picture-in-Picture mode.
      player.video.addEventListener('leavepictureinpicture', this.leavePIPCallback)
    }
  }

  switchPIP () {
    const {player, playerConfig} = this
    if (!this.isPIPAvailable()) {
      return false
    }
    try {
      if (document.pictureInPictureElement && document.pictureInPictureElement === player.video) {
        document.exitPictureInPicture();
      } else {
        if (!player.video) {
          return
        }
        if (playerConfig.poster) {
          player.video.poster = playerConfig.poster
        }
        player.video.requestPictureInPicture()
      }
      return true
    } catch (reason) {
      console.error('switchPIP', reason);
      return false
    }
  }

  get isPip () {
    const {player} = this
    return document.pictureInPictureElement === player.video
  }

  isPIPAvailable () {
    const {player} = this
    return document.pictureInPictureEnabled || !(player.video && player.video.disablePictureInPicture);
  }

  registerLangauageTexts () {
    return {
      'pipicon': {
        jp: 'picture-in-picture',
        en: 'picture-in-picture',
        zh: '画中画'
      }
    }
  }

  destroy () {
    const {player} = this
    player.video.removeEventListener('enterpictureinpicture', this.enterPIPCallback)
    player.video.removeEventListener('leavepictureinpicture', this.leavePIPCallback)
    this.unbind('click', this.btnClick)
  }

  render () {
    if (!this.config.showIcon && this.isPIPAvailable()) {
      return
    }
    return `<xg-icon class="xgplayer-pip">
      <div class="xgplayer-icon btn-definition">
      ${this.icons.pipicon ? this.icons.pipicon : `<span>${this.text.pipicon}</span>`}
      </div>
      ${this.icons.pipicon ? `<div class="xg-tips">${this.text.pipicon}</div>` : ''}
    </xg-icon>`
  }
}
export default PIP
