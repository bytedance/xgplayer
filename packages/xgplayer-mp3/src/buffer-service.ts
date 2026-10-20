import { Buffer, ERR, MSE, StreamingError } from 'xgplayer-streaming-shared'
import type { MP3Config, MP3Segment } from './types'

const AUDIO_TYPE = 'audio'
const MP3_MIME = 'audio/mpeg'

export class BufferService {
  private readonly config: MP3Config
  private mse: MSE | null
  private sourceCreated = false
  private appended = false
  private destroyed = false

  constructor(config: MP3Config) {
    this.config = config
    this.mse = new MSE(undefined, {
      preferMMS: config.preferMMS,
      attachMode: config.mseAttachMode
    })
  }

  static isSupported(preferMMS = false): boolean {
    return MSE.isSupported(MP3_MIME, preferMMS)
  }

  async reset(): Promise<void> {
    if (this.destroyed || !this.mse) return
    this.sourceCreated = false
    this.appended = false
    await this.mse.unbindMedia()
    if (!this.destroyed) await this.mse.bindMedia(this.config.media)
  }

  async appendSegment(
    segment: MP3Segment,
    duration: number,
    discontinuity: boolean
  ): Promise<void> {
    const mse = this.mse
    if (!mse || this.destroyed) return
    this.ensureSource(mse)

    try {
      if (discontinuity || (!this.appended && segment.startTime > 0)) {
        if (this.appended) {
          await mse.abort(AUDIO_TYPE, {
            reason: 'mp3-seek',
            startTime: segment.startTime
          })
        }
        await mse.setTimeoffset(AUDIO_TYPE, segment.startTime, {
          reason: 'mp3-seek',
          startTime: segment.startTime
        })
      }
      await mse.append(AUDIO_TYPE, this.asBufferSource(segment.data), {
        range: segment.range,
        startTime: segment.startTime,
        endTime: segment.endTime
      })
      await mse.updateDuration(duration)
      this.appended = true
    } catch (error) {
      throw StreamingError.create(
        ERR.MEDIA,
        ERR.SUB_TYPES.MSE_APPEND_BUFFER,
        error,
        {
          range: segment.range,
          startTime: segment.startTime,
          endTime: segment.endTime
        },
        undefined
      )
    }
  }

  async evictBuffer(bufferBehind: number): Promise<void> {
    const mse = this.mse
    const media = this.config.media
    if (!mse || !this.sourceCreated || bufferBehind <= 0) return

    const removeEnd = media.currentTime - bufferBehind
    if (removeEnd <= 0) return
    const buffered = Buffer.get(media)
    if (!buffered?.length || Buffer.start(buffered) + 1 >= removeEnd) return

    try {
      await mse.remove(AUDIO_TYPE, 0, removeEnd, {
        reason: 'mp3-buffer-behind'
      })
    } catch (error) {
      throw StreamingError.create(
        ERR.MEDIA,
        ERR.SUB_TYPES.MSE_OTHER,
        error,
        undefined,
        undefined
      )
    }
  }

  async endOfStream(): Promise<void> {
    if (!this.mse || !this.sourceCreated) return
    try {
      await this.mse.endOfStream()
    } catch (error) {
      throw StreamingError.create(
        ERR.MEDIA,
        ERR.SUB_TYPES.MSE_OTHER,
        error,
        undefined,
        undefined
      )
    }
  }

  async destroy(): Promise<void> {
    if (this.destroyed) return
    this.destroyed = true
    const mse = this.mse
    this.mse = null
    this.sourceCreated = false
    this.appended = false
    if (mse) await mse.unbindMedia()
  }

  private ensureSource(mse: MSE): void {
    if (this.sourceCreated) return
    mse.createSource(AUDIO_TYPE, MP3_MIME)
    this.sourceCreated = true
  }

  private asBufferSource(data: Uint8Array): Uint8Array<ArrayBuffer> {
    return data as Uint8Array<ArrayBuffer>
  }
}
