(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  require('./theme.scss');

  var _music = require('./music');

  var _music2 = _interopRequireDefault(_music);

  var _prev = require('./controls/prev.js');

  var _prev2 = _interopRequireDefault(_prev);

  var _next = require('./controls/next.js');

  var _next2 = _interopRequireDefault(_next);

  var _meta = require('./controls/meta.js');

  var _meta2 = _interopRequireDefault(_meta);

  var _forward = require('./controls/forward.js');

  var _forward2 = _interopRequireDefault(_forward);

  var _cover = require('./controls/cover.js');

  var _cover2 = _interopRequireDefault(_cover);

  var _backward = require('./controls/backward.js');

  var _backward2 = _interopRequireDefault(_backward);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var Controls = {};

  function _buildTree(v, p, a) {
    var o = v;
    p.map(function (_, i) {
      o[_] = i == p.length - 1 ? a : o[_] || {};
      o = o[_];
    });
  }

  _buildTree(Controls, ['controls', 'backward'], _backward2.default);

  _buildTree(Controls, ['controls', 'cover'], _cover2.default);

  _buildTree(Controls, ['controls', 'forward'], _forward2.default);

  _buildTree(Controls, ['controls', 'meta'], _meta2.default);

  _buildTree(Controls, ['controls', 'next'], _next2.default);

  _buildTree(Controls, ['controls', 'prev'], _prev2.default);

  exports.default = _music2.default;
  module.exports = exports['default'];

})));
//# sourceMappingURL=index.js.map
