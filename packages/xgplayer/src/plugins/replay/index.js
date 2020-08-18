import Plugin from '../../plugin'
import ReplaySvg from '../assets/replay.svg'

class Replay extends Plugin {
  static get pluginName () {
    return 'replay'
  }

  static get defaultConfig () {
    return {
      disable: false
    }
  }

  registerIcons () {
    return {
      'replay': ReplaySvg
    }
  }

  afterCreate () {
    Plugin.insert(this.icons.replay, this.root, 0)
    this.handleReplay = this.handleReplay.bind(this)
    this.bind('svg', 'click', this.handleReplay)
    this.bind('.xgplayer-replay-txt', 'click', this.handleReplay)

    this.on(Plugin.Events.ENDED, () => {
      if (!this.playerConfig.loop) {
        Plugin.Util.addClass(this.player.root, 'replay')
      }
      if (this.config.disable) {
        return
      }
      this.show()
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

    this.on(Plugin.Events.PLAY, () => {
      this.hide()
    })
  }

  handleReplay (e) {
    e.preventDefault()
    e.stopPropagation()
    this.player.replay()
    Plugin.Util.removeClass(this.player.root, 'replay')
  }

  show () {
    if (this.config.disable) {
      return
    }
    this.root.style.display = 'flex'
  }

  enable () {
    this.config.disable = false
  }

  disable () {
    this.config.disable = true
    this.hide()
  }

  destroy () {
    this.unbind('svg', 'click', this.handleReplay)
    this.unbind('.xgplayer-replay-txt', 'click', this.handleReplay)
  }

  render () {
    return `<xg-replay class="xgplayer-replay">
      <xg-replay-txt class="xgplayer-replay-txt" lang-key="${this.i18nKeys.REPLAY}">${this.i18n.REPLAY || '重播'}</xg-replay-txt>
    </xg-replay>`
  }
}
export default Replay
