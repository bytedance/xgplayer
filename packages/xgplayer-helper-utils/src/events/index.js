const BROWSER_EVENTS = {
  VISIBILITY_CHANGE: 'VISIBILITY_CHANGE'
}
const PLAYER_EVENTS = {
  SEEK: 'SEEK'
}

const LOADER_EVENTS = {
  LADER_START: 'LOADER_START',
  LOADER_DATALOADED: 'LOADER_DATALOADED',
  LOADER_COMPLETE: 'LOADER_COMPLETE',
  LOADER_RESPONSE_HEADERS: 'LOADER_RESPONSE_HEADERS',
  LOADER_ERROR: 'LOADER_ERROR',
  LOADER_RETRY: 'LOADER_RETRY'
}

const DEMUX_EVENTS = {
  DEMUX_START: 'DEMUX_START',
  DEMUX_COMPLETE: 'DEMUX_COMPLETE',
  DEMUX_ERROR: 'DEMUX_ERROR',
  METADATA_PARSED: 'METADATA_PARSED',
  SEI_PARSED: 'SEI_PARSED',
  VIDEO_METADATA_CHANGE: 'VIDEO_METADATA_CHANGE',
  AUDIO_METADATA_CHANGE: 'AUDIO_METADATA_CHANGE',
  MEDIA_INFO: 'MEDIA_INFO',
  ISKEYFRAME: 'ISKEYFRAME'
}

const REMUX_EVENTS = {
  REMUX_METADATA: 'REMUX_METADATA',
  REMUX_MEDIA: 'REMUX_MEDIA',
  MEDIA_SEGMENT: 'MEDIA_SEGMENT',
  REMUX_ERROR: 'REMUX_ERROR',
  INIT_SEGMENT: 'INIT_SEGMENT',
  DETECT_CHANGE_STREAM: 'DETECT_CHANGE_STREAM',
  DETECT_CHANGE_STREAM_DISCONTINUE: 'DETECT_CHANGE_STREAM_DISCONTINUE',
  DETECT_AUDIO_GAP: 'DETECT_AUDIO_GAP',
  DETECT_LARGE_GAP: 'DETECT_LARGE_GAP',
  DETECT_AUDIO_OVERLAP: 'DETECT_AUDIO_OVERLAP',
  RANDOM_ACCESS_POINT: 'RANDOM_ACCESS_POINT',
  DETECT_FRAG_ID_DISCONTINUE: 'DETECT_FRAG_ID_DISCONTINUE'
}

const MSE_EVENTS = {
  SOURCE_UPDATE_END: 'SOURCE_UPDATE_END',
  MSE_ERROR: 'MSE_ERROR',
  MSE_WRONG_TRACK_ADD: 'MSE_WRONG_TRACK_ADD'
}

// hls专有events
const HLS_EVENTS = {
  RETRY_TIME_EXCEEDED: 'RETRY_TIME_EXCEEDED'
}

const CRYTO_EVENTS = {
  START_DECRYPT: 'START_DECRYPT',
  DECRYPTED: 'DECRYPTED'
}
const ALLEVENTS = Object.assign({}, LOADER_EVENTS, DEMUX_EVENTS, REMUX_EVENTS, MSE_EVENTS, HLS_EVENTS, PLAYER_EVENTS, BROWSER_EVENTS)

const FlvAllowedEvents = []
const HlsAllowedEvents = []

for (let key in ALLEVENTS) {
  if (ALLEVENTS.hasOwnProperty(key)) {
    FlvAllowedEvents.push(ALLEVENTS[key])
  }
}

for (let key in ALLEVENTS) {
  if (ALLEVENTS.hasOwnProperty(key)) {
    HlsAllowedEvents.push(ALLEVENTS[key])
  }
}

export default {
  ALLEVENTS,
  HLS_EVENTS,
  REMUX_EVENTS,
  DEMUX_EVENTS,
  MSE_EVENTS,
  LOADER_EVENTS,
  FlvAllowedEvents,
  HlsAllowedEvents,
  CRYTO_EVENTS,
  PLAYER_EVENTS,
  BROWSER_EVENTS
};
