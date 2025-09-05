import Plugin, { POSITIONS } from '../../plugin/plugin'
import Translate from './translate'
import Pic from './pic'
import Sum from './sum'
import './index.scss'

class AI extends Plugin {
  static get pluginName () {
    return 'ai'
  }

  static get defaultConfig () {
    return {
      position: POSITIONS.CONTROLS_RIGHT,
      index: 3
    }
  }

  beforePlayerInit () {
    this.translate = new Translate()
    this.pic = new Pic()
    this.sum = new Sum()
  }

  afterCreate () {
    this.translateBtn = this.root.querySelector('#xgplayer-ai-translate')
    this.picBtn = this.root.querySelector('#xgplayer-ai-pic')
    this.sumBtn = this.root.querySelector('#xgplayer-ai-sum')
    this.translateBtn.addEventListener('click', this.aiTranslate)
    this.picBtn.addEventListener('click', this.aiPic)
    this.sumBtn.addEventListener('click', this.aiSum)
  }

  destroy () {
    this.translateBtn.removeEventListener('click', this.aiTranslate)
    this.picBtn.removeEventListener('click', this.aiPic)
    this.sumBtn.removeEventListener('click', this.aiSum)
  }

  aiTranslate = () => {}
  aiPic = () => { }
  aiSum = () => { }

  render () {
    return `
    <xg-icon class="xgplayer-ai">
      <div class="xgplayer-ai-btn" id="xgplayer-ai-translate">
        <div class="xgplayer-ai-tip" id="xgplayer-ai-translate-tip">AI同传翻译</div>
        <div class="xgplayer-ai-btn-content"></div>
      </div>
      <div class="xgplayer-ai-btn" id="xgplayer-ai-pic">
        <div class="xgplayer-ai-tip" id="xgplayer-ai-pic-tip">AI识图分析</div>
        <div class="xgplayer-ai-btn-content"></div>
      </div>
      <div class="xgplayer-ai-btn" id="xgplayer-ai-sum">
        <div class="xgplayer-ai-tip" id="xgplayer-ai-sum-tip">AI视频总结</div>
        <div class="xgplayer-ai-btn-content"></div>
      </div>
    </xg-icon>`
  }
}

export default AI
