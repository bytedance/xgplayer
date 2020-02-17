import Player from '../../player';
import DanmuJs from 'danmu.js';
import PanelIcon from '../assets/panel.svg';

var s_danmu = function s_danmu() {
  var player = this;
  var root = player.root;
  var util = Player.util;
  if (!player.config.danmu) {
    return;
  }
  var container = util.createDom('xg-danmu', '', {}, 'xgplayer-danmu');
  player.once('ready', function () {
    root.appendChild(container);
  });
  var config = util.deepCopy({
    container: container,
    player: player.video,
    comments: [],
    area: {
      start: 0,
      end: 1
    }
  }, player.config.danmu);
  var panelBtn = void 0;
  if (player.config.danmu.panel) {
    panelBtn = Player.util.createDom('xg-panel', '<xg-panel-icon class="xgplayer-panel-icon">\n                                                ' + PanelIcon + '\n                                              </xg-panel-icon>\n                                              <xg-panel-slider class="xgplayer-panel-slider">\n                                                <xg-hidemode class="xgplayer-hidemode">\n                                                  <p class="xgplayer-hidemode-font">\u5C4F\u853D\u7C7B\u578B</p>\n                                                  <ul class="xgplayer-hidemode-radio">\n                                                    <li class="xgplayer-hidemode-scroll" id="false">\u6EDA\u52A8</li><li class="xgplayer-hidemode-top" id="false">\u9876\u90E8</li><li class="xgplayer-hidemode-bottom" id="false">\u5E95\u90E8</li><li class="xgplayer-hidemode-color" id="false">\u8272\u5F69</li>\n                                                  </ul>\n                                                </xg-hidemode>\n                                                <xg-transparency class="xgplayer-transparency">\n                                                  <span>\u4E0D\u900F\u660E\u5EA6</span>\n                                                  <input class="xgplayer-transparency-line xgplayer-transparency-color xgplayer-transparency-bar xgplayer-transparency-gradient" type="range" min="0" max="100" step="0.1" value="50"></input>\n                                                </xg-transparency>\n                                                <xg-showarea class="xgplayer-showarea">\n                                                  <div class="xgplayer-showarea-name">\u663E\u793A\u533A\u57DF</div>\n                                                  <div class="xgplayer-showarea-control">\n                                                    <div class="xgplayer-showarea-control-up">\n                                                      <span class="xgplayer-showarea-control-up-item xgplayer-showarea-onequarters">1/4</span>\n                                                      <span class="xgplayer-showarea-control-up-item xgplayer-showarea-twoquarters selected-color">1/2</span>\n                                                      <span class="xgplayer-showarea-control-up-item xgplayer-showarea-threequarters">3/4</span>\n                                                      <span class="xgplayer-showarea-control-up-item xgplayer-showarea-full">1</span>\n                                                    </div>\n                                                    <div class="xgplayer-showarea-control-down">\n                                                      <div class="xgplayer-showarea-control-down-dots">\n                                                        <span class="xgplayer-showarea-onequarters-dot"></span>\n                                                        <span class="xgplayer-showarea-twoquarters-dot"></span>\n                                                        <span class="xgplayer-showarea-threequarters-dot"></span>\n                                                        <span class="xgplayer-showarea-full-dot"></span>\n                                                      </div>\n                                                      <input class="xgplayer-showarea-line xgplayer-showarea-color xgplayer-showarea-bar xgplayer-gradient" type="range" min="1" max="4" step="1" value="1">\n                                                    </div>\n                                                  </div>\n                                                </xg-showarea>\n                                                <xg-danmuspeed class="xgplayer-danmuspeed">\n                                                  <div class="xgplayer-danmuspeed-name">\u5F39\u5E55\u901F\u5EA6</div>\n                                                  <div class="xgplayer-danmuspeed-control">\n                                                    <div class="xgplayer-danmuspeed-control-up">\n                                                      <span class="xgplayer-danmuspeed-control-up-item xgplayer-danmuspeed-small">\u6162</span>\n                                                      <span class="xgplayer-danmuspeed-control-up-item xgplayer-danmuspeed-middle selected-color">\u4E2D</span>\n                                                      <span class="xgplayer-danmuspeed-control-up-item xgplayer-danmuspeed-large">\u5FEB</span>\n                                                    </div>\n                                                    <div class="xgplayer-danmuspeed-control-down">\n                                                      <div class="xgplayer-danmuspeed-control-down-dots">\n                                                        <span class="xgplayer-danmuspeed-small-dot"></span>\n                                                        <span class="xgplayer-danmuspeed-middle-dot"></span>\n                                                        <span class="xgplayer-danmuspeed-large-dot"></span>\n                                                      </div>\n                                                      <input class="xgplayer-danmuspeed-line xgplayer-danmuspeed-color xgplayer-danmuspeed-bar xgplayer-gradient" type="range" min="50" max="150" step="50" value="100">\n                                                    </div>\n                                                  </div>\n                                                </xg-danmuspeed>\n                                                <xg-danmufont class="xgplayer-danmufont">\n                                                  <div class="xgplayer-danmufont-name">\u5B57\u4F53\u5927\u5C0F</div>\n                                                  <div class="xgplayer-danmufont-control">\n                                                    <div class="xgplayer-danmufont-control-up">\n                                                      <span class="xgplayer-danmufont-control-up-item xgplayer-danmufont-small">\u5C0F</span>\n                                                      <span class="xgplayer-danmufont-control-up-item xgplayer-danmufont-middle">\u4E2D</span>\n                                                      <span class="xgplayer-danmufont-control-up-item xgplayer-danmufont-large selected-color">\u5927</span>\n                                                    </div>\n                                                    <div class="xgplayer-danmufont-control-down">\n                                                      <div class="xgplayer-danmufont-control-down-dots">\n                                                        <span class="xgplayer-danmufont-small-dot"></span>\n                                                        <span class="xgplayer-danmufont-middle-dot"></span>\n                                                        <span class="xgplayer-danmufont-large-dot"></span>\n                                                      </div>\n                                                      <input class="xgplayer-danmufont-line xgplayer-danmufont-color xgplayer-danmufont-bar xgplayer-gradient" type="range" min="20" max="30" step="5" value="25">\n                                                    </div>\n                                                  </div>\n                                                </xg-danmufont>\n                                              </xg-panel-slider>', { tabindex: 7 }, 'xgplayer-panel');
    player.once('ready', function () {
      player.controls.appendChild(panelBtn);
    });
  }
  player.once('complete', function () {
    var danmujs = new DanmuJs(config);
    player.emit('initDefaultDanmu', danmujs);
    player.danmu = danmujs;

    if (!player.config.danmu.panel) {
      return;
    }

    var slider = panelBtn.querySelector('.xgplayer-panel-slider');
    var focusStatus = void 0;
    var focusarray = ['mouseenter', 'touchend', 'click'];
    focusarray.forEach(function (item) {
      panelBtn.addEventListener(item, function (e) {
        e.preventDefault();
        e.stopPropagation();
        Player.util.addClass(slider, 'xgplayer-panel-active');
        panelBtn.focus();
        focusStatus = true;
      });
    });
    panelBtn.addEventListener('mouseleave', function (e) {
      e.preventDefault();
      e.stopPropagation();
      Player.util.removeClass(slider, 'xgplayer-panel-active');
      focusStatus = false;
    });
    slider.addEventListener('mouseleave', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (focusStatus === false) {
        Player.util.removeClass(slider, 'xgplayer-panel-active');
      }
    });

    var danmuConfig = player.config.danmu;
    var hidemodeScroll = panelBtn.querySelector('.xgplayer-hidemode-scroll');
    var hidemodeTop = panelBtn.querySelector('.xgplayer-hidemode-top');
    var hidemodeBottom = panelBtn.querySelector('.xgplayer-hidemode-bottom');
    var hidemodeColor = panelBtn.querySelector('.xgplayer-hidemode-color');
    var hidemodeArray = {
      'scroll': hidemodeScroll,
      'top': hidemodeTop,
      'bottom': hidemodeBottom,
      'color': hidemodeColor
    };

    var _loop = function _loop(key) {
      var keys = key;
      var ev = ['touchend', 'click'];
      ev.forEach(function (item) {
        hidemodeArray[keys].addEventListener(item, function (e) {
          if (hidemodeArray[keys].getAttribute('id') !== 'true') {
            hidemodeArray[keys].style.color = '#f85959';
            hidemodeArray[keys].setAttribute('id', 'true');
            player.danmu.hide(keys);
          } else {
            hidemodeArray[keys].style.color = '#aaa';
            hidemodeArray[keys].setAttribute('id', 'false');
            player.danmu.show(keys);
          }
        });
      });
    };

    for (var key in hidemodeArray) {
      _loop(key);
    }
    var transparency = panelBtn.querySelector('.xgplayer-transparency-line');
    var transparencyGradient = panelBtn.querySelector('.xgplayer-transparency-gradient');
    var transparencyValue = 50;
    transparencyGradient.style.background = 'linear-gradient(to right, #f85959 0%, #f85959 ' + transparencyValue + '%, #aaa ' + transparencyValue + '%, #aaa)';
    transparency.addEventListener('input', function (e) {
      e.preventDefault();
      e.stopPropagation();
      transparencyValue = e.target.value;
      transparencyGradient.style.background = 'linear-gradient(to right, #f85959 0%, #f85959 ' + transparencyValue + '%, #aaa ' + transparencyValue + '%, #aaa)';
      danmuConfig.comments.forEach(function (item) {
        item.style.opacity = transparencyValue / 100;
      });
    });
    var showarea = panelBtn.querySelector('.xgplayer-showarea-line');
    showarea.addEventListener('input', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var showareaValue = e.target.value;
      player.danmu.config.area.end = showareaValue / 100;
      player.config.danmu.area.end = showareaValue / 100;
      player.danmu.bulletBtn.main.channel.resize();
    });
    var danmuspeed = panelBtn.querySelector('.xgplayer-danmuspeed-line');
    danmuspeed.addEventListener('input', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var danmuspeedValue = e.target.value;
      danmuConfig.comments.forEach(function (item) {
        item.duration = (200 - danmuspeedValue) * 100;
      });
    });
    var danmufont = panelBtn.querySelector('.xgplayer-danmufont-line');
    danmufont.addEventListener('input', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var danmufontValue = e.target.value;
      danmuConfig.comments.forEach(function (item) {
        item.style.fontSize = danmufontValue + 'px';
      });
    });
    if (navigator.userAgent.indexOf("Firefox") > -1) {
      for (var i = 0; i < slider.querySelectorAll('input').length; i++) {
        slider.querySelectorAll('input')[i].style.marginTop = '10px';
      }
    }
  });
};

Player.install('s_danmu', s_danmu);