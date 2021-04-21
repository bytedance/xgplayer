interface Events {
  PLAY: 'play';
  PLAYING: 'playing';
  ENDED: 'ended';
  PAUSE: 'pause';
  ERROR: 'error';
  SEEKING: 'seeking';
  SEEKED: 'seeked';
  TIME_UPDATE: 'timeupdate';
  WAITING: 'waiting';
  CANPLAY: 'canplay';
  CANPLAY_THROUGH: 'canplaythrough';
  DURATION_CHANGE: 'durationchange';
  VOLUME_CHANGE: 'volumechange';
  LOADED_DATA: 'loadeddata';
  RATE_CHANGE: 'ratechange';
  PROGRESS: 'progress';
  LOAD_START: 'loadstart';
  EMPTIED: 'emptied';
  STALLED: 'stalled';
  SUSPEND: 'suspend';
  ABORT: 'abort';

  // player events;
  BUFFER_CHANGE: 'bufferedChange';
  PLAYER_FOCUS: 'focus';
  PLAYER_BLUR: 'blur';
  READY: 'ready';
  URL_NULL: 'urlNull';
  AUTOPLAY_STARTED: 'autoplay_started';
  AUTOPLAY_PREVENTED: 'autoplay_was_prevented';
  COMPLETE: 'complete';
  REPLAY: 'replay';
  DESTROY: 'destroy';
  URL_CHANGE: 'urlchange';

  // screen change evnets;
  FULLSCREEN_CHANGE: 'fullscreen_change';
  CSS_FULLSCREEN_CHANGE: 'cssFullscreen_change';
  MINI_STATE_CHANGE: 'mini_state_change'
  ;
  DEFINITION_CHANGE: 'definition_change';
  BEFORE_DEFINITION_CHANGE: 'before_definition_change';
  AFTER_DEFINITION_CHANGE: 'after_definition_change';

  // transmuxer events;
  SEI_PARSED: 'SEI_PARSED';
  RETRY: 'retry';
  // 容器宽高变化;
  VIDEO_RESIZE: 'video_resize';

  // picture-in-picture状态变化;
  PIP_CHANGE: 'pip_change';
}
export default Events
