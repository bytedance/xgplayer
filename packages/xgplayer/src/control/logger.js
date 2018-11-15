/* eslint-disable */
import Player from '../player'
import sniffer from '../utils/sniffer'

let logger = function () {
  let player = this
  let util = Player.util
  if (player.config.noLog !== true) {
    // 1. 加载异步初始化代码
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

    // 2. 初始化SDK，必须。
    window.collectEvent('init', {
      app_id: 1300, // 申请的app_id。
      channel: 'cn'
    })

    // 3. 按需配置
    window.collectEvent('config', {
      log: false, // 开启调试日志
      // disable_ssid: true, // 是否停止使用ssid。
      // _staging_flag: 1, // 是否发到测试库
      evtParams: { // 设置公共属性
        log_type: 'logger',
        page_url: document.URL,
        domain: window.location.host,
        pver: player.version,
        ua: navigator.userAgent.toLowerCase()
      }
    })

    // 3. 按需配置，可多次调用。
    if(player.config.uid) {
      window.collectEvent('config', {
        user_unique_id: player.config.uid
      })
    }

    // 4. 配置完毕
    window.collectEvent('send')

    // 5. 发送事件。在3、4步之前调用也可以，事件会等到Tea.send()调用后，才真正发出。
    window.collectEvent('enter_page', {
      'from': 'index'
    })

    // let img = new Image()
    // let baseObj = {
    //   type: 'logger',
    //   page_url: document.URL,
    //   domain: window.location.host,
    //   ver: player.version,
    //   ua: navigator.userAgent.toLowerCase()
    // }
    // let xv

    if (player.config.allowLogParams) {
      let userLeave = function (event) {
        if (util.hasClass(player.root, 'xgplayer-is-enter')) {
          // img = new Image()
          let lt = new Date().getTime()
          let obj = {
            // ev: 'b',
            vid: player.config.vid,
            url: player.config.url,
            pt: player.logParams.pt,
            lt
          }
          // console.log('onbeforeunload enter')
          // console.log(obj)
          window.collectEvent('b', obj)
          // xv = encodeURIComponent(JSON.stringify([ obj ]))
          // img.src = `${SERVER}?xv=${xv}`
        } else if (util.hasClass(player.root, 'xgplayer-playing')) {
          // img = new Image()
          let played = player.video.played
          let watch_dur = 0
          for (let i = 0; i < played.length; i++) {
            watch_dur += played.end(i) - played.start(i)
          }
          let lt = new Date().getTime()
          let obj = {
            vid: player.config.vid,
            url: player.config.url,
            bc: player.logParams.bc,
            bb: player.logParams.bc > 0 ? 1 : 0,
            bu_acu_t: player.logParams.bu_acu_t,
            pt: player.logParams.pt,
            vt: player.logParams.vt,
            vd: player.logParams.vd * 1000,
            watch_dur: parseFloat((watch_dur * 1000).toFixed(3)),
            cur_play_pos: parseFloat((player.currentTime * 1000).toFixed(3)),
            lt
          }
          // console.log('onbeforeunload playing')
          // console.log(obj)
          window.collectEvent('d', obj)
          // xv = encodeURIComponent(JSON.stringify([ obj ]))
          // img.src = `${SERVER}?xv=${xv}`
        }
      }
      if (sniffer.device === 'pc') {
        window.addEventListener('beforeunload', userLeave, false)
      } else if (sniffer.device === 'mobile') {
        window.addEventListener('pagehide', userLeave, false)
      }

      player.on('ended', function () {
        // img = new Image()
        let played = player.video.played
        let watch_dur = 0
        for (let i = 0; i < played.length; i++) {
          watch_dur += played.end(i) - played.start(i)
        }
        let et = new Date().getTime()
        let obj = {
          vid: player.config.vid,
          url: player.config.url,
          bc: player.logParams.bc,
          bb: player.logParams.bc > 0 ? 1 : 0,
          bu_acu_t: player.logParams.bu_acu_t,
          pt: player.logParams.pt,
          vt: player.logParams.vt,
          vd: player.logParams.vd * 1000,
          watch_dur: parseFloat((watch_dur * 1000).toFixed(3)),
          cur_play_pos: parseFloat((player.currentTime * 1000).toFixed(3)),
          et
        }
        // console.log('ended')
        // console.log(obj)
        window.collectEvent('c', obj)
        // xv = encodeURIComponent(JSON.stringify([ obj ]))
        // img.src = `${SERVER}?xv=${xv}`
      })
      player.on('beforeDefinitionchange', function () {
        // img = new Image()
        let played = player.video.played
        let watch_dur = 0
        for (let i = 0; i < played.length; i++) {
          watch_dur += played.end(i) - played.start(i)
        }
        let lt = new Date().getTime()
        let obj = {
          // ev: 'd',
          vid: player.config.vid,
          url: player.config.url,
          bc: player.logParams.bc,
          bb: player.logParams.bc > 0 ? 1 : 0,
          bu_acu_t: player.logParams.bu_acu_t,
          pt: player.logParams.pt,
          vt: player.logParams.vt,
          vd: player.logParams.vd * 1000,
          watch_dur: parseFloat((watch_dur * 1000).toFixed(3)),
          cur_play_pos: parseFloat((player.currentTime * 1000).toFixed(3)),
          lt
        }
        // console.log('beforeDefinitionchange')
        // console.log(obj)
        window.collectEvent('d', obj)
        // xv = encodeURIComponent(JSON.stringify([ obj ]))
        // img.src = `${SERVER}?xv=${xv}`
      })
      player.on('error', function (err) {
        // img = new Image()
        let played = player.video.played
        let watch_dur = 0
        for (let i = 0; i < played.length; i++) {
          watch_dur += played.end(i) - played.start(i)
        }
        let et = new Date().getTime()
        let obj = {
          // ev: 'e',
          vid: player.config.vid,
          url: player.config.url,
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
        }
        // console.log('error')
        // console.log(obj)
        window.collectEvent('e', obj)
        // xv = encodeURIComponent(JSON.stringify([ obj ]))
        // img.src = `${SERVER}?xv=${xv}`
      })
    } else {
      // img = new Image()
      // xv = encodeURIComponent(JSON.stringify([ baseObj ]))
      // console.log('not allowLogParams')
      // console.log(baseObj)
      window.collectEvent('base', {})
      // img.src = `${SERVER}?xv=${xv}`
    }
  }
}

Player.install('logger', logger)
