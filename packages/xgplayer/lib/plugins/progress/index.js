'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plugin = require('../../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _progressdots = require('./progressdots');

var _progressdots2 = _interopRequireDefault(_progressdots);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Events = _plugin2.default.Events,
    Util = _plugin2.default.Util,
    POSITIONS = _plugin2.default.POSITIONS,
    Sniffer = _plugin2.default.Sniffer;


var defaultThumbnailConfig = {
  isShow: false,
  urls: [],
  pic_num: 0,
  row: 0,
  col: 0,
  height: 160,
  width: 90,
  scale: 1

  /**
   * 进度条组件
   */
};
var Progress = function (_Plugin) {
  _inherits(Progress, _Plugin);

  _createClass(Progress, null, [{
    key: 'pluginName',
    get: function get() {
      return 'Progress';
    }
  }, {
    key: 'defaultConfig',
    get: function get() {
      return {
        position: POSITIONS.CONTROLS_CENTER,
        index: 0,
        progressDot: [],
        thumbnail: null,
        disable: false
      };
    }
  }]);

  function Progress(args) {
    _classCallCheck(this, Progress);

    var _this = _possibleConstructorReturn(this, (Progress.__proto__ || Object.getPrototypeOf(Progress)).call(this, args));

    _this.useable = false;
    _this.isProgressMoving = false;

    if (Sniffer.device !== 'mobile' && _this.playerConfig.thumbnail) {
      _this.config.thumbnail = _this.playerConfig.thumbnail;
    }
    return _this;
  }

  _createClass(Progress, [{
    key: 'changeState',
    value: function changeState() {
      var useable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.useable = useable;
    }
  }, {
    key: 'beforeCreate',
    value: function beforeCreate(args) {
      if (typeof args.player.config.progress === 'boolean') {
        args.config.disable = !args.player.config.progress;
      }
    }
  }, {
    key: 'afterCreate',
    value: function afterCreate() {
      var _this2 = this;

      if (this.config.disable) {
        return;
      }
      this.playedBar = this.find('.xgplayer-progress-played');
      this.cachedBar = this.find('.xgplayer-progress-cache');
      this.pointTip = this.find('.xgplayer-progress-point');
      this.progressBtn = this.find('.xgplayer-progress-btn');
      this.thumbnailDom = this.find('xg-thumbnail');
      this.initThumbnail();
      this.on(Events.TIME_UPDATE, function () {
        _this2.onTimeupdate();
        _this2.onCacheUpdate();
      });
      this.on(Events.SEEKING, function () {
        _this2.onTimeupdate();
        _this2.onCacheUpdate();
      });
      this.on([Events.BUFFER_CHANGE, Events.ENDED], function () {
        _this2.onCacheUpdate();
      });
      this.bindDomEvents();
    }
  }, {
    key: 'children',
    value: function children() {
      return {
        ProgressDots: {
          plugin: _progressdots2.default,
          options: {
            root: this.find('xg-outer'),
            dots: this.playerConfig.progressDot || this.config.progressDot
          }
        }
      };
    }
  }, {
    key: 'initThumbnail',
    value: function initThumbnail() {
      var _this3 = this;

      if (this.config.thumbnail) {
        var thumbnail = this.config.thumbnail;

        this.thumbnailConfig = {};
        Object.keys(defaultThumbnailConfig).map(function (key) {
          if (typeof thumbnail[key] === 'undefined') {
            _this3.thumbnailConfig[key] = defaultThumbnailConfig[key];
          } else {
            _this3.thumbnailConfig[key] = thumbnail[key];
          }
        });
        var _thumbnailConfig = this.thumbnailConfig,
            width = _thumbnailConfig.width,
            height = _thumbnailConfig.height,
            scale = _thumbnailConfig.scale;

        this.thumbnailDom.style.width = width * scale + 'px';
        this.thumbnailDom.style.height = height * scale + 'px';
      }
    }
  }, {
    key: 'bindDomEvents',
    value: function bindDomEvents() {
      var _this4 = this;

      this.mouseDown = this.mouseDown.bind(this);
      this.mouseMove = this.mouseMove.bind(this);
      this.mouseEnter = this.mouseEnter.bind(this);
      this.mouseLeave = this.mouseLeave.bind(this);
      ['touchstart', 'mousedown'].forEach(function (event) {
        _this4.root.addEventListener(event, _this4.mouseDown);
      });
      this.root.addEventListener('mouseenter', this.mouseEnter, false);
    }
  }, {
    key: 'mouseDown',
    value: function mouseDown(e) {
      var player = this.player;

      if (player.isMini || player.config.closeMoveSeek) {
        return;
      }
      var self = this;
      e.stopPropagation();
      Util.event(e);
      // this.pointTip为tip信息 不做seek操作
      if (e.target === this.pointTip || !player.config.allowSeekAfterEnded && player.ended) {
        return true;
      }
      this.isProgressMoving = true;
      Util.addClass(self.progressBtn, 'btn-move');
      self.computeWidth(e);

      var move = function move(e) {
        e.preventDefault();
        e.stopPropagation();
        Util.event(e);
        this.isProgressMoving = true;
        self.computeWidth(e);
      };

      var up = function up(e) {
        Util.removeClass(self.progressBtn, 'btn-move');
        e.preventDefault();
        e.stopPropagation();
        Util.event(e);
        if (Sniffer.device === 'mobile') {
          self.root.removeEventListener('touchmove', move);
          self.root.removeEventListener('touchend', up);
        } else {
          self.root.removeEventListener('mousemove', move);
          self.root.removeEventListener('mouseup', up);
        }
        self.isProgressMoving = false;
      };

      if (Sniffer.device === 'mobile') {
        self.root.addEventListener('touchmove', move, false);
        self.root.addEventListener('touchend', up, false);
      } else {
        self.root.addEventListener('mousemove', move);
        self.root.addEventListener('mouseup', up);
      }
      return true;
    }
  }, {
    key: 'mouseEnter',
    value: function mouseEnter(e) {
      var player = this.player;

      if (player.isMini || !player.config.allowSeekAfterEnded && player.ended) {
        return;
      }
      this.root.addEventListener('mousemove', this.mouseMove, false);
      this.root.addEventListener('mouseleave', this.mouseLeave, false);
    }
  }, {
    key: 'mouseLeave',
    value: function mouseLeave(e) {
      var player = this.player;

      if (player.isMini) {
        return;
      }
      this.pointTip.style.display = 'none';
      this.thumbnailDom.style.display = 'none';
      this.root.removeEventListener('mousemove', this.mouseMove, false);
      this.root.removeEventListener('mouseleave', this.mouseLeave, false);
    }
  }, {
    key: 'mouseMove',
    value: function mouseMove(e) {
      var player = this.player;

      var left = this.root.getBoundingClientRect().left;
      var width = this.root.getBoundingClientRect().width;
      var now = (e.clientX - left) / width * player.duration;
      now = now < 0 ? 0 : now;
      this.pointTip.textContent = Util.format(now);
      var pointWidth = this.pointTip.getBoundingClientRect().width;
      var pleft = e.clientX - left - pointWidth / 2;
      pleft = pleft > 0 ? pleft : 0;
      pleft = pleft > width - pointWidth ? width - pointWidth : pleft;
      this.pointTip.style.left = pleft + 'px';
      if (e.target && e.target.className === 'xgplayer-progress-dot') {
        this.pointTip.style.display = 'none';
      } else {
        this.pointTip.style.display = 'block';
      }
      this.updateThumbnailPosition(e, now, width);
    }
  }, {
    key: 'updateThumbnailPosition',
    value: function updateThumbnailPosition(e, now, containerWidth) {
      var _this5 = this;

      if (!this.config.thumbnail) {
        return;
      }
      var thumbnail = this.thumbnailConfig;
      if (!thumbnail || !thumbnail.pic_num === 0 || thumbnail.urls.length === 0) {
        return;
      }
      this.interval = this.player.duration / thumbnail.pic_num;
      var index = Math.floor(now / this.interval);
      var urls = thumbnail.urls,
          row = thumbnail.row,
          col = thumbnail.col,
          height = thumbnail.height,
          width = thumbnail.width,
          scale = thumbnail.scale;

      var indexInPage = index + 1 - col * row * (Math.ceil((index + 1) / (col * row)) - 1);
      var rowIndex = Math.ceil(indexInPage / row) - 1;
      var colIndex = indexInPage - rowIndex * row - 1;
      var left = e.clientX - width * scale / 2;
      left = left > 0 ? left : 0;
      left = left < containerWidth - width * scale ? left : containerWidth - width * scale;
      var style = {
        backgroundImage: 'url(' + urls[Math.ceil((index + 1) / (col * row)) - 1] + ')',
        'background-position': '-' + colIndex * width + 'px -' + rowIndex * height + 'px',
        left: left + 'px',
        top: -10 - height * scale + 'px',
        display: 'block'
      };
      Object.keys(style).map(function (key) {
        _this5.thumbnailDom.style[key] = style[key];
      });
    }
  }, {
    key: 'computeWidth',
    value: function computeWidth(e) {
      var containerWidth = this.root.getBoundingClientRect().width;

      var _playedBar$getBoundin = this.playedBar.getBoundingClientRect(),
          left = _playedBar$getBoundin.left;

      var w = e.clientX - left;
      if (w > containerWidth) {
        w = containerWidth;
      }
      this.updatePercent(w / containerWidth);
    }
  }, {
    key: 'updateTime',
    value: function updateTime(time) {
      var player = this.player;

      var timeIcon = player.plugins.time;
      if (time) {
        timeIcon.updateTime(time);
      }
    }
  }, {
    key: 'updatePercent',
    value: function updatePercent(percent, notSeek) {
      if (this.config.disable) {
        return;
      }
      var player = this.player;

      var now = percent * player.duration;
      this.playedBar.style.width = percent * 100 + '%';
      if (notSeek) {
        return;
      }
      if (player.videoConfig.mediaType === 'video' && !player.dash && !player.config.closeMoveSeek) {
        player.seek(Number(now).toFixed(1));
      } else {
        this.updateTime(now);
      }
    }
  }, {
    key: 'compute',
    value: function compute(e) {
      var containerLeft = this.root.getBoundingClientRect().left;
      var containerWidth = this.root.getBoundingClientRect().width;
      var pointWidth = this.pointTip.getBoundingClientRect().width;
      var left = e.clientX - containerLeft - pointWidth / 2;
      left = left > 0 ? left : 0;
      left = left > containerWidth - pointWidth ? containerWidth - pointWidth : left;
      this.pointTip.style.left = left + 'px';
    }
  }, {
    key: 'onTimeupdate',
    value: function onTimeupdate() {
      var player = this.player;

      if (player.isSeeking || this.isProgressMoving) {
        return;
      }
      if (player.videoConfig.mediaType !== 'audio' || !player.dash) {
        this.playedBar.style.width = player.currentTime * 100 / player.duration + '%';
      }
    }
  }, {
    key: 'onCacheUpdate',
    value: function onCacheUpdate() {
      var player = this.player;

      var buffered = player.buffered;
      if (buffered && buffered.length > 0) {
        var end = buffered.end(buffered.length - 1);
        for (var i = 0, len = buffered.length; i < len; i++) {
          if (player.currentTime >= buffered.start(i) && player.currentTime <= buffered.end(i)) {
            end = buffered.end(i);
            for (var j = i + 1; j < buffered.length; j++) {
              if (buffered.start(j) - buffered.end(j - 1) >= 2) {
                end = buffered.end(j - 1);
                break;
              }
            }
            break;
          }
        }
        this.cachedBar.style.width = end / player.duration * 100 + '%';
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this6 = this;

      ['touchstart', 'mousedown'].forEach(function (event) {
        _this6.root.removeEventListener(event, _this6.mouseDown);
      });
      this.root.removeEventListener('mouseenter', this.mouseEnter, false);
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.config.disable) {
        return;
      }
      return '\n      <xg-progress class="xgplayer-progress">\n        <xg-outer class="xgplayer-progress-outer">\n          <xg-cache class="xgplayer-progress-cache" style="width:0">\n          </xg-cache>\n          <xg-played class="xgplayer-progress-played" style="width:0">\n            <xg-progress-btn class="xgplayer-progress-btn"></xg-progress-btn>\n            <xg-point class="xgplayer-progress-point xg-tips">00:00</xg-point>\n            <xg-thumbnail class="xgplayer-progress-thumbnail xg-tips"></xg-thumbnail>\n          </xg-played>\n        </xg-outer>\n      </xg-progress>\n    ';
    }
  }]);

  return Progress;
}(_plugin2.default);

exports.default = Progress;