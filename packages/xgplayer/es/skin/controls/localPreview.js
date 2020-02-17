import Player from '../../player';

var s_localPreview = function s_localPreview() {
  var player = this;
  var root = player.root;
  var util = Player.util;
  if (player.config.preview && player.config.preview.uploadEl) {
    var preview = util.createDom('xg-preview', '<input type="file">', {}, 'xgplayer-preview');
    var upload = preview.querySelector('input');
    player.config.preview.uploadEl.appendChild(preview);
    upload.onchange = function () {
      player.emit('upload', upload);
    };
  }
};

Player.install('s_localPreview', s_localPreview);