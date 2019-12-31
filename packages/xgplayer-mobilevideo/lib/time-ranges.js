"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TimeRanges = function () {
  function TimeRanges(ranges) {
    _classCallCheck(this, TimeRanges);

    this.ranges = ranges || [];
  }

  _createClass(TimeRanges, [{
    key: "start",
    value: function start(idx) {
      return this.ranges[idx] ? this.ranges[idx].start : 0;
    }
  }, {
    key: "end",
    value: function end(idx) {
      return this.ranges[idx] ? this.ranges[idx].end : 0;
    }
  }, {
    key: "add",
    value: function add(range) {
      this.ranges.push(range);
    }
  }, {
    key: "length",
    get: function get() {
      return this.ranges.length;
    }
  }]);

  return TimeRanges;
}();

exports.default = TimeRanges;