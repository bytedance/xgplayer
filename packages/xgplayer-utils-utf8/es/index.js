var UTF8 = function () {
  function UTF8() {
    babelHelpers.classCallCheck(this, UTF8);
  }

  babelHelpers.createClass(UTF8, null, [{
    key: 'decode',
    value: function decode(uint8array) {
      var out = [];
      var input = uint8array;
      var i = 0;
      var length = uint8array.length;

      while (i < length) {
        if (input[i] < 0x80) {
          out.push(String.fromCharCode(input[i]));
          ++i;
          continue;
        } else if (input[i] < 0xC0) {
          // fallthrough
        } else if (input[i] < 0xE0) {
          if (UTF8._checkContinuation(input, i, 1)) {
            var ucs4 = (input[i] & 0x1F) << 6 | input[i + 1] & 0x3F;
            if (ucs4 >= 0x80) {
              out.push(String.fromCharCode(ucs4 & 0xFFFF));
              i += 2;
              continue;
            }
          }
        } else if (input[i] < 0xF0) {
          if (UTF8._checkContinuation(input, i, 2)) {
            var _ucs = (input[i] & 0xF) << 12 | (input[i + 1] & 0x3F) << 6 | input[i + 2] & 0x3F;
            if (_ucs >= 0x800 && (_ucs & 0xF800) !== 0xD800) {
              out.push(String.fromCharCode(_ucs & 0xFFFF));
              i += 3;
              continue;
            }
          }
        } else if (input[i] < 0xF8) {
          if (UTF8._checkContinuation(input, i, 3)) {
            var _ucs2 = (input[i] & 0x7) << 18 | (input[i + 1] & 0x3F) << 12 | (input[i + 2] & 0x3F) << 6 | input[i + 3] & 0x3F;
            if (_ucs2 > 0x10000 && _ucs2 < 0x110000) {
              _ucs2 -= 0x10000;
              out.push(String.fromCharCode(_ucs2 >>> 10 | 0xD800));
              out.push(String.fromCharCode(_ucs2 & 0x3FF | 0xDC00));
              i += 4;
              continue;
            }
          }
        }
        out.push(String.fromCharCode(0xFFFD));
        ++i;
      }

      return out.join('');
    }
  }, {
    key: '_checkContinuation',
    value: function _checkContinuation(uint8array, start, checkLength) {
      var array = uint8array;
      if (start + checkLength < array.length) {
        while (checkLength--) {
          if ((array[++start] & 0xC0) !== 0x80) {
            return false;
          }
        }
        return true;
      } else {
        return false;
      }
    }
  }]);
  return UTF8;
}();

export default UTF8;