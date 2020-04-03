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

const { Util, Events, Sniffer } = Plugin

class Start extends Plugin {
  static get pluginName () {
    return 'start'
  }

  static get defaultConfig () {
    return {
      isShowPause: false,
      isShowEnd: false,
      disableAmimate: false
    }
  }

  afterCreate () {
    const {player, playerConfig} = this
    this.initIcons()
    if (Sniffer.device === 'mobile') {
      this.config.isShowPause = true
    }
    this.once(Events.READY, () => {
      if (playerConfig) {
        if (playerConfig.lang && playerConfig.lang === 'en') {
          Util.addClass(player.root, 'lang-is-en')
        } else if (playerConfig.lang === 'jp') {
          Util.addClass(player.root, 'lang-is-jp')
        }
      }
    })

    if (!playerConfig.autoplay) {
      this.show();
    }

    this.onClick = this.onClick.bind(this)

    this.bind('click', this.onClick)

    this.on([Events.PLAY, Events.PAUSE], () => {
      this.player.isPlaying ? this.animate() : this.hide()
    })
    this.on(Events.AUTOPLAY_PREVENTED, () => {
      this.show();
    })
  }

  registerIcons () {
    return {
      startPlay: {icon: PlaySvg, class: 'xg-icon-play'},
      startPause: {icon: PauseSvg, class: 'xg-icon-pause'}
    }
  }

  initIcons () {
    const {icons} = this
    this.appendChild('.icon', icons.startPlay)
    this.appendChild('.icon', icons.startPause)
  }

  animate (isEnded) {
    if ((this.config.isShowPause && this.player.paused && !this.player.ended) || this.player.ended || isEnded) {
      if (this.player.ended && !this.config.isShowEnd) {
        return
      }
      this.show()
      this.setAttr('data-state', this.player.paused ? 'pause' : 'play')
      return;
    }
    if (this.player.disableAmimate || this.config.disableAnimate) {
      return;
    }
    addAnimate('pauseplay', 400, {
      start: () => {
        Util.addClass(this.root, 'interact')
        this.show()
        this.setAttr('data-state', this.player.paused ? 'pause' : 'play')
      },
      end: () => {
        Util.removeClass(this.root, 'interact');
        if (this.config.isShowPause && (this.player.paused || isEnded)) {
          return;
        }
        this.hide()
      }
    })
  }

  onClick (e) {
    const {player} = this
    e.preventDefault()
    e.stopPropagation()
    if (!player.isReady) {
      return;
    }
    const paused = this.player.paused
    if (!player.hasStart) {
      player.start()
      player.once('complete', () => {
        player.play()
      })
    } else {
      if (!paused) {
        player.pause()
      } else {
        player.play()
      }
    }
  }

  destroy () {
    this.unbind('click', this.onClick)
  }

  render () {
    return `
    <xg-start class="xgplayer-start" >
      <div class="icon">
      </div>
    </xg-start>`
  }
}

export default Start
