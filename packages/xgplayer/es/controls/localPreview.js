import Player from '../player';

var localPreview = function localPreview() {
  var player = this;
  var root = player.root;
  function onUpload(upload) {
    player.uploadFile = upload.files[0];
    var url = URL.createObjectURL(player.uploadFile);
    if (util.hasClass(root, 'xgplayer-nostart')) {
      player.config.url = url;
      player.start();
    } else {
      player.src = url;
      var playPromise = player.play();
      if (playPromise !== undefined && playPromise) {
        playPromise.catch(function (err) {});
      }
    }
  }
  player.on('upload', onUpload);

  function onDestroy() {
    player.off('upload', onUpload);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

Player.install('localPreview', localPreview);