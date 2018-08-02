import 'core-js/modules/es6.promise.js'
import 'core-js/modules/es7.string.pad-start'
import Player from 'xgplayer'
import MP4 from './mp4'
import MSE from './media/mse'
import Task from './media/task'

let isEnded = (player, mp4) => {
  if (mp4.meta.endTime - player.currentTime < 2) {
    let range = player.getBufferedRange()
    if (player.currentTime - range[1] < 0.1) {
      player.mse.endOfStream()
    }
  }
}

let errorHandle = (player, err) => {
  err.vid = player.config.vid
  err.url = player.src
  if (err.errd && typeof err.errd === 'object') {
    if (player.mp4) {
      err.errd.url = player.mp4.url
      err.url = player.mp4.url
      player.mp4.canDownload = false
    }
  }
  player.emit('DATA_REPORT', err)
  if (err.errt === 'network' && player.config._backupURL) {
    player.src = player.config._backupURL
  } else {
    player.src = player.config._mainURL
  }
  player.switchURL = null
  player._replay = null
}

let mp4player = function () {
  let player = this; let sniffer = Player.sniffer; let util = Player.util
  let Errors = Player.Errors; let mainURL; let backupURL
  let preloadTime = player.config.preloadTime || 15
  let waiterTimer
  let url = player.config.url
  let rule = player.config.pluginRule || function () { return true }
  if (!url) {
    player.emit('error', new Errors('other', player.config.vid))
    return
  }
  if (util.typeOf(url) === 'String') {
    mainURL = url
  } else if (util.typeOf(url) === 'Array' && url.length) {
    mainURL = url[0].src
    backupURL = url[1].src
  }
  player.config._mainURL = mainURL
  player.config._backupURL = backupURL
  let loadData = (i = 0, time = player.currentTime) => {
    if (player.timer) {
      clearTimeout(player.timer)
    }
    time = Math.max(time, player.currentTime)
    player.timer = setTimeout(function () {
      player.mp4.seek(time + i * 0.1).then(buffer => {
        if (buffer) {
          let mse = player.mse
          mse.updating = true
          mse.appendBuffer(buffer)
          mse.once('updateend', () => {
            mse.updating = false
          })
        }
      }, () => {
        if (i < 10) {
          setTimeout(function () {
            loadData(i + 1)
          }, 2000)
        }
      })
    }, 50)
  }
  let init = (url) => {
    let mp4 = new MP4(url)
    let mse
    return new Promise((resolve, reject) => {
      mp4.once('moovReady', () => {
        mse = new MSE()
        mse.on('sourceopen', function () {
          mse.appendBuffer(mp4.packMeta())
          mse.once('updateend', loadData.bind(player))
        })
        mse.on('error', function (e) {
          reject(e)
        })
        resolve([mp4, mse])
      })
      mp4.on('error', (e) => {
        reject(e)
      })
    })
  }
  if (['chrome', 'firfox', 'safari'].some(item => item === sniffer.browser) && MSE.isSupported('video/mp4; codecs="avc1.64001E, mp4a.40.5"')) {
    let _start = player.start
    if (!rule.call(player)) {
      return false
    }
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
      }
    })
    player.start = function (url = mainURL) {
      init(url).then((result) => {
        let mp4 = result[0]; let mse = result[1]
        _start.call(player, mse.url)
        player.mp4 = mp4
        player.mse = mse
        mp4.on('error', err => {
          errorHandle(player, err)
        })
      }, err => {
        _start.call(player, url)
        errorHandle(player, err)
      })
      player.once('canplay', () => {
        // safari decoder time offset
        if (sniffer.browser === 'safari' && player.buffered) {
          let start = player.buffered.start(0)
          player.currentTime = start + 0.1
        }
      })
    }

    player.switchURL = (url) => {
      let mp5 = new MP4(url)
      let mp4 = player.mp4
      mp5.on('moovReady', () => {
        let timeRange = mp4.timeRage; let curTime = player.currentTime
        timeRange = mp4.timeRage
        let start = timeRange.find(item => item[0] - curTime > 2)[0]
        let end = player.getBufferedRange()[1]
        if (end - start > 0 && sniffer.browser !== 'safari') {
          player.mse.removeBuffer(start, end)
        }
        player.mp4 = mp5
        player.mse.appendBuffer(mp5.packMeta())
      })
      mp5.on('error', err => {
        errorHandle(player, err)
      })
    }

    player.on('timeupdate', function () {
      let mse = player.mse; let mp4 = player.mp4
      if (mse && !mse.updating && mp4.canDownload) {
        let timeRage = mp4.timeRage
        let range = player.getBufferedRange(); let cacheMaxTime = player.currentTime + preloadTime
        if (range[1] - cacheMaxTime > 0) {
          return
        }
        timeRage.every((item, idx) => {
          let start = item[0]; let end = item[1]; let center = (start + end) / 2
          if (range[1] === 0) {
            loadData(5)
            return false
          } else {
            if (center > range[1] && !mp4.bufferCache.has(idx)) {
              loadData(0, center)
            } else {
              return true
            }
          }
        })
        isEnded(player, mp4)// hack for older webkit
      }
    })

    player.on('seeking', function () {
      let buffered = player.buffered; let hasBuffered = false; let curTime = player.currentTime
      Task.clear()
      if (buffered.length) {
        for (let i = 0, len = buffered.length; i < len; i++) {
          if (curTime >= buffered.start(i) && curTime <= buffered.end(i)) {
            hasBuffered = true
            break
          }
        }
        if (!hasBuffered) {
          loadData(0, curTime)
        }
      } else {
        loadData(0, player.currentTime)
      }
    })

    player.on('pause', function () {
      Task.clear()
    })

    player.on('playing', function () {
      if (waiterTimer) {
        clearTimeout(waiterTimer)
      }
    })

    player.on('waiting', function () {
      let mp4 = player.mp4
      if (!mp4 || !mp4.meta) {
        return
      }
      let range = player.getBufferedRange()
      let duration = mp4.meta.videoDuration
      if (duration - player.currentTime < 0.5 && duration - range[1] < 0.5) {
        player.mse.endOfStream()
      } else {
        loadData(0, range[1] + 1)
        waiterTimer = setTimeout(function () {
          let buffered = player.buffered; let start
          for (let i = 0, len = buffered.length; i < len; i++) {
            start = buffered.start(i)
            if (start >= player.currentTime) {
              player.currentTime = start
              break
            }
          }
        }, 1500)
      }
    })

    player._replay = function () {
      Task.clear()
      player.mp4.bufferCache.clear()
      init(player.mp4.url).then((result) => {
        let mp4 = result[0]; let mse = result[1]
        player.src = mse.url
        player.mp4 = mp4
        player.mse = mse
        player.currentTime = 0
        player.play()
      }, err => {
        errorHandle(player, err)
      })
    }
  }
}

Player.install('mp4player', mp4player)
