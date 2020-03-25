var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import downloadUtil from 'downloadjs';
import Plugin from '../../plugin';
import DownloadSvg from '../assets/download.svg';
var POSITIONS = Plugin.POSITIONS;

var Download = function (_Plugin) {
  _inherits(Download, _Plugin);

  _createClass(Download, null, [{
    key: 'pluginName',
    get: function get() {
      return 'DownloadIcon';
    }
  }, {
    key: 'defaultConfig',
    get: function get() {
      return {
        position: POSITIONS.CONTROLS_RIGTH,
        index: 3,
        disable: true
      };
    }
  }]);

  function Download(args) {
    _classCallCheck(this, Download);

    var _this = _possibleConstructorReturn(this, (Download.__proto__ || Object.getPrototypeOf(Download)).call(this, args));

    _this.timer = null;
    _this.isLock = false;
    return _this;
  }

  _createClass(Download, [{
    key: 'beforeCreate',
    value: function beforeCreate(args) {
      if (typeof args.player.config.download === 'boolean') {
        args.config.disable = !args.player.config.download;
      }
    }
  }, {
    key: 'afterCreate',
    value: function afterCreate() {
      if (this.config.disable) {
        return;
      }
      this.appendChild('.xgplayer-icon', this.icons.download);
      this.download = this.download.bind(this);
      this.bind(['click', 'touchend'], this.download);
    }
  }, {
    key: 'registerLangauageTexts',
    value: function registerLangauageTexts() {
      return {
        download: {
          jp: 'フルスクリーン',
          en: 'download',
          zh: '下载'
        }
      };
    }
  }, {
    key: 'registerIcons',
    value: function registerIcons() {
      return {
        download: DownloadSvg
      };
    }
  }, {
    key: 'download',
    value: function download() {
      var _this2 = this;

      if (!this.isLock) {
        return;
      }
      var url = this.getAbsoluteURL(this.player.src);
      downloadUtil(url);
      this.isLock = true;
      this.timer = window.setTimeout(function () {
        _this2.isLock = false;
        window.clearTimeout(_this2.timer);
        _this2.timer = null;
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
      this.unbind(['click', 'touchend'], this.download);
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.config.disable) {
        return;
      }
      return '<xg-icon class="xgplayer-download">\n      <div class="xgplayer-icon">\n      </div>\n      <div class="xg-tips">' + this.text.download + '</div>\n    </xg-icon>';
    }
  }]);

  return Download;
}(Plugin);

export default Download;