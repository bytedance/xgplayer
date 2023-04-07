import Plugin, { Util, Events, Sniffer, POSITIONS } from '../../plugin'
import volumeLargeSvg from '../assets/volumeLarge.svg'
import volumeSmallSvg from '../assets/volumeSmall.svg'
import volumeMutedSvg from '../assets/volumeMuted.svg'
import './index.scss'

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
      default: 0.6, // [可选]默认音量
      miniVolume: 0.2 // 静音恢复的时候最小音量
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
    this._timerId = null
    this._d = {
      isStart: false,
      isMoving: false,
      isActive: false
    }
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
      }
    })

    this._onMouseenterHandler = this.hook('mouseenter', this.onMouseenter)
    this._onMouseleaveHandler = this.hook('mouseleave', this.onMouseleave)

    if (!(Sniffer.device === 'mobile') && this.playerConfig.isMobileSimulateMode !== 'mobile') {
      this.bind('mouseenter', this._onMouseenterHandler)

      this.bind(['blur', 'mouseleave'], this._onMouseleaveHandler)

      this.bind('.xgplayer-slider', 'mousedown', this.onBarMousedown)
      this.bind('.xgplayer-slider', 'mousemove', this.onBarMouseMove)
      this.bind('.xgplayer-slider', 'mouseup', this.onBarMouseUp)
    }

    this.bind('.xgplayer-icon', ['touchend', 'click'], this.changeMutedHandler)

    this.on(Events.VOLUME_CHANGE, this.onVolumeChange)
    this.once(Events.LOADED_DATA, this.onVolumeChange)

    if (Util.typeOf(volume) !== 'Number') {
      this.player.volume = this.config.default
    }

    this.onVolumeChange()
  }

  onBarMousedown = (e) => {
    const { player } = this
    const bar = this.find('.xgplayer-bar')
    Util.event(e)

    const barRect = bar.getBoundingClientRect()
    const pos = Util.getEventPos(e, player.zoom)
    const height = barRect.height - (pos.clientY - barRect.top)
    pos.h = height
    pos.barH = barRect.height
    this.pos = pos
    // 差值小于0，说明点击的不是音量滑块位置 不做响应
    if (height < -2) {
      return
    }
    this.updateVolumePos(height, e)
    document.addEventListener('mouseup', this.onBarMouseUp)
    this._d.isStart = true
    return false
  }

  onBarMouseMove = (e) => {
    const { _d } = this
    if (!_d.isStart) {
      return
    }
    const { pos, player } = this
    e.preventDefault()
    e.stopPropagation()
    Util.event(e)
    const _ePos = Util.getEventPos(e, player.zoom)
    _d.isMoving = true
    const w = pos.h - _ePos.clientY + pos.clientY
    if (w > pos.barH) {
      return
    }
    this.updateVolumePos(w, e)
  }

  onBarMouseUp = (e) => {
    Util.event(e)
    document.removeEventListener('mouseup', this.onBarMouseUp)
    const { _d } = this
    _d.isStart = false
    _d.isMoving = false
  }

  updateVolumePos (height, event) {
    const { player } = this
    const drag = this.find('.xgplayer-drag')
    const bar = this.find('.xgplayer-bar')
    if (!bar || !drag) {
      return
    }
    const now = parseInt(height / bar.getBoundingClientRect().height * 1000, 10)
    drag.style.height = `${height}px`
    const to = Math.max(Math.min(now / 1000, 1), 0)
    const props = {
      volume: {
        from: player.volume,
        to
      }
    }
    if (player.muted) {
      props.muted = {
        from: true,
        to: false
      }
    }
    this.emitUserAction(event, 'change_volume', { muted: player.muted, volume: player.volume, props })
    player.volume = Math.max(Math.min(now / 1000, 1), 0)
    player.muted && (player.muted = false)

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
    const { volume, muted } = this.player
    const $labelValue = this.find('.xgplayer-value-label')
    const vol = Math.max(Math.min(volume, 1), 0)

    $labelValue.innerText = muted ? 0 : Math.ceil(vol * 100)
  }

  /**
   * @desc 聚焦
   */
  focus () {
    const { player } = this
    player.focus({ autoHide: false })
    if (this._timerId) {
      Util.clearTimeout(this, this._timerId)
      this._timerId = null
    }
    Util.addClass(this.root, 'slide-show')
  }

  /**
   * 失去焦点
   * @param { number } delay 延迟隐藏时长，ms
   * @param { boolean } isForce 是否立即隐藏控制栏
   * @param { Event} [e] 事件
   * @returns
   */
  unFocus (delay = 100, isForce = true, e) {
    const { _d, player } = this
    if (_d.isActive) {
      return
    }
    if (this._timerId) {
      Util.clearTimeout(this, this._timerId)
      this._timerId = null
    }
    this._timerId = Util.setTimeout(this, () => {
      if (!_d.isActive) {
        isForce ? player.blur() : player.focus()
        Util.removeClass(this.root, 'slide-show')
        _d.isStart && this.onBarMouseUp(e)
      }
      this._timerId = null
    }, delay)
  }

  onMouseenter = (e) => {
    this._d.isActive = true
    this.focus()
    this.emit('icon_mouseenter', {
      pluginName: this.pluginName
    })
  }

  onMouseleave = (e) => {
    this._d.isActive = false
    this.unFocus(100, false, e)
    this.emit('icon_mouseleave', {
      pluginName: this.pluginName
    })
  }

  changeMuted (e) {
    // e.preventDefault()
    e && e.stopPropagation()
    const { player, _d } = this
    // 取消bar的状态
    _d.isStart && this.onBarMouseUp(e)
    this.emitUserAction(e, 'change_muted', {
      muted: player.muted,
      volume: player.volume,
      props: {
        muted: {
          from: player.muted,
          to: !player.muted
        }
      }
    })
    if (player.volume > 0) {
      player.muted = !player.muted
    }
    if (player.volume < 0.01) {
      player.volume = this.config.miniVolume
    }
  }

  onVolumeChange = (e) => {
    if (!this.player) {
      return
    }
    const { muted, volume } = this.player
    if (!this._d.isMoving) {
      this.find('.xgplayer-drag').style.height = muted || volume === 0 ? '4px' : `${volume * 100}%`
      if (this.config.showValueLabel) {
        this.updateVolumeValue()
      }
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
    if (this._timerId) {
      Util.clearTimeout(this, this._timerId)
      this._timerId = null
    }
    this.unbind('mouseenter', this.onMouseenter)

    this.unbind(['blur', 'mouseleave'], this.onMouseleave)

    this.unbind('.xgplayer-slider', 'mousedown', this.onBarMousedown)
    this.unbind('.xgplayer-slider', 'mousemove', this.onBarMouseMove)
    this.unbind('.xgplayer-slider', 'mouseup', this.onBarMouseUp)
    document.removeEventListener('mouseup', this.onBarMouseUp)
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
