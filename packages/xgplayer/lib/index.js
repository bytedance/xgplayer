'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

var _plugins = require('./plugins');

var Plugins = _interopRequireWildcard(_plugins);

var _default = require('./presets/default');

var _default2 = _interopRequireDefault(_default);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_player2.default.defaultPreset = _default2.default;
_player2.default.defaultPlugins = Plugins;

exports.default = _player2.default;