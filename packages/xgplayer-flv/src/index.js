/* c8 ignore next 12 */
import { FlvPlugin } from './plugin'
import MIW, { preParePlayerWorker } from './MIW'

export {
  ERR,
  ERR_CODE,
  EVENT,
  StreamingError
} from 'xgplayer-streaming-shared'

export * from './flv'
export { FlvPlugin, MIW, preParePlayerWorker }
export default FlvPlugin
