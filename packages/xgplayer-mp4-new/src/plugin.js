import { BasePlugin, Events, Errors } from 'xgplayer'
import { EVENT } from 'xgplayer-streaming-shared'
import { MP4 } from './mp4'

export class MP4Plugin extends BasePlugin {
  static MP4 = MP4

  static get pluginName () {
    return 'mp4'
  }

  mp4 = null

  get core () {
    return this.mp4
  }

  get version () {
    return MP4.version
  }

  get softDecode () {
    const mediaType = this.player?.config?.mediaType
    return !!mediaType && mediaType !== 'video'
  }

  beforePlayerInit () {
    const config = this.player.config
    if (this.mp4) this.mp4.destroy()
    this.player.switchURL = this._onSwitchURL

    const mp4Config = config.mp4 || {}

    this.mp4 = new MP4({
      softDecode: this.softDecode,
      media: this.player.video,
      url: config.url,
      ...mp4Config
    })

    if (this.softDecode) {
      this.player.forceDegradeToVideo = () => {}
      this.player.video.addEventListener('lowdecode', this._onLowDecode)
    } else {
      BasePlugin.defineGetterOrSetter(this.player, {
        __url: {
          get: () => this.mp4?.media?.src,
          configurable: true
        }
      })
    }

    this.on(Events.URL_CHANGE, this._onSwitchURL)
    this.on(Events.DEFINITION_CHANGE, this._onDefinitionChange)
    this.on(Events.DESTROY, this.destroy)
    this._transError()
    this.mp4.load()
  }

  destroy = () => {
    if (this.mp4) {
      this.mp4.destroy()
      this.mp4 = null
      this.player?.video?.removeEventListener('lowdecode', this._onLowDecode)
    }
  }

  static isSupported (softDecode) {
    return MP4.isSupported(softDecode)
  }

  _onLowDecode = () => {
    const { video } = this.player

    if (!video) return

    this.player.emit('lowdecode', video.degradeInfo)
    this.player.emit('core_event', {
      ...video.degradeInfo,
      eventName: EVENT.LOWDECODE
    })
  }

  _onSwitchURL = (url) => {
    if (this.mp4) {
      this.player.config.url = url
      this.mp4.load(url)
    }
  }

  _onLowDecode = () => {
    const media = this.player.video
    if (!media) return

    this.player.emit('lowdecode', media.degradeInfo)
    this.player.emit('core_event', {
      ...media.degradeInfo,
      eventName: EVENT.LOWDECODE
    })
  }

  _onDefinitionChange = ({ to }) => {
    if (this.mp4) this.mp4.load(to)
  }

  _transError () {
    this.mp4.on(EVENT.ERROR, (err) => {
      if (this.player) {
        this.player.emit(Events.ERROR, new Errors(this.player, err))
      }
    })
  }
}
