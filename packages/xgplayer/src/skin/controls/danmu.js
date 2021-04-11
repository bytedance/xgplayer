import { createDom, deepCopy, addClass, removeClass } from '../../utils/util'
import DanmuJs from 'danmu.js'
import PanelIcon from '../assets/panel.svg'
import '../style/controls/danmu.scss'

let s_danmu = function () {
  let player = this
  let root = player.root
  if(!player.config.danmu) { return }
  let container = createDom('xg-danmu', '', {}, 'xgplayer-danmu')
  player.once('ready', () => {
    root.appendChild(container)
  })
  let config = deepCopy({
    container,
    player: player.video,
    comments: [],
    area: {
      start: 0,
      end: 1
    }
  }, player.config.danmu)
  let panelBtn
  if (player.config.danmu.panel) {
    panelBtn = createDom('xg-panel', `<xg-panel-icon class="xgplayer-panel-icon">
                                                ${PanelIcon}
                                              </xg-panel-icon>
                                              <xg-panel-slider class="xgplayer-panel-slider">
                                                <xg-hidemode class="xgplayer-hidemode">
                                                  <p class="xgplayer-hidemode-font">屏蔽类型</p>
                                                  <ul class="xgplayer-hidemode-radio">
                                                    <li class="xgplayer-hidemode-scroll" id="false">滚动</li><li class="xgplayer-hidemode-top" id="false">顶部</li><li class="xgplayer-hidemode-bottom" id="false">底部</li><li class="xgplayer-hidemode-color" id="false">色彩</li>
                                                  </ul>
                                                </xg-hidemode>
                                                <xg-transparency class="xgplayer-transparency">
                                                  <span>不透明度</span>
                                                  <input class="xgplayer-transparency-line xgplayer-transparency-color xgplayer-transparency-bar xgplayer-transparency-gradient" type="range" min="0" max="100" step="0.1" value="50"></input>
                                                </xg-transparency>
                                                <xg-showarea class="xgplayer-showarea">
                                                  <div class="xgplayer-showarea-name">显示区域</div>
                                                  <div class="xgplayer-showarea-control">
                                                    <div class="xgplayer-showarea-control-up">
                                                      <span class="xgplayer-showarea-control-up-item xgplayer-showarea-onequarters">1/4</span>
                                                      <span class="xgplayer-showarea-control-up-item xgplayer-showarea-twoquarters selected-color">1/2</span>
                                                      <span class="xgplayer-showarea-control-up-item xgplayer-showarea-threequarters">3/4</span>
                                                      <span class="xgplayer-showarea-control-up-item xgplayer-showarea-full">1</span>
                                                    </div>
                                                    <div class="xgplayer-showarea-control-down">
                                                      <div class="xgplayer-showarea-control-down-dots">
                                                        <span class="xgplayer-showarea-onequarters-dot"></span>
                                                        <span class="xgplayer-showarea-twoquarters-dot"></span>
                                                        <span class="xgplayer-showarea-threequarters-dot"></span>
                                                        <span class="xgplayer-showarea-full-dot"></span>
                                                      </div>
                                                      <input class="xgplayer-showarea-line xgplayer-showarea-color xgplayer-showarea-bar xgplayer-gradient" type="range" min="1" max="4" step="1" value="1">
                                                    </div>
                                                  </div>
                                                </xg-showarea>
                                                <xg-danmuspeed class="xgplayer-danmuspeed">
                                                  <div class="xgplayer-danmuspeed-name">弹幕速度</div>
                                                  <div class="xgplayer-danmuspeed-control">
                                                    <div class="xgplayer-danmuspeed-control-up">
                                                      <span class="xgplayer-danmuspeed-control-up-item xgplayer-danmuspeed-small">慢</span>
                                                      <span class="xgplayer-danmuspeed-control-up-item xgplayer-danmuspeed-middle selected-color">中</span>
                                                      <span class="xgplayer-danmuspeed-control-up-item xgplayer-danmuspeed-large">快</span>
                                                    </div>
                                                    <div class="xgplayer-danmuspeed-control-down">
                                                      <div class="xgplayer-danmuspeed-control-down-dots">
                                                        <span class="xgplayer-danmuspeed-small-dot"></span>
                                                        <span class="xgplayer-danmuspeed-middle-dot"></span>
                                                        <span class="xgplayer-danmuspeed-large-dot"></span>
                                                      </div>
                                                      <input class="xgplayer-danmuspeed-line xgplayer-danmuspeed-color xgplayer-danmuspeed-bar xgplayer-gradient" type="range" min="50" max="150" step="50" value="100">
                                                    </div>
                                                  </div>
                                                </xg-danmuspeed>
                                                <xg-danmufont class="xgplayer-danmufont">
                                                  <div class="xgplayer-danmufont-name">字体大小</div>
                                                  <div class="xgplayer-danmufont-control">
                                                    <div class="xgplayer-danmufont-control-up">
                                                      <span class="xgplayer-danmufont-control-up-item xgplayer-danmufont-small">小</span>
                                                      <span class="xgplayer-danmufont-control-up-item xgplayer-danmufont-middle">中</span>
                                                      <span class="xgplayer-danmufont-control-up-item xgplayer-danmufont-large selected-color">大</span>
                                                    </div>
                                                    <div class="xgplayer-danmufont-control-down">
                                                      <div class="xgplayer-danmufont-control-down-dots">
                                                        <span class="xgplayer-danmufont-small-dot"></span>
                                                        <span class="xgplayer-danmufont-middle-dot"></span>
                                                        <span class="xgplayer-danmufont-large-dot"></span>
                                                      </div>
                                                      <input class="xgplayer-danmufont-line xgplayer-danmufont-color xgplayer-danmufont-bar xgplayer-gradient" type="range" min="20" max="30" step="5" value="25">
                                                    </div>
                                                  </div>
                                                </xg-danmufont>
                                              </xg-panel-slider>`, {tabindex: 7}, 'xgplayer-panel')
    player.once('ready', () => {
      player.controls.appendChild(panelBtn)
    })
  }
  player.once('complete', () => {
    let danmujs = new DanmuJs(config)
    player.emit('initDefaultDanmu', danmujs)
    player.danmu = danmujs

    if (!player.config.danmu.panel) {
      return
    }

    let slider = panelBtn.querySelector('.xgplayer-panel-slider')
    let focusStatus
    let focusarray = ['mouseenter', 'touchend', 'click']
    focusarray.forEach(item => {
      panelBtn.addEventListener(item, function (e) {
        e.preventDefault()
        e.stopPropagation()
        addClass(slider, 'xgplayer-panel-active')
        panelBtn.focus()
        focusStatus = true
      })
    })
    panelBtn.addEventListener('mouseleave', function (e) {
      e.preventDefault()
      e.stopPropagation()
      removeClass(slider, 'xgplayer-panel-active')
      focusStatus = false
    })
    slider.addEventListener('mouseleave', function (e) {
      e.preventDefault()
      e.stopPropagation()
      if (focusStatus === false) {
        removeClass(slider, 'xgplayer-panel-active')
      }
    })

    let danmuConfig = player.config.danmu
    let hidemodeScroll = panelBtn.querySelector('.xgplayer-hidemode-scroll')
    let hidemodeTop = panelBtn.querySelector('.xgplayer-hidemode-top')
    let hidemodeBottom = panelBtn.querySelector('.xgplayer-hidemode-bottom')
    let hidemodeColor = panelBtn.querySelector('.xgplayer-hidemode-color')
    let hidemodeArray = {
      'scroll': hidemodeScroll,
      'top': hidemodeTop,
      'bottom': hidemodeBottom,
      'color': hidemodeColor
    }
    for (let key in hidemodeArray) {
      let keys = key
      let ev = ['touchend', 'click']
      ev.forEach(item => {
        hidemodeArray[keys].addEventListener(item, function (e) {
          if (hidemodeArray[keys].getAttribute('id') !== 'true') {
            hidemodeArray[keys].style.color = '#f85959'
            hidemodeArray[keys].setAttribute('id', 'true')
            player.danmu.hide(keys)
          } else {
            hidemodeArray[keys].style.color = '#aaa'
            hidemodeArray[keys].setAttribute('id', 'false')
            player.danmu.show(keys)
          }
        })
      })
    }
    let transparency = panelBtn.querySelector('.xgplayer-transparency-line')
    let transparencyGradient = panelBtn.querySelector('.xgplayer-transparency-gradient')
    let transparencyValue = 50
    transparencyGradient.style.background = 'linear-gradient(to right, #f85959 0%, #f85959 ' + transparencyValue + '%, #aaa ' + transparencyValue + '%, #aaa)'
    transparency.addEventListener('input', function (e) {
      e.preventDefault()
      e.stopPropagation()
      transparencyValue = e.target.value
      transparencyGradient.style.background = 'linear-gradient(to right, #f85959 0%, #f85959 ' + transparencyValue + '%, #aaa ' + transparencyValue + '%, #aaa)'
      danmuConfig.comments.forEach(item => {
        item.style.opacity = transparencyValue / 100
      })
    })
    let showarea = panelBtn.querySelector('.xgplayer-showarea-line')
    showarea.addEventListener('input', function (e) {
      e.preventDefault()
      e.stopPropagation()
      let showareaValue = e.target.value
      player.danmu.config.area.end = showareaValue / 100
      player.config.danmu.area.end = showareaValue / 100
      player.danmu.bulletBtn.main.channel.resize()
    })
    let danmuspeed = panelBtn.querySelector('.xgplayer-danmuspeed-line')
    danmuspeed.addEventListener('input', function (e) {
      e.preventDefault()
      e.stopPropagation()
      let danmuspeedValue = e.target.value
      danmuConfig.comments.forEach(item => {
        item.duration = (200 - danmuspeedValue) * 100
      })
    })
    let danmufont = panelBtn.querySelector('.xgplayer-danmufont-line')
    danmufont.addEventListener('input', function (e) {
      e.preventDefault()
      e.stopPropagation()
      let danmufontValue = e.target.value
      danmuConfig.comments.forEach(item => {
        item.style.fontSize = danmufontValue + 'px'
      })
    })
    if(navigator.userAgent.indexOf("Firefox") > -1) {
      for (let i = 0; i < slider.querySelectorAll('input').length; i++) {
        slider.querySelectorAll('input')[i].style.marginTop = '10px'
      }
    }
  })
}

export default {
  name: 's_danmu',
  method: s_danmu
}