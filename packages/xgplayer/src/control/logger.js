/* eslint-disable */
import Player from '../player'
import sniffer from '../utils/sniffer'

let logger = function () {
  let player = this
  let util = Player.util
  if (player.config.noLog !== true) {
    (function(win, export_obj) {
      win['TeaAnalyticsObject'] = export_obj
      if (!win[export_obj]) {
        function _collect() {
          _collect.q.push(arguments)
          return _collect
        }
        _collect.q = _collect.q || []
        win[export_obj] = _collect
      }
      win[export_obj].l = +new Date()
    })(window, 'collectEvent')

    window.collectEvent('init', {
      app_id: 1300,
      channel: 'cn'
    })

    window.collectEvent('config', {
      log: false,
      evtParams: {
        log_type: 'logger',
        page_url: document.URL,
        domain: window.location.host,
        pver: player.version,
        ua: navigator.userAgent.toLowerCase()
      }
    })

    if(player.config.uid) {
      window.collectEvent('config', {
        user_unique_id: player.config.uid
      })
    }

    window.collectEvent('send')

    window.collectEvent('enter_page', {
      'from': 'index'
    })

    let userLeave = function (event) {
      if (util.hasClass(player.root, 'xgplayer-is-enter')) {
        let lt = new Date().getTime()
        let obj = {
          vid: player.config.vid,
          pt: player.logParams.pt,
          lt
        }
        window.collectEvent('b', obj)
      } else if (util.hasClass(player.root, 'xgplayer-playing')) {
        let played = player.video.played
        let watch_dur = 0
        for (let i = 0; i < played.length; i++) {
          watch_dur += played.end(i) - played.start(i)
        }
        let lt = new Date().getTime()
        let obj = {
          vid: player.config.vid,
          bc: player.logParams.bc - 1 > 0 ? player.logParams.bc - 1 : 0,
          bb: player.logParams.bc - 1 > 0 ? 1 : 0,
          bu_acu_t: player.logParams.bu_acu_t,
          pt: player.logParams.vt < player.logParams.pt ? 0 : player.logParams.pt,
          vt: player.logParams.vt,
          vd: player.logParams.vd * 1000,
          watch_dur: parseFloat((watch_dur * 1000).toFixed(3)),
          cur_play_pos: parseFloat((player.currentTime * 1000).toFixed(3)),
          lt
        }
        window.collectEvent('d', obj)
      }
    }
    if (sniffer.device === 'pc') {
      window.addEventListener('beforeunload', userLeave, false)
    } else if (sniffer.device === 'mobile') {
      window.addEventListener('pagehide', userLeave, false)
    }
    player.on('routechange', userLeave)

    player.on('ended', function () {
      let played = player.video.played
      let watch_dur = 0
      for (let i = 0; i < played.length; i++) {
        watch_dur += played.end(i) - played.start(i)
      }
      let et = new Date().getTime()
      let obj = {
        vid: player.config.vid,
        bc: player.logParams.bc - 1 > 0 ? player.logParams.bc - 1 : 0,
        bb: player.logParams.bc - 1 > 0 ? 1 : 0,
        bu_acu_t: player.logParams.bu_acu_t,
        pt: player.logParams.vt < player.logParams.pt ? 0 : player.logParams.pt,
        vt: player.logParams.vt,
        vd: player.logParams.vd * 1000,
        watch_dur: parseFloat((watch_dur * 1000).toFixed(3)),
        cur_play_pos: parseFloat((player.currentTime * 1000).toFixed(3)),
        et
      }
      window.collectEvent('c', obj)
    })
    player.on('urlchange', function () {
      let played = player.video.played
      let watch_dur = 0
      for (let i = 0; i < played.length; i++) {
        watch_dur += played.end(i) - played.start(i)
      }
      let lt = new Date().getTime()
      let obj = {
        vid: player.config.vid,
        bc: player.logParams.bc - 1 > 0 ? player.logParams.bc - 1 : 0,
        bb: player.logParams.bc - 1 > 0 ? 1 : 0,
        bu_acu_t: player.logParams.bu_acu_t,
        pt: player.logParams.vt < player.logParams.pt ? 0 : player.logParams.pt,
        vt: player.logParams.vt,
        vd: player.logParams.vd * 1000,
        watch_dur: parseFloat((watch_dur * 1000).toFixed(3)),
        cur_play_pos: parseFloat((player.currentTime * 1000).toFixed(3)),
        lt
      }
      window.collectEvent('d', obj)
    })
    player.on('error', function (err) {
      let played = player.video.played
      let watch_dur = 0
      for (let i = 0; i < played.length; i++) {
        watch_dur += played.end(i) - played.start(i)
      }
      let et = new Date().getTime()
      let obj = {
        vid: player.config.vid,
        bc: player.logParams.bc - 1 > 0 ? player.logParams.bc - 1 : 0,
        bb: player.logParams.bc - 1 > 0 ? 1 : 0,
        bu_acu_t: player.logParams.bu_acu_t,
        pt: player.logParams.vt < player.logParams.pt ? 0 : player.logParams.pt,
        vt: player.logParams.vt,
        vd: player.logParams.vd * 1000,
        watch_dur: parseFloat((watch_dur * 1000).toFixed(3)),
        err_msg: err.errd.msg,
        line: err.errd.line,
        et,
        cur_play_pos: parseFloat((player.currentTime * 1000).toFixed(3))
      }
      window.collectEvent('e', obj)
    })
  }
}

Player.install('logger', logger)
