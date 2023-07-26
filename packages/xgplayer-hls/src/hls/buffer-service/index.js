import { TsDemuxer, MP4Parser } from 'xgplayer-transmuxer'
import { MSE, Buffer, ERR, StreamingError, Logger, EVENT } from 'xgplayer-streaming-shared'
import { Decryptor } from './decrypt'
import { Transmuxer } from './transmuxer'
import { Event } from '../constants'

const logger = new Logger('BufferService')

export class BufferService {
  _decryptor = new Decryptor()
  /** @type {Transmuxer} */
  _transmuxer = null
  /** @type {MSE} */
  _mse = null
  _softVideo = null
  _sourceCreated = false
  _needInitSegment = true
  _directAppend = false

  constructor (hls) {
    this.hls = hls
    if (hls.config.softDecode) { // soft decode
      this._softVideo = hls.media
    } else {
      this._mse = new MSE()

      if (hls.config.url) {
        this._mse.bindMedia(hls.media)
      }
    }

    // If a third-party decryption module is configured, use it
    if (hls.config.decryptor) {
      this._decryptor.externalDecryptor = hls.config.decryptor
    }
  }

  get baseDts () {
    return this._transmuxer?._demuxer?._fixer?._baseDts
  }

  get nbSb () {
    if (!this._mse?._sourceBuffer) return 0

    return Object.keys(this._mse._sourceBuffer).length
  }

  get msIsOpend () {
    return this._mse?.isOpened
  }

  async updateDuration (duration) {
    logger.debug('update duration', duration)
    if (this._mse) {
      if (!this._mse.isOpened) {
        await this._mse.open()
      }
      await this._mse.updateDuration(duration)
    } else if (this._softVideo) {
      this._softVideo.duration = duration
    }
  }

  createSource (videoChunk, audioChunk, videoCodec, audioCodec) {
    if (this._sourceCreated) return
    const chunk = videoChunk || audioChunk
    if (!chunk) return
    if (TsDemuxer.probe(chunk)) {
      if (!this._transmuxer) this._transmuxer = new Transmuxer(this.hls, false, !this._softVideo)
    } else if (MP4Parser.probe(chunk)) {
      if (this._softVideo) {
        if (!this._transmuxer) this._transmuxer = new Transmuxer(this.hls, true)
      } else {
        this._directAppend = true
        let mix = false
        if (videoChunk && !videoCodec) {
          MP4Parser.findBox(videoChunk, ['moov', 'trak']).forEach(t => {
            const box = MP4Parser.findBox(t.data, ['trak', 'mdia', 'minf', 'stbl', 'stsd'])[0]
            if (box) {
              const e = MP4Parser.stsd(box).entries[0]
              if (e) {
                if (e.hvcC) {
                  videoCodec = e.hvcC.codec || 'hev1.1.6.L93.B0'
                } else if (e.avcC) {
                  videoCodec = e.avcC.codec
                } else if (e.sampleRate || e.esds) {
                  audioCodec = e.esds?.codec || 'mp4a.40.2'
                  mix = true
                }
              }
            }
          })
        }
        if (audioChunk && !audioCodec) {
          MP4Parser.findBox(audioChunk, ['moov', 'trak', 'mdia', 'minf', 'stbl', 'stsd']).forEach(stsd => {
            const e = MP4Parser.stsd(stsd).entries[0]
            if (e && e.esds) audioCodec = e.esds.codec
          })
        }
        if (videoChunk && !videoCodec) videoCodec = 'avc1.42e01e'
        if (audioChunk && !audioCodec) audioCodec = 'mp4a.40.2'
        if (mix) {
          videoCodec += `, ${audioCodec}`
          audioCodec = ''
        }
        this._createMseSource(videoCodec, audioCodec)
      }
    } else {
      throw new StreamingError(ERR.OTHER, null, null, null, 'unsupported stream')
    }
    if (this._softVideo) this._sourceCreated = true
  }

  async appendBuffer (segment, audioSegment, videoChunk, audioChunk, discontinuity, contiguous, startTime) {
    if (!videoChunk?.length && !audioChunk?.length) return
    if (this._directAppend) {
      const p = []
      if (videoChunk) p.push(this._mse.append(MSE.VIDEO, videoChunk))
      if (audioChunk) p.push(this._mse.append(MSE.AUDIO, audioChunk))
      return Promise.all(p)
    }
    const needInit = this._needInitSegment || discontinuity
    const [video, audio] = this._transmuxer.transmux(videoChunk, audioChunk, discontinuity, contiguous, startTime, this._needInitSegment || discontinuity)

    if (audioChunk && audioSegment) {
      audioSegment?.setTrackExist(false, true)
    }

    if (audioChunk && segment) {
      segment?.setTrackExist(true, false)
    }

    if (!audioSegment) {
      segment?.setTrackExist(!!video, !!audio)
    }


    if (video && !audio) {
      this.hls.emit(Event.NO_AUDIO_TRACK)
    }

    if (this._softVideo) {
      this._softVideo.appendBuffer(video, audio)
      this._needInitSegment = false
    } else if (this._mse) {
      const isFirstAppend = !this._sourceCreated
      if (isFirstAppend) {
        this._createMseSource(video?.codec, audio?.codec)
      }
      this._needInitSegment = false
      const mse = this._mse
      const p = []

      if (needInit && !isFirstAppend) {
        // handle codec change during midstream
        this._handleCodecChange(video, audio)
      }

      if (video) p.push(mse.append(MSE.VIDEO, video.data))
      if (audio) p.push(mse.append(MSE.AUDIO, audio.data))
      return Promise.all(p)
    }
  }

  async removeBuffer (start = 0, end = Infinity) {
    const media = this.hls.media
    if (!this._mse || !media || start < 0 || end < start || start >= this._mse.duration) return

    return this._mse
      .clearBuffer(start, end)
      .then(() => this.hls.emit(EVENT.REMOVE_BUFFER, { start, end, removeEnd: end }))
  }

  async evictBuffer (bufferBehind) {
    const media = this.hls.media
    if (!this._mse || !media || !bufferBehind || bufferBehind < 0) return
    const currentTime = media.currentTime
    const removeEnd = currentTime - bufferBehind
    if (removeEnd <= 0) return
    const start = Buffer.start(Buffer.get(media))
    if (start + 1 >= removeEnd) return
    return this.removeBuffer(0, removeEnd)
  }

  async clearAllBuffer () {
    if (this._mse) return this._mse.clearAllBuffer()
  }

  decryptBuffer (video, audio) {
    return this._decryptor.decrypt(video, audio)
  }

  async reset (reuseMse = false) {
    if (this._mse && !reuseMse) {
      this._transmuxer = null
      this._sourceCreated = false
      await this._mse.unbindMedia()
      await this._mse.bindMedia(this.hls.media)
    }
    this._needInitSegment = true
    this._directAppend = false
  }

  async endOfStream () {
    if (this._mse) {
      if (this._sourceCreated) {
        await this._mse.endOfStream()
        this.hls.emit(EVENT.BUFFEREOS)
      }
    }
    if (this._softVideo) {
      this._softVideo.endOfStream()
    }
  }

  async setLiveSeekableRange (start, end) {
    if (this._mse) this._mse.setLiveSeekableRange(start, end)
  }

  async destroy () {
    this._decryptor?.destroy()
    if (this._mse) {
      await this._mse.unbindMedia()
    }

    this._decryptor = null
    this._mse = null
    this._softVideo = null
  }

  /**
   * @private
   */
  _createMseSource (videoCodec, audioCodec) {
    logger.debug(`create mse source, videoCodec=${videoCodec}, audioCodec=${audioCodec}`)
    const mse = this._mse
    if (!mse) return
    if (videoCodec) {
      mse.createSource(MSE.VIDEO, `video/mp4;codecs=${videoCodec}`)
      this._sourceCreated = true
    }
    if (audioCodec) {
      mse.createSource(MSE.AUDIO, `audio/mp4;codecs=${audioCodec}`)
      this._sourceCreated = true
    }
    this.hls.emit(EVENT.SOURCEBUFFER_CREATED)
  }

  /**
   * This makes it possible to change codecs or container type mid-stream.
   * @private
   */
  _handleCodecChange (video, audio) {
    const mse = this._mse
    const codecList = [{
      type: MSE.VIDEO,
      codecs: video?.codec
    }, {
      type: MSE.AUDIO,
      codecs: audio?.codec
    }]

    codecList.filter(item => !!item.codecs).forEach(({type, codecs}) => {
      const sourceBuffer = mse.getSourceBuffer(type)
      if (sourceBuffer) {
        const codec = codecs.split(',')[0]
        if (!new RegExp(codec, 'ig').test(sourceBuffer.mimeType)) {
          mse.changeType(type, `${type}/mp4;codecs=${codecs}`)
        }
      }
    })
  }

  seamlessSwitch () {
    this._needInitSegment = true
  }
}
