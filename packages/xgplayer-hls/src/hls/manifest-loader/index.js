import { NetLoader, StreamingError, EVENT, ERR } from 'xgplayer-streaming-shared'
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

    this._subtitleLoader = new NetLoader({
      ...fetchOptions,
      responseType: 'text',
      retry: retryCount,
      retryDelay: retryDelay,
      timeout: loadTimeout,
      onRetryError: this._onLoaderRetry
    })

  }

  async load (url, audioUrl, subtitleUrl) {
    const toLoad = [this._loader.load(url)]
    if (audioUrl) {
      toLoad.push(this._audioLoader.load(audioUrl))
    }

    if (subtitleUrl) {
      toLoad.push(this._subtitleLoader.load(subtitleUrl))
    }

    let videoText
    let audioText
    let subtitleText

    try {
      const [video, audio, subtitle] = await Promise.all(toLoad)
      if (!video) return []

      this._emitOnLoaded(video, url)

      videoText = video.data

      if (audioUrl) {
        audioText = audio?.data
        subtitleText = subtitle?.data
        audioText && this._emitOnLoaded(audio, audioUrl)
        subtitleText && this._emitOnLoaded(subtitle, subtitleUrl)
      } else {
        subtitleText = subtitle?.data
        subtitleText && this._emitOnLoaded(subtitle, subtitleUrl)
      }

    } catch (error) {
      throw StreamingError.network(error)
    }

    const { onPreM3U8Parse } = this.hls.config

    let playlist
    let audioPlaylist
    let subtitlePlaylist
    try {
      if (onPreM3U8Parse) {
        videoText = onPreM3U8Parse(videoText) || videoText
        if (audioText) audioText = onPreM3U8Parse(audioText, true) || audioText
        if (subtitleText) subtitleText = onPreM3U8Parse(subtitleText, true) || subtitleText
      }
      playlist = M3U8Parser.parse(videoText, url)
      if (playlist?.live === false && playlist.segments && !playlist.segments.length) {
        throw new Error('empty segments list')
      }
      if (audioText) {
        audioPlaylist = M3U8Parser.parse(audioText, audioUrl)
      }
      if (subtitleText) {
        subtitlePlaylist = M3U8Parser.parse(subtitleText, subtitleUrl)
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

    return [playlist, audioPlaylist, subtitlePlaylist]
  }

  parseText (videoText, url) {
    const { onPreM3U8Parse } = this.hls.config

    let playlist
    try {
      if (onPreM3U8Parse) {
        videoText = onPreM3U8Parse(videoText) || videoText
      }
      playlist = M3U8Parser.parse(videoText, url)
      if (playlist?.live === false && playlist.segments && !playlist.segments.length) {
        throw new Error('empty segments list')
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
    return [playlist]
  }

  poll (url, audioUrl, subtitleUrl, cb, errorCb, time) {
    clearTimeout(this._timer)
    time = time || 3000
    let retryCount = this.hls.config.pollRetryCount
    const fn = async () => {
      clearTimeout(this._timer)
      try {
        const res = await this.load(url, audioUrl, subtitleUrl)
        if (!res[0]) return
        retryCount = this.hls.config.pollRetryCount
        cb(res[0], res[1], res[2])
      } catch (e) {
        retryCount--
        if (retryCount <= 0) {
          errorCb(e)
        }
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

  _emitOnLoaded = (res, url) => {
    const { response, options } = res
    const { firstByteTime, startTime, endTime, contentLength } = options || {}
    const time = endTime - startTime

    this.hls.emit(EVENT.SPEED, { time, byteLength: contentLength, url })
    this.hls.emit(EVENT.LOAD_COMPLETE, { url, elapsed: time || 0 })
    this.hls.emit(EVENT.TTFB, { url, responseUrl: response.url, elapsed: firstByteTime - startTime })
    this.hls.emit(EVENT.LOAD_RESPONSE_HEADERS, { headers: response.headers, url })
  }

  _onLoaderRetry = (error, retryTime) => {
    this.hls.emit(Event.LOAD_RETRY, {
      error: StreamingError.network(error),
      retryTime
    })
  }
}
