import Plugin from '../../plugin'
import OptionsIcon from '../common/optionsIcon'

const {POSITIONS} = Plugin

export default class PlaybackRate extends OptionsIcon {
  static get pluginName () {
    return 'playbackRate'
  }
  // 默认配置信息
  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGTH,
      index: 4,
      list: [0.5, 0.75, {rate: 1, iconText: '倍速'}, 1.5, 2],
      className: 'xgplayer-playbackrate',
      pluginName: 'playbackRate'
    }
  }

  constructor (args) {
    super(args)
    this.curRate = 1
  }

  afterCreate () {
    const {playerConfig, config} = this
    if (Array.isArray(playerConfig.playbackRate)) {
      config.list = playerConfig.playbackRate
    }
    super.afterCreate()
  }

  show () {
    if (!this.config.list || this.config.list.length === 0) {
      return;
    }
    super.show()
  }

  registerLangauageTexts () {
    return {
      'currate-text': {
        jp: (langkey) => {
          return this.getCurrentText(langkey)
        },
        en: (langkey) => {
          return this.getCurrentText(langkey)
        },
        zh: (langkey) => {
          return this.getCurrentText(langkey)
        }
      }
    }
  }

  getCurrentText (lang) {
    const {curValue, config, player} = this
    if (!lang) {
      lang = player.lang || 'zh'
    }
    let text = ''
    config.list.map(item => {
      if (Number(item) === curValue || Number(item.rate) === curValue) {
        if (item[lang]) {
          text = item[lang]
        } else if (item.iconText) {
          text = item.iconText[lang] ? item.iconText[lang] : (typeof item.iconText === 'string' && (!lang || lang === 'zh') ? item.iconText : '')
        } else {
          text = typeof item === 'number' ? `${item}x` : `${item.rate}x`
        }
      }
    })
    return text
  }

  changeCurrent (val, text) {
    this.curValue = val
    if (!text) {
      text = this.getCurrentText()
    }
    super.changeCurrent(val, text)
  }

  onItemClick (e) {
    super.onItemClick(e)
    const target = e.delegateTarget
    const rate = target.getAttribute('rate')
    if (Number(rate) === this.curValue) {
      return false
    }
    this.player.playbackRate = Number(rate)
    this.changeCurrent(rate)
  }

  destroy () {
    this.unbind(this.activeEvent, this.onMouseenter)
    this.unbind('mouseleave', this.onMouseenter)
  }

  renderItemList () {
    const playbackRate = this.player.playbackRate || 1
    this.curValue = playbackRate
    let currentText = ''
    const items = this.config.list.map((item) => {
      let itemInfo = typeof item === 'object' ? item : {rate: item}
      !itemInfo.text && (itemInfo.text = `${itemInfo.rate}x`)
      if (itemInfo.rate === playbackRate) {
        itemInfo.isCurrent = true
        currentText = itemInfo.iconText || itemInfo.text
      }
      return itemInfo
    })
    super.renderItemList(items, currentText)
  }
}
