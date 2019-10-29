import Player from '../../player'
import DownloadIcon from '../assets/download.svg'

let s_download = function () {
  let player = this
  let util = Player.util
  if (!player.config.download) { return }
  let btn = util.createDom('xg-download', `<xg-icon class="xgplayer-icon">${DownloadIcon}</xg-icon>`, {}, 'xgplayer-download')

  let tipsText = player.lang.DOWNLOAD_TIPS
  let tips = util.createDom('xg-tips', `<span class="xgplayer-tip-download">${tipsText}</span>`, {}, 'xgplayer-tips')
  btn.appendChild(tips)
  player.once('ready', () => {
    player.controls.appendChild(btn)
  });

  ['click', 'touchend'].forEach(item => {
    btn.addEventListener(item, function (e) {
      e.preventDefault()
      e.stopPropagation()
      player.emit('downloadBtnClick')
    })
  })
}

Player.install('s_download', s_download)
