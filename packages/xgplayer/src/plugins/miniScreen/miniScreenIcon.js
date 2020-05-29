import Plugin from '../../plugin'
import './index.scss'

const {POSITIONS} = Plugin

class MiniScreenIcon extends Plugin {
  static get pluginName () {
    return 'miniscreenIcon'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGTH,
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

  // 扩展语言
  registerLangauageTexts () {
    return {
      'miniscreen': {
        jp: '日文text',
        en: 'miniscreen',
        zh: '小屏幕'
      }
    }
  }

  render () {
    let text = this.langText.miniscreen
    return `
      <xg-icon class="xgplayer-miniicon">
      <div class="xgplayer-icon btn-text"><span class="icon-text" lang-key="miniscreen">${text}</span></div>
      </xg-icon>`
  }
}

export default MiniScreenIcon
