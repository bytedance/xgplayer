import Player from 'xgplayer'
import Flv from './flv/flv'

class FlvJsPlayer extends Player {
  constructor (options) {
    super(options)
    this.flvOpts = { type: 'flv' }
    this.optionalConfig = {}
    Player.util.deepCopy(this.flvOpts, options)
    Player.util.deepCopy(this.optionalConfig, options.flvOptionalConfig)
    const player = this

    Object.defineProperty(player, 'src', {
      get () {
        return player.currentSrc
      },
      set (url) {
        player.flv_load(url)
        let oldVol = player.volume
        player.video.muted = true
        Player.util.addClass(player.root, 'xgplayer-is-enter')
        player.once('playing', function(){
          Player.util.removeClass(player.root, 'xgplayer-is-enter')
          player.video.muted = false
        })
        player.once('canplay', function () {
          player.play()
        })
      },
      configurable: true
    })

    player.once('complete', () => {
      player.__flv__ = Flv.createPlayer(this.flvOpts, this.optionalConfig)
      player.createInstance(player.__flv__)
      if(player.config.isLive) {
        Player.util.addClass(player.root, 'xgplayer-is-live')
        const live = Player.util.createDom('xg-live', '正在直播', {}, 'xgplayer-live')
        player.controls.appendChild(live)
      }
    })
  }

  createInstance (flv) {
    const player = this
    player.video.addEventListener('contextmenu', function (e) {
      e.preventDefault()
    })
    flv.attachMediaElement(player.video)
    flv.load()
    flv.play()
    flv.on(Flv.Events.ERROR, (e) => {
      player.emit('error', new Player.Errors('other', player.config.url))
    })

    player.once('destroy', () => {
      flv.destroy()
      player.__flv__ = null
    })
  }
  flv_load (newUrl) {
    let mediaDataSource = this.flvOpts
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
    mediaDataSource.cors = true
    mediaDataSource.hasAudio = true
    mediaDataSource.hasVideo = true
    mediaDataSource.isLive = true
    mediaDataSource.url = newUrl
    mediaDataSource.withCredentials = false
    this.flv_load_mds(mediaDataSource)
  }
  flv_load_mds (mediaDataSource) {
    let player = this
    if (typeof player.__flv__ !== 'undefined') {
      if (player.__flv__ != null) {
        player.__flv__.unload()
        player.__flv__.detachMediaElement()
        player.__flv__.destroy()
        player.__flv__ = null
      }
    }
    player.__flv__ = Flv.createPlayer(mediaDataSource, this.optionalConfig)

    player.__flv__.attachMediaElement(player.video)
    player.__flv__.load()
  }

  switchURL (url) {
    const player = this
    let curTime = 0
    if(!player.config.isLive) {
      curTime = player.currentTime
    }
    player.flv_load(url)
    let oldVol = player.volume
    player.video.muted = true
    Player.util.addClass(player.root, 'xgplayer-is-enter')
    player.once('playing', function(){
      Player.util.removeClass(player.root, 'xgplayer-is-enter')
      player.video.muted = false
    })
    player.once('canplay', function () {
      if(!player.config.isLive) {
        player.currentTime = curTime
      }
      player.play()
    })
  }
}
FlvJsPlayer.isSupported = Flv.isSupported
export default FlvJsPlayer
