var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import BasePlugin from '../../plugin/basePlugin';

var TextTrackPlugin = function (_BasePlugin) {
  _inherits(TextTrackPlugin, _BasePlugin);

  function TextTrackPlugin() {
    _classCallCheck(this, TextTrackPlugin);

    return _possibleConstructorReturn(this, (TextTrackPlugin.__proto__ || Object.getPrototypeOf(TextTrackPlugin)).apply(this, arguments));
  }

  _createClass(TextTrackPlugin, [{
    key: 'afterCreate',
    value: function afterCreate() {
      var config = this.config,
          player = this.player;

      var options = config;
      var textTrackDom = '';
      if (options.textTrack && Array.isArray(options.textTrack) && (navigator.userAgent.indexOf('Chrome') > -1 || navigator.userAgent.indexOf('Firefox') > -1)) {
        options.textTrack.some(function (track) {
          if (track.src && track.label && track.default) {
            textTrackDom += '<track src="' + track.src + '" ';
            if (track.kind) {
              textTrackDom += 'kind="' + track.kind + '" ';
            }
            textTrackDom += 'label="' + track.label + '" ';
            if (track.srclang) {
              textTrackDom += 'srclang="' + track.srclang + '" ';
            }
            textTrackDom += (track.default ? 'default' : '') + '>';
            return true;
          }
        });
        this.videoConfig.crossorigin = 'anonymous';
      }
      if (options.textTrackStyle) {
        var style = document.createElement('style');
        this.textTrackStyle = style;
        document.head.appendChild(style);
        var styleStr = '';
        for (var index in options.textTrackStyle) {
          styleStr += index + ': ' + options.textTrackStyle[index] + ';';
        }
        var wrap = options.id ? '#' + options.id : options.el.id ? '#' + options.el.id : '.' + options.el.className;
        if (style.sheet.insertRule) {
          style.sheet.insertRule(wrap + ' video::cue { ' + styleStr + ' }', 0);
        } else if (style.sheet.addRule) {
          style.sheet.addRule(wrap + ' video::cue', styleStr);
        }
      }
      if (player.video) {
        player.video.insertAdjacentHTML('afterbegin', textTrackDom);
      }
    }
  }], [{
    key: 'pluginName',
    get: function get() {
      return 'textTrack';
    }
  }]);

  return TextTrackPlugin;
}(BasePlugin);

export default TextTrackPlugin;