'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _replay = require('../plugins/replay');

var _replay2 = _interopRequireDefault(_replay);

var _poster = require('../plugins/poster');

var _poster2 = _interopRequireDefault(_poster);

var _start = require('../plugins/start');

var _start2 = _interopRequireDefault(_start);

var _enter = require('../plugins/enter');

var _enter2 = _interopRequireDefault(_enter);

var _miniScreen = require('../plugins/miniScreen');

var _miniScreen2 = _interopRequireDefault(_miniScreen);

var _pc = require('../plugins/pc');

var _pc2 = _interopRequireDefault(_pc);

var _mobile = require('../plugins/mobile');

var _mobile2 = _interopRequireDefault(_mobile);

var _keyboard = require('../plugins/keyboard');

var _keyboard2 = _interopRequireDefault(_keyboard);

var _loading = require('../plugins/loading');

var _loading2 = _interopRequireDefault(_loading);

var _sniffer = require('../utils/sniffer');

var _sniffer2 = _interopRequireDefault(_sniffer);

var _danmu = require('../plugins/danmu');

var _danmu2 = _interopRequireDefault(_danmu);

var _progress = require('../plugins/icons/progress');

var _progress2 = _interopRequireDefault(_progress);

var _playIcon = require('../plugins/icons/playIcon');

var _playIcon2 = _interopRequireDefault(_playIcon);

var _fullscreen = require('../plugins/icons/fullscreen');

var _fullscreen2 = _interopRequireDefault(_fullscreen);

var _timeIcon = require('../plugins/icons/timeIcon');

var _timeIcon2 = _interopRequireDefault(_timeIcon);

var _volumeIcon = require('../plugins/icons/volumeIcon');

var _volumeIcon2 = _interopRequireDefault(_volumeIcon);

var _rotate = require('../plugins/icons/rotate');

var _rotate2 = _interopRequireDefault(_rotate);

var _pipIcon = require('../plugins/icons/pipIcon');

var _pipIcon2 = _interopRequireDefault(_pipIcon);

var _playNextIcon = require('../plugins/icons/playNextIcon');

var _playNextIcon2 = _interopRequireDefault(_playNextIcon);

var _definitionIcon = require('../plugins/icons/definitionIcon');

var _definitionIcon2 = _interopRequireDefault(_definitionIcon);

var _playbackRateIcon = require('../plugins/icons/playbackRateIcon');

var _playbackRateIcon2 = _interopRequireDefault(_playbackRateIcon);

var _cssFullScreen = require('../plugins/icons/cssFullScreen');

var _cssFullScreen2 = _interopRequireDefault(_cssFullScreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
// import Miniscreen from '../Controls/mini';
// import Rotate from '../Controls/rotate';

// import DownLoadIcon from '../plugins/icons/downloadIcon'
// import ScreenShotIcon from '../plugins/icons/screenShotIcon'


var DefaultPreset = function DefaultPreset() {
  var _plugins, _plugins2;

  _classCallCheck(this, DefaultPreset);

  var contolsIcons = [_progress2.default, _playIcon2.default, _fullscreen2.default, _timeIcon2.default, _volumeIcon2.default, _rotate2.default, _playNextIcon2.default, _definitionIcon2.default, _playbackRateIcon2.default, _cssFullScreen2.default];
  var barIcons = [{
    plugin: _pipIcon2.default,
    options: {
      index: 0,
      rootType: _pipIcon2.default.ROOT_TYPES.BASE_BAR
    } }];
  var layers = [_replay2.default, _poster2.default, _start2.default, _loading2.default, _enter2.default, _miniScreen2.default, _danmu2.default];

  this.plugins = [].concat(layers, barIcons, contolsIcons);
  switch (_sniffer2.default.device) {
    case 'pc':
      (_plugins = this.plugins).push.apply(_plugins, [_keyboard2.default, _pc2.default]);
      break;
    case 'mobile':
      this.plugins.push(_mobile2.default);
      break;
    default:
      (_plugins2 = this.plugins).push.apply(_plugins2, [_keyboard2.default, _pc2.default]);
  }
  this.ignores = [];
};

exports.default = DefaultPreset;