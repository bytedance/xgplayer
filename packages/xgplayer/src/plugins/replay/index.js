import Plugin from '../../plugin'
import ReplayIcon from '../assets/replay.svg'

class Replay extends Plugin {
  static get pluginName () {
    return 'Replay'
  }

  registerIcons () {
    return {
      'replay': ReplayIcon
    }
  }

  // 扩展语言
  registerLangauageTexts () {
    return {
      'replay': {
        jp: '日文text',
        en: 'rePlay',
        zh: '重播'
      }
    }
  }

  afterCreate () {
    this.bind('svg', 'click', (e) => {
      e.preventDefault()
      this.player.replay()
      Plugin.Util.removeClass(this.player.root, 'replay')
    })

    this.on(Plugin.Events.ENDED, () => {
      if (!this.playerConfig.loop) {
        Plugin.Util.addClass(this.player.root, 'replay')
      }
      let path = this.root.querySelector('path')
      if (path) {
        let transform = window.getComputedStyle(path).getPropertyValue('transform')
        if (typeof transform === 'string' && transform.indexOf('none') > -1) {
          return null
        } else {
          path.setAttribute('transform', transform)
        }
      }
    })
  }

  render () {
    return `<xg-replay class="xgplayer-replay">
      ${this.icons.replay}
      <xg-replay-txt class="xgplayer-replay-txt">${this.text.replay}</xg-replay-txt>
    </xg-replay>`
  }
}
export default Replay
