export var XgBuffer = function () {
  /**
   * A buffer to store loaded data.
   *
   * @class LoaderBuffer
   * @param {number} length - Optional the buffer size
   */
  function XgBuffer(length) {
    babelHelpers.classCallCheck(this, XgBuffer);

    this.length = length || 0;
    this.historyLen = length || 0;
    this.array = [];
    this.offset = 0;
  }

  /**
   * The function to push data.
   *
   * @param {number} data - The data to push into the buffer
   */


  babelHelpers.createClass(XgBuffer, [{
    key: "push",
    value: function push(data) {
      this.array.push(data);
      this.length += data.byteLength;
      this.historyLen += data.byteLength;
    }

    /**
     * The function to shift data.
     *
     * @param {number} length - The size of shift.
     */

  }, {
    key: "shift",
    value: function shift(length) {
      if (this.array.length < 1) {
        return new Uint8Array(0);
      }

      if (length === undefined) {
        return this._shiftBuffer();
      }
      if (this.offset + length === this.array[0].length) {
        var _ret = this.array[0].slice(this.offset, this.offset + length);
        this.offset = 0;
        this.array.shift();
        this.length -= length;
        return _ret;
      }

      if (this.offset + length < this.array[0].length) {
        var _ret2 = this.array[0].slice(this.offset, this.offset + length);
        this.offset += length;
        this.length -= length;
        return _ret2;
      }

      var ret = new Uint8Array(length);
      var tmpoff = 0;
      while (this.array.length > 0 && length > 0) {
        if (this.offset + length < this.array[0].length) {
          var tmp = this.array[0].slice(this.offset, this.offset + length);
          ret.set(tmp, tmpoff);
          this.offset += length;
          this.length -= length;
          length = 0;
          break;
        } else {
          // console.log('mark1')
          var templength = this.array[0].length - this.offset;
          ret.set(this.array[0].slice(this.offset, this.array[0].length), tmpoff);
          this.array.shift();
          this.offset = 0;
          tmpoff += templength;
          this.length -= templength;
          length -= templength;
        }
      }
      return ret;
    }

    /**
     * Function to clear the buffer.
     */

  }, {
    key: "clear",
    value: function clear() {
      this.array = [];
      this.length = 0;
      this.offset = 0;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.clear();
      this.historyLen = 0;
    }

    /**
     * Function to shift one unit8Array.
     */

  }, {
    key: "_shiftBuffer",
    value: function _shiftBuffer() {
      this.length -= this.array[0].length;
      this.offset = 0;
      return this.array.shift();
    }

    /**
     * Convert uint8 data to number.
     *
     * @param {number} start - the start postion.
     * @param {number} length - the length of data.
     */

  }, {
    key: "toInt",
    value: function toInt(start, length) {
      var retInt = 0;
      var i = this.offset + start;
      while (i < this.offset + length + start) {
        if (i < this.array[0].length) {
          retInt = retInt * 256 + this.array[0][i];
        } else if (this.array[1]) {
          retInt = retInt * 256 + this.array[1][i - this.array[0].length];
        }

        i++;
      }
      return retInt;
    }
  }]);
  return XgBuffer;
}();

export var RemuxBuffer = function () {
  function RemuxBuffer() {
    babelHelpers.classCallCheck(this, RemuxBuffer);

    this.video = [];
    this.audio = [];
  }

  babelHelpers.createClass(RemuxBuffer, [{
    key: "destroy",
    value: function destroy() {
      this.video = [];
      this.audio = [];
    }
  }]);
  return RemuxBuffer;
}();