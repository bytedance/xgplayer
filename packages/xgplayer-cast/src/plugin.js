import { Plugin } from 'xgplayer'
import CastSvg from './assets/cast.svg'
import { Airplay, isAirPlayAvailable } from './platform/airplay'
import { Chromecast } from './platform/chromecast'
import { normalizeChromecastConfig, shouldInstallChromecast } from './platform/chromecast-config'

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
    this._castAvailability = {
      airplay: 'not-available',
      chromecast: 'not-available'
    }

    // Bind prototype methods used as event listeners so off() can remove them
    this._onCastTargetChange = this._onCastTargetChange.bind(this)
    this._onCastAvailabilityChange = this._onCastAvailabilityChange.bind(this)
    this._onLoadStart = this._onLoadStart.bind(this)

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

    this._chromecastConfig = normalizeChromecastConfig(this.config.chromecast)
    if (shouldInstallChromecast(this.player, this._chromecastConfig)) {
      this._chromecast = new Chromecast(this, this._chromecastConfig)
      this._chromecast.install()
    }
  }

  _onLoadStart() {
    // TODO: if currently Chromecast casting, re-invoke loadMedia on the receiver
    // to sync the new source. See: https://developers.google.com/cast/docs/web_sender/integrate#load_media
    // Current version does not handle this — source changes during cast will desync remote from local.
  }

  _onCastAvailabilityChange({ protocol, availability }) {
    if (protocol) {
      this._castAvailability[protocol] = availability
    }

    const hasAvailableProtocol = Object.values(this._castAvailability)
      .some((v) => v === 'available')

    hasAvailableProtocol ? this.show() : this.hide()
  }

  async _onCastTargetChange({ isCasting, protocol }) {
    if (isCasting) {
      if (protocol === 'airplay') {
        this._suspendMSEPlugin()
      }
      await this._handleCastActivated({ protocol })
    } else {
      this._castHandshakeInProgress = false
      if (protocol === 'airplay') {
        this._resumeMSEPlugin()
      }
    }
  }

  async _handleCastActivated({ protocol }) {
    if (protocol === 'chromecast') {
      // Chromecast uses loadMedia.autoplay — no local play() handshake needed
      return
    }
    return this._playForCastHandshake()
  }

  /**
   * @private
   * AirPlay/Chromecast often needs an explicit play command to complete route activation.
   * If autoplayOnCast is false, pause immediately after the route is activated.
   */
  async _playForCastHandshake() {
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
   * Programmatically request casting. Selects the best available protocol
   * and emits cast_request with a protocol payload so only the correct
   * adapter responds. Pass protocol explicitly to force a specific one.
   */
  requestCast(protocol) {
    const targetProtocol = protocol || this._getPreferredCastProtocol()
    if (!targetProtocol) {
      return
    }
    this.emit('cast_request', { protocol: targetProtocol })
  }

  _getPreferredCastProtocol() {
    const available = Object.entries(this._castAvailability)
      .filter(([, v]) => v === 'available')
      .map(([k]) => k)
    if (available.length === 0) return null
    // Safari/iOS doesn't support Chromecast; prefer AirPlay there
    const isWebkit =
      /safari/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent)
    if (isWebkit && available.includes('airplay')) return 'airplay'
    if (available.includes('chromecast')) return 'chromecast'
    return available[0]
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
