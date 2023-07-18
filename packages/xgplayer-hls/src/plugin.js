import { BasePlugin, Events, Errors } from 'xgplayer'
import { EVENT } from 'xgplayer-streaming-shared'
import { Hls } from './hls'
import { Event } from './hls/constants'
import PluginExtension from './plugin-extension'

export function parseSwitchUrlArgs (args, plugin) {
  const { player } = plugin
  const curTime = player.currentTime
  const options = {
    startTime: curTime
  }

  switch (typeof args) {
    case 'boolean':
      options.seamless = args
      break
    case 'object':
      Object.assign(options, args)
      break
    default:
      break
  }
  return options
}

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
    const config = this.player.config

    if (!config.url &&
      // private config key
      !config.__allowHlsEmptyUrl__) {
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
      media: this.player.media || this.player.video,
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

    this.on(Events.SWITCH_SUBTITLE || 'switch_subtitle', this._onSwitchSubtitle)
    this.on(Events.URL_CHANGE, this._onSwitchURL)
    this.on(Events.DESTROY, this.destroy.bind(this))

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
    this._transCoreEvent(EVENT.DEMUXED_TRACK)
    this._transCoreEvent(EVENT.SEI)
    this._transCoreEvent(EVENT.SEI_IN_TIME)
    this._transCoreEvent(EVENT.SPEED)
    this._transCoreEvent(EVENT.HLS_MANIFEST_LOADED)
    this._transCoreEvent(EVENT.HLS_LEVEL_LOADED)
    this._transCoreEvent(EVENT.STREAM_EXCEPTION)
    this._transCoreEvent(EVENT.SWITCH_URL_SUCCESS)
    this._transCoreEvent(EVENT.SWITCH_URL_FAILED)
    this._transCoreEvent(Event.NO_AUDIO_TRACK)
    this._transCoreEvent(Event.STREAM_PARSED)
    this._transCoreEvent(Event.SUBTITLE_SEGMENTS)
    this._transCoreEvent(Event.SUBTITLE_PLAYLIST)
    this._transCoreEvent(Event.APPEND_COST)

    if (config.url) {
      this.hls.load(config.url, true).catch(e => {})
    }
  }

  /**
   * It needs to be supported as a subclass to be inherited externally, so don't write it as an attribute here
   */
  destroy () {
    if (this.hls) {
      this.hls.destroy()
      this.hls = null
    }

    this.pluginExtension?.destroy()
    this.pluginExtension = null
  }

  /**
   * @returns {import('./hls').Stats |  undefined}
   */
  getStats = () => {
    return this.hls?.getStats()
  }


  /**
   * @param {string | boolean} [mediaType]
   * @param {string} [codec]
   * @returns {boolean}
   * - mediaType: 默认检测 MSE 对 H264 codec是否支持，传入 true 或者配置参数的mediaType的取值检测 WebAssembly是否支持
   * - codec: 暂无使用
   */
  static isSupported (mediaType, codec) {
    return Hls.isSupported(mediaType, codec)
  }

  _onSwitchSubtitle = ({lang}) => {
    this.hls?.switchSubtitleStream(lang)
  }

  _onSwitchURL = (url, args) => {
    const { player, hls } = this
    if (hls) {
      const options = parseSwitchUrlArgs(args, this)
      player.config.url = url
      hls.switchURL(url, options).catch(e => {})

      if (!options.seamless && this.player.config?.hls?.keepStatusAfterSwitch) {
        this._keepPauseStatus()
      }
    }
  }

  _keepPauseStatus = () => {
    const paused = this.player.paused
    if (!paused) return
    this.player.once('canplay', () => {
      this.player.pause()
    })
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

        if (eventName === EVENT.SEI_IN_TIME && this.hls.hasSubtitle) {
          this._emitSeiPaylodTime(e)
        }
      }
    })
  }

  _emitSeiPaylodTime (e) {
    try {
      const seiJson = JSON.parse(Array.from(e.data.payload).map(x=>String.fromCharCode(x)).join('').slice(0,-1))
      if (!seiJson['rtmp_dts']) return
      this.player.emit('core_event', {
        eventName: Event.SEI_PAYLOAD_TIME,
        time: seiJson['rtmp_dts']
      })
    } catch (e) {}
  }

}
