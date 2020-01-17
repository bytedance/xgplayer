import pasition from 'pasition'
import Plugin from '../../plugin'
import StartIcon from '../assets/start.svg'
import './index.scss'

const { Util, Events } = Plugin
class Start extends Plugin {
  static get pluginName () {
    return 'start'
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
      console.log('>>>>>>>intervalId PLAY PAUSE')
      // this.setInterval()
      this.animate()
    })
    this.on(Events.AUTOPLAY_PREVENTED, () => {
      console.log('>>>>>>>intervalId AUTOPLAY_PREVENTED')
      this.show('inline-block');
      // this.clearInterval()
      this.animate()
    })
  }

  setInterval () {
    clearTimeout(this.intervalId)
    Util.addClass(this.el, 'interact')
    this.show('inline-block')
    this.intervalId = setTimeout(() => {
      console.log('>>>hide')
      this.clearInterval()
      this.hide();
    }, 400);
  }

  clearInterval () {
    clearTimeout(this.intervalId)
    this.intervalId = null
    console.log('this.el', this.el)
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
      time: 400,
      begin: (shapes) => {
        this.show()
        console.log('>>>>>>>>>>begin')
        Util.addClass(this.el, 'interact')
      },
      end: () => {
        console.log('>>>>>>>>>>>ended ' + this.player.paused)
        Util.removeClass(this.el, 'interact')
        path.setAttribute('d', pathPlay)
        if (this.player.paused) {
          path.setAttribute('d', pathPlay)
        } else {
          this.hide()
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
