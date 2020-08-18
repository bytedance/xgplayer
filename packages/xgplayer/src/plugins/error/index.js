import Player from '../../player'
import Plugin from '../../plugin'

export default class ErrorPlugin extends Plugin {
  static get pluginName () {
    return 'error'
  }

  afterCreate () {
    this.errorRetry = this.errorRetry.bind(this)
    this.bind('.xgplayer-error-refresh', 'click', this.errorRetry)
    this.on(Player.Events.CANPLAY, this.handleCanPlay.bind(this))
    this.on(Player.Events.ERROR, this.handleError)
  }

  errorRetry (e) {
    e.preventDefault()
    e.stopPropagation()
    this.player.replay()
    Plugin.Util.removeClass(this.player.root, 'replay')
  }

  errorRetry (e) {
    e.preventDefault()
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
    this.unbind('.xgplayer-error-refresh', 'click', this.errorRetry)
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
