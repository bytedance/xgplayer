import Player from 'xgplayer'
import Hls from './hls.js/hls'
import utils from './utils'

class HlsJsPlayer extends Player {
  constructor (options) {
    super(options)
    this.hlsOpts = options.hlsOpts || {}
    let util = Player.util
    let player = this
    this.browser = utils.getBrowserVersion()
    if(player.config.useHls === undefined) {
      if ((Player.sniffer.device === 'mobile' && navigator.platform !== 'MacIntel' && navigator.platform !== 'Win32') || this.browser.indexOf('Safari') > -1) {
        return
      }
    } else if(!player.config.useHls) {
      return
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
        const paused = player.paused
        player.hls.stopLoad()
        player.hls.detachMedia()
        player.hls.destroy()
        player.hls = new Hls(player.hlsOpts)
        player.register(url)
        if (!paused) {
          player.pause()
          player.once('pause', () => {
            player.hls.loadSource(url)
          })
          player.once('canplay', () => {
            player.play().catch(err => {})
          })
        } else {
          player.hls.loadSource(url)
        }
        player.hls.attachMedia(player.video)
        player.once('canplay', () => {
          player.currentTime = 0
        })
      },
      configurable: true
    })
    this.register(this.config.url)
    this.once('complete', () => {
      hls.attachMedia(player.video)
      player.once('canplay', () => {
        player.play().catch(err => {})
      })
      if(player.config.isLive) {
        util.addClass(player.root, 'xgplayer-is-live')
        if(!util.findDom(player.root, '.xgplayer-live')) {
          const live = util.createDom('xg-live', '正在直播', {}, 'xgplayer-live')
          player.controls.appendChild(live)
        }
      }
    })
    this.once('destroy', () => {
      hls.stopLoad()
    })
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
            const live = util.createDom('xg-live', '正在直播', {}, 'xgplayer-live')
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
      mediainfo.hasAudio = (payload.tracks && payload.tracks.audio)? true: false;
      mediainfo.hasVideo = (payload.tracks && payload.tracks.audio)? true: false;

      if(mediainfo.hasAudio) {
        let track = payload.tracks.audio;
        mediainfo.audioChannelCount = (track.metadata && track.metadata.channelCount) ? track.metadata.channelCount:0;
        mediainfo.audioCodec = track.codec;
      }

      if(mediainfo.hasVideo) {
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

export default HlsJsPlayer
