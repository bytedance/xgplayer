import { createDom } from '../../utils/util'

let s_localPreview = function () {
  let player = this
  if (player.config.preview && player.config.preview.uploadEl) {
    let preview = createDom('xg-preview', '<input type="file">', {}, 'xgplayer-preview')
    let upload = preview.querySelector('input')
    player.config.preview.uploadEl.appendChild(preview)
    upload.onchange = function () {
      player.emit('upload', upload)
    }
  }
}

export default {
  name: 's_localPreview',
  method: s_localPreview
}