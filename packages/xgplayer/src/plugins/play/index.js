import Plugin from '../../plugin'
import PlaySvg from '../assets/play.svg'
import PauseSvg from '../assets/pause.svg'

const {Events, POSITIONS} = Plugin

class Play extends Plugin {
  static get pluginName () {
    return 'play'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_LEFT,
      index: 0,
      disable: false
    }
  }

  afterCreate () {
    const { player, config } = this
    if (config.disable) {
      return
    }
    this.initIcons()
    this.btnClick = this.btnClick.bind(this)
    this.bind(['touchend', 'click'], this.btnClick)

    this.on(Events.PAUSE, () => {
      this.animate(player.paused)
    })
    this.on(Events.PLAY, () => {
      this.animate(player.paused)
    })
    this.animate(true)
  }

  registerIcons () {
    return {
      play: {icon: PlaySvg, class: 'xg-icon-play'},
      pause: {icon: PauseSvg, class: 'xg-icon-pause'}
    }
  }

  btnClick (e) {
    e.preventDefault();
    e.stopPropagation();
    const {player} = this
    if (player.paused) {
      player.play();
    } else {
      player.pause();
    }
    return false
  }

  initIcons () {
    const {icons} = this
    this.appendChild('.xgplayer-icon', icons.play)
    this.appendChild('.xgplayer-icon', icons.pause)
  }

  animate (paused) {
    const {i18nKeys} = this
    if (paused) {
      this.setAttr('data-state', 'pause')
      this.changeLangTextKey(this.find('.xg-tips'), i18nKeys.PLAY_TIPS)
    } else {
      this.setAttr('data-state', 'play')
      this.changeLangTextKey(this.find('.xg-tips'), i18nKeys.PAUSE_TIPS)
    }
  }

  destroy () {
    this.unbind(['touchend', 'click'], this.btnClick)
  }

  render () {
    if (this.config.disable) {
      return
    }
    return `<xg-icon class="xgplayer-play">
    <div class="xgplayer-icon">
    </div>
    <div class="xg-tips" lang-key="${this.i18nKeys.PLAY_TIPS}">${this.i18n.PLAY_TIPS}</div>
    </xg-icon>`
  }
}
export default Play
