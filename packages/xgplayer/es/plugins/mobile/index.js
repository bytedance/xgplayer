var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Plugin from '../../plugin';

var Events = Plugin.Events,
    Util = Plugin.Util;

var MobilePlugin = function (_Plugin) {
  _inherits(MobilePlugin, _Plugin);

  _createClass(MobilePlugin, null, [{
    key: 'pluginName',
    get: function get() {
      return 'mobile';
    }
  }, {
    key: 'defaultConfig',
    get: function get() {
      return {
        index: 0,
        disableGesture: false, // 是否禁用手势
        gestureX: true, // 是否启用水平手势
        gestureY: true, // 是否启用垂直手势
        updateGesture: function updateGesture() {}, // 手势处理回调
        gradient: true, // 是否启用阴影
        isTouchingSeek: false, // 是否在touchMove的同时更新currentTime
        miniMoveStep: 5, // 最小差异，用于move节流
        scopeL: 0.4, // 左侧手势范围比例
        scopeR: 0.4, // 右侧手势范围比例
        darkness: true, // 是否启用右侧调暗功能
        maxDarkness: 0.6 // 调暗最大暗度，即蒙层最大透明度
      };
    }
  }]);

  function MobilePlugin(options) {
    _classCallCheck(this, MobilePlugin);

    var _this = _possibleConstructorReturn(this, (MobilePlugin.__proto__ || Object.getPrototypeOf(MobilePlugin)).call(this, options));

    _this.isTouchMove = false;
    _this.isMoving = false;
    _this.pos = {
      x: 0,
      y: 0,
      time: 0,
      volume: 0,
      light: 0,
      width: 0,
      height: 0,
      scopeL: 0,
      scopeR: 0,
      op: 0
    };
    return _this;
  }

  _createClass(MobilePlugin, [{
    key: 'afterCreate',
    value: function afterCreate() {
      this.config.disableGesture = !!this.playerConfig.disableGesture;

      this.xgMask = Util.createDom('xg-mask', '', {}, 'xgmask');
      this.player.root.append(this.xgMask);

      this.onTouchMove = this.onTouchMove.bind(this);
      this.onTouchStart = this.onTouchStart.bind(this);
      this.onTouchEnd = this.onTouchEnd.bind(this);
      this.onClick = this.onClick.bind(this);
      this.root.addEventListener('touchstart', this.onTouchStart);
      this.root.addEventListener('click', this.onClick, false);
    }
  }, {
    key: 'getTouche',
    value: function getTouche(touches) {
      if (touches && touches.length > 0) {
        return touches[touches.length - 1];
      } else {
        return null;
      }
    }
  }, {
    key: 'onTouchStart',
    value: function onTouchStart(e) {
      var player = this.player,
          config = this.config;
      // 直播或者duration没有获取到之前不做操作

      if (!(this.player.duration !== Infinity && this.player.duration > 0) || this.isMoving || config.disableGesture) {
        return;
      }
      this.isMoving = true;
      var touche = this.getTouche(e.touches);
      if (touche) {
        this.pos.time = player.currentTime;
        this.pos.volume = player.volume;
        this.pos.width = parseInt(Util.getCss(this.root, 'width'), 10);
        this.pos.height = parseInt(Util.getCss(this.root, 'height'), 10) - 48;
        this.pos.scopeL = config.scopeL * this.pos.width;
        this.pos.scopeR = (1 - config.scopeR) * this.pos.width;
        this.root.addEventListener('touchmove', this.onTouchMove, false);
        this.root.addEventListener('touchend', this.onTouchEnd, false);
        this.player.emit(Events.PLAYER_FOCUS, true);
      }
    }
  }, {
    key: 'onTouchMove',
    value: function onTouchMove(e) {
      var touche = this.getTouche(e.touches);
      if (!touche) {
        return;
      }
      if (Math.abs(touche.pageX - this.pos.x) > this.config.miniMoveStep || Math.abs(touche.pageX - this.pos.x) > this.config.miniMoveStep) {
        var pos = this.pos,
            config = this.config;

        var x = parseInt(touche.pageX, 10);
        var y = parseInt(touche.pageY, 10);
        var diffx = x - this.pos.x;
        var diffy = y - this.pos.y;
        var tan = Math.abs(diffy) / Math.abs(diffx);
        if (config.gestureY && tan > 1.73 && (x < pos.scopeL || x > pos.scopeR)) {
          if (x < pos.scopeL && config.darkness) {
            pos.op = 3;
            this.updateBrightness(diffy / this.pos.height);
          } else {
            pos.op = 2;
            this.updateVolume(diffy / this.pos.height);
          }
        } else if (config.gestureX && tan < 0.27) {
          pos.op = 1;
          this.updateTime(diffx / pos.width);
        }
        pos.x = x;
        pos.y = y;
        if (config.updateGesture && typeof config.updateGesture === 'function') {
          config.updateGesture({ diffx: diffx, diffy: diffy, x: x, y: y }, pos);
        }
      }
    }
  }, {
    key: 'onTouchEnd',
    value: function onTouchEnd(e) {
      var _this2 = this;

      var root = this.root,
          player = this.player,
          pos = this.pos;

      root.removeEventListener('touchmove', this.onTouchMove, false);
      root.removeEventListener('touchend', this.onTouchEnd, false);
      player.emit(Events.PLAYER_FOCUS, false);
      if (pos.op === 1) {
        if (pos.time > player.duration) {
          player.currentTime = player.duration;
        } else {
          player.currentTime = pos.time < 0 ? 0 : pos.time;
        }
        this.once(Events.CANPLAY, function () {
          _this2.player.isSeeking = false;
        });
      }
      pos.op = 0;
      this.isMoving = false;
    }
  }, {
    key: 'updateTime',
    value: function updateTime(percent) {
      var player = this.player;

      player.isSeeking = true;
      var time = percent * player.duration;
      time += this.pos.time;
      time = time < 0 ? 0 : time > player.duration ? player.duration : time;
      player.getPlugin('time') && player.getPlugin('time').updateTime(time);
      player.getPlugin('progress') && player.getPlugin('progress').updatePercent(time / this.player.duration, true);
      if (this.config.isTouchingSeek) {
        player.currentTime = Number(time).toFixed(1);
      }
      this.pos.time = time;
    }
  }, {
    key: 'updateVolume',
    value: function updateVolume(percent) {
      var volume = this.pos.volume - percent;
      this.pos.volume = volume < 0.1 ? 0 : volume > 1 ? 1 : volume;
      this.player.volume = this.pos.volume;
      this.pos.volume > 0 && (this.player.muted = false);
    }
  }, {
    key: 'updateBrightness',
    value: function updateBrightness(percent) {
      var light = this.pos.light - 0.8 * percent;
      light = light > this.config.maxDarkness ? this.config.maxDarkness : light < 0 ? 0 : light;
      if (this.xgMask) {
        this.xgMask.style.backgroundColor = 'rgba(0,0,0,' + light + ')';
      }
      this.pos.light = light;
    }
  }, {
    key: 'onClick',
    value: function onClick(e) {
      e.preventDefault();
      var util = Plugin.Util;
      e.stopPropagation();
      var player = this.player,
          playerConfig = this.playerConfig;


      if (!playerConfig.closeVideoTouch && !player.isTouchMove) {
        if (util.hasClass(player.root, 'xgplayer-nostart')) {
          return false;
        } else if (!player.ended) {
          if (player.paused) {
            var playPromise = player.play();
            if (playPromise !== undefined && playPromise) {
              // playPromise.catch(err => {});
            }
          } else {
            player.pause();
          }
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var className = this.config.gradient ? 'gradient' : '';
      return '\n     <xg-trigger class="trigger ' + className + '">\n     <!--<div class="bar">\n        <span class=""></span>\n     </div>\n     <div class="timenote">\n        <span class="cur">00:00</span>\n        <span>/</span>\n        <span class="dur">00:00</span>\n        <div class="bar timebar">\n          <span class=""></span>\n        </class>\n     </div>-->\n     </xg-trigger>\n    ';
    }
  }]);

  return MobilePlugin;
}(Plugin);

export default MobilePlugin;