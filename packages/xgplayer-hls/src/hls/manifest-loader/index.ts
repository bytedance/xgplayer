import { ERR, EVENT, NetLoader, StreamingError } from 'xgplayer-streaming-shared'
import { Event } from '../constants'
import type { Hls } from '../index'
import { M3U8Parser } from './parser'
import { HlsUrlParameters, type MasterPlaylist, type MediaPlaylist } from './parser/model'

type Manifest = MasterPlaylist | MediaPlaylist
type ManifestResult = [
  playlist?: Manifest,
  audioPlaylist?: MediaPlaylist,
  subtitlePlaylist?: MediaPlaylist
]

interface LoaderResponse {
  data: string
  response: {
    url?: string
    headers?: unknown
  }
  options: {
    firstByteTime: number
    startTime: number
    endTime: number
    contentLength?: number
  }
}

function createManifestError(error: unknown): StreamingError {
  return new StreamingError(ERR.MANIFEST, ERR.SUB_TYPES.HLS, error)
}

export class ManifestLoader {
  private readonly hls: Hls
  private readonly _loader: NetLoader
  private readonly _audioLoader: NetLoader
  private readonly _subtitleLoader: NetLoader
  private readonly _useLowLatency: boolean

  private _timer: ReturnType<typeof setTimeout> | null = null
  private deliveryDirectives?: HlsUrlParameters | null

  constructor(hls: Hls) {
    this.hls = hls
    this._useLowLatency = hls.config.useLowLatency

    const { retryCount, retryDelay, manifestLoadTimeout, fetchOptions } = this.hls.config
    this._loader = new NetLoader({
      ...fetchOptions,
      responseType: 'text',
      retry: retryCount,
      retryDelay: retryDelay,
      timeout: manifestLoadTimeout,
      onRetryError: this._onLoaderRetry
    })
    this._audioLoader = new NetLoader({
      ...fetchOptions,
      responseType: 'text',
      retry: retryCount,
      retryDelay: retryDelay,
      timeout: manifestLoadTimeout,
      onRetryError: this._onLoaderRetry
    })

    this._subtitleLoader = new NetLoader({
      ...fetchOptions,
      responseType: 'text',
      retry: retryCount,
      retryDelay: retryDelay,
      timeout: manifestLoadTimeout,
      onRetryError: this._onLoaderRetry
    })
  }

  async load(
    url: string,
    audioUrl?: string,
    subtitleUrl?: string
  ): Promise<ManifestResult> {
    const toLoad: Array<Promise<LoaderResponse | undefined>> = [this._loader.load(url)]
    if (audioUrl) {
      toLoad.push(this._audioLoader.load(audioUrl))
    }

    if (subtitleUrl) {
      toLoad.push(this._subtitleLoader.load(subtitleUrl))
    }

    let videoText: string
    let audioText: string | undefined
    let subtitleText: string | undefined
    let videoResUrl: string
    let audioResUrl: string | undefined
    let subtitleResUrl: string | undefined

    try {
      const [video, audio, subtitle] = await Promise.all(toLoad)
      if (!video) return []

      this._emitOnLoaded(video, url)

      videoText = video.data
      videoResUrl = video.response.url || url

      if (audioUrl) {
        audioText = audio?.data
        subtitleText = subtitle?.data
        audioResUrl = audio?.response?.url || audioUrl
        subtitleResUrl = subtitle?.response?.url || subtitleUrl
        if (audioText && audio) this._emitOnLoaded(audio, audioUrl)
        if (subtitleText && subtitle) this._emitOnLoaded(subtitle, subtitleUrl)
      } else {
        subtitleText = audio?.data
        subtitleResUrl = audio?.response?.url || subtitleUrl
        if (subtitleText && audio) this._emitOnLoaded(audio, subtitleUrl)
      }
    } catch (error) {
      throw StreamingError.network(error)
    }

    const { onPreM3U8Parse } = this.hls.config

    let playlist: Manifest
    let audioPlaylist: MediaPlaylist | undefined
    let subtitlePlaylist: MediaPlaylist | undefined
    try {
      if (onPreM3U8Parse) {
        videoText = onPreM3U8Parse(videoText) || videoText
        if (audioText) audioText = onPreM3U8Parse(audioText, true) || audioText
        if (subtitleText)
          subtitleText = onPreM3U8Parse(subtitleText, true) || subtitleText
      }
      playlist = M3U8Parser.parse(videoText, videoResUrl, this._useLowLatency)
      if ('live' in playlist && playlist.live === false && !playlist.segments.length) {
        throw new Error('empty segments list')
      }
      if (audioText) {
        audioPlaylist = this._parseMediaPlaylist(
          audioText,
          audioResUrl,
          this._useLowLatency
        )
      }
      if (subtitleText) {
        subtitlePlaylist = this._parseMediaPlaylist(
          subtitleText,
          subtitleResUrl,
          this._useLowLatency
        )
      }
    } catch (error) {
      throw createManifestError(error)
    }
    if ('isMaster' in playlist) {
      this.hls.emit(Event.HLS_MANIFEST_LOADED, { playlist })
    } else {
      if (this._useLowLatency) {
        if (playlist.canBlockReload) {
          this.deliveryDirectives = new HlsUrlParameters(
            playlist.nextSN,
            playlist.nextIndex,
            ''
          )
        } else {
          this.deliveryDirectives = null
        }
      }
      this.hls.emit(Event.HLS_LEVEL_LOADED, { playlist })
    }

    return [playlist, audioPlaylist, subtitlePlaylist]
  }

  parseText(videoText: string, url: string): [Manifest] {
    const { onPreM3U8Parse } = this.hls.config

    let playlist: Manifest
    try {
      if (onPreM3U8Parse) {
        videoText = onPreM3U8Parse(videoText) || videoText
      }
      playlist = M3U8Parser.parse(videoText, url, this._useLowLatency)
      if ('live' in playlist && playlist.live === false && !playlist.segments.length) {
        throw new Error('empty segments list')
      }
    } catch (error) {
      throw createManifestError(error)
    }
    if ('isMaster' in playlist) {
      this.hls.emit(Event.HLS_MANIFEST_LOADED, { playlist })
    } else {
      this.hls.emit(Event.HLS_LEVEL_LOADED, { playlist })
    }
    return [playlist]
  }

  poll(
    url: string,
    audioUrl: string | undefined,
    subtitleUrl: string | undefined,
    cb: (
      playlist: Manifest,
      audioPlaylist?: MediaPlaylist,
      subtitlePlaylist?: MediaPlaylist
    ) => void,
    errorCb: (error: unknown) => void,
    time?: number
  ) {
    const pollInterval = time || 3000
    if (this._timer !== null) clearTimeout(this._timer)
    let retryCount = this.hls.config.pollRetryCount
    const fn = async () => {
      if (this._timer !== null) clearTimeout(this._timer)
      let reqUrl = url
      try {
        if (this.deliveryDirectives) {
          reqUrl = this.deliveryDirectives.addDirectives(url)
        }
        const res = await this.load(reqUrl, audioUrl, subtitleUrl)
        if (!res[0]) return
        retryCount = this.hls.config.pollRetryCount
        cb(res[0], res[1], res[2])
      } catch (e) {
        retryCount--
        if (retryCount <= 0) {
          errorCb(e)
        }
      }
      this._timer = setTimeout(fn, pollInterval)
    }
    this._timer = setTimeout(fn, pollInterval)
  }

  stopPoll() {
    if (this._timer !== null) clearTimeout(this._timer)
    return this.cancel()
  }

  cancel() {
    return Promise.all([this._loader.cancel(), this._audioLoader.cancel()])
  }

  private _parseMediaPlaylist(
    text: string,
    url: string | undefined,
    useLowLatency: boolean
  ): MediaPlaylist {
    const playlist = M3U8Parser.parse(text, url, useLowLatency)
    if ('isMaster' in playlist) {
      throw new Error('Expected media playlist')
    }
    return playlist
  }

  private _emitOnLoaded = (res: LoaderResponse, url?: string) => {
    const { response, options } = res
    const { firstByteTime, startTime, endTime, contentLength } = options
    const time = endTime - startTime

    this.hls.emit(EVENT.SPEED, { time, byteLength: contentLength, url })
    this.hls.emit(EVENT.LOAD_COMPLETE, { url, elapsed: time || 0 })
    this.hls.emit(EVENT.TTFB, {
      url,
      responseUrl: response.url,
      elapsed: firstByteTime - startTime
    })
    this.hls.emit(EVENT.LOAD_RESPONSE_HEADERS, { headers: response.headers, url })
  }

  private _onLoaderRetry = (error: unknown, retryTime: number) => {
    this.hls.emit(Event.LOAD_RETRY, {
      error: StreamingError.network(error),
      retryTime
    })
  }
}
