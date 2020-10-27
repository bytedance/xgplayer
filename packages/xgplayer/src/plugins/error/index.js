import Plugin, {hooksDescriptor, Events} from '../../plugin'

export default class ErrorPlugin extends Plugin {
  static get pluginName () {
    return 'error'
  }

  afterCreate () {
    hooksDescriptor(this)

    this.clickHandler = this.hook('errorRetry', this.errorRetry, {
      pre: (e) => {
        e.preventDefault()
        e.stopPropagation()
      }})

    this.bind('.xgplayer-error-refresh', 'click', this.clickHandler)
    this.on(Events.CANPLAY, () => {
      this.handleCanPlay()
    })
    this.on(Events.ERROR, () => {
      this.handleError()
    })
  }

  errorRetry () {
    this.player.retry()
  }

  handleCanPlay () {
    Plugin.Util.removeClass(this.player.root, 'xgplayer-is-error')
  }

  handleError () {
    const { player } = this;
    const errorNote = player.error
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
