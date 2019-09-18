export const LOADER_EVENTS = {
  LOADER_DATALOADED: 'LOADER_DATALOADED',
  LOADER_COMPLETE: 'loader_complete',
  LOADER_ERROR: 'loader_error'
}

export const DEMUX_EVENTS = {
  DEMUX_COMPLETE: 'demux_complete',
  DEMUX_ERROR: 'demux_error',
  METADATA_PARSED: 'metadata_complete',
  VIDEO_METADATA_CHANGE: 'video_metadata_change',
  AUDIO_METADATA_CHANGE: 'audio_metadata_change',
  MEDIA_INFO: 'media_info'
}

export const REMUX_EVENTS = {
  MEDIA_SEGMENT: 'media_segment',
  INIT_SEGMENT: 'init_segment'
}

const eventsObj = Object.assign({}, LOADER_EVENTS, DEMUX_EVENTS, REMUX_EVENTS)

export const flvAllowedEvents = []

for (let key in eventsObj) {
  if (eventsObj.hasOwnProperty(key)) {
    flvAllowedEvents.push(eventsObj[key])
  }
}

export default eventsObj
