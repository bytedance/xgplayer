'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xgplayerTransmuxerConstantEvents = require('xgplayer-transmuxer-constant-events');

var _xgplayerTransmuxerConstantEvents2 = _interopRequireDefault(_xgplayerTransmuxerConstantEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BROWSER_EVENTS = _xgplayerTransmuxerConstantEvents2.default.BROWSER_EVENTS;
var hidden = void 0;
var visibilityChange = void 0;

if (typeof document.hidden !== 'undefined') {
  // Opera 12.10 and Firefox 18 and later support
  hidden = 'hidden';
  visibilityChange = 'visibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden';
  visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden';
  visibilityChange = 'webkitvisibilitychange';
}

var PageVisibility = function () {
  function PageVisibility() {
    _classCallCheck(this, PageVisibility);

    this.callbacks = {
      onShow: [],
      onHidden: []
    };
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.init();
  }

  _createClass(PageVisibility, [{
    key: 'init',
    value: function init() {
      document.addEventListener(visibilityChange, this.handleVisibilityChange, false);
    }
  }, {
    key: 'handleVisibilityChange',
    value: function handleVisibilityChange() {
      this.emit(BROWSER_EVENTS.VISIBILITY_CHANGE, document[hidden]);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      document.removeEventListener(visibilityChange, this.handleVisibilityChange);
    }
  }]);

  return PageVisibility;
}();

exports.default = PageVisibility;