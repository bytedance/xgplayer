var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RBSP = function () {
  function RBSP() {
    _classCallCheck(this, RBSP);
  }

  _createClass(RBSP, null, [{
    key: "EBSP2RBSP",

    /**
     * convert EBSP to RBSP
     * @param data {Uint8Array}
     * @returns {Uint8Array}
     * @constructor
     */
    value: function EBSP2RBSP(data) {
      return data.filter(function (el, idx) {
        if (idx < 2) {
          return true;
        } else {
          return !(data[idx - 2] === 0 && data[idx - 1] === 0 && el === 3);
        }
      });
    }

    /**
     * @param data {Uint8Array}
     * @constructor
     */

  }, {
    key: "EBSP2SODB",
    value: function EBSP2SODB(data) {
      var lastByte = data[data.byteLength - 1];
      if (lastByte && lastByte === 128) {
        return data.slice(0, data.byteLength - 1);
      }

      return data;
    }
  }]);

  return RBSP;
}();

export default RBSP;