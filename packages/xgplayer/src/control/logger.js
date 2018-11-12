import Player from '../player'
import sniffer from '../utils/sniffer'

const SERVER = ''

let logger = function () {
  let player = this
  let util = Player.util
  if (player.config.noLog !== true) {
    let img = new Image()
    let baseObj = {
      type: 'logger',
      page_url: document.URL,
      domain: window.location.host,
      ver: player.version,
      ua: navigator.userAgent.toLowerCase()
    }
    let xv

    if (player.config.allowLogParams) {
      let userLeave = function (event) {
        if (util.hasClass(player.root, 'xgplayer-is-enter')) {
          img = new Image()
          let lt = new Date().getTime()
          let obj = util.deepCopy({
            ev: 'b',
            vid: player.config.vid,
            src: player.config.url,
            pt: player.logParams.pt,
            lt
          }, baseObj)
          console.log('onbeforeunload enter')
          console.log(obj)
          xv = encodeURIComponent(JSON.stringify([ obj ]))
          // img.src = `${SERVER}?xv=${xv}`
        } else if (util.hasClass(player.root, 'xgplayer-playing')) {
          img = new Image()
          let played = player.video.played
          let watch_dur = 0
          for (let i = 0; i < played.length; i++) {
            watch_dur += played.end(i) - played.start(i)
          }
          let lt = new Date().getTime()
          let obj = util.deepCopy({
            ev: 'd',
            vid: player.config.vid,
            src: player.config.url,
            bc: player.logParams.bc,
            bb: player.logParams.bc > 0 ? 1 : 0,
            bu_acu_t: player.logParams.bu_acu_t,
            pt: player.logParams.pt,
            vt: player.logParams.vt,
            vd: player.logParams.vd * 1000,
            watch_dur: parseFloat((watch_dur * 1000).toFixed(3)),
            cur_play_pos: parseFloat((player.currentTime * 1000).toFixed(3)),
            lt
          }, baseObj)
          console.log('onbeforeunload playing')
          console.log(obj)
          xv = encodeURIComponent(JSON.stringify([ obj ]))
          // img.src = `${SERVER}?xv=${xv}`
        }
        // event.returnValue = '123'
      }
      if (sniffer.device === 'pc') {
        window.addEventListener('beforeunload', userLeave, false)
      } else if (sniffer.device === 'mobile') {
        window.addEventListener('pagehide', userLeave, false)
      }

      player.on('ended', function () {
        img = new Image()
        let played = player.video.played
        let watch_dur = 0
        for (let i = 0; i < played.length; i++) {
          watch_dur += played.end(i) - played.start(i)
        }
        let et = new Date().getTime()
        let obj = util.deepCopy({
          ev: 'c',
          vid: player.config.vid,
          src: player.config.url,
          bc: player.logParams.bc,
          bb: player.logParams.bc > 0 ? 1 : 0,
          bu_acu_t: player.logParams.bu_acu_t,
          pt: player.logParams.pt,
          vt: player.logParams.vt,
          vd: player.logParams.vd * 1000,
          watch_dur: parseFloat((watch_dur * 1000).toFixed(3)),
          cur_play_pos: parseFloat((player.currentTime * 1000).toFixed(3)),
          et
        }, baseObj)
        console.log('ended')
        console.log(obj)
        xv = encodeURIComponent(JSON.stringify([ obj ]))
        // img.src = `${SERVER}?xv=${xv}`
      })
      player.on('beforeDefinitionchange', function () {
        img = new Image()
        let played = player.video.played
        let watch_dur = 0
        for (let i = 0; i < played.length; i++) {
          watch_dur += played.end(i) - played.start(i)
        }
        let lt = new Date().getTime()
        let obj = util.deepCopy({
          ev: 'd',
          vid: player.config.vid,
          src: player.config.url,
          bc: player.logParams.bc,
          bb: player.logParams.bc > 0 ? 1 : 0,
          bu_acu_t: player.logParams.bu_acu_t,
          pt: player.logParams.pt,
          vt: player.logParams.vt,
          vd: player.logParams.vd * 1000,
          watch_dur: parseFloat((watch_dur * 1000).toFixed(3)),
          cur_play_pos: parseFloat((player.currentTime * 1000).toFixed(3)),
          lt
        }, baseObj)
        console.log('beforeDefinitionchange')
        console.log(obj)
        xv = encodeURIComponent(JSON.stringify([ obj ]))
        // img.src = `${SERVER}?xv=${xv}`
      })
      player.on('error', function (err) {
        img = new Image()
        let played = player.video.played
        let watch_dur = 0
        for (let i = 0; i < played.length; i++) {
          watch_dur += played.end(i) - played.start(i)
        }
        let et = new Date().getTime()
        let obj = util.deepCopy({
          ev: 'e',
          vid: player.config.vid,
          src: player.config.url,
          bc: player.logParams.bc,
          bb: player.logParams.bc > 0 ? 1 : 0,
          bu_acu_t: player.logParams.bu_acu_t,
          pt: player.logParams.pt,
          vt: player.logParams.vt,
          vd: player.logParams.vd * 1000,
          watch_dur: parseFloat((watch_dur * 1000).toFixed(3)),
          err_msg: err.errd.msg,
          line: err.errd.line,
          et,
          cur_play_pos: parseFloat((player.currentTime * 1000).toFixed(3))
        }, baseObj)
        console.log('error')
        console.log(obj)
        xv = encodeURIComponent(JSON.stringify([ obj ]))
        // img.src = `${SERVER}?xv=${xv}`
      })
    } else {
      img = new Image()
      xv = encodeURIComponent(JSON.stringify([ baseObj ]))
      console.log('not allowLogParams')
      console.log(baseObj)
      // img.src = `${SERVER}?xv=${xv}`
    }
  }
}

Player.install('logger', logger)
