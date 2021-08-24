import Plugin, { Util, Events, Sniffer, POSITIONS } from '../../plugin'
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
    if (this.config.disable) {
      return
    }

    this.initIcons()

    const { commonStyle, volume } = this.playerConfig
    if (commonStyle.volumeColor) {
      this.find('.xgplayer-drag').style.backgroundColor = commonStyle.volumeColor
    }
    this.changeMutedHandler = this.hook('mutedChange', (e) => {
      this.changeMuted(e)
    }, {
      pre: (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.emitUserAction(e, 'change_muted', { prop: 'muted', from: this.player.muted, to: !this.player.muted })
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
    const { player } = this
    const slider = this.find('.xgplayer-slider')
    const bar = this.find('.xgplayer-bar')
    slider.focus()
    Util.event(e)

    const barRect = bar.getBoundingClientRect()
    const _ePos = Util.getEventPos(e, player.zoom)
    const pos = { x: _ePos.clientX, y: _ePos.clientY }
    const height = barRect.height - (_ePos.clientY - barRect.top)
    this.updateVolumePos(height, e)

    this.isMoving = false
    const onMove = (e) => {
      e.preventDefault()
      e.stopPropagation()
      Util.event(e)
      const _ePos = Util.getEventPos(e, player.zoom)
      this.isMoving = true
      const w = height - _ePos.clientY + pos.y
      if (w > barRect.height) {
        return
      }
      this.updateVolumePos(w, e)
    }

    const onUp = (e) => {
      e.preventDefault()
      e.stopPropagation()
      Util.event(e)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchend', onUp)
      this.isMoving = false
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchend', onUp)
    return false
  }

  updateVolumePos (height, event) {
    const { player } = this
    const drag = this.find('.xgplayer-drag')
    const bar = this.find('.xgplayer-bar')
    const now = height / bar.getBoundingClientRect().height
    drag.style.height = `${height}px`
    const _volume = Math.max(Math.min(now, 1), 0)
    this.emitUserAction(event, 'change_volume', [{
      prop: 'muted',
      from: true,
      to: false
    }, {
      prop: 'volume',
      from: player.volume,
      to: _volume
    }])
    player.volume = _volume
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
    e && e.stopPropagation()
    const { player } = this
    if (player.volume < 0.01) {
      player.volume = this.config.default
    } else {
      player.muted = !player.muted
    }
  }

  onVolumeChange () {
    const { muted, volume } = this.player
    if (!this.isMoving) {
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
