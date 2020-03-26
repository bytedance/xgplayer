'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sniffer = require('../utils/sniffer');

var _sniffer2 = _interopRequireDefault(_sniffer);

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

var _progress = require('../plugins/progress');

var _progress2 = _interopRequireDefault(_progress);

var _play = require('../plugins/play');

var _play2 = _interopRequireDefault(_play);

var _fullscreen = require('../plugins/fullscreen');

var _fullscreen2 = _interopRequireDefault(_fullscreen);

var _time = require('../plugins/time');

var _time2 = _interopRequireDefault(_time);

var _volume = require('../plugins/volume');

var _volume2 = _interopRequireDefault(_volume);

var _rotate = require('../plugins/rotate');

var _rotate2 = _interopRequireDefault(_rotate);

var _pip = require('../plugins/pip');

var _pip2 = _interopRequireDefault(_pip);

var _playNext = require('../plugins/playNext');

var _playNext2 = _interopRequireDefault(_playNext);

var _download = require('../plugins/download');

var _download2 = _interopRequireDefault(_download);

var _screenShot = require('../plugins/screenShot');

var _screenShot2 = _interopRequireDefault(_screenShot);

var _definition = require('../plugins/definition');

var _definition2 = _interopRequireDefault(_definition);

var _playbackRate = require('../plugins/playbackRate');

var _playbackRate2 = _interopRequireDefault(_playbackRate);

var _cssFullScreen = require('../plugins/cssFullScreen');

var _cssFullScreen2 = _interopRequireDefault(_cssFullScreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
// import Danmu from '../plugins/danmu'


var DefaultPreset = function DefaultPreset() {
  var _plugins, _plugins2;

  _classCallCheck(this, DefaultPreset);

  var contolsIcons = [_progress2.default, _play2.default, _fullscreen2.default, _time2.default, _rotate2.default, _playNext2.default, _definition2.default, _playbackRate2.default, _download2.default, _screenShot2.default];

  var barIcons = [{
    plugin: _pip2.default,
    options: {
      index: 0,
      position: _pip2.default.POSITIONS.ROOT_TOP
    } }];

  var layers = [_replay2.default, _poster2.default, _start2.default, _loading2.default, _enter2.default];

  this.plugins = [].concat(contolsIcons, layers);
  switch (_sniffer2.default.device) {
    case 'pc':
      (_plugins = this.plugins).push.apply(_plugins, [_keyboard2.default, _pc2.default, _cssFullScreen2.default, _volume2.default].concat(barIcons, [_miniScreen2.default]));
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