import { Plugin } from 'xgplayer'
import CastSvg from './assets/cast.svg'
import { Airplay, isAirPlayAvailable } from './platform/airplay'
import { Chromecast, isChromecastAvailable } from './platform/chromecast'

import './cast-i18n'
import './index.scss'

/**
 * @typedef { {
 *   [propName: string]: any
 *  } } ICastConfig
 */

export class CastPlugin extends Plugin {
  static get pluginName() {
    return 'cast'
  }

  /**
   * @type ICastConfig
   */
  static get defaultConfig() {
    return {
      position: Plugin.POSITIONS.CONTROLS_RIGHT,
      index: 7,
      disable: false,
      showIcon: true,
      autoplayOnCast: true, // 投屏后是否自动播放
      airplay: true,
      chromecast: true,
      showAirplayMutedTip: true, // 是否显示 AirPlay 连接时需要取消静音的提示
    }
  }

  afterCreate() {
    if (this.config.disable || this.player?.mediaConfig?.mediaType !== 'video') {
      return
    }
    this._msePluginRestore = null
    this._castHandshakeInProgress = false

    this.appendChild('.xgplayer-icon', this.icons.cast)
    this._handler = this.hook('click', this._doCast, {
      pre: (e) => {
        e.preventDefault()
        e.stopPropagation()
      }
    })
    this.bind(['click', 'touchend'], this._handler)
    this.on('cast_target_change', this._onCastTargetChange)
    this.on('cast_availability_change', this._onCastAvailabilityChange)
    this.on('loadstart', this._onLoadStart)

    if (
      (this.config.airplay || this.player.config.airplay) &&
      isAirPlayAvailable(this.player)
    ) {
      this._airplay = new Airplay(this)
      this._airplay.install()
    }

    if (this.config.chromecast && isChromecastAvailable(this.player)) {
      this._chromecast = new Chromecast(this)
      this._chromecast.install()
    }
  }

  _onLoadStart = () => {}

  _onCastAvailabilityChange = ({ availability }) => {
    switch (availability) {
      case 'available':
        this.show()
        break
      case 'not-available':
        this.hide()
        break
    }
  }

  _onCastTargetChange = ({ isCasting }) => {
    if (isCasting) {
      this._suspendMSEPlugin()
      this._playForCastHandshake()
    } else {
      this._castHandshakeInProgress = false
      this._resumeMSEPlugin()
    }
  }

  /**
   * @private
   * AirPlay/Chromecast often needs an explicit play command to complete route activation.
   * If autoplayOnCast is false, pause immediately after the route is activated.
   */
  _playForCastHandshake = async () => {
    if (this._castHandshakeInProgress) {
      return
    }
    this._castHandshakeInProgress = true

    const shouldKeepPlaying = !!this.config.autoplayOnCast
    // console.log('autoplayOnCast', this.config.autoplayOnCast)

    try {
      await this.player.play()
    } catch (error) {
      if (error?.name !== 'AbortError') {
        console.warn('Failed to play media for cast handshake:', error)
      }
      return
    } finally {
      this._castHandshakeInProgress = false
    }

    if (!shouldKeepPlaying) {
      this.player.pause()
    }
  }

  /**
   * @private
   */
  _suspendMSEPlugin = () => {
    const instance =
      Object.values(this.player?.plugins ?? {}).find(
        (p) => p.constructor.isStreamingPlugin === true
      ) ?? null
    const plugin = instance?.constructor
    const pluginName = plugin?.pluginName

    if (!pluginName || !plugin || !this.player.getPlugin(pluginName)) {
      return
    }

    this._msePluginRestore = {
      plugin,
      pluginName
    }

    // Just unregister the plugin, do not call detachMedia or pause buffering, to avoid potential issues
    this.player.unRegisterPlugin(pluginName)
  }

  /**
   * @private
   */
  _resumeMSEPlugin = () => {
    if (!this._msePluginRestore) {
      return
    }

    const { plugin, pluginName } = this._msePluginRestore
    if (!plugin || !pluginName) {
      this._msePluginRestore = null
      return
    }

    if (this.player.getPlugin(pluginName)) {
      this._msePluginRestore = null
      return
    }

    // try {
    //   this.player.registerPlugin(plugin);
    //   const instance = this.player.getPlugin(pluginName);
    //   this._msePluginRestore = null;
    // } catch (err) {
    //   // ignore
    // }
  }

  registerIcons() {
    return {
      cast: { icon: CastSvg, class: 'xg-cast-icon' }
    }
  }

  _doCast = (e) => {
    this.emitUserAction(e, 'cast')
    this.requestCast()
  }

  /**
   * @public
   * Programmatically request casting. Opens the native cast dialog (AirPlay picker or
   * Chromecast device chooser) if a protocol is available.
   */
  requestCast() {
    this.emit('cast_request')
  }

  destroy() {
    super.destroy()
    this._msePluginRestore = null
    this._castHandshakeInProgress = false
    this.off('loadstart', this._onLoadStart)
    this.off('cast_availability_change', this._onCastAvailabilityChange)
    this.off('cast_target_change', this._onCastTargetChange)
    this.unbind(['click', 'touchend'], this._handler)
    this._airplay?.destroy()
    this._chromecast?.destroy()
  }

  render() {
    if (this.config.disable) {
      return
    }
    return `<xg-icon class="xgplayer-cast">
      <div class="xgplayer-icon"></div>
      ${Plugin.iconTip(this, 'CAST', this.playerConfig.isHideTips)}
    </xg-icon>`
  }
}
