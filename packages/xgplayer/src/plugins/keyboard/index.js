import BasePlugin from '../../plugin/basePlugin';

class Keyboard extends BasePlugin {
  static get pluginName () {
    return 'Keyboard'
  }
  afterCreate () {
    this.onKeydown = this.onKeydown.bind(this);
    this.player.root.addEventListener('keydown', this.onKeydown)
  }
  onKeydown (event) {
    const player = this.player

    const util = BasePlugin.Util
    // let player = this
    let e = event || window.event
    if (e && (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 32)) {
      player.emit('focus')
    }
    if (e && (e.keyCode === 40 || e.keyCode === 38)) {
      if (player.controls) {
        let volumeSlider = player.controls.querySelector('.xgplayer-slider')
        if (volumeSlider) {
          if (util.hasClass(volumeSlider, 'xgplayer-none')) {
            util.removeClass(volumeSlider, 'xgplayer-none')
          }
          if (player.sliderTimer) {
            clearTimeout(player.sliderTimer)
          }
          player.sliderTimer = setTimeout(function () {
            util.addClass(volumeSlider, 'xgplayer-none')
          }, player.config.inactive)
        }
      }
      if (e && e.keyCode === 40) { // 按 down
        if (player.volume - 0.1 >= 0) {
          player.volume = parseFloat((player.volume - 0.1).toFixed(1))
        } else {
          player.volume = 0
        }
      } else if (e && e.keyCode === 38) { // 按 up
        if (player.volume + 0.1 <= 1) {
          player.volume = parseFloat((player.volume + 0.1).toFixed(1))
        } else {
          player.volume = 1
        }
      }
    } else if (e && e.keyCode === 39) { // 按 right
      if (player.currentTime + 10 <= player.duration) {
        player.currentTime += 10
      } else {
        player.currentTime = player.duration - 1
      }
    } else if (e && e.keyCode === 37) { // 按 left
      if (player.currentTime - 10 >= 0) {
        player.currentTime -= 10
      } else {
        player.currentTime = 0
      }
    } else if (e && e.keyCode === 32) { // 按 spacebar
      if (player.paused) {
        // eslint-disable-next-line handle-callback-err
        player.play().catch(err => {})
      } else {
        player.pause()
      }
    }
  }

  _destroy () {
    super._destroy();
    this.player.root.removeEventListener('keydown', this.onKeydown)
  }
}

export default Keyboard
