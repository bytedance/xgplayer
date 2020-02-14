'use strict';

var _player = require('../../player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_localPreview = function s_localPreview() {
  var player = this;
  var root = player.root;
  var util = _player2.default.util;
  if (player.config.preview && player.config.preview.uploadEl) {
    var preview = util.createDom('xg-preview', '<input type="file">', {}, 'xgplayer-preview');
    var upload = preview.querySelector('input');
    player.config.preview.uploadEl.appendChild(preview);
    upload.onchange = function () {
      player.emit('upload', upload);
    };
  }
};

_player2.default.install('s_localPreview', s_localPreview);