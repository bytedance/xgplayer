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

  var _mp3 = require('./fmp4/mp4');

  var _mp4 = _interopRequireDefault(_mp3);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var isEnded = function isEnded(player, mp4) {
    if (mp4.meta.endTime - player.currentTime < 2) {
      var range = player.getBufferedRange();
      if (player.currentTime - range[1] < 0.1) {
        player.mse.endOfStream();
      }
    }
  };

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
    if (err.errt === 'network' && player.config._backupURL) {
      player.src = player.config._backupURL;
    } else {
      player.src = player.config._mainURL;
    }
    player.switchURL = null;
    player._replay = null;
  };

  var m4aplayer = function m4aplayer() {
    var player = this;var sniffer = _xgplayer2.default.sniffer;var util = _xgplayer2.default.util;
    var Errors = _xgplayer2.default.Errors;var mainURL = void 0;var backupURL = void 0;
    var preloadTime = player.config.preloadTime || 15;
    _xgplayer2.default.m4a = true;
    player.hasEnded = false;
    var list = util.typeOf(player.config.url) === 'Array' ? player.config.url : [{
      src: player.config.url,
      name: player.config.name,
      vid: player.config.vid,
      poster: player.config.poster
    }];
    var url = list[0].src;
    var name = list[0].name;
    var vid = list[0].vid;
    var poster = list[0].poster;
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
      backupURL = url[1].src;
    }
    player.config._mainURL = mainURL;
    player.config._backupURL = backupURL;
    var loadData = function loadData() {
      var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : player.currentTime;
      var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var nextOrder = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      if (player.timer) {
        clearTimeout(player.timer);
      }
      time = Math.max(time, player.currentTime);
      player.timer = setTimeout(function () {
        player.mp4.seek(time, order, nextOrder).then(function (buffer) {
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
      var replaying = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var mp4 = new _mp2.default(url);
      mp4.reqTimeLength = player.config.reqTimeLength || 5;
      var mse = void 0;
      return new Promise(function (resolve, reject) {
        mp4.once('mdatReady', function () {
          mse = new _mse2.default();
          if (replaying) {
            mse.replaying = true;
          }
          mse.on('sourceopen', function () {
            mse.appendBuffer(mp4.packMeta(mp4.meta));
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
    }) && _mse2.default.isSupported('audio/mp4; codecs="mp4a.40.5"')) {
      var _start = player.start;
      if (!rule.call(player)) {
        return false;
      }
      player.cut = function () {
        var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var end = arguments[1];

        var segment = new _buffer2.default();
        return new Promise(function (resolve, reject) {
          var mp4 = new _mp2.default(url);
          mp4.once('mdatReady', function () {
            if (!end || end <= start) {
              end = start + 15;
            }
            if (end > mp4.meta.audioDuration) {
              start = mp4.meta.audioDuration - (end - start);
              end = mp4.meta.audioDuration;
            }
            mp4.reqTimeLength = end - start;
            mp4.cut = true;
            mp4.seek(start).then(function (buffer) {
              if (buffer) {
                var meta = _xgplayer2.default.util.deepCopy({
                  duration: mp4.reqTimeLength,
                  audioDuration: mp4.reqTimeLength,
                  endTime: mp4.reqTimeLength
                }, mp4.meta);
                meta.duration = mp4.reqTimeLength;
                meta.audioDuration = mp4.reqTimeLength;
                meta.endTime = mp4.reqTimeLength;
                segment.write(mp4.packMeta(meta), buffer);
                resolve(new Blob([segment.buffer], { type: 'audio/mp4; codecs="mp4a.40.5"' }));
              }
            });
          });
          mp4.on('error', function (e) {
            reject(e);
          });
        });
      };
      if (player.config.segPlay) {
        var sp = player.config.segPlay;
        player.cut(sp.start, sp.end).then(function (blob) {
          if (blob) {
            player.config.url = URL.createObjectURL(blob);
            player.start(player.config.url);
          }
        }, function () {
          console.log('error');
        });
        return;
      }
      Object.defineProperty(player, 'src', {
        get: function get() {
          return player.currentSrc;
        },
        set: function set(url) {
          player.config.url = url;
          if (!player.paused) {
            player.pause();
            player.once('pause', function () {
              player.start(url);
            });
            player.once('canplay', function () {
              player.play();
            });
          } else {
            player.start(url);
          }
          player.once('canplay', function () {
            player.currentTime = 0;
          });
        },

        configurable: true
      });
      player.start = function () {
        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : mainURL;

        init(url).then(function (result) {
          var mp4 = result[0];var mse = result[1];
          _start.call(player, mse.url);
          player.mp4 = mp4;
          player.mse = mse;
          mp4.on('error', function (err) {
            errorHandle(player, err);
          });
        }, function (err) {
          _start.call(player, url);
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

      player.switchURL = function (url) {
        var mp5 = new _mp2.default(url);
        var mp4 = player.mp4;
        mp5.on('mdatReady', function () {
          var timeRange = mp4.timeRage;var curTime = player.currentTime;
          timeRange = mp4.timeRage;
          var start = timeRange.find(function (item) {
            return item[0] - curTime > 2;
          })[0];
          var end = player.getBufferedRange()[1];
          if (end - start > 0 && sniffer.browser !== 'safari') {
            player.mse.removeBuffer(start, end);
          }
          player.mp4 = mp5;
          player.mse.appendBuffer(mp5.packMeta(mp5.meta));
        });
        mp5.on('error', function (err) {
          errorHandle(player, err);
        });
      };
      player.on('timeupdate', function () {
        var mse = player.mse;var mp4 = player.mp4;
        if (mse && !mse.updating && mp4.canDownload) {
          var timeRage = mp4.timeRage;
          var range = player.getBufferedRange();var cacheMaxTime = player.currentTime + preloadTime;
          if (range[1] - cacheMaxTime > 0) {
            return;
          }
          timeRage.every(function (item, idx) {
            if (range[1] === 0) {
              loadData(5);
              return false;
            } else {
              if (item[0].time >= range[1] && !mp4.bufferCache.has(idx)) {
                loadData(0, item[0].time, item[0].order, item[1].order);
              } else {
                return true;
              }
            }
          });
          isEnded(player, mp4); // hack for older webkit
        }
      });

      player.on('seeking', function () {
        var buffered = player.buffered;var hasBuffered = false;var curTime = player.currentTime;
        _task2.default.clear();
        var timeRage = player.mp4.timeRage;
        if (buffered.length) {
          for (var i = 0, len = buffered.length; i < len; i++) {
            if (curTime >= buffered.start(i) && curTime <= buffered.end(i)) {
              hasBuffered = true;
              break;
            }
          }
          if (!hasBuffered) {
            timeRage.every(function (item, idx) {
              if (item[0].time <= curTime && item[1].time > curTime) {
                loadData(0, item[0].time, item[0].order, item[1].order);
                return false;
              } else {
                return true;
              }
            });
          }
        } else {
          timeRage.every(function (item, idx) {
            if (item[0].time <= curTime && item[1].time > curTime) {
              loadData(0, item[0].time, item[0].order, item[1].order);
              return false;
            } else {
              return true;
            }
          });
        }
      });

      player.on('pause', function () {
        _task2.default.clear();
      });

      player.on('playing', function () {
      });

      player.on('waiting', function () {
        var buffered = player.buffered;var hasBuffered = false;var curTime = player.currentTime;
        _task2.default.clear();
        var timeRage = player.mp4.timeRage;
        if (buffered.length) {
          for (var i = 0, len = buffered.length; i < len; i++) {
            if (curTime >= buffered.start(i) && curTime <= buffered.end(i)) {
              hasBuffered = true;
              break;
            }
          }
          if (!hasBuffered) {
            timeRage.every(function (item, idx) {
              if (item[0].time <= curTime && item[1].time > curTime) {
                loadData(0, item[0].time, item[0].order, item[1].order);
                return false;
              } else {
                return true;
              }
            });
          }
        } else {
          timeRage.every(function (item, idx) {
            if (item[0].time <= curTime && item[1].time > curTime) {
              loadData(0, item[0].time, item[0].order, item[1].order);
              return false;
            } else {
              return true;
            }
          });
        }
      });

      player.once('destroy', function () {
        _task2.default.clear();
        if (player.timer) {
          clearTimeout(player.timer);
        }
      });

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

      player.on('change', function (nextItem) {
        player.newMusic(nextItem.src);
        name = '' + nextItem.name;
        vid = '' + nextItem.vid;
        poster = '' + nextItem.poster;
      });

      player.newMusic = function (url) {
        _task2.default.clear();
        player.mp4.bufferCache.clear();
        init(url, true).then(function (result) {
          var mp4 = result[0];var mse = result[1];
          player.src = mse.url;
          player.mp4 = mp4;
          player.mse = mse;
          player.mse.replaying = true;
          player.currentTime = 0;
          setTimeout(function () {
            player.video.play();
          }, 60);
        }, function (err) {
          errorHandle(player, err);
        });
      };

      player.on('ended', function () {
        player.hasEnded = true;
        if (player.config.offline) {
          var mdatCache = new _buffer2.default();
          mdatCache.write(_mp4.default.size(player.mp4.mdatBox.size), _mp4.default.type('mdat'));
          player.mp4.mdatCache.sort(function (a, b) {
            return a.start - b.start;
          });
          var end = player.mp4.mdatCache[0].start - 1;
          player.mp4.mdatCache.forEach(function (item, index) {
            if (item.start === end + 1) {
              mdatCache.write(item.buffer);
              end = item.end;
            }
          });
          if (end !== player.mp4.mdatCache[player.mp4.mdatCache.length - 1].end) {
            return;
          }
          var m4aCache = new _buffer2.default();
          if (player.mp4.freeBuffer) {
            m4aCache.write(new Uint8Array(player.mp4.ftypBuffer), new Uint8Array(player.mp4.moovBuffer), new Uint8Array(player.mp4.freeBuffer), mdatCache.buffer);
          } else {
            m4aCache.write(new Uint8Array(player.mp4.ftypBuffer), new Uint8Array(player.mp4.moovBuffer), mdatCache.buffer);
          }
          var offlineVid = vid || name;
          player.database.openDB(function () {
            player.database.addData(player.database.myDB.ojstore.name, [{ vid: offlineVid, blob: new Blob([m4aCache.buffer], { type: 'audio/mp4; codecs="mp4a.40.5"' }) }]);
            setTimeout(function () {
              player.database.closeDB();
            }, 5000);
          });
        }
      });
    }
  };

  _xgplayer2.default.install('m4aplayer', m4aplayer);

})));
//# sourceMappingURL=index.js.map
