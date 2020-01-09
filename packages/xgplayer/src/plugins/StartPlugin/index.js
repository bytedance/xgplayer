import {Plugin} from '../../pluginsManager'
import StartPlayIcon from '../assets/startPlay.svg'
import StartPauseIcon from '../assets/startPause.svg'
import './index.scss'

class Start extends Plugin {
  static get pluginName(){
    return 'start'
  }

  afterCreate(){
    const { Util } = Plugin
    const { player, root, playerConfig} = this
    Util.addClass(root, 'xgplayer-skin-default')
    this.once('ready', () => {
      Util.addClass(root, 'xgplayer-skin-default')
      if (playerConfig) {
        if (playerConfig.lang && playerConfig.lang === 'en') {
          Util.addClass(root, 'lang-is-en')
        } else if (playerConfig.lang === 'jp') {
          Util.addClass(root, 'lang-is-jp')
        }
      }
    })

    this.bind('svg', 'click', (e) => {
      if (!player.isReady) {
        return;
      }
      e.preventDefault()
      e.stopPropagation()
      if (Util.hasClass(root, 'xgplayer-nostart')) {
        Util.removeClass(root, 'xgplayer-nostart') // for ie quick switch
        Util.addClass(root, 'xgplayer-is-enter')
        player.on('canplay', () => {
          Util.removeClass(root, 'xgplayer-is-enter')
        })
        player.once('playing', () => Util.removeClass(root, 'xgplayer-is-enter'))
        if (!root.querySelector('video')) {
          player.start()
        }
        player.play().catch(err => {})
      } else {
        if (player.paused) {
          Util.removeClass(root, 'xgplayer-nostart xgplayer-isloading')
          setTimeout(() => {
            player.play().catch(err => {})
          }, 10)
        }
      }
    })
  }

  registerIcons() {
    return {
      'startPlayIcon': StartPlayIcon,
      'startPauseIcon': StartPauseIcon
    }
  }

  render(){
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