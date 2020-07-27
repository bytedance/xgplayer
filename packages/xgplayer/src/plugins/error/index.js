import Player from '../../player'
import Plugin from '../../plugin'

export default class ErrorPlugin extends Plugin {
  static get pluginName () {
    return 'error'
  }

  afterCreate () {
    this.bind('.xgplayer-error-refresh', 'click', (e) => {
      e.preventDefault()
      this.player.replay()
      Plugin.Util.removeClass(this.player.root, 'replay')
    })
    this.on(Player.Events.CANPLAY, this.handleCanPlay.bind(this))
    this.on(Player.Events.ERROR, this.handleError.bind(this))
  }

  handleCanPlay () {
    Plugin.Util.removeClass(this.player.root, 'xgplayer-is-error')
  }

  handleError () {
    const { player } = this;
    const textDOM = this.find('.xgplayer-error-text');
    if (player.error) {
      textDOM.innerHTML = player.error
    } else {
      if (player.config.lang && player.config.lang === 'zh-cn') {
        textDOM.innerHTML = player.lang.ERROR
      } else {
        this.root.innerHTML = `${player.lang.ERROR || 'play error'}，please try to <span class="xgplayer-error-refresh">refresh</span>`
      }
    }
  }
  render () {
    return `<xg-error class="xgplayer-error">
      <em class="xgplayer-error-text"></em>请<span class="xgplayer-error-refresh">刷新</span>试试
    </xg-error>`
  }
}
