export default class GopItem {
  constructor () {
    this.frames = []
    this.dur = 0
    this.minPts = Number.MAX_VALUE
    this.maxPts = 0
  }
  appendFrame (frame) {
    this.frames.push(frame)
    this.dur += frame.duration
  }
  calMinMaxPts (frame) {
    if (frame.pts < this.minPts){
      this.minPts = frame.pts
    }
    const pts = frame.pts + frame.duration
    if (pts > this.maxPts){
      this.maxPts = pts
    }
  }
}
