import { Events, POSITIONS } from '../../plugin'
import { xgIconTips } from '../common/iconTools'
import IconPlugin from '../common/iconPlugin'
import PlaySvg from '../assets/play.svg'
import PauseSvg from '../assets/pause.svg'
import './index.scss'

class Play extends IconPlugin {
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
    super.afterCreate()
    const { player, config } = this
    if (config.disable) {
      return
    }
    this.initIcons()
    this.btnClick = this.btnClick.bind(this)
    this.bind(['touchend', 'click'], this.btnClick)

    this.on([Events.PAUSE, Events.ERROR], () => {
      this.animate(player.paused)
    })
    this.on(Events.PLAY, () => {
      this.animate(player.paused)
    })
    this.animate(true)
  }

  registerIcons () {
    return {
      play: { icon: PlaySvg, class: 'xg-icon-play' },
      pause: { icon: PauseSvg, class: 'xg-icon-pause' }
    }
  }

  btnClick (e) {
    e.preventDefault()
    e.stopPropagation()
    const { player } = this
    this.emitUserAction(e, 'switch_play_pause', { prop: 'paused', from: player.paused, to: !player.paused })
    if (player.ended) {
      player.replay()
    } else if (player.paused) {
      player.play()
      this.animate(false)
    } else {
      player.pause()
      this.animate(true)
    }
    return false
  }

  initIcons () {
    const { icons } = this
    this.appendChild('.xgplayer-icon', icons.play)
    this.appendChild('.xgplayer-icon', icons.pause)
  }

  animate (paused) {
    const { i18nKeys } = this
    const tipDom = this.find('.xg-tips')
    if (paused) {
      this.setAttr('data-state', 'pause')
      tipDom && this.changeLangTextKey(tipDom, i18nKeys.PLAY_TIPS)
    } else {
      this.setAttr('data-state', 'play')
      tipDom && this.changeLangTextKey(tipDom, i18nKeys.PAUSE_TIPS)
    }
  }

  destroy () {
    super.destroy()
    this.unbind(['touchend', 'click'], this.btnClick)
  }

  render () {
    if (this.config.disable) {
      return
    }
    return `<xg-icon class="xgplayer-play">
    <div class="xgplayer-icon">
    </div>
    ${xgIconTips(this, 'PLAY_TIPS', this.playerConfig.isHideTips)}
    </xg-icon>`
  }
}
export default Play
