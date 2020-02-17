import Plugin from '../../../plugin'
import PlayPauseSvg from '../../assets/playPause.svg'


const { Events } = Plugin
class PlayIcon extends Plugin {
  static get pluginName () {
    return 'PlayIcon'
  }

  afterCreate () {
    const { player } = this;
    this.btnClick = this.btnClick.bind(this)
    this.bind(['touchend', 'click'], this.btnClick)

    this.on(Events.PAUSE, () => {
      this.find('.xg-tips').innerHTML = this.text.play
      this.animate(player.paused)
    })
    this.on(Events.PLAY, () => {
      this.find('.xg-tips').innerHTML = this.text.pause
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
      playIcon: PlayPauseSvg
    }
  }

  animate (paused) {
    const path = this.find('.path')
    const pathPlay = this.find('.path_play').getAttribute('d')
    const pathPause = this.find('.path_pause').getAttribute('d')
    !paused ? path.setAttribute('d', pathPause) : path.setAttribute('d', pathPlay)
  }

  destroy () {
    this.unbind(['touchend', 'click'], this.btnClick)
  }

  render () {
    return `<xg-icon class="xgplayer-play">
    <div class="xgplayer-icon">
    ${this.icons.playIcon}
    </div>
    <div class="xg-tips">${this.player.paused ? this.text.play : this.text.pause}</div>
    </xg-icon>`
  }
}
export default PlayIcon
