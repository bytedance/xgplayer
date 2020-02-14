'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

var _plugin = require('./plugin');

var _plugin2 = _interopRequireDefault(_plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_player2.default.BasePlugin = _plugin.BasePlugin;
// import * as Controls from './controls/*.js'
// import pc from './plugins/pc';

_player2.default.Plugin = _plugin2.default;
_player2.default.pluginsManager = _plugin.pluginsManager;
exports.default = _player2.default;