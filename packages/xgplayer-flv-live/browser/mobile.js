window["FlvPlayer"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../node_modules/events/events.js":
/*!*****************************************************************************************!*\
  !*** /Users/leonardo/Documents/front-end/player/xgplayer/node_modules/events/events.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
  return Function.prototype.apply.call(target, receiver, args);
};

var ReflectOwnKeys;
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
};

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function () {
    return defaultMaxListeners;
  },
  set: function (arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function () {

  if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = type === 'error';

  var events = this._events;
  if (events !== undefined) doError = doError && events.error === undefined;else if (!doError) return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0) er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined) return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i) ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type, listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = $getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true);
};

function onceWrapper() {
  var args = [];
  for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    ReflectApply(this.listener, this.target, args);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
};

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener = function removeListener(type, listener) {
  var list, events, position, i, originalListener;

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }

  events = this._events;
  if (events === undefined) return this;

  list = events[type];
  if (list === undefined) return this;

  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0) this._events = Object.create(null);else {
      delete events[type];
      if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
    }
  } else if (typeof list !== 'function') {
    position = -1;

    for (i = list.length - 1; i >= 0; i--) {
      if (list[i] === listener || list[i].listener === listener) {
        originalListener = list[i].listener;
        position = i;
        break;
      }
    }

    if (position < 0) return this;

    if (position === 0) list.shift();else {
      spliceOne(list, position);
    }

    if (list.length === 1) events[type] = list[0];

    if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
  }

  return this;
};

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
  var listeners, events, i;

  events = this._events;
  if (events === undefined) return this;

  // not listening for removeListener, no need to emit
  if (events.removeListener === undefined) {
    if (arguments.length === 0) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    } else if (events[type] !== undefined) {
      if (--this._eventsCount === 0) this._events = Object.create(null);else delete events[type];
    }
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    var keys = Object.keys(events);
    var key;
    for (i = 0; i < keys.length; ++i) {
      key = keys[i];
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = Object.create(null);
    this._eventsCount = 0;
    return this;
  }

  listeners = events[type];

  if (typeof listeners === 'function') {
    this.removeListener(type, listeners);
  } else if (listeners !== undefined) {
    // LIFO order
    for (i = listeners.length - 1; i >= 0; i--) {
      this.removeListener(type, listeners[i]);
    }
  }

  return this;
};

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined) return [];

  var evlistener = events[type];
  if (evlistener === undefined) return [];

  if (typeof evlistener === 'function') return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function (emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i) copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++) list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

/***/ }),

/***/ "../xgplayer-buffer/index.js":
/*!***********************************!*\
  !*** ../xgplayer-buffer/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  Track: __webpack_require__(/*! ./src/track */ "../xgplayer-buffer/src/track.js").default,
  Tracks: __webpack_require__(/*! ./src/track */ "../xgplayer-buffer/src/track.js").Tracks,
  AudioTrack: __webpack_require__(/*! ./src/track */ "../xgplayer-buffer/src/track.js").AudioTrack,
  VideoTrack: __webpack_require__(/*! ./src/track */ "../xgplayer-buffer/src/track.js").VideoTrack,

  XgBuffer: __webpack_require__(/*! ./src/buffer */ "../xgplayer-buffer/src/buffer.js").XgBuffer,
  RemuxBuffer: __webpack_require__(/*! ./src/buffer */ "../xgplayer-buffer/src/buffer.js").RemuxBuffer,

  PreSource: __webpack_require__(/*! ./src/presouce */ "../xgplayer-buffer/src/presouce.js").default
};

/***/ }),

/***/ "../xgplayer-buffer/src/buffer.js":
/*!****************************************!*\
  !*** ../xgplayer-buffer/src/buffer.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
class XgBuffer {
  /**
   * A buffer to store loaded data.
   *
   * @class LoaderBuffer
   * @param {number} length - Optional the buffer size
   */
  constructor(length) {
    this.length = length || 0;
    this.historyLen = length || 0;
    this.array = [];
    this.offset = 0;
  }

  /**
   * The function to push data.
   *
   * @param {number} data - The data to push into the buffer
   */
  push(data) {
    this.array.push(data);
    this.length += data.byteLength;
    this.historyLen += data.byteLength;
  }

  /**
   * The function to shift data.
   *
   * @param {number} length - The size of shift.
   */
  shift(length) {
    if (this.array.length < 1) {
      return new Uint8Array(0);
    }

    if (length === undefined) {
      return this._shiftBuffer();
    }
    if (this.offset + length === this.array[0].length) {
      let ret = this.array[0].slice(this.offset, this.offset + length);
      this.offset = 0;
      this.array.shift();
      this.length -= length;
      return ret;
    }

    if (this.offset + length < this.array[0].length) {
      let ret = this.array[0].slice(this.offset, this.offset + length);
      this.offset += length;
      this.length -= length;
      return ret;
    }

    let ret = new Uint8Array(length);
    let tmpoff = 0;
    while (this.array.length > 0 && length > 0) {
      if (this.offset + length < this.array[0].length) {
        let tmp = this.array[0].slice(this.offset, this.offset + length);
        ret.set(tmp, tmpoff);
        this.offset += length;
        this.length -= length;
        length = 0;
        break;
      } else {
        let templength = this.array[0].length - this.offset;
        ret.set(this.array[0].slice(this.offset, this.array[0].length), tmpoff);
        this.array.shift();
        this.offset = 0;
        tmpoff += templength;
        this.length -= templength;
        length -= templength;
      }
    }
    return ret;
  }

  /**
   * Function to clear the buffer.
   */
  clear() {
    this.array = [];
    this.length = 0;
    this.offset = 0;
  }

  destroy() {
    this.clear();
    this.historyLen = 0;
  }

  /**
   * Function to shift one unit8Array.
   */
  _shiftBuffer() {
    this.length -= this.array[0].length;
    this.offset = 0;
    return this.array.shift();
  }

  /**
   * Convert uint8 data to number.
   *
   * @param {number} start - the start postion.
   * @param {number} length - the length of data.
   */
  toInt(start, length) {
    let retInt = 0;
    let i = this.offset + start;
    while (i < this.offset + length + start) {
      if (i < this.array[0].length) {
        retInt = retInt * 256 + this.array[0][i];
      } else if (this.array[1]) {
        retInt = retInt * 256 + this.array[1][i - this.array[0].length];
      }

      i++;
    }
    return retInt;
  }
}

exports.XgBuffer = XgBuffer;
class RemuxBuffer {
  constructor() {
    this.video = [];
    this.audio = [];
  }

  destroy() {
    this.video = [];
    this.audio = [];
  }
}
exports.RemuxBuffer = RemuxBuffer;

/***/ }),

/***/ "../xgplayer-buffer/src/presouce.js":
/*!******************************************!*\
  !*** ../xgplayer-buffer/src/presouce.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
class Source {
  constructor() {
    this.mimetype = '';
    this.init = null;
    this.data = [];
  }
}

class PreSource {
  constructor() {
    this.sources = {};
  }

  getSource(source) {
    return this.sources[source];
  }

  createSource(name) {
    this.sources[name] = new Source();
    return this.sources[name];
  }

  clear() {
    this.sources = {};
  }

  destroy() {
    this.sources = {};
  }
}

exports.default = PreSource;

/***/ }),

/***/ "../xgplayer-buffer/src/track.js":
/*!***************************************!*\
  !*** ../xgplayer-buffer/src/track.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
class Track {
  /**
   * The constructor.
   */
  constructor() {
    this.id = -1;
    this.sequenceNumber = 0;
    this.samples = [];
    this.droppedSamples = [];
    this.length = 0;
  }

  /**
   * Reset the track.
   */
  reset() {
    this.sequenceNumber = 0;
    this.samples = [];
    this.length = 0;
  }
  /**
   * destroy the track.
   */
  distroy() {
    this.reset();
    this.id = -1;
  }
}

exports.default = Track;
class AudioTrack extends Track {
  /**
   * The constructor for audio track.
   */
  constructor() {
    super();
    this.TAG = 'AudioTrack';
    this.type = 'audio';
  }
}

exports.AudioTrack = AudioTrack;
class VideoTrack extends Track {
  /**
   * The constructor for video track.
   */
  constructor() {
    super();
    this.TAG = 'VideoTrack';
    this.type = 'video';
    this.dropped = 0;
  }
  /**
   * reset the video track.
   */
  reset() {
    this.sequenceNumber = 0;
    this.samples = [];
    this.length = 0;
    this.dropped = 0;
  }
}

exports.VideoTrack = VideoTrack;
class Tracks {
  constructor() {
    this.audioTrack = null;
    this.videoTrack = null;
  }

  destroy() {
    this.audioTrack = null;
    this.videoTrack = null;
  }
}
exports.Tracks = Tracks;

/***/ }),

/***/ "../xgplayer-codec/index.js":
/*!**********************************!*\
  !*** ../xgplayer-codec/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  Nalunit: __webpack_require__(/*! ./src/h264/nalunit */ "../xgplayer-codec/src/h264/nalunit/index.js").default,
  SpsParser: __webpack_require__(/*! ./src/h264/nalunit/sps */ "../xgplayer-codec/src/h264/nalunit/sps.js").default,

  Compatibility: __webpack_require__(/*! ./src/compatibility */ "../xgplayer-codec/src/compatibility.js").default
};

/***/ }),

/***/ "../xgplayer-codec/src/aac/aac-helper.js":
/*!***********************************************!*\
  !*** ../xgplayer-codec/src/aac/aac-helper.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

class AAC {

  static getSilentFrame(codec, channelCount) {
    if (codec === 'mp4a.40.2') {
      // handle LC-AAC
      if (channelCount === 1) {
        return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x23, 0x80]);
      } else if (channelCount === 2) {
        return new Uint8Array([0x21, 0x00, 0x49, 0x90, 0x02, 0x19, 0x00, 0x23, 0x80]);
      } else if (channelCount === 3) {
        return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x8e]);
      } else if (channelCount === 4) {
        return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x80, 0x2c, 0x80, 0x08, 0x02, 0x38]);
      } else if (channelCount === 5) {
        return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x82, 0x30, 0x04, 0x99, 0x00, 0x21, 0x90, 0x02, 0x38]);
      } else if (channelCount === 6) {
        return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x82, 0x30, 0x04, 0x99, 0x00, 0x21, 0x90, 0x02, 0x00, 0xb2, 0x00, 0x20, 0x08, 0xe0]);
      }
    } else {
      // handle HE-AAC (mp4a.40.5 / mp4a.40.29)
      if (channelCount === 1) {
        // ffmpeg -y -f lavfi -i "aevalsrc=0:d=0.05" -c:a libfdk_aac -profile:a aac_he -b:a 4k output.aac && hexdump -v -e '16/1 "0x%x," "\n"' -v output.aac
        return new Uint8Array([0x1, 0x40, 0x22, 0x80, 0xa3, 0x4e, 0xe6, 0x80, 0xba, 0x8, 0x0, 0x0, 0x0, 0x1c, 0x6, 0xf1, 0xc1, 0xa, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5e]);
      } else if (channelCount === 2) {
        // ffmpeg -y -f lavfi -i "aevalsrc=0|0:d=0.05" -c:a libfdk_aac -profile:a aac_he_v2 -b:a 4k output.aac && hexdump -v -e '16/1 "0x%x," "\n"' -v output.aac
        return new Uint8Array([0x1, 0x40, 0x22, 0x80, 0xa3, 0x5e, 0xe6, 0x80, 0xba, 0x8, 0x0, 0x0, 0x0, 0x0, 0x95, 0x0, 0x6, 0xf1, 0xa1, 0xa, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5e]);
      } else if (channelCount === 3) {
        // ffmpeg -y -f lavfi -i "aevalsrc=0|0|0:d=0.05" -c:a libfdk_aac -profile:a aac_he_v2 -b:a 4k output.aac && hexdump -v -e '16/1 "0x%x," "\n"' -v output.aac
        return new Uint8Array([0x1, 0x40, 0x22, 0x80, 0xa3, 0x5e, 0xe6, 0x80, 0xba, 0x8, 0x0, 0x0, 0x0, 0x0, 0x95, 0x0, 0x6, 0xf1, 0xa1, 0xa, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5a, 0x5e]);
      }
    }
    return null;
  }

}

exports.default = AAC;

/***/ }),

/***/ "../xgplayer-codec/src/compatibility.js":
/*!**********************************************!*\
  !*** ../xgplayer-codec/src/compatibility.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xgplayerUtils = __webpack_require__(/*! xgplayer-utils */ "../xgplayer-utils/index.js");

var _aacHelper = __webpack_require__(/*! ./aac/aac-helper */ "../xgplayer-codec/src/aac/aac-helper.js");

var _aacHelper2 = _interopRequireDefault(_aacHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { REMUX_EVENTS, DEMUX_EVENTS } = _xgplayerUtils.EVENTS;

class Compatibility {
  constructor() {
    this.nextAudioDts = 0; // 模拟下一段音频数据的dts
    this.nextVideoDts = 0; // 模拟下一段视频数据的dts

    this.lastAudioSamplesLen = 0; // 上一段音频数据的长度
    this.lastVideoSamplesLen = 0; // 上一段视频数据的长度

    this.lastVideoDts = undefined; // 上一段音频数据的长度
    this.lastAudioDts = undefined; // 上一段视频数据的长度

    this.allAudioSamplesCount = 0; // 音频总数据量(原始帧)
    this.allVideoSamplesCount = 0; // 视频总数据量(原始帧)

    this._firstAudioSample = null;
    this._firstVideoSample = null;

    this.filledAudioSamples = []; // 补充音频帧（）
    this.filledVideoSamples = []; // 补充视频帧（）

    this._videoLargeGap = 0;
    this._audioLargeGap = 0;
  }

  init() {
    this.before(REMUX_EVENTS.REMUX_MEDIA, this.doFix.bind(this));
  }

  reset() {
    this.nextAudioDts = null; // 估算下一段音频数据的dts
    this.nextVideoDts = null; // 估算下一段视频数据的dts

    this.lastAudioSamplesLen = 0; // 上一段音频数据的长度
    this.lastVideoSamplesLen = 0; // 上一段视频数据的长度

    this.lastVideoDts = undefined; // 上一段音频数据的长度
    this.lastAudioDts = undefined; // 上一段视频数据的长度

    // this.allAudioSamplesCount = 0 // 音频总数据量(原始帧)
    // this.allVideoSamplesCount = 0 // 视频总数据量(原始帧)

    // this._firstAudioSample = null
    // this._firstVideoSample = null

    this.filledAudioSamples = []; // 补充音频帧（）
    this.filledVideoSamples = []; // 补充视频帧（）
  }

  doFix() {
    const { isFirstAudioSamples, isFirstVideoSamples } = this.getFirstSample();

    // this.removeInvalidSamples()

    this.recordSamplesCount();

    if (this._firstVideoSample) {
      this.fixRefSampleDuration(this.videoTrack.meta, this.videoTrack.samples);
    }
    if (this._firstAudioSample) {
      this.fixRefSampleDuration(this.audioTrack.meta, this.audioTrack.samples);
    }

    const { changed: videoChanged, changedIdx: videoChangedIdx } = Compatibility.detactChangeStream(this.videoTrack.samples);
    if (videoChanged && !isFirstAudioSamples) {
      this.fixChangeStreamVideo(videoChangedIdx);
    } else {
      this.doFixVideo(isFirstVideoSamples);
    }

    const { changed: audioChanged, changedIdx: audioChangedIdx } = Compatibility.detactChangeStream(this.audioTrack.samples);
    if (audioChanged) {
      this.fixChangeStreamAudio(audioChangedIdx);
    } else {
      this.doFixAudio(isFirstAudioSamples);
    }

    // this.removeInvalidSamples()
  }

  doFixVideo(first, streamChangeStart) {
    let { samples: videoSamples, meta } = this.videoTrack;

    if (meta.frameRate && meta.frameRate.fixed === false) {
      return;
    }

    if (!videoSamples || !videoSamples.length || !this._firstVideoSample) {
      return;
    }

    // console.log(`video lastSample, ${videoSamples[videoSamples.length - 1].dts}`)

    const firstSample = videoSamples[0];

    const samplesLen = videoSamples.length;

    // step0.修复hls流出现巨大gap，需要强制重定位的问题
    if (this._videoLargeGap > 0) {
      Compatibility.doFixLargeGap(videoSamples, this._videoLargeGap);
    }

    if (firstSample.dts !== this._firstVideoSample.dts && (streamChangeStart || Compatibility.detectLargeGap(this.nextVideoDts, firstSample))) {
      if (streamChangeStart) {
        this.nextVideoDts = streamChangeStart; // FIX: Hls中途切codec，在如果直接seek到后面的点会导致largeGap计算失败
      }

      this._videoLargeGap = this.nextVideoDts - firstSample.dts;
      Compatibility.doFixLargeGap(videoSamples, this._videoLargeGap);
    }

    const firstDts = firstSample.dts;

    // step1. 修复与audio首帧差距太大的问题
    if (first && this._firstAudioSample) {
      const videoFirstDts = this._firstVideoSample.dts;
      const audioFirstDts = this._firstAudioSample.dts;
      const gap = videoFirstDts - audioFirstDts;
      if (gap > 2 * meta.refSampleDuration) {
        const fillCount = Math.floor(gap / meta.refSampleDuration);

        for (let i = 0; i < fillCount; i++) {
          const clonedFirstSample = Object.assign({}, firstSample); // 视频头部帧缺失需要复制第一帧
          // 重新计算sample的dts和pts
          clonedFirstSample.dts = videoFirstDts - (i + 1) * meta.refSampleDuration;
          clonedFirstSample.pts = clonedFirstSample.dts + clonedFirstSample.cts;

          videoSamples.unshift(clonedFirstSample);

          this.filledVideoSamples.push({
            dts: clonedFirstSample.dts,
            size: clonedFirstSample.data.byteLength
          });
        }
      }
    }

    let gap;
    // step2. 修复samples段之间的间距问题、
    if (this.nextVideoDts) {
      // step1. 处理samples段之间的丢帧情况
      // 当发现duration差距大于2帧时进行补帧
      gap = firstDts - this.nextVideoDts;
      const absGap = Math.abs(gap);
      if (gap > 2 * meta.refSampleDuration) {
        const fillFrameCount = Math.floor(gap / meta.refSampleDuration);

        for (let i = 0; i < fillFrameCount; i++) {
          const clonedSample = Object.assign({}, videoSamples[0]);
          const computed = firstDts - (i + 1) * meta.refSampleDuration;

          clonedSample.dts = computed > this.nextVideoDts ? computed : this.nextVideoDts; // 补的第一帧一定要是nextVideoDts
          clonedSample.pts = clonedSample.dts + clonedSample.cts;

          this.videoTrack.samples.unshift(clonedSample);

          this.filledVideoSamples.push({
            dts: clonedSample.dts,
            size: clonedSample.data.byteLength
          });
        }
      } else if (absGap <= meta.refSampleDuration && absGap > 0) {
        // 当差距在+-一帧之间时将第一帧的dts强行定位到期望位置
        // console.log('重定位视频帧dts', videoSamples[0].dts, this.nextVideoDts)
        videoSamples[0].dts = this.nextVideoDts;
        videoSamples[0].originDts = videoSamples[0].dts;
        videoSamples[0].cts = videoSamples[0].cts !== undefined ? videoSamples[0].cts : videoSamples[0].pts - videoSamples[0].dts;
        videoSamples[0].pts = videoSamples[0].dts + videoSamples[0].cts;
      } else if (gap < 0) {
        // 出现大的gap
        Compatibility.doFixLargeGap(videoSamples, -1 * gap);
      }
    }
    const lastDts = videoSamples[videoSamples.length - 1].dts;

    const lastSampleDuration = videoSamples.length >= 2 ? lastDts - videoSamples[videoSamples.length - 2].dts : meta.refSampleDuration;

    this.lastVideoSamplesLen = samplesLen;
    this.nextVideoDts = lastDts + lastSampleDuration;
    this.lastVideoDts = lastDts;

    // step2. 修复sample段之内的间距问题
    // step3. 修复samples段内部的dts异常问题
    for (let i = 0, len = videoSamples.length; i < len; i++) {
      const current = videoSamples[i];
      const next = videoSamples[i + 1];

      if (!next) {
        break;
      }

      const duration = next.dts - current.dts;

      if (duration > 2 * meta.refSampleDuration) {
        // 两帧之间间隔太大，需要补空白帧
        let fillFrameCount = Math.floor(duration / meta.refSampleDuration);

        let fillFrameIdx = 0;
        while (fillFrameIdx < fillFrameCount) {
          const fillFrame = Object.assign({}, next);
          fillFrame.dts = current.dts + (fillFrameIdx + 1) * meta.refSampleDuration;
          fillFrame.pts = fillFrame.dts + fillFrame.cts;
          if (fillFrame < next.dts) {
            videoSamples.splice(i, 0, fillFrame);

            this.filledVideoSamples.push({
              dts: fillFrame.dts,
              size: fillFrame.data.byteLength
            });
          }

          fillFrameIdx++;
          i++;
        }
      }
    }

    this.videoTrack.samples = videoSamples;
  }

  doFixAudio(first, streamChangeStart) {
    let { samples: audioSamples, meta } = this.audioTrack;

    if (!audioSamples || !audioSamples.length) {
      return;
    }
    // console.log(`audio lastSample, ${audioSamples[audioSamples.length - 1].dts}`)

    const samplesLen = audioSamples.length;
    const silentFrame = _aacHelper2.default.getSilentFrame(meta.codec, meta.channelCount);

    const firstSample = this._firstAudioSample;

    const _firstSample = audioSamples[0];
    // 对audioSamples按照dts做排序
    // audioSamples = Compatibility.sortAudioSamples(audioSamples)
    if (this._audioLargeGap > 0) {
      Compatibility.doFixLargeGap(audioSamples, this._audioLargeGap);
    }

    if (_firstSample.dts !== this._firstAudioSample.dts && (streamChangeStart || Compatibility.detectLargeGap(this.nextAudioDts, _firstSample))) {
      if (streamChangeStart) {
        this.nextAudioDts = streamChangeStart; // FIX: Hls中途切codec，在如果直接seek到后面的点会导致largeGap计算失败
      }
      this._audioLargeGap = this.nextAudioDts - _firstSample.dts;
      Compatibility.doFixLargeGap(audioSamples, this._audioLargeGap);
    }
    // step0. 首帧与video首帧间距大的问题
    if (this._firstVideoSample && first) {
      const videoFirstPts = this._firstVideoSample.pts ? this._firstVideoSample.pts : this._firstVideoSample.dts + this._firstVideoSample.cts;

      if (firstSample.dts - videoFirstPts > meta.refSampleDuration) {
        const silentSampleCount = Math.floor((firstSample.dts - videoFirstPts) / meta.refSampleDuration);

        for (let i = 0; i < silentSampleCount; i++) {
          const silentSample = {
            data: silentFrame,
            datasize: silentFrame.byteLength,
            dts: firstSample.dts - (i + 1) * meta.refSampleDuration,
            filtered: 0
          };

          audioSamples.unshift(silentSample);

          this.filledAudioSamples.push({
            dts: silentSample.dts,
            size: silentSample.data.byteLength
          });
        }
      }
    }

    let gap;
    const firstDts = audioSamples[0].dts;

    if (this.nextAudioDts) {
      // step1. 处理samples段之间的丢帧情况
      // 当发现duration差距大于1帧时进行补帧
      gap = firstDts - this.nextAudioDts;
      const absGap = Math.abs(gap);

      if (absGap > meta.refSampleDuration && samplesLen === 1 && this.lastAudioSamplesLen === 1) {
        meta.refSampleDurationFixed = undefined;
      }

      if (gap > 2 * meta.refSampleDuration) {
        if (samplesLen === 1 && this.lastAudioSamplesLen === 1) {
          // 如果sample的length一直是1，而且一直不符合refSampleDuration，需要动态修改refSampleDuration
          meta.refSampleDurationFixed = meta.refSampleDurationFixed !== undefined ? meta.refSampleDurationFixed + gap : meta.refSampleDuration + gap;
        } else {
          const silentFrameCount = Math.floor(gap / meta.refSampleDuration);

          for (let i = 0; i < silentFrameCount; i++) {
            const computed = firstDts - (i + 1) * meta.refSampleDuration;
            const silentSample = Object.assign({}, audioSamples[0], {
              dts: computed > this.nextAudioDts ? computed : this.nextAudioDts
            });

            this.filledAudioSamples.push({
              dts: silentSample.dts,
              size: silentSample.data.byteLength
            });
            this.audioTrack.samples.unshift(silentSample);
          }
        }
      } else if (absGap <= meta.refSampleDuration && absGap > 0) {
        // 当差距比较小的时候将音频帧重定位
        // console.log('重定位音频帧dts', audioSamples[0].dts, this.nextAudioDts)
        audioSamples[0].dts = this.nextAudioDts;
        audioSamples[0].pts = this.nextAudioDts;
      } else if (gap < 0) {
        Compatibility.doFixLargeGap(audioSamples, -1 * gap);
      }
    }
    const lastDts = audioSamples[audioSamples.length - 1].dts;
    const lastSampleDuration = audioSamples.length >= 2 ? lastDts - audioSamples[audioSamples.length - 2].dts : meta.refSampleDuration;

    this.lastAudioSamplesLen = samplesLen;
    this.nextAudioDts = meta.refSampleDurationFixed ? lastDts + meta.refSampleDurationFixed : lastDts + lastSampleDuration;
    this.lastAudioDts = lastDts;

    // step3. 修复samples段内部的dts异常问题
    for (let i = 0, len = audioSamples.length; i < len; i++) {
      const current = audioSamples[i];
      const next = audioSamples[i + 1];

      if (!next) {
        break;
      }

      const duration = next.dts - current.dts;
      audioSamples[i].duration = duration;
      /*
      if (duration > (2 * meta.refSampleDuration)) {
        // 两帧之间间隔太大，需要补空白帧
        /**
        let silentFrameCount = Math.floor(duration / meta.refSampleDuration)
        let frameIdx = 0
         while (frameIdx < silentFrameCount) {
          const silentSample = {
            data: silentFrame,
            datasize: silentFrame.byteLength,
            dts: current.dts + (frameIdx + 1) * meta.refSampleDuration,
            filtered: 0,
            isSilent: true
          }
           audioSamples.splice(i, 0, silentSample)
           this.filledAudioSamples.push({
            dts: silentSample.dts,
            size: silentSample.data.byteLength
          })
           frameIdx++
          i++ // 不对静音帧做比较
        }
      } */
    }

    this.audioTrack.samples = Compatibility.sortAudioSamples(audioSamples);
  }

  fixChangeStreamVideo(changeIdx) {
    const { samples, meta } = this.videoTrack;
    const prevDts = changeIdx === 0 ? this.getStreamChangeStart(samples[0]) : samples[changeIdx - 1].dts;
    const curDts = samples[changeIdx].dts;
    const isContinue = Math.abs(prevDts - curDts) <= 2 * meta.refSampleDuration;

    if (isContinue) {
      if (!samples[changeIdx].options) {
        samples[changeIdx].options = {
          isContinue: true
        };
      } else {
        samples[changeIdx].options.isContinue = true;
      }
      return this.doFixVideo(false);
    }

    const firstPartSamples = samples.slice(0, changeIdx);
    const secondPartSamples = samples.slice(changeIdx);
    const firstSample = samples[0];

    const changeSample = secondPartSamples[0];
    const firstPartDuration = changeSample.dts - firstSample.dts;
    const streamChangeStart = firstSample.options && firstSample.options.start + firstPartDuration ? firstSample.options.start : null;

    this.videoTrack.samples = samples.slice(0, changeIdx);

    this.doFixVideo(false);

    this.videoTrack.samples = samples.slice(changeIdx);

    this.doFixVideo(false, streamChangeStart);

    this.videoTrack.samples = firstPartSamples.concat(secondPartSamples);
  }

  fixChangeStreamAudio(changeIdx) {
    const { samples, meta } = this.audioTrack;

    const prevDts = changeIdx === 0 ? this.getStreamChangeStart(samples[0]) : samples[changeIdx - 1].dts;
    const curDts = samples[changeIdx].dts;
    const isContinue = Math.abs(prevDts - curDts) <= 2 * meta.refSampleDuration;

    if (isContinue) {
      if (!samples[changeIdx].options) {
        samples[changeIdx].options = {
          isContinue: true
        };
      } else {
        samples[changeIdx].options.isContinue = true;
      }
      return this.doFixAudio(false);
    }

    const firstPartSamples = samples.slice(0, changeIdx);
    const secondPartSamples = samples.slice(changeIdx);
    const firstSample = samples[0];

    const changeSample = secondPartSamples[0];
    const firstPartDuration = changeSample.dts - firstSample.dts;
    const streamChangeStart = firstSample.options && firstSample.options.start + firstPartDuration ? firstSample.options.start : null;

    this.audioTrack.samples = firstPartSamples;

    this.doFixAudio(false);

    this.audioTrack.samples = secondPartSamples;

    this.doFixAudio(false, streamChangeStart);

    this.audioTrack.samples = firstPartSamples.concat(secondPartSamples);
  }

  getFirstSample() {
    // 获取video和audio的首帧数据
    let { samples: videoSamples } = this.videoTrack;
    let { samples: audioSamples } = this.audioTrack;

    let isFirstVideoSamples = false;
    let isFirstAudioSamples = false;

    if (!this._firstVideoSample && videoSamples.length) {
      this._firstVideoSample = Compatibility.findFirstVideoSample(videoSamples);
      isFirstVideoSamples = true;
    }

    if (!this._firstAudioSample && audioSamples.length) {
      this._firstAudioSample = Compatibility.findFirstAudioSample(audioSamples); // 寻找dts最小的帧作为首个音频帧
      isFirstAudioSamples = true;
    }

    return {
      isFirstVideoSamples,
      isFirstAudioSamples
    };
  }

  /**
   * 在没有refSampleDuration的问题流中，
   */
  fixRefSampleDuration(meta, samples) {
    const isVideo = meta.type === 'video';
    const allSamplesCount = isVideo ? this.allVideoSamplesCount : this.allAudioSamplesCount;
    const firstDts = isVideo ? this._firstVideoSample.dts : this._firstAudioSample.dts;
    const filledSamplesCount = isVideo ? this.filledVideoSamples.length : this.filledAudioSamples.length;

    if (!meta.refSampleDuration || meta.refSampleDuration <= 0 || Number.isNaN(meta.refSampleDuration)) {
      if (samples.length >= 1) {
        const lastDts = samples[samples.length - 1].dts;

        meta.refSampleDuration = Math.floor((lastDts - firstDts) / (allSamplesCount + filledSamplesCount - 1)); // 将refSampleDuration重置为计算后的平均值
      }
    } else if (meta.refSampleDuration) {
      if (samples.length >= 5) {
        const lastDts = samples[samples.length - 1].dts;
        const firstDts = samples[0].dts;
        const durationAvg = (lastDts - firstDts) / (samples.length - 1);

        meta.refSampleDuration = Math.floor(Math.abs(meta.refSampleDuration - durationAvg) <= 5 ? meta.refSampleDuration : durationAvg); // 将refSampleDuration重置为计算后的平均值
      }
    }
  }

  /**
   * 记录截止目前一共播放了多少帧
   */
  recordSamplesCount() {
    const { audioTrack, videoTrack } = this;

    this.allAudioSamplesCount += audioTrack.samples.length;
    this.allVideoSamplesCount += videoTrack.samples.length;
  }

  /**
   * 去除不合法的帧（倒退、重复帧）
   */
  removeInvalidSamples() {
    const { _firstVideoSample, _firstAudioSample } = this;

    this.audioTrack.samples = this.audioTrack.samples.filter(sample => {
      return sample.dts >= _firstAudioSample.dts && (this.lastAudioDts === undefined || sample.dts > this.lastAudioDts);
    });

    this.videoTrack.samples = this.videoTrack.samples.filter(sample => {
      return sample.dts >= _firstVideoSample.dts && (this.lastVideoDts === undefined || sample.dts > this.lastVideoDts);
    });
  }

  getStreamChangeStart(sample) {
    if (sample.options && sample.options.start) {
      return sample.options.start - this.dtsBase;
    }
    return Infinity;
  }

  static sortAudioSamples(samples) {
    if (samples.length === 1) {
      return samples;
    }

    return samples.sort((a, b) => {
      return a.dts - b.dts;
    });
  }

  /**
   * 寻找dts最小的sample
   * @param samples
   */
  static findFirstAudioSample(samples) {
    if (!samples || samples.length === 0) {
      return null;
    }

    return Compatibility.sortAudioSamples(samples)[0];
  }

  static findFirstVideoSample(samples) {
    if (!samples.length) {
      return null;
    }

    const sorted = samples.sort((a, b) => {
      return a.dts - b.dts;
    });

    for (let i = 0, len = sorted.length; i < len; i++) {
      if (sorted[i].isKeyframe) {
        return sorted[i];
      }
    }
  }

  static detectLargeGap(nextDts, firstSample) {
    if (nextDts === null) {
      return;
    }
    const curDts = firstSample.dts || 0;
    const cond1 = nextDts - curDts >= 1000 || curDts - nextDts >= 1000; // fix hls流出现大量流dts间距问题
    const cond2 = firstSample.options && firstSample.options.discontinue;

    return cond1 || cond2;
  }

  static doFixLargeGap(samples, gap) {
    for (let i = 0, len = samples.length; i < len; i++) {
      const sample = samples[i];
      sample.dts += gap;
      if (sample.pts) {
        sample.pts += gap;
      }
    }
  }

  /**
   * 中途换流
   */
  static detactChangeStream(samples) {
    let changed = false;
    let changedIdx = -1;
    for (let i = 0, len = samples.length; i < len; i++) {
      if (samples[i].options && samples[i].options.meta) {
        changed = true;
        changedIdx = i;
        break;
      }
    }

    return {
      changed,
      changedIdx
    };
  }

  get tracks() {
    return this._context.getInstance('TRACKS');
  }

  get audioTrack() {
    if (this.tracks) {
      return this.tracks.audioTrack;
    }
    return null;
  }

  get videoTrack() {
    if (this.tracks) {
      return this.tracks.videoTrack;
    }
    return null;
  }

  get dtsBase() {
    const remuxer = this._context.getInstance('MP4_REMUXER');
    if (remuxer) {
      return remuxer._dtsBase;
    }
    return 0;
  }
}
exports.default = Compatibility;

/***/ }),

/***/ "../xgplayer-codec/src/h264/nalunit/golomb.js":
/*!****************************************************!*\
  !*** ../xgplayer-codec/src/h264/nalunit/golomb.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
class Golomb {
  constructor(uint8array) {
    this.TAG = 'Golomb';
    this._buffer = uint8array;
    this._bufferIndex = 0;
    this._totalBytes = uint8array.byteLength;
    this._totalBits = uint8array.byteLength * 8;
    this._currentWord = 0;
    this._currentWordBitsLeft = 0;
  }

  destroy() {
    this._buffer = null;
  }

  _fillCurrentWord() {
    let bufferBytesLeft = this._totalBytes - this._bufferIndex;
    if (bufferBytesLeft <= 0) {
      // TODO 异常处理
    }

    let bytesRead = Math.min(4, bufferBytesLeft);
    let word = new Uint8Array(4);
    word.set(this._buffer.subarray(this._bufferIndex, this._bufferIndex + bytesRead));
    this._currentWord = new DataView(word.buffer).getUint32(0);

    this._bufferIndex += bytesRead;
    this._currentWordBitsLeft = bytesRead * 8;
  }

  readBits(size) {
    let bits = Math.min(this._currentWordBitsLeft, size); // :uint
    let valu = this._currentWord >>> 32 - bits;
    if (size > 32) {
      throw new Error('Cannot read more than 32 bits at a time');
    }
    this._currentWordBitsLeft -= bits;
    if (this._currentWordBitsLeft > 0) {
      this._currentWord <<= bits;
    } else if (this._totalBytes - this._bufferIndex > 0) {
      this._fillCurrentWord();
    }

    bits = size - bits;
    if (bits > 0 && this._currentWordBitsLeft) {
      return valu << bits | this.readBits(bits);
    } else {
      return valu;
    }
  }

  readBool() {
    return this.readBits(1) === 1;
  }

  readByte() {
    return this.readBits(8);
  }

  _skipLeadingZero() {
    let zeroCount;
    for (zeroCount = 0; zeroCount < this._currentWordBitsLeft; zeroCount++) {
      if ((this._currentWord & 0x80000000 >>> zeroCount) !== 0) {
        this._currentWord <<= zeroCount;
        this._currentWordBitsLeft -= zeroCount;
        return zeroCount;
      }
    }
    this._fillCurrentWord();
    return zeroCount + this._skipLeadingZero();
  }

  readUEG() {
    // unsigned exponential golomb
    let leadingZeros = this._skipLeadingZero();
    return this.readBits(leadingZeros + 1) - 1;
  }

  readSEG() {
    // signed exponential golomb
    let value = this.readUEG();
    if (value & 0x01) {
      return value + 1 >>> 1;
    } else {
      return -1 * (value >>> 1);
    }
  }
}

exports.default = Golomb;

/***/ }),

/***/ "../xgplayer-codec/src/h264/nalunit/index.js":
/*!***************************************************!*\
  !*** ../xgplayer-codec/src/h264/nalunit/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sps = __webpack_require__(/*! ./sps */ "../xgplayer-codec/src/h264/nalunit/sps.js");

var _sps2 = _interopRequireDefault(_sps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Nalunit {
  static getNalunits(buffer) {
    if (buffer.length - buffer.position < 4) {
      return [];
    }

    let buf = buffer.dataview;
    let position = buffer.position;
    if (buf.getInt32(position) === 1 || buf.getInt16(position) === 0 && buf.getInt8(position + 2) === 1) {
      return Nalunit.getAnnexbNals(buffer);
    } else {
      return Nalunit.getAvccNals(buffer);
    }
  }

  static getAnnexbNals(buffer) {
    let nals = [];
    let position = Nalunit.getHeaderPositionAnnexB(buffer);
    let start = position.pos;
    let end = start;
    while (start < buffer.length - 4) {
      let header = buffer.buffer.slice(start, start + position.headerLength);
      if (position.pos === buffer.position) {
        buffer.skip(position.headerLength);
      }
      position = Nalunit.getHeaderPositionAnnexB(buffer);
      end = position.pos;
      let body = new Uint8Array(buffer.buffer.slice(start + header.byteLength, end));
      let unit = { header, body };
      Nalunit.analyseNal(unit);
      nals.push(unit);
      buffer.skip(end - buffer.position);
      start = end;
    }
    return nals;
  }

  static getAvccNals(buffer) {
    let nals = [];
    while (buffer.position < buffer.length - 4) {
      let length = buffer.dataview.getInt32(buffer.position);
      if (buffer.length - buffer.position >= length) {
        let header = buffer.buffer.slice(buffer.position, buffer.position + 4);
        buffer.skip(4);
        let body = buffer.buffer.slice(buffer.position, buffer.position + length);
        buffer.skip(length);
        let unit = { header, body };
        Nalunit.analyseNal(unit);
        nals.push(unit);
      } else {
        break;
      }
    }
    return nals;
  }

  static analyseNal(unit) {
    let type = unit.body[0] & 0x1f;
    switch (type) {
      case 1:
        // NDR
        unit.ndr = true;
        break;
      case 5:
        // IDR
        unit.idr = true;
        break;
      case 6:
        // SEI
        break;
      case 7:
        // SPS
        unit.sps = _sps2.default.parseSPS(unit.body);
        break;
      case 8:
        // PPS
        unit.pps = true;
        break;
      case 9:
        // AUD
        break;
      default:
        break;
    }
  }

  static getHeaderPositionAnnexB(buffer) {
    // seperate
    let pos = buffer.position;
    let headerLength = 0;
    while (headerLength !== 3 && headerLength !== 4 && pos < buffer.length - 4) {
      if (buffer.dataview.getInt16(pos) === 0) {
        if (buffer.dataview.getInt16(pos + 2) === 1) {
          // 0x000001
          headerLength = 4;
        } else if (buffer.dataview.getInt8(pos + 2) === 1) {
          headerLength = 3;
        } else {
          pos++;
        }
      } else {
        pos++;
      }
    }

    if (pos === buffer.length - 4) {
      if (buffer.dataview.getInt16(pos) === 0) {
        if (buffer.dataview.getInt16(pos + 2) === 1) {
          // 0x000001
          headerLength = 4;
        }
      } else {
        pos++;
        if (buffer.dataview.getInt16(pos) === 0 && buffer.dataview.getInt8(pos) === 1) {
          // 0x0000001
          headerLength = 3;
        } else {
          pos = buffer.length;
        }
      }
    }
    return { pos, headerLength };
  }

  static getAvcc(sps, pps) {
    let ret = new Uint8Array(sps.byteLength + pps.byteLength + 11);
    ret[0] = 0x01;
    ret[1] = sps[1];
    ret[2] = sps[2];
    ret[3] = sps[3];
    ret[4] = 255;
    ret[5] = 225;

    let offset = 6;

    ret.set(new Uint8Array([sps.byteLength >>> 8 & 0xff, sps.byteLength & 0xff]), offset);
    offset += 2;
    ret.set(sps, offset);
    offset += sps.byteLength;

    ret[offset] = 1;
    offset++;

    ret.set(new Uint8Array([pps.byteLength >>> 8 & 0xff, pps.byteLength & 0xff]), offset);
    offset += 2;
    ret.set(pps, offset);
    return ret;
  }
}

exports.default = Nalunit;

/***/ }),

/***/ "../xgplayer-codec/src/h264/nalunit/sps.js":
/*!*************************************************!*\
  !*** ../xgplayer-codec/src/h264/nalunit/sps.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _golomb = __webpack_require__(/*! ./golomb */ "../xgplayer-codec/src/h264/nalunit/golomb.js");

var _golomb2 = _interopRequireDefault(_golomb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SPSParser {
  static _ebsp2rbsp(uint8array) {
    let src = uint8array;
    let srcLength = src.byteLength;
    let dst = new Uint8Array(srcLength);
    let dstIdx = 0;

    for (let i = 0; i < srcLength; i++) {
      if (i >= 2) {
        if (src[i] === 0x03 && src[i - 1] === 0x00 && src[i - 2] === 0x00) {
          continue;
        }
      }
      dst[dstIdx] = src[i];
      dstIdx++;
    }

    return new Uint8Array(dst.buffer, 0, dstIdx);
  }

  static parseSPS(uint8array) {
    let rbsp = SPSParser._ebsp2rbsp(uint8array);
    let gb = new _golomb2.default(rbsp);

    gb.readByte();
    let profileIdc = gb.readByte();
    gb.readByte();
    let levelIdc = gb.readByte();
    gb.readUEG();

    let profile_string = SPSParser.getProfileString(profileIdc);
    let level_string = SPSParser.getLevelString(levelIdc);
    let chroma_format_idc = 1;
    let chroma_format = 420;
    let chroma_format_table = [0, 420, 422, 444];
    let bit_depth = 8;

    if (profileIdc === 100 || profileIdc === 110 || profileIdc === 122 || profileIdc === 244 || profileIdc === 44 || profileIdc === 83 || profileIdc === 86 || profileIdc === 118 || profileIdc === 128 || profileIdc === 138 || profileIdc === 144) {
      chroma_format_idc = gb.readUEG();
      if (chroma_format_idc === 3) {
        gb.readBits(1);
      }
      if (chroma_format_idc <= 3) {
        chroma_format = chroma_format_table[chroma_format_idc];
      }

      bit_depth = gb.readUEG() + 8;
      gb.readUEG();
      gb.readBits(1);
      if (gb.readBool()) {
        let scaling_list_count = chroma_format_idc !== 3 ? 8 : 12;
        for (let i = 0; i < scaling_list_count; i++) {
          if (gb.readBool()) {
            if (i < 6) {
              SPSParser._skipScalingList(gb, 16);
            } else {
              SPSParser._skipScalingList(gb, 64);
            }
          }
        }
      }
    }
    gb.readUEG();
    let pic_order_cnt_type = gb.readUEG();
    if (pic_order_cnt_type === 0) {
      gb.readUEG();
    } else if (pic_order_cnt_type === 1) {
      gb.readBits(1);
      gb.readSEG();
      gb.readSEG();
      let num_ref_frames_in_pic_order_cnt_cycle = gb.readUEG();
      for (let i = 0; i < num_ref_frames_in_pic_order_cnt_cycle; i++) {
        gb.readSEG();
      }
    }
    gb.readUEG();
    gb.readBits(1);

    let pic_width_in_mbs_minus1 = gb.readUEG();
    let pic_height_in_map_units_minus1 = gb.readUEG();

    let frame_mbs_only_flag = gb.readBits(1);
    if (frame_mbs_only_flag === 0) {
      gb.readBits(1);
    }
    gb.readBits(1);

    let frame_crop_left_offset = 0;
    let frame_crop_right_offset = 0;
    let frame_crop_top_offset = 0;
    let frame_crop_bottom_offset = 0;

    let frame_cropping_flag = gb.readBool();
    if (frame_cropping_flag) {
      frame_crop_left_offset = gb.readUEG();
      frame_crop_right_offset = gb.readUEG();
      frame_crop_top_offset = gb.readUEG();
      frame_crop_bottom_offset = gb.readUEG();
    }

    let par_width = 1,
        par_height = 1;
    let fps = 0,
        fps_fixed = true,
        fps_num = 0,
        fps_den = 0;

    let vui_parameters_present_flag = gb.readBool();
    if (vui_parameters_present_flag) {
      if (gb.readBool()) {
        // aspect_ratio_info_present_flag
        let aspect_ratio_idc = gb.readByte();
        let par_w_table = [1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2];
        let par_h_table = [1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1];

        if (aspect_ratio_idc > 0 && aspect_ratio_idc < 16) {
          par_width = par_w_table[aspect_ratio_idc - 1];
          par_height = par_h_table[aspect_ratio_idc - 1];
        } else if (aspect_ratio_idc === 255) {
          par_width = gb.readByte() << 8 | gb.readByte();
          par_height = gb.readByte() << 8 | gb.readByte();
        }
      }

      if (gb.readBool()) {
        gb.readBool();
      }
      if (gb.readBool()) {
        gb.readBits(4);
        if (gb.readBool()) {
          gb.readBits(24);
        }
      }
      if (gb.readBool()) {
        gb.readUEG();
        gb.readUEG();
      }
      if (gb.readBool()) {
        let num_units_in_tick = gb.readBits(32);
        let time_scale = gb.readBits(32);
        fps_fixed = gb.readBool();

        fps_num = time_scale;
        fps_den = num_units_in_tick * 2;
        fps = fps_num / fps_den;
      }
    }

    let parScale = 1;
    if (par_width !== 1 || par_height !== 1) {
      parScale = par_width / par_height;
    }

    let crop_unit_x = 0,
        crop_unit_y = 0;
    if (chroma_format_idc === 0) {
      crop_unit_x = 1;
      crop_unit_y = 2 - frame_mbs_only_flag;
    } else {
      let sub_wc = chroma_format_idc === 3 ? 1 : 2;
      let sub_hc = chroma_format_idc === 1 ? 2 : 1;
      crop_unit_x = sub_wc;
      crop_unit_y = sub_hc * (2 - frame_mbs_only_flag);
    }

    let codec_width = (pic_width_in_mbs_minus1 + 1) * 16;
    let codec_height = (2 - frame_mbs_only_flag) * ((pic_height_in_map_units_minus1 + 1) * 16);

    codec_width -= (frame_crop_left_offset + frame_crop_right_offset) * crop_unit_x;
    codec_height -= (frame_crop_top_offset + frame_crop_bottom_offset) * crop_unit_y;

    let present_width = Math.ceil(codec_width * parScale);

    gb.destroy();
    gb = null;

    return {
      profile_string: profile_string,
      level_string: level_string,
      bit_depth: bit_depth,
      chroma_format: chroma_format,
      chroma_format_string: SPSParser.getChromaFormatString(chroma_format),

      frame_rate: {
        fixed: fps_fixed,
        fps: fps,
        fps_den: fps_den,
        fps_num: fps_num
      },

      par_ratio: {
        width: par_width,
        height: par_height
      },

      codec_size: {
        width: codec_width,
        height: codec_height
      },

      present_size: {
        width: present_width,
        height: codec_height
      }
    };
  }

  static _skipScalingList(gb, count) {
    let last_scale = 8,
        next_scale = 8;
    let delta_scale = 0;
    for (let i = 0; i < count; i++) {
      if (next_scale !== 0) {
        delta_scale = gb.readSEG();
        next_scale = (last_scale + delta_scale + 256) % 256;
      }
      last_scale = next_scale === 0 ? last_scale : next_scale;
    }
  }

  static getProfileString(profileIdc) {
    switch (profileIdc) {
      case 66:
        return 'Baseline';
      case 77:
        return 'Main';
      case 88:
        return 'Extended';
      case 100:
        return 'High';
      case 110:
        return 'High10';
      case 122:
        return 'High422';
      case 244:
        return 'High444';
      default:
        return 'Unknown';
    }
  }

  static getLevelString(levelIdc) {
    return (levelIdc / 10).toFixed(1);
  }

  static getChromaFormatString(chroma) {
    switch (chroma) {
      case 420:
        return '4:2:0';
      case 422:
        return '4:2:2';
      case 444:
        return '4:4:4';
      default:
        return 'Unknown';
    }
  }

  static toVideoMeta(spsConfig) {
    let meta = {};
    if (spsConfig && spsConfig.codec_size) {
      meta.codecWidth = spsConfig.codec_size.width;
      meta.codecHeight = spsConfig.codec_size.height;
      meta.presentWidth = spsConfig.present_size.width;
      meta.presentHeight = spsConfig.present_size.height;
    }

    meta.profile = spsConfig.profile_string;
    meta.level = spsConfig.level_string;
    meta.bitDepth = spsConfig.bit_depth;
    meta.chromaFormat = spsConfig.chroma_format;

    meta.parRatio = {
      width: spsConfig.par_ratio.width,
      height: spsConfig.par_ratio.height
    };

    meta.frameRate = spsConfig.frame_rate;

    let fpsDen = meta.frameRate.fps_den;
    let fpsNum = meta.frameRate.fps_num;
    meta.refSampleDuration = Math.floor(meta.timescale * (fpsDen / fpsNum));
    return meta;
  }
} /* eslint-disable camelcase  */
/* eslint-disable one-var  */
exports.default = SPSParser;

/***/ }),

/***/ "../xgplayer-demux/index.js":
/*!**********************************!*\
  !*** ../xgplayer-demux/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  // HLS
  M3U8Parser: __webpack_require__(/*! ./src/hls/demuxer/m3u8parser */ "../xgplayer-demux/src/hls/demuxer/m3u8parser.js").default,
  TsDemuxer: __webpack_require__(/*! ./src/hls/demuxer/ts */ "../xgplayer-demux/src/hls/demuxer/ts.js").default,
  Playlist: __webpack_require__(/*! ./src/hls/playlist */ "../xgplayer-demux/src/hls/playlist.js").default,
  FlvDemuxer: __webpack_require__(/*! ./src/flv/index */ "../xgplayer-demux/src/flv/index.js").default
};

/***/ }),

/***/ "../xgplayer-demux/src/flv/amf-parser.js":
/*!***********************************************!*\
  !*** ../xgplayer-demux/src/flv/amf-parser.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xgplayerUtils = __webpack_require__(/*! xgplayer-utils */ "../xgplayer-utils/index.js");

const DATA_TYPES = {
  NUMBER: 0,
  BOOLEAN: 1,
  STRING: 2,
  OBJECT: 3,
  MIX_ARRAY: 8,
  OBJECT_END: 9,
  STRICT_ARRAY: 10,
  DATE: 11,
  LONE_STRING: 12

  /**
   * meta信息解析
   */
};class AMFParser {
  constructor() {
    this.offset = 0;
    this.readOffset = this.offset;
  }

  resolve(meta, size) {
    if (size < 3) {
      throw new Error('not enough data for metainfo');
    }
    const metaData = {};
    const name = this.parseValue(meta);
    const value = this.parseValue(meta, size - name.bodySize);
    metaData[name.data] = value.data;

    this.resetStatus();
    return metaData;
  }

  resetStatus() {
    this.offset = 0;
    this.readOffset = this.offset;
  }

  parseString(buffer) {
    const dv = new DataView(buffer, this.readOffset);
    const strLen = dv.getUint16(0, !_xgplayerUtils.isLe);
    let str = '';
    if (strLen > 0) {
      str = _xgplayerUtils.UTF8.decode(new Uint8Array(buffer, this.readOffset + 2, strLen));
    } else {
      str = '';
    }
    let size = strLen + 2;
    this.readOffset += size;
    return {
      data: str,
      bodySize: strLen + 2
    };
  }

  parseDate(buffer, size) {
    const dv = new DataView(buffer, this.readOffset, size);
    let ts = dv.getFloat64(0, !_xgplayerUtils.isLe);
    const timeOffset = dv.getInt16(8, !_xgplayerUtils.isLe);
    ts += timeOffset * 60 * 1000;

    this.readOffset += 10;
    return {
      data: new Date(ts),
      bodySize: 10
    };
  }

  parseObject(buffer, size) {
    const name = this.parseString(buffer, size);
    const value = this.parseValue(buffer, size - name.bodySize);
    return {
      data: {
        name: name.data,
        value: value.data
      },
      bodySize: name.bodySize + value.bodySize,
      isObjEnd: value.isObjEnd
    };
  }

  parseLongString(buffer) {
    const dv = new DataView(buffer, this.readOffset);
    const strLen = dv.getUint32(0, !_xgplayerUtils.isLe);
    let str = '';
    if (strLen > 0) {
      str = _xgplayerUtils.UTF8.decode(new Uint8Array(buffer, this.readOffset + 2, strLen));
    } else {
      str = '';
    }
    // const size = strLen + 4;
    this.readOffset += strLen + 4;
    return {
      data: str,
      bodySize: strLen + 4
    };
  }

  /**
   * 解析meta中的变量
   */
  parseValue(data, size) {
    let buffer = new ArrayBuffer();
    if (data instanceof ArrayBuffer) {
      buffer = data;
    } else {
      buffer = data.buffer;
    }
    const {
      NUMBER,
      BOOLEAN,
      STRING,
      OBJECT,
      MIX_ARRAY,
      OBJECT_END,
      STRICT_ARRAY,
      DATE,
      LONE_STRING
    } = DATA_TYPES;
    const dataView = new DataView(buffer, this.readOffset, size);
    let isObjEnd = false;
    const type = dataView.getUint8(0);
    let offset = 1;
    this.readOffset += 1;
    let value = null;

    switch (type) {
      case NUMBER:
        {
          value = dataView.getFloat64(1, !_xgplayerUtils.isLe);
          this.readOffset += 8;
          offset += 8;
          break;
        }
      case BOOLEAN:
        {
          const boolNum = dataView.getUint8(1);
          value = !!boolNum;
          this.readOffset += 1;
          offset += 1;
          break;
        }
      case STRING:
        {
          const str = this.parseString(buffer);
          value = str.data;
          offset += str.bodySize;
          break;
        }
      case OBJECT:
        {
          value = {};
          let objEndSize = 0;
          if (dataView.getUint32(size - 4, !_xgplayerUtils.isLe) & 0x00FFFFFF) {
            objEndSize = 3;
          }
          // this.readOffset += offset - 1;
          while (offset < size - 4) {
            const amfObj = this.parseObject(buffer, size - offset - objEndSize);
            if (amfObj.isObjectEnd) {
              break;
            }
            value[amfObj.data.name] = amfObj.data.value;
            offset += amfObj.bodySize;
          }
          if (offset <= size - 3) {
            const mark = dataView.getUint32(offset - 1, !_xgplayerUtils.isLe) & 0x00FFFFFF;
            if (mark === 9) {
              this.readOffset += 3;
              offset += 3;
            }
          }
          break;
        }
      case MIX_ARRAY:
        {
          value = {};
          offset += 4;
          this.readOffset += 4;
          let objEndSize = 0;
          if ((dataView.getUint32(size - 4, !_xgplayerUtils.isLe) & 0x00FFFFFF) === 9) {
            objEndSize = 3;
          }

          while (offset < size - 8) {
            const amfVar = this.parseObject(buffer, size - offset - objEndSize);
            if (amfVar.isObjectEnd) {
              break;
            }
            value[amfVar.data.name] = amfVar.data.value;
            offset += amfVar.bodySize;
          }
          if (offset <= size - 3) {
            const marker = dataView.getUint32(offset - 1, !_xgplayerUtils.isLe) & 0x00FFFFFF;
            if (marker === 9) {
              offset += 3;
              this.readOffset += 3;
            }
          }
          break;
        }

      case OBJECT_END:
        {
          value = null;
          isObjEnd = true;
          break;
        }

      case STRICT_ARRAY:
        {
          value = [];
          const arrLength = dataView.getUint32(1, !_xgplayerUtils.isLe);
          offset += 4;
          this.readOffset += 4;
          for (let i = 0; i < arrLength; i++) {
            const script = this.parseValue(buffer, size - offset);
            value.push(script.data);
            offset += script.bodySize;
          }
          break;
        }

      case DATE:
        {
          const date = this.parseDate(buffer, size - 1);
          value = date.data;
          offset += date.bodySize;
          break;
        }

      case LONE_STRING:
        {
          const longStr = this.parseLongString(buffer, size - 1);
          value = longStr.data;
          offset += longStr.bodySize;
          break;
        }

      default:
        {
          offset = size;
        }
    }

    return {
      data: value,
      bodySize: offset,
      isObjEnd: isObjEnd
    };
  }
}
exports.default = AMFParser;

/***/ }),

/***/ "../xgplayer-demux/src/flv/index.js":
/*!******************************************!*\
  !*** ../xgplayer-demux/src/flv/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xgplayerUtils = __webpack_require__(/*! xgplayer-utils */ "../xgplayer-utils/index.js");

var _xgplayerCodec = __webpack_require__(/*! xgplayer-codec */ "../xgplayer-codec/index.js");

var _xgplayerBuffer = __webpack_require__(/*! xgplayer-buffer */ "../xgplayer-buffer/index.js");

var _amfParser = __webpack_require__(/*! ./amf-parser */ "../xgplayer-demux/src/flv/amf-parser.js");

var _amfParser2 = _interopRequireDefault(_amfParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DEMUX_EVENTS = _xgplayerUtils.EVENTS.DEMUX_EVENTS;

class FlvDemuxer {
  constructor() {
    this._firstFragmentLoaded = false;
    this._trackNum = 0;
    this._hasScript = false;
  }

  init() {
    this.on(DEMUX_EVENTS.DEMUX_START, this.doParseFlv.bind(this));
  }

  /**
   * if the flv head is valid
   * @param data
   * @returns {boolean}
   */
  static isFlvFile(data) {
    return !(data[0] !== 0x46 || data[1] !== 0x4C || data[2] !== 0x56 || data[3] !== 0x01);
  }

  /**
   * If the stream has audio or video.
   * @param {number} streamFlag - Data from the stream which is define whether the audio / video track is exist.
   */
  static getPlayType(streamFlag) {
    const result = {
      hasVideo: false,
      hasAudio: false
    };

    if (streamFlag & 0x01 > 0) {
      result.hasVideo = true;
    }

    if (streamFlag & 0x04 > 0) {
      result.hasAudio = true;
    }

    return result;
  }

  doParseFlv() {
    if (!this._firstFragmentLoaded) {
      if (this.loaderBuffer.length < 13) {
        return;
      }
      const header = this.loaderBuffer.shift(13);
      this.parseFlvHeader(header);
      this.doParseFlv(); // 递归调用，继续解析flv流
    } else {
      if (this.loaderBuffer.length < 11) {
        return;
      }
      let chunk;

      let loopMax = 100000; // 防止死循环产生
      do {
        chunk = this._parseFlvTag();
      } while (chunk && loopMax-- > 0);

      this.emit(DEMUX_EVENTS.DEMUX_COMPLETE);
    }
  }

  parseFlvHeader(header) {
    if (!FlvDemuxer.isFlvFile(header)) {
      this.emit(DEMUX_EVENTS.DEMUX_ERROR, new Error('invalid flv file'));
      this.doParseFlv();
    } else {
      this._firstFragmentLoaded = true;
      const playType = FlvDemuxer.getPlayType(header[4]);

      if (playType.hasVideo) {
        this.initVideoTrack();
      }

      if (playType.hasAudio) {
        this.initAudioTrack();
      }
    }
    this.doParseFlv();
  }

  /**
   * init default video track configs
   */
  initVideoTrack() {
    this._trackNum++;
    let videoTrack = new _xgplayerBuffer.VideoTrack();
    videoTrack.meta = new _xgplayerUtils.VideoTrackMeta();
    videoTrack.id = videoTrack.meta.id = this._trackNum;

    this.tracks.videoTrack = videoTrack;
  }

  /**
   * init default audio track configs
   */
  initAudioTrack() {
    this._trackNum++;
    let audioTrack = new _xgplayerBuffer.AudioTrack();
    audioTrack.meta = new _xgplayerUtils.AudioTrackMeta();
    audioTrack.id = audioTrack.meta.id = this._trackNum;

    this.tracks.audioTrack = audioTrack;
  }

  /**
   * Package the data as the following data structure
   * {
   *    data: Uint8Array. the Stream data.
   *    info: The first byte info of the Tag.
   *    tagType: 8、9、18
   *    timeStamp: the timestemp
   * }
   */
  _parseFlvTag() {
    if (this.loaderBuffer.length < 11) {
      return null;
    }
    let chunk = this._parseFlvTagHeader();
    if (chunk) {
      this._processChunk(chunk);
    }
    return chunk;
  }

  /**
   * Parse the 11 byte tag Header
   */
  _parseFlvTagHeader() {
    let offset = 0;
    let chunk = {};

    let tagType = this.loaderBuffer.toInt(offset, 1);
    offset += 1;

    // 2 bit FMS reserved, 1 bit filtered, 5 bit tag type
    chunk.filtered = (tagType & 32) >>> 5;
    chunk.tagType = tagType & 31;

    // 3 Byte datasize
    chunk.datasize = this.loaderBuffer.toInt(offset, 3);
    offset += 3;

    if (chunk.tagType !== 8 && chunk.tagType !== 9 && chunk.tagType !== 11 && chunk.tagType !== 18 || this.loaderBuffer.toInt(8, 3) !== 0) {
      if (this.loaderBuffer && this.loaderBuffer.length > 0) {
        this.loaderBuffer.shift(1);
      }
      this.emit(DEMUX_EVENTS.DEMUX_ERROR, this.TAG, new Error('tagType ' + chunk.tagType), false);
      return null;
    }

    if (this.loaderBuffer.length < chunk.datasize + 15) {
      return null;
    }

    // read the data.
    this.loaderBuffer.shift(4);

    // 3 Byte timestamp
    let timestamp = this.loaderBuffer.toInt(0, 3);
    this.loaderBuffer.shift(3);

    // 1 Byte timestampExt
    let timestampExt = this.loaderBuffer.shift(1)[0];
    if (timestampExt > 0) {
      timestamp += timestampExt * 0x1000000;
    }

    chunk.dts = timestamp;

    // streamId
    this.loaderBuffer.shift(3);
    return chunk;
  }

  _processChunk(chunk) {
    switch (chunk.tagType) {
      case 18:
        this._parseScriptData(chunk);
        break;
      case 8:
        this._parseAACData(chunk);
        break;
      case 9:
        this._parseHevcData(chunk);
        break;
      case 11:
        // for some CDN that did not process the currect RTMP messages
        this.loaderBuffer.shift(3);
        break;
      default:
        this.loaderBuffer.shift(1);
    }
  }

  /**
   * parse flv script data
   * @param chunk
   * @private
   */
  _parseScriptData(chunk) {
    let audioTrack = this.tracks.audioTrack;
    let videoTrack = this.tracks.videoTrack;

    let data = this.loaderBuffer.shift(chunk.datasize);

    const info = new _amfParser2.default().resolve(data, data.length);

    const onMetaData = this._context.onMetaData = info ? info.onMetaData : undefined;

    // fill mediaInfo
    this._context.mediaInfo.duration = onMetaData.duration;
    this._context.mediaInfo.hasVideo = onMetaData.hasVideo;
    this._context.mediaInfo.hsaAudio = onMetaData.hasAudio;

    let validate = this._datasizeValidator(chunk.datasize);
    if (validate) {
      this.emit(DEMUX_EVENTS.MEDIA_INFO);
      this._hasScript = true;
    }

    // Edit default meta.
    if (audioTrack && !audioTrack.hasSpecificConfig) {
      let meta = audioTrack.meta;
      if (onMetaData.audiosamplerate) {
        meta.sampleRate = onMetaData.audiosamplerate;
      }

      if (onMetaData.audiochannels) {
        meta.channelCount = onMetaData.audiochannels;
      }

      switch (onMetaData.audiosamplerate) {
        case 44100:
          meta.sampleRateIndex = 4;
          break;
        case 22050:
          meta.sampleRateIndex = 7;
          break;
        case 11025:
          meta.sampleRateIndex = 10;
          break;
      }
    }
    if (videoTrack && !videoTrack.hasSpecificConfig) {
      let meta = videoTrack.meta;
      if (typeof onMetaData.framerate === 'number') {
        let fpsNum = Math.floor(onMetaData.framerate * 1000);
        if (fpsNum > 0) {
          let fps = fpsNum / 1000;
          if (!meta.frameRate) {
            meta.frameRate = {};
          }
          meta.frameRate.fixed = true;
          meta.frameRate.fps = fps;
          meta.frameRate.fps_num = fpsNum;
          meta.frameRate.fps_den = 1000;
        }
      }
    }
  }

  _aacSequenceHeaderParser(data) {
    let ret = {};
    ret.hasSpecificConfig = true;
    ret.objectType = data[1] >>> 3;
    ret.originObjectType = ret.objectType;
    ret.sampleRateIndex = (data[1] & 7) << 1 | data[2] >>> 7;
    ret.audiosamplerate = this._switchAudioSampleRate(ret.sampleRateIndex);
    ret.channelCount = (data[2] & 120) >>> 3;
    ret.frameLength = (data[2] & 4) >>> 2;
    ret.dependsOnCoreCoder = (data[2] & 2) >>> 1;
    ret.extensionFlagIndex = data[2] & 1;

    ret.codec = `mp4a.40.${ret.objectType}`;
    let userAgent = window.navigator.userAgent.toLowerCase();
    let extensionSamplingIndex;

    let config;
    let samplingIndex = ret.sampleRateIndex;

    if (userAgent.indexOf('firefox') !== -1) {
      // firefox: use SBR (HE-AAC) if freq less than 24kHz
      if (ret.sampleRateIndex >= 6) {
        ret.objectType = 5;
        config = new Array(4);
        extensionSamplingIndex = samplingIndex - 3;
      } else {
        // use LC-AAC
        ret.objectType = 2;
        config = new Array(2);
        extensionSamplingIndex = samplingIndex;
      }
    } else if (userAgent.indexOf('android') !== -1 || _xgplayerUtils.sniffer.browser === 'safari') {
      // android: always use LC-AAC
      ret.objectType = 2;
      config = new Array(2);
      extensionSamplingIndex = samplingIndex;
    } else {
      // for other browsers, e.g. chrome...
      // Always use HE-AAC to make it easier to switch aac codec profile
      ret.objectType = 5;
      extensionSamplingIndex = ret.sampleRateIndex;
      config = new Array(4);

      if (ret.sampleRateIndex >= 6) {
        extensionSamplingIndex = ret.sampleRateIndex - 3;
      } else if (ret.channelCount === 1) {
        // Mono channel
        ret.objectType = 2;
        config = new Array(2);
        extensionSamplingIndex = ret.sampleRateIndex;
      }
    }

    config[0] = ret.objectType << 3;
    config[0] |= (ret.sampleRateIndex & 0x0F) >>> 1;
    config[1] = (ret.sampleRateIndex & 0x0F) << 7;
    config[1] |= (ret.channelCount & 0x0F) << 3;
    if (ret.objectType === 5) {
      config[1] |= (extensionSamplingIndex & 0x0F) >>> 1;
      config[2] = (extensionSamplingIndex & 0x01) << 7;
      // extended audio object type: force to 2 (LC-AAC)
      config[2] |= 2 << 2;
      config[3] = 0;
    }
    ret.config = config;
    return ret;
  }

  _parseAACData(chunk) {
    let track = this.tracks.audioTrack;
    if (!track) {
      return;
    }

    let meta = track.meta;

    if (!meta) {
      track.meta = new _xgplayerUtils.AudioTrackMeta();
      meta = track.meta;
    }

    let info = this.loaderBuffer.shift(1)[0];

    chunk.data = this.loaderBuffer.shift(chunk.datasize - 1);

    let format = (info & 240) >>> 4;

    track.format = format;

    if (format !== 10) {
      this.emit(DEMUX_EVENTS.DEMUX_ERROR, new Error(`invalid audio format: ${format}`));
    }

    if (format === 10 && !this._hasAudioSequence) {
      meta.sampleRate = this._switchAudioSamplingFrequency(info);
      meta.sampleRateIndex = (info & 12) >>> 2;
      meta.frameLenth = (info & 2) >>> 1;
      meta.channelCount = info & 1;
      meta.refSampleDuration = Math.floor(1024 / meta.audioSampleRate * meta.timescale);
    }

    let audioSampleRate = meta.audioSampleRate;
    let audioSampleRateIndex = meta.sampleRateIndex;
    let refSampleDuration = meta.refSampleDuration;

    delete chunk.tagType;
    let validate = this._datasizeValidator(chunk.datasize);

    if (chunk.data[0] === 0) {
      // AAC Sequence Header
      let aacHeader = this._aacSequenceHeaderParser(chunk.data);
      audioSampleRate = aacHeader.audiosamplerate || meta.audioSampleRate;
      audioSampleRateIndex = aacHeader.sampleRateIndex || meta.sampleRateIndex;
      refSampleDuration = Math.floor(1024 / audioSampleRate * meta.timescale);

      meta.channelCount = aacHeader.channelCount;
      meta.sampleRate = audioSampleRate;
      meta.sampleRateIndex = audioSampleRateIndex;
      meta.refSampleDuration = refSampleDuration;
      meta.duration = this._context.mediaInfo.duration * meta.timescale;
      meta.config = aacHeader.config;
      meta.objectType = aacHeader.objectType;
      meta.originObjectType = aacHeader.originObjectType;

      const audioMedia = this._context.mediaInfo.audio;

      // fill audio media info
      audioMedia.codec = aacHeader.codec;
      audioMedia.channelCount = aacHeader.channelCount;
      audioMedia.sampleRate = audioSampleRate;
      audioMedia.sampleRateIndex = aacHeader.audioSampleRateIndex;

      if (this._hasScript && !this._hasAudioSequence) {
        this.emit(DEMUX_EVENTS.METADATA_PARSED, 'audio');
      } else if (this._hasScript && this._hasAudioSequence) {
        this.emit(DEMUX_EVENTS.METADATA_PARSED, 'audio');
        this.emit(DEMUX_EVENTS.AUDIO_METADATA_CHANGE);
        // this.emit(DEMUX_EVENTS.METADATA_PARSED, 'audio')
      }
      this._hasAudioSequence = true;

      this._metaChange = true;
    } else {
      if (this._metaChange) {
        chunk.options = {
          meta: track.meta
        };
        this._metaChange = false;
      }

      chunk.data = chunk.data.slice(1, chunk.data.length);
      track.samples.push(chunk);
    }
    if (!validate) {
      this.emit(DEMUX_EVENTS.DEMUX_ERROR, this.TAG, new Error('TAG length error at ' + chunk.datasize), false);
      // this.logger.warn(this.TAG, error.message)
    }
  }

  /**
   * parse hevc/avc video data
   * @param chunk
   * @private
   */
  _parseHevcData(chunk) {
    // header
    let info = this.loaderBuffer.shift(1)[0];
    chunk.frameType = (info & 0xf0) >>> 4;
    chunk.isKeyframe = chunk.frameType === 1;
    // let tempCodecID = this.tracks.videoTrack.codecID
    let codecID = info & 0x0f;
    this.tracks.videoTrack.codecID = codecID;

    // hevc和avc的header解析方式一样
    chunk.avcPacketType = this.loaderBuffer.shift(1)[0];
    chunk.cts = this.loaderBuffer.toInt(0, 3);
    this.loaderBuffer.shift(3);

    // 12 for hevc, 7 for avc
    if (codecID === 12) {
      const data = this.loaderBuffer.shift(chunk.datasize - 5);
      chunk.data = data;

      if (Number.parseInt(chunk.avcPacketType) !== 0) {
        if (!this._datasizeValidator(chunk.datasize)) {
          this.emit(DEMUX_EVENTS.DEMUX_ERROR, this.TAG, new Error(`invalid video tag datasize: ${chunk.datasize}`), false);
        }
        let nalu = {};
        let r = 0;
        nalu.cts = chunk.cts;
        nalu.dts = chunk.dts;
        while (chunk.data.length > r) {
          let sizes = chunk.data.slice(Number.parseInt(r), 4 + r);
          nalu.size = sizes[3];
          nalu.size += sizes[2] * 256;
          nalu.size += sizes[1] * 256 * 256;
          nalu.size += sizes[0] * 256 * 256 * 256;
          r += 4;
          nalu.data = chunk.data.slice(Number.parseInt(r), nalu.size + r);
          r += nalu.size;
          this.tracks.videoTrack.samples.push(nalu);
          this.emit(DEMUX_EVENTS.METADATA_PARSED, 'video');
        }
      } else if (Number.parseInt(chunk.avcPacketType) === 0) {
        if (!this._datasizeValidator(chunk.datasize)) {
          this.emit(DEMUX_EVENTS.DEMUX_ERROR, this.TAG, new Error(`invalid video tag datasize: ${chunk.datasize}`), false);
        } else {
          this.emit(DEMUX_EVENTS.METADATA_PARSED, 'video');
        }
      }
    } else if (codecID === 7) {
      let data = this.loaderBuffer.shift(chunk.datasize - 5);
      if (data[4] === 0 && data[5] === 0 && data[6] === 0 && data[7] === 1) {
        let avcclength = 0;
        for (let i = 0; i < 4; i++) {
          avcclength = avcclength * 256 + data[i];
        }
        avcclength -= 4;
        data = data.slice(4, data.length);
        data[3] = avcclength % 256;
        avcclength = (avcclength - data[3]) / 256;
        data[2] = avcclength % 256;
        avcclength = (avcclength - data[2]) / 256;
        data[1] = avcclength % 256;
        data[0] = (avcclength - data[1]) / 256;
      }

      chunk.data = data;
      // If it is AVC sequece Header.
      if (chunk.avcPacketType === 0) {
        this._avcSequenceHeaderParser(chunk.data);
        let validate = this._datasizeValidator(chunk.datasize);
        if (validate) {
          if (this._hasScript && !this._hasVideoSequence) {
            this.emit(DEMUX_EVENTS.METADATA_PARSED, 'video');
          } else if (this._hasScript && this._hasVideoSequence) {
            this.emit(DEMUX_EVENTS.METADATA_PARSED, 'audio');
            this.emit(DEMUX_EVENTS.VIDEO_METADATA_CHANGE);
            // this.emit(DEMUX_EVENTS.METADATA_PARSED, 'video')
          }
          this._hasVideoSequence = true;
        }
        this._metaChange = true;
      } else {
        if (!this._datasizeValidator(chunk.datasize)) {
          this.emit(DEMUX_EVENTS.DEMUX_ERROR, this.TAG, new Error(`invalid video tag datasize: ${chunk.datasize}`), false);
          return;
        }
        if (this._metaChange) {
          chunk.options = {
            meta: Object.assign({}, this.tracks.videoTrack.meta)
          };
          this._metaChange = false;
        }
        this.tracks.videoTrack.samples.push(chunk);
        // this.emit(DEMUX_EVENTS.DEMUX_COMPLETE)
      }
    } else {
      this.emit(DEMUX_EVENTS.DEMUX_ERROR, this.TAG, new Error(`video codeid is ${codecID}`), false);
      chunk.data = this.loaderBuffer.shift(chunk.datasize - 1);
      if (!this._datasizeValidator(chunk.datasize)) {
        this.emit(DEMUX_EVENTS.DEMUX_ERROR, this.TAG, new Error(`invalid video tag datasize: ${chunk.datasize}`), false);
      }
      this.tracks.videoTrack.samples.push(chunk);
      this.emit(DEMUX_EVENTS.DEMUX_COMPLETE);
    }
    delete chunk.tagType;
  }

  /**
   * parse avc metadata
   * @param data
   * @private
   */
  _avcSequenceHeaderParser(data) {
    let track = this.tracks.videoTrack;

    if (!track) {
      return;
    }

    let offset = 0;

    if (!track.meta) {
      track.meta = new _xgplayerUtils.VideoTrackMeta();
    }
    let meta = track.meta;

    meta.configurationVersion = data[0];
    meta.avcProfileIndication = data[1];
    meta.profileCompatibility = data[2];
    meta.avcLevelIndication = data[3] / 10;
    meta.nalUnitLength = (data[4] & 0x03) + 1;

    let numOfSps = data[5] & 0x1f;
    offset = 6;
    let config = {};

    // parse SPS
    for (let i = 0; i < numOfSps; i++) {
      let size = data[offset] * 255 + data[offset + 1];
      offset += 2;

      let sps = new Uint8Array(size);
      for (let j = 0; j < size; j++) {
        sps[j] = data[offset + j];
      }

      // codec string
      let codecString = 'avc1.';
      for (let j = 1; j < 4; j++) {
        let h = sps[j].toString(16);
        if (h.length < 2) {
          h = '0' + h;
        }
        codecString += h;
      }

      meta.codec = codecString;

      offset += size;
      this.tracks.videoTrack.meta.sps = sps;
      config = _xgplayerCodec.SpsParser.parseSPS(sps);
    }

    let numOfPps = data[offset];

    offset++;

    for (let i = 0; i < numOfPps; i++) {
      let size = data[offset] * 255 + data[offset + 1];
      offset += 2;
      let pps = new Uint8Array(size);
      for (let j = 0; j < size; j++) {
        pps[j] = data[offset + j];
      }
      offset += size;
      this.tracks.videoTrack.meta.pps = pps;
    }

    Object.assign(meta, _xgplayerCodec.SpsParser.toVideoMeta(config));

    // fill video media info
    const videoMedia = this._context.mediaInfo.video;

    videoMedia.codec = meta.codec;
    videoMedia.profile = meta.profile;
    videoMedia.level = meta.level;
    videoMedia.chromaFormat = meta.chromaFormat;
    videoMedia.frameRate = meta.frameRate;
    videoMedia.parRatio = meta.parRatio;
    videoMedia.width = videoMedia.width === meta.presentWidth ? videoMedia.width : meta.presentWidth;
    videoMedia.height = videoMedia.height === meta.presentHeight ? videoMedia.width : meta.presentHeight;

    meta.duration = this._context.mediaInfo.duration * meta.timescale;
    meta.avcc = new Uint8Array(data.length);
    meta.avcc.set(data);
    track.meta = meta;
  }

  /**
   * choose audio sample rate
   * @param samplingFrequencyIndex
   * @returns {number}
   * @private
   */
  _switchAudioSampleRate(samplingFrequencyIndex) {
    let samplingFrequencyList = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];
    return samplingFrequencyList[samplingFrequencyIndex];
  }

  /**
   * choose audio sampling frequence
   * @param info
   * @returns {number}
   * @private
   */
  _switchAudioSamplingFrequency(info) {
    let samplingFrequencyIndex = (info & 12) >>> 2;
    let samplingFrequencyList = [5500, 11025, 22050, 44100, 48000];
    return samplingFrequencyList[samplingFrequencyIndex];
  }

  /**
   * choose audio channel count
   * @param info
   * @returns {number}
   * @private
   */
  _switchAudioChannel(info) {
    let sampleTrackNumIndex = info & 1;
    let sampleTrackNumList = [1, 2];
    return sampleTrackNumList[sampleTrackNumIndex];
  }

  /**
   * check datasize is valid use 4 Byte after current tag
   * @param datasize
   * @returns {boolean}
   * @private
   */
  _datasizeValidator(datasize) {
    let datasizeConfirm = this.loaderBuffer.toInt(0, 4);
    this.loaderBuffer.shift(4);
    return datasizeConfirm === datasize + 11;
  }

  get loaderBuffer() {
    const buffer = this._context.getInstance('LOADER_BUFFER');
    if (buffer) {
      return buffer;
    } else {
      this.emit(DEMUX_EVENTS.DEMUX_ERROR, new Error('找不到 loaderBuffer 实例'));
    }
  }

  get tracks() {
    return this._context.getInstance('TRACKS');
  }

  get logger() {
    return this._context.getInstance('LOGGER');
  }
}

exports.default = FlvDemuxer;

/***/ }),

/***/ "../xgplayer-demux/src/hls/demuxer/m3u8parser.js":
/*!*******************************************************!*\
  !*** ../xgplayer-demux/src/hls/demuxer/m3u8parser.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Reference: https://tools.ietf.org/html/rfc8216#section-4.3
 */
class M3U8Parser {
  static parse(text, baseurl = '') {
    let ret = {
      duration: 0
    };
    if (!text || !text.split) {
      return;
    }
    let refs = text.split(/\r|\n/);
    refs = refs.filter(ref => {
      return ref;
    });
    let ref = refs.shift();
    if (!ref.match('#EXTM3U')) {
      throw new Error(`Invalid m3u8 file: not "#EXTM3U"`);
      return null;
    }
    ref = refs.shift();
    while (ref) {
      let refm = ref.match(/#(.[A-Z|-]*):(.*)/);
      let refd = ref.match(/#(.[A-Z|-]*)/);
      if (refd && refm && refm.length > 2) {
        switch (refm[1]) {
          case 'EXT-X-VERSION':
            ret.version = parseInt(refm[2]);
            break;
          case 'EXT-X-MEDIA-SEQUENCE':
            ret.sequence = parseInt(refm[2]);
            break;
          case 'EXT-X-TARGETDURATION':
            ret.targetduration = parseFloat(refm[2]);
            break;
          case 'EXTINF':
            M3U8Parser.parseFrag(refm, refs, ret, baseurl);
            break;
          case 'EXT-X-KEY':
            M3U8Parser.parseDecrypt(refm[2], ret);
            break;
          default:
            break;
        }
      }if (refd && refd.length > 1) {
        switch (refd[1]) {
          case 'EXT-X-DISCONTINUITY':
            ref = refs.shift();
            let refm = ref.match(/#(.[A-Z|-]*):(.*)/);
            if (refm.length > 2 && refm[1] === 'EXTINF') {
              M3U8Parser.parseFrag(refm, refs, ret, baseurl, true);
            }
            break;
          default:
            break;
        }
      }
      ref = refs.shift();
    }
    return ret;
  }

  static parseFrag(refm, refs, ret, baseurl, discontinue) {
    if (!ret.frags) {
      ret.frags = [];
    }

    let freg = {
      start: ret.duration,
      duration: parseFloat(refm[2]) * 1000
    };

    ret.duration += freg.duration;
    let nextline = refs.shift();
    if (nextline.match(/#(.*):(.*)/)) {
      nextline = refs.shift();
    }
    if (nextline.length > 0 && nextline.charAt(0) === '/' && baseurl.match(/.*\/\/.*\.\w+/g)) {
      baseurl = baseurl.match(/.*\/\/.*\.\w+/g)[0];
    }
    if (nextline.match(/.*:\/\/.*/)) {
      freg.url = nextline;
    } else {
      freg.url = baseurl + nextline;
    }
    freg.discontinue = discontinue;
    ret.frags.push(freg);
  }

  static parseURL(url) {
    let baseurl = '';
    let urls = url.match(/(.*\/).*\.m3u8/);
    if (urls && urls.length > 0) {
      for (let i = 0; i < urls.length; i++) {
        if (urls[i].match(/.*\/$/g) && urls[i].length > baseurl.length) {
          baseurl = urls[i];
        }
      }
    }
    return baseurl;
  }

  static parseDecrypt(refm, ret) {
    ret.encrypt = {};
    let refs = refm.split(',');
    for (let i in refs) {
      let cmd = refs[i];
      if (cmd.match(/METHOD=(.*)/)) {
        ret.encrypt.method = cmd.match(/METHOD=(.*)/)[1];
      }
      if (cmd.match(/URI="(.*)"/)) {
        ret.encrypt.uri = cmd.match(/URI="(.*)"/)[1];
      }

      if (cmd.match(/IV=0x(.*)/)) {
        let iv = cmd.match(/IV=0x(.*)/)[1];
        let length = Math.ceil(iv.length / 2);
        ret.encrypt.ivb = new Uint8Array(length);
        for (let i = length - 1; i >= 0; i--) {
          let im = parseInt(iv.substr(i * 2, 2), 16);
          ret.encrypt.ivb[i] = im;
        }
        ret.encrypt.iv = iv;
      }
    };
  }
}

exports.default = M3U8Parser;

/***/ }),

/***/ "../xgplayer-demux/src/hls/demuxer/ts.js":
/*!***********************************************!*\
  !*** ../xgplayer-demux/src/hls/demuxer/ts.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xgplayerCodec = __webpack_require__(/*! xgplayer-codec */ "../xgplayer-codec/index.js");

var _xgplayerBuffer = __webpack_require__(/*! xgplayer-buffer */ "../xgplayer-buffer/index.js");

var _xgplayerUtils = __webpack_require__(/*! xgplayer-utils */ "../xgplayer-utils/index.js");

const DEMUX_EVENTS = _xgplayerUtils.EVENTS.DEMUX_EVENTS;
const StreamType = {
  0x01: ['video', 'MPEG-1'],
  0x02: ['video', 'MPEG-2'],
  0x1b: ['video', 'AVC.H264'],
  0xea: ['video', 'VC-1'],
  0x03: ['audio', 'MPEG-1'],
  0x04: ['audio', 'MPEG-2'],
  0x0f: ['audio', 'MPEG-2.AAC'],
  0x11: ['audio', 'MPEG-4.AAC'],
  0x80: ['audio', 'LPCM'],
  0x81: ['audio', 'AC3'],
  0x06: ['audio', 'AC3'],
  0x82: ['audio', 'DTS'],
  0x83: ['audio', 'Dolby TrueHD'],
  0x84: ['audio', 'AC3-Plus'],
  0x85: ['audio', 'DTS-HD'],
  0x86: ['audio', 'DTS-MA'],
  0xa1: ['audio', 'AC3-Plus-SEC'],
  0xa2: ['audio', 'DTS-HD-SEC']
};

class TsDemuxer {
  constructor(configs) {
    this.configs = Object.assign({}, configs);
    this.demuxing = false;
    this.pat = [];
    this.pmt = [];
    this._hasVideoMeta = false;
    this._hasAudioMeta = false;
  }

  init() {
    this.on(DEMUX_EVENTS.DEMUX_START, this.demux.bind(this));
  }

  demux(frag) {
    if (this.demuxing) {
      return;
    }

    let buffer = this.inputBuffer;
    let frags = { pat: [], pmt: [] };
    let peses = {};

    // Read TS segment
    while (buffer.length >= 188) {
      if (buffer.length >= 1 && buffer.array[0][buffer.offset] !== 71) {
        this.emit(DEMUX_EVENTS.DEMUX_ERROR, this.TAG, new Error(`Untrust sync code: ${buffer.array[0][buffer.offset]}, try to recover;`), false);
      }
      while (buffer.length >= 1 && buffer.array[0][buffer.offset] !== 71) {
        buffer.shift(1);
      }
      let buf = buffer.shift(188);
      // console.log(buf);
      let tsStream = new _xgplayerUtils.Stream(buf.buffer);
      let ts = {};
      TsDemuxer.read(tsStream, ts, frags);
      if (ts.pes) {
        if (!peses[ts.header.pid]) {
          peses[ts.header.pid] = [];
        }
        peses[ts.header.pid].push(ts.pes);
        ts.pes.ES.buffer = [ts.pes.ES.buffer];
      } else if (peses[ts.header.pid]) {
        peses[ts.header.pid][peses[ts.header.pid].length - 1].ES.buffer.push(ts.payload.stream);
      }
    }

    let AudioOptions = frag;
    let VideoOptions = frag;

    // Get Frames data
    for (let i = 0; i < Object.keys(peses).length; i++) {
      let epeses = peses[Object.keys(peses)[i]];
      for (let j = 0; j < epeses.length; j++) {
        epeses[j].id = Object.keys(peses)[i];
        epeses[j].ES.buffer = TsDemuxer.Merge(epeses[j].ES.buffer);
        if (epeses[j].type === 'audio') {
          this.pushAudioSample(epeses[j], AudioOptions);
          AudioOptions = {};
        } else if (epeses[j].type === 'video') {
          this.pushVideoSample(epeses[j], VideoOptions);
          VideoOptions = {};
        }
      }
    }

    if (this._hasAudioMeta) {
      this.emit(DEMUX_EVENTS.DEMUX_COMPLETE, 'audio');
    }
    if (this._hasVideoMeta) {
      this.emit(DEMUX_EVENTS.DEMUX_COMPLETE, 'video');
    }
  }

  pushAudioSample(pes, options) {
    let track;
    if (!this._tracks.audioTrack) {
      this._tracks.audioTrack = new _xgplayerBuffer.AudioTrack();
      track = this._tracks.audioTrack;
    } else {
      track = this._tracks.audioTrack;
    }
    let meta = new _xgplayerUtils.AudioTrackMeta({
      audioSampleRate: pes.ES.frequence,
      sampleRate: pes.ES.frequence,
      channelCount: pes.ES.channel,
      codec: 'mp4a.40.' + pes.ES.audioObjectType,
      config: pes.ES.audioConfig,
      id: 2,
      sampleRateIndex: pes.ES.frequencyIndex
    });
    meta.refSampleDuration = Math.floor(1024 / meta.audioSampleRate * meta.timescale);

    let metaEqual = TsDemuxer.compaireMeta(track.meta, meta, true);

    if (!this._hasAudioMeta || !metaEqual) {
      track.meta = meta;
      this._hasAudioMeta = true;
      this.emit(DEMUX_EVENTS.METADATA_PARSED, 'audio');
    }

    let data = new Uint8Array(pes.ES.buffer.buffer.slice(pes.ES.buffer.position, pes.ES.buffer.length));
    let dts = parseInt(pes.pts / 90);
    let pts = parseInt(pes.pts / 90);
    let sample = new _xgplayerUtils.AudioTrackSample({ dts, pts, data, options });
    track.samples.push(sample);
  }

  pushVideoSample(pes, options) {
    let nals = _xgplayerCodec.Nalunit.getNalunits(pes.ES.buffer);
    let track;
    let meta = new _xgplayerUtils.VideoTrackMeta();
    if (!this._tracks.videoTrack) {
      this._tracks.videoTrack = new _xgplayerBuffer.VideoTrack();
      track = this._tracks.videoTrack;
    } else {
      track = this._tracks.videoTrack;
    }
    let sampleLength = 0;
    let sps = false;
    let pps = false;
    for (let i = 0; i < nals.length; i++) {
      let nal = nals[i];
      if (nal.sps) {
        sps = nal;
        track.sps = nal.body;
        meta.chromaFormat = sps.sps.chroma_format;
        meta.codec = 'avc1.';
        for (var j = 1; j < 4; j++) {
          var h = sps.body[j].toString(16);
          if (h.length < 2) {
            h = '0' + h;
          }
          meta.codec += h;
        }
        meta.codecHeight = sps.sps.codec_size.height;
        meta.codecWidth = sps.sps.codec_size.width;
        meta.frameRate = sps.sps.frame_rate;
        meta.id = 1;
        meta.level = sps.sps.level_string;
        meta.presentHeight = sps.sps.present_size.height;
        meta.presentWidth = sps.sps.present_size.width;
        meta.profile = sps.sps.profile_string;
        meta.refSampleDuration = Math.floor(meta.timescale * (sps.sps.frame_rate.fps_den / sps.sps.frame_rate.fps_num));
        meta.sarRatio = sps.sps.sar_ratio ? sps.sps.sar_ratio : sps.sps.par_ratio;
      } else if (nal.pps) {
        track.pps = nal.body;
        pps = nal;
      } else {
        sampleLength += 4 + nal.body.byteLength;
      }
    }

    if (sps && pps) {
      meta.avcc = _xgplayerCodec.Nalunit.getAvcc(sps.body, pps.body);
      let metaEqual = TsDemuxer.compaireMeta(track.meta, meta, true);
      if (!this._hasVideoMeta || !metaEqual) {
        if (options) {
          options.meta = Object.assign({}, meta);
        } else {
          options = {
            meta: Object.assign({}, meta)
          };
        }
        track.meta = meta;
        this._hasVideoMeta = true;
        this.emit(DEMUX_EVENTS.METADATA_PARSED, 'video');
      }
    }

    let data = new Uint8Array(sampleLength);
    let offset = 0;
    let isKeyframe = false;
    for (let i = 0; i < nals.length; i++) {
      let nal = nals[i];
      let length = nal.body.byteLength;
      if (nal.idr) {
        isKeyframe = true;
      }
      if (!nal.pps && !nal.sps) {
        data.set(new Uint8Array([length >>> 24 & 0xff, length >>> 16 & 0xff, length >>> 8 & 0xff, length & 0xff]), offset);
        offset += 4;
        data.set(nal.body, offset);
        offset += length;
      }
    }
    let sample = new _xgplayerUtils.VideoTrackSample({
      dts: parseInt(pes.dts / 90),
      pts: parseInt(pes.pts / 90),
      cts: (pes.pts - pes.dts) / 90,
      originDts: pes.dts,
      isKeyframe,
      data,
      options
    });
    track.samples.push(sample);
  }

  destory() {
    this.off(DEMUX_EVENTS.DEMUX_START, this.demux);
    this.configs = {};
    this.demuxing = false;
    this.pat = [];
    this.pmt = [];
    this._hasVideoMeta = false;
    this._hasAudioMeta = false;
  }

  static compaireArray(a, b, type) {
    let al = 0;
    let bl = 0;
    if (type === 'Uint8Array') {
      al = a.byteLength;
      bl = b.byteLength;
    } else if (type === 'Array') {
      al = a.length;
      bl = b.length;
    }
    if (al !== bl) {
      return false;
    }

    for (let i = 0; i < al; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }

  static compaireMeta(a, b, ignoreDuration) {
    if (!a || !b) {
      return false;
    }

    for (let i = 0, k = Object.keys(a).length; i < k; i++) {
      let itema = a[Object.keys(a)[i]];
      let itemb = b[Object.keys(a)[i]];
      if (typeof itema !== 'object') {
        if (ignoreDuration && Object.keys(a)[i] !== 'duration' && Object.keys(a)[i] !== 'refSampleDuration' && Object.keys(a)[i] !== 'refSampleDurationFixed' && itema !== itemb) {
          return false;
        }
      } else if (itema.byteLength !== undefined) {
        if (itemb.byteLength === undefined) {
          return false;
        }
        if (!TsDemuxer.compaireArray(itema, itemb, 'Uint8Array')) {
          return false;
        }
      } else if (itema.length !== undefined) {
        if (itemb.length === undefined) {
          return false;
        }
        if (!TsDemuxer.compaireArray(itema, itemb, 'Array')) {
          return false;
        }
      } else {
        if (!TsDemuxer.compaireMeta(itema, itemb)) {
          return false;
        }
      }
    }
    return true;
  }

  static Merge(buffers) {
    let data;
    let length = 0;
    let offset = 0;
    for (let i = 0; i < buffers.length; i++) {
      length += buffers[i].length - buffers[i].position;
    }

    data = new Uint8Array(length);
    for (let i = 0; i < buffers.length; i++) {
      let buffer = buffers[i];
      data.set(new Uint8Array(buffer.buffer, buffer.position), offset);
      offset += buffer.length - buffer.position;
    }
    return new _xgplayerUtils.Stream(data.buffer);
  }

  static read(stream, ts, frags) {
    TsDemuxer.readHeader(stream, ts);
    TsDemuxer.readPayload(stream, ts, frags);
    if (ts.header.packet === 'MEDIA' && ts.header.payload === 1 && !ts.unknownPIDs) {
      ts.pes = TsDemuxer.PES(ts);
    }
  }

  static readPayload(stream, ts, frags) {
    let header = ts.header;
    let pid = header.pid;
    switch (pid) {
      case 0:
        TsDemuxer.PAT(stream, ts, frags);
        break;
      case 1:
        TsDemuxer.CAT(stream, ts, frags);
        break;
      case 2:
        TsDemuxer.TSDT(stream, ts, frags);
        break;
      case 0x1fff:
        break;
      default:
        // TODO: some的写法不太好，得改
        if (frags.pat.some(item => {
          return item.pid === pid;
        })) {
          TsDemuxer.PMT(stream, ts, frags);
        } else {
          let sts = frags.pmt ? frags.pmt.filter(item => item.pid === pid) : [];
          if (sts.length > 0) {
            TsDemuxer.Media(stream, ts, StreamType[sts[0].streamType][0]);
          } else {
            ts.unknownPIDs = true;
          };
        }
    }
  }

  static readHeader(stream, ts) {
    let header = {};
    header.sync = stream.readUint8();
    let next = stream.readUint16();
    header.error = next >>> 15;
    header.payload = next >>> 14 & 1;
    header.priority = next >>> 13 & 1;
    header.pid = next & 0x1fff;

    next = stream.readUint8();

    header.scrambling = next >> 6 & 0x3; // 是否加密，00表示不加密

    /**
     * 00 ISO/IEC未来使用保留
     * 01 没有调整字段，仅含有184B有效净荷
     * 02 没有有效净荷，仅含有183B调整字段
     * 03 0~182B调整字段后为有效净荷
     */
    header.adaptation = next >> 4 & 0x3;
    header.continuity = next & 15;
    header.packet = header.pid === 0 ? 'PAT' : 'MEDIA';
    ts.header = header;
  }

  static PAT(stream, ts, frags) {
    let ret = {};
    let next = stream.readUint8();
    stream.skip(next);
    next = stream.readUint8();
    ret.tabelID = next;
    next = stream.readUint16();
    ret.error = next >>> 7;
    ret.zero = next >>> 6 & 1;
    ret.sectionLength = next & 0xfff;
    ret.streamID = stream.readUint16();
    ret.current = stream.readUint8() & 1;
    ret.sectionNumber = stream.readUint8();
    ret.lastSectionNumber = stream.readUint8();
    let N = (ret.sectionLength - 9) / 4;
    let list = [];
    for (let i = 0; i < N; i++) {
      let programNumber = stream.readUint16();
      let pid = stream.readUint16() & 0x1fff;
      list.push({
        program: programNumber,
        pid,
        type: programNumber === 0 ? 'network' : 'mapPID'
      });
    }
    if (list.length > 0) {
      frags.pat = frags.pat.concat(list);
    }
    ret.list = list;
    ret.program = stream.readUint16();
    ret.pid = stream.readUint16() & 0x1fff;
    ts.payload = ret;
    // TODO CRC
  }

  static PMT(stream, ts, frags) {
    let ret = {};
    let header = ts.header;
    header.packet = 'PMT';
    let next = stream.readUint8();
    stream.skip(next);
    next = stream.readUint8();
    ret.tableID = next;
    next = stream.readUint16();
    ret.sectionLength = next & 0xfff;
    ret.program = stream.readUint16();
    ret.current = stream.readUint8() & 1;
    ret.order = stream.readUint8();
    ret.lastOrder = stream.readUint8();
    ret.PCR_PID = stream.readUint16() & 0x1fff;
    ret.programLength = stream.readUint16() & 0xfff;
    let N = (ret.sectionLength - 13) / 5;
    let list = [];
    for (let i = 0; i < N; i++) {
      list.push({
        streamType: stream.readUint8(),
        pid: stream.readUint16() & 0x1fff, // 0x07e5 视频，0x07e6
        es: stream.readUint16() & 0xfff
      });
    }
    ret.list = list;
    if (!this.pmt) {
      this.pmt = [];
    }
    frags.pmt = this.pmt.concat(list.map(item => {
      return {
        pid: item.pid,
        es: item.es,
        streamType: item.streamType,
        program: ret.program
      };
    }));
    ts.payload = ret;
  }

  static Media(stream, ts, type) {
    let header = ts.header;
    let payload = {};
    header.type = type;
    if (header.adaptation === 0x03) {
      payload.adaptationLength = stream.readUint8();
      if (payload.adaptationLength > 0) {
        let next = stream.readUint8();
        payload.discontinue = next >>> 7;
        payload.access = next >>> 6 & 0x01;
        payload.priority = next >>> 5 & 0x01;
        payload.PCR = next >>> 4 & 0x01;
        payload.OPCR = next >>> 3 & 0x01;
        payload.splicePoint = next >>> 2 & 0x01;
        payload.transportPrivate = next >>> 1 & 0x01;
        payload.adaptationField = next & 0x01;
        let _start = stream.position;
        if (payload.PCR === 1) {
          payload.programClockBase = stream.readUint32() << 1;
          next = stream.readUint16();
          payload.programClockBase |= next >>> 15;
          payload.programClockExtension = next & 0x1ff;
        }
        if (payload.OPCR === 1) {
          payload.originProgramClockBase = stream.readUint32() << 1;
          next = stream.readUint16();
          payload.originProgramClockBase += next >>> 15;
          payload.originProgramClockExtension = next & 0x1ff;
        }
        if (payload.splicePoint === 1) {
          payload.spliceCountdown = stream.readUint8();
        }
        if (payload.transportPrivate === 1) {
          let length = stream.readUint8();
          let transportPrivateData = [];
          for (let i = 0; i < length; i++) {
            transportPrivateData.push(stream.readUint8());
          }
        }
        if (payload.adaptationField === 1) {
          let length = stream.readUint8();
          let next = stream.readUint8();
          let start = stream.position;
          let ltw = next >>> 7;
          let piecewise = next >>> 6 & 0x1;
          let seamless = next >>> 5 & 0x1;
          if (ltw === 1) {
            next = stream.readUint16();
            payload.ltwValid = next >>> 15;
            payload.ltwOffset = next & 0xefff;
          }
          if (piecewise === 1) {
            next = stream.readUint24();
            payload.piecewiseRate = next & 0x3fffff;
          }
          if (seamless === 1) {
            next = stream.readInt8();
            payload.spliceType = next >>> 4;
            payload.dtsNextAU1 = next >>> 1 & 0x7;
            payload.marker1 = next & 0x1;
            next = stream.readUint16();
            payload.dtsNextAU2 = next >>> 1;
            payload.marker2 = next & 0x1;
            next = stream.readUint16();
            payload.dtsNextAU3 = next;
          }
          stream.skip(length - 1 - (stream.position - start));
        }
        let lastStuffing = payload.adaptationLength - 1 - (stream.position - _start);
        stream.skip(lastStuffing);
      }
    }
    payload.stream = new _xgplayerUtils.Stream(stream.buffer.slice(stream.position));
    ts.payload = payload;
  }

  static PES(ts) {
    let ret = {};
    let buffer = ts.payload.stream;

    let next = buffer.readUint24();
    if (next !== 1) {
      ret.ES = {};
      ret.ES.buffer = buffer;
    } else {
      let streamID = buffer.readUint8();
      if (streamID >= 0xe0 && streamID <= 0xef) {
        ret.type = 'video';
      }
      if (streamID >= 0xc0 && streamID <= 0xdf) {
        ret.type = 'audio';
      }
      let packetLength = buffer.readUint16();
      ret.packetLength = packetLength;
      if (ret.type === 'video' || ret.type === 'audio') {
        let next = buffer.readUint8();
        let first = next >>> 6;
        if (first !== 0x02) {
          throw new Error('error when parse pes header');
        }
        next = buffer.readUint8();
        ret.ptsDTSFlag = next >>> 6;
        ret.escrFlag = next >>> 5 & 0x01;
        ret.esRateFlag = next >>> 4 & 0x01;
        ret.dsmFlag = next >>> 3 & 0x01;
        ret.additionalFlag = next >>> 2 & 0x01;
        ret.crcFlag = next >>> 1 & 0x01;
        ret.extensionFlag = next & 0x01;
        ret.pesHeaderLength = buffer.readUint8();
        let N1 = ret.pesHeaderLength;

        if (ret.ptsDTSFlag === 2) {
          let pts = [];
          next = buffer.readUint8();
          pts.push(next >>> 1 & 0x07);
          next = buffer.readUint16();
          pts.push(next >>> 1);
          next = buffer.readUint16();
          pts.push(next >>> 1);
          ret.pts = pts[0] << 30 | pts[1] << 15 | pts[2];
          N1 -= 5;
          // 视频如果没有dts用pts
          if (ret.type === 'video') {
            ret.dts = ret.pts;
          }
        }
        if (ret.ptsDTSFlag === 3) {
          let pts = [];
          next = buffer.readUint8();
          pts.push(next >>> 1 & 0x07);
          next = buffer.readUint16();
          pts.push(next >>> 1);
          next = buffer.readUint16();
          pts.push(next >>> 1);
          ret.pts = pts[0] << 30 | pts[1] << 15 | pts[2];
          let dts = [];
          next = buffer.readUint8();
          dts.push(next >>> 1 & 0x07);
          next = buffer.readUint16();
          dts.push(next >>> 1);
          next = buffer.readUint16();
          dts.push(next >>> 1);
          ret.dts = dts[0] << 30 | dts[1] << 15 | dts[2];
          N1 -= 10;
        }
        if (ret.escrFlag === 1) {
          let escr = [];
          let ex = [];
          next = buffer.readUint8();
          escr.push(next >>> 3 & 0x07);
          escr.push(next & 0x03);
          next = buffer.readUint16();
          escr.push(next >>> 13);
          escr.push(next & 0x03);
          next = buffer.readUint16();
          escr.push(next >>> 13);
          ex.push(next & 0x03);
          next = buffer.readUint8();
          ex.push(next >>> 1);
          ret.escr = (escr[0] << 30 | escr[1] << 28 | escr[2] << 15 | escr[3] << 13 | escr[4]) * 300 + (ex[0] << 7 | ex[1]);
          N1 -= 6;
        }
        if (ret.esRateFlag === 1) {
          next = buffer.readUint24();
          ret.esRate = next >>> 1 & 0x3fffff;
          N1 -= 3;
        }
        if (ret.dsmFlag === 1) {
          throw new Error('not support DSM_trick_mode');
        }
        if (ret.additionalFlag === 1) {
          next = buffer.readUint8();
          ret.additionalCopyInfo = next & 0x7f;
          N1 -= 1;
        }
        if (ret.crcFlag === 1) {
          ret.pesCRC = buffer.readUint16();
          N1 -= 2;
        }
        if (ret.extensionFlag === 1) {
          throw new Error('not support extension');
        }
        if (N1 > 0) {
          buffer.skip(N1);
        }
        ret.ES = TsDemuxer.ES(buffer, ret.type);
      } else {
        throw new Error('format is not supported');
      }
    }
    return ret;
  }

  static ES(buffer, type) {
    let next;
    let ret = {};
    if (type === 'video') {
      next = buffer.readUint32();
      if (next !== 1) {
        buffer.back(4);
        next = buffer.readUint24();
        if (next !== 1) {
          throw new Error('h264 nal header parse failed');
        }
      }
      buffer.skip(2); // 09 F0
      // TODO readnalu
      ret.buffer = buffer;
    } else if (type === 'audio') {
      next = buffer.readUint16();
      // adts的同步字节，12位
      if (next >>> 4 !== 0xfff) {
        throw new Error('aac ES parse Error');
      }
      const fq = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];
      ret.id = (next >>> 3 & 0x01) === 0 ? 'MPEG-4' : 'MPEG-2';
      ret.layer = next >>> 1 & 0x03;
      ret.absent = next & 0x01;
      next = buffer.readUint16();
      ret.audioObjectType = (next >>> 14 & 0x03) + 1;
      ret.profile = ret.audioObjectType - 1;
      ret.frequencyIndex = next >>> 10 & 0x0f;
      ret.frequence = fq[ret.frequencyIndex];
      ret.channel = next >>> 6 & 0x07;
      ret.frameLength = (next & 0x03) << 11 | buffer.readUint16() >>> 5;
      TsDemuxer.getAudioConfig(ret);
      buffer.skip(1);
      ret.buffer = buffer;
    } else {
      throw new Error(`ES ${type} is not supported`);
    }

    return ret;
  }

  static TSDT(stream, ts, frags) {
    // TODO
    ts.payload = {};
  }

  static CAT(stream, ts, frags) {
    let ret = {};
    ret.tableID = stream.readUint8();
    let next = stream.readUint16();
    ret.sectionIndicator = next >>> 7;
    ret.sectionLength = next & 0x0fff;
    stream.skip(2);
    next = stream.readUint8();
    ret.version = next >>> 3;
    ret.currentNextIndicator = next & 0x01;
    ret.sectionNumber = stream.readUint8();
    ret.lastSectionNumber = stream.readUint8();
    let N = (this.sectionLength - 9) / 4;
    let list = [];
    for (let i = 0; i < N; i++) {
      list.push({});
    }
    ret.crc32 = stream.readUint32();
    ts.payload = ret;
  }

  static getAudioConfig(ret) {
    let userAgent = navigator.userAgent.toLowerCase();
    let config;
    let extensionSampleIndex;
    if (/firefox/i.test(userAgent)) {
      if (ret.frequencyIndex >= 6) {
        ret.audioObjectType = 5;
        config = new Array(4);
        extensionSampleIndex = ret.frequencyIndex - 3;
      } else {
        ret.audioObjectType = 2;
        config = new Array(2);
        extensionSampleIndex = ret.frequencyIndex;
      }
    } else if (userAgent.indexOf('android') !== -1) {
      ret.audioObjectType = 2;
      config = new Array(2);
      extensionSampleIndex = ret.frequencyIndex;
    } else {
      ret.audioObjectType = 5;
      config = new Array(4);
      if (ret.frequencyIndex >= 6) {
        extensionSampleIndex = ret.frequencyIndex - 3;
      } else {
        if (ret.channel === 1) {
          ret.audioObjectType = 2;
          config = new Array(2);
        }
        extensionSampleIndex = ret.frequencyIndex;
      }
    }

    config[0] = ret.audioObjectType << 3;
    config[0] |= (ret.frequencyIndex & 0x0e) >> 1;
    config[1] = (ret.frequencyIndex & 0x01) << 7;
    config[1] |= ret.channel << 3;
    if (ret.audioObjectType === 5) {
      config[1] |= (extensionSampleIndex & 0x0e) >> 1;
      config[2] = (extensionSampleIndex & 0x01) << 7;
      config[2] |= 2 << 2;
      config[3] = 0;
    }
    ret.audioConfig = config;
  }

  get inputBuffer() {
    return this._context.getInstance(this.configs.inputbuffer);
  }

  get _tracks() {
    return this._context.getInstance('TRACKS');
  }
}

exports.default = TsDemuxer;

/***/ }),

/***/ "../xgplayer-demux/src/hls/playlist.js":
/*!*********************************************!*\
  !*** ../xgplayer-demux/src/hls/playlist.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
class Playlist {
  constructor(configs) {
    this._baseURL = '';
    this._list = {};
    this._ts = {};
    this.version = 0;
    this.sequence = -1;
    this.targetduration = 0;
    this.duration = 0;
    this.fragLength = 0;
    this._lastget = undefined;
    this._audoclear = configs.autoclear || false;
  }

  get list() {
    return this._list;
  }

  set baseURL(baseURL) {
    if (this.baseURL !== baseURL) {
      this.clear();
      this._baseURL = baseURL;
    }
  }

  get baseURL() {
    return this._baseURL;
  }

  push(ts, duration, discontinue) {
    if (!this._ts[ts]) {
      this._ts[ts] = { duration: duration,
        downloaded: false,
        downloading: false,
        start: this.duration,
        discontinue: discontinue ? true : false
      };
      this._list[this.duration] = ts;
      this.duration += duration;
      this.fragLength += 1;
    }
  }

  deleteFrag(url) {
    if (this._ts[url]) {
      if (this._ts[url].start > this._lastget.time) {
        this._lastget = {
          duration: this._ts[url].duration,
          time: this._ts[url].start,
          downloaded: false,
          downloading: false,
          url: url
        };
      }
      delete this._list[this._ts[url].start];
      delete this._ts[url];
      this.fragLength -= 1;
    }
  }

  pushM3U8(data, deletepre) {
    // 常规信息替换
    if (!data) {
      throw new Error(`No m3u8 data received.`);
      return;
    }
    this.version = data.version;
    this.targetduration = data.targetduration;
    if (data.encrypt && !this.encrypt) {
      this.encrypt = data.encrypt;
    }
    // 新分片信息
    if (data.sequence > this.sequence) {
      this.sequence = data.sequence;
      let newfraglist = [];
      for (let i = 0; i < data.frags.length; i++) {
        let frag = data.frags[i];
        if (!this._ts[frag.url]) {
          newfraglist.push(frag.url);
          this.push(frag.url, frag.duration, frag.discontinue);
        }
      }

      if (newfraglist.length < 1) {
        throw new Error(`Can not read ts file list.`);
      }

      if (deletepre) {
        let tslist = this.getTsList();
        for (let i = 0; i < tslist.length; i++) {
          if (newfraglist.indexOf(tslist[i]) < 0) {
            this.deleteFrag(tslist[i]);
          }
        }
      }
    } else {
      throw new Error(`Old m3u8 file received, ${data.sequence}`);
    }
  }

  getTsList() {
    return Object.keys(this._ts);
  }

  downloaded(tsname, isloaded) {
    let ts = this._ts[tsname];
    if (ts) {
      ts.downloaded = isloaded;
    }
  }

  downloading(tsname, loading) {
    let ts = this._ts[tsname];
    if (ts) {
      ts.downloading = loading;
    }
  }

  getTsByName(name) {
    return this._ts[name];
  }

  getTs(time) {
    let timelist = Object.keys(this._list);
    let ts;

    if (time === undefined) {
      if (this._lastget) {
        time = this._lastget.time + this._lastget.duration;
      } else {
        time = 0;
      }
    }

    if (timelist.length < 1 || time >= this.duration) {
      return undefined;
    }
    timelist.sort((a, b) => {
      return parseFloat(a) - parseFloat(b);
    });
    for (let i = 0; i < timelist.length; i++) {
      if (time >= parseInt(timelist[i])) {
        let url = this._list[timelist[i]];
        let downloaded = this._ts[url].downloaded;
        let downloading = this._ts[url].downloading;
        ts = { url, downloaded, downloading, time: parseInt(timelist[i]), duration: parseInt(this._ts[url].duration) };
        if (this.autoclear) {
          delete this._ts[this._lastget.url];
          delete this._list[this._lastget.time];
        }
        this._lastget = ts;
      } else {
        break;
      }
    }
    return ts;
  }

  clear() {
    this._baseURL = '';
    this._list = {};
    this._ts = {};
    this.version = 0;
    this.sequence = -1;
    this.targetduration = 0;
    this.duration = 0;
  }

  clearDownloaded() {
    for (let i = 0, l = Object.keys(this._ts).length; i < l; i++) {
      let ts = this._ts[Object.keys(this._ts)[i]];
      ts.downloaded = false;
      ts.downloading = false;
    }
  }

  destroy() {
    this._baseURL = '';
    this._list = {};
    this._ts = {};
    this.version = 0;
    this.sequence = -1;
    this.targetduration = 0;
    this.duration = 0;
    this.fragLength = 0;
    this._lastget = undefined;
    this._audoclear = false;
  }
}

exports.default = Playlist;

/***/ }),

/***/ "../xgplayer-loader/index.js":
/*!***********************************!*\
  !*** ../xgplayer-loader/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  FetchLoader: __webpack_require__(/*! ./src/fetch-loader */ "../xgplayer-loader/src/fetch-loader.js").default
};

/***/ }),

/***/ "../xgplayer-loader/src/fetch-loader.js":
/*!**********************************************!*\
  !*** ../xgplayer-loader/src/fetch-loader.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xgplayerUtils = __webpack_require__(/*! xgplayer-utils */ "../xgplayer-utils/index.js");

const LOADER_EVENTS = _xgplayerUtils.EVENTS.LOADER_EVENTS;
const READ_STREAM = 0;
const READ_TEXT = 1;
const READ_JSON = 2;
const READ_BUFFER = 3;
class FetchLoader {
  constructor(configs) {
    this.configs = Object.assign({}, configs);
    this.url = null;
    this.status = 0;
    this.error = null;
    this._reader = null;
    this._canceled = false;
    this._destroyed = false;
    this.readtype = this.configs.readtype;
    this.buffer = this.configs.buffer || 'LOADER_BUFFER';
    this._loaderTaskNo = 0;
  }

  init() {
    this.on(LOADER_EVENTS.LADER_START, this.load.bind(this));
  }

  static get type() {
    return 'loader';
  }

  load(url, opts) {
    let _this = this;
    this.url = url;
    this._canceled = false;

    // TODO: Add Ranges
    let params = this.getParams(opts);
    _this.loading = true;
    return fetch(this.url, params).then(function (response) {
      if (response.ok) {
        _this.status = response.status;
        return _this._onFetchResponse(response);
      }
      _this.loading = false;
      _this.emit(LOADER_EVENTS.LOADER_ERROR, _this.TAG, new Error(`invalid response.`));
    }).catch(function (error) {
      _this.loading = false;
      _this.emit(LOADER_EVENTS.LOADER_ERROR, _this.TAG, error);
      throw new Error(error.message);
    });
  }

  _onFetchResponse(response) {
    let _this = this;
    let buffer = this._context.getInstance(this.buffer);
    this._loaderTaskNo++;
    let taskno = this._loaderTaskNo;
    if (response.ok === true) {
      switch (this.readtype) {
        case READ_JSON:
          response.json().then(data => {
            _this.loading = false;
            if (!_this._canceled && !_this._destroyed) {
              if (buffer) {
                buffer.push(data);
                _this.emit(LOADER_EVENTS.LOADER_COMPLETE, buffer);
              } else {
                _this.emit(LOADER_EVENTS.LOADER_COMPLETE, data);
              }
            }
          });
          break;
        case READ_TEXT:
          response.text().then(data => {
            _this.loading = false;
            if (!_this._canceled && !_this._destroyed) {
              if (buffer) {
                buffer.push(data);
                _this.emit(LOADER_EVENTS.LOADER_COMPLETE, buffer);
              } else {
                _this.emit(LOADER_EVENTS.LOADER_COMPLETE, data);
              }
            }
          });
          break;
        case READ_BUFFER:
          response.arrayBuffer().then(data => {
            _this.loading = false;
            if (!_this._canceled && !_this._destroyed) {
              if (buffer) {
                buffer.push(new Uint8Array(data));
                _this.emit(LOADER_EVENTS.LOADER_COMPLETE, buffer);
              } else {
                _this.emit(LOADER_EVENTS.LOADER_COMPLETE, data);
              }
            }
          });
          break;
        case READ_STREAM:
        default:
          return this._onReader(response.body.getReader(), taskno);
      }
    }
  }

  _onReader(reader, taskno) {
    let buffer = this._context.getInstance(this.buffer);
    if (!buffer && this._reader || this._destroyed) {
      try {
        this._reader.cancel();
      } catch (e) {
        // DO NOTHING
      }
    }

    this._reader = reader;
    if (this.loading === false) {
      return;
    }

    let _this = this;
    // reader read function returns a Promise. get data when callback and has value.done when disconnected.
    // read方法返回一个Promise. 回调中可以获取到数据。当value.done存在时，说明链接断开。
    this._reader && this._reader.read().then(function (val) {
      if (val.done) {
        // TODO: 完成处理
        _this.loading = false;
        _this.status = 0;
        _this.emit(LOADER_EVENTS.LOADER_COMPLETE, buffer);
        return;
      }

      if (_this._canceled || _this._destroyed) {
        if (_this._reader) {
          try {
            _this._reader.cancel();
          } catch (e) {
            // DO NOTHING
          }
        }

        return;
      }
      buffer.push(val.value);
      _this.emit(LOADER_EVENTS.LOADER_DATALOADED, buffer);
      return _this._onReader(reader, taskno);
    }).catch(error => {
      _this.loading = false;
      _this.emit(LOADER_EVENTS.LOADER_ERROR, _this.TAG, error);
    });
  }

  getParams(opts) {
    let options = Object.assign({}, opts);
    let headers = new Headers();

    let params = {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default'

      // add custmor headers
      // 添加自定义头
    };if (typeof this.configs.headers === 'object') {
      let configHeaders = this.configs.headers;
      for (let key in configHeaders) {
        if (configHeaders.hasOwnProperty(key)) {
          headers.append(key, configHeaders[key]);
        }
      }
    }

    if (typeof options.headers === 'object') {
      let optHeaders = options.headers;
      for (let key in optHeaders) {
        if (optHeaders.hasOwnProperty(key)) {
          headers.append(key, optHeaders[key]);
        }
      }
    }

    if (options.cors === false) {
      params.mode = 'same-origin';
    }

    // withCredentials is disabled by default
    // withCredentials 在默认情况下不被使用。
    if (options.withCredentials) {
      params.credentials = 'include';
    }

    // TODO: Add ranges;
    return params;
  }

  cancel() {
    if (this._reader) {
      try {
        this._reader.cancel();
      } catch (e) {
        // 防止failed: 200错误被打印到控制台上
      }
      this._reader = null;
      this.loading = false;
      this._canceled = true;
    }
  }

  destroy() {
    this._destroyed = true;
    this.cancel();
  }
}

exports.default = FetchLoader;

/***/ }),

/***/ "../xgplayer-remux/index.js":
/*!**********************************!*\
  !*** ../xgplayer-remux/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  Mp4Remuxer: __webpack_require__(/*! ./src/mp4 */ "../xgplayer-remux/src/mp4/index.js").default
};

/***/ }),

/***/ "../xgplayer-remux/src/mp4/fmp4.js":
/*!*****************************************!*\
  !*** ../xgplayer-remux/src/mp4/fmp4.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xgplayerUtils = __webpack_require__(/*! xgplayer-utils */ "../xgplayer-utils/index.js");

// const UINT32_MAX = Math.pow(2, 32) - 1;
class Fmp4 {
  static size(value) {
    return _xgplayerUtils.Buffer.writeUint32(value);
  }
  static initBox(size, name, ...content) {
    const buffer = new _xgplayerUtils.Buffer();
    buffer.write(Fmp4.size(size), Fmp4.type(name), ...content);
    return buffer.buffer;
  }
  static extension(version, flag) {
    return new Uint8Array([version, flag >> 16 & 0xff, flag >> 8 & 0xff, flag & 0xff]);
  }
  static ftyp() {
    return Fmp4.initBox(24, 'ftyp', new Uint8Array([0x69, 0x73, 0x6F, 0x6D, // isom,
    0x0, 0x0, 0x00, 0x01, // minor_version: 0x01
    0x69, 0x73, 0x6F, 0x6D, // isom
    0x61, 0x76, 0x63, 0x31 // avc1
    ]));
  }
  static moov({ type, meta }) {
    let size = 8;
    let mvhd = Fmp4.mvhd(meta.duration, meta.timescale);
    let trak;

    if (type === 'video') {
      trak = Fmp4.videoTrak(meta);
    } else {
      trak = Fmp4.audioTrak(meta);
    }

    let mvex = Fmp4.mvex(meta.duration, meta.timescale || 1000, meta.id);
    [mvhd, trak, mvex].forEach(item => {
      size += item.byteLength;
    });
    return Fmp4.initBox(size, 'moov', mvhd, trak, mvex);
  }
  static mvhd(duration, timescale = 1000) {
    // duration *= timescale;
    let bytes = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags     1位的box版本+3位flags   box版本，0或1，一般为0。（以下字节数均按version=0）
    0x00, 0x00, 0x00, 0x00, // creation_time    创建时间  （相对于UTC时间1904-01-01零点的秒数）
    0x00, 0x00, 0x00, 0x00, // modification_time   修改时间

    /**
           * timescale: 4 bytes文件媒体在1秒时间内的刻度值，可以理解为1秒长度
           */
    timescale >>> 24 & 0xFF, timescale >>> 16 & 0xFF, timescale >>> 8 & 0xFF, timescale & 0xFF,

    /**
           * duration: 4 bytes该track的时间长度，用duration和time scale值可以计算track时长，比如audio track的time scale = 8000,
           * duration = 560128，时长为70.016，video track的time scale = 600, duration = 42000，时长为70
           */
    duration >>> 24 & 0xFF, duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, 0x00, 0x01, 0x00, 0x00, // Preferred rate: 1.0   推荐播放速率，高16位和低16位分别为小数点整数部分和小数部分，即[16.16] 格式，该值为1.0（0x00010000）表示正常前向播放
    /**
           * PreferredVolume(1.0, 2bytes) + reserved(2bytes)
           * 与rate类似，[8.8] 格式，1.0（0x0100）表示最大音量
           */
    0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, //  reserved: 4 + 4 bytes保留位
    0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, // ----begin composition matrix----
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // 视频变换矩阵   线性代数
    0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, // ----end composition matrix----
    0x00, 0x00, 0x00, 0x00, // ----begin pre_defined 6 * 4 bytes----
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // pre-defined 保留位
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // ----end pre_defined 6 * 4 bytes----
    0xFF, 0xFF, 0xFF, 0xFF // next_track_ID 下一个track使用的id号
    ]);
    return Fmp4.initBox(8 + bytes.length, 'mvhd', new Uint8Array(bytes));
  }
  static videoTrak(data) {
    let size = 8;

    let tkhd = Fmp4.tkhd({
      id: 1,
      duration: data.duration,
      timescale: data.timescale || 1000,
      width: data.presentWidth,
      height: data.presentHeight,
      type: 'video'
    });
    let mdia = Fmp4.mdia({
      type: 'video',
      timescale: data.timescale || 1000,
      duration: data.duration,
      avcc: data.avcc,
      parRatio: data.parRatio,
      width: data.presentWidth,
      height: data.presentHeight
    });
    [tkhd, mdia].forEach(item => {
      size += item.byteLength;
    });
    return Fmp4.initBox(size, 'trak', tkhd, mdia);
  }
  static audioTrak(data) {
    let size = 8;
    let tkhd = Fmp4.tkhd({
      id: 2,
      duration: data.duration,
      timescale: data.timescale || 1000,
      width: 0,
      height: 0,
      type: 'audio'
    });
    let mdia = Fmp4.mdia({
      type: 'audio',
      timescale: data.timescale || 1000,
      duration: data.duration,
      channelCount: data.channelCount,
      samplerate: data.sampleRate,
      config: data.config
    });
    [tkhd, mdia].forEach(item => {
      size += item.byteLength;
    });
    return Fmp4.initBox(size, 'trak', tkhd, mdia);
  }
  static tkhd(data) {
    let id = data.id;
    let duration = data.duration;
    let width = data.width;
    let height = data.height;
    let content = new Uint8Array([0x00, 0x00, 0x00, 0x07, // version(0) + flags 1位版本 box版本，0或1，一般为0。（以下字节数均按version=0）按位或操作结果值，预定义如下：
    // 0x000001 track_enabled，否则该track不被播放；
    // 0x000002 track_in_movie，表示该track在播放中被引用；
    // 0x000004 track_in_preview，表示该track在预览时被引用。
    // 一般该值为7，1+2+4 如果一个媒体所有track均未设置track_in_movie和track_in_preview，将被理解为所有track均设置了这两项；对于hint track，该值为0
    // hint track 这个特殊的track并不包含媒体数据，而是包含了一些将其他数据track打包成流媒体的指示信息。
    0x00, 0x00, 0x00, 0x00, // creation_time创建时间（相对于UTC时间1904-01-01零点的秒数）
    0x00, 0x00, 0x00, 0x00, // modification time 修改时间
    id >>> 24 & 0xFF, // track_ID: 4 bytes id号，不能重复且不能为0
    id >>> 16 & 0xFF, id >>> 8 & 0xFF, id & 0xFF, 0x00, 0x00, 0x00, 0x00, // reserved: 4 bytes    保留位
    duration >>> 24 & 0xFF, // duration: 4 bytes track的时间长度
    duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, 0x00, 0x00, 0x00, 0x00, // reserved: 2 * 4 bytes    保留位
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // layer(2bytes) + alternate_group(2bytes)  视频层，默认为0，值小的在上层.track分组信息，默认为0表示该track未与其他track有群组关系
    0x00, 0x00, 0x00, 0x00, // volume(2bytes) + reserved(2bytes)    [8.8] 格式，如果为音频track，1.0（0x0100）表示最大音量；否则为0   +保留位
    0x00, 0x01, 0x00, 0x00, // ----begin composition matrix----
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, // 视频变换矩阵
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, // ----end composition matrix----
    width >>> 8 & 0xFF, // //宽度
    width & 0xFF, 0x00, 0x00, height >>> 8 & 0xFF, // 高度
    height & 0xFF, 0x00, 0x00]);
    return Fmp4.initBox(8 + content.byteLength, 'tkhd', content);
  }
  static edts(data) {
    let buffer = new _xgplayerUtils.Buffer();
    let duration = data.duration;
    let mediaTime = data.mediaTime;
    buffer.write(Fmp4.size(36), Fmp4.type('edts'));
    // elst
    buffer.write(Fmp4.size(28), Fmp4.type('elst'));
    buffer.write(new Uint8Array([0x00, 0x00, 0x00, 0x01, // entry count
    duration >> 24 & 0xff, duration >> 16 & 0xff, duration >> 8 & 0xff, duration & 0xff, mediaTime >> 24 & 0xff, mediaTime >> 16 & 0xff, mediaTime >> 8 & 0xff, mediaTime & 0xff, 0x00, 0x00, 0x00, 0x01 // media rate
    ]));
    return buffer.buffer;
  }
  static mdia(data) {
    let size = 8;
    let mdhd = Fmp4.mdhd(data.timescale, data.duration);
    let hdlr = Fmp4.hdlr(data.type);
    let minf = Fmp4.minf(data);
    [mdhd, hdlr, minf].forEach(item => {
      size += item.byteLength;
    });
    return Fmp4.initBox(size, 'mdia', mdhd, hdlr, minf);
  }
  static mdhd(timescale = 1000, duration) {
    let content = new Uint8Array([0x00, 0x00, 0x00, 0x00, // creation_time    创建时间
    0x00, 0x00, 0x00, 0x00, // modification_time修改时间
    timescale >>> 24 & 0xFF, // timescale: 4 bytes    文件媒体在1秒时间内的刻度值，可以理解为1秒长度
    timescale >>> 16 & 0xFF, timescale >>> 8 & 0xFF, timescale & 0xFF, duration >>> 24 & 0xFF, // duration: 4 bytes  track的时间长度
    duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, 0x55, 0xC4, // language: und (undetermined) 媒体语言码。最高位为0，后面15位为3个字符（见ISO 639-2/T标准中定义）
    0x00, 0x00 // pre_defined = 0
    ]);
    return Fmp4.initBox(12 + content.byteLength, 'mdhd', Fmp4.extension(0, 0), content);
  }
  static hdlr(type) {
    let value = [0x00, // version 0
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00, // pre_defined
    0x76, 0x69, 0x64, 0x65, // handler_type: 'vide'
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, // reserved
    0x56, 0x69, 0x64, 0x65, 0x6f, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'VideoHandler'
    ];
    if (type === 'audio') {
      value.splice(8, 4, ...[0x73, 0x6f, 0x75, 0x6e]);
      value.splice(24, 13, ...[0x53, 0x6f, 0x75, 0x6e, 0x64, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00]);
    }
    return Fmp4.initBox(8 + value.length, 'hdlr', new Uint8Array(value));
  }
  static minf(data) {
    let size = 8;
    let vmhd = data.type === 'video' ? Fmp4.vmhd() : Fmp4.smhd();
    let dinf = Fmp4.dinf();
    let stbl = Fmp4.stbl(data);
    [vmhd, dinf, stbl].forEach(item => {
      size += item.byteLength;
    });
    return Fmp4.initBox(size, 'minf', vmhd, dinf, stbl);
  }
  static vmhd() {
    return Fmp4.initBox(20, 'vmhd', new Uint8Array([0x00, // version
    0x00, 0x00, 0x01, // flags
    0x00, 0x00, // graphicsmode
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00 // opcolor
    ]));
  }
  static smhd() {
    return Fmp4.initBox(16, 'smhd', new Uint8Array([0x00, // version
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, // balance
    0x00, 0x00 // reserved
    ]));
  }
  static dinf() {
    let buffer = new _xgplayerUtils.Buffer();
    let dref = [0x00, // version 0
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x01, // entry_count
    0x00, 0x00, 0x00, 0x0c, // entry_size
    0x75, 0x72, 0x6c, 0x20, // 'url' type
    0x00, // version 0
    0x00, 0x00, 0x01 // entry_flags
    ];
    buffer.write(Fmp4.size(36), Fmp4.type('dinf'), Fmp4.size(28), Fmp4.type('dref'), new Uint8Array(dref));
    return buffer.buffer;
  }
  static stbl(data) {
    let size = 8;
    let stsd = Fmp4.stsd(data);
    let stts = Fmp4.stts();
    let stsc = Fmp4.stsc();
    let stsz = Fmp4.stsz();
    let stco = Fmp4.stco();
    [stsd, stts, stsc, stsz, stco].forEach(item => {
      size += item.byteLength;
    });
    return Fmp4.initBox(size, 'stbl', stsd, stts, stsc, stsz, stco);
  }
  static stsd(data) {
    let content;
    if (data.type === 'audio') {
      // if (!data.isAAC && data.codec === 'mp4') {
      //     content = FMP4.mp3(data);
      // } else {
      //
      // }
      // 支持mp4a
      content = Fmp4.mp4a(data);
    } else {
      content = Fmp4.avc1(data);
    }
    return Fmp4.initBox(16 + content.byteLength, 'stsd', Fmp4.extension(0, 0), new Uint8Array([0x00, 0x00, 0x00, 0x01]), content);
  }
  static mp4a(data) {
    let content = new Uint8Array([0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, // reserved
    0x00, 0x01, // data_reference_index
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
    0x00, data.channelCount, // channelcount
    0x00, 0x10, // sampleSize:16bits
    0x00, 0x00, 0x00, 0x00, // reserved2
    data.samplerate >> 8 & 0xff, data.samplerate & 0xff, //
    0x00, 0x00]);
    let esds = Fmp4.esds(data.config);
    return Fmp4.initBox(8 + content.byteLength + esds.byteLength, 'mp4a', content, esds);
  }
  static esds(config = [43, 146, 8, 0]) {
    const configlen = config.length;
    let buffer = new _xgplayerUtils.Buffer();
    let content = new Uint8Array([0x00, // version 0
    0x00, 0x00, 0x00, // flags

    0x03, // descriptor_type
    0x17 + configlen, // length
    0x00, 0x01, // es_id
    0x00, // stream_priority

    0x04, // descriptor_type
    0x0f + configlen, // length
    0x40, // codec : mpeg4_audio
    0x15, // stream_type
    0x00, 0x00, 0x00, // buffer_size
    0x00, 0x00, 0x00, 0x00, // maxBitrate
    0x00, 0x00, 0x00, 0x00, // avgBitrate

    0x05 // descriptor_type
    ].concat([configlen]).concat(config).concat([0x06, 0x01, 0x02]));
    buffer.write(Fmp4.size(8 + content.byteLength), Fmp4.type('esds'), content);
    return buffer.buffer;
  }
  static avc1(data) {
    let buffer = new _xgplayerUtils.Buffer();
    let size = 40; // 8(avc1)+8(avcc)+8(btrt)+16(pasp)
    // let sps = data.sps
    // let pps = data.pps
    let width = data.width;
    let height = data.height;
    let hSpacing = data.parRatio.height;
    let vSpacing = data.parRatio.width;
    // let avccBuffer = new Buffer()
    // avccBuffer.write(new Uint8Array([
    //   0x01, // version
    //   sps[1], // profile
    //   sps[2], // profile compatible
    //   sps[3], // level
    //   0xfc | 3,
    //   0xE0 | 1 // 目前只处理一个sps
    // ].concat([sps.length >>> 8 & 0xff, sps.length & 0xff])))
    // avccBuffer.write(sps, new Uint8Array([1, pps.length >>> 8 & 0xff, pps.length & 0xff]), pps)

    let avcc = data.avcc;
    let avc1 = new Uint8Array([0x00, 0x00, 0x00, // reserved
    0x00, 0x00, 0x00, // reserved
    0x00, 0x01, // data_reference_index
    0x00, 0x00, // pre_defined
    0x00, 0x00, // reserved
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // pre_defined
    width >> 8 & 0xff, width & 0xff, // width
    height >> 8 & 0xff, height & 0xff, // height
    0x00, 0x48, 0x00, 0x00, // horizresolution
    0x00, 0x48, 0x00, 0x00, // vertresolution
    0x00, 0x00, 0x00, 0x00, // reserved
    0x00, 0x01, // frame_count
    0x12, 0x64, 0x61, 0x69, 0x6C, // dailymotion/hls.js
    0x79, 0x6D, 0x6F, 0x74, 0x69, 0x6F, 0x6E, 0x2F, 0x68, 0x6C, 0x73, 0x2E, 0x6A, 0x73, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // compressorname
    0x00, 0x18, // depth = 24
    0x11, 0x11]); // pre_defined = -1
    let btrt = new Uint8Array([0x00, 0x1c, 0x9c, 0x80, // bufferSizeDB
    0x00, 0x2d, 0xc6, 0xc0, // maxBitrate
    0x00, 0x2d, 0xc6, 0xc0 // avgBitrate
    ]);
    let pasp = new Uint8Array([hSpacing >> 24, // hSpacing
    hSpacing >> 16 & 0xff, hSpacing >> 8 & 0xff, hSpacing & 0xff, vSpacing >> 24, // vSpacing
    vSpacing >> 16 & 0xff, vSpacing >> 8 & 0xff, vSpacing & 0xff]);

    buffer.write(Fmp4.size(size + avc1.byteLength + avcc.byteLength + btrt.byteLength), Fmp4.type('avc1'), avc1, Fmp4.size(8 + avcc.byteLength), Fmp4.type('avcC'), avcc, Fmp4.size(20), Fmp4.type('btrt'), btrt, Fmp4.size(16), Fmp4.type('pasp'), pasp);
    return buffer.buffer;
  }
  static stts() {
    let content = new Uint8Array([0x00, // version
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00 // entry_count
    ]);
    return Fmp4.initBox(16, 'stts', content);
  }
  static stsc() {
    let content = new Uint8Array([0x00, // version
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00 // entry_count
    ]);
    return Fmp4.initBox(16, 'stsc', content);
  }
  static stco() {
    let content = new Uint8Array([0x00, // version
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00 // entry_count
    ]);
    return Fmp4.initBox(16, 'stco', content);
  }
  static stsz() {
    let content = new Uint8Array([0x00, // version
    0x00, 0x00, 0x00, // flags
    0x00, 0x00, 0x00, 0x00, // sample_size
    0x00, 0x00, 0x00, 0x00 // sample_count
    ]);
    return Fmp4.initBox(20, 'stsz', content);
  }
  static mvex(duration, timescale = 1000, trackID) {
    let buffer = new _xgplayerUtils.Buffer();
    let mehd = _xgplayerUtils.Buffer.writeUint32(duration);
    buffer.write(Fmp4.size(56), Fmp4.type('mvex'), Fmp4.size(16), Fmp4.type('mehd'), Fmp4.extension(0, 0), mehd, Fmp4.trex(trackID));
    return buffer.buffer;
  }
  static trex(id) {
    let content = new Uint8Array([0x00, // version 0
    0x00, 0x00, 0x00, // flags
    id >> 24, id >> 16 & 0xff, id >> 8 & 0xff, id & 0xff, // track_ID
    0x00, 0x00, 0x00, 0x01, // default_sample_description_index
    0x00, 0x00, 0x00, 0x00, // default_sample_duration
    0x00, 0x00, 0x00, 0x00, // default_sample_size
    0x00, 0x01, 0x00, 0x01 // default_sample_flags
    ]);
    return Fmp4.initBox(8 + content.byteLength, 'trex', content);
  }
  static moof(data) {
    let size = 8;
    let mfhd = Fmp4.mfhd();
    let traf = Fmp4.traf(data);
    [mfhd, traf].forEach(item => {
      size += item.byteLength;
    });
    return Fmp4.initBox(size, 'moof', mfhd, traf);
  }
  static mfhd() {
    let content = _xgplayerUtils.Buffer.writeUint32(Fmp4.sequence);
    Fmp4.sequence += 1;
    return Fmp4.initBox(16, 'mfhd', Fmp4.extension(0, 0), content);
  }
  static traf(data) {
    let size = 8;
    let tfhd = Fmp4.tfhd(data.id);
    let tfdt = Fmp4.tfdt(data.time);
    let sdtp = Fmp4.sdtp(data);
    let trun = Fmp4.trun(data, sdtp.byteLength);

    [tfhd, tfdt, trun, sdtp].forEach(item => {
      size += item.byteLength;
    });
    return Fmp4.initBox(size, 'traf', tfhd, tfdt, trun, sdtp);
  }
  static tfhd(id) {
    let content = _xgplayerUtils.Buffer.writeUint32(id);
    return Fmp4.initBox(16, 'tfhd', Fmp4.extension(0, 0), content);
  }
  static tfdt(time) {
    // let upper = Math.floor(time / (UINT32_MAX + 1)),
    //     lower = Math.floor(time % (UINT32_MAX + 1));
    return Fmp4.initBox(16, 'tfdt', Fmp4.extension(0, 0), _xgplayerUtils.Buffer.writeUint32(time));
  }
  static trun(data, sdtpLength) {
    // let id = data.id;
    // let ceil = id === 1 ? 16 : 12;
    let buffer = new _xgplayerUtils.Buffer();
    let sampleCount = _xgplayerUtils.Buffer.writeUint32(data.samples.length);
    // mdat-header 8
    // moof-header 8
    // mfhd 16
    // traf-header 8
    // thhd 16
    // tfdt 20
    // trun-header 12
    // sampleCount 4
    // data-offset 4
    // samples.length
    let offset = _xgplayerUtils.Buffer.writeUint32(8 + 8 + 16 + 8 + 16 + 16 + 12 + 4 + 4 + 16 * data.samples.length + sdtpLength);
    buffer.write(Fmp4.size(20 + 16 * data.samples.length), Fmp4.type('trun'), new Uint8Array([0x00, 0x00, 0x0F, 0x01]), sampleCount, offset);

    // let size = buffer.buffer.byteLength
    // let writeOffset = 0
    // data.samples.forEach(() => {
    //   size += 16
    // })
    //
    // let trunBox = new Uint8Array(size)

    // trunBox.set(buffer.buffer, 0)

    data.samples.forEach(item => {
      const flags = item.flags;
      // console.log(item.type, item.dts, item.duration)

      buffer.write(new Uint8Array([item.duration >>> 24 & 0xFF, // sample_duration
      item.duration >>> 16 & 0xFF, item.duration >>> 8 & 0xFF, item.duration & 0xFF, item.size >>> 24 & 0xFF, // sample_size
      item.size >>> 16 & 0xFF, item.size >>> 8 & 0xFF, item.size & 0xFF, flags.isLeading << 2 | flags.dependsOn, // sample_flags
      flags.isDependedOn << 6 | flags.hasRedundancy << 4 | flags.isNonSync, 0x00, 0x00, // sample_degradation_priority
      item.cts >>> 24 & 0xFF, // sample_composition_time_offset
      item.cts >>> 16 & 0xFF, item.cts >>> 8 & 0xFF, item.cts & 0xFF]));
      // writeOffset += 16
      // buffer.write(Buffer.writeUint32(0));
    });
    return buffer.buffer;
  }
  static sdtp(data) {
    let buffer = new _xgplayerUtils.Buffer();
    buffer.write(Fmp4.size(12 + data.samples.length), Fmp4.type('sdtp'), Fmp4.extension(0, 0));
    data.samples.forEach(item => {
      const flags = item.flags;
      const num = flags.isLeading << 6 | // is_leading: 2 (bit)
      flags.dependsOn << 4 | // sample_depends_on
      flags.isDependedOn << 2 | // sample_is_depended_on
      flags.hasRedundancy; // sample_has_redundancy

      buffer.write(new Uint8Array([num]));
    });
    return buffer.buffer;
  }
  static mdat(data) {
    let buffer = new _xgplayerUtils.Buffer();
    let size = 8;
    data.samples.forEach(item => {
      size += item.size;
    });
    buffer.write(Fmp4.size(size), Fmp4.type('mdat'));
    let mdatBox = new Uint8Array(size);
    let offset = 0;
    mdatBox.set(buffer.buffer, offset);
    offset += 8;
    data.samples.forEach(item => {
      item.buffer.forEach(unit => {
        mdatBox.set(unit, offset);
        offset += unit.byteLength;
        // buffer.write(unit.data);
      });
    });
    return mdatBox;
  }
}
Fmp4.type = name => {
  return new Uint8Array([name.charCodeAt(0), name.charCodeAt(1), name.charCodeAt(2), name.charCodeAt(3)]);
};
Fmp4.sequence = 1;

exports.default = Fmp4;

/***/ }),

/***/ "../xgplayer-remux/src/mp4/index.js":
/*!******************************************!*\
  !*** ../xgplayer-remux/src/mp4/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xgplayerUtils = __webpack_require__(/*! xgplayer-utils */ "../xgplayer-utils/index.js");

var _fmp = __webpack_require__(/*! ./fmp4 */ "../xgplayer-remux/src/mp4/fmp4.js");

var _fmp2 = _interopRequireDefault(_fmp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const REMUX_EVENTS = _xgplayerUtils.EVENTS.REMUX_EVENTS;

class Mp4Remuxer {
  constructor() {
    this._dtsBase = 0;
    this._isDtsBaseInited = false;

    this.isFirstVideo = true;
    this.isFirstAudio = true;

    this.videoAllDuration = 0;
    this.audioAllDuration = 0;
  }

  init() {
    this.on(REMUX_EVENTS.REMUX_MEDIA, this.remux.bind(this));
    this.on(REMUX_EVENTS.REMUX_METADATA, this.onMetaDataReady.bind(this));
    this.on(REMUX_EVENTS.DETECT_CHANGE_STREAM, this.resetDtsBase.bind(this));
  }

  destroy() {
    this._dtsBase = -1;
    this._dtsBaseInited = false;
  }

  reset() {
    this._dtsBase = 0;
    this._isDtsBaseInited = false;
  }

  remux() {
    const { audioTrack, videoTrack } = this._context.getInstance('TRACKS');
    !this._isDtsBaseInited && this.calcDtsBase(audioTrack, videoTrack);

    this._remuxVideo(videoTrack);
    this._remuxAudio(audioTrack);
  }

  resetDtsBase() {
    // for hls 中途切换 meta后seek
    this._dtsBase = 0;
    this._dtsBaseInited = false;
  }

  seek() {}

  onMetaDataReady(type) {
    let track;

    if (type === 'audio') {
      const { audioTrack } = this._context.getInstance('TRACKS');
      track = audioTrack;
    } else {
      const { videoTrack } = this._context.getInstance('TRACKS');
      track = videoTrack;
    }

    let presourcebuffer = this._context.getInstance('PRE_SOURCE_BUFFER');
    let source = presourcebuffer.getSource(type);
    if (!source) {
      source = presourcebuffer.createSource(type);
    }

    source.mimetype = track.meta.codec;
    source.init = this.remuxInitSegment(type, track.meta);
    // source.inited = false;

    // this.resetDtsBase()
    this.emit(REMUX_EVENTS.INIT_SEGMENT, type);
  }

  remuxInitSegment(type, meta) {
    let initSegment = new _xgplayerUtils.Buffer();
    let ftyp = _fmp2.default.ftyp();
    let moov = _fmp2.default.moov({ type, meta: meta });

    initSegment.write(ftyp, moov);
    return initSegment;
  }

  calcDtsBase(audioTrack, videoTrack) {
    if (!audioTrack.samples.length && !videoTrack.samples.length) {
      return;
    }

    let audioBase = Infinity;
    let videoBase = Infinity;

    if (audioTrack.samples && audioTrack.samples.length) {
      audioBase = audioTrack.samples[0].dts;
    }
    if (videoTrack.samples && videoTrack.samples.length) {
      videoBase = videoTrack.samples[0].dts;
    }

    this._dtsBase = Math.min(audioBase, videoBase);
    this._isDtsBaseInited = true;
  }

  _remuxVideo(videoTrack) {
    const track = videoTrack;

    if (!videoTrack.samples || !videoTrack.samples.length) {
      return;
    }

    let { samples } = track;
    let firstDts = -1;

    let initSegment = null;
    const mp4Samples = [];
    const mdatBox = {
      samples: []
    };

    while (samples.length) {
      const avcSample = samples.shift();

      const { isKeyframe, options } = avcSample;
      if (!this.isFirstAudio && options && options.meta) {
        initSegment = this.remuxInitSegment('video', options.meta);
        options.meta = null;
        samples.unshift(avcSample);
        if (!options.isContinue) {
          this.resetDtsBase();
        }
        break;
      }

      let dts = avcSample.dts - this._dtsBase;

      if (firstDts === -1) {
        firstDts = dts;
      }

      let cts;
      let pts;
      if (avcSample.pts !== undefined) {
        pts = avcSample.pts - this._dtsBase;
        cts = pts - dts;
      }
      if (avcSample.cts !== undefined) {
        pts = avcSample.cts + dts;
        cts = avcSample.cts;
      }

      let mdatSample = {
        buffer: [],
        size: 0
      };
      mdatBox.samples.push(mdatSample);
      mdatSample.buffer.push(avcSample.data);
      mdatSample.size += avcSample.data.byteLength;

      let sampleDuration = 0;
      if (samples.length >= 1) {
        const nextDts = samples[0].dts - this._dtsBase;
        sampleDuration = nextDts - dts;
      } else {
        if (mp4Samples.length >= 1) {
          // lastest sample, use second last duration
          sampleDuration = mp4Samples[mp4Samples.length - 1].duration;
        } else {
          // the only one sample, use reference duration
          sampleDuration = this.videoMeta.refSampleDuration;
        }
      }
      this.videoAllDuration += sampleDuration;
      // console.log(`dts ${dts}`, `pts ${pts}`, `cts: ${cts}`, `duration: ${sampleDuration}`, avcSample)
      mp4Samples.push({
        dts,
        cts,
        pts,
        data: avcSample.data,
        size: avcSample.data.byteLength,
        isKeyframe,
        duration: sampleDuration,
        flags: {
          isLeading: 0,
          dependsOn: isKeyframe ? 2 : 1,
          isDependedOn: isKeyframe ? 1 : 0,
          hasRedundancy: 0,
          isNonSync: isKeyframe ? 0 : 1
        },
        originDts: dts,
        type: 'video'
      });
    }

    let moofMdat = new _xgplayerUtils.Buffer();
    if (mp4Samples.length) {
      const moof = _fmp2.default.moof({
        id: track.meta.id,
        time: firstDts,
        samples: mp4Samples
      });
      const mdat = _fmp2.default.mdat(mdatBox);
      moofMdat.write(moof, mdat);

      this.writeToSource('video', moofMdat);
    }

    if (initSegment) {
      this.writeToSource('video', initSegment);

      if (samples.length) {
        // second part of stream change
        track.samples = samples;
        return this._remuxVideo(track);
      }
    }

    this.isFirstVideo = false;
    this.emit(REMUX_EVENTS.MEDIA_SEGMENT, 'video');

    const lastSample = mp4Samples[mp4Samples.length - 1];
    this._videoNextDts = lastSample.dts + lastSample.duration;
    track.samples = [];
    track.length = 0;
  }

  _remuxAudio(track) {
    const { samples } = track;
    let firstDts = -1;
    let mp4Samples = [];

    let initSegment = null;
    const mdatBox = {
      samples: []
    };
    if (!samples || !samples.length) {
      return;
    }
    let isFirstDtsInited = false;
    while (samples.length) {
      let sample = samples.shift();
      const { data, options } = sample;
      if (!this.isFirstAudio && options && options.meta) {
        initSegment = this.remuxInitSegment('audio', options.meta);
        options.meta = null;
        samples.unshift(sample);
        if (!options.isContinue) {
          this.resetDtsBase();
        }
        break;
      }

      let dts = sample.dts - this._dtsBase;
      const originDts = dts;
      if (!isFirstDtsInited) {
        firstDts = dts;
        isFirstDtsInited = true;
      }

      let sampleDuration = 0;

      if (this.audioMeta.refSampleDurationFixed) {
        sampleDuration = this.audioMeta.refSampleDurationFixed;
      } else if (samples.length >= 1) {
        const nextDts = samples[0].dts - this._dtsBase;
        sampleDuration = nextDts - dts;
      } else {
        if (mp4Samples.length >= 1) {
          // use second last sample duration
          sampleDuration = mp4Samples[mp4Samples.length - 1].duration;
        } else {
          // the only one sample, use reference sample duration
          sampleDuration = this.audioMeta.refSampleDuration;
        }
      }

      // console.log('remux audio ', dts)
      this.audioAllDuration += sampleDuration;
      const mp4Sample = {
        dts,
        pts: dts,
        cts: 0,
        size: data.byteLength,
        duration: sample.duration ? sample.duration : sampleDuration,
        flags: {
          isLeading: 0,
          dependsOn: 2,
          isDependedOn: 1,
          hasRedundancy: 0,
          isNonSync: 0
        },
        isKeyframe: true,
        originDts,
        type: 'audio'
      };

      let mdatSample = {
        buffer: [],
        size: 0
      };
      mdatSample.buffer.push(data);
      mdatSample.size += data.byteLength;

      mdatBox.samples.push(mdatSample);

      mp4Samples.push(mp4Sample);
    }

    const moofMdat = new _xgplayerUtils.Buffer();

    if (mp4Samples.length) {
      const moof = _fmp2.default.moof({
        id: track.meta.id,
        time: firstDts,
        samples: mp4Samples
      });
      const mdat = _fmp2.default.mdat(mdatBox);
      moofMdat.write(moof, mdat);

      this.writeToSource('audio', moofMdat);
    }

    if (initSegment) {
      this.writeToSource('audio', initSegment);
      if (samples.length) {
        // second part of stream change
        track.samples = samples;
        return this._remuxAudio(track);
      }
    }

    this.isFirstAudio = false;
    this.emit(REMUX_EVENTS.MEDIA_SEGMENT, 'audio', moofMdat);

    const lastSample = mp4Samples[mp4Samples.length - 1];
    this._videoNextDts = lastSample.dts + lastSample.duration;
    track.samples = [];
    track.length = 0;
  }

  writeToSource(type, buffer) {
    let presourcebuffer = this._context.getInstance('PRE_SOURCE_BUFFER');
    let source = presourcebuffer.getSource(type);
    if (!source) {
      source = presourcebuffer.createSource(type);
    }

    source.data.push(buffer);
  }

  initSilentAudio(dts, duration) {
    const unit = Mp4Remuxer.getSilentFrame(this.audioMeta.channelCount);
    return {
      dts,
      pts: dts,
      cts: 0,
      duration,
      unit,
      size: unit.byteLength,
      originDts: dts,
      type: 'video'
    };
  }

  get videoMeta() {
    return this._context.getInstance('TRACKS').videoTrack.meta;
  }
  get audioMeta() {
    return this._context.getInstance('TRACKS').audioTrack.meta;
  }

  static getSilentFrame(channelCount) {
    if (channelCount === 1) {
      return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x23, 0x80]);
    } else if (channelCount === 2) {
      return new Uint8Array([0x21, 0x00, 0x49, 0x90, 0x02, 0x19, 0x00, 0x23, 0x80]);
    } else if (channelCount === 3) {
      return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x8e]);
    } else if (channelCount === 4) {
      return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x80, 0x2c, 0x80, 0x08, 0x02, 0x38]);
    } else if (channelCount === 5) {
      return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x82, 0x30, 0x04, 0x99, 0x00, 0x21, 0x90, 0x02, 0x38]);
    } else if (channelCount === 6) {
      return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x82, 0x30, 0x04, 0x99, 0x00, 0x21, 0x90, 0x02, 0x00, 0xb2, 0x00, 0x20, 0x08, 0xe0]);
    }
    return null;
  }
}
exports.default = Mp4Remuxer;

/***/ }),

/***/ "../xgplayer-utils/index.js":
/*!**********************************!*\
  !*** ../xgplayer-utils/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  Context: __webpack_require__(/*! ./src/context */ "../xgplayer-utils/src/context.js").default,

  // Modules from constants
  EVENTS: __webpack_require__(/*! ./src/constants/events */ "../xgplayer-utils/src/constants/events.js").default,
  WORKER_COMMANDS: __webpack_require__(/*! ./src/constants/worker-commands */ "../xgplayer-utils/src/constants/worker-commands.js").default,

  // Modules from env
  sniffer: __webpack_require__(/*! ./src/env/sniffer */ "../xgplayer-utils/src/env/sniffer.js").default,
  isLe: __webpack_require__(/*! ./src/env/isle */ "../xgplayer-utils/src/env/isle.js").default,
  UTF8: __webpack_require__(/*! ./src/env/utf8 */ "../xgplayer-utils/src/env/utf8.js").default,
  PageVisibility: __webpack_require__(/*! ./src/env/PageVisibility */ "../xgplayer-utils/src/env/PageVisibility.js").default,

  // Models
  MediaInfo: __webpack_require__(/*! ./src/models/media-info */ "../xgplayer-utils/src/models/media-info.js").default,
  MediaSample: __webpack_require__(/*! ./src/models/media-sample */ "../xgplayer-utils/src/models/media-sample.js").default,
  MediaSegment: __webpack_require__(/*! ./src/models/media-segment */ "../xgplayer-utils/src/models/media-segment.js").default,
  MediaSegmentList: __webpack_require__(/*! ./src/models/media-segment-list */ "../xgplayer-utils/src/models/media-segment-list.js").default,
  AudioTrackMeta: __webpack_require__(/*! ./src/models/track-meta */ "../xgplayer-utils/src/models/track-meta.js").AudioTrackMeta,
  VideoTrackMeta: __webpack_require__(/*! ./src/models/track-meta */ "../xgplayer-utils/src/models/track-meta.js").VideoTrackMeta,
  AudioTrackSample: __webpack_require__(/*! ./src/models/track-sample */ "../xgplayer-utils/src/models/track-sample.js").AudioTrackSample,
  VideoTrackSample: __webpack_require__(/*! ./src/models/track-sample */ "../xgplayer-utils/src/models/track-sample.js").VideoTrackSample,

  // Modules from mse
  Mse: __webpack_require__(/*! ./src/mse/index */ "../xgplayer-utils/src/mse/index.js").default,

  // Modules from write
  Stream: __webpack_require__(/*! ./src/write/stream */ "../xgplayer-utils/src/write/stream.js").default,
  Buffer: __webpack_require__(/*! ./src/write/buffer */ "../xgplayer-utils/src/write/buffer.js").default,

  MobileVideo: __webpack_require__(/*! ./src/mobile/mobile-video */ "../xgplayer-utils/src/mobile/mobile-video.js"),
  // Crypto
  Crypto: __webpack_require__(/*! ./src/crypto */ "../xgplayer-utils/src/crypto/index.js").default
};

/***/ }),

/***/ "../xgplayer-utils/node_modules/concat-typed-array/lib/concat.js":
/*!***********************************************************************!*\
  !*** ../xgplayer-utils/node_modules/concat-typed-array/lib/concat.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (ResultConstructor) {
  var totalLength = 0;

  for (var _len = arguments.length, arrays = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    arrays[_key - 1] = arguments[_key];
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = arrays[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var arr = _step.value;

      totalLength += arr.length;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var result = new ResultConstructor(totalLength);
  var offset = 0;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = arrays[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _arr = _step2.value;

      result.set(_arr, offset);
      offset += _arr.length;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return result;
};

/***/ }),

/***/ "../xgplayer-utils/node_modules/concat-typed-array/lib/index.js":
/*!**********************************************************************!*\
  !*** ../xgplayer-utils/node_modules/concat-typed-array/lib/index.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _concat = __webpack_require__(/*! ./concat */ "../xgplayer-utils/node_modules/concat-typed-array/lib/concat.js");

var _concat2 = _interopRequireDefault(_concat);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = _concat2.default;

/***/ }),

/***/ "../xgplayer-utils/node_modules/webworkify-webpack/index.js":
/*!******************************************************************!*\
  !*** ../xgplayer-utils/node_modules/webworkify-webpack/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function webpackBootstrapFunc(modules) {
  /******/ // The module cache
  /******/var installedModules = {};

  /******/ // The require function
  /******/function __webpack_require__(moduleId) {

    /******/ // Check if module is in cache
    /******/if (installedModules[moduleId])
      /******/return installedModules[moduleId].exports;

    /******/ // Create a new module (and put it into the cache)
    /******/var module = installedModules[moduleId] = {
      /******/i: moduleId,
      /******/l: false,
      /******/exports: {}
      /******/ };

    /******/ // Execute the module function
    /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    /******/ // Flag the module as loaded
    /******/module.l = true;

    /******/ // Return the exports of the module
    /******/return module.exports;
    /******/
  }

  /******/ // expose the modules object (__webpack_modules__)
  /******/__webpack_require__.m = modules;

  /******/ // expose the module cache
  /******/__webpack_require__.c = installedModules;

  /******/ // identity function for calling harmony imports with the correct context
  /******/__webpack_require__.i = function (value) {
    return value;
  };

  /******/ // define getter function for harmony exports
  /******/__webpack_require__.d = function (exports, name, getter) {
    /******/if (!__webpack_require__.o(exports, name)) {
      /******/Object.defineProperty(exports, name, {
        /******/configurable: false,
        /******/enumerable: true,
        /******/get: getter
        /******/ });
      /******/
    }
    /******/
  };

  /******/ // define __esModule on exports
  /******/__webpack_require__.r = function (exports) {
    /******/Object.defineProperty(exports, '__esModule', { value: true });
    /******/
  };

  /******/ // getDefaultExport function for compatibility with non-harmony modules
  /******/__webpack_require__.n = function (module) {
    /******/var getter = module && module.__esModule ?
    /******/function getDefault() {
      return module['default'];
    } :
    /******/function getModuleExports() {
      return module;
    };
    /******/__webpack_require__.d(getter, 'a', getter);
    /******/return getter;
    /******/
  };

  /******/ // Object.prototype.hasOwnProperty.call
  /******/__webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };

  /******/ // __webpack_public_path__
  /******/__webpack_require__.p = "/";

  /******/ // on error function for async loading
  /******/__webpack_require__.oe = function (err) {
    console.error(err);throw err;
  };

  var f = __webpack_require__(__webpack_require__.s = ENTRY_MODULE);
  return f.default || f; // try to call default if defined to also support babel esmodule exports
}

var moduleNameReqExp = '[\\.|\\-|\\+|\\w|\/|@]+';
var dependencyRegExp = '\\(\\s*(\/\\*.*?\\*\/)?\\s*.*?(' + moduleNameReqExp + ').*?\\)'; // additional chars when output.pathinfo is true

// http://stackoverflow.com/a/2593661/130442
function quoteRegExp(str) {
  return (str + '').replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&');
}

function isNumeric(n) {
  return !isNaN(1 * n); // 1 * n converts integers, integers as string ("123"), 1e3 and "1e3" to integers and strings to NaN
}

function getModuleDependencies(sources, module, queueName) {
  var retval = {};
  retval[queueName] = [];

  var fnString = module.toString();
  var wrapperSignature = fnString.match(/^function\s?\w*\(\w+,\s*\w+,\s*(\w+)\)/);
  if (!wrapperSignature) return retval;
  var webpackRequireName = wrapperSignature[1];

  // main bundle deps
  var re = new RegExp('(\\\\n|\\W)' + quoteRegExp(webpackRequireName) + dependencyRegExp, 'g');
  var match;
  while (match = re.exec(fnString)) {
    if (match[3] === 'dll-reference') continue;
    retval[queueName].push(match[3]);
  }

  // dll deps
  re = new RegExp('\\(' + quoteRegExp(webpackRequireName) + '\\("(dll-reference\\s(' + moduleNameReqExp + '))"\\)\\)' + dependencyRegExp, 'g');
  while (match = re.exec(fnString)) {
    if (!sources[match[2]]) {
      retval[queueName].push(match[1]);
      sources[match[2]] = __webpack_require__(match[1]).m;
    }
    retval[match[2]] = retval[match[2]] || [];
    retval[match[2]].push(match[4]);
  }

  // convert 1e3 back to 1000 - this can be important after uglify-js converted 1000 to 1e3
  var keys = Object.keys(retval);
  for (var i = 0; i < keys.length; i++) {
    for (var j = 0; j < retval[keys[i]].length; j++) {
      if (isNumeric(retval[keys[i]][j])) {
        retval[keys[i]][j] = 1 * retval[keys[i]][j];
      }
    }
  }

  return retval;
}

function hasValuesInQueues(queues) {
  var keys = Object.keys(queues);
  return keys.reduce(function (hasValues, key) {
    return hasValues || queues[key].length > 0;
  }, false);
}

function getRequiredModules(sources, moduleId) {
  var modulesQueue = {
    main: [moduleId]
  };
  var requiredModules = {
    main: []
  };
  var seenModules = {
    main: {}
  };

  while (hasValuesInQueues(modulesQueue)) {
    var queues = Object.keys(modulesQueue);
    for (var i = 0; i < queues.length; i++) {
      var queueName = queues[i];
      var queue = modulesQueue[queueName];
      var moduleToCheck = queue.pop();
      seenModules[queueName] = seenModules[queueName] || {};
      if (seenModules[queueName][moduleToCheck] || !sources[queueName][moduleToCheck]) continue;
      seenModules[queueName][moduleToCheck] = true;
      requiredModules[queueName] = requiredModules[queueName] || [];
      requiredModules[queueName].push(moduleToCheck);
      var newModules = getModuleDependencies(sources, sources[queueName][moduleToCheck], queueName);
      var newModulesKeys = Object.keys(newModules);
      for (var j = 0; j < newModulesKeys.length; j++) {
        modulesQueue[newModulesKeys[j]] = modulesQueue[newModulesKeys[j]] || [];
        modulesQueue[newModulesKeys[j]] = modulesQueue[newModulesKeys[j]].concat(newModules[newModulesKeys[j]]);
      }
    }
  }

  return requiredModules;
}

module.exports = function (moduleId, options) {
  options = options || {};
  var sources = {
    main: __webpack_require__.m
  };

  var requiredModules = options.all ? { main: Object.keys(sources.main) } : getRequiredModules(sources, moduleId);

  var src = '';

  Object.keys(requiredModules).filter(function (m) {
    return m !== 'main';
  }).forEach(function (module) {
    var entryModule = 0;
    while (requiredModules[module][entryModule]) {
      entryModule++;
    }
    requiredModules[module].push(entryModule);
    sources[module][entryModule] = '(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })';
    src = src + 'var ' + module + ' = (' + webpackBootstrapFunc.toString().replace('ENTRY_MODULE', JSON.stringify(entryModule)) + ')({' + requiredModules[module].map(function (id) {
      return '' + JSON.stringify(id) + ': ' + sources[module][id].toString();
    }).join(',') + '});\n';
  });

  src = src + 'new ((' + webpackBootstrapFunc.toString().replace('ENTRY_MODULE', JSON.stringify(moduleId)) + ')({' + requiredModules.main.map(function (id) {
    return '' + JSON.stringify(id) + ': ' + sources.main[id].toString();
  }).join(',') + '}))(self);';

  var blob = new window.Blob([src], { type: 'text/javascript' });
  if (options.bare) {
    return blob;
  }

  var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

  var workerUrl = URL.createObjectURL(blob);
  var worker = new window.Worker(workerUrl);
  worker.objectURL = workerUrl;

  return worker;
};

/***/ }),

/***/ "../xgplayer-utils/src/constants/events.js":
/*!*************************************************!*\
  !*** ../xgplayer-utils/src/constants/events.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const LOADER_EVENTS = {
  LADER_START: 'LOADER_START',
  LOADER_DATALOADED: 'LOADER_DATALOADED',
  LOADER_COMPLETE: 'LOADER_COMPLETE',
  LOADER_ERROR: 'LOADER_ERROR'
};

const DEMUX_EVENTS = {
  DEMUX_START: 'DEMUX_START',
  DEMUX_COMPLETE: 'DEMUX_COMPLETE',
  DEMUX_ERROR: 'DEMUX_ERROR',
  METADATA_PARSED: 'METADATA_PARSED',
  VIDEO_METADATA_CHANGE: 'VIDEO_METADATA_CHANGE',
  AUDIO_METADATA_CHANGE: 'AUDIO_METADATA_CHANGE',
  MEDIA_INFO: 'MEDIA_INFO'
};

const REMUX_EVENTS = {
  REMUX_METADATA: 'REMUX_METADATA',
  REMUX_MEDIA: 'REMUX_MEDIA',
  MEDIA_SEGMENT: 'MEDIA_SEGMENT',
  REMUX_ERROR: 'REMUX_ERROR',
  INIT_SEGMENT: 'INIT_SEGMENT',
  DETECT_CHANGE_STREAM: 'DETECT_CHANGE_STREAM'
};

const MSE_EVENTS = {
  SOURCE_UPDATE_END: 'SOURCE_UPDATE_END'

  // hls专有events
};const HLS_EVENTS = {
  RETRY_TIME_EXCEEDED: 'RETRY_TIME_EXCEEDED'
};

const CRYTO_EVENTS = {
  START_DECRYPT: 'START_DECRYPT',
  DECRYPTED: 'DECRYPTED'
};

const BROWSER_EVENTS = {
  VISIBILITY_CHANGE: 'VISIBILITY_CHANGE'
};

const ALLEVENTS = Object.assign({}, LOADER_EVENTS, DEMUX_EVENTS, REMUX_EVENTS, MSE_EVENTS, HLS_EVENTS, BROWSER_EVENTS);

const FlvAllowedEvents = [];
const HlsAllowedEvents = [];

for (let key in ALLEVENTS) {
  if (ALLEVENTS.hasOwnProperty(key)) {
    FlvAllowedEvents.push(ALLEVENTS[key]);
  }
}

for (let key in ALLEVENTS) {
  if (ALLEVENTS.hasOwnProperty(key)) {
    HlsAllowedEvents.push(ALLEVENTS[key]);
  }
}

exports.default = {
  ALLEVENTS,
  HLS_EVENTS,
  REMUX_EVENTS,
  DEMUX_EVENTS,
  MSE_EVENTS,
  LOADER_EVENTS,
  FlvAllowedEvents,
  HlsAllowedEvents,
  CRYTO_EVENTS,
  BROWSER_EVENTS
};

/***/ }),

/***/ "../xgplayer-utils/src/constants/worker-commands.js":
/*!**********************************************************!*\
  !*** ../xgplayer-utils/src/constants/worker-commands.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const CONTEXT_COMOMANDS = exports.CONTEXT_COMOMANDS = {
  ON: 'on',
  ONCE: 'once',
  OFF: 'off',
  EMIT: 'emit',
  DESTROY: 'destroy'
};

/***/ }),

/***/ "../xgplayer-utils/src/context.js":
/*!****************************************!*\
  !*** ../xgplayer-utils/src/context.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mediaInfo = __webpack_require__(/*! ./models/media-info */ "../xgplayer-utils/src/models/media-info.js");

var _mediaInfo2 = _interopRequireDefault(_mediaInfo);

var _events = __webpack_require__(/*! events */ "../../node_modules/events/events.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DIRECT_EMIT_FLAG = '__TO__';

class Context {
  constructor(allowedEvents = []) {
    this._emitter = new _events.EventEmitter();
    this._instanceMap = {}; // 所有的解码流程实例
    this._clsMap = {}; // 构造函数的map
    this._inited = false;
    this.mediaInfo = new _mediaInfo2.default();
    this.allowedEvents = allowedEvents;
    this._hooks = {}; // 注册在事件前/后的钩子，例如 before('DEMUX_COMPLETE')
  }

  /**
   * 从上下文中获取解码流程实例，如果没有实例，构造一个
   * @param tag
   * @param args
   * @returns {*}
   */
  getInstance(tag) {
    const instance = this._instanceMap[tag];
    if (instance) {
      return instance;
    } else {
      // throw new Error(`${tag}实例尚未初始化`)
      return null;
    }
  }

  /**
   * 初始化具体实例
   * @param tag
   * @param args
   */
  initInstance(tag, ...args) {
    if (this._clsMap[tag]) {
      const newInstance = new this._clsMap[tag](...args);
      this._instanceMap[tag] = newInstance;
      if (newInstance.init) {
        newInstance.init(); // TODO: lifecircle
      }
      return newInstance;
    } else {
      throw new Error(`${tag}未在context中注册`);
    }
  }

  /**
   * 避免大量的initInstance调用，初始化所有的组件
   * @param config
   */
  init(config) {
    if (this._inited) {
      return;
    }
    for (let tag in this._clsMap) {
      // if not inited, init an instance
      if (this._clsMap.hasOwnProperty(tag) && !this._instanceMap[tag]) {
        this.initInstance(tag, config);
      }
    }
    this._inited = true;
  }

  /**
   * 注册一个上下文流程，提供安全的事件发送机制
   * @param tag
   * @param cls
   */
  registry(tag, cls) {
    const emitter = this._emitter;
    const checkMessageName = this._isMessageNameValid.bind(this);
    const self = this;
    const enhanced = class extends cls {
      constructor(...args) {
        super(...args);
        this.listeners = {};
        this.onceListeners = {};
        this.TAG = tag;
        this._context = self;
      }

      on(messageName, callback) {
        checkMessageName(messageName);

        if (this.listeners[messageName]) {
          this.listeners[messageName].push(callback);
        } else {
          this.listeners[messageName] = [callback];
        }

        emitter.on(`${messageName}${DIRECT_EMIT_FLAG}${tag}`, callback); // 建立定向通信监听
        return emitter.on(messageName, callback);
      }

      /**
       * 在某个事件触发前执行
       * @param messageName
       * @param callback
       */
      before(messageName, callback) {
        checkMessageName(messageName);
        if (self._hooks[messageName]) {
          self._hooks[messageName].push(callback);
        } else {
          self._hooks[messageName] = [callback];
        }
      }

      once(messageName, callback) {
        checkMessageName(messageName);

        if (this.onceListeners[messageName]) {
          this.onceListeners[messageName].push(callback);
        } else {
          this.onceListeners[messageName] = [callback];
        }

        emitter.once(`${messageName}${DIRECT_EMIT_FLAG}${tag}`, callback);
        return emitter.once(messageName, callback);
      }

      emit(messageName, ...args) {
        checkMessageName(messageName);

        const beforeList = self._hooks ? self._hooks[messageName] : null;

        if (beforeList) {
          for (let i = 0, len = beforeList.length; i < len; i++) {
            const callback = beforeList[i];
            callback();
          }
        }
        return emitter.emit(messageName, ...args);
      }

      /**
       * 定向发送给某个组件单例的消息
       * @param messageName
       * @param args
       */
      emitTo(tag, messageName, ...args) {
        checkMessageName(messageName);

        return emitter.emit(`${messageName}${DIRECT_EMIT_FLAG}${tag}`, ...args);
      }

      off(messageName, callback) {
        checkMessageName(messageName);
        return emitter.off(messageName, callback);
      }

      removeListeners() {
        const hasOwn = Object.prototype.hasOwnProperty.bind(this.listeners);

        for (let messageName in this.listeners) {
          if (hasOwn(messageName)) {
            const callbacks = this.listeners[messageName] || [];
            for (let i = 0; i < callbacks.length; i++) {
              const callback = callbacks[i];
              emitter.off(messageName, callback);
              emitter.off(`${messageName}${DIRECT_EMIT_FLAG}${tag}`, callback);
            }
          }
        }

        for (let messageName in this.onceListeners) {
          if (hasOwn(messageName)) {
            const callbacks = this.onceListeners[messageName] || [];
            for (let i = 0; i < callbacks.length; i++) {
              const callback = callbacks[i];
              emitter.off(messageName, callback);
              emitter.off(`${messageName}${DIRECT_EMIT_FLAG}${tag}`, callback);
            }
          }
        }
      }

      /**
       * 在组件销毁时，默认将它注册的事件全部卸载，确保不会造成内存泄漏
       */
      destroy() {
        // step1 unlisten events
        this.removeListeners();
        this.listeners = {};

        // step2 release from context
        delete self._instanceMap[tag];
        if (super.destroy) {
          return super.destroy();
        }
      }
    };
    this._clsMap[tag] = enhanced;

    /**
     * get instance immediately
     * e.g const instance = context.registry(tag, Cls)(config)
     * */
    return (...args) => {
      return this.initInstance(tag, ...args);
    };
  }

  /**
   * 对存在的实例进行
   */
  destroyInstances() {
    Object.keys(this._instanceMap).forEach(tag => {
      if (this._instanceMap[tag].destroy) {
        this._instanceMap[tag].destroy();
      }
    });
  }

  /**
   * 编解码流程无需关注事件的解绑
   */
  destroy() {
    this._emitter = null;
    this.allowedEvents = [];
    this._clsMap = null;
    this._context = null;
    this._hooks = null;
    this.destroyInstances();
  }

  /**
   * 对信道进行收拢
   * @param messageName
   * @private
   */
  _isMessageNameValid(messageName) {
    if (!this.allowedEvents.indexOf(messageName) < 0) {
      throw new Error(`unregistered message name: ${messageName}`);
    }
  }
}

exports.default = Context;

/***/ }),

/***/ "../xgplayer-utils/src/crypto/index.js":
/*!*********************************************!*\
  !*** ../xgplayer-utils/src/crypto/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _events = __webpack_require__(/*! ../constants/events */ "../xgplayer-utils/src/constants/events.js");

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CRYTO_EVENTS = _events2.default.CRYTO_EVENTS;
class Crypto {
    constructor(config) {
        this.inputBuffer = config.inputbuffer;
        this.outputBuffer = config.outputbuffer;
        this.key = config.key;
        this.iv = config.iv;
        this.method = config.method;

        this.crypto = window.crypto || window.msCrypto;
    }

    init() {
        this.on(CRYTO_EVENTS.START_DECRYPT, this.decript.bind(this));
    }

    decript() {
        if (!this.aeskey) {
            let sbkey = this.crypto.subtle.importKey('raw', this.key.buffer, { name: 'AES-CBC' }, false, ['encrypt', 'decrypt']);
            sbkey.then(key => {
                this.aeskey = key;
                this.decriptData();
            });
        } else {
            this.decriptData();
        }
    }

    decriptData() {
        let inputbuffer = this._context.getInstance(this.inputBuffer);
        let outputbuffer = this._context.getInstance(this.outputBuffer);
        let data = inputbuffer.shift();
        if (data) {
            this.crypto.subtle.decrypt({ name: 'AES-CBC', iv: this.iv.buffer }, this.aeskey, data).then(res => {
                outputbuffer.push(new Uint8Array(res));
                this.emit(CRYTO_EVENTS.DECRYPTED);
                this.decriptData(data);
            });
        }
    }
}
exports.default = Crypto;

/***/ }),

/***/ "../xgplayer-utils/src/env/PageVisibility.js":
/*!***************************************************!*\
  !*** ../xgplayer-utils/src/env/PageVisibility.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = __webpack_require__(/*! ../constants/events */ "../xgplayer-utils/src/constants/events.js");

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BROWSER_EVENTS = _events2.default.BROWSER_EVENTS;

let hidden;
let visibilityChange;
if (typeof document.hidden !== 'undefined') {
  // Opera 12.10 and Firefox 18 and later support
  hidden = 'hidden';
  visibilityChange = 'visibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden';
  visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden';
  visibilityChange = 'webkitvisibilitychange';
}

class PageVisibility {

  constructor() {
    this.callbacks = {
      onShow: [],
      onHidden: []
    };
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.init();
  }

  init() {
    document.addEventListener(visibilityChange, this.handleVisibilityChange, false);
  }

  handleVisibilityChange() {
    this.emit(BROWSER_EVENTS.VISIBILITY_CHANGE, document[hidden]);
  }

  destroy() {
    document.removeEventListener(visibilityChange, this.handleVisibilityChange);
  }

}

exports.default = PageVisibility;

/***/ }),

/***/ "../xgplayer-utils/src/env/isle.js":
/*!*****************************************!*\
  !*** ../xgplayer-utils/src/env/isle.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const le = function () {
  const buf = new ArrayBuffer(2);
  new DataView(buf).setInt16(0, 256, true); // little-endian write
  return new Int16Array(buf)[0] === 256; // platform-spec read, if equal then LE
}();

exports.default = le;

/***/ }),

/***/ "../xgplayer-utils/src/env/sniffer.js":
/*!********************************************!*\
  !*** ../xgplayer-utils/src/env/sniffer.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const le = function () {
  const buf = new ArrayBuffer(2);
  new DataView(buf).setInt16(0, 256, true); // little-endian write
  return new Int16Array(buf)[0] === 256; // platform-spec read, if equal then LE
}();

const sniffer = {
  get device() {
    let r = sniffer.os;
    return r.isPc ? 'pc' : r.isTablet ? 'tablet' : 'mobile';
  },
  get browser() {
    let ua = navigator.userAgent.toLowerCase();
    let reg = {
      ie: /rv:([\d.]+)\) like gecko/,
      firfox: /firefox\/([\d.]+)/,
      chrome: /chrome\/([\d.]+)/,
      opera: /opera.([\d.]+)/,
      safari: /version\/([\d.]+).*safari/
    };
    return [].concat(Object.keys(reg).filter(key => reg[key].test(ua)))[0];
  },
  get os() {
    let ua = navigator.userAgent;
    let isWindowsPhone = /(?:Windows Phone)/.test(ua);
    let isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
    let isAndroid = /(?:Android)/.test(ua);
    let isFireFox = /(?:Firefox)/.test(ua);
    let isTablet = /(?:iPad|PlayBook)/.test(ua) || isAndroid && !/(?:Mobile)/.test(ua) || isFireFox && /(?:Tablet)/.test(ua);
    let isPhone = /(?:iPhone)/.test(ua) && !isTablet;
    let isPc = !isPhone && !isAndroid && !isSymbian;
    return {
      isTablet,
      isPhone,
      isAndroid,
      isPc,
      isSymbian,
      isWindowsPhone,
      isFireFox
    };
  },

  get isLe() {
    return le;
  }
};

exports.default = sniffer;

/***/ }),

/***/ "../xgplayer-utils/src/env/utf8.js":
/*!*****************************************!*\
  !*** ../xgplayer-utils/src/env/utf8.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
class UTF8 {
  static decode(uint8array) {
    const out = [];
    const input = uint8array;
    let i = 0;
    const length = uint8array.length;

    while (i < length) {
      if (input[i] < 0x80) {
        out.push(String.fromCharCode(input[i]));
        ++i;
        continue;
      } else if (input[i] < 0xC0) {
        // fallthrough
      } else if (input[i] < 0xE0) {
        if (UTF8._checkContinuation(input, i, 1)) {
          const ucs4 = (input[i] & 0x1F) << 6 | input[i + 1] & 0x3F;
          if (ucs4 >= 0x80) {
            out.push(String.fromCharCode(ucs4 & 0xFFFF));
            i += 2;
            continue;
          }
        }
      } else if (input[i] < 0xF0) {
        if (UTF8._checkContinuation(input, i, 2)) {
          const ucs4 = (input[i] & 0xF) << 12 | (input[i + 1] & 0x3F) << 6 | input[i + 2] & 0x3F;
          if (ucs4 >= 0x800 && (ucs4 & 0xF800) !== 0xD800) {
            out.push(String.fromCharCode(ucs4 & 0xFFFF));
            i += 3;
            continue;
          }
        }
      } else if (input[i] < 0xF8) {
        if (UTF8._checkContinuation(input, i, 3)) {
          let ucs4 = (input[i] & 0x7) << 18 | (input[i + 1] & 0x3F) << 12 | (input[i + 2] & 0x3F) << 6 | input[i + 3] & 0x3F;
          if (ucs4 > 0x10000 && ucs4 < 0x110000) {
            ucs4 -= 0x10000;
            out.push(String.fromCharCode(ucs4 >>> 10 | 0xD800));
            out.push(String.fromCharCode(ucs4 & 0x3FF | 0xDC00));
            i += 4;
            continue;
          }
        }
      }
      out.push(String.fromCharCode(0xFFFD));
      ++i;
    }

    return out.join('');
  }

  static _checkContinuation(uint8array, start, checkLength) {
    let array = uint8array;
    if (start + checkLength < array.length) {
      while (checkLength--) {
        if ((array[++start] & 0xC0) !== 0x80) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }
}

exports.default = UTF8;

/***/ }),

/***/ "../xgplayer-utils/src/mobile/audio-context.js":
/*!*****************************************************!*\
  !*** ../xgplayer-utils/src/mobile/audio-context.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = __webpack_require__(/*! events */ "../../node_modules/events/events.js");

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AudioCtx extends _events2.default {
  constructor(config) {
    super();
    this.config = Object.assign({}, config);
    let AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();
    this.gainNode = this.context.createGain();
    this.gainNode.connect(this.context.destination);
    this.meta = undefined;
    this.samples = [];
    this.preloadTime = this.config.preloadTime || 3;
    this.duration = 0;

    this._currentBuffer = undefined;
    this._nextBuffer = undefined;
    this._lastpts = undefined;
    this._preDecode = [];
    this._currentTime = 0;
    this._decoding = false;
    this._volume = this.config.volume || 0.6;
    // 记录外部传输的状态
    this._played = false;
    this.playFinish = null; // pending play task
    this.waitNextID = null; // audio source end and next source not loaded
  }

  get currentTime() {
    return this._currentTime;
  }

  decodeAudio(audioTrack) {
    let { samples } = audioTrack;
    let data = samples;
    audioTrack.samples = [];
    this.setAudioData(data);
  }
  setAudioData(data) {
    for (let i = 0; i < data.length; i++) {
      data[i].pts = data[i].pts === undefined ? data[i].dts : data[i].pts;
      this._preDecode.push(data[i]);
    }
    if (this._preDecode.length > 0) {
      if (this._lastpts === undefined) {
        this._lastpts = this._preDecode[0].pts;
      }
      if ((this._preDecode[this._preDecode.length - 1].pts - this._lastpts) / 1000 > this.preloadTime) {
        this.decodeAAC();
      }
    }
  }

  decodeAAC() {
    if (this._decoding) {
      return;
    }
    this._decoding = true;
    let data = this._preDecode;
    let samples = [];
    let _this = this;
    let sample = data.shift();
    while (sample) {
      let sampleData = AudioCtx.getAACData(this.meta, sample);
      samples.push(sampleData);
      this._lastpts = sample.pts;
      sample = data.shift();
    }
    let buffer = AudioCtx.combileData(samples);
    try {
      this.context.decodeAudioData(buffer.buffer, function (buffer) {
        let audioSource = _this.context.createBufferSource();
        audioSource.buffer = buffer;
        // audioSource.onended = _this.onSourceEnded.bind(_this);
        _this.samples.push({
          time: _this.duration,
          duration: buffer.duration,
          data: audioSource
        });

        _this.duration += buffer.duration;

        if (!_this._currentBuffer) {
          _this._currentBuffer = _this.getTimeBuffer(_this.currentTime);
        }

        if (!_this._nextBuffer && _this._currentBuffer) {
          _this._nextBuffer = _this.getTimeBuffer(_this.currentTime + _this._currentBuffer.duration);
        }
        _this._decoding = false;

        if ((_this._preDecode.length > 0 && _this._preDecode[_this._preDecode.length - 1].pts - _this._lastpts) / 1000 >= _this.preloadTime) {
          _this.decodeAAC();
        }

        if (_this.playFinish) {
          _this.playFinish();
        }
      }, e => {
        console.error(e);
      });
    } catch (err) {
      console.error(err);
    }
  }

  onSourceEnded() {
    if (!this._nextBuffer || !this._played) {
      this.waitNextID = setTimeout(() => {
        this.onSourceEnded();
      }, 200);
      return;
    }
    let audioSource = this._nextBuffer.data;
    audioSource.start();
    audioSource.connect(this.gainNode);
    let _this = this;
    setTimeout(() => {
      _this.onSourceEnded.call(this);
    }, audioSource.buffer.duration * 1000 - 10);
    this._currentBuffer = this._nextBuffer;
    this._currentTime = this._currentBuffer.time;
    this._nextBuffer = this.getTimeBuffer(this.currentTime);
    if (this._currentBuffer) {
      this._nextBuffer = this.getTimeBuffer(this.currentTime + this._currentBuffer.duration);
    }
    this.emit('AUDIO_SOURCE_END');
  }

  play() {
    if (this.playFinish) {
      return;
    }
    this._played = true;
    if (this.context.state === 'suspended') {
      this.context.resume();
    }
    let _this = this;
    const playStart = () => {
      let audioSource = this._currentBuffer.data;
      audioSource.connect(this.gainNode);
      audioSource.start();
      setTimeout(() => {
        _this.onSourceEnded.call(this);
      }, audioSource.buffer.duration * 1000 - 10);
    };

    if (!this._currentBuffer) {
      return new Promise(resolve => {
        this.playFinish = resolve;
      }).then(() => {
        this.playFinish = null;
        playStart();
      });
    } else {
      playStart();
      return Promise.resolve();
    }
  }

  pause() {
    const audioCtx = this.context;
    if (audioCtx.state === 'running') {
      audioCtx.suspend();
    }
  }

  getTimeBuffer(time) {
    let ret;
    for (let i = 0; i < this.samples.length; i++) {
      let sample = this.samples[i];
      if (sample.time <= time && sample.time + sample.duration > time) {
        ret = sample;
        break;
      }
    }
    return ret;
  }

  setAudioMetaData(meta) {
    this.meta = meta;
  }

  destroy() {
    if (this.waitNextID) {
      window.clearTimeout(this.waitNextID);
    }
    this.context.close();
  }

  set muted(val) {
    if (val) {
      this.gainNode.gain.value = 0;
    } else {
      this.gainNode.gain.value = this._volume;
    }
  }

  get volume() {
    return this._volume;
  }

  set volume(val) {
    if (val < 0) {
      this._volume = 0;
      this.gainNode.gain.value = 0;
      return;
    } else if (val > 1) {
      this._volume = 1;
      this.gainNode.gain.value = 1;
      return;
    }

    this._volume = val;
    this.gainNode.gain.value = val;
  }

  static getAACData(meta, sample) {
    let buffer = new Uint8Array(sample.data.byteLength + 7);
    let adts = AudioCtx.getAdts(meta, sample.data);
    buffer.set(adts);
    buffer.set(sample.data, 7);
    return buffer;
  }

  static combileData(samples) {
    // get length
    let length = 0;
    for (let i = 0, k = samples.length; i < k; i++) {
      length += samples[i].byteLength;
    }

    let ret = new Uint8Array(length);
    let offset = 0;
    // combile data;
    for (let i = 0, k = samples.length; i < k; i++) {
      ret.set(samples[i], offset);
      offset += samples[i].byteLength;
    }
    return ret;
  }

  static getAdts(meta, data) {
    let adts = new Uint8Array(7);

    // 设置同步位 0xfff 12bit
    adts[0] = 0xff;
    adts[1] = 0xf0;

    // Object data (没什么人用MPEG-2了，HLS和FLV也全是MPEG-4，这里直接0)  1bit
    // Level always 00 2bit
    // CRC always 1 1bit
    adts[1] = adts[1] | 0x01;

    // profile 2bit
    adts[2] = 0xc0 & meta.objectType - 1 << 6;

    // sampleFrequencyIndex
    adts[2] = adts[2] | 0x3c & meta.sampleRateIndex << 2;

    // private bit 0 1bit
    // chanel configuration 3bit
    adts[2] = adts[2] | 0x01 & meta.channelCount >> 2;
    adts[3] = 0xc0 & meta.channelCount << 6;

    // original_copy: 0 1bit
    // home: 0 1bit

    // adts_variable_header()
    // copyrighted_id_bit 0 1bit
    // copyrighted_id_start 0 1bit

    // aac_frame_length 13bit;
    let aacframelength = data.byteLength + 7;

    adts[3] = adts[3] | 0x03 & aacframelength >> 11;
    adts[4] = 0xff & aacframelength >> 3;
    adts[5] = 0xe0 & aacframelength << 5;

    // adts_buffer_fullness 0x7ff 11bit
    adts[5] = adts[5] | 0x1f;
    adts[6] = 0xfc;

    // number_of_raw_data_blocks_in_frame 0 2bit;
    return adts;
  }
}

exports.default = AudioCtx;

/***/ }),

/***/ "../xgplayer-utils/src/mobile/mobile-video.js":
/*!****************************************************!*\
  !*** ../xgplayer-utils/src/mobile/mobile-video.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _videoContext = __webpack_require__(/*! ./video-context */ "../xgplayer-utils/src/mobile/video-context.js");

var _videoContext2 = _interopRequireDefault(_videoContext);

var _audioContext = __webpack_require__(/*! ./audio-context */ "../xgplayer-utils/src/mobile/audio-context.js");

var _audioContext2 = _interopRequireDefault(_audioContext);

var _ticker = __webpack_require__(/*! ./ticker */ "../xgplayer-utils/src/mobile/ticker.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 音画同步调和器
 */
class AVReconciler {
  constructor(props) {
    this.aCtx = props.aCtx;
    this.vCtx = props.vCtx;
    this.video = props.video;
    this.timeoutId = null;
    this.start = null;
  }

  doReconcile() {
    const vCurTime = this.vCtx.currentTime || 0;
    const aCurTime = (this.aCtx.currentTime || 0) * 1000;

    const gap = vCurTime - aCurTime;
    if (this.timeoutId) {
      return;
    }
    if (gap > 200) {
      // audio delayed for more than 100ms
      this.video.start += gap;
      this.vCtx.pause();
      this.timeoutId = setTimeout(() => {
        this.vCtx.play();
        this.timeoutId = null;
      }, gap);
    } else if (gap < -120) {
      this.video.start += gap;
    }
  }

  destroy() {
    this.start = null;
    this.aCtx = null;
    this.vCtx = null;
  }
}

// eslint-disable-next-line no-undef
class MobileVideo extends HTMLElement {
  constructor() {
    super();
    this._canvas = document.createElement('canvas');
    this.handleAudioSourceEnd = this.handleAudioSourceEnd.bind(this);
    this.played = false;
    this.pendingPlayTask = null;
    this._paused = true;
    this.videoMetaInited = false;
    this.audioMetaInited = false;
    this.init();
  }

  init() {
    this.vCtx = new _videoContext2.default(Object.assign({
      canvas: this._canvas
    }, { style: { width: this.width, height: this.height } }));
    this.aCtx = new _audioContext2.default({});
    this.ticker = new ((0, _ticker.getTicker)())();
    this.reconciler = new AVReconciler({
      vCtx: this.vCtx,
      aCtx: this.aCtx,
      video: this
    });
    this.vCtx.oncanplay = () => {
      if (!this.played) {
        this.appendChild(this._canvas);
      }
      this.dispatchEvent(new Event('canplay'));
    };

    this.aCtx.on('AUDIO_SOURCE_END', this.handleAudioSourceEnd);
  }

  handleAudioSourceEnd() {
    this.reconciler.doReconcile();
    this.vCtx.cleanBuffer();
  }

  _cleanBuffer() {
    this.vCtx.cleanBuffer();
  }

  destroy() {
    this.aCtx.destroy();
    this.vCtx.destroy();
    this.ticker.stop();
    this.start = null;
    this.reconciler.destroy();
    this.aCtx = null;
    this.vCtx = null;
    this.ticker = null;
  }

  onDemuxComplete(videoTrack, audioTrack) {
    this.aCtx.decodeAudio(audioTrack);
    this.vCtx.decodeVideo(videoTrack);
  }

  setAudioMeta(meta) {
    this.aCtx.setAudioMetaData(meta);
    this.audioMetaInited = true;
  }

  setVideoMeta(meta) {
    this.vCtx.setVideoMetaData(meta);
    this.videoMetaInited = true;
  }

  get width() {
    return this.getAttribute('width') || this.videoWidth;
  }

  set width(val) {
    this.style.display = 'inline-block';
    const pxVal = typeof val === 'number' ? `${val}px` : val;
    this.setAttribute('width', pxVal);
    this.style.width = pxVal;
    this._canvas.style.width = pxVal;
    this._canvas.width = val;
  }

  get height() {
    return this.getAttribute('height');
  }

  set height(val) {
    this.style.display = 'inline-block';
    const pxVal = typeof val === 'number' ? `${val}px` : val;
    this.setAttribute('height', pxVal);
    this.style.height = pxVal;
    this._canvas.style.height = pxVal;
    this._canvas.height = val;
  }

  get videoWidth() {
    if (this.vCtx && this.vCtx.videoWidth) {
      return this.vCtx.videoWidth;
    }
    return 0;
  }

  get videoHeight() {
    if (this.vCtx && this.vCtx.videoHeight) {
      return this.vCtx.videoHeight;
    }
    return 0;
  }

  get src() {
    return this.getAttribute('src');
  }

  set src(val) {
    // do nothing
  }

  get readyState() {
    return this.videoMetaInited ? this.vCtx.readyState : 0;
  }

  get seeking() {
    return this.videoMetaInited ? this.vCtx.seeking : false;
  }

  get currentTime() {
    return this.videoMetaInited ? this.vCtx.currentTime / 1000 : 0;
  }

  get duration() {
    return this.audioMetaInited ? this.aCtx.duration : 0;
  }

  get paused() {
    return this._paused;
  }

  get playbackRate() {
    if (this.hasAttribute('playbackRate')) {
      return this.getAttribute('playbackRate');
    } else {
      return 1.0;
    }
  }

  set playbackRate(val) {
    this.setAttribute('playbackrate', val);
    this.aCtx.playbackRate = val;
    this.vCtx.playbackRate = val;

    this.dispatchEvent(new Event('ratechange'));
  }

  get ended() {
    if (this.audioMetaInited) {
      return this.aCtx.ended;
    }
    return false;
  }

  get autoplay() {
    if (this.hasAttribute('autoplay')) {
      return this.getAttribute('autoplay');
    } else {
      return false;
    }
  }
  set autoplay(value) {}
  play() {
    if (this.pendingPlayTask) {
      return;
    }

    if (this.played) {
      this.destroy();
      this.init();
    }
    this.pendingPlayTask = Promise.all([this.vCtx.play(), this.aCtx.play().then(() => {
      this.aCtx.muted = true;
    })]).then(() => {
      this.aCtx.muted = false;
      this.ticker.start(() => {
        if (!this.start) {
          this.start = Date.now();
        }
        this._currentTime = Date.now() - this.start;
        this.vCtx._onTimer(this._currentTime);
      });

      this.pendingPlayTask = null;
      this.played = true;
      this.dispatchEvent(new Event('play'));
      this._paused = false;
    });
  }

  pause() {
    this._paused = true;
    this.aCtx.pause();
    this.vCtx.pause();

    this.dispatchEvent(new Event('pause'));
  }

  get volume() {
    return this.aCtx.volume;
  }

  set volume(vol) {
    this.setAttribute('volume', vol);
    this.aCtx.volume = vol;
  }

  get muted() {
    const attrMuted = this.getAttribute('muted') === 'true';
    if (attrMuted !== undefined) {
      return attrMuted;
    } else if (this.getAttribute('volume')) {
      return Number.parseInt(this.getAttribute('volume')) === 0;
    } else {
      return false;
    }
  }

  set muted(val) {
    this.setAttribute('muted', val);
    if (!val) {
      this.aCtx.muted = false;
    } else {
      this.aCtx.muted = true;
    }
  }

  get error() {
    return this.vCtx.error || this.aCtx.error;
  }

  get buffered() {
    return this.vCtx.buffered;
  }
}
// eslint-disable-next-line no-undef
customElements.define('mobile-video', MobileVideo);

/***/ }),

/***/ "../xgplayer-utils/src/mobile/sourcebuffer.js":
/*!****************************************************!*\
  !*** ../xgplayer-utils/src/mobile/sourcebuffer.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
class SourceBuffer {
  constructor(config) {
    this.config = Object.assign({}, config);
    this.type = this.config.type;
    this.buffer = [];
    this.currentGop = undefined;
    this._lastGet = undefined;
  }

  push(frame) {
    if (this.type === 'video') {
      if (frame.isKeyframe) {
        let currentGop = {
          samples: [],
          start: frame.dts,
          end: frame.dts,
          nextGop: undefined
        };
        if (this.currentGop) {
          this.currentGop.nextGop = currentGop;
        }
        this.currentGop = currentGop;
        this.buffer.push(this.currentGop);
      }

      if (this.currentGop) {
        this.currentGop.samples.push(frame);

        if (frame.dts < this.currentGop.start) {
          this.currentGop.start = frame.dts;
        }

        if (frame.dts > this.currentGop.end) {
          this.currentGop.end = frame.dts;
        }
      }
    }
  }

  get(time) {
    if (this.type === 'video') {
      if (this.buffer.length < 1) {
        return;
      }

      if (time === undefined) {
        let sample = this._getNext();
        return sample;
      }
    }
  }

  _getNext() {
    if (!this._lastGet) {
      let gop = this.buffer[0];
      if (gop.samples.length < 1) {
        return;
      }

      this._lastGet = {
        gop,
        index: 0
      };
      return gop.samples[0];
    } else {
      let gop = this._lastGet.gop;
      let sample = gop.samples[this._lastGet.index + 1];
      if (sample) {
        this._lastGet.index = this._lastGet.index + 1;
        return sample;
      } else {
        gop = gop.nextGop;
        if (!gop || gop.samples.length < 1) {
          return;
        }
        sample = gop.samples[0];
        this._lastGet = {
          gop,
          index: 0
        };
        return sample;
      }
    }
  }

  remove(start, end) {
    if (this.buffer.length < 0) {
      return;
    }

    let i = 0;
    let gop = this.buffer[0];
    while (gop) {
      if (gop.end < end && gop.start >= start) {
        this.buffer.splice(i, 1);
        gop = this.buffer[i];
      } else {
        i += 1;
        gop = this.buffer[i];
      }
    }
  }
}

exports.default = SourceBuffer;

/***/ }),

/***/ "../xgplayer-utils/src/mobile/ticker.js":
/*!**********************************************!*\
  !*** ../xgplayer-utils/src/mobile/ticker.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @author fuyuhao@bytedance.com
 */

class Ticker {
  constructor(options) {
    this.options = Object.assign({}, options || {}, {
      interval: 16
    });

    this.callbacks = [];
  }

  start(...callbacks) {
    this.callbacks = callbacks;
  }

  onTick() {
    for (let i = 0, len = this.callbacks.length; i < len; i++) {
      const callback = this.callbacks[i];
      callback();
    }
  }

  setInterval(interval) {
    this.options.interval = interval;
    return this;
  }
}

/**
 * ticker use requestAnimationFrame
 */
class RafTicker extends Ticker {
  constructor(props) {
    super(props);
    this.prev = null;
    this.timerId = null;
    this._subTimerId = null;

    this._tickFunc = RafTicker.getTickFunc();
    this.tick = this.tick.bind(this);
  }

  start(...callbacks) {
    super.start(...callbacks);
    this.tick();
  }

  tick() {
    this.nextTick();
    this.onTick();
  }

  nextTick() {
    const { _tickFunc } = this;
    this.timerId = _tickFunc(this.tick);
  }

  stop() {
    if (this.timerId) {
      const cancelFunc = RafTicker.getCancelFunc();

      cancelFunc(this.timerId);
    }
  }

  resume() {
    this.nextTick();
  }

  static getTickFunc() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame;
  }

  static getCancelFunc() {
    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame;
  }

  static isSupported() {
    return RafTicker.getTickFunc() !== undefined;
  }
}

/**
 * use setTimeout for browsers without raf support
 */
class TimeoutTicker extends Ticker {
  constructor(config) {
    super(config);
    this.timeoutId = null;
  }

  start(...callbacks) {
    super.nextTick(...callbacks);
    this.timeoutId = window.setInterval(() => {
      this.onTick();
    }, this.options.interval || 16);
  }

  stop() {
    if (this.timeoutId) {
      window.clearInterval(this.timeoutId);
    }
  }

}

/**
 * 返回Ticker构造函数
 * @returns {Ticker}
 */
const getTicker = exports.getTicker = () => {
  if (RafTicker.isSupported()) {
    return RafTicker;
  } else {
    return TimeoutTicker;
  }
};

/***/ }),

/***/ "../xgplayer-utils/src/mobile/video-context.js":
/*!*****************************************************!*\
  !*** ../xgplayer-utils/src/mobile/video-context.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webworkifyWebpack = __webpack_require__(/*! webworkify-webpack */ "../xgplayer-utils/node_modules/webworkify-webpack/index.js");

var _webworkifyWebpack2 = _interopRequireDefault(_webworkifyWebpack);

var _stream = __webpack_require__(/*! ../write/stream */ "../xgplayer-utils/src/write/stream.js");

var _stream2 = _interopRequireDefault(_stream);

var _nalunit = __webpack_require__(/*! ../../../xgplayer-codec/src/h264/nalunit */ "../xgplayer-codec/src/h264/nalunit/index.js");

var _nalunit2 = _interopRequireDefault(_nalunit);

var _yuvCanvas = __webpack_require__(/*! ./yuv-canvas */ "../xgplayer-utils/src/mobile/yuv-canvas.js");

var _yuvCanvas2 = _interopRequireDefault(_yuvCanvas);

var _sourcebuffer = __webpack_require__(/*! ./sourcebuffer */ "../xgplayer-utils/src/mobile/sourcebuffer.js");

var _sourcebuffer2 = _interopRequireDefault(_sourcebuffer);

var _TimeRanges = __webpack_require__(/*! ../models/TimeRanges */ "../xgplayer-utils/src/models/TimeRanges.js");

var _TimeRanges2 = _interopRequireDefault(_TimeRanges);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VideoCanvas {
  constructor(config) {
    this.config = Object.assign({}, config);
    this.canvas = this.config.canvas ? this.config.canvas : document.createElement('canvas');
    this.source = new _sourcebuffer2.default({ type: 'video' });
    this.preloadTime = this.config.preloadTime || 3;
    this.oncanplay = undefined;
    this.onFirstFrame = undefined;
    this.meta = undefined;
    this.readyStatus = 0;
    this.paused = true;
    this.count = 0;
    this.currentTime = 0;
    this.lastPlayed = 0;

    this._decoderInited = false;
    this._avccpushed = false;
    this._decodedFrames = {};
    this._lastSampleDts = undefined;
    this._baseDts = undefined;
    this._lastRenderTime = null;
    this.playFinish = null;
  }

  pause() {
    this.paused = true;
  }

  initWasmWorker() {
    let _this = this;
    this.wasmworker = (0, _webworkifyWebpack2.default)(/*require.resolve*/(/*! ./worker.js */ "../xgplayer-utils/src/mobile/worker.js"));
    this.wasmworker.postMessage({
      msg: 'init',
      meta: this.meta
    });
    this.wasmworker.addEventListener('message', msg => {
      switch (msg.data.msg) {
        case 'DECODER_READY':
          _this._decoderInited = true;
          break;
        case 'DECODED':
          this._onDecoded(msg.data);
          break;
      }
    });
  }

  setVideoMetaData(meta) {
    this.meta = meta;
    if (!this._decoderInited) {
      this.initWasmWorker();
      return;
    }
    this._avccpushed = true;
    let data = new Uint8Array(meta.sps.byteLength + 4);
    data.set([0, 0, 0, 1]);
    data.set(meta.sps, 4);
    this.wasmworker.postMessage({
      msg: 'decode',
      data: data
    });

    data = new Uint8Array(meta.pps.byteLength + 4);
    data.set([0, 0, 0, 1]);
    data.set(meta.pps, 4);
    this.wasmworker.postMessage({
      msg: 'decode',
      data: data
    });

    if (!this.yuvCanvas) {
      let config = Object.assign({ meta, canvas: this.canvas }, this.config);
      this.yuvCanvas = new _yuvCanvas2.default(config);
    }
    this.readyStatus = 1;
  }

  decodeVideo(videoTrack) {
    if (!this._decoderInited) {
      return;
    }

    if (!this._avccpushed) {
      this.setVideoMetaData(this.meta);
    }
    let { samples } = videoTrack;
    let sample = samples.shift();

    while (sample) {
      if (!this._baseDts) {
        this._baseDts = sample.dts;
      }
      this.source.push(sample);
      sample = samples.shift();
    }

    this._preload();
  }

  _preload() {
    if (!this._lastSampleDts || this._lastSampleDts - this._baseDts < this.currentTime + this.preloadTime * 1000) {
      let sample = this.source.get();
      if (sample) {
        this._lastSampleDts = sample.dts;
        this._analyseNal(sample);
      }

      while (sample && this._lastSampleDts - this._baseDts < this.currentTime + this.preloadTime * 1000) {
        sample = this.source.get();
        if (sample) {
          this._analyseNal(sample);
          this._lastSampleDts = sample.dts;
        }
      }
    }
  }

  _analyseNal(sample) {
    let nals = _nalunit2.default.getAvccNals(new _stream2.default(sample.data.buffer));

    let length = 0;
    for (let i = 0; i < nals.length; i++) {
      let nal = nals[i];
      length += nal.body.byteLength + 4;
    }
    let offset = 0;
    let data = new Uint8Array(length);
    for (let i = 0; i < nals.length; i++) {
      let nal = nals[i];
      data.set([0, 0, 0, 1], offset);
      offset += 4;
      data.set(new Uint8Array(nal.body), offset);
      offset += nal.body.byteLength;
    }
    this.wasmworker.postMessage({
      msg: 'decode',
      data: data,
      info: {
        dts: sample.dts,
        pts: sample.pts ? sample.pts : sample.dts + sample.cts,
        key: sample.isKeyframe
      }
    });
  }

  _onDecoded(data) {
    let { dts } = data.info;
    this._decodedFrames[dts] = data;
    if (Object.keys(this._decodedFrames).length > 10) {
      if (this.playFinish) {
        this.playFinish();
      }
      if (this.oncanplay) {
        this.oncanplay();
      }
    }
  }

  play() {
    this.paused = false;
    return new Promise(resolve => {
      this.playFinish = resolve;
    }).then(() => {
      this.playFinish = null;
    });
  }

  _onTimer(currentTime) {
    if (this.paused) {
      return;
    }
    if (this.meta) {
      if (this.meta.frameRate && this.meta.frameRate.fixed && this.meta.frameRate.fps) {}
      let frameTimes = Object.keys(this._decodedFrames);
      if (frameTimes.length > 0) {
        this.currentTime = currentTime;
        let frameTime = -1;
        for (let i = 0; i < frameTimes.length && Number.parseInt(frameTimes[i]) - this._baseDts <= this.currentTime; i++) {
          frameTime = Number.parseInt(frameTimes[i - 1]);
        }

        let frame = this._decodedFrames[frameTime];
        if (frame) {
          this.yuvCanvas.render(frame.buffer, frame.width, frame.height, frame.yLinesize, frame.uvLinesize);
        }
        for (let i = 0; i < frameTimes.length; i++) {
          if (Number.parseInt(frameTimes[i]) < frameTime) {
            delete this._decodedFrames[frameTimes[i]];
          }
        }
      }
    }
    this._lastRenderTime = Date.now();
  }

  cleanBuffer() {
    if (this.currentTime > 1) {
      this.source.remove(0, this.currentTime - 1);
    }
  }

  destroy() {
    this.wasmworker.postMessage({ msg: 'destroy' });
    this.wasmworker = null;
    this.canvas = null;
    this.source = null;
    this._decoderInited = false;
  }

  get buffered() {
    const ranges = [];
    let currentRange = {
      start: null,
      end: null
    };
    for (let i = 0; i < this.source.buffer.length; i++) {
      const { start, end } = this.source.buffer[i];
      if (!currentRange.start) {
        currentRange.start = start;
      }
      if (!currentRange.end) {
        currentRange.end = end;
      }

      if (start - currentRange.end > 1000) {
        currentRange.start = currentRange.start / 1000;
        currentRange.end = currentRange.end / 1000;
        currentRange = {
          start,
          end
        };
      } else {
        currentRange.end = end;
      }
    }

    if (currentRange.start !== null && currentRange.end !== null) {
      currentRange.start = currentRange.start / 1000;
      currentRange.end = currentRange.end / 1000;
      ranges.push(currentRange);
    }

    return new _TimeRanges2.default(ranges);
  }

}
exports.default = VideoCanvas;

/***/ }),

/***/ "../xgplayer-utils/src/mobile/worker.js":
/*!**********************************************!*\
  !*** ../xgplayer-utils/src/mobile/worker.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const MAX_STREAM_BUFFER_LENGTH = 1024 * 1024;
var Decoder = function (self) {
  this.inited = false;
  this.self = self;
  this.meta = this.self.meta;
  this.infolist = {};
  self.par_broadwayOnBroadwayInited = this.broadwayOnBroadwayInited.bind(this);
  self.par_broadwayOnPictureDecoded = this.broadwayOnPictureDecoded.bind(this);
};

Decoder.prototype.toU8Array = function (ptr, length) {
  return this.self.HEAPU8.subarray(ptr, ptr + length);
};

Decoder.prototype.init = function () {
  Module._broadwayInit();
  this.streamBuffer = this.toU8Array(Module._broadwayCreateStream(MAX_STREAM_BUFFER_LENGTH), MAX_STREAM_BUFFER_LENGTH);
};

Decoder.prototype.broadwayOnPictureDecoded = function (offset, width, height, yLinesize, uvLinesize, infoid) {
  let info = Object.assign({}, this.infolist[infoid]);
  let yRowcount = height;
  let uvRowcount = height / 2;
  if (this.meta.chromaFormat === 444 || this.meta.chromaFormat === 422) {
    uvRowcount = height;
  }
  let data = this.toU8Array(offset, yLinesize * yRowcount + 2 * (uvLinesize * uvRowcount));
  this.infolist[infoid] = null;
  let datetemp = new Uint8Array(data.length);
  datetemp.set(data);
  let buffer = datetemp.buffer;
  this.self.postMessage({
    msg: 'DECODED',
    width,
    height,
    yLinesize,
    uvLinesize,
    info,
    buffer
  }, [buffer]);
};

Decoder.prototype.broadwayOnBroadwayInited = function () {
  this.inited = true;
  this.self.postMessage({ msg: 'DECODER_READY' });
};

Decoder.prototype.decode = function (data, info) {
  let time = parseInt(new Date().getTime());
  let infoid = time - Math.floor(time / 10e8) * 10e8;
  this.infolist[infoid] = info;
  this.streamBuffer.set(data);
  Module._broadwayPlayStream(data.length, infoid);
};

Decoder.prototype.destroy = function () {
  Module._broadwayExit();
};

var decoder;

function onPostRun() {
  decoder = new Decoder(this);
  decoder.init();
}

function init(meta) {
  self.importScripts('https://sf1-vcloudcdn.pstatp.com/obj/ttfe/media/decoder/h264/decoder.js');
  addOnPostRun(onPostRun.bind(self));
}

module.exports = function (self) {
  self.addEventListener('message', function (e) {
    var data = e.data;
    if (!data.msg) {
      self.postMessage({
        msg: 'ERROR:invalid message'
      });
    } else {
      switch (data.msg) {
        case 'init':
          console.log(data);
          self.meta = data.meta;
          init();
          break;
        case 'decode':
          decoder.decode(data.data, data.info);
          break;
        case 'destory':
          decoder.destroy();
          break;
        default:
          break;
      }
    }
  }, false);
};

/***/ }),

/***/ "../xgplayer-utils/src/mobile/yuv-canvas.js":
/*!**************************************************!*\
  !*** ../xgplayer-utils/src/mobile/yuv-canvas.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
class YUVCanvas {
  constructor(configs) {
    this.configs = Object.assign({}, configs);
    this.canvas = this.configs.canvas;
    this.meta = Object.assign({}, this.configs.meta);
    this.chroma = this.meta.chromaFormat;
    this.height = this.meta.presentHeight;
    this.width = this.meta.presentWidth;
    // this.canvas.width = this.meta.presentWidth;
    // this.canvas.height = this.meta.presentHeight;
    // this.canvas.style.width = configs.style.width;
    // this.canvas.style.height = configs.style.height;
    this._initContextGL();
    if (this.contextGL) {
      this._initProgram();
      this._initBuffers();
      this._initTextures();
    };
  }

  _initContextGL() {
    var canvas = this.canvas;
    var gl = null;

    var validContextNames = ['webgl', 'experimental-webgl', 'moz-webgl', 'webkit-3d'];
    var nameIndex = 0;

    while (!gl && nameIndex < validContextNames.length) {
      var contextName = validContextNames[nameIndex];

      try {
        if (this.contextOptions) {
          gl = canvas.getContext(contextName, this.contextOptions);
        } else {
          gl = canvas.getContext(contextName);
        };
      } catch (e) {
        gl = null;
      }

      if (!gl || typeof gl.getParameter !== 'function') {
        gl = null;
      }

      ++nameIndex;
    };

    this.contextGL = gl;
  }

  _initProgram() {
    var gl = this.contextGL;

    // vertex shader is the same for all types
    var vertexShaderScript;
    var fragmentShaderScript;
    vertexShaderScript = ['attribute vec4 vertexPos;', 'attribute vec4 texturePos;', 'attribute vec4 uTexturePos;', 'attribute vec4 vTexturePos;', 'varying vec2 textureCoord;', 'varying vec2 uTextureCoord;', 'varying vec2 vTextureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos.xy;', '  uTextureCoord = uTexturePos.xy;', '  vTextureCoord = vTexturePos.xy;', '}'].join('\n');

    fragmentShaderScript = ['precision highp float;', 'varying highp vec2 textureCoord;', 'varying highp vec2 uTextureCoord;', 'varying highp vec2 vTextureCoord;', 'uniform sampler2D ySampler;', 'uniform sampler2D uSampler;', 'uniform sampler2D vSampler;', 'uniform mat4 YUV2RGB;', 'void main(void) {', '  highp float y = texture2D(ySampler,  textureCoord).r;', '  highp float u = texture2D(uSampler,  uTextureCoord).r;', '  highp float v = texture2D(vSampler,  vTextureCoord).r;', '  gl_FragColor = vec4(y, u, v, 1) * YUV2RGB;', '}'].join('\n');

    var YUV2RGB = [1.16438, 0.00000, 1.59603, -0.87079, 1.16438, -0.39176, -0.81297, 0.52959, 1.16438, 2.01723, 0.00000, -1.08139, 0, 0, 0, 1];
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderScript);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.log('Vertex shader failed to compile: ' + gl.getShaderInfoLog(vertexShader));
    }

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderScript);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.log('Fragment shader failed to compile: ' + gl.getShaderInfoLog(fragmentShader));
    }

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.log('Program failed to compile: ' + gl.getProgramInfoLog(program));
    }

    gl.useProgram(program);

    var YUV2RGBRef = gl.getUniformLocation(program, 'YUV2RGB');
    gl.uniformMatrix4fv(YUV2RGBRef, false, YUV2RGB);

    this.shaderProgram = program;
  }

  _initBuffers() {
    var gl = this.contextGL;
    var program = this.shaderProgram;

    var vertexPosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]), gl.STATIC_DRAW);

    var vertexPosRef = gl.getAttribLocation(program, 'vertexPos');
    gl.enableVertexAttribArray(vertexPosRef);
    gl.vertexAttribPointer(vertexPosRef, 2, gl.FLOAT, false, 0, 0);

    var texturePosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texturePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]), gl.STATIC_DRAW);

    var texturePosRef = gl.getAttribLocation(program, 'texturePos');
    gl.enableVertexAttribArray(texturePosRef);
    gl.vertexAttribPointer(texturePosRef, 2, gl.FLOAT, false, 0, 0);

    this.texturePosBuffer = texturePosBuffer;

    var uTexturePosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uTexturePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]), gl.STATIC_DRAW);

    var uTexturePosRef = gl.getAttribLocation(program, 'uTexturePos');
    gl.enableVertexAttribArray(uTexturePosRef);
    gl.vertexAttribPointer(uTexturePosRef, 2, gl.FLOAT, false, 0, 0);

    this.uTexturePosBuffer = uTexturePosBuffer;

    var vTexturePosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vTexturePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]), gl.STATIC_DRAW);

    var vTexturePosRef = gl.getAttribLocation(program, 'vTexturePos');
    gl.enableVertexAttribArray(vTexturePosRef);
    gl.vertexAttribPointer(vTexturePosRef, 2, gl.FLOAT, false, 0, 0);

    this.vTexturePosBuffer = vTexturePosBuffer;
  }

  _initTextures() {
    var gl = this.contextGL;
    var program = this.shaderProgram;
    var yTextureRef = this._initTexture();
    var ySamplerRef = gl.getUniformLocation(program, 'ySampler');
    gl.uniform1i(ySamplerRef, 0);
    this.yTextureRef = yTextureRef;

    var uTextureRef = this._initTexture();
    var uSamplerRef = gl.getUniformLocation(program, 'uSampler');
    gl.uniform1i(uSamplerRef, 1);
    this.uTextureRef = uTextureRef;

    var vTextureRef = this._initTexture();
    var vSamplerRef = gl.getUniformLocation(program, 'vSampler');
    gl.uniform1i(vSamplerRef, 2);
    this.vTextureRef = vTextureRef;
  }

  _initTexture() {
    var gl = this.contextGL;

    var textureRef = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, textureRef);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindTexture(gl.TEXTURE_2D, null);

    return textureRef;
  }

  _drawPictureGL(data, width, height, yLinesize, uvLinesize) {
    var ylen = yLinesize * height;
    var uvlen = uvLinesize * height / 2;
    if (this.chroma === 444 || this.chroma === 422) {
      uvlen *= 2;
    }
    data = new Uint8Array(data);
    let renderData = {
      yData: data.subarray(0, ylen),
      uData: data.subarray(ylen, ylen + uvlen),
      vData: data.subarray(ylen + uvlen, ylen + uvlen + uvlen)
    };
    this._drawPictureGL420(renderData, width, height, yLinesize, uvLinesize);
  }

  _drawPictureGL420(data, width, height, yLinesize, uvLinesize) {
    var gl = this.contextGL;
    var texturePosBuffer = this.texturePosBuffer;
    var uTexturePosBuffer = this.uTexturePosBuffer;
    var vTexturePosBuffer = this.vTexturePosBuffer;

    var yTextureRef = this.yTextureRef;
    var uTextureRef = this.uTextureRef;
    var vTextureRef = this.vTextureRef;

    var yData = data.yData;
    var uData = data.uData;
    var vData = data.vData;

    var yDataPerRow = yLinesize;
    var yRowCnt = height;

    var uDataPerRow = width / 2;
    var uRowCnt = height / 2;

    if (this.chroma === 422 || this.chroma === 444) {
      uRowCnt = height;
    }

    var vDataPerRow = uvLinesize;
    var vRowCnt = uRowCnt;

    let ratiow = this.canvas.width / this.width;
    let ratioh = this.canvas.height / this.height;
    let left = 0;
    let top = 0;
    let w = this.canvas.width;
    let h = this.canvas.height;
    if (ratiow < ratioh) {
      h = this.height * this.canvas.width / this.width;
      top = parseInt((this.canvas.height - this.height * this.canvas.width / this.width) / 2);
    } else {
      w = this.width * this.canvas.height / this.height;
      left = parseInt((this.canvas.width - this.width * this.canvas.height / this.height) / 2);
    }
    gl.viewport(left, top, w, h);

    var texturePosValues = new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]);
    gl.bindBuffer(gl.ARRAY_BUFFER, texturePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texturePosValues, gl.DYNAMIC_DRAW);

    var uTexturePosValues = new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]);
    gl.bindBuffer(gl.ARRAY_BUFFER, uTexturePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, uTexturePosValues, gl.DYNAMIC_DRAW);

    var vTexturePosValues = new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]);
    gl.bindBuffer(gl.ARRAY_BUFFER, vTexturePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vTexturePosValues, gl.DYNAMIC_DRAW);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, yTextureRef);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, yDataPerRow, yRowCnt, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, yData);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, uTextureRef);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, uDataPerRow, uRowCnt, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, uData);

    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, vTextureRef);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, vDataPerRow, vRowCnt, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, vData);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  _drawPictureRGB(data) {}

  render(data, width, height, yLinesize, uvLinesize) {
    var gl = this.contextGL;
    if (gl) {
      this._drawPictureGL(data, width, height, yLinesize, uvLinesize);
    } else {
      this._drawPictureRGB(data);
    }
  }
}

exports.default = YUVCanvas;

/***/ }),

/***/ "../xgplayer-utils/src/models/TimeRanges.js":
/*!**************************************************!*\
  !*** ../xgplayer-utils/src/models/TimeRanges.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
class TimeRanges {
  constructor(ranges) {
    this.ranges = ranges || [];
  }

  start(idx) {
    return this.ranges[idx] ? this.ranges[idx].start : 0;
  }

  end(idx) {
    return this.ranges[idx] ? this.ranges[idx].end : 0;
  }

  add(range) {
    this.ranges.push(range);
  }

  get length() {
    return this.ranges.length;
  }
}
exports.default = TimeRanges;

/***/ }),

/***/ "../xgplayer-utils/src/models/media-info.js":
/*!**************************************************!*\
  !*** ../xgplayer-utils/src/models/media-info.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const isObjectFilled = obj => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === null) {
        return false;
      }
    }
  }
  return true;
};

class MediaInfo {
  constructor() {
    this.mimeType = null;
    this.duration = null;

    this.hasVideo = null;
    this.video = {
      codec: null,
      width: null,
      height: null,
      profile: null,
      level: null,
      frameRate: {
        fixed: true,
        fps: 25,
        fps_num: 25000,
        fps_den: 1000
      },
      chromaFormat: null,
      parRatio: {
        width: 1,
        height: 1
      }
    };

    this.hasAudio = null;

    this.audio = {
      codec: null,
      sampleRate: null,
      sampleRateIndex: null,
      channelCount: null
    };
  }

  isComplete() {
    return MediaInfo.isBaseInfoReady(this) && MediaInfo.isVideoReady(this) && MediaInfo.isAudioReady(this);
  }

  static isBaseInfoReady(mediaInfo) {
    return isObjectFilled(mediaInfo);
  }

  static isVideoReady(mediaInfo) {
    if (!mediaInfo.hasVideo) {
      return true;
    }

    return isObjectFilled(mediaInfo.video);
  }

  static isAudioReady(mediaInfo) {
    if (!mediaInfo.hasAudio) {
      return true;
    }

    return isObjectFilled(mediaInfo.video);
  }
}
exports.default = MediaInfo;

/***/ }),

/***/ "../xgplayer-utils/src/models/media-sample.js":
/*!****************************************************!*\
  !*** ../xgplayer-utils/src/models/media-sample.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
class MediaSample {
  constructor(info) {
    let _default = MediaSample.getDefaultInf();

    if (!info || Object.prototype.toString.call(info) !== '[object Object]') {
      return _default;
    }
    let sample = Object.assign({}, _default, info);

    Object.entries(sample).forEach(([k, v]) => {
      this[k] = v;
    });
  }

  static getDefaultInf() {
    return {
      dts: null,
      pts: null,
      duration: null,
      position: null,
      isRAP: false, // is Random access point
      originDts: null
    };
  }
}
exports.default = MediaSample;

/***/ }),

/***/ "../xgplayer-utils/src/models/media-segment-list.js":
/*!**********************************************************!*\
  !*** ../xgplayer-utils/src/models/media-segment-list.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
class MediaSegmentList {

    constructor(type) {
        this._type = type;
        this._list = [];
        this._lastAppendLocation = -1; // cached last insert location
    }

    get type() {
        return this._type;
    }

    get length() {
        return this._list.length;
    }

    isEmpty() {
        return this._list.length === 0;
    }

    clear() {
        this._list = [];
        this._lastAppendLocation = -1;
    }

    _searchNearestSegmentBefore(beginDts) {
        let list = this._list;
        if (list.length === 0) {
            return -2;
        }
        let last = list.length - 1;
        let mid = 0;
        let lbound = 0;
        let ubound = last;

        let idx = 0;

        if (beginDts < list[0].originDts) {
            idx = -1;
            return idx;
        }

        while (lbound <= ubound) {
            mid = lbound + Math.floor((ubound - lbound) / 2);
            if (mid === last || beginDts > list[mid].lastSample.originDts && beginDts < list[mid + 1].originDts) {
                idx = mid;
                break;
            } else if (list[mid].originDts < beginDts) {
                lbound = mid + 1;
            } else {
                ubound = mid - 1;
            }
        }
        return idx;
    }

    _searchNearestSegmentAfter(beginDts) {
        return this._searchNearestSegmentBefore(beginDts) + 1;
    }

    append(segment) {
        let list = this._list;
        let lastAppendIdx = this._lastAppendLocation;
        let insertIdx = 0;

        if (lastAppendIdx !== -1 && lastAppendIdx < list.length && segment.originStartDts >= list[lastAppendIdx].lastSample.originDts && (lastAppendIdx === list.length - 1 || lastAppendIdx < list.length - 1 && segment.originStartDts < list[lastAppendIdx + 1].originStartDts)) {
            insertIdx = lastAppendIdx + 1; // use cached location idx
        } else {
            if (list.length > 0) {
                insertIdx = this._searchNearestSegmentBefore(segment.originStartDts) + 1;
            }
        }

        this._lastAppendLocation = insertIdx;
        this._list.splice(insertIdx, 0, segment);
    }

    getLastSegmentBefore(beginDts) {
        let idx = this._searchNearestSegmentBefore(beginDts);
        if (idx >= 0) {
            return this._list[idx];
        } else {
            // -1
            return null;
        }
    }

    getLastSampleBefore(beginDts) {
        let segment = this.getLastSegmentBefore(beginDts);
        if (segment !== null) {
            return segment.lastSample;
        } else {
            return null;
        }
    }

    getLastRAPBefore(beginDts) {
        let segmentIdx = this._searchNearestSegmentBefore(beginDts);
        let randomAccessPoints = this._list[segmentIdx].randomAccessPoints;
        while (randomAccessPoints.length === 0 && segmentIdx > 0) {
            segmentIdx--;
            randomAccessPoints = this._list[segmentIdx].randomAccessPoints;
        }
        if (randomAccessPoints.length > 0) {
            return randomAccessPoints[randomAccessPoints.length - 1];
        } else {
            return null;
        }
    }

}
exports.default = MediaSegmentList;

/***/ }),

/***/ "../xgplayer-utils/src/models/media-segment.js":
/*!*****************************************************!*\
  !*** ../xgplayer-utils/src/models/media-segment.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
class MediaSegment {
    constructor() {
        this.startDts = -1;
        this.endDts = -1;
        this.startPts = -1;
        this.endPts = -1;
        this.originStartDts = -1;
        this.originEndDts = -1;
        this.randomAccessPoints = [];
        this.firstSample = null;
        this.lastSample = null;
    }

    addRAP(sample) {
        sample.isRAP = true;
        this.randomAccessPoints.push(sample);
    }
}
exports.default = MediaSegment;

/***/ }),

/***/ "../xgplayer-utils/src/models/track-meta.js":
/*!**************************************************!*\
  !*** ../xgplayer-utils/src/models/track-meta.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
class AudioTrackMeta {
  constructor(meta) {
    const _default = {
      sampleRate: 48000,
      channelCount: 2,
      codec: 'mp4a.40.2',
      config: [41, 401, 136, 0],
      duration: 0,
      id: 2,
      refSampleDuration: 21,
      sampleRateIndex: 3,
      timescale: 1000,
      type: 'audio'
    };
    if (meta) {
      return Object.assign({}, _default, meta);
    }
    return _default;
  }

  destroy() {
    this.init = null;
  }
}

exports.AudioTrackMeta = AudioTrackMeta;
class VideoTrackMeta {
  constructor(meta) {
    const _default = {
      avcc: null,
      sps: new Uint8Array(0),
      pps: new Uint8Array(0),
      chromaFormat: 420,
      codec: 'avc1.640020',
      codecHeight: 720,
      codecWidth: 1280,
      duration: 0,
      frameRate: {
        fixed: true,
        fps: 25,
        fps_num: 25000,
        fps_den: 1000
      },
      id: 1,
      level: '3.2',
      presentHeight: 720,
      presentWidth: 1280,
      profile: 'High',
      refSampleDuration: 40,
      parRatio: {
        height: 1,
        width: 1
      },
      timescale: 1000,
      type: 'video'
    };

    if (meta) {
      return Object.assign({}, _default, meta);
    }
    return _default;
  }

  destroy() {
    this.init = null;
    this.sps = null;
    this.pps = null;
  }
}
exports.VideoTrackMeta = VideoTrackMeta;

/***/ }),

/***/ "../xgplayer-utils/src/models/track-sample.js":
/*!****************************************************!*\
  !*** ../xgplayer-utils/src/models/track-sample.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
class AudioTrackSample {
  constructor(info) {
    let _default = AudioTrackSample.getDefault();
    if (!info) {
      return _default;
    }
    let sample = Object.assign({}, _default, info);

    return sample;
  }

  static getDefault() {
    return {
      dts: null,
      pts: null,
      data: new Uint8Array()
    };
  }
}

exports.AudioTrackSample = AudioTrackSample;
class VideoTrackSample {
  constructor(info) {
    let _default = VideoTrackSample.getDefault();

    if (!info) {
      return _default;
    }
    let sample = Object.assign({}, _default, info);

    return sample;
  }

  static getDefault() {
    return {
      dts: null,
      pts: null,
      isKeyframe: false, // is Random access point
      originDts: null,
      data: new Uint8Array()
    };
  }
}
exports.VideoTrackSample = VideoTrackSample;

/***/ }),

/***/ "../xgplayer-utils/src/mse/index.js":
/*!******************************************!*\
  !*** ../xgplayer-utils/src/mse/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
class MSE {
  constructor(configs) {
    this.configs = Object.assign({}, configs);
    this.container = this.configs.container;
    this.mediaSource = null;
    this.sourceBuffers = {};
    this.preloadTime = this.configs.preloadTime || 1;
    this.onSourceOpen = this.onSourceOpen.bind(this);
    this.onTimeUpdate = this.onTimeUpdate.bind(this);
    this.onUpdateEnd = this.onUpdateEnd.bind(this);
    this.onWaiting = this.onWaiting.bind(this);
  }

  init() {
    // eslint-disable-next-line no-undef
    this.mediaSource = new self.MediaSource();
    this.mediaSource.addEventListener('sourceopen', this.onSourceOpen);
    this.container.src = URL.createObjectURL(this.mediaSource);
    this.url = this.container.src;
    this.container.addEventListener('timeupdate', this.onTimeUpdate);
    this.container.addEventListener('waiting', this.onWaiting);
  }

  onTimeUpdate() {
    this.emit('TIME_UPDATE', this.container);
  }

  onWaiting() {
    this.emit('WAITING', this.container);
  }

  onSourceOpen() {
    this.addSourceBuffers();
  }

  onUpdateEnd() {
    this.emit('SOURCE_UPDATE_END');
    this.doAppend();
  }
  addSourceBuffers() {
    if (this.mediaSource.readyState !== 'open') {
      return;
    }
    let sources = this._context.getInstance('PRE_SOURCE_BUFFER');
    let tracks = this._context.getInstance('TRACKS');
    let track;

    sources = sources.sources;
    let add = false;
    for (let i = 0, k = Object.keys(sources).length; i < k; i++) {
      let type = Object.keys(sources)[i];
      if (type === 'audio') {
        track = tracks.audioTrack;
      } else if (type === 'video') {
        track = tracks.videoTrack;
        // return;
      }
      if (track) {
        let dur = type === 'audio' ? 21 : 40;
        if (track.meta && track.meta.refSampleDuration) dur = track.meta.refSampleDuration;
        if (sources[type].data.length >= this.preloadTime / dur) {
          add = true;
        }
      }
    }

    if (add) {
      if (Object.keys(this.sourceBuffers).length > 0) {
        return;
      }
      for (let i = 0, k = Object.keys(sources).length; i < k; i++) {
        let type = Object.keys(sources)[i];
        let source = sources[type];
        let mime = type === 'video' ? 'video/mp4;codecs=' + source.mimetype : 'audio/mp4;codecs=' + source.mimetype;
        let sourceBuffer = this.mediaSource.addSourceBuffer(mime);
        this.sourceBuffers[type] = sourceBuffer;
        sourceBuffer.addEventListener('updateend', this.onUpdateEnd);
        this.doAppend();
      }
    }
  }

  doAppend() {
    let sources = this._context.getInstance('PRE_SOURCE_BUFFER');
    if (sources) {
      for (let i = 0; i < Object.keys(this.sourceBuffers).length; i++) {
        let type = Object.keys(this.sourceBuffers)[i];
        let sourceBuffer = this.sourceBuffers[type];
        if (!sourceBuffer.updating) {
          let source = sources.sources[type];
          if (source && !source.inited) {
            // console.log('append initial segment')
            sourceBuffer.appendBuffer(source.init.buffer.buffer);
            source.inited = true;
          } else if (source) {
            let data = source.data.shift();
            if (data) {
              sourceBuffer.appendBuffer(data.buffer.buffer);
            }
          }
        }
      }
    }
  }

  endOfStream() {
    const { readyState, activeSourceBuffers } = this.mediaSource;
    if (readyState === 'open' && activeSourceBuffers.length === 0) {
      try {
        this.mediaSource.endOfStream();
      } catch (e) {
        // log
      }
    }
  }

  remove(end, start = 0) {
    for (let i = 0; i < Object.keys(this.sourceBuffers).length; i++) {
      let buffer = this.sourceBuffers[Object.keys(this.sourceBuffers)[i]];
      if (!buffer.updating) {
        // console.log(start, end)
        buffer.remove(start, end);
      }
    }
  }
  removeBuffers() {
    const taskList = [];
    for (let i = 0; i < Object.keys(this.sourceBuffers).length; i++) {
      let buffer = this.sourceBuffers[Object.keys(this.sourceBuffers)[i]];
      buffer.removeEventListener('updateend', this.onUpdateEnd);

      let task;
      if (buffer.updating) {
        task = new Promise(resolve => {
          const doCleanBuffer = function () {
            let retryTime = 3;

            const clean = () => {
              if (!buffer.updating) {
                MSE.clearBuffer(buffer);
                resolve();
              } else if (retryTime > 0) {
                setTimeout(clean, 200);
                retryTime--;
              } else {
                resolve();
              }
            };

            setTimeout(clean, 200);
            buffer.removeEventListener('updateend', doCleanBuffer);
          };
          buffer.addEventListener('updateend', doCleanBuffer);
        });
      } else {
        MSE.clearBuffer(buffer);
        task = Promise.resolve();
      }

      taskList.push(task);
    }

    return Promise.all(taskList);
  }

  destroy() {
    return this.removeBuffers().then(() => {
      for (let i = 0; i < Object.keys(this.sourceBuffers).length; i++) {
        let buffer = this.sourceBuffers[Object.keys(this.sourceBuffers)[i]];
        this.mediaSource.removeSourceBuffer(buffer);
        delete this.sourceBuffers[Object.keys(this.sourceBuffers)[i]];
      }

      this.container.removeEventListener('timeupdate', this.onTimeUpdate);
      this.container.removeEventListener('waiting', this.onWaiting);
      this.mediaSource.removeEventListener('sourceopen', this.onSourceOpen);

      this.endOfStream();
      window.URL.revokeObjectURL(this.url);

      this.url = null;
      this.configs = {};
      this.container = null;
      this.mediaSource = null;
      this.sourceBuffers = {};
      this.preloadTime = 1;
    });
  }

  static clearBuffer(buffer) {
    const buffered = buffer.buffered;
    let bEnd = 0.1;
    for (let i = 0, len = buffered.length; i < len; i++) {
      bEnd = buffered.end(i);
    }
    try {
      buffer.remove(0, bEnd);
    } catch (e) {
      // DO NOTHING
    }
  }
}
exports.default = MSE;

/***/ }),

/***/ "../xgplayer-utils/src/write/buffer.js":
/*!*********************************************!*\
  !*** ../xgplayer-utils/src/write/buffer.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _concatTypedArray = __webpack_require__(/*! concat-typed-array */ "../xgplayer-utils/node_modules/concat-typed-array/lib/index.js");

var _concatTypedArray2 = _interopRequireDefault(_concatTypedArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Buffer {
  constructor(buffer) {
    this.buffer = buffer || new Uint8Array(0);
  }

  write(...buffer) {
    buffer.forEach(item => {
      this.buffer = (0, _concatTypedArray2.default)(Uint8Array, this.buffer, item);
    });
  }

  static writeUint32(value) {
    return new Uint8Array([value >> 24, value >> 16 & 0xff, value >> 8 & 0xff, value & 0xff]);
  }

  static readAsInt(arr) {
    let temp = '';

    function padStart4Hex(hexNum) {
      let hexStr = hexNum.toString(16);
      return hexStr.padStart(2, '0');
    }

    arr.forEach(num => {
      temp += padStart4Hex(num);
    });
    return parseInt(temp, 16);
  }
}

exports.default = Buffer;

/***/ }),

/***/ "../xgplayer-utils/src/write/stream.js":
/*!*********************************************!*\
  !*** ../xgplayer-utils/src/write/stream.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
class Stream {
  constructor(buffer) {
    if (buffer instanceof ArrayBuffer) {
      this.buffer = buffer;
      this.dataview = new DataView(buffer);
      this.dataview.position = 0;
    } else {
      throw new Error('data is invalid');
    }
  }

  get length() {
    return this.buffer.byteLength;
  }

  set position(value) {
    this.dataview.position = value;
  }

  get position() {
    return this.dataview.position;
  }

  back(count) {
    this.position -= count;
  }

  skip(count) {
    let loop = Math.floor(count / 4);
    let last = count % 4;
    for (let i = 0; i < loop; i++) {
      Stream.readByte(this.dataview, 4);
    }
    if (last > 0) {
      Stream.readByte(this.dataview, last);
    }
  }

  /**
   * [readByte 从DataView中读取数据]
   * @param  {DataView} buffer [DataView实例]
   * @param  {Number} size   [读取字节数]
   * @return {Number}        [整数]
   */
  static readByte(buffer, size, sign) {
    let res;
    switch (size) {
      case 1:
        if (sign) {
          res = buffer.getInt8(buffer.position);
        } else {
          res = buffer.getUint8(buffer.position);
        }
        break;
      case 2:
        if (sign) {
          res = buffer.getInt16(buffer.position);
        } else {
          res = buffer.getUint16(buffer.position);
        }
        break;
      case 3:
        if (sign) {
          throw new Error('not supported for readByte 3');
        } else {
          res = buffer.getUint8(buffer.position) << 16;
          res |= buffer.getUint8(buffer.position + 1) << 8;
          res |= buffer.getUint8(buffer.position + 2);
        }
        break;
      case 4:
        if (sign) {
          res = buffer.getInt32(buffer.position);
        } else {
          res = buffer.getUint32(buffer.position);
        }
        break;
      case 8:
        if (sign) {
          throw new Error('not supported for readBody 8');
        } else {
          res = buffer.getUint32(buffer.position) << 32;
          res |= buffer.getUint32(buffer.position + 4);
        }
        break;
      default:
        res = '';
    }
    buffer.position += size;
    return res;
  }

  readUint8() {
    return Stream.readByte(this.dataview, 1);
  }

  readUint16() {
    return Stream.readByte(this.dataview, 2);
  }

  readUint24() {
    return Stream.readByte(this.dataview, 3);
  }

  readUint32() {
    return Stream.readByte(this.dataview, 4);
  }

  readUint64() {
    return Stream.readByte(this.dataview, 8);
  }

  readInt8() {
    return Stream.readByte(this.dataview, 1, true);
  }
  readInt16() {
    return Stream.readByte(this.dataview, 2, true);
  }

  readInt32() {
    return Stream.readByte(this.dataview, 4, true);
  }

  writeUint32(value) {
    return new Uint8Array([value >>> 24 & 0xff, value >>> 16 & 0xff, value >>> 8 & 0xff, value & 0xff]);
  }
}

exports.default = Stream;

/***/ }),

/***/ "./src/flv-live-mobile.js":
/*!********************************!*\
  !*** ./src/flv-live-mobile.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xgplayerLoader = __webpack_require__(/*! xgplayer-loader */ "../xgplayer-loader/index.js");

var _xgplayerDemux = __webpack_require__(/*! xgplayer-demux */ "../xgplayer-demux/index.js");

var _xgplayerRemux = __webpack_require__(/*! xgplayer-remux */ "../xgplayer-remux/index.js");

var _xgplayerBuffer = __webpack_require__(/*! xgplayer-buffer */ "../xgplayer-buffer/index.js");

var _xgplayerUtils = __webpack_require__(/*! xgplayer-utils */ "../xgplayer-utils/index.js");

var _xgplayerCodec = __webpack_require__(/*! xgplayer-codec */ "../xgplayer-codec/index.js");

var _xgplayer = __webpack_require__(/*! xgplayer */ "xgplayer");

var _xgplayer2 = _interopRequireDefault(_xgplayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DEMUX_EVENTS = _xgplayerUtils.EVENTS.DEMUX_EVENTS;
const LOADER_EVENTS = _xgplayerUtils.EVENTS.LOADER_EVENTS;
const BROWSER_EVENTS = _xgplayerUtils.EVENTS.BROWSER_EVENTS;

const Tag = 'FLVController';

class Logger {
  warn() {}
}

class FlvController {
  constructor(player) {
    this.TAG = Tag;
    this._player = player;

    this.video = this._player.video;
    this.state = {
      initSegmentArrived: false
    };
  }

  init() {
    this._context.registry('FETCH_LOADER', _xgplayerLoader.FetchLoader);
    this._context.registry('LOADER_BUFFER', _xgplayerBuffer.XgBuffer);
    this._context.registry('PRE_SOURCE_BUFFER', _xgplayerBuffer.PreSource);

    this._context.registry('FLV_DEMUXER', _xgplayerDemux.FlvDemuxer);

    this._context.registry('MP4_REMUXER', _xgplayerRemux.Mp4Remuxer);
    this._context.registry('TRACKS', _xgplayerBuffer.Tracks);

    this._context.registry('COMPATIBILITY', _xgplayerCodec.Compatibility);
    this._context.registry('PAGE_VISIBILITY', _xgplayerUtils.PageVisibility);

    this._context.registry('LOGGER', Logger);

    this.initListeners();
  }

  initListeners() {
    this.on(LOADER_EVENTS.LOADER_DATALOADED, this._handleLoaderDataLoaded.bind(this));
    this.on(LOADER_EVENTS.LOADER_ERROR, this._handleNetworkError.bind(this));

    this.on(DEMUX_EVENTS.MEDIA_INFO, this._handleMediaInfo.bind(this));
    this.on(DEMUX_EVENTS.METADATA_PARSED, this._handleMetadataParsed.bind(this));
    this.on(DEMUX_EVENTS.DEMUX_COMPLETE, this._handleDemuxComplete.bind(this));
    this.on(DEMUX_EVENTS.DEMUX_ERROR, this._handleDemuxError.bind(this));
  }

  _handleMediaInfo() {
    if (!this._context.mediaInfo) {
      this.emit(DEMUX_EVENTS.DEMUX_ERROR, new Error('failed to get mediainfo'));
    }
  }

  _handleLoaderDataLoaded() {
    this.emitTo('FLV_DEMUXER', DEMUX_EVENTS.DEMUX_START);
  }

  _handleMetadataParsed(type) {
    if (type === 'audio') {
      // 将音频meta信息交给audioContext，不走remux封装
      const { audioTrack } = this._context.getInstance('TRACKS');
      if (audioTrack && audioTrack.meta) {
        this._setMetaToAudio(audioTrack.meta);
      }
    } else {
      const { videoTrack } = this._context.getInstance('TRACKS');
      if (videoTrack && videoTrack.meta) {
        this._setMetaToVideo(videoTrack.meta);
      }
    }
  }

  _handleDemuxComplete() {
    if (this._player.video) {
      const { videoTrack, audioTrack } = this._context.getInstance('TRACKS');
      this._player.video.onDemuxComplete(videoTrack, audioTrack);
    }
  }

  _handleAppendInitSegment() {
    this.state.initSegmentArrived = true;
    //  this.mse.addSourceBuffers()
  }

  _handleNetworkError() {
    this._player.emit('error', new _xgplayer2.default.Errors('network', this._player.config.url));
  }

  _handleDemuxError() {
    this._player.emit('error', new _xgplayer2.default.Errors('parse', this._player.config.url));
  }

  _setMetaToAudio(audioMeta) {
    if (this._player.video) {
      this._player.video.setAudioMeta(audioMeta);
    }
  }

  _setMetaToVideo(videoMeta) {
    if (this._player.video) {
      this._player.video.setVideoMeta(videoMeta);
    }
  }

  seek() {
    if (!this.state.initSegmentArrived) {
      this.loadData();
    }
  }

  loadData() {
    this.emit(LOADER_EVENTS.LADER_START, this._player.config.url);
  }

  pause() {
    const loader = this._context.getInstance('FETCH_LOADER');

    if (loader) {
      loader.cancel();
    }
  }

  /**
   * 保证当前播放的视频以gop为单位
   * @param videoTrack
   */
  static resolveVideoGOP(videoTrack) {
    const { samples } = videoTrack;
    if (!samples.length) {
      return;
    }

    let firstIframeIdx = null;
    let lastIframeIdx = null;

    if (videoTrack.tempSamples && videoTrack.tempSamples.length) {
      // 将缓存帧放置到队列的头部
      samples.unshift.apply(samples, videoTrack.tempSamples);
    }

    // 寻找第一个I帧
    for (let i = 0, len = samples.length; i < len; i++) {
      const current = samples[i];
      if (current.isKeyframe) {
        firstIframeIdx = i;
        break;
      }
    }

    // 寻找最后一个I帧
    for (let i = samples.length - 1; i > 0; i++) {
      const current = samples[i];

      if (current.isKeyframe) {
        lastIframeIdx = i;
        break;
      }
    }

    if (firstIframeIdx !== 0) {
      samples.splice(0, firstIframeIdx - 1);
    }

    videoTrack.samples = samples.slice(0, lastIframeIdx);
    const rest = samples.slice(lastIframeIdx);
    if (videoTrack.tempSamples) {
      videoTrack.tempSamples.push.apply(videoTrack.tempSamples, rest);
    } else {
      // 将剩下的帧缓存，等待一个完整的gop
      videoTrack.tempSamples = rest;
    }
  }
}
exports.default = FlvController;

/***/ }),

/***/ "./src/mobile.js":
/*!***********************!*\
  !*** ./src/mobile.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _xgplayer = __webpack_require__(/*! xgplayer */ "xgplayer");

var _xgplayer2 = _interopRequireDefault(_xgplayer);

var _xgplayerUtils = __webpack_require__(/*! xgplayer-utils */ "../xgplayer-utils/index.js");

var _flvLiveMobile = __webpack_require__(/*! ./flv-live-mobile */ "./src/flv-live-mobile.js");

var _flvLiveMobile2 = _interopRequireDefault(_flvLiveMobile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const flvAllowedEvents = _xgplayerUtils.EVENTS.FlvAllowedEvents;

class FlvPlayer extends _xgplayer2.default {
  constructor(config) {
    if (!config.mediaType) {
      config.mediaType = 'mobile-video';
    }
    super(config);
    this.video.width = Number.parseInt(config.width || 600);
    this.video.height = Number.parseInt(config.height || 337.5);
    this.video.style.outline = 'none';
    this.context = new _xgplayerUtils.Context(flvAllowedEvents);
    this.initEvents();
  }

  start() {
    this.initFlv();
    this.context.init();
    this.flv.seek(0);
    super.start(this.config.url);
    this.play();
  }

  initFlvEvents(flv) {
    const player = this;
    flv.once(_xgplayerUtils.EVENTS.REMUX_EVENTS.INIT_SEGMENT, () => {
      _xgplayer2.default.util.addClass(player.root, 'xgplayer-is-live');
      if (!_xgplayer2.default.util.findDom(this.root, 'xg-live')) {
        const live = _xgplayer2.default.util.createDom('xg-live', '正在直播', {}, 'xgplayer-live');
        player.controls.appendChild(live);
      }
    });

    flv.once(_xgplayerUtils.EVENTS.LOADER_EVENTS.LOADER_COMPLETE, () => {
      // 直播完成，待播放器播完缓存后发送关闭事件
      if (!player.paused) {
        const timer = setInterval(() => {
          const end = player.getBufferedRange()[1];
          if (Math.abs(player.currentTime - end) < 0.5) {
            player.emit('ended');
            window.clearInterval(timer);
          }
        }, 200);
      }
    });
    flv.on(_xgplayerUtils.EVENTS.BROWSER_EVENTS.VISIBILITY_CHANGE, hidden => {
      if (hidden) {
        this.pause();
      }
    });
  }

  initEvents() {
    this.on('timeupdate', () => {
      this.loadData();
    });

    this.on('seeking', () => {
      const time = this.currentTime;
      const range = this.getBufferedRange();
      if (time > range[1] || time < range[0]) {
        this.flv.seek(this.currentTime);
      }
    });
  }

  initFlv() {
    const flv = this.context.registry('FLV_CONTROLLER', _flvLiveMobile2.default)(this);
    this.initFlvEvents(flv);
    this.flv = flv;
  }

  play() {
    if (this._hasStart && this.paused) {
      this._destroy();
      this.context = new _xgplayerUtils.Context(flvAllowedEvents);
      const flv = this.context.registry('FLV_CONTROLLER', _flvLiveMobile2.default)(this);
      this.initFlvEvents(flv);
      this.flv = flv;
      this.context.init();
      this.loadData();
      super.start();
      super.play();
    } else {
      super.play();
      this.addLiveFlag();
    }
  }

  pause() {
    super.pause();
    if (this.flv) {
      this.flv.pause();
    }
  }

  loadData(time = this.currentTime) {
    if (this.flv) {
      this.flv.seek(time);
    }
  }
  destroy() {
    this._destroy();
    super.destroy();
  }

  addLiveFlag() {
    const player = this;
    _xgplayer2.default.util.addClass(player.root, 'xgplayer-is-live');
    if (!_xgplayer2.default.util.findDom(this.root, 'xg-live')) {
      const live = _xgplayer2.default.util.createDom('xg-live', '正在直播', {}, 'xgplayer-live');
      player.controls.appendChild(live);
    }
  }

  _destroy() {
    this.context.destroy();
    this.flv = null;
    this.context = null;
  }

  get src() {
    return this.currentSrc;
  }

  set src(url) {
    this.player.config.url = url;
    if (!this.paused) {
      this.pause();
      this.once('pause', () => {
        this.start(url);
      });
      this.once('canplay', () => {
        this.play();
      });
    } else {
      this.start(url);
    }
    this.once('canplay', () => {
      this.currentTime = 0;
    });
  }
}

module.exports = FlvPlayer;

/***/ }),

/***/ 1:
/*!*****************************!*\
  !*** multi ./src/mobile.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/mobile.js */"./src/mobile.js");


/***/ }),

/***/ "xgplayer":
/*!*************************!*\
  !*** external "Player" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["Player"]; }());

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9GbHZQbGF5ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy9Vc2Vycy9sZW9uYXJkby9Eb2N1bWVudHMvZnJvbnQtZW5kL3BsYXllci94Z3BsYXllci9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1idWZmZXIvc3JjL2J1ZmZlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItYnVmZmVyL3NyYy9wcmVzb3VjZS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItYnVmZmVyL3NyYy90cmFjay5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItY29kZWMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWNvZGVjL3NyYy9hYWMvYWFjLWhlbHBlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItY29kZWMvc3JjL2NvbXBhdGliaWxpdHkuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWNvZGVjL3NyYy9oMjY0L25hbHVuaXQvZ29sb21iLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1jb2RlYy9zcmMvaDI2NC9uYWx1bml0L2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1jb2RlYy9zcmMvaDI2NC9uYWx1bml0L3Nwcy5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItZGVtdXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWRlbXV4L3NyYy9mbHYvYW1mLXBhcnNlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItZGVtdXgvc3JjL2Zsdi9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItZGVtdXgvc3JjL2hscy9kZW11eGVyL20zdThwYXJzZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWRlbXV4L3NyYy9obHMvZGVtdXhlci90cy5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItZGVtdXgvc3JjL2hscy9wbGF5bGlzdC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItbG9hZGVyL2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1sb2FkZXIvc3JjL2ZldGNoLWxvYWRlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItcmVtdXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXJlbXV4L3NyYy9tcDQvZm1wNC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItcmVtdXgvc3JjL21wNC9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL25vZGVfbW9kdWxlcy9jb25jYXQtdHlwZWQtYXJyYXkvbGliL2NvbmNhdC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvbm9kZV9tb2R1bGVzL2NvbmNhdC10eXBlZC1hcnJheS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL25vZGVfbW9kdWxlcy93ZWJ3b3JraWZ5LXdlYnBhY2svaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9jb25zdGFudHMvZXZlbnRzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvY29uc3RhbnRzL3dvcmtlci1jb21tYW5kcy5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL2NvbnRleHQuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9jcnlwdG8vaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9lbnYvUGFnZVZpc2liaWxpdHkuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9lbnYvaXNsZS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL2Vudi9zbmlmZmVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvZW52L3V0ZjguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2JpbGUvYXVkaW8tY29udGV4dC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vYmlsZS9tb2JpbGUtdmlkZW8uanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2JpbGUvc291cmNlYnVmZmVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9iaWxlL3RpY2tlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vYmlsZS92aWRlby1jb250ZXh0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9iaWxlL3dvcmtlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vYmlsZS95dXYtY2FudmFzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9kZWxzL1RpbWVSYW5nZXMuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2RlbHMvbWVkaWEtaW5mby5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vZGVscy9tZWRpYS1zYW1wbGUuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2RlbHMvbWVkaWEtc2VnbWVudC1saXN0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9kZWxzL21lZGlhLXNlZ21lbnQuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2RlbHMvdHJhY2stbWV0YS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vZGVscy90cmFjay1zYW1wbGUuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy93cml0ZS9idWZmZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy93cml0ZS9zdHJlYW0uanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL2Zsdi1saXZlLW1vYmlsZS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9zcmMvbW9iaWxlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci9leHRlcm5hbCBcIlBsYXllclwiIl0sIm5hbWVzIjpbIlIiLCJSZWZsZWN0IiwiUmVmbGVjdEFwcGx5IiwiYXBwbHkiLCJ0YXJnZXQiLCJyZWNlaXZlciIsImFyZ3MiLCJGdW5jdGlvbiIsInByb3RvdHlwZSIsImNhbGwiLCJSZWZsZWN0T3duS2V5cyIsIm93bktleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiY29uY2F0IiwiUHJvY2Vzc0VtaXRXYXJuaW5nIiwid2FybmluZyIsImNvbnNvbGUiLCJ3YXJuIiwiTnVtYmVySXNOYU4iLCJOdW1iZXIiLCJpc05hTiIsInZhbHVlIiwiRXZlbnRFbWl0dGVyIiwiaW5pdCIsIm1vZHVsZSIsImV4cG9ydHMiLCJfZXZlbnRzIiwidW5kZWZpbmVkIiwiX2V2ZW50c0NvdW50IiwiX21heExpc3RlbmVycyIsImRlZmF1bHRNYXhMaXN0ZW5lcnMiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJnZXQiLCJzZXQiLCJhcmciLCJSYW5nZUVycm9yIiwiZ2V0UHJvdG90eXBlT2YiLCJjcmVhdGUiLCJzZXRNYXhMaXN0ZW5lcnMiLCJuIiwiJGdldE1heExpc3RlbmVycyIsInRoYXQiLCJnZXRNYXhMaXN0ZW5lcnMiLCJlbWl0IiwidHlwZSIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJwdXNoIiwiZG9FcnJvciIsImV2ZW50cyIsImVycm9yIiwiZXIiLCJFcnJvciIsImVyciIsIm1lc3NhZ2UiLCJjb250ZXh0IiwiaGFuZGxlciIsImxlbiIsImxpc3RlbmVycyIsImFycmF5Q2xvbmUiLCJfYWRkTGlzdGVuZXIiLCJsaXN0ZW5lciIsInByZXBlbmQiLCJtIiwiZXhpc3RpbmciLCJUeXBlRXJyb3IiLCJuZXdMaXN0ZW5lciIsInVuc2hpZnQiLCJ3YXJuZWQiLCJ3IiwiU3RyaW5nIiwibmFtZSIsImVtaXR0ZXIiLCJjb3VudCIsImFkZExpc3RlbmVyIiwib24iLCJwcmVwZW5kTGlzdGVuZXIiLCJvbmNlV3JhcHBlciIsImZpcmVkIiwicmVtb3ZlTGlzdGVuZXIiLCJ3cmFwRm4iLCJfb25jZVdyYXAiLCJzdGF0ZSIsIndyYXBwZWQiLCJiaW5kIiwib25jZSIsInByZXBlbmRPbmNlTGlzdGVuZXIiLCJsaXN0IiwicG9zaXRpb24iLCJvcmlnaW5hbExpc3RlbmVyIiwic2hpZnQiLCJzcGxpY2VPbmUiLCJvZmYiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJrZXlzIiwia2V5IiwiX2xpc3RlbmVycyIsInVud3JhcCIsImV2bGlzdGVuZXIiLCJ1bndyYXBMaXN0ZW5lcnMiLCJyYXdMaXN0ZW5lcnMiLCJsaXN0ZW5lckNvdW50IiwiZXZlbnROYW1lcyIsImFyciIsImNvcHkiLCJBcnJheSIsImluZGV4IiwicG9wIiwicmV0IiwiVHJhY2siLCJyZXF1aXJlIiwiZGVmYXVsdCIsIlRyYWNrcyIsIkF1ZGlvVHJhY2siLCJWaWRlb1RyYWNrIiwiWGdCdWZmZXIiLCJSZW11eEJ1ZmZlciIsIlByZVNvdXJjZSIsImNvbnN0cnVjdG9yIiwiaGlzdG9yeUxlbiIsImFycmF5Iiwib2Zmc2V0IiwiZGF0YSIsImJ5dGVMZW5ndGgiLCJVaW50OEFycmF5IiwiX3NoaWZ0QnVmZmVyIiwic2xpY2UiLCJ0bXBvZmYiLCJ0bXAiLCJ0ZW1wbGVuZ3RoIiwiY2xlYXIiLCJkZXN0cm95IiwidG9JbnQiLCJzdGFydCIsInJldEludCIsInZpZGVvIiwiYXVkaW8iLCJTb3VyY2UiLCJtaW1ldHlwZSIsInNvdXJjZXMiLCJnZXRTb3VyY2UiLCJzb3VyY2UiLCJjcmVhdGVTb3VyY2UiLCJpZCIsInNlcXVlbmNlTnVtYmVyIiwic2FtcGxlcyIsImRyb3BwZWRTYW1wbGVzIiwicmVzZXQiLCJkaXN0cm95IiwiVEFHIiwiZHJvcHBlZCIsImF1ZGlvVHJhY2siLCJ2aWRlb1RyYWNrIiwiTmFsdW5pdCIsIlNwc1BhcnNlciIsIkNvbXBhdGliaWxpdHkiLCJBQUMiLCJnZXRTaWxlbnRGcmFtZSIsImNvZGVjIiwiY2hhbm5lbENvdW50IiwiUkVNVVhfRVZFTlRTIiwiREVNVVhfRVZFTlRTIiwiRVZFTlRTIiwibmV4dEF1ZGlvRHRzIiwibmV4dFZpZGVvRHRzIiwibGFzdEF1ZGlvU2FtcGxlc0xlbiIsImxhc3RWaWRlb1NhbXBsZXNMZW4iLCJsYXN0VmlkZW9EdHMiLCJsYXN0QXVkaW9EdHMiLCJhbGxBdWRpb1NhbXBsZXNDb3VudCIsImFsbFZpZGVvU2FtcGxlc0NvdW50IiwiX2ZpcnN0QXVkaW9TYW1wbGUiLCJfZmlyc3RWaWRlb1NhbXBsZSIsImZpbGxlZEF1ZGlvU2FtcGxlcyIsImZpbGxlZFZpZGVvU2FtcGxlcyIsIl92aWRlb0xhcmdlR2FwIiwiX2F1ZGlvTGFyZ2VHYXAiLCJiZWZvcmUiLCJSRU1VWF9NRURJQSIsImRvRml4IiwiaXNGaXJzdEF1ZGlvU2FtcGxlcyIsImlzRmlyc3RWaWRlb1NhbXBsZXMiLCJnZXRGaXJzdFNhbXBsZSIsInJlY29yZFNhbXBsZXNDb3VudCIsImZpeFJlZlNhbXBsZUR1cmF0aW9uIiwibWV0YSIsImNoYW5nZWQiLCJ2aWRlb0NoYW5nZWQiLCJjaGFuZ2VkSWR4IiwidmlkZW9DaGFuZ2VkSWR4IiwiZGV0YWN0Q2hhbmdlU3RyZWFtIiwiZml4Q2hhbmdlU3RyZWFtVmlkZW8iLCJkb0ZpeFZpZGVvIiwiYXVkaW9DaGFuZ2VkIiwiYXVkaW9DaGFuZ2VkSWR4IiwiZml4Q2hhbmdlU3RyZWFtQXVkaW8iLCJkb0ZpeEF1ZGlvIiwiZmlyc3QiLCJzdHJlYW1DaGFuZ2VTdGFydCIsInZpZGVvU2FtcGxlcyIsImZyYW1lUmF0ZSIsImZpeGVkIiwiZmlyc3RTYW1wbGUiLCJzYW1wbGVzTGVuIiwiZG9GaXhMYXJnZUdhcCIsImR0cyIsImRldGVjdExhcmdlR2FwIiwiZmlyc3REdHMiLCJ2aWRlb0ZpcnN0RHRzIiwiYXVkaW9GaXJzdER0cyIsImdhcCIsInJlZlNhbXBsZUR1cmF0aW9uIiwiZmlsbENvdW50IiwiTWF0aCIsImZsb29yIiwiY2xvbmVkRmlyc3RTYW1wbGUiLCJhc3NpZ24iLCJwdHMiLCJjdHMiLCJzaXplIiwiYWJzR2FwIiwiYWJzIiwiZmlsbEZyYW1lQ291bnQiLCJjbG9uZWRTYW1wbGUiLCJjb21wdXRlZCIsIm9yaWdpbkR0cyIsImxhc3REdHMiLCJsYXN0U2FtcGxlRHVyYXRpb24iLCJjdXJyZW50IiwibmV4dCIsImR1cmF0aW9uIiwiZmlsbEZyYW1lSWR4IiwiZmlsbEZyYW1lIiwic3BsaWNlIiwiYXVkaW9TYW1wbGVzIiwic2lsZW50RnJhbWUiLCJfZmlyc3RTYW1wbGUiLCJ2aWRlb0ZpcnN0UHRzIiwic2lsZW50U2FtcGxlQ291bnQiLCJzaWxlbnRTYW1wbGUiLCJkYXRhc2l6ZSIsImZpbHRlcmVkIiwicmVmU2FtcGxlRHVyYXRpb25GaXhlZCIsInNpbGVudEZyYW1lQ291bnQiLCJzb3J0QXVkaW9TYW1wbGVzIiwiY2hhbmdlSWR4IiwicHJldkR0cyIsImdldFN0cmVhbUNoYW5nZVN0YXJ0IiwiY3VyRHRzIiwiaXNDb250aW51ZSIsIm9wdGlvbnMiLCJmaXJzdFBhcnRTYW1wbGVzIiwic2Vjb25kUGFydFNhbXBsZXMiLCJjaGFuZ2VTYW1wbGUiLCJmaXJzdFBhcnREdXJhdGlvbiIsImZpbmRGaXJzdFZpZGVvU2FtcGxlIiwiZmluZEZpcnN0QXVkaW9TYW1wbGUiLCJpc1ZpZGVvIiwiYWxsU2FtcGxlc0NvdW50IiwiZmlsbGVkU2FtcGxlc0NvdW50IiwiZHVyYXRpb25BdmciLCJyZW1vdmVJbnZhbGlkU2FtcGxlcyIsImZpbHRlciIsInNhbXBsZSIsImR0c0Jhc2UiLCJJbmZpbml0eSIsInNvcnQiLCJhIiwiYiIsInNvcnRlZCIsImlzS2V5ZnJhbWUiLCJuZXh0RHRzIiwiY29uZDEiLCJjb25kMiIsImRpc2NvbnRpbnVlIiwidHJhY2tzIiwiX2NvbnRleHQiLCJnZXRJbnN0YW5jZSIsInJlbXV4ZXIiLCJfZHRzQmFzZSIsIkdvbG9tYiIsInVpbnQ4YXJyYXkiLCJfYnVmZmVyIiwiX2J1ZmZlckluZGV4IiwiX3RvdGFsQnl0ZXMiLCJfdG90YWxCaXRzIiwiX2N1cnJlbnRXb3JkIiwiX2N1cnJlbnRXb3JkQml0c0xlZnQiLCJfZmlsbEN1cnJlbnRXb3JkIiwiYnVmZmVyQnl0ZXNMZWZ0IiwiYnl0ZXNSZWFkIiwibWluIiwid29yZCIsInN1YmFycmF5IiwiRGF0YVZpZXciLCJidWZmZXIiLCJnZXRVaW50MzIiLCJyZWFkQml0cyIsImJpdHMiLCJ2YWx1IiwicmVhZEJvb2wiLCJyZWFkQnl0ZSIsIl9za2lwTGVhZGluZ1plcm8iLCJ6ZXJvQ291bnQiLCJyZWFkVUVHIiwibGVhZGluZ1plcm9zIiwicmVhZFNFRyIsImdldE5hbHVuaXRzIiwiYnVmIiwiZGF0YXZpZXciLCJnZXRJbnQzMiIsImdldEludDE2IiwiZ2V0SW50OCIsImdldEFubmV4Yk5hbHMiLCJnZXRBdmNjTmFscyIsIm5hbHMiLCJnZXRIZWFkZXJQb3NpdGlvbkFubmV4QiIsInBvcyIsImVuZCIsImhlYWRlciIsImhlYWRlckxlbmd0aCIsInNraXAiLCJib2R5IiwidW5pdCIsImFuYWx5c2VOYWwiLCJuZHIiLCJpZHIiLCJzcHMiLCJwYXJzZVNQUyIsInBwcyIsImdldEF2Y2MiLCJTUFNQYXJzZXIiLCJfZWJzcDJyYnNwIiwic3JjIiwic3JjTGVuZ3RoIiwiZHN0IiwiZHN0SWR4IiwicmJzcCIsImdiIiwicHJvZmlsZUlkYyIsImxldmVsSWRjIiwicHJvZmlsZV9zdHJpbmciLCJnZXRQcm9maWxlU3RyaW5nIiwibGV2ZWxfc3RyaW5nIiwiZ2V0TGV2ZWxTdHJpbmciLCJjaHJvbWFfZm9ybWF0X2lkYyIsImNocm9tYV9mb3JtYXQiLCJjaHJvbWFfZm9ybWF0X3RhYmxlIiwiYml0X2RlcHRoIiwic2NhbGluZ19saXN0X2NvdW50IiwiX3NraXBTY2FsaW5nTGlzdCIsInBpY19vcmRlcl9jbnRfdHlwZSIsIm51bV9yZWZfZnJhbWVzX2luX3BpY19vcmRlcl9jbnRfY3ljbGUiLCJwaWNfd2lkdGhfaW5fbWJzX21pbnVzMSIsInBpY19oZWlnaHRfaW5fbWFwX3VuaXRzX21pbnVzMSIsImZyYW1lX21ic19vbmx5X2ZsYWciLCJmcmFtZV9jcm9wX2xlZnRfb2Zmc2V0IiwiZnJhbWVfY3JvcF9yaWdodF9vZmZzZXQiLCJmcmFtZV9jcm9wX3RvcF9vZmZzZXQiLCJmcmFtZV9jcm9wX2JvdHRvbV9vZmZzZXQiLCJmcmFtZV9jcm9wcGluZ19mbGFnIiwicGFyX3dpZHRoIiwicGFyX2hlaWdodCIsImZwcyIsImZwc19maXhlZCIsImZwc19udW0iLCJmcHNfZGVuIiwidnVpX3BhcmFtZXRlcnNfcHJlc2VudF9mbGFnIiwiYXNwZWN0X3JhdGlvX2lkYyIsInBhcl93X3RhYmxlIiwicGFyX2hfdGFibGUiLCJudW1fdW5pdHNfaW5fdGljayIsInRpbWVfc2NhbGUiLCJwYXJTY2FsZSIsImNyb3BfdW5pdF94IiwiY3JvcF91bml0X3kiLCJzdWJfd2MiLCJzdWJfaGMiLCJjb2RlY193aWR0aCIsImNvZGVjX2hlaWdodCIsInByZXNlbnRfd2lkdGgiLCJjZWlsIiwiY2hyb21hX2Zvcm1hdF9zdHJpbmciLCJnZXRDaHJvbWFGb3JtYXRTdHJpbmciLCJmcmFtZV9yYXRlIiwicGFyX3JhdGlvIiwid2lkdGgiLCJoZWlnaHQiLCJjb2RlY19zaXplIiwicHJlc2VudF9zaXplIiwibGFzdF9zY2FsZSIsIm5leHRfc2NhbGUiLCJkZWx0YV9zY2FsZSIsInRvRml4ZWQiLCJjaHJvbWEiLCJ0b1ZpZGVvTWV0YSIsInNwc0NvbmZpZyIsImNvZGVjV2lkdGgiLCJjb2RlY0hlaWdodCIsInByZXNlbnRXaWR0aCIsInByZXNlbnRIZWlnaHQiLCJwcm9maWxlIiwibGV2ZWwiLCJiaXREZXB0aCIsImNocm9tYUZvcm1hdCIsInBhclJhdGlvIiwiZnBzRGVuIiwiZnBzTnVtIiwidGltZXNjYWxlIiwiTTNVOFBhcnNlciIsIlRzRGVtdXhlciIsIlBsYXlsaXN0IiwiRmx2RGVtdXhlciIsIkRBVEFfVFlQRVMiLCJOVU1CRVIiLCJCT09MRUFOIiwiU1RSSU5HIiwiT0JKRUNUIiwiTUlYX0FSUkFZIiwiT0JKRUNUX0VORCIsIlNUUklDVF9BUlJBWSIsIkRBVEUiLCJMT05FX1NUUklORyIsIkFNRlBhcnNlciIsInJlYWRPZmZzZXQiLCJyZXNvbHZlIiwibWV0YURhdGEiLCJwYXJzZVZhbHVlIiwiYm9keVNpemUiLCJyZXNldFN0YXR1cyIsInBhcnNlU3RyaW5nIiwiZHYiLCJzdHJMZW4iLCJnZXRVaW50MTYiLCJpc0xlIiwic3RyIiwiVVRGOCIsImRlY29kZSIsInBhcnNlRGF0ZSIsInRzIiwiZ2V0RmxvYXQ2NCIsInRpbWVPZmZzZXQiLCJEYXRlIiwicGFyc2VPYmplY3QiLCJpc09iakVuZCIsInBhcnNlTG9uZ1N0cmluZyIsIkFycmF5QnVmZmVyIiwiZGF0YVZpZXciLCJnZXRVaW50OCIsImJvb2xOdW0iLCJvYmpFbmRTaXplIiwiYW1mT2JqIiwiaXNPYmplY3RFbmQiLCJtYXJrIiwiYW1mVmFyIiwibWFya2VyIiwiYXJyTGVuZ3RoIiwic2NyaXB0IiwiZGF0ZSIsImxvbmdTdHIiLCJfZmlyc3RGcmFnbWVudExvYWRlZCIsIl90cmFja051bSIsIl9oYXNTY3JpcHQiLCJERU1VWF9TVEFSVCIsImRvUGFyc2VGbHYiLCJpc0ZsdkZpbGUiLCJnZXRQbGF5VHlwZSIsInN0cmVhbUZsYWciLCJyZXN1bHQiLCJoYXNWaWRlbyIsImhhc0F1ZGlvIiwibG9hZGVyQnVmZmVyIiwicGFyc2VGbHZIZWFkZXIiLCJjaHVuayIsImxvb3BNYXgiLCJfcGFyc2VGbHZUYWciLCJERU1VWF9DT01QTEVURSIsIkRFTVVYX0VSUk9SIiwicGxheVR5cGUiLCJpbml0VmlkZW9UcmFjayIsImluaXRBdWRpb1RyYWNrIiwiVmlkZW9UcmFja01ldGEiLCJBdWRpb1RyYWNrTWV0YSIsIl9wYXJzZUZsdlRhZ0hlYWRlciIsIl9wcm9jZXNzQ2h1bmsiLCJ0YWdUeXBlIiwidGltZXN0YW1wIiwidGltZXN0YW1wRXh0IiwiX3BhcnNlU2NyaXB0RGF0YSIsIl9wYXJzZUFBQ0RhdGEiLCJfcGFyc2VIZXZjRGF0YSIsImluZm8iLCJvbk1ldGFEYXRhIiwibWVkaWFJbmZvIiwiaHNhQXVkaW8iLCJ2YWxpZGF0ZSIsIl9kYXRhc2l6ZVZhbGlkYXRvciIsIk1FRElBX0lORk8iLCJoYXNTcGVjaWZpY0NvbmZpZyIsImF1ZGlvc2FtcGxlcmF0ZSIsInNhbXBsZVJhdGUiLCJhdWRpb2NoYW5uZWxzIiwic2FtcGxlUmF0ZUluZGV4IiwiZnJhbWVyYXRlIiwiX2FhY1NlcXVlbmNlSGVhZGVyUGFyc2VyIiwib2JqZWN0VHlwZSIsIm9yaWdpbk9iamVjdFR5cGUiLCJfc3dpdGNoQXVkaW9TYW1wbGVSYXRlIiwiZnJhbWVMZW5ndGgiLCJkZXBlbmRzT25Db3JlQ29kZXIiLCJleHRlbnNpb25GbGFnSW5kZXgiLCJ1c2VyQWdlbnQiLCJ3aW5kb3ciLCJuYXZpZ2F0b3IiLCJ0b0xvd2VyQ2FzZSIsImV4dGVuc2lvblNhbXBsaW5nSW5kZXgiLCJjb25maWciLCJzYW1wbGluZ0luZGV4IiwiaW5kZXhPZiIsInNuaWZmZXIiLCJicm93c2VyIiwidHJhY2siLCJmb3JtYXQiLCJfaGFzQXVkaW9TZXF1ZW5jZSIsIl9zd2l0Y2hBdWRpb1NhbXBsaW5nRnJlcXVlbmN5IiwiZnJhbWVMZW50aCIsImF1ZGlvU2FtcGxlUmF0ZSIsImF1ZGlvU2FtcGxlUmF0ZUluZGV4IiwiYWFjSGVhZGVyIiwiYXVkaW9NZWRpYSIsIk1FVEFEQVRBX1BBUlNFRCIsIkFVRElPX01FVEFEQVRBX0NIQU5HRSIsIl9tZXRhQ2hhbmdlIiwiZnJhbWVUeXBlIiwiY29kZWNJRCIsImF2Y1BhY2tldFR5cGUiLCJwYXJzZUludCIsIm5hbHUiLCJyIiwic2l6ZXMiLCJhdmNjbGVuZ3RoIiwiX2F2Y1NlcXVlbmNlSGVhZGVyUGFyc2VyIiwiX2hhc1ZpZGVvU2VxdWVuY2UiLCJWSURFT19NRVRBREFUQV9DSEFOR0UiLCJjb25maWd1cmF0aW9uVmVyc2lvbiIsImF2Y1Byb2ZpbGVJbmRpY2F0aW9uIiwicHJvZmlsZUNvbXBhdGliaWxpdHkiLCJhdmNMZXZlbEluZGljYXRpb24iLCJuYWxVbml0TGVuZ3RoIiwibnVtT2ZTcHMiLCJqIiwiY29kZWNTdHJpbmciLCJoIiwidG9TdHJpbmciLCJudW1PZlBwcyIsInZpZGVvTWVkaWEiLCJhdmNjIiwic2FtcGxpbmdGcmVxdWVuY3lJbmRleCIsInNhbXBsaW5nRnJlcXVlbmN5TGlzdCIsIl9zd2l0Y2hBdWRpb0NoYW5uZWwiLCJzYW1wbGVUcmFja051bUluZGV4Iiwic2FtcGxlVHJhY2tOdW1MaXN0IiwiZGF0YXNpemVDb25maXJtIiwibG9nZ2VyIiwicGFyc2UiLCJ0ZXh0IiwiYmFzZXVybCIsInNwbGl0IiwicmVmcyIsInJlZiIsIm1hdGNoIiwicmVmbSIsInJlZmQiLCJ2ZXJzaW9uIiwic2VxdWVuY2UiLCJ0YXJnZXRkdXJhdGlvbiIsInBhcnNlRmxvYXQiLCJwYXJzZUZyYWciLCJwYXJzZURlY3J5cHQiLCJmcmFncyIsImZyZWciLCJuZXh0bGluZSIsImNoYXJBdCIsInVybCIsInBhcnNlVVJMIiwidXJscyIsImVuY3J5cHQiLCJjbWQiLCJtZXRob2QiLCJ1cmkiLCJpdiIsIml2YiIsImltIiwic3Vic3RyIiwiU3RyZWFtVHlwZSIsImNvbmZpZ3MiLCJkZW11eGluZyIsInBhdCIsInBtdCIsIl9oYXNWaWRlb01ldGEiLCJfaGFzQXVkaW9NZXRhIiwiZGVtdXgiLCJmcmFnIiwiaW5wdXRCdWZmZXIiLCJwZXNlcyIsInRzU3RyZWFtIiwiU3RyZWFtIiwicmVhZCIsInBlcyIsInBpZCIsIkVTIiwicGF5bG9hZCIsInN0cmVhbSIsIkF1ZGlvT3B0aW9ucyIsIlZpZGVvT3B0aW9ucyIsImVwZXNlcyIsIk1lcmdlIiwicHVzaEF1ZGlvU2FtcGxlIiwicHVzaFZpZGVvU2FtcGxlIiwiX3RyYWNrcyIsImZyZXF1ZW5jZSIsImNoYW5uZWwiLCJhdWRpb09iamVjdFR5cGUiLCJhdWRpb0NvbmZpZyIsImZyZXF1ZW5jeUluZGV4IiwibWV0YUVxdWFsIiwiY29tcGFpcmVNZXRhIiwiQXVkaW9UcmFja1NhbXBsZSIsInNhbXBsZUxlbmd0aCIsIm5hbCIsInNhclJhdGlvIiwic2FyX3JhdGlvIiwiVmlkZW9UcmFja1NhbXBsZSIsImRlc3RvcnkiLCJjb21wYWlyZUFycmF5IiwiYWwiLCJibCIsImlnbm9yZUR1cmF0aW9uIiwiayIsIml0ZW1hIiwiaXRlbWIiLCJidWZmZXJzIiwicmVhZEhlYWRlciIsInJlYWRQYXlsb2FkIiwicGFja2V0IiwidW5rbm93blBJRHMiLCJQRVMiLCJQQVQiLCJDQVQiLCJUU0RUIiwic29tZSIsIml0ZW0iLCJQTVQiLCJzdHMiLCJNZWRpYSIsInN0cmVhbVR5cGUiLCJzeW5jIiwicmVhZFVpbnQ4IiwicmVhZFVpbnQxNiIsInByaW9yaXR5Iiwic2NyYW1ibGluZyIsImFkYXB0YXRpb24iLCJjb250aW51aXR5IiwidGFiZWxJRCIsInplcm8iLCJzZWN0aW9uTGVuZ3RoIiwic3RyZWFtSUQiLCJzZWN0aW9uTnVtYmVyIiwibGFzdFNlY3Rpb25OdW1iZXIiLCJOIiwicHJvZ3JhbU51bWJlciIsInByb2dyYW0iLCJ0YWJsZUlEIiwib3JkZXIiLCJsYXN0T3JkZXIiLCJQQ1JfUElEIiwicHJvZ3JhbUxlbmd0aCIsImVzIiwibWFwIiwiYWRhcHRhdGlvbkxlbmd0aCIsImFjY2VzcyIsIlBDUiIsIk9QQ1IiLCJzcGxpY2VQb2ludCIsInRyYW5zcG9ydFByaXZhdGUiLCJhZGFwdGF0aW9uRmllbGQiLCJfc3RhcnQiLCJwcm9ncmFtQ2xvY2tCYXNlIiwicmVhZFVpbnQzMiIsInByb2dyYW1DbG9ja0V4dGVuc2lvbiIsIm9yaWdpblByb2dyYW1DbG9ja0Jhc2UiLCJvcmlnaW5Qcm9ncmFtQ2xvY2tFeHRlbnNpb24iLCJzcGxpY2VDb3VudGRvd24iLCJ0cmFuc3BvcnRQcml2YXRlRGF0YSIsImx0dyIsInBpZWNld2lzZSIsInNlYW1sZXNzIiwibHR3VmFsaWQiLCJsdHdPZmZzZXQiLCJyZWFkVWludDI0IiwicGllY2V3aXNlUmF0ZSIsInJlYWRJbnQ4Iiwic3BsaWNlVHlwZSIsImR0c05leHRBVTEiLCJtYXJrZXIxIiwiZHRzTmV4dEFVMiIsIm1hcmtlcjIiLCJkdHNOZXh0QVUzIiwibGFzdFN0dWZmaW5nIiwicGFja2V0TGVuZ3RoIiwicHRzRFRTRmxhZyIsImVzY3JGbGFnIiwiZXNSYXRlRmxhZyIsImRzbUZsYWciLCJhZGRpdGlvbmFsRmxhZyIsImNyY0ZsYWciLCJleHRlbnNpb25GbGFnIiwicGVzSGVhZGVyTGVuZ3RoIiwiTjEiLCJlc2NyIiwiZXgiLCJlc1JhdGUiLCJhZGRpdGlvbmFsQ29weUluZm8iLCJwZXNDUkMiLCJiYWNrIiwiZnEiLCJsYXllciIsImFic2VudCIsImdldEF1ZGlvQ29uZmlnIiwic2VjdGlvbkluZGljYXRvciIsImN1cnJlbnROZXh0SW5kaWNhdG9yIiwiY3JjMzIiLCJleHRlbnNpb25TYW1wbGVJbmRleCIsInRlc3QiLCJpbnB1dGJ1ZmZlciIsIl9iYXNlVVJMIiwiX2xpc3QiLCJfdHMiLCJmcmFnTGVuZ3RoIiwiX2xhc3RnZXQiLCJfYXVkb2NsZWFyIiwiYXV0b2NsZWFyIiwiYmFzZVVSTCIsImRvd25sb2FkZWQiLCJkb3dubG9hZGluZyIsImRlbGV0ZUZyYWciLCJ0aW1lIiwicHVzaE0zVTgiLCJkZWxldGVwcmUiLCJuZXdmcmFnbGlzdCIsInRzbGlzdCIsImdldFRzTGlzdCIsInRzbmFtZSIsImlzbG9hZGVkIiwibG9hZGluZyIsImdldFRzQnlOYW1lIiwiZ2V0VHMiLCJ0aW1lbGlzdCIsImNsZWFyRG93bmxvYWRlZCIsImwiLCJGZXRjaExvYWRlciIsIkxPQURFUl9FVkVOVFMiLCJSRUFEX1NUUkVBTSIsIlJFQURfVEVYVCIsIlJFQURfSlNPTiIsIlJFQURfQlVGRkVSIiwic3RhdHVzIiwiX3JlYWRlciIsIl9jYW5jZWxlZCIsIl9kZXN0cm95ZWQiLCJyZWFkdHlwZSIsIl9sb2FkZXJUYXNrTm8iLCJMQURFUl9TVEFSVCIsImxvYWQiLCJvcHRzIiwiX3RoaXMiLCJwYXJhbXMiLCJnZXRQYXJhbXMiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsIm9rIiwiX29uRmV0Y2hSZXNwb25zZSIsIkxPQURFUl9FUlJPUiIsImNhdGNoIiwidGFza25vIiwianNvbiIsIkxPQURFUl9DT01QTEVURSIsImFycmF5QnVmZmVyIiwiX29uUmVhZGVyIiwiZ2V0UmVhZGVyIiwicmVhZGVyIiwiY2FuY2VsIiwiZSIsInZhbCIsImRvbmUiLCJMT0FERVJfREFUQUxPQURFRCIsImhlYWRlcnMiLCJIZWFkZXJzIiwibW9kZSIsImNhY2hlIiwiY29uZmlnSGVhZGVycyIsImhhc093blByb3BlcnR5IiwiYXBwZW5kIiwib3B0SGVhZGVycyIsImNvcnMiLCJ3aXRoQ3JlZGVudGlhbHMiLCJjcmVkZW50aWFscyIsIk1wNFJlbXV4ZXIiLCJGbXA0IiwiQnVmZmVyIiwid3JpdGVVaW50MzIiLCJpbml0Qm94IiwiY29udGVudCIsIndyaXRlIiwiZXh0ZW5zaW9uIiwiZmxhZyIsImZ0eXAiLCJtb292IiwibXZoZCIsInRyYWsiLCJ2aWRlb1RyYWsiLCJhdWRpb1RyYWsiLCJtdmV4IiwiZm9yRWFjaCIsImJ5dGVzIiwidGtoZCIsIm1kaWEiLCJzYW1wbGVyYXRlIiwiZWR0cyIsIm1lZGlhVGltZSIsIm1kaGQiLCJoZGxyIiwibWluZiIsInZtaGQiLCJzbWhkIiwiZGluZiIsInN0YmwiLCJkcmVmIiwic3RzZCIsInN0dHMiLCJzdHNjIiwic3RzeiIsInN0Y28iLCJtcDRhIiwiYXZjMSIsImVzZHMiLCJjb25maWdsZW4iLCJoU3BhY2luZyIsInZTcGFjaW5nIiwiYnRydCIsInBhc3AiLCJ0cmFja0lEIiwibWVoZCIsInRyZXgiLCJtb29mIiwibWZoZCIsInRyYWYiLCJ0ZmhkIiwidGZkdCIsInNkdHAiLCJ0cnVuIiwic2R0cExlbmd0aCIsInNhbXBsZUNvdW50IiwiZmxhZ3MiLCJpc0xlYWRpbmciLCJkZXBlbmRzT24iLCJpc0RlcGVuZGVkT24iLCJoYXNSZWR1bmRhbmN5IiwiaXNOb25TeW5jIiwibnVtIiwibWRhdCIsIm1kYXRCb3giLCJjaGFyQ29kZUF0IiwiX2lzRHRzQmFzZUluaXRlZCIsImlzRmlyc3RWaWRlbyIsImlzRmlyc3RBdWRpbyIsInZpZGVvQWxsRHVyYXRpb24iLCJhdWRpb0FsbER1cmF0aW9uIiwicmVtdXgiLCJSRU1VWF9NRVRBREFUQSIsIm9uTWV0YURhdGFSZWFkeSIsIkRFVEVDVF9DSEFOR0VfU1RSRUFNIiwicmVzZXREdHNCYXNlIiwiX2R0c0Jhc2VJbml0ZWQiLCJjYWxjRHRzQmFzZSIsIl9yZW11eFZpZGVvIiwiX3JlbXV4QXVkaW8iLCJzZWVrIiwicHJlc291cmNlYnVmZmVyIiwicmVtdXhJbml0U2VnbWVudCIsIklOSVRfU0VHTUVOVCIsImluaXRTZWdtZW50IiwiYXVkaW9CYXNlIiwidmlkZW9CYXNlIiwibXA0U2FtcGxlcyIsImF2Y1NhbXBsZSIsIm1kYXRTYW1wbGUiLCJzYW1wbGVEdXJhdGlvbiIsInZpZGVvTWV0YSIsIm1vb2ZNZGF0Iiwid3JpdGVUb1NvdXJjZSIsIk1FRElBX1NFR01FTlQiLCJsYXN0U2FtcGxlIiwiX3ZpZGVvTmV4dER0cyIsImlzRmlyc3REdHNJbml0ZWQiLCJhdWRpb01ldGEiLCJtcDRTYW1wbGUiLCJpbml0U2lsZW50QXVkaW8iLCJDb250ZXh0IiwiV09SS0VSX0NPTU1BTkRTIiwiUGFnZVZpc2liaWxpdHkiLCJNZWRpYUluZm8iLCJNZWRpYVNhbXBsZSIsIk1lZGlhU2VnbWVudCIsIk1lZGlhU2VnbWVudExpc3QiLCJNc2UiLCJNb2JpbGVWaWRlbyIsIkNyeXB0byIsIlJlc3VsdENvbnN0cnVjdG9yIiwidG90YWxMZW5ndGgiLCJfbGVuIiwiYXJyYXlzIiwiX2tleSIsIl9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24iLCJfZGlkSXRlcmF0b3JFcnJvciIsIl9pdGVyYXRvckVycm9yIiwiX2l0ZXJhdG9yIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJfc3RlcCIsInJldHVybiIsIl9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yIiwiX2RpZEl0ZXJhdG9yRXJyb3IyIiwiX2l0ZXJhdG9yRXJyb3IyIiwiX2l0ZXJhdG9yMiIsIl9zdGVwMiIsIl9hcnIiLCJfY29uY2F0IiwiX2NvbmNhdDIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib2JqIiwiX19lc01vZHVsZSIsIndlYnBhY2tCb290c3RyYXBGdW5jIiwibW9kdWxlcyIsImluc3RhbGxlZE1vZHVsZXMiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJjIiwiZCIsImdldHRlciIsIm8iLCJjb25maWd1cmFibGUiLCJnZXREZWZhdWx0IiwiZ2V0TW9kdWxlRXhwb3J0cyIsIm9iamVjdCIsInByb3BlcnR5IiwicCIsIm9lIiwiZiIsInMiLCJFTlRSWV9NT0RVTEUiLCJtb2R1bGVOYW1lUmVxRXhwIiwiZGVwZW5kZW5jeVJlZ0V4cCIsInF1b3RlUmVnRXhwIiwicmVwbGFjZSIsImlzTnVtZXJpYyIsImdldE1vZHVsZURlcGVuZGVuY2llcyIsInF1ZXVlTmFtZSIsInJldHZhbCIsImZuU3RyaW5nIiwid3JhcHBlclNpZ25hdHVyZSIsIndlYnBhY2tSZXF1aXJlTmFtZSIsInJlIiwiUmVnRXhwIiwiZXhlYyIsImhhc1ZhbHVlc0luUXVldWVzIiwicXVldWVzIiwicmVkdWNlIiwiaGFzVmFsdWVzIiwiZ2V0UmVxdWlyZWRNb2R1bGVzIiwibW9kdWxlc1F1ZXVlIiwibWFpbiIsInJlcXVpcmVkTW9kdWxlcyIsInNlZW5Nb2R1bGVzIiwicXVldWUiLCJtb2R1bGVUb0NoZWNrIiwibmV3TW9kdWxlcyIsIm5ld01vZHVsZXNLZXlzIiwiX193ZWJwYWNrX21vZHVsZXNfXyIsImFsbCIsImVudHJ5TW9kdWxlIiwiSlNPTiIsInN0cmluZ2lmeSIsImpvaW4iLCJibG9iIiwiQmxvYiIsImJhcmUiLCJVUkwiLCJ3ZWJraXRVUkwiLCJtb3pVUkwiLCJtc1VSTCIsIndvcmtlclVybCIsImNyZWF0ZU9iamVjdFVSTCIsIndvcmtlciIsIldvcmtlciIsIm9iamVjdFVSTCIsIlJFTVVYX0VSUk9SIiwiTVNFX0VWRU5UUyIsIlNPVVJDRV9VUERBVEVfRU5EIiwiSExTX0VWRU5UUyIsIlJFVFJZX1RJTUVfRVhDRUVERUQiLCJDUllUT19FVkVOVFMiLCJTVEFSVF9ERUNSWVBUIiwiREVDUllQVEVEIiwiQlJPV1NFUl9FVkVOVFMiLCJWSVNJQklMSVRZX0NIQU5HRSIsIkFMTEVWRU5UUyIsIkZsdkFsbG93ZWRFdmVudHMiLCJIbHNBbGxvd2VkRXZlbnRzIiwiQ09OVEVYVF9DT01PTUFORFMiLCJPTiIsIk9OQ0UiLCJPRkYiLCJFTUlUIiwiREVTVFJPWSIsIkRJUkVDVF9FTUlUX0ZMQUciLCJhbGxvd2VkRXZlbnRzIiwiX2VtaXR0ZXIiLCJfaW5zdGFuY2VNYXAiLCJfY2xzTWFwIiwiX2luaXRlZCIsIl9ob29rcyIsInRhZyIsImluc3RhbmNlIiwiaW5pdEluc3RhbmNlIiwibmV3SW5zdGFuY2UiLCJyZWdpc3RyeSIsImNscyIsImNoZWNrTWVzc2FnZU5hbWUiLCJfaXNNZXNzYWdlTmFtZVZhbGlkIiwic2VsZiIsImVuaGFuY2VkIiwib25jZUxpc3RlbmVycyIsIm1lc3NhZ2VOYW1lIiwiY2FsbGJhY2siLCJiZWZvcmVMaXN0IiwiZW1pdFRvIiwicmVtb3ZlTGlzdGVuZXJzIiwiaGFzT3duIiwiY2FsbGJhY2tzIiwiZGVzdHJveUluc3RhbmNlcyIsIm91dHB1dEJ1ZmZlciIsIm91dHB1dGJ1ZmZlciIsImNyeXB0byIsIm1zQ3J5cHRvIiwiZGVjcmlwdCIsImFlc2tleSIsInNia2V5Iiwic3VidGxlIiwiaW1wb3J0S2V5IiwiZGVjcmlwdERhdGEiLCJkZWNyeXB0IiwicmVzIiwiRXZlbnRzIiwiaGlkZGVuIiwidmlzaWJpbGl0eUNoYW5nZSIsImRvY3VtZW50IiwibXNIaWRkZW4iLCJ3ZWJraXRIaWRkZW4iLCJvblNob3ciLCJvbkhpZGRlbiIsImhhbmRsZVZpc2liaWxpdHlDaGFuZ2UiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImxlIiwic2V0SW50MTYiLCJJbnQxNkFycmF5IiwiZGV2aWNlIiwib3MiLCJpc1BjIiwiaXNUYWJsZXQiLCJ1YSIsInJlZyIsImllIiwiZmlyZm94IiwiY2hyb21lIiwib3BlcmEiLCJzYWZhcmkiLCJpc1dpbmRvd3NQaG9uZSIsImlzU3ltYmlhbiIsImlzQW5kcm9pZCIsImlzRmlyZUZveCIsImlzUGhvbmUiLCJvdXQiLCJpbnB1dCIsImZyb21DaGFyQ29kZSIsIl9jaGVja0NvbnRpbnVhdGlvbiIsInVjczQiLCJjaGVja0xlbmd0aCIsIkF1ZGlvQ3R4IiwiQXVkaW9Db250ZXh0Iiwid2Via2l0QXVkaW9Db250ZXh0IiwiZ2Fpbk5vZGUiLCJjcmVhdGVHYWluIiwiY29ubmVjdCIsImRlc3RpbmF0aW9uIiwicHJlbG9hZFRpbWUiLCJfY3VycmVudEJ1ZmZlciIsIl9uZXh0QnVmZmVyIiwiX2xhc3RwdHMiLCJfcHJlRGVjb2RlIiwiX2N1cnJlbnRUaW1lIiwiX2RlY29kaW5nIiwiX3ZvbHVtZSIsInZvbHVtZSIsIl9wbGF5ZWQiLCJwbGF5RmluaXNoIiwid2FpdE5leHRJRCIsImN1cnJlbnRUaW1lIiwiZGVjb2RlQXVkaW8iLCJzZXRBdWRpb0RhdGEiLCJkZWNvZGVBQUMiLCJzYW1wbGVEYXRhIiwiZ2V0QUFDRGF0YSIsImNvbWJpbGVEYXRhIiwiZGVjb2RlQXVkaW9EYXRhIiwiYXVkaW9Tb3VyY2UiLCJjcmVhdGVCdWZmZXJTb3VyY2UiLCJnZXRUaW1lQnVmZmVyIiwib25Tb3VyY2VFbmRlZCIsInNldFRpbWVvdXQiLCJwbGF5IiwicmVzdW1lIiwicGxheVN0YXJ0IiwiUHJvbWlzZSIsInBhdXNlIiwiYXVkaW9DdHgiLCJzdXNwZW5kIiwic2V0QXVkaW9NZXRhRGF0YSIsImNsZWFyVGltZW91dCIsImNsb3NlIiwibXV0ZWQiLCJnYWluIiwiYWR0cyIsImdldEFkdHMiLCJhYWNmcmFtZWxlbmd0aCIsIkFWUmVjb25jaWxlciIsInByb3BzIiwiYUN0eCIsInZDdHgiLCJ0aW1lb3V0SWQiLCJkb1JlY29uY2lsZSIsInZDdXJUaW1lIiwiYUN1clRpbWUiLCJIVE1MRWxlbWVudCIsIl9jYW52YXMiLCJjcmVhdGVFbGVtZW50IiwiaGFuZGxlQXVkaW9Tb3VyY2VFbmQiLCJwbGF5ZWQiLCJwZW5kaW5nUGxheVRhc2siLCJfcGF1c2VkIiwidmlkZW9NZXRhSW5pdGVkIiwiYXVkaW9NZXRhSW5pdGVkIiwiVmlkZW9DdHgiLCJjYW52YXMiLCJzdHlsZSIsInRpY2tlciIsInJlY29uY2lsZXIiLCJvbmNhbnBsYXkiLCJhcHBlbmRDaGlsZCIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsImNsZWFuQnVmZmVyIiwiX2NsZWFuQnVmZmVyIiwic3RvcCIsIm9uRGVtdXhDb21wbGV0ZSIsImRlY29kZVZpZGVvIiwic2V0QXVkaW9NZXRhIiwic2V0VmlkZW9NZXRhIiwic2V0VmlkZW9NZXRhRGF0YSIsImdldEF0dHJpYnV0ZSIsInZpZGVvV2lkdGgiLCJkaXNwbGF5IiwicHhWYWwiLCJzZXRBdHRyaWJ1dGUiLCJ2aWRlb0hlaWdodCIsInJlYWR5U3RhdGUiLCJzZWVraW5nIiwicGF1c2VkIiwicGxheWJhY2tSYXRlIiwiaGFzQXR0cmlidXRlIiwiZW5kZWQiLCJhdXRvcGxheSIsIm5vdyIsIl9vblRpbWVyIiwidm9sIiwiYXR0ck11dGVkIiwiYnVmZmVyZWQiLCJjdXN0b21FbGVtZW50cyIsImRlZmluZSIsIlNvdXJjZUJ1ZmZlciIsImN1cnJlbnRHb3AiLCJfbGFzdEdldCIsImZyYW1lIiwibmV4dEdvcCIsIl9nZXROZXh0IiwiZ29wIiwicmVtb3ZlIiwiVGlja2VyIiwiaW50ZXJ2YWwiLCJvblRpY2siLCJzZXRJbnRlcnZhbCIsIlJhZlRpY2tlciIsInByZXYiLCJ0aW1lcklkIiwiX3N1YlRpbWVySWQiLCJfdGlja0Z1bmMiLCJnZXRUaWNrRnVuYyIsInRpY2siLCJuZXh0VGljayIsImNhbmNlbEZ1bmMiLCJnZXRDYW5jZWxGdW5jIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSIsImlzU3VwcG9ydGVkIiwiVGltZW91dFRpY2tlciIsImNsZWFySW50ZXJ2YWwiLCJnZXRUaWNrZXIiLCJWaWRlb0NhbnZhcyIsIm9uRmlyc3RGcmFtZSIsInJlYWR5U3RhdHVzIiwibGFzdFBsYXllZCIsIl9kZWNvZGVySW5pdGVkIiwiX2F2Y2NwdXNoZWQiLCJfZGVjb2RlZEZyYW1lcyIsIl9sYXN0U2FtcGxlRHRzIiwiX2Jhc2VEdHMiLCJfbGFzdFJlbmRlclRpbWUiLCJpbml0V2FzbVdvcmtlciIsIndhc213b3JrZXIiLCJwb3N0TWVzc2FnZSIsIm1zZyIsIl9vbkRlY29kZWQiLCJ5dXZDYW52YXMiLCJZVVZDYW52YXMiLCJfcHJlbG9hZCIsIl9hbmFseXNlTmFsIiwiZnJhbWVUaW1lcyIsImZyYW1lVGltZSIsInJlbmRlciIsInlMaW5lc2l6ZSIsInV2TGluZXNpemUiLCJyYW5nZXMiLCJjdXJyZW50UmFuZ2UiLCJUaW1lUmFuZ2VzIiwiTUFYX1NUUkVBTV9CVUZGRVJfTEVOR1RIIiwiRGVjb2RlciIsImluaXRlZCIsImluZm9saXN0IiwicGFyX2Jyb2Fkd2F5T25Ccm9hZHdheUluaXRlZCIsImJyb2Fkd2F5T25Ccm9hZHdheUluaXRlZCIsInBhcl9icm9hZHdheU9uUGljdHVyZURlY29kZWQiLCJicm9hZHdheU9uUGljdHVyZURlY29kZWQiLCJ0b1U4QXJyYXkiLCJwdHIiLCJIRUFQVTgiLCJNb2R1bGUiLCJfYnJvYWR3YXlJbml0Iiwic3RyZWFtQnVmZmVyIiwiX2Jyb2Fkd2F5Q3JlYXRlU3RyZWFtIiwiaW5mb2lkIiwieVJvd2NvdW50IiwidXZSb3djb3VudCIsImRhdGV0ZW1wIiwiZ2V0VGltZSIsIl9icm9hZHdheVBsYXlTdHJlYW0iLCJfYnJvYWR3YXlFeGl0IiwiZGVjb2RlciIsIm9uUG9zdFJ1biIsImltcG9ydFNjcmlwdHMiLCJhZGRPblBvc3RSdW4iLCJsb2ciLCJfaW5pdENvbnRleHRHTCIsImNvbnRleHRHTCIsIl9pbml0UHJvZ3JhbSIsIl9pbml0QnVmZmVycyIsIl9pbml0VGV4dHVyZXMiLCJnbCIsInZhbGlkQ29udGV4dE5hbWVzIiwibmFtZUluZGV4IiwiY29udGV4dE5hbWUiLCJjb250ZXh0T3B0aW9ucyIsImdldENvbnRleHQiLCJnZXRQYXJhbWV0ZXIiLCJ2ZXJ0ZXhTaGFkZXJTY3JpcHQiLCJmcmFnbWVudFNoYWRlclNjcmlwdCIsIllVVjJSR0IiLCJ2ZXJ0ZXhTaGFkZXIiLCJjcmVhdGVTaGFkZXIiLCJWRVJURVhfU0hBREVSIiwic2hhZGVyU291cmNlIiwiY29tcGlsZVNoYWRlciIsImdldFNoYWRlclBhcmFtZXRlciIsIkNPTVBJTEVfU1RBVFVTIiwiZ2V0U2hhZGVySW5mb0xvZyIsImZyYWdtZW50U2hhZGVyIiwiRlJBR01FTlRfU0hBREVSIiwiY3JlYXRlUHJvZ3JhbSIsImF0dGFjaFNoYWRlciIsImxpbmtQcm9ncmFtIiwiZ2V0UHJvZ3JhbVBhcmFtZXRlciIsIkxJTktfU1RBVFVTIiwiZ2V0UHJvZ3JhbUluZm9Mb2ciLCJ1c2VQcm9ncmFtIiwiWVVWMlJHQlJlZiIsImdldFVuaWZvcm1Mb2NhdGlvbiIsInVuaWZvcm1NYXRyaXg0ZnYiLCJzaGFkZXJQcm9ncmFtIiwidmVydGV4UG9zQnVmZmVyIiwiY3JlYXRlQnVmZmVyIiwiYmluZEJ1ZmZlciIsIkFSUkFZX0JVRkZFUiIsImJ1ZmZlckRhdGEiLCJGbG9hdDMyQXJyYXkiLCJTVEFUSUNfRFJBVyIsInZlcnRleFBvc1JlZiIsImdldEF0dHJpYkxvY2F0aW9uIiwiZW5hYmxlVmVydGV4QXR0cmliQXJyYXkiLCJ2ZXJ0ZXhBdHRyaWJQb2ludGVyIiwiRkxPQVQiLCJ0ZXh0dXJlUG9zQnVmZmVyIiwidGV4dHVyZVBvc1JlZiIsInVUZXh0dXJlUG9zQnVmZmVyIiwidVRleHR1cmVQb3NSZWYiLCJ2VGV4dHVyZVBvc0J1ZmZlciIsInZUZXh0dXJlUG9zUmVmIiwieVRleHR1cmVSZWYiLCJfaW5pdFRleHR1cmUiLCJ5U2FtcGxlclJlZiIsInVuaWZvcm0xaSIsInVUZXh0dXJlUmVmIiwidVNhbXBsZXJSZWYiLCJ2VGV4dHVyZVJlZiIsInZTYW1wbGVyUmVmIiwidGV4dHVyZVJlZiIsImNyZWF0ZVRleHR1cmUiLCJiaW5kVGV4dHVyZSIsIlRFWFRVUkVfMkQiLCJ0ZXhQYXJhbWV0ZXJpIiwiVEVYVFVSRV9NQUdfRklMVEVSIiwiTkVBUkVTVCIsIlRFWFRVUkVfTUlOX0ZJTFRFUiIsIlRFWFRVUkVfV1JBUF9TIiwiQ0xBTVBfVE9fRURHRSIsIlRFWFRVUkVfV1JBUF9UIiwiX2RyYXdQaWN0dXJlR0wiLCJ5bGVuIiwidXZsZW4iLCJyZW5kZXJEYXRhIiwieURhdGEiLCJ1RGF0YSIsInZEYXRhIiwiX2RyYXdQaWN0dXJlR0w0MjAiLCJ5RGF0YVBlclJvdyIsInlSb3dDbnQiLCJ1RGF0YVBlclJvdyIsInVSb3dDbnQiLCJ2RGF0YVBlclJvdyIsInZSb3dDbnQiLCJyYXRpb3ciLCJyYXRpb2giLCJsZWZ0IiwidG9wIiwidmlld3BvcnQiLCJ0ZXh0dXJlUG9zVmFsdWVzIiwiRFlOQU1JQ19EUkFXIiwidVRleHR1cmVQb3NWYWx1ZXMiLCJ2VGV4dHVyZVBvc1ZhbHVlcyIsImFjdGl2ZVRleHR1cmUiLCJURVhUVVJFMCIsInRleEltYWdlMkQiLCJMVU1JTkFOQ0UiLCJVTlNJR05FRF9CWVRFIiwiVEVYVFVSRTEiLCJURVhUVVJFMiIsImRyYXdBcnJheXMiLCJUUklBTkdMRV9TVFJJUCIsIl9kcmF3UGljdHVyZVJHQiIsImlkeCIsImFkZCIsInJhbmdlIiwiaXNPYmplY3RGaWxsZWQiLCJtaW1lVHlwZSIsImlzQ29tcGxldGUiLCJpc0Jhc2VJbmZvUmVhZHkiLCJpc1ZpZGVvUmVhZHkiLCJpc0F1ZGlvUmVhZHkiLCJfZGVmYXVsdCIsImdldERlZmF1bHRJbmYiLCJlbnRyaWVzIiwidiIsImlzUkFQIiwiX3R5cGUiLCJfbGFzdEFwcGVuZExvY2F0aW9uIiwiaXNFbXB0eSIsIl9zZWFyY2hOZWFyZXN0U2VnbWVudEJlZm9yZSIsImJlZ2luRHRzIiwibGFzdCIsIm1pZCIsImxib3VuZCIsInVib3VuZCIsIl9zZWFyY2hOZWFyZXN0U2VnbWVudEFmdGVyIiwic2VnbWVudCIsImxhc3RBcHBlbmRJZHgiLCJpbnNlcnRJZHgiLCJvcmlnaW5TdGFydER0cyIsImdldExhc3RTZWdtZW50QmVmb3JlIiwiZ2V0TGFzdFNhbXBsZUJlZm9yZSIsImdldExhc3RSQVBCZWZvcmUiLCJzZWdtZW50SWR4IiwicmFuZG9tQWNjZXNzUG9pbnRzIiwic3RhcnREdHMiLCJlbmREdHMiLCJzdGFydFB0cyIsImVuZFB0cyIsIm9yaWdpbkVuZER0cyIsImFkZFJBUCIsIk1TRSIsImNvbnRhaW5lciIsIm1lZGlhU291cmNlIiwic291cmNlQnVmZmVycyIsIm9uU291cmNlT3BlbiIsIm9uVGltZVVwZGF0ZSIsIm9uVXBkYXRlRW5kIiwib25XYWl0aW5nIiwiTWVkaWFTb3VyY2UiLCJhZGRTb3VyY2VCdWZmZXJzIiwiZG9BcHBlbmQiLCJkdXIiLCJtaW1lIiwic291cmNlQnVmZmVyIiwiYWRkU291cmNlQnVmZmVyIiwidXBkYXRpbmciLCJhcHBlbmRCdWZmZXIiLCJlbmRPZlN0cmVhbSIsImFjdGl2ZVNvdXJjZUJ1ZmZlcnMiLCJyZW1vdmVCdWZmZXJzIiwidGFza0xpc3QiLCJ0YXNrIiwiZG9DbGVhbkJ1ZmZlciIsInJldHJ5VGltZSIsImNsZWFuIiwiY2xlYXJCdWZmZXIiLCJyZW1vdmVTb3VyY2VCdWZmZXIiLCJyZXZva2VPYmplY3RVUkwiLCJiRW5kIiwicmVhZEFzSW50IiwidGVtcCIsInBhZFN0YXJ0NEhleCIsImhleE51bSIsImhleFN0ciIsInBhZFN0YXJ0IiwibG9vcCIsInNpZ24iLCJyZWFkVWludDY0IiwicmVhZEludDE2IiwicmVhZEludDMyIiwiVGFnIiwiTG9nZ2VyIiwiRmx2Q29udHJvbGxlciIsInBsYXllciIsIl9wbGF5ZXIiLCJpbml0U2VnbWVudEFycml2ZWQiLCJpbml0TGlzdGVuZXJzIiwiX2hhbmRsZUxvYWRlckRhdGFMb2FkZWQiLCJfaGFuZGxlTmV0d29ya0Vycm9yIiwiX2hhbmRsZU1lZGlhSW5mbyIsIl9oYW5kbGVNZXRhZGF0YVBhcnNlZCIsIl9oYW5kbGVEZW11eENvbXBsZXRlIiwiX2hhbmRsZURlbXV4RXJyb3IiLCJfc2V0TWV0YVRvQXVkaW8iLCJfc2V0TWV0YVRvVmlkZW8iLCJfaGFuZGxlQXBwZW5kSW5pdFNlZ21lbnQiLCJQbGF5ZXIiLCJFcnJvcnMiLCJsb2FkRGF0YSIsImxvYWRlciIsInJlc29sdmVWaWRlb0dPUCIsImZpcnN0SWZyYW1lSWR4IiwibGFzdElmcmFtZUlkeCIsInRlbXBTYW1wbGVzIiwicmVzdCIsImZsdkFsbG93ZWRFdmVudHMiLCJGbHZQbGF5ZXIiLCJtZWRpYVR5cGUiLCJvdXRsaW5lIiwiaW5pdEV2ZW50cyIsImluaXRGbHYiLCJmbHYiLCJpbml0Rmx2RXZlbnRzIiwidXRpbCIsImFkZENsYXNzIiwicm9vdCIsImZpbmREb20iLCJsaXZlIiwiY3JlYXRlRG9tIiwiY29udHJvbHMiLCJ0aW1lciIsImdldEJ1ZmZlcmVkUmFuZ2UiLCJGTFYiLCJfaGFzU3RhcnQiLCJfZGVzdHJveSIsImFkZExpdmVGbGFnIiwiY3VycmVudFNyYyJdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixJQUFJQSxJQUFJLE9BQU9DLE9BQVAsS0FBbUIsUUFBbkIsR0FBOEJBLE9BQTlCLEdBQXdDLElBQWhEO0FBQ0EsSUFBSUMsZUFBZUYsS0FBSyxPQUFPQSxFQUFFRyxLQUFULEtBQW1CLFVBQXhCLEdBQ2ZILEVBQUVHLEtBRGEsR0FFZixTQUFTRCxZQUFULENBQXNCRSxNQUF0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QUNULFdBQU8sS0FBSytwQyxVQUFaO0FBQ0Q7O0FBRUQsTUFBSS9wQyxHQUFKLENBQVMwUCxHQUFULEVBQWM7QUFDWixTQUFLMDNCLE1BQUwsQ0FBWTc3QixNQUFaLENBQW1CbUUsR0FBbkIsR0FBeUJBLEdBQXpCO0FBQ0EsUUFBSSxDQUFDLEtBQUs4bEIsTUFBVixFQUFrQjtBQUNoQixXQUFLckQsS0FBTDtBQUNBLFdBQUszaEMsSUFBTCxDQUFVLE9BQVYsRUFBbUIsTUFBTTtBQUN2QixhQUFLZ0QsS0FBTCxDQUFXa2MsR0FBWDtBQUNELE9BRkQ7QUFHQSxXQUFLbGYsSUFBTCxDQUFVLFNBQVYsRUFBcUIsTUFBTTtBQUN6QixhQUFLdWhDLElBQUw7QUFDRCxPQUZEO0FBR0QsS0FSRCxNQVFPO0FBQ0wsV0FBS3YrQixLQUFMLENBQVdrYyxHQUFYO0FBQ0Q7QUFDRCxTQUFLbGYsSUFBTCxDQUFVLFNBQVYsRUFBcUIsTUFBTTtBQUN6QixXQUFLMGdDLFdBQUwsR0FBbUIsQ0FBbkI7QUFDRCxLQUZEO0FBR0Q7QUEzSTRCOztBQThJL0J6a0MsT0FBT0MsT0FBUCxHQUFpQmk4QyxTQUFqQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25KQSxhQUFhLG1DQUFtQyxFQUFFLEkiLCJmaWxlIjoibW9iaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFIgPSB0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgPyBSZWZsZWN0IDogbnVsbFxudmFyIFJlZmxlY3RBcHBseSA9IFIgJiYgdHlwZW9mIFIuYXBwbHkgPT09ICdmdW5jdGlvbidcbiAgPyBSLmFwcGx5XG4gIDogZnVuY3Rpb24gUmVmbGVjdEFwcGx5KHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwodGFyZ2V0LCByZWNlaXZlciwgYXJncyk7XG4gIH1cblxudmFyIFJlZmxlY3RPd25LZXlzXG5pZiAoUiAmJiB0eXBlb2YgUi5vd25LZXlzID09PSAnZnVuY3Rpb24nKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gUi5vd25LZXlzXG59IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KVxuICAgICAgLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkpO1xuICB9O1xufSBlbHNlIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gUHJvY2Vzc0VtaXRXYXJuaW5nKHdhcm5pbmcpIHtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSBjb25zb2xlLndhcm4od2FybmluZyk7XG59XG5cbnZhciBOdW1iZXJJc05hTiA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiBOdW1iZXJJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHNDb3VudCA9IDA7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbnZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudEVtaXR0ZXIsICdkZWZhdWx0TWF4TGlzdGVuZXJzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyB8fCBhcmcgPCAwIHx8IE51bWJlcklzTmFOKGFyZykpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIGFyZyArICcuJyk7XG4gICAgfVxuICAgIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBhcmc7XG4gIH1cbn0pO1xuXG5FdmVudEVtaXR0ZXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gIGlmICh0aGlzLl9ldmVudHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgTnVtYmVySXNOYU4obikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBuICsgJy4nKTtcbiAgfVxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uICRnZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuICRnZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICB2YXIgZG9FcnJvciA9ICh0eXBlID09PSAnZXJyb3InKTtcblxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpXG4gICAgZG9FcnJvciA9IChkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PT0gdW5kZWZpbmVkKTtcbiAgZWxzZSBpZiAoIWRvRXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICB2YXIgZXI7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMClcbiAgICAgIGVyID0gYXJnc1swXTtcbiAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgLy8gTm90ZTogVGhlIGNvbW1lbnRzIG9uIHRoZSBgdGhyb3dgIGxpbmVzIGFyZSBpbnRlbnRpb25hbCwgdGhleSBzaG93XG4gICAgICAvLyB1cCBpbiBOb2RlJ3Mgb3V0cHV0IGlmIHRoaXMgcmVzdWx0cyBpbiBhbiB1bmhhbmRsZWQgZXhjZXB0aW9uLlxuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgfVxuICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmhhbmRsZWQgZXJyb3IuJyArIChlciA/ICcgKCcgKyBlci5tZXNzYWdlICsgJyknIDogJycpKTtcbiAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgIHRocm93IGVycjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgfVxuXG4gIHZhciBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIFJlZmxlY3RBcHBseShoYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgUmVmbGVjdEFwcGx5KGxpc3RlbmVyc1tpXSwgdGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldC5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA/IGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gICAgICAvLyBSZS1hc3NpZ24gYGV2ZW50c2AgYmVjYXVzZSBhIG5ld0xpc3RlbmVyIGhhbmRsZXIgY291bGQgaGF2ZSBjYXVzZWQgdGhlXG4gICAgICAvLyB0aGlzLl9ldmVudHMgdG8gYmUgYXNzaWduZWQgdG8gYSBuZXcgb2JqZWN0XG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPVxuICAgICAgICBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOiBbZXhpc3RpbmcsIGxpc3RlbmVyXTtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB9IGVsc2UgaWYgKHByZXBlbmQpIHtcbiAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdGluZy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICAgIG0gPSAkZ2V0TWF4TGlzdGVuZXJzKHRhcmdldCk7XG4gICAgaWYgKG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0gJiYgIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgIC8vIE5vIGVycm9yIGNvZGUgZm9yIHRoaXMgc2luY2UgaXQgaXMgYSBXYXJuaW5nXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIHZhciB3ID0gbmV3IEVycm9yKCdQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5sZW5ndGggKyAnICcgKyBTdHJpbmcodHlwZSkgKyAnIGxpc3RlbmVycyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luY3JlYXNlIGxpbWl0Jyk7XG4gICAgICB3Lm5hbWUgPSAnTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nJztcbiAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgIHcudHlwZSA9IHR5cGU7XG4gICAgICB3LmNvdW50ID0gZXhpc3RpbmcubGVuZ3RoO1xuICAgICAgUHJvY2Vzc0VtaXRXYXJuaW5nKHcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcblxuZnVuY3Rpb24gb25jZVdyYXBwZXIoKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgaWYgKCF0aGlzLmZpcmVkKSB7XG4gICAgdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLCB0aGlzLndyYXBGbik7XG4gICAgdGhpcy5maXJlZCA9IHRydWU7XG4gICAgUmVmbGVjdEFwcGx5KHRoaXMubGlzdGVuZXIsIHRoaXMudGFyZ2V0LCBhcmdzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfb25jZVdyYXAodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgc3RhdGUgPSB7IGZpcmVkOiBmYWxzZSwgd3JhcEZuOiB1bmRlZmluZWQsIHRhcmdldDogdGFyZ2V0LCB0eXBlOiB0eXBlLCBsaXN0ZW5lcjogbGlzdGVuZXIgfTtcbiAgdmFyIHdyYXBwZWQgPSBvbmNlV3JhcHBlci5iaW5kKHN0YXRlKTtcbiAgd3JhcHBlZC5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICBzdGF0ZS53cmFwRm4gPSB3cmFwcGVkO1xuICByZXR1cm4gd3JhcHBlZDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cbiAgdGhpcy5vbih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRPbmNlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGxpc3QgPSBldmVudHNbdHlwZV07XG4gICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8IGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0Lmxpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgICAgIGZvciAoaSA9IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHwgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsTGlzdGVuZXIgPSBsaXN0W2ldLmxpc3RlbmVyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09IDApXG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcGxpY2VPbmUobGlzdCwgcG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKVxuICAgICAgICAgIGV2ZW50c1t0eXBlXSA9IGxpc3RbMF07XG5cbiAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBvcmlnaW5hbExpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cywgaTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRzW3R5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV07XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuZnVuY3Rpb24gX2xpc3RlbmVycyh0YXJnZXQsIHR5cGUsIHVud3JhcCkge1xuICB2YXIgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgaWYgKGV2bGlzdGVuZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiB1bndyYXAgPyBbZXZsaXN0ZW5lci5saXN0ZW5lciB8fCBldmxpc3RlbmVyXSA6IFtldmxpc3RlbmVyXTtcblxuICByZXR1cm4gdW53cmFwID9cbiAgICB1bndyYXBMaXN0ZW5lcnMoZXZsaXN0ZW5lcikgOiBhcnJheUNsb25lKGV2bGlzdGVuZXIsIGV2bGlzdGVuZXIubGVuZ3RoKTtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCB0cnVlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmF3TGlzdGVuZXJzID0gZnVuY3Rpb24gcmF3TGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5saXN0ZW5lckNvdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGlzdGVuZXJDb3VudC5jYWxsKGVtaXR0ZXIsIHR5cGUpO1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBsaXN0ZW5lckNvdW50O1xuZnVuY3Rpb24gbGlzdGVuZXJDb3VudCh0eXBlKSB7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHJldHVybiB0aGlzLl9ldmVudHNDb3VudCA+IDAgPyBSZWZsZWN0T3duS2V5cyh0aGlzLl9ldmVudHMpIDogW107XG59O1xuXG5mdW5jdGlvbiBhcnJheUNsb25lKGFyciwgbikge1xuICB2YXIgY29weSA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpXG4gICAgY29weVtpXSA9IGFycltpXTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKDsgaW5kZXggKyAxIDwgbGlzdC5sZW5ndGg7IGluZGV4KyspXG4gICAgbGlzdFtpbmRleF0gPSBsaXN0W2luZGV4ICsgMV07XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhhcnIpIHtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyArK2kpIHtcbiAgICByZXRbaV0gPSBhcnJbaV0ubGlzdGVuZXIgfHwgYXJyW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgVHJhY2s6IHJlcXVpcmUoJy4vc3JjL3RyYWNrJykuZGVmYXVsdCxcbiAgVHJhY2tzOiByZXF1aXJlKCcuL3NyYy90cmFjaycpLlRyYWNrcyxcbiAgQXVkaW9UcmFjazogcmVxdWlyZSgnLi9zcmMvdHJhY2snKS5BdWRpb1RyYWNrLFxuICBWaWRlb1RyYWNrOiByZXF1aXJlKCcuL3NyYy90cmFjaycpLlZpZGVvVHJhY2ssXG5cbiAgWGdCdWZmZXI6IHJlcXVpcmUoJy4vc3JjL2J1ZmZlcicpLlhnQnVmZmVyLFxuICBSZW11eEJ1ZmZlcjogcmVxdWlyZSgnLi9zcmMvYnVmZmVyJykuUmVtdXhCdWZmZXIsXG5cbiAgUHJlU291cmNlOiByZXF1aXJlKCcuL3NyYy9wcmVzb3VjZScpLmRlZmF1bHRcbn07XG4iLCJleHBvcnQgY2xhc3MgWGdCdWZmZXIge1xuICAvKipcbiAgICogQSBidWZmZXIgdG8gc3RvcmUgbG9hZGVkIGRhdGEuXG4gICAqXG4gICAqIEBjbGFzcyBMb2FkZXJCdWZmZXJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aCAtIE9wdGlvbmFsIHRoZSBidWZmZXIgc2l6ZVxuICAgKi9cbiAgY29uc3RydWN0b3IgKGxlbmd0aCkge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoIHx8IDBcbiAgICB0aGlzLmhpc3RvcnlMZW4gPSBsZW5ndGggfHwgMFxuICAgIHRoaXMuYXJyYXkgPSBbXVxuICAgIHRoaXMub2Zmc2V0ID0gMFxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBmdW5jdGlvbiB0byBwdXNoIGRhdGEuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBkYXRhIC0gVGhlIGRhdGEgdG8gcHVzaCBpbnRvIHRoZSBidWZmZXJcbiAgICovXG4gIHB1c2ggKGRhdGEpIHtcbiAgICB0aGlzLmFycmF5LnB1c2goZGF0YSlcbiAgICB0aGlzLmxlbmd0aCArPSBkYXRhLmJ5dGVMZW5ndGhcbiAgICB0aGlzLmhpc3RvcnlMZW4gKz0gZGF0YS5ieXRlTGVuZ3RoXG4gIH1cblxuICAvKipcbiAgICogVGhlIGZ1bmN0aW9uIHRvIHNoaWZ0IGRhdGEuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSBUaGUgc2l6ZSBvZiBzaGlmdC5cbiAgICovXG4gIHNoaWZ0IChsZW5ndGgpIHtcbiAgICBpZiAodGhpcy5hcnJheS5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoMClcbiAgICB9XG5cbiAgICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zaGlmdEJ1ZmZlcigpXG4gICAgfVxuICAgIGlmICgodGhpcy5vZmZzZXQgKyBsZW5ndGgpID09PSB0aGlzLmFycmF5WzBdLmxlbmd0aCkge1xuICAgICAgbGV0IHJldCA9IHRoaXMuYXJyYXlbMF0uc2xpY2UodGhpcy5vZmZzZXQsIHRoaXMub2Zmc2V0ICsgbGVuZ3RoKVxuICAgICAgdGhpcy5vZmZzZXQgPSAwXG4gICAgICB0aGlzLmFycmF5LnNoaWZ0KClcbiAgICAgIHRoaXMubGVuZ3RoIC09IGxlbmd0aFxuICAgICAgcmV0dXJuIHJldFxuICAgIH1cblxuICAgIGlmICgodGhpcy5vZmZzZXQgKyBsZW5ndGgpIDwgdGhpcy5hcnJheVswXS5sZW5ndGgpIHtcbiAgICAgIGxldCByZXQgPSB0aGlzLmFycmF5WzBdLnNsaWNlKHRoaXMub2Zmc2V0LCB0aGlzLm9mZnNldCArIGxlbmd0aClcbiAgICAgIHRoaXMub2Zmc2V0ICs9IGxlbmd0aFxuICAgICAgdGhpcy5sZW5ndGggLT0gbGVuZ3RoXG4gICAgICByZXR1cm4gcmV0XG4gICAgfVxuXG4gICAgbGV0IHJldCA9IG5ldyBVaW50OEFycmF5KGxlbmd0aClcbiAgICBsZXQgdG1wb2ZmID0gMFxuICAgIHdoaWxlICh0aGlzLmFycmF5Lmxlbmd0aCA+IDAgJiYgbGVuZ3RoID4gMCkge1xuICAgICAgaWYgKCh0aGlzLm9mZnNldCArIGxlbmd0aCkgPCB0aGlzLmFycmF5WzBdLmxlbmd0aCkge1xuICAgICAgICBsZXQgdG1wID0gdGhpcy5hcnJheVswXS5zbGljZSh0aGlzLm9mZnNldCwgdGhpcy5vZmZzZXQgKyBsZW5ndGgpXG4gICAgICAgIHJldC5zZXQodG1wLCB0bXBvZmYpXG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IGxlbmd0aFxuICAgICAgICB0aGlzLmxlbmd0aCAtPSBsZW5ndGhcbiAgICAgICAgbGVuZ3RoID0gMFxuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHRlbXBsZW5ndGggPSB0aGlzLmFycmF5WzBdLmxlbmd0aCAtIHRoaXMub2Zmc2V0XG4gICAgICAgIHJldC5zZXQodGhpcy5hcnJheVswXS5zbGljZSh0aGlzLm9mZnNldCwgdGhpcy5hcnJheVswXS5sZW5ndGgpLCB0bXBvZmYpXG4gICAgICAgIHRoaXMuYXJyYXkuc2hpZnQoKVxuICAgICAgICB0aGlzLm9mZnNldCA9IDBcbiAgICAgICAgdG1wb2ZmICs9IHRlbXBsZW5ndGhcbiAgICAgICAgdGhpcy5sZW5ndGggLT0gdGVtcGxlbmd0aFxuICAgICAgICBsZW5ndGggLT0gdGVtcGxlbmd0aFxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0XG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gdG8gY2xlYXIgdGhlIGJ1ZmZlci5cbiAgICovXG4gIGNsZWFyICgpIHtcbiAgICB0aGlzLmFycmF5ID0gW11cbiAgICB0aGlzLmxlbmd0aCA9IDBcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuY2xlYXIoKVxuICAgIHRoaXMuaGlzdG9yeUxlbiA9IDBcbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0byBzaGlmdCBvbmUgdW5pdDhBcnJheS5cbiAgICovXG4gIF9zaGlmdEJ1ZmZlciAoKSB7XG4gICAgdGhpcy5sZW5ndGggLT0gdGhpcy5hcnJheVswXS5sZW5ndGhcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgICByZXR1cm4gdGhpcy5hcnJheS5zaGlmdCgpXG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCB1aW50OCBkYXRhIHRvIG51bWJlci5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IC0gdGhlIHN0YXJ0IHBvc3Rpb24uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSB0aGUgbGVuZ3RoIG9mIGRhdGEuXG4gICAqL1xuICB0b0ludCAoc3RhcnQsIGxlbmd0aCkge1xuICAgIGxldCByZXRJbnQgPSAwXG4gICAgbGV0IGkgPSB0aGlzLm9mZnNldCArIHN0YXJ0XG4gICAgd2hpbGUgKGkgPCB0aGlzLm9mZnNldCArIGxlbmd0aCArIHN0YXJ0KSB7XG4gICAgICBpZiAoaSA8IHRoaXMuYXJyYXlbMF0ubGVuZ3RoKSB7XG4gICAgICAgIHJldEludCA9IHJldEludCAqIDI1NiArIHRoaXMuYXJyYXlbMF1baV1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hcnJheVsxXSkge1xuICAgICAgICByZXRJbnQgPSByZXRJbnQgKiAyNTYgKyB0aGlzLmFycmF5WzFdW2kgLSB0aGlzLmFycmF5WzBdLmxlbmd0aF1cbiAgICAgIH1cblxuICAgICAgaSsrXG4gICAgfVxuICAgIHJldHVybiByZXRJbnRcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVtdXhCdWZmZXIge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy52aWRlbyA9IFtdXG4gICAgdGhpcy5hdWRpbyA9IFtdXG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLnZpZGVvID0gW11cbiAgICB0aGlzLmF1ZGlvID0gW11cbiAgfVxufVxuIiwiY2xhc3MgU291cmNlIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMubWltZXR5cGUgPSAnJztcbiAgICB0aGlzLmluaXQgPSBudWxsO1xuICAgIHRoaXMuZGF0YSA9IFtdO1xuICB9XG59XG5cbmNsYXNzIFByZVNvdXJjZSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLnNvdXJjZXMgPSB7fTtcbiAgfVxuXG4gIGdldFNvdXJjZSAoc291cmNlKSB7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlc1tzb3VyY2VdO1xuICB9XG5cbiAgY3JlYXRlU291cmNlIChuYW1lKSB7XG4gICAgdGhpcy5zb3VyY2VzW25hbWVdID0gbmV3IFNvdXJjZSgpO1xuICAgIHJldHVybiB0aGlzLnNvdXJjZXNbbmFtZV07XG4gIH1cblxuICBjbGVhciAoKSB7XG4gICAgdGhpcy5zb3VyY2VzID0ge307XG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLnNvdXJjZXMgPSB7fTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcmVTb3VyY2U7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUcmFjayB7XG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IuXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5pZCA9IC0xXG4gICAgdGhpcy5zZXF1ZW5jZU51bWJlciA9IDBcbiAgICB0aGlzLnNhbXBsZXMgPSBbXVxuICAgIHRoaXMuZHJvcHBlZFNhbXBsZXMgPSBbXVxuICAgIHRoaXMubGVuZ3RoID0gMFxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSB0cmFjay5cbiAgICovXG4gIHJlc2V0ICgpIHtcbiAgICB0aGlzLnNlcXVlbmNlTnVtYmVyID0gMFxuICAgIHRoaXMuc2FtcGxlcyA9IFtdXG4gICAgdGhpcy5sZW5ndGggPSAwXG4gIH1cbiAgLyoqXG4gICAqIGRlc3Ryb3kgdGhlIHRyYWNrLlxuICAgKi9cbiAgZGlzdHJveSAoKSB7XG4gICAgdGhpcy5yZXNldCgpXG4gICAgdGhpcy5pZCA9IC0xXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEF1ZGlvVHJhY2sgZXh0ZW5kcyBUcmFjayB7XG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIGF1ZGlvIHRyYWNrLlxuICAgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLlRBRyA9ICdBdWRpb1RyYWNrJ1xuICAgIHRoaXMudHlwZSA9ICdhdWRpbydcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVmlkZW9UcmFjayBleHRlbmRzIFRyYWNrIHtcbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdmlkZW8gdHJhY2suXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuVEFHID0gJ1ZpZGVvVHJhY2snXG4gICAgdGhpcy50eXBlID0gJ3ZpZGVvJ1xuICAgIHRoaXMuZHJvcHBlZCA9IDBcbiAgfVxuICAvKipcbiAgICogcmVzZXQgdGhlIHZpZGVvIHRyYWNrLlxuICAgKi9cbiAgcmVzZXQgKCkge1xuICAgIHRoaXMuc2VxdWVuY2VOdW1iZXIgPSAwXG4gICAgdGhpcy5zYW1wbGVzID0gW11cbiAgICB0aGlzLmxlbmd0aCA9IDBcbiAgICB0aGlzLmRyb3BwZWQgPSAwXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRyYWNrcyB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLmF1ZGlvVHJhY2sgPSBudWxsXG4gICAgdGhpcy52aWRlb1RyYWNrID0gbnVsbFxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5hdWRpb1RyYWNrID0gbnVsbFxuICAgIHRoaXMudmlkZW9UcmFjayA9IG51bGxcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIE5hbHVuaXQ6IHJlcXVpcmUoJy4vc3JjL2gyNjQvbmFsdW5pdCcpLmRlZmF1bHQsXG4gIFNwc1BhcnNlcjogcmVxdWlyZSgnLi9zcmMvaDI2NC9uYWx1bml0L3NwcycpLmRlZmF1bHQsXG5cbiAgQ29tcGF0aWJpbGl0eTogcmVxdWlyZSgnLi9zcmMvY29tcGF0aWJpbGl0eScpLmRlZmF1bHRcbn07XG4iLCJcbmNsYXNzIEFBQyB7XG5cbiAgc3RhdGljIGdldFNpbGVudEZyYW1lKGNvZGVjLCBjaGFubmVsQ291bnQpIHtcbiAgICBpZiAoY29kZWMgPT09ICdtcDRhLjQwLjInKSB7XG4gICAgICAvLyBoYW5kbGUgTEMtQUFDXG4gICAgICBpZiAoY2hhbm5lbENvdW50ID09PSAxKSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMywgMHg4MF0pO1xuICAgICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDIxLCAweDAwLCAweDQ5LCAweDkwLCAweDAyLCAweDE5LCAweDAwLCAweDIzLCAweDgwXSk7XG4gICAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gMykge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4OGVdKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSA0KSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4MCwgMHgyYywgMHg4MCwgMHgwOCwgMHgwMiwgMHgzOF0pO1xuICAgICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDAwLCAweGM4LCAweDAwLCAweDgwLCAweDIwLCAweDg0LCAweDAxLCAweDI2LCAweDQwLCAweDA4LCAweDY0LCAweDAwLCAweDgyLCAweDMwLCAweDA0LCAweDk5LCAweDAwLCAweDIxLCAweDkwLCAweDAyLCAweDM4XSk7XG4gICAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gNikge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4ODIsIDB4MzAsIDB4MDQsIDB4OTksIDB4MDAsIDB4MjEsIDB4OTAsIDB4MDIsIDB4MDAsIDB4YjIsIDB4MDAsIDB4MjAsIDB4MDgsIDB4ZTBdKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaGFuZGxlIEhFLUFBQyAobXA0YS40MC41IC8gbXA0YS40MC4yOSlcbiAgICAgIGlmIChjaGFubmVsQ291bnQgPT09IDEpIHtcbiAgICAgICAgLy8gZmZtcGVnIC15IC1mIGxhdmZpIC1pIFwiYWV2YWxzcmM9MDpkPTAuMDVcIiAtYzphIGxpYmZka19hYWMgLXByb2ZpbGU6YSBhYWNfaGUgLWI6YSA0ayBvdXRwdXQuYWFjICYmIGhleGR1bXAgLXYgLWUgJzE2LzEgXCIweCV4LFwiIFwiXFxuXCInIC12IG91dHB1dC5hYWNcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDEsIDB4NDAsIDB4MjIsIDB4ODAsIDB4YTMsIDB4NGUsIDB4ZTYsIDB4ODAsIDB4YmEsIDB4OCwgMHgwLCAweDAsIDB4MCwgMHgxYywgMHg2LCAweGYxLCAweGMxLCAweGEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWVdKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSAyKSB7XG4gICAgICAgIC8vIGZmbXBlZyAteSAtZiBsYXZmaSAtaSBcImFldmFsc3JjPTB8MDpkPTAuMDVcIiAtYzphIGxpYmZka19hYWMgLXByb2ZpbGU6YSBhYWNfaGVfdjIgLWI6YSA0ayBvdXRwdXQuYWFjICYmIGhleGR1bXAgLXYgLWUgJzE2LzEgXCIweCV4LFwiIFwiXFxuXCInIC12IG91dHB1dC5hYWNcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDEsIDB4NDAsIDB4MjIsIDB4ODAsIDB4YTMsIDB4NWUsIDB4ZTYsIDB4ODAsIDB4YmEsIDB4OCwgMHgwLCAweDAsIDB4MCwgMHgwLCAweDk1LCAweDAsIDB4NiwgMHhmMSwgMHhhMSwgMHhhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVlXSk7XG4gICAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gMykge1xuICAgICAgICAvLyBmZm1wZWcgLXkgLWYgbGF2ZmkgLWkgXCJhZXZhbHNyYz0wfDB8MDpkPTAuMDVcIiAtYzphIGxpYmZka19hYWMgLXByb2ZpbGU6YSBhYWNfaGVfdjIgLWI6YSA0ayBvdXRwdXQuYWFjICYmIGhleGR1bXAgLXYgLWUgJzE2LzEgXCIweCV4LFwiIFwiXFxuXCInIC12IG91dHB1dC5hYWNcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDEsIDB4NDAsIDB4MjIsIDB4ODAsIDB4YTMsIDB4NWUsIDB4ZTYsIDB4ODAsIDB4YmEsIDB4OCwgMHgwLCAweDAsIDB4MCwgMHgwLCAweDk1LCAweDAsIDB4NiwgMHhmMSwgMHhhMSwgMHhhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVlXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQUFDO1xuIiwiaW1wb3J0IHtFVkVOVFN9IGZyb20gJ3hncGxheWVyLXV0aWxzJ1xuaW1wb3J0IEFBQyBmcm9tICcuL2FhYy9hYWMtaGVscGVyJ1xuXG5jb25zdCB7UkVNVVhfRVZFTlRTLCBERU1VWF9FVkVOVFN9ID0gRVZFTlRTXG5cbmNsYXNzIENvbXBhdGliaWxpdHkge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5uZXh0QXVkaW9EdHMgPSAwIC8vIOaooeaLn+S4i+S4gOautemfs+mikeaVsOaNrueahGR0c1xuICAgIHRoaXMubmV4dFZpZGVvRHRzID0gMCAvLyDmqKHmi5/kuIvkuIDmrrXop4bpopHmlbDmja7nmoRkdHNcblxuICAgIHRoaXMubGFzdEF1ZGlvU2FtcGxlc0xlbiA9IDAgLy8g5LiK5LiA5q616Z+z6aKR5pWw5o2u55qE6ZW/5bqmXG4gICAgdGhpcy5sYXN0VmlkZW9TYW1wbGVzTGVuID0gMCAvLyDkuIrkuIDmrrXop4bpopHmlbDmja7nmoTplb/luqZcblxuICAgIHRoaXMubGFzdFZpZGVvRHRzID0gdW5kZWZpbmVkIC8vIOS4iuS4gOautemfs+mikeaVsOaNrueahOmVv+W6plxuICAgIHRoaXMubGFzdEF1ZGlvRHRzID0gdW5kZWZpbmVkIC8vIOS4iuS4gOauteinhumikeaVsOaNrueahOmVv+W6plxuXG4gICAgdGhpcy5hbGxBdWRpb1NhbXBsZXNDb3VudCA9IDAgLy8g6Z+z6aKR5oC75pWw5o2u6YePKOWOn+Wni+W4pylcbiAgICB0aGlzLmFsbFZpZGVvU2FtcGxlc0NvdW50ID0gMCAvLyDop4bpopHmgLvmlbDmja7ph48o5Y6f5aeL5binKVxuXG4gICAgdGhpcy5fZmlyc3RBdWRpb1NhbXBsZSA9IG51bGxcbiAgICB0aGlzLl9maXJzdFZpZGVvU2FtcGxlID0gbnVsbFxuXG4gICAgdGhpcy5maWxsZWRBdWRpb1NhbXBsZXMgPSBbXSAvLyDooaXlhYXpn7PpopHluKfvvIjvvIlcbiAgICB0aGlzLmZpbGxlZFZpZGVvU2FtcGxlcyA9IFtdIC8vIOihpeWFheinhumikeW4p++8iO+8iVxuXG4gICAgdGhpcy5fdmlkZW9MYXJnZUdhcCA9IDBcbiAgICB0aGlzLl9hdWRpb0xhcmdlR2FwID0gMFxuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgdGhpcy5iZWZvcmUoUkVNVVhfRVZFTlRTLlJFTVVYX01FRElBLCB0aGlzLmRvRml4LmJpbmQodGhpcykpXG4gIH1cblxuICByZXNldCAoKSB7XG4gICAgdGhpcy5uZXh0QXVkaW9EdHMgPSBudWxsIC8vIOS8sOeul+S4i+S4gOautemfs+mikeaVsOaNrueahGR0c1xuICAgIHRoaXMubmV4dFZpZGVvRHRzID0gbnVsbCAvLyDkvLDnrpfkuIvkuIDmrrXop4bpopHmlbDmja7nmoRkdHNcblxuICAgIHRoaXMubGFzdEF1ZGlvU2FtcGxlc0xlbiA9IDAgLy8g5LiK5LiA5q616Z+z6aKR5pWw5o2u55qE6ZW/5bqmXG4gICAgdGhpcy5sYXN0VmlkZW9TYW1wbGVzTGVuID0gMCAvLyDkuIrkuIDmrrXop4bpopHmlbDmja7nmoTplb/luqZcblxuICAgIHRoaXMubGFzdFZpZGVvRHRzID0gdW5kZWZpbmVkIC8vIOS4iuS4gOautemfs+mikeaVsOaNrueahOmVv+W6plxuICAgIHRoaXMubGFzdEF1ZGlvRHRzID0gdW5kZWZpbmVkIC8vIOS4iuS4gOauteinhumikeaVsOaNrueahOmVv+W6plxuXG4gICAgLy8gdGhpcy5hbGxBdWRpb1NhbXBsZXNDb3VudCA9IDAgLy8g6Z+z6aKR5oC75pWw5o2u6YePKOWOn+Wni+W4pylcbiAgICAvLyB0aGlzLmFsbFZpZGVvU2FtcGxlc0NvdW50ID0gMCAvLyDop4bpopHmgLvmlbDmja7ph48o5Y6f5aeL5binKVxuXG4gICAgLy8gdGhpcy5fZmlyc3RBdWRpb1NhbXBsZSA9IG51bGxcbiAgICAvLyB0aGlzLl9maXJzdFZpZGVvU2FtcGxlID0gbnVsbFxuXG4gICAgdGhpcy5maWxsZWRBdWRpb1NhbXBsZXMgPSBbXSAvLyDooaXlhYXpn7PpopHluKfvvIjvvIlcbiAgICB0aGlzLmZpbGxlZFZpZGVvU2FtcGxlcyA9IFtdIC8vIOihpeWFheinhumikeW4p++8iO+8iVxuICB9XG5cbiAgZG9GaXggKCkge1xuICAgIGNvbnN0IHsgaXNGaXJzdEF1ZGlvU2FtcGxlcywgaXNGaXJzdFZpZGVvU2FtcGxlcyB9ID0gdGhpcy5nZXRGaXJzdFNhbXBsZSgpXG5cbiAgICAvLyB0aGlzLnJlbW92ZUludmFsaWRTYW1wbGVzKClcblxuICAgIHRoaXMucmVjb3JkU2FtcGxlc0NvdW50KClcblxuICAgIGlmICh0aGlzLl9maXJzdFZpZGVvU2FtcGxlKSB7XG4gICAgICB0aGlzLmZpeFJlZlNhbXBsZUR1cmF0aW9uKHRoaXMudmlkZW9UcmFjay5tZXRhLCB0aGlzLnZpZGVvVHJhY2suc2FtcGxlcylcbiAgICB9XG4gICAgaWYgKHRoaXMuX2ZpcnN0QXVkaW9TYW1wbGUpIHtcbiAgICAgIHRoaXMuZml4UmVmU2FtcGxlRHVyYXRpb24odGhpcy5hdWRpb1RyYWNrLm1ldGEsIHRoaXMuYXVkaW9UcmFjay5zYW1wbGVzKVxuICAgIH1cblxuICAgIGNvbnN0IHsgY2hhbmdlZDogdmlkZW9DaGFuZ2VkLCBjaGFuZ2VkSWR4OiB2aWRlb0NoYW5nZWRJZHggfSA9IENvbXBhdGliaWxpdHkuZGV0YWN0Q2hhbmdlU3RyZWFtKHRoaXMudmlkZW9UcmFjay5zYW1wbGVzKVxuICAgIGlmICh2aWRlb0NoYW5nZWQgJiYgIWlzRmlyc3RBdWRpb1NhbXBsZXMpIHtcbiAgICAgIHRoaXMuZml4Q2hhbmdlU3RyZWFtVmlkZW8odmlkZW9DaGFuZ2VkSWR4KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRvRml4VmlkZW8oaXNGaXJzdFZpZGVvU2FtcGxlcylcbiAgICB9XG5cbiAgICBjb25zdCB7IGNoYW5nZWQ6IGF1ZGlvQ2hhbmdlZCwgY2hhbmdlZElkeDogYXVkaW9DaGFuZ2VkSWR4IH0gPSBDb21wYXRpYmlsaXR5LmRldGFjdENoYW5nZVN0cmVhbSh0aGlzLmF1ZGlvVHJhY2suc2FtcGxlcylcbiAgICBpZiAoYXVkaW9DaGFuZ2VkKSB7XG4gICAgICB0aGlzLmZpeENoYW5nZVN0cmVhbUF1ZGlvKGF1ZGlvQ2hhbmdlZElkeClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb0ZpeEF1ZGlvKGlzRmlyc3RBdWRpb1NhbXBsZXMpXG4gICAgfVxuXG4gICAgLy8gdGhpcy5yZW1vdmVJbnZhbGlkU2FtcGxlcygpXG4gIH1cblxuICBkb0ZpeFZpZGVvIChmaXJzdCwgc3RyZWFtQ2hhbmdlU3RhcnQpIHtcbiAgICBsZXQge3NhbXBsZXM6IHZpZGVvU2FtcGxlcywgbWV0YX0gPSB0aGlzLnZpZGVvVHJhY2tcblxuICAgIGlmIChtZXRhLmZyYW1lUmF0ZSAmJiBtZXRhLmZyYW1lUmF0ZS5maXhlZCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXZpZGVvU2FtcGxlcyB8fCAhdmlkZW9TYW1wbGVzLmxlbmd0aCB8fCAhdGhpcy5fZmlyc3RWaWRlb1NhbXBsZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gY29uc29sZS5sb2coYHZpZGVvIGxhc3RTYW1wbGUsICR7dmlkZW9TYW1wbGVzW3ZpZGVvU2FtcGxlcy5sZW5ndGggLSAxXS5kdHN9YClcblxuICAgIGNvbnN0IGZpcnN0U2FtcGxlID0gdmlkZW9TYW1wbGVzWzBdXG5cbiAgICBjb25zdCBzYW1wbGVzTGVuID0gdmlkZW9TYW1wbGVzLmxlbmd0aDtcblxuICAgIC8vIHN0ZXAwLuS/ruWkjWhsc+a1geWHuueOsOW3qOWkp2dhcO+8jOmcgOimgeW8uuWItumHjeWumuS9jeeahOmXrumimFxuICAgIGlmICh0aGlzLl92aWRlb0xhcmdlR2FwID4gMCkge1xuICAgICAgQ29tcGF0aWJpbGl0eS5kb0ZpeExhcmdlR2FwKHZpZGVvU2FtcGxlcywgdGhpcy5fdmlkZW9MYXJnZUdhcClcbiAgICB9XG5cbiAgICBpZiAoZmlyc3RTYW1wbGUuZHRzICE9PSB0aGlzLl9maXJzdFZpZGVvU2FtcGxlLmR0cyAmJiAoc3RyZWFtQ2hhbmdlU3RhcnQgfHwgQ29tcGF0aWJpbGl0eS5kZXRlY3RMYXJnZUdhcCh0aGlzLm5leHRWaWRlb0R0cywgZmlyc3RTYW1wbGUpKSkge1xuICAgICAgaWYgKHN0cmVhbUNoYW5nZVN0YXJ0KSB7XG4gICAgICAgIHRoaXMubmV4dFZpZGVvRHRzID0gc3RyZWFtQ2hhbmdlU3RhcnQgLy8gRklYOiBIbHPkuK3pgJTliIdjb2RlY++8jOWcqOWmguaenOebtOaOpXNlZWvliLDlkI7pnaLnmoTngrnkvJrlr7zoh7RsYXJnZUdhcOiuoeeul+Wksei0pVxuICAgICAgfVxuXG4gICAgICB0aGlzLl92aWRlb0xhcmdlR2FwID0gdGhpcy5uZXh0VmlkZW9EdHMgLSBmaXJzdFNhbXBsZS5kdHNcbiAgICAgIENvbXBhdGliaWxpdHkuZG9GaXhMYXJnZUdhcCh2aWRlb1NhbXBsZXMsIHRoaXMuX3ZpZGVvTGFyZ2VHYXApXG4gICAgfVxuXG4gICAgY29uc3QgZmlyc3REdHMgPSBmaXJzdFNhbXBsZS5kdHNcblxuICAgIC8vIHN0ZXAxLiDkv67lpI3kuI5hdWRpb+mmluW4p+W3rui3neWkquWkp+eahOmXrumimFxuICAgIGlmIChmaXJzdCAmJiB0aGlzLl9maXJzdEF1ZGlvU2FtcGxlKSB7XG4gICAgICBjb25zdCB2aWRlb0ZpcnN0RHRzID0gdGhpcy5fZmlyc3RWaWRlb1NhbXBsZS5kdHNcbiAgICAgIGNvbnN0IGF1ZGlvRmlyc3REdHMgPSB0aGlzLl9maXJzdEF1ZGlvU2FtcGxlLmR0c1xuICAgICAgY29uc3QgZ2FwID0gdmlkZW9GaXJzdER0cyAtIGF1ZGlvRmlyc3REdHNcbiAgICAgIGlmIChnYXAgPiAoMiAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pKSB7XG4gICAgICAgIGNvbnN0IGZpbGxDb3VudCA9IE1hdGguZmxvb3IoZ2FwIC8gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbilcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGxDb3VudDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgY2xvbmVkRmlyc3RTYW1wbGUgPSBPYmplY3QuYXNzaWduKHt9LCBmaXJzdFNhbXBsZSkgLy8g6KeG6aKR5aS06YOo5bin57y65aSx6ZyA6KaB5aSN5Yi256ys5LiA5binXG4gICAgICAgICAgLy8g6YeN5paw6K6h566Xc2FtcGxl55qEZHRz5ZKMcHRzXG4gICAgICAgICAgY2xvbmVkRmlyc3RTYW1wbGUuZHRzID0gdmlkZW9GaXJzdER0cyAtIChpICsgMSkgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG4gICAgICAgICAgY2xvbmVkRmlyc3RTYW1wbGUucHRzID0gY2xvbmVkRmlyc3RTYW1wbGUuZHRzICsgY2xvbmVkRmlyc3RTYW1wbGUuY3RzXG5cbiAgICAgICAgICB2aWRlb1NhbXBsZXMudW5zaGlmdChjbG9uZWRGaXJzdFNhbXBsZSlcblxuICAgICAgICAgIHRoaXMuZmlsbGVkVmlkZW9TYW1wbGVzLnB1c2goe1xuICAgICAgICAgICAgZHRzOiBjbG9uZWRGaXJzdFNhbXBsZS5kdHMsXG4gICAgICAgICAgICBzaXplOiBjbG9uZWRGaXJzdFNhbXBsZS5kYXRhLmJ5dGVMZW5ndGhcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGdhcFxuICAgIC8vIHN0ZXAyLiDkv67lpI1zYW1wbGVz5q615LmL6Ze055qE6Ze06Led6Zeu6aKY44CBXG4gICAgaWYgKHRoaXMubmV4dFZpZGVvRHRzKSB7XG4gICAgICAvLyBzdGVwMS4g5aSE55CGc2FtcGxlc+auteS5i+mXtOeahOS4ouW4p+aDheWGtVxuICAgICAgLy8g5b2T5Y+R546wZHVyYXRpb27lt67ot53lpKfkuo4y5bin5pe26L+b6KGM6KGl5binXG4gICAgICBnYXAgPSBmaXJzdER0cyAtIHRoaXMubmV4dFZpZGVvRHRzXG4gICAgICBjb25zdCBhYnNHYXAgPSBNYXRoLmFicyhnYXApXG4gICAgICBpZiAoZ2FwID4gKDIgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSkge1xuICAgICAgICBjb25zdCBmaWxsRnJhbWVDb3VudCA9IE1hdGguZmxvb3IoZ2FwIC8gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbilcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGxGcmFtZUNvdW50OyBpKyspIHtcbiAgICAgICAgICBjb25zdCBjbG9uZWRTYW1wbGUgPSBPYmplY3QuYXNzaWduKHt9LCB2aWRlb1NhbXBsZXNbMF0pXG4gICAgICAgICAgY29uc3QgY29tcHV0ZWQgPSBmaXJzdER0cyAtIChpICsgMSkgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG5cbiAgICAgICAgICBjbG9uZWRTYW1wbGUuZHRzID0gY29tcHV0ZWQgPiB0aGlzLm5leHRWaWRlb0R0cyA/IGNvbXB1dGVkIDogdGhpcy5uZXh0VmlkZW9EdHMgLy8g6KGl55qE56ys5LiA5bin5LiA5a6a6KaB5pivbmV4dFZpZGVvRHRzXG4gICAgICAgICAgY2xvbmVkU2FtcGxlLnB0cyA9IGNsb25lZFNhbXBsZS5kdHMgKyBjbG9uZWRTYW1wbGUuY3RzXG5cbiAgICAgICAgICB0aGlzLnZpZGVvVHJhY2suc2FtcGxlcy51bnNoaWZ0KGNsb25lZFNhbXBsZSlcblxuICAgICAgICAgIHRoaXMuZmlsbGVkVmlkZW9TYW1wbGVzLnB1c2goe1xuICAgICAgICAgICAgZHRzOiBjbG9uZWRTYW1wbGUuZHRzLFxuICAgICAgICAgICAgc2l6ZTogY2xvbmVkU2FtcGxlLmRhdGEuYnl0ZUxlbmd0aFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoYWJzR2FwIDw9IG1ldGEucmVmU2FtcGxlRHVyYXRpb24gJiYgYWJzR2FwID4gMCkge1xuICAgICAgICAvLyDlvZPlt67ot53lnKgrLeS4gOW4p+S5i+mXtOaXtuWwhuesrOS4gOW4p+eahGR0c+W8uuihjOWumuS9jeWIsOacn+acm+S9jee9rlxuICAgICAgICAvLyBjb25zb2xlLmxvZygn6YeN5a6a5L2N6KeG6aKR5binZHRzJywgdmlkZW9TYW1wbGVzWzBdLmR0cywgdGhpcy5uZXh0VmlkZW9EdHMpXG4gICAgICAgIHZpZGVvU2FtcGxlc1swXS5kdHMgPSB0aGlzLm5leHRWaWRlb0R0c1xuICAgICAgICB2aWRlb1NhbXBsZXNbMF0ub3JpZ2luRHRzID0gdmlkZW9TYW1wbGVzWzBdLmR0c1xuICAgICAgICB2aWRlb1NhbXBsZXNbMF0uY3RzID0gdmlkZW9TYW1wbGVzWzBdLmN0cyAhPT0gdW5kZWZpbmVkID8gdmlkZW9TYW1wbGVzWzBdLmN0cyA6IHZpZGVvU2FtcGxlc1swXS5wdHMgLSB2aWRlb1NhbXBsZXNbMF0uZHRzXG4gICAgICAgIHZpZGVvU2FtcGxlc1swXS5wdHMgPSB2aWRlb1NhbXBsZXNbMF0uZHRzICsgdmlkZW9TYW1wbGVzWzBdLmN0c1xuICAgICAgfSBlbHNlIGlmIChnYXAgPCAwKSB7XG4gICAgICAgIC8vIOWHuueOsOWkp+eahGdhcFxuICAgICAgICBDb21wYXRpYmlsaXR5LmRvRml4TGFyZ2VHYXAodmlkZW9TYW1wbGVzLCAoLTEgKiBnYXApKVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBsYXN0RHRzID0gdmlkZW9TYW1wbGVzW3ZpZGVvU2FtcGxlcy5sZW5ndGggLSAxXS5kdHM7XG5cbiAgICBjb25zdCBsYXN0U2FtcGxlRHVyYXRpb24gPSB2aWRlb1NhbXBsZXMubGVuZ3RoID49IDIgPyBsYXN0RHRzIC0gdmlkZW9TYW1wbGVzW3ZpZGVvU2FtcGxlcy5sZW5ndGggLSAyXS5kdHMgOiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG5cbiAgICB0aGlzLmxhc3RWaWRlb1NhbXBsZXNMZW4gPSBzYW1wbGVzTGVuXG4gICAgdGhpcy5uZXh0VmlkZW9EdHMgPSBsYXN0RHRzICsgbGFzdFNhbXBsZUR1cmF0aW9uXG4gICAgdGhpcy5sYXN0VmlkZW9EdHMgPSBsYXN0RHRzXG5cbiAgICAvLyBzdGVwMi4g5L+u5aSNc2FtcGxl5q615LmL5YaF55qE6Ze06Led6Zeu6aKYXG4gICAgLy8gc3RlcDMuIOS/ruWkjXNhbXBsZXPmrrXlhoXpg6jnmoRkdHPlvILluLjpl67pophcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdmlkZW9TYW1wbGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50ID0gdmlkZW9TYW1wbGVzW2ldXG4gICAgICBjb25zdCBuZXh0ID0gdmlkZW9TYW1wbGVzW2kgKyAxXVxuXG4gICAgICBpZiAoIW5leHQpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGR1cmF0aW9uID0gbmV4dC5kdHMgLSBjdXJyZW50LmR0cztcblxuICAgICAgaWYgKGR1cmF0aW9uID4gKDIgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSkge1xuICAgICAgICAvLyDkuKTluKfkuYvpl7Tpl7TpmpTlpKrlpKfvvIzpnIDopoHooaXnqbrnmb3luKdcbiAgICAgICAgbGV0IGZpbGxGcmFtZUNvdW50ID0gTWF0aC5mbG9vcihkdXJhdGlvbiAvIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pXG5cbiAgICAgICAgbGV0IGZpbGxGcmFtZUlkeCA9IDBcbiAgICAgICAgd2hpbGUgKGZpbGxGcmFtZUlkeCA8IGZpbGxGcmFtZUNvdW50KSB7XG4gICAgICAgICAgY29uc3QgZmlsbEZyYW1lID0gT2JqZWN0LmFzc2lnbih7fSwgbmV4dClcbiAgICAgICAgICBmaWxsRnJhbWUuZHRzID0gY3VycmVudC5kdHMgKyAoZmlsbEZyYW1lSWR4ICsgMSkgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG4gICAgICAgICAgZmlsbEZyYW1lLnB0cyA9IGZpbGxGcmFtZS5kdHMgKyBmaWxsRnJhbWUuY3RzXG4gICAgICAgICAgaWYgKGZpbGxGcmFtZSA8IG5leHQuZHRzKSB7XG4gICAgICAgICAgICB2aWRlb1NhbXBsZXMuc3BsaWNlKGksIDAsIGZpbGxGcmFtZSlcblxuICAgICAgICAgICAgdGhpcy5maWxsZWRWaWRlb1NhbXBsZXMucHVzaCh7XG4gICAgICAgICAgICAgIGR0czogZmlsbEZyYW1lLmR0cyxcbiAgICAgICAgICAgICAgc2l6ZTogZmlsbEZyYW1lLmRhdGEuYnl0ZUxlbmd0aFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmaWxsRnJhbWVJZHgrK1xuICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudmlkZW9UcmFjay5zYW1wbGVzID0gdmlkZW9TYW1wbGVzO1xuICB9XG5cbiAgZG9GaXhBdWRpbyAoZmlyc3QsIHN0cmVhbUNoYW5nZVN0YXJ0KSB7XG4gICAgbGV0IHtzYW1wbGVzOiBhdWRpb1NhbXBsZXMsIG1ldGF9ID0gdGhpcy5hdWRpb1RyYWNrXG5cbiAgICBpZiAoIWF1ZGlvU2FtcGxlcyB8fCAhYXVkaW9TYW1wbGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKGBhdWRpbyBsYXN0U2FtcGxlLCAke2F1ZGlvU2FtcGxlc1thdWRpb1NhbXBsZXMubGVuZ3RoIC0gMV0uZHRzfWApXG5cbiAgICBjb25zdCBzYW1wbGVzTGVuID0gYXVkaW9TYW1wbGVzLmxlbmd0aDtcbiAgICBjb25zdCBzaWxlbnRGcmFtZSA9IEFBQy5nZXRTaWxlbnRGcmFtZShtZXRhLmNvZGVjLCBtZXRhLmNoYW5uZWxDb3VudClcblxuICAgIGNvbnN0IGZpcnN0U2FtcGxlID0gdGhpcy5fZmlyc3RBdWRpb1NhbXBsZVxuXG4gICAgY29uc3QgX2ZpcnN0U2FtcGxlID0gYXVkaW9TYW1wbGVzWzBdXG4gICAgLy8g5a+5YXVkaW9TYW1wbGVz5oyJ54WnZHRz5YGa5o6S5bqPXG4gICAgLy8gYXVkaW9TYW1wbGVzID0gQ29tcGF0aWJpbGl0eS5zb3J0QXVkaW9TYW1wbGVzKGF1ZGlvU2FtcGxlcylcbiAgICBpZiAodGhpcy5fYXVkaW9MYXJnZUdhcCA+IDApIHtcbiAgICAgIENvbXBhdGliaWxpdHkuZG9GaXhMYXJnZUdhcChhdWRpb1NhbXBsZXMsIHRoaXMuX2F1ZGlvTGFyZ2VHYXApXG4gICAgfVxuXG4gICAgaWYgKF9maXJzdFNhbXBsZS5kdHMgIT09IHRoaXMuX2ZpcnN0QXVkaW9TYW1wbGUuZHRzICYmIChzdHJlYW1DaGFuZ2VTdGFydCB8fCBDb21wYXRpYmlsaXR5LmRldGVjdExhcmdlR2FwKHRoaXMubmV4dEF1ZGlvRHRzLCBfZmlyc3RTYW1wbGUpKSkge1xuICAgICAgaWYgKHN0cmVhbUNoYW5nZVN0YXJ0KSB7XG4gICAgICAgIHRoaXMubmV4dEF1ZGlvRHRzID0gc3RyZWFtQ2hhbmdlU3RhcnQgLy8gRklYOiBIbHPkuK3pgJTliIdjb2RlY++8jOWcqOWmguaenOebtOaOpXNlZWvliLDlkI7pnaLnmoTngrnkvJrlr7zoh7RsYXJnZUdhcOiuoeeul+Wksei0pVxuICAgICAgfVxuICAgICAgdGhpcy5fYXVkaW9MYXJnZUdhcCA9IHRoaXMubmV4dEF1ZGlvRHRzIC0gX2ZpcnN0U2FtcGxlLmR0c1xuICAgICAgQ29tcGF0aWJpbGl0eS5kb0ZpeExhcmdlR2FwKGF1ZGlvU2FtcGxlcywgdGhpcy5fYXVkaW9MYXJnZUdhcClcbiAgICB9XG4gICAgLy8gc3RlcDAuIOmmluW4p+S4jnZpZGVv6aaW5bin6Ze06Led5aSn55qE6Zeu6aKYXG4gICAgaWYgKHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUgJiYgZmlyc3QpIHtcbiAgICAgIGNvbnN0IHZpZGVvRmlyc3RQdHMgPSB0aGlzLl9maXJzdFZpZGVvU2FtcGxlLnB0cyA/IHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUucHRzIDogdGhpcy5fZmlyc3RWaWRlb1NhbXBsZS5kdHMgKyB0aGlzLl9maXJzdFZpZGVvU2FtcGxlLmN0c1xuXG4gICAgICBpZiAoZmlyc3RTYW1wbGUuZHRzIC0gdmlkZW9GaXJzdFB0cyA+IG1ldGEucmVmU2FtcGxlRHVyYXRpb24pIHtcbiAgICAgICAgY29uc3Qgc2lsZW50U2FtcGxlQ291bnQgPSBNYXRoLmZsb29yKChmaXJzdFNhbXBsZS5kdHMgLSB2aWRlb0ZpcnN0UHRzKSAvIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pXG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaWxlbnRTYW1wbGVDb3VudDsgaSsrKSB7XG4gICAgICAgICAgY29uc3Qgc2lsZW50U2FtcGxlID0ge1xuICAgICAgICAgICAgZGF0YTogc2lsZW50RnJhbWUsXG4gICAgICAgICAgICBkYXRhc2l6ZTogc2lsZW50RnJhbWUuYnl0ZUxlbmd0aCxcbiAgICAgICAgICAgIGR0czogZmlyc3RTYW1wbGUuZHRzIC0gKGkgKyAxKSAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb24sXG4gICAgICAgICAgICBmaWx0ZXJlZDogMFxuICAgICAgICAgIH1cblxuICAgICAgICAgIGF1ZGlvU2FtcGxlcy51bnNoaWZ0KHNpbGVudFNhbXBsZSlcblxuICAgICAgICAgIHRoaXMuZmlsbGVkQXVkaW9TYW1wbGVzLnB1c2goe1xuICAgICAgICAgICAgZHRzOiBzaWxlbnRTYW1wbGUuZHRzLFxuICAgICAgICAgICAgc2l6ZTogc2lsZW50U2FtcGxlLmRhdGEuYnl0ZUxlbmd0aFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgZ2FwXG4gICAgY29uc3QgZmlyc3REdHMgPSBhdWRpb1NhbXBsZXNbMF0uZHRzXG5cbiAgICBpZiAodGhpcy5uZXh0QXVkaW9EdHMpIHtcbiAgICAgIC8vIHN0ZXAxLiDlpITnkIZzYW1wbGVz5q615LmL6Ze055qE5Lii5bin5oOF5Ya1XG4gICAgICAvLyDlvZPlj5HnjrBkdXJhdGlvbuW3rui3neWkp+S6jjHluKfml7bov5vooYzooaXluKdcbiAgICAgIGdhcCA9IGZpcnN0RHRzIC0gdGhpcy5uZXh0QXVkaW9EdHNcbiAgICAgIGNvbnN0IGFic0dhcCA9IE1hdGguYWJzKGdhcClcblxuICAgICAgaWYgKGFic0dhcCA+IG1ldGEucmVmU2FtcGxlRHVyYXRpb24gJiYgc2FtcGxlc0xlbiA9PT0gMSAmJiB0aGlzLmxhc3RBdWRpb1NhbXBsZXNMZW4gPT09IDEpIHtcbiAgICAgICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbkZpeGVkID0gdW5kZWZpbmVkXG4gICAgICB9XG5cbiAgICAgIGlmIChnYXAgPiAoMiAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pKSB7XG4gICAgICAgIGlmIChzYW1wbGVzTGVuID09PSAxICYmIHRoaXMubGFzdEF1ZGlvU2FtcGxlc0xlbiA9PT0gMSkge1xuICAgICAgICAgIC8vIOWmguaenHNhbXBsZeeahGxlbmd0aOS4gOebtOaYrzHvvIzogIzkuJTkuIDnm7TkuI3nrKblkIhyZWZTYW1wbGVEdXJhdGlvbu+8jOmcgOimgeWKqOaAgeS/ruaUuXJlZlNhbXBsZUR1cmF0aW9uXG4gICAgICAgICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbkZpeGVkID0gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbkZpeGVkICE9PSB1bmRlZmluZWQgPyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uRml4ZWQgKyBnYXAgOiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uICsgZ2FwXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3Qgc2lsZW50RnJhbWVDb3VudCA9IE1hdGguZmxvb3IoZ2FwIC8gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbilcblxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2lsZW50RnJhbWVDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjb21wdXRlZCA9IGZpcnN0RHRzIC0gKGkgKyAxKSAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb25cbiAgICAgICAgICAgIGNvbnN0IHNpbGVudFNhbXBsZSA9IE9iamVjdC5hc3NpZ24oe30sIGF1ZGlvU2FtcGxlc1swXSwge1xuICAgICAgICAgICAgICBkdHM6IGNvbXB1dGVkID4gdGhpcy5uZXh0QXVkaW9EdHMgPyBjb21wdXRlZCA6IHRoaXMubmV4dEF1ZGlvRHRzXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB0aGlzLmZpbGxlZEF1ZGlvU2FtcGxlcy5wdXNoKHtcbiAgICAgICAgICAgICAgZHRzOiBzaWxlbnRTYW1wbGUuZHRzLFxuICAgICAgICAgICAgICBzaXplOiBzaWxlbnRTYW1wbGUuZGF0YS5ieXRlTGVuZ3RoXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMudW5zaGlmdChzaWxlbnRTYW1wbGUpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGFic0dhcCA8PSBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uICYmIGFic0dhcCA+IDApIHtcbiAgICAgICAgLy8g5b2T5beu6Led5q+U6L6D5bCP55qE5pe25YCZ5bCG6Z+z6aKR5bin6YeN5a6a5L2NXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCfph43lrprkvY3pn7PpopHluKdkdHMnLCBhdWRpb1NhbXBsZXNbMF0uZHRzLCB0aGlzLm5leHRBdWRpb0R0cylcbiAgICAgICAgYXVkaW9TYW1wbGVzWzBdLmR0cyA9IHRoaXMubmV4dEF1ZGlvRHRzXG4gICAgICAgIGF1ZGlvU2FtcGxlc1swXS5wdHMgPSB0aGlzLm5leHRBdWRpb0R0c1xuICAgICAgfSBlbHNlIGlmIChnYXAgPCAwKSB7XG4gICAgICAgIENvbXBhdGliaWxpdHkuZG9GaXhMYXJnZUdhcChhdWRpb1NhbXBsZXMsICgtMSAqIGdhcCkpXG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGxhc3REdHMgPSBhdWRpb1NhbXBsZXNbYXVkaW9TYW1wbGVzLmxlbmd0aCAtIDFdLmR0cztcbiAgICBjb25zdCBsYXN0U2FtcGxlRHVyYXRpb24gPSBhdWRpb1NhbXBsZXMubGVuZ3RoID49IDIgPyBsYXN0RHRzIC0gYXVkaW9TYW1wbGVzW2F1ZGlvU2FtcGxlcy5sZW5ndGggLSAyXS5kdHMgOiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG5cbiAgICB0aGlzLmxhc3RBdWRpb1NhbXBsZXNMZW4gPSBzYW1wbGVzTGVuO1xuICAgIHRoaXMubmV4dEF1ZGlvRHRzID0gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbkZpeGVkID8gbGFzdER0cyArIG1ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZCA6IGxhc3REdHMgKyBsYXN0U2FtcGxlRHVyYXRpb25cbiAgICB0aGlzLmxhc3RBdWRpb0R0cyA9IGxhc3REdHNcblxuICAgIC8vIHN0ZXAzLiDkv67lpI1zYW1wbGVz5q615YaF6YOo55qEZHRz5byC5bi46Zeu6aKYXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGF1ZGlvU2FtcGxlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgY3VycmVudCA9IGF1ZGlvU2FtcGxlc1tpXVxuICAgICAgY29uc3QgbmV4dCA9IGF1ZGlvU2FtcGxlc1tpICsgMV1cblxuICAgICAgaWYgKCFuZXh0KSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkdXJhdGlvbiA9IG5leHQuZHRzIC0gY3VycmVudC5kdHM7XG4gICAgICBhdWRpb1NhbXBsZXNbaV0uZHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICAgIC8qXG4gICAgICBpZiAoZHVyYXRpb24gPiAoMiAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pKSB7XG4gICAgICAgIC8vIOS4pOW4p+S5i+mXtOmXtOmalOWkquWkp++8jOmcgOimgeihpeepuueZveW4p1xuICAgICAgICAvKipcbiAgICAgICAgbGV0IHNpbGVudEZyYW1lQ291bnQgPSBNYXRoLmZsb29yKGR1cmF0aW9uIC8gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbilcbiAgICAgICAgbGV0IGZyYW1lSWR4ID0gMFxuXG4gICAgICAgIHdoaWxlIChmcmFtZUlkeCA8IHNpbGVudEZyYW1lQ291bnQpIHtcbiAgICAgICAgICBjb25zdCBzaWxlbnRTYW1wbGUgPSB7XG4gICAgICAgICAgICBkYXRhOiBzaWxlbnRGcmFtZSxcbiAgICAgICAgICAgIGRhdGFzaXplOiBzaWxlbnRGcmFtZS5ieXRlTGVuZ3RoLFxuICAgICAgICAgICAgZHRzOiBjdXJyZW50LmR0cyArIChmcmFtZUlkeCArIDEpICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbixcbiAgICAgICAgICAgIGZpbHRlcmVkOiAwLFxuICAgICAgICAgICAgaXNTaWxlbnQ6IHRydWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhdWRpb1NhbXBsZXMuc3BsaWNlKGksIDAsIHNpbGVudFNhbXBsZSlcblxuICAgICAgICAgIHRoaXMuZmlsbGVkQXVkaW9TYW1wbGVzLnB1c2goe1xuICAgICAgICAgICAgZHRzOiBzaWxlbnRTYW1wbGUuZHRzLFxuICAgICAgICAgICAgc2l6ZTogc2lsZW50U2FtcGxlLmRhdGEuYnl0ZUxlbmd0aFxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICBmcmFtZUlkeCsrXG4gICAgICAgICAgaSsrIC8vIOS4jeWvuemdmemfs+W4p+WBmuavlOi+g1xuICAgICAgICB9XG4gICAgICB9ICovXG4gICAgfVxuXG4gICAgdGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMgPSBDb21wYXRpYmlsaXR5LnNvcnRBdWRpb1NhbXBsZXMoYXVkaW9TYW1wbGVzKVxuICB9XG5cbiAgZml4Q2hhbmdlU3RyZWFtVmlkZW8gKGNoYW5nZUlkeCkge1xuICAgIGNvbnN0IHsgc2FtcGxlcywgbWV0YSB9ID0gdGhpcy52aWRlb1RyYWNrO1xuICAgIGNvbnN0IHByZXZEdHMgPSBjaGFuZ2VJZHggPT09IDAgPyB0aGlzLmdldFN0cmVhbUNoYW5nZVN0YXJ0KHNhbXBsZXNbMF0pIDogc2FtcGxlc1tjaGFuZ2VJZHggLSAxXS5kdHM7XG4gICAgY29uc3QgY3VyRHRzID0gc2FtcGxlc1tjaGFuZ2VJZHhdLmR0cztcbiAgICBjb25zdCBpc0NvbnRpbnVlID0gTWF0aC5hYnMocHJldkR0cyAtIGN1ckR0cykgPD0gMiAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb247XG5cbiAgICBpZiAoaXNDb250aW51ZSkge1xuICAgICAgaWYgKCFzYW1wbGVzW2NoYW5nZUlkeF0ub3B0aW9ucykge1xuICAgICAgICBzYW1wbGVzW2NoYW5nZUlkeF0ub3B0aW9ucyA9IHtcbiAgICAgICAgICBpc0NvbnRpbnVlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNhbXBsZXNbY2hhbmdlSWR4XS5vcHRpb25zLmlzQ29udGludWUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuZG9GaXhWaWRlbyhmYWxzZSlcbiAgICB9XG5cbiAgICBjb25zdCBmaXJzdFBhcnRTYW1wbGVzID0gc2FtcGxlcy5zbGljZSgwLCBjaGFuZ2VJZHgpO1xuICAgIGNvbnN0IHNlY29uZFBhcnRTYW1wbGVzID0gc2FtcGxlcy5zbGljZShjaGFuZ2VJZHgpO1xuICAgIGNvbnN0IGZpcnN0U2FtcGxlID0gc2FtcGxlc1swXVxuXG4gICAgY29uc3QgY2hhbmdlU2FtcGxlID0gc2Vjb25kUGFydFNhbXBsZXNbMF1cbiAgICBjb25zdCBmaXJzdFBhcnREdXJhdGlvbiA9IGNoYW5nZVNhbXBsZS5kdHMgLSBmaXJzdFNhbXBsZS5kdHNcbiAgICBjb25zdCBzdHJlYW1DaGFuZ2VTdGFydCA9IGZpcnN0U2FtcGxlLm9wdGlvbnMgJiYgZmlyc3RTYW1wbGUub3B0aW9ucy5zdGFydCArIGZpcnN0UGFydER1cmF0aW9uID8gZmlyc3RTYW1wbGUub3B0aW9ucy5zdGFydCA6IG51bGxcblxuICAgIHRoaXMudmlkZW9UcmFjay5zYW1wbGVzID0gc2FtcGxlcy5zbGljZSgwLCBjaGFuZ2VJZHgpO1xuXG4gICAgdGhpcy5kb0ZpeFZpZGVvKGZhbHNlKTtcblxuICAgIHRoaXMudmlkZW9UcmFjay5zYW1wbGVzID0gc2FtcGxlcy5zbGljZShjaGFuZ2VJZHgpO1xuXG4gICAgdGhpcy5kb0ZpeFZpZGVvKGZhbHNlLCBzdHJlYW1DaGFuZ2VTdGFydCk7XG5cbiAgICB0aGlzLnZpZGVvVHJhY2suc2FtcGxlcyA9IGZpcnN0UGFydFNhbXBsZXMuY29uY2F0KHNlY29uZFBhcnRTYW1wbGVzKVxuICB9XG5cbiAgZml4Q2hhbmdlU3RyZWFtQXVkaW8gKGNoYW5nZUlkeCkge1xuICAgIGNvbnN0IHsgc2FtcGxlcywgbWV0YSB9ID0gdGhpcy5hdWRpb1RyYWNrO1xuXG4gICAgY29uc3QgcHJldkR0cyA9IGNoYW5nZUlkeCA9PT0gMCA/IHRoaXMuZ2V0U3RyZWFtQ2hhbmdlU3RhcnQoc2FtcGxlc1swXSkgOiBzYW1wbGVzW2NoYW5nZUlkeCAtIDFdLmR0cztcbiAgICBjb25zdCBjdXJEdHMgPSBzYW1wbGVzW2NoYW5nZUlkeF0uZHRzO1xuICAgIGNvbnN0IGlzQ29udGludWUgPSBNYXRoLmFicyhwcmV2RHRzIC0gY3VyRHRzKSA8PSAyICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbjtcblxuICAgIGlmIChpc0NvbnRpbnVlKSB7XG4gICAgICBpZiAoIXNhbXBsZXNbY2hhbmdlSWR4XS5vcHRpb25zKSB7XG4gICAgICAgIHNhbXBsZXNbY2hhbmdlSWR4XS5vcHRpb25zID0ge1xuICAgICAgICAgIGlzQ29udGludWU6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2FtcGxlc1tjaGFuZ2VJZHhdLm9wdGlvbnMuaXNDb250aW51ZSA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5kb0ZpeEF1ZGlvKGZhbHNlKVxuICAgIH1cblxuICAgIGNvbnN0IGZpcnN0UGFydFNhbXBsZXMgPSBzYW1wbGVzLnNsaWNlKDAsIGNoYW5nZUlkeCk7XG4gICAgY29uc3Qgc2Vjb25kUGFydFNhbXBsZXMgPSBzYW1wbGVzLnNsaWNlKGNoYW5nZUlkeCk7XG4gICAgY29uc3QgZmlyc3RTYW1wbGUgPSBzYW1wbGVzWzBdXG5cbiAgICBjb25zdCBjaGFuZ2VTYW1wbGUgPSBzZWNvbmRQYXJ0U2FtcGxlc1swXVxuICAgIGNvbnN0IGZpcnN0UGFydER1cmF0aW9uID0gY2hhbmdlU2FtcGxlLmR0cyAtIGZpcnN0U2FtcGxlLmR0c1xuICAgIGNvbnN0IHN0cmVhbUNoYW5nZVN0YXJ0ID0gZmlyc3RTYW1wbGUub3B0aW9ucyAmJiBmaXJzdFNhbXBsZS5vcHRpb25zLnN0YXJ0ICsgZmlyc3RQYXJ0RHVyYXRpb24gPyBmaXJzdFNhbXBsZS5vcHRpb25zLnN0YXJ0IDogbnVsbFxuXG4gICAgdGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMgPSBmaXJzdFBhcnRTYW1wbGVzO1xuXG4gICAgdGhpcy5kb0ZpeEF1ZGlvKGZhbHNlKTtcblxuICAgIHRoaXMuYXVkaW9UcmFjay5zYW1wbGVzID0gc2Vjb25kUGFydFNhbXBsZXM7XG5cbiAgICB0aGlzLmRvRml4QXVkaW8oZmFsc2UsIHN0cmVhbUNoYW5nZVN0YXJ0KTtcblxuICAgIHRoaXMuYXVkaW9UcmFjay5zYW1wbGVzID0gZmlyc3RQYXJ0U2FtcGxlcy5jb25jYXQoc2Vjb25kUGFydFNhbXBsZXMpXG4gIH1cblxuICBnZXRGaXJzdFNhbXBsZSAoKSB7XG4gICAgLy8g6I635Y+WdmlkZW/lkoxhdWRpb+eahOmmluW4p+aVsOaNrlxuICAgIGxldCB7c2FtcGxlczogdmlkZW9TYW1wbGVzfSA9IHRoaXMudmlkZW9UcmFja1xuICAgIGxldCB7c2FtcGxlczogYXVkaW9TYW1wbGVzfSA9IHRoaXMuYXVkaW9UcmFja1xuXG4gICAgbGV0IGlzRmlyc3RWaWRlb1NhbXBsZXMgPSBmYWxzZTtcbiAgICBsZXQgaXNGaXJzdEF1ZGlvU2FtcGxlcyA9IGZhbHNlO1xuXG4gICAgaWYgKCF0aGlzLl9maXJzdFZpZGVvU2FtcGxlICYmIHZpZGVvU2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUgPSBDb21wYXRpYmlsaXR5LmZpbmRGaXJzdFZpZGVvU2FtcGxlKHZpZGVvU2FtcGxlcylcbiAgICAgIGlzRmlyc3RWaWRlb1NhbXBsZXMgPSB0cnVlXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9maXJzdEF1ZGlvU2FtcGxlICYmIGF1ZGlvU2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX2ZpcnN0QXVkaW9TYW1wbGUgPSBDb21wYXRpYmlsaXR5LmZpbmRGaXJzdEF1ZGlvU2FtcGxlKGF1ZGlvU2FtcGxlcykgLy8g5a+75om+ZHRz5pyA5bCP55qE5bin5L2c5Li66aaW5Liq6Z+z6aKR5binXG4gICAgICBpc0ZpcnN0QXVkaW9TYW1wbGVzID0gdHJ1ZVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBpc0ZpcnN0VmlkZW9TYW1wbGVzLFxuICAgICAgaXNGaXJzdEF1ZGlvU2FtcGxlc1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDlnKjmsqHmnIlyZWZTYW1wbGVEdXJhdGlvbueahOmXrumimOa1geS4re+8jFxuICAgKi9cbiAgZml4UmVmU2FtcGxlRHVyYXRpb24gKG1ldGEsIHNhbXBsZXMpIHtcbiAgICBjb25zdCBpc1ZpZGVvID0gbWV0YS50eXBlID09PSAndmlkZW8nXG4gICAgY29uc3QgYWxsU2FtcGxlc0NvdW50ID0gaXNWaWRlbyA/IHRoaXMuYWxsVmlkZW9TYW1wbGVzQ291bnQgOiB0aGlzLmFsbEF1ZGlvU2FtcGxlc0NvdW50XG4gICAgY29uc3QgZmlyc3REdHMgPSBpc1ZpZGVvID8gdGhpcy5fZmlyc3RWaWRlb1NhbXBsZS5kdHMgOiB0aGlzLl9maXJzdEF1ZGlvU2FtcGxlLmR0c1xuICAgIGNvbnN0IGZpbGxlZFNhbXBsZXNDb3VudCA9IGlzVmlkZW8gPyB0aGlzLmZpbGxlZFZpZGVvU2FtcGxlcy5sZW5ndGggOiB0aGlzLmZpbGxlZEF1ZGlvU2FtcGxlcy5sZW5ndGhcblxuICAgIGlmICghbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiB8fCBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uIDw9IDAgfHwgTnVtYmVyLmlzTmFOKG1ldGEucmVmU2FtcGxlRHVyYXRpb24pKSB7XG4gICAgICBpZiAoc2FtcGxlcy5sZW5ndGggPj0gMSkge1xuICAgICAgICBjb25zdCBsYXN0RHRzID0gc2FtcGxlc1tzYW1wbGVzLmxlbmd0aCAtIDFdLmR0c1xuXG4gICAgICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb24gPSBNYXRoLmZsb29yKChsYXN0RHRzIC0gZmlyc3REdHMpIC8gKChhbGxTYW1wbGVzQ291bnQgKyBmaWxsZWRTYW1wbGVzQ291bnQpIC0gMSkpOyAvLyDlsIZyZWZTYW1wbGVEdXJhdGlvbumHjee9ruS4uuiuoeeul+WQjueahOW5s+Wdh+WAvFxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobWV0YS5yZWZTYW1wbGVEdXJhdGlvbikge1xuICAgICAgaWYgKHNhbXBsZXMubGVuZ3RoID49IDUpIHtcbiAgICAgICAgY29uc3QgbGFzdER0cyA9IHNhbXBsZXNbc2FtcGxlcy5sZW5ndGggLSAxXS5kdHNcbiAgICAgICAgY29uc3QgZmlyc3REdHMgPSBzYW1wbGVzWzBdLmR0c1xuICAgICAgICBjb25zdCBkdXJhdGlvbkF2ZyA9IChsYXN0RHRzIC0gZmlyc3REdHMpIC8gKHNhbXBsZXMubGVuZ3RoIC0gMSlcblxuICAgICAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uID0gTWF0aC5mbG9vcihNYXRoLmFicyhtZXRhLnJlZlNhbXBsZUR1cmF0aW9uIC0gZHVyYXRpb25BdmcpIDw9IDUgPyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uIDogZHVyYXRpb25BdmcpOyAvLyDlsIZyZWZTYW1wbGVEdXJhdGlvbumHjee9ruS4uuiuoeeul+WQjueahOW5s+Wdh+WAvFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDorrDlvZXmiKrmraLnm67liY3kuIDlhbHmkq3mlL7kuoblpJrlsJHluKdcbiAgICovXG4gIHJlY29yZFNhbXBsZXNDb3VudCAoKSB7XG4gICAgY29uc3QgeyBhdWRpb1RyYWNrLCB2aWRlb1RyYWNrIH0gPSB0aGlzXG5cbiAgICB0aGlzLmFsbEF1ZGlvU2FtcGxlc0NvdW50ICs9IGF1ZGlvVHJhY2suc2FtcGxlcy5sZW5ndGhcbiAgICB0aGlzLmFsbFZpZGVvU2FtcGxlc0NvdW50ICs9IHZpZGVvVHJhY2suc2FtcGxlcy5sZW5ndGhcbiAgfVxuXG4gIC8qKlxuICAgKiDljrvpmaTkuI3lkIjms5XnmoTluKfvvIjlgJLpgIDjgIHph43lpI3luKfvvIlcbiAgICovXG4gIHJlbW92ZUludmFsaWRTYW1wbGVzICgpIHtcbiAgICBjb25zdCB7IF9maXJzdFZpZGVvU2FtcGxlLCBfZmlyc3RBdWRpb1NhbXBsZSB9ID0gdGhpc1xuXG4gICAgdGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMgPSB0aGlzLmF1ZGlvVHJhY2suc2FtcGxlcy5maWx0ZXIoKHNhbXBsZSkgPT4ge1xuICAgICAgcmV0dXJuIHNhbXBsZS5kdHMgPj0gX2ZpcnN0QXVkaW9TYW1wbGUuZHRzICYmICh0aGlzLmxhc3RBdWRpb0R0cyA9PT0gdW5kZWZpbmVkIHx8IHNhbXBsZS5kdHMgPiB0aGlzLmxhc3RBdWRpb0R0cylcbiAgICB9KVxuXG4gICAgdGhpcy52aWRlb1RyYWNrLnNhbXBsZXMgPSB0aGlzLnZpZGVvVHJhY2suc2FtcGxlcy5maWx0ZXIoKHNhbXBsZSkgPT4ge1xuICAgICAgcmV0dXJuIHNhbXBsZS5kdHMgPj0gX2ZpcnN0VmlkZW9TYW1wbGUuZHRzICYmICh0aGlzLmxhc3RWaWRlb0R0cyA9PT0gdW5kZWZpbmVkIHx8IHNhbXBsZS5kdHMgPiB0aGlzLmxhc3RWaWRlb0R0cylcbiAgICB9KVxuICB9XG5cbiAgZ2V0U3RyZWFtQ2hhbmdlU3RhcnQgKHNhbXBsZSkge1xuICAgIGlmIChzYW1wbGUub3B0aW9ucyAmJiBzYW1wbGUub3B0aW9ucy5zdGFydCkge1xuICAgICAgcmV0dXJuIHNhbXBsZS5vcHRpb25zLnN0YXJ0IC0gdGhpcy5kdHNCYXNlO1xuICAgIH1cbiAgICByZXR1cm4gSW5maW5pdHlcbiAgfVxuXG4gIHN0YXRpYyBzb3J0QXVkaW9TYW1wbGVzIChzYW1wbGVzKSB7XG4gICAgaWYgKHNhbXBsZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gc2FtcGxlc1xuICAgIH1cblxuICAgIHJldHVybiBzYW1wbGVzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIHJldHVybiBhLmR0cyAtIGIuZHRzXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiDlr7vmib5kdHPmnIDlsI/nmoRzYW1wbGVcbiAgICogQHBhcmFtIHNhbXBsZXNcbiAgICovXG4gIHN0YXRpYyBmaW5kRmlyc3RBdWRpb1NhbXBsZSAoc2FtcGxlcykge1xuICAgIGlmICghc2FtcGxlcyB8fCBzYW1wbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICByZXR1cm4gQ29tcGF0aWJpbGl0eS5zb3J0QXVkaW9TYW1wbGVzKHNhbXBsZXMpWzBdXG4gIH1cblxuICBzdGF0aWMgZmluZEZpcnN0VmlkZW9TYW1wbGUgKHNhbXBsZXMpIHtcbiAgICBpZiAoIXNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIGNvbnN0IHNvcnRlZCA9IHNhbXBsZXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgcmV0dXJuIGEuZHRzIC0gYi5kdHM7XG4gICAgfSlcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzb3J0ZWQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChzb3J0ZWRbaV0uaXNLZXlmcmFtZSkge1xuICAgICAgICByZXR1cm4gc29ydGVkW2ldXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGRldGVjdExhcmdlR2FwIChuZXh0RHRzLCBmaXJzdFNhbXBsZSkge1xuICAgIGlmIChuZXh0RHRzID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGN1ckR0cyA9IGZpcnN0U2FtcGxlLmR0cyB8fCAwXG4gICAgY29uc3QgY29uZDEgPSBuZXh0RHRzIC0gY3VyRHRzID49IDEwMDAgfHwgY3VyRHRzIC0gbmV4dER0cyA+PSAxMDAwIC8vIGZpeCBobHPmtYHlh7rnjrDlpKfph4/mtYFkdHPpl7Tot53pl67pophcbiAgICBjb25zdCBjb25kMiA9IGZpcnN0U2FtcGxlLm9wdGlvbnMgJiYgZmlyc3RTYW1wbGUub3B0aW9ucy5kaXNjb250aW51ZVxuXG4gICAgcmV0dXJuIGNvbmQxIHx8IGNvbmQyXG4gIH1cblxuICBzdGF0aWMgZG9GaXhMYXJnZUdhcCAoc2FtcGxlcywgZ2FwKSB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNhbXBsZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IHNhbXBsZSA9IHNhbXBsZXNbaV07XG4gICAgICBzYW1wbGUuZHRzICs9IGdhcFxuICAgICAgaWYgKHNhbXBsZS5wdHMpIHtcbiAgICAgICAgc2FtcGxlLnB0cyArPSBnYXBcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog5Lit6YCU5o2i5rWBXG4gICAqL1xuICBzdGF0aWMgZGV0YWN0Q2hhbmdlU3RyZWFtIChzYW1wbGVzKSB7XG4gICAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcbiAgICBsZXQgY2hhbmdlZElkeCA9IC0xO1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzYW1wbGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAoc2FtcGxlc1tpXS5vcHRpb25zICYmIHNhbXBsZXNbaV0ub3B0aW9ucy5tZXRhKSB7XG4gICAgICAgIGNoYW5nZWQgPSB0cnVlXG4gICAgICAgIGNoYW5nZWRJZHggPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgY2hhbmdlZCxcbiAgICAgIGNoYW5nZWRJZHhcbiAgICB9XG4gIH1cblxuICBnZXQgdHJhY2tzICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJylcbiAgfVxuXG4gIGdldCBhdWRpb1RyYWNrICgpIHtcbiAgICBpZiAodGhpcy50cmFja3MpIHtcbiAgICAgIHJldHVybiB0aGlzLnRyYWNrcy5hdWRpb1RyYWNrXG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBnZXQgdmlkZW9UcmFjayAoKSB7XG4gICAgaWYgKHRoaXMudHJhY2tzKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmFja3MudmlkZW9UcmFja1xuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgZ2V0IGR0c0Jhc2UgKCkge1xuICAgIGNvbnN0IHJlbXV4ZXIgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdNUDRfUkVNVVhFUicpO1xuICAgIGlmIChyZW11eGVyKSB7XG4gICAgICByZXR1cm4gcmVtdXhlci5fZHRzQmFzZVxuICAgIH1cbiAgICByZXR1cm4gMFxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBDb21wYXRpYmlsaXR5O1xuIiwiY2xhc3MgR29sb21iIHtcbiAgY29uc3RydWN0b3IgKHVpbnQ4YXJyYXkpIHtcbiAgICB0aGlzLlRBRyA9ICdHb2xvbWInXG4gICAgdGhpcy5fYnVmZmVyID0gdWludDhhcnJheVxuICAgIHRoaXMuX2J1ZmZlckluZGV4ID0gMFxuICAgIHRoaXMuX3RvdGFsQnl0ZXMgPSB1aW50OGFycmF5LmJ5dGVMZW5ndGhcbiAgICB0aGlzLl90b3RhbEJpdHMgPSB1aW50OGFycmF5LmJ5dGVMZW5ndGggKiA4XG4gICAgdGhpcy5fY3VycmVudFdvcmQgPSAwXG4gICAgdGhpcy5fY3VycmVudFdvcmRCaXRzTGVmdCA9IDBcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuX2J1ZmZlciA9IG51bGxcbiAgfVxuXG4gIF9maWxsQ3VycmVudFdvcmQgKCkge1xuICAgIGxldCBidWZmZXJCeXRlc0xlZnQgPSB0aGlzLl90b3RhbEJ5dGVzIC0gdGhpcy5fYnVmZmVySW5kZXhcbiAgICBpZiAoYnVmZmVyQnl0ZXNMZWZ0IDw9IDApIHtcbiAgICAgIC8vIFRPRE8g5byC5bi45aSE55CGXG4gICAgfVxuXG4gICAgbGV0IGJ5dGVzUmVhZCA9IE1hdGgubWluKDQsIGJ1ZmZlckJ5dGVzTGVmdClcbiAgICBsZXQgd29yZCA9IG5ldyBVaW50OEFycmF5KDQpXG4gICAgd29yZC5zZXQodGhpcy5fYnVmZmVyLnN1YmFycmF5KHRoaXMuX2J1ZmZlckluZGV4LCB0aGlzLl9idWZmZXJJbmRleCArIGJ5dGVzUmVhZCkpXG4gICAgdGhpcy5fY3VycmVudFdvcmQgPSBuZXcgRGF0YVZpZXcod29yZC5idWZmZXIpLmdldFVpbnQzMigwKVxuXG4gICAgdGhpcy5fYnVmZmVySW5kZXggKz0gYnl0ZXNSZWFkXG4gICAgdGhpcy5fY3VycmVudFdvcmRCaXRzTGVmdCA9IGJ5dGVzUmVhZCAqIDhcbiAgfVxuXG4gIHJlYWRCaXRzIChzaXplKSB7XG4gICAgbGV0IGJpdHMgPSBNYXRoLm1pbih0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0LCBzaXplKTsvLyA6dWludFxuICAgIGxldCB2YWx1ID0gdGhpcy5fY3VycmVudFdvcmQgPj4+ICgzMiAtIGJpdHMpO1xuICAgIGlmIChzaXplID4gMzIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHJlYWQgbW9yZSB0aGFuIDMyIGJpdHMgYXQgYSB0aW1lJyk7XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnRXb3JkQml0c0xlZnQgLT0gYml0cztcbiAgICBpZiAodGhpcy5fY3VycmVudFdvcmRCaXRzTGVmdCA+IDApIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRXb3JkIDw8PSBiaXRzO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fdG90YWxCeXRlcyAtIHRoaXMuX2J1ZmZlckluZGV4ID4gMCkge1xuICAgICAgdGhpcy5fZmlsbEN1cnJlbnRXb3JkKCk7XG4gICAgfVxuXG4gICAgYml0cyA9IHNpemUgLSBiaXRzO1xuICAgIGlmIChiaXRzID4gMCAmJiB0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0KSB7XG4gICAgICByZXR1cm4gdmFsdSA8PCBiaXRzIHwgdGhpcy5yZWFkQml0cyhiaXRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhbHU7XG4gICAgfVxuICB9XG5cbiAgcmVhZEJvb2wgKCkge1xuICAgIHJldHVybiB0aGlzLnJlYWRCaXRzKDEpID09PSAxXG4gIH1cblxuICByZWFkQnl0ZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVhZEJpdHMoOClcbiAgfVxuXG4gIF9za2lwTGVhZGluZ1plcm8gKCkge1xuICAgIGxldCB6ZXJvQ291bnRcbiAgICBmb3IgKHplcm9Db3VudCA9IDA7IHplcm9Db3VudCA8IHRoaXMuX2N1cnJlbnRXb3JkQml0c0xlZnQ7IHplcm9Db3VudCsrKSB7XG4gICAgICBpZiAoKHRoaXMuX2N1cnJlbnRXb3JkICYgKDB4ODAwMDAwMDAgPj4+IHplcm9Db3VudCkpICE9PSAwKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRXb3JkIDw8PSB6ZXJvQ291bnRcbiAgICAgICAgdGhpcy5fY3VycmVudFdvcmRCaXRzTGVmdCAtPSB6ZXJvQ291bnRcbiAgICAgICAgcmV0dXJuIHplcm9Db3VudFxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9maWxsQ3VycmVudFdvcmQoKVxuICAgIHJldHVybiB6ZXJvQ291bnQgKyB0aGlzLl9za2lwTGVhZGluZ1plcm8oKVxuICB9XG5cbiAgcmVhZFVFRyAoKSB7IC8vIHVuc2lnbmVkIGV4cG9uZW50aWFsIGdvbG9tYlxuICAgIGxldCBsZWFkaW5nWmVyb3MgPSB0aGlzLl9za2lwTGVhZGluZ1plcm8oKVxuICAgIHJldHVybiB0aGlzLnJlYWRCaXRzKGxlYWRpbmdaZXJvcyArIDEpIC0gMVxuICB9XG5cbiAgcmVhZFNFRyAoKSB7IC8vIHNpZ25lZCBleHBvbmVudGlhbCBnb2xvbWJcbiAgICBsZXQgdmFsdWUgPSB0aGlzLnJlYWRVRUcoKVxuICAgIGlmICh2YWx1ZSAmIDB4MDEpIHtcbiAgICAgIHJldHVybiAodmFsdWUgKyAxKSA+Pj4gMVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gLTEgKiAodmFsdWUgPj4+IDEpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdvbG9tYlxuIiwiaW1wb3J0IFNwc1BhcnNlciBmcm9tICcuL3Nwcyc7XG5jbGFzcyBOYWx1bml0IHtcbiAgc3RhdGljIGdldE5hbHVuaXRzIChidWZmZXIpIHtcbiAgICBpZiAoYnVmZmVyLmxlbmd0aCAtIGJ1ZmZlci5wb3NpdGlvbiA8IDQpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBsZXQgYnVmID0gYnVmZmVyLmRhdGF2aWV3O1xuICAgIGxldCBwb3NpdGlvbiA9IGJ1ZmZlci5wb3NpdGlvbjtcbiAgICBpZiAoYnVmLmdldEludDMyKHBvc2l0aW9uKSA9PT0gMSB8fFxuICAgIChidWYuZ2V0SW50MTYocG9zaXRpb24pID09PSAwICYmIGJ1Zi5nZXRJbnQ4KHBvc2l0aW9uICsgMikgPT09IDEpKSB7XG4gICAgICByZXR1cm4gTmFsdW5pdC5nZXRBbm5leGJOYWxzKGJ1ZmZlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBOYWx1bml0LmdldEF2Y2NOYWxzKGJ1ZmZlcik7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldEFubmV4Yk5hbHMgKGJ1ZmZlcikge1xuICAgIGxldCBuYWxzID0gW107XG4gICAgbGV0IHBvc2l0aW9uID0gTmFsdW5pdC5nZXRIZWFkZXJQb3NpdGlvbkFubmV4QihidWZmZXIpO1xuICAgIGxldCBzdGFydCA9IHBvc2l0aW9uLnBvcztcbiAgICBsZXQgZW5kID0gc3RhcnQ7XG4gICAgd2hpbGUgKHN0YXJ0IDwgYnVmZmVyLmxlbmd0aCAtIDQpIHtcbiAgICAgIGxldCBoZWFkZXIgPSBidWZmZXIuYnVmZmVyLnNsaWNlKHN0YXJ0LCBzdGFydCArIHBvc2l0aW9uLmhlYWRlckxlbmd0aCk7XG4gICAgICBpZiAocG9zaXRpb24ucG9zID09PSBidWZmZXIucG9zaXRpb24pIHtcbiAgICAgICAgYnVmZmVyLnNraXAocG9zaXRpb24uaGVhZGVyTGVuZ3RoKTtcbiAgICAgIH1cbiAgICAgIHBvc2l0aW9uID0gTmFsdW5pdC5nZXRIZWFkZXJQb3NpdGlvbkFubmV4QihidWZmZXIpO1xuICAgICAgZW5kID0gcG9zaXRpb24ucG9zO1xuICAgICAgbGV0IGJvZHkgPSBuZXcgVWludDhBcnJheShidWZmZXIuYnVmZmVyLnNsaWNlKHN0YXJ0ICsgaGVhZGVyLmJ5dGVMZW5ndGgsIGVuZCkpO1xuICAgICAgbGV0IHVuaXQgPSB7aGVhZGVyLCBib2R5fTtcbiAgICAgIE5hbHVuaXQuYW5hbHlzZU5hbCh1bml0KTtcbiAgICAgIG5hbHMucHVzaCh1bml0KTtcbiAgICAgIGJ1ZmZlci5za2lwKGVuZCAtIGJ1ZmZlci5wb3NpdGlvbik7XG4gICAgICBzdGFydCA9IGVuZDtcbiAgICB9XG4gICAgcmV0dXJuIG5hbHM7XG4gIH1cblxuICBzdGF0aWMgZ2V0QXZjY05hbHMgKGJ1ZmZlcikge1xuICAgIGxldCBuYWxzID0gW107XG4gICAgd2hpbGUgKGJ1ZmZlci5wb3NpdGlvbiA8IGJ1ZmZlci5sZW5ndGggLSA0KSB7XG4gICAgICBsZXQgbGVuZ3RoID0gYnVmZmVyLmRhdGF2aWV3LmdldEludDMyKGJ1ZmZlci5wb3NpdGlvbik7XG4gICAgICBpZiAoYnVmZmVyLmxlbmd0aCAtIGJ1ZmZlci5wb3NpdGlvbiA+PSBsZW5ndGgpIHtcbiAgICAgICAgbGV0IGhlYWRlciA9IGJ1ZmZlci5idWZmZXIuc2xpY2UoYnVmZmVyLnBvc2l0aW9uLCBidWZmZXIucG9zaXRpb24gKyA0KTtcbiAgICAgICAgYnVmZmVyLnNraXAoNClcbiAgICAgICAgbGV0IGJvZHkgPSBidWZmZXIuYnVmZmVyLnNsaWNlKGJ1ZmZlci5wb3NpdGlvbiwgYnVmZmVyLnBvc2l0aW9uICsgbGVuZ3RoKTtcbiAgICAgICAgYnVmZmVyLnNraXAobGVuZ3RoKTtcbiAgICAgICAgbGV0IHVuaXQgPSB7aGVhZGVyLCBib2R5fTtcbiAgICAgICAgTmFsdW5pdC5hbmFseXNlTmFsKHVuaXQpO1xuICAgICAgICBuYWxzLnB1c2godW5pdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5hbHM7XG4gIH1cblxuICBzdGF0aWMgYW5hbHlzZU5hbCAodW5pdCkge1xuICAgIGxldCB0eXBlID0gdW5pdC5ib2R5WzBdICYgMHgxZjtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgLy8gTkRSXG4gICAgICAgIHVuaXQubmRyID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDU6XG4gICAgICAgIC8vIElEUlxuICAgICAgICB1bml0LmlkciA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA2OlxuICAgICAgICAvLyBTRUlcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDc6XG4gICAgICAgIC8vIFNQU1xuICAgICAgICB1bml0LnNwcyA9IFNwc1BhcnNlci5wYXJzZVNQUyh1bml0LmJvZHkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgODpcbiAgICAgICAgLy8gUFBTXG4gICAgICAgIHVuaXQucHBzID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDk6XG4gICAgICAgIC8vIEFVRFxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRIZWFkZXJQb3NpdGlvbkFubmV4QiAoYnVmZmVyKSB7XG4gICAgLy8gc2VwZXJhdGVcbiAgICBsZXQgcG9zID0gYnVmZmVyLnBvc2l0aW9uO1xuICAgIGxldCBoZWFkZXJMZW5ndGggPSAwO1xuICAgIHdoaWxlIChoZWFkZXJMZW5ndGggIT09IDMgJiYgaGVhZGVyTGVuZ3RoICE9PSA0ICYmIHBvcyA8IGJ1ZmZlci5sZW5ndGggLSA0KSB7XG4gICAgICBpZiAoYnVmZmVyLmRhdGF2aWV3LmdldEludDE2KHBvcykgPT09IDApIHtcbiAgICAgICAgaWYgKGJ1ZmZlci5kYXRhdmlldy5nZXRJbnQxNihwb3MgKyAyKSA9PT0gMSkge1xuICAgICAgICAgIC8vIDB4MDAwMDAxXG4gICAgICAgICAgaGVhZGVyTGVuZ3RoID0gNDtcbiAgICAgICAgfSBlbHNlIGlmIChidWZmZXIuZGF0YXZpZXcuZ2V0SW50OChwb3MgKyAyKSA9PT0gMSkge1xuICAgICAgICAgIGhlYWRlckxlbmd0aCA9IDM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcG9zKys7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBvcysrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3MgPT09IGJ1ZmZlci5sZW5ndGggLSA0KSB7XG4gICAgICBpZiAoYnVmZmVyLmRhdGF2aWV3LmdldEludDE2KHBvcykgPT09IDApIHtcbiAgICAgICAgaWYgKGJ1ZmZlci5kYXRhdmlldy5nZXRJbnQxNihwb3MgKyAyKSA9PT0gMSkge1xuICAgICAgICAgIC8vIDB4MDAwMDAxXG4gICAgICAgICAgaGVhZGVyTGVuZ3RoID0gNDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcG9zKys7XG4gICAgICAgIGlmIChidWZmZXIuZGF0YXZpZXcuZ2V0SW50MTYocG9zKSA9PT0gMCAmJiBidWZmZXIuZGF0YXZpZXcuZ2V0SW50OChwb3MpID09PSAxKSB7XG4gICAgICAgICAgLy8gMHgwMDAwMDAxXG4gICAgICAgICAgaGVhZGVyTGVuZ3RoID0gMztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwb3MgPSBidWZmZXIubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7cG9zLCBoZWFkZXJMZW5ndGh9O1xuICB9XG5cbiAgc3RhdGljIGdldEF2Y2MgKHNwcywgcHBzKSB7XG4gICAgbGV0IHJldCA9IG5ldyBVaW50OEFycmF5KHNwcy5ieXRlTGVuZ3RoICsgcHBzLmJ5dGVMZW5ndGggKyAxMSk7XG4gICAgcmV0WzBdID0gMHgwMTtcbiAgICByZXRbMV0gPSBzcHNbMV07XG4gICAgcmV0WzJdID0gc3BzWzJdO1xuICAgIHJldFszXSA9IHNwc1szXTtcbiAgICByZXRbNF0gPSAyNTU7XG4gICAgcmV0WzVdID0gMjI1O1xuXG4gICAgbGV0IG9mZnNldCA9IDY7XG5cbiAgICByZXQuc2V0KG5ldyBVaW50OEFycmF5KFsoc3BzLmJ5dGVMZW5ndGggPj4+IDgpICYgMHhmZiwgc3BzLmJ5dGVMZW5ndGggJiAweGZmXSksIG9mZnNldCk7XG4gICAgb2Zmc2V0ICs9IDI7XG4gICAgcmV0LnNldChzcHMsIG9mZnNldCk7XG4gICAgb2Zmc2V0ICs9IHNwcy5ieXRlTGVuZ3RoO1xuXG4gICAgcmV0W29mZnNldF0gPSAxO1xuICAgIG9mZnNldCsrO1xuXG4gICAgcmV0LnNldChuZXcgVWludDhBcnJheShbKHBwcy5ieXRlTGVuZ3RoID4+PiA4KSAmIDB4ZmYsIHBwcy5ieXRlTGVuZ3RoICYgMHhmZl0pLCBvZmZzZXQpO1xuICAgIG9mZnNldCArPSAyO1xuICAgIHJldC5zZXQocHBzLCBvZmZzZXQpO1xuICAgIHJldHVybiByZXQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTmFsdW5pdDtcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAgKi9cbi8qIGVzbGludC1kaXNhYmxlIG9uZS12YXIgICovXG5pbXBvcnQgR29sb21iIGZyb20gJy4vZ29sb21iJ1xuXG5jbGFzcyBTUFNQYXJzZXIge1xuICBzdGF0aWMgX2Vic3AycmJzcCAodWludDhhcnJheSkge1xuICAgIGxldCBzcmMgPSB1aW50OGFycmF5XG4gICAgbGV0IHNyY0xlbmd0aCA9IHNyYy5ieXRlTGVuZ3RoXG4gICAgbGV0IGRzdCA9IG5ldyBVaW50OEFycmF5KHNyY0xlbmd0aClcbiAgICBsZXQgZHN0SWR4ID0gMFxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcmNMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGkgPj0gMikge1xuICAgICAgICBpZiAoc3JjW2ldID09PSAweDAzICYmIHNyY1tpIC0gMV0gPT09IDB4MDAgJiYgc3JjW2kgLSAyXSA9PT0gMHgwMCkge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGRzdFtkc3RJZHhdID0gc3JjW2ldXG4gICAgICBkc3RJZHgrK1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgVWludDhBcnJheShkc3QuYnVmZmVyLCAwLCBkc3RJZHgpXG4gIH1cblxuICBzdGF0aWMgcGFyc2VTUFMgKHVpbnQ4YXJyYXkpIHtcbiAgICBsZXQgcmJzcCA9IFNQU1BhcnNlci5fZWJzcDJyYnNwKHVpbnQ4YXJyYXkpXG4gICAgbGV0IGdiID0gbmV3IEdvbG9tYihyYnNwKVxuXG4gICAgZ2IucmVhZEJ5dGUoKVxuICAgIGxldCBwcm9maWxlSWRjID0gZ2IucmVhZEJ5dGUoKVxuICAgIGdiLnJlYWRCeXRlKClcbiAgICBsZXQgbGV2ZWxJZGMgPSBnYi5yZWFkQnl0ZSgpXG4gICAgZ2IucmVhZFVFRygpXG5cbiAgICBsZXQgcHJvZmlsZV9zdHJpbmcgPSBTUFNQYXJzZXIuZ2V0UHJvZmlsZVN0cmluZyhwcm9maWxlSWRjKVxuICAgIGxldCBsZXZlbF9zdHJpbmcgPSBTUFNQYXJzZXIuZ2V0TGV2ZWxTdHJpbmcobGV2ZWxJZGMpXG4gICAgbGV0IGNocm9tYV9mb3JtYXRfaWRjID0gMVxuICAgIGxldCBjaHJvbWFfZm9ybWF0ID0gNDIwXG4gICAgbGV0IGNocm9tYV9mb3JtYXRfdGFibGUgPSBbMCwgNDIwLCA0MjIsIDQ0NF1cbiAgICBsZXQgYml0X2RlcHRoID0gOFxuXG4gICAgaWYgKHByb2ZpbGVJZGMgPT09IDEwMCB8fCBwcm9maWxlSWRjID09PSAxMTAgfHwgcHJvZmlsZUlkYyA9PT0gMTIyIHx8XG4gICAgICBwcm9maWxlSWRjID09PSAyNDQgfHwgcHJvZmlsZUlkYyA9PT0gNDQgfHwgcHJvZmlsZUlkYyA9PT0gODMgfHxcbiAgICAgIHByb2ZpbGVJZGMgPT09IDg2IHx8IHByb2ZpbGVJZGMgPT09IDExOCB8fCBwcm9maWxlSWRjID09PSAxMjggfHxcbiAgICAgIHByb2ZpbGVJZGMgPT09IDEzOCB8fCBwcm9maWxlSWRjID09PSAxNDQpIHtcbiAgICAgIGNocm9tYV9mb3JtYXRfaWRjID0gZ2IucmVhZFVFRygpXG4gICAgICBpZiAoY2hyb21hX2Zvcm1hdF9pZGMgPT09IDMpIHtcbiAgICAgICAgZ2IucmVhZEJpdHMoMSlcbiAgICAgIH1cbiAgICAgIGlmIChjaHJvbWFfZm9ybWF0X2lkYyA8PSAzKSB7XG4gICAgICAgIGNocm9tYV9mb3JtYXQgPSBjaHJvbWFfZm9ybWF0X3RhYmxlW2Nocm9tYV9mb3JtYXRfaWRjXVxuICAgICAgfVxuXG4gICAgICBiaXRfZGVwdGggPSBnYi5yZWFkVUVHKCkgKyA4XG4gICAgICBnYi5yZWFkVUVHKClcbiAgICAgIGdiLnJlYWRCaXRzKDEpXG4gICAgICBpZiAoZ2IucmVhZEJvb2woKSkge1xuICAgICAgICBsZXQgc2NhbGluZ19saXN0X2NvdW50ID0gKGNocm9tYV9mb3JtYXRfaWRjICE9PSAzKSA/IDggOiAxMlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjYWxpbmdfbGlzdF9jb3VudDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGdiLnJlYWRCb29sKCkpIHtcbiAgICAgICAgICAgIGlmIChpIDwgNikge1xuICAgICAgICAgICAgICBTUFNQYXJzZXIuX3NraXBTY2FsaW5nTGlzdChnYiwgMTYpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBTUFNQYXJzZXIuX3NraXBTY2FsaW5nTGlzdChnYiwgNjQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGdiLnJlYWRVRUcoKVxuICAgIGxldCBwaWNfb3JkZXJfY250X3R5cGUgPSBnYi5yZWFkVUVHKClcbiAgICBpZiAocGljX29yZGVyX2NudF90eXBlID09PSAwKSB7XG4gICAgICBnYi5yZWFkVUVHKClcbiAgICB9IGVsc2UgaWYgKHBpY19vcmRlcl9jbnRfdHlwZSA9PT0gMSkge1xuICAgICAgZ2IucmVhZEJpdHMoMSlcbiAgICAgIGdiLnJlYWRTRUcoKVxuICAgICAgZ2IucmVhZFNFRygpXG4gICAgICBsZXQgbnVtX3JlZl9mcmFtZXNfaW5fcGljX29yZGVyX2NudF9jeWNsZSA9IGdiLnJlYWRVRUcoKVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1fcmVmX2ZyYW1lc19pbl9waWNfb3JkZXJfY250X2N5Y2xlOyBpKyspIHtcbiAgICAgICAgZ2IucmVhZFNFRygpXG4gICAgICB9XG4gICAgfVxuICAgIGdiLnJlYWRVRUcoKVxuICAgIGdiLnJlYWRCaXRzKDEpXG5cbiAgICBsZXQgcGljX3dpZHRoX2luX21ic19taW51czEgPSBnYi5yZWFkVUVHKClcbiAgICBsZXQgcGljX2hlaWdodF9pbl9tYXBfdW5pdHNfbWludXMxID0gZ2IucmVhZFVFRygpXG5cbiAgICBsZXQgZnJhbWVfbWJzX29ubHlfZmxhZyA9IGdiLnJlYWRCaXRzKDEpXG4gICAgaWYgKGZyYW1lX21ic19vbmx5X2ZsYWcgPT09IDApIHtcbiAgICAgIGdiLnJlYWRCaXRzKDEpXG4gICAgfVxuICAgIGdiLnJlYWRCaXRzKDEpXG5cbiAgICBsZXQgZnJhbWVfY3JvcF9sZWZ0X29mZnNldCA9IDBcbiAgICBsZXQgZnJhbWVfY3JvcF9yaWdodF9vZmZzZXQgPSAwXG4gICAgbGV0IGZyYW1lX2Nyb3BfdG9wX29mZnNldCA9IDBcbiAgICBsZXQgZnJhbWVfY3JvcF9ib3R0b21fb2Zmc2V0ID0gMFxuXG4gICAgbGV0IGZyYW1lX2Nyb3BwaW5nX2ZsYWcgPSBnYi5yZWFkQm9vbCgpXG4gICAgaWYgKGZyYW1lX2Nyb3BwaW5nX2ZsYWcpIHtcbiAgICAgIGZyYW1lX2Nyb3BfbGVmdF9vZmZzZXQgPSBnYi5yZWFkVUVHKClcbiAgICAgIGZyYW1lX2Nyb3BfcmlnaHRfb2Zmc2V0ID0gZ2IucmVhZFVFRygpXG4gICAgICBmcmFtZV9jcm9wX3RvcF9vZmZzZXQgPSBnYi5yZWFkVUVHKClcbiAgICAgIGZyYW1lX2Nyb3BfYm90dG9tX29mZnNldCA9IGdiLnJlYWRVRUcoKVxuICAgIH1cblxuICAgIGxldCBwYXJfd2lkdGggPSAxLCBwYXJfaGVpZ2h0ID0gMVxuICAgIGxldCBmcHMgPSAwLCBmcHNfZml4ZWQgPSB0cnVlLCBmcHNfbnVtID0gMCwgZnBzX2RlbiA9IDBcblxuICAgIGxldCB2dWlfcGFyYW1ldGVyc19wcmVzZW50X2ZsYWcgPSBnYi5yZWFkQm9vbCgpXG4gICAgaWYgKHZ1aV9wYXJhbWV0ZXJzX3ByZXNlbnRfZmxhZykge1xuICAgICAgaWYgKGdiLnJlYWRCb29sKCkpIHsgLy8gYXNwZWN0X3JhdGlvX2luZm9fcHJlc2VudF9mbGFnXG4gICAgICAgIGxldCBhc3BlY3RfcmF0aW9faWRjID0gZ2IucmVhZEJ5dGUoKVxuICAgICAgICBsZXQgcGFyX3dfdGFibGUgPSBbMSwgMTIsIDEwLCAxNiwgNDAsIDI0LCAyMCwgMzIsIDgwLCAxOCwgMTUsIDY0LCAxNjAsIDQsIDMsIDJdXG4gICAgICAgIGxldCBwYXJfaF90YWJsZSA9IFsxLCAxMSwgMTEsIDExLCAzMywgMTEsIDExLCAxMSwgMzMsIDExLCAxMSwgMzMsIDk5LCAzLCAyLCAxXVxuXG4gICAgICAgIGlmIChhc3BlY3RfcmF0aW9faWRjID4gMCAmJiBhc3BlY3RfcmF0aW9faWRjIDwgMTYpIHtcbiAgICAgICAgICBwYXJfd2lkdGggPSBwYXJfd190YWJsZVthc3BlY3RfcmF0aW9faWRjIC0gMV1cbiAgICAgICAgICBwYXJfaGVpZ2h0ID0gcGFyX2hfdGFibGVbYXNwZWN0X3JhdGlvX2lkYyAtIDFdXG4gICAgICAgIH0gZWxzZSBpZiAoYXNwZWN0X3JhdGlvX2lkYyA9PT0gMjU1KSB7XG4gICAgICAgICAgcGFyX3dpZHRoID0gZ2IucmVhZEJ5dGUoKSA8PCA4IHwgZ2IucmVhZEJ5dGUoKVxuICAgICAgICAgIHBhcl9oZWlnaHQgPSBnYi5yZWFkQnl0ZSgpIDw8IDggfCBnYi5yZWFkQnl0ZSgpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGdiLnJlYWRCb29sKCkpIHtcbiAgICAgICAgZ2IucmVhZEJvb2woKVxuICAgICAgfVxuICAgICAgaWYgKGdiLnJlYWRCb29sKCkpIHtcbiAgICAgICAgZ2IucmVhZEJpdHMoNClcbiAgICAgICAgaWYgKGdiLnJlYWRCb29sKCkpIHtcbiAgICAgICAgICBnYi5yZWFkQml0cygyNClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGdiLnJlYWRCb29sKCkpIHtcbiAgICAgICAgZ2IucmVhZFVFRygpXG4gICAgICAgIGdiLnJlYWRVRUcoKVxuICAgICAgfVxuICAgICAgaWYgKGdiLnJlYWRCb29sKCkpIHtcbiAgICAgICAgbGV0IG51bV91bml0c19pbl90aWNrID0gZ2IucmVhZEJpdHMoMzIpXG4gICAgICAgIGxldCB0aW1lX3NjYWxlID0gZ2IucmVhZEJpdHMoMzIpXG4gICAgICAgIGZwc19maXhlZCA9IGdiLnJlYWRCb29sKClcblxuICAgICAgICBmcHNfbnVtID0gdGltZV9zY2FsZVxuICAgICAgICBmcHNfZGVuID0gbnVtX3VuaXRzX2luX3RpY2sgKiAyXG4gICAgICAgIGZwcyA9IGZwc19udW0gLyBmcHNfZGVuXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHBhclNjYWxlID0gMVxuICAgIGlmIChwYXJfd2lkdGggIT09IDEgfHwgcGFyX2hlaWdodCAhPT0gMSkge1xuICAgICAgcGFyU2NhbGUgPSBwYXJfd2lkdGggLyBwYXJfaGVpZ2h0XG4gICAgfVxuXG4gICAgbGV0IGNyb3BfdW5pdF94ID0gMCwgY3JvcF91bml0X3kgPSAwXG4gICAgaWYgKGNocm9tYV9mb3JtYXRfaWRjID09PSAwKSB7XG4gICAgICBjcm9wX3VuaXRfeCA9IDFcbiAgICAgIGNyb3BfdW5pdF95ID0gMiAtIGZyYW1lX21ic19vbmx5X2ZsYWdcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHN1Yl93YyA9IChjaHJvbWFfZm9ybWF0X2lkYyA9PT0gMykgPyAxIDogMlxuICAgICAgbGV0IHN1Yl9oYyA9IChjaHJvbWFfZm9ybWF0X2lkYyA9PT0gMSkgPyAyIDogMVxuICAgICAgY3JvcF91bml0X3ggPSBzdWJfd2NcbiAgICAgIGNyb3BfdW5pdF95ID0gc3ViX2hjICogKDIgLSBmcmFtZV9tYnNfb25seV9mbGFnKVxuICAgIH1cblxuICAgIGxldCBjb2RlY193aWR0aCA9IChwaWNfd2lkdGhfaW5fbWJzX21pbnVzMSArIDEpICogMTZcbiAgICBsZXQgY29kZWNfaGVpZ2h0ID0gKDIgLSBmcmFtZV9tYnNfb25seV9mbGFnKSAqICgocGljX2hlaWdodF9pbl9tYXBfdW5pdHNfbWludXMxICsgMSkgKiAxNilcblxuICAgIGNvZGVjX3dpZHRoIC09IChmcmFtZV9jcm9wX2xlZnRfb2Zmc2V0ICsgZnJhbWVfY3JvcF9yaWdodF9vZmZzZXQpICogY3JvcF91bml0X3hcbiAgICBjb2RlY19oZWlnaHQgLT0gKGZyYW1lX2Nyb3BfdG9wX29mZnNldCArIGZyYW1lX2Nyb3BfYm90dG9tX29mZnNldCkgKiBjcm9wX3VuaXRfeVxuXG4gICAgbGV0IHByZXNlbnRfd2lkdGggPSBNYXRoLmNlaWwoY29kZWNfd2lkdGggKiBwYXJTY2FsZSlcblxuICAgIGdiLmRlc3Ryb3koKVxuICAgIGdiID0gbnVsbFxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHByb2ZpbGVfc3RyaW5nOiBwcm9maWxlX3N0cmluZyxcbiAgICAgIGxldmVsX3N0cmluZzogbGV2ZWxfc3RyaW5nLFxuICAgICAgYml0X2RlcHRoOiBiaXRfZGVwdGgsXG4gICAgICBjaHJvbWFfZm9ybWF0OiBjaHJvbWFfZm9ybWF0LFxuICAgICAgY2hyb21hX2Zvcm1hdF9zdHJpbmc6IFNQU1BhcnNlci5nZXRDaHJvbWFGb3JtYXRTdHJpbmcoY2hyb21hX2Zvcm1hdCksXG5cbiAgICAgIGZyYW1lX3JhdGU6IHtcbiAgICAgICAgZml4ZWQ6IGZwc19maXhlZCxcbiAgICAgICAgZnBzOiBmcHMsXG4gICAgICAgIGZwc19kZW46IGZwc19kZW4sXG4gICAgICAgIGZwc19udW06IGZwc19udW1cbiAgICAgIH0sXG5cbiAgICAgIHBhcl9yYXRpbzoge1xuICAgICAgICB3aWR0aDogcGFyX3dpZHRoLFxuICAgICAgICBoZWlnaHQ6IHBhcl9oZWlnaHRcbiAgICAgIH0sXG5cbiAgICAgIGNvZGVjX3NpemU6IHtcbiAgICAgICAgd2lkdGg6IGNvZGVjX3dpZHRoLFxuICAgICAgICBoZWlnaHQ6IGNvZGVjX2hlaWdodFxuICAgICAgfSxcblxuICAgICAgcHJlc2VudF9zaXplOiB7XG4gICAgICAgIHdpZHRoOiBwcmVzZW50X3dpZHRoLFxuICAgICAgICBoZWlnaHQ6IGNvZGVjX2hlaWdodFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBfc2tpcFNjYWxpbmdMaXN0IChnYiwgY291bnQpIHtcbiAgICBsZXQgbGFzdF9zY2FsZSA9IDgsIG5leHRfc2NhbGUgPSA4XG4gICAgbGV0IGRlbHRhX3NjYWxlID0gMFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgaWYgKG5leHRfc2NhbGUgIT09IDApIHtcbiAgICAgICAgZGVsdGFfc2NhbGUgPSBnYi5yZWFkU0VHKClcbiAgICAgICAgbmV4dF9zY2FsZSA9IChsYXN0X3NjYWxlICsgZGVsdGFfc2NhbGUgKyAyNTYpICUgMjU2XG4gICAgICB9XG4gICAgICBsYXN0X3NjYWxlID0gKG5leHRfc2NhbGUgPT09IDApID8gbGFzdF9zY2FsZSA6IG5leHRfc2NhbGVcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0UHJvZmlsZVN0cmluZyAocHJvZmlsZUlkYykge1xuICAgIHN3aXRjaCAocHJvZmlsZUlkYykge1xuICAgICAgY2FzZSA2NjpcbiAgICAgICAgcmV0dXJuICdCYXNlbGluZSdcbiAgICAgIGNhc2UgNzc6XG4gICAgICAgIHJldHVybiAnTWFpbidcbiAgICAgIGNhc2UgODg6XG4gICAgICAgIHJldHVybiAnRXh0ZW5kZWQnXG4gICAgICBjYXNlIDEwMDpcbiAgICAgICAgcmV0dXJuICdIaWdoJ1xuICAgICAgY2FzZSAxMTA6XG4gICAgICAgIHJldHVybiAnSGlnaDEwJ1xuICAgICAgY2FzZSAxMjI6XG4gICAgICAgIHJldHVybiAnSGlnaDQyMidcbiAgICAgIGNhc2UgMjQ0OlxuICAgICAgICByZXR1cm4gJ0hpZ2g0NDQnXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ1Vua25vd24nXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldExldmVsU3RyaW5nIChsZXZlbElkYykge1xuICAgIHJldHVybiAobGV2ZWxJZGMgLyAxMCkudG9GaXhlZCgxKVxuICB9XG5cbiAgc3RhdGljIGdldENocm9tYUZvcm1hdFN0cmluZyAoY2hyb21hKSB7XG4gICAgc3dpdGNoIChjaHJvbWEpIHtcbiAgICAgIGNhc2UgNDIwOlxuICAgICAgICByZXR1cm4gJzQ6MjowJ1xuICAgICAgY2FzZSA0MjI6XG4gICAgICAgIHJldHVybiAnNDoyOjInXG4gICAgICBjYXNlIDQ0NDpcbiAgICAgICAgcmV0dXJuICc0OjQ6NCdcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnVW5rbm93bidcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgdG9WaWRlb01ldGEgKHNwc0NvbmZpZykge1xuICAgIGxldCBtZXRhID0ge31cbiAgICBpZiAoc3BzQ29uZmlnICYmIHNwc0NvbmZpZy5jb2RlY19zaXplKSB7XG4gICAgICBtZXRhLmNvZGVjV2lkdGggPSBzcHNDb25maWcuY29kZWNfc2l6ZS53aWR0aFxuICAgICAgbWV0YS5jb2RlY0hlaWdodCA9IHNwc0NvbmZpZy5jb2RlY19zaXplLmhlaWdodFxuICAgICAgbWV0YS5wcmVzZW50V2lkdGggPSBzcHNDb25maWcucHJlc2VudF9zaXplLndpZHRoXG4gICAgICBtZXRhLnByZXNlbnRIZWlnaHQgPSBzcHNDb25maWcucHJlc2VudF9zaXplLmhlaWdodFxuICAgIH1cblxuICAgIG1ldGEucHJvZmlsZSA9IHNwc0NvbmZpZy5wcm9maWxlX3N0cmluZ1xuICAgIG1ldGEubGV2ZWwgPSBzcHNDb25maWcubGV2ZWxfc3RyaW5nXG4gICAgbWV0YS5iaXREZXB0aCA9IHNwc0NvbmZpZy5iaXRfZGVwdGhcbiAgICBtZXRhLmNocm9tYUZvcm1hdCA9IHNwc0NvbmZpZy5jaHJvbWFfZm9ybWF0XG5cbiAgICBtZXRhLnBhclJhdGlvID0ge1xuICAgICAgd2lkdGg6IHNwc0NvbmZpZy5wYXJfcmF0aW8ud2lkdGgsXG4gICAgICBoZWlnaHQ6IHNwc0NvbmZpZy5wYXJfcmF0aW8uaGVpZ2h0XG4gICAgfVxuXG4gICAgbWV0YS5mcmFtZVJhdGUgPSBzcHNDb25maWcuZnJhbWVfcmF0ZVxuXG4gICAgbGV0IGZwc0RlbiA9IG1ldGEuZnJhbWVSYXRlLmZwc19kZW5cbiAgICBsZXQgZnBzTnVtID0gbWV0YS5mcmFtZVJhdGUuZnBzX251bVxuICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb24gPSBNYXRoLmZsb29yKG1ldGEudGltZXNjYWxlICogKGZwc0RlbiAvIGZwc051bSkpXG4gICAgcmV0dXJuIG1ldGE7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU1BTUGFyc2VyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gSExTXG4gIE0zVThQYXJzZXI6IHJlcXVpcmUoJy4vc3JjL2hscy9kZW11eGVyL20zdThwYXJzZXInKS5kZWZhdWx0LFxuICBUc0RlbXV4ZXI6IHJlcXVpcmUoJy4vc3JjL2hscy9kZW11eGVyL3RzJykuZGVmYXVsdCxcbiAgUGxheWxpc3Q6IHJlcXVpcmUoJy4vc3JjL2hscy9wbGF5bGlzdCcpLmRlZmF1bHQsXG4gIEZsdkRlbXV4ZXI6IHJlcXVpcmUoJy4vc3JjL2Zsdi9pbmRleCcpLmRlZmF1bHRcbn07XG4iLCJpbXBvcnQgeyBpc0xlLCBVVEY4IH0gZnJvbSAneGdwbGF5ZXItdXRpbHMnXG5cbmNvbnN0IERBVEFfVFlQRVMgPSB7XG4gIE5VTUJFUjogMCxcbiAgQk9PTEVBTjogMSxcbiAgU1RSSU5HOiAyLFxuICBPQkpFQ1Q6IDMsXG4gIE1JWF9BUlJBWTogOCxcbiAgT0JKRUNUX0VORDogOSxcbiAgU1RSSUNUX0FSUkFZOiAxMCxcbiAgREFURTogMTEsXG4gIExPTkVfU1RSSU5HOiAxMlxufVxuXG4vKipcbiAqIG1ldGHkv6Hmga/op6PmnpBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQU1GUGFyc2VyIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMub2Zmc2V0ID0gMFxuICAgIHRoaXMucmVhZE9mZnNldCA9IHRoaXMub2Zmc2V0XG4gIH1cblxuICByZXNvbHZlIChtZXRhLCBzaXplKSB7XG4gICAgaWYgKHNpemUgPCAzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBlbm91Z2ggZGF0YSBmb3IgbWV0YWluZm8nKVxuICAgIH1cbiAgICBjb25zdCBtZXRhRGF0YSA9IHt9XG4gICAgY29uc3QgbmFtZSA9IHRoaXMucGFyc2VWYWx1ZShtZXRhKVxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5wYXJzZVZhbHVlKG1ldGEsIHNpemUgLSBuYW1lLmJvZHlTaXplKVxuICAgIG1ldGFEYXRhW25hbWUuZGF0YV0gPSB2YWx1ZS5kYXRhXG5cbiAgICB0aGlzLnJlc2V0U3RhdHVzKClcbiAgICByZXR1cm4gbWV0YURhdGFcbiAgfVxuXG4gIHJlc2V0U3RhdHVzICgpIHtcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgICB0aGlzLnJlYWRPZmZzZXQgPSB0aGlzLm9mZnNldFxuICB9XG5cbiAgcGFyc2VTdHJpbmcgKGJ1ZmZlcikge1xuICAgIGNvbnN0IGR2ID0gbmV3IERhdGFWaWV3KGJ1ZmZlciwgdGhpcy5yZWFkT2Zmc2V0KVxuICAgIGNvbnN0IHN0ckxlbiA9IGR2LmdldFVpbnQxNigwLCAhaXNMZSlcbiAgICBsZXQgc3RyID0gJydcbiAgICBpZiAoc3RyTGVuID4gMCkge1xuICAgICAgc3RyID0gVVRGOC5kZWNvZGUobmV3IFVpbnQ4QXJyYXkoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQgKyAyLCBzdHJMZW4pKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSAnJ1xuICAgIH1cbiAgICBsZXQgc2l6ZSA9IHN0ckxlbiArIDJcbiAgICB0aGlzLnJlYWRPZmZzZXQgKz0gc2l6ZVxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBzdHIsXG4gICAgICBib2R5U2l6ZTogc3RyTGVuICsgMlxuICAgIH1cbiAgfVxuXG4gIHBhcnNlRGF0ZSAoYnVmZmVyLCBzaXplKSB7XG4gICAgY29uc3QgZHYgPSBuZXcgRGF0YVZpZXcoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQsIHNpemUpXG4gICAgbGV0IHRzID0gZHYuZ2V0RmxvYXQ2NCgwLCAhaXNMZSlcbiAgICBjb25zdCB0aW1lT2Zmc2V0ID0gZHYuZ2V0SW50MTYoOCwgIWlzTGUpXG4gICAgdHMgKz0gdGltZU9mZnNldCAqIDYwICogMTAwMFxuXG4gICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDEwXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IG5ldyBEYXRlKHRzKSxcbiAgICAgIGJvZHlTaXplOiAxMFxuICAgIH1cbiAgfVxuXG4gIHBhcnNlT2JqZWN0IChidWZmZXIsIHNpemUpIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5wYXJzZVN0cmluZyhidWZmZXIsIHNpemUpXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnBhcnNlVmFsdWUoYnVmZmVyLCBzaXplIC0gbmFtZS5ib2R5U2l6ZSlcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YToge1xuICAgICAgICBuYW1lOiBuYW1lLmRhdGEsXG4gICAgICAgIHZhbHVlOiB2YWx1ZS5kYXRhXG4gICAgICB9LFxuICAgICAgYm9keVNpemU6IG5hbWUuYm9keVNpemUgKyB2YWx1ZS5ib2R5U2l6ZSxcbiAgICAgIGlzT2JqRW5kOiB2YWx1ZS5pc09iakVuZFxuICAgIH1cbiAgfVxuXG4gIHBhcnNlTG9uZ1N0cmluZyAoYnVmZmVyKSB7XG4gICAgY29uc3QgZHYgPSBuZXcgRGF0YVZpZXcoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQpXG4gICAgY29uc3Qgc3RyTGVuID0gZHYuZ2V0VWludDMyKDAsICFpc0xlKVxuICAgIGxldCBzdHIgPSAnJ1xuICAgIGlmIChzdHJMZW4gPiAwKSB7XG4gICAgICBzdHIgPSBVVEY4LmRlY29kZShuZXcgVWludDhBcnJheShidWZmZXIsIHRoaXMucmVhZE9mZnNldCArIDIsIHN0ckxlbikpXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9ICcnXG4gICAgfVxuICAgIC8vIGNvbnN0IHNpemUgPSBzdHJMZW4gKyA0O1xuICAgIHRoaXMucmVhZE9mZnNldCArPSBzdHJMZW4gKyA0XG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IHN0cixcbiAgICAgIGJvZHlTaXplOiBzdHJMZW4gKyA0XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOino+aekG1ldGHkuK3nmoTlj5jph49cbiAgICovXG4gIHBhcnNlVmFsdWUgKGRhdGEsIHNpemUpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKClcbiAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICBidWZmZXIgPSBkYXRhXG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1ZmZlciA9IGRhdGEuYnVmZmVyXG4gICAgfVxuICAgIGNvbnN0IHtcbiAgICAgIE5VTUJFUixcbiAgICAgIEJPT0xFQU4sXG4gICAgICBTVFJJTkcsXG4gICAgICBPQkpFQ1QsXG4gICAgICBNSVhfQVJSQVksXG4gICAgICBPQkpFQ1RfRU5ELFxuICAgICAgU1RSSUNUX0FSUkFZLFxuICAgICAgREFURSxcbiAgICAgIExPTkVfU1RSSU5HXG4gICAgfSA9IERBVEFfVFlQRVNcbiAgICBjb25zdCBkYXRhVmlldyA9IG5ldyBEYXRhVmlldyhidWZmZXIsIHRoaXMucmVhZE9mZnNldCwgc2l6ZSlcbiAgICBsZXQgaXNPYmpFbmQgPSBmYWxzZVxuICAgIGNvbnN0IHR5cGUgPSBkYXRhVmlldy5nZXRVaW50OCgwKVxuICAgIGxldCBvZmZzZXQgPSAxXG4gICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDFcbiAgICBsZXQgdmFsdWUgPSBudWxsXG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgTlVNQkVSOiB7XG4gICAgICAgIHZhbHVlID0gZGF0YVZpZXcuZ2V0RmxvYXQ2NCgxLCAhaXNMZSlcbiAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDhcbiAgICAgICAgb2Zmc2V0ICs9IDhcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGNhc2UgQk9PTEVBTjoge1xuICAgICAgICBjb25zdCBib29sTnVtID0gZGF0YVZpZXcuZ2V0VWludDgoMSlcbiAgICAgICAgdmFsdWUgPSAhIWJvb2xOdW1cbiAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDFcbiAgICAgICAgb2Zmc2V0ICs9IDFcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGNhc2UgU1RSSU5HOiB7XG4gICAgICAgIGNvbnN0IHN0ciA9IHRoaXMucGFyc2VTdHJpbmcoYnVmZmVyKVxuICAgICAgICB2YWx1ZSA9IHN0ci5kYXRhXG4gICAgICAgIG9mZnNldCArPSBzdHIuYm9keVNpemVcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGNhc2UgT0JKRUNUOiB7XG4gICAgICAgIHZhbHVlID0ge31cbiAgICAgICAgbGV0IG9iakVuZFNpemUgPSAwXG4gICAgICAgIGlmIChkYXRhVmlldy5nZXRVaW50MzIoc2l6ZSAtIDQsICFpc0xlKSAmIDB4MDBGRkZGRkYpIHtcbiAgICAgICAgICBvYmpFbmRTaXplID0gM1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMucmVhZE9mZnNldCArPSBvZmZzZXQgLSAxO1xuICAgICAgICB3aGlsZSAob2Zmc2V0IDwgc2l6ZSAtIDQpIHtcbiAgICAgICAgICBjb25zdCBhbWZPYmogPSB0aGlzLnBhcnNlT2JqZWN0KGJ1ZmZlciwgc2l6ZSAtIG9mZnNldCAtIG9iakVuZFNpemUpXG4gICAgICAgICAgaWYgKGFtZk9iai5pc09iamVjdEVuZCkgeyBicmVhayB9XG4gICAgICAgICAgdmFsdWVbYW1mT2JqLmRhdGEubmFtZV0gPSBhbWZPYmouZGF0YS52YWx1ZVxuICAgICAgICAgIG9mZnNldCArPSBhbWZPYmouYm9keVNpemVcbiAgICAgICAgfVxuICAgICAgICBpZiAob2Zmc2V0IDw9IHNpemUgLSAzKSB7XG4gICAgICAgICAgY29uc3QgbWFyayA9IGRhdGFWaWV3LmdldFVpbnQzMihvZmZzZXQgLSAxLCAhaXNMZSkgJiAweDAwRkZGRkZGXG4gICAgICAgICAgaWYgKG1hcmsgPT09IDkpIHtcbiAgICAgICAgICAgIHRoaXMucmVhZE9mZnNldCArPSAzXG4gICAgICAgICAgICBvZmZzZXQgKz0gM1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgY2FzZSBNSVhfQVJSQVk6IHtcbiAgICAgICAgdmFsdWUgPSB7fVxuICAgICAgICBvZmZzZXQgKz0gNFxuICAgICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gNFxuICAgICAgICBsZXQgb2JqRW5kU2l6ZSA9IDBcbiAgICAgICAgaWYgKChkYXRhVmlldy5nZXRVaW50MzIoc2l6ZSAtIDQsICFpc0xlKSAmIDB4MDBGRkZGRkYpID09PSA5KSB7XG4gICAgICAgICAgb2JqRW5kU2l6ZSA9IDNcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChvZmZzZXQgPCBzaXplIC0gOCkge1xuICAgICAgICAgIGNvbnN0IGFtZlZhciA9IHRoaXMucGFyc2VPYmplY3QoYnVmZmVyLCBzaXplIC0gb2Zmc2V0IC0gb2JqRW5kU2l6ZSlcbiAgICAgICAgICBpZiAoYW1mVmFyLmlzT2JqZWN0RW5kKSB7IGJyZWFrIH1cbiAgICAgICAgICB2YWx1ZVthbWZWYXIuZGF0YS5uYW1lXSA9IGFtZlZhci5kYXRhLnZhbHVlXG4gICAgICAgICAgb2Zmc2V0ICs9IGFtZlZhci5ib2R5U2l6ZVxuICAgICAgICB9XG4gICAgICAgIGlmIChvZmZzZXQgPD0gc2l6ZSAtIDMpIHtcbiAgICAgICAgICBjb25zdCBtYXJrZXIgPSBkYXRhVmlldy5nZXRVaW50MzIob2Zmc2V0IC0gMSwgIWlzTGUpICYgMHgwMEZGRkZGRlxuICAgICAgICAgIGlmIChtYXJrZXIgPT09IDkpIHtcbiAgICAgICAgICAgIG9mZnNldCArPSAzXG4gICAgICAgICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gM1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBjYXNlIE9CSkVDVF9FTkQ6IHtcbiAgICAgICAgdmFsdWUgPSBudWxsXG4gICAgICAgIGlzT2JqRW5kID0gdHJ1ZVxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBjYXNlIFNUUklDVF9BUlJBWToge1xuICAgICAgICB2YWx1ZSA9IFtdXG4gICAgICAgIGNvbnN0IGFyckxlbmd0aCA9IGRhdGFWaWV3LmdldFVpbnQzMigxLCAhaXNMZSlcbiAgICAgICAgb2Zmc2V0ICs9IDRcbiAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDRcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IHNjcmlwdCA9IHRoaXMucGFyc2VWYWx1ZShidWZmZXIsIHNpemUgLSBvZmZzZXQpXG4gICAgICAgICAgdmFsdWUucHVzaChzY3JpcHQuZGF0YSlcbiAgICAgICAgICBvZmZzZXQgKz0gc2NyaXB0LmJvZHlTaXplXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgY2FzZSBEQVRFOiB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSB0aGlzLnBhcnNlRGF0ZShidWZmZXIsIHNpemUgLSAxKVxuICAgICAgICB2YWx1ZSA9IGRhdGUuZGF0YVxuICAgICAgICBvZmZzZXQgKz0gZGF0ZS5ib2R5U2l6ZVxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBjYXNlIExPTkVfU1RSSU5HOiB7XG4gICAgICAgIGNvbnN0IGxvbmdTdHIgPSB0aGlzLnBhcnNlTG9uZ1N0cmluZyhidWZmZXIsIHNpemUgLSAxKVxuICAgICAgICB2YWx1ZSA9IGxvbmdTdHIuZGF0YVxuICAgICAgICBvZmZzZXQgKz0gbG9uZ1N0ci5ib2R5U2l6ZVxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIG9mZnNldCA9IHNpemVcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogdmFsdWUsXG4gICAgICBib2R5U2l6ZTogb2Zmc2V0LFxuICAgICAgaXNPYmpFbmQ6IGlzT2JqRW5kXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBFVkVOVFMsIEF1ZGlvVHJhY2tNZXRhLCBWaWRlb1RyYWNrTWV0YSwgc25pZmZlciB9IGZyb20gJ3hncGxheWVyLXV0aWxzJztcbmltcG9ydCB7IFNwc1BhcnNlciB9IGZyb20gJ3hncGxheWVyLWNvZGVjJztcbmltcG9ydCB7IFZpZGVvVHJhY2ssIEF1ZGlvVHJhY2sgfSBmcm9tICd4Z3BsYXllci1idWZmZXInXG5pbXBvcnQgQU1GUGFyc2VyIGZyb20gJy4vYW1mLXBhcnNlcidcblxuY29uc3QgREVNVVhfRVZFTlRTID0gRVZFTlRTLkRFTVVYX0VWRU5UUztcblxuY2xhc3MgRmx2RGVtdXhlciB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLl9maXJzdEZyYWdtZW50TG9hZGVkID0gZmFsc2VcbiAgICB0aGlzLl90cmFja051bSA9IDBcbiAgICB0aGlzLl9oYXNTY3JpcHQgPSBmYWxzZVxuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgdGhpcy5vbihERU1VWF9FVkVOVFMuREVNVVhfU1RBUlQsIHRoaXMuZG9QYXJzZUZsdi5iaW5kKHRoaXMpKVxuICB9XG5cbiAgLyoqXG4gICAqIGlmIHRoZSBmbHYgaGVhZCBpcyB2YWxpZFxuICAgKiBAcGFyYW0gZGF0YVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHN0YXRpYyBpc0ZsdkZpbGUgKGRhdGEpIHtcbiAgICByZXR1cm4gIShkYXRhWzBdICE9PSAweDQ2IHx8IGRhdGFbMV0gIT09IDB4NEMgfHwgZGF0YVsyXSAhPT0gMHg1NiB8fCBkYXRhWzNdICE9PSAweDAxKVxuICB9XG5cbiAgLyoqXG4gICAqIElmIHRoZSBzdHJlYW0gaGFzIGF1ZGlvIG9yIHZpZGVvLlxuICAgKiBAcGFyYW0ge251bWJlcn0gc3RyZWFtRmxhZyAtIERhdGEgZnJvbSB0aGUgc3RyZWFtIHdoaWNoIGlzIGRlZmluZSB3aGV0aGVyIHRoZSBhdWRpbyAvIHZpZGVvIHRyYWNrIGlzIGV4aXN0LlxuICAgKi9cbiAgc3RhdGljIGdldFBsYXlUeXBlIChzdHJlYW1GbGFnKSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgaGFzVmlkZW86IGZhbHNlLFxuICAgICAgaGFzQXVkaW86IGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKHN0cmVhbUZsYWcgJiAweDAxID4gMCkge1xuICAgICAgcmVzdWx0Lmhhc1ZpZGVvID0gdHJ1ZVxuICAgIH1cblxuICAgIGlmIChzdHJlYW1GbGFnICYgMHgwNCA+IDApIHtcbiAgICAgIHJlc3VsdC5oYXNBdWRpbyA9IHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICBkb1BhcnNlRmx2ICgpIHtcbiAgICBpZiAoIXRoaXMuX2ZpcnN0RnJhZ21lbnRMb2FkZWQpIHtcbiAgICAgIGlmICh0aGlzLmxvYWRlckJ1ZmZlci5sZW5ndGggPCAxMykge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IGhlYWRlciA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDEzKVxuICAgICAgdGhpcy5wYXJzZUZsdkhlYWRlcihoZWFkZXIpXG4gICAgICB0aGlzLmRvUGFyc2VGbHYoKSAvLyDpgJLlvZLosIPnlKjvvIznu6fnu63op6PmnpBmbHbmtYFcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMubG9hZGVyQnVmZmVyLmxlbmd0aCA8IDExKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgbGV0IGNodW5rO1xuXG4gICAgICBsZXQgbG9vcE1heCA9IDEwMDAwMCAvLyDpmLLmraLmrbvlvqrnjq/kuqfnlJ9cbiAgICAgIGRvIHtcbiAgICAgICAgY2h1bmsgPSB0aGlzLl9wYXJzZUZsdlRhZygpXG4gICAgICB9IHdoaWxlIChjaHVuayAmJiBsb29wTWF4LS0gPiAwKVxuXG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0NPTVBMRVRFKVxuICAgIH1cbiAgfVxuXG4gIHBhcnNlRmx2SGVhZGVyIChoZWFkZXIpIHtcbiAgICBpZiAoIUZsdkRlbXV4ZXIuaXNGbHZGaWxlKGhlYWRlcikpIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIG5ldyBFcnJvcignaW52YWxpZCBmbHYgZmlsZScpKVxuICAgICAgdGhpcy5kb1BhcnNlRmx2KClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZmlyc3RGcmFnbWVudExvYWRlZCA9IHRydWVcbiAgICAgIGNvbnN0IHBsYXlUeXBlID0gRmx2RGVtdXhlci5nZXRQbGF5VHlwZShoZWFkZXJbNF0pXG5cbiAgICAgIGlmIChwbGF5VHlwZS5oYXNWaWRlbykge1xuICAgICAgICB0aGlzLmluaXRWaWRlb1RyYWNrKClcbiAgICAgIH1cblxuICAgICAgaWYgKHBsYXlUeXBlLmhhc0F1ZGlvKSB7XG4gICAgICAgIHRoaXMuaW5pdEF1ZGlvVHJhY2soKVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmRvUGFyc2VGbHYoKVxuICB9XG5cbiAgLyoqXG4gICAqIGluaXQgZGVmYXVsdCB2aWRlbyB0cmFjayBjb25maWdzXG4gICAqL1xuICBpbml0VmlkZW9UcmFjayAoKSB7XG4gICAgdGhpcy5fdHJhY2tOdW0rK1xuICAgIGxldCB2aWRlb1RyYWNrID0gbmV3IFZpZGVvVHJhY2soKVxuICAgIHZpZGVvVHJhY2subWV0YSA9IG5ldyBWaWRlb1RyYWNrTWV0YSgpXG4gICAgdmlkZW9UcmFjay5pZCA9IHZpZGVvVHJhY2subWV0YS5pZCA9IHRoaXMuX3RyYWNrTnVtXG5cbiAgICB0aGlzLnRyYWNrcy52aWRlb1RyYWNrID0gdmlkZW9UcmFja1xuICB9XG5cbiAgLyoqXG4gICAqIGluaXQgZGVmYXVsdCBhdWRpbyB0cmFjayBjb25maWdzXG4gICAqL1xuICBpbml0QXVkaW9UcmFjayAoKSB7XG4gICAgdGhpcy5fdHJhY2tOdW0rK1xuICAgIGxldCBhdWRpb1RyYWNrID0gbmV3IEF1ZGlvVHJhY2soKVxuICAgIGF1ZGlvVHJhY2subWV0YSA9IG5ldyBBdWRpb1RyYWNrTWV0YSgpXG4gICAgYXVkaW9UcmFjay5pZCA9IGF1ZGlvVHJhY2subWV0YS5pZCA9IHRoaXMuX3RyYWNrTnVtXG5cbiAgICB0aGlzLnRyYWNrcy5hdWRpb1RyYWNrID0gYXVkaW9UcmFja1xuICB9XG5cbiAgLyoqXG4gICAqIFBhY2thZ2UgdGhlIGRhdGEgYXMgdGhlIGZvbGxvd2luZyBkYXRhIHN0cnVjdHVyZVxuICAgKiB7XG4gICAqICAgIGRhdGE6IFVpbnQ4QXJyYXkuIHRoZSBTdHJlYW0gZGF0YS5cbiAgICogICAgaW5mbzogVGhlIGZpcnN0IGJ5dGUgaW5mbyBvZiB0aGUgVGFnLlxuICAgKiAgICB0YWdUeXBlOiA444CBOeOAgTE4XG4gICAqICAgIHRpbWVTdGFtcDogdGhlIHRpbWVzdGVtcFxuICAgKiB9XG4gICAqL1xuICBfcGFyc2VGbHZUYWcgKCkge1xuICAgIGlmICh0aGlzLmxvYWRlckJ1ZmZlci5sZW5ndGggPCAxMSkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgbGV0IGNodW5rID0gdGhpcy5fcGFyc2VGbHZUYWdIZWFkZXIoKVxuICAgIGlmIChjaHVuaykge1xuICAgICAgdGhpcy5fcHJvY2Vzc0NodW5rKGNodW5rKVxuICAgIH1cbiAgICByZXR1cm4gY2h1bmtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZSB0aGUgMTEgYnl0ZSB0YWcgSGVhZGVyXG4gICAqL1xuICBfcGFyc2VGbHZUYWdIZWFkZXIgKCkge1xuICAgIGxldCBvZmZzZXQgPSAwXG4gICAgbGV0IGNodW5rID0ge31cblxuICAgIGxldCB0YWdUeXBlID0gdGhpcy5sb2FkZXJCdWZmZXIudG9JbnQob2Zmc2V0LCAxKVxuICAgIG9mZnNldCArPSAxXG5cbiAgICAvLyAyIGJpdCBGTVMgcmVzZXJ2ZWQsIDEgYml0IGZpbHRlcmVkLCA1IGJpdCB0YWcgdHlwZVxuICAgIGNodW5rLmZpbHRlcmVkID0gKHRhZ1R5cGUgJiAzMikgPj4+IDVcbiAgICBjaHVuay50YWdUeXBlID0gdGFnVHlwZSAmIDMxXG5cbiAgICAvLyAzIEJ5dGUgZGF0YXNpemVcbiAgICBjaHVuay5kYXRhc2l6ZSA9IHRoaXMubG9hZGVyQnVmZmVyLnRvSW50KG9mZnNldCwgMylcbiAgICBvZmZzZXQgKz0gM1xuXG4gICAgaWYgKChjaHVuay50YWdUeXBlICE9PSA4ICYmIGNodW5rLnRhZ1R5cGUgIT09IDkgJiYgY2h1bmsudGFnVHlwZSAhPT0gMTEgJiYgY2h1bmsudGFnVHlwZSAhPT0gMTgpIHx8XG4gICAgICB0aGlzLmxvYWRlckJ1ZmZlci50b0ludCg4LCAzKSAhPT0gMCkge1xuICAgICAgaWYgKHRoaXMubG9hZGVyQnVmZmVyICYmIHRoaXMubG9hZGVyQnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMSlcbiAgICAgIH1cbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIHRoaXMuVEFHLCBuZXcgRXJyb3IoJ3RhZ1R5cGUgJyArIGNodW5rLnRhZ1R5cGUpLCBmYWxzZSlcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgaWYgKHRoaXMubG9hZGVyQnVmZmVyLmxlbmd0aCA8IGNodW5rLmRhdGFzaXplICsgMTUpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgLy8gcmVhZCB0aGUgZGF0YS5cbiAgICB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCg0KVxuXG4gICAgLy8gMyBCeXRlIHRpbWVzdGFtcFxuICAgIGxldCB0aW1lc3RhbXAgPSB0aGlzLmxvYWRlckJ1ZmZlci50b0ludCgwLCAzKVxuICAgIHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDMpXG5cbiAgICAvLyAxIEJ5dGUgdGltZXN0YW1wRXh0XG4gICAgbGV0IHRpbWVzdGFtcEV4dCA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDEpWzBdXG4gICAgaWYgKHRpbWVzdGFtcEV4dCA+IDApIHtcbiAgICAgIHRpbWVzdGFtcCArPSB0aW1lc3RhbXBFeHQgKiAweDEwMDAwMDBcbiAgICB9XG5cbiAgICBjaHVuay5kdHMgPSB0aW1lc3RhbXBcblxuICAgIC8vIHN0cmVhbUlkXG4gICAgdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMylcbiAgICByZXR1cm4gY2h1bmtcbiAgfVxuXG4gIF9wcm9jZXNzQ2h1bmsgKGNodW5rKSB7XG4gICAgc3dpdGNoIChjaHVuay50YWdUeXBlKSB7XG4gICAgICBjYXNlIDE4OlxuICAgICAgICB0aGlzLl9wYXJzZVNjcmlwdERhdGEoY2h1bmspXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDg6XG4gICAgICAgIHRoaXMuX3BhcnNlQUFDRGF0YShjaHVuaylcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgOTpcbiAgICAgICAgdGhpcy5fcGFyc2VIZXZjRGF0YShjaHVuaylcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMTE6XG4gICAgICAgIC8vIGZvciBzb21lIENETiB0aGF0IGRpZCBub3QgcHJvY2VzcyB0aGUgY3VycmVjdCBSVE1QIG1lc3NhZ2VzXG4gICAgICAgIHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDMpXG4gICAgICAgIGJyZWFrXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgxKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBwYXJzZSBmbHYgc2NyaXB0IGRhdGFcbiAgICogQHBhcmFtIGNodW5rXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcGFyc2VTY3JpcHREYXRhIChjaHVuaykge1xuICAgIGxldCBhdWRpb1RyYWNrID0gdGhpcy50cmFja3MuYXVkaW9UcmFja1xuICAgIGxldCB2aWRlb1RyYWNrID0gdGhpcy50cmFja3MudmlkZW9UcmFja1xuXG4gICAgbGV0IGRhdGEgPSB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdChjaHVuay5kYXRhc2l6ZSlcblxuICAgIGNvbnN0IGluZm8gPSBuZXcgQU1GUGFyc2VyKCkucmVzb2x2ZShkYXRhLCBkYXRhLmxlbmd0aClcblxuICAgIGNvbnN0IG9uTWV0YURhdGEgPSB0aGlzLl9jb250ZXh0Lm9uTWV0YURhdGEgPSBpbmZvID8gaW5mby5vbk1ldGFEYXRhIDogdW5kZWZpbmVkXG5cbiAgICAvLyBmaWxsIG1lZGlhSW5mb1xuICAgIHRoaXMuX2NvbnRleHQubWVkaWFJbmZvLmR1cmF0aW9uID0gb25NZXRhRGF0YS5kdXJhdGlvblxuICAgIHRoaXMuX2NvbnRleHQubWVkaWFJbmZvLmhhc1ZpZGVvID0gb25NZXRhRGF0YS5oYXNWaWRlb1xuICAgIHRoaXMuX2NvbnRleHQubWVkaWFJbmZvLmhzYUF1ZGlvID0gb25NZXRhRGF0YS5oYXNBdWRpb1xuXG4gICAgbGV0IHZhbGlkYXRlID0gdGhpcy5fZGF0YXNpemVWYWxpZGF0b3IoY2h1bmsuZGF0YXNpemUpXG4gICAgaWYgKHZhbGlkYXRlKSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FRElBX0lORk8pXG4gICAgICB0aGlzLl9oYXNTY3JpcHQgPSB0cnVlXG4gICAgfVxuXG4gICAgLy8gRWRpdCBkZWZhdWx0IG1ldGEuXG4gICAgaWYgKGF1ZGlvVHJhY2sgJiYgIWF1ZGlvVHJhY2suaGFzU3BlY2lmaWNDb25maWcpIHtcbiAgICAgIGxldCBtZXRhID0gYXVkaW9UcmFjay5tZXRhXG4gICAgICBpZiAob25NZXRhRGF0YS5hdWRpb3NhbXBsZXJhdGUpIHtcbiAgICAgICAgbWV0YS5zYW1wbGVSYXRlID0gb25NZXRhRGF0YS5hdWRpb3NhbXBsZXJhdGVcbiAgICAgIH1cblxuICAgICAgaWYgKG9uTWV0YURhdGEuYXVkaW9jaGFubmVscykge1xuICAgICAgICBtZXRhLmNoYW5uZWxDb3VudCA9IG9uTWV0YURhdGEuYXVkaW9jaGFubmVsc1xuICAgICAgfVxuXG4gICAgICBzd2l0Y2ggKG9uTWV0YURhdGEuYXVkaW9zYW1wbGVyYXRlKSB7XG4gICAgICAgIGNhc2UgNDQxMDA6XG4gICAgICAgICAgbWV0YS5zYW1wbGVSYXRlSW5kZXggPSA0XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAyMjA1MDpcbiAgICAgICAgICBtZXRhLnNhbXBsZVJhdGVJbmRleCA9IDdcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDExMDI1OlxuICAgICAgICAgIG1ldGEuc2FtcGxlUmF0ZUluZGV4ID0gMTBcbiAgICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodmlkZW9UcmFjayAmJiAhdmlkZW9UcmFjay5oYXNTcGVjaWZpY0NvbmZpZykge1xuICAgICAgbGV0IG1ldGEgPSB2aWRlb1RyYWNrLm1ldGFcbiAgICAgIGlmICh0eXBlb2Ygb25NZXRhRGF0YS5mcmFtZXJhdGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGxldCBmcHNOdW0gPSBNYXRoLmZsb29yKG9uTWV0YURhdGEuZnJhbWVyYXRlICogMTAwMClcbiAgICAgICAgaWYgKGZwc051bSA+IDApIHtcbiAgICAgICAgICBsZXQgZnBzID0gZnBzTnVtIC8gMTAwMFxuICAgICAgICAgIGlmICghbWV0YS5mcmFtZVJhdGUpIHtcbiAgICAgICAgICAgIG1ldGEuZnJhbWVSYXRlID0ge31cbiAgICAgICAgICB9XG4gICAgICAgICAgbWV0YS5mcmFtZVJhdGUuZml4ZWQgPSB0cnVlXG4gICAgICAgICAgbWV0YS5mcmFtZVJhdGUuZnBzID0gZnBzXG4gICAgICAgICAgbWV0YS5mcmFtZVJhdGUuZnBzX251bSA9IGZwc051bVxuICAgICAgICAgIG1ldGEuZnJhbWVSYXRlLmZwc19kZW4gPSAxMDAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfYWFjU2VxdWVuY2VIZWFkZXJQYXJzZXIgKGRhdGEpIHtcbiAgICBsZXQgcmV0ID0ge31cbiAgICByZXQuaGFzU3BlY2lmaWNDb25maWcgPSB0cnVlXG4gICAgcmV0Lm9iamVjdFR5cGUgPSBkYXRhWzFdID4+PiAzXG4gICAgcmV0Lm9yaWdpbk9iamVjdFR5cGUgPSByZXQub2JqZWN0VHlwZVxuICAgIHJldC5zYW1wbGVSYXRlSW5kZXggPSAoKGRhdGFbMV0gJiA3KSA8PCAxKSB8IChkYXRhWzJdID4+PiA3KVxuICAgIHJldC5hdWRpb3NhbXBsZXJhdGUgPSB0aGlzLl9zd2l0Y2hBdWRpb1NhbXBsZVJhdGUocmV0LnNhbXBsZVJhdGVJbmRleClcbiAgICByZXQuY2hhbm5lbENvdW50ID0gKGRhdGFbMl0gJiAxMjApID4+PiAzXG4gICAgcmV0LmZyYW1lTGVuZ3RoID0gKGRhdGFbMl0gJiA0KSA+Pj4gMlxuICAgIHJldC5kZXBlbmRzT25Db3JlQ29kZXIgPSAoZGF0YVsyXSAmIDIpID4+PiAxXG4gICAgcmV0LmV4dGVuc2lvbkZsYWdJbmRleCA9IGRhdGFbMl0gJiAxXG5cbiAgICByZXQuY29kZWMgPSBgbXA0YS40MC4ke3JldC5vYmplY3RUeXBlfWBcbiAgICBsZXQgdXNlckFnZW50ID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbiAgICBsZXQgZXh0ZW5zaW9uU2FtcGxpbmdJbmRleDtcblxuICAgIGxldCBjb25maWc7XG4gICAgbGV0IHNhbXBsaW5nSW5kZXggPSByZXQuc2FtcGxlUmF0ZUluZGV4O1xuXG4gICAgaWYgKHVzZXJBZ2VudC5pbmRleE9mKCdmaXJlZm94JykgIT09IC0xKSB7XG4gICAgICAvLyBmaXJlZm94OiB1c2UgU0JSIChIRS1BQUMpIGlmIGZyZXEgbGVzcyB0aGFuIDI0a0h6XG4gICAgICBpZiAocmV0LnNhbXBsZVJhdGVJbmRleCA+PSA2KSB7XG4gICAgICAgIHJldC5vYmplY3RUeXBlID0gNTtcbiAgICAgICAgY29uZmlnID0gbmV3IEFycmF5KDQpO1xuICAgICAgICBleHRlbnNpb25TYW1wbGluZ0luZGV4ID0gc2FtcGxpbmdJbmRleCAtIDM7XG4gICAgICB9IGVsc2UgeyAvLyB1c2UgTEMtQUFDXG4gICAgICAgIHJldC5vYmplY3RUeXBlID0gMjtcbiAgICAgICAgY29uZmlnID0gbmV3IEFycmF5KDIpO1xuICAgICAgICBleHRlbnNpb25TYW1wbGluZ0luZGV4ID0gc2FtcGxpbmdJbmRleDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHVzZXJBZ2VudC5pbmRleE9mKCdhbmRyb2lkJykgIT09IC0xIHx8IHNuaWZmZXIuYnJvd3NlciA9PT0gJ3NhZmFyaScpIHtcbiAgICAgIC8vIGFuZHJvaWQ6IGFsd2F5cyB1c2UgTEMtQUFDXG4gICAgICByZXQub2JqZWN0VHlwZSA9IDI7XG4gICAgICBjb25maWcgPSBuZXcgQXJyYXkoMik7XG4gICAgICBleHRlbnNpb25TYW1wbGluZ0luZGV4ID0gc2FtcGxpbmdJbmRleDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZm9yIG90aGVyIGJyb3dzZXJzLCBlLmcuIGNocm9tZS4uLlxuICAgICAgLy8gQWx3YXlzIHVzZSBIRS1BQUMgdG8gbWFrZSBpdCBlYXNpZXIgdG8gc3dpdGNoIGFhYyBjb2RlYyBwcm9maWxlXG4gICAgICByZXQub2JqZWN0VHlwZSA9IDU7XG4gICAgICBleHRlbnNpb25TYW1wbGluZ0luZGV4ID0gcmV0LnNhbXBsZVJhdGVJbmRleDtcbiAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSg0KTtcblxuICAgICAgaWYgKHJldC5zYW1wbGVSYXRlSW5kZXggPj0gNikge1xuICAgICAgICBleHRlbnNpb25TYW1wbGluZ0luZGV4ID0gcmV0LnNhbXBsZVJhdGVJbmRleCAtIDM7XG4gICAgICB9IGVsc2UgaWYgKHJldC5jaGFubmVsQ291bnQgPT09IDEpIHsgLy8gTW9ubyBjaGFubmVsXG4gICAgICAgIHJldC5vYmplY3RUeXBlID0gMjtcbiAgICAgICAgY29uZmlnID0gbmV3IEFycmF5KDIpO1xuICAgICAgICBleHRlbnNpb25TYW1wbGluZ0luZGV4ID0gcmV0LnNhbXBsZVJhdGVJbmRleDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25maWdbMF0gPSByZXQub2JqZWN0VHlwZSA8PCAzO1xuICAgIGNvbmZpZ1swXSB8PSAocmV0LnNhbXBsZVJhdGVJbmRleCAmIDB4MEYpID4+PiAxO1xuICAgIGNvbmZpZ1sxXSA9IChyZXQuc2FtcGxlUmF0ZUluZGV4ICYgMHgwRikgPDwgNztcbiAgICBjb25maWdbMV0gfD0gKHJldC5jaGFubmVsQ291bnQgJiAweDBGKSA8PCAzO1xuICAgIGlmIChyZXQub2JqZWN0VHlwZSA9PT0gNSkge1xuICAgICAgY29uZmlnWzFdIHw9ICgoZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCAmIDB4MEYpID4+PiAxKTtcbiAgICAgIGNvbmZpZ1syXSA9IChleHRlbnNpb25TYW1wbGluZ0luZGV4ICYgMHgwMSkgPDwgNztcbiAgICAgIC8vIGV4dGVuZGVkIGF1ZGlvIG9iamVjdCB0eXBlOiBmb3JjZSB0byAyIChMQy1BQUMpXG4gICAgICBjb25maWdbMl0gfD0gKDIgPDwgMik7XG4gICAgICBjb25maWdbM10gPSAwO1xuICAgIH1cbiAgICByZXQuY29uZmlnID0gY29uZmlnXG4gICAgcmV0dXJuIHJldFxuICB9XG5cbiAgX3BhcnNlQUFDRGF0YSAoY2h1bmspIHtcbiAgICBsZXQgdHJhY2sgPSB0aGlzLnRyYWNrcy5hdWRpb1RyYWNrXG4gICAgaWYgKCF0cmFjaykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IG1ldGEgPSB0cmFjay5tZXRhXG5cbiAgICBpZiAoIW1ldGEpIHtcbiAgICAgIHRyYWNrLm1ldGEgPSBuZXcgQXVkaW9UcmFja01ldGEoKVxuICAgICAgbWV0YSA9IHRyYWNrLm1ldGE7XG4gICAgfVxuXG4gICAgbGV0IGluZm8gPSB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgxKVswXVxuXG4gICAgY2h1bmsuZGF0YSA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KGNodW5rLmRhdGFzaXplIC0gMSlcblxuICAgIGxldCBmb3JtYXQgPSAoaW5mbyAmIDI0MCkgPj4+IDRcblxuICAgIHRyYWNrLmZvcm1hdCA9IGZvcm1hdFxuXG4gICAgaWYgKGZvcm1hdCAhPT0gMTApIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIG5ldyBFcnJvcihgaW52YWxpZCBhdWRpbyBmb3JtYXQ6ICR7Zm9ybWF0fWApKVxuICAgIH1cblxuICAgIGlmIChmb3JtYXQgPT09IDEwICYmICF0aGlzLl9oYXNBdWRpb1NlcXVlbmNlKSB7XG4gICAgICBtZXRhLnNhbXBsZVJhdGUgPSB0aGlzLl9zd2l0Y2hBdWRpb1NhbXBsaW5nRnJlcXVlbmN5KGluZm8pXG4gICAgICBtZXRhLnNhbXBsZVJhdGVJbmRleCA9IChpbmZvICYgMTIpID4+PiAyXG4gICAgICBtZXRhLmZyYW1lTGVudGggPSAoaW5mbyAmIDIpID4+PiAxXG4gICAgICBtZXRhLmNoYW5uZWxDb3VudCA9IGluZm8gJiAxXG4gICAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uID0gTWF0aC5mbG9vcigxMDI0IC8gbWV0YS5hdWRpb1NhbXBsZVJhdGUgKiBtZXRhLnRpbWVzY2FsZSlcbiAgICB9XG5cbiAgICBsZXQgYXVkaW9TYW1wbGVSYXRlID0gbWV0YS5hdWRpb1NhbXBsZVJhdGVcbiAgICBsZXQgYXVkaW9TYW1wbGVSYXRlSW5kZXggPSBtZXRhLnNhbXBsZVJhdGVJbmRleFxuICAgIGxldCByZWZTYW1wbGVEdXJhdGlvbiA9IG1ldGEucmVmU2FtcGxlRHVyYXRpb25cblxuICAgIGRlbGV0ZSBjaHVuay50YWdUeXBlXG4gICAgbGV0IHZhbGlkYXRlID0gdGhpcy5fZGF0YXNpemVWYWxpZGF0b3IoY2h1bmsuZGF0YXNpemUpXG5cbiAgICBpZiAoY2h1bmsuZGF0YVswXSA9PT0gMCkgeyAvLyBBQUMgU2VxdWVuY2UgSGVhZGVyXG4gICAgICBsZXQgYWFjSGVhZGVyID0gdGhpcy5fYWFjU2VxdWVuY2VIZWFkZXJQYXJzZXIoY2h1bmsuZGF0YSlcbiAgICAgIGF1ZGlvU2FtcGxlUmF0ZSA9IGFhY0hlYWRlci5hdWRpb3NhbXBsZXJhdGUgfHwgbWV0YS5hdWRpb1NhbXBsZVJhdGVcbiAgICAgIGF1ZGlvU2FtcGxlUmF0ZUluZGV4ID0gYWFjSGVhZGVyLnNhbXBsZVJhdGVJbmRleCB8fCBtZXRhLnNhbXBsZVJhdGVJbmRleFxuICAgICAgcmVmU2FtcGxlRHVyYXRpb24gPSBNYXRoLmZsb29yKDEwMjQgLyBhdWRpb1NhbXBsZVJhdGUgKiBtZXRhLnRpbWVzY2FsZSlcblxuICAgICAgbWV0YS5jaGFubmVsQ291bnQgPSBhYWNIZWFkZXIuY2hhbm5lbENvdW50XG4gICAgICBtZXRhLnNhbXBsZVJhdGUgPSBhdWRpb1NhbXBsZVJhdGVcbiAgICAgIG1ldGEuc2FtcGxlUmF0ZUluZGV4ID0gYXVkaW9TYW1wbGVSYXRlSW5kZXhcbiAgICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb24gPSByZWZTYW1wbGVEdXJhdGlvblxuICAgICAgbWV0YS5kdXJhdGlvbiA9IHRoaXMuX2NvbnRleHQubWVkaWFJbmZvLmR1cmF0aW9uICogbWV0YS50aW1lc2NhbGVcbiAgICAgIG1ldGEuY29uZmlnID0gYWFjSGVhZGVyLmNvbmZpZ1xuICAgICAgbWV0YS5vYmplY3RUeXBlID0gYWFjSGVhZGVyLm9iamVjdFR5cGU7XG4gICAgICBtZXRhLm9yaWdpbk9iamVjdFR5cGUgPSBhYWNIZWFkZXIub3JpZ2luT2JqZWN0VHlwZTtcblxuICAgICAgY29uc3QgYXVkaW9NZWRpYSA9IHRoaXMuX2NvbnRleHQubWVkaWFJbmZvLmF1ZGlvXG5cbiAgICAgIC8vIGZpbGwgYXVkaW8gbWVkaWEgaW5mb1xuICAgICAgYXVkaW9NZWRpYS5jb2RlYyA9IGFhY0hlYWRlci5jb2RlY1xuICAgICAgYXVkaW9NZWRpYS5jaGFubmVsQ291bnQgPSBhYWNIZWFkZXIuY2hhbm5lbENvdW50XG4gICAgICBhdWRpb01lZGlhLnNhbXBsZVJhdGUgPSBhdWRpb1NhbXBsZVJhdGVcbiAgICAgIGF1ZGlvTWVkaWEuc2FtcGxlUmF0ZUluZGV4ID0gYWFjSGVhZGVyLmF1ZGlvU2FtcGxlUmF0ZUluZGV4XG5cbiAgICAgIGlmICh0aGlzLl9oYXNTY3JpcHQgJiYgIXRoaXMuX2hhc0F1ZGlvU2VxdWVuY2UpIHtcbiAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICdhdWRpbycpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2hhc1NjcmlwdCAmJiB0aGlzLl9oYXNBdWRpb1NlcXVlbmNlKSB7XG4gICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAnYXVkaW8nKVxuICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkFVRElPX01FVEFEQVRBX0NIQU5HRSlcbiAgICAgICAgLy8gdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICdhdWRpbycpXG4gICAgICB9XG4gICAgICB0aGlzLl9oYXNBdWRpb1NlcXVlbmNlID0gdHJ1ZVxuXG4gICAgICB0aGlzLl9tZXRhQ2hhbmdlID0gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5fbWV0YUNoYW5nZSkge1xuICAgICAgICBjaHVuay5vcHRpb25zID0ge1xuICAgICAgICAgIG1ldGE6IHRyYWNrLm1ldGFcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fbWV0YUNoYW5nZSA9IGZhbHNlXG4gICAgICB9XG5cbiAgICAgIGNodW5rLmRhdGEgPSBjaHVuay5kYXRhLnNsaWNlKDEsIGNodW5rLmRhdGEubGVuZ3RoKVxuICAgICAgdHJhY2suc2FtcGxlcy5wdXNoKGNodW5rKVxuICAgIH1cbiAgICBpZiAoIXZhbGlkYXRlKSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLlRBRywgbmV3IEVycm9yKCdUQUcgbGVuZ3RoIGVycm9yIGF0ICcgKyBjaHVuay5kYXRhc2l6ZSksIGZhbHNlKVxuICAgICAgLy8gdGhpcy5sb2dnZXIud2Fybih0aGlzLlRBRywgZXJyb3IubWVzc2FnZSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcGFyc2UgaGV2Yy9hdmMgdmlkZW8gZGF0YVxuICAgKiBAcGFyYW0gY2h1bmtcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9wYXJzZUhldmNEYXRhIChjaHVuaykge1xuICAgIC8vIGhlYWRlclxuICAgIGxldCBpbmZvID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMSlbMF1cbiAgICBjaHVuay5mcmFtZVR5cGUgPSAoaW5mbyAmIDB4ZjApID4+PiA0XG4gICAgY2h1bmsuaXNLZXlmcmFtZSA9IGNodW5rLmZyYW1lVHlwZSA9PT0gMVxuICAgIC8vIGxldCB0ZW1wQ29kZWNJRCA9IHRoaXMudHJhY2tzLnZpZGVvVHJhY2suY29kZWNJRFxuICAgIGxldCBjb2RlY0lEID0gaW5mbyAmIDB4MGZcbiAgICB0aGlzLnRyYWNrcy52aWRlb1RyYWNrLmNvZGVjSUQgPSBjb2RlY0lEXG5cbiAgICAvLyBoZXZj5ZKMYXZj55qEaGVhZGVy6Kej5p6Q5pa55byP5LiA5qC3XG4gICAgY2h1bmsuYXZjUGFja2V0VHlwZSA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDEpWzBdXG4gICAgY2h1bmsuY3RzID0gdGhpcy5sb2FkZXJCdWZmZXIudG9JbnQoMCwgMylcbiAgICB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgzKVxuXG4gICAgLy8gMTIgZm9yIGhldmMsIDcgZm9yIGF2Y1xuICAgIGlmIChjb2RlY0lEID09PSAxMikge1xuICAgICAgY29uc3QgZGF0YSA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KGNodW5rLmRhdGFzaXplIC0gNSlcbiAgICAgIGNodW5rLmRhdGEgPSBkYXRhXG5cbiAgICAgIGlmIChOdW1iZXIucGFyc2VJbnQoY2h1bmsuYXZjUGFja2V0VHlwZSkgIT09IDApIHtcbiAgICAgICAgaWYgKCF0aGlzLl9kYXRhc2l6ZVZhbGlkYXRvcihjaHVuay5kYXRhc2l6ZSkpIHtcbiAgICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLlRBRywgbmV3IEVycm9yKGBpbnZhbGlkIHZpZGVvIHRhZyBkYXRhc2l6ZTogJHtjaHVuay5kYXRhc2l6ZX1gKSwgZmFsc2UpXG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5hbHUgPSB7fVxuICAgICAgICBsZXQgciA9IDBcbiAgICAgICAgbmFsdS5jdHMgPSBjaHVuay5jdHNcbiAgICAgICAgbmFsdS5kdHMgPSBjaHVuay5kdHNcbiAgICAgICAgd2hpbGUgKGNodW5rLmRhdGEubGVuZ3RoID4gcikge1xuICAgICAgICAgIGxldCBzaXplcyA9IGNodW5rLmRhdGEuc2xpY2UoTnVtYmVyLnBhcnNlSW50KHIpLCA0ICsgcilcbiAgICAgICAgICBuYWx1LnNpemUgPSBzaXplc1szXVxuICAgICAgICAgIG5hbHUuc2l6ZSArPSBzaXplc1syXSAqIDI1NlxuICAgICAgICAgIG5hbHUuc2l6ZSArPSBzaXplc1sxXSAqIDI1NiAqIDI1NlxuICAgICAgICAgIG5hbHUuc2l6ZSArPSBzaXplc1swXSAqIDI1NiAqIDI1NiAqIDI1NlxuICAgICAgICAgIHIgKz0gNFxuICAgICAgICAgIG5hbHUuZGF0YSA9IGNodW5rLmRhdGEuc2xpY2UoTnVtYmVyLnBhcnNlSW50KHIpLCBuYWx1LnNpemUgKyByKVxuICAgICAgICAgIHIgKz0gbmFsdS5zaXplXG4gICAgICAgICAgdGhpcy50cmFja3MudmlkZW9UcmFjay5zYW1wbGVzLnB1c2gobmFsdSlcbiAgICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgJ3ZpZGVvJylcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChOdW1iZXIucGFyc2VJbnQoY2h1bmsuYXZjUGFja2V0VHlwZSkgPT09IDApIHtcbiAgICAgICAgaWYgKCF0aGlzLl9kYXRhc2l6ZVZhbGlkYXRvcihjaHVuay5kYXRhc2l6ZSkpIHtcbiAgICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLlRBRywgbmV3IEVycm9yKGBpbnZhbGlkIHZpZGVvIHRhZyBkYXRhc2l6ZTogJHtjaHVuay5kYXRhc2l6ZX1gKSwgZmFsc2UpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICd2aWRlbycpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNvZGVjSUQgPT09IDcpIHtcbiAgICAgIGxldCBkYXRhID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoY2h1bmsuZGF0YXNpemUgLSA1KVxuICAgICAgaWYgKGRhdGFbNF0gPT09IDAgJiYgZGF0YVs1XSA9PT0gMCAmJiBkYXRhWzZdID09PSAwICYmIGRhdGFbN10gPT09IDEpIHtcbiAgICAgICAgbGV0IGF2Y2NsZW5ndGggPSAwXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgYXZjY2xlbmd0aCA9IGF2Y2NsZW5ndGggKiAyNTYgKyBkYXRhW2ldXG4gICAgICAgIH1cbiAgICAgICAgYXZjY2xlbmd0aCAtPSA0XG4gICAgICAgIGRhdGEgPSBkYXRhLnNsaWNlKDQsIGRhdGEubGVuZ3RoKVxuICAgICAgICBkYXRhWzNdID0gYXZjY2xlbmd0aCAlIDI1NlxuICAgICAgICBhdmNjbGVuZ3RoID0gKGF2Y2NsZW5ndGggLSBkYXRhWzNdKSAvIDI1NlxuICAgICAgICBkYXRhWzJdID0gYXZjY2xlbmd0aCAlIDI1NlxuICAgICAgICBhdmNjbGVuZ3RoID0gKGF2Y2NsZW5ndGggLSBkYXRhWzJdKSAvIDI1NlxuICAgICAgICBkYXRhWzFdID0gYXZjY2xlbmd0aCAlIDI1NlxuICAgICAgICBkYXRhWzBdID0gKGF2Y2NsZW5ndGggLSBkYXRhWzFdKSAvIDI1NlxuICAgICAgfVxuXG4gICAgICBjaHVuay5kYXRhID0gZGF0YVxuICAgICAgLy8gSWYgaXQgaXMgQVZDIHNlcXVlY2UgSGVhZGVyLlxuICAgICAgaWYgKGNodW5rLmF2Y1BhY2tldFR5cGUgPT09IDApIHtcbiAgICAgICAgdGhpcy5fYXZjU2VxdWVuY2VIZWFkZXJQYXJzZXIoY2h1bmsuZGF0YSlcbiAgICAgICAgbGV0IHZhbGlkYXRlID0gdGhpcy5fZGF0YXNpemVWYWxpZGF0b3IoY2h1bmsuZGF0YXNpemUpXG4gICAgICAgIGlmICh2YWxpZGF0ZSkge1xuICAgICAgICAgIGlmICh0aGlzLl9oYXNTY3JpcHQgJiYgIXRoaXMuX2hhc1ZpZGVvU2VxdWVuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAndmlkZW8nKVxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5faGFzU2NyaXB0ICYmIHRoaXMuX2hhc1ZpZGVvU2VxdWVuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAnYXVkaW8nKVxuICAgICAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5WSURFT19NRVRBREFUQV9DSEFOR0UpXG4gICAgICAgICAgICAvLyB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgJ3ZpZGVvJylcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5faGFzVmlkZW9TZXF1ZW5jZSA9IHRydWVcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tZXRhQ2hhbmdlID0gdHJ1ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCF0aGlzLl9kYXRhc2l6ZVZhbGlkYXRvcihjaHVuay5kYXRhc2l6ZSkpIHtcbiAgICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLlRBRywgbmV3IEVycm9yKGBpbnZhbGlkIHZpZGVvIHRhZyBkYXRhc2l6ZTogJHtjaHVuay5kYXRhc2l6ZX1gKSwgZmFsc2UpXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9tZXRhQ2hhbmdlKSB7XG4gICAgICAgICAgY2h1bmsub3B0aW9ucyA9IHtcbiAgICAgICAgICAgIG1ldGE6IE9iamVjdC5hc3NpZ24oe30sIHRoaXMudHJhY2tzLnZpZGVvVHJhY2subWV0YSlcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fbWV0YUNoYW5nZSA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50cmFja3MudmlkZW9UcmFjay5zYW1wbGVzLnB1c2goY2h1bmspXG4gICAgICAgIC8vIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfQ09NUExFVEUpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIHRoaXMuVEFHLCBuZXcgRXJyb3IoYHZpZGVvIGNvZGVpZCBpcyAke2NvZGVjSUR9YCksIGZhbHNlKVxuICAgICAgY2h1bmsuZGF0YSA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KGNodW5rLmRhdGFzaXplIC0gMSlcbiAgICAgIGlmICghdGhpcy5fZGF0YXNpemVWYWxpZGF0b3IoY2h1bmsuZGF0YXNpemUpKSB7XG4gICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIHRoaXMuVEFHLCBuZXcgRXJyb3IoYGludmFsaWQgdmlkZW8gdGFnIGRhdGFzaXplOiAke2NodW5rLmRhdGFzaXplfWApLCBmYWxzZSlcbiAgICAgIH1cbiAgICAgIHRoaXMudHJhY2tzLnZpZGVvVHJhY2suc2FtcGxlcy5wdXNoKGNodW5rKVxuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9DT01QTEVURSlcbiAgICB9XG4gICAgZGVsZXRlIGNodW5rLnRhZ1R5cGVcbiAgfVxuXG4gIC8qKlxuICAgKiBwYXJzZSBhdmMgbWV0YWRhdGFcbiAgICogQHBhcmFtIGRhdGFcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9hdmNTZXF1ZW5jZUhlYWRlclBhcnNlciAoZGF0YSkge1xuICAgIGxldCB0cmFjayA9IHRoaXMudHJhY2tzLnZpZGVvVHJhY2tcblxuICAgIGlmICghdHJhY2spIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBvZmZzZXQgPSAwXG5cbiAgICBpZiAoIXRyYWNrLm1ldGEpIHtcbiAgICAgIHRyYWNrLm1ldGEgPSBuZXcgVmlkZW9UcmFja01ldGEoKVxuICAgIH1cbiAgICBsZXQgbWV0YSA9IHRyYWNrLm1ldGFcblxuICAgIG1ldGEuY29uZmlndXJhdGlvblZlcnNpb24gPSBkYXRhWzBdXG4gICAgbWV0YS5hdmNQcm9maWxlSW5kaWNhdGlvbiA9IGRhdGFbMV1cbiAgICBtZXRhLnByb2ZpbGVDb21wYXRpYmlsaXR5ID0gZGF0YVsyXVxuICAgIG1ldGEuYXZjTGV2ZWxJbmRpY2F0aW9uID0gZGF0YVszXSAvIDEwXG4gICAgbWV0YS5uYWxVbml0TGVuZ3RoID0gKGRhdGFbNF0gJiAweDAzKSArIDFcblxuICAgIGxldCBudW1PZlNwcyA9IGRhdGFbNV0gJiAweDFmXG4gICAgb2Zmc2V0ID0gNlxuICAgIGxldCBjb25maWcgPSB7fVxuXG4gICAgLy8gcGFyc2UgU1BTXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1PZlNwczsgaSsrKSB7XG4gICAgICBsZXQgc2l6ZSA9IGRhdGFbb2Zmc2V0XSAqIDI1NSArIGRhdGFbb2Zmc2V0ICsgMV1cbiAgICAgIG9mZnNldCArPSAyXG5cbiAgICAgIGxldCBzcHMgPSBuZXcgVWludDhBcnJheShzaXplKVxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaXplOyBqKyspIHtcbiAgICAgICAgc3BzW2pdID0gZGF0YVtvZmZzZXQgKyBqXVxuICAgICAgfVxuXG4gICAgICAvLyBjb2RlYyBzdHJpbmdcbiAgICAgIGxldCBjb2RlY1N0cmluZyA9ICdhdmMxLidcbiAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgNDsgaisrKSB7XG4gICAgICAgIGxldCBoID0gc3BzW2pdLnRvU3RyaW5nKDE2KVxuICAgICAgICBpZiAoaC5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgaCA9ICcwJyArIGhcbiAgICAgICAgfVxuICAgICAgICBjb2RlY1N0cmluZyArPSBoXG4gICAgICB9XG5cbiAgICAgIG1ldGEuY29kZWMgPSBjb2RlY1N0cmluZ1xuXG4gICAgICBvZmZzZXQgKz0gc2l6ZVxuICAgICAgdGhpcy50cmFja3MudmlkZW9UcmFjay5tZXRhLnNwcyA9IHNwc1xuICAgICAgY29uZmlnID0gU3BzUGFyc2VyLnBhcnNlU1BTKHNwcylcbiAgICB9XG5cbiAgICBsZXQgbnVtT2ZQcHMgPSBkYXRhW29mZnNldF1cblxuICAgIG9mZnNldCsrXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bU9mUHBzOyBpKyspIHtcbiAgICAgIGxldCBzaXplID0gZGF0YVtvZmZzZXRdICogMjU1ICsgZGF0YVtvZmZzZXQgKyAxXVxuICAgICAgb2Zmc2V0ICs9IDJcbiAgICAgIGxldCBwcHMgPSBuZXcgVWludDhBcnJheShzaXplKVxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaXplOyBqKyspIHtcbiAgICAgICAgcHBzW2pdID0gZGF0YVtvZmZzZXQgKyBqXVxuICAgICAgfVxuICAgICAgb2Zmc2V0ICs9IHNpemVcbiAgICAgIHRoaXMudHJhY2tzLnZpZGVvVHJhY2subWV0YS5wcHMgPSBwcHNcbiAgICB9XG5cbiAgICBPYmplY3QuYXNzaWduKG1ldGEsIFNwc1BhcnNlci50b1ZpZGVvTWV0YShjb25maWcpKVxuXG4gICAgLy8gZmlsbCB2aWRlbyBtZWRpYSBpbmZvXG4gICAgY29uc3QgdmlkZW9NZWRpYSA9IHRoaXMuX2NvbnRleHQubWVkaWFJbmZvLnZpZGVvXG5cbiAgICB2aWRlb01lZGlhLmNvZGVjID0gbWV0YS5jb2RlY1xuICAgIHZpZGVvTWVkaWEucHJvZmlsZSA9IG1ldGEucHJvZmlsZVxuICAgIHZpZGVvTWVkaWEubGV2ZWwgPSBtZXRhLmxldmVsXG4gICAgdmlkZW9NZWRpYS5jaHJvbWFGb3JtYXQgPSBtZXRhLmNocm9tYUZvcm1hdFxuICAgIHZpZGVvTWVkaWEuZnJhbWVSYXRlID0gbWV0YS5mcmFtZVJhdGVcbiAgICB2aWRlb01lZGlhLnBhclJhdGlvID0gbWV0YS5wYXJSYXRpb1xuICAgIHZpZGVvTWVkaWEud2lkdGggPSB2aWRlb01lZGlhLndpZHRoID09PSBtZXRhLnByZXNlbnRXaWR0aCA/IHZpZGVvTWVkaWEud2lkdGggOiBtZXRhLnByZXNlbnRXaWR0aFxuICAgIHZpZGVvTWVkaWEuaGVpZ2h0ID0gdmlkZW9NZWRpYS5oZWlnaHQgPT09IG1ldGEucHJlc2VudEhlaWdodCA/IHZpZGVvTWVkaWEud2lkdGggOiBtZXRhLnByZXNlbnRIZWlnaHRcblxuICAgIG1ldGEuZHVyYXRpb24gPSB0aGlzLl9jb250ZXh0Lm1lZGlhSW5mby5kdXJhdGlvbiAqIG1ldGEudGltZXNjYWxlXG4gICAgbWV0YS5hdmNjID0gbmV3IFVpbnQ4QXJyYXkoZGF0YS5sZW5ndGgpXG4gICAgbWV0YS5hdmNjLnNldChkYXRhKVxuICAgIHRyYWNrLm1ldGEgPSBtZXRhXG4gIH1cblxuICAvKipcbiAgICogY2hvb3NlIGF1ZGlvIHNhbXBsZSByYXRlXG4gICAqIEBwYXJhbSBzYW1wbGluZ0ZyZXF1ZW5jeUluZGV4XG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc3dpdGNoQXVkaW9TYW1wbGVSYXRlIChzYW1wbGluZ0ZyZXF1ZW5jeUluZGV4KSB7XG4gICAgbGV0IHNhbXBsaW5nRnJlcXVlbmN5TGlzdCA9IFs5NjAwMCwgODgyMDAsIDY0MDAwLCA0ODAwMCwgNDQxMDAsIDMyMDAwLCAyNDAwMCwgMjIwNTAsIDE2MDAwLCAxMjAwMCwgMTEwMjUsIDgwMDAsIDczNTBdXG4gICAgcmV0dXJuIHNhbXBsaW5nRnJlcXVlbmN5TGlzdFtzYW1wbGluZ0ZyZXF1ZW5jeUluZGV4XVxuICB9XG5cbiAgLyoqXG4gICAqIGNob29zZSBhdWRpbyBzYW1wbGluZyBmcmVxdWVuY2VcbiAgICogQHBhcmFtIGluZm9cbiAgICogQHJldHVybnMge251bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zd2l0Y2hBdWRpb1NhbXBsaW5nRnJlcXVlbmN5IChpbmZvKSB7XG4gICAgbGV0IHNhbXBsaW5nRnJlcXVlbmN5SW5kZXggPSAoaW5mbyAmIDEyKSA+Pj4gMlxuICAgIGxldCBzYW1wbGluZ0ZyZXF1ZW5jeUxpc3QgPSBbNTUwMCwgMTEwMjUsIDIyMDUwLCA0NDEwMCwgNDgwMDBdXG4gICAgcmV0dXJuIHNhbXBsaW5nRnJlcXVlbmN5TGlzdFtzYW1wbGluZ0ZyZXF1ZW5jeUluZGV4XVxuICB9XG5cbiAgLyoqXG4gICAqIGNob29zZSBhdWRpbyBjaGFubmVsIGNvdW50XG4gICAqIEBwYXJhbSBpbmZvXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc3dpdGNoQXVkaW9DaGFubmVsIChpbmZvKSB7XG4gICAgbGV0IHNhbXBsZVRyYWNrTnVtSW5kZXggPSBpbmZvICYgMVxuICAgIGxldCBzYW1wbGVUcmFja051bUxpc3QgPSBbMSwgMl1cbiAgICByZXR1cm4gc2FtcGxlVHJhY2tOdW1MaXN0W3NhbXBsZVRyYWNrTnVtSW5kZXhdXG4gIH1cblxuICAvKipcbiAgICogY2hlY2sgZGF0YXNpemUgaXMgdmFsaWQgdXNlIDQgQnl0ZSBhZnRlciBjdXJyZW50IHRhZ1xuICAgKiBAcGFyYW0gZGF0YXNpemVcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZGF0YXNpemVWYWxpZGF0b3IgKGRhdGFzaXplKSB7XG4gICAgbGV0IGRhdGFzaXplQ29uZmlybSA9IHRoaXMubG9hZGVyQnVmZmVyLnRvSW50KDAsIDQpXG4gICAgdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoNClcbiAgICByZXR1cm4gZGF0YXNpemVDb25maXJtID09PSBkYXRhc2l6ZSArIDExXG4gIH1cblxuICBnZXQgbG9hZGVyQnVmZmVyICgpIHtcbiAgICBjb25zdCBidWZmZXIgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdMT0FERVJfQlVGRkVSJylcbiAgICBpZiAoYnVmZmVyKSB7XG4gICAgICByZXR1cm4gYnVmZmVyXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIG5ldyBFcnJvcign5om+5LiN5YiwIGxvYWRlckJ1ZmZlciDlrp7kvosnKSlcbiAgICB9XG4gIH1cblxuICBnZXQgdHJhY2tzICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJylcbiAgfVxuXG4gIGdldCBsb2dnZXIgKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdMT0dHRVInKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZsdkRlbXV4ZXJcbiIsIi8qKlxuICogUmVmZXJlbmNlOiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjODIxNiNzZWN0aW9uLTQuM1xuICovXG5jbGFzcyBNM1U4UGFyc2VyIHtcbiAgc3RhdGljIHBhcnNlICh0ZXh0LCBiYXNldXJsID0gJycpIHtcbiAgICBsZXQgcmV0ID0ge1xuICAgICAgZHVyYXRpb246IDBcbiAgICB9O1xuICAgIGlmICghdGV4dCB8fCAhdGV4dC5zcGxpdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgcmVmcyA9IHRleHQuc3BsaXQoL1xccnxcXG4vKTtcbiAgICByZWZzID0gcmVmcy5maWx0ZXIoKHJlZikgPT4ge1xuICAgICAgcmV0dXJuIHJlZjtcbiAgICB9KVxuICAgIGxldCByZWYgPSByZWZzLnNoaWZ0KClcbiAgICBpZiAoIXJlZi5tYXRjaCgnI0VYVE0zVScpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgbTN1OCBmaWxlOiBub3QgXCIjRVhUTTNVXCJgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZWYgPSByZWZzLnNoaWZ0KClcbiAgICB3aGlsZSAocmVmKSB7XG4gICAgICBsZXQgcmVmbSA9IHJlZi5tYXRjaCgvIyguW0EtWnwtXSopOiguKikvKTtcbiAgICAgIGxldCByZWZkID0gcmVmLm1hdGNoKC8jKC5bQS1afC1dKikvKTtcbiAgICAgIGlmIChyZWZkICYmIHJlZm0gJiYgcmVmbS5sZW5ndGggPiAyKSB7XG4gICAgICAgIHN3aXRjaCAocmVmbVsxXSkge1xuICAgICAgICAgIGNhc2UgJ0VYVC1YLVZFUlNJT04nOlxuICAgICAgICAgICAgcmV0LnZlcnNpb24gPSBwYXJzZUludChyZWZtWzJdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ0VYVC1YLU1FRElBLVNFUVVFTkNFJzpcbiAgICAgICAgICAgIHJldC5zZXF1ZW5jZSA9IHBhcnNlSW50KHJlZm1bMl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnRVhULVgtVEFSR0VURFVSQVRJT04nOlxuICAgICAgICAgICAgcmV0LnRhcmdldGR1cmF0aW9uID0gcGFyc2VGbG9hdChyZWZtWzJdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ0VYVElORic6XG4gICAgICAgICAgICBNM1U4UGFyc2VyLnBhcnNlRnJhZyhyZWZtLCByZWZzLCByZXQsIGJhc2V1cmwpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnRVhULVgtS0VZJzpcbiAgICAgICAgICAgIE0zVThQYXJzZXIucGFyc2VEZWNyeXB0KHJlZm1bMl0scmV0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSBpZihyZWZkICYmIHJlZmQubGVuZ3RoID4gMSkge1xuICAgICAgICBzd2l0Y2gocmVmZFsxXSkge1xuICAgICAgICAgIGNhc2UgJ0VYVC1YLURJU0NPTlRJTlVJVFknOlxuICAgICAgICAgICAgcmVmID0gcmVmcy5zaGlmdCgpO1xuICAgICAgICAgICAgbGV0IHJlZm0gPSByZWYubWF0Y2goLyMoLltBLVp8LV0qKTooLiopLyk7XG4gICAgICAgICAgICBpZihyZWZtLmxlbmd0aCA+MiAmJiByZWZtWzFdID09PSAnRVhUSU5GJykge1xuICAgICAgICAgICAgICBNM1U4UGFyc2VyLnBhcnNlRnJhZyhyZWZtLCByZWZzLCByZXQsIGJhc2V1cmwsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZWYgPSByZWZzLnNoaWZ0KClcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZUZyYWcgKHJlZm0sIHJlZnMsIHJldCwgYmFzZXVybCwgZGlzY29udGludWUpIHtcbiAgICBpZiAoIXJldC5mcmFncykge1xuICAgICAgcmV0LmZyYWdzID0gW11cbiAgICB9XG5cbiAgICBsZXQgZnJlZyA9IHtcbiAgICAgIHN0YXJ0OiByZXQuZHVyYXRpb24sXG4gICAgICBkdXJhdGlvbjogcGFyc2VGbG9hdChyZWZtWzJdKSAqIDEwMDBcbiAgICB9XG5cbiAgICByZXQuZHVyYXRpb24gKz0gZnJlZy5kdXJhdGlvbjtcbiAgICBsZXQgbmV4dGxpbmUgPSByZWZzLnNoaWZ0KCk7XG4gICAgaWYgKG5leHRsaW5lLm1hdGNoKC8jKC4qKTooLiopLykpIHtcbiAgICAgIG5leHRsaW5lID0gcmVmcy5zaGlmdCgpO1xuICAgIH1cbiAgICBpZiAobmV4dGxpbmUubGVuZ3RoID4gMCAmJiBuZXh0bGluZS5jaGFyQXQoMCkgPT09ICcvJyAmJiBiYXNldXJsLm1hdGNoKC8uKlxcL1xcLy4qXFwuXFx3Ky9nKSkge1xuICAgICAgYmFzZXVybCA9IGJhc2V1cmwubWF0Y2goLy4qXFwvXFwvLipcXC5cXHcrL2cpWzBdO1xuICAgIH1cbiAgICBpZiAobmV4dGxpbmUubWF0Y2goLy4qOlxcL1xcLy4qLykpIHtcbiAgICAgIGZyZWcudXJsID0gbmV4dGxpbmU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZyZWcudXJsID0gYmFzZXVybCArIG5leHRsaW5lO1xuICAgIH1cbiAgICBmcmVnLmRpc2NvbnRpbnVlID0gZGlzY29udGludWU7XG4gICAgcmV0LmZyYWdzLnB1c2goZnJlZyk7XG4gIH1cblxuICBzdGF0aWMgcGFyc2VVUkwgKHVybCkge1xuICAgIGxldCBiYXNldXJsID0gJyc7XG4gICAgbGV0IHVybHMgPSB1cmwubWF0Y2goLyguKlxcLykuKlxcLm0zdTgvKTtcbiAgICBpZiAodXJscyAmJiB1cmxzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdXJscy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodXJsc1tpXS5tYXRjaCgvLipcXC8kL2cpICYmIHVybHNbaV0ubGVuZ3RoID4gYmFzZXVybC5sZW5ndGgpIHtcbiAgICAgICAgICBiYXNldXJsID0gdXJsc1tpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYmFzZXVybDtcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZURlY3J5cHQocmVmbSwgcmV0KSB7XG4gICAgcmV0LmVuY3J5cHQgPSB7fTtcbiAgICBsZXQgcmVmcyA9IHJlZm0uc3BsaXQoJywnKTtcbiAgICBmb3IgKGxldCBpIGluIHJlZnMpIHsgXG4gICAgICBsZXQgY21kID0gcmVmc1tpXTtcbiAgICAgIGlmKGNtZC5tYXRjaCgvTUVUSE9EPSguKikvKSkge1xuICAgICAgICByZXQuZW5jcnlwdC5tZXRob2QgPSBjbWQubWF0Y2goL01FVEhPRD0oLiopLylbMV07XG4gICAgICB9XG4gICAgICBpZihjbWQubWF0Y2goL1VSST1cIiguKilcIi8pKSB7XG4gICAgICAgIHJldC5lbmNyeXB0LnVyaSA9IGNtZC5tYXRjaCgvVVJJPVwiKC4qKVwiLylbMV07XG4gICAgICB9XG5cbiAgICAgIGlmKGNtZC5tYXRjaCgvSVY9MHgoLiopLykpIHtcbiAgICAgICAgbGV0IGl2ID0gY21kLm1hdGNoKC9JVj0weCguKikvKVsxXTtcbiAgICAgICAgbGV0IGxlbmd0aCA9IE1hdGguY2VpbChpdi5sZW5ndGggLyAyKTtcbiAgICAgICAgcmV0LmVuY3J5cHQuaXZiID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKTtcbiAgICAgICAgZm9yKGxldCBpID0gbGVuZ3RoIC0gMTsgaSA+PTA7IGktLSkge1xuICAgICAgICAgIGxldCBpbSA9IHBhcnNlSW50KGl2LnN1YnN0cihpICogMiwgMiksIDE2KTtcbiAgICAgICAgICByZXQuZW5jcnlwdC5pdmJbaV0gPSBpbTtcbiAgICAgICAgfSBcbiAgICAgICAgcmV0LmVuY3J5cHQuaXYgPSBpdjtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE0zVThQYXJzZXI7XG4iLCJpbXBvcnQgeyBOYWx1bml0IH0gZnJvbSAneGdwbGF5ZXItY29kZWMnO1xuaW1wb3J0IHsgQXVkaW9UcmFjaywgVmlkZW9UcmFjayB9IGZyb20gJ3hncGxheWVyLWJ1ZmZlcic7XG5pbXBvcnQge1xuICBBdWRpb1RyYWNrTWV0YSxcbiAgVmlkZW9UcmFja01ldGEsXG4gIEF1ZGlvVHJhY2tTYW1wbGUsXG4gIFZpZGVvVHJhY2tTYW1wbGUsXG4gIEVWRU5UUyxcbiAgU3RyZWFtXG59IGZyb20gJ3hncGxheWVyLXV0aWxzJztcblxuY29uc3QgREVNVVhfRVZFTlRTID0gRVZFTlRTLkRFTVVYX0VWRU5UUztcbmNvbnN0IFN0cmVhbVR5cGUgPSB7XG4gIDB4MDE6IFsndmlkZW8nLCAnTVBFRy0xJ10sXG4gIDB4MDI6IFsndmlkZW8nLCAnTVBFRy0yJ10sXG4gIDB4MWI6IFsndmlkZW8nLCAnQVZDLkgyNjQnXSxcbiAgMHhlYTogWyd2aWRlbycsICdWQy0xJ10sXG4gIDB4MDM6IFsnYXVkaW8nLCAnTVBFRy0xJ10sXG4gIDB4MDQ6IFsnYXVkaW8nLCAnTVBFRy0yJ10sXG4gIDB4MGY6IFsnYXVkaW8nLCAnTVBFRy0yLkFBQyddLFxuICAweDExOiBbJ2F1ZGlvJywgJ01QRUctNC5BQUMnXSxcbiAgMHg4MDogWydhdWRpbycsICdMUENNJ10sXG4gIDB4ODE6IFsnYXVkaW8nLCAnQUMzJ10sXG4gIDB4MDY6IFsnYXVkaW8nLCAnQUMzJ10sXG4gIDB4ODI6IFsnYXVkaW8nLCAnRFRTJ10sXG4gIDB4ODM6IFsnYXVkaW8nLCAnRG9sYnkgVHJ1ZUhEJ10sXG4gIDB4ODQ6IFsnYXVkaW8nLCAnQUMzLVBsdXMnXSxcbiAgMHg4NTogWydhdWRpbycsICdEVFMtSEQnXSxcbiAgMHg4NjogWydhdWRpbycsICdEVFMtTUEnXSxcbiAgMHhhMTogWydhdWRpbycsICdBQzMtUGx1cy1TRUMnXSxcbiAgMHhhMjogWydhdWRpbycsICdEVFMtSEQtU0VDJ11cbn07XG5cbmNsYXNzIFRzRGVtdXhlciB7XG4gIGNvbnN0cnVjdG9yIChjb25maWdzKSB7XG4gICAgdGhpcy5jb25maWdzID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlncyk7XG4gICAgdGhpcy5kZW11eGluZyA9IGZhbHNlO1xuICAgIHRoaXMucGF0ID0gW107XG4gICAgdGhpcy5wbXQgPSBbXTtcbiAgICB0aGlzLl9oYXNWaWRlb01ldGEgPSBmYWxzZTtcbiAgICB0aGlzLl9oYXNBdWRpb01ldGEgPSBmYWxzZTtcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIHRoaXMub24oREVNVVhfRVZFTlRTLkRFTVVYX1NUQVJULCB0aGlzLmRlbXV4LmJpbmQodGhpcykpXG4gIH1cblxuICBkZW11eCAoZnJhZykge1xuICAgIGlmICh0aGlzLmRlbXV4aW5nKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgYnVmZmVyID0gdGhpcy5pbnB1dEJ1ZmZlcjtcbiAgICBsZXQgZnJhZ3MgPSB7IHBhdDogW10sIHBtdDogW10gfTtcbiAgICBsZXQgcGVzZXMgPSB7fTtcblxuICAgIC8vIFJlYWQgVFMgc2VnbWVudFxuICAgIHdoaWxlIChidWZmZXIubGVuZ3RoID49IDE4OCkge1xuICAgICAgaWYgKGJ1ZmZlci5sZW5ndGggPj0gMSAmJiBidWZmZXIuYXJyYXlbMF1bYnVmZmVyLm9mZnNldF0gIT09IDcxKSB7XG4gICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIHRoaXMuVEFHLCBuZXcgRXJyb3IoYFVudHJ1c3Qgc3luYyBjb2RlOiAke2J1ZmZlci5hcnJheVswXVtidWZmZXIub2Zmc2V0XX0sIHRyeSB0byByZWNvdmVyO2ApLCBmYWxzZSk7XG4gICAgICB9XG4gICAgICB3aGlsZSAoYnVmZmVyLmxlbmd0aCA+PSAxICYmIGJ1ZmZlci5hcnJheVswXVtidWZmZXIub2Zmc2V0XSAhPT0gNzEpIHtcbiAgICAgICAgYnVmZmVyLnNoaWZ0KDEpO1xuICAgICAgfVxuICAgICAgbGV0IGJ1ZiA9IGJ1ZmZlci5zaGlmdCgxODgpO1xuICAgICAgLy8gY29uc29sZS5sb2coYnVmKTtcbiAgICAgIGxldCB0c1N0cmVhbSA9IG5ldyBTdHJlYW0oYnVmLmJ1ZmZlcik7XG4gICAgICBsZXQgdHMgPSB7fTtcbiAgICAgIFRzRGVtdXhlci5yZWFkKHRzU3RyZWFtLCB0cywgZnJhZ3MpO1xuICAgICAgaWYgKHRzLnBlcykge1xuICAgICAgICBpZiAoIXBlc2VzW3RzLmhlYWRlci5waWRdKSB7XG4gICAgICAgICAgcGVzZXNbdHMuaGVhZGVyLnBpZF0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBwZXNlc1t0cy5oZWFkZXIucGlkXS5wdXNoKHRzLnBlcyk7XG4gICAgICAgIHRzLnBlcy5FUy5idWZmZXIgPSBbdHMucGVzLkVTLmJ1ZmZlcl07XG4gICAgICB9IGVsc2UgaWYgKHBlc2VzW3RzLmhlYWRlci5waWRdKSB7XG4gICAgICAgIHBlc2VzW3RzLmhlYWRlci5waWRdW3Blc2VzW3RzLmhlYWRlci5waWRdLmxlbmd0aCAtIDFdLkVTLmJ1ZmZlci5wdXNoKHRzLnBheWxvYWQuc3RyZWFtKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgQXVkaW9PcHRpb25zID0gZnJhZztcbiAgICBsZXQgVmlkZW9PcHRpb25zID0gZnJhZztcblxuICAgIC8vIEdldCBGcmFtZXMgZGF0YVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgT2JqZWN0LmtleXMocGVzZXMpLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgZXBlc2VzID0gcGVzZXNbT2JqZWN0LmtleXMocGVzZXMpW2ldXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZXBlc2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGVwZXNlc1tqXS5pZCA9IE9iamVjdC5rZXlzKHBlc2VzKVtpXTtcbiAgICAgICAgZXBlc2VzW2pdLkVTLmJ1ZmZlciA9IFRzRGVtdXhlci5NZXJnZShlcGVzZXNbal0uRVMuYnVmZmVyKTtcbiAgICAgICAgaWYgKGVwZXNlc1tqXS50eXBlID09PSAnYXVkaW8nKSB7XG4gICAgICAgICAgdGhpcy5wdXNoQXVkaW9TYW1wbGUoZXBlc2VzW2pdLCBBdWRpb09wdGlvbnMpO1xuICAgICAgICAgIEF1ZGlvT3B0aW9ucyA9IHt9O1xuICAgICAgICB9IGVsc2UgaWYgKGVwZXNlc1tqXS50eXBlID09PSAndmlkZW8nKSB7XG4gICAgICAgICAgdGhpcy5wdXNoVmlkZW9TYW1wbGUoZXBlc2VzW2pdLCBWaWRlb09wdGlvbnMpO1xuICAgICAgICAgIFZpZGVvT3B0aW9ucyA9IHt9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2hhc0F1ZGlvTWV0YSkge1xuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9DT01QTEVURSwgJ2F1ZGlvJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9oYXNWaWRlb01ldGEpIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfQ09NUExFVEUsICd2aWRlbycpO1xuICAgIH1cbiAgfVxuXG4gIHB1c2hBdWRpb1NhbXBsZSAocGVzLCBvcHRpb25zKSB7XG4gICAgbGV0IHRyYWNrO1xuICAgIGlmICghdGhpcy5fdHJhY2tzLmF1ZGlvVHJhY2spIHtcbiAgICAgIHRoaXMuX3RyYWNrcy5hdWRpb1RyYWNrID0gbmV3IEF1ZGlvVHJhY2soKTtcbiAgICAgIHRyYWNrID0gdGhpcy5fdHJhY2tzLmF1ZGlvVHJhY2s7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYWNrID0gdGhpcy5fdHJhY2tzLmF1ZGlvVHJhY2s7XG4gICAgfVxuICAgIGxldCBtZXRhID0gbmV3IEF1ZGlvVHJhY2tNZXRhKHtcbiAgICAgIGF1ZGlvU2FtcGxlUmF0ZTogcGVzLkVTLmZyZXF1ZW5jZSxcbiAgICAgIHNhbXBsZVJhdGU6IHBlcy5FUy5mcmVxdWVuY2UsXG4gICAgICBjaGFubmVsQ291bnQ6IHBlcy5FUy5jaGFubmVsLFxuICAgICAgY29kZWM6ICdtcDRhLjQwLicgKyBwZXMuRVMuYXVkaW9PYmplY3RUeXBlLFxuICAgICAgY29uZmlnOiBwZXMuRVMuYXVkaW9Db25maWcsXG4gICAgICBpZDogMixcbiAgICAgIHNhbXBsZVJhdGVJbmRleDogcGVzLkVTLmZyZXF1ZW5jeUluZGV4XG4gICAgfSk7XG4gICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA9IE1hdGguZmxvb3IoMTAyNCAvIG1ldGEuYXVkaW9TYW1wbGVSYXRlICogbWV0YS50aW1lc2NhbGUpO1xuXG4gICAgbGV0IG1ldGFFcXVhbCA9IFRzRGVtdXhlci5jb21wYWlyZU1ldGEodHJhY2subWV0YSwgbWV0YSwgdHJ1ZSk7XG5cbiAgICBpZiAoIXRoaXMuX2hhc0F1ZGlvTWV0YSB8fCAhbWV0YUVxdWFsKSB7XG4gICAgICB0cmFjay5tZXRhID0gbWV0YTtcbiAgICAgIHRoaXMuX2hhc0F1ZGlvTWV0YSA9IHRydWVcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAnYXVkaW8nKTtcbiAgICB9XG5cbiAgICBsZXQgZGF0YSA9IG5ldyBVaW50OEFycmF5KHBlcy5FUy5idWZmZXIuYnVmZmVyLnNsaWNlKHBlcy5FUy5idWZmZXIucG9zaXRpb24sIHBlcy5FUy5idWZmZXIubGVuZ3RoKSk7XG4gICAgbGV0IGR0cyA9IHBhcnNlSW50KHBlcy5wdHMgLyA5MCk7XG4gICAgbGV0IHB0cyA9IHBhcnNlSW50KHBlcy5wdHMgLyA5MCk7XG4gICAgbGV0IHNhbXBsZSA9IG5ldyBBdWRpb1RyYWNrU2FtcGxlKHtkdHMsIHB0cywgZGF0YSwgb3B0aW9uc30pO1xuICAgIHRyYWNrLnNhbXBsZXMucHVzaChzYW1wbGUpO1xuICB9XG5cbiAgcHVzaFZpZGVvU2FtcGxlIChwZXMsIG9wdGlvbnMpIHtcbiAgICBsZXQgbmFscyA9IE5hbHVuaXQuZ2V0TmFsdW5pdHMocGVzLkVTLmJ1ZmZlcik7XG4gICAgbGV0IHRyYWNrO1xuICAgIGxldCBtZXRhID0gbmV3IFZpZGVvVHJhY2tNZXRhKCk7XG4gICAgaWYgKCF0aGlzLl90cmFja3MudmlkZW9UcmFjaykge1xuICAgICAgdGhpcy5fdHJhY2tzLnZpZGVvVHJhY2sgPSBuZXcgVmlkZW9UcmFjaygpO1xuICAgICAgdHJhY2sgPSB0aGlzLl90cmFja3MudmlkZW9UcmFjaztcbiAgICB9IGVsc2Uge1xuICAgICAgdHJhY2sgPSB0aGlzLl90cmFja3MudmlkZW9UcmFjaztcbiAgICB9XG4gICAgbGV0IHNhbXBsZUxlbmd0aCA9IDA7XG4gICAgbGV0IHNwcyA9IGZhbHNlO1xuICAgIGxldCBwcHMgPSBmYWxzZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBuYWwgPSBuYWxzW2ldO1xuICAgICAgaWYgKG5hbC5zcHMpIHtcbiAgICAgICAgc3BzID0gbmFsO1xuICAgICAgICB0cmFjay5zcHMgPSBuYWwuYm9keTtcbiAgICAgICAgbWV0YS5jaHJvbWFGb3JtYXQgPSBzcHMuc3BzLmNocm9tYV9mb3JtYXRcbiAgICAgICAgbWV0YS5jb2RlYyA9ICdhdmMxLic7XG4gICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgNDsgaisrKSB7XG4gICAgICAgICAgdmFyIGggPSBzcHMuYm9keVtqXS50b1N0cmluZygxNik7XG4gICAgICAgICAgaWYgKGgubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgaCA9ICcwJyArIGg7XG4gICAgICAgICAgfVxuICAgICAgICAgIG1ldGEuY29kZWMgKz0gaDtcbiAgICAgICAgfVxuICAgICAgICBtZXRhLmNvZGVjSGVpZ2h0ID0gc3BzLnNwcy5jb2RlY19zaXplLmhlaWdodDtcbiAgICAgICAgbWV0YS5jb2RlY1dpZHRoID0gc3BzLnNwcy5jb2RlY19zaXplLndpZHRoO1xuICAgICAgICBtZXRhLmZyYW1lUmF0ZSA9IHNwcy5zcHMuZnJhbWVfcmF0ZTtcbiAgICAgICAgbWV0YS5pZCA9IDE7XG4gICAgICAgIG1ldGEubGV2ZWwgPSBzcHMuc3BzLmxldmVsX3N0cmluZztcbiAgICAgICAgbWV0YS5wcmVzZW50SGVpZ2h0ID0gc3BzLnNwcy5wcmVzZW50X3NpemUuaGVpZ2h0O1xuICAgICAgICBtZXRhLnByZXNlbnRXaWR0aCA9IHNwcy5zcHMucHJlc2VudF9zaXplLndpZHRoO1xuICAgICAgICBtZXRhLnByb2ZpbGUgPSBzcHMuc3BzLnByb2ZpbGVfc3RyaW5nO1xuICAgICAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uID0gTWF0aC5mbG9vcihtZXRhLnRpbWVzY2FsZSAqIChzcHMuc3BzLmZyYW1lX3JhdGUuZnBzX2RlbiAvIHNwcy5zcHMuZnJhbWVfcmF0ZS5mcHNfbnVtKSk7XG4gICAgICAgIG1ldGEuc2FyUmF0aW8gPSBzcHMuc3BzLnNhcl9yYXRpbyA/IHNwcy5zcHMuc2FyX3JhdGlvIDogc3BzLnNwcy5wYXJfcmF0aW87XG4gICAgICB9IGVsc2UgaWYgKG5hbC5wcHMpIHtcbiAgICAgICAgdHJhY2sucHBzID0gbmFsLmJvZHk7XG4gICAgICAgIHBwcyA9IG5hbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNhbXBsZUxlbmd0aCArPSAoNCArIG5hbC5ib2R5LmJ5dGVMZW5ndGgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzcHMgJiYgcHBzKSB7XG4gICAgICBtZXRhLmF2Y2MgPSBOYWx1bml0LmdldEF2Y2Moc3BzLmJvZHksIHBwcy5ib2R5KTtcbiAgICAgIGxldCBtZXRhRXF1YWwgPSBUc0RlbXV4ZXIuY29tcGFpcmVNZXRhKHRyYWNrLm1ldGEsIG1ldGEsIHRydWUpO1xuICAgICAgaWYgKCF0aGlzLl9oYXNWaWRlb01ldGEgfHwgIW1ldGFFcXVhbCkge1xuICAgICAgICBpZiAob3B0aW9ucykge1xuICAgICAgICAgIG9wdGlvbnMubWV0YSA9IE9iamVjdC5hc3NpZ24oe30sIG1ldGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBtZXRhOiBPYmplY3QuYXNzaWduKHt9LCBtZXRhKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0cmFjay5tZXRhID0gbWV0YTtcbiAgICAgICAgdGhpcy5faGFzVmlkZW9NZXRhID0gdHJ1ZVxuICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgJ3ZpZGVvJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGRhdGEgPSBuZXcgVWludDhBcnJheShzYW1wbGVMZW5ndGgpO1xuICAgIGxldCBvZmZzZXQgPSAwO1xuICAgIGxldCBpc0tleWZyYW1lID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgbmFsID0gbmFsc1tpXTtcbiAgICAgIGxldCBsZW5ndGggPSBuYWwuYm9keS5ieXRlTGVuZ3RoO1xuICAgICAgaWYgKG5hbC5pZHIpIHtcbiAgICAgICAgaXNLZXlmcmFtZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoIW5hbC5wcHMgJiYgIW5hbC5zcHMpIHtcbiAgICAgICAgZGF0YS5zZXQobmV3IFVpbnQ4QXJyYXkoW2xlbmd0aCA+Pj4gMjQgJiAweGZmLFxuICAgICAgICAgIGxlbmd0aCA+Pj4gMTYgJiAweGZmLFxuICAgICAgICAgIGxlbmd0aCA+Pj4gOCAmIDB4ZmYsXG4gICAgICAgICAgbGVuZ3RoICYgMHhmZlxuICAgICAgICBdKSwgb2Zmc2V0KTtcbiAgICAgICAgb2Zmc2V0ICs9IDQ7XG4gICAgICAgIGRhdGEuc2V0KG5hbC5ib2R5LCBvZmZzZXQpO1xuICAgICAgICBvZmZzZXQgKz0gbGVuZ3RoO1xuICAgICAgfVxuICAgIH1cbiAgICBsZXQgc2FtcGxlID0gbmV3IFZpZGVvVHJhY2tTYW1wbGUoe1xuICAgICAgZHRzOiBwYXJzZUludChwZXMuZHRzIC8gOTApLFxuICAgICAgcHRzOiBwYXJzZUludChwZXMucHRzIC8gOTApLFxuICAgICAgY3RzOiAocGVzLnB0cyAtIHBlcy5kdHMpIC8gOTAsXG4gICAgICBvcmlnaW5EdHM6IHBlcy5kdHMsXG4gICAgICBpc0tleWZyYW1lLFxuICAgICAgZGF0YSxcbiAgICAgIG9wdGlvbnNcbiAgICB9KVxuICAgIHRyYWNrLnNhbXBsZXMucHVzaChzYW1wbGUpO1xuICB9XG5cbiAgZGVzdG9yeSAoKSB7XG4gICAgdGhpcy5vZmYoREVNVVhfRVZFTlRTLkRFTVVYX1NUQVJULCB0aGlzLmRlbXV4KTtcbiAgICB0aGlzLmNvbmZpZ3MgPSB7fTtcbiAgICB0aGlzLmRlbXV4aW5nID0gZmFsc2U7XG4gICAgdGhpcy5wYXQgPSBbXTtcbiAgICB0aGlzLnBtdCA9IFtdO1xuICAgIHRoaXMuX2hhc1ZpZGVvTWV0YSA9IGZhbHNlO1xuICAgIHRoaXMuX2hhc0F1ZGlvTWV0YSA9IGZhbHNlO1xuICB9XG5cbiAgc3RhdGljIGNvbXBhaXJlQXJyYXkgKGEsIGIsIHR5cGUpIHtcbiAgICBsZXQgYWwgPSAwO1xuICAgIGxldCBibCA9IDA7XG4gICAgaWYgKHR5cGUgPT09ICdVaW50OEFycmF5Jykge1xuICAgICAgYWwgPSBhLmJ5dGVMZW5ndGg7XG4gICAgICBibCA9IGIuYnl0ZUxlbmd0aDtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdBcnJheScpIHtcbiAgICAgIGFsID0gYS5sZW5ndGg7XG4gICAgICBibCA9IGIubGVuZ3RoO1xuICAgIH1cbiAgICBpZiAoYWwgIT09IGJsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbDsgaSsrKSB7XG4gICAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3RhdGljIGNvbXBhaXJlTWV0YSAoYSwgYiwgaWdub3JlRHVyYXRpb24pIHtcbiAgICBpZiAoIWEgfHwgIWIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMCwgayA9IE9iamVjdC5rZXlzKGEpLmxlbmd0aDsgaSA8IGs7IGkrKykge1xuICAgICAgbGV0IGl0ZW1hID0gYVtPYmplY3Qua2V5cyhhKVtpXV07XG4gICAgICBsZXQgaXRlbWIgPSBiW09iamVjdC5rZXlzKGEpW2ldXTtcbiAgICAgIGlmICh0eXBlb2YgaXRlbWEgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmICgoaWdub3JlRHVyYXRpb24gJiYgT2JqZWN0LmtleXMoYSlbaV0gIT09ICdkdXJhdGlvbicgJiYgT2JqZWN0LmtleXMoYSlbaV0gIT09ICdyZWZTYW1wbGVEdXJhdGlvbicgJiYgT2JqZWN0LmtleXMoYSlbaV0gIT09ICdyZWZTYW1wbGVEdXJhdGlvbkZpeGVkJykgJiYgaXRlbWEgIT09IGl0ZW1iKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGl0ZW1hLmJ5dGVMZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoaXRlbWIuYnl0ZUxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghVHNEZW11eGVyLmNvbXBhaXJlQXJyYXkoaXRlbWEsIGl0ZW1iLCAnVWludDhBcnJheScpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGl0ZW1hLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChpdGVtYi5sZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIVRzRGVtdXhlci5jb21wYWlyZUFycmF5KGl0ZW1hLCBpdGVtYiwgJ0FycmF5JykpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghVHNEZW11eGVyLmNvbXBhaXJlTWV0YShpdGVtYSwgaXRlbWIpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3RhdGljIE1lcmdlIChidWZmZXJzKSB7XG4gICAgbGV0IGRhdGE7XG4gICAgbGV0IGxlbmd0aCA9IDA7XG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBidWZmZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZW5ndGggKz0gKGJ1ZmZlcnNbaV0ubGVuZ3RoIC0gYnVmZmVyc1tpXS5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgZGF0YSA9IG5ldyBVaW50OEFycmF5KGxlbmd0aCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBidWZmZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYnVmZmVyID0gYnVmZmVyc1tpXTtcbiAgICAgIGRhdGEuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZmZlci5idWZmZXIsIGJ1ZmZlci5wb3NpdGlvbiksIG9mZnNldCk7XG4gICAgICBvZmZzZXQgKz0gYnVmZmVyLmxlbmd0aCAtIGJ1ZmZlci5wb3NpdGlvbjtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBTdHJlYW0oZGF0YS5idWZmZXIpO1xuICB9XG5cbiAgc3RhdGljIHJlYWQgKHN0cmVhbSwgdHMsIGZyYWdzKSB7XG4gICAgVHNEZW11eGVyLnJlYWRIZWFkZXIoc3RyZWFtLCB0cyk7XG4gICAgVHNEZW11eGVyLnJlYWRQYXlsb2FkKHN0cmVhbSwgdHMsIGZyYWdzKTtcbiAgICBpZiAodHMuaGVhZGVyLnBhY2tldCA9PT0gJ01FRElBJyAmJiB0cy5oZWFkZXIucGF5bG9hZCA9PT0gMSAmJiAhdHMudW5rbm93blBJRHMpIHtcbiAgICAgIHRzLnBlcyA9IFRzRGVtdXhlci5QRVModHMpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyByZWFkUGF5bG9hZCAoc3RyZWFtLCB0cywgZnJhZ3MpIHtcbiAgICBsZXQgaGVhZGVyID0gdHMuaGVhZGVyXG4gICAgbGV0IHBpZCA9IGhlYWRlci5waWQ7XG4gICAgc3dpdGNoIChwaWQpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgVHNEZW11eGVyLlBBVChzdHJlYW0sIHRzLCBmcmFncyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxOlxuICAgICAgICBUc0RlbXV4ZXIuQ0FUKHN0cmVhbSwgdHMsIGZyYWdzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIFRzRGVtdXhlci5UU0RUKHN0cmVhbSwgdHMsIGZyYWdzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDB4MWZmZjpcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBUT0RPOiBzb21l55qE5YaZ5rOV5LiN5aSq5aW977yM5b6X5pS5XG4gICAgICAgIGlmIChmcmFncy5wYXQuc29tZSgoaXRlbSkgPT4geyByZXR1cm4gaXRlbS5waWQgPT09IHBpZDsgfSkpIHtcbiAgICAgICAgICBUc0RlbXV4ZXIuUE1UKHN0cmVhbSwgdHMsIGZyYWdzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgc3RzID0gZnJhZ3MucG10ID8gZnJhZ3MucG10LmZpbHRlcigoaXRlbSkgPT4gaXRlbS5waWQgPT09IHBpZCkgOiBbXTtcbiAgICAgICAgICBpZiAoc3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIFRzRGVtdXhlci5NZWRpYShzdHJlYW0sIHRzLCBTdHJlYW1UeXBlW3N0c1swXS5zdHJlYW1UeXBlXVswXSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHMudW5rbm93blBJRHMgPSB0cnVlO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgcmVhZEhlYWRlciAoc3RyZWFtLCB0cykge1xuICAgIGxldCBoZWFkZXIgPSB7fTtcbiAgICBoZWFkZXIuc3luYyA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICBsZXQgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgaGVhZGVyLmVycm9yID0gbmV4dCA+Pj4gMTU7XG4gICAgaGVhZGVyLnBheWxvYWQgPSBuZXh0ID4+PiAxNCAmIDE7XG4gICAgaGVhZGVyLnByaW9yaXR5ID0gbmV4dCA+Pj4gMTMgJiAxO1xuICAgIGhlYWRlci5waWQgPSBuZXh0ICYgMHgxZmZmO1xuXG4gICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDgoKTtcblxuICAgIGhlYWRlci5zY3JhbWJsaW5nID0gbmV4dCA+PiA2ICYgMHgzOyAvLyDmmK/lkKbliqDlr4bvvIwwMOihqOekuuS4jeWKoOWvhlxuXG4gICAgLyoqXG4gICAgICogMDAgSVNPL0lFQ+acquadpeS9v+eUqOS/neeVmVxuICAgICAqIDAxIOayoeacieiwg+aVtOWtl+aute+8jOS7heWQq+aciTE4NELmnInmlYjlh4DojbdcbiAgICAgKiAwMiDmsqHmnInmnInmlYjlh4DojbfvvIzku4XlkKvmnIkxODNC6LCD5pW05a2X5q61XG4gICAgICogMDMgMH4xODJC6LCD5pW05a2X5q615ZCO5Li65pyJ5pWI5YeA6I23XG4gICAgICovXG4gICAgaGVhZGVyLmFkYXB0YXRpb24gPSBuZXh0ID4+IDQgJiAweDM7XG4gICAgaGVhZGVyLmNvbnRpbnVpdHkgPSBuZXh0ICYgMTU7XG4gICAgaGVhZGVyLnBhY2tldCA9IGhlYWRlci5waWQgPT09IDAgPyAnUEFUJyA6ICdNRURJQSc7XG4gICAgdHMuaGVhZGVyID0gaGVhZGVyO1xuICB9XG5cbiAgc3RhdGljIFBBVCAoc3RyZWFtLCB0cywgZnJhZ3MpIHtcbiAgICBsZXQgcmV0ID0ge307XG4gICAgbGV0IG5leHQgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgc3RyZWFtLnNraXAobmV4dCk7XG4gICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICByZXQudGFiZWxJRCA9IG5leHQ7XG4gICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgcmV0LmVycm9yID0gbmV4dCA+Pj4gNztcbiAgICByZXQuemVybyA9IG5leHQgPj4+IDYgJiAxO1xuICAgIHJldC5zZWN0aW9uTGVuZ3RoID0gbmV4dCAmIDB4ZmZmO1xuICAgIHJldC5zdHJlYW1JRCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgcmV0LmN1cnJlbnQgPSBzdHJlYW0ucmVhZFVpbnQ4KCkgJiAxO1xuICAgIHJldC5zZWN0aW9uTnVtYmVyID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHJldC5sYXN0U2VjdGlvbk51bWJlciA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICBsZXQgTiA9IChyZXQuc2VjdGlvbkxlbmd0aCAtIDkpIC8gNDtcbiAgICBsZXQgbGlzdCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTjsgaSsrKSB7XG4gICAgICBsZXQgcHJvZ3JhbU51bWJlciA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgICBsZXQgcGlkID0gc3RyZWFtLnJlYWRVaW50MTYoKSAmIDB4MWZmZjtcbiAgICAgIGxpc3QucHVzaCh7XG4gICAgICAgIHByb2dyYW06IHByb2dyYW1OdW1iZXIsXG4gICAgICAgIHBpZCxcbiAgICAgICAgdHlwZTogcHJvZ3JhbU51bWJlciA9PT0gMCA/ICduZXR3b3JrJyA6ICdtYXBQSUQnXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgZnJhZ3MucGF0ID0gZnJhZ3MucGF0LmNvbmNhdChsaXN0KTtcbiAgICB9XG4gICAgcmV0Lmxpc3QgPSBsaXN0O1xuICAgIHJldC5wcm9ncmFtID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICByZXQucGlkID0gc3RyZWFtLnJlYWRVaW50MTYoKSAmIDB4MWZmZjtcbiAgICB0cy5wYXlsb2FkID0gcmV0O1xuICAgIC8vIFRPRE8gQ1JDXG4gIH1cblxuICBzdGF0aWMgUE1UIChzdHJlYW0sIHRzLCBmcmFncykge1xuICAgIGxldCByZXQgPSB7fTtcbiAgICBsZXQgaGVhZGVyID0gdHMuaGVhZGVyO1xuICAgIGhlYWRlci5wYWNrZXQgPSAnUE1UJztcbiAgICBsZXQgbmV4dCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICBzdHJlYW0uc2tpcChuZXh0KTtcbiAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHJldC50YWJsZUlEID0gbmV4dDtcbiAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICByZXQuc2VjdGlvbkxlbmd0aCA9IG5leHQgJiAweGZmZjtcbiAgICByZXQucHJvZ3JhbSA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgcmV0LmN1cnJlbnQgPSBzdHJlYW0ucmVhZFVpbnQ4KCkgJiAxO1xuICAgIHJldC5vcmRlciA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICByZXQubGFzdE9yZGVyID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHJldC5QQ1JfUElEID0gc3RyZWFtLnJlYWRVaW50MTYoKSAmIDB4MWZmZjtcbiAgICByZXQucHJvZ3JhbUxlbmd0aCA9IHN0cmVhbS5yZWFkVWludDE2KCkgJiAweGZmZjtcbiAgICBsZXQgTiA9IChyZXQuc2VjdGlvbkxlbmd0aCAtIDEzKSAvIDU7XG4gICAgbGV0IGxpc3QgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE47IGkrKykge1xuICAgICAgbGlzdC5wdXNoKHtcbiAgICAgICAgc3RyZWFtVHlwZTogc3RyZWFtLnJlYWRVaW50OCgpLFxuICAgICAgICBwaWQ6IHN0cmVhbS5yZWFkVWludDE2KCkgJiAweDFmZmYsIC8vIDB4MDdlNSDop4bpopHvvIwweDA3ZTZcbiAgICAgICAgZXM6IHN0cmVhbS5yZWFkVWludDE2KCkgJiAweGZmZlxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldC5saXN0ID0gbGlzdDtcbiAgICBpZiAoIXRoaXMucG10KSB7XG4gICAgICB0aGlzLnBtdCA9IFtdO1xuICAgIH1cbiAgICBmcmFncy5wbXQgPSB0aGlzLnBtdC5jb25jYXQobGlzdC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBpZDogaXRlbS5waWQsXG4gICAgICAgIGVzOiBpdGVtLmVzLFxuICAgICAgICBzdHJlYW1UeXBlOiBpdGVtLnN0cmVhbVR5cGUsXG4gICAgICAgIHByb2dyYW06IHJldC5wcm9ncmFtXG4gICAgICB9O1xuICAgIH0pKTtcbiAgICB0cy5wYXlsb2FkID0gcmV0O1xuICB9XG5cbiAgc3RhdGljIE1lZGlhIChzdHJlYW0sIHRzLCB0eXBlKSB7XG4gICAgbGV0IGhlYWRlciA9IHRzLmhlYWRlcjtcbiAgICBsZXQgcGF5bG9hZCA9IHt9O1xuICAgIGhlYWRlci50eXBlID0gdHlwZTtcbiAgICBpZiAoaGVhZGVyLmFkYXB0YXRpb24gPT09IDB4MDMpIHtcbiAgICAgIHBheWxvYWQuYWRhcHRhdGlvbkxlbmd0aCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICAgIGlmIChwYXlsb2FkLmFkYXB0YXRpb25MZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCBuZXh0ID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgICAgICBwYXlsb2FkLmRpc2NvbnRpbnVlID0gbmV4dCA+Pj4gNztcbiAgICAgICAgcGF5bG9hZC5hY2Nlc3MgPSBuZXh0ID4+PiA2ICYgMHgwMTtcbiAgICAgICAgcGF5bG9hZC5wcmlvcml0eSA9IG5leHQgPj4+IDUgJiAweDAxO1xuICAgICAgICBwYXlsb2FkLlBDUiA9IG5leHQgPj4+IDQgJiAweDAxO1xuICAgICAgICBwYXlsb2FkLk9QQ1IgPSBuZXh0ID4+PiAzICYgMHgwMTtcbiAgICAgICAgcGF5bG9hZC5zcGxpY2VQb2ludCA9IG5leHQgPj4+IDIgJiAweDAxO1xuICAgICAgICBwYXlsb2FkLnRyYW5zcG9ydFByaXZhdGUgPSBuZXh0ID4+PiAxICYgMHgwMTtcbiAgICAgICAgcGF5bG9hZC5hZGFwdGF0aW9uRmllbGQgPSBuZXh0ICYgMHgwMTtcbiAgICAgICAgbGV0IF9zdGFydCA9IHN0cmVhbS5wb3NpdGlvbjtcbiAgICAgICAgaWYgKHBheWxvYWQuUENSID09PSAxKSB7XG4gICAgICAgICAgcGF5bG9hZC5wcm9ncmFtQ2xvY2tCYXNlID0gc3RyZWFtLnJlYWRVaW50MzIoKSA8PCAxO1xuICAgICAgICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgICAgICAgIHBheWxvYWQucHJvZ3JhbUNsb2NrQmFzZSB8PSBuZXh0ID4+PiAxNTtcbiAgICAgICAgICBwYXlsb2FkLnByb2dyYW1DbG9ja0V4dGVuc2lvbiA9IG5leHQgJiAweDFmZjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF5bG9hZC5PUENSID09PSAxKSB7XG4gICAgICAgICAgcGF5bG9hZC5vcmlnaW5Qcm9ncmFtQ2xvY2tCYXNlID0gc3RyZWFtLnJlYWRVaW50MzIoKSA8PCAxO1xuICAgICAgICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgICAgICAgIHBheWxvYWQub3JpZ2luUHJvZ3JhbUNsb2NrQmFzZSArPSBuZXh0ID4+PiAxNTtcbiAgICAgICAgICBwYXlsb2FkLm9yaWdpblByb2dyYW1DbG9ja0V4dGVuc2lvbiA9IG5leHQgJiAweDFmZjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF5bG9hZC5zcGxpY2VQb2ludCA9PT0gMSkge1xuICAgICAgICAgIHBheWxvYWQuc3BsaWNlQ291bnRkb3duID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXlsb2FkLnRyYW5zcG9ydFByaXZhdGUgPT09IDEpIHtcbiAgICAgICAgICBsZXQgbGVuZ3RoID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgICAgICAgIGxldCB0cmFuc3BvcnRQcml2YXRlRGF0YSA9IFtdO1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRyYW5zcG9ydFByaXZhdGVEYXRhLnB1c2goc3RyZWFtLnJlYWRVaW50OCgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBheWxvYWQuYWRhcHRhdGlvbkZpZWxkID09PSAxKSB7XG4gICAgICAgICAgbGV0IGxlbmd0aCA9IHN0cmVhbS5yZWFkVWludDgoKVxuICAgICAgICAgIGxldCBuZXh0ID0gc3RyZWFtLnJlYWRVaW50OCgpXG4gICAgICAgICAgbGV0IHN0YXJ0ID0gc3RyZWFtLnBvc2l0aW9uO1xuICAgICAgICAgIGxldCBsdHcgPSBuZXh0ID4+PiA3O1xuICAgICAgICAgIGxldCBwaWVjZXdpc2UgPSBuZXh0ID4+PiA2ICYgMHgxO1xuICAgICAgICAgIGxldCBzZWFtbGVzcyA9IG5leHQgPj4+IDUgJiAweDE7XG4gICAgICAgICAgaWYgKGx0dyA9PT0gMSkge1xuICAgICAgICAgICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgICAgICAgICBwYXlsb2FkLmx0d1ZhbGlkID0gbmV4dCA+Pj4gMTU7XG4gICAgICAgICAgICBwYXlsb2FkLmx0d09mZnNldCA9IG5leHQgJiAweGVmZmY7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwaWVjZXdpc2UgPT09IDEpIHtcbiAgICAgICAgICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQyNCgpO1xuICAgICAgICAgICAgcGF5bG9hZC5waWVjZXdpc2VSYXRlID0gbmV4dCAmIDB4M2ZmZmZmO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2VhbWxlc3MgPT09IDEpIHtcbiAgICAgICAgICAgIG5leHQgPSBzdHJlYW0ucmVhZEludDgoKTtcbiAgICAgICAgICAgIHBheWxvYWQuc3BsaWNlVHlwZSA9IG5leHQgPj4+IDQ7XG4gICAgICAgICAgICBwYXlsb2FkLmR0c05leHRBVTEgPSBuZXh0ID4+PiAxICYgMHg3O1xuICAgICAgICAgICAgcGF5bG9hZC5tYXJrZXIxID0gbmV4dCAmIDB4MTtcbiAgICAgICAgICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgICAgICAgICAgcGF5bG9hZC5kdHNOZXh0QVUyID0gbmV4dCA+Pj4gMTtcbiAgICAgICAgICAgIHBheWxvYWQubWFya2VyMiA9IG5leHQgJiAweDE7XG4gICAgICAgICAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICAgIHBheWxvYWQuZHRzTmV4dEFVMyA9IG5leHQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN0cmVhbS5za2lwKGxlbmd0aCAtIDEgLSAoc3RyZWFtLnBvc2l0aW9uIC0gc3RhcnQpKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbGFzdFN0dWZmaW5nID0gcGF5bG9hZC5hZGFwdGF0aW9uTGVuZ3RoIC0gMSAtIChzdHJlYW0ucG9zaXRpb24gLSBfc3RhcnQpO1xuICAgICAgICBzdHJlYW0uc2tpcChsYXN0U3R1ZmZpbmcpO1xuICAgICAgfVxuICAgIH1cbiAgICBwYXlsb2FkLnN0cmVhbSA9IG5ldyBTdHJlYW0oc3RyZWFtLmJ1ZmZlci5zbGljZShzdHJlYW0ucG9zaXRpb24pKTtcbiAgICB0cy5wYXlsb2FkID0gcGF5bG9hZDtcbiAgfVxuXG4gIHN0YXRpYyBQRVMgKHRzKSB7XG4gICAgbGV0IHJldCA9IHt9O1xuICAgIGxldCBidWZmZXIgPSB0cy5wYXlsb2FkLnN0cmVhbTtcblxuICAgIGxldCBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MjQoKTtcbiAgICBpZiAobmV4dCAhPT0gMSkge1xuICAgICAgcmV0LkVTID0ge307XG4gICAgICByZXQuRVMuYnVmZmVyID0gYnVmZmVyO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgc3RyZWFtSUQgPSBidWZmZXIucmVhZFVpbnQ4KCk7XG4gICAgICBpZiAoc3RyZWFtSUQgPj0gMHhlMCAmJiBzdHJlYW1JRCA8PSAweGVmKSB7XG4gICAgICAgIHJldC50eXBlID0gJ3ZpZGVvJztcbiAgICAgIH1cbiAgICAgIGlmIChzdHJlYW1JRCA+PSAweGMwICYmIHN0cmVhbUlEIDw9IDB4ZGYpIHtcbiAgICAgICAgcmV0LnR5cGUgPSAnYXVkaW8nO1xuICAgICAgfVxuICAgICAgbGV0IHBhY2tldExlbmd0aCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICByZXQucGFja2V0TGVuZ3RoID0gcGFja2V0TGVuZ3RoO1xuICAgICAgaWYgKHJldC50eXBlID09PSAndmlkZW8nIHx8IHJldC50eXBlID09PSAnYXVkaW8nKSB7XG4gICAgICAgIGxldCBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICBsZXQgZmlyc3QgPSBuZXh0ID4+PiA2O1xuICAgICAgICBpZiAoZmlyc3QgIT09IDB4MDIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Vycm9yIHdoZW4gcGFyc2UgcGVzIGhlYWRlcicpO1xuICAgICAgICB9XG4gICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQ4KCk7XG4gICAgICAgIHJldC5wdHNEVFNGbGFnID0gbmV4dCA+Pj4gNjtcbiAgICAgICAgcmV0LmVzY3JGbGFnID0gbmV4dCA+Pj4gNSAmIDB4MDE7XG4gICAgICAgIHJldC5lc1JhdGVGbGFnID0gbmV4dCA+Pj4gNCAmIDB4MDE7XG4gICAgICAgIHJldC5kc21GbGFnID0gbmV4dCA+Pj4gMyAmIDB4MDE7XG4gICAgICAgIHJldC5hZGRpdGlvbmFsRmxhZyA9IG5leHQgPj4+IDIgJiAweDAxO1xuICAgICAgICByZXQuY3JjRmxhZyA9IG5leHQgPj4+IDEgJiAweDAxO1xuICAgICAgICByZXQuZXh0ZW5zaW9uRmxhZyA9IG5leHQgJiAweDAxO1xuICAgICAgICByZXQucGVzSGVhZGVyTGVuZ3RoID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICBsZXQgTjEgPSByZXQucGVzSGVhZGVyTGVuZ3RoO1xuXG4gICAgICAgIGlmIChyZXQucHRzRFRTRmxhZyA9PT0gMikge1xuICAgICAgICAgIGxldCBwdHMgPSBbXTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICAgIHB0cy5wdXNoKG5leHQgPj4+IDEgJiAweDA3KTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBwdHMucHVzaChuZXh0ID4+PiAxKTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBwdHMucHVzaChuZXh0ID4+PiAxKTtcbiAgICAgICAgICByZXQucHRzID0gKHB0c1swXSA8PCAzMCB8IHB0c1sxXSA8PCAxNSB8IHB0c1syXSk7XG4gICAgICAgICAgTjEgLT0gNTtcbiAgICAgICAgICAvLyDop4bpopHlpoLmnpzmsqHmnIlkdHPnlKhwdHNcbiAgICAgICAgICBpZiAocmV0LnR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgICAgICAgIHJldC5kdHMgPSByZXQucHRzO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0LnB0c0RUU0ZsYWcgPT09IDMpIHtcbiAgICAgICAgICBsZXQgcHRzID0gW107XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgICBwdHMucHVzaChuZXh0ID4+PiAxICYgMHgwNyk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgcHRzLnB1c2gobmV4dCA+Pj4gMSk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgcHRzLnB1c2gobmV4dCA+Pj4gMSk7XG4gICAgICAgICAgcmV0LnB0cyA9IChwdHNbMF0gPDwgMzAgfCBwdHNbMV0gPDwgMTUgfCBwdHNbMl0pO1xuICAgICAgICAgIGxldCBkdHMgPSBbXTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICAgIGR0cy5wdXNoKG5leHQgPj4+IDEgJiAweDA3KTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBkdHMucHVzaChuZXh0ID4+PiAxKTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBkdHMucHVzaChuZXh0ID4+PiAxKTtcbiAgICAgICAgICByZXQuZHRzID0gKGR0c1swXSA8PCAzMCB8IGR0c1sxXSA8PCAxNSB8IGR0c1syXSk7XG4gICAgICAgICAgTjEgLT0gMTA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldC5lc2NyRmxhZyA9PT0gMSkge1xuICAgICAgICAgIGxldCBlc2NyID0gW11cbiAgICAgICAgICBsZXQgZXggPSBbXTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICAgIGVzY3IucHVzaChuZXh0ID4+PiAzICYgMHgwNyk7XG4gICAgICAgICAgZXNjci5wdXNoKG5leHQgJiAweDAzKTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBlc2NyLnB1c2gobmV4dCA+Pj4gMTMpO1xuICAgICAgICAgIGVzY3IucHVzaChuZXh0ICYgMHgwMyk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgZXNjci5wdXNoKG5leHQgPj4+IDEzKTtcbiAgICAgICAgICBleC5wdXNoKG5leHQgJiAweDAzKTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICAgIGV4LnB1c2gobmV4dCA+Pj4gMSk7XG4gICAgICAgICAgcmV0LmVzY3IgPSAoZXNjclswXSA8PCAzMCB8IGVzY3JbMV0gPDwgMjggfCBlc2NyWzJdIDw8IDE1IHwgZXNjclszXSA8PCAxMyB8IGVzY3JbNF0pICogMzAwICsgKGV4WzBdIDw8IDcgfCBleFsxXSk7XG4gICAgICAgICAgTjEgLT0gNjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0LmVzUmF0ZUZsYWcgPT09IDEpIHtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MjQoKTtcbiAgICAgICAgICByZXQuZXNSYXRlID0gbmV4dCA+Pj4gMSAmIDB4M2ZmZmZmO1xuICAgICAgICAgIE4xIC09IDM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldC5kc21GbGFnID09PSAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3Qgc3VwcG9ydCBEU01fdHJpY2tfbW9kZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXQuYWRkaXRpb25hbEZsYWcgPT09IDEpIHtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICAgIHJldC5hZGRpdGlvbmFsQ29weUluZm8gPSBuZXh0ICYgMHg3ZjtcbiAgICAgICAgICBOMSAtPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXQuY3JjRmxhZyA9PT0gMSkge1xuICAgICAgICAgIHJldC5wZXNDUkMgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgICAgIE4xIC09IDI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldC5leHRlbnNpb25GbGFnID09PSAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3Qgc3VwcG9ydCBleHRlbnNpb24nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoTjEgPiAwKSB7XG4gICAgICAgICAgYnVmZmVyLnNraXAoTjEpO1xuICAgICAgICB9XG4gICAgICAgIHJldC5FUyA9IFRzRGVtdXhlci5FUyhidWZmZXIsIHJldC50eXBlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZm9ybWF0IGlzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIHN0YXRpYyBFUyAoYnVmZmVyLCB0eXBlKSB7XG4gICAgbGV0IG5leHQ7XG4gICAgbGV0IHJldCA9IHt9O1xuICAgIGlmICh0eXBlID09PSAndmlkZW8nKSB7XG4gICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MzIoKTtcbiAgICAgIGlmIChuZXh0ICE9PSAxKSB7XG4gICAgICAgIGJ1ZmZlci5iYWNrKDQpO1xuICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MjQoKTtcbiAgICAgICAgaWYgKG5leHQgIT09IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2gyNjQgbmFsIGhlYWRlciBwYXJzZSBmYWlsZWQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnVmZmVyLnNraXAoMik7Ly8gMDkgRjBcbiAgICAgIC8vIFRPRE8gcmVhZG5hbHVcbiAgICAgIHJldC5idWZmZXIgPSBidWZmZXI7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnYXVkaW8nKSB7XG4gICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgIC8vIGFkdHPnmoTlkIzmraXlrZfoioLvvIwxMuS9jVxuICAgICAgaWYgKG5leHQgPj4+IDQgIT09IDB4ZmZmKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYWFjIEVTIHBhcnNlIEVycm9yJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBmcSA9IFs5NjAwMCwgODgyMDAsIDY0MDAwLCA0ODAwMCwgNDQxMDAsIDMyMDAwLCAyNDAwMCwgMjIwNTAsIDE2MDAwLCAxMjAwMCwgMTEwMjUsIDgwMDAsIDczNTBdO1xuICAgICAgcmV0LmlkID0gKG5leHQgPj4+IDMgJiAweDAxKSA9PT0gMCA/ICdNUEVHLTQnIDogJ01QRUctMic7XG4gICAgICByZXQubGF5ZXIgPSBuZXh0ID4+PiAxICYgMHgwMztcbiAgICAgIHJldC5hYnNlbnQgPSBuZXh0ICYgMHgwMTtcbiAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgcmV0LmF1ZGlvT2JqZWN0VHlwZSA9IChuZXh0ID4+PiAxNCAmIDB4MDMpICsgMTtcbiAgICAgIHJldC5wcm9maWxlID0gcmV0LmF1ZGlvT2JqZWN0VHlwZSAtIDE7XG4gICAgICByZXQuZnJlcXVlbmN5SW5kZXggPSBuZXh0ID4+PiAxMCAmIDB4MGY7XG4gICAgICByZXQuZnJlcXVlbmNlID0gZnFbcmV0LmZyZXF1ZW5jeUluZGV4XTtcbiAgICAgIHJldC5jaGFubmVsID0gbmV4dCA+Pj4gNiAmIDB4MDc7XG4gICAgICByZXQuZnJhbWVMZW5ndGggPSAobmV4dCAmIDB4MDMpIDw8IDExIHwgKGJ1ZmZlci5yZWFkVWludDE2KCkgPj4+IDUpO1xuICAgICAgVHNEZW11eGVyLmdldEF1ZGlvQ29uZmlnKHJldCk7XG4gICAgICBidWZmZXIuc2tpcCgxKTtcbiAgICAgIHJldC5idWZmZXIgPSBidWZmZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRVMgJHt0eXBlfSBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIHN0YXRpYyBUU0RUIChzdHJlYW0sIHRzLCBmcmFncykge1xuICAgIC8vIFRPRE9cbiAgICB0cy5wYXlsb2FkID0ge307XG4gIH1cblxuICBzdGF0aWMgQ0FUIChzdHJlYW0sIHRzLCBmcmFncykge1xuICAgIGxldCByZXQgPSB7fVxuICAgIHJldC50YWJsZUlEID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIGxldCBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICByZXQuc2VjdGlvbkluZGljYXRvciA9IG5leHQgPj4+IDc7XG4gICAgcmV0LnNlY3Rpb25MZW5ndGggPSBuZXh0ICYgMHgwZmZmO1xuICAgIHN0cmVhbS5za2lwKDIpO1xuICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgcmV0LnZlcnNpb24gPSBuZXh0ID4+PiAzO1xuICAgIHJldC5jdXJyZW50TmV4dEluZGljYXRvciA9IG5leHQgJiAweDAxO1xuICAgIHJldC5zZWN0aW9uTnVtYmVyID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHJldC5sYXN0U2VjdGlvbk51bWJlciA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICBsZXQgTiA9ICh0aGlzLnNlY3Rpb25MZW5ndGggLSA5KSAvIDQ7XG4gICAgbGV0IGxpc3QgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE47IGkrKykge1xuICAgICAgbGlzdC5wdXNoKHt9KTtcbiAgICB9XG4gICAgcmV0LmNyYzMyID0gc3RyZWFtLnJlYWRVaW50MzIoKTtcbiAgICB0cy5wYXlsb2FkID0gcmV0O1xuICB9XG5cbiAgc3RhdGljIGdldEF1ZGlvQ29uZmlnIChyZXQpIHtcbiAgICBsZXQgdXNlckFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpXG4gICAgbGV0IGNvbmZpZztcbiAgICBsZXQgZXh0ZW5zaW9uU2FtcGxlSW5kZXg7XG4gICAgaWYgKC9maXJlZm94L2kudGVzdCh1c2VyQWdlbnQpKSB7XG4gICAgICBpZiAocmV0LmZyZXF1ZW5jeUluZGV4ID49IDYpIHtcbiAgICAgICAgcmV0LmF1ZGlvT2JqZWN0VHlwZSA9IDU7XG4gICAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSg0KTtcbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxlSW5kZXggPSByZXQuZnJlcXVlbmN5SW5kZXggLSAzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0LmF1ZGlvT2JqZWN0VHlwZSA9IDI7XG4gICAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSgyKTtcbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxlSW5kZXggPSByZXQuZnJlcXVlbmN5SW5kZXg7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh1c2VyQWdlbnQuaW5kZXhPZignYW5kcm9pZCcpICE9PSAtMSkge1xuICAgICAgcmV0LmF1ZGlvT2JqZWN0VHlwZSA9IDI7XG4gICAgICBjb25maWcgPSBuZXcgQXJyYXkoMik7XG4gICAgICBleHRlbnNpb25TYW1wbGVJbmRleCA9IHJldC5mcmVxdWVuY3lJbmRleDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0LmF1ZGlvT2JqZWN0VHlwZSA9IDU7XG4gICAgICBjb25maWcgPSBuZXcgQXJyYXkoNCk7XG4gICAgICBpZiAocmV0LmZyZXF1ZW5jeUluZGV4ID49IDYpIHtcbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxlSW5kZXggPSByZXQuZnJlcXVlbmN5SW5kZXggLSAzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHJldC5jaGFubmVsID09PSAxKSB7XG4gICAgICAgICAgcmV0LmF1ZGlvT2JqZWN0VHlwZSA9IDI7XG4gICAgICAgICAgY29uZmlnID0gbmV3IEFycmF5KDIpO1xuICAgICAgICB9XG4gICAgICAgIGV4dGVuc2lvblNhbXBsZUluZGV4ID0gcmV0LmZyZXF1ZW5jeUluZGV4O1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbmZpZ1swXSA9IHJldC5hdWRpb09iamVjdFR5cGUgPDwgMztcbiAgICBjb25maWdbMF0gfD0gKHJldC5mcmVxdWVuY3lJbmRleCAmIDB4MGUpID4+IDE7XG4gICAgY29uZmlnWzFdID0gKHJldC5mcmVxdWVuY3lJbmRleCAmIDB4MDEpIDw8IDc7XG4gICAgY29uZmlnWzFdIHw9IHJldC5jaGFubmVsIDw8IDM7XG4gICAgaWYgKHJldC5hdWRpb09iamVjdFR5cGUgPT09IDUpIHtcbiAgICAgIGNvbmZpZ1sxXSB8PSAoZXh0ZW5zaW9uU2FtcGxlSW5kZXggJiAweDBlKSA+PiAxO1xuICAgICAgY29uZmlnWzJdID0gKGV4dGVuc2lvblNhbXBsZUluZGV4ICYgMHgwMSkgPDwgNztcbiAgICAgIGNvbmZpZ1syXSB8PSAyIDw8IDI7XG4gICAgICBjb25maWdbM10gPSAwO1xuICAgIH1cbiAgICByZXQuYXVkaW9Db25maWcgPSBjb25maWc7XG4gIH1cblxuICBnZXQgaW5wdXRCdWZmZXIgKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKHRoaXMuY29uZmlncy5pbnB1dGJ1ZmZlcik7XG4gIH1cblxuICBnZXQgX3RyYWNrcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRzRGVtdXhlcjtcbiIsImNsYXNzIFBsYXlsaXN0IHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZ3MpIHtcbiAgICB0aGlzLl9iYXNlVVJMID0gJyc7XG4gICAgdGhpcy5fbGlzdCA9IHt9O1xuICAgIHRoaXMuX3RzID0ge307XG4gICAgdGhpcy52ZXJzaW9uID0gMDtcbiAgICB0aGlzLnNlcXVlbmNlID0gLTE7XG4gICAgdGhpcy50YXJnZXRkdXJhdGlvbiA9IDA7XG4gICAgdGhpcy5kdXJhdGlvbiA9IDA7XG4gICAgdGhpcy5mcmFnTGVuZ3RoID0gMDtcbiAgICB0aGlzLl9sYXN0Z2V0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2F1ZG9jbGVhciA9IGNvbmZpZ3MuYXV0b2NsZWFyIHx8IGZhbHNlO1xuICB9XG5cbiAgZ2V0IGxpc3QgKCkge1xuICAgIHJldHVybiB0aGlzLl9saXN0O1xuICB9XG5cbiAgc2V0IGJhc2VVUkwgKGJhc2VVUkwpIHtcbiAgICBpZiAodGhpcy5iYXNlVVJMICE9PSBiYXNlVVJMKSB7XG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICB0aGlzLl9iYXNlVVJMID0gYmFzZVVSTDtcbiAgICB9XG4gIH1cblxuICBnZXQgYmFzZVVSTCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Jhc2VVUkw7XG4gIH1cblxuICBwdXNoICh0cywgZHVyYXRpb24sIGRpc2NvbnRpbnVlKSB7XG4gICAgaWYgKCF0aGlzLl90c1t0c10pIHtcbiAgICAgIHRoaXMuX3RzW3RzXSA9IHtkdXJhdGlvbjogZHVyYXRpb24sIFxuICAgICAgICBkb3dubG9hZGVkOiBmYWxzZSwgXG4gICAgICAgIGRvd25sb2FkaW5nOiBmYWxzZSwgXG4gICAgICAgIHN0YXJ0OiB0aGlzLmR1cmF0aW9uLCBcbiAgICAgICAgZGlzY29udGludWU6IGRpc2NvbnRpbnVlID8gdHJ1ZTogZmFsc2VcbiAgICAgIH07XG4gICAgICB0aGlzLl9saXN0W3RoaXMuZHVyYXRpb25dID0gdHM7XG4gICAgICB0aGlzLmR1cmF0aW9uICs9IGR1cmF0aW9uO1xuICAgICAgdGhpcy5mcmFnTGVuZ3RoICs9IDE7XG4gICAgfVxuICB9XG5cbiAgZGVsZXRlRnJhZyAodXJsKSB7XG4gICAgaWYgKHRoaXMuX3RzW3VybF0pIHtcbiAgICAgIGlmICh0aGlzLl90c1t1cmxdLnN0YXJ0ID4gdGhpcy5fbGFzdGdldC50aW1lKSB7XG4gICAgICAgIHRoaXMuX2xhc3RnZXQgPSB7XG4gICAgICAgICAgZHVyYXRpb246IHRoaXMuX3RzW3VybF0uZHVyYXRpb24sXG4gICAgICAgICAgdGltZTogdGhpcy5fdHNbdXJsXS5zdGFydCxcbiAgICAgICAgICBkb3dubG9hZGVkOiBmYWxzZSxcbiAgICAgICAgICBkb3dubG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgdXJsOiB1cmxcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZGVsZXRlIHRoaXMuX2xpc3RbdGhpcy5fdHNbdXJsXS5zdGFydF07XG4gICAgICBkZWxldGUgdGhpcy5fdHNbdXJsXTtcbiAgICAgIHRoaXMuZnJhZ0xlbmd0aCAtPSAxO1xuICAgIH1cbiAgfVxuXG4gIHB1c2hNM1U4IChkYXRhLCBkZWxldGVwcmUpIHtcbiAgICAvLyDluLjop4Tkv6Hmga/mm7/mjaJcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gbTN1OCBkYXRhIHJlY2VpdmVkLmApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnZlcnNpb24gPSBkYXRhLnZlcnNpb247XG4gICAgdGhpcy50YXJnZXRkdXJhdGlvbiA9IGRhdGEudGFyZ2V0ZHVyYXRpb247XG4gICAgaWYoZGF0YS5lbmNyeXB0ICYmICF0aGlzLmVuY3J5cHQpIHtcbiAgICAgIHRoaXMuZW5jcnlwdCA9IGRhdGEuZW5jcnlwdDtcbiAgICB9XG4gICAgLy8g5paw5YiG54mH5L+h5oGvXG4gICAgaWYgKGRhdGEuc2VxdWVuY2UgPiB0aGlzLnNlcXVlbmNlKSB7XG4gICAgICB0aGlzLnNlcXVlbmNlID0gZGF0YS5zZXF1ZW5jZTtcbiAgICAgIGxldCBuZXdmcmFnbGlzdCA9IFtdXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuZnJhZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGZyYWcgPSBkYXRhLmZyYWdzW2ldO1xuICAgICAgICBpZiAoIXRoaXMuX3RzW2ZyYWcudXJsXSkge1xuICAgICAgICAgIG5ld2ZyYWdsaXN0LnB1c2goZnJhZy51cmwpXG4gICAgICAgICAgdGhpcy5wdXNoKGZyYWcudXJsLCBmcmFnLmR1cmF0aW9uLCBmcmFnLmRpc2NvbnRpbnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZihuZXdmcmFnbGlzdC5sZW5ndGggPCAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FuIG5vdCByZWFkIHRzIGZpbGUgbGlzdC5gKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKGRlbGV0ZXByZSkge1xuICAgICAgICBsZXQgdHNsaXN0ID0gdGhpcy5nZXRUc0xpc3QoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0c2xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAobmV3ZnJhZ2xpc3QuaW5kZXhPZih0c2xpc3RbaV0pIDwgMCkge1xuICAgICAgICAgICAgdGhpcy5kZWxldGVGcmFnKHRzbGlzdFtpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgT2xkIG0zdTggZmlsZSByZWNlaXZlZCwgJHtkYXRhLnNlcXVlbmNlfWApO1xuICAgIH1cbiAgfVxuXG4gIGdldFRzTGlzdCAoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX3RzKTtcbiAgfVxuXG4gIGRvd25sb2FkZWQgKHRzbmFtZSwgaXNsb2FkZWQpIHtcbiAgICBsZXQgdHMgPSB0aGlzLl90c1t0c25hbWVdO1xuICAgIGlmICh0cykge1xuICAgICAgdHMuZG93bmxvYWRlZCA9IGlzbG9hZGVkXG4gICAgfVxuICB9XG5cbiAgZG93bmxvYWRpbmcgKHRzbmFtZSwgbG9hZGluZykge1xuICAgIGxldCB0cyA9IHRoaXMuX3RzW3RzbmFtZV07XG4gICAgaWYgKHRzKSB7XG4gICAgICB0cy5kb3dubG9hZGluZyA9IGxvYWRpbmdcbiAgICB9XG4gIH1cblxuICBnZXRUc0J5TmFtZSAobmFtZSkge1xuICAgIHJldHVybiB0aGlzLl90c1tuYW1lXTtcbiAgfVxuXG4gIGdldFRzICh0aW1lKSB7XG4gICAgbGV0IHRpbWVsaXN0ID0gT2JqZWN0LmtleXModGhpcy5fbGlzdCk7XG4gICAgbGV0IHRzO1xuXG4gICAgaWYgKHRpbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHRoaXMuX2xhc3RnZXQpIHtcbiAgICAgICAgdGltZSA9IHRoaXMuX2xhc3RnZXQudGltZSArIHRoaXMuX2xhc3RnZXQuZHVyYXRpb247XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aW1lID0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGltZWxpc3QubGVuZ3RoIDwgMSB8fCB0aW1lID49IHRoaXMuZHVyYXRpb24pIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHRpbWVsaXN0LnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KGEpIC0gcGFyc2VGbG9hdChiKVxuICAgIH0pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGltZWxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aW1lID49IHBhcnNlSW50KHRpbWVsaXN0W2ldKSkge1xuICAgICAgICBsZXQgdXJsID0gdGhpcy5fbGlzdFt0aW1lbGlzdFtpXV07XG4gICAgICAgIGxldCBkb3dubG9hZGVkID0gdGhpcy5fdHNbdXJsXS5kb3dubG9hZGVkO1xuICAgICAgICBsZXQgZG93bmxvYWRpbmcgPSB0aGlzLl90c1t1cmxdLmRvd25sb2FkaW5nO1xuICAgICAgICB0cyA9IHt1cmwsIGRvd25sb2FkZWQsIGRvd25sb2FkaW5nLCB0aW1lOiBwYXJzZUludCh0aW1lbGlzdFtpXSksIGR1cmF0aW9uOiBwYXJzZUludCh0aGlzLl90c1t1cmxdLmR1cmF0aW9uKX07XG4gICAgICAgIGlmICh0aGlzLmF1dG9jbGVhcikge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLl90c1t0aGlzLl9sYXN0Z2V0LnVybF07XG4gICAgICAgICAgZGVsZXRlIHRoaXMuX2xpc3RbdGhpcy5fbGFzdGdldC50aW1lXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sYXN0Z2V0ID0gdHM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRzO1xuICB9XG5cbiAgY2xlYXIgKCkge1xuICAgIHRoaXMuX2Jhc2VVUkwgPSAnJztcbiAgICB0aGlzLl9saXN0ID0ge307XG4gICAgdGhpcy5fdHMgPSB7fTtcbiAgICB0aGlzLnZlcnNpb24gPSAwO1xuICAgIHRoaXMuc2VxdWVuY2UgPSAtMTtcbiAgICB0aGlzLnRhcmdldGR1cmF0aW9uID0gMDtcbiAgICB0aGlzLmR1cmF0aW9uID0gMDtcbiAgfVxuXG4gIGNsZWFyRG93bmxvYWRlZCAoKSB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBPYmplY3Qua2V5cyh0aGlzLl90cykubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBsZXQgdHMgPSB0aGlzLl90c1tPYmplY3Qua2V5cyh0aGlzLl90cylbaV1dO1xuICAgICAgdHMuZG93bmxvYWRlZCA9IGZhbHNlO1xuICAgICAgdHMuZG93bmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLl9iYXNlVVJMID0gJyc7XG4gICAgdGhpcy5fbGlzdCA9IHt9O1xuICAgIHRoaXMuX3RzID0ge307XG4gICAgdGhpcy52ZXJzaW9uID0gMDtcbiAgICB0aGlzLnNlcXVlbmNlID0gLTE7XG4gICAgdGhpcy50YXJnZXRkdXJhdGlvbiA9IDA7XG4gICAgdGhpcy5kdXJhdGlvbiA9IDA7XG4gICAgdGhpcy5mcmFnTGVuZ3RoID0gMDtcbiAgICB0aGlzLl9sYXN0Z2V0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2F1ZG9jbGVhciA9IGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXlsaXN0O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIEZldGNoTG9hZGVyOiByZXF1aXJlKCcuL3NyYy9mZXRjaC1sb2FkZXInKS5kZWZhdWx0XG59O1xuIiwiaW1wb3J0IHsgRVZFTlRTIH0gZnJvbSAneGdwbGF5ZXItdXRpbHMnO1xuXG5jb25zdCBMT0FERVJfRVZFTlRTID0gRVZFTlRTLkxPQURFUl9FVkVOVFM7XG5jb25zdCBSRUFEX1NUUkVBTSA9IDA7XG5jb25zdCBSRUFEX1RFWFQgPSAxO1xuY29uc3QgUkVBRF9KU09OID0gMjtcbmNvbnN0IFJFQURfQlVGRkVSID0gMztcbmNsYXNzIEZldGNoTG9hZGVyIHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZ3MpIHtcbiAgICB0aGlzLmNvbmZpZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWdzKTtcbiAgICB0aGlzLnVybCA9IG51bGxcbiAgICB0aGlzLnN0YXR1cyA9IDBcbiAgICB0aGlzLmVycm9yID0gbnVsbFxuICAgIHRoaXMuX3JlYWRlciA9IG51bGw7XG4gICAgdGhpcy5fY2FuY2VsZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9kZXN0cm95ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnJlYWR0eXBlID0gdGhpcy5jb25maWdzLnJlYWR0eXBlO1xuICAgIHRoaXMuYnVmZmVyID0gdGhpcy5jb25maWdzLmJ1ZmZlciB8fCAnTE9BREVSX0JVRkZFUic7XG4gICAgdGhpcy5fbG9hZGVyVGFza05vID0gMDtcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIHRoaXMub24oTE9BREVSX0VWRU5UUy5MQURFUl9TVEFSVCwgdGhpcy5sb2FkLmJpbmQodGhpcykpXG4gIH1cblxuICBzdGF0aWMgZ2V0IHR5cGUgKCkge1xuICAgIHJldHVybiAnbG9hZGVyJ1xuICB9XG5cbiAgbG9hZCAodXJsLCBvcHRzKSB7XG4gICAgbGV0IF90aGlzID0gdGhpcztcbiAgICB0aGlzLnVybCA9IHVybDtcbiAgICB0aGlzLl9jYW5jZWxlZCA9IGZhbHNlO1xuXG4gICAgLy8gVE9ETzogQWRkIFJhbmdlc1xuICAgIGxldCBwYXJhbXMgPSB0aGlzLmdldFBhcmFtcyhvcHRzKVxuICAgIF90aGlzLmxvYWRpbmcgPSB0cnVlXG4gICAgcmV0dXJuIGZldGNoKHRoaXMudXJsLCBwYXJhbXMpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgX3RoaXMuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzXG4gICAgICAgIHJldHVybiBfdGhpcy5fb25GZXRjaFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICAgIF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfRVJST1IsIF90aGlzLlRBRywgbmV3IEVycm9yKGBpbnZhbGlkIHJlc3BvbnNlLmApKTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpICB7XG4gICAgICBfdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0VSUk9SLCBfdGhpcy5UQUcsIGVycm9yKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKVxuICAgIH0pXG4gIH1cblxuICBfb25GZXRjaFJlc3BvbnNlIChyZXNwb25zZSkge1xuICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgbGV0IGJ1ZmZlciA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UodGhpcy5idWZmZXIpO1xuICAgIHRoaXMuX2xvYWRlclRhc2tObysrO1xuICAgIGxldCB0YXNrbm8gPSB0aGlzLl9sb2FkZXJUYXNrTm87XG4gICAgaWYgKHJlc3BvbnNlLm9rID09PSB0cnVlKSB7XG4gICAgICBzd2l0Y2ggKHRoaXMucmVhZHR5cGUpIHtcbiAgICAgICAgY2FzZSBSRUFEX0pTT046XG4gICAgICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIF90aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgICAgICAgaWYgKCFfdGhpcy5fY2FuY2VsZWQgJiYgIV90aGlzLl9kZXN0cm95ZWQpIHtcbiAgICAgICAgICAgICAgaWYgKGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsIGJ1ZmZlcik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9DT01QTEVURSwgZGF0YSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBSRUFEX1RFWFQ6XG4gICAgICAgICAgcmVzcG9uc2UudGV4dCgpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIF90aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgICAgICAgaWYgKCFfdGhpcy5fY2FuY2VsZWQgJiYgIV90aGlzLl9kZXN0cm95ZWQpIHtcbiAgICAgICAgICAgICAgaWYgKGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsIGJ1ZmZlcik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9DT01QTEVURSwgZGF0YSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBSRUFEX0JVRkZFUjpcbiAgICAgICAgICByZXNwb25zZS5hcnJheUJ1ZmZlcigpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIF90aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgICAgICAgaWYgKCFfdGhpcy5fY2FuY2VsZWQgJiYgIV90aGlzLl9kZXN0cm95ZWQpIHtcbiAgICAgICAgICAgICAgaWYgKGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoKG5ldyBVaW50OEFycmF5KGRhdGEpKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0NPTVBMRVRFLCBidWZmZXIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsIGRhdGEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgUkVBRF9TVFJFQU06XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX29uUmVhZGVyKHJlc3BvbnNlLmJvZHkuZ2V0UmVhZGVyKCksIHRhc2tubyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX29uUmVhZGVyIChyZWFkZXIsIHRhc2tubykge1xuICAgIGxldCBidWZmZXIgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKHRoaXMuYnVmZmVyKTtcbiAgICBpZiAoKCFidWZmZXIgJiYgdGhpcy5fcmVhZGVyKSB8fCB0aGlzLl9kZXN0cm95ZWQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuX3JlYWRlci5jYW5jZWwoKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBETyBOT1RISU5HXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fcmVhZGVyID0gcmVhZGVyXG4gICAgaWYgKHRoaXMubG9hZGluZyA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBfdGhpcyA9IHRoaXNcbiAgICAvLyByZWFkZXIgcmVhZCBmdW5jdGlvbiByZXR1cm5zIGEgUHJvbWlzZS4gZ2V0IGRhdGEgd2hlbiBjYWxsYmFjayBhbmQgaGFzIHZhbHVlLmRvbmUgd2hlbiBkaXNjb25uZWN0ZWQuXG4gICAgLy8gcmVhZOaWueazlei/lOWbnuS4gOS4qlByb21pc2UuIOWbnuiwg+S4reWPr+S7peiOt+WPluWIsOaVsOaNruOAguW9k3ZhbHVlLmRvbmXlrZjlnKjml7bvvIzor7TmmI7pk77mjqXmlq3lvIDjgIJcbiAgICB0aGlzLl9yZWFkZXIgJiYgdGhpcy5fcmVhZGVyLnJlYWQoKS50aGVuKGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgIGlmICh2YWwuZG9uZSkge1xuICAgICAgICAvLyBUT0RPOiDlrozmiJDlpITnkIZcbiAgICAgICAgX3RoaXMubG9hZGluZyA9IGZhbHNlXG4gICAgICAgIF90aGlzLnN0YXR1cyA9IDA7XG4gICAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsIGJ1ZmZlcilcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChfdGhpcy5fY2FuY2VsZWQgfHwgX3RoaXMuX2Rlc3Ryb3llZCkge1xuICAgICAgICBpZiAgKF90aGlzLl9yZWFkZXIpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgX3RoaXMuX3JlYWRlci5jYW5jZWwoKVxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIERPIE5PVEhJTkdcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBidWZmZXIucHVzaCh2YWwudmFsdWUpXG4gICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0RBVEFMT0FERUQsIGJ1ZmZlcilcbiAgICAgIHJldHVybiBfdGhpcy5fb25SZWFkZXIocmVhZGVyLCB0YXNrbm8pXG4gICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBfdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0VSUk9SLCBfdGhpcy5UQUcsIGVycm9yKTtcbiAgICB9KVxuICB9XG5cbiAgZ2V0UGFyYW1zIChvcHRzKSB7XG4gICAgbGV0IG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRzKVxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKVxuXG4gICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgbW9kZTogJ2NvcnMnLFxuICAgICAgY2FjaGU6ICdkZWZhdWx0J1xuICAgIH1cblxuICAgIC8vIGFkZCBjdXN0bW9yIGhlYWRlcnNcbiAgICAvLyDmt7vliqDoh6rlrprkuYnlpLRcbiAgICBpZiAodHlwZW9mIHRoaXMuY29uZmlncy5oZWFkZXJzID09PSAnb2JqZWN0Jykge1xuICAgICAgbGV0IGNvbmZpZ0hlYWRlcnMgPSB0aGlzLmNvbmZpZ3MuaGVhZGVyc1xuICAgICAgZm9yIChsZXQga2V5IGluIGNvbmZpZ0hlYWRlcnMpIHtcbiAgICAgICAgaWYgKGNvbmZpZ0hlYWRlcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGhlYWRlcnMuYXBwZW5kKGtleSwgY29uZmlnSGVhZGVyc1trZXldKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmhlYWRlcnMgPT09ICdvYmplY3QnKSB7XG4gICAgICBsZXQgb3B0SGVhZGVycyA9IG9wdGlvbnMuaGVhZGVyc1xuICAgICAgZm9yIChsZXQga2V5IGluIG9wdEhlYWRlcnMpIHtcbiAgICAgICAgaWYgKG9wdEhlYWRlcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGhlYWRlcnMuYXBwZW5kKGtleSwgb3B0SGVhZGVyc1trZXldKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuY29ycyA9PT0gZmFsc2UpIHtcbiAgICAgIHBhcmFtcy5tb2RlID0gJ3NhbWUtb3JpZ2luJ1xuICAgIH1cblxuICAgIC8vIHdpdGhDcmVkZW50aWFscyBpcyBkaXNhYmxlZCBieSBkZWZhdWx0XG4gICAgLy8gd2l0aENyZWRlbnRpYWxzIOWcqOm7mOiupOaDheWGteS4i+S4jeiiq+S9v+eUqOOAglxuICAgIGlmIChvcHRpb25zLndpdGhDcmVkZW50aWFscykge1xuICAgICAgcGFyYW1zLmNyZWRlbnRpYWxzID0gJ2luY2x1ZGUnXG4gICAgfVxuXG4gICAgLy8gVE9ETzogQWRkIHJhbmdlcztcbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgY2FuY2VsICgpIHtcbiAgICBpZiAodGhpcy5fcmVhZGVyKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLl9yZWFkZXIuY2FuY2VsKClcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8g6Ziy5q2iZmFpbGVkOiAyMDDplJnor6/ooqvmiZPljbDliLDmjqfliLblj7DkuIpcbiAgICAgIH1cbiAgICAgIHRoaXMuX3JlYWRlciA9IG51bGxcbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlXG4gICAgICB0aGlzLl9jYW5jZWxlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5fZGVzdHJveWVkID0gdHJ1ZVxuICAgIHRoaXMuY2FuY2VsKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRmV0Y2hMb2FkZXJcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBNcDRSZW11eGVyOiByZXF1aXJlKCcuL3NyYy9tcDQnKS5kZWZhdWx0XG59O1xuIiwiaW1wb3J0IHsgQnVmZmVyIH0gZnJvbSAneGdwbGF5ZXItdXRpbHMnO1xuXG4vLyBjb25zdCBVSU5UMzJfTUFYID0gTWF0aC5wb3coMiwgMzIpIC0gMTtcbmNsYXNzIEZtcDQge1xuICBzdGF0aWMgc2l6ZSAodmFsdWUpIHtcbiAgICByZXR1cm4gQnVmZmVyLndyaXRlVWludDMyKHZhbHVlKVxuICB9XG4gIHN0YXRpYyBpbml0Qm94IChzaXplLCBuYW1lLCAuLi5jb250ZW50KSB7XG4gICAgY29uc3QgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgYnVmZmVyLndyaXRlKEZtcDQuc2l6ZShzaXplKSwgRm1wNC50eXBlKG5hbWUpLCAuLi5jb250ZW50KVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIGV4dGVuc2lvbiAodmVyc2lvbiwgZmxhZykge1xuICAgIHJldHVybiBuZXcgVWludDhBcnJheShbXG4gICAgICB2ZXJzaW9uLFxuICAgICAgKGZsYWcgPj4gMTYpICYgMHhmZixcbiAgICAgIChmbGFnID4+IDgpICYgMHhmZixcbiAgICAgIGZsYWcgJiAweGZmXG4gICAgXSlcbiAgfVxuICBzdGF0aWMgZnR5cCAoKSB7XG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgyNCwgJ2Z0eXAnLCBuZXcgVWludDhBcnJheShbXG4gICAgICAweDY5LCAweDczLCAweDZGLCAweDZELCAvLyBpc29tLFxuICAgICAgMHgwLCAweDAsIDB4MDAsIDB4MDEsIC8vIG1pbm9yX3ZlcnNpb246IDB4MDFcbiAgICAgIDB4NjksIDB4NzMsIDB4NkYsIDB4NkQsIC8vIGlzb21cbiAgICAgIDB4NjEsIDB4NzYsIDB4NjMsIDB4MzEgLy8gYXZjMVxuICAgIF0pKVxuICB9XG4gIHN0YXRpYyBtb292ICh7IHR5cGUsIG1ldGEgfSkge1xuICAgIGxldCBzaXplID0gOFxuICAgIGxldCBtdmhkID0gRm1wNC5tdmhkKG1ldGEuZHVyYXRpb24sIG1ldGEudGltZXNjYWxlKVxuICAgIGxldCB0cmFrXG5cbiAgICBpZiAodHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgdHJhayA9IEZtcDQudmlkZW9UcmFrKG1ldGEpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYWsgPSBGbXA0LmF1ZGlvVHJhayhtZXRhKVxuICAgIH1cblxuICAgIGxldCBtdmV4ID0gRm1wNC5tdmV4KG1ldGEuZHVyYXRpb24sIG1ldGEudGltZXNjYWxlIHx8IDEwMDAsIG1ldGEuaWQpO1xuICAgIFttdmhkLCB0cmFrLCBtdmV4XS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGhcbiAgICB9KVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goc2l6ZSwgJ21vb3YnLCBtdmhkLCB0cmFrLCBtdmV4KVxuICB9XG4gIHN0YXRpYyBtdmhkIChkdXJhdGlvbiwgdGltZXNjYWxlID0gMTAwMCkge1xuICAgIC8vIGR1cmF0aW9uICo9IHRpbWVzY2FsZTtcbiAgICBsZXQgYnl0ZXMgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyB2ZXJzaW9uKDApICsgZmxhZ3MgICAgIDHkvY3nmoRib3jniYjmnKwrM+S9jWZsYWdzICAgYm9454mI5pys77yMMOaIljHvvIzkuIDoiKzkuLow44CC77yI5Lul5LiL5a2X6IqC5pWw5Z2H5oyJdmVyc2lvbj0w77yJXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBjcmVhdGlvbl90aW1lICAgIOWIm+W7uuaXtumXtCAg77yI55u45a+55LqOVVRD5pe26Ze0MTkwNC0wMS0wMembtueCueeahOenkuaVsO+8iVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gbW9kaWZpY2F0aW9uX3RpbWUgICDkv67mlLnml7bpl7RcblxuICAgICAgLyoqXG4gICAgICAgICAgICAgKiB0aW1lc2NhbGU6IDQgYnl0ZXPmlofku7blqpLkvZPlnKgx56eS5pe26Ze05YaF55qE5Yi75bqm5YC877yM5Y+v5Lul55CG6Kej5Li6MeenkumVv+W6plxuICAgICAgICAgICAgICovXG4gICAgICAodGltZXNjYWxlID4+PiAyNCkgJiAweEZGLFxuICAgICAgKHRpbWVzY2FsZSA+Pj4gMTYpICYgMHhGRixcbiAgICAgICh0aW1lc2NhbGUgPj4+IDgpICYgMHhGRixcbiAgICAgICh0aW1lc2NhbGUpICYgMHhGRixcblxuICAgICAgLyoqXG4gICAgICAgICAgICAgKiBkdXJhdGlvbjogNCBieXRlc+ivpXRyYWNr55qE5pe26Ze06ZW/5bqm77yM55SoZHVyYXRpb27lkox0aW1lIHNjYWxl5YC85Y+v5Lul6K6h566XdHJhY2vml7bplb/vvIzmr5TlpoJhdWRpbyB0cmFja+eahHRpbWUgc2NhbGUgPSA4MDAwLFxuICAgICAgICAgICAgICogZHVyYXRpb24gPSA1NjAxMjjvvIzml7bplb/kuLo3MC4wMTbvvIx2aWRlbyB0cmFja+eahHRpbWUgc2NhbGUgPSA2MDAsIGR1cmF0aW9uID0gNDIwMDDvvIzml7bplb/kuLo3MFxuICAgICAgICAgICAgICovXG4gICAgICAoZHVyYXRpb24gPj4+IDI0KSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24gPj4+IDE2KSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24gPj4+IDgpICYgMHhGRixcbiAgICAgIChkdXJhdGlvbikgJiAweEZGLFxuICAgICAgMHgwMCwgMHgwMSwgMHgwMCwgMHgwMCwgLy8gUHJlZmVycmVkIHJhdGU6IDEuMCAgIOaOqOiNkOaSreaUvumAn+eOh++8jOmrmDE25L2N5ZKM5L2OMTbkvY3liIbliKvkuLrlsI/mlbDngrnmlbTmlbDpg6jliIblkozlsI/mlbDpg6jliIbvvIzljbNbMTYuMTZdIOagvOW8j++8jOivpeWAvOS4ujEuMO+8iDB4MDAwMTAwMDDvvInooajnpLrmraPluLjliY3lkJHmkq3mlL5cbiAgICAgIC8qKlxuICAgICAgICAgICAgICogUHJlZmVycmVkVm9sdW1lKDEuMCwgMmJ5dGVzKSArIHJlc2VydmVkKDJieXRlcylcbiAgICAgICAgICAgICAqIOS4jnJhdGXnsbvkvLzvvIxbOC44XSDmoLzlvI/vvIwxLjDvvIgweDAxMDDvvInooajnpLrmnIDlpKfpn7Pph49cbiAgICAgICAgICAgICAqL1xuICAgICAgMHgwMSwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vICByZXNlcnZlZDogNCArIDQgYnl0ZXPkv53nlZnkvY1cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAxLCAweDAwLCAweDAwLCAvLyAtLS0tYmVnaW4gY29tcG9zaXRpb24gbWF0cml4LS0tLVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIOinhumikeWPmOaNouefqemYtSAgIOe6v+aAp+S7o+aVsFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDEsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDQwLCAweDAwLCAweDAwLCAweDAwLCAvLyAtLS0tZW5kIGNvbXBvc2l0aW9uIG1hdHJpeC0tLS1cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIC0tLS1iZWdpbiBwcmVfZGVmaW5lZCA2ICogNCBieXRlcy0tLS1cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBwcmUtZGVmaW5lZCDkv53nlZnkvY1cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gLS0tLWVuZCBwcmVfZGVmaW5lZCA2ICogNCBieXRlcy0tLS1cbiAgICAgIDB4RkYsIDB4RkYsIDB4RkYsIDB4RkYgLy8gbmV4dF90cmFja19JRCDkuIvkuIDkuKp0cmFja+S9v+eUqOeahGlk5Y+3XG4gICAgXSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDggKyBieXRlcy5sZW5ndGgsICdtdmhkJywgbmV3IFVpbnQ4QXJyYXkoYnl0ZXMpKVxuICB9XG4gIHN0YXRpYyB2aWRlb1RyYWsgKGRhdGEpIHtcbiAgICBsZXQgc2l6ZSA9IDhcblxuICAgIGxldCB0a2hkID0gRm1wNC50a2hkKHtcbiAgICAgIGlkOiAxLFxuICAgICAgZHVyYXRpb246IGRhdGEuZHVyYXRpb24sXG4gICAgICB0aW1lc2NhbGU6IGRhdGEudGltZXNjYWxlIHx8IDEwMDAsXG4gICAgICB3aWR0aDogZGF0YS5wcmVzZW50V2lkdGgsXG4gICAgICBoZWlnaHQ6IGRhdGEucHJlc2VudEhlaWdodCxcbiAgICAgIHR5cGU6ICd2aWRlbydcbiAgICB9KVxuICAgIGxldCBtZGlhID0gRm1wNC5tZGlhKHtcbiAgICAgIHR5cGU6ICd2aWRlbycsXG4gICAgICB0aW1lc2NhbGU6IGRhdGEudGltZXNjYWxlIHx8IDEwMDAsXG4gICAgICBkdXJhdGlvbjogZGF0YS5kdXJhdGlvbixcbiAgICAgIGF2Y2M6IGRhdGEuYXZjYyxcbiAgICAgIHBhclJhdGlvOiBkYXRhLnBhclJhdGlvLFxuICAgICAgd2lkdGg6IGRhdGEucHJlc2VudFdpZHRoLFxuICAgICAgaGVpZ2h0OiBkYXRhLnByZXNlbnRIZWlnaHRcbiAgICB9KTtcbiAgICBbdGtoZCwgbWRpYV0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KHNpemUsICd0cmFrJywgdGtoZCwgbWRpYSlcbiAgfVxuICBzdGF0aWMgYXVkaW9UcmFrIChkYXRhKSB7XG4gICAgbGV0IHNpemUgPSA4XG4gICAgbGV0IHRraGQgPSBGbXA0LnRraGQoe1xuICAgICAgaWQ6IDIsXG4gICAgICBkdXJhdGlvbjogZGF0YS5kdXJhdGlvbixcbiAgICAgIHRpbWVzY2FsZTogZGF0YS50aW1lc2NhbGUgfHwgMTAwMCxcbiAgICAgIHdpZHRoOiAwLFxuICAgICAgaGVpZ2h0OiAwLFxuICAgICAgdHlwZTogJ2F1ZGlvJ1xuICAgIH0pXG4gICAgbGV0IG1kaWEgPSBGbXA0Lm1kaWEoe1xuICAgICAgdHlwZTogJ2F1ZGlvJyxcbiAgICAgIHRpbWVzY2FsZTogZGF0YS50aW1lc2NhbGUgfHwgMTAwMCxcbiAgICAgIGR1cmF0aW9uOiBkYXRhLmR1cmF0aW9uLFxuICAgICAgY2hhbm5lbENvdW50OiBkYXRhLmNoYW5uZWxDb3VudCxcbiAgICAgIHNhbXBsZXJhdGU6IGRhdGEuc2FtcGxlUmF0ZSxcbiAgICAgIGNvbmZpZzogZGF0YS5jb25maWdcbiAgICB9KTtcbiAgICBbdGtoZCwgbWRpYV0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KHNpemUsICd0cmFrJywgdGtoZCwgbWRpYSlcbiAgfVxuICBzdGF0aWMgdGtoZCAoZGF0YSkge1xuICAgIGxldCBpZCA9IGRhdGEuaWRcbiAgICBsZXQgZHVyYXRpb24gPSBkYXRhLmR1cmF0aW9uXG4gICAgbGV0IHdpZHRoID0gZGF0YS53aWR0aFxuICAgIGxldCBoZWlnaHQgPSBkYXRhLmhlaWdodFxuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwNywgLy8gdmVyc2lvbigwKSArIGZsYWdzIDHkvY3niYjmnKwgYm9454mI5pys77yMMOaIljHvvIzkuIDoiKzkuLow44CC77yI5Lul5LiL5a2X6IqC5pWw5Z2H5oyJdmVyc2lvbj0w77yJ5oyJ5L2N5oiW5pON5L2c57uT5p6c5YC877yM6aKE5a6a5LmJ5aaC5LiL77yaXG4gICAgICAvLyAweDAwMDAwMSB0cmFja19lbmFibGVk77yM5ZCm5YiZ6K+ldHJhY2vkuI3ooqvmkq3mlL7vvJtcbiAgICAgIC8vIDB4MDAwMDAyIHRyYWNrX2luX21vdmll77yM6KGo56S66K+ldHJhY2vlnKjmkq3mlL7kuK3ooqvlvJXnlKjvvJtcbiAgICAgIC8vIDB4MDAwMDA0IHRyYWNrX2luX3ByZXZpZXfvvIzooajnpLror6V0cmFja+WcqOmihOiniOaXtuiiq+W8leeUqOOAglxuICAgICAgLy8g5LiA6Iis6K+l5YC85Li6N++8jDErMis0IOWmguaenOS4gOS4quWqkuS9k+aJgOaciXRyYWNr5Z2H5pyq6K6+572udHJhY2tfaW5fbW92aWXlkox0cmFja19pbl9wcmV2aWV377yM5bCG6KKr55CG6Kej5Li65omA5pyJdHJhY2vlnYforr7nva7kuobov5nkuKTpobnvvJvlr7nkuo5oaW50IHRyYWNr77yM6K+l5YC85Li6MFxuICAgICAgLy8gaGludCB0cmFjayDov5nkuKrnibnmrornmoR0cmFja+W5tuS4jeWMheWQq+WqkuS9k+aVsOaNru+8jOiAjOaYr+WMheWQq+S6huS4gOS6m+WwhuWFtuS7luaVsOaNrnRyYWNr5omT5YyF5oiQ5rWB5aqS5L2T55qE5oyH56S65L+h5oGv44CCXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBjcmVhdGlvbl90aW1l5Yib5bu65pe26Ze077yI55u45a+55LqOVVRD5pe26Ze0MTkwNC0wMS0wMembtueCueeahOenkuaVsO+8iVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gbW9kaWZpY2F0aW9uIHRpbWUg5L+u5pS55pe26Ze0XG4gICAgICAoaWQgPj4+IDI0KSAmIDB4RkYsIC8vIHRyYWNrX0lEOiA0IGJ5dGVzIGlk5Y+377yM5LiN6IO96YeN5aSN5LiU5LiN6IO95Li6MFxuICAgICAgKGlkID4+PiAxNikgJiAweEZGLFxuICAgICAgKGlkID4+PiA4KSAmIDB4RkYsXG4gICAgICAoaWQpICYgMHhGRixcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkOiA0IGJ5dGVzICAgIOS/neeVmeS9jVxuICAgICAgKGR1cmF0aW9uID4+PiAyNCkgJiAweEZGLCAvLyBkdXJhdGlvbjogNCBieXRlcyB0cmFja+eahOaXtumXtOmVv+W6plxuICAgICAgKGR1cmF0aW9uID4+PiAxNikgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uID4+PiA4KSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24pICYgMHhGRixcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkOiAyICogNCBieXRlcyAgICDkv53nlZnkvY1cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBsYXllcigyYnl0ZXMpICsgYWx0ZXJuYXRlX2dyb3VwKDJieXRlcykgIOinhumikeWxgu+8jOm7mOiupOS4ujDvvIzlgLzlsI/nmoTlnKjkuIrlsYIudHJhY2vliIbnu4Tkv6Hmga/vvIzpu5jorqTkuLow6KGo56S66K+ldHJhY2vmnKrkuI7lhbbku5Z0cmFja+aciee+pOe7hOWFs+ezu1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gdm9sdW1lKDJieXRlcykgKyByZXNlcnZlZCgyYnl0ZXMpICAgIFs4LjhdIOagvOW8j++8jOWmguaenOS4uumfs+mikXRyYWNr77yMMS4w77yIMHgwMTAw77yJ6KGo56S65pyA5aSn6Z+z6YeP77yb5ZCm5YiZ5Li6MCAgICvkv53nlZnkvY1cbiAgICAgIDB4MDAsIDB4MDEsIDB4MDAsIDB4MDAsIC8vIC0tLS1iZWdpbiBjb21wb3NpdGlvbiBtYXRyaXgtLS0tXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAxLCAweDAwLCAweDAwLCAvLyDop4bpopHlj5jmjaLnn6npmLVcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4NDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIC0tLS1lbmQgY29tcG9zaXRpb24gbWF0cml4LS0tLVxuICAgICAgKHdpZHRoID4+PiA4KSAmIDB4RkYsIC8vIC8v5a695bqmXG4gICAgICAod2lkdGgpICYgMHhGRixcbiAgICAgIDB4MDAsIDB4MDAsXG4gICAgICAoaGVpZ2h0ID4+PiA4KSAmIDB4RkYsIC8vIOmrmOW6plxuICAgICAgKGhlaWdodCkgJiAweEZGLFxuICAgICAgMHgwMCwgMHgwMFxuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCg4ICsgY29udGVudC5ieXRlTGVuZ3RoLCAndGtoZCcsIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIGVkdHMgKGRhdGEpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IGR1cmF0aW9uID0gZGF0YS5kdXJhdGlvblxuICAgIGxldCBtZWRpYVRpbWUgPSBkYXRhLm1lZGlhVGltZVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoMzYpLCBGbXA0LnR5cGUoJ2VkdHMnKSlcbiAgICAvLyBlbHN0XG4gICAgYnVmZmVyLndyaXRlKEZtcDQuc2l6ZSgyOCksIEZtcDQudHlwZSgnZWxzdCcpKVxuICAgIGJ1ZmZlci53cml0ZShuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAxLCAvLyBlbnRyeSBjb3VudFxuICAgICAgKGR1cmF0aW9uID4+IDI0KSAmIDB4ZmYsIChkdXJhdGlvbiA+PiAxNikgJiAweGZmLCAoZHVyYXRpb24gPj4gOCkgJiAweGZmLCBkdXJhdGlvbiAmIDB4ZmYsXG4gICAgICAobWVkaWFUaW1lID4+IDI0KSAmIDB4ZmYsIChtZWRpYVRpbWUgPj4gMTYpICYgMHhmZiwgKG1lZGlhVGltZSA+PiA4KSAmIDB4ZmYsIG1lZGlhVGltZSAmIDB4ZmYsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAxIC8vIG1lZGlhIHJhdGVcbiAgICBdKSlcbiAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlclxuICB9XG4gIHN0YXRpYyBtZGlhIChkYXRhKSB7XG4gICAgbGV0IHNpemUgPSA4XG4gICAgbGV0IG1kaGQgPSBGbXA0Lm1kaGQoZGF0YS50aW1lc2NhbGUsIGRhdGEuZHVyYXRpb24pXG4gICAgbGV0IGhkbHIgPSBGbXA0LmhkbHIoZGF0YS50eXBlKVxuICAgIGxldCBtaW5mID0gRm1wNC5taW5mKGRhdGEpO1xuICAgIFttZGhkLCBoZGxyLCBtaW5mXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGhcbiAgICB9KVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goc2l6ZSwgJ21kaWEnLCBtZGhkLCBoZGxyLCBtaW5mKVxuICB9XG4gIHN0YXRpYyBtZGhkICh0aW1lc2NhbGUgPSAxMDAwLCBkdXJhdGlvbikge1xuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gY3JlYXRpb25fdGltZSAgICDliJvlu7rml7bpl7RcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIG1vZGlmaWNhdGlvbl90aW1l5L+u5pS55pe26Ze0XG4gICAgICAodGltZXNjYWxlID4+PiAyNCkgJiAweEZGLCAvLyB0aW1lc2NhbGU6IDQgYnl0ZXMgICAg5paH5Lu25aqS5L2T5ZyoMeenkuaXtumXtOWGheeahOWIu+W6puWAvO+8jOWPr+S7peeQhuino+S4ujHnp5Lplb/luqZcbiAgICAgICh0aW1lc2NhbGUgPj4+IDE2KSAmIDB4RkYsXG4gICAgICAodGltZXNjYWxlID4+PiA4KSAmIDB4RkYsXG4gICAgICAodGltZXNjYWxlKSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24gPj4+IDI0KSAmIDB4RkYsIC8vIGR1cmF0aW9uOiA0IGJ5dGVzICB0cmFja+eahOaXtumXtOmVv+W6plxuICAgICAgKGR1cmF0aW9uID4+PiAxNikgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uID4+PiA4KSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24pICYgMHhGRixcbiAgICAgIDB4NTUsIDB4QzQsIC8vIGxhbmd1YWdlOiB1bmQgKHVuZGV0ZXJtaW5lZCkg5aqS5L2T6K+t6KiA56CB44CC5pyA6auY5L2N5Li6MO+8jOWQjumdojE15L2N5Li6M+S4quWtl+espu+8iOingUlTTyA2MzktMi9U5qCH5YeG5Lit5a6a5LmJ77yJXG4gICAgICAweDAwLCAweDAwIC8vIHByZV9kZWZpbmVkID0gMFxuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxMiArIGNvbnRlbnQuYnl0ZUxlbmd0aCwgJ21kaGQnLCBGbXA0LmV4dGVuc2lvbigwLCAwKSwgY29udGVudClcbiAgfVxuICBzdGF0aWMgaGRsciAodHlwZSkge1xuICAgIGxldCB2YWx1ZSA9IFsweDAwLCAvLyB2ZXJzaW9uIDBcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBwcmVfZGVmaW5lZFxuICAgICAgMHg3NiwgMHg2OSwgMHg2NCwgMHg2NSwgLy8gaGFuZGxlcl90eXBlOiAndmlkZSdcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4NTYsIDB4NjksIDB4NjQsIDB4NjUsXG4gICAgICAweDZmLCAweDQ4LCAweDYxLCAweDZlLFxuICAgICAgMHg2NCwgMHg2YywgMHg2NSwgMHg3MiwgMHgwMCAvLyBuYW1lOiAnVmlkZW9IYW5kbGVyJ1xuICAgIF1cbiAgICBpZiAodHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgdmFsdWUuc3BsaWNlKDgsIDQsIC4uLlsweDczLCAweDZmLCAweDc1LCAweDZlXSlcbiAgICAgIHZhbHVlLnNwbGljZSgyNCwgMTMsIC4uLlsweDUzLCAweDZmLCAweDc1LCAweDZlLFxuICAgICAgICAweDY0LCAweDQ4LCAweDYxLCAweDZlLFxuICAgICAgICAweDY0LCAweDZjLCAweDY1LCAweDcyLCAweDAwXSlcbiAgICB9XG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCg4ICsgdmFsdWUubGVuZ3RoLCAnaGRscicsIG5ldyBVaW50OEFycmF5KHZhbHVlKSlcbiAgfVxuICBzdGF0aWMgbWluZiAoZGF0YSkge1xuICAgIGxldCBzaXplID0gOFxuICAgIGxldCB2bWhkID0gZGF0YS50eXBlID09PSAndmlkZW8nID8gRm1wNC52bWhkKCkgOiBGbXA0LnNtaGQoKVxuICAgIGxldCBkaW5mID0gRm1wNC5kaW5mKClcbiAgICBsZXQgc3RibCA9IEZtcDQuc3RibChkYXRhKTtcbiAgICBbdm1oZCwgZGluZiwgc3RibF0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KHNpemUsICdtaW5mJywgdm1oZCwgZGluZiwgc3RibClcbiAgfVxuICBzdGF0aWMgdm1oZCAoKSB7XG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgyMCwgJ3ZtaGQnLCBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uXG4gICAgICAweDAwLCAweDAwLCAweDAxLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgLy8gZ3JhcGhpY3Ntb2RlXG4gICAgICAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAgLy8gb3Bjb2xvclxuICAgIF0pKVxuICB9XG4gIHN0YXRpYyBzbWhkICgpIHtcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDE2LCAnc21oZCcsIG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIC8vIHZlcnNpb25cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAweDAwLCAweDAwLCAvLyBiYWxhbmNlXG4gICAgICAweDAwLCAweDAwIC8vIHJlc2VydmVkXG4gICAgXSkpXG4gIH1cbiAgc3RhdGljIGRpbmYgKCkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgZHJlZiA9IFsweDAwLCAvLyB2ZXJzaW9uIDBcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAxLCAvLyBlbnRyeV9jb3VudFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwYywgLy8gZW50cnlfc2l6ZVxuICAgICAgMHg3NSwgMHg3MiwgMHg2YywgMHgyMCwgLy8gJ3VybCcgdHlwZVxuICAgICAgMHgwMCwgLy8gdmVyc2lvbiAwXG4gICAgICAweDAwLCAweDAwLCAweDAxIC8vIGVudHJ5X2ZsYWdzXG4gICAgXVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoMzYpLCBGbXA0LnR5cGUoJ2RpbmYnKSwgRm1wNC5zaXplKDI4KSwgRm1wNC50eXBlKCdkcmVmJyksIG5ldyBVaW50OEFycmF5KGRyZWYpKVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIHN0YmwgKGRhdGEpIHtcbiAgICBsZXQgc2l6ZSA9IDhcbiAgICBsZXQgc3RzZCA9IEZtcDQuc3RzZChkYXRhKVxuICAgIGxldCBzdHRzID0gRm1wNC5zdHRzKClcbiAgICBsZXQgc3RzYyA9IEZtcDQuc3RzYygpXG4gICAgbGV0IHN0c3ogPSBGbXA0LnN0c3ooKVxuICAgIGxldCBzdGNvID0gRm1wNC5zdGNvKCk7XG4gICAgW3N0c2QsIHN0dHMsIHN0c2MsIHN0c3osIHN0Y29dLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aFxuICAgIH0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveChzaXplLCAnc3RibCcsIHN0c2QsIHN0dHMsIHN0c2MsIHN0c3osIHN0Y28pXG4gIH1cbiAgc3RhdGljIHN0c2QgKGRhdGEpIHtcbiAgICBsZXQgY29udGVudFxuICAgIGlmIChkYXRhLnR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgIC8vIGlmICghZGF0YS5pc0FBQyAmJiBkYXRhLmNvZGVjID09PSAnbXA0Jykge1xuICAgICAgLy8gICAgIGNvbnRlbnQgPSBGTVA0Lm1wMyhkYXRhKTtcbiAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAvL1xuICAgICAgLy8gfVxuICAgICAgLy8g5pSv5oyBbXA0YVxuICAgICAgY29udGVudCA9IEZtcDQubXA0YShkYXRhKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb250ZW50ID0gRm1wNC5hdmMxKGRhdGEpXG4gICAgfVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTYgKyBjb250ZW50LmJ5dGVMZW5ndGgsICdzdHNkJywgRm1wNC5leHRlbnNpb24oMCwgMCksIG5ldyBVaW50OEFycmF5KFsweDAwLCAweDAwLCAweDAwLCAweDAxXSksIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIG1wNGEgKGRhdGEpIHtcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMSwgLy8gZGF0YV9yZWZlcmVuY2VfaW5kZXhcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgZGF0YS5jaGFubmVsQ291bnQsIC8vIGNoYW5uZWxjb3VudFxuICAgICAgMHgwMCwgMHgxMCwgLy8gc2FtcGxlU2l6ZToxNmJpdHNcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkMlxuICAgICAgKGRhdGEuc2FtcGxlcmF0ZSA+PiA4KSAmIDB4ZmYsXG4gICAgICBkYXRhLnNhbXBsZXJhdGUgJiAweGZmLCAvL1xuICAgICAgMHgwMCwgMHgwMFxuICAgIF0pXG4gICAgbGV0IGVzZHMgPSBGbXA0LmVzZHMoZGF0YS5jb25maWcpXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCg4ICsgY29udGVudC5ieXRlTGVuZ3RoICsgZXNkcy5ieXRlTGVuZ3RoLCAnbXA0YScsIGNvbnRlbnQsIGVzZHMpXG4gIH1cbiAgc3RhdGljIGVzZHMgKGNvbmZpZyA9IFs0MywgMTQ2LCA4LCAwXSkge1xuICAgIGNvbnN0IGNvbmZpZ2xlbiA9IGNvbmZpZy5sZW5ndGhcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uIDBcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG5cbiAgICAgIDB4MDMsIC8vIGRlc2NyaXB0b3JfdHlwZVxuICAgICAgMHgxNyArIGNvbmZpZ2xlbiwgLy8gbGVuZ3RoXG4gICAgICAweDAwLCAweDAxLCAvLyBlc19pZFxuICAgICAgMHgwMCwgLy8gc3RyZWFtX3ByaW9yaXR5XG5cbiAgICAgIDB4MDQsIC8vIGRlc2NyaXB0b3JfdHlwZVxuICAgICAgMHgwZiArIGNvbmZpZ2xlbiwgLy8gbGVuZ3RoXG4gICAgICAweDQwLCAvLyBjb2RlYyA6IG1wZWc0X2F1ZGlvXG4gICAgICAweDE1LCAvLyBzdHJlYW1fdHlwZVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gYnVmZmVyX3NpemVcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIG1heEJpdHJhdGVcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGF2Z0JpdHJhdGVcblxuICAgICAgMHgwNSAvLyBkZXNjcmlwdG9yX3R5cGVcbiAgICBdLmNvbmNhdChbY29uZmlnbGVuXSkuY29uY2F0KGNvbmZpZykuY29uY2F0KFsweDA2LCAweDAxLCAweDAyXSkpXG4gICAgYnVmZmVyLndyaXRlKEZtcDQuc2l6ZSg4ICsgY29udGVudC5ieXRlTGVuZ3RoKSwgRm1wNC50eXBlKCdlc2RzJyksIGNvbnRlbnQpXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgYXZjMSAoZGF0YSkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgc2l6ZSA9IDQwLy8gOChhdmMxKSs4KGF2Y2MpKzgoYnRydCkrMTYocGFzcClcbiAgICAvLyBsZXQgc3BzID0gZGF0YS5zcHNcbiAgICAvLyBsZXQgcHBzID0gZGF0YS5wcHNcbiAgICBsZXQgd2lkdGggPSBkYXRhLndpZHRoXG4gICAgbGV0IGhlaWdodCA9IGRhdGEuaGVpZ2h0XG4gICAgbGV0IGhTcGFjaW5nID0gZGF0YS5wYXJSYXRpby5oZWlnaHRcbiAgICBsZXQgdlNwYWNpbmcgPSBkYXRhLnBhclJhdGlvLndpZHRoXG4gICAgLy8gbGV0IGF2Y2NCdWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICAvLyBhdmNjQnVmZmVyLndyaXRlKG5ldyBVaW50OEFycmF5KFtcbiAgICAvLyAgIDB4MDEsIC8vIHZlcnNpb25cbiAgICAvLyAgIHNwc1sxXSwgLy8gcHJvZmlsZVxuICAgIC8vICAgc3BzWzJdLCAvLyBwcm9maWxlIGNvbXBhdGlibGVcbiAgICAvLyAgIHNwc1szXSwgLy8gbGV2ZWxcbiAgICAvLyAgIDB4ZmMgfCAzLFxuICAgIC8vICAgMHhFMCB8IDEgLy8g55uu5YmN5Y+q5aSE55CG5LiA5Liqc3BzXG4gICAgLy8gXS5jb25jYXQoW3Nwcy5sZW5ndGggPj4+IDggJiAweGZmLCBzcHMubGVuZ3RoICYgMHhmZl0pKSlcbiAgICAvLyBhdmNjQnVmZmVyLndyaXRlKHNwcywgbmV3IFVpbnQ4QXJyYXkoWzEsIHBwcy5sZW5ndGggPj4+IDggJiAweGZmLCBwcHMubGVuZ3RoICYgMHhmZl0pLCBwcHMpXG5cbiAgICBsZXQgYXZjYyA9IGRhdGEuYXZjY1xuICAgIGxldCBhdmMxID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAxLCAvLyBkYXRhX3JlZmVyZW5jZV9pbmRleFxuICAgICAgMHgwMCwgMHgwMCwgLy8gcHJlX2RlZmluZWRcbiAgICAgIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHByZV9kZWZpbmVkXG4gICAgICAod2lkdGggPj4gOCkgJiAweGZmLFxuICAgICAgd2lkdGggJiAweGZmLCAvLyB3aWR0aFxuICAgICAgKGhlaWdodCA+PiA4KSAmIDB4ZmYsXG4gICAgICBoZWlnaHQgJiAweGZmLCAvLyBoZWlnaHRcbiAgICAgIDB4MDAsIDB4NDgsIDB4MDAsIDB4MDAsIC8vIGhvcml6cmVzb2x1dGlvblxuICAgICAgMHgwMCwgMHg0OCwgMHgwMCwgMHgwMCwgLy8gdmVydHJlc29sdXRpb25cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAxLCAvLyBmcmFtZV9jb3VudFxuICAgICAgMHgxMixcbiAgICAgIDB4NjQsIDB4NjEsIDB4NjksIDB4NkMsIC8vIGRhaWx5bW90aW9uL2hscy5qc1xuICAgICAgMHg3OSwgMHg2RCwgMHg2RiwgMHg3NCxcbiAgICAgIDB4NjksIDB4NkYsIDB4NkUsIDB4MkYsXG4gICAgICAweDY4LCAweDZDLCAweDczLCAweDJFLFxuICAgICAgMHg2QSwgMHg3MywgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gY29tcHJlc3Nvcm5hbWVcbiAgICAgIDB4MDAsIDB4MTgsIC8vIGRlcHRoID0gMjRcbiAgICAgIDB4MTEsIDB4MTFdKSAvLyBwcmVfZGVmaW5lZCA9IC0xXG4gICAgbGV0IGJ0cnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAweDFjLCAweDljLCAweDgwLCAvLyBidWZmZXJTaXplREJcbiAgICAgIDB4MDAsIDB4MmQsIDB4YzYsIDB4YzAsIC8vIG1heEJpdHJhdGVcbiAgICAgIDB4MDAsIDB4MmQsIDB4YzYsIDB4YzAgLy8gYXZnQml0cmF0ZVxuICAgIF0pXG4gICAgbGV0IHBhc3AgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAoaFNwYWNpbmcgPj4gMjQpLCAvLyBoU3BhY2luZ1xuICAgICAgKGhTcGFjaW5nID4+IDE2KSAmIDB4ZmYsXG4gICAgICAoaFNwYWNpbmcgPj4gOCkgJiAweGZmLFxuICAgICAgaFNwYWNpbmcgJiAweGZmLFxuICAgICAgKHZTcGFjaW5nID4+IDI0KSwgLy8gdlNwYWNpbmdcbiAgICAgICh2U3BhY2luZyA+PiAxNikgJiAweGZmLFxuICAgICAgKHZTcGFjaW5nID4+IDgpICYgMHhmZixcbiAgICAgIHZTcGFjaW5nICYgMHhmZlxuICAgIF0pXG5cbiAgICBidWZmZXIud3JpdGUoXG4gICAgICBGbXA0LnNpemUoc2l6ZSArIGF2YzEuYnl0ZUxlbmd0aCArIGF2Y2MuYnl0ZUxlbmd0aCArIGJ0cnQuYnl0ZUxlbmd0aCksIEZtcDQudHlwZSgnYXZjMScpLCBhdmMxLFxuICAgICAgRm1wNC5zaXplKDggKyBhdmNjLmJ5dGVMZW5ndGgpLCBGbXA0LnR5cGUoJ2F2Y0MnKSwgYXZjYyxcbiAgICAgIEZtcDQuc2l6ZSgyMCksIEZtcDQudHlwZSgnYnRydCcpLCBidHJ0LFxuICAgICAgRm1wNC5zaXplKDE2KSwgRm1wNC50eXBlKCdwYXNwJyksIHBhc3BcbiAgICApXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgc3R0cyAoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCAvLyBlbnRyeV9jb3VudFxuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxNiwgJ3N0dHMnLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyBzdHNjICgpIHtcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIC8vIHZlcnNpb25cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwIC8vIGVudHJ5X2NvdW50XG4gICAgXSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDE2LCAnc3RzYycsIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIHN0Y28gKCkge1xuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgLy8gdmVyc2lvblxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAgLy8gZW50cnlfY291bnRcbiAgICBdKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTYsICdzdGNvJywgY29udGVudClcbiAgfVxuICBzdGF0aWMgc3RzeiAoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gc2FtcGxlX3NpemVcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAgLy8gc2FtcGxlX2NvdW50XG4gICAgXSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDIwLCAnc3RzeicsIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIG12ZXggKGR1cmF0aW9uLCB0aW1lc2NhbGUgPSAxMDAwLCB0cmFja0lEKSB7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGxldCBtZWhkID0gQnVmZmVyLndyaXRlVWludDMyKGR1cmF0aW9uKVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoNTYpLCBGbXA0LnR5cGUoJ212ZXgnKSwgRm1wNC5zaXplKDE2KSwgRm1wNC50eXBlKCdtZWhkJyksIEZtcDQuZXh0ZW5zaW9uKDAsIDApLCBtZWhkLCBGbXA0LnRyZXgodHJhY2tJRCkpXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgdHJleCAoaWQpIHtcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIC8vIHZlcnNpb24gMFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgIChpZCA+PiAyNCksXG4gICAgICAoaWQgPj4gMTYpICYgMHhmZixcbiAgICAgIChpZCA+PiA4KSAmIDB4ZmYsXG4gICAgICAoaWQgJiAweGZmKSwgLy8gdHJhY2tfSURcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDEsIC8vIGRlZmF1bHRfc2FtcGxlX2Rlc2NyaXB0aW9uX2luZGV4XG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBkZWZhdWx0X3NhbXBsZV9kdXJhdGlvblxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZGVmYXVsdF9zYW1wbGVfc2l6ZVxuICAgICAgMHgwMCwgMHgwMSwgMHgwMCwgMHgwMSAvLyBkZWZhdWx0X3NhbXBsZV9mbGFnc1xuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCg4ICsgY29udGVudC5ieXRlTGVuZ3RoLCAndHJleCcsIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIG1vb2YgKGRhdGEpIHtcbiAgICBsZXQgc2l6ZSA9IDhcbiAgICBsZXQgbWZoZCA9IEZtcDQubWZoZCgpXG4gICAgbGV0IHRyYWYgPSBGbXA0LnRyYWYoZGF0YSk7XG4gICAgW21maGQsIHRyYWZdLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aFxuICAgIH0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveChzaXplLCAnbW9vZicsIG1maGQsIHRyYWYpXG4gIH1cbiAgc3RhdGljIG1maGQgKCkge1xuICAgIGxldCBjb250ZW50ID0gQnVmZmVyLndyaXRlVWludDMyKEZtcDQuc2VxdWVuY2UpXG4gICAgRm1wNC5zZXF1ZW5jZSArPSAxXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxNiwgJ21maGQnLCBGbXA0LmV4dGVuc2lvbigwLCAwKSwgY29udGVudClcbiAgfVxuICBzdGF0aWMgdHJhZiAoZGF0YSkge1xuICAgIGxldCBzaXplID0gOFxuICAgIGxldCB0ZmhkID0gRm1wNC50ZmhkKGRhdGEuaWQpXG4gICAgbGV0IHRmZHQgPSBGbXA0LnRmZHQoZGF0YS50aW1lKVxuICAgIGxldCBzZHRwID0gRm1wNC5zZHRwKGRhdGEpXG4gICAgbGV0IHRydW4gPSBGbXA0LnRydW4oZGF0YSwgc2R0cC5ieXRlTGVuZ3RoKTtcblxuICAgIFt0ZmhkLCB0ZmR0LCB0cnVuLCBzZHRwXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGhcbiAgICB9KVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goc2l6ZSwgJ3RyYWYnLCB0ZmhkLCB0ZmR0LCB0cnVuLCBzZHRwKVxuICB9XG4gIHN0YXRpYyB0ZmhkIChpZCkge1xuICAgIGxldCBjb250ZW50ID0gQnVmZmVyLndyaXRlVWludDMyKGlkKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTYsICd0ZmhkJywgRm1wNC5leHRlbnNpb24oMCwgMCksIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIHRmZHQgKHRpbWUpIHtcbiAgICAvLyBsZXQgdXBwZXIgPSBNYXRoLmZsb29yKHRpbWUgLyAoVUlOVDMyX01BWCArIDEpKSxcbiAgICAvLyAgICAgbG93ZXIgPSBNYXRoLmZsb29yKHRpbWUgJSAoVUlOVDMyX01BWCArIDEpKTtcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDE2LCAndGZkdCcsIEZtcDQuZXh0ZW5zaW9uKDAsIDApLCBCdWZmZXIud3JpdGVVaW50MzIodGltZSkpXG4gIH1cbiAgc3RhdGljIHRydW4gKGRhdGEsIHNkdHBMZW5ndGgpIHtcbiAgICAvLyBsZXQgaWQgPSBkYXRhLmlkO1xuICAgIC8vIGxldCBjZWlsID0gaWQgPT09IDEgPyAxNiA6IDEyO1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgc2FtcGxlQ291bnQgPSBCdWZmZXIud3JpdGVVaW50MzIoZGF0YS5zYW1wbGVzLmxlbmd0aClcbiAgICAvLyBtZGF0LWhlYWRlciA4XG4gICAgLy8gbW9vZi1oZWFkZXIgOFxuICAgIC8vIG1maGQgMTZcbiAgICAvLyB0cmFmLWhlYWRlciA4XG4gICAgLy8gdGhoZCAxNlxuICAgIC8vIHRmZHQgMjBcbiAgICAvLyB0cnVuLWhlYWRlciAxMlxuICAgIC8vIHNhbXBsZUNvdW50IDRcbiAgICAvLyBkYXRhLW9mZnNldCA0XG4gICAgLy8gc2FtcGxlcy5sZW5ndGhcbiAgICBsZXQgb2Zmc2V0ID0gQnVmZmVyLndyaXRlVWludDMyKDggKyA4ICsgMTYgKyA4ICsgMTYgKyAxNiArIDEyICsgNCArIDQgKyAxNiAqIGRhdGEuc2FtcGxlcy5sZW5ndGggKyBzZHRwTGVuZ3RoKVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoMjAgKyAxNiAqIGRhdGEuc2FtcGxlcy5sZW5ndGgpLCBGbXA0LnR5cGUoJ3RydW4nKSwgbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4MDAsIDB4MEYsIDB4MDFdKSwgc2FtcGxlQ291bnQsIG9mZnNldClcblxuICAgIC8vIGxldCBzaXplID0gYnVmZmVyLmJ1ZmZlci5ieXRlTGVuZ3RoXG4gICAgLy8gbGV0IHdyaXRlT2Zmc2V0ID0gMFxuICAgIC8vIGRhdGEuc2FtcGxlcy5mb3JFYWNoKCgpID0+IHtcbiAgICAvLyAgIHNpemUgKz0gMTZcbiAgICAvLyB9KVxuICAgIC8vXG4gICAgLy8gbGV0IHRydW5Cb3ggPSBuZXcgVWludDhBcnJheShzaXplKVxuXG4gICAgLy8gdHJ1bkJveC5zZXQoYnVmZmVyLmJ1ZmZlciwgMClcblxuICAgIGRhdGEuc2FtcGxlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCBmbGFncyA9IGl0ZW0uZmxhZ3NcbiAgICAgIC8vIGNvbnNvbGUubG9nKGl0ZW0udHlwZSwgaXRlbS5kdHMsIGl0ZW0uZHVyYXRpb24pXG5cbiAgICAgIGJ1ZmZlci53cml0ZShuZXcgVWludDhBcnJheShbXG4gICAgICAgIChpdGVtLmR1cmF0aW9uID4+PiAyNCkgJiAweEZGLCAvLyBzYW1wbGVfZHVyYXRpb25cbiAgICAgICAgKGl0ZW0uZHVyYXRpb24gPj4+IDE2KSAmIDB4RkYsXG4gICAgICAgIChpdGVtLmR1cmF0aW9uID4+PiA4KSAmIDB4RkYsXG4gICAgICAgIChpdGVtLmR1cmF0aW9uKSAmIDB4RkYsXG4gICAgICAgIChpdGVtLnNpemUgPj4+IDI0KSAmIDB4RkYsIC8vIHNhbXBsZV9zaXplXG4gICAgICAgIChpdGVtLnNpemUgPj4+IDE2KSAmIDB4RkYsXG4gICAgICAgIChpdGVtLnNpemUgPj4+IDgpICYgMHhGRixcbiAgICAgICAgKGl0ZW0uc2l6ZSkgJiAweEZGLFxuICAgICAgICAoZmxhZ3MuaXNMZWFkaW5nIDw8IDIpIHwgZmxhZ3MuZGVwZW5kc09uLCAvLyBzYW1wbGVfZmxhZ3NcbiAgICAgICAgKGZsYWdzLmlzRGVwZW5kZWRPbiA8PCA2KSB8IChmbGFncy5oYXNSZWR1bmRhbmN5IDw8IDQpIHwgZmxhZ3MuaXNOb25TeW5jLFxuICAgICAgICAweDAwLCAweDAwLCAvLyBzYW1wbGVfZGVncmFkYXRpb25fcHJpb3JpdHlcbiAgICAgICAgKGl0ZW0uY3RzID4+PiAyNCkgJiAweEZGLCAvLyBzYW1wbGVfY29tcG9zaXRpb25fdGltZV9vZmZzZXRcbiAgICAgICAgKGl0ZW0uY3RzID4+PiAxNikgJiAweEZGLFxuICAgICAgICAoaXRlbS5jdHMgPj4+IDgpICYgMHhGRixcbiAgICAgICAgKGl0ZW0uY3RzKSAmIDB4RkZcbiAgICAgIF0pKVxuICAgICAgLy8gd3JpdGVPZmZzZXQgKz0gMTZcbiAgICAgIC8vIGJ1ZmZlci53cml0ZShCdWZmZXIud3JpdGVVaW50MzIoMCkpO1xuICAgIH0pXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgc2R0cCAoZGF0YSkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKDEyICsgZGF0YS5zYW1wbGVzLmxlbmd0aCksIEZtcDQudHlwZSgnc2R0cCcpLCBGbXA0LmV4dGVuc2lvbigwLCAwKSlcbiAgICBkYXRhLnNhbXBsZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGNvbnN0IGZsYWdzID0gaXRlbS5mbGFnc1xuICAgICAgY29uc3QgbnVtID0gKGZsYWdzLmlzTGVhZGluZyA8PCA2KSB8IC8vIGlzX2xlYWRpbmc6IDIgKGJpdClcbiAgICAgICAgKGZsYWdzLmRlcGVuZHNPbiA8PCA0KSB8IC8vIHNhbXBsZV9kZXBlbmRzX29uXG4gICAgICAgIChmbGFncy5pc0RlcGVuZGVkT24gPDwgMikgfCAvLyBzYW1wbGVfaXNfZGVwZW5kZWRfb25cbiAgICAgICAgKGZsYWdzLmhhc1JlZHVuZGFuY3kpLy8gc2FtcGxlX2hhc19yZWR1bmRhbmN5XG5cbiAgICAgIGJ1ZmZlci53cml0ZShuZXcgVWludDhBcnJheShbbnVtXSkpXG4gICAgfSlcbiAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlclxuICB9XG4gIHN0YXRpYyBtZGF0IChkYXRhKSB7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGxldCBzaXplID0gOFxuICAgIGRhdGEuc2FtcGxlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLnNpemVcbiAgICB9KVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoc2l6ZSksIEZtcDQudHlwZSgnbWRhdCcpKVxuICAgIGxldCBtZGF0Qm94ID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSlcbiAgICBsZXQgb2Zmc2V0ID0gMFxuICAgIG1kYXRCb3guc2V0KGJ1ZmZlci5idWZmZXIsIG9mZnNldClcbiAgICBvZmZzZXQgKz0gOFxuICAgIGRhdGEuc2FtcGxlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaXRlbS5idWZmZXIuZm9yRWFjaCgodW5pdCkgPT4ge1xuICAgICAgICBtZGF0Qm94LnNldCh1bml0LCBvZmZzZXQpXG4gICAgICAgIG9mZnNldCArPSB1bml0LmJ5dGVMZW5ndGhcbiAgICAgICAgLy8gYnVmZmVyLndyaXRlKHVuaXQuZGF0YSk7XG4gICAgICB9KVxuICAgIH0pXG4gICAgcmV0dXJuIG1kYXRCb3hcbiAgfVxufVxuRm1wNC50eXBlID0gKG5hbWUpID0+IHtcbiAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFtuYW1lLmNoYXJDb2RlQXQoMCksIG5hbWUuY2hhckNvZGVBdCgxKSwgbmFtZS5jaGFyQ29kZUF0KDIpLCBuYW1lLmNoYXJDb2RlQXQoMyldKVxufVxuRm1wNC5zZXF1ZW5jZSA9IDFcblxuZXhwb3J0IGRlZmF1bHQgRm1wNFxuIiwiaW1wb3J0IHtcbiAgRVZFTlRTLFxuICBzbmlmZmVyLFxuICBNZWRpYVNlZ21lbnRMaXN0LFxuICBCdWZmZXJcbn0gZnJvbSAneGdwbGF5ZXItdXRpbHMnO1xuaW1wb3J0IEZtcDQgZnJvbSAnLi9mbXA0J1xuXG5jb25zdCBSRU1VWF9FVkVOVFMgPSBFVkVOVFMuUkVNVVhfRVZFTlRTXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1wNFJlbXV4ZXIge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5fZHRzQmFzZSA9IDBcbiAgICB0aGlzLl9pc0R0c0Jhc2VJbml0ZWQgPSBmYWxzZVxuXG4gICAgdGhpcy5pc0ZpcnN0VmlkZW8gPSB0cnVlXG4gICAgdGhpcy5pc0ZpcnN0QXVkaW8gPSB0cnVlXG5cbiAgICB0aGlzLnZpZGVvQWxsRHVyYXRpb24gPSAwXG4gICAgdGhpcy5hdWRpb0FsbER1cmF0aW9uID0gMFxuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgdGhpcy5vbihSRU1VWF9FVkVOVFMuUkVNVVhfTUVESUEsIHRoaXMucmVtdXguYmluZCh0aGlzKSlcbiAgICB0aGlzLm9uKFJFTVVYX0VWRU5UUy5SRU1VWF9NRVRBREFUQSwgdGhpcy5vbk1ldGFEYXRhUmVhZHkuYmluZCh0aGlzKSlcbiAgICB0aGlzLm9uKFJFTVVYX0VWRU5UUy5ERVRFQ1RfQ0hBTkdFX1NUUkVBTSwgdGhpcy5yZXNldER0c0Jhc2UuYmluZCh0aGlzKSlcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuX2R0c0Jhc2UgPSAtMVxuICAgIHRoaXMuX2R0c0Jhc2VJbml0ZWQgPSBmYWxzZVxuICB9XG5cbiAgcmVzZXQgKCkge1xuICAgIHRoaXMuX2R0c0Jhc2UgPSAwXG4gICAgdGhpcy5faXNEdHNCYXNlSW5pdGVkID0gZmFsc2VcbiAgfVxuXG4gIHJlbXV4ICgpIHtcbiAgICBjb25zdCB7IGF1ZGlvVHJhY2ssIHZpZGVvVHJhY2sgfSA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpXG4gICAgIXRoaXMuX2lzRHRzQmFzZUluaXRlZCAmJiB0aGlzLmNhbGNEdHNCYXNlKGF1ZGlvVHJhY2ssIHZpZGVvVHJhY2spXG5cbiAgICB0aGlzLl9yZW11eFZpZGVvKHZpZGVvVHJhY2spXG4gICAgdGhpcy5fcmVtdXhBdWRpbyhhdWRpb1RyYWNrKVxuICB9XG5cbiAgcmVzZXREdHNCYXNlICgpIHtcbiAgICAvLyBmb3IgaGxzIOS4remAlOWIh+aNoiBtZXRh5ZCOc2Vla1xuICAgIHRoaXMuX2R0c0Jhc2UgPSAwXG4gICAgdGhpcy5fZHRzQmFzZUluaXRlZCA9IGZhbHNlXG4gIH1cblxuICBzZWVrICgpIHtcblxuICB9XG5cbiAgb25NZXRhRGF0YVJlYWR5ICh0eXBlKSB7XG4gICAgbGV0IHRyYWNrXG5cbiAgICBpZiAodHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgY29uc3QgeyBhdWRpb1RyYWNrIH0gPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKVxuICAgICAgdHJhY2sgPSBhdWRpb1RyYWNrO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB7IHZpZGVvVHJhY2sgfSA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpXG4gICAgICB0cmFjayA9IHZpZGVvVHJhY2s7XG4gICAgfVxuXG4gICAgbGV0IHByZXNvdXJjZWJ1ZmZlciA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1BSRV9TT1VSQ0VfQlVGRkVSJyk7XG4gICAgbGV0IHNvdXJjZSA9IHByZXNvdXJjZWJ1ZmZlci5nZXRTb3VyY2UodHlwZSk7XG4gICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgIHNvdXJjZSA9IHByZXNvdXJjZWJ1ZmZlci5jcmVhdGVTb3VyY2UodHlwZSk7XG4gICAgfVxuXG4gICAgc291cmNlLm1pbWV0eXBlID0gdHJhY2subWV0YS5jb2RlYztcbiAgICBzb3VyY2UuaW5pdCA9IHRoaXMucmVtdXhJbml0U2VnbWVudCh0eXBlLCB0cmFjay5tZXRhKTtcbiAgICAvLyBzb3VyY2UuaW5pdGVkID0gZmFsc2U7XG5cbiAgICAvLyB0aGlzLnJlc2V0RHRzQmFzZSgpXG4gICAgdGhpcy5lbWl0KFJFTVVYX0VWRU5UUy5JTklUX1NFR01FTlQsIHR5cGUpXG4gIH1cblxuICByZW11eEluaXRTZWdtZW50ICh0eXBlLCBtZXRhKSB7XG4gICAgbGV0IGluaXRTZWdtZW50ID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IGZ0eXAgPSBGbXA0LmZ0eXAoKVxuICAgIGxldCBtb292ID0gRm1wNC5tb292KHsgdHlwZSwgbWV0YTogbWV0YSB9KVxuXG4gICAgaW5pdFNlZ21lbnQud3JpdGUoZnR5cCwgbW9vdilcbiAgICByZXR1cm4gaW5pdFNlZ21lbnQ7XG4gIH1cblxuICBjYWxjRHRzQmFzZSAoYXVkaW9UcmFjaywgdmlkZW9UcmFjaykge1xuICAgIGlmICghYXVkaW9UcmFjay5zYW1wbGVzLmxlbmd0aCAmJiAhdmlkZW9UcmFjay5zYW1wbGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBhdWRpb0Jhc2UgPSBJbmZpbml0eVxuICAgIGxldCB2aWRlb0Jhc2UgPSBJbmZpbml0eVxuXG4gICAgaWYgKGF1ZGlvVHJhY2suc2FtcGxlcyAmJiBhdWRpb1RyYWNrLnNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICBhdWRpb0Jhc2UgPSBhdWRpb1RyYWNrLnNhbXBsZXNbMF0uZHRzXG4gICAgfVxuICAgIGlmICh2aWRlb1RyYWNrLnNhbXBsZXMgJiYgdmlkZW9UcmFjay5zYW1wbGVzLmxlbmd0aCkge1xuICAgICAgdmlkZW9CYXNlID0gdmlkZW9UcmFjay5zYW1wbGVzWzBdLmR0c1xuICAgIH1cblxuICAgIHRoaXMuX2R0c0Jhc2UgPSBNYXRoLm1pbihhdWRpb0Jhc2UsIHZpZGVvQmFzZSlcbiAgICB0aGlzLl9pc0R0c0Jhc2VJbml0ZWQgPSB0cnVlXG4gIH1cblxuICBfcmVtdXhWaWRlbyAodmlkZW9UcmFjaykge1xuICAgIGNvbnN0IHRyYWNrID0gdmlkZW9UcmFja1xuXG4gICAgaWYgKCF2aWRlb1RyYWNrLnNhbXBsZXMgfHwgIXZpZGVvVHJhY2suc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCB7c2FtcGxlc30gPSB0cmFja1xuICAgIGxldCBmaXJzdER0cyA9IC0xXG5cbiAgICBsZXQgaW5pdFNlZ21lbnQgPSBudWxsXG4gICAgY29uc3QgbXA0U2FtcGxlcyA9IFtdXG4gICAgY29uc3QgbWRhdEJveCA9IHtcbiAgICAgIHNhbXBsZXM6IFtdXG4gICAgfVxuXG4gICAgd2hpbGUgKHNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBhdmNTYW1wbGUgPSBzYW1wbGVzLnNoaWZ0KClcblxuICAgICAgY29uc3QgeyBpc0tleWZyYW1lLCBvcHRpb25zIH0gPSBhdmNTYW1wbGVcbiAgICAgIGlmICghdGhpcy5pc0ZpcnN0QXVkaW8gJiYgb3B0aW9ucyAmJiBvcHRpb25zLm1ldGEpIHtcbiAgICAgICAgaW5pdFNlZ21lbnQgPSB0aGlzLnJlbXV4SW5pdFNlZ21lbnQoJ3ZpZGVvJywgb3B0aW9ucy5tZXRhKVxuICAgICAgICBvcHRpb25zLm1ldGEgPSBudWxsXG4gICAgICAgIHNhbXBsZXMudW5zaGlmdChhdmNTYW1wbGUpXG4gICAgICAgIGlmICghb3B0aW9ucy5pc0NvbnRpbnVlKSB7XG4gICAgICAgICAgdGhpcy5yZXNldER0c0Jhc2UoKVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBsZXQgZHRzID0gYXZjU2FtcGxlLmR0cyAtIHRoaXMuX2R0c0Jhc2VcblxuICAgICAgaWYgKGZpcnN0RHRzID09PSAtMSkge1xuICAgICAgICBmaXJzdER0cyA9IGR0c1xuICAgICAgfVxuXG4gICAgICBsZXQgY3RzXG4gICAgICBsZXQgcHRzXG4gICAgICBpZiAoYXZjU2FtcGxlLnB0cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHB0cyA9IGF2Y1NhbXBsZS5wdHMgLSB0aGlzLl9kdHNCYXNlXG4gICAgICAgIGN0cyA9IHB0cyAtIGR0c1xuICAgICAgfVxuICAgICAgaWYgKGF2Y1NhbXBsZS5jdHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwdHMgPSBhdmNTYW1wbGUuY3RzICsgZHRzXG4gICAgICAgIGN0cyA9IGF2Y1NhbXBsZS5jdHNcbiAgICAgIH1cblxuICAgICAgbGV0IG1kYXRTYW1wbGUgPSB7XG4gICAgICAgIGJ1ZmZlcjogW10sXG4gICAgICAgIHNpemU6IDBcbiAgICAgIH1cbiAgICAgIG1kYXRCb3guc2FtcGxlcy5wdXNoKG1kYXRTYW1wbGUpXG4gICAgICBtZGF0U2FtcGxlLmJ1ZmZlci5wdXNoKGF2Y1NhbXBsZS5kYXRhKVxuICAgICAgbWRhdFNhbXBsZS5zaXplICs9IGF2Y1NhbXBsZS5kYXRhLmJ5dGVMZW5ndGhcblxuICAgICAgbGV0IHNhbXBsZUR1cmF0aW9uID0gMFxuICAgICAgaWYgKHNhbXBsZXMubGVuZ3RoID49IDEpIHtcbiAgICAgICAgY29uc3QgbmV4dER0cyA9IHNhbXBsZXNbMF0uZHRzIC0gdGhpcy5fZHRzQmFzZVxuICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IG5leHREdHMgLSBkdHNcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChtcDRTYW1wbGVzLmxlbmd0aCA+PSAxKSB7IC8vIGxhc3Rlc3Qgc2FtcGxlLCB1c2Ugc2Vjb25kIGxhc3QgZHVyYXRpb25cbiAgICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IG1wNFNhbXBsZXNbbXA0U2FtcGxlcy5sZW5ndGggLSAxXS5kdXJhdGlvblxuICAgICAgICB9IGVsc2UgeyAvLyB0aGUgb25seSBvbmUgc2FtcGxlLCB1c2UgcmVmZXJlbmNlIGR1cmF0aW9uXG4gICAgICAgICAgc2FtcGxlRHVyYXRpb24gPSB0aGlzLnZpZGVvTWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnZpZGVvQWxsRHVyYXRpb24gKz0gc2FtcGxlRHVyYXRpb25cbiAgICAgIC8vIGNvbnNvbGUubG9nKGBkdHMgJHtkdHN9YCwgYHB0cyAke3B0c31gLCBgY3RzOiAke2N0c31gLCBgZHVyYXRpb246ICR7c2FtcGxlRHVyYXRpb259YCwgYXZjU2FtcGxlKVxuICAgICAgbXA0U2FtcGxlcy5wdXNoKHtcbiAgICAgICAgZHRzLFxuICAgICAgICBjdHMsXG4gICAgICAgIHB0cyxcbiAgICAgICAgZGF0YTogYXZjU2FtcGxlLmRhdGEsXG4gICAgICAgIHNpemU6IGF2Y1NhbXBsZS5kYXRhLmJ5dGVMZW5ndGgsXG4gICAgICAgIGlzS2V5ZnJhbWUsXG4gICAgICAgIGR1cmF0aW9uOiBzYW1wbGVEdXJhdGlvbixcbiAgICAgICAgZmxhZ3M6IHtcbiAgICAgICAgICBpc0xlYWRpbmc6IDAsXG4gICAgICAgICAgZGVwZW5kc09uOiBpc0tleWZyYW1lID8gMiA6IDEsXG4gICAgICAgICAgaXNEZXBlbmRlZE9uOiBpc0tleWZyYW1lID8gMSA6IDAsXG4gICAgICAgICAgaGFzUmVkdW5kYW5jeTogMCxcbiAgICAgICAgICBpc05vblN5bmM6IGlzS2V5ZnJhbWUgPyAwIDogMVxuICAgICAgICB9LFxuICAgICAgICBvcmlnaW5EdHM6IGR0cyxcbiAgICAgICAgdHlwZTogJ3ZpZGVvJ1xuICAgICAgfSlcbiAgICB9XG5cbiAgICBsZXQgbW9vZk1kYXQgPSBuZXcgQnVmZmVyKClcbiAgICBpZiAobXA0U2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IG1vb2YgPSBGbXA0Lm1vb2Yoe1xuICAgICAgICBpZDogdHJhY2subWV0YS5pZCxcbiAgICAgICAgdGltZTogZmlyc3REdHMsXG4gICAgICAgIHNhbXBsZXM6IG1wNFNhbXBsZXNcbiAgICAgIH0pXG4gICAgICBjb25zdCBtZGF0ID0gRm1wNC5tZGF0KG1kYXRCb3gpXG4gICAgICBtb29mTWRhdC53cml0ZShtb29mLCBtZGF0KVxuXG4gICAgICB0aGlzLndyaXRlVG9Tb3VyY2UoJ3ZpZGVvJywgbW9vZk1kYXQpXG4gICAgfVxuXG4gICAgaWYgKGluaXRTZWdtZW50KSB7XG4gICAgICB0aGlzLndyaXRlVG9Tb3VyY2UoJ3ZpZGVvJywgaW5pdFNlZ21lbnQpXG5cbiAgICAgIGlmIChzYW1wbGVzLmxlbmd0aCkge1xuICAgICAgICAvLyBzZWNvbmQgcGFydCBvZiBzdHJlYW0gY2hhbmdlXG4gICAgICAgIHRyYWNrLnNhbXBsZXMgPSBzYW1wbGVzO1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVtdXhWaWRlbyh0cmFjaylcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmlzRmlyc3RWaWRlbyA9IGZhbHNlXG4gICAgdGhpcy5lbWl0KFJFTVVYX0VWRU5UUy5NRURJQV9TRUdNRU5ULCAndmlkZW8nKVxuXG4gICAgY29uc3QgbGFzdFNhbXBsZSA9IG1wNFNhbXBsZXNbbXA0U2FtcGxlcy5sZW5ndGggLSAxXVxuICAgIHRoaXMuX3ZpZGVvTmV4dER0cyA9IGxhc3RTYW1wbGUuZHRzICsgbGFzdFNhbXBsZS5kdXJhdGlvbjtcbiAgICB0cmFjay5zYW1wbGVzID0gW11cbiAgICB0cmFjay5sZW5ndGggPSAwXG4gIH1cblxuICBfcmVtdXhBdWRpbyAodHJhY2spIHtcbiAgICBjb25zdCB7c2FtcGxlc30gPSB0cmFja1xuICAgIGxldCBmaXJzdER0cyA9IC0xXG4gICAgbGV0IG1wNFNhbXBsZXMgPSBbXVxuXG4gICAgbGV0IGluaXRTZWdtZW50ID0gbnVsbFxuICAgIGNvbnN0IG1kYXRCb3ggPSB7XG4gICAgICBzYW1wbGVzOiBbXVxuICAgIH1cbiAgICBpZiAoIXNhbXBsZXMgfHwgIXNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgbGV0IGlzRmlyc3REdHNJbml0ZWQgPSBmYWxzZVxuICAgIHdoaWxlIChzYW1wbGVzLmxlbmd0aCkge1xuICAgICAgbGV0IHNhbXBsZSA9IHNhbXBsZXMuc2hpZnQoKVxuICAgICAgY29uc3QgeyBkYXRhLCBvcHRpb25zIH0gPSBzYW1wbGVcbiAgICAgIGlmICghdGhpcy5pc0ZpcnN0QXVkaW8gJiYgb3B0aW9ucyAmJiBvcHRpb25zLm1ldGEpIHtcbiAgICAgICAgaW5pdFNlZ21lbnQgPSB0aGlzLnJlbXV4SW5pdFNlZ21lbnQoJ2F1ZGlvJywgb3B0aW9ucy5tZXRhKVxuICAgICAgICBvcHRpb25zLm1ldGEgPSBudWxsO1xuICAgICAgICBzYW1wbGVzLnVuc2hpZnQoc2FtcGxlKVxuICAgICAgICBpZiAoIW9wdGlvbnMuaXNDb250aW51ZSkge1xuICAgICAgICAgIHRoaXMucmVzZXREdHNCYXNlKClcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgbGV0IGR0cyA9IHNhbXBsZS5kdHMgLSB0aGlzLl9kdHNCYXNlXG4gICAgICBjb25zdCBvcmlnaW5EdHMgPSBkdHNcbiAgICAgIGlmICghaXNGaXJzdER0c0luaXRlZCkge1xuICAgICAgICBmaXJzdER0cyA9IGR0c1xuICAgICAgICBpc0ZpcnN0RHRzSW5pdGVkID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBsZXQgc2FtcGxlRHVyYXRpb24gPSAwXG5cbiAgICAgIGlmICh0aGlzLmF1ZGlvTWV0YS5yZWZTYW1wbGVEdXJhdGlvbkZpeGVkKSB7XG4gICAgICAgIHNhbXBsZUR1cmF0aW9uID0gdGhpcy5hdWRpb01ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZFxuICAgICAgfSBlbHNlIGlmIChzYW1wbGVzLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgIGNvbnN0IG5leHREdHMgPSBzYW1wbGVzWzBdLmR0cyAtIHRoaXMuX2R0c0Jhc2U7XG4gICAgICAgIHNhbXBsZUR1cmF0aW9uID0gbmV4dER0cyAtIGR0c1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG1wNFNhbXBsZXMubGVuZ3RoID49IDEpIHsgLy8gdXNlIHNlY29uZCBsYXN0IHNhbXBsZSBkdXJhdGlvblxuICAgICAgICAgIHNhbXBsZUR1cmF0aW9uID0gbXA0U2FtcGxlc1ttcDRTYW1wbGVzLmxlbmd0aCAtIDFdLmR1cmF0aW9uXG4gICAgICAgIH0gZWxzZSB7IC8vIHRoZSBvbmx5IG9uZSBzYW1wbGUsIHVzZSByZWZlcmVuY2Ugc2FtcGxlIGR1cmF0aW9uXG4gICAgICAgICAgc2FtcGxlRHVyYXRpb24gPSB0aGlzLmF1ZGlvTWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKCdyZW11eCBhdWRpbyAnLCBkdHMpXG4gICAgICB0aGlzLmF1ZGlvQWxsRHVyYXRpb24gKz0gc2FtcGxlRHVyYXRpb25cbiAgICAgIGNvbnN0IG1wNFNhbXBsZSA9IHtcbiAgICAgICAgZHRzLFxuICAgICAgICBwdHM6IGR0cyxcbiAgICAgICAgY3RzOiAwLFxuICAgICAgICBzaXplOiBkYXRhLmJ5dGVMZW5ndGgsXG4gICAgICAgIGR1cmF0aW9uOiBzYW1wbGUuZHVyYXRpb24gPyBzYW1wbGUuZHVyYXRpb24gOiBzYW1wbGVEdXJhdGlvbixcbiAgICAgICAgZmxhZ3M6IHtcbiAgICAgICAgICBpc0xlYWRpbmc6IDAsXG4gICAgICAgICAgZGVwZW5kc09uOiAyLFxuICAgICAgICAgIGlzRGVwZW5kZWRPbjogMSxcbiAgICAgICAgICBoYXNSZWR1bmRhbmN5OiAwLFxuICAgICAgICAgIGlzTm9uU3luYzogMFxuICAgICAgICB9LFxuICAgICAgICBpc0tleWZyYW1lOiB0cnVlLFxuICAgICAgICBvcmlnaW5EdHMsXG4gICAgICAgIHR5cGU6ICdhdWRpbydcbiAgICAgIH1cblxuICAgICAgbGV0IG1kYXRTYW1wbGUgPSB7XG4gICAgICAgIGJ1ZmZlcjogW10sXG4gICAgICAgIHNpemU6IDBcbiAgICAgIH1cbiAgICAgIG1kYXRTYW1wbGUuYnVmZmVyLnB1c2goZGF0YSlcbiAgICAgIG1kYXRTYW1wbGUuc2l6ZSArPSBkYXRhLmJ5dGVMZW5ndGhcblxuICAgICAgbWRhdEJveC5zYW1wbGVzLnB1c2gobWRhdFNhbXBsZSlcblxuICAgICAgbXA0U2FtcGxlcy5wdXNoKG1wNFNhbXBsZSlcbiAgICB9XG5cbiAgICBjb25zdCBtb29mTWRhdCA9IG5ldyBCdWZmZXIoKVxuXG4gICAgaWYgKG1wNFNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBtb29mID0gRm1wNC5tb29mKHtcbiAgICAgICAgaWQ6IHRyYWNrLm1ldGEuaWQsXG4gICAgICAgIHRpbWU6IGZpcnN0RHRzLFxuICAgICAgICBzYW1wbGVzOiBtcDRTYW1wbGVzXG4gICAgICB9KVxuICAgICAgY29uc3QgbWRhdCA9IEZtcDQubWRhdChtZGF0Qm94KVxuICAgICAgbW9vZk1kYXQud3JpdGUobW9vZiwgbWRhdClcblxuICAgICAgdGhpcy53cml0ZVRvU291cmNlKCdhdWRpbycsIG1vb2ZNZGF0KVxuICAgIH1cblxuICAgIGlmIChpbml0U2VnbWVudCkge1xuICAgICAgdGhpcy53cml0ZVRvU291cmNlKCdhdWRpbycsIGluaXRTZWdtZW50KVxuICAgICAgaWYgKHNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICAgIC8vIHNlY29uZCBwYXJ0IG9mIHN0cmVhbSBjaGFuZ2VcbiAgICAgICAgdHJhY2suc2FtcGxlcyA9IHNhbXBsZXM7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZW11eEF1ZGlvKHRyYWNrKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaXNGaXJzdEF1ZGlvID0gZmFsc2VcbiAgICB0aGlzLmVtaXQoUkVNVVhfRVZFTlRTLk1FRElBX1NFR01FTlQsICdhdWRpbycsIG1vb2ZNZGF0KVxuXG4gICAgY29uc3QgbGFzdFNhbXBsZSA9IG1wNFNhbXBsZXNbbXA0U2FtcGxlcy5sZW5ndGggLSAxXVxuICAgIHRoaXMuX3ZpZGVvTmV4dER0cyA9IGxhc3RTYW1wbGUuZHRzICsgbGFzdFNhbXBsZS5kdXJhdGlvbjtcbiAgICB0cmFjay5zYW1wbGVzID0gW11cbiAgICB0cmFjay5sZW5ndGggPSAwXG4gIH1cblxuICB3cml0ZVRvU291cmNlICh0eXBlLCBidWZmZXIpIHtcbiAgICBsZXQgcHJlc291cmNlYnVmZmVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnUFJFX1NPVVJDRV9CVUZGRVInKTtcbiAgICBsZXQgc291cmNlID0gcHJlc291cmNlYnVmZmVyLmdldFNvdXJjZSh0eXBlKTtcbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgc291cmNlID0gcHJlc291cmNlYnVmZmVyLmNyZWF0ZVNvdXJjZSh0eXBlKTtcbiAgICB9XG5cbiAgICBzb3VyY2UuZGF0YS5wdXNoKGJ1ZmZlcilcbiAgfVxuXG4gIGluaXRTaWxlbnRBdWRpbyAoZHRzLCBkdXJhdGlvbikge1xuICAgIGNvbnN0IHVuaXQgPSBNcDRSZW11eGVyLmdldFNpbGVudEZyYW1lKHRoaXMuYXVkaW9NZXRhLmNoYW5uZWxDb3VudClcbiAgICByZXR1cm4ge1xuICAgICAgZHRzLFxuICAgICAgcHRzOiBkdHMsXG4gICAgICBjdHM6IDAsXG4gICAgICBkdXJhdGlvbixcbiAgICAgIHVuaXQsXG4gICAgICBzaXplOiB1bml0LmJ5dGVMZW5ndGgsXG4gICAgICBvcmlnaW5EdHM6IGR0cyxcbiAgICAgIHR5cGU6ICd2aWRlbydcbiAgICB9XG4gIH1cblxuICBnZXQgdmlkZW9NZXRhICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJykudmlkZW9UcmFjay5tZXRhXG4gIH1cbiAgZ2V0IGF1ZGlvTWV0YSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpLmF1ZGlvVHJhY2subWV0YVxuICB9XG5cbiAgc3RhdGljIGdldFNpbGVudEZyYW1lIChjaGFubmVsQ291bnQpIHtcbiAgICBpZiAoY2hhbm5lbENvdW50ID09PSAxKSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjMsIDB4ODBdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSAyKSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MjEsIDB4MDAsIDB4NDksIDB4OTAsIDB4MDIsIDB4MTksIDB4MDAsIDB4MjMsIDB4ODBdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSAzKSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4OGVdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSA0KSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4ODAsIDB4MmMsIDB4ODAsIDB4MDgsIDB4MDIsIDB4MzhdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSA1KSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4ODIsIDB4MzAsIDB4MDQsIDB4OTksIDB4MDAsIDB4MjEsIDB4OTAsIDB4MDIsIDB4MzhdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSA2KSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4ODIsIDB4MzAsIDB4MDQsIDB4OTksIDB4MDAsIDB4MjEsIDB4OTAsIDB4MDIsIDB4MDAsIDB4YjIsIDB4MDAsIDB4MjAsIDB4MDgsIDB4ZTBdKVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgQ29udGV4dDogcmVxdWlyZSgnLi9zcmMvY29udGV4dCcpLmRlZmF1bHQsXG5cbiAgLy8gTW9kdWxlcyBmcm9tIGNvbnN0YW50c1xuICBFVkVOVFM6IHJlcXVpcmUoJy4vc3JjL2NvbnN0YW50cy9ldmVudHMnKS5kZWZhdWx0LFxuICBXT1JLRVJfQ09NTUFORFM6IHJlcXVpcmUoJy4vc3JjL2NvbnN0YW50cy93b3JrZXItY29tbWFuZHMnKS5kZWZhdWx0LFxuXG4gIC8vIE1vZHVsZXMgZnJvbSBlbnZcbiAgc25pZmZlcjogcmVxdWlyZSgnLi9zcmMvZW52L3NuaWZmZXInKS5kZWZhdWx0LFxuICBpc0xlOiByZXF1aXJlKCcuL3NyYy9lbnYvaXNsZScpLmRlZmF1bHQsXG4gIFVURjg6IHJlcXVpcmUoJy4vc3JjL2Vudi91dGY4JykuZGVmYXVsdCxcbiAgUGFnZVZpc2liaWxpdHk6IHJlcXVpcmUoJy4vc3JjL2Vudi9QYWdlVmlzaWJpbGl0eScpLmRlZmF1bHQsXG5cbiAgLy8gTW9kZWxzXG4gIE1lZGlhSW5mbzogcmVxdWlyZSgnLi9zcmMvbW9kZWxzL21lZGlhLWluZm8nKS5kZWZhdWx0LFxuICBNZWRpYVNhbXBsZTogcmVxdWlyZSgnLi9zcmMvbW9kZWxzL21lZGlhLXNhbXBsZScpLmRlZmF1bHQsXG4gIE1lZGlhU2VnbWVudDogcmVxdWlyZSgnLi9zcmMvbW9kZWxzL21lZGlhLXNlZ21lbnQnKS5kZWZhdWx0LFxuICBNZWRpYVNlZ21lbnRMaXN0OiByZXF1aXJlKCcuL3NyYy9tb2RlbHMvbWVkaWEtc2VnbWVudC1saXN0JykuZGVmYXVsdCxcbiAgQXVkaW9UcmFja01ldGE6IHJlcXVpcmUoJy4vc3JjL21vZGVscy90cmFjay1tZXRhJykuQXVkaW9UcmFja01ldGEsXG4gIFZpZGVvVHJhY2tNZXRhOiByZXF1aXJlKCcuL3NyYy9tb2RlbHMvdHJhY2stbWV0YScpLlZpZGVvVHJhY2tNZXRhLFxuICBBdWRpb1RyYWNrU2FtcGxlOiByZXF1aXJlKCcuL3NyYy9tb2RlbHMvdHJhY2stc2FtcGxlJykuQXVkaW9UcmFja1NhbXBsZSxcbiAgVmlkZW9UcmFja1NhbXBsZTogcmVxdWlyZSgnLi9zcmMvbW9kZWxzL3RyYWNrLXNhbXBsZScpLlZpZGVvVHJhY2tTYW1wbGUsXG5cbiAgLy8gTW9kdWxlcyBmcm9tIG1zZVxuICBNc2U6IHJlcXVpcmUoJy4vc3JjL21zZS9pbmRleCcpLmRlZmF1bHQsXG5cbiAgLy8gTW9kdWxlcyBmcm9tIHdyaXRlXG4gIFN0cmVhbTogcmVxdWlyZSgnLi9zcmMvd3JpdGUvc3RyZWFtJykuZGVmYXVsdCxcbiAgQnVmZmVyOiByZXF1aXJlKCcuL3NyYy93cml0ZS9idWZmZXInKS5kZWZhdWx0LFxuXG4gIE1vYmlsZVZpZGVvOiByZXF1aXJlKCcuL3NyYy9tb2JpbGUvbW9iaWxlLXZpZGVvJyksXG4gIC8vIENyeXB0b1xuICBDcnlwdG86IHJlcXVpcmUoJy4vc3JjL2NyeXB0bycpLmRlZmF1bHRcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKFJlc3VsdENvbnN0cnVjdG9yKSB7XG4gIHZhciB0b3RhbExlbmd0aCA9IDA7XG5cbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFycmF5cyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBhcnJheXNbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gYXJyYXlzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgdmFyIGFyciA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICB0b3RhbExlbmd0aCArPSBhcnIubGVuZ3RoO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybikge1xuICAgICAgICBfaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgcmVzdWx0ID0gbmV3IFJlc3VsdENvbnN0cnVjdG9yKHRvdGFsTGVuZ3RoKTtcbiAgdmFyIG9mZnNldCA9IDA7XG4gIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gIHZhciBfZGlkSXRlcmF0b3JFcnJvcjIgPSBmYWxzZTtcbiAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSBhcnJheXNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgIHZhciBfYXJyID0gX3N0ZXAyLnZhbHVlO1xuXG4gICAgICByZXN1bHQuc2V0KF9hcnIsIG9mZnNldCk7XG4gICAgICBvZmZzZXQgKz0gX2Fyci5sZW5ndGg7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyLnJldHVybikge1xuICAgICAgICBfaXRlcmF0b3IyLnJldHVybigpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfY29uY2F0ID0gcmVxdWlyZSgnLi9jb25jYXQnKTtcblxudmFyIF9jb25jYXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uY2F0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxubW9kdWxlLmV4cG9ydHMgPSBfY29uY2F0Mi5kZWZhdWx0OyIsImZ1bmN0aW9uIHdlYnBhY2tCb290c3RyYXBGdW5jIChtb2R1bGVzKSB7XG4vKioqKioqLyAgLy8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gIHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbi8qKioqKiovICAvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gIGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuLyoqKioqKi8gICAgLy8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyAgICBpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbi8qKioqKiovICAgICAgcmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbi8qKioqKiovICAgIC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyAgICB2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyAgICAgIGk6IG1vZHVsZUlkLFxuLyoqKioqKi8gICAgICBsOiBmYWxzZSxcbi8qKioqKiovICAgICAgZXhwb3J0czoge31cbi8qKioqKiovICAgIH07XG5cbi8qKioqKiovICAgIC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gICAgbW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbi8qKioqKiovICAgIC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbi8qKioqKiovICAgIG1vZHVsZS5sID0gdHJ1ZTtcblxuLyoqKioqKi8gICAgLy8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovICB9XG5cbi8qKioqKiovICAvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbi8qKioqKiovICAvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbi8qKioqKiovICAvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4vKioqKioqLyAgX193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4vKioqKioqLyAgLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyAgX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4vKioqKioqLyAgICBpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4vKioqKioqLyAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4vKioqKioqLyAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbi8qKioqKiovICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuLyoqKioqKi8gICAgICAgIGdldDogZ2V0dGVyXG4vKioqKioqLyAgICAgIH0pO1xuLyoqKioqKi8gICAgfVxuLyoqKioqKi8gIH07XG5cbi8qKioqKiovICAvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4vKioqKioqLyAgX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuLyoqKioqKi8gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKioqKiovICB9O1xuXG4vKioqKioqLyAgLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbi8qKioqKiovICBfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbi8qKioqKiovICAgIHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuLyoqKioqKi8gICAgICBmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuLyoqKioqKi8gICAgICBmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuLyoqKioqKi8gICAgX193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuLyoqKioqKi8gICAgcmV0dXJuIGdldHRlcjtcbi8qKioqKiovICB9O1xuXG4vKioqKioqLyAgLy8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4vKioqKioqLyAgX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4vKioqKioqLyAgLy8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovICBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuLyoqKioqKi8gIC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4vKioqKioqLyAgX193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuICB2YXIgZiA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gRU5UUllfTU9EVUxFKVxuICByZXR1cm4gZi5kZWZhdWx0IHx8IGYgLy8gdHJ5IHRvIGNhbGwgZGVmYXVsdCBpZiBkZWZpbmVkIHRvIGFsc28gc3VwcG9ydCBiYWJlbCBlc21vZHVsZSBleHBvcnRzXG59XG5cbnZhciBtb2R1bGVOYW1lUmVxRXhwID0gJ1tcXFxcLnxcXFxcLXxcXFxcK3xcXFxcd3xcXC98QF0rJ1xudmFyIGRlcGVuZGVuY3lSZWdFeHAgPSAnXFxcXChcXFxccyooXFwvXFxcXCouKj9cXFxcKlxcLyk/XFxcXHMqLio/KCcgKyBtb2R1bGVOYW1lUmVxRXhwICsgJykuKj9cXFxcKScgLy8gYWRkaXRpb25hbCBjaGFycyB3aGVuIG91dHB1dC5wYXRoaW5mbyBpcyB0cnVlXG5cbi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI1OTM2NjEvMTMwNDQyXG5mdW5jdGlvbiBxdW90ZVJlZ0V4cCAoc3RyKSB7XG4gIHJldHVybiAoc3RyICsgJycpLnJlcGxhY2UoL1suPyorXiRbXFxdXFxcXCgpe318LV0vZywgJ1xcXFwkJicpXG59XG5cbmZ1bmN0aW9uIGlzTnVtZXJpYyhuKSB7XG4gIHJldHVybiAhaXNOYU4oMSAqIG4pOyAvLyAxICogbiBjb252ZXJ0cyBpbnRlZ2VycywgaW50ZWdlcnMgYXMgc3RyaW5nIChcIjEyM1wiKSwgMWUzIGFuZCBcIjFlM1wiIHRvIGludGVnZXJzIGFuZCBzdHJpbmdzIHRvIE5hTlxufVxuXG5mdW5jdGlvbiBnZXRNb2R1bGVEZXBlbmRlbmNpZXMgKHNvdXJjZXMsIG1vZHVsZSwgcXVldWVOYW1lKSB7XG4gIHZhciByZXR2YWwgPSB7fVxuICByZXR2YWxbcXVldWVOYW1lXSA9IFtdXG5cbiAgdmFyIGZuU3RyaW5nID0gbW9kdWxlLnRvU3RyaW5nKClcbiAgdmFyIHdyYXBwZXJTaWduYXR1cmUgPSBmblN0cmluZy5tYXRjaCgvXmZ1bmN0aW9uXFxzP1xcdypcXChcXHcrLFxccypcXHcrLFxccyooXFx3KylcXCkvKVxuICBpZiAoIXdyYXBwZXJTaWduYXR1cmUpIHJldHVybiByZXR2YWxcbiAgdmFyIHdlYnBhY2tSZXF1aXJlTmFtZSA9IHdyYXBwZXJTaWduYXR1cmVbMV1cblxuICAvLyBtYWluIGJ1bmRsZSBkZXBzXG4gIHZhciByZSA9IG5ldyBSZWdFeHAoJyhcXFxcXFxcXG58XFxcXFcpJyArIHF1b3RlUmVnRXhwKHdlYnBhY2tSZXF1aXJlTmFtZSkgKyBkZXBlbmRlbmN5UmVnRXhwLCAnZycpXG4gIHZhciBtYXRjaFxuICB3aGlsZSAoKG1hdGNoID0gcmUuZXhlYyhmblN0cmluZykpKSB7XG4gICAgaWYgKG1hdGNoWzNdID09PSAnZGxsLXJlZmVyZW5jZScpIGNvbnRpbnVlXG4gICAgcmV0dmFsW3F1ZXVlTmFtZV0ucHVzaChtYXRjaFszXSlcbiAgfVxuXG4gIC8vIGRsbCBkZXBzXG4gIHJlID0gbmV3IFJlZ0V4cCgnXFxcXCgnICsgcXVvdGVSZWdFeHAod2VicGFja1JlcXVpcmVOYW1lKSArICdcXFxcKFwiKGRsbC1yZWZlcmVuY2VcXFxccygnICsgbW9kdWxlTmFtZVJlcUV4cCArICcpKVwiXFxcXClcXFxcKScgKyBkZXBlbmRlbmN5UmVnRXhwLCAnZycpXG4gIHdoaWxlICgobWF0Y2ggPSByZS5leGVjKGZuU3RyaW5nKSkpIHtcbiAgICBpZiAoIXNvdXJjZXNbbWF0Y2hbMl1dKSB7XG4gICAgICByZXR2YWxbcXVldWVOYW1lXS5wdXNoKG1hdGNoWzFdKVxuICAgICAgc291cmNlc1ttYXRjaFsyXV0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKG1hdGNoWzFdKS5tXG4gICAgfVxuICAgIHJldHZhbFttYXRjaFsyXV0gPSByZXR2YWxbbWF0Y2hbMl1dIHx8IFtdXG4gICAgcmV0dmFsW21hdGNoWzJdXS5wdXNoKG1hdGNoWzRdKVxuICB9XG5cbiAgLy8gY29udmVydCAxZTMgYmFjayB0byAxMDAwIC0gdGhpcyBjYW4gYmUgaW1wb3J0YW50IGFmdGVyIHVnbGlmeS1qcyBjb252ZXJ0ZWQgMTAwMCB0byAxZTNcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhyZXR2YWwpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJldHZhbFtrZXlzW2ldXS5sZW5ndGg7IGorKykge1xuICAgICAgaWYgKGlzTnVtZXJpYyhyZXR2YWxba2V5c1tpXV1bal0pKSB7XG4gICAgICAgIHJldHZhbFtrZXlzW2ldXVtqXSA9IDEgKiByZXR2YWxba2V5c1tpXV1bal07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJldHZhbFxufVxuXG5mdW5jdGlvbiBoYXNWYWx1ZXNJblF1ZXVlcyAocXVldWVzKSB7XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMocXVldWVzKVxuICByZXR1cm4ga2V5cy5yZWR1Y2UoZnVuY3Rpb24gKGhhc1ZhbHVlcywga2V5KSB7XG4gICAgcmV0dXJuIGhhc1ZhbHVlcyB8fCBxdWV1ZXNba2V5XS5sZW5ndGggPiAwXG4gIH0sIGZhbHNlKVxufVxuXG5mdW5jdGlvbiBnZXRSZXF1aXJlZE1vZHVsZXMgKHNvdXJjZXMsIG1vZHVsZUlkKSB7XG4gIHZhciBtb2R1bGVzUXVldWUgPSB7XG4gICAgbWFpbjogW21vZHVsZUlkXVxuICB9XG4gIHZhciByZXF1aXJlZE1vZHVsZXMgPSB7XG4gICAgbWFpbjogW11cbiAgfVxuICB2YXIgc2Vlbk1vZHVsZXMgPSB7XG4gICAgbWFpbjoge31cbiAgfVxuXG4gIHdoaWxlIChoYXNWYWx1ZXNJblF1ZXVlcyhtb2R1bGVzUXVldWUpKSB7XG4gICAgdmFyIHF1ZXVlcyA9IE9iamVjdC5rZXlzKG1vZHVsZXNRdWV1ZSlcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHF1ZXVlTmFtZSA9IHF1ZXVlc1tpXVxuICAgICAgdmFyIHF1ZXVlID0gbW9kdWxlc1F1ZXVlW3F1ZXVlTmFtZV1cbiAgICAgIHZhciBtb2R1bGVUb0NoZWNrID0gcXVldWUucG9wKClcbiAgICAgIHNlZW5Nb2R1bGVzW3F1ZXVlTmFtZV0gPSBzZWVuTW9kdWxlc1txdWV1ZU5hbWVdIHx8IHt9XG4gICAgICBpZiAoc2Vlbk1vZHVsZXNbcXVldWVOYW1lXVttb2R1bGVUb0NoZWNrXSB8fCAhc291cmNlc1txdWV1ZU5hbWVdW21vZHVsZVRvQ2hlY2tdKSBjb250aW51ZVxuICAgICAgc2Vlbk1vZHVsZXNbcXVldWVOYW1lXVttb2R1bGVUb0NoZWNrXSA9IHRydWVcbiAgICAgIHJlcXVpcmVkTW9kdWxlc1txdWV1ZU5hbWVdID0gcmVxdWlyZWRNb2R1bGVzW3F1ZXVlTmFtZV0gfHwgW11cbiAgICAgIHJlcXVpcmVkTW9kdWxlc1txdWV1ZU5hbWVdLnB1c2gobW9kdWxlVG9DaGVjaylcbiAgICAgIHZhciBuZXdNb2R1bGVzID0gZ2V0TW9kdWxlRGVwZW5kZW5jaWVzKHNvdXJjZXMsIHNvdXJjZXNbcXVldWVOYW1lXVttb2R1bGVUb0NoZWNrXSwgcXVldWVOYW1lKVxuICAgICAgdmFyIG5ld01vZHVsZXNLZXlzID0gT2JqZWN0LmtleXMobmV3TW9kdWxlcylcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbmV3TW9kdWxlc0tleXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgbW9kdWxlc1F1ZXVlW25ld01vZHVsZXNLZXlzW2pdXSA9IG1vZHVsZXNRdWV1ZVtuZXdNb2R1bGVzS2V5c1tqXV0gfHwgW11cbiAgICAgICAgbW9kdWxlc1F1ZXVlW25ld01vZHVsZXNLZXlzW2pdXSA9IG1vZHVsZXNRdWV1ZVtuZXdNb2R1bGVzS2V5c1tqXV0uY29uY2F0KG5ld01vZHVsZXNbbmV3TW9kdWxlc0tleXNbal1dKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXF1aXJlZE1vZHVsZXNcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobW9kdWxlSWQsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgdmFyIHNvdXJjZXMgPSB7XG4gICAgbWFpbjogX193ZWJwYWNrX21vZHVsZXNfX1xuICB9XG5cbiAgdmFyIHJlcXVpcmVkTW9kdWxlcyA9IG9wdGlvbnMuYWxsID8geyBtYWluOiBPYmplY3Qua2V5cyhzb3VyY2VzLm1haW4pIH0gOiBnZXRSZXF1aXJlZE1vZHVsZXMoc291cmNlcywgbW9kdWxlSWQpXG5cbiAgdmFyIHNyYyA9ICcnXG5cbiAgT2JqZWN0LmtleXMocmVxdWlyZWRNb2R1bGVzKS5maWx0ZXIoZnVuY3Rpb24gKG0pIHsgcmV0dXJuIG0gIT09ICdtYWluJyB9KS5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGUpIHtcbiAgICB2YXIgZW50cnlNb2R1bGUgPSAwXG4gICAgd2hpbGUgKHJlcXVpcmVkTW9kdWxlc1ttb2R1bGVdW2VudHJ5TW9kdWxlXSkge1xuICAgICAgZW50cnlNb2R1bGUrK1xuICAgIH1cbiAgICByZXF1aXJlZE1vZHVsZXNbbW9kdWxlXS5wdXNoKGVudHJ5TW9kdWxlKVxuICAgIHNvdXJjZXNbbW9kdWxlXVtlbnRyeU1vZHVsZV0gPSAnKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykgeyBtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX187IH0pJ1xuICAgIHNyYyA9IHNyYyArICd2YXIgJyArIG1vZHVsZSArICcgPSAoJyArIHdlYnBhY2tCb290c3RyYXBGdW5jLnRvU3RyaW5nKCkucmVwbGFjZSgnRU5UUllfTU9EVUxFJywgSlNPTi5zdHJpbmdpZnkoZW50cnlNb2R1bGUpKSArICcpKHsnICsgcmVxdWlyZWRNb2R1bGVzW21vZHVsZV0ubWFwKGZ1bmN0aW9uIChpZCkgeyByZXR1cm4gJycgKyBKU09OLnN0cmluZ2lmeShpZCkgKyAnOiAnICsgc291cmNlc1ttb2R1bGVdW2lkXS50b1N0cmluZygpIH0pLmpvaW4oJywnKSArICd9KTtcXG4nXG4gIH0pXG5cbiAgc3JjID0gc3JjICsgJ25ldyAoKCcgKyB3ZWJwYWNrQm9vdHN0cmFwRnVuYy50b1N0cmluZygpLnJlcGxhY2UoJ0VOVFJZX01PRFVMRScsIEpTT04uc3RyaW5naWZ5KG1vZHVsZUlkKSkgKyAnKSh7JyArIHJlcXVpcmVkTW9kdWxlcy5tYWluLm1hcChmdW5jdGlvbiAoaWQpIHsgcmV0dXJuICcnICsgSlNPTi5zdHJpbmdpZnkoaWQpICsgJzogJyArIHNvdXJjZXMubWFpbltpZF0udG9TdHJpbmcoKSB9KS5qb2luKCcsJykgKyAnfSkpKHNlbGYpOydcblxuICB2YXIgYmxvYiA9IG5ldyB3aW5kb3cuQmxvYihbc3JjXSwgeyB0eXBlOiAndGV4dC9qYXZhc2NyaXB0JyB9KVxuICBpZiAob3B0aW9ucy5iYXJlKSB7IHJldHVybiBibG9iIH1cblxuICB2YXIgVVJMID0gd2luZG93LlVSTCB8fCB3aW5kb3cud2Via2l0VVJMIHx8IHdpbmRvdy5tb3pVUkwgfHwgd2luZG93Lm1zVVJMXG5cbiAgdmFyIHdvcmtlclVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYilcbiAgdmFyIHdvcmtlciA9IG5ldyB3aW5kb3cuV29ya2VyKHdvcmtlclVybClcbiAgd29ya2VyLm9iamVjdFVSTCA9IHdvcmtlclVybFxuXG4gIHJldHVybiB3b3JrZXJcbn1cbiIsImNvbnN0IExPQURFUl9FVkVOVFMgPSB7XG4gIExBREVSX1NUQVJUOiAnTE9BREVSX1NUQVJUJyxcbiAgTE9BREVSX0RBVEFMT0FERUQ6ICdMT0FERVJfREFUQUxPQURFRCcsXG4gIExPQURFUl9DT01QTEVURTogJ0xPQURFUl9DT01QTEVURScsXG4gIExPQURFUl9FUlJPUjogJ0xPQURFUl9FUlJPUidcbn1cblxuY29uc3QgREVNVVhfRVZFTlRTID0ge1xuICBERU1VWF9TVEFSVDogJ0RFTVVYX1NUQVJUJyxcbiAgREVNVVhfQ09NUExFVEU6ICdERU1VWF9DT01QTEVURScsXG4gIERFTVVYX0VSUk9SOiAnREVNVVhfRVJST1InLFxuICBNRVRBREFUQV9QQVJTRUQ6ICdNRVRBREFUQV9QQVJTRUQnLFxuICBWSURFT19NRVRBREFUQV9DSEFOR0U6ICdWSURFT19NRVRBREFUQV9DSEFOR0UnLFxuICBBVURJT19NRVRBREFUQV9DSEFOR0U6ICdBVURJT19NRVRBREFUQV9DSEFOR0UnLFxuICBNRURJQV9JTkZPOiAnTUVESUFfSU5GTydcbn1cblxuY29uc3QgUkVNVVhfRVZFTlRTID0ge1xuICBSRU1VWF9NRVRBREFUQTogJ1JFTVVYX01FVEFEQVRBJyxcbiAgUkVNVVhfTUVESUE6ICdSRU1VWF9NRURJQScsXG4gIE1FRElBX1NFR01FTlQ6ICdNRURJQV9TRUdNRU5UJyxcbiAgUkVNVVhfRVJST1I6ICdSRU1VWF9FUlJPUicsXG4gIElOSVRfU0VHTUVOVDogJ0lOSVRfU0VHTUVOVCcsXG4gIERFVEVDVF9DSEFOR0VfU1RSRUFNOiAnREVURUNUX0NIQU5HRV9TVFJFQU0nXG59XG5cbmNvbnN0IE1TRV9FVkVOVFMgPSB7XG4gIFNPVVJDRV9VUERBVEVfRU5EOiAnU09VUkNFX1VQREFURV9FTkQnXG59XG5cbi8vIGhsc+S4k+aciWV2ZW50c1xuY29uc3QgSExTX0VWRU5UUyA9IHtcbiAgUkVUUllfVElNRV9FWENFRURFRDogJ1JFVFJZX1RJTUVfRVhDRUVERUQnXG59XG5cbmNvbnN0IENSWVRPX0VWRU5UUyA9IHtcbiAgU1RBUlRfREVDUllQVDogJ1NUQVJUX0RFQ1JZUFQnLFxuICBERUNSWVBURUQ6ICdERUNSWVBURUQnXG59XG5cbmNvbnN0IEJST1dTRVJfRVZFTlRTID0ge1xuICBWSVNJQklMSVRZX0NIQU5HRTogJ1ZJU0lCSUxJVFlfQ0hBTkdFJ1xufVxuXG5jb25zdCBBTExFVkVOVFMgPSBPYmplY3QuYXNzaWduKHt9LCBMT0FERVJfRVZFTlRTLCBERU1VWF9FVkVOVFMsIFJFTVVYX0VWRU5UUywgTVNFX0VWRU5UUywgSExTX0VWRU5UUywgQlJPV1NFUl9FVkVOVFMpXG5cbmNvbnN0IEZsdkFsbG93ZWRFdmVudHMgPSBbXVxuY29uc3QgSGxzQWxsb3dlZEV2ZW50cyA9IFtdXG5cbmZvciAobGV0IGtleSBpbiBBTExFVkVOVFMpIHtcbiAgaWYgKEFMTEVWRU5UUy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgRmx2QWxsb3dlZEV2ZW50cy5wdXNoKEFMTEVWRU5UU1trZXldKVxuICB9XG59XG5cbmZvciAobGV0IGtleSBpbiBBTExFVkVOVFMpIHtcbiAgaWYgKEFMTEVWRU5UUy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgSGxzQWxsb3dlZEV2ZW50cy5wdXNoKEFMTEVWRU5UU1trZXldKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgQUxMRVZFTlRTLFxuICBITFNfRVZFTlRTLFxuICBSRU1VWF9FVkVOVFMsXG4gIERFTVVYX0VWRU5UUyxcbiAgTVNFX0VWRU5UUyxcbiAgTE9BREVSX0VWRU5UUyxcbiAgRmx2QWxsb3dlZEV2ZW50cyxcbiAgSGxzQWxsb3dlZEV2ZW50cyxcbiAgQ1JZVE9fRVZFTlRTLFxuICBCUk9XU0VSX0VWRU5UU1xufTtcbiIsImV4cG9ydCBjb25zdCBDT05URVhUX0NPTU9NQU5EUyA9IHtcbiAgT046ICdvbicsXG4gIE9OQ0U6ICdvbmNlJyxcbiAgT0ZGOiAnb2ZmJyxcbiAgRU1JVDogJ2VtaXQnLFxuICBERVNUUk9ZOiAnZGVzdHJveSdcbn1cbiIsImltcG9ydCBNZWRpYUluZm8gZnJvbSAnLi9tb2RlbHMvbWVkaWEtaW5mbydcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2V2ZW50cydcblxuY29uc3QgRElSRUNUX0VNSVRfRkxBRyA9ICdfX1RPX18nXG5cbmNsYXNzIENvbnRleHQge1xuICBjb25zdHJ1Y3RvciAoYWxsb3dlZEV2ZW50cyA9IFtdKSB7XG4gICAgdGhpcy5fZW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuICAgIHRoaXMuX2luc3RhbmNlTWFwID0ge30gLy8g5omA5pyJ55qE6Kej56CB5rWB56iL5a6e5L6LXG4gICAgdGhpcy5fY2xzTWFwID0ge30gLy8g5p6E6YCg5Ye95pWw55qEbWFwXG4gICAgdGhpcy5faW5pdGVkID0gZmFsc2VcbiAgICB0aGlzLm1lZGlhSW5mbyA9IG5ldyBNZWRpYUluZm8oKVxuICAgIHRoaXMuYWxsb3dlZEV2ZW50cyA9IGFsbG93ZWRFdmVudHNcbiAgICB0aGlzLl9ob29rcyA9IHt9IC8vIOazqOWGjOWcqOS6i+S7tuWJjS/lkI7nmoTpkqnlrZDvvIzkvovlpoIgYmVmb3JlKCdERU1VWF9DT01QTEVURScpXG4gIH1cblxuICAvKipcbiAgICog5LuO5LiK5LiL5paH5Lit6I635Y+W6Kej56CB5rWB56iL5a6e5L6L77yM5aaC5p6c5rKh5pyJ5a6e5L6L77yM5p6E6YCg5LiA5LiqXG4gICAqIEBwYXJhbSB0YWdcbiAgICogQHBhcmFtIGFyZ3NcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXRJbnN0YW5jZSAodGFnKSB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLl9pbnN0YW5jZU1hcFt0YWddXG4gICAgaWYgKGluc3RhbmNlKSB7XG4gICAgICByZXR1cm4gaW5zdGFuY2VcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdGhyb3cgbmV3IEVycm9yKGAke3RhZ33lrp7kvovlsJrmnKrliJ3lp4vljJZgKVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog5Yid5aeL5YyW5YW35L2T5a6e5L6LXG4gICAqIEBwYXJhbSB0YWdcbiAgICogQHBhcmFtIGFyZ3NcbiAgICovXG4gIGluaXRJbnN0YW5jZSAodGFnLCAuLi5hcmdzKSB7XG4gICAgaWYgKHRoaXMuX2Nsc01hcFt0YWddKSB7XG4gICAgICBjb25zdCBuZXdJbnN0YW5jZSA9IG5ldyB0aGlzLl9jbHNNYXBbdGFnXSguLi5hcmdzKVxuICAgICAgdGhpcy5faW5zdGFuY2VNYXBbdGFnXSA9IG5ld0luc3RhbmNlXG4gICAgICBpZiAobmV3SW5zdGFuY2UuaW5pdCkge1xuICAgICAgICBuZXdJbnN0YW5jZS5pbml0KCkgLy8gVE9ETzogbGlmZWNpcmNsZVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5ld0luc3RhbmNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHt0YWd95pyq5ZyoY29udGV4dOS4reazqOWGjGApXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOmBv+WFjeWkp+mHj+eahGluaXRJbnN0YW5jZeiwg+eUqO+8jOWIneWni+WMluaJgOacieeahOe7hOS7tlxuICAgKiBAcGFyYW0gY29uZmlnXG4gICAqL1xuICBpbml0IChjb25maWcpIHtcbiAgICBpZiAodGhpcy5faW5pdGVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgZm9yIChsZXQgdGFnIGluIHRoaXMuX2Nsc01hcCkge1xuICAgICAgLy8gaWYgbm90IGluaXRlZCwgaW5pdCBhbiBpbnN0YW5jZVxuICAgICAgaWYgKHRoaXMuX2Nsc01hcC5oYXNPd25Qcm9wZXJ0eSh0YWcpICYmICF0aGlzLl9pbnN0YW5jZU1hcFt0YWddKSB7XG4gICAgICAgIHRoaXMuaW5pdEluc3RhbmNlKHRhZywgY29uZmlnKVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9pbml0ZWQgPSB0cnVlXG4gIH1cblxuICAvKipcbiAgICog5rOo5YaM5LiA5Liq5LiK5LiL5paH5rWB56iL77yM5o+Q5L6b5a6J5YWo55qE5LqL5Lu25Y+R6YCB5py65Yi2XG4gICAqIEBwYXJhbSB0YWdcbiAgICogQHBhcmFtIGNsc1xuICAgKi9cbiAgcmVnaXN0cnkgKHRhZywgY2xzKSB7XG4gICAgY29uc3QgZW1pdHRlciA9IHRoaXMuX2VtaXR0ZXJcbiAgICBjb25zdCBjaGVja01lc3NhZ2VOYW1lID0gdGhpcy5faXNNZXNzYWdlTmFtZVZhbGlkLmJpbmQodGhpcylcbiAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgIGNvbnN0IGVuaGFuY2VkID0gY2xhc3MgZXh0ZW5kcyBjbHMge1xuICAgICAgY29uc3RydWN0b3IgKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncylcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSB7fVxuICAgICAgICB0aGlzLm9uY2VMaXN0ZW5lcnMgPSB7fVxuICAgICAgICB0aGlzLlRBRyA9IHRhZ1xuICAgICAgICB0aGlzLl9jb250ZXh0ID0gc2VsZlxuICAgICAgfVxuXG4gICAgICBvbiAobWVzc2FnZU5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNoZWNrTWVzc2FnZU5hbWUobWVzc2FnZU5hbWUpXG5cbiAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJzW21lc3NhZ2VOYW1lXSkge1xuICAgICAgICAgIHRoaXMubGlzdGVuZXJzW21lc3NhZ2VOYW1lXS5wdXNoKGNhbGxiYWNrKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubGlzdGVuZXJzW21lc3NhZ2VOYW1lXSA9IFtjYWxsYmFja11cbiAgICAgICAgfVxuXG4gICAgICAgIGVtaXR0ZXIub24oYCR7bWVzc2FnZU5hbWV9JHtESVJFQ1RfRU1JVF9GTEFHfSR7dGFnfWAsIGNhbGxiYWNrKSAvLyDlu7rnq4vlrprlkJHpgJrkv6Hnm5HlkKxcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXIub24obWVzc2FnZU5hbWUsIGNhbGxiYWNrKVxuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIOWcqOafkOS4quS6i+S7tuinpuWPkeWJjeaJp+ihjFxuICAgICAgICogQHBhcmFtIG1lc3NhZ2VOYW1lXG4gICAgICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICAgICAqL1xuICAgICAgYmVmb3JlIChtZXNzYWdlTmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgY2hlY2tNZXNzYWdlTmFtZShtZXNzYWdlTmFtZSlcbiAgICAgICAgaWYgKHNlbGYuX2hvb2tzW21lc3NhZ2VOYW1lXSkge1xuICAgICAgICAgIHNlbGYuX2hvb2tzW21lc3NhZ2VOYW1lXS5wdXNoKGNhbGxiYWNrKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGYuX2hvb2tzW21lc3NhZ2VOYW1lXSA9IFtjYWxsYmFja11cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBvbmNlIChtZXNzYWdlTmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgY2hlY2tNZXNzYWdlTmFtZShtZXNzYWdlTmFtZSlcblxuICAgICAgICBpZiAodGhpcy5vbmNlTGlzdGVuZXJzW21lc3NhZ2VOYW1lXSkge1xuICAgICAgICAgIHRoaXMub25jZUxpc3RlbmVyc1ttZXNzYWdlTmFtZV0ucHVzaChjYWxsYmFjaylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm9uY2VMaXN0ZW5lcnNbbWVzc2FnZU5hbWVdID0gW2NhbGxiYWNrXVxuICAgICAgICB9XG5cbiAgICAgICAgZW1pdHRlci5vbmNlKGAke21lc3NhZ2VOYW1lfSR7RElSRUNUX0VNSVRfRkxBR30ke3RhZ31gLCBjYWxsYmFjaylcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXIub25jZShtZXNzYWdlTmFtZSwgY2FsbGJhY2spXG4gICAgICB9XG5cbiAgICAgIGVtaXQgKG1lc3NhZ2VOYW1lLCAuLi5hcmdzKSB7XG4gICAgICAgIGNoZWNrTWVzc2FnZU5hbWUobWVzc2FnZU5hbWUpXG5cbiAgICAgICAgY29uc3QgYmVmb3JlTGlzdCA9IHNlbGYuX2hvb2tzID8gc2VsZi5faG9va3NbbWVzc2FnZU5hbWVdIDogbnVsbFxuXG4gICAgICAgIGlmIChiZWZvcmVMaXN0KSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGJlZm9yZUxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrID0gYmVmb3JlTGlzdFtpXVxuICAgICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZW1pdHRlci5lbWl0KG1lc3NhZ2VOYW1lLCAuLi5hcmdzKVxuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIOWumuWQkeWPkemAgee7meafkOS4que7hOS7tuWNleS+i+eahOa2iOaBr1xuICAgICAgICogQHBhcmFtIG1lc3NhZ2VOYW1lXG4gICAgICAgKiBAcGFyYW0gYXJnc1xuICAgICAgICovXG4gICAgICBlbWl0VG8gKHRhZywgbWVzc2FnZU5hbWUsIC4uLmFyZ3MpIHtcbiAgICAgICAgY2hlY2tNZXNzYWdlTmFtZShtZXNzYWdlTmFtZSlcblxuICAgICAgICByZXR1cm4gZW1pdHRlci5lbWl0KGAke21lc3NhZ2VOYW1lfSR7RElSRUNUX0VNSVRfRkxBR30ke3RhZ31gLCAuLi5hcmdzKVxuICAgICAgfVxuXG4gICAgICBvZmYgKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaykge1xuICAgICAgICBjaGVja01lc3NhZ2VOYW1lKG1lc3NhZ2VOYW1lKVxuICAgICAgICByZXR1cm4gZW1pdHRlci5vZmYobWVzc2FnZU5hbWUsIGNhbGxiYWNrKVxuICAgICAgfVxuXG4gICAgICByZW1vdmVMaXN0ZW5lcnMgKCkge1xuICAgICAgICBjb25zdCBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmJpbmQodGhpcy5saXN0ZW5lcnMpXG5cbiAgICAgICAgZm9yIChsZXQgbWVzc2FnZU5hbWUgaW4gdGhpcy5saXN0ZW5lcnMpIHtcbiAgICAgICAgICBpZiAoaGFzT3duKG1lc3NhZ2VOYW1lKSkge1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5saXN0ZW5lcnNbbWVzc2FnZU5hbWVdIHx8IFtdXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IGNhbGxiYWNrc1tpXVxuICAgICAgICAgICAgICBlbWl0dGVyLm9mZihtZXNzYWdlTmFtZSwgY2FsbGJhY2spXG4gICAgICAgICAgICAgIGVtaXR0ZXIub2ZmKGAke21lc3NhZ2VOYW1lfSR7RElSRUNUX0VNSVRfRkxBR30ke3RhZ31gLCBjYWxsYmFjaylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBtZXNzYWdlTmFtZSBpbiB0aGlzLm9uY2VMaXN0ZW5lcnMpIHtcbiAgICAgICAgICBpZiAoaGFzT3duKG1lc3NhZ2VOYW1lKSkge1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5vbmNlTGlzdGVuZXJzW21lc3NhZ2VOYW1lXSB8fCBbXVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSBjYWxsYmFja3NbaV1cbiAgICAgICAgICAgICAgZW1pdHRlci5vZmYobWVzc2FnZU5hbWUsIGNhbGxiYWNrKVxuICAgICAgICAgICAgICBlbWl0dGVyLm9mZihgJHttZXNzYWdlTmFtZX0ke0RJUkVDVF9FTUlUX0ZMQUd9JHt0YWd9YCwgY2FsbGJhY2spXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICog5Zyo57uE5Lu26ZSA5q+B5pe277yM6buY6K6k5bCG5a6D5rOo5YaM55qE5LqL5Lu25YWo6YOo5Y246L2977yM56Gu5L+d5LiN5Lya6YCg5oiQ5YaF5a2Y5rOE5ryPXG4gICAgICAgKi9cbiAgICAgIGRlc3Ryb3kgKCkge1xuICAgICAgICAvLyBzdGVwMSB1bmxpc3RlbiBldmVudHNcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcnMoKVxuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHt9XG5cbiAgICAgICAgLy8gc3RlcDIgcmVsZWFzZSBmcm9tIGNvbnRleHRcbiAgICAgICAgZGVsZXRlIHNlbGYuX2luc3RhbmNlTWFwW3RhZ11cbiAgICAgICAgaWYgKHN1cGVyLmRlc3Ryb3kpIHtcbiAgICAgICAgICByZXR1cm4gc3VwZXIuZGVzdHJveSgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fY2xzTWFwW3RhZ10gPSBlbmhhbmNlZFxuXG4gICAgLyoqXG4gICAgICogZ2V0IGluc3RhbmNlIGltbWVkaWF0ZWx5XG4gICAgICogZS5nIGNvbnN0IGluc3RhbmNlID0gY29udGV4dC5yZWdpc3RyeSh0YWcsIENscykoY29uZmlnKVxuICAgICAqICovXG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5pbml0SW5zdGFuY2UodGFnLCAuLi5hcmdzKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDlr7nlrZjlnKjnmoTlrp7kvovov5vooYxcbiAgICovXG4gIGRlc3Ryb3lJbnN0YW5jZXMgKCkge1xuICAgIE9iamVjdC5rZXlzKHRoaXMuX2luc3RhbmNlTWFwKS5mb3JFYWNoKCh0YWcpID0+IHtcbiAgICAgIGlmICh0aGlzLl9pbnN0YW5jZU1hcFt0YWddLmRlc3Ryb3kpIHtcbiAgICAgICAgdGhpcy5faW5zdGFuY2VNYXBbdGFnXS5kZXN0cm95KClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIOe8luino+eggea1geeoi+aXoOmcgOWFs+azqOS6i+S7tueahOino+e7kVxuICAgKi9cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5fZW1pdHRlciA9IG51bGxcbiAgICB0aGlzLmFsbG93ZWRFdmVudHMgPSBbXVxuICAgIHRoaXMuX2Nsc01hcCA9IG51bGxcbiAgICB0aGlzLl9jb250ZXh0ID0gbnVsbFxuICAgIHRoaXMuX2hvb2tzID0gbnVsbFxuICAgIHRoaXMuZGVzdHJveUluc3RhbmNlcygpXG4gIH1cblxuICAvKipcbiAgICog5a+55L+h6YGT6L+b6KGM5pS25ouiXG4gICAqIEBwYXJhbSBtZXNzYWdlTmFtZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2lzTWVzc2FnZU5hbWVWYWxpZCAobWVzc2FnZU5hbWUpIHtcbiAgICBpZiAoIXRoaXMuYWxsb3dlZEV2ZW50cy5pbmRleE9mKG1lc3NhZ2VOYW1lKSA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5yZWdpc3RlcmVkIG1lc3NhZ2UgbmFtZTogJHttZXNzYWdlTmFtZX1gKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb250ZXh0XG4iLCJpbXBvcnQgRVZFTlRTIGZyb20gJy4uL2NvbnN0YW50cy9ldmVudHMnO1xuY29uc3QgQ1JZVE9fRVZFTlRTID0gRVZFTlRTLkNSWVRPX0VWRU5UU1xuY2xhc3MgQ3J5cHRvIHtcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgdGhpcy5pbnB1dEJ1ZmZlciA9IGNvbmZpZy5pbnB1dGJ1ZmZlcjtcbiAgICAgICAgdGhpcy5vdXRwdXRCdWZmZXIgPSBjb25maWcub3V0cHV0YnVmZmVyO1xuICAgICAgICB0aGlzLmtleSA9IGNvbmZpZy5rZXk7XG4gICAgICAgIHRoaXMuaXYgPSBjb25maWcuaXY7XG4gICAgICAgIHRoaXMubWV0aG9kID0gY29uZmlnLm1ldGhvZDtcblxuICAgICAgICB0aGlzLmNyeXB0byA9ICB3aW5kb3cuY3J5cHRvIHx8IHdpbmRvdy5tc0NyeXB0b1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMub24oQ1JZVE9fRVZFTlRTLlNUQVJUX0RFQ1JZUFQsIHRoaXMuZGVjcmlwdC5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgXG4gICAgZGVjcmlwdCgpIHtcbiAgICAgICAgaWYoIXRoaXMuYWVza2V5KSB7XG4gICAgICAgICAgICBsZXQgc2JrZXkgPSB0aGlzLmNyeXB0by5zdWJ0bGUuaW1wb3J0S2V5KCdyYXcnLCB0aGlzLmtleS5idWZmZXIsIHsgbmFtZTogJ0FFUy1DQkMnIH0sIGZhbHNlLCBbJ2VuY3J5cHQnLCAnZGVjcnlwdCddKTtcbiAgICAgICAgICAgIHNia2V5LnRoZW4oa2V5ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFlc2tleSA9IGtleTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlY3JpcHREYXRhKCk7XG4gICAgICAgICAgICB9KSBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGVjcmlwdERhdGEoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlY3JpcHREYXRhKCkge1xuICAgICAgICBsZXQgaW5wdXRidWZmZXIgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKHRoaXMuaW5wdXRCdWZmZXIpO1xuICAgICAgICBsZXQgb3V0cHV0YnVmZmVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSh0aGlzLm91dHB1dEJ1ZmZlcik7XG4gICAgICAgIGxldCBkYXRhID0gaW5wdXRidWZmZXIuc2hpZnQoKTtcbiAgICAgICAgaWYoZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5jcnlwdG8uc3VidGxlLmRlY3J5cHQoeyBuYW1lOiAnQUVTLUNCQycsIGl2OiB0aGlzLml2LmJ1ZmZlciB9LCB0aGlzLmFlc2tleSwgZGF0YSkudGhlbihyZXM9PntcbiAgICAgICAgICAgICAgICBvdXRwdXRidWZmZXIucHVzaChuZXcgVWludDhBcnJheShyZXMpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoQ1JZVE9fRVZFTlRTLkRFQ1JZUFRFRCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWNyaXB0RGF0YShkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQ3J5cHRvOyIsImltcG9ydCBFdmVudHMgZnJvbSAnLi4vY29uc3RhbnRzL2V2ZW50cydcbmNvbnN0IEJST1dTRVJfRVZFTlRTID0gRXZlbnRzLkJST1dTRVJfRVZFTlRTXG5cbmxldCBoaWRkZW47XG5sZXQgdmlzaWJpbGl0eUNoYW5nZTtcbmlmICh0eXBlb2YgZG9jdW1lbnQuaGlkZGVuICE9PSAndW5kZWZpbmVkJykgeyAvLyBPcGVyYSAxMi4xMCBhbmQgRmlyZWZveCAxOCBhbmQgbGF0ZXIgc3VwcG9ydFxuICBoaWRkZW4gPSAnaGlkZGVuJztcbiAgdmlzaWJpbGl0eUNoYW5nZSA9ICd2aXNpYmlsaXR5Y2hhbmdlJztcbn0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50Lm1zSGlkZGVuICE9PSAndW5kZWZpbmVkJykge1xuICBoaWRkZW4gPSAnbXNIaWRkZW4nO1xuICB2aXNpYmlsaXR5Q2hhbmdlID0gJ21zdmlzaWJpbGl0eWNoYW5nZSc7XG59IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudC53ZWJraXRIaWRkZW4gIT09ICd1bmRlZmluZWQnKSB7XG4gIGhpZGRlbiA9ICd3ZWJraXRIaWRkZW4nO1xuICB2aXNpYmlsaXR5Q2hhbmdlID0gJ3dlYmtpdHZpc2liaWxpdHljaGFuZ2UnO1xufVxuXG5jbGFzcyBQYWdlVmlzaWJpbGl0eSB7XG5cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuY2FsbGJhY2tzID0ge1xuICAgICAgb25TaG93OiBbXSxcbiAgICAgIG9uSGlkZGVuOiBbXVxuICAgIH1cbiAgICB0aGlzLmhhbmRsZVZpc2liaWxpdHlDaGFuZ2UgPSB0aGlzLmhhbmRsZVZpc2liaWxpdHlDaGFuZ2UuYmluZCh0aGlzKVxuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih2aXNpYmlsaXR5Q2hhbmdlLCB0aGlzLmhhbmRsZVZpc2liaWxpdHlDaGFuZ2UsIGZhbHNlKTtcbiAgfVxuXG4gIGhhbmRsZVZpc2liaWxpdHlDaGFuZ2UgKCkge1xuICAgIHRoaXMuZW1pdChCUk9XU0VSX0VWRU5UUy5WSVNJQklMSVRZX0NIQU5HRSwgZG9jdW1lbnRbaGlkZGVuXSlcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodmlzaWJpbGl0eUNoYW5nZSwgdGhpcy5oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2VWaXNpYmlsaXR5O1xuIiwiY29uc3QgbGUgPSAoZnVuY3Rpb24gKCkge1xuICBjb25zdCBidWYgPSBuZXcgQXJyYXlCdWZmZXIoMik7XG4gIChuZXcgRGF0YVZpZXcoYnVmKSkuc2V0SW50MTYoMCwgMjU2LCB0cnVlKSAvLyBsaXR0bGUtZW5kaWFuIHdyaXRlXG4gIHJldHVybiAobmV3IEludDE2QXJyYXkoYnVmKSlbMF0gPT09IDI1NiAvLyBwbGF0Zm9ybS1zcGVjIHJlYWQsIGlmIGVxdWFsIHRoZW4gTEVcbn0pKClcblxuZXhwb3J0IGRlZmF1bHQgbGVcbiIsImNvbnN0IGxlID0gKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgYnVmID0gbmV3IEFycmF5QnVmZmVyKDIpO1xuICAobmV3IERhdGFWaWV3KGJ1ZikpLnNldEludDE2KDAsIDI1NiwgdHJ1ZSkgLy8gbGl0dGxlLWVuZGlhbiB3cml0ZVxuICByZXR1cm4gKG5ldyBJbnQxNkFycmF5KGJ1ZikpWzBdID09PSAyNTYgLy8gcGxhdGZvcm0tc3BlYyByZWFkLCBpZiBlcXVhbCB0aGVuIExFXG59KSgpXG5cbmNvbnN0IHNuaWZmZXIgPSB7XG4gIGdldCBkZXZpY2UgKCkge1xuICAgIGxldCByID0gc25pZmZlci5vcztcbiAgICByZXR1cm4gci5pc1BjID8gJ3BjJyA6IHIuaXNUYWJsZXQgPyAndGFibGV0JyA6ICdtb2JpbGUnO1xuICB9LFxuICBnZXQgYnJvd3NlciAoKSB7XG4gICAgbGV0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xuICAgIGxldCByZWcgPSB7XG4gICAgICBpZTogL3J2OihbXFxkLl0rKVxcKSBsaWtlIGdlY2tvLyxcbiAgICAgIGZpcmZveDogL2ZpcmVmb3hcXC8oW1xcZC5dKykvLFxuICAgICAgY2hyb21lOiAvY2hyb21lXFwvKFtcXGQuXSspLyxcbiAgICAgIG9wZXJhOiAvb3BlcmEuKFtcXGQuXSspLyxcbiAgICAgIHNhZmFyaTogL3ZlcnNpb25cXC8oW1xcZC5dKykuKnNhZmFyaS9cbiAgICB9O1xuICAgIHJldHVybiBbXS5jb25jYXQoT2JqZWN0LmtleXMocmVnKS5maWx0ZXIoa2V5ID0+IHJlZ1trZXldLnRlc3QodWEpKSlbMF07XG4gIH0sXG4gIGdldCBvcyAoKSB7XG4gICAgbGV0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudFxuICAgIGxldCBpc1dpbmRvd3NQaG9uZSA9IC8oPzpXaW5kb3dzIFBob25lKS8udGVzdCh1YSlcbiAgICBsZXQgaXNTeW1iaWFuID0gLyg/OlN5bWJpYW5PUykvLnRlc3QodWEpIHx8IGlzV2luZG93c1Bob25lO1xuICAgIGxldCBpc0FuZHJvaWQgPSAvKD86QW5kcm9pZCkvLnRlc3QodWEpO1xuICAgIGxldCBpc0ZpcmVGb3ggPSAvKD86RmlyZWZveCkvLnRlc3QodWEpO1xuICAgIGxldCBpc1RhYmxldCA9IC8oPzppUGFkfFBsYXlCb29rKS8udGVzdCh1YSkgfHwgKGlzQW5kcm9pZCAmJiAhLyg/Ok1vYmlsZSkvLnRlc3QodWEpKSB8fCAoaXNGaXJlRm94ICYmIC8oPzpUYWJsZXQpLy50ZXN0KHVhKSk7XG4gICAgbGV0IGlzUGhvbmUgPSAvKD86aVBob25lKS8udGVzdCh1YSkgJiYgIWlzVGFibGV0O1xuICAgIGxldCBpc1BjID0gIWlzUGhvbmUgJiYgIWlzQW5kcm9pZCAmJiAhaXNTeW1iaWFuO1xuICAgIHJldHVybiB7XG4gICAgICBpc1RhYmxldCxcbiAgICAgIGlzUGhvbmUsXG4gICAgICBpc0FuZHJvaWQsXG4gICAgICBpc1BjLFxuICAgICAgaXNTeW1iaWFuLFxuICAgICAgaXNXaW5kb3dzUGhvbmUsXG4gICAgICBpc0ZpcmVGb3hcbiAgICB9O1xuICB9LFxuXG4gIGdldCBpc0xlICgpIHtcbiAgICByZXR1cm4gbGVcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgc25pZmZlcjtcbiIsImNsYXNzIFVURjgge1xuICBzdGF0aWMgZGVjb2RlICh1aW50OGFycmF5KSB7XG4gICAgY29uc3Qgb3V0ID0gW107XG4gICAgY29uc3QgaW5wdXQgPSB1aW50OGFycmF5O1xuICAgIGxldCBpID0gMDtcbiAgICBjb25zdCBsZW5ndGggPSB1aW50OGFycmF5Lmxlbmd0aDtcblxuICAgIHdoaWxlIChpIDwgbGVuZ3RoKSB7XG4gICAgICBpZiAoaW5wdXRbaV0gPCAweDgwKSB7XG4gICAgICAgIG91dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoaW5wdXRbaV0pKTtcbiAgICAgICAgKytpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH0gZWxzZSBpZiAoaW5wdXRbaV0gPCAweEMwKSB7XG4gICAgICAgIC8vIGZhbGx0aHJvdWdoXG4gICAgICB9IGVsc2UgaWYgKGlucHV0W2ldIDwgMHhFMCkge1xuICAgICAgICBpZiAoVVRGOC5fY2hlY2tDb250aW51YXRpb24oaW5wdXQsIGksIDEpKSB7XG4gICAgICAgICAgY29uc3QgdWNzNCA9IChpbnB1dFtpXSAmIDB4MUYpIDw8IDYgfCAoaW5wdXRbaSArIDFdICYgMHgzRik7XG4gICAgICAgICAgaWYgKHVjczQgPj0gMHg4MCkge1xuICAgICAgICAgICAgb3V0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSh1Y3M0ICYgMHhGRkZGKSk7XG4gICAgICAgICAgICBpICs9IDI7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaW5wdXRbaV0gPCAweEYwKSB7XG4gICAgICAgIGlmIChVVEY4Ll9jaGVja0NvbnRpbnVhdGlvbihpbnB1dCwgaSwgMikpIHtcbiAgICAgICAgICBjb25zdCB1Y3M0ID0gKGlucHV0W2ldICYgMHhGKSA8PCAxMiB8IChpbnB1dFtpICsgMV0gJiAweDNGKSA8PCA2IHwgaW5wdXRbaSArIDJdICYgMHgzRjtcbiAgICAgICAgICBpZiAodWNzNCA+PSAweDgwMCAmJiAodWNzNCAmIDB4RjgwMCkgIT09IDB4RDgwMCkge1xuICAgICAgICAgICAgb3V0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSh1Y3M0ICYgMHhGRkZGKSk7XG4gICAgICAgICAgICBpICs9IDM7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaW5wdXRbaV0gPCAweEY4KSB7XG4gICAgICAgIGlmIChVVEY4Ll9jaGVja0NvbnRpbnVhdGlvbihpbnB1dCwgaSwgMykpIHtcbiAgICAgICAgICBsZXQgdWNzNCA9IChpbnB1dFtpXSAmIDB4NykgPDwgMTggfCAoaW5wdXRbaSArIDFdICYgMHgzRikgPDwgMTIgfFxuICAgICAgICAgICAgICAgICAgICAoaW5wdXRbaSArIDJdICYgMHgzRikgPDwgNiB8IChpbnB1dFtpICsgM10gJiAweDNGKTtcbiAgICAgICAgICBpZiAodWNzNCA+IDB4MTAwMDAgJiYgdWNzNCA8IDB4MTEwMDAwKSB7XG4gICAgICAgICAgICB1Y3M0IC09IDB4MTAwMDA7XG4gICAgICAgICAgICBvdXQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKCh1Y3M0ID4+PiAxMCkgfCAweEQ4MDApKTtcbiAgICAgICAgICAgIG91dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoKHVjczQgJiAweDNGRikgfCAweERDMDApKTtcbiAgICAgICAgICAgIGkgKz0gNDtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgb3V0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgweEZGRkQpKTtcbiAgICAgICsraTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0LmpvaW4oJycpO1xuICB9XG5cbiAgc3RhdGljIF9jaGVja0NvbnRpbnVhdGlvbiAodWludDhhcnJheSwgc3RhcnQsIGNoZWNrTGVuZ3RoKSB7XG4gICAgbGV0IGFycmF5ID0gdWludDhhcnJheTtcbiAgICBpZiAoc3RhcnQgKyBjaGVja0xlbmd0aCA8IGFycmF5Lmxlbmd0aCkge1xuICAgICAgd2hpbGUgKGNoZWNrTGVuZ3RoLS0pIHtcbiAgICAgICAgaWYgKChhcnJheVsrK3N0YXJ0XSAmIDB4QzApICE9PSAweDgwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVVEY4O1xuIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICdldmVudHMnXG5jbGFzcyBBdWRpb0N0eCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yIChjb25maWcpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnKTtcbiAgICBsZXQgQXVkaW9Db250ZXh0ID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0O1xuICAgIHRoaXMuY29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcbiAgICB0aGlzLmdhaW5Ob2RlID0gdGhpcy5jb250ZXh0LmNyZWF0ZUdhaW4oKTtcbiAgICB0aGlzLmdhaW5Ob2RlLmNvbm5lY3QodGhpcy5jb250ZXh0LmRlc3RpbmF0aW9uKTtcbiAgICB0aGlzLm1ldGEgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5zYW1wbGVzID0gW107XG4gICAgdGhpcy5wcmVsb2FkVGltZSA9IHRoaXMuY29uZmlnLnByZWxvYWRUaW1lIHx8IDM7XG4gICAgdGhpcy5kdXJhdGlvbiA9IDA7XG5cbiAgICB0aGlzLl9jdXJyZW50QnVmZmVyID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX25leHRCdWZmZXIgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fbGFzdHB0cyA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9wcmVEZWNvZGUgPSBbXTtcbiAgICB0aGlzLl9jdXJyZW50VGltZSA9IDA7XG4gICAgdGhpcy5fZGVjb2RpbmcgPSBmYWxzZTtcbiAgICB0aGlzLl92b2x1bWUgPSB0aGlzLmNvbmZpZy52b2x1bWUgfHwgMC42XG4gICAgLy8g6K6w5b2V5aSW6YOo5Lyg6L6T55qE54q25oCBXG4gICAgdGhpcy5fcGxheWVkID0gZmFsc2U7XG4gICAgdGhpcy5wbGF5RmluaXNoID0gbnVsbDsgLy8gcGVuZGluZyBwbGF5IHRhc2tcbiAgICB0aGlzLndhaXROZXh0SUQgPSBudWxsOyAvLyBhdWRpbyBzb3VyY2UgZW5kIGFuZCBuZXh0IHNvdXJjZSBub3QgbG9hZGVkXG4gIH1cblxuICBnZXQgY3VycmVudFRpbWUgKCkge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50VGltZTtcbiAgfVxuXG4gIGRlY29kZUF1ZGlvIChhdWRpb1RyYWNrKSB7XG4gICAgbGV0IHtzYW1wbGVzfSA9IGF1ZGlvVHJhY2s7XG4gICAgbGV0IGRhdGEgPSBzYW1wbGVzO1xuICAgIGF1ZGlvVHJhY2suc2FtcGxlcyA9IFtdO1xuICAgIHRoaXMuc2V0QXVkaW9EYXRhKGRhdGEpO1xuICB9XG4gIHNldEF1ZGlvRGF0YSAoZGF0YSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgZGF0YVtpXS5wdHMgPSAoZGF0YVtpXS5wdHMgPT09IHVuZGVmaW5lZCkgPyBkYXRhW2ldLmR0cyA6IGRhdGFbaV0ucHRzO1xuICAgICAgdGhpcy5fcHJlRGVjb2RlLnB1c2goZGF0YVtpXSk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9wcmVEZWNvZGUubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKHRoaXMuX2xhc3RwdHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9sYXN0cHRzID0gdGhpcy5fcHJlRGVjb2RlWzBdLnB0cztcbiAgICAgIH1cbiAgICAgIGlmICgodGhpcy5fcHJlRGVjb2RlW3RoaXMuX3ByZURlY29kZS5sZW5ndGggLSAxXS5wdHMgLSB0aGlzLl9sYXN0cHRzKSAvIDEwMDAgPiB0aGlzLnByZWxvYWRUaW1lKSB7XG4gICAgICAgIHRoaXMuZGVjb2RlQUFDKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGVjb2RlQUFDICgpIHtcbiAgICBpZiAodGhpcy5fZGVjb2RpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZGVjb2RpbmcgPSB0cnVlO1xuICAgIGxldCBkYXRhID0gdGhpcy5fcHJlRGVjb2RlO1xuICAgIGxldCBzYW1wbGVzID0gW107XG4gICAgbGV0IF90aGlzID0gdGhpcztcbiAgICBsZXQgc2FtcGxlID0gZGF0YS5zaGlmdCgpO1xuICAgIHdoaWxlIChzYW1wbGUpIHtcbiAgICAgIGxldCBzYW1wbGVEYXRhID0gQXVkaW9DdHguZ2V0QUFDRGF0YSh0aGlzLm1ldGEsIHNhbXBsZSlcbiAgICAgIHNhbXBsZXMucHVzaChzYW1wbGVEYXRhKTtcbiAgICAgIHRoaXMuX2xhc3RwdHMgPSBzYW1wbGUucHRzO1xuICAgICAgc2FtcGxlID0gZGF0YS5zaGlmdCgpXG4gICAgfVxuICAgIGxldCBidWZmZXIgPSBBdWRpb0N0eC5jb21iaWxlRGF0YShzYW1wbGVzKTtcbiAgICB0cnkge1xuICAgICAgdGhpcy5jb250ZXh0LmRlY29kZUF1ZGlvRGF0YShidWZmZXIuYnVmZmVyLCBmdW5jdGlvbiAoYnVmZmVyKSB7XG4gICAgICAgIGxldCBhdWRpb1NvdXJjZSA9IF90aGlzLmNvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgICAgIGF1ZGlvU291cmNlLmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgICAgLy8gYXVkaW9Tb3VyY2Uub25lbmRlZCA9IF90aGlzLm9uU291cmNlRW5kZWQuYmluZChfdGhpcyk7XG4gICAgICAgIF90aGlzLnNhbXBsZXMucHVzaCh7XG4gICAgICAgICAgdGltZTogX3RoaXMuZHVyYXRpb24sXG4gICAgICAgICAgZHVyYXRpb246IGJ1ZmZlci5kdXJhdGlvbixcbiAgICAgICAgICBkYXRhOiBhdWRpb1NvdXJjZVxuICAgICAgICB9KVxuXG4gICAgICAgIF90aGlzLmR1cmF0aW9uICs9IGJ1ZmZlci5kdXJhdGlvbjtcblxuICAgICAgICBpZiAoIV90aGlzLl9jdXJyZW50QnVmZmVyKSB7XG4gICAgICAgICAgX3RoaXMuX2N1cnJlbnRCdWZmZXIgPSBfdGhpcy5nZXRUaW1lQnVmZmVyKF90aGlzLmN1cnJlbnRUaW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghX3RoaXMuX25leHRCdWZmZXIgJiYgX3RoaXMuX2N1cnJlbnRCdWZmZXIpIHtcbiAgICAgICAgICBfdGhpcy5fbmV4dEJ1ZmZlciA9IF90aGlzLmdldFRpbWVCdWZmZXIoX3RoaXMuY3VycmVudFRpbWUgKyBfdGhpcy5fY3VycmVudEJ1ZmZlci5kdXJhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuX2RlY29kaW5nID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKChfdGhpcy5fcHJlRGVjb2RlLmxlbmd0aCA+IDAgJiYgX3RoaXMuX3ByZURlY29kZVtfdGhpcy5fcHJlRGVjb2RlLmxlbmd0aCAtIDFdLnB0cyAtIF90aGlzLl9sYXN0cHRzKSAvIDEwMDAgPj0gX3RoaXMucHJlbG9hZFRpbWUpIHtcbiAgICAgICAgICBfdGhpcy5kZWNvZGVBQUMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfdGhpcy5wbGF5RmluaXNoKSB7XG4gICAgICAgICAgX3RoaXMucGxheUZpbmlzaCgpXG4gICAgICAgIH1cbiAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSlcbiAgICAgIH0pXG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfVxuICB9XG5cbiAgb25Tb3VyY2VFbmRlZCAoKSB7XG4gICAgaWYgKCF0aGlzLl9uZXh0QnVmZmVyIHx8ICF0aGlzLl9wbGF5ZWQpIHtcbiAgICAgIHRoaXMud2FpdE5leHRJRCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLm9uU291cmNlRW5kZWQoKTtcbiAgICAgIH0sIDIwMCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBhdWRpb1NvdXJjZSA9IHRoaXMuX25leHRCdWZmZXIuZGF0YTtcbiAgICBhdWRpb1NvdXJjZS5zdGFydCgpO1xuICAgIGF1ZGlvU291cmNlLmNvbm5lY3QodGhpcy5nYWluTm9kZSk7XG4gICAgbGV0IF90aGlzID0gdGhpcztcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIF90aGlzLm9uU291cmNlRW5kZWQuY2FsbCh0aGlzKTtcbiAgICB9LCBhdWRpb1NvdXJjZS5idWZmZXIuZHVyYXRpb24gKiAxMDAwIC0gMTApO1xuICAgIHRoaXMuX2N1cnJlbnRCdWZmZXIgPSB0aGlzLl9uZXh0QnVmZmVyO1xuICAgIHRoaXMuX2N1cnJlbnRUaW1lID0gdGhpcy5fY3VycmVudEJ1ZmZlci50aW1lO1xuICAgIHRoaXMuX25leHRCdWZmZXIgPSB0aGlzLmdldFRpbWVCdWZmZXIodGhpcy5jdXJyZW50VGltZSk7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRCdWZmZXIpIHtcbiAgICAgIHRoaXMuX25leHRCdWZmZXIgPSB0aGlzLmdldFRpbWVCdWZmZXIodGhpcy5jdXJyZW50VGltZSArIHRoaXMuX2N1cnJlbnRCdWZmZXIuZHVyYXRpb24pO1xuICAgIH1cbiAgICB0aGlzLmVtaXQoJ0FVRElPX1NPVVJDRV9FTkQnKVxuICB9XG5cbiAgcGxheSAoKSB7XG4gICAgaWYgKHRoaXMucGxheUZpbmlzaCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9wbGF5ZWQgPSB0cnVlO1xuICAgIGlmICh0aGlzLmNvbnRleHQuc3RhdGUgPT09ICdzdXNwZW5kZWQnKSB7XG4gICAgICB0aGlzLmNvbnRleHQucmVzdW1lKClcbiAgICB9XG4gICAgbGV0IF90aGlzID0gdGhpcztcbiAgICBjb25zdCBwbGF5U3RhcnQgPSAoKSA9PiB7XG4gICAgICBsZXQgYXVkaW9Tb3VyY2UgPSB0aGlzLl9jdXJyZW50QnVmZmVyLmRhdGE7XG4gICAgICBhdWRpb1NvdXJjZS5jb25uZWN0KHRoaXMuZ2Fpbk5vZGUpO1xuICAgICAgYXVkaW9Tb3VyY2Uuc3RhcnQoKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBfdGhpcy5vblNvdXJjZUVuZGVkLmNhbGwodGhpcyk7XG4gICAgICB9LCBhdWRpb1NvdXJjZS5idWZmZXIuZHVyYXRpb24gKiAxMDAwIC0gMTApO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fY3VycmVudEJ1ZmZlcikge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIHRoaXMucGxheUZpbmlzaCA9IHJlc29sdmU7XG4gICAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5wbGF5RmluaXNoID0gbnVsbDtcbiAgICAgICAgcGxheVN0YXJ0KClcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBwbGF5U3RhcnQoKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgIH1cbiAgfVxuXG4gIHBhdXNlICgpIHtcbiAgICBjb25zdCBhdWRpb0N0eCA9IHRoaXMuY29udGV4dDtcbiAgICBpZiAoYXVkaW9DdHguc3RhdGUgPT09ICdydW5uaW5nJykge1xuICAgICAgYXVkaW9DdHguc3VzcGVuZCgpXG4gICAgfVxuICB9XG5cbiAgZ2V0VGltZUJ1ZmZlciAodGltZSkge1xuICAgIGxldCByZXQ7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNhbXBsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBzYW1wbGUgPSB0aGlzLnNhbXBsZXNbaV1cbiAgICAgIGlmIChzYW1wbGUudGltZSA8PSB0aW1lICYmIChzYW1wbGUudGltZSArIHNhbXBsZS5kdXJhdGlvbikgPiB0aW1lKSB7XG4gICAgICAgIHJldCA9IHNhbXBsZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBzZXRBdWRpb01ldGFEYXRhIChtZXRhKSB7XG4gICAgdGhpcy5tZXRhID0gbWV0YTtcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIGlmICh0aGlzLndhaXROZXh0SUQpIHtcbiAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy53YWl0TmV4dElEKVxuICAgIH1cbiAgICB0aGlzLmNvbnRleHQuY2xvc2UoKTtcbiAgfVxuXG4gIHNldCBtdXRlZCAodmFsKSB7XG4gICAgaWYgKHZhbCkge1xuICAgICAgdGhpcy5nYWluTm9kZS5nYWluLnZhbHVlID0gMFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdhaW5Ob2RlLmdhaW4udmFsdWUgPSB0aGlzLl92b2x1bWVcbiAgICB9XG4gIH1cblxuICBnZXQgdm9sdW1lICgpIHtcbiAgICByZXR1cm4gdGhpcy5fdm9sdW1lXG4gIH1cblxuICBzZXQgdm9sdW1lICh2YWwpIHtcbiAgICBpZiAodmFsIDwgMCkge1xuICAgICAgdGhpcy5fdm9sdW1lID0gMDtcbiAgICAgIHRoaXMuZ2Fpbk5vZGUuZ2Fpbi52YWx1ZSA9IDBcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHZhbCA+IDEpIHtcbiAgICAgIHRoaXMuX3ZvbHVtZSA9IDE7XG4gICAgICB0aGlzLmdhaW5Ob2RlLmdhaW4udmFsdWUgPSAxXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fdm9sdW1lID0gdmFsO1xuICAgIHRoaXMuZ2Fpbk5vZGUuZ2Fpbi52YWx1ZSA9IHZhbFxuICB9XG5cbiAgc3RhdGljIGdldEFBQ0RhdGEgKG1ldGEsIHNhbXBsZSkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgVWludDhBcnJheShzYW1wbGUuZGF0YS5ieXRlTGVuZ3RoICsgNyk7XG4gICAgbGV0IGFkdHMgPSBBdWRpb0N0eC5nZXRBZHRzKG1ldGEsIHNhbXBsZS5kYXRhKTtcbiAgICBidWZmZXIuc2V0KGFkdHMpO1xuICAgIGJ1ZmZlci5zZXQoc2FtcGxlLmRhdGEsIDcpO1xuICAgIHJldHVybiBidWZmZXI7XG4gIH1cblxuICBzdGF0aWMgY29tYmlsZURhdGEgKHNhbXBsZXMpIHtcbiAgICAvLyBnZXQgbGVuZ3RoXG4gICAgbGV0IGxlbmd0aCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDAsIGsgPSBzYW1wbGVzLmxlbmd0aDsgaSA8IGs7IGkrKykge1xuICAgICAgbGVuZ3RoICs9IHNhbXBsZXNbaV0uYnl0ZUxlbmd0aDtcbiAgICB9XG5cbiAgICBsZXQgcmV0ID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKTtcbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICAvLyBjb21iaWxlIGRhdGE7XG4gICAgZm9yIChsZXQgaSA9IDAsIGsgPSBzYW1wbGVzLmxlbmd0aDsgaSA8IGs7IGkrKykge1xuICAgICAgcmV0LnNldChzYW1wbGVzW2ldLCBvZmZzZXQpO1xuICAgICAgb2Zmc2V0ICs9IHNhbXBsZXNbaV0uYnl0ZUxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIHN0YXRpYyBnZXRBZHRzIChtZXRhLCBkYXRhKSB7XG4gICAgbGV0IGFkdHMgPSBuZXcgVWludDhBcnJheSg3KTtcblxuICAgIC8vIOiuvue9ruWQjOatpeS9jSAweGZmZiAxMmJpdFxuICAgIGFkdHNbMF0gPSAweGZmO1xuICAgIGFkdHNbMV0gPSAweGYwO1xuXG4gICAgLy8gT2JqZWN0IGRhdGEgKOayoeS7gOS5iOS6uueUqE1QRUctMuS6hu+8jEhMU+WSjEZMVuS5n+WFqOaYr01QRUctNO+8jOi/memHjOebtOaOpTApICAxYml0XG4gICAgLy8gTGV2ZWwgYWx3YXlzIDAwIDJiaXRcbiAgICAvLyBDUkMgYWx3YXlzIDEgMWJpdFxuICAgIGFkdHNbMV0gPSBhZHRzWzFdIHwgMHgwMTtcblxuICAgIC8vIHByb2ZpbGUgMmJpdFxuICAgIGFkdHNbMl0gPSAweGMwICYgKChtZXRhLm9iamVjdFR5cGUgLSAxKSA8PCA2KTtcblxuICAgIC8vIHNhbXBsZUZyZXF1ZW5jeUluZGV4XG4gICAgYWR0c1syXSA9IGFkdHNbMl0gfCAoMHgzYyAmIChtZXRhLnNhbXBsZVJhdGVJbmRleCA8PCAyKSlcblxuICAgIC8vIHByaXZhdGUgYml0IDAgMWJpdFxuICAgIC8vIGNoYW5lbCBjb25maWd1cmF0aW9uIDNiaXRcbiAgICBhZHRzWzJdID0gYWR0c1syXSB8ICgweDAxICYgbWV0YS5jaGFubmVsQ291bnQgPj4gMik7XG4gICAgYWR0c1szXSA9IDB4YzAgJiAobWV0YS5jaGFubmVsQ291bnQgPDwgNik7XG5cbiAgICAvLyBvcmlnaW5hbF9jb3B5OiAwIDFiaXRcbiAgICAvLyBob21lOiAwIDFiaXRcblxuICAgIC8vIGFkdHNfdmFyaWFibGVfaGVhZGVyKClcbiAgICAvLyBjb3B5cmlnaHRlZF9pZF9iaXQgMCAxYml0XG4gICAgLy8gY29weXJpZ2h0ZWRfaWRfc3RhcnQgMCAxYml0XG5cbiAgICAvLyBhYWNfZnJhbWVfbGVuZ3RoIDEzYml0O1xuICAgIGxldCBhYWNmcmFtZWxlbmd0aCA9IGRhdGEuYnl0ZUxlbmd0aCArIDc7XG5cbiAgICBhZHRzWzNdID0gYWR0c1szXSB8ICgweDAzICYgYWFjZnJhbWVsZW5ndGggPj4gMTEpO1xuICAgIGFkdHNbNF0gPSAweGZmICYgKGFhY2ZyYW1lbGVuZ3RoID4+IDMpO1xuICAgIGFkdHNbNV0gPSAweGUwICYgKGFhY2ZyYW1lbGVuZ3RoIDw8IDUpO1xuXG4gICAgLy8gYWR0c19idWZmZXJfZnVsbG5lc3MgMHg3ZmYgMTFiaXRcbiAgICBhZHRzWzVdID0gYWR0c1s1XSB8IDB4MWZcbiAgICBhZHRzWzZdID0gMHhmYztcblxuICAgIC8vIG51bWJlcl9vZl9yYXdfZGF0YV9ibG9ja3NfaW5fZnJhbWUgMCAyYml0O1xuICAgIHJldHVybiBhZHRzO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEF1ZGlvQ3R4O1xuIiwiaW1wb3J0IFZpZGVvQ3R4IGZyb20gJy4vdmlkZW8tY29udGV4dCc7XG5pbXBvcnQgQXVkaW9DdHggZnJvbSAnLi9hdWRpby1jb250ZXh0JztcbmltcG9ydCB7IGdldFRpY2tlciB9IGZyb20gJy4vdGlja2VyJztcbi8qKlxuICog6Z+z55S75ZCM5q2l6LCD5ZKM5ZmoXG4gKi9cbmNsYXNzIEFWUmVjb25jaWxlciB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHRoaXMuYUN0eCA9IHByb3BzLmFDdHg7XG4gICAgdGhpcy52Q3R4ID0gcHJvcHMudkN0eDtcbiAgICB0aGlzLnZpZGVvID0gcHJvcHMudmlkZW9cbiAgICB0aGlzLnRpbWVvdXRJZCA9IG51bGxcbiAgICB0aGlzLnN0YXJ0ID0gbnVsbFxuICB9XG5cbiAgZG9SZWNvbmNpbGUgKCkge1xuICAgIGNvbnN0IHZDdXJUaW1lID0gKHRoaXMudkN0eC5jdXJyZW50VGltZSB8fCAwKTtcbiAgICBjb25zdCBhQ3VyVGltZSA9ICh0aGlzLmFDdHguY3VycmVudFRpbWUgfHwgMCkgKiAxMDAwO1xuXG4gICAgY29uc3QgZ2FwID0gdkN1clRpbWUgLSBhQ3VyVGltZTtcbiAgICBpZiAodGhpcy50aW1lb3V0SWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGdhcCA+IDIwMCkgeyAvLyBhdWRpbyBkZWxheWVkIGZvciBtb3JlIHRoYW4gMTAwbXNcbiAgICAgIHRoaXMudmlkZW8uc3RhcnQgKz0gZ2FwXG4gICAgICB0aGlzLnZDdHgucGF1c2UoKVxuICAgICAgdGhpcy50aW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy52Q3R4LnBsYXkoKVxuICAgICAgICB0aGlzLnRpbWVvdXRJZCA9IG51bGxcbiAgICAgIH0sIGdhcClcbiAgICB9IGVsc2UgaWYgKGdhcCA8IC0xMjApIHtcbiAgICAgIHRoaXMudmlkZW8uc3RhcnQgKz0gZ2FwXG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5zdGFydCA9IG51bGxcbiAgICB0aGlzLmFDdHggPSBudWxsXG4gICAgdGhpcy52Q3R4ID0gbnVsbFxuICB9XG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuY2xhc3MgTW9iaWxlVmlkZW8gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgdGhpcy5oYW5kbGVBdWRpb1NvdXJjZUVuZCA9IHRoaXMuaGFuZGxlQXVkaW9Tb3VyY2VFbmQuYmluZCh0aGlzKVxuICAgIHRoaXMucGxheWVkID0gZmFsc2U7XG4gICAgdGhpcy5wZW5kaW5nUGxheVRhc2sgPSBudWxsXG4gICAgdGhpcy5fcGF1c2VkID0gdHJ1ZTtcbiAgICB0aGlzLnZpZGVvTWV0YUluaXRlZCA9IGZhbHNlO1xuICAgIHRoaXMuYXVkaW9NZXRhSW5pdGVkID0gZmFsc2U7XG4gICAgdGhpcy5pbml0KClcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIHRoaXMudkN0eCA9IG5ldyBWaWRlb0N0eChPYmplY3QuYXNzaWduKHtcbiAgICAgIGNhbnZhczogdGhpcy5fY2FudmFzXG4gICAgfSwgeyBzdHlsZTogeyB3aWR0aDogdGhpcy53aWR0aCwgaGVpZ2h0OiB0aGlzLmhlaWdodCB9IH0pKTtcbiAgICB0aGlzLmFDdHggPSBuZXcgQXVkaW9DdHgoe30pO1xuICAgIHRoaXMudGlja2VyID0gbmV3IChnZXRUaWNrZXIoKSkoKVxuICAgIHRoaXMucmVjb25jaWxlciA9IG5ldyBBVlJlY29uY2lsZXIoe1xuICAgICAgdkN0eDogdGhpcy52Q3R4LFxuICAgICAgYUN0eDogdGhpcy5hQ3R4LFxuICAgICAgdmlkZW86IHRoaXNcbiAgICB9KVxuICAgIHRoaXMudkN0eC5vbmNhbnBsYXkgPSAoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMucGxheWVkKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy5fY2FudmFzKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NhbnBsYXknKSk7XG4gICAgfVxuXG4gICAgdGhpcy5hQ3R4Lm9uKCdBVURJT19TT1VSQ0VfRU5EJywgdGhpcy5oYW5kbGVBdWRpb1NvdXJjZUVuZClcbiAgfVxuXG4gIGhhbmRsZUF1ZGlvU291cmNlRW5kICgpIHtcbiAgICB0aGlzLnJlY29uY2lsZXIuZG9SZWNvbmNpbGUoKVxuICAgIHRoaXMudkN0eC5jbGVhbkJ1ZmZlcigpO1xuICB9XG5cbiAgX2NsZWFuQnVmZmVyICgpIHtcbiAgICB0aGlzLnZDdHguY2xlYW5CdWZmZXIoKVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5hQ3R4LmRlc3Ryb3koKVxuICAgIHRoaXMudkN0eC5kZXN0cm95KClcbiAgICB0aGlzLnRpY2tlci5zdG9wKClcbiAgICB0aGlzLnN0YXJ0ID0gbnVsbDtcbiAgICB0aGlzLnJlY29uY2lsZXIuZGVzdHJveSgpXG4gICAgdGhpcy5hQ3R4ID0gbnVsbDtcbiAgICB0aGlzLnZDdHggPSBudWxsO1xuICAgIHRoaXMudGlja2VyID0gbnVsbDtcbiAgfVxuXG4gIG9uRGVtdXhDb21wbGV0ZSAodmlkZW9UcmFjaywgYXVkaW9UcmFjaykge1xuICAgIHRoaXMuYUN0eC5kZWNvZGVBdWRpbyhhdWRpb1RyYWNrKTtcbiAgICB0aGlzLnZDdHguZGVjb2RlVmlkZW8odmlkZW9UcmFjayk7XG4gIH1cblxuICBzZXRBdWRpb01ldGEgKG1ldGEpIHtcbiAgICB0aGlzLmFDdHguc2V0QXVkaW9NZXRhRGF0YShtZXRhKTtcbiAgICB0aGlzLmF1ZGlvTWV0YUluaXRlZCA9IHRydWU7XG4gIH1cblxuICBzZXRWaWRlb01ldGEgKG1ldGEpIHtcbiAgICB0aGlzLnZDdHguc2V0VmlkZW9NZXRhRGF0YShtZXRhKTtcbiAgICB0aGlzLnZpZGVvTWV0YUluaXRlZCA9IHRydWU7XG4gIH1cblxuICBnZXQgd2lkdGggKCkge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnd2lkdGgnKSB8fCB0aGlzLnZpZGVvV2lkdGhcbiAgfVxuXG4gIHNldCB3aWR0aCAodmFsKSB7XG4gICAgdGhpcy5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jaydcbiAgICBjb25zdCBweFZhbCA9IHR5cGVvZiB2YWwgPT09ICdudW1iZXInID8gYCR7dmFsfXB4YCA6IHZhbFxuICAgIHRoaXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHB4VmFsKVxuICAgIHRoaXMuc3R5bGUud2lkdGggPSBweFZhbFxuICAgIHRoaXMuX2NhbnZhcy5zdHlsZS53aWR0aCA9IHB4VmFsO1xuICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IHZhbDtcbiAgfVxuXG4gIGdldCBoZWlnaHQgKCkge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnaGVpZ2h0JylcbiAgfVxuXG4gIHNldCBoZWlnaHQgKHZhbCkge1xuICAgIHRoaXMuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snXG4gICAgY29uc3QgcHhWYWwgPSB0eXBlb2YgdmFsID09PSAnbnVtYmVyJyA/IGAke3ZhbH1weGAgOiB2YWxcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgcHhWYWwpXG4gICAgdGhpcy5zdHlsZS5oZWlnaHQgPSBweFZhbFxuICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5oZWlnaHQgPSBweFZhbDtcbiAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gdmFsO1xuICB9XG5cbiAgZ2V0IHZpZGVvV2lkdGggKCkge1xuICAgIGlmICh0aGlzLnZDdHggJiYgdGhpcy52Q3R4LnZpZGVvV2lkdGgpIHtcbiAgICAgIHJldHVybiB0aGlzLnZDdHgudmlkZW9XaWR0aFxuICAgIH1cbiAgICByZXR1cm4gMFxuICB9XG5cbiAgZ2V0IHZpZGVvSGVpZ2h0ICgpIHtcbiAgICBpZiAodGhpcy52Q3R4ICYmIHRoaXMudkN0eC52aWRlb0hlaWdodCkge1xuICAgICAgcmV0dXJuIHRoaXMudkN0eC52aWRlb0hlaWdodFxuICAgIH1cbiAgICByZXR1cm4gMFxuICB9XG5cbiAgZ2V0IHNyYyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdzcmMnKTtcbiAgfVxuXG4gIHNldCBzcmMgKHZhbCkge1xuICAgIC8vIGRvIG5vdGhpbmdcbiAgfVxuXG4gIGdldCByZWFkeVN0YXRlICgpIHtcbiAgICByZXR1cm4gdGhpcy52aWRlb01ldGFJbml0ZWQgPyB0aGlzLnZDdHgucmVhZHlTdGF0ZSA6IDBcbiAgfVxuXG4gIGdldCBzZWVraW5nICgpIHtcbiAgICByZXR1cm4gdGhpcy52aWRlb01ldGFJbml0ZWQgPyB0aGlzLnZDdHguc2Vla2luZyA6IGZhbHNlXG4gIH1cblxuICBnZXQgY3VycmVudFRpbWUgKCkge1xuICAgIHJldHVybiB0aGlzLnZpZGVvTWV0YUluaXRlZCA/IHRoaXMudkN0eC5jdXJyZW50VGltZSAvIDEwMDAgOiAwXG4gIH1cblxuICBnZXQgZHVyYXRpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmF1ZGlvTWV0YUluaXRlZCA/IHRoaXMuYUN0eC5kdXJhdGlvbiA6IDBcbiAgfVxuXG4gIGdldCBwYXVzZWQgKCkge1xuICAgIHJldHVybiB0aGlzLl9wYXVzZWRcbiAgfVxuXG4gIGdldCBwbGF5YmFja1JhdGUgKCkge1xuICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZSgncGxheWJhY2tSYXRlJykpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgncGxheWJhY2tSYXRlJylcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDEuMFxuICAgIH1cbiAgfVxuXG4gIHNldCBwbGF5YmFja1JhdGUgKHZhbCkge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdwbGF5YmFja3JhdGUnLCB2YWwpO1xuICAgIHRoaXMuYUN0eC5wbGF5YmFja1JhdGUgPSB2YWw7XG4gICAgdGhpcy52Q3R4LnBsYXliYWNrUmF0ZSA9IHZhbDtcblxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3JhdGVjaGFuZ2UnKSlcbiAgfVxuXG4gIGdldCBlbmRlZCAoKSB7XG4gICAgaWYgKHRoaXMuYXVkaW9NZXRhSW5pdGVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5hQ3R4LmVuZGVkO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXQgYXV0b3BsYXkgKCkge1xuICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZSgnYXV0b3BsYXknKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdhdXRvcGxheScpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuICBzZXQgYXV0b3BsYXkgKHZhbHVlKSB7XG5cbiAgfVxuICBwbGF5ICgpIHtcbiAgICBpZiAodGhpcy5wZW5kaW5nUGxheVRhc2spIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wbGF5ZWQpIHtcbiAgICAgIHRoaXMuZGVzdHJveSgpXG4gICAgICB0aGlzLmluaXQoKVxuICAgIH1cbiAgICB0aGlzLnBlbmRpbmdQbGF5VGFzayA9IFByb21pc2UuYWxsKFtcbiAgICAgIHRoaXMudkN0eC5wbGF5KCksXG4gICAgICB0aGlzLmFDdHgucGxheSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmFDdHgubXV0ZWQgPSB0cnVlXG4gICAgICB9KVxuICAgIF0pLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5hQ3R4Lm11dGVkID0gZmFsc2VcbiAgICAgIHRoaXMudGlja2VyLnN0YXJ0KCgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXJ0KSB7XG4gICAgICAgICAgdGhpcy5zdGFydCA9IERhdGUubm93KClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jdXJyZW50VGltZSA9IERhdGUubm93KCkgLSB0aGlzLnN0YXJ0XG4gICAgICAgIHRoaXMudkN0eC5fb25UaW1lcih0aGlzLl9jdXJyZW50VGltZSlcbiAgICAgIH0pXG5cbiAgICAgIHRoaXMucGVuZGluZ1BsYXlUYXNrID0gbnVsbFxuICAgICAgdGhpcy5wbGF5ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgncGxheScpKVxuICAgICAgdGhpcy5fcGF1c2VkID0gZmFsc2VcbiAgICB9KVxuICB9XG5cbiAgcGF1c2UgKCkge1xuICAgIHRoaXMuX3BhdXNlZCA9IHRydWU7XG4gICAgdGhpcy5hQ3R4LnBhdXNlKClcbiAgICB0aGlzLnZDdHgucGF1c2UoKVxuXG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgncGF1c2UnKSlcbiAgfVxuXG4gIGdldCB2b2x1bWUgKCkge1xuICAgIHJldHVybiB0aGlzLmFDdHgudm9sdW1lXG4gIH1cblxuICBzZXQgdm9sdW1lICh2b2wpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgndm9sdW1lJywgdm9sKTtcbiAgICB0aGlzLmFDdHgudm9sdW1lID0gdm9sXG4gIH1cblxuICBnZXQgbXV0ZWQgKCkge1xuICAgIGNvbnN0IGF0dHJNdXRlZCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdtdXRlZCcpID09PSAndHJ1ZSdcbiAgICBpZiAoYXR0ck11dGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBhdHRyTXV0ZWQ7XG4gICAgfSBlbHNlIGlmICh0aGlzLmdldEF0dHJpYnV0ZSgndm9sdW1lJykpIHtcbiAgICAgIHJldHVybiBOdW1iZXIucGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ3ZvbHVtZScpKSA9PT0gMFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICBzZXQgbXV0ZWQgKHZhbCkge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCdtdXRlZCcsIHZhbCk7XG4gICAgaWYgKCF2YWwpIHtcbiAgICAgIHRoaXMuYUN0eC5tdXRlZCA9IGZhbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYUN0eC5tdXRlZCA9IHRydWVcbiAgICB9XG4gIH1cblxuICBnZXQgZXJyb3IgKCkge1xuICAgIHJldHVybiB0aGlzLnZDdHguZXJyb3IgfHwgdGhpcy5hQ3R4LmVycm9yO1xuICB9XG5cbiAgZ2V0IGJ1ZmZlcmVkICgpIHtcbiAgICByZXR1cm4gdGhpcy52Q3R4LmJ1ZmZlcmVkXG4gIH1cbn1cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtb2JpbGUtdmlkZW8nLCBNb2JpbGVWaWRlbyk7XG4iLCJjbGFzcyBTb3VyY2VCdWZmZXIge1xuICBjb25zdHJ1Y3RvciAoY29uZmlnKSB7XG4gICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWcpO1xuICAgIHRoaXMudHlwZSA9IHRoaXMuY29uZmlnLnR5cGU7XG4gICAgdGhpcy5idWZmZXIgPSBbXTtcbiAgICB0aGlzLmN1cnJlbnRHb3AgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fbGFzdEdldCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHB1c2ggKGZyYW1lKSB7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgaWYgKGZyYW1lLmlzS2V5ZnJhbWUpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRHb3AgPSB7XG4gICAgICAgICAgc2FtcGxlczogW10sXG4gICAgICAgICAgc3RhcnQ6IGZyYW1lLmR0cyxcbiAgICAgICAgICBlbmQ6IGZyYW1lLmR0cyxcbiAgICAgICAgICBuZXh0R29wOiB1bmRlZmluZWRcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEdvcCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudEdvcC5uZXh0R29wID0gY3VycmVudEdvcDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJlbnRHb3AgPSBjdXJyZW50R29wO1xuICAgICAgICB0aGlzLmJ1ZmZlci5wdXNoKHRoaXMuY3VycmVudEdvcCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRHb3ApIHtcbiAgICAgICAgdGhpcy5jdXJyZW50R29wLnNhbXBsZXMucHVzaChmcmFtZSk7XG5cbiAgICAgICAgaWYgKGZyYW1lLmR0cyA8IHRoaXMuY3VycmVudEdvcC5zdGFydCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudEdvcC5zdGFydCA9IGZyYW1lLmR0cztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmcmFtZS5kdHMgPiB0aGlzLmN1cnJlbnRHb3AuZW5kKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50R29wLmVuZCA9IGZyYW1lLmR0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldCAodGltZSkge1xuICAgIGlmICh0aGlzLnR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgIGlmICh0aGlzLmJ1ZmZlci5sZW5ndGggPCAxKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRpbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsZXQgc2FtcGxlID0gdGhpcy5fZ2V0TmV4dCgpO1xuICAgICAgICByZXR1cm4gc2FtcGxlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9nZXROZXh0ICgpIHtcbiAgICBpZiAoIXRoaXMuX2xhc3RHZXQpIHtcbiAgICAgIGxldCBnb3AgPSB0aGlzLmJ1ZmZlclswXTtcbiAgICAgIGlmIChnb3Auc2FtcGxlcy5sZW5ndGggPCAxKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB0aGlzLl9sYXN0R2V0ID0ge1xuICAgICAgICBnb3AsXG4gICAgICAgIGluZGV4OiAwXG4gICAgICB9XG4gICAgICByZXR1cm4gZ29wLnNhbXBsZXNbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBnb3AgPSB0aGlzLl9sYXN0R2V0LmdvcDtcbiAgICAgIGxldCBzYW1wbGUgPSBnb3Auc2FtcGxlc1t0aGlzLl9sYXN0R2V0LmluZGV4ICsgMV07XG4gICAgICBpZiAoc2FtcGxlKSB7XG4gICAgICAgIHRoaXMuX2xhc3RHZXQuaW5kZXggPSB0aGlzLl9sYXN0R2V0LmluZGV4ICsgMTtcbiAgICAgICAgcmV0dXJuIHNhbXBsZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdvcCA9IGdvcC5uZXh0R29wO1xuICAgICAgICBpZiAoIWdvcCB8fCBnb3Auc2FtcGxlcy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNhbXBsZSA9IGdvcC5zYW1wbGVzWzBdO1xuICAgICAgICB0aGlzLl9sYXN0R2V0ID0ge1xuICAgICAgICAgIGdvcCxcbiAgICAgICAgICBpbmRleDogMFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzYW1wbGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlIChzdGFydCwgZW5kKSB7XG4gICAgaWYgKHRoaXMuYnVmZmVyLmxlbmd0aCA8IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGdvcCA9IHRoaXMuYnVmZmVyWzBdO1xuICAgIHdoaWxlIChnb3ApIHtcbiAgICAgIGlmIChnb3AuZW5kIDwgZW5kICYmIGdvcC5zdGFydCA+PSBzdGFydCkge1xuICAgICAgICB0aGlzLmJ1ZmZlci5zcGxpY2UoaSwgMSlcbiAgICAgICAgZ29wID0gdGhpcy5idWZmZXJbaV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpICs9IDE7XG4gICAgICAgIGdvcCA9IHRoaXMuYnVmZmVyW2ldO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTb3VyY2VCdWZmZXI7XG4iLCIvKipcbiAqIEBhdXRob3IgZnV5dWhhb0BieXRlZGFuY2UuY29tXG4gKi9cblxuY2xhc3MgVGlja2VyIHtcbiAgY29uc3RydWN0b3IgKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zIHx8IHt9LCB7XG4gICAgICBpbnRlcnZhbDogMTZcbiAgICB9KVxuXG4gICAgdGhpcy5jYWxsYmFja3MgPSBbXVxuICB9XG5cbiAgc3RhcnQoLi4uY2FsbGJhY2tzKSB7XG4gICAgdGhpcy5jYWxsYmFja3MgPSBjYWxsYmFja3NcbiAgfVxuXG4gIG9uVGljayAoKSB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb25zdCBjYWxsYmFjayA9IHRoaXMuY2FsbGJhY2tzW2ldXG4gICAgICBjYWxsYmFjaygpXG4gICAgfVxuICB9XG5cbiAgc2V0SW50ZXJ2YWwgKGludGVydmFsKSB7XG4gICAgdGhpcy5vcHRpb25zLmludGVydmFsID0gaW50ZXJ2YWxcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG4vKipcbiAqIHRpY2tlciB1c2UgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gKi9cbmNsYXNzIFJhZlRpY2tlciBleHRlbmRzIFRpY2tlciB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnByZXYgPSBudWxsO1xuICAgIHRoaXMudGltZXJJZCA9IG51bGxcbiAgICB0aGlzLl9zdWJUaW1lcklkID0gbnVsbFxuXG4gICAgdGhpcy5fdGlja0Z1bmMgPSBSYWZUaWNrZXIuZ2V0VGlja0Z1bmMoKVxuICAgIHRoaXMudGljayA9IHRoaXMudGljay5iaW5kKHRoaXMpXG4gIH1cblxuICBzdGFydCAoLi4uY2FsbGJhY2tzKSB7XG4gICAgc3VwZXIuc3RhcnQoLi4uY2FsbGJhY2tzKVxuICAgIHRoaXMudGljaygpXG4gIH1cblxuICB0aWNrICgpIHtcbiAgICB0aGlzLm5leHRUaWNrKCk7XG4gICAgdGhpcy5vblRpY2soKVxuICB9XG5cbiAgbmV4dFRpY2sgKCkge1xuICAgIGNvbnN0IHsgX3RpY2tGdW5jIH0gPSB0aGlzO1xuICAgIHRoaXMudGltZXJJZCA9IF90aWNrRnVuYyh0aGlzLnRpY2spXG4gIH1cblxuICBzdG9wICgpIHtcbiAgICBpZiAodGhpcy50aW1lcklkKSB7XG4gICAgICBjb25zdCBjYW5jZWxGdW5jID0gUmFmVGlja2VyLmdldENhbmNlbEZ1bmMoKVxuXG4gICAgICBjYW5jZWxGdW5jKHRoaXMudGltZXJJZClcbiAgICB9XG4gIH1cblxuICByZXN1bWUoKSB7XG4gICAgdGhpcy5uZXh0VGljaygpO1xuICB9XG5cbiAgc3RhdGljIGdldFRpY2tGdW5jICgpIHtcbiAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gIH1cblxuICBzdGF0aWMgZ2V0Q2FuY2VsRnVuYyAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWVcbiAgfVxuXG4gIHN0YXRpYyBpc1N1cHBvcnRlZCAoKSB7XG4gICAgcmV0dXJuIFJhZlRpY2tlci5nZXRUaWNrRnVuYygpICE9PSB1bmRlZmluZWRcbiAgfVxufVxuXG4vKipcbiAqIHVzZSBzZXRUaW1lb3V0IGZvciBicm93c2VycyB3aXRob3V0IHJhZiBzdXBwb3J0XG4gKi9cbmNsYXNzIFRpbWVvdXRUaWNrZXIgZXh0ZW5kcyBUaWNrZXIge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcihjb25maWcpXG4gICAgdGhpcy50aW1lb3V0SWQgPSBudWxsXG5cbiAgfVxuXG4gIHN0YXJ0ICguLi5jYWxsYmFja3MpIHtcbiAgICBzdXBlci5uZXh0VGljayguLi5jYWxsYmFja3MpXG4gICAgdGhpcy50aW1lb3V0SWQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgdGhpcy5vblRpY2soKTtcbiAgICB9LCB0aGlzLm9wdGlvbnMuaW50ZXJ2YWwgfHwgMTYpXG4gIH1cblxuICBzdG9wICgpIHtcbiAgICBpZiAodGhpcy50aW1lb3V0SWQpIHtcbiAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMudGltZW91dElkKVxuICAgIH1cbiAgfVxuXG59XG5cbi8qKlxuICog6L+U5ZueVGlja2Vy5p6E6YCg5Ye95pWwXG4gKiBAcmV0dXJucyB7VGlja2VyfVxuICovXG5leHBvcnQgY29uc3QgZ2V0VGlja2VyID0gKCkgPT4ge1xuICBpZiAoUmFmVGlja2VyLmlzU3VwcG9ydGVkKCkpIHtcbiAgICByZXR1cm4gUmFmVGlja2VyXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFRpbWVvdXRUaWNrZXJcbiAgfVxufVxuIiwiaW1wb3J0IFdvcmtlcmlmeSBmcm9tICd3ZWJ3b3JraWZ5LXdlYnBhY2snXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL3dyaXRlL3N0cmVhbSc7XG5pbXBvcnQgTmFsdW5pdCBmcm9tICcuLi8uLi8uLi94Z3BsYXllci1jb2RlYy9zcmMvaDI2NC9uYWx1bml0JztcbmltcG9ydCBZVVZDYW52YXMgZnJvbSAnLi95dXYtY2FudmFzJztcbmltcG9ydCBTb3VyY2VCdWZmZXIgZnJvbSAnLi9zb3VyY2VidWZmZXInO1xuaW1wb3J0IFRpbWVSYW5nZXMgZnJvbSAnLi4vbW9kZWxzL1RpbWVSYW5nZXMnO1xuXG5jbGFzcyBWaWRlb0NhbnZhcyB7XG4gIGNvbnN0cnVjdG9yIChjb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZyk7XG4gICAgdGhpcy5jYW52YXMgPSB0aGlzLmNvbmZpZy5jYW52YXMgPyB0aGlzLmNvbmZpZy5jYW52YXMgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICB0aGlzLnNvdXJjZSA9IG5ldyBTb3VyY2VCdWZmZXIoe3R5cGU6ICd2aWRlbyd9KTtcbiAgICB0aGlzLnByZWxvYWRUaW1lID0gdGhpcy5jb25maWcucHJlbG9hZFRpbWUgfHwgMztcbiAgICB0aGlzLm9uY2FucGxheSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm9uRmlyc3RGcmFtZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm1ldGEgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5yZWFkeVN0YXR1cyA9IDA7XG4gICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgIHRoaXMuY291bnQgPSAwO1xuICAgIHRoaXMuY3VycmVudFRpbWUgPSAwO1xuICAgIHRoaXMubGFzdFBsYXllZCA9IDA7XG5cbiAgICB0aGlzLl9kZWNvZGVySW5pdGVkID0gZmFsc2U7XG4gICAgdGhpcy5fYXZjY3B1c2hlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2RlY29kZWRGcmFtZXMgPSB7fTtcbiAgICB0aGlzLl9sYXN0U2FtcGxlRHRzID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2Jhc2VEdHMgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fbGFzdFJlbmRlclRpbWUgPSBudWxsXG4gICAgdGhpcy5wbGF5RmluaXNoID0gbnVsbFxuXG4gIH1cblxuICBwYXVzZSAoKSB7XG4gICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICB9XG5cbiAgaW5pdFdhc21Xb3JrZXIgKCkge1xuICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy53YXNtd29ya2VyID0gV29ya2VyaWZ5KHJlcXVpcmUucmVzb2x2ZSgnLi93b3JrZXIuanMnKSk7XG4gICAgdGhpcy53YXNtd29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgIG1zZzogJ2luaXQnLFxuICAgICAgbWV0YTogdGhpcy5tZXRhXG4gICAgfSlcbiAgICB0aGlzLndhc213b3JrZXIuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIG1zZyA9PiB7XG4gICAgICBzd2l0Y2ggKG1zZy5kYXRhLm1zZykge1xuICAgICAgICBjYXNlICdERUNPREVSX1JFQURZJzpcbiAgICAgICAgICBfdGhpcy5fZGVjb2RlckluaXRlZCA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0RFQ09ERUQnOlxuICAgICAgICAgIHRoaXMuX29uRGVjb2RlZChtc2cuZGF0YSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzZXRWaWRlb01ldGFEYXRhIChtZXRhKSB7XG4gICAgdGhpcy5tZXRhID0gbWV0YTtcbiAgICBpZiAoIXRoaXMuX2RlY29kZXJJbml0ZWQpIHtcbiAgICAgIHRoaXMuaW5pdFdhc21Xb3JrZXIoKTtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLl9hdmNjcHVzaGVkID0gdHJ1ZTtcbiAgICBsZXQgZGF0YSA9IG5ldyBVaW50OEFycmF5KG1ldGEuc3BzLmJ5dGVMZW5ndGggKyA0KTtcbiAgICBkYXRhLnNldChbMCwgMCwgMCwgMV0pXG4gICAgZGF0YS5zZXQobWV0YS5zcHMsIDQpO1xuICAgIHRoaXMud2FzbXdvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICBtc2c6ICdkZWNvZGUnLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pXG5cbiAgICBkYXRhID0gbmV3IFVpbnQ4QXJyYXkobWV0YS5wcHMuYnl0ZUxlbmd0aCArIDQpO1xuICAgIGRhdGEuc2V0KFswLCAwLCAwLCAxXSlcbiAgICBkYXRhLnNldChtZXRhLnBwcywgNCk7XG4gICAgdGhpcy53YXNtd29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgIG1zZzogJ2RlY29kZScsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSlcblxuICAgIGlmICghdGhpcy55dXZDYW52YXMpIHtcbiAgICAgIGxldCBjb25maWcgPSBPYmplY3QuYXNzaWduKHttZXRhLCBjYW52YXM6IHRoaXMuY2FudmFzfSwgdGhpcy5jb25maWcpO1xuICAgICAgdGhpcy55dXZDYW52YXMgPSBuZXcgWVVWQ2FudmFzKGNvbmZpZyk7XG4gICAgfVxuICAgIHRoaXMucmVhZHlTdGF0dXMgPSAxO1xuICB9XG5cbiAgZGVjb2RlVmlkZW8gKHZpZGVvVHJhY2spIHtcbiAgICBpZiAoIXRoaXMuX2RlY29kZXJJbml0ZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICghdGhpcy5fYXZjY3B1c2hlZCkge1xuICAgICAgdGhpcy5zZXRWaWRlb01ldGFEYXRhKHRoaXMubWV0YSk7XG4gICAgfVxuICAgIGxldCB7IHNhbXBsZXMgfSA9IHZpZGVvVHJhY2s7XG4gICAgbGV0IHNhbXBsZSA9IHNhbXBsZXMuc2hpZnQoKTtcblxuICAgIHdoaWxlIChzYW1wbGUpIHtcbiAgICAgIGlmICghdGhpcy5fYmFzZUR0cykge1xuICAgICAgICB0aGlzLl9iYXNlRHRzID0gc2FtcGxlLmR0cztcbiAgICAgIH1cbiAgICAgIHRoaXMuc291cmNlLnB1c2goc2FtcGxlKTtcbiAgICAgIHNhbXBsZSA9IHNhbXBsZXMuc2hpZnQoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9wcmVsb2FkKCk7XG4gIH1cblxuICBfcHJlbG9hZCAoKSB7XG4gICAgaWYgKCF0aGlzLl9sYXN0U2FtcGxlRHRzIHx8IHRoaXMuX2xhc3RTYW1wbGVEdHMgLSB0aGlzLl9iYXNlRHRzIDwgdGhpcy5jdXJyZW50VGltZSArIHRoaXMucHJlbG9hZFRpbWUgKiAxMDAwKSB7XG4gICAgICBsZXQgc2FtcGxlID0gdGhpcy5zb3VyY2UuZ2V0KCk7XG4gICAgICBpZiAoc2FtcGxlKSB7XG4gICAgICAgIHRoaXMuX2xhc3RTYW1wbGVEdHMgPSBzYW1wbGUuZHRzO1xuICAgICAgICB0aGlzLl9hbmFseXNlTmFsKHNhbXBsZSk7XG4gICAgICB9XG5cbiAgICAgIHdoaWxlIChzYW1wbGUgJiYgdGhpcy5fbGFzdFNhbXBsZUR0cyAtIHRoaXMuX2Jhc2VEdHMgPCB0aGlzLmN1cnJlbnRUaW1lICsgdGhpcy5wcmVsb2FkVGltZSAqIDEwMDApIHtcbiAgICAgICAgc2FtcGxlID0gdGhpcy5zb3VyY2UuZ2V0KCk7XG4gICAgICAgIGlmIChzYW1wbGUpIHtcbiAgICAgICAgICB0aGlzLl9hbmFseXNlTmFsKHNhbXBsZSk7XG4gICAgICAgICAgdGhpcy5fbGFzdFNhbXBsZUR0cyA9IHNhbXBsZS5kdHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfYW5hbHlzZU5hbCAoc2FtcGxlKSB7XG4gICAgbGV0IG5hbHMgPSBOYWx1bml0LmdldEF2Y2NOYWxzKG5ldyBTdHJlYW0oc2FtcGxlLmRhdGEuYnVmZmVyKSk7XG5cbiAgICBsZXQgbGVuZ3RoID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBuYWwgPSBuYWxzW2ldO1xuICAgICAgbGVuZ3RoICs9IG5hbC5ib2R5LmJ5dGVMZW5ndGggKyA0O1xuICAgIH1cbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICBsZXQgZGF0YSA9IG5ldyBVaW50OEFycmF5KGxlbmd0aCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgbmFsID0gbmFsc1tpXTtcbiAgICAgIGRhdGEuc2V0KFswLCAwLCAwLCAxXSwgb2Zmc2V0KTtcbiAgICAgIG9mZnNldCArPSA0O1xuICAgICAgZGF0YS5zZXQobmV3IFVpbnQ4QXJyYXkobmFsLmJvZHkpLCBvZmZzZXQpO1xuICAgICAgb2Zmc2V0ICs9IG5hbC5ib2R5LmJ5dGVMZW5ndGg7XG4gICAgfVxuICAgIHRoaXMud2FzbXdvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICBtc2c6ICdkZWNvZGUnLFxuICAgICAgZGF0YTogZGF0YSxcbiAgICAgIGluZm86IHtcbiAgICAgICAgZHRzOiBzYW1wbGUuZHRzLFxuICAgICAgICBwdHM6IHNhbXBsZS5wdHMgPyBzYW1wbGUucHRzIDogc2FtcGxlLmR0cyArIHNhbXBsZS5jdHMsXG4gICAgICAgIGtleTogc2FtcGxlLmlzS2V5ZnJhbWVcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgX29uRGVjb2RlZCAoZGF0YSkge1xuICAgIGxldCB7ZHRzfSA9IGRhdGEuaW5mb1xuICAgIHRoaXMuX2RlY29kZWRGcmFtZXNbZHRzXSA9IGRhdGE7XG4gICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuX2RlY29kZWRGcmFtZXMpLmxlbmd0aCA+IDEwKSB7XG4gICAgICBpZiAodGhpcy5wbGF5RmluaXNoKSB7XG4gICAgICAgIHRoaXMucGxheUZpbmlzaCgpXG4gICAgICB9XG4gICAgICBpZiAodGhpcy5vbmNhbnBsYXkpIHtcbiAgICAgICAgdGhpcy5vbmNhbnBsYXkoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwbGF5ICgpIHtcbiAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5wbGF5RmluaXNoID0gcmVzb2x2ZVxuICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5wbGF5RmluaXNoID0gbnVsbFxuICAgIH0pXG4gIH1cblxuICBfb25UaW1lciAoY3VycmVudFRpbWUpIHtcbiAgICBpZiAodGhpcy5wYXVzZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMubWV0YSkge1xuICAgICAgaWYgKHRoaXMubWV0YS5mcmFtZVJhdGUgJiYgdGhpcy5tZXRhLmZyYW1lUmF0ZS5maXhlZCAmJiB0aGlzLm1ldGEuZnJhbWVSYXRlLmZwcykge1xuICAgICAgfVxuICAgICAgbGV0IGZyYW1lVGltZXMgPSBPYmplY3Qua2V5cyh0aGlzLl9kZWNvZGVkRnJhbWVzKTtcbiAgICAgIGlmIChmcmFtZVRpbWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZSA9IGN1cnJlbnRUaW1lO1xuICAgICAgICBsZXQgZnJhbWVUaW1lID0gLTE7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnJhbWVUaW1lcy5sZW5ndGggJiYgTnVtYmVyLnBhcnNlSW50KGZyYW1lVGltZXNbaV0pIC0gdGhpcy5fYmFzZUR0cyA8PSB0aGlzLmN1cnJlbnRUaW1lOyBpKyspIHtcbiAgICAgICAgICBmcmFtZVRpbWUgPSBOdW1iZXIucGFyc2VJbnQoZnJhbWVUaW1lc1tpIC0gMV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZyYW1lID0gdGhpcy5fZGVjb2RlZEZyYW1lc1tmcmFtZVRpbWVdO1xuICAgICAgICBpZiAoZnJhbWUpIHtcbiAgICAgICAgICB0aGlzLnl1dkNhbnZhcy5yZW5kZXIoZnJhbWUuYnVmZmVyLCBmcmFtZS53aWR0aCwgZnJhbWUuaGVpZ2h0LCBmcmFtZS55TGluZXNpemUsIGZyYW1lLnV2TGluZXNpemUpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnJhbWVUaW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChOdW1iZXIucGFyc2VJbnQoZnJhbWVUaW1lc1tpXSkgPCBmcmFtZVRpbWUpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9kZWNvZGVkRnJhbWVzW2ZyYW1lVGltZXNbaV1dO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9sYXN0UmVuZGVyVGltZSA9IERhdGUubm93KClcbiAgfVxuXG4gIGNsZWFuQnVmZmVyICgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50VGltZSA+IDEpIHtcbiAgICAgIHRoaXMuc291cmNlLnJlbW92ZSgwLCB0aGlzLmN1cnJlbnRUaW1lIC0gMSk7XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy53YXNtd29ya2VyLnBvc3RNZXNzYWdlKHttc2c6ICdkZXN0cm95J30pXG4gICAgdGhpcy53YXNtd29ya2VyID0gbnVsbDtcbiAgICB0aGlzLmNhbnZhcyA9IG51bGxcbiAgICB0aGlzLnNvdXJjZSA9IG51bGxcbiAgICB0aGlzLl9kZWNvZGVySW5pdGVkID0gZmFsc2U7XG4gIH1cblxuICBnZXQgYnVmZmVyZWQgKCkge1xuICAgIGNvbnN0IHJhbmdlcyA9IFtdXG4gICAgbGV0IGN1cnJlbnRSYW5nZSA9IHtcbiAgICAgIHN0YXJ0OiBudWxsLFxuICAgICAgZW5kOiBudWxsXG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zb3VyY2UuYnVmZmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB7IHN0YXJ0LCBlbmQgfSA9IHRoaXMuc291cmNlLmJ1ZmZlcltpXTtcbiAgICAgIGlmICghY3VycmVudFJhbmdlLnN0YXJ0KSB7XG4gICAgICAgIGN1cnJlbnRSYW5nZS5zdGFydCA9IHN0YXJ0O1xuICAgICAgfVxuICAgICAgaWYgKCFjdXJyZW50UmFuZ2UuZW5kKSB7XG4gICAgICAgIGN1cnJlbnRSYW5nZS5lbmQgPSBlbmQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGFydCAtIGN1cnJlbnRSYW5nZS5lbmQgPiAxMDAwKSB7XG4gICAgICAgIGN1cnJlbnRSYW5nZS5zdGFydCA9IGN1cnJlbnRSYW5nZS5zdGFydCAvIDEwMDBcbiAgICAgICAgY3VycmVudFJhbmdlLmVuZCA9IGN1cnJlbnRSYW5nZS5lbmQgLyAxMDAwXG4gICAgICAgIGN1cnJlbnRSYW5nZSA9IHtcbiAgICAgICAgICBzdGFydCxcbiAgICAgICAgICBlbmRcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3VycmVudFJhbmdlLmVuZCA9IGVuZFxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjdXJyZW50UmFuZ2Uuc3RhcnQgIT09IG51bGwgJiYgY3VycmVudFJhbmdlLmVuZCAhPT0gbnVsbCkge1xuICAgICAgY3VycmVudFJhbmdlLnN0YXJ0ID0gY3VycmVudFJhbmdlLnN0YXJ0IC8gMTAwMFxuICAgICAgY3VycmVudFJhbmdlLmVuZCA9IGN1cnJlbnRSYW5nZS5lbmQgLyAxMDAwXG4gICAgICByYW5nZXMucHVzaChjdXJyZW50UmFuZ2UpXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBUaW1lUmFuZ2VzKHJhbmdlcylcbiAgfVxuXG59XG5leHBvcnQgZGVmYXVsdCBWaWRlb0NhbnZhcztcbiIsImNvbnN0IE1BWF9TVFJFQU1fQlVGRkVSX0xFTkdUSCA9IDEwMjQgKiAxMDI0O1xudmFyIERlY29kZXIgPSBmdW5jdGlvbiAoc2VsZikge1xuICB0aGlzLmluaXRlZCA9IGZhbHNlO1xuICB0aGlzLnNlbGYgPSBzZWxmO1xuICB0aGlzLm1ldGEgPSB0aGlzLnNlbGYubWV0YTtcbiAgdGhpcy5pbmZvbGlzdCA9IHt9O1xuICBzZWxmLnBhcl9icm9hZHdheU9uQnJvYWR3YXlJbml0ZWQgPSB0aGlzLmJyb2Fkd2F5T25Ccm9hZHdheUluaXRlZC5iaW5kKHRoaXMpO1xuICBzZWxmLnBhcl9icm9hZHdheU9uUGljdHVyZURlY29kZWQgPSB0aGlzLmJyb2Fkd2F5T25QaWN0dXJlRGVjb2RlZC5iaW5kKHRoaXMpO1xufVxuXG5EZWNvZGVyLnByb3RvdHlwZS50b1U4QXJyYXkgPSBmdW5jdGlvbiAocHRyLCBsZW5ndGgpIHtcbiAgcmV0dXJuIHRoaXMuc2VsZi5IRUFQVTguc3ViYXJyYXkocHRyLCBwdHIgKyBsZW5ndGgpO1xufVxuXG5EZWNvZGVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICBNb2R1bGUuX2Jyb2Fkd2F5SW5pdCgpO1xuICB0aGlzLnN0cmVhbUJ1ZmZlciA9IHRoaXMudG9VOEFycmF5KE1vZHVsZS5fYnJvYWR3YXlDcmVhdGVTdHJlYW0oTUFYX1NUUkVBTV9CVUZGRVJfTEVOR1RIKSwgTUFYX1NUUkVBTV9CVUZGRVJfTEVOR1RIKTtcbn1cblxuRGVjb2Rlci5wcm90b3R5cGUuYnJvYWR3YXlPblBpY3R1cmVEZWNvZGVkID0gZnVuY3Rpb24gKG9mZnNldCwgd2lkdGgsIGhlaWdodCwgeUxpbmVzaXplLCB1dkxpbmVzaXplLCBpbmZvaWQpIHtcbiAgbGV0IGluZm8gPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmluZm9saXN0W2luZm9pZF0pO1xuICBsZXQgeVJvd2NvdW50ID0gaGVpZ2h0O1xuICBsZXQgdXZSb3djb3VudCA9IGhlaWdodCAvIDI7XG4gIGlmICh0aGlzLm1ldGEuY2hyb21hRm9ybWF0ID09PSA0NDQgfHwgdGhpcy5tZXRhLmNocm9tYUZvcm1hdCA9PT0gNDIyKSB7XG4gICAgdXZSb3djb3VudCA9IGhlaWdodDtcbiAgfVxuICBsZXQgZGF0YSA9IHRoaXMudG9VOEFycmF5KG9mZnNldCwgKHlMaW5lc2l6ZSAqIHlSb3djb3VudCkgKyAyICogKHV2TGluZXNpemUgKiB1dlJvd2NvdW50KSk7XG4gIHRoaXMuaW5mb2xpc3RbaW5mb2lkXSA9IG51bGw7XG4gIGxldCBkYXRldGVtcCA9IG5ldyBVaW50OEFycmF5KGRhdGEubGVuZ3RoKTtcbiAgZGF0ZXRlbXAuc2V0KGRhdGEpO1xuICBsZXQgYnVmZmVyID0gZGF0ZXRlbXAuYnVmZmVyO1xuICB0aGlzLnNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgIG1zZzogJ0RFQ09ERUQnLFxuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICB5TGluZXNpemUsXG4gICAgdXZMaW5lc2l6ZSxcbiAgICBpbmZvLFxuICAgIGJ1ZmZlclxuICB9LCBbYnVmZmVyXSk7XG59XG5cbkRlY29kZXIucHJvdG90eXBlLmJyb2Fkd2F5T25Ccm9hZHdheUluaXRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5pbml0ZWQgPSB0cnVlO1xuICB0aGlzLnNlbGYucG9zdE1lc3NhZ2Uoe21zZzogJ0RFQ09ERVJfUkVBRFknfSk7XG59XG5cbkRlY29kZXIucHJvdG90eXBlLmRlY29kZSA9IGZ1bmN0aW9uIChkYXRhLCBpbmZvKSB7XG4gIGxldCB0aW1lID0gcGFyc2VJbnQobmV3IERhdGUoKS5nZXRUaW1lKCkpO1xuICBsZXQgaW5mb2lkID0gdGltZSAtIChNYXRoLmZsb29yKHRpbWUgLyAxMGU4KSAqIDEwZTgpO1xuICB0aGlzLmluZm9saXN0W2luZm9pZF0gPSBpbmZvO1xuICB0aGlzLnN0cmVhbUJ1ZmZlci5zZXQoZGF0YSk7XG4gIE1vZHVsZS5fYnJvYWR3YXlQbGF5U3RyZWFtKGRhdGEubGVuZ3RoLCBpbmZvaWQpO1xufVxuXG5EZWNvZGVyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICBNb2R1bGUuX2Jyb2Fkd2F5RXhpdCgpO1xufVxuXG52YXIgZGVjb2RlcjtcblxuZnVuY3Rpb24gb25Qb3N0UnVuICgpIHtcbiAgZGVjb2RlciA9IG5ldyBEZWNvZGVyKHRoaXMpO1xuICBkZWNvZGVyLmluaXQoKTtcbn1cblxuZnVuY3Rpb24gaW5pdCAobWV0YSkge1xuICBzZWxmLmltcG9ydFNjcmlwdHMoJ2h0dHBzOi8vc2YxLXZjbG91ZGNkbi5wc3RhdHAuY29tL29iai90dGZlL21lZGlhL2RlY29kZXIvaDI2NC9kZWNvZGVyLmpzJyk7XG4gIGFkZE9uUG9zdFJ1bihvblBvc3RSdW4uYmluZChzZWxmKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNlbGYpIHtcbiAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgZGF0YSA9IGUuZGF0YTtcbiAgICBpZiAoIWRhdGEubXNnKSB7XG4gICAgICBzZWxmLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgbXNnOiAnRVJST1I6aW52YWxpZCBtZXNzYWdlJ1xuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpdGNoIChkYXRhLm1zZykge1xuICAgICAgICBjYXNlICdpbml0JzpcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICBzZWxmLm1ldGEgPSBkYXRhLm1ldGE7XG4gICAgICAgICAgaW5pdCgpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2RlY29kZSc6XG4gICAgICAgICAgZGVjb2Rlci5kZWNvZGUoZGF0YS5kYXRhLCBkYXRhLmluZm8pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdkZXN0b3J5JzpcbiAgICAgICAgICBkZWNvZGVyLmRlc3Ryb3koKTtcbiAgICAgICAgICBicmVha1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSwgZmFsc2UpO1xufVxuIiwiY2xhc3MgWVVWQ2FudmFzIHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZ3MpIHtcbiAgICB0aGlzLmNvbmZpZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWdzKTtcbiAgICB0aGlzLmNhbnZhcyA9IHRoaXMuY29uZmlncy5jYW52YXM7XG4gICAgdGhpcy5tZXRhID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jb25maWdzLm1ldGEpO1xuICAgIHRoaXMuY2hyb21hID0gdGhpcy5tZXRhLmNocm9tYUZvcm1hdDtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMubWV0YS5wcmVzZW50SGVpZ2h0O1xuICAgIHRoaXMud2lkdGggPSB0aGlzLm1ldGEucHJlc2VudFdpZHRoO1xuICAgIC8vIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy5tZXRhLnByZXNlbnRXaWR0aDtcbiAgICAvLyB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLm1ldGEucHJlc2VudEhlaWdodDtcbiAgICAvLyB0aGlzLmNhbnZhcy5zdHlsZS53aWR0aCA9IGNvbmZpZ3Muc3R5bGUud2lkdGg7XG4gICAgLy8gdGhpcy5jYW52YXMuc3R5bGUuaGVpZ2h0ID0gY29uZmlncy5zdHlsZS5oZWlnaHQ7XG4gICAgdGhpcy5faW5pdENvbnRleHRHTCgpO1xuICAgIGlmICh0aGlzLmNvbnRleHRHTCkge1xuICAgICAgdGhpcy5faW5pdFByb2dyYW0oKTtcbiAgICAgIHRoaXMuX2luaXRCdWZmZXJzKCk7XG4gICAgICB0aGlzLl9pbml0VGV4dHVyZXMoKTtcbiAgICB9O1xuICB9XG5cbiAgX2luaXRDb250ZXh0R0wgKCkge1xuICAgIHZhciBjYW52YXMgPSB0aGlzLmNhbnZhcztcbiAgICB2YXIgZ2wgPSBudWxsO1xuXG4gICAgdmFyIHZhbGlkQ29udGV4dE5hbWVzID0gWyd3ZWJnbCcsICdleHBlcmltZW50YWwtd2ViZ2wnLCAnbW96LXdlYmdsJywgJ3dlYmtpdC0zZCddO1xuICAgIHZhciBuYW1lSW5kZXggPSAwO1xuXG4gICAgd2hpbGUgKCFnbCAmJiBuYW1lSW5kZXggPCB2YWxpZENvbnRleHROYW1lcy5sZW5ndGgpIHtcbiAgICAgIHZhciBjb250ZXh0TmFtZSA9IHZhbGlkQ29udGV4dE5hbWVzW25hbWVJbmRleF07XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRleHRPcHRpb25zKSB7XG4gICAgICAgICAgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dChjb250ZXh0TmFtZSwgdGhpcy5jb250ZXh0T3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dChjb250ZXh0TmFtZSk7XG4gICAgICAgIH07XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGdsID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFnbCB8fCB0eXBlb2YgZ2wuZ2V0UGFyYW1ldGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGdsID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgKytuYW1lSW5kZXg7XG4gICAgfTtcblxuICAgIHRoaXMuY29udGV4dEdMID0gZ2w7XG4gIH07XG5cbiAgX2luaXRQcm9ncmFtICgpIHtcbiAgICB2YXIgZ2wgPSB0aGlzLmNvbnRleHRHTDtcblxuICAgIC8vIHZlcnRleCBzaGFkZXIgaXMgdGhlIHNhbWUgZm9yIGFsbCB0eXBlc1xuICAgIHZhciB2ZXJ0ZXhTaGFkZXJTY3JpcHQ7XG4gICAgdmFyIGZyYWdtZW50U2hhZGVyU2NyaXB0O1xuICAgIHZlcnRleFNoYWRlclNjcmlwdCA9IFtcbiAgICAgICdhdHRyaWJ1dGUgdmVjNCB2ZXJ0ZXhQb3M7JyxcbiAgICAgICdhdHRyaWJ1dGUgdmVjNCB0ZXh0dXJlUG9zOycsXG4gICAgICAnYXR0cmlidXRlIHZlYzQgdVRleHR1cmVQb3M7JyxcbiAgICAgICdhdHRyaWJ1dGUgdmVjNCB2VGV4dHVyZVBvczsnLFxuICAgICAgJ3ZhcnlpbmcgdmVjMiB0ZXh0dXJlQ29vcmQ7JyxcbiAgICAgICd2YXJ5aW5nIHZlYzIgdVRleHR1cmVDb29yZDsnLFxuICAgICAgJ3ZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkOycsXG5cbiAgICAgICd2b2lkIG1haW4oKScsXG4gICAgICAneycsXG4gICAgICAnICBnbF9Qb3NpdGlvbiA9IHZlcnRleFBvczsnLFxuICAgICAgJyAgdGV4dHVyZUNvb3JkID0gdGV4dHVyZVBvcy54eTsnLFxuICAgICAgJyAgdVRleHR1cmVDb29yZCA9IHVUZXh0dXJlUG9zLnh5OycsXG4gICAgICAnICB2VGV4dHVyZUNvb3JkID0gdlRleHR1cmVQb3MueHk7JyxcbiAgICAgICd9J1xuICAgIF0uam9pbignXFxuJyk7XG5cbiAgICBmcmFnbWVudFNoYWRlclNjcmlwdCA9IFtcbiAgICAgICdwcmVjaXNpb24gaGlnaHAgZmxvYXQ7JyxcbiAgICAgICd2YXJ5aW5nIGhpZ2hwIHZlYzIgdGV4dHVyZUNvb3JkOycsXG4gICAgICAndmFyeWluZyBoaWdocCB2ZWMyIHVUZXh0dXJlQ29vcmQ7JyxcbiAgICAgICd2YXJ5aW5nIGhpZ2hwIHZlYzIgdlRleHR1cmVDb29yZDsnLFxuICAgICAgJ3VuaWZvcm0gc2FtcGxlcjJEIHlTYW1wbGVyOycsXG4gICAgICAndW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7JyxcbiAgICAgICd1bmlmb3JtIHNhbXBsZXIyRCB2U2FtcGxlcjsnLFxuICAgICAgJ3VuaWZvcm0gbWF0NCBZVVYyUkdCOycsXG5cbiAgICAgICd2b2lkIG1haW4odm9pZCkgeycsXG4gICAgICAnICBoaWdocCBmbG9hdCB5ID0gdGV4dHVyZTJEKHlTYW1wbGVyLCAgdGV4dHVyZUNvb3JkKS5yOycsXG4gICAgICAnICBoaWdocCBmbG9hdCB1ID0gdGV4dHVyZTJEKHVTYW1wbGVyLCAgdVRleHR1cmVDb29yZCkucjsnLFxuICAgICAgJyAgaGlnaHAgZmxvYXQgdiA9IHRleHR1cmUyRCh2U2FtcGxlciwgIHZUZXh0dXJlQ29vcmQpLnI7JyxcbiAgICAgICcgIGdsX0ZyYWdDb2xvciA9IHZlYzQoeSwgdSwgdiwgMSkgKiBZVVYyUkdCOycsXG4gICAgICAnfSdcbiAgICBdLmpvaW4oJ1xcbicpO1xuXG4gICAgdmFyIFlVVjJSR0IgPSBbXG4gICAgICAxLjE2NDM4LCAwLjAwMDAwLCAxLjU5NjAzLCAtMC44NzA3OSxcbiAgICAgIDEuMTY0MzgsIC0wLjM5MTc2LCAtMC44MTI5NywgMC41Mjk1OSxcbiAgICAgIDEuMTY0MzgsIDIuMDE3MjMsIDAuMDAwMDAsIC0xLjA4MTM5LFxuICAgICAgMCwgMCwgMCwgMVxuICAgIF07XG4gICAgdmFyIHZlcnRleFNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcbiAgICBnbC5zaGFkZXJTb3VyY2UodmVydGV4U2hhZGVyLCB2ZXJ0ZXhTaGFkZXJTY3JpcHQpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIodmVydGV4U2hhZGVyKTtcbiAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcih2ZXJ0ZXhTaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgY29uc29sZS5sb2coJ1ZlcnRleCBzaGFkZXIgZmFpbGVkIHRvIGNvbXBpbGU6ICcgKyBnbC5nZXRTaGFkZXJJbmZvTG9nKHZlcnRleFNoYWRlcikpO1xuICAgIH1cblxuICAgIHZhciBmcmFnbWVudFNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihnbC5GUkFHTUVOVF9TSEFERVIpO1xuICAgIGdsLnNoYWRlclNvdXJjZShmcmFnbWVudFNoYWRlciwgZnJhZ21lbnRTaGFkZXJTY3JpcHQpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIoZnJhZ21lbnRTaGFkZXIpO1xuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKGZyYWdtZW50U2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdGcmFnbWVudCBzaGFkZXIgZmFpbGVkIHRvIGNvbXBpbGU6ICcgKyBnbC5nZXRTaGFkZXJJbmZvTG9nKGZyYWdtZW50U2hhZGVyKSk7XG4gICAgfVxuXG4gICAgdmFyIHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHZlcnRleFNoYWRlcik7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcbiAgICBnbC5saW5rUHJvZ3JhbShwcm9ncmFtKTtcbiAgICBpZiAoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpKSB7XG4gICAgICBjb25zb2xlLmxvZygnUHJvZ3JhbSBmYWlsZWQgdG8gY29tcGlsZTogJyArIGdsLmdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pKTtcbiAgICB9XG5cbiAgICBnbC51c2VQcm9ncmFtKHByb2dyYW0pO1xuXG4gICAgdmFyIFlVVjJSR0JSZWYgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgJ1lVVjJSR0InKTtcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KFlVVjJSR0JSZWYsIGZhbHNlLCBZVVYyUkdCKTtcblxuICAgIHRoaXMuc2hhZGVyUHJvZ3JhbSA9IHByb2dyYW07XG4gIH1cblxuICBfaW5pdEJ1ZmZlcnMgKCkge1xuICAgIHZhciBnbCA9IHRoaXMuY29udGV4dEdMO1xuICAgIHZhciBwcm9ncmFtID0gdGhpcy5zaGFkZXJQcm9ncmFtO1xuXG4gICAgdmFyIHZlcnRleFBvc0J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2ZXJ0ZXhQb3NCdWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KFsxLCAxLCAtMSwgMSwgMSwgLTEsIC0xLCAtMV0pLCBnbC5TVEFUSUNfRFJBVyk7XG5cbiAgICB2YXIgdmVydGV4UG9zUmVmID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgJ3ZlcnRleFBvcycpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHZlcnRleFBvc1JlZik7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcih2ZXJ0ZXhQb3NSZWYsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG5cbiAgICB2YXIgdGV4dHVyZVBvc0J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0ZXh0dXJlUG9zQnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShbMSwgMCwgMCwgMCwgMSwgMSwgMCwgMV0pLCBnbC5TVEFUSUNfRFJBVyk7XG5cbiAgICB2YXIgdGV4dHVyZVBvc1JlZiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sICd0ZXh0dXJlUG9zJyk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGV4dHVyZVBvc1JlZik7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcih0ZXh0dXJlUG9zUmVmLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuXG4gICAgdGhpcy50ZXh0dXJlUG9zQnVmZmVyID0gdGV4dHVyZVBvc0J1ZmZlcjtcblxuICAgIHZhciB1VGV4dHVyZVBvc0J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB1VGV4dHVyZVBvc0J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDAsIDEsIDEsIDAsIDFdKSwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgdmFyIHVUZXh0dXJlUG9zUmVmID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgJ3VUZXh0dXJlUG9zJyk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodVRleHR1cmVQb3NSZWYpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodVRleHR1cmVQb3NSZWYsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG5cbiAgICB0aGlzLnVUZXh0dXJlUG9zQnVmZmVyID0gdVRleHR1cmVQb3NCdWZmZXI7XG5cbiAgICB2YXIgdlRleHR1cmVQb3NCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdlRleHR1cmVQb3NCdWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KFsxLCAwLCAwLCAwLCAxLCAxLCAwLCAxXSksIGdsLlNUQVRJQ19EUkFXKTtcblxuICAgIHZhciB2VGV4dHVyZVBvc1JlZiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sICd2VGV4dHVyZVBvcycpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHZUZXh0dXJlUG9zUmVmKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHZUZXh0dXJlUG9zUmVmLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuXG4gICAgdGhpcy52VGV4dHVyZVBvc0J1ZmZlciA9IHZUZXh0dXJlUG9zQnVmZmVyO1xuICB9O1xuXG4gIF9pbml0VGV4dHVyZXMgKCkge1xuICAgIHZhciBnbCA9IHRoaXMuY29udGV4dEdMO1xuICAgIHZhciBwcm9ncmFtID0gdGhpcy5zaGFkZXJQcm9ncmFtO1xuICAgIHZhciB5VGV4dHVyZVJlZiA9IHRoaXMuX2luaXRUZXh0dXJlKCk7XG4gICAgdmFyIHlTYW1wbGVyUmVmID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sICd5U2FtcGxlcicpO1xuICAgIGdsLnVuaWZvcm0xaSh5U2FtcGxlclJlZiwgMCk7XG4gICAgdGhpcy55VGV4dHVyZVJlZiA9IHlUZXh0dXJlUmVmO1xuXG4gICAgdmFyIHVUZXh0dXJlUmVmID0gdGhpcy5faW5pdFRleHR1cmUoKTtcbiAgICB2YXIgdVNhbXBsZXJSZWYgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgJ3VTYW1wbGVyJyk7XG4gICAgZ2wudW5pZm9ybTFpKHVTYW1wbGVyUmVmLCAxKTtcbiAgICB0aGlzLnVUZXh0dXJlUmVmID0gdVRleHR1cmVSZWY7XG5cbiAgICB2YXIgdlRleHR1cmVSZWYgPSB0aGlzLl9pbml0VGV4dHVyZSgpO1xuICAgIHZhciB2U2FtcGxlclJlZiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCAndlNhbXBsZXInKTtcbiAgICBnbC51bmlmb3JtMWkodlNhbXBsZXJSZWYsIDIpO1xuICAgIHRoaXMudlRleHR1cmVSZWYgPSB2VGV4dHVyZVJlZjtcbiAgfVxuXG4gIF9pbml0VGV4dHVyZSAoKSB7XG4gICAgdmFyIGdsID0gdGhpcy5jb250ZXh0R0w7XG5cbiAgICB2YXIgdGV4dHVyZVJlZiA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlUmVmKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpO1xuXG4gICAgcmV0dXJuIHRleHR1cmVSZWY7XG4gIH1cblxuICBfZHJhd1BpY3R1cmVHTCAoZGF0YSwgd2lkdGgsIGhlaWdodCwgeUxpbmVzaXplLCB1dkxpbmVzaXplKSB7XG4gICAgdmFyIHlsZW4gPSB5TGluZXNpemUgKiBoZWlnaHQ7XG4gICAgdmFyIHV2bGVuID0gdXZMaW5lc2l6ZSAqIGhlaWdodCAvIDI7XG4gICAgaWYgKHRoaXMuY2hyb21hID09PSA0NDQgfHwgdGhpcy5jaHJvbWEgPT09IDQyMikge1xuICAgICAgdXZsZW4gKj0gMjtcbiAgICB9XG4gICAgZGF0YSA9IG5ldyBVaW50OEFycmF5KGRhdGEpO1xuICAgIGxldCByZW5kZXJEYXRhID0ge1xuICAgICAgeURhdGE6IGRhdGEuc3ViYXJyYXkoMCwgeWxlbiksXG4gICAgICB1RGF0YTogZGF0YS5zdWJhcnJheSh5bGVuLCB5bGVuICsgdXZsZW4pLFxuICAgICAgdkRhdGE6IGRhdGEuc3ViYXJyYXkoeWxlbiArIHV2bGVuLCB5bGVuICsgdXZsZW4gKyB1dmxlbilcbiAgICB9XG4gICAgdGhpcy5fZHJhd1BpY3R1cmVHTDQyMChyZW5kZXJEYXRhLCB3aWR0aCwgaGVpZ2h0LCB5TGluZXNpemUsIHV2TGluZXNpemUpO1xuICB9XG5cbiAgX2RyYXdQaWN0dXJlR0w0MjAgKGRhdGEsIHdpZHRoLCBoZWlnaHQsIHlMaW5lc2l6ZSwgdXZMaW5lc2l6ZSkge1xuICAgIHZhciBnbCA9IHRoaXMuY29udGV4dEdMO1xuICAgIHZhciB0ZXh0dXJlUG9zQnVmZmVyID0gdGhpcy50ZXh0dXJlUG9zQnVmZmVyO1xuICAgIHZhciB1VGV4dHVyZVBvc0J1ZmZlciA9IHRoaXMudVRleHR1cmVQb3NCdWZmZXI7XG4gICAgdmFyIHZUZXh0dXJlUG9zQnVmZmVyID0gdGhpcy52VGV4dHVyZVBvc0J1ZmZlcjtcblxuICAgIHZhciB5VGV4dHVyZVJlZiA9IHRoaXMueVRleHR1cmVSZWY7XG4gICAgdmFyIHVUZXh0dXJlUmVmID0gdGhpcy51VGV4dHVyZVJlZjtcbiAgICB2YXIgdlRleHR1cmVSZWYgPSB0aGlzLnZUZXh0dXJlUmVmO1xuXG4gICAgdmFyIHlEYXRhID0gZGF0YS55RGF0YTtcbiAgICB2YXIgdURhdGEgPSBkYXRhLnVEYXRhO1xuICAgIHZhciB2RGF0YSA9IGRhdGEudkRhdGE7XG5cbiAgICB2YXIgeURhdGFQZXJSb3cgPSB5TGluZXNpemU7XG4gICAgdmFyIHlSb3dDbnQgPSBoZWlnaHQ7XG5cbiAgICB2YXIgdURhdGFQZXJSb3cgPSB3aWR0aCAvIDI7XG4gICAgdmFyIHVSb3dDbnQgPSBoZWlnaHQgLyAyO1xuXG4gICAgaWYgKHRoaXMuY2hyb21hID09PSA0MjIgfHwgdGhpcy5jaHJvbWEgPT09IDQ0NCkge1xuICAgICAgdVJvd0NudCA9IGhlaWdodDtcbiAgICB9XG5cbiAgICB2YXIgdkRhdGFQZXJSb3cgPSB1dkxpbmVzaXplO1xuICAgIHZhciB2Um93Q250ID0gdVJvd0NudDtcblxuICAgIGxldCByYXRpb3cgPSB0aGlzLmNhbnZhcy53aWR0aCAvIHRoaXMud2lkdGg7XG4gICAgbGV0IHJhdGlvaCA9IHRoaXMuY2FudmFzLmhlaWdodCAvIHRoaXMuaGVpZ2h0O1xuICAgIGxldCBsZWZ0ID0gMDtcbiAgICBsZXQgdG9wID0gMDtcbiAgICBsZXQgdyA9IHRoaXMuY2FudmFzLndpZHRoO1xuICAgIGxldCBoID0gdGhpcy5jYW52YXMuaGVpZ2h0O1xuICAgIGlmIChyYXRpb3cgPCByYXRpb2gpIHtcbiAgICAgIGggPSAodGhpcy5oZWlnaHQgKiB0aGlzLmNhbnZhcy53aWR0aCAvIHRoaXMud2lkdGgpO1xuICAgICAgdG9wID0gcGFyc2VJbnQoKHRoaXMuY2FudmFzLmhlaWdodCAtICh0aGlzLmhlaWdodCAqIHRoaXMuY2FudmFzLndpZHRoIC8gdGhpcy53aWR0aCkpIC8gMik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHcgPSAodGhpcy53aWR0aCAqIHRoaXMuY2FudmFzLmhlaWdodCAvIHRoaXMuaGVpZ2h0KTtcbiAgICAgIGxlZnQgPSBwYXJzZUludCgodGhpcy5jYW52YXMud2lkdGggLSAodGhpcy53aWR0aCAqIHRoaXMuY2FudmFzLmhlaWdodCAvIHRoaXMuaGVpZ2h0KSkgLyAyKTtcbiAgICB9XG4gICAgZ2wudmlld3BvcnQobGVmdCwgdG9wLCB3LCBoKTtcblxuICAgIHZhciB0ZXh0dXJlUG9zVmFsdWVzID0gbmV3IEZsb2F0MzJBcnJheShbMSwgMCwgMCwgMCwgMSwgMSwgMCwgMV0pO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0ZXh0dXJlUG9zQnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdGV4dHVyZVBvc1ZhbHVlcywgZ2wuRFlOQU1JQ19EUkFXKTtcblxuICAgIHZhciB1VGV4dHVyZVBvc1ZhbHVlcyA9IG5ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDAsIDEsIDEsIDAsIDFdKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdVRleHR1cmVQb3NCdWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCB1VGV4dHVyZVBvc1ZhbHVlcywgZ2wuRFlOQU1JQ19EUkFXKTtcblxuICAgIHZhciB2VGV4dHVyZVBvc1ZhbHVlcyA9IG5ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDAsIDEsIDEsIDAsIDFdKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdlRleHR1cmVQb3NCdWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCB2VGV4dHVyZVBvc1ZhbHVlcywgZ2wuRFlOQU1JQ19EUkFXKTtcblxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHlUZXh0dXJlUmVmKTtcbiAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLkxVTUlOQU5DRSwgeURhdGFQZXJSb3csIHlSb3dDbnQsIDAsIGdsLkxVTUlOQU5DRSwgZ2wuVU5TSUdORURfQllURSwgeURhdGEpO1xuXG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMSk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdVRleHR1cmVSZWYpO1xuICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuTFVNSU5BTkNFLCB1RGF0YVBlclJvdywgdVJvd0NudCwgMCwgZ2wuTFVNSU5BTkNFLCBnbC5VTlNJR05FRF9CWVRFLCB1RGF0YSk7XG4gICAgXG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMik7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdlRleHR1cmVSZWYpO1xuICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuTFVNSU5BTkNFLCB2RGF0YVBlclJvdywgdlJvd0NudCwgMCwgZ2wuTFVNSU5BTkNFLCBnbC5VTlNJR05FRF9CWVRFLCB2RGF0YSk7XG5cbiAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFX1NUUklQLCAwLCA0KTtcbiAgfVxuXG4gIF9kcmF3UGljdHVyZVJHQiAoZGF0YSkge1xuXG4gIH1cblxuICByZW5kZXIgKGRhdGEsIHdpZHRoLCBoZWlnaHQsIHlMaW5lc2l6ZSwgdXZMaW5lc2l6ZSkge1xuICAgIHZhciBnbCA9IHRoaXMuY29udGV4dEdMO1xuICAgIGlmIChnbCkge1xuICAgICAgdGhpcy5fZHJhd1BpY3R1cmVHTChkYXRhLCB3aWR0aCwgaGVpZ2h0LCB5TGluZXNpemUsIHV2TGluZXNpemUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kcmF3UGljdHVyZVJHQihkYXRhKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgWVVWQ2FudmFzO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZVJhbmdlcyB7XG4gIGNvbnN0cnVjdG9yIChyYW5nZXMpIHtcbiAgICB0aGlzLnJhbmdlcyA9IHJhbmdlcyB8fCBbXTtcbiAgfVxuXG4gIHN0YXJ0IChpZHgpIHtcbiAgICByZXR1cm4gdGhpcy5yYW5nZXNbaWR4XSA/IHRoaXMucmFuZ2VzW2lkeF0uc3RhcnQgOiAwXG4gIH1cblxuICBlbmQgKGlkeCkge1xuICAgIHJldHVybiB0aGlzLnJhbmdlc1tpZHhdID8gdGhpcy5yYW5nZXNbaWR4XS5lbmQgOiAwXG4gIH1cblxuICBhZGQgKHJhbmdlKSB7XG4gICAgdGhpcy5yYW5nZXMucHVzaChyYW5nZSlcbiAgfVxuXG4gIGdldCBsZW5ndGggKCkge1xuICAgIHJldHVybiB0aGlzLnJhbmdlcy5sZW5ndGhcbiAgfVxufVxuIiwiY29uc3QgaXNPYmplY3RGaWxsZWQgPSAob2JqKSA9PiB7XG4gIGZvciAobGV0IGtleSBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGlmIChvYmpba2V5XSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVkaWFJbmZvIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMubWltZVR5cGUgPSBudWxsXG4gICAgdGhpcy5kdXJhdGlvbiA9IG51bGxcblxuICAgIHRoaXMuaGFzVmlkZW8gPSBudWxsXG4gICAgdGhpcy52aWRlbyA9IHtcbiAgICAgIGNvZGVjOiBudWxsLFxuICAgICAgd2lkdGg6IG51bGwsXG4gICAgICBoZWlnaHQ6IG51bGwsXG4gICAgICBwcm9maWxlOiBudWxsLFxuICAgICAgbGV2ZWw6IG51bGwsXG4gICAgICBmcmFtZVJhdGU6IHtcbiAgICAgICAgZml4ZWQ6IHRydWUsXG4gICAgICAgIGZwczogMjUsXG4gICAgICAgIGZwc19udW06IDI1MDAwLFxuICAgICAgICBmcHNfZGVuOiAxMDAwXG4gICAgICB9LFxuICAgICAgY2hyb21hRm9ybWF0OiBudWxsLFxuICAgICAgcGFyUmF0aW86IHtcbiAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgIGhlaWdodDogMVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaGFzQXVkaW8gPSBudWxsXG5cbiAgICB0aGlzLmF1ZGlvID0ge1xuICAgICAgY29kZWM6IG51bGwsXG4gICAgICBzYW1wbGVSYXRlOiBudWxsLFxuICAgICAgc2FtcGxlUmF0ZUluZGV4OiBudWxsLFxuICAgICAgY2hhbm5lbENvdW50OiBudWxsXG4gICAgfVxuICB9XG5cbiAgaXNDb21wbGV0ZSAoKSB7XG4gICAgcmV0dXJuIE1lZGlhSW5mby5pc0Jhc2VJbmZvUmVhZHkodGhpcykgJiYgTWVkaWFJbmZvLmlzVmlkZW9SZWFkeSh0aGlzKSAmJiBNZWRpYUluZm8uaXNBdWRpb1JlYWR5KHRoaXMpXG4gIH1cblxuICBzdGF0aWMgaXNCYXNlSW5mb1JlYWR5IChtZWRpYUluZm8pIHtcbiAgICByZXR1cm4gaXNPYmplY3RGaWxsZWQobWVkaWFJbmZvKVxuICB9XG5cbiAgc3RhdGljIGlzVmlkZW9SZWFkeSAobWVkaWFJbmZvKSB7XG4gICAgaWYgKCFtZWRpYUluZm8uaGFzVmlkZW8pIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgcmV0dXJuIGlzT2JqZWN0RmlsbGVkKG1lZGlhSW5mby52aWRlbylcbiAgfVxuXG4gIHN0YXRpYyBpc0F1ZGlvUmVhZHkgKG1lZGlhSW5mbykge1xuICAgIGlmICghbWVkaWFJbmZvLmhhc0F1ZGlvKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHJldHVybiBpc09iamVjdEZpbGxlZChtZWRpYUluZm8udmlkZW8pXG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lZGlhU2FtcGxlIHtcbiAgY29uc3RydWN0b3IgKGluZm8pIHtcbiAgICBsZXQgX2RlZmF1bHQgPSBNZWRpYVNhbXBsZS5nZXREZWZhdWx0SW5mKClcblxuICAgIGlmICghaW5mbyB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5mbykgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICByZXR1cm4gX2RlZmF1bHRcbiAgICB9XG4gICAgbGV0IHNhbXBsZSA9IE9iamVjdC5hc3NpZ24oe30sIF9kZWZhdWx0LCBpbmZvKVxuXG4gICAgT2JqZWN0LmVudHJpZXMoc2FtcGxlKS5mb3JFYWNoKChbaywgdl0pID0+IHtcbiAgICAgIHRoaXNba10gPSB2XG4gICAgfSlcbiAgfVxuXG4gIHN0YXRpYyBnZXREZWZhdWx0SW5mICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZHRzOiBudWxsLFxuICAgICAgcHRzOiBudWxsLFxuICAgICAgZHVyYXRpb246IG51bGwsXG4gICAgICBwb3NpdGlvbjogbnVsbCxcbiAgICAgIGlzUkFQOiBmYWxzZSwgLy8gaXMgUmFuZG9tIGFjY2VzcyBwb2ludFxuICAgICAgb3JpZ2luRHRzOiBudWxsXG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNZWRpYVNlZ21lbnRMaXN0IHtcblxuICAgIGNvbnN0cnVjdG9yICh0eXBlKSB7XG4gICAgICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLl9saXN0ID0gW107XG4gICAgICAgIHRoaXMuX2xhc3RBcHBlbmRMb2NhdGlvbiA9IC0xOyAvLyBjYWNoZWQgbGFzdCBpbnNlcnQgbG9jYXRpb25cbiAgICB9XG5cbiAgICBnZXQgdHlwZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90eXBlO1xuICAgIH1cblxuICAgIGdldCBsZW5ndGggKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGlzdC5sZW5ndGg7XG4gICAgfVxuXG4gICAgaXNFbXB0eSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0Lmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICBjbGVhciAoKSB7XG4gICAgICAgIHRoaXMuX2xpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5fbGFzdEFwcGVuZExvY2F0aW9uID0gLTE7XG4gICAgfVxuXG4gICAgX3NlYXJjaE5lYXJlc3RTZWdtZW50QmVmb3JlIChiZWdpbkR0cykge1xuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuX2xpc3Q7XG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIC0yO1xuICAgICAgICB9XG4gICAgICAgIGxldCBsYXN0ID0gbGlzdC5sZW5ndGggLSAxO1xuICAgICAgICBsZXQgbWlkID0gMDtcbiAgICAgICAgbGV0IGxib3VuZCA9IDA7XG4gICAgICAgIGxldCB1Ym91bmQgPSBsYXN0O1xuXG4gICAgICAgIGxldCBpZHggPSAwO1xuXG4gICAgICAgIGlmIChiZWdpbkR0cyA8IGxpc3RbMF0ub3JpZ2luRHRzKSB7XG4gICAgICAgICAgICBpZHggPSAtMTtcbiAgICAgICAgICAgIHJldHVybiBpZHg7XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAobGJvdW5kIDw9IHVib3VuZCkge1xuICAgICAgICAgICAgbWlkID0gbGJvdW5kICsgTWF0aC5mbG9vcigodWJvdW5kIC0gbGJvdW5kKSAvIDIpO1xuICAgICAgICAgICAgaWYgKG1pZCA9PT0gbGFzdCB8fCAoYmVnaW5EdHMgPiBsaXN0W21pZF0ubGFzdFNhbXBsZS5vcmlnaW5EdHNcbiAgICAgICAgICAgICAgICAgICAgJiYgKGJlZ2luRHRzIDwgbGlzdFttaWQgKyAxXS5vcmlnaW5EdHMpKSkge1xuICAgICAgICAgICAgICAgIGlkeCA9IG1pZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGlzdFttaWRdLm9yaWdpbkR0cyA8IGJlZ2luRHRzKSB7XG4gICAgICAgICAgICAgICAgbGJvdW5kID0gbWlkICsgMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdWJvdW5kID0gbWlkIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaWR4O1xuICAgIH1cblxuICAgIF9zZWFyY2hOZWFyZXN0U2VnbWVudEFmdGVyIChiZWdpbkR0cykge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUoYmVnaW5EdHMpICsgMTtcbiAgICB9XG5cbiAgICBhcHBlbmQgKHNlZ21lbnQpIHtcbiAgICAgICAgbGV0IGxpc3QgPSB0aGlzLl9saXN0O1xuICAgICAgICBsZXQgbGFzdEFwcGVuZElkeCA9IHRoaXMuX2xhc3RBcHBlbmRMb2NhdGlvbjtcbiAgICAgICAgbGV0IGluc2VydElkeCA9IDA7XG5cbiAgICAgICAgaWYgKGxhc3RBcHBlbmRJZHggIT09IC0xICYmIGxhc3RBcHBlbmRJZHggPCBsaXN0Lmxlbmd0aFxuICAgICAgICAgICAgJiYgc2VnbWVudC5vcmlnaW5TdGFydER0cyA+PSBsaXN0W2xhc3RBcHBlbmRJZHhdLmxhc3RTYW1wbGUub3JpZ2luRHRzXG4gICAgICAgICAgICAmJiAoKGxhc3RBcHBlbmRJZHggPT09IGxpc3QubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgICAgICB8fCAobGFzdEFwcGVuZElkeCA8IGxpc3QubGVuZ3RoIC0gMVxuICAgICAgICAgICAgICAgICAgICAmJiBzZWdtZW50Lm9yaWdpblN0YXJ0RHRzIDwgbGlzdFtsYXN0QXBwZW5kSWR4ICsgMV0ub3JpZ2luU3RhcnREdHMpKSkge1xuICAgICAgICAgICAgaW5zZXJ0SWR4ID0gbGFzdEFwcGVuZElkeCArIDE7IC8vIHVzZSBjYWNoZWQgbG9jYXRpb24gaWR4XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAobGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaW5zZXJ0SWR4ID0gdGhpcy5fc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUoc2VnbWVudC5vcmlnaW5TdGFydER0cykgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbGFzdEFwcGVuZExvY2F0aW9uID0gaW5zZXJ0SWR4O1xuICAgICAgICB0aGlzLl9saXN0LnNwbGljZShpbnNlcnRJZHgsIDAsIHNlZ21lbnQpO1xuICAgIH1cblxuICAgIGdldExhc3RTZWdtZW50QmVmb3JlIChiZWdpbkR0cykge1xuICAgICAgICBsZXQgaWR4ID0gdGhpcy5fc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUoYmVnaW5EdHMpO1xuICAgICAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0W2lkeF07XG4gICAgICAgIH0gZWxzZSB7IC8vIC0xXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldExhc3RTYW1wbGVCZWZvcmUgKGJlZ2luRHRzKSB7XG4gICAgICAgIGxldCBzZWdtZW50ID0gdGhpcy5nZXRMYXN0U2VnbWVudEJlZm9yZShiZWdpbkR0cyk7XG4gICAgICAgIGlmIChzZWdtZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VnbWVudC5sYXN0U2FtcGxlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRMYXN0UkFQQmVmb3JlIChiZWdpbkR0cykge1xuICAgICAgICBsZXQgc2VnbWVudElkeCA9IHRoaXMuX3NlYXJjaE5lYXJlc3RTZWdtZW50QmVmb3JlKGJlZ2luRHRzKTtcbiAgICAgICAgbGV0IHJhbmRvbUFjY2Vzc1BvaW50cyA9IHRoaXMuX2xpc3Rbc2VnbWVudElkeF0ucmFuZG9tQWNjZXNzUG9pbnRzO1xuICAgICAgICB3aGlsZSAocmFuZG9tQWNjZXNzUG9pbnRzLmxlbmd0aCA9PT0gMCAmJiBzZWdtZW50SWR4ID4gMCkge1xuICAgICAgICAgICAgc2VnbWVudElkeC0tO1xuICAgICAgICAgICAgcmFuZG9tQWNjZXNzUG9pbnRzID0gdGhpcy5fbGlzdFtzZWdtZW50SWR4XS5yYW5kb21BY2Nlc3NQb2ludHM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhbmRvbUFjY2Vzc1BvaW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gcmFuZG9tQWNjZXNzUG9pbnRzW3JhbmRvbUFjY2Vzc1BvaW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVkaWFTZWdtZW50IHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHRoaXMuc3RhcnREdHMgPSAtMTtcbiAgICAgICAgdGhpcy5lbmREdHMgPSAtMTtcbiAgICAgICAgdGhpcy5zdGFydFB0cyA9IC0xO1xuICAgICAgICB0aGlzLmVuZFB0cyA9IC0xO1xuICAgICAgICB0aGlzLm9yaWdpblN0YXJ0RHRzID0gLTE7XG4gICAgICAgIHRoaXMub3JpZ2luRW5kRHRzID0gLTE7XG4gICAgICAgIHRoaXMucmFuZG9tQWNjZXNzUG9pbnRzID0gW107XG4gICAgICAgIHRoaXMuZmlyc3RTYW1wbGUgPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RTYW1wbGUgPSBudWxsO1xuICAgIH1cblxuICAgIGFkZFJBUCAoc2FtcGxlKSB7XG4gICAgICAgIHNhbXBsZS5pc1JBUCA9IHRydWU7XG4gICAgICAgIHRoaXMucmFuZG9tQWNjZXNzUG9pbnRzLnB1c2goc2FtcGxlKTtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIEF1ZGlvVHJhY2tNZXRhIHtcbiAgY29uc3RydWN0b3IgKG1ldGEpIHtcbiAgICBjb25zdCBfZGVmYXVsdCA9IHtcbiAgICAgIHNhbXBsZVJhdGU6IDQ4MDAwLFxuICAgICAgY2hhbm5lbENvdW50OiAyLFxuICAgICAgY29kZWM6ICdtcDRhLjQwLjInLFxuICAgICAgY29uZmlnOiBbNDEsIDQwMSwgMTM2LCAwXSxcbiAgICAgIGR1cmF0aW9uOiAwLFxuICAgICAgaWQ6IDIsXG4gICAgICByZWZTYW1wbGVEdXJhdGlvbjogMjEsXG4gICAgICBzYW1wbGVSYXRlSW5kZXg6IDMsXG4gICAgICB0aW1lc2NhbGU6IDEwMDAsXG4gICAgICB0eXBlOiAnYXVkaW8nXG4gICAgfVxuICAgIGlmIChtZXRhKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgX2RlZmF1bHQsIG1ldGEpXG4gICAgfVxuICAgIHJldHVybiBfZGVmYXVsdFxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5pbml0ID0gbnVsbFxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWaWRlb1RyYWNrTWV0YSB7XG4gIGNvbnN0cnVjdG9yIChtZXRhKSB7XG4gICAgY29uc3QgX2RlZmF1bHQgPSB7XG4gICAgICBhdmNjOiBudWxsLFxuICAgICAgc3BzOiBuZXcgVWludDhBcnJheSgwKSxcbiAgICAgIHBwczogbmV3IFVpbnQ4QXJyYXkoMCksXG4gICAgICBjaHJvbWFGb3JtYXQ6IDQyMCxcbiAgICAgIGNvZGVjOiAnYXZjMS42NDAwMjAnLFxuICAgICAgY29kZWNIZWlnaHQ6IDcyMCxcbiAgICAgIGNvZGVjV2lkdGg6IDEyODAsXG4gICAgICBkdXJhdGlvbjogMCxcbiAgICAgIGZyYW1lUmF0ZToge1xuICAgICAgICBmaXhlZDogdHJ1ZSxcbiAgICAgICAgZnBzOiAyNSxcbiAgICAgICAgZnBzX251bTogMjUwMDAsXG4gICAgICAgIGZwc19kZW46IDEwMDBcbiAgICAgIH0sXG4gICAgICBpZDogMSxcbiAgICAgIGxldmVsOiAnMy4yJyxcbiAgICAgIHByZXNlbnRIZWlnaHQ6IDcyMCxcbiAgICAgIHByZXNlbnRXaWR0aDogMTI4MCxcbiAgICAgIHByb2ZpbGU6ICdIaWdoJyxcbiAgICAgIHJlZlNhbXBsZUR1cmF0aW9uOiA0MCxcbiAgICAgIHBhclJhdGlvOiB7XG4gICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgd2lkdGg6IDFcbiAgICAgIH0sXG4gICAgICB0aW1lc2NhbGU6IDEwMDAsXG4gICAgICB0eXBlOiAndmlkZW8nXG4gICAgfVxuXG4gICAgaWYgKG1ldGEpIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBfZGVmYXVsdCwgbWV0YSlcbiAgICB9XG4gICAgcmV0dXJuIF9kZWZhdWx0XG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmluaXQgPSBudWxsXG4gICAgdGhpcy5zcHMgPSBudWxsXG4gICAgdGhpcy5wcHMgPSBudWxsXG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBBdWRpb1RyYWNrU2FtcGxlIHtcbiAgY29uc3RydWN0b3IgKGluZm8pIHtcbiAgICBsZXQgX2RlZmF1bHQgPSBBdWRpb1RyYWNrU2FtcGxlLmdldERlZmF1bHQoKVxuICAgIGlmICghaW5mbykge1xuICAgICAgcmV0dXJuIF9kZWZhdWx0XG4gICAgfVxuICAgIGxldCBzYW1wbGUgPSBPYmplY3QuYXNzaWduKHt9LCBfZGVmYXVsdCwgaW5mbylcblxuICAgIHJldHVybiBzYW1wbGVcbiAgfVxuXG4gIHN0YXRpYyBnZXREZWZhdWx0ICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZHRzOiBudWxsLFxuICAgICAgcHRzOiBudWxsLFxuICAgICAgZGF0YTogbmV3IFVpbnQ4QXJyYXkoKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVmlkZW9UcmFja1NhbXBsZSB7XG4gIGNvbnN0cnVjdG9yIChpbmZvKSB7XG4gICAgbGV0IF9kZWZhdWx0ID0gVmlkZW9UcmFja1NhbXBsZS5nZXREZWZhdWx0KClcblxuICAgIGlmICghaW5mbykge1xuICAgICAgcmV0dXJuIF9kZWZhdWx0XG4gICAgfVxuICAgIGxldCBzYW1wbGUgPSBPYmplY3QuYXNzaWduKHt9LCBfZGVmYXVsdCwgaW5mbylcblxuICAgIHJldHVybiBzYW1wbGVcbiAgfVxuXG4gIHN0YXRpYyBnZXREZWZhdWx0ICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZHRzOiBudWxsLFxuICAgICAgcHRzOiBudWxsLFxuICAgICAgaXNLZXlmcmFtZTogZmFsc2UsIC8vIGlzIFJhbmRvbSBhY2Nlc3MgcG9pbnRcbiAgICAgIG9yaWdpbkR0czogbnVsbCxcbiAgICAgIGRhdGE6IG5ldyBVaW50OEFycmF5KClcbiAgICB9XG4gIH1cbn1cbiIsImNsYXNzIE1TRSB7XG4gIGNvbnN0cnVjdG9yIChjb25maWdzKSB7XG4gICAgdGhpcy5jb25maWdzID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlncyk7XG4gICAgdGhpcy5jb250YWluZXIgPSB0aGlzLmNvbmZpZ3MuY29udGFpbmVyO1xuICAgIHRoaXMubWVkaWFTb3VyY2UgPSBudWxsO1xuICAgIHRoaXMuc291cmNlQnVmZmVycyA9IHt9O1xuICAgIHRoaXMucHJlbG9hZFRpbWUgPSB0aGlzLmNvbmZpZ3MucHJlbG9hZFRpbWUgfHwgMTtcbiAgICB0aGlzLm9uU291cmNlT3BlbiA9IHRoaXMub25Tb3VyY2VPcGVuLmJpbmQodGhpcylcbiAgICB0aGlzLm9uVGltZVVwZGF0ZSA9IHRoaXMub25UaW1lVXBkYXRlLmJpbmQodGhpcylcbiAgICB0aGlzLm9uVXBkYXRlRW5kID0gdGhpcy5vblVwZGF0ZUVuZC5iaW5kKHRoaXMpXG4gICAgdGhpcy5vbldhaXRpbmcgPSB0aGlzLm9uV2FpdGluZy5iaW5kKHRoaXMpXG4gIH1cblxuICBpbml0ICgpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICB0aGlzLm1lZGlhU291cmNlID0gbmV3IHNlbGYuTWVkaWFTb3VyY2UoKTtcbiAgICB0aGlzLm1lZGlhU291cmNlLmFkZEV2ZW50TGlzdGVuZXIoJ3NvdXJjZW9wZW4nLCB0aGlzLm9uU291cmNlT3Blbik7XG4gICAgdGhpcy5jb250YWluZXIuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTCh0aGlzLm1lZGlhU291cmNlKTtcbiAgICB0aGlzLnVybCA9IHRoaXMuY29udGFpbmVyLnNyYztcbiAgICB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgdGhpcy5vblRpbWVVcGRhdGUpO1xuICAgIHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3dhaXRpbmcnLCB0aGlzLm9uV2FpdGluZyk7XG4gIH1cblxuICBvblRpbWVVcGRhdGUgKCkge1xuICAgIHRoaXMuZW1pdCgnVElNRV9VUERBVEUnLCB0aGlzLmNvbnRhaW5lcik7XG4gIH1cblxuICBvbldhaXRpbmcgKCkge1xuICAgIHRoaXMuZW1pdCgnV0FJVElORycsIHRoaXMuY29udGFpbmVyKTtcbiAgfVxuXG4gIG9uU291cmNlT3BlbiAoKSB7XG4gICAgdGhpcy5hZGRTb3VyY2VCdWZmZXJzKCk7XG4gIH1cblxuICBvblVwZGF0ZUVuZCAoKSB7XG4gICAgdGhpcy5lbWl0KCdTT1VSQ0VfVVBEQVRFX0VORCcpO1xuICAgIHRoaXMuZG9BcHBlbmQoKVxuICB9XG4gIGFkZFNvdXJjZUJ1ZmZlcnMgKCkge1xuICAgIGlmICh0aGlzLm1lZGlhU291cmNlLnJlYWR5U3RhdGUgIT09ICdvcGVuJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgc291cmNlcyA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1BSRV9TT1VSQ0VfQlVGRkVSJyk7XG4gICAgbGV0IHRyYWNrcyA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpO1xuICAgIGxldCB0cmFjaztcblxuICAgIHNvdXJjZXMgPSBzb3VyY2VzLnNvdXJjZXM7XG4gICAgbGV0IGFkZCA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwLCBrID0gT2JqZWN0LmtleXMoc291cmNlcykubGVuZ3RoOyBpIDwgazsgaSsrKSB7XG4gICAgICBsZXQgdHlwZSA9IE9iamVjdC5rZXlzKHNvdXJjZXMpW2ldO1xuICAgICAgaWYgKHR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgICAgdHJhY2sgPSB0cmFja3MuYXVkaW9UcmFjaztcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICB0cmFjayA9IHRyYWNrcy52aWRlb1RyYWNrO1xuICAgICAgICAvLyByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodHJhY2spIHtcbiAgICAgICAgbGV0IGR1ciA9IHR5cGUgPT09ICdhdWRpbycgPyAyMSA6IDQwO1xuICAgICAgICBpZiAodHJhY2subWV0YSAmJiB0cmFjay5tZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSBkdXIgPSB0cmFjay5tZXRhLnJlZlNhbXBsZUR1cmF0aW9uO1xuICAgICAgICBpZiAoc291cmNlc1t0eXBlXS5kYXRhLmxlbmd0aCA+PSAodGhpcy5wcmVsb2FkVGltZSAvIGR1cikpIHtcbiAgICAgICAgICBhZGQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGFkZCkge1xuICAgICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycykubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gMCwgayA9IE9iamVjdC5rZXlzKHNvdXJjZXMpLmxlbmd0aDsgaSA8IGs7IGkrKykge1xuICAgICAgICBsZXQgdHlwZSA9IE9iamVjdC5rZXlzKHNvdXJjZXMpW2ldO1xuICAgICAgICBsZXQgc291cmNlID0gc291cmNlc1t0eXBlXVxuICAgICAgICBsZXQgbWltZSA9ICh0eXBlID09PSAndmlkZW8nKSA/ICd2aWRlby9tcDQ7Y29kZWNzPScgKyBzb3VyY2UubWltZXR5cGUgOiAnYXVkaW8vbXA0O2NvZGVjcz0nICsgc291cmNlLm1pbWV0eXBlXG4gICAgICAgIGxldCBzb3VyY2VCdWZmZXIgPSB0aGlzLm1lZGlhU291cmNlLmFkZFNvdXJjZUJ1ZmZlcihtaW1lKTtcbiAgICAgICAgdGhpcy5zb3VyY2VCdWZmZXJzW3R5cGVdID0gc291cmNlQnVmZmVyO1xuICAgICAgICBzb3VyY2VCdWZmZXIuYWRkRXZlbnRMaXN0ZW5lcigndXBkYXRlZW5kJywgdGhpcy5vblVwZGF0ZUVuZCk7XG4gICAgICAgIHRoaXMuZG9BcHBlbmQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkb0FwcGVuZCAoKSB7XG4gICAgbGV0IHNvdXJjZXMgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdQUkVfU09VUkNFX0JVRkZFUicpO1xuICAgIGlmIChzb3VyY2VzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE9iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycykubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHR5cGUgPSBPYmplY3Qua2V5cyh0aGlzLnNvdXJjZUJ1ZmZlcnMpW2ldXG4gICAgICAgIGxldCBzb3VyY2VCdWZmZXIgPSB0aGlzLnNvdXJjZUJ1ZmZlcnNbdHlwZV07XG4gICAgICAgIGlmICghc291cmNlQnVmZmVyLnVwZGF0aW5nKSB7XG4gICAgICAgICAgbGV0IHNvdXJjZSA9IHNvdXJjZXMuc291cmNlc1t0eXBlXTtcbiAgICAgICAgICBpZiAoc291cmNlICYmICFzb3VyY2UuaW5pdGVkKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnYXBwZW5kIGluaXRpYWwgc2VnbWVudCcpXG4gICAgICAgICAgICBzb3VyY2VCdWZmZXIuYXBwZW5kQnVmZmVyKHNvdXJjZS5pbml0LmJ1ZmZlci5idWZmZXIpO1xuICAgICAgICAgICAgc291cmNlLmluaXRlZCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gc291cmNlLmRhdGEuc2hpZnQoKVxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgc291cmNlQnVmZmVyLmFwcGVuZEJ1ZmZlcihkYXRhLmJ1ZmZlci5idWZmZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGVuZE9mU3RyZWFtICgpIHtcbiAgICBjb25zdCB7IHJlYWR5U3RhdGUsIGFjdGl2ZVNvdXJjZUJ1ZmZlcnMgfSA9IHRoaXMubWVkaWFTb3VyY2U7XG4gICAgaWYgKHJlYWR5U3RhdGUgPT09ICdvcGVuJyAmJiBhY3RpdmVTb3VyY2VCdWZmZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5tZWRpYVNvdXJjZS5lbmRPZlN0cmVhbSgpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGxvZ1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZSAoZW5kLCBzdGFydCA9IDApIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE9iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycykubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBidWZmZXIgPSB0aGlzLnNvdXJjZUJ1ZmZlcnNbT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKVtpXV07XG4gICAgICBpZiAoIWJ1ZmZlci51cGRhdGluZykge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhzdGFydCwgZW5kKVxuICAgICAgICBidWZmZXIucmVtb3ZlKHN0YXJ0LCBlbmQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZW1vdmVCdWZmZXJzICgpIHtcbiAgICBjb25zdCB0YXNrTGlzdCA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBPYmplY3Qua2V5cyh0aGlzLnNvdXJjZUJ1ZmZlcnMpLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYnVmZmVyID0gdGhpcy5zb3VyY2VCdWZmZXJzW09iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycylbaV1dO1xuICAgICAgYnVmZmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3VwZGF0ZWVuZCcsIHRoaXMub25VcGRhdGVFbmQpO1xuXG4gICAgICBsZXQgdGFzaztcbiAgICAgIGlmIChidWZmZXIudXBkYXRpbmcpIHtcbiAgICAgICAgdGFzayA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgY29uc3QgZG9DbGVhbkJ1ZmZlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCByZXRyeVRpbWUgPSAzXG5cbiAgICAgICAgICAgIGNvbnN0IGNsZWFuID0gKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWJ1ZmZlci51cGRhdGluZykge1xuICAgICAgICAgICAgICAgIE1TRS5jbGVhckJ1ZmZlcihidWZmZXIpXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAocmV0cnlUaW1lID4gMCl7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChjbGVhbiwgMjAwKVxuICAgICAgICAgICAgICAgIHJldHJ5VGltZS0tXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2V0VGltZW91dChjbGVhbiwgMjAwKVxuICAgICAgICAgICAgYnVmZmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3VwZGF0ZWVuZCcsIGRvQ2xlYW5CdWZmZXIpXG4gICAgICAgICAgfVxuICAgICAgICAgIGJ1ZmZlci5hZGRFdmVudExpc3RlbmVyKCd1cGRhdGVlbmQnLCBkb0NsZWFuQnVmZmVyKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgTVNFLmNsZWFyQnVmZmVyKGJ1ZmZlcilcbiAgICAgICAgdGFzayA9IFByb21pc2UucmVzb2x2ZSgpXG4gICAgICB9XG5cbiAgICAgIHRhc2tMaXN0LnB1c2godGFzaylcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwodGFza0xpc3QpXG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICByZXR1cm4gdGhpcy5yZW1vdmVCdWZmZXJzKCkudGhlbigoKSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE9iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycykubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IHRoaXMuc291cmNlQnVmZmVyc1tPYmplY3Qua2V5cyh0aGlzLnNvdXJjZUJ1ZmZlcnMpW2ldXTtcbiAgICAgICAgdGhpcy5tZWRpYVNvdXJjZS5yZW1vdmVTb3VyY2VCdWZmZXIoYnVmZmVyKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuc291cmNlQnVmZmVyc1tPYmplY3Qua2V5cyh0aGlzLnNvdXJjZUJ1ZmZlcnMpW2ldXTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndGltZXVwZGF0ZScsIHRoaXMub25UaW1lVXBkYXRlKTtcbiAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3dhaXRpbmcnLCB0aGlzLm9uV2FpdGluZyk7XG4gICAgICB0aGlzLm1lZGlhU291cmNlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3NvdXJjZW9wZW4nLCB0aGlzLm9uU291cmNlT3Blbik7XG5cbiAgICAgIHRoaXMuZW5kT2ZTdHJlYW0oKVxuICAgICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwodGhpcy51cmwpO1xuXG4gICAgICB0aGlzLnVybCA9IG51bGxcbiAgICAgIHRoaXMuY29uZmlncyA9IHt9O1xuICAgICAgdGhpcy5jb250YWluZXIgPSBudWxsO1xuICAgICAgdGhpcy5tZWRpYVNvdXJjZSA9IG51bGw7XG4gICAgICB0aGlzLnNvdXJjZUJ1ZmZlcnMgPSB7fTtcbiAgICAgIHRoaXMucHJlbG9hZFRpbWUgPSAxO1xuICAgIH0pXG4gIH1cblxuICBzdGF0aWMgY2xlYXJCdWZmZXIgKGJ1ZmZlcikge1xuICAgIGNvbnN0IGJ1ZmZlcmVkID0gYnVmZmVyLmJ1ZmZlcmVkO1xuICAgIGxldCBiRW5kID0gMC4xXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGJ1ZmZlcmVkLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBiRW5kID0gYnVmZmVyZWQuZW5kKGkpXG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBidWZmZXIucmVtb3ZlKDAsIGJFbmQpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gRE8gTk9USElOR1xuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgTVNFO1xuIiwiaW1wb3J0IENvbmNhdCBmcm9tICdjb25jYXQtdHlwZWQtYXJyYXknXG5cbmNsYXNzIEJ1ZmZlciB7XG4gIGNvbnN0cnVjdG9yIChidWZmZXIpIHtcbiAgICB0aGlzLmJ1ZmZlciA9IGJ1ZmZlciB8fCBuZXcgVWludDhBcnJheSgwKVxuICB9XG5cbiAgd3JpdGUgKC4uLmJ1ZmZlcikge1xuICAgIGJ1ZmZlci5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgdGhpcy5idWZmZXIgPSBDb25jYXQoVWludDhBcnJheSwgdGhpcy5idWZmZXIsIGl0ZW0pXG4gICAgfSlcbiAgfVxuXG4gIHN0YXRpYyB3cml0ZVVpbnQzMiAodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgdmFsdWUgPj4gMjQsXG4gICAgICAodmFsdWUgPj4gMTYpICYgMHhmZixcbiAgICAgICh2YWx1ZSA+PiA4KSAmIDB4ZmYsXG4gICAgICB2YWx1ZSAmIDB4ZmZcbiAgICBdKVxuICB9XG5cbiAgc3RhdGljIHJlYWRBc0ludCAoYXJyKSB7XG4gICAgbGV0IHRlbXAgPSAnJ1xuXG4gICAgZnVuY3Rpb24gcGFkU3RhcnQ0SGV4IChoZXhOdW0pIHtcbiAgICAgIGxldCBoZXhTdHIgPSBoZXhOdW0udG9TdHJpbmcoMTYpXG4gICAgICByZXR1cm4gaGV4U3RyLnBhZFN0YXJ0KDIsICcwJylcbiAgICB9XG5cbiAgICBhcnIuZm9yRWFjaChudW0gPT4ge1xuICAgICAgdGVtcCArPSBwYWRTdGFydDRIZXgobnVtKVxuICAgIH0pXG4gICAgcmV0dXJuIHBhcnNlSW50KHRlbXAsIDE2KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJ1ZmZlclxuIiwiY2xhc3MgU3RyZWFtIHtcbiAgY29uc3RydWN0b3IgKGJ1ZmZlcikge1xuICAgIGlmIChidWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgdGhpcy5idWZmZXIgPSBidWZmZXI7XG4gICAgICB0aGlzLmRhdGF2aWV3ID0gbmV3IERhdGFWaWV3KGJ1ZmZlcik7XG4gICAgICB0aGlzLmRhdGF2aWV3LnBvc2l0aW9uID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdkYXRhIGlzIGludmFsaWQnKTtcbiAgICB9XG4gIH1cblxuICBnZXQgbGVuZ3RoICgpIHtcbiAgICByZXR1cm4gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aDtcbiAgfVxuXG4gIHNldCBwb3NpdGlvbiAodmFsdWUpIHtcbiAgICB0aGlzLmRhdGF2aWV3LnBvc2l0aW9uID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcG9zaXRpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGF2aWV3LnBvc2l0aW9uO1xuICB9XG5cbiAgYmFjayAoY291bnQpIHtcbiAgICB0aGlzLnBvc2l0aW9uIC09IGNvdW50O1xuICB9XG5cbiAgc2tpcCAoY291bnQpIHtcbiAgICBsZXQgbG9vcCA9IE1hdGguZmxvb3IoY291bnQgLyA0KTtcbiAgICBsZXQgbGFzdCA9IGNvdW50ICUgNDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxvb3A7IGkrKykge1xuICAgICAgU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIDQpO1xuICAgIH1cbiAgICBpZiAobGFzdCA+IDApIHtcbiAgICAgIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCBsYXN0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogW3JlYWRCeXRlIOS7jkRhdGFWaWV35Lit6K+75Y+W5pWw5o2uXVxuICAgKiBAcGFyYW0gIHtEYXRhVmlld30gYnVmZmVyIFtEYXRhVmlld+WunuS+i11cbiAgICogQHBhcmFtICB7TnVtYmVyfSBzaXplICAgW+ivu+WPluWtl+iKguaVsF1cbiAgICogQHJldHVybiB7TnVtYmVyfSAgICAgICAgW+aVtOaVsF1cbiAgICovXG4gIHN0YXRpYyByZWFkQnl0ZSAoYnVmZmVyLCBzaXplLCBzaWduKSB7XG4gICAgbGV0IHJlcztcbiAgICBzd2l0Y2ggKHNpemUpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaWYgKHNpZ24pIHtcbiAgICAgICAgICByZXMgPSBidWZmZXIuZ2V0SW50OChidWZmZXIucG9zaXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRVaW50OChidWZmZXIucG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBpZiAoc2lnbikge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRJbnQxNihidWZmZXIucG9zaXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRVaW50MTYoYnVmZmVyLnBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaWYgKHNpZ24pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBzdXBwb3J0ZWQgZm9yIHJlYWRCeXRlIDMnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXMgPSBidWZmZXIuZ2V0VWludDgoYnVmZmVyLnBvc2l0aW9uKSA8PCAxNjtcbiAgICAgICAgICByZXMgfD0gYnVmZmVyLmdldFVpbnQ4KGJ1ZmZlci5wb3NpdGlvbiArIDEpIDw8IDg7XG4gICAgICAgICAgcmVzIHw9IGJ1ZmZlci5nZXRVaW50OChidWZmZXIucG9zaXRpb24gKyAyKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgaWYgKHNpZ24pIHtcbiAgICAgICAgICByZXMgPSBidWZmZXIuZ2V0SW50MzIoYnVmZmVyLnBvc2l0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXMgPSBidWZmZXIuZ2V0VWludDMyKGJ1ZmZlci5wb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDg6XG4gICAgICAgIGlmIChzaWduKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3Qgc3VwcG9ydGVkIGZvciByZWFkQm9keSA4Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzID0gYnVmZmVyLmdldFVpbnQzMihidWZmZXIucG9zaXRpb24pIDw8IDMyO1xuICAgICAgICAgIHJlcyB8PSBidWZmZXIuZ2V0VWludDMyKGJ1ZmZlci5wb3NpdGlvbiArIDQpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmVzID0gJyc7XG4gICAgfVxuICAgIGJ1ZmZlci5wb3NpdGlvbiArPSBzaXplO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICByZWFkVWludDggKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgMSk7XG4gIH1cblxuICByZWFkVWludDE2ICgpIHtcbiAgICByZXR1cm4gU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIDIpO1xuICB9XG5cbiAgcmVhZFVpbnQyNCAoKSB7XG4gICAgcmV0dXJuIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCAzKTtcbiAgfVxuXG4gIHJlYWRVaW50MzIgKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgNCk7XG4gIH1cblxuICByZWFkVWludDY0ICgpIHtcbiAgICByZXR1cm4gU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIDgpO1xuICB9XG5cbiAgcmVhZEludDggKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgMSwgdHJ1ZSk7XG4gIH1cbiAgcmVhZEludDE2ICgpIHtcbiAgICByZXR1cm4gU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIDIsIHRydWUpO1xuICB9XG5cbiAgcmVhZEludDMyICgpIHtcbiAgICByZXR1cm4gU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIDQsIHRydWUpO1xuICB9XG5cbiAgd3JpdGVVaW50MzIgKHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFtcbiAgICAgIHZhbHVlID4+PiAyNCAmIDB4ZmYsXG4gICAgICB2YWx1ZSA+Pj4gMTYgJiAweGZmLFxuICAgICAgdmFsdWUgPj4+IDggJiAweGZmLFxuICAgICAgdmFsdWUgJiAweGZmXG4gICAgXSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RyZWFtO1xuIiwiaW1wb3J0IHsgRmV0Y2hMb2FkZXIgfSBmcm9tICd4Z3BsYXllci1sb2FkZXInXG5pbXBvcnQgeyBGbHZEZW11eGVyIH0gZnJvbSAneGdwbGF5ZXItZGVtdXgnXG5pbXBvcnQgeyBNcDRSZW11eGVyIH0gZnJvbSAneGdwbGF5ZXItcmVtdXgnXG5pbXBvcnQgeyBUcmFja3MsIFhnQnVmZmVyLCBQcmVTb3VyY2UgfSBmcm9tICd4Z3BsYXllci1idWZmZXInXG5pbXBvcnQgeyBFVkVOVFMsIFBhZ2VWaXNpYmlsaXR5IH0gZnJvbSAneGdwbGF5ZXItdXRpbHMnXG5pbXBvcnQgeyBDb21wYXRpYmlsaXR5IH0gZnJvbSAneGdwbGF5ZXItY29kZWMnXG5pbXBvcnQgUGxheWVyIGZyb20gJ3hncGxheWVyJ1xuXG5jb25zdCBERU1VWF9FVkVOVFMgPSBFVkVOVFMuREVNVVhfRVZFTlRTO1xuY29uc3QgTE9BREVSX0VWRU5UUyA9IEVWRU5UUy5MT0FERVJfRVZFTlRTXG5jb25zdCBCUk9XU0VSX0VWRU5UUyA9IEVWRU5UUy5CUk9XU0VSX0VWRU5UU1xuXG5jb25zdCBUYWcgPSAnRkxWQ29udHJvbGxlcidcblxuY2xhc3MgTG9nZ2VyIHtcbiAgd2FybiAoKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbHZDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IgKHBsYXllcikge1xuICAgIHRoaXMuVEFHID0gVGFnXG4gICAgdGhpcy5fcGxheWVyID0gcGxheWVyXG5cbiAgICB0aGlzLnZpZGVvID0gdGhpcy5fcGxheWVyLnZpZGVvO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpbml0U2VnbWVudEFycml2ZWQ6IGZhbHNlXG4gICAgfVxuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgdGhpcy5fY29udGV4dC5yZWdpc3RyeSgnRkVUQ0hfTE9BREVSJywgRmV0Y2hMb2FkZXIpXG4gICAgdGhpcy5fY29udGV4dC5yZWdpc3RyeSgnTE9BREVSX0JVRkZFUicsIFhnQnVmZmVyKVxuICAgIHRoaXMuX2NvbnRleHQucmVnaXN0cnkoJ1BSRV9TT1VSQ0VfQlVGRkVSJywgUHJlU291cmNlKVxuXG4gICAgdGhpcy5fY29udGV4dC5yZWdpc3RyeSgnRkxWX0RFTVVYRVInLCBGbHZEZW11eGVyKVxuXG4gICAgdGhpcy5fY29udGV4dC5yZWdpc3RyeSgnTVA0X1JFTVVYRVInLCBNcDRSZW11eGVyKVxuICAgIHRoaXMuX2NvbnRleHQucmVnaXN0cnkoJ1RSQUNLUycsIFRyYWNrcylcblxuICAgIHRoaXMuX2NvbnRleHQucmVnaXN0cnkoJ0NPTVBBVElCSUxJVFknLCBDb21wYXRpYmlsaXR5KVxuICAgIHRoaXMuX2NvbnRleHQucmVnaXN0cnkoJ1BBR0VfVklTSUJJTElUWScsIFBhZ2VWaXNpYmlsaXR5KVxuXG4gICAgdGhpcy5fY29udGV4dC5yZWdpc3RyeSgnTE9HR0VSJywgTG9nZ2VyKVxuXG4gICAgdGhpcy5pbml0TGlzdGVuZXJzKClcbiAgfVxuXG4gIGluaXRMaXN0ZW5lcnMgKCkge1xuICAgIHRoaXMub24oTE9BREVSX0VWRU5UUy5MT0FERVJfREFUQUxPQURFRCwgdGhpcy5faGFuZGxlTG9hZGVyRGF0YUxvYWRlZC5iaW5kKHRoaXMpKVxuICAgIHRoaXMub24oTE9BREVSX0VWRU5UUy5MT0FERVJfRVJST1IsIHRoaXMuX2hhbmRsZU5ldHdvcmtFcnJvci5iaW5kKHRoaXMpKVxuXG4gICAgdGhpcy5vbihERU1VWF9FVkVOVFMuTUVESUFfSU5GTywgdGhpcy5faGFuZGxlTWVkaWFJbmZvLmJpbmQodGhpcykpXG4gICAgdGhpcy5vbihERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCB0aGlzLl9oYW5kbGVNZXRhZGF0YVBhcnNlZC5iaW5kKHRoaXMpKVxuICAgIHRoaXMub24oREVNVVhfRVZFTlRTLkRFTVVYX0NPTVBMRVRFLCB0aGlzLl9oYW5kbGVEZW11eENvbXBsZXRlLmJpbmQodGhpcykpXG4gICAgdGhpcy5vbihERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIHRoaXMuX2hhbmRsZURlbXV4RXJyb3IuYmluZCh0aGlzKSlcblxuICB9XG5cbiAgX2hhbmRsZU1lZGlhSW5mbyAoKSB7XG4gICAgaWYgKCF0aGlzLl9jb250ZXh0Lm1lZGlhSW5mbykge1xuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgbmV3IEVycm9yKCdmYWlsZWQgdG8gZ2V0IG1lZGlhaW5mbycpKVxuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVMb2FkZXJEYXRhTG9hZGVkICgpIHtcbiAgICB0aGlzLmVtaXRUbygnRkxWX0RFTVVYRVInLCBERU1VWF9FVkVOVFMuREVNVVhfU1RBUlQpXG4gIH1cblxuICBfaGFuZGxlTWV0YWRhdGFQYXJzZWQgKHR5cGUpIHtcbiAgICBpZiAodHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgLy8g5bCG6Z+z6aKRbWV0YeS/oeaBr+S6pOe7mWF1ZGlvQ29udGV4dO+8jOS4jei1sHJlbXV45bCB6KOFXG4gICAgICBjb25zdCB7IGF1ZGlvVHJhY2sgfSA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpXG4gICAgICBpZiAoYXVkaW9UcmFjayAmJiBhdWRpb1RyYWNrLm1ldGEpIHtcbiAgICAgICAgdGhpcy5fc2V0TWV0YVRvQXVkaW8oYXVkaW9UcmFjay5tZXRhKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB7IHZpZGVvVHJhY2sgfSA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpXG4gICAgICBpZiAodmlkZW9UcmFjayAmJiB2aWRlb1RyYWNrLm1ldGEpIHtcbiAgICAgICAgdGhpcy5fc2V0TWV0YVRvVmlkZW8odmlkZW9UcmFjay5tZXRhKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVEZW11eENvbXBsZXRlICgpIHtcbiAgICBpZih0aGlzLl9wbGF5ZXIudmlkZW8pIHtcbiAgICAgIGNvbnN0IHsgdmlkZW9UcmFjaywgYXVkaW9UcmFjayB9ID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJyk7XG4gICAgICB0aGlzLl9wbGF5ZXIudmlkZW8ub25EZW11eENvbXBsZXRlKHZpZGVvVHJhY2ssIGF1ZGlvVHJhY2spO1xuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVBcHBlbmRJbml0U2VnbWVudCAoKSB7XG4gICAgdGhpcy5zdGF0ZS5pbml0U2VnbWVudEFycml2ZWQgPSB0cnVlXG4gIC8vICB0aGlzLm1zZS5hZGRTb3VyY2VCdWZmZXJzKClcbiAgfVxuXG5cbiAgX2hhbmRsZU5ldHdvcmtFcnJvciAoKSB7XG4gICAgdGhpcy5fcGxheWVyLmVtaXQoJ2Vycm9yJywgbmV3IFBsYXllci5FcnJvcnMoJ25ldHdvcmsnLCB0aGlzLl9wbGF5ZXIuY29uZmlnLnVybCkpXG4gIH1cblxuICBfaGFuZGxlRGVtdXhFcnJvciAoKSB7XG4gICAgdGhpcy5fcGxheWVyLmVtaXQoJ2Vycm9yJywgbmV3IFBsYXllci5FcnJvcnMoJ3BhcnNlJywgdGhpcy5fcGxheWVyLmNvbmZpZy51cmwpKVxuICB9XG5cblxuICBfc2V0TWV0YVRvQXVkaW8gKGF1ZGlvTWV0YSkge1xuICAgIGlmICh0aGlzLl9wbGF5ZXIudmlkZW8pIHtcbiAgICAgIHRoaXMuX3BsYXllci52aWRlby5zZXRBdWRpb01ldGEoYXVkaW9NZXRhKTtcbiAgICB9XG4gIH1cblxuICBfc2V0TWV0YVRvVmlkZW8gKHZpZGVvTWV0YSkge1xuICAgIGlmICh0aGlzLl9wbGF5ZXIudmlkZW8pIHtcbiAgICAgIHRoaXMuX3BsYXllci52aWRlby5zZXRWaWRlb01ldGEodmlkZW9NZXRhKTtcbiAgICB9XG4gIH1cblxuICBzZWVrICgpIHtcbiAgICBpZiAoIXRoaXMuc3RhdGUuaW5pdFNlZ21lbnRBcnJpdmVkKSB7XG4gICAgICB0aGlzLmxvYWREYXRhKClcbiAgICB9XG4gIH1cblxuICBsb2FkRGF0YSAoKSB7XG4gICAgdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTEFERVJfU1RBUlQsIHRoaXMuX3BsYXllci5jb25maWcudXJsKVxuICB9XG5cbiAgcGF1c2UgKCkge1xuICAgIGNvbnN0IGxvYWRlciA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ0ZFVENIX0xPQURFUicpXG5cbiAgICBpZiAobG9hZGVyKSB7XG4gICAgICBsb2FkZXIuY2FuY2VsKClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog5L+d6K+B5b2T5YmN5pKt5pS+55qE6KeG6aKR5LulZ29w5Li65Y2V5L2NXG4gICAqIEBwYXJhbSB2aWRlb1RyYWNrXG4gICAqL1xuICBzdGF0aWMgcmVzb2x2ZVZpZGVvR09QICh2aWRlb1RyYWNrKSB7XG4gICAgY29uc3QgeyBzYW1wbGVzIH0gPSB2aWRlb1RyYWNrO1xuICAgIGlmICghc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgZmlyc3RJZnJhbWVJZHggPSBudWxsXG4gICAgbGV0IGxhc3RJZnJhbWVJZHggPSBudWxsXG5cbiAgICBpZiAodmlkZW9UcmFjay50ZW1wU2FtcGxlcyAmJiB2aWRlb1RyYWNrLnRlbXBTYW1wbGVzLmxlbmd0aCkge1xuICAgICAgLy8g5bCG57yT5a2Y5bin5pS+572u5Yiw6Zif5YiX55qE5aS06YOoXG4gICAgICBzYW1wbGVzLnVuc2hpZnQuYXBwbHkoc2FtcGxlcywgdmlkZW9UcmFjay50ZW1wU2FtcGxlcyk7XG4gICAgfVxuXG4gICAgLy8g5a+75om+56ys5LiA5LiqSeW4p1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzYW1wbGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50ID0gc2FtcGxlc1tpXTtcbiAgICAgIGlmIChjdXJyZW50LmlzS2V5ZnJhbWUpIHtcbiAgICAgICAgZmlyc3RJZnJhbWVJZHggPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDlr7vmib7mnIDlkI7kuIDkuKpJ5binXG4gICAgZm9yIChsZXQgaSA9IHNhbXBsZXMubGVuZ3RoIC0gMTsgaSA+IDA7IGkrKykge1xuICAgICAgY29uc3QgY3VycmVudCA9IHNhbXBsZXNbaV1cblxuICAgICAgaWYgKGN1cnJlbnQuaXNLZXlmcmFtZSkge1xuICAgICAgICBsYXN0SWZyYW1lSWR4ID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGZpcnN0SWZyYW1lSWR4ICE9PSAwKSB7XG4gICAgICBzYW1wbGVzLnNwbGljZSgwLCBmaXJzdElmcmFtZUlkeCAtIDEpXG4gICAgfVxuXG4gICAgdmlkZW9UcmFjay5zYW1wbGVzID0gc2FtcGxlcy5zbGljZSgwLCBsYXN0SWZyYW1lSWR4KVxuICAgIGNvbnN0IHJlc3QgPSBzYW1wbGVzLnNsaWNlKGxhc3RJZnJhbWVJZHgpXG4gICAgaWYgKHZpZGVvVHJhY2sudGVtcFNhbXBsZXMpIHtcbiAgICAgIHZpZGVvVHJhY2sudGVtcFNhbXBsZXMucHVzaC5hcHBseSh2aWRlb1RyYWNrLnRlbXBTYW1wbGVzLCByZXN0KVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyDlsIbliankuIvnmoTluKfnvJPlrZjvvIznrYnlvoXkuIDkuKrlrozmlbTnmoRnb3BcbiAgICAgIHZpZGVvVHJhY2sudGVtcFNhbXBsZXMgPSByZXN0XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gJ3hncGxheWVyJ1xuaW1wb3J0IHsgQ29udGV4dCwgRVZFTlRTIH0gZnJvbSAneGdwbGF5ZXItdXRpbHMnO1xuaW1wb3J0IEZMViBmcm9tICcuL2Zsdi1saXZlLW1vYmlsZSdcbmNvbnN0IGZsdkFsbG93ZWRFdmVudHMgPSBFVkVOVFMuRmx2QWxsb3dlZEV2ZW50cztcblxuY2xhc3MgRmx2UGxheWVyIGV4dGVuZHMgUGxheWVyIHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZykge1xuICAgIGlmICghY29uZmlnLm1lZGlhVHlwZSkge1xuICAgICAgY29uZmlnLm1lZGlhVHlwZSA9ICdtb2JpbGUtdmlkZW8nXG4gICAgfVxuICAgIHN1cGVyKGNvbmZpZylcbiAgICB0aGlzLnZpZGVvLndpZHRoID0gTnVtYmVyLnBhcnNlSW50KGNvbmZpZy53aWR0aCB8fCA2MDApXG4gICAgdGhpcy52aWRlby5oZWlnaHQgPSBOdW1iZXIucGFyc2VJbnQoY29uZmlnLmhlaWdodCB8fCAzMzcuNSlcbiAgICB0aGlzLnZpZGVvLnN0eWxlLm91dGxpbmUgPSAnbm9uZSc7XG4gICAgdGhpcy5jb250ZXh0ID0gbmV3IENvbnRleHQoZmx2QWxsb3dlZEV2ZW50cylcbiAgICB0aGlzLmluaXRFdmVudHMoKVxuICB9XG5cbiAgc3RhcnQgKCkge1xuICAgIHRoaXMuaW5pdEZsdigpXG4gICAgdGhpcy5jb250ZXh0LmluaXQoKVxuICAgIHRoaXMuZmx2LnNlZWsoMCk7XG4gICAgc3VwZXIuc3RhcnQodGhpcy5jb25maWcudXJsKTtcbiAgICB0aGlzLnBsYXkoKTtcbiAgfVxuXG4gIGluaXRGbHZFdmVudHMgKGZsdikge1xuICAgIGNvbnN0IHBsYXllciA9IHRoaXM7XG4gICAgZmx2Lm9uY2UoRVZFTlRTLlJFTVVYX0VWRU5UUy5JTklUX1NFR01FTlQsICgpID0+IHtcbiAgICAgIFBsYXllci51dGlsLmFkZENsYXNzKHBsYXllci5yb290LCAneGdwbGF5ZXItaXMtbGl2ZScpXG4gICAgICBpZiAoIVBsYXllci51dGlsLmZpbmREb20odGhpcy5yb290LCAneGctbGl2ZScpKSB7XG4gICAgICAgIGNvbnN0IGxpdmUgPSBQbGF5ZXIudXRpbC5jcmVhdGVEb20oJ3hnLWxpdmUnLCAn5q2j5Zyo55u05pKtJywge30sICd4Z3BsYXllci1saXZlJylcbiAgICAgICAgcGxheWVyLmNvbnRyb2xzLmFwcGVuZENoaWxkKGxpdmUpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGZsdi5vbmNlKEVWRU5UUy5MT0FERVJfRVZFTlRTLkxPQURFUl9DT01QTEVURSwgKCkgPT4ge1xuICAgICAgLy8g55u05pKt5a6M5oiQ77yM5b6F5pKt5pS+5Zmo5pKt5a6M57yT5a2Y5ZCO5Y+R6YCB5YWz6Zet5LqL5Lu2XG4gICAgICBpZiAoIXBsYXllci5wYXVzZWQpIHtcbiAgICAgICAgY29uc3QgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgY29uc3QgZW5kID0gcGxheWVyLmdldEJ1ZmZlcmVkUmFuZ2UoKVsxXVxuICAgICAgICAgIGlmIChNYXRoLmFicyhwbGF5ZXIuY3VycmVudFRpbWUgLSBlbmQpIDwgMC41KSB7XG4gICAgICAgICAgICBwbGF5ZXIuZW1pdCgnZW5kZWQnKVxuICAgICAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGltZXIpXG4gICAgICAgICAgfVxuICAgICAgICB9LCAyMDApXG4gICAgICB9XG4gICAgfSlcbiAgICBmbHYub24oRVZFTlRTLkJST1dTRVJfRVZFTlRTLlZJU0lCSUxJVFlfQ0hBTkdFLCAoaGlkZGVuKSA9PiB7XG4gICAgICBpZiAoaGlkZGVuKSB7XG4gICAgICAgIHRoaXMucGF1c2UoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBpbml0RXZlbnRzICgpIHtcbiAgICB0aGlzLm9uKCd0aW1ldXBkYXRlJywgKCkgPT4ge1xuICAgICAgdGhpcy5sb2FkRGF0YSgpXG4gICAgfSlcblxuICAgIHRoaXMub24oJ3NlZWtpbmcnLCAoKSA9PiB7XG4gICAgICBjb25zdCB0aW1lID0gdGhpcy5jdXJyZW50VGltZVxuICAgICAgY29uc3QgcmFuZ2UgPSB0aGlzLmdldEJ1ZmZlcmVkUmFuZ2UoKVxuICAgICAgaWYgKHRpbWUgPiByYW5nZVsxXSB8fCB0aW1lIDwgcmFuZ2VbMF0pIHtcbiAgICAgICAgdGhpcy5mbHYuc2Vlayh0aGlzLmN1cnJlbnRUaW1lKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBpbml0Rmx2ICgpIHtcbiAgICBjb25zdCBmbHYgPSB0aGlzLmNvbnRleHQucmVnaXN0cnkoJ0ZMVl9DT05UUk9MTEVSJywgRkxWKSh0aGlzKVxuICAgIHRoaXMuaW5pdEZsdkV2ZW50cyhmbHYpXG4gICAgdGhpcy5mbHYgPSBmbHZcbiAgfVxuXG4gIHBsYXkgKCkge1xuICAgIGlmICh0aGlzLl9oYXNTdGFydCAmJiB0aGlzLnBhdXNlZCkge1xuICAgICAgdGhpcy5fZGVzdHJveSgpXG4gICAgICB0aGlzLmNvbnRleHQgPSBuZXcgQ29udGV4dChmbHZBbGxvd2VkRXZlbnRzKVxuICAgICAgY29uc3QgZmx2ID0gdGhpcy5jb250ZXh0LnJlZ2lzdHJ5KCdGTFZfQ09OVFJPTExFUicsIEZMVikodGhpcylcbiAgICAgIHRoaXMuaW5pdEZsdkV2ZW50cyhmbHYpXG4gICAgICB0aGlzLmZsdiA9IGZsdlxuICAgICAgdGhpcy5jb250ZXh0LmluaXQoKVxuICAgICAgdGhpcy5sb2FkRGF0YSgpXG4gICAgICBzdXBlci5zdGFydCgpXG4gICAgICBzdXBlci5wbGF5KClcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIucGxheSgpXG4gICAgICB0aGlzLmFkZExpdmVGbGFnKCk7XG4gICAgfVxuICB9XG5cbiAgcGF1c2UgKCkge1xuICAgIHN1cGVyLnBhdXNlKClcbiAgICBpZiAodGhpcy5mbHYpIHtcbiAgICAgIHRoaXMuZmx2LnBhdXNlKClcbiAgICB9XG4gIH1cblxuICBsb2FkRGF0YSAodGltZSA9IHRoaXMuY3VycmVudFRpbWUpIHtcbiAgICBpZiAodGhpcy5mbHYpIHtcbiAgICAgIHRoaXMuZmx2LnNlZWsodGltZSlcbiAgICB9XG4gIH1cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5fZGVzdHJveSgpXG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICB9XG5cbiAgYWRkTGl2ZUZsYWcgKCkge1xuICAgIGNvbnN0IHBsYXllciA9IHRoaXM7XG4gICAgUGxheWVyLnV0aWwuYWRkQ2xhc3MocGxheWVyLnJvb3QsICd4Z3BsYXllci1pcy1saXZlJylcbiAgICBpZiAoIVBsYXllci51dGlsLmZpbmREb20odGhpcy5yb290LCAneGctbGl2ZScpKSB7XG4gICAgICBjb25zdCBsaXZlID0gUGxheWVyLnV0aWwuY3JlYXRlRG9tKCd4Zy1saXZlJywgJ+ato+WcqOebtOaSrScsIHt9LCAneGdwbGF5ZXItbGl2ZScpXG4gICAgICBwbGF5ZXIuY29udHJvbHMuYXBwZW5kQ2hpbGQobGl2ZSlcbiAgICB9XG4gIH1cblxuICBfZGVzdHJveSAoKSB7XG4gICAgdGhpcy5jb250ZXh0LmRlc3Ryb3koKVxuICAgIHRoaXMuZmx2ID0gbnVsbFxuICAgIHRoaXMuY29udGV4dCA9IG51bGxcbiAgfVxuXG4gIGdldCBzcmMgKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRTcmNcbiAgfVxuXG4gIHNldCBzcmMgKHVybCkge1xuICAgIHRoaXMucGxheWVyLmNvbmZpZy51cmwgPSB1cmxcbiAgICBpZiAoIXRoaXMucGF1c2VkKSB7XG4gICAgICB0aGlzLnBhdXNlKClcbiAgICAgIHRoaXMub25jZSgncGF1c2UnLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3RhcnQodXJsKVxuICAgICAgfSlcbiAgICAgIHRoaXMub25jZSgnY2FucGxheScsICgpID0+IHtcbiAgICAgICAgdGhpcy5wbGF5KClcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhcnQodXJsKVxuICAgIH1cbiAgICB0aGlzLm9uY2UoJ2NhbnBsYXknLCAoKSA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRUaW1lID0gMFxuICAgIH0pXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGbHZQbGF5ZXJcbiIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJQbGF5ZXJcIl07IH0oKSk7Il0sInNvdXJjZVJvb3QiOiIifQ==