import Plugin from '../../plugin'
import volumeChange from '../assets/volumeChange.svg'

const {Util, Events, POSITIONS} = Plugin

class Volume extends Plugin {
  static get pluginName () {
    return 'Volume'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGTH,
      index: 1,
      progressDot: []
    }
  }

  registerIcons () {
    return {
      volumeChange: volumeChange
    }
  }

  afterCreate () {
    this.bar = this.find('.xgplayer-bar')
    this.drag = this.find('.xgplayer-drag')
    this.changeMuted = this.changeMuted.bind(this)

    this.onBarMousedown = this.onBarMousedown.bind(this)

    this.onMouseenter = this.onMouseenter.bind(this)
    this.onMouseleave = this.onMouseleave.bind(this)
    this.bind('mouseenter', this.onMouseenter)

    this.bind(['blur', 'mouseleave'], this.onMouseleave)

    this.bind('.xgplayer-bar', 'mousedown', this.onBarMousedown)
    this.bind('.xgplayer-icon', ['click', 'touched'], this.changeMuted)

    this.on(Events.VOLUME_CHANGE, this.onVolumeChange.bind(this))
  }

  onBarMousedown (e) {
    const {player} = this
    player.video.muted = false
    const drag = this.drag
    const slider = this.find('.xgplayer-slider')
    slider.focus()
    Util.event(e)

    let barRect = this.bar.getBoundingClientRect()
    let pos = {x: e.clientX, y: e.clientY}
    let height = drag.getBoundingClientRect().height
    let isMove = false
    let onMove = function (e) {
      e.preventDefault()
      e.stopPropagation()
      Util.event(e)
      isMove = true
      let w = height - e.clientY + pos.y
      let now = w / barRect.height
      drag.style.height = `${w}px`
      player.volume = Math.max(Math.min(now, 1), 0)
    }

    let onUp = function (e) {
      e.preventDefault()
      e.stopPropagation()
      Util.event(e)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchend', onUp)

      if (!isMove) {
        let w = barRect.height - (e.clientY - barRect.top)
        let now = w / barRect.height
        drag.style.height = `${w}px`
        if (now <= 0) {
          if (player.volume > 0) {
            drag.volume = player.video.volume
          } else {
            now = drag.volume
          }
        }
        player.volume = Math.max(Math.min(now, 1), 0)
      }
      slider.volume = player.volume
      isMove = false
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchend', onUp)
    return false
  }

  onMouseenter (e) {
    e.preventDefault()
    e.stopPropagation()
    Util.addClass(this.root, 'slide-show')
  }
  onMouseleave (e) {
    console.log('mouseleave')
    e.preventDefault()
    e.stopPropagation()
    Util.removeClass(this.root, 'slide-show')
  }

  changeMuted () {
    const {player} = this
    player.muted = !player.muted
  }

  onVolumeChange () {
    const {muted, volume} = this.player
    this.find('.xgplayer-drag').style.height = muted || volume === 0 ? `0px` : `${volume * 100}%`
    this.animate(muted, volume)
  }

  animate (muted, volume) {
    const path = this.find('.path')
    const pathLarge = this.find('.path_large').getAttribute('d')
    const pathSmall = this.find('.path_small').getAttribute('d')
    const pathMuted = this.find('.path_muted').getAttribute('d')
    if (muted || volume === 0) {
      path.setAttribute('d', pathMuted)
    } else {
      volume >= 0.5 ? path.setAttribute('d', pathLarge) : path.setAttribute('d', pathSmall)
    }
  }

  render () {
    const {volume} = this.player
    return `
    <xg-icon class="xgplayer-volume">
      <div class="xgplayer-icon">
      ${this.icons.volumeChange}
      </div>
      <xg-slider class="xgplayer-slider">
        <xg-bar class="xgplayer-bar">
          <xg-drag class="xgplayer-drag" style="height: ${volume * 100}%"></xg-drag>
        </xg-bar>
      </xg-slider>
    </xg-icon>`
  }
}
export default Volume
