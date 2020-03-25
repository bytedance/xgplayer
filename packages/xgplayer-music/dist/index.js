(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('xgplayer')) :
  typeof define === 'function' && define.amd ? define(['xgplayer'], factory) :
  (global = global || self, global.Music = factory(global.Player));
}(this, (function (Player) { 'use strict';

  Player = Player && Object.prototype.hasOwnProperty.call(Player, 'default') ? Player['default'] : Player;

  function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') {
      return;
    }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = "@charset \"UTF-8\";\n.xgplayer-skin-default.xgplayer-music .xgplayer-controls {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  height: 50px;\n  cursor: default; }\n  .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-backward, .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-backward-img {\n    -webkit-box-ordinal-group: 1;\n        -ms-flex-order: 0;\n            order: 0;\n    cursor: pointer; }\n    .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-backward:hover, .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-backward-img:hover {\n      opacity: 0.85; }\n  .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-prev, .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-prev-img {\n    -webkit-box-ordinal-group: 2;\n        -ms-flex-order: 1;\n            order: 1;\n    cursor: pointer; }\n    .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-prev:hover, .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-prev-img:hover {\n      opacity: 0.85; }\n  .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-play, .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-play-img {\n    -webkit-box-ordinal-group: 3;\n        -ms-flex-order: 2;\n            order: 2; }\n    .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-play .xgplayer-tips, .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-play-img .xgplayer-tips {\n      display: none; }\n  .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-next, .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-next-img {\n    -webkit-box-ordinal-group: 4;\n        -ms-flex-order: 3;\n            order: 3;\n    cursor: pointer; }\n    .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-next:hover, .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-next-img:hover {\n      opacity: 0.85; }\n  .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-forward, .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-forward-img {\n    -webkit-box-ordinal-group: 5;\n        -ms-flex-order: 4;\n            order: 4;\n    cursor: pointer; }\n    .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-forward:hover, .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-forward-img:hover {\n      opacity: 0.85; }\n  .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-volume {\n    -webkit-box-ordinal-group: 6;\n        -ms-flex-order: 5;\n            order: 5;\n    cursor: pointer; }\n    .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-volume .xgplayer-icon {\n      bottom: -13px; }\n  .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-cover {\n    position: static;\n    -webkit-box-ordinal-group: 7;\n        -ms-flex-order: 6;\n            order: 6;\n    width: 40px;\n    height: 40px;\n    text-align: center;\n    vertical-align: middle;\n    position: relative;\n    top: 50%;\n    margin-top: -17px; }\n    .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-cover img {\n      max-width: 100%;\n      max-height: 100%; }\n  .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-progress {\n    position: relative;\n    -webkit-box-ordinal-group: 8;\n        -ms-flex-order: 7;\n            order: 7;\n    top: 70%;\n    left: 20px;\n    margin-top: -11px;\n    -webkit-box-flex: 99;\n        -ms-flex: 99;\n            flex: 99; }\n    .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-progress .xgplayer-name {\n      position: absolute;\n      left: 0px;\n      top: -120%;\n      font-size: 12px;\n      color: #ddd; }\n    .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-progress > * {\n      height: 3px;\n      margin-top: 8.5px; }\n    .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-progress .xgplayer-progress-played:after {\n      top: -4px;\n      width: 10px;\n      height: 10px;\n      content: \" \";\n      display: block; }\n    .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-progress .xgplayer-tips {\n      display: none !important; }\n    .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-progress:hover .xgplayer-progress-btn, .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-progress:focus .xgplayer-progress-btn {\n      top: -5px; }\n  .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-time {\n    -webkit-box-ordinal-group: 9;\n        -ms-flex-order: 8;\n            order: 8;\n    margin-left: 30px;\n    line-height: 1;\n    position: relative;\n    top: 55%; }\n  .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-placeholder {\n    -webkit-box-ordinal-group: 1000;\n        -ms-flex-order: 999;\n            order: 999;\n    width: 0; }\n  .xgplayer-skin-default.xgplayer-music .xgplayer-controls .xgplayer-icon {\n    padding-top: 5px; }\n\n.xgplayer-skin-default.xgplayer-music.xgplayer-ended .xgplayer-controls {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\n.xgplayer-skin-default.xgplayer-music.xgplayer-nostart .xgplayer-controls {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\n.xgplayer-skin-default .xgplayer-lyric-item {\n  display: block;\n  line-height: 22px;\n  font-size: 14px;\n  color: black; }\n  .xgplayer-skin-default .xgplayer-lyric-item.xgplayer-lyric-item-active {\n    color: aquamarine; }\n\n.xgplayer-skin-default .xgplayer-lrcWrap {\n  overflow: auto;\n  height: 300px;\n  border: 1px solid #ddd;\n  padding: 20px; }\n\n.xgplayer-skin-default .xgplayer-lrcForward {\n  position: absolute;\n  top: 20%;\n  left: 300px;\n  cursor: pointer;\n  width: 0;\n  height: 0;\n  border-width: 0 10px 10px;\n  border-style: solid;\n  border-color: transparent transparent #333;\n  /*透明 透明  灰*/ }\n\n.xgplayer-skin-default .xgplayer-lrcBack {\n  position: absolute;\n  top: 80%;\n  left: 300px;\n  cursor: pointer;\n  width: 0;\n  height: 0;\n  border-width: 10px 10px 0;\n  border-style: solid;\n  border-color: #333 transparent transparent;\n  /*透明 透明  灰*/ }\n";
  styleInject(css_248z);

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var LyricTime = function LyricTime(timeTxt) {
    classCallCheck(this, LyricTime);

    this.regRule = /(\d{2}(?=:)):(\d{2}(?=\.))\.(\d{2,3})/g;
    if (this.regRule.test(timeTxt)) {
      this.time = RegExp.$1 * 60 + RegExp.$2 * 1 + ('0.' + RegExp.$3) * 1;
    } else {
      this.time = -1;
    }
  };

  var Lyric = function () {
    function Lyric(txts, dom) {
      var _this = this;

      classCallCheck(this, Lyric);

      this.rawTxts = txts;
      this.txts = txts.map(function (item) {
        return item.replace(/^[\r\n]|[\r\n]$/g, '').match(/(\[.*\])[^[]+/g);
      });
      this.isDynamics = txts.map(function (item, idx) {
        return [].concat(item.match(/\[\d{2}:\d{2}\.\d{2,3}\]/g)).length === _this.txts[idx].length && _this.txts[idx].length === _this.txts[0].length && _this.txts[idx].length > 1;
      });
      this.isDynamic = this.isDynamics.some(function (item) {
        return item;
      });
      this.__ainimateInterval__ = 0;
      this.__offset__ = 0;
      this.__offsetScale__ = 0.5;
      this.dom = dom;
      this.lists = [];
      this.isDynamics.map(function (item, idx) {
        if (item) {
          _this.lists.push(_this.txts[idx].map(function (txt, index) {
            var reg = /(\[[\d:\S]+\])([^[]+)/g.test(txt);
            var time = RegExp.$1;
            var lyric = RegExp.$2;
            return {
              time: reg ? new LyricTime(time).time : -1,
              lyric: lyric,
              idx: index
            };
          }));
        }
      });
      this.list = this.lists.reduce(function (pre, cur) {
        return pre.map(function (item, idx) {
          return {
            time: item.time,
            lyric: item.lyric === '\n' ? '' + item.lyric + cur[idx].lyric : item.lyric + '<br/>' + cur[idx].lyric,
            idx: idx
          };
        });
      });
      this.line = 0;
    }

    createClass(Lyric, [{
      key: 'adjust',
      value: function adjust() {
        var list = this.list;
        for (var i = 0, j, k, len = list.length; i < len; i++) {
          for (j = i + 1; j < len; j++) {
            if (list[j].time > list[i].time) {
              break;
            }
          }
          if (j < len) {
            var sep = (list[j].time - list[i].time) / (j - i);
            for (k = i + 1; k < j; k++) {
              list[k].time = list[k - 1].time + sep;
            }
          }
        }
      }
    }, {
      key: 'find',
      value: function find(curTime) {
        var list = this.list;
        var interval = this.__ainimateInterval__;
        var offset = this.__offset__;
        curTime = curTime + offset > 0 ? curTime + offset : 0;
        return list.filter(function (_ref, idx) {
          var time = _ref.time;

          var idxy = idx + 1;
          return curTime >= time && (list[idxy] && curTime * 1 + interval * 1 <= list[idxy].time || idxy >= list.length);
        });
      }
    }, {
      key: 'bind',
      value: function bind(player) {
        var _this2 = this;

        var self = this;
        this.__player__ = player;
        if (self.isDynamic) {
          self.__handle__ = function () {
            var f = _this2.find(player.currentTime)[0];
            if (f && f.idx !== _this2.line) {
              _this2.line = f.idx;
              player.emit('lyricUpdate', f);
            }
          }.bind(self, player);
          player.on('timeupdate', self.__handle__);

          self.__startHandle__ = function () {
            player.emit('lyricUpdate', self.list[0]);
          }.bind(self, player);
          player.once('playing', self.__startHandle__);
          //
          // self.__endHandle__ = (() => {
          //   player.emit('lyricUpdate', self.list[self.list.length - 1])
          // }).bind(self, player)
          // player.on('ended', self.__endHandle__)
          return true;
        } else {
          return false;
        }
      }
    }, {
      key: 'unbind',
      value: function unbind(player) {
        delete this.__player__;
        if (this.__handle__) {
          player.off('lyricUpdate', this.__handle__);
          delete this.__handle__;
        }
      }
    }, {
      key: 'show',
      value: function show() {
        var _this3 = this;

        var dom = this.dom;
        var lyrbicTxts = [];
        var self = this;
        var ev = ['click', 'touchstart'];
        if (dom && dom.nodeType === 1) {
          var lrcWrap = Player.util.createDom('div', '<div></div>', {}, 'xgplayer-lrcWrap');
          dom.appendChild(lrcWrap);
          this.list.forEach(function (item) {
            lyrbicTxts.push('<xg-lyric-item class="xgplayer-lyric-item" data-idx="' + item.idx + '">' + item.lyric.replace(/[\r\n]/g, '') + '</xg-lyric-item>');
          });
          lrcWrap.innerHTML = lyrbicTxts.join('');
          var lrcForward = Player.util.createDom('xg-lrcForward', '<div></div>', {}, 'xgplayer-lrcForward');
          dom.appendChild(lrcForward);
          ev.forEach(function (item) {
            lrcForward.addEventListener(item, function (e) {
              e.preventDefault();
              e.stopPropagation();
              self.offset -= self.offsetScale;
              console.log('lyric go forward ' + self.offsetScale + 's');
            }, false);
          });

          var lrcBack = Player.util.createDom('xg-lrcBack', '<div></div>', {}, 'xgplayer-lrcBack');
          dom.appendChild(lrcBack);
          ev.forEach(function (item) {
            lrcBack.addEventListener(item, function (e) {
              e.preventDefault();
              e.stopPropagation();
              self.offset += self.offsetScale;
              console.log('lyric go back ' + self.offsetScale + 's');
            }, false);
          });
          this.__updateHandle__ = function (item) {
            var domWrap = _this3.dom.querySelector('.xgplayer-lrcWrap');
            var activeDom = domWrap.querySelector('.xgplayer-lyric-item-active');
            var offsetHeight = domWrap.offsetHeight;
            var activeTop = void 0;
            if (activeDom) {
              activeDom.className = 'xgplayer-lyric-item';
            }
            activeDom = domWrap.querySelector('.xgplayer-lyric-item[data-idx="' + item.idx + '"]');
            if (activeDom) {
              activeDom.className = 'xgplayer-lyric-item xgplayer-lyric-item-active';
              activeTop = activeDom.getBoundingClientRect().top - domWrap.getBoundingClientRect().top + domWrap.scrollTop - offsetHeight / 2;
              if (activeTop) {
                domWrap.scrollTop = activeTop;
              }
            }
          };
          this.__player__.on('lyricUpdate', this.__updateHandle__);
        } else {
          this.__player__.emit('error', 'lyric container can not be empty');
        }
      }
    }, {
      key: 'hide',
      value: function hide() {
        this.__updateHandle__.off('lyricUpdate', this.__updateHandle__);
      }
    }, {
      key: 'interval',
      set: function set(val) {
        this.__ainimateInterval__ = val;
      },
      get: function get() {
        return this.__ainimateInterval__;
      }
    }, {
      key: 'offset',
      set: function set(val) {
        this.__offset__ = val;
      },
      get: function get() {
        return this.__offset__;
      }
    }, {
      key: 'offsetScale',
      set: function set(val) {
        this.__offsetScale__ = val;
      },
      get: function get() {
        return this.__offsetScale__;
      }
    }]);
    return Lyric;
  }();

  // @filename https://gist.github.com/chaping/88813f56e75b0fd43f8c
  var lastTime = 0;
  var prefixes = 'webkit moz ms o'.split(' '); // 各浏览器前缀

  var requestAnimationFrame = window.requestAnimationFrame;
  var cancelAnimationFrame = window.cancelAnimationFrame;

  var prefix;
  // 通过遍历各浏览器前缀，来得到requestAnimationFrame和cancelAnimationFrame在当前浏览器的实现形式
  for (var i = 0; i < prefixes.length; i++) {
    if (requestAnimationFrame && cancelAnimationFrame) {
      break;
    }
    prefix = prefixes[i];
    requestAnimationFrame = requestAnimationFrame || window[prefix + 'RequestAnimationFrame'];
    cancelAnimationFrame = cancelAnimationFrame || window[prefix + 'CancelAnimationFrame'] || window[prefix + 'CancelRequestAnimationFrame'];
  }

  // 如果当前浏览器不支持requestAnimationFrame和cancelAnimationFrame，则会退到setTimeout
  if (!requestAnimationFrame || !cancelAnimationFrame) {
    requestAnimationFrame = function requestAnimationFrame(callback, element) {
      var currTime = new Date().getTime();
      // 为了使setTimteout的尽可能的接近每秒60帧的效果
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback.call(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

    cancelAnimationFrame = function cancelAnimationFrame(id) {
      window.clearTimeout(id);
    };
  }

  var isSqrt = function isSqrt(num, base) {
    if (num !== 1) {
      while (num !== 1) {
        if (num % base === 0) {
          num = num / base;
        } else {
          return false;
        }
      }
      return true;
    } else {
      return true;
    }
  };

  var Color = function () {
    function Color(color) {
      var opacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      classCallCheck(this, Color);

      this.color = Color.Valid.test(color) ? color : '#ffffff';
      this.opacity = opacity;
    }

    createClass(Color, [{
      key: 'toArray',
      value: function toArray() {
        var color = this.color.slice(1);
        var rgb = [];
        if (color.length === 6) {
          color = color.match(/\d{2}/g);
          rgb = color.map(function (item) {
            return Number('0x' + item);
          });
        }
        return rgb;
      }
    }, {
      key: 'toRGB',
      value: function toRGB() {
        var rgb = this.toArray();
        return rgb.length === 3 ? 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')' : '';
      }
    }, {
      key: 'toGRBA',
      value: function toGRBA() {
        var rgb = this.toArray();
        return rgb.length === 3 ? 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + this.opacity + ')' : '';
      }
    }], [{
      key: 'Valid',
      get: function get() {
        return (/^#[0-9A-F]{6}$|^#[0-9A-F]{3}$/i
        );
      }
    }]);
    return Color;
  }();

  var util = {
    requestAnimationFrame: requestAnimationFrame,
    cancelAnimationFrame: cancelAnimationFrame,
    isSqrt: isSqrt,
    Color: Color
  };

  var req = util.requestAnimationFrame,
      cancel = util.cancelAnimationFrame,
      isSqrt$1 = util.isSqrt,
      Color$1 = util.Color;

  var Analyze = function () {
    function Analyze(player, canvas) {
      var _this = this;

      classCallCheck(this, Analyze);

      this.canvas = canvas;
      this.player = player;
      if (!Analyze.AudioCtx) {
        return;
      }
      var audioCtx = new Analyze.AudioCtx();
      var analyser = audioCtx.createAnalyser();
      var gainNode = audioCtx.createGain();
      analyser.minDecibels = -90;
      analyser.maxDecibels = -10;
      analyser.smoothingTimeConstant = 0.85;
      gainNode.gain.setValueAtTime(player.volume, player.currentTime);
      this.er = audioCtx.createMediaElementSource(player.video);
      this.analyser = analyser;
      this.ctx = canvas.getContext('2d');
      this.er.connect(analyser);
      analyser.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      this.style = {
        bgColor: '#c8c8c8',
        color: '#643232'
      };
      this.__type__ = 'bars';
      this.__size__ = 256;
      this.__status__ = {
        switch: 'on'
      };
      ['play', 'playing', 'seeked'].forEach(function (name) {
        player.on(name, function () {
          _this['__' + _this.__type__ + '__']();
        });
      });
      ['seeking', 'waiting', 'pause', 'ended'].forEach(function (name) {
        cancel(_this.__status__[_this.__type__]);
      });
      player.on('volumechange', function () {
        gainNode.gain.setValueAtTime(player.volume, player.currentTime);
      });
      player.on('destroy', function () {
        audioCtx.close();
      });
    }

    createClass(Analyze, [{
      key: '__wave__',
      value: function __wave__() {
        var _this2 = this;

        cancel(this.__status__['wave']);
        cancel(this.__status__['bars']);
        if (this.__status__.switch === 'off') {
          return;
        }
        var analyser = this.analyser;
        var canvas = this.canvas;
        var ctx = this.ctx;
        var bufferLen = analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLen);
        var WIDTH = canvas.width;
        var HEIGHT = canvas.height;
        var color = new Color$1(this.style.color).toRGB();
        var bgColor = new Color$1(this.style.color).toRGB();
        analyser.fftSize = this.__size__;
        var draw = function draw() {
          _this2.__status__['wave'] = req(draw);
          analyser.getByteTimeDomainData(dataArray);
          ctx.clearRect(0, 0, WIDTH, HEIGHT);
          ctx.fillStyle = bgColor;
          ctx.lineWidth = 2;
          ctx.strokeStyle = color;
          ctx.beginPath();
          var sliceWidth = WIDTH * 1.0 / bufferLen;
          var x = 0;
          for (var i = 0; i < bufferLen; i++) {
            var v = dataArray[i] / 128.0;
            var y = v * HEIGHT / 2;
            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
            x += sliceWidth;
          }
          ctx.lineTo(canvas.width, canvas.height / 2);
          ctx.stroke();
        };
        draw();
      }
    }, {
      key: '__bars__',
      value: function __bars__() {
        var _this3 = this;

        cancel(this.__status__['wave']);
        cancel(this.__status__['bars']);
        if (this.__status__.switch === 'off') {
          return;
        }
        var analyser = this.analyser;
        var canvas = this.canvas;
        var ctx = this.ctx;
        var bufferLen = analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLen);
        var WIDTH = canvas.width;
        var HEIGHT = canvas.height;
        var color = new Color$1(this.style.color).toArray();
        var bgColor = new Color$1(this.style.color).toRGB();
        analyser.fftSize = this.__size__;

        var draw = function draw() {
          _this3.__status__['bars'] = req(draw);
          analyser.getByteFrequencyData(dataArray);
          ctx.clearRect(0, 0, WIDTH, HEIGHT);
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, WIDTH, HEIGHT);
          var barWidth = WIDTH / bufferLen * 2.5;
          var barHeight = void 0;
          var x = 0;
          for (var i = 0; i < bufferLen; i++) {
            barHeight = dataArray[i];
            ctx.fillStyle = 'rgb(' + (barHeight + color[0]) + ',' + color[1] + ',' + color[2] + ')';
            ctx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);
            x += barWidth + 1;
          }
        };
        draw();
      }
    }, {
      key: 'on',
      value: function on() {
        this.__status__.switch = 'on';
        this['__' + this.__type__ + '__']();
      }
    }, {
      key: 'off',
      value: function off() {
        this.__status__.switch = 'off';
        cancel(this.__status__['wave']);
        cancel(this.__status__['bars']);
      }
    }, {
      key: 'mode',
      set: function set(mode) {
        if (Analyze.Mode.filter(function (item) {
          return item === mode;
        }).length) {
          this.__type__ = mode;
          if (this.__status__.switch === 'on') {
            this['__' + mode + '__']();
          }
        }
      },
      get: function get() {
        return this.__type__;
      }
    }, {
      key: 'size',
      set: function set(num) {
        if (num < 65536 && isSqrt$1(num, 2)) {
          this.__size__ = num;
          this.analyser.fftSize = num;
          this['__' + this.__type__ + '__']();
        }
      },
      get: function get() {
        return this.__size__;
      }
    }, {
      key: 'status',
      get: function get() {
        return this.__status__.switch;
      }
    }], [{
      key: 'AudioCtx',
      get: function get() {
        return window.AudioContext || window.webkitAudioContext;
      }
    }, {
      key: 'Mode',
      get: function get() {
        return ['wave', 'bars'];
      }
    }]);
    return Analyze;
  }();

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  // ES3 safe

  var _undefined = void 0;

  var is = function (value) {
    return value !== _undefined && value !== null;
  };

  // prettier-ignore
  var possibleTypes = { "object": true, "function": true, "undefined": true /* document.all */ };

  var is$1 = function (value) {
  	if (!is(value)) return false;
  	return hasOwnProperty.call(possibleTypes, typeof value);
  };

  var is$2 = function (value) {
  	if (!is$1(value)) return false;
  	try {
  		if (!value.constructor) return false;
  		return value.constructor.prototype === value;
  	} catch (error) {
  		return false;
  	}
  };

  var is$3 = function (value) {
  	if (typeof value !== "function") return false;

  	if (!hasOwnProperty.call(value, "length")) return false;

  	try {
  		if (typeof value.length !== "number") return false;
  		if (typeof value.call !== "function") return false;
  		if (typeof value.apply !== "function") return false;
  	} catch (error) {
  		return false;
  	}

  	return !is$2(value);
  };

  var classRe = /^\s*class[\s{/}]/,
      functionToString = Function.prototype.toString;

  var is$4 = function (value) {
  	if (!is$3(value)) return false;
  	if (classRe.test(functionToString.call(value))) return false;
  	return true;
  };

  var isImplemented = function () {
  	var assign = Object.assign,
  	    obj;
  	if (typeof assign !== "function") return false;
  	obj = { foo: "raz" };
  	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
  	return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
  };

  var isImplemented$1 = function () {
  	try {
  		Object.keys("primitive");
  		return true;
  	} catch (e) {
  		return false;
  	}
  };

  // eslint-disable-next-line no-empty-function

  var noop = function () {};

  var _undefined$1 = noop(); // Support ES3 engines

  var isValue = function (val) {
    return val !== _undefined$1 && val !== null;
  };

  var keys = Object.keys;

  var shim = function (object) {
    return keys(isValue(object) ? Object(object) : object);
  };

  var keys$1 = isImplemented$1() ? Object.keys : shim;

  var validValue = function (value) {
  	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
  	return value;
  };

  var max = Math.max;

  var shim$1 = function (dest, src /*, …srcn*/) {
  	var error,
  	    i,
  	    length = max(arguments.length, 2),
  	    assign;
  	dest = Object(validValue(dest));
  	assign = function (key) {
  		try {
  			dest[key] = src[key];
  		} catch (e) {
  			if (!error) error = e;
  		}
  	};
  	for (i = 1; i < length; ++i) {
  		src = arguments[i];
  		keys$1(src).forEach(assign);
  	}
  	if (error !== undefined) throw error;
  	return dest;
  };

  var assign = isImplemented() ? Object.assign : shim$1;

  var forEach = Array.prototype.forEach,
      create = Object.create;

  var process = function (src, obj) {
  	var key;
  	for (key in src) obj[key] = src[key];
  };

  // eslint-disable-next-line no-unused-vars
  var normalizeOptions = function (opts1 /*, …options*/) {
  	var result = create(null);
  	forEach.call(arguments, function (options) {
  		if (!isValue(options)) return;
  		process(Object(options), result);
  	});
  	return result;
  };

  var str = "razdwatrzy";

  var isImplemented$2 = function () {
  	if (typeof str.contains !== "function") return false;
  	return str.contains("dwa") === true && str.contains("foo") === false;
  };

  var indexOf = String.prototype.indexOf;

  var shim$2 = function (searchString /*, position*/) {
  	return indexOf.call(this, searchString, arguments[1]) > -1;
  };

  var contains = isImplemented$2() ? String.prototype.contains : shim$2;

  var d_1 = createCommonjsModule(function (module) {



  var d = module.exports = function (dscr, value /*, options*/) {
  	var c, e, w, options, desc;
  	if (arguments.length < 2 || typeof dscr !== "string") {
  		options = value;
  		value = dscr;
  		dscr = null;
  	} else {
  		options = arguments[2];
  	}
  	if (is(dscr)) {
  		c = contains.call(dscr, "c");
  		e = contains.call(dscr, "e");
  		w = contains.call(dscr, "w");
  	} else {
  		c = w = true;
  		e = false;
  	}

  	desc = { value: value, configurable: c, enumerable: e, writable: w };
  	return !options ? desc : assign(normalizeOptions(options), desc);
  };

  d.gs = function (dscr, get, set /*, options*/) {
  	var c, e, options, desc;
  	if (typeof dscr !== "string") {
  		options = set;
  		set = get;
  		get = dscr;
  		dscr = null;
  	} else {
  		options = arguments[3];
  	}
  	if (!is(get)) {
  		get = undefined;
  	} else if (!is$4(get)) {
  		options = get;
  		get = set = undefined;
  	} else if (!is(set)) {
  		set = undefined;
  	} else if (!is$4(set)) {
  		options = set;
  		set = undefined;
  	}
  	if (is(dscr)) {
  		c = contains.call(dscr, "c");
  		e = contains.call(dscr, "e");
  	} else {
  		c = true;
  		e = false;
  	}

  	desc = { get: get, set: set, configurable: c, enumerable: e };
  	return !options ? desc : assign(normalizeOptions(options), desc);
  };
  });

  var validCallable = function (fn) {
  	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
  	return fn;
  };

  var eventEmitter = createCommonjsModule(function (module, exports) {

  var apply = Function.prototype.apply,
      call = Function.prototype.call,
      create = Object.create,
      defineProperty = Object.defineProperty,
      defineProperties = Object.defineProperties,
      hasOwnProperty = Object.prototype.hasOwnProperty,
      descriptor = { configurable: true, enumerable: false, writable: true },
      on,
      once,
      off,
      emit,
      methods,
      descriptors,
      base;

  on = function (type, listener) {
  	var data;

  	validCallable(listener);

  	if (!hasOwnProperty.call(this, '__ee__')) {
  		data = descriptor.value = create(null);
  		defineProperty(this, '__ee__', descriptor);
  		descriptor.value = null;
  	} else {
  		data = this.__ee__;
  	}
  	if (!data[type]) data[type] = listener;else if (typeof data[type] === 'object') data[type].push(listener);else data[type] = [data[type], listener];

  	return this;
  };

  once = function (type, listener) {
  	var once, self;

  	validCallable(listener);
  	self = this;
  	on.call(this, type, once = function () {
  		off.call(self, type, once);
  		apply.call(listener, this, arguments);
  	});

  	once.__eeOnceListener__ = listener;
  	return this;
  };

  off = function (type, listener) {
  	var data, listeners, candidate, i;

  	validCallable(listener);

  	if (!hasOwnProperty.call(this, '__ee__')) return this;
  	data = this.__ee__;
  	if (!data[type]) return this;
  	listeners = data[type];

  	if (typeof listeners === 'object') {
  		for (i = 0; candidate = listeners[i]; ++i) {
  			if (candidate === listener || candidate.__eeOnceListener__ === listener) {
  				if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];else listeners.splice(i, 1);
  			}
  		}
  	} else {
  		if (listeners === listener || listeners.__eeOnceListener__ === listener) {
  			delete data[type];
  		}
  	}

  	return this;
  };

  emit = function (type) {
  	var i, l, listener, listeners, args;

  	if (!hasOwnProperty.call(this, '__ee__')) return;
  	listeners = this.__ee__[type];
  	if (!listeners) return;

  	if (typeof listeners === 'object') {
  		l = arguments.length;
  		args = new Array(l - 1);
  		for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

  		listeners = listeners.slice();
  		for (i = 0; listener = listeners[i]; ++i) {
  			apply.call(listener, this, args);
  		}
  	} else {
  		switch (arguments.length) {
  			case 1:
  				call.call(listeners, this);
  				break;
  			case 2:
  				call.call(listeners, this, arguments[1]);
  				break;
  			case 3:
  				call.call(listeners, this, arguments[1], arguments[2]);
  				break;
  			default:
  				l = arguments.length;
  				args = new Array(l - 1);
  				for (i = 1; i < l; ++i) {
  					args[i - 1] = arguments[i];
  				}
  				apply.call(listeners, this, args);
  		}
  	}
  };

  methods = {
  	on: on,
  	once: once,
  	off: off,
  	emit: emit
  };

  descriptors = {
  	on: d_1(on),
  	once: d_1(once),
  	off: d_1(off),
  	emit: d_1(emit)
  };

  base = defineProperties({}, descriptors);

  module.exports = exports = function (o) {
  	return o == null ? create(base) : defineProperties(Object(o), descriptors);
  };
  exports.methods = methods;
  });
  var eventEmitter_1 = eventEmitter.methods;

  var Xhr = function () {
    function Xhr(url, callback) {
      classCallCheck(this, Xhr);

      eventEmitter(this);
      this.url = url;
      var xhr = new window.XMLHttpRequest();
      xhr.target = this;
      xhr.responseType = 'arraybuffer';
      xhr.open('get', url);
      xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 206) {
          if (callback && callback instanceof Function) {
            callback(xhr.response);
          }
        }
      };
      xhr.onerror = function (e) {
        xhr.target.emit('error' + e.message);
      };
      this.xhr = xhr;
      this.run();
    }

    createClass(Xhr, [{
      key: 'cancel',
      value: function cancel() {
        this.xhr.abort();
      }
    }, {
      key: 'run',
      value: function run() {
        if (this.xhr.readyState === 1) {
          this.xhr.send();
        }
      }
    }]);
    return Xhr;
  }();

  var mode = void 0;
  var timeScale = 15;

  var util$1 = Player.util;

  var Music = function (_Player) {
    inherits(Music, _Player);

    function Music(options) {
      classCallCheck(this, Music);

      var opts = util$1.deepCopy({
        controls: true,
        mediaType: 'audio',
        ignores: ['fullscreen', 'start', 'definition', 'makeBullet', 'textTrack', 'loading', 'pc', 'mobile', 'playbackRate', 'replay', 'error', 'poster']
      }, options);
      if (!opts.volumeShow) {
        opts.ignores.push('volume');
      }

      var _this = possibleConstructorReturn(this, (Music.__proto__ || Object.getPrototypeOf(Music)).call(this, opts));

      var player = _this;
      _this.rawConfig = options;
      _this.list = util$1.typeOf(opts.url) === 'Array' ? opts.url : [{
        src: opts.url,
        name: opts.name,
        vid: opts.vid,
        poster: opts.poster
      }];
      _this.name = _this.list[0].name;
      _this.vid = _this.list[0].vid;
      _this.poster = _this.list[0].poster;
      _this.nextIndex = 1;
      _this.prevIndex = _this.list.length - 1;
      _this.halfPass = false;
      _this.history = [];
      _this.index = 0;
      if (!opts.controls) {
        _this.root.style.display = 'none';
        return possibleConstructorReturn(_this);
      }

      util$1.addClass(_this.root, 'xgplayer-music');
      if (!opts.width) {
        _this.config.width = '100%';
        _this.root.style.width = '100%';
      }
      if (!opts.height) {
        _this.config.height = '50px';
        _this.root.style.height = '50px';
      }
      Object.defineProperty(_this, 'src', {
        get: function get() {
          return this.video.currentSrc;
        },
        set: function set(v) {
          var cur = util$1.typeOf(v) === 'String' ? { src: v, name: '' } : v;
          this.history.push(cur);
          this.video.src = cur.src;
        },

        configurable: true
      });
      if (_this.config.autoplayMuted) {
        _this.config.volume = _this.config.autoplay ? 0 : _this.config.volume;
      }
      player.once('ready', function () {
        util$1.addClass(player.root, 'xgplayer-skin-default');
        if (player.config.lang && player.config.lang === 'en') {
          util$1.addClass(player.root, 'lang-is-en');
        } else if (player.config.lang === 'jp') {
          util$1.addClass(player.root, 'lang-is-jp');
        }
      });
      _this.once('canplay', function () {
        if (this.config.autoplay && this.config.autoplayMuted) {
          this.volume = 0;
        } else {
          this.volume = this.config.volume;
        }
      });
      _this.on('timeupdate', function () {
        if (!_this.halfPass && _this.currentTime > _this.duration / 2) {
          _this.confirmOrder();
        }
      });
      _this.on('ended', function () {
        if (_this.mode === 'order' && _this.index + 1 >= _this.list.length) {
          _this.pause();
          _this.currentTime = 0;
          return;
        }
        switch (_this.mode) {
          case 'sloop':
            _this.change();
            break;
          case 'order':
          case 'loop':
          default:
            _this.next();
            break;
        }
      });
      if (!_this.config.segPlay) {
        _this.checkOffline(player.list[0].src, player.list[0].vid || player.list[0].name).then(function (url) {
          player.config.url = url;
          player.start(url);
        });
      }
      return _this;
    }

    createClass(Music, [{
      key: 'lyric',
      value: function lyric(lyricTxts, Dom) {
        if (this.__lyric__) {
          this.__lyric__.unbind(this);
        }
        if (Player.util.typeOf(lyricTxts) !== 'Array') {
          lyricTxts = [].concat(lyricTxts);
        }
        this.__lyric__ = new Lyric(lyricTxts, Dom);
        this.__lyric__.bind(this);
        return this.__lyric__;
      }
    }, {
      key: 'confirmOrder',
      value: function confirmOrder() {
        var player = this;
        this.halfPass = true;
        this.nextComput();
        this.prevComput();
        if (this.config.preloadNext) {
          this.checkOffline(this.list[this.nextIndex].src, this.list[this.nextIndex].vid || this.list[this.nextIndex].name).then(function (url) {
            if (url.indexOf('blob:') < 0) {
              var offlineVid = player.list[player.nextIndex].vid || player.list[player.nextIndex].name;
              var xhr = new Xhr(player.list[player.nextIndex].src, function (res) {
                player.database.openDB(function () {
                  player.database.addData(player.database.myDB.ojstore.name, [{ vid: offlineVid, blob: new Blob([res], { type: 'audio/mp4; codecs="mp4a.40.5"' }) }]);
                  setTimeout(function () {
                    player.database.closeDB();
                  }, 5000);
                });
              });
            }
          });
        }
      }
    }, {
      key: 'nextComput',
      value: function nextComput() {
        switch (this.mode) {
          case 'sloop':
          case 'order':
          case 'loop':
            if (this.index + 1 < this.list.length) {
              this.nextIndex = this.index + 1;
            } else {
              this.nextIndex = 0;
            }
            break;
          default:
            this.nextIndex = Math.ceil(Math.random() * this.list.length);
            break;
        }
      }
    }, {
      key: 'prevComput',
      value: function prevComput() {
        switch (this.mode) {
          case 'sloop':
          case 'order':
          case 'loop':
            if (this.index - 1 >= 0) {
              this.prevIndev = this.index - 1;
            } else {
              this.prevIndev = this.list.length - 1;
            }
            break;
          default:
            this.prevIndev = Math.ceil(Math.random() * this.list.length);
            break;
        }
      }
    }, {
      key: 'add',
      value: function add(meta) {
        this.list.push({
          src: meta.src,
          name: meta.name,
          vid: meta.vid,
          poster: meta.poster
        });
      }
    }, {
      key: 'remove',
      value: function remove(url) {
        var idx = -1;
        this.list.every(function (item, index) {
          if (item.src === url || item.name === url || item.vid === url) {
            idx = index;
            return false;
          } else {
            return true;
          }
        });
        if (idx > -1) {
          this.list.splice(idx, 1);
        }
      }
    }, {
      key: 'change',
      value: function change() {
        var self = this;
        var offlineVid = self.list[self.index].vid || self.list[self.index].name;
        this.halfPass = false;
        this.checkOffline(self.list[self.index].src, offlineVid).then(function (url) {
          if (Player.m4a) {
            self.video.load();
            self.name = self.list[self.index].name;
            self.vid = self.list[self.index].vid;
            self.poster = self.list[self.index].poster;
            self.emit('change', { src: url, name: self.name, vid: self.vid, poster: self.poster });
          } else {
            self.video.pause();
            self.currentTime = 0;
            self.src = url;
            self.name = self.list[self.index].name;
            self.vid = self.list[self.index].vid;
            self.poster = self.list[self.index].poster;
            setTimeout(function () {
              self.video.play().then(function () {
                self.emit('change', { src: url, name: self.name, vid: self.vid, poster: self.poster });
              });
            }, 60);
          }
        });
      }
    }, {
      key: 'checkOffline',
      value: function checkOffline(url, offlineVid) {
        var self = this;
        return new Promise(function (resolve) {
          if (!self.config.offline) {
            resolve(url);
          }
          self.database.openDB(function () {
            self.database.getDataByKey(self.database.myDB.ojstore.name, offlineVid, function (result) {
              setTimeout(function () {
                self.database.closeDB();
              }, 5000);
              if (result) {
                resolve(URL.createObjectURL(result.blob));
              } else {
                resolve(url);
              }
            });
          });
        });
      }
    }, {
      key: 'next',
      value: function next() {
        if (!this.halfPass) {
          this.halfPass = true;
          this.nextComput();
        }
        this.index = this.nextIndex;
        this.change();
      }
    }, {
      key: 'prev',
      value: function prev() {
        if (!this.halfPass) {
          this.halfPass = true;
          this.prevComput();
        }
        this.index = this.prevIndex;
        this.change();
      }
    }, {
      key: 'forward',
      value: function forward() {
        // console.log(`music go forward ${timeScale}s`)
        this.currentTime = this.currentTime + timeScale < this.duration ? this.currentTime + timeScale : this.duration - 0.1;
      }
    }, {
      key: 'backward',
      value: function backward() {
        // console.log(`music go backward ${timeScale}s`)
        this.currentTime = this.currentTime - timeScale > 0 ? this.currentTime - timeScale : 0;
      }
    }, {
      key: 'analyze',
      value: function analyze(canvas) {
        return new Analyze(this, canvas);
      }
    }, {
      key: 'mode',
      get: function get() {
        return mode || Music.ModeType[2];
      },
      set: function set(idx) {
        switch (idx) {
          case 0:
          case 1:
          case 2:
          case 3:
            mode = Music.ModeType[idx];
        }
        this.confirmOrder();
      }
    }, {
      key: 'timeScale',
      get: function get() {
        return timeScale || 15;
      },
      set: function set(scale) {
        timeScale = scale;
      }
    }], [{
      key: 'AudioCtx',
      get: function get() {
        return window.AudioContext || window.webkitAudioContext;
      }
    }, {
      key: 'ModeType',
      get: function get() {
        return ['order', 'random', 'loop', 'sloop'];
      }
    }]);
    return Music;
  }(Player);

  var backward = function backward(player) {
    var util = Music.util;
    var controlEl = player.controls;
    var ev = ['click', 'touchstart'];
    var backwardBtn = player.config.backwardBtn ? player.config.backwardBtn : {};
    var backward = void 0;
    if (backwardBtn.type === 'img') {
      backward = Music.util.createImgBtn('backward', backwardBtn.url, backwardBtn.width, backwardBtn.height);
    } else {
      backward = util.createDom('xg-backward', '<xg-icon class="xgplayer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">\n              <path transform = "scale(1.5 1.5) translate(8 4.5)"\n              d="m 14,2.99996 0,10 -7,-5 7,-5 z m -7,5 0,5 -7,-5 7,-5 0,5 z m -7,0 0,0 z"></path>\n          </svg></xg-icon>', {}, 'xgplayer-backward');
    }
    controlEl.appendChild(backward);
    ev.forEach(function (item) {
      backward.addEventListener(item, function (e) {
        e.preventDefault();
        e.stopPropagation();
        player.backward();
      }, false);
    });
  };

  Music.install('backward', backward);

  var cover = function cover(player) {
    var util = Music.util;
    var controlEl = player.controls;
    var poster = util.createDom('xg-cover', '<img src="' + (player.config.poster || player.config.url[0].poster) + '">', {}, 'xgplayer-cover');
    controlEl.appendChild(poster);
    player.on('change', function (item) {
      poster.innerHTML = '<img src="' + item.poster + '">';
    });
  };

  Music.install('cover', cover);

  var forward = function forward(player) {
    var util = Music.util;
    var controlEl = player.controls;
    var ev = ['click', 'touchstart'];
    var forwardBtn = player.config.forwardBtn ? player.config.forwardBtn : {};
    var forward = void 0;
    if (forwardBtn.type === 'img') {
      forward = Music.util.createImgBtn('forward', forwardBtn.url, forwardBtn.width, forwardBtn.height);
    } else {
      forward = util.createDom('xg-forward', '<xg-icon class="xgplayer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">\n              <path transform = "scale(1.5 1.5) translate(-2 4.5)"\n              d="m 2,2.99996 0,10 7,-5 -7,-5 z m 7,5 0,5 7,-5 -7,-5 0,5 z m 7,0 0,0 z"></path>\n          </svg></xg-icon>', {}, 'xgplayer-forward');
    }
    controlEl.appendChild(forward);
    ev.forEach(function (item) {
      forward.addEventListener(item, function (e) {
        e.preventDefault();
        e.stopPropagation();
        player.forward();
      }, false);
    });
  };

  Music.install('forward', forward);

  var meta = function meta(player) {
    var util = Music.util;
    var progressEl = player.controls.querySelector('.xgplayer-progress');
    var name = util.createDom('xg-name', '' + (player.config.name || player.config.url[0].name), {}, 'xgplayer-name');
    progressEl.appendChild(name);
    player.on('change', function (item) {
      name.innerHTML = '' + item.name;
    });
  };

  Music.install('meta', meta);

  var next = function next(player) {
    var util = Music.util;
    var controlEl = player.controls;
    var ev = ['click', 'touchstart'];
    var nextBtn = player.config.nextBtn ? player.config.nextBtn : {};
    var next = void 0;
    if (nextBtn.type === 'img') {
      next = Music.util.createImgBtn('next', nextBtn.url, nextBtn.width, nextBtn.height);
    } else {
      next = util.createDom('xg-next', '<xg-icon class="xgplayer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">\n              <path transform="scale(0.025 0.025)"\n              d="M800 380v768h-128v-352l-320 320v-704l320 320v-352z"></path>\n          </svg></xg-icon>', {}, 'xgplayer-next');
    }
    controlEl.appendChild(next);
    ev.forEach(function (item) {
      next.addEventListener(item, function (e) {
        e.preventDefault();
        e.stopPropagation();
        player.next();
      }, false);
    });
  };

  Music.install('next', next);

  var prev = function prev(player) {
    var util = Music.util;
    var controlEl = player.controls;
    var ev = ['click', 'touchstart'];
    var prevBtn = player.config.prevBtn ? player.config.prevBtn : {};
    var prev = void 0;
    if (prevBtn.type === 'img') {
      prev = Music.util.createImgBtn('prev', prevBtn.url, prevBtn.width, prevBtn.height);
    } else {
      prev = util.createDom('xg-prev', '<xg-icon class="xgplayer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">\n              <path transform = "scale(0.025 0.025)"\n              d="M600 1140v-768h128v352l320-320v704l-320-320v352zz"></path>\n          </svg></xg-icon>', {}, 'xgplayer-prev');
    }
    controlEl.appendChild(prev);

    ev.forEach(function (item) {
      prev.addEventListener(item, function (e) {
        e.preventDefault();
        e.stopPropagation();
        player.prev();
      }, false);
    });
  };

  Music.install('prev', prev);

  return Music;

})));
//# sourceMappingURL=index.js.map
