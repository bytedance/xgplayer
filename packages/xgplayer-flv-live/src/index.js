import Player from 'xgplayer'
import { Context, EVENTS } from 'xgplayer-utils';
import FLV from './flv-live'
const flvAllowedEvents = EVENTS.FlvAllowedEvents;

const flvPlayer = function () {
  let player = this

  let util = Player.util
  const context = new Context(flvAllowedEvents)
  const _start = player.start
  let flv

  player.start = function (url = player.config.url) {
    if (!url) { return }

    flv = context.registry('FLV_CONTROLLER', FLV)(player)
    context.init()

    flv.once(EVENTS.REMUX_EVENTS.INIT_SEGMENT, () => {
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
    })

    flv.once(EVENTS.LOADER_EVENTS.LOADER_COMPLETE, () => {
      player.emit('ended')
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
    flv.seek(time)
  }

  player.on('timeupdate', () => {
    loadData(player.currentTime + 1)
  })

  player.on('seeking', () => {
    loadData()
  })

  player.on('waiting', () => {
    let buffered = player.buffered
    let length = buffered.length
    let currentTime = player.currentTime
    for (let i = 0; i < length; i++) {
      if (buffered.start(i) > currentTime) {
        player.currentTime = buffered.start(i) + 0.1
        break
      }
    }
  })

  player.once('destroy', () => {
    flv.destroy()
  })
}

Player.install('flvplayer', flvPlayer)
