'use strict';

var _player = require('../../player');

var _player2 = _interopRequireDefault(_player);

var _loading = require('../assets/loading.svg');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s_loading = function s_loading() {
  var player = this;
  var root = player.root;
  var util = _player2.default.util;
  var container = util.createDom('xg-loading', '' + _loading2.default, {}, 'xgplayer-loading');
  player.once('ready', function () {
    root.appendChild(container);
  });
};

_player2.default.install('s_loading', s_loading);