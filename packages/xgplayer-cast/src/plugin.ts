import { Plugin } from 'xgplayer'
import AirplaySvg from './assets/airplay.svg'
import CastSvg from './assets/cast.svg'
import { Airplay, isAirPlayAvailable } from './platform/airplay'
import {
  captureLocalStateForCast,
  getConfiguredCastAutoplay,
  toNonNegativeTime
} from './platform/cast-handoff-state'
import { Chromecast } from './platform/chromecast'
import {
  normalizeChromecastConfig,
  shouldInstallChromecast
} from './platform/chromecast-config'
import type {
  CastAvailability,
  CastProtocol,
  CastRouteState,
  ChromecastConfig
} from './types'

import './cast-i18n'
import './index.scss'

export class CastPlugin extends Plugin {
  _msePluginRestore: {
    plugin: any
    pluginName: string
    config?: Record<string, any>
  } | null
  _castHandshakeInProgress: boolean
  _handoffState: CastRouteState | null
  _castAvailability: Record<string, CastAvailability>
  _castAdapters: Record<string, any>
  _handler: any
  _airplay?: Airplay
  _chromecast?: Chromecast
  _chromecastConfig?: ChromecastConfig
  _castIconProtocol?: string

  static get pluginName() {
    return 'cast'
  }

  static get defaultConfig() {
    return {
      position: Plugin.POSITIONS.CONTROLS_RIGHT,
      index: 7,
      disable: false,
      showIcon: true,
      autoplayOnCast: undefined, // 未配置时继承投屏前播放态
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
    this._handoffState = null
    this._castAvailability = {
      airplay: 'not-available',
      chromecast: 'not-available'
    }
    this._castAdapters = {}

    // Bind prototype methods used as event listeners so off() can remove them
    this._onCastTargetChange = this._onCastTargetChange.bind(this)
    this._onCastAvailabilityChange = this._onCastAvailabilityChange.bind(this)
    this._onLoadStart = this._onLoadStart.bind(this)

    this.appendChild('.xgplayer-icon', (this.icons as any).cast)
    this._handler = this.hook('click', this._doCast, {
      pre: (e) => {
        e.preventDefault()
        e.stopPropagation()
      }
    } as any)
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

  _onCastAvailabilityChange({
    protocol,
    availability
  }: {
    protocol?: CastProtocol
    availability: CastAvailability
  }) {
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

  _updateCastIcon(protocol: CastProtocol) {
    if (this._castIconProtocol === protocol) {
      return
    }

    this._castIconProtocol = protocol
    const iconRoot = this.find('.xgplayer-icon')
    const icon = (this.icons as any)[protocol] || (this.icons as any).cast
    if (!iconRoot || !icon) {
      return
    }

    iconRoot.innerHTML = ''
    iconRoot.appendChild(icon)
  }

  async _onCastTargetChange({
    isCasting,
    protocol
  }: {
    isCasting: boolean
    protocol?: CastProtocol
  }) {
    if (isCasting) {
      await this._handleCastActivated({ protocol })
    } else {
      this._castHandshakeInProgress = false
      this._handoffState = null
    }
  }

  async _handleCastActivated({ protocol }: { protocol?: CastProtocol }) {
    if (protocol === 'chromecast') {
      // Chromecast uses loadMedia.autoplay — no local play() handshake needed
      return
    }
    return this._playForCastHandshake()
  }

  // AirPlay often needs an explicit play command to complete route activation.
  // When autoplayOnCast is not configured, keep the pre-cast playback state.
  async _playForCastHandshake() {
    if (this._castHandshakeInProgress) {
      return
    }
    this._castHandshakeInProgress = true

    const shouldKeepPlaying = this._getCastAutoplay()

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

  _captureHandoffState(protocol?: CastProtocol) {
    const state = captureLocalStateForCast(this.player, protocol)
    this._handoffState = state
    return state
  }

  _getCastAutoplay() {
    const configuredAutoplay = getConfiguredCastAutoplay(this.config)
    if (configuredAutoplay !== undefined) {
      return configuredAutoplay
    }

    const state = this._handoffState || this._captureHandoffState()
    return !state.paused
  }

  _suspendMSEPlugin() {
    const instance =
      Object.values(this.player?.plugins ?? {}).find(
        (p: any) => p.constructor.isStreamingPlugin === true
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

  async _resumeMSEPlugin(routeState?: CastRouteState | null) {
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
    const resumeTime = toNonNegativeTime(routeState?.currentTime)
    const playerConfig = this.player?.config
    const hasStartTime =
      !!playerConfig && Object.prototype.hasOwnProperty.call(playerConfig, 'startTime')
    const previousStartTime = playerConfig?.startTime

    try {
      if (resumeTime !== null && playerConfig) {
        playerConfig.startTime = resumeTime
      }

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
    } finally {
      if (resumeTime !== null && playerConfig) {
        if (hasStartTime) {
          playerConfig.startTime = previousStartTime
        } else {
          delete playerConfig.startTime
        }
      }
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

  // Selects the best available protocol and emits cast_request with a protocol
  // payload so only the correct adapter responds. Pass protocol to force one.
  requestCast(protocol?: CastProtocol) {
    const targetProtocol = protocol || this._getPreferredCastProtocol()
    if (!targetProtocol) {
      return
    }
    const handoffState = this._captureHandoffState(targetProtocol)
    this.emit('cast_request', {
      protocol: targetProtocol,
      autoplay: this._getCastAutoplay(),
      handoffState
    })
  }

  // Return the latest remote state for protocols that expose one.
  getCastRemoteState(protocol: CastProtocol = 'chromecast') {
    return this._castAdapters[protocol]?.getRemoteState?.() || null
  }

  // Control remote media for protocols that expose a remote controller.
  controlCastRemote(
    action: string,
    payload?: any,
    protocol: CastProtocol = 'chromecast'
  ) {
    return this._castAdapters[protocol]?.controlRemote?.(action, payload) || false
  }

  // Backward-compatible alias. Prefer controlCastRemote() for new integrations.
  controlCast(action: string, payload?: any, protocol: CastProtocol = 'chromecast') {
    return this.controlCastRemote(action, payload, protocol)
  }

  _getPreferredCastProtocol(): CastProtocol | null {
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
    this._handoffState = null
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
      ${(Plugin as any).iconTip(this, 'CAST', this.playerConfig.isHideTips)}
    </xg-icon>`
  }
}
