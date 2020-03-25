'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plugin = require('../../plugin');

var _plugin2 = _interopRequireDefault(_plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Events = _plugin2.default.Events,
    Util = _plugin2.default.Util,
    Sniffer = _plugin2.default.Sniffer,
    POSITIONS = _plugin2.default.POSITIONS;

var DefinitionIcon = function (_Plugin) {
  _inherits(DefinitionIcon, _Plugin);

  _createClass(DefinitionIcon, null, [{
    key: 'pluginName',
    get: function get() {
      return 'Definition';
    }

    // 默认配置信息

  }, {
    key: 'defaultConfig',
    get: function get() {
      return {
        position: POSITIONS.CONTROLS_RIGTH,
        index: 3,
        list: null,
        disable: false,
        hideMobile: true // 是否在移动端竖屏状态下隐藏
      };
    }
  }]);

  function DefinitionIcon(args) {
    _classCallCheck(this, DefinitionIcon);

    // 记录切换的时候的播放器状态
    var _this = _possibleConstructorReturn(this, (DefinitionIcon.__proto__ || Object.getPrototypeOf(DefinitionIcon)).call(this, args));

    _this.curTime = 0;
    _this.isPaused = true;
    return _this;
  }

  _createClass(DefinitionIcon, [{
    key: 'afterCreate',
    value: function afterCreate() {
      var _this2 = this;

      this.once(Events.CANPLAY, function () {
        if (_this2.config.list && _this2.config.list.length > 0) {
          _this2.renderItemList();
          _this2.show();
        }
      });
      this.once('resourceReady', function (list) {
        _this2.changeDefinitionList(list);
      });
      if (Sniffer.device === 'mobile') {
        this.activeEvent = 'click';
      } else {
        this.activeEvent = 'mouseenter';
      }
      this.onToggle = this.onToggle.bind(this);
      this.onItemClick = this.onItemClick.bind(this);
      this.bind(this.activeEvent, this.onToggle);
      this.bind('mouseleave', this.onToggle);
      this.bind('.icon-list li', ['touched', 'click'], this.onItemClick);
    }
  }, {
    key: 'renderItemList',
    value: function renderItemList() {
      var player = this.player;
      var list = this.config.list;

      var src = player.config.url;
      var a = document.createElement('a');
      if (player.switchURL) {
        this.switchUrl();
      } else {
        src = player.currentSrc || player.src;
      }
      if (player['hls']) {
        a.href = player['hls'].url;
        src = a.href;
      }

      var liList = list.map(function (item) {
        a.href = item.url;
        var className = player.dash ? item.selected ? 'selected' : '' : a.href === src ? 'selected' : '';
        return '<li class="' + className + '" cname="' + item.name + '" url="' + item.url + '">' + item.name + '</li>';
      });
      var cursrc = list.filter(function (item) {
        a.href = item.url;
        if (player.dash) {
          return item.selected === true;
        } else {
          return a.href === src;
        }
      });
      this.find('.icon-text').innerHTML = (cursrc[0] || { name: '清晰度' }).name;
      this.find('.icon-list').innerHTML = liList.join('');
    }
  }, {
    key: 'onCanplayChangeDefinition',
    value: function onCanplayChangeDefinition() {
      var player = this.player;

      player.currentTime = this.curTime;
      if (!this.isPaused) {
        var playPromise = player.play();
        if (playPromise !== undefined && playPromise) {
          // eslint-disable-next-line handle-callback-err
          playPromise.catch(function (err) {});
        }
      }
      player.emit('afterdefinitionChange');
    }
  }, {
    key: 'onToggle',
    value: function onToggle(e) {
      e.preventDefault();
      e.stopPropagation();
      Util.hasClass(this.root, 'list-show') ? Util.removeClass(this.root, 'list-show') : Util.addClass(this.root, 'list-show');
    }
  }, {
    key: 'switchUrl',
    value: function switchUrl(lastATag) {
      var player = this.player;

      var curRUL = document.createElement('a');
      ['mp4', 'hls', '__flv__', 'dash'].every(function (item) {
        if (player[item]) {
          if (player[item].url) {
            curRUL.href = player[item].url;
          }
          if (item === '__flv__') {
            if (player[item]._options) {
              curRUL.href = player[item]._options.url;
            } else {
              curRUL.href = player[item]._mediaDataSource.url;
            }
          }
          return false;
        } else {
          return true;
        }
      });
      if (lastATag && curRUL.href !== lastATag.href && !player.ended) {
        player.switchURL(lastATag.href);
      }
    }

    // 对外暴露 切换清晰度

  }, {
    key: 'changeDefinitionList',
    value: function changeDefinitionList(list) {
      this.config.list = list;
      this.renderItemList();
      this.show();
    }
  }, {
    key: 'onItemClick',
    value: function onItemClick(e) {
      var _this3 = this;

      var player = this.player;
      var list = this.config.list;

      e.preventDefault();
      e.stopPropagation();
      if (e.target && e.target.className === 'selected') {
        return false;
      }
      var a = document.createElement('a');
      player.emit('beforeDefinitionChange', a.href);
      if (player.dash) {
        list.forEach(function (item) {
          item.selected = false;
          if (item.name === e.target.innerHTML) {
            item.selected = true;
          }
        });
      }
      var curlSelected = this.find('.selected');
      Util.addClass(e.target, 'selected');
      curlSelected && Util.removeClass(curlSelected, 'selected');
      var from = curlSelected ? curlSelected.getAttribute('cname') : '';
      var to = e.target.getAttribute('cname');
      a.href = e.target.getAttribute('url');
      this.curTime = player.currentTime;
      this.isPaused = player.paused;
      if (player.switchURL) {
        this.switchUrl(a);
      } else {
        // if (player['hls']) {
        //   let curRUL = document.createElement('a')
        //   curRUL = player['hls'].url
        // }
        if (a.href !== player.currentSrc) {
          if (!player.ended) {
            player.src = a.href;
            this.once('canplay', function () {
              _this3.onCanplayChangeDefinition();
            });
          }
        }
      }
      this.find('.icon-text').innerHTML = to;
      player.emit('definitionChange', { from: from, to: to });
      if (Sniffer.device === 'mobile') {
        Util.removeClass(this.root, 'list-show');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var text = '清晰度';
      return '<xg-icon class="xgplayer-definition">\n    <div class="xgplayer-icon btn-definition"><span class="icon-text">' + text + '</span></div>\n    <ul class="icon-list">\n    </ul>\n   </xg-icon>';
    }
  }]);

  return DefinitionIcon;
}(_plugin2.default);

exports.default = DefinitionIcon;