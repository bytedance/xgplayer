import pasition from 'pasition'
import Plugin from '../../plugin'
import StartIcon from '../assets/start.svg'
import './index.scss'

const { Util } = Plugin
class Start extends Plugin {
  static get pluginName () {
    return 'start'
  }

  afterCreate () {
    const {player, root, playerConfig} = this
    Util.addClass(root, 'xgplayer-skin-default')
    this.once('ready', () => {
      if (playerConfig) {
        if (playerConfig.lang && playerConfig.lang === 'en') {
          Util.addClass(root, 'lang-is-en')
        } else if (playerConfig.lang === 'jp') {
          Util.addClass(root, 'lang-is-jp')
        }
      }
    })

    this.bind('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      if (!player.isReady) {
        return;
      }
      const paused = this.player.paused
      if (!paused) {
        this.player.pause()
      } else {
        this.player.play()
      }
    })
    this.on(['play', 'pause'], () => {
      this.setInterval()
      this.animate()
    })
  }

  setInterval () {
    clearTimeout(this.interval)
    Util.addClass(this.el, 'interact')
    this.show()
    this.intervalId = setTimeout(() => {
      this.clearInterval()
      this.hide();
    }, 400);
  }

  clearInterval () {
    clearTimeout(this.interval)
    this.intervalId = null
    Util.removeClass(this.el, 'interact');
  }

  registerIcons () {
    return {
      'start': StartIcon
    }
  }

  animate () {
    const path = this.find('#path')
    const pathPlay = this.find('#path_play').getAttribute('d')
    const pathPause = this.find('#path_pause').getAttribute('d')
    pasition.animate({
      from: pathPlay,
      to: pathPlay,
      time: 1500,
      end: () => {
        path.setAttribute('d', pathPlay)
        if (this.player.paused) {
          path.setAttribute('d', pathPlay)
        } else {
          path.setAttribute('d', pathPause)
        }
      }
    })
  }

  render () {
    return `
    <xg-start class="xgplayer-start" >
      ${this.icons.start}
    </xg-start>`
  }
}

export default Start
