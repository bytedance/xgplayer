import type { AsyncifyRunner } from './asyncify'
import type { FFmpegCore } from './core'
import { ProbeInput } from './probe-input'

/** Metadata comes from the native demuxers through FFprobe's machine-readable JSON. */
export class MetadataProbe {
  private output = ''

  async run(
    core: FFmpegCore,
    runner: AsyncifyRunner,
    inputArguments: readonly string[]
  ): Promise<number | null> {
    core.setLogger(({ type, message }) => {
      if (type !== 'stdout') return
      if (this.output.length + message.length + 1 > 16 * 1024)
        throw new Error('FFprobe metadata exceeds 16 KiB')
      this.output += `${message}\n`
    })
    await runner.execute(
      [
        '-v',
        'error',
        '-probesize',
        String(ProbeInput.limit),
        '-analyzeduration',
        '1000000',
        ...inputArguments,
        '-show_entries',
        'format=duration',
        '-of',
        'json',
        '/input'
      ],
      'probe'
    )
    // A forward prefix may be insufficient for the demuxer. Transcoding still
    // gets the original stream; network failures and native traps propagate.
    if (core.ret !== 0) return null
    const metadata: unknown = JSON.parse(this.output)
    if (!metadata || typeof metadata !== 'object' || !('format' in metadata))
      throw new Error('FFprobe returned invalid format metadata')
    const format = metadata.format
    if (!format || typeof format !== 'object')
      throw new Error('FFprobe returned invalid format metadata')
    if (!('duration' in format)) return null
    const value = format.duration
    if (typeof value !== 'string' && typeof value !== 'number') return null
    const duration = Number(value)
    return Number.isFinite(duration) && duration > 0 ? duration : null
  }
}
