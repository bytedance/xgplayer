import Plugin from '../../plugin'
import './index.scss'
const {ROOT_TYPES, POSITIONS} = Plugin
class MiniScreenIcon extends Plugin {
  static get pluginName () {
    return 'miniscreenIcon'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.RIGHT,
      rootType: ROOT_TYPES.CONTROLS,
      index: 10
    }
  }

  afterCreate () {
    console.log('miniscreenIcon', this.config)
    this.getMini = this.getMini.bind(this)
    this.exitMini = this.exitMini.bind(this)
    this.bind(['click', 'touchend'], this.getMini)
  }

  getMini () {
    console.log('getMini')
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
    let text = this.text.miniscreen
    return `
      <xg-icon class="xgplayer-miniicon">
       <p class="name"><span>${text}</span></p>
      </xg-icon>`
  }
}

export default MiniScreenIcon
