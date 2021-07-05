import { BasePlugin, Errors, Events } from 'xgplayer'
import Flv from './flv/flv'

class FlvJsPlugin extends BasePlugin {
  static get isSupported () {
    return Flv.isSupported
  }

  static get pluginName () {
    return 'FlvJsPlugin'
  }

  static get defaultConfig () {
    return {
      mediaDataSource: { type: 'flv' },
      flvConfig: {}
    }
  }

  beforePlayerInit () {
    if (this.playerConfig.url) {
      this.flvLoad(this.playerConfig.url)
    }
  }

  afterCreate () {
    const { player } = this
    this.flv = null
    player.video.addEventListener('contextmenu', function (e) {
      e.preventDefault()
    })

    this.on(Events.URL_CHANGE, (url) => {
      if (/^blob/.test(url)) {
        return
      }
      player.once(Events.LOADED_DATA, () => {
        player.play()
      })
      this.playerConfig.url = url
      this.flvLoad(url)
    })
    try {
      BasePlugin.defineGetterOrSetter(player, {
        url: {
          get: () => {
            try {
              return this.player.video.src
            } catch (error) {
              return null
            }
          },
          configurable: true
        }
      })
    } catch (e) {
      // NOOP
    }
  }

  destroy () {
    const { player } = this
    this.destroyInstance()
    BasePlugin.defineGetterOrSetter(player, {
      url: {
        get: () => {
          try {
            return player.__url
          } catch (error) {
            return null
          }
        },
        configurable: true
      }
    })
  }

  destroyInstance () {
    if (!this.flv) {
      return
    }
    const { player } = this
    this.flv.unload()
    this.flv.detachMediaElement(player.video)
    this.flv.destroy()
    player.__flv__ = null
    this.flv = null
  }

  createInstance (flv) {
    const { player } = this
    if (!flv) {
      return
    }
    console.log('createInstance', flv)
    flv.attachMediaElement(player.video)
    flv.load()
    flv.play()

    flv.on(Flv.Events.ERROR, (e) => {
      player.emit('error', new Errors('other', player.config.url))
    })
    flv.on(Flv.Events.LOADED_SEI, (timestamp, data) => {
      console.log('Flv.Events.LOADED_SEI')
      player.emit('loaded_sei', timestamp, data)
    })
    flv.on(Flv.Events.STATISTICS_INFO, (data) => {
      console.log('Flv.Events.STATISTICS_INFO')
      player.emit('statistics_info', data)
    })
    flv.on(Flv.Events.MEDIA_INFO, (data) => {
      player.mediainfo = data
      player.emit('MEDIA_INFO', data)
      // console.log('player.autoplay', player.autoplay, player.paused)
      // if (player.autoplay) {
      //   player.once('canplay', () => {
      //     console.log('canplay')
      //     player.play()
      //   })
      // } else if (player.paused) {
      //   player.pause()
      // }
    })
  }

  flvLoad (newUrl) {
    console.log('flvLoad', newUrl)
    const mediaDataSource = this.config.mediaDataSource
    mediaDataSource.segments = [
      {
        cors: true,
        duration: undefined,
        filesize: undefined,
        timestampBase: 0,
        url: newUrl,
        withCredentials: false
      }
    ]
    // mediaDataSource.cors = true
    // mediaDataSource.hasAudio = true
    // mediaDataSource.hasVideo = true
    // mediaDataSource.isLive = true
    mediaDataSource.url = newUrl
    mediaDataSource.isLive = this.playerConfig.isLive
    // mediaDataSource.withCredentials = false
    this.flvLoadMds(mediaDataSource)
  }

  flvLoadMds (mediaDataSource) {
    const { player } = this
    if (typeof this.flv !== 'undefined') {
      this.destroyInstance()
    }
    this.flv = player.__flv__ = Flv.createPlayer(mediaDataSource, this.flvConfig)
    this.createInstance(this.flv)
    this.flv.attachMediaElement(player.video)
    this.flv.load()
  }

  switchURL (url) {
    const { player, playerConfig } = this
    let curTime = 0
    if (!playerConfig.isLive) {
      curTime = player.currentTime
    }
    player.flvLoad(url)
    // const oldVol = player.volume
    player.video.muted = true
    // Util.addClass(player.root, 'xgplayer-is-enter')
    this.once('playing', function () {
      // Util.removeClass(player.root, 'xgplayer-is-enter')
      player.video.muted = false
    })
    this.once('canplay', function () {
      if (!playerConfig.isLive) {
        player.currentTime = curTime
      }
      player.play()
    })
  }
}

export default FlvJsPlugin
