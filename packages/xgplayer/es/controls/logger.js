/* eslint-disable */
import Player from '../player';
import sniffer from '../utils/sniffer';
import Collector from './collect';

var logger = function logger() {
  var player = this;
  var util = Player.util;
  if (player.config.noLog !== true) {
    var endedFunc = function endedFunc() {
      var played = player.video.played;
      var watch_dur = computeWatchDur(player.logParams.played);
      var et = new Date().getTime();
      judgePtVt();
      var obj = {
        url: player.logParams.pluginSrc ? player.logParams.pluginSrc : player.logParams.playSrc,
        vid: player.config.vid,
        bc: player.logParams.bc - 1 > 0 ? player.logParams.bc - 1 : 0,
        bb: player.logParams.bc - 1 > 0 ? 1 : 0,
        bu_acu_t: player.logParams.bu_acu_t,
        pt: player.logParams.pt,
        vt: player.logParams.vt,
        vd: player.logParams.vd * 1000,
        watch_dur: parseFloat((watch_dur * 1000).toFixed(3)),
        cur_play_pos: parseFloat((player.currentTime * 1000).toFixed(3)),
        et: et
      };
      window.__xigua_log_sdk__('c', obj);
    };

    var urlchangeFunc = function urlchangeFunc() {
      var played = player.video.played;
      var watch_dur = computeWatchDur(player.logParams.played);
      var lt = new Date().getTime();
      judgePtVt();
      var obj = {
        url: player.logParams.pluginSrc ? player.logParams.pluginSrc : player.logParams.playSrc,
        vid: player.config.vid,
        bc: player.logParams.bc - 1 > 0 ? player.logParams.bc - 1 : 0,
        bb: player.logParams.bc - 1 > 0 ? 1 : 0,
        bu_acu_t: player.logParams.bu_acu_t,
        pt: player.logParams.pt,
        vt: player.logParams.vt,
        vd: player.logParams.vd * 1000,
        watch_dur: parseFloat((watch_dur * 1000).toFixed(3)),
        cur_play_pos: parseFloat((player.currentTime * 1000).toFixed(3)),
        lt: lt
      };
      window.__xigua_log_sdk__('d', obj);
    };

    var errorFunc = function errorFunc(err) {
      var played = player.video.played;
      var watch_dur = computeWatchDur(player.logParams.played);
      judgePtVt();
      var et = new Date().getTime();
      if (player.logParams.lastErrLog && et - player.logParams.lastErrLog <= 1000 * 3) {
        return;
      }
      player.logParams.lastErrLog = et;
      var obj = {
        url: player.logParams.pluginSrc ? player.logParams.pluginSrc : player.logParams.playSrc,
        vid: player.config.vid,
        bc: player.logParams.bc - 1 > 0 ? player.logParams.bc - 1 : 0,
        bb: player.logParams.bc - 1 > 0 ? 1 : 0,
        bu_acu_t: player.logParams.bu_acu_t,
        pt: player.logParams.pt,
        vt: player.logParams.vt,
        vd: player.logParams.vd * 1000,
        watch_dur: parseFloat((watch_dur * 1000).toFixed(3)),
        err_msg: err.errd.msg,
        line: err.errd.line,
        et: et,
        cur_play_pos: parseFloat((player.currentTime * 1000).toFixed(3))
      };
      if (player.logParams.nologFunc && player.logParams.nologFunc(player)) {
        return true;
      } else {
        window.__xigua_log_sdk__('e', obj);
      }
    };

    var destroyFunc = function destroyFunc() {
      if (sniffer.device === 'pc') {
        window.removeEventListener('beforeunload', userLeave);
      } else if (sniffer.device === 'mobile') {
        window.removeEventListener('pagehide', userLeave);
      }
      player.off('routechange', userLeave);
      player.off('ended', endedFunc);
      player.off('urlchange', urlchangeFunc);
      player.off('error', errorFunc);
      player.off('destroy', destroyFunc);
    };

    if (!window.__xigua_log_sdk__) {
      window.__xigua_log_sdk__ = new Collector('tracker');
      window.__xigua_log_sdk__.init({
        app_id: 1300,
        channel: 'cn',
        log: false,
        disable_sdk_monitor: true
      });

      window.__xigua_log_sdk__('config', {
        evtParams: {
          log_type: 'logger',
          page_url: document.URL,
          domain: window.location.host,
          pver: player.version,
          ua: navigator.userAgent.toLowerCase()
        },
        disable_auto_pv: true
      });
      window.__xigua_log_sdk__.start();
    }

    if (player.config.uid) {
      window.__xigua_log_sdk__('config', {
        user_unique_id: player.config.uid
      });
    }

    var computeWatchDur = function computeWatchDur() {
      var played = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var minBegin = 0;
      var end = 0;
      var arr = [];
      for (var i = 0; i < played.length; i++) {
        if (!played[i].end || played[i].begin < 0 || played[i].end < 0 || played[i].end < played[i].begin) {
          continue;
        }
        if (arr.length < 1) {
          arr.push({ begin: played[i].begin, end: played[i].end });
        } else {
          for (var j = 0; j < arr.length; j++) {
            var begin = played[i].begin;
            var _end = played[i].end;
            if (_end < arr[j].begin) {
              arr.splice(j, 0, { begin: begin, end: _end });
              break;
            } else if (begin > arr[j].end) {
              if (j > arr.length - 2) {
                arr.push({ begin: begin, end: _end });
                break;
              }
            } else {
              var b = arr[j].begin;
              var e = arr[j].end;
              arr[j].begin = Math.min(begin, b);
              arr[j].end = Math.max(_end, e);
              break;
            }
          }
        }
      }
      var watch_dur = 0;
      for (var _i = 0; _i < arr.length; _i++) {
        watch_dur += arr[_i].end - arr[_i].begin;
      }
      return watch_dur;
    };

    var judgePtVt = function judgePtVt() {
      if (!player.logParams.pt || !player.logParams.vt) {
        player.logParams.pt = new Date().getTime();
        player.logParams.vt = player.logParams.pt;
      }
      if (player.logParams.pt > player.logParams.vt) {
        player.logParams.pt = player.logParams.vt;
      }
    };

    var userLeave = function userLeave(event) {
      if (util.hasClass(player.root, 'xgplayer-is-enter')) {
        var lt = new Date().getTime();
        var obj = {
          url: player.logParams.pluginSrc ? player.logParams.pluginSrc : player.logParams.playSrc,
          vid: player.config.vid,
          pt: player.logParams.pt,
          lt: lt
        };
        window.__xigua_log_sdk__('b', obj);
      } else if (util.hasClass(player.root, 'xgplayer-playing')) {
        var watch_dur = computeWatchDur(player.logParams.played);
        var _lt = new Date().getTime();
        judgePtVt();
        var _obj = {
          url: player.logParams.pluginSrc ? player.logParams.pluginSrc : player.logParams.playSrc,
          vid: player.config.vid,
          bc: player.logParams.bc - 1 > 0 ? player.logParams.bc - 1 : 0,
          bb: player.logParams.bc - 1 > 0 ? 1 : 0,
          bu_acu_t: player.logParams.bu_acu_t,
          pt: player.logParams.pt,
          vt: player.logParams.vt,
          vd: player.logParams.vd * 1000,
          watch_dur: parseFloat((watch_dur * 1000).toFixed(3)),
          cur_play_pos: parseFloat((player.currentTime * 1000).toFixed(3)),
          lt: _lt
        };
        window.__xigua_log_sdk__('d', _obj);
      }
    };
    if (sniffer.device === 'pc') {
      window.addEventListener('beforeunload', userLeave, false);
    } else if (sniffer.device === 'mobile') {
      window.addEventListener('pagehide', userLeave, false);
    }
    player.on('routechange', userLeave);

    player.on('ended', endedFunc);

    player.on('urlchange', urlchangeFunc);

    player.on('error', errorFunc);

    player.once('destroy', destroyFunc);
  }
};

Player.install('logger', logger);