import Player from 'xgplayer'
import { Context, EVENTS } from 'xgplayer-utils';
import FLV from './Flv'
const flvAllowedEvents = EVENTS.FlvAllowedEvents;

const isEnded = (player, flv) => {
  if (!player.config.isLive) {
    if (player.duration - player.currentTime < 2) {
      const range = player.getBufferedRange()
      if (player.currentTime - range[1] < 0.1) {
        flv.mse.endOfStream()
      }
    }
  }
}

const flvPlayer = function () {
  let player = this

  let util = Player.util
  const context = new Context(flvAllowedEvents)
  const preloadTime = player.config.preloadTime || 15
  const _start = player.start
  let flv

  player.start = function (url = player.config.url) {
    if (!url) { return }

    flv = context.registry('FLV_CONTROLLER', FLV)(player)
    context.init()

    flv.once(EVENTS.INIT_SEGMENT, () => {
      if (player.config.isLive) {
        util.addClass(player.root, 'xgplayer-is-live')
        const live = util.createDom('xg-live', '正在直播', {}, 'xgplayer-live')
        player.controls.appendChild(live)
        const timer = setInterval(() => {
          if (player.paused && player.buffered.length) {
            for (let i = 0, len = player.buffered.length; i < len; i++) {
              if (player.buffered.start(i) > player.currentTime) {
                player.currentTime = player.buffered.start(i)
                clearInterval(timer)
                break
              }
            }
          }
        }, 200)
      }
    })
    _start.call(player, flv.mse.url)

    initSrcChangeHandler()
  }

  const initSrcChangeHandler = () => {
    Object.defineProperty(player, 'src', {
      get () {
        return player.currentSrc
      },
      set (url) {
        player.config.url = url
        if (!player.paused) {
          player.pause()
          player.once('pause', () => {
            player.start(url)
          })
          player.once('canplay', () => {
            player.play()
          })
        } else {
          player.start(url)
        }
        player.once('canplay', () => {
          player.currentTime = 0
        })
      },
      configurable: true
    })
  }

  const loadData = (time = player.currentTime) => {
    const range = player.getBufferedRange()
    if (time < range[1]) {
      if (!player.config.isLive) {
        // TODO 在迫近preloadTime的时候开始加载
        if (range[1] - time < preloadTime) {
          flv.seek(range[1] + 1)
        }
      }
    } else {
      flv.seek(time)
    }
  }

  player.on('timeupdate', () => {
    loadData(player.currentTime + 1)
    isEnded(player, flv)
  })

  player.on('seeking', () => {
    loadData()
  })

  player.on('waiting', () => {
    if (flv.type === 'live') {
      let buffered = player.buffered
      let length = buffered.length
      let currentTime = player.currentTime
      for (let i = 0; i < length; i++) {
        if (buffered.start(i) > currentTime) {
          player.currentTime = buffered.start(i) + 0.1
          break
        }
      }
    }
  })

  player.once('destroy', () => {
    flv.destroy()
  })
}

Player.install('flvplayer', flvPlayer)
