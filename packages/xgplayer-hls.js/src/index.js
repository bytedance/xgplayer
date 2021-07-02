import { BasePlugin, Events } from 'xgplayer'
import Hls from 'hls.js/dist/hls.light.js'
import utils from './utils'

class HlsJsPlugin extends BasePlugin {
  static get pluginName () {
    return 'HlsJsPlugin'
  }

  static get defaultConfig () {
    return {
      hlsOpts: {}
    }
  }

  static get isSupported () {
    return Hls.isSupported
  }

  constructor (args) {
    super(args)
    this.browser = utils.getBrowserVersion()
    this.hls = null
    this.hlsOpts = {}
  }

  afterCreate () {
    const { hlsOpts } = this.config
    this.hlsOpts = hlsOpts
    this.on(Events.URL_CHANGE, (url) => {
      if (/^blob/.test(url)) {
        return
      }
      this.playerConfig.url = url
      this.register(url)
    })
    try {
      BasePlugin.defineGetterOrSetter(this.player, {
        __url: {
          get: () => {
            try {
              return this.player.video.src
            } catch (error) {
              return null
            }
          }
        }
      })
    } catch (e) {
      // NOOP
    }
  }

  beforePlayerInit () {
    this.register(this.player.config.url)
  }

  destroy () {
    this.hls && this.hls.destroy()
  }

  register (url) {
    const { player } = this
    if (this.hls) {
      this.hls.destroy()
    }
    this.hls = new Hls(this.hlsOpts)
    this.hls.once(Hls.Events.MEDIA_ATTACHED, () => {
      console.log('Hls.Events.MEDIA_ATTACHED', url)
      this.hls.loadSource(url)
    })

    this.hls.on(Hls.Events.ERROR, (event, data) => {
      player.emit('HLS_ERROR', {
        errorType: data.type,
        errorDetails: data.details,
        errorFatal: data.fatal
      })
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            this.hls.startLoad()
            break
          case Hls.ErrorTypes.MEDIA_ERROR:
            this.hls.recoverMediaError()
            break
          default:
            player.emit('error', data)
        }
      }
    })
    this.hls.attachMedia(this.player.video)
    this._statistics()
  }

  _statistics () {
    const statsInfo = {
      speed: 0,
      playerType: 'HlsPlayer'
    }

    const mediainfo = {
      videoDataRate: 0,
      audioDataRate: 0
    }
    const { player, hls } = this

    hls.on(Hls.Events.FRAG_LOAD_PROGRESS, (flag, payload) => {
      statsInfo.speed = payload.stats.loaded / 1000
    })
    hls.on(Hls.Events.FRAG_PARSING_DATA, (flag, payload) => {
      if (payload.type === 'video') {
        mediainfo.fps = parseInt(payload.nb / (payload.endPTS - payload.startPTS))
      }
    })

    hls.on(Hls.Events.FRAG_PARSING_INIT_SEGMENT, (flag, payload) => {
      mediainfo.hasAudio = !!((payload.tracks && payload.tracks.audio))
      mediainfo.hasVideo = !!((payload.tracks && payload.tracks.audio))

      if (mediainfo.hasAudio) {
        const track = payload.tracks.audio
        mediainfo.audioChannelCount = (track.metadata && track.metadata.channelCount) ? track.metadata.channelCount : 0
        mediainfo.audioCodec = track.codec
      }

      if (mediainfo.hasVideo) {
        const track = payload.tracks.video
        mediainfo.videoCodec = track.codec
        mediainfo.width = (track.metadata && track.metadata.width) ? track.metadata.width : 0
        mediainfo.height = (track.metadata && track.metadata.height) ? track.metadata.height : 0
      }
      mediainfo.duration = (payload.frag && payload.frag.duration) ? payload.frag.duration : 0
      mediainfo.level = (payload.frag && payload.frag.levels) ? payload.frag.levels : 0
      if (mediainfo.videoCodec || mediainfo.audioCodec) {
        mediainfo.mimeType = `video/hls; codecs="${mediainfo.videoCodec};${mediainfo.audioCodec}"`
      }

      player.mediainfo = mediainfo
      player.emit('media_info', mediainfo)
    })

    this._statisticsTimmer = setInterval(() => {
      player.emit('statistics_info', statsInfo)
      statsInfo.speed = 0
    }, 1000)
  }
}

export default HlsJsPlugin
