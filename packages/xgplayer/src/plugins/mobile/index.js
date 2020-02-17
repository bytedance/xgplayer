import {BasePlugin} from '../../plugin';

class MobilePlugin extends BasePlugin {
  static get pluginName () {
    return 'mobile';
  }

  constructor (options) {
    super(options);
    this.isTouchMove = false;
  }

  afterCreate () {
    const {player} = this;
    player.video.addEventListener('touchend', (e) => {
      this.onTouchEnd(e);
    }, false);

    player.video.addEventListener('touchstart', () => {
      this.isTouchMove = false;
    });

    player.video.addEventListener('touchmove', () => {
      this.isTouchMove = true;
    });
  }

  onTouchEnd (e) {
    e.preventDefault();
    const util = BasePlugin.Util;
    e.stopPropagation();
    const {player, playerConfig} = this;
    if (util.hasClass(player.root, 'xgplayer-inactive')) {
      player.emit('focus');
    } else {
      player.emit('blur');
    }
    if (!playerConfig.closeVideoTouch && !player.isTouchMove) {
      if (util.hasClass(player.root, 'xgplayer-nostart')) {
        return false;
      } else if (!player.ended) {
        if (player.paused) {
          let playPromise = player.play();
          if (playPromise !== undefined && playPromise) {
            playPromise.catch(err => {
            });
          }
        } else {
          player.pause();
        }
      }
    }
  }

}

export default MobilePlugin;
