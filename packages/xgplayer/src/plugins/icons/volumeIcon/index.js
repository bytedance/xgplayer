import Plugin from '../../../plugin'
import volumeChange from '../../assets/volumeChange.svg'


const { Util, Events } = Plugin
class VolumeIcon extends Plugin {
  static get pluginName () {
    return 'VolumeIcon'
  }

  registerIcons () {
    return {
      volumeChange: volumeChange
    }
  }

  afterCreate () {
    this.find('.xgplayer-icon').addEventListener('mouseenter', () => {
      console.log('mouseenter')
      Util.addClass(this.el, 'slide-show')
    })
    this.el.addEventListener('mouseleave', (e) => {
      e.preventDefault()
      e.stopPropagation()
      console.log('mouseleave')
      Util.removeClass(this.el, 'slide-show')
    })

    this.changeMuted = this.changeMuted.bind(this)
    this.bind('click', this.changeMuted)

    this.on(Events.VOLUME_CHANGE, this.onVolumeChange.bind(this))
  }

  changeMuted () {
    const {player} = this
    player.muted = !player.muted
  }

  changeVolume () {

  }

  onVolumeChange () {
    const {muted, volume} = this.player
    console.log(`muted: ${muted} volume: ${volume}`)
    this.find('.xgplayer-drag').style.height = muted || volume === 0 ? `0px` : `${volume * 100}%`
    this.animate(muted, volume)
  }

  animate (muted, volume) {
    const path = this.find('.path')
    const pathLarge = this.find('.path_large').getAttribute('d')
    const pathSmall = this.find('.path_small').getAttribute('d')
    const pathMuted = this.find('.path_muted').getAttribute('d')
    if (muted || volume === 0) {
      path.setAttribute('d', pathMuted)
    } else {
      volume >= 0.5 ? path.setAttribute('d', pathLarge) : path.setAttribute('d', pathSmall)
    }
  }

  render () {
    const {volume} = this.player
    return `
    <xg-icon class="xgplayer-volume">
      <div class="xgplayer-icon">
      ${this.icons.volumeChange}
      </div>
      <xg-slider class="xgplayer-slider">
        <xg-bar class="xgplayer-bar">
          <xg-drag class="xgplayer-drag" style="height: ${volume * 100}%"></xg-drag>
        </xg-bar>
      </xg-slider>
    </xg-icon>`
  }
}
export default VolumeIcon
