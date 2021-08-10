
import Events from '../events/index'

const CORE_EVENTS = Events.CORE_EVENTS

// convert the param for core_event to object
// no need assign key for event with only one param ant it's type is object
export default {
  [CORE_EVENTS.LOADER_START]: ['url', 'config'],
  [CORE_EVENTS.LOADER_RESPONSE_HEADERS]: ['headers'],
  [CORE_EVENTS.LOADER_COMPLETE]: ['xgbuffer'],
  [CORE_EVENTS.LOADER_RETRY]: [],
  [CORE_EVENTS.TTFB]: [],
  [CORE_EVENTS.DEMUX_ERROR]: ['tag', 'error'],
  [CORE_EVENTS.METADATA_PARSED]: ['type', 'meta'],
  [CORE_EVENTS.REMUX_METADATA]: ['type'],
  [CORE_EVENTS.KEYFRAME]: ['pts'],
  [CORE_EVENTS.BUFFER_APPENDED]: [],
  [CORE_EVENTS.SEI_PARSED]: ['sei'],
  [CORE_EVENTS.LOWDECODE]: [],
  [CORE_EVENTS.LARGE_AVGAP]: [],
  [CORE_EVENTS.STREAM_EXCEPTION]: []
}
