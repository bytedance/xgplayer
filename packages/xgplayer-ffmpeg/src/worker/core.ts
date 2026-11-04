import type { FFmpegLoadConfig } from '../types'
import type { AsyncifyCore } from './asyncify'

export interface DeviceStream {
  seekable: boolean
}

export interface DeviceOperations {
  open(stream: DeviceStream): void
  read?(stream: DeviceStream, buffer: Int8Array, offset: number, length: number): number
  write?(stream: DeviceStream, buffer: Int8Array, offset: number, length: number): number
  llseek(): never
}

export interface FFmpegCore extends AsyncifyCore {
  FS: {
    makedev(major: number, minor: number): number
    registerDevice(device: number, operations: DeviceOperations): void
    mkdev(path: string, mode: number, device: number): void
    open(path: string, flags: string): { fd: number }
    ErrnoError: new (code: number) => Error
  }
  setLogger(callback: (event: { type: string; message: string }) => void): void
  setProgress(callback: (event: { progress: number; time: number }) => void): void
}

export type CoreFactory = (config: { mainScriptUrlOrBlob: string }) => Promise<FFmpegCore>

export async function loadCore(
  config: FFmpegLoadConfig,
  factory?: CoreFactory
): Promise<FFmpegCore> {
  const createCore =
    factory ||
    ((await import(/* @vite-ignore */ config.coreURL)) as { default: CoreFactory })
      .default
  if (typeof createCore !== 'function')
    throw new Error('FFmpeg core must export a factory')
  // This encoded resource fragment is the pinned core's locateFile contract.
  const resources = btoa(JSON.stringify({ wasmURL: config.wasmURL }))
  return createCore({ mainScriptUrlOrBlob: `${config.coreURL}#${resources}` })
}
