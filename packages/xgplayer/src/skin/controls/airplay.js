import { createDom } from '../../utils/util'
import AirplayIcon from '../assets/airplay.svg'
import '../style/controls/airplay.scss'

let s_airplay = function () {
  let player = this
  if(!player.config.airplay || !window.WebKitPlaybackTargetAvailabilityEvent) return

  let btn = createDom('xg-airplay', `<xg-icon class="xgplayer-icon">
    <div class="xgplayer-icon-airplay">${AirplayIcon}</div>
  </xg-icon>`, {}, 'xgplayer-airplay')

  let tips = createDom('xg-tips', `<span class="xgplayer-tip-airplay">${player.lang.AIRPLAY_TIPS}</span>`, {}, 'xgplayer-tips')
  btn.appendChild(tips)
  player.once('ready', () => {
    player.controls.appendChild(btn)
    player.video.addEventListener('webkitplaybacktargetavailabilitychanged',
      event => {
        switch (event.availability) {
        case "available":
          btn.hidden = false;
          btn.disabled = false;
          break;
        case "not-available":
          btn.hidden = true;
          btn.disabled = true;
          break;
      }
    });
  });

  ['click', 'touchend'].forEach(item => {
    btn.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      player.userGestureTrigEvent('airplayBtnClick')
    })
  })
}

export default {
  name: 's_airplay',
  method: s_airplay
}