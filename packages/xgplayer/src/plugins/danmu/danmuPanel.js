import Plugin, {Sniffer, Util, POSITIONS} from '../../plugin'
import PanelIcon from '../assets/panel.svg'

class DanmuPanel extends Plugin {
  static get pluginName () {
    return 'danmuPanel'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGHT,
      index: 11,
      onChangeSet: (set) => {
        console.log(`DanmuPanel:${set}`)
      },
      speed: 1,
      area: {},
      opacity: 1,
      fonSize: 'middle'
    }
  }

  constructor (args) {
    super(args)
    this.set = {
      speed: 1, // 速度
      area: {}, // 区域
      opacity: 1, // 透明度
      fonSize: 'middle' // 字体
    }
  }

  afterCreate () {
    if (Sniffer.device === 'mobile') {
      this.activeEvent = 'click'
    } else {
      this.activeEvent = 'mouseenter'
    }
    this.onStateChange = this.onStateChange.bind(this)
    this.onToggle = this.onToggle.bind(this)
    this.bind(this.activeEvent, this.onToggle)
    this.bind('mouseleave', this.onToggle)
    this.appendChild('.xgplayer-panel-icon', PanelIcon())
    // this.bind(['click', 'touchend'], this.onStateChange)
  }

  onStateChange (e) {
    this.config.onChangeSet && this.config.onChangeSet(this.set)
  }

  onToggle (e) {
    e.preventDefault()
    e.stopPropagation()
    Util.hasClass(this.root, 'slider-show') ? Util.removeClass(this.root, 'slider-show') : Util.addClass(this.root, 'slider-show')
  }

  destroy () {
    this.unbind(['click', 'touchend'], this.onStateChange)
  }

  render () {
    return `
      <xg-icon class="xgplayer-panel">
          <xg-panel-icon class="xgplayer-panel-icon">
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
          </xg-panel-slider>
      </xg-icon>`
  }
}

export default DanmuPanel
