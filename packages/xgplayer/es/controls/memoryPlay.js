import Player from '../player';

var memoryPlay = function memoryPlay() {
  var player = this;
  player.on('memoryPlayStart', function (lastPlayTime) {
    player.currentTime = lastPlayTime;
  });
};

Player.install('memoryPlay', memoryPlay);