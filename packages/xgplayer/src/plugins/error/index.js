import Plugin, { Events, Util } from '../../plugin'

export default class ErrorPlugin extends Plugin {
  static get pluginName () {
    return 'error'
  }

  afterCreate () {
    this.clickHandler = this.hook('errorRetry', this.errorRetry, {
      pre: (e) => {
        e.preventDefault()
        e.stopPropagation()
      }
    })

    this.onError = this.hook('showError', this.handleError)

    this.bind('.xgplayer-error-refresh', 'click', this.clickHandler)
    this.on(Events.CANPLAY, () => {
      this.handleCanPlay()
    })

    this.on(Events.ERROR, (error) => {
      this.onError(error)
    })
  }

  errorRetry () {
    this.player.retry()
  }

  handleCanPlay () {
    Util.removeClass(this.player.root, 'xgplayer-is-error')
  }

  handleError (error = {}) {
    const { player } = this
    const type = error.errorType
    let errorNote = player.errorNote ? this.i18n[player.errorNote] : ''
    if (!errorNote) {
      switch (type) {
        case 'decoder':
          errorNote = this.i18n.MEDIA_ERR_DECODE
          break
        case 'network':
          errorNote = this.i18n.MEDIA_ERR_NETWORK
          break
        default:
          errorNote = this.i18n.MEDIA_ERR_SRC_NOT_SUPPORTED
      }
    }
    this.find('.xgplayer-error-text').innerHTML = errorNote
    this.find('.xgplayer-error-tips').innerHTML = `${this.i18n.REFRESH_TIPS}<span class="xgplayer-error-refresh">${this.i18n.REFRESH}</span>`
  }

  destroy () {
    this.unbind('.xgplayer-error-refresh', 'click', this.clickHandler)
  }

  render () {
    return `<xg-error class="xgplayer-error">
      <div class="xgplayer-errornote">
       <span class="xgplayer-error-text"></span>
       <span class="xgplayer-error-tips"><em class="xgplayer-error-refresh"></em></span>
      </div>
    </xg-error>`
  }
}
