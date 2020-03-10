'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var PLAY = exports.PLAY = 'play';
var PLAYING = exports.PLAYING = 'playing';
var ENDED = exports.ENDED = 'ended';
var PAUSE = exports.PAUSE = 'pause';
var ERROR = exports.ERROR = 'error';
var SEEKING = exports.SEEKING = 'seeking';
var SEEKED = exports.SEEKED = 'seeked';
var TIME_UPDATE = exports.TIME_UPDATE = 'timeupdate';
var WAITING = exports.WAITING = 'waiting';
var CANPLAY = exports.CANPLAY = 'canplay';
var CANPLAY_THROUGH = exports.CANPLAY_THROUGH = 'canplaythrough';
var DURATION_CHANGE = exports.DURATION_CHANGE = 'durationchange';
var VOLUME_CHANGE = exports.VOLUME_CHANGE = 'volumechange';
var LOADED_DATA = exports.LOADED_DATA = 'loadeddata';
var RATE_CHANGE = exports.RATE_CHANGE = 'rateChange';

// player events
var BUFFER_CHANGE = exports.BUFFER_CHANGE = 'bufferedChange';
var PLAYER_FOCUS = exports.PLAYER_FOCUS = 'focus';
var PLAYER_BLUR = exports.PLAYER_BLUR = 'blur';
var READY = exports.READY = 'ready';
var URL_NULL = exports.URL_NULL = 'urlNull';
var AUTOPLAY_STARTED = exports.AUTOPLAY_STARTED = 'autoplay_started';
var AUTOPLAY_PREVENTED = exports.AUTOPLAY_PREVENTED = 'autoplay_was_prevented';
var COMPLETE = exports.COMPLETE = 'complete';
var REPLAY = exports.REPLAY = 'replay';
var DESTROY = exports.DESTROY = 'destroy';
var URL_CHANGE = exports.URL_CHANGE = 'urlchange';

// screen change evnets
var FULLSCREEN_CHANGE = exports.FULLSCREEN_CHANGE = 'fullscreen_change';
var CSS_FULLSCREEN_CHANGE = exports.CSS_FULLSCREEN_CHANGE = 'cssFullscreen_change';
var MINI_STATE_CHANGE = exports.MINI_STATE_CHANGE = 'mini_state_change';

// transmuxer events
var SEI_PARSED = exports.SEI_PARSED = 'SEI_PARSED';