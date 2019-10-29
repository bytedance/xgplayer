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

const { REMUX_EVENTS } = _xgplayerUtils.EVENTS;

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
  }

  init() {
    this.before(REMUX_EVENTS.REMUX_MEDIA, this.doFix.bind(this));
  }

  reset() {
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
  }

  doFix() {
    const { isFirstAudioSamples, isFirstVideoSamples } = this.getFirstSample();

    this.removeInvalidSamples();

    this.recordSamplesCount();

    if (this._firstVideoSample) {
      this.fixRefSampleDuration(this.videoTrack.meta, this.videoTrack.samples);
    }
    if (this._firstAudioSample) {
      this.fixRefSampleDuration(this.audioTrack.meta, this.audioTrack.samples);
    }

    this.doFixVideo(isFirstVideoSamples);
    this.doFixAudio(isFirstAudioSamples);
  }

  doFixVideo(first) {
    let { samples: videoSamples, meta } = this.videoTrack;

    if (meta.frameRate && meta.frameRate.fixed === false) {
      return;
    }

    if (!videoSamples || !videoSamples.length || !this._firstVideoSample) {
      return;
    }

    // console.log(`video lastSample, ${videoSamples[videoSamples.length - 1].dts}`)

    const firstSample = videoSamples[0];
    const firstDts = firstSample.dts;

    const samplesLen = videoSamples.length;

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
      } else if (absGap <= 10 && absGap > 0) {
        // 当差距在+-一帧之间时将第一帧的dts强行定位到期望位置
        // console.log('重定位视频帧dts', videoSamples[0].dts, this.nextVideoDts)
        videoSamples[0].dts = this.nextVideoDts;
        videoSamples[0].originDts = videoSamples[0].dts;
        videoSamples[0].cts = videoSamples[0].cts || videoSamples[0].pts - videoSamples[0].dts;
        videoSamples[0].pts = videoSamples[0].dts + videoSamples[0].cts;
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

  doFixAudio(first) {
    let { samples: audioSamples, meta } = this.audioTrack;

    if (!audioSamples || !audioSamples.length) {
      return;
    }
    // console.log(`audio lastSample, ${audioSamples[audioSamples.length - 1].dts}`)

    const samplesLen = audioSamples.length;
    const silentFrame = _aacHelper2.default.getSilentFrame(meta.codec, meta.channelCount);

    const firstSample = this._firstAudioSample;

    // 对audioSamples按照dts做排序
    audioSamples = Compatibility.sortAudioSamples(audioSamples);

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
      } else if (absGap <= 10 && absGap > 0) {
        // 当差距比较小的时候将音频帧重定位
        // console.log('重定位音频帧dts', audioSamples[0].dts, this.nextAudioDts)
        audioSamples[0].dts = this.nextAudioDts;
        audioSamples[0].pts = this.nextAudioDts;
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
      if (samples.length >= 3) {
        const lastDts = samples[samples.length - 1].dts;
        const firstDts = samples[0].dts;
        const durationAvg = (lastDts - firstDts) / samples.length;

        meta.refSampleDuration = Math.abs(meta.refSampleDuration - durationAvg) <= meta.refSampleDuration ? meta.refSampleDuration : durationAvg; // 将refSampleDuration重置为计算后的平均值
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
    this._currentWord = new DataView(word.buffer).getUint32(0, false);

    this._bufferIndex += bytesRead;
    this._currentWordBitsLeft = bytesRead * 8;
  }

  readBits(bits) {
    if (bits > 32) {
      // TODO
    }

    if (bits <= this._currentWordBitsLeft) {
      let result = this._currentWord >>> 32 - bits;
      this._currentWord <<= bits;
      this._currentWordBitsLeft -= bits;
      return result;
    }

    let result = this._currentWordBitsLeft ? this._currentWord : 0;
    // eslint-disable-next-line
    result >>> 32 - this._currentWordBitsLeft;
    let bitsNeedLeft = bits - this._currentWordBitsLeft;

    this._fillCurrentWord();
    let bitsReadNext = Math.min(bitsNeedLeft, this._currentWordBitsLeft);

    let result2 = this._currentWord >>> 32 - bitsReadNext;
    this._currentWord <<= bitsReadNext;
    this._currentWordBitsLeft -= bitsReadNext;

    result = result << bitsReadNext | result2;
    return result;
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
      do {
        chunk = this._parseFlvTag();
      } while (chunk);

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
      this.logger.warn(this.TAG, 'tagType ' + chunk.tagType);
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
    } else if (userAgent.indexOf('android') !== -1) {
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
      meta = new _xgplayerUtils.AudioTrackMeta();
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

      const audioMedia = this._context.mediaInfo.audio;

      // fill audio media info
      audioMedia.codec = aacHeader.codec;
      audioMedia.channelCount = aacHeader.channelCount;
      audioMedia.sampleRate = audioSampleRate;
      audioMedia.sampleRateIndex = aacHeader.audioSampleRateIndex;

      if (this._hasScript && !this._hasAudioSequence) {
        this.emit(DEMUX_EVENTS.METADATA_PARSED, 'audio');
      } else if (this._hasScript && this._hasAudioSequence) {
        this.emit(DEMUX_EVENTS.AUDIO_METADATA_CHANGE);
      }
      ;
      this._hasAudioSequence = true;
    } else {
      chunk.data = chunk.data.slice(1, chunk.data.length);
      track.samples.push(chunk);
    }
    if (!validate) {
      const error = new Error('TAG length error at ' + chunk.datasize);
      this.emit(DEMUX_EVENTS.DEMUX_ERROR, error.message);
      this.logger.warn(this.TAG, error.message);
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
          this.logger.warn(this.TAG, `invalid video tag datasize: ${chunk.datasize}`);
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
          this.logger.warn(this.TAG, `invalid video tag datasize: ${chunk.datasize}`);
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
            this.emit(DEMUX_EVENTS.VIDEO_METADATA_CHANGE);
          }
          this._hasVideoSequence = true;
        }
      } else {
        if (!this._datasizeValidator(chunk.datasize)) {
          this.logger.warn(this.TAG, `invalid video tag datasize: ${chunk.datasize}`);
          return;
        }
        this.tracks.videoTrack.samples.push(chunk);
        // this.emit(DEMUX_EVENTS.DEMUX_COMPLETE)
      }
    } else {
      this.logger.warn(this.TAG, `video codeid is ${codecID}`);
      chunk.data = this.loaderBuffer.shift(chunk.datasize - 1);
      if (!this._datasizeValidator(chunk.datasize)) {
        this.logger.warn(this.TAG, `invalid video tag datasize: ${chunk.datasize}`);
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
    if (this._context.getInstance('LOADER_BUFFER')) {
      return this._context.getInstance('LOADER_BUFFER');
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
      // TODO:M3U格式错误。
      return null;
    }
    ref = refs.shift();
    while (ref) {
      let refm = ref.match(/#(.*):(.*)/);
      if (refm && refm.length > 2) {
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
          default:
            break;
        }
      }
      ref = refs.shift();
    }
    return ret;
  }

  static parseFrag(refm, refs, ret, baseurl) {
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

  demux() {
    if (this.demuxing) {
      return;
    }

    let buffer = this.inputBuffer;
    let frags = { pat: [], pmt: [] };
    let peses = {};

    // Read TS segment
    while (buffer.length >= 188) {
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

    // Get Frames data
    for (let i = 0; i < Object.keys(peses).length; i++) {
      let epeses = peses[Object.keys(peses)[i]];
      for (let j = 0; j < epeses.length; j++) {
        epeses[j].id = Object.keys(peses)[i];
        epeses[j].ES.buffer = TsDemuxer.Merge(epeses[j].ES.buffer);
        if (epeses[j].type === 'audio') {
          this.pushAudioSample(epeses[j]);
        } else if (epeses[j].type === 'video') {
          this.pushVideoSample(epeses[j]);
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

  pushAudioSample(pes) {
    let track;
    if (!this._tracks.audioTrack) {
      this._tracks.audioTrack = new _xgplayerBuffer.AudioTrack();
      track = this._tracks.audioTrack;
      track.meta = new _xgplayerUtils.AudioTrackMeta({
        audioSampleRate: pes.ES.frequence,
        sampleRate: pes.ES.frequence,
        channelCount: pes.ES.channel,
        codec: 'mp4a.40.' + pes.ES.audioObjectType,
        config: pes.ES.audioConfig,
        id: 2,
        sampleRateIndex: pes.ES.frequencyIndex
      });
      track.meta.refSampleDuration = Math.floor(1024 / track.meta.audioSampleRate * track.meta.timescale);
      if (!this._hasAudioMeta) {
        this._hasAudioMeta = true;
        this.emit(DEMUX_EVENTS.METADATA_PARSED, 'audio');
      }
    } else {
      track = this._tracks.audioTrack;
    }
    let data = new Uint8Array(pes.ES.buffer.buffer.slice(pes.ES.buffer.position, pes.ES.buffer.length));
    let dts = parseInt(pes.pts / 90);
    let pts = parseInt(pes.pts / 90);
    let sample = new _xgplayerUtils.AudioTrackSample({ dts, pts, data });
    track.samples.push(sample);
  }

  pushVideoSample(pes) {
    let nals = _xgplayerCodec.Nalunit.getNalunits(pes.ES.buffer);
    let track;
    if (!this._tracks.videoTrack) {
      this._tracks.videoTrack = new _xgplayerBuffer.VideoTrack();
      track = this._tracks.videoTrack;
      track.meta = new _xgplayerUtils.VideoTrackMeta();
    } else {
      track = this._tracks.videoTrack;
    }
    let sampleLength = 0;
    let sps = false;
    let pps = false;
    for (let i = 0; i < nals.length; i++) {
      let nal = nals[i];
      if (nal.sps) {
        // TODO：VideoTrack信息 和 Meta 信息
        if (track.sps && TsDemuxer.compaireUint8(nal.body, track.sps)) {
          continue;
        }

        sps = nal;
        track.sps = nal.body;
        track.meta.chromaFormat = sps.sps.chroma_format;
        track.meta.codec = 'avc1.';
        for (var j = 1; j < 4; j++) {
          var h = sps.body[j].toString(16);
          if (h.length < 2) {
            h = '0' + h;
          }
          track.meta.codec += h;
        }
        track.meta.codecHeight = sps.sps.codec_size.height;
        track.meta.codecWidth = sps.sps.codec_size.width;
        track.meta.frameRate = sps.sps.frame_rate;
        track.meta.id = 1;
        track.meta.level = sps.sps.level_string;
        track.meta.presentHeight = sps.sps.present_size.height;
        track.meta.presentWidth = sps.sps.present_size.width;
        track.meta.profile = sps.sps.profile_string;
        track.meta.refSampleDuration = Math.floor(track.meta.timescale * (sps.sps.frame_rate.fps_den / sps.sps.frame_rate.fps_num));
        track.meta.sarRatio = sps.sps.sar_ratio ? sps.sps.sar_ratio : sps.sps.par_ratio;
      } else if (nal.pps) {
        track.pps = nal.body;
        pps = nal;
      } else {
        sampleLength += 4 + nal.body.byteLength;
      }
    }

    if (sps && pps) {
      track.meta.avcc = _xgplayerCodec.Nalunit.getAvcc(sps.body, pps.body);
      if (!this._hasVideoMeta) {
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
      data
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

  static compaireUint8(a, b) {
    if (a.byteLength !== b.byteLength) {
      return false;
    }
    let ret = true;
    for (let i = 0; i < a.byteLength; i++) {
      if (a[i] !== b[i]) {
        ret = false;
      }
    }
    return ret;
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
      ret.audioConfig = TsDemuxer.getAudioConfig(ret.audioObjectType, ret.channel, ret.frequencyIndex);
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

  static getAudioConfig(audioObjectType, channel, sampleIndex) {
    let userAgent = navigator.userAgent.toLowerCase();
    let config;
    let extensionSampleIndex;
    if (/firefox/i.test(userAgent)) {
      if (sampleIndex >= 6) {
        audioObjectType = 5;
        config = new Array(4);
        extensionSampleIndex = sampleIndex - 3;
      } else {
        audioObjectType = 2;
        config = new Array(2);
        extensionSampleIndex = sampleIndex;
      }
    } else if (userAgent.indexOf('android') !== -1) {
      audioObjectType = 2;
      config = new Array(2);
      extensionSampleIndex = sampleIndex;
    } else {
      audioObjectType = 5;
      config = new Array(4);
      if (sampleIndex >= 6) {
        extensionSampleIndex = sampleIndex - 3;
      } else {
        if (channel === 1) {
          audioObjectType = 2;
          config = new Array(2);
        }
        extensionSampleIndex = sampleIndex;
      }
    }

    config[0] = audioObjectType << 3;
    config[0] |= (sampleIndex & 0x0e) >> 1;
    config[1] = (sampleIndex & 0x01) << 7;
    config[1] |= channel << 3;
    if (audioObjectType === 5) {
      config[1] |= (extensionSampleIndex & 0x0e) >> 1;
      config[2] = (extensionSampleIndex & 0x01) << 7;
      config[2] |= 2 << 2;
      config[3] = 0;
    }
    return config;
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

  push(ts, duration) {
    if (!this._ts[ts]) {
      this._ts[ts] = { duration: duration, downloaded: false, downloading: false, start: this.duration };
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
      return;
    }
    this.version = data.version;
    this.targetduration = data.targetduration;

    // 新分片信息
    if (data.sequence > this.sequence) {
      this.sequence = data.sequence;
      let newfraglist = [];
      for (let i = 0; i < data.frags.length; i++) {
        let frag = data.frags[i];
        if (!this._ts[frag.url]) {
          newfraglist.push(frag.url);
          this.push(frag.url, frag.duration);
        }
      }
      if (deletepre) {
        let tslist = this.getTsList();
        for (let i = 0; i < tslist.length; i++) {
          if (newfraglist.indexOf(tslist[i]) < 0) {
            this.deleteFrag(tslist[i]);
          }
        }
      }
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
      _this.emit(LOADER_EVENTS.LOADER_ERROR, _this, response);
      _this.loading = false;
    }).catch(function (error) {
      _this.emit(LOADER_EVENTS.LOADER_ERROR, _this, error);
      _this.loading = false;
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
            if (!_this._canceled) {
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
            if (!_this._canceled) {
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
            if (!_this._canceled) {
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

    if (!buffer) {
      this._reader.cancel();
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

      if (_this._canceled) {
        _this._reader.cancel();
        return;
      }
      buffer.push(val.value);
      _this.emit(LOADER_EVENTS.LOADER_DATALOADED, buffer);
      return _this._onReader(reader, taskno);
    }).catch(error => {
      console.error(error);
      _this.emit(LOADER_EVENTS.LOADER_ERROR, _this, error);
      _this.loading = false;
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
      this._reader.cancel();
      this._reader = null;
      this.loading = false;
      this._canceled = true;
    }
  }

  destroy() {
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

    this.videoAllDuration = 0;
    this.audioAllDuration = 0;
  }

  init() {
    this.on(REMUX_EVENTS.REMUX_MEDIA, this.remux.bind(this));
    this.on(REMUX_EVENTS.REMUX_METADATA, this.onMetaDataReady.bind(this));
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

  seek() {}

  onMetaDataReady(type) {
    let initSegment = new _xgplayerUtils.Buffer();
    let ftyp = _fmp2.default.ftyp();
    let moov;
    let track;

    if (type === 'audio') {
      const { audioTrack } = this._context.getInstance('TRACKS');
      track = audioTrack;
    } else {
      const { videoTrack } = this._context.getInstance('TRACKS');
      track = videoTrack;
    }

    moov = _fmp2.default.moov({ type, meta: track.meta });

    initSegment.write(ftyp, moov);

    let presourcebuffer = this._context.getInstance('PRE_SOURCE_BUFFER');
    let source = presourcebuffer.getSource(type);
    if (!source) {
      source = presourcebuffer.createSource(type);
    }

    source.mimetype = track.meta.codec;
    source.init = initSegment;
    this.emit(REMUX_EVENTS.INIT_SEGMENT, type);
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

    const mp4Samples = [];
    const mdatBox = {
      samples: []
    };

    while (samples.length) {
      const avcSample = samples.shift();
      const { isKeyframe } = avcSample;
      let dts = avcSample.dts - this._dtsBase;

      if (firstDts === -1) {
        firstDts = dts;
      }

      let cts;
      let pts;
      if (avcSample.pts) {
        pts = avcSample.pts - this._dtsBase;
        cts = pts - dts;
      }
      if (avcSample.cts) {
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

    const moof = _fmp2.default.moof({
      id: track.meta.id,
      time: firstDts,
      samples: mp4Samples
    });
    const mdat = _fmp2.default.mdat(mdatBox);
    moofMdat.write(moof, mdat);

    track.samples = [];
    track.length = 0;

    let presourcebuffer = this._context.getInstance('PRE_SOURCE_BUFFER');
    let source = presourcebuffer.getSource('video');
    if (!source) {
      source = presourcebuffer.createSource('video');
    }

    source.data.push(moofMdat);

    this.emit(REMUX_EVENTS.MEDIA_SEGMENT, 'video');
  }

  _remuxAudio(track) {
    const { samples } = track;
    let firstDts = -1;
    let mp4Samples = [];

    const mdatBox = {
      samples: []
    };
    if (!samples || !samples.length) {
      return;
    }
    let isFirstDtsInited = false;
    while (samples.length) {
      let sample = samples.shift();
      const { data } = sample;
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
    const moof = _fmp2.default.moof({
      id: track.meta.id,
      time: firstDts,
      samples: mp4Samples
    });
    const mdat = _fmp2.default.mdat(mdatBox);
    moofMdat.write(moof, mdat);

    track.samples = [];
    track.length = 0;

    let presourcebuffer = this._context.getInstance('PRE_SOURCE_BUFFER');
    let source = presourcebuffer.getSource('audio');
    if (!source) {
      source = presourcebuffer.createSource('audio');
    }
    source.data.push(moofMdat);
    this.emit(REMUX_EVENTS.MEDIA_SEGMENT, 'audio', moofMdat);
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

  MobileVideo: __webpack_require__(/*! ./src/mobile/mobile-video */ "../xgplayer-utils/src/mobile/mobile-video.js")
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
  INIT_SEGMENT: 'INIT_SEGMENT'
};

const MSE_EVENTS = {
  SOURCE_UPDATE_END: 'SOURCE_UPDATE_END'

  // hls专有events
};const HLS_EVENTS = {
  RETRY_TIME_EXCEEDED: 'RETRY_TIME_EXCEEDED'
};

const ALLEVENTS = Object.assign({}, LOADER_EVENTS, DEMUX_EVENTS, REMUX_EVENTS, MSE_EVENTS, HLS_EVENTS);

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
  HlsAllowedEvents
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
    if (this._instanceMap[tag]) {
      return this._instanceMap[tag];
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

        const beforeList = self._hooks[messageName];
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

        // step2 release from context
        delete self._instanceMap[tag];
        if (super.destroy) {
          super.destroy();
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
class AudioCtx {
  constructor(config) {
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
    // 记录外部传输的状态
    this._played = false;
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
        audioSource.onended = _this.onSourceEnded.bind(_this);
        _this.samples.push({
          time: _this.duration,
          duration: buffer.duration,
          data: audioSource
        });

        _this.duration += buffer.duration;

        if (!_this._currentBuffer) {
          _this._currentBuffer = _this.getTimeBuffer(_this.currentTime);

          if (_this._played) {
            _this.play();
          }
        }

        if (!_this._nextBuffer && _this._currentBuffer) {
          _this._nextBuffer = _this.getTimeBuffer(_this.currentTime + _this._currentBuffer.duration);
        }
        _this._decoding = false;

        if ((_this._preDecode.length > 0 && _this._preDecode[_this._preDecode.length - 1].pts - _this._lastpts) / 1000 >= _this.preloadTime) {
          _this.decodeAAC();
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  onSourceEnded() {
    if (!this._nextBuffer || !this._played) {
      return;
    }
    let audioSource = this._nextBuffer.data;
    audioSource.start();
    audioSource.connect(this.gainNode);
    this._currentBuffer = this._nextBuffer;
    this._currentTime = this._currentBuffer.time;
    this._nextBuffer = this.getTimeBuffer(this.currentTime);
    if (this._currentBuffer) {
      this._nextBuffer = this.getTimeBuffer(this.currentTime + this._currentBuffer.duration);
    }
  }

  play() {
    this._played = true;
    if (!this._currentBuffer) {
      return;
    }
    let audioSource = this._currentBuffer.data;
    audioSource.connect(this.gainNode);
    audioSource.start();
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

    //sampleFrequencyIndex
    adts[2] = adts[2] | 0x3c & meta.sampleRateIndex << 2;

    //private bit 0 1bit
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

    this.timeoutId = null;
  }

  doReconcile() {
    const vCurTime = this.vCtx.currentTime || 0;
    const aCurTime = (this.aCtx.currentTime || 0) * 1000;

    const gap = vCurTime - aCurTime;
    if (this.timeoutId) {
      return;
    }
    if (gap > 2000) {// audio delayed for more than 100ms
      // this.vCtx.pause()
      // this.timeoutId = setTimeout(() => {
      //   this.vCtx.play()
      //   this.timeoutId = null
      // }, gap)
    } else if (gap < -200) {
      this.vCtx.currentTime = this.vCtx.currentTime + Math.abs(gap);
    }
  }

  destroy() {
    this.aCtx = null;
    this.vCtx = null;
  }
}

// eslint-disable-next-line no-undef
class MobileVideo extends HTMLElement {
  constructor(config) {
    super();
    let _this = this;
    this.vCtx = new _videoContext2.default();
    this.aCtx = new _audioContext2.default(config);
    this.ticker = new ((0, _ticker.getTicker)())();
    this.historyTime = 0;
    this.reconciler = new AVReconciler({
      vCtx: this.vCtx,
      aCtx: this.aCtx
    });

    this.init();
  }

  init() {
    this.vCtx.oncanplay = () => {
      this.appendChild(this.vCtx.canvas);
      // eslint-disable-next-line no-undef
      this.dispatchEvent(new Event('canplay'));
    };

    this.ticker.start(() => {
      // this.reconciler.doReconcile()
      console.log(this.aCtx.currentTime);
    });
  }

  destroy() {
    this.reconciler.destroy();
  }

  onDemuxComplete(videoTrack, audioTrack) {
    this.aCtx.decodeAudio(audioTrack);
    this.vCtx.decodeVideo(videoTrack);
  }

  setAudioMeta(meta) {
    this.aCtx.setAudioMetaData(meta);
  }

  setVideoMeta(meta) {
    this.vCtx.setVideoMetaData(meta);
  }

  get currentTime() {}

  play() {
    // if (!this.vCtx.)
    this.vCtx.play();
    this.aCtx.play();
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
        delete this.buffer[i];
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

  tick(timestamp) {
    console.log(timestamp);
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
    this.initWasmWorker();
  }

  initWasmWorker() {
    let _this = this;
    this.wasmworker = (0, _webworkifyWebpack2.default)(/*require.resolve*/(/*! ./worker.js */ "../xgplayer-utils/src/mobile/worker.js"));
    this.wasmworker.postMessage({
      msg: 'init'
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
  }

  play() {
    this.paused = false;
    this._onTimer();
  }

  _onTimer() {
    let renderCost = 0;
    const renderStart = Date.now();
    if (this.paused) {
      return;
    }
    let nextTime = 1000 / 60;
    if (this.meta) {
      if (this.meta.frameRate && this.meta.frameRate.fixed && this.meta.frameRate.fps) {
        nextTime = Math.ceil(1000 / this.meta.frameRate.fps);
      }
      let frameTimes = Object.keys(this._decodedFrames);
      if (frameTimes.length > 0) {
        this.currentTime += nextTime;
        let frameTime = -1;
        for (let i = 0; i < frameTimes.length && frameTimes[i] - this._baseDts <= this.currentTime; i++) {
          frameTime = frameTimes[i];
          break;
        }
        let frame = this._decodedFrames[frameTime];
        if (frame) {
          if (this.oncanplay && this.readyStatus < 4) {
            this.oncanplay();
            this.readyStatus = 4;
          }
          console.log('video time', this.currentTime);
          this.yuvCanvas.render(frame.buffer, frame.width, frame.height);
          renderCost = Date.now() - renderStart;
          delete this._decodedFrames[frameTime];
        }
      }
    }
    this._cleanBuffer();
    setTimeout(this._onTimer.bind(this), nextTime - renderCost);
  }

  _cleanBuffer() {
    this.source.remove(0, this.currentTime);
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

Decoder.prototype.broadwayOnPictureDecoded = function (offset, width, height, infoid) {
  let info = Object.assign({}, this.infolist[infoid]);
  let data = this.toU8Array(offset, width * height * 3 / 2);
  this.infolist[infoid] = null;
  let datetemp = new Uint8Array(data.length);
  datetemp.set(data);
  let buffer = datetemp.buffer;
  this.self.postMessage({
    msg: 'DECODED',
    width,
    height,
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

var decoder;

function onPostRun() {
  decoder = new Decoder(this);
  decoder.init();
}

function init() {
  self.importScripts('http://10.95.45.202:9090/examples/flv/decoder.js');
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
          init(self);
          break;
        case 'decode':
          decoder.decode(data.data, data.info);
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
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
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
    if (this.chroma === 420) {
      vertexShaderScript = ['attribute vec4 vertexPos;', 'attribute vec4 texturePos;', 'attribute vec4 uTexturePos;', 'attribute vec4 vTexturePos;', 'varying vec2 textureCoord;', 'varying vec2 uTextureCoord;', 'varying vec2 vTextureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos.xy;', '  uTextureCoord = uTexturePos.xy;', '  vTextureCoord = vTexturePos.xy;', '}'].join('\n');

      fragmentShaderScript = ['precision highp float;', 'varying highp vec2 textureCoord;', 'varying highp vec2 uTextureCoord;', 'varying highp vec2 vTextureCoord;', 'uniform sampler2D ySampler;', 'uniform sampler2D uSampler;', 'uniform sampler2D vSampler;', 'uniform mat4 YUV2RGB;', 'void main(void) {', '  highp float y = texture2D(ySampler,  textureCoord).r;', '  highp float u = texture2D(uSampler,  uTextureCoord).r;', '  highp float v = texture2D(vSampler,  vTextureCoord).r;', '  gl_FragColor = vec4(y, u, v, 1) * YUV2RGB;', '}'].join('\n');
    } else if (this.chroma === 422) {
      vertexShaderScript = ['attribute vec4 vertexPos;', 'attribute vec4 texturePos;', 'varying vec2 textureCoord;', 'void main()', '{', '  gl_Position = vertexPos;', '  textureCoord = texturePos.xy;', '}'].join('\n');

      fragmentShaderScript = ['precision highp float;', 'varying highp vec2 textureCoord;', 'uniform sampler2D sampler;', 'uniform highp vec2 resolution;', 'uniform mat4 YUV2RGB;', 'void main(void) {', '  highp float texPixX = 1.0 / resolution.x;', '  highp float logPixX = 2.0 / resolution.x;', // half the resolution of the texture
      '  highp float logHalfPixX = 4.0 / resolution.x;', // half of the logical resolution so every 4th pixel
      '  highp float steps = floor(textureCoord.x / logPixX);', '  highp float uvSteps = floor(textureCoord.x / logHalfPixX);', '  highp float y = texture2D(sampler, vec2((logPixX * steps) + texPixX, textureCoord.y)).r;', '  highp float u = texture2D(sampler, vec2((logHalfPixX * uvSteps), textureCoord.y)).r;', '  highp float v = texture2D(sampler, vec2((logHalfPixX * uvSteps) + texPixX + texPixX, textureCoord.y)).r;',

      // '  highp float y = texture2D(sampler,  textureCoord).r;',
      // '  gl_FragColor = vec4(y, u, v, 1) * YUV2RGB;',
      '  gl_FragColor = vec4(y, u, v, 1.0) * YUV2RGB;', '}'].join('\n');
    };

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

    if (this.chroma === 420) {
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
    };
  }

  _initTextures() {
    var gl = this.contextGL;
    var program = this.shaderProgram;

    if (this.chroma === 420) {
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
    } else if (this.chroma === 422) {
      // only one texture for 422
      var textureRef = this._initTexture();
      var samplerRef = gl.getUniformLocation(program, 'sampler');
      gl.uniform1i(samplerRef, 0);
      this.textureRef = textureRef;
    };
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

  _drawPictureGL(data, width, height) {
    if (this.chroma === 420) {
      let nWidth = width;
      var ylen = width * height;
      var uvlen = width / 2 * (height / 2);
      data = new Uint8Array(data);
      let renderData = {
        yData: data.subarray(0, ylen),
        uData: data.subarray(ylen, ylen + uvlen),
        vData: data.subarray(ylen + uvlen, ylen + uvlen + uvlen)
      };
      if (width % 4 > 0) {
        nWidth = width + 4 - width % 4;
        let yArray = new Uint8Array(nWidth * height);
        for (let i = 0; i < height; i++) {
          yArray.set(renderData.yData.subarray(i * width, (i + 1) * width), i * nWidth);
        }
        renderData.yData = yArray;
      }

      if (width / 2 % 4 > 0) {
        nWidth = width / 2 + 4 - width / 2 % 4;
        let uArray = new Uint8Array(nWidth * height / 2);
        let vArray = new Uint8Array(nWidth * height / 2);
        for (let i = 0; i < height / 2; i++) {
          uArray.set(renderData.uData.subarray(i * width / 2, (i + 1) * width / 2), i * nWidth);
          vArray.set(renderData.vData.subarray(i * width / 2, (i + 1) * width / 2), i * nWidth);
        }
        renderData.uData = uArray;
        renderData.vData = vArray;
      }
      this._drawPictureGL420(renderData, width, height);
    } else if (this.chroma === 422) {
      data = new Uint8Array(data);
      this._drawPictureGL422(width, height, data);
    }
  }

  _drawPictureGL422(data, width, height) {
    var gl = this.contextGL;
    var texturePosBuffer = this.texturePosBuffer;

    var textureRef = this.textureRef;

    var dataPerRow = width * 2;
    var rowCnt = height;

    gl.viewport(0, 0, width, height);

    var tTop = 0;
    var tLeft = 0;
    var tBottom = height / rowCnt;
    var tRight = width / (dataPerRow / 2);
    var texturePosValues = new Float32Array([tRight, tTop, tLeft, tTop, tRight, tBottom, tLeft, tBottom]);

    gl.bindBuffer(gl.ARRAY_BUFFER, texturePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texturePosValues, gl.DYNAMIC_DRAW);

    gl.uniform2f(gl.getUniformLocation(this.shaderProgram, 'resolution'), dataPerRow, height);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textureRef);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, dataPerRow, rowCnt, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, data);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  _drawPictureGL420(data, width, height) {
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

    var yDataPerRow = width;
    var yRowCnt = height;

    var uDataPerRow = width / 2;
    var uRowCnt = height / 2;

    var vDataPerRow = uDataPerRow;
    var vRowCnt = uRowCnt;
    gl.viewport(0, 0, this.width, this.height);

    var tTop = 0;
    var tLeft = 0;
    var tBottom = height / yRowCnt;
    var tRight = width / yDataPerRow;
    var texturePosValues = new Float32Array([tRight, tTop, tLeft, tTop, tRight, tBottom, tLeft, tBottom]);

    gl.bindBuffer(gl.ARRAY_BUFFER, texturePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texturePosValues, gl.DYNAMIC_DRAW);

    tBottom = height / 2 / uRowCnt;
    tRight = width / 2 / uDataPerRow;
    var uTexturePosValues = new Float32Array([tRight, tTop, tLeft, tTop, tRight, tBottom, tLeft, tBottom]);

    gl.bindBuffer(gl.ARRAY_BUFFER, uTexturePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, uTexturePosValues, gl.DYNAMIC_DRAW);

    tBottom = height / 2 / vRowCnt;
    tRight = width / 2 / vDataPerRow;

    var vTexturePosValues = new Float32Array([tRight, tTop, tLeft, tTop, tRight, tBottom, tLeft, tBottom]);

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

  render(data, width, height) {
    var gl = this.contextGL;
    if (gl) {
      this._drawPictureGL(data, width, height);
    } else {
      this._drawPictureRGB(data);
    }
  }
}

exports.default = YUVCanvas;

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
  }

  init() {
    // eslint-disable-next-line no-undef
    this.mediaSource = new self.MediaSource();
    this.mediaSource.addEventListener('sourceopen', this.onSourceOpen.bind(this));
    this.container.src = URL.createObjectURL(this.mediaSource);
    this.url = this.container.src;
    this.container.addEventListener('timeupdate', this.onTimeUpdate.bind(this));
    this.container.addEventListener('waiting', this.onWaiting.bind(this));
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
        sourceBuffer.addEventListener('updateend', this.onUpdateEnd.bind(this));
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
    if (this.mediaSource.readyState === 'open') {
      this.mediaSource.endOfStream();
    }
  }

  remove(end) {
    for (let i = 0; i < Object.keys(this.sourceBuffers).length; i++) {
      let buffer = this.sourceBuffers[Object.keys(this.sourceBuffers)[i]];
      if (!buffer.updating) {
        buffer.remove(0, end);
      }
    }
  }

  destroy() {
    this.container.removeEventListener('timeupdate', this.onTimeUpdate);
    this.container.removeEventListener('waiting', this.onWaiting);
    this.mediaSource.removeEventListener('sourceopen', this.onSourceOpen);
    this.configs = {};
    this.container = null;
    this.mediaSource = null;
    this.sourceBuffers = {};
    this.preloadTime = 1;
    for (let i = 0; i < Object.keys(this.sourceBuffers).length; i++) {
      let buffer = this.sourceBuffers[Object.keys(this.sourceBuffers)[i]];
      buffer.removeEventListener('updateend', this.onUpdateEnd);
      this.mediaSource.removeSourceBuffer(buffer);
      delete this.sourceBuffers[Object.keys(this.sourceBuffers)[i]];
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
const REMUX_EVENTS = _xgplayerUtils.EVENTS.REMUX_EVENTS;

const Tag = 'FLVController';

class Logger {
  warn() {}
}

class FlvController {
  constructor(player) {
    this.TAG = Tag;
    this._player = player;

    // TODO 临时挂的 需要处理到Player层
    // this.video = document.createElement('mobile-video');
    this._player.video = document.createElement('mobile-video');
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
    super(config);
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
    console.log('play');
    if (this._hasStart) {
      this._destroy();
      this.context = new _xgplayerUtils.Context(flvAllowedEvents);
      const flv = this.context.registry('FLV_CONTROLLER', _flvLiveMobile2.default)(this);
      this.initFlvEvents(flv);
      this.flv = flv;
      this.context.init();
      super.start(flv.mse.url);
      super.play();
    } else {
      super.play();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9GbHZQbGF5ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy9Vc2Vycy9sZW9uYXJkby9Eb2N1bWVudHMvZnJvbnQtZW5kL3BsYXllci94Z3BsYXllci9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1idWZmZXIvc3JjL2J1ZmZlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItYnVmZmVyL3NyYy9wcmVzb3VjZS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItYnVmZmVyL3NyYy90cmFjay5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItY29kZWMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWNvZGVjL3NyYy9hYWMvYWFjLWhlbHBlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItY29kZWMvc3JjL2NvbXBhdGliaWxpdHkuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWNvZGVjL3NyYy9oMjY0L25hbHVuaXQvZ29sb21iLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1jb2RlYy9zcmMvaDI2NC9uYWx1bml0L2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1jb2RlYy9zcmMvaDI2NC9uYWx1bml0L3Nwcy5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItZGVtdXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWRlbXV4L3NyYy9mbHYvYW1mLXBhcnNlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItZGVtdXgvc3JjL2Zsdi9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItZGVtdXgvc3JjL2hscy9kZW11eGVyL20zdThwYXJzZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWRlbXV4L3NyYy9obHMvZGVtdXhlci90cy5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItZGVtdXgvc3JjL2hscy9wbGF5bGlzdC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItbG9hZGVyL2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1sb2FkZXIvc3JjL2ZldGNoLWxvYWRlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItcmVtdXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXJlbXV4L3NyYy9tcDQvZm1wNC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItcmVtdXgvc3JjL21wNC9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL25vZGVfbW9kdWxlcy9jb25jYXQtdHlwZWQtYXJyYXkvbGliL2NvbmNhdC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvbm9kZV9tb2R1bGVzL2NvbmNhdC10eXBlZC1hcnJheS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL25vZGVfbW9kdWxlcy93ZWJ3b3JraWZ5LXdlYnBhY2svaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9jb25zdGFudHMvZXZlbnRzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvY29uc3RhbnRzL3dvcmtlci1jb21tYW5kcy5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL2NvbnRleHQuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9lbnYvaXNsZS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL2Vudi9zbmlmZmVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvZW52L3V0ZjguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2JpbGUvYXVkaW8tY29udGV4dC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vYmlsZS9tb2JpbGUtdmlkZW8uanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2JpbGUvc291cmNlYnVmZmVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9iaWxlL3RpY2tlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vYmlsZS92aWRlby1jb250ZXh0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9iaWxlL3dvcmtlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vYmlsZS95dXYtY2FudmFzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9kZWxzL21lZGlhLWluZm8uanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2RlbHMvbWVkaWEtc2FtcGxlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9kZWxzL21lZGlhLXNlZ21lbnQtbGlzdC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vZGVscy9tZWRpYS1zZWdtZW50LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9kZWxzL3RyYWNrLW1ldGEuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2RlbHMvdHJhY2stc2FtcGxlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbXNlL2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvd3JpdGUvYnVmZmVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvd3JpdGUvc3RyZWFtLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy9mbHYtbGl2ZS1tb2JpbGUuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL21vYmlsZS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvZXh0ZXJuYWwgXCJQbGF5ZXJcIiJdLCJuYW1lcyI6WyJSIiwiUmVmbGVjdCIsIlJlZmxlY3RBcHBseSIsImFwcGx5IiwidGFyZ2V0IiwicmVjZWl2ZXIiLCJhcmdzIiwiRnVuY3Rpb24iLCJwcm90b3R5cGUiLCJjYWxsIiwiUmVmbGVjdE93bktleXMiLCJvd25LZXlzIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImNvbmNhdCIsIlByb2Nlc3NFbWl0V2FybmluZyIsIndhcm5pbmciLCJjb25zb2xlIiwid2FybiIsIk51bWJlcklzTmFOIiwiTnVtYmVyIiwiaXNOYU4iLCJ2YWx1ZSIsIkV2ZW50RW1pdHRlciIsImluaXQiLCJtb2R1bGUiLCJleHBvcnRzIiwiX2V2ZW50cyIsInVuZGVmaW5lZCIsIl9ldmVudHNDb3VudCIsIl9tYXhMaXN0ZW5lcnMiLCJkZWZhdWx0TWF4TGlzdGVuZXJzIiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0Iiwic2V0IiwiYXJnIiwiUmFuZ2VFcnJvciIsImdldFByb3RvdHlwZU9mIiwiY3JlYXRlIiwic2V0TWF4TGlzdGVuZXJzIiwibiIsIiRnZXRNYXhMaXN0ZW5lcnMiLCJ0aGF0IiwiZ2V0TWF4TGlzdGVuZXJzIiwiZW1pdCIsInR5cGUiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwicHVzaCIsImRvRXJyb3IiLCJldmVudHMiLCJlcnJvciIsImVyIiwiRXJyb3IiLCJlcnIiLCJtZXNzYWdlIiwiY29udGV4dCIsImhhbmRsZXIiLCJsZW4iLCJsaXN0ZW5lcnMiLCJhcnJheUNsb25lIiwiX2FkZExpc3RlbmVyIiwibGlzdGVuZXIiLCJwcmVwZW5kIiwibSIsImV4aXN0aW5nIiwiVHlwZUVycm9yIiwibmV3TGlzdGVuZXIiLCJ1bnNoaWZ0Iiwid2FybmVkIiwidyIsIlN0cmluZyIsIm5hbWUiLCJlbWl0dGVyIiwiY291bnQiLCJhZGRMaXN0ZW5lciIsIm9uIiwicHJlcGVuZExpc3RlbmVyIiwib25jZVdyYXBwZXIiLCJmaXJlZCIsInJlbW92ZUxpc3RlbmVyIiwid3JhcEZuIiwiX29uY2VXcmFwIiwic3RhdGUiLCJ3cmFwcGVkIiwiYmluZCIsIm9uY2UiLCJwcmVwZW5kT25jZUxpc3RlbmVyIiwibGlzdCIsInBvc2l0aW9uIiwib3JpZ2luYWxMaXN0ZW5lciIsInNoaWZ0Iiwic3BsaWNlT25lIiwib2ZmIiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwia2V5cyIsImtleSIsIl9saXN0ZW5lcnMiLCJ1bndyYXAiLCJldmxpc3RlbmVyIiwidW53cmFwTGlzdGVuZXJzIiwicmF3TGlzdGVuZXJzIiwibGlzdGVuZXJDb3VudCIsImV2ZW50TmFtZXMiLCJhcnIiLCJjb3B5IiwiQXJyYXkiLCJpbmRleCIsInBvcCIsInJldCIsIlRyYWNrIiwicmVxdWlyZSIsImRlZmF1bHQiLCJUcmFja3MiLCJBdWRpb1RyYWNrIiwiVmlkZW9UcmFjayIsIlhnQnVmZmVyIiwiUmVtdXhCdWZmZXIiLCJQcmVTb3VyY2UiLCJjb25zdHJ1Y3RvciIsImhpc3RvcnlMZW4iLCJhcnJheSIsIm9mZnNldCIsImRhdGEiLCJieXRlTGVuZ3RoIiwiVWludDhBcnJheSIsIl9zaGlmdEJ1ZmZlciIsInNsaWNlIiwidG1wb2ZmIiwidG1wIiwidGVtcGxlbmd0aCIsImNsZWFyIiwiZGVzdHJveSIsInRvSW50Iiwic3RhcnQiLCJyZXRJbnQiLCJ2aWRlbyIsImF1ZGlvIiwiU291cmNlIiwibWltZXR5cGUiLCJzb3VyY2VzIiwiZ2V0U291cmNlIiwic291cmNlIiwiY3JlYXRlU291cmNlIiwiaWQiLCJzZXF1ZW5jZU51bWJlciIsInNhbXBsZXMiLCJkcm9wcGVkU2FtcGxlcyIsInJlc2V0IiwiZGlzdHJveSIsIlRBRyIsImRyb3BwZWQiLCJhdWRpb1RyYWNrIiwidmlkZW9UcmFjayIsIk5hbHVuaXQiLCJTcHNQYXJzZXIiLCJDb21wYXRpYmlsaXR5IiwiQUFDIiwiZ2V0U2lsZW50RnJhbWUiLCJjb2RlYyIsImNoYW5uZWxDb3VudCIsIlJFTVVYX0VWRU5UUyIsIkVWRU5UUyIsIm5leHRBdWRpb0R0cyIsIm5leHRWaWRlb0R0cyIsImxhc3RBdWRpb1NhbXBsZXNMZW4iLCJsYXN0VmlkZW9TYW1wbGVzTGVuIiwibGFzdFZpZGVvRHRzIiwibGFzdEF1ZGlvRHRzIiwiYWxsQXVkaW9TYW1wbGVzQ291bnQiLCJhbGxWaWRlb1NhbXBsZXNDb3VudCIsIl9maXJzdEF1ZGlvU2FtcGxlIiwiX2ZpcnN0VmlkZW9TYW1wbGUiLCJmaWxsZWRBdWRpb1NhbXBsZXMiLCJmaWxsZWRWaWRlb1NhbXBsZXMiLCJiZWZvcmUiLCJSRU1VWF9NRURJQSIsImRvRml4IiwiaXNGaXJzdEF1ZGlvU2FtcGxlcyIsImlzRmlyc3RWaWRlb1NhbXBsZXMiLCJnZXRGaXJzdFNhbXBsZSIsInJlbW92ZUludmFsaWRTYW1wbGVzIiwicmVjb3JkU2FtcGxlc0NvdW50IiwiZml4UmVmU2FtcGxlRHVyYXRpb24iLCJtZXRhIiwiZG9GaXhWaWRlbyIsImRvRml4QXVkaW8iLCJmaXJzdCIsInZpZGVvU2FtcGxlcyIsImZyYW1lUmF0ZSIsImZpeGVkIiwiZmlyc3RTYW1wbGUiLCJmaXJzdER0cyIsImR0cyIsInNhbXBsZXNMZW4iLCJ2aWRlb0ZpcnN0RHRzIiwiYXVkaW9GaXJzdER0cyIsImdhcCIsInJlZlNhbXBsZUR1cmF0aW9uIiwiZmlsbENvdW50IiwiTWF0aCIsImZsb29yIiwiY2xvbmVkRmlyc3RTYW1wbGUiLCJhc3NpZ24iLCJwdHMiLCJjdHMiLCJzaXplIiwiYWJzR2FwIiwiYWJzIiwiZmlsbEZyYW1lQ291bnQiLCJjbG9uZWRTYW1wbGUiLCJjb21wdXRlZCIsIm9yaWdpbkR0cyIsImxhc3REdHMiLCJsYXN0U2FtcGxlRHVyYXRpb24iLCJjdXJyZW50IiwibmV4dCIsImR1cmF0aW9uIiwiZmlsbEZyYW1lSWR4IiwiZmlsbEZyYW1lIiwic3BsaWNlIiwiYXVkaW9TYW1wbGVzIiwic2lsZW50RnJhbWUiLCJzb3J0QXVkaW9TYW1wbGVzIiwidmlkZW9GaXJzdFB0cyIsInNpbGVudFNhbXBsZUNvdW50Iiwic2lsZW50U2FtcGxlIiwiZGF0YXNpemUiLCJmaWx0ZXJlZCIsInJlZlNhbXBsZUR1cmF0aW9uRml4ZWQiLCJzaWxlbnRGcmFtZUNvdW50IiwiZmluZEZpcnN0VmlkZW9TYW1wbGUiLCJmaW5kRmlyc3RBdWRpb1NhbXBsZSIsImlzVmlkZW8iLCJhbGxTYW1wbGVzQ291bnQiLCJmaWxsZWRTYW1wbGVzQ291bnQiLCJkdXJhdGlvbkF2ZyIsImZpbHRlciIsInNhbXBsZSIsInNvcnQiLCJhIiwiYiIsInNvcnRlZCIsImlzS2V5ZnJhbWUiLCJ0cmFja3MiLCJfY29udGV4dCIsImdldEluc3RhbmNlIiwiR29sb21iIiwidWludDhhcnJheSIsIl9idWZmZXIiLCJfYnVmZmVySW5kZXgiLCJfdG90YWxCeXRlcyIsIl90b3RhbEJpdHMiLCJfY3VycmVudFdvcmQiLCJfY3VycmVudFdvcmRCaXRzTGVmdCIsIl9maWxsQ3VycmVudFdvcmQiLCJidWZmZXJCeXRlc0xlZnQiLCJieXRlc1JlYWQiLCJtaW4iLCJ3b3JkIiwic3ViYXJyYXkiLCJEYXRhVmlldyIsImJ1ZmZlciIsImdldFVpbnQzMiIsInJlYWRCaXRzIiwiYml0cyIsInJlc3VsdCIsImJpdHNOZWVkTGVmdCIsImJpdHNSZWFkTmV4dCIsInJlc3VsdDIiLCJyZWFkQm9vbCIsInJlYWRCeXRlIiwiX3NraXBMZWFkaW5nWmVybyIsInplcm9Db3VudCIsInJlYWRVRUciLCJsZWFkaW5nWmVyb3MiLCJyZWFkU0VHIiwiZ2V0TmFsdW5pdHMiLCJidWYiLCJkYXRhdmlldyIsImdldEludDMyIiwiZ2V0SW50MTYiLCJnZXRJbnQ4IiwiZ2V0QW5uZXhiTmFscyIsImdldEF2Y2NOYWxzIiwibmFscyIsImdldEhlYWRlclBvc2l0aW9uQW5uZXhCIiwicG9zIiwiZW5kIiwiaGVhZGVyIiwiaGVhZGVyTGVuZ3RoIiwic2tpcCIsImJvZHkiLCJ1bml0IiwiYW5hbHlzZU5hbCIsIm5kciIsImlkciIsInNwcyIsInBhcnNlU1BTIiwicHBzIiwiZ2V0QXZjYyIsIlNQU1BhcnNlciIsIl9lYnNwMnJic3AiLCJzcmMiLCJzcmNMZW5ndGgiLCJkc3QiLCJkc3RJZHgiLCJyYnNwIiwiZ2IiLCJwcm9maWxlSWRjIiwibGV2ZWxJZGMiLCJwcm9maWxlX3N0cmluZyIsImdldFByb2ZpbGVTdHJpbmciLCJsZXZlbF9zdHJpbmciLCJnZXRMZXZlbFN0cmluZyIsImNocm9tYV9mb3JtYXRfaWRjIiwiY2hyb21hX2Zvcm1hdCIsImNocm9tYV9mb3JtYXRfdGFibGUiLCJiaXRfZGVwdGgiLCJzY2FsaW5nX2xpc3RfY291bnQiLCJfc2tpcFNjYWxpbmdMaXN0IiwicGljX29yZGVyX2NudF90eXBlIiwibnVtX3JlZl9mcmFtZXNfaW5fcGljX29yZGVyX2NudF9jeWNsZSIsInBpY193aWR0aF9pbl9tYnNfbWludXMxIiwicGljX2hlaWdodF9pbl9tYXBfdW5pdHNfbWludXMxIiwiZnJhbWVfbWJzX29ubHlfZmxhZyIsImZyYW1lX2Nyb3BfbGVmdF9vZmZzZXQiLCJmcmFtZV9jcm9wX3JpZ2h0X29mZnNldCIsImZyYW1lX2Nyb3BfdG9wX29mZnNldCIsImZyYW1lX2Nyb3BfYm90dG9tX29mZnNldCIsImZyYW1lX2Nyb3BwaW5nX2ZsYWciLCJwYXJfd2lkdGgiLCJwYXJfaGVpZ2h0IiwiZnBzIiwiZnBzX2ZpeGVkIiwiZnBzX251bSIsImZwc19kZW4iLCJ2dWlfcGFyYW1ldGVyc19wcmVzZW50X2ZsYWciLCJhc3BlY3RfcmF0aW9faWRjIiwicGFyX3dfdGFibGUiLCJwYXJfaF90YWJsZSIsIm51bV91bml0c19pbl90aWNrIiwidGltZV9zY2FsZSIsInBhclNjYWxlIiwiY3JvcF91bml0X3giLCJjcm9wX3VuaXRfeSIsInN1Yl93YyIsInN1Yl9oYyIsImNvZGVjX3dpZHRoIiwiY29kZWNfaGVpZ2h0IiwicHJlc2VudF93aWR0aCIsImNlaWwiLCJjaHJvbWFfZm9ybWF0X3N0cmluZyIsImdldENocm9tYUZvcm1hdFN0cmluZyIsImZyYW1lX3JhdGUiLCJwYXJfcmF0aW8iLCJ3aWR0aCIsImhlaWdodCIsImNvZGVjX3NpemUiLCJwcmVzZW50X3NpemUiLCJsYXN0X3NjYWxlIiwibmV4dF9zY2FsZSIsImRlbHRhX3NjYWxlIiwidG9GaXhlZCIsImNocm9tYSIsInRvVmlkZW9NZXRhIiwic3BzQ29uZmlnIiwiY29kZWNXaWR0aCIsImNvZGVjSGVpZ2h0IiwicHJlc2VudFdpZHRoIiwicHJlc2VudEhlaWdodCIsInByb2ZpbGUiLCJsZXZlbCIsImJpdERlcHRoIiwiY2hyb21hRm9ybWF0IiwicGFyUmF0aW8iLCJmcHNEZW4iLCJmcHNOdW0iLCJ0aW1lc2NhbGUiLCJNM1U4UGFyc2VyIiwiVHNEZW11eGVyIiwiUGxheWxpc3QiLCJGbHZEZW11eGVyIiwiREFUQV9UWVBFUyIsIk5VTUJFUiIsIkJPT0xFQU4iLCJTVFJJTkciLCJPQkpFQ1QiLCJNSVhfQVJSQVkiLCJPQkpFQ1RfRU5EIiwiU1RSSUNUX0FSUkFZIiwiREFURSIsIkxPTkVfU1RSSU5HIiwiQU1GUGFyc2VyIiwicmVhZE9mZnNldCIsInJlc29sdmUiLCJtZXRhRGF0YSIsInBhcnNlVmFsdWUiLCJib2R5U2l6ZSIsInJlc2V0U3RhdHVzIiwicGFyc2VTdHJpbmciLCJkdiIsInN0ckxlbiIsImdldFVpbnQxNiIsImlzTGUiLCJzdHIiLCJVVEY4IiwiZGVjb2RlIiwicGFyc2VEYXRlIiwidHMiLCJnZXRGbG9hdDY0IiwidGltZU9mZnNldCIsIkRhdGUiLCJwYXJzZU9iamVjdCIsImlzT2JqRW5kIiwicGFyc2VMb25nU3RyaW5nIiwiQXJyYXlCdWZmZXIiLCJkYXRhVmlldyIsImdldFVpbnQ4IiwiYm9vbE51bSIsIm9iakVuZFNpemUiLCJhbWZPYmoiLCJpc09iamVjdEVuZCIsIm1hcmsiLCJhbWZWYXIiLCJtYXJrZXIiLCJhcnJMZW5ndGgiLCJzY3JpcHQiLCJkYXRlIiwibG9uZ1N0ciIsIkRFTVVYX0VWRU5UUyIsIl9maXJzdEZyYWdtZW50TG9hZGVkIiwiX3RyYWNrTnVtIiwiX2hhc1NjcmlwdCIsIkRFTVVYX1NUQVJUIiwiZG9QYXJzZUZsdiIsImlzRmx2RmlsZSIsImdldFBsYXlUeXBlIiwic3RyZWFtRmxhZyIsImhhc1ZpZGVvIiwiaGFzQXVkaW8iLCJsb2FkZXJCdWZmZXIiLCJwYXJzZUZsdkhlYWRlciIsImNodW5rIiwiX3BhcnNlRmx2VGFnIiwiREVNVVhfQ09NUExFVEUiLCJERU1VWF9FUlJPUiIsInBsYXlUeXBlIiwiaW5pdFZpZGVvVHJhY2siLCJpbml0QXVkaW9UcmFjayIsIlZpZGVvVHJhY2tNZXRhIiwiQXVkaW9UcmFja01ldGEiLCJfcGFyc2VGbHZUYWdIZWFkZXIiLCJfcHJvY2Vzc0NodW5rIiwidGFnVHlwZSIsImxvZ2dlciIsInRpbWVzdGFtcCIsInRpbWVzdGFtcEV4dCIsIl9wYXJzZVNjcmlwdERhdGEiLCJfcGFyc2VBQUNEYXRhIiwiX3BhcnNlSGV2Y0RhdGEiLCJpbmZvIiwib25NZXRhRGF0YSIsIm1lZGlhSW5mbyIsImhzYUF1ZGlvIiwidmFsaWRhdGUiLCJfZGF0YXNpemVWYWxpZGF0b3IiLCJNRURJQV9JTkZPIiwiaGFzU3BlY2lmaWNDb25maWciLCJhdWRpb3NhbXBsZXJhdGUiLCJzYW1wbGVSYXRlIiwiYXVkaW9jaGFubmVscyIsInNhbXBsZVJhdGVJbmRleCIsImZyYW1lcmF0ZSIsIl9hYWNTZXF1ZW5jZUhlYWRlclBhcnNlciIsIm9iamVjdFR5cGUiLCJfc3dpdGNoQXVkaW9TYW1wbGVSYXRlIiwiZnJhbWVMZW5ndGgiLCJkZXBlbmRzT25Db3JlQ29kZXIiLCJleHRlbnNpb25GbGFnSW5kZXgiLCJ1c2VyQWdlbnQiLCJ3aW5kb3ciLCJuYXZpZ2F0b3IiLCJ0b0xvd2VyQ2FzZSIsImV4dGVuc2lvblNhbXBsaW5nSW5kZXgiLCJjb25maWciLCJzYW1wbGluZ0luZGV4IiwiaW5kZXhPZiIsInRyYWNrIiwiZm9ybWF0IiwiX2hhc0F1ZGlvU2VxdWVuY2UiLCJfc3dpdGNoQXVkaW9TYW1wbGluZ0ZyZXF1ZW5jeSIsImZyYW1lTGVudGgiLCJhdWRpb1NhbXBsZVJhdGUiLCJhdWRpb1NhbXBsZVJhdGVJbmRleCIsImFhY0hlYWRlciIsImF1ZGlvTWVkaWEiLCJNRVRBREFUQV9QQVJTRUQiLCJBVURJT19NRVRBREFUQV9DSEFOR0UiLCJmcmFtZVR5cGUiLCJjb2RlY0lEIiwiYXZjUGFja2V0VHlwZSIsInBhcnNlSW50IiwibmFsdSIsInIiLCJzaXplcyIsImF2Y2NsZW5ndGgiLCJfYXZjU2VxdWVuY2VIZWFkZXJQYXJzZXIiLCJfaGFzVmlkZW9TZXF1ZW5jZSIsIlZJREVPX01FVEFEQVRBX0NIQU5HRSIsImNvbmZpZ3VyYXRpb25WZXJzaW9uIiwiYXZjUHJvZmlsZUluZGljYXRpb24iLCJwcm9maWxlQ29tcGF0aWJpbGl0eSIsImF2Y0xldmVsSW5kaWNhdGlvbiIsIm5hbFVuaXRMZW5ndGgiLCJudW1PZlNwcyIsImoiLCJjb2RlY1N0cmluZyIsImgiLCJ0b1N0cmluZyIsIm51bU9mUHBzIiwidmlkZW9NZWRpYSIsImF2Y2MiLCJzYW1wbGluZ0ZyZXF1ZW5jeUluZGV4Iiwic2FtcGxpbmdGcmVxdWVuY3lMaXN0IiwiX3N3aXRjaEF1ZGlvQ2hhbm5lbCIsInNhbXBsZVRyYWNrTnVtSW5kZXgiLCJzYW1wbGVUcmFja051bUxpc3QiLCJkYXRhc2l6ZUNvbmZpcm0iLCJwYXJzZSIsInRleHQiLCJiYXNldXJsIiwic3BsaXQiLCJyZWZzIiwicmVmIiwibWF0Y2giLCJyZWZtIiwidmVyc2lvbiIsInNlcXVlbmNlIiwidGFyZ2V0ZHVyYXRpb24iLCJwYXJzZUZsb2F0IiwicGFyc2VGcmFnIiwiZnJhZ3MiLCJmcmVnIiwibmV4dGxpbmUiLCJjaGFyQXQiLCJ1cmwiLCJwYXJzZVVSTCIsInVybHMiLCJTdHJlYW1UeXBlIiwiY29uZmlncyIsImRlbXV4aW5nIiwicGF0IiwicG10IiwiX2hhc1ZpZGVvTWV0YSIsIl9oYXNBdWRpb01ldGEiLCJkZW11eCIsImlucHV0QnVmZmVyIiwicGVzZXMiLCJ0c1N0cmVhbSIsIlN0cmVhbSIsInJlYWQiLCJwZXMiLCJwaWQiLCJFUyIsInBheWxvYWQiLCJzdHJlYW0iLCJlcGVzZXMiLCJNZXJnZSIsInB1c2hBdWRpb1NhbXBsZSIsInB1c2hWaWRlb1NhbXBsZSIsIl90cmFja3MiLCJmcmVxdWVuY2UiLCJjaGFubmVsIiwiYXVkaW9PYmplY3RUeXBlIiwiYXVkaW9Db25maWciLCJmcmVxdWVuY3lJbmRleCIsIkF1ZGlvVHJhY2tTYW1wbGUiLCJzYW1wbGVMZW5ndGgiLCJuYWwiLCJjb21wYWlyZVVpbnQ4Iiwic2FyUmF0aW8iLCJzYXJfcmF0aW8iLCJWaWRlb1RyYWNrU2FtcGxlIiwiZGVzdG9yeSIsImJ1ZmZlcnMiLCJyZWFkSGVhZGVyIiwicmVhZFBheWxvYWQiLCJwYWNrZXQiLCJ1bmtub3duUElEcyIsIlBFUyIsIlBBVCIsIkNBVCIsIlRTRFQiLCJzb21lIiwiaXRlbSIsIlBNVCIsInN0cyIsIk1lZGlhIiwic3RyZWFtVHlwZSIsInN5bmMiLCJyZWFkVWludDgiLCJyZWFkVWludDE2IiwicHJpb3JpdHkiLCJzY3JhbWJsaW5nIiwiYWRhcHRhdGlvbiIsImNvbnRpbnVpdHkiLCJ0YWJlbElEIiwiemVybyIsInNlY3Rpb25MZW5ndGgiLCJzdHJlYW1JRCIsInNlY3Rpb25OdW1iZXIiLCJsYXN0U2VjdGlvbk51bWJlciIsIk4iLCJwcm9ncmFtTnVtYmVyIiwicHJvZ3JhbSIsInRhYmxlSUQiLCJvcmRlciIsImxhc3RPcmRlciIsIlBDUl9QSUQiLCJwcm9ncmFtTGVuZ3RoIiwiZXMiLCJtYXAiLCJhZGFwdGF0aW9uTGVuZ3RoIiwiZGlzY29udGludWUiLCJhY2Nlc3MiLCJQQ1IiLCJPUENSIiwic3BsaWNlUG9pbnQiLCJ0cmFuc3BvcnRQcml2YXRlIiwiYWRhcHRhdGlvbkZpZWxkIiwiX3N0YXJ0IiwicHJvZ3JhbUNsb2NrQmFzZSIsInJlYWRVaW50MzIiLCJwcm9ncmFtQ2xvY2tFeHRlbnNpb24iLCJvcmlnaW5Qcm9ncmFtQ2xvY2tCYXNlIiwib3JpZ2luUHJvZ3JhbUNsb2NrRXh0ZW5zaW9uIiwic3BsaWNlQ291bnRkb3duIiwidHJhbnNwb3J0UHJpdmF0ZURhdGEiLCJsdHciLCJwaWVjZXdpc2UiLCJzZWFtbGVzcyIsImx0d1ZhbGlkIiwibHR3T2Zmc2V0IiwicmVhZFVpbnQyNCIsInBpZWNld2lzZVJhdGUiLCJyZWFkSW50OCIsInNwbGljZVR5cGUiLCJkdHNOZXh0QVUxIiwibWFya2VyMSIsImR0c05leHRBVTIiLCJtYXJrZXIyIiwiZHRzTmV4dEFVMyIsImxhc3RTdHVmZmluZyIsInBhY2tldExlbmd0aCIsInB0c0RUU0ZsYWciLCJlc2NyRmxhZyIsImVzUmF0ZUZsYWciLCJkc21GbGFnIiwiYWRkaXRpb25hbEZsYWciLCJjcmNGbGFnIiwiZXh0ZW5zaW9uRmxhZyIsInBlc0hlYWRlckxlbmd0aCIsIk4xIiwiZXNjciIsImV4IiwiZXNSYXRlIiwiYWRkaXRpb25hbENvcHlJbmZvIiwicGVzQ1JDIiwiYmFjayIsImZxIiwibGF5ZXIiLCJhYnNlbnQiLCJnZXRBdWRpb0NvbmZpZyIsInNlY3Rpb25JbmRpY2F0b3IiLCJjdXJyZW50TmV4dEluZGljYXRvciIsImNyYzMyIiwic2FtcGxlSW5kZXgiLCJleHRlbnNpb25TYW1wbGVJbmRleCIsInRlc3QiLCJpbnB1dGJ1ZmZlciIsIl9iYXNlVVJMIiwiX2xpc3QiLCJfdHMiLCJmcmFnTGVuZ3RoIiwiX2xhc3RnZXQiLCJfYXVkb2NsZWFyIiwiYXV0b2NsZWFyIiwiYmFzZVVSTCIsImRvd25sb2FkZWQiLCJkb3dubG9hZGluZyIsImRlbGV0ZUZyYWciLCJ0aW1lIiwicHVzaE0zVTgiLCJkZWxldGVwcmUiLCJuZXdmcmFnbGlzdCIsImZyYWciLCJ0c2xpc3QiLCJnZXRUc0xpc3QiLCJ0c25hbWUiLCJpc2xvYWRlZCIsImxvYWRpbmciLCJnZXRUc0J5TmFtZSIsImdldFRzIiwidGltZWxpc3QiLCJjbGVhckRvd25sb2FkZWQiLCJsIiwiRmV0Y2hMb2FkZXIiLCJMT0FERVJfRVZFTlRTIiwiUkVBRF9TVFJFQU0iLCJSRUFEX1RFWFQiLCJSRUFEX0pTT04iLCJSRUFEX0JVRkZFUiIsInN0YXR1cyIsIl9yZWFkZXIiLCJfY2FuY2VsZWQiLCJyZWFkdHlwZSIsIl9sb2FkZXJUYXNrTm8iLCJMQURFUl9TVEFSVCIsImxvYWQiLCJvcHRzIiwiX3RoaXMiLCJwYXJhbXMiLCJnZXRQYXJhbXMiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsIm9rIiwiX29uRmV0Y2hSZXNwb25zZSIsIkxPQURFUl9FUlJPUiIsImNhdGNoIiwidGFza25vIiwianNvbiIsIkxPQURFUl9DT01QTEVURSIsImFycmF5QnVmZmVyIiwiX29uUmVhZGVyIiwiZ2V0UmVhZGVyIiwicmVhZGVyIiwiY2FuY2VsIiwidmFsIiwiZG9uZSIsIkxPQURFUl9EQVRBTE9BREVEIiwib3B0aW9ucyIsImhlYWRlcnMiLCJIZWFkZXJzIiwibWV0aG9kIiwibW9kZSIsImNhY2hlIiwiY29uZmlnSGVhZGVycyIsImhhc093blByb3BlcnR5IiwiYXBwZW5kIiwib3B0SGVhZGVycyIsImNvcnMiLCJ3aXRoQ3JlZGVudGlhbHMiLCJjcmVkZW50aWFscyIsIk1wNFJlbXV4ZXIiLCJGbXA0IiwiQnVmZmVyIiwid3JpdGVVaW50MzIiLCJpbml0Qm94IiwiY29udGVudCIsIndyaXRlIiwiZXh0ZW5zaW9uIiwiZmxhZyIsImZ0eXAiLCJtb292IiwibXZoZCIsInRyYWsiLCJ2aWRlb1RyYWsiLCJhdWRpb1RyYWsiLCJtdmV4IiwiZm9yRWFjaCIsImJ5dGVzIiwidGtoZCIsIm1kaWEiLCJzYW1wbGVyYXRlIiwiZWR0cyIsIm1lZGlhVGltZSIsIm1kaGQiLCJoZGxyIiwibWluZiIsInZtaGQiLCJzbWhkIiwiZGluZiIsInN0YmwiLCJkcmVmIiwic3RzZCIsInN0dHMiLCJzdHNjIiwic3RzeiIsInN0Y28iLCJtcDRhIiwiYXZjMSIsImVzZHMiLCJjb25maWdsZW4iLCJoU3BhY2luZyIsInZTcGFjaW5nIiwiYnRydCIsInBhc3AiLCJ0cmFja0lEIiwibWVoZCIsInRyZXgiLCJtb29mIiwibWZoZCIsInRyYWYiLCJ0ZmhkIiwidGZkdCIsInNkdHAiLCJ0cnVuIiwic2R0cExlbmd0aCIsInNhbXBsZUNvdW50IiwiZmxhZ3MiLCJpc0xlYWRpbmciLCJkZXBlbmRzT24iLCJpc0RlcGVuZGVkT24iLCJoYXNSZWR1bmRhbmN5IiwiaXNOb25TeW5jIiwibnVtIiwibWRhdCIsIm1kYXRCb3giLCJjaGFyQ29kZUF0IiwiX2R0c0Jhc2UiLCJfaXNEdHNCYXNlSW5pdGVkIiwidmlkZW9BbGxEdXJhdGlvbiIsImF1ZGlvQWxsRHVyYXRpb24iLCJyZW11eCIsIlJFTVVYX01FVEFEQVRBIiwib25NZXRhRGF0YVJlYWR5IiwiX2R0c0Jhc2VJbml0ZWQiLCJjYWxjRHRzQmFzZSIsIl9yZW11eFZpZGVvIiwiX3JlbXV4QXVkaW8iLCJzZWVrIiwiaW5pdFNlZ21lbnQiLCJwcmVzb3VyY2VidWZmZXIiLCJJTklUX1NFR01FTlQiLCJhdWRpb0Jhc2UiLCJJbmZpbml0eSIsInZpZGVvQmFzZSIsIm1wNFNhbXBsZXMiLCJhdmNTYW1wbGUiLCJtZGF0U2FtcGxlIiwic2FtcGxlRHVyYXRpb24iLCJuZXh0RHRzIiwidmlkZW9NZXRhIiwibW9vZk1kYXQiLCJNRURJQV9TRUdNRU5UIiwiaXNGaXJzdER0c0luaXRlZCIsImF1ZGlvTWV0YSIsIm1wNFNhbXBsZSIsImluaXRTaWxlbnRBdWRpbyIsIkNvbnRleHQiLCJXT1JLRVJfQ09NTUFORFMiLCJzbmlmZmVyIiwiTWVkaWFJbmZvIiwiTWVkaWFTYW1wbGUiLCJNZWRpYVNlZ21lbnQiLCJNZWRpYVNlZ21lbnRMaXN0IiwiTXNlIiwiTW9iaWxlVmlkZW8iLCJSZXN1bHRDb25zdHJ1Y3RvciIsInRvdGFsTGVuZ3RoIiwiX2xlbiIsImFycmF5cyIsIl9rZXkiLCJfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uIiwiX2RpZEl0ZXJhdG9yRXJyb3IiLCJfaXRlcmF0b3JFcnJvciIsIl9pdGVyYXRvciIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiX3N0ZXAiLCJyZXR1cm4iLCJfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiIsIl9kaWRJdGVyYXRvckVycm9yMiIsIl9pdGVyYXRvckVycm9yMiIsIl9pdGVyYXRvcjIiLCJfc3RlcDIiLCJfYXJyIiwiX2NvbmNhdCIsIl9jb25jYXQyIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIm9iaiIsIl9fZXNNb2R1bGUiLCJ3ZWJwYWNrQm9vdHN0cmFwRnVuYyIsIm1vZHVsZXMiLCJpbnN0YWxsZWRNb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiYyIsImQiLCJnZXR0ZXIiLCJvIiwiY29uZmlndXJhYmxlIiwiZ2V0RGVmYXVsdCIsImdldE1vZHVsZUV4cG9ydHMiLCJvYmplY3QiLCJwcm9wZXJ0eSIsInAiLCJvZSIsImYiLCJzIiwiRU5UUllfTU9EVUxFIiwibW9kdWxlTmFtZVJlcUV4cCIsImRlcGVuZGVuY3lSZWdFeHAiLCJxdW90ZVJlZ0V4cCIsInJlcGxhY2UiLCJpc051bWVyaWMiLCJnZXRNb2R1bGVEZXBlbmRlbmNpZXMiLCJxdWV1ZU5hbWUiLCJyZXR2YWwiLCJmblN0cmluZyIsIndyYXBwZXJTaWduYXR1cmUiLCJ3ZWJwYWNrUmVxdWlyZU5hbWUiLCJyZSIsIlJlZ0V4cCIsImV4ZWMiLCJoYXNWYWx1ZXNJblF1ZXVlcyIsInF1ZXVlcyIsInJlZHVjZSIsImhhc1ZhbHVlcyIsImdldFJlcXVpcmVkTW9kdWxlcyIsIm1vZHVsZXNRdWV1ZSIsIm1haW4iLCJyZXF1aXJlZE1vZHVsZXMiLCJzZWVuTW9kdWxlcyIsInF1ZXVlIiwibW9kdWxlVG9DaGVjayIsIm5ld01vZHVsZXMiLCJuZXdNb2R1bGVzS2V5cyIsIl9fd2VicGFja19tb2R1bGVzX18iLCJhbGwiLCJlbnRyeU1vZHVsZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJqb2luIiwiYmxvYiIsIkJsb2IiLCJiYXJlIiwiVVJMIiwid2Via2l0VVJMIiwibW96VVJMIiwibXNVUkwiLCJ3b3JrZXJVcmwiLCJjcmVhdGVPYmplY3RVUkwiLCJ3b3JrZXIiLCJXb3JrZXIiLCJvYmplY3RVUkwiLCJSRU1VWF9FUlJPUiIsIk1TRV9FVkVOVFMiLCJTT1VSQ0VfVVBEQVRFX0VORCIsIkhMU19FVkVOVFMiLCJSRVRSWV9USU1FX0VYQ0VFREVEIiwiQUxMRVZFTlRTIiwiRmx2QWxsb3dlZEV2ZW50cyIsIkhsc0FsbG93ZWRFdmVudHMiLCJDT05URVhUX0NPTU9NQU5EUyIsIk9OIiwiT05DRSIsIk9GRiIsIkVNSVQiLCJERVNUUk9ZIiwiRElSRUNUX0VNSVRfRkxBRyIsImFsbG93ZWRFdmVudHMiLCJfZW1pdHRlciIsIl9pbnN0YW5jZU1hcCIsIl9jbHNNYXAiLCJfaW5pdGVkIiwiX2hvb2tzIiwidGFnIiwiaW5pdEluc3RhbmNlIiwibmV3SW5zdGFuY2UiLCJyZWdpc3RyeSIsImNscyIsImNoZWNrTWVzc2FnZU5hbWUiLCJfaXNNZXNzYWdlTmFtZVZhbGlkIiwic2VsZiIsImVuaGFuY2VkIiwib25jZUxpc3RlbmVycyIsIm1lc3NhZ2VOYW1lIiwiY2FsbGJhY2siLCJiZWZvcmVMaXN0IiwiZW1pdFRvIiwicmVtb3ZlTGlzdGVuZXJzIiwiaGFzT3duIiwiY2FsbGJhY2tzIiwiZGVzdHJveUluc3RhbmNlcyIsImxlIiwic2V0SW50MTYiLCJJbnQxNkFycmF5IiwiZGV2aWNlIiwib3MiLCJpc1BjIiwiaXNUYWJsZXQiLCJicm93c2VyIiwidWEiLCJyZWciLCJpZSIsImZpcmZveCIsImNocm9tZSIsIm9wZXJhIiwic2FmYXJpIiwiaXNXaW5kb3dzUGhvbmUiLCJpc1N5bWJpYW4iLCJpc0FuZHJvaWQiLCJpc0ZpcmVGb3giLCJpc1Bob25lIiwib3V0IiwiaW5wdXQiLCJmcm9tQ2hhckNvZGUiLCJfY2hlY2tDb250aW51YXRpb24iLCJ1Y3M0IiwiY2hlY2tMZW5ndGgiLCJBdWRpb0N0eCIsIkF1ZGlvQ29udGV4dCIsIndlYmtpdEF1ZGlvQ29udGV4dCIsImdhaW5Ob2RlIiwiY3JlYXRlR2FpbiIsImNvbm5lY3QiLCJkZXN0aW5hdGlvbiIsInByZWxvYWRUaW1lIiwiX2N1cnJlbnRCdWZmZXIiLCJfbmV4dEJ1ZmZlciIsIl9sYXN0cHRzIiwiX3ByZURlY29kZSIsIl9jdXJyZW50VGltZSIsIl9kZWNvZGluZyIsIl9wbGF5ZWQiLCJjdXJyZW50VGltZSIsImRlY29kZUF1ZGlvIiwic2V0QXVkaW9EYXRhIiwiZGVjb2RlQUFDIiwic2FtcGxlRGF0YSIsImdldEFBQ0RhdGEiLCJjb21iaWxlRGF0YSIsImRlY29kZUF1ZGlvRGF0YSIsImF1ZGlvU291cmNlIiwiY3JlYXRlQnVmZmVyU291cmNlIiwib25lbmRlZCIsIm9uU291cmNlRW5kZWQiLCJnZXRUaW1lQnVmZmVyIiwicGxheSIsInNldEF1ZGlvTWV0YURhdGEiLCJhZHRzIiwiZ2V0QWR0cyIsImsiLCJhYWNmcmFtZWxlbmd0aCIsIkFWUmVjb25jaWxlciIsInByb3BzIiwiYUN0eCIsInZDdHgiLCJ0aW1lb3V0SWQiLCJkb1JlY29uY2lsZSIsInZDdXJUaW1lIiwiYUN1clRpbWUiLCJIVE1MRWxlbWVudCIsIlZpZGVvQ3R4IiwidGlja2VyIiwiaGlzdG9yeVRpbWUiLCJyZWNvbmNpbGVyIiwib25jYW5wbGF5IiwiYXBwZW5kQ2hpbGQiLCJjYW52YXMiLCJkaXNwYXRjaEV2ZW50IiwiRXZlbnQiLCJsb2ciLCJvbkRlbXV4Q29tcGxldGUiLCJkZWNvZGVWaWRlbyIsInNldEF1ZGlvTWV0YSIsInNldFZpZGVvTWV0YSIsInNldFZpZGVvTWV0YURhdGEiLCJjdXN0b21FbGVtZW50cyIsImRlZmluZSIsIlNvdXJjZUJ1ZmZlciIsImN1cnJlbnRHb3AiLCJfbGFzdEdldCIsImZyYW1lIiwibmV4dEdvcCIsIl9nZXROZXh0IiwiZ29wIiwicmVtb3ZlIiwiVGlja2VyIiwiaW50ZXJ2YWwiLCJvblRpY2siLCJzZXRJbnRlcnZhbCIsIlJhZlRpY2tlciIsInByZXYiLCJ0aW1lcklkIiwiX3N1YlRpbWVySWQiLCJfdGlja0Z1bmMiLCJnZXRUaWNrRnVuYyIsInRpY2siLCJuZXh0VGljayIsInN0b3AiLCJjYW5jZWxGdW5jIiwiZ2V0Q2FuY2VsRnVuYyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwid2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJpc1N1cHBvcnRlZCIsIlRpbWVvdXRUaWNrZXIiLCJjbGVhckludGVydmFsIiwiZ2V0VGlja2VyIiwiVmlkZW9DYW52YXMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJvbkZpcnN0RnJhbWUiLCJyZWFkeVN0YXR1cyIsInBhdXNlZCIsImxhc3RQbGF5ZWQiLCJfZGVjb2RlckluaXRlZCIsIl9hdmNjcHVzaGVkIiwiX2RlY29kZWRGcmFtZXMiLCJfbGFzdFNhbXBsZUR0cyIsIl9iYXNlRHRzIiwiaW5pdFdhc21Xb3JrZXIiLCJ3YXNtd29ya2VyIiwicG9zdE1lc3NhZ2UiLCJtc2ciLCJhZGRFdmVudExpc3RlbmVyIiwiX29uRGVjb2RlZCIsInl1dkNhbnZhcyIsIllVVkNhbnZhcyIsIl9wcmVsb2FkIiwiX2FuYWx5c2VOYWwiLCJfb25UaW1lciIsInJlbmRlckNvc3QiLCJyZW5kZXJTdGFydCIsIm5vdyIsIm5leHRUaW1lIiwiZnJhbWVUaW1lcyIsImZyYW1lVGltZSIsInJlbmRlciIsIl9jbGVhbkJ1ZmZlciIsInNldFRpbWVvdXQiLCJNQVhfU1RSRUFNX0JVRkZFUl9MRU5HVEgiLCJEZWNvZGVyIiwiaW5pdGVkIiwiaW5mb2xpc3QiLCJwYXJfYnJvYWR3YXlPbkJyb2Fkd2F5SW5pdGVkIiwiYnJvYWR3YXlPbkJyb2Fkd2F5SW5pdGVkIiwicGFyX2Jyb2Fkd2F5T25QaWN0dXJlRGVjb2RlZCIsImJyb2Fkd2F5T25QaWN0dXJlRGVjb2RlZCIsInRvVThBcnJheSIsInB0ciIsIkhFQVBVOCIsIk1vZHVsZSIsIl9icm9hZHdheUluaXQiLCJzdHJlYW1CdWZmZXIiLCJfYnJvYWR3YXlDcmVhdGVTdHJlYW0iLCJpbmZvaWQiLCJkYXRldGVtcCIsImdldFRpbWUiLCJfYnJvYWR3YXlQbGF5U3RyZWFtIiwiZGVjb2RlciIsIm9uUG9zdFJ1biIsImltcG9ydFNjcmlwdHMiLCJhZGRPblBvc3RSdW4iLCJlIiwic3R5bGUiLCJfaW5pdENvbnRleHRHTCIsImNvbnRleHRHTCIsIl9pbml0UHJvZ3JhbSIsIl9pbml0QnVmZmVycyIsIl9pbml0VGV4dHVyZXMiLCJnbCIsInZhbGlkQ29udGV4dE5hbWVzIiwibmFtZUluZGV4IiwiY29udGV4dE5hbWUiLCJjb250ZXh0T3B0aW9ucyIsImdldENvbnRleHQiLCJnZXRQYXJhbWV0ZXIiLCJ2ZXJ0ZXhTaGFkZXJTY3JpcHQiLCJmcmFnbWVudFNoYWRlclNjcmlwdCIsIllVVjJSR0IiLCJ2ZXJ0ZXhTaGFkZXIiLCJjcmVhdGVTaGFkZXIiLCJWRVJURVhfU0hBREVSIiwic2hhZGVyU291cmNlIiwiY29tcGlsZVNoYWRlciIsImdldFNoYWRlclBhcmFtZXRlciIsIkNPTVBJTEVfU1RBVFVTIiwiZ2V0U2hhZGVySW5mb0xvZyIsImZyYWdtZW50U2hhZGVyIiwiRlJBR01FTlRfU0hBREVSIiwiY3JlYXRlUHJvZ3JhbSIsImF0dGFjaFNoYWRlciIsImxpbmtQcm9ncmFtIiwiZ2V0UHJvZ3JhbVBhcmFtZXRlciIsIkxJTktfU1RBVFVTIiwiZ2V0UHJvZ3JhbUluZm9Mb2ciLCJ1c2VQcm9ncmFtIiwiWVVWMlJHQlJlZiIsImdldFVuaWZvcm1Mb2NhdGlvbiIsInVuaWZvcm1NYXRyaXg0ZnYiLCJzaGFkZXJQcm9ncmFtIiwidmVydGV4UG9zQnVmZmVyIiwiY3JlYXRlQnVmZmVyIiwiYmluZEJ1ZmZlciIsIkFSUkFZX0JVRkZFUiIsImJ1ZmZlckRhdGEiLCJGbG9hdDMyQXJyYXkiLCJTVEFUSUNfRFJBVyIsInZlcnRleFBvc1JlZiIsImdldEF0dHJpYkxvY2F0aW9uIiwiZW5hYmxlVmVydGV4QXR0cmliQXJyYXkiLCJ2ZXJ0ZXhBdHRyaWJQb2ludGVyIiwiRkxPQVQiLCJ0ZXh0dXJlUG9zQnVmZmVyIiwidGV4dHVyZVBvc1JlZiIsInVUZXh0dXJlUG9zQnVmZmVyIiwidVRleHR1cmVQb3NSZWYiLCJ2VGV4dHVyZVBvc0J1ZmZlciIsInZUZXh0dXJlUG9zUmVmIiwieVRleHR1cmVSZWYiLCJfaW5pdFRleHR1cmUiLCJ5U2FtcGxlclJlZiIsInVuaWZvcm0xaSIsInVUZXh0dXJlUmVmIiwidVNhbXBsZXJSZWYiLCJ2VGV4dHVyZVJlZiIsInZTYW1wbGVyUmVmIiwidGV4dHVyZVJlZiIsInNhbXBsZXJSZWYiLCJjcmVhdGVUZXh0dXJlIiwiYmluZFRleHR1cmUiLCJURVhUVVJFXzJEIiwidGV4UGFyYW1ldGVyaSIsIlRFWFRVUkVfTUFHX0ZJTFRFUiIsIk5FQVJFU1QiLCJURVhUVVJFX01JTl9GSUxURVIiLCJURVhUVVJFX1dSQVBfUyIsIkNMQU1QX1RPX0VER0UiLCJURVhUVVJFX1dSQVBfVCIsIl9kcmF3UGljdHVyZUdMIiwibldpZHRoIiwieWxlbiIsInV2bGVuIiwicmVuZGVyRGF0YSIsInlEYXRhIiwidURhdGEiLCJ2RGF0YSIsInlBcnJheSIsInVBcnJheSIsInZBcnJheSIsIl9kcmF3UGljdHVyZUdMNDIwIiwiX2RyYXdQaWN0dXJlR0w0MjIiLCJkYXRhUGVyUm93Iiwicm93Q250Iiwidmlld3BvcnQiLCJ0VG9wIiwidExlZnQiLCJ0Qm90dG9tIiwidFJpZ2h0IiwidGV4dHVyZVBvc1ZhbHVlcyIsIkRZTkFNSUNfRFJBVyIsInVuaWZvcm0yZiIsImFjdGl2ZVRleHR1cmUiLCJURVhUVVJFMCIsInRleEltYWdlMkQiLCJMVU1JTkFOQ0UiLCJVTlNJR05FRF9CWVRFIiwiZHJhd0FycmF5cyIsIlRSSUFOR0xFX1NUUklQIiwieURhdGFQZXJSb3ciLCJ5Um93Q250IiwidURhdGFQZXJSb3ciLCJ1Um93Q250IiwidkRhdGFQZXJSb3ciLCJ2Um93Q250IiwidVRleHR1cmVQb3NWYWx1ZXMiLCJ2VGV4dHVyZVBvc1ZhbHVlcyIsIlRFWFRVUkUxIiwiVEVYVFVSRTIiLCJfZHJhd1BpY3R1cmVSR0IiLCJpc09iamVjdEZpbGxlZCIsIm1pbWVUeXBlIiwiaXNDb21wbGV0ZSIsImlzQmFzZUluZm9SZWFkeSIsImlzVmlkZW9SZWFkeSIsImlzQXVkaW9SZWFkeSIsIl9kZWZhdWx0IiwiZ2V0RGVmYXVsdEluZiIsImVudHJpZXMiLCJ2IiwiaXNSQVAiLCJfdHlwZSIsIl9sYXN0QXBwZW5kTG9jYXRpb24iLCJpc0VtcHR5IiwiX3NlYXJjaE5lYXJlc3RTZWdtZW50QmVmb3JlIiwiYmVnaW5EdHMiLCJsYXN0IiwibWlkIiwibGJvdW5kIiwidWJvdW5kIiwiaWR4IiwibGFzdFNhbXBsZSIsIl9zZWFyY2hOZWFyZXN0U2VnbWVudEFmdGVyIiwic2VnbWVudCIsImxhc3RBcHBlbmRJZHgiLCJpbnNlcnRJZHgiLCJvcmlnaW5TdGFydER0cyIsImdldExhc3RTZWdtZW50QmVmb3JlIiwiZ2V0TGFzdFNhbXBsZUJlZm9yZSIsImdldExhc3RSQVBCZWZvcmUiLCJzZWdtZW50SWR4IiwicmFuZG9tQWNjZXNzUG9pbnRzIiwic3RhcnREdHMiLCJlbmREdHMiLCJzdGFydFB0cyIsImVuZFB0cyIsIm9yaWdpbkVuZER0cyIsImFkZFJBUCIsIk1TRSIsImNvbnRhaW5lciIsIm1lZGlhU291cmNlIiwic291cmNlQnVmZmVycyIsIk1lZGlhU291cmNlIiwib25Tb3VyY2VPcGVuIiwib25UaW1lVXBkYXRlIiwib25XYWl0aW5nIiwiYWRkU291cmNlQnVmZmVycyIsIm9uVXBkYXRlRW5kIiwiZG9BcHBlbmQiLCJyZWFkeVN0YXRlIiwiYWRkIiwiZHVyIiwibWltZSIsInNvdXJjZUJ1ZmZlciIsImFkZFNvdXJjZUJ1ZmZlciIsInVwZGF0aW5nIiwiYXBwZW5kQnVmZmVyIiwiZW5kT2ZTdHJlYW0iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVtb3ZlU291cmNlQnVmZmVyIiwicmVhZEFzSW50IiwidGVtcCIsInBhZFN0YXJ0NEhleCIsImhleE51bSIsImhleFN0ciIsInBhZFN0YXJ0IiwibG9vcCIsInNpZ24iLCJyZXMiLCJyZWFkVWludDY0IiwicmVhZEludDE2IiwicmVhZEludDMyIiwiVGFnIiwiTG9nZ2VyIiwiRmx2Q29udHJvbGxlciIsInBsYXllciIsIl9wbGF5ZXIiLCJpbml0U2VnbWVudEFycml2ZWQiLCJpbml0TGlzdGVuZXJzIiwiX2hhbmRsZUxvYWRlckRhdGFMb2FkZWQiLCJfaGFuZGxlTmV0d29ya0Vycm9yIiwiX2hhbmRsZU1lZGlhSW5mbyIsIl9oYW5kbGVNZXRhZGF0YVBhcnNlZCIsIl9oYW5kbGVEZW11eENvbXBsZXRlIiwiX2hhbmRsZURlbXV4RXJyb3IiLCJfc2V0TWV0YVRvQXVkaW8iLCJfc2V0TWV0YVRvVmlkZW8iLCJfaGFuZGxlQXBwZW5kSW5pdFNlZ21lbnQiLCJQbGF5ZXIiLCJFcnJvcnMiLCJsb2FkRGF0YSIsInBhdXNlIiwibG9hZGVyIiwicmVzb2x2ZVZpZGVvR09QIiwiZmlyc3RJZnJhbWVJZHgiLCJsYXN0SWZyYW1lSWR4IiwidGVtcFNhbXBsZXMiLCJyZXN0IiwiZmx2QWxsb3dlZEV2ZW50cyIsIkZsdlBsYXllciIsImluaXRFdmVudHMiLCJpbml0Rmx2IiwiZmx2IiwiaW5pdEZsdkV2ZW50cyIsInV0aWwiLCJhZGRDbGFzcyIsInJvb3QiLCJmaW5kRG9tIiwibGl2ZSIsImNyZWF0ZURvbSIsImNvbnRyb2xzIiwidGltZXIiLCJnZXRCdWZmZXJlZFJhbmdlIiwicmFuZ2UiLCJGTFYiLCJfaGFzU3RhcnQiLCJfZGVzdHJveSIsIm1zZSIsImN1cnJlbnRTcmMiXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsSUFBSUEsSUFBSSxPQUFPQyxPQUFQLEtBQW1CLFFBQW5CLEdBQThCQSxPQUE5QixHQUF3QyxJQUFoRDtBQUNBLElBQUlDLGVBQWVGLEtBQUssT0FBT0EsRUFBRUcsS0FBVCxLQUFtQixVQUF4QixHQUNmSCxFQUFFRyxLQURhLEdBRWYsU0FBU0QsWUFBVCxDQUFzQkUsTUFBdEIs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QUFDQSxTQUFLMXlDLE9BQUwsR0FBZSxJQUFmO0FBQ0Q7O0FBRUQsTUFBSXVQLEdBQUosR0FBVztBQUNULFdBQU8sS0FBS21rQyxVQUFaO0FBQ0Q7O0FBRUQsTUFBSW5rQyxHQUFKLENBQVNtUCxHQUFULEVBQWM7QUFDWixTQUFLcXlCLE1BQUwsQ0FBWWwyQixNQUFaLENBQW1CNkQsR0FBbkIsR0FBeUJBLEdBQXpCO0FBQ0EsUUFBSSxDQUFDLEtBQUttakIsTUFBVixFQUFrQjtBQUNoQixXQUFLa1EsS0FBTDtBQUNBLFdBQUtqd0MsSUFBTCxDQUFVLE9BQVYsRUFBbUIsTUFBTTtBQUN2QixhQUFLZ0QsS0FBTCxDQUFXNFosR0FBWDtBQUNELE9BRkQ7QUFHQSxXQUFLNWMsSUFBTCxDQUFVLFNBQVYsRUFBcUIsTUFBTTtBQUN6QixhQUFLMjdCLElBQUw7QUFDRCxPQUZEO0FBR0QsS0FSRCxNQVFPO0FBQ0wsV0FBSzM0QixLQUFMLENBQVc0WixHQUFYO0FBQ0Q7QUFDRCxTQUFLNWMsSUFBTCxDQUFVLFNBQVYsRUFBcUIsTUFBTTtBQUN6QixXQUFLODZCLFdBQUwsR0FBbUIsQ0FBbkI7QUFDRCxLQUZEO0FBR0Q7QUF0SDRCOztBQXlIL0I3K0IsT0FBT0MsT0FBUCxHQUFpQnUwQyxTQUFqQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlIQSxhQUFhLG1DQUFtQyxFQUFFLEkiLCJmaWxlIjoibW9iaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFIgPSB0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgPyBSZWZsZWN0IDogbnVsbFxudmFyIFJlZmxlY3RBcHBseSA9IFIgJiYgdHlwZW9mIFIuYXBwbHkgPT09ICdmdW5jdGlvbidcbiAgPyBSLmFwcGx5XG4gIDogZnVuY3Rpb24gUmVmbGVjdEFwcGx5KHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwodGFyZ2V0LCByZWNlaXZlciwgYXJncyk7XG4gIH1cblxudmFyIFJlZmxlY3RPd25LZXlzXG5pZiAoUiAmJiB0eXBlb2YgUi5vd25LZXlzID09PSAnZnVuY3Rpb24nKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gUi5vd25LZXlzXG59IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KVxuICAgICAgLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkpO1xuICB9O1xufSBlbHNlIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gUHJvY2Vzc0VtaXRXYXJuaW5nKHdhcm5pbmcpIHtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSBjb25zb2xlLndhcm4od2FybmluZyk7XG59XG5cbnZhciBOdW1iZXJJc05hTiA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiBOdW1iZXJJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHNDb3VudCA9IDA7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbnZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudEVtaXR0ZXIsICdkZWZhdWx0TWF4TGlzdGVuZXJzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyB8fCBhcmcgPCAwIHx8IE51bWJlcklzTmFOKGFyZykpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIGFyZyArICcuJyk7XG4gICAgfVxuICAgIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBhcmc7XG4gIH1cbn0pO1xuXG5FdmVudEVtaXR0ZXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gIGlmICh0aGlzLl9ldmVudHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgTnVtYmVySXNOYU4obikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBuICsgJy4nKTtcbiAgfVxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uICRnZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuICRnZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICB2YXIgZG9FcnJvciA9ICh0eXBlID09PSAnZXJyb3InKTtcblxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpXG4gICAgZG9FcnJvciA9IChkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PT0gdW5kZWZpbmVkKTtcbiAgZWxzZSBpZiAoIWRvRXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICB2YXIgZXI7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMClcbiAgICAgIGVyID0gYXJnc1swXTtcbiAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgLy8gTm90ZTogVGhlIGNvbW1lbnRzIG9uIHRoZSBgdGhyb3dgIGxpbmVzIGFyZSBpbnRlbnRpb25hbCwgdGhleSBzaG93XG4gICAgICAvLyB1cCBpbiBOb2RlJ3Mgb3V0cHV0IGlmIHRoaXMgcmVzdWx0cyBpbiBhbiB1bmhhbmRsZWQgZXhjZXB0aW9uLlxuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgfVxuICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmhhbmRsZWQgZXJyb3IuJyArIChlciA/ICcgKCcgKyBlci5tZXNzYWdlICsgJyknIDogJycpKTtcbiAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgIHRocm93IGVycjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgfVxuXG4gIHZhciBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIFJlZmxlY3RBcHBseShoYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgUmVmbGVjdEFwcGx5KGxpc3RlbmVyc1tpXSwgdGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldC5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA/IGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gICAgICAvLyBSZS1hc3NpZ24gYGV2ZW50c2AgYmVjYXVzZSBhIG5ld0xpc3RlbmVyIGhhbmRsZXIgY291bGQgaGF2ZSBjYXVzZWQgdGhlXG4gICAgICAvLyB0aGlzLl9ldmVudHMgdG8gYmUgYXNzaWduZWQgdG8gYSBuZXcgb2JqZWN0XG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPVxuICAgICAgICBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOiBbZXhpc3RpbmcsIGxpc3RlbmVyXTtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB9IGVsc2UgaWYgKHByZXBlbmQpIHtcbiAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdGluZy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICAgIG0gPSAkZ2V0TWF4TGlzdGVuZXJzKHRhcmdldCk7XG4gICAgaWYgKG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0gJiYgIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgIC8vIE5vIGVycm9yIGNvZGUgZm9yIHRoaXMgc2luY2UgaXQgaXMgYSBXYXJuaW5nXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIHZhciB3ID0gbmV3IEVycm9yKCdQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5sZW5ndGggKyAnICcgKyBTdHJpbmcodHlwZSkgKyAnIGxpc3RlbmVycyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luY3JlYXNlIGxpbWl0Jyk7XG4gICAgICB3Lm5hbWUgPSAnTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nJztcbiAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgIHcudHlwZSA9IHR5cGU7XG4gICAgICB3LmNvdW50ID0gZXhpc3RpbmcubGVuZ3RoO1xuICAgICAgUHJvY2Vzc0VtaXRXYXJuaW5nKHcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcblxuZnVuY3Rpb24gb25jZVdyYXBwZXIoKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgaWYgKCF0aGlzLmZpcmVkKSB7XG4gICAgdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLCB0aGlzLndyYXBGbik7XG4gICAgdGhpcy5maXJlZCA9IHRydWU7XG4gICAgUmVmbGVjdEFwcGx5KHRoaXMubGlzdGVuZXIsIHRoaXMudGFyZ2V0LCBhcmdzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfb25jZVdyYXAodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgc3RhdGUgPSB7IGZpcmVkOiBmYWxzZSwgd3JhcEZuOiB1bmRlZmluZWQsIHRhcmdldDogdGFyZ2V0LCB0eXBlOiB0eXBlLCBsaXN0ZW5lcjogbGlzdGVuZXIgfTtcbiAgdmFyIHdyYXBwZWQgPSBvbmNlV3JhcHBlci5iaW5kKHN0YXRlKTtcbiAgd3JhcHBlZC5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICBzdGF0ZS53cmFwRm4gPSB3cmFwcGVkO1xuICByZXR1cm4gd3JhcHBlZDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cbiAgdGhpcy5vbih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRPbmNlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGxpc3QgPSBldmVudHNbdHlwZV07XG4gICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8IGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0Lmxpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgICAgIGZvciAoaSA9IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHwgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsTGlzdGVuZXIgPSBsaXN0W2ldLmxpc3RlbmVyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09IDApXG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcGxpY2VPbmUobGlzdCwgcG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKVxuICAgICAgICAgIGV2ZW50c1t0eXBlXSA9IGxpc3RbMF07XG5cbiAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBvcmlnaW5hbExpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cywgaTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRzW3R5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV07XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuZnVuY3Rpb24gX2xpc3RlbmVycyh0YXJnZXQsIHR5cGUsIHVud3JhcCkge1xuICB2YXIgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgaWYgKGV2bGlzdGVuZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiB1bndyYXAgPyBbZXZsaXN0ZW5lci5saXN0ZW5lciB8fCBldmxpc3RlbmVyXSA6IFtldmxpc3RlbmVyXTtcblxuICByZXR1cm4gdW53cmFwID9cbiAgICB1bndyYXBMaXN0ZW5lcnMoZXZsaXN0ZW5lcikgOiBhcnJheUNsb25lKGV2bGlzdGVuZXIsIGV2bGlzdGVuZXIubGVuZ3RoKTtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCB0cnVlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmF3TGlzdGVuZXJzID0gZnVuY3Rpb24gcmF3TGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5saXN0ZW5lckNvdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGlzdGVuZXJDb3VudC5jYWxsKGVtaXR0ZXIsIHR5cGUpO1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBsaXN0ZW5lckNvdW50O1xuZnVuY3Rpb24gbGlzdGVuZXJDb3VudCh0eXBlKSB7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHJldHVybiB0aGlzLl9ldmVudHNDb3VudCA+IDAgPyBSZWZsZWN0T3duS2V5cyh0aGlzLl9ldmVudHMpIDogW107XG59O1xuXG5mdW5jdGlvbiBhcnJheUNsb25lKGFyciwgbikge1xuICB2YXIgY29weSA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpXG4gICAgY29weVtpXSA9IGFycltpXTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKDsgaW5kZXggKyAxIDwgbGlzdC5sZW5ndGg7IGluZGV4KyspXG4gICAgbGlzdFtpbmRleF0gPSBsaXN0W2luZGV4ICsgMV07XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhhcnIpIHtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyArK2kpIHtcbiAgICByZXRbaV0gPSBhcnJbaV0ubGlzdGVuZXIgfHwgYXJyW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgVHJhY2s6IHJlcXVpcmUoJy4vc3JjL3RyYWNrJykuZGVmYXVsdCxcbiAgVHJhY2tzOiByZXF1aXJlKCcuL3NyYy90cmFjaycpLlRyYWNrcyxcbiAgQXVkaW9UcmFjazogcmVxdWlyZSgnLi9zcmMvdHJhY2snKS5BdWRpb1RyYWNrLFxuICBWaWRlb1RyYWNrOiByZXF1aXJlKCcuL3NyYy90cmFjaycpLlZpZGVvVHJhY2ssXG5cbiAgWGdCdWZmZXI6IHJlcXVpcmUoJy4vc3JjL2J1ZmZlcicpLlhnQnVmZmVyLFxuICBSZW11eEJ1ZmZlcjogcmVxdWlyZSgnLi9zcmMvYnVmZmVyJykuUmVtdXhCdWZmZXIsXG5cbiAgUHJlU291cmNlOiByZXF1aXJlKCcuL3NyYy9wcmVzb3VjZScpLmRlZmF1bHRcbn07XG4iLCJleHBvcnQgY2xhc3MgWGdCdWZmZXIge1xuICAvKipcbiAgICogQSBidWZmZXIgdG8gc3RvcmUgbG9hZGVkIGRhdGEuXG4gICAqXG4gICAqIEBjbGFzcyBMb2FkZXJCdWZmZXJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aCAtIE9wdGlvbmFsIHRoZSBidWZmZXIgc2l6ZVxuICAgKi9cbiAgY29uc3RydWN0b3IgKGxlbmd0aCkge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoIHx8IDBcbiAgICB0aGlzLmhpc3RvcnlMZW4gPSBsZW5ndGggfHwgMFxuICAgIHRoaXMuYXJyYXkgPSBbXVxuICAgIHRoaXMub2Zmc2V0ID0gMFxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBmdW5jdGlvbiB0byBwdXNoIGRhdGEuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBkYXRhIC0gVGhlIGRhdGEgdG8gcHVzaCBpbnRvIHRoZSBidWZmZXJcbiAgICovXG4gIHB1c2ggKGRhdGEpIHtcbiAgICB0aGlzLmFycmF5LnB1c2goZGF0YSlcbiAgICB0aGlzLmxlbmd0aCArPSBkYXRhLmJ5dGVMZW5ndGhcbiAgICB0aGlzLmhpc3RvcnlMZW4gKz0gZGF0YS5ieXRlTGVuZ3RoXG4gIH1cblxuICAvKipcbiAgICogVGhlIGZ1bmN0aW9uIHRvIHNoaWZ0IGRhdGEuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSBUaGUgc2l6ZSBvZiBzaGlmdC5cbiAgICovXG4gIHNoaWZ0IChsZW5ndGgpIHtcbiAgICBpZiAodGhpcy5hcnJheS5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoMClcbiAgICB9XG5cbiAgICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zaGlmdEJ1ZmZlcigpXG4gICAgfVxuICAgIGlmICgodGhpcy5vZmZzZXQgKyBsZW5ndGgpID09PSB0aGlzLmFycmF5WzBdLmxlbmd0aCkge1xuICAgICAgbGV0IHJldCA9IHRoaXMuYXJyYXlbMF0uc2xpY2UodGhpcy5vZmZzZXQsIHRoaXMub2Zmc2V0ICsgbGVuZ3RoKVxuICAgICAgdGhpcy5vZmZzZXQgPSAwXG4gICAgICB0aGlzLmFycmF5LnNoaWZ0KClcbiAgICAgIHRoaXMubGVuZ3RoIC09IGxlbmd0aFxuICAgICAgcmV0dXJuIHJldFxuICAgIH1cblxuICAgIGlmICgodGhpcy5vZmZzZXQgKyBsZW5ndGgpIDwgdGhpcy5hcnJheVswXS5sZW5ndGgpIHtcbiAgICAgIGxldCByZXQgPSB0aGlzLmFycmF5WzBdLnNsaWNlKHRoaXMub2Zmc2V0LCB0aGlzLm9mZnNldCArIGxlbmd0aClcbiAgICAgIHRoaXMub2Zmc2V0ICs9IGxlbmd0aFxuICAgICAgdGhpcy5sZW5ndGggLT0gbGVuZ3RoXG4gICAgICByZXR1cm4gcmV0XG4gICAgfVxuXG4gICAgbGV0IHJldCA9IG5ldyBVaW50OEFycmF5KGxlbmd0aClcbiAgICBsZXQgdG1wb2ZmID0gMFxuICAgIHdoaWxlICh0aGlzLmFycmF5Lmxlbmd0aCA+IDAgJiYgbGVuZ3RoID4gMCkge1xuICAgICAgaWYgKCh0aGlzLm9mZnNldCArIGxlbmd0aCkgPCB0aGlzLmFycmF5WzBdLmxlbmd0aCkge1xuICAgICAgICBsZXQgdG1wID0gdGhpcy5hcnJheVswXS5zbGljZSh0aGlzLm9mZnNldCwgdGhpcy5vZmZzZXQgKyBsZW5ndGgpXG4gICAgICAgIHJldC5zZXQodG1wLCB0bXBvZmYpXG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IGxlbmd0aFxuICAgICAgICB0aGlzLmxlbmd0aCAtPSBsZW5ndGhcbiAgICAgICAgbGVuZ3RoID0gMFxuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHRlbXBsZW5ndGggPSB0aGlzLmFycmF5WzBdLmxlbmd0aCAtIHRoaXMub2Zmc2V0XG4gICAgICAgIHJldC5zZXQodGhpcy5hcnJheVswXS5zbGljZSh0aGlzLm9mZnNldCwgdGhpcy5hcnJheVswXS5sZW5ndGgpLCB0bXBvZmYpXG4gICAgICAgIHRoaXMuYXJyYXkuc2hpZnQoKVxuICAgICAgICB0aGlzLm9mZnNldCA9IDBcbiAgICAgICAgdG1wb2ZmICs9IHRlbXBsZW5ndGhcbiAgICAgICAgdGhpcy5sZW5ndGggLT0gdGVtcGxlbmd0aFxuICAgICAgICBsZW5ndGggLT0gdGVtcGxlbmd0aFxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0XG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gdG8gY2xlYXIgdGhlIGJ1ZmZlci5cbiAgICovXG4gIGNsZWFyICgpIHtcbiAgICB0aGlzLmFycmF5ID0gW11cbiAgICB0aGlzLmxlbmd0aCA9IDBcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuY2xlYXIoKVxuICAgIHRoaXMuaGlzdG9yeUxlbiA9IDBcbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0byBzaGlmdCBvbmUgdW5pdDhBcnJheS5cbiAgICovXG4gIF9zaGlmdEJ1ZmZlciAoKSB7XG4gICAgdGhpcy5sZW5ndGggLT0gdGhpcy5hcnJheVswXS5sZW5ndGhcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgICByZXR1cm4gdGhpcy5hcnJheS5zaGlmdCgpXG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCB1aW50OCBkYXRhIHRvIG51bWJlci5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IC0gdGhlIHN0YXJ0IHBvc3Rpb24uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSB0aGUgbGVuZ3RoIG9mIGRhdGEuXG4gICAqL1xuICB0b0ludCAoc3RhcnQsIGxlbmd0aCkge1xuICAgIGxldCByZXRJbnQgPSAwXG4gICAgbGV0IGkgPSB0aGlzLm9mZnNldCArIHN0YXJ0XG4gICAgd2hpbGUgKGkgPCB0aGlzLm9mZnNldCArIGxlbmd0aCArIHN0YXJ0KSB7XG4gICAgICBpZiAoaSA8IHRoaXMuYXJyYXlbMF0ubGVuZ3RoKSB7XG4gICAgICAgIHJldEludCA9IHJldEludCAqIDI1NiArIHRoaXMuYXJyYXlbMF1baV1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hcnJheVsxXSkge1xuICAgICAgICByZXRJbnQgPSByZXRJbnQgKiAyNTYgKyB0aGlzLmFycmF5WzFdW2kgLSB0aGlzLmFycmF5WzBdLmxlbmd0aF1cbiAgICAgIH1cblxuICAgICAgaSsrXG4gICAgfVxuICAgIHJldHVybiByZXRJbnRcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVtdXhCdWZmZXIge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy52aWRlbyA9IFtdXG4gICAgdGhpcy5hdWRpbyA9IFtdXG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLnZpZGVvID0gW11cbiAgICB0aGlzLmF1ZGlvID0gW11cbiAgfVxufVxuIiwiY2xhc3MgU291cmNlIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMubWltZXR5cGUgPSAnJztcbiAgICB0aGlzLmluaXQgPSBudWxsO1xuICAgIHRoaXMuZGF0YSA9IFtdO1xuICB9XG59XG5cbmNsYXNzIFByZVNvdXJjZSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLnNvdXJjZXMgPSB7fTtcbiAgfVxuXG4gIGdldFNvdXJjZSAoc291cmNlKSB7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlc1tzb3VyY2VdO1xuICB9XG5cbiAgY3JlYXRlU291cmNlIChuYW1lKSB7XG4gICAgdGhpcy5zb3VyY2VzW25hbWVdID0gbmV3IFNvdXJjZSgpO1xuICAgIHJldHVybiB0aGlzLnNvdXJjZXNbbmFtZV07XG4gIH1cblxuICBjbGVhciAoKSB7XG4gICAgdGhpcy5zb3VyY2VzID0ge307XG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLnNvdXJjZXMgPSB7fTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcmVTb3VyY2U7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUcmFjayB7XG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IuXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5pZCA9IC0xXG4gICAgdGhpcy5zZXF1ZW5jZU51bWJlciA9IDBcbiAgICB0aGlzLnNhbXBsZXMgPSBbXVxuICAgIHRoaXMuZHJvcHBlZFNhbXBsZXMgPSBbXVxuICAgIHRoaXMubGVuZ3RoID0gMFxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSB0cmFjay5cbiAgICovXG4gIHJlc2V0ICgpIHtcbiAgICB0aGlzLnNlcXVlbmNlTnVtYmVyID0gMFxuICAgIHRoaXMuc2FtcGxlcyA9IFtdXG4gICAgdGhpcy5sZW5ndGggPSAwXG4gIH1cbiAgLyoqXG4gICAqIGRlc3Ryb3kgdGhlIHRyYWNrLlxuICAgKi9cbiAgZGlzdHJveSAoKSB7XG4gICAgdGhpcy5yZXNldCgpXG4gICAgdGhpcy5pZCA9IC0xXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEF1ZGlvVHJhY2sgZXh0ZW5kcyBUcmFjayB7XG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIGF1ZGlvIHRyYWNrLlxuICAgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLlRBRyA9ICdBdWRpb1RyYWNrJ1xuICAgIHRoaXMudHlwZSA9ICdhdWRpbydcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVmlkZW9UcmFjayBleHRlbmRzIFRyYWNrIHtcbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdmlkZW8gdHJhY2suXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuVEFHID0gJ1ZpZGVvVHJhY2snXG4gICAgdGhpcy50eXBlID0gJ3ZpZGVvJ1xuICAgIHRoaXMuZHJvcHBlZCA9IDBcbiAgfVxuICAvKipcbiAgICogcmVzZXQgdGhlIHZpZGVvIHRyYWNrLlxuICAgKi9cbiAgcmVzZXQgKCkge1xuICAgIHRoaXMuc2VxdWVuY2VOdW1iZXIgPSAwXG4gICAgdGhpcy5zYW1wbGVzID0gW11cbiAgICB0aGlzLmxlbmd0aCA9IDBcbiAgICB0aGlzLmRyb3BwZWQgPSAwXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRyYWNrcyB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLmF1ZGlvVHJhY2sgPSBudWxsXG4gICAgdGhpcy52aWRlb1RyYWNrID0gbnVsbFxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgTmFsdW5pdDogcmVxdWlyZSgnLi9zcmMvaDI2NC9uYWx1bml0JykuZGVmYXVsdCxcbiAgU3BzUGFyc2VyOiByZXF1aXJlKCcuL3NyYy9oMjY0L25hbHVuaXQvc3BzJykuZGVmYXVsdCxcblxuICBDb21wYXRpYmlsaXR5OiByZXF1aXJlKCcuL3NyYy9jb21wYXRpYmlsaXR5JykuZGVmYXVsdFxufTtcbiIsIlxuY2xhc3MgQUFDIHtcblxuICBzdGF0aWMgZ2V0U2lsZW50RnJhbWUoY29kZWMsIGNoYW5uZWxDb3VudCkge1xuICAgIGlmIChjb2RlYyA9PT0gJ21wNGEuNDAuMicpIHtcbiAgICAgIC8vIGhhbmRsZSBMQy1BQUNcbiAgICAgIGlmIChjaGFubmVsQ291bnQgPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDAwLCAweGM4LCAweDAwLCAweDgwLCAweDIzLCAweDgwXSk7XG4gICAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gMikge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MjEsIDB4MDAsIDB4NDksIDB4OTAsIDB4MDIsIDB4MTksIDB4MDAsIDB4MjMsIDB4ODBdKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSAzKSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4ZV0pO1xuICAgICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDAwLCAweGM4LCAweDAwLCAweDgwLCAweDIwLCAweDg0LCAweDAxLCAweDI2LCAweDQwLCAweDA4LCAweDY0LCAweDAwLCAweDgwLCAweDJjLCAweDgwLCAweDA4LCAweDAyLCAweDM4XSk7XG4gICAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gNSkge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4ODIsIDB4MzAsIDB4MDQsIDB4OTksIDB4MDAsIDB4MjEsIDB4OTAsIDB4MDIsIDB4MzhdKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSA2KSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4MiwgMHgzMCwgMHgwNCwgMHg5OSwgMHgwMCwgMHgyMSwgMHg5MCwgMHgwMiwgMHgwMCwgMHhiMiwgMHgwMCwgMHgyMCwgMHgwOCwgMHhlMF0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBoYW5kbGUgSEUtQUFDIChtcDRhLjQwLjUgLyBtcDRhLjQwLjI5KVxuICAgICAgaWYgKGNoYW5uZWxDb3VudCA9PT0gMSkge1xuICAgICAgICAvLyBmZm1wZWcgLXkgLWYgbGF2ZmkgLWkgXCJhZXZhbHNyYz0wOmQ9MC4wNVwiIC1jOmEgbGliZmRrX2FhYyAtcHJvZmlsZTphIGFhY19oZSAtYjphIDRrIG91dHB1dC5hYWMgJiYgaGV4ZHVtcCAtdiAtZSAnMTYvMSBcIjB4JXgsXCIgXCJcXG5cIicgLXYgb3V0cHV0LmFhY1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MSwgMHg0MCwgMHgyMiwgMHg4MCwgMHhhMywgMHg0ZSwgMHhlNiwgMHg4MCwgMHhiYSwgMHg4LCAweDAsIDB4MCwgMHgwLCAweDFjLCAweDYsIDB4ZjEsIDB4YzEsIDB4YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1ZV0pO1xuICAgICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDIpIHtcbiAgICAgICAgLy8gZmZtcGVnIC15IC1mIGxhdmZpIC1pIFwiYWV2YWxzcmM9MHwwOmQ9MC4wNVwiIC1jOmEgbGliZmRrX2FhYyAtcHJvZmlsZTphIGFhY19oZV92MiAtYjphIDRrIG91dHB1dC5hYWMgJiYgaGV4ZHVtcCAtdiAtZSAnMTYvMSBcIjB4JXgsXCIgXCJcXG5cIicgLXYgb3V0cHV0LmFhY1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MSwgMHg0MCwgMHgyMiwgMHg4MCwgMHhhMywgMHg1ZSwgMHhlNiwgMHg4MCwgMHhiYSwgMHg4LCAweDAsIDB4MCwgMHgwLCAweDAsIDB4OTUsIDB4MCwgMHg2LCAweGYxLCAweGExLCAweGEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWVdKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSAzKSB7XG4gICAgICAgIC8vIGZmbXBlZyAteSAtZiBsYXZmaSAtaSBcImFldmFsc3JjPTB8MHwwOmQ9MC4wNVwiIC1jOmEgbGliZmRrX2FhYyAtcHJvZmlsZTphIGFhY19oZV92MiAtYjphIDRrIG91dHB1dC5hYWMgJiYgaGV4ZHVtcCAtdiAtZSAnMTYvMSBcIjB4JXgsXCIgXCJcXG5cIicgLXYgb3V0cHV0LmFhY1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MSwgMHg0MCwgMHgyMiwgMHg4MCwgMHhhMywgMHg1ZSwgMHhlNiwgMHg4MCwgMHhiYSwgMHg4LCAweDAsIDB4MCwgMHgwLCAweDAsIDB4OTUsIDB4MCwgMHg2LCAweGYxLCAweGExLCAweGEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWVdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBQUM7XG4iLCJpbXBvcnQge0VWRU5UU30gZnJvbSAneGdwbGF5ZXItdXRpbHMnXG5pbXBvcnQgQUFDIGZyb20gJy4vYWFjL2FhYy1oZWxwZXInXG5cbmNvbnN0IHtSRU1VWF9FVkVOVFN9ID0gRVZFTlRTXG5cbmNsYXNzIENvbXBhdGliaWxpdHkge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5uZXh0QXVkaW9EdHMgPSAwIC8vIOaooeaLn+S4i+S4gOautemfs+mikeaVsOaNrueahGR0c1xuICAgIHRoaXMubmV4dFZpZGVvRHRzID0gMCAvLyDmqKHmi5/kuIvkuIDmrrXop4bpopHmlbDmja7nmoRkdHNcblxuICAgIHRoaXMubGFzdEF1ZGlvU2FtcGxlc0xlbiA9IDAgLy8g5LiK5LiA5q616Z+z6aKR5pWw5o2u55qE6ZW/5bqmXG4gICAgdGhpcy5sYXN0VmlkZW9TYW1wbGVzTGVuID0gMCAvLyDkuIrkuIDmrrXop4bpopHmlbDmja7nmoTplb/luqZcblxuICAgIHRoaXMubGFzdFZpZGVvRHRzID0gdW5kZWZpbmVkIC8vIOS4iuS4gOautemfs+mikeaVsOaNrueahOmVv+W6plxuICAgIHRoaXMubGFzdEF1ZGlvRHRzID0gdW5kZWZpbmVkIC8vIOS4iuS4gOauteinhumikeaVsOaNrueahOmVv+W6plxuXG4gICAgdGhpcy5hbGxBdWRpb1NhbXBsZXNDb3VudCA9IDAgLy8g6Z+z6aKR5oC75pWw5o2u6YePKOWOn+Wni+W4pylcbiAgICB0aGlzLmFsbFZpZGVvU2FtcGxlc0NvdW50ID0gMCAvLyDop4bpopHmgLvmlbDmja7ph48o5Y6f5aeL5binKVxuXG4gICAgdGhpcy5fZmlyc3RBdWRpb1NhbXBsZSA9IG51bGxcbiAgICB0aGlzLl9maXJzdFZpZGVvU2FtcGxlID0gbnVsbFxuXG4gICAgdGhpcy5maWxsZWRBdWRpb1NhbXBsZXMgPSBbXSAvLyDooaXlhYXpn7PpopHluKfvvIjvvIlcbiAgICB0aGlzLmZpbGxlZFZpZGVvU2FtcGxlcyA9IFtdIC8vIOihpeWFheinhumikeW4p++8iO+8iVxuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgdGhpcy5iZWZvcmUoUkVNVVhfRVZFTlRTLlJFTVVYX01FRElBLCB0aGlzLmRvRml4LmJpbmQodGhpcykpXG4gIH1cblxuICByZXNldCAoKSB7XG4gICAgdGhpcy5uZXh0QXVkaW9EdHMgPSAwIC8vIOaooeaLn+S4i+S4gOautemfs+mikeaVsOaNrueahGR0c1xuICAgIHRoaXMubmV4dFZpZGVvRHRzID0gMCAvLyDmqKHmi5/kuIvkuIDmrrXop4bpopHmlbDmja7nmoRkdHNcblxuICAgIHRoaXMubGFzdEF1ZGlvU2FtcGxlc0xlbiA9IDAgLy8g5LiK5LiA5q616Z+z6aKR5pWw5o2u55qE6ZW/5bqmXG4gICAgdGhpcy5sYXN0VmlkZW9TYW1wbGVzTGVuID0gMCAvLyDkuIrkuIDmrrXop4bpopHmlbDmja7nmoTplb/luqZcblxuICAgIHRoaXMubGFzdFZpZGVvRHRzID0gdW5kZWZpbmVkIC8vIOS4iuS4gOautemfs+mikeaVsOaNrueahOmVv+W6plxuICAgIHRoaXMubGFzdEF1ZGlvRHRzID0gdW5kZWZpbmVkIC8vIOS4iuS4gOauteinhumikeaVsOaNrueahOmVv+W6plxuXG4gICAgdGhpcy5hbGxBdWRpb1NhbXBsZXNDb3VudCA9IDAgLy8g6Z+z6aKR5oC75pWw5o2u6YePKOWOn+Wni+W4pylcbiAgICB0aGlzLmFsbFZpZGVvU2FtcGxlc0NvdW50ID0gMCAvLyDop4bpopHmgLvmlbDmja7ph48o5Y6f5aeL5binKVxuXG4gICAgdGhpcy5fZmlyc3RBdWRpb1NhbXBsZSA9IG51bGxcbiAgICB0aGlzLl9maXJzdFZpZGVvU2FtcGxlID0gbnVsbFxuXG4gICAgdGhpcy5maWxsZWRBdWRpb1NhbXBsZXMgPSBbXSAvLyDooaXlhYXpn7PpopHluKfvvIjvvIlcbiAgICB0aGlzLmZpbGxlZFZpZGVvU2FtcGxlcyA9IFtdIC8vIOihpeWFheinhumikeW4p++8iO+8iVxuICB9XG5cbiAgZG9GaXggKCkge1xuICAgIGNvbnN0IHsgaXNGaXJzdEF1ZGlvU2FtcGxlcywgaXNGaXJzdFZpZGVvU2FtcGxlcyB9ID0gdGhpcy5nZXRGaXJzdFNhbXBsZSgpXG5cbiAgICB0aGlzLnJlbW92ZUludmFsaWRTYW1wbGVzKClcblxuICAgIHRoaXMucmVjb3JkU2FtcGxlc0NvdW50KClcblxuICAgIGlmICh0aGlzLl9maXJzdFZpZGVvU2FtcGxlKSB7XG4gICAgICB0aGlzLmZpeFJlZlNhbXBsZUR1cmF0aW9uKHRoaXMudmlkZW9UcmFjay5tZXRhLCB0aGlzLnZpZGVvVHJhY2suc2FtcGxlcylcbiAgICB9XG4gICAgaWYgKHRoaXMuX2ZpcnN0QXVkaW9TYW1wbGUpIHtcbiAgICAgIHRoaXMuZml4UmVmU2FtcGxlRHVyYXRpb24odGhpcy5hdWRpb1RyYWNrLm1ldGEsIHRoaXMuYXVkaW9UcmFjay5zYW1wbGVzKVxuICAgIH1cblxuICAgIHRoaXMuZG9GaXhWaWRlbyhpc0ZpcnN0VmlkZW9TYW1wbGVzKVxuICAgIHRoaXMuZG9GaXhBdWRpbyhpc0ZpcnN0QXVkaW9TYW1wbGVzKVxuICB9XG5cbiAgZG9GaXhWaWRlbyAoZmlyc3QpIHtcbiAgICBsZXQge3NhbXBsZXM6IHZpZGVvU2FtcGxlcywgbWV0YX0gPSB0aGlzLnZpZGVvVHJhY2tcblxuICAgIGlmIChtZXRhLmZyYW1lUmF0ZSAmJiBtZXRhLmZyYW1lUmF0ZS5maXhlZCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXZpZGVvU2FtcGxlcyB8fCAhdmlkZW9TYW1wbGVzLmxlbmd0aCB8fCAhdGhpcy5fZmlyc3RWaWRlb1NhbXBsZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gY29uc29sZS5sb2coYHZpZGVvIGxhc3RTYW1wbGUsICR7dmlkZW9TYW1wbGVzW3ZpZGVvU2FtcGxlcy5sZW5ndGggLSAxXS5kdHN9YClcblxuICAgIGNvbnN0IGZpcnN0U2FtcGxlID0gdmlkZW9TYW1wbGVzWzBdXG4gICAgY29uc3QgZmlyc3REdHMgPSBmaXJzdFNhbXBsZS5kdHNcblxuICAgIGNvbnN0IHNhbXBsZXNMZW4gPSB2aWRlb1NhbXBsZXMubGVuZ3RoO1xuXG4gICAgLy8gc3RlcDEuIOS/ruWkjeS4jmF1ZGlv6aaW5bin5beu6Led5aSq5aSn55qE6Zeu6aKYXG4gICAgaWYgKGZpcnN0ICYmIHRoaXMuX2ZpcnN0QXVkaW9TYW1wbGUpIHtcbiAgICAgIGNvbnN0IHZpZGVvRmlyc3REdHMgPSB0aGlzLl9maXJzdFZpZGVvU2FtcGxlLmR0c1xuICAgICAgY29uc3QgYXVkaW9GaXJzdER0cyA9IHRoaXMuX2ZpcnN0QXVkaW9TYW1wbGUuZHRzXG4gICAgICBjb25zdCBnYXAgPSB2aWRlb0ZpcnN0RHRzIC0gYXVkaW9GaXJzdER0c1xuICAgICAgaWYgKGdhcCA+ICgyICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbikpIHtcbiAgICAgICAgY29uc3QgZmlsbENvdW50ID0gTWF0aC5mbG9vcihnYXAgLyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsbENvdW50OyBpKyspIHtcbiAgICAgICAgICBjb25zdCBjbG9uZWRGaXJzdFNhbXBsZSA9IE9iamVjdC5hc3NpZ24oe30sIGZpcnN0U2FtcGxlKSAvLyDop4bpopHlpLTpg6jluKfnvLrlpLHpnIDopoHlpI3liLbnrKzkuIDluKdcbiAgICAgICAgICAvLyDph43mlrDorqHnrpdzYW1wbGXnmoRkdHPlkoxwdHNcbiAgICAgICAgICBjbG9uZWRGaXJzdFNhbXBsZS5kdHMgPSB2aWRlb0ZpcnN0RHRzIC0gKGkgKyAxKSAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb25cbiAgICAgICAgICBjbG9uZWRGaXJzdFNhbXBsZS5wdHMgPSBjbG9uZWRGaXJzdFNhbXBsZS5kdHMgKyBjbG9uZWRGaXJzdFNhbXBsZS5jdHNcblxuICAgICAgICAgIHZpZGVvU2FtcGxlcy51bnNoaWZ0KGNsb25lZEZpcnN0U2FtcGxlKVxuXG4gICAgICAgICAgdGhpcy5maWxsZWRWaWRlb1NhbXBsZXMucHVzaCh7XG4gICAgICAgICAgICBkdHM6IGNsb25lZEZpcnN0U2FtcGxlLmR0cyxcbiAgICAgICAgICAgIHNpemU6IGNsb25lZEZpcnN0U2FtcGxlLmRhdGEuYnl0ZUxlbmd0aFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgZ2FwXG4gICAgLy8gc3RlcDIuIOS/ruWkjXNhbXBsZXPmrrXkuYvpl7TnmoTpl7Tot53pl67popjjgIFcbiAgICBpZiAodGhpcy5uZXh0VmlkZW9EdHMpIHtcbiAgICAgIC8vIHN0ZXAxLiDlpITnkIZzYW1wbGVz5q615LmL6Ze055qE5Lii5bin5oOF5Ya1XG4gICAgICAvLyDlvZPlj5HnjrBkdXJhdGlvbuW3rui3neWkp+S6jjLluKfml7bov5vooYzooaXluKdcbiAgICAgIGdhcCA9IGZpcnN0RHRzIC0gdGhpcy5uZXh0VmlkZW9EdHNcbiAgICAgIGNvbnN0IGFic0dhcCA9IE1hdGguYWJzKGdhcClcbiAgICAgIGlmIChnYXAgPiAoMiAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pKSB7XG4gICAgICAgIGNvbnN0IGZpbGxGcmFtZUNvdW50ID0gTWF0aC5mbG9vcihnYXAgLyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsbEZyYW1lQ291bnQ7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGNsb25lZFNhbXBsZSA9IE9iamVjdC5hc3NpZ24oe30sIHZpZGVvU2FtcGxlc1swXSlcbiAgICAgICAgICBjb25zdCBjb21wdXRlZCA9IGZpcnN0RHRzIC0gKGkgKyAxKSAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb25cblxuICAgICAgICAgIGNsb25lZFNhbXBsZS5kdHMgPSBjb21wdXRlZCA+IHRoaXMubmV4dFZpZGVvRHRzID8gY29tcHV0ZWQgOiB0aGlzLm5leHRWaWRlb0R0cyAvLyDooaXnmoTnrKzkuIDluKfkuIDlrpropoHmmK9uZXh0VmlkZW9EdHNcbiAgICAgICAgICBjbG9uZWRTYW1wbGUucHRzID0gY2xvbmVkU2FtcGxlLmR0cyArIGNsb25lZFNhbXBsZS5jdHNcblxuICAgICAgICAgIHRoaXMudmlkZW9UcmFjay5zYW1wbGVzLnVuc2hpZnQoY2xvbmVkU2FtcGxlKVxuXG4gICAgICAgICAgdGhpcy5maWxsZWRWaWRlb1NhbXBsZXMucHVzaCh7XG4gICAgICAgICAgICBkdHM6IGNsb25lZFNhbXBsZS5kdHMsXG4gICAgICAgICAgICBzaXplOiBjbG9uZWRTYW1wbGUuZGF0YS5ieXRlTGVuZ3RoXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChhYnNHYXAgPD0gMTAgJiYgYWJzR2FwID4gMCkge1xuICAgICAgICAvLyDlvZPlt67ot53lnKgrLeS4gOW4p+S5i+mXtOaXtuWwhuesrOS4gOW4p+eahGR0c+W8uuihjOWumuS9jeWIsOacn+acm+S9jee9rlxuICAgICAgICAvLyBjb25zb2xlLmxvZygn6YeN5a6a5L2N6KeG6aKR5binZHRzJywgdmlkZW9TYW1wbGVzWzBdLmR0cywgdGhpcy5uZXh0VmlkZW9EdHMpXG4gICAgICAgIHZpZGVvU2FtcGxlc1swXS5kdHMgPSB0aGlzLm5leHRWaWRlb0R0c1xuICAgICAgICB2aWRlb1NhbXBsZXNbMF0ub3JpZ2luRHRzID0gdmlkZW9TYW1wbGVzWzBdLmR0c1xuICAgICAgICB2aWRlb1NhbXBsZXNbMF0uY3RzID0gdmlkZW9TYW1wbGVzWzBdLmN0cyB8fCB2aWRlb1NhbXBsZXNbMF0ucHRzIC0gdmlkZW9TYW1wbGVzWzBdLmR0c1xuICAgICAgICB2aWRlb1NhbXBsZXNbMF0ucHRzID0gdmlkZW9TYW1wbGVzWzBdLmR0cyArIHZpZGVvU2FtcGxlc1swXS5jdHNcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgbGFzdER0cyA9IHZpZGVvU2FtcGxlc1t2aWRlb1NhbXBsZXMubGVuZ3RoIC0gMV0uZHRzO1xuXG4gICAgY29uc3QgbGFzdFNhbXBsZUR1cmF0aW9uID0gdmlkZW9TYW1wbGVzLmxlbmd0aCA+PSAyID8gbGFzdER0cyAtIHZpZGVvU2FtcGxlc1t2aWRlb1NhbXBsZXMubGVuZ3RoIC0gMl0uZHRzIDogbWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuXG4gICAgdGhpcy5sYXN0VmlkZW9TYW1wbGVzTGVuID0gc2FtcGxlc0xlblxuICAgIHRoaXMubmV4dFZpZGVvRHRzID0gbGFzdER0cyArIGxhc3RTYW1wbGVEdXJhdGlvblxuICAgIHRoaXMubGFzdFZpZGVvRHRzID0gbGFzdER0c1xuXG4gICAgLy8gc3RlcDIuIOS/ruWkjXNhbXBsZeauteS5i+WGheeahOmXtOi3nemXrumimFxuICAgIC8vIHN0ZXAzLiDkv67lpI1zYW1wbGVz5q615YaF6YOo55qEZHRz5byC5bi46Zeu6aKYXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHZpZGVvU2FtcGxlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgY3VycmVudCA9IHZpZGVvU2FtcGxlc1tpXVxuICAgICAgY29uc3QgbmV4dCA9IHZpZGVvU2FtcGxlc1tpICsgMV1cblxuICAgICAgaWYgKCFuZXh0KSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkdXJhdGlvbiA9IG5leHQuZHRzIC0gY3VycmVudC5kdHM7XG5cbiAgICAgIGlmIChkdXJhdGlvbiA+ICgyICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbikpIHtcbiAgICAgICAgLy8g5Lik5bin5LmL6Ze06Ze06ZqU5aSq5aSn77yM6ZyA6KaB6KGl56m655m95binXG4gICAgICAgIGxldCBmaWxsRnJhbWVDb3VudCA9IE1hdGguZmxvb3IoZHVyYXRpb24gLyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKVxuXG4gICAgICAgIGxldCBmaWxsRnJhbWVJZHggPSAwXG4gICAgICAgIHdoaWxlIChmaWxsRnJhbWVJZHggPCBmaWxsRnJhbWVDb3VudCkge1xuICAgICAgICAgIGNvbnN0IGZpbGxGcmFtZSA9IE9iamVjdC5hc3NpZ24oe30sIG5leHQpXG4gICAgICAgICAgZmlsbEZyYW1lLmR0cyA9IGN1cnJlbnQuZHRzICsgKGZpbGxGcmFtZUlkeCArIDEpICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuICAgICAgICAgIGZpbGxGcmFtZS5wdHMgPSBmaWxsRnJhbWUuZHRzICsgZmlsbEZyYW1lLmN0c1xuICAgICAgICAgIGlmIChmaWxsRnJhbWUgPCBuZXh0LmR0cykge1xuICAgICAgICAgICAgdmlkZW9TYW1wbGVzLnNwbGljZShpLCAwLCBmaWxsRnJhbWUpXG5cbiAgICAgICAgICAgIHRoaXMuZmlsbGVkVmlkZW9TYW1wbGVzLnB1c2goe1xuICAgICAgICAgICAgICBkdHM6IGZpbGxGcmFtZS5kdHMsXG4gICAgICAgICAgICAgIHNpemU6IGZpbGxGcmFtZS5kYXRhLmJ5dGVMZW5ndGhcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZmlsbEZyYW1lSWR4KytcbiAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnZpZGVvVHJhY2suc2FtcGxlcyA9IHZpZGVvU2FtcGxlcztcbiAgfVxuXG4gIGRvRml4QXVkaW8gKGZpcnN0KSB7XG4gICAgbGV0IHtzYW1wbGVzOiBhdWRpb1NhbXBsZXMsIG1ldGF9ID0gdGhpcy5hdWRpb1RyYWNrXG5cbiAgICBpZiAoIWF1ZGlvU2FtcGxlcyB8fCAhYXVkaW9TYW1wbGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKGBhdWRpbyBsYXN0U2FtcGxlLCAke2F1ZGlvU2FtcGxlc1thdWRpb1NhbXBsZXMubGVuZ3RoIC0gMV0uZHRzfWApXG5cbiAgICBjb25zdCBzYW1wbGVzTGVuID0gYXVkaW9TYW1wbGVzLmxlbmd0aDtcbiAgICBjb25zdCBzaWxlbnRGcmFtZSA9IEFBQy5nZXRTaWxlbnRGcmFtZShtZXRhLmNvZGVjLCBtZXRhLmNoYW5uZWxDb3VudClcblxuICAgIGNvbnN0IGZpcnN0U2FtcGxlID0gdGhpcy5fZmlyc3RBdWRpb1NhbXBsZVxuXG4gICAgLy8g5a+5YXVkaW9TYW1wbGVz5oyJ54WnZHRz5YGa5o6S5bqPXG4gICAgYXVkaW9TYW1wbGVzID0gQ29tcGF0aWJpbGl0eS5zb3J0QXVkaW9TYW1wbGVzKGF1ZGlvU2FtcGxlcylcblxuICAgIC8vIHN0ZXAwLiDpppbluKfkuI52aWRlb+mmluW4p+mXtOi3neWkp+eahOmXrumimFxuICAgIGlmICh0aGlzLl9maXJzdFZpZGVvU2FtcGxlICYmIGZpcnN0KSB7XG4gICAgICBjb25zdCB2aWRlb0ZpcnN0UHRzID0gdGhpcy5fZmlyc3RWaWRlb1NhbXBsZS5wdHMgPyB0aGlzLl9maXJzdFZpZGVvU2FtcGxlLnB0cyA6IHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUuZHRzICsgdGhpcy5fZmlyc3RWaWRlb1NhbXBsZS5jdHNcblxuICAgICAgaWYgKGZpcnN0U2FtcGxlLmR0cyAtIHZpZGVvRmlyc3RQdHMgPiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSB7XG4gICAgICAgIGNvbnN0IHNpbGVudFNhbXBsZUNvdW50ID0gTWF0aC5mbG9vcigoZmlyc3RTYW1wbGUuZHRzIC0gdmlkZW9GaXJzdFB0cykgLyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2lsZW50U2FtcGxlQ291bnQ7IGkrKykge1xuICAgICAgICAgIGNvbnN0IHNpbGVudFNhbXBsZSA9IHtcbiAgICAgICAgICAgIGRhdGE6IHNpbGVudEZyYW1lLFxuICAgICAgICAgICAgZGF0YXNpemU6IHNpbGVudEZyYW1lLmJ5dGVMZW5ndGgsXG4gICAgICAgICAgICBkdHM6IGZpcnN0U2FtcGxlLmR0cyAtIChpICsgMSkgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uLFxuICAgICAgICAgICAgZmlsdGVyZWQ6IDBcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhdWRpb1NhbXBsZXMudW5zaGlmdChzaWxlbnRTYW1wbGUpXG5cbiAgICAgICAgICB0aGlzLmZpbGxlZEF1ZGlvU2FtcGxlcy5wdXNoKHtcbiAgICAgICAgICAgIGR0czogc2lsZW50U2FtcGxlLmR0cyxcbiAgICAgICAgICAgIHNpemU6IHNpbGVudFNhbXBsZS5kYXRhLmJ5dGVMZW5ndGhcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGdhcFxuICAgIGNvbnN0IGZpcnN0RHRzID0gYXVkaW9TYW1wbGVzWzBdLmR0c1xuXG4gICAgaWYgKHRoaXMubmV4dEF1ZGlvRHRzKSB7XG4gICAgICAvLyBzdGVwMS4g5aSE55CGc2FtcGxlc+auteS5i+mXtOeahOS4ouW4p+aDheWGtVxuICAgICAgLy8g5b2T5Y+R546wZHVyYXRpb27lt67ot53lpKfkuo4x5bin5pe26L+b6KGM6KGl5binXG4gICAgICBnYXAgPSBmaXJzdER0cyAtIHRoaXMubmV4dEF1ZGlvRHRzXG4gICAgICBjb25zdCBhYnNHYXAgPSBNYXRoLmFicyhnYXApXG5cbiAgICAgIGlmIChhYnNHYXAgPiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uICYmIHNhbXBsZXNMZW4gPT09IDEgJiYgdGhpcy5sYXN0QXVkaW9TYW1wbGVzTGVuID09PSAxKSB7XG4gICAgICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZCA9IHVuZGVmaW5lZFxuICAgICAgfVxuXG4gICAgICBpZiAoZ2FwID4gKDIgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSkge1xuICAgICAgICBpZiAoc2FtcGxlc0xlbiA9PT0gMSAmJiB0aGlzLmxhc3RBdWRpb1NhbXBsZXNMZW4gPT09IDEpIHtcbiAgICAgICAgICAvLyDlpoLmnpxzYW1wbGXnmoRsZW5ndGjkuIDnm7TmmK8x77yM6ICM5LiU5LiA55u05LiN56ym5ZCIcmVmU2FtcGxlRHVyYXRpb27vvIzpnIDopoHliqjmgIHkv67mlLlyZWZTYW1wbGVEdXJhdGlvblxuICAgICAgICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZCA9IG1ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZCAhPT0gdW5kZWZpbmVkID8gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbkZpeGVkICsgZ2FwIDogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiArIGdhcFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHNpbGVudEZyYW1lQ291bnQgPSBNYXRoLmZsb29yKGdhcCAvIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pXG5cbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpbGVudEZyYW1lQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY29tcHV0ZWQgPSBmaXJzdER0cyAtIChpICsgMSkgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG4gICAgICAgICAgICBjb25zdCBzaWxlbnRTYW1wbGUgPSBPYmplY3QuYXNzaWduKHt9LCBhdWRpb1NhbXBsZXNbMF0sIHtcbiAgICAgICAgICAgICAgZHRzOiBjb21wdXRlZCA+IHRoaXMubmV4dEF1ZGlvRHRzID8gY29tcHV0ZWQgOiB0aGlzLm5leHRBdWRpb0R0c1xuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgdGhpcy5maWxsZWRBdWRpb1NhbXBsZXMucHVzaCh7XG4gICAgICAgICAgICAgIGR0czogc2lsZW50U2FtcGxlLmR0cyxcbiAgICAgICAgICAgICAgc2l6ZTogc2lsZW50U2FtcGxlLmRhdGEuYnl0ZUxlbmd0aFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMuYXVkaW9UcmFjay5zYW1wbGVzLnVuc2hpZnQoc2lsZW50U2FtcGxlKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChhYnNHYXAgPD0gMTAgJiYgYWJzR2FwID4gMCkge1xuICAgICAgICAvLyDlvZPlt67ot53mr5TovoPlsI/nmoTml7blgJnlsIbpn7PpopHluKfph43lrprkvY1cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ+mHjeWumuS9jemfs+mikeW4p2R0cycsIGF1ZGlvU2FtcGxlc1swXS5kdHMsIHRoaXMubmV4dEF1ZGlvRHRzKVxuICAgICAgICBhdWRpb1NhbXBsZXNbMF0uZHRzID0gdGhpcy5uZXh0QXVkaW9EdHNcbiAgICAgICAgYXVkaW9TYW1wbGVzWzBdLnB0cyA9IHRoaXMubmV4dEF1ZGlvRHRzXG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGxhc3REdHMgPSBhdWRpb1NhbXBsZXNbYXVkaW9TYW1wbGVzLmxlbmd0aCAtIDFdLmR0cztcbiAgICBjb25zdCBsYXN0U2FtcGxlRHVyYXRpb24gPSBhdWRpb1NhbXBsZXMubGVuZ3RoID49IDIgPyBsYXN0RHRzIC0gYXVkaW9TYW1wbGVzW2F1ZGlvU2FtcGxlcy5sZW5ndGggLSAyXS5kdHMgOiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG5cbiAgICB0aGlzLmxhc3RBdWRpb1NhbXBsZXNMZW4gPSBzYW1wbGVzTGVuO1xuICAgIHRoaXMubmV4dEF1ZGlvRHRzID0gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbkZpeGVkID8gbGFzdER0cyArIG1ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZCA6IGxhc3REdHMgKyBsYXN0U2FtcGxlRHVyYXRpb25cbiAgICB0aGlzLmxhc3RBdWRpb0R0cyA9IGxhc3REdHNcblxuICAgIC8vIHN0ZXAzLiDkv67lpI1zYW1wbGVz5q615YaF6YOo55qEZHRz5byC5bi46Zeu6aKYXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGF1ZGlvU2FtcGxlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgY3VycmVudCA9IGF1ZGlvU2FtcGxlc1tpXVxuICAgICAgY29uc3QgbmV4dCA9IGF1ZGlvU2FtcGxlc1tpICsgMV1cblxuICAgICAgaWYgKCFuZXh0KSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkdXJhdGlvbiA9IG5leHQuZHRzIC0gY3VycmVudC5kdHM7XG4gICAgICBhdWRpb1NhbXBsZXNbaV0uZHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICAgIC8qXG4gICAgICBpZiAoZHVyYXRpb24gPiAoMiAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pKSB7XG4gICAgICAgIC8vIOS4pOW4p+S5i+mXtOmXtOmalOWkquWkp++8jOmcgOimgeihpeepuueZveW4p1xuICAgICAgICAvKipcbiAgICAgICAgbGV0IHNpbGVudEZyYW1lQ291bnQgPSBNYXRoLmZsb29yKGR1cmF0aW9uIC8gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbilcbiAgICAgICAgbGV0IGZyYW1lSWR4ID0gMFxuXG4gICAgICAgIHdoaWxlIChmcmFtZUlkeCA8IHNpbGVudEZyYW1lQ291bnQpIHtcbiAgICAgICAgICBjb25zdCBzaWxlbnRTYW1wbGUgPSB7XG4gICAgICAgICAgICBkYXRhOiBzaWxlbnRGcmFtZSxcbiAgICAgICAgICAgIGRhdGFzaXplOiBzaWxlbnRGcmFtZS5ieXRlTGVuZ3RoLFxuICAgICAgICAgICAgZHRzOiBjdXJyZW50LmR0cyArIChmcmFtZUlkeCArIDEpICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbixcbiAgICAgICAgICAgIGZpbHRlcmVkOiAwLFxuICAgICAgICAgICAgaXNTaWxlbnQ6IHRydWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhdWRpb1NhbXBsZXMuc3BsaWNlKGksIDAsIHNpbGVudFNhbXBsZSlcblxuICAgICAgICAgIHRoaXMuZmlsbGVkQXVkaW9TYW1wbGVzLnB1c2goe1xuICAgICAgICAgICAgZHRzOiBzaWxlbnRTYW1wbGUuZHRzLFxuICAgICAgICAgICAgc2l6ZTogc2lsZW50U2FtcGxlLmRhdGEuYnl0ZUxlbmd0aFxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICBmcmFtZUlkeCsrXG4gICAgICAgICAgaSsrIC8vIOS4jeWvuemdmemfs+W4p+WBmuavlOi+g1xuICAgICAgICB9XG4gICAgICB9ICovXG4gICAgfVxuXG4gICAgdGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMgPSBDb21wYXRpYmlsaXR5LnNvcnRBdWRpb1NhbXBsZXMoYXVkaW9TYW1wbGVzKVxuICB9XG5cbiAgZ2V0Rmlyc3RTYW1wbGUgKCkge1xuICAgIC8vIOiOt+WPlnZpZGVv5ZKMYXVkaW/nmoTpppbluKfmlbDmja5cbiAgICBsZXQge3NhbXBsZXM6IHZpZGVvU2FtcGxlc30gPSB0aGlzLnZpZGVvVHJhY2tcbiAgICBsZXQge3NhbXBsZXM6IGF1ZGlvU2FtcGxlc30gPSB0aGlzLmF1ZGlvVHJhY2tcblxuICAgIGxldCBpc0ZpcnN0VmlkZW9TYW1wbGVzID0gZmFsc2U7XG4gICAgbGV0IGlzRmlyc3RBdWRpb1NhbXBsZXMgPSBmYWxzZTtcblxuICAgIGlmICghdGhpcy5fZmlyc3RWaWRlb1NhbXBsZSAmJiB2aWRlb1NhbXBsZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9maXJzdFZpZGVvU2FtcGxlID0gQ29tcGF0aWJpbGl0eS5maW5kRmlyc3RWaWRlb1NhbXBsZSh2aWRlb1NhbXBsZXMpXG4gICAgICBpc0ZpcnN0VmlkZW9TYW1wbGVzID0gdHJ1ZVxuICAgIH1cblxuICAgIGlmICghdGhpcy5fZmlyc3RBdWRpb1NhbXBsZSAmJiBhdWRpb1NhbXBsZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9maXJzdEF1ZGlvU2FtcGxlID0gQ29tcGF0aWJpbGl0eS5maW5kRmlyc3RBdWRpb1NhbXBsZShhdWRpb1NhbXBsZXMpIC8vIOWvu+aJvmR0c+acgOWwj+eahOW4p+S9nOS4uummluS4qumfs+mikeW4p1xuICAgICAgaXNGaXJzdEF1ZGlvU2FtcGxlcyA9IHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgaXNGaXJzdFZpZGVvU2FtcGxlcyxcbiAgICAgIGlzRmlyc3RBdWRpb1NhbXBsZXNcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog5Zyo5rKh5pyJcmVmU2FtcGxlRHVyYXRpb27nmoTpl67popjmtYHkuK3vvIxcbiAgICovXG4gIGZpeFJlZlNhbXBsZUR1cmF0aW9uIChtZXRhLCBzYW1wbGVzKSB7XG4gICAgY29uc3QgaXNWaWRlbyA9IG1ldGEudHlwZSA9PT0gJ3ZpZGVvJ1xuICAgIGNvbnN0IGFsbFNhbXBsZXNDb3VudCA9IGlzVmlkZW8gPyB0aGlzLmFsbFZpZGVvU2FtcGxlc0NvdW50IDogdGhpcy5hbGxBdWRpb1NhbXBsZXNDb3VudFxuICAgIGNvbnN0IGZpcnN0RHRzID0gaXNWaWRlbyA/IHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUuZHRzIDogdGhpcy5fZmlyc3RBdWRpb1NhbXBsZS5kdHNcbiAgICBjb25zdCBmaWxsZWRTYW1wbGVzQ291bnQgPSBpc1ZpZGVvID8gdGhpcy5maWxsZWRWaWRlb1NhbXBsZXMubGVuZ3RoIDogdGhpcy5maWxsZWRBdWRpb1NhbXBsZXMubGVuZ3RoXG5cbiAgICBpZiAoIW1ldGEucmVmU2FtcGxlRHVyYXRpb24gfHwgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA8PSAwIHx8IE51bWJlci5pc05hTihtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSkge1xuICAgICAgaWYgKHNhbXBsZXMubGVuZ3RoID49IDEpIHtcbiAgICAgICAgY29uc3QgbGFzdER0cyA9IHNhbXBsZXNbc2FtcGxlcy5sZW5ndGggLSAxXS5kdHNcblxuICAgICAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uID0gTWF0aC5mbG9vcigobGFzdER0cyAtIGZpcnN0RHRzKSAvICgoYWxsU2FtcGxlc0NvdW50ICsgZmlsbGVkU2FtcGxlc0NvdW50KSAtIDEpKTsgLy8g5bCGcmVmU2FtcGxlRHVyYXRpb27ph43nva7kuLrorqHnrpflkI7nmoTlubPlnYflgLxcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1ldGEucmVmU2FtcGxlRHVyYXRpb24pIHtcbiAgICAgIGlmIChzYW1wbGVzLmxlbmd0aCA+PSAzKSB7XG4gICAgICAgIGNvbnN0IGxhc3REdHMgPSBzYW1wbGVzW3NhbXBsZXMubGVuZ3RoIC0gMV0uZHRzXG4gICAgICAgIGNvbnN0IGZpcnN0RHRzID0gc2FtcGxlc1swXS5kdHNcbiAgICAgICAgY29uc3QgZHVyYXRpb25BdmcgPSAobGFzdER0cyAtIGZpcnN0RHRzKSAvIHNhbXBsZXMubGVuZ3RoXG5cbiAgICAgICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA9IE1hdGguYWJzKG1ldGEucmVmU2FtcGxlRHVyYXRpb24gLSBkdXJhdGlvbkF2ZykgPD0gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA/IG1ldGEucmVmU2FtcGxlRHVyYXRpb24gOiBkdXJhdGlvbkF2ZzsgLy8g5bCGcmVmU2FtcGxlRHVyYXRpb27ph43nva7kuLrorqHnrpflkI7nmoTlubPlnYflgLxcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog6K6w5b2V5oiq5q2i55uu5YmN5LiA5YWx5pKt5pS+5LqG5aSa5bCR5binXG4gICAqL1xuICByZWNvcmRTYW1wbGVzQ291bnQgKCkge1xuICAgIGNvbnN0IHsgYXVkaW9UcmFjaywgdmlkZW9UcmFjayB9ID0gdGhpc1xuXG4gICAgdGhpcy5hbGxBdWRpb1NhbXBsZXNDb3VudCArPSBhdWRpb1RyYWNrLnNhbXBsZXMubGVuZ3RoXG4gICAgdGhpcy5hbGxWaWRlb1NhbXBsZXNDb3VudCArPSB2aWRlb1RyYWNrLnNhbXBsZXMubGVuZ3RoXG4gIH1cblxuICAvKipcbiAgICog5Y676Zmk5LiN5ZCI5rOV55qE5bin77yI5YCS6YCA44CB6YeN5aSN5bin77yJXG4gICAqL1xuICByZW1vdmVJbnZhbGlkU2FtcGxlcyAoKSB7XG4gICAgY29uc3QgeyBfZmlyc3RWaWRlb1NhbXBsZSwgX2ZpcnN0QXVkaW9TYW1wbGUgfSA9IHRoaXNcblxuICAgIHRoaXMuYXVkaW9UcmFjay5zYW1wbGVzID0gdGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMuZmlsdGVyKChzYW1wbGUpID0+IHtcbiAgICAgIHJldHVybiBzYW1wbGUuZHRzID49IF9maXJzdEF1ZGlvU2FtcGxlLmR0cyAmJiAodGhpcy5sYXN0QXVkaW9EdHMgPT09IHVuZGVmaW5lZCB8fCBzYW1wbGUuZHRzID4gdGhpcy5sYXN0QXVkaW9EdHMpXG4gICAgfSlcblxuICAgIHRoaXMudmlkZW9UcmFjay5zYW1wbGVzID0gdGhpcy52aWRlb1RyYWNrLnNhbXBsZXMuZmlsdGVyKChzYW1wbGUpID0+IHtcbiAgICAgIHJldHVybiBzYW1wbGUuZHRzID49IF9maXJzdFZpZGVvU2FtcGxlLmR0cyAmJiAodGhpcy5sYXN0VmlkZW9EdHMgPT09IHVuZGVmaW5lZCB8fCBzYW1wbGUuZHRzID4gdGhpcy5sYXN0VmlkZW9EdHMpXG4gICAgfSlcbiAgfVxuXG4gIHN0YXRpYyBzb3J0QXVkaW9TYW1wbGVzIChzYW1wbGVzKSB7XG4gICAgaWYgKHNhbXBsZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gc2FtcGxlc1xuICAgIH1cblxuICAgIHJldHVybiBzYW1wbGVzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIHJldHVybiBhLmR0cyAtIGIuZHRzXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiDlr7vmib5kdHPmnIDlsI/nmoRzYW1wbGVcbiAgICogQHBhcmFtIHNhbXBsZXNcbiAgICovXG4gIHN0YXRpYyBmaW5kRmlyc3RBdWRpb1NhbXBsZSAoc2FtcGxlcykge1xuICAgIGlmICghc2FtcGxlcyB8fCBzYW1wbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICByZXR1cm4gQ29tcGF0aWJpbGl0eS5zb3J0QXVkaW9TYW1wbGVzKHNhbXBsZXMpWzBdXG4gIH1cblxuICBzdGF0aWMgZmluZEZpcnN0VmlkZW9TYW1wbGUgKHNhbXBsZXMpIHtcbiAgICBpZiAoIXNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIGNvbnN0IHNvcnRlZCA9IHNhbXBsZXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgcmV0dXJuIGEuZHRzIC0gYi5kdHM7XG4gICAgfSlcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzb3J0ZWQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChzb3J0ZWRbaV0uaXNLZXlmcmFtZSkge1xuICAgICAgICByZXR1cm4gc29ydGVkW2ldXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0IHRyYWNrcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpXG4gIH1cblxuICBnZXQgYXVkaW9UcmFjayAoKSB7XG4gICAgaWYgKHRoaXMudHJhY2tzKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmFja3MuYXVkaW9UcmFja1xuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgZ2V0IHZpZGVvVHJhY2sgKCkge1xuICAgIGlmICh0aGlzLnRyYWNrcykge1xuICAgICAgcmV0dXJuIHRoaXMudHJhY2tzLnZpZGVvVHJhY2tcbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQ29tcGF0aWJpbGl0eTtcbiIsImNsYXNzIEdvbG9tYiB7XG4gIGNvbnN0cnVjdG9yICh1aW50OGFycmF5KSB7XG4gICAgdGhpcy5UQUcgPSAnR29sb21iJ1xuICAgIHRoaXMuX2J1ZmZlciA9IHVpbnQ4YXJyYXlcbiAgICB0aGlzLl9idWZmZXJJbmRleCA9IDBcbiAgICB0aGlzLl90b3RhbEJ5dGVzID0gdWludDhhcnJheS5ieXRlTGVuZ3RoXG4gICAgdGhpcy5fdG90YWxCaXRzID0gdWludDhhcnJheS5ieXRlTGVuZ3RoICogOFxuICAgIHRoaXMuX2N1cnJlbnRXb3JkID0gMFxuICAgIHRoaXMuX2N1cnJlbnRXb3JkQml0c0xlZnQgPSAwXG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLl9idWZmZXIgPSBudWxsXG4gIH1cblxuICBfZmlsbEN1cnJlbnRXb3JkICgpIHtcbiAgICBsZXQgYnVmZmVyQnl0ZXNMZWZ0ID0gdGhpcy5fdG90YWxCeXRlcyAtIHRoaXMuX2J1ZmZlckluZGV4XG4gICAgaWYgKGJ1ZmZlckJ5dGVzTGVmdCA8PSAwKSB7XG4gICAgICAvLyBUT0RPIOW8guW4uOWkhOeQhlxuICAgIH1cblxuICAgIGxldCBieXRlc1JlYWQgPSBNYXRoLm1pbig0LCBidWZmZXJCeXRlc0xlZnQpXG4gICAgbGV0IHdvcmQgPSBuZXcgVWludDhBcnJheSg0KVxuICAgIHdvcmQuc2V0KHRoaXMuX2J1ZmZlci5zdWJhcnJheSh0aGlzLl9idWZmZXJJbmRleCwgdGhpcy5fYnVmZmVySW5kZXggKyBieXRlc1JlYWQpKVxuICAgIHRoaXMuX2N1cnJlbnRXb3JkID0gbmV3IERhdGFWaWV3KHdvcmQuYnVmZmVyKS5nZXRVaW50MzIoMCwgZmFsc2UpXG5cbiAgICB0aGlzLl9idWZmZXJJbmRleCArPSBieXRlc1JlYWRcbiAgICB0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0ID0gYnl0ZXNSZWFkICogOFxuICB9XG5cbiAgcmVhZEJpdHMgKGJpdHMpIHtcbiAgICBpZiAoYml0cyA+IDMyKSB7XG4gICAgICAvLyBUT0RPXG4gICAgfVxuXG4gICAgaWYgKGJpdHMgPD0gdGhpcy5fY3VycmVudFdvcmRCaXRzTGVmdCkge1xuICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuX2N1cnJlbnRXb3JkID4+PiAoMzIgLSBiaXRzKVxuICAgICAgdGhpcy5fY3VycmVudFdvcmQgPDw9IGJpdHNcbiAgICAgIHRoaXMuX2N1cnJlbnRXb3JkQml0c0xlZnQgLT0gYml0c1xuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0ID8gdGhpcy5fY3VycmVudFdvcmQgOiAwXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgcmVzdWx0ID4+PiAoMzIgLSB0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0KVxuICAgIGxldCBiaXRzTmVlZExlZnQgPSBiaXRzIC0gdGhpcy5fY3VycmVudFdvcmRCaXRzTGVmdFxuXG4gICAgdGhpcy5fZmlsbEN1cnJlbnRXb3JkKClcbiAgICBsZXQgYml0c1JlYWROZXh0ID0gTWF0aC5taW4oYml0c05lZWRMZWZ0LCB0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0KVxuXG4gICAgbGV0IHJlc3VsdDIgPSB0aGlzLl9jdXJyZW50V29yZCA+Pj4gKDMyIC0gYml0c1JlYWROZXh0KVxuICAgIHRoaXMuX2N1cnJlbnRXb3JkIDw8PSBiaXRzUmVhZE5leHRcbiAgICB0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0IC09IGJpdHNSZWFkTmV4dFxuXG4gICAgcmVzdWx0ID0gKHJlc3VsdCA8PCBiaXRzUmVhZE5leHQpIHwgcmVzdWx0MlxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIHJlYWRCb29sICgpIHtcbiAgICByZXR1cm4gdGhpcy5yZWFkQml0cygxKSA9PT0gMVxuICB9XG5cbiAgcmVhZEJ5dGUgKCkge1xuICAgIHJldHVybiB0aGlzLnJlYWRCaXRzKDgpXG4gIH1cblxuICBfc2tpcExlYWRpbmdaZXJvICgpIHtcbiAgICBsZXQgemVyb0NvdW50XG4gICAgZm9yICh6ZXJvQ291bnQgPSAwOyB6ZXJvQ291bnQgPCB0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0OyB6ZXJvQ291bnQrKykge1xuICAgICAgaWYgKCh0aGlzLl9jdXJyZW50V29yZCAmICgweDgwMDAwMDAwID4+PiB6ZXJvQ291bnQpKSAhPT0gMCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50V29yZCA8PD0gemVyb0NvdW50XG4gICAgICAgIHRoaXMuX2N1cnJlbnRXb3JkQml0c0xlZnQgLT0gemVyb0NvdW50XG4gICAgICAgIHJldHVybiB6ZXJvQ291bnRcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fZmlsbEN1cnJlbnRXb3JkKClcbiAgICByZXR1cm4gemVyb0NvdW50ICsgdGhpcy5fc2tpcExlYWRpbmdaZXJvKClcbiAgfVxuXG4gIHJlYWRVRUcgKCkgeyAvLyB1bnNpZ25lZCBleHBvbmVudGlhbCBnb2xvbWJcbiAgICBsZXQgbGVhZGluZ1plcm9zID0gdGhpcy5fc2tpcExlYWRpbmdaZXJvKClcbiAgICByZXR1cm4gdGhpcy5yZWFkQml0cyhsZWFkaW5nWmVyb3MgKyAxKSAtIDFcbiAgfVxuXG4gIHJlYWRTRUcgKCkgeyAvLyBzaWduZWQgZXhwb25lbnRpYWwgZ29sb21iXG4gICAgbGV0IHZhbHVlID0gdGhpcy5yZWFkVUVHKClcbiAgICBpZiAodmFsdWUgJiAweDAxKSB7XG4gICAgICByZXR1cm4gKHZhbHVlICsgMSkgPj4+IDFcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIC0xICogKHZhbHVlID4+PiAxKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHb2xvbWJcbiIsImltcG9ydCBTcHNQYXJzZXIgZnJvbSAnLi9zcHMnO1xuY2xhc3MgTmFsdW5pdCB7XG4gIHN0YXRpYyBnZXROYWx1bml0cyAoYnVmZmVyKSB7XG4gICAgaWYgKGJ1ZmZlci5sZW5ndGggLSBidWZmZXIucG9zaXRpb24gPCA0KSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgbGV0IGJ1ZiA9IGJ1ZmZlci5kYXRhdmlldztcbiAgICBsZXQgcG9zaXRpb24gPSBidWZmZXIucG9zaXRpb247XG4gICAgaWYgKGJ1Zi5nZXRJbnQzMihwb3NpdGlvbikgPT09IDEgfHxcbiAgICAoYnVmLmdldEludDE2KHBvc2l0aW9uKSA9PT0gMCAmJiBidWYuZ2V0SW50OChwb3NpdGlvbiArIDIpID09PSAxKSkge1xuICAgICAgcmV0dXJuIE5hbHVuaXQuZ2V0QW5uZXhiTmFscyhidWZmZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTmFsdW5pdC5nZXRBdmNjTmFscyhidWZmZXIpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRBbm5leGJOYWxzIChidWZmZXIpIHtcbiAgICBsZXQgbmFscyA9IFtdO1xuICAgIGxldCBwb3NpdGlvbiA9IE5hbHVuaXQuZ2V0SGVhZGVyUG9zaXRpb25Bbm5leEIoYnVmZmVyKTtcbiAgICBsZXQgc3RhcnQgPSBwb3NpdGlvbi5wb3M7XG4gICAgbGV0IGVuZCA9IHN0YXJ0O1xuICAgIHdoaWxlIChzdGFydCA8IGJ1ZmZlci5sZW5ndGggLSA0KSB7XG4gICAgICBsZXQgaGVhZGVyID0gYnVmZmVyLmJ1ZmZlci5zbGljZShzdGFydCwgc3RhcnQgKyBwb3NpdGlvbi5oZWFkZXJMZW5ndGgpO1xuICAgICAgaWYgKHBvc2l0aW9uLnBvcyA9PT0gYnVmZmVyLnBvc2l0aW9uKSB7XG4gICAgICAgIGJ1ZmZlci5za2lwKHBvc2l0aW9uLmhlYWRlckxlbmd0aCk7XG4gICAgICB9XG4gICAgICBwb3NpdGlvbiA9IE5hbHVuaXQuZ2V0SGVhZGVyUG9zaXRpb25Bbm5leEIoYnVmZmVyKTtcbiAgICAgIGVuZCA9IHBvc2l0aW9uLnBvcztcbiAgICAgIGxldCBib2R5ID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyLmJ1ZmZlci5zbGljZShzdGFydCArIGhlYWRlci5ieXRlTGVuZ3RoLCBlbmQpKTtcbiAgICAgIGxldCB1bml0ID0ge2hlYWRlciwgYm9keX07XG4gICAgICBOYWx1bml0LmFuYWx5c2VOYWwodW5pdCk7XG4gICAgICBuYWxzLnB1c2godW5pdCk7XG4gICAgICBidWZmZXIuc2tpcChlbmQgLSBidWZmZXIucG9zaXRpb24pO1xuICAgICAgc3RhcnQgPSBlbmQ7XG4gICAgfVxuICAgIHJldHVybiBuYWxzO1xuICB9XG5cbiAgc3RhdGljIGdldEF2Y2NOYWxzIChidWZmZXIpIHtcbiAgICBsZXQgbmFscyA9IFtdO1xuICAgIHdoaWxlIChidWZmZXIucG9zaXRpb24gPCBidWZmZXIubGVuZ3RoIC0gNCkge1xuICAgICAgbGV0IGxlbmd0aCA9IGJ1ZmZlci5kYXRhdmlldy5nZXRJbnQzMihidWZmZXIucG9zaXRpb24pO1xuICAgICAgaWYgKGJ1ZmZlci5sZW5ndGggLSBidWZmZXIucG9zaXRpb24gPj0gbGVuZ3RoKSB7XG4gICAgICAgIGxldCBoZWFkZXIgPSBidWZmZXIuYnVmZmVyLnNsaWNlKGJ1ZmZlci5wb3NpdGlvbiwgYnVmZmVyLnBvc2l0aW9uICsgNCk7XG4gICAgICAgIGJ1ZmZlci5za2lwKDQpXG4gICAgICAgIGxldCBib2R5ID0gYnVmZmVyLmJ1ZmZlci5zbGljZShidWZmZXIucG9zaXRpb24sIGJ1ZmZlci5wb3NpdGlvbiArIGxlbmd0aCk7XG4gICAgICAgIGJ1ZmZlci5za2lwKGxlbmd0aCk7XG4gICAgICAgIGxldCB1bml0ID0ge2hlYWRlciwgYm9keX07XG4gICAgICAgIE5hbHVuaXQuYW5hbHlzZU5hbCh1bml0KTtcbiAgICAgICAgbmFscy5wdXNoKHVuaXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuYWxzO1xuICB9XG5cbiAgc3RhdGljIGFuYWx5c2VOYWwgKHVuaXQpIHtcbiAgICBsZXQgdHlwZSA9IHVuaXQuYm9keVswXSAmIDB4MWY7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIC8vIE5EUlxuICAgICAgICB1bml0Lm5kciA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA1OlxuICAgICAgICAvLyBJRFJcbiAgICAgICAgdW5pdC5pZHIgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNjpcbiAgICAgICAgLy8gU0VJXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA3OlxuICAgICAgICAvLyBTUFNcbiAgICAgICAgdW5pdC5zcHMgPSBTcHNQYXJzZXIucGFyc2VTUFModW5pdC5ib2R5KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDg6XG4gICAgICAgIC8vIFBQU1xuICAgICAgICB1bml0LnBwcyA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA5OlxuICAgICAgICAvLyBBVURcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0SGVhZGVyUG9zaXRpb25Bbm5leEIgKGJ1ZmZlcikge1xuICAgIC8vIHNlcGVyYXRlXG4gICAgbGV0IHBvcyA9IGJ1ZmZlci5wb3NpdGlvbjtcbiAgICBsZXQgaGVhZGVyTGVuZ3RoID0gMDtcbiAgICB3aGlsZSAoaGVhZGVyTGVuZ3RoICE9PSAzICYmIGhlYWRlckxlbmd0aCAhPT0gNCAmJiBwb3MgPCBidWZmZXIubGVuZ3RoIC0gNCkge1xuICAgICAgaWYgKGJ1ZmZlci5kYXRhdmlldy5nZXRJbnQxNihwb3MpID09PSAwKSB7XG4gICAgICAgIGlmIChidWZmZXIuZGF0YXZpZXcuZ2V0SW50MTYocG9zICsgMikgPT09IDEpIHtcbiAgICAgICAgICAvLyAweDAwMDAwMVxuICAgICAgICAgIGhlYWRlckxlbmd0aCA9IDQ7XG4gICAgICAgIH0gZWxzZSBpZiAoYnVmZmVyLmRhdGF2aWV3LmdldEludDgocG9zICsgMikgPT09IDEpIHtcbiAgICAgICAgICBoZWFkZXJMZW5ndGggPSAzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBvcysrO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwb3MrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zID09PSBidWZmZXIubGVuZ3RoIC0gNCkge1xuICAgICAgaWYgKGJ1ZmZlci5kYXRhdmlldy5nZXRJbnQxNihwb3MpID09PSAwKSB7XG4gICAgICAgIGlmIChidWZmZXIuZGF0YXZpZXcuZ2V0SW50MTYocG9zICsgMikgPT09IDEpIHtcbiAgICAgICAgICAvLyAweDAwMDAwMVxuICAgICAgICAgIGhlYWRlckxlbmd0aCA9IDQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBvcysrO1xuICAgICAgICBpZiAoYnVmZmVyLmRhdGF2aWV3LmdldEludDE2KHBvcykgPT09IDAgJiYgYnVmZmVyLmRhdGF2aWV3LmdldEludDgocG9zKSA9PT0gMSkge1xuICAgICAgICAgIC8vIDB4MDAwMDAwMVxuICAgICAgICAgIGhlYWRlckxlbmd0aCA9IDM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcG9zID0gYnVmZmVyLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge3BvcywgaGVhZGVyTGVuZ3RofTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRBdmNjIChzcHMsIHBwcykge1xuICAgIGxldCByZXQgPSBuZXcgVWludDhBcnJheShzcHMuYnl0ZUxlbmd0aCArIHBwcy5ieXRlTGVuZ3RoICsgMTEpO1xuICAgIHJldFswXSA9IDB4MDE7XG4gICAgcmV0WzFdID0gc3BzWzFdO1xuICAgIHJldFsyXSA9IHNwc1syXTtcbiAgICByZXRbM10gPSBzcHNbM107XG4gICAgcmV0WzRdID0gMjU1O1xuICAgIHJldFs1XSA9IDIyNTtcblxuICAgIGxldCBvZmZzZXQgPSA2O1xuXG4gICAgcmV0LnNldChuZXcgVWludDhBcnJheShbKHNwcy5ieXRlTGVuZ3RoID4+PiA4KSAmIDB4ZmYsIHNwcy5ieXRlTGVuZ3RoICYgMHhmZl0pLCBvZmZzZXQpO1xuICAgIG9mZnNldCArPSAyO1xuICAgIHJldC5zZXQoc3BzLCBvZmZzZXQpO1xuICAgIG9mZnNldCArPSBzcHMuYnl0ZUxlbmd0aDtcblxuICAgIHJldFtvZmZzZXRdID0gMTtcbiAgICBvZmZzZXQrKztcblxuICAgIHJldC5zZXQobmV3IFVpbnQ4QXJyYXkoWyhwcHMuYnl0ZUxlbmd0aCA+Pj4gOCkgJiAweGZmLCBwcHMuYnl0ZUxlbmd0aCAmIDB4ZmZdKSwgb2Zmc2V0KTtcbiAgICBvZmZzZXQgKz0gMjtcbiAgICByZXQuc2V0KHBwcywgb2Zmc2V0KTtcbiAgICByZXR1cm4gcmV0O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5hbHVuaXQ7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgICovXG4vKiBlc2xpbnQtZGlzYWJsZSBvbmUtdmFyICAqL1xuaW1wb3J0IEdvbG9tYiBmcm9tICcuL2dvbG9tYidcblxuY2xhc3MgU1BTUGFyc2VyIHtcbiAgc3RhdGljIF9lYnNwMnJic3AgKHVpbnQ4YXJyYXkpIHtcbiAgICBsZXQgc3JjID0gdWludDhhcnJheVxuICAgIGxldCBzcmNMZW5ndGggPSBzcmMuYnl0ZUxlbmd0aFxuICAgIGxldCBkc3QgPSBuZXcgVWludDhBcnJheShzcmNMZW5ndGgpXG4gICAgbGV0IGRzdElkeCA9IDBcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3JjTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpID49IDIpIHtcbiAgICAgICAgaWYgKHNyY1tpXSA9PT0gMHgwMyAmJiBzcmNbaSAtIDFdID09PSAweDAwICYmIHNyY1tpIC0gMl0gPT09IDB4MDApIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBkc3RbZHN0SWR4XSA9IHNyY1tpXVxuICAgICAgZHN0SWR4KytcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZHN0LmJ1ZmZlciwgMCwgZHN0SWR4KVxuICB9XG5cbiAgc3RhdGljIHBhcnNlU1BTICh1aW50OGFycmF5KSB7XG4gICAgbGV0IHJic3AgPSBTUFNQYXJzZXIuX2Vic3AycmJzcCh1aW50OGFycmF5KVxuICAgIGxldCBnYiA9IG5ldyBHb2xvbWIocmJzcClcblxuICAgIGdiLnJlYWRCeXRlKClcbiAgICBsZXQgcHJvZmlsZUlkYyA9IGdiLnJlYWRCeXRlKClcbiAgICBnYi5yZWFkQnl0ZSgpXG4gICAgbGV0IGxldmVsSWRjID0gZ2IucmVhZEJ5dGUoKVxuICAgIGdiLnJlYWRVRUcoKVxuXG4gICAgbGV0IHByb2ZpbGVfc3RyaW5nID0gU1BTUGFyc2VyLmdldFByb2ZpbGVTdHJpbmcocHJvZmlsZUlkYylcbiAgICBsZXQgbGV2ZWxfc3RyaW5nID0gU1BTUGFyc2VyLmdldExldmVsU3RyaW5nKGxldmVsSWRjKVxuICAgIGxldCBjaHJvbWFfZm9ybWF0X2lkYyA9IDFcbiAgICBsZXQgY2hyb21hX2Zvcm1hdCA9IDQyMFxuICAgIGxldCBjaHJvbWFfZm9ybWF0X3RhYmxlID0gWzAsIDQyMCwgNDIyLCA0NDRdXG4gICAgbGV0IGJpdF9kZXB0aCA9IDhcblxuICAgIGlmIChwcm9maWxlSWRjID09PSAxMDAgfHwgcHJvZmlsZUlkYyA9PT0gMTEwIHx8IHByb2ZpbGVJZGMgPT09IDEyMiB8fFxuICAgICAgcHJvZmlsZUlkYyA9PT0gMjQ0IHx8IHByb2ZpbGVJZGMgPT09IDQ0IHx8IHByb2ZpbGVJZGMgPT09IDgzIHx8XG4gICAgICBwcm9maWxlSWRjID09PSA4NiB8fCBwcm9maWxlSWRjID09PSAxMTggfHwgcHJvZmlsZUlkYyA9PT0gMTI4IHx8XG4gICAgICBwcm9maWxlSWRjID09PSAxMzggfHwgcHJvZmlsZUlkYyA9PT0gMTQ0KSB7XG4gICAgICBjaHJvbWFfZm9ybWF0X2lkYyA9IGdiLnJlYWRVRUcoKVxuICAgICAgaWYgKGNocm9tYV9mb3JtYXRfaWRjID09PSAzKSB7XG4gICAgICAgIGdiLnJlYWRCaXRzKDEpXG4gICAgICB9XG4gICAgICBpZiAoY2hyb21hX2Zvcm1hdF9pZGMgPD0gMykge1xuICAgICAgICBjaHJvbWFfZm9ybWF0ID0gY2hyb21hX2Zvcm1hdF90YWJsZVtjaHJvbWFfZm9ybWF0X2lkY11cbiAgICAgIH1cblxuICAgICAgYml0X2RlcHRoID0gZ2IucmVhZFVFRygpICsgOFxuICAgICAgZ2IucmVhZFVFRygpXG4gICAgICBnYi5yZWFkQml0cygxKVxuICAgICAgaWYgKGdiLnJlYWRCb29sKCkpIHtcbiAgICAgICAgbGV0IHNjYWxpbmdfbGlzdF9jb3VudCA9IChjaHJvbWFfZm9ybWF0X2lkYyAhPT0gMykgPyA4IDogMTJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY2FsaW5nX2xpc3RfY291bnQ7IGkrKykge1xuICAgICAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgICAgICBpZiAoaSA8IDYpIHtcbiAgICAgICAgICAgICAgU1BTUGFyc2VyLl9za2lwU2NhbGluZ0xpc3QoZ2IsIDE2KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgU1BTUGFyc2VyLl9za2lwU2NhbGluZ0xpc3QoZ2IsIDY0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBnYi5yZWFkVUVHKClcbiAgICBsZXQgcGljX29yZGVyX2NudF90eXBlID0gZ2IucmVhZFVFRygpXG4gICAgaWYgKHBpY19vcmRlcl9jbnRfdHlwZSA9PT0gMCkge1xuICAgICAgZ2IucmVhZFVFRygpXG4gICAgfSBlbHNlIGlmIChwaWNfb3JkZXJfY250X3R5cGUgPT09IDEpIHtcbiAgICAgIGdiLnJlYWRCaXRzKDEpXG4gICAgICBnYi5yZWFkU0VHKClcbiAgICAgIGdiLnJlYWRTRUcoKVxuICAgICAgbGV0IG51bV9yZWZfZnJhbWVzX2luX3BpY19vcmRlcl9jbnRfY3ljbGUgPSBnYi5yZWFkVUVHKClcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtX3JlZl9mcmFtZXNfaW5fcGljX29yZGVyX2NudF9jeWNsZTsgaSsrKSB7XG4gICAgICAgIGdiLnJlYWRTRUcoKVxuICAgICAgfVxuICAgIH1cbiAgICBnYi5yZWFkVUVHKClcbiAgICBnYi5yZWFkQml0cygxKVxuXG4gICAgbGV0IHBpY193aWR0aF9pbl9tYnNfbWludXMxID0gZ2IucmVhZFVFRygpXG4gICAgbGV0IHBpY19oZWlnaHRfaW5fbWFwX3VuaXRzX21pbnVzMSA9IGdiLnJlYWRVRUcoKVxuXG4gICAgbGV0IGZyYW1lX21ic19vbmx5X2ZsYWcgPSBnYi5yZWFkQml0cygxKVxuICAgIGlmIChmcmFtZV9tYnNfb25seV9mbGFnID09PSAwKSB7XG4gICAgICBnYi5yZWFkQml0cygxKVxuICAgIH1cbiAgICBnYi5yZWFkQml0cygxKVxuXG4gICAgbGV0IGZyYW1lX2Nyb3BfbGVmdF9vZmZzZXQgPSAwXG4gICAgbGV0IGZyYW1lX2Nyb3BfcmlnaHRfb2Zmc2V0ID0gMFxuICAgIGxldCBmcmFtZV9jcm9wX3RvcF9vZmZzZXQgPSAwXG4gICAgbGV0IGZyYW1lX2Nyb3BfYm90dG9tX29mZnNldCA9IDBcblxuICAgIGxldCBmcmFtZV9jcm9wcGluZ19mbGFnID0gZ2IucmVhZEJvb2woKVxuICAgIGlmIChmcmFtZV9jcm9wcGluZ19mbGFnKSB7XG4gICAgICBmcmFtZV9jcm9wX2xlZnRfb2Zmc2V0ID0gZ2IucmVhZFVFRygpXG4gICAgICBmcmFtZV9jcm9wX3JpZ2h0X29mZnNldCA9IGdiLnJlYWRVRUcoKVxuICAgICAgZnJhbWVfY3JvcF90b3Bfb2Zmc2V0ID0gZ2IucmVhZFVFRygpXG4gICAgICBmcmFtZV9jcm9wX2JvdHRvbV9vZmZzZXQgPSBnYi5yZWFkVUVHKClcbiAgICB9XG5cbiAgICBsZXQgcGFyX3dpZHRoID0gMSwgcGFyX2hlaWdodCA9IDFcbiAgICBsZXQgZnBzID0gMCwgZnBzX2ZpeGVkID0gdHJ1ZSwgZnBzX251bSA9IDAsIGZwc19kZW4gPSAwXG5cbiAgICBsZXQgdnVpX3BhcmFtZXRlcnNfcHJlc2VudF9mbGFnID0gZ2IucmVhZEJvb2woKVxuICAgIGlmICh2dWlfcGFyYW1ldGVyc19wcmVzZW50X2ZsYWcpIHtcbiAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7IC8vIGFzcGVjdF9yYXRpb19pbmZvX3ByZXNlbnRfZmxhZ1xuICAgICAgICBsZXQgYXNwZWN0X3JhdGlvX2lkYyA9IGdiLnJlYWRCeXRlKClcbiAgICAgICAgbGV0IHBhcl93X3RhYmxlID0gWzEsIDEyLCAxMCwgMTYsIDQwLCAyNCwgMjAsIDMyLCA4MCwgMTgsIDE1LCA2NCwgMTYwLCA0LCAzLCAyXVxuICAgICAgICBsZXQgcGFyX2hfdGFibGUgPSBbMSwgMTEsIDExLCAxMSwgMzMsIDExLCAxMSwgMTEsIDMzLCAxMSwgMTEsIDMzLCA5OSwgMywgMiwgMV1cblxuICAgICAgICBpZiAoYXNwZWN0X3JhdGlvX2lkYyA+IDAgJiYgYXNwZWN0X3JhdGlvX2lkYyA8IDE2KSB7XG4gICAgICAgICAgcGFyX3dpZHRoID0gcGFyX3dfdGFibGVbYXNwZWN0X3JhdGlvX2lkYyAtIDFdXG4gICAgICAgICAgcGFyX2hlaWdodCA9IHBhcl9oX3RhYmxlW2FzcGVjdF9yYXRpb19pZGMgLSAxXVxuICAgICAgICB9IGVsc2UgaWYgKGFzcGVjdF9yYXRpb19pZGMgPT09IDI1NSkge1xuICAgICAgICAgIHBhcl93aWR0aCA9IGdiLnJlYWRCeXRlKCkgPDwgOCB8IGdiLnJlYWRCeXRlKClcbiAgICAgICAgICBwYXJfaGVpZ2h0ID0gZ2IucmVhZEJ5dGUoKSA8PCA4IHwgZ2IucmVhZEJ5dGUoKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgIGdiLnJlYWRCb29sKClcbiAgICAgIH1cbiAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgIGdiLnJlYWRCaXRzKDQpXG4gICAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgICAgZ2IucmVhZEJpdHMoMjQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgIGdiLnJlYWRVRUcoKVxuICAgICAgICBnYi5yZWFkVUVHKClcbiAgICAgIH1cbiAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgIGxldCBudW1fdW5pdHNfaW5fdGljayA9IGdiLnJlYWRCaXRzKDMyKVxuICAgICAgICBsZXQgdGltZV9zY2FsZSA9IGdiLnJlYWRCaXRzKDMyKVxuICAgICAgICBmcHNfZml4ZWQgPSBnYi5yZWFkQm9vbCgpXG5cbiAgICAgICAgZnBzX251bSA9IHRpbWVfc2NhbGVcbiAgICAgICAgZnBzX2RlbiA9IG51bV91bml0c19pbl90aWNrICogMlxuICAgICAgICBmcHMgPSBmcHNfbnVtIC8gZnBzX2RlblxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBwYXJTY2FsZSA9IDFcbiAgICBpZiAocGFyX3dpZHRoICE9PSAxIHx8IHBhcl9oZWlnaHQgIT09IDEpIHtcbiAgICAgIHBhclNjYWxlID0gcGFyX3dpZHRoIC8gcGFyX2hlaWdodFxuICAgIH1cblxuICAgIGxldCBjcm9wX3VuaXRfeCA9IDAsIGNyb3BfdW5pdF95ID0gMFxuICAgIGlmIChjaHJvbWFfZm9ybWF0X2lkYyA9PT0gMCkge1xuICAgICAgY3JvcF91bml0X3ggPSAxXG4gICAgICBjcm9wX3VuaXRfeSA9IDIgLSBmcmFtZV9tYnNfb25seV9mbGFnXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBzdWJfd2MgPSAoY2hyb21hX2Zvcm1hdF9pZGMgPT09IDMpID8gMSA6IDJcbiAgICAgIGxldCBzdWJfaGMgPSAoY2hyb21hX2Zvcm1hdF9pZGMgPT09IDEpID8gMiA6IDFcbiAgICAgIGNyb3BfdW5pdF94ID0gc3ViX3djXG4gICAgICBjcm9wX3VuaXRfeSA9IHN1Yl9oYyAqICgyIC0gZnJhbWVfbWJzX29ubHlfZmxhZylcbiAgICB9XG5cbiAgICBsZXQgY29kZWNfd2lkdGggPSAocGljX3dpZHRoX2luX21ic19taW51czEgKyAxKSAqIDE2XG4gICAgbGV0IGNvZGVjX2hlaWdodCA9ICgyIC0gZnJhbWVfbWJzX29ubHlfZmxhZykgKiAoKHBpY19oZWlnaHRfaW5fbWFwX3VuaXRzX21pbnVzMSArIDEpICogMTYpXG5cbiAgICBjb2RlY193aWR0aCAtPSAoZnJhbWVfY3JvcF9sZWZ0X29mZnNldCArIGZyYW1lX2Nyb3BfcmlnaHRfb2Zmc2V0KSAqIGNyb3BfdW5pdF94XG4gICAgY29kZWNfaGVpZ2h0IC09IChmcmFtZV9jcm9wX3RvcF9vZmZzZXQgKyBmcmFtZV9jcm9wX2JvdHRvbV9vZmZzZXQpICogY3JvcF91bml0X3lcblxuICAgIGxldCBwcmVzZW50X3dpZHRoID0gTWF0aC5jZWlsKGNvZGVjX3dpZHRoICogcGFyU2NhbGUpXG5cbiAgICBnYi5kZXN0cm95KClcbiAgICBnYiA9IG51bGxcblxuICAgIHJldHVybiB7XG4gICAgICBwcm9maWxlX3N0cmluZzogcHJvZmlsZV9zdHJpbmcsXG4gICAgICBsZXZlbF9zdHJpbmc6IGxldmVsX3N0cmluZyxcbiAgICAgIGJpdF9kZXB0aDogYml0X2RlcHRoLFxuICAgICAgY2hyb21hX2Zvcm1hdDogY2hyb21hX2Zvcm1hdCxcbiAgICAgIGNocm9tYV9mb3JtYXRfc3RyaW5nOiBTUFNQYXJzZXIuZ2V0Q2hyb21hRm9ybWF0U3RyaW5nKGNocm9tYV9mb3JtYXQpLFxuXG4gICAgICBmcmFtZV9yYXRlOiB7XG4gICAgICAgIGZpeGVkOiBmcHNfZml4ZWQsXG4gICAgICAgIGZwczogZnBzLFxuICAgICAgICBmcHNfZGVuOiBmcHNfZGVuLFxuICAgICAgICBmcHNfbnVtOiBmcHNfbnVtXG4gICAgICB9LFxuXG4gICAgICBwYXJfcmF0aW86IHtcbiAgICAgICAgd2lkdGg6IHBhcl93aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBwYXJfaGVpZ2h0XG4gICAgICB9LFxuXG4gICAgICBjb2RlY19zaXplOiB7XG4gICAgICAgIHdpZHRoOiBjb2RlY193aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBjb2RlY19oZWlnaHRcbiAgICAgIH0sXG5cbiAgICAgIHByZXNlbnRfc2l6ZToge1xuICAgICAgICB3aWR0aDogcHJlc2VudF93aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBjb2RlY19oZWlnaHRcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgX3NraXBTY2FsaW5nTGlzdCAoZ2IsIGNvdW50KSB7XG4gICAgbGV0IGxhc3Rfc2NhbGUgPSA4LCBuZXh0X3NjYWxlID0gOFxuICAgIGxldCBkZWx0YV9zY2FsZSA9IDBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgIGlmIChuZXh0X3NjYWxlICE9PSAwKSB7XG4gICAgICAgIGRlbHRhX3NjYWxlID0gZ2IucmVhZFNFRygpXG4gICAgICAgIG5leHRfc2NhbGUgPSAobGFzdF9zY2FsZSArIGRlbHRhX3NjYWxlICsgMjU2KSAlIDI1NlxuICAgICAgfVxuICAgICAgbGFzdF9zY2FsZSA9IChuZXh0X3NjYWxlID09PSAwKSA/IGxhc3Rfc2NhbGUgOiBuZXh0X3NjYWxlXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldFByb2ZpbGVTdHJpbmcgKHByb2ZpbGVJZGMpIHtcbiAgICBzd2l0Y2ggKHByb2ZpbGVJZGMpIHtcbiAgICAgIGNhc2UgNjY6XG4gICAgICAgIHJldHVybiAnQmFzZWxpbmUnXG4gICAgICBjYXNlIDc3OlxuICAgICAgICByZXR1cm4gJ01haW4nXG4gICAgICBjYXNlIDg4OlxuICAgICAgICByZXR1cm4gJ0V4dGVuZGVkJ1xuICAgICAgY2FzZSAxMDA6XG4gICAgICAgIHJldHVybiAnSGlnaCdcbiAgICAgIGNhc2UgMTEwOlxuICAgICAgICByZXR1cm4gJ0hpZ2gxMCdcbiAgICAgIGNhc2UgMTIyOlxuICAgICAgICByZXR1cm4gJ0hpZ2g0MjInXG4gICAgICBjYXNlIDI0NDpcbiAgICAgICAgcmV0dXJuICdIaWdoNDQ0J1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICdVbmtub3duJ1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRMZXZlbFN0cmluZyAobGV2ZWxJZGMpIHtcbiAgICByZXR1cm4gKGxldmVsSWRjIC8gMTApLnRvRml4ZWQoMSlcbiAgfVxuXG4gIHN0YXRpYyBnZXRDaHJvbWFGb3JtYXRTdHJpbmcgKGNocm9tYSkge1xuICAgIHN3aXRjaCAoY2hyb21hKSB7XG4gICAgICBjYXNlIDQyMDpcbiAgICAgICAgcmV0dXJuICc0OjI6MCdcbiAgICAgIGNhc2UgNDIyOlxuICAgICAgICByZXR1cm4gJzQ6MjoyJ1xuICAgICAgY2FzZSA0NDQ6XG4gICAgICAgIHJldHVybiAnNDo0OjQnXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ1Vua25vd24nXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHRvVmlkZW9NZXRhIChzcHNDb25maWcpIHtcbiAgICBsZXQgbWV0YSA9IHt9XG4gICAgaWYgKHNwc0NvbmZpZyAmJiBzcHNDb25maWcuY29kZWNfc2l6ZSkge1xuICAgICAgbWV0YS5jb2RlY1dpZHRoID0gc3BzQ29uZmlnLmNvZGVjX3NpemUud2lkdGhcbiAgICAgIG1ldGEuY29kZWNIZWlnaHQgPSBzcHNDb25maWcuY29kZWNfc2l6ZS5oZWlnaHRcbiAgICAgIG1ldGEucHJlc2VudFdpZHRoID0gc3BzQ29uZmlnLnByZXNlbnRfc2l6ZS53aWR0aFxuICAgICAgbWV0YS5wcmVzZW50SGVpZ2h0ID0gc3BzQ29uZmlnLnByZXNlbnRfc2l6ZS5oZWlnaHRcbiAgICB9XG5cbiAgICBtZXRhLnByb2ZpbGUgPSBzcHNDb25maWcucHJvZmlsZV9zdHJpbmdcbiAgICBtZXRhLmxldmVsID0gc3BzQ29uZmlnLmxldmVsX3N0cmluZ1xuICAgIG1ldGEuYml0RGVwdGggPSBzcHNDb25maWcuYml0X2RlcHRoXG4gICAgbWV0YS5jaHJvbWFGb3JtYXQgPSBzcHNDb25maWcuY2hyb21hX2Zvcm1hdFxuXG4gICAgbWV0YS5wYXJSYXRpbyA9IHtcbiAgICAgIHdpZHRoOiBzcHNDb25maWcucGFyX3JhdGlvLndpZHRoLFxuICAgICAgaGVpZ2h0OiBzcHNDb25maWcucGFyX3JhdGlvLmhlaWdodFxuICAgIH1cblxuICAgIG1ldGEuZnJhbWVSYXRlID0gc3BzQ29uZmlnLmZyYW1lX3JhdGVcblxuICAgIGxldCBmcHNEZW4gPSBtZXRhLmZyYW1lUmF0ZS5mcHNfZGVuXG4gICAgbGV0IGZwc051bSA9IG1ldGEuZnJhbWVSYXRlLmZwc19udW1cbiAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uID0gTWF0aC5mbG9vcihtZXRhLnRpbWVzY2FsZSAqIChmcHNEZW4gLyBmcHNOdW0pKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNQU1BhcnNlclxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIEhMU1xuICBNM1U4UGFyc2VyOiByZXF1aXJlKCcuL3NyYy9obHMvZGVtdXhlci9tM3U4cGFyc2VyJykuZGVmYXVsdCxcbiAgVHNEZW11eGVyOiByZXF1aXJlKCcuL3NyYy9obHMvZGVtdXhlci90cycpLmRlZmF1bHQsXG4gIFBsYXlsaXN0OiByZXF1aXJlKCcuL3NyYy9obHMvcGxheWxpc3QnKS5kZWZhdWx0LFxuICBGbHZEZW11eGVyOiByZXF1aXJlKCcuL3NyYy9mbHYvaW5kZXgnKS5kZWZhdWx0XG59O1xuIiwiaW1wb3J0IHsgaXNMZSwgVVRGOCB9IGZyb20gJ3hncGxheWVyLXV0aWxzJ1xuXG5jb25zdCBEQVRBX1RZUEVTID0ge1xuICBOVU1CRVI6IDAsXG4gIEJPT0xFQU46IDEsXG4gIFNUUklORzogMixcbiAgT0JKRUNUOiAzLFxuICBNSVhfQVJSQVk6IDgsXG4gIE9CSkVDVF9FTkQ6IDksXG4gIFNUUklDVF9BUlJBWTogMTAsXG4gIERBVEU6IDExLFxuICBMT05FX1NUUklORzogMTJcbn1cblxuLyoqXG4gKiBtZXRh5L+h5oGv6Kej5p6QXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFNRlBhcnNlciB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgICB0aGlzLnJlYWRPZmZzZXQgPSB0aGlzLm9mZnNldFxuICB9XG5cbiAgcmVzb2x2ZSAobWV0YSwgc2l6ZSkge1xuICAgIGlmIChzaXplIDwgMykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3QgZW5vdWdoIGRhdGEgZm9yIG1ldGFpbmZvJylcbiAgICB9XG4gICAgY29uc3QgbWV0YURhdGEgPSB7fVxuICAgIGNvbnN0IG5hbWUgPSB0aGlzLnBhcnNlVmFsdWUobWV0YSlcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMucGFyc2VWYWx1ZShtZXRhLCBzaXplIC0gbmFtZS5ib2R5U2l6ZSlcbiAgICBtZXRhRGF0YVtuYW1lLmRhdGFdID0gdmFsdWUuZGF0YVxuXG4gICAgdGhpcy5yZXNldFN0YXR1cygpXG4gICAgcmV0dXJuIG1ldGFEYXRhXG4gIH1cblxuICByZXNldFN0YXR1cyAoKSB7XG4gICAgdGhpcy5vZmZzZXQgPSAwXG4gICAgdGhpcy5yZWFkT2Zmc2V0ID0gdGhpcy5vZmZzZXRcbiAgfVxuXG4gIHBhcnNlU3RyaW5nIChidWZmZXIpIHtcbiAgICBjb25zdCBkdiA9IG5ldyBEYXRhVmlldyhidWZmZXIsIHRoaXMucmVhZE9mZnNldClcbiAgICBjb25zdCBzdHJMZW4gPSBkdi5nZXRVaW50MTYoMCwgIWlzTGUpXG4gICAgbGV0IHN0ciA9ICcnXG4gICAgaWYgKHN0ckxlbiA+IDApIHtcbiAgICAgIHN0ciA9IFVURjguZGVjb2RlKG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgdGhpcy5yZWFkT2Zmc2V0ICsgMiwgc3RyTGVuKSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gJydcbiAgICB9XG4gICAgbGV0IHNpemUgPSBzdHJMZW4gKyAyXG4gICAgdGhpcy5yZWFkT2Zmc2V0ICs9IHNpemVcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogc3RyLFxuICAgICAgYm9keVNpemU6IHN0ckxlbiArIDJcbiAgICB9XG4gIH1cblxuICBwYXJzZURhdGUgKGJ1ZmZlciwgc2l6ZSkge1xuICAgIGNvbnN0IGR2ID0gbmV3IERhdGFWaWV3KGJ1ZmZlciwgdGhpcy5yZWFkT2Zmc2V0LCBzaXplKVxuICAgIGxldCB0cyA9IGR2LmdldEZsb2F0NjQoMCwgIWlzTGUpXG4gICAgY29uc3QgdGltZU9mZnNldCA9IGR2LmdldEludDE2KDgsICFpc0xlKVxuICAgIHRzICs9IHRpbWVPZmZzZXQgKiA2MCAqIDEwMDBcblxuICAgIHRoaXMucmVhZE9mZnNldCArPSAxMFxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBuZXcgRGF0ZSh0cyksXG4gICAgICBib2R5U2l6ZTogMTBcbiAgICB9XG4gIH1cblxuICBwYXJzZU9iamVjdCAoYnVmZmVyLCBzaXplKSB7XG4gICAgY29uc3QgbmFtZSA9IHRoaXMucGFyc2VTdHJpbmcoYnVmZmVyLCBzaXplKVxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5wYXJzZVZhbHVlKGJ1ZmZlciwgc2l6ZSAtIG5hbWUuYm9keVNpemUpXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgbmFtZTogbmFtZS5kYXRhLFxuICAgICAgICB2YWx1ZTogdmFsdWUuZGF0YVxuICAgICAgfSxcbiAgICAgIGJvZHlTaXplOiBuYW1lLmJvZHlTaXplICsgdmFsdWUuYm9keVNpemUsXG4gICAgICBpc09iakVuZDogdmFsdWUuaXNPYmpFbmRcbiAgICB9XG4gIH1cblxuICBwYXJzZUxvbmdTdHJpbmcgKGJ1ZmZlcikge1xuICAgIGNvbnN0IGR2ID0gbmV3IERhdGFWaWV3KGJ1ZmZlciwgdGhpcy5yZWFkT2Zmc2V0KVxuICAgIGNvbnN0IHN0ckxlbiA9IGR2LmdldFVpbnQzMigwLCAhaXNMZSlcbiAgICBsZXQgc3RyID0gJydcbiAgICBpZiAoc3RyTGVuID4gMCkge1xuICAgICAgc3RyID0gVVRGOC5kZWNvZGUobmV3IFVpbnQ4QXJyYXkoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQgKyAyLCBzdHJMZW4pKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSAnJ1xuICAgIH1cbiAgICAvLyBjb25zdCBzaXplID0gc3RyTGVuICsgNDtcbiAgICB0aGlzLnJlYWRPZmZzZXQgKz0gc3RyTGVuICsgNFxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBzdHIsXG4gICAgICBib2R5U2l6ZTogc3RyTGVuICsgNFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDop6PmnpBtZXRh5Lit55qE5Y+Y6YePXG4gICAqL1xuICBwYXJzZVZhbHVlIChkYXRhLCBzaXplKSB7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcigpXG4gICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgYnVmZmVyID0gZGF0YVxuICAgIH0gZWxzZSB7XG4gICAgICBidWZmZXIgPSBkYXRhLmJ1ZmZlclxuICAgIH1cbiAgICBjb25zdCB7XG4gICAgICBOVU1CRVIsXG4gICAgICBCT09MRUFOLFxuICAgICAgU1RSSU5HLFxuICAgICAgT0JKRUNULFxuICAgICAgTUlYX0FSUkFZLFxuICAgICAgT0JKRUNUX0VORCxcbiAgICAgIFNUUklDVF9BUlJBWSxcbiAgICAgIERBVEUsXG4gICAgICBMT05FX1NUUklOR1xuICAgIH0gPSBEQVRBX1RZUEVTXG4gICAgY29uc3QgZGF0YVZpZXcgPSBuZXcgRGF0YVZpZXcoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQsIHNpemUpXG4gICAgbGV0IGlzT2JqRW5kID0gZmFsc2VcbiAgICBjb25zdCB0eXBlID0gZGF0YVZpZXcuZ2V0VWludDgoMClcbiAgICBsZXQgb2Zmc2V0ID0gMVxuICAgIHRoaXMucmVhZE9mZnNldCArPSAxXG4gICAgbGV0IHZhbHVlID0gbnVsbFxuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIE5VTUJFUjoge1xuICAgICAgICB2YWx1ZSA9IGRhdGFWaWV3LmdldEZsb2F0NjQoMSwgIWlzTGUpXG4gICAgICAgIHRoaXMucmVhZE9mZnNldCArPSA4XG4gICAgICAgIG9mZnNldCArPSA4XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjYXNlIEJPT0xFQU46IHtcbiAgICAgICAgY29uc3QgYm9vbE51bSA9IGRhdGFWaWV3LmdldFVpbnQ4KDEpXG4gICAgICAgIHZhbHVlID0gISFib29sTnVtXG4gICAgICAgIHRoaXMucmVhZE9mZnNldCArPSAxXG4gICAgICAgIG9mZnNldCArPSAxXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjYXNlIFNUUklORzoge1xuICAgICAgICBjb25zdCBzdHIgPSB0aGlzLnBhcnNlU3RyaW5nKGJ1ZmZlcilcbiAgICAgICAgdmFsdWUgPSBzdHIuZGF0YVxuICAgICAgICBvZmZzZXQgKz0gc3RyLmJvZHlTaXplXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjYXNlIE9CSkVDVDoge1xuICAgICAgICB2YWx1ZSA9IHt9XG4gICAgICAgIGxldCBvYmpFbmRTaXplID0gMFxuICAgICAgICBpZiAoZGF0YVZpZXcuZ2V0VWludDMyKHNpemUgLSA0LCAhaXNMZSkgJiAweDAwRkZGRkZGKSB7XG4gICAgICAgICAgb2JqRW5kU2l6ZSA9IDNcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzLnJlYWRPZmZzZXQgKz0gb2Zmc2V0IC0gMTtcbiAgICAgICAgd2hpbGUgKG9mZnNldCA8IHNpemUgLSA0KSB7XG4gICAgICAgICAgY29uc3QgYW1mT2JqID0gdGhpcy5wYXJzZU9iamVjdChidWZmZXIsIHNpemUgLSBvZmZzZXQgLSBvYmpFbmRTaXplKVxuICAgICAgICAgIGlmIChhbWZPYmouaXNPYmplY3RFbmQpIHsgYnJlYWsgfVxuICAgICAgICAgIHZhbHVlW2FtZk9iai5kYXRhLm5hbWVdID0gYW1mT2JqLmRhdGEudmFsdWVcbiAgICAgICAgICBvZmZzZXQgKz0gYW1mT2JqLmJvZHlTaXplXG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9mZnNldCA8PSBzaXplIC0gMykge1xuICAgICAgICAgIGNvbnN0IG1hcmsgPSBkYXRhVmlldy5nZXRVaW50MzIob2Zmc2V0IC0gMSwgIWlzTGUpICYgMHgwMEZGRkZGRlxuICAgICAgICAgIGlmIChtYXJrID09PSA5KSB7XG4gICAgICAgICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gM1xuICAgICAgICAgICAgb2Zmc2V0ICs9IDNcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGNhc2UgTUlYX0FSUkFZOiB7XG4gICAgICAgIHZhbHVlID0ge31cbiAgICAgICAgb2Zmc2V0ICs9IDRcbiAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDRcbiAgICAgICAgbGV0IG9iakVuZFNpemUgPSAwXG4gICAgICAgIGlmICgoZGF0YVZpZXcuZ2V0VWludDMyKHNpemUgLSA0LCAhaXNMZSkgJiAweDAwRkZGRkZGKSA9PT0gOSkge1xuICAgICAgICAgIG9iakVuZFNpemUgPSAzXG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAob2Zmc2V0IDwgc2l6ZSAtIDgpIHtcbiAgICAgICAgICBjb25zdCBhbWZWYXIgPSB0aGlzLnBhcnNlT2JqZWN0KGJ1ZmZlciwgc2l6ZSAtIG9mZnNldCAtIG9iakVuZFNpemUpXG4gICAgICAgICAgaWYgKGFtZlZhci5pc09iamVjdEVuZCkgeyBicmVhayB9XG4gICAgICAgICAgdmFsdWVbYW1mVmFyLmRhdGEubmFtZV0gPSBhbWZWYXIuZGF0YS52YWx1ZVxuICAgICAgICAgIG9mZnNldCArPSBhbWZWYXIuYm9keVNpemVcbiAgICAgICAgfVxuICAgICAgICBpZiAob2Zmc2V0IDw9IHNpemUgLSAzKSB7XG4gICAgICAgICAgY29uc3QgbWFya2VyID0gZGF0YVZpZXcuZ2V0VWludDMyKG9mZnNldCAtIDEsICFpc0xlKSAmIDB4MDBGRkZGRkZcbiAgICAgICAgICBpZiAobWFya2VyID09PSA5KSB7XG4gICAgICAgICAgICBvZmZzZXQgKz0gM1xuICAgICAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDNcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgY2FzZSBPQkpFQ1RfRU5EOiB7XG4gICAgICAgIHZhbHVlID0gbnVsbFxuICAgICAgICBpc09iakVuZCA9IHRydWVcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgY2FzZSBTVFJJQ1RfQVJSQVk6IHtcbiAgICAgICAgdmFsdWUgPSBbXVxuICAgICAgICBjb25zdCBhcnJMZW5ndGggPSBkYXRhVmlldy5nZXRVaW50MzIoMSwgIWlzTGUpXG4gICAgICAgIG9mZnNldCArPSA0XG4gICAgICAgIHRoaXMucmVhZE9mZnNldCArPSA0XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBzY3JpcHQgPSB0aGlzLnBhcnNlVmFsdWUoYnVmZmVyLCBzaXplIC0gb2Zmc2V0KVxuICAgICAgICAgIHZhbHVlLnB1c2goc2NyaXB0LmRhdGEpXG4gICAgICAgICAgb2Zmc2V0ICs9IHNjcmlwdC5ib2R5U2l6ZVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGNhc2UgREFURToge1xuICAgICAgICBjb25zdCBkYXRlID0gdGhpcy5wYXJzZURhdGUoYnVmZmVyLCBzaXplIC0gMSlcbiAgICAgICAgdmFsdWUgPSBkYXRlLmRhdGFcbiAgICAgICAgb2Zmc2V0ICs9IGRhdGUuYm9keVNpemVcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgY2FzZSBMT05FX1NUUklORzoge1xuICAgICAgICBjb25zdCBsb25nU3RyID0gdGhpcy5wYXJzZUxvbmdTdHJpbmcoYnVmZmVyLCBzaXplIC0gMSlcbiAgICAgICAgdmFsdWUgPSBsb25nU3RyLmRhdGFcbiAgICAgICAgb2Zmc2V0ICs9IGxvbmdTdHIuYm9keVNpemVcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBvZmZzZXQgPSBzaXplXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IHZhbHVlLFxuICAgICAgYm9keVNpemU6IG9mZnNldCxcbiAgICAgIGlzT2JqRW5kOiBpc09iakVuZFxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgRVZFTlRTLCBBdWRpb1RyYWNrTWV0YSwgVmlkZW9UcmFja01ldGEgfSBmcm9tICd4Z3BsYXllci11dGlscyc7XG5pbXBvcnQgeyBTcHNQYXJzZXIgfSBmcm9tICd4Z3BsYXllci1jb2RlYyc7XG5pbXBvcnQgeyBWaWRlb1RyYWNrLCBBdWRpb1RyYWNrIH0gZnJvbSAneGdwbGF5ZXItYnVmZmVyJ1xuXG5pbXBvcnQgQU1GUGFyc2VyIGZyb20gJy4vYW1mLXBhcnNlcidcblxuY29uc3QgREVNVVhfRVZFTlRTID0gRVZFTlRTLkRFTVVYX0VWRU5UUztcblxuY2xhc3MgRmx2RGVtdXhlciB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLl9maXJzdEZyYWdtZW50TG9hZGVkID0gZmFsc2VcbiAgICB0aGlzLl90cmFja051bSA9IDBcbiAgICB0aGlzLl9oYXNTY3JpcHQgPSBmYWxzZVxuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgdGhpcy5vbihERU1VWF9FVkVOVFMuREVNVVhfU1RBUlQsIHRoaXMuZG9QYXJzZUZsdi5iaW5kKHRoaXMpKVxuICB9XG5cbiAgLyoqXG4gICAqIGlmIHRoZSBmbHYgaGVhZCBpcyB2YWxpZFxuICAgKiBAcGFyYW0gZGF0YVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHN0YXRpYyBpc0ZsdkZpbGUgKGRhdGEpIHtcbiAgICByZXR1cm4gIShkYXRhWzBdICE9PSAweDQ2IHx8IGRhdGFbMV0gIT09IDB4NEMgfHwgZGF0YVsyXSAhPT0gMHg1NiB8fCBkYXRhWzNdICE9PSAweDAxKVxuICB9XG5cbiAgLyoqXG4gICAqIElmIHRoZSBzdHJlYW0gaGFzIGF1ZGlvIG9yIHZpZGVvLlxuICAgKiBAcGFyYW0ge251bWJlcn0gc3RyZWFtRmxhZyAtIERhdGEgZnJvbSB0aGUgc3RyZWFtIHdoaWNoIGlzIGRlZmluZSB3aGV0aGVyIHRoZSBhdWRpbyAvIHZpZGVvIHRyYWNrIGlzIGV4aXN0LlxuICAgKi9cbiAgc3RhdGljIGdldFBsYXlUeXBlIChzdHJlYW1GbGFnKSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgaGFzVmlkZW86IGZhbHNlLFxuICAgICAgaGFzQXVkaW86IGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKHN0cmVhbUZsYWcgJiAweDAxID4gMCkge1xuICAgICAgcmVzdWx0Lmhhc1ZpZGVvID0gdHJ1ZVxuICAgIH1cblxuICAgIGlmIChzdHJlYW1GbGFnICYgMHgwNCA+IDApIHtcbiAgICAgIHJlc3VsdC5oYXNBdWRpbyA9IHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICBkb1BhcnNlRmx2ICgpIHtcbiAgICBpZiAoIXRoaXMuX2ZpcnN0RnJhZ21lbnRMb2FkZWQpIHtcbiAgICAgIGlmICh0aGlzLmxvYWRlckJ1ZmZlci5sZW5ndGggPCAxMykge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IGhlYWRlciA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDEzKVxuICAgICAgdGhpcy5wYXJzZUZsdkhlYWRlcihoZWFkZXIpXG4gICAgICB0aGlzLmRvUGFyc2VGbHYoKSAvLyDpgJLlvZLosIPnlKjvvIznu6fnu63op6PmnpBmbHbmtYFcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMubG9hZGVyQnVmZmVyLmxlbmd0aCA8IDExKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgbGV0IGNodW5rO1xuICAgICAgZG8ge1xuICAgICAgICBjaHVuayA9IHRoaXMuX3BhcnNlRmx2VGFnKClcbiAgICAgIH0gd2hpbGUgKGNodW5rKVxuXG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0NPTVBMRVRFKVxuICAgIH1cbiAgfVxuXG4gIHBhcnNlRmx2SGVhZGVyIChoZWFkZXIpIHtcbiAgICBpZiAoIUZsdkRlbXV4ZXIuaXNGbHZGaWxlKGhlYWRlcikpIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIG5ldyBFcnJvcignaW52YWxpZCBmbHYgZmlsZScpKVxuICAgICAgdGhpcy5kb1BhcnNlRmx2KClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZmlyc3RGcmFnbWVudExvYWRlZCA9IHRydWVcbiAgICAgIGNvbnN0IHBsYXlUeXBlID0gRmx2RGVtdXhlci5nZXRQbGF5VHlwZShoZWFkZXJbNF0pXG5cbiAgICAgIGlmIChwbGF5VHlwZS5oYXNWaWRlbykge1xuICAgICAgICB0aGlzLmluaXRWaWRlb1RyYWNrKClcbiAgICAgIH1cblxuICAgICAgaWYgKHBsYXlUeXBlLmhhc0F1ZGlvKSB7XG4gICAgICAgIHRoaXMuaW5pdEF1ZGlvVHJhY2soKVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmRvUGFyc2VGbHYoKVxuICB9XG5cbiAgLyoqXG4gICAqIGluaXQgZGVmYXVsdCB2aWRlbyB0cmFjayBjb25maWdzXG4gICAqL1xuICBpbml0VmlkZW9UcmFjayAoKSB7XG4gICAgdGhpcy5fdHJhY2tOdW0rK1xuICAgIGxldCB2aWRlb1RyYWNrID0gbmV3IFZpZGVvVHJhY2soKVxuICAgIHZpZGVvVHJhY2subWV0YSA9IG5ldyBWaWRlb1RyYWNrTWV0YSgpXG4gICAgdmlkZW9UcmFjay5pZCA9IHZpZGVvVHJhY2subWV0YS5pZCA9IHRoaXMuX3RyYWNrTnVtXG5cbiAgICB0aGlzLnRyYWNrcy52aWRlb1RyYWNrID0gdmlkZW9UcmFja1xuICB9XG5cbiAgLyoqXG4gICAqIGluaXQgZGVmYXVsdCBhdWRpbyB0cmFjayBjb25maWdzXG4gICAqL1xuICBpbml0QXVkaW9UcmFjayAoKSB7XG4gICAgdGhpcy5fdHJhY2tOdW0rK1xuICAgIGxldCBhdWRpb1RyYWNrID0gbmV3IEF1ZGlvVHJhY2soKVxuICAgIGF1ZGlvVHJhY2subWV0YSA9IG5ldyBBdWRpb1RyYWNrTWV0YSgpXG4gICAgYXVkaW9UcmFjay5pZCA9IGF1ZGlvVHJhY2subWV0YS5pZCA9IHRoaXMuX3RyYWNrTnVtXG5cbiAgICB0aGlzLnRyYWNrcy5hdWRpb1RyYWNrID0gYXVkaW9UcmFja1xuICB9XG5cbiAgLyoqXG4gICAqIFBhY2thZ2UgdGhlIGRhdGEgYXMgdGhlIGZvbGxvd2luZyBkYXRhIHN0cnVjdHVyZVxuICAgKiB7XG4gICAqICAgIGRhdGE6IFVpbnQ4QXJyYXkuIHRoZSBTdHJlYW0gZGF0YS5cbiAgICogICAgaW5mbzogVGhlIGZpcnN0IGJ5dGUgaW5mbyBvZiB0aGUgVGFnLlxuICAgKiAgICB0YWdUeXBlOiA444CBOeOAgTE4XG4gICAqICAgIHRpbWVTdGFtcDogdGhlIHRpbWVzdGVtcFxuICAgKiB9XG4gICAqL1xuICBfcGFyc2VGbHZUYWcgKCkge1xuICAgIGlmICh0aGlzLmxvYWRlckJ1ZmZlci5sZW5ndGggPCAxMSkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgbGV0IGNodW5rID0gdGhpcy5fcGFyc2VGbHZUYWdIZWFkZXIoKVxuICAgIGlmIChjaHVuaykge1xuICAgICAgdGhpcy5fcHJvY2Vzc0NodW5rKGNodW5rKVxuICAgIH1cbiAgICByZXR1cm4gY2h1bmtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZSB0aGUgMTEgYnl0ZSB0YWcgSGVhZGVyXG4gICAqL1xuICBfcGFyc2VGbHZUYWdIZWFkZXIgKCkge1xuICAgIGxldCBvZmZzZXQgPSAwXG4gICAgbGV0IGNodW5rID0ge31cblxuICAgIGxldCB0YWdUeXBlID0gdGhpcy5sb2FkZXJCdWZmZXIudG9JbnQob2Zmc2V0LCAxKVxuICAgIG9mZnNldCArPSAxXG5cbiAgICAvLyAyIGJpdCBGTVMgcmVzZXJ2ZWQsIDEgYml0IGZpbHRlcmVkLCA1IGJpdCB0YWcgdHlwZVxuICAgIGNodW5rLmZpbHRlcmVkID0gKHRhZ1R5cGUgJiAzMikgPj4+IDVcbiAgICBjaHVuay50YWdUeXBlID0gdGFnVHlwZSAmIDMxXG5cbiAgICAvLyAzIEJ5dGUgZGF0YXNpemVcbiAgICBjaHVuay5kYXRhc2l6ZSA9IHRoaXMubG9hZGVyQnVmZmVyLnRvSW50KG9mZnNldCwgMylcbiAgICBvZmZzZXQgKz0gM1xuXG4gICAgaWYgKChjaHVuay50YWdUeXBlICE9PSA4ICYmIGNodW5rLnRhZ1R5cGUgIT09IDkgJiYgY2h1bmsudGFnVHlwZSAhPT0gMTEgJiYgY2h1bmsudGFnVHlwZSAhPT0gMTgpIHx8XG4gICAgICB0aGlzLmxvYWRlckJ1ZmZlci50b0ludCg4LCAzKSAhPT0gMCkge1xuICAgICAgaWYgKHRoaXMubG9hZGVyQnVmZmVyICYmIHRoaXMubG9hZGVyQnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMSlcbiAgICAgIH1cbiAgICAgIHRoaXMubG9nZ2VyLndhcm4odGhpcy5UQUcsICd0YWdUeXBlICcgKyBjaHVuay50YWdUeXBlKVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sb2FkZXJCdWZmZXIubGVuZ3RoIDwgY2h1bmsuZGF0YXNpemUgKyAxNSkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICAvLyByZWFkIHRoZSBkYXRhLlxuICAgIHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDQpXG5cbiAgICAvLyAzIEJ5dGUgdGltZXN0YW1wXG4gICAgbGV0IHRpbWVzdGFtcCA9IHRoaXMubG9hZGVyQnVmZmVyLnRvSW50KDAsIDMpXG4gICAgdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMylcblxuICAgIC8vIDEgQnl0ZSB0aW1lc3RhbXBFeHRcbiAgICBsZXQgdGltZXN0YW1wRXh0ID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMSlbMF1cbiAgICBpZiAodGltZXN0YW1wRXh0ID4gMCkge1xuICAgICAgdGltZXN0YW1wICs9IHRpbWVzdGFtcEV4dCAqIDB4MTAwMDAwMFxuICAgIH1cblxuICAgIGNodW5rLmR0cyA9IHRpbWVzdGFtcFxuXG4gICAgLy8gc3RyZWFtSWRcbiAgICB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgzKVxuICAgIHJldHVybiBjaHVua1xuICB9XG5cbiAgX3Byb2Nlc3NDaHVuayAoY2h1bmspIHtcbiAgICBzd2l0Y2ggKGNodW5rLnRhZ1R5cGUpIHtcbiAgICAgIGNhc2UgMTg6XG4gICAgICAgIHRoaXMuX3BhcnNlU2NyaXB0RGF0YShjaHVuaylcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgODpcbiAgICAgICAgdGhpcy5fcGFyc2VBQUNEYXRhKGNodW5rKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSA5OlxuICAgICAgICB0aGlzLl9wYXJzZUhldmNEYXRhKGNodW5rKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAxMTpcbiAgICAgICAgLy8gZm9yIHNvbWUgQ0ROIHRoYXQgZGlkIG5vdCBwcm9jZXNzIHRoZSBjdXJyZWN0IFJUTVAgbWVzc2FnZXNcbiAgICAgICAgdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMylcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDEpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHBhcnNlIGZsdiBzY3JpcHQgZGF0YVxuICAgKiBAcGFyYW0gY2h1bmtcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9wYXJzZVNjcmlwdERhdGEgKGNodW5rKSB7XG4gICAgbGV0IGF1ZGlvVHJhY2sgPSB0aGlzLnRyYWNrcy5hdWRpb1RyYWNrXG4gICAgbGV0IHZpZGVvVHJhY2sgPSB0aGlzLnRyYWNrcy52aWRlb1RyYWNrXG5cbiAgICBsZXQgZGF0YSA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KGNodW5rLmRhdGFzaXplKVxuXG4gICAgY29uc3QgaW5mbyA9IG5ldyBBTUZQYXJzZXIoKS5yZXNvbHZlKGRhdGEsIGRhdGEubGVuZ3RoKVxuXG4gICAgY29uc3Qgb25NZXRhRGF0YSA9IHRoaXMuX2NvbnRleHQub25NZXRhRGF0YSA9IGluZm8gPyBpbmZvLm9uTWV0YURhdGEgOiB1bmRlZmluZWRcblxuICAgIC8vIGZpbGwgbWVkaWFJbmZvXG4gICAgdGhpcy5fY29udGV4dC5tZWRpYUluZm8uZHVyYXRpb24gPSBvbk1ldGFEYXRhLmR1cmF0aW9uXG4gICAgdGhpcy5fY29udGV4dC5tZWRpYUluZm8uaGFzVmlkZW8gPSBvbk1ldGFEYXRhLmhhc1ZpZGVvXG4gICAgdGhpcy5fY29udGV4dC5tZWRpYUluZm8uaHNhQXVkaW8gPSBvbk1ldGFEYXRhLmhhc0F1ZGlvXG5cbiAgICBsZXQgdmFsaWRhdGUgPSB0aGlzLl9kYXRhc2l6ZVZhbGlkYXRvcihjaHVuay5kYXRhc2l6ZSlcbiAgICBpZiAodmFsaWRhdGUpIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVESUFfSU5GTylcbiAgICAgIHRoaXMuX2hhc1NjcmlwdCA9IHRydWVcbiAgICB9XG5cbiAgICAvLyBFZGl0IGRlZmF1bHQgbWV0YS5cbiAgICBpZiAoYXVkaW9UcmFjayAmJiAhYXVkaW9UcmFjay5oYXNTcGVjaWZpY0NvbmZpZykge1xuICAgICAgbGV0IG1ldGEgPSBhdWRpb1RyYWNrLm1ldGFcbiAgICAgIGlmIChvbk1ldGFEYXRhLmF1ZGlvc2FtcGxlcmF0ZSkge1xuICAgICAgICBtZXRhLnNhbXBsZVJhdGUgPSBvbk1ldGFEYXRhLmF1ZGlvc2FtcGxlcmF0ZVxuICAgICAgfVxuXG4gICAgICBpZiAob25NZXRhRGF0YS5hdWRpb2NoYW5uZWxzKSB7XG4gICAgICAgIG1ldGEuY2hhbm5lbENvdW50ID0gb25NZXRhRGF0YS5hdWRpb2NoYW5uZWxzXG4gICAgICB9XG5cbiAgICAgIHN3aXRjaCAob25NZXRhRGF0YS5hdWRpb3NhbXBsZXJhdGUpIHtcbiAgICAgICAgY2FzZSA0NDEwMDpcbiAgICAgICAgICBtZXRhLnNhbXBsZVJhdGVJbmRleCA9IDRcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDIyMDUwOlxuICAgICAgICAgIG1ldGEuc2FtcGxlUmF0ZUluZGV4ID0gN1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMTEwMjU6XG4gICAgICAgICAgbWV0YS5zYW1wbGVSYXRlSW5kZXggPSAxMFxuICAgICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICAgIGlmICh2aWRlb1RyYWNrICYmICF2aWRlb1RyYWNrLmhhc1NwZWNpZmljQ29uZmlnKSB7XG4gICAgICBsZXQgbWV0YSA9IHZpZGVvVHJhY2subWV0YVxuICAgICAgaWYgKHR5cGVvZiBvbk1ldGFEYXRhLmZyYW1lcmF0ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgbGV0IGZwc051bSA9IE1hdGguZmxvb3Iob25NZXRhRGF0YS5mcmFtZXJhdGUgKiAxMDAwKVxuICAgICAgICBpZiAoZnBzTnVtID4gMCkge1xuICAgICAgICAgIGxldCBmcHMgPSBmcHNOdW0gLyAxMDAwXG4gICAgICAgICAgaWYgKCFtZXRhLmZyYW1lUmF0ZSkge1xuICAgICAgICAgICAgbWV0YS5mcmFtZVJhdGUgPSB7fVxuICAgICAgICAgIH1cbiAgICAgICAgICBtZXRhLmZyYW1lUmF0ZS5maXhlZCA9IHRydWVcbiAgICAgICAgICBtZXRhLmZyYW1lUmF0ZS5mcHMgPSBmcHNcbiAgICAgICAgICBtZXRhLmZyYW1lUmF0ZS5mcHNfbnVtID0gZnBzTnVtXG4gICAgICAgICAgbWV0YS5mcmFtZVJhdGUuZnBzX2RlbiA9IDEwMDBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9hYWNTZXF1ZW5jZUhlYWRlclBhcnNlciAoZGF0YSkge1xuICAgIGxldCByZXQgPSB7fVxuICAgIHJldC5oYXNTcGVjaWZpY0NvbmZpZyA9IHRydWVcbiAgICByZXQub2JqZWN0VHlwZSA9IGRhdGFbMV0gPj4+IDNcbiAgICByZXQuc2FtcGxlUmF0ZUluZGV4ID0gKChkYXRhWzFdICYgNykgPDwgMSkgfCAoZGF0YVsyXSA+Pj4gNylcbiAgICByZXQuYXVkaW9zYW1wbGVyYXRlID0gdGhpcy5fc3dpdGNoQXVkaW9TYW1wbGVSYXRlKHJldC5zYW1wbGVSYXRlSW5kZXgpXG4gICAgcmV0LmNoYW5uZWxDb3VudCA9IChkYXRhWzJdICYgMTIwKSA+Pj4gM1xuICAgIHJldC5mcmFtZUxlbmd0aCA9IChkYXRhWzJdICYgNCkgPj4+IDJcbiAgICByZXQuZGVwZW5kc09uQ29yZUNvZGVyID0gKGRhdGFbMl0gJiAyKSA+Pj4gMVxuICAgIHJldC5leHRlbnNpb25GbGFnSW5kZXggPSBkYXRhWzJdICYgMVxuXG4gICAgcmV0LmNvZGVjID0gYG1wNGEuNDAuJHtyZXQub2JqZWN0VHlwZX1gXG4gICAgbGV0IHVzZXJBZ2VudCA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgbGV0IGV4dGVuc2lvblNhbXBsaW5nSW5kZXg7XG5cbiAgICBsZXQgY29uZmlnO1xuICAgIGxldCBzYW1wbGluZ0luZGV4ID0gcmV0LnNhbXBsZVJhdGVJbmRleDtcblxuICAgIGlmICh1c2VyQWdlbnQuaW5kZXhPZignZmlyZWZveCcpICE9PSAtMSkge1xuICAgICAgLy8gZmlyZWZveDogdXNlIFNCUiAoSEUtQUFDKSBpZiBmcmVxIGxlc3MgdGhhbiAyNGtIelxuICAgICAgaWYgKHJldC5zYW1wbGVSYXRlSW5kZXggPj0gNikge1xuICAgICAgICByZXQub2JqZWN0VHlwZSA9IDU7XG4gICAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSg0KTtcbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCA9IHNhbXBsaW5nSW5kZXggLSAzO1xuICAgICAgfSBlbHNlIHsgLy8gdXNlIExDLUFBQ1xuICAgICAgICByZXQub2JqZWN0VHlwZSA9IDI7XG4gICAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSgyKTtcbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCA9IHNhbXBsaW5nSW5kZXg7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh1c2VyQWdlbnQuaW5kZXhPZignYW5kcm9pZCcpICE9PSAtMSkge1xuICAgICAgLy8gYW5kcm9pZDogYWx3YXlzIHVzZSBMQy1BQUNcbiAgICAgIHJldC5vYmplY3RUeXBlID0gMjtcbiAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSgyKTtcbiAgICAgIGV4dGVuc2lvblNhbXBsaW5nSW5kZXggPSBzYW1wbGluZ0luZGV4O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBmb3Igb3RoZXIgYnJvd3NlcnMsIGUuZy4gY2hyb21lLi4uXG4gICAgICAvLyBBbHdheXMgdXNlIEhFLUFBQyB0byBtYWtlIGl0IGVhc2llciB0byBzd2l0Y2ggYWFjIGNvZGVjIHByb2ZpbGVcbiAgICAgIHJldC5vYmplY3RUeXBlID0gNTtcbiAgICAgIGV4dGVuc2lvblNhbXBsaW5nSW5kZXggPSByZXQuc2FtcGxlUmF0ZUluZGV4O1xuICAgICAgY29uZmlnID0gbmV3IEFycmF5KDQpO1xuXG4gICAgICBpZiAocmV0LnNhbXBsZVJhdGVJbmRleCA+PSA2KSB7XG4gICAgICAgIGV4dGVuc2lvblNhbXBsaW5nSW5kZXggPSByZXQuc2FtcGxlUmF0ZUluZGV4IC0gMztcbiAgICAgIH0gZWxzZSBpZiAocmV0LmNoYW5uZWxDb3VudCA9PT0gMSkgeyAvLyBNb25vIGNoYW5uZWxcbiAgICAgICAgcmV0Lm9iamVjdFR5cGUgPSAyO1xuICAgICAgICBjb25maWcgPSBuZXcgQXJyYXkoMik7XG4gICAgICAgIGV4dGVuc2lvblNhbXBsaW5nSW5kZXggPSByZXQuc2FtcGxlUmF0ZUluZGV4O1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbmZpZ1swXSA9IHJldC5vYmplY3RUeXBlIDw8IDM7XG4gICAgY29uZmlnWzBdIHw9IChyZXQuc2FtcGxlUmF0ZUluZGV4ICYgMHgwRikgPj4+IDE7XG4gICAgY29uZmlnWzFdID0gKHJldC5zYW1wbGVSYXRlSW5kZXggJiAweDBGKSA8PCA3O1xuICAgIGNvbmZpZ1sxXSB8PSAocmV0LmNoYW5uZWxDb3VudCAmIDB4MEYpIDw8IDM7XG4gICAgaWYgKHJldC5vYmplY3RUeXBlID09PSA1KSB7XG4gICAgICBjb25maWdbMV0gfD0gKChleHRlbnNpb25TYW1wbGluZ0luZGV4ICYgMHgwRikgPj4+IDEpO1xuICAgICAgY29uZmlnWzJdID0gKGV4dGVuc2lvblNhbXBsaW5nSW5kZXggJiAweDAxKSA8PCA3O1xuICAgICAgLy8gZXh0ZW5kZWQgYXVkaW8gb2JqZWN0IHR5cGU6IGZvcmNlIHRvIDIgKExDLUFBQylcbiAgICAgIGNvbmZpZ1syXSB8PSAoMiA8PCAyKTtcbiAgICAgIGNvbmZpZ1szXSA9IDA7XG4gICAgfVxuICAgIHJldC5jb25maWcgPSBjb25maWdcbiAgICByZXR1cm4gcmV0XG4gIH1cblxuICBfcGFyc2VBQUNEYXRhIChjaHVuaykge1xuICAgIGxldCB0cmFjayA9IHRoaXMudHJhY2tzLmF1ZGlvVHJhY2tcbiAgICBpZiAoIXRyYWNrKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgbWV0YSA9IHRyYWNrLm1ldGFcblxuICAgIGlmICghbWV0YSkge1xuICAgICAgbWV0YSA9IG5ldyBBdWRpb1RyYWNrTWV0YSgpXG4gICAgfVxuXG4gICAgbGV0IGluZm8gPSB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgxKVswXVxuXG4gICAgY2h1bmsuZGF0YSA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KGNodW5rLmRhdGFzaXplIC0gMSlcblxuICAgIGxldCBmb3JtYXQgPSAoaW5mbyAmIDI0MCkgPj4+IDRcblxuICAgIHRyYWNrLmZvcm1hdCA9IGZvcm1hdFxuXG4gICAgaWYgKGZvcm1hdCAhPT0gMTApIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIG5ldyBFcnJvcihgaW52YWxpZCBhdWRpbyBmb3JtYXQ6ICR7Zm9ybWF0fWApKVxuICAgIH1cblxuICAgIGlmIChmb3JtYXQgPT09IDEwICYmICF0aGlzLl9oYXNBdWRpb1NlcXVlbmNlKSB7XG4gICAgICBtZXRhLnNhbXBsZVJhdGUgPSB0aGlzLl9zd2l0Y2hBdWRpb1NhbXBsaW5nRnJlcXVlbmN5KGluZm8pXG4gICAgICBtZXRhLnNhbXBsZVJhdGVJbmRleCA9IChpbmZvICYgMTIpID4+PiAyXG4gICAgICBtZXRhLmZyYW1lTGVudGggPSAoaW5mbyAmIDIpID4+PiAxXG4gICAgICBtZXRhLmNoYW5uZWxDb3VudCA9IGluZm8gJiAxXG4gICAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uID0gTWF0aC5mbG9vcigxMDI0IC8gbWV0YS5hdWRpb1NhbXBsZVJhdGUgKiBtZXRhLnRpbWVzY2FsZSlcbiAgICB9XG5cbiAgICBsZXQgYXVkaW9TYW1wbGVSYXRlID0gbWV0YS5hdWRpb1NhbXBsZVJhdGVcbiAgICBsZXQgYXVkaW9TYW1wbGVSYXRlSW5kZXggPSBtZXRhLnNhbXBsZVJhdGVJbmRleFxuICAgIGxldCByZWZTYW1wbGVEdXJhdGlvbiA9IG1ldGEucmVmU2FtcGxlRHVyYXRpb25cblxuICAgIGRlbGV0ZSBjaHVuay50YWdUeXBlXG4gICAgbGV0IHZhbGlkYXRlID0gdGhpcy5fZGF0YXNpemVWYWxpZGF0b3IoY2h1bmsuZGF0YXNpemUpXG5cbiAgICBpZiAoY2h1bmsuZGF0YVswXSA9PT0gMCkgeyAvLyBBQUMgU2VxdWVuY2UgSGVhZGVyXG4gICAgICBsZXQgYWFjSGVhZGVyID0gdGhpcy5fYWFjU2VxdWVuY2VIZWFkZXJQYXJzZXIoY2h1bmsuZGF0YSlcbiAgICAgIGF1ZGlvU2FtcGxlUmF0ZSA9IGFhY0hlYWRlci5hdWRpb3NhbXBsZXJhdGUgfHwgbWV0YS5hdWRpb1NhbXBsZVJhdGVcbiAgICAgIGF1ZGlvU2FtcGxlUmF0ZUluZGV4ID0gYWFjSGVhZGVyLnNhbXBsZVJhdGVJbmRleCB8fCBtZXRhLnNhbXBsZVJhdGVJbmRleFxuICAgICAgcmVmU2FtcGxlRHVyYXRpb24gPSBNYXRoLmZsb29yKDEwMjQgLyBhdWRpb1NhbXBsZVJhdGUgKiBtZXRhLnRpbWVzY2FsZSlcblxuICAgICAgbWV0YS5jaGFubmVsQ291bnQgPSBhYWNIZWFkZXIuY2hhbm5lbENvdW50XG4gICAgICBtZXRhLnNhbXBsZVJhdGUgPSBhdWRpb1NhbXBsZVJhdGVcbiAgICAgIG1ldGEuc2FtcGxlUmF0ZUluZGV4ID0gYXVkaW9TYW1wbGVSYXRlSW5kZXhcbiAgICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb24gPSByZWZTYW1wbGVEdXJhdGlvblxuICAgICAgbWV0YS5kdXJhdGlvbiA9IHRoaXMuX2NvbnRleHQubWVkaWFJbmZvLmR1cmF0aW9uICogbWV0YS50aW1lc2NhbGVcbiAgICAgIG1ldGEuY29uZmlnID0gYWFjSGVhZGVyLmNvbmZpZ1xuICAgICAgbWV0YS5vYmplY3RUeXBlID0gYWFjSGVhZGVyLm9iamVjdFR5cGU7XG5cbiAgICAgIGNvbnN0IGF1ZGlvTWVkaWEgPSB0aGlzLl9jb250ZXh0Lm1lZGlhSW5mby5hdWRpb1xuXG4gICAgICAvLyBmaWxsIGF1ZGlvIG1lZGlhIGluZm9cbiAgICAgIGF1ZGlvTWVkaWEuY29kZWMgPSBhYWNIZWFkZXIuY29kZWNcbiAgICAgIGF1ZGlvTWVkaWEuY2hhbm5lbENvdW50ID0gYWFjSGVhZGVyLmNoYW5uZWxDb3VudFxuICAgICAgYXVkaW9NZWRpYS5zYW1wbGVSYXRlID0gYXVkaW9TYW1wbGVSYXRlXG4gICAgICBhdWRpb01lZGlhLnNhbXBsZVJhdGVJbmRleCA9IGFhY0hlYWRlci5hdWRpb1NhbXBsZVJhdGVJbmRleFxuXG4gICAgICBpZiAodGhpcy5faGFzU2NyaXB0ICYmICF0aGlzLl9oYXNBdWRpb1NlcXVlbmNlKSB7XG4gICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAnYXVkaW8nKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9oYXNTY3JpcHQgJiYgdGhpcy5faGFzQXVkaW9TZXF1ZW5jZSkge1xuICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkFVRElPX01FVEFEQVRBX0NIQU5HRSlcbiAgICAgIH1cbiAgICAgIDtcbiAgICAgIHRoaXMuX2hhc0F1ZGlvU2VxdWVuY2UgPSB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIGNodW5rLmRhdGEgPSBjaHVuay5kYXRhLnNsaWNlKDEsIGNodW5rLmRhdGEubGVuZ3RoKVxuICAgICAgdHJhY2suc2FtcGxlcy5wdXNoKGNodW5rKVxuICAgIH1cbiAgICBpZiAoIXZhbGlkYXRlKSB7XG4gICAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcignVEFHIGxlbmd0aCBlcnJvciBhdCAnICsgY2h1bmsuZGF0YXNpemUpXG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCBlcnJvci5tZXNzYWdlKVxuICAgICAgdGhpcy5sb2dnZXIud2Fybih0aGlzLlRBRywgZXJyb3IubWVzc2FnZSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcGFyc2UgaGV2Yy9hdmMgdmlkZW8gZGF0YVxuICAgKiBAcGFyYW0gY2h1bmtcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9wYXJzZUhldmNEYXRhIChjaHVuaykge1xuICAgIC8vIGhlYWRlclxuICAgIGxldCBpbmZvID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMSlbMF1cbiAgICBjaHVuay5mcmFtZVR5cGUgPSAoaW5mbyAmIDB4ZjApID4+PiA0XG4gICAgY2h1bmsuaXNLZXlmcmFtZSA9IGNodW5rLmZyYW1lVHlwZSA9PT0gMVxuICAgIC8vIGxldCB0ZW1wQ29kZWNJRCA9IHRoaXMudHJhY2tzLnZpZGVvVHJhY2suY29kZWNJRFxuICAgIGxldCBjb2RlY0lEID0gaW5mbyAmIDB4MGZcbiAgICB0aGlzLnRyYWNrcy52aWRlb1RyYWNrLmNvZGVjSUQgPSBjb2RlY0lEXG5cbiAgICAvLyBoZXZj5ZKMYXZj55qEaGVhZGVy6Kej5p6Q5pa55byP5LiA5qC3XG4gICAgY2h1bmsuYXZjUGFja2V0VHlwZSA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDEpWzBdXG4gICAgY2h1bmsuY3RzID0gdGhpcy5sb2FkZXJCdWZmZXIudG9JbnQoMCwgMylcbiAgICB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgzKVxuXG4gICAgLy8gMTIgZm9yIGhldmMsIDcgZm9yIGF2Y1xuICAgIGlmIChjb2RlY0lEID09PSAxMikge1xuICAgICAgY29uc3QgZGF0YSA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KGNodW5rLmRhdGFzaXplIC0gNSlcbiAgICAgIGNodW5rLmRhdGEgPSBkYXRhXG5cbiAgICAgIGlmIChOdW1iZXIucGFyc2VJbnQoY2h1bmsuYXZjUGFja2V0VHlwZSkgIT09IDApIHtcbiAgICAgICAgaWYgKCF0aGlzLl9kYXRhc2l6ZVZhbGlkYXRvcihjaHVuay5kYXRhc2l6ZSkpIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKHRoaXMuVEFHLCBgaW52YWxpZCB2aWRlbyB0YWcgZGF0YXNpemU6ICR7Y2h1bmsuZGF0YXNpemV9YClcbiAgICAgICAgfVxuICAgICAgICBsZXQgbmFsdSA9IHt9XG4gICAgICAgIGxldCByID0gMFxuICAgICAgICBuYWx1LmN0cyA9IGNodW5rLmN0c1xuICAgICAgICBuYWx1LmR0cyA9IGNodW5rLmR0c1xuICAgICAgICB3aGlsZSAoY2h1bmsuZGF0YS5sZW5ndGggPiByKSB7XG4gICAgICAgICAgbGV0IHNpemVzID0gY2h1bmsuZGF0YS5zbGljZShOdW1iZXIucGFyc2VJbnQociksIDQgKyByKVxuICAgICAgICAgIG5hbHUuc2l6ZSA9IHNpemVzWzNdXG4gICAgICAgICAgbmFsdS5zaXplICs9IHNpemVzWzJdICogMjU2XG4gICAgICAgICAgbmFsdS5zaXplICs9IHNpemVzWzFdICogMjU2ICogMjU2XG4gICAgICAgICAgbmFsdS5zaXplICs9IHNpemVzWzBdICogMjU2ICogMjU2ICogMjU2XG4gICAgICAgICAgciArPSA0XG4gICAgICAgICAgbmFsdS5kYXRhID0gY2h1bmsuZGF0YS5zbGljZShOdW1iZXIucGFyc2VJbnQociksIG5hbHUuc2l6ZSArIHIpXG4gICAgICAgICAgciArPSBuYWx1LnNpemVcbiAgICAgICAgICB0aGlzLnRyYWNrcy52aWRlb1RyYWNrLnNhbXBsZXMucHVzaChuYWx1KVxuICAgICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAndmlkZW8nKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKE51bWJlci5wYXJzZUludChjaHVuay5hdmNQYWNrZXRUeXBlKSA9PT0gMCkge1xuICAgICAgICBpZiAoIXRoaXMuX2RhdGFzaXplVmFsaWRhdG9yKGNodW5rLmRhdGFzaXplKSkge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4odGhpcy5UQUcsIGBpbnZhbGlkIHZpZGVvIHRhZyBkYXRhc2l6ZTogJHtjaHVuay5kYXRhc2l6ZX1gKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAndmlkZW8nKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjb2RlY0lEID09PSA3KSB7XG4gICAgICBsZXQgZGF0YSA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KGNodW5rLmRhdGFzaXplIC0gNSlcbiAgICAgIGlmIChkYXRhWzRdID09PSAwICYmIGRhdGFbNV0gPT09IDAgJiYgZGF0YVs2XSA9PT0gMCAmJiBkYXRhWzddID09PSAxKSB7XG4gICAgICAgIGxldCBhdmNjbGVuZ3RoID0gMFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgIGF2Y2NsZW5ndGggPSBhdmNjbGVuZ3RoICogMjU2ICsgZGF0YVtpXVxuICAgICAgICB9XG4gICAgICAgIGF2Y2NsZW5ndGggLT0gNFxuICAgICAgICBkYXRhID0gZGF0YS5zbGljZSg0LCBkYXRhLmxlbmd0aClcbiAgICAgICAgZGF0YVszXSA9IGF2Y2NsZW5ndGggJSAyNTZcbiAgICAgICAgYXZjY2xlbmd0aCA9IChhdmNjbGVuZ3RoIC0gZGF0YVszXSkgLyAyNTZcbiAgICAgICAgZGF0YVsyXSA9IGF2Y2NsZW5ndGggJSAyNTZcbiAgICAgICAgYXZjY2xlbmd0aCA9IChhdmNjbGVuZ3RoIC0gZGF0YVsyXSkgLyAyNTZcbiAgICAgICAgZGF0YVsxXSA9IGF2Y2NsZW5ndGggJSAyNTZcbiAgICAgICAgZGF0YVswXSA9IChhdmNjbGVuZ3RoIC0gZGF0YVsxXSkgLyAyNTZcbiAgICAgIH1cblxuICAgICAgY2h1bmsuZGF0YSA9IGRhdGFcbiAgICAgIC8vIElmIGl0IGlzIEFWQyBzZXF1ZWNlIEhlYWRlci5cbiAgICAgIGlmIChjaHVuay5hdmNQYWNrZXRUeXBlID09PSAwKSB7XG4gICAgICAgIHRoaXMuX2F2Y1NlcXVlbmNlSGVhZGVyUGFyc2VyKGNodW5rLmRhdGEpXG4gICAgICAgIGxldCB2YWxpZGF0ZSA9IHRoaXMuX2RhdGFzaXplVmFsaWRhdG9yKGNodW5rLmRhdGFzaXplKVxuICAgICAgICBpZiAodmFsaWRhdGUpIHtcbiAgICAgICAgICBpZiAodGhpcy5faGFzU2NyaXB0ICYmICF0aGlzLl9oYXNWaWRlb1NlcXVlbmNlKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgJ3ZpZGVvJylcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2hhc1NjcmlwdCAmJiB0aGlzLl9oYXNWaWRlb1NlcXVlbmNlKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLlZJREVPX01FVEFEQVRBX0NIQU5HRSlcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5faGFzVmlkZW9TZXF1ZW5jZSA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCF0aGlzLl9kYXRhc2l6ZVZhbGlkYXRvcihjaHVuay5kYXRhc2l6ZSkpIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKHRoaXMuVEFHLCBgaW52YWxpZCB2aWRlbyB0YWcgZGF0YXNpemU6ICR7Y2h1bmsuZGF0YXNpemV9YClcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50cmFja3MudmlkZW9UcmFjay5zYW1wbGVzLnB1c2goY2h1bmspXG4gICAgICAgIC8vIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfQ09NUExFVEUpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubG9nZ2VyLndhcm4odGhpcy5UQUcsIGB2aWRlbyBjb2RlaWQgaXMgJHtjb2RlY0lEfWApXG4gICAgICBjaHVuay5kYXRhID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoY2h1bmsuZGF0YXNpemUgLSAxKVxuICAgICAgaWYgKCF0aGlzLl9kYXRhc2l6ZVZhbGlkYXRvcihjaHVuay5kYXRhc2l6ZSkpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIud2Fybih0aGlzLlRBRywgYGludmFsaWQgdmlkZW8gdGFnIGRhdGFzaXplOiAke2NodW5rLmRhdGFzaXplfWApXG4gICAgICB9XG4gICAgICB0aGlzLnRyYWNrcy52aWRlb1RyYWNrLnNhbXBsZXMucHVzaChjaHVuaylcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfQ09NUExFVEUpXG4gICAgfVxuICAgIGRlbGV0ZSBjaHVuay50YWdUeXBlXG4gIH1cblxuICAvKipcbiAgICogcGFyc2UgYXZjIG1ldGFkYXRhXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfYXZjU2VxdWVuY2VIZWFkZXJQYXJzZXIgKGRhdGEpIHtcbiAgICBsZXQgdHJhY2sgPSB0aGlzLnRyYWNrcy52aWRlb1RyYWNrXG5cbiAgICBpZiAoIXRyYWNrKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgb2Zmc2V0ID0gMFxuXG4gICAgaWYgKCF0cmFjay5tZXRhKSB7XG4gICAgICB0cmFjay5tZXRhID0gbmV3IFZpZGVvVHJhY2tNZXRhKClcbiAgICB9XG4gICAgbGV0IG1ldGEgPSB0cmFjay5tZXRhXG5cbiAgICBtZXRhLmNvbmZpZ3VyYXRpb25WZXJzaW9uID0gZGF0YVswXVxuICAgIG1ldGEuYXZjUHJvZmlsZUluZGljYXRpb24gPSBkYXRhWzFdXG4gICAgbWV0YS5wcm9maWxlQ29tcGF0aWJpbGl0eSA9IGRhdGFbMl1cbiAgICBtZXRhLmF2Y0xldmVsSW5kaWNhdGlvbiA9IGRhdGFbM10gLyAxMFxuICAgIG1ldGEubmFsVW5pdExlbmd0aCA9IChkYXRhWzRdICYgMHgwMykgKyAxXG5cbiAgICBsZXQgbnVtT2ZTcHMgPSBkYXRhWzVdICYgMHgxZlxuICAgIG9mZnNldCA9IDZcbiAgICBsZXQgY29uZmlnID0ge31cblxuICAgIC8vIHBhcnNlIFNQU1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtT2ZTcHM7IGkrKykge1xuICAgICAgbGV0IHNpemUgPSBkYXRhW29mZnNldF0gKiAyNTUgKyBkYXRhW29mZnNldCArIDFdXG4gICAgICBvZmZzZXQgKz0gMlxuXG4gICAgICBsZXQgc3BzID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSlcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgICAgIHNwc1tqXSA9IGRhdGFbb2Zmc2V0ICsgal1cbiAgICAgIH1cblxuICAgICAgLy8gY29kZWMgc3RyaW5nXG4gICAgICBsZXQgY29kZWNTdHJpbmcgPSAnYXZjMS4nXG4gICAgICBmb3IgKGxldCBqID0gMTsgaiA8IDQ7IGorKykge1xuICAgICAgICBsZXQgaCA9IHNwc1tqXS50b1N0cmluZygxNilcbiAgICAgICAgaWYgKGgubGVuZ3RoIDwgMikge1xuICAgICAgICAgIGggPSAnMCcgKyBoXG4gICAgICAgIH1cbiAgICAgICAgY29kZWNTdHJpbmcgKz0gaFxuICAgICAgfVxuXG4gICAgICBtZXRhLmNvZGVjID0gY29kZWNTdHJpbmdcblxuICAgICAgb2Zmc2V0ICs9IHNpemVcbiAgICAgIHRoaXMudHJhY2tzLnZpZGVvVHJhY2subWV0YS5zcHMgPSBzcHNcbiAgICAgIGNvbmZpZyA9IFNwc1BhcnNlci5wYXJzZVNQUyhzcHMpXG4gICAgfVxuXG4gICAgbGV0IG51bU9mUHBzID0gZGF0YVtvZmZzZXRdXG5cbiAgICBvZmZzZXQrK1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1PZlBwczsgaSsrKSB7XG4gICAgICBsZXQgc2l6ZSA9IGRhdGFbb2Zmc2V0XSAqIDI1NSArIGRhdGFbb2Zmc2V0ICsgMV1cbiAgICAgIG9mZnNldCArPSAyXG4gICAgICBsZXQgcHBzID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSlcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgICAgIHBwc1tqXSA9IGRhdGFbb2Zmc2V0ICsgal1cbiAgICAgIH1cbiAgICAgIG9mZnNldCArPSBzaXplXG4gICAgICB0aGlzLnRyYWNrcy52aWRlb1RyYWNrLm1ldGEucHBzID0gcHBzXG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbihtZXRhLCBTcHNQYXJzZXIudG9WaWRlb01ldGEoY29uZmlnKSlcblxuICAgIC8vIGZpbGwgdmlkZW8gbWVkaWEgaW5mb1xuICAgIGNvbnN0IHZpZGVvTWVkaWEgPSB0aGlzLl9jb250ZXh0Lm1lZGlhSW5mby52aWRlb1xuXG4gICAgdmlkZW9NZWRpYS5jb2RlYyA9IG1ldGEuY29kZWNcbiAgICB2aWRlb01lZGlhLnByb2ZpbGUgPSBtZXRhLnByb2ZpbGVcbiAgICB2aWRlb01lZGlhLmxldmVsID0gbWV0YS5sZXZlbFxuICAgIHZpZGVvTWVkaWEuY2hyb21hRm9ybWF0ID0gbWV0YS5jaHJvbWFGb3JtYXRcbiAgICB2aWRlb01lZGlhLmZyYW1lUmF0ZSA9IG1ldGEuZnJhbWVSYXRlXG4gICAgdmlkZW9NZWRpYS5wYXJSYXRpbyA9IG1ldGEucGFyUmF0aW9cbiAgICB2aWRlb01lZGlhLndpZHRoID0gdmlkZW9NZWRpYS53aWR0aCA9PT0gbWV0YS5wcmVzZW50V2lkdGggPyB2aWRlb01lZGlhLndpZHRoIDogbWV0YS5wcmVzZW50V2lkdGhcbiAgICB2aWRlb01lZGlhLmhlaWdodCA9IHZpZGVvTWVkaWEuaGVpZ2h0ID09PSBtZXRhLnByZXNlbnRIZWlnaHQgPyB2aWRlb01lZGlhLndpZHRoIDogbWV0YS5wcmVzZW50SGVpZ2h0XG5cbiAgICBtZXRhLmR1cmF0aW9uID0gdGhpcy5fY29udGV4dC5tZWRpYUluZm8uZHVyYXRpb24gKiBtZXRhLnRpbWVzY2FsZVxuICAgIG1ldGEuYXZjYyA9IG5ldyBVaW50OEFycmF5KGRhdGEubGVuZ3RoKVxuICAgIG1ldGEuYXZjYy5zZXQoZGF0YSlcbiAgICB0cmFjay5tZXRhID0gbWV0YVxuICB9XG5cbiAgLyoqXG4gICAqIGNob29zZSBhdWRpbyBzYW1wbGUgcmF0ZVxuICAgKiBAcGFyYW0gc2FtcGxpbmdGcmVxdWVuY3lJbmRleFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3N3aXRjaEF1ZGlvU2FtcGxlUmF0ZSAoc2FtcGxpbmdGcmVxdWVuY3lJbmRleCkge1xuICAgIGxldCBzYW1wbGluZ0ZyZXF1ZW5jeUxpc3QgPSBbOTYwMDAsIDg4MjAwLCA2NDAwMCwgNDgwMDAsIDQ0MTAwLCAzMjAwMCwgMjQwMDAsIDIyMDUwLCAxNjAwMCwgMTIwMDAsIDExMDI1LCA4MDAwLCA3MzUwXVxuICAgIHJldHVybiBzYW1wbGluZ0ZyZXF1ZW5jeUxpc3Rbc2FtcGxpbmdGcmVxdWVuY3lJbmRleF1cbiAgfVxuXG4gIC8qKlxuICAgKiBjaG9vc2UgYXVkaW8gc2FtcGxpbmcgZnJlcXVlbmNlXG4gICAqIEBwYXJhbSBpbmZvXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc3dpdGNoQXVkaW9TYW1wbGluZ0ZyZXF1ZW5jeSAoaW5mbykge1xuICAgIGxldCBzYW1wbGluZ0ZyZXF1ZW5jeUluZGV4ID0gKGluZm8gJiAxMikgPj4+IDJcbiAgICBsZXQgc2FtcGxpbmdGcmVxdWVuY3lMaXN0ID0gWzU1MDAsIDExMDI1LCAyMjA1MCwgNDQxMDAsIDQ4MDAwXVxuICAgIHJldHVybiBzYW1wbGluZ0ZyZXF1ZW5jeUxpc3Rbc2FtcGxpbmdGcmVxdWVuY3lJbmRleF1cbiAgfVxuXG4gIC8qKlxuICAgKiBjaG9vc2UgYXVkaW8gY2hhbm5lbCBjb3VudFxuICAgKiBAcGFyYW0gaW5mb1xuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3N3aXRjaEF1ZGlvQ2hhbm5lbCAoaW5mbykge1xuICAgIGxldCBzYW1wbGVUcmFja051bUluZGV4ID0gaW5mbyAmIDFcbiAgICBsZXQgc2FtcGxlVHJhY2tOdW1MaXN0ID0gWzEsIDJdXG4gICAgcmV0dXJuIHNhbXBsZVRyYWNrTnVtTGlzdFtzYW1wbGVUcmFja051bUluZGV4XVxuICB9XG5cbiAgLyoqXG4gICAqIGNoZWNrIGRhdGFzaXplIGlzIHZhbGlkIHVzZSA0IEJ5dGUgYWZ0ZXIgY3VycmVudCB0YWdcbiAgICogQHBhcmFtIGRhdGFzaXplXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2RhdGFzaXplVmFsaWRhdG9yIChkYXRhc2l6ZSkge1xuICAgIGxldCBkYXRhc2l6ZUNvbmZpcm0gPSB0aGlzLmxvYWRlckJ1ZmZlci50b0ludCgwLCA0KVxuICAgIHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDQpXG4gICAgcmV0dXJuIGRhdGFzaXplQ29uZmlybSA9PT0gZGF0YXNpemUgKyAxMVxuICB9XG5cbiAgZ2V0IGxvYWRlckJ1ZmZlciAoKSB7XG4gICAgaWYgKHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ0xPQURFUl9CVUZGRVInKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ0xPQURFUl9CVUZGRVInKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCBuZXcgRXJyb3IoJ+aJvuS4jeWIsCBsb2FkZXJCdWZmZXIg5a6e5L6LJykpXG4gICAgfVxuICB9XG5cbiAgZ2V0IHRyYWNrcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpXG4gIH1cblxuICBnZXQgbG9nZ2VyICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnTE9HR0VSJylcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBGbHZEZW11eGVyXG4iLCIvKipcbiAqIFJlZmVyZW5jZTogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzgyMTYjc2VjdGlvbi00LjNcbiAqL1xuY2xhc3MgTTNVOFBhcnNlciB7XG4gIHN0YXRpYyBwYXJzZSAodGV4dCwgYmFzZXVybCA9ICcnKSB7XG4gICAgbGV0IHJldCA9IHtcbiAgICAgIGR1cmF0aW9uOiAwXG4gICAgfTtcbiAgICBpZiAoIXRleHQgfHwgIXRleHQuc3BsaXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHJlZnMgPSB0ZXh0LnNwbGl0KC9cXHJ8XFxuLyk7XG4gICAgcmVmcyA9IHJlZnMuZmlsdGVyKChyZWYpID0+IHtcbiAgICAgIHJldHVybiByZWY7XG4gICAgfSlcbiAgICBsZXQgcmVmID0gcmVmcy5zaGlmdCgpXG4gICAgaWYgKCFyZWYubWF0Y2goJyNFWFRNM1UnKSkge1xuICAgICAgLy8gVE9ETzpNM1XmoLzlvI/plJnor6/jgIJcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZWYgPSByZWZzLnNoaWZ0KClcbiAgICB3aGlsZSAocmVmKSB7XG4gICAgICBsZXQgcmVmbSA9IHJlZi5tYXRjaCgvIyguKik6KC4qKS8pO1xuICAgICAgaWYgKHJlZm0gJiYgcmVmbS5sZW5ndGggPiAyKSB7XG4gICAgICAgIHN3aXRjaCAocmVmbVsxXSkge1xuICAgICAgICAgIGNhc2UgJ0VYVC1YLVZFUlNJT04nOlxuICAgICAgICAgICAgcmV0LnZlcnNpb24gPSBwYXJzZUludChyZWZtWzJdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ0VYVC1YLU1FRElBLVNFUVVFTkNFJzpcbiAgICAgICAgICAgIHJldC5zZXF1ZW5jZSA9IHBhcnNlSW50KHJlZm1bMl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnRVhULVgtVEFSR0VURFVSQVRJT04nOlxuICAgICAgICAgICAgcmV0LnRhcmdldGR1cmF0aW9uID0gcGFyc2VGbG9hdChyZWZtWzJdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ0VYVElORic6XG4gICAgICAgICAgICBNM1U4UGFyc2VyLnBhcnNlRnJhZyhyZWZtLCByZWZzLCByZXQsIGJhc2V1cmwpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZWYgPSByZWZzLnNoaWZ0KClcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZUZyYWcgKHJlZm0sIHJlZnMsIHJldCwgYmFzZXVybCkge1xuICAgIGlmICghcmV0LmZyYWdzKSB7XG4gICAgICByZXQuZnJhZ3MgPSBbXVxuICAgIH1cblxuICAgIGxldCBmcmVnID0ge1xuICAgICAgc3RhcnQ6IHJldC5kdXJhdGlvbixcbiAgICAgIGR1cmF0aW9uOiBwYXJzZUZsb2F0KHJlZm1bMl0pICogMTAwMFxuICAgIH1cblxuICAgIHJldC5kdXJhdGlvbiArPSBmcmVnLmR1cmF0aW9uO1xuICAgIGxldCBuZXh0bGluZSA9IHJlZnMuc2hpZnQoKTtcbiAgICBpZiAobmV4dGxpbmUubWF0Y2goLyMoLiopOiguKikvKSkge1xuICAgICAgbmV4dGxpbmUgPSByZWZzLnNoaWZ0KCk7XG4gICAgfVxuICAgIGlmIChuZXh0bGluZS5sZW5ndGggPiAwICYmIG5leHRsaW5lLmNoYXJBdCgwKSA9PT0gJy8nICYmIGJhc2V1cmwubWF0Y2goLy4qXFwvXFwvLipcXC5cXHcrL2cpKSB7XG4gICAgICBiYXNldXJsID0gYmFzZXVybC5tYXRjaCgvLipcXC9cXC8uKlxcLlxcdysvZylbMF07XG4gICAgfVxuICAgIGlmIChuZXh0bGluZS5tYXRjaCgvLio6XFwvXFwvLiovKSkge1xuICAgICAgZnJlZy51cmwgPSBuZXh0bGluZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnJlZy51cmwgPSBiYXNldXJsICsgbmV4dGxpbmU7XG4gICAgfVxuICAgIFxuICAgIHJldC5mcmFncy5wdXNoKGZyZWcpO1xuICB9XG5cbiAgc3RhdGljIHBhcnNlVVJMICh1cmwpIHtcbiAgICBsZXQgYmFzZXVybCA9ICcnO1xuICAgIGxldCB1cmxzID0gdXJsLm1hdGNoKC8oLipcXC8pLipcXC5tM3U4Lyk7XG4gICAgaWYgKHVybHMgJiYgdXJscy5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHVybHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHVybHNbaV0ubWF0Y2goLy4qXFwvJC9nKSAmJiB1cmxzW2ldLmxlbmd0aCA+IGJhc2V1cmwubGVuZ3RoKSB7XG4gICAgICAgICAgYmFzZXVybCA9IHVybHNbaV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGJhc2V1cmw7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTTNVOFBhcnNlcjtcbiIsImltcG9ydCB7IE5hbHVuaXQgfSBmcm9tICd4Z3BsYXllci1jb2RlYyc7XG5pbXBvcnQgeyBBdWRpb1RyYWNrLCBWaWRlb1RyYWNrIH0gZnJvbSAneGdwbGF5ZXItYnVmZmVyJztcbmltcG9ydCB7XG4gIEF1ZGlvVHJhY2tNZXRhLFxuICBWaWRlb1RyYWNrTWV0YSxcbiAgQXVkaW9UcmFja1NhbXBsZSxcbiAgVmlkZW9UcmFja1NhbXBsZSxcbiAgRVZFTlRTLFxuICBTdHJlYW1cbn0gZnJvbSAneGdwbGF5ZXItdXRpbHMnO1xuXG5jb25zdCBERU1VWF9FVkVOVFMgPSBFVkVOVFMuREVNVVhfRVZFTlRTO1xuY29uc3QgU3RyZWFtVHlwZSA9IHtcbiAgMHgwMTogWyd2aWRlbycsICdNUEVHLTEnXSxcbiAgMHgwMjogWyd2aWRlbycsICdNUEVHLTInXSxcbiAgMHgxYjogWyd2aWRlbycsICdBVkMuSDI2NCddLFxuICAweGVhOiBbJ3ZpZGVvJywgJ1ZDLTEnXSxcbiAgMHgwMzogWydhdWRpbycsICdNUEVHLTEnXSxcbiAgMHgwNDogWydhdWRpbycsICdNUEVHLTInXSxcbiAgMHgwZjogWydhdWRpbycsICdNUEVHLTIuQUFDJ10sXG4gIDB4MTE6IFsnYXVkaW8nLCAnTVBFRy00LkFBQyddLFxuICAweDgwOiBbJ2F1ZGlvJywgJ0xQQ00nXSxcbiAgMHg4MTogWydhdWRpbycsICdBQzMnXSxcbiAgMHgwNjogWydhdWRpbycsICdBQzMnXSxcbiAgMHg4MjogWydhdWRpbycsICdEVFMnXSxcbiAgMHg4MzogWydhdWRpbycsICdEb2xieSBUcnVlSEQnXSxcbiAgMHg4NDogWydhdWRpbycsICdBQzMtUGx1cyddLFxuICAweDg1OiBbJ2F1ZGlvJywgJ0RUUy1IRCddLFxuICAweDg2OiBbJ2F1ZGlvJywgJ0RUUy1NQSddLFxuICAweGExOiBbJ2F1ZGlvJywgJ0FDMy1QbHVzLVNFQyddLFxuICAweGEyOiBbJ2F1ZGlvJywgJ0RUUy1IRC1TRUMnXVxufTtcblxuY2xhc3MgVHNEZW11eGVyIHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZ3MpIHtcbiAgICB0aGlzLmNvbmZpZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWdzKTtcbiAgICB0aGlzLmRlbXV4aW5nID0gZmFsc2U7XG4gICAgdGhpcy5wYXQgPSBbXTtcbiAgICB0aGlzLnBtdCA9IFtdO1xuICAgIHRoaXMuX2hhc1ZpZGVvTWV0YSA9IGZhbHNlO1xuICAgIHRoaXMuX2hhc0F1ZGlvTWV0YSA9IGZhbHNlO1xuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgdGhpcy5vbihERU1VWF9FVkVOVFMuREVNVVhfU1RBUlQsIHRoaXMuZGVtdXguYmluZCh0aGlzKSlcbiAgfVxuXG4gIGRlbXV4ICgpIHtcbiAgICBpZiAodGhpcy5kZW11eGluZykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IGJ1ZmZlciA9IHRoaXMuaW5wdXRCdWZmZXI7XG4gICAgbGV0IGZyYWdzID0geyBwYXQ6IFtdLCBwbXQ6IFtdIH07XG4gICAgbGV0IHBlc2VzID0ge307XG5cbiAgICAvLyBSZWFkIFRTIHNlZ21lbnRcbiAgICB3aGlsZSAoYnVmZmVyLmxlbmd0aCA+PSAxODgpIHtcbiAgICAgIHdoaWxlIChidWZmZXIubGVuZ3RoID49IDEgJiYgYnVmZmVyLmFycmF5WzBdW2J1ZmZlci5vZmZzZXRdICE9PSA3MSkge1xuICAgICAgICBidWZmZXIuc2hpZnQoMSk7XG4gICAgICB9XG4gICAgICBsZXQgYnVmID0gYnVmZmVyLnNoaWZ0KDE4OCk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhidWYpO1xuICAgICAgbGV0IHRzU3RyZWFtID0gbmV3IFN0cmVhbShidWYuYnVmZmVyKTtcbiAgICAgIGxldCB0cyA9IHt9O1xuICAgICAgVHNEZW11eGVyLnJlYWQodHNTdHJlYW0sIHRzLCBmcmFncyk7XG4gICAgICBpZiAodHMucGVzKSB7XG4gICAgICAgIGlmICghcGVzZXNbdHMuaGVhZGVyLnBpZF0pIHtcbiAgICAgICAgICBwZXNlc1t0cy5oZWFkZXIucGlkXSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHBlc2VzW3RzLmhlYWRlci5waWRdLnB1c2godHMucGVzKTtcbiAgICAgICAgdHMucGVzLkVTLmJ1ZmZlciA9IFt0cy5wZXMuRVMuYnVmZmVyXTtcbiAgICAgIH0gZWxzZSBpZiAocGVzZXNbdHMuaGVhZGVyLnBpZF0pIHtcbiAgICAgICAgcGVzZXNbdHMuaGVhZGVyLnBpZF1bcGVzZXNbdHMuaGVhZGVyLnBpZF0ubGVuZ3RoIC0gMV0uRVMuYnVmZmVyLnB1c2godHMucGF5bG9hZC5zdHJlYW0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEdldCBGcmFtZXMgZGF0YVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgT2JqZWN0LmtleXMocGVzZXMpLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgZXBlc2VzID0gcGVzZXNbT2JqZWN0LmtleXMocGVzZXMpW2ldXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZXBlc2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGVwZXNlc1tqXS5pZCA9IE9iamVjdC5rZXlzKHBlc2VzKVtpXTtcbiAgICAgICAgZXBlc2VzW2pdLkVTLmJ1ZmZlciA9IFRzRGVtdXhlci5NZXJnZShlcGVzZXNbal0uRVMuYnVmZmVyKTtcbiAgICAgICAgaWYgKGVwZXNlc1tqXS50eXBlID09PSAnYXVkaW8nKSB7XG4gICAgICAgICAgdGhpcy5wdXNoQXVkaW9TYW1wbGUoZXBlc2VzW2pdKTtcbiAgICAgICAgfSBlbHNlIGlmIChlcGVzZXNbal0udHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgIHRoaXMucHVzaFZpZGVvU2FtcGxlKGVwZXNlc1tqXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5faGFzQXVkaW9NZXRhKSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0NPTVBMRVRFLCAnYXVkaW8nKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2hhc1ZpZGVvTWV0YSkge1xuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9DT01QTEVURSwgJ3ZpZGVvJyk7XG4gICAgfVxuICB9XG5cbiAgcHVzaEF1ZGlvU2FtcGxlIChwZXMpIHtcbiAgICBsZXQgdHJhY2s7XG4gICAgaWYgKCF0aGlzLl90cmFja3MuYXVkaW9UcmFjaykge1xuICAgICAgdGhpcy5fdHJhY2tzLmF1ZGlvVHJhY2sgPSBuZXcgQXVkaW9UcmFjaygpO1xuICAgICAgdHJhY2sgPSB0aGlzLl90cmFja3MuYXVkaW9UcmFjaztcbiAgICAgIHRyYWNrLm1ldGEgPSBuZXcgQXVkaW9UcmFja01ldGEoe1xuICAgICAgICBhdWRpb1NhbXBsZVJhdGU6IHBlcy5FUy5mcmVxdWVuY2UsXG4gICAgICAgIHNhbXBsZVJhdGU6IHBlcy5FUy5mcmVxdWVuY2UsXG4gICAgICAgIGNoYW5uZWxDb3VudDogcGVzLkVTLmNoYW5uZWwsXG4gICAgICAgIGNvZGVjOiAnbXA0YS40MC4nICsgcGVzLkVTLmF1ZGlvT2JqZWN0VHlwZSxcbiAgICAgICAgY29uZmlnOiBwZXMuRVMuYXVkaW9Db25maWcsXG4gICAgICAgIGlkOiAyLFxuICAgICAgICBzYW1wbGVSYXRlSW5kZXg6IHBlcy5FUy5mcmVxdWVuY3lJbmRleFxuICAgICAgfSk7XG4gICAgICB0cmFjay5tZXRhLnJlZlNhbXBsZUR1cmF0aW9uID0gTWF0aC5mbG9vcigxMDI0IC8gdHJhY2subWV0YS5hdWRpb1NhbXBsZVJhdGUgKiB0cmFjay5tZXRhLnRpbWVzY2FsZSk7XG4gICAgICBpZiAoIXRoaXMuX2hhc0F1ZGlvTWV0YSkge1xuICAgICAgICB0aGlzLl9oYXNBdWRpb01ldGEgPSB0cnVlXG4gICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAnYXVkaW8nKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdHJhY2sgPSB0aGlzLl90cmFja3MuYXVkaW9UcmFjaztcbiAgICB9XG4gICAgbGV0IGRhdGEgPSBuZXcgVWludDhBcnJheShwZXMuRVMuYnVmZmVyLmJ1ZmZlci5zbGljZShwZXMuRVMuYnVmZmVyLnBvc2l0aW9uLCBwZXMuRVMuYnVmZmVyLmxlbmd0aCkpO1xuICAgIGxldCBkdHMgPSBwYXJzZUludChwZXMucHRzIC8gOTApO1xuICAgIGxldCBwdHMgPSBwYXJzZUludChwZXMucHRzIC8gOTApO1xuICAgIGxldCBzYW1wbGUgPSBuZXcgQXVkaW9UcmFja1NhbXBsZSh7ZHRzLCBwdHMsIGRhdGF9KTtcbiAgICB0cmFjay5zYW1wbGVzLnB1c2goc2FtcGxlKTtcbiAgfVxuXG4gIHB1c2hWaWRlb1NhbXBsZSAocGVzKSB7XG4gICAgbGV0IG5hbHMgPSBOYWx1bml0LmdldE5hbHVuaXRzKHBlcy5FUy5idWZmZXIpO1xuICAgIGxldCB0cmFjaztcbiAgICBpZiAoIXRoaXMuX3RyYWNrcy52aWRlb1RyYWNrKSB7XG4gICAgICB0aGlzLl90cmFja3MudmlkZW9UcmFjayA9IG5ldyBWaWRlb1RyYWNrKCk7XG4gICAgICB0cmFjayA9IHRoaXMuX3RyYWNrcy52aWRlb1RyYWNrO1xuICAgICAgdHJhY2subWV0YSA9IG5ldyBWaWRlb1RyYWNrTWV0YSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cmFjayA9IHRoaXMuX3RyYWNrcy52aWRlb1RyYWNrO1xuICAgIH1cbiAgICBsZXQgc2FtcGxlTGVuZ3RoID0gMDtcbiAgICBsZXQgc3BzID0gZmFsc2U7XG4gICAgbGV0IHBwcyA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmFscy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IG5hbCA9IG5hbHNbaV07XG4gICAgICBpZiAobmFsLnNwcykge1xuICAgICAgICAvLyBUT0RP77yaVmlkZW9UcmFja+S/oeaBryDlkowgTWV0YSDkv6Hmga9cbiAgICAgICAgaWYgKHRyYWNrLnNwcyAmJiBUc0RlbXV4ZXIuY29tcGFpcmVVaW50OChuYWwuYm9keSwgdHJhY2suc3BzKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgc3BzID0gbmFsO1xuICAgICAgICB0cmFjay5zcHMgPSBuYWwuYm9keTtcbiAgICAgICAgdHJhY2subWV0YS5jaHJvbWFGb3JtYXQgPSBzcHMuc3BzLmNocm9tYV9mb3JtYXRcbiAgICAgICAgdHJhY2subWV0YS5jb2RlYyA9ICdhdmMxLic7XG4gICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgNDsgaisrKSB7XG4gICAgICAgICAgdmFyIGggPSBzcHMuYm9keVtqXS50b1N0cmluZygxNik7XG4gICAgICAgICAgaWYgKGgubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgaCA9ICcwJyArIGg7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRyYWNrLm1ldGEuY29kZWMgKz0gaDtcbiAgICAgICAgfVxuICAgICAgICB0cmFjay5tZXRhLmNvZGVjSGVpZ2h0ID0gc3BzLnNwcy5jb2RlY19zaXplLmhlaWdodDtcbiAgICAgICAgdHJhY2subWV0YS5jb2RlY1dpZHRoID0gc3BzLnNwcy5jb2RlY19zaXplLndpZHRoO1xuICAgICAgICB0cmFjay5tZXRhLmZyYW1lUmF0ZSA9IHNwcy5zcHMuZnJhbWVfcmF0ZTtcbiAgICAgICAgdHJhY2subWV0YS5pZCA9IDE7XG4gICAgICAgIHRyYWNrLm1ldGEubGV2ZWwgPSBzcHMuc3BzLmxldmVsX3N0cmluZztcbiAgICAgICAgdHJhY2subWV0YS5wcmVzZW50SGVpZ2h0ID0gc3BzLnNwcy5wcmVzZW50X3NpemUuaGVpZ2h0O1xuICAgICAgICB0cmFjay5tZXRhLnByZXNlbnRXaWR0aCA9IHNwcy5zcHMucHJlc2VudF9zaXplLndpZHRoO1xuICAgICAgICB0cmFjay5tZXRhLnByb2ZpbGUgPSBzcHMuc3BzLnByb2ZpbGVfc3RyaW5nO1xuICAgICAgICB0cmFjay5tZXRhLnJlZlNhbXBsZUR1cmF0aW9uID0gTWF0aC5mbG9vcih0cmFjay5tZXRhLnRpbWVzY2FsZSAqIChzcHMuc3BzLmZyYW1lX3JhdGUuZnBzX2RlbiAvIHNwcy5zcHMuZnJhbWVfcmF0ZS5mcHNfbnVtKSk7XG4gICAgICAgIHRyYWNrLm1ldGEuc2FyUmF0aW8gPSBzcHMuc3BzLnNhcl9yYXRpbyA/IHNwcy5zcHMuc2FyX3JhdGlvIDogc3BzLnNwcy5wYXJfcmF0aW87XG4gICAgICB9IGVsc2UgaWYgKG5hbC5wcHMpIHtcbiAgICAgICAgdHJhY2sucHBzID0gbmFsLmJvZHk7XG4gICAgICAgIHBwcyA9IG5hbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNhbXBsZUxlbmd0aCArPSAoNCArIG5hbC5ib2R5LmJ5dGVMZW5ndGgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzcHMgJiYgcHBzKSB7XG4gICAgICB0cmFjay5tZXRhLmF2Y2MgPSBOYWx1bml0LmdldEF2Y2Moc3BzLmJvZHksIHBwcy5ib2R5KTtcbiAgICAgIGlmICghdGhpcy5faGFzVmlkZW9NZXRhKSB7XG4gICAgICAgIHRoaXMuX2hhc1ZpZGVvTWV0YSA9IHRydWVcbiAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICd2aWRlbycpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBkYXRhID0gbmV3IFVpbnQ4QXJyYXkoc2FtcGxlTGVuZ3RoKTtcbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICBsZXQgaXNLZXlmcmFtZSA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmFscy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IG5hbCA9IG5hbHNbaV07XG4gICAgICBsZXQgbGVuZ3RoID0gbmFsLmJvZHkuYnl0ZUxlbmd0aDtcbiAgICAgIGlmIChuYWwuaWRyKSB7XG4gICAgICAgIGlzS2V5ZnJhbWUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKCFuYWwucHBzICYmICFuYWwuc3BzKSB7XG4gICAgICAgIGRhdGEuc2V0KG5ldyBVaW50OEFycmF5KFtsZW5ndGggPj4+IDI0ICYgMHhmZixcbiAgICAgICAgICBsZW5ndGggPj4+IDE2ICYgMHhmZixcbiAgICAgICAgICBsZW5ndGggPj4+IDggJiAweGZmLFxuICAgICAgICAgIGxlbmd0aCAmIDB4ZmZcbiAgICAgICAgXSksIG9mZnNldCk7XG4gICAgICAgIG9mZnNldCArPSA0O1xuICAgICAgICBkYXRhLnNldChuYWwuYm9keSwgb2Zmc2V0KTtcbiAgICAgICAgb2Zmc2V0ICs9IGxlbmd0aDtcbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IHNhbXBsZSA9IG5ldyBWaWRlb1RyYWNrU2FtcGxlKHtcbiAgICAgIGR0czogcGFyc2VJbnQocGVzLmR0cyAvIDkwKSxcbiAgICAgIHB0czogcGFyc2VJbnQocGVzLnB0cyAvIDkwKSxcbiAgICAgIGN0czogKHBlcy5wdHMgLSBwZXMuZHRzKSAvIDkwLFxuICAgICAgb3JpZ2luRHRzOiBwZXMuZHRzLFxuICAgICAgaXNLZXlmcmFtZSxcbiAgICAgIGRhdGFcbiAgICB9KVxuICAgIHRyYWNrLnNhbXBsZXMucHVzaChzYW1wbGUpO1xuICB9XG5cbiAgZGVzdG9yeSAoKSB7XG4gICAgdGhpcy5vZmYoREVNVVhfRVZFTlRTLkRFTVVYX1NUQVJULCB0aGlzLmRlbXV4KTtcbiAgICB0aGlzLmNvbmZpZ3MgPSB7fTtcbiAgICB0aGlzLmRlbXV4aW5nID0gZmFsc2U7XG4gICAgdGhpcy5wYXQgPSBbXTtcbiAgICB0aGlzLnBtdCA9IFtdO1xuICAgIHRoaXMuX2hhc1ZpZGVvTWV0YSA9IGZhbHNlO1xuICAgIHRoaXMuX2hhc0F1ZGlvTWV0YSA9IGZhbHNlO1xuICB9XG5cbiAgc3RhdGljIGNvbXBhaXJlVWludDggKGEsIGIpIHtcbiAgICBpZiAoYS5ieXRlTGVuZ3RoICE9PSBiLmJ5dGVMZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgbGV0IHJldCA9IHRydWU7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmJ5dGVMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgICAgcmV0ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cbiAgc3RhdGljIE1lcmdlIChidWZmZXJzKSB7XG4gICAgbGV0IGRhdGE7XG4gICAgbGV0IGxlbmd0aCA9IDA7XG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBidWZmZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZW5ndGggKz0gKGJ1ZmZlcnNbaV0ubGVuZ3RoIC0gYnVmZmVyc1tpXS5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgZGF0YSA9IG5ldyBVaW50OEFycmF5KGxlbmd0aCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBidWZmZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYnVmZmVyID0gYnVmZmVyc1tpXTtcbiAgICAgIGRhdGEuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZmZlci5idWZmZXIsIGJ1ZmZlci5wb3NpdGlvbiksIG9mZnNldCk7XG4gICAgICBvZmZzZXQgKz0gYnVmZmVyLmxlbmd0aCAtIGJ1ZmZlci5wb3NpdGlvbjtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBTdHJlYW0oZGF0YS5idWZmZXIpO1xuICB9XG5cbiAgc3RhdGljIHJlYWQgKHN0cmVhbSwgdHMsIGZyYWdzKSB7XG4gICAgVHNEZW11eGVyLnJlYWRIZWFkZXIoc3RyZWFtLCB0cyk7XG4gICAgVHNEZW11eGVyLnJlYWRQYXlsb2FkKHN0cmVhbSwgdHMsIGZyYWdzKTtcbiAgICBpZiAodHMuaGVhZGVyLnBhY2tldCA9PT0gJ01FRElBJyAmJiB0cy5oZWFkZXIucGF5bG9hZCA9PT0gMSAmJiAhdHMudW5rbm93blBJRHMpIHtcbiAgICAgIHRzLnBlcyA9IFRzRGVtdXhlci5QRVModHMpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyByZWFkUGF5bG9hZCAoc3RyZWFtLCB0cywgZnJhZ3MpIHtcbiAgICBsZXQgaGVhZGVyID0gdHMuaGVhZGVyXG4gICAgbGV0IHBpZCA9IGhlYWRlci5waWQ7XG4gICAgc3dpdGNoIChwaWQpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgVHNEZW11eGVyLlBBVChzdHJlYW0sIHRzLCBmcmFncyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxOlxuICAgICAgICBUc0RlbXV4ZXIuQ0FUKHN0cmVhbSwgdHMsIGZyYWdzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIFRzRGVtdXhlci5UU0RUKHN0cmVhbSwgdHMsIGZyYWdzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDB4MWZmZjpcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBUT0RPOiBzb21l55qE5YaZ5rOV5LiN5aSq5aW977yM5b6X5pS5XG4gICAgICAgIGlmIChmcmFncy5wYXQuc29tZSgoaXRlbSkgPT4geyByZXR1cm4gaXRlbS5waWQgPT09IHBpZDsgfSkpIHtcbiAgICAgICAgICBUc0RlbXV4ZXIuUE1UKHN0cmVhbSwgdHMsIGZyYWdzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgc3RzID0gZnJhZ3MucG10ID8gZnJhZ3MucG10LmZpbHRlcigoaXRlbSkgPT4gaXRlbS5waWQgPT09IHBpZCkgOiBbXTtcbiAgICAgICAgICBpZiAoc3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIFRzRGVtdXhlci5NZWRpYShzdHJlYW0sIHRzLCBTdHJlYW1UeXBlW3N0c1swXS5zdHJlYW1UeXBlXVswXSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHMudW5rbm93blBJRHMgPSB0cnVlO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgcmVhZEhlYWRlciAoc3RyZWFtLCB0cykge1xuICAgIGxldCBoZWFkZXIgPSB7fTtcbiAgICBoZWFkZXIuc3luYyA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICBsZXQgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgaGVhZGVyLmVycm9yID0gbmV4dCA+Pj4gMTU7XG4gICAgaGVhZGVyLnBheWxvYWQgPSBuZXh0ID4+PiAxNCAmIDE7XG4gICAgaGVhZGVyLnByaW9yaXR5ID0gbmV4dCA+Pj4gMTMgJiAxO1xuICAgIGhlYWRlci5waWQgPSBuZXh0ICYgMHgxZmZmO1xuXG4gICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDgoKTtcblxuICAgIGhlYWRlci5zY3JhbWJsaW5nID0gbmV4dCA+PiA2ICYgMHgzOyAvLyDmmK/lkKbliqDlr4bvvIwwMOihqOekuuS4jeWKoOWvhlxuXG4gICAgLyoqXG4gICAgICogMDAgSVNPL0lFQ+acquadpeS9v+eUqOS/neeVmVxuICAgICAqIDAxIOayoeacieiwg+aVtOWtl+aute+8jOS7heWQq+aciTE4NELmnInmlYjlh4DojbdcbiAgICAgKiAwMiDmsqHmnInmnInmlYjlh4DojbfvvIzku4XlkKvmnIkxODNC6LCD5pW05a2X5q61XG4gICAgICogMDMgMH4xODJC6LCD5pW05a2X5q615ZCO5Li65pyJ5pWI5YeA6I23XG4gICAgICovXG4gICAgaGVhZGVyLmFkYXB0YXRpb24gPSBuZXh0ID4+IDQgJiAweDM7XG4gICAgaGVhZGVyLmNvbnRpbnVpdHkgPSBuZXh0ICYgMTU7XG4gICAgaGVhZGVyLnBhY2tldCA9IGhlYWRlci5waWQgPT09IDAgPyAnUEFUJyA6ICdNRURJQSc7XG4gICAgdHMuaGVhZGVyID0gaGVhZGVyO1xuICB9XG5cbiAgc3RhdGljIFBBVCAoc3RyZWFtLCB0cywgZnJhZ3MpIHtcbiAgICBsZXQgcmV0ID0ge307XG4gICAgbGV0IG5leHQgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgc3RyZWFtLnNraXAobmV4dCk7XG4gICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICByZXQudGFiZWxJRCA9IG5leHQ7XG4gICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgcmV0LmVycm9yID0gbmV4dCA+Pj4gNztcbiAgICByZXQuemVybyA9IG5leHQgPj4+IDYgJiAxO1xuICAgIHJldC5zZWN0aW9uTGVuZ3RoID0gbmV4dCAmIDB4ZmZmO1xuICAgIHJldC5zdHJlYW1JRCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgcmV0LmN1cnJlbnQgPSBzdHJlYW0ucmVhZFVpbnQ4KCkgJiAxO1xuICAgIHJldC5zZWN0aW9uTnVtYmVyID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHJldC5sYXN0U2VjdGlvbk51bWJlciA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICBsZXQgTiA9IChyZXQuc2VjdGlvbkxlbmd0aCAtIDkpIC8gNDtcbiAgICBsZXQgbGlzdCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTjsgaSsrKSB7XG4gICAgICBsZXQgcHJvZ3JhbU51bWJlciA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgICBsZXQgcGlkID0gc3RyZWFtLnJlYWRVaW50MTYoKSAmIDB4MWZmZjtcbiAgICAgIGxpc3QucHVzaCh7XG4gICAgICAgIHByb2dyYW06IHByb2dyYW1OdW1iZXIsXG4gICAgICAgIHBpZCxcbiAgICAgICAgdHlwZTogcHJvZ3JhbU51bWJlciA9PT0gMCA/ICduZXR3b3JrJyA6ICdtYXBQSUQnXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgZnJhZ3MucGF0ID0gZnJhZ3MucGF0LmNvbmNhdChsaXN0KTtcbiAgICB9XG4gICAgcmV0Lmxpc3QgPSBsaXN0O1xuICAgIHJldC5wcm9ncmFtID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICByZXQucGlkID0gc3RyZWFtLnJlYWRVaW50MTYoKSAmIDB4MWZmZjtcbiAgICB0cy5wYXlsb2FkID0gcmV0O1xuICAgIC8vIFRPRE8gQ1JDXG4gIH1cblxuICBzdGF0aWMgUE1UIChzdHJlYW0sIHRzLCBmcmFncykge1xuICAgIGxldCByZXQgPSB7fTtcbiAgICBsZXQgaGVhZGVyID0gdHMuaGVhZGVyO1xuICAgIGhlYWRlci5wYWNrZXQgPSAnUE1UJztcbiAgICBsZXQgbmV4dCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICBzdHJlYW0uc2tpcChuZXh0KTtcbiAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHJldC50YWJsZUlEID0gbmV4dDtcbiAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICByZXQuc2VjdGlvbkxlbmd0aCA9IG5leHQgJiAweGZmZjtcbiAgICByZXQucHJvZ3JhbSA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgcmV0LmN1cnJlbnQgPSBzdHJlYW0ucmVhZFVpbnQ4KCkgJiAxO1xuICAgIHJldC5vcmRlciA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICByZXQubGFzdE9yZGVyID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHJldC5QQ1JfUElEID0gc3RyZWFtLnJlYWRVaW50MTYoKSAmIDB4MWZmZjtcbiAgICByZXQucHJvZ3JhbUxlbmd0aCA9IHN0cmVhbS5yZWFkVWludDE2KCkgJiAweGZmZjtcbiAgICBsZXQgTiA9IChyZXQuc2VjdGlvbkxlbmd0aCAtIDEzKSAvIDU7XG4gICAgbGV0IGxpc3QgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE47IGkrKykge1xuICAgICAgbGlzdC5wdXNoKHtcbiAgICAgICAgc3RyZWFtVHlwZTogc3RyZWFtLnJlYWRVaW50OCgpLFxuICAgICAgICBwaWQ6IHN0cmVhbS5yZWFkVWludDE2KCkgJiAweDFmZmYsIC8vIDB4MDdlNSDop4bpopHvvIwweDA3ZTZcbiAgICAgICAgZXM6IHN0cmVhbS5yZWFkVWludDE2KCkgJiAweGZmZlxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldC5saXN0ID0gbGlzdDtcbiAgICBpZiAoIXRoaXMucG10KSB7XG4gICAgICB0aGlzLnBtdCA9IFtdO1xuICAgIH1cbiAgICBmcmFncy5wbXQgPSB0aGlzLnBtdC5jb25jYXQobGlzdC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBpZDogaXRlbS5waWQsXG4gICAgICAgIGVzOiBpdGVtLmVzLFxuICAgICAgICBzdHJlYW1UeXBlOiBpdGVtLnN0cmVhbVR5cGUsXG4gICAgICAgIHByb2dyYW06IHJldC5wcm9ncmFtXG4gICAgICB9O1xuICAgIH0pKTtcbiAgICB0cy5wYXlsb2FkID0gcmV0O1xuICB9XG5cbiAgc3RhdGljIE1lZGlhIChzdHJlYW0sIHRzLCB0eXBlKSB7XG4gICAgbGV0IGhlYWRlciA9IHRzLmhlYWRlcjtcbiAgICBsZXQgcGF5bG9hZCA9IHt9O1xuICAgIGhlYWRlci50eXBlID0gdHlwZTtcbiAgICBpZiAoaGVhZGVyLmFkYXB0YXRpb24gPT09IDB4MDMpIHtcbiAgICAgIHBheWxvYWQuYWRhcHRhdGlvbkxlbmd0aCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICAgIGlmIChwYXlsb2FkLmFkYXB0YXRpb25MZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCBuZXh0ID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgICAgICBwYXlsb2FkLmRpc2NvbnRpbnVlID0gbmV4dCA+Pj4gNztcbiAgICAgICAgcGF5bG9hZC5hY2Nlc3MgPSBuZXh0ID4+PiA2ICYgMHgwMTtcbiAgICAgICAgcGF5bG9hZC5wcmlvcml0eSA9IG5leHQgPj4+IDUgJiAweDAxO1xuICAgICAgICBwYXlsb2FkLlBDUiA9IG5leHQgPj4+IDQgJiAweDAxO1xuICAgICAgICBwYXlsb2FkLk9QQ1IgPSBuZXh0ID4+PiAzICYgMHgwMTtcbiAgICAgICAgcGF5bG9hZC5zcGxpY2VQb2ludCA9IG5leHQgPj4+IDIgJiAweDAxO1xuICAgICAgICBwYXlsb2FkLnRyYW5zcG9ydFByaXZhdGUgPSBuZXh0ID4+PiAxICYgMHgwMTtcbiAgICAgICAgcGF5bG9hZC5hZGFwdGF0aW9uRmllbGQgPSBuZXh0ICYgMHgwMTtcbiAgICAgICAgbGV0IF9zdGFydCA9IHN0cmVhbS5wb3NpdGlvbjtcbiAgICAgICAgaWYgKHBheWxvYWQuUENSID09PSAxKSB7XG4gICAgICAgICAgcGF5bG9hZC5wcm9ncmFtQ2xvY2tCYXNlID0gc3RyZWFtLnJlYWRVaW50MzIoKSA8PCAxO1xuICAgICAgICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgICAgICAgIHBheWxvYWQucHJvZ3JhbUNsb2NrQmFzZSB8PSBuZXh0ID4+PiAxNTtcbiAgICAgICAgICBwYXlsb2FkLnByb2dyYW1DbG9ja0V4dGVuc2lvbiA9IG5leHQgJiAweDFmZjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF5bG9hZC5PUENSID09PSAxKSB7XG4gICAgICAgICAgcGF5bG9hZC5vcmlnaW5Qcm9ncmFtQ2xvY2tCYXNlID0gc3RyZWFtLnJlYWRVaW50MzIoKSA8PCAxO1xuICAgICAgICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgICAgICAgIHBheWxvYWQub3JpZ2luUHJvZ3JhbUNsb2NrQmFzZSArPSBuZXh0ID4+PiAxNTtcbiAgICAgICAgICBwYXlsb2FkLm9yaWdpblByb2dyYW1DbG9ja0V4dGVuc2lvbiA9IG5leHQgJiAweDFmZjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF5bG9hZC5zcGxpY2VQb2ludCA9PT0gMSkge1xuICAgICAgICAgIHBheWxvYWQuc3BsaWNlQ291bnRkb3duID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXlsb2FkLnRyYW5zcG9ydFByaXZhdGUgPT09IDEpIHtcbiAgICAgICAgICBsZXQgbGVuZ3RoID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgICAgICAgIGxldCB0cmFuc3BvcnRQcml2YXRlRGF0YSA9IFtdO1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRyYW5zcG9ydFByaXZhdGVEYXRhLnB1c2goc3RyZWFtLnJlYWRVaW50OCgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBheWxvYWQuYWRhcHRhdGlvbkZpZWxkID09PSAxKSB7XG4gICAgICAgICAgbGV0IGxlbmd0aCA9IHN0cmVhbS5yZWFkVWludDgoKVxuICAgICAgICAgIGxldCBuZXh0ID0gc3RyZWFtLnJlYWRVaW50OCgpXG4gICAgICAgICAgbGV0IHN0YXJ0ID0gc3RyZWFtLnBvc2l0aW9uO1xuICAgICAgICAgIGxldCBsdHcgPSBuZXh0ID4+PiA3O1xuICAgICAgICAgIGxldCBwaWVjZXdpc2UgPSBuZXh0ID4+PiA2ICYgMHgxO1xuICAgICAgICAgIGxldCBzZWFtbGVzcyA9IG5leHQgPj4+IDUgJiAweDE7XG4gICAgICAgICAgaWYgKGx0dyA9PT0gMSkge1xuICAgICAgICAgICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgICAgICAgICBwYXlsb2FkLmx0d1ZhbGlkID0gbmV4dCA+Pj4gMTU7XG4gICAgICAgICAgICBwYXlsb2FkLmx0d09mZnNldCA9IG5leHQgJiAweGVmZmY7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwaWVjZXdpc2UgPT09IDEpIHtcbiAgICAgICAgICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQyNCgpO1xuICAgICAgICAgICAgcGF5bG9hZC5waWVjZXdpc2VSYXRlID0gbmV4dCAmIDB4M2ZmZmZmO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2VhbWxlc3MgPT09IDEpIHtcbiAgICAgICAgICAgIG5leHQgPSBzdHJlYW0ucmVhZEludDgoKTtcbiAgICAgICAgICAgIHBheWxvYWQuc3BsaWNlVHlwZSA9IG5leHQgPj4+IDQ7XG4gICAgICAgICAgICBwYXlsb2FkLmR0c05leHRBVTEgPSBuZXh0ID4+PiAxICYgMHg3O1xuICAgICAgICAgICAgcGF5bG9hZC5tYXJrZXIxID0gbmV4dCAmIDB4MTtcbiAgICAgICAgICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgICAgICAgICAgcGF5bG9hZC5kdHNOZXh0QVUyID0gbmV4dCA+Pj4gMTtcbiAgICAgICAgICAgIHBheWxvYWQubWFya2VyMiA9IG5leHQgJiAweDE7XG4gICAgICAgICAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICAgIHBheWxvYWQuZHRzTmV4dEFVMyA9IG5leHQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN0cmVhbS5za2lwKGxlbmd0aCAtIDEgLSAoc3RyZWFtLnBvc2l0aW9uIC0gc3RhcnQpKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbGFzdFN0dWZmaW5nID0gcGF5bG9hZC5hZGFwdGF0aW9uTGVuZ3RoIC0gMSAtIChzdHJlYW0ucG9zaXRpb24gLSBfc3RhcnQpO1xuICAgICAgICBzdHJlYW0uc2tpcChsYXN0U3R1ZmZpbmcpO1xuICAgICAgfVxuICAgIH1cbiAgICBwYXlsb2FkLnN0cmVhbSA9IG5ldyBTdHJlYW0oc3RyZWFtLmJ1ZmZlci5zbGljZShzdHJlYW0ucG9zaXRpb24pKTtcbiAgICB0cy5wYXlsb2FkID0gcGF5bG9hZDtcbiAgfVxuXG4gIHN0YXRpYyBQRVMgKHRzKSB7XG4gICAgbGV0IHJldCA9IHt9O1xuICAgIGxldCBidWZmZXIgPSB0cy5wYXlsb2FkLnN0cmVhbTtcbiAgICBcbiAgICBsZXQgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDI0KCk7XG4gICAgaWYgKG5leHQgIT09IDEpIHtcbiAgICAgIHJldC5FUyA9IHt9O1xuICAgICAgcmV0LkVTLmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHN0cmVhbUlEID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgaWYgKHN0cmVhbUlEID49IDB4ZTAgJiYgc3RyZWFtSUQgPD0gMHhlZikge1xuICAgICAgICByZXQudHlwZSA9ICd2aWRlbyc7XG4gICAgICB9XG4gICAgICBpZiAoc3RyZWFtSUQgPj0gMHhjMCAmJiBzdHJlYW1JRCA8PSAweGRmKSB7XG4gICAgICAgIHJldC50eXBlID0gJ2F1ZGlvJztcbiAgICAgIH1cbiAgICAgIGxldCBwYWNrZXRMZW5ndGggPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgcmV0LnBhY2tldExlbmd0aCA9IHBhY2tldExlbmd0aDtcbiAgICAgIGlmIChyZXQudHlwZSA9PT0gJ3ZpZGVvJyB8fCByZXQudHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgICBsZXQgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgbGV0IGZpcnN0ID0gbmV4dCA+Pj4gNjtcbiAgICAgICAgaWYgKGZpcnN0ICE9PSAweDAyKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdlcnJvciB3aGVuIHBhcnNlIHBlcyBoZWFkZXInKTtcbiAgICAgICAgfVxuICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICByZXQucHRzRFRTRmxhZyA9IG5leHQgPj4+IDY7XG4gICAgICAgIHJldC5lc2NyRmxhZyA9IG5leHQgPj4+IDUgJiAweDAxO1xuICAgICAgICByZXQuZXNSYXRlRmxhZyA9IG5leHQgPj4+IDQgJiAweDAxO1xuICAgICAgICByZXQuZHNtRmxhZyA9IG5leHQgPj4+IDMgJiAweDAxO1xuICAgICAgICByZXQuYWRkaXRpb25hbEZsYWcgPSBuZXh0ID4+PiAyICYgMHgwMTtcbiAgICAgICAgcmV0LmNyY0ZsYWcgPSBuZXh0ID4+PiAxICYgMHgwMTtcbiAgICAgICAgcmV0LmV4dGVuc2lvbkZsYWcgPSBuZXh0ICYgMHgwMTtcbiAgICAgICAgcmV0LnBlc0hlYWRlckxlbmd0aCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgbGV0IE4xID0gcmV0LnBlc0hlYWRlckxlbmd0aDtcblxuICAgICAgICBpZiAocmV0LnB0c0RUU0ZsYWcgPT09IDIpIHtcbiAgICAgICAgICBsZXQgcHRzID0gW107XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgICBwdHMucHVzaChuZXh0ID4+PiAxICYgMHgwNyk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgcHRzLnB1c2gobmV4dCA+Pj4gMSk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgcHRzLnB1c2gobmV4dCA+Pj4gMSk7XG4gICAgICAgICAgcmV0LnB0cyA9IChwdHNbMF0gPDwgMzAgfCBwdHNbMV0gPDwgMTUgfCBwdHNbMl0pO1xuICAgICAgICAgIE4xIC09IDU7XG4gICAgICAgICAgLy8g6KeG6aKR5aaC5p6c5rKh5pyJZHRz55SocHRzXG4gICAgICAgICAgaWYgKHJldC50eXBlID09PSAndmlkZW8nKSB7XG4gICAgICAgICAgICByZXQuZHRzID0gcmV0LnB0cztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldC5wdHNEVFNGbGFnID09PSAzKSB7XG4gICAgICAgICAgbGV0IHB0cyA9IFtdO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQ4KCk7XG4gICAgICAgICAgcHRzLnB1c2gobmV4dCA+Pj4gMSAmIDB4MDcpO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgICAgIHB0cy5wdXNoKG5leHQgPj4+IDEpO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgICAgIHB0cy5wdXNoKG5leHQgPj4+IDEpO1xuICAgICAgICAgIHJldC5wdHMgPSAocHRzWzBdIDw8IDMwIHwgcHRzWzFdIDw8IDE1IHwgcHRzWzJdKTtcbiAgICAgICAgICBsZXQgZHRzID0gW107XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgICBkdHMucHVzaChuZXh0ID4+PiAxICYgMHgwNyk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgZHRzLnB1c2gobmV4dCA+Pj4gMSk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgZHRzLnB1c2gobmV4dCA+Pj4gMSk7XG4gICAgICAgICAgcmV0LmR0cyA9IChkdHNbMF0gPDwgMzAgfCBkdHNbMV0gPDwgMTUgfCBkdHNbMl0pO1xuICAgICAgICAgIE4xIC09IDEwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXQuZXNjckZsYWcgPT09IDEpIHtcbiAgICAgICAgICBsZXQgZXNjciA9IFtdXG4gICAgICAgICAgbGV0IGV4ID0gW107XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgICBlc2NyLnB1c2gobmV4dCA+Pj4gMyAmIDB4MDcpO1xuICAgICAgICAgIGVzY3IucHVzaChuZXh0ICYgMHgwMyk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgZXNjci5wdXNoKG5leHQgPj4+IDEzKTtcbiAgICAgICAgICBlc2NyLnB1c2gobmV4dCAmIDB4MDMpO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgICAgIGVzY3IucHVzaChuZXh0ID4+PiAxMyk7XG4gICAgICAgICAgZXgucHVzaChuZXh0ICYgMHgwMyk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgICBleC5wdXNoKG5leHQgPj4+IDEpO1xuICAgICAgICAgIHJldC5lc2NyID0gKGVzY3JbMF0gPDwgMzAgfCBlc2NyWzFdIDw8IDI4IHwgZXNjclsyXSA8PCAxNSB8IGVzY3JbM10gPDwgMTMgfCBlc2NyWzRdKSAqIDMwMCArIChleFswXSA8PCA3IHwgZXhbMV0pO1xuICAgICAgICAgIE4xIC09IDY7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldC5lc1JhdGVGbGFnID09PSAxKSB7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDI0KCk7XG4gICAgICAgICAgcmV0LmVzUmF0ZSA9IG5leHQgPj4+IDEgJiAweDNmZmZmZjtcbiAgICAgICAgICBOMSAtPSAzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXQuZHNtRmxhZyA9PT0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IHN1cHBvcnQgRFNNX3RyaWNrX21vZGUnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0LmFkZGl0aW9uYWxGbGFnID09PSAxKSB7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgICByZXQuYWRkaXRpb25hbENvcHlJbmZvID0gbmV4dCAmIDB4N2Y7XG4gICAgICAgICAgTjEgLT0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0LmNyY0ZsYWcgPT09IDEpIHtcbiAgICAgICAgICByZXQucGVzQ1JDID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBOMSAtPSAyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXQuZXh0ZW5zaW9uRmxhZyA9PT0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IHN1cHBvcnQgZXh0ZW5zaW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE4xID4gMCkge1xuICAgICAgICAgIGJ1ZmZlci5za2lwKE4xKTtcbiAgICAgICAgfVxuICAgICAgICByZXQuRVMgPSBUc0RlbXV4ZXIuRVMoYnVmZmVyLCByZXQudHlwZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Zvcm1hdCBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBzdGF0aWMgRVMgKGJ1ZmZlciwgdHlwZSkge1xuICAgIGxldCBuZXh0O1xuICAgIGxldCByZXQgPSB7fTtcbiAgICBpZiAodHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDMyKCk7XG4gICAgICBpZiAobmV4dCAhPT0gMSkge1xuICAgICAgICBidWZmZXIuYmFjayg0KTtcbiAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDI0KCk7XG4gICAgICAgIGlmIChuZXh0ICE9PSAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdoMjY0IG5hbCBoZWFkZXIgcGFyc2UgZmFpbGVkJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJ1ZmZlci5za2lwKDIpOy8vIDA5IEYwXG4gICAgICAvLyBUT0RPIHJlYWRuYWx1XG4gICAgICByZXQuYnVmZmVyID0gYnVmZmVyO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAvLyBhZHRz55qE5ZCM5q2l5a2X6IqC77yMMTLkvY1cbiAgICAgIGlmIChuZXh0ID4+PiA0ICE9PSAweGZmZikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FhYyBFUyBwYXJzZSBFcnJvcicpO1xuICAgICAgfVxuICAgICAgY29uc3QgZnEgPSBbOTYwMDAsIDg4MjAwLCA2NDAwMCwgNDgwMDAsIDQ0MTAwLCAzMjAwMCwgMjQwMDAsIDIyMDUwLCAxNjAwMCwgMTIwMDAsIDExMDI1LCA4MDAwLCA3MzUwXTtcbiAgICAgIHJldC5pZCA9IChuZXh0ID4+PiAzICYgMHgwMSkgPT09IDAgPyAnTVBFRy00JyA6ICdNUEVHLTInO1xuICAgICAgcmV0LmxheWVyID0gbmV4dCA+Pj4gMSAmIDB4MDM7XG4gICAgICByZXQuYWJzZW50ID0gbmV4dCAmIDB4MDE7XG4gICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgIHJldC5hdWRpb09iamVjdFR5cGUgPSAobmV4dCA+Pj4gMTQgJiAweDAzKSArIDE7XG4gICAgICByZXQucHJvZmlsZSA9IHJldC5hdWRpb09iamVjdFR5cGUgLSAxO1xuICAgICAgcmV0LmZyZXF1ZW5jeUluZGV4ID0gbmV4dCA+Pj4gMTAgJiAweDBmO1xuICAgICAgcmV0LmZyZXF1ZW5jZSA9IGZxW3JldC5mcmVxdWVuY3lJbmRleF07XG4gICAgICByZXQuY2hhbm5lbCA9IG5leHQgPj4+IDYgJiAweDA3O1xuICAgICAgcmV0LmZyYW1lTGVuZ3RoID0gKG5leHQgJiAweDAzKSA8PCAxMSB8IChidWZmZXIucmVhZFVpbnQxNigpID4+PiA1KTtcbiAgICAgIHJldC5hdWRpb0NvbmZpZyA9IFRzRGVtdXhlci5nZXRBdWRpb0NvbmZpZyhyZXQuYXVkaW9PYmplY3RUeXBlLCByZXQuY2hhbm5lbCwgcmV0LmZyZXF1ZW5jeUluZGV4KTtcbiAgICAgIGJ1ZmZlci5za2lwKDEpO1xuICAgICAgcmV0LmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFUyAke3R5cGV9IGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgc3RhdGljIFRTRFQgKHN0cmVhbSwgdHMsIGZyYWdzKSB7XG4gICAgLy8gVE9ET1xuICAgIHRzLnBheWxvYWQgPSB7fTtcbiAgfVxuXG4gIHN0YXRpYyBDQVQgKHN0cmVhbSwgdHMsIGZyYWdzKSB7XG4gICAgbGV0IHJldCA9IHt9XG4gICAgcmV0LnRhYmxlSUQgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgbGV0IG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgIHJldC5zZWN0aW9uSW5kaWNhdG9yID0gbmV4dCA+Pj4gNztcbiAgICByZXQuc2VjdGlvbkxlbmd0aCA9IG5leHQgJiAweDBmZmY7XG4gICAgc3RyZWFtLnNraXAoMik7XG4gICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICByZXQudmVyc2lvbiA9IG5leHQgPj4+IDM7XG4gICAgcmV0LmN1cnJlbnROZXh0SW5kaWNhdG9yID0gbmV4dCAmIDB4MDE7XG4gICAgcmV0LnNlY3Rpb25OdW1iZXIgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgcmV0Lmxhc3RTZWN0aW9uTnVtYmVyID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIGxldCBOID0gKHRoaXMuc2VjdGlvbkxlbmd0aCAtIDkpIC8gNDtcbiAgICBsZXQgbGlzdCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTjsgaSsrKSB7XG4gICAgICBsaXN0LnB1c2goe30pO1xuICAgIH1cbiAgICByZXQuY3JjMzIgPSBzdHJlYW0ucmVhZFVpbnQzMigpO1xuICAgIHRzLnBheWxvYWQgPSByZXQ7XG4gIH1cblxuICBzdGF0aWMgZ2V0QXVkaW9Db25maWcgKGF1ZGlvT2JqZWN0VHlwZSwgY2hhbm5lbCwgc2FtcGxlSW5kZXgpIHtcbiAgICBsZXQgdXNlckFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpXG4gICAgbGV0IGNvbmZpZztcbiAgICBsZXQgZXh0ZW5zaW9uU2FtcGxlSW5kZXg7XG4gICAgaWYgKC9maXJlZm94L2kudGVzdCh1c2VyQWdlbnQpKSB7XG4gICAgICBpZiAoc2FtcGxlSW5kZXggPj0gNikge1xuICAgICAgICBhdWRpb09iamVjdFR5cGUgPSA1O1xuICAgICAgICBjb25maWcgPSBuZXcgQXJyYXkoNCk7XG4gICAgICAgIGV4dGVuc2lvblNhbXBsZUluZGV4ID0gc2FtcGxlSW5kZXggLSAzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXVkaW9PYmplY3RUeXBlID0gMjtcbiAgICAgICAgY29uZmlnID0gbmV3IEFycmF5KDIpO1xuICAgICAgICBleHRlbnNpb25TYW1wbGVJbmRleCA9IHNhbXBsZUluZGV4O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodXNlckFnZW50LmluZGV4T2YoJ2FuZHJvaWQnKSAhPT0gLTEpIHtcbiAgICAgIGF1ZGlvT2JqZWN0VHlwZSA9IDI7XG4gICAgICBjb25maWcgPSBuZXcgQXJyYXkoMik7XG4gICAgICBleHRlbnNpb25TYW1wbGVJbmRleCA9IHNhbXBsZUluZGV4O1xuICAgIH0gZWxzZSB7XG4gICAgICBhdWRpb09iamVjdFR5cGUgPSA1O1xuICAgICAgY29uZmlnID0gbmV3IEFycmF5KDQpO1xuICAgICAgaWYgKHNhbXBsZUluZGV4ID49IDYpIHtcbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxlSW5kZXggPSBzYW1wbGVJbmRleCAtIDM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoY2hhbm5lbCA9PT0gMSkge1xuICAgICAgICAgIGF1ZGlvT2JqZWN0VHlwZSA9IDI7XG4gICAgICAgICAgY29uZmlnID0gbmV3IEFycmF5KDIpO1xuICAgICAgICB9XG4gICAgICAgIGV4dGVuc2lvblNhbXBsZUluZGV4ID0gc2FtcGxlSW5kZXg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uZmlnWzBdID0gYXVkaW9PYmplY3RUeXBlIDw8IDM7XG4gICAgY29uZmlnWzBdIHw9IChzYW1wbGVJbmRleCAmIDB4MGUpID4+IDE7XG4gICAgY29uZmlnWzFdID0gKHNhbXBsZUluZGV4ICYgMHgwMSkgPDwgNztcbiAgICBjb25maWdbMV0gfD0gY2hhbm5lbCA8PCAzO1xuICAgIGlmIChhdWRpb09iamVjdFR5cGUgPT09IDUpIHtcbiAgICAgIGNvbmZpZ1sxXSB8PSAoZXh0ZW5zaW9uU2FtcGxlSW5kZXggJiAweDBlKSA+PiAxO1xuICAgICAgY29uZmlnWzJdID0gKGV4dGVuc2lvblNhbXBsZUluZGV4ICYgMHgwMSkgPDwgNztcbiAgICAgIGNvbmZpZ1syXSB8PSAyIDw8IDI7XG4gICAgICBjb25maWdbM10gPSAwO1xuICAgIH1cbiAgICByZXR1cm4gY29uZmlnO1xuICB9XG5cbiAgZ2V0IGlucHV0QnVmZmVyICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSh0aGlzLmNvbmZpZ3MuaW5wdXRidWZmZXIpO1xuICB9XG5cbiAgZ2V0IF90cmFja3MgKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUc0RlbXV4ZXI7XG4iLCJjbGFzcyBQbGF5bGlzdCB7XG4gIGNvbnN0cnVjdG9yIChjb25maWdzKSB7XG4gICAgdGhpcy5fYmFzZVVSTCA9ICcnO1xuICAgIHRoaXMuX2xpc3QgPSB7fTtcbiAgICB0aGlzLl90cyA9IHt9O1xuICAgIHRoaXMudmVyc2lvbiA9IDA7XG4gICAgdGhpcy5zZXF1ZW5jZSA9IC0xO1xuICAgIHRoaXMudGFyZ2V0ZHVyYXRpb24gPSAwO1xuICAgIHRoaXMuZHVyYXRpb24gPSAwO1xuICAgIHRoaXMuZnJhZ0xlbmd0aCA9IDA7XG4gICAgdGhpcy5fbGFzdGdldCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9hdWRvY2xlYXIgPSBjb25maWdzLmF1dG9jbGVhciB8fCBmYWxzZTtcbiAgfVxuXG4gIGdldCBsaXN0ICgpIHtcbiAgICByZXR1cm4gdGhpcy5fbGlzdDtcbiAgfVxuXG4gIHNldCBiYXNlVVJMIChiYXNlVVJMKSB7XG4gICAgaWYgKHRoaXMuYmFzZVVSTCAhPT0gYmFzZVVSTCkge1xuICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgdGhpcy5fYmFzZVVSTCA9IGJhc2VVUkw7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGJhc2VVUkwgKCkge1xuICAgIHJldHVybiB0aGlzLl9iYXNlVVJMO1xuICB9XG5cbiAgcHVzaCAodHMsIGR1cmF0aW9uKSB7XG4gICAgaWYgKCF0aGlzLl90c1t0c10pIHtcbiAgICAgIHRoaXMuX3RzW3RzXSA9IHtkdXJhdGlvbjogZHVyYXRpb24sIGRvd25sb2FkZWQ6IGZhbHNlLCBkb3dubG9hZGluZzogZmFsc2UsIHN0YXJ0OiB0aGlzLmR1cmF0aW9ufTtcbiAgICAgIHRoaXMuX2xpc3RbdGhpcy5kdXJhdGlvbl0gPSB0cztcbiAgICAgIHRoaXMuZHVyYXRpb24gKz0gZHVyYXRpb247XG4gICAgICB0aGlzLmZyYWdMZW5ndGggKz0gMTtcbiAgICB9XG4gIH1cblxuICBkZWxldGVGcmFnICh1cmwpIHtcbiAgICBpZiAodGhpcy5fdHNbdXJsXSkge1xuICAgICAgaWYgKHRoaXMuX3RzW3VybF0uc3RhcnQgPiB0aGlzLl9sYXN0Z2V0LnRpbWUpIHtcbiAgICAgICAgdGhpcy5fbGFzdGdldCA9IHtcbiAgICAgICAgICBkdXJhdGlvbjogdGhpcy5fdHNbdXJsXS5kdXJhdGlvbixcbiAgICAgICAgICB0aW1lOiB0aGlzLl90c1t1cmxdLnN0YXJ0LFxuICAgICAgICAgIGRvd25sb2FkZWQ6IGZhbHNlLFxuICAgICAgICAgIGRvd25sb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICB1cmw6IHVybFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBkZWxldGUgdGhpcy5fbGlzdFt0aGlzLl90c1t1cmxdLnN0YXJ0XTtcbiAgICAgIGRlbGV0ZSB0aGlzLl90c1t1cmxdO1xuICAgICAgdGhpcy5mcmFnTGVuZ3RoIC09IDE7XG4gICAgfVxuICB9XG5cbiAgcHVzaE0zVTggKGRhdGEsIGRlbGV0ZXByZSkge1xuICAgIC8vIOW4uOinhOS/oeaBr+abv+aNolxuICAgIGlmICghZGF0YSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnZlcnNpb24gPSBkYXRhLnZlcnNpb247XG4gICAgdGhpcy50YXJnZXRkdXJhdGlvbiA9IGRhdGEudGFyZ2V0ZHVyYXRpb247XG5cbiAgICAvLyDmlrDliIbniYfkv6Hmga9cbiAgICBpZiAoZGF0YS5zZXF1ZW5jZSA+IHRoaXMuc2VxdWVuY2UpIHtcbiAgICAgIHRoaXMuc2VxdWVuY2UgPSBkYXRhLnNlcXVlbmNlO1xuICAgICAgbGV0IG5ld2ZyYWdsaXN0ID0gW11cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5mcmFncy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgZnJhZyA9IGRhdGEuZnJhZ3NbaV07XG4gICAgICAgIGlmICghdGhpcy5fdHNbZnJhZy51cmxdKSB7XG4gICAgICAgICAgbmV3ZnJhZ2xpc3QucHVzaChmcmFnLnVybClcbiAgICAgICAgICB0aGlzLnB1c2goZnJhZy51cmwsIGZyYWcuZHVyYXRpb24pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZGVsZXRlcHJlKSB7XG4gICAgICAgIGxldCB0c2xpc3QgPSB0aGlzLmdldFRzTGlzdCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRzbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChuZXdmcmFnbGlzdC5pbmRleE9mKHRzbGlzdFtpXSkgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLmRlbGV0ZUZyYWcodHNsaXN0W2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRUc0xpc3QgKCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl90cyk7XG4gIH1cblxuICBkb3dubG9hZGVkICh0c25hbWUsIGlzbG9hZGVkKSB7XG4gICAgbGV0IHRzID0gdGhpcy5fdHNbdHNuYW1lXTtcbiAgICBpZiAodHMpIHtcbiAgICAgIHRzLmRvd25sb2FkZWQgPSBpc2xvYWRlZFxuICAgIH1cbiAgfVxuXG4gIGRvd25sb2FkaW5nICh0c25hbWUsIGxvYWRpbmcpIHtcbiAgICBsZXQgdHMgPSB0aGlzLl90c1t0c25hbWVdO1xuICAgIGlmICh0cykge1xuICAgICAgdHMuZG93bmxvYWRpbmcgPSBsb2FkaW5nXG4gICAgfVxuICB9XG5cbiAgZ2V0VHNCeU5hbWUgKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fdHNbbmFtZV07XG4gIH1cblxuICBnZXRUcyAodGltZSkge1xuICAgIGxldCB0aW1lbGlzdCA9IE9iamVjdC5rZXlzKHRoaXMuX2xpc3QpO1xuICAgIGxldCB0cztcblxuICAgIGlmICh0aW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0aGlzLl9sYXN0Z2V0KSB7XG4gICAgICAgIHRpbWUgPSB0aGlzLl9sYXN0Z2V0LnRpbWUgKyB0aGlzLl9sYXN0Z2V0LmR1cmF0aW9uO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGltZSA9IDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRpbWVsaXN0Lmxlbmd0aCA8IDEgfHwgdGltZSA+PSB0aGlzLmR1cmF0aW9uKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB0aW1lbGlzdC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICByZXR1cm4gcGFyc2VGbG9hdChhKSAtIHBhcnNlRmxvYXQoYilcbiAgICB9KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbWVsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGltZSA+PSBwYXJzZUludCh0aW1lbGlzdFtpXSkpIHtcbiAgICAgICAgbGV0IHVybCA9IHRoaXMuX2xpc3RbdGltZWxpc3RbaV1dO1xuICAgICAgICBsZXQgZG93bmxvYWRlZCA9IHRoaXMuX3RzW3VybF0uZG93bmxvYWRlZDtcbiAgICAgICAgbGV0IGRvd25sb2FkaW5nID0gdGhpcy5fdHNbdXJsXS5kb3dubG9hZGluZztcbiAgICAgICAgdHMgPSB7dXJsLCBkb3dubG9hZGVkLCBkb3dubG9hZGluZywgdGltZTogcGFyc2VJbnQodGltZWxpc3RbaV0pLCBkdXJhdGlvbjogcGFyc2VJbnQodGhpcy5fdHNbdXJsXS5kdXJhdGlvbil9O1xuICAgICAgICBpZiAodGhpcy5hdXRvY2xlYXIpIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5fdHNbdGhpcy5fbGFzdGdldC51cmxdO1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLl9saXN0W3RoaXMuX2xhc3RnZXQudGltZV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGFzdGdldCA9IHRzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cztcbiAgfVxuXG4gIGNsZWFyICgpIHtcbiAgICB0aGlzLl9iYXNlVVJMID0gJyc7XG4gICAgdGhpcy5fbGlzdCA9IHt9O1xuICAgIHRoaXMuX3RzID0ge307XG4gICAgdGhpcy52ZXJzaW9uID0gMDtcbiAgICB0aGlzLnNlcXVlbmNlID0gLTE7XG4gICAgdGhpcy50YXJnZXRkdXJhdGlvbiA9IDA7XG4gICAgdGhpcy5kdXJhdGlvbiA9IDA7XG4gIH1cblxuICBjbGVhckRvd25sb2FkZWQgKCkge1xuICAgIGZvciAobGV0IGkgPSAwLCBsID0gT2JqZWN0LmtleXModGhpcy5fdHMpLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgbGV0IHRzID0gdGhpcy5fdHNbT2JqZWN0LmtleXModGhpcy5fdHMpW2ldXTtcbiAgICAgIHRzLmRvd25sb2FkZWQgPSBmYWxzZTtcbiAgICAgIHRzLmRvd25sb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5fYmFzZVVSTCA9ICcnO1xuICAgIHRoaXMuX2xpc3QgPSB7fTtcbiAgICB0aGlzLl90cyA9IHt9O1xuICAgIHRoaXMudmVyc2lvbiA9IDA7XG4gICAgdGhpcy5zZXF1ZW5jZSA9IC0xO1xuICAgIHRoaXMudGFyZ2V0ZHVyYXRpb24gPSAwO1xuICAgIHRoaXMuZHVyYXRpb24gPSAwO1xuICAgIHRoaXMuZnJhZ0xlbmd0aCA9IDA7XG4gICAgdGhpcy5fbGFzdGdldCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9hdWRvY2xlYXIgPSBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5bGlzdDtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBGZXRjaExvYWRlcjogcmVxdWlyZSgnLi9zcmMvZmV0Y2gtbG9hZGVyJykuZGVmYXVsdFxufTtcbiIsImltcG9ydCB7IEVWRU5UUyB9IGZyb20gJ3hncGxheWVyLXV0aWxzJztcblxuY29uc3QgTE9BREVSX0VWRU5UUyA9IEVWRU5UUy5MT0FERVJfRVZFTlRTO1xuY29uc3QgUkVBRF9TVFJFQU0gPSAwO1xuY29uc3QgUkVBRF9URVhUID0gMTtcbmNvbnN0IFJFQURfSlNPTiA9IDI7XG5jb25zdCBSRUFEX0JVRkZFUiA9IDM7XG5jbGFzcyBGZXRjaExvYWRlciB7XG4gIGNvbnN0cnVjdG9yIChjb25maWdzKSB7XG4gICAgdGhpcy5jb25maWdzID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlncyk7XG4gICAgdGhpcy51cmwgPSBudWxsXG4gICAgdGhpcy5zdGF0dXMgPSAwXG4gICAgdGhpcy5lcnJvciA9IG51bGxcbiAgICB0aGlzLl9yZWFkZXIgPSBudWxsO1xuICAgIHRoaXMuX2NhbmNlbGVkID0gZmFsc2U7XG4gICAgdGhpcy5yZWFkdHlwZSA9IHRoaXMuY29uZmlncy5yZWFkdHlwZTtcbiAgICB0aGlzLmJ1ZmZlciA9IHRoaXMuY29uZmlncy5idWZmZXIgfHwgJ0xPQURFUl9CVUZGRVInO1xuICAgIHRoaXMuX2xvYWRlclRhc2tObyA9IDA7XG4gIH1cblxuICBpbml0ICgpIHtcbiAgICB0aGlzLm9uKExPQURFUl9FVkVOVFMuTEFERVJfU1RBUlQsIHRoaXMubG9hZC5iaW5kKHRoaXMpKVxuICB9XG5cbiAgc3RhdGljIGdldCB0eXBlICgpIHtcbiAgICByZXR1cm4gJ2xvYWRlcidcbiAgfVxuXG4gIGxvYWQgKHVybCwgb3B0cykge1xuICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy51cmwgPSB1cmw7XG4gICAgdGhpcy5fY2FuY2VsZWQgPSBmYWxzZTtcblxuICAgIC8vIFRPRE86IEFkZCBSYW5nZXNcbiAgICBsZXQgcGFyYW1zID0gdGhpcy5nZXRQYXJhbXMob3B0cylcbiAgICBfdGhpcy5sb2FkaW5nID0gdHJ1ZVxuICAgIHJldHVybiBmZXRjaCh0aGlzLnVybCwgcGFyYW1zKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgIF90aGlzLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1c1xuICAgICAgICByZXR1cm4gX3RoaXMuX29uRmV0Y2hSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICB9XG4gICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0VSUk9SLCBfdGhpcywgcmVzcG9uc2UpO1xuICAgICAgX3RoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikgIHtcbiAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfRVJST1IsIF90aGlzLCBlcnJvcik7XG4gICAgICBfdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSlcbiAgICB9KVxuICB9XG5cbiAgX29uRmV0Y2hSZXNwb25zZSAocmVzcG9uc2UpIHtcbiAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgIGxldCBidWZmZXIgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKHRoaXMuYnVmZmVyKTtcbiAgICB0aGlzLl9sb2FkZXJUYXNrTm8rKztcbiAgICBsZXQgdGFza25vID0gdGhpcy5fbG9hZGVyVGFza05vO1xuICAgIGlmIChyZXNwb25zZS5vayA9PT0gdHJ1ZSkge1xuICAgICAgc3dpdGNoICh0aGlzLnJlYWR0eXBlKSB7XG4gICAgICAgIGNhc2UgUkVBRF9KU09OOlxuICAgICAgICAgIHJlc3BvbnNlLmpzb24oKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBfdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgICAgICAgIGlmICghX3RoaXMuX2NhbmNlbGVkKSB7XG4gICAgICAgICAgICAgIGlmIChidWZmZXIpIHtcbiAgICAgICAgICAgICAgICBidWZmZXIucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0NPTVBMRVRFLCBidWZmZXIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsIGRhdGEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgUkVBRF9URVhUOlxuICAgICAgICAgIHJlc3BvbnNlLnRleHQoKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBfdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgICAgICAgIGlmICghX3RoaXMuX2NhbmNlbGVkKSB7XG4gICAgICAgICAgICAgIGlmIChidWZmZXIpIHtcbiAgICAgICAgICAgICAgICBidWZmZXIucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0NPTVBMRVRFLCBidWZmZXIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsIGRhdGEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgUkVBRF9CVUZGRVI6XG4gICAgICAgICAgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBfdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgICAgICAgIGlmICghX3RoaXMuX2NhbmNlbGVkKSB7XG4gICAgICAgICAgICAgIGlmIChidWZmZXIpIHtcbiAgICAgICAgICAgICAgICBidWZmZXIucHVzaChuZXcgVWludDhBcnJheShkYXRhKSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9DT01QTEVURSwgYnVmZmVyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0NPTVBMRVRFLCBkYXRhKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFJFQURfU1RSRUFNOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiB0aGlzLl9vblJlYWRlcihyZXNwb25zZS5ib2R5LmdldFJlYWRlcigpLCB0YXNrbm8pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9vblJlYWRlciAocmVhZGVyLCB0YXNrbm8pIHtcbiAgICBsZXQgYnVmZmVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSh0aGlzLmJ1ZmZlcik7XG5cbiAgICBpZiAoIWJ1ZmZlcikge1xuICAgICAgdGhpcy5fcmVhZGVyLmNhbmNlbCgpO1xuICAgIH1cblxuICAgIHRoaXMuX3JlYWRlciA9IHJlYWRlclxuICAgIGlmICh0aGlzLmxvYWRpbmcgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgX3RoaXMgPSB0aGlzXG4gICAgLy8gcmVhZGVyIHJlYWQgZnVuY3Rpb24gcmV0dXJucyBhIFByb21pc2UuIGdldCBkYXRhIHdoZW4gY2FsbGJhY2sgYW5kIGhhcyB2YWx1ZS5kb25lIHdoZW4gZGlzY29ubmVjdGVkLlxuICAgIC8vIHJlYWTmlrnms5Xov5Tlm57kuIDkuKpQcm9taXNlLiDlm57osIPkuK3lj6/ku6Xojrflj5bliLDmlbDmja7jgILlvZN2YWx1ZS5kb25l5a2Y5Zyo5pe277yM6K+05piO6ZO+5o6l5pat5byA44CCXG4gICAgdGhpcy5fcmVhZGVyICYmIHRoaXMuX3JlYWRlci5yZWFkKCkudGhlbihmdW5jdGlvbiAodmFsKSB7XG4gICAgICBpZiAodmFsLmRvbmUpIHtcbiAgICAgICAgLy8gVE9ETzog5a6M5oiQ5aSE55CGXG4gICAgICAgIF90aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgICBfdGhpcy5zdGF0dXMgPSAwO1xuICAgICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0NPTVBMRVRFLCBidWZmZXIpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoX3RoaXMuX2NhbmNlbGVkKSB7XG4gICAgICAgIF90aGlzLl9yZWFkZXIuY2FuY2VsKClcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYnVmZmVyLnB1c2godmFsLnZhbHVlKVxuICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9EQVRBTE9BREVELCBidWZmZXIpXG4gICAgICByZXR1cm4gX3RoaXMuX29uUmVhZGVyKHJlYWRlciwgdGFza25vKVxuICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0VSUk9SLCBfdGhpcywgZXJyb3IpO1xuICAgICAgX3RoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgIH0pXG4gIH1cblxuICBnZXRQYXJhbXMgKG9wdHMpIHtcbiAgICBsZXQgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdHMpXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpXG5cbiAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICBtb2RlOiAnY29ycycsXG4gICAgICBjYWNoZTogJ2RlZmF1bHQnXG4gICAgfVxuXG4gICAgLy8gYWRkIGN1c3Rtb3IgaGVhZGVyc1xuICAgIC8vIOa3u+WKoOiHquWumuS5ieWktFxuICAgIGlmICh0eXBlb2YgdGhpcy5jb25maWdzLmhlYWRlcnMgPT09ICdvYmplY3QnKSB7XG4gICAgICBsZXQgY29uZmlnSGVhZGVycyA9IHRoaXMuY29uZmlncy5oZWFkZXJzXG4gICAgICBmb3IgKGxldCBrZXkgaW4gY29uZmlnSGVhZGVycykge1xuICAgICAgICBpZiAoY29uZmlnSGVhZGVycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgaGVhZGVycy5hcHBlbmQoa2V5LCBjb25maWdIZWFkZXJzW2tleV0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuaGVhZGVycyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGxldCBvcHRIZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzXG4gICAgICBmb3IgKGxldCBrZXkgaW4gb3B0SGVhZGVycykge1xuICAgICAgICBpZiAob3B0SGVhZGVycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgaGVhZGVycy5hcHBlbmQoa2V5LCBvcHRIZWFkZXJzW2tleV0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5jb3JzID09PSBmYWxzZSkge1xuICAgICAgcGFyYW1zLm1vZGUgPSAnc2FtZS1vcmlnaW4nXG4gICAgfVxuXG4gICAgLy8gd2l0aENyZWRlbnRpYWxzIGlzIGRpc2FibGVkIGJ5IGRlZmF1bHRcbiAgICAvLyB3aXRoQ3JlZGVudGlhbHMg5Zyo6buY6K6k5oOF5Ya15LiL5LiN6KKr5L2/55So44CCXG4gICAgaWYgKG9wdGlvbnMud2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICBwYXJhbXMuY3JlZGVudGlhbHMgPSAnaW5jbHVkZSdcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBBZGQgcmFuZ2VzO1xuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICBjYW5jZWwgKCkge1xuICAgIGlmICh0aGlzLl9yZWFkZXIpIHtcbiAgICAgIHRoaXMuX3JlYWRlci5jYW5jZWwoKVxuICAgICAgdGhpcy5fcmVhZGVyID0gbnVsbFxuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgIHRoaXMuX2NhbmNlbGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmNhbmNlbCgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZldGNoTG9hZGVyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgTXA0UmVtdXhlcjogcmVxdWlyZSgnLi9zcmMvbXA0JykuZGVmYXVsdFxufTtcbiIsImltcG9ydCB7IEJ1ZmZlciB9IGZyb20gJ3hncGxheWVyLXV0aWxzJztcblxuLy8gY29uc3QgVUlOVDMyX01BWCA9IE1hdGgucG93KDIsIDMyKSAtIDE7XG5jbGFzcyBGbXA0IHtcbiAgc3RhdGljIHNpemUgKHZhbHVlKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci53cml0ZVVpbnQzMih2YWx1ZSlcbiAgfVxuICBzdGF0aWMgaW5pdEJveCAoc2l6ZSwgbmFtZSwgLi4uY29udGVudCkge1xuICAgIGNvbnN0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoc2l6ZSksIEZtcDQudHlwZShuYW1lKSwgLi4uY29udGVudClcbiAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlclxuICB9XG4gIHN0YXRpYyBleHRlbnNpb24gKHZlcnNpb24sIGZsYWcpIHtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgdmVyc2lvbixcbiAgICAgIChmbGFnID4+IDE2KSAmIDB4ZmYsXG4gICAgICAoZmxhZyA+PiA4KSAmIDB4ZmYsXG4gICAgICBmbGFnICYgMHhmZlxuICAgIF0pXG4gIH1cbiAgc3RhdGljIGZ0eXAgKCkge1xuICAgIHJldHVybiBGbXA0LmluaXRCb3goMjQsICdmdHlwJywgbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHg2OSwgMHg3MywgMHg2RiwgMHg2RCwgLy8gaXNvbSxcbiAgICAgIDB4MCwgMHgwLCAweDAwLCAweDAxLCAvLyBtaW5vcl92ZXJzaW9uOiAweDAxXG4gICAgICAweDY5LCAweDczLCAweDZGLCAweDZELCAvLyBpc29tXG4gICAgICAweDYxLCAweDc2LCAweDYzLCAweDMxIC8vIGF2YzFcbiAgICBdKSlcbiAgfVxuICBzdGF0aWMgbW9vdiAoeyB0eXBlLCBtZXRhIH0pIHtcbiAgICBsZXQgc2l6ZSA9IDhcbiAgICBsZXQgbXZoZCA9IEZtcDQubXZoZChtZXRhLmR1cmF0aW9uLCBtZXRhLnRpbWVzY2FsZSlcbiAgICBsZXQgdHJha1xuXG4gICAgaWYgKHR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgIHRyYWsgPSBGbXA0LnZpZGVvVHJhayhtZXRhKVxuICAgIH0gZWxzZSB7XG4gICAgICB0cmFrID0gRm1wNC5hdWRpb1RyYWsobWV0YSlcbiAgICB9XG5cbiAgICBsZXQgbXZleCA9IEZtcDQubXZleChtZXRhLmR1cmF0aW9uLCBtZXRhLnRpbWVzY2FsZSB8fCAxMDAwLCBtZXRhLmlkKTtcbiAgICBbbXZoZCwgdHJhaywgbXZleF0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KHNpemUsICdtb292JywgbXZoZCwgdHJhaywgbXZleClcbiAgfVxuICBzdGF0aWMgbXZoZCAoZHVyYXRpb24sIHRpbWVzY2FsZSA9IDEwMDApIHtcbiAgICAvLyBkdXJhdGlvbiAqPSB0aW1lc2NhbGU7XG4gICAgbGV0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gdmVyc2lvbigwKSArIGZsYWdzICAgICAx5L2N55qEYm9454mI5pysKzPkvY1mbGFncyAgIGJveOeJiOacrO+8jDDmiJYx77yM5LiA6Iis5Li6MOOAgu+8iOS7peS4i+Wtl+iKguaVsOWdh+aMiXZlcnNpb249MO+8iVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gY3JlYXRpb25fdGltZSAgICDliJvlu7rml7bpl7QgIO+8iOebuOWvueS6jlVUQ+aXtumXtDE5MDQtMDEtMDHpm7bngrnnmoTnp5LmlbDvvIlcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIG1vZGlmaWNhdGlvbl90aW1lICAg5L+u5pS55pe26Ze0XG5cbiAgICAgIC8qKlxuICAgICAgICAgICAgICogdGltZXNjYWxlOiA0IGJ5dGVz5paH5Lu25aqS5L2T5ZyoMeenkuaXtumXtOWGheeahOWIu+W6puWAvO+8jOWPr+S7peeQhuino+S4ujHnp5Lplb/luqZcbiAgICAgICAgICAgICAqL1xuICAgICAgKHRpbWVzY2FsZSA+Pj4gMjQpICYgMHhGRixcbiAgICAgICh0aW1lc2NhbGUgPj4+IDE2KSAmIDB4RkYsXG4gICAgICAodGltZXNjYWxlID4+PiA4KSAmIDB4RkYsXG4gICAgICAodGltZXNjYWxlKSAmIDB4RkYsXG5cbiAgICAgIC8qKlxuICAgICAgICAgICAgICogZHVyYXRpb246IDQgYnl0ZXPor6V0cmFja+eahOaXtumXtOmVv+W6pu+8jOeUqGR1cmF0aW9u5ZKMdGltZSBzY2FsZeWAvOWPr+S7peiuoeeul3RyYWNr5pe26ZW/77yM5q+U5aaCYXVkaW8gdHJhY2vnmoR0aW1lIHNjYWxlID0gODAwMCxcbiAgICAgICAgICAgICAqIGR1cmF0aW9uID0gNTYwMTI477yM5pe26ZW/5Li6NzAuMDE277yMdmlkZW8gdHJhY2vnmoR0aW1lIHNjYWxlID0gNjAwLCBkdXJhdGlvbiA9IDQyMDAw77yM5pe26ZW/5Li6NzBcbiAgICAgICAgICAgICAqL1xuICAgICAgKGR1cmF0aW9uID4+PiAyNCkgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uID4+PiAxNikgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uID4+PiA4KSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24pICYgMHhGRixcbiAgICAgIDB4MDAsIDB4MDEsIDB4MDAsIDB4MDAsIC8vIFByZWZlcnJlZCByYXRlOiAxLjAgICDmjqjojZDmkq3mlL7pgJ/njofvvIzpq5gxNuS9jeWSjOS9jjE25L2N5YiG5Yir5Li65bCP5pWw54K55pW05pWw6YOo5YiG5ZKM5bCP5pWw6YOo5YiG77yM5Y2zWzE2LjE2XSDmoLzlvI/vvIzor6XlgLzkuLoxLjDvvIgweDAwMDEwMDAw77yJ6KGo56S65q2j5bi45YmN5ZCR5pKt5pS+XG4gICAgICAvKipcbiAgICAgICAgICAgICAqIFByZWZlcnJlZFZvbHVtZSgxLjAsIDJieXRlcykgKyByZXNlcnZlZCgyYnl0ZXMpXG4gICAgICAgICAgICAgKiDkuI5yYXRl57G75Ly877yMWzguOF0g5qC85byP77yMMS4w77yIMHgwMTAw77yJ6KGo56S65pyA5aSn6Z+z6YePXG4gICAgICAgICAgICAgKi9cbiAgICAgIDB4MDEsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyAgcmVzZXJ2ZWQ6IDQgKyA0IGJ5dGVz5L+d55WZ5L2NXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMSwgMHgwMCwgMHgwMCwgLy8gLS0tLWJlZ2luIGNvbXBvc2l0aW9uIG1hdHJpeC0tLS1cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyDop4bpopHlj5jmjaLnn6npmLUgICDnur/mgKfku6PmlbBcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAxLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHg0MCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gLS0tLWVuZCBjb21wb3NpdGlvbiBtYXRyaXgtLS0tXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyAtLS0tYmVnaW4gcHJlX2RlZmluZWQgNiAqIDQgYnl0ZXMtLS0tXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcHJlLWRlZmluZWQg5L+d55WZ5L2NXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIC0tLS1lbmQgcHJlX2RlZmluZWQgNiAqIDQgYnl0ZXMtLS0tXG4gICAgICAweEZGLCAweEZGLCAweEZGLCAweEZGIC8vIG5leHRfdHJhY2tfSUQg5LiL5LiA5LiqdHJhY2vkvb/nlKjnmoRpZOWPt1xuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCg4ICsgYnl0ZXMubGVuZ3RoLCAnbXZoZCcsIG5ldyBVaW50OEFycmF5KGJ5dGVzKSlcbiAgfVxuICBzdGF0aWMgdmlkZW9UcmFrIChkYXRhKSB7XG4gICAgbGV0IHNpemUgPSA4XG5cbiAgICBsZXQgdGtoZCA9IEZtcDQudGtoZCh7XG4gICAgICBpZDogMSxcbiAgICAgIGR1cmF0aW9uOiBkYXRhLmR1cmF0aW9uLFxuICAgICAgdGltZXNjYWxlOiBkYXRhLnRpbWVzY2FsZSB8fCAxMDAwLFxuICAgICAgd2lkdGg6IGRhdGEucHJlc2VudFdpZHRoLFxuICAgICAgaGVpZ2h0OiBkYXRhLnByZXNlbnRIZWlnaHQsXG4gICAgICB0eXBlOiAndmlkZW8nXG4gICAgfSlcbiAgICBsZXQgbWRpYSA9IEZtcDQubWRpYSh7XG4gICAgICB0eXBlOiAndmlkZW8nLFxuICAgICAgdGltZXNjYWxlOiBkYXRhLnRpbWVzY2FsZSB8fCAxMDAwLFxuICAgICAgZHVyYXRpb246IGRhdGEuZHVyYXRpb24sXG4gICAgICBhdmNjOiBkYXRhLmF2Y2MsXG4gICAgICBwYXJSYXRpbzogZGF0YS5wYXJSYXRpbyxcbiAgICAgIHdpZHRoOiBkYXRhLnByZXNlbnRXaWR0aCxcbiAgICAgIGhlaWdodDogZGF0YS5wcmVzZW50SGVpZ2h0XG4gICAgfSk7XG4gICAgW3RraGQsIG1kaWFdLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aFxuICAgIH0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveChzaXplLCAndHJhaycsIHRraGQsIG1kaWEpXG4gIH1cbiAgc3RhdGljIGF1ZGlvVHJhayAoZGF0YSkge1xuICAgIGxldCBzaXplID0gOFxuICAgIGxldCB0a2hkID0gRm1wNC50a2hkKHtcbiAgICAgIGlkOiAyLFxuICAgICAgZHVyYXRpb246IGRhdGEuZHVyYXRpb24sXG4gICAgICB0aW1lc2NhbGU6IGRhdGEudGltZXNjYWxlIHx8IDEwMDAsXG4gICAgICB3aWR0aDogMCxcbiAgICAgIGhlaWdodDogMCxcbiAgICAgIHR5cGU6ICdhdWRpbydcbiAgICB9KVxuICAgIGxldCBtZGlhID0gRm1wNC5tZGlhKHtcbiAgICAgIHR5cGU6ICdhdWRpbycsXG4gICAgICB0aW1lc2NhbGU6IGRhdGEudGltZXNjYWxlIHx8IDEwMDAsXG4gICAgICBkdXJhdGlvbjogZGF0YS5kdXJhdGlvbixcbiAgICAgIGNoYW5uZWxDb3VudDogZGF0YS5jaGFubmVsQ291bnQsXG4gICAgICBzYW1wbGVyYXRlOiBkYXRhLnNhbXBsZVJhdGUsXG4gICAgICBjb25maWc6IGRhdGEuY29uZmlnXG4gICAgfSk7XG4gICAgW3RraGQsIG1kaWFdLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aFxuICAgIH0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveChzaXplLCAndHJhaycsIHRraGQsIG1kaWEpXG4gIH1cbiAgc3RhdGljIHRraGQgKGRhdGEpIHtcbiAgICBsZXQgaWQgPSBkYXRhLmlkXG4gICAgbGV0IGR1cmF0aW9uID0gZGF0YS5kdXJhdGlvblxuICAgIGxldCB3aWR0aCA9IGRhdGEud2lkdGhcbiAgICBsZXQgaGVpZ2h0ID0gZGF0YS5oZWlnaHRcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDcsIC8vIHZlcnNpb24oMCkgKyBmbGFncyAx5L2N54mI5pysIGJveOeJiOacrO+8jDDmiJYx77yM5LiA6Iis5Li6MOOAgu+8iOS7peS4i+Wtl+iKguaVsOWdh+aMiXZlcnNpb249MO+8ieaMieS9jeaIluaTjeS9nOe7k+aenOWAvO+8jOmihOWumuS5ieWmguS4i++8mlxuICAgICAgLy8gMHgwMDAwMDEgdHJhY2tfZW5hYmxlZO+8jOWQpuWImeivpXRyYWNr5LiN6KKr5pKt5pS+77ybXG4gICAgICAvLyAweDAwMDAwMiB0cmFja19pbl9tb3ZpZe+8jOihqOekuuivpXRyYWNr5Zyo5pKt5pS+5Lit6KKr5byV55So77ybXG4gICAgICAvLyAweDAwMDAwNCB0cmFja19pbl9wcmV2aWV377yM6KGo56S66K+ldHJhY2vlnKjpooTop4jml7booqvlvJXnlKjjgIJcbiAgICAgIC8vIOS4gOiIrOivpeWAvOS4ujfvvIwxKzIrNCDlpoLmnpzkuIDkuKrlqpLkvZPmiYDmnIl0cmFja+Wdh+acquiuvue9rnRyYWNrX2luX21vdmll5ZKMdHJhY2tfaW5fcHJldmlld++8jOWwhuiiq+eQhuino+S4uuaJgOaciXRyYWNr5Z2H6K6+572u5LqG6L+Z5Lik6aG577yb5a+55LqOaGludCB0cmFja++8jOivpeWAvOS4ujBcbiAgICAgIC8vIGhpbnQgdHJhY2sg6L+Z5Liq54m55q6K55qEdHJhY2vlubbkuI3ljIXlkKvlqpLkvZPmlbDmja7vvIzogIzmmK/ljIXlkKvkuobkuIDkupvlsIblhbbku5bmlbDmja50cmFja+aJk+WMheaIkOa1geWqkuS9k+eahOaMh+ekuuS/oeaBr+OAglxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gY3JlYXRpb25fdGltZeWIm+W7uuaXtumXtO+8iOebuOWvueS6jlVUQ+aXtumXtDE5MDQtMDEtMDHpm7bngrnnmoTnp5LmlbDvvIlcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIG1vZGlmaWNhdGlvbiB0aW1lIOS/ruaUueaXtumXtFxuICAgICAgKGlkID4+PiAyNCkgJiAweEZGLCAvLyB0cmFja19JRDogNCBieXRlcyBpZOWPt++8jOS4jeiDvemHjeWkjeS4lOS4jeiDveS4ujBcbiAgICAgIChpZCA+Pj4gMTYpICYgMHhGRixcbiAgICAgIChpZCA+Pj4gOCkgJiAweEZGLFxuICAgICAgKGlkKSAmIDB4RkYsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZDogNCBieXRlcyAgICDkv53nlZnkvY1cbiAgICAgIChkdXJhdGlvbiA+Pj4gMjQpICYgMHhGRiwgLy8gZHVyYXRpb246IDQgYnl0ZXMgdHJhY2vnmoTml7bpl7Tplb/luqZcbiAgICAgIChkdXJhdGlvbiA+Pj4gMTYpICYgMHhGRixcbiAgICAgIChkdXJhdGlvbiA+Pj4gOCkgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uKSAmIDB4RkYsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZDogMiAqIDQgYnl0ZXMgICAg5L+d55WZ5L2NXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gbGF5ZXIoMmJ5dGVzKSArIGFsdGVybmF0ZV9ncm91cCgyYnl0ZXMpICDop4bpopHlsYLvvIzpu5jorqTkuLow77yM5YC85bCP55qE5Zyo5LiK5bGCLnRyYWNr5YiG57uE5L+h5oGv77yM6buY6K6k5Li6MOihqOekuuivpXRyYWNr5pyq5LiO5YW25LuWdHJhY2vmnInnvqTnu4TlhbPns7tcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHZvbHVtZSgyYnl0ZXMpICsgcmVzZXJ2ZWQoMmJ5dGVzKSAgICBbOC44XSDmoLzlvI/vvIzlpoLmnpzkuLrpn7PpopF0cmFja++8jDEuMO+8iDB4MDEwMO+8ieihqOekuuacgOWkp+mfs+mHj++8m+WQpuWImeS4ujAgICAr5L+d55WZ5L2NXG4gICAgICAweDAwLCAweDAxLCAweDAwLCAweDAwLCAvLyAtLS0tYmVnaW4gY29tcG9zaXRpb24gbWF0cml4LS0tLVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMSwgMHgwMCwgMHgwMCwgLy8g6KeG6aKR5Y+Y5o2i55+p6Zi1XG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDQwLCAweDAwLCAweDAwLCAweDAwLCAvLyAtLS0tZW5kIGNvbXBvc2l0aW9uIG1hdHJpeC0tLS1cbiAgICAgICh3aWR0aCA+Pj4gOCkgJiAweEZGLCAvLyAvL+WuveW6plxuICAgICAgKHdpZHRoKSAmIDB4RkYsXG4gICAgICAweDAwLCAweDAwLFxuICAgICAgKGhlaWdodCA+Pj4gOCkgJiAweEZGLCAvLyDpq5jluqZcbiAgICAgIChoZWlnaHQpICYgMHhGRixcbiAgICAgIDB4MDAsIDB4MDBcbiAgICBdKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goOCArIGNvbnRlbnQuYnl0ZUxlbmd0aCwgJ3RraGQnLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyBlZHRzIChkYXRhKSB7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGxldCBkdXJhdGlvbiA9IGRhdGEuZHVyYXRpb25cbiAgICBsZXQgbWVkaWFUaW1lID0gZGF0YS5tZWRpYVRpbWVcbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKDM2KSwgRm1wNC50eXBlKCdlZHRzJykpXG4gICAgLy8gZWxzdFxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoMjgpLCBGbXA0LnR5cGUoJ2Vsc3QnKSlcbiAgICBidWZmZXIud3JpdGUobmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMSwgLy8gZW50cnkgY291bnRcbiAgICAgIChkdXJhdGlvbiA+PiAyNCkgJiAweGZmLCAoZHVyYXRpb24gPj4gMTYpICYgMHhmZiwgKGR1cmF0aW9uID4+IDgpICYgMHhmZiwgZHVyYXRpb24gJiAweGZmLFxuICAgICAgKG1lZGlhVGltZSA+PiAyNCkgJiAweGZmLCAobWVkaWFUaW1lID4+IDE2KSAmIDB4ZmYsIChtZWRpYVRpbWUgPj4gOCkgJiAweGZmLCBtZWRpYVRpbWUgJiAweGZmLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMSAvLyBtZWRpYSByYXRlXG4gICAgXSkpXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgbWRpYSAoZGF0YSkge1xuICAgIGxldCBzaXplID0gOFxuICAgIGxldCBtZGhkID0gRm1wNC5tZGhkKGRhdGEudGltZXNjYWxlLCBkYXRhLmR1cmF0aW9uKVxuICAgIGxldCBoZGxyID0gRm1wNC5oZGxyKGRhdGEudHlwZSlcbiAgICBsZXQgbWluZiA9IEZtcDQubWluZihkYXRhKTtcbiAgICBbbWRoZCwgaGRsciwgbWluZl0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KHNpemUsICdtZGlhJywgbWRoZCwgaGRsciwgbWluZilcbiAgfVxuICBzdGF0aWMgbWRoZCAodGltZXNjYWxlID0gMTAwMCwgZHVyYXRpb24pIHtcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGNyZWF0aW9uX3RpbWUgICAg5Yib5bu65pe26Ze0XG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBtb2RpZmljYXRpb25fdGltZeS/ruaUueaXtumXtFxuICAgICAgKHRpbWVzY2FsZSA+Pj4gMjQpICYgMHhGRiwgLy8gdGltZXNjYWxlOiA0IGJ5dGVzICAgIOaWh+S7tuWqkuS9k+WcqDHnp5Lml7bpl7TlhoXnmoTliLvluqblgLzvvIzlj6/ku6XnkIbop6PkuLox56eS6ZW/5bqmXG4gICAgICAodGltZXNjYWxlID4+PiAxNikgJiAweEZGLFxuICAgICAgKHRpbWVzY2FsZSA+Pj4gOCkgJiAweEZGLFxuICAgICAgKHRpbWVzY2FsZSkgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uID4+PiAyNCkgJiAweEZGLCAvLyBkdXJhdGlvbjogNCBieXRlcyAgdHJhY2vnmoTml7bpl7Tplb/luqZcbiAgICAgIChkdXJhdGlvbiA+Pj4gMTYpICYgMHhGRixcbiAgICAgIChkdXJhdGlvbiA+Pj4gOCkgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uKSAmIDB4RkYsXG4gICAgICAweDU1LCAweEM0LCAvLyBsYW5ndWFnZTogdW5kICh1bmRldGVybWluZWQpIOWqkuS9k+ivreiogOeggeOAguacgOmrmOS9jeS4ujDvvIzlkI7pnaIxNeS9jeS4ujPkuKrlrZfnrKbvvIjop4FJU08gNjM5LTIvVOagh+WHhuS4reWumuS5ie+8iVxuICAgICAgMHgwMCwgMHgwMCAvLyBwcmVfZGVmaW5lZCA9IDBcbiAgICBdKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTIgKyBjb250ZW50LmJ5dGVMZW5ndGgsICdtZGhkJywgRm1wNC5leHRlbnNpb24oMCwgMCksIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIGhkbHIgKHR5cGUpIHtcbiAgICBsZXQgdmFsdWUgPSBbMHgwMCwgLy8gdmVyc2lvbiAwXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcHJlX2RlZmluZWRcbiAgICAgIDB4NzYsIDB4NjksIDB4NjQsIDB4NjUsIC8vIGhhbmRsZXJfdHlwZTogJ3ZpZGUnXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDU2LCAweDY5LCAweDY0LCAweDY1LFxuICAgICAgMHg2ZiwgMHg0OCwgMHg2MSwgMHg2ZSxcbiAgICAgIDB4NjQsIDB4NmMsIDB4NjUsIDB4NzIsIDB4MDAgLy8gbmFtZTogJ1ZpZGVvSGFuZGxlcidcbiAgICBdXG4gICAgaWYgKHR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgIHZhbHVlLnNwbGljZSg4LCA0LCAuLi5bMHg3MywgMHg2ZiwgMHg3NSwgMHg2ZV0pXG4gICAgICB2YWx1ZS5zcGxpY2UoMjQsIDEzLCAuLi5bMHg1MywgMHg2ZiwgMHg3NSwgMHg2ZSxcbiAgICAgICAgMHg2NCwgMHg0OCwgMHg2MSwgMHg2ZSxcbiAgICAgICAgMHg2NCwgMHg2YywgMHg2NSwgMHg3MiwgMHgwMF0pXG4gICAgfVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goOCArIHZhbHVlLmxlbmd0aCwgJ2hkbHInLCBuZXcgVWludDhBcnJheSh2YWx1ZSkpXG4gIH1cbiAgc3RhdGljIG1pbmYgKGRhdGEpIHtcbiAgICBsZXQgc2l6ZSA9IDhcbiAgICBsZXQgdm1oZCA9IGRhdGEudHlwZSA9PT0gJ3ZpZGVvJyA/IEZtcDQudm1oZCgpIDogRm1wNC5zbWhkKClcbiAgICBsZXQgZGluZiA9IEZtcDQuZGluZigpXG4gICAgbGV0IHN0YmwgPSBGbXA0LnN0YmwoZGF0YSk7XG4gICAgW3ZtaGQsIGRpbmYsIHN0YmxdLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aFxuICAgIH0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveChzaXplLCAnbWluZicsIHZtaGQsIGRpbmYsIHN0YmwpXG4gIH1cbiAgc3RhdGljIHZtaGQgKCkge1xuICAgIHJldHVybiBGbXA0LmluaXRCb3goMjAsICd2bWhkJywgbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgLy8gdmVyc2lvblxuICAgICAgMHgwMCwgMHgwMCwgMHgwMSwgLy8gZmxhZ3NcbiAgICAgIDB4MDAsIDB4MDAsIC8vIGdyYXBoaWNzbW9kZVxuICAgICAgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwIC8vIG9wY29sb3JcbiAgICBdKSlcbiAgfVxuICBzdGF0aWMgc21oZCAoKSB7XG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxNiwgJ3NtaGQnLCBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgLy8gYmFsYW5jZVxuICAgICAgMHgwMCwgMHgwMCAvLyByZXNlcnZlZFxuICAgIF0pKVxuICB9XG4gIHN0YXRpYyBkaW5mICgpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IGRyZWYgPSBbMHgwMCwgLy8gdmVyc2lvbiAwXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMSwgLy8gZW50cnlfY291bnRcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MGMsIC8vIGVudHJ5X3NpemVcbiAgICAgIDB4NzUsIDB4NzIsIDB4NmMsIDB4MjAsIC8vICd1cmwnIHR5cGVcbiAgICAgIDB4MDAsIC8vIHZlcnNpb24gMFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMSAvLyBlbnRyeV9mbGFnc1xuICAgIF1cbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKDM2KSwgRm1wNC50eXBlKCdkaW5mJyksIEZtcDQuc2l6ZSgyOCksIEZtcDQudHlwZSgnZHJlZicpLCBuZXcgVWludDhBcnJheShkcmVmKSlcbiAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlclxuICB9XG4gIHN0YXRpYyBzdGJsIChkYXRhKSB7XG4gICAgbGV0IHNpemUgPSA4XG4gICAgbGV0IHN0c2QgPSBGbXA0LnN0c2QoZGF0YSlcbiAgICBsZXQgc3R0cyA9IEZtcDQuc3R0cygpXG4gICAgbGV0IHN0c2MgPSBGbXA0LnN0c2MoKVxuICAgIGxldCBzdHN6ID0gRm1wNC5zdHN6KClcbiAgICBsZXQgc3RjbyA9IEZtcDQuc3RjbygpO1xuICAgIFtzdHNkLCBzdHRzLCBzdHNjLCBzdHN6LCBzdGNvXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGhcbiAgICB9KVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goc2l6ZSwgJ3N0YmwnLCBzdHNkLCBzdHRzLCBzdHNjLCBzdHN6LCBzdGNvKVxuICB9XG4gIHN0YXRpYyBzdHNkIChkYXRhKSB7XG4gICAgbGV0IGNvbnRlbnRcbiAgICBpZiAoZGF0YS50eXBlID09PSAnYXVkaW8nKSB7XG4gICAgICAvLyBpZiAoIWRhdGEuaXNBQUMgJiYgZGF0YS5jb2RlYyA9PT0gJ21wNCcpIHtcbiAgICAgIC8vICAgICBjb250ZW50ID0gRk1QNC5tcDMoZGF0YSk7XG4gICAgICAvLyB9IGVsc2Uge1xuICAgICAgLy9cbiAgICAgIC8vIH1cbiAgICAgIC8vIOaUr+aMgW1wNGFcbiAgICAgIGNvbnRlbnQgPSBGbXA0Lm1wNGEoZGF0YSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29udGVudCA9IEZtcDQuYXZjMShkYXRhKVxuICAgIH1cbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDE2ICsgY29udGVudC5ieXRlTGVuZ3RoLCAnc3RzZCcsIEZtcDQuZXh0ZW5zaW9uKDAsIDApLCBuZXcgVWludDhBcnJheShbMHgwMCwgMHgwMCwgMHgwMCwgMHgwMV0pLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyBtcDRhIChkYXRhKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIDB4MDEsIC8vIGRhdGFfcmVmZXJlbmNlX2luZGV4XG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIGRhdGEuY2hhbm5lbENvdW50LCAvLyBjaGFubmVsY291bnRcbiAgICAgIDB4MDAsIDB4MTAsIC8vIHNhbXBsZVNpemU6MTZiaXRzXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZDJcbiAgICAgIChkYXRhLnNhbXBsZXJhdGUgPj4gOCkgJiAweGZmLFxuICAgICAgZGF0YS5zYW1wbGVyYXRlICYgMHhmZiwgLy9cbiAgICAgIDB4MDAsIDB4MDBcbiAgICBdKVxuICAgIGxldCBlc2RzID0gRm1wNC5lc2RzKGRhdGEuY29uZmlnKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goOCArIGNvbnRlbnQuYnl0ZUxlbmd0aCArIGVzZHMuYnl0ZUxlbmd0aCwgJ21wNGEnLCBjb250ZW50LCBlc2RzKVxuICB9XG4gIHN0YXRpYyBlc2RzIChjb25maWcgPSBbNDMsIDE0NiwgOCwgMF0pIHtcbiAgICBjb25zdCBjb25maWdsZW4gPSBjb25maWcubGVuZ3RoXG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgLy8gdmVyc2lvbiAwXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuXG4gICAgICAweDAzLCAvLyBkZXNjcmlwdG9yX3R5cGVcbiAgICAgIDB4MTcgKyBjb25maWdsZW4sIC8vIGxlbmd0aFxuICAgICAgMHgwMCwgMHgwMSwgLy8gZXNfaWRcbiAgICAgIDB4MDAsIC8vIHN0cmVhbV9wcmlvcml0eVxuXG4gICAgICAweDA0LCAvLyBkZXNjcmlwdG9yX3R5cGVcbiAgICAgIDB4MGYgKyBjb25maWdsZW4sIC8vIGxlbmd0aFxuICAgICAgMHg0MCwgLy8gY29kZWMgOiBtcGVnNF9hdWRpb1xuICAgICAgMHgxNSwgLy8gc3RyZWFtX3R5cGVcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGJ1ZmZlcl9zaXplXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBtYXhCaXRyYXRlXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBhdmdCaXRyYXRlXG5cbiAgICAgIDB4MDUgLy8gZGVzY3JpcHRvcl90eXBlXG4gICAgXS5jb25jYXQoW2NvbmZpZ2xlbl0pLmNvbmNhdChjb25maWcpLmNvbmNhdChbMHgwNiwgMHgwMSwgMHgwMl0pKVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoOCArIGNvbnRlbnQuYnl0ZUxlbmd0aCksIEZtcDQudHlwZSgnZXNkcycpLCBjb250ZW50KVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIGF2YzEgKGRhdGEpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IHNpemUgPSA0MC8vIDgoYXZjMSkrOChhdmNjKSs4KGJ0cnQpKzE2KHBhc3ApXG4gICAgLy8gbGV0IHNwcyA9IGRhdGEuc3BzXG4gICAgLy8gbGV0IHBwcyA9IGRhdGEucHBzXG4gICAgbGV0IHdpZHRoID0gZGF0YS53aWR0aFxuICAgIGxldCBoZWlnaHQgPSBkYXRhLmhlaWdodFxuICAgIGxldCBoU3BhY2luZyA9IGRhdGEucGFyUmF0aW8uaGVpZ2h0XG4gICAgbGV0IHZTcGFjaW5nID0gZGF0YS5wYXJSYXRpby53aWR0aFxuICAgIC8vIGxldCBhdmNjQnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgLy8gYXZjY0J1ZmZlci53cml0ZShuZXcgVWludDhBcnJheShbXG4gICAgLy8gICAweDAxLCAvLyB2ZXJzaW9uXG4gICAgLy8gICBzcHNbMV0sIC8vIHByb2ZpbGVcbiAgICAvLyAgIHNwc1syXSwgLy8gcHJvZmlsZSBjb21wYXRpYmxlXG4gICAgLy8gICBzcHNbM10sIC8vIGxldmVsXG4gICAgLy8gICAweGZjIHwgMyxcbiAgICAvLyAgIDB4RTAgfCAxIC8vIOebruWJjeWPquWkhOeQhuS4gOS4qnNwc1xuICAgIC8vIF0uY29uY2F0KFtzcHMubGVuZ3RoID4+PiA4ICYgMHhmZiwgc3BzLmxlbmd0aCAmIDB4ZmZdKSkpXG4gICAgLy8gYXZjY0J1ZmZlci53cml0ZShzcHMsIG5ldyBVaW50OEFycmF5KFsxLCBwcHMubGVuZ3RoID4+PiA4ICYgMHhmZiwgcHBzLmxlbmd0aCAmIDB4ZmZdKSwgcHBzKVxuXG4gICAgbGV0IGF2Y2MgPSBkYXRhLmF2Y2NcbiAgICBsZXQgYXZjMSA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMSwgLy8gZGF0YV9yZWZlcmVuY2VfaW5kZXhcbiAgICAgIDB4MDAsIDB4MDAsIC8vIHByZV9kZWZpbmVkXG4gICAgICAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBwcmVfZGVmaW5lZFxuICAgICAgKHdpZHRoID4+IDgpICYgMHhmZixcbiAgICAgIHdpZHRoICYgMHhmZiwgLy8gd2lkdGhcbiAgICAgIChoZWlnaHQgPj4gOCkgJiAweGZmLFxuICAgICAgaGVpZ2h0ICYgMHhmZiwgLy8gaGVpZ2h0XG4gICAgICAweDAwLCAweDQ4LCAweDAwLCAweDAwLCAvLyBob3JpenJlc29sdXRpb25cbiAgICAgIDB4MDAsIDB4NDgsIDB4MDAsIDB4MDAsIC8vIHZlcnRyZXNvbHV0aW9uXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMSwgLy8gZnJhbWVfY291bnRcbiAgICAgIDB4MTIsXG4gICAgICAweDY0LCAweDYxLCAweDY5LCAweDZDLCAvLyBkYWlseW1vdGlvbi9obHMuanNcbiAgICAgIDB4NzksIDB4NkQsIDB4NkYsIDB4NzQsXG4gICAgICAweDY5LCAweDZGLCAweDZFLCAweDJGLFxuICAgICAgMHg2OCwgMHg2QywgMHg3MywgMHgyRSxcbiAgICAgIDB4NkEsIDB4NzMsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGNvbXByZXNzb3JuYW1lXG4gICAgICAweDAwLCAweDE4LCAvLyBkZXB0aCA9IDI0XG4gICAgICAweDExLCAweDExXSkgLy8gcHJlX2RlZmluZWQgPSAtMVxuICAgIGxldCBidHJ0ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgxYywgMHg5YywgMHg4MCwgLy8gYnVmZmVyU2l6ZURCXG4gICAgICAweDAwLCAweDJkLCAweGM2LCAweGMwLCAvLyBtYXhCaXRyYXRlXG4gICAgICAweDAwLCAweDJkLCAweGM2LCAweGMwIC8vIGF2Z0JpdHJhdGVcbiAgICBdKVxuICAgIGxldCBwYXNwID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgKGhTcGFjaW5nID4+IDI0KSwgLy8gaFNwYWNpbmdcbiAgICAgIChoU3BhY2luZyA+PiAxNikgJiAweGZmLFxuICAgICAgKGhTcGFjaW5nID4+IDgpICYgMHhmZixcbiAgICAgIGhTcGFjaW5nICYgMHhmZixcbiAgICAgICh2U3BhY2luZyA+PiAyNCksIC8vIHZTcGFjaW5nXG4gICAgICAodlNwYWNpbmcgPj4gMTYpICYgMHhmZixcbiAgICAgICh2U3BhY2luZyA+PiA4KSAmIDB4ZmYsXG4gICAgICB2U3BhY2luZyAmIDB4ZmZcbiAgICBdKVxuXG4gICAgYnVmZmVyLndyaXRlKFxuICAgICAgRm1wNC5zaXplKHNpemUgKyBhdmMxLmJ5dGVMZW5ndGggKyBhdmNjLmJ5dGVMZW5ndGggKyBidHJ0LmJ5dGVMZW5ndGgpLCBGbXA0LnR5cGUoJ2F2YzEnKSwgYXZjMSxcbiAgICAgIEZtcDQuc2l6ZSg4ICsgYXZjYy5ieXRlTGVuZ3RoKSwgRm1wNC50eXBlKCdhdmNDJyksIGF2Y2MsXG4gICAgICBGbXA0LnNpemUoMjApLCBGbXA0LnR5cGUoJ2J0cnQnKSwgYnRydCxcbiAgICAgIEZtcDQuc2l6ZSgxNiksIEZtcDQudHlwZSgncGFzcCcpLCBwYXNwXG4gICAgKVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIHN0dHMgKCkge1xuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgLy8gdmVyc2lvblxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAgLy8gZW50cnlfY291bnRcbiAgICBdKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTYsICdzdHRzJywgY29udGVudClcbiAgfVxuICBzdGF0aWMgc3RzYyAoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCAvLyBlbnRyeV9jb3VudFxuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxNiwgJ3N0c2MnLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyBzdGNvICgpIHtcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIC8vIHZlcnNpb25cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwIC8vIGVudHJ5X2NvdW50XG4gICAgXSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDE2LCAnc3RjbycsIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIHN0c3ogKCkge1xuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgLy8gdmVyc2lvblxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHNhbXBsZV9zaXplXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwIC8vIHNhbXBsZV9jb3VudFxuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgyMCwgJ3N0c3onLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyBtdmV4IChkdXJhdGlvbiwgdGltZXNjYWxlID0gMTAwMCwgdHJhY2tJRCkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgbWVoZCA9IEJ1ZmZlci53cml0ZVVpbnQzMihkdXJhdGlvbilcbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKDU2KSwgRm1wNC50eXBlKCdtdmV4JyksIEZtcDQuc2l6ZSgxNiksIEZtcDQudHlwZSgnbWVoZCcpLCBGbXA0LmV4dGVuc2lvbigwLCAwKSwgbWVoZCwgRm1wNC50cmV4KHRyYWNrSUQpKVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIHRyZXggKGlkKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uIDBcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAoaWQgPj4gMjQpLFxuICAgICAgKGlkID4+IDE2KSAmIDB4ZmYsXG4gICAgICAoaWQgPj4gOCkgJiAweGZmLFxuICAgICAgKGlkICYgMHhmZiksIC8vIHRyYWNrX0lEXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAxLCAvLyBkZWZhdWx0X3NhbXBsZV9kZXNjcmlwdGlvbl9pbmRleFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZGVmYXVsdF9zYW1wbGVfZHVyYXRpb25cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGRlZmF1bHRfc2FtcGxlX3NpemVcbiAgICAgIDB4MDAsIDB4MDEsIDB4MDAsIDB4MDEgLy8gZGVmYXVsdF9zYW1wbGVfZmxhZ3NcbiAgICBdKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goOCArIGNvbnRlbnQuYnl0ZUxlbmd0aCwgJ3RyZXgnLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyBtb29mIChkYXRhKSB7XG4gICAgbGV0IHNpemUgPSA4XG4gICAgbGV0IG1maGQgPSBGbXA0Lm1maGQoKVxuICAgIGxldCB0cmFmID0gRm1wNC50cmFmKGRhdGEpO1xuICAgIFttZmhkLCB0cmFmXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGhcbiAgICB9KVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goc2l6ZSwgJ21vb2YnLCBtZmhkLCB0cmFmKVxuICB9XG4gIHN0YXRpYyBtZmhkICgpIHtcbiAgICBsZXQgY29udGVudCA9IEJ1ZmZlci53cml0ZVVpbnQzMihGbXA0LnNlcXVlbmNlKVxuICAgIEZtcDQuc2VxdWVuY2UgKz0gMVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTYsICdtZmhkJywgRm1wNC5leHRlbnNpb24oMCwgMCksIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIHRyYWYgKGRhdGEpIHtcbiAgICBsZXQgc2l6ZSA9IDhcbiAgICBsZXQgdGZoZCA9IEZtcDQudGZoZChkYXRhLmlkKVxuICAgIGxldCB0ZmR0ID0gRm1wNC50ZmR0KGRhdGEudGltZSlcbiAgICBsZXQgc2R0cCA9IEZtcDQuc2R0cChkYXRhKVxuICAgIGxldCB0cnVuID0gRm1wNC50cnVuKGRhdGEsIHNkdHAuYnl0ZUxlbmd0aCk7XG5cbiAgICBbdGZoZCwgdGZkdCwgdHJ1biwgc2R0cF0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KHNpemUsICd0cmFmJywgdGZoZCwgdGZkdCwgdHJ1biwgc2R0cClcbiAgfVxuICBzdGF0aWMgdGZoZCAoaWQpIHtcbiAgICBsZXQgY29udGVudCA9IEJ1ZmZlci53cml0ZVVpbnQzMihpZClcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDE2LCAndGZoZCcsIEZtcDQuZXh0ZW5zaW9uKDAsIDApLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyB0ZmR0ICh0aW1lKSB7XG4gICAgLy8gbGV0IHVwcGVyID0gTWF0aC5mbG9vcih0aW1lIC8gKFVJTlQzMl9NQVggKyAxKSksXG4gICAgLy8gICAgIGxvd2VyID0gTWF0aC5mbG9vcih0aW1lICUgKFVJTlQzMl9NQVggKyAxKSk7XG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxNiwgJ3RmZHQnLCBGbXA0LmV4dGVuc2lvbigwLCAwKSwgQnVmZmVyLndyaXRlVWludDMyKHRpbWUpKVxuICB9XG4gIHN0YXRpYyB0cnVuIChkYXRhLCBzZHRwTGVuZ3RoKSB7XG4gICAgLy8gbGV0IGlkID0gZGF0YS5pZDtcbiAgICAvLyBsZXQgY2VpbCA9IGlkID09PSAxID8gMTYgOiAxMjtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IHNhbXBsZUNvdW50ID0gQnVmZmVyLndyaXRlVWludDMyKGRhdGEuc2FtcGxlcy5sZW5ndGgpXG4gICAgLy8gbWRhdC1oZWFkZXIgOFxuICAgIC8vIG1vb2YtaGVhZGVyIDhcbiAgICAvLyBtZmhkIDE2XG4gICAgLy8gdHJhZi1oZWFkZXIgOFxuICAgIC8vIHRoaGQgMTZcbiAgICAvLyB0ZmR0IDIwXG4gICAgLy8gdHJ1bi1oZWFkZXIgMTJcbiAgICAvLyBzYW1wbGVDb3VudCA0XG4gICAgLy8gZGF0YS1vZmZzZXQgNFxuICAgIC8vIHNhbXBsZXMubGVuZ3RoXG4gICAgbGV0IG9mZnNldCA9IEJ1ZmZlci53cml0ZVVpbnQzMig4ICsgOCArIDE2ICsgOCArIDE2ICsgMTYgKyAxMiArIDQgKyA0ICsgMTYgKiBkYXRhLnNhbXBsZXMubGVuZ3RoICsgc2R0cExlbmd0aClcbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKDIwICsgMTYgKiBkYXRhLnNhbXBsZXMubGVuZ3RoKSwgRm1wNC50eXBlKCd0cnVuJyksIG5ldyBVaW50OEFycmF5KFsweDAwLCAweDAwLCAweDBGLCAweDAxXSksIHNhbXBsZUNvdW50LCBvZmZzZXQpXG5cbiAgICAvLyBsZXQgc2l6ZSA9IGJ1ZmZlci5idWZmZXIuYnl0ZUxlbmd0aFxuICAgIC8vIGxldCB3cml0ZU9mZnNldCA9IDBcbiAgICAvLyBkYXRhLnNhbXBsZXMuZm9yRWFjaCgoKSA9PiB7XG4gICAgLy8gICBzaXplICs9IDE2XG4gICAgLy8gfSlcbiAgICAvL1xuICAgIC8vIGxldCB0cnVuQm94ID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSlcblxuICAgIC8vIHRydW5Cb3guc2V0KGJ1ZmZlci5idWZmZXIsIDApXG5cbiAgICBkYXRhLnNhbXBsZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgZmxhZ3MgPSBpdGVtLmZsYWdzXG4gICAgICAvLyBjb25zb2xlLmxvZyhpdGVtLnR5cGUsIGl0ZW0uZHRzLCBpdGVtLmR1cmF0aW9uKVxuXG4gICAgICBidWZmZXIud3JpdGUobmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAoaXRlbS5kdXJhdGlvbiA+Pj4gMjQpICYgMHhGRiwgLy8gc2FtcGxlX2R1cmF0aW9uXG4gICAgICAgIChpdGVtLmR1cmF0aW9uID4+PiAxNikgJiAweEZGLFxuICAgICAgICAoaXRlbS5kdXJhdGlvbiA+Pj4gOCkgJiAweEZGLFxuICAgICAgICAoaXRlbS5kdXJhdGlvbikgJiAweEZGLFxuICAgICAgICAoaXRlbS5zaXplID4+PiAyNCkgJiAweEZGLCAvLyBzYW1wbGVfc2l6ZVxuICAgICAgICAoaXRlbS5zaXplID4+PiAxNikgJiAweEZGLFxuICAgICAgICAoaXRlbS5zaXplID4+PiA4KSAmIDB4RkYsXG4gICAgICAgIChpdGVtLnNpemUpICYgMHhGRixcbiAgICAgICAgKGZsYWdzLmlzTGVhZGluZyA8PCAyKSB8IGZsYWdzLmRlcGVuZHNPbiwgLy8gc2FtcGxlX2ZsYWdzXG4gICAgICAgIChmbGFncy5pc0RlcGVuZGVkT24gPDwgNikgfCAoZmxhZ3MuaGFzUmVkdW5kYW5jeSA8PCA0KSB8IGZsYWdzLmlzTm9uU3luYyxcbiAgICAgICAgMHgwMCwgMHgwMCwgLy8gc2FtcGxlX2RlZ3JhZGF0aW9uX3ByaW9yaXR5XG4gICAgICAgIChpdGVtLmN0cyA+Pj4gMjQpICYgMHhGRiwgLy8gc2FtcGxlX2NvbXBvc2l0aW9uX3RpbWVfb2Zmc2V0XG4gICAgICAgIChpdGVtLmN0cyA+Pj4gMTYpICYgMHhGRixcbiAgICAgICAgKGl0ZW0uY3RzID4+PiA4KSAmIDB4RkYsXG4gICAgICAgIChpdGVtLmN0cykgJiAweEZGXG4gICAgICBdKSlcbiAgICAgIC8vIHdyaXRlT2Zmc2V0ICs9IDE2XG4gICAgICAvLyBidWZmZXIud3JpdGUoQnVmZmVyLndyaXRlVWludDMyKDApKTtcbiAgICB9KVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIHNkdHAgKGRhdGEpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgYnVmZmVyLndyaXRlKEZtcDQuc2l6ZSgxMiArIGRhdGEuc2FtcGxlcy5sZW5ndGgpLCBGbXA0LnR5cGUoJ3NkdHAnKSwgRm1wNC5leHRlbnNpb24oMCwgMCkpXG4gICAgZGF0YS5zYW1wbGVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBjb25zdCBmbGFncyA9IGl0ZW0uZmxhZ3NcbiAgICAgIGNvbnN0IG51bSA9IChmbGFncy5pc0xlYWRpbmcgPDwgNikgfCAvLyBpc19sZWFkaW5nOiAyIChiaXQpXG4gICAgICAgIChmbGFncy5kZXBlbmRzT24gPDwgNCkgfCAvLyBzYW1wbGVfZGVwZW5kc19vblxuICAgICAgICAoZmxhZ3MuaXNEZXBlbmRlZE9uIDw8IDIpIHwgLy8gc2FtcGxlX2lzX2RlcGVuZGVkX29uXG4gICAgICAgIChmbGFncy5oYXNSZWR1bmRhbmN5KS8vIHNhbXBsZV9oYXNfcmVkdW5kYW5jeVxuXG4gICAgICBidWZmZXIud3JpdGUobmV3IFVpbnQ4QXJyYXkoW251bV0pKVxuICAgIH0pXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgbWRhdCAoZGF0YSkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgc2l6ZSA9IDhcbiAgICBkYXRhLnNhbXBsZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5zaXplXG4gICAgfSlcbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKHNpemUpLCBGbXA0LnR5cGUoJ21kYXQnKSlcbiAgICBsZXQgbWRhdEJveCA9IG5ldyBVaW50OEFycmF5KHNpemUpXG4gICAgbGV0IG9mZnNldCA9IDBcbiAgICBtZGF0Qm94LnNldChidWZmZXIuYnVmZmVyLCBvZmZzZXQpXG4gICAgb2Zmc2V0ICs9IDhcbiAgICBkYXRhLnNhbXBsZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGl0ZW0uYnVmZmVyLmZvckVhY2goKHVuaXQpID0+IHtcbiAgICAgICAgbWRhdEJveC5zZXQodW5pdCwgb2Zmc2V0KVxuICAgICAgICBvZmZzZXQgKz0gdW5pdC5ieXRlTGVuZ3RoXG4gICAgICAgIC8vIGJ1ZmZlci53cml0ZSh1bml0LmRhdGEpO1xuICAgICAgfSlcbiAgICB9KVxuICAgIHJldHVybiBtZGF0Qm94XG4gIH1cbn1cbkZtcDQudHlwZSA9IChuYW1lKSA9PiB7XG4gIHJldHVybiBuZXcgVWludDhBcnJheShbbmFtZS5jaGFyQ29kZUF0KDApLCBuYW1lLmNoYXJDb2RlQXQoMSksIG5hbWUuY2hhckNvZGVBdCgyKSwgbmFtZS5jaGFyQ29kZUF0KDMpXSlcbn1cbkZtcDQuc2VxdWVuY2UgPSAxXG5cbmV4cG9ydCBkZWZhdWx0IEZtcDRcbiIsImltcG9ydCB7XG4gIEVWRU5UUyxcbiAgc25pZmZlcixcbiAgTWVkaWFTZWdtZW50TGlzdCxcbiAgQnVmZmVyXG59IGZyb20gJ3hncGxheWVyLXV0aWxzJztcbmltcG9ydCBGbXA0IGZyb20gJy4vZm1wNCdcblxuY29uc3QgUkVNVVhfRVZFTlRTID0gRVZFTlRTLlJFTVVYX0VWRU5UU1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNcDRSZW11eGVyIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuX2R0c0Jhc2UgPSAwXG4gICAgdGhpcy5faXNEdHNCYXNlSW5pdGVkID0gZmFsc2VcblxuICAgIHRoaXMudmlkZW9BbGxEdXJhdGlvbiA9IDBcbiAgICB0aGlzLmF1ZGlvQWxsRHVyYXRpb24gPSAwXG4gIH1cblxuICBpbml0ICgpIHtcbiAgICB0aGlzLm9uKFJFTVVYX0VWRU5UUy5SRU1VWF9NRURJQSwgdGhpcy5yZW11eC5iaW5kKHRoaXMpKVxuICAgIHRoaXMub24oUkVNVVhfRVZFTlRTLlJFTVVYX01FVEFEQVRBLCB0aGlzLm9uTWV0YURhdGFSZWFkeS5iaW5kKHRoaXMpKVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5fZHRzQmFzZSA9IC0xXG4gICAgdGhpcy5fZHRzQmFzZUluaXRlZCA9IGZhbHNlXG4gIH1cblxuICByZXNldCAoKSB7XG4gICAgdGhpcy5fZHRzQmFzZSA9IDBcbiAgICB0aGlzLl9pc0R0c0Jhc2VJbml0ZWQgPSBmYWxzZVxuICB9XG5cbiAgcmVtdXggKCkge1xuICAgIGNvbnN0IHsgYXVkaW9UcmFjaywgdmlkZW9UcmFjayB9ID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJylcbiAgICAhdGhpcy5faXNEdHNCYXNlSW5pdGVkICYmIHRoaXMuY2FsY0R0c0Jhc2UoYXVkaW9UcmFjaywgdmlkZW9UcmFjaylcblxuICAgIHRoaXMuX3JlbXV4VmlkZW8odmlkZW9UcmFjaylcbiAgICB0aGlzLl9yZW11eEF1ZGlvKGF1ZGlvVHJhY2spXG4gIH1cblxuICBzZWVrICgpIHtcblxuICB9XG5cbiAgb25NZXRhRGF0YVJlYWR5ICh0eXBlKSB7XG4gICAgbGV0IGluaXRTZWdtZW50ID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IGZ0eXAgPSBGbXA0LmZ0eXAoKVxuICAgIGxldCBtb292XG4gICAgbGV0IHRyYWNrXG5cbiAgICBpZiAodHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgY29uc3QgeyBhdWRpb1RyYWNrIH0gPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKVxuICAgICAgdHJhY2sgPSBhdWRpb1RyYWNrO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB7IHZpZGVvVHJhY2sgfSA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpXG4gICAgICB0cmFjayA9IHZpZGVvVHJhY2s7XG4gICAgfVxuXG4gICAgbW9vdiA9IEZtcDQubW9vdih7IHR5cGUsIG1ldGE6IHRyYWNrLm1ldGEgfSlcblxuICAgIGluaXRTZWdtZW50LndyaXRlKGZ0eXAsIG1vb3YpXG5cbiAgICBsZXQgcHJlc291cmNlYnVmZmVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnUFJFX1NPVVJDRV9CVUZGRVInKTtcbiAgICBsZXQgc291cmNlID0gcHJlc291cmNlYnVmZmVyLmdldFNvdXJjZSh0eXBlKTtcbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgc291cmNlID0gcHJlc291cmNlYnVmZmVyLmNyZWF0ZVNvdXJjZSh0eXBlKTtcbiAgICB9XG5cbiAgICBzb3VyY2UubWltZXR5cGUgPSB0cmFjay5tZXRhLmNvZGVjO1xuICAgIHNvdXJjZS5pbml0ID0gaW5pdFNlZ21lbnQ7XG4gICAgdGhpcy5lbWl0KFJFTVVYX0VWRU5UUy5JTklUX1NFR01FTlQsIHR5cGUpXG4gIH1cblxuICBjYWxjRHRzQmFzZSAoYXVkaW9UcmFjaywgdmlkZW9UcmFjaykge1xuICAgIGlmICghYXVkaW9UcmFjay5zYW1wbGVzLmxlbmd0aCAmJiAhdmlkZW9UcmFjay5zYW1wbGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBhdWRpb0Jhc2UgPSBJbmZpbml0eVxuICAgIGxldCB2aWRlb0Jhc2UgPSBJbmZpbml0eVxuXG4gICAgaWYgKGF1ZGlvVHJhY2suc2FtcGxlcyAmJiBhdWRpb1RyYWNrLnNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICBhdWRpb0Jhc2UgPSBhdWRpb1RyYWNrLnNhbXBsZXNbMF0uZHRzXG4gICAgfVxuICAgIGlmICh2aWRlb1RyYWNrLnNhbXBsZXMgJiYgdmlkZW9UcmFjay5zYW1wbGVzLmxlbmd0aCkge1xuICAgICAgdmlkZW9CYXNlID0gdmlkZW9UcmFjay5zYW1wbGVzWzBdLmR0c1xuICAgIH1cblxuICAgIHRoaXMuX2R0c0Jhc2UgPSBNYXRoLm1pbihhdWRpb0Jhc2UsIHZpZGVvQmFzZSlcbiAgICB0aGlzLl9pc0R0c0Jhc2VJbml0ZWQgPSB0cnVlXG4gIH1cblxuICBfcmVtdXhWaWRlbyAodmlkZW9UcmFjaykge1xuICAgIGNvbnN0IHRyYWNrID0gdmlkZW9UcmFja1xuXG4gICAgaWYgKCF2aWRlb1RyYWNrLnNhbXBsZXMgfHwgIXZpZGVvVHJhY2suc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCB7c2FtcGxlc30gPSB0cmFja1xuICAgIGxldCBmaXJzdER0cyA9IC0xXG5cbiAgICBjb25zdCBtcDRTYW1wbGVzID0gW11cbiAgICBjb25zdCBtZGF0Qm94ID0ge1xuICAgICAgc2FtcGxlczogW11cbiAgICB9XG5cbiAgICB3aGlsZSAoc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGF2Y1NhbXBsZSA9IHNhbXBsZXMuc2hpZnQoKVxuICAgICAgY29uc3QgeyBpc0tleWZyYW1lIH0gPSBhdmNTYW1wbGVcbiAgICAgIGxldCBkdHMgPSBhdmNTYW1wbGUuZHRzIC0gdGhpcy5fZHRzQmFzZVxuXG4gICAgICBpZiAoZmlyc3REdHMgPT09IC0xKSB7XG4gICAgICAgIGZpcnN0RHRzID0gZHRzXG4gICAgICB9XG5cbiAgICAgIGxldCBjdHNcbiAgICAgIGxldCBwdHNcbiAgICAgIGlmIChhdmNTYW1wbGUucHRzKSB7XG4gICAgICAgIHB0cyA9IGF2Y1NhbXBsZS5wdHMgLSB0aGlzLl9kdHNCYXNlXG4gICAgICAgIGN0cyA9IHB0cyAtIGR0c1xuICAgICAgfVxuICAgICAgaWYgKGF2Y1NhbXBsZS5jdHMpIHtcbiAgICAgICAgcHRzID0gYXZjU2FtcGxlLmN0cyArIGR0c1xuICAgICAgICBjdHMgPSBhdmNTYW1wbGUuY3RzXG4gICAgICB9XG5cbiAgICAgIGxldCBtZGF0U2FtcGxlID0ge1xuICAgICAgICBidWZmZXI6IFtdLFxuICAgICAgICBzaXplOiAwXG4gICAgICB9XG4gICAgICBtZGF0Qm94LnNhbXBsZXMucHVzaChtZGF0U2FtcGxlKVxuICAgICAgbWRhdFNhbXBsZS5idWZmZXIucHVzaChhdmNTYW1wbGUuZGF0YSlcbiAgICAgIG1kYXRTYW1wbGUuc2l6ZSArPSBhdmNTYW1wbGUuZGF0YS5ieXRlTGVuZ3RoXG5cbiAgICAgIGxldCBzYW1wbGVEdXJhdGlvbiA9IDBcbiAgICAgIGlmIChzYW1wbGVzLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgIGNvbnN0IG5leHREdHMgPSBzYW1wbGVzWzBdLmR0cyAtIHRoaXMuX2R0c0Jhc2VcbiAgICAgICAgc2FtcGxlRHVyYXRpb24gPSBuZXh0RHRzIC0gZHRzXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobXA0U2FtcGxlcy5sZW5ndGggPj0gMSkgeyAvLyBsYXN0ZXN0IHNhbXBsZSwgdXNlIHNlY29uZCBsYXN0IGR1cmF0aW9uXG4gICAgICAgICAgc2FtcGxlRHVyYXRpb24gPSBtcDRTYW1wbGVzW21wNFNhbXBsZXMubGVuZ3RoIC0gMV0uZHVyYXRpb25cbiAgICAgICAgfSBlbHNlIHsgLy8gdGhlIG9ubHkgb25lIHNhbXBsZSwgdXNlIHJlZmVyZW5jZSBkdXJhdGlvblxuICAgICAgICAgIHNhbXBsZUR1cmF0aW9uID0gdGhpcy52aWRlb01ldGEucmVmU2FtcGxlRHVyYXRpb25cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy52aWRlb0FsbER1cmF0aW9uICs9IHNhbXBsZUR1cmF0aW9uXG4gICAgICBtcDRTYW1wbGVzLnB1c2goe1xuICAgICAgICBkdHMsXG4gICAgICAgIGN0cyxcbiAgICAgICAgcHRzLFxuICAgICAgICBkYXRhOiBhdmNTYW1wbGUuZGF0YSxcbiAgICAgICAgc2l6ZTogYXZjU2FtcGxlLmRhdGEuYnl0ZUxlbmd0aCxcbiAgICAgICAgaXNLZXlmcmFtZSxcbiAgICAgICAgZHVyYXRpb246IHNhbXBsZUR1cmF0aW9uLFxuICAgICAgICBmbGFnczoge1xuICAgICAgICAgIGlzTGVhZGluZzogMCxcbiAgICAgICAgICBkZXBlbmRzT246IGlzS2V5ZnJhbWUgPyAyIDogMSxcbiAgICAgICAgICBpc0RlcGVuZGVkT246IGlzS2V5ZnJhbWUgPyAxIDogMCxcbiAgICAgICAgICBoYXNSZWR1bmRhbmN5OiAwLFxuICAgICAgICAgIGlzTm9uU3luYzogaXNLZXlmcmFtZSA/IDAgOiAxXG4gICAgICAgIH0sXG4gICAgICAgIG9yaWdpbkR0czogZHRzLFxuICAgICAgICB0eXBlOiAndmlkZW8nXG4gICAgICB9KVxuICAgIH1cblxuICAgIGxldCBtb29mTWRhdCA9IG5ldyBCdWZmZXIoKVxuXG4gICAgY29uc3QgbW9vZiA9IEZtcDQubW9vZih7XG4gICAgICBpZDogdHJhY2subWV0YS5pZCxcbiAgICAgIHRpbWU6IGZpcnN0RHRzLFxuICAgICAgc2FtcGxlczogbXA0U2FtcGxlc1xuICAgIH0pXG4gICAgY29uc3QgbWRhdCA9IEZtcDQubWRhdChtZGF0Qm94KVxuICAgIG1vb2ZNZGF0LndyaXRlKG1vb2YsIG1kYXQpXG5cbiAgICB0cmFjay5zYW1wbGVzID0gW11cbiAgICB0cmFjay5sZW5ndGggPSAwXG5cbiAgICBsZXQgcHJlc291cmNlYnVmZmVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnUFJFX1NPVVJDRV9CVUZGRVInKTtcbiAgICBsZXQgc291cmNlID0gcHJlc291cmNlYnVmZmVyLmdldFNvdXJjZSgndmlkZW8nKTtcbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgc291cmNlID0gcHJlc291cmNlYnVmZmVyLmNyZWF0ZVNvdXJjZSgndmlkZW8nKTtcbiAgICB9XG5cbiAgICBzb3VyY2UuZGF0YS5wdXNoKG1vb2ZNZGF0KTtcblxuICAgIHRoaXMuZW1pdChSRU1VWF9FVkVOVFMuTUVESUFfU0VHTUVOVCwgJ3ZpZGVvJylcbiAgfVxuXG4gIF9yZW11eEF1ZGlvICh0cmFjaykge1xuICAgIGNvbnN0IHtzYW1wbGVzfSA9IHRyYWNrXG4gICAgbGV0IGZpcnN0RHRzID0gLTFcbiAgICBsZXQgbXA0U2FtcGxlcyA9IFtdXG5cbiAgICBjb25zdCBtZGF0Qm94ID0ge1xuICAgICAgc2FtcGxlczogW11cbiAgICB9XG4gICAgaWYgKCFzYW1wbGVzIHx8ICFzYW1wbGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGxldCBpc0ZpcnN0RHRzSW5pdGVkID0gZmFsc2VcbiAgICB3aGlsZSAoc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIGxldCBzYW1wbGUgPSBzYW1wbGVzLnNoaWZ0KClcbiAgICAgIGNvbnN0IHsgZGF0YSB9ID0gc2FtcGxlXG4gICAgICBsZXQgZHRzID0gc2FtcGxlLmR0cyAtIHRoaXMuX2R0c0Jhc2VcbiAgICAgIGNvbnN0IG9yaWdpbkR0cyA9IGR0c1xuICAgICAgaWYgKCFpc0ZpcnN0RHRzSW5pdGVkKSB7XG4gICAgICAgIGZpcnN0RHRzID0gZHRzXG4gICAgICAgIGlzRmlyc3REdHNJbml0ZWQgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGxldCBzYW1wbGVEdXJhdGlvbiA9IDBcblxuICAgICAgaWYgKHRoaXMuYXVkaW9NZXRhLnJlZlNhbXBsZUR1cmF0aW9uRml4ZWQpIHtcbiAgICAgICAgc2FtcGxlRHVyYXRpb24gPSB0aGlzLmF1ZGlvTWV0YS5yZWZTYW1wbGVEdXJhdGlvbkZpeGVkXG4gICAgICB9IGVsc2UgaWYgKHNhbXBsZXMubGVuZ3RoID49IDEpIHtcbiAgICAgICAgY29uc3QgbmV4dER0cyA9IHNhbXBsZXNbMF0uZHRzIC0gdGhpcy5fZHRzQmFzZTtcbiAgICAgICAgc2FtcGxlRHVyYXRpb24gPSBuZXh0RHRzIC0gZHRzXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobXA0U2FtcGxlcy5sZW5ndGggPj0gMSkgeyAvLyB1c2Ugc2Vjb25kIGxhc3Qgc2FtcGxlIGR1cmF0aW9uXG4gICAgICAgICAgc2FtcGxlRHVyYXRpb24gPSBtcDRTYW1wbGVzW21wNFNhbXBsZXMubGVuZ3RoIC0gMV0uZHVyYXRpb25cbiAgICAgICAgfSBlbHNlIHsgLy8gdGhlIG9ubHkgb25lIHNhbXBsZSwgdXNlIHJlZmVyZW5jZSBzYW1wbGUgZHVyYXRpb25cbiAgICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IHRoaXMuYXVkaW9NZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gY29uc29sZS5sb2coJ3JlbXV4IGF1ZGlvICcsIGR0cylcbiAgICAgIHRoaXMuYXVkaW9BbGxEdXJhdGlvbiArPSBzYW1wbGVEdXJhdGlvblxuICAgICAgY29uc3QgbXA0U2FtcGxlID0ge1xuICAgICAgICBkdHMsXG4gICAgICAgIHB0czogZHRzLFxuICAgICAgICBjdHM6IDAsXG4gICAgICAgIHNpemU6IGRhdGEuYnl0ZUxlbmd0aCxcbiAgICAgICAgZHVyYXRpb246IHNhbXBsZS5kdXJhdGlvbiA/IHNhbXBsZS5kdXJhdGlvbiA6IHNhbXBsZUR1cmF0aW9uLFxuICAgICAgICBmbGFnczoge1xuICAgICAgICAgIGlzTGVhZGluZzogMCxcbiAgICAgICAgICBkZXBlbmRzT246IDIsXG4gICAgICAgICAgaXNEZXBlbmRlZE9uOiAxLFxuICAgICAgICAgIGhhc1JlZHVuZGFuY3k6IDAsXG4gICAgICAgICAgaXNOb25TeW5jOiAwXG4gICAgICAgIH0sXG4gICAgICAgIGlzS2V5ZnJhbWU6IHRydWUsXG4gICAgICAgIG9yaWdpbkR0cyxcbiAgICAgICAgdHlwZTogJ2F1ZGlvJ1xuICAgICAgfVxuXG4gICAgICBsZXQgbWRhdFNhbXBsZSA9IHtcbiAgICAgICAgYnVmZmVyOiBbXSxcbiAgICAgICAgc2l6ZTogMFxuICAgICAgfVxuICAgICAgbWRhdFNhbXBsZS5idWZmZXIucHVzaChkYXRhKVxuICAgICAgbWRhdFNhbXBsZS5zaXplICs9IGRhdGEuYnl0ZUxlbmd0aFxuXG4gICAgICBtZGF0Qm94LnNhbXBsZXMucHVzaChtZGF0U2FtcGxlKVxuXG4gICAgICBtcDRTYW1wbGVzLnB1c2gobXA0U2FtcGxlKVxuICAgIH1cblxuICAgIGNvbnN0IG1vb2ZNZGF0ID0gbmV3IEJ1ZmZlcigpXG4gICAgY29uc3QgbW9vZiA9IEZtcDQubW9vZih7XG4gICAgICBpZDogdHJhY2subWV0YS5pZCxcbiAgICAgIHRpbWU6IGZpcnN0RHRzLFxuICAgICAgc2FtcGxlczogbXA0U2FtcGxlc1xuICAgIH0pXG4gICAgY29uc3QgbWRhdCA9IEZtcDQubWRhdChtZGF0Qm94KVxuICAgIG1vb2ZNZGF0LndyaXRlKG1vb2YsIG1kYXQpXG5cbiAgICB0cmFjay5zYW1wbGVzID0gW11cbiAgICB0cmFjay5sZW5ndGggPSAwXG5cbiAgICBsZXQgcHJlc291cmNlYnVmZmVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnUFJFX1NPVVJDRV9CVUZGRVInKTtcbiAgICBsZXQgc291cmNlID0gcHJlc291cmNlYnVmZmVyLmdldFNvdXJjZSgnYXVkaW8nKTtcbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgc291cmNlID0gcHJlc291cmNlYnVmZmVyLmNyZWF0ZVNvdXJjZSgnYXVkaW8nKTtcbiAgICB9XG4gICAgc291cmNlLmRhdGEucHVzaChtb29mTWRhdCk7XG4gICAgdGhpcy5lbWl0KFJFTVVYX0VWRU5UUy5NRURJQV9TRUdNRU5ULCAnYXVkaW8nLCBtb29mTWRhdClcbiAgfVxuXG4gIGluaXRTaWxlbnRBdWRpbyAoZHRzLCBkdXJhdGlvbikge1xuICAgIGNvbnN0IHVuaXQgPSBNcDRSZW11eGVyLmdldFNpbGVudEZyYW1lKHRoaXMuYXVkaW9NZXRhLmNoYW5uZWxDb3VudClcbiAgICByZXR1cm4ge1xuICAgICAgZHRzLFxuICAgICAgcHRzOiBkdHMsXG4gICAgICBjdHM6IDAsXG4gICAgICBkdXJhdGlvbixcbiAgICAgIHVuaXQsXG4gICAgICBzaXplOiB1bml0LmJ5dGVMZW5ndGgsXG4gICAgICBvcmlnaW5EdHM6IGR0cyxcbiAgICAgIHR5cGU6ICd2aWRlbydcbiAgICB9XG4gIH1cblxuICBnZXQgdmlkZW9NZXRhICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJykudmlkZW9UcmFjay5tZXRhXG4gIH1cbiAgZ2V0IGF1ZGlvTWV0YSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpLmF1ZGlvVHJhY2subWV0YVxuICB9XG5cbiAgc3RhdGljIGdldFNpbGVudEZyYW1lIChjaGFubmVsQ291bnQpIHtcbiAgICBpZiAoY2hhbm5lbENvdW50ID09PSAxKSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjMsIDB4ODBdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSAyKSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MjEsIDB4MDAsIDB4NDksIDB4OTAsIDB4MDIsIDB4MTksIDB4MDAsIDB4MjMsIDB4ODBdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSAzKSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4OGVdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSA0KSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4ODAsIDB4MmMsIDB4ODAsIDB4MDgsIDB4MDIsIDB4MzhdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSA1KSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4ODIsIDB4MzAsIDB4MDQsIDB4OTksIDB4MDAsIDB4MjEsIDB4OTAsIDB4MDIsIDB4MzhdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSA2KSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4ODIsIDB4MzAsIDB4MDQsIDB4OTksIDB4MDAsIDB4MjEsIDB4OTAsIDB4MDIsIDB4MDAsIDB4YjIsIDB4MDAsIDB4MjAsIDB4MDgsIDB4ZTBdKVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgQ29udGV4dDogcmVxdWlyZSgnLi9zcmMvY29udGV4dCcpLmRlZmF1bHQsXG5cbiAgLy8gTW9kdWxlcyBmcm9tIGNvbnN0YW50c1xuICBFVkVOVFM6IHJlcXVpcmUoJy4vc3JjL2NvbnN0YW50cy9ldmVudHMnKS5kZWZhdWx0LFxuICBXT1JLRVJfQ09NTUFORFM6IHJlcXVpcmUoJy4vc3JjL2NvbnN0YW50cy93b3JrZXItY29tbWFuZHMnKS5kZWZhdWx0LFxuXG4gIC8vIE1vZHVsZXMgZnJvbSBlbnZcbiAgc25pZmZlcjogcmVxdWlyZSgnLi9zcmMvZW52L3NuaWZmZXInKS5kZWZhdWx0LFxuICBpc0xlOiByZXF1aXJlKCcuL3NyYy9lbnYvaXNsZScpLmRlZmF1bHQsXG4gIFVURjg6IHJlcXVpcmUoJy4vc3JjL2Vudi91dGY4JykuZGVmYXVsdCxcblxuICAvLyBNb2RlbHNcbiAgTWVkaWFJbmZvOiByZXF1aXJlKCcuL3NyYy9tb2RlbHMvbWVkaWEtaW5mbycpLmRlZmF1bHQsXG4gIE1lZGlhU2FtcGxlOiByZXF1aXJlKCcuL3NyYy9tb2RlbHMvbWVkaWEtc2FtcGxlJykuZGVmYXVsdCxcbiAgTWVkaWFTZWdtZW50OiByZXF1aXJlKCcuL3NyYy9tb2RlbHMvbWVkaWEtc2VnbWVudCcpLmRlZmF1bHQsXG4gIE1lZGlhU2VnbWVudExpc3Q6IHJlcXVpcmUoJy4vc3JjL21vZGVscy9tZWRpYS1zZWdtZW50LWxpc3QnKS5kZWZhdWx0LFxuICBBdWRpb1RyYWNrTWV0YTogcmVxdWlyZSgnLi9zcmMvbW9kZWxzL3RyYWNrLW1ldGEnKS5BdWRpb1RyYWNrTWV0YSxcbiAgVmlkZW9UcmFja01ldGE6IHJlcXVpcmUoJy4vc3JjL21vZGVscy90cmFjay1tZXRhJykuVmlkZW9UcmFja01ldGEsXG4gIEF1ZGlvVHJhY2tTYW1wbGU6IHJlcXVpcmUoJy4vc3JjL21vZGVscy90cmFjay1zYW1wbGUnKS5BdWRpb1RyYWNrU2FtcGxlLFxuICBWaWRlb1RyYWNrU2FtcGxlOiByZXF1aXJlKCcuL3NyYy9tb2RlbHMvdHJhY2stc2FtcGxlJykuVmlkZW9UcmFja1NhbXBsZSxcblxuICAvLyBNb2R1bGVzIGZyb20gbXNlXG4gIE1zZTogcmVxdWlyZSgnLi9zcmMvbXNlL2luZGV4JykuZGVmYXVsdCxcblxuICAvLyBNb2R1bGVzIGZyb20gd3JpdGVcbiAgU3RyZWFtOiByZXF1aXJlKCcuL3NyYy93cml0ZS9zdHJlYW0nKS5kZWZhdWx0LFxuICBCdWZmZXI6IHJlcXVpcmUoJy4vc3JjL3dyaXRlL2J1ZmZlcicpLmRlZmF1bHQsXG5cbiAgTW9iaWxlVmlkZW86IHJlcXVpcmUoJy4vc3JjL21vYmlsZS9tb2JpbGUtdmlkZW8nKVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoUmVzdWx0Q29uc3RydWN0b3IpIHtcbiAgdmFyIHRvdGFsTGVuZ3RoID0gMDtcblxuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJyYXlzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFycmF5c1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBhcnJheXNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICB2YXIgYXJyID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgIHRvdGFsTGVuZ3RoICs9IGFyci5sZW5ndGg7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3IucmV0dXJuKSB7XG4gICAgICAgIF9pdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciByZXN1bHQgPSBuZXcgUmVzdWx0Q29uc3RydWN0b3IodG90YWxMZW5ndGgpO1xuICB2YXIgb2Zmc2V0ID0gMDtcbiAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICB2YXIgX2l0ZXJhdG9yRXJyb3IyID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IGFycmF5c1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge1xuICAgICAgdmFyIF9hcnIgPSBfc3RlcDIudmFsdWU7XG5cbiAgICAgIHJlc3VsdC5zZXQoX2Fyciwgb2Zmc2V0KTtcbiAgICAgIG9mZnNldCArPSBfYXJyLmxlbmd0aDtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kaWRJdGVyYXRvckVycm9yMiA9IHRydWU7XG4gICAgX2l0ZXJhdG9yRXJyb3IyID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjIucmV0dXJuKSB7XG4gICAgICAgIF9pdGVyYXRvcjIucmV0dXJuKCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjIpIHtcbiAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jb25jYXQgPSByZXF1aXJlKCcuL2NvbmNhdCcpO1xuXG52YXIgX2NvbmNhdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25jYXQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jb25jYXQyLmRlZmF1bHQ7IiwiZnVuY3Rpb24gd2VicGFja0Jvb3RzdHJhcEZ1bmMgKG1vZHVsZXMpIHtcbi8qKioqKiovICAvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyAgdmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuLyoqKioqKi8gIC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyAgZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4vKioqKioqLyAgICAvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovICAgIGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuLyoqKioqKi8gICAgICByZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuLyoqKioqKi8gICAgLy8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovICAgIHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovICAgICAgaTogbW9kdWxlSWQsXG4vKioqKioqLyAgICAgIGw6IGZhbHNlLFxuLyoqKioqKi8gICAgICBleHBvcnRzOiB7fVxuLyoqKioqKi8gICAgfTtcblxuLyoqKioqKi8gICAgLy8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyAgICBtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuLyoqKioqKi8gICAgLy8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gICAgbW9kdWxlLmwgPSB0cnVlO1xuXG4vKioqKioqLyAgICAvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gIH1cblxuLyoqKioqKi8gIC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4vKioqKioqLyAgX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuLyoqKioqKi8gIC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyAgX193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuLyoqKioqKi8gIC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbi8qKioqKiovICBfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbi8qKioqKiovICAvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovICBfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbi8qKioqKiovICAgIGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbi8qKioqKiovICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbi8qKioqKiovICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuLyoqKioqKi8gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4vKioqKioqLyAgICAgICAgZ2V0OiBnZXR0ZXJcbi8qKioqKiovICAgICAgfSk7XG4vKioqKioqLyAgICB9XG4vKioqKioqLyAgfTtcblxuLyoqKioqKi8gIC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbi8qKioqKiovICBfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4vKioqKioqLyAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqKioqKi8gIH07XG5cbi8qKioqKiovICAvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuLyoqKioqKi8gICAgdmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4vKioqKioqLyAgICAgIGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4vKioqKioqLyAgICAgIGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4vKioqKioqLyAgICBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4vKioqKioqLyAgICByZXR1cm4gZ2V0dGVyO1xuLyoqKioqKi8gIH07XG5cbi8qKioqKiovICAvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbi8qKioqKiovICBfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbi8qKioqKiovICAvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4vKioqKioqLyAgLy8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbi8qKioqKiovICBfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gIHZhciBmID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBFTlRSWV9NT0RVTEUpXG4gIHJldHVybiBmLmRlZmF1bHQgfHwgZiAvLyB0cnkgdG8gY2FsbCBkZWZhdWx0IGlmIGRlZmluZWQgdG8gYWxzbyBzdXBwb3J0IGJhYmVsIGVzbW9kdWxlIGV4cG9ydHNcbn1cblxudmFyIG1vZHVsZU5hbWVSZXFFeHAgPSAnW1xcXFwufFxcXFwtfFxcXFwrfFxcXFx3fFxcL3xAXSsnXG52YXIgZGVwZW5kZW5jeVJlZ0V4cCA9ICdcXFxcKFxcXFxzKihcXC9cXFxcKi4qP1xcXFwqXFwvKT9cXFxccyouKj8oJyArIG1vZHVsZU5hbWVSZXFFeHAgKyAnKS4qP1xcXFwpJyAvLyBhZGRpdGlvbmFsIGNoYXJzIHdoZW4gb3V0cHV0LnBhdGhpbmZvIGlzIHRydWVcblxuLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjU5MzY2MS8xMzA0NDJcbmZ1bmN0aW9uIHF1b3RlUmVnRXhwIChzdHIpIHtcbiAgcmV0dXJuIChzdHIgKyAnJykucmVwbGFjZSgvWy4/KiteJFtcXF1cXFxcKCl7fXwtXS9nLCAnXFxcXCQmJylcbn1cblxuZnVuY3Rpb24gaXNOdW1lcmljKG4pIHtcbiAgcmV0dXJuICFpc05hTigxICogbik7IC8vIDEgKiBuIGNvbnZlcnRzIGludGVnZXJzLCBpbnRlZ2VycyBhcyBzdHJpbmcgKFwiMTIzXCIpLCAxZTMgYW5kIFwiMWUzXCIgdG8gaW50ZWdlcnMgYW5kIHN0cmluZ3MgdG8gTmFOXG59XG5cbmZ1bmN0aW9uIGdldE1vZHVsZURlcGVuZGVuY2llcyAoc291cmNlcywgbW9kdWxlLCBxdWV1ZU5hbWUpIHtcbiAgdmFyIHJldHZhbCA9IHt9XG4gIHJldHZhbFtxdWV1ZU5hbWVdID0gW11cblxuICB2YXIgZm5TdHJpbmcgPSBtb2R1bGUudG9TdHJpbmcoKVxuICB2YXIgd3JhcHBlclNpZ25hdHVyZSA9IGZuU3RyaW5nLm1hdGNoKC9eZnVuY3Rpb25cXHM/XFx3KlxcKFxcdyssXFxzKlxcdyssXFxzKihcXHcrKVxcKS8pXG4gIGlmICghd3JhcHBlclNpZ25hdHVyZSkgcmV0dXJuIHJldHZhbFxuICB2YXIgd2VicGFja1JlcXVpcmVOYW1lID0gd3JhcHBlclNpZ25hdHVyZVsxXVxuXG4gIC8vIG1haW4gYnVuZGxlIGRlcHNcbiAgdmFyIHJlID0gbmV3IFJlZ0V4cCgnKFxcXFxcXFxcbnxcXFxcVyknICsgcXVvdGVSZWdFeHAod2VicGFja1JlcXVpcmVOYW1lKSArIGRlcGVuZGVuY3lSZWdFeHAsICdnJylcbiAgdmFyIG1hdGNoXG4gIHdoaWxlICgobWF0Y2ggPSByZS5leGVjKGZuU3RyaW5nKSkpIHtcbiAgICBpZiAobWF0Y2hbM10gPT09ICdkbGwtcmVmZXJlbmNlJykgY29udGludWVcbiAgICByZXR2YWxbcXVldWVOYW1lXS5wdXNoKG1hdGNoWzNdKVxuICB9XG5cbiAgLy8gZGxsIGRlcHNcbiAgcmUgPSBuZXcgUmVnRXhwKCdcXFxcKCcgKyBxdW90ZVJlZ0V4cCh3ZWJwYWNrUmVxdWlyZU5hbWUpICsgJ1xcXFwoXCIoZGxsLXJlZmVyZW5jZVxcXFxzKCcgKyBtb2R1bGVOYW1lUmVxRXhwICsgJykpXCJcXFxcKVxcXFwpJyArIGRlcGVuZGVuY3lSZWdFeHAsICdnJylcbiAgd2hpbGUgKChtYXRjaCA9IHJlLmV4ZWMoZm5TdHJpbmcpKSkge1xuICAgIGlmICghc291cmNlc1ttYXRjaFsyXV0pIHtcbiAgICAgIHJldHZhbFtxdWV1ZU5hbWVdLnB1c2gobWF0Y2hbMV0pXG4gICAgICBzb3VyY2VzW21hdGNoWzJdXSA9IF9fd2VicGFja19yZXF1aXJlX18obWF0Y2hbMV0pLm1cbiAgICB9XG4gICAgcmV0dmFsW21hdGNoWzJdXSA9IHJldHZhbFttYXRjaFsyXV0gfHwgW11cbiAgICByZXR2YWxbbWF0Y2hbMl1dLnB1c2gobWF0Y2hbNF0pXG4gIH1cblxuICAvLyBjb252ZXJ0IDFlMyBiYWNrIHRvIDEwMDAgLSB0aGlzIGNhbiBiZSBpbXBvcnRhbnQgYWZ0ZXIgdWdsaWZ5LWpzIGNvbnZlcnRlZCAxMDAwIHRvIDFlM1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHJldHZhbCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmV0dmFsW2tleXNbaV1dLmxlbmd0aDsgaisrKSB7XG4gICAgICBpZiAoaXNOdW1lcmljKHJldHZhbFtrZXlzW2ldXVtqXSkpIHtcbiAgICAgICAgcmV0dmFsW2tleXNbaV1dW2pdID0gMSAqIHJldHZhbFtrZXlzW2ldXVtqXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmV0dmFsXG59XG5cbmZ1bmN0aW9uIGhhc1ZhbHVlc0luUXVldWVzIChxdWV1ZXMpIHtcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhxdWV1ZXMpXG4gIHJldHVybiBrZXlzLnJlZHVjZShmdW5jdGlvbiAoaGFzVmFsdWVzLCBrZXkpIHtcbiAgICByZXR1cm4gaGFzVmFsdWVzIHx8IHF1ZXVlc1trZXldLmxlbmd0aCA+IDBcbiAgfSwgZmFsc2UpXG59XG5cbmZ1bmN0aW9uIGdldFJlcXVpcmVkTW9kdWxlcyAoc291cmNlcywgbW9kdWxlSWQpIHtcbiAgdmFyIG1vZHVsZXNRdWV1ZSA9IHtcbiAgICBtYWluOiBbbW9kdWxlSWRdXG4gIH1cbiAgdmFyIHJlcXVpcmVkTW9kdWxlcyA9IHtcbiAgICBtYWluOiBbXVxuICB9XG4gIHZhciBzZWVuTW9kdWxlcyA9IHtcbiAgICBtYWluOiB7fVxuICB9XG5cbiAgd2hpbGUgKGhhc1ZhbHVlc0luUXVldWVzKG1vZHVsZXNRdWV1ZSkpIHtcbiAgICB2YXIgcXVldWVzID0gT2JqZWN0LmtleXMobW9kdWxlc1F1ZXVlKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVldWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcXVldWVOYW1lID0gcXVldWVzW2ldXG4gICAgICB2YXIgcXVldWUgPSBtb2R1bGVzUXVldWVbcXVldWVOYW1lXVxuICAgICAgdmFyIG1vZHVsZVRvQ2hlY2sgPSBxdWV1ZS5wb3AoKVxuICAgICAgc2Vlbk1vZHVsZXNbcXVldWVOYW1lXSA9IHNlZW5Nb2R1bGVzW3F1ZXVlTmFtZV0gfHwge31cbiAgICAgIGlmIChzZWVuTW9kdWxlc1txdWV1ZU5hbWVdW21vZHVsZVRvQ2hlY2tdIHx8ICFzb3VyY2VzW3F1ZXVlTmFtZV1bbW9kdWxlVG9DaGVja10pIGNvbnRpbnVlXG4gICAgICBzZWVuTW9kdWxlc1txdWV1ZU5hbWVdW21vZHVsZVRvQ2hlY2tdID0gdHJ1ZVxuICAgICAgcmVxdWlyZWRNb2R1bGVzW3F1ZXVlTmFtZV0gPSByZXF1aXJlZE1vZHVsZXNbcXVldWVOYW1lXSB8fCBbXVxuICAgICAgcmVxdWlyZWRNb2R1bGVzW3F1ZXVlTmFtZV0ucHVzaChtb2R1bGVUb0NoZWNrKVxuICAgICAgdmFyIG5ld01vZHVsZXMgPSBnZXRNb2R1bGVEZXBlbmRlbmNpZXMoc291cmNlcywgc291cmNlc1txdWV1ZU5hbWVdW21vZHVsZVRvQ2hlY2tdLCBxdWV1ZU5hbWUpXG4gICAgICB2YXIgbmV3TW9kdWxlc0tleXMgPSBPYmplY3Qua2V5cyhuZXdNb2R1bGVzKVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBuZXdNb2R1bGVzS2V5cy5sZW5ndGg7IGorKykge1xuICAgICAgICBtb2R1bGVzUXVldWVbbmV3TW9kdWxlc0tleXNbal1dID0gbW9kdWxlc1F1ZXVlW25ld01vZHVsZXNLZXlzW2pdXSB8fCBbXVxuICAgICAgICBtb2R1bGVzUXVldWVbbmV3TW9kdWxlc0tleXNbal1dID0gbW9kdWxlc1F1ZXVlW25ld01vZHVsZXNLZXlzW2pdXS5jb25jYXQobmV3TW9kdWxlc1tuZXdNb2R1bGVzS2V5c1tqXV0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcXVpcmVkTW9kdWxlc1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChtb2R1bGVJZCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICB2YXIgc291cmNlcyA9IHtcbiAgICBtYWluOiBfX3dlYnBhY2tfbW9kdWxlc19fXG4gIH1cblxuICB2YXIgcmVxdWlyZWRNb2R1bGVzID0gb3B0aW9ucy5hbGwgPyB7IG1haW46IE9iamVjdC5rZXlzKHNvdXJjZXMubWFpbikgfSA6IGdldFJlcXVpcmVkTW9kdWxlcyhzb3VyY2VzLCBtb2R1bGVJZClcblxuICB2YXIgc3JjID0gJydcblxuICBPYmplY3Qua2V5cyhyZXF1aXJlZE1vZHVsZXMpLmZpbHRlcihmdW5jdGlvbiAobSkgeyByZXR1cm4gbSAhPT0gJ21haW4nIH0pLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZSkge1xuICAgIHZhciBlbnRyeU1vZHVsZSA9IDBcbiAgICB3aGlsZSAocmVxdWlyZWRNb2R1bGVzW21vZHVsZV1bZW50cnlNb2R1bGVdKSB7XG4gICAgICBlbnRyeU1vZHVsZSsrXG4gICAgfVxuICAgIHJlcXVpcmVkTW9kdWxlc1ttb2R1bGVdLnB1c2goZW50cnlNb2R1bGUpXG4gICAgc291cmNlc1ttb2R1bGVdW2VudHJ5TW9kdWxlXSA9ICcoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7IG1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXzsgfSknXG4gICAgc3JjID0gc3JjICsgJ3ZhciAnICsgbW9kdWxlICsgJyA9ICgnICsgd2VicGFja0Jvb3RzdHJhcEZ1bmMudG9TdHJpbmcoKS5yZXBsYWNlKCdFTlRSWV9NT0RVTEUnLCBKU09OLnN0cmluZ2lmeShlbnRyeU1vZHVsZSkpICsgJykoeycgKyByZXF1aXJlZE1vZHVsZXNbbW9kdWxlXS5tYXAoZnVuY3Rpb24gKGlkKSB7IHJldHVybiAnJyArIEpTT04uc3RyaW5naWZ5KGlkKSArICc6ICcgKyBzb3VyY2VzW21vZHVsZV1baWRdLnRvU3RyaW5nKCkgfSkuam9pbignLCcpICsgJ30pO1xcbidcbiAgfSlcblxuICBzcmMgPSBzcmMgKyAnbmV3ICgoJyArIHdlYnBhY2tCb290c3RyYXBGdW5jLnRvU3RyaW5nKCkucmVwbGFjZSgnRU5UUllfTU9EVUxFJywgSlNPTi5zdHJpbmdpZnkobW9kdWxlSWQpKSArICcpKHsnICsgcmVxdWlyZWRNb2R1bGVzLm1haW4ubWFwKGZ1bmN0aW9uIChpZCkgeyByZXR1cm4gJycgKyBKU09OLnN0cmluZ2lmeShpZCkgKyAnOiAnICsgc291cmNlcy5tYWluW2lkXS50b1N0cmluZygpIH0pLmpvaW4oJywnKSArICd9KSkoc2VsZik7J1xuXG4gIHZhciBibG9iID0gbmV3IHdpbmRvdy5CbG9iKFtzcmNdLCB7IHR5cGU6ICd0ZXh0L2phdmFzY3JpcHQnIH0pXG4gIGlmIChvcHRpb25zLmJhcmUpIHsgcmV0dXJuIGJsb2IgfVxuXG4gIHZhciBVUkwgPSB3aW5kb3cuVVJMIHx8IHdpbmRvdy53ZWJraXRVUkwgfHwgd2luZG93Lm1velVSTCB8fCB3aW5kb3cubXNVUkxcblxuICB2YXIgd29ya2VyVXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKVxuICB2YXIgd29ya2VyID0gbmV3IHdpbmRvdy5Xb3JrZXIod29ya2VyVXJsKVxuICB3b3JrZXIub2JqZWN0VVJMID0gd29ya2VyVXJsXG5cbiAgcmV0dXJuIHdvcmtlclxufVxuIiwiY29uc3QgTE9BREVSX0VWRU5UUyA9IHtcbiAgTEFERVJfU1RBUlQ6ICdMT0FERVJfU1RBUlQnLFxuICBMT0FERVJfREFUQUxPQURFRDogJ0xPQURFUl9EQVRBTE9BREVEJyxcbiAgTE9BREVSX0NPTVBMRVRFOiAnTE9BREVSX0NPTVBMRVRFJyxcbiAgTE9BREVSX0VSUk9SOiAnTE9BREVSX0VSUk9SJ1xufVxuXG5jb25zdCBERU1VWF9FVkVOVFMgPSB7XG4gIERFTVVYX1NUQVJUOiAnREVNVVhfU1RBUlQnLFxuICBERU1VWF9DT01QTEVURTogJ0RFTVVYX0NPTVBMRVRFJyxcbiAgREVNVVhfRVJST1I6ICdERU1VWF9FUlJPUicsXG4gIE1FVEFEQVRBX1BBUlNFRDogJ01FVEFEQVRBX1BBUlNFRCcsXG4gIFZJREVPX01FVEFEQVRBX0NIQU5HRTogJ1ZJREVPX01FVEFEQVRBX0NIQU5HRScsXG4gIEFVRElPX01FVEFEQVRBX0NIQU5HRTogJ0FVRElPX01FVEFEQVRBX0NIQU5HRScsXG4gIE1FRElBX0lORk86ICdNRURJQV9JTkZPJ1xufVxuXG5jb25zdCBSRU1VWF9FVkVOVFMgPSB7XG4gIFJFTVVYX01FVEFEQVRBOiAnUkVNVVhfTUVUQURBVEEnLFxuICBSRU1VWF9NRURJQTogJ1JFTVVYX01FRElBJyxcbiAgTUVESUFfU0VHTUVOVDogJ01FRElBX1NFR01FTlQnLFxuICBSRU1VWF9FUlJPUjogJ1JFTVVYX0VSUk9SJyxcbiAgSU5JVF9TRUdNRU5UOiAnSU5JVF9TRUdNRU5UJ1xufVxuXG5jb25zdCBNU0VfRVZFTlRTID0ge1xuICBTT1VSQ0VfVVBEQVRFX0VORDogJ1NPVVJDRV9VUERBVEVfRU5EJ1xufVxuXG4vLyBobHPkuJPmnIlldmVudHNcbmNvbnN0IEhMU19FVkVOVFMgPSB7XG4gIFJFVFJZX1RJTUVfRVhDRUVERUQ6ICdSRVRSWV9USU1FX0VYQ0VFREVEJ1xufVxuXG5jb25zdCBBTExFVkVOVFMgPSBPYmplY3QuYXNzaWduKHt9LCBMT0FERVJfRVZFTlRTLCBERU1VWF9FVkVOVFMsIFJFTVVYX0VWRU5UUywgTVNFX0VWRU5UUywgSExTX0VWRU5UUylcblxuY29uc3QgRmx2QWxsb3dlZEV2ZW50cyA9IFtdXG5jb25zdCBIbHNBbGxvd2VkRXZlbnRzID0gW11cblxuZm9yIChsZXQga2V5IGluIEFMTEVWRU5UUykge1xuICBpZiAoQUxMRVZFTlRTLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICBGbHZBbGxvd2VkRXZlbnRzLnB1c2goQUxMRVZFTlRTW2tleV0pXG4gIH1cbn1cblxuZm9yIChsZXQga2V5IGluIEFMTEVWRU5UUykge1xuICBpZiAoQUxMRVZFTlRTLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICBIbHNBbGxvd2VkRXZlbnRzLnB1c2goQUxMRVZFTlRTW2tleV0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBBTExFVkVOVFMsXG4gIEhMU19FVkVOVFMsXG4gIFJFTVVYX0VWRU5UUyxcbiAgREVNVVhfRVZFTlRTLFxuICBNU0VfRVZFTlRTLFxuICBMT0FERVJfRVZFTlRTLFxuICBGbHZBbGxvd2VkRXZlbnRzLFxuICBIbHNBbGxvd2VkRXZlbnRzXG59O1xuIiwiZXhwb3J0IGNvbnN0IENPTlRFWFRfQ09NT01BTkRTID0ge1xuICBPTjogJ29uJyxcbiAgT05DRTogJ29uY2UnLFxuICBPRkY6ICdvZmYnLFxuICBFTUlUOiAnZW1pdCcsXG4gIERFU1RST1k6ICdkZXN0cm95J1xufVxuIiwiaW1wb3J0IE1lZGlhSW5mbyBmcm9tICcuL21vZGVscy9tZWRpYS1pbmZvJ1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJ1xuXG5jb25zdCBESVJFQ1RfRU1JVF9GTEFHID0gJ19fVE9fXydcblxuY2xhc3MgQ29udGV4dCB7XG4gIGNvbnN0cnVjdG9yIChhbGxvd2VkRXZlbnRzID0gW10pIHtcbiAgICB0aGlzLl9lbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpXG4gICAgdGhpcy5faW5zdGFuY2VNYXAgPSB7fSAvLyDmiYDmnInnmoTop6PnoIHmtYHnqIvlrp7kvotcbiAgICB0aGlzLl9jbHNNYXAgPSB7fSAvLyDmnoTpgKDlh73mlbDnmoRtYXBcbiAgICB0aGlzLl9pbml0ZWQgPSBmYWxzZVxuICAgIHRoaXMubWVkaWFJbmZvID0gbmV3IE1lZGlhSW5mbygpXG4gICAgdGhpcy5hbGxvd2VkRXZlbnRzID0gYWxsb3dlZEV2ZW50c1xuICAgIHRoaXMuX2hvb2tzID0ge30gLy8g5rOo5YaM5Zyo5LqL5Lu25YmNL+WQjueahOmSqeWtkO+8jOS+i+WmgiBiZWZvcmUoJ0RFTVVYX0NPTVBMRVRFJylcbiAgfVxuXG4gIC8qKlxuICAgKiDku47kuIrkuIvmlofkuK3ojrflj5bop6PnoIHmtYHnqIvlrp7kvovvvIzlpoLmnpzmsqHmnInlrp7kvovvvIzmnoTpgKDkuIDkuKpcbiAgICogQHBhcmFtIHRhZ1xuICAgKiBAcGFyYW0gYXJnc1xuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldEluc3RhbmNlICh0YWcpIHtcbiAgICBpZiAodGhpcy5faW5zdGFuY2VNYXBbdGFnXSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlTWFwW3RhZ11cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdGhyb3cgbmV3IEVycm9yKGAke3RhZ33lrp7kvovlsJrmnKrliJ3lp4vljJZgKVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog5Yid5aeL5YyW5YW35L2T5a6e5L6LXG4gICAqIEBwYXJhbSB0YWdcbiAgICogQHBhcmFtIGFyZ3NcbiAgICovXG4gIGluaXRJbnN0YW5jZSAodGFnLCAuLi5hcmdzKSB7XG4gICAgaWYgKHRoaXMuX2Nsc01hcFt0YWddKSB7XG4gICAgICBjb25zdCBuZXdJbnN0YW5jZSA9IG5ldyB0aGlzLl9jbHNNYXBbdGFnXSguLi5hcmdzKVxuICAgICAgdGhpcy5faW5zdGFuY2VNYXBbdGFnXSA9IG5ld0luc3RhbmNlXG4gICAgICBpZiAobmV3SW5zdGFuY2UuaW5pdCkge1xuICAgICAgICBuZXdJbnN0YW5jZS5pbml0KCkgLy8gVE9ETzogbGlmZWNpcmNsZVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5ld0luc3RhbmNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHt0YWd95pyq5ZyoY29udGV4dOS4reazqOWGjGApXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOmBv+WFjeWkp+mHj+eahGluaXRJbnN0YW5jZeiwg+eUqO+8jOWIneWni+WMluaJgOacieeahOe7hOS7tlxuICAgKiBAcGFyYW0gY29uZmlnXG4gICAqL1xuICBpbml0IChjb25maWcpIHtcbiAgICBpZiAodGhpcy5faW5pdGVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgZm9yIChsZXQgdGFnIGluIHRoaXMuX2Nsc01hcCkge1xuICAgICAgLy8gaWYgbm90IGluaXRlZCwgaW5pdCBhbiBpbnN0YW5jZVxuICAgICAgaWYgKHRoaXMuX2Nsc01hcC5oYXNPd25Qcm9wZXJ0eSh0YWcpICYmICF0aGlzLl9pbnN0YW5jZU1hcFt0YWddKSB7XG4gICAgICAgIHRoaXMuaW5pdEluc3RhbmNlKHRhZywgY29uZmlnKVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9pbml0ZWQgPSB0cnVlXG4gIH1cblxuICAvKipcbiAgICog5rOo5YaM5LiA5Liq5LiK5LiL5paH5rWB56iL77yM5o+Q5L6b5a6J5YWo55qE5LqL5Lu25Y+R6YCB5py65Yi2XG4gICAqIEBwYXJhbSB0YWdcbiAgICogQHBhcmFtIGNsc1xuICAgKi9cbiAgcmVnaXN0cnkgKHRhZywgY2xzKSB7XG4gICAgY29uc3QgZW1pdHRlciA9IHRoaXMuX2VtaXR0ZXJcbiAgICBjb25zdCBjaGVja01lc3NhZ2VOYW1lID0gdGhpcy5faXNNZXNzYWdlTmFtZVZhbGlkLmJpbmQodGhpcylcbiAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgIGNvbnN0IGVuaGFuY2VkID0gY2xhc3MgZXh0ZW5kcyBjbHMge1xuICAgICAgY29uc3RydWN0b3IgKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncylcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSB7fVxuICAgICAgICB0aGlzLm9uY2VMaXN0ZW5lcnMgPSB7fVxuICAgICAgICB0aGlzLlRBRyA9IHRhZ1xuICAgICAgICB0aGlzLl9jb250ZXh0ID0gc2VsZlxuICAgICAgfVxuXG4gICAgICBvbiAobWVzc2FnZU5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNoZWNrTWVzc2FnZU5hbWUobWVzc2FnZU5hbWUpXG5cbiAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJzW21lc3NhZ2VOYW1lXSkge1xuICAgICAgICAgIHRoaXMubGlzdGVuZXJzW21lc3NhZ2VOYW1lXS5wdXNoKGNhbGxiYWNrKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubGlzdGVuZXJzW21lc3NhZ2VOYW1lXSA9IFtjYWxsYmFja11cbiAgICAgICAgfVxuXG4gICAgICAgIGVtaXR0ZXIub24oYCR7bWVzc2FnZU5hbWV9JHtESVJFQ1RfRU1JVF9GTEFHfSR7dGFnfWAsIGNhbGxiYWNrKSAvLyDlu7rnq4vlrprlkJHpgJrkv6Hnm5HlkKxcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXIub24obWVzc2FnZU5hbWUsIGNhbGxiYWNrKVxuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIOWcqOafkOS4quS6i+S7tuinpuWPkeWJjeaJp+ihjFxuICAgICAgICogQHBhcmFtIG1lc3NhZ2VOYW1lXG4gICAgICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICAgICAqL1xuICAgICAgYmVmb3JlIChtZXNzYWdlTmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgY2hlY2tNZXNzYWdlTmFtZShtZXNzYWdlTmFtZSlcbiAgICAgICAgaWYgKHNlbGYuX2hvb2tzW21lc3NhZ2VOYW1lXSkge1xuICAgICAgICAgIHNlbGYuX2hvb2tzW21lc3NhZ2VOYW1lXS5wdXNoKGNhbGxiYWNrKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGYuX2hvb2tzW21lc3NhZ2VOYW1lXSA9IFtjYWxsYmFja11cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBvbmNlIChtZXNzYWdlTmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgY2hlY2tNZXNzYWdlTmFtZShtZXNzYWdlTmFtZSlcblxuICAgICAgICBpZiAodGhpcy5vbmNlTGlzdGVuZXJzW21lc3NhZ2VOYW1lXSkge1xuICAgICAgICAgIHRoaXMub25jZUxpc3RlbmVyc1ttZXNzYWdlTmFtZV0ucHVzaChjYWxsYmFjaylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm9uY2VMaXN0ZW5lcnNbbWVzc2FnZU5hbWVdID0gW2NhbGxiYWNrXVxuICAgICAgICB9XG5cbiAgICAgICAgZW1pdHRlci5vbmNlKGAke21lc3NhZ2VOYW1lfSR7RElSRUNUX0VNSVRfRkxBR30ke3RhZ31gLCBjYWxsYmFjaylcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXIub25jZShtZXNzYWdlTmFtZSwgY2FsbGJhY2spXG4gICAgICB9XG5cbiAgICAgIGVtaXQgKG1lc3NhZ2VOYW1lLCAuLi5hcmdzKSB7XG4gICAgICAgIGNoZWNrTWVzc2FnZU5hbWUobWVzc2FnZU5hbWUpXG5cbiAgICAgICAgY29uc3QgYmVmb3JlTGlzdCA9IHNlbGYuX2hvb2tzW21lc3NhZ2VOYW1lXVxuICAgICAgICBpZiAoYmVmb3JlTGlzdCkge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBiZWZvcmVMaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IGJlZm9yZUxpc3RbaV1cbiAgICAgICAgICAgIGNhbGxiYWNrKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVtaXR0ZXIuZW1pdChtZXNzYWdlTmFtZSwgLi4uYXJncylcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiDlrprlkJHlj5HpgIHnu5nmn5DkuKrnu4Tku7bljZXkvovnmoTmtojmga9cbiAgICAgICAqIEBwYXJhbSBtZXNzYWdlTmFtZVxuICAgICAgICogQHBhcmFtIGFyZ3NcbiAgICAgICAqL1xuICAgICAgZW1pdFRvICh0YWcsIG1lc3NhZ2VOYW1lLCAuLi5hcmdzKSB7XG4gICAgICAgIGNoZWNrTWVzc2FnZU5hbWUobWVzc2FnZU5hbWUpXG5cbiAgICAgICAgcmV0dXJuIGVtaXR0ZXIuZW1pdChgJHttZXNzYWdlTmFtZX0ke0RJUkVDVF9FTUlUX0ZMQUd9JHt0YWd9YCwgLi4uYXJncylcbiAgICAgIH1cblxuICAgICAgb2ZmIChtZXNzYWdlTmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgY2hlY2tNZXNzYWdlTmFtZShtZXNzYWdlTmFtZSlcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXIub2ZmKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaylcbiAgICAgIH1cblxuICAgICAgcmVtb3ZlTGlzdGVuZXJzICgpIHtcbiAgICAgICAgY29uc3QgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5iaW5kKHRoaXMubGlzdGVuZXJzKVxuXG4gICAgICAgIGZvciAobGV0IG1lc3NhZ2VOYW1lIGluIHRoaXMubGlzdGVuZXJzKSB7XG4gICAgICAgICAgaWYgKGhhc093bihtZXNzYWdlTmFtZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMubGlzdGVuZXJzW21lc3NhZ2VOYW1lXSB8fCBbXVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSBjYWxsYmFja3NbaV1cbiAgICAgICAgICAgICAgZW1pdHRlci5vZmYobWVzc2FnZU5hbWUsIGNhbGxiYWNrKVxuICAgICAgICAgICAgICBlbWl0dGVyLm9mZihgJHttZXNzYWdlTmFtZX0ke0RJUkVDVF9FTUlUX0ZMQUd9JHt0YWd9YCwgY2FsbGJhY2spXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgbWVzc2FnZU5hbWUgaW4gdGhpcy5vbmNlTGlzdGVuZXJzKSB7XG4gICAgICAgICAgaWYgKGhhc093bihtZXNzYWdlTmFtZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMub25jZUxpc3RlbmVyc1ttZXNzYWdlTmFtZV0gfHwgW11cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrID0gY2FsbGJhY2tzW2ldXG4gICAgICAgICAgICAgIGVtaXR0ZXIub2ZmKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaylcbiAgICAgICAgICAgICAgZW1pdHRlci5vZmYoYCR7bWVzc2FnZU5hbWV9JHtESVJFQ1RfRU1JVF9GTEFHfSR7dGFnfWAsIGNhbGxiYWNrKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIOWcqOe7hOS7tumUgOavgeaXtu+8jOm7mOiupOWwhuWug+azqOWGjOeahOS6i+S7tuWFqOmDqOWNuOi9ve+8jOehruS/neS4jeS8mumAoOaIkOWGheWtmOazhOa8j1xuICAgICAgICovXG4gICAgICBkZXN0cm95ICgpIHtcbiAgICAgICAgLy8gc3RlcDEgdW5saXN0ZW4gZXZlbnRzXG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXJzKClcblxuICAgICAgICAvLyBzdGVwMiByZWxlYXNlIGZyb20gY29udGV4dFxuICAgICAgICBkZWxldGUgc2VsZi5faW5zdGFuY2VNYXBbdGFnXVxuICAgICAgICBpZiAoc3VwZXIuZGVzdHJveSkge1xuICAgICAgICAgIHN1cGVyLmRlc3Ryb3koKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2Nsc01hcFt0YWddID0gZW5oYW5jZWRcblxuICAgIC8qKlxuICAgICAqIGdldCBpbnN0YW5jZSBpbW1lZGlhdGVseVxuICAgICAqIGUuZyBjb25zdCBpbnN0YW5jZSA9IGNvbnRleHQucmVnaXN0cnkodGFnLCBDbHMpKGNvbmZpZylcbiAgICAgKiAqL1xuICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaW5pdEluc3RhbmNlKHRhZywgLi4uYXJncylcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog5a+55a2Y5Zyo55qE5a6e5L6L6L+b6KGMXG4gICAqL1xuICBkZXN0cm95SW5zdGFuY2VzICgpIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLl9pbnN0YW5jZU1hcCkuZm9yRWFjaCgodGFnKSA9PiB7XG4gICAgICBpZiAodGhpcy5faW5zdGFuY2VNYXBbdGFnXS5kZXN0cm95KSB7XG4gICAgICAgIHRoaXMuX2luc3RhbmNlTWFwW3RhZ10uZGVzdHJveSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiDnvJbop6PnoIHmtYHnqIvml6DpnIDlhbPms6jkuovku7bnmoTop6Pnu5FcbiAgICovXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuX2VtaXR0ZXIgPSBudWxsXG4gICAgdGhpcy5hbGxvd2VkRXZlbnRzID0gW11cbiAgICB0aGlzLl9jbHNNYXAgPSBudWxsXG4gICAgdGhpcy5fY29udGV4dCA9IG51bGxcbiAgICB0aGlzLmRlc3Ryb3lJbnN0YW5jZXMoKVxuICB9XG5cbiAgLyoqXG4gICAqIOWvueS/oemBk+i/m+ihjOaUtuaLolxuICAgKiBAcGFyYW0gbWVzc2FnZU5hbWVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pc01lc3NhZ2VOYW1lVmFsaWQgKG1lc3NhZ2VOYW1lKSB7XG4gICAgaWYgKCF0aGlzLmFsbG93ZWRFdmVudHMuaW5kZXhPZihtZXNzYWdlTmFtZSkgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVucmVnaXN0ZXJlZCBtZXNzYWdlIG5hbWU6ICR7bWVzc2FnZU5hbWV9YClcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29udGV4dFxuIiwiY29uc3QgbGUgPSAoZnVuY3Rpb24gKCkge1xuICBjb25zdCBidWYgPSBuZXcgQXJyYXlCdWZmZXIoMik7XG4gIChuZXcgRGF0YVZpZXcoYnVmKSkuc2V0SW50MTYoMCwgMjU2LCB0cnVlKSAvLyBsaXR0bGUtZW5kaWFuIHdyaXRlXG4gIHJldHVybiAobmV3IEludDE2QXJyYXkoYnVmKSlbMF0gPT09IDI1NiAvLyBwbGF0Zm9ybS1zcGVjIHJlYWQsIGlmIGVxdWFsIHRoZW4gTEVcbn0pKClcblxuZXhwb3J0IGRlZmF1bHQgbGVcbiIsImNvbnN0IGxlID0gKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgYnVmID0gbmV3IEFycmF5QnVmZmVyKDIpO1xuICAobmV3IERhdGFWaWV3KGJ1ZikpLnNldEludDE2KDAsIDI1NiwgdHJ1ZSkgLy8gbGl0dGxlLWVuZGlhbiB3cml0ZVxuICByZXR1cm4gKG5ldyBJbnQxNkFycmF5KGJ1ZikpWzBdID09PSAyNTYgLy8gcGxhdGZvcm0tc3BlYyByZWFkLCBpZiBlcXVhbCB0aGVuIExFXG59KSgpXG5cbmNvbnN0IHNuaWZmZXIgPSB7XG4gIGdldCBkZXZpY2UgKCkge1xuICAgIGxldCByID0gc25pZmZlci5vcztcbiAgICByZXR1cm4gci5pc1BjID8gJ3BjJyA6IHIuaXNUYWJsZXQgPyAndGFibGV0JyA6ICdtb2JpbGUnO1xuICB9LFxuICBnZXQgYnJvd3NlciAoKSB7XG4gICAgbGV0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xuICAgIGxldCByZWcgPSB7XG4gICAgICBpZTogL3J2OihbXFxkLl0rKVxcKSBsaWtlIGdlY2tvLyxcbiAgICAgIGZpcmZveDogL2ZpcmVmb3hcXC8oW1xcZC5dKykvLFxuICAgICAgY2hyb21lOiAvY2hyb21lXFwvKFtcXGQuXSspLyxcbiAgICAgIG9wZXJhOiAvb3BlcmEuKFtcXGQuXSspLyxcbiAgICAgIHNhZmFyaTogL3ZlcnNpb25cXC8oW1xcZC5dKykuKnNhZmFyaS9cbiAgICB9O1xuICAgIHJldHVybiBbXS5jb25jYXQoT2JqZWN0LmtleXMocmVnKS5maWx0ZXIoa2V5ID0+IHJlZ1trZXldLnRlc3QodWEpKSlbMF07XG4gIH0sXG4gIGdldCBvcyAoKSB7XG4gICAgbGV0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudFxuICAgIGxldCBpc1dpbmRvd3NQaG9uZSA9IC8oPzpXaW5kb3dzIFBob25lKS8udGVzdCh1YSlcbiAgICBsZXQgaXNTeW1iaWFuID0gLyg/OlN5bWJpYW5PUykvLnRlc3QodWEpIHx8IGlzV2luZG93c1Bob25lO1xuICAgIGxldCBpc0FuZHJvaWQgPSAvKD86QW5kcm9pZCkvLnRlc3QodWEpO1xuICAgIGxldCBpc0ZpcmVGb3ggPSAvKD86RmlyZWZveCkvLnRlc3QodWEpO1xuICAgIGxldCBpc1RhYmxldCA9IC8oPzppUGFkfFBsYXlCb29rKS8udGVzdCh1YSkgfHwgKGlzQW5kcm9pZCAmJiAhLyg/Ok1vYmlsZSkvLnRlc3QodWEpKSB8fCAoaXNGaXJlRm94ICYmIC8oPzpUYWJsZXQpLy50ZXN0KHVhKSk7XG4gICAgbGV0IGlzUGhvbmUgPSAvKD86aVBob25lKS8udGVzdCh1YSkgJiYgIWlzVGFibGV0O1xuICAgIGxldCBpc1BjID0gIWlzUGhvbmUgJiYgIWlzQW5kcm9pZCAmJiAhaXNTeW1iaWFuO1xuICAgIHJldHVybiB7XG4gICAgICBpc1RhYmxldCxcbiAgICAgIGlzUGhvbmUsXG4gICAgICBpc0FuZHJvaWQsXG4gICAgICBpc1BjLFxuICAgICAgaXNTeW1iaWFuLFxuICAgICAgaXNXaW5kb3dzUGhvbmUsXG4gICAgICBpc0ZpcmVGb3hcbiAgICB9O1xuICB9LFxuXG4gIGdldCBpc0xlICgpIHtcbiAgICByZXR1cm4gbGVcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgc25pZmZlcjtcbiIsImNsYXNzIFVURjgge1xuICBzdGF0aWMgZGVjb2RlICh1aW50OGFycmF5KSB7XG4gICAgY29uc3Qgb3V0ID0gW107XG4gICAgY29uc3QgaW5wdXQgPSB1aW50OGFycmF5O1xuICAgIGxldCBpID0gMDtcbiAgICBjb25zdCBsZW5ndGggPSB1aW50OGFycmF5Lmxlbmd0aDtcblxuICAgIHdoaWxlIChpIDwgbGVuZ3RoKSB7XG4gICAgICBpZiAoaW5wdXRbaV0gPCAweDgwKSB7XG4gICAgICAgIG91dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoaW5wdXRbaV0pKTtcbiAgICAgICAgKytpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH0gZWxzZSBpZiAoaW5wdXRbaV0gPCAweEMwKSB7XG4gICAgICAgIC8vIGZhbGx0aHJvdWdoXG4gICAgICB9IGVsc2UgaWYgKGlucHV0W2ldIDwgMHhFMCkge1xuICAgICAgICBpZiAoVVRGOC5fY2hlY2tDb250aW51YXRpb24oaW5wdXQsIGksIDEpKSB7XG4gICAgICAgICAgY29uc3QgdWNzNCA9IChpbnB1dFtpXSAmIDB4MUYpIDw8IDYgfCAoaW5wdXRbaSArIDFdICYgMHgzRik7XG4gICAgICAgICAgaWYgKHVjczQgPj0gMHg4MCkge1xuICAgICAgICAgICAgb3V0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSh1Y3M0ICYgMHhGRkZGKSk7XG4gICAgICAgICAgICBpICs9IDI7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaW5wdXRbaV0gPCAweEYwKSB7XG4gICAgICAgIGlmIChVVEY4Ll9jaGVja0NvbnRpbnVhdGlvbihpbnB1dCwgaSwgMikpIHtcbiAgICAgICAgICBjb25zdCB1Y3M0ID0gKGlucHV0W2ldICYgMHhGKSA8PCAxMiB8IChpbnB1dFtpICsgMV0gJiAweDNGKSA8PCA2IHwgaW5wdXRbaSArIDJdICYgMHgzRjtcbiAgICAgICAgICBpZiAodWNzNCA+PSAweDgwMCAmJiAodWNzNCAmIDB4RjgwMCkgIT09IDB4RDgwMCkge1xuICAgICAgICAgICAgb3V0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSh1Y3M0ICYgMHhGRkZGKSk7XG4gICAgICAgICAgICBpICs9IDM7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaW5wdXRbaV0gPCAweEY4KSB7XG4gICAgICAgIGlmIChVVEY4Ll9jaGVja0NvbnRpbnVhdGlvbihpbnB1dCwgaSwgMykpIHtcbiAgICAgICAgICBsZXQgdWNzNCA9IChpbnB1dFtpXSAmIDB4NykgPDwgMTggfCAoaW5wdXRbaSArIDFdICYgMHgzRikgPDwgMTIgfFxuICAgICAgICAgICAgICAgICAgICAoaW5wdXRbaSArIDJdICYgMHgzRikgPDwgNiB8IChpbnB1dFtpICsgM10gJiAweDNGKTtcbiAgICAgICAgICBpZiAodWNzNCA+IDB4MTAwMDAgJiYgdWNzNCA8IDB4MTEwMDAwKSB7XG4gICAgICAgICAgICB1Y3M0IC09IDB4MTAwMDA7XG4gICAgICAgICAgICBvdXQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKCh1Y3M0ID4+PiAxMCkgfCAweEQ4MDApKTtcbiAgICAgICAgICAgIG91dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoKHVjczQgJiAweDNGRikgfCAweERDMDApKTtcbiAgICAgICAgICAgIGkgKz0gNDtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgb3V0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgweEZGRkQpKTtcbiAgICAgICsraTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0LmpvaW4oJycpO1xuICB9XG5cbiAgc3RhdGljIF9jaGVja0NvbnRpbnVhdGlvbiAodWludDhhcnJheSwgc3RhcnQsIGNoZWNrTGVuZ3RoKSB7XG4gICAgbGV0IGFycmF5ID0gdWludDhhcnJheTtcbiAgICBpZiAoc3RhcnQgKyBjaGVja0xlbmd0aCA8IGFycmF5Lmxlbmd0aCkge1xuICAgICAgd2hpbGUgKGNoZWNrTGVuZ3RoLS0pIHtcbiAgICAgICAgaWYgKChhcnJheVsrK3N0YXJ0XSAmIDB4QzApICE9PSAweDgwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVVEY4O1xuIiwiY2xhc3MgQXVkaW9DdHgge1xuICBjb25zdHJ1Y3RvciAoY29uZmlnKSB7XG4gICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWcpO1xuICAgIGxldCBBdWRpb0NvbnRleHQgPSAgd2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0O1xuICAgIHRoaXMuY29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcbiAgICB0aGlzLmdhaW5Ob2RlID0gdGhpcy5jb250ZXh0LmNyZWF0ZUdhaW4oKTtcbiAgICB0aGlzLmdhaW5Ob2RlLmNvbm5lY3QodGhpcy5jb250ZXh0LmRlc3RpbmF0aW9uKTtcbiAgICB0aGlzLm1ldGEgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5zYW1wbGVzID0gW107XG4gICAgdGhpcy5wcmVsb2FkVGltZSA9IHRoaXMuY29uZmlnLnByZWxvYWRUaW1lIHx8IDM7XG4gICAgdGhpcy5kdXJhdGlvbiA9IDA7XG5cbiAgICB0aGlzLl9jdXJyZW50QnVmZmVyID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX25leHRCdWZmZXIgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fbGFzdHB0cyA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9wcmVEZWNvZGUgPSBbXTtcbiAgICB0aGlzLl9jdXJyZW50VGltZSA9IDA7XG4gICAgdGhpcy5fZGVjb2RpbmcgPSBmYWxzZTtcbiAgICAvLyDorrDlvZXlpJbpg6jkvKDovpPnmoTnirbmgIFcbiAgICB0aGlzLl9wbGF5ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIGdldCBjdXJyZW50VGltZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFRpbWU7XG4gIH1cblxuICBkZWNvZGVBdWRpbyAoYXVkaW9UcmFjaykge1xuICAgIGxldCB7c2FtcGxlc30gPSBhdWRpb1RyYWNrO1xuICAgIGxldCBkYXRhID0gc2FtcGxlcztcbiAgICBhdWRpb1RyYWNrLnNhbXBsZXMgPSBbXTtcbiAgICB0aGlzLnNldEF1ZGlvRGF0YShkYXRhKTtcbiAgfVxuICBzZXRBdWRpb0RhdGEgKGRhdGEpIHtcbiAgICBmb3IobGV0IGkgPSAwO2kgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBkYXRhW2ldLnB0cyA9IChkYXRhW2ldLnB0cyA9PT0gdW5kZWZpbmVkKSA/IGRhdGFbaV0uZHRzIDogZGF0YVtpXS5wdHM7XG4gICAgICB0aGlzLl9wcmVEZWNvZGUucHVzaChkYXRhW2ldKTtcbiAgICB9XG4gICAgaWYodGhpcy5fcHJlRGVjb2RlLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmKHRoaXMuX2xhc3RwdHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9sYXN0cHRzID0gdGhpcy5fcHJlRGVjb2RlWzBdLnB0cztcbiAgICAgIH1cbiAgICAgIGlmKCh0aGlzLl9wcmVEZWNvZGVbdGhpcy5fcHJlRGVjb2RlLmxlbmd0aCAtIDFdLnB0cyAtIHRoaXMuX2xhc3RwdHMpIC8gMTAwMCA+IHRoaXMucHJlbG9hZFRpbWUpIHtcbiAgICAgICAgdGhpcy5kZWNvZGVBQUMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkZWNvZGVBQUMoKSB7XG4gICAgaWYodGhpcy5fZGVjb2RpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZGVjb2RpbmcgPSB0cnVlO1xuICAgIGxldCBkYXRhID0gdGhpcy5fcHJlRGVjb2RlO1xuICAgIGxldCBzYW1wbGVzID0gW107XG4gICAgbGV0IF90aGlzID0gdGhpcztcbiAgICBsZXQgc2FtcGxlID0gZGF0YS5zaGlmdCgpO1xuICAgIHdoaWxlKHNhbXBsZSkge1xuICAgICAgbGV0IHNhbXBsZURhdGEgPSBBdWRpb0N0eC5nZXRBQUNEYXRhKHRoaXMubWV0YSwgc2FtcGxlKVxuICAgICAgc2FtcGxlcy5wdXNoKHNhbXBsZURhdGEpO1xuICAgICAgdGhpcy5fbGFzdHB0cyA9IHNhbXBsZS5wdHM7XG4gICAgICBzYW1wbGUgPSBkYXRhLnNoaWZ0KClcbiAgICB9XG4gICAgbGV0IGJ1ZmZlciA9IEF1ZGlvQ3R4LmNvbWJpbGVEYXRhKHNhbXBsZXMpO1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmNvbnRleHQuZGVjb2RlQXVkaW9EYXRhKGJ1ZmZlci5idWZmZXIsIGZ1bmN0aW9uKGJ1ZmZlcikge1xuICAgICAgICBsZXQgYXVkaW9Tb3VyY2UgPSBfdGhpcy5jb250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgICAgICBhdWRpb1NvdXJjZS5idWZmZXIgPSBidWZmZXI7XG4gICAgICAgIGF1ZGlvU291cmNlLm9uZW5kZWQgPSBfdGhpcy5vblNvdXJjZUVuZGVkLmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5zYW1wbGVzLnB1c2goe1xuICAgICAgICAgIHRpbWU6IF90aGlzLmR1cmF0aW9uLFxuICAgICAgICAgIGR1cmF0aW9uOiBidWZmZXIuZHVyYXRpb24sXG4gICAgICAgICAgZGF0YTogYXVkaW9Tb3VyY2VcbiAgICAgICAgfSlcblxuICAgICAgICBfdGhpcy5kdXJhdGlvbiArPSBidWZmZXIuZHVyYXRpb247XG5cbiAgICAgICAgaWYoIV90aGlzLl9jdXJyZW50QnVmZmVyKSB7XG4gICAgICAgICAgX3RoaXMuX2N1cnJlbnRCdWZmZXIgPSBfdGhpcy5nZXRUaW1lQnVmZmVyKF90aGlzLmN1cnJlbnRUaW1lKTtcblxuICAgICAgICAgIGlmKF90aGlzLl9wbGF5ZWQpIHtcbiAgICAgICAgICAgIF90aGlzLnBsYXkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZighX3RoaXMuX25leHRCdWZmZXIgJiYgX3RoaXMuX2N1cnJlbnRCdWZmZXIpIHtcbiAgICAgICAgICBfdGhpcy5fbmV4dEJ1ZmZlciA9IF90aGlzLmdldFRpbWVCdWZmZXIoX3RoaXMuY3VycmVudFRpbWUgKyBfdGhpcy5fY3VycmVudEJ1ZmZlci5kdXJhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuX2RlY29kaW5nID0gZmFsc2U7XG5cbiAgICAgICAgaWYoKF90aGlzLl9wcmVEZWNvZGUubGVuZ3RoID4gMCAmJiBfdGhpcy5fcHJlRGVjb2RlW190aGlzLl9wcmVEZWNvZGUubGVuZ3RoIC0gMV0ucHRzIC0gX3RoaXMuX2xhc3RwdHMpIC8gMTAwMCA+PSBfdGhpcy5wcmVsb2FkVGltZSkge1xuICAgICAgICAgIF90aGlzLmRlY29kZUFBQygpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfVxuICB9XG5cbiAgb25Tb3VyY2VFbmRlZCgpIHtcbiAgICBpZighdGhpcy5fbmV4dEJ1ZmZlciB8fCAhdGhpcy5fcGxheWVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBhdWRpb1NvdXJjZSA9IHRoaXMuX25leHRCdWZmZXIuZGF0YTtcbiAgICBhdWRpb1NvdXJjZS5zdGFydCgpO1xuICAgIGF1ZGlvU291cmNlLmNvbm5lY3QodGhpcy5nYWluTm9kZSk7XG4gICAgdGhpcy5fY3VycmVudEJ1ZmZlciA9IHRoaXMuX25leHRCdWZmZXI7XG4gICAgdGhpcy5fY3VycmVudFRpbWUgPSB0aGlzLl9jdXJyZW50QnVmZmVyLnRpbWU7XG4gICAgdGhpcy5fbmV4dEJ1ZmZlciA9IHRoaXMuZ2V0VGltZUJ1ZmZlcih0aGlzLmN1cnJlbnRUaW1lKTtcbiAgICBpZih0aGlzLl9jdXJyZW50QnVmZmVyKSB7XG4gICAgICB0aGlzLl9uZXh0QnVmZmVyID0gdGhpcy5nZXRUaW1lQnVmZmVyKHRoaXMuY3VycmVudFRpbWUgKyB0aGlzLl9jdXJyZW50QnVmZmVyLmR1cmF0aW9uKTtcbiAgICB9XG4gIH1cblxuICBwbGF5KCkge1xuICAgIHRoaXMuX3BsYXllZCA9IHRydWU7XG4gICAgaWYoIXRoaXMuX2N1cnJlbnRCdWZmZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGF1ZGlvU291cmNlID0gdGhpcy5fY3VycmVudEJ1ZmZlci5kYXRhO1xuICAgIGF1ZGlvU291cmNlLmNvbm5lY3QodGhpcy5nYWluTm9kZSk7XG4gICAgYXVkaW9Tb3VyY2Uuc3RhcnQoKTtcbiAgfVxuXG4gIGdldFRpbWVCdWZmZXIodGltZSkge1xuICAgIGxldCByZXQ7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuc2FtcGxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHNhbXBsZSA9IHRoaXMuc2FtcGxlc1tpXVxuICAgICAgaWYoc2FtcGxlLnRpbWUgPD0gdGltZSAmJiAoc2FtcGxlLnRpbWUgKyBzYW1wbGUuZHVyYXRpb24pID4gdGltZSkge1xuICAgICAgICByZXQgPSBzYW1wbGU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgc2V0QXVkaW9NZXRhRGF0YShtZXRhKSB7XG4gICAgdGhpcy5tZXRhID0gbWV0YTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRBQUNEYXRhKG1ldGEsIHNhbXBsZSkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgVWludDhBcnJheShzYW1wbGUuZGF0YS5ieXRlTGVuZ3RoICsgNyk7XG4gICAgbGV0IGFkdHMgPSBBdWRpb0N0eC5nZXRBZHRzKG1ldGEsIHNhbXBsZS5kYXRhKTtcbiAgICBidWZmZXIuc2V0KGFkdHMpO1xuICAgIGJ1ZmZlci5zZXQoc2FtcGxlLmRhdGEsIDcpO1xuICAgIHJldHVybiBidWZmZXI7XG4gIH1cblxuICBzdGF0aWMgY29tYmlsZURhdGEoc2FtcGxlcykge1xuICAgIC8vIGdldCBsZW5ndGhcbiAgICBsZXQgbGVuZ3RoID0gMDtcbiAgICBmb3IobGV0IGkgPSAwLGsgPSBzYW1wbGVzLmxlbmd0aDsgaSA8IGs7IGkrKykge1xuICAgICAgbGVuZ3RoICs9IHNhbXBsZXNbaV0uYnl0ZUxlbmd0aDtcbiAgICB9XG5cbiAgICBsZXQgcmV0ID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKTtcbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICAvLyBjb21iaWxlIGRhdGE7XG4gICAgZm9yKGxldCBpID0gMCxrID0gc2FtcGxlcy5sZW5ndGg7IGkgPCBrOyBpKyspIHtcbiAgICAgIHJldC5zZXQoc2FtcGxlc1tpXSwgb2Zmc2V0KTtcbiAgICAgIG9mZnNldCArPSBzYW1wbGVzW2ldLmJ5dGVMZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBzdGF0aWMgZ2V0QWR0cyhtZXRhLCBkYXRhKSB7XG4gICAgbGV0IGFkdHMgPSBuZXcgVWludDhBcnJheSg3KTtcblxuICAgIC8vIOiuvue9ruWQjOatpeS9jSAweGZmZiAxMmJpdFxuICAgIGFkdHNbMF0gPSAweGZmO1xuICAgIGFkdHNbMV0gPSAweGYwO1xuXG4gICAgLy8gT2JqZWN0IGRhdGEgKOayoeS7gOS5iOS6uueUqE1QRUctMuS6hu+8jEhMU+WSjEZMVuS5n+WFqOaYr01QRUctNO+8jOi/memHjOebtOaOpTApICAxYml0XG4gICAgLy8gTGV2ZWwgYWx3YXlzIDAwIDJiaXRcbiAgICAvLyBDUkMgYWx3YXlzIDEgMWJpdFxuICAgIGFkdHNbMV0gPSBhZHRzWzFdIHwgMHgwMTtcblxuICAgIC8vIHByb2ZpbGUgMmJpdFxuICAgIGFkdHNbMl0gPSAweGMwICYgKChtZXRhLm9iamVjdFR5cGUtMSkgPDwgNik7XG5cbiAgICAvL3NhbXBsZUZyZXF1ZW5jeUluZGV4XG4gICAgYWR0c1syXSA9IGFkdHNbMl0gfCAoMHgzYyAmIChtZXRhLnNhbXBsZVJhdGVJbmRleCA8PCAyKSlcblxuICAgIC8vcHJpdmF0ZSBiaXQgMCAxYml0XG4gICAgLy8gY2hhbmVsIGNvbmZpZ3VyYXRpb24gM2JpdFxuICAgIGFkdHNbMl0gPSBhZHRzWzJdIHwgKDB4MDEgJiBtZXRhLmNoYW5uZWxDb3VudCA+PiAyKTtcbiAgICBhZHRzWzNdID0gMHhjMCAmIChtZXRhLmNoYW5uZWxDb3VudCA8PCA2KTtcblxuICAgIC8vIG9yaWdpbmFsX2NvcHk6IDAgMWJpdFxuICAgIC8vIGhvbWU6IDAgMWJpdFxuXG4gICAgLy8gYWR0c192YXJpYWJsZV9oZWFkZXIoKVxuICAgIC8vIGNvcHlyaWdodGVkX2lkX2JpdCAwIDFiaXRcbiAgICAvLyBjb3B5cmlnaHRlZF9pZF9zdGFydCAwIDFiaXRcblxuICAgIC8vIGFhY19mcmFtZV9sZW5ndGggMTNiaXQ7XG4gICAgbGV0IGFhY2ZyYW1lbGVuZ3RoID0gZGF0YS5ieXRlTGVuZ3RoICsgNztcblxuICAgIGFkdHNbM10gPSBhZHRzWzNdIHwgKDB4MDMgJiBhYWNmcmFtZWxlbmd0aCA+PiAxMSk7XG4gICAgYWR0c1s0XSA9IDB4ZmYgJiAoYWFjZnJhbWVsZW5ndGggPj4gMyk7XG4gICAgYWR0c1s1XSA9IDB4ZTAgJiAoYWFjZnJhbWVsZW5ndGggPDwgNSk7XG5cbiAgICAvLyBhZHRzX2J1ZmZlcl9mdWxsbmVzcyAweDdmZiAxMWJpdFxuICAgIGFkdHNbNV0gPSBhZHRzWzVdIHwgMHgxZlxuICAgIGFkdHNbNl0gPSAweGZjO1xuXG4gICAgLy8gbnVtYmVyX29mX3Jhd19kYXRhX2Jsb2Nrc19pbl9mcmFtZSAwIDJiaXQ7XG4gICAgcmV0dXJuIGFkdHM7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXVkaW9DdHg7XG4iLCJpbXBvcnQgVmlkZW9DdHggZnJvbSAnLi92aWRlby1jb250ZXh0JztcbmltcG9ydCBBdWRpb0N0eCBmcm9tICcuL2F1ZGlvLWNvbnRleHQnO1xuaW1wb3J0IHsgZ2V0VGlja2VyIH0gZnJvbSAnLi90aWNrZXInO1xuXG4vKipcbiAqIOmfs+eUu+WQjOatpeiwg+WSjOWZqFxuICovXG5jbGFzcyBBVlJlY29uY2lsZXIge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICB0aGlzLmFDdHggPSBwcm9wcy5hQ3R4O1xuICAgIHRoaXMudkN0eCA9IHByb3BzLnZDdHg7XG5cbiAgICB0aGlzLnRpbWVvdXRJZCA9IG51bGxcbiAgfVxuXG4gIGRvUmVjb25jaWxlICgpIHtcbiAgICBjb25zdCB2Q3VyVGltZSA9IHRoaXMudkN0eC5jdXJyZW50VGltZSB8fCAwO1xuICAgIGNvbnN0IGFDdXJUaW1lID0gKHRoaXMuYUN0eC5jdXJyZW50VGltZSB8fCAwKSAqIDEwMDA7XG5cbiAgICBjb25zdCBnYXAgPSB2Q3VyVGltZSAtIGFDdXJUaW1lO1xuICAgIGlmICh0aGlzLnRpbWVvdXRJZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZ2FwID4gMjAwMCkgeyAvLyBhdWRpbyBkZWxheWVkIGZvciBtb3JlIHRoYW4gMTAwbXNcbiAgICAgIC8vIHRoaXMudkN0eC5wYXVzZSgpXG4gICAgICAvLyB0aGlzLnRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgLy8gICB0aGlzLnZDdHgucGxheSgpXG4gICAgICAvLyAgIHRoaXMudGltZW91dElkID0gbnVsbFxuICAgICAgLy8gfSwgZ2FwKVxuICAgIH0gZWxzZSBpZiAoZ2FwIDwgLTIwMCkge1xuICAgICAgdGhpcy52Q3R4LmN1cnJlbnRUaW1lID0gdGhpcy52Q3R4LmN1cnJlbnRUaW1lICsgTWF0aC5hYnMoZ2FwKTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmFDdHggPSBudWxsXG4gICAgdGhpcy52Q3R4ID0gbnVsbFxuICB9XG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuY2xhc3MgTW9iaWxlVmlkZW8gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yIChjb25maWcpIHtcbiAgICBzdXBlcigpO1xuICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy52Q3R4ID0gbmV3IFZpZGVvQ3R4KCk7XG4gICAgdGhpcy5hQ3R4ID0gbmV3IEF1ZGlvQ3R4KGNvbmZpZyk7XG4gICAgdGhpcy50aWNrZXIgPSBuZXcgKGdldFRpY2tlcigpKSgpXG4gICAgdGhpcy5oaXN0b3J5VGltZSA9IDA7XG4gICAgdGhpcy5yZWNvbmNpbGVyID0gbmV3IEFWUmVjb25jaWxlcih7XG4gICAgICB2Q3R4OiB0aGlzLnZDdHgsXG4gICAgICBhQ3R4OiB0aGlzLmFDdHhcbiAgICB9KVxuXG4gICAgdGhpcy5pbml0KClcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIHRoaXMudkN0eC5vbmNhbnBsYXkgPSAoKSA9PiB7XG4gICAgICB0aGlzLmFwcGVuZENoaWxkKHRoaXMudkN0eC5jYW52YXMpO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjYW5wbGF5JykpO1xuICAgIH1cblxuICAgIHRoaXMudGlja2VyLnN0YXJ0KCgpID0+IHtcbiAgICAgIC8vIHRoaXMucmVjb25jaWxlci5kb1JlY29uY2lsZSgpXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLmFDdHguY3VycmVudFRpbWUpXG5cbiAgICB9KVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5yZWNvbmNpbGVyLmRlc3Ryb3koKVxuICB9XG5cbiAgb25EZW11eENvbXBsZXRlICh2aWRlb1RyYWNrLCBhdWRpb1RyYWNrKSB7XG4gICAgdGhpcy5hQ3R4LmRlY29kZUF1ZGlvKGF1ZGlvVHJhY2spO1xuICAgIHRoaXMudkN0eC5kZWNvZGVWaWRlbyh2aWRlb1RyYWNrKTtcbiAgfVxuXG4gIHNldEF1ZGlvTWV0YSAobWV0YSkge1xuICAgIHRoaXMuYUN0eC5zZXRBdWRpb01ldGFEYXRhKG1ldGEpO1xuICB9XG5cbiAgc2V0VmlkZW9NZXRhIChtZXRhKSB7XG4gICAgdGhpcy52Q3R4LnNldFZpZGVvTWV0YURhdGEobWV0YSk7XG4gIH1cblxuICBnZXQgY3VycmVudFRpbWUgKCkge1xuXG4gIH1cblxuICBwbGF5ICgpIHtcbiAgICAvLyBpZiAoIXRoaXMudkN0eC4pXG4gICAgdGhpcy52Q3R4LnBsYXkoKTtcbiAgICB0aGlzLmFDdHgucGxheSgpO1xuICB9XG59XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbW9iaWxlLXZpZGVvJywgTW9iaWxlVmlkZW8pO1xuIiwiY2xhc3MgU291cmNlQnVmZmVyIHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZykge1xuICAgIHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnKTtcbiAgICB0aGlzLnR5cGUgPSB0aGlzLmNvbmZpZy50eXBlO1xuICAgIHRoaXMuYnVmZmVyID0gW107XG4gICAgdGhpcy5jdXJyZW50R29wID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2xhc3RHZXQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBwdXNoIChmcmFtZSkge1xuICAgIGlmICh0aGlzLnR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgIGlmIChmcmFtZS5pc0tleWZyYW1lKSB7XG4gICAgICAgIGxldCBjdXJyZW50R29wID0ge1xuICAgICAgICAgIHNhbXBsZXM6IFtdLFxuICAgICAgICAgIHN0YXJ0OiBmcmFtZS5kdHMsXG4gICAgICAgICAgZW5kOiBmcmFtZS5kdHMsXG4gICAgICAgICAgbmV4dEdvcDogdW5kZWZpbmVkXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRHb3ApIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRHb3AubmV4dEdvcCA9IGN1cnJlbnRHb3A7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50R29wID0gY3VycmVudEdvcDtcbiAgICAgICAgdGhpcy5idWZmZXIucHVzaCh0aGlzLmN1cnJlbnRHb3ApO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jdXJyZW50R29wKSB7XG4gICAgICAgIHRoaXMuY3VycmVudEdvcC5zYW1wbGVzLnB1c2goZnJhbWUpO1xuXG4gICAgICAgIGlmIChmcmFtZS5kdHMgPCB0aGlzLmN1cnJlbnRHb3Auc3RhcnQpIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRHb3Auc3RhcnQgPSBmcmFtZS5kdHM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZnJhbWUuZHRzID4gdGhpcy5jdXJyZW50R29wLmVuZCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudEdvcC5lbmQgPSBmcmFtZS5kdHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQgKHRpbWUpIHtcbiAgICBpZiAodGhpcy50eXBlID09PSAndmlkZW8nKSB7XG4gICAgICBpZiAodGhpcy5idWZmZXIubGVuZ3RoIDwgMSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0aW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbGV0IHNhbXBsZSA9IHRoaXMuX2dldE5leHQoKTtcbiAgICAgICAgcmV0dXJuIHNhbXBsZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfZ2V0TmV4dCAoKSB7XG4gICAgaWYgKCF0aGlzLl9sYXN0R2V0KSB7XG4gICAgICBsZXQgZ29wID0gdGhpcy5idWZmZXJbMF07XG4gICAgICBpZiAoZ29wLnNhbXBsZXMubGVuZ3RoIDwgMSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgdGhpcy5fbGFzdEdldCA9IHtcbiAgICAgICAgZ29wLFxuICAgICAgICBpbmRleDogMFxuICAgICAgfVxuICAgICAgcmV0dXJuIGdvcC5zYW1wbGVzWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZ29wID0gdGhpcy5fbGFzdEdldC5nb3A7XG4gICAgICBsZXQgc2FtcGxlID0gZ29wLnNhbXBsZXNbdGhpcy5fbGFzdEdldC5pbmRleCArIDFdO1xuICAgICAgaWYgKHNhbXBsZSkge1xuICAgICAgICB0aGlzLl9sYXN0R2V0LmluZGV4ID0gdGhpcy5fbGFzdEdldC5pbmRleCArIDE7XG4gICAgICAgIHJldHVybiBzYW1wbGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnb3AgPSBnb3AubmV4dEdvcDtcbiAgICAgICAgaWYgKCFnb3AgfHwgZ29wLnNhbXBsZXMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzYW1wbGUgPSBnb3Auc2FtcGxlc1swXTtcbiAgICAgICAgdGhpcy5fbGFzdEdldCA9IHtcbiAgICAgICAgICBnb3AsXG4gICAgICAgICAgaW5kZXg6IDBcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2FtcGxlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZSAoc3RhcnQsIGVuZCkge1xuICAgIGlmICh0aGlzLmJ1ZmZlci5sZW5ndGggPCAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCBnb3AgPSB0aGlzLmJ1ZmZlclswXTtcbiAgICB3aGlsZSAoZ29wKSB7XG4gICAgICBpZiAoZ29wLmVuZCA8IGVuZCAmJiBnb3Auc3RhcnQgPj0gc3RhcnQpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuYnVmZmVyW2ldO1xuICAgICAgICBnb3AgPSB0aGlzLmJ1ZmZlcltpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGkgKz0gMTtcbiAgICAgICAgZ29wID0gdGhpcy5idWZmZXJbaV07XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNvdXJjZUJ1ZmZlcjtcbiIsIi8qKlxuICogQGF1dGhvciBmdXl1aGFvQGJ5dGVkYW5jZS5jb21cbiAqL1xuXG5jbGFzcyBUaWNrZXIge1xuICBjb25zdHJ1Y3RvciAob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMgfHwge30sIHtcbiAgICAgIGludGVydmFsOiAxNlxuICAgIH0pXG5cbiAgICB0aGlzLmNhbGxiYWNrcyA9IFtdXG4gIH1cblxuICBzdGFydCguLi5jYWxsYmFja3MpIHtcbiAgICB0aGlzLmNhbGxiYWNrcyA9IGNhbGxiYWNrc1xuICB9XG5cbiAgb25UaWNrICgpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5jYWxsYmFja3MubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IGNhbGxiYWNrID0gdGhpcy5jYWxsYmFja3NbaV1cbiAgICAgIGNhbGxiYWNrKClcbiAgICB9XG4gIH1cblxuICBzZXRJbnRlcnZhbCAoaW50ZXJ2YWwpIHtcbiAgICB0aGlzLm9wdGlvbnMuaW50ZXJ2YWwgPSBpbnRlcnZhbFxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbi8qKlxuICogdGlja2VyIHVzZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAqL1xuY2xhc3MgUmFmVGlja2VyIGV4dGVuZHMgVGlja2VyIHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMucHJldiA9IG51bGw7XG4gICAgdGhpcy50aW1lcklkID0gbnVsbFxuICAgIHRoaXMuX3N1YlRpbWVySWQgPSBudWxsXG5cbiAgICB0aGlzLl90aWNrRnVuYyA9IFJhZlRpY2tlci5nZXRUaWNrRnVuYygpXG4gICAgdGhpcy50aWNrID0gdGhpcy50aWNrLmJpbmQodGhpcylcbiAgfVxuXG4gIHN0YXJ0ICguLi5jYWxsYmFja3MpIHtcbiAgICBzdXBlci5zdGFydCguLi5jYWxsYmFja3MpXG4gICAgdGhpcy50aWNrKClcbiAgfVxuXG4gIHRpY2sgKHRpbWVzdGFtcCkge1xuICAgIGNvbnNvbGUubG9nKHRpbWVzdGFtcClcbiAgICB0aGlzLm5leHRUaWNrKCk7XG4gICAgdGhpcy5vblRpY2soKVxuICB9XG5cbiAgbmV4dFRpY2sgKCkge1xuICAgIGNvbnN0IHsgX3RpY2tGdW5jIH0gPSB0aGlzO1xuICAgIHRoaXMudGltZXJJZCA9IF90aWNrRnVuYyh0aGlzLnRpY2spXG4gIH1cblxuICBzdG9wICgpIHtcbiAgICBpZiAodGhpcy50aW1lcklkKSB7XG4gICAgICBjb25zdCBjYW5jZWxGdW5jID0gUmFmVGlja2VyLmdldENhbmNlbEZ1bmMoKVxuXG4gICAgICBjYW5jZWxGdW5jKHRoaXMudGltZXJJZClcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0VGlja0Z1bmMgKCkge1xuICAgIHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgfVxuXG4gIHN0YXRpYyBnZXRDYW5jZWxGdW5jICgpIHtcbiAgICByZXR1cm4gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZVxuICB9XG5cbiAgc3RhdGljIGlzU3VwcG9ydGVkICgpIHtcbiAgICByZXR1cm4gUmFmVGlja2VyLmdldFRpY2tGdW5jKCkgIT09IHVuZGVmaW5lZFxuICB9XG59XG5cbi8qKlxuICogdXNlIHNldFRpbWVvdXQgZm9yIGJyb3dzZXJzIHdpdGhvdXQgcmFmIHN1cHBvcnRcbiAqL1xuY2xhc3MgVGltZW91dFRpY2tlciBleHRlbmRzIFRpY2tlciB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKGNvbmZpZylcbiAgICB0aGlzLnRpbWVvdXRJZCA9IG51bGxcblxuICB9XG5cbiAgc3RhcnQgKC4uLmNhbGxiYWNrcykge1xuICAgIHN1cGVyLm5leHRUaWNrKC4uLmNhbGxiYWNrcylcbiAgICB0aGlzLnRpbWVvdXRJZCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICB0aGlzLm9uVGljaygpO1xuICAgIH0sIHRoaXMub3B0aW9ucy5pbnRlcnZhbCB8fCAxNilcbiAgfVxuXG4gIHN0b3AgKCkge1xuICAgIGlmICh0aGlzLnRpbWVvdXRJZCkge1xuICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy50aW1lb3V0SWQpXG4gICAgfVxuICB9XG5cbn1cblxuLyoqXG4gKiDov5Tlm55UaWNrZXLmnoTpgKDlh73mlbBcbiAqIEByZXR1cm5zIHtUaWNrZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRUaWNrZXIgPSAoKSA9PiB7XG4gIGlmIChSYWZUaWNrZXIuaXNTdXBwb3J0ZWQoKSkge1xuICAgIHJldHVybiBSYWZUaWNrZXJcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gVGltZW91dFRpY2tlclxuICB9XG59XG4iLCJpbXBvcnQgV29ya2VyaWZ5IGZyb20gJ3dlYndvcmtpZnktd2VicGFjaydcbmltcG9ydCBTdHJlYW0gZnJvbSAnLi4vd3JpdGUvc3RyZWFtJztcbmltcG9ydCBOYWx1bml0IGZyb20gJy4uLy4uLy4uL3hncGxheWVyLWNvZGVjL3NyYy9oMjY0L25hbHVuaXQnO1xuaW1wb3J0IFlVVkNhbnZhcyBmcm9tICcuL3l1di1jYW52YXMnO1xuaW1wb3J0IFNvdXJjZUJ1ZmZlciBmcm9tICcuL3NvdXJjZWJ1ZmZlcic7XG5jbGFzcyBWaWRlb0NhbnZhcyB7XG4gIGNvbnN0cnVjdG9yIChjb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZyk7XG4gICAgdGhpcy5jYW52YXMgPSB0aGlzLmNvbmZpZy5jYW52YXMgPyB0aGlzLmNvbmZpZy5jYW52YXMgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICB0aGlzLnNvdXJjZSA9IG5ldyBTb3VyY2VCdWZmZXIoe3R5cGU6ICd2aWRlbyd9KTtcbiAgICB0aGlzLnByZWxvYWRUaW1lID0gdGhpcy5jb25maWcucHJlbG9hZFRpbWUgfHwgMztcbiAgICB0aGlzLm9uY2FucGxheSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm9uRmlyc3RGcmFtZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm1ldGEgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5yZWFkeVN0YXR1cyA9IDA7XG4gICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgIHRoaXMuY291bnQgPSAwO1xuICAgIHRoaXMuY3VycmVudFRpbWUgPSAwO1xuICAgIHRoaXMubGFzdFBsYXllZCA9IDA7XG5cbiAgICB0aGlzLl9kZWNvZGVySW5pdGVkID0gZmFsc2U7XG4gICAgdGhpcy5fYXZjY3B1c2hlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2RlY29kZWRGcmFtZXMgPSB7fTtcbiAgICB0aGlzLl9sYXN0U2FtcGxlRHRzID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2Jhc2VEdHMgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5pbml0V2FzbVdvcmtlcigpO1xuICB9XG5cbiAgaW5pdFdhc21Xb3JrZXIgKCkge1xuICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy53YXNtd29ya2VyID0gV29ya2VyaWZ5KHJlcXVpcmUucmVzb2x2ZSgnLi93b3JrZXIuanMnKSk7XG4gICAgdGhpcy53YXNtd29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgIG1zZzogJ2luaXQnXG4gICAgfSlcbiAgICB0aGlzLndhc213b3JrZXIuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIG1zZyA9PiB7XG4gICAgICBzd2l0Y2ggKG1zZy5kYXRhLm1zZykge1xuICAgICAgICBjYXNlICdERUNPREVSX1JFQURZJzpcbiAgICAgICAgICBfdGhpcy5fZGVjb2RlckluaXRlZCA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0RFQ09ERUQnOlxuICAgICAgICAgIHRoaXMuX29uRGVjb2RlZChtc2cuZGF0YSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzZXRWaWRlb01ldGFEYXRhIChtZXRhKSB7XG4gICAgdGhpcy5tZXRhID0gbWV0YTtcbiAgICBpZiAoIXRoaXMuX2RlY29kZXJJbml0ZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLl9hdmNjcHVzaGVkID0gdHJ1ZTtcbiAgICBsZXQgZGF0YSA9IG5ldyBVaW50OEFycmF5KG1ldGEuc3BzLmJ5dGVMZW5ndGggKyA0KTtcbiAgICBkYXRhLnNldChbMCwgMCwgMCwgMV0pXG4gICAgZGF0YS5zZXQobWV0YS5zcHMsIDQpO1xuICAgIHRoaXMud2FzbXdvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICBtc2c6ICdkZWNvZGUnLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pXG5cbiAgICBkYXRhID0gbmV3IFVpbnQ4QXJyYXkobWV0YS5wcHMuYnl0ZUxlbmd0aCArIDQpO1xuICAgIGRhdGEuc2V0KFswLCAwLCAwLCAxXSlcbiAgICBkYXRhLnNldChtZXRhLnBwcywgNCk7XG4gICAgdGhpcy53YXNtd29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgIG1zZzogJ2RlY29kZScsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSlcblxuICAgIGlmICghdGhpcy55dXZDYW52YXMpIHtcbiAgICAgIGxldCBjb25maWcgPSBPYmplY3QuYXNzaWduKHttZXRhLCBjYW52YXM6IHRoaXMuY2FudmFzfSwgdGhpcy5jb25maWcpO1xuICAgICAgdGhpcy55dXZDYW52YXMgPSBuZXcgWVVWQ2FudmFzKGNvbmZpZyk7XG4gICAgfVxuICAgIHRoaXMucmVhZHlTdGF0dXMgPSAxO1xuICB9XG5cbiAgZGVjb2RlVmlkZW8gKHZpZGVvVHJhY2spIHtcbiAgICBpZiAoIXRoaXMuX2RlY29kZXJJbml0ZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICghdGhpcy5fYXZjY3B1c2hlZCkge1xuICAgICAgdGhpcy5zZXRWaWRlb01ldGFEYXRhKHRoaXMubWV0YSk7XG4gICAgfVxuICAgIGxldCB7IHNhbXBsZXMgfSA9IHZpZGVvVHJhY2s7XG4gICAgbGV0IHNhbXBsZSA9IHNhbXBsZXMuc2hpZnQoKTtcblxuICAgIHdoaWxlIChzYW1wbGUpIHtcbiAgICAgIGlmICghdGhpcy5fYmFzZUR0cykge1xuICAgICAgICB0aGlzLl9iYXNlRHRzID0gc2FtcGxlLmR0cztcbiAgICAgIH1cbiAgICAgIHRoaXMuc291cmNlLnB1c2goc2FtcGxlKTtcbiAgICAgIHNhbXBsZSA9IHNhbXBsZXMuc2hpZnQoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9wcmVsb2FkKCk7XG4gIH1cblxuICBfcHJlbG9hZCAoKSB7XG4gICAgaWYgKCF0aGlzLl9sYXN0U2FtcGxlRHRzIHx8IHRoaXMuX2xhc3RTYW1wbGVEdHMgLSB0aGlzLl9iYXNlRHRzIDwgdGhpcy5jdXJyZW50VGltZSArIHRoaXMucHJlbG9hZFRpbWUgKiAxMDAwKSB7XG4gICAgICBsZXQgc2FtcGxlID0gdGhpcy5zb3VyY2UuZ2V0KCk7XG4gICAgICBpZiAoc2FtcGxlKSB7XG4gICAgICAgIHRoaXMuX2xhc3RTYW1wbGVEdHMgPSBzYW1wbGUuZHRzO1xuICAgICAgICB0aGlzLl9hbmFseXNlTmFsKHNhbXBsZSk7XG4gICAgICB9XG5cbiAgICAgIHdoaWxlIChzYW1wbGUgJiYgdGhpcy5fbGFzdFNhbXBsZUR0cyAtIHRoaXMuX2Jhc2VEdHMgPCB0aGlzLmN1cnJlbnRUaW1lICsgdGhpcy5wcmVsb2FkVGltZSAqIDEwMDApIHtcbiAgICAgICAgc2FtcGxlID0gdGhpcy5zb3VyY2UuZ2V0KCk7XG4gICAgICAgIGlmIChzYW1wbGUpIHtcbiAgICAgICAgICB0aGlzLl9hbmFseXNlTmFsKHNhbXBsZSk7XG4gICAgICAgICAgdGhpcy5fbGFzdFNhbXBsZUR0cyA9IHNhbXBsZS5kdHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfYW5hbHlzZU5hbCAoc2FtcGxlKSB7XG4gICAgbGV0IG5hbHMgPSBOYWx1bml0LmdldEF2Y2NOYWxzKG5ldyBTdHJlYW0oc2FtcGxlLmRhdGEuYnVmZmVyKSk7XG5cbiAgICBsZXQgbGVuZ3RoID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBuYWwgPSBuYWxzW2ldO1xuICAgICAgbGVuZ3RoICs9IG5hbC5ib2R5LmJ5dGVMZW5ndGggKyA0O1xuICAgIH1cbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICBsZXQgZGF0YSA9IG5ldyBVaW50OEFycmF5KGxlbmd0aCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgbmFsID0gbmFsc1tpXTtcbiAgICAgIGRhdGEuc2V0KFswLCAwLCAwLCAxXSwgb2Zmc2V0KTtcbiAgICAgIG9mZnNldCArPSA0O1xuICAgICAgZGF0YS5zZXQobmV3IFVpbnQ4QXJyYXkobmFsLmJvZHkpLCBvZmZzZXQpO1xuICAgICAgb2Zmc2V0ICs9IG5hbC5ib2R5LmJ5dGVMZW5ndGg7XG4gICAgfVxuICAgIHRoaXMud2FzbXdvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICBtc2c6ICdkZWNvZGUnLFxuICAgICAgZGF0YTogZGF0YSxcbiAgICAgIGluZm86IHtcbiAgICAgICAgZHRzOiBzYW1wbGUuZHRzLFxuICAgICAgICBwdHM6IHNhbXBsZS5wdHMgPyBzYW1wbGUucHRzIDogc2FtcGxlLmR0cyArIHNhbXBsZS5jdHMsXG4gICAgICAgIGtleTogc2FtcGxlLmlzS2V5ZnJhbWVcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgX29uRGVjb2RlZCAoZGF0YSkge1xuICAgIGxldCB7ZHRzfSA9IGRhdGEuaW5mb1xuICAgIHRoaXMuX2RlY29kZWRGcmFtZXNbZHRzXSA9IGRhdGE7XG4gIH1cblxuICBwbGF5ICgpIHtcbiAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICAgIHRoaXMuX29uVGltZXIoKTtcbiAgfVxuXG4gIF9vblRpbWVyICgpIHtcbiAgICBsZXQgcmVuZGVyQ29zdCA9IDA7XG4gICAgY29uc3QgcmVuZGVyU3RhcnQgPSBEYXRlLm5vdygpXG4gICAgaWYgKHRoaXMucGF1c2VkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBuZXh0VGltZSA9IDEwMDAgLyA2MDtcbiAgICBpZiAodGhpcy5tZXRhKSB7XG4gICAgICBpZiAodGhpcy5tZXRhLmZyYW1lUmF0ZSAmJiB0aGlzLm1ldGEuZnJhbWVSYXRlLmZpeGVkICYmIHRoaXMubWV0YS5mcmFtZVJhdGUuZnBzKSB7XG4gICAgICAgIG5leHRUaW1lID0gTWF0aC5jZWlsKDEwMDAgLyB0aGlzLm1ldGEuZnJhbWVSYXRlLmZwcyk7XG4gICAgICB9XG4gICAgICBsZXQgZnJhbWVUaW1lcyA9IE9iamVjdC5rZXlzKHRoaXMuX2RlY29kZWRGcmFtZXMpO1xuICAgICAgaWYgKGZyYW1lVGltZXMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRUaW1lICs9IG5leHRUaW1lO1xuICAgICAgICBsZXQgZnJhbWVUaW1lID0gLTE7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnJhbWVUaW1lcy5sZW5ndGggJiYgZnJhbWVUaW1lc1tpXSAtIHRoaXMuX2Jhc2VEdHMgPD0gdGhpcy5jdXJyZW50VGltZTsgaSsrKSB7XG4gICAgICAgICAgZnJhbWVUaW1lID0gZnJhbWVUaW1lc1tpXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBsZXQgZnJhbWUgPSB0aGlzLl9kZWNvZGVkRnJhbWVzW2ZyYW1lVGltZV07XG4gICAgICAgIGlmIChmcmFtZSkge1xuICAgICAgICAgIGlmICh0aGlzLm9uY2FucGxheSAmJiB0aGlzLnJlYWR5U3RhdHVzIDwgNCkge1xuICAgICAgICAgICAgdGhpcy5vbmNhbnBsYXkoKTtcbiAgICAgICAgICAgIHRoaXMucmVhZHlTdGF0dXMgPSA0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zb2xlLmxvZygndmlkZW8gdGltZScsIHRoaXMuY3VycmVudFRpbWUpXG4gICAgICAgICAgdGhpcy55dXZDYW52YXMucmVuZGVyKGZyYW1lLmJ1ZmZlciwgZnJhbWUud2lkdGgsIGZyYW1lLmhlaWdodCk7XG4gICAgICAgICAgcmVuZGVyQ29zdCA9IERhdGUubm93KCkgLSByZW5kZXJTdGFydDtcbiAgICAgICAgICBkZWxldGUgdGhpcy5fZGVjb2RlZEZyYW1lc1tmcmFtZVRpbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2NsZWFuQnVmZmVyKCk7XG4gICAgc2V0VGltZW91dCh0aGlzLl9vblRpbWVyLmJpbmQodGhpcyksIG5leHRUaW1lIC0gcmVuZGVyQ29zdCk7XG4gIH1cblxuICBfY2xlYW5CdWZmZXIgKCkge1xuICAgIHRoaXMuc291cmNlLnJlbW92ZSgwLCB0aGlzLmN1cnJlbnRUaW1lKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgVmlkZW9DYW52YXM7XG4iLCJjb25zdCBNQVhfU1RSRUFNX0JVRkZFUl9MRU5HVEggPSAxMDI0ICogMTAyNDtcbnZhciBEZWNvZGVyID0gZnVuY3Rpb24gKHNlbGYpIHtcbiAgdGhpcy5pbml0ZWQgPSBmYWxzZTtcbiAgdGhpcy5zZWxmID0gc2VsZjtcbiAgdGhpcy5pbmZvbGlzdCA9IHt9O1xuICBzZWxmLnBhcl9icm9hZHdheU9uQnJvYWR3YXlJbml0ZWQgPSB0aGlzLmJyb2Fkd2F5T25Ccm9hZHdheUluaXRlZC5iaW5kKHRoaXMpO1xuICBzZWxmLnBhcl9icm9hZHdheU9uUGljdHVyZURlY29kZWQgPSB0aGlzLmJyb2Fkd2F5T25QaWN0dXJlRGVjb2RlZC5iaW5kKHRoaXMpO1xufVxuXG5EZWNvZGVyLnByb3RvdHlwZS50b1U4QXJyYXkgPSBmdW5jdGlvbiAocHRyLCBsZW5ndGgpIHtcbiAgcmV0dXJuIHRoaXMuc2VsZi5IRUFQVTguc3ViYXJyYXkocHRyLCBwdHIgKyBsZW5ndGgpO1xufVxuXG5EZWNvZGVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICBNb2R1bGUuX2Jyb2Fkd2F5SW5pdCgpO1xuICB0aGlzLnN0cmVhbUJ1ZmZlciA9IHRoaXMudG9VOEFycmF5KE1vZHVsZS5fYnJvYWR3YXlDcmVhdGVTdHJlYW0oTUFYX1NUUkVBTV9CVUZGRVJfTEVOR1RIKSwgTUFYX1NUUkVBTV9CVUZGRVJfTEVOR1RIKTtcbn1cblxuRGVjb2Rlci5wcm90b3R5cGUuYnJvYWR3YXlPblBpY3R1cmVEZWNvZGVkID0gZnVuY3Rpb24gKG9mZnNldCwgd2lkdGgsIGhlaWdodCwgaW5mb2lkKSB7XG4gIGxldCBpbmZvID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5pbmZvbGlzdFtpbmZvaWRdKTtcbiAgbGV0IGRhdGEgPSB0aGlzLnRvVThBcnJheShvZmZzZXQsICh3aWR0aCAqIGhlaWdodCAqIDMpIC8gMik7XG4gIHRoaXMuaW5mb2xpc3RbaW5mb2lkXSA9IG51bGw7XG4gIGxldCBkYXRldGVtcCA9IG5ldyBVaW50OEFycmF5KGRhdGEubGVuZ3RoKTtcbiAgZGF0ZXRlbXAuc2V0KGRhdGEpO1xuICBsZXQgYnVmZmVyID0gZGF0ZXRlbXAuYnVmZmVyO1xuICB0aGlzLnNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgIG1zZzogJ0RFQ09ERUQnLFxuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICBpbmZvLFxuICAgIGJ1ZmZlclxuICB9LCBbYnVmZmVyXSk7XG59XG5cbkRlY29kZXIucHJvdG90eXBlLmJyb2Fkd2F5T25Ccm9hZHdheUluaXRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5pbml0ZWQgPSB0cnVlO1xuICB0aGlzLnNlbGYucG9zdE1lc3NhZ2Uoe21zZzogJ0RFQ09ERVJfUkVBRFknfSk7XG59XG5cbkRlY29kZXIucHJvdG90eXBlLmRlY29kZSA9IGZ1bmN0aW9uIChkYXRhLCBpbmZvKSB7XG4gIGxldCB0aW1lID0gcGFyc2VJbnQobmV3IERhdGUoKS5nZXRUaW1lKCkpO1xuICBsZXQgaW5mb2lkID0gdGltZSAtIChNYXRoLmZsb29yKHRpbWUgLyAxMGU4KSAqIDEwZTgpO1xuICB0aGlzLmluZm9saXN0W2luZm9pZF0gPSBpbmZvO1xuICB0aGlzLnN0cmVhbUJ1ZmZlci5zZXQoZGF0YSk7XG4gIE1vZHVsZS5fYnJvYWR3YXlQbGF5U3RyZWFtKGRhdGEubGVuZ3RoLCBpbmZvaWQpO1xufVxuXG52YXIgZGVjb2RlcjtcblxuZnVuY3Rpb24gb25Qb3N0UnVuICgpIHtcbiAgZGVjb2RlciA9IG5ldyBEZWNvZGVyKHRoaXMpO1xuICBkZWNvZGVyLmluaXQoKTtcbn1cblxuZnVuY3Rpb24gaW5pdCAoKSB7XG4gIHNlbGYuaW1wb3J0U2NyaXB0cygnaHR0cDovLzEwLjk1LjQ1LjIwMjo5MDkwL2V4YW1wbGVzL2Zsdi9kZWNvZGVyLmpzJyk7XG4gIGFkZE9uUG9zdFJ1bihvblBvc3RSdW4uYmluZChzZWxmKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNlbGYpIHtcbiAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgZGF0YSA9IGUuZGF0YTtcbiAgICBpZiAoIWRhdGEubXNnKSB7XG4gICAgICBzZWxmLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgbXNnOiAnRVJST1I6aW52YWxpZCBtZXNzYWdlJ1xuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpdGNoIChkYXRhLm1zZykge1xuICAgICAgICBjYXNlICdpbml0JzpcbiAgICAgICAgICBpbml0KHNlbGYpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2RlY29kZSc6XG4gICAgICAgICAgZGVjb2Rlci5kZWNvZGUoZGF0YS5kYXRhLCBkYXRhLmluZm8pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSwgZmFsc2UpO1xufVxuIiwiY2xhc3MgWVVWQ2FudmFzIHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZ3MpIHtcbiAgICB0aGlzLmNvbmZpZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWdzKTtcbiAgICB0aGlzLmNhbnZhcyA9IHRoaXMuY29uZmlncy5jYW52YXM7XG4gICAgdGhpcy5tZXRhID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jb25maWdzLm1ldGEpO1xuICAgIHRoaXMuY2hyb21hID0gdGhpcy5tZXRhLmNocm9tYUZvcm1hdDtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMubWV0YS5wcmVzZW50SGVpZ2h0O1xuICAgIHRoaXMud2lkdGggPSB0aGlzLm1ldGEucHJlc2VudFdpZHRoO1xuICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy53aWR0aDtcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgdGhpcy5faW5pdENvbnRleHRHTCgpO1xuICAgIGlmICh0aGlzLmNvbnRleHRHTCkge1xuICAgICAgdGhpcy5faW5pdFByb2dyYW0oKTtcbiAgICAgIHRoaXMuX2luaXRCdWZmZXJzKCk7XG4gICAgICB0aGlzLl9pbml0VGV4dHVyZXMoKTtcbiAgICB9O1xuICB9XG5cbiAgX2luaXRDb250ZXh0R0wgKCkge1xuICAgIHZhciBjYW52YXMgPSB0aGlzLmNhbnZhcztcbiAgICB2YXIgZ2wgPSBudWxsO1xuXG4gICAgdmFyIHZhbGlkQ29udGV4dE5hbWVzID0gWyd3ZWJnbCcsICdleHBlcmltZW50YWwtd2ViZ2wnLCAnbW96LXdlYmdsJywgJ3dlYmtpdC0zZCddO1xuICAgIHZhciBuYW1lSW5kZXggPSAwO1xuXG4gICAgd2hpbGUgKCFnbCAmJiBuYW1lSW5kZXggPCB2YWxpZENvbnRleHROYW1lcy5sZW5ndGgpIHtcbiAgICAgIHZhciBjb250ZXh0TmFtZSA9IHZhbGlkQ29udGV4dE5hbWVzW25hbWVJbmRleF07XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRleHRPcHRpb25zKSB7XG4gICAgICAgICAgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dChjb250ZXh0TmFtZSwgdGhpcy5jb250ZXh0T3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dChjb250ZXh0TmFtZSk7XG4gICAgICAgIH07XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGdsID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFnbCB8fCB0eXBlb2YgZ2wuZ2V0UGFyYW1ldGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGdsID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgKytuYW1lSW5kZXg7XG4gICAgfTtcblxuICAgIHRoaXMuY29udGV4dEdMID0gZ2w7XG4gIH07XG5cbiAgX2luaXRQcm9ncmFtICgpIHtcbiAgICB2YXIgZ2wgPSB0aGlzLmNvbnRleHRHTDtcblxuICAgIC8vIHZlcnRleCBzaGFkZXIgaXMgdGhlIHNhbWUgZm9yIGFsbCB0eXBlc1xuICAgIHZhciB2ZXJ0ZXhTaGFkZXJTY3JpcHQ7XG4gICAgdmFyIGZyYWdtZW50U2hhZGVyU2NyaXB0O1xuICAgIGlmICh0aGlzLmNocm9tYSA9PT0gNDIwKSB7XG4gICAgICB2ZXJ0ZXhTaGFkZXJTY3JpcHQgPSBbXG4gICAgICAgICdhdHRyaWJ1dGUgdmVjNCB2ZXJ0ZXhQb3M7JyxcbiAgICAgICAgJ2F0dHJpYnV0ZSB2ZWM0IHRleHR1cmVQb3M7JyxcbiAgICAgICAgJ2F0dHJpYnV0ZSB2ZWM0IHVUZXh0dXJlUG9zOycsXG4gICAgICAgICdhdHRyaWJ1dGUgdmVjNCB2VGV4dHVyZVBvczsnLFxuICAgICAgICAndmFyeWluZyB2ZWMyIHRleHR1cmVDb29yZDsnLFxuICAgICAgICAndmFyeWluZyB2ZWMyIHVUZXh0dXJlQ29vcmQ7JyxcbiAgICAgICAgJ3ZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkOycsXG5cbiAgICAgICAgJ3ZvaWQgbWFpbigpJyxcbiAgICAgICAgJ3snLFxuICAgICAgICAnICBnbF9Qb3NpdGlvbiA9IHZlcnRleFBvczsnLFxuICAgICAgICAnICB0ZXh0dXJlQ29vcmQgPSB0ZXh0dXJlUG9zLnh5OycsXG4gICAgICAgICcgIHVUZXh0dXJlQ29vcmQgPSB1VGV4dHVyZVBvcy54eTsnLFxuICAgICAgICAnICB2VGV4dHVyZUNvb3JkID0gdlRleHR1cmVQb3MueHk7JyxcbiAgICAgICAgJ30nXG4gICAgICBdLmpvaW4oJ1xcbicpO1xuXG4gICAgICBmcmFnbWVudFNoYWRlclNjcmlwdCA9IFtcbiAgICAgICAgJ3ByZWNpc2lvbiBoaWdocCBmbG9hdDsnLFxuICAgICAgICAndmFyeWluZyBoaWdocCB2ZWMyIHRleHR1cmVDb29yZDsnLFxuICAgICAgICAndmFyeWluZyBoaWdocCB2ZWMyIHVUZXh0dXJlQ29vcmQ7JyxcbiAgICAgICAgJ3ZhcnlpbmcgaGlnaHAgdmVjMiB2VGV4dHVyZUNvb3JkOycsXG4gICAgICAgICd1bmlmb3JtIHNhbXBsZXIyRCB5U2FtcGxlcjsnLFxuICAgICAgICAndW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7JyxcbiAgICAgICAgJ3VuaWZvcm0gc2FtcGxlcjJEIHZTYW1wbGVyOycsXG4gICAgICAgICd1bmlmb3JtIG1hdDQgWVVWMlJHQjsnLFxuXG4gICAgICAgICd2b2lkIG1haW4odm9pZCkgeycsXG4gICAgICAgICcgIGhpZ2hwIGZsb2F0IHkgPSB0ZXh0dXJlMkQoeVNhbXBsZXIsICB0ZXh0dXJlQ29vcmQpLnI7JyxcbiAgICAgICAgJyAgaGlnaHAgZmxvYXQgdSA9IHRleHR1cmUyRCh1U2FtcGxlciwgIHVUZXh0dXJlQ29vcmQpLnI7JyxcbiAgICAgICAgJyAgaGlnaHAgZmxvYXQgdiA9IHRleHR1cmUyRCh2U2FtcGxlciwgIHZUZXh0dXJlQ29vcmQpLnI7JyxcbiAgICAgICAgJyAgZ2xfRnJhZ0NvbG9yID0gdmVjNCh5LCB1LCB2LCAxKSAqIFlVVjJSR0I7JyxcbiAgICAgICAgJ30nXG4gICAgICBdLmpvaW4oJ1xcbicpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jaHJvbWEgPT09IDQyMikge1xuICAgICAgdmVydGV4U2hhZGVyU2NyaXB0ID0gW1xuICAgICAgICAnYXR0cmlidXRlIHZlYzQgdmVydGV4UG9zOycsXG4gICAgICAgICdhdHRyaWJ1dGUgdmVjNCB0ZXh0dXJlUG9zOycsXG4gICAgICAgICd2YXJ5aW5nIHZlYzIgdGV4dHVyZUNvb3JkOycsXG5cbiAgICAgICAgJ3ZvaWQgbWFpbigpJyxcbiAgICAgICAgJ3snLFxuICAgICAgICAnICBnbF9Qb3NpdGlvbiA9IHZlcnRleFBvczsnLFxuICAgICAgICAnICB0ZXh0dXJlQ29vcmQgPSB0ZXh0dXJlUG9zLnh5OycsXG4gICAgICAgICd9J1xuICAgICAgXS5qb2luKCdcXG4nKTtcblxuICAgICAgZnJhZ21lbnRTaGFkZXJTY3JpcHQgPSBbXG4gICAgICAgICdwcmVjaXNpb24gaGlnaHAgZmxvYXQ7JyxcbiAgICAgICAgJ3ZhcnlpbmcgaGlnaHAgdmVjMiB0ZXh0dXJlQ29vcmQ7JyxcbiAgICAgICAgJ3VuaWZvcm0gc2FtcGxlcjJEIHNhbXBsZXI7JyxcbiAgICAgICAgJ3VuaWZvcm0gaGlnaHAgdmVjMiByZXNvbHV0aW9uOycsXG4gICAgICAgICd1bmlmb3JtIG1hdDQgWVVWMlJHQjsnLFxuXG4gICAgICAgICd2b2lkIG1haW4odm9pZCkgeycsXG5cbiAgICAgICAgJyAgaGlnaHAgZmxvYXQgdGV4UGl4WCA9IDEuMCAvIHJlc29sdXRpb24ueDsnLFxuICAgICAgICAnICBoaWdocCBmbG9hdCBsb2dQaXhYID0gMi4wIC8gcmVzb2x1dGlvbi54OycsIC8vIGhhbGYgdGhlIHJlc29sdXRpb24gb2YgdGhlIHRleHR1cmVcbiAgICAgICAgJyAgaGlnaHAgZmxvYXQgbG9nSGFsZlBpeFggPSA0LjAgLyByZXNvbHV0aW9uLng7JywgLy8gaGFsZiBvZiB0aGUgbG9naWNhbCByZXNvbHV0aW9uIHNvIGV2ZXJ5IDR0aCBwaXhlbFxuICAgICAgICAnICBoaWdocCBmbG9hdCBzdGVwcyA9IGZsb29yKHRleHR1cmVDb29yZC54IC8gbG9nUGl4WCk7JyxcbiAgICAgICAgJyAgaGlnaHAgZmxvYXQgdXZTdGVwcyA9IGZsb29yKHRleHR1cmVDb29yZC54IC8gbG9nSGFsZlBpeFgpOycsXG4gICAgICAgICcgIGhpZ2hwIGZsb2F0IHkgPSB0ZXh0dXJlMkQoc2FtcGxlciwgdmVjMigobG9nUGl4WCAqIHN0ZXBzKSArIHRleFBpeFgsIHRleHR1cmVDb29yZC55KSkucjsnLFxuICAgICAgICAnICBoaWdocCBmbG9hdCB1ID0gdGV4dHVyZTJEKHNhbXBsZXIsIHZlYzIoKGxvZ0hhbGZQaXhYICogdXZTdGVwcyksIHRleHR1cmVDb29yZC55KSkucjsnLFxuICAgICAgICAnICBoaWdocCBmbG9hdCB2ID0gdGV4dHVyZTJEKHNhbXBsZXIsIHZlYzIoKGxvZ0hhbGZQaXhYICogdXZTdGVwcykgKyB0ZXhQaXhYICsgdGV4UGl4WCwgdGV4dHVyZUNvb3JkLnkpKS5yOycsXG5cbiAgICAgICAgLy8gJyAgaGlnaHAgZmxvYXQgeSA9IHRleHR1cmUyRChzYW1wbGVyLCAgdGV4dHVyZUNvb3JkKS5yOycsXG4gICAgICAgIC8vICcgIGdsX0ZyYWdDb2xvciA9IHZlYzQoeSwgdSwgdiwgMSkgKiBZVVYyUkdCOycsXG4gICAgICAgICcgIGdsX0ZyYWdDb2xvciA9IHZlYzQoeSwgdSwgdiwgMS4wKSAqIFlVVjJSR0I7JyxcbiAgICAgICAgJ30nXG4gICAgICBdLmpvaW4oJ1xcbicpO1xuICAgIH07XG5cbiAgICB2YXIgWVVWMlJHQiA9IFtcbiAgICAgIDEuMTY0MzgsIDAuMDAwMDAsIDEuNTk2MDMsIC0wLjg3MDc5LFxuICAgICAgMS4xNjQzOCwgLTAuMzkxNzYsIC0wLjgxMjk3LCAwLjUyOTU5LFxuICAgICAgMS4xNjQzOCwgMi4wMTcyMywgMC4wMDAwMCwgLTEuMDgxMzksXG4gICAgICAwLCAwLCAwLCAxXG4gICAgXTtcbiAgICB2YXIgdmVydGV4U2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKGdsLlZFUlRFWF9TSEFERVIpO1xuICAgIGdsLnNoYWRlclNvdXJjZSh2ZXJ0ZXhTaGFkZXIsIHZlcnRleFNoYWRlclNjcmlwdCk7XG4gICAgZ2wuY29tcGlsZVNoYWRlcih2ZXJ0ZXhTaGFkZXIpO1xuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHZlcnRleFNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgICBjb25zb2xlLmxvZygnVmVydGV4IHNoYWRlciBmYWlsZWQgdG8gY29tcGlsZTogJyArIGdsLmdldFNoYWRlckluZm9Mb2codmVydGV4U2hhZGVyKSk7XG4gICAgfVxuXG4gICAgdmFyIGZyYWdtZW50U2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUik7XG4gICAgZ2wuc2hhZGVyU291cmNlKGZyYWdtZW50U2hhZGVyLCBmcmFnbWVudFNoYWRlclNjcmlwdCk7XG4gICAgZ2wuY29tcGlsZVNoYWRlcihmcmFnbWVudFNoYWRlcik7XG4gICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoZnJhZ21lbnRTaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgY29uc29sZS5sb2coJ0ZyYWdtZW50IHNoYWRlciBmYWlsZWQgdG8gY29tcGlsZTogJyArIGdsLmdldFNoYWRlckluZm9Mb2coZnJhZ21lbnRTaGFkZXIpKTtcbiAgICB9XG5cbiAgICB2YXIgcHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcbiAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgdmVydGV4U2hhZGVyKTtcbiAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgZnJhZ21lbnRTaGFkZXIpO1xuICAgIGdsLmxpbmtQcm9ncmFtKHByb2dyYW0pO1xuICAgIGlmICghZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5MSU5LX1NUQVRVUykpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdQcm9ncmFtIGZhaWxlZCB0byBjb21waWxlOiAnICsgZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cocHJvZ3JhbSkpO1xuICAgIH1cblxuICAgIGdsLnVzZVByb2dyYW0ocHJvZ3JhbSk7XG5cbiAgICB2YXIgWVVWMlJHQlJlZiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCAnWVVWMlJHQicpO1xuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYoWVVWMlJHQlJlZiwgZmFsc2UsIFlVVjJSR0IpO1xuXG4gICAgdGhpcy5zaGFkZXJQcm9ncmFtID0gcHJvZ3JhbTtcbiAgfVxuXG4gIF9pbml0QnVmZmVycyAoKSB7XG4gICAgdmFyIGdsID0gdGhpcy5jb250ZXh0R0w7XG4gICAgdmFyIHByb2dyYW0gPSB0aGlzLnNoYWRlclByb2dyYW07XG5cbiAgICB2YXIgdmVydGV4UG9zQnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHZlcnRleFBvc0J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoWzEsIDEsIC0xLCAxLCAxLCAtMSwgLTEsIC0xXSksIGdsLlNUQVRJQ19EUkFXKTtcblxuICAgIHZhciB2ZXJ0ZXhQb3NSZWYgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCAndmVydGV4UG9zJyk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodmVydGV4UG9zUmVmKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHZlcnRleFBvc1JlZiwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcblxuICAgIHZhciB0ZXh0dXJlUG9zQnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRleHR1cmVQb3NCdWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KFsxLCAwLCAwLCAwLCAxLCAxLCAwLCAxXSksIGdsLlNUQVRJQ19EUkFXKTtcblxuICAgIHZhciB0ZXh0dXJlUG9zUmVmID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgJ3RleHR1cmVQb3MnKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0ZXh0dXJlUG9zUmVmKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRleHR1cmVQb3NSZWYsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG5cbiAgICB0aGlzLnRleHR1cmVQb3NCdWZmZXIgPSB0ZXh0dXJlUG9zQnVmZmVyO1xuXG4gICAgaWYgKHRoaXMuY2hyb21hID09PSA0MjApIHtcbiAgICAgIHZhciB1VGV4dHVyZVBvc0J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHVUZXh0dXJlUG9zQnVmZmVyKTtcbiAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KFsxLCAwLCAwLCAwLCAxLCAxLCAwLCAxXSksIGdsLlNUQVRJQ19EUkFXKTtcblxuICAgICAgdmFyIHVUZXh0dXJlUG9zUmVmID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgJ3VUZXh0dXJlUG9zJyk7XG4gICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh1VGV4dHVyZVBvc1JlZik7XG4gICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHVUZXh0dXJlUG9zUmVmLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuXG4gICAgICB0aGlzLnVUZXh0dXJlUG9zQnVmZmVyID0gdVRleHR1cmVQb3NCdWZmZXI7XG5cbiAgICAgIHZhciB2VGV4dHVyZVBvc0J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHZUZXh0dXJlUG9zQnVmZmVyKTtcbiAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KFsxLCAwLCAwLCAwLCAxLCAxLCAwLCAxXSksIGdsLlNUQVRJQ19EUkFXKTtcblxuICAgICAgdmFyIHZUZXh0dXJlUG9zUmVmID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgJ3ZUZXh0dXJlUG9zJyk7XG4gICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh2VGV4dHVyZVBvc1JlZik7XG4gICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHZUZXh0dXJlUG9zUmVmLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuXG4gICAgICB0aGlzLnZUZXh0dXJlUG9zQnVmZmVyID0gdlRleHR1cmVQb3NCdWZmZXI7XG4gICAgfTtcbiAgfTtcblxuICBfaW5pdFRleHR1cmVzICgpIHtcbiAgICB2YXIgZ2wgPSB0aGlzLmNvbnRleHRHTDtcbiAgICB2YXIgcHJvZ3JhbSA9IHRoaXMuc2hhZGVyUHJvZ3JhbTtcblxuICAgIGlmICh0aGlzLmNocm9tYSA9PT0gNDIwKSB7XG4gICAgICB2YXIgeVRleHR1cmVSZWYgPSB0aGlzLl9pbml0VGV4dHVyZSgpO1xuICAgICAgdmFyIHlTYW1wbGVyUmVmID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sICd5U2FtcGxlcicpO1xuICAgICAgZ2wudW5pZm9ybTFpKHlTYW1wbGVyUmVmLCAwKTtcbiAgICAgIHRoaXMueVRleHR1cmVSZWYgPSB5VGV4dHVyZVJlZjtcblxuICAgICAgdmFyIHVUZXh0dXJlUmVmID0gdGhpcy5faW5pdFRleHR1cmUoKTtcbiAgICAgIHZhciB1U2FtcGxlclJlZiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCAndVNhbXBsZXInKTtcbiAgICAgIGdsLnVuaWZvcm0xaSh1U2FtcGxlclJlZiwgMSk7XG4gICAgICB0aGlzLnVUZXh0dXJlUmVmID0gdVRleHR1cmVSZWY7XG5cbiAgICAgIHZhciB2VGV4dHVyZVJlZiA9IHRoaXMuX2luaXRUZXh0dXJlKCk7XG4gICAgICB2YXIgdlNhbXBsZXJSZWYgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgJ3ZTYW1wbGVyJyk7XG4gICAgICBnbC51bmlmb3JtMWkodlNhbXBsZXJSZWYsIDIpO1xuICAgICAgdGhpcy52VGV4dHVyZVJlZiA9IHZUZXh0dXJlUmVmO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jaHJvbWEgPT09IDQyMikge1xuICAgICAgLy8gb25seSBvbmUgdGV4dHVyZSBmb3IgNDIyXG4gICAgICB2YXIgdGV4dHVyZVJlZiA9IHRoaXMuX2luaXRUZXh0dXJlKCk7XG4gICAgICB2YXIgc2FtcGxlclJlZiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCAnc2FtcGxlcicpO1xuICAgICAgZ2wudW5pZm9ybTFpKHNhbXBsZXJSZWYsIDApO1xuICAgICAgdGhpcy50ZXh0dXJlUmVmID0gdGV4dHVyZVJlZjtcbiAgICB9O1xuICB9XG5cbiAgX2luaXRUZXh0dXJlICgpIHtcbiAgICB2YXIgZ2wgPSB0aGlzLmNvbnRleHRHTDtcblxuICAgIHZhciB0ZXh0dXJlUmVmID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmVSZWYpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgbnVsbCk7XG5cbiAgICByZXR1cm4gdGV4dHVyZVJlZjtcbiAgfVxuXG4gIF9kcmF3UGljdHVyZUdMIChkYXRhLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgaWYgKHRoaXMuY2hyb21hID09PSA0MjApIHtcbiAgICAgIGxldCBuV2lkdGggPSB3aWR0aDtcbiAgICAgIHZhciB5bGVuID0gd2lkdGggKiBoZWlnaHQ7XG4gICAgICB2YXIgdXZsZW4gPSAod2lkdGggLyAyKSAqIChoZWlnaHQgLyAyKTtcbiAgICAgIGRhdGEgPSBuZXcgVWludDhBcnJheShkYXRhKTtcbiAgICAgIGxldCByZW5kZXJEYXRhID0ge1xuICAgICAgICB5RGF0YTogZGF0YS5zdWJhcnJheSgwLCB5bGVuKSxcbiAgICAgICAgdURhdGE6IGRhdGEuc3ViYXJyYXkoeWxlbiwgeWxlbiArIHV2bGVuKSxcbiAgICAgICAgdkRhdGE6IGRhdGEuc3ViYXJyYXkoeWxlbiArIHV2bGVuLCB5bGVuICsgdXZsZW4gKyB1dmxlbilcbiAgICAgIH1cbiAgICAgIGlmICh3aWR0aCAlIDQgPiAwKSB7XG4gICAgICAgIG5XaWR0aCA9IHdpZHRoICsgNCAtICh3aWR0aCAlIDQpO1xuICAgICAgICBsZXQgeUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkobldpZHRoICogaGVpZ2h0KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWlnaHQ7IGkrKykge1xuICAgICAgICAgIHlBcnJheS5zZXQocmVuZGVyRGF0YS55RGF0YS5zdWJhcnJheShpICogd2lkdGgsIChpICsgMSkgKiB3aWR0aCksIGkgKiBuV2lkdGgpO1xuICAgICAgICB9XG4gICAgICAgIHJlbmRlckRhdGEueURhdGEgPSB5QXJyYXk7XG4gICAgICB9XG5cbiAgICAgIGlmICgod2lkdGggLyAyKSAlIDQgPiAwKSB7XG4gICAgICAgIG5XaWR0aCA9ICh3aWR0aCAvIDIpICsgNCAtICgod2lkdGggLyAyKSAlIDQpO1xuICAgICAgICBsZXQgdUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkobldpZHRoICogaGVpZ2h0IC8gMik7XG4gICAgICAgIGxldCB2QXJyYXkgPSBuZXcgVWludDhBcnJheShuV2lkdGggKiBoZWlnaHQgLyAyKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWlnaHQgLyAyOyBpKyspIHtcbiAgICAgICAgICB1QXJyYXkuc2V0KHJlbmRlckRhdGEudURhdGEuc3ViYXJyYXkoaSAqIHdpZHRoIC8gMiwgKGkgKyAxKSAqIHdpZHRoIC8gMiksIGkgKiBuV2lkdGgpO1xuICAgICAgICAgIHZBcnJheS5zZXQocmVuZGVyRGF0YS52RGF0YS5zdWJhcnJheShpICogd2lkdGggLyAyLCAoaSArIDEpICogd2lkdGggLyAyKSwgaSAqIG5XaWR0aCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVuZGVyRGF0YS51RGF0YSA9IHVBcnJheTtcbiAgICAgICAgcmVuZGVyRGF0YS52RGF0YSA9IHZBcnJheTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2RyYXdQaWN0dXJlR0w0MjAocmVuZGVyRGF0YSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNocm9tYSA9PT0gNDIyKSB7XG4gICAgICBkYXRhID0gbmV3IFVpbnQ4QXJyYXkoZGF0YSk7XG4gICAgICB0aGlzLl9kcmF3UGljdHVyZUdMNDIyKHdpZHRoLCBoZWlnaHQsIGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIF9kcmF3UGljdHVyZUdMNDIyIChkYXRhLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdmFyIGdsID0gdGhpcy5jb250ZXh0R0w7XG4gICAgdmFyIHRleHR1cmVQb3NCdWZmZXIgPSB0aGlzLnRleHR1cmVQb3NCdWZmZXI7XG5cbiAgICB2YXIgdGV4dHVyZVJlZiA9IHRoaXMudGV4dHVyZVJlZjtcblxuICAgIHZhciBkYXRhUGVyUm93ID0gd2lkdGggKiAyO1xuICAgIHZhciByb3dDbnQgPSBoZWlnaHQ7XG5cbiAgICBnbC52aWV3cG9ydCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblxuICAgIHZhciB0VG9wID0gMDtcbiAgICB2YXIgdExlZnQgPSAwO1xuICAgIHZhciB0Qm90dG9tID0gaGVpZ2h0IC8gcm93Q250O1xuICAgIHZhciB0UmlnaHQgPSB3aWR0aCAvIChkYXRhUGVyUm93IC8gMik7XG4gICAgdmFyIHRleHR1cmVQb3NWYWx1ZXMgPSBuZXcgRmxvYXQzMkFycmF5KFt0UmlnaHQsIHRUb3AsIHRMZWZ0LCB0VG9wLCB0UmlnaHQsIHRCb3R0b20sIHRMZWZ0LCB0Qm90dG9tXSk7XG5cbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGV4dHVyZVBvc0J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHRleHR1cmVQb3NWYWx1ZXMsIGdsLkRZTkFNSUNfRFJBVyk7XG5cbiAgICBnbC51bmlmb3JtMmYoZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuc2hhZGVyUHJvZ3JhbSwgJ3Jlc29sdXRpb24nKSwgZGF0YVBlclJvdywgaGVpZ2h0KTtcblxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmVSZWYpO1xuICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuTFVNSU5BTkNFLCBkYXRhUGVyUm93LCByb3dDbnQsIDAsIGdsLkxVTUlOQU5DRSwgZ2wuVU5TSUdORURfQllURSwgZGF0YSk7XG5cbiAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFX1NUUklQLCAwLCA0KTtcbiAgfVxuXG4gIF9kcmF3UGljdHVyZUdMNDIwIChkYXRhLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdmFyIGdsID0gdGhpcy5jb250ZXh0R0w7XG4gICAgdmFyIHRleHR1cmVQb3NCdWZmZXIgPSB0aGlzLnRleHR1cmVQb3NCdWZmZXI7XG4gICAgdmFyIHVUZXh0dXJlUG9zQnVmZmVyID0gdGhpcy51VGV4dHVyZVBvc0J1ZmZlcjtcbiAgICB2YXIgdlRleHR1cmVQb3NCdWZmZXIgPSB0aGlzLnZUZXh0dXJlUG9zQnVmZmVyO1xuXG4gICAgdmFyIHlUZXh0dXJlUmVmID0gdGhpcy55VGV4dHVyZVJlZjtcbiAgICB2YXIgdVRleHR1cmVSZWYgPSB0aGlzLnVUZXh0dXJlUmVmO1xuICAgIHZhciB2VGV4dHVyZVJlZiA9IHRoaXMudlRleHR1cmVSZWY7XG5cbiAgICB2YXIgeURhdGEgPSBkYXRhLnlEYXRhO1xuICAgIHZhciB1RGF0YSA9IGRhdGEudURhdGE7XG4gICAgdmFyIHZEYXRhID0gZGF0YS52RGF0YTtcblxuICAgIHZhciB5RGF0YVBlclJvdyA9IHdpZHRoO1xuICAgIHZhciB5Um93Q250ID0gaGVpZ2h0O1xuXG4gICAgdmFyIHVEYXRhUGVyUm93ID0gd2lkdGggLyAyO1xuICAgIHZhciB1Um93Q250ID0gaGVpZ2h0IC8gMjtcblxuICAgIHZhciB2RGF0YVBlclJvdyA9IHVEYXRhUGVyUm93O1xuICAgIHZhciB2Um93Q250ID0gdVJvd0NudDtcbiAgICBnbC52aWV3cG9ydCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG5cbiAgICB2YXIgdFRvcCA9IDA7XG4gICAgdmFyIHRMZWZ0ID0gMDtcbiAgICB2YXIgdEJvdHRvbSA9IGhlaWdodCAvIHlSb3dDbnQ7XG4gICAgdmFyIHRSaWdodCA9IHdpZHRoIC8geURhdGFQZXJSb3c7XG4gICAgdmFyIHRleHR1cmVQb3NWYWx1ZXMgPSBuZXcgRmxvYXQzMkFycmF5KFt0UmlnaHQsIHRUb3AsIHRMZWZ0LCB0VG9wLCB0UmlnaHQsIHRCb3R0b20sIHRMZWZ0LCB0Qm90dG9tXSk7XG5cbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGV4dHVyZVBvc0J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHRleHR1cmVQb3NWYWx1ZXMsIGdsLkRZTkFNSUNfRFJBVyk7XG5cblxuICAgIHRCb3R0b20gPSAoaGVpZ2h0IC8gMikgLyB1Um93Q250O1xuICAgIHRSaWdodCA9ICh3aWR0aCAvIDIpIC8gdURhdGFQZXJSb3c7XG4gICAgdmFyIHVUZXh0dXJlUG9zVmFsdWVzID0gbmV3IEZsb2F0MzJBcnJheShbdFJpZ2h0LCB0VG9wLCB0TGVmdCwgdFRvcCwgdFJpZ2h0LCB0Qm90dG9tLCB0TGVmdCwgdEJvdHRvbV0pO1xuXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHVUZXh0dXJlUG9zQnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdVRleHR1cmVQb3NWYWx1ZXMsIGdsLkRZTkFNSUNfRFJBVyk7XG5cbiAgICB0Qm90dG9tID0gKGhlaWdodCAvIDIpIC8gdlJvd0NudDtcbiAgICB0UmlnaHQgPSAod2lkdGggLyAyKSAvIHZEYXRhUGVyUm93O1xuXG4gICAgdmFyIHZUZXh0dXJlUG9zVmFsdWVzID0gbmV3IEZsb2F0MzJBcnJheShbdFJpZ2h0LCB0VG9wLCB0TGVmdCwgdFRvcCwgdFJpZ2h0LCB0Qm90dG9tLCB0TGVmdCwgdEJvdHRvbV0pO1xuXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHZUZXh0dXJlUG9zQnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdlRleHR1cmVQb3NWYWx1ZXMsIGdsLkRZTkFNSUNfRFJBVyk7XG4gICAgXG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgeVRleHR1cmVSZWYpO1xuICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuTFVNSU5BTkNFLCB5RGF0YVBlclJvdywgeVJvd0NudCwgMCwgZ2wuTFVNSU5BTkNFLCBnbC5VTlNJR05FRF9CWVRFLCB5RGF0YSk7XG5cbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUxKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB1VGV4dHVyZVJlZik7XG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5MVU1JTkFOQ0UsIHVEYXRhUGVyUm93LCB1Um93Q250LCAwLCBnbC5MVU1JTkFOQ0UsIGdsLlVOU0lHTkVEX0JZVEUsIHVEYXRhKTtcblxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTIpO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHZUZXh0dXJlUmVmKTtcbiAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLkxVTUlOQU5DRSwgdkRhdGFQZXJSb3csIHZSb3dDbnQsIDAsIGdsLkxVTUlOQU5DRSwgZ2wuVU5TSUdORURfQllURSwgdkRhdGEpO1xuXG4gICAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRV9TVFJJUCwgMCwgNCk7XG4gIH1cblxuICBfZHJhd1BpY3R1cmVSR0IgKGRhdGEpIHtcblxuICB9XG5cbiAgcmVuZGVyIChkYXRhLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdmFyIGdsID0gdGhpcy5jb250ZXh0R0w7XG4gICAgaWYgKGdsKSB7XG4gICAgICB0aGlzLl9kcmF3UGljdHVyZUdMKGRhdGEsIHdpZHRoLCBoZWlnaHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kcmF3UGljdHVyZVJHQihkYXRhKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgWVVWQ2FudmFzO1xuIiwiY29uc3QgaXNPYmplY3RGaWxsZWQgPSAob2JqKSA9PiB7XG4gIGZvciAobGV0IGtleSBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGlmIChvYmpba2V5XSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVkaWFJbmZvIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMubWltZVR5cGUgPSBudWxsXG4gICAgdGhpcy5kdXJhdGlvbiA9IG51bGxcblxuICAgIHRoaXMuaGFzVmlkZW8gPSBudWxsXG4gICAgdGhpcy52aWRlbyA9IHtcbiAgICAgIGNvZGVjOiBudWxsLFxuICAgICAgd2lkdGg6IG51bGwsXG4gICAgICBoZWlnaHQ6IG51bGwsXG4gICAgICBwcm9maWxlOiBudWxsLFxuICAgICAgbGV2ZWw6IG51bGwsXG4gICAgICBmcmFtZVJhdGU6IHtcbiAgICAgICAgZml4ZWQ6IHRydWUsXG4gICAgICAgIGZwczogMjUsXG4gICAgICAgIGZwc19udW06IDI1MDAwLFxuICAgICAgICBmcHNfZGVuOiAxMDAwXG4gICAgICB9LFxuICAgICAgY2hyb21hRm9ybWF0OiBudWxsLFxuICAgICAgcGFyUmF0aW86IHtcbiAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgIGhlaWdodDogMVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaGFzQXVkaW8gPSBudWxsXG5cbiAgICB0aGlzLmF1ZGlvID0ge1xuICAgICAgY29kZWM6IG51bGwsXG4gICAgICBzYW1wbGVSYXRlOiBudWxsLFxuICAgICAgc2FtcGxlUmF0ZUluZGV4OiBudWxsLFxuICAgICAgY2hhbm5lbENvdW50OiBudWxsXG4gICAgfVxuICB9XG5cbiAgaXNDb21wbGV0ZSAoKSB7XG4gICAgcmV0dXJuIE1lZGlhSW5mby5pc0Jhc2VJbmZvUmVhZHkodGhpcykgJiYgTWVkaWFJbmZvLmlzVmlkZW9SZWFkeSh0aGlzKSAmJiBNZWRpYUluZm8uaXNBdWRpb1JlYWR5KHRoaXMpXG4gIH1cblxuICBzdGF0aWMgaXNCYXNlSW5mb1JlYWR5IChtZWRpYUluZm8pIHtcbiAgICByZXR1cm4gaXNPYmplY3RGaWxsZWQobWVkaWFJbmZvKVxuICB9XG5cbiAgc3RhdGljIGlzVmlkZW9SZWFkeSAobWVkaWFJbmZvKSB7XG4gICAgaWYgKCFtZWRpYUluZm8uaGFzVmlkZW8pIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgcmV0dXJuIGlzT2JqZWN0RmlsbGVkKG1lZGlhSW5mby52aWRlbylcbiAgfVxuXG4gIHN0YXRpYyBpc0F1ZGlvUmVhZHkgKG1lZGlhSW5mbykge1xuICAgIGlmICghbWVkaWFJbmZvLmhhc0F1ZGlvKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHJldHVybiBpc09iamVjdEZpbGxlZChtZWRpYUluZm8udmlkZW8pXG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lZGlhU2FtcGxlIHtcbiAgY29uc3RydWN0b3IgKGluZm8pIHtcbiAgICBsZXQgX2RlZmF1bHQgPSBNZWRpYVNhbXBsZS5nZXREZWZhdWx0SW5mKClcblxuICAgIGlmICghaW5mbyB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5mbykgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICByZXR1cm4gX2RlZmF1bHRcbiAgICB9XG4gICAgbGV0IHNhbXBsZSA9IE9iamVjdC5hc3NpZ24oe30sIF9kZWZhdWx0LCBpbmZvKVxuXG4gICAgT2JqZWN0LmVudHJpZXMoc2FtcGxlKS5mb3JFYWNoKChbaywgdl0pID0+IHtcbiAgICAgIHRoaXNba10gPSB2XG4gICAgfSlcbiAgfVxuXG4gIHN0YXRpYyBnZXREZWZhdWx0SW5mICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZHRzOiBudWxsLFxuICAgICAgcHRzOiBudWxsLFxuICAgICAgZHVyYXRpb246IG51bGwsXG4gICAgICBwb3NpdGlvbjogbnVsbCxcbiAgICAgIGlzUkFQOiBmYWxzZSwgLy8gaXMgUmFuZG9tIGFjY2VzcyBwb2ludFxuICAgICAgb3JpZ2luRHRzOiBudWxsXG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNZWRpYVNlZ21lbnRMaXN0IHtcblxuICAgIGNvbnN0cnVjdG9yICh0eXBlKSB7XG4gICAgICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLl9saXN0ID0gW107XG4gICAgICAgIHRoaXMuX2xhc3RBcHBlbmRMb2NhdGlvbiA9IC0xOyAvLyBjYWNoZWQgbGFzdCBpbnNlcnQgbG9jYXRpb25cbiAgICB9XG5cbiAgICBnZXQgdHlwZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90eXBlO1xuICAgIH1cblxuICAgIGdldCBsZW5ndGggKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGlzdC5sZW5ndGg7XG4gICAgfVxuXG4gICAgaXNFbXB0eSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0Lmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICBjbGVhciAoKSB7XG4gICAgICAgIHRoaXMuX2xpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5fbGFzdEFwcGVuZExvY2F0aW9uID0gLTE7XG4gICAgfVxuXG4gICAgX3NlYXJjaE5lYXJlc3RTZWdtZW50QmVmb3JlIChiZWdpbkR0cykge1xuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuX2xpc3Q7XG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIC0yO1xuICAgICAgICB9XG4gICAgICAgIGxldCBsYXN0ID0gbGlzdC5sZW5ndGggLSAxO1xuICAgICAgICBsZXQgbWlkID0gMDtcbiAgICAgICAgbGV0IGxib3VuZCA9IDA7XG4gICAgICAgIGxldCB1Ym91bmQgPSBsYXN0O1xuXG4gICAgICAgIGxldCBpZHggPSAwO1xuXG4gICAgICAgIGlmIChiZWdpbkR0cyA8IGxpc3RbMF0ub3JpZ2luRHRzKSB7XG4gICAgICAgICAgICBpZHggPSAtMTtcbiAgICAgICAgICAgIHJldHVybiBpZHg7XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAobGJvdW5kIDw9IHVib3VuZCkge1xuICAgICAgICAgICAgbWlkID0gbGJvdW5kICsgTWF0aC5mbG9vcigodWJvdW5kIC0gbGJvdW5kKSAvIDIpO1xuICAgICAgICAgICAgaWYgKG1pZCA9PT0gbGFzdCB8fCAoYmVnaW5EdHMgPiBsaXN0W21pZF0ubGFzdFNhbXBsZS5vcmlnaW5EdHNcbiAgICAgICAgICAgICAgICAgICAgJiYgKGJlZ2luRHRzIDwgbGlzdFttaWQgKyAxXS5vcmlnaW5EdHMpKSkge1xuICAgICAgICAgICAgICAgIGlkeCA9IG1pZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGlzdFttaWRdLm9yaWdpbkR0cyA8IGJlZ2luRHRzKSB7XG4gICAgICAgICAgICAgICAgbGJvdW5kID0gbWlkICsgMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdWJvdW5kID0gbWlkIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaWR4O1xuICAgIH1cblxuICAgIF9zZWFyY2hOZWFyZXN0U2VnbWVudEFmdGVyIChiZWdpbkR0cykge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUoYmVnaW5EdHMpICsgMTtcbiAgICB9XG5cbiAgICBhcHBlbmQgKHNlZ21lbnQpIHtcbiAgICAgICAgbGV0IGxpc3QgPSB0aGlzLl9saXN0O1xuICAgICAgICBsZXQgbGFzdEFwcGVuZElkeCA9IHRoaXMuX2xhc3RBcHBlbmRMb2NhdGlvbjtcbiAgICAgICAgbGV0IGluc2VydElkeCA9IDA7XG5cbiAgICAgICAgaWYgKGxhc3RBcHBlbmRJZHggIT09IC0xICYmIGxhc3RBcHBlbmRJZHggPCBsaXN0Lmxlbmd0aFxuICAgICAgICAgICAgJiYgc2VnbWVudC5vcmlnaW5TdGFydER0cyA+PSBsaXN0W2xhc3RBcHBlbmRJZHhdLmxhc3RTYW1wbGUub3JpZ2luRHRzXG4gICAgICAgICAgICAmJiAoKGxhc3RBcHBlbmRJZHggPT09IGxpc3QubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgICAgICB8fCAobGFzdEFwcGVuZElkeCA8IGxpc3QubGVuZ3RoIC0gMVxuICAgICAgICAgICAgICAgICAgICAmJiBzZWdtZW50Lm9yaWdpblN0YXJ0RHRzIDwgbGlzdFtsYXN0QXBwZW5kSWR4ICsgMV0ub3JpZ2luU3RhcnREdHMpKSkge1xuICAgICAgICAgICAgaW5zZXJ0SWR4ID0gbGFzdEFwcGVuZElkeCArIDE7IC8vIHVzZSBjYWNoZWQgbG9jYXRpb24gaWR4XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAobGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaW5zZXJ0SWR4ID0gdGhpcy5fc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUoc2VnbWVudC5vcmlnaW5TdGFydER0cykgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbGFzdEFwcGVuZExvY2F0aW9uID0gaW5zZXJ0SWR4O1xuICAgICAgICB0aGlzLl9saXN0LnNwbGljZShpbnNlcnRJZHgsIDAsIHNlZ21lbnQpO1xuICAgIH1cblxuICAgIGdldExhc3RTZWdtZW50QmVmb3JlIChiZWdpbkR0cykge1xuICAgICAgICBsZXQgaWR4ID0gdGhpcy5fc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUoYmVnaW5EdHMpO1xuICAgICAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0W2lkeF07XG4gICAgICAgIH0gZWxzZSB7IC8vIC0xXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldExhc3RTYW1wbGVCZWZvcmUgKGJlZ2luRHRzKSB7XG4gICAgICAgIGxldCBzZWdtZW50ID0gdGhpcy5nZXRMYXN0U2VnbWVudEJlZm9yZShiZWdpbkR0cyk7XG4gICAgICAgIGlmIChzZWdtZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VnbWVudC5sYXN0U2FtcGxlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRMYXN0UkFQQmVmb3JlIChiZWdpbkR0cykge1xuICAgICAgICBsZXQgc2VnbWVudElkeCA9IHRoaXMuX3NlYXJjaE5lYXJlc3RTZWdtZW50QmVmb3JlKGJlZ2luRHRzKTtcbiAgICAgICAgbGV0IHJhbmRvbUFjY2Vzc1BvaW50cyA9IHRoaXMuX2xpc3Rbc2VnbWVudElkeF0ucmFuZG9tQWNjZXNzUG9pbnRzO1xuICAgICAgICB3aGlsZSAocmFuZG9tQWNjZXNzUG9pbnRzLmxlbmd0aCA9PT0gMCAmJiBzZWdtZW50SWR4ID4gMCkge1xuICAgICAgICAgICAgc2VnbWVudElkeC0tO1xuICAgICAgICAgICAgcmFuZG9tQWNjZXNzUG9pbnRzID0gdGhpcy5fbGlzdFtzZWdtZW50SWR4XS5yYW5kb21BY2Nlc3NQb2ludHM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhbmRvbUFjY2Vzc1BvaW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gcmFuZG9tQWNjZXNzUG9pbnRzW3JhbmRvbUFjY2Vzc1BvaW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVkaWFTZWdtZW50IHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHRoaXMuc3RhcnREdHMgPSAtMTtcbiAgICAgICAgdGhpcy5lbmREdHMgPSAtMTtcbiAgICAgICAgdGhpcy5zdGFydFB0cyA9IC0xO1xuICAgICAgICB0aGlzLmVuZFB0cyA9IC0xO1xuICAgICAgICB0aGlzLm9yaWdpblN0YXJ0RHRzID0gLTE7XG4gICAgICAgIHRoaXMub3JpZ2luRW5kRHRzID0gLTE7XG4gICAgICAgIHRoaXMucmFuZG9tQWNjZXNzUG9pbnRzID0gW107XG4gICAgICAgIHRoaXMuZmlyc3RTYW1wbGUgPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RTYW1wbGUgPSBudWxsO1xuICAgIH1cblxuICAgIGFkZFJBUCAoc2FtcGxlKSB7XG4gICAgICAgIHNhbXBsZS5pc1JBUCA9IHRydWU7XG4gICAgICAgIHRoaXMucmFuZG9tQWNjZXNzUG9pbnRzLnB1c2goc2FtcGxlKTtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIEF1ZGlvVHJhY2tNZXRhIHtcbiAgY29uc3RydWN0b3IgKG1ldGEpIHtcbiAgICBjb25zdCBfZGVmYXVsdCA9IHtcbiAgICAgIHNhbXBsZVJhdGU6IDQ4MDAwLFxuICAgICAgY2hhbm5lbENvdW50OiAyLFxuICAgICAgY29kZWM6ICdtcDRhLjQwLjInLFxuICAgICAgY29uZmlnOiBbNDEsIDQwMSwgMTM2LCAwXSxcbiAgICAgIGR1cmF0aW9uOiAwLFxuICAgICAgaWQ6IDIsXG4gICAgICByZWZTYW1wbGVEdXJhdGlvbjogMjEsXG4gICAgICBzYW1wbGVSYXRlSW5kZXg6IDMsXG4gICAgICB0aW1lc2NhbGU6IDEwMDAsXG4gICAgICB0eXBlOiAnYXVkaW8nXG4gICAgfVxuICAgIGlmIChtZXRhKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgX2RlZmF1bHQsIG1ldGEpXG4gICAgfVxuICAgIHJldHVybiBfZGVmYXVsdFxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWaWRlb1RyYWNrTWV0YSB7XG4gIGNvbnN0cnVjdG9yIChtZXRhKSB7XG4gICAgY29uc3QgX2RlZmF1bHQgPSB7XG4gICAgICBhdmNjOiBudWxsLFxuICAgICAgc3BzOiBuZXcgVWludDhBcnJheSgwKSxcbiAgICAgIHBwczogbmV3IFVpbnQ4QXJyYXkoMCksXG4gICAgICBjaHJvbWFGb3JtYXQ6IDQyMCxcbiAgICAgIGNvZGVjOiAnYXZjMS42NDAwMjAnLFxuICAgICAgY29kZWNIZWlnaHQ6IDcyMCxcbiAgICAgIGNvZGVjV2lkdGg6IDEyODAsXG4gICAgICBkdXJhdGlvbjogMCxcbiAgICAgIGZyYW1lUmF0ZToge1xuICAgICAgICBmaXhlZDogdHJ1ZSxcbiAgICAgICAgZnBzOiAyNSxcbiAgICAgICAgZnBzX251bTogMjUwMDAsXG4gICAgICAgIGZwc19kZW46IDEwMDBcbiAgICAgIH0sXG4gICAgICBpZDogMSxcbiAgICAgIGxldmVsOiAnMy4yJyxcbiAgICAgIHByZXNlbnRIZWlnaHQ6IDcyMCxcbiAgICAgIHByZXNlbnRXaWR0aDogMTI4MCxcbiAgICAgIHByb2ZpbGU6ICdIaWdoJyxcbiAgICAgIHJlZlNhbXBsZUR1cmF0aW9uOiA0MCxcbiAgICAgIHBhclJhdGlvOiB7XG4gICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgd2lkdGg6IDFcbiAgICAgIH0sXG4gICAgICB0aW1lc2NhbGU6IDEwMDAsXG4gICAgICB0eXBlOiAndmlkZW8nXG4gICAgfVxuXG4gICAgaWYgKG1ldGEpIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBfZGVmYXVsdCwgbWV0YSlcbiAgICB9XG4gICAgcmV0dXJuIF9kZWZhdWx0XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBBdWRpb1RyYWNrU2FtcGxlIHtcbiAgY29uc3RydWN0b3IgKGluZm8pIHtcbiAgICBsZXQgX2RlZmF1bHQgPSBBdWRpb1RyYWNrU2FtcGxlLmdldERlZmF1bHQoKVxuICAgIGlmICghaW5mbykge1xuICAgICAgcmV0dXJuIF9kZWZhdWx0XG4gICAgfVxuICAgIGxldCBzYW1wbGUgPSBPYmplY3QuYXNzaWduKHt9LCBfZGVmYXVsdCwgaW5mbylcblxuICAgIHJldHVybiBzYW1wbGVcbiAgfVxuXG4gIHN0YXRpYyBnZXREZWZhdWx0ICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZHRzOiBudWxsLFxuICAgICAgcHRzOiBudWxsLFxuICAgICAgZGF0YTogbmV3IFVpbnQ4QXJyYXkoKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVmlkZW9UcmFja1NhbXBsZSB7XG4gIGNvbnN0cnVjdG9yIChpbmZvKSB7XG4gICAgbGV0IF9kZWZhdWx0ID0gVmlkZW9UcmFja1NhbXBsZS5nZXREZWZhdWx0KClcblxuICAgIGlmICghaW5mbykge1xuICAgICAgcmV0dXJuIF9kZWZhdWx0XG4gICAgfVxuICAgIGxldCBzYW1wbGUgPSBPYmplY3QuYXNzaWduKHt9LCBfZGVmYXVsdCwgaW5mbylcblxuICAgIHJldHVybiBzYW1wbGVcbiAgfVxuXG4gIHN0YXRpYyBnZXREZWZhdWx0ICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZHRzOiBudWxsLFxuICAgICAgcHRzOiBudWxsLFxuICAgICAgaXNLZXlmcmFtZTogZmFsc2UsIC8vIGlzIFJhbmRvbSBhY2Nlc3MgcG9pbnRcbiAgICAgIG9yaWdpbkR0czogbnVsbCxcbiAgICAgIGRhdGE6IG5ldyBVaW50OEFycmF5KClcbiAgICB9XG4gIH1cbn1cbiIsImNsYXNzIE1TRSB7XG4gIGNvbnN0cnVjdG9yIChjb25maWdzKSB7XG4gICAgdGhpcy5jb25maWdzID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlncyk7XG4gICAgdGhpcy5jb250YWluZXIgPSB0aGlzLmNvbmZpZ3MuY29udGFpbmVyO1xuICAgIHRoaXMubWVkaWFTb3VyY2UgPSBudWxsO1xuICAgIHRoaXMuc291cmNlQnVmZmVycyA9IHt9O1xuICAgIHRoaXMucHJlbG9hZFRpbWUgPSB0aGlzLmNvbmZpZ3MucHJlbG9hZFRpbWUgfHwgMTtcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIHRoaXMubWVkaWFTb3VyY2UgPSBuZXcgc2VsZi5NZWRpYVNvdXJjZSgpO1xuICAgIHRoaXMubWVkaWFTb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcignc291cmNlb3BlbicsIHRoaXMub25Tb3VyY2VPcGVuLmJpbmQodGhpcykpO1xuICAgIHRoaXMuY29udGFpbmVyLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwodGhpcy5tZWRpYVNvdXJjZSk7XG4gICAgdGhpcy51cmwgPSB0aGlzLmNvbnRhaW5lci5zcmM7XG4gICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcigndGltZXVwZGF0ZScsIHRoaXMub25UaW1lVXBkYXRlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3dhaXRpbmcnLCB0aGlzLm9uV2FpdGluZy5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIG9uVGltZVVwZGF0ZSAoKSB7XG4gICAgdGhpcy5lbWl0KCdUSU1FX1VQREFURScsIHRoaXMuY29udGFpbmVyKTtcbiAgfVxuICAgXG4gIG9uV2FpdGluZyAoKSB7XG4gICAgdGhpcy5lbWl0KCdXQUlUSU5HJywgdGhpcy5jb250YWluZXIpO1xuICB9XG5cbiAgb25Tb3VyY2VPcGVuICgpIHtcbiAgICB0aGlzLmFkZFNvdXJjZUJ1ZmZlcnMoKTtcbiAgfVxuXG4gIG9uVXBkYXRlRW5kICgpIHtcbiAgICB0aGlzLmVtaXQoJ1NPVVJDRV9VUERBVEVfRU5EJyk7XG4gICAgdGhpcy5kb0FwcGVuZCgpXG4gIH1cbiAgYWRkU291cmNlQnVmZmVycyAoKSB7XG4gICAgaWYgKHRoaXMubWVkaWFTb3VyY2UucmVhZHlTdGF0ZSAhPT0gJ29wZW4nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBzb3VyY2VzID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnUFJFX1NPVVJDRV9CVUZGRVInKTtcbiAgICBsZXQgdHJhY2tzID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJyk7XG4gICAgbGV0IHRyYWNrO1xuXG4gICAgc291cmNlcyA9IHNvdXJjZXMuc291cmNlcztcbiAgICBsZXQgYWRkID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDAsIGsgPSBPYmplY3Qua2V5cyhzb3VyY2VzKS5sZW5ndGg7IGkgPCBrOyBpKyspIHtcbiAgICAgIGxldCB0eXBlID0gT2JqZWN0LmtleXMoc291cmNlcylbaV07XG4gICAgICBpZiAodHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgICB0cmFjayA9IHRyYWNrcy5hdWRpb1RyYWNrO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAndmlkZW8nKSB7XG4gICAgICAgIHRyYWNrID0gdHJhY2tzLnZpZGVvVHJhY2s7XG4gICAgICB9XG4gICAgICBpZiAodHJhY2spIHtcbiAgICAgICAgbGV0IGR1ciA9IHR5cGUgPT09ICdhdWRpbycgPyAyMSA6IDQwO1xuICAgICAgICBpZiAodHJhY2subWV0YSAmJiB0cmFjay5tZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSBkdXIgPSB0cmFjay5tZXRhLnJlZlNhbXBsZUR1cmF0aW9uO1xuICAgICAgICBpZiAoc291cmNlc1t0eXBlXS5kYXRhLmxlbmd0aCA+PSAodGhpcy5wcmVsb2FkVGltZSAvIGR1cikpIHtcbiAgICAgICAgICBhZGQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGFkZCkge1xuICAgICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycykubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gMCwgayA9IE9iamVjdC5rZXlzKHNvdXJjZXMpLmxlbmd0aDsgaSA8IGs7IGkrKykge1xuICAgICAgICBsZXQgdHlwZSA9IE9iamVjdC5rZXlzKHNvdXJjZXMpW2ldO1xuICAgICAgICBsZXQgc291cmNlID0gc291cmNlc1t0eXBlXVxuICAgICAgICBsZXQgbWltZSA9ICh0eXBlID09PSAndmlkZW8nKSA/ICd2aWRlby9tcDQ7Y29kZWNzPScgKyBzb3VyY2UubWltZXR5cGUgOiAnYXVkaW8vbXA0O2NvZGVjcz0nICsgc291cmNlLm1pbWV0eXBlXG4gICAgICAgIGxldCBzb3VyY2VCdWZmZXIgPSB0aGlzLm1lZGlhU291cmNlLmFkZFNvdXJjZUJ1ZmZlcihtaW1lKTtcbiAgICAgICAgdGhpcy5zb3VyY2VCdWZmZXJzW3R5cGVdID0gc291cmNlQnVmZmVyO1xuICAgICAgICBzb3VyY2VCdWZmZXIuYWRkRXZlbnRMaXN0ZW5lcigndXBkYXRlZW5kJywgdGhpcy5vblVwZGF0ZUVuZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5kb0FwcGVuZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRvQXBwZW5kICgpIHtcbiAgICBsZXQgc291cmNlcyA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1BSRV9TT1VSQ0VfQlVGRkVSJyk7XG4gICAgaWYgKHNvdXJjZXMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKS5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdHlwZSA9IE9iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycylbaV1cbiAgICAgICAgbGV0IHNvdXJjZUJ1ZmZlciA9IHRoaXMuc291cmNlQnVmZmVyc1t0eXBlXTtcbiAgICAgICAgaWYgKCFzb3VyY2VCdWZmZXIudXBkYXRpbmcpIHtcbiAgICAgICAgICBsZXQgc291cmNlID0gc291cmNlcy5zb3VyY2VzW3R5cGVdO1xuICAgICAgICAgIGlmIChzb3VyY2UgJiYgIXNvdXJjZS5pbml0ZWQpIHtcbiAgICAgICAgICAgIHNvdXJjZUJ1ZmZlci5hcHBlbmRCdWZmZXIoc291cmNlLmluaXQuYnVmZmVyLmJ1ZmZlcik7XG4gICAgICAgICAgICBzb3VyY2UuaW5pdGVkID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNvdXJjZSkge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBzb3VyY2UuZGF0YS5zaGlmdCgpXG4gICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICBzb3VyY2VCdWZmZXIuYXBwZW5kQnVmZmVyKGRhdGEuYnVmZmVyLmJ1ZmZlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZW5kT2ZTdHJlYW0gKCkge1xuICAgIGlmICh0aGlzLm1lZGlhU291cmNlLnJlYWR5U3RhdGUgPT09ICdvcGVuJykge1xuICAgICAgdGhpcy5tZWRpYVNvdXJjZS5lbmRPZlN0cmVhbSgpXG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlIChlbmQpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE9iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycykubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBidWZmZXIgPSB0aGlzLnNvdXJjZUJ1ZmZlcnNbT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKVtpXV07XG4gICAgICBpZiAoIWJ1ZmZlci51cGRhdGluZykge1xuICAgICAgICBidWZmZXIucmVtb3ZlKDAsIGVuZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndGltZXVwZGF0ZScsIHRoaXMub25UaW1lVXBkYXRlKTtcbiAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCd3YWl0aW5nJywgdGhpcy5vbldhaXRpbmcpO1xuICAgIHRoaXMubWVkaWFTb3VyY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcignc291cmNlb3BlbicsIHRoaXMub25Tb3VyY2VPcGVuKTtcbiAgICB0aGlzLmNvbmZpZ3MgPSB7fTtcbiAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gICAgdGhpcy5tZWRpYVNvdXJjZSA9IG51bGw7XG4gICAgdGhpcy5zb3VyY2VCdWZmZXJzID0ge307XG4gICAgdGhpcy5wcmVsb2FkVGltZSA9IDE7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBPYmplY3Qua2V5cyh0aGlzLnNvdXJjZUJ1ZmZlcnMpLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYnVmZmVyID0gdGhpcy5zb3VyY2VCdWZmZXJzW09iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycylbaV1dO1xuICAgICAgYnVmZmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3VwZGF0ZWVuZCcsIHRoaXMub25VcGRhdGVFbmQpO1xuICAgICAgdGhpcy5tZWRpYVNvdXJjZS5yZW1vdmVTb3VyY2VCdWZmZXIoYnVmZmVyKTtcbiAgICAgIGRlbGV0ZSB0aGlzLnNvdXJjZUJ1ZmZlcnNbT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKVtpXV07XG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBNU0U7XG4iLCJpbXBvcnQgQ29uY2F0IGZyb20gJ2NvbmNhdC10eXBlZC1hcnJheSdcblxuY2xhc3MgQnVmZmVyIHtcbiAgY29uc3RydWN0b3IgKGJ1ZmZlcikge1xuICAgIHRoaXMuYnVmZmVyID0gYnVmZmVyIHx8IG5ldyBVaW50OEFycmF5KDApXG4gIH1cblxuICB3cml0ZSAoLi4uYnVmZmVyKSB7XG4gICAgYnVmZmVyLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICB0aGlzLmJ1ZmZlciA9IENvbmNhdChVaW50OEFycmF5LCB0aGlzLmJ1ZmZlciwgaXRlbSlcbiAgICB9KVxuICB9XG5cbiAgc3RhdGljIHdyaXRlVWludDMyICh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgVWludDhBcnJheShbXG4gICAgICB2YWx1ZSA+PiAyNCxcbiAgICAgICh2YWx1ZSA+PiAxNikgJiAweGZmLFxuICAgICAgKHZhbHVlID4+IDgpICYgMHhmZixcbiAgICAgIHZhbHVlICYgMHhmZlxuICAgIF0pXG4gIH1cblxuICBzdGF0aWMgcmVhZEFzSW50IChhcnIpIHtcbiAgICBsZXQgdGVtcCA9ICcnXG5cbiAgICBmdW5jdGlvbiBwYWRTdGFydDRIZXggKGhleE51bSkge1xuICAgICAgbGV0IGhleFN0ciA9IGhleE51bS50b1N0cmluZygxNilcbiAgICAgIHJldHVybiBoZXhTdHIucGFkU3RhcnQoMiwgJzAnKVxuICAgIH1cblxuICAgIGFyci5mb3JFYWNoKG51bSA9PiB7XG4gICAgICB0ZW1wICs9IHBhZFN0YXJ0NEhleChudW0pXG4gICAgfSlcbiAgICByZXR1cm4gcGFyc2VJbnQodGVtcCwgMTYpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQnVmZmVyXG4iLCJjbGFzcyBTdHJlYW0ge1xuICBjb25zdHJ1Y3RvciAoYnVmZmVyKSB7XG4gICAgaWYgKGJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICB0aGlzLmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgIHRoaXMuZGF0YXZpZXcgPSBuZXcgRGF0YVZpZXcoYnVmZmVyKTtcbiAgICAgIHRoaXMuZGF0YXZpZXcucG9zaXRpb24gPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RhdGEgaXMgaW52YWxpZCcpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBsZW5ndGggKCkge1xuICAgIHJldHVybiB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoO1xuICB9XG5cbiAgc2V0IHBvc2l0aW9uICh2YWx1ZSkge1xuICAgIHRoaXMuZGF0YXZpZXcucG9zaXRpb24gPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBwb3NpdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YXZpZXcucG9zaXRpb247XG4gIH1cblxuICBiYWNrIChjb3VudCkge1xuICAgIHRoaXMucG9zaXRpb24gLT0gY291bnQ7XG4gIH1cblxuICBza2lwIChjb3VudCkge1xuICAgIGxldCBsb29wID0gTWF0aC5mbG9vcihjb3VudCAvIDQpO1xuICAgIGxldCBsYXN0ID0gY291bnQgJSA0O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbG9vcDsgaSsrKSB7XG4gICAgICBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgNCk7XG4gICAgfVxuICAgIGlmIChsYXN0ID4gMCkge1xuICAgICAgU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIGxhc3QpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBbcmVhZEJ5dGUg5LuORGF0YVZpZXfkuK3or7vlj5bmlbDmja5dXG4gICAqIEBwYXJhbSAge0RhdGFWaWV3fSBidWZmZXIgW0RhdGFWaWV35a6e5L6LXVxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHNpemUgICBb6K+75Y+W5a2X6IqC5pWwXVxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9ICAgICAgICBb5pW05pWwXVxuICAgKi9cbiAgc3RhdGljIHJlYWRCeXRlIChidWZmZXIsIHNpemUsIHNpZ24pIHtcbiAgICBsZXQgcmVzO1xuICAgIHN3aXRjaCAoc2l6ZSkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICBpZiAoc2lnbikge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRJbnQ4KGJ1ZmZlci5wb3NpdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzID0gYnVmZmVyLmdldFVpbnQ4KGJ1ZmZlci5wb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGlmIChzaWduKSB7XG4gICAgICAgICAgcmVzID0gYnVmZmVyLmdldEludDE2KGJ1ZmZlci5wb3NpdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzID0gYnVmZmVyLmdldFVpbnQxNihidWZmZXIucG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBpZiAoc2lnbikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IHN1cHBvcnRlZCBmb3IgcmVhZEJ5dGUgMycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRVaW50OChidWZmZXIucG9zaXRpb24pIDw8IDE2O1xuICAgICAgICAgIHJlcyB8PSBidWZmZXIuZ2V0VWludDgoYnVmZmVyLnBvc2l0aW9uICsgMSkgPDwgODtcbiAgICAgICAgICByZXMgfD0gYnVmZmVyLmdldFVpbnQ4KGJ1ZmZlci5wb3NpdGlvbiArIDIpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0OlxuICAgICAgICBpZiAoc2lnbikge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRJbnQzMihidWZmZXIucG9zaXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRVaW50MzIoYnVmZmVyLnBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgODpcbiAgICAgICAgaWYgKHNpZ24pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBzdXBwb3J0ZWQgZm9yIHJlYWRCb2R5IDgnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXMgPSBidWZmZXIuZ2V0VWludDMyKGJ1ZmZlci5wb3NpdGlvbikgPDwgMzI7XG4gICAgICAgICAgcmVzIHw9IGJ1ZmZlci5nZXRVaW50MzIoYnVmZmVyLnBvc2l0aW9uICsgNCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXMgPSAnJztcbiAgICB9XG4gICAgYnVmZmVyLnBvc2l0aW9uICs9IHNpemU7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHJlYWRVaW50OCAoKSB7XG4gICAgcmV0dXJuIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCAxKTtcbiAgfVxuXG4gIHJlYWRVaW50MTYgKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgMik7XG4gIH1cblxuICByZWFkVWludDI0ICgpIHtcbiAgICByZXR1cm4gU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIDMpO1xuICB9XG5cbiAgcmVhZFVpbnQzMiAoKSB7XG4gICAgcmV0dXJuIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCA0KTtcbiAgfVxuXG4gIHJlYWRVaW50NjQgKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgOCk7XG4gIH1cblxuICByZWFkSW50OCAoKSB7XG4gICAgcmV0dXJuIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCAxLCB0cnVlKTtcbiAgfVxuICByZWFkSW50MTYgKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgMiwgdHJ1ZSk7XG4gIH1cblxuICByZWFkSW50MzIgKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgNCwgdHJ1ZSk7XG4gIH1cblxuICB3cml0ZVVpbnQzMiAodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgdmFsdWUgPj4+IDI0ICYgMHhmZixcbiAgICAgIHZhbHVlID4+PiAxNiAmIDB4ZmYsXG4gICAgICB2YWx1ZSA+Pj4gOCAmIDB4ZmYsXG4gICAgICB2YWx1ZSAmIDB4ZmZcbiAgICBdKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdHJlYW07XG4iLCJpbXBvcnQgeyBGZXRjaExvYWRlciB9IGZyb20gJ3hncGxheWVyLWxvYWRlcidcbmltcG9ydCB7IEZsdkRlbXV4ZXIgfSBmcm9tICd4Z3BsYXllci1kZW11eCdcbmltcG9ydCB7IE1wNFJlbXV4ZXIgfSBmcm9tICd4Z3BsYXllci1yZW11eCdcbmltcG9ydCB7IFRyYWNrcywgWGdCdWZmZXIsIFByZVNvdXJjZSB9IGZyb20gJ3hncGxheWVyLWJ1ZmZlcidcbmltcG9ydCB7IEVWRU5UUywgTW9iaWxlVmlkZW8gfSBmcm9tICd4Z3BsYXllci11dGlscydcbmltcG9ydCB7IENvbXBhdGliaWxpdHkgfSBmcm9tICd4Z3BsYXllci1jb2RlYydcbmltcG9ydCBQbGF5ZXIgZnJvbSAneGdwbGF5ZXInXG5cbmNvbnN0IERFTVVYX0VWRU5UUyA9IEVWRU5UUy5ERU1VWF9FVkVOVFM7XG5jb25zdCBMT0FERVJfRVZFTlRTID0gRVZFTlRTLkxPQURFUl9FVkVOVFNcbmNvbnN0IFJFTVVYX0VWRU5UUyA9IEVWRU5UUy5SRU1VWF9FVkVOVFNcblxuY29uc3QgVGFnID0gJ0ZMVkNvbnRyb2xsZXInXG5cbmNsYXNzIExvZ2dlciB7XG4gIHdhcm4gKCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmx2Q29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yIChwbGF5ZXIpIHtcbiAgICB0aGlzLlRBRyA9IFRhZ1xuICAgIHRoaXMuX3BsYXllciA9IHBsYXllclxuXG4gICAgLy8gVE9ETyDkuLTml7bmjILnmoQg6ZyA6KaB5aSE55CG5YiwUGxheWVy5bGCXG4gICAgLy8gdGhpcy52aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21vYmlsZS12aWRlbycpO1xuICAgIHRoaXMuX3BsYXllci52aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21vYmlsZS12aWRlbycpO1xuICAgIHRoaXMudmlkZW8gPSB0aGlzLl9wbGF5ZXIudmlkZW87XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGluaXRTZWdtZW50QXJyaXZlZDogZmFsc2VcbiAgICB9XG4gIH1cblxuICBpbml0ICgpIHtcbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdGRVRDSF9MT0FERVInLCBGZXRjaExvYWRlcilcbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdMT0FERVJfQlVGRkVSJywgWGdCdWZmZXIpXG4gICAgdGhpcy5fY29udGV4dC5yZWdpc3RyeSgnUFJFX1NPVVJDRV9CVUZGRVInLCBQcmVTb3VyY2UpXG5cbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdGTFZfREVNVVhFUicsIEZsdkRlbXV4ZXIpXG5cbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdNUDRfUkVNVVhFUicsIE1wNFJlbXV4ZXIpXG4gICAgdGhpcy5fY29udGV4dC5yZWdpc3RyeSgnVFJBQ0tTJywgVHJhY2tzKVxuXG4gICAgdGhpcy5fY29udGV4dC5yZWdpc3RyeSgnQ09NUEFUSUJJTElUWScsIENvbXBhdGliaWxpdHkpXG5cbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdMT0dHRVInLCBMb2dnZXIpXG5cbiAgICB0aGlzLmluaXRMaXN0ZW5lcnMoKVxuICB9XG5cbiAgaW5pdExpc3RlbmVycyAoKSB7XG4gICAgdGhpcy5vbihMT0FERVJfRVZFTlRTLkxPQURFUl9EQVRBTE9BREVELCB0aGlzLl9oYW5kbGVMb2FkZXJEYXRhTG9hZGVkLmJpbmQodGhpcykpXG4gICAgdGhpcy5vbihMT0FERVJfRVZFTlRTLkxPQURFUl9FUlJPUiwgdGhpcy5faGFuZGxlTmV0d29ya0Vycm9yLmJpbmQodGhpcykpXG5cbiAgICB0aGlzLm9uKERFTVVYX0VWRU5UUy5NRURJQV9JTkZPLCB0aGlzLl9oYW5kbGVNZWRpYUluZm8uYmluZCh0aGlzKSlcbiAgICB0aGlzLm9uKERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsIHRoaXMuX2hhbmRsZU1ldGFkYXRhUGFyc2VkLmJpbmQodGhpcykpXG4gICAgdGhpcy5vbihERU1VWF9FVkVOVFMuREVNVVhfQ09NUExFVEUsIHRoaXMuX2hhbmRsZURlbXV4Q29tcGxldGUuYmluZCh0aGlzKSlcbiAgICB0aGlzLm9uKERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgdGhpcy5faGFuZGxlRGVtdXhFcnJvci5iaW5kKHRoaXMpKVxuXG4gIH1cblxuICBfaGFuZGxlTWVkaWFJbmZvICgpIHtcbiAgICBpZiAoIXRoaXMuX2NvbnRleHQubWVkaWFJbmZvKSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCBuZXcgRXJyb3IoJ2ZhaWxlZCB0byBnZXQgbWVkaWFpbmZvJykpXG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZUxvYWRlckRhdGFMb2FkZWQgKCkge1xuICAgIHRoaXMuZW1pdFRvKCdGTFZfREVNVVhFUicsIERFTVVYX0VWRU5UUy5ERU1VWF9TVEFSVClcbiAgfVxuXG4gIF9oYW5kbGVNZXRhZGF0YVBhcnNlZCAodHlwZSkge1xuICAgIGlmICh0eXBlID09PSAnYXVkaW8nKSB7XG4gICAgICAvLyDlsIbpn7PpopFtZXRh5L+h5oGv5Lqk57uZYXVkaW9Db250ZXh077yM5LiN6LWwcmVtdXjlsIHoo4VcbiAgICAgIGNvbnN0IHsgYXVkaW9UcmFjayB9ID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJylcbiAgICAgIGlmIChhdWRpb1RyYWNrICYmIGF1ZGlvVHJhY2subWV0YSkge1xuICAgICAgICB0aGlzLl9zZXRNZXRhVG9BdWRpbyhhdWRpb1RyYWNrLm1ldGEpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHsgdmlkZW9UcmFjayB9ID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJylcbiAgICAgIGlmICh2aWRlb1RyYWNrICYmIHZpZGVvVHJhY2subWV0YSkge1xuICAgICAgICB0aGlzLl9zZXRNZXRhVG9WaWRlbyh2aWRlb1RyYWNrLm1ldGEpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZURlbXV4Q29tcGxldGUgKCkge1xuICAgIGlmKHRoaXMuX3BsYXllci52aWRlbykge1xuICAgICAgY29uc3QgeyB2aWRlb1RyYWNrLCBhdWRpb1RyYWNrIH0gPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKTtcbiAgICAgIHRoaXMuX3BsYXllci52aWRlby5vbkRlbXV4Q29tcGxldGUodmlkZW9UcmFjaywgYXVkaW9UcmFjayk7XG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZUFwcGVuZEluaXRTZWdtZW50ICgpIHtcbiAgICB0aGlzLnN0YXRlLmluaXRTZWdtZW50QXJyaXZlZCA9IHRydWVcbiAgLy8gIHRoaXMubXNlLmFkZFNvdXJjZUJ1ZmZlcnMoKVxuICB9XG5cblxuICBfaGFuZGxlTmV0d29ya0Vycm9yICgpIHtcbiAgICB0aGlzLl9wbGF5ZXIuZW1pdCgnZXJyb3InLCBuZXcgUGxheWVyLkVycm9ycygnbmV0d29yaycsIHRoaXMuX3BsYXllci5jb25maWcudXJsKSlcbiAgfVxuXG4gIF9oYW5kbGVEZW11eEVycm9yICgpIHtcbiAgICB0aGlzLl9wbGF5ZXIuZW1pdCgnZXJyb3InLCBuZXcgUGxheWVyLkVycm9ycygncGFyc2UnLCB0aGlzLl9wbGF5ZXIuY29uZmlnLnVybCkpXG4gIH1cblxuIFxuICBfc2V0TWV0YVRvQXVkaW8gKGF1ZGlvTWV0YSkge1xuICAgIGlmICh0aGlzLl9wbGF5ZXIudmlkZW8pIHtcbiAgICAgIHRoaXMuX3BsYXllci52aWRlby5zZXRBdWRpb01ldGEoYXVkaW9NZXRhKTtcbiAgICB9XG4gIH1cblxuICBfc2V0TWV0YVRvVmlkZW8gKHZpZGVvTWV0YSkge1xuICAgIGlmICh0aGlzLl9wbGF5ZXIudmlkZW8pIHtcbiAgICAgIHRoaXMuX3BsYXllci52aWRlby5zZXRWaWRlb01ldGEodmlkZW9NZXRhKTtcbiAgICB9XG4gIH1cblxuICBzZWVrICgpIHtcbiAgICBpZiAoIXRoaXMuc3RhdGUuaW5pdFNlZ21lbnRBcnJpdmVkKSB7XG4gICAgICB0aGlzLmxvYWREYXRhKClcbiAgICB9XG4gIH1cblxuICBsb2FkRGF0YSAoKSB7XG4gICAgdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTEFERVJfU1RBUlQsIHRoaXMuX3BsYXllci5jb25maWcudXJsKVxuICB9XG5cbiAgcGF1c2UgKCkge1xuICAgIGNvbnN0IGxvYWRlciA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ0ZFVENIX0xPQURFUicpXG5cbiAgICBpZiAobG9hZGVyKSB7XG4gICAgICBsb2FkZXIuY2FuY2VsKClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog5L+d6K+B5b2T5YmN5pKt5pS+55qE6KeG6aKR5LulZ29w5Li65Y2V5L2NXG4gICAqIEBwYXJhbSB2aWRlb1RyYWNrXG4gICAqL1xuICBzdGF0aWMgcmVzb2x2ZVZpZGVvR09QICh2aWRlb1RyYWNrKSB7XG4gICAgY29uc3QgeyBzYW1wbGVzIH0gPSB2aWRlb1RyYWNrO1xuICAgIGlmICghc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgZmlyc3RJZnJhbWVJZHggPSBudWxsXG4gICAgbGV0IGxhc3RJZnJhbWVJZHggPSBudWxsXG5cbiAgICBpZiAodmlkZW9UcmFjay50ZW1wU2FtcGxlcyAmJiB2aWRlb1RyYWNrLnRlbXBTYW1wbGVzLmxlbmd0aCkge1xuICAgICAgLy8g5bCG57yT5a2Y5bin5pS+572u5Yiw6Zif5YiX55qE5aS06YOoXG4gICAgICBzYW1wbGVzLnVuc2hpZnQuYXBwbHkoc2FtcGxlcywgdmlkZW9UcmFjay50ZW1wU2FtcGxlcyk7XG4gICAgfVxuXG4gICAgLy8g5a+75om+56ys5LiA5LiqSeW4p1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzYW1wbGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50ID0gc2FtcGxlc1tpXTtcbiAgICAgIGlmIChjdXJyZW50LmlzS2V5ZnJhbWUpIHtcbiAgICAgICAgZmlyc3RJZnJhbWVJZHggPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDlr7vmib7mnIDlkI7kuIDkuKpJ5binXG4gICAgZm9yIChsZXQgaSA9IHNhbXBsZXMubGVuZ3RoIC0gMTsgaSA+IDA7IGkrKykge1xuICAgICAgY29uc3QgY3VycmVudCA9IHNhbXBsZXNbaV1cblxuICAgICAgaWYgKGN1cnJlbnQuaXNLZXlmcmFtZSkge1xuICAgICAgICBsYXN0SWZyYW1lSWR4ID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGZpcnN0SWZyYW1lSWR4ICE9PSAwKSB7XG4gICAgICBzYW1wbGVzLnNwbGljZSgwLCBmaXJzdElmcmFtZUlkeCAtIDEpXG4gICAgfVxuXG4gICAgdmlkZW9UcmFjay5zYW1wbGVzID0gc2FtcGxlcy5zbGljZSgwLCBsYXN0SWZyYW1lSWR4KVxuICAgIGNvbnN0IHJlc3QgPSBzYW1wbGVzLnNsaWNlKGxhc3RJZnJhbWVJZHgpXG4gICAgaWYgKHZpZGVvVHJhY2sudGVtcFNhbXBsZXMpIHtcbiAgICAgIHZpZGVvVHJhY2sudGVtcFNhbXBsZXMucHVzaC5hcHBseSh2aWRlb1RyYWNrLnRlbXBTYW1wbGVzLCByZXN0KVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyDlsIbliankuIvnmoTluKfnvJPlrZjvvIznrYnlvoXkuIDkuKrlrozmlbTnmoRnb3BcbiAgICAgIHZpZGVvVHJhY2sudGVtcFNhbXBsZXMgPSByZXN0XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gJ3hncGxheWVyJ1xuaW1wb3J0IHsgQ29udGV4dCwgRVZFTlRTIH0gZnJvbSAneGdwbGF5ZXItdXRpbHMnO1xuaW1wb3J0IEZMViBmcm9tICcuL2Zsdi1saXZlLW1vYmlsZSdcbmNvbnN0IGZsdkFsbG93ZWRFdmVudHMgPSBFVkVOVFMuRmx2QWxsb3dlZEV2ZW50cztcblxuY2xhc3MgRmx2UGxheWVyIGV4dGVuZHMgUGxheWVyIHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZykge1xuICAgIHN1cGVyKGNvbmZpZylcbiAgICB0aGlzLmNvbnRleHQgPSBuZXcgQ29udGV4dChmbHZBbGxvd2VkRXZlbnRzKVxuICAgIHRoaXMuaW5pdEV2ZW50cygpXG4gIH1cblxuICBzdGFydCAoKSB7XG4gICAgdGhpcy5pbml0Rmx2KClcbiAgICB0aGlzLmNvbnRleHQuaW5pdCgpXG4gICAgdGhpcy5mbHYuc2VlaygwKTtcbiAgICBzdXBlci5zdGFydCh0aGlzLmNvbmZpZy51cmwpO1xuICAgIHRoaXMucGxheSgpO1xuICB9XG5cbiAgaW5pdEZsdkV2ZW50cyAoZmx2KSB7XG4gICAgY29uc3QgcGxheWVyID0gdGhpcztcbiAgICBmbHYub25jZShFVkVOVFMuUkVNVVhfRVZFTlRTLklOSVRfU0VHTUVOVCwgKCkgPT4ge1xuICAgICAgUGxheWVyLnV0aWwuYWRkQ2xhc3MocGxheWVyLnJvb3QsICd4Z3BsYXllci1pcy1saXZlJylcbiAgICAgIGlmICghUGxheWVyLnV0aWwuZmluZERvbSh0aGlzLnJvb3QsICd4Zy1saXZlJykpIHtcbiAgICAgICAgY29uc3QgbGl2ZSA9IFBsYXllci51dGlsLmNyZWF0ZURvbSgneGctbGl2ZScsICfmraPlnKjnm7Tmkq0nLCB7fSwgJ3hncGxheWVyLWxpdmUnKVxuICAgICAgICBwbGF5ZXIuY29udHJvbHMuYXBwZW5kQ2hpbGQobGl2ZSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgZmx2Lm9uY2UoRVZFTlRTLkxPQURFUl9FVkVOVFMuTE9BREVSX0NPTVBMRVRFLCAoKSA9PiB7XG4gICAgICAvLyDnm7Tmkq3lrozmiJDvvIzlvoXmkq3mlL7lmajmkq3lroznvJPlrZjlkI7lj5HpgIHlhbPpl63kuovku7ZcbiAgICAgIGlmICghcGxheWVyLnBhdXNlZCkge1xuICAgICAgICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICBjb25zdCBlbmQgPSBwbGF5ZXIuZ2V0QnVmZmVyZWRSYW5nZSgpWzFdXG4gICAgICAgICAgaWYgKE1hdGguYWJzKHBsYXllci5jdXJyZW50VGltZSAtIGVuZCkgPCAwLjUpIHtcbiAgICAgICAgICAgIHBsYXllci5lbWl0KCdlbmRlZCcpXG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDIwMClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgaW5pdEV2ZW50cyAoKSB7XG4gICAgdGhpcy5vbigndGltZXVwZGF0ZScsICgpID0+IHtcbiAgICAgIHRoaXMubG9hZERhdGEoKVxuICAgIH0pXG5cbiAgICB0aGlzLm9uKCdzZWVraW5nJywgKCkgPT4ge1xuICAgICAgY29uc3QgdGltZSA9IHRoaXMuY3VycmVudFRpbWVcbiAgICAgIGNvbnN0IHJhbmdlID0gdGhpcy5nZXRCdWZmZXJlZFJhbmdlKClcbiAgICAgIGlmICh0aW1lID4gcmFuZ2VbMV0gfHwgdGltZSA8IHJhbmdlWzBdKSB7XG4gICAgICAgIHRoaXMuZmx2LnNlZWsodGhpcy5jdXJyZW50VGltZSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgaW5pdEZsdiAoKSB7XG4gICAgY29uc3QgZmx2ID0gdGhpcy5jb250ZXh0LnJlZ2lzdHJ5KCdGTFZfQ09OVFJPTExFUicsIEZMVikodGhpcylcbiAgICB0aGlzLmluaXRGbHZFdmVudHMoZmx2KVxuICAgIHRoaXMuZmx2ID0gZmx2XG4gIH1cblxuICBwbGF5ICgpIHtcbiAgICBjb25zb2xlLmxvZygncGxheScpO1xuICAgIGlmICh0aGlzLl9oYXNTdGFydCkge1xuICAgICAgdGhpcy5fZGVzdHJveSgpXG4gICAgICB0aGlzLmNvbnRleHQgPSBuZXcgQ29udGV4dChmbHZBbGxvd2VkRXZlbnRzKVxuICAgICAgY29uc3QgZmx2ID0gdGhpcy5jb250ZXh0LnJlZ2lzdHJ5KCdGTFZfQ09OVFJPTExFUicsIEZMVikodGhpcylcbiAgICAgIHRoaXMuaW5pdEZsdkV2ZW50cyhmbHYpXG4gICAgICB0aGlzLmZsdiA9IGZsdlxuICAgICAgdGhpcy5jb250ZXh0LmluaXQoKVxuICAgICAgc3VwZXIuc3RhcnQoZmx2Lm1zZS51cmwpXG4gICAgICBzdXBlci5wbGF5KClcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIucGxheSgpXG4gICAgfVxuICB9XG5cbiAgcGF1c2UgKCkge1xuICAgIHN1cGVyLnBhdXNlKClcbiAgICBpZiAodGhpcy5mbHYpIHtcbiAgICAgIHRoaXMuZmx2LnBhdXNlKClcbiAgICB9XG4gIH1cblxuICBsb2FkRGF0YSAodGltZSA9IHRoaXMuY3VycmVudFRpbWUpIHtcbiAgICBpZiAodGhpcy5mbHYpIHtcbiAgICAgIHRoaXMuZmx2LnNlZWsodGltZSlcbiAgICB9XG4gIH1cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5fZGVzdHJveSgpXG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICB9XG5cbiAgX2Rlc3Ryb3kgKCkge1xuICAgIHRoaXMuY29udGV4dC5kZXN0cm95KClcbiAgICB0aGlzLmZsdiA9IG51bGxcbiAgICB0aGlzLmNvbnRleHQgPSBudWxsXG4gIH1cblxuICBnZXQgc3JjICgpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50U3JjXG4gIH1cblxuICBzZXQgc3JjICh1cmwpIHtcbiAgICB0aGlzLnBsYXllci5jb25maWcudXJsID0gdXJsXG4gICAgaWYgKCF0aGlzLnBhdXNlZCkge1xuICAgICAgdGhpcy5wYXVzZSgpXG4gICAgICB0aGlzLm9uY2UoJ3BhdXNlJywgKCkgPT4ge1xuICAgICAgICB0aGlzLnN0YXJ0KHVybClcbiAgICAgIH0pXG4gICAgICB0aGlzLm9uY2UoJ2NhbnBsYXknLCAoKSA9PiB7XG4gICAgICAgIHRoaXMucGxheSgpXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXJ0KHVybClcbiAgICB9XG4gICAgdGhpcy5vbmNlKCdjYW5wbGF5JywgKCkgPT4ge1xuICAgICAgdGhpcy5jdXJyZW50VGltZSA9IDBcbiAgICB9KVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRmx2UGxheWVyXG4iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gd2luZG93W1wiUGxheWVyXCJdOyB9KCkpOyJdLCJzb3VyY2VSb290IjoiIn0=