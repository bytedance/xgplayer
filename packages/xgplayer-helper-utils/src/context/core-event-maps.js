
import Events from '../events/index'

const CORE_EVENTS = Events.CORE_EVENTS

// 对外事件参数转换成对象形式
// 只有一个参数且类型为对象的事件这里不用指定key
// 存在多个参数的事件这里需要指定每个参数的可以 用于转成对象
export default {
  [CORE_EVENTS.LOADER_START]: ['url', 'config'],
  [CORE_EVENTS.LOADER_RESPONSE_HEADERS]: ['headers'],
  [CORE_EVENTS.LOADER_COMPLETE]: ['xgbuffer'],
  [CORE_EVENTS.LOADER_RETRY]: [],
  [CORE_EVENTS.TTFB]: [],
  [CORE_EVENTS.DEMUX_ERROR]: [],
  [CORE_EVENTS.METADATA_PARSED]: ['type', 'meta'],
  [CORE_EVENTS.REMUX_METADATA]: ['type'],
  [CORE_EVENTS.KEYFRAME]: ['pts'],
  [CORE_EVENTS.BUFFER_APPENDED]: [],
  [CORE_EVENTS.SEI_PARSED]: ['sei'],
  [CORE_EVENTS.LOWDECODE]: [],
  [CORE_EVENTS.LARGE_AVGAP]: [],
  [CORE_EVENTS.STREAM_EXCEPTION]: []
}
