var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import downloadUtil from 'downloadjs';
import Plugin from '../../../plugin';
import './index.scss';

var DownloadIcon = function (_Plugin) {
  _inherits(DownloadIcon, _Plugin);

  _createClass(DownloadIcon, null, [{
    key: 'pluginName',
    get: function get() {
      return 'DownloadIcon';
    }
  }]);

  function DownloadIcon(args) {
    _classCallCheck(this, DownloadIcon);

    var _this = _possibleConstructorReturn(this, (DownloadIcon.__proto__ || Object.getPrototypeOf(DownloadIcon)).call(this, args));

    _this.timer = null;
    _this.isLock = false;
    return _this;
  }

  _createClass(DownloadIcon, [{
    key: 'afterCreate',
    value: function afterCreate() {
      var _this2 = this;

      this.download = this.download.bind(this);
      ['click', 'touchend'].forEach(function (event) {
        _this2.bind(event, _this2.download);
      });
    }
  }, {
    key: 'download',
    value: function download() {
      var _this3 = this;

      if (!this.isLock) {
        return;
      }
      var url = this.getAbsoluteURL(this.player.src);
      downloadUtil(url);
      this.isLock = true;
      this.timer = window.setTimeout(function () {
        _this3.isLock = false;
        window.clearTimeout(_this3.timer);
        _this3.timer = null;
      }, 300);
    }
  }, {
    key: 'getAbsoluteURL',
    value: function getAbsoluteURL(url) {
      // Check if absolute URL
      if (!url.match(/^https?:\/\//)) {
        var div = document.createElement('div');
        div.innerHTML = '<a href="' + url + '">x</a>';
        url = div.firstChild.href;
      }
      return url;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this4 = this;

      ['click', 'touchend'].forEach(function (event) {
        _this4.unbind(event, _this4.download);
      });
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }, {
    key: 'render',
    value: function render() {
      return '<xg-icon class="xgplayer-download">\n      <div class="xgplayer-icon btn-definition"><span>\u4E0B\u8F7D</span></div>\n    </xg-icon>';
    }
  }]);

  return DownloadIcon;
}(Plugin);

export default DownloadIcon;