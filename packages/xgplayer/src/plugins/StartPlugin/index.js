import Plugin from '../../plugin'
import StartPlayIcon from '../assets/startPlay.svg'
import StartPauseIcon from '../assets/startPause.svg'
import './index.scss'

class Start extends Plugin {
  static get pluginName () {
    return 'start'
  }

  afterCreate () {
    const { Util } = Plugin
    const {player, root, playerConfig} = this
    Util.addClass(root, 'xgplayer-skin-default')
    this.once('ready', () => {
      // Util.addClass(root, 'xgplayer-skin-default')
      if (playerConfig) {
        if (playerConfig.lang && playerConfig.lang === 'en') {
          Util.addClass(root, 'lang-is-en')
        } else if (playerConfig.lang === 'jp') {
          Util.addClass(root, 'lang-is-jp')
        }
      }
    })

    this.bind('click', (e) => {
      if (!player.isReady) {
        return;
      }
      e.preventDefault()
      e.stopPropagation()
      const paused = this.player.paused
      if (!paused) {
        this.player.pause()
      } else {
        this.player.play()
      }
    })
  }

  registerIcons () {
    return {
      'startPlayIcon': StartPlayIcon,
      'startPauseIcon': StartPauseIcon
    }
  }

  render () {
    return `
    <xg-start class="xgplayer-start">
      <div class="xgplayer-icon-play">
      ${this.icons.startPlayIcon}
      </div>
      <div class="xgplayer-icon-pause">
      ${this.icons.startPauseIcon}
      </div>
    </xg-start>`
  }
}

export default Start
