
export default {
  AUDIO: {
    AUDIO_READY: 'audio_ready',
    AUDIO_WAITING: 'audio_waiting'
  },
  VIDEO: {
    VIDEO_DECODER_INIT: 'video_decode_init',
    VIDEO_READY: 'video_ready',
    VIDEO_WAITING: 'video_waiting'
  },
  TIMELINE: {
    PLAY_EVENT: 'play_event',
    SET_METADATA: 'set_metadata',
    APPEND_CHUNKS: 'append_chunks',
    START_RENDER: 'start_render',
    DO_PAUSE: 'do_pause',
    SYNC_DTS: 'sync_dts',
    UPDATE_VOLUME: 'update_volume',
    UPDATE_PRELOAD_TIME: 'update_preloadtime',
    NO_AUDIO: 'no_audio',
    DESTROY: 'destroy',
    READY: 'ready'
  },
  VIDEO_EVENTS: {
    WAITING: 'waiting',
    CANPLAY: 'canplay',
    PLAY: 'play',
    PLAYING: 'playing',
    PAUSE: 'pause',
    LOADEDDATA: 'loadeddata',
    TIMEUPDATE: 'timeupdate',
    DURATION_CHANGE: 'durationchange',
    VOLUME_CHANGE: 'volumechange',
    ERROR: 'error',
    // 自定义
    DECODE_FPS: 'decodefps',
    LOW_DECODE: 'lowdecode'
  }
}
