import Plugin from '../../plugin'
import PlaySvg from '../assets/play.svg'
import PauseSvg from '../assets/pause.svg'
const { Util, Events } = Plugin

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

class Start extends Plugin {
  static get pluginName () {
    return 'start'
  }

  static get defaultConfig () {
    return {
      isShowPause: false, // 暂停是否常驻
      isShowEnd: false, // 播放结束常驻
      disableAmimate: false, // 禁用点击动画
      mode: 'hide' // 控制模式: hide 常驻: show 跟随：auto
    }
  }

  constructor (args) {
    super(args)
    this.autoPlayStart = false
  }

  afterCreate () {
    const {player, playerConfig} = this
    this.initIcons()
    this.once(Events.READY, () => {
      if (playerConfig) {
        if (playerConfig.lang && playerConfig.lang === 'en') {
          Util.addClass(player.root, 'lang-is-en')
        } else if (playerConfig.lang === 'jp') {
          Util.addClass(player.root, 'lang-is-jp')
        }
      }
    })

    this.on(Events.AUTOPLAY_STARTED, () => {
      this.autoPlayStart = true
      this.onPlayPause('play')
    })

    if (!playerConfig.autoplay) {
      this.show();
    }

    this.on(Events.AUTOPLAY_PREVENTED, () => {
      this.setAttr('data-state', 'play')
      this.show();
    })

    this.on(Events.PLAY, () => {
      this.onPlayPause('play')
    })

    this.on(Events.PAUSE, () => {
      this.onPlayPause('pause')
    })

    this.onClick = this.onClick.bind(this)

    this.bind(['click', 'touchend'], this.onClick)
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

  hide () {
    Util.addClass(this.root, 'hide')
  }

  show () {
    Util.removeClass(this.root, 'hide')
  }

  switchStatus (isAnimate) {
    if (isAnimate) {
      this.setAttr('data-state', !this.player.paused ? 'play' : 'pause')
    } else {
      this.setAttr('data-state', this.player.paused ? 'play' : 'pause')
    }
  }

  animate (endShow) {
    if ((this.config.isShowPause && this.player.paused && !this.player.ended) || (this.config.isShowEnd && this.player.ended)) {
      this.show()
      this.switchStatus()
      return
    }
    if (this.player.disableAmimate || this.config.disableAnimate) {
      return;
    }
    addAnimate('pauseplay', 400, {
      start: () => {
        Util.addClass(this.root, 'interact')
        this.show()
        this.switchStatus(true)
      },
      end: () => {
        Util.removeClass(this.root, 'interact');
        !endShow && this.hide()
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
    if (!paused && player.isPlaying) {
      player.pause()
    } else {
      player.play()
    }
  }

  onPlayPause (status) {
    const {config, player} = this
    if (!player.isPlaying || !this.autoPlayStart) {
      return
    }
    if (config.mode === 'show') {
      this.switchStatus()
      this.show()
      return
    }
    if (config.mode === 'auto') {
      this.switchStatus()
      return
    }
    if ((config.isShowPause && player.paused && !player.ended) || (config.isShowEnd && player.ended)) {
      this.show()
      this.switchStatus()
      return
    }
    if (status === 'play') {
      this.autoPlayStart ? this.animate() : this.hide()
    } else {
      if (!this.autoPlayStart) {
        return
      }
      this.animate()
    }
  }

  destroy () {
    this.unbind(['click', 'touchend'], this.onClick)
  }

  render () {
    const className = this.config.mode === 'auto' ? 'auto-hide' : 'hide'
    return `
    <xg-start class="xgplayer-start ${className}">
      <div class="icon">
      </div>
    </xg-start>`
  }
}

export default Start
