export const LOADER_EVENTS = {
  LOADER_DATALOADED: 'loader_dataloaded',
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

export default Object.assign({}, LOADER_EVENTS, DEMUX_EVENTS, REMUX_EVENTS)
