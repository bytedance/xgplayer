import Player from '../../player'

let s_localPreview = function () {
  let player = this
  let root = player.root
  let util = Player.util
  if (player.config.preview && player.config.preview.uploadEl) {
    let preview = util.createDom('xg-preview', '<input type="file">', {}, 'xgplayer-preview')
    let upload = preview.querySelector('input')
    player.config.preview.uploadEl.appendChild(preview)
    upload.onchange = function () {
      player.emit('upload', upload)
    }
  }
}

Player.install('s_localPreview', s_localPreview)
