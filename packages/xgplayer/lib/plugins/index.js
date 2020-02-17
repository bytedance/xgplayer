'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDefaultPlugins;

require('../skin/style/variable.scss');

var _poster = require('./poster');

var _poster2 = _interopRequireDefault(_poster);

var _replay = require('./replay');

var _replay2 = _interopRequireDefault(_replay);

var _mini = require('./Controls/mini');

var _mini2 = _interopRequireDefault(_mini);

var _keyboard = require('./keyboard');

var _keyboard2 = _interopRequireDefault(_keyboard);

var _rotate = require('./Controls/rotate');

var _rotate2 = _interopRequireDefault(_rotate);

var _start = require('./start');

var _start2 = _interopRequireDefault(_start);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 根据入参的播放器配置进行默认plugin列表的配置
 * @param {object} playerConfig
 */
function getDefaultPlugins(playerConfig) {
  var defaultPlugins = [];
  defaultPlugins.push(_replay2.default);
  defaultPlugins.push(_poster2.default);
  defaultPlugins.push(_start2.default);
  defaultPlugins.push({
    plugin: _mini2.default,
    options: {
      root: 'controls'
    }
  });
  defaultPlugins.push({
    plugin: _rotate2.default,
    options: {
      root: 'controls'
    }
  });
  defaultPlugins.push(_keyboard2.default);
  var plugins = playerConfig.plugins || [];
  var retPlugins = defaultPlugins.concat(plugins);
  return retPlugins;
}