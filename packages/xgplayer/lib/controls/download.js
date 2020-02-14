'use strict';

var _player = require('../player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var download = function download() {
  var player = this;

  function onDownloadBtnClick() {
    // must pass an absolute url for download
    player.download();
  }
  player.on('downloadBtnClick', onDownloadBtnClick);

  function onDestroy() {
    player.off('downloadBtnClick', onDownloadBtnClick);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

_player2.default.install('download', download);