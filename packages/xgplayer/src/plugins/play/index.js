import Plugin from '../../plugin'
import PlaySvg from '../assets/play.svg'
import PauseSvg from '../assets/pause.svg'

const {Events, POSITIONS, Sniffer} = Plugin

class Play extends Plugin {
  static get pluginName () {
    return 'Play'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_LEFT,
      index: 0
    }
  }

  afterCreate () {
    const { player } = this;
    this.btnClick = this.btnClick.bind(this)
    const event = Sniffer.device === 'mobile' ? 'touchend' : 'click'
    this.bind(event, this.btnClick)

    this.on(Events.PAUSE, () => {
      this.animate(player.paused)
    })
    this.on(Events.PLAY, () => {
      this.animate(player.paused)
    })
  }

  btnClick (e) {
    const {player} = this
    if (player.paused) {
      player.play();
    } else {
      player.pause();
    }
  }

  // 扩展语言
  registerLangauageTexts () {
    return {
      'play': {
        jp: 'play',
        en: 'play',
        zh: '播放'
      },
      'pause': {
        jp: 'pause',
        en: 'pause',
        zh: '暂停'
      }
    }
  }

  registerIcons () {
    return {
      play: PlaySvg,
      pause: PauseSvg
    }
  }

  animate (paused) {
    if (paused) {
      this.find('.xgplayer-icon').innerHTML = this.icons.play
      this.find('.xg-tips').innerHTML = this.text.play
    } else {
      this.find('.xgplayer-icon').innerHTML = this.icons.pause
      this.find('.xg-tips').innerHTML = this.text.pause
    }
    // const path = this.find('.path')
    // const pathPlay = this.find('.path_play').getAttribute('d')
    // const pathPause = this.find('.path_pause').getAttribute('d')
    // !paused ? path.setAttribute('d', pathPause) : path.setAttribute('d', pathPlay)
  }

  destroy () {
    this.unbind(['touchend', 'click'], this.btnClick)
  }

  render () {
    return `<xg-icon class="xgplayer-play">
    <div class="xgplayer-icon">
    ${this.icons.play}
    </div>
    <div class="xg-tips">${this.player.paused ? this.text.play : this.text.pause}</div>
    </xg-icon>`
  }
}
export default Play
