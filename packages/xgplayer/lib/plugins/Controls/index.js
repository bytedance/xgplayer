'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plugin = require('../../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _progress = require('../icons/progress');

var _progress2 = _interopRequireDefault(_progress);

var _playIcon = require('../icons/playIcon');

var _playIcon2 = _interopRequireDefault(_playIcon);

var _fullscreen = require('../icons/fullscreen');

var _fullscreen2 = _interopRequireDefault(_fullscreen);

var _timeIcon = require('../icons/timeIcon');

var _timeIcon2 = _interopRequireDefault(_timeIcon);

var _volumeIcon = require('../icons/volumeIcon');

var _volumeIcon2 = _interopRequireDefault(_volumeIcon);

var _rotate = require('../icons/rotate');

var _rotate2 = _interopRequireDefault(_rotate);

var _miniScreen = require('../icons/miniScreen');

var _miniScreen2 = _interopRequireDefault(_miniScreen);

var _pipIcon = require('../icons/pipIcon');

var _pipIcon2 = _interopRequireDefault(_pipIcon);

var _playNextIcon = require('../icons/playNextIcon');

var _playNextIcon2 = _interopRequireDefault(_playNextIcon);

var _downloadIcon = require('../icons/downloadIcon');

var _downloadIcon2 = _interopRequireDefault(_downloadIcon);

var _screenShotIcon = require('../icons/screenShotIcon');

var _screenShotIcon2 = _interopRequireDefault(_screenShotIcon);

var _cssFullScreen = require('../icons/cssFullScreen');

var _cssFullScreen2 = _interopRequireDefault(_cssFullScreen);

require('./index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controls = function (_Plugin) {
  _inherits(Controls, _Plugin);

  function Controls() {
    _classCallCheck(this, Controls);

    return _possibleConstructorReturn(this, (Controls.__proto__ || Object.getPrototypeOf(Controls)).apply(this, arguments));
  }

  _createClass(Controls, [{
    key: 'afterCreate',
    value: function afterCreate() {
      console.log('afterCreate');
    }
  }, {
    key: 'children',
    value: function children() {
      this.left = this.find('left-grid');
      this.center = this.find('center');
      this.right = this.find('right-grid');
      console.log('center', this.center);
      return {
        TimeIcon: {
          plugin: _timeIcon2.default,
          options: {
            index: 1,
            root: this.left
          }
        },
        PlayIcon: {
          plugin: _playIcon2.default,
          options: {
            index: 0,
            root: this.left
          }
        },
        playNextIcon: {
          plugin: _playNextIcon2.default,
          options: {
            index: 2,
            root: this.left
          }
        },
        DownLoadIcon: {
          plugin: _downloadIcon2.default,
          options: {
            index: 3,
            root: this.right
          }
        },
        ScreenShotIcon: {
          plugin: _screenShotIcon2.default,
          options: {
            index: 4,
            root: this.right
          }
        },
        FullScreen: {
          plugin: _fullscreen2.default,
          options: {
            index: 0,
            root: this.right
          }
        },
        VolumeIcon: {
          plugin: _volumeIcon2.default,
          options: {
            index: 1,
            root: this.right
          }
        },
        RotateIcon: {
          plugin: _rotate2.default,
          options: {
            index: 1,
            root: this.right
          }
        },
        MiniScreen: {
          plugin: _miniScreen2.default,
          options: {
            index: 1,
            root: this.right
          }
        },
        PIPIcon: {
          plugin: _pipIcon2.default,
          options: {
            index: 1,
            root: this.right
          }
        },
        CssFullScreen: {
          plugin: _cssFullScreen2.default,
          options: {
            index: 1,
            root: this.right
          }
        },
        Progress: {
          plugin: _progress2.default,
          options: {
            root: this.center
          }
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return '<xg-controls class="xgplayer-controls" unselectable="on" onselectstart="return false">\n    <left-grid class="left-grid">\n    </Left-grid>\n    <center class="center"></center>\n    <right-grid class="right-grid">\n    </right-grid>\n    </xg-controls>';
    }
  }], [{
    key: 'pluginName',
    get: function get() {
      return 'Controls';
    }
  }]);

  return Controls;
}(_plugin2.default);

exports.default = Controls;