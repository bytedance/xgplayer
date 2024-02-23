export const PLAY = 'play'
export const PLAYING = 'playing'
export const ENDED = 'ended'
export const PAUSE = 'pause'
export const ERROR = 'error'
export const SEEKING = 'seeking'
export const SEEKED = 'seeked'
export const TIME_UPDATE = 'timeupdate'
export const WAITING = 'waiting'
export const CANPLAY = 'canplay'
export const CANPLAY_THROUGH = 'canplaythrough'
export const DURATION_CHANGE = 'durationchange'
export const VOLUME_CHANGE = 'volumechange'
export const LOADED_DATA = 'loadeddata'
export const LOADED_METADATA = 'loadedmetadata'
export const RATE_CHANGE = 'ratechange'
export const PROGRESS = 'progress'
export const LOAD_START = 'loadstart'
export const EMPTIED = 'emptied'
export const STALLED = 'stalled'
export const SUSPEND = 'suspend'
export const ABORT = 'abort'

// player events
export const BUFFER_CHANGE = 'bufferedChange'
export const PLAYER_FOCUS = 'focus'
export const PLAYER_BLUR = 'blur'
export const READY = 'ready'
export const URL_NULL = 'urlNull'
export const AUTOPLAY_STARTED = 'autoplay_started'
export const AUTOPLAY_PREVENTED = 'autoplay_was_prevented'
export const COMPLETE = 'complete'
export const REPLAY = 'replay'
export const DESTROY = 'destroy'
export const URL_CHANGE = 'urlchange'
export const DOWNLOAD_SPEED_CHANGE = 'download_speed_change'
export const LEAVE_PLAYER = 'leaveplayer'
export const ENTER_PLAYER = 'enterplayer'

// screen change evnets
export const FULLSCREEN_CHANGE = 'fullscreen_change'
export const CSS_FULLSCREEN_CHANGE = 'cssFullscreen_change'
export const MINI_STATE_CHANGE = 'mini_state_change'

export const DEFINITION_CHANGE = 'definition_change'
export const BEFORE_DEFINITION_CHANGE = 'before_definition_change'
export const AFTER_DEFINITION_CHANGE = 'after_definition_change'

// transmuxer events
export const SEI_PARSED = 'SEI_PARSED'

export const RETRY = 'retry'

// 容器宽高变化
export const VIDEO_RESIZE = 'video_resize'

// picture-in-picture状态变化
export const PIP_CHANGE = 'pip_change'

// rotate change
export const ROTATE = 'rotate'

// screenShot
export const SCREEN_SHOT = 'screenShot'

// play next
export const PLAYNEXT = 'playnext'

export const SHORTCUT = 'shortcut'

export const XGLOG = 'xglog'

export const USER_ACTION = 'user_action'

export const RESET = 'reset'

export const SOURCE_ERROR = 'source_error'

export const SOURCE_SUCCESS = 'source_success'

export const SWITCH_SUBTITLE = 'switch_subtitle'

export const VIDEO_EVENTS = [
  'play',
  'playing',
  'ended',
  'pause',
  'error',
  'seeking',
  'seeked',
  'timeupdate',
  'waiting',
  'canplay',
  'canplaythrough',
  'durationchange',
  'volumechange',
  'loadeddata',
  'loadedmetadata',
  'ratechange',
  'progress',
  'loadstart',
  'emptied',
  'stalled',
  'suspend',
  'abort',
  'lowdecode'
]

export const STATS_EVENTS = {
  STATS_INFO: 'stats_info',
  STATS_DOWNLOAD: 'stats_download',
  STATS_RESET: 'stats_reset'
}

export const FPS_STUCK = 'fps_stuck'