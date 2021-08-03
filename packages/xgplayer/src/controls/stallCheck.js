import Errors from '../error'

function stallCheck () {
  const player = this
  if(!player.config.enableStallCheck) return;
  let lastCurrentTime = 0;
  let stallFlag, stallCheckTimer, progressTimer;
  player.once('complete', () => {
    progressTimer = setInterval(() => {
      if (player.currentTime - (lastCurrentTime || 0) > 0.1 || player.paused) {
        if (stallFlag === 1 || stallFlag === 2) {
          stallFlag = 0;
          clearTimeout(stallCheckTimer);
          stallCheckTimer = null;
        }
      } else {
        if (!stallFlag) {
          stallFlag = 1;
          stallCheckTimer = setTimeout(() => {
            if (stallFlag === 1) {
              stallFlag = 2;
              player.emit('error', new Errors('STALL'));
            }
            stallCheckTimer = null;
          }, 20000);
        }
      }
      lastCurrentTime = player.currentTime;
    }, 1000);
  })
}
  
export default {
  name: 'stallCheck',
  method: stallCheck
}


