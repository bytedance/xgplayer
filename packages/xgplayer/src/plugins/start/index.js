import Plugin, { Util, Events } from '../../plugin'
import PlaySvg from '../assets/play.svg'
import PauseSvg from '../assets/pause.svg'
import { STATES } from '../../state'

/**
 * @typedef {{
 *  isShowPause?: boolean, // 暂停是否常驻
 *  isShowEnd?: boolean, // 播放结束常驻
 *  disableAnimate?: boolean, // 禁用点击动画
 *  mode?: 'hide' | 'show' | 'auto' // 控制模式: hide 常驻: show 跟随：auto
 *  [propName: string]: any
 * }} IStartConfig
 */

const AnimateMap = {}
function addAnimate (key, seconds, callback = { start: null, end: null }) {
  if (AnimateMap[key]) {
    window.clearTimeout(AnimateMap[key].id)
  }
  AnimateMap[key] = {}
  callback.start && callback.start()
  AnimateMap[key].id = window.setTimeout(() => {
    callback.end && callback.end()
    window.clearTimeout(AnimateMap[key].id)
    delete AnimateMap[key]
  }, seconds)
}

function clearAnimation () {
  Object.keys(AnimateMap).map(key => {
    window.clearTimeout(AnimateMap[key].id)
    delete AnimateMap[key]
  })
}

class Start extends Plugin {
  static get pluginName () {
    return 'start'
  }

  /**
   * @type IStartConfig
   */
  static get defaultConfig () {
    return {
      isShowPause: false, // 暂停是否常驻
      isShowEnd: false, // 播放结束常驻
      disableAnimate: false, // 禁用点击动画
      mode: 'hide' // 控制模式: hide 常驻: show 跟随：auto
    }
  }

  constructor (args) {
    super(args)
    this.autoPlayStart = false
  }

  afterCreate () {
    const { player, playerConfig } = this

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
      const className = this.config.mode === 'auto' ? 'auto-hide' : 'hide'
      Util.addClass(this.root, className)
      this.autoPlayStart = true
      this.onPlayPause('play')
    })

    if (!playerConfig.autoplay) {
      this.show()
    }

    this.on(Events.AUTOPLAY_PREVENTED, () => {
      const className = this.config.mode === 'auto' ? 'auto-hide' : 'hide'
      this.setAttr('data-state', 'play')
      Util.removeClass(this.root, className)
      this.show()
    })

    this.on(Events.PLAY, () => {
      this.onPlayPause('play')
    })

    this.on(Events.PAUSE, () => {
      this.onPlayPause('pause')
    })

    this.clickHandler = this.hook('click', this.switchPausePlay, {
      pre: (e) => {
        e.preventDefault()
        e.stopPropagation()
        const { paused } = this.player
        this.emitUserAction(e, 'switch_play_pause', { props: 'paused', from: paused, to: !paused })
      }
    })

    this.bind(['click', 'touchend'], this.clickHandler)
  }

  preventDefault (e) {

  }

  registerIcons () {
    return {
      startPlay: { icon: PlaySvg, class: 'xg-icon-play' },
      startPause: { icon: PauseSvg, class: 'xg-icon-pause' }
    }
  }

  initIcons () {
    const { icons } = this
    this.appendChild('xg-start-inner', icons.startPlay)
    this.appendChild('xg-start-inner', icons.startPause)
  }

  hide () {
    Util.addClass(this.root, 'hide')
  }

  show () {
    Util.removeClass(this.root, 'hide')
  }

  focusHide () {
    Util.addClass(this.root, 'focus-hide')
  }

  recover () {
    Util.removeClass(this.root, 'focus-hide')
  }

  switchStatus (isAnimate) {
    if (isAnimate) {
      this.setAttr('data-state', !this.player.paused ? 'play' : 'pause')
    } else {
      this.setAttr('data-state', this.player.paused ? 'play' : 'pause')
    }
  }

  animate (endShow) {
    addAnimate('pauseplay', 400, {
      start: () => {
        Util.addClass(this.root, 'interact')
        this.show()
        this.switchStatus(true)
      },
      end: () => {
        Util.removeClass(this.root, 'interact')
        !endShow && this.hide()
      }
    })
  }

  switchPausePlay (e) {
    const { player } = this
    e.preventDefault()
    e.stopPropagation()
    if (!player.isReady) {
      return
    }
    const paused = this.player.paused
    if (!paused && player.state === STATES.RUNNING) {
      player.pause()
    } else {
      player.play()
    }
  }

  onPlayPause (status) {
    const { config, player } = this
    if (player.state < STATES.RUNNING || !this.autoPlayStart) {
      return
    }
    // 一直显示
    if (config.mode === 'show') {
      this.switchStatus()
      this.show()
      return
    }

    // 跟随播放器的focus状态显示和隐藏
    if (config.mode === 'auto') {
      this.switchStatus()
      return
    }
    // 暂停/播放结束状态强制显示
    if ((config.isShowPause && player.paused && !player.ended) || (config.isShowEnd && player.ended)) {
      this.switchStatus()
      this.show()
      return
    }

    if (config.disableAnimate) {
      this.switchStatus()
      this.hide()
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
    this.unbind(['click', 'touchend'], this.clickHandler)
    clearAnimation()
  }

  render () {
    const className = this.playerConfig.autoplay ? (this.config.mode === 'auto' ? 'auto-hide' : 'hide') : ''
    return `
    <xg-start class="xgplayer-start ${className}">
    <xg-start-inner></xg-start-inner>
    </xg-start>`
  }
}

export default Start
