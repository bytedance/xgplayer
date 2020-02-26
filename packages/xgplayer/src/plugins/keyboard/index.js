import BasePlugin from '../../plugin/basePlugin';

class Keyboard extends BasePlugin {
  static get pluginName () {
    return 'Keyboard'
  }

  static get defaultConfig () {
    return {
      seekStep: 10
    }
  }

  afterCreate () {
    this.onKeydown = this.onKeydown.bind(this);
    this.player.root.addEventListener('keydown', this.onKeydown)
  }

  onKeydown (event) {
    const player = this.player
    let e = event || window.event
    if (e && (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 32)) {
      player.emit('focus')
    }
    const keyCode = e && e.keyCode
    console.log('keyCode', keyCode)
    if (keyCode === 40 || keyCode === 38) {
      console.log('切换声音')
      if (player.controls) {
        // let volumeSlider = player.controls.querySelector('.xgplayer-slider')
        // if (volumeSlider) {
        //   if (Util.hasClass(volumeSlider, 'xgplayer-none')) {
        //     Util.removeClass(volumeSlider, 'xgplayer-none')
        //   }
        //   if (player.sliderTimer) {
        //     clearTimeout(player.sliderTimer)
        //   }
        //   player.sliderTimer = setTimeout(function () {
        //     Util.addClass(volumeSlider, 'xgplayer-none')
        //   }, player.config.inactive)
        // }
      }
    }
    switch (keyCode) {
      // down
      case 40:
        if (player.volume - 0.1 >= 0) {
          player.volume = parseFloat((player.volume - 0.1).toFixed(1))
        } else {
          player.volume = 0
        }
        break;
      // up
      case 38:
        if (player.volume + 0.1 <= 1) {
          player.volume = parseFloat((player.volume + 0.1).toFixed(1))
        } else {
          player.volume = 1
        }
        break;
      // right
      case 39:
        if (player.currentTime + this.config.seekStep <= player.duration) {
          player.currentTime += this.config.seekStep
        } else {
          player.currentTime = player.duration - 1
        }
        break;
      // left
      case 37:
        if (player.currentTime - this.config.seekStep >= 0) {
          player.currentTime -= this.config.seekStep
        } else {
          player.currentTime = 0
        }
        break;
        // tab
      case 32:
        if (player.paused) {
          // eslint-disable-next-line handle-callback-err
          player.play().catch(err => {})
        } else {
          player.pause()
        }
        break;
      default:
    }
  }

  _destroy () {
    super._destroy();
    this.player.root.removeEventListener('keydown', this.onKeydown)
  }
}

export default Keyboard
