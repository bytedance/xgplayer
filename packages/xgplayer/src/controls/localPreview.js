import Player from '../player'

let localPreview = function () {
  let player = this
  let root = player.root
  function onUpload (upload) {
    player.uploadFile = upload.files[0]
    let url = URL.createObjectURL(player.uploadFile)
    if (util.hasClass(root, 'xgplayer-nostart')) {
      player.config.url = url
      player.start()
    } else {
      player.src = url
      player.play()
    }
  }
  player.on('upload', onUpload)

  function onDestroy () {
    player.off('upload', onUpload)
    player.off('destroy', onDestroy)
  }
  player.once('destroy', onDestroy)
}

Player.install('localPreview', localPreview)
