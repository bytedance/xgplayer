(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  require('core-js/modules/es6.promise.js');

  require('core-js/modules/es7.string.pad-start');

  var _xgplayer = require('xgplayer');

  var _xgplayer2 = _interopRequireDefault(_xgplayer);

  var _mp = require('./mp4');

  var _mp2 = _interopRequireDefault(_mp);

  var _mse = require('./media/mse');

  var _mse2 = _interopRequireDefault(_mse);

  var _task = require('./media/task');

  var _task2 = _interopRequireDefault(_task);

  var _buffer = require('./fmp4/buffer');

  var _buffer2 = _interopRequireDefault(_buffer);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var isEnded = function isEnded(player, mp4) {
    if (mp4.meta.endTime - player.currentTime < 2) {
      var range = player.getBufferedRange();
      if (player.currentTime - range[1] < 0.1) {
        player.mse.endOfStream();
      }
    }
  };

  var mp4player = function mp4player() {
    var player = this;var sniffer = _xgplayer2.default.sniffer;var util = _xgplayer2.default.util;
    var Errors = _xgplayer2.default.Errors;var mainURL = void 0;var backupURL = void 0;
    var preloadTime = player.config.preloadTime || 15;
    var waiterTimer = void 0;
    var url = player.config.url;
    var rule = player.config.pluginRule || function () {
      return true;
    };
    if (!url) {
      player.emit('error', new Errors('other', player.config.vid));
      return;
    }
    if (util.typeOf(url) === 'String') {
      mainURL = url;
    } else if (util.typeOf(url) === 'Array' && url.length) {
      mainURL = url[0].src;
      if (url.length > 1) {
        backupURL = url[1].src;
      }
    }
    player.config._mainURL = mainURL;
    player.config._backupURL = backupURL;
    var loadData = function loadData() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : player.currentTime;

      if (player.timer) {
        clearTimeout(player.timer);
      }
      time = Math.max(time, player.currentTime);
      player.timer = setTimeout(function () {
        player.mp4.seek(time + i * 0.1).then(function (buffer) {
          if (buffer) {
            var mse = player.mse;
            mse.updating = true;
            mse.appendBuffer(buffer);
            mse.once('updateend', function () {
              mse.updating = false;
            });
          }
        }, function () {
          if (i < 10) {
            setTimeout(function () {
              loadData(i + 1);
            }, 2000);
          }
        });
      }, 50);
    };
    var init = function init(url) {
      var mp4 = new _mp2.default(url, player.config.withCredentials);
      var mse = void 0;
      return new Promise(function (resolve, reject) {
        mp4.once('moovReady', function () {
          mse = new _mse2.default();
          mse.on('sourceopen', function () {
            mse.appendBuffer(mp4.packMeta());
            mse.once('updateend', loadData.bind(player));
          });
          mse.on('error', function (e) {
            reject(e);
          });
          resolve([mp4, mse]);
        });
        mp4.on('error', function (e) {
          reject(e);
        });
      });
    };
    if (['chrome', 'firfox', 'safari'].some(function (item) {
      return item === sniffer.browser;
    }) && _mse2.default.isSupported('video/mp4; codecs="avc1.64001E, mp4a.40.5"')) {
      player._start = player.start;
      if (!rule.call(player)) {
        return false;
      }

      var errorHandle = function errorHandle(player, err) {
        err.vid = player.config.vid;
        err.url = player.src;
        if (err.errd && _typeof(err.errd) === 'object') {
          if (player.mp4) {
            err.errd.url = player.mp4.url;
            err.url = player.mp4.url;
            player.mp4.canDownload = false;
          }
        }
        player.emit('DATA_REPORT', err);
        _task2.default.clear();
        if (player.mp4 && player.mp4.bufferCache) {
          player.mp4.bufferCache.clear();
        }
        if (player.currentTime) {
          player._currentTime = player.currentTime;
        }
        if (player._start) {
          player.start = player._start;
          player._start = null;
        }
        player.switchURL = null;
        player._replay = null;

        // player.off('timeupdate', timeupdateFunc)
        clearInterval(player.mp4ProgressTimer);
        player.off('seeking', seekingFunc);
        player.off('pause', pauseFunc);
        player.off('playing', playingFunc);
        player.off('waiting', waitingFunc);
        player.off('ended', endedFunc);
        player.off('destroy', destroyFunc);

        if (err.errt === 'network' && player.config._backupURL) {
          player.src = player.config._backupURL;
        } else {
          player.src = player.config._mainURL;
        }
        player.once('canplay', function () {
          if (player._currentTime) {
            player.currentTime = player._currentTime;
          }
          player.play();
        });
      };

      player.start = function () {
        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : mainURL;

        init(url).then(function (result) {
          var mp4 = result[0];var mse = result[1];
          player._start(mse.url);
          player.logParams.pluginSrc = url;
          player.mp4 = mp4;
          player.mse = mse;
          mp4.on('error', function (err) {
            errorHandle(player, err);
          });
        }, function (err) {
          player._start(url);
          errorHandle(player, err);
        });
        player.once('canplay', function () {
          // safari decoder time offset
          if (sniffer.browser === 'safari' && player.buffered) {
            var start = player.buffered.start(0);
            player.currentTime = start + 0.1;
          }
        });
      };

      player.cut = function () {
        var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var end = arguments[1];

        var segment = new _buffer2.default();
        var mp4 = new _mp2.default(url, player.config.withCredentials);
        return new Promise(function (resolve, reject) {
          mp4.once('moovReady', function () {
            if (!end || end <= start) {
              end = start + 15;
            }
            if (end > mp4.meta.duration) {
              start = mp4.meta.duration - (end - start);
              end = mp4.meta.duration;
            }
            mp4.cut(start, end).then(function (buffer) {
              if (buffer) {
                var meta = _xgplayer2.default.util.deepCopy({
                  duration: end - start,
                  audioDuration: end - start,
                  endTime: end - start
                }, mp4.meta);
                meta.duration = end - start;
                meta.videoDuration = end - start;
                meta.audioDuration = end - start;
                meta.endTime = end - start;
                segment.write(mp4.packMeta(meta), buffer);
                resolve(new Blob([segment.buffer], { type: 'video/mp4; codecs="avc1.64001E, mp4a.40.5"' }));
              }
            });
          });
          mp4.on('error', function (e) {
            reject(e);
          });
        });
      };

      player.switchURL = function (url) {
        var mp5 = new _mp2.default(url, player.config.withCredentials);
        var mp4 = player.mp4;
        mp5.on('moovReady', function () {
          var timeRange = mp4.timeRage;var curTime = player.currentTime;
          timeRange = mp4.timeRage;
          var start = timeRange.find(function (item) {
            return item[0] - curTime > 2;
          })[0];
          var end = player.getBufferedRange()[1];
          if (end - start > 0 && sniffer.browser !== 'safari') {
            player.mse.removeBuffer(start, end);
          }
          if (!_xgplayer2.default.util.hasClass(player.root, 'xgplayer-ended')) {
            player.emit('urlchange', JSON.parse(JSON.stringify(player.logParams)));
          }
          player.logParams = {
            bc: 0,
            bu_acu_t: 0,
            played: [{
              begin: player.video.currentTime,
              end: -1
            }],
            pt: new Date().getTime(),
            vt: new Date().getTime(),
            vd: 0
          };
          player.mp4 = mp5;
          player.mse.appendBuffer(mp5.packMeta());

          player.logParams.pt = new Date().getTime();
          // console.log('pt: ' + player.logParams.pt)
          player.logParams.vt = new Date().getTime();
          // console.log('vt: ' + player.logParams.vt)
          player.logParams.vd = player.video.duration;
          player.logParams.pluginSrc = url;
        });
        mp5.on('error', function (err) {
          errorHandle(player, err);
        });
      };

      player.playNext = function (url) {
        var mp5 = new _mp2.default(url, player.config.withCredentials);
        var mp4 = player.mp4;
        mp5.on('moovReady', function () {
          var range = [0, 0];
          var buffered = player.video.buffered;
          var currentTime = player.video.currentTime;
          var max = 0;
          if (buffered) {
            for (var i = 0, len = buffered.length; i < len; i++) {
              range[0] = buffered.start(i);
              range[1] = buffered.end(i);
              if (range[0] <= currentTime && range[1] <= currentTime) {
                max = range[1] > max ? range[1] : max;
                player.mse.removeBuffer(range[0], range[1]);
              }
            }
          }
          player.mp4 = mp5;
          player.mse.appendBuffer(mp5.packMeta());
          var flag = true;
          player.on('timeupdate', function () {
            if (flag && mp4.meta.endTime - player.currentTime < 2) {
              var _range = player.getBufferedRange();
              if (player.currentTime - _range[1] < 0.1) {
                flag = false;
                player.currentTime = 0;
                buffered = player.video.buffered;
                if (buffered) {
                  for (var _i = 0, _len = buffered.length; _i < _len; _i++) {
                    _range[0] = buffered.start(_i);
                    _range[1] = buffered.end(_i);
                    if (_range[0] >= max) {
                      player.mse.removeBuffer(_range[0], _range[1]);
                    }
                  }
                }
              }
            }
          });
        });
        mp5.on('error', function (err) {
          errorHandle(player, err);
        });
      };

      var timeupdateFunc = function timeupdateFunc() {
        var mse = player.mse;var mp4 = player.mp4;
        if (mse && !mse.updating && mp4.canDownload) {
          var timeRage = mp4.timeRage;
          var range = player.getBufferedRange();var cacheMaxTime = player.currentTime + preloadTime;
          if (range[1] - cacheMaxTime > 0) {
            return;
          }
          timeRage.every(function (item, idx) {
            var start = item[0];var end = item[1];var center = (start + end) / 2;
            if (range[1] === 0) {
              return false;
            } else {
              if (center > range[1] && !mp4.bufferCache.has(idx)) {
                loadData(0, center);
              } else {
                return true;
              }
            }
          });
          isEnded(player, mp4); // hack for older webkit
        }
      };

      // player.on('timeupdate', timeupdateFunc)
      player.mp4ProgressTimer = setInterval(timeupdateFunc, player.config.mp4ProgressTimer || 300);

      var seekingFunc = function seekingFunc() {
        var buffered = player.buffered;var hasBuffered = false;var curTime = player.currentTime;
        _task2.default.clear();
        if (buffered.length) {
          for (var i = 0, len = buffered.length; i < len; i++) {
            if (curTime >= buffered.start(i) && curTime <= buffered.end(i)) {
              hasBuffered = true;
              break;
            }
          }
          if (!hasBuffered) {
            loadData(0, curTime);
          }
        } else {
          loadData(0, player.currentTime);
        }
      };
      player.on('seeking', seekingFunc);

      var pauseFunc = function pauseFunc() {
        _task2.default.clear();
      };
      player.on('pause', pauseFunc);

      var playingFunc = function playingFunc() {
        if (waiterTimer) {
          clearTimeout(waiterTimer);
        }
      };
      player.on('playing', playingFunc);

      var waitingFunc = function waitingFunc() {
        var mp4 = player.mp4;
        if (!mp4 || !mp4.meta) {
          return;
        }
        var range = player.getBufferedRange();
        var duration = mp4.meta.videoDuration;
        if (duration - player.currentTime < 0.5 && duration - range[1] < 0.5) {
          player.mse.endOfStream();
        } else {
          loadData(0, range[1] + 1);
          waiterTimer = setTimeout(function () {
            var buffered = player.buffered;var start = void 0;
            for (var i = 0, len = buffered.length; i < len; i++) {
              start = buffered.start(i);
              if (start >= player.currentTime) {
                player.currentTime = start;
                break;
              }
            }
          }, 1500);
        }
      };
      player.on('waiting', waitingFunc);

      var endedFunc = function endedFunc() {
        player.off('waiting', waitingFunc);
        // player.off('timeupdate', timeupdateFunc)
        clearInterval(player.mp4ProgressTimer);
      };
      player.on('ended', endedFunc);

      var destroyFunc = function destroyFunc() {
        _task2.default.clear();
        if (player.timer) {
          clearTimeout(player.timer);
        }
      };
      player.once('destroy', destroyFunc);

      player._replay = function () {
        _task2.default.clear();
        player.mp4.bufferCache.clear();
        init(player.mp4.url).then(function (result) {
          var mp4 = result[0];var mse = result[1];
          player._start(mse.url);
          player.mp4 = mp4;
          player.mse = mse;
          player.currentTime = 0;
          player.play();
          player.once('canplay', function () {
            player.on('waiting', waitingFunc);
            // player.on('timeupdate', timeupdateFunc)
            player.mp4ProgressTimer = setInterval(timeupdateFunc, player.config.mp4ProgressTimer || 300);
          });
        }, function (err) {
          errorHandle(player, err);
        });
      };
    }
  };

  _xgplayer2.default.install('mp4player', mp4player);

})));
//# sourceMappingURL=index.js.map
