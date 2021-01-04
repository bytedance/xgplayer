import Plugin, {POSITIONS} from '../../plugin'

class MiniScreenIcon extends Plugin {
  static get pluginName () {
    return 'miniscreenIcon'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGHT,
      index: 10
    }
  }

  afterCreate () {
    this.getMini = this.getMini.bind(this)
    this.exitMini = this.exitMini.bind(this)
    this.bind('click', this.getMini)
  }

  getMini () {
    this.config.onClick && this.config.onClick()
  }

  exitMini () {
    this.config.onClick && this.config.onClick()
  }

  destroy () {
    this.unbind(['click', 'touchend'], this.getMini)
  }

  render () {
    const langKey = 'MINISCREEN'
    return `
      <xg-icon class="xgplayer-miniicon">
      <div class="xgplayer-icon btn-text"><span class="icon-text" lang-key="${this.i18nKeys[langKey]}">${this.i18n[langKey]}</span></div>
      </xg-icon>`
  }
}

export default MiniScreenIcon
