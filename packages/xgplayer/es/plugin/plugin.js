var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* an ui Plugin class
*
**/
import pluginsManager from './pluginsManager';
import BasePlugin from './basePlugin';
import * as delegate from 'delegate-events';

function _createElement(tag, name) {
  var dom = document.createElement(tag);
  dom.className = name;
  return dom;
}

function registerIconsObj(iconsConfig, plugin) {
  Object.keys(iconsConfig).map(function (iconKey) {
    Object.defineProperty(plugin.icons, iconKey, {
      get: function get() {
        var _icons = plugin.config.icons || plugin.playerConfig.icons;
        if (_icons && _icons[iconKey]) {
          return _icons[iconKey];
        } else {
          return iconsConfig[iconKey];
        }
      }
    });
  });
}

function registerTextObj(textConfig, plugin) {
  Object.keys(textConfig).map(function (key) {
    Object.defineProperty(plugin.text, key, {
      get: function get() {
        var lang = plugin.playerConfig.lang || 'zh';
        if (lang.indexOf('-') > 0) {
          lang = lang.split('-')[0];
        }
        return textConfig[key][lang];
      }
    });
  });
}

var Plugin = function (_BasePlugin) {
  _inherits(Plugin, _BasePlugin);

  _createClass(Plugin, null, [{
    key: 'insert',

    /**
      * 插入dom结构
      * @param {String} html html字符串或者dom
      * @param {DocumentElemebt } parent
      * @param {*} index
      */
    value: function insert(html, parent, index) {
      var len = parent.children.length;
      var insertIdx = parseInt(index);
      var isDomElement = html instanceof window.HTMLElement;
      if (typeof index === 'undefined' || len <= insertIdx) {
        isDomElement ? parent.appendChild(html) : parent.insertAdjacentHTML('beforeend', html);
        return parent.children[parent.children.length - 1];
      } else if (insertIdx === 0) {
        isDomElement ? parent.insertBefore(html, parent.children.length > 0 ? parent.children[0] : null) : parent.insertAdjacentHTML('afterbegin', html);
        return parent.children[0];
      }
      var el = parent.children[insertIdx];
      if (el && el.insertAdjacentHTML) {
        isDomElement ? parent.insertBefore(html, el) : el.insertAdjacentHTML('beforebegin', html);
        return parent.children[insertIdx];
      }
    }
  }, {
    key: 'defaultConfig',
    get: function get() {
      return {};
    }
  }]);

  function Plugin() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Plugin);

    return _possibleConstructorReturn(this, (Plugin.__proto__ || Object.getPrototypeOf(Plugin)).call(this, args));
  }

  _createClass(Plugin, [{
    key: '__init',
    value: function __init(args) {
      _get(Plugin.prototype.__proto__ || Object.getPrototypeOf(Plugin.prototype), '__init', this).call(this, args);
      var _parent = args.root;
      var _el = null;
      this.icons = {};
      var defaultIcons = this.registerIcons() || {};
      registerIconsObj(defaultIcons, this);

      this.text = {};
      var defaultTexConfig = this.registerLangauageTexts() || {};
      registerTextObj(defaultTexConfig, this);
      var renderStr = '';
      try {
        renderStr = this.render();
      } catch (e) {
        throw new Error('Plugin:' + this.pluginName + ':render:' + e.message);
      }
      if (renderStr) {
        _el = Plugin.insert(renderStr, _parent, args.index);
      } else if (args.tag) {
        _el = _createElement(args.tag, args.name);
        _parent.appendChild(_el);
      } else {
        return;
      }

      Plugin.defineGetterOrSetter(this, {
        'root': {
          get: function get() {
            return _el;
          }
        },
        'parent': {
          get: function get() {
            return _parent;
          }
        }
      });

      var attr = this.config.attr || {};
      var style = this.config.style || {};

      this.setAttr(attr);
      this.setStyle(style);
      if (this.config.index) {
        this.root.setAttribute('data-index', this.config.index);
      }
      this.__registeChildren();
    }
  }, {
    key: '__registeChildren',
    value: function __registeChildren() {
      if (!this.root) {
        return;
      }
      var children = this.children();
      if (children && (typeof children === 'undefined' ? 'undefined' : _typeof(children)) === 'object') {
        if (!this._children) {
          this._children = [];
        }
        if (Object.keys(children).length > 0) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = Object.keys(children)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var item = _step.value;

              var name = item;
              var _plugin = children[name];
              var options = {
                root: this.root
                // eslint-disable-next-line no-unused-vars
              };var config = void 0,
                  _Plugin = void 0;
              if (typeof _plugin === 'function') {
                config = this.config[name] || {};
                _Plugin = _plugin;
              } else if ((typeof _plugin === 'undefined' ? 'undefined' : _typeof(_plugin)) === 'object' && typeof _plugin.plugin === 'function') {
                config = _plugin.options ? BasePlugin.Util.deepCopy(this.config[name] || {}, _plugin.options) : this.config[name] || {};
                _Plugin = _plugin.plugin;
              }
              options.config = config;
              config.index !== undefined && (options.index = config.index);
              config.root && (options.root = config.root);
              var c = this.registerPlugin(_Plugin, options, name);
              this._children.push(c);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
      }
    }
  }, {
    key: 'plugins',
    value: function plugins() {
      return this._children;
    }
  }, {
    key: 'children',
    value: function children() {
      return {};
    }
  }, {
    key: 'registerPlugin',
    value: function registerPlugin(plugin) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

      options.root = options.root || this.root;
      name && (options.pluginName = name);
      var _c = pluginsManager.register(this.player, plugin, options);
      this._children.push(_c);
      return _c;
    }
  }, {
    key: 'registerIcons',
    value: function registerIcons() {
      return {};
    }
  }, {
    key: 'registerLangauageTexts',
    value: function registerLangauageTexts() {
      return {};
    }
  }, {
    key: 'getPlugin',
    value: function getPlugin(name) {
      return pluginsManager.findPlugin(this.player, name);
    }
  }, {
    key: 'find',
    value: function find(qs) {
      if (!this.root) {
        return;
      }
      return this.root.querySelector(qs);
    }
  }, {
    key: 'bind',
    value: function bind(querySelector, eventType, callback) {
      var _this2 = this;

      // if no querySelector passed to the method
      if (arguments.length < 3 && typeof eventType === 'function') {
        if (Array.isArray(querySelector)) {
          querySelector.forEach(function (item) {
            _this2.bindEL(item, eventType);
          });
        } else {
          this.bindEL(querySelector, eventType);
        }
      } else if (arguments.length === 3 && typeof callback === 'function') {
        if (!this.root) {
          return;
        }
        if (Array.isArray(eventType)) {
          eventType.forEach(function (item) {
            delegate.bind(_this2.root, querySelector, item, callback, false);
          });
        } else {
          delegate.bind(this.root, querySelector, eventType, callback, false);
        }
      }
    }
  }, {
    key: 'unbind',
    value: function unbind(querySelector, eventType, callback) {
      var _this3 = this;

      // if no querySelector passed to the method
      if (arguments.length < 3 && typeof eventType === 'function') {
        if (Array.isArray(querySelector)) {
          querySelector.forEach(function (item) {
            _this3.unbindEL(item, eventType);
          });
        } else {
          this.unbindEL(querySelector, eventType);
        }
      } else if (typeof callback === 'function') {
        if (Array.isArray(eventType)) {
          eventType.forEach(function (item) {
            delegate.unbind(_this3.root, querySelector, item, callback, false);
          });
        } else {
          delegate.unbind(this.root, querySelector, eventType, callback, false);
        }
      }
    }
  }, {
    key: 'setStyle',
    value: function setStyle(name, value) {
      if (!this.root) {
        return;
      }
      if (typeof name === 'string') {
        return this.root.style[name] = value;
      } else if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
        var obj = name;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = Object.keys(obj)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var item = _step2.value;

            this.root.style[item] = obj[item];
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }
  }, {
    key: 'setAttr',
    value: function setAttr(name, value) {
      if (!this.root) {
        return;
      }
      if (typeof name === 'string') {
        return this.root.setAttribute(name, value);
      } else if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
        var obj = name;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = Object.keys(obj)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var item = _step3.value;

            this.root.setAttribute(item, obj[item]);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
    }
  }, {
    key: 'setHtml',
    value: function setHtml(htmlStr, callback) {
      if (!this.root) {
        return;
      }
      this.root.innerHtml = htmlStr;
      if (typeof callback === 'function') {
        callback();
      }
    }
  }, {
    key: 'bindEL',
    value: function bindEL(event, eventHandle) {
      var isBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (!this.root) {
        return;
      }
      if ('on' + event in this.root && typeof eventHandle === 'function') {
        this.root.addEventListener(event, eventHandle, isBubble);
      }
    }
  }, {
    key: 'unbindEL',
    value: function unbindEL(event, eventHandle) {
      var isBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (!this.root) {
        return;
      }
      if ('on' + event in this.root && typeof eventHandle === 'function') {
        this.root.removeEventListener(event, eventHandle, isBubble);
      }
    }
  }, {
    key: 'show',
    value: function show(value) {
      if (!this.root) {
        return;
      }
      this.root.style.display = value !== undefined ? value : 'block';
      var cs = window.getComputedStyle(this.root, null);
      var cssDisplayValue = cs.getPropertyValue('display');
      if (cssDisplayValue === 'none') {
        return this.root.style.display = 'block';
      }
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.root && (this.root.style.display = 'none');
    }
  }, {
    key: 'render',
    value: function render() {
      return '';
    }
  }, {
    key: '_destroy',
    value: function _destroy() {
      this.offAll();
      if (BasePlugin.Util.checkIsFunction(this.destroy)) {
        this.destroy();
      }
      if (this.root) {
        if (this.root.hasOwnProperty('remove')) {
          this.root.remove();
        } else if (this.root.parentNode) {
          this.root.parentNode.removeChild(this.root);
        }
      }
    }
  }]);

  return Plugin;
}(BasePlugin);

export default Plugin;


Plugin.ROOT_TYPES = {
  CONTROLS: 'controls',
  ROOT: 'root'
};

Plugin.POSITIONS = {
  ROOT: 'root',
  ROOT_LEFT: 'rootLeft',
  ROOT_RIGHT: 'rootRight',
  ROOT_TOP: 'rootTop',
  CONTROLS_LEFT: 'controlsLeft',
  CONTROLS_RIGTH: 'controlsRight',
  CONTROLS_CENTER: 'controlsCenter'
};