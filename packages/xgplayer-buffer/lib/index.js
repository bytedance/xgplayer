'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreSource = exports.RemuxBuffer = exports.XgBuffer = exports.VideoTrack = exports.AudioTrack = exports.Tracks = exports.Track = undefined;

var _track = require('./track');

var _track2 = _interopRequireDefault(_track);

var _buffer = require('./buffer');

var _presouce = require('./presouce');

var _presouce2 = _interopRequireDefault(_presouce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Track = exports.Track = _track2.default;
var Tracks = exports.Tracks = _track.Tracks;
var AudioTrack = exports.AudioTrack = _track.AudioTrack;
var VideoTrack = exports.VideoTrack = _track.VideoTrack;
var XgBuffer = exports.XgBuffer = _buffer.XgBuffer;
var RemuxBuffer = exports.RemuxBuffer = _buffer.RemuxBuffer;
var PreSource = exports.PreSource = _presouce2.default;