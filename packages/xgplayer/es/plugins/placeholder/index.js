var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { BasePlugin } from '../../plugin';

var PlaceHolderPlugin = function (_BasePlugin) {
  _inherits(PlaceHolderPlugin, _BasePlugin);

  function PlaceHolderPlugin() {
    _classCallCheck(this, PlaceHolderPlugin);

    return _possibleConstructorReturn(this, (PlaceHolderPlugin.__proto__ || Object.getPrototypeOf(PlaceHolderPlugin)).apply(this, arguments));
  }

  _createClass(PlaceHolderPlugin, [{
    key: 'render',
    value: function render() {
      return '<xg-placeholder class="xgplayer-placeholder">\n    </xg-placeholder>';
    }
  }], [{
    key: 'pluginName',
    get: function get() {
      return 'placeholder';
    }
  }]);

  return PlaceHolderPlugin;
}(BasePlugin);

export default PlaceHolderPlugin;