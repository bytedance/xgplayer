var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Plugin from '../../plugin';
import PanelIcon from '../assets/panel.svg';

var Sniffer = Plugin.Sniffer,
    Util = Plugin.Util,
    POSITIONS = Plugin.POSITIONS;

var DanmuPanel = function (_Plugin) {
  _inherits(DanmuPanel, _Plugin);

  _createClass(DanmuPanel, null, [{
    key: 'pluginName',
    get: function get() {
      return 'DanmuPanel';
    }
  }, {
    key: 'defaultConfig',
    get: function get() {
      return {
        position: POSITIONS.CONTROLS_RIGTH,
        index: 11,
        onChangeSet: function onChangeSet(set) {
          console.log('DanmuPanel:' + set);
        },
        speed: 1,
        area: {},
        opacity: 1,
        fonSize: 'middle'
      };
    }
  }]);

  function DanmuPanel(args) {
    _classCallCheck(this, DanmuPanel);

    var _this = _possibleConstructorReturn(this, (DanmuPanel.__proto__ || Object.getPrototypeOf(DanmuPanel)).call(this, args));

    _this.set = {
      speed: 1, // 速度
      area: {}, // 区域
      opacity: 1, // 透明度
      fonSize: 'middle' // 字体
    };
    return _this;
  }

  _createClass(DanmuPanel, [{
    key: 'afterCreate',
    value: function afterCreate() {
      if (Sniffer.device === 'mobile') {
        this.activeEvent = 'click';
      } else {
        this.activeEvent = 'mouseenter';
      }
      this.onStateChange = this.onStateChange.bind(this);
      this.onToggle = this.onToggle.bind(this);
      this.bind(this.activeEvent, this.onToggle);
      this.bind('mouseleave', this.onToggle);
      // this.bind(['click', 'touchend'], this.onStateChange)
    }
  }, {
    key: 'onStateChange',
    value: function onStateChange(e) {
      this.config.onChangeSet && this.config.onChangeSet(this.set);
    }
  }, {
    key: 'onToggle',
    value: function onToggle(e) {
      e.preventDefault();
      e.stopPropagation();
      Util.hasClass(this.root, 'slider-show') ? Util.removeClass(this.root, 'slider-show') : Util.addClass(this.root, 'slider-show');
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.unbind(['click', 'touchend'], this.onStateChange);
    }
  }, {
    key: 'render',
    value: function render() {
      return '\n      <xg-icon class="xgplayer-panel">\n          <xg-panel-icon class="xgplayer-panel-icon">\n            ' + PanelIcon + '\n          </xg-panel-icon>\n          <xg-panel-slider class="xgplayer-panel-slider">\n            <xg-hidemode class="xgplayer-hidemode">\n              <p class="xgplayer-hidemode-font">\u5C4F\u853D\u7C7B\u578B</p>\n              <ul class="xgplayer-hidemode-radio">\n                <li class="xgplayer-hidemode-scroll" id="false">\u6EDA\u52A8</li><li class="xgplayer-hidemode-top" id="false">\u9876\u90E8</li><li class="xgplayer-hidemode-bottom" id="false">\u5E95\u90E8</li><li class="xgplayer-hidemode-color" id="false">\u8272\u5F69</li>\n              </ul>\n            </xg-hidemode>\n            <xg-transparency class="xgplayer-transparency">\n              <span>\u4E0D\u900F\u660E\u5EA6</span>\n              <input class="xgplayer-transparency-line xgplayer-transparency-color xgplayer-transparency-bar xgplayer-transparency-gradient" type="range" min="0" max="100" step="0.1" value="50"></input>\n            </xg-transparency>\n            <xg-showarea class="xgplayer-showarea">\n              <div class="xgplayer-showarea-name">\u663E\u793A\u533A\u57DF</div>\n              <div class="xgplayer-showarea-control">\n                <div class="xgplayer-showarea-control-up">\n                  <span class="xgplayer-showarea-control-up-item xgplayer-showarea-onequarters">1/4</span>\n                  <span class="xgplayer-showarea-control-up-item xgplayer-showarea-twoquarters selected-color">1/2</span>\n                  <span class="xgplayer-showarea-control-up-item xgplayer-showarea-threequarters">3/4</span>\n                  <span class="xgplayer-showarea-control-up-item xgplayer-showarea-full">1</span>\n                </div>\n                <div class="xgplayer-showarea-control-down">\n                  <div class="xgplayer-showarea-control-down-dots">\n                    <span class="xgplayer-showarea-onequarters-dot"></span>\n                    <span class="xgplayer-showarea-twoquarters-dot"></span>\n                    <span class="xgplayer-showarea-threequarters-dot"></span>\n                    <span class="xgplayer-showarea-full-dot"></span>\n                  </div>\n                  <input class="xgplayer-showarea-line xgplayer-showarea-color xgplayer-showarea-bar xgplayer-gradient" type="range" min="1" max="4" step="1" value="1">\n                </div>\n              </div>\n            </xg-showarea>\n            <xg-danmuspeed class="xgplayer-danmuspeed">\n              <div class="xgplayer-danmuspeed-name">\u5F39\u5E55\u901F\u5EA6</div>\n              <div class="xgplayer-danmuspeed-control">\n                <div class="xgplayer-danmuspeed-control-up">\n                  <span class="xgplayer-danmuspeed-control-up-item xgplayer-danmuspeed-small">\u6162</span>\n                  <span class="xgplayer-danmuspeed-control-up-item xgplayer-danmuspeed-middle selected-color">\u4E2D</span>\n                  <span class="xgplayer-danmuspeed-control-up-item xgplayer-danmuspeed-large">\u5FEB</span>\n                </div>\n                <div class="xgplayer-danmuspeed-control-down">\n                  <div class="xgplayer-danmuspeed-control-down-dots">\n                    <span class="xgplayer-danmuspeed-small-dot"></span>\n                    <span class="xgplayer-danmuspeed-middle-dot"></span>\n                    <span class="xgplayer-danmuspeed-large-dot"></span>\n                  </div>\n                  <input class="xgplayer-danmuspeed-line xgplayer-danmuspeed-color xgplayer-danmuspeed-bar xgplayer-gradient" type="range" min="50" max="150" step="50" value="100">\n                </div>\n              </div>\n            </xg-danmuspeed>\n            <xg-danmufont class="xgplayer-danmufont">\n              <div class="xgplayer-danmufont-name">\u5B57\u4F53\u5927\u5C0F</div>\n              <div class="xgplayer-danmufont-control">\n                <div class="xgplayer-danmufont-control-up">\n                  <span class="xgplayer-danmufont-control-up-item xgplayer-danmufont-small">\u5C0F</span>\n                  <span class="xgplayer-danmufont-control-up-item xgplayer-danmufont-middle">\u4E2D</span>\n                  <span class="xgplayer-danmufont-control-up-item xgplayer-danmufont-large selected-color">\u5927</span>\n                </div>\n                <div class="xgplayer-danmufont-control-down">\n                  <div class="xgplayer-danmufont-control-down-dots">\n                    <span class="xgplayer-danmufont-small-dot"></span>\n                    <span class="xgplayer-danmufont-middle-dot"></span>\n                    <span class="xgplayer-danmufont-large-dot"></span>\n                  </div>\n                  <input class="xgplayer-danmufont-line xgplayer-danmufont-color xgplayer-danmufont-bar xgplayer-gradient" type="range" min="20" max="30" step="5" value="25">\n                </div>\n              </div>\n            </xg-danmufont>\n          </xg-panel-slider>\n      </xg-icon>';
    }
  }]);

  return DanmuPanel;
}(Plugin);

export default DanmuPanel;