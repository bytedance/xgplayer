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
    this.onBodyKeyDown = this.onBodyKeyDown.bind(this);
    this.player.root.addEventListener('keydown', this.onKeydown)
    document.addEventListener('keydown', this.onBodyKeyDown)
  }

  onBodyKeyDown (event) {
    console.log('onBodyKeyDown', event.target)
    let e = event || window.event
    const keyCode = e.keyCode
    if (e.target === document.body && (keyCode === 38 || keyCode === 40 || keyCode === 32 || keyCode === 39)) {
      e.preventDefault()
      e.cancelBubble = true
      e.returnValue = false
      this.handleKeyCode(keyCode)
      return false
    }
    return false
  }

  onKeydown (event) {
    console.log('onKeydown', event.target)
    const player = this.player
    let e = event || window.event
    if (e && (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 32) && (e.target === this.player.root || e.target === this.player.video || e.target === this.player.controls.el)) {
      player.emit('focus')
      e.preventDefault()
      e.cancelBubble = true
      e.returnValue = false
    } else {
      return true
    }
    this.handleKeyCode(e.keyCode)
  }

  handleKeyCode (keyCode) {
    if (keyCode === 40 || keyCode === 38) {
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
    document.removeEventListener('keydown', this.onBodyKeyDown)
  }
}

export default Keyboard
