import { FlvDemuxer } from 'xgplayer-transmuxer'
import { NetLoader, Logger } from 'xgplayer-streaming-shared'

const logger = new Logger('PreFetchService')

/**
 * Parallel pre-fetch pipeline used to achieve zero-stutter switchURL.
 *
 * Lifecycle:
 *   1. start(url): opens a second NetLoader; chunks are buffered in `_queue`
 *      and demuxed into `_probeDemuxer` only to detect first keyframe.
 *   2. isReady(): true once the new stream has produced a keyframe.
 *   3. swap(forwardCb): switches into forwarding phase. Queued chunks plus any
 *      future loader chunks are drained one-at-a-time through `forwardCb`
 *      (which is Flv._onProgress). Returns a Promise that resolves when the
 *      initial backlog is drained.
 *   4. cancel() / destroy(): cleanup if the swap aborts.
 */
export class PreFetchService {
  _loader = null
  _probeDemuxer = null
  _ready = false
  _phase = 'buffering' // 'buffering' | 'forwarding'
  _queue = []
  _forward = null
  _drainPromise = null
  _url = ''

  get url () {
    return this._url
  }

  get loader () {
    return this._loader
  }

  isReady () {
    return this._ready
  }

  async start (url, fetchOptions, loaderOptions) {
    this._url = url
    this._probeDemuxer = new FlvDemuxer()
    this._loader = new NetLoader({
      ...fetchOptions,
      ...loaderOptions,
      onProgress: this._onProgress,
      responseType: 'arraybuffer'
    })
    try {
      await this._loader.load({ url })
    } catch (e) {
      logger.warn('pre-fetch load failed', e)
      throw e
    }
  }

  _onProgress = async (chunk, done, timing, response) => {
    if (this._phase === 'forwarding') {
      this._queue.push({ chunk, done, timing, response })
      // serialize draining so we never have two forwards in flight
      return this._drain()
    }
    if (chunk && chunk.byteLength) {
      this._queue.push({ chunk, done, timing, response })
      if (!this._ready) this._probeKeyframe(chunk)
    }
  }

  _probeKeyframe (chunk) {
    if (!this._probeDemuxer) return
    try {
      const isFirst = !this._probeDemuxer._headerParsed
      this._probeDemuxer.demux(chunk, isFirst, true)
      const { videoTrack } = this._probeDemuxer
      if (videoTrack && videoTrack.samples?.some(s => s.keyframe)) {
        this._ready = true
        logger.debug('pre-fetch keyframe detected, ready to swap')
      }
    } catch (e) {
      logger.warn('probe demux warn', e?.message)
    }
  }

  _drain = async () => {
    if (this._drainPromise) return this._drainPromise
    this._drainPromise = (async () => {
      while (this._phase === 'forwarding' && this._queue.length) {
        const item = this._queue.shift()
        try {
          await this._forward(item.chunk, item.done, item.timing, item.response)
        } catch (e) {
          logger.warn('forward error', e?.message)
        }
      }
      this._drainPromise = null
    })()
    return this._drainPromise
  }

  /**
   * Hand off to forwarding phase. Queued + future chunks drain serially via
   * `forwardCb`. Returns a Promise that resolves when the initial backlog is
   * fully consumed.
   * @param {(chunk, done, timing, response) => any} forwardCb
   */
  swap (forwardCb) {
    this._forward = forwardCb
    this._phase = 'forwarding'
    this._probeDemuxer = null
    return this._drain()
  }

  async cancel () {
    this._phase = 'cancelled'
    if (this._loader) {
      try { await this._loader.cancel() } catch (e) { /* ignore */ }
    }
    this._queue = []
  }

  destroy () {
    this._loader = null
    this._probeDemuxer = null
    this._queue = []
    this._forward = null
    this._drainPromise = null
  }
}
