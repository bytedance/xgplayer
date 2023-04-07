import Plugin, { STATE_CLASS, Util } from '../../plugin'
import './index.scss'

/**
 * 消息组件
 */
class Prompt extends Plugin {
  static get pluginName () {
    return 'prompt'
  }

  static get defaultConfig () {
    return {
      interval: 3000,
      style: {},
      mode: 'arrow',
      autoHide: true,
      detail: {
        text: '',
        highlight: ''
      },
      onClick: () => {
      }
    }
  }

  afterCreate () {
    this.intervalId = 0
    this.customConfig = null
    this.bind('.highlight', ['click', 'touchend'], (e) => {
      if (this.config.onClick || this.customOnClick) {
        e.preventDefault()
        e.stopPropagation()
        this.customOnClick ? this.customOnClick(e) : this.config.onClick(e)
      }
    })

    this.player.showPrompt = (...args) => {
      this.show(...args)
    }

    this.player.hidePrompt = () => {
      this.hide()
    }
  }

  setStyle (style) {
    Object.keys(style).map(key => {
      this.root.style[key] = style[key]
    })
  }

  show (detail, config = {}, onClick = () => {}) {
    if (!detail) {
      return
    }
    this.customOnClick = onClick
    const { interval } = this.config
    if (this.intervalId) {
      clearTimeout(this.intervalId)
      this.intervalId = null
    }
    Util.addClass(this.root, 'show')
    config.mode === 'arrow' && Util.addClass(this.root, 'arrow')
    if (typeof detail === 'string') {
      this.find('.xgplayer-prompt-detail').innerHTML = detail
    } else {
      this.find('.xgplayer-prompt-detail').innerHTML = `${detail.text || ''}` + `${detail.highlight ? `<i class="highlight">${detail.highlight}</i>` : ''}`
    }

    config.style && this.setStyle(config.style)

    const autoHide = typeof config.autoHide === 'boolean' ? config.autoHide : this.config.autoHide
    if (autoHide) {
      const hideinterval = config.interval || interval
      this.intervalId = setTimeout(() => {
        this.hide()
      }, hideinterval)
    }
  }

  hide () {
    Util.removeClass(this.root, 'show')
    Util.removeClass(this.root, 'arrow')
    this.root.removeAttribute('style')
    this.customOnClick = null
  }

  render () {
    return `<xg-prompt class="xgplayer-prompt ${STATE_CLASS.CONTROLS_FOLLOW}">
    <span class="xgplayer-prompt-detail"></span>
    </xg-prompt>`
  }
}

export default Prompt
