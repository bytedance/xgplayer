/* eslint-disable no-undef */
import EventEmitter from 'eventemitter3'
import { Buffer } from './buffer'
import { isBrowser } from './env'
import { ERR, StreamingError } from './error'
import { Logger } from './logger'
import { createPublicPromise, nowTime, type PublicPromise, SafeJSON } from './utils'

// 当前 lib.dom 尚未声明 MMS，只补充这里实际使用的字段。
type ManagedMediaSource = MediaSource & {
  readonly streaming: boolean
}

export type MSESourceBuffer = SourceBuffer & {
  mimeType?: string
}

type SourceBufferBufferedChangeEvent = Event & {
  readonly addedRanges: TimeRanges
  readonly removedRanges: TimeRanges
}

export type MSEBufferRange = {
  readonly start: number
  readonly end: number
}

const MSE_BUFFERED_CHANGE_EVENT = 'mseBufferedChange'

/**
 * SourceBuffer changes, including append/remove and browser eviction.
 * Range arrays describe the change; use MSE.buffered(type) for current track
 * coverage or media.buffered for the playable intersection across tracks.
 */
export type MSEBufferedChangePayload = {
  readonly target: MSE
  readonly type: string
  readonly event: Event
  readonly addedRanges: readonly MSEBufferRange[]
  readonly removedRanges: readonly MSEBufferRange[]
}

export type MSEEvents = {
  [MSE_BUFFERED_CHANGE_EVENT]: (payload: MSEBufferedChangePayload) => void
}

export type MSEAttachMode = 'auto' | 'source-element' | 'src'

export type MSEConfig = {
  openLog: boolean
  preferMMS: boolean
  attachMode: MSEAttachMode
}

export type MSEOperationContext = Record<string, unknown> & {
  callback?: (context: MSEOperationContext) => void
  isFull?: boolean
}

type QueueOp = {
  exec: () => void
  promise: PublicPromise
  opName: string
  context?: MSEOperationContext
}

function getManagedMediaSource(): typeof MediaSource | undefined {
  if (!isBrowser) return undefined
  return (
    window as Window & {
      ManagedMediaSource?: typeof MediaSource
    }
  ).ManagedMediaSource
}

function getMediaSource(preferMMS = true): typeof MediaSource | null {
  try {
    if (!isBrowser) return null

    const ManagedMediaSource = getManagedMediaSource()
    if (preferMMS && ManagedMediaSource) return ManagedMediaSource

    return window.MediaSource || null
  } catch (_e) {
    return null
  }
}

function isMMS(mediaSource?: MediaSource | null): mediaSource is ManagedMediaSource {
  return /ManagedMediaSource/gi.test(Object.prototype.toString.call(mediaSource))
}

function removeSrc(media: HTMLMediaElement): void {
  if (media.getAttribute('src') || media.src) {
    media.removeAttribute('src')
  }
}

function removeSourceElement(source: HTMLSourceElement | null): boolean {
  if (source?.parentNode) {
    source.parentNode.removeChild(source)
    return true
  }
  return false
}

function appendMseSource(
  media: HTMLMediaElement,
  mimeType: string,
  url: string
): HTMLSourceElement {
  const source = document.createElement('source')
  source.type = mimeType
  source.src = url
  media.insertBefore(source, media.firstChild)
  return source
}

function isAirPlayCapableWebKit(media: HTMLMediaElement): boolean {
  const win = media.ownerDocument?.defaultView || (isBrowser ? window : null)
  const airPlayMedia = media as HTMLMediaElement & {
    webkitShowPlaybackTargetPicker?: () => void
  }
  return (
    typeof airPlayMedia.webkitShowPlaybackTargetPicker === 'function' &&
    typeof (win as (Window & { WebKitPlaybackTargetAvailabilityEvent?: unknown }) | null)
      ?.WebKitPlaybackTargetAvailabilityEvent === 'function'
  )
}

function getAttachMode(
  mode: MSEAttachMode,
  useMMS: boolean,
  media: HTMLMediaElement
): MSEAttachMode {
  if (mode === 'src' || mode === 'source-element') {
    return mode
  }
  return useMMS || isAirPlayCapableWebKit(media) ? 'source-element' : 'src'
}

function getTimeRanges(buffered?: TimeRanges | null): MSEBufferRange[] {
  const ranges: MSEBufferRange[] = []

  if (typeof TimeRanges !== 'undefined' && buffered instanceof TimeRanges) {
    for (let i = 0; i < buffered.length; i++) {
      ranges.push({
        start: buffered.start(i),
        end: buffered.end(i)
      })
    }
  }
  return ranges
}

function getSourceBufferRanges(sourceBuffer?: SourceBuffer): TimeRanges | undefined {
  if (!sourceBuffer) return undefined
  return Buffer.get(sourceBuffer) || undefined
}

function loadMedia(media: HTMLMediaElement): void {
  try {
    media.load()
  } catch (_error) {
    // ignore load failures in test and detached environments
  }
}

export const MSEErrorType = {
  UPDATE_ERROR: 'updateError'
} as const

export type MSEErrorType = (typeof MSEErrorType)[keyof typeof MSEErrorType]

const OP_NAME = {
  APPEND: 'appendBuffer',
  REMOVE: 'removeBuffer',
  UPDATE_DURATION: 'updateDuration'
} as const

export class MSEError extends Error {
  type: MSEErrorType
  msg: unknown

  constructor(type: MSEErrorType, msg?: unknown) {
    super(String(msg || type))
    this.type = type
    this.msg = msg
  }
}

export class MSE extends EventEmitter<MSEEvents> {
  static VIDEO = 'video'

  static AUDIO = 'audio'

  static readonly BUFFERED_CHANGE = MSE_BUFFERED_CHANGE_EVENT

  static isSupported(
    mime = 'video/mp4; codecs="avc1.42E01E,mp4a.40.2"',
    preferMMS = true
  ): boolean {
    const MediaSource = getMediaSource(preferMMS)
    if (!MediaSource) return false
    try {
      return MediaSource.isTypeSupported(mime)
    } catch (_error) {
      return false
    }
  }

  static isMMSOnly(): boolean {
    return !!getManagedMediaSource() && typeof MediaSource === 'undefined'
  }

  media: HTMLMediaElement | null = null
  mediaSource: MediaSource | null = null

  private _openPromise = createPublicPromise()
  private _queue: Record<string, QueueOp[] | undefined> = Object.create(null)
  private _sourceBuffer: Record<string, MSESourceBuffer | undefined> = Object.create(null)
  private _mseFullFlag: Record<string, boolean | undefined> = {}
  private _st = 0
  private _opst = 0
  private _logger = new Logger('MSE')
  private _config: MSEConfig
  private _url: string | null = null
  private _sourceElement: HTMLSourceElement | null = null

  static getDefaultConfig(): MSEConfig {
    return {
      openLog: false,
      preferMMS: false,
      // MediaSource object URL 绑定方式：
      // - 'auto': ManagedMediaSource 或 AirPlay-capable WebKit 使用 'source-element'，其他 MediaSource 使用 'src'
      // - 'source-element': 通过生成的 <source> 挂载，便于 AirPlay fallback source 共存
      // - 'src': 通过 video.src 挂载
      attachMode: 'auto'
    }
  }

  constructor(media?: HTMLMediaElement | null, config?: Partial<MSEConfig>) {
    super()
    this._config = Object.assign(MSE.getDefaultConfig(), config)
    if (media) this.bindMedia(media)
    if (this._config.openLog) {
      Logger.enable()
    }
  }

  get isOpened(): boolean {
    return this.mediaSource?.readyState === 'open'
  }

  get hasOpTasks(): boolean {
    let flag = false
    Object.keys(this._queue).forEach((k) => {
      const queue = this._queue[k]
      if (Array.isArray(queue)) {
        flag ||= queue.length > 0
      }
    })
    return flag
  }

  get url(): string | null {
    return this._url
  }

  get duration(): number {
    return this.mediaSource?.duration || -1
  }

  get isEnded(): boolean {
    return this.mediaSource ? this.mediaSource.readyState === 'ended' : false
  }

  get streaming(): boolean {
    return isMMS(this.mediaSource) ? this.mediaSource.streaming : true
  }

  isFull(type = MSE.VIDEO): boolean | undefined {
    return this._mseFullFlag[type]
  }

  updateDuration(duration: number): Promise<unknown> {
    const isReduceDuration = !!this.mediaSource && this.mediaSource.duration > duration
    if (this.mediaSource && this.mediaSource.duration > duration) {
      let bufferEnd = 0
      Object.keys(this._sourceBuffer).forEach((k) => {
        try {
          bufferEnd = Math.max(this.bufferEnd(k) || 0, bufferEnd)
        } catch (_error) {
          // ignore
        }
      })
      if (duration < bufferEnd) {
        // 设置值比bufferEnd值小，会导致异常
        return Promise.resolve()
      }
    }

    return this._enqueueBlockingOp(
      () => {
        if (this.isEnded) {
          this._logger.debug('setDuration but ended')
          return
        }
        if (this.mediaSource) {
          this.mediaSource.duration = duration
          this._logger.debug('setDuration', duration)
        }
      },
      OP_NAME.UPDATE_DURATION,
      { isReduceDuration }
    )
  }

  open(): Promise<unknown> {
    if (this._openPromise.used && !this.isOpened && this.mediaSource) {
      const ms = this.mediaSource
      const onOpen = () => {
        const costTime = nowTime() - this._st
        this._logger.debug('sourceopen', costTime)
        ms.removeEventListener('sourceopen', onOpen)
        this._openPromise.resolve({ costtime: costTime })
      }
      ms.addEventListener('sourceopen', onOpen)
      this._openPromise = createPublicPromise()
    }

    return this._openPromise
  }

  private _onStartStreaming = (): void => {
    this._logger.debug('startstreaming')
  }

  private _onEndStreaming = (): void => {
    this._logger.debug('endstreaming')
  }

  async bindMedia(media: HTMLMediaElement): Promise<unknown> {
    if (this.mediaSource || this.media) await this.unbindMedia()

    const config = this._config
    const MediaSource = getMediaSource(config.preferMMS)

    if (!media || !MediaSource) {
      throw new Error('Param media or MediaSource does not exist')
    }
    this.media = media
    const ms = (this.mediaSource = new MediaSource())
    const useMMS = isMMS(ms)
    this._st = nowTime()
    const onOpen = () => {
      const costTime = nowTime() - this._st
      this._logger.debug('sourceopen')
      ms.removeEventListener('sourceopen', onOpen)
      if (this._url) {
        URL.revokeObjectURL(this._url)
      }
      this._openPromise.resolve({ costtime: costTime })
      media.dispatchEvent(new CustomEvent('mseAttached'))
    }
    ms.addEventListener('sourceopen', onOpen)
    if (useMMS) {
      ms.addEventListener('startstreaming', this._onStartStreaming)
      ms.addEventListener('endstreaming', this._onEndStreaming)
    }

    this._url = URL.createObjectURL(ms)

    this._removeAttachedSource()

    const attachMode = getAttachMode(config.attachMode, useMMS, media)

    if (attachMode === 'source-element') {
      removeSrc(media)
      this._sourceElement = appendMseSource(media, 'video/mp4', this._url)
      if (useMMS && 'disableRemotePlayback' in media) {
        media.disableRemotePlayback = true
      }
      loadMedia(media)
    } else {
      media.src = this._url
      media.disableRemotePlayback = useMMS
    }
    media.dispatchEvent(new CustomEvent('mseAttaching'))
    return this._openPromise
  }

  async unbindMedia(): Promise<void> {
    if (!this._openPromise.used) this._openPromise.resolve()
    const ms = this.mediaSource

    if (ms) {
      Object.keys(this._queue).forEach((t) => {
        const queue = this._queue[t]
        if (queue) {
          queue.forEach((x) => x.promise?.resolve?.())
        }
      })

      const hasMetadata = !!this.media && this.media.readyState >= 1
      const mseOpen = ms.readyState === 'open'

      if (hasMetadata && mseOpen) {
        try {
          ms.endOfStream()
        } catch (_error) {
          // ignore
        }
      }

      Object.keys(this._sourceBuffer).forEach((k) => {
        const sourceBuffer = this._sourceBuffer[k]
        if (sourceBuffer) {
          sourceBuffer.removeEventListener('bufferedchange', this._onSBBufferedChange)
          try {
            ms.removeSourceBuffer(sourceBuffer)
          } catch (_error) {
            // ignore
          }
        }
      })

      if (isMMS(ms)) {
        ms.removeEventListener('startstreaming', this._onStartStreaming)
        ms.removeEventListener('endstreaming', this._onEndStreaming)
      }
    }

    if (this.media) {
      this.media.disableRemotePlayback = false
      const mediaSrc = this._getMediaSrc()
      const src = this.media.getAttribute('src') || this.media.src || ''
      const shouldReload = mediaSrc === this._url || src === this._url

      if (src === this._url) {
        this.media.removeAttribute('src')
      }
      this._removeAttachedSource()

      if (shouldReload) {
        loadMedia(this.media)
      }
      this.media = null
    }

    this.mediaSource = null
    this._url = null
    this._sourceElement = null
    this._openPromise = createPublicPromise()
    this._queue = Object.create(null)
    this._sourceBuffer = Object.create(null)
  }

  private _getAttachedSource(): HTMLSourceElement | null {
    if (this._sourceElement?.parentNode === this.media) {
      return this._sourceElement
    }

    if (!this.media || !this._url) {
      return null
    }

    const sources = Array.from(this.media.querySelectorAll('source'))
    return (
      sources.find(
        (source) => source.getAttribute('src') === this._url || source.src === this._url
      ) || null
    )
  }

  private _removeAttachedSource(): boolean {
    const source = this._getAttachedSource()
    const removed = removeSourceElement(source)
    if (source === this._sourceElement || removed) {
      this._sourceElement = null
    }
    return removed
  }

  private _getMediaSrc(): string | undefined {
    const media = this._getAttachedSource() || this.media
    return media?.src
  }

  createSource(type: string, mimeType: string): void {
    if (this._sourceBuffer[type] || !this.mediaSource) return
    let sb: MSESourceBuffer
    try {
      sb = this._sourceBuffer[type] = this.mediaSource.addSourceBuffer(mimeType)
    } catch (error) {
      throw new StreamingError(ERR.MEDIA, ERR.SUB_TYPES.MSE_ADD_SB, error)
    }
    sb.mimeType = mimeType
    sb.addEventListener('updateend', this._onSBUpdateEnd.bind(this, type))
    sb.addEventListener('error', this._onSBUpdateError.bind(this, type))
    if (isMMS(this.mediaSource)) {
      sb.addEventListener('bufferedchange', this._onSBBufferedChange)
    }
  }

  changeType(type: string, mimeType: string): Promise<unknown> {
    const sb = this._sourceBuffer[type]
    if (!this.mediaSource || !sb || sb.mimeType === mimeType) return Promise.resolve()

    if (typeof sb.changeType !== 'function') {
      return Promise.reject(
        new StreamingError(
          ERR.MEDIA,
          ERR.SUB_TYPES.MSE_CHANGE_TYPE,
          new Error('changeType is not a function')
        )
      )
    }

    return this._enqueueOp(
      type,
      () => {
        try {
          sb.changeType(mimeType)
        } catch (e) {
          throw new StreamingError(ERR.MEDIA, ERR.SUB_TYPES.MSE_CHANGE_TYPE, e)
        }

        sb.mimeType = mimeType
        this._onSBUpdateEnd(type)
      },
      'changeType',
      { mimeType }
    )
  }

  createOrChangeSource(type: string, mimeType: string): Promise<unknown> {
    this.createSource(type, mimeType)
    return this.changeType(type, mimeType)
  }

  append(
    type: string,
    buffer?: BufferSource,
    context?: MSEOperationContext
  ): Promise<unknown> {
    if (!buffer || !buffer.byteLength) {
      return Promise.resolve()
    }

    if (!this._sourceBuffer[type]) return Promise.resolve()

    return this._enqueueOp(
      type,
      () => {
        if (!this.mediaSource || this.media?.error) return
        this._logger.debug('MSE APPEND START', context)
        this._opst = nowTime()
        this._sourceBuffer[type]?.appendBuffer(buffer)
      },
      OP_NAME.APPEND,
      context
    )
  }

  remove(
    type: string,
    startTime: number,
    endTime: number,
    context?: MSEOperationContext
  ): Promise<unknown> {
    let isInsertHead = false
    if (this._mseFullFlag[type]) {
      isInsertHead = true
    }
    return this._enqueueOp(
      type,
      () => {
        if (!this.mediaSource || this.media?.error) return
        const sb = this._sourceBuffer[type]
        if (startTime >= endTime || !sb) {
          this._onSBUpdateEnd(type)
          return
        }
        this._opst = nowTime()
        this._logger.debug('MSE REMOVE START', type, startTime, endTime, context)
        sb.remove(startTime, endTime)
      },
      OP_NAME.REMOVE,
      context,
      isInsertHead
    )
  }

  clearBuffer(startTime: number, endTime: number): Promise<unknown> {
    let p: Promise<unknown> | undefined
    Object.keys(this._sourceBuffer).forEach((k) => {
      p = this.remove(k, startTime, endTime)
    })
    return p || Promise.resolve()
  }

  clearAllBuffer(): Promise<unknown> | undefined {
    let p: Promise<unknown> | undefined
    Object.keys(this._sourceBuffer).forEach((k) => {
      const sb = this._sourceBuffer[k]
      if (sb) {
        const buffered = getSourceBufferRanges(sb)
        p = this.remove(k, 0, buffered ? Buffer.end(buffered) : 0)
      }
    })
    return p
  }

  clearOpQueues(type: string, allClear = true): void {
    const queue = this._queue[type]
    const sb = this._sourceBuffer[type]

    this._logger.debug('MSE clearOpQueue', type, allClear, 'sb updating: ', sb?.updating)

    let keepLast = false
    if (sb?.updating) {
      keepLast = true
    }
    if (allClear && queue) {
      const delCount = keepLast ? Math.max(queue.length - 1, 0) : queue.length
      if (delCount > 0) {
        queue.splice(0, delCount)
      }
    }
  }

  endOfStream(reason?: EndOfStreamError): Promise<unknown> {
    if (!this.mediaSource || this.mediaSource.readyState !== 'open') {
      return Promise.resolve()
    }
    return this._enqueueBlockingOp(() => {
      const ms = this.mediaSource
      if (!ms || ms.readyState !== 'open') return
      this._logger.debug('MSE endOfStream START')
      if (reason) {
        ms.endOfStream(reason)
      } else {
        ms.endOfStream()
      }
    }, 'endOfStream')
  }

  setLiveSeekableRange(start: number, end: number): void {
    const ms = this.mediaSource
    if (
      start < 0 ||
      end < start ||
      !ms?.setLiveSeekableRange ||
      ms.readyState !== 'open'
    ) {
      return
    }
    ms.setLiveSeekableRange(start, end)
  }

  getSourceBuffer(type: string): MSESourceBuffer | undefined {
    return this._sourceBuffer[type]
  }

  buffered(type: string): TimeRanges | undefined {
    return getSourceBufferRanges(this._sourceBuffer[type])
  }

  bufferStart(type: string): number {
    const buffered = this.buffered(type)
    return buffered ? Buffer.start(buffered) : 0
  }

  bufferEnd(type: string): number {
    const buffered = this.buffered(type)
    return buffered ? Buffer.end(buffered) : 0
  }

  private _enqueueOp(
    type: string,
    exec: () => void,
    opName: string,
    context?: MSEOperationContext,
    isInsertHead?: boolean
  ): Promise<unknown> {
    if (!this.mediaSource) return Promise.resolve()
    const queue = (this._queue[type] = this._queue[type] || [])
    const op: QueueOp = {
      exec,
      promise: createPublicPromise(),
      opName,
      context
    }

    if (isInsertHead) {
      queue.splice(0, 0, op)
      this._mseFullFlag[type] = false
      this._startQueue(type)
    } else {
      queue.push(op)
    }

    if (this.isOpened || this.isEnded) {
      if (queue.length === 1) {
        this._startQueue(type)
      }
    } else {
      this._openPromise.then(() => {
        if (queue.length === 1) {
          this._startQueue(type)
        }
      })
    }

    return op.promise
  }

  private async _enqueueBlockingOp(
    exec: () => unknown,
    opName: string,
    context?: MSEOperationContext
  ): Promise<unknown> {
    if (!this.mediaSource) return Promise.resolve()
    const types = Object.keys(this._sourceBuffer)
    if (!types.length) {
      return exec()
    }

    const waiters: PublicPromise[] = []
    types.forEach((t) => {
      const queue = (this._queue[t] = this._queue[t] || [])
      const prom = createPublicPromise()
      waiters.push(prom)
      queue.push({
        exec: () => {
          prom.resolve()
        },
        promise: prom,
        opName,
        context
      })
      if (queue.length === 1) {
        this._startQueue(t)
      }
    })

    return Promise.all(waiters).then(() => {
      try {
        return exec()
      } finally {
        types.forEach((t) => {
          const queue = this._queue[t]
          const sb = this._sourceBuffer[t]
          queue?.shift()
          if (!sb || !sb.updating) {
            this._startQueue(t)
          }
        })
      }
    })
  }

  private _startQueue(type: string): void {
    const queue = this._queue[type]
    if (!queue) return
    const op = queue[0]
    if (!op || this._mseFullFlag[type]) return

    try {
      op.exec()
    } catch (error) {
      const message =
        typeof error === 'object' && error !== null && 'message' in error
          ? String(error.message)
          : ''
      if (message.includes('SourceBuffer is full')) {
        this._mseFullFlag[type] = true
        if (op.context && typeof op.context === 'object') {
          op.context.isFull = true
        }
        this._logger.error(
          '[MSE error],  context,',
          op.context,
          ' ,name,',
          op.opName,
          ',err,SourceBuffer is full'
        )
        op.promise.reject(new StreamingError(ERR.MEDIA, ERR.SUB_TYPES.MSE_FULL, error))
        return
      }

      this._logger.error(error)
      op.promise.reject(
        error instanceof StreamingError
          ? error
          : new StreamingError(ERR.MEDIA, ERR.SUB_TYPES.MSE_OTHER, error)
      )
      queue.shift()
      this._startQueue(type)
    }
  }

  private _onSBUpdateEnd = (type: string): void => {
    const queue = this._queue[type]
    const op = queue?.[0]
    if (!op) return

    if (op.opName !== OP_NAME.UPDATE_DURATION) {
      queue?.shift()
    }

    const costtime = nowTime() - this._opst
    this._logger.debug(
      `UpdateEnd(${type}/${op.opName})`,
      SafeJSON.stringify(getTimeRanges(this._sourceBuffer[type]?.buffered)),
      costtime,
      op.context
    )
    op.promise.resolve({ name: op.opName, context: op.context, costtime })
    if (op.context && typeof op.context.callback === 'function') {
      op.context.callback(op.context)
    }
    this._startQueue(type)
  }

  private _onSBUpdateError = (type: string, event: Event): void => {
    const queue = this._queue[type]
    const op = queue?.[0]
    if (!op) return

    this._logger.error('UpdateError', type, op.opName, op.context)
    op.promise.reject(
      new StreamingError(ERR.MEDIA, ERR.SUB_TYPES.MSE_APPEND_BUFFER, event)
    )
    // Do not shift from queue, 'updateend' event will fire next
  }

  private _onSBBufferedChange = (event: Event): void => {
    const type = Object.keys(this._sourceBuffer).find(
      (key) => this._sourceBuffer[key] === event.currentTarget
    )
    if (!type) return

    const bufferedChangeEvent = event as SourceBufferBufferedChangeEvent
    const addedRanges = getTimeRanges(bufferedChangeEvent.addedRanges)
    const removedRanges = getTimeRanges(bufferedChangeEvent.removedRanges)
    this._logger.debug(
      'BufferedChange',
      type,
      SafeJSON.stringify({ addedRanges, removedRanges })
    )
    this.emit(MSE.BUFFERED_CHANGE, {
      target: this,
      type,
      event: bufferedChangeEvent,
      addedRanges,
      removedRanges
    })
  }

  setTimeoffset(
    type: string,
    timestampOffset: number,
    context?: MSEOperationContext
  ): Promise<unknown> {
    const sourceBuffer = this._sourceBuffer[type]
    if (!sourceBuffer) return Promise.resolve()

    return this._enqueueOp(
      type,
      () => {
        if (timestampOffset < 0) {
          timestampOffset += 0.001
        }

        sourceBuffer.timestampOffset = timestampOffset
        this._onSBUpdateEnd(type)
      },
      'setTimeoffset',
      context
    )
  }

  /** *重置decode时间戳 */
  abort(type = MSE.VIDEO, context?: MSEOperationContext): Promise<unknown> {
    if (!this.isOpened) {
      return Promise.resolve()
    }
    return this._enqueueOp(
      type,
      () => {
        this._logger.debug('MSE abort', type, context)
        this._sourceBuffer[type]?.abort()
        this._onSBUpdateEnd(type)
      },
      'abort',
      context
    )
  }
}
