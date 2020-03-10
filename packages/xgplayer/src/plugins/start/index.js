import Plugin from '../../plugin'
import PlaySvg from '../assets/play.svg'
import PauseSvg from '../assets/pause.svg'

const AnimateMap = {}
function addAnimate (key, seconds, callback = {start: null, end: null}) {
  if (AnimateMap[key]) {
    window.clearTimeout(AnimateMap[key].id)
  }
  AnimateMap[key] = {}
  callback.start && callback.start()
  AnimateMap[key].id = window.setTimeout(() => {
    callback.end && callback.end()
    window.clearTimeout(AnimateMap[key].id)
    delete AnimateMap[key]
  }, seconds);
}

const { Util, Events } = Plugin
class Start extends Plugin {
  static get pluginName () {
    return 'start'
  }

  static get defaultConfig () {
    return {
      isShowPause: false
    }
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

    if (!player.config.autoplay) {
      this.show();
    }

    this.bind('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      if (!player.isReady) {
        return;
      }
      const paused = this.player.paused
      if (!this.player.hasStart) {
        this.player.start()
        this.player.once('complete', () => {
          this.player.play()
        })
      } else {
        if (!paused) {
          this.player.pause()
        } else {
          this.player.play()
        }
      }
    })
    this.on([Events.PLAY, Events.PAUSE], () => {
      this.animate()
    })
    this.on(Events.AUTOPLAY_PREVENTED, () => {
      this.show('inline-block');
      this.animate(true)
    })
  }

  registerIcons () {
    return {
      play: PlaySvg,
      pause: PauseSvg
    }
  }

  animate (isShowEnded) {
    if (this.config.isShowPause && (isShowEnded || this.player.paused)) {
      this.show()
      this.root.innerHTML = this.icons.play
      return;
    }
    addAnimate('pauseplay', 400, {
      start: () => {
        Util.addClass(this.root, 'interact')
        this.show()
        this.root.innerHTML = this.player.paused ? this.icons.pause : this.icons.play
      },
      end: () => {
        Util.removeClass(this.root, 'interact');
        if (this.config.isShowPause && (this.player.paused || isShowEnded)) {
          return;
        }
        this.hide()
      }
    })
  }

  render () {
    return `
    <xg-start class="xgplayer-start" >
      <div class="play">
      ${this.icons.play}
      </div>
    </xg-start>`
  }
}

export default Start
