'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plugin = require('../../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Events = _plugin2.default.Events,
    POSITIONS = _plugin2.default.POSITIONS;

var PIP = function (_Plugin) {
  _inherits(PIP, _Plugin);

  function PIP() {
    _classCallCheck(this, PIP);

    return _possibleConstructorReturn(this, (PIP.__proto__ || Object.getPrototypeOf(PIP)).apply(this, arguments));
  }

  _createClass(PIP, [{
    key: 'beforeCreate',
    value: function beforeCreate(args) {
      if (typeof args.player.config.pip === 'boolean') {
        args.config.showIcon = args.player.config.pip;
      }
    }
  }, {
    key: 'afterCreate',
    value: function afterCreate() {
      var _this2 = this;

      // video初始化之后再做判断是否显示
      this.once(Events.COMPLETE, function () {
        if (_this2.config.showIcon && _this2.isPIPAvailable()) {
          _this2.show();
          _this2.switchPIP = _this2.switchPIP.bind(_this2);
          _this2.bind('click', _this2.switchPIP);
        }
        _this2.initPipEvents();
      });
    }
  }, {
    key: 'initPipEvents',
    value: function initPipEvents() {
      var player = this.player;

      this.leavePIPCallback = function () {
        // 处理点击x关闭画中画的时候暂停问题
        var paused = player.paused;
        setTimeout(function () {
          !paused && player.play();
        }, 0);
        player.emit('pip_change', false);
      };

      this.enterPIPCallback = function () {
        player.emit('pip_change', true);
      };

      if (player.video) {
        player.video.addEventListener('enterpictureinpicture', this.enterPIPCallback);
        // Video left Picture-in-Picture mode.
        player.video.addEventListener('leavepictureinpicture', this.leavePIPCallback);
      }
    }
  }, {
    key: 'switchPIP',
    value: function switchPIP() {
      var player = this.player,
          playerConfig = this.playerConfig;

      if (this.isPIPAvailable()) {
        return false;
      }
      try {
        if (document.pictureInPictureElement && document.pictureInPictureElement === player.video) {
          document.exitPictureInPicture();
        } else {
          if (playerConfig.poster) {
            player.video.poster = playerConfig.poster;
          }
          player.video && player.video.requestPictureInPicture();
        }
        return true;
      } catch (reason) {
        console.error('switchPIP', reason);
        return false;
      }
    }
  }, {
    key: 'isPIPAvailable',
    value: function isPIPAvailable() {
      var player = this.player;

      return document.pictureInPictureEnabled || !(player.video && player.video.disablePictureInPicture);
    }
  }, {
    key: 'registerLangauageTexts',
    value: function registerLangauageTexts() {
      return {
        'pipicon': {
          jp: 'picture-in-picture',
          en: 'picture-in-picture',
          zh: '画中画'
        }
      };
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var player = this.player;

      player.video.removeEventListener('enterpictureinpicture', this.enterPIPCallback);
      player.video.removeEventListener('leavepictureinpicture', this.leavePIPCallback);
      this.unbind('click', this.switchPIP);
    }
  }, {
    key: 'render',
    value: function render() {
      return '<xg-icon class="xgplayer-pip">\n      <div class="xgplayer-icon btn-definition">\n      ' + (this.icons.pipicon ? this.icons.pipicon : '<span>' + this.text.pipicon + '</span>') + '\n      </div>\n      ' + (this.icons.pipicon ? '<div class="xg-tips">' + this.text.pipicon + '</div>' : '') + '\n    </xg-icon>';
    }
  }, {
    key: 'isPip',
    get: function get() {
      var player = this.player;

      return document.pictureInPictureElement === player.video;
    }
  }], [{
    key: 'pluginName',
    get: function get() {
      return 'Pip';
    }
  }, {
    key: 'defaultConfig',
    get: function get() {
      return {
        position: POSITIONS.CONTROLS_RIGTH,
        index: 6,
        showIcon: false
      };
    }
  }]);

  return PIP;
}(_plugin2.default);

exports.default = PIP;