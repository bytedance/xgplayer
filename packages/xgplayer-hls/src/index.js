/* c8 ignore next 12 */
import { HlsPlugin, parseSwitchUrlArgs } from './plugin'
import { HlsPreloader } from './hls/preload'

/**
 * @typedef { import ('./hls/buffer-service/decrypt/index').IExternalDecryptor } IExternalDecryptor
 */

/**
 * @typedef { import ('./hls').SwitchUrlOptions } SwitchUrlOptions
 */

export {
  ERR,
  ERR_CODE,
  StreamingError
} from 'xgplayer-streaming-shared'
export * from './hls'
export { Event as EVENT } from './hls/constants'
export { HlsPlugin, parseSwitchUrlArgs, HlsPreloader }

export default HlsPlugin
