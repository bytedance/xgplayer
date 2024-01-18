import { VideoTrack, AudioTrack, MetadataTrack, VideoSample, AudioSample } from '../model'
import { readBig32 } from '../utils'
import { MP4Parser } from './mp4-parser'

export class FMP4Demuxer {
  constructor (videoTrack, audioTrack, metadataTrack) {
    this.videoTrack = videoTrack || new VideoTrack()
    this.audioTrack = audioTrack || new AudioTrack()
    this.metadataTrack = metadataTrack || new MetadataTrack()
  }

  demux (videoData, audioData) {
    const { videoTrack, audioTrack } = this
    const videoExist = videoTrack.exist()
    const audioExist = audioTrack.exist()
    videoTrack.samples = []
    audioTrack.samples = []

    if (audioData) {
      if (!audioExist) {
        const moovBox = MP4Parser.findBox(audioData, ['moov'])[0]
        if (!moovBox) throw new Error('cannot found moov box')
        MP4Parser.moovToTrack(MP4Parser.moov(moovBox), null, audioTrack)
      }
      const moofBox = MP4Parser.findBox(audioData, ['moof'])[0]
      if (moofBox) {
        const samples = MP4Parser.moofToSamples(MP4Parser.moof(moofBox), null, audioTrack)[audioTrack.id]
        const baseMediaDecodeTime = audioTrack.baseMediaDecodeTime
        if (samples) {
          const baseOffset = moofBox.start
          samples.map(x => {
            x.offset += baseOffset
            const sampleData = audioData.subarray(x.offset, x.offset + x.size)
            audioTrack.samples.push(new AudioSample(x.dts + baseMediaDecodeTime, sampleData, x.duration))
          })
        }
      }
    }

    if (videoData) {
      if (!videoExist && !audioExist) {
        const moovBox = MP4Parser.findBox(videoData, ['moov'])[0]
        if (!moovBox) throw new Error('cannot found moov box')
        MP4Parser.moovToTrack(MP4Parser.moov(moovBox), videoTrack, audioTrack)
      }
      const moofBox = MP4Parser.findBox(videoData, ['moof'])[0]
      if (moofBox) {
        const tracks = MP4Parser.moofToSamples(MP4Parser.moof(moofBox), videoTrack, audioTrack)
        const videoBaseMediaDecodeTime = videoTrack.baseMediaDecodeTime
        const audioBaseMediaDecodeTime = audioTrack.baseMediaDecodeTime
        const baseOffset = moofBox.start
        let nalSize
        Object.keys(tracks).forEach(k => {
          // eslint-disable-next-line eqeqeq
          if (videoTrack.id == k) {
            tracks[k].map(x => {
              x.offset += baseOffset
              const sample = new VideoSample((typeof x.pts === 'number' ? x.pts : x.dts) + videoBaseMediaDecodeTime, x.dts + videoBaseMediaDecodeTime)
              sample.duration = x.duration
              sample.gopId = x.gopId
              if (x.keyframe) sample.setToKeyframe()
              const sampleData = videoData.subarray(x.offset, x.offset + x.size)
              sample.data = sampleData
              let start = 0
              const len = sampleData.length - 1
              while (start < len) {
                nalSize = readBig32(sampleData, start)
                start += 4
                sample.units.push(sampleData.subarray(start, start + nalSize))
                start += nalSize
              }
              videoTrack.samples.push(sample)
            })
            // eslint-disable-next-line eqeqeq
          } else if (audioTrack.id == k) {
            tracks[k].map(x => {
              x.offset += baseOffset
              const sampleData = videoData.subarray(x.offset, x.offset + x.size)
              audioTrack.samples.push(new AudioSample(x.dts + audioBaseMediaDecodeTime, sampleData, x.duration))
            })
          }
        })
      }
    }

    return {
      videoTrack,
      audioTrack,
      metadataTrack: this.metadataTrack
    }
  }

  reset () {
    this.videoTrack.reset()
    this.audioTrack.reset()
    this.metadataTrack.reset()
  }

  static probe (data) {
    return MP4Parser.probe(data)
  }
}
