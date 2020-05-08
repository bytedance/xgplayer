var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SourceBuffer = function () {
  function SourceBuffer(config) {
    _classCallCheck(this, SourceBuffer);

    this.config = Object.assign({}, config);
    this.type = this.config.type;
    this.reset();
  }

  _createClass(SourceBuffer, [{
    key: "reset",
    value: function reset() {
      this.buffer = [];
      this.currentGop = undefined;
      this._lastGet = undefined;
    }
  }, {
    key: "push",
    value: function push(frame) {
      // if (this.type === 'video') {
      //   if (frame.isKeyframe) {
      //     let currentGop = {
      //       samples: [],
      //       start: frame.dts,
      //       end: frame.dts,
      //       nextGop: undefined
      //     };
      //     if (this.currentGop) {
      //       this.currentGop.nextGop = currentGop;
      //     }
      //     this.currentGop = currentGop;
      //     this.buffer.push(this.currentGop);
      //   }
      //
      //   if (this.currentGop) {
      //     this.currentGop.samples.push(frame);
      //
      //     if (frame.dts < this.currentGop.start) {
      //       this.currentGop.start = frame.dts;
      //     }
      //
      //     if (frame.dts > this.currentGop.end) {
      //       this.currentGop.end = frame.dts;
      //     }
      //   }
      // }
      this.buffer.push(frame);
    }
  }, {
    key: "get",
    value: function get(time) {
      return this.buffer.shift();
    }
  }, {
    key: "_getNext",
    value: function _getNext() {
      if (!this._lastGet) {
        var gop = this.buffer[0];
        if (gop.samples.length < 1) {
          return;
        }

        this._lastGet = {
          gop: gop,
          index: 0
        };
        return gop.samples[0];
      } else {
        var _gop = this._lastGet.gop;
        var sample = _gop.samples[this._lastGet.index + 1];
        if (sample) {
          this._lastGet.index = this._lastGet.index + 1;
          return sample;
        } else {
          _gop = _gop.nextGop;
          if (!_gop || _gop.samples.length < 1) {
            return;
          }
          sample = _gop.samples[0];
          this._lastGet = {
            gop: _gop,
            index: 0
          };
          return sample;
        }
      }
    }
  }, {
    key: "remove",
    value: function remove(start, end) {
      if (this.buffer.length < 0) {
        return;
      }

      var i = 0;
      var gop = this.buffer[0];
      while (gop) {
        if (gop.end < end && gop.start >= start) {
          this.buffer.splice(i, 1);
          gop = this.buffer[i];
        } else {
          i += 1;
          gop = this.buffer[i];
        }
      }
    }
  }]);

  return SourceBuffer;
}();

export default SourceBuffer;