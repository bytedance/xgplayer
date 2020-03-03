"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 音画同步调和器
 */
var AVReconciler = function () {
  function AVReconciler(props) {
    _classCallCheck(this, AVReconciler);

    this.aCtx = props.aCtx;
    this.vCtx = props.vCtx;
    this.video = props.video;
    this.timeoutId = null;
    this.start = null;
  }

  _createClass(AVReconciler, [{
    key: "doReconcile",
    value: function doReconcile() {
      var _this = this;

      var vCurTime = this.vCtx.currentTime || 0;
      var aCurTime = void 0;
      if (this.video.noAudio) {
        aCurTime = vCurTime;
      } else {
        aCurTime = this.aCtx.currentTime || 0;
      }

      var gap = vCurTime - aCurTime;
      if (this.timeoutId) {
        return;
      }
      if (gap > 200) {
        // audio delayed for more than 100ms
        this.video.start += gap;
        this.vCtx.pause();
        this.timeoutId = setTimeout(function () {
          _this.vCtx.play();
          _this.timeoutId = null;
        }, gap);
      } else if (gap < -120) {
        this.video.start += gap;
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.start = null;
      this.aCtx = null;
      this.vCtx = null;
    }
  }]);

  return AVReconciler;
}();

exports.default = AVReconciler;