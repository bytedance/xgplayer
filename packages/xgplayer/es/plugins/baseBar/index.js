var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Plugin from '../../plugin/plugin';

var BaseBar = function (_Plugin) {
  _inherits(BaseBar, _Plugin);

  function BaseBar() {
    _classCallCheck(this, BaseBar);

    return _possibleConstructorReturn(this, (BaseBar.__proto__ || Object.getPrototypeOf(BaseBar)).apply(this, arguments));
  }

  _createClass(BaseBar, [{
    key: 'afterCreate',
    value: function afterCreate() {
      this.center = this.find('.xg-top-bar');
      this.left = this.find('.xg-left-bar');
      this.right = this.find('.xg-right-bar');
      var config = this.config;

      if (config.width && !config.disable) {
        this.center.style.height = config.width + 'px';
        this.left.style.width = config.width + 'px';
        this.right.style.width = config.width + 'px';
      }
    }
  }, {
    key: 'registerPlugin',
    value: function registerPlugin(name, plugin) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (!options.root) {
        var position = options.config && options.config.position ? options.config.position : plugin.defaultConfig.position;
        var root = this[position] || this.center;
        options.root = root;
      }
      return _get(BaseBar.prototype.__proto__ || Object.getPrototypeOf(BaseBar.prototype), 'registerPlugin', this).call(this, name, plugin, options);
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.config.disable) {
        return '';
      }
      return '\n    <xg-bar>\n    <xg-bar class="xg-top-bar"></xg-bar>\n    <xg-bar class="xg-left-bar"></xg-bar>\n    <xg-bar class="xg-right-bar"></xg-bar>\n    </xg-bar>';
    }
  }], [{
    key: 'pluginName',
    get: function get() {
      return 'basebar';
    }
  }, {
    key: 'defaultConfig',
    get: function get() {
      return {
        disable: false,
        width: '50'
      };
    }
  }]);

  return BaseBar;
}(Plugin);

export default BaseBar;