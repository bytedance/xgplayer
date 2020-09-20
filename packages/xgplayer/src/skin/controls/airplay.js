import Player from '../../player'
import AirplayIcon from '../assets/airplay.svg'

let s_airplay = function () {
  let player = this
  let util = Player.util
  if(!player.config.airplay || !window.WebKitPlaybackTargetAvailabilityEvent) return

  let btn = util.createDom('xg-airplay', `<xg-icon class="xgplayer-icon">
    <div class="xgplayer-icon-airplay">${AirplayIcon}</div>
  </xg-icon>`, {}, 'xgplayer-airplay')

  let tips = util.createDom('xg-tips', `<span class="xgplayer-tip-airplay">${player.lang.AIRPLAY_TIPS}</span>`, {}, 'xgplayer-tips')
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
      player.emit('airplayBtnClick')
    })
  })
}

Player.install('s_airplay', s_airplay)
