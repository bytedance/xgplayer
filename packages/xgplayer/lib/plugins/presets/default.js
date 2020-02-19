'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _replay = require('../replay');

var _replay2 = _interopRequireDefault(_replay);

var _poster = require('../poster');

var _poster2 = _interopRequireDefault(_poster);

var _start = require('../start');

var _start2 = _interopRequireDefault(_start);

var _enter = require('../enter');

var _enter2 = _interopRequireDefault(_enter);

var _miniScreen = require('../miniScreen');

var _miniScreen2 = _interopRequireDefault(_miniScreen);

var _pc = require('../pc');

var _pc2 = _interopRequireDefault(_pc);

var _mobile = require('../mobile');

var _mobile2 = _interopRequireDefault(_mobile);

var _keyboard = require('../keyboard');

var _keyboard2 = _interopRequireDefault(_keyboard);

var _loading = require('../loading');

var _loading2 = _interopRequireDefault(_loading);

var _sniffer = require('../../utils/sniffer');

var _sniffer2 = _interopRequireDefault(_sniffer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
// import Rotate from '../Controls/rotate';


var DefaultPreset = function DefaultPreset() {
  var _plugins, _plugins2;

  _classCallCheck(this, DefaultPreset);

  this.plugins = [_replay2.default, _poster2.default, _start2.default, _loading2.default, _enter2.default];

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