import { MP4Demuxer, FMP4Remuxer } from 'xgplayer-transmuxer'
import util from '../util'
onmessage = function (e) {
  const data = e.data
  switch (data.method) {
    case 'init':{
      this.codecType = data.args.codecType
      this.openlog = data.args.openLog
      this.MP4Demuxer = null
      this.FMP4Remuxer = null
      this._needInitSegment = true
      this.supportHevc = data.args.supportHevc
      break
    }
    case 'transmux': {
      const args = e.data.args
      const buffer = new Uint8Array(e.data.buffer)
      if (!this.MP4Demuxer) {
        this.MP4Demuxer = new MP4Demuxer(null, null, null,{openlog: this.openlog})
      }
      const demuxRet = this.MP4Demuxer.demuxPart(buffer, args.start, args.videoIdx, args.audioIdx, args.moov, args.useEME, args.kidValue)
      if (!this.FMP4Remuxer && (this.codecType !== 'h265' || this.supportHevc)) {
        this.FMP4Remuxer = new FMP4Remuxer(this.MP4Demuxer.videoTrack, this.MP4Demuxer.audioTrack, {openLog: this.openlog})
      }
      let res
      if (this.FMP4Remuxer) {
        const remuxRes = this.FMP4Remuxer.remux(this._needInitSegment, {initMerge:true})
        remuxRes.initSegment && (this._needInitSegment = false)
        const buffer = util.concatData(remuxRes.audioSegment,remuxRes.videoSegment)
        res = {
          buffer,
          range:args.context.range,
          state: args.context.state,
          context: {
            range: args.context.range,
            fragIndex: args.context.fragIndex,
            startPts: Math.min(demuxRet.videoTrack.startPts, demuxRet.audioTrack.startPts),
            endPts: Math.max(demuxRet.videoTrack.endPts, demuxRet.audioTrack.endPts)
          },
          initSeg: remuxRes.initSegment
        }
      }
      this.postMessage({
        method: 'transmux',
        id: e.data.id,
        args: {
          ...res
        }
      })
      break
    }
    case 'reset': {
      this.FMP4Remuxer && this.FMP4Remuxer.reset()
      this.MP4Demuxer && this.MP4Demuxer.reset()
      this.FMP4Remuxer = null
      this.MP4Demuxer = null
      this._needInitSegment = true
      break
    }
    default:
    //
  }
}
