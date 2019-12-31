'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Source = function Source() {
  _classCallCheck(this, Source);

  this.mimetype = '';
  this.init = null;
  this.data = [];
};

var PreSource = function () {
  function PreSource() {
    _classCallCheck(this, PreSource);

    this.sources = {};
  }

  _createClass(PreSource, [{
    key: 'getSource',
    value: function getSource(source) {
      return this.sources[source];
    }
  }, {
    key: 'createSource',
    value: function createSource(name) {
      this.sources[name] = new Source();
      return this.sources[name];
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.sources = {};
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.sources = {};
    }
  }]);

  return PreSource;
}();

exports.default = PreSource;