import Player from '../player'

let localPreview = function () {
  let player = this; let util = Player.util
  let preview = util.createDom('xg-preview', '<input type="file">', {}, 'xgplayer-preview')
  let upload = preview.querySelector('input')
  if (player.config.preview && player.config.preview.uploadEl) {
    player.config.preview.uploadEl.appendChild(preview)
    upload.onchange = function () {
      player.uploadFile = upload.files[0]
      let url = URL.createObjectURL(player.uploadFile)
      if (util.hasClass(player.root, 'xgplayer-nostart')) {
        player.config.url = url
        player.start()
      } else {
        player.src = url
        player.play()
      }
    }
  }
}

Player.install('localPreview', localPreview)
