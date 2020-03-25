import Plugin from '../../plugin'
import volumeLargeSvg from '../assets/volumeLarge.svg'
import volumeSmallSvg from '../assets/volumeSmall.svg'
import volumeMutedSvg from '../assets/volumeMuted.svg'

const {Util, Events, POSITIONS} = Plugin

class Volume extends Plugin {
  static get pluginName () {
    return 'Volume'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGTH,
      index: 1,
      disable: false
    }
  }

  registerIcons () {
    return {
      volumeSmall: {icon: volumeSmallSvg, class: 'xg-volume-small'},
      volumeLarge: {icon: volumeLargeSvg, class: 'xg-volume'},
      volumeMuted: {icon: volumeMutedSvg, class: 'xg-volume-mute'}
    }
  }

  afterCreate () {
    if (this.config.disable) {
      return
    }

    this.initIcons()

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
    const drag = this.find('.xgplayer-drag')
    const slider = this.find('.xgplayer-slider')
    const bar = this.find('.xgplayer-bar')
    slider.focus()
    Util.event(e)

    let barRect = bar.getBoundingClientRect()
    let pos = {x: e.clientX, y: e.clientY}
    let height = drag.getBoundingClientRect().height
    this.isMoveing = false
    let onMove = (e) => {
      e.preventDefault()
      e.stopPropagation()
      Util.event(e)
      this.isMoveing = true
      let w = height - e.clientY + pos.y
      if (w > barRect.height) {
        return
      }
      let now = w / barRect.height
      drag.style.height = `${w}px`
      player.volume = Math.max(Math.min(now, 1), 0)
      player.muted = false
    }

    let onUp = (e) => {
      e.preventDefault()
      e.stopPropagation()
      Util.event(e)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchend', onUp)

      if (!this.isMoveing) {
        let w = barRect.height - (e.clientY - barRect.top)
        let now = w / barRect.height
        drag.style.height = `${w}px`
        player.volume = Math.max(Math.min(now, 1), 0)
        player.muted = false
      }
      this.isMoveing = false
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
    if (!this.isMoveing) {
      this.find('.xgplayer-drag').style.height = muted || volume === 0 ? `0px` : `${volume * 100}%`
    }
    this.animate(muted, volume)
  }

  animate (muted, volume) {
    if (muted || volume === 0) {
      this.setAttr('data-state', 'mute')
    } else if (volume < 0.5 && this.icons.volumeSmall) {
      this.setAttr('data-state', 'small')
    } else {
      this.setAttr('data-state', 'normal')
    }
  }

  initIcons () {
    const {icons} = this
    this.appendChild('.xgplayer-icon', icons.volumeSmall)
    this.appendChild('.xgplayer-icon', icons.volumeLarge)
    this.appendChild('.xgplayer-icon', icons.volumeMuted)
  }

  render () {
    if (this.config.disable) {
      return
    }
    const {volume} = this.player
    return `
    <xg-icon class="xgplayer-volume" data-state="normal">
      <div class="xgplayer-icon">
      </div>
      <xg-slider class="xgplayer-slider">
        <div class="xgplayer-bar">
          <xg-drag class="xgplayer-drag" style="height: ${volume * 100}%"></xg-drag>
        </div>
      </xg-slider>
    </xg-icon>`
  }
}
export default Volume
