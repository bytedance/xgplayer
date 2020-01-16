"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ADTS = function () {
  function ADTS() {
    _classCallCheck(this, ADTS);
  }

  _createClass(ADTS, null, [{
    key: "isHeader",
    value: function isHeader(data, offset) {
      // Look for ADTS header | 1111 1111 | 1111 X00X | where X can be either 0 or 1
      // Layer bits (position 14 and 15) in header should be always 0 for ADTS
      // More info https://wiki.multimedia.cx/index.php?title=ADTS
      if (offset + 1 < data.length && ADTS.isHeaderPattern(data, offset)) {
        return true;
      }

      return false;
    }
  }, {
    key: "getFrameDuration",
    value: function getFrameDuration(samplerate) {
      return 1024 * 90000 / samplerate;
    }
  }, {
    key: "isHeaderPattern",
    value: function isHeaderPattern(data, offset) {
      return data[offset] === 0xff && (data[offset + 1] & 0xf6) === 0xf0;
    }
  }, {
    key: "getHeaderLength",
    value: function getHeaderLength(data, offset) {
      return data[offset + 1] & 0x01 ? 7 : 9;
    }
  }, {
    key: "getFullFrameLength",
    value: function getFullFrameLength(data, offset) {
      return (data[offset + 3] & 0x03) << 11 | data[offset + 4] << 3 | (data[offset + 5] & 0xE0) >>> 5;
    }
  }, {
    key: "parseFrameHeader",
    value: function parseFrameHeader(data, offset, pts, frameIndex, frameDuration) {
      var headerLength = void 0,
          frameLength = void 0,
          stamp = void 0;
      var length = data.length;

      // The protection skip bit tells us if we have 2 bytes of CRC data at the end of the ADTS header
      headerLength = ADTS.getHeaderLength(data, offset);
      // retrieve frame size
      frameLength = ADTS.getFullFrameLength(data, offset);
      frameLength -= headerLength;

      if (frameLength > 0 && offset + headerLength + frameLength <= length) {
        stamp = pts + frameIndex * frameDuration;
        // logger.log(`AAC frame, offset/length/total/pts:${offset+headerLength}/${frameLength}/${data.byteLength}/${(stamp/90).toFixed(0)}`);
        return { headerLength: headerLength, frameLength: frameLength, stamp: stamp };
      }

      return undefined;
    }
  }, {
    key: "appendFrame",
    value: function appendFrame(track, data, offset, pts, frameIndex) {
      var frameDuration = ADTS.getFrameDuration(track.meta.sampleRate);
      var header = ADTS.parseFrameHeader(data, offset, pts, frameIndex, frameDuration);
      if (header) {
        var stamp = header.stamp;
        var headerLength = header.headerLength;
        var frameLength = header.frameLength;

        // logger.log(`AAC frame, offset/length/total/pts:${offset+headerLength}/${frameLength}/${data.byteLength}/${(stamp/90).toFixed(0)}`);
        var aacSample = {
          unit: data.subarray(offset + headerLength, offset + headerLength + frameLength),
          pts: stamp,
          dts: stamp
        };

        return { sample: aacSample, length: frameLength + headerLength };
      }

      return undefined;
    }
  }]);

  return ADTS;
}();

exports.default = ADTS;