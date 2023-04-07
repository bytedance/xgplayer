import { BasePlugin, Events, Errors } from 'xgplayer'
import { EVENT } from 'xgplayer-streaming-shared'
import { Hls } from './hls'
import { Event } from './hls/constants'
import PluginExtension from './plugin-extension'

export class HlsPlugin extends BasePlugin {
  static Hls = Hls

  static EVENT = Event

  /**
   * @type {Hls}
   */
  hls = null

  pluginExtension = null

  static get pluginName () {
    return 'hls'
  }

  get core () {
    return this.hls
  }

  get version () {
    return this.hls?.version
  }

  get softDecode () {
    const mediaType = this.player?.config?.mediaType
    return !!mediaType && mediaType !== 'video' && mediaType !== 'audio'
  }

  beforePlayerInit () {
    let _resolve
    const promise = new Promise((resolve, reject) => {
      _resolve = resolve
    })
    const config = this.player.config

    if (!config.url &&
      // private config key
      !config.__allowHlsEmptyUrl__) {
      _resolve()
      return
    }

    if (this.hls) this.hls.destroy()
    this.player.switchURL = this._onSwitchURL

    const hlsOpts = config.hls || {}
    hlsOpts.innerDegrade = hlsOpts.innerDegrade || config.innerDegrade
    if (hlsOpts.disconnectTime === null || hlsOpts.disconnectTime === undefined) hlsOpts.disconnectTime = 0

    this.hls = new Hls({
      softDecode: this.softDecode,
      isLive: config.isLive,
      media: this.player.video,
      startTime: config.startTime,
      url: config.url,
      ...hlsOpts
    })

    if (!this.softDecode) {
      BasePlugin.defineGetterOrSetter(this.player, {
        url: {
          get: () => this.hls?.media?.src,
          configurable: true
        }
      })
      this.hls.on('sourceAttached', () => {
        _resolve(true)
      })
    } else {
      _resolve(true)
    }

    if (this.softDecode) {
      this.pluginExtension = new PluginExtension({
        isLive: config.isLive,
        media: this.player.video,
        ...hlsOpts
      }, this)
      this.player.forceDegradeToVideo = (...args) => this.pluginExtension?.forceDegradeToVideo(...args)
    }

    if (config.isLive) {
      // This is a heavy operation for the vod flow, which may cause seeked event never emit
      this.player?.useHooks('replay', () => this.hls?.replay())
    }

    this.on(Events.URL_CHANGE, this._onSwitchURL)
    // this.on(Events.DEFINITION_CHANGE, this._onDefinitionChange)
    this.on(Events.DESTROY, this.destroy)

    this._transError()
    this._transCoreEvent(EVENT.TTFB)
    this._transCoreEvent(EVENT.LOAD_START)
    this._transCoreEvent(EVENT.LOAD_RESPONSE_HEADERS)
    this._transCoreEvent(EVENT.LOAD_COMPLETE)
    this._transCoreEvent(EVENT.LOAD_RETRY)
    this._transCoreEvent(EVENT.SOURCEBUFFER_CREATED)
    this._transCoreEvent(EVENT.REMOVE_BUFFER)
    this._transCoreEvent(EVENT.BUFFEREOS)
    this._transCoreEvent(EVENT.KEYFRAME)
    this._transCoreEvent(EVENT.METADATA_PARSED)
    this._transCoreEvent(EVENT.SEI)
    this._transCoreEvent(EVENT.SEI_IN_TIME)
    this._transCoreEvent(EVENT.SPEED)
    this._transCoreEvent(EVENT.HLS_MANIFEST_LOADED)
    this._transCoreEvent(Event.STREAM_PARSED)
    this._transCoreEvent(Event.NO_AUDIO_TRACK)
    this._transCoreEvent(EVENT.HLS_LEVEL_LOADED)
    this._transCoreEvent(EVENT.STREAM_EXCEPTION)
    this._transCoreEvent(EVENT.SWITCH_URL_SUCCESS)
    this._transCoreEvent(EVENT.SWITCH_URL_FAILED)

    if (config.url) {
      this.hls.load(config.url, true).catch(e => {})
    }

    return promise
  }

  getStats = () => {
    return this.hls?.getStats() || {}
  }

  destroy = () => {
    if (this.hls) {
      this.hls.destroy()
      this.hls = null
    }

    this.pluginExtension?.destroy()
    this.pluginExtension = null
  }

  static isSupported (mediaType, codec) {
    return Hls.isSupported(mediaType, codec)
  }

  _onSwitchURL = (url) => {
    const { player, hls } = this
    if (hls) {
      const curTime = player.currentTime

      player.config.url = url
      hls.switchURL(url, curTime).catch(e => {})
    }
  }

  _onDefinitionChange = ({ to }) => {
    if (this.hls) this.hls.switchURL(to).catch(e => {})
  }

  _transError () {
    this.hls.on(Event.ERROR, (err) => {
      if (this.player) {
        this.player.emit(Events.ERROR, new Errors(this.player, err))
      }
    })
  }

  _transCoreEvent (eventName) {
    this.hls.on(eventName, (e) => {
      if (this.player) {
        this.player.emit('core_event', {
          ...e,
          eventName
        })
      }
    })
  }
}
