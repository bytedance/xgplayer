import Plugin from '../../../plugin'

const {Events, POSITIONS, ROOT_TYPES} = Plugin

class PIPIcon extends Plugin {
  static get pluginName () {
    return 'PipIcon'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.RIGHT,
      rootType: ROOT_TYPES.CONTROLS,
      index: 6
    }
  }

  afterCreate () {
    // video初始化之后再做判断是否显示
    this.once(Events.COMPLETE, () => {
      if (this.isPIPAvailable()) {
        this.show()
        this.switchPIP = this.switchPIP.bind(this)
        this.bind('click', this.switchPIP)
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
    const {player} = this
    try {
      if (!document.pictureInPictureElement) {
        player.video && player.video.requestPictureInPicture()
      } else {
        document.exitPictureInPicture();
      }
    } catch (reason) {
      console.error('switchPIP', reason);
    }
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
    this.unbind('click', this.switchPIP)
  }

  render () {
    return `<xg-icon class="xgplayer-pip">
      <div class="xgplayer-icon btn-definition">
      ${this.icons.pipicon ? this.icons.pipicon : `<span>${this.text.pipicon}</span>`}
      </div>
      ${this.icons.pipicon ? `<div class="xg-tips">${this.text.pipicon}</div>` : ''}
    </xg-icon>`
  }
}
export default PIPIcon
