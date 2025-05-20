import { BasePlugin, Events, Errors } from 'xgplayer'
import { EVENT } from 'xgplayer-streaming-shared'
import Flv from './adapt/main'

export default class FlvPlugin extends BasePlugin {

  static get pluginName () {
    return 'flv'
  }

  /** @type {Flv} */
  flv = null;


  /** @type {Flv} */
  get core () {
    return this.flv
  }

  /** @type {string} */
  get version () {
    return this.flv?.version
  }

  get loader () {
    return this.flv?.loader
  }

  get transferCost () {
    return this.flv.transferCost
  }

  beforePlayerInit () {
    const config = this.player.config
    const mediaElem = this.player.media || this.player.video

    if (!config.url) return

    if (this.flv) this.flv.destroy()

    this.player.switchURL = this._onSwitchURL

    const flvOpts = config.flv || {}
    if (flvOpts.disconnectTime === null || flvOpts.disconnectTime === undefined) {
      flvOpts.disconnectTime = 0
    }

    this.flv = new Flv({
      isLive: config.isLive,
      media: mediaElem,
      preProcessUrl: (url, ext) => this.player?.preProcessUrl?.(url, ext) || {url, ext},
      ...flvOpts
    })

    if (!this.softDecode) {
      BasePlugin.defineGetterOrSetter(this.player, {
        url: {
          get: () => {
            return this.flv?.blobUrl
          },
          configurable: true
        }
      })
    }

    if (config.isLive) {
      this.player?.useHooks('replay', () => this.flv?.replay())
    }

    this.on(Events.URL_CHANGE, this._onSwitchURL)
    this.on(Events.DESTROY, this.destroy)

    this._transError()
    this._transCoreEvent(EVENT.TTFB)
    this._transCoreEvent(EVENT.LOAD_START)
    this._transCoreEvent(EVENT.LOAD_RESPONSE_HEADERS)
    this._transCoreEvent(EVENT.LOAD_COMPLETE)
    this._transCoreEvent(EVENT.LOAD_RETRY)
    this._transCoreEvent(EVENT.SOURCEBUFFER_CREATED)
    this._transCoreEvent(EVENT.ANALYZE_DURATION_EXCEEDED)
    this._transCoreEvent(EVENT.APPEND_BUFFER)
    this._transCoreEvent(EVENT.REMOVE_BUFFER)
    this._transCoreEvent(EVENT.BUFFEREOS)
    this._transCoreEvent(EVENT.KEYFRAME)
    this._transCoreEvent(EVENT.CHASEFRAME)
    this._transCoreEvent(EVENT.METADATA_PARSED)
    this._transCoreEvent(EVENT.SEI)
    this._transCoreEvent(EVENT.SEI_IN_TIME)
    this._transCoreEvent(EVENT.FLV_SCRIPT_DATA)
    this._transCoreEvent(EVENT.STREAM_EXCEPTION)
    this._transCoreEvent(EVENT.SWITCH_URL_SUCCESS)
    this._transCoreEvent(EVENT.SWITCH_URL_FAILED)

    if (!flvOpts.manualLoad) {
      this.loadSource(config.url, flvOpts.stream)
    }
    this.player.handleSource = false
  }

  /**
   * @return {import('./flv').Stats | undefined}
   */
  getStats = () => {
    return this.flv?.getStats()
  }

  loadSource = (url = this.player.config.url, stream) => {
    this.flv?.load(this.player.config.url, true, stream)
  }

  destroy = () => {
    if (this.flv) {
      this.flv.destroy()
      this.flv = null
    }
  }

  /**
   * @param {string | boolean} [mediaType]
   * @param {string} [codec]
   * @returns {boolean}
   * - mediaType: 默认检测 MSE 对 H264 codec是否支持，传入 true 或者配置参数的mediaType的取值检测 WebAssembly是否支持
   * - codec: 暂无使用
   */
  static isSupported () {
    return Flv.isSupported()
  }

  /**
   *
   * @param {string} url
   * @param {boolean | {seamless: boolean}} seamless
   */
  _onSwitchURL = (url, seamless) => {
    if (this.flv) {
      this.player.config.url = url

      if (typeof seamless === 'object') {
        seamless = seamless.seamless
      }

      this.flv.switchURL(url, seamless)

      if (!seamless && this.player.config?.flv?.keepStatusAfterSwitch) {
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

  _onDefinitionChange = ({ to }) => {
    if (this.flv) this.flv.switchURL(to)
  }

  _transError () {
    this.flv.on(EVENT.ERROR, (err) => {
      if (this.player) {
        this.player.emit(Events.ERROR, new Errors(this.player, err))
      }
    })
  }

  _transCoreEvent (eventName) {
    this.flv.on(eventName, (e) => {
      if (this.player) {
        this.player.emit('core_event', {
          ...e,
          eventName
        })
      }
    })
  }
}
