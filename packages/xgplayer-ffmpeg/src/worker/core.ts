import type { FFmpegLoadConfig } from '../types'

export interface FFmpegCore {
  HEAPU8: Uint8Array<ArrayBuffer>
  UTF8ToString(pointer: number): string
  ccall(
    name: string,
    result: 'number' | null,
    types: Array<'number' | 'string'>,
    values: Array<number | string>,
    options?: { async: true }
  ): number | undefined | Promise<number | undefined>
}

export interface CoreConfig {
  locateFile(path: string): string
  readSource(offset: number, destination: number, length: number): Promise<number>
  isInterrupted(): boolean
}

export type CoreFactory = (config: CoreConfig) => Promise<FFmpegCore>

export async function loadCore(
  config: FFmpegLoadConfig,
  callbacks: Pick<CoreConfig, 'readSource' | 'isInterrupted'>,
  factory?: CoreFactory
): Promise<FFmpegCore> {
  const createCore =
    factory ||
    ((await import(/* @vite-ignore */ config.coreURL)) as { default: CoreFactory })
      .default
  if (typeof createCore !== 'function')
    throw new Error('FFmpeg core must export a factory')
  return createCore({
    ...callbacks,
    locateFile: (filename) =>
      filename.endsWith('.wasm') ? config.wasmURL : new URL(filename, config.coreURL).href
  })
}
