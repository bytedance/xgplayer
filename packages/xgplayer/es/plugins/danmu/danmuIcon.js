var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Plugin from '../../plugin';

var Util = Plugin.Util,
    POSITIONS = Plugin.POSITIONS;

var DanmuIcon = function (_Plugin) {
  _inherits(DanmuIcon, _Plugin);

  function DanmuIcon() {
    _classCallCheck(this, DanmuIcon);

    return _possibleConstructorReturn(this, (DanmuIcon.__proto__ || Object.getPrototypeOf(DanmuIcon)).apply(this, arguments));
  }

  _createClass(DanmuIcon, [{
    key: 'afterCreate',
    value: function afterCreate() {
      this.onStateChange = this.onStateChange.bind(this);
      this.bind(['click', 'touchend'], this.onStateChange);
    }
  }, {
    key: 'switchState',
    value: function switchState() {
      this.onStateChange();
    }
  }, {
    key: 'onStateChange',
    value: function onStateChange(e) {
      var dom = this.find('.danmu-switch');
      var isOpen = Util.hasClass(dom, 'danmu-switch-active');
      if (isOpen) {
        Util.removeClass(dom, 'danmu-switch-active');
      } else {
        Util.addClass(dom, 'danmu-switch-active');
      }
      this.config.onSwitch && this.config.onSwitch(!isOpen);
    }
  }, {
    key: 'show',
    value: function show() {
      this.root.sytle.display = 'flex';
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.unbind(['click', 'touchend'], this.getMini);
    }
  }, {
    key: 'render',
    value: function render() {
      return '\n    <xg-icon class="danmu-icon">\n      <dk-switch class="danmu-switch ' + (this.config.defaultOpen ? 'danmu-switch-active' : '') + '">\n        <span class="txt">\u5F39</span>\n      </dk-switch>\n    </xg-icon>';
    }
  }], [{
    key: 'pluginName',
    get: function get() {
      return 'danmuIcon';
    }
  }, {
    key: 'position',
    get: function get() {
      return {
        index: 7,
        gird: 'right'
      };
    }
  }, {
    key: 'defaultConfig',
    get: function get() {
      return {
        position: POSITIONS.CONTROLS_RIGTH,
        index: 11,
        onSwitch: function onSwitch(state) {},
        defaultOpen: false
      };
    }
  }]);

  return DanmuIcon;
}(Plugin);

export default DanmuIcon;