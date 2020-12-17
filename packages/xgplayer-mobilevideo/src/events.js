
export default {
  AUDIO: {
    AUDIO_READY: 'audio_ready',
    AUDIO_WAITING: 'audio_waiting'
  },
  VIDEO: {
    VIDEO_DECODER_INIT: 'video_decode_init',
    VIDEO_READY: 'video_ready',
    VIDEO_WAITING: 'video_waiting',
    AUTO_RUN: 'auto_run',
    DECODE_LOW_FPS: 'decode_low_fps'
  },
  TIMELINE: {
    PLAY_EVENT: 'play_event',
    SET_METADATA: 'set_metadata',
    APPEND_CHUNKS: 'append_chunks',
    START_RENDER: 'start_render',
    DO_PLAY: 'do_play',
    DO_PAUSE: 'do_pause',
    DO_SEEK: 'do_seek',
    SYNC_DTS: 'sync_dts',
    RESET_BASE_DTS: 'reset_base_dts',
    UPDATE_VOLUME: 'update_volume',
    NO_AUDIO: 'no_audio',
    DESTROY: 'destroy',
    READY: 'ready',
    UPDATE_GL_OPTIONS: 'update_gl_options',
    SET_VIDEO_DURATION: 'set_video_duration',
    SET_PLAY_MODE: 'set_play_mode', // vod、live
    UPDATE_CAPABILITY_LEVEL: 'update_capability_level',
    INNER_DEGRADE: 'inner_degrade',
    ADJUST_SEEK_TIME: 'adjustSeekTime',
    CHASE_FRAME: 'chaseFrame'
  },
  VIDEO_EVENTS: {
    WAITING: 'waiting',
    CANPLAY: 'canplay',
    PLAY: 'play',
    PLAYING: 'playing',
    PAUSE: 'pause',
    SEEKING: 'seeking',
    SEEKED: 'seeked',
    LOADEDDATA: 'loadeddata',
    TIMEUPDATE: 'timeupdate',
    DURATION_CHANGE: 'durationchange',
    VOLUME_CHANGE: 'volumechange',
    PROGRESS: 'progress',
    ERROR: 'error',
    ENDED: 'ended',
    // 自定义
    DECODE_FPS: 'decodefps',
    LOW_DECODE: 'lowdecode'
  }
}
