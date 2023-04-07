import { NetLoader, StreamingError, ERR } from 'xgplayer-streaming-shared'
import { M3U8Parser } from './parser'
import { Event } from '../constants'

export class ManifestLoader {
  constructor (hls) {
    this.hls = hls
    this._timer = null

    const { retryCount, retryDelay, loadTimeout, fetchOptions } = this.hls.config
    this._loader = new NetLoader({
      ...fetchOptions,
      responseType: 'text',
      retry: retryCount,
      retryDelay: retryDelay,
      timeout: loadTimeout,
      onRetryError: this._onLoaderRetry
    })
    this._audioLoader = new NetLoader({
      ...fetchOptions,
      responseType: 'text',
      retry: retryCount,
      retryDelay: retryDelay,
      timeout: loadTimeout,
      onRetryError: this._onLoaderRetry
    })
  }

  async load (url, audioUrl) {
    const toLoad = [this._loader.load(url)]
    if (audioUrl) {
      toLoad.push(this._audioLoader.load(audioUrl))
    }

    let videoText
    let audioText

    try {
      const [video, audio] = await Promise.all(toLoad)
      if (!video) return []
      videoText = video.data
      audioText = audio?.data
    } catch (error) {
      throw StreamingError.network(error)
    }

    const { onPreM3U8Parse } = this.hls.config

    let playlist
    let audioPlaylist
    try {
      if (onPreM3U8Parse) {
        videoText = onPreM3U8Parse(videoText) || videoText
        if (audioText) audioText = onPreM3U8Parse(audioText, true) || audioText
      }
      playlist = M3U8Parser.parse(videoText, url)
      if (playlist?.live === false && playlist.segments && !playlist.segments.length) {
        throw new Error('empty segments list')
      }
      if (audioText) {
        audioPlaylist = M3U8Parser.parse(audioText, audioUrl)
      }
    } catch (error) {
      throw new StreamingError(ERR.MANIFEST, ERR.SUB_TYPES.HLS, error)
    }
    if (playlist) {
      if (playlist.isMaster) {
        this.hls.emit(Event.HLS_MANIFEST_LOADED, { playlist })
      } else {
        this.hls.emit(Event.HLS_LEVEL_LOADED, { playlist })
      }
    }

    return [playlist, audioPlaylist]
  }

  poll (url, audioUrl, cb, errorCb, time) {
    clearTimeout(this._timer)
    time = time || 3000
    const fn = async () => {
      clearTimeout(this._timer)
      try {
        const res = await this.load(url, audioUrl)
        if (!res[0]) return
        cb(res[0], res[1])
      } catch (e) {
        errorCb(e)
      }
      this._timer = setTimeout(fn, time)
    }
    this._timer = setTimeout(fn, time)
  }

  stopPoll () {
    clearTimeout(this._timer)
    return this.cancel()
  }

  cancel () {
    return Promise.all([
      this._loader.cancel(),
      this._audioLoader.cancel()
    ])
  }

  _onLoaderRetry = (error, retryTime) => {
    this.hls.emit(Event.LOAD_RETRY, {
      error: StreamingError.network(error),
      retryTime
    })
  }
}
