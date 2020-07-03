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

  // 扩展语言
  registerLangauageTexts () {
    return {
      'replay': {
        jp: 'リプレイ',
        en: 'rePlay',
        zh: '重播'
      }
    }
  }

  afterCreate () {
    Plugin.insert(this.icons.replay, this.root, 0)

    const handleReplay = (e) => {
      e.preventDefault()
      e.stopPropagation()
      this.player.replay()
      Plugin.Util.removeClass(this.player.root, 'replay')
    }

    this.bind('svg', 'click', handleReplay)
    this.bind('.xgplayer-replay-txt', 'click', handleReplay)

    this.on(Plugin.Events.ENDED, () => {
      if (!this.playerConfig.loop) {
        Plugin.Util.addClass(this.player.root, 'replay')
      }
      if (this.config.disable) {
        return
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

  show () {
    if (this.config.disable) {
      return
    }
    super.show()
  }

  hide () {
    if (this.config.disable) {
      return
    }
    super.hide()
  }

  enable () {
    this.config.disable = false
  }

  disable () {
    this.config.disable = true
    this.hide()
  }

  render () {
    return `<xg-replay class="xgplayer-replay">
      <xg-replay-txt class="xgplayer-replay-txt" lang-key="replay">${this.langText.replay || '重播'}</xg-replay-txt>
    </xg-replay>`
  }
}
export default Replay
