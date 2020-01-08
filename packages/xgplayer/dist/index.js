(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}((function () { 'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _player = require('./player');

	var _player2 = _interopRequireDefault(_player);

	require('./skin');

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _player2.default;
	module.exports = exports['default'];

})));
//# sourceMappingURL=index.js.map
