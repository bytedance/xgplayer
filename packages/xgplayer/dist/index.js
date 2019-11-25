(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  var interopRequireDefault = function (obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _player = require('./player');

  var _player2 = interopRequireDefault(_player);

  var _volume = require('./controls/volume.js');

  var _volume2 = interopRequireDefault(_volume);

  var _start = require('./controls/start.js');

  var _start2 = interopRequireDefault(_start);

  var _screenShot = require('./controls/screenShot.js');

  var _screenShot2 = interopRequireDefault(_screenShot);

  var _rotate = require('./controls/rotate.js');

  var _rotate2 = interopRequireDefault(_rotate);

  var _replay = require('./controls/replay.js');

  var _replay2 = interopRequireDefault(_replay);

  var _playNext = require('./controls/playNext.js');

  var _playNext2 = interopRequireDefault(_playNext);

  var _play = require('./controls/play.js');

  var _play2 = interopRequireDefault(_play);

  var _pip = require('./controls/pip.js');

  var _pip2 = interopRequireDefault(_pip);

  var _pc = require('./controls/pc.js');

  var _pc2 = interopRequireDefault(_pc);

  var _mobile = require('./controls/mobile.js');

  var _mobile2 = interopRequireDefault(_mobile);

  var _memoryPlay = require('./controls/memoryPlay.js');

  var _memoryPlay2 = interopRequireDefault(_memoryPlay);

  var _logger = require('./controls/logger.js');

  var _logger2 = interopRequireDefault(_logger);

  var _localPreview = require('./controls/localPreview.js');

  var _localPreview2 = interopRequireDefault(_localPreview);

  var _i18n = require('./controls/i18n.js');

  var _i18n2 = interopRequireDefault(_i18n);

  var _fullscreen = require('./controls/fullscreen.js');

  var _fullscreen2 = interopRequireDefault(_fullscreen);

  var _download = require('./controls/download.js');

  var _download2 = interopRequireDefault(_download);

  var _definition = require('./controls/definition.js');

  var _definition2 = interopRequireDefault(_definition);

  var _danmu = require('./controls/danmu.js');

  var _danmu2 = interopRequireDefault(_danmu);

  var _cssFullscreen = require('./controls/cssFullscreen.js');

  var _cssFullscreen2 = interopRequireDefault(_cssFullscreen);

  var _collect = require('./controls/collect.js');

  var _collect2 = interopRequireDefault(_collect);

  var _skin = require('./skin');

  var _skin2 = interopRequireDefault(_skin);

  var Controls = {};

  function _buildTree(v, p, a) {
    var o = v;
    p.map(function (_, i) {
      o[_] = i == p.length - 1 ? a : o[_] || {};
      o = o[_];
    });
  }

  _buildTree(Controls, ['controls', 'collect'], _collect2.default);

  _buildTree(Controls, ['controls', 'cssFullscreen'], _cssFullscreen2.default);

  _buildTree(Controls, ['controls', 'danmu'], _danmu2.default);

  _buildTree(Controls, ['controls', 'definition'], _definition2.default);

  _buildTree(Controls, ['controls', 'download'], _download2.default);

  _buildTree(Controls, ['controls', 'fullscreen'], _fullscreen2.default);

  _buildTree(Controls, ['controls', 'i18n'], _i18n2.default);

  _buildTree(Controls, ['controls', 'localPreview'], _localPreview2.default);

  _buildTree(Controls, ['controls', 'logger'], _logger2.default);

  _buildTree(Controls, ['controls', 'memoryPlay'], _memoryPlay2.default);

  _buildTree(Controls, ['controls', 'mobile'], _mobile2.default);

  _buildTree(Controls, ['controls', 'pc'], _pc2.default);

  _buildTree(Controls, ['controls', 'pip'], _pip2.default);

  _buildTree(Controls, ['controls', 'play'], _play2.default);

  _buildTree(Controls, ['controls', 'playNext'], _playNext2.default);

  _buildTree(Controls, ['controls', 'replay'], _replay2.default);

  _buildTree(Controls, ['controls', 'rotate'], _rotate2.default);

  _buildTree(Controls, ['controls', 'screenShot'], _screenShot2.default);

  _buildTree(Controls, ['controls', 'start'], _start2.default);

  _buildTree(Controls, ['controls', 'volume'], _volume2.default);

  exports.default = _player2.default;
  module.exports = exports['default'];

})));
//# sourceMappingURL=index.js.map
