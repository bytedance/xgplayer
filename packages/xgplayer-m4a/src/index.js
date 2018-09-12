import 'core-js/modules/es6.promise.js'
import 'core-js/modules/es7.string.pad-start'
import Player from 'xgplayer'
import MP4 from './mp4'
import MSE from './media/mse'
import Task from './media/task'
import Buffer from './fmp4/buffer'

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

let m4aplayer = function () {
  let player = this; let sniffer = Player.sniffer; let util = Player.util
  let Errors = Player.Errors; let mainURL; let backupURL
  let preloadTime = player.config.preloadTime || 15
  let waiterTimer
  Player.m4a = true
  player.hasEnded = false
  let list = util.typeOf(player.config.url) === 'Array' ? player.config.url : [{
    src: player.config.url,
    name: player.config.name
  }]
  let url = list[0].src
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
  let loadData = (i = 0, time = player.currentTime, order = null, nextOrder = null) => {
    if (player.timer) {
      clearTimeout(player.timer)
    }
    time = Math.max(time, player.currentTime)
    player.timer = setTimeout(function () {
      player.mp4.seek(time, order, nextOrder).then(buffer => {
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
  let init = (url, replaying = false) => {
    let mp4 = new MP4(url)
    mp4.reqTimeLength = player.config.reqTimeLength || 5
    let mse
    return new Promise((resolve, reject) => {
      mp4.once('mdatReady', () => {
        mse = new MSE()
        if (replaying) {
          mse.replaying = true
        }
        mse.on('sourceopen', function () {
          mse.appendBuffer(mp4.packMeta(mp4.meta))
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
  if (['chrome', 'firfox', 'safari'].some(item => item === sniffer.browser) && MSE.isSupported('audio/mp4; codecs="mp4a.40.5"')) {
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
      },
      configurable: true
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
    player.cut = function (start = 0, end) {
      let segment = new Buffer()
      return new Promise((resolve, reject) => {
        let mp4 = new MP4(url)
        mp4.once('mdatReady', () => {
          if (!end || end <= start) {
            end = start + 15
          }
          if (end > mp4.meta.audioDuration) {
            start = mp4.meta.audioDuration - (end - start)
            end = mp4.meta.audioDuration
          }
          mp4.reqTimeLength = end - start
          mp4.cut = true
          mp4.seek(start).then(buffer => {
            if (buffer) {
              let meta = Player.util.deepCopy({
                duration: mp4.reqTimeLength,
                audioDuration: mp4.reqTimeLength,
                endTime: mp4.reqTimeLength
              }, mp4.meta)
              meta.duration = mp4.reqTimeLength
              meta.audioDuration = mp4.reqTimeLength
              meta.endTime = mp4.reqTimeLength
              segment.write(mp4.packMeta(meta), buffer)
              resolve(new Blob([segment.buffer], {type: 'audio/mp4; codecs="mp4a.40.5"'}))
            }
          })
        })
        mp4.on('error', (e) => {
          reject(e)
        })
      })
    }

    player.switchURL = (url) => {
      let mp5 = new MP4(url)
      let mp4 = player.mp4
      mp5.on('mdatReady', () => {
        let timeRange = mp4.timeRage; let curTime = player.currentTime
        timeRange = mp4.timeRage
        let start = timeRange.find(item => item[0] - curTime > 2)[0]
        let end = player.getBufferedRange()[1]
        if (end - start > 0 && sniffer.browser !== 'safari') {
          player.mse.removeBuffer(start, end)
        }
        player.mp4 = mp5
        player.mse.appendBuffer(mp5.packMeta(mp5.meta))
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
          if (range[1] === 0) {
            loadData(5)
            return false
          } else {
            if (item[0].time >= range[1] && !mp4.bufferCache.has(idx)) {
              loadData(0, item[0].time, item[0].order, item[1].order)
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
      let timeRage = player.mp4.timeRage
      if (buffered.length) {
        for (let i = 0, len = buffered.length; i < len; i++) {
          if (curTime >= buffered.start(i) && curTime <= buffered.end(i)) {
            hasBuffered = true
            break
          }
        }
        if (!hasBuffered) {
          timeRage.every((item, idx) => {
            if (item[0].time <= curTime && item[1].time > curTime) {
              loadData(0, item[0].time, item[0].order, item[1].order)
              return false
            } else {
              return true
            }
          })
        }
      } else {
        timeRage.every((item, idx) => {
          if (item[0].time <= curTime && item[1].time > curTime) {
            loadData(0, item[0].time, item[0].order, item[1].order)
            return false
          } else {
            return true
          }
        })
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
      let buffered = player.buffered; let hasBuffered = false; let curTime = player.currentTime
      Task.clear()
      let timeRage = player.mp4.timeRage
      if (buffered.length) {
        for (let i = 0, len = buffered.length; i < len; i++) {
          if (curTime >= buffered.start(i) && curTime <= buffered.end(i)) {
            hasBuffered = true
            break
          }
        }
        if (!hasBuffered) {
          timeRage.every((item, idx) => {
            if (item[0].time <= curTime && item[1].time > curTime) {
              loadData(0, item[0].time, item[0].order, item[1].order)
              return false
            } else {
              return true
            }
          })
        }
      } else {
        timeRage.every((item, idx) => {
          if (item[0].time <= curTime && item[1].time > curTime) {
            loadData(0, item[0].time, item[0].order, item[1].order)
            return false
          } else {
            return true
          }
        })
      }
    })

    player.once('destroy', () => {
      Task.clear()
      if (player.timer) {
        clearTimeout(player.timer)
      }
    })

    // let playBtn = util.findDom(player.root, '.xgplayer-play');
    // ['click', 'touchstart'].forEach(item => {
    //   playBtn.addEventListener(item, function (e) {
    //     e.preventDefault()
    //     e.stopPropagation()
    //     if (player.hasEnded) {
    //       player.hasEnded = false
    //       Task.clear()
    //       player.mp4.bufferCache.clear()
    //       // player.currentTime = 0
    //       init(player.mp4.url, true).then((result) => {
    //         let mp4 = result[0]; let mse = result[1]
    //         player.src = mse.url
    //         player.mp4 = mp4
    //         player.mse = mse
    //         player.mse.replaying = true
    //         player.currentTime = 0
    //         player.video.play().then(() => {
    //
    //           // player.pause()
    //           // player.currentTime = 0
    //         })
    //       }, err => {
    //         errorHandle(player, err)
    //       })
    //     }
    //   })
    // })

    player.on('change', (nextItem) => {
      player.newMusic(nextItem.src)
    })

    player.newMusic = (url) => {
      Task.clear()
      player.mp4.bufferCache.clear()
      init(url, true).then((result) => {
        let mp4 = result[0]; let mse = result[1]
        player.src = mse.url
        player.mp4 = mp4
        player.mse = mse
        player.mse.replaying = true
        player.currentTime = 0
        player.video.play()
      }, err => {
        errorHandle(player, err)
      })
    }

    player.on('ended', () => {
      player.hasEnded = true
      // Task.clear()
      // player.mp4.bufferCache.clear()
      // // player.currentTime = 0
      // init(player.mp4.url, true).then((result) => {
      //   let mp4 = result[0]; let mse = result[1]
      //   player.src = mse.url
      //   player.mp4 = mp4
      //   player.mse = mse
      //   player.mse.replaying = true
      //   // player.currentTime = 0
      //   // player.video.play().then(() => {
      //   //
      //   //   player.pause()
      //   //   player.currentTime = 0
      //   // })
      // }, err => {
      //   errorHandle(player, err)
      // })
    })
  }
}

Player.install('m4aplayer', m4aplayer)
