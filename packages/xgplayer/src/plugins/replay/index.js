import Plugin, { Events, Util } from '../../plugin'
import ReplaySvg from '../assets/replay.svg'
import './index.scss'

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
      replay: ReplaySvg
    }
  }

  afterCreate () {
    if (!this.root) {
      return
    }
    Plugin.insert(this.icons.replay, this.root, 0)
    this.__handleReplay = this.hook('replayClick', () => {
      this.player.replay()
    }, {
      pre: (e) => {
        e.preventDefault()
        e.stopPropagation()
      }
    })

    this.bind('.xgplayer-replay', ['click', 'touchend'], this.__handleReplay)
    // this.bind('svg', ['click', 'touchend'], this.__handleReplay)
    // this.bind('.xgplayer-replay-txt', ['click', 'touchend'], this.__handleReplay)

    this.on(Events.ENDED, () => {
      if (!this.playerConfig.loop) {
        Util.addClass(this.player.root, 'replay')
      }
      if (this.config.disable) {
        return
      }
      this.show()
      const path = this.root.querySelector('path')
      if (path) {
        const transform = window.getComputedStyle(path).getPropertyValue('transform')
        if (typeof transform === 'string' && transform.indexOf('none') > -1) {
          return null
        } else {
          path.setAttribute('transform', transform)
        }
      }
    })

    this.on(Events.PLAY, () => {
      this.hide()
    })
  }

  handleReplay (e) {
    e.preventDefault()
    e.stopPropagation()
    this.player.replay()
    Util.removeClass(this.player.root, 'replay')
  }

  /**
   * @param {string} [value]
   * @returns
   */
  show (value) {
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
    this.unbind('.xgplayer-replay', ['click', 'touchend'], this.__handleReplay)
  }

  render () {
    return `<xg-replay class="xgplayer-replay">
      <xg-replay-txt class="xgplayer-replay-txt" lang-key="${this.i18nKeys.REPLAY}">${this.i18n.REPLAY}</xg-replay-txt>
    </xg-replay>`
  }
}
export default Replay
