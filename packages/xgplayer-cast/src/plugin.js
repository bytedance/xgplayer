import { Plugin } from 'xgplayer'
import AirplaySvg from './assets/airplay.svg'
import CastSvg from './assets/cast.svg'
import { Airplay, isAirPlayAvailable } from './platform/airplay'
import { Chromecast } from './platform/chromecast'
import {
  normalizeChromecastConfig,
  shouldInstallChromecast
} from './platform/chromecast-config'

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
      showAirplayMutedTip: true // 是否显示 AirPlay 连接时需要取消静音的提示
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
    this._castAdapters = {}

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
      this._castAdapters.airplay = this._airplay
      this._airplay.install()
    }

    this._chromecastConfig = normalizeChromecastConfig(this.config.chromecast)
    if (shouldInstallChromecast(this.player, this._chromecastConfig)) {
      this._chromecast = new Chromecast(this, this._chromecastConfig)
      this._castAdapters.chromecast = this._chromecast
      this._chromecast.install()
    }
    this._updateCastIconVisibility()
  }

  _onLoadStart() {
    this._chromecast?.reloadMedia?.()
  }

  _onCastAvailabilityChange({ protocol, availability }) {
    if (protocol) {
      this._castAvailability[protocol] = availability
    }

    this._updateCastIconVisibility()
  }

  _updateCastIconVisibility() {
    const protocol = this._getPreferredCastProtocol()
    if (protocol) {
      this._updateCastIcon(protocol)
      this.show()
    } else {
      this.hide()
    }
  }

  _updateCastIcon(protocol) {
    if (this._castIconProtocol === protocol) {
      return
    }

    this._castIconProtocol = protocol
    const iconRoot = this.find('.xgplayer-icon')
    const icon = this.icons[protocol] || this.icons.cast
    if (!iconRoot || !icon) {
      return
    }

    iconRoot.innerHTML = ''
    iconRoot.appendChild(icon)
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
        await this._resumeMSEPlugin()
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
  _suspendMSEPlugin() {
    const instance =
      Object.values(this.player?.plugins ?? {}).find(
        (p) => p.constructor.isStreamingPlugin === true
      ) ?? null
    const plugin = instance?.constructor
    const pluginName = plugin?.pluginName

    if (!pluginName || !plugin || !this.player?.getPlugin?.(pluginName)) {
      return
    }

    this._msePluginRestore = {
      plugin,
      pluginName,
      config: instance.config ? { ...instance.config } : undefined
    }

    // Just unregister the plugin, do not call detachMedia or pause buffering, to avoid potential issues
    this.player.unRegisterPlugin?.(pluginName)
  }

  /**
   * @private
   */
  async _resumeMSEPlugin() {
    if (!this._msePluginRestore) {
      return false
    }

    const { plugin, pluginName, config } = this._msePluginRestore
    if (!plugin || !pluginName) {
      this._msePluginRestore = null
      return false
    }

    if (!this.player?.getPlugin || !this.player?.registerPlugin) {
      return false
    }

    if (this.player.getPlugin(pluginName)) {
      this._msePluginRestore = null
      return true
    }

    let instance = null
    try {
      instance = this.player.registerPlugin(plugin, config)
      if (!instance) {
        return false
      }
      if (typeof instance.beforePlayerInit === 'function') {
        await instance.beforePlayerInit()
      }
      if (typeof instance.afterPlayerInit === 'function') {
        instance.afterPlayerInit()
      }
      this._msePluginRestore = null
      return true
    } catch (error) {
      console.warn('Failed to restore streaming plugin after AirPlay:', error)
      if (instance && this.player.getPlugin(pluginName) === instance) {
        this.player.unRegisterPlugin?.(pluginName)
      }
      return false
    }
  }

  registerIcons() {
    return {
      airplay: { icon: AirplaySvg, class: 'xg-airplay-icon' },
      cast: { icon: CastSvg, class: 'xg-cast-icon' },
      chromecast: { icon: CastSvg, class: 'xg-cast-icon' }
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
    const protocols = this._getProtocolOrder()

    for (const protocol of protocols) {
      if (this._castAvailability[protocol] === 'available') {
        return protocol
      }
    }

    for (const protocol of protocols) {
      if (this._castAdapters[protocol]?.canRequest?.()) {
        return protocol
      }
    }

    return null
  }

  _getProtocolOrder() {
    const protocols = Object.keys(this._castAdapters)
    return protocols.sort((a, b) => {
      if (a === b) return 0
      if (a === 'chromecast') return -1
      if (b === 'chromecast') return 1
      return 0
    })
  }

  destroy() {
    super.destroy()
    this._msePluginRestore = null
    this._castHandshakeInProgress = false
    this._castAdapters = {}
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
