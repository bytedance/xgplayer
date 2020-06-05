import Plugin from '../../plugin'

const {Events, Util, Sniffer, POSITIONS} = Plugin

export default class PlaybackRate extends Plugin {
  static get pluginName () {
    return 'playbackRate'
  }
  // 默认配置信息
  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGTH,
      index: 4,
      list: [0.5, 0.75, {rate: 1, iconText: '倍速'}, 1.5, 2]
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
    this.once(Events.CANPLAY, () => {
      this.show()
    })
    if (Sniffer.device === 'mobile') {
      this.activeEvent = 'touchend'
    } else {
      this.activeEvent = 'mouseenter'
    }
    this.renderItemList();
    this.onMouseenter = this.onMouseenter.bind(this)
    this.onItemClick = this.onItemClick.bind(this)
    this.bind(this.activeEvent, this.onMouseenter)
    this.bind('mouseleave', this.onMouseenter)
    this.bind('.option-list li', ['touchend', 'click'], this.onItemClick)
  }

  show () {
    if (!this.config.list || this.config.list.length === 0) {
      return;
    }
    super.show()
  }

  registerLangauageTexts () {
    console.log('registerLangauageTexts')
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
    const {curRate, config, player} = this
    if (!lang) {
      lang = player.lang
    }
    let text = ''
    config.list.map(item => {
      if (Number(item) === curRate || Number(item.rate) === curRate) {
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

  onMouseenter (e) {
    e.preventDefault()
    e.stopPropagation()
    const ulDom = this.find('.option-list')
    if (Util.hasClass(ulDom, 'active')) {
      this.player.controls.unFocus()
      Util.removeClass(ulDom, 'active')
    } else {
      this.player.controls.focus()
      Util.addClass(ulDom, 'active')
    }
  }

  onItemClick (e) {
    const target = e.target
    const cname = target.getAttribute('cname')
    if (Number(cname) === this.curRate) {
      return false
    }
    Util.removeClass(this.find('.selected'), 'selected')
    Util.addClass(target, 'selected')
    this.curRate = Number(cname)
    this.player.playbackRate = Number(cname)
    this.find('.icon-text').innerHTML = this.getCurrentText()
  }

  destroy () {
    this.unbind(this.activeEvent, this.onMouseenter)
    this.unbind('mouseleave', this.onMouseenter)
    this.unbind('.option-list li', ['touched', 'click'], this.onItemClick)
  }

  renderItemList () {
    const playbackRate = this.player.playbackRate || 1
    this.curRate = playbackRate
    const items = this.config.list.map((item) => {
      let itemInfo = typeof item === 'object' ? item : {rate: item}
      !itemInfo.text && (itemInfo.text = `${itemInfo.rate}x`)
      if (itemInfo.rate === playbackRate) {
        itemInfo.isCurrent = true
      }
      return `<li cname="${itemInfo.rate}" ctext="${item.iconText || itemInfo.text}" class="${itemInfo.isCurrent ? 'selected' : ''}">${itemInfo.text}</li>`
    })
    this.find('.option-list').innerHTML = items.join('')
    this.find('.icon-text').innerHTML = this.getCurrentText()
    this.show()
  }

  render () {
    return `<xg-icon class="xgplayer-playbackrate">
    <div class="xgplayer-icon btn-text">
    <span class="icon-text" lang-key="currate-text"></span>
    </div>
    <ul class="option-list">
    </ul>
   </xg-icon>`
  }
}
