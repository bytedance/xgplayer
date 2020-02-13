import Plugin from '../../../plugin'


const {Events} = Plugin
/**
 * 进度条组件
 */
class Progress extends Plugin {
  static get pluginName () {
    return 'Progress'
  }

  static get defaultConfig () {
    return {
      progressDot: []
    }
  }

  constructor (args) {
    super(args)
    this.useable = false
  }

  changeState (useable = true) {
    this.useable = useable
  }

  afterCreate () {
    this.playedBar = this.find('.xgplayer-progress-played')
    this.cachedBar = this.find('.xgplayer-progress-cache')
    this.pointTip = this.find('.xgplayer-progress-cache')
    this.progressBtn = this.find('.xgplayer-progress-btn')
    this.on(Events.TIME_UPDATE, () => {
      this.onTimeupdate()
    });
    this.on([Events.BUFFER_CHANGE, Events.ENDED], this.onCacheUpdate)
  }

  onTimeupdate () {}

  onCacheUpdate () {}

  render () {
    return `
      <xg-progress class="xgplayer-progress">
        <xg-outer class="xgplayer-progress-outer">
          <xg-cache class="xgplayer-progress-cache" style="width:0">
          </xg-cache>
          <xg-played class="xgplayer-progress-played" style="width:0">
            <xg-progress-btn class="xgplayer-progress-btn"></xg-progress-btn>
            <xg-point class="xgplayer-progress-point xgplayer-tips">01:22</xg-point>
            <xg-thumbnail class="xgplayer-progress-thumbnail xgplayer-tips"></xg-thumbnail>
          </xg-played>
        </xg-outer>
      </xg-progress>
    `
  }
}

export default Progress
