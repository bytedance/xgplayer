import { createDom } from '../../utils/util'
import MutedIcon from '../assets/volumeMuted.svg'
import SmallIcon from '../assets/volumeSmall.svg'
import LargeIcon from '../assets/volumeLarge.svg'
import '../style/controls/volume.scss'

let s_volume = function () {
  let player = this
  let container = createDom('xg-volume', `<xg-icon class="xgplayer-icon">
                                         <div class="xgplayer-icon-large">${LargeIcon}</div>
                                         <div class="xgplayer-icon-small">${SmallIcon}</div>
                                         <div class="xgplayer-icon-muted">${MutedIcon}</div>
                                       </xg-icon>
                                       <xg-slider class="xgplayer-slider" tabindex="2">
                                         <xg-bar class="xgplayer-bar">
                                           <xg-drag class="xgplayer-drag"></xg-drag>
                                         </xg-bar>
                                       </xg-slider>`, {}, 'xgplayer-volume')
  player.once('ready', () => {
    if(player.controls) {
      player.controls.appendChild(container)
    }
  })
  let slider = container.querySelector('.xgplayer-slider')
  let bar = container.querySelector('.xgplayer-bar')
  let selected = container.querySelector('.xgplayer-drag')
  let icon = container.querySelector('.xgplayer-icon')
  selected.style.height = `${player.config.volume * 100}%`
  slider.volume = player.config.volume;

  bar.addEventListener('mousedown', e => {
    e.preventDefault()
    e.stopPropagation()
    player.userGestureTrigEvent('volumeBarClick', e)
  });

  ['click', 'touchend'].forEach(item => {
    icon.addEventListener(item, e => {
      e.preventDefault()
      e.stopPropagation()
      player.userGestureTrigEvent('volumeIconClick')
    })
  })

  icon.addEventListener('mouseenter', e => {
    e.preventDefault()
    e.stopPropagation()
    player.userGestureTrigEvent('volumeIconEnter')
  });

  ['blur', 'mouseleave'].forEach(item => {
    container.addEventListener(item, e => {
      e.preventDefault()
      e.stopPropagation()
      player.userGestureTrigEvent('volumeIconLeave')
    })
  })
}

export default {
  name: 's_volume',
  method: s_volume
}