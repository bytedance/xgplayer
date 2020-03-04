var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Plugin from '../../plugin';
import './index.scss';
var ROOT_TYPES = Plugin.ROOT_TYPES,
    POSITIONS = Plugin.POSITIONS;

var MiniScreenIcon = function (_Plugin) {
  _inherits(MiniScreenIcon, _Plugin);

  function MiniScreenIcon() {
    _classCallCheck(this, MiniScreenIcon);

    return _possibleConstructorReturn(this, (MiniScreenIcon.__proto__ || Object.getPrototypeOf(MiniScreenIcon)).apply(this, arguments));
  }

  _createClass(MiniScreenIcon, [{
    key: 'afterCreate',
    value: function afterCreate() {
      console.log('miniscreenIcon', this.config);
      this.getMini = this.getMini.bind(this);
      this.exitMini = this.exitMini.bind(this);
      this.bind(['click', 'touchend'], this.getMini);
    }
  }, {
    key: 'getMini',
    value: function getMini() {
      console.log('getMini');
      this.config.onClick && this.config.onClick();
    }
  }, {
    key: 'exitMini',
    value: function exitMini() {
      this.config.onClick && this.config.onClick();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.unbind(['click', 'touchend'], this.getMini);
    }

    // 扩展语言

  }, {
    key: 'registerLangauageTexts',
    value: function registerLangauageTexts() {
      return {
        'miniscreen': {
          jp: '日文text',
          en: 'miniscreen',
          zh: '小屏幕'
        }
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var text = this.text.miniscreen;
      return '\n      <xg-icon class="xgplayer-miniicon">\n       <p class="name"><span>' + text + '</span></p>\n      </xg-icon>';
    }
  }], [{
    key: 'pluginName',
    get: function get() {
      return 'miniscreenIcon';
    }
  }, {
    key: 'defaultConfig',
    get: function get() {
      return {
        position: POSITIONS.RIGHT,
        rootType: ROOT_TYPES.CONTROLS,
        index: 10
      };
    }
  }]);

  return MiniScreenIcon;
}(Plugin);

export default MiniScreenIcon;