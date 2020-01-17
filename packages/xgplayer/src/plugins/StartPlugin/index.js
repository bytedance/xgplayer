import pasition from 'pasition'
import Plugin from '../../plugin'
import StartIcon from '../assets/start.svg'
import './index.scss'

const { Util, Events } = Plugin
class Start extends Plugin {
  static get pluginName () {
    return 'startplugin'
  }

  afterCreate () {
    const {player, root, playerConfig} = this
    this.once(Events.READY, () => {
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
    this.on([Events.PLAY, Events.PAUSE], () => {
      // this.setInterval()
      this.animate()
    })
    this.on(Events.AUTOPLAY_PREVENTED, () => {
      this.show('inline-block');
      // this.clearInterval()
      this.animate(true)
    })
  }

  registerIcons () {
    return {
      'start': StartIcon
    }
  }

  animate (isShowEnded) {
    const path = this.find('#path')
    const pathPlay = this.find('#path_play').getAttribute('d')
    const pathPause = this.find('#path_pause').getAttribute('d')
    const paused = this.player.paused
    pasition.animate({
      from: path.getAttribute('d'),
      to: paused ? pathPause : pathPlay,
      time: 400,
      begin: (shapes) => {
        this.show()
        Util.addClass(this.el, 'interact')
      },
      end: (shapes) => {
        Util.removeClass(this.el, 'interact')
        if (!this.player.paused) {
          this.hide()
          path.setAttribute('d', pathPause)
        } else {
          (!this.config.isShowPause && !isShowEnded) && this.hide()
          path.setAttribute('d', pathPlay)
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
