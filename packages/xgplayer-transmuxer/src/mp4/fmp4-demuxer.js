import { VideoTrack, AudioTrack, MetadataTrack, VideoSample, AudioSample } from '../model'
import { concatUint8Array, readBig32 } from '../utils'
import { MP4Parser } from './mp4-parser'

export class FMP4Demuxer {
  __loadedMoofWraps = []
  __lastRemainData = null
  __lastRemainDataStart = 0
  __nextMoofStart = -1


  constructor (videoTrack, audioTrack, metadataTrack) {
    this.videoTrack = videoTrack || new VideoTrack()
    this.audioTrack = audioTrack || new AudioTrack()
    this.metadataTrack = metadataTrack || new MetadataTrack()
  }

  demuxPart (partData, partDataStart, moov) {
    const { videoTrack, audioTrack } = this
    const videoExist = videoTrack.exist()
    const audioExist = audioTrack.exist()

    const isAV01 = /av01/.test(videoTrack.codec)
    videoTrack.samples = []
    audioTrack.samples = []

    let data = partData
    let dataStart = partDataStart
    if (this.__lastRemainData) {
      const lastRemainDataEnd = this.__lastRemainDataStart + this.__lastRemainData.byteLength
      // 如果遗留数据和新数据之间存在非包含关系的重叠，则需要合并，否则丢弃遗留数据
      // 如果遗留数据和新数据之间不存在重叠，需要丢弃遗留数据，保证后续的新数据可以连续的解析
      const continuous = partDataStart <= lastRemainDataEnd && partDataStart > this.__lastRemainDataStart && partDataStart + partData.byteLength > lastRemainDataEnd
      if (continuous) {
        // data = 遗留数据 + 新数据，为了程序健壮性，即可能存在重复的range，需要subarray规避
        const noDuplicateData = partData.subarray(this.__lastRemainData.byteLength + this.__lastRemainDataStart - partDataStart)
        data = concatUint8Array(this.__lastRemainData, noDuplicateData)
        dataStart = this.__lastRemainDataStart
        this.__lastRemainData = null
      } else {
        this.__lastRemainData = null
        this.__lastRemainDataStart = 0
        this.__nextMoofStart = -1
      }
    }

    if (!moov) {
      const moovBox = MP4Parser.findBox(data, ['moov'])[0]
      if (!moovBox) throw new Error('cannot found moov box')
      moov = MP4Parser.moov(moovBox)
    }

    if (data) {
      const dataEnd = dataStart + data.byteLength
      if (!videoExist && !audioExist) {
        MP4Parser.moovToTrack(moov, videoTrack, audioTrack)
      }
      // findBox要求参数由box header作为起始，故需要定位到moof的起始点，通过前一个moof计算出下一个moof的start位置，并保证解析的内容大于header的长度(8)
      const moofBoxes = []
      if (this.__nextMoofStart < 0) {
        MP4Parser.findBox(data, ['moof'], dataStart).forEach(v => moofBoxes.push(v))
      } else if (this.__nextMoofStart >= dataStart && this.__nextMoofStart <= dataEnd - 8) {
        MP4Parser.findBox(data.subarray(this.__nextMoofStart - dataStart), ['moof'], this.__nextMoofStart).forEach(v => moofBoxes.push(v))
      }
      moofBoxes.filter(moofBox => moofBox.size <= moofBox.data.length).forEach(moofBox => {
        const moof = MP4Parser.moof(moofBox)
        // 通过（trun.dataOffset + all samples的合并值）最大值计算得到下一个moof.start，也可以通过mdat box获取，此处为前者逻辑
        this.__nextMoofStart = moof.start + Math.max(...moof.traf.map(v => v.trun.samples.reduce((ret, w) => ret + w.size, v.trun.dataOffset || 0)))
        this.__loadedMoofWraps.push({
          start: moof.start,
          nextMoofStart: this.__nextMoofStart,
          moof
        })
        this.__loadedMoofWraps.sort((p, n) => p.start - n.start) // 排序，兼容seek
      })

      for (const moofWrap of this.__loadedMoofWraps) {
        // 跳过不需要解析的moof，减少非必要的损耗
        if (moofWrap.start > dataEnd || moofWrap.nextMoofStart < dataStart) {
          continue
        }
        const moofStart = moofWrap.start
        const tracks = MP4Parser.moofToSamples(moofWrap.moof, videoTrack, audioTrack)

        const videoBaseMediaDecodeTime = videoTrack.baseMediaDecodeTime
        const audioBaseMediaDecodeTime = audioTrack.baseMediaDecodeTime
        let nalSize
        Object.keys(tracks).forEach(k => {
          // eslint-disable-next-line
          if (videoTrack.id == k) {
            tracks[k]
              .some(x => {
                const xStart = x.offset += moofStart
                if (xStart < dataStart) {
                  return
                }
                // 如果当前sample已经超过了数据范围，则中断遍历
                if (xStart + x.size > dataEnd) {
                  return true
                }
                const sample = new VideoSample((x.pts || x.dts) + videoBaseMediaDecodeTime, x.dts + videoBaseMediaDecodeTime)
                sample.duration = x.duration
                sample.gopId = x.gopId
                if (x.keyframe) sample.setToKeyframe()
                const sampleData = data.subarray(xStart - dataStart, xStart - dataStart + x.size)
                sample.data = sampleData
                if (!isAV01) { // av1编码的数据不需要解析nals
                  let start = 0
                  const len = sampleData.length - 1
                  while (start < len) {
                    nalSize = readBig32(sampleData, start)
                    start += 4
                    sample.units.push(sampleData.subarray(start, start + nalSize))
                    start += nalSize
                  }
                }
                this.__lastRemainDataStart = xStart + x.size
                videoTrack.samples.push(sample)
              })
            // eslint-disable-next-line eqeqeq
          } else if (audioTrack.id == k) {
            tracks[k]
              .some(x => {
                const xStart = x.offset + moofStart
                if (xStart < dataStart) {
                  return
                }
                if (xStart + x.size > dataEnd) {
                  return true
                }
                const sampleData = data.subarray(xStart - dataStart, xStart - dataStart + x.size)
                audioTrack.samples.push(new AudioSample(x.dts + audioBaseMediaDecodeTime, sampleData, x.duration))
                this.__lastRemainDataStart = xStart + x.size
              })
          }
        })
      }
    }

    // 保存未解析的数据，下次解析时合并使用
    if (this.__lastRemainDataStart > dataStart && this.__lastRemainDataStart < data.byteLength + dataStart) {
      this.__lastRemainData = data.subarray(this.__lastRemainDataStart - dataStart)
    } else {
      this.__lastRemainData = data
      this.__lastRemainDataStart = dataStart
    }

    // fmp4中sample.pts是通过tfdt的baseMediaDecodeTime + sample.duration计算得出的
    // 所以此处sample的pts是多少不重要，反而需要确保demuxPart中baseMediaDecodeTime的值为起始帧的pts，才能保证remux后解析的结果与原始数据一致
    if (videoTrack.samples.length) {
      videoTrack.baseMediaDecodeTime = videoTrack.samples[0].pts
    }
    if (audioTrack.samples.length) {
      audioTrack.baseMediaDecodeTime = audioTrack.samples[0].pts
    }

    return {
      videoTrack,
      audioTrack,
      metadataTrack: this.metadataTrack
    }
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
              const sample = new VideoSample((x.pts || x.dts) + videoBaseMediaDecodeTime, x.dts + videoBaseMediaDecodeTime)
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
