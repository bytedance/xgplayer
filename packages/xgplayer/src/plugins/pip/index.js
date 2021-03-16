import Plugin, {Events, Util, POSITIONS} from '../../plugin'

/**
 * @description picture-in-picture plugin
 * @doc https://www.w3.org/TR/picture-in-picture/
 * @doc https://developer.apple.com/documentation/webkitjs/adding_picture_in_picture_to_your_safari_media_controls
 */
class PIP extends Plugin {
  static get pluginName () {
    return 'pip'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGHT,
      index: 6,
      showIcon: false
    }
  }

  static checkWebkitSetPresentationMode (video) {
    return typeof video.webkitSetPresentationMode === 'function'
  }

  beforeCreate (args) {
    if (typeof args.player.config.pip === 'boolean') {
      args.config.showIcon = args.player.config.pip
    }
  }

  afterCreate () {
    this.btnClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.switchPIP(e)
    }
    // video初始化之后再做判断是否显示
    this.once(Events.COMPLETE, () => {
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
    if (!this.isPIPAvailable()) {
      return false
    }
    this.isPip ? this.exitPIP() : this.requestPIP()
  }

  /*
   * 进入画中画
  */
  requestPIP () {
    const {player, playerConfig} = this
    if (!this.isPIPAvailable() || this.isPip) {
      return
    }
    try {
      if (playerConfig.poster) {
        player.video.poster = playerConfig.poster
      }
      PIP.checkWebkitSetPresentationMode(player.video) ? player.video.webkitSetPresentationMode('picture-in-picture') : player.video.requestPictureInPicture()
      return true
    } catch (reason) {
      console.error('requestPiP', reason);
      return false
    }
  }

  /**
   * 退出画中画
   */
  exitPIP () {
    const {player} = this
    try {
      if (this.isPIPAvailable() && this.isPip) {
        PIP.checkWebkitSetPresentationMode(player.video) ? player.video.webkitSetPresentationMode('inline') : document.exitPictureInPicture();
      }
      return true
    } catch (reason) {
      console.error('exitPip', reason);
      return false
    }
  }

  get isPip () {
    const {player} = this
    return (document.pictureInPictureElement && document.pictureInPictureElement === player.video) || player.video.webkitPresentationMode === 'picture-in-picture'
  }

  isPIPAvailable () {
    const {video} = this.player
    return document.pictureInPictureEnabled &&
    ((Util.typeOf(video.disablePictureInPicture) === 'Boolean' && !video.disablePictureInPicture) ||
     (video.webkitSupportsPresentationMode && Util.typeOf(video.webkitSetPresentationMode) === 'Function'));
  }

  destroy () {
    const {player} = this
    player.video.removeEventListener('enterpictureinpicture', this.enterPIPCallback)
    player.video.removeEventListener('leavepictureinpicture', this.leavePIPCallback)
    this.exitPip()
    this.unbind('click', this.btnClick)
  }

  render () {
    if (!this.config.showIcon && this.isPIPAvailable()) {
      return
    }
    return `<xg-icon class="xgplayer-pip">
      <div class="xgplayer-icon btn-text">
      ${`<span class="icon-text" lang-key="pip">${this.i18n.PIP}</span>`}
      </div>
      ${`<div class="xg-tips" lang-key="pip">${this.i18n.PIP}</div>`}
    </xg-icon>`
  }
}
export default PIP
