var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Plugin from '../../plugin';
import PlayNextIcon from '../assets/playNext.svg';

var PlayNext = function (_Plugin) {
  _inherits(PlayNext, _Plugin);

  _createClass(PlayNext, null, [{
    key: 'pluginName',
    get: function get() {
      return 'PlayNext';
    }
  }]);

  function PlayNext(options) {
    _classCallCheck(this, PlayNext);

    var _this = _possibleConstructorReturn(this, (PlayNext.__proto__ || Object.getPrototypeOf(PlayNext)).call(this, options));

    _this.urlList = options.urlList;
    _this.idx = -1;
    return _this;
  }

  _createClass(PlayNext, [{
    key: 'registerIcons',
    value: function registerIcons() {
      return {
        'playNext': PlayNextIcon
      };
    }
  }, {
    key: 'afterCreate',
    value: function afterCreate() {
      var _this2 = this;

      var player = this.player;

      this.bind('svg', 'click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (_this2.idx + 1 < _this2.urlList.length) {
          _this2.idx++;
          player.video.pause();
          player.currentTime = 0;
          player.video.autoplay = true;
          player.src = _this2.urlList[_this2.idx];
          player.emit('playerNext', _this2.idx + 1);
        } else {
          player.emit('urlList last');
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return '<xg-play-next class="xgplayer-play-next">\n      ' + this.icons.playNext + '\n    </xg-play-next>';
    }
  }]);

  return PlayNext;
}(Plugin);

export default PlayNext;