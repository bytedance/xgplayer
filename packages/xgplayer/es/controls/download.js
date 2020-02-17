import Player from '../player';

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

Player.install('download', download);