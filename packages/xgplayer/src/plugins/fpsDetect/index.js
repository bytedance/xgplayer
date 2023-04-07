import BasePlugin, { Events } from '../../plugin'

/**
 * @typedef { {
 *   tick?: number,
 *   stuckCount?: number,
 *   disable?: boolean,
 *   reportFrame?: number
 * } } IFullscreenConfig
 */
export default class FpsDetect extends BasePlugin {
  static get pluginName () {
    return 'FpsDetect'
  }

  static get defaultConfig () {
    return {
      disabled:false,
      tick:1000, // tick时间，默认1000 ms
      stuckCount:3, // 三次
      reportFrame:0 // 每次解码帧率小于多少时统计
    }
  }

  afterCreate () {
    const { player, config } = this
    this.timer = null
    this._lastDecodedFrames = 0
    this._currentStuckCount = 0
    this._lastCheckPoint = null
    if (config.disabled) return
    const getVideoPlaybackQuality = player.media.getVideoPlaybackQuality
    if (!getVideoPlaybackQuality) return
    this.on(Events.PLAY, ()=>{
      this._startTick()
    })

    this.on(Events.PAUSE, ()=>{
      this._stopTick()
    })

    this.on(Events.ENDED, ()=>{
      this._stopTick()
    })

    this.on(Events.EMPTIED, ()=>{
      this._stopTick()
    })
  }

  _startTick (){
    this._stopTick()
    this._timer = setTimeout(()=>{
      this._checkDecodeFPS()
      this._startTick()
    }, this.config.tick)
  }

  _stopTick (){
    clearTimeout(this._timer)
    this._timer = null
  }

  _checkStuck (curDecodedFrames){
    const { media } = this.player
    const hidden = document.hidden
    const paused = media.paused
    if (typeof hidden === 'boolean' && !hidden && !paused){
      const curTime = media.currentTime
      const buffered = media.buffered
      let enoughBuffer = false
      for (let i = 0; i < buffered.length; i++){
        const start = buffered.start(i)
        const end = buffered.end(i)
        if (start <= curTime && curTime <= end - 1){
          enoughBuffer = true
          break
        }
      }
      if (media.readyState === 4 && enoughBuffer){
        if (this._currentStuckCount > this.config.stuckCount){
          this.emit(Events.FPS_STUCK)
          this._currentStuckCount = 0
        } else {
          if (curDecodedFrames <= this.config.reportFrame){
            this._currentStuckCount ++
          } else {
            this._currentStuckCount ++
          }
        }
      }
    }
  }

  _checkDecodeFPS (){
    if (!this.player.media){
      return
    }
    const { totalVideoFrames } = this.player.media.getVideoPlaybackQuality()
    const currTime = performance.now()
    if (totalVideoFrames){
      if (this._lastCheckPoint){
        const curDecoded = totalVideoFrames - this._lastDecodedFrames
        this._checkStuck(curDecoded)
      }
    }
    this._lastDecodedFrames = totalVideoFrames
    this._lastCheckPoint = currTime
  }

  destroy () {
    this._stopTick()
  }
}