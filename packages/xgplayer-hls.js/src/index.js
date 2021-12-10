import Player from 'xgplayer'
import Hls from 'hls.js'
import utils from './utils'

class HlsJsPlayer extends Player {
  constructor (options) {
    super(options)
    this.hlsOpts = options.hlsOpts || {}
    this.hlsOpts.mediaType = this.config.mediaType
    let util = Player.util
    let player = this

    player.once('complete', () => {
      if(player.config.isLive) {
        util.addClass(player.root, 'xgplayer-is-live')
        if(!util.findDom(player.controls, '.xgplayer-live')) {
          const live = util.createDom('xg-live', player.lang.LIVE || '正在直播', {}, 'xgplayer-live')
          player.controls.appendChild(live)
        }
      }
    })

    this.browser = utils.getBrowserVersion()
    if(player.config.useHls === undefined) {
      if ((Player.sniffer.device === 'mobile' && navigator.platform !== 'MacIntel' && navigator.platform !== 'Win32') || this.browser.indexOf('Safari') > -1) {
        return
      }
    } else if(!player.config.useHls) {
      return
    }
    this._start = this.start
    this.start = () => {
      if(!window.XgVideoProxy) {
        this.root.insertBefore(this.video, this.root.firstChild)
      }
      setTimeout(() => {
        this.emit('complete')
        if(this.danmu && typeof this.danmu.resize === 'function') {
          this.danmu.resize()
        }
      }, 1)
    }
    Number.isFinite = Number.isFinite || function(value) {
      return typeof value === "number" && isFinite(value);
    }

    let hls
    hls = new Hls(this.hlsOpts)
    this.hls = hls

    Object.defineProperty(player, 'src', {
      get () {
        return player.currentSrc
      },
      set (url) {
        util.removeClass(player.root, 'xgplayer-is-live')
        const liveDom = document.querySelector('.xgplayer-live')
        if (liveDom) {
          liveDom.parentNode.removeChild(liveDom)
        }
        // player.config.url = url
        player.autoplay = true
        const paused = player.paused
        if (!paused) {
          player.pause()
        }
        player.hls.stopLoad()
        player.hls.detachMedia()
        player.hls.destroy()
        player.hls = new Hls(player.hlsOpts)
        player.register(url)
        player.once('canplay', () => {
          player.play().catch(err => {})
        })
        player.hls.loadSource(url)
        player.hls.attachMedia(player.video)
      },
      configurable: true
    })
    this.register(this.config.url)
    this.once('complete', () => {
      hls.attachMedia(player.video)
      if(!player.config.videoInit) {
        player.once('canplay', () => {
          player.play().catch(err => {})
        })
      }
    })
    this.once('destroy', () => {
      hls.stopLoad()
    })
  }
  switchURL (url) {
    const player = this
    player.url = url
    player.config.url = url
    let curTime = player.currentTime
    // player.video.muted = true
    Player.util.addClass(player.root, 'xgplayer-is-enter')
    player.once('playing', function(){
      Player.util.removeClass(player.root, 'xgplayer-is-enter')
      // player.video.muted = false
    })
    player.once('canplay', function () {
      player.currentTime = curTime
      player.play()
    })
    if(typeof player.hls === 'object') {
      player.hls.originUrl = url
    }
    player.src = url
  }
  register (url) {
    let hls = this.hls
    let util = Player.util
    let player = this
    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      hls.loadSource(url)
    })

    hls.on(Hls.Events.LEVEL_LOADED, (name, e) => {
      if (!hls.inited) {
        hls.inited = true
        if (e && e.details && e.details.live) {
          util.addClass(player.root, 'xgplayer-is-live')
          if(!util.findDom(player.root, '.xgplayer-live')) {
            const live = util.createDom('xg-live', player.lang.LIVE || '正在直播', {}, 'xgplayer-live')
            player.controls.appendChild(live)
          }
        }
      }
    })
    hls.on(Hls.Events.ERROR, (event, data) => {
      player.emit('HLS_ERROR', {
        errorType: data.type,
        errorDetails: data.details,
        errorFatal: data.fatal,
      })
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            hls.startLoad()
            break
          case Hls.ErrorTypes.MEDIA_ERROR:
            hls.recoverMediaError()
            break
          default:
            player.emit('error', data)
        }
      }
    })
    this._statistics();
  }

  _statistics() {
    let statsInfo = {
      speed:0,
      playerType: "HlsPlayer"
    };

    let mediainfo = {
      videoDataRate:0,
      audioDataRate:0
    };
    let hls = this.hls;
    let player = this;

    hls.on(Hls.Events.FRAG_LOAD_PROGRESS, (flag,payload) =>{
      statsInfo.speed = payload.stats.loaded / 1000;
    });
    hls.on(Hls.Events.FRAG_PARSING_DATA, (flag,payload) =>{
      if (payload.type === 'video') {
        mediainfo.fps = parseInt(payload.nb/(payload.endPTS -payload.startPTS));
      }
    })

    hls.on(Hls.Events.FRAG_PARSING_INIT_SEGMENT, (flag,payload) =>{
      mediainfo.hasAudio = (payload && payload.tracks && payload.tracks.audio)? true: false;
      mediainfo.hasVideo = (payload && payload.tracks && payload.tracks.video)? true: false;

      if(mediainfo.hasAudio && payload.tracks.audio) {
        let track = payload.tracks.audio;
        mediainfo.audioChannelCount = (track.metadata && track.metadata.channelCount) ? track.metadata.channelCount:0;
        mediainfo.audioCodec = track.codec;
      }

      if(mediainfo.hasVideo && payload.tracks.video) {
        let track = payload.tracks.video;
        mediainfo.videoCodec = track.codec;
        mediainfo.width = (track.metadata && track.metadata.width) ? track.metadata.width:0;
        mediainfo.height = (track.metadata && track.metadata.height) ? track.metadata.height:0;
      }
      mediainfo.duration = (payload.frag && payload.frag.duration) ? payload.frag.duration:0
      mediainfo.level =(payload.frag && payload.frag.level) ? payload.frag.level:0;
      if(mediainfo.videoCodec || mediainfo.audioCodec) {
        mediainfo.mimeType = `video/hls; codecs="${mediainfo.videoCodec};${mediainfo.audioCodec}"`
      }

      player.mediainfo = mediainfo;
      player.emit("media_info", mediainfo);
    });

    this._statisticsTimmer = setInterval(()=>{
      player.emit("statistics_info", statsInfo);
      statsInfo.speed = 0;
    }, 1000)
  }

  destroy() {
    super.destroy();
    clearInterval(this._statisticsTimmer);
  }
}

HlsJsPlayer.isSupported = Hls.isSupported
HlsJsPlayer.HlsJs = Hls

export default HlsJsPlayer
