import Plugin, { hooksDescriptor, Util, Events, Sniffer, POSITIONS } from '../../plugin'
import volumeLargeSvg from '../assets/volumeLarge.svg'
import volumeSmallSvg from '../assets/volumeSmall.svg'
import volumeMutedSvg from '../assets/volumeMuted.svg'
/**
 * @typedef {{
 *   position?: string, // [可选]插件挂载的dom
 *   index?: number // [可选]插件在播放器中挂载的位置
 *   disable?: boolean, // [可选]是否禁用插件交互行为
 *   showValueLabel?: boolean, // [可选]是否显示当前滑动的音量数值
 *   default?: number // [可选]默认
 *   [propName: string]: any
 * }} IVolumeConfig
 */

class Volume extends Plugin {
  static get pluginName () {
    return 'volume'
  }

  /**
   * @type IVolumeConfig
   */
  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGHT, // [可选]插件挂载的dom
      index: 1, // [可选]插件在播放器中挂载的位置
      disable: false, // [可选]是否禁用插件交互行为
      showValueLabel: false, // [可选]是否显示当前滑动的音量数值
      default: 0.6 // [可选]默认音量
    }
  }

  registerIcons () {
    return {
      volumeSmall: { icon: volumeSmallSvg, class: 'xg-volume-small' },
      volumeLarge: { icon: volumeLargeSvg, class: 'xg-volume' },
      volumeMuted: { icon: volumeMutedSvg, class: 'xg-volume-mute' }
    }
  }

  afterCreate () {
    hooksDescriptor(this)
    if (this.config.disable) {
      return
    }

    this.initIcons()

    const { commonStyle, volume } = this.playerConfig
    if (commonStyle.volumeColor) {
      this.find('.xgplayer-drag').style.backgroundColor = commonStyle.volumeColor
    }
    this.changeMutedHandler = this.hook('muted_change', () => {
      const { player } = this
      player.muted = !player.muted
    }, {
      pre: (e) => {
        e.preventDefault()
        e.stopPropagation()
      }
    })
    this.onBarMousedown = this.onBarMousedown.bind(this)
    this.onMouseenter = this.onMouseenter.bind(this)
    this.onMouseleave = this.onMouseleave.bind(this)

    if (!(Sniffer.device === 'mobile') && !this.playerConfig.isMobileSimulateMode) {
      this.bind('mouseenter', this.onMouseenter)

      this.bind(['blur', 'mouseleave'], this.onMouseleave)

      this.bind('.xgplayer-bar', 'mousedown', this.onBarMousedown)
    }

    this.bind('.xgplayer-icon', Sniffer.device === 'mobile' ? 'touchend' : 'click', this.changeMutedHandler)

    this.on(Events.VOLUME_CHANGE, this.onVolumeChange.bind(this))

    if (Util.typeOf(volume) !== 'Number') {
      this.player.volume = this.config.default
    }

    this.onVolumeChange()
  }

  onBarMousedown (e) {
    const slider = this.find('.xgplayer-slider')
    const bar = this.find('.xgplayer-bar')
    slider.focus()
    Util.event(e)

    const barRect = bar.getBoundingClientRect()
    const pos = { x: e.clientX, y: e.clientY }
    const height = barRect.height - (e.clientY - barRect.top)
    this.updateVolumePos(height)

    this.isMoveing = false
    const onMove = (e) => {
      e.preventDefault()
      e.stopPropagation()
      Util.event(e)
      this.isMoveing = true
      const w = height - e.clientY + pos.y
      if (w > barRect.height) {
        return
      }
      this.updateVolumePos(w)
    }

    const onUp = (e) => {
      e.preventDefault()
      e.stopPropagation()
      Util.event(e)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchend', onUp)
      this.isMoveing = false
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchend', onUp)
    return false
  }

  updateVolumePos (height) {
    const { player } = this
    const drag = this.find('.xgplayer-drag')
    const bar = this.find('.xgplayer-bar')
    const now = height / bar.getBoundingClientRect().height
    drag.style.height = `${height}px`
    player.volume = Math.max(Math.min(now, 1), 0)
    player.muted = false

    if (this.config.showValueLabel) {
      this.updateVolumeValue()
    }
  }

  /**
   * 修改音量数值标签
   *
   * @memberof Volume
   */
  updateVolumeValue () {
    const { volume } = this.player
    const $labelValue = this.find('.xgplayer-value-label')
    const vol = Math.max(Math.min(volume, 1), 0)

    $labelValue.innerText = Math.ceil(vol * 100)
  }

  onMouseenter (e) {
    Util.addClass(this.root, 'slide-show')
  }

  onMouseleave (e) {
    Util.removeClass(this.root, 'slide-show')
  }

  changeMuted (e) {
    // e.preventDefault()
    e.stopPropagation()
    const { player } = this
    player.muted = !player.muted
  }

  onVolumeChange () {
    const { muted, volume } = this.player
    if (!this.isMoveing) {
      this.find('.xgplayer-drag').style.height = muted || volume === 0 ? '0px' : `${volume * 100}%`
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
    const { icons } = this
    this.appendChild('.xgplayer-icon', icons.volumeSmall)
    this.appendChild('.xgplayer-icon', icons.volumeLarge)
    this.appendChild('.xgplayer-icon', icons.volumeMuted)
  }

  destroy () {
    this.unbind('mouseenter', this.onMouseenter)

    this.unbind(['blur', 'mouseleave'], this.onMouseleave)

    this.unbind('.xgplayer-bar', 'mousedown', this.onBarMousedown)

    this.unbind('.xgplayer-icon', Sniffer.device === 'mobile' ? 'touchend' : 'click', this.changeMutedHandler)
  }

  render () {
    if (this.config.disable) {
      return
    }
    const volume = this.config.default || this.player.volume
    const isShowVolumeValue = this.config.showValueLabel
    return `
    <xg-icon class="xgplayer-volume" data-state="normal">
      <div class="xgplayer-icon">
      </div>
      <xg-slider class="xgplayer-slider">
        ${isShowVolumeValue ? `<div class="xgplayer-value-label">${volume * 100}</div>` : ''}
        <div class="xgplayer-bar">
          <xg-drag class="xgplayer-drag" style="height: ${volume * 100}%"></xg-drag>
        </div>
      </xg-slider>
    </xg-icon>`
  }
}
export default Volume
