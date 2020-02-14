import Player from '../player';

var screenShot = function screenShot() {
  var player = this;
  var root = player.root;
  if (!player.config.screenShot) {
    return;
  }

  var canvas = document.createElement('canvas');
  var canvasCtx = canvas.getContext('2d');
  var img = new Image();
  canvas.width = this.config.width || 600;
  canvas.height = this.config.height || 337.5;

  var saveScreenShot = function saveScreenShot(data, filename) {
    var saveLink = document.createElement('a');
    saveLink.href = data;
    saveLink.download = filename;
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    saveLink.dispatchEvent(event);
  };

  function onScreenShotBtnClick() {
    img.onload = function () {
      canvasCtx.drawImage(player.video, 0, 0, canvas.width, canvas.height);
      img.setAttribute('crossOrigin', 'anonymous');
      img.src = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      var screenShotImg = img.src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
      saveScreenShot(screenShotImg, '截图.png');
    }();
  }
  player.on('screenShotBtnClick', onScreenShotBtnClick);

  function onDestroy() {
    player.off('screenShotBtnClick', onScreenShotBtnClick);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

Player.install('screenShot', screenShot);