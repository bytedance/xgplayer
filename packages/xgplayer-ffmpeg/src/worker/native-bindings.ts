import { FFmpegError } from '../types'
import type { FFmpegCore } from './core'

export enum NativeOutputKind {
  Yield = 0,
  Init = 1,
  Media = 2,
  Eof = 3
}

export const NATIVE_CANCELLED = -1414092869 // AVERROR_EXIT
export const NATIVE_IO_ERROR = -5 // AVERROR(EIO)

interface NativeMetadata {
  duration: number | null
  codec: string
  sampleRate: number
  channels: number
}

interface NativeOutputConfig {
  passthrough: boolean
  sampleRate: number
  channels: number
  bitrate: number
  segmentDuration: number
}

type SyncEntry =
  | 'xp_create'
  | 'xp_configure'
  | 'xp_metadata'
  | 'xp_error'
  | 'xp_rate'
  | 'xp_channels'
  | 'xp_data'
  | 'xp_length'
  | 'xp_bias'
  | 'xp_start'
  | 'xp_end'

/** The native ABI only. Operation cancellation and serialization belong to its caller. */
export class NativeBindings {
  constructor(private readonly getCore: () => FFmpegCore) {}

  create(size: number, format: string, rate: number, channels: number): number {
    return this.call('xp_create', [size, format, rate, channels])
  }

  open(handle: number): Promise<number> {
    return this.operation('xp_open', [handle])
  }

  configure(handle: number, config: NativeOutputConfig): number {
    return this.call('xp_configure', [
      handle,
      config.passthrough ? 1 : 0,
      config.sampleRate,
      config.channels,
      config.bitrate,
      config.segmentDuration
    ])
  }

  metadata(handle: number): NativeMetadata {
    return JSON.parse(this.text('xp_metadata', handle)) as NativeMetadata
  }

  outputParameters(handle: number): { sampleRate: number; channels: number } {
    return {
      sampleRate: this.call('xp_rate', [handle]),
      channels: this.call('xp_channels', [handle])
    }
  }

  seek(handle: number, time: number): Promise<number> {
    return this.operation('xp_seek', [handle, time])
  }

  pull(handle: number): Promise<number> {
    return this.operation('xp_pull', [handle])
  }

  /** Copy before release: the next native call may overwrite or grow the heap. */
  takeOutput(handle: number): {
    data: Uint8Array<ArrayBuffer>
    timestampOffset: number
    start: number
    end: number
  } {
    const pointer = this.call('xp_data', [handle])
    const length = this.call('xp_length', [handle])
    const core = this.getCore()
    if (
      length <= 0 ||
      length > 8 * 1024 * 1024 ||
      pointer < 0 ||
      pointer + length > core.HEAPU8.length
    )
      throw new FFmpegError('runtime', 'Invalid native output buffer')
    const output = {
      data: core.HEAPU8.slice(pointer, pointer + length),
      timestampOffset: -this.call('xp_bias', [handle]),
      start: this.call('xp_start', [handle]),
      end: this.call('xp_end', [handle])
    }
    core.ccall('xp_release', null, ['number'], [handle])
    return output
  }

  error(handle: number): string {
    return this.text('xp_error', handle)
  }

  close(handle: number): void {
    this.getCore().ccall('xp_close', null, ['number'], [handle])
  }

  private call(name: SyncEntry, values: Array<number | string>): number {
    const result = this.getCore().ccall(
      name,
      'number',
      values.map((value) => (typeof value === 'string' ? 'string' : 'number')),
      values
    )
    if (typeof result !== 'number')
      throw new FFmpegError('runtime', 'Unexpected async native entry')
    return result
  }

  private text(name: 'xp_metadata' | 'xp_error', handle: number): string {
    return this.getCore().UTF8ToString(this.call(name, [handle]))
  }

  private async operation(
    name: 'xp_open' | 'xp_seek' | 'xp_pull',
    values: number[]
  ): Promise<number> {
    const result = await this.getCore().ccall(
      name,
      'number',
      values.map(() => 'number'),
      values,
      { async: true }
    )
    if (typeof result !== 'number')
      throw new FFmpegError('runtime', 'Invalid native operation result')
    return result
  }
}
