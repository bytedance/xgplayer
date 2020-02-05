import Plugin from '../../../plugin'
import './index.scss'

class Progress extends Plugin {
  static get pluginName () {
    return 'Progress'
  }

  render () {
    return `
      <xg-progress class="xgplayer-progress">
        <xg-outer class="xgplayer-progress-outer">
          <xg-cache class="xgplayer-progress-cache" style="width:0">
          </xg-cache>
          <xg-played class="xgplayer-progress-played" style="width:0">
            <xg-progress-btn class="xgplayer-progress-btn"></xg-progress-btn>
            <xg-point class="xgplayer-progress-point xgplayer-tips">01:22</xg-point>
            <xg-thumbnail class="xgplayer-progress-thumbnail xgplayer-tips" style="width: 160px; height: 90px; background-image: url(&quot;./xgplayer-demo-thumbnail.jpg&quot;); background-position: 0px -360px; left: 592px; top: -100px; display: none;"></xg-thumbnail>
          </xg-played>
        </xg-outer>
      </xg-progress>
    `
  }
}

export default Progress
