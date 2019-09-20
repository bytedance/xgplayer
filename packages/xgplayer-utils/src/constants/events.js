export const LOADER_EVENTS = {
  LOADER_DATALOADED: 'LOADER_DATALOADED',
  LOADER_COMPLETE: 'LOADER_COMPLETE',
  LOADER_ERROR: 'LOADER_ERROR'
}

export const DEMUX_EVENTS = {
  DEMUX_COMPLETE: 'DEMUX_COMPLETE',
  DEMUX_ERROR: 'DEMUX_ERROR',
  METADATA_PARSED: 'METADATA_PARSED',
  VIDEO_METADATA_CHANGE: 'VIDEO_METADATA_CHANGE',
  AUDIO_METADATA_CHANGE: 'AUDIO_METADATA_CHANGE',
  MEDIA_INFO: 'MEDIA_INFO'
}

export const REMUX_EVENTS = {
  MEDIA_SEGMENT: 'MEDIA_SEGMENT',
  REMUX_ERROR: 'REMUX_ERROR',
  INIT_SEGMENT: 'INIT_SEGMENT'
}

const eventsObj = Object.assign({}, LOADER_EVENTS, DEMUX_EVENTS, REMUX_EVENTS)

export const flvAllowedEvents = []

for (let key in eventsObj) {
  if (eventsObj.hasOwnProperty(key)) {
    flvAllowedEvents.push(eventsObj[key])
  }
}

export default eventsObj
