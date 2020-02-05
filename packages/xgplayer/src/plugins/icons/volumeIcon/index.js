import Plugin from '../../../plugin'
import volumeChange from '../../assets/volumeChange.svg'
import './index.scss'

const { Util } = Plugin
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
  }

  render () {
    return `
    <xg-icon class="xgplayer-volume">
      <div class="xgplayer-icon">
      ${this.icons.volumeChange}
      </div>
      <xg-slider class="xgplayer-slider" tabindex="2">
        <xg-bar class="xgplayer-bar">
          <xg-drag class="xgplayer-drag" style="height: 45.6px;"></xg-drag>
        </xg-bar>
      </xg-slider>
    </xg-icon>`
  }
}
export default VolumeIcon
