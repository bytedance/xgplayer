import { VideoTrack, AudioTrack, MetadataTrack, AudioSample, VideoSample } from '../model'
import { readBig32 } from '../utils'
import { MP4Parser } from './mp4-parser'
import { Logger } from './logger'
import Crypto from './crypto/crypto'
const NEW_ARRAY_MAX_CNT = 20
const DELETE_BOX_LIST = ['stts','stsc','stsz','stco','co64','stss', 'ctts']
export class MP4Demuxer {
  _videoSamples = []
  _audioSamples = []
  _lastRemainBuffer = []
  _lastRemainBufferStartPos = 0

  constructor (videoSegmnents, audioSegmnents, metadataTrack, options) {
    this.videoTrack = new VideoTrack()
    this.audioTrack = new AudioTrack()
    this.metadataTrack = metadataTrack || new MetadataTrack()
    this.videoSegmnents = videoSegmnents
    this.audioSegmnents = audioSegmnents
    this.log = new Logger('MP4Demuxer', options && options.openLog ? !options.openLog : true)
    this.memoryOpt = options?.memoryOpt
    if (!this.memoryOpt) {
      videoSegmnents && videoSegmnents.forEach(item => {
        this._videoSamples.push(...item.frames)
      })
      audioSegmnents && audioSegmnents.forEach(item => {
        this._audioSamples.push(...item.frames)
      })
    }
  }

  parseSamples (moov) {
    if (!moov) {
      throw new Error('moov is required')
    }
    if (!this.videoTrack.codec && !this.audioTrack.codec) {
      MP4Parser.moovToTrack(moov, this.videoTrack, this.audioTrack)
      this.videoSenc = this.videoTrack.videoSenc
      this.audioSenc = this.audioTrack.audioSenc
      // 把不用的释放掉,减少内存占用
      if (this.memoryOpt) {
        moov.trak.forEach(trak => {
          DELETE_BOX_LIST.forEach(type => {
            const box = trak.mdia.minf.stbl[type]
            if (box) {
              box.entries && (box.entries = null)
              box.entrySizes && (box.entrySizes = null)
            }
          })
        })
      }
    }
    // if (!this._audioSamples.length && !this._videoSamples.length) {
    //   const ret = MP4Parser.moovToSamples(moov)
    //   if (!ret) throw new Error('cannot parse samples from moov box')
    //   this._videoSamples = ret.videoSamples || []
    //   this._audioSamples = ret.audioSamples || []
    // }
  }

  demux (data, dataStart, videoIndexRange, audioIndexRange, moov) {
    this.parseSamples(moov)

    const videoTrack = this.videoTrack
    const audioTrack = this.audioTrack

    videoTrack.samples = []
    audioTrack.samples = []

    let sample
    let sampleData
    let startByte
    let findRes = {}
    if (videoIndexRange) {
      let frame
      let nalSize = 0
      if (this.memoryOpt) {
        findRes = this.getFramePosByIdx('video', videoIndexRange[0])
        if (!findRes) {
          throw new Error(`cannot found video frame #${videoIndexRange[0]}`)
        }
      }
      let { frameIdx, segmentIdx} = findRes
      for (let i = videoIndexRange[0], l = videoIndexRange[1]; i <= l; i++) {
        if (this.memoryOpt) {
          const ret = this.getFrameInfo('video', segmentIdx, frameIdx)
          sample = ret.sample
          segmentIdx = ret.segmentIdx
          frameIdx = ret.frameIdx
        } else {
          sample = this._videoSamples[i]
        }
        if (!sample) {
          throw new Error(`cannot found video frame #${i}`)
        }
        startByte = sample.offset - dataStart
        sampleData = data.subarray(startByte, startByte + sample.size)
        frame = new VideoSample(typeof sample.pts === 'number' ? sample.pts : sample.dts, sample.dts)
        frame.duration = sample.duration
        frame.gopId = sample.gopId
        if (sample.keyframe) frame.setToKeyframe()
        let start = 0
        const len = sampleData.length - 1
        while (start < len) {
          nalSize = readBig32(sampleData, start)
          start += 4
          frame.units.push(sampleData.subarray(start, start + nalSize))
          start += nalSize
        }
        videoTrack.samples.push(frame)
      }

      videoTrack.baseMediaDecodeTime = videoTrack.samples[0].dts
    }
    findRes = {}
    if (audioIndexRange) {
      if (this.memoryOpt) {
        findRes = this.getFramePosByIdx('audio', audioIndexRange[0])
        if (!findRes) {
          throw new Error(`cannot found video frame #${audioIndexRange[0]}`)
        }
      }
      let { frameIdx , segmentIdx} = findRes
      for (let i = audioIndexRange[0], l = audioIndexRange[1]; i <= l; i++) {
        if (this.memoryOpt) {
          const ret = this.getFrameInfo('audio', segmentIdx, frameIdx)
          sample = ret.sample
          segmentIdx = ret.segmentIdx
          frameIdx = ret.frameIdx
        } else {
          sample = this._audioSamples[i]
        }
        if (!sample) {
          throw new Error(`cannot found video frame #${i}`)
        }
        startByte = sample.offset - dataStart
        sampleData = data.subarray(startByte, startByte + sample.size)
        audioTrack.samples.push(new AudioSample(sample.dts, sampleData, sample.duration))
      }
      audioTrack.baseMediaDecodeTime = audioTrack.samples[0].dts
    }

    return {
      videoTrack,
      audioTrack,
      metadataTrack: this.metadataTrack
    }
  }

  demuxPart (data, dataStart, videoIndexRange, audioIndexRange, moov, useEME, kidValue, customDescryptHandler) {
    this.parseSamples(moov)

    this.videoTrack.useEME = useEME
    this.audioTrack.useEME = useEME
    // this.log.debug('[demuxPart start],dataStart,', dataStart, ',dataLen,', data.byteLength, ', lastRemain,', this._lastRemainBuffer ? this._lastRemainBuffer.byteLength : 0)
    if (this._lastRemainBuffer && this._lastRemainBuffer.byteLength > 0 && dataStart > this._lastRemainBufferStartPos && dataStart <= this._lastRemainBufferStartPos + this._lastRemainBuffer.byteLength) {
      let tryCnt = 0
      while (tryCnt < NEW_ARRAY_MAX_CNT) {
        try {
          const buffer = this._lastRemainBuffer.subarray(0, dataStart - this._lastRemainBufferStartPos)
          const temp = new Uint8Array(data.byteLength + buffer.byteLength)
          temp.set(buffer, 0)
          temp.set(new Uint8Array(data), buffer.byteLength)
          data = temp
          dataStart -= buffer.byteLength
          this._lastRemainBuffer = null
          this._lastRemainBufferStartPos = 0
          // this.log.debug('[demuxPart add lastRemain],dataStart,', dataStart, ',dataLen,', data.byteLength)
          break
        } catch (e) {
          if (tryCnt < NEW_ARRAY_MAX_CNT) {
            tryCnt++
          } else {
            throw new Error('new Uint8Array error:,' + e.errorMessage)
          }
        }
      }
    }
    const videoTrack = this.videoTrack
    const audioTrack = this.audioTrack

    videoTrack.samples = []
    audioTrack.samples = []
    videoTrack.videoSenc = null
    audioTrack.audioSenc = null

    let sample
    let sampleData
    let startByte
    let videoEndByte = 0
    let audioEndByte = 0
    let findRes = {}
    if (videoIndexRange.length > 0) {
      let frame
      const end = data.byteLength + dataStart
      if (this.memoryOpt) {
        findRes = this.getFramePosByIdx('video', videoIndexRange[0])
        if (!findRes) {
          throw new Error(`cannot found video frame #${videoIndexRange[0]}`)
        }
      }
      let { frameIdx, segmentIdx} = findRes
      for (let i = videoIndexRange[0]; i <= videoIndexRange[1]; i++) {
        if (this.memoryOpt) {
          const ret = this.getFrameInfo('video', segmentIdx, frameIdx)
          sample = ret.sample
          segmentIdx = ret.segmentIdx
          frameIdx = ret.frameIdx
        } else {
          sample = this._videoSamples[i]
        }
        if (!sample) {
          throw new Error(`cannot found video frame #${i}`)
        }
        if (sample.offset >= dataStart && sample.offset + sample.size <= end) {
          startByte = sample.offset - dataStart
          videoEndByte = startByte + sample.size
          sampleData = data.subarray(startByte, videoEndByte)
          frame = new VideoSample(typeof sample.pts === 'number' ? sample.pts : sample.dts, sample.dts)
          frame.duration = sample.duration
          // this.log.debug('[video !!!!!!!!],frame,index，', sample.index, ',segmentIdx', segmentIdx, ', dataStart,', dataStart, ',dataEnd', end, ',Samplestart,', sample.offset, ', SampleEnd,', sample.offset + sample.size, ',size,', sample.size, 'dts,', sample.dts, ',pts,', sample.pts, ', keyframe', sample.keyframe)
          frame.gopId = sample.gopId
          frame.sampleOffset = sample.index
          // frame.timeOffset = sample.timeOffset || sample.timeOffset === 0 ? sample.timeOffset : null
          if (sample.keyframe) frame.setToKeyframe()
          frame.data = sampleData
          frame.size = sample.size
          // this.log.debug('[demux video frame],frame,index，', sample.index, ', size,', sampleData.byteLength, ', hash ', hashVal(sampleData.toString()))
          videoTrack.samples.push(frame)
        }
      }
      if (videoTrack.samples.length > 0) {
        videoTrack.gopId = videoTrack.samples[0].gopId
        videoTrack.baseMediaDecodeTime = videoTrack.samples[0].dts
        videoTrack.startPts = videoTrack.samples[0].pts / videoTrack.timescale
        videoTrack.endPts = videoTrack.samples[videoTrack.samples.length - 1].pts / videoTrack.timescale
        videoTrack.startDts = videoTrack.samples[0].dts / videoTrack.timescale
        videoTrack.endDts = videoTrack.samples[videoTrack.samples.length - 1].dts / videoTrack.timescale
        // this.log.debug('[demux video],frame,startPts，', videoTrack.startPts, ', endPts,', videoTrack.endPts)
        if (this.videoSenc) {
          videoTrack.videoSenc = this.videoSenc.slice(videoTrack.samples[0].sampleOffset, videoTrack.samples[0].sampleOffset + videoTrack.samples.length)
          videoTrack.kidValue = kidValue
        }
      }
    }
    if (audioIndexRange.length > 0) {
      if (this.memoryOpt) {
        findRes = this.getFramePosByIdx('audio', audioIndexRange[0])
        if (!findRes) {
          throw new Error(`cannot found video frame #${audioIndexRange[0]}`)
        }
      }
      let { frameIdx, segmentIdx} = findRes
      for (let i = audioIndexRange[0]; i <= audioIndexRange[1]; i++) {
        if (this.memoryOpt) {
          const ret = this.getFrameInfo('audio', segmentIdx, frameIdx)
          sample = ret.sample
          segmentIdx = ret.segmentIdx
          frameIdx = ret.frameIdx
        } else {
          sample = this._audioSamples[i]
        }
        if (!sample) {
          throw new Error(`cannot found video frame #${i}`)
        }
        if (sample.offset >= dataStart && sample.offset + sample.size <= data.byteLength + dataStart) {
          startByte = sample.offset - dataStart
          audioEndByte = startByte + sample.size
          sampleData = data.subarray(startByte, audioEndByte)
          // this.log.debug('[audio !!!!!!!!],audio frame,index，', sample.index, ',segmentIdx', segmentIdx, ', Samplestart,', sample.offset, ', SampleEnd,', sample.offset + sample.size, ',size,', sample.size, 'dts,', sample.dts, ',pts,', sample.pts || sample.dts)
          // frame.gopId = sample.gopId
          // this.log.debug('[demux audio frame],index ,', sample.index, ', size,', sampleData.byteLength, ', hash,', hashVal(sampleData.toString()))
          audioTrack.samples.push(new AudioSample(sample.dts, sampleData, sample.duration, sample.index))
        }
      }
      if (audioTrack.samples.length > 0) {
        audioTrack.gopId = audioTrack.samples[0].gopId || videoTrack.gopId
        audioTrack.baseMediaDecodeTime = audioTrack.samples[0].dts
        audioTrack.startPts = audioTrack.samples[0].pts / audioTrack.timescale
        audioTrack.endPts = audioTrack.samples[audioTrack.samples.length - 1].pts / audioTrack.timescale
        // this.log.debug('[demux audio],frame,startPts，', audioTrack.startPts, ', endPts,', audioTrack.endPts)
        if (this.audioSenc) {
          audioTrack.audioSenc = this.audioSenc.slice(audioTrack.samples[0].sampleOffset, audioTrack.samples[0].sampleOffset + audioTrack.samples.length)
          audioTrack.kidValue = kidValue
        }
      }
    }
    this.decoderData(videoTrack, audioTrack, customDescryptHandler)
    let nalSize = 0
    for (let i = 0; i < videoTrack.samples.length; i++) {
      let start = 0
      const sampleData = videoTrack.samples[i].data
      const len = sampleData.length - 1
      while (start < len) {
        nalSize = readBig32(sampleData, start)
        start += 4
        videoTrack.samples[i].units.push(sampleData.subarray(start, start + nalSize))
        start += nalSize
      }
    }
    this._lastRemainBuffer = data.subarray(Math.max(videoEndByte, audioEndByte))
    if (this._lastRemainBuffer.byteLength > 0) {
      this._lastRemainBufferStartPos = dataStart + data.byteLength - this._lastRemainBuffer.byteLength
    } else {
      this._lastRemainBufferStartPos = 0
    }
    return {
      videoTrack,
      audioTrack,
      metadataTrack: this.metadataTrack
    }
  }

  reset () {
    // this._videoSamples = []
    // this._audioSamples = []
    this._lastRemainBuffer = null
    this._lastRemainBufferStartPos = 0
    this.videoTrack.reset()
    this.audioTrack.reset()
    this.metadataTrack.reset()
  }

  decoderData (videoTrack, audioTrack, customDescryptHandler) {
    if (videoTrack.useEME || audioTrack.useEME) return
    Crypto.decoderAESCTRData(videoTrack, audioTrack, customDescryptHandler)
  }

  static probe (data) {
    return MP4Parser.probe(data)
  }

  // 根据帧的index找出起始帧
  getFramePosByIdx (type, frameIdx) {
    const trak = type === 'video' ? this.videoSegmnents : this.audioSegmnents
    if (!trak || !trak?.length) return null
    let segmentIdx = 0
    let frames
    for (let idx = 0; idx < trak.length; idx++) {
      frames = trak[idx].frames
      if (frameIdx <= trak[idx].frames?.[frames?.length - 1].index) {
        segmentIdx = idx
        break
      }
    }

    const findFrameIdx = frames.findIndex(frame => frame.index === frameIdx)
    return {
      frameIdx: findFrameIdx,
      segmentIdx: segmentIdx
    }
  }

  getFrameInfo (type, segmentIdx, frameIdx) {
    const trak = type === 'video' ? this.videoSegmnents : this.audioSegmnents
    if (!trak) return {}
    const curSegmentFrameLen = trak[segmentIdx]?.frames?.length
    if (frameIdx < curSegmentFrameLen) {
      return {
        sample:trak[segmentIdx]?.frames[frameIdx],
        segmentIdx,
        frameIdx: frameIdx + 1
      }
    } else {
      return {
        sample:trak[segmentIdx + 1]?.frames[0],
        segmentIdx: segmentIdx + 1,
        frameIdx: 1
      }
    }
  }

}
