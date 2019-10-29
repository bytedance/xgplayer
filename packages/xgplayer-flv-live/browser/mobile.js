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

    // this.removeInvalidSamples()

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
        this.emit(DEMUX_EVENTS.METADATA_PARSED, 'audio');
        this.emit(DEMUX_EVENTS.AUDIO_METADATA_CHANGE);
      }
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
            this.emit(DEMUX_EVENTS.METADATA_PARSED, 'audio');
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
    this.emit('AUDIO_SOURCE_END');
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
      this.start += gap;
      this.vCtx.pause();
      this.timeoutId = setTimeout(() => {
        this.vCtx.play();
        this.timeoutId = null;
      }, gap);
    } else if (gap < -120) {
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
    this.handleAudioSourceEnd = this.handleAudioSourceEnd.bind(this);
    this.init();
  }

  init() {
    this.vCtx.oncanplay = () => {
      this.appendChild(this.vCtx.canvas);
      // eslint-disable-next-line no-undef
      this.dispatchEvent(new Event('canplay'));
    };

    this.ticker.start(() => {
      //
      // console.log(this.aCtx.currentTime)
      if (!this.start) {
        this.start = Date.now();
      }
      this.vCtx._onTimer(Date.now() - this.start);
    });

    this.aCtx.on('AUDIO_SOURCE_END', this.handleAudioSourceEnd);
  }

  handleAudioSourceEnd() {
    this.reconciler.doReconcile();
  }

  _cleanBuffer() {
    this.vCtx.cleanBuffer();
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
    this._lastRenderTime = null;
    this.initWasmWorker();
  }

  pause() {
    this.paused = true;
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
        let currentIdx = 0;
        for (let i = 0; i < frameTimes.length && Number.parseInt(frameTimes[i]) - this._baseDts <= this.currentTime; i++) {
          frameTime = Number.parseInt(frameTimes[i - 1]);
          currentIdx = i;
        }

        let frame = this._decodedFrames[frameTime];
        if (frame) {
          if (this.oncanplay && this.readyStatus < 4) {
            this.oncanplay();
            this.readyStatus = 4;
          }
          console.log(frameTime);
          this.yuvCanvas.render(frame.buffer, frame.width, frame.height);
          for (let i = 0; i < currentIdx; i++) {
            delete this._decodedFrames[i];
          }
        }
      }
    }
    this._lastRenderTime = Date.now();
  }

  cleanBuffer() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9GbHZQbGF5ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy9Vc2Vycy9sZW9uYXJkby9Eb2N1bWVudHMvZnJvbnQtZW5kL3BsYXllci94Z3BsYXllci9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1idWZmZXIvc3JjL2J1ZmZlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItYnVmZmVyL3NyYy9wcmVzb3VjZS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItYnVmZmVyL3NyYy90cmFjay5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItY29kZWMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWNvZGVjL3NyYy9hYWMvYWFjLWhlbHBlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItY29kZWMvc3JjL2NvbXBhdGliaWxpdHkuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWNvZGVjL3NyYy9oMjY0L25hbHVuaXQvZ29sb21iLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1jb2RlYy9zcmMvaDI2NC9uYWx1bml0L2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1jb2RlYy9zcmMvaDI2NC9uYWx1bml0L3Nwcy5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItZGVtdXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWRlbXV4L3NyYy9mbHYvYW1mLXBhcnNlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItZGVtdXgvc3JjL2Zsdi9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItZGVtdXgvc3JjL2hscy9kZW11eGVyL20zdThwYXJzZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWRlbXV4L3NyYy9obHMvZGVtdXhlci90cy5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItZGVtdXgvc3JjL2hscy9wbGF5bGlzdC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItbG9hZGVyL2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1sb2FkZXIvc3JjL2ZldGNoLWxvYWRlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItcmVtdXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXJlbXV4L3NyYy9tcDQvZm1wNC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItcmVtdXgvc3JjL21wNC9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL25vZGVfbW9kdWxlcy9jb25jYXQtdHlwZWQtYXJyYXkvbGliL2NvbmNhdC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvbm9kZV9tb2R1bGVzL2NvbmNhdC10eXBlZC1hcnJheS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL25vZGVfbW9kdWxlcy93ZWJ3b3JraWZ5LXdlYnBhY2svaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9jb25zdGFudHMvZXZlbnRzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvY29uc3RhbnRzL3dvcmtlci1jb21tYW5kcy5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL2NvbnRleHQuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9lbnYvaXNsZS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL2Vudi9zbmlmZmVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvZW52L3V0ZjguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2JpbGUvYXVkaW8tY29udGV4dC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vYmlsZS9tb2JpbGUtdmlkZW8uanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2JpbGUvc291cmNlYnVmZmVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9iaWxlL3RpY2tlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vYmlsZS92aWRlby1jb250ZXh0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9iaWxlL3dvcmtlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vYmlsZS95dXYtY2FudmFzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9kZWxzL21lZGlhLWluZm8uanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2RlbHMvbWVkaWEtc2FtcGxlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9kZWxzL21lZGlhLXNlZ21lbnQtbGlzdC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vZGVscy9tZWRpYS1zZWdtZW50LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9kZWxzL3RyYWNrLW1ldGEuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2RlbHMvdHJhY2stc2FtcGxlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbXNlL2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvd3JpdGUvYnVmZmVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvd3JpdGUvc3RyZWFtLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy9mbHYtbGl2ZS1tb2JpbGUuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL21vYmlsZS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvZXh0ZXJuYWwgXCJQbGF5ZXJcIiJdLCJuYW1lcyI6WyJSIiwiUmVmbGVjdCIsIlJlZmxlY3RBcHBseSIsImFwcGx5IiwidGFyZ2V0IiwicmVjZWl2ZXIiLCJhcmdzIiwiRnVuY3Rpb24iLCJwcm90b3R5cGUiLCJjYWxsIiwiUmVmbGVjdE93bktleXMiLCJvd25LZXlzIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImNvbmNhdCIsIlByb2Nlc3NFbWl0V2FybmluZyIsIndhcm5pbmciLCJjb25zb2xlIiwid2FybiIsIk51bWJlcklzTmFOIiwiTnVtYmVyIiwiaXNOYU4iLCJ2YWx1ZSIsIkV2ZW50RW1pdHRlciIsImluaXQiLCJtb2R1bGUiLCJleHBvcnRzIiwiX2V2ZW50cyIsInVuZGVmaW5lZCIsIl9ldmVudHNDb3VudCIsIl9tYXhMaXN0ZW5lcnMiLCJkZWZhdWx0TWF4TGlzdGVuZXJzIiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0Iiwic2V0IiwiYXJnIiwiUmFuZ2VFcnJvciIsImdldFByb3RvdHlwZU9mIiwiY3JlYXRlIiwic2V0TWF4TGlzdGVuZXJzIiwibiIsIiRnZXRNYXhMaXN0ZW5lcnMiLCJ0aGF0IiwiZ2V0TWF4TGlzdGVuZXJzIiwiZW1pdCIsInR5cGUiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwicHVzaCIsImRvRXJyb3IiLCJldmVudHMiLCJlcnJvciIsImVyIiwiRXJyb3IiLCJlcnIiLCJtZXNzYWdlIiwiY29udGV4dCIsImhhbmRsZXIiLCJsZW4iLCJsaXN0ZW5lcnMiLCJhcnJheUNsb25lIiwiX2FkZExpc3RlbmVyIiwibGlzdGVuZXIiLCJwcmVwZW5kIiwibSIsImV4aXN0aW5nIiwiVHlwZUVycm9yIiwibmV3TGlzdGVuZXIiLCJ1bnNoaWZ0Iiwid2FybmVkIiwidyIsIlN0cmluZyIsIm5hbWUiLCJlbWl0dGVyIiwiY291bnQiLCJhZGRMaXN0ZW5lciIsIm9uIiwicHJlcGVuZExpc3RlbmVyIiwib25jZVdyYXBwZXIiLCJmaXJlZCIsInJlbW92ZUxpc3RlbmVyIiwid3JhcEZuIiwiX29uY2VXcmFwIiwic3RhdGUiLCJ3cmFwcGVkIiwiYmluZCIsIm9uY2UiLCJwcmVwZW5kT25jZUxpc3RlbmVyIiwibGlzdCIsInBvc2l0aW9uIiwib3JpZ2luYWxMaXN0ZW5lciIsInNoaWZ0Iiwic3BsaWNlT25lIiwib2ZmIiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwia2V5cyIsImtleSIsIl9saXN0ZW5lcnMiLCJ1bndyYXAiLCJldmxpc3RlbmVyIiwidW53cmFwTGlzdGVuZXJzIiwicmF3TGlzdGVuZXJzIiwibGlzdGVuZXJDb3VudCIsImV2ZW50TmFtZXMiLCJhcnIiLCJjb3B5IiwiQXJyYXkiLCJpbmRleCIsInBvcCIsInJldCIsIlRyYWNrIiwicmVxdWlyZSIsImRlZmF1bHQiLCJUcmFja3MiLCJBdWRpb1RyYWNrIiwiVmlkZW9UcmFjayIsIlhnQnVmZmVyIiwiUmVtdXhCdWZmZXIiLCJQcmVTb3VyY2UiLCJjb25zdHJ1Y3RvciIsImhpc3RvcnlMZW4iLCJhcnJheSIsIm9mZnNldCIsImRhdGEiLCJieXRlTGVuZ3RoIiwiVWludDhBcnJheSIsIl9zaGlmdEJ1ZmZlciIsInNsaWNlIiwidG1wb2ZmIiwidG1wIiwidGVtcGxlbmd0aCIsImNsZWFyIiwiZGVzdHJveSIsInRvSW50Iiwic3RhcnQiLCJyZXRJbnQiLCJ2aWRlbyIsImF1ZGlvIiwiU291cmNlIiwibWltZXR5cGUiLCJzb3VyY2VzIiwiZ2V0U291cmNlIiwic291cmNlIiwiY3JlYXRlU291cmNlIiwiaWQiLCJzZXF1ZW5jZU51bWJlciIsInNhbXBsZXMiLCJkcm9wcGVkU2FtcGxlcyIsInJlc2V0IiwiZGlzdHJveSIsIlRBRyIsImRyb3BwZWQiLCJhdWRpb1RyYWNrIiwidmlkZW9UcmFjayIsIk5hbHVuaXQiLCJTcHNQYXJzZXIiLCJDb21wYXRpYmlsaXR5IiwiQUFDIiwiZ2V0U2lsZW50RnJhbWUiLCJjb2RlYyIsImNoYW5uZWxDb3VudCIsIlJFTVVYX0VWRU5UUyIsIkVWRU5UUyIsIm5leHRBdWRpb0R0cyIsIm5leHRWaWRlb0R0cyIsImxhc3RBdWRpb1NhbXBsZXNMZW4iLCJsYXN0VmlkZW9TYW1wbGVzTGVuIiwibGFzdFZpZGVvRHRzIiwibGFzdEF1ZGlvRHRzIiwiYWxsQXVkaW9TYW1wbGVzQ291bnQiLCJhbGxWaWRlb1NhbXBsZXNDb3VudCIsIl9maXJzdEF1ZGlvU2FtcGxlIiwiX2ZpcnN0VmlkZW9TYW1wbGUiLCJmaWxsZWRBdWRpb1NhbXBsZXMiLCJmaWxsZWRWaWRlb1NhbXBsZXMiLCJiZWZvcmUiLCJSRU1VWF9NRURJQSIsImRvRml4IiwiaXNGaXJzdEF1ZGlvU2FtcGxlcyIsImlzRmlyc3RWaWRlb1NhbXBsZXMiLCJnZXRGaXJzdFNhbXBsZSIsInJlY29yZFNhbXBsZXNDb3VudCIsImZpeFJlZlNhbXBsZUR1cmF0aW9uIiwibWV0YSIsImRvRml4VmlkZW8iLCJkb0ZpeEF1ZGlvIiwiZmlyc3QiLCJ2aWRlb1NhbXBsZXMiLCJmcmFtZVJhdGUiLCJmaXhlZCIsImZpcnN0U2FtcGxlIiwiZmlyc3REdHMiLCJkdHMiLCJzYW1wbGVzTGVuIiwidmlkZW9GaXJzdER0cyIsImF1ZGlvRmlyc3REdHMiLCJnYXAiLCJyZWZTYW1wbGVEdXJhdGlvbiIsImZpbGxDb3VudCIsIk1hdGgiLCJmbG9vciIsImNsb25lZEZpcnN0U2FtcGxlIiwiYXNzaWduIiwicHRzIiwiY3RzIiwic2l6ZSIsImFic0dhcCIsImFicyIsImZpbGxGcmFtZUNvdW50IiwiY2xvbmVkU2FtcGxlIiwiY29tcHV0ZWQiLCJvcmlnaW5EdHMiLCJsYXN0RHRzIiwibGFzdFNhbXBsZUR1cmF0aW9uIiwiY3VycmVudCIsIm5leHQiLCJkdXJhdGlvbiIsImZpbGxGcmFtZUlkeCIsImZpbGxGcmFtZSIsInNwbGljZSIsImF1ZGlvU2FtcGxlcyIsInNpbGVudEZyYW1lIiwic29ydEF1ZGlvU2FtcGxlcyIsInZpZGVvRmlyc3RQdHMiLCJzaWxlbnRTYW1wbGVDb3VudCIsInNpbGVudFNhbXBsZSIsImRhdGFzaXplIiwiZmlsdGVyZWQiLCJyZWZTYW1wbGVEdXJhdGlvbkZpeGVkIiwic2lsZW50RnJhbWVDb3VudCIsImZpbmRGaXJzdFZpZGVvU2FtcGxlIiwiZmluZEZpcnN0QXVkaW9TYW1wbGUiLCJpc1ZpZGVvIiwiYWxsU2FtcGxlc0NvdW50IiwiZmlsbGVkU2FtcGxlc0NvdW50IiwiZHVyYXRpb25BdmciLCJyZW1vdmVJbnZhbGlkU2FtcGxlcyIsImZpbHRlciIsInNhbXBsZSIsInNvcnQiLCJhIiwiYiIsInNvcnRlZCIsImlzS2V5ZnJhbWUiLCJ0cmFja3MiLCJfY29udGV4dCIsImdldEluc3RhbmNlIiwiR29sb21iIiwidWludDhhcnJheSIsIl9idWZmZXIiLCJfYnVmZmVySW5kZXgiLCJfdG90YWxCeXRlcyIsIl90b3RhbEJpdHMiLCJfY3VycmVudFdvcmQiLCJfY3VycmVudFdvcmRCaXRzTGVmdCIsIl9maWxsQ3VycmVudFdvcmQiLCJidWZmZXJCeXRlc0xlZnQiLCJieXRlc1JlYWQiLCJtaW4iLCJ3b3JkIiwic3ViYXJyYXkiLCJEYXRhVmlldyIsImJ1ZmZlciIsImdldFVpbnQzMiIsInJlYWRCaXRzIiwiYml0cyIsInJlc3VsdCIsImJpdHNOZWVkTGVmdCIsImJpdHNSZWFkTmV4dCIsInJlc3VsdDIiLCJyZWFkQm9vbCIsInJlYWRCeXRlIiwiX3NraXBMZWFkaW5nWmVybyIsInplcm9Db3VudCIsInJlYWRVRUciLCJsZWFkaW5nWmVyb3MiLCJyZWFkU0VHIiwiZ2V0TmFsdW5pdHMiLCJidWYiLCJkYXRhdmlldyIsImdldEludDMyIiwiZ2V0SW50MTYiLCJnZXRJbnQ4IiwiZ2V0QW5uZXhiTmFscyIsImdldEF2Y2NOYWxzIiwibmFscyIsImdldEhlYWRlclBvc2l0aW9uQW5uZXhCIiwicG9zIiwiZW5kIiwiaGVhZGVyIiwiaGVhZGVyTGVuZ3RoIiwic2tpcCIsImJvZHkiLCJ1bml0IiwiYW5hbHlzZU5hbCIsIm5kciIsImlkciIsInNwcyIsInBhcnNlU1BTIiwicHBzIiwiZ2V0QXZjYyIsIlNQU1BhcnNlciIsIl9lYnNwMnJic3AiLCJzcmMiLCJzcmNMZW5ndGgiLCJkc3QiLCJkc3RJZHgiLCJyYnNwIiwiZ2IiLCJwcm9maWxlSWRjIiwibGV2ZWxJZGMiLCJwcm9maWxlX3N0cmluZyIsImdldFByb2ZpbGVTdHJpbmciLCJsZXZlbF9zdHJpbmciLCJnZXRMZXZlbFN0cmluZyIsImNocm9tYV9mb3JtYXRfaWRjIiwiY2hyb21hX2Zvcm1hdCIsImNocm9tYV9mb3JtYXRfdGFibGUiLCJiaXRfZGVwdGgiLCJzY2FsaW5nX2xpc3RfY291bnQiLCJfc2tpcFNjYWxpbmdMaXN0IiwicGljX29yZGVyX2NudF90eXBlIiwibnVtX3JlZl9mcmFtZXNfaW5fcGljX29yZGVyX2NudF9jeWNsZSIsInBpY193aWR0aF9pbl9tYnNfbWludXMxIiwicGljX2hlaWdodF9pbl9tYXBfdW5pdHNfbWludXMxIiwiZnJhbWVfbWJzX29ubHlfZmxhZyIsImZyYW1lX2Nyb3BfbGVmdF9vZmZzZXQiLCJmcmFtZV9jcm9wX3JpZ2h0X29mZnNldCIsImZyYW1lX2Nyb3BfdG9wX29mZnNldCIsImZyYW1lX2Nyb3BfYm90dG9tX29mZnNldCIsImZyYW1lX2Nyb3BwaW5nX2ZsYWciLCJwYXJfd2lkdGgiLCJwYXJfaGVpZ2h0IiwiZnBzIiwiZnBzX2ZpeGVkIiwiZnBzX251bSIsImZwc19kZW4iLCJ2dWlfcGFyYW1ldGVyc19wcmVzZW50X2ZsYWciLCJhc3BlY3RfcmF0aW9faWRjIiwicGFyX3dfdGFibGUiLCJwYXJfaF90YWJsZSIsIm51bV91bml0c19pbl90aWNrIiwidGltZV9zY2FsZSIsInBhclNjYWxlIiwiY3JvcF91bml0X3giLCJjcm9wX3VuaXRfeSIsInN1Yl93YyIsInN1Yl9oYyIsImNvZGVjX3dpZHRoIiwiY29kZWNfaGVpZ2h0IiwicHJlc2VudF93aWR0aCIsImNlaWwiLCJjaHJvbWFfZm9ybWF0X3N0cmluZyIsImdldENocm9tYUZvcm1hdFN0cmluZyIsImZyYW1lX3JhdGUiLCJwYXJfcmF0aW8iLCJ3aWR0aCIsImhlaWdodCIsImNvZGVjX3NpemUiLCJwcmVzZW50X3NpemUiLCJsYXN0X3NjYWxlIiwibmV4dF9zY2FsZSIsImRlbHRhX3NjYWxlIiwidG9GaXhlZCIsImNocm9tYSIsInRvVmlkZW9NZXRhIiwic3BzQ29uZmlnIiwiY29kZWNXaWR0aCIsImNvZGVjSGVpZ2h0IiwicHJlc2VudFdpZHRoIiwicHJlc2VudEhlaWdodCIsInByb2ZpbGUiLCJsZXZlbCIsImJpdERlcHRoIiwiY2hyb21hRm9ybWF0IiwicGFyUmF0aW8iLCJmcHNEZW4iLCJmcHNOdW0iLCJ0aW1lc2NhbGUiLCJNM1U4UGFyc2VyIiwiVHNEZW11eGVyIiwiUGxheWxpc3QiLCJGbHZEZW11eGVyIiwiREFUQV9UWVBFUyIsIk5VTUJFUiIsIkJPT0xFQU4iLCJTVFJJTkciLCJPQkpFQ1QiLCJNSVhfQVJSQVkiLCJPQkpFQ1RfRU5EIiwiU1RSSUNUX0FSUkFZIiwiREFURSIsIkxPTkVfU1RSSU5HIiwiQU1GUGFyc2VyIiwicmVhZE9mZnNldCIsInJlc29sdmUiLCJtZXRhRGF0YSIsInBhcnNlVmFsdWUiLCJib2R5U2l6ZSIsInJlc2V0U3RhdHVzIiwicGFyc2VTdHJpbmciLCJkdiIsInN0ckxlbiIsImdldFVpbnQxNiIsImlzTGUiLCJzdHIiLCJVVEY4IiwiZGVjb2RlIiwicGFyc2VEYXRlIiwidHMiLCJnZXRGbG9hdDY0IiwidGltZU9mZnNldCIsIkRhdGUiLCJwYXJzZU9iamVjdCIsImlzT2JqRW5kIiwicGFyc2VMb25nU3RyaW5nIiwiQXJyYXlCdWZmZXIiLCJkYXRhVmlldyIsImdldFVpbnQ4IiwiYm9vbE51bSIsIm9iakVuZFNpemUiLCJhbWZPYmoiLCJpc09iamVjdEVuZCIsIm1hcmsiLCJhbWZWYXIiLCJtYXJrZXIiLCJhcnJMZW5ndGgiLCJzY3JpcHQiLCJkYXRlIiwibG9uZ1N0ciIsIkRFTVVYX0VWRU5UUyIsIl9maXJzdEZyYWdtZW50TG9hZGVkIiwiX3RyYWNrTnVtIiwiX2hhc1NjcmlwdCIsIkRFTVVYX1NUQVJUIiwiZG9QYXJzZUZsdiIsImlzRmx2RmlsZSIsImdldFBsYXlUeXBlIiwic3RyZWFtRmxhZyIsImhhc1ZpZGVvIiwiaGFzQXVkaW8iLCJsb2FkZXJCdWZmZXIiLCJwYXJzZUZsdkhlYWRlciIsImNodW5rIiwiX3BhcnNlRmx2VGFnIiwiREVNVVhfQ09NUExFVEUiLCJERU1VWF9FUlJPUiIsInBsYXlUeXBlIiwiaW5pdFZpZGVvVHJhY2siLCJpbml0QXVkaW9UcmFjayIsIlZpZGVvVHJhY2tNZXRhIiwiQXVkaW9UcmFja01ldGEiLCJfcGFyc2VGbHZUYWdIZWFkZXIiLCJfcHJvY2Vzc0NodW5rIiwidGFnVHlwZSIsImxvZ2dlciIsInRpbWVzdGFtcCIsInRpbWVzdGFtcEV4dCIsIl9wYXJzZVNjcmlwdERhdGEiLCJfcGFyc2VBQUNEYXRhIiwiX3BhcnNlSGV2Y0RhdGEiLCJpbmZvIiwib25NZXRhRGF0YSIsIm1lZGlhSW5mbyIsImhzYUF1ZGlvIiwidmFsaWRhdGUiLCJfZGF0YXNpemVWYWxpZGF0b3IiLCJNRURJQV9JTkZPIiwiaGFzU3BlY2lmaWNDb25maWciLCJhdWRpb3NhbXBsZXJhdGUiLCJzYW1wbGVSYXRlIiwiYXVkaW9jaGFubmVscyIsInNhbXBsZVJhdGVJbmRleCIsImZyYW1lcmF0ZSIsIl9hYWNTZXF1ZW5jZUhlYWRlclBhcnNlciIsIm9iamVjdFR5cGUiLCJfc3dpdGNoQXVkaW9TYW1wbGVSYXRlIiwiZnJhbWVMZW5ndGgiLCJkZXBlbmRzT25Db3JlQ29kZXIiLCJleHRlbnNpb25GbGFnSW5kZXgiLCJ1c2VyQWdlbnQiLCJ3aW5kb3ciLCJuYXZpZ2F0b3IiLCJ0b0xvd2VyQ2FzZSIsImV4dGVuc2lvblNhbXBsaW5nSW5kZXgiLCJjb25maWciLCJzYW1wbGluZ0luZGV4IiwiaW5kZXhPZiIsInRyYWNrIiwiZm9ybWF0IiwiX2hhc0F1ZGlvU2VxdWVuY2UiLCJfc3dpdGNoQXVkaW9TYW1wbGluZ0ZyZXF1ZW5jeSIsImZyYW1lTGVudGgiLCJhdWRpb1NhbXBsZVJhdGUiLCJhdWRpb1NhbXBsZVJhdGVJbmRleCIsImFhY0hlYWRlciIsImF1ZGlvTWVkaWEiLCJNRVRBREFUQV9QQVJTRUQiLCJBVURJT19NRVRBREFUQV9DSEFOR0UiLCJmcmFtZVR5cGUiLCJjb2RlY0lEIiwiYXZjUGFja2V0VHlwZSIsInBhcnNlSW50IiwibmFsdSIsInIiLCJzaXplcyIsImF2Y2NsZW5ndGgiLCJfYXZjU2VxdWVuY2VIZWFkZXJQYXJzZXIiLCJfaGFzVmlkZW9TZXF1ZW5jZSIsIlZJREVPX01FVEFEQVRBX0NIQU5HRSIsImNvbmZpZ3VyYXRpb25WZXJzaW9uIiwiYXZjUHJvZmlsZUluZGljYXRpb24iLCJwcm9maWxlQ29tcGF0aWJpbGl0eSIsImF2Y0xldmVsSW5kaWNhdGlvbiIsIm5hbFVuaXRMZW5ndGgiLCJudW1PZlNwcyIsImoiLCJjb2RlY1N0cmluZyIsImgiLCJ0b1N0cmluZyIsIm51bU9mUHBzIiwidmlkZW9NZWRpYSIsImF2Y2MiLCJzYW1wbGluZ0ZyZXF1ZW5jeUluZGV4Iiwic2FtcGxpbmdGcmVxdWVuY3lMaXN0IiwiX3N3aXRjaEF1ZGlvQ2hhbm5lbCIsInNhbXBsZVRyYWNrTnVtSW5kZXgiLCJzYW1wbGVUcmFja051bUxpc3QiLCJkYXRhc2l6ZUNvbmZpcm0iLCJwYXJzZSIsInRleHQiLCJiYXNldXJsIiwic3BsaXQiLCJyZWZzIiwicmVmIiwibWF0Y2giLCJyZWZtIiwidmVyc2lvbiIsInNlcXVlbmNlIiwidGFyZ2V0ZHVyYXRpb24iLCJwYXJzZUZsb2F0IiwicGFyc2VGcmFnIiwiZnJhZ3MiLCJmcmVnIiwibmV4dGxpbmUiLCJjaGFyQXQiLCJ1cmwiLCJwYXJzZVVSTCIsInVybHMiLCJTdHJlYW1UeXBlIiwiY29uZmlncyIsImRlbXV4aW5nIiwicGF0IiwicG10IiwiX2hhc1ZpZGVvTWV0YSIsIl9oYXNBdWRpb01ldGEiLCJkZW11eCIsImlucHV0QnVmZmVyIiwicGVzZXMiLCJ0c1N0cmVhbSIsIlN0cmVhbSIsInJlYWQiLCJwZXMiLCJwaWQiLCJFUyIsInBheWxvYWQiLCJzdHJlYW0iLCJlcGVzZXMiLCJNZXJnZSIsInB1c2hBdWRpb1NhbXBsZSIsInB1c2hWaWRlb1NhbXBsZSIsIl90cmFja3MiLCJmcmVxdWVuY2UiLCJjaGFubmVsIiwiYXVkaW9PYmplY3RUeXBlIiwiYXVkaW9Db25maWciLCJmcmVxdWVuY3lJbmRleCIsIkF1ZGlvVHJhY2tTYW1wbGUiLCJzYW1wbGVMZW5ndGgiLCJuYWwiLCJjb21wYWlyZVVpbnQ4Iiwic2FyUmF0aW8iLCJzYXJfcmF0aW8iLCJWaWRlb1RyYWNrU2FtcGxlIiwiZGVzdG9yeSIsImJ1ZmZlcnMiLCJyZWFkSGVhZGVyIiwicmVhZFBheWxvYWQiLCJwYWNrZXQiLCJ1bmtub3duUElEcyIsIlBFUyIsIlBBVCIsIkNBVCIsIlRTRFQiLCJzb21lIiwiaXRlbSIsIlBNVCIsInN0cyIsIk1lZGlhIiwic3RyZWFtVHlwZSIsInN5bmMiLCJyZWFkVWludDgiLCJyZWFkVWludDE2IiwicHJpb3JpdHkiLCJzY3JhbWJsaW5nIiwiYWRhcHRhdGlvbiIsImNvbnRpbnVpdHkiLCJ0YWJlbElEIiwiemVybyIsInNlY3Rpb25MZW5ndGgiLCJzdHJlYW1JRCIsInNlY3Rpb25OdW1iZXIiLCJsYXN0U2VjdGlvbk51bWJlciIsIk4iLCJwcm9ncmFtTnVtYmVyIiwicHJvZ3JhbSIsInRhYmxlSUQiLCJvcmRlciIsImxhc3RPcmRlciIsIlBDUl9QSUQiLCJwcm9ncmFtTGVuZ3RoIiwiZXMiLCJtYXAiLCJhZGFwdGF0aW9uTGVuZ3RoIiwiZGlzY29udGludWUiLCJhY2Nlc3MiLCJQQ1IiLCJPUENSIiwic3BsaWNlUG9pbnQiLCJ0cmFuc3BvcnRQcml2YXRlIiwiYWRhcHRhdGlvbkZpZWxkIiwiX3N0YXJ0IiwicHJvZ3JhbUNsb2NrQmFzZSIsInJlYWRVaW50MzIiLCJwcm9ncmFtQ2xvY2tFeHRlbnNpb24iLCJvcmlnaW5Qcm9ncmFtQ2xvY2tCYXNlIiwib3JpZ2luUHJvZ3JhbUNsb2NrRXh0ZW5zaW9uIiwic3BsaWNlQ291bnRkb3duIiwidHJhbnNwb3J0UHJpdmF0ZURhdGEiLCJsdHciLCJwaWVjZXdpc2UiLCJzZWFtbGVzcyIsImx0d1ZhbGlkIiwibHR3T2Zmc2V0IiwicmVhZFVpbnQyNCIsInBpZWNld2lzZVJhdGUiLCJyZWFkSW50OCIsInNwbGljZVR5cGUiLCJkdHNOZXh0QVUxIiwibWFya2VyMSIsImR0c05leHRBVTIiLCJtYXJrZXIyIiwiZHRzTmV4dEFVMyIsImxhc3RTdHVmZmluZyIsInBhY2tldExlbmd0aCIsInB0c0RUU0ZsYWciLCJlc2NyRmxhZyIsImVzUmF0ZUZsYWciLCJkc21GbGFnIiwiYWRkaXRpb25hbEZsYWciLCJjcmNGbGFnIiwiZXh0ZW5zaW9uRmxhZyIsInBlc0hlYWRlckxlbmd0aCIsIk4xIiwiZXNjciIsImV4IiwiZXNSYXRlIiwiYWRkaXRpb25hbENvcHlJbmZvIiwicGVzQ1JDIiwiYmFjayIsImZxIiwibGF5ZXIiLCJhYnNlbnQiLCJnZXRBdWRpb0NvbmZpZyIsInNlY3Rpb25JbmRpY2F0b3IiLCJjdXJyZW50TmV4dEluZGljYXRvciIsImNyYzMyIiwic2FtcGxlSW5kZXgiLCJleHRlbnNpb25TYW1wbGVJbmRleCIsInRlc3QiLCJpbnB1dGJ1ZmZlciIsIl9iYXNlVVJMIiwiX2xpc3QiLCJfdHMiLCJmcmFnTGVuZ3RoIiwiX2xhc3RnZXQiLCJfYXVkb2NsZWFyIiwiYXV0b2NsZWFyIiwiYmFzZVVSTCIsImRvd25sb2FkZWQiLCJkb3dubG9hZGluZyIsImRlbGV0ZUZyYWciLCJ0aW1lIiwicHVzaE0zVTgiLCJkZWxldGVwcmUiLCJuZXdmcmFnbGlzdCIsImZyYWciLCJ0c2xpc3QiLCJnZXRUc0xpc3QiLCJ0c25hbWUiLCJpc2xvYWRlZCIsImxvYWRpbmciLCJnZXRUc0J5TmFtZSIsImdldFRzIiwidGltZWxpc3QiLCJjbGVhckRvd25sb2FkZWQiLCJsIiwiRmV0Y2hMb2FkZXIiLCJMT0FERVJfRVZFTlRTIiwiUkVBRF9TVFJFQU0iLCJSRUFEX1RFWFQiLCJSRUFEX0pTT04iLCJSRUFEX0JVRkZFUiIsInN0YXR1cyIsIl9yZWFkZXIiLCJfY2FuY2VsZWQiLCJyZWFkdHlwZSIsIl9sb2FkZXJUYXNrTm8iLCJMQURFUl9TVEFSVCIsImxvYWQiLCJvcHRzIiwiX3RoaXMiLCJwYXJhbXMiLCJnZXRQYXJhbXMiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsIm9rIiwiX29uRmV0Y2hSZXNwb25zZSIsIkxPQURFUl9FUlJPUiIsImNhdGNoIiwidGFza25vIiwianNvbiIsIkxPQURFUl9DT01QTEVURSIsImFycmF5QnVmZmVyIiwiX29uUmVhZGVyIiwiZ2V0UmVhZGVyIiwicmVhZGVyIiwiY2FuY2VsIiwidmFsIiwiZG9uZSIsIkxPQURFUl9EQVRBTE9BREVEIiwib3B0aW9ucyIsImhlYWRlcnMiLCJIZWFkZXJzIiwibWV0aG9kIiwibW9kZSIsImNhY2hlIiwiY29uZmlnSGVhZGVycyIsImhhc093blByb3BlcnR5IiwiYXBwZW5kIiwib3B0SGVhZGVycyIsImNvcnMiLCJ3aXRoQ3JlZGVudGlhbHMiLCJjcmVkZW50aWFscyIsIk1wNFJlbXV4ZXIiLCJGbXA0IiwiQnVmZmVyIiwid3JpdGVVaW50MzIiLCJpbml0Qm94IiwiY29udGVudCIsIndyaXRlIiwiZXh0ZW5zaW9uIiwiZmxhZyIsImZ0eXAiLCJtb292IiwibXZoZCIsInRyYWsiLCJ2aWRlb1RyYWsiLCJhdWRpb1RyYWsiLCJtdmV4IiwiZm9yRWFjaCIsImJ5dGVzIiwidGtoZCIsIm1kaWEiLCJzYW1wbGVyYXRlIiwiZWR0cyIsIm1lZGlhVGltZSIsIm1kaGQiLCJoZGxyIiwibWluZiIsInZtaGQiLCJzbWhkIiwiZGluZiIsInN0YmwiLCJkcmVmIiwic3RzZCIsInN0dHMiLCJzdHNjIiwic3RzeiIsInN0Y28iLCJtcDRhIiwiYXZjMSIsImVzZHMiLCJjb25maWdsZW4iLCJoU3BhY2luZyIsInZTcGFjaW5nIiwiYnRydCIsInBhc3AiLCJ0cmFja0lEIiwibWVoZCIsInRyZXgiLCJtb29mIiwibWZoZCIsInRyYWYiLCJ0ZmhkIiwidGZkdCIsInNkdHAiLCJ0cnVuIiwic2R0cExlbmd0aCIsInNhbXBsZUNvdW50IiwiZmxhZ3MiLCJpc0xlYWRpbmciLCJkZXBlbmRzT24iLCJpc0RlcGVuZGVkT24iLCJoYXNSZWR1bmRhbmN5IiwiaXNOb25TeW5jIiwibnVtIiwibWRhdCIsIm1kYXRCb3giLCJjaGFyQ29kZUF0IiwiX2R0c0Jhc2UiLCJfaXNEdHNCYXNlSW5pdGVkIiwidmlkZW9BbGxEdXJhdGlvbiIsImF1ZGlvQWxsRHVyYXRpb24iLCJyZW11eCIsIlJFTVVYX01FVEFEQVRBIiwib25NZXRhRGF0YVJlYWR5IiwiX2R0c0Jhc2VJbml0ZWQiLCJjYWxjRHRzQmFzZSIsIl9yZW11eFZpZGVvIiwiX3JlbXV4QXVkaW8iLCJzZWVrIiwiaW5pdFNlZ21lbnQiLCJwcmVzb3VyY2VidWZmZXIiLCJJTklUX1NFR01FTlQiLCJhdWRpb0Jhc2UiLCJJbmZpbml0eSIsInZpZGVvQmFzZSIsIm1wNFNhbXBsZXMiLCJhdmNTYW1wbGUiLCJtZGF0U2FtcGxlIiwic2FtcGxlRHVyYXRpb24iLCJuZXh0RHRzIiwidmlkZW9NZXRhIiwibW9vZk1kYXQiLCJNRURJQV9TRUdNRU5UIiwiaXNGaXJzdER0c0luaXRlZCIsImF1ZGlvTWV0YSIsIm1wNFNhbXBsZSIsImluaXRTaWxlbnRBdWRpbyIsIkNvbnRleHQiLCJXT1JLRVJfQ09NTUFORFMiLCJzbmlmZmVyIiwiTWVkaWFJbmZvIiwiTWVkaWFTYW1wbGUiLCJNZWRpYVNlZ21lbnQiLCJNZWRpYVNlZ21lbnRMaXN0IiwiTXNlIiwiTW9iaWxlVmlkZW8iLCJSZXN1bHRDb25zdHJ1Y3RvciIsInRvdGFsTGVuZ3RoIiwiX2xlbiIsImFycmF5cyIsIl9rZXkiLCJfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uIiwiX2RpZEl0ZXJhdG9yRXJyb3IiLCJfaXRlcmF0b3JFcnJvciIsIl9pdGVyYXRvciIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiX3N0ZXAiLCJyZXR1cm4iLCJfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiIsIl9kaWRJdGVyYXRvckVycm9yMiIsIl9pdGVyYXRvckVycm9yMiIsIl9pdGVyYXRvcjIiLCJfc3RlcDIiLCJfYXJyIiwiX2NvbmNhdCIsIl9jb25jYXQyIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIm9iaiIsIl9fZXNNb2R1bGUiLCJ3ZWJwYWNrQm9vdHN0cmFwRnVuYyIsIm1vZHVsZXMiLCJpbnN0YWxsZWRNb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiYyIsImQiLCJnZXR0ZXIiLCJvIiwiY29uZmlndXJhYmxlIiwiZ2V0RGVmYXVsdCIsImdldE1vZHVsZUV4cG9ydHMiLCJvYmplY3QiLCJwcm9wZXJ0eSIsInAiLCJvZSIsImYiLCJzIiwiRU5UUllfTU9EVUxFIiwibW9kdWxlTmFtZVJlcUV4cCIsImRlcGVuZGVuY3lSZWdFeHAiLCJxdW90ZVJlZ0V4cCIsInJlcGxhY2UiLCJpc051bWVyaWMiLCJnZXRNb2R1bGVEZXBlbmRlbmNpZXMiLCJxdWV1ZU5hbWUiLCJyZXR2YWwiLCJmblN0cmluZyIsIndyYXBwZXJTaWduYXR1cmUiLCJ3ZWJwYWNrUmVxdWlyZU5hbWUiLCJyZSIsIlJlZ0V4cCIsImV4ZWMiLCJoYXNWYWx1ZXNJblF1ZXVlcyIsInF1ZXVlcyIsInJlZHVjZSIsImhhc1ZhbHVlcyIsImdldFJlcXVpcmVkTW9kdWxlcyIsIm1vZHVsZXNRdWV1ZSIsIm1haW4iLCJyZXF1aXJlZE1vZHVsZXMiLCJzZWVuTW9kdWxlcyIsInF1ZXVlIiwibW9kdWxlVG9DaGVjayIsIm5ld01vZHVsZXMiLCJuZXdNb2R1bGVzS2V5cyIsIl9fd2VicGFja19tb2R1bGVzX18iLCJhbGwiLCJlbnRyeU1vZHVsZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJqb2luIiwiYmxvYiIsIkJsb2IiLCJiYXJlIiwiVVJMIiwid2Via2l0VVJMIiwibW96VVJMIiwibXNVUkwiLCJ3b3JrZXJVcmwiLCJjcmVhdGVPYmplY3RVUkwiLCJ3b3JrZXIiLCJXb3JrZXIiLCJvYmplY3RVUkwiLCJSRU1VWF9FUlJPUiIsIk1TRV9FVkVOVFMiLCJTT1VSQ0VfVVBEQVRFX0VORCIsIkhMU19FVkVOVFMiLCJSRVRSWV9USU1FX0VYQ0VFREVEIiwiQUxMRVZFTlRTIiwiRmx2QWxsb3dlZEV2ZW50cyIsIkhsc0FsbG93ZWRFdmVudHMiLCJDT05URVhUX0NPTU9NQU5EUyIsIk9OIiwiT05DRSIsIk9GRiIsIkVNSVQiLCJERVNUUk9ZIiwiRElSRUNUX0VNSVRfRkxBRyIsImFsbG93ZWRFdmVudHMiLCJfZW1pdHRlciIsIl9pbnN0YW5jZU1hcCIsIl9jbHNNYXAiLCJfaW5pdGVkIiwiX2hvb2tzIiwidGFnIiwiaW5pdEluc3RhbmNlIiwibmV3SW5zdGFuY2UiLCJyZWdpc3RyeSIsImNscyIsImNoZWNrTWVzc2FnZU5hbWUiLCJfaXNNZXNzYWdlTmFtZVZhbGlkIiwic2VsZiIsImVuaGFuY2VkIiwib25jZUxpc3RlbmVycyIsIm1lc3NhZ2VOYW1lIiwiY2FsbGJhY2siLCJiZWZvcmVMaXN0IiwiZW1pdFRvIiwicmVtb3ZlTGlzdGVuZXJzIiwiaGFzT3duIiwiY2FsbGJhY2tzIiwiZGVzdHJveUluc3RhbmNlcyIsImxlIiwic2V0SW50MTYiLCJJbnQxNkFycmF5IiwiZGV2aWNlIiwib3MiLCJpc1BjIiwiaXNUYWJsZXQiLCJicm93c2VyIiwidWEiLCJyZWciLCJpZSIsImZpcmZveCIsImNocm9tZSIsIm9wZXJhIiwic2FmYXJpIiwiaXNXaW5kb3dzUGhvbmUiLCJpc1N5bWJpYW4iLCJpc0FuZHJvaWQiLCJpc0ZpcmVGb3giLCJpc1Bob25lIiwib3V0IiwiaW5wdXQiLCJmcm9tQ2hhckNvZGUiLCJfY2hlY2tDb250aW51YXRpb24iLCJ1Y3M0IiwiY2hlY2tMZW5ndGgiLCJBdWRpb0N0eCIsIkF1ZGlvQ29udGV4dCIsIndlYmtpdEF1ZGlvQ29udGV4dCIsImdhaW5Ob2RlIiwiY3JlYXRlR2FpbiIsImNvbm5lY3QiLCJkZXN0aW5hdGlvbiIsInByZWxvYWRUaW1lIiwiX2N1cnJlbnRCdWZmZXIiLCJfbmV4dEJ1ZmZlciIsIl9sYXN0cHRzIiwiX3ByZURlY29kZSIsIl9jdXJyZW50VGltZSIsIl9kZWNvZGluZyIsIl9wbGF5ZWQiLCJjdXJyZW50VGltZSIsImRlY29kZUF1ZGlvIiwic2V0QXVkaW9EYXRhIiwiZGVjb2RlQUFDIiwic2FtcGxlRGF0YSIsImdldEFBQ0RhdGEiLCJjb21iaWxlRGF0YSIsImRlY29kZUF1ZGlvRGF0YSIsImF1ZGlvU291cmNlIiwiY3JlYXRlQnVmZmVyU291cmNlIiwib25lbmRlZCIsIm9uU291cmNlRW5kZWQiLCJnZXRUaW1lQnVmZmVyIiwicGxheSIsInNldEF1ZGlvTWV0YURhdGEiLCJhZHRzIiwiZ2V0QWR0cyIsImsiLCJhYWNmcmFtZWxlbmd0aCIsIkFWUmVjb25jaWxlciIsInByb3BzIiwiYUN0eCIsInZDdHgiLCJ0aW1lb3V0SWQiLCJkb1JlY29uY2lsZSIsInZDdXJUaW1lIiwiYUN1clRpbWUiLCJwYXVzZSIsInNldFRpbWVvdXQiLCJIVE1MRWxlbWVudCIsIlZpZGVvQ3R4IiwidGlja2VyIiwiaGlzdG9yeVRpbWUiLCJyZWNvbmNpbGVyIiwiaGFuZGxlQXVkaW9Tb3VyY2VFbmQiLCJvbmNhbnBsYXkiLCJhcHBlbmRDaGlsZCIsImNhbnZhcyIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsIm5vdyIsIl9vblRpbWVyIiwiX2NsZWFuQnVmZmVyIiwiY2xlYW5CdWZmZXIiLCJvbkRlbXV4Q29tcGxldGUiLCJkZWNvZGVWaWRlbyIsInNldEF1ZGlvTWV0YSIsInNldFZpZGVvTWV0YSIsInNldFZpZGVvTWV0YURhdGEiLCJjdXN0b21FbGVtZW50cyIsImRlZmluZSIsIlNvdXJjZUJ1ZmZlciIsImN1cnJlbnRHb3AiLCJfbGFzdEdldCIsImZyYW1lIiwibmV4dEdvcCIsIl9nZXROZXh0IiwiZ29wIiwicmVtb3ZlIiwiVGlja2VyIiwiaW50ZXJ2YWwiLCJvblRpY2siLCJzZXRJbnRlcnZhbCIsIlJhZlRpY2tlciIsInByZXYiLCJ0aW1lcklkIiwiX3N1YlRpbWVySWQiLCJfdGlja0Z1bmMiLCJnZXRUaWNrRnVuYyIsInRpY2siLCJuZXh0VGljayIsInN0b3AiLCJjYW5jZWxGdW5jIiwiZ2V0Q2FuY2VsRnVuYyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwid2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJpc1N1cHBvcnRlZCIsIlRpbWVvdXRUaWNrZXIiLCJjbGVhckludGVydmFsIiwiZ2V0VGlja2VyIiwiVmlkZW9DYW52YXMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJvbkZpcnN0RnJhbWUiLCJyZWFkeVN0YXR1cyIsInBhdXNlZCIsImxhc3RQbGF5ZWQiLCJfZGVjb2RlckluaXRlZCIsIl9hdmNjcHVzaGVkIiwiX2RlY29kZWRGcmFtZXMiLCJfbGFzdFNhbXBsZUR0cyIsIl9iYXNlRHRzIiwiX2xhc3RSZW5kZXJUaW1lIiwiaW5pdFdhc21Xb3JrZXIiLCJ3YXNtd29ya2VyIiwicG9zdE1lc3NhZ2UiLCJtc2ciLCJhZGRFdmVudExpc3RlbmVyIiwiX29uRGVjb2RlZCIsInl1dkNhbnZhcyIsIllVVkNhbnZhcyIsIl9wcmVsb2FkIiwiX2FuYWx5c2VOYWwiLCJmcmFtZVRpbWVzIiwiZnJhbWVUaW1lIiwiY3VycmVudElkeCIsImxvZyIsInJlbmRlciIsIk1BWF9TVFJFQU1fQlVGRkVSX0xFTkdUSCIsIkRlY29kZXIiLCJpbml0ZWQiLCJpbmZvbGlzdCIsInBhcl9icm9hZHdheU9uQnJvYWR3YXlJbml0ZWQiLCJicm9hZHdheU9uQnJvYWR3YXlJbml0ZWQiLCJwYXJfYnJvYWR3YXlPblBpY3R1cmVEZWNvZGVkIiwiYnJvYWR3YXlPblBpY3R1cmVEZWNvZGVkIiwidG9VOEFycmF5IiwicHRyIiwiSEVBUFU4IiwiTW9kdWxlIiwiX2Jyb2Fkd2F5SW5pdCIsInN0cmVhbUJ1ZmZlciIsIl9icm9hZHdheUNyZWF0ZVN0cmVhbSIsImluZm9pZCIsImRhdGV0ZW1wIiwiZ2V0VGltZSIsIl9icm9hZHdheVBsYXlTdHJlYW0iLCJkZWNvZGVyIiwib25Qb3N0UnVuIiwiaW1wb3J0U2NyaXB0cyIsImFkZE9uUG9zdFJ1biIsImUiLCJzdHlsZSIsIl9pbml0Q29udGV4dEdMIiwiY29udGV4dEdMIiwiX2luaXRQcm9ncmFtIiwiX2luaXRCdWZmZXJzIiwiX2luaXRUZXh0dXJlcyIsImdsIiwidmFsaWRDb250ZXh0TmFtZXMiLCJuYW1lSW5kZXgiLCJjb250ZXh0TmFtZSIsImNvbnRleHRPcHRpb25zIiwiZ2V0Q29udGV4dCIsImdldFBhcmFtZXRlciIsInZlcnRleFNoYWRlclNjcmlwdCIsImZyYWdtZW50U2hhZGVyU2NyaXB0IiwiWVVWMlJHQiIsInZlcnRleFNoYWRlciIsImNyZWF0ZVNoYWRlciIsIlZFUlRFWF9TSEFERVIiLCJzaGFkZXJTb3VyY2UiLCJjb21waWxlU2hhZGVyIiwiZ2V0U2hhZGVyUGFyYW1ldGVyIiwiQ09NUElMRV9TVEFUVVMiLCJnZXRTaGFkZXJJbmZvTG9nIiwiZnJhZ21lbnRTaGFkZXIiLCJGUkFHTUVOVF9TSEFERVIiLCJjcmVhdGVQcm9ncmFtIiwiYXR0YWNoU2hhZGVyIiwibGlua1Byb2dyYW0iLCJnZXRQcm9ncmFtUGFyYW1ldGVyIiwiTElOS19TVEFUVVMiLCJnZXRQcm9ncmFtSW5mb0xvZyIsInVzZVByb2dyYW0iLCJZVVYyUkdCUmVmIiwiZ2V0VW5pZm9ybUxvY2F0aW9uIiwidW5pZm9ybU1hdHJpeDRmdiIsInNoYWRlclByb2dyYW0iLCJ2ZXJ0ZXhQb3NCdWZmZXIiLCJjcmVhdGVCdWZmZXIiLCJiaW5kQnVmZmVyIiwiQVJSQVlfQlVGRkVSIiwiYnVmZmVyRGF0YSIsIkZsb2F0MzJBcnJheSIsIlNUQVRJQ19EUkFXIiwidmVydGV4UG9zUmVmIiwiZ2V0QXR0cmliTG9jYXRpb24iLCJlbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSIsInZlcnRleEF0dHJpYlBvaW50ZXIiLCJGTE9BVCIsInRleHR1cmVQb3NCdWZmZXIiLCJ0ZXh0dXJlUG9zUmVmIiwidVRleHR1cmVQb3NCdWZmZXIiLCJ1VGV4dHVyZVBvc1JlZiIsInZUZXh0dXJlUG9zQnVmZmVyIiwidlRleHR1cmVQb3NSZWYiLCJ5VGV4dHVyZVJlZiIsIl9pbml0VGV4dHVyZSIsInlTYW1wbGVyUmVmIiwidW5pZm9ybTFpIiwidVRleHR1cmVSZWYiLCJ1U2FtcGxlclJlZiIsInZUZXh0dXJlUmVmIiwidlNhbXBsZXJSZWYiLCJ0ZXh0dXJlUmVmIiwic2FtcGxlclJlZiIsImNyZWF0ZVRleHR1cmUiLCJiaW5kVGV4dHVyZSIsIlRFWFRVUkVfMkQiLCJ0ZXhQYXJhbWV0ZXJpIiwiVEVYVFVSRV9NQUdfRklMVEVSIiwiTkVBUkVTVCIsIlRFWFRVUkVfTUlOX0ZJTFRFUiIsIlRFWFRVUkVfV1JBUF9TIiwiQ0xBTVBfVE9fRURHRSIsIlRFWFRVUkVfV1JBUF9UIiwiX2RyYXdQaWN0dXJlR0wiLCJuV2lkdGgiLCJ5bGVuIiwidXZsZW4iLCJyZW5kZXJEYXRhIiwieURhdGEiLCJ1RGF0YSIsInZEYXRhIiwieUFycmF5IiwidUFycmF5IiwidkFycmF5IiwiX2RyYXdQaWN0dXJlR0w0MjAiLCJfZHJhd1BpY3R1cmVHTDQyMiIsImRhdGFQZXJSb3ciLCJyb3dDbnQiLCJ2aWV3cG9ydCIsInRUb3AiLCJ0TGVmdCIsInRCb3R0b20iLCJ0UmlnaHQiLCJ0ZXh0dXJlUG9zVmFsdWVzIiwiRFlOQU1JQ19EUkFXIiwidW5pZm9ybTJmIiwiYWN0aXZlVGV4dHVyZSIsIlRFWFRVUkUwIiwidGV4SW1hZ2UyRCIsIkxVTUlOQU5DRSIsIlVOU0lHTkVEX0JZVEUiLCJkcmF3QXJyYXlzIiwiVFJJQU5HTEVfU1RSSVAiLCJ5RGF0YVBlclJvdyIsInlSb3dDbnQiLCJ1RGF0YVBlclJvdyIsInVSb3dDbnQiLCJ2RGF0YVBlclJvdyIsInZSb3dDbnQiLCJ1VGV4dHVyZVBvc1ZhbHVlcyIsInZUZXh0dXJlUG9zVmFsdWVzIiwiVEVYVFVSRTEiLCJURVhUVVJFMiIsIl9kcmF3UGljdHVyZVJHQiIsImlzT2JqZWN0RmlsbGVkIiwibWltZVR5cGUiLCJpc0NvbXBsZXRlIiwiaXNCYXNlSW5mb1JlYWR5IiwiaXNWaWRlb1JlYWR5IiwiaXNBdWRpb1JlYWR5IiwiX2RlZmF1bHQiLCJnZXREZWZhdWx0SW5mIiwiZW50cmllcyIsInYiLCJpc1JBUCIsIl90eXBlIiwiX2xhc3RBcHBlbmRMb2NhdGlvbiIsImlzRW1wdHkiLCJfc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUiLCJiZWdpbkR0cyIsImxhc3QiLCJtaWQiLCJsYm91bmQiLCJ1Ym91bmQiLCJpZHgiLCJsYXN0U2FtcGxlIiwiX3NlYXJjaE5lYXJlc3RTZWdtZW50QWZ0ZXIiLCJzZWdtZW50IiwibGFzdEFwcGVuZElkeCIsImluc2VydElkeCIsIm9yaWdpblN0YXJ0RHRzIiwiZ2V0TGFzdFNlZ21lbnRCZWZvcmUiLCJnZXRMYXN0U2FtcGxlQmVmb3JlIiwiZ2V0TGFzdFJBUEJlZm9yZSIsInNlZ21lbnRJZHgiLCJyYW5kb21BY2Nlc3NQb2ludHMiLCJzdGFydER0cyIsImVuZER0cyIsInN0YXJ0UHRzIiwiZW5kUHRzIiwib3JpZ2luRW5kRHRzIiwiYWRkUkFQIiwiTVNFIiwiY29udGFpbmVyIiwibWVkaWFTb3VyY2UiLCJzb3VyY2VCdWZmZXJzIiwiTWVkaWFTb3VyY2UiLCJvblNvdXJjZU9wZW4iLCJvblRpbWVVcGRhdGUiLCJvbldhaXRpbmciLCJhZGRTb3VyY2VCdWZmZXJzIiwib25VcGRhdGVFbmQiLCJkb0FwcGVuZCIsInJlYWR5U3RhdGUiLCJhZGQiLCJkdXIiLCJtaW1lIiwic291cmNlQnVmZmVyIiwiYWRkU291cmNlQnVmZmVyIiwidXBkYXRpbmciLCJhcHBlbmRCdWZmZXIiLCJlbmRPZlN0cmVhbSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW1vdmVTb3VyY2VCdWZmZXIiLCJyZWFkQXNJbnQiLCJ0ZW1wIiwicGFkU3RhcnQ0SGV4IiwiaGV4TnVtIiwiaGV4U3RyIiwicGFkU3RhcnQiLCJsb29wIiwic2lnbiIsInJlcyIsInJlYWRVaW50NjQiLCJyZWFkSW50MTYiLCJyZWFkSW50MzIiLCJUYWciLCJMb2dnZXIiLCJGbHZDb250cm9sbGVyIiwicGxheWVyIiwiX3BsYXllciIsImluaXRTZWdtZW50QXJyaXZlZCIsImluaXRMaXN0ZW5lcnMiLCJfaGFuZGxlTG9hZGVyRGF0YUxvYWRlZCIsIl9oYW5kbGVOZXR3b3JrRXJyb3IiLCJfaGFuZGxlTWVkaWFJbmZvIiwiX2hhbmRsZU1ldGFkYXRhUGFyc2VkIiwiX2hhbmRsZURlbXV4Q29tcGxldGUiLCJfaGFuZGxlRGVtdXhFcnJvciIsIl9zZXRNZXRhVG9BdWRpbyIsIl9zZXRNZXRhVG9WaWRlbyIsIl9oYW5kbGVBcHBlbmRJbml0U2VnbWVudCIsIlBsYXllciIsIkVycm9ycyIsImxvYWREYXRhIiwibG9hZGVyIiwicmVzb2x2ZVZpZGVvR09QIiwiZmlyc3RJZnJhbWVJZHgiLCJsYXN0SWZyYW1lSWR4IiwidGVtcFNhbXBsZXMiLCJyZXN0IiwiZmx2QWxsb3dlZEV2ZW50cyIsIkZsdlBsYXllciIsImluaXRFdmVudHMiLCJpbml0Rmx2IiwiZmx2IiwiaW5pdEZsdkV2ZW50cyIsInV0aWwiLCJhZGRDbGFzcyIsInJvb3QiLCJmaW5kRG9tIiwibGl2ZSIsImNyZWF0ZURvbSIsImNvbnRyb2xzIiwidGltZXIiLCJnZXRCdWZmZXJlZFJhbmdlIiwicmFuZ2UiLCJGTFYiLCJfaGFzU3RhcnQiLCJfZGVzdHJveSIsIm1zZSIsImN1cnJlbnRTcmMiXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsSUFBSUEsSUFBSSxPQUFPQyxPQUFQLEtBQW1CLFFBQW5CLEdBQThCQSxPQUE5QixHQUF3QyxJQUFoRDtBQUNBLElBQUlDLGVBQWVGLEtBQUssT0FBT0EsRUFBRUcsS0FBVCxLQUFtQixVQUF4QixHQUNmSCxFQUFFRyxLQURh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SUFBTCxDQUFVLE9BQVYsRUFBbUIsTUFBTTtBQUN2QixhQUFLZ0QsS0FBTCxDQUFXNFosR0FBWDtBQUNELE9BRkQ7QUFHQSxXQUFLNWMsSUFBTCxDQUFVLFNBQVYsRUFBcUIsTUFBTTtBQUN6QixhQUFLMjdCLElBQUw7QUFDRCxPQUZEO0FBR0QsS0FSRCxNQVFPO0FBQ0wsV0FBSzM0QixLQUFMLENBQVc0WixHQUFYO0FBQ0Q7QUFDRCxTQUFLNWMsSUFBTCxDQUFVLFNBQVYsRUFBcUIsTUFBTTtBQUN6QixXQUFLODZCLFdBQUwsR0FBbUIsQ0FBbkI7QUFDRCxLQUZEO0FBR0Q7QUF0SDRCOztBQXlIL0I3K0IsT0FBT0MsT0FBUCxHQUFpQncwQyxTQUFqQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlIQSxhQUFhLG1DQUFtQyxFQUFFLEkiLCJmaWxlIjoibW9iaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFIgPSB0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgPyBSZWZsZWN0IDogbnVsbFxudmFyIFJlZmxlY3RBcHBseSA9IFIgJiYgdHlwZW9mIFIuYXBwbHkgPT09ICdmdW5jdGlvbidcbiAgPyBSLmFwcGx5XG4gIDogZnVuY3Rpb24gUmVmbGVjdEFwcGx5KHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwodGFyZ2V0LCByZWNlaXZlciwgYXJncyk7XG4gIH1cblxudmFyIFJlZmxlY3RPd25LZXlzXG5pZiAoUiAmJiB0eXBlb2YgUi5vd25LZXlzID09PSAnZnVuY3Rpb24nKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gUi5vd25LZXlzXG59IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KVxuICAgICAgLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkpO1xuICB9O1xufSBlbHNlIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gUHJvY2Vzc0VtaXRXYXJuaW5nKHdhcm5pbmcpIHtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSBjb25zb2xlLndhcm4od2FybmluZyk7XG59XG5cbnZhciBOdW1iZXJJc05hTiA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiBOdW1iZXJJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHNDb3VudCA9IDA7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbnZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudEVtaXR0ZXIsICdkZWZhdWx0TWF4TGlzdGVuZXJzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyB8fCBhcmcgPCAwIHx8IE51bWJlcklzTmFOKGFyZykpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIGFyZyArICcuJyk7XG4gICAgfVxuICAgIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBhcmc7XG4gIH1cbn0pO1xuXG5FdmVudEVtaXR0ZXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gIGlmICh0aGlzLl9ldmVudHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgTnVtYmVySXNOYU4obikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBuICsgJy4nKTtcbiAgfVxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uICRnZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuICRnZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICB2YXIgZG9FcnJvciA9ICh0eXBlID09PSAnZXJyb3InKTtcblxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpXG4gICAgZG9FcnJvciA9IChkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PT0gdW5kZWZpbmVkKTtcbiAgZWxzZSBpZiAoIWRvRXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICB2YXIgZXI7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMClcbiAgICAgIGVyID0gYXJnc1swXTtcbiAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgLy8gTm90ZTogVGhlIGNvbW1lbnRzIG9uIHRoZSBgdGhyb3dgIGxpbmVzIGFyZSBpbnRlbnRpb25hbCwgdGhleSBzaG93XG4gICAgICAvLyB1cCBpbiBOb2RlJ3Mgb3V0cHV0IGlmIHRoaXMgcmVzdWx0cyBpbiBhbiB1bmhhbmRsZWQgZXhjZXB0aW9uLlxuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgfVxuICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmhhbmRsZWQgZXJyb3IuJyArIChlciA/ICcgKCcgKyBlci5tZXNzYWdlICsgJyknIDogJycpKTtcbiAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgIHRocm93IGVycjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgfVxuXG4gIHZhciBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIFJlZmxlY3RBcHBseShoYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgUmVmbGVjdEFwcGx5KGxpc3RlbmVyc1tpXSwgdGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldC5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA/IGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gICAgICAvLyBSZS1hc3NpZ24gYGV2ZW50c2AgYmVjYXVzZSBhIG5ld0xpc3RlbmVyIGhhbmRsZXIgY291bGQgaGF2ZSBjYXVzZWQgdGhlXG4gICAgICAvLyB0aGlzLl9ldmVudHMgdG8gYmUgYXNzaWduZWQgdG8gYSBuZXcgb2JqZWN0XG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPVxuICAgICAgICBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOiBbZXhpc3RpbmcsIGxpc3RlbmVyXTtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB9IGVsc2UgaWYgKHByZXBlbmQpIHtcbiAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdGluZy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICAgIG0gPSAkZ2V0TWF4TGlzdGVuZXJzKHRhcmdldCk7XG4gICAgaWYgKG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0gJiYgIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgIC8vIE5vIGVycm9yIGNvZGUgZm9yIHRoaXMgc2luY2UgaXQgaXMgYSBXYXJuaW5nXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIHZhciB3ID0gbmV3IEVycm9yKCdQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5sZW5ndGggKyAnICcgKyBTdHJpbmcodHlwZSkgKyAnIGxpc3RlbmVycyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luY3JlYXNlIGxpbWl0Jyk7XG4gICAgICB3Lm5hbWUgPSAnTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nJztcbiAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgIHcudHlwZSA9IHR5cGU7XG4gICAgICB3LmNvdW50ID0gZXhpc3RpbmcubGVuZ3RoO1xuICAgICAgUHJvY2Vzc0VtaXRXYXJuaW5nKHcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcblxuZnVuY3Rpb24gb25jZVdyYXBwZXIoKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgaWYgKCF0aGlzLmZpcmVkKSB7XG4gICAgdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLCB0aGlzLndyYXBGbik7XG4gICAgdGhpcy5maXJlZCA9IHRydWU7XG4gICAgUmVmbGVjdEFwcGx5KHRoaXMubGlzdGVuZXIsIHRoaXMudGFyZ2V0LCBhcmdzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfb25jZVdyYXAodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgc3RhdGUgPSB7IGZpcmVkOiBmYWxzZSwgd3JhcEZuOiB1bmRlZmluZWQsIHRhcmdldDogdGFyZ2V0LCB0eXBlOiB0eXBlLCBsaXN0ZW5lcjogbGlzdGVuZXIgfTtcbiAgdmFyIHdyYXBwZWQgPSBvbmNlV3JhcHBlci5iaW5kKHN0YXRlKTtcbiAgd3JhcHBlZC5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICBzdGF0ZS53cmFwRm4gPSB3cmFwcGVkO1xuICByZXR1cm4gd3JhcHBlZDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cbiAgdGhpcy5vbih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRPbmNlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGxpc3QgPSBldmVudHNbdHlwZV07XG4gICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8IGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0Lmxpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgICAgIGZvciAoaSA9IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHwgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsTGlzdGVuZXIgPSBsaXN0W2ldLmxpc3RlbmVyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09IDApXG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcGxpY2VPbmUobGlzdCwgcG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKVxuICAgICAgICAgIGV2ZW50c1t0eXBlXSA9IGxpc3RbMF07XG5cbiAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBvcmlnaW5hbExpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cywgaTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRzW3R5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV07XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuZnVuY3Rpb24gX2xpc3RlbmVycyh0YXJnZXQsIHR5cGUsIHVud3JhcCkge1xuICB2YXIgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgaWYgKGV2bGlzdGVuZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiB1bndyYXAgPyBbZXZsaXN0ZW5lci5saXN0ZW5lciB8fCBldmxpc3RlbmVyXSA6IFtldmxpc3RlbmVyXTtcblxuICByZXR1cm4gdW53cmFwID9cbiAgICB1bndyYXBMaXN0ZW5lcnMoZXZsaXN0ZW5lcikgOiBhcnJheUNsb25lKGV2bGlzdGVuZXIsIGV2bGlzdGVuZXIubGVuZ3RoKTtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCB0cnVlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmF3TGlzdGVuZXJzID0gZnVuY3Rpb24gcmF3TGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5saXN0ZW5lckNvdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGlzdGVuZXJDb3VudC5jYWxsKGVtaXR0ZXIsIHR5cGUpO1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBsaXN0ZW5lckNvdW50O1xuZnVuY3Rpb24gbGlzdGVuZXJDb3VudCh0eXBlKSB7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHJldHVybiB0aGlzLl9ldmVudHNDb3VudCA+IDAgPyBSZWZsZWN0T3duS2V5cyh0aGlzLl9ldmVudHMpIDogW107XG59O1xuXG5mdW5jdGlvbiBhcnJheUNsb25lKGFyciwgbikge1xuICB2YXIgY29weSA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpXG4gICAgY29weVtpXSA9IGFycltpXTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKDsgaW5kZXggKyAxIDwgbGlzdC5sZW5ndGg7IGluZGV4KyspXG4gICAgbGlzdFtpbmRleF0gPSBsaXN0W2luZGV4ICsgMV07XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhhcnIpIHtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyArK2kpIHtcbiAgICByZXRbaV0gPSBhcnJbaV0ubGlzdGVuZXIgfHwgYXJyW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgVHJhY2s6IHJlcXVpcmUoJy4vc3JjL3RyYWNrJykuZGVmYXVsdCxcbiAgVHJhY2tzOiByZXF1aXJlKCcuL3NyYy90cmFjaycpLlRyYWNrcyxcbiAgQXVkaW9UcmFjazogcmVxdWlyZSgnLi9zcmMvdHJhY2snKS5BdWRpb1RyYWNrLFxuICBWaWRlb1RyYWNrOiByZXF1aXJlKCcuL3NyYy90cmFjaycpLlZpZGVvVHJhY2ssXG5cbiAgWGdCdWZmZXI6IHJlcXVpcmUoJy4vc3JjL2J1ZmZlcicpLlhnQnVmZmVyLFxuICBSZW11eEJ1ZmZlcjogcmVxdWlyZSgnLi9zcmMvYnVmZmVyJykuUmVtdXhCdWZmZXIsXG5cbiAgUHJlU291cmNlOiByZXF1aXJlKCcuL3NyYy9wcmVzb3VjZScpLmRlZmF1bHRcbn07XG4iLCJleHBvcnQgY2xhc3MgWGdCdWZmZXIge1xuICAvKipcbiAgICogQSBidWZmZXIgdG8gc3RvcmUgbG9hZGVkIGRhdGEuXG4gICAqXG4gICAqIEBjbGFzcyBMb2FkZXJCdWZmZXJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aCAtIE9wdGlvbmFsIHRoZSBidWZmZXIgc2l6ZVxuICAgKi9cbiAgY29uc3RydWN0b3IgKGxlbmd0aCkge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoIHx8IDBcbiAgICB0aGlzLmhpc3RvcnlMZW4gPSBsZW5ndGggfHwgMFxuICAgIHRoaXMuYXJyYXkgPSBbXVxuICAgIHRoaXMub2Zmc2V0ID0gMFxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBmdW5jdGlvbiB0byBwdXNoIGRhdGEuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBkYXRhIC0gVGhlIGRhdGEgdG8gcHVzaCBpbnRvIHRoZSBidWZmZXJcbiAgICovXG4gIHB1c2ggKGRhdGEpIHtcbiAgICB0aGlzLmFycmF5LnB1c2goZGF0YSlcbiAgICB0aGlzLmxlbmd0aCArPSBkYXRhLmJ5dGVMZW5ndGhcbiAgICB0aGlzLmhpc3RvcnlMZW4gKz0gZGF0YS5ieXRlTGVuZ3RoXG4gIH1cblxuICAvKipcbiAgICogVGhlIGZ1bmN0aW9uIHRvIHNoaWZ0IGRhdGEuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSBUaGUgc2l6ZSBvZiBzaGlmdC5cbiAgICovXG4gIHNoaWZ0IChsZW5ndGgpIHtcbiAgICBpZiAodGhpcy5hcnJheS5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoMClcbiAgICB9XG5cbiAgICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zaGlmdEJ1ZmZlcigpXG4gICAgfVxuICAgIGlmICgodGhpcy5vZmZzZXQgKyBsZW5ndGgpID09PSB0aGlzLmFycmF5WzBdLmxlbmd0aCkge1xuICAgICAgbGV0IHJldCA9IHRoaXMuYXJyYXlbMF0uc2xpY2UodGhpcy5vZmZzZXQsIHRoaXMub2Zmc2V0ICsgbGVuZ3RoKVxuICAgICAgdGhpcy5vZmZzZXQgPSAwXG4gICAgICB0aGlzLmFycmF5LnNoaWZ0KClcbiAgICAgIHRoaXMubGVuZ3RoIC09IGxlbmd0aFxuICAgICAgcmV0dXJuIHJldFxuICAgIH1cblxuICAgIGlmICgodGhpcy5vZmZzZXQgKyBsZW5ndGgpIDwgdGhpcy5hcnJheVswXS5sZW5ndGgpIHtcbiAgICAgIGxldCByZXQgPSB0aGlzLmFycmF5WzBdLnNsaWNlKHRoaXMub2Zmc2V0LCB0aGlzLm9mZnNldCArIGxlbmd0aClcbiAgICAgIHRoaXMub2Zmc2V0ICs9IGxlbmd0aFxuICAgICAgdGhpcy5sZW5ndGggLT0gbGVuZ3RoXG4gICAgICByZXR1cm4gcmV0XG4gICAgfVxuXG4gICAgbGV0IHJldCA9IG5ldyBVaW50OEFycmF5KGxlbmd0aClcbiAgICBsZXQgdG1wb2ZmID0gMFxuICAgIHdoaWxlICh0aGlzLmFycmF5Lmxlbmd0aCA+IDAgJiYgbGVuZ3RoID4gMCkge1xuICAgICAgaWYgKCh0aGlzLm9mZnNldCArIGxlbmd0aCkgPCB0aGlzLmFycmF5WzBdLmxlbmd0aCkge1xuICAgICAgICBsZXQgdG1wID0gdGhpcy5hcnJheVswXS5zbGljZSh0aGlzLm9mZnNldCwgdGhpcy5vZmZzZXQgKyBsZW5ndGgpXG4gICAgICAgIHJldC5zZXQodG1wLCB0bXBvZmYpXG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IGxlbmd0aFxuICAgICAgICB0aGlzLmxlbmd0aCAtPSBsZW5ndGhcbiAgICAgICAgbGVuZ3RoID0gMFxuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHRlbXBsZW5ndGggPSB0aGlzLmFycmF5WzBdLmxlbmd0aCAtIHRoaXMub2Zmc2V0XG4gICAgICAgIHJldC5zZXQodGhpcy5hcnJheVswXS5zbGljZSh0aGlzLm9mZnNldCwgdGhpcy5hcnJheVswXS5sZW5ndGgpLCB0bXBvZmYpXG4gICAgICAgIHRoaXMuYXJyYXkuc2hpZnQoKVxuICAgICAgICB0aGlzLm9mZnNldCA9IDBcbiAgICAgICAgdG1wb2ZmICs9IHRlbXBsZW5ndGhcbiAgICAgICAgdGhpcy5sZW5ndGggLT0gdGVtcGxlbmd0aFxuICAgICAgICBsZW5ndGggLT0gdGVtcGxlbmd0aFxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0XG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gdG8gY2xlYXIgdGhlIGJ1ZmZlci5cbiAgICovXG4gIGNsZWFyICgpIHtcbiAgICB0aGlzLmFycmF5ID0gW11cbiAgICB0aGlzLmxlbmd0aCA9IDBcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuY2xlYXIoKVxuICAgIHRoaXMuaGlzdG9yeUxlbiA9IDBcbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0byBzaGlmdCBvbmUgdW5pdDhBcnJheS5cbiAgICovXG4gIF9zaGlmdEJ1ZmZlciAoKSB7XG4gICAgdGhpcy5sZW5ndGggLT0gdGhpcy5hcnJheVswXS5sZW5ndGhcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgICByZXR1cm4gdGhpcy5hcnJheS5zaGlmdCgpXG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCB1aW50OCBkYXRhIHRvIG51bWJlci5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IC0gdGhlIHN0YXJ0IHBvc3Rpb24uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSB0aGUgbGVuZ3RoIG9mIGRhdGEuXG4gICAqL1xuICB0b0ludCAoc3RhcnQsIGxlbmd0aCkge1xuICAgIGxldCByZXRJbnQgPSAwXG4gICAgbGV0IGkgPSB0aGlzLm9mZnNldCArIHN0YXJ0XG4gICAgd2hpbGUgKGkgPCB0aGlzLm9mZnNldCArIGxlbmd0aCArIHN0YXJ0KSB7XG4gICAgICBpZiAoaSA8IHRoaXMuYXJyYXlbMF0ubGVuZ3RoKSB7XG4gICAgICAgIHJldEludCA9IHJldEludCAqIDI1NiArIHRoaXMuYXJyYXlbMF1baV1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hcnJheVsxXSkge1xuICAgICAgICByZXRJbnQgPSByZXRJbnQgKiAyNTYgKyB0aGlzLmFycmF5WzFdW2kgLSB0aGlzLmFycmF5WzBdLmxlbmd0aF1cbiAgICAgIH1cblxuICAgICAgaSsrXG4gICAgfVxuICAgIHJldHVybiByZXRJbnRcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVtdXhCdWZmZXIge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy52aWRlbyA9IFtdXG4gICAgdGhpcy5hdWRpbyA9IFtdXG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLnZpZGVvID0gW11cbiAgICB0aGlzLmF1ZGlvID0gW11cbiAgfVxufVxuIiwiY2xhc3MgU291cmNlIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMubWltZXR5cGUgPSAnJztcbiAgICB0aGlzLmluaXQgPSBudWxsO1xuICAgIHRoaXMuZGF0YSA9IFtdO1xuICB9XG59XG5cbmNsYXNzIFByZVNvdXJjZSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLnNvdXJjZXMgPSB7fTtcbiAgfVxuXG4gIGdldFNvdXJjZSAoc291cmNlKSB7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlc1tzb3VyY2VdO1xuICB9XG5cbiAgY3JlYXRlU291cmNlIChuYW1lKSB7XG4gICAgdGhpcy5zb3VyY2VzW25hbWVdID0gbmV3IFNvdXJjZSgpO1xuICAgIHJldHVybiB0aGlzLnNvdXJjZXNbbmFtZV07XG4gIH1cblxuICBjbGVhciAoKSB7XG4gICAgdGhpcy5zb3VyY2VzID0ge307XG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLnNvdXJjZXMgPSB7fTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcmVTb3VyY2U7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUcmFjayB7XG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IuXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5pZCA9IC0xXG4gICAgdGhpcy5zZXF1ZW5jZU51bWJlciA9IDBcbiAgICB0aGlzLnNhbXBsZXMgPSBbXVxuICAgIHRoaXMuZHJvcHBlZFNhbXBsZXMgPSBbXVxuICAgIHRoaXMubGVuZ3RoID0gMFxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSB0cmFjay5cbiAgICovXG4gIHJlc2V0ICgpIHtcbiAgICB0aGlzLnNlcXVlbmNlTnVtYmVyID0gMFxuICAgIHRoaXMuc2FtcGxlcyA9IFtdXG4gICAgdGhpcy5sZW5ndGggPSAwXG4gIH1cbiAgLyoqXG4gICAqIGRlc3Ryb3kgdGhlIHRyYWNrLlxuICAgKi9cbiAgZGlzdHJveSAoKSB7XG4gICAgdGhpcy5yZXNldCgpXG4gICAgdGhpcy5pZCA9IC0xXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEF1ZGlvVHJhY2sgZXh0ZW5kcyBUcmFjayB7XG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIGF1ZGlvIHRyYWNrLlxuICAgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLlRBRyA9ICdBdWRpb1RyYWNrJ1xuICAgIHRoaXMudHlwZSA9ICdhdWRpbydcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVmlkZW9UcmFjayBleHRlbmRzIFRyYWNrIHtcbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdmlkZW8gdHJhY2suXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuVEFHID0gJ1ZpZGVvVHJhY2snXG4gICAgdGhpcy50eXBlID0gJ3ZpZGVvJ1xuICAgIHRoaXMuZHJvcHBlZCA9IDBcbiAgfVxuICAvKipcbiAgICogcmVzZXQgdGhlIHZpZGVvIHRyYWNrLlxuICAgKi9cbiAgcmVzZXQgKCkge1xuICAgIHRoaXMuc2VxdWVuY2VOdW1iZXIgPSAwXG4gICAgdGhpcy5zYW1wbGVzID0gW11cbiAgICB0aGlzLmxlbmd0aCA9IDBcbiAgICB0aGlzLmRyb3BwZWQgPSAwXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRyYWNrcyB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLmF1ZGlvVHJhY2sgPSBudWxsXG4gICAgdGhpcy52aWRlb1RyYWNrID0gbnVsbFxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgTmFsdW5pdDogcmVxdWlyZSgnLi9zcmMvaDI2NC9uYWx1bml0JykuZGVmYXVsdCxcbiAgU3BzUGFyc2VyOiByZXF1aXJlKCcuL3NyYy9oMjY0L25hbHVuaXQvc3BzJykuZGVmYXVsdCxcblxuICBDb21wYXRpYmlsaXR5OiByZXF1aXJlKCcuL3NyYy9jb21wYXRpYmlsaXR5JykuZGVmYXVsdFxufTtcbiIsIlxuY2xhc3MgQUFDIHtcblxuICBzdGF0aWMgZ2V0U2lsZW50RnJhbWUoY29kZWMsIGNoYW5uZWxDb3VudCkge1xuICAgIGlmIChjb2RlYyA9PT0gJ21wNGEuNDAuMicpIHtcbiAgICAgIC8vIGhhbmRsZSBMQy1BQUNcbiAgICAgIGlmIChjaGFubmVsQ291bnQgPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDAwLCAweGM4LCAweDAwLCAweDgwLCAweDIzLCAweDgwXSk7XG4gICAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gMikge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MjEsIDB4MDAsIDB4NDksIDB4OTAsIDB4MDIsIDB4MTksIDB4MDAsIDB4MjMsIDB4ODBdKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSAzKSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4ZV0pO1xuICAgICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDAwLCAweGM4LCAweDAwLCAweDgwLCAweDIwLCAweDg0LCAweDAxLCAweDI2LCAweDQwLCAweDA4LCAweDY0LCAweDAwLCAweDgwLCAweDJjLCAweDgwLCAweDA4LCAweDAyLCAweDM4XSk7XG4gICAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gNSkge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4ODIsIDB4MzAsIDB4MDQsIDB4OTksIDB4MDAsIDB4MjEsIDB4OTAsIDB4MDIsIDB4MzhdKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSA2KSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4MiwgMHgzMCwgMHgwNCwgMHg5OSwgMHgwMCwgMHgyMSwgMHg5MCwgMHgwMiwgMHgwMCwgMHhiMiwgMHgwMCwgMHgyMCwgMHgwOCwgMHhlMF0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBoYW5kbGUgSEUtQUFDIChtcDRhLjQwLjUgLyBtcDRhLjQwLjI5KVxuICAgICAgaWYgKGNoYW5uZWxDb3VudCA9PT0gMSkge1xuICAgICAgICAvLyBmZm1wZWcgLXkgLWYgbGF2ZmkgLWkgXCJhZXZhbHNyYz0wOmQ9MC4wNVwiIC1jOmEgbGliZmRrX2FhYyAtcHJvZmlsZTphIGFhY19oZSAtYjphIDRrIG91dHB1dC5hYWMgJiYgaGV4ZHVtcCAtdiAtZSAnMTYvMSBcIjB4JXgsXCIgXCJcXG5cIicgLXYgb3V0cHV0LmFhY1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MSwgMHg0MCwgMHgyMiwgMHg4MCwgMHhhMywgMHg0ZSwgMHhlNiwgMHg4MCwgMHhiYSwgMHg4LCAweDAsIDB4MCwgMHgwLCAweDFjLCAweDYsIDB4ZjEsIDB4YzEsIDB4YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1ZV0pO1xuICAgICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDIpIHtcbiAgICAgICAgLy8gZmZtcGVnIC15IC1mIGxhdmZpIC1pIFwiYWV2YWxzcmM9MHwwOmQ9MC4wNVwiIC1jOmEgbGliZmRrX2FhYyAtcHJvZmlsZTphIGFhY19oZV92MiAtYjphIDRrIG91dHB1dC5hYWMgJiYgaGV4ZHVtcCAtdiAtZSAnMTYvMSBcIjB4JXgsXCIgXCJcXG5cIicgLXYgb3V0cHV0LmFhY1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MSwgMHg0MCwgMHgyMiwgMHg4MCwgMHhhMywgMHg1ZSwgMHhlNiwgMHg4MCwgMHhiYSwgMHg4LCAweDAsIDB4MCwgMHgwLCAweDAsIDB4OTUsIDB4MCwgMHg2LCAweGYxLCAweGExLCAweGEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWVdKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSAzKSB7XG4gICAgICAgIC8vIGZmbXBlZyAteSAtZiBsYXZmaSAtaSBcImFldmFsc3JjPTB8MHwwOmQ9MC4wNVwiIC1jOmEgbGliZmRrX2FhYyAtcHJvZmlsZTphIGFhY19oZV92MiAtYjphIDRrIG91dHB1dC5hYWMgJiYgaGV4ZHVtcCAtdiAtZSAnMTYvMSBcIjB4JXgsXCIgXCJcXG5cIicgLXYgb3V0cHV0LmFhY1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MSwgMHg0MCwgMHgyMiwgMHg4MCwgMHhhMywgMHg1ZSwgMHhlNiwgMHg4MCwgMHhiYSwgMHg4LCAweDAsIDB4MCwgMHgwLCAweDAsIDB4OTUsIDB4MCwgMHg2LCAweGYxLCAweGExLCAweGEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWVdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBQUM7XG4iLCJpbXBvcnQge0VWRU5UU30gZnJvbSAneGdwbGF5ZXItdXRpbHMnXG5pbXBvcnQgQUFDIGZyb20gJy4vYWFjL2FhYy1oZWxwZXInXG5cbmNvbnN0IHtSRU1VWF9FVkVOVFN9ID0gRVZFTlRTXG5cbmNsYXNzIENvbXBhdGliaWxpdHkge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5uZXh0QXVkaW9EdHMgPSAwIC8vIOaooeaLn+S4i+S4gOautemfs+mikeaVsOaNrueahGR0c1xuICAgIHRoaXMubmV4dFZpZGVvRHRzID0gMCAvLyDmqKHmi5/kuIvkuIDmrrXop4bpopHmlbDmja7nmoRkdHNcblxuICAgIHRoaXMubGFzdEF1ZGlvU2FtcGxlc0xlbiA9IDAgLy8g5LiK5LiA5q616Z+z6aKR5pWw5o2u55qE6ZW/5bqmXG4gICAgdGhpcy5sYXN0VmlkZW9TYW1wbGVzTGVuID0gMCAvLyDkuIrkuIDmrrXop4bpopHmlbDmja7nmoTplb/luqZcblxuICAgIHRoaXMubGFzdFZpZGVvRHRzID0gdW5kZWZpbmVkIC8vIOS4iuS4gOautemfs+mikeaVsOaNrueahOmVv+W6plxuICAgIHRoaXMubGFzdEF1ZGlvRHRzID0gdW5kZWZpbmVkIC8vIOS4iuS4gOauteinhumikeaVsOaNrueahOmVv+W6plxuXG4gICAgdGhpcy5hbGxBdWRpb1NhbXBsZXNDb3VudCA9IDAgLy8g6Z+z6aKR5oC75pWw5o2u6YePKOWOn+Wni+W4pylcbiAgICB0aGlzLmFsbFZpZGVvU2FtcGxlc0NvdW50ID0gMCAvLyDop4bpopHmgLvmlbDmja7ph48o5Y6f5aeL5binKVxuXG4gICAgdGhpcy5fZmlyc3RBdWRpb1NhbXBsZSA9IG51bGxcbiAgICB0aGlzLl9maXJzdFZpZGVvU2FtcGxlID0gbnVsbFxuXG4gICAgdGhpcy5maWxsZWRBdWRpb1NhbXBsZXMgPSBbXSAvLyDooaXlhYXpn7PpopHluKfvvIjvvIlcbiAgICB0aGlzLmZpbGxlZFZpZGVvU2FtcGxlcyA9IFtdIC8vIOihpeWFheinhumikeW4p++8iO+8iVxuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgdGhpcy5iZWZvcmUoUkVNVVhfRVZFTlRTLlJFTVVYX01FRElBLCB0aGlzLmRvRml4LmJpbmQodGhpcykpXG4gIH1cblxuICByZXNldCAoKSB7XG4gICAgdGhpcy5uZXh0QXVkaW9EdHMgPSAwIC8vIOaooeaLn+S4i+S4gOautemfs+mikeaVsOaNrueahGR0c1xuICAgIHRoaXMubmV4dFZpZGVvRHRzID0gMCAvLyDmqKHmi5/kuIvkuIDmrrXop4bpopHmlbDmja7nmoRkdHNcblxuICAgIHRoaXMubGFzdEF1ZGlvU2FtcGxlc0xlbiA9IDAgLy8g5LiK5LiA5q616Z+z6aKR5pWw5o2u55qE6ZW/5bqmXG4gICAgdGhpcy5sYXN0VmlkZW9TYW1wbGVzTGVuID0gMCAvLyDkuIrkuIDmrrXop4bpopHmlbDmja7nmoTplb/luqZcblxuICAgIHRoaXMubGFzdFZpZGVvRHRzID0gdW5kZWZpbmVkIC8vIOS4iuS4gOautemfs+mikeaVsOaNrueahOmVv+W6plxuICAgIHRoaXMubGFzdEF1ZGlvRHRzID0gdW5kZWZpbmVkIC8vIOS4iuS4gOauteinhumikeaVsOaNrueahOmVv+W6plxuXG4gICAgdGhpcy5hbGxBdWRpb1NhbXBsZXNDb3VudCA9IDAgLy8g6Z+z6aKR5oC75pWw5o2u6YePKOWOn+Wni+W4pylcbiAgICB0aGlzLmFsbFZpZGVvU2FtcGxlc0NvdW50ID0gMCAvLyDop4bpopHmgLvmlbDmja7ph48o5Y6f5aeL5binKVxuXG4gICAgdGhpcy5fZmlyc3RBdWRpb1NhbXBsZSA9IG51bGxcbiAgICB0aGlzLl9maXJzdFZpZGVvU2FtcGxlID0gbnVsbFxuXG4gICAgdGhpcy5maWxsZWRBdWRpb1NhbXBsZXMgPSBbXSAvLyDooaXlhYXpn7PpopHluKfvvIjvvIlcbiAgICB0aGlzLmZpbGxlZFZpZGVvU2FtcGxlcyA9IFtdIC8vIOihpeWFheinhumikeW4p++8iO+8iVxuICB9XG5cbiAgZG9GaXggKCkge1xuICAgIGNvbnN0IHsgaXNGaXJzdEF1ZGlvU2FtcGxlcywgaXNGaXJzdFZpZGVvU2FtcGxlcyB9ID0gdGhpcy5nZXRGaXJzdFNhbXBsZSgpXG5cbiAgICAvLyB0aGlzLnJlbW92ZUludmFsaWRTYW1wbGVzKClcblxuICAgIHRoaXMucmVjb3JkU2FtcGxlc0NvdW50KClcblxuICAgIGlmICh0aGlzLl9maXJzdFZpZGVvU2FtcGxlKSB7XG4gICAgICB0aGlzLmZpeFJlZlNhbXBsZUR1cmF0aW9uKHRoaXMudmlkZW9UcmFjay5tZXRhLCB0aGlzLnZpZGVvVHJhY2suc2FtcGxlcylcbiAgICB9XG4gICAgaWYgKHRoaXMuX2ZpcnN0QXVkaW9TYW1wbGUpIHtcbiAgICAgIHRoaXMuZml4UmVmU2FtcGxlRHVyYXRpb24odGhpcy5hdWRpb1RyYWNrLm1ldGEsIHRoaXMuYXVkaW9UcmFjay5zYW1wbGVzKVxuICAgIH1cblxuICAgIHRoaXMuZG9GaXhWaWRlbyhpc0ZpcnN0VmlkZW9TYW1wbGVzKVxuICAgIHRoaXMuZG9GaXhBdWRpbyhpc0ZpcnN0QXVkaW9TYW1wbGVzKVxuICB9XG5cbiAgZG9GaXhWaWRlbyAoZmlyc3QpIHtcbiAgICBsZXQge3NhbXBsZXM6IHZpZGVvU2FtcGxlcywgbWV0YX0gPSB0aGlzLnZpZGVvVHJhY2tcblxuICAgIGlmIChtZXRhLmZyYW1lUmF0ZSAmJiBtZXRhLmZyYW1lUmF0ZS5maXhlZCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXZpZGVvU2FtcGxlcyB8fCAhdmlkZW9TYW1wbGVzLmxlbmd0aCB8fCAhdGhpcy5fZmlyc3RWaWRlb1NhbXBsZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gY29uc29sZS5sb2coYHZpZGVvIGxhc3RTYW1wbGUsICR7dmlkZW9TYW1wbGVzW3ZpZGVvU2FtcGxlcy5sZW5ndGggLSAxXS5kdHN9YClcblxuICAgIGNvbnN0IGZpcnN0U2FtcGxlID0gdmlkZW9TYW1wbGVzWzBdXG4gICAgY29uc3QgZmlyc3REdHMgPSBmaXJzdFNhbXBsZS5kdHNcblxuICAgIGNvbnN0IHNhbXBsZXNMZW4gPSB2aWRlb1NhbXBsZXMubGVuZ3RoO1xuXG4gICAgLy8gc3RlcDEuIOS/ruWkjeS4jmF1ZGlv6aaW5bin5beu6Led5aSq5aSn55qE6Zeu6aKYXG4gICAgaWYgKGZpcnN0ICYmIHRoaXMuX2ZpcnN0QXVkaW9TYW1wbGUpIHtcbiAgICAgIGNvbnN0IHZpZGVvRmlyc3REdHMgPSB0aGlzLl9maXJzdFZpZGVvU2FtcGxlLmR0c1xuICAgICAgY29uc3QgYXVkaW9GaXJzdER0cyA9IHRoaXMuX2ZpcnN0QXVkaW9TYW1wbGUuZHRzXG4gICAgICBjb25zdCBnYXAgPSB2aWRlb0ZpcnN0RHRzIC0gYXVkaW9GaXJzdER0c1xuICAgICAgaWYgKGdhcCA+ICgyICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbikpIHtcbiAgICAgICAgY29uc3QgZmlsbENvdW50ID0gTWF0aC5mbG9vcihnYXAgLyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsbENvdW50OyBpKyspIHtcbiAgICAgICAgICBjb25zdCBjbG9uZWRGaXJzdFNhbXBsZSA9IE9iamVjdC5hc3NpZ24oe30sIGZpcnN0U2FtcGxlKSAvLyDop4bpopHlpLTpg6jluKfnvLrlpLHpnIDopoHlpI3liLbnrKzkuIDluKdcbiAgICAgICAgICAvLyDph43mlrDorqHnrpdzYW1wbGXnmoRkdHPlkoxwdHNcbiAgICAgICAgICBjbG9uZWRGaXJzdFNhbXBsZS5kdHMgPSB2aWRlb0ZpcnN0RHRzIC0gKGkgKyAxKSAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb25cbiAgICAgICAgICBjbG9uZWRGaXJzdFNhbXBsZS5wdHMgPSBjbG9uZWRGaXJzdFNhbXBsZS5kdHMgKyBjbG9uZWRGaXJzdFNhbXBsZS5jdHNcblxuICAgICAgICAgIHZpZGVvU2FtcGxlcy51bnNoaWZ0KGNsb25lZEZpcnN0U2FtcGxlKVxuXG4gICAgICAgICAgdGhpcy5maWxsZWRWaWRlb1NhbXBsZXMucHVzaCh7XG4gICAgICAgICAgICBkdHM6IGNsb25lZEZpcnN0U2FtcGxlLmR0cyxcbiAgICAgICAgICAgIHNpemU6IGNsb25lZEZpcnN0U2FtcGxlLmRhdGEuYnl0ZUxlbmd0aFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgZ2FwXG4gICAgLy8gc3RlcDIuIOS/ruWkjXNhbXBsZXPmrrXkuYvpl7TnmoTpl7Tot53pl67popjjgIFcbiAgICBpZiAodGhpcy5uZXh0VmlkZW9EdHMpIHtcbiAgICAgIC8vIHN0ZXAxLiDlpITnkIZzYW1wbGVz5q615LmL6Ze055qE5Lii5bin5oOF5Ya1XG4gICAgICAvLyDlvZPlj5HnjrBkdXJhdGlvbuW3rui3neWkp+S6jjLluKfml7bov5vooYzooaXluKdcbiAgICAgIGdhcCA9IGZpcnN0RHRzIC0gdGhpcy5uZXh0VmlkZW9EdHNcbiAgICAgIGNvbnN0IGFic0dhcCA9IE1hdGguYWJzKGdhcClcbiAgICAgIGlmIChnYXAgPiAoMiAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pKSB7XG4gICAgICAgIGNvbnN0IGZpbGxGcmFtZUNvdW50ID0gTWF0aC5mbG9vcihnYXAgLyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsbEZyYW1lQ291bnQ7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGNsb25lZFNhbXBsZSA9IE9iamVjdC5hc3NpZ24oe30sIHZpZGVvU2FtcGxlc1swXSlcbiAgICAgICAgICBjb25zdCBjb21wdXRlZCA9IGZpcnN0RHRzIC0gKGkgKyAxKSAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb25cblxuICAgICAgICAgIGNsb25lZFNhbXBsZS5kdHMgPSBjb21wdXRlZCA+IHRoaXMubmV4dFZpZGVvRHRzID8gY29tcHV0ZWQgOiB0aGlzLm5leHRWaWRlb0R0cyAvLyDooaXnmoTnrKzkuIDluKfkuIDlrpropoHmmK9uZXh0VmlkZW9EdHNcbiAgICAgICAgICBjbG9uZWRTYW1wbGUucHRzID0gY2xvbmVkU2FtcGxlLmR0cyArIGNsb25lZFNhbXBsZS5jdHNcblxuICAgICAgICAgIHRoaXMudmlkZW9UcmFjay5zYW1wbGVzLnVuc2hpZnQoY2xvbmVkU2FtcGxlKVxuXG4gICAgICAgICAgdGhpcy5maWxsZWRWaWRlb1NhbXBsZXMucHVzaCh7XG4gICAgICAgICAgICBkdHM6IGNsb25lZFNhbXBsZS5kdHMsXG4gICAgICAgICAgICBzaXplOiBjbG9uZWRTYW1wbGUuZGF0YS5ieXRlTGVuZ3RoXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChhYnNHYXAgPD0gMTAgJiYgYWJzR2FwID4gMCkge1xuICAgICAgICAvLyDlvZPlt67ot53lnKgrLeS4gOW4p+S5i+mXtOaXtuWwhuesrOS4gOW4p+eahGR0c+W8uuihjOWumuS9jeWIsOacn+acm+S9jee9rlxuICAgICAgICAvLyBjb25zb2xlLmxvZygn6YeN5a6a5L2N6KeG6aKR5binZHRzJywgdmlkZW9TYW1wbGVzWzBdLmR0cywgdGhpcy5uZXh0VmlkZW9EdHMpXG4gICAgICAgIHZpZGVvU2FtcGxlc1swXS5kdHMgPSB0aGlzLm5leHRWaWRlb0R0c1xuICAgICAgICB2aWRlb1NhbXBsZXNbMF0ub3JpZ2luRHRzID0gdmlkZW9TYW1wbGVzWzBdLmR0c1xuICAgICAgICB2aWRlb1NhbXBsZXNbMF0uY3RzID0gdmlkZW9TYW1wbGVzWzBdLmN0cyB8fCB2aWRlb1NhbXBsZXNbMF0ucHRzIC0gdmlkZW9TYW1wbGVzWzBdLmR0c1xuICAgICAgICB2aWRlb1NhbXBsZXNbMF0ucHRzID0gdmlkZW9TYW1wbGVzWzBdLmR0cyArIHZpZGVvU2FtcGxlc1swXS5jdHNcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgbGFzdER0cyA9IHZpZGVvU2FtcGxlc1t2aWRlb1NhbXBsZXMubGVuZ3RoIC0gMV0uZHRzO1xuXG4gICAgY29uc3QgbGFzdFNhbXBsZUR1cmF0aW9uID0gdmlkZW9TYW1wbGVzLmxlbmd0aCA+PSAyID8gbGFzdER0cyAtIHZpZGVvU2FtcGxlc1t2aWRlb1NhbXBsZXMubGVuZ3RoIC0gMl0uZHRzIDogbWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuXG4gICAgdGhpcy5sYXN0VmlkZW9TYW1wbGVzTGVuID0gc2FtcGxlc0xlblxuICAgIHRoaXMubmV4dFZpZGVvRHRzID0gbGFzdER0cyArIGxhc3RTYW1wbGVEdXJhdGlvblxuICAgIHRoaXMubGFzdFZpZGVvRHRzID0gbGFzdER0c1xuXG4gICAgLy8gc3RlcDIuIOS/ruWkjXNhbXBsZeauteS5i+WGheeahOmXtOi3nemXrumimFxuICAgIC8vIHN0ZXAzLiDkv67lpI1zYW1wbGVz5q615YaF6YOo55qEZHRz5byC5bi46Zeu6aKYXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHZpZGVvU2FtcGxlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgY3VycmVudCA9IHZpZGVvU2FtcGxlc1tpXVxuICAgICAgY29uc3QgbmV4dCA9IHZpZGVvU2FtcGxlc1tpICsgMV1cblxuICAgICAgaWYgKCFuZXh0KSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkdXJhdGlvbiA9IG5leHQuZHRzIC0gY3VycmVudC5kdHM7XG5cbiAgICAgIGlmIChkdXJhdGlvbiA+ICgyICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbikpIHtcbiAgICAgICAgLy8g5Lik5bin5LmL6Ze06Ze06ZqU5aSq5aSn77yM6ZyA6KaB6KGl56m655m95binXG4gICAgICAgIGxldCBmaWxsRnJhbWVDb3VudCA9IE1hdGguZmxvb3IoZHVyYXRpb24gLyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKVxuXG4gICAgICAgIGxldCBmaWxsRnJhbWVJZHggPSAwXG4gICAgICAgIHdoaWxlIChmaWxsRnJhbWVJZHggPCBmaWxsRnJhbWVDb3VudCkge1xuICAgICAgICAgIGNvbnN0IGZpbGxGcmFtZSA9IE9iamVjdC5hc3NpZ24oe30sIG5leHQpXG4gICAgICAgICAgZmlsbEZyYW1lLmR0cyA9IGN1cnJlbnQuZHRzICsgKGZpbGxGcmFtZUlkeCArIDEpICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuICAgICAgICAgIGZpbGxGcmFtZS5wdHMgPSBmaWxsRnJhbWUuZHRzICsgZmlsbEZyYW1lLmN0c1xuICAgICAgICAgIGlmIChmaWxsRnJhbWUgPCBuZXh0LmR0cykge1xuICAgICAgICAgICAgdmlkZW9TYW1wbGVzLnNwbGljZShpLCAwLCBmaWxsRnJhbWUpXG5cbiAgICAgICAgICAgIHRoaXMuZmlsbGVkVmlkZW9TYW1wbGVzLnB1c2goe1xuICAgICAgICAgICAgICBkdHM6IGZpbGxGcmFtZS5kdHMsXG4gICAgICAgICAgICAgIHNpemU6IGZpbGxGcmFtZS5kYXRhLmJ5dGVMZW5ndGhcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZmlsbEZyYW1lSWR4KytcbiAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnZpZGVvVHJhY2suc2FtcGxlcyA9IHZpZGVvU2FtcGxlcztcbiAgfVxuXG4gIGRvRml4QXVkaW8gKGZpcnN0KSB7XG4gICAgbGV0IHtzYW1wbGVzOiBhdWRpb1NhbXBsZXMsIG1ldGF9ID0gdGhpcy5hdWRpb1RyYWNrXG5cbiAgICBpZiAoIWF1ZGlvU2FtcGxlcyB8fCAhYXVkaW9TYW1wbGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKGBhdWRpbyBsYXN0U2FtcGxlLCAke2F1ZGlvU2FtcGxlc1thdWRpb1NhbXBsZXMubGVuZ3RoIC0gMV0uZHRzfWApXG5cbiAgICBjb25zdCBzYW1wbGVzTGVuID0gYXVkaW9TYW1wbGVzLmxlbmd0aDtcbiAgICBjb25zdCBzaWxlbnRGcmFtZSA9IEFBQy5nZXRTaWxlbnRGcmFtZShtZXRhLmNvZGVjLCBtZXRhLmNoYW5uZWxDb3VudClcblxuICAgIGNvbnN0IGZpcnN0U2FtcGxlID0gdGhpcy5fZmlyc3RBdWRpb1NhbXBsZVxuXG4gICAgLy8g5a+5YXVkaW9TYW1wbGVz5oyJ54WnZHRz5YGa5o6S5bqPXG4gICAgYXVkaW9TYW1wbGVzID0gQ29tcGF0aWJpbGl0eS5zb3J0QXVkaW9TYW1wbGVzKGF1ZGlvU2FtcGxlcylcblxuICAgIC8vIHN0ZXAwLiDpppbluKfkuI52aWRlb+mmluW4p+mXtOi3neWkp+eahOmXrumimFxuICAgIGlmICh0aGlzLl9maXJzdFZpZGVvU2FtcGxlICYmIGZpcnN0KSB7XG4gICAgICBjb25zdCB2aWRlb0ZpcnN0UHRzID0gdGhpcy5fZmlyc3RWaWRlb1NhbXBsZS5wdHMgPyB0aGlzLl9maXJzdFZpZGVvU2FtcGxlLnB0cyA6IHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUuZHRzICsgdGhpcy5fZmlyc3RWaWRlb1NhbXBsZS5jdHNcblxuICAgICAgaWYgKGZpcnN0U2FtcGxlLmR0cyAtIHZpZGVvRmlyc3RQdHMgPiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSB7XG4gICAgICAgIGNvbnN0IHNpbGVudFNhbXBsZUNvdW50ID0gTWF0aC5mbG9vcigoZmlyc3RTYW1wbGUuZHRzIC0gdmlkZW9GaXJzdFB0cykgLyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2lsZW50U2FtcGxlQ291bnQ7IGkrKykge1xuICAgICAgICAgIGNvbnN0IHNpbGVudFNhbXBsZSA9IHtcbiAgICAgICAgICAgIGRhdGE6IHNpbGVudEZyYW1lLFxuICAgICAgICAgICAgZGF0YXNpemU6IHNpbGVudEZyYW1lLmJ5dGVMZW5ndGgsXG4gICAgICAgICAgICBkdHM6IGZpcnN0U2FtcGxlLmR0cyAtIChpICsgMSkgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uLFxuICAgICAgICAgICAgZmlsdGVyZWQ6IDBcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhdWRpb1NhbXBsZXMudW5zaGlmdChzaWxlbnRTYW1wbGUpXG5cbiAgICAgICAgICB0aGlzLmZpbGxlZEF1ZGlvU2FtcGxlcy5wdXNoKHtcbiAgICAgICAgICAgIGR0czogc2lsZW50U2FtcGxlLmR0cyxcbiAgICAgICAgICAgIHNpemU6IHNpbGVudFNhbXBsZS5kYXRhLmJ5dGVMZW5ndGhcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGdhcFxuICAgIGNvbnN0IGZpcnN0RHRzID0gYXVkaW9TYW1wbGVzWzBdLmR0c1xuXG4gICAgaWYgKHRoaXMubmV4dEF1ZGlvRHRzKSB7XG4gICAgICAvLyBzdGVwMS4g5aSE55CGc2FtcGxlc+auteS5i+mXtOeahOS4ouW4p+aDheWGtVxuICAgICAgLy8g5b2T5Y+R546wZHVyYXRpb27lt67ot53lpKfkuo4x5bin5pe26L+b6KGM6KGl5binXG4gICAgICBnYXAgPSBmaXJzdER0cyAtIHRoaXMubmV4dEF1ZGlvRHRzXG4gICAgICBjb25zdCBhYnNHYXAgPSBNYXRoLmFicyhnYXApXG5cbiAgICAgIGlmIChhYnNHYXAgPiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uICYmIHNhbXBsZXNMZW4gPT09IDEgJiYgdGhpcy5sYXN0QXVkaW9TYW1wbGVzTGVuID09PSAxKSB7XG4gICAgICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZCA9IHVuZGVmaW5lZFxuICAgICAgfVxuXG4gICAgICBpZiAoZ2FwID4gKDIgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSkge1xuICAgICAgICBpZiAoc2FtcGxlc0xlbiA9PT0gMSAmJiB0aGlzLmxhc3RBdWRpb1NhbXBsZXNMZW4gPT09IDEpIHtcbiAgICAgICAgICAvLyDlpoLmnpxzYW1wbGXnmoRsZW5ndGjkuIDnm7TmmK8x77yM6ICM5LiU5LiA55u05LiN56ym5ZCIcmVmU2FtcGxlRHVyYXRpb27vvIzpnIDopoHliqjmgIHkv67mlLlyZWZTYW1wbGVEdXJhdGlvblxuICAgICAgICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZCA9IG1ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZCAhPT0gdW5kZWZpbmVkID8gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbkZpeGVkICsgZ2FwIDogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiArIGdhcFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHNpbGVudEZyYW1lQ291bnQgPSBNYXRoLmZsb29yKGdhcCAvIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pXG5cbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpbGVudEZyYW1lQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY29tcHV0ZWQgPSBmaXJzdER0cyAtIChpICsgMSkgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG4gICAgICAgICAgICBjb25zdCBzaWxlbnRTYW1wbGUgPSBPYmplY3QuYXNzaWduKHt9LCBhdWRpb1NhbXBsZXNbMF0sIHtcbiAgICAgICAgICAgICAgZHRzOiBjb21wdXRlZCA+IHRoaXMubmV4dEF1ZGlvRHRzID8gY29tcHV0ZWQgOiB0aGlzLm5leHRBdWRpb0R0c1xuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgdGhpcy5maWxsZWRBdWRpb1NhbXBsZXMucHVzaCh7XG4gICAgICAgICAgICAgIGR0czogc2lsZW50U2FtcGxlLmR0cyxcbiAgICAgICAgICAgICAgc2l6ZTogc2lsZW50U2FtcGxlLmRhdGEuYnl0ZUxlbmd0aFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMuYXVkaW9UcmFjay5zYW1wbGVzLnVuc2hpZnQoc2lsZW50U2FtcGxlKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChhYnNHYXAgPD0gMTAgJiYgYWJzR2FwID4gMCkge1xuICAgICAgICAvLyDlvZPlt67ot53mr5TovoPlsI/nmoTml7blgJnlsIbpn7PpopHluKfph43lrprkvY1cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ+mHjeWumuS9jemfs+mikeW4p2R0cycsIGF1ZGlvU2FtcGxlc1swXS5kdHMsIHRoaXMubmV4dEF1ZGlvRHRzKVxuICAgICAgICBhdWRpb1NhbXBsZXNbMF0uZHRzID0gdGhpcy5uZXh0QXVkaW9EdHNcbiAgICAgICAgYXVkaW9TYW1wbGVzWzBdLnB0cyA9IHRoaXMubmV4dEF1ZGlvRHRzXG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGxhc3REdHMgPSBhdWRpb1NhbXBsZXNbYXVkaW9TYW1wbGVzLmxlbmd0aCAtIDFdLmR0cztcbiAgICBjb25zdCBsYXN0U2FtcGxlRHVyYXRpb24gPSBhdWRpb1NhbXBsZXMubGVuZ3RoID49IDIgPyBsYXN0RHRzIC0gYXVkaW9TYW1wbGVzW2F1ZGlvU2FtcGxlcy5sZW5ndGggLSAyXS5kdHMgOiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG5cbiAgICB0aGlzLmxhc3RBdWRpb1NhbXBsZXNMZW4gPSBzYW1wbGVzTGVuO1xuICAgIHRoaXMubmV4dEF1ZGlvRHRzID0gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbkZpeGVkID8gbGFzdER0cyArIG1ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZCA6IGxhc3REdHMgKyBsYXN0U2FtcGxlRHVyYXRpb25cbiAgICB0aGlzLmxhc3RBdWRpb0R0cyA9IGxhc3REdHNcblxuICAgIC8vIHN0ZXAzLiDkv67lpI1zYW1wbGVz5q615YaF6YOo55qEZHRz5byC5bi46Zeu6aKYXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGF1ZGlvU2FtcGxlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgY3VycmVudCA9IGF1ZGlvU2FtcGxlc1tpXVxuICAgICAgY29uc3QgbmV4dCA9IGF1ZGlvU2FtcGxlc1tpICsgMV1cblxuICAgICAgaWYgKCFuZXh0KSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkdXJhdGlvbiA9IG5leHQuZHRzIC0gY3VycmVudC5kdHM7XG4gICAgICBhdWRpb1NhbXBsZXNbaV0uZHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICAgIC8qXG4gICAgICBpZiAoZHVyYXRpb24gPiAoMiAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pKSB7XG4gICAgICAgIC8vIOS4pOW4p+S5i+mXtOmXtOmalOWkquWkp++8jOmcgOimgeihpeepuueZveW4p1xuICAgICAgICAvKipcbiAgICAgICAgbGV0IHNpbGVudEZyYW1lQ291bnQgPSBNYXRoLmZsb29yKGR1cmF0aW9uIC8gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbilcbiAgICAgICAgbGV0IGZyYW1lSWR4ID0gMFxuXG4gICAgICAgIHdoaWxlIChmcmFtZUlkeCA8IHNpbGVudEZyYW1lQ291bnQpIHtcbiAgICAgICAgICBjb25zdCBzaWxlbnRTYW1wbGUgPSB7XG4gICAgICAgICAgICBkYXRhOiBzaWxlbnRGcmFtZSxcbiAgICAgICAgICAgIGRhdGFzaXplOiBzaWxlbnRGcmFtZS5ieXRlTGVuZ3RoLFxuICAgICAgICAgICAgZHRzOiBjdXJyZW50LmR0cyArIChmcmFtZUlkeCArIDEpICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbixcbiAgICAgICAgICAgIGZpbHRlcmVkOiAwLFxuICAgICAgICAgICAgaXNTaWxlbnQ6IHRydWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhdWRpb1NhbXBsZXMuc3BsaWNlKGksIDAsIHNpbGVudFNhbXBsZSlcblxuICAgICAgICAgIHRoaXMuZmlsbGVkQXVkaW9TYW1wbGVzLnB1c2goe1xuICAgICAgICAgICAgZHRzOiBzaWxlbnRTYW1wbGUuZHRzLFxuICAgICAgICAgICAgc2l6ZTogc2lsZW50U2FtcGxlLmRhdGEuYnl0ZUxlbmd0aFxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICBmcmFtZUlkeCsrXG4gICAgICAgICAgaSsrIC8vIOS4jeWvuemdmemfs+W4p+WBmuavlOi+g1xuICAgICAgICB9XG4gICAgICB9ICovXG4gICAgfVxuXG4gICAgdGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMgPSBDb21wYXRpYmlsaXR5LnNvcnRBdWRpb1NhbXBsZXMoYXVkaW9TYW1wbGVzKVxuICB9XG5cbiAgZ2V0Rmlyc3RTYW1wbGUgKCkge1xuICAgIC8vIOiOt+WPlnZpZGVv5ZKMYXVkaW/nmoTpppbluKfmlbDmja5cbiAgICBsZXQge3NhbXBsZXM6IHZpZGVvU2FtcGxlc30gPSB0aGlzLnZpZGVvVHJhY2tcbiAgICBsZXQge3NhbXBsZXM6IGF1ZGlvU2FtcGxlc30gPSB0aGlzLmF1ZGlvVHJhY2tcblxuICAgIGxldCBpc0ZpcnN0VmlkZW9TYW1wbGVzID0gZmFsc2U7XG4gICAgbGV0IGlzRmlyc3RBdWRpb1NhbXBsZXMgPSBmYWxzZTtcblxuICAgIGlmICghdGhpcy5fZmlyc3RWaWRlb1NhbXBsZSAmJiB2aWRlb1NhbXBsZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9maXJzdFZpZGVvU2FtcGxlID0gQ29tcGF0aWJpbGl0eS5maW5kRmlyc3RWaWRlb1NhbXBsZSh2aWRlb1NhbXBsZXMpXG4gICAgICBpc0ZpcnN0VmlkZW9TYW1wbGVzID0gdHJ1ZVxuICAgIH1cblxuICAgIGlmICghdGhpcy5fZmlyc3RBdWRpb1NhbXBsZSAmJiBhdWRpb1NhbXBsZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9maXJzdEF1ZGlvU2FtcGxlID0gQ29tcGF0aWJpbGl0eS5maW5kRmlyc3RBdWRpb1NhbXBsZShhdWRpb1NhbXBsZXMpIC8vIOWvu+aJvmR0c+acgOWwj+eahOW4p+S9nOS4uummluS4qumfs+mikeW4p1xuICAgICAgaXNGaXJzdEF1ZGlvU2FtcGxlcyA9IHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgaXNGaXJzdFZpZGVvU2FtcGxlcyxcbiAgICAgIGlzRmlyc3RBdWRpb1NhbXBsZXNcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog5Zyo5rKh5pyJcmVmU2FtcGxlRHVyYXRpb27nmoTpl67popjmtYHkuK3vvIxcbiAgICovXG4gIGZpeFJlZlNhbXBsZUR1cmF0aW9uIChtZXRhLCBzYW1wbGVzKSB7XG4gICAgY29uc3QgaXNWaWRlbyA9IG1ldGEudHlwZSA9PT0gJ3ZpZGVvJ1xuICAgIGNvbnN0IGFsbFNhbXBsZXNDb3VudCA9IGlzVmlkZW8gPyB0aGlzLmFsbFZpZGVvU2FtcGxlc0NvdW50IDogdGhpcy5hbGxBdWRpb1NhbXBsZXNDb3VudFxuICAgIGNvbnN0IGZpcnN0RHRzID0gaXNWaWRlbyA/IHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUuZHRzIDogdGhpcy5fZmlyc3RBdWRpb1NhbXBsZS5kdHNcbiAgICBjb25zdCBmaWxsZWRTYW1wbGVzQ291bnQgPSBpc1ZpZGVvID8gdGhpcy5maWxsZWRWaWRlb1NhbXBsZXMubGVuZ3RoIDogdGhpcy5maWxsZWRBdWRpb1NhbXBsZXMubGVuZ3RoXG5cbiAgICBpZiAoIW1ldGEucmVmU2FtcGxlRHVyYXRpb24gfHwgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA8PSAwIHx8IE51bWJlci5pc05hTihtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSkge1xuICAgICAgaWYgKHNhbXBsZXMubGVuZ3RoID49IDEpIHtcbiAgICAgICAgY29uc3QgbGFzdER0cyA9IHNhbXBsZXNbc2FtcGxlcy5sZW5ndGggLSAxXS5kdHNcblxuICAgICAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uID0gTWF0aC5mbG9vcigobGFzdER0cyAtIGZpcnN0RHRzKSAvICgoYWxsU2FtcGxlc0NvdW50ICsgZmlsbGVkU2FtcGxlc0NvdW50KSAtIDEpKTsgLy8g5bCGcmVmU2FtcGxlRHVyYXRpb27ph43nva7kuLrorqHnrpflkI7nmoTlubPlnYflgLxcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1ldGEucmVmU2FtcGxlRHVyYXRpb24pIHtcbiAgICAgIGlmIChzYW1wbGVzLmxlbmd0aCA+PSAzKSB7XG4gICAgICAgIGNvbnN0IGxhc3REdHMgPSBzYW1wbGVzW3NhbXBsZXMubGVuZ3RoIC0gMV0uZHRzXG4gICAgICAgIGNvbnN0IGZpcnN0RHRzID0gc2FtcGxlc1swXS5kdHNcbiAgICAgICAgY29uc3QgZHVyYXRpb25BdmcgPSAobGFzdER0cyAtIGZpcnN0RHRzKSAvIHNhbXBsZXMubGVuZ3RoXG5cbiAgICAgICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA9IE1hdGguYWJzKG1ldGEucmVmU2FtcGxlRHVyYXRpb24gLSBkdXJhdGlvbkF2ZykgPD0gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA/IG1ldGEucmVmU2FtcGxlRHVyYXRpb24gOiBkdXJhdGlvbkF2ZzsgLy8g5bCGcmVmU2FtcGxlRHVyYXRpb27ph43nva7kuLrorqHnrpflkI7nmoTlubPlnYflgLxcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog6K6w5b2V5oiq5q2i55uu5YmN5LiA5YWx5pKt5pS+5LqG5aSa5bCR5binXG4gICAqL1xuICByZWNvcmRTYW1wbGVzQ291bnQgKCkge1xuICAgIGNvbnN0IHsgYXVkaW9UcmFjaywgdmlkZW9UcmFjayB9ID0gdGhpc1xuXG4gICAgdGhpcy5hbGxBdWRpb1NhbXBsZXNDb3VudCArPSBhdWRpb1RyYWNrLnNhbXBsZXMubGVuZ3RoXG4gICAgdGhpcy5hbGxWaWRlb1NhbXBsZXNDb3VudCArPSB2aWRlb1RyYWNrLnNhbXBsZXMubGVuZ3RoXG4gIH1cblxuICAvKipcbiAgICog5Y676Zmk5LiN5ZCI5rOV55qE5bin77yI5YCS6YCA44CB6YeN5aSN5bin77yJXG4gICAqL1xuICByZW1vdmVJbnZhbGlkU2FtcGxlcyAoKSB7XG4gICAgY29uc3QgeyBfZmlyc3RWaWRlb1NhbXBsZSwgX2ZpcnN0QXVkaW9TYW1wbGUgfSA9IHRoaXNcblxuICAgIHRoaXMuYXVkaW9UcmFjay5zYW1wbGVzID0gdGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMuZmlsdGVyKChzYW1wbGUpID0+IHtcbiAgICAgIHJldHVybiBzYW1wbGUuZHRzID49IF9maXJzdEF1ZGlvU2FtcGxlLmR0cyAmJiAodGhpcy5sYXN0QXVkaW9EdHMgPT09IHVuZGVmaW5lZCB8fCBzYW1wbGUuZHRzID4gdGhpcy5sYXN0QXVkaW9EdHMpXG4gICAgfSlcblxuICAgIHRoaXMudmlkZW9UcmFjay5zYW1wbGVzID0gdGhpcy52aWRlb1RyYWNrLnNhbXBsZXMuZmlsdGVyKChzYW1wbGUpID0+IHtcbiAgICAgIHJldHVybiBzYW1wbGUuZHRzID49IF9maXJzdFZpZGVvU2FtcGxlLmR0cyAmJiAodGhpcy5sYXN0VmlkZW9EdHMgPT09IHVuZGVmaW5lZCB8fCBzYW1wbGUuZHRzID4gdGhpcy5sYXN0VmlkZW9EdHMpXG4gICAgfSlcbiAgfVxuXG4gIHN0YXRpYyBzb3J0QXVkaW9TYW1wbGVzIChzYW1wbGVzKSB7XG4gICAgaWYgKHNhbXBsZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gc2FtcGxlc1xuICAgIH1cblxuICAgIHJldHVybiBzYW1wbGVzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIHJldHVybiBhLmR0cyAtIGIuZHRzXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiDlr7vmib5kdHPmnIDlsI/nmoRzYW1wbGVcbiAgICogQHBhcmFtIHNhbXBsZXNcbiAgICovXG4gIHN0YXRpYyBmaW5kRmlyc3RBdWRpb1NhbXBsZSAoc2FtcGxlcykge1xuICAgIGlmICghc2FtcGxlcyB8fCBzYW1wbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICByZXR1cm4gQ29tcGF0aWJpbGl0eS5zb3J0QXVkaW9TYW1wbGVzKHNhbXBsZXMpWzBdXG4gIH1cblxuICBzdGF0aWMgZmluZEZpcnN0VmlkZW9TYW1wbGUgKHNhbXBsZXMpIHtcbiAgICBpZiAoIXNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIGNvbnN0IHNvcnRlZCA9IHNhbXBsZXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgcmV0dXJuIGEuZHRzIC0gYi5kdHM7XG4gICAgfSlcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzb3J0ZWQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChzb3J0ZWRbaV0uaXNLZXlmcmFtZSkge1xuICAgICAgICByZXR1cm4gc29ydGVkW2ldXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0IHRyYWNrcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpXG4gIH1cblxuICBnZXQgYXVkaW9UcmFjayAoKSB7XG4gICAgaWYgKHRoaXMudHJhY2tzKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmFja3MuYXVkaW9UcmFja1xuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgZ2V0IHZpZGVvVHJhY2sgKCkge1xuICAgIGlmICh0aGlzLnRyYWNrcykge1xuICAgICAgcmV0dXJuIHRoaXMudHJhY2tzLnZpZGVvVHJhY2tcbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQ29tcGF0aWJpbGl0eTtcbiIsImNsYXNzIEdvbG9tYiB7XG4gIGNvbnN0cnVjdG9yICh1aW50OGFycmF5KSB7XG4gICAgdGhpcy5UQUcgPSAnR29sb21iJ1xuICAgIHRoaXMuX2J1ZmZlciA9IHVpbnQ4YXJyYXlcbiAgICB0aGlzLl9idWZmZXJJbmRleCA9IDBcbiAgICB0aGlzLl90b3RhbEJ5dGVzID0gdWludDhhcnJheS5ieXRlTGVuZ3RoXG4gICAgdGhpcy5fdG90YWxCaXRzID0gdWludDhhcnJheS5ieXRlTGVuZ3RoICogOFxuICAgIHRoaXMuX2N1cnJlbnRXb3JkID0gMFxuICAgIHRoaXMuX2N1cnJlbnRXb3JkQml0c0xlZnQgPSAwXG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLl9idWZmZXIgPSBudWxsXG4gIH1cblxuICBfZmlsbEN1cnJlbnRXb3JkICgpIHtcbiAgICBsZXQgYnVmZmVyQnl0ZXNMZWZ0ID0gdGhpcy5fdG90YWxCeXRlcyAtIHRoaXMuX2J1ZmZlckluZGV4XG4gICAgaWYgKGJ1ZmZlckJ5dGVzTGVmdCA8PSAwKSB7XG4gICAgICAvLyBUT0RPIOW8guW4uOWkhOeQhlxuICAgIH1cblxuICAgIGxldCBieXRlc1JlYWQgPSBNYXRoLm1pbig0LCBidWZmZXJCeXRlc0xlZnQpXG4gICAgbGV0IHdvcmQgPSBuZXcgVWludDhBcnJheSg0KVxuICAgIHdvcmQuc2V0KHRoaXMuX2J1ZmZlci5zdWJhcnJheSh0aGlzLl9idWZmZXJJbmRleCwgdGhpcy5fYnVmZmVySW5kZXggKyBieXRlc1JlYWQpKVxuICAgIHRoaXMuX2N1cnJlbnRXb3JkID0gbmV3IERhdGFWaWV3KHdvcmQuYnVmZmVyKS5nZXRVaW50MzIoMCwgZmFsc2UpXG5cbiAgICB0aGlzLl9idWZmZXJJbmRleCArPSBieXRlc1JlYWRcbiAgICB0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0ID0gYnl0ZXNSZWFkICogOFxuICB9XG5cbiAgcmVhZEJpdHMgKGJpdHMpIHtcbiAgICBpZiAoYml0cyA+IDMyKSB7XG4gICAgICAvLyBUT0RPXG4gICAgfVxuXG4gICAgaWYgKGJpdHMgPD0gdGhpcy5fY3VycmVudFdvcmRCaXRzTGVmdCkge1xuICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuX2N1cnJlbnRXb3JkID4+PiAoMzIgLSBiaXRzKVxuICAgICAgdGhpcy5fY3VycmVudFdvcmQgPDw9IGJpdHNcbiAgICAgIHRoaXMuX2N1cnJlbnRXb3JkQml0c0xlZnQgLT0gYml0c1xuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cblxuICAgIGxldCByZXN1bHQgPSB0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0ID8gdGhpcy5fY3VycmVudFdvcmQgOiAwXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgcmVzdWx0ID4+PiAoMzIgLSB0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0KVxuICAgIGxldCBiaXRzTmVlZExlZnQgPSBiaXRzIC0gdGhpcy5fY3VycmVudFdvcmRCaXRzTGVmdFxuXG4gICAgdGhpcy5fZmlsbEN1cnJlbnRXb3JkKClcbiAgICBsZXQgYml0c1JlYWROZXh0ID0gTWF0aC5taW4oYml0c05lZWRMZWZ0LCB0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0KVxuXG4gICAgbGV0IHJlc3VsdDIgPSB0aGlzLl9jdXJyZW50V29yZCA+Pj4gKDMyIC0gYml0c1JlYWROZXh0KVxuICAgIHRoaXMuX2N1cnJlbnRXb3JkIDw8PSBiaXRzUmVhZE5leHRcbiAgICB0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0IC09IGJpdHNSZWFkTmV4dFxuXG4gICAgcmVzdWx0ID0gKHJlc3VsdCA8PCBiaXRzUmVhZE5leHQpIHwgcmVzdWx0MlxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIHJlYWRCb29sICgpIHtcbiAgICByZXR1cm4gdGhpcy5yZWFkQml0cygxKSA9PT0gMVxuICB9XG5cbiAgcmVhZEJ5dGUgKCkge1xuICAgIHJldHVybiB0aGlzLnJlYWRCaXRzKDgpXG4gIH1cblxuICBfc2tpcExlYWRpbmdaZXJvICgpIHtcbiAgICBsZXQgemVyb0NvdW50XG4gICAgZm9yICh6ZXJvQ291bnQgPSAwOyB6ZXJvQ291bnQgPCB0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0OyB6ZXJvQ291bnQrKykge1xuICAgICAgaWYgKCh0aGlzLl9jdXJyZW50V29yZCAmICgweDgwMDAwMDAwID4+PiB6ZXJvQ291bnQpKSAhPT0gMCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50V29yZCA8PD0gemVyb0NvdW50XG4gICAgICAgIHRoaXMuX2N1cnJlbnRXb3JkQml0c0xlZnQgLT0gemVyb0NvdW50XG4gICAgICAgIHJldHVybiB6ZXJvQ291bnRcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fZmlsbEN1cnJlbnRXb3JkKClcbiAgICByZXR1cm4gemVyb0NvdW50ICsgdGhpcy5fc2tpcExlYWRpbmdaZXJvKClcbiAgfVxuXG4gIHJlYWRVRUcgKCkgeyAvLyB1bnNpZ25lZCBleHBvbmVudGlhbCBnb2xvbWJcbiAgICBsZXQgbGVhZGluZ1plcm9zID0gdGhpcy5fc2tpcExlYWRpbmdaZXJvKClcbiAgICByZXR1cm4gdGhpcy5yZWFkQml0cyhsZWFkaW5nWmVyb3MgKyAxKSAtIDFcbiAgfVxuXG4gIHJlYWRTRUcgKCkgeyAvLyBzaWduZWQgZXhwb25lbnRpYWwgZ29sb21iXG4gICAgbGV0IHZhbHVlID0gdGhpcy5yZWFkVUVHKClcbiAgICBpZiAodmFsdWUgJiAweDAxKSB7XG4gICAgICByZXR1cm4gKHZhbHVlICsgMSkgPj4+IDFcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIC0xICogKHZhbHVlID4+PiAxKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHb2xvbWJcbiIsImltcG9ydCBTcHNQYXJzZXIgZnJvbSAnLi9zcHMnO1xuY2xhc3MgTmFsdW5pdCB7XG4gIHN0YXRpYyBnZXROYWx1bml0cyAoYnVmZmVyKSB7XG4gICAgaWYgKGJ1ZmZlci5sZW5ndGggLSBidWZmZXIucG9zaXRpb24gPCA0KSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgbGV0IGJ1ZiA9IGJ1ZmZlci5kYXRhdmlldztcbiAgICBsZXQgcG9zaXRpb24gPSBidWZmZXIucG9zaXRpb247XG4gICAgaWYgKGJ1Zi5nZXRJbnQzMihwb3NpdGlvbikgPT09IDEgfHxcbiAgICAoYnVmLmdldEludDE2KHBvc2l0aW9uKSA9PT0gMCAmJiBidWYuZ2V0SW50OChwb3NpdGlvbiArIDIpID09PSAxKSkge1xuICAgICAgcmV0dXJuIE5hbHVuaXQuZ2V0QW5uZXhiTmFscyhidWZmZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTmFsdW5pdC5nZXRBdmNjTmFscyhidWZmZXIpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRBbm5leGJOYWxzIChidWZmZXIpIHtcbiAgICBsZXQgbmFscyA9IFtdO1xuICAgIGxldCBwb3NpdGlvbiA9IE5hbHVuaXQuZ2V0SGVhZGVyUG9zaXRpb25Bbm5leEIoYnVmZmVyKTtcbiAgICBsZXQgc3RhcnQgPSBwb3NpdGlvbi5wb3M7XG4gICAgbGV0IGVuZCA9IHN0YXJ0O1xuICAgIHdoaWxlIChzdGFydCA8IGJ1ZmZlci5sZW5ndGggLSA0KSB7XG4gICAgICBsZXQgaGVhZGVyID0gYnVmZmVyLmJ1ZmZlci5zbGljZShzdGFydCwgc3RhcnQgKyBwb3NpdGlvbi5oZWFkZXJMZW5ndGgpO1xuICAgICAgaWYgKHBvc2l0aW9uLnBvcyA9PT0gYnVmZmVyLnBvc2l0aW9uKSB7XG4gICAgICAgIGJ1ZmZlci5za2lwKHBvc2l0aW9uLmhlYWRlckxlbmd0aCk7XG4gICAgICB9XG4gICAgICBwb3NpdGlvbiA9IE5hbHVuaXQuZ2V0SGVhZGVyUG9zaXRpb25Bbm5leEIoYnVmZmVyKTtcbiAgICAgIGVuZCA9IHBvc2l0aW9uLnBvcztcbiAgICAgIGxldCBib2R5ID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyLmJ1ZmZlci5zbGljZShzdGFydCArIGhlYWRlci5ieXRlTGVuZ3RoLCBlbmQpKTtcbiAgICAgIGxldCB1bml0ID0ge2hlYWRlciwgYm9keX07XG4gICAgICBOYWx1bml0LmFuYWx5c2VOYWwodW5pdCk7XG4gICAgICBuYWxzLnB1c2godW5pdCk7XG4gICAgICBidWZmZXIuc2tpcChlbmQgLSBidWZmZXIucG9zaXRpb24pO1xuICAgICAgc3RhcnQgPSBlbmQ7XG4gICAgfVxuICAgIHJldHVybiBuYWxzO1xuICB9XG5cbiAgc3RhdGljIGdldEF2Y2NOYWxzIChidWZmZXIpIHtcbiAgICBsZXQgbmFscyA9IFtdO1xuICAgIHdoaWxlIChidWZmZXIucG9zaXRpb24gPCBidWZmZXIubGVuZ3RoIC0gNCkge1xuICAgICAgbGV0IGxlbmd0aCA9IGJ1ZmZlci5kYXRhdmlldy5nZXRJbnQzMihidWZmZXIucG9zaXRpb24pO1xuICAgICAgaWYgKGJ1ZmZlci5sZW5ndGggLSBidWZmZXIucG9zaXRpb24gPj0gbGVuZ3RoKSB7XG4gICAgICAgIGxldCBoZWFkZXIgPSBidWZmZXIuYnVmZmVyLnNsaWNlKGJ1ZmZlci5wb3NpdGlvbiwgYnVmZmVyLnBvc2l0aW9uICsgNCk7XG4gICAgICAgIGJ1ZmZlci5za2lwKDQpXG4gICAgICAgIGxldCBib2R5ID0gYnVmZmVyLmJ1ZmZlci5zbGljZShidWZmZXIucG9zaXRpb24sIGJ1ZmZlci5wb3NpdGlvbiArIGxlbmd0aCk7XG4gICAgICAgIGJ1ZmZlci5za2lwKGxlbmd0aCk7XG4gICAgICAgIGxldCB1bml0ID0ge2hlYWRlciwgYm9keX07XG4gICAgICAgIE5hbHVuaXQuYW5hbHlzZU5hbCh1bml0KTtcbiAgICAgICAgbmFscy5wdXNoKHVuaXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuYWxzO1xuICB9XG5cbiAgc3RhdGljIGFuYWx5c2VOYWwgKHVuaXQpIHtcbiAgICBsZXQgdHlwZSA9IHVuaXQuYm9keVswXSAmIDB4MWY7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIC8vIE5EUlxuICAgICAgICB1bml0Lm5kciA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA1OlxuICAgICAgICAvLyBJRFJcbiAgICAgICAgdW5pdC5pZHIgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNjpcbiAgICAgICAgLy8gU0VJXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA3OlxuICAgICAgICAvLyBTUFNcbiAgICAgICAgdW5pdC5zcHMgPSBTcHNQYXJzZXIucGFyc2VTUFModW5pdC5ib2R5KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDg6XG4gICAgICAgIC8vIFBQU1xuICAgICAgICB1bml0LnBwcyA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA5OlxuICAgICAgICAvLyBBVURcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0SGVhZGVyUG9zaXRpb25Bbm5leEIgKGJ1ZmZlcikge1xuICAgIC8vIHNlcGVyYXRlXG4gICAgbGV0IHBvcyA9IGJ1ZmZlci5wb3NpdGlvbjtcbiAgICBsZXQgaGVhZGVyTGVuZ3RoID0gMDtcbiAgICB3aGlsZSAoaGVhZGVyTGVuZ3RoICE9PSAzICYmIGhlYWRlckxlbmd0aCAhPT0gNCAmJiBwb3MgPCBidWZmZXIubGVuZ3RoIC0gNCkge1xuICAgICAgaWYgKGJ1ZmZlci5kYXRhdmlldy5nZXRJbnQxNihwb3MpID09PSAwKSB7XG4gICAgICAgIGlmIChidWZmZXIuZGF0YXZpZXcuZ2V0SW50MTYocG9zICsgMikgPT09IDEpIHtcbiAgICAgICAgICAvLyAweDAwMDAwMVxuICAgICAgICAgIGhlYWRlckxlbmd0aCA9IDQ7XG4gICAgICAgIH0gZWxzZSBpZiAoYnVmZmVyLmRhdGF2aWV3LmdldEludDgocG9zICsgMikgPT09IDEpIHtcbiAgICAgICAgICBoZWFkZXJMZW5ndGggPSAzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBvcysrO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwb3MrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zID09PSBidWZmZXIubGVuZ3RoIC0gNCkge1xuICAgICAgaWYgKGJ1ZmZlci5kYXRhdmlldy5nZXRJbnQxNihwb3MpID09PSAwKSB7XG4gICAgICAgIGlmIChidWZmZXIuZGF0YXZpZXcuZ2V0SW50MTYocG9zICsgMikgPT09IDEpIHtcbiAgICAgICAgICAvLyAweDAwMDAwMVxuICAgICAgICAgIGhlYWRlckxlbmd0aCA9IDQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBvcysrO1xuICAgICAgICBpZiAoYnVmZmVyLmRhdGF2aWV3LmdldEludDE2KHBvcykgPT09IDAgJiYgYnVmZmVyLmRhdGF2aWV3LmdldEludDgocG9zKSA9PT0gMSkge1xuICAgICAgICAgIC8vIDB4MDAwMDAwMVxuICAgICAgICAgIGhlYWRlckxlbmd0aCA9IDM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcG9zID0gYnVmZmVyLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge3BvcywgaGVhZGVyTGVuZ3RofTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRBdmNjIChzcHMsIHBwcykge1xuICAgIGxldCByZXQgPSBuZXcgVWludDhBcnJheShzcHMuYnl0ZUxlbmd0aCArIHBwcy5ieXRlTGVuZ3RoICsgMTEpO1xuICAgIHJldFswXSA9IDB4MDE7XG4gICAgcmV0WzFdID0gc3BzWzFdO1xuICAgIHJldFsyXSA9IHNwc1syXTtcbiAgICByZXRbM10gPSBzcHNbM107XG4gICAgcmV0WzRdID0gMjU1O1xuICAgIHJldFs1XSA9IDIyNTtcblxuICAgIGxldCBvZmZzZXQgPSA2O1xuXG4gICAgcmV0LnNldChuZXcgVWludDhBcnJheShbKHNwcy5ieXRlTGVuZ3RoID4+PiA4KSAmIDB4ZmYsIHNwcy5ieXRlTGVuZ3RoICYgMHhmZl0pLCBvZmZzZXQpO1xuICAgIG9mZnNldCArPSAyO1xuICAgIHJldC5zZXQoc3BzLCBvZmZzZXQpO1xuICAgIG9mZnNldCArPSBzcHMuYnl0ZUxlbmd0aDtcblxuICAgIHJldFtvZmZzZXRdID0gMTtcbiAgICBvZmZzZXQrKztcblxuICAgIHJldC5zZXQobmV3IFVpbnQ4QXJyYXkoWyhwcHMuYnl0ZUxlbmd0aCA+Pj4gOCkgJiAweGZmLCBwcHMuYnl0ZUxlbmd0aCAmIDB4ZmZdKSwgb2Zmc2V0KTtcbiAgICBvZmZzZXQgKz0gMjtcbiAgICByZXQuc2V0KHBwcywgb2Zmc2V0KTtcbiAgICByZXR1cm4gcmV0O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5hbHVuaXQ7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgICovXG4vKiBlc2xpbnQtZGlzYWJsZSBvbmUtdmFyICAqL1xuaW1wb3J0IEdvbG9tYiBmcm9tICcuL2dvbG9tYidcblxuY2xhc3MgU1BTUGFyc2VyIHtcbiAgc3RhdGljIF9lYnNwMnJic3AgKHVpbnQ4YXJyYXkpIHtcbiAgICBsZXQgc3JjID0gdWludDhhcnJheVxuICAgIGxldCBzcmNMZW5ndGggPSBzcmMuYnl0ZUxlbmd0aFxuICAgIGxldCBkc3QgPSBuZXcgVWludDhBcnJheShzcmNMZW5ndGgpXG4gICAgbGV0IGRzdElkeCA9IDBcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3JjTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpID49IDIpIHtcbiAgICAgICAgaWYgKHNyY1tpXSA9PT0gMHgwMyAmJiBzcmNbaSAtIDFdID09PSAweDAwICYmIHNyY1tpIC0gMl0gPT09IDB4MDApIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBkc3RbZHN0SWR4XSA9IHNyY1tpXVxuICAgICAgZHN0SWR4KytcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZHN0LmJ1ZmZlciwgMCwgZHN0SWR4KVxuICB9XG5cbiAgc3RhdGljIHBhcnNlU1BTICh1aW50OGFycmF5KSB7XG4gICAgbGV0IHJic3AgPSBTUFNQYXJzZXIuX2Vic3AycmJzcCh1aW50OGFycmF5KVxuICAgIGxldCBnYiA9IG5ldyBHb2xvbWIocmJzcClcblxuICAgIGdiLnJlYWRCeXRlKClcbiAgICBsZXQgcHJvZmlsZUlkYyA9IGdiLnJlYWRCeXRlKClcbiAgICBnYi5yZWFkQnl0ZSgpXG4gICAgbGV0IGxldmVsSWRjID0gZ2IucmVhZEJ5dGUoKVxuICAgIGdiLnJlYWRVRUcoKVxuXG4gICAgbGV0IHByb2ZpbGVfc3RyaW5nID0gU1BTUGFyc2VyLmdldFByb2ZpbGVTdHJpbmcocHJvZmlsZUlkYylcbiAgICBsZXQgbGV2ZWxfc3RyaW5nID0gU1BTUGFyc2VyLmdldExldmVsU3RyaW5nKGxldmVsSWRjKVxuICAgIGxldCBjaHJvbWFfZm9ybWF0X2lkYyA9IDFcbiAgICBsZXQgY2hyb21hX2Zvcm1hdCA9IDQyMFxuICAgIGxldCBjaHJvbWFfZm9ybWF0X3RhYmxlID0gWzAsIDQyMCwgNDIyLCA0NDRdXG4gICAgbGV0IGJpdF9kZXB0aCA9IDhcblxuICAgIGlmIChwcm9maWxlSWRjID09PSAxMDAgfHwgcHJvZmlsZUlkYyA9PT0gMTEwIHx8IHByb2ZpbGVJZGMgPT09IDEyMiB8fFxuICAgICAgcHJvZmlsZUlkYyA9PT0gMjQ0IHx8IHByb2ZpbGVJZGMgPT09IDQ0IHx8IHByb2ZpbGVJZGMgPT09IDgzIHx8XG4gICAgICBwcm9maWxlSWRjID09PSA4NiB8fCBwcm9maWxlSWRjID09PSAxMTggfHwgcHJvZmlsZUlkYyA9PT0gMTI4IHx8XG4gICAgICBwcm9maWxlSWRjID09PSAxMzggfHwgcHJvZmlsZUlkYyA9PT0gMTQ0KSB7XG4gICAgICBjaHJvbWFfZm9ybWF0X2lkYyA9IGdiLnJlYWRVRUcoKVxuICAgICAgaWYgKGNocm9tYV9mb3JtYXRfaWRjID09PSAzKSB7XG4gICAgICAgIGdiLnJlYWRCaXRzKDEpXG4gICAgICB9XG4gICAgICBpZiAoY2hyb21hX2Zvcm1hdF9pZGMgPD0gMykge1xuICAgICAgICBjaHJvbWFfZm9ybWF0ID0gY2hyb21hX2Zvcm1hdF90YWJsZVtjaHJvbWFfZm9ybWF0X2lkY11cbiAgICAgIH1cblxuICAgICAgYml0X2RlcHRoID0gZ2IucmVhZFVFRygpICsgOFxuICAgICAgZ2IucmVhZFVFRygpXG4gICAgICBnYi5yZWFkQml0cygxKVxuICAgICAgaWYgKGdiLnJlYWRCb29sKCkpIHtcbiAgICAgICAgbGV0IHNjYWxpbmdfbGlzdF9jb3VudCA9IChjaHJvbWFfZm9ybWF0X2lkYyAhPT0gMykgPyA4IDogMTJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY2FsaW5nX2xpc3RfY291bnQ7IGkrKykge1xuICAgICAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgICAgICBpZiAoaSA8IDYpIHtcbiAgICAgICAgICAgICAgU1BTUGFyc2VyLl9za2lwU2NhbGluZ0xpc3QoZ2IsIDE2KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgU1BTUGFyc2VyLl9za2lwU2NhbGluZ0xpc3QoZ2IsIDY0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBnYi5yZWFkVUVHKClcbiAgICBsZXQgcGljX29yZGVyX2NudF90eXBlID0gZ2IucmVhZFVFRygpXG4gICAgaWYgKHBpY19vcmRlcl9jbnRfdHlwZSA9PT0gMCkge1xuICAgICAgZ2IucmVhZFVFRygpXG4gICAgfSBlbHNlIGlmIChwaWNfb3JkZXJfY250X3R5cGUgPT09IDEpIHtcbiAgICAgIGdiLnJlYWRCaXRzKDEpXG4gICAgICBnYi5yZWFkU0VHKClcbiAgICAgIGdiLnJlYWRTRUcoKVxuICAgICAgbGV0IG51bV9yZWZfZnJhbWVzX2luX3BpY19vcmRlcl9jbnRfY3ljbGUgPSBnYi5yZWFkVUVHKClcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtX3JlZl9mcmFtZXNfaW5fcGljX29yZGVyX2NudF9jeWNsZTsgaSsrKSB7XG4gICAgICAgIGdiLnJlYWRTRUcoKVxuICAgICAgfVxuICAgIH1cbiAgICBnYi5yZWFkVUVHKClcbiAgICBnYi5yZWFkQml0cygxKVxuXG4gICAgbGV0IHBpY193aWR0aF9pbl9tYnNfbWludXMxID0gZ2IucmVhZFVFRygpXG4gICAgbGV0IHBpY19oZWlnaHRfaW5fbWFwX3VuaXRzX21pbnVzMSA9IGdiLnJlYWRVRUcoKVxuXG4gICAgbGV0IGZyYW1lX21ic19vbmx5X2ZsYWcgPSBnYi5yZWFkQml0cygxKVxuICAgIGlmIChmcmFtZV9tYnNfb25seV9mbGFnID09PSAwKSB7XG4gICAgICBnYi5yZWFkQml0cygxKVxuICAgIH1cbiAgICBnYi5yZWFkQml0cygxKVxuXG4gICAgbGV0IGZyYW1lX2Nyb3BfbGVmdF9vZmZzZXQgPSAwXG4gICAgbGV0IGZyYW1lX2Nyb3BfcmlnaHRfb2Zmc2V0ID0gMFxuICAgIGxldCBmcmFtZV9jcm9wX3RvcF9vZmZzZXQgPSAwXG4gICAgbGV0IGZyYW1lX2Nyb3BfYm90dG9tX29mZnNldCA9IDBcblxuICAgIGxldCBmcmFtZV9jcm9wcGluZ19mbGFnID0gZ2IucmVhZEJvb2woKVxuICAgIGlmIChmcmFtZV9jcm9wcGluZ19mbGFnKSB7XG4gICAgICBmcmFtZV9jcm9wX2xlZnRfb2Zmc2V0ID0gZ2IucmVhZFVFRygpXG4gICAgICBmcmFtZV9jcm9wX3JpZ2h0X29mZnNldCA9IGdiLnJlYWRVRUcoKVxuICAgICAgZnJhbWVfY3JvcF90b3Bfb2Zmc2V0ID0gZ2IucmVhZFVFRygpXG4gICAgICBmcmFtZV9jcm9wX2JvdHRvbV9vZmZzZXQgPSBnYi5yZWFkVUVHKClcbiAgICB9XG5cbiAgICBsZXQgcGFyX3dpZHRoID0gMSwgcGFyX2hlaWdodCA9IDFcbiAgICBsZXQgZnBzID0gMCwgZnBzX2ZpeGVkID0gdHJ1ZSwgZnBzX251bSA9IDAsIGZwc19kZW4gPSAwXG5cbiAgICBsZXQgdnVpX3BhcmFtZXRlcnNfcHJlc2VudF9mbGFnID0gZ2IucmVhZEJvb2woKVxuICAgIGlmICh2dWlfcGFyYW1ldGVyc19wcmVzZW50X2ZsYWcpIHtcbiAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7IC8vIGFzcGVjdF9yYXRpb19pbmZvX3ByZXNlbnRfZmxhZ1xuICAgICAgICBsZXQgYXNwZWN0X3JhdGlvX2lkYyA9IGdiLnJlYWRCeXRlKClcbiAgICAgICAgbGV0IHBhcl93X3RhYmxlID0gWzEsIDEyLCAxMCwgMTYsIDQwLCAyNCwgMjAsIDMyLCA4MCwgMTgsIDE1LCA2NCwgMTYwLCA0LCAzLCAyXVxuICAgICAgICBsZXQgcGFyX2hfdGFibGUgPSBbMSwgMTEsIDExLCAxMSwgMzMsIDExLCAxMSwgMTEsIDMzLCAxMSwgMTEsIDMzLCA5OSwgMywgMiwgMV1cblxuICAgICAgICBpZiAoYXNwZWN0X3JhdGlvX2lkYyA+IDAgJiYgYXNwZWN0X3JhdGlvX2lkYyA8IDE2KSB7XG4gICAgICAgICAgcGFyX3dpZHRoID0gcGFyX3dfdGFibGVbYXNwZWN0X3JhdGlvX2lkYyAtIDFdXG4gICAgICAgICAgcGFyX2hlaWdodCA9IHBhcl9oX3RhYmxlW2FzcGVjdF9yYXRpb19pZGMgLSAxXVxuICAgICAgICB9IGVsc2UgaWYgKGFzcGVjdF9yYXRpb19pZGMgPT09IDI1NSkge1xuICAgICAgICAgIHBhcl93aWR0aCA9IGdiLnJlYWRCeXRlKCkgPDwgOCB8IGdiLnJlYWRCeXRlKClcbiAgICAgICAgICBwYXJfaGVpZ2h0ID0gZ2IucmVhZEJ5dGUoKSA8PCA4IHwgZ2IucmVhZEJ5dGUoKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgIGdiLnJlYWRCb29sKClcbiAgICAgIH1cbiAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgIGdiLnJlYWRCaXRzKDQpXG4gICAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgICAgZ2IucmVhZEJpdHMoMjQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgIGdiLnJlYWRVRUcoKVxuICAgICAgICBnYi5yZWFkVUVHKClcbiAgICAgIH1cbiAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgIGxldCBudW1fdW5pdHNfaW5fdGljayA9IGdiLnJlYWRCaXRzKDMyKVxuICAgICAgICBsZXQgdGltZV9zY2FsZSA9IGdiLnJlYWRCaXRzKDMyKVxuICAgICAgICBmcHNfZml4ZWQgPSBnYi5yZWFkQm9vbCgpXG5cbiAgICAgICAgZnBzX251bSA9IHRpbWVfc2NhbGVcbiAgICAgICAgZnBzX2RlbiA9IG51bV91bml0c19pbl90aWNrICogMlxuICAgICAgICBmcHMgPSBmcHNfbnVtIC8gZnBzX2RlblxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBwYXJTY2FsZSA9IDFcbiAgICBpZiAocGFyX3dpZHRoICE9PSAxIHx8IHBhcl9oZWlnaHQgIT09IDEpIHtcbiAgICAgIHBhclNjYWxlID0gcGFyX3dpZHRoIC8gcGFyX2hlaWdodFxuICAgIH1cblxuICAgIGxldCBjcm9wX3VuaXRfeCA9IDAsIGNyb3BfdW5pdF95ID0gMFxuICAgIGlmIChjaHJvbWFfZm9ybWF0X2lkYyA9PT0gMCkge1xuICAgICAgY3JvcF91bml0X3ggPSAxXG4gICAgICBjcm9wX3VuaXRfeSA9IDIgLSBmcmFtZV9tYnNfb25seV9mbGFnXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBzdWJfd2MgPSAoY2hyb21hX2Zvcm1hdF9pZGMgPT09IDMpID8gMSA6IDJcbiAgICAgIGxldCBzdWJfaGMgPSAoY2hyb21hX2Zvcm1hdF9pZGMgPT09IDEpID8gMiA6IDFcbiAgICAgIGNyb3BfdW5pdF94ID0gc3ViX3djXG4gICAgICBjcm9wX3VuaXRfeSA9IHN1Yl9oYyAqICgyIC0gZnJhbWVfbWJzX29ubHlfZmxhZylcbiAgICB9XG5cbiAgICBsZXQgY29kZWNfd2lkdGggPSAocGljX3dpZHRoX2luX21ic19taW51czEgKyAxKSAqIDE2XG4gICAgbGV0IGNvZGVjX2hlaWdodCA9ICgyIC0gZnJhbWVfbWJzX29ubHlfZmxhZykgKiAoKHBpY19oZWlnaHRfaW5fbWFwX3VuaXRzX21pbnVzMSArIDEpICogMTYpXG5cbiAgICBjb2RlY193aWR0aCAtPSAoZnJhbWVfY3JvcF9sZWZ0X29mZnNldCArIGZyYW1lX2Nyb3BfcmlnaHRfb2Zmc2V0KSAqIGNyb3BfdW5pdF94XG4gICAgY29kZWNfaGVpZ2h0IC09IChmcmFtZV9jcm9wX3RvcF9vZmZzZXQgKyBmcmFtZV9jcm9wX2JvdHRvbV9vZmZzZXQpICogY3JvcF91bml0X3lcblxuICAgIGxldCBwcmVzZW50X3dpZHRoID0gTWF0aC5jZWlsKGNvZGVjX3dpZHRoICogcGFyU2NhbGUpXG5cbiAgICBnYi5kZXN0cm95KClcbiAgICBnYiA9IG51bGxcblxuICAgIHJldHVybiB7XG4gICAgICBwcm9maWxlX3N0cmluZzogcHJvZmlsZV9zdHJpbmcsXG4gICAgICBsZXZlbF9zdHJpbmc6IGxldmVsX3N0cmluZyxcbiAgICAgIGJpdF9kZXB0aDogYml0X2RlcHRoLFxuICAgICAgY2hyb21hX2Zvcm1hdDogY2hyb21hX2Zvcm1hdCxcbiAgICAgIGNocm9tYV9mb3JtYXRfc3RyaW5nOiBTUFNQYXJzZXIuZ2V0Q2hyb21hRm9ybWF0U3RyaW5nKGNocm9tYV9mb3JtYXQpLFxuXG4gICAgICBmcmFtZV9yYXRlOiB7XG4gICAgICAgIGZpeGVkOiBmcHNfZml4ZWQsXG4gICAgICAgIGZwczogZnBzLFxuICAgICAgICBmcHNfZGVuOiBmcHNfZGVuLFxuICAgICAgICBmcHNfbnVtOiBmcHNfbnVtXG4gICAgICB9LFxuXG4gICAgICBwYXJfcmF0aW86IHtcbiAgICAgICAgd2lkdGg6IHBhcl93aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBwYXJfaGVpZ2h0XG4gICAgICB9LFxuXG4gICAgICBjb2RlY19zaXplOiB7XG4gICAgICAgIHdpZHRoOiBjb2RlY193aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBjb2RlY19oZWlnaHRcbiAgICAgIH0sXG5cbiAgICAgIHByZXNlbnRfc2l6ZToge1xuICAgICAgICB3aWR0aDogcHJlc2VudF93aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBjb2RlY19oZWlnaHRcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgX3NraXBTY2FsaW5nTGlzdCAoZ2IsIGNvdW50KSB7XG4gICAgbGV0IGxhc3Rfc2NhbGUgPSA4LCBuZXh0X3NjYWxlID0gOFxuICAgIGxldCBkZWx0YV9zY2FsZSA9IDBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgIGlmIChuZXh0X3NjYWxlICE9PSAwKSB7XG4gICAgICAgIGRlbHRhX3NjYWxlID0gZ2IucmVhZFNFRygpXG4gICAgICAgIG5leHRfc2NhbGUgPSAobGFzdF9zY2FsZSArIGRlbHRhX3NjYWxlICsgMjU2KSAlIDI1NlxuICAgICAgfVxuICAgICAgbGFzdF9zY2FsZSA9IChuZXh0X3NjYWxlID09PSAwKSA/IGxhc3Rfc2NhbGUgOiBuZXh0X3NjYWxlXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldFByb2ZpbGVTdHJpbmcgKHByb2ZpbGVJZGMpIHtcbiAgICBzd2l0Y2ggKHByb2ZpbGVJZGMpIHtcbiAgICAgIGNhc2UgNjY6XG4gICAgICAgIHJldHVybiAnQmFzZWxpbmUnXG4gICAgICBjYXNlIDc3OlxuICAgICAgICByZXR1cm4gJ01haW4nXG4gICAgICBjYXNlIDg4OlxuICAgICAgICByZXR1cm4gJ0V4dGVuZGVkJ1xuICAgICAgY2FzZSAxMDA6XG4gICAgICAgIHJldHVybiAnSGlnaCdcbiAgICAgIGNhc2UgMTEwOlxuICAgICAgICByZXR1cm4gJ0hpZ2gxMCdcbiAgICAgIGNhc2UgMTIyOlxuICAgICAgICByZXR1cm4gJ0hpZ2g0MjInXG4gICAgICBjYXNlIDI0NDpcbiAgICAgICAgcmV0dXJuICdIaWdoNDQ0J1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICdVbmtub3duJ1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRMZXZlbFN0cmluZyAobGV2ZWxJZGMpIHtcbiAgICByZXR1cm4gKGxldmVsSWRjIC8gMTApLnRvRml4ZWQoMSlcbiAgfVxuXG4gIHN0YXRpYyBnZXRDaHJvbWFGb3JtYXRTdHJpbmcgKGNocm9tYSkge1xuICAgIHN3aXRjaCAoY2hyb21hKSB7XG4gICAgICBjYXNlIDQyMDpcbiAgICAgICAgcmV0dXJuICc0OjI6MCdcbiAgICAgIGNhc2UgNDIyOlxuICAgICAgICByZXR1cm4gJzQ6MjoyJ1xuICAgICAgY2FzZSA0NDQ6XG4gICAgICAgIHJldHVybiAnNDo0OjQnXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ1Vua25vd24nXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHRvVmlkZW9NZXRhIChzcHNDb25maWcpIHtcbiAgICBsZXQgbWV0YSA9IHt9XG4gICAgaWYgKHNwc0NvbmZpZyAmJiBzcHNDb25maWcuY29kZWNfc2l6ZSkge1xuICAgICAgbWV0YS5jb2RlY1dpZHRoID0gc3BzQ29uZmlnLmNvZGVjX3NpemUud2lkdGhcbiAgICAgIG1ldGEuY29kZWNIZWlnaHQgPSBzcHNDb25maWcuY29kZWNfc2l6ZS5oZWlnaHRcbiAgICAgIG1ldGEucHJlc2VudFdpZHRoID0gc3BzQ29uZmlnLnByZXNlbnRfc2l6ZS53aWR0aFxuICAgICAgbWV0YS5wcmVzZW50SGVpZ2h0ID0gc3BzQ29uZmlnLnByZXNlbnRfc2l6ZS5oZWlnaHRcbiAgICB9XG5cbiAgICBtZXRhLnByb2ZpbGUgPSBzcHNDb25maWcucHJvZmlsZV9zdHJpbmdcbiAgICBtZXRhLmxldmVsID0gc3BzQ29uZmlnLmxldmVsX3N0cmluZ1xuICAgIG1ldGEuYml0RGVwdGggPSBzcHNDb25maWcuYml0X2RlcHRoXG4gICAgbWV0YS5jaHJvbWFGb3JtYXQgPSBzcHNDb25maWcuY2hyb21hX2Zvcm1hdFxuXG4gICAgbWV0YS5wYXJSYXRpbyA9IHtcbiAgICAgIHdpZHRoOiBzcHNDb25maWcucGFyX3JhdGlvLndpZHRoLFxuICAgICAgaGVpZ2h0OiBzcHNDb25maWcucGFyX3JhdGlvLmhlaWdodFxuICAgIH1cblxuICAgIG1ldGEuZnJhbWVSYXRlID0gc3BzQ29uZmlnLmZyYW1lX3JhdGVcblxuICAgIGxldCBmcHNEZW4gPSBtZXRhLmZyYW1lUmF0ZS5mcHNfZGVuXG4gICAgbGV0IGZwc051bSA9IG1ldGEuZnJhbWVSYXRlLmZwc19udW1cbiAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uID0gTWF0aC5mbG9vcihtZXRhLnRpbWVzY2FsZSAqIChmcHNEZW4gLyBmcHNOdW0pKVxuXG4gICAgcmV0dXJuIG1ldGE7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU1BTUGFyc2VyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gSExTXG4gIE0zVThQYXJzZXI6IHJlcXVpcmUoJy4vc3JjL2hscy9kZW11eGVyL20zdThwYXJzZXInKS5kZWZhdWx0LFxuICBUc0RlbXV4ZXI6IHJlcXVpcmUoJy4vc3JjL2hscy9kZW11eGVyL3RzJykuZGVmYXVsdCxcbiAgUGxheWxpc3Q6IHJlcXVpcmUoJy4vc3JjL2hscy9wbGF5bGlzdCcpLmRlZmF1bHQsXG4gIEZsdkRlbXV4ZXI6IHJlcXVpcmUoJy4vc3JjL2Zsdi9pbmRleCcpLmRlZmF1bHRcbn07XG4iLCJpbXBvcnQgeyBpc0xlLCBVVEY4IH0gZnJvbSAneGdwbGF5ZXItdXRpbHMnXG5cbmNvbnN0IERBVEFfVFlQRVMgPSB7XG4gIE5VTUJFUjogMCxcbiAgQk9PTEVBTjogMSxcbiAgU1RSSU5HOiAyLFxuICBPQkpFQ1Q6IDMsXG4gIE1JWF9BUlJBWTogOCxcbiAgT0JKRUNUX0VORDogOSxcbiAgU1RSSUNUX0FSUkFZOiAxMCxcbiAgREFURTogMTEsXG4gIExPTkVfU1RSSU5HOiAxMlxufVxuXG4vKipcbiAqIG1ldGHkv6Hmga/op6PmnpBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQU1GUGFyc2VyIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMub2Zmc2V0ID0gMFxuICAgIHRoaXMucmVhZE9mZnNldCA9IHRoaXMub2Zmc2V0XG4gIH1cblxuICByZXNvbHZlIChtZXRhLCBzaXplKSB7XG4gICAgaWYgKHNpemUgPCAzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBlbm91Z2ggZGF0YSBmb3IgbWV0YWluZm8nKVxuICAgIH1cbiAgICBjb25zdCBtZXRhRGF0YSA9IHt9XG4gICAgY29uc3QgbmFtZSA9IHRoaXMucGFyc2VWYWx1ZShtZXRhKVxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5wYXJzZVZhbHVlKG1ldGEsIHNpemUgLSBuYW1lLmJvZHlTaXplKVxuICAgIG1ldGFEYXRhW25hbWUuZGF0YV0gPSB2YWx1ZS5kYXRhXG5cbiAgICB0aGlzLnJlc2V0U3RhdHVzKClcbiAgICByZXR1cm4gbWV0YURhdGFcbiAgfVxuXG4gIHJlc2V0U3RhdHVzICgpIHtcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgICB0aGlzLnJlYWRPZmZzZXQgPSB0aGlzLm9mZnNldFxuICB9XG5cbiAgcGFyc2VTdHJpbmcgKGJ1ZmZlcikge1xuICAgIGNvbnN0IGR2ID0gbmV3IERhdGFWaWV3KGJ1ZmZlciwgdGhpcy5yZWFkT2Zmc2V0KVxuICAgIGNvbnN0IHN0ckxlbiA9IGR2LmdldFVpbnQxNigwLCAhaXNMZSlcbiAgICBsZXQgc3RyID0gJydcbiAgICBpZiAoc3RyTGVuID4gMCkge1xuICAgICAgc3RyID0gVVRGOC5kZWNvZGUobmV3IFVpbnQ4QXJyYXkoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQgKyAyLCBzdHJMZW4pKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSAnJ1xuICAgIH1cbiAgICBsZXQgc2l6ZSA9IHN0ckxlbiArIDJcbiAgICB0aGlzLnJlYWRPZmZzZXQgKz0gc2l6ZVxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBzdHIsXG4gICAgICBib2R5U2l6ZTogc3RyTGVuICsgMlxuICAgIH1cbiAgfVxuXG4gIHBhcnNlRGF0ZSAoYnVmZmVyLCBzaXplKSB7XG4gICAgY29uc3QgZHYgPSBuZXcgRGF0YVZpZXcoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQsIHNpemUpXG4gICAgbGV0IHRzID0gZHYuZ2V0RmxvYXQ2NCgwLCAhaXNMZSlcbiAgICBjb25zdCB0aW1lT2Zmc2V0ID0gZHYuZ2V0SW50MTYoOCwgIWlzTGUpXG4gICAgdHMgKz0gdGltZU9mZnNldCAqIDYwICogMTAwMFxuXG4gICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDEwXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IG5ldyBEYXRlKHRzKSxcbiAgICAgIGJvZHlTaXplOiAxMFxuICAgIH1cbiAgfVxuXG4gIHBhcnNlT2JqZWN0IChidWZmZXIsIHNpemUpIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5wYXJzZVN0cmluZyhidWZmZXIsIHNpemUpXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnBhcnNlVmFsdWUoYnVmZmVyLCBzaXplIC0gbmFtZS5ib2R5U2l6ZSlcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YToge1xuICAgICAgICBuYW1lOiBuYW1lLmRhdGEsXG4gICAgICAgIHZhbHVlOiB2YWx1ZS5kYXRhXG4gICAgICB9LFxuICAgICAgYm9keVNpemU6IG5hbWUuYm9keVNpemUgKyB2YWx1ZS5ib2R5U2l6ZSxcbiAgICAgIGlzT2JqRW5kOiB2YWx1ZS5pc09iakVuZFxuICAgIH1cbiAgfVxuXG4gIHBhcnNlTG9uZ1N0cmluZyAoYnVmZmVyKSB7XG4gICAgY29uc3QgZHYgPSBuZXcgRGF0YVZpZXcoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQpXG4gICAgY29uc3Qgc3RyTGVuID0gZHYuZ2V0VWludDMyKDAsICFpc0xlKVxuICAgIGxldCBzdHIgPSAnJ1xuICAgIGlmIChzdHJMZW4gPiAwKSB7XG4gICAgICBzdHIgPSBVVEY4LmRlY29kZShuZXcgVWludDhBcnJheShidWZmZXIsIHRoaXMucmVhZE9mZnNldCArIDIsIHN0ckxlbikpXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9ICcnXG4gICAgfVxuICAgIC8vIGNvbnN0IHNpemUgPSBzdHJMZW4gKyA0O1xuICAgIHRoaXMucmVhZE9mZnNldCArPSBzdHJMZW4gKyA0XG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IHN0cixcbiAgICAgIGJvZHlTaXplOiBzdHJMZW4gKyA0XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOino+aekG1ldGHkuK3nmoTlj5jph49cbiAgICovXG4gIHBhcnNlVmFsdWUgKGRhdGEsIHNpemUpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKClcbiAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICBidWZmZXIgPSBkYXRhXG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1ZmZlciA9IGRhdGEuYnVmZmVyXG4gICAgfVxuICAgIGNvbnN0IHtcbiAgICAgIE5VTUJFUixcbiAgICAgIEJPT0xFQU4sXG4gICAgICBTVFJJTkcsXG4gICAgICBPQkpFQ1QsXG4gICAgICBNSVhfQVJSQVksXG4gICAgICBPQkpFQ1RfRU5ELFxuICAgICAgU1RSSUNUX0FSUkFZLFxuICAgICAgREFURSxcbiAgICAgIExPTkVfU1RSSU5HXG4gICAgfSA9IERBVEFfVFlQRVNcbiAgICBjb25zdCBkYXRhVmlldyA9IG5ldyBEYXRhVmlldyhidWZmZXIsIHRoaXMucmVhZE9mZnNldCwgc2l6ZSlcbiAgICBsZXQgaXNPYmpFbmQgPSBmYWxzZVxuICAgIGNvbnN0IHR5cGUgPSBkYXRhVmlldy5nZXRVaW50OCgwKVxuICAgIGxldCBvZmZzZXQgPSAxXG4gICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDFcbiAgICBsZXQgdmFsdWUgPSBudWxsXG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgTlVNQkVSOiB7XG4gICAgICAgIHZhbHVlID0gZGF0YVZpZXcuZ2V0RmxvYXQ2NCgxLCAhaXNMZSlcbiAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDhcbiAgICAgICAgb2Zmc2V0ICs9IDhcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGNhc2UgQk9PTEVBTjoge1xuICAgICAgICBjb25zdCBib29sTnVtID0gZGF0YVZpZXcuZ2V0VWludDgoMSlcbiAgICAgICAgdmFsdWUgPSAhIWJvb2xOdW1cbiAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDFcbiAgICAgICAgb2Zmc2V0ICs9IDFcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGNhc2UgU1RSSU5HOiB7XG4gICAgICAgIGNvbnN0IHN0ciA9IHRoaXMucGFyc2VTdHJpbmcoYnVmZmVyKVxuICAgICAgICB2YWx1ZSA9IHN0ci5kYXRhXG4gICAgICAgIG9mZnNldCArPSBzdHIuYm9keVNpemVcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGNhc2UgT0JKRUNUOiB7XG4gICAgICAgIHZhbHVlID0ge31cbiAgICAgICAgbGV0IG9iakVuZFNpemUgPSAwXG4gICAgICAgIGlmIChkYXRhVmlldy5nZXRVaW50MzIoc2l6ZSAtIDQsICFpc0xlKSAmIDB4MDBGRkZGRkYpIHtcbiAgICAgICAgICBvYmpFbmRTaXplID0gM1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMucmVhZE9mZnNldCArPSBvZmZzZXQgLSAxO1xuICAgICAgICB3aGlsZSAob2Zmc2V0IDwgc2l6ZSAtIDQpIHtcbiAgICAgICAgICBjb25zdCBhbWZPYmogPSB0aGlzLnBhcnNlT2JqZWN0KGJ1ZmZlciwgc2l6ZSAtIG9mZnNldCAtIG9iakVuZFNpemUpXG4gICAgICAgICAgaWYgKGFtZk9iai5pc09iamVjdEVuZCkgeyBicmVhayB9XG4gICAgICAgICAgdmFsdWVbYW1mT2JqLmRhdGEubmFtZV0gPSBhbWZPYmouZGF0YS52YWx1ZVxuICAgICAgICAgIG9mZnNldCArPSBhbWZPYmouYm9keVNpemVcbiAgICAgICAgfVxuICAgICAgICBpZiAob2Zmc2V0IDw9IHNpemUgLSAzKSB7XG4gICAgICAgICAgY29uc3QgbWFyayA9IGRhdGFWaWV3LmdldFVpbnQzMihvZmZzZXQgLSAxLCAhaXNMZSkgJiAweDAwRkZGRkZGXG4gICAgICAgICAgaWYgKG1hcmsgPT09IDkpIHtcbiAgICAgICAgICAgIHRoaXMucmVhZE9mZnNldCArPSAzXG4gICAgICAgICAgICBvZmZzZXQgKz0gM1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgY2FzZSBNSVhfQVJSQVk6IHtcbiAgICAgICAgdmFsdWUgPSB7fVxuICAgICAgICBvZmZzZXQgKz0gNFxuICAgICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gNFxuICAgICAgICBsZXQgb2JqRW5kU2l6ZSA9IDBcbiAgICAgICAgaWYgKChkYXRhVmlldy5nZXRVaW50MzIoc2l6ZSAtIDQsICFpc0xlKSAmIDB4MDBGRkZGRkYpID09PSA5KSB7XG4gICAgICAgICAgb2JqRW5kU2l6ZSA9IDNcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChvZmZzZXQgPCBzaXplIC0gOCkge1xuICAgICAgICAgIGNvbnN0IGFtZlZhciA9IHRoaXMucGFyc2VPYmplY3QoYnVmZmVyLCBzaXplIC0gb2Zmc2V0IC0gb2JqRW5kU2l6ZSlcbiAgICAgICAgICBpZiAoYW1mVmFyLmlzT2JqZWN0RW5kKSB7IGJyZWFrIH1cbiAgICAgICAgICB2YWx1ZVthbWZWYXIuZGF0YS5uYW1lXSA9IGFtZlZhci5kYXRhLnZhbHVlXG4gICAgICAgICAgb2Zmc2V0ICs9IGFtZlZhci5ib2R5U2l6ZVxuICAgICAgICB9XG4gICAgICAgIGlmIChvZmZzZXQgPD0gc2l6ZSAtIDMpIHtcbiAgICAgICAgICBjb25zdCBtYXJrZXIgPSBkYXRhVmlldy5nZXRVaW50MzIob2Zmc2V0IC0gMSwgIWlzTGUpICYgMHgwMEZGRkZGRlxuICAgICAgICAgIGlmIChtYXJrZXIgPT09IDkpIHtcbiAgICAgICAgICAgIG9mZnNldCArPSAzXG4gICAgICAgICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gM1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBjYXNlIE9CSkVDVF9FTkQ6IHtcbiAgICAgICAgdmFsdWUgPSBudWxsXG4gICAgICAgIGlzT2JqRW5kID0gdHJ1ZVxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBjYXNlIFNUUklDVF9BUlJBWToge1xuICAgICAgICB2YWx1ZSA9IFtdXG4gICAgICAgIGNvbnN0IGFyckxlbmd0aCA9IGRhdGFWaWV3LmdldFVpbnQzMigxLCAhaXNMZSlcbiAgICAgICAgb2Zmc2V0ICs9IDRcbiAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDRcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IHNjcmlwdCA9IHRoaXMucGFyc2VWYWx1ZShidWZmZXIsIHNpemUgLSBvZmZzZXQpXG4gICAgICAgICAgdmFsdWUucHVzaChzY3JpcHQuZGF0YSlcbiAgICAgICAgICBvZmZzZXQgKz0gc2NyaXB0LmJvZHlTaXplXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgY2FzZSBEQVRFOiB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSB0aGlzLnBhcnNlRGF0ZShidWZmZXIsIHNpemUgLSAxKVxuICAgICAgICB2YWx1ZSA9IGRhdGUuZGF0YVxuICAgICAgICBvZmZzZXQgKz0gZGF0ZS5ib2R5U2l6ZVxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBjYXNlIExPTkVfU1RSSU5HOiB7XG4gICAgICAgIGNvbnN0IGxvbmdTdHIgPSB0aGlzLnBhcnNlTG9uZ1N0cmluZyhidWZmZXIsIHNpemUgLSAxKVxuICAgICAgICB2YWx1ZSA9IGxvbmdTdHIuZGF0YVxuICAgICAgICBvZmZzZXQgKz0gbG9uZ1N0ci5ib2R5U2l6ZVxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIG9mZnNldCA9IHNpemVcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogdmFsdWUsXG4gICAgICBib2R5U2l6ZTogb2Zmc2V0LFxuICAgICAgaXNPYmpFbmQ6IGlzT2JqRW5kXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBFVkVOVFMsIEF1ZGlvVHJhY2tNZXRhLCBWaWRlb1RyYWNrTWV0YSB9IGZyb20gJ3hncGxheWVyLXV0aWxzJztcbmltcG9ydCB7IFNwc1BhcnNlciB9IGZyb20gJ3hncGxheWVyLWNvZGVjJztcbmltcG9ydCB7IFZpZGVvVHJhY2ssIEF1ZGlvVHJhY2sgfSBmcm9tICd4Z3BsYXllci1idWZmZXInXG5cbmltcG9ydCBBTUZQYXJzZXIgZnJvbSAnLi9hbWYtcGFyc2VyJ1xuXG5jb25zdCBERU1VWF9FVkVOVFMgPSBFVkVOVFMuREVNVVhfRVZFTlRTO1xuXG5jbGFzcyBGbHZEZW11eGVyIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuX2ZpcnN0RnJhZ21lbnRMb2FkZWQgPSBmYWxzZVxuICAgIHRoaXMuX3RyYWNrTnVtID0gMFxuICAgIHRoaXMuX2hhc1NjcmlwdCA9IGZhbHNlXG4gIH1cblxuICBpbml0ICgpIHtcbiAgICB0aGlzLm9uKERFTVVYX0VWRU5UUy5ERU1VWF9TVEFSVCwgdGhpcy5kb1BhcnNlRmx2LmJpbmQodGhpcykpXG4gIH1cblxuICAvKipcbiAgICogaWYgdGhlIGZsdiBoZWFkIGlzIHZhbGlkXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgc3RhdGljIGlzRmx2RmlsZSAoZGF0YSkge1xuICAgIHJldHVybiAhKGRhdGFbMF0gIT09IDB4NDYgfHwgZGF0YVsxXSAhPT0gMHg0QyB8fCBkYXRhWzJdICE9PSAweDU2IHx8IGRhdGFbM10gIT09IDB4MDEpXG4gIH1cblxuICAvKipcbiAgICogSWYgdGhlIHN0cmVhbSBoYXMgYXVkaW8gb3IgdmlkZW8uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzdHJlYW1GbGFnIC0gRGF0YSBmcm9tIHRoZSBzdHJlYW0gd2hpY2ggaXMgZGVmaW5lIHdoZXRoZXIgdGhlIGF1ZGlvIC8gdmlkZW8gdHJhY2sgaXMgZXhpc3QuXG4gICAqL1xuICBzdGF0aWMgZ2V0UGxheVR5cGUgKHN0cmVhbUZsYWcpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICBoYXNWaWRlbzogZmFsc2UsXG4gICAgICBoYXNBdWRpbzogZmFsc2VcbiAgICB9XG5cbiAgICBpZiAoc3RyZWFtRmxhZyAmIDB4MDEgPiAwKSB7XG4gICAgICByZXN1bHQuaGFzVmlkZW8gPSB0cnVlXG4gICAgfVxuXG4gICAgaWYgKHN0cmVhbUZsYWcgJiAweDA0ID4gMCkge1xuICAgICAgcmVzdWx0Lmhhc0F1ZGlvID0gdHJ1ZVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIGRvUGFyc2VGbHYgKCkge1xuICAgIGlmICghdGhpcy5fZmlyc3RGcmFnbWVudExvYWRlZCkge1xuICAgICAgaWYgKHRoaXMubG9hZGVyQnVmZmVyLmxlbmd0aCA8IDEzKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgY29uc3QgaGVhZGVyID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMTMpXG4gICAgICB0aGlzLnBhcnNlRmx2SGVhZGVyKGhlYWRlcilcbiAgICAgIHRoaXMuZG9QYXJzZUZsdigpIC8vIOmAkuW9kuiwg+eUqO+8jOe7p+e7reino+aekGZsdua1gVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5sb2FkZXJCdWZmZXIubGVuZ3RoIDwgMTEpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBsZXQgY2h1bms7XG4gICAgICBkbyB7XG4gICAgICAgIGNodW5rID0gdGhpcy5fcGFyc2VGbHZUYWcoKVxuICAgICAgfSB3aGlsZSAoY2h1bmspXG5cbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfQ09NUExFVEUpXG4gICAgfVxuICB9XG5cbiAgcGFyc2VGbHZIZWFkZXIgKGhlYWRlcikge1xuICAgIGlmICghRmx2RGVtdXhlci5pc0ZsdkZpbGUoaGVhZGVyKSkge1xuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgbmV3IEVycm9yKCdpbnZhbGlkIGZsdiBmaWxlJykpXG4gICAgICB0aGlzLmRvUGFyc2VGbHYoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9maXJzdEZyYWdtZW50TG9hZGVkID0gdHJ1ZVxuICAgICAgY29uc3QgcGxheVR5cGUgPSBGbHZEZW11eGVyLmdldFBsYXlUeXBlKGhlYWRlcls0XSlcblxuICAgICAgaWYgKHBsYXlUeXBlLmhhc1ZpZGVvKSB7XG4gICAgICAgIHRoaXMuaW5pdFZpZGVvVHJhY2soKVxuICAgICAgfVxuXG4gICAgICBpZiAocGxheVR5cGUuaGFzQXVkaW8pIHtcbiAgICAgICAgdGhpcy5pbml0QXVkaW9UcmFjaygpXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZG9QYXJzZUZsdigpXG4gIH1cblxuICAvKipcbiAgICogaW5pdCBkZWZhdWx0IHZpZGVvIHRyYWNrIGNvbmZpZ3NcbiAgICovXG4gIGluaXRWaWRlb1RyYWNrICgpIHtcbiAgICB0aGlzLl90cmFja051bSsrXG4gICAgbGV0IHZpZGVvVHJhY2sgPSBuZXcgVmlkZW9UcmFjaygpXG4gICAgdmlkZW9UcmFjay5tZXRhID0gbmV3IFZpZGVvVHJhY2tNZXRhKClcbiAgICB2aWRlb1RyYWNrLmlkID0gdmlkZW9UcmFjay5tZXRhLmlkID0gdGhpcy5fdHJhY2tOdW1cblxuICAgIHRoaXMudHJhY2tzLnZpZGVvVHJhY2sgPSB2aWRlb1RyYWNrXG4gIH1cblxuICAvKipcbiAgICogaW5pdCBkZWZhdWx0IGF1ZGlvIHRyYWNrIGNvbmZpZ3NcbiAgICovXG4gIGluaXRBdWRpb1RyYWNrICgpIHtcbiAgICB0aGlzLl90cmFja051bSsrXG4gICAgbGV0IGF1ZGlvVHJhY2sgPSBuZXcgQXVkaW9UcmFjaygpXG4gICAgYXVkaW9UcmFjay5tZXRhID0gbmV3IEF1ZGlvVHJhY2tNZXRhKClcbiAgICBhdWRpb1RyYWNrLmlkID0gYXVkaW9UcmFjay5tZXRhLmlkID0gdGhpcy5fdHJhY2tOdW1cblxuICAgIHRoaXMudHJhY2tzLmF1ZGlvVHJhY2sgPSBhdWRpb1RyYWNrXG4gIH1cblxuICAvKipcbiAgICogUGFja2FnZSB0aGUgZGF0YSBhcyB0aGUgZm9sbG93aW5nIGRhdGEgc3RydWN0dXJlXG4gICAqIHtcbiAgICogICAgZGF0YTogVWludDhBcnJheS4gdGhlIFN0cmVhbSBkYXRhLlxuICAgKiAgICBpbmZvOiBUaGUgZmlyc3QgYnl0ZSBpbmZvIG9mIHRoZSBUYWcuXG4gICAqICAgIHRhZ1R5cGU6IDjjgIE544CBMThcbiAgICogICAgdGltZVN0YW1wOiB0aGUgdGltZXN0ZW1wXG4gICAqIH1cbiAgICovXG4gIF9wYXJzZUZsdlRhZyAoKSB7XG4gICAgaWYgKHRoaXMubG9hZGVyQnVmZmVyLmxlbmd0aCA8IDExKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBsZXQgY2h1bmsgPSB0aGlzLl9wYXJzZUZsdlRhZ0hlYWRlcigpXG4gICAgaWYgKGNodW5rKSB7XG4gICAgICB0aGlzLl9wcm9jZXNzQ2h1bmsoY2h1bmspXG4gICAgfVxuICAgIHJldHVybiBjaHVua1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIHRoZSAxMSBieXRlIHRhZyBIZWFkZXJcbiAgICovXG4gIF9wYXJzZUZsdlRhZ0hlYWRlciAoKSB7XG4gICAgbGV0IG9mZnNldCA9IDBcbiAgICBsZXQgY2h1bmsgPSB7fVxuXG4gICAgbGV0IHRhZ1R5cGUgPSB0aGlzLmxvYWRlckJ1ZmZlci50b0ludChvZmZzZXQsIDEpXG4gICAgb2Zmc2V0ICs9IDFcblxuICAgIC8vIDIgYml0IEZNUyByZXNlcnZlZCwgMSBiaXQgZmlsdGVyZWQsIDUgYml0IHRhZyB0eXBlXG4gICAgY2h1bmsuZmlsdGVyZWQgPSAodGFnVHlwZSAmIDMyKSA+Pj4gNVxuICAgIGNodW5rLnRhZ1R5cGUgPSB0YWdUeXBlICYgMzFcblxuICAgIC8vIDMgQnl0ZSBkYXRhc2l6ZVxuICAgIGNodW5rLmRhdGFzaXplID0gdGhpcy5sb2FkZXJCdWZmZXIudG9JbnQob2Zmc2V0LCAzKVxuICAgIG9mZnNldCArPSAzXG5cbiAgICBpZiAoKGNodW5rLnRhZ1R5cGUgIT09IDggJiYgY2h1bmsudGFnVHlwZSAhPT0gOSAmJiBjaHVuay50YWdUeXBlICE9PSAxMSAmJiBjaHVuay50YWdUeXBlICE9PSAxOCkgfHxcbiAgICAgIHRoaXMubG9hZGVyQnVmZmVyLnRvSW50KDgsIDMpICE9PSAwKSB7XG4gICAgICBpZiAodGhpcy5sb2FkZXJCdWZmZXIgJiYgdGhpcy5sb2FkZXJCdWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgxKVxuICAgICAgfVxuICAgICAgdGhpcy5sb2dnZXIud2Fybih0aGlzLlRBRywgJ3RhZ1R5cGUgJyArIGNodW5rLnRhZ1R5cGUpXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIGlmICh0aGlzLmxvYWRlckJ1ZmZlci5sZW5ndGggPCBjaHVuay5kYXRhc2l6ZSArIDE1KSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIC8vIHJlYWQgdGhlIGRhdGEuXG4gICAgdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoNClcblxuICAgIC8vIDMgQnl0ZSB0aW1lc3RhbXBcbiAgICBsZXQgdGltZXN0YW1wID0gdGhpcy5sb2FkZXJCdWZmZXIudG9JbnQoMCwgMylcbiAgICB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgzKVxuXG4gICAgLy8gMSBCeXRlIHRpbWVzdGFtcEV4dFxuICAgIGxldCB0aW1lc3RhbXBFeHQgPSB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgxKVswXVxuICAgIGlmICh0aW1lc3RhbXBFeHQgPiAwKSB7XG4gICAgICB0aW1lc3RhbXAgKz0gdGltZXN0YW1wRXh0ICogMHgxMDAwMDAwXG4gICAgfVxuXG4gICAgY2h1bmsuZHRzID0gdGltZXN0YW1wXG5cbiAgICAvLyBzdHJlYW1JZFxuICAgIHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDMpXG4gICAgcmV0dXJuIGNodW5rXG4gIH1cblxuICBfcHJvY2Vzc0NodW5rIChjaHVuaykge1xuICAgIHN3aXRjaCAoY2h1bmsudGFnVHlwZSkge1xuICAgICAgY2FzZSAxODpcbiAgICAgICAgdGhpcy5fcGFyc2VTY3JpcHREYXRhKGNodW5rKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSA4OlxuICAgICAgICB0aGlzLl9wYXJzZUFBQ0RhdGEoY2h1bmspXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDk6XG4gICAgICAgIHRoaXMuX3BhcnNlSGV2Y0RhdGEoY2h1bmspXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDExOlxuICAgICAgICAvLyBmb3Igc29tZSBDRE4gdGhhdCBkaWQgbm90IHByb2Nlc3MgdGhlIGN1cnJlY3QgUlRNUCBtZXNzYWdlc1xuICAgICAgICB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgzKVxuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcGFyc2UgZmx2IHNjcmlwdCBkYXRhXG4gICAqIEBwYXJhbSBjaHVua1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3BhcnNlU2NyaXB0RGF0YSAoY2h1bmspIHtcbiAgICBsZXQgYXVkaW9UcmFjayA9IHRoaXMudHJhY2tzLmF1ZGlvVHJhY2tcbiAgICBsZXQgdmlkZW9UcmFjayA9IHRoaXMudHJhY2tzLnZpZGVvVHJhY2tcblxuICAgIGxldCBkYXRhID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoY2h1bmsuZGF0YXNpemUpXG5cbiAgICBjb25zdCBpbmZvID0gbmV3IEFNRlBhcnNlcigpLnJlc29sdmUoZGF0YSwgZGF0YS5sZW5ndGgpXG5cbiAgICBjb25zdCBvbk1ldGFEYXRhID0gdGhpcy5fY29udGV4dC5vbk1ldGFEYXRhID0gaW5mbyA/IGluZm8ub25NZXRhRGF0YSA6IHVuZGVmaW5lZFxuXG4gICAgLy8gZmlsbCBtZWRpYUluZm9cbiAgICB0aGlzLl9jb250ZXh0Lm1lZGlhSW5mby5kdXJhdGlvbiA9IG9uTWV0YURhdGEuZHVyYXRpb25cbiAgICB0aGlzLl9jb250ZXh0Lm1lZGlhSW5mby5oYXNWaWRlbyA9IG9uTWV0YURhdGEuaGFzVmlkZW9cbiAgICB0aGlzLl9jb250ZXh0Lm1lZGlhSW5mby5oc2FBdWRpbyA9IG9uTWV0YURhdGEuaGFzQXVkaW9cblxuICAgIGxldCB2YWxpZGF0ZSA9IHRoaXMuX2RhdGFzaXplVmFsaWRhdG9yKGNodW5rLmRhdGFzaXplKVxuICAgIGlmICh2YWxpZGF0ZSkge1xuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRURJQV9JTkZPKVxuICAgICAgdGhpcy5faGFzU2NyaXB0ID0gdHJ1ZVxuICAgIH1cblxuICAgIC8vIEVkaXQgZGVmYXVsdCBtZXRhLlxuICAgIGlmIChhdWRpb1RyYWNrICYmICFhdWRpb1RyYWNrLmhhc1NwZWNpZmljQ29uZmlnKSB7XG4gICAgICBsZXQgbWV0YSA9IGF1ZGlvVHJhY2subWV0YVxuICAgICAgaWYgKG9uTWV0YURhdGEuYXVkaW9zYW1wbGVyYXRlKSB7XG4gICAgICAgIG1ldGEuc2FtcGxlUmF0ZSA9IG9uTWV0YURhdGEuYXVkaW9zYW1wbGVyYXRlXG4gICAgICB9XG5cbiAgICAgIGlmIChvbk1ldGFEYXRhLmF1ZGlvY2hhbm5lbHMpIHtcbiAgICAgICAgbWV0YS5jaGFubmVsQ291bnQgPSBvbk1ldGFEYXRhLmF1ZGlvY2hhbm5lbHNcbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChvbk1ldGFEYXRhLmF1ZGlvc2FtcGxlcmF0ZSkge1xuICAgICAgICBjYXNlIDQ0MTAwOlxuICAgICAgICAgIG1ldGEuc2FtcGxlUmF0ZUluZGV4ID0gNFxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjIwNTA6XG4gICAgICAgICAgbWV0YS5zYW1wbGVSYXRlSW5kZXggPSA3XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAxMTAyNTpcbiAgICAgICAgICBtZXRhLnNhbXBsZVJhdGVJbmRleCA9IDEwXG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHZpZGVvVHJhY2sgJiYgIXZpZGVvVHJhY2suaGFzU3BlY2lmaWNDb25maWcpIHtcbiAgICAgIGxldCBtZXRhID0gdmlkZW9UcmFjay5tZXRhXG4gICAgICBpZiAodHlwZW9mIG9uTWV0YURhdGEuZnJhbWVyYXRlID09PSAnbnVtYmVyJykge1xuICAgICAgICBsZXQgZnBzTnVtID0gTWF0aC5mbG9vcihvbk1ldGFEYXRhLmZyYW1lcmF0ZSAqIDEwMDApXG4gICAgICAgIGlmIChmcHNOdW0gPiAwKSB7XG4gICAgICAgICAgbGV0IGZwcyA9IGZwc051bSAvIDEwMDBcbiAgICAgICAgICBpZiAoIW1ldGEuZnJhbWVSYXRlKSB7XG4gICAgICAgICAgICBtZXRhLmZyYW1lUmF0ZSA9IHt9XG4gICAgICAgICAgfVxuICAgICAgICAgIG1ldGEuZnJhbWVSYXRlLmZpeGVkID0gdHJ1ZVxuICAgICAgICAgIG1ldGEuZnJhbWVSYXRlLmZwcyA9IGZwc1xuICAgICAgICAgIG1ldGEuZnJhbWVSYXRlLmZwc19udW0gPSBmcHNOdW1cbiAgICAgICAgICBtZXRhLmZyYW1lUmF0ZS5mcHNfZGVuID0gMTAwMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2FhY1NlcXVlbmNlSGVhZGVyUGFyc2VyIChkYXRhKSB7XG4gICAgbGV0IHJldCA9IHt9XG4gICAgcmV0Lmhhc1NwZWNpZmljQ29uZmlnID0gdHJ1ZVxuICAgIHJldC5vYmplY3RUeXBlID0gZGF0YVsxXSA+Pj4gM1xuICAgIHJldC5zYW1wbGVSYXRlSW5kZXggPSAoKGRhdGFbMV0gJiA3KSA8PCAxKSB8IChkYXRhWzJdID4+PiA3KVxuICAgIHJldC5hdWRpb3NhbXBsZXJhdGUgPSB0aGlzLl9zd2l0Y2hBdWRpb1NhbXBsZVJhdGUocmV0LnNhbXBsZVJhdGVJbmRleClcbiAgICByZXQuY2hhbm5lbENvdW50ID0gKGRhdGFbMl0gJiAxMjApID4+PiAzXG4gICAgcmV0LmZyYW1lTGVuZ3RoID0gKGRhdGFbMl0gJiA0KSA+Pj4gMlxuICAgIHJldC5kZXBlbmRzT25Db3JlQ29kZXIgPSAoZGF0YVsyXSAmIDIpID4+PiAxXG4gICAgcmV0LmV4dGVuc2lvbkZsYWdJbmRleCA9IGRhdGFbMl0gJiAxXG5cbiAgICByZXQuY29kZWMgPSBgbXA0YS40MC4ke3JldC5vYmplY3RUeXBlfWBcbiAgICBsZXQgdXNlckFnZW50ID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbiAgICBsZXQgZXh0ZW5zaW9uU2FtcGxpbmdJbmRleDtcblxuICAgIGxldCBjb25maWc7XG4gICAgbGV0IHNhbXBsaW5nSW5kZXggPSByZXQuc2FtcGxlUmF0ZUluZGV4O1xuXG4gICAgaWYgKHVzZXJBZ2VudC5pbmRleE9mKCdmaXJlZm94JykgIT09IC0xKSB7XG4gICAgICAvLyBmaXJlZm94OiB1c2UgU0JSIChIRS1BQUMpIGlmIGZyZXEgbGVzcyB0aGFuIDI0a0h6XG4gICAgICBpZiAocmV0LnNhbXBsZVJhdGVJbmRleCA+PSA2KSB7XG4gICAgICAgIHJldC5vYmplY3RUeXBlID0gNTtcbiAgICAgICAgY29uZmlnID0gbmV3IEFycmF5KDQpO1xuICAgICAgICBleHRlbnNpb25TYW1wbGluZ0luZGV4ID0gc2FtcGxpbmdJbmRleCAtIDM7XG4gICAgICB9IGVsc2UgeyAvLyB1c2UgTEMtQUFDXG4gICAgICAgIHJldC5vYmplY3RUeXBlID0gMjtcbiAgICAgICAgY29uZmlnID0gbmV3IEFycmF5KDIpO1xuICAgICAgICBleHRlbnNpb25TYW1wbGluZ0luZGV4ID0gc2FtcGxpbmdJbmRleDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHVzZXJBZ2VudC5pbmRleE9mKCdhbmRyb2lkJykgIT09IC0xKSB7XG4gICAgICAvLyBhbmRyb2lkOiBhbHdheXMgdXNlIExDLUFBQ1xuICAgICAgcmV0Lm9iamVjdFR5cGUgPSAyO1xuICAgICAgY29uZmlnID0gbmV3IEFycmF5KDIpO1xuICAgICAgZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCA9IHNhbXBsaW5nSW5kZXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGZvciBvdGhlciBicm93c2VycywgZS5nLiBjaHJvbWUuLi5cbiAgICAgIC8vIEFsd2F5cyB1c2UgSEUtQUFDIHRvIG1ha2UgaXQgZWFzaWVyIHRvIHN3aXRjaCBhYWMgY29kZWMgcHJvZmlsZVxuICAgICAgcmV0Lm9iamVjdFR5cGUgPSA1O1xuICAgICAgZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCA9IHJldC5zYW1wbGVSYXRlSW5kZXg7XG4gICAgICBjb25maWcgPSBuZXcgQXJyYXkoNCk7XG5cbiAgICAgIGlmIChyZXQuc2FtcGxlUmF0ZUluZGV4ID49IDYpIHtcbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCA9IHJldC5zYW1wbGVSYXRlSW5kZXggLSAzO1xuICAgICAgfSBlbHNlIGlmIChyZXQuY2hhbm5lbENvdW50ID09PSAxKSB7IC8vIE1vbm8gY2hhbm5lbFxuICAgICAgICByZXQub2JqZWN0VHlwZSA9IDI7XG4gICAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSgyKTtcbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCA9IHJldC5zYW1wbGVSYXRlSW5kZXg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uZmlnWzBdID0gcmV0Lm9iamVjdFR5cGUgPDwgMztcbiAgICBjb25maWdbMF0gfD0gKHJldC5zYW1wbGVSYXRlSW5kZXggJiAweDBGKSA+Pj4gMTtcbiAgICBjb25maWdbMV0gPSAocmV0LnNhbXBsZVJhdGVJbmRleCAmIDB4MEYpIDw8IDc7XG4gICAgY29uZmlnWzFdIHw9IChyZXQuY2hhbm5lbENvdW50ICYgMHgwRikgPDwgMztcbiAgICBpZiAocmV0Lm9iamVjdFR5cGUgPT09IDUpIHtcbiAgICAgIGNvbmZpZ1sxXSB8PSAoKGV4dGVuc2lvblNhbXBsaW5nSW5kZXggJiAweDBGKSA+Pj4gMSk7XG4gICAgICBjb25maWdbMl0gPSAoZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCAmIDB4MDEpIDw8IDc7XG4gICAgICAvLyBleHRlbmRlZCBhdWRpbyBvYmplY3QgdHlwZTogZm9yY2UgdG8gMiAoTEMtQUFDKVxuICAgICAgY29uZmlnWzJdIHw9ICgyIDw8IDIpO1xuICAgICAgY29uZmlnWzNdID0gMDtcbiAgICB9XG4gICAgcmV0LmNvbmZpZyA9IGNvbmZpZ1xuICAgIHJldHVybiByZXRcbiAgfVxuXG4gIF9wYXJzZUFBQ0RhdGEgKGNodW5rKSB7XG4gICAgbGV0IHRyYWNrID0gdGhpcy50cmFja3MuYXVkaW9UcmFja1xuICAgIGlmICghdHJhY2spIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBtZXRhID0gdHJhY2subWV0YVxuXG4gICAgaWYgKCFtZXRhKSB7XG4gICAgICBtZXRhID0gbmV3IEF1ZGlvVHJhY2tNZXRhKClcbiAgICB9XG5cbiAgICBsZXQgaW5mbyA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDEpWzBdXG5cbiAgICBjaHVuay5kYXRhID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoY2h1bmsuZGF0YXNpemUgLSAxKVxuXG4gICAgbGV0IGZvcm1hdCA9IChpbmZvICYgMjQwKSA+Pj4gNFxuXG4gICAgdHJhY2suZm9ybWF0ID0gZm9ybWF0XG5cbiAgICBpZiAoZm9ybWF0ICE9PSAxMCkge1xuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgbmV3IEVycm9yKGBpbnZhbGlkIGF1ZGlvIGZvcm1hdDogJHtmb3JtYXR9YCkpXG4gICAgfVxuXG4gICAgaWYgKGZvcm1hdCA9PT0gMTAgJiYgIXRoaXMuX2hhc0F1ZGlvU2VxdWVuY2UpIHtcbiAgICAgIG1ldGEuc2FtcGxlUmF0ZSA9IHRoaXMuX3N3aXRjaEF1ZGlvU2FtcGxpbmdGcmVxdWVuY3koaW5mbylcbiAgICAgIG1ldGEuc2FtcGxlUmF0ZUluZGV4ID0gKGluZm8gJiAxMikgPj4+IDJcbiAgICAgIG1ldGEuZnJhbWVMZW50aCA9IChpbmZvICYgMikgPj4+IDFcbiAgICAgIG1ldGEuY2hhbm5lbENvdW50ID0gaW5mbyAmIDFcbiAgICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb24gPSBNYXRoLmZsb29yKDEwMjQgLyBtZXRhLmF1ZGlvU2FtcGxlUmF0ZSAqIG1ldGEudGltZXNjYWxlKVxuICAgIH1cblxuICAgIGxldCBhdWRpb1NhbXBsZVJhdGUgPSBtZXRhLmF1ZGlvU2FtcGxlUmF0ZVxuICAgIGxldCBhdWRpb1NhbXBsZVJhdGVJbmRleCA9IG1ldGEuc2FtcGxlUmF0ZUluZGV4XG4gICAgbGV0IHJlZlNhbXBsZUR1cmF0aW9uID0gbWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuXG4gICAgZGVsZXRlIGNodW5rLnRhZ1R5cGVcbiAgICBsZXQgdmFsaWRhdGUgPSB0aGlzLl9kYXRhc2l6ZVZhbGlkYXRvcihjaHVuay5kYXRhc2l6ZSlcblxuICAgIGlmIChjaHVuay5kYXRhWzBdID09PSAwKSB7IC8vIEFBQyBTZXF1ZW5jZSBIZWFkZXJcbiAgICAgIGxldCBhYWNIZWFkZXIgPSB0aGlzLl9hYWNTZXF1ZW5jZUhlYWRlclBhcnNlcihjaHVuay5kYXRhKVxuICAgICAgYXVkaW9TYW1wbGVSYXRlID0gYWFjSGVhZGVyLmF1ZGlvc2FtcGxlcmF0ZSB8fCBtZXRhLmF1ZGlvU2FtcGxlUmF0ZVxuICAgICAgYXVkaW9TYW1wbGVSYXRlSW5kZXggPSBhYWNIZWFkZXIuc2FtcGxlUmF0ZUluZGV4IHx8IG1ldGEuc2FtcGxlUmF0ZUluZGV4XG4gICAgICByZWZTYW1wbGVEdXJhdGlvbiA9IE1hdGguZmxvb3IoMTAyNCAvIGF1ZGlvU2FtcGxlUmF0ZSAqIG1ldGEudGltZXNjYWxlKVxuXG4gICAgICBtZXRhLmNoYW5uZWxDb3VudCA9IGFhY0hlYWRlci5jaGFubmVsQ291bnRcbiAgICAgIG1ldGEuc2FtcGxlUmF0ZSA9IGF1ZGlvU2FtcGxlUmF0ZVxuICAgICAgbWV0YS5zYW1wbGVSYXRlSW5kZXggPSBhdWRpb1NhbXBsZVJhdGVJbmRleFxuICAgICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA9IHJlZlNhbXBsZUR1cmF0aW9uXG4gICAgICBtZXRhLmR1cmF0aW9uID0gdGhpcy5fY29udGV4dC5tZWRpYUluZm8uZHVyYXRpb24gKiBtZXRhLnRpbWVzY2FsZVxuICAgICAgbWV0YS5jb25maWcgPSBhYWNIZWFkZXIuY29uZmlnXG4gICAgICBtZXRhLm9iamVjdFR5cGUgPSBhYWNIZWFkZXIub2JqZWN0VHlwZTtcblxuICAgICAgY29uc3QgYXVkaW9NZWRpYSA9IHRoaXMuX2NvbnRleHQubWVkaWFJbmZvLmF1ZGlvXG5cbiAgICAgIC8vIGZpbGwgYXVkaW8gbWVkaWEgaW5mb1xuICAgICAgYXVkaW9NZWRpYS5jb2RlYyA9IGFhY0hlYWRlci5jb2RlY1xuICAgICAgYXVkaW9NZWRpYS5jaGFubmVsQ291bnQgPSBhYWNIZWFkZXIuY2hhbm5lbENvdW50XG4gICAgICBhdWRpb01lZGlhLnNhbXBsZVJhdGUgPSBhdWRpb1NhbXBsZVJhdGVcbiAgICAgIGF1ZGlvTWVkaWEuc2FtcGxlUmF0ZUluZGV4ID0gYWFjSGVhZGVyLmF1ZGlvU2FtcGxlUmF0ZUluZGV4XG5cbiAgICAgIGlmICh0aGlzLl9oYXNTY3JpcHQgJiYgIXRoaXMuX2hhc0F1ZGlvU2VxdWVuY2UpIHtcbiAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICdhdWRpbycpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2hhc1NjcmlwdCAmJiB0aGlzLl9oYXNBdWRpb1NlcXVlbmNlKSB7XG4gICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAnYXVkaW8nKVxuICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkFVRElPX01FVEFEQVRBX0NIQU5HRSlcbiAgICAgIH1cbiAgICAgIHRoaXMuX2hhc0F1ZGlvU2VxdWVuY2UgPSB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIGNodW5rLmRhdGEgPSBjaHVuay5kYXRhLnNsaWNlKDEsIGNodW5rLmRhdGEubGVuZ3RoKVxuICAgICAgdHJhY2suc2FtcGxlcy5wdXNoKGNodW5rKVxuICAgIH1cbiAgICBpZiAoIXZhbGlkYXRlKSB7XG4gICAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcignVEFHIGxlbmd0aCBlcnJvciBhdCAnICsgY2h1bmsuZGF0YXNpemUpXG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCBlcnJvci5tZXNzYWdlKVxuICAgICAgdGhpcy5sb2dnZXIud2Fybih0aGlzLlRBRywgZXJyb3IubWVzc2FnZSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcGFyc2UgaGV2Yy9hdmMgdmlkZW8gZGF0YVxuICAgKiBAcGFyYW0gY2h1bmtcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9wYXJzZUhldmNEYXRhIChjaHVuaykge1xuICAgIC8vIGhlYWRlclxuICAgIGxldCBpbmZvID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMSlbMF1cbiAgICBjaHVuay5mcmFtZVR5cGUgPSAoaW5mbyAmIDB4ZjApID4+PiA0XG4gICAgY2h1bmsuaXNLZXlmcmFtZSA9IGNodW5rLmZyYW1lVHlwZSA9PT0gMVxuICAgIC8vIGxldCB0ZW1wQ29kZWNJRCA9IHRoaXMudHJhY2tzLnZpZGVvVHJhY2suY29kZWNJRFxuICAgIGxldCBjb2RlY0lEID0gaW5mbyAmIDB4MGZcbiAgICB0aGlzLnRyYWNrcy52aWRlb1RyYWNrLmNvZGVjSUQgPSBjb2RlY0lEXG5cbiAgICAvLyBoZXZj5ZKMYXZj55qEaGVhZGVy6Kej5p6Q5pa55byP5LiA5qC3XG4gICAgY2h1bmsuYXZjUGFja2V0VHlwZSA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDEpWzBdXG4gICAgY2h1bmsuY3RzID0gdGhpcy5sb2FkZXJCdWZmZXIudG9JbnQoMCwgMylcbiAgICB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgzKVxuXG4gICAgLy8gMTIgZm9yIGhldmMsIDcgZm9yIGF2Y1xuICAgIGlmIChjb2RlY0lEID09PSAxMikge1xuICAgICAgY29uc3QgZGF0YSA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KGNodW5rLmRhdGFzaXplIC0gNSlcbiAgICAgIGNodW5rLmRhdGEgPSBkYXRhXG5cbiAgICAgIGlmIChOdW1iZXIucGFyc2VJbnQoY2h1bmsuYXZjUGFja2V0VHlwZSkgIT09IDApIHtcbiAgICAgICAgaWYgKCF0aGlzLl9kYXRhc2l6ZVZhbGlkYXRvcihjaHVuay5kYXRhc2l6ZSkpIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKHRoaXMuVEFHLCBgaW52YWxpZCB2aWRlbyB0YWcgZGF0YXNpemU6ICR7Y2h1bmsuZGF0YXNpemV9YClcbiAgICAgICAgfVxuICAgICAgICBsZXQgbmFsdSA9IHt9XG4gICAgICAgIGxldCByID0gMFxuICAgICAgICBuYWx1LmN0cyA9IGNodW5rLmN0c1xuICAgICAgICBuYWx1LmR0cyA9IGNodW5rLmR0c1xuICAgICAgICB3aGlsZSAoY2h1bmsuZGF0YS5sZW5ndGggPiByKSB7XG4gICAgICAgICAgbGV0IHNpemVzID0gY2h1bmsuZGF0YS5zbGljZShOdW1iZXIucGFyc2VJbnQociksIDQgKyByKVxuICAgICAgICAgIG5hbHUuc2l6ZSA9IHNpemVzWzNdXG4gICAgICAgICAgbmFsdS5zaXplICs9IHNpemVzWzJdICogMjU2XG4gICAgICAgICAgbmFsdS5zaXplICs9IHNpemVzWzFdICogMjU2ICogMjU2XG4gICAgICAgICAgbmFsdS5zaXplICs9IHNpemVzWzBdICogMjU2ICogMjU2ICogMjU2XG4gICAgICAgICAgciArPSA0XG4gICAgICAgICAgbmFsdS5kYXRhID0gY2h1bmsuZGF0YS5zbGljZShOdW1iZXIucGFyc2VJbnQociksIG5hbHUuc2l6ZSArIHIpXG4gICAgICAgICAgciArPSBuYWx1LnNpemVcbiAgICAgICAgICB0aGlzLnRyYWNrcy52aWRlb1RyYWNrLnNhbXBsZXMucHVzaChuYWx1KVxuICAgICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAndmlkZW8nKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKE51bWJlci5wYXJzZUludChjaHVuay5hdmNQYWNrZXRUeXBlKSA9PT0gMCkge1xuICAgICAgICBpZiAoIXRoaXMuX2RhdGFzaXplVmFsaWRhdG9yKGNodW5rLmRhdGFzaXplKSkge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4odGhpcy5UQUcsIGBpbnZhbGlkIHZpZGVvIHRhZyBkYXRhc2l6ZTogJHtjaHVuay5kYXRhc2l6ZX1gKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAndmlkZW8nKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjb2RlY0lEID09PSA3KSB7XG4gICAgICBsZXQgZGF0YSA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KGNodW5rLmRhdGFzaXplIC0gNSlcbiAgICAgIGlmIChkYXRhWzRdID09PSAwICYmIGRhdGFbNV0gPT09IDAgJiYgZGF0YVs2XSA9PT0gMCAmJiBkYXRhWzddID09PSAxKSB7XG4gICAgICAgIGxldCBhdmNjbGVuZ3RoID0gMFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgIGF2Y2NsZW5ndGggPSBhdmNjbGVuZ3RoICogMjU2ICsgZGF0YVtpXVxuICAgICAgICB9XG4gICAgICAgIGF2Y2NsZW5ndGggLT0gNFxuICAgICAgICBkYXRhID0gZGF0YS5zbGljZSg0LCBkYXRhLmxlbmd0aClcbiAgICAgICAgZGF0YVszXSA9IGF2Y2NsZW5ndGggJSAyNTZcbiAgICAgICAgYXZjY2xlbmd0aCA9IChhdmNjbGVuZ3RoIC0gZGF0YVszXSkgLyAyNTZcbiAgICAgICAgZGF0YVsyXSA9IGF2Y2NsZW5ndGggJSAyNTZcbiAgICAgICAgYXZjY2xlbmd0aCA9IChhdmNjbGVuZ3RoIC0gZGF0YVsyXSkgLyAyNTZcbiAgICAgICAgZGF0YVsxXSA9IGF2Y2NsZW5ndGggJSAyNTZcbiAgICAgICAgZGF0YVswXSA9IChhdmNjbGVuZ3RoIC0gZGF0YVsxXSkgLyAyNTZcbiAgICAgIH1cblxuICAgICAgY2h1bmsuZGF0YSA9IGRhdGFcbiAgICAgIC8vIElmIGl0IGlzIEFWQyBzZXF1ZWNlIEhlYWRlci5cbiAgICAgIGlmIChjaHVuay5hdmNQYWNrZXRUeXBlID09PSAwKSB7XG4gICAgICAgIHRoaXMuX2F2Y1NlcXVlbmNlSGVhZGVyUGFyc2VyKGNodW5rLmRhdGEpXG4gICAgICAgIGxldCB2YWxpZGF0ZSA9IHRoaXMuX2RhdGFzaXplVmFsaWRhdG9yKGNodW5rLmRhdGFzaXplKVxuICAgICAgICBpZiAodmFsaWRhdGUpIHtcbiAgICAgICAgICBpZiAodGhpcy5faGFzU2NyaXB0ICYmICF0aGlzLl9oYXNWaWRlb1NlcXVlbmNlKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgJ3ZpZGVvJylcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2hhc1NjcmlwdCAmJiB0aGlzLl9oYXNWaWRlb1NlcXVlbmNlKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgJ2F1ZGlvJylcbiAgICAgICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuVklERU9fTUVUQURBVEFfQ0hBTkdFKVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9oYXNWaWRlb1NlcXVlbmNlID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIXRoaXMuX2RhdGFzaXplVmFsaWRhdG9yKGNodW5rLmRhdGFzaXplKSkge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4odGhpcy5UQUcsIGBpbnZhbGlkIHZpZGVvIHRhZyBkYXRhc2l6ZTogJHtjaHVuay5kYXRhc2l6ZX1gKVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRyYWNrcy52aWRlb1RyYWNrLnNhbXBsZXMucHVzaChjaHVuaylcbiAgICAgICAgLy8gdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9DT01QTEVURSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb2dnZXIud2Fybih0aGlzLlRBRywgYHZpZGVvIGNvZGVpZCBpcyAke2NvZGVjSUR9YClcbiAgICAgIGNodW5rLmRhdGEgPSB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdChjaHVuay5kYXRhc2l6ZSAtIDEpXG4gICAgICBpZiAoIXRoaXMuX2RhdGFzaXplVmFsaWRhdG9yKGNodW5rLmRhdGFzaXplKSkge1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKHRoaXMuVEFHLCBgaW52YWxpZCB2aWRlbyB0YWcgZGF0YXNpemU6ICR7Y2h1bmsuZGF0YXNpemV9YClcbiAgICAgIH1cbiAgICAgIHRoaXMudHJhY2tzLnZpZGVvVHJhY2suc2FtcGxlcy5wdXNoKGNodW5rKVxuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9DT01QTEVURSlcbiAgICB9XG4gICAgZGVsZXRlIGNodW5rLnRhZ1R5cGVcbiAgfVxuXG4gIC8qKlxuICAgKiBwYXJzZSBhdmMgbWV0YWRhdGFcbiAgICogQHBhcmFtIGRhdGFcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9hdmNTZXF1ZW5jZUhlYWRlclBhcnNlciAoZGF0YSkge1xuICAgIGxldCB0cmFjayA9IHRoaXMudHJhY2tzLnZpZGVvVHJhY2tcblxuICAgIGlmICghdHJhY2spIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBvZmZzZXQgPSAwXG5cbiAgICBpZiAoIXRyYWNrLm1ldGEpIHtcbiAgICAgIHRyYWNrLm1ldGEgPSBuZXcgVmlkZW9UcmFja01ldGEoKVxuICAgIH1cbiAgICBsZXQgbWV0YSA9IHRyYWNrLm1ldGFcblxuICAgIG1ldGEuY29uZmlndXJhdGlvblZlcnNpb24gPSBkYXRhWzBdXG4gICAgbWV0YS5hdmNQcm9maWxlSW5kaWNhdGlvbiA9IGRhdGFbMV1cbiAgICBtZXRhLnByb2ZpbGVDb21wYXRpYmlsaXR5ID0gZGF0YVsyXVxuICAgIG1ldGEuYXZjTGV2ZWxJbmRpY2F0aW9uID0gZGF0YVszXSAvIDEwXG4gICAgbWV0YS5uYWxVbml0TGVuZ3RoID0gKGRhdGFbNF0gJiAweDAzKSArIDFcblxuICAgIGxldCBudW1PZlNwcyA9IGRhdGFbNV0gJiAweDFmXG4gICAgb2Zmc2V0ID0gNlxuICAgIGxldCBjb25maWcgPSB7fVxuXG4gICAgLy8gcGFyc2UgU1BTXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1PZlNwczsgaSsrKSB7XG4gICAgICBsZXQgc2l6ZSA9IGRhdGFbb2Zmc2V0XSAqIDI1NSArIGRhdGFbb2Zmc2V0ICsgMV1cbiAgICAgIG9mZnNldCArPSAyXG5cbiAgICAgIGxldCBzcHMgPSBuZXcgVWludDhBcnJheShzaXplKVxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaXplOyBqKyspIHtcbiAgICAgICAgc3BzW2pdID0gZGF0YVtvZmZzZXQgKyBqXVxuICAgICAgfVxuXG4gICAgICAvLyBjb2RlYyBzdHJpbmdcbiAgICAgIGxldCBjb2RlY1N0cmluZyA9ICdhdmMxLidcbiAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgNDsgaisrKSB7XG4gICAgICAgIGxldCBoID0gc3BzW2pdLnRvU3RyaW5nKDE2KVxuICAgICAgICBpZiAoaC5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgaCA9ICcwJyArIGhcbiAgICAgICAgfVxuICAgICAgICBjb2RlY1N0cmluZyArPSBoXG4gICAgICB9XG5cbiAgICAgIG1ldGEuY29kZWMgPSBjb2RlY1N0cmluZ1xuXG4gICAgICBvZmZzZXQgKz0gc2l6ZVxuICAgICAgdGhpcy50cmFja3MudmlkZW9UcmFjay5tZXRhLnNwcyA9IHNwc1xuICAgICAgY29uZmlnID0gU3BzUGFyc2VyLnBhcnNlU1BTKHNwcylcbiAgICB9XG5cbiAgICBsZXQgbnVtT2ZQcHMgPSBkYXRhW29mZnNldF1cblxuICAgIG9mZnNldCsrXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bU9mUHBzOyBpKyspIHtcbiAgICAgIGxldCBzaXplID0gZGF0YVtvZmZzZXRdICogMjU1ICsgZGF0YVtvZmZzZXQgKyAxXVxuICAgICAgb2Zmc2V0ICs9IDJcbiAgICAgIGxldCBwcHMgPSBuZXcgVWludDhBcnJheShzaXplKVxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaXplOyBqKyspIHtcbiAgICAgICAgcHBzW2pdID0gZGF0YVtvZmZzZXQgKyBqXVxuICAgICAgfVxuICAgICAgb2Zmc2V0ICs9IHNpemVcbiAgICAgIHRoaXMudHJhY2tzLnZpZGVvVHJhY2subWV0YS5wcHMgPSBwcHNcbiAgICB9XG5cbiAgICBPYmplY3QuYXNzaWduKG1ldGEsIFNwc1BhcnNlci50b1ZpZGVvTWV0YShjb25maWcpKVxuXG4gICAgLy8gZmlsbCB2aWRlbyBtZWRpYSBpbmZvXG4gICAgY29uc3QgdmlkZW9NZWRpYSA9IHRoaXMuX2NvbnRleHQubWVkaWFJbmZvLnZpZGVvXG5cbiAgICB2aWRlb01lZGlhLmNvZGVjID0gbWV0YS5jb2RlY1xuICAgIHZpZGVvTWVkaWEucHJvZmlsZSA9IG1ldGEucHJvZmlsZVxuICAgIHZpZGVvTWVkaWEubGV2ZWwgPSBtZXRhLmxldmVsXG4gICAgdmlkZW9NZWRpYS5jaHJvbWFGb3JtYXQgPSBtZXRhLmNocm9tYUZvcm1hdFxuICAgIHZpZGVvTWVkaWEuZnJhbWVSYXRlID0gbWV0YS5mcmFtZVJhdGVcbiAgICB2aWRlb01lZGlhLnBhclJhdGlvID0gbWV0YS5wYXJSYXRpb1xuICAgIHZpZGVvTWVkaWEud2lkdGggPSB2aWRlb01lZGlhLndpZHRoID09PSBtZXRhLnByZXNlbnRXaWR0aCA/IHZpZGVvTWVkaWEud2lkdGggOiBtZXRhLnByZXNlbnRXaWR0aFxuICAgIHZpZGVvTWVkaWEuaGVpZ2h0ID0gdmlkZW9NZWRpYS5oZWlnaHQgPT09IG1ldGEucHJlc2VudEhlaWdodCA/IHZpZGVvTWVkaWEud2lkdGggOiBtZXRhLnByZXNlbnRIZWlnaHRcblxuICAgIG1ldGEuZHVyYXRpb24gPSB0aGlzLl9jb250ZXh0Lm1lZGlhSW5mby5kdXJhdGlvbiAqIG1ldGEudGltZXNjYWxlXG4gICAgbWV0YS5hdmNjID0gbmV3IFVpbnQ4QXJyYXkoZGF0YS5sZW5ndGgpXG4gICAgbWV0YS5hdmNjLnNldChkYXRhKVxuICAgIHRyYWNrLm1ldGEgPSBtZXRhXG4gIH1cblxuICAvKipcbiAgICogY2hvb3NlIGF1ZGlvIHNhbXBsZSByYXRlXG4gICAqIEBwYXJhbSBzYW1wbGluZ0ZyZXF1ZW5jeUluZGV4XG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc3dpdGNoQXVkaW9TYW1wbGVSYXRlIChzYW1wbGluZ0ZyZXF1ZW5jeUluZGV4KSB7XG4gICAgbGV0IHNhbXBsaW5nRnJlcXVlbmN5TGlzdCA9IFs5NjAwMCwgODgyMDAsIDY0MDAwLCA0ODAwMCwgNDQxMDAsIDMyMDAwLCAyNDAwMCwgMjIwNTAsIDE2MDAwLCAxMjAwMCwgMTEwMjUsIDgwMDAsIDczNTBdXG4gICAgcmV0dXJuIHNhbXBsaW5nRnJlcXVlbmN5TGlzdFtzYW1wbGluZ0ZyZXF1ZW5jeUluZGV4XVxuICB9XG5cbiAgLyoqXG4gICAqIGNob29zZSBhdWRpbyBzYW1wbGluZyBmcmVxdWVuY2VcbiAgICogQHBhcmFtIGluZm9cbiAgICogQHJldHVybnMge251bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zd2l0Y2hBdWRpb1NhbXBsaW5nRnJlcXVlbmN5IChpbmZvKSB7XG4gICAgbGV0IHNhbXBsaW5nRnJlcXVlbmN5SW5kZXggPSAoaW5mbyAmIDEyKSA+Pj4gMlxuICAgIGxldCBzYW1wbGluZ0ZyZXF1ZW5jeUxpc3QgPSBbNTUwMCwgMTEwMjUsIDIyMDUwLCA0NDEwMCwgNDgwMDBdXG4gICAgcmV0dXJuIHNhbXBsaW5nRnJlcXVlbmN5TGlzdFtzYW1wbGluZ0ZyZXF1ZW5jeUluZGV4XVxuICB9XG5cbiAgLyoqXG4gICAqIGNob29zZSBhdWRpbyBjaGFubmVsIGNvdW50XG4gICAqIEBwYXJhbSBpbmZvXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc3dpdGNoQXVkaW9DaGFubmVsIChpbmZvKSB7XG4gICAgbGV0IHNhbXBsZVRyYWNrTnVtSW5kZXggPSBpbmZvICYgMVxuICAgIGxldCBzYW1wbGVUcmFja051bUxpc3QgPSBbMSwgMl1cbiAgICByZXR1cm4gc2FtcGxlVHJhY2tOdW1MaXN0W3NhbXBsZVRyYWNrTnVtSW5kZXhdXG4gIH1cblxuICAvKipcbiAgICogY2hlY2sgZGF0YXNpemUgaXMgdmFsaWQgdXNlIDQgQnl0ZSBhZnRlciBjdXJyZW50IHRhZ1xuICAgKiBAcGFyYW0gZGF0YXNpemVcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZGF0YXNpemVWYWxpZGF0b3IgKGRhdGFzaXplKSB7XG4gICAgbGV0IGRhdGFzaXplQ29uZmlybSA9IHRoaXMubG9hZGVyQnVmZmVyLnRvSW50KDAsIDQpXG4gICAgdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoNClcbiAgICByZXR1cm4gZGF0YXNpemVDb25maXJtID09PSBkYXRhc2l6ZSArIDExXG4gIH1cblxuICBnZXQgbG9hZGVyQnVmZmVyICgpIHtcbiAgICBpZiAodGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnTE9BREVSX0JVRkZFUicpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnTE9BREVSX0JVRkZFUicpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIG5ldyBFcnJvcign5om+5LiN5YiwIGxvYWRlckJ1ZmZlciDlrp7kvosnKSlcbiAgICB9XG4gIH1cblxuICBnZXQgdHJhY2tzICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJylcbiAgfVxuXG4gIGdldCBsb2dnZXIgKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdMT0dHRVInKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZsdkRlbXV4ZXJcbiIsIi8qKlxuICogUmVmZXJlbmNlOiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjODIxNiNzZWN0aW9uLTQuM1xuICovXG5jbGFzcyBNM1U4UGFyc2VyIHtcbiAgc3RhdGljIHBhcnNlICh0ZXh0LCBiYXNldXJsID0gJycpIHtcbiAgICBsZXQgcmV0ID0ge1xuICAgICAgZHVyYXRpb246IDBcbiAgICB9O1xuICAgIGlmICghdGV4dCB8fCAhdGV4dC5zcGxpdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgcmVmcyA9IHRleHQuc3BsaXQoL1xccnxcXG4vKTtcbiAgICByZWZzID0gcmVmcy5maWx0ZXIoKHJlZikgPT4ge1xuICAgICAgcmV0dXJuIHJlZjtcbiAgICB9KVxuICAgIGxldCByZWYgPSByZWZzLnNoaWZ0KClcbiAgICBpZiAoIXJlZi5tYXRjaCgnI0VYVE0zVScpKSB7XG4gICAgICAvLyBUT0RPOk0zVeagvOW8j+mUmeivr+OAglxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJlZiA9IHJlZnMuc2hpZnQoKVxuICAgIHdoaWxlIChyZWYpIHtcbiAgICAgIGxldCByZWZtID0gcmVmLm1hdGNoKC8jKC4qKTooLiopLyk7XG4gICAgICBpZiAocmVmbSAmJiByZWZtLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgc3dpdGNoIChyZWZtWzFdKSB7XG4gICAgICAgICAgY2FzZSAnRVhULVgtVkVSU0lPTic6XG4gICAgICAgICAgICByZXQudmVyc2lvbiA9IHBhcnNlSW50KHJlZm1bMl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnRVhULVgtTUVESUEtU0VRVUVOQ0UnOlxuICAgICAgICAgICAgcmV0LnNlcXVlbmNlID0gcGFyc2VJbnQocmVmbVsyXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdFWFQtWC1UQVJHRVREVVJBVElPTic6XG4gICAgICAgICAgICByZXQudGFyZ2V0ZHVyYXRpb24gPSBwYXJzZUZsb2F0KHJlZm1bMl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnRVhUSU5GJzpcbiAgICAgICAgICAgIE0zVThQYXJzZXIucGFyc2VGcmFnKHJlZm0sIHJlZnMsIHJldCwgYmFzZXVybCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlZiA9IHJlZnMuc2hpZnQoKVxuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgc3RhdGljIHBhcnNlRnJhZyAocmVmbSwgcmVmcywgcmV0LCBiYXNldXJsKSB7XG4gICAgaWYgKCFyZXQuZnJhZ3MpIHtcbiAgICAgIHJldC5mcmFncyA9IFtdXG4gICAgfVxuXG4gICAgbGV0IGZyZWcgPSB7XG4gICAgICBzdGFydDogcmV0LmR1cmF0aW9uLFxuICAgICAgZHVyYXRpb246IHBhcnNlRmxvYXQocmVmbVsyXSkgKiAxMDAwXG4gICAgfVxuXG4gICAgcmV0LmR1cmF0aW9uICs9IGZyZWcuZHVyYXRpb247XG4gICAgbGV0IG5leHRsaW5lID0gcmVmcy5zaGlmdCgpO1xuICAgIGlmIChuZXh0bGluZS5tYXRjaCgvIyguKik6KC4qKS8pKSB7XG4gICAgICBuZXh0bGluZSA9IHJlZnMuc2hpZnQoKTtcbiAgICB9XG4gICAgaWYgKG5leHRsaW5lLmxlbmd0aCA+IDAgJiYgbmV4dGxpbmUuY2hhckF0KDApID09PSAnLycgJiYgYmFzZXVybC5tYXRjaCgvLipcXC9cXC8uKlxcLlxcdysvZykpIHtcbiAgICAgIGJhc2V1cmwgPSBiYXNldXJsLm1hdGNoKC8uKlxcL1xcLy4qXFwuXFx3Ky9nKVswXTtcbiAgICB9XG4gICAgaWYgKG5leHRsaW5lLm1hdGNoKC8uKjpcXC9cXC8uKi8pKSB7XG4gICAgICBmcmVnLnVybCA9IG5leHRsaW5lO1xuICAgIH0gZWxzZSB7XG4gICAgICBmcmVnLnVybCA9IGJhc2V1cmwgKyBuZXh0bGluZTtcbiAgICB9XG4gICAgXG4gICAgcmV0LmZyYWdzLnB1c2goZnJlZyk7XG4gIH1cblxuICBzdGF0aWMgcGFyc2VVUkwgKHVybCkge1xuICAgIGxldCBiYXNldXJsID0gJyc7XG4gICAgbGV0IHVybHMgPSB1cmwubWF0Y2goLyguKlxcLykuKlxcLm0zdTgvKTtcbiAgICBpZiAodXJscyAmJiB1cmxzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdXJscy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodXJsc1tpXS5tYXRjaCgvLipcXC8kL2cpICYmIHVybHNbaV0ubGVuZ3RoID4gYmFzZXVybC5sZW5ndGgpIHtcbiAgICAgICAgICBiYXNldXJsID0gdXJsc1tpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYmFzZXVybDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNM1U4UGFyc2VyO1xuIiwiaW1wb3J0IHsgTmFsdW5pdCB9IGZyb20gJ3hncGxheWVyLWNvZGVjJztcbmltcG9ydCB7IEF1ZGlvVHJhY2ssIFZpZGVvVHJhY2sgfSBmcm9tICd4Z3BsYXllci1idWZmZXInO1xuaW1wb3J0IHtcbiAgQXVkaW9UcmFja01ldGEsXG4gIFZpZGVvVHJhY2tNZXRhLFxuICBBdWRpb1RyYWNrU2FtcGxlLFxuICBWaWRlb1RyYWNrU2FtcGxlLFxuICBFVkVOVFMsXG4gIFN0cmVhbVxufSBmcm9tICd4Z3BsYXllci11dGlscyc7XG5cbmNvbnN0IERFTVVYX0VWRU5UUyA9IEVWRU5UUy5ERU1VWF9FVkVOVFM7XG5jb25zdCBTdHJlYW1UeXBlID0ge1xuICAweDAxOiBbJ3ZpZGVvJywgJ01QRUctMSddLFxuICAweDAyOiBbJ3ZpZGVvJywgJ01QRUctMiddLFxuICAweDFiOiBbJ3ZpZGVvJywgJ0FWQy5IMjY0J10sXG4gIDB4ZWE6IFsndmlkZW8nLCAnVkMtMSddLFxuICAweDAzOiBbJ2F1ZGlvJywgJ01QRUctMSddLFxuICAweDA0OiBbJ2F1ZGlvJywgJ01QRUctMiddLFxuICAweDBmOiBbJ2F1ZGlvJywgJ01QRUctMi5BQUMnXSxcbiAgMHgxMTogWydhdWRpbycsICdNUEVHLTQuQUFDJ10sXG4gIDB4ODA6IFsnYXVkaW8nLCAnTFBDTSddLFxuICAweDgxOiBbJ2F1ZGlvJywgJ0FDMyddLFxuICAweDA2OiBbJ2F1ZGlvJywgJ0FDMyddLFxuICAweDgyOiBbJ2F1ZGlvJywgJ0RUUyddLFxuICAweDgzOiBbJ2F1ZGlvJywgJ0RvbGJ5IFRydWVIRCddLFxuICAweDg0OiBbJ2F1ZGlvJywgJ0FDMy1QbHVzJ10sXG4gIDB4ODU6IFsnYXVkaW8nLCAnRFRTLUhEJ10sXG4gIDB4ODY6IFsnYXVkaW8nLCAnRFRTLU1BJ10sXG4gIDB4YTE6IFsnYXVkaW8nLCAnQUMzLVBsdXMtU0VDJ10sXG4gIDB4YTI6IFsnYXVkaW8nLCAnRFRTLUhELVNFQyddXG59O1xuXG5jbGFzcyBUc0RlbXV4ZXIge1xuICBjb25zdHJ1Y3RvciAoY29uZmlncykge1xuICAgIHRoaXMuY29uZmlncyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZ3MpO1xuICAgIHRoaXMuZGVtdXhpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnBhdCA9IFtdO1xuICAgIHRoaXMucG10ID0gW107XG4gICAgdGhpcy5faGFzVmlkZW9NZXRhID0gZmFsc2U7XG4gICAgdGhpcy5faGFzQXVkaW9NZXRhID0gZmFsc2U7XG4gIH1cblxuICBpbml0ICgpIHtcbiAgICB0aGlzLm9uKERFTVVYX0VWRU5UUy5ERU1VWF9TVEFSVCwgdGhpcy5kZW11eC5iaW5kKHRoaXMpKVxuICB9XG5cbiAgZGVtdXggKCkge1xuICAgIGlmICh0aGlzLmRlbXV4aW5nKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgYnVmZmVyID0gdGhpcy5pbnB1dEJ1ZmZlcjtcbiAgICBsZXQgZnJhZ3MgPSB7IHBhdDogW10sIHBtdDogW10gfTtcbiAgICBsZXQgcGVzZXMgPSB7fTtcblxuICAgIC8vIFJlYWQgVFMgc2VnbWVudFxuICAgIHdoaWxlIChidWZmZXIubGVuZ3RoID49IDE4OCkge1xuICAgICAgd2hpbGUgKGJ1ZmZlci5sZW5ndGggPj0gMSAmJiBidWZmZXIuYXJyYXlbMF1bYnVmZmVyLm9mZnNldF0gIT09IDcxKSB7XG4gICAgICAgIGJ1ZmZlci5zaGlmdCgxKTtcbiAgICAgIH1cbiAgICAgIGxldCBidWYgPSBidWZmZXIuc2hpZnQoMTg4KTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGJ1Zik7XG4gICAgICBsZXQgdHNTdHJlYW0gPSBuZXcgU3RyZWFtKGJ1Zi5idWZmZXIpO1xuICAgICAgbGV0IHRzID0ge307XG4gICAgICBUc0RlbXV4ZXIucmVhZCh0c1N0cmVhbSwgdHMsIGZyYWdzKTtcbiAgICAgIGlmICh0cy5wZXMpIHtcbiAgICAgICAgaWYgKCFwZXNlc1t0cy5oZWFkZXIucGlkXSkge1xuICAgICAgICAgIHBlc2VzW3RzLmhlYWRlci5waWRdID0gW107XG4gICAgICAgIH1cbiAgICAgICAgcGVzZXNbdHMuaGVhZGVyLnBpZF0ucHVzaCh0cy5wZXMpO1xuICAgICAgICB0cy5wZXMuRVMuYnVmZmVyID0gW3RzLnBlcy5FUy5idWZmZXJdO1xuICAgICAgfSBlbHNlIGlmIChwZXNlc1t0cy5oZWFkZXIucGlkXSkge1xuICAgICAgICBwZXNlc1t0cy5oZWFkZXIucGlkXVtwZXNlc1t0cy5oZWFkZXIucGlkXS5sZW5ndGggLSAxXS5FUy5idWZmZXIucHVzaCh0cy5wYXlsb2FkLnN0cmVhbSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gR2V0IEZyYW1lcyBkYXRhXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBPYmplY3Qua2V5cyhwZXNlcykubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBlcGVzZXMgPSBwZXNlc1tPYmplY3Qua2V5cyhwZXNlcylbaV1dO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBlcGVzZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZXBlc2VzW2pdLmlkID0gT2JqZWN0LmtleXMocGVzZXMpW2ldO1xuICAgICAgICBlcGVzZXNbal0uRVMuYnVmZmVyID0gVHNEZW11eGVyLk1lcmdlKGVwZXNlc1tqXS5FUy5idWZmZXIpO1xuICAgICAgICBpZiAoZXBlc2VzW2pdLnR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgICAgICB0aGlzLnB1c2hBdWRpb1NhbXBsZShlcGVzZXNbal0pO1xuICAgICAgICB9IGVsc2UgaWYgKGVwZXNlc1tqXS50eXBlID09PSAndmlkZW8nKSB7XG4gICAgICAgICAgdGhpcy5wdXNoVmlkZW9TYW1wbGUoZXBlc2VzW2pdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9oYXNBdWRpb01ldGEpIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfQ09NUExFVEUsICdhdWRpbycpO1xuICAgIH1cbiAgICBpZiAodGhpcy5faGFzVmlkZW9NZXRhKSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0NPTVBMRVRFLCAndmlkZW8nKTtcbiAgICB9XG4gIH1cblxuICBwdXNoQXVkaW9TYW1wbGUgKHBlcykge1xuICAgIGxldCB0cmFjaztcbiAgICBpZiAoIXRoaXMuX3RyYWNrcy5hdWRpb1RyYWNrKSB7XG4gICAgICB0aGlzLl90cmFja3MuYXVkaW9UcmFjayA9IG5ldyBBdWRpb1RyYWNrKCk7XG4gICAgICB0cmFjayA9IHRoaXMuX3RyYWNrcy5hdWRpb1RyYWNrO1xuICAgICAgdHJhY2subWV0YSA9IG5ldyBBdWRpb1RyYWNrTWV0YSh7XG4gICAgICAgIGF1ZGlvU2FtcGxlUmF0ZTogcGVzLkVTLmZyZXF1ZW5jZSxcbiAgICAgICAgc2FtcGxlUmF0ZTogcGVzLkVTLmZyZXF1ZW5jZSxcbiAgICAgICAgY2hhbm5lbENvdW50OiBwZXMuRVMuY2hhbm5lbCxcbiAgICAgICAgY29kZWM6ICdtcDRhLjQwLicgKyBwZXMuRVMuYXVkaW9PYmplY3RUeXBlLFxuICAgICAgICBjb25maWc6IHBlcy5FUy5hdWRpb0NvbmZpZyxcbiAgICAgICAgaWQ6IDIsXG4gICAgICAgIHNhbXBsZVJhdGVJbmRleDogcGVzLkVTLmZyZXF1ZW5jeUluZGV4XG4gICAgICB9KTtcbiAgICAgIHRyYWNrLm1ldGEucmVmU2FtcGxlRHVyYXRpb24gPSBNYXRoLmZsb29yKDEwMjQgLyB0cmFjay5tZXRhLmF1ZGlvU2FtcGxlUmF0ZSAqIHRyYWNrLm1ldGEudGltZXNjYWxlKTtcbiAgICAgIGlmICghdGhpcy5faGFzQXVkaW9NZXRhKSB7XG4gICAgICAgIHRoaXMuX2hhc0F1ZGlvTWV0YSA9IHRydWVcbiAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICdhdWRpbycpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0cmFjayA9IHRoaXMuX3RyYWNrcy5hdWRpb1RyYWNrO1xuICAgIH1cbiAgICBsZXQgZGF0YSA9IG5ldyBVaW50OEFycmF5KHBlcy5FUy5idWZmZXIuYnVmZmVyLnNsaWNlKHBlcy5FUy5idWZmZXIucG9zaXRpb24sIHBlcy5FUy5idWZmZXIubGVuZ3RoKSk7XG4gICAgbGV0IGR0cyA9IHBhcnNlSW50KHBlcy5wdHMgLyA5MCk7XG4gICAgbGV0IHB0cyA9IHBhcnNlSW50KHBlcy5wdHMgLyA5MCk7XG4gICAgbGV0IHNhbXBsZSA9IG5ldyBBdWRpb1RyYWNrU2FtcGxlKHtkdHMsIHB0cywgZGF0YX0pO1xuICAgIHRyYWNrLnNhbXBsZXMucHVzaChzYW1wbGUpO1xuICB9XG5cbiAgcHVzaFZpZGVvU2FtcGxlIChwZXMpIHtcbiAgICBsZXQgbmFscyA9IE5hbHVuaXQuZ2V0TmFsdW5pdHMocGVzLkVTLmJ1ZmZlcik7XG4gICAgbGV0IHRyYWNrO1xuICAgIGlmICghdGhpcy5fdHJhY2tzLnZpZGVvVHJhY2spIHtcbiAgICAgIHRoaXMuX3RyYWNrcy52aWRlb1RyYWNrID0gbmV3IFZpZGVvVHJhY2soKTtcbiAgICAgIHRyYWNrID0gdGhpcy5fdHJhY2tzLnZpZGVvVHJhY2s7XG4gICAgICB0cmFjay5tZXRhID0gbmV3IFZpZGVvVHJhY2tNZXRhKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYWNrID0gdGhpcy5fdHJhY2tzLnZpZGVvVHJhY2s7XG4gICAgfVxuICAgIGxldCBzYW1wbGVMZW5ndGggPSAwO1xuICAgIGxldCBzcHMgPSBmYWxzZTtcbiAgICBsZXQgcHBzID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgbmFsID0gbmFsc1tpXTtcbiAgICAgIGlmIChuYWwuc3BzKSB7XG4gICAgICAgIC8vIFRPRE/vvJpWaWRlb1RyYWNr5L+h5oGvIOWSjCBNZXRhIOS/oeaBr1xuICAgICAgICBpZiAodHJhY2suc3BzICYmIFRzRGVtdXhlci5jb21wYWlyZVVpbnQ4KG5hbC5ib2R5LCB0cmFjay5zcHMpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBzcHMgPSBuYWw7XG4gICAgICAgIHRyYWNrLnNwcyA9IG5hbC5ib2R5O1xuICAgICAgICB0cmFjay5tZXRhLmNocm9tYUZvcm1hdCA9IHNwcy5zcHMuY2hyb21hX2Zvcm1hdFxuICAgICAgICB0cmFjay5tZXRhLmNvZGVjID0gJ2F2YzEuJztcbiAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCA0OyBqKyspIHtcbiAgICAgICAgICB2YXIgaCA9IHNwcy5ib2R5W2pdLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgICBpZiAoaC5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICBoID0gJzAnICsgaDtcbiAgICAgICAgICB9XG4gICAgICAgICAgdHJhY2subWV0YS5jb2RlYyArPSBoO1xuICAgICAgICB9XG4gICAgICAgIHRyYWNrLm1ldGEuY29kZWNIZWlnaHQgPSBzcHMuc3BzLmNvZGVjX3NpemUuaGVpZ2h0O1xuICAgICAgICB0cmFjay5tZXRhLmNvZGVjV2lkdGggPSBzcHMuc3BzLmNvZGVjX3NpemUud2lkdGg7XG4gICAgICAgIHRyYWNrLm1ldGEuZnJhbWVSYXRlID0gc3BzLnNwcy5mcmFtZV9yYXRlO1xuICAgICAgICB0cmFjay5tZXRhLmlkID0gMTtcbiAgICAgICAgdHJhY2subWV0YS5sZXZlbCA9IHNwcy5zcHMubGV2ZWxfc3RyaW5nO1xuICAgICAgICB0cmFjay5tZXRhLnByZXNlbnRIZWlnaHQgPSBzcHMuc3BzLnByZXNlbnRfc2l6ZS5oZWlnaHQ7XG4gICAgICAgIHRyYWNrLm1ldGEucHJlc2VudFdpZHRoID0gc3BzLnNwcy5wcmVzZW50X3NpemUud2lkdGg7XG4gICAgICAgIHRyYWNrLm1ldGEucHJvZmlsZSA9IHNwcy5zcHMucHJvZmlsZV9zdHJpbmc7XG4gICAgICAgIHRyYWNrLm1ldGEucmVmU2FtcGxlRHVyYXRpb24gPSBNYXRoLmZsb29yKHRyYWNrLm1ldGEudGltZXNjYWxlICogKHNwcy5zcHMuZnJhbWVfcmF0ZS5mcHNfZGVuIC8gc3BzLnNwcy5mcmFtZV9yYXRlLmZwc19udW0pKTtcbiAgICAgICAgdHJhY2subWV0YS5zYXJSYXRpbyA9IHNwcy5zcHMuc2FyX3JhdGlvID8gc3BzLnNwcy5zYXJfcmF0aW8gOiBzcHMuc3BzLnBhcl9yYXRpbztcbiAgICAgIH0gZWxzZSBpZiAobmFsLnBwcykge1xuICAgICAgICB0cmFjay5wcHMgPSBuYWwuYm9keTtcbiAgICAgICAgcHBzID0gbmFsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2FtcGxlTGVuZ3RoICs9ICg0ICsgbmFsLmJvZHkuYnl0ZUxlbmd0aCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHNwcyAmJiBwcHMpIHtcbiAgICAgIHRyYWNrLm1ldGEuYXZjYyA9IE5hbHVuaXQuZ2V0QXZjYyhzcHMuYm9keSwgcHBzLmJvZHkpO1xuICAgICAgaWYgKCF0aGlzLl9oYXNWaWRlb01ldGEpIHtcbiAgICAgICAgdGhpcy5faGFzVmlkZW9NZXRhID0gdHJ1ZVxuICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgJ3ZpZGVvJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGRhdGEgPSBuZXcgVWludDhBcnJheShzYW1wbGVMZW5ndGgpO1xuICAgIGxldCBvZmZzZXQgPSAwO1xuICAgIGxldCBpc0tleWZyYW1lID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgbmFsID0gbmFsc1tpXTtcbiAgICAgIGxldCBsZW5ndGggPSBuYWwuYm9keS5ieXRlTGVuZ3RoO1xuICAgICAgaWYgKG5hbC5pZHIpIHtcbiAgICAgICAgaXNLZXlmcmFtZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoIW5hbC5wcHMgJiYgIW5hbC5zcHMpIHtcbiAgICAgICAgZGF0YS5zZXQobmV3IFVpbnQ4QXJyYXkoW2xlbmd0aCA+Pj4gMjQgJiAweGZmLFxuICAgICAgICAgIGxlbmd0aCA+Pj4gMTYgJiAweGZmLFxuICAgICAgICAgIGxlbmd0aCA+Pj4gOCAmIDB4ZmYsXG4gICAgICAgICAgbGVuZ3RoICYgMHhmZlxuICAgICAgICBdKSwgb2Zmc2V0KTtcbiAgICAgICAgb2Zmc2V0ICs9IDQ7XG4gICAgICAgIGRhdGEuc2V0KG5hbC5ib2R5LCBvZmZzZXQpO1xuICAgICAgICBvZmZzZXQgKz0gbGVuZ3RoO1xuICAgICAgfVxuICAgIH1cbiAgICBsZXQgc2FtcGxlID0gbmV3IFZpZGVvVHJhY2tTYW1wbGUoe1xuICAgICAgZHRzOiBwYXJzZUludChwZXMuZHRzIC8gOTApLFxuICAgICAgcHRzOiBwYXJzZUludChwZXMucHRzIC8gOTApLFxuICAgICAgY3RzOiAocGVzLnB0cyAtIHBlcy5kdHMpIC8gOTAsXG4gICAgICBvcmlnaW5EdHM6IHBlcy5kdHMsXG4gICAgICBpc0tleWZyYW1lLFxuICAgICAgZGF0YVxuICAgIH0pXG4gICAgdHJhY2suc2FtcGxlcy5wdXNoKHNhbXBsZSk7XG4gIH1cblxuICBkZXN0b3J5ICgpIHtcbiAgICB0aGlzLm9mZihERU1VWF9FVkVOVFMuREVNVVhfU1RBUlQsIHRoaXMuZGVtdXgpO1xuICAgIHRoaXMuY29uZmlncyA9IHt9O1xuICAgIHRoaXMuZGVtdXhpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnBhdCA9IFtdO1xuICAgIHRoaXMucG10ID0gW107XG4gICAgdGhpcy5faGFzVmlkZW9NZXRhID0gZmFsc2U7XG4gICAgdGhpcy5faGFzQXVkaW9NZXRhID0gZmFsc2U7XG4gIH1cblxuICBzdGF0aWMgY29tcGFpcmVVaW50OCAoYSwgYikge1xuICAgIGlmIChhLmJ5dGVMZW5ndGggIT09IGIuYnl0ZUxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBsZXQgcmV0ID0gdHJ1ZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGEuYnl0ZUxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgICByZXQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuICBzdGF0aWMgTWVyZ2UgKGJ1ZmZlcnMpIHtcbiAgICBsZXQgZGF0YTtcbiAgICBsZXQgbGVuZ3RoID0gMDtcbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1ZmZlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxlbmd0aCArPSAoYnVmZmVyc1tpXS5sZW5ndGggLSBidWZmZXJzW2ldLnBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBkYXRhID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1ZmZlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBidWZmZXIgPSBidWZmZXJzW2ldO1xuICAgICAgZGF0YS5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmZmVyLmJ1ZmZlciwgYnVmZmVyLnBvc2l0aW9uKSwgb2Zmc2V0KTtcbiAgICAgIG9mZnNldCArPSBidWZmZXIubGVuZ3RoIC0gYnVmZmVyLnBvc2l0aW9uO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFN0cmVhbShkYXRhLmJ1ZmZlcik7XG4gIH1cblxuICBzdGF0aWMgcmVhZCAoc3RyZWFtLCB0cywgZnJhZ3MpIHtcbiAgICBUc0RlbXV4ZXIucmVhZEhlYWRlcihzdHJlYW0sIHRzKTtcbiAgICBUc0RlbXV4ZXIucmVhZFBheWxvYWQoc3RyZWFtLCB0cywgZnJhZ3MpO1xuICAgIGlmICh0cy5oZWFkZXIucGFja2V0ID09PSAnTUVESUEnICYmIHRzLmhlYWRlci5wYXlsb2FkID09PSAxICYmICF0cy51bmtub3duUElEcykge1xuICAgICAgdHMucGVzID0gVHNEZW11eGVyLlBFUyh0cyk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHJlYWRQYXlsb2FkIChzdHJlYW0sIHRzLCBmcmFncykge1xuICAgIGxldCBoZWFkZXIgPSB0cy5oZWFkZXJcbiAgICBsZXQgcGlkID0gaGVhZGVyLnBpZDtcbiAgICBzd2l0Y2ggKHBpZCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBUc0RlbXV4ZXIuUEFUKHN0cmVhbSwgdHMsIGZyYWdzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIFRzRGVtdXhlci5DQVQoc3RyZWFtLCB0cywgZnJhZ3MpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgVHNEZW11eGVyLlRTRFQoc3RyZWFtLCB0cywgZnJhZ3MpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMHgxZmZmOlxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIFRPRE86IHNvbWXnmoTlhpnms5XkuI3lpKrlpb3vvIzlvpfmlLlcbiAgICAgICAgaWYgKGZyYWdzLnBhdC5zb21lKChpdGVtKSA9PiB7IHJldHVybiBpdGVtLnBpZCA9PT0gcGlkOyB9KSkge1xuICAgICAgICAgIFRzRGVtdXhlci5QTVQoc3RyZWFtLCB0cywgZnJhZ3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCBzdHMgPSBmcmFncy5wbXQgPyBmcmFncy5wbXQuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnBpZCA9PT0gcGlkKSA6IFtdO1xuICAgICAgICAgIGlmIChzdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgVHNEZW11eGVyLk1lZGlhKHN0cmVhbSwgdHMsIFN0cmVhbVR5cGVbc3RzWzBdLnN0cmVhbVR5cGVdWzBdKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cy51bmtub3duUElEcyA9IHRydWU7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyByZWFkSGVhZGVyIChzdHJlYW0sIHRzKSB7XG4gICAgbGV0IGhlYWRlciA9IHt9O1xuICAgIGhlYWRlci5zeW5jID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIGxldCBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICBoZWFkZXIuZXJyb3IgPSBuZXh0ID4+PiAxNTtcbiAgICBoZWFkZXIucGF5bG9hZCA9IG5leHQgPj4+IDE0ICYgMTtcbiAgICBoZWFkZXIucHJpb3JpdHkgPSBuZXh0ID4+PiAxMyAmIDE7XG4gICAgaGVhZGVyLnBpZCA9IG5leHQgJiAweDFmZmY7XG5cbiAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuXG4gICAgaGVhZGVyLnNjcmFtYmxpbmcgPSBuZXh0ID4+IDYgJiAweDM7IC8vIOaYr+WQpuWKoOWvhu+8jDAw6KGo56S65LiN5Yqg5a+GXG5cbiAgICAvKipcbiAgICAgKiAwMCBJU08vSUVD5pyq5p2l5L2/55So5L+d55WZXG4gICAgICogMDEg5rKh5pyJ6LCD5pW05a2X5q6177yM5LuF5ZCr5pyJMTg0QuacieaViOWHgOiNt1xuICAgICAqIDAyIOayoeacieacieaViOWHgOiNt++8jOS7heWQq+aciTE4M0LosIPmlbTlrZfmrrVcbiAgICAgKiAwMyAwfjE4MkLosIPmlbTlrZfmrrXlkI7kuLrmnInmlYjlh4DojbdcbiAgICAgKi9cbiAgICBoZWFkZXIuYWRhcHRhdGlvbiA9IG5leHQgPj4gNCAmIDB4MztcbiAgICBoZWFkZXIuY29udGludWl0eSA9IG5leHQgJiAxNTtcbiAgICBoZWFkZXIucGFja2V0ID0gaGVhZGVyLnBpZCA9PT0gMCA/ICdQQVQnIDogJ01FRElBJztcbiAgICB0cy5oZWFkZXIgPSBoZWFkZXI7XG4gIH1cblxuICBzdGF0aWMgUEFUIChzdHJlYW0sIHRzLCBmcmFncykge1xuICAgIGxldCByZXQgPSB7fTtcbiAgICBsZXQgbmV4dCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICBzdHJlYW0uc2tpcChuZXh0KTtcbiAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHJldC50YWJlbElEID0gbmV4dDtcbiAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICByZXQuZXJyb3IgPSBuZXh0ID4+PiA3O1xuICAgIHJldC56ZXJvID0gbmV4dCA+Pj4gNiAmIDE7XG4gICAgcmV0LnNlY3Rpb25MZW5ndGggPSBuZXh0ICYgMHhmZmY7XG4gICAgcmV0LnN0cmVhbUlEID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICByZXQuY3VycmVudCA9IHN0cmVhbS5yZWFkVWludDgoKSAmIDE7XG4gICAgcmV0LnNlY3Rpb25OdW1iZXIgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgcmV0Lmxhc3RTZWN0aW9uTnVtYmVyID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIGxldCBOID0gKHJldC5zZWN0aW9uTGVuZ3RoIC0gOSkgLyA0O1xuICAgIGxldCBsaXN0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOOyBpKyspIHtcbiAgICAgIGxldCBwcm9ncmFtTnVtYmVyID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICAgIGxldCBwaWQgPSBzdHJlYW0ucmVhZFVpbnQxNigpICYgMHgxZmZmO1xuICAgICAgbGlzdC5wdXNoKHtcbiAgICAgICAgcHJvZ3JhbTogcHJvZ3JhbU51bWJlcixcbiAgICAgICAgcGlkLFxuICAgICAgICB0eXBlOiBwcm9ncmFtTnVtYmVyID09PSAwID8gJ25ldHdvcmsnIDogJ21hcFBJRCdcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAobGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICBmcmFncy5wYXQgPSBmcmFncy5wYXQuY29uY2F0KGxpc3QpO1xuICAgIH1cbiAgICByZXQubGlzdCA9IGxpc3Q7XG4gICAgcmV0LnByb2dyYW0gPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgIHJldC5waWQgPSBzdHJlYW0ucmVhZFVpbnQxNigpICYgMHgxZmZmO1xuICAgIHRzLnBheWxvYWQgPSByZXQ7XG4gICAgLy8gVE9ETyBDUkNcbiAgfVxuXG4gIHN0YXRpYyBQTVQgKHN0cmVhbSwgdHMsIGZyYWdzKSB7XG4gICAgbGV0IHJldCA9IHt9O1xuICAgIGxldCBoZWFkZXIgPSB0cy5oZWFkZXI7XG4gICAgaGVhZGVyLnBhY2tldCA9ICdQTVQnO1xuICAgIGxldCBuZXh0ID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHN0cmVhbS5za2lwKG5leHQpO1xuICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgcmV0LnRhYmxlSUQgPSBuZXh0O1xuICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgIHJldC5zZWN0aW9uTGVuZ3RoID0gbmV4dCAmIDB4ZmZmO1xuICAgIHJldC5wcm9ncmFtID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICByZXQuY3VycmVudCA9IHN0cmVhbS5yZWFkVWludDgoKSAmIDE7XG4gICAgcmV0Lm9yZGVyID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHJldC5sYXN0T3JkZXIgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgcmV0LlBDUl9QSUQgPSBzdHJlYW0ucmVhZFVpbnQxNigpICYgMHgxZmZmO1xuICAgIHJldC5wcm9ncmFtTGVuZ3RoID0gc3RyZWFtLnJlYWRVaW50MTYoKSAmIDB4ZmZmO1xuICAgIGxldCBOID0gKHJldC5zZWN0aW9uTGVuZ3RoIC0gMTMpIC8gNTtcbiAgICBsZXQgbGlzdCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTjsgaSsrKSB7XG4gICAgICBsaXN0LnB1c2goe1xuICAgICAgICBzdHJlYW1UeXBlOiBzdHJlYW0ucmVhZFVpbnQ4KCksXG4gICAgICAgIHBpZDogc3RyZWFtLnJlYWRVaW50MTYoKSAmIDB4MWZmZiwgLy8gMHgwN2U1IOinhumike+8jDB4MDdlNlxuICAgICAgICBlczogc3RyZWFtLnJlYWRVaW50MTYoKSAmIDB4ZmZmXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0Lmxpc3QgPSBsaXN0O1xuICAgIGlmICghdGhpcy5wbXQpIHtcbiAgICAgIHRoaXMucG10ID0gW107XG4gICAgfVxuICAgIGZyYWdzLnBtdCA9IHRoaXMucG10LmNvbmNhdChsaXN0Lm1hcCgoaXRlbSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGlkOiBpdGVtLnBpZCxcbiAgICAgICAgZXM6IGl0ZW0uZXMsXG4gICAgICAgIHN0cmVhbVR5cGU6IGl0ZW0uc3RyZWFtVHlwZSxcbiAgICAgICAgcHJvZ3JhbTogcmV0LnByb2dyYW1cbiAgICAgIH07XG4gICAgfSkpO1xuICAgIHRzLnBheWxvYWQgPSByZXQ7XG4gIH1cblxuICBzdGF0aWMgTWVkaWEgKHN0cmVhbSwgdHMsIHR5cGUpIHtcbiAgICBsZXQgaGVhZGVyID0gdHMuaGVhZGVyO1xuICAgIGxldCBwYXlsb2FkID0ge307XG4gICAgaGVhZGVyLnR5cGUgPSB0eXBlO1xuICAgIGlmIChoZWFkZXIuYWRhcHRhdGlvbiA9PT0gMHgwMykge1xuICAgICAgcGF5bG9hZC5hZGFwdGF0aW9uTGVuZ3RoID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgICAgaWYgKHBheWxvYWQuYWRhcHRhdGlvbkxlbmd0aCA+IDApIHtcbiAgICAgICAgbGV0IG5leHQgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgICAgIHBheWxvYWQuZGlzY29udGludWUgPSBuZXh0ID4+PiA3O1xuICAgICAgICBwYXlsb2FkLmFjY2VzcyA9IG5leHQgPj4+IDYgJiAweDAxO1xuICAgICAgICBwYXlsb2FkLnByaW9yaXR5ID0gbmV4dCA+Pj4gNSAmIDB4MDE7XG4gICAgICAgIHBheWxvYWQuUENSID0gbmV4dCA+Pj4gNCAmIDB4MDE7XG4gICAgICAgIHBheWxvYWQuT1BDUiA9IG5leHQgPj4+IDMgJiAweDAxO1xuICAgICAgICBwYXlsb2FkLnNwbGljZVBvaW50ID0gbmV4dCA+Pj4gMiAmIDB4MDE7XG4gICAgICAgIHBheWxvYWQudHJhbnNwb3J0UHJpdmF0ZSA9IG5leHQgPj4+IDEgJiAweDAxO1xuICAgICAgICBwYXlsb2FkLmFkYXB0YXRpb25GaWVsZCA9IG5leHQgJiAweDAxO1xuICAgICAgICBsZXQgX3N0YXJ0ID0gc3RyZWFtLnBvc2l0aW9uO1xuICAgICAgICBpZiAocGF5bG9hZC5QQ1IgPT09IDEpIHtcbiAgICAgICAgICBwYXlsb2FkLnByb2dyYW1DbG9ja0Jhc2UgPSBzdHJlYW0ucmVhZFVpbnQzMigpIDw8IDE7XG4gICAgICAgICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgICAgICAgcGF5bG9hZC5wcm9ncmFtQ2xvY2tCYXNlIHw9IG5leHQgPj4+IDE1O1xuICAgICAgICAgIHBheWxvYWQucHJvZ3JhbUNsb2NrRXh0ZW5zaW9uID0gbmV4dCAmIDB4MWZmO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXlsb2FkLk9QQ1IgPT09IDEpIHtcbiAgICAgICAgICBwYXlsb2FkLm9yaWdpblByb2dyYW1DbG9ja0Jhc2UgPSBzdHJlYW0ucmVhZFVpbnQzMigpIDw8IDE7XG4gICAgICAgICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgICAgICAgcGF5bG9hZC5vcmlnaW5Qcm9ncmFtQ2xvY2tCYXNlICs9IG5leHQgPj4+IDE1O1xuICAgICAgICAgIHBheWxvYWQub3JpZ2luUHJvZ3JhbUNsb2NrRXh0ZW5zaW9uID0gbmV4dCAmIDB4MWZmO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXlsb2FkLnNwbGljZVBvaW50ID09PSAxKSB7XG4gICAgICAgICAgcGF5bG9hZC5zcGxpY2VDb3VudGRvd24gPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBheWxvYWQudHJhbnNwb3J0UHJpdmF0ZSA9PT0gMSkge1xuICAgICAgICAgIGxldCBsZW5ndGggPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgICAgICAgbGV0IHRyYW5zcG9ydFByaXZhdGVEYXRhID0gW107XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdHJhbnNwb3J0UHJpdmF0ZURhdGEucHVzaChzdHJlYW0ucmVhZFVpbnQ4KCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocGF5bG9hZC5hZGFwdGF0aW9uRmllbGQgPT09IDEpIHtcbiAgICAgICAgICBsZXQgbGVuZ3RoID0gc3RyZWFtLnJlYWRVaW50OCgpXG4gICAgICAgICAgbGV0IG5leHQgPSBzdHJlYW0ucmVhZFVpbnQ4KClcbiAgICAgICAgICBsZXQgc3RhcnQgPSBzdHJlYW0ucG9zaXRpb247XG4gICAgICAgICAgbGV0IGx0dyA9IG5leHQgPj4+IDc7XG4gICAgICAgICAgbGV0IHBpZWNld2lzZSA9IG5leHQgPj4+IDYgJiAweDE7XG4gICAgICAgICAgbGV0IHNlYW1sZXNzID0gbmV4dCA+Pj4gNSAmIDB4MTtcbiAgICAgICAgICBpZiAobHR3ID09PSAxKSB7XG4gICAgICAgICAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICAgIHBheWxvYWQubHR3VmFsaWQgPSBuZXh0ID4+PiAxNTtcbiAgICAgICAgICAgIHBheWxvYWQubHR3T2Zmc2V0ID0gbmV4dCAmIDB4ZWZmZjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHBpZWNld2lzZSA9PT0gMSkge1xuICAgICAgICAgICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDI0KCk7XG4gICAgICAgICAgICBwYXlsb2FkLnBpZWNld2lzZVJhdGUgPSBuZXh0ICYgMHgzZmZmZmY7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzZWFtbGVzcyA9PT0gMSkge1xuICAgICAgICAgICAgbmV4dCA9IHN0cmVhbS5yZWFkSW50OCgpO1xuICAgICAgICAgICAgcGF5bG9hZC5zcGxpY2VUeXBlID0gbmV4dCA+Pj4gNDtcbiAgICAgICAgICAgIHBheWxvYWQuZHRzTmV4dEFVMSA9IG5leHQgPj4+IDEgJiAweDc7XG4gICAgICAgICAgICBwYXlsb2FkLm1hcmtlcjEgPSBuZXh0ICYgMHgxO1xuICAgICAgICAgICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgICAgICAgICBwYXlsb2FkLmR0c05leHRBVTIgPSBuZXh0ID4+PiAxO1xuICAgICAgICAgICAgcGF5bG9hZC5tYXJrZXIyID0gbmV4dCAmIDB4MTtcbiAgICAgICAgICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgICAgICAgICAgcGF5bG9hZC5kdHNOZXh0QVUzID0gbmV4dDtcbiAgICAgICAgICB9XG4gICAgICAgICAgc3RyZWFtLnNraXAobGVuZ3RoIC0gMSAtIChzdHJlYW0ucG9zaXRpb24gLSBzdGFydCkpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBsYXN0U3R1ZmZpbmcgPSBwYXlsb2FkLmFkYXB0YXRpb25MZW5ndGggLSAxIC0gKHN0cmVhbS5wb3NpdGlvbiAtIF9zdGFydCk7XG4gICAgICAgIHN0cmVhbS5za2lwKGxhc3RTdHVmZmluZyk7XG4gICAgICB9XG4gICAgfVxuICAgIHBheWxvYWQuc3RyZWFtID0gbmV3IFN0cmVhbShzdHJlYW0uYnVmZmVyLnNsaWNlKHN0cmVhbS5wb3NpdGlvbikpO1xuICAgIHRzLnBheWxvYWQgPSBwYXlsb2FkO1xuICB9XG5cbiAgc3RhdGljIFBFUyAodHMpIHtcbiAgICBsZXQgcmV0ID0ge307XG4gICAgbGV0IGJ1ZmZlciA9IHRzLnBheWxvYWQuc3RyZWFtO1xuICAgIFxuICAgIGxldCBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MjQoKTtcbiAgICBpZiAobmV4dCAhPT0gMSkge1xuICAgICAgcmV0LkVTID0ge307XG4gICAgICByZXQuRVMuYnVmZmVyID0gYnVmZmVyO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgc3RyZWFtSUQgPSBidWZmZXIucmVhZFVpbnQ4KCk7XG4gICAgICBpZiAoc3RyZWFtSUQgPj0gMHhlMCAmJiBzdHJlYW1JRCA8PSAweGVmKSB7XG4gICAgICAgIHJldC50eXBlID0gJ3ZpZGVvJztcbiAgICAgIH1cbiAgICAgIGlmIChzdHJlYW1JRCA+PSAweGMwICYmIHN0cmVhbUlEIDw9IDB4ZGYpIHtcbiAgICAgICAgcmV0LnR5cGUgPSAnYXVkaW8nO1xuICAgICAgfVxuICAgICAgbGV0IHBhY2tldExlbmd0aCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICByZXQucGFja2V0TGVuZ3RoID0gcGFja2V0TGVuZ3RoO1xuICAgICAgaWYgKHJldC50eXBlID09PSAndmlkZW8nIHx8IHJldC50eXBlID09PSAnYXVkaW8nKSB7XG4gICAgICAgIGxldCBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICBsZXQgZmlyc3QgPSBuZXh0ID4+PiA2O1xuICAgICAgICBpZiAoZmlyc3QgIT09IDB4MDIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Vycm9yIHdoZW4gcGFyc2UgcGVzIGhlYWRlcicpO1xuICAgICAgICB9XG4gICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQ4KCk7XG4gICAgICAgIHJldC5wdHNEVFNGbGFnID0gbmV4dCA+Pj4gNjtcbiAgICAgICAgcmV0LmVzY3JGbGFnID0gbmV4dCA+Pj4gNSAmIDB4MDE7XG4gICAgICAgIHJldC5lc1JhdGVGbGFnID0gbmV4dCA+Pj4gNCAmIDB4MDE7XG4gICAgICAgIHJldC5kc21GbGFnID0gbmV4dCA+Pj4gMyAmIDB4MDE7XG4gICAgICAgIHJldC5hZGRpdGlvbmFsRmxhZyA9IG5leHQgPj4+IDIgJiAweDAxO1xuICAgICAgICByZXQuY3JjRmxhZyA9IG5leHQgPj4+IDEgJiAweDAxO1xuICAgICAgICByZXQuZXh0ZW5zaW9uRmxhZyA9IG5leHQgJiAweDAxO1xuICAgICAgICByZXQucGVzSGVhZGVyTGVuZ3RoID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICBsZXQgTjEgPSByZXQucGVzSGVhZGVyTGVuZ3RoO1xuXG4gICAgICAgIGlmIChyZXQucHRzRFRTRmxhZyA9PT0gMikge1xuICAgICAgICAgIGxldCBwdHMgPSBbXTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICAgIHB0cy5wdXNoKG5leHQgPj4+IDEgJiAweDA3KTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBwdHMucHVzaChuZXh0ID4+PiAxKTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBwdHMucHVzaChuZXh0ID4+PiAxKTtcbiAgICAgICAgICByZXQucHRzID0gKHB0c1swXSA8PCAzMCB8IHB0c1sxXSA8PCAxNSB8IHB0c1syXSk7XG4gICAgICAgICAgTjEgLT0gNTtcbiAgICAgICAgICAvLyDop4bpopHlpoLmnpzmsqHmnIlkdHPnlKhwdHNcbiAgICAgICAgICBpZiAocmV0LnR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgICAgICAgIHJldC5kdHMgPSByZXQucHRzO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0LnB0c0RUU0ZsYWcgPT09IDMpIHtcbiAgICAgICAgICBsZXQgcHRzID0gW107XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgICBwdHMucHVzaChuZXh0ID4+PiAxICYgMHgwNyk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgcHRzLnB1c2gobmV4dCA+Pj4gMSk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgcHRzLnB1c2gobmV4dCA+Pj4gMSk7XG4gICAgICAgICAgcmV0LnB0cyA9IChwdHNbMF0gPDwgMzAgfCBwdHNbMV0gPDwgMTUgfCBwdHNbMl0pO1xuICAgICAgICAgIGxldCBkdHMgPSBbXTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICAgIGR0cy5wdXNoKG5leHQgPj4+IDEgJiAweDA3KTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBkdHMucHVzaChuZXh0ID4+PiAxKTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBkdHMucHVzaChuZXh0ID4+PiAxKTtcbiAgICAgICAgICByZXQuZHRzID0gKGR0c1swXSA8PCAzMCB8IGR0c1sxXSA8PCAxNSB8IGR0c1syXSk7XG4gICAgICAgICAgTjEgLT0gMTA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldC5lc2NyRmxhZyA9PT0gMSkge1xuICAgICAgICAgIGxldCBlc2NyID0gW11cbiAgICAgICAgICBsZXQgZXggPSBbXTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICAgIGVzY3IucHVzaChuZXh0ID4+PiAzICYgMHgwNyk7XG4gICAgICAgICAgZXNjci5wdXNoKG5leHQgJiAweDAzKTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBlc2NyLnB1c2gobmV4dCA+Pj4gMTMpO1xuICAgICAgICAgIGVzY3IucHVzaChuZXh0ICYgMHgwMyk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgZXNjci5wdXNoKG5leHQgPj4+IDEzKTtcbiAgICAgICAgICBleC5wdXNoKG5leHQgJiAweDAzKTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICAgIGV4LnB1c2gobmV4dCA+Pj4gMSk7XG4gICAgICAgICAgcmV0LmVzY3IgPSAoZXNjclswXSA8PCAzMCB8IGVzY3JbMV0gPDwgMjggfCBlc2NyWzJdIDw8IDE1IHwgZXNjclszXSA8PCAxMyB8IGVzY3JbNF0pICogMzAwICsgKGV4WzBdIDw8IDcgfCBleFsxXSk7XG4gICAgICAgICAgTjEgLT0gNjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0LmVzUmF0ZUZsYWcgPT09IDEpIHtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MjQoKTtcbiAgICAgICAgICByZXQuZXNSYXRlID0gbmV4dCA+Pj4gMSAmIDB4M2ZmZmZmO1xuICAgICAgICAgIE4xIC09IDM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldC5kc21GbGFnID09PSAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3Qgc3VwcG9ydCBEU01fdHJpY2tfbW9kZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXQuYWRkaXRpb25hbEZsYWcgPT09IDEpIHtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICAgIHJldC5hZGRpdGlvbmFsQ29weUluZm8gPSBuZXh0ICYgMHg3ZjtcbiAgICAgICAgICBOMSAtPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXQuY3JjRmxhZyA9PT0gMSkge1xuICAgICAgICAgIHJldC5wZXNDUkMgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgICAgIE4xIC09IDI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldC5leHRlbnNpb25GbGFnID09PSAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3Qgc3VwcG9ydCBleHRlbnNpb24nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoTjEgPiAwKSB7XG4gICAgICAgICAgYnVmZmVyLnNraXAoTjEpO1xuICAgICAgICB9XG4gICAgICAgIHJldC5FUyA9IFRzRGVtdXhlci5FUyhidWZmZXIsIHJldC50eXBlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZm9ybWF0IGlzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIHN0YXRpYyBFUyAoYnVmZmVyLCB0eXBlKSB7XG4gICAgbGV0IG5leHQ7XG4gICAgbGV0IHJldCA9IHt9O1xuICAgIGlmICh0eXBlID09PSAndmlkZW8nKSB7XG4gICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MzIoKTtcbiAgICAgIGlmIChuZXh0ICE9PSAxKSB7XG4gICAgICAgIGJ1ZmZlci5iYWNrKDQpO1xuICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MjQoKTtcbiAgICAgICAgaWYgKG5leHQgIT09IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2gyNjQgbmFsIGhlYWRlciBwYXJzZSBmYWlsZWQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnVmZmVyLnNraXAoMik7Ly8gMDkgRjBcbiAgICAgIC8vIFRPRE8gcmVhZG5hbHVcbiAgICAgIHJldC5idWZmZXIgPSBidWZmZXI7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnYXVkaW8nKSB7XG4gICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgIC8vIGFkdHPnmoTlkIzmraXlrZfoioLvvIwxMuS9jVxuICAgICAgaWYgKG5leHQgPj4+IDQgIT09IDB4ZmZmKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYWFjIEVTIHBhcnNlIEVycm9yJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBmcSA9IFs5NjAwMCwgODgyMDAsIDY0MDAwLCA0ODAwMCwgNDQxMDAsIDMyMDAwLCAyNDAwMCwgMjIwNTAsIDE2MDAwLCAxMjAwMCwgMTEwMjUsIDgwMDAsIDczNTBdO1xuICAgICAgcmV0LmlkID0gKG5leHQgPj4+IDMgJiAweDAxKSA9PT0gMCA/ICdNUEVHLTQnIDogJ01QRUctMic7XG4gICAgICByZXQubGF5ZXIgPSBuZXh0ID4+PiAxICYgMHgwMztcbiAgICAgIHJldC5hYnNlbnQgPSBuZXh0ICYgMHgwMTtcbiAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgcmV0LmF1ZGlvT2JqZWN0VHlwZSA9IChuZXh0ID4+PiAxNCAmIDB4MDMpICsgMTtcbiAgICAgIHJldC5wcm9maWxlID0gcmV0LmF1ZGlvT2JqZWN0VHlwZSAtIDE7XG4gICAgICByZXQuZnJlcXVlbmN5SW5kZXggPSBuZXh0ID4+PiAxMCAmIDB4MGY7XG4gICAgICByZXQuZnJlcXVlbmNlID0gZnFbcmV0LmZyZXF1ZW5jeUluZGV4XTtcbiAgICAgIHJldC5jaGFubmVsID0gbmV4dCA+Pj4gNiAmIDB4MDc7XG4gICAgICByZXQuZnJhbWVMZW5ndGggPSAobmV4dCAmIDB4MDMpIDw8IDExIHwgKGJ1ZmZlci5yZWFkVWludDE2KCkgPj4+IDUpO1xuICAgICAgcmV0LmF1ZGlvQ29uZmlnID0gVHNEZW11eGVyLmdldEF1ZGlvQ29uZmlnKHJldC5hdWRpb09iamVjdFR5cGUsIHJldC5jaGFubmVsLCByZXQuZnJlcXVlbmN5SW5kZXgpO1xuICAgICAgYnVmZmVyLnNraXAoMSk7XG4gICAgICByZXQuYnVmZmVyID0gYnVmZmVyO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEVTICR7dHlwZX0gaXMgbm90IHN1cHBvcnRlZGApO1xuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBzdGF0aWMgVFNEVCAoc3RyZWFtLCB0cywgZnJhZ3MpIHtcbiAgICAvLyBUT0RPXG4gICAgdHMucGF5bG9hZCA9IHt9O1xuICB9XG5cbiAgc3RhdGljIENBVCAoc3RyZWFtLCB0cywgZnJhZ3MpIHtcbiAgICBsZXQgcmV0ID0ge31cbiAgICByZXQudGFibGVJRCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICBsZXQgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgcmV0LnNlY3Rpb25JbmRpY2F0b3IgPSBuZXh0ID4+PiA3O1xuICAgIHJldC5zZWN0aW9uTGVuZ3RoID0gbmV4dCAmIDB4MGZmZjtcbiAgICBzdHJlYW0uc2tpcCgyKTtcbiAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHJldC52ZXJzaW9uID0gbmV4dCA+Pj4gMztcbiAgICByZXQuY3VycmVudE5leHRJbmRpY2F0b3IgPSBuZXh0ICYgMHgwMTtcbiAgICByZXQuc2VjdGlvbk51bWJlciA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICByZXQubGFzdFNlY3Rpb25OdW1iZXIgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgbGV0IE4gPSAodGhpcy5zZWN0aW9uTGVuZ3RoIC0gOSkgLyA0O1xuICAgIGxldCBsaXN0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOOyBpKyspIHtcbiAgICAgIGxpc3QucHVzaCh7fSk7XG4gICAgfVxuICAgIHJldC5jcmMzMiA9IHN0cmVhbS5yZWFkVWludDMyKCk7XG4gICAgdHMucGF5bG9hZCA9IHJldDtcbiAgfVxuXG4gIHN0YXRpYyBnZXRBdWRpb0NvbmZpZyAoYXVkaW9PYmplY3RUeXBlLCBjaGFubmVsLCBzYW1wbGVJbmRleCkge1xuICAgIGxldCB1c2VyQWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKClcbiAgICBsZXQgY29uZmlnO1xuICAgIGxldCBleHRlbnNpb25TYW1wbGVJbmRleDtcbiAgICBpZiAoL2ZpcmVmb3gvaS50ZXN0KHVzZXJBZ2VudCkpIHtcbiAgICAgIGlmIChzYW1wbGVJbmRleCA+PSA2KSB7XG4gICAgICAgIGF1ZGlvT2JqZWN0VHlwZSA9IDU7XG4gICAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSg0KTtcbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxlSW5kZXggPSBzYW1wbGVJbmRleCAtIDM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhdWRpb09iamVjdFR5cGUgPSAyO1xuICAgICAgICBjb25maWcgPSBuZXcgQXJyYXkoMik7XG4gICAgICAgIGV4dGVuc2lvblNhbXBsZUluZGV4ID0gc2FtcGxlSW5kZXg7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh1c2VyQWdlbnQuaW5kZXhPZignYW5kcm9pZCcpICE9PSAtMSkge1xuICAgICAgYXVkaW9PYmplY3RUeXBlID0gMjtcbiAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSgyKTtcbiAgICAgIGV4dGVuc2lvblNhbXBsZUluZGV4ID0gc2FtcGxlSW5kZXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF1ZGlvT2JqZWN0VHlwZSA9IDU7XG4gICAgICBjb25maWcgPSBuZXcgQXJyYXkoNCk7XG4gICAgICBpZiAoc2FtcGxlSW5kZXggPj0gNikge1xuICAgICAgICBleHRlbnNpb25TYW1wbGVJbmRleCA9IHNhbXBsZUluZGV4IC0gMztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChjaGFubmVsID09PSAxKSB7XG4gICAgICAgICAgYXVkaW9PYmplY3RUeXBlID0gMjtcbiAgICAgICAgICBjb25maWcgPSBuZXcgQXJyYXkoMik7XG4gICAgICAgIH1cbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxlSW5kZXggPSBzYW1wbGVJbmRleDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25maWdbMF0gPSBhdWRpb09iamVjdFR5cGUgPDwgMztcbiAgICBjb25maWdbMF0gfD0gKHNhbXBsZUluZGV4ICYgMHgwZSkgPj4gMTtcbiAgICBjb25maWdbMV0gPSAoc2FtcGxlSW5kZXggJiAweDAxKSA8PCA3O1xuICAgIGNvbmZpZ1sxXSB8PSBjaGFubmVsIDw8IDM7XG4gICAgaWYgKGF1ZGlvT2JqZWN0VHlwZSA9PT0gNSkge1xuICAgICAgY29uZmlnWzFdIHw9IChleHRlbnNpb25TYW1wbGVJbmRleCAmIDB4MGUpID4+IDE7XG4gICAgICBjb25maWdbMl0gPSAoZXh0ZW5zaW9uU2FtcGxlSW5kZXggJiAweDAxKSA8PCA3O1xuICAgICAgY29uZmlnWzJdIHw9IDIgPDwgMjtcbiAgICAgIGNvbmZpZ1szXSA9IDA7XG4gICAgfVxuICAgIHJldHVybiBjb25maWc7XG4gIH1cblxuICBnZXQgaW5wdXRCdWZmZXIgKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKHRoaXMuY29uZmlncy5pbnB1dGJ1ZmZlcik7XG4gIH1cblxuICBnZXQgX3RyYWNrcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRzRGVtdXhlcjtcbiIsImNsYXNzIFBsYXlsaXN0IHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZ3MpIHtcbiAgICB0aGlzLl9iYXNlVVJMID0gJyc7XG4gICAgdGhpcy5fbGlzdCA9IHt9O1xuICAgIHRoaXMuX3RzID0ge307XG4gICAgdGhpcy52ZXJzaW9uID0gMDtcbiAgICB0aGlzLnNlcXVlbmNlID0gLTE7XG4gICAgdGhpcy50YXJnZXRkdXJhdGlvbiA9IDA7XG4gICAgdGhpcy5kdXJhdGlvbiA9IDA7XG4gICAgdGhpcy5mcmFnTGVuZ3RoID0gMDtcbiAgICB0aGlzLl9sYXN0Z2V0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2F1ZG9jbGVhciA9IGNvbmZpZ3MuYXV0b2NsZWFyIHx8IGZhbHNlO1xuICB9XG5cbiAgZ2V0IGxpc3QgKCkge1xuICAgIHJldHVybiB0aGlzLl9saXN0O1xuICB9XG5cbiAgc2V0IGJhc2VVUkwgKGJhc2VVUkwpIHtcbiAgICBpZiAodGhpcy5iYXNlVVJMICE9PSBiYXNlVVJMKSB7XG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICB0aGlzLl9iYXNlVVJMID0gYmFzZVVSTDtcbiAgICB9XG4gIH1cblxuICBnZXQgYmFzZVVSTCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Jhc2VVUkw7XG4gIH1cblxuICBwdXNoICh0cywgZHVyYXRpb24pIHtcbiAgICBpZiAoIXRoaXMuX3RzW3RzXSkge1xuICAgICAgdGhpcy5fdHNbdHNdID0ge2R1cmF0aW9uOiBkdXJhdGlvbiwgZG93bmxvYWRlZDogZmFsc2UsIGRvd25sb2FkaW5nOiBmYWxzZSwgc3RhcnQ6IHRoaXMuZHVyYXRpb259O1xuICAgICAgdGhpcy5fbGlzdFt0aGlzLmR1cmF0aW9uXSA9IHRzO1xuICAgICAgdGhpcy5kdXJhdGlvbiArPSBkdXJhdGlvbjtcbiAgICAgIHRoaXMuZnJhZ0xlbmd0aCArPSAxO1xuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZUZyYWcgKHVybCkge1xuICAgIGlmICh0aGlzLl90c1t1cmxdKSB7XG4gICAgICBpZiAodGhpcy5fdHNbdXJsXS5zdGFydCA+IHRoaXMuX2xhc3RnZXQudGltZSkge1xuICAgICAgICB0aGlzLl9sYXN0Z2V0ID0ge1xuICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLl90c1t1cmxdLmR1cmF0aW9uLFxuICAgICAgICAgIHRpbWU6IHRoaXMuX3RzW3VybF0uc3RhcnQsXG4gICAgICAgICAgZG93bmxvYWRlZDogZmFsc2UsXG4gICAgICAgICAgZG93bmxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgIHVybDogdXJsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGRlbGV0ZSB0aGlzLl9saXN0W3RoaXMuX3RzW3VybF0uc3RhcnRdO1xuICAgICAgZGVsZXRlIHRoaXMuX3RzW3VybF07XG4gICAgICB0aGlzLmZyYWdMZW5ndGggLT0gMTtcbiAgICB9XG4gIH1cblxuICBwdXNoTTNVOCAoZGF0YSwgZGVsZXRlcHJlKSB7XG4gICAgLy8g5bi46KeE5L+h5oGv5pu/5o2iXG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudmVyc2lvbiA9IGRhdGEudmVyc2lvbjtcbiAgICB0aGlzLnRhcmdldGR1cmF0aW9uID0gZGF0YS50YXJnZXRkdXJhdGlvbjtcblxuICAgIC8vIOaWsOWIhueJh+S/oeaBr1xuICAgIGlmIChkYXRhLnNlcXVlbmNlID4gdGhpcy5zZXF1ZW5jZSkge1xuICAgICAgdGhpcy5zZXF1ZW5jZSA9IGRhdGEuc2VxdWVuY2U7XG4gICAgICBsZXQgbmV3ZnJhZ2xpc3QgPSBbXVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmZyYWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBmcmFnID0gZGF0YS5mcmFnc1tpXTtcbiAgICAgICAgaWYgKCF0aGlzLl90c1tmcmFnLnVybF0pIHtcbiAgICAgICAgICBuZXdmcmFnbGlzdC5wdXNoKGZyYWcudXJsKVxuICAgICAgICAgIHRoaXMucHVzaChmcmFnLnVybCwgZnJhZy5kdXJhdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChkZWxldGVwcmUpIHtcbiAgICAgICAgbGV0IHRzbGlzdCA9IHRoaXMuZ2V0VHNMaXN0KCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHNsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKG5ld2ZyYWdsaXN0LmluZGV4T2YodHNsaXN0W2ldKSA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlRnJhZyh0c2xpc3RbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldFRzTGlzdCAoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX3RzKTtcbiAgfVxuXG4gIGRvd25sb2FkZWQgKHRzbmFtZSwgaXNsb2FkZWQpIHtcbiAgICBsZXQgdHMgPSB0aGlzLl90c1t0c25hbWVdO1xuICAgIGlmICh0cykge1xuICAgICAgdHMuZG93bmxvYWRlZCA9IGlzbG9hZGVkXG4gICAgfVxuICB9XG5cbiAgZG93bmxvYWRpbmcgKHRzbmFtZSwgbG9hZGluZykge1xuICAgIGxldCB0cyA9IHRoaXMuX3RzW3RzbmFtZV07XG4gICAgaWYgKHRzKSB7XG4gICAgICB0cy5kb3dubG9hZGluZyA9IGxvYWRpbmdcbiAgICB9XG4gIH1cblxuICBnZXRUc0J5TmFtZSAobmFtZSkge1xuICAgIHJldHVybiB0aGlzLl90c1tuYW1lXTtcbiAgfVxuXG4gIGdldFRzICh0aW1lKSB7XG4gICAgbGV0IHRpbWVsaXN0ID0gT2JqZWN0LmtleXModGhpcy5fbGlzdCk7XG4gICAgbGV0IHRzO1xuXG4gICAgaWYgKHRpbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHRoaXMuX2xhc3RnZXQpIHtcbiAgICAgICAgdGltZSA9IHRoaXMuX2xhc3RnZXQudGltZSArIHRoaXMuX2xhc3RnZXQuZHVyYXRpb247XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aW1lID0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGltZWxpc3QubGVuZ3RoIDwgMSB8fCB0aW1lID49IHRoaXMuZHVyYXRpb24pIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHRpbWVsaXN0LnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KGEpIC0gcGFyc2VGbG9hdChiKVxuICAgIH0pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGltZWxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aW1lID49IHBhcnNlSW50KHRpbWVsaXN0W2ldKSkge1xuICAgICAgICBsZXQgdXJsID0gdGhpcy5fbGlzdFt0aW1lbGlzdFtpXV07XG4gICAgICAgIGxldCBkb3dubG9hZGVkID0gdGhpcy5fdHNbdXJsXS5kb3dubG9hZGVkO1xuICAgICAgICBsZXQgZG93bmxvYWRpbmcgPSB0aGlzLl90c1t1cmxdLmRvd25sb2FkaW5nO1xuICAgICAgICB0cyA9IHt1cmwsIGRvd25sb2FkZWQsIGRvd25sb2FkaW5nLCB0aW1lOiBwYXJzZUludCh0aW1lbGlzdFtpXSksIGR1cmF0aW9uOiBwYXJzZUludCh0aGlzLl90c1t1cmxdLmR1cmF0aW9uKX07XG4gICAgICAgIGlmICh0aGlzLmF1dG9jbGVhcikge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLl90c1t0aGlzLl9sYXN0Z2V0LnVybF07XG4gICAgICAgICAgZGVsZXRlIHRoaXMuX2xpc3RbdGhpcy5fbGFzdGdldC50aW1lXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sYXN0Z2V0ID0gdHM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRzO1xuICB9XG5cbiAgY2xlYXIgKCkge1xuICAgIHRoaXMuX2Jhc2VVUkwgPSAnJztcbiAgICB0aGlzLl9saXN0ID0ge307XG4gICAgdGhpcy5fdHMgPSB7fTtcbiAgICB0aGlzLnZlcnNpb24gPSAwO1xuICAgIHRoaXMuc2VxdWVuY2UgPSAtMTtcbiAgICB0aGlzLnRhcmdldGR1cmF0aW9uID0gMDtcbiAgICB0aGlzLmR1cmF0aW9uID0gMDtcbiAgfVxuXG4gIGNsZWFyRG93bmxvYWRlZCAoKSB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBPYmplY3Qua2V5cyh0aGlzLl90cykubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBsZXQgdHMgPSB0aGlzLl90c1tPYmplY3Qua2V5cyh0aGlzLl90cylbaV1dO1xuICAgICAgdHMuZG93bmxvYWRlZCA9IGZhbHNlO1xuICAgICAgdHMuZG93bmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLl9iYXNlVVJMID0gJyc7XG4gICAgdGhpcy5fbGlzdCA9IHt9O1xuICAgIHRoaXMuX3RzID0ge307XG4gICAgdGhpcy52ZXJzaW9uID0gMDtcbiAgICB0aGlzLnNlcXVlbmNlID0gLTE7XG4gICAgdGhpcy50YXJnZXRkdXJhdGlvbiA9IDA7XG4gICAgdGhpcy5kdXJhdGlvbiA9IDA7XG4gICAgdGhpcy5mcmFnTGVuZ3RoID0gMDtcbiAgICB0aGlzLl9sYXN0Z2V0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2F1ZG9jbGVhciA9IGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXlsaXN0O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIEZldGNoTG9hZGVyOiByZXF1aXJlKCcuL3NyYy9mZXRjaC1sb2FkZXInKS5kZWZhdWx0XG59O1xuIiwiaW1wb3J0IHsgRVZFTlRTIH0gZnJvbSAneGdwbGF5ZXItdXRpbHMnO1xuXG5jb25zdCBMT0FERVJfRVZFTlRTID0gRVZFTlRTLkxPQURFUl9FVkVOVFM7XG5jb25zdCBSRUFEX1NUUkVBTSA9IDA7XG5jb25zdCBSRUFEX1RFWFQgPSAxO1xuY29uc3QgUkVBRF9KU09OID0gMjtcbmNvbnN0IFJFQURfQlVGRkVSID0gMztcbmNsYXNzIEZldGNoTG9hZGVyIHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZ3MpIHtcbiAgICB0aGlzLmNvbmZpZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWdzKTtcbiAgICB0aGlzLnVybCA9IG51bGxcbiAgICB0aGlzLnN0YXR1cyA9IDBcbiAgICB0aGlzLmVycm9yID0gbnVsbFxuICAgIHRoaXMuX3JlYWRlciA9IG51bGw7XG4gICAgdGhpcy5fY2FuY2VsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnJlYWR0eXBlID0gdGhpcy5jb25maWdzLnJlYWR0eXBlO1xuICAgIHRoaXMuYnVmZmVyID0gdGhpcy5jb25maWdzLmJ1ZmZlciB8fCAnTE9BREVSX0JVRkZFUic7XG4gICAgdGhpcy5fbG9hZGVyVGFza05vID0gMDtcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIHRoaXMub24oTE9BREVSX0VWRU5UUy5MQURFUl9TVEFSVCwgdGhpcy5sb2FkLmJpbmQodGhpcykpXG4gIH1cblxuICBzdGF0aWMgZ2V0IHR5cGUgKCkge1xuICAgIHJldHVybiAnbG9hZGVyJ1xuICB9XG5cbiAgbG9hZCAodXJsLCBvcHRzKSB7XG4gICAgbGV0IF90aGlzID0gdGhpcztcbiAgICB0aGlzLnVybCA9IHVybDtcbiAgICB0aGlzLl9jYW5jZWxlZCA9IGZhbHNlO1xuXG4gICAgLy8gVE9ETzogQWRkIFJhbmdlc1xuICAgIGxldCBwYXJhbXMgPSB0aGlzLmdldFBhcmFtcyhvcHRzKVxuICAgIF90aGlzLmxvYWRpbmcgPSB0cnVlXG4gICAgcmV0dXJuIGZldGNoKHRoaXMudXJsLCBwYXJhbXMpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgX3RoaXMuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzXG4gICAgICAgIHJldHVybiBfdGhpcy5fb25GZXRjaFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfRVJST1IsIF90aGlzLCByZXNwb25zZSk7XG4gICAgICBfdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSAge1xuICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9FUlJPUiwgX3RoaXMsIGVycm9yKTtcbiAgICAgIF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKVxuICAgIH0pXG4gIH1cblxuICBfb25GZXRjaFJlc3BvbnNlIChyZXNwb25zZSkge1xuICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgbGV0IGJ1ZmZlciA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UodGhpcy5idWZmZXIpO1xuICAgIHRoaXMuX2xvYWRlclRhc2tObysrO1xuICAgIGxldCB0YXNrbm8gPSB0aGlzLl9sb2FkZXJUYXNrTm87XG4gICAgaWYgKHJlc3BvbnNlLm9rID09PSB0cnVlKSB7XG4gICAgICBzd2l0Y2ggKHRoaXMucmVhZHR5cGUpIHtcbiAgICAgICAgY2FzZSBSRUFEX0pTT046XG4gICAgICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIF90aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgICAgICAgaWYgKCFfdGhpcy5fY2FuY2VsZWQpIHtcbiAgICAgICAgICAgICAgaWYgKGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsIGJ1ZmZlcik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9DT01QTEVURSwgZGF0YSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBSRUFEX1RFWFQ6XG4gICAgICAgICAgcmVzcG9uc2UudGV4dCgpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIF90aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgICAgICAgaWYgKCFfdGhpcy5fY2FuY2VsZWQpIHtcbiAgICAgICAgICAgICAgaWYgKGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsIGJ1ZmZlcik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9DT01QTEVURSwgZGF0YSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBSRUFEX0JVRkZFUjpcbiAgICAgICAgICByZXNwb25zZS5hcnJheUJ1ZmZlcigpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIF90aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgICAgICAgaWYgKCFfdGhpcy5fY2FuY2VsZWQpIHtcbiAgICAgICAgICAgICAgaWYgKGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoKG5ldyBVaW50OEFycmF5KGRhdGEpKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0NPTVBMRVRFLCBidWZmZXIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsIGRhdGEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgUkVBRF9TVFJFQU06XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX29uUmVhZGVyKHJlc3BvbnNlLmJvZHkuZ2V0UmVhZGVyKCksIHRhc2tubyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX29uUmVhZGVyIChyZWFkZXIsIHRhc2tubykge1xuICAgIGxldCBidWZmZXIgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKHRoaXMuYnVmZmVyKTtcblxuICAgIGlmICghYnVmZmVyKSB7XG4gICAgICB0aGlzLl9yZWFkZXIuY2FuY2VsKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fcmVhZGVyID0gcmVhZGVyXG4gICAgaWYgKHRoaXMubG9hZGluZyA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBfdGhpcyA9IHRoaXNcbiAgICAvLyByZWFkZXIgcmVhZCBmdW5jdGlvbiByZXR1cm5zIGEgUHJvbWlzZS4gZ2V0IGRhdGEgd2hlbiBjYWxsYmFjayBhbmQgaGFzIHZhbHVlLmRvbmUgd2hlbiBkaXNjb25uZWN0ZWQuXG4gICAgLy8gcmVhZOaWueazlei/lOWbnuS4gOS4qlByb21pc2UuIOWbnuiwg+S4reWPr+S7peiOt+WPluWIsOaVsOaNruOAguW9k3ZhbHVlLmRvbmXlrZjlnKjml7bvvIzor7TmmI7pk77mjqXmlq3lvIDjgIJcbiAgICB0aGlzLl9yZWFkZXIgJiYgdGhpcy5fcmVhZGVyLnJlYWQoKS50aGVuKGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgIGlmICh2YWwuZG9uZSkge1xuICAgICAgICAvLyBUT0RPOiDlrozmiJDlpITnkIZcbiAgICAgICAgX3RoaXMubG9hZGluZyA9IGZhbHNlXG4gICAgICAgIF90aGlzLnN0YXR1cyA9IDA7XG4gICAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsIGJ1ZmZlcilcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChfdGhpcy5fY2FuY2VsZWQpIHtcbiAgICAgICAgX3RoaXMuX3JlYWRlci5jYW5jZWwoKVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBidWZmZXIucHVzaCh2YWwudmFsdWUpXG4gICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0RBVEFMT0FERUQsIGJ1ZmZlcilcbiAgICAgIHJldHVybiBfdGhpcy5fb25SZWFkZXIocmVhZGVyLCB0YXNrbm8pXG4gICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfRVJST1IsIF90aGlzLCBlcnJvcik7XG4gICAgICBfdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgfSlcbiAgfVxuXG4gIGdldFBhcmFtcyAob3B0cykge1xuICAgIGxldCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0cylcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKClcblxuICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgIG1vZGU6ICdjb3JzJyxcbiAgICAgIGNhY2hlOiAnZGVmYXVsdCdcbiAgICB9XG5cbiAgICAvLyBhZGQgY3VzdG1vciBoZWFkZXJzXG4gICAgLy8g5re75Yqg6Ieq5a6a5LmJ5aS0XG4gICAgaWYgKHR5cGVvZiB0aGlzLmNvbmZpZ3MuaGVhZGVycyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGxldCBjb25maWdIZWFkZXJzID0gdGhpcy5jb25maWdzLmhlYWRlcnNcbiAgICAgIGZvciAobGV0IGtleSBpbiBjb25maWdIZWFkZXJzKSB7XG4gICAgICAgIGlmIChjb25maWdIZWFkZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBoZWFkZXJzLmFwcGVuZChrZXksIGNvbmZpZ0hlYWRlcnNba2V5XSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5oZWFkZXJzID09PSAnb2JqZWN0Jykge1xuICAgICAgbGV0IG9wdEhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnNcbiAgICAgIGZvciAobGV0IGtleSBpbiBvcHRIZWFkZXJzKSB7XG4gICAgICAgIGlmIChvcHRIZWFkZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBoZWFkZXJzLmFwcGVuZChrZXksIG9wdEhlYWRlcnNba2V5XSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmNvcnMgPT09IGZhbHNlKSB7XG4gICAgICBwYXJhbXMubW9kZSA9ICdzYW1lLW9yaWdpbidcbiAgICB9XG5cbiAgICAvLyB3aXRoQ3JlZGVudGlhbHMgaXMgZGlzYWJsZWQgYnkgZGVmYXVsdFxuICAgIC8vIHdpdGhDcmVkZW50aWFscyDlnKjpu5jorqTmg4XlhrXkuIvkuI3ooqvkvb/nlKjjgIJcbiAgICBpZiAob3B0aW9ucy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgIHBhcmFtcy5jcmVkZW50aWFscyA9ICdpbmNsdWRlJ1xuICAgIH1cblxuICAgIC8vIFRPRE86IEFkZCByYW5nZXM7XG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxuXG4gIGNhbmNlbCAoKSB7XG4gICAgaWYgKHRoaXMuX3JlYWRlcikge1xuICAgICAgdGhpcy5fcmVhZGVyLmNhbmNlbCgpXG4gICAgICB0aGlzLl9yZWFkZXIgPSBudWxsXG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgdGhpcy5fY2FuY2VsZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuY2FuY2VsKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRmV0Y2hMb2FkZXJcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBNcDRSZW11eGVyOiByZXF1aXJlKCcuL3NyYy9tcDQnKS5kZWZhdWx0XG59O1xuIiwiaW1wb3J0IHsgQnVmZmVyIH0gZnJvbSAneGdwbGF5ZXItdXRpbHMnO1xuXG4vLyBjb25zdCBVSU5UMzJfTUFYID0gTWF0aC5wb3coMiwgMzIpIC0gMTtcbmNsYXNzIEZtcDQge1xuICBzdGF0aWMgc2l6ZSAodmFsdWUpIHtcbiAgICByZXR1cm4gQnVmZmVyLndyaXRlVWludDMyKHZhbHVlKVxuICB9XG4gIHN0YXRpYyBpbml0Qm94IChzaXplLCBuYW1lLCAuLi5jb250ZW50KSB7XG4gICAgY29uc3QgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgYnVmZmVyLndyaXRlKEZtcDQuc2l6ZShzaXplKSwgRm1wNC50eXBlKG5hbWUpLCAuLi5jb250ZW50KVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIGV4dGVuc2lvbiAodmVyc2lvbiwgZmxhZykge1xuICAgIHJldHVybiBuZXcgVWludDhBcnJheShbXG4gICAgICB2ZXJzaW9uLFxuICAgICAgKGZsYWcgPj4gMTYpICYgMHhmZixcbiAgICAgIChmbGFnID4+IDgpICYgMHhmZixcbiAgICAgIGZsYWcgJiAweGZmXG4gICAgXSlcbiAgfVxuICBzdGF0aWMgZnR5cCAoKSB7XG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgyNCwgJ2Z0eXAnLCBuZXcgVWludDhBcnJheShbXG4gICAgICAweDY5LCAweDczLCAweDZGLCAweDZELCAvLyBpc29tLFxuICAgICAgMHgwLCAweDAsIDB4MDAsIDB4MDEsIC8vIG1pbm9yX3ZlcnNpb246IDB4MDFcbiAgICAgIDB4NjksIDB4NzMsIDB4NkYsIDB4NkQsIC8vIGlzb21cbiAgICAgIDB4NjEsIDB4NzYsIDB4NjMsIDB4MzEgLy8gYXZjMVxuICAgIF0pKVxuICB9XG4gIHN0YXRpYyBtb292ICh7IHR5cGUsIG1ldGEgfSkge1xuICAgIGxldCBzaXplID0gOFxuICAgIGxldCBtdmhkID0gRm1wNC5tdmhkKG1ldGEuZHVyYXRpb24sIG1ldGEudGltZXNjYWxlKVxuICAgIGxldCB0cmFrXG5cbiAgICBpZiAodHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgdHJhayA9IEZtcDQudmlkZW9UcmFrKG1ldGEpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYWsgPSBGbXA0LmF1ZGlvVHJhayhtZXRhKVxuICAgIH1cblxuICAgIGxldCBtdmV4ID0gRm1wNC5tdmV4KG1ldGEuZHVyYXRpb24sIG1ldGEudGltZXNjYWxlIHx8IDEwMDAsIG1ldGEuaWQpO1xuICAgIFttdmhkLCB0cmFrLCBtdmV4XS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGhcbiAgICB9KVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goc2l6ZSwgJ21vb3YnLCBtdmhkLCB0cmFrLCBtdmV4KVxuICB9XG4gIHN0YXRpYyBtdmhkIChkdXJhdGlvbiwgdGltZXNjYWxlID0gMTAwMCkge1xuICAgIC8vIGR1cmF0aW9uICo9IHRpbWVzY2FsZTtcbiAgICBsZXQgYnl0ZXMgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyB2ZXJzaW9uKDApICsgZmxhZ3MgICAgIDHkvY3nmoRib3jniYjmnKwrM+S9jWZsYWdzICAgYm9454mI5pys77yMMOaIljHvvIzkuIDoiKzkuLow44CC77yI5Lul5LiL5a2X6IqC5pWw5Z2H5oyJdmVyc2lvbj0w77yJXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBjcmVhdGlvbl90aW1lICAgIOWIm+W7uuaXtumXtCAg77yI55u45a+55LqOVVRD5pe26Ze0MTkwNC0wMS0wMembtueCueeahOenkuaVsO+8iVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gbW9kaWZpY2F0aW9uX3RpbWUgICDkv67mlLnml7bpl7RcblxuICAgICAgLyoqXG4gICAgICAgICAgICAgKiB0aW1lc2NhbGU6IDQgYnl0ZXPmlofku7blqpLkvZPlnKgx56eS5pe26Ze05YaF55qE5Yi75bqm5YC877yM5Y+v5Lul55CG6Kej5Li6MeenkumVv+W6plxuICAgICAgICAgICAgICovXG4gICAgICAodGltZXNjYWxlID4+PiAyNCkgJiAweEZGLFxuICAgICAgKHRpbWVzY2FsZSA+Pj4gMTYpICYgMHhGRixcbiAgICAgICh0aW1lc2NhbGUgPj4+IDgpICYgMHhGRixcbiAgICAgICh0aW1lc2NhbGUpICYgMHhGRixcblxuICAgICAgLyoqXG4gICAgICAgICAgICAgKiBkdXJhdGlvbjogNCBieXRlc+ivpXRyYWNr55qE5pe26Ze06ZW/5bqm77yM55SoZHVyYXRpb27lkox0aW1lIHNjYWxl5YC85Y+v5Lul6K6h566XdHJhY2vml7bplb/vvIzmr5TlpoJhdWRpbyB0cmFja+eahHRpbWUgc2NhbGUgPSA4MDAwLFxuICAgICAgICAgICAgICogZHVyYXRpb24gPSA1NjAxMjjvvIzml7bplb/kuLo3MC4wMTbvvIx2aWRlbyB0cmFja+eahHRpbWUgc2NhbGUgPSA2MDAsIGR1cmF0aW9uID0gNDIwMDDvvIzml7bplb/kuLo3MFxuICAgICAgICAgICAgICovXG4gICAgICAoZHVyYXRpb24gPj4+IDI0KSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24gPj4+IDE2KSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24gPj4+IDgpICYgMHhGRixcbiAgICAgIChkdXJhdGlvbikgJiAweEZGLFxuICAgICAgMHgwMCwgMHgwMSwgMHgwMCwgMHgwMCwgLy8gUHJlZmVycmVkIHJhdGU6IDEuMCAgIOaOqOiNkOaSreaUvumAn+eOh++8jOmrmDE25L2N5ZKM5L2OMTbkvY3liIbliKvkuLrlsI/mlbDngrnmlbTmlbDpg6jliIblkozlsI/mlbDpg6jliIbvvIzljbNbMTYuMTZdIOagvOW8j++8jOivpeWAvOS4ujEuMO+8iDB4MDAwMTAwMDDvvInooajnpLrmraPluLjliY3lkJHmkq3mlL5cbiAgICAgIC8qKlxuICAgICAgICAgICAgICogUHJlZmVycmVkVm9sdW1lKDEuMCwgMmJ5dGVzKSArIHJlc2VydmVkKDJieXRlcylcbiAgICAgICAgICAgICAqIOS4jnJhdGXnsbvkvLzvvIxbOC44XSDmoLzlvI/vvIwxLjDvvIgweDAxMDDvvInooajnpLrmnIDlpKfpn7Pph49cbiAgICAgICAgICAgICAqL1xuICAgICAgMHgwMSwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vICByZXNlcnZlZDogNCArIDQgYnl0ZXPkv53nlZnkvY1cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAxLCAweDAwLCAweDAwLCAvLyAtLS0tYmVnaW4gY29tcG9zaXRpb24gbWF0cml4LS0tLVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIOinhumikeWPmOaNouefqemYtSAgIOe6v+aAp+S7o+aVsFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDEsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDQwLCAweDAwLCAweDAwLCAweDAwLCAvLyAtLS0tZW5kIGNvbXBvc2l0aW9uIG1hdHJpeC0tLS1cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIC0tLS1iZWdpbiBwcmVfZGVmaW5lZCA2ICogNCBieXRlcy0tLS1cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBwcmUtZGVmaW5lZCDkv53nlZnkvY1cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gLS0tLWVuZCBwcmVfZGVmaW5lZCA2ICogNCBieXRlcy0tLS1cbiAgICAgIDB4RkYsIDB4RkYsIDB4RkYsIDB4RkYgLy8gbmV4dF90cmFja19JRCDkuIvkuIDkuKp0cmFja+S9v+eUqOeahGlk5Y+3XG4gICAgXSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDggKyBieXRlcy5sZW5ndGgsICdtdmhkJywgbmV3IFVpbnQ4QXJyYXkoYnl0ZXMpKVxuICB9XG4gIHN0YXRpYyB2aWRlb1RyYWsgKGRhdGEpIHtcbiAgICBsZXQgc2l6ZSA9IDhcblxuICAgIGxldCB0a2hkID0gRm1wNC50a2hkKHtcbiAgICAgIGlkOiAxLFxuICAgICAgZHVyYXRpb246IGRhdGEuZHVyYXRpb24sXG4gICAgICB0aW1lc2NhbGU6IGRhdGEudGltZXNjYWxlIHx8IDEwMDAsXG4gICAgICB3aWR0aDogZGF0YS5wcmVzZW50V2lkdGgsXG4gICAgICBoZWlnaHQ6IGRhdGEucHJlc2VudEhlaWdodCxcbiAgICAgIHR5cGU6ICd2aWRlbydcbiAgICB9KVxuICAgIGxldCBtZGlhID0gRm1wNC5tZGlhKHtcbiAgICAgIHR5cGU6ICd2aWRlbycsXG4gICAgICB0aW1lc2NhbGU6IGRhdGEudGltZXNjYWxlIHx8IDEwMDAsXG4gICAgICBkdXJhdGlvbjogZGF0YS5kdXJhdGlvbixcbiAgICAgIGF2Y2M6IGRhdGEuYXZjYyxcbiAgICAgIHBhclJhdGlvOiBkYXRhLnBhclJhdGlvLFxuICAgICAgd2lkdGg6IGRhdGEucHJlc2VudFdpZHRoLFxuICAgICAgaGVpZ2h0OiBkYXRhLnByZXNlbnRIZWlnaHRcbiAgICB9KTtcbiAgICBbdGtoZCwgbWRpYV0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KHNpemUsICd0cmFrJywgdGtoZCwgbWRpYSlcbiAgfVxuICBzdGF0aWMgYXVkaW9UcmFrIChkYXRhKSB7XG4gICAgbGV0IHNpemUgPSA4XG4gICAgbGV0IHRraGQgPSBGbXA0LnRraGQoe1xuICAgICAgaWQ6IDIsXG4gICAgICBkdXJhdGlvbjogZGF0YS5kdXJhdGlvbixcbiAgICAgIHRpbWVzY2FsZTogZGF0YS50aW1lc2NhbGUgfHwgMTAwMCxcbiAgICAgIHdpZHRoOiAwLFxuICAgICAgaGVpZ2h0OiAwLFxuICAgICAgdHlwZTogJ2F1ZGlvJ1xuICAgIH0pXG4gICAgbGV0IG1kaWEgPSBGbXA0Lm1kaWEoe1xuICAgICAgdHlwZTogJ2F1ZGlvJyxcbiAgICAgIHRpbWVzY2FsZTogZGF0YS50aW1lc2NhbGUgfHwgMTAwMCxcbiAgICAgIGR1cmF0aW9uOiBkYXRhLmR1cmF0aW9uLFxuICAgICAgY2hhbm5lbENvdW50OiBkYXRhLmNoYW5uZWxDb3VudCxcbiAgICAgIHNhbXBsZXJhdGU6IGRhdGEuc2FtcGxlUmF0ZSxcbiAgICAgIGNvbmZpZzogZGF0YS5jb25maWdcbiAgICB9KTtcbiAgICBbdGtoZCwgbWRpYV0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KHNpemUsICd0cmFrJywgdGtoZCwgbWRpYSlcbiAgfVxuICBzdGF0aWMgdGtoZCAoZGF0YSkge1xuICAgIGxldCBpZCA9IGRhdGEuaWRcbiAgICBsZXQgZHVyYXRpb24gPSBkYXRhLmR1cmF0aW9uXG4gICAgbGV0IHdpZHRoID0gZGF0YS53aWR0aFxuICAgIGxldCBoZWlnaHQgPSBkYXRhLmhlaWdodFxuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwNywgLy8gdmVyc2lvbigwKSArIGZsYWdzIDHkvY3niYjmnKwgYm9454mI5pys77yMMOaIljHvvIzkuIDoiKzkuLow44CC77yI5Lul5LiL5a2X6IqC5pWw5Z2H5oyJdmVyc2lvbj0w77yJ5oyJ5L2N5oiW5pON5L2c57uT5p6c5YC877yM6aKE5a6a5LmJ5aaC5LiL77yaXG4gICAgICAvLyAweDAwMDAwMSB0cmFja19lbmFibGVk77yM5ZCm5YiZ6K+ldHJhY2vkuI3ooqvmkq3mlL7vvJtcbiAgICAgIC8vIDB4MDAwMDAyIHRyYWNrX2luX21vdmll77yM6KGo56S66K+ldHJhY2vlnKjmkq3mlL7kuK3ooqvlvJXnlKjvvJtcbiAgICAgIC8vIDB4MDAwMDA0IHRyYWNrX2luX3ByZXZpZXfvvIzooajnpLror6V0cmFja+WcqOmihOiniOaXtuiiq+W8leeUqOOAglxuICAgICAgLy8g5LiA6Iis6K+l5YC85Li6N++8jDErMis0IOWmguaenOS4gOS4quWqkuS9k+aJgOaciXRyYWNr5Z2H5pyq6K6+572udHJhY2tfaW5fbW92aWXlkox0cmFja19pbl9wcmV2aWV377yM5bCG6KKr55CG6Kej5Li65omA5pyJdHJhY2vlnYforr7nva7kuobov5nkuKTpobnvvJvlr7nkuo5oaW50IHRyYWNr77yM6K+l5YC85Li6MFxuICAgICAgLy8gaGludCB0cmFjayDov5nkuKrnibnmrornmoR0cmFja+W5tuS4jeWMheWQq+WqkuS9k+aVsOaNru+8jOiAjOaYr+WMheWQq+S6huS4gOS6m+WwhuWFtuS7luaVsOaNrnRyYWNr5omT5YyF5oiQ5rWB5aqS5L2T55qE5oyH56S65L+h5oGv44CCXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBjcmVhdGlvbl90aW1l5Yib5bu65pe26Ze077yI55u45a+55LqOVVRD5pe26Ze0MTkwNC0wMS0wMembtueCueeahOenkuaVsO+8iVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gbW9kaWZpY2F0aW9uIHRpbWUg5L+u5pS55pe26Ze0XG4gICAgICAoaWQgPj4+IDI0KSAmIDB4RkYsIC8vIHRyYWNrX0lEOiA0IGJ5dGVzIGlk5Y+377yM5LiN6IO96YeN5aSN5LiU5LiN6IO95Li6MFxuICAgICAgKGlkID4+PiAxNikgJiAweEZGLFxuICAgICAgKGlkID4+PiA4KSAmIDB4RkYsXG4gICAgICAoaWQpICYgMHhGRixcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkOiA0IGJ5dGVzICAgIOS/neeVmeS9jVxuICAgICAgKGR1cmF0aW9uID4+PiAyNCkgJiAweEZGLCAvLyBkdXJhdGlvbjogNCBieXRlcyB0cmFja+eahOaXtumXtOmVv+W6plxuICAgICAgKGR1cmF0aW9uID4+PiAxNikgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uID4+PiA4KSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24pICYgMHhGRixcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkOiAyICogNCBieXRlcyAgICDkv53nlZnkvY1cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBsYXllcigyYnl0ZXMpICsgYWx0ZXJuYXRlX2dyb3VwKDJieXRlcykgIOinhumikeWxgu+8jOm7mOiupOS4ujDvvIzlgLzlsI/nmoTlnKjkuIrlsYIudHJhY2vliIbnu4Tkv6Hmga/vvIzpu5jorqTkuLow6KGo56S66K+ldHJhY2vmnKrkuI7lhbbku5Z0cmFja+aciee+pOe7hOWFs+ezu1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gdm9sdW1lKDJieXRlcykgKyByZXNlcnZlZCgyYnl0ZXMpICAgIFs4LjhdIOagvOW8j++8jOWmguaenOS4uumfs+mikXRyYWNr77yMMS4w77yIMHgwMTAw77yJ6KGo56S65pyA5aSn6Z+z6YeP77yb5ZCm5YiZ5Li6MCAgICvkv53nlZnkvY1cbiAgICAgIDB4MDAsIDB4MDEsIDB4MDAsIDB4MDAsIC8vIC0tLS1iZWdpbiBjb21wb3NpdGlvbiBtYXRyaXgtLS0tXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAxLCAweDAwLCAweDAwLCAvLyDop4bpopHlj5jmjaLnn6npmLVcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4NDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIC0tLS1lbmQgY29tcG9zaXRpb24gbWF0cml4LS0tLVxuICAgICAgKHdpZHRoID4+PiA4KSAmIDB4RkYsIC8vIC8v5a695bqmXG4gICAgICAod2lkdGgpICYgMHhGRixcbiAgICAgIDB4MDAsIDB4MDAsXG4gICAgICAoaGVpZ2h0ID4+PiA4KSAmIDB4RkYsIC8vIOmrmOW6plxuICAgICAgKGhlaWdodCkgJiAweEZGLFxuICAgICAgMHgwMCwgMHgwMFxuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCg4ICsgY29udGVudC5ieXRlTGVuZ3RoLCAndGtoZCcsIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIGVkdHMgKGRhdGEpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IGR1cmF0aW9uID0gZGF0YS5kdXJhdGlvblxuICAgIGxldCBtZWRpYVRpbWUgPSBkYXRhLm1lZGlhVGltZVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoMzYpLCBGbXA0LnR5cGUoJ2VkdHMnKSlcbiAgICAvLyBlbHN0XG4gICAgYnVmZmVyLndyaXRlKEZtcDQuc2l6ZSgyOCksIEZtcDQudHlwZSgnZWxzdCcpKVxuICAgIGJ1ZmZlci53cml0ZShuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAxLCAvLyBlbnRyeSBjb3VudFxuICAgICAgKGR1cmF0aW9uID4+IDI0KSAmIDB4ZmYsIChkdXJhdGlvbiA+PiAxNikgJiAweGZmLCAoZHVyYXRpb24gPj4gOCkgJiAweGZmLCBkdXJhdGlvbiAmIDB4ZmYsXG4gICAgICAobWVkaWFUaW1lID4+IDI0KSAmIDB4ZmYsIChtZWRpYVRpbWUgPj4gMTYpICYgMHhmZiwgKG1lZGlhVGltZSA+PiA4KSAmIDB4ZmYsIG1lZGlhVGltZSAmIDB4ZmYsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAxIC8vIG1lZGlhIHJhdGVcbiAgICBdKSlcbiAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlclxuICB9XG4gIHN0YXRpYyBtZGlhIChkYXRhKSB7XG4gICAgbGV0IHNpemUgPSA4XG4gICAgbGV0IG1kaGQgPSBGbXA0Lm1kaGQoZGF0YS50aW1lc2NhbGUsIGRhdGEuZHVyYXRpb24pXG4gICAgbGV0IGhkbHIgPSBGbXA0LmhkbHIoZGF0YS50eXBlKVxuICAgIGxldCBtaW5mID0gRm1wNC5taW5mKGRhdGEpO1xuICAgIFttZGhkLCBoZGxyLCBtaW5mXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGhcbiAgICB9KVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goc2l6ZSwgJ21kaWEnLCBtZGhkLCBoZGxyLCBtaW5mKVxuICB9XG4gIHN0YXRpYyBtZGhkICh0aW1lc2NhbGUgPSAxMDAwLCBkdXJhdGlvbikge1xuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gY3JlYXRpb25fdGltZSAgICDliJvlu7rml7bpl7RcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIG1vZGlmaWNhdGlvbl90aW1l5L+u5pS55pe26Ze0XG4gICAgICAodGltZXNjYWxlID4+PiAyNCkgJiAweEZGLCAvLyB0aW1lc2NhbGU6IDQgYnl0ZXMgICAg5paH5Lu25aqS5L2T5ZyoMeenkuaXtumXtOWGheeahOWIu+W6puWAvO+8jOWPr+S7peeQhuino+S4ujHnp5Lplb/luqZcbiAgICAgICh0aW1lc2NhbGUgPj4+IDE2KSAmIDB4RkYsXG4gICAgICAodGltZXNjYWxlID4+PiA4KSAmIDB4RkYsXG4gICAgICAodGltZXNjYWxlKSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24gPj4+IDI0KSAmIDB4RkYsIC8vIGR1cmF0aW9uOiA0IGJ5dGVzICB0cmFja+eahOaXtumXtOmVv+W6plxuICAgICAgKGR1cmF0aW9uID4+PiAxNikgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uID4+PiA4KSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24pICYgMHhGRixcbiAgICAgIDB4NTUsIDB4QzQsIC8vIGxhbmd1YWdlOiB1bmQgKHVuZGV0ZXJtaW5lZCkg5aqS5L2T6K+t6KiA56CB44CC5pyA6auY5L2N5Li6MO+8jOWQjumdojE15L2N5Li6M+S4quWtl+espu+8iOingUlTTyA2MzktMi9U5qCH5YeG5Lit5a6a5LmJ77yJXG4gICAgICAweDAwLCAweDAwIC8vIHByZV9kZWZpbmVkID0gMFxuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxMiArIGNvbnRlbnQuYnl0ZUxlbmd0aCwgJ21kaGQnLCBGbXA0LmV4dGVuc2lvbigwLCAwKSwgY29udGVudClcbiAgfVxuICBzdGF0aWMgaGRsciAodHlwZSkge1xuICAgIGxldCB2YWx1ZSA9IFsweDAwLCAvLyB2ZXJzaW9uIDBcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBwcmVfZGVmaW5lZFxuICAgICAgMHg3NiwgMHg2OSwgMHg2NCwgMHg2NSwgLy8gaGFuZGxlcl90eXBlOiAndmlkZSdcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4NTYsIDB4NjksIDB4NjQsIDB4NjUsXG4gICAgICAweDZmLCAweDQ4LCAweDYxLCAweDZlLFxuICAgICAgMHg2NCwgMHg2YywgMHg2NSwgMHg3MiwgMHgwMCAvLyBuYW1lOiAnVmlkZW9IYW5kbGVyJ1xuICAgIF1cbiAgICBpZiAodHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgdmFsdWUuc3BsaWNlKDgsIDQsIC4uLlsweDczLCAweDZmLCAweDc1LCAweDZlXSlcbiAgICAgIHZhbHVlLnNwbGljZSgyNCwgMTMsIC4uLlsweDUzLCAweDZmLCAweDc1LCAweDZlLFxuICAgICAgICAweDY0LCAweDQ4LCAweDYxLCAweDZlLFxuICAgICAgICAweDY0LCAweDZjLCAweDY1LCAweDcyLCAweDAwXSlcbiAgICB9XG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCg4ICsgdmFsdWUubGVuZ3RoLCAnaGRscicsIG5ldyBVaW50OEFycmF5KHZhbHVlKSlcbiAgfVxuICBzdGF0aWMgbWluZiAoZGF0YSkge1xuICAgIGxldCBzaXplID0gOFxuICAgIGxldCB2bWhkID0gZGF0YS50eXBlID09PSAndmlkZW8nID8gRm1wNC52bWhkKCkgOiBGbXA0LnNtaGQoKVxuICAgIGxldCBkaW5mID0gRm1wNC5kaW5mKClcbiAgICBsZXQgc3RibCA9IEZtcDQuc3RibChkYXRhKTtcbiAgICBbdm1oZCwgZGluZiwgc3RibF0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KHNpemUsICdtaW5mJywgdm1oZCwgZGluZiwgc3RibClcbiAgfVxuICBzdGF0aWMgdm1oZCAoKSB7XG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgyMCwgJ3ZtaGQnLCBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uXG4gICAgICAweDAwLCAweDAwLCAweDAxLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgLy8gZ3JhcGhpY3Ntb2RlXG4gICAgICAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAgLy8gb3Bjb2xvclxuICAgIF0pKVxuICB9XG4gIHN0YXRpYyBzbWhkICgpIHtcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDE2LCAnc21oZCcsIG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIC8vIHZlcnNpb25cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAweDAwLCAweDAwLCAvLyBiYWxhbmNlXG4gICAgICAweDAwLCAweDAwIC8vIHJlc2VydmVkXG4gICAgXSkpXG4gIH1cbiAgc3RhdGljIGRpbmYgKCkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgZHJlZiA9IFsweDAwLCAvLyB2ZXJzaW9uIDBcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAxLCAvLyBlbnRyeV9jb3VudFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwYywgLy8gZW50cnlfc2l6ZVxuICAgICAgMHg3NSwgMHg3MiwgMHg2YywgMHgyMCwgLy8gJ3VybCcgdHlwZVxuICAgICAgMHgwMCwgLy8gdmVyc2lvbiAwXG4gICAgICAweDAwLCAweDAwLCAweDAxIC8vIGVudHJ5X2ZsYWdzXG4gICAgXVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoMzYpLCBGbXA0LnR5cGUoJ2RpbmYnKSwgRm1wNC5zaXplKDI4KSwgRm1wNC50eXBlKCdkcmVmJyksIG5ldyBVaW50OEFycmF5KGRyZWYpKVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIHN0YmwgKGRhdGEpIHtcbiAgICBsZXQgc2l6ZSA9IDhcbiAgICBsZXQgc3RzZCA9IEZtcDQuc3RzZChkYXRhKVxuICAgIGxldCBzdHRzID0gRm1wNC5zdHRzKClcbiAgICBsZXQgc3RzYyA9IEZtcDQuc3RzYygpXG4gICAgbGV0IHN0c3ogPSBGbXA0LnN0c3ooKVxuICAgIGxldCBzdGNvID0gRm1wNC5zdGNvKCk7XG4gICAgW3N0c2QsIHN0dHMsIHN0c2MsIHN0c3osIHN0Y29dLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aFxuICAgIH0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveChzaXplLCAnc3RibCcsIHN0c2QsIHN0dHMsIHN0c2MsIHN0c3osIHN0Y28pXG4gIH1cbiAgc3RhdGljIHN0c2QgKGRhdGEpIHtcbiAgICBsZXQgY29udGVudFxuICAgIGlmIChkYXRhLnR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgIC8vIGlmICghZGF0YS5pc0FBQyAmJiBkYXRhLmNvZGVjID09PSAnbXA0Jykge1xuICAgICAgLy8gICAgIGNvbnRlbnQgPSBGTVA0Lm1wMyhkYXRhKTtcbiAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAvL1xuICAgICAgLy8gfVxuICAgICAgLy8g5pSv5oyBbXA0YVxuICAgICAgY29udGVudCA9IEZtcDQubXA0YShkYXRhKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb250ZW50ID0gRm1wNC5hdmMxKGRhdGEpXG4gICAgfVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTYgKyBjb250ZW50LmJ5dGVMZW5ndGgsICdzdHNkJywgRm1wNC5leHRlbnNpb24oMCwgMCksIG5ldyBVaW50OEFycmF5KFsweDAwLCAweDAwLCAweDAwLCAweDAxXSksIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIG1wNGEgKGRhdGEpIHtcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMSwgLy8gZGF0YV9yZWZlcmVuY2VfaW5kZXhcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgZGF0YS5jaGFubmVsQ291bnQsIC8vIGNoYW5uZWxjb3VudFxuICAgICAgMHgwMCwgMHgxMCwgLy8gc2FtcGxlU2l6ZToxNmJpdHNcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkMlxuICAgICAgKGRhdGEuc2FtcGxlcmF0ZSA+PiA4KSAmIDB4ZmYsXG4gICAgICBkYXRhLnNhbXBsZXJhdGUgJiAweGZmLCAvL1xuICAgICAgMHgwMCwgMHgwMFxuICAgIF0pXG4gICAgbGV0IGVzZHMgPSBGbXA0LmVzZHMoZGF0YS5jb25maWcpXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCg4ICsgY29udGVudC5ieXRlTGVuZ3RoICsgZXNkcy5ieXRlTGVuZ3RoLCAnbXA0YScsIGNvbnRlbnQsIGVzZHMpXG4gIH1cbiAgc3RhdGljIGVzZHMgKGNvbmZpZyA9IFs0MywgMTQ2LCA4LCAwXSkge1xuICAgIGNvbnN0IGNvbmZpZ2xlbiA9IGNvbmZpZy5sZW5ndGhcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uIDBcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG5cbiAgICAgIDB4MDMsIC8vIGRlc2NyaXB0b3JfdHlwZVxuICAgICAgMHgxNyArIGNvbmZpZ2xlbiwgLy8gbGVuZ3RoXG4gICAgICAweDAwLCAweDAxLCAvLyBlc19pZFxuICAgICAgMHgwMCwgLy8gc3RyZWFtX3ByaW9yaXR5XG5cbiAgICAgIDB4MDQsIC8vIGRlc2NyaXB0b3JfdHlwZVxuICAgICAgMHgwZiArIGNvbmZpZ2xlbiwgLy8gbGVuZ3RoXG4gICAgICAweDQwLCAvLyBjb2RlYyA6IG1wZWc0X2F1ZGlvXG4gICAgICAweDE1LCAvLyBzdHJlYW1fdHlwZVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gYnVmZmVyX3NpemVcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIG1heEJpdHJhdGVcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGF2Z0JpdHJhdGVcblxuICAgICAgMHgwNSAvLyBkZXNjcmlwdG9yX3R5cGVcbiAgICBdLmNvbmNhdChbY29uZmlnbGVuXSkuY29uY2F0KGNvbmZpZykuY29uY2F0KFsweDA2LCAweDAxLCAweDAyXSkpXG4gICAgYnVmZmVyLndyaXRlKEZtcDQuc2l6ZSg4ICsgY29udGVudC5ieXRlTGVuZ3RoKSwgRm1wNC50eXBlKCdlc2RzJyksIGNvbnRlbnQpXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgYXZjMSAoZGF0YSkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgc2l6ZSA9IDQwLy8gOChhdmMxKSs4KGF2Y2MpKzgoYnRydCkrMTYocGFzcClcbiAgICAvLyBsZXQgc3BzID0gZGF0YS5zcHNcbiAgICAvLyBsZXQgcHBzID0gZGF0YS5wcHNcbiAgICBsZXQgd2lkdGggPSBkYXRhLndpZHRoXG4gICAgbGV0IGhlaWdodCA9IGRhdGEuaGVpZ2h0XG4gICAgbGV0IGhTcGFjaW5nID0gZGF0YS5wYXJSYXRpby5oZWlnaHRcbiAgICBsZXQgdlNwYWNpbmcgPSBkYXRhLnBhclJhdGlvLndpZHRoXG4gICAgLy8gbGV0IGF2Y2NCdWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICAvLyBhdmNjQnVmZmVyLndyaXRlKG5ldyBVaW50OEFycmF5KFtcbiAgICAvLyAgIDB4MDEsIC8vIHZlcnNpb25cbiAgICAvLyAgIHNwc1sxXSwgLy8gcHJvZmlsZVxuICAgIC8vICAgc3BzWzJdLCAvLyBwcm9maWxlIGNvbXBhdGlibGVcbiAgICAvLyAgIHNwc1szXSwgLy8gbGV2ZWxcbiAgICAvLyAgIDB4ZmMgfCAzLFxuICAgIC8vICAgMHhFMCB8IDEgLy8g55uu5YmN5Y+q5aSE55CG5LiA5Liqc3BzXG4gICAgLy8gXS5jb25jYXQoW3Nwcy5sZW5ndGggPj4+IDggJiAweGZmLCBzcHMubGVuZ3RoICYgMHhmZl0pKSlcbiAgICAvLyBhdmNjQnVmZmVyLndyaXRlKHNwcywgbmV3IFVpbnQ4QXJyYXkoWzEsIHBwcy5sZW5ndGggPj4+IDggJiAweGZmLCBwcHMubGVuZ3RoICYgMHhmZl0pLCBwcHMpXG5cbiAgICBsZXQgYXZjYyA9IGRhdGEuYXZjY1xuICAgIGxldCBhdmMxID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAxLCAvLyBkYXRhX3JlZmVyZW5jZV9pbmRleFxuICAgICAgMHgwMCwgMHgwMCwgLy8gcHJlX2RlZmluZWRcbiAgICAgIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHByZV9kZWZpbmVkXG4gICAgICAod2lkdGggPj4gOCkgJiAweGZmLFxuICAgICAgd2lkdGggJiAweGZmLCAvLyB3aWR0aFxuICAgICAgKGhlaWdodCA+PiA4KSAmIDB4ZmYsXG4gICAgICBoZWlnaHQgJiAweGZmLCAvLyBoZWlnaHRcbiAgICAgIDB4MDAsIDB4NDgsIDB4MDAsIDB4MDAsIC8vIGhvcml6cmVzb2x1dGlvblxuICAgICAgMHgwMCwgMHg0OCwgMHgwMCwgMHgwMCwgLy8gdmVydHJlc29sdXRpb25cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAxLCAvLyBmcmFtZV9jb3VudFxuICAgICAgMHgxMixcbiAgICAgIDB4NjQsIDB4NjEsIDB4NjksIDB4NkMsIC8vIGRhaWx5bW90aW9uL2hscy5qc1xuICAgICAgMHg3OSwgMHg2RCwgMHg2RiwgMHg3NCxcbiAgICAgIDB4NjksIDB4NkYsIDB4NkUsIDB4MkYsXG4gICAgICAweDY4LCAweDZDLCAweDczLCAweDJFLFxuICAgICAgMHg2QSwgMHg3MywgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gY29tcHJlc3Nvcm5hbWVcbiAgICAgIDB4MDAsIDB4MTgsIC8vIGRlcHRoID0gMjRcbiAgICAgIDB4MTEsIDB4MTFdKSAvLyBwcmVfZGVmaW5lZCA9IC0xXG4gICAgbGV0IGJ0cnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAweDFjLCAweDljLCAweDgwLCAvLyBidWZmZXJTaXplREJcbiAgICAgIDB4MDAsIDB4MmQsIDB4YzYsIDB4YzAsIC8vIG1heEJpdHJhdGVcbiAgICAgIDB4MDAsIDB4MmQsIDB4YzYsIDB4YzAgLy8gYXZnQml0cmF0ZVxuICAgIF0pXG4gICAgbGV0IHBhc3AgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAoaFNwYWNpbmcgPj4gMjQpLCAvLyBoU3BhY2luZ1xuICAgICAgKGhTcGFjaW5nID4+IDE2KSAmIDB4ZmYsXG4gICAgICAoaFNwYWNpbmcgPj4gOCkgJiAweGZmLFxuICAgICAgaFNwYWNpbmcgJiAweGZmLFxuICAgICAgKHZTcGFjaW5nID4+IDI0KSwgLy8gdlNwYWNpbmdcbiAgICAgICh2U3BhY2luZyA+PiAxNikgJiAweGZmLFxuICAgICAgKHZTcGFjaW5nID4+IDgpICYgMHhmZixcbiAgICAgIHZTcGFjaW5nICYgMHhmZlxuICAgIF0pXG5cbiAgICBidWZmZXIud3JpdGUoXG4gICAgICBGbXA0LnNpemUoc2l6ZSArIGF2YzEuYnl0ZUxlbmd0aCArIGF2Y2MuYnl0ZUxlbmd0aCArIGJ0cnQuYnl0ZUxlbmd0aCksIEZtcDQudHlwZSgnYXZjMScpLCBhdmMxLFxuICAgICAgRm1wNC5zaXplKDggKyBhdmNjLmJ5dGVMZW5ndGgpLCBGbXA0LnR5cGUoJ2F2Y0MnKSwgYXZjYyxcbiAgICAgIEZtcDQuc2l6ZSgyMCksIEZtcDQudHlwZSgnYnRydCcpLCBidHJ0LFxuICAgICAgRm1wNC5zaXplKDE2KSwgRm1wNC50eXBlKCdwYXNwJyksIHBhc3BcbiAgICApXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgc3R0cyAoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCAvLyBlbnRyeV9jb3VudFxuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxNiwgJ3N0dHMnLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyBzdHNjICgpIHtcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIC8vIHZlcnNpb25cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwIC8vIGVudHJ5X2NvdW50XG4gICAgXSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDE2LCAnc3RzYycsIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIHN0Y28gKCkge1xuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgLy8gdmVyc2lvblxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAgLy8gZW50cnlfY291bnRcbiAgICBdKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTYsICdzdGNvJywgY29udGVudClcbiAgfVxuICBzdGF0aWMgc3RzeiAoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gc2FtcGxlX3NpemVcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAgLy8gc2FtcGxlX2NvdW50XG4gICAgXSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDIwLCAnc3RzeicsIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIG12ZXggKGR1cmF0aW9uLCB0aW1lc2NhbGUgPSAxMDAwLCB0cmFja0lEKSB7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGxldCBtZWhkID0gQnVmZmVyLndyaXRlVWludDMyKGR1cmF0aW9uKVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoNTYpLCBGbXA0LnR5cGUoJ212ZXgnKSwgRm1wNC5zaXplKDE2KSwgRm1wNC50eXBlKCdtZWhkJyksIEZtcDQuZXh0ZW5zaW9uKDAsIDApLCBtZWhkLCBGbXA0LnRyZXgodHJhY2tJRCkpXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgdHJleCAoaWQpIHtcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIC8vIHZlcnNpb24gMFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgIChpZCA+PiAyNCksXG4gICAgICAoaWQgPj4gMTYpICYgMHhmZixcbiAgICAgIChpZCA+PiA4KSAmIDB4ZmYsXG4gICAgICAoaWQgJiAweGZmKSwgLy8gdHJhY2tfSURcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDEsIC8vIGRlZmF1bHRfc2FtcGxlX2Rlc2NyaXB0aW9uX2luZGV4XG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBkZWZhdWx0X3NhbXBsZV9kdXJhdGlvblxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZGVmYXVsdF9zYW1wbGVfc2l6ZVxuICAgICAgMHgwMCwgMHgwMSwgMHgwMCwgMHgwMSAvLyBkZWZhdWx0X3NhbXBsZV9mbGFnc1xuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCg4ICsgY29udGVudC5ieXRlTGVuZ3RoLCAndHJleCcsIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIG1vb2YgKGRhdGEpIHtcbiAgICBsZXQgc2l6ZSA9IDhcbiAgICBsZXQgbWZoZCA9IEZtcDQubWZoZCgpXG4gICAgbGV0IHRyYWYgPSBGbXA0LnRyYWYoZGF0YSk7XG4gICAgW21maGQsIHRyYWZdLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aFxuICAgIH0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveChzaXplLCAnbW9vZicsIG1maGQsIHRyYWYpXG4gIH1cbiAgc3RhdGljIG1maGQgKCkge1xuICAgIGxldCBjb250ZW50ID0gQnVmZmVyLndyaXRlVWludDMyKEZtcDQuc2VxdWVuY2UpXG4gICAgRm1wNC5zZXF1ZW5jZSArPSAxXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxNiwgJ21maGQnLCBGbXA0LmV4dGVuc2lvbigwLCAwKSwgY29udGVudClcbiAgfVxuICBzdGF0aWMgdHJhZiAoZGF0YSkge1xuICAgIGxldCBzaXplID0gOFxuICAgIGxldCB0ZmhkID0gRm1wNC50ZmhkKGRhdGEuaWQpXG4gICAgbGV0IHRmZHQgPSBGbXA0LnRmZHQoZGF0YS50aW1lKVxuICAgIGxldCBzZHRwID0gRm1wNC5zZHRwKGRhdGEpXG4gICAgbGV0IHRydW4gPSBGbXA0LnRydW4oZGF0YSwgc2R0cC5ieXRlTGVuZ3RoKTtcblxuICAgIFt0ZmhkLCB0ZmR0LCB0cnVuLCBzZHRwXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGhcbiAgICB9KVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goc2l6ZSwgJ3RyYWYnLCB0ZmhkLCB0ZmR0LCB0cnVuLCBzZHRwKVxuICB9XG4gIHN0YXRpYyB0ZmhkIChpZCkge1xuICAgIGxldCBjb250ZW50ID0gQnVmZmVyLndyaXRlVWludDMyKGlkKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTYsICd0ZmhkJywgRm1wNC5leHRlbnNpb24oMCwgMCksIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIHRmZHQgKHRpbWUpIHtcbiAgICAvLyBsZXQgdXBwZXIgPSBNYXRoLmZsb29yKHRpbWUgLyAoVUlOVDMyX01BWCArIDEpKSxcbiAgICAvLyAgICAgbG93ZXIgPSBNYXRoLmZsb29yKHRpbWUgJSAoVUlOVDMyX01BWCArIDEpKTtcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDE2LCAndGZkdCcsIEZtcDQuZXh0ZW5zaW9uKDAsIDApLCBCdWZmZXIud3JpdGVVaW50MzIodGltZSkpXG4gIH1cbiAgc3RhdGljIHRydW4gKGRhdGEsIHNkdHBMZW5ndGgpIHtcbiAgICAvLyBsZXQgaWQgPSBkYXRhLmlkO1xuICAgIC8vIGxldCBjZWlsID0gaWQgPT09IDEgPyAxNiA6IDEyO1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgc2FtcGxlQ291bnQgPSBCdWZmZXIud3JpdGVVaW50MzIoZGF0YS5zYW1wbGVzLmxlbmd0aClcbiAgICAvLyBtZGF0LWhlYWRlciA4XG4gICAgLy8gbW9vZi1oZWFkZXIgOFxuICAgIC8vIG1maGQgMTZcbiAgICAvLyB0cmFmLWhlYWRlciA4XG4gICAgLy8gdGhoZCAxNlxuICAgIC8vIHRmZHQgMjBcbiAgICAvLyB0cnVuLWhlYWRlciAxMlxuICAgIC8vIHNhbXBsZUNvdW50IDRcbiAgICAvLyBkYXRhLW9mZnNldCA0XG4gICAgLy8gc2FtcGxlcy5sZW5ndGhcbiAgICBsZXQgb2Zmc2V0ID0gQnVmZmVyLndyaXRlVWludDMyKDggKyA4ICsgMTYgKyA4ICsgMTYgKyAxNiArIDEyICsgNCArIDQgKyAxNiAqIGRhdGEuc2FtcGxlcy5sZW5ndGggKyBzZHRwTGVuZ3RoKVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoMjAgKyAxNiAqIGRhdGEuc2FtcGxlcy5sZW5ndGgpLCBGbXA0LnR5cGUoJ3RydW4nKSwgbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4MDAsIDB4MEYsIDB4MDFdKSwgc2FtcGxlQ291bnQsIG9mZnNldClcblxuICAgIC8vIGxldCBzaXplID0gYnVmZmVyLmJ1ZmZlci5ieXRlTGVuZ3RoXG4gICAgLy8gbGV0IHdyaXRlT2Zmc2V0ID0gMFxuICAgIC8vIGRhdGEuc2FtcGxlcy5mb3JFYWNoKCgpID0+IHtcbiAgICAvLyAgIHNpemUgKz0gMTZcbiAgICAvLyB9KVxuICAgIC8vXG4gICAgLy8gbGV0IHRydW5Cb3ggPSBuZXcgVWludDhBcnJheShzaXplKVxuXG4gICAgLy8gdHJ1bkJveC5zZXQoYnVmZmVyLmJ1ZmZlciwgMClcblxuICAgIGRhdGEuc2FtcGxlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCBmbGFncyA9IGl0ZW0uZmxhZ3NcbiAgICAgIC8vIGNvbnNvbGUubG9nKGl0ZW0udHlwZSwgaXRlbS5kdHMsIGl0ZW0uZHVyYXRpb24pXG5cbiAgICAgIGJ1ZmZlci53cml0ZShuZXcgVWludDhBcnJheShbXG4gICAgICAgIChpdGVtLmR1cmF0aW9uID4+PiAyNCkgJiAweEZGLCAvLyBzYW1wbGVfZHVyYXRpb25cbiAgICAgICAgKGl0ZW0uZHVyYXRpb24gPj4+IDE2KSAmIDB4RkYsXG4gICAgICAgIChpdGVtLmR1cmF0aW9uID4+PiA4KSAmIDB4RkYsXG4gICAgICAgIChpdGVtLmR1cmF0aW9uKSAmIDB4RkYsXG4gICAgICAgIChpdGVtLnNpemUgPj4+IDI0KSAmIDB4RkYsIC8vIHNhbXBsZV9zaXplXG4gICAgICAgIChpdGVtLnNpemUgPj4+IDE2KSAmIDB4RkYsXG4gICAgICAgIChpdGVtLnNpemUgPj4+IDgpICYgMHhGRixcbiAgICAgICAgKGl0ZW0uc2l6ZSkgJiAweEZGLFxuICAgICAgICAoZmxhZ3MuaXNMZWFkaW5nIDw8IDIpIHwgZmxhZ3MuZGVwZW5kc09uLCAvLyBzYW1wbGVfZmxhZ3NcbiAgICAgICAgKGZsYWdzLmlzRGVwZW5kZWRPbiA8PCA2KSB8IChmbGFncy5oYXNSZWR1bmRhbmN5IDw8IDQpIHwgZmxhZ3MuaXNOb25TeW5jLFxuICAgICAgICAweDAwLCAweDAwLCAvLyBzYW1wbGVfZGVncmFkYXRpb25fcHJpb3JpdHlcbiAgICAgICAgKGl0ZW0uY3RzID4+PiAyNCkgJiAweEZGLCAvLyBzYW1wbGVfY29tcG9zaXRpb25fdGltZV9vZmZzZXRcbiAgICAgICAgKGl0ZW0uY3RzID4+PiAxNikgJiAweEZGLFxuICAgICAgICAoaXRlbS5jdHMgPj4+IDgpICYgMHhGRixcbiAgICAgICAgKGl0ZW0uY3RzKSAmIDB4RkZcbiAgICAgIF0pKVxuICAgICAgLy8gd3JpdGVPZmZzZXQgKz0gMTZcbiAgICAgIC8vIGJ1ZmZlci53cml0ZShCdWZmZXIud3JpdGVVaW50MzIoMCkpO1xuICAgIH0pXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgc2R0cCAoZGF0YSkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKDEyICsgZGF0YS5zYW1wbGVzLmxlbmd0aCksIEZtcDQudHlwZSgnc2R0cCcpLCBGbXA0LmV4dGVuc2lvbigwLCAwKSlcbiAgICBkYXRhLnNhbXBsZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGNvbnN0IGZsYWdzID0gaXRlbS5mbGFnc1xuICAgICAgY29uc3QgbnVtID0gKGZsYWdzLmlzTGVhZGluZyA8PCA2KSB8IC8vIGlzX2xlYWRpbmc6IDIgKGJpdClcbiAgICAgICAgKGZsYWdzLmRlcGVuZHNPbiA8PCA0KSB8IC8vIHNhbXBsZV9kZXBlbmRzX29uXG4gICAgICAgIChmbGFncy5pc0RlcGVuZGVkT24gPDwgMikgfCAvLyBzYW1wbGVfaXNfZGVwZW5kZWRfb25cbiAgICAgICAgKGZsYWdzLmhhc1JlZHVuZGFuY3kpLy8gc2FtcGxlX2hhc19yZWR1bmRhbmN5XG5cbiAgICAgIGJ1ZmZlci53cml0ZShuZXcgVWludDhBcnJheShbbnVtXSkpXG4gICAgfSlcbiAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlclxuICB9XG4gIHN0YXRpYyBtZGF0IChkYXRhKSB7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGxldCBzaXplID0gOFxuICAgIGRhdGEuc2FtcGxlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLnNpemVcbiAgICB9KVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoc2l6ZSksIEZtcDQudHlwZSgnbWRhdCcpKVxuICAgIGxldCBtZGF0Qm94ID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSlcbiAgICBsZXQgb2Zmc2V0ID0gMFxuICAgIG1kYXRCb3guc2V0KGJ1ZmZlci5idWZmZXIsIG9mZnNldClcbiAgICBvZmZzZXQgKz0gOFxuICAgIGRhdGEuc2FtcGxlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaXRlbS5idWZmZXIuZm9yRWFjaCgodW5pdCkgPT4ge1xuICAgICAgICBtZGF0Qm94LnNldCh1bml0LCBvZmZzZXQpXG4gICAgICAgIG9mZnNldCArPSB1bml0LmJ5dGVMZW5ndGhcbiAgICAgICAgLy8gYnVmZmVyLndyaXRlKHVuaXQuZGF0YSk7XG4gICAgICB9KVxuICAgIH0pXG4gICAgcmV0dXJuIG1kYXRCb3hcbiAgfVxufVxuRm1wNC50eXBlID0gKG5hbWUpID0+IHtcbiAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFtuYW1lLmNoYXJDb2RlQXQoMCksIG5hbWUuY2hhckNvZGVBdCgxKSwgbmFtZS5jaGFyQ29kZUF0KDIpLCBuYW1lLmNoYXJDb2RlQXQoMyldKVxufVxuRm1wNC5zZXF1ZW5jZSA9IDFcblxuZXhwb3J0IGRlZmF1bHQgRm1wNFxuIiwiaW1wb3J0IHtcbiAgRVZFTlRTLFxuICBzbmlmZmVyLFxuICBNZWRpYVNlZ21lbnRMaXN0LFxuICBCdWZmZXJcbn0gZnJvbSAneGdwbGF5ZXItdXRpbHMnO1xuaW1wb3J0IEZtcDQgZnJvbSAnLi9mbXA0J1xuXG5jb25zdCBSRU1VWF9FVkVOVFMgPSBFVkVOVFMuUkVNVVhfRVZFTlRTXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1wNFJlbXV4ZXIge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5fZHRzQmFzZSA9IDBcbiAgICB0aGlzLl9pc0R0c0Jhc2VJbml0ZWQgPSBmYWxzZVxuXG4gICAgdGhpcy52aWRlb0FsbER1cmF0aW9uID0gMFxuICAgIHRoaXMuYXVkaW9BbGxEdXJhdGlvbiA9IDBcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIHRoaXMub24oUkVNVVhfRVZFTlRTLlJFTVVYX01FRElBLCB0aGlzLnJlbXV4LmJpbmQodGhpcykpXG4gICAgdGhpcy5vbihSRU1VWF9FVkVOVFMuUkVNVVhfTUVUQURBVEEsIHRoaXMub25NZXRhRGF0YVJlYWR5LmJpbmQodGhpcykpXG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLl9kdHNCYXNlID0gLTFcbiAgICB0aGlzLl9kdHNCYXNlSW5pdGVkID0gZmFsc2VcbiAgfVxuXG4gIHJlc2V0ICgpIHtcbiAgICB0aGlzLl9kdHNCYXNlID0gMFxuICAgIHRoaXMuX2lzRHRzQmFzZUluaXRlZCA9IGZhbHNlXG4gIH1cblxuICByZW11eCAoKSB7XG4gICAgY29uc3QgeyBhdWRpb1RyYWNrLCB2aWRlb1RyYWNrIH0gPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKVxuICAgICF0aGlzLl9pc0R0c0Jhc2VJbml0ZWQgJiYgdGhpcy5jYWxjRHRzQmFzZShhdWRpb1RyYWNrLCB2aWRlb1RyYWNrKVxuXG4gICAgdGhpcy5fcmVtdXhWaWRlbyh2aWRlb1RyYWNrKVxuICAgIHRoaXMuX3JlbXV4QXVkaW8oYXVkaW9UcmFjaylcbiAgfVxuXG4gIHNlZWsgKCkge1xuXG4gIH1cblxuICBvbk1ldGFEYXRhUmVhZHkgKHR5cGUpIHtcbiAgICBsZXQgaW5pdFNlZ21lbnQgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgZnR5cCA9IEZtcDQuZnR5cCgpXG4gICAgbGV0IG1vb3ZcbiAgICBsZXQgdHJhY2tcblxuICAgIGlmICh0eXBlID09PSAnYXVkaW8nKSB7XG4gICAgICBjb25zdCB7IGF1ZGlvVHJhY2sgfSA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpXG4gICAgICB0cmFjayA9IGF1ZGlvVHJhY2s7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHsgdmlkZW9UcmFjayB9ID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJylcbiAgICAgIHRyYWNrID0gdmlkZW9UcmFjaztcbiAgICB9XG5cbiAgICBtb292ID0gRm1wNC5tb292KHsgdHlwZSwgbWV0YTogdHJhY2subWV0YSB9KVxuXG4gICAgaW5pdFNlZ21lbnQud3JpdGUoZnR5cCwgbW9vdilcblxuICAgIGxldCBwcmVzb3VyY2VidWZmZXIgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdQUkVfU09VUkNFX0JVRkZFUicpO1xuICAgIGxldCBzb3VyY2UgPSBwcmVzb3VyY2VidWZmZXIuZ2V0U291cmNlKHR5cGUpO1xuICAgIGlmICghc291cmNlKSB7XG4gICAgICBzb3VyY2UgPSBwcmVzb3VyY2VidWZmZXIuY3JlYXRlU291cmNlKHR5cGUpO1xuICAgIH1cblxuICAgIHNvdXJjZS5taW1ldHlwZSA9IHRyYWNrLm1ldGEuY29kZWM7XG4gICAgc291cmNlLmluaXQgPSBpbml0U2VnbWVudDtcbiAgICB0aGlzLmVtaXQoUkVNVVhfRVZFTlRTLklOSVRfU0VHTUVOVCwgdHlwZSlcbiAgfVxuXG4gIGNhbGNEdHNCYXNlIChhdWRpb1RyYWNrLCB2aWRlb1RyYWNrKSB7XG4gICAgaWYgKCFhdWRpb1RyYWNrLnNhbXBsZXMubGVuZ3RoICYmICF2aWRlb1RyYWNrLnNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGF1ZGlvQmFzZSA9IEluZmluaXR5XG4gICAgbGV0IHZpZGVvQmFzZSA9IEluZmluaXR5XG5cbiAgICBpZiAoYXVkaW9UcmFjay5zYW1wbGVzICYmIGF1ZGlvVHJhY2suc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIGF1ZGlvQmFzZSA9IGF1ZGlvVHJhY2suc2FtcGxlc1swXS5kdHNcbiAgICB9XG4gICAgaWYgKHZpZGVvVHJhY2suc2FtcGxlcyAmJiB2aWRlb1RyYWNrLnNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICB2aWRlb0Jhc2UgPSB2aWRlb1RyYWNrLnNhbXBsZXNbMF0uZHRzXG4gICAgfVxuXG4gICAgdGhpcy5fZHRzQmFzZSA9IE1hdGgubWluKGF1ZGlvQmFzZSwgdmlkZW9CYXNlKVxuICAgIHRoaXMuX2lzRHRzQmFzZUluaXRlZCA9IHRydWVcbiAgfVxuXG4gIF9yZW11eFZpZGVvICh2aWRlb1RyYWNrKSB7XG4gICAgY29uc3QgdHJhY2sgPSB2aWRlb1RyYWNrXG5cbiAgICBpZiAoIXZpZGVvVHJhY2suc2FtcGxlcyB8fCAhdmlkZW9UcmFjay5zYW1wbGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IHtzYW1wbGVzfSA9IHRyYWNrXG4gICAgbGV0IGZpcnN0RHRzID0gLTFcblxuICAgIGNvbnN0IG1wNFNhbXBsZXMgPSBbXVxuICAgIGNvbnN0IG1kYXRCb3ggPSB7XG4gICAgICBzYW1wbGVzOiBbXVxuICAgIH1cblxuICAgIHdoaWxlIChzYW1wbGVzLmxlbmd0aCkge1xuICAgICAgY29uc3QgYXZjU2FtcGxlID0gc2FtcGxlcy5zaGlmdCgpXG4gICAgICBjb25zdCB7IGlzS2V5ZnJhbWUgfSA9IGF2Y1NhbXBsZVxuICAgICAgbGV0IGR0cyA9IGF2Y1NhbXBsZS5kdHMgLSB0aGlzLl9kdHNCYXNlXG5cbiAgICAgIGlmIChmaXJzdER0cyA9PT0gLTEpIHtcbiAgICAgICAgZmlyc3REdHMgPSBkdHNcbiAgICAgIH1cblxuICAgICAgbGV0IGN0c1xuICAgICAgbGV0IHB0c1xuICAgICAgaWYgKGF2Y1NhbXBsZS5wdHMpIHtcbiAgICAgICAgcHRzID0gYXZjU2FtcGxlLnB0cyAtIHRoaXMuX2R0c0Jhc2VcbiAgICAgICAgY3RzID0gcHRzIC0gZHRzXG4gICAgICB9XG4gICAgICBpZiAoYXZjU2FtcGxlLmN0cykge1xuICAgICAgICBwdHMgPSBhdmNTYW1wbGUuY3RzICsgZHRzXG4gICAgICAgIGN0cyA9IGF2Y1NhbXBsZS5jdHNcbiAgICAgIH1cblxuICAgICAgbGV0IG1kYXRTYW1wbGUgPSB7XG4gICAgICAgIGJ1ZmZlcjogW10sXG4gICAgICAgIHNpemU6IDBcbiAgICAgIH1cbiAgICAgIG1kYXRCb3guc2FtcGxlcy5wdXNoKG1kYXRTYW1wbGUpXG4gICAgICBtZGF0U2FtcGxlLmJ1ZmZlci5wdXNoKGF2Y1NhbXBsZS5kYXRhKVxuICAgICAgbWRhdFNhbXBsZS5zaXplICs9IGF2Y1NhbXBsZS5kYXRhLmJ5dGVMZW5ndGhcblxuICAgICAgbGV0IHNhbXBsZUR1cmF0aW9uID0gMFxuICAgICAgaWYgKHNhbXBsZXMubGVuZ3RoID49IDEpIHtcbiAgICAgICAgY29uc3QgbmV4dER0cyA9IHNhbXBsZXNbMF0uZHRzIC0gdGhpcy5fZHRzQmFzZVxuICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IG5leHREdHMgLSBkdHNcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChtcDRTYW1wbGVzLmxlbmd0aCA+PSAxKSB7IC8vIGxhc3Rlc3Qgc2FtcGxlLCB1c2Ugc2Vjb25kIGxhc3QgZHVyYXRpb25cbiAgICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IG1wNFNhbXBsZXNbbXA0U2FtcGxlcy5sZW5ndGggLSAxXS5kdXJhdGlvblxuICAgICAgICB9IGVsc2UgeyAvLyB0aGUgb25seSBvbmUgc2FtcGxlLCB1c2UgcmVmZXJlbmNlIGR1cmF0aW9uXG4gICAgICAgICAgc2FtcGxlRHVyYXRpb24gPSB0aGlzLnZpZGVvTWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnZpZGVvQWxsRHVyYXRpb24gKz0gc2FtcGxlRHVyYXRpb25cbiAgICAgIG1wNFNhbXBsZXMucHVzaCh7XG4gICAgICAgIGR0cyxcbiAgICAgICAgY3RzLFxuICAgICAgICBwdHMsXG4gICAgICAgIGRhdGE6IGF2Y1NhbXBsZS5kYXRhLFxuICAgICAgICBzaXplOiBhdmNTYW1wbGUuZGF0YS5ieXRlTGVuZ3RoLFxuICAgICAgICBpc0tleWZyYW1lLFxuICAgICAgICBkdXJhdGlvbjogc2FtcGxlRHVyYXRpb24sXG4gICAgICAgIGZsYWdzOiB7XG4gICAgICAgICAgaXNMZWFkaW5nOiAwLFxuICAgICAgICAgIGRlcGVuZHNPbjogaXNLZXlmcmFtZSA/IDIgOiAxLFxuICAgICAgICAgIGlzRGVwZW5kZWRPbjogaXNLZXlmcmFtZSA/IDEgOiAwLFxuICAgICAgICAgIGhhc1JlZHVuZGFuY3k6IDAsXG4gICAgICAgICAgaXNOb25TeW5jOiBpc0tleWZyYW1lID8gMCA6IDFcbiAgICAgICAgfSxcbiAgICAgICAgb3JpZ2luRHRzOiBkdHMsXG4gICAgICAgIHR5cGU6ICd2aWRlbydcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgbGV0IG1vb2ZNZGF0ID0gbmV3IEJ1ZmZlcigpXG5cbiAgICBjb25zdCBtb29mID0gRm1wNC5tb29mKHtcbiAgICAgIGlkOiB0cmFjay5tZXRhLmlkLFxuICAgICAgdGltZTogZmlyc3REdHMsXG4gICAgICBzYW1wbGVzOiBtcDRTYW1wbGVzXG4gICAgfSlcbiAgICBjb25zdCBtZGF0ID0gRm1wNC5tZGF0KG1kYXRCb3gpXG4gICAgbW9vZk1kYXQud3JpdGUobW9vZiwgbWRhdClcblxuICAgIHRyYWNrLnNhbXBsZXMgPSBbXVxuICAgIHRyYWNrLmxlbmd0aCA9IDBcblxuICAgIGxldCBwcmVzb3VyY2VidWZmZXIgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdQUkVfU09VUkNFX0JVRkZFUicpO1xuICAgIGxldCBzb3VyY2UgPSBwcmVzb3VyY2VidWZmZXIuZ2V0U291cmNlKCd2aWRlbycpO1xuICAgIGlmICghc291cmNlKSB7XG4gICAgICBzb3VyY2UgPSBwcmVzb3VyY2VidWZmZXIuY3JlYXRlU291cmNlKCd2aWRlbycpO1xuICAgIH1cblxuICAgIHNvdXJjZS5kYXRhLnB1c2gobW9vZk1kYXQpO1xuXG4gICAgdGhpcy5lbWl0KFJFTVVYX0VWRU5UUy5NRURJQV9TRUdNRU5ULCAndmlkZW8nKVxuICB9XG5cbiAgX3JlbXV4QXVkaW8gKHRyYWNrKSB7XG4gICAgY29uc3Qge3NhbXBsZXN9ID0gdHJhY2tcbiAgICBsZXQgZmlyc3REdHMgPSAtMVxuICAgIGxldCBtcDRTYW1wbGVzID0gW11cblxuICAgIGNvbnN0IG1kYXRCb3ggPSB7XG4gICAgICBzYW1wbGVzOiBbXVxuICAgIH1cbiAgICBpZiAoIXNhbXBsZXMgfHwgIXNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgbGV0IGlzRmlyc3REdHNJbml0ZWQgPSBmYWxzZVxuICAgIHdoaWxlIChzYW1wbGVzLmxlbmd0aCkge1xuICAgICAgbGV0IHNhbXBsZSA9IHNhbXBsZXMuc2hpZnQoKVxuICAgICAgY29uc3QgeyBkYXRhIH0gPSBzYW1wbGVcbiAgICAgIGxldCBkdHMgPSBzYW1wbGUuZHRzIC0gdGhpcy5fZHRzQmFzZVxuICAgICAgY29uc3Qgb3JpZ2luRHRzID0gZHRzXG4gICAgICBpZiAoIWlzRmlyc3REdHNJbml0ZWQpIHtcbiAgICAgICAgZmlyc3REdHMgPSBkdHNcbiAgICAgICAgaXNGaXJzdER0c0luaXRlZCA9IHRydWVcbiAgICAgIH1cblxuICAgICAgbGV0IHNhbXBsZUR1cmF0aW9uID0gMFxuXG4gICAgICBpZiAodGhpcy5hdWRpb01ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZCkge1xuICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IHRoaXMuYXVkaW9NZXRhLnJlZlNhbXBsZUR1cmF0aW9uRml4ZWRcbiAgICAgIH0gZWxzZSBpZiAoc2FtcGxlcy5sZW5ndGggPj0gMSkge1xuICAgICAgICBjb25zdCBuZXh0RHRzID0gc2FtcGxlc1swXS5kdHMgLSB0aGlzLl9kdHNCYXNlO1xuICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IG5leHREdHMgLSBkdHNcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChtcDRTYW1wbGVzLmxlbmd0aCA+PSAxKSB7IC8vIHVzZSBzZWNvbmQgbGFzdCBzYW1wbGUgZHVyYXRpb25cbiAgICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IG1wNFNhbXBsZXNbbXA0U2FtcGxlcy5sZW5ndGggLSAxXS5kdXJhdGlvblxuICAgICAgICB9IGVsc2UgeyAvLyB0aGUgb25seSBvbmUgc2FtcGxlLCB1c2UgcmVmZXJlbmNlIHNhbXBsZSBkdXJhdGlvblxuICAgICAgICAgIHNhbXBsZUR1cmF0aW9uID0gdGhpcy5hdWRpb01ldGEucmVmU2FtcGxlRHVyYXRpb25cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBjb25zb2xlLmxvZygncmVtdXggYXVkaW8gJywgZHRzKVxuICAgICAgdGhpcy5hdWRpb0FsbER1cmF0aW9uICs9IHNhbXBsZUR1cmF0aW9uXG4gICAgICBjb25zdCBtcDRTYW1wbGUgPSB7XG4gICAgICAgIGR0cyxcbiAgICAgICAgcHRzOiBkdHMsXG4gICAgICAgIGN0czogMCxcbiAgICAgICAgc2l6ZTogZGF0YS5ieXRlTGVuZ3RoLFxuICAgICAgICBkdXJhdGlvbjogc2FtcGxlLmR1cmF0aW9uID8gc2FtcGxlLmR1cmF0aW9uIDogc2FtcGxlRHVyYXRpb24sXG4gICAgICAgIGZsYWdzOiB7XG4gICAgICAgICAgaXNMZWFkaW5nOiAwLFxuICAgICAgICAgIGRlcGVuZHNPbjogMixcbiAgICAgICAgICBpc0RlcGVuZGVkT246IDEsXG4gICAgICAgICAgaGFzUmVkdW5kYW5jeTogMCxcbiAgICAgICAgICBpc05vblN5bmM6IDBcbiAgICAgICAgfSxcbiAgICAgICAgaXNLZXlmcmFtZTogdHJ1ZSxcbiAgICAgICAgb3JpZ2luRHRzLFxuICAgICAgICB0eXBlOiAnYXVkaW8nXG4gICAgICB9XG5cbiAgICAgIGxldCBtZGF0U2FtcGxlID0ge1xuICAgICAgICBidWZmZXI6IFtdLFxuICAgICAgICBzaXplOiAwXG4gICAgICB9XG4gICAgICBtZGF0U2FtcGxlLmJ1ZmZlci5wdXNoKGRhdGEpXG4gICAgICBtZGF0U2FtcGxlLnNpemUgKz0gZGF0YS5ieXRlTGVuZ3RoXG5cbiAgICAgIG1kYXRCb3guc2FtcGxlcy5wdXNoKG1kYXRTYW1wbGUpXG5cbiAgICAgIG1wNFNhbXBsZXMucHVzaChtcDRTYW1wbGUpXG4gICAgfVxuXG4gICAgY29uc3QgbW9vZk1kYXQgPSBuZXcgQnVmZmVyKClcbiAgICBjb25zdCBtb29mID0gRm1wNC5tb29mKHtcbiAgICAgIGlkOiB0cmFjay5tZXRhLmlkLFxuICAgICAgdGltZTogZmlyc3REdHMsXG4gICAgICBzYW1wbGVzOiBtcDRTYW1wbGVzXG4gICAgfSlcbiAgICBjb25zdCBtZGF0ID0gRm1wNC5tZGF0KG1kYXRCb3gpXG4gICAgbW9vZk1kYXQud3JpdGUobW9vZiwgbWRhdClcblxuICAgIHRyYWNrLnNhbXBsZXMgPSBbXVxuICAgIHRyYWNrLmxlbmd0aCA9IDBcblxuICAgIGxldCBwcmVzb3VyY2VidWZmZXIgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdQUkVfU09VUkNFX0JVRkZFUicpO1xuICAgIGxldCBzb3VyY2UgPSBwcmVzb3VyY2VidWZmZXIuZ2V0U291cmNlKCdhdWRpbycpO1xuICAgIGlmICghc291cmNlKSB7XG4gICAgICBzb3VyY2UgPSBwcmVzb3VyY2VidWZmZXIuY3JlYXRlU291cmNlKCdhdWRpbycpO1xuICAgIH1cbiAgICBzb3VyY2UuZGF0YS5wdXNoKG1vb2ZNZGF0KTtcbiAgICB0aGlzLmVtaXQoUkVNVVhfRVZFTlRTLk1FRElBX1NFR01FTlQsICdhdWRpbycsIG1vb2ZNZGF0KVxuICB9XG5cbiAgaW5pdFNpbGVudEF1ZGlvIChkdHMsIGR1cmF0aW9uKSB7XG4gICAgY29uc3QgdW5pdCA9IE1wNFJlbXV4ZXIuZ2V0U2lsZW50RnJhbWUodGhpcy5hdWRpb01ldGEuY2hhbm5lbENvdW50KVxuICAgIHJldHVybiB7XG4gICAgICBkdHMsXG4gICAgICBwdHM6IGR0cyxcbiAgICAgIGN0czogMCxcbiAgICAgIGR1cmF0aW9uLFxuICAgICAgdW5pdCxcbiAgICAgIHNpemU6IHVuaXQuYnl0ZUxlbmd0aCxcbiAgICAgIG9yaWdpbkR0czogZHRzLFxuICAgICAgdHlwZTogJ3ZpZGVvJ1xuICAgIH1cbiAgfVxuXG4gIGdldCB2aWRlb01ldGEgKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKS52aWRlb1RyYWNrLm1ldGFcbiAgfVxuICBnZXQgYXVkaW9NZXRhICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJykuYXVkaW9UcmFjay5tZXRhXG4gIH1cblxuICBzdGF0aWMgZ2V0U2lsZW50RnJhbWUgKGNoYW5uZWxDb3VudCkge1xuICAgIGlmIChjaGFubmVsQ291bnQgPT09IDEpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMywgMHg4MF0pXG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDIpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgyMSwgMHgwMCwgMHg0OSwgMHg5MCwgMHgwMiwgMHgxOSwgMHgwMCwgMHgyMywgMHg4MF0pXG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDMpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4ZV0pXG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDQpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4MCwgMHgyYywgMHg4MCwgMHgwOCwgMHgwMiwgMHgzOF0pXG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDUpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4MiwgMHgzMCwgMHgwNCwgMHg5OSwgMHgwMCwgMHgyMSwgMHg5MCwgMHgwMiwgMHgzOF0pXG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDYpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4MiwgMHgzMCwgMHgwNCwgMHg5OSwgMHgwMCwgMHgyMSwgMHg5MCwgMHgwMiwgMHgwMCwgMHhiMiwgMHgwMCwgMHgyMCwgMHgwOCwgMHhlMF0pXG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBDb250ZXh0OiByZXF1aXJlKCcuL3NyYy9jb250ZXh0JykuZGVmYXVsdCxcblxuICAvLyBNb2R1bGVzIGZyb20gY29uc3RhbnRzXG4gIEVWRU5UUzogcmVxdWlyZSgnLi9zcmMvY29uc3RhbnRzL2V2ZW50cycpLmRlZmF1bHQsXG4gIFdPUktFUl9DT01NQU5EUzogcmVxdWlyZSgnLi9zcmMvY29uc3RhbnRzL3dvcmtlci1jb21tYW5kcycpLmRlZmF1bHQsXG5cbiAgLy8gTW9kdWxlcyBmcm9tIGVudlxuICBzbmlmZmVyOiByZXF1aXJlKCcuL3NyYy9lbnYvc25pZmZlcicpLmRlZmF1bHQsXG4gIGlzTGU6IHJlcXVpcmUoJy4vc3JjL2Vudi9pc2xlJykuZGVmYXVsdCxcbiAgVVRGODogcmVxdWlyZSgnLi9zcmMvZW52L3V0ZjgnKS5kZWZhdWx0LFxuXG4gIC8vIE1vZGVsc1xuICBNZWRpYUluZm86IHJlcXVpcmUoJy4vc3JjL21vZGVscy9tZWRpYS1pbmZvJykuZGVmYXVsdCxcbiAgTWVkaWFTYW1wbGU6IHJlcXVpcmUoJy4vc3JjL21vZGVscy9tZWRpYS1zYW1wbGUnKS5kZWZhdWx0LFxuICBNZWRpYVNlZ21lbnQ6IHJlcXVpcmUoJy4vc3JjL21vZGVscy9tZWRpYS1zZWdtZW50JykuZGVmYXVsdCxcbiAgTWVkaWFTZWdtZW50TGlzdDogcmVxdWlyZSgnLi9zcmMvbW9kZWxzL21lZGlhLXNlZ21lbnQtbGlzdCcpLmRlZmF1bHQsXG4gIEF1ZGlvVHJhY2tNZXRhOiByZXF1aXJlKCcuL3NyYy9tb2RlbHMvdHJhY2stbWV0YScpLkF1ZGlvVHJhY2tNZXRhLFxuICBWaWRlb1RyYWNrTWV0YTogcmVxdWlyZSgnLi9zcmMvbW9kZWxzL3RyYWNrLW1ldGEnKS5WaWRlb1RyYWNrTWV0YSxcbiAgQXVkaW9UcmFja1NhbXBsZTogcmVxdWlyZSgnLi9zcmMvbW9kZWxzL3RyYWNrLXNhbXBsZScpLkF1ZGlvVHJhY2tTYW1wbGUsXG4gIFZpZGVvVHJhY2tTYW1wbGU6IHJlcXVpcmUoJy4vc3JjL21vZGVscy90cmFjay1zYW1wbGUnKS5WaWRlb1RyYWNrU2FtcGxlLFxuXG4gIC8vIE1vZHVsZXMgZnJvbSBtc2VcbiAgTXNlOiByZXF1aXJlKCcuL3NyYy9tc2UvaW5kZXgnKS5kZWZhdWx0LFxuXG4gIC8vIE1vZHVsZXMgZnJvbSB3cml0ZVxuICBTdHJlYW06IHJlcXVpcmUoJy4vc3JjL3dyaXRlL3N0cmVhbScpLmRlZmF1bHQsXG4gIEJ1ZmZlcjogcmVxdWlyZSgnLi9zcmMvd3JpdGUvYnVmZmVyJykuZGVmYXVsdCxcblxuICBNb2JpbGVWaWRlbzogcmVxdWlyZSgnLi9zcmMvbW9iaWxlL21vYmlsZS12aWRlbycpXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChSZXN1bHRDb25zdHJ1Y3Rvcikge1xuICB2YXIgdG90YWxMZW5ndGggPSAwO1xuXG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcnJheXMgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJyYXlzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGFycmF5c1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgIHZhciBhcnIgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgdG90YWxMZW5ndGggKz0gYXJyLmxlbmd0aDtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIHJlc3VsdCA9IG5ldyBSZXN1bHRDb25zdHJ1Y3Rvcih0b3RhbExlbmd0aCk7XG4gIHZhciBvZmZzZXQgPSAwO1xuICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlO1xuICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7XG4gIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gYXJyYXlzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAyOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gKF9zdGVwMiA9IF9pdGVyYXRvcjIubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlKSB7XG4gICAgICB2YXIgX2FyciA9IF9zdGVwMi52YWx1ZTtcblxuICAgICAgcmVzdWx0LnNldChfYXJyLCBvZmZzZXQpO1xuICAgICAgb2Zmc2V0ICs9IF9hcnIubGVuZ3RoO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICBfaXRlcmF0b3JFcnJvcjIgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgJiYgX2l0ZXJhdG9yMi5yZXR1cm4pIHtcbiAgICAgICAgX2l0ZXJhdG9yMi5yZXR1cm4oKTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NvbmNhdCA9IHJlcXVpcmUoJy4vY29uY2F0Jyk7XG5cbnZhciBfY29uY2F0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmNhdCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbm1vZHVsZS5leHBvcnRzID0gX2NvbmNhdDIuZGVmYXVsdDsiLCJmdW5jdGlvbiB3ZWJwYWNrQm9vdHN0cmFwRnVuYyAobW9kdWxlcykge1xuLyoqKioqKi8gIC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovICB2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4vKioqKioqLyAgLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovICBmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbi8qKioqKiovICAgIC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gICAgaWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4vKioqKioqLyAgICAgIHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4vKioqKioqLyAgICAvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gICAgdmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gICAgICBpOiBtb2R1bGVJZCxcbi8qKioqKiovICAgICAgbDogZmFsc2UsXG4vKioqKioqLyAgICAgIGV4cG9ydHM6IHt9XG4vKioqKioqLyAgICB9O1xuXG4vKioqKioqLyAgICAvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovICAgIG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4vKioqKioqLyAgICAvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyAgICBtb2R1bGUubCA9IHRydWU7XG5cbi8qKioqKiovICAgIC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyAgfVxuXG4vKioqKioqLyAgLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovICBfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4vKioqKioqLyAgLy8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovICBfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4vKioqKioqLyAgLy8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuLyoqKioqKi8gIC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuLyoqKioqKi8gICAgaWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuLyoqKioqKi8gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuLyoqKioqKi8gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4vKioqKioqLyAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbi8qKioqKiovICAgICAgICBnZXQ6IGdldHRlclxuLyoqKioqKi8gICAgICB9KTtcbi8qKioqKiovICAgIH1cbi8qKioqKiovICB9O1xuXG4vKioqKioqLyAgLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbi8qKioqKiovICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4vKioqKioqLyAgfTtcblxuLyoqKioqKi8gIC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4vKioqKioqLyAgX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4vKioqKioqLyAgICB2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbi8qKioqKiovICAgICAgZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbi8qKioqKiovICAgICAgZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbi8qKioqKiovICAgIF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbi8qKioqKiovICAgIHJldHVybiBnZXR0ZXI7XG4vKioqKioqLyAgfTtcblxuLyoqKioqKi8gIC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuLyoqKioqKi8gIC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4vKioqKioqLyAgX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbi8qKioqKiovICAvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiAgdmFyIGYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IEVOVFJZX01PRFVMRSlcbiAgcmV0dXJuIGYuZGVmYXVsdCB8fCBmIC8vIHRyeSB0byBjYWxsIGRlZmF1bHQgaWYgZGVmaW5lZCB0byBhbHNvIHN1cHBvcnQgYmFiZWwgZXNtb2R1bGUgZXhwb3J0c1xufVxuXG52YXIgbW9kdWxlTmFtZVJlcUV4cCA9ICdbXFxcXC58XFxcXC18XFxcXCt8XFxcXHd8XFwvfEBdKydcbnZhciBkZXBlbmRlbmN5UmVnRXhwID0gJ1xcXFwoXFxcXHMqKFxcL1xcXFwqLio/XFxcXCpcXC8pP1xcXFxzKi4qPygnICsgbW9kdWxlTmFtZVJlcUV4cCArICcpLio/XFxcXCknIC8vIGFkZGl0aW9uYWwgY2hhcnMgd2hlbiBvdXRwdXQucGF0aGluZm8gaXMgdHJ1ZVxuXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNTkzNjYxLzEzMDQ0MlxuZnVuY3Rpb24gcXVvdGVSZWdFeHAgKHN0cikge1xuICByZXR1cm4gKHN0ciArICcnKS5yZXBsYWNlKC9bLj8qK14kW1xcXVxcXFwoKXt9fC1dL2csICdcXFxcJCYnKVxufVxuXG5mdW5jdGlvbiBpc051bWVyaWMobikge1xuICByZXR1cm4gIWlzTmFOKDEgKiBuKTsgLy8gMSAqIG4gY29udmVydHMgaW50ZWdlcnMsIGludGVnZXJzIGFzIHN0cmluZyAoXCIxMjNcIiksIDFlMyBhbmQgXCIxZTNcIiB0byBpbnRlZ2VycyBhbmQgc3RyaW5ncyB0byBOYU5cbn1cblxuZnVuY3Rpb24gZ2V0TW9kdWxlRGVwZW5kZW5jaWVzIChzb3VyY2VzLCBtb2R1bGUsIHF1ZXVlTmFtZSkge1xuICB2YXIgcmV0dmFsID0ge31cbiAgcmV0dmFsW3F1ZXVlTmFtZV0gPSBbXVxuXG4gIHZhciBmblN0cmluZyA9IG1vZHVsZS50b1N0cmluZygpXG4gIHZhciB3cmFwcGVyU2lnbmF0dXJlID0gZm5TdHJpbmcubWF0Y2goL15mdW5jdGlvblxccz9cXHcqXFwoXFx3KyxcXHMqXFx3KyxcXHMqKFxcdyspXFwpLylcbiAgaWYgKCF3cmFwcGVyU2lnbmF0dXJlKSByZXR1cm4gcmV0dmFsXG4gIHZhciB3ZWJwYWNrUmVxdWlyZU5hbWUgPSB3cmFwcGVyU2lnbmF0dXJlWzFdXG5cbiAgLy8gbWFpbiBidW5kbGUgZGVwc1xuICB2YXIgcmUgPSBuZXcgUmVnRXhwKCcoXFxcXFxcXFxufFxcXFxXKScgKyBxdW90ZVJlZ0V4cCh3ZWJwYWNrUmVxdWlyZU5hbWUpICsgZGVwZW5kZW5jeVJlZ0V4cCwgJ2cnKVxuICB2YXIgbWF0Y2hcbiAgd2hpbGUgKChtYXRjaCA9IHJlLmV4ZWMoZm5TdHJpbmcpKSkge1xuICAgIGlmIChtYXRjaFszXSA9PT0gJ2RsbC1yZWZlcmVuY2UnKSBjb250aW51ZVxuICAgIHJldHZhbFtxdWV1ZU5hbWVdLnB1c2gobWF0Y2hbM10pXG4gIH1cblxuICAvLyBkbGwgZGVwc1xuICByZSA9IG5ldyBSZWdFeHAoJ1xcXFwoJyArIHF1b3RlUmVnRXhwKHdlYnBhY2tSZXF1aXJlTmFtZSkgKyAnXFxcXChcIihkbGwtcmVmZXJlbmNlXFxcXHMoJyArIG1vZHVsZU5hbWVSZXFFeHAgKyAnKSlcIlxcXFwpXFxcXCknICsgZGVwZW5kZW5jeVJlZ0V4cCwgJ2cnKVxuICB3aGlsZSAoKG1hdGNoID0gcmUuZXhlYyhmblN0cmluZykpKSB7XG4gICAgaWYgKCFzb3VyY2VzW21hdGNoWzJdXSkge1xuICAgICAgcmV0dmFsW3F1ZXVlTmFtZV0ucHVzaChtYXRjaFsxXSlcbiAgICAgIHNvdXJjZXNbbWF0Y2hbMl1dID0gX193ZWJwYWNrX3JlcXVpcmVfXyhtYXRjaFsxXSkubVxuICAgIH1cbiAgICByZXR2YWxbbWF0Y2hbMl1dID0gcmV0dmFsW21hdGNoWzJdXSB8fCBbXVxuICAgIHJldHZhbFttYXRjaFsyXV0ucHVzaChtYXRjaFs0XSlcbiAgfVxuXG4gIC8vIGNvbnZlcnQgMWUzIGJhY2sgdG8gMTAwMCAtIHRoaXMgY2FuIGJlIGltcG9ydGFudCBhZnRlciB1Z2xpZnktanMgY29udmVydGVkIDEwMDAgdG8gMWUzXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMocmV0dmFsKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCByZXR2YWxba2V5c1tpXV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIGlmIChpc051bWVyaWMocmV0dmFsW2tleXNbaV1dW2pdKSkge1xuICAgICAgICByZXR2YWxba2V5c1tpXV1bal0gPSAxICogcmV0dmFsW2tleXNbaV1dW2pdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXR2YWxcbn1cblxuZnVuY3Rpb24gaGFzVmFsdWVzSW5RdWV1ZXMgKHF1ZXVlcykge1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHF1ZXVlcylcbiAgcmV0dXJuIGtleXMucmVkdWNlKGZ1bmN0aW9uIChoYXNWYWx1ZXMsIGtleSkge1xuICAgIHJldHVybiBoYXNWYWx1ZXMgfHwgcXVldWVzW2tleV0ubGVuZ3RoID4gMFxuICB9LCBmYWxzZSlcbn1cblxuZnVuY3Rpb24gZ2V0UmVxdWlyZWRNb2R1bGVzIChzb3VyY2VzLCBtb2R1bGVJZCkge1xuICB2YXIgbW9kdWxlc1F1ZXVlID0ge1xuICAgIG1haW46IFttb2R1bGVJZF1cbiAgfVxuICB2YXIgcmVxdWlyZWRNb2R1bGVzID0ge1xuICAgIG1haW46IFtdXG4gIH1cbiAgdmFyIHNlZW5Nb2R1bGVzID0ge1xuICAgIG1haW46IHt9XG4gIH1cblxuICB3aGlsZSAoaGFzVmFsdWVzSW5RdWV1ZXMobW9kdWxlc1F1ZXVlKSkge1xuICAgIHZhciBxdWV1ZXMgPSBPYmplY3Qua2V5cyhtb2R1bGVzUXVldWUpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBxdWV1ZU5hbWUgPSBxdWV1ZXNbaV1cbiAgICAgIHZhciBxdWV1ZSA9IG1vZHVsZXNRdWV1ZVtxdWV1ZU5hbWVdXG4gICAgICB2YXIgbW9kdWxlVG9DaGVjayA9IHF1ZXVlLnBvcCgpXG4gICAgICBzZWVuTW9kdWxlc1txdWV1ZU5hbWVdID0gc2Vlbk1vZHVsZXNbcXVldWVOYW1lXSB8fCB7fVxuICAgICAgaWYgKHNlZW5Nb2R1bGVzW3F1ZXVlTmFtZV1bbW9kdWxlVG9DaGVja10gfHwgIXNvdXJjZXNbcXVldWVOYW1lXVttb2R1bGVUb0NoZWNrXSkgY29udGludWVcbiAgICAgIHNlZW5Nb2R1bGVzW3F1ZXVlTmFtZV1bbW9kdWxlVG9DaGVja10gPSB0cnVlXG4gICAgICByZXF1aXJlZE1vZHVsZXNbcXVldWVOYW1lXSA9IHJlcXVpcmVkTW9kdWxlc1txdWV1ZU5hbWVdIHx8IFtdXG4gICAgICByZXF1aXJlZE1vZHVsZXNbcXVldWVOYW1lXS5wdXNoKG1vZHVsZVRvQ2hlY2spXG4gICAgICB2YXIgbmV3TW9kdWxlcyA9IGdldE1vZHVsZURlcGVuZGVuY2llcyhzb3VyY2VzLCBzb3VyY2VzW3F1ZXVlTmFtZV1bbW9kdWxlVG9DaGVja10sIHF1ZXVlTmFtZSlcbiAgICAgIHZhciBuZXdNb2R1bGVzS2V5cyA9IE9iamVjdC5rZXlzKG5ld01vZHVsZXMpXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG5ld01vZHVsZXNLZXlzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIG1vZHVsZXNRdWV1ZVtuZXdNb2R1bGVzS2V5c1tqXV0gPSBtb2R1bGVzUXVldWVbbmV3TW9kdWxlc0tleXNbal1dIHx8IFtdXG4gICAgICAgIG1vZHVsZXNRdWV1ZVtuZXdNb2R1bGVzS2V5c1tqXV0gPSBtb2R1bGVzUXVldWVbbmV3TW9kdWxlc0tleXNbal1dLmNvbmNhdChuZXdNb2R1bGVzW25ld01vZHVsZXNLZXlzW2pdXSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVxdWlyZWRNb2R1bGVzXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG1vZHVsZUlkLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIHZhciBzb3VyY2VzID0ge1xuICAgIG1haW46IF9fd2VicGFja19tb2R1bGVzX19cbiAgfVxuXG4gIHZhciByZXF1aXJlZE1vZHVsZXMgPSBvcHRpb25zLmFsbCA/IHsgbWFpbjogT2JqZWN0LmtleXMoc291cmNlcy5tYWluKSB9IDogZ2V0UmVxdWlyZWRNb2R1bGVzKHNvdXJjZXMsIG1vZHVsZUlkKVxuXG4gIHZhciBzcmMgPSAnJ1xuXG4gIE9iamVjdC5rZXlzKHJlcXVpcmVkTW9kdWxlcykuZmlsdGVyKGZ1bmN0aW9uIChtKSB7IHJldHVybiBtICE9PSAnbWFpbicgfSkuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlKSB7XG4gICAgdmFyIGVudHJ5TW9kdWxlID0gMFxuICAgIHdoaWxlIChyZXF1aXJlZE1vZHVsZXNbbW9kdWxlXVtlbnRyeU1vZHVsZV0pIHtcbiAgICAgIGVudHJ5TW9kdWxlKytcbiAgICB9XG4gICAgcmVxdWlyZWRNb2R1bGVzW21vZHVsZV0ucHVzaChlbnRyeU1vZHVsZSlcbiAgICBzb3VyY2VzW21vZHVsZV1bZW50cnlNb2R1bGVdID0gJyhmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHsgbW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fOyB9KSdcbiAgICBzcmMgPSBzcmMgKyAndmFyICcgKyBtb2R1bGUgKyAnID0gKCcgKyB3ZWJwYWNrQm9vdHN0cmFwRnVuYy50b1N0cmluZygpLnJlcGxhY2UoJ0VOVFJZX01PRFVMRScsIEpTT04uc3RyaW5naWZ5KGVudHJ5TW9kdWxlKSkgKyAnKSh7JyArIHJlcXVpcmVkTW9kdWxlc1ttb2R1bGVdLm1hcChmdW5jdGlvbiAoaWQpIHsgcmV0dXJuICcnICsgSlNPTi5zdHJpbmdpZnkoaWQpICsgJzogJyArIHNvdXJjZXNbbW9kdWxlXVtpZF0udG9TdHJpbmcoKSB9KS5qb2luKCcsJykgKyAnfSk7XFxuJ1xuICB9KVxuXG4gIHNyYyA9IHNyYyArICduZXcgKCgnICsgd2VicGFja0Jvb3RzdHJhcEZ1bmMudG9TdHJpbmcoKS5yZXBsYWNlKCdFTlRSWV9NT0RVTEUnLCBKU09OLnN0cmluZ2lmeShtb2R1bGVJZCkpICsgJykoeycgKyByZXF1aXJlZE1vZHVsZXMubWFpbi5tYXAoZnVuY3Rpb24gKGlkKSB7IHJldHVybiAnJyArIEpTT04uc3RyaW5naWZ5KGlkKSArICc6ICcgKyBzb3VyY2VzLm1haW5baWRdLnRvU3RyaW5nKCkgfSkuam9pbignLCcpICsgJ30pKShzZWxmKTsnXG5cbiAgdmFyIGJsb2IgPSBuZXcgd2luZG93LkJsb2IoW3NyY10sIHsgdHlwZTogJ3RleHQvamF2YXNjcmlwdCcgfSlcbiAgaWYgKG9wdGlvbnMuYmFyZSkgeyByZXR1cm4gYmxvYiB9XG5cbiAgdmFyIFVSTCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTCB8fCB3aW5kb3cubW96VVJMIHx8IHdpbmRvdy5tc1VSTFxuXG4gIHZhciB3b3JrZXJVcmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpXG4gIHZhciB3b3JrZXIgPSBuZXcgd2luZG93Lldvcmtlcih3b3JrZXJVcmwpXG4gIHdvcmtlci5vYmplY3RVUkwgPSB3b3JrZXJVcmxcblxuICByZXR1cm4gd29ya2VyXG59XG4iLCJjb25zdCBMT0FERVJfRVZFTlRTID0ge1xuICBMQURFUl9TVEFSVDogJ0xPQURFUl9TVEFSVCcsXG4gIExPQURFUl9EQVRBTE9BREVEOiAnTE9BREVSX0RBVEFMT0FERUQnLFxuICBMT0FERVJfQ09NUExFVEU6ICdMT0FERVJfQ09NUExFVEUnLFxuICBMT0FERVJfRVJST1I6ICdMT0FERVJfRVJST1InXG59XG5cbmNvbnN0IERFTVVYX0VWRU5UUyA9IHtcbiAgREVNVVhfU1RBUlQ6ICdERU1VWF9TVEFSVCcsXG4gIERFTVVYX0NPTVBMRVRFOiAnREVNVVhfQ09NUExFVEUnLFxuICBERU1VWF9FUlJPUjogJ0RFTVVYX0VSUk9SJyxcbiAgTUVUQURBVEFfUEFSU0VEOiAnTUVUQURBVEFfUEFSU0VEJyxcbiAgVklERU9fTUVUQURBVEFfQ0hBTkdFOiAnVklERU9fTUVUQURBVEFfQ0hBTkdFJyxcbiAgQVVESU9fTUVUQURBVEFfQ0hBTkdFOiAnQVVESU9fTUVUQURBVEFfQ0hBTkdFJyxcbiAgTUVESUFfSU5GTzogJ01FRElBX0lORk8nXG59XG5cbmNvbnN0IFJFTVVYX0VWRU5UUyA9IHtcbiAgUkVNVVhfTUVUQURBVEE6ICdSRU1VWF9NRVRBREFUQScsXG4gIFJFTVVYX01FRElBOiAnUkVNVVhfTUVESUEnLFxuICBNRURJQV9TRUdNRU5UOiAnTUVESUFfU0VHTUVOVCcsXG4gIFJFTVVYX0VSUk9SOiAnUkVNVVhfRVJST1InLFxuICBJTklUX1NFR01FTlQ6ICdJTklUX1NFR01FTlQnXG59XG5cbmNvbnN0IE1TRV9FVkVOVFMgPSB7XG4gIFNPVVJDRV9VUERBVEVfRU5EOiAnU09VUkNFX1VQREFURV9FTkQnXG59XG5cbi8vIGhsc+S4k+aciWV2ZW50c1xuY29uc3QgSExTX0VWRU5UUyA9IHtcbiAgUkVUUllfVElNRV9FWENFRURFRDogJ1JFVFJZX1RJTUVfRVhDRUVERUQnXG59XG5cbmNvbnN0IEFMTEVWRU5UUyA9IE9iamVjdC5hc3NpZ24oe30sIExPQURFUl9FVkVOVFMsIERFTVVYX0VWRU5UUywgUkVNVVhfRVZFTlRTLCBNU0VfRVZFTlRTLCBITFNfRVZFTlRTKVxuXG5jb25zdCBGbHZBbGxvd2VkRXZlbnRzID0gW11cbmNvbnN0IEhsc0FsbG93ZWRFdmVudHMgPSBbXVxuXG5mb3IgKGxldCBrZXkgaW4gQUxMRVZFTlRTKSB7XG4gIGlmIChBTExFVkVOVFMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgIEZsdkFsbG93ZWRFdmVudHMucHVzaChBTExFVkVOVFNba2V5XSlcbiAgfVxufVxuXG5mb3IgKGxldCBrZXkgaW4gQUxMRVZFTlRTKSB7XG4gIGlmIChBTExFVkVOVFMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgIEhsc0FsbG93ZWRFdmVudHMucHVzaChBTExFVkVOVFNba2V5XSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIEFMTEVWRU5UUyxcbiAgSExTX0VWRU5UUyxcbiAgUkVNVVhfRVZFTlRTLFxuICBERU1VWF9FVkVOVFMsXG4gIE1TRV9FVkVOVFMsXG4gIExPQURFUl9FVkVOVFMsXG4gIEZsdkFsbG93ZWRFdmVudHMsXG4gIEhsc0FsbG93ZWRFdmVudHNcbn07XG4iLCJleHBvcnQgY29uc3QgQ09OVEVYVF9DT01PTUFORFMgPSB7XG4gIE9OOiAnb24nLFxuICBPTkNFOiAnb25jZScsXG4gIE9GRjogJ29mZicsXG4gIEVNSVQ6ICdlbWl0JyxcbiAgREVTVFJPWTogJ2Rlc3Ryb3knXG59XG4iLCJpbXBvcnQgTWVkaWFJbmZvIGZyb20gJy4vbW9kZWxzL21lZGlhLWluZm8nXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnXG5cbmNvbnN0IERJUkVDVF9FTUlUX0ZMQUcgPSAnX19UT19fJ1xuXG5jbGFzcyBDb250ZXh0IHtcbiAgY29uc3RydWN0b3IgKGFsbG93ZWRFdmVudHMgPSBbXSkge1xuICAgIHRoaXMuX2VtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKClcbiAgICB0aGlzLl9pbnN0YW5jZU1hcCA9IHt9IC8vIOaJgOacieeahOino+eggea1geeoi+WunuS+i1xuICAgIHRoaXMuX2Nsc01hcCA9IHt9IC8vIOaehOmAoOWHveaVsOeahG1hcFxuICAgIHRoaXMuX2luaXRlZCA9IGZhbHNlXG4gICAgdGhpcy5tZWRpYUluZm8gPSBuZXcgTWVkaWFJbmZvKClcbiAgICB0aGlzLmFsbG93ZWRFdmVudHMgPSBhbGxvd2VkRXZlbnRzXG4gICAgdGhpcy5faG9va3MgPSB7fSAvLyDms6jlhozlnKjkuovku7bliY0v5ZCO55qE6ZKp5a2Q77yM5L6L5aaCIGJlZm9yZSgnREVNVVhfQ09NUExFVEUnKVxuICB9XG5cbiAgLyoqXG4gICAqIOS7juS4iuS4i+aWh+S4reiOt+WPluino+eggea1geeoi+WunuS+i++8jOWmguaenOayoeacieWunuS+i++8jOaehOmAoOS4gOS4qlxuICAgKiBAcGFyYW0gdGFnXG4gICAqIEBwYXJhbSBhcmdzXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0SW5zdGFuY2UgKHRhZykge1xuICAgIGlmICh0aGlzLl9pbnN0YW5jZU1hcFt0YWddKSB7XG4gICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2VNYXBbdGFnXVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0aHJvdyBuZXcgRXJyb3IoYCR7dGFnfeWunuS+i+WwmuacquWIneWni+WMlmApXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDliJ3lp4vljJblhbfkvZPlrp7kvotcbiAgICogQHBhcmFtIHRhZ1xuICAgKiBAcGFyYW0gYXJnc1xuICAgKi9cbiAgaW5pdEluc3RhbmNlICh0YWcsIC4uLmFyZ3MpIHtcbiAgICBpZiAodGhpcy5fY2xzTWFwW3RhZ10pIHtcbiAgICAgIGNvbnN0IG5ld0luc3RhbmNlID0gbmV3IHRoaXMuX2Nsc01hcFt0YWddKC4uLmFyZ3MpXG4gICAgICB0aGlzLl9pbnN0YW5jZU1hcFt0YWddID0gbmV3SW5zdGFuY2VcbiAgICAgIGlmIChuZXdJbnN0YW5jZS5pbml0KSB7XG4gICAgICAgIG5ld0luc3RhbmNlLmluaXQoKSAvLyBUT0RPOiBsaWZlY2lyY2xlXG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3SW5zdGFuY2VcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3RhZ33mnKrlnKhjb250ZXh05Lit5rOo5YaMYClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog6YG/5YWN5aSn6YeP55qEaW5pdEluc3RhbmNl6LCD55So77yM5Yid5aeL5YyW5omA5pyJ55qE57uE5Lu2XG4gICAqIEBwYXJhbSBjb25maWdcbiAgICovXG4gIGluaXQgKGNvbmZpZykge1xuICAgIGlmICh0aGlzLl9pbml0ZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBmb3IgKGxldCB0YWcgaW4gdGhpcy5fY2xzTWFwKSB7XG4gICAgICAvLyBpZiBub3QgaW5pdGVkLCBpbml0IGFuIGluc3RhbmNlXG4gICAgICBpZiAodGhpcy5fY2xzTWFwLmhhc093blByb3BlcnR5KHRhZykgJiYgIXRoaXMuX2luc3RhbmNlTWFwW3RhZ10pIHtcbiAgICAgICAgdGhpcy5pbml0SW5zdGFuY2UodGFnLCBjb25maWcpXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2luaXRlZCA9IHRydWVcbiAgfVxuXG4gIC8qKlxuICAgKiDms6jlhozkuIDkuKrkuIrkuIvmlofmtYHnqIvvvIzmj5DkvpvlronlhajnmoTkuovku7blj5HpgIHmnLrliLZcbiAgICogQHBhcmFtIHRhZ1xuICAgKiBAcGFyYW0gY2xzXG4gICAqL1xuICByZWdpc3RyeSAodGFnLCBjbHMpIHtcbiAgICBjb25zdCBlbWl0dGVyID0gdGhpcy5fZW1pdHRlclxuICAgIGNvbnN0IGNoZWNrTWVzc2FnZU5hbWUgPSB0aGlzLl9pc01lc3NhZ2VOYW1lVmFsaWQuYmluZCh0aGlzKVxuICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgY29uc3QgZW5oYW5jZWQgPSBjbGFzcyBleHRlbmRzIGNscyB7XG4gICAgICBjb25zdHJ1Y3RvciAoLi4uYXJncykge1xuICAgICAgICBzdXBlciguLi5hcmdzKVxuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHt9XG4gICAgICAgIHRoaXMub25jZUxpc3RlbmVycyA9IHt9XG4gICAgICAgIHRoaXMuVEFHID0gdGFnXG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBzZWxmXG4gICAgICB9XG5cbiAgICAgIG9uIChtZXNzYWdlTmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgY2hlY2tNZXNzYWdlTmFtZShtZXNzYWdlTmFtZSlcblxuICAgICAgICBpZiAodGhpcy5saXN0ZW5lcnNbbWVzc2FnZU5hbWVdKSB7XG4gICAgICAgICAgdGhpcy5saXN0ZW5lcnNbbWVzc2FnZU5hbWVdLnB1c2goY2FsbGJhY2spXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5saXN0ZW5lcnNbbWVzc2FnZU5hbWVdID0gW2NhbGxiYWNrXVxuICAgICAgICB9XG5cbiAgICAgICAgZW1pdHRlci5vbihgJHttZXNzYWdlTmFtZX0ke0RJUkVDVF9FTUlUX0ZMQUd9JHt0YWd9YCwgY2FsbGJhY2spIC8vIOW7uueri+WumuWQkemAmuS/oeebkeWQrFxuICAgICAgICByZXR1cm4gZW1pdHRlci5vbihtZXNzYWdlTmFtZSwgY2FsbGJhY2spXG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICog5Zyo5p+Q5Liq5LqL5Lu26Kem5Y+R5YmN5omn6KGMXG4gICAgICAgKiBAcGFyYW0gbWVzc2FnZU5hbWVcbiAgICAgICAqIEBwYXJhbSBjYWxsYmFja1xuICAgICAgICovXG4gICAgICBiZWZvcmUgKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaykge1xuICAgICAgICBjaGVja01lc3NhZ2VOYW1lKG1lc3NhZ2VOYW1lKVxuICAgICAgICBpZiAoc2VsZi5faG9va3NbbWVzc2FnZU5hbWVdKSB7XG4gICAgICAgICAgc2VsZi5faG9va3NbbWVzc2FnZU5hbWVdLnB1c2goY2FsbGJhY2spXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VsZi5faG9va3NbbWVzc2FnZU5hbWVdID0gW2NhbGxiYWNrXVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG9uY2UgKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaykge1xuICAgICAgICBjaGVja01lc3NhZ2VOYW1lKG1lc3NhZ2VOYW1lKVxuXG4gICAgICAgIGlmICh0aGlzLm9uY2VMaXN0ZW5lcnNbbWVzc2FnZU5hbWVdKSB7XG4gICAgICAgICAgdGhpcy5vbmNlTGlzdGVuZXJzW21lc3NhZ2VOYW1lXS5wdXNoKGNhbGxiYWNrKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMub25jZUxpc3RlbmVyc1ttZXNzYWdlTmFtZV0gPSBbY2FsbGJhY2tdXG4gICAgICAgIH1cblxuICAgICAgICBlbWl0dGVyLm9uY2UoYCR7bWVzc2FnZU5hbWV9JHtESVJFQ1RfRU1JVF9GTEFHfSR7dGFnfWAsIGNhbGxiYWNrKVxuICAgICAgICByZXR1cm4gZW1pdHRlci5vbmNlKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaylcbiAgICAgIH1cblxuICAgICAgZW1pdCAobWVzc2FnZU5hbWUsIC4uLmFyZ3MpIHtcbiAgICAgICAgY2hlY2tNZXNzYWdlTmFtZShtZXNzYWdlTmFtZSlcblxuICAgICAgICBjb25zdCBiZWZvcmVMaXN0ID0gc2VsZi5faG9va3NbbWVzc2FnZU5hbWVdXG4gICAgICAgIGlmIChiZWZvcmVMaXN0KSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGJlZm9yZUxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrID0gYmVmb3JlTGlzdFtpXVxuICAgICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZW1pdHRlci5lbWl0KG1lc3NhZ2VOYW1lLCAuLi5hcmdzKVxuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIOWumuWQkeWPkemAgee7meafkOS4que7hOS7tuWNleS+i+eahOa2iOaBr1xuICAgICAgICogQHBhcmFtIG1lc3NhZ2VOYW1lXG4gICAgICAgKiBAcGFyYW0gYXJnc1xuICAgICAgICovXG4gICAgICBlbWl0VG8gKHRhZywgbWVzc2FnZU5hbWUsIC4uLmFyZ3MpIHtcbiAgICAgICAgY2hlY2tNZXNzYWdlTmFtZShtZXNzYWdlTmFtZSlcblxuICAgICAgICByZXR1cm4gZW1pdHRlci5lbWl0KGAke21lc3NhZ2VOYW1lfSR7RElSRUNUX0VNSVRfRkxBR30ke3RhZ31gLCAuLi5hcmdzKVxuICAgICAgfVxuXG4gICAgICBvZmYgKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaykge1xuICAgICAgICBjaGVja01lc3NhZ2VOYW1lKG1lc3NhZ2VOYW1lKVxuICAgICAgICByZXR1cm4gZW1pdHRlci5vZmYobWVzc2FnZU5hbWUsIGNhbGxiYWNrKVxuICAgICAgfVxuXG4gICAgICByZW1vdmVMaXN0ZW5lcnMgKCkge1xuICAgICAgICBjb25zdCBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmJpbmQodGhpcy5saXN0ZW5lcnMpXG5cbiAgICAgICAgZm9yIChsZXQgbWVzc2FnZU5hbWUgaW4gdGhpcy5saXN0ZW5lcnMpIHtcbiAgICAgICAgICBpZiAoaGFzT3duKG1lc3NhZ2VOYW1lKSkge1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5saXN0ZW5lcnNbbWVzc2FnZU5hbWVdIHx8IFtdXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IGNhbGxiYWNrc1tpXVxuICAgICAgICAgICAgICBlbWl0dGVyLm9mZihtZXNzYWdlTmFtZSwgY2FsbGJhY2spXG4gICAgICAgICAgICAgIGVtaXR0ZXIub2ZmKGAke21lc3NhZ2VOYW1lfSR7RElSRUNUX0VNSVRfRkxBR30ke3RhZ31gLCBjYWxsYmFjaylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBtZXNzYWdlTmFtZSBpbiB0aGlzLm9uY2VMaXN0ZW5lcnMpIHtcbiAgICAgICAgICBpZiAoaGFzT3duKG1lc3NhZ2VOYW1lKSkge1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5vbmNlTGlzdGVuZXJzW21lc3NhZ2VOYW1lXSB8fCBbXVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSBjYWxsYmFja3NbaV1cbiAgICAgICAgICAgICAgZW1pdHRlci5vZmYobWVzc2FnZU5hbWUsIGNhbGxiYWNrKVxuICAgICAgICAgICAgICBlbWl0dGVyLm9mZihgJHttZXNzYWdlTmFtZX0ke0RJUkVDVF9FTUlUX0ZMQUd9JHt0YWd9YCwgY2FsbGJhY2spXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICog5Zyo57uE5Lu26ZSA5q+B5pe277yM6buY6K6k5bCG5a6D5rOo5YaM55qE5LqL5Lu25YWo6YOo5Y246L2977yM56Gu5L+d5LiN5Lya6YCg5oiQ5YaF5a2Y5rOE5ryPXG4gICAgICAgKi9cbiAgICAgIGRlc3Ryb3kgKCkge1xuICAgICAgICAvLyBzdGVwMSB1bmxpc3RlbiBldmVudHNcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcnMoKVxuXG4gICAgICAgIC8vIHN0ZXAyIHJlbGVhc2UgZnJvbSBjb250ZXh0XG4gICAgICAgIGRlbGV0ZSBzZWxmLl9pbnN0YW5jZU1hcFt0YWddXG4gICAgICAgIGlmIChzdXBlci5kZXN0cm95KSB7XG4gICAgICAgICAgc3VwZXIuZGVzdHJveSgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fY2xzTWFwW3RhZ10gPSBlbmhhbmNlZFxuXG4gICAgLyoqXG4gICAgICogZ2V0IGluc3RhbmNlIGltbWVkaWF0ZWx5XG4gICAgICogZS5nIGNvbnN0IGluc3RhbmNlID0gY29udGV4dC5yZWdpc3RyeSh0YWcsIENscykoY29uZmlnKVxuICAgICAqICovXG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5pbml0SW5zdGFuY2UodGFnLCAuLi5hcmdzKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDlr7nlrZjlnKjnmoTlrp7kvovov5vooYxcbiAgICovXG4gIGRlc3Ryb3lJbnN0YW5jZXMgKCkge1xuICAgIE9iamVjdC5rZXlzKHRoaXMuX2luc3RhbmNlTWFwKS5mb3JFYWNoKCh0YWcpID0+IHtcbiAgICAgIGlmICh0aGlzLl9pbnN0YW5jZU1hcFt0YWddLmRlc3Ryb3kpIHtcbiAgICAgICAgdGhpcy5faW5zdGFuY2VNYXBbdGFnXS5kZXN0cm95KClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIOe8luino+eggea1geeoi+aXoOmcgOWFs+azqOS6i+S7tueahOino+e7kVxuICAgKi9cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5fZW1pdHRlciA9IG51bGxcbiAgICB0aGlzLmFsbG93ZWRFdmVudHMgPSBbXVxuICAgIHRoaXMuX2Nsc01hcCA9IG51bGxcbiAgICB0aGlzLl9jb250ZXh0ID0gbnVsbFxuICAgIHRoaXMuZGVzdHJveUluc3RhbmNlcygpXG4gIH1cblxuICAvKipcbiAgICog5a+55L+h6YGT6L+b6KGM5pS25ouiXG4gICAqIEBwYXJhbSBtZXNzYWdlTmFtZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2lzTWVzc2FnZU5hbWVWYWxpZCAobWVzc2FnZU5hbWUpIHtcbiAgICBpZiAoIXRoaXMuYWxsb3dlZEV2ZW50cy5pbmRleE9mKG1lc3NhZ2VOYW1lKSA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5yZWdpc3RlcmVkIG1lc3NhZ2UgbmFtZTogJHttZXNzYWdlTmFtZX1gKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb250ZXh0XG4iLCJjb25zdCBsZSA9IChmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcigyKTtcbiAgKG5ldyBEYXRhVmlldyhidWYpKS5zZXRJbnQxNigwLCAyNTYsIHRydWUpIC8vIGxpdHRsZS1lbmRpYW4gd3JpdGVcbiAgcmV0dXJuIChuZXcgSW50MTZBcnJheShidWYpKVswXSA9PT0gMjU2IC8vIHBsYXRmb3JtLXNwZWMgcmVhZCwgaWYgZXF1YWwgdGhlbiBMRVxufSkoKVxuXG5leHBvcnQgZGVmYXVsdCBsZVxuIiwiY29uc3QgbGUgPSAoZnVuY3Rpb24gKCkge1xuICBjb25zdCBidWYgPSBuZXcgQXJyYXlCdWZmZXIoMik7XG4gIChuZXcgRGF0YVZpZXcoYnVmKSkuc2V0SW50MTYoMCwgMjU2LCB0cnVlKSAvLyBsaXR0bGUtZW5kaWFuIHdyaXRlXG4gIHJldHVybiAobmV3IEludDE2QXJyYXkoYnVmKSlbMF0gPT09IDI1NiAvLyBwbGF0Zm9ybS1zcGVjIHJlYWQsIGlmIGVxdWFsIHRoZW4gTEVcbn0pKClcblxuY29uc3Qgc25pZmZlciA9IHtcbiAgZ2V0IGRldmljZSAoKSB7XG4gICAgbGV0IHIgPSBzbmlmZmVyLm9zO1xuICAgIHJldHVybiByLmlzUGMgPyAncGMnIDogci5pc1RhYmxldCA/ICd0YWJsZXQnIDogJ21vYmlsZSc7XG4gIH0sXG4gIGdldCBicm93c2VyICgpIHtcbiAgICBsZXQgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgbGV0IHJlZyA9IHtcbiAgICAgIGllOiAvcnY6KFtcXGQuXSspXFwpIGxpa2UgZ2Vja28vLFxuICAgICAgZmlyZm94OiAvZmlyZWZveFxcLyhbXFxkLl0rKS8sXG4gICAgICBjaHJvbWU6IC9jaHJvbWVcXC8oW1xcZC5dKykvLFxuICAgICAgb3BlcmE6IC9vcGVyYS4oW1xcZC5dKykvLFxuICAgICAgc2FmYXJpOiAvdmVyc2lvblxcLyhbXFxkLl0rKS4qc2FmYXJpL1xuICAgIH07XG4gICAgcmV0dXJuIFtdLmNvbmNhdChPYmplY3Qua2V5cyhyZWcpLmZpbHRlcihrZXkgPT4gcmVnW2tleV0udGVzdCh1YSkpKVswXTtcbiAgfSxcbiAgZ2V0IG9zICgpIHtcbiAgICBsZXQgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50XG4gICAgbGV0IGlzV2luZG93c1Bob25lID0gLyg/OldpbmRvd3MgUGhvbmUpLy50ZXN0KHVhKVxuICAgIGxldCBpc1N5bWJpYW4gPSAvKD86U3ltYmlhbk9TKS8udGVzdCh1YSkgfHwgaXNXaW5kb3dzUGhvbmU7XG4gICAgbGV0IGlzQW5kcm9pZCA9IC8oPzpBbmRyb2lkKS8udGVzdCh1YSk7XG4gICAgbGV0IGlzRmlyZUZveCA9IC8oPzpGaXJlZm94KS8udGVzdCh1YSk7XG4gICAgbGV0IGlzVGFibGV0ID0gLyg/OmlQYWR8UGxheUJvb2spLy50ZXN0KHVhKSB8fCAoaXNBbmRyb2lkICYmICEvKD86TW9iaWxlKS8udGVzdCh1YSkpIHx8IChpc0ZpcmVGb3ggJiYgLyg/OlRhYmxldCkvLnRlc3QodWEpKTtcbiAgICBsZXQgaXNQaG9uZSA9IC8oPzppUGhvbmUpLy50ZXN0KHVhKSAmJiAhaXNUYWJsZXQ7XG4gICAgbGV0IGlzUGMgPSAhaXNQaG9uZSAmJiAhaXNBbmRyb2lkICYmICFpc1N5bWJpYW47XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzVGFibGV0LFxuICAgICAgaXNQaG9uZSxcbiAgICAgIGlzQW5kcm9pZCxcbiAgICAgIGlzUGMsXG4gICAgICBpc1N5bWJpYW4sXG4gICAgICBpc1dpbmRvd3NQaG9uZSxcbiAgICAgIGlzRmlyZUZveFxuICAgIH07XG4gIH0sXG5cbiAgZ2V0IGlzTGUgKCkge1xuICAgIHJldHVybiBsZVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBzbmlmZmVyO1xuIiwiY2xhc3MgVVRGOCB7XG4gIHN0YXRpYyBkZWNvZGUgKHVpbnQ4YXJyYXkpIHtcbiAgICBjb25zdCBvdXQgPSBbXTtcbiAgICBjb25zdCBpbnB1dCA9IHVpbnQ4YXJyYXk7XG4gICAgbGV0IGkgPSAwO1xuICAgIGNvbnN0IGxlbmd0aCA9IHVpbnQ4YXJyYXkubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGkgPCBsZW5ndGgpIHtcbiAgICAgIGlmIChpbnB1dFtpXSA8IDB4ODApIHtcbiAgICAgICAgb3V0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShpbnB1dFtpXSkpO1xuICAgICAgICArK2k7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfSBlbHNlIGlmIChpbnB1dFtpXSA8IDB4QzApIHtcbiAgICAgICAgLy8gZmFsbHRocm91Z2hcbiAgICAgIH0gZWxzZSBpZiAoaW5wdXRbaV0gPCAweEUwKSB7XG4gICAgICAgIGlmIChVVEY4Ll9jaGVja0NvbnRpbnVhdGlvbihpbnB1dCwgaSwgMSkpIHtcbiAgICAgICAgICBjb25zdCB1Y3M0ID0gKGlucHV0W2ldICYgMHgxRikgPDwgNiB8IChpbnB1dFtpICsgMV0gJiAweDNGKTtcbiAgICAgICAgICBpZiAodWNzNCA+PSAweDgwKSB7XG4gICAgICAgICAgICBvdXQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKHVjczQgJiAweEZGRkYpKTtcbiAgICAgICAgICAgIGkgKz0gMjtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpbnB1dFtpXSA8IDB4RjApIHtcbiAgICAgICAgaWYgKFVURjguX2NoZWNrQ29udGludWF0aW9uKGlucHV0LCBpLCAyKSkge1xuICAgICAgICAgIGNvbnN0IHVjczQgPSAoaW5wdXRbaV0gJiAweEYpIDw8IDEyIHwgKGlucHV0W2kgKyAxXSAmIDB4M0YpIDw8IDYgfCBpbnB1dFtpICsgMl0gJiAweDNGO1xuICAgICAgICAgIGlmICh1Y3M0ID49IDB4ODAwICYmICh1Y3M0ICYgMHhGODAwKSAhPT0gMHhEODAwKSB7XG4gICAgICAgICAgICBvdXQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKHVjczQgJiAweEZGRkYpKTtcbiAgICAgICAgICAgIGkgKz0gMztcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpbnB1dFtpXSA8IDB4RjgpIHtcbiAgICAgICAgaWYgKFVURjguX2NoZWNrQ29udGludWF0aW9uKGlucHV0LCBpLCAzKSkge1xuICAgICAgICAgIGxldCB1Y3M0ID0gKGlucHV0W2ldICYgMHg3KSA8PCAxOCB8IChpbnB1dFtpICsgMV0gJiAweDNGKSA8PCAxMiB8XG4gICAgICAgICAgICAgICAgICAgIChpbnB1dFtpICsgMl0gJiAweDNGKSA8PCA2IHwgKGlucHV0W2kgKyAzXSAmIDB4M0YpO1xuICAgICAgICAgIGlmICh1Y3M0ID4gMHgxMDAwMCAmJiB1Y3M0IDwgMHgxMTAwMDApIHtcbiAgICAgICAgICAgIHVjczQgLT0gMHgxMDAwMDtcbiAgICAgICAgICAgIG91dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoKHVjczQgPj4+IDEwKSB8IDB4RDgwMCkpO1xuICAgICAgICAgICAgb3V0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgodWNzNCAmIDB4M0ZGKSB8IDB4REMwMCkpO1xuICAgICAgICAgICAgaSArPSA0O1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBvdXQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKDB4RkZGRCkpO1xuICAgICAgKytpO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQuam9pbignJyk7XG4gIH1cblxuICBzdGF0aWMgX2NoZWNrQ29udGludWF0aW9uICh1aW50OGFycmF5LCBzdGFydCwgY2hlY2tMZW5ndGgpIHtcbiAgICBsZXQgYXJyYXkgPSB1aW50OGFycmF5O1xuICAgIGlmIChzdGFydCArIGNoZWNrTGVuZ3RoIDwgYXJyYXkubGVuZ3RoKSB7XG4gICAgICB3aGlsZSAoY2hlY2tMZW5ndGgtLSkge1xuICAgICAgICBpZiAoKGFycmF5Wysrc3RhcnRdICYgMHhDMCkgIT09IDB4ODApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFVURjg7XG4iLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ2V2ZW50cydcbmNsYXNzIEF1ZGlvQ3R4IGV4dGVuZHMgRXZlbnRFbWl0dGVye1xuICBjb25zdHJ1Y3RvciAoY29uZmlnKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZyk7XG4gICAgbGV0IEF1ZGlvQ29udGV4dCA9ICB3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQ7XG4gICAgdGhpcy5jb250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuICAgIHRoaXMuZ2Fpbk5vZGUgPSB0aGlzLmNvbnRleHQuY3JlYXRlR2FpbigpO1xuICAgIHRoaXMuZ2Fpbk5vZGUuY29ubmVjdCh0aGlzLmNvbnRleHQuZGVzdGluYXRpb24pO1xuICAgIHRoaXMubWV0YSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnNhbXBsZXMgPSBbXTtcbiAgICB0aGlzLnByZWxvYWRUaW1lID0gdGhpcy5jb25maWcucHJlbG9hZFRpbWUgfHwgMztcbiAgICB0aGlzLmR1cmF0aW9uID0gMDtcblxuICAgIHRoaXMuX2N1cnJlbnRCdWZmZXIgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fbmV4dEJ1ZmZlciA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9sYXN0cHRzID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3ByZURlY29kZSA9IFtdO1xuICAgIHRoaXMuX2N1cnJlbnRUaW1lID0gMDtcbiAgICB0aGlzLl9kZWNvZGluZyA9IGZhbHNlO1xuICAgIC8vIOiusOW9leWklumDqOS8oOi+k+eahOeKtuaAgVxuICAgIHRoaXMuX3BsYXllZCA9IGZhbHNlO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRUaW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50VGltZTtcbiAgfVxuXG4gIGRlY29kZUF1ZGlvIChhdWRpb1RyYWNrKSB7XG4gICAgbGV0IHtzYW1wbGVzfSA9IGF1ZGlvVHJhY2s7XG4gICAgbGV0IGRhdGEgPSBzYW1wbGVzO1xuICAgIGF1ZGlvVHJhY2suc2FtcGxlcyA9IFtdO1xuICAgIHRoaXMuc2V0QXVkaW9EYXRhKGRhdGEpO1xuICB9XG4gIHNldEF1ZGlvRGF0YSAoZGF0YSkge1xuICAgIGZvcihsZXQgaSA9IDA7aSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRhdGFbaV0ucHRzID0gKGRhdGFbaV0ucHRzID09PSB1bmRlZmluZWQpID8gZGF0YVtpXS5kdHMgOiBkYXRhW2ldLnB0cztcbiAgICAgIHRoaXMuX3ByZURlY29kZS5wdXNoKGRhdGFbaV0pO1xuICAgIH1cbiAgICBpZih0aGlzLl9wcmVEZWNvZGUubGVuZ3RoID4gMCkge1xuICAgICAgaWYodGhpcy5fbGFzdHB0cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX2xhc3RwdHMgPSB0aGlzLl9wcmVEZWNvZGVbMF0ucHRzO1xuICAgICAgfVxuICAgICAgaWYoKHRoaXMuX3ByZURlY29kZVt0aGlzLl9wcmVEZWNvZGUubGVuZ3RoIC0gMV0ucHRzIC0gdGhpcy5fbGFzdHB0cykgLyAxMDAwID4gdGhpcy5wcmVsb2FkVGltZSkge1xuICAgICAgICB0aGlzLmRlY29kZUFBQygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRlY29kZUFBQygpIHtcbiAgICBpZih0aGlzLl9kZWNvZGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9kZWNvZGluZyA9IHRydWU7XG4gICAgbGV0IGRhdGEgPSB0aGlzLl9wcmVEZWNvZGU7XG4gICAgbGV0IHNhbXBsZXMgPSBbXTtcbiAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgIGxldCBzYW1wbGUgPSBkYXRhLnNoaWZ0KCk7XG4gICAgd2hpbGUoc2FtcGxlKSB7XG4gICAgICBsZXQgc2FtcGxlRGF0YSA9IEF1ZGlvQ3R4LmdldEFBQ0RhdGEodGhpcy5tZXRhLCBzYW1wbGUpXG4gICAgICBzYW1wbGVzLnB1c2goc2FtcGxlRGF0YSk7XG4gICAgICB0aGlzLl9sYXN0cHRzID0gc2FtcGxlLnB0cztcbiAgICAgIHNhbXBsZSA9IGRhdGEuc2hpZnQoKVxuICAgIH1cbiAgICBsZXQgYnVmZmVyID0gQXVkaW9DdHguY29tYmlsZURhdGEoc2FtcGxlcyk7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuY29udGV4dC5kZWNvZGVBdWRpb0RhdGEoYnVmZmVyLmJ1ZmZlciwgZnVuY3Rpb24oYnVmZmVyKSB7XG4gICAgICAgIGxldCBhdWRpb1NvdXJjZSA9IF90aGlzLmNvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgICAgIGF1ZGlvU291cmNlLmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgICAgYXVkaW9Tb3VyY2Uub25lbmRlZCA9IF90aGlzLm9uU291cmNlRW5kZWQuYmluZChfdGhpcyk7XG4gICAgICAgIF90aGlzLnNhbXBsZXMucHVzaCh7XG4gICAgICAgICAgdGltZTogX3RoaXMuZHVyYXRpb24sXG4gICAgICAgICAgZHVyYXRpb246IGJ1ZmZlci5kdXJhdGlvbixcbiAgICAgICAgICBkYXRhOiBhdWRpb1NvdXJjZVxuICAgICAgICB9KVxuXG4gICAgICAgIF90aGlzLmR1cmF0aW9uICs9IGJ1ZmZlci5kdXJhdGlvbjtcblxuICAgICAgICBpZighX3RoaXMuX2N1cnJlbnRCdWZmZXIpIHtcbiAgICAgICAgICBfdGhpcy5fY3VycmVudEJ1ZmZlciA9IF90aGlzLmdldFRpbWVCdWZmZXIoX3RoaXMuY3VycmVudFRpbWUpO1xuXG4gICAgICAgICAgaWYoX3RoaXMuX3BsYXllZCkge1xuICAgICAgICAgICAgX3RoaXMucGxheSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFfdGhpcy5fbmV4dEJ1ZmZlciAmJiBfdGhpcy5fY3VycmVudEJ1ZmZlcikge1xuICAgICAgICAgIF90aGlzLl9uZXh0QnVmZmVyID0gX3RoaXMuZ2V0VGltZUJ1ZmZlcihfdGhpcy5jdXJyZW50VGltZSArIF90aGlzLl9jdXJyZW50QnVmZmVyLmR1cmF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy5fZGVjb2RpbmcgPSBmYWxzZTtcblxuICAgICAgICBpZigoX3RoaXMuX3ByZURlY29kZS5sZW5ndGggPiAwICYmIF90aGlzLl9wcmVEZWNvZGVbX3RoaXMuX3ByZURlY29kZS5sZW5ndGggLSAxXS5wdHMgLSBfdGhpcy5fbGFzdHB0cykgLyAxMDAwID49IF90aGlzLnByZWxvYWRUaW1lKSB7XG4gICAgICAgICAgX3RoaXMuZGVjb2RlQUFDKCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICB9XG4gIH1cblxuICBvblNvdXJjZUVuZGVkKCkge1xuICAgIGlmICghdGhpcy5fbmV4dEJ1ZmZlciB8fCAhdGhpcy5fcGxheWVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBhdWRpb1NvdXJjZSA9IHRoaXMuX25leHRCdWZmZXIuZGF0YTtcbiAgICBhdWRpb1NvdXJjZS5zdGFydCgpO1xuICAgIGF1ZGlvU291cmNlLmNvbm5lY3QodGhpcy5nYWluTm9kZSk7XG4gICAgdGhpcy5fY3VycmVudEJ1ZmZlciA9IHRoaXMuX25leHRCdWZmZXI7XG4gICAgdGhpcy5fY3VycmVudFRpbWUgPSB0aGlzLl9jdXJyZW50QnVmZmVyLnRpbWU7XG4gICAgdGhpcy5fbmV4dEJ1ZmZlciA9IHRoaXMuZ2V0VGltZUJ1ZmZlcih0aGlzLmN1cnJlbnRUaW1lKTtcbiAgICBpZiAodGhpcy5fY3VycmVudEJ1ZmZlcikge1xuICAgICAgdGhpcy5fbmV4dEJ1ZmZlciA9IHRoaXMuZ2V0VGltZUJ1ZmZlcih0aGlzLmN1cnJlbnRUaW1lICsgdGhpcy5fY3VycmVudEJ1ZmZlci5kdXJhdGlvbik7XG4gICAgfVxuICAgIHRoaXMuZW1pdCgnQVVESU9fU09VUkNFX0VORCcpXG4gIH1cblxuICBwbGF5KCkge1xuICAgIHRoaXMuX3BsYXllZCA9IHRydWU7XG4gICAgaWYoIXRoaXMuX2N1cnJlbnRCdWZmZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGF1ZGlvU291cmNlID0gdGhpcy5fY3VycmVudEJ1ZmZlci5kYXRhO1xuICAgIGF1ZGlvU291cmNlLmNvbm5lY3QodGhpcy5nYWluTm9kZSk7XG4gICAgYXVkaW9Tb3VyY2Uuc3RhcnQoKTtcbiAgfVxuXG4gIGdldFRpbWVCdWZmZXIodGltZSkge1xuICAgIGxldCByZXQ7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuc2FtcGxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHNhbXBsZSA9IHRoaXMuc2FtcGxlc1tpXVxuICAgICAgaWYoc2FtcGxlLnRpbWUgPD0gdGltZSAmJiAoc2FtcGxlLnRpbWUgKyBzYW1wbGUuZHVyYXRpb24pID4gdGltZSkge1xuICAgICAgICByZXQgPSBzYW1wbGU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgc2V0QXVkaW9NZXRhRGF0YShtZXRhKSB7XG4gICAgdGhpcy5tZXRhID0gbWV0YTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRBQUNEYXRhKG1ldGEsIHNhbXBsZSkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgVWludDhBcnJheShzYW1wbGUuZGF0YS5ieXRlTGVuZ3RoICsgNyk7XG4gICAgbGV0IGFkdHMgPSBBdWRpb0N0eC5nZXRBZHRzKG1ldGEsIHNhbXBsZS5kYXRhKTtcbiAgICBidWZmZXIuc2V0KGFkdHMpO1xuICAgIGJ1ZmZlci5zZXQoc2FtcGxlLmRhdGEsIDcpO1xuICAgIHJldHVybiBidWZmZXI7XG4gIH1cblxuICBzdGF0aWMgY29tYmlsZURhdGEoc2FtcGxlcykge1xuICAgIC8vIGdldCBsZW5ndGhcbiAgICBsZXQgbGVuZ3RoID0gMDtcbiAgICBmb3IobGV0IGkgPSAwLGsgPSBzYW1wbGVzLmxlbmd0aDsgaSA8IGs7IGkrKykge1xuICAgICAgbGVuZ3RoICs9IHNhbXBsZXNbaV0uYnl0ZUxlbmd0aDtcbiAgICB9XG5cbiAgICBsZXQgcmV0ID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKTtcbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICAvLyBjb21iaWxlIGRhdGE7XG4gICAgZm9yKGxldCBpID0gMCxrID0gc2FtcGxlcy5sZW5ndGg7IGkgPCBrOyBpKyspIHtcbiAgICAgIHJldC5zZXQoc2FtcGxlc1tpXSwgb2Zmc2V0KTtcbiAgICAgIG9mZnNldCArPSBzYW1wbGVzW2ldLmJ5dGVMZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBzdGF0aWMgZ2V0QWR0cyhtZXRhLCBkYXRhKSB7XG4gICAgbGV0IGFkdHMgPSBuZXcgVWludDhBcnJheSg3KTtcblxuICAgIC8vIOiuvue9ruWQjOatpeS9jSAweGZmZiAxMmJpdFxuICAgIGFkdHNbMF0gPSAweGZmO1xuICAgIGFkdHNbMV0gPSAweGYwO1xuXG4gICAgLy8gT2JqZWN0IGRhdGEgKOayoeS7gOS5iOS6uueUqE1QRUctMuS6hu+8jEhMU+WSjEZMVuS5n+WFqOaYr01QRUctNO+8jOi/memHjOebtOaOpTApICAxYml0XG4gICAgLy8gTGV2ZWwgYWx3YXlzIDAwIDJiaXRcbiAgICAvLyBDUkMgYWx3YXlzIDEgMWJpdFxuICAgIGFkdHNbMV0gPSBhZHRzWzFdIHwgMHgwMTtcblxuICAgIC8vIHByb2ZpbGUgMmJpdFxuICAgIGFkdHNbMl0gPSAweGMwICYgKChtZXRhLm9iamVjdFR5cGUtMSkgPDwgNik7XG5cbiAgICAvL3NhbXBsZUZyZXF1ZW5jeUluZGV4XG4gICAgYWR0c1syXSA9IGFkdHNbMl0gfCAoMHgzYyAmIChtZXRhLnNhbXBsZVJhdGVJbmRleCA8PCAyKSlcblxuICAgIC8vcHJpdmF0ZSBiaXQgMCAxYml0XG4gICAgLy8gY2hhbmVsIGNvbmZpZ3VyYXRpb24gM2JpdFxuICAgIGFkdHNbMl0gPSBhZHRzWzJdIHwgKDB4MDEgJiBtZXRhLmNoYW5uZWxDb3VudCA+PiAyKTtcbiAgICBhZHRzWzNdID0gMHhjMCAmIChtZXRhLmNoYW5uZWxDb3VudCA8PCA2KTtcblxuICAgIC8vIG9yaWdpbmFsX2NvcHk6IDAgMWJpdFxuICAgIC8vIGhvbWU6IDAgMWJpdFxuXG4gICAgLy8gYWR0c192YXJpYWJsZV9oZWFkZXIoKVxuICAgIC8vIGNvcHlyaWdodGVkX2lkX2JpdCAwIDFiaXRcbiAgICAvLyBjb3B5cmlnaHRlZF9pZF9zdGFydCAwIDFiaXRcblxuICAgIC8vIGFhY19mcmFtZV9sZW5ndGggMTNiaXQ7XG4gICAgbGV0IGFhY2ZyYW1lbGVuZ3RoID0gZGF0YS5ieXRlTGVuZ3RoICsgNztcblxuICAgIGFkdHNbM10gPSBhZHRzWzNdIHwgKDB4MDMgJiBhYWNmcmFtZWxlbmd0aCA+PiAxMSk7XG4gICAgYWR0c1s0XSA9IDB4ZmYgJiAoYWFjZnJhbWVsZW5ndGggPj4gMyk7XG4gICAgYWR0c1s1XSA9IDB4ZTAgJiAoYWFjZnJhbWVsZW5ndGggPDwgNSk7XG5cbiAgICAvLyBhZHRzX2J1ZmZlcl9mdWxsbmVzcyAweDdmZiAxMWJpdFxuICAgIGFkdHNbNV0gPSBhZHRzWzVdIHwgMHgxZlxuICAgIGFkdHNbNl0gPSAweGZjO1xuXG4gICAgLy8gbnVtYmVyX29mX3Jhd19kYXRhX2Jsb2Nrc19pbl9mcmFtZSAwIDJiaXQ7XG4gICAgcmV0dXJuIGFkdHM7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXVkaW9DdHg7XG4iLCJpbXBvcnQgVmlkZW9DdHggZnJvbSAnLi92aWRlby1jb250ZXh0JztcbmltcG9ydCBBdWRpb0N0eCBmcm9tICcuL2F1ZGlvLWNvbnRleHQnO1xuaW1wb3J0IHsgZ2V0VGlja2VyIH0gZnJvbSAnLi90aWNrZXInO1xuXG4vKipcbiAqIOmfs+eUu+WQjOatpeiwg+WSjOWZqFxuICovXG5jbGFzcyBBVlJlY29uY2lsZXIge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICB0aGlzLmFDdHggPSBwcm9wcy5hQ3R4O1xuICAgIHRoaXMudkN0eCA9IHByb3BzLnZDdHg7XG5cbiAgICB0aGlzLnRpbWVvdXRJZCA9IG51bGxcbiAgICB0aGlzLnN0YXJ0ID0gbnVsbFxuICB9XG5cbiAgZG9SZWNvbmNpbGUgKCkge1xuICAgIGNvbnN0IHZDdXJUaW1lID0gdGhpcy52Q3R4LmN1cnJlbnRUaW1lIHx8IDA7XG4gICAgY29uc3QgYUN1clRpbWUgPSAodGhpcy5hQ3R4LmN1cnJlbnRUaW1lIHx8IDApICogMTAwMDtcblxuICAgIGNvbnN0IGdhcCA9IHZDdXJUaW1lIC0gYUN1clRpbWU7XG4gICAgaWYgKHRoaXMudGltZW91dElkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChnYXAgPiAyMDApIHsgLy8gYXVkaW8gZGVsYXllZCBmb3IgbW9yZSB0aGFuIDEwMG1zXG4gICAgICB0aGlzLnN0YXJ0ICs9IGdhcFxuICAgICAgdGhpcy52Q3R4LnBhdXNlKClcbiAgICAgIHRoaXMudGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMudkN0eC5wbGF5KClcbiAgICAgICAgdGhpcy50aW1lb3V0SWQgPSBudWxsXG4gICAgICB9LCBnYXApXG4gICAgfSBlbHNlIGlmIChnYXAgPCAtMTIwKSB7XG4gICAgICB0aGlzLnZDdHguY3VycmVudFRpbWUgPSB0aGlzLnZDdHguY3VycmVudFRpbWUgKyBNYXRoLmFicyhnYXApO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuYUN0eCA9IG51bGxcbiAgICB0aGlzLnZDdHggPSBudWxsXG4gIH1cbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5jbGFzcyBNb2JpbGVWaWRlbyBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZykge1xuICAgIHN1cGVyKCk7XG4gICAgbGV0IF90aGlzID0gdGhpcztcbiAgICB0aGlzLnZDdHggPSBuZXcgVmlkZW9DdHgoKTtcbiAgICB0aGlzLmFDdHggPSBuZXcgQXVkaW9DdHgoY29uZmlnKTtcbiAgICB0aGlzLnRpY2tlciA9IG5ldyAoZ2V0VGlja2VyKCkpKClcbiAgICB0aGlzLmhpc3RvcnlUaW1lID0gMDtcbiAgICB0aGlzLnJlY29uY2lsZXIgPSBuZXcgQVZSZWNvbmNpbGVyKHtcbiAgICAgIHZDdHg6IHRoaXMudkN0eCxcbiAgICAgIGFDdHg6IHRoaXMuYUN0eFxuICAgIH0pXG4gICAgdGhpcy5oYW5kbGVBdWRpb1NvdXJjZUVuZCA9IHRoaXMuaGFuZGxlQXVkaW9Tb3VyY2VFbmQuYmluZCh0aGlzKVxuICAgIHRoaXMuaW5pdCgpXG4gIH1cblxuICBpbml0ICgpIHtcbiAgICB0aGlzLnZDdHgub25jYW5wbGF5ID0gKCkgPT4ge1xuICAgICAgdGhpcy5hcHBlbmRDaGlsZCh0aGlzLnZDdHguY2FudmFzKTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2FucGxheScpKTtcbiAgICB9XG5cbiAgICB0aGlzLnRpY2tlci5zdGFydCgoKSA9PiB7XG4gICAgICAvL1xuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5hQ3R4LmN1cnJlbnRUaW1lKVxuICAgICAgaWYgKCF0aGlzLnN0YXJ0KSB7XG4gICAgICAgIHRoaXMuc3RhcnQgPSBEYXRlLm5vdygpXG4gICAgICB9XG4gICAgICB0aGlzLnZDdHguX29uVGltZXIoRGF0ZS5ub3coKSAtIHRoaXMuc3RhcnQpXG4gICAgfSlcblxuICAgIHRoaXMuYUN0eC5vbignQVVESU9fU09VUkNFX0VORCcsIHRoaXMuaGFuZGxlQXVkaW9Tb3VyY2VFbmQpXG4gIH1cblxuICBoYW5kbGVBdWRpb1NvdXJjZUVuZCAoKSB7XG4gICAgdGhpcy5yZWNvbmNpbGVyLmRvUmVjb25jaWxlKClcbiAgfVxuXG4gIF9jbGVhbkJ1ZmZlciAoKSB7XG4gICAgdGhpcy52Q3R4LmNsZWFuQnVmZmVyKClcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMucmVjb25jaWxlci5kZXN0cm95KClcbiAgfVxuXG4gIG9uRGVtdXhDb21wbGV0ZSAodmlkZW9UcmFjaywgYXVkaW9UcmFjaykge1xuICAgIHRoaXMuYUN0eC5kZWNvZGVBdWRpbyhhdWRpb1RyYWNrKTtcbiAgICB0aGlzLnZDdHguZGVjb2RlVmlkZW8odmlkZW9UcmFjayk7XG4gIH1cblxuICBzZXRBdWRpb01ldGEgKG1ldGEpIHtcbiAgICB0aGlzLmFDdHguc2V0QXVkaW9NZXRhRGF0YShtZXRhKTtcbiAgfVxuXG4gIHNldFZpZGVvTWV0YSAobWV0YSkge1xuICAgIHRoaXMudkN0eC5zZXRWaWRlb01ldGFEYXRhKG1ldGEpO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRUaW1lICgpIHtcblxuICB9XG5cbiAgcGxheSAoKSB7XG4gICAgLy8gaWYgKCF0aGlzLnZDdHguKVxuICAgIHRoaXMudkN0eC5wbGF5KCk7XG4gICAgdGhpcy5hQ3R4LnBsYXkoKTtcbiAgfVxufVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21vYmlsZS12aWRlbycsIE1vYmlsZVZpZGVvKTtcbiIsImNsYXNzIFNvdXJjZUJ1ZmZlciB7XG4gIGNvbnN0cnVjdG9yIChjb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZyk7XG4gICAgdGhpcy50eXBlID0gdGhpcy5jb25maWcudHlwZTtcbiAgICB0aGlzLmJ1ZmZlciA9IFtdO1xuICAgIHRoaXMuY3VycmVudEdvcCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9sYXN0R2V0ID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHVzaCAoZnJhbWUpIHtcbiAgICBpZiAodGhpcy50eXBlID09PSAndmlkZW8nKSB7XG4gICAgICBpZiAoZnJhbWUuaXNLZXlmcmFtZSkge1xuICAgICAgICBsZXQgY3VycmVudEdvcCA9IHtcbiAgICAgICAgICBzYW1wbGVzOiBbXSxcbiAgICAgICAgICBzdGFydDogZnJhbWUuZHRzLFxuICAgICAgICAgIGVuZDogZnJhbWUuZHRzLFxuICAgICAgICAgIG5leHRHb3A6IHVuZGVmaW5lZFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50R29wKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50R29wLm5leHRHb3AgPSBjdXJyZW50R29wO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudEdvcCA9IGN1cnJlbnRHb3A7XG4gICAgICAgIHRoaXMuYnVmZmVyLnB1c2godGhpcy5jdXJyZW50R29wKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY3VycmVudEdvcCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRHb3Auc2FtcGxlcy5wdXNoKGZyYW1lKTtcblxuICAgICAgICBpZiAoZnJhbWUuZHRzIDwgdGhpcy5jdXJyZW50R29wLnN0YXJ0KSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50R29wLnN0YXJ0ID0gZnJhbWUuZHRzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZyYW1lLmR0cyA+IHRoaXMuY3VycmVudEdvcC5lbmQpIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRHb3AuZW5kID0gZnJhbWUuZHRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0ICh0aW1lKSB7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgaWYgKHRoaXMuYnVmZmVyLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGltZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxldCBzYW1wbGUgPSB0aGlzLl9nZXROZXh0KCk7XG4gICAgICAgIHJldHVybiBzYW1wbGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2dldE5leHQgKCkge1xuICAgIGlmICghdGhpcy5fbGFzdEdldCkge1xuICAgICAgbGV0IGdvcCA9IHRoaXMuYnVmZmVyWzBdO1xuICAgICAgaWYgKGdvcC5zYW1wbGVzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2xhc3RHZXQgPSB7XG4gICAgICAgIGdvcCxcbiAgICAgICAgaW5kZXg6IDBcbiAgICAgIH1cbiAgICAgIHJldHVybiBnb3Auc2FtcGxlc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGdvcCA9IHRoaXMuX2xhc3RHZXQuZ29wO1xuICAgICAgbGV0IHNhbXBsZSA9IGdvcC5zYW1wbGVzW3RoaXMuX2xhc3RHZXQuaW5kZXggKyAxXTtcbiAgICAgIGlmIChzYW1wbGUpIHtcbiAgICAgICAgdGhpcy5fbGFzdEdldC5pbmRleCA9IHRoaXMuX2xhc3RHZXQuaW5kZXggKyAxO1xuICAgICAgICByZXR1cm4gc2FtcGxlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ29wID0gZ29wLm5leHRHb3A7XG4gICAgICAgIGlmICghZ29wIHx8IGdvcC5zYW1wbGVzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2FtcGxlID0gZ29wLnNhbXBsZXNbMF07XG4gICAgICAgIHRoaXMuX2xhc3RHZXQgPSB7XG4gICAgICAgICAgZ29wLFxuICAgICAgICAgIGluZGV4OiAwXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNhbXBsZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW1vdmUgKHN0YXJ0LCBlbmQpIHtcbiAgICBpZiAodGhpcy5idWZmZXIubGVuZ3RoIDwgMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBpID0gMDtcbiAgICBsZXQgZ29wID0gdGhpcy5idWZmZXJbMF07XG4gICAgd2hpbGUgKGdvcCkge1xuICAgICAgaWYgKGdvcC5lbmQgPCBlbmQgJiYgZ29wLnN0YXJ0ID49IHN0YXJ0KSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmJ1ZmZlcltpXTtcbiAgICAgICAgZ29wID0gdGhpcy5idWZmZXJbaV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpICs9IDE7XG4gICAgICAgIGdvcCA9IHRoaXMuYnVmZmVyW2ldO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTb3VyY2VCdWZmZXI7XG4iLCIvKipcbiAqIEBhdXRob3IgZnV5dWhhb0BieXRlZGFuY2UuY29tXG4gKi9cblxuY2xhc3MgVGlja2VyIHtcbiAgY29uc3RydWN0b3IgKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zIHx8IHt9LCB7XG4gICAgICBpbnRlcnZhbDogMTZcbiAgICB9KVxuXG4gICAgdGhpcy5jYWxsYmFja3MgPSBbXVxuICB9XG5cbiAgc3RhcnQoLi4uY2FsbGJhY2tzKSB7XG4gICAgdGhpcy5jYWxsYmFja3MgPSBjYWxsYmFja3NcbiAgfVxuXG4gIG9uVGljayAoKSB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb25zdCBjYWxsYmFjayA9IHRoaXMuY2FsbGJhY2tzW2ldXG4gICAgICBjYWxsYmFjaygpXG4gICAgfVxuICB9XG5cbiAgc2V0SW50ZXJ2YWwgKGludGVydmFsKSB7XG4gICAgdGhpcy5vcHRpb25zLmludGVydmFsID0gaW50ZXJ2YWxcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG4vKipcbiAqIHRpY2tlciB1c2UgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gKi9cbmNsYXNzIFJhZlRpY2tlciBleHRlbmRzIFRpY2tlciB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnByZXYgPSBudWxsO1xuICAgIHRoaXMudGltZXJJZCA9IG51bGxcbiAgICB0aGlzLl9zdWJUaW1lcklkID0gbnVsbFxuXG4gICAgdGhpcy5fdGlja0Z1bmMgPSBSYWZUaWNrZXIuZ2V0VGlja0Z1bmMoKVxuICAgIHRoaXMudGljayA9IHRoaXMudGljay5iaW5kKHRoaXMpXG4gIH1cblxuICBzdGFydCAoLi4uY2FsbGJhY2tzKSB7XG4gICAgc3VwZXIuc3RhcnQoLi4uY2FsbGJhY2tzKVxuICAgIHRoaXMudGljaygpXG4gIH1cblxuICB0aWNrICh0aW1lc3RhbXApIHtcbiAgICB0aGlzLm5leHRUaWNrKCk7XG4gICAgdGhpcy5vblRpY2soKVxuICB9XG5cbiAgbmV4dFRpY2sgKCkge1xuICAgIGNvbnN0IHsgX3RpY2tGdW5jIH0gPSB0aGlzO1xuICAgIHRoaXMudGltZXJJZCA9IF90aWNrRnVuYyh0aGlzLnRpY2spXG4gIH1cblxuICBzdG9wICgpIHtcbiAgICBpZiAodGhpcy50aW1lcklkKSB7XG4gICAgICBjb25zdCBjYW5jZWxGdW5jID0gUmFmVGlja2VyLmdldENhbmNlbEZ1bmMoKVxuXG4gICAgICBjYW5jZWxGdW5jKHRoaXMudGltZXJJZClcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0VGlja0Z1bmMgKCkge1xuICAgIHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgfVxuXG4gIHN0YXRpYyBnZXRDYW5jZWxGdW5jICgpIHtcbiAgICByZXR1cm4gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZVxuICB9XG5cbiAgc3RhdGljIGlzU3VwcG9ydGVkICgpIHtcbiAgICByZXR1cm4gUmFmVGlja2VyLmdldFRpY2tGdW5jKCkgIT09IHVuZGVmaW5lZFxuICB9XG59XG5cbi8qKlxuICogdXNlIHNldFRpbWVvdXQgZm9yIGJyb3dzZXJzIHdpdGhvdXQgcmFmIHN1cHBvcnRcbiAqL1xuY2xhc3MgVGltZW91dFRpY2tlciBleHRlbmRzIFRpY2tlciB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKGNvbmZpZylcbiAgICB0aGlzLnRpbWVvdXRJZCA9IG51bGxcblxuICB9XG5cbiAgc3RhcnQgKC4uLmNhbGxiYWNrcykge1xuICAgIHN1cGVyLm5leHRUaWNrKC4uLmNhbGxiYWNrcylcbiAgICB0aGlzLnRpbWVvdXRJZCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICB0aGlzLm9uVGljaygpO1xuICAgIH0sIHRoaXMub3B0aW9ucy5pbnRlcnZhbCB8fCAxNilcbiAgfVxuXG4gIHN0b3AgKCkge1xuICAgIGlmICh0aGlzLnRpbWVvdXRJZCkge1xuICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy50aW1lb3V0SWQpXG4gICAgfVxuICB9XG5cbn1cblxuLyoqXG4gKiDov5Tlm55UaWNrZXLmnoTpgKDlh73mlbBcbiAqIEByZXR1cm5zIHtUaWNrZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRUaWNrZXIgPSAoKSA9PiB7XG4gIGlmIChSYWZUaWNrZXIuaXNTdXBwb3J0ZWQoKSkge1xuICAgIHJldHVybiBSYWZUaWNrZXJcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gVGltZW91dFRpY2tlclxuICB9XG59XG4iLCJpbXBvcnQgV29ya2VyaWZ5IGZyb20gJ3dlYndvcmtpZnktd2VicGFjaydcbmltcG9ydCBTdHJlYW0gZnJvbSAnLi4vd3JpdGUvc3RyZWFtJztcbmltcG9ydCBOYWx1bml0IGZyb20gJy4uLy4uLy4uL3hncGxheWVyLWNvZGVjL3NyYy9oMjY0L25hbHVuaXQnO1xuaW1wb3J0IFlVVkNhbnZhcyBmcm9tICcuL3l1di1jYW52YXMnO1xuaW1wb3J0IFNvdXJjZUJ1ZmZlciBmcm9tICcuL3NvdXJjZWJ1ZmZlcic7XG5jbGFzcyBWaWRlb0NhbnZhcyB7XG4gIGNvbnN0cnVjdG9yIChjb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZyk7XG4gICAgdGhpcy5jYW52YXMgPSB0aGlzLmNvbmZpZy5jYW52YXMgPyB0aGlzLmNvbmZpZy5jYW52YXMgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICB0aGlzLnNvdXJjZSA9IG5ldyBTb3VyY2VCdWZmZXIoe3R5cGU6ICd2aWRlbyd9KTtcbiAgICB0aGlzLnByZWxvYWRUaW1lID0gdGhpcy5jb25maWcucHJlbG9hZFRpbWUgfHwgMztcbiAgICB0aGlzLm9uY2FucGxheSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm9uRmlyc3RGcmFtZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm1ldGEgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5yZWFkeVN0YXR1cyA9IDA7XG4gICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgIHRoaXMuY291bnQgPSAwO1xuICAgIHRoaXMuY3VycmVudFRpbWUgPSAwO1xuICAgIHRoaXMubGFzdFBsYXllZCA9IDA7XG5cbiAgICB0aGlzLl9kZWNvZGVySW5pdGVkID0gZmFsc2U7XG4gICAgdGhpcy5fYXZjY3B1c2hlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2RlY29kZWRGcmFtZXMgPSB7fTtcbiAgICB0aGlzLl9sYXN0U2FtcGxlRHRzID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2Jhc2VEdHMgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fbGFzdFJlbmRlclRpbWUgPSBudWxsXG4gICAgdGhpcy5pbml0V2FzbVdvcmtlcigpO1xuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICB9XG5cbiAgaW5pdFdhc21Xb3JrZXIgKCkge1xuICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy53YXNtd29ya2VyID0gV29ya2VyaWZ5KHJlcXVpcmUucmVzb2x2ZSgnLi93b3JrZXIuanMnKSk7XG4gICAgdGhpcy53YXNtd29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgIG1zZzogJ2luaXQnXG4gICAgfSlcbiAgICB0aGlzLndhc213b3JrZXIuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIG1zZyA9PiB7XG4gICAgICBzd2l0Y2ggKG1zZy5kYXRhLm1zZykge1xuICAgICAgICBjYXNlICdERUNPREVSX1JFQURZJzpcbiAgICAgICAgICBfdGhpcy5fZGVjb2RlckluaXRlZCA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0RFQ09ERUQnOlxuICAgICAgICAgIHRoaXMuX29uRGVjb2RlZChtc2cuZGF0YSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzZXRWaWRlb01ldGFEYXRhIChtZXRhKSB7XG4gICAgdGhpcy5tZXRhID0gbWV0YTtcbiAgICBpZiAoIXRoaXMuX2RlY29kZXJJbml0ZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLl9hdmNjcHVzaGVkID0gdHJ1ZTtcbiAgICBsZXQgZGF0YSA9IG5ldyBVaW50OEFycmF5KG1ldGEuc3BzLmJ5dGVMZW5ndGggKyA0KTtcbiAgICBkYXRhLnNldChbMCwgMCwgMCwgMV0pXG4gICAgZGF0YS5zZXQobWV0YS5zcHMsIDQpO1xuICAgIHRoaXMud2FzbXdvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICBtc2c6ICdkZWNvZGUnLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pXG5cbiAgICBkYXRhID0gbmV3IFVpbnQ4QXJyYXkobWV0YS5wcHMuYnl0ZUxlbmd0aCArIDQpO1xuICAgIGRhdGEuc2V0KFswLCAwLCAwLCAxXSlcbiAgICBkYXRhLnNldChtZXRhLnBwcywgNCk7XG4gICAgdGhpcy53YXNtd29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgIG1zZzogJ2RlY29kZScsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSlcblxuICAgIGlmICghdGhpcy55dXZDYW52YXMpIHtcbiAgICAgIGxldCBjb25maWcgPSBPYmplY3QuYXNzaWduKHttZXRhLCBjYW52YXM6IHRoaXMuY2FudmFzfSwgdGhpcy5jb25maWcpO1xuICAgICAgdGhpcy55dXZDYW52YXMgPSBuZXcgWVVWQ2FudmFzKGNvbmZpZyk7XG4gICAgfVxuICAgIHRoaXMucmVhZHlTdGF0dXMgPSAxO1xuICB9XG5cbiAgZGVjb2RlVmlkZW8gKHZpZGVvVHJhY2spIHtcbiAgICBpZiAoIXRoaXMuX2RlY29kZXJJbml0ZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICghdGhpcy5fYXZjY3B1c2hlZCkge1xuICAgICAgdGhpcy5zZXRWaWRlb01ldGFEYXRhKHRoaXMubWV0YSk7XG4gICAgfVxuICAgIGxldCB7IHNhbXBsZXMgfSA9IHZpZGVvVHJhY2s7XG4gICAgbGV0IHNhbXBsZSA9IHNhbXBsZXMuc2hpZnQoKTtcblxuICAgIHdoaWxlIChzYW1wbGUpIHtcbiAgICAgIGlmICghdGhpcy5fYmFzZUR0cykge1xuICAgICAgICB0aGlzLl9iYXNlRHRzID0gc2FtcGxlLmR0cztcbiAgICAgIH1cbiAgICAgIHRoaXMuc291cmNlLnB1c2goc2FtcGxlKTtcbiAgICAgIHNhbXBsZSA9IHNhbXBsZXMuc2hpZnQoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9wcmVsb2FkKCk7XG4gIH1cblxuICBfcHJlbG9hZCAoKSB7XG4gICAgaWYgKCF0aGlzLl9sYXN0U2FtcGxlRHRzIHx8IHRoaXMuX2xhc3RTYW1wbGVEdHMgLSB0aGlzLl9iYXNlRHRzIDwgdGhpcy5jdXJyZW50VGltZSArIHRoaXMucHJlbG9hZFRpbWUgKiAxMDAwKSB7XG4gICAgICBsZXQgc2FtcGxlID0gdGhpcy5zb3VyY2UuZ2V0KCk7XG4gICAgICBpZiAoc2FtcGxlKSB7XG4gICAgICAgIHRoaXMuX2xhc3RTYW1wbGVEdHMgPSBzYW1wbGUuZHRzO1xuICAgICAgICB0aGlzLl9hbmFseXNlTmFsKHNhbXBsZSk7XG4gICAgICB9XG5cbiAgICAgIHdoaWxlIChzYW1wbGUgJiYgdGhpcy5fbGFzdFNhbXBsZUR0cyAtIHRoaXMuX2Jhc2VEdHMgPCB0aGlzLmN1cnJlbnRUaW1lICsgdGhpcy5wcmVsb2FkVGltZSAqIDEwMDApIHtcbiAgICAgICAgc2FtcGxlID0gdGhpcy5zb3VyY2UuZ2V0KCk7XG4gICAgICAgIGlmIChzYW1wbGUpIHtcbiAgICAgICAgICB0aGlzLl9hbmFseXNlTmFsKHNhbXBsZSk7XG4gICAgICAgICAgdGhpcy5fbGFzdFNhbXBsZUR0cyA9IHNhbXBsZS5kdHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfYW5hbHlzZU5hbCAoc2FtcGxlKSB7XG4gICAgbGV0IG5hbHMgPSBOYWx1bml0LmdldEF2Y2NOYWxzKG5ldyBTdHJlYW0oc2FtcGxlLmRhdGEuYnVmZmVyKSk7XG5cbiAgICBsZXQgbGVuZ3RoID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBuYWwgPSBuYWxzW2ldO1xuICAgICAgbGVuZ3RoICs9IG5hbC5ib2R5LmJ5dGVMZW5ndGggKyA0O1xuICAgIH1cbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICBsZXQgZGF0YSA9IG5ldyBVaW50OEFycmF5KGxlbmd0aCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgbmFsID0gbmFsc1tpXTtcbiAgICAgIGRhdGEuc2V0KFswLCAwLCAwLCAxXSwgb2Zmc2V0KTtcbiAgICAgIG9mZnNldCArPSA0O1xuICAgICAgZGF0YS5zZXQobmV3IFVpbnQ4QXJyYXkobmFsLmJvZHkpLCBvZmZzZXQpO1xuICAgICAgb2Zmc2V0ICs9IG5hbC5ib2R5LmJ5dGVMZW5ndGg7XG4gICAgfVxuICAgIHRoaXMud2FzbXdvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICBtc2c6ICdkZWNvZGUnLFxuICAgICAgZGF0YTogZGF0YSxcbiAgICAgIGluZm86IHtcbiAgICAgICAgZHRzOiBzYW1wbGUuZHRzLFxuICAgICAgICBwdHM6IHNhbXBsZS5wdHMgPyBzYW1wbGUucHRzIDogc2FtcGxlLmR0cyArIHNhbXBsZS5jdHMsXG4gICAgICAgIGtleTogc2FtcGxlLmlzS2V5ZnJhbWVcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgX29uRGVjb2RlZCAoZGF0YSkge1xuICAgIGxldCB7ZHRzfSA9IGRhdGEuaW5mb1xuICAgIHRoaXMuX2RlY29kZWRGcmFtZXNbZHRzXSA9IGRhdGE7XG4gIH1cblxuICBwbGF5ICgpIHtcbiAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICAgIHRoaXMuX29uVGltZXIoKTtcbiAgfVxuXG4gIF9vblRpbWVyIChjdXJyZW50VGltZSkge1xuICAgIGlmICh0aGlzLnBhdXNlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5tZXRhKSB7XG4gICAgICBpZiAodGhpcy5tZXRhLmZyYW1lUmF0ZSAmJiB0aGlzLm1ldGEuZnJhbWVSYXRlLmZpeGVkICYmIHRoaXMubWV0YS5mcmFtZVJhdGUuZnBzKSB7XG4gICAgICB9XG4gICAgICBsZXQgZnJhbWVUaW1lcyA9IE9iamVjdC5rZXlzKHRoaXMuX2RlY29kZWRGcmFtZXMpO1xuICAgICAgaWYgKGZyYW1lVGltZXMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRUaW1lID0gY3VycmVudFRpbWU7XG4gICAgICAgIGxldCBmcmFtZVRpbWUgPSAtMTtcbiAgICAgICAgbGV0IGN1cnJlbnRJZHggPSAwXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnJhbWVUaW1lcy5sZW5ndGggJiYgTnVtYmVyLnBhcnNlSW50KGZyYW1lVGltZXNbaV0pIC0gdGhpcy5fYmFzZUR0cyA8PSB0aGlzLmN1cnJlbnRUaW1lOyBpKyspIHtcbiAgICAgICAgICBmcmFtZVRpbWUgPSBOdW1iZXIucGFyc2VJbnQoZnJhbWVUaW1lc1tpIC0gMV0pO1xuICAgICAgICAgIGN1cnJlbnRJZHggPSBpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZyYW1lID0gdGhpcy5fZGVjb2RlZEZyYW1lc1tmcmFtZVRpbWVdO1xuICAgICAgICBpZiAoZnJhbWUpIHtcbiAgICAgICAgICBpZiAodGhpcy5vbmNhbnBsYXkgJiYgdGhpcy5yZWFkeVN0YXR1cyA8IDQpIHtcbiAgICAgICAgICAgIHRoaXMub25jYW5wbGF5KCk7XG4gICAgICAgICAgICB0aGlzLnJlYWR5U3RhdHVzID0gNDtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc29sZS5sb2coZnJhbWVUaW1lKVxuICAgICAgICAgIHRoaXMueXV2Q2FudmFzLnJlbmRlcihmcmFtZS5idWZmZXIsIGZyYW1lLndpZHRoLCBmcmFtZS5oZWlnaHQpO1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3VycmVudElkeDsgaSsrKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fZGVjb2RlZEZyYW1lc1tpXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fbGFzdFJlbmRlclRpbWUgPSBEYXRlLm5vdygpXG4gIH1cblxuICBjbGVhbkJ1ZmZlciAoKSB7XG4gICAgdGhpcy5zb3VyY2UucmVtb3ZlKDAsIHRoaXMuY3VycmVudFRpbWUpO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBWaWRlb0NhbnZhcztcbiIsImNvbnN0IE1BWF9TVFJFQU1fQlVGRkVSX0xFTkdUSCA9IDEwMjQgKiAxMDI0O1xudmFyIERlY29kZXIgPSBmdW5jdGlvbiAoc2VsZikge1xuICB0aGlzLmluaXRlZCA9IGZhbHNlO1xuICB0aGlzLnNlbGYgPSBzZWxmO1xuICB0aGlzLmluZm9saXN0ID0ge307XG4gIHNlbGYucGFyX2Jyb2Fkd2F5T25Ccm9hZHdheUluaXRlZCA9IHRoaXMuYnJvYWR3YXlPbkJyb2Fkd2F5SW5pdGVkLmJpbmQodGhpcyk7XG4gIHNlbGYucGFyX2Jyb2Fkd2F5T25QaWN0dXJlRGVjb2RlZCA9IHRoaXMuYnJvYWR3YXlPblBpY3R1cmVEZWNvZGVkLmJpbmQodGhpcyk7XG59XG5cbkRlY29kZXIucHJvdG90eXBlLnRvVThBcnJheSA9IGZ1bmN0aW9uIChwdHIsIGxlbmd0aCkge1xuICByZXR1cm4gdGhpcy5zZWxmLkhFQVBVOC5zdWJhcnJheShwdHIsIHB0ciArIGxlbmd0aCk7XG59XG5cbkRlY29kZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIE1vZHVsZS5fYnJvYWR3YXlJbml0KCk7XG4gIHRoaXMuc3RyZWFtQnVmZmVyID0gdGhpcy50b1U4QXJyYXkoTW9kdWxlLl9icm9hZHdheUNyZWF0ZVN0cmVhbShNQVhfU1RSRUFNX0JVRkZFUl9MRU5HVEgpLCBNQVhfU1RSRUFNX0JVRkZFUl9MRU5HVEgpO1xufVxuXG5EZWNvZGVyLnByb3RvdHlwZS5icm9hZHdheU9uUGljdHVyZURlY29kZWQgPSBmdW5jdGlvbiAob2Zmc2V0LCB3aWR0aCwgaGVpZ2h0LCBpbmZvaWQpIHtcbiAgbGV0IGluZm8gPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmluZm9saXN0W2luZm9pZF0pO1xuICBsZXQgZGF0YSA9IHRoaXMudG9VOEFycmF5KG9mZnNldCwgKHdpZHRoICogaGVpZ2h0ICogMykgLyAyKTtcbiAgdGhpcy5pbmZvbGlzdFtpbmZvaWRdID0gbnVsbDtcbiAgbGV0IGRhdGV0ZW1wID0gbmV3IFVpbnQ4QXJyYXkoZGF0YS5sZW5ndGgpO1xuICBkYXRldGVtcC5zZXQoZGF0YSk7XG4gIGxldCBidWZmZXIgPSBkYXRldGVtcC5idWZmZXI7XG4gIHRoaXMuc2VsZi5wb3N0TWVzc2FnZSh7XG4gICAgbXNnOiAnREVDT0RFRCcsXG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIGluZm8sXG4gICAgYnVmZmVyXG4gIH0sIFtidWZmZXJdKTtcbn1cblxuRGVjb2Rlci5wcm90b3R5cGUuYnJvYWR3YXlPbkJyb2Fkd2F5SW5pdGVkID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmluaXRlZCA9IHRydWU7XG4gIHRoaXMuc2VsZi5wb3N0TWVzc2FnZSh7bXNnOiAnREVDT0RFUl9SRUFEWSd9KTtcbn1cblxuRGVjb2Rlci5wcm90b3R5cGUuZGVjb2RlID0gZnVuY3Rpb24gKGRhdGEsIGluZm8pIHtcbiAgbGV0IHRpbWUgPSBwYXJzZUludChuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG4gIGxldCBpbmZvaWQgPSB0aW1lIC0gKE1hdGguZmxvb3IodGltZSAvIDEwZTgpICogMTBlOCk7XG4gIHRoaXMuaW5mb2xpc3RbaW5mb2lkXSA9IGluZm87XG4gIHRoaXMuc3RyZWFtQnVmZmVyLnNldChkYXRhKTtcbiAgTW9kdWxlLl9icm9hZHdheVBsYXlTdHJlYW0oZGF0YS5sZW5ndGgsIGluZm9pZCk7XG59XG5cbnZhciBkZWNvZGVyO1xuXG5mdW5jdGlvbiBvblBvc3RSdW4gKCkge1xuICBkZWNvZGVyID0gbmV3IERlY29kZXIodGhpcyk7XG4gIGRlY29kZXIuaW5pdCgpO1xufVxuXG5mdW5jdGlvbiBpbml0ICgpIHtcbiAgc2VsZi5pbXBvcnRTY3JpcHRzKCdodHRwOi8vMTAuOTUuNDUuMjAyOjkwOTAvZXhhbXBsZXMvZmx2L2RlY29kZXIuanMnKTtcbiAgYWRkT25Qb3N0UnVuKG9uUG9zdFJ1bi5iaW5kKHNlbGYpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2VsZikge1xuICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBkYXRhID0gZS5kYXRhO1xuICAgIGlmICghZGF0YS5tc2cpIHtcbiAgICAgIHNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBtc2c6ICdFUlJPUjppbnZhbGlkIG1lc3NhZ2UnXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKGRhdGEubXNnKSB7XG4gICAgICAgIGNhc2UgJ2luaXQnOlxuICAgICAgICAgIGluaXQoc2VsZilcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZGVjb2RlJzpcbiAgICAgICAgICBkZWNvZGVyLmRlY29kZShkYXRhLmRhdGEsIGRhdGEuaW5mbyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9LCBmYWxzZSk7XG59XG4iLCJjbGFzcyBZVVZDYW52YXMge1xuICBjb25zdHJ1Y3RvciAoY29uZmlncykge1xuICAgIHRoaXMuY29uZmlncyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZ3MpO1xuICAgIHRoaXMuY2FudmFzID0gdGhpcy5jb25maWdzLmNhbnZhcztcbiAgICB0aGlzLm1ldGEgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmNvbmZpZ3MubWV0YSk7XG4gICAgdGhpcy5jaHJvbWEgPSB0aGlzLm1ldGEuY2hyb21hRm9ybWF0O1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5tZXRhLnByZXNlbnRIZWlnaHQ7XG4gICAgdGhpcy53aWR0aCA9IHRoaXMubWV0YS5wcmVzZW50V2lkdGg7XG4gICAgdGhpcy5jYW52YXMud2lkdGggPSB0aGlzLndpZHRoO1xuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgIHRoaXMuY2FudmFzLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIHRoaXMuY2FudmFzLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICB0aGlzLl9pbml0Q29udGV4dEdMKCk7XG4gICAgaWYgKHRoaXMuY29udGV4dEdMKSB7XG4gICAgICB0aGlzLl9pbml0UHJvZ3JhbSgpO1xuICAgICAgdGhpcy5faW5pdEJ1ZmZlcnMoKTtcbiAgICAgIHRoaXMuX2luaXRUZXh0dXJlcygpO1xuICAgIH07XG4gIH1cblxuICBfaW5pdENvbnRleHRHTCAoKSB7XG4gICAgdmFyIGNhbnZhcyA9IHRoaXMuY2FudmFzO1xuICAgIHZhciBnbCA9IG51bGw7XG5cbiAgICB2YXIgdmFsaWRDb250ZXh0TmFtZXMgPSBbJ3dlYmdsJywgJ2V4cGVyaW1lbnRhbC13ZWJnbCcsICdtb3otd2ViZ2wnLCAnd2Via2l0LTNkJ107XG4gICAgdmFyIG5hbWVJbmRleCA9IDA7XG5cbiAgICB3aGlsZSAoIWdsICYmIG5hbWVJbmRleCA8IHZhbGlkQ29udGV4dE5hbWVzLmxlbmd0aCkge1xuICAgICAgdmFyIGNvbnRleHROYW1lID0gdmFsaWRDb250ZXh0TmFtZXNbbmFtZUluZGV4XTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dE9wdGlvbnMpIHtcbiAgICAgICAgICBnbCA9IGNhbnZhcy5nZXRDb250ZXh0KGNvbnRleHROYW1lLCB0aGlzLmNvbnRleHRPcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBnbCA9IGNhbnZhcy5nZXRDb250ZXh0KGNvbnRleHROYW1lKTtcbiAgICAgICAgfTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZ2wgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWdsIHx8IHR5cGVvZiBnbC5nZXRQYXJhbWV0ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZ2wgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICArK25hbWVJbmRleDtcbiAgICB9O1xuXG4gICAgdGhpcy5jb250ZXh0R0wgPSBnbDtcbiAgfTtcblxuICBfaW5pdFByb2dyYW0gKCkge1xuICAgIHZhciBnbCA9IHRoaXMuY29udGV4dEdMO1xuXG4gICAgLy8gdmVydGV4IHNoYWRlciBpcyB0aGUgc2FtZSBmb3IgYWxsIHR5cGVzXG4gICAgdmFyIHZlcnRleFNoYWRlclNjcmlwdDtcbiAgICB2YXIgZnJhZ21lbnRTaGFkZXJTY3JpcHQ7XG4gICAgaWYgKHRoaXMuY2hyb21hID09PSA0MjApIHtcbiAgICAgIHZlcnRleFNoYWRlclNjcmlwdCA9IFtcbiAgICAgICAgJ2F0dHJpYnV0ZSB2ZWM0IHZlcnRleFBvczsnLFxuICAgICAgICAnYXR0cmlidXRlIHZlYzQgdGV4dHVyZVBvczsnLFxuICAgICAgICAnYXR0cmlidXRlIHZlYzQgdVRleHR1cmVQb3M7JyxcbiAgICAgICAgJ2F0dHJpYnV0ZSB2ZWM0IHZUZXh0dXJlUG9zOycsXG4gICAgICAgICd2YXJ5aW5nIHZlYzIgdGV4dHVyZUNvb3JkOycsXG4gICAgICAgICd2YXJ5aW5nIHZlYzIgdVRleHR1cmVDb29yZDsnLFxuICAgICAgICAndmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7JyxcblxuICAgICAgICAndm9pZCBtYWluKCknLFxuICAgICAgICAneycsXG4gICAgICAgICcgIGdsX1Bvc2l0aW9uID0gdmVydGV4UG9zOycsXG4gICAgICAgICcgIHRleHR1cmVDb29yZCA9IHRleHR1cmVQb3MueHk7JyxcbiAgICAgICAgJyAgdVRleHR1cmVDb29yZCA9IHVUZXh0dXJlUG9zLnh5OycsXG4gICAgICAgICcgIHZUZXh0dXJlQ29vcmQgPSB2VGV4dHVyZVBvcy54eTsnLFxuICAgICAgICAnfSdcbiAgICAgIF0uam9pbignXFxuJyk7XG5cbiAgICAgIGZyYWdtZW50U2hhZGVyU2NyaXB0ID0gW1xuICAgICAgICAncHJlY2lzaW9uIGhpZ2hwIGZsb2F0OycsXG4gICAgICAgICd2YXJ5aW5nIGhpZ2hwIHZlYzIgdGV4dHVyZUNvb3JkOycsXG4gICAgICAgICd2YXJ5aW5nIGhpZ2hwIHZlYzIgdVRleHR1cmVDb29yZDsnLFxuICAgICAgICAndmFyeWluZyBoaWdocCB2ZWMyIHZUZXh0dXJlQ29vcmQ7JyxcbiAgICAgICAgJ3VuaWZvcm0gc2FtcGxlcjJEIHlTYW1wbGVyOycsXG4gICAgICAgICd1bmlmb3JtIHNhbXBsZXIyRCB1U2FtcGxlcjsnLFxuICAgICAgICAndW5pZm9ybSBzYW1wbGVyMkQgdlNhbXBsZXI7JyxcbiAgICAgICAgJ3VuaWZvcm0gbWF0NCBZVVYyUkdCOycsXG5cbiAgICAgICAgJ3ZvaWQgbWFpbih2b2lkKSB7JyxcbiAgICAgICAgJyAgaGlnaHAgZmxvYXQgeSA9IHRleHR1cmUyRCh5U2FtcGxlciwgIHRleHR1cmVDb29yZCkucjsnLFxuICAgICAgICAnICBoaWdocCBmbG9hdCB1ID0gdGV4dHVyZTJEKHVTYW1wbGVyLCAgdVRleHR1cmVDb29yZCkucjsnLFxuICAgICAgICAnICBoaWdocCBmbG9hdCB2ID0gdGV4dHVyZTJEKHZTYW1wbGVyLCAgdlRleHR1cmVDb29yZCkucjsnLFxuICAgICAgICAnICBnbF9GcmFnQ29sb3IgPSB2ZWM0KHksIHUsIHYsIDEpICogWVVWMlJHQjsnLFxuICAgICAgICAnfSdcbiAgICAgIF0uam9pbignXFxuJyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNocm9tYSA9PT0gNDIyKSB7XG4gICAgICB2ZXJ0ZXhTaGFkZXJTY3JpcHQgPSBbXG4gICAgICAgICdhdHRyaWJ1dGUgdmVjNCB2ZXJ0ZXhQb3M7JyxcbiAgICAgICAgJ2F0dHJpYnV0ZSB2ZWM0IHRleHR1cmVQb3M7JyxcbiAgICAgICAgJ3ZhcnlpbmcgdmVjMiB0ZXh0dXJlQ29vcmQ7JyxcblxuICAgICAgICAndm9pZCBtYWluKCknLFxuICAgICAgICAneycsXG4gICAgICAgICcgIGdsX1Bvc2l0aW9uID0gdmVydGV4UG9zOycsXG4gICAgICAgICcgIHRleHR1cmVDb29yZCA9IHRleHR1cmVQb3MueHk7JyxcbiAgICAgICAgJ30nXG4gICAgICBdLmpvaW4oJ1xcbicpO1xuXG4gICAgICBmcmFnbWVudFNoYWRlclNjcmlwdCA9IFtcbiAgICAgICAgJ3ByZWNpc2lvbiBoaWdocCBmbG9hdDsnLFxuICAgICAgICAndmFyeWluZyBoaWdocCB2ZWMyIHRleHR1cmVDb29yZDsnLFxuICAgICAgICAndW5pZm9ybSBzYW1wbGVyMkQgc2FtcGxlcjsnLFxuICAgICAgICAndW5pZm9ybSBoaWdocCB2ZWMyIHJlc29sdXRpb247JyxcbiAgICAgICAgJ3VuaWZvcm0gbWF0NCBZVVYyUkdCOycsXG5cbiAgICAgICAgJ3ZvaWQgbWFpbih2b2lkKSB7JyxcblxuICAgICAgICAnICBoaWdocCBmbG9hdCB0ZXhQaXhYID0gMS4wIC8gcmVzb2x1dGlvbi54OycsXG4gICAgICAgICcgIGhpZ2hwIGZsb2F0IGxvZ1BpeFggPSAyLjAgLyByZXNvbHV0aW9uLng7JywgLy8gaGFsZiB0aGUgcmVzb2x1dGlvbiBvZiB0aGUgdGV4dHVyZVxuICAgICAgICAnICBoaWdocCBmbG9hdCBsb2dIYWxmUGl4WCA9IDQuMCAvIHJlc29sdXRpb24ueDsnLCAvLyBoYWxmIG9mIHRoZSBsb2dpY2FsIHJlc29sdXRpb24gc28gZXZlcnkgNHRoIHBpeGVsXG4gICAgICAgICcgIGhpZ2hwIGZsb2F0IHN0ZXBzID0gZmxvb3IodGV4dHVyZUNvb3JkLnggLyBsb2dQaXhYKTsnLFxuICAgICAgICAnICBoaWdocCBmbG9hdCB1dlN0ZXBzID0gZmxvb3IodGV4dHVyZUNvb3JkLnggLyBsb2dIYWxmUGl4WCk7JyxcbiAgICAgICAgJyAgaGlnaHAgZmxvYXQgeSA9IHRleHR1cmUyRChzYW1wbGVyLCB2ZWMyKChsb2dQaXhYICogc3RlcHMpICsgdGV4UGl4WCwgdGV4dHVyZUNvb3JkLnkpKS5yOycsXG4gICAgICAgICcgIGhpZ2hwIGZsb2F0IHUgPSB0ZXh0dXJlMkQoc2FtcGxlciwgdmVjMigobG9nSGFsZlBpeFggKiB1dlN0ZXBzKSwgdGV4dHVyZUNvb3JkLnkpKS5yOycsXG4gICAgICAgICcgIGhpZ2hwIGZsb2F0IHYgPSB0ZXh0dXJlMkQoc2FtcGxlciwgdmVjMigobG9nSGFsZlBpeFggKiB1dlN0ZXBzKSArIHRleFBpeFggKyB0ZXhQaXhYLCB0ZXh0dXJlQ29vcmQueSkpLnI7JyxcblxuICAgICAgICAvLyAnICBoaWdocCBmbG9hdCB5ID0gdGV4dHVyZTJEKHNhbXBsZXIsICB0ZXh0dXJlQ29vcmQpLnI7JyxcbiAgICAgICAgLy8gJyAgZ2xfRnJhZ0NvbG9yID0gdmVjNCh5LCB1LCB2LCAxKSAqIFlVVjJSR0I7JyxcbiAgICAgICAgJyAgZ2xfRnJhZ0NvbG9yID0gdmVjNCh5LCB1LCB2LCAxLjApICogWVVWMlJHQjsnLFxuICAgICAgICAnfSdcbiAgICAgIF0uam9pbignXFxuJyk7XG4gICAgfTtcblxuICAgIHZhciBZVVYyUkdCID0gW1xuICAgICAgMS4xNjQzOCwgMC4wMDAwMCwgMS41OTYwMywgLTAuODcwNzksXG4gICAgICAxLjE2NDM4LCAtMC4zOTE3NiwgLTAuODEyOTcsIDAuNTI5NTksXG4gICAgICAxLjE2NDM4LCAyLjAxNzIzLCAwLjAwMDAwLCAtMS4wODEzOSxcbiAgICAgIDAsIDAsIDAsIDFcbiAgICBdO1xuICAgIHZhciB2ZXJ0ZXhTaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuVkVSVEVYX1NIQURFUik7XG4gICAgZ2wuc2hhZGVyU291cmNlKHZlcnRleFNoYWRlciwgdmVydGV4U2hhZGVyU2NyaXB0KTtcbiAgICBnbC5jb21waWxlU2hhZGVyKHZlcnRleFNoYWRlcik7XG4gICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIodmVydGV4U2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdWZXJ0ZXggc2hhZGVyIGZhaWxlZCB0byBjb21waWxlOiAnICsgZ2wuZ2V0U2hhZGVySW5mb0xvZyh2ZXJ0ZXhTaGFkZXIpKTtcbiAgICB9XG5cbiAgICB2YXIgZnJhZ21lbnRTaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKTtcbiAgICBnbC5zaGFkZXJTb3VyY2UoZnJhZ21lbnRTaGFkZXIsIGZyYWdtZW50U2hhZGVyU2NyaXB0KTtcbiAgICBnbC5jb21waWxlU2hhZGVyKGZyYWdtZW50U2hhZGVyKTtcbiAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcihmcmFnbWVudFNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgICBjb25zb2xlLmxvZygnRnJhZ21lbnQgc2hhZGVyIGZhaWxlZCB0byBjb21waWxlOiAnICsgZ2wuZ2V0U2hhZGVySW5mb0xvZyhmcmFnbWVudFNoYWRlcikpO1xuICAgIH1cblxuICAgIHZhciBwcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCB2ZXJ0ZXhTaGFkZXIpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCBmcmFnbWVudFNoYWRlcik7XG4gICAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XG4gICAgaWYgKCFnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkxJTktfU1RBVFVTKSkge1xuICAgICAgY29uc29sZS5sb2coJ1Byb2dyYW0gZmFpbGVkIHRvIGNvbXBpbGU6ICcgKyBnbC5nZXRQcm9ncmFtSW5mb0xvZyhwcm9ncmFtKSk7XG4gICAgfVxuXG4gICAgZ2wudXNlUHJvZ3JhbShwcm9ncmFtKTtcblxuICAgIHZhciBZVVYyUkdCUmVmID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sICdZVVYyUkdCJyk7XG4gICAgZ2wudW5pZm9ybU1hdHJpeDRmdihZVVYyUkdCUmVmLCBmYWxzZSwgWVVWMlJHQik7XG5cbiAgICB0aGlzLnNoYWRlclByb2dyYW0gPSBwcm9ncmFtO1xuICB9XG5cbiAgX2luaXRCdWZmZXJzICgpIHtcbiAgICB2YXIgZ2wgPSB0aGlzLmNvbnRleHRHTDtcbiAgICB2YXIgcHJvZ3JhbSA9IHRoaXMuc2hhZGVyUHJvZ3JhbTtcblxuICAgIHZhciB2ZXJ0ZXhQb3NCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdmVydGV4UG9zQnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShbMSwgMSwgLTEsIDEsIDEsIC0xLCAtMSwgLTFdKSwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgdmFyIHZlcnRleFBvc1JlZiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sICd2ZXJ0ZXhQb3MnKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh2ZXJ0ZXhQb3NSZWYpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodmVydGV4UG9zUmVmLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuXG4gICAgdmFyIHRleHR1cmVQb3NCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGV4dHVyZVBvc0J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDAsIDEsIDEsIDAsIDFdKSwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgdmFyIHRleHR1cmVQb3NSZWYgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCAndGV4dHVyZVBvcycpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRleHR1cmVQb3NSZWYpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGV4dHVyZVBvc1JlZiwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcblxuICAgIHRoaXMudGV4dHVyZVBvc0J1ZmZlciA9IHRleHR1cmVQb3NCdWZmZXI7XG5cbiAgICBpZiAodGhpcy5jaHJvbWEgPT09IDQyMCkge1xuICAgICAgdmFyIHVUZXh0dXJlUG9zQnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdVRleHR1cmVQb3NCdWZmZXIpO1xuICAgICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDAsIDEsIDEsIDAsIDFdKSwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgICB2YXIgdVRleHR1cmVQb3NSZWYgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCAndVRleHR1cmVQb3MnKTtcbiAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHVUZXh0dXJlUG9zUmVmKTtcbiAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodVRleHR1cmVQb3NSZWYsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG5cbiAgICAgIHRoaXMudVRleHR1cmVQb3NCdWZmZXIgPSB1VGV4dHVyZVBvc0J1ZmZlcjtcblxuICAgICAgdmFyIHZUZXh0dXJlUG9zQnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdlRleHR1cmVQb3NCdWZmZXIpO1xuICAgICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDAsIDEsIDEsIDAsIDFdKSwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgICB2YXIgdlRleHR1cmVQb3NSZWYgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCAndlRleHR1cmVQb3MnKTtcbiAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHZUZXh0dXJlUG9zUmVmKTtcbiAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodlRleHR1cmVQb3NSZWYsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG5cbiAgICAgIHRoaXMudlRleHR1cmVQb3NCdWZmZXIgPSB2VGV4dHVyZVBvc0J1ZmZlcjtcbiAgICB9O1xuICB9O1xuXG4gIF9pbml0VGV4dHVyZXMgKCkge1xuICAgIHZhciBnbCA9IHRoaXMuY29udGV4dEdMO1xuICAgIHZhciBwcm9ncmFtID0gdGhpcy5zaGFkZXJQcm9ncmFtO1xuXG4gICAgaWYgKHRoaXMuY2hyb21hID09PSA0MjApIHtcbiAgICAgIHZhciB5VGV4dHVyZVJlZiA9IHRoaXMuX2luaXRUZXh0dXJlKCk7XG4gICAgICB2YXIgeVNhbXBsZXJSZWYgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgJ3lTYW1wbGVyJyk7XG4gICAgICBnbC51bmlmb3JtMWkoeVNhbXBsZXJSZWYsIDApO1xuICAgICAgdGhpcy55VGV4dHVyZVJlZiA9IHlUZXh0dXJlUmVmO1xuXG4gICAgICB2YXIgdVRleHR1cmVSZWYgPSB0aGlzLl9pbml0VGV4dHVyZSgpO1xuICAgICAgdmFyIHVTYW1wbGVyUmVmID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sICd1U2FtcGxlcicpO1xuICAgICAgZ2wudW5pZm9ybTFpKHVTYW1wbGVyUmVmLCAxKTtcbiAgICAgIHRoaXMudVRleHR1cmVSZWYgPSB1VGV4dHVyZVJlZjtcblxuICAgICAgdmFyIHZUZXh0dXJlUmVmID0gdGhpcy5faW5pdFRleHR1cmUoKTtcbiAgICAgIHZhciB2U2FtcGxlclJlZiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCAndlNhbXBsZXInKTtcbiAgICAgIGdsLnVuaWZvcm0xaSh2U2FtcGxlclJlZiwgMik7XG4gICAgICB0aGlzLnZUZXh0dXJlUmVmID0gdlRleHR1cmVSZWY7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNocm9tYSA9PT0gNDIyKSB7XG4gICAgICAvLyBvbmx5IG9uZSB0ZXh0dXJlIGZvciA0MjJcbiAgICAgIHZhciB0ZXh0dXJlUmVmID0gdGhpcy5faW5pdFRleHR1cmUoKTtcbiAgICAgIHZhciBzYW1wbGVyUmVmID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sICdzYW1wbGVyJyk7XG4gICAgICBnbC51bmlmb3JtMWkoc2FtcGxlclJlZiwgMCk7XG4gICAgICB0aGlzLnRleHR1cmVSZWYgPSB0ZXh0dXJlUmVmO1xuICAgIH07XG4gIH1cblxuICBfaW5pdFRleHR1cmUgKCkge1xuICAgIHZhciBnbCA9IHRoaXMuY29udGV4dEdMO1xuXG4gICAgdmFyIHRleHR1cmVSZWYgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZVJlZik7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5DTEFNUF9UT19FREdFKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBudWxsKTtcblxuICAgIHJldHVybiB0ZXh0dXJlUmVmO1xuICB9XG5cbiAgX2RyYXdQaWN0dXJlR0wgKGRhdGEsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICBpZiAodGhpcy5jaHJvbWEgPT09IDQyMCkge1xuICAgICAgbGV0IG5XaWR0aCA9IHdpZHRoO1xuICAgICAgdmFyIHlsZW4gPSB3aWR0aCAqIGhlaWdodDtcbiAgICAgIHZhciB1dmxlbiA9ICh3aWR0aCAvIDIpICogKGhlaWdodCAvIDIpO1xuICAgICAgZGF0YSA9IG5ldyBVaW50OEFycmF5KGRhdGEpO1xuICAgICAgbGV0IHJlbmRlckRhdGEgPSB7XG4gICAgICAgIHlEYXRhOiBkYXRhLnN1YmFycmF5KDAsIHlsZW4pLFxuICAgICAgICB1RGF0YTogZGF0YS5zdWJhcnJheSh5bGVuLCB5bGVuICsgdXZsZW4pLFxuICAgICAgICB2RGF0YTogZGF0YS5zdWJhcnJheSh5bGVuICsgdXZsZW4sIHlsZW4gKyB1dmxlbiArIHV2bGVuKVxuICAgICAgfVxuICAgICAgaWYgKHdpZHRoICUgNCA+IDApIHtcbiAgICAgICAgbldpZHRoID0gd2lkdGggKyA0IC0gKHdpZHRoICUgNCk7XG4gICAgICAgIGxldCB5QXJyYXkgPSBuZXcgVWludDhBcnJheShuV2lkdGggKiBoZWlnaHQpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlaWdodDsgaSsrKSB7XG4gICAgICAgICAgeUFycmF5LnNldChyZW5kZXJEYXRhLnlEYXRhLnN1YmFycmF5KGkgKiB3aWR0aCwgKGkgKyAxKSAqIHdpZHRoKSwgaSAqIG5XaWR0aCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVuZGVyRGF0YS55RGF0YSA9IHlBcnJheTtcbiAgICAgIH1cblxuICAgICAgaWYgKCh3aWR0aCAvIDIpICUgNCA+IDApIHtcbiAgICAgICAgbldpZHRoID0gKHdpZHRoIC8gMikgKyA0IC0gKCh3aWR0aCAvIDIpICUgNCk7XG4gICAgICAgIGxldCB1QXJyYXkgPSBuZXcgVWludDhBcnJheShuV2lkdGggKiBoZWlnaHQgLyAyKTtcbiAgICAgICAgbGV0IHZBcnJheSA9IG5ldyBVaW50OEFycmF5KG5XaWR0aCAqIGhlaWdodCAvIDIpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlaWdodCAvIDI7IGkrKykge1xuICAgICAgICAgIHVBcnJheS5zZXQocmVuZGVyRGF0YS51RGF0YS5zdWJhcnJheShpICogd2lkdGggLyAyLCAoaSArIDEpICogd2lkdGggLyAyKSwgaSAqIG5XaWR0aCk7XG4gICAgICAgICAgdkFycmF5LnNldChyZW5kZXJEYXRhLnZEYXRhLnN1YmFycmF5KGkgKiB3aWR0aCAvIDIsIChpICsgMSkgKiB3aWR0aCAvIDIpLCBpICogbldpZHRoKTtcbiAgICAgICAgfVxuICAgICAgICByZW5kZXJEYXRhLnVEYXRhID0gdUFycmF5O1xuICAgICAgICByZW5kZXJEYXRhLnZEYXRhID0gdkFycmF5O1xuICAgICAgfVxuICAgICAgdGhpcy5fZHJhd1BpY3R1cmVHTDQyMChyZW5kZXJEYXRhLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuY2hyb21hID09PSA0MjIpIHtcbiAgICAgIGRhdGEgPSBuZXcgVWludDhBcnJheShkYXRhKTtcbiAgICAgIHRoaXMuX2RyYXdQaWN0dXJlR0w0MjIod2lkdGgsIGhlaWdodCwgZGF0YSk7XG4gICAgfVxuICB9XG5cbiAgX2RyYXdQaWN0dXJlR0w0MjIgKGRhdGEsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICB2YXIgZ2wgPSB0aGlzLmNvbnRleHRHTDtcbiAgICB2YXIgdGV4dHVyZVBvc0J1ZmZlciA9IHRoaXMudGV4dHVyZVBvc0J1ZmZlcjtcblxuICAgIHZhciB0ZXh0dXJlUmVmID0gdGhpcy50ZXh0dXJlUmVmO1xuXG4gICAgdmFyIGRhdGFQZXJSb3cgPSB3aWR0aCAqIDI7XG4gICAgdmFyIHJvd0NudCA9IGhlaWdodDtcblxuICAgIGdsLnZpZXdwb3J0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgdmFyIHRUb3AgPSAwO1xuICAgIHZhciB0TGVmdCA9IDA7XG4gICAgdmFyIHRCb3R0b20gPSBoZWlnaHQgLyByb3dDbnQ7XG4gICAgdmFyIHRSaWdodCA9IHdpZHRoIC8gKGRhdGFQZXJSb3cgLyAyKTtcbiAgICB2YXIgdGV4dHVyZVBvc1ZhbHVlcyA9IG5ldyBGbG9hdDMyQXJyYXkoW3RSaWdodCwgdFRvcCwgdExlZnQsIHRUb3AsIHRSaWdodCwgdEJvdHRvbSwgdExlZnQsIHRCb3R0b21dKTtcblxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0ZXh0dXJlUG9zQnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdGV4dHVyZVBvc1ZhbHVlcywgZ2wuRFlOQU1JQ19EUkFXKTtcblxuICAgIGdsLnVuaWZvcm0yZihnbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5zaGFkZXJQcm9ncmFtLCAncmVzb2x1dGlvbicpLCBkYXRhUGVyUm93LCBoZWlnaHQpO1xuXG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZVJlZik7XG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5MVU1JTkFOQ0UsIGRhdGFQZXJSb3csIHJvd0NudCwgMCwgZ2wuTFVNSU5BTkNFLCBnbC5VTlNJR05FRF9CWVRFLCBkYXRhKTtcblxuICAgIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVfU1RSSVAsIDAsIDQpO1xuICB9XG5cbiAgX2RyYXdQaWN0dXJlR0w0MjAgKGRhdGEsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICB2YXIgZ2wgPSB0aGlzLmNvbnRleHRHTDtcbiAgICB2YXIgdGV4dHVyZVBvc0J1ZmZlciA9IHRoaXMudGV4dHVyZVBvc0J1ZmZlcjtcbiAgICB2YXIgdVRleHR1cmVQb3NCdWZmZXIgPSB0aGlzLnVUZXh0dXJlUG9zQnVmZmVyO1xuICAgIHZhciB2VGV4dHVyZVBvc0J1ZmZlciA9IHRoaXMudlRleHR1cmVQb3NCdWZmZXI7XG5cbiAgICB2YXIgeVRleHR1cmVSZWYgPSB0aGlzLnlUZXh0dXJlUmVmO1xuICAgIHZhciB1VGV4dHVyZVJlZiA9IHRoaXMudVRleHR1cmVSZWY7XG4gICAgdmFyIHZUZXh0dXJlUmVmID0gdGhpcy52VGV4dHVyZVJlZjtcblxuICAgIHZhciB5RGF0YSA9IGRhdGEueURhdGE7XG4gICAgdmFyIHVEYXRhID0gZGF0YS51RGF0YTtcbiAgICB2YXIgdkRhdGEgPSBkYXRhLnZEYXRhO1xuXG4gICAgdmFyIHlEYXRhUGVyUm93ID0gd2lkdGg7XG4gICAgdmFyIHlSb3dDbnQgPSBoZWlnaHQ7XG5cbiAgICB2YXIgdURhdGFQZXJSb3cgPSB3aWR0aCAvIDI7XG4gICAgdmFyIHVSb3dDbnQgPSBoZWlnaHQgLyAyO1xuXG4gICAgdmFyIHZEYXRhUGVyUm93ID0gdURhdGFQZXJSb3c7XG4gICAgdmFyIHZSb3dDbnQgPSB1Um93Q250O1xuICAgIGdsLnZpZXdwb3J0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcblxuICAgIHZhciB0VG9wID0gMDtcbiAgICB2YXIgdExlZnQgPSAwO1xuICAgIHZhciB0Qm90dG9tID0gaGVpZ2h0IC8geVJvd0NudDtcbiAgICB2YXIgdFJpZ2h0ID0gd2lkdGggLyB5RGF0YVBlclJvdztcbiAgICB2YXIgdGV4dHVyZVBvc1ZhbHVlcyA9IG5ldyBGbG9hdDMyQXJyYXkoW3RSaWdodCwgdFRvcCwgdExlZnQsIHRUb3AsIHRSaWdodCwgdEJvdHRvbSwgdExlZnQsIHRCb3R0b21dKTtcblxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0ZXh0dXJlUG9zQnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdGV4dHVyZVBvc1ZhbHVlcywgZ2wuRFlOQU1JQ19EUkFXKTtcblxuXG4gICAgdEJvdHRvbSA9IChoZWlnaHQgLyAyKSAvIHVSb3dDbnQ7XG4gICAgdFJpZ2h0ID0gKHdpZHRoIC8gMikgLyB1RGF0YVBlclJvdztcbiAgICB2YXIgdVRleHR1cmVQb3NWYWx1ZXMgPSBuZXcgRmxvYXQzMkFycmF5KFt0UmlnaHQsIHRUb3AsIHRMZWZ0LCB0VG9wLCB0UmlnaHQsIHRCb3R0b20sIHRMZWZ0LCB0Qm90dG9tXSk7XG5cbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdVRleHR1cmVQb3NCdWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCB1VGV4dHVyZVBvc1ZhbHVlcywgZ2wuRFlOQU1JQ19EUkFXKTtcblxuICAgIHRCb3R0b20gPSAoaGVpZ2h0IC8gMikgLyB2Um93Q250O1xuICAgIHRSaWdodCA9ICh3aWR0aCAvIDIpIC8gdkRhdGFQZXJSb3c7XG5cbiAgICB2YXIgdlRleHR1cmVQb3NWYWx1ZXMgPSBuZXcgRmxvYXQzMkFycmF5KFt0UmlnaHQsIHRUb3AsIHRMZWZ0LCB0VG9wLCB0UmlnaHQsIHRCb3R0b20sIHRMZWZ0LCB0Qm90dG9tXSk7XG5cbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdlRleHR1cmVQb3NCdWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCB2VGV4dHVyZVBvc1ZhbHVlcywgZ2wuRFlOQU1JQ19EUkFXKTtcbiAgICBcbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB5VGV4dHVyZVJlZik7XG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5MVU1JTkFOQ0UsIHlEYXRhUGVyUm93LCB5Um93Q250LCAwLCBnbC5MVU1JTkFOQ0UsIGdsLlVOU0lHTkVEX0JZVEUsIHlEYXRhKTtcblxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTEpO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHVUZXh0dXJlUmVmKTtcbiAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLkxVTUlOQU5DRSwgdURhdGFQZXJSb3csIHVSb3dDbnQsIDAsIGdsLkxVTUlOQU5DRSwgZ2wuVU5TSUdORURfQllURSwgdURhdGEpO1xuXG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMik7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdlRleHR1cmVSZWYpO1xuICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuTFVNSU5BTkNFLCB2RGF0YVBlclJvdywgdlJvd0NudCwgMCwgZ2wuTFVNSU5BTkNFLCBnbC5VTlNJR05FRF9CWVRFLCB2RGF0YSk7XG5cbiAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFX1NUUklQLCAwLCA0KTtcbiAgfVxuXG4gIF9kcmF3UGljdHVyZVJHQiAoZGF0YSkge1xuXG4gIH1cblxuICByZW5kZXIgKGRhdGEsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICB2YXIgZ2wgPSB0aGlzLmNvbnRleHRHTDtcbiAgICBpZiAoZ2wpIHtcbiAgICAgIHRoaXMuX2RyYXdQaWN0dXJlR0woZGF0YSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RyYXdQaWN0dXJlUkdCKGRhdGEpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBZVVZDYW52YXM7XG4iLCJjb25zdCBpc09iamVjdEZpbGxlZCA9IChvYmopID0+IHtcbiAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgaWYgKG9ialtrZXldID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZWRpYUluZm8ge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5taW1lVHlwZSA9IG51bGxcbiAgICB0aGlzLmR1cmF0aW9uID0gbnVsbFxuXG4gICAgdGhpcy5oYXNWaWRlbyA9IG51bGxcbiAgICB0aGlzLnZpZGVvID0ge1xuICAgICAgY29kZWM6IG51bGwsXG4gICAgICB3aWR0aDogbnVsbCxcbiAgICAgIGhlaWdodDogbnVsbCxcbiAgICAgIHByb2ZpbGU6IG51bGwsXG4gICAgICBsZXZlbDogbnVsbCxcbiAgICAgIGZyYW1lUmF0ZToge1xuICAgICAgICBmaXhlZDogdHJ1ZSxcbiAgICAgICAgZnBzOiAyNSxcbiAgICAgICAgZnBzX251bTogMjUwMDAsXG4gICAgICAgIGZwc19kZW46IDEwMDBcbiAgICAgIH0sXG4gICAgICBjaHJvbWFGb3JtYXQ6IG51bGwsXG4gICAgICBwYXJSYXRpbzoge1xuICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgaGVpZ2h0OiAxXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5oYXNBdWRpbyA9IG51bGxcblxuICAgIHRoaXMuYXVkaW8gPSB7XG4gICAgICBjb2RlYzogbnVsbCxcbiAgICAgIHNhbXBsZVJhdGU6IG51bGwsXG4gICAgICBzYW1wbGVSYXRlSW5kZXg6IG51bGwsXG4gICAgICBjaGFubmVsQ291bnQ6IG51bGxcbiAgICB9XG4gIH1cblxuICBpc0NvbXBsZXRlICgpIHtcbiAgICByZXR1cm4gTWVkaWFJbmZvLmlzQmFzZUluZm9SZWFkeSh0aGlzKSAmJiBNZWRpYUluZm8uaXNWaWRlb1JlYWR5KHRoaXMpICYmIE1lZGlhSW5mby5pc0F1ZGlvUmVhZHkodGhpcylcbiAgfVxuXG4gIHN0YXRpYyBpc0Jhc2VJbmZvUmVhZHkgKG1lZGlhSW5mbykge1xuICAgIHJldHVybiBpc09iamVjdEZpbGxlZChtZWRpYUluZm8pXG4gIH1cblxuICBzdGF0aWMgaXNWaWRlb1JlYWR5IChtZWRpYUluZm8pIHtcbiAgICBpZiAoIW1lZGlhSW5mby5oYXNWaWRlbykge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4gaXNPYmplY3RGaWxsZWQobWVkaWFJbmZvLnZpZGVvKVxuICB9XG5cbiAgc3RhdGljIGlzQXVkaW9SZWFkeSAobWVkaWFJbmZvKSB7XG4gICAgaWYgKCFtZWRpYUluZm8uaGFzQXVkaW8pIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgcmV0dXJuIGlzT2JqZWN0RmlsbGVkKG1lZGlhSW5mby52aWRlbylcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVkaWFTYW1wbGUge1xuICBjb25zdHJ1Y3RvciAoaW5mbykge1xuICAgIGxldCBfZGVmYXVsdCA9IE1lZGlhU2FtcGxlLmdldERlZmF1bHRJbmYoKVxuXG4gICAgaWYgKCFpbmZvIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbmZvKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgIHJldHVybiBfZGVmYXVsdFxuICAgIH1cbiAgICBsZXQgc2FtcGxlID0gT2JqZWN0LmFzc2lnbih7fSwgX2RlZmF1bHQsIGluZm8pXG5cbiAgICBPYmplY3QuZW50cmllcyhzYW1wbGUpLmZvckVhY2goKFtrLCB2XSkgPT4ge1xuICAgICAgdGhpc1trXSA9IHZcbiAgICB9KVxuICB9XG5cbiAgc3RhdGljIGdldERlZmF1bHRJbmYgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkdHM6IG51bGwsXG4gICAgICBwdHM6IG51bGwsXG4gICAgICBkdXJhdGlvbjogbnVsbCxcbiAgICAgIHBvc2l0aW9uOiBudWxsLFxuICAgICAgaXNSQVA6IGZhbHNlLCAvLyBpcyBSYW5kb20gYWNjZXNzIHBvaW50XG4gICAgICBvcmlnaW5EdHM6IG51bGxcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lZGlhU2VnbWVudExpc3Qge1xuXG4gICAgY29uc3RydWN0b3IgKHR5cGUpIHtcbiAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuX2xpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5fbGFzdEFwcGVuZExvY2F0aW9uID0gLTE7IC8vIGNhY2hlZCBsYXN0IGluc2VydCBsb2NhdGlvblxuICAgIH1cblxuICAgIGdldCB0eXBlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gICAgfVxuXG4gICAgZ2V0IGxlbmd0aCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0Lmxlbmd0aDtcbiAgICB9XG5cbiAgICBpc0VtcHR5ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3QubGVuZ3RoID09PSAwO1xuICAgIH1cblxuICAgIGNsZWFyICgpIHtcbiAgICAgICAgdGhpcy5fbGlzdCA9IFtdO1xuICAgICAgICB0aGlzLl9sYXN0QXBwZW5kTG9jYXRpb24gPSAtMTtcbiAgICB9XG5cbiAgICBfc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUgKGJlZ2luRHRzKSB7XG4gICAgICAgIGxldCBsaXN0ID0gdGhpcy5fbGlzdDtcbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gLTI7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxhc3QgPSBsaXN0Lmxlbmd0aCAtIDE7XG4gICAgICAgIGxldCBtaWQgPSAwO1xuICAgICAgICBsZXQgbGJvdW5kID0gMDtcbiAgICAgICAgbGV0IHVib3VuZCA9IGxhc3Q7XG5cbiAgICAgICAgbGV0IGlkeCA9IDA7XG5cbiAgICAgICAgaWYgKGJlZ2luRHRzIDwgbGlzdFswXS5vcmlnaW5EdHMpIHtcbiAgICAgICAgICAgIGlkeCA9IC0xO1xuICAgICAgICAgICAgcmV0dXJuIGlkeDtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChsYm91bmQgPD0gdWJvdW5kKSB7XG4gICAgICAgICAgICBtaWQgPSBsYm91bmQgKyBNYXRoLmZsb29yKCh1Ym91bmQgLSBsYm91bmQpIC8gMik7XG4gICAgICAgICAgICBpZiAobWlkID09PSBsYXN0IHx8IChiZWdpbkR0cyA+IGxpc3RbbWlkXS5sYXN0U2FtcGxlLm9yaWdpbkR0c1xuICAgICAgICAgICAgICAgICAgICAmJiAoYmVnaW5EdHMgPCBsaXN0W21pZCArIDFdLm9yaWdpbkR0cykpKSB7XG4gICAgICAgICAgICAgICAgaWR4ID0gbWlkO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsaXN0W21pZF0ub3JpZ2luRHRzIDwgYmVnaW5EdHMpIHtcbiAgICAgICAgICAgICAgICBsYm91bmQgPSBtaWQgKyAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB1Ym91bmQgPSBtaWQgLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpZHg7XG4gICAgfVxuXG4gICAgX3NlYXJjaE5lYXJlc3RTZWdtZW50QWZ0ZXIgKGJlZ2luRHRzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWFyY2hOZWFyZXN0U2VnbWVudEJlZm9yZShiZWdpbkR0cykgKyAxO1xuICAgIH1cblxuICAgIGFwcGVuZCAoc2VnbWVudCkge1xuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuX2xpc3Q7XG4gICAgICAgIGxldCBsYXN0QXBwZW5kSWR4ID0gdGhpcy5fbGFzdEFwcGVuZExvY2F0aW9uO1xuICAgICAgICBsZXQgaW5zZXJ0SWR4ID0gMDtcblxuICAgICAgICBpZiAobGFzdEFwcGVuZElkeCAhPT0gLTEgJiYgbGFzdEFwcGVuZElkeCA8IGxpc3QubGVuZ3RoXG4gICAgICAgICAgICAmJiBzZWdtZW50Lm9yaWdpblN0YXJ0RHRzID49IGxpc3RbbGFzdEFwcGVuZElkeF0ubGFzdFNhbXBsZS5vcmlnaW5EdHNcbiAgICAgICAgICAgICYmICgobGFzdEFwcGVuZElkeCA9PT0gbGlzdC5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICAgIHx8IChsYXN0QXBwZW5kSWR4IDwgbGlzdC5sZW5ndGggLSAxXG4gICAgICAgICAgICAgICAgICAgICYmIHNlZ21lbnQub3JpZ2luU3RhcnREdHMgPCBsaXN0W2xhc3RBcHBlbmRJZHggKyAxXS5vcmlnaW5TdGFydER0cykpKSB7XG4gICAgICAgICAgICBpbnNlcnRJZHggPSBsYXN0QXBwZW5kSWR4ICsgMTsgLy8gdXNlIGNhY2hlZCBsb2NhdGlvbiBpZHhcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChsaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBpbnNlcnRJZHggPSB0aGlzLl9zZWFyY2hOZWFyZXN0U2VnbWVudEJlZm9yZShzZWdtZW50Lm9yaWdpblN0YXJ0RHRzKSArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9sYXN0QXBwZW5kTG9jYXRpb24gPSBpbnNlcnRJZHg7XG4gICAgICAgIHRoaXMuX2xpc3Quc3BsaWNlKGluc2VydElkeCwgMCwgc2VnbWVudCk7XG4gICAgfVxuXG4gICAgZ2V0TGFzdFNlZ21lbnRCZWZvcmUgKGJlZ2luRHRzKSB7XG4gICAgICAgIGxldCBpZHggPSB0aGlzLl9zZWFyY2hOZWFyZXN0U2VnbWVudEJlZm9yZShiZWdpbkR0cyk7XG4gICAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RbaWR4XTtcbiAgICAgICAgfSBlbHNlIHsgLy8gLTFcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TGFzdFNhbXBsZUJlZm9yZSAoYmVnaW5EdHMpIHtcbiAgICAgICAgbGV0IHNlZ21lbnQgPSB0aGlzLmdldExhc3RTZWdtZW50QmVmb3JlKGJlZ2luRHRzKTtcbiAgICAgICAgaWYgKHNlZ21lbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWdtZW50Lmxhc3RTYW1wbGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldExhc3RSQVBCZWZvcmUgKGJlZ2luRHRzKSB7XG4gICAgICAgIGxldCBzZWdtZW50SWR4ID0gdGhpcy5fc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUoYmVnaW5EdHMpO1xuICAgICAgICBsZXQgcmFuZG9tQWNjZXNzUG9pbnRzID0gdGhpcy5fbGlzdFtzZWdtZW50SWR4XS5yYW5kb21BY2Nlc3NQb2ludHM7XG4gICAgICAgIHdoaWxlIChyYW5kb21BY2Nlc3NQb2ludHMubGVuZ3RoID09PSAwICYmIHNlZ21lbnRJZHggPiAwKSB7XG4gICAgICAgICAgICBzZWdtZW50SWR4LS07XG4gICAgICAgICAgICByYW5kb21BY2Nlc3NQb2ludHMgPSB0aGlzLl9saXN0W3NlZ21lbnRJZHhdLnJhbmRvbUFjY2Vzc1BvaW50cztcbiAgICAgICAgfVxuICAgICAgICBpZiAocmFuZG9tQWNjZXNzUG9pbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiByYW5kb21BY2Nlc3NQb2ludHNbcmFuZG9tQWNjZXNzUG9pbnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNZWRpYVNlZ21lbnQge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgdGhpcy5zdGFydER0cyA9IC0xO1xuICAgICAgICB0aGlzLmVuZER0cyA9IC0xO1xuICAgICAgICB0aGlzLnN0YXJ0UHRzID0gLTE7XG4gICAgICAgIHRoaXMuZW5kUHRzID0gLTE7XG4gICAgICAgIHRoaXMub3JpZ2luU3RhcnREdHMgPSAtMTtcbiAgICAgICAgdGhpcy5vcmlnaW5FbmREdHMgPSAtMTtcbiAgICAgICAgdGhpcy5yYW5kb21BY2Nlc3NQb2ludHMgPSBbXTtcbiAgICAgICAgdGhpcy5maXJzdFNhbXBsZSA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdFNhbXBsZSA9IG51bGw7XG4gICAgfVxuXG4gICAgYWRkUkFQIChzYW1wbGUpIHtcbiAgICAgICAgc2FtcGxlLmlzUkFQID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yYW5kb21BY2Nlc3NQb2ludHMucHVzaChzYW1wbGUpO1xuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgQXVkaW9UcmFja01ldGEge1xuICBjb25zdHJ1Y3RvciAobWV0YSkge1xuICAgIGNvbnN0IF9kZWZhdWx0ID0ge1xuICAgICAgc2FtcGxlUmF0ZTogNDgwMDAsXG4gICAgICBjaGFubmVsQ291bnQ6IDIsXG4gICAgICBjb2RlYzogJ21wNGEuNDAuMicsXG4gICAgICBjb25maWc6IFs0MSwgNDAxLCAxMzYsIDBdLFxuICAgICAgZHVyYXRpb246IDAsXG4gICAgICBpZDogMixcbiAgICAgIHJlZlNhbXBsZUR1cmF0aW9uOiAyMSxcbiAgICAgIHNhbXBsZVJhdGVJbmRleDogMyxcbiAgICAgIHRpbWVzY2FsZTogMTAwMCxcbiAgICAgIHR5cGU6ICdhdWRpbydcbiAgICB9XG4gICAgaWYgKG1ldGEpIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBfZGVmYXVsdCwgbWV0YSlcbiAgICB9XG4gICAgcmV0dXJuIF9kZWZhdWx0XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFZpZGVvVHJhY2tNZXRhIHtcbiAgY29uc3RydWN0b3IgKG1ldGEpIHtcbiAgICBjb25zdCBfZGVmYXVsdCA9IHtcbiAgICAgIGF2Y2M6IG51bGwsXG4gICAgICBzcHM6IG5ldyBVaW50OEFycmF5KDApLFxuICAgICAgcHBzOiBuZXcgVWludDhBcnJheSgwKSxcbiAgICAgIGNocm9tYUZvcm1hdDogNDIwLFxuICAgICAgY29kZWM6ICdhdmMxLjY0MDAyMCcsXG4gICAgICBjb2RlY0hlaWdodDogNzIwLFxuICAgICAgY29kZWNXaWR0aDogMTI4MCxcbiAgICAgIGR1cmF0aW9uOiAwLFxuICAgICAgZnJhbWVSYXRlOiB7XG4gICAgICAgIGZpeGVkOiB0cnVlLFxuICAgICAgICBmcHM6IDI1LFxuICAgICAgICBmcHNfbnVtOiAyNTAwMCxcbiAgICAgICAgZnBzX2RlbjogMTAwMFxuICAgICAgfSxcbiAgICAgIGlkOiAxLFxuICAgICAgbGV2ZWw6ICczLjInLFxuICAgICAgcHJlc2VudEhlaWdodDogNzIwLFxuICAgICAgcHJlc2VudFdpZHRoOiAxMjgwLFxuICAgICAgcHJvZmlsZTogJ0hpZ2gnLFxuICAgICAgcmVmU2FtcGxlRHVyYXRpb246IDQwLFxuICAgICAgcGFyUmF0aW86IHtcbiAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICB3aWR0aDogMVxuICAgICAgfSxcbiAgICAgIHRpbWVzY2FsZTogMTAwMCxcbiAgICAgIHR5cGU6ICd2aWRlbydcbiAgICB9XG5cbiAgICBpZiAobWV0YSkge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIF9kZWZhdWx0LCBtZXRhKVxuICAgIH1cbiAgICByZXR1cm4gX2RlZmF1bHRcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEF1ZGlvVHJhY2tTYW1wbGUge1xuICBjb25zdHJ1Y3RvciAoaW5mbykge1xuICAgIGxldCBfZGVmYXVsdCA9IEF1ZGlvVHJhY2tTYW1wbGUuZ2V0RGVmYXVsdCgpXG4gICAgaWYgKCFpbmZvKSB7XG4gICAgICByZXR1cm4gX2RlZmF1bHRcbiAgICB9XG4gICAgbGV0IHNhbXBsZSA9IE9iamVjdC5hc3NpZ24oe30sIF9kZWZhdWx0LCBpbmZvKVxuXG4gICAgcmV0dXJuIHNhbXBsZVxuICB9XG5cbiAgc3RhdGljIGdldERlZmF1bHQgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkdHM6IG51bGwsXG4gICAgICBwdHM6IG51bGwsXG4gICAgICBkYXRhOiBuZXcgVWludDhBcnJheSgpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWaWRlb1RyYWNrU2FtcGxlIHtcbiAgY29uc3RydWN0b3IgKGluZm8pIHtcbiAgICBsZXQgX2RlZmF1bHQgPSBWaWRlb1RyYWNrU2FtcGxlLmdldERlZmF1bHQoKVxuXG4gICAgaWYgKCFpbmZvKSB7XG4gICAgICByZXR1cm4gX2RlZmF1bHRcbiAgICB9XG4gICAgbGV0IHNhbXBsZSA9IE9iamVjdC5hc3NpZ24oe30sIF9kZWZhdWx0LCBpbmZvKVxuXG4gICAgcmV0dXJuIHNhbXBsZVxuICB9XG5cbiAgc3RhdGljIGdldERlZmF1bHQgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkdHM6IG51bGwsXG4gICAgICBwdHM6IG51bGwsXG4gICAgICBpc0tleWZyYW1lOiBmYWxzZSwgLy8gaXMgUmFuZG9tIGFjY2VzcyBwb2ludFxuICAgICAgb3JpZ2luRHRzOiBudWxsLFxuICAgICAgZGF0YTogbmV3IFVpbnQ4QXJyYXkoKVxuICAgIH1cbiAgfVxufVxuIiwiY2xhc3MgTVNFIHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZ3MpIHtcbiAgICB0aGlzLmNvbmZpZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWdzKTtcbiAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMuY29uZmlncy5jb250YWluZXI7XG4gICAgdGhpcy5tZWRpYVNvdXJjZSA9IG51bGw7XG4gICAgdGhpcy5zb3VyY2VCdWZmZXJzID0ge307XG4gICAgdGhpcy5wcmVsb2FkVGltZSA9IHRoaXMuY29uZmlncy5wcmVsb2FkVGltZSB8fCAxO1xuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgdGhpcy5tZWRpYVNvdXJjZSA9IG5ldyBzZWxmLk1lZGlhU291cmNlKCk7XG4gICAgdGhpcy5tZWRpYVNvdXJjZS5hZGRFdmVudExpc3RlbmVyKCdzb3VyY2VvcGVuJywgdGhpcy5vblNvdXJjZU9wZW4uYmluZCh0aGlzKSk7XG4gICAgdGhpcy5jb250YWluZXIuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTCh0aGlzLm1lZGlhU291cmNlKTtcbiAgICB0aGlzLnVybCA9IHRoaXMuY29udGFpbmVyLnNyYztcbiAgICB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgdGhpcy5vblRpbWVVcGRhdGUuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignd2FpdGluZycsIHRoaXMub25XYWl0aW5nLmJpbmQodGhpcykpO1xuICB9XG5cbiAgb25UaW1lVXBkYXRlICgpIHtcbiAgICB0aGlzLmVtaXQoJ1RJTUVfVVBEQVRFJywgdGhpcy5jb250YWluZXIpO1xuICB9XG4gICBcbiAgb25XYWl0aW5nICgpIHtcbiAgICB0aGlzLmVtaXQoJ1dBSVRJTkcnLCB0aGlzLmNvbnRhaW5lcik7XG4gIH1cblxuICBvblNvdXJjZU9wZW4gKCkge1xuICAgIHRoaXMuYWRkU291cmNlQnVmZmVycygpO1xuICB9XG5cbiAgb25VcGRhdGVFbmQgKCkge1xuICAgIHRoaXMuZW1pdCgnU09VUkNFX1VQREFURV9FTkQnKTtcbiAgICB0aGlzLmRvQXBwZW5kKClcbiAgfVxuICBhZGRTb3VyY2VCdWZmZXJzICgpIHtcbiAgICBpZiAodGhpcy5tZWRpYVNvdXJjZS5yZWFkeVN0YXRlICE9PSAnb3BlbicpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHNvdXJjZXMgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdQUkVfU09VUkNFX0JVRkZFUicpO1xuICAgIGxldCB0cmFja3MgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKTtcbiAgICBsZXQgdHJhY2s7XG5cbiAgICBzb3VyY2VzID0gc291cmNlcy5zb3VyY2VzO1xuICAgIGxldCBhZGQgPSBmYWxzZTtcbiAgICBmb3IgKGxldCBpID0gMCwgayA9IE9iamVjdC5rZXlzKHNvdXJjZXMpLmxlbmd0aDsgaSA8IGs7IGkrKykge1xuICAgICAgbGV0IHR5cGUgPSBPYmplY3Qua2V5cyhzb3VyY2VzKVtpXTtcbiAgICAgIGlmICh0eXBlID09PSAnYXVkaW8nKSB7XG4gICAgICAgIHRyYWNrID0gdHJhY2tzLmF1ZGlvVHJhY2s7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgICAgdHJhY2sgPSB0cmFja3MudmlkZW9UcmFjaztcbiAgICAgIH1cbiAgICAgIGlmICh0cmFjaykge1xuICAgICAgICBsZXQgZHVyID0gdHlwZSA9PT0gJ2F1ZGlvJyA/IDIxIDogNDA7XG4gICAgICAgIGlmICh0cmFjay5tZXRhICYmIHRyYWNrLm1ldGEucmVmU2FtcGxlRHVyYXRpb24pIGR1ciA9IHRyYWNrLm1ldGEucmVmU2FtcGxlRHVyYXRpb247XG4gICAgICAgIGlmIChzb3VyY2VzW3R5cGVdLmRhdGEubGVuZ3RoID49ICh0aGlzLnByZWxvYWRUaW1lIC8gZHVyKSkge1xuICAgICAgICAgIGFkZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYWRkKSB7XG4gICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAwLCBrID0gT2JqZWN0LmtleXMoc291cmNlcykubGVuZ3RoOyBpIDwgazsgaSsrKSB7XG4gICAgICAgIGxldCB0eXBlID0gT2JqZWN0LmtleXMoc291cmNlcylbaV07XG4gICAgICAgIGxldCBzb3VyY2UgPSBzb3VyY2VzW3R5cGVdXG4gICAgICAgIGxldCBtaW1lID0gKHR5cGUgPT09ICd2aWRlbycpID8gJ3ZpZGVvL21wNDtjb2RlY3M9JyArIHNvdXJjZS5taW1ldHlwZSA6ICdhdWRpby9tcDQ7Y29kZWNzPScgKyBzb3VyY2UubWltZXR5cGVcbiAgICAgICAgbGV0IHNvdXJjZUJ1ZmZlciA9IHRoaXMubWVkaWFTb3VyY2UuYWRkU291cmNlQnVmZmVyKG1pbWUpO1xuICAgICAgICB0aGlzLnNvdXJjZUJ1ZmZlcnNbdHlwZV0gPSBzb3VyY2VCdWZmZXI7XG4gICAgICAgIHNvdXJjZUJ1ZmZlci5hZGRFdmVudExpc3RlbmVyKCd1cGRhdGVlbmQnLCB0aGlzLm9uVXBkYXRlRW5kLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmRvQXBwZW5kKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZG9BcHBlbmQgKCkge1xuICAgIGxldCBzb3VyY2VzID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnUFJFX1NPVVJDRV9CVUZGRVInKTtcbiAgICBpZiAoc291cmNlcykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBPYmplY3Qua2V5cyh0aGlzLnNvdXJjZUJ1ZmZlcnMpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCB0eXBlID0gT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKVtpXVxuICAgICAgICBsZXQgc291cmNlQnVmZmVyID0gdGhpcy5zb3VyY2VCdWZmZXJzW3R5cGVdO1xuICAgICAgICBpZiAoIXNvdXJjZUJ1ZmZlci51cGRhdGluZykge1xuICAgICAgICAgIGxldCBzb3VyY2UgPSBzb3VyY2VzLnNvdXJjZXNbdHlwZV07XG4gICAgICAgICAgaWYgKHNvdXJjZSAmJiAhc291cmNlLmluaXRlZCkge1xuICAgICAgICAgICAgc291cmNlQnVmZmVyLmFwcGVuZEJ1ZmZlcihzb3VyY2UuaW5pdC5idWZmZXIuYnVmZmVyKTtcbiAgICAgICAgICAgIHNvdXJjZS5pbml0ZWQgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc291cmNlKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHNvdXJjZS5kYXRhLnNoaWZ0KClcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgIHNvdXJjZUJ1ZmZlci5hcHBlbmRCdWZmZXIoZGF0YS5idWZmZXIuYnVmZmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBlbmRPZlN0cmVhbSAoKSB7XG4gICAgaWYgKHRoaXMubWVkaWFTb3VyY2UucmVhZHlTdGF0ZSA9PT0gJ29wZW4nKSB7XG4gICAgICB0aGlzLm1lZGlhU291cmNlLmVuZE9mU3RyZWFtKClcbiAgICB9XG4gIH1cblxuICByZW1vdmUgKGVuZCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKS5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGJ1ZmZlciA9IHRoaXMuc291cmNlQnVmZmVyc1tPYmplY3Qua2V5cyh0aGlzLnNvdXJjZUJ1ZmZlcnMpW2ldXTtcbiAgICAgIGlmICghYnVmZmVyLnVwZGF0aW5nKSB7XG4gICAgICAgIGJ1ZmZlci5yZW1vdmUoMCwgZW5kKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgdGhpcy5vblRpbWVVcGRhdGUpO1xuICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3dhaXRpbmcnLCB0aGlzLm9uV2FpdGluZyk7XG4gICAgdGhpcy5tZWRpYVNvdXJjZS5yZW1vdmVFdmVudExpc3RlbmVyKCdzb3VyY2VvcGVuJywgdGhpcy5vblNvdXJjZU9wZW4pO1xuICAgIHRoaXMuY29uZmlncyA9IHt9O1xuICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgICB0aGlzLm1lZGlhU291cmNlID0gbnVsbDtcbiAgICB0aGlzLnNvdXJjZUJ1ZmZlcnMgPSB7fTtcbiAgICB0aGlzLnByZWxvYWRUaW1lID0gMTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE9iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycykubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBidWZmZXIgPSB0aGlzLnNvdXJjZUJ1ZmZlcnNbT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKVtpXV07XG4gICAgICBidWZmZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndXBkYXRlZW5kJywgdGhpcy5vblVwZGF0ZUVuZCk7XG4gICAgICB0aGlzLm1lZGlhU291cmNlLnJlbW92ZVNvdXJjZUJ1ZmZlcihidWZmZXIpO1xuICAgICAgZGVsZXRlIHRoaXMuc291cmNlQnVmZmVyc1tPYmplY3Qua2V5cyh0aGlzLnNvdXJjZUJ1ZmZlcnMpW2ldXTtcbiAgICB9XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IE1TRTtcbiIsImltcG9ydCBDb25jYXQgZnJvbSAnY29uY2F0LXR5cGVkLWFycmF5J1xuXG5jbGFzcyBCdWZmZXIge1xuICBjb25zdHJ1Y3RvciAoYnVmZmVyKSB7XG4gICAgdGhpcy5idWZmZXIgPSBidWZmZXIgfHwgbmV3IFVpbnQ4QXJyYXkoMClcbiAgfVxuXG4gIHdyaXRlICguLi5idWZmZXIpIHtcbiAgICBidWZmZXIuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHRoaXMuYnVmZmVyID0gQ29uY2F0KFVpbnQ4QXJyYXksIHRoaXMuYnVmZmVyLCBpdGVtKVxuICAgIH0pXG4gIH1cblxuICBzdGF0aWMgd3JpdGVVaW50MzIgKHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFtcbiAgICAgIHZhbHVlID4+IDI0LFxuICAgICAgKHZhbHVlID4+IDE2KSAmIDB4ZmYsXG4gICAgICAodmFsdWUgPj4gOCkgJiAweGZmLFxuICAgICAgdmFsdWUgJiAweGZmXG4gICAgXSlcbiAgfVxuXG4gIHN0YXRpYyByZWFkQXNJbnQgKGFycikge1xuICAgIGxldCB0ZW1wID0gJydcblxuICAgIGZ1bmN0aW9uIHBhZFN0YXJ0NEhleCAoaGV4TnVtKSB7XG4gICAgICBsZXQgaGV4U3RyID0gaGV4TnVtLnRvU3RyaW5nKDE2KVxuICAgICAgcmV0dXJuIGhleFN0ci5wYWRTdGFydCgyLCAnMCcpXG4gICAgfVxuXG4gICAgYXJyLmZvckVhY2gobnVtID0+IHtcbiAgICAgIHRlbXAgKz0gcGFkU3RhcnQ0SGV4KG51bSlcbiAgICB9KVxuICAgIHJldHVybiBwYXJzZUludCh0ZW1wLCAxNilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCdWZmZXJcbiIsImNsYXNzIFN0cmVhbSB7XG4gIGNvbnN0cnVjdG9yIChidWZmZXIpIHtcbiAgICBpZiAoYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICAgIHRoaXMuYnVmZmVyID0gYnVmZmVyO1xuICAgICAgdGhpcy5kYXRhdmlldyA9IG5ldyBEYXRhVmlldyhidWZmZXIpO1xuICAgICAgdGhpcy5kYXRhdmlldy5wb3NpdGlvbiA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZGF0YSBpcyBpbnZhbGlkJyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGxlbmd0aCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGg7XG4gIH1cblxuICBzZXQgcG9zaXRpb24gKHZhbHVlKSB7XG4gICAgdGhpcy5kYXRhdmlldy5wb3NpdGlvbiA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHBvc2l0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhdmlldy5wb3NpdGlvbjtcbiAgfVxuXG4gIGJhY2sgKGNvdW50KSB7XG4gICAgdGhpcy5wb3NpdGlvbiAtPSBjb3VudDtcbiAgfVxuXG4gIHNraXAgKGNvdW50KSB7XG4gICAgbGV0IGxvb3AgPSBNYXRoLmZsb29yKGNvdW50IC8gNCk7XG4gICAgbGV0IGxhc3QgPSBjb3VudCAlIDQ7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb29wOyBpKyspIHtcbiAgICAgIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCA0KTtcbiAgICB9XG4gICAgaWYgKGxhc3QgPiAwKSB7XG4gICAgICBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgbGFzdCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFtyZWFkQnl0ZSDku45EYXRhVmlld+S4reivu+WPluaVsOaNrl1cbiAgICogQHBhcmFtICB7RGF0YVZpZXd9IGJ1ZmZlciBbRGF0YVZpZXflrp7kvotdXG4gICAqIEBwYXJhbSAge051bWJlcn0gc2l6ZSAgIFvor7vlj5blrZfoioLmlbBdXG4gICAqIEByZXR1cm4ge051bWJlcn0gICAgICAgIFvmlbTmlbBdXG4gICAqL1xuICBzdGF0aWMgcmVhZEJ5dGUgKGJ1ZmZlciwgc2l6ZSwgc2lnbikge1xuICAgIGxldCByZXM7XG4gICAgc3dpdGNoIChzaXplKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGlmIChzaWduKSB7XG4gICAgICAgICAgcmVzID0gYnVmZmVyLmdldEludDgoYnVmZmVyLnBvc2l0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXMgPSBidWZmZXIuZ2V0VWludDgoYnVmZmVyLnBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaWYgKHNpZ24pIHtcbiAgICAgICAgICByZXMgPSBidWZmZXIuZ2V0SW50MTYoYnVmZmVyLnBvc2l0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXMgPSBidWZmZXIuZ2V0VWludDE2KGJ1ZmZlci5wb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGlmIChzaWduKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3Qgc3VwcG9ydGVkIGZvciByZWFkQnl0ZSAzJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzID0gYnVmZmVyLmdldFVpbnQ4KGJ1ZmZlci5wb3NpdGlvbikgPDwgMTY7XG4gICAgICAgICAgcmVzIHw9IGJ1ZmZlci5nZXRVaW50OChidWZmZXIucG9zaXRpb24gKyAxKSA8PCA4O1xuICAgICAgICAgIHJlcyB8PSBidWZmZXIuZ2V0VWludDgoYnVmZmVyLnBvc2l0aW9uICsgMik7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIGlmIChzaWduKSB7XG4gICAgICAgICAgcmVzID0gYnVmZmVyLmdldEludDMyKGJ1ZmZlci5wb3NpdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzID0gYnVmZmVyLmdldFVpbnQzMihidWZmZXIucG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA4OlxuICAgICAgICBpZiAoc2lnbikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IHN1cHBvcnRlZCBmb3IgcmVhZEJvZHkgOCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRVaW50MzIoYnVmZmVyLnBvc2l0aW9uKSA8PCAzMjtcbiAgICAgICAgICByZXMgfD0gYnVmZmVyLmdldFVpbnQzMihidWZmZXIucG9zaXRpb24gKyA0KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJlcyA9ICcnO1xuICAgIH1cbiAgICBidWZmZXIucG9zaXRpb24gKz0gc2l6ZTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgcmVhZFVpbnQ4ICgpIHtcbiAgICByZXR1cm4gU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIDEpO1xuICB9XG5cbiAgcmVhZFVpbnQxNiAoKSB7XG4gICAgcmV0dXJuIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCAyKTtcbiAgfVxuXG4gIHJlYWRVaW50MjQgKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgMyk7XG4gIH1cblxuICByZWFkVWludDMyICgpIHtcbiAgICByZXR1cm4gU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIDQpO1xuICB9XG5cbiAgcmVhZFVpbnQ2NCAoKSB7XG4gICAgcmV0dXJuIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCA4KTtcbiAgfVxuXG4gIHJlYWRJbnQ4ICgpIHtcbiAgICByZXR1cm4gU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIDEsIHRydWUpO1xuICB9XG4gIHJlYWRJbnQxNiAoKSB7XG4gICAgcmV0dXJuIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCAyLCB0cnVlKTtcbiAgfVxuXG4gIHJlYWRJbnQzMiAoKSB7XG4gICAgcmV0dXJuIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCA0LCB0cnVlKTtcbiAgfVxuXG4gIHdyaXRlVWludDMyICh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgVWludDhBcnJheShbXG4gICAgICB2YWx1ZSA+Pj4gMjQgJiAweGZmLFxuICAgICAgdmFsdWUgPj4+IDE2ICYgMHhmZixcbiAgICAgIHZhbHVlID4+PiA4ICYgMHhmZixcbiAgICAgIHZhbHVlICYgMHhmZlxuICAgIF0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0cmVhbTtcbiIsImltcG9ydCB7IEZldGNoTG9hZGVyIH0gZnJvbSAneGdwbGF5ZXItbG9hZGVyJ1xuaW1wb3J0IHsgRmx2RGVtdXhlciB9IGZyb20gJ3hncGxheWVyLWRlbXV4J1xuaW1wb3J0IHsgTXA0UmVtdXhlciB9IGZyb20gJ3hncGxheWVyLXJlbXV4J1xuaW1wb3J0IHsgVHJhY2tzLCBYZ0J1ZmZlciwgUHJlU291cmNlIH0gZnJvbSAneGdwbGF5ZXItYnVmZmVyJ1xuaW1wb3J0IHsgRVZFTlRTLCBNb2JpbGVWaWRlbyB9IGZyb20gJ3hncGxheWVyLXV0aWxzJ1xuaW1wb3J0IHsgQ29tcGF0aWJpbGl0eSB9IGZyb20gJ3hncGxheWVyLWNvZGVjJ1xuaW1wb3J0IFBsYXllciBmcm9tICd4Z3BsYXllcidcblxuY29uc3QgREVNVVhfRVZFTlRTID0gRVZFTlRTLkRFTVVYX0VWRU5UUztcbmNvbnN0IExPQURFUl9FVkVOVFMgPSBFVkVOVFMuTE9BREVSX0VWRU5UU1xuY29uc3QgUkVNVVhfRVZFTlRTID0gRVZFTlRTLlJFTVVYX0VWRU5UU1xuXG5jb25zdCBUYWcgPSAnRkxWQ29udHJvbGxlcidcblxuY2xhc3MgTG9nZ2VyIHtcbiAgd2FybiAoKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbHZDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IgKHBsYXllcikge1xuICAgIHRoaXMuVEFHID0gVGFnXG4gICAgdGhpcy5fcGxheWVyID0gcGxheWVyXG5cbiAgICAvLyBUT0RPIOS4tOaXtuaMgueahCDpnIDopoHlpITnkIbliLBQbGF5ZXLlsYJcbiAgICAvLyB0aGlzLnZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbW9iaWxlLXZpZGVvJyk7XG4gICAgdGhpcy5fcGxheWVyLnZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbW9iaWxlLXZpZGVvJyk7XG4gICAgdGhpcy52aWRlbyA9IHRoaXMuX3BsYXllci52aWRlbztcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaW5pdFNlZ21lbnRBcnJpdmVkOiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIHRoaXMuX2NvbnRleHQucmVnaXN0cnkoJ0ZFVENIX0xPQURFUicsIEZldGNoTG9hZGVyKVxuICAgIHRoaXMuX2NvbnRleHQucmVnaXN0cnkoJ0xPQURFUl9CVUZGRVInLCBYZ0J1ZmZlcilcbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdQUkVfU09VUkNFX0JVRkZFUicsIFByZVNvdXJjZSlcblxuICAgIHRoaXMuX2NvbnRleHQucmVnaXN0cnkoJ0ZMVl9ERU1VWEVSJywgRmx2RGVtdXhlcilcblxuICAgIHRoaXMuX2NvbnRleHQucmVnaXN0cnkoJ01QNF9SRU1VWEVSJywgTXA0UmVtdXhlcilcbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdUUkFDS1MnLCBUcmFja3MpXG5cbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdDT01QQVRJQklMSVRZJywgQ29tcGF0aWJpbGl0eSlcblxuICAgIHRoaXMuX2NvbnRleHQucmVnaXN0cnkoJ0xPR0dFUicsIExvZ2dlcilcblxuICAgIHRoaXMuaW5pdExpc3RlbmVycygpXG4gIH1cblxuICBpbml0TGlzdGVuZXJzICgpIHtcbiAgICB0aGlzLm9uKExPQURFUl9FVkVOVFMuTE9BREVSX0RBVEFMT0FERUQsIHRoaXMuX2hhbmRsZUxvYWRlckRhdGFMb2FkZWQuYmluZCh0aGlzKSlcbiAgICB0aGlzLm9uKExPQURFUl9FVkVOVFMuTE9BREVSX0VSUk9SLCB0aGlzLl9oYW5kbGVOZXR3b3JrRXJyb3IuYmluZCh0aGlzKSlcblxuICAgIHRoaXMub24oREVNVVhfRVZFTlRTLk1FRElBX0lORk8sIHRoaXMuX2hhbmRsZU1lZGlhSW5mby5iaW5kKHRoaXMpKVxuICAgIHRoaXMub24oREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgdGhpcy5faGFuZGxlTWV0YWRhdGFQYXJzZWQuYmluZCh0aGlzKSlcbiAgICB0aGlzLm9uKERFTVVYX0VWRU5UUy5ERU1VWF9DT01QTEVURSwgdGhpcy5faGFuZGxlRGVtdXhDb21wbGV0ZS5iaW5kKHRoaXMpKVxuICAgIHRoaXMub24oREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLl9oYW5kbGVEZW11eEVycm9yLmJpbmQodGhpcykpXG5cbiAgfVxuXG4gIF9oYW5kbGVNZWRpYUluZm8gKCkge1xuICAgIGlmICghdGhpcy5fY29udGV4dC5tZWRpYUluZm8pIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIG5ldyBFcnJvcignZmFpbGVkIHRvIGdldCBtZWRpYWluZm8nKSlcbiAgICB9XG4gIH1cblxuICBfaGFuZGxlTG9hZGVyRGF0YUxvYWRlZCAoKSB7XG4gICAgdGhpcy5lbWl0VG8oJ0ZMVl9ERU1VWEVSJywgREVNVVhfRVZFTlRTLkRFTVVYX1NUQVJUKVxuICB9XG5cbiAgX2hhbmRsZU1ldGFkYXRhUGFyc2VkICh0eXBlKSB7XG4gICAgaWYgKHR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgIC8vIOWwhumfs+mikW1ldGHkv6Hmga/kuqTnu5lhdWRpb0NvbnRleHTvvIzkuI3otbByZW11eOWwgeijhVxuICAgICAgY29uc3QgeyBhdWRpb1RyYWNrIH0gPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKVxuICAgICAgaWYgKGF1ZGlvVHJhY2sgJiYgYXVkaW9UcmFjay5tZXRhKSB7XG4gICAgICAgIHRoaXMuX3NldE1ldGFUb0F1ZGlvKGF1ZGlvVHJhY2subWV0YSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgeyB2aWRlb1RyYWNrIH0gPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKVxuICAgICAgaWYgKHZpZGVvVHJhY2sgJiYgdmlkZW9UcmFjay5tZXRhKSB7XG4gICAgICAgIHRoaXMuX3NldE1ldGFUb1ZpZGVvKHZpZGVvVHJhY2subWV0YSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfaGFuZGxlRGVtdXhDb21wbGV0ZSAoKSB7XG4gICAgaWYodGhpcy5fcGxheWVyLnZpZGVvKSB7XG4gICAgICBjb25zdCB7IHZpZGVvVHJhY2ssIGF1ZGlvVHJhY2sgfSA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpO1xuICAgICAgdGhpcy5fcGxheWVyLnZpZGVvLm9uRGVtdXhDb21wbGV0ZSh2aWRlb1RyYWNrLCBhdWRpb1RyYWNrKTtcbiAgICB9XG4gIH1cblxuICBfaGFuZGxlQXBwZW5kSW5pdFNlZ21lbnQgKCkge1xuICAgIHRoaXMuc3RhdGUuaW5pdFNlZ21lbnRBcnJpdmVkID0gdHJ1ZVxuICAvLyAgdGhpcy5tc2UuYWRkU291cmNlQnVmZmVycygpXG4gIH1cblxuXG4gIF9oYW5kbGVOZXR3b3JrRXJyb3IgKCkge1xuICAgIHRoaXMuX3BsYXllci5lbWl0KCdlcnJvcicsIG5ldyBQbGF5ZXIuRXJyb3JzKCduZXR3b3JrJywgdGhpcy5fcGxheWVyLmNvbmZpZy51cmwpKVxuICB9XG5cbiAgX2hhbmRsZURlbXV4RXJyb3IgKCkge1xuICAgIHRoaXMuX3BsYXllci5lbWl0KCdlcnJvcicsIG5ldyBQbGF5ZXIuRXJyb3JzKCdwYXJzZScsIHRoaXMuX3BsYXllci5jb25maWcudXJsKSlcbiAgfVxuXG4gXG4gIF9zZXRNZXRhVG9BdWRpbyAoYXVkaW9NZXRhKSB7XG4gICAgaWYgKHRoaXMuX3BsYXllci52aWRlbykge1xuICAgICAgdGhpcy5fcGxheWVyLnZpZGVvLnNldEF1ZGlvTWV0YShhdWRpb01ldGEpO1xuICAgIH1cbiAgfVxuXG4gIF9zZXRNZXRhVG9WaWRlbyAodmlkZW9NZXRhKSB7XG4gICAgaWYgKHRoaXMuX3BsYXllci52aWRlbykge1xuICAgICAgdGhpcy5fcGxheWVyLnZpZGVvLnNldFZpZGVvTWV0YSh2aWRlb01ldGEpO1xuICAgIH1cbiAgfVxuXG4gIHNlZWsgKCkge1xuICAgIGlmICghdGhpcy5zdGF0ZS5pbml0U2VnbWVudEFycml2ZWQpIHtcbiAgICAgIHRoaXMubG9hZERhdGEoKVxuICAgIH1cbiAgfVxuXG4gIGxvYWREYXRhICgpIHtcbiAgICB0aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MQURFUl9TVEFSVCwgdGhpcy5fcGxheWVyLmNvbmZpZy51cmwpXG4gIH1cblxuICBwYXVzZSAoKSB7XG4gICAgY29uc3QgbG9hZGVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnRkVUQ0hfTE9BREVSJylcblxuICAgIGlmIChsb2FkZXIpIHtcbiAgICAgIGxvYWRlci5jYW5jZWwoKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDkv53or4HlvZPliY3mkq3mlL7nmoTop4bpopHku6Vnb3DkuLrljZXkvY1cbiAgICogQHBhcmFtIHZpZGVvVHJhY2tcbiAgICovXG4gIHN0YXRpYyByZXNvbHZlVmlkZW9HT1AgKHZpZGVvVHJhY2spIHtcbiAgICBjb25zdCB7IHNhbXBsZXMgfSA9IHZpZGVvVHJhY2s7XG4gICAgaWYgKCFzYW1wbGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBmaXJzdElmcmFtZUlkeCA9IG51bGxcbiAgICBsZXQgbGFzdElmcmFtZUlkeCA9IG51bGxcblxuICAgIGlmICh2aWRlb1RyYWNrLnRlbXBTYW1wbGVzICYmIHZpZGVvVHJhY2sudGVtcFNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICAvLyDlsIbnvJPlrZjluKfmlL7nva7liLDpmJ/liJfnmoTlpLTpg6hcbiAgICAgIHNhbXBsZXMudW5zaGlmdC5hcHBseShzYW1wbGVzLCB2aWRlb1RyYWNrLnRlbXBTYW1wbGVzKTtcbiAgICB9XG5cbiAgICAvLyDlr7vmib7nrKzkuIDkuKpJ5binXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNhbXBsZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSBzYW1wbGVzW2ldO1xuICAgICAgaWYgKGN1cnJlbnQuaXNLZXlmcmFtZSkge1xuICAgICAgICBmaXJzdElmcmFtZUlkeCA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIOWvu+aJvuacgOWQjuS4gOS4qknluKdcbiAgICBmb3IgKGxldCBpID0gc2FtcGxlcy5sZW5ndGggLSAxOyBpID4gMDsgaSsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50ID0gc2FtcGxlc1tpXVxuXG4gICAgICBpZiAoY3VycmVudC5pc0tleWZyYW1lKSB7XG4gICAgICAgIGxhc3RJZnJhbWVJZHggPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZmlyc3RJZnJhbWVJZHggIT09IDApIHtcbiAgICAgIHNhbXBsZXMuc3BsaWNlKDAsIGZpcnN0SWZyYW1lSWR4IC0gMSlcbiAgICB9XG5cbiAgICB2aWRlb1RyYWNrLnNhbXBsZXMgPSBzYW1wbGVzLnNsaWNlKDAsIGxhc3RJZnJhbWVJZHgpXG4gICAgY29uc3QgcmVzdCA9IHNhbXBsZXMuc2xpY2UobGFzdElmcmFtZUlkeClcbiAgICBpZiAodmlkZW9UcmFjay50ZW1wU2FtcGxlcykge1xuICAgICAgdmlkZW9UcmFjay50ZW1wU2FtcGxlcy5wdXNoLmFwcGx5KHZpZGVvVHJhY2sudGVtcFNhbXBsZXMsIHJlc3QpXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOWwhuWJqeS4i+eahOW4p+e8k+WtmO+8jOetieW+heS4gOS4quWujOaVtOeahGdvcFxuICAgICAgdmlkZW9UcmFjay50ZW1wU2FtcGxlcyA9IHJlc3RcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQbGF5ZXIgZnJvbSAneGdwbGF5ZXInXG5pbXBvcnQgeyBDb250ZXh0LCBFVkVOVFMgfSBmcm9tICd4Z3BsYXllci11dGlscyc7XG5pbXBvcnQgRkxWIGZyb20gJy4vZmx2LWxpdmUtbW9iaWxlJ1xuY29uc3QgZmx2QWxsb3dlZEV2ZW50cyA9IEVWRU5UUy5GbHZBbGxvd2VkRXZlbnRzO1xuXG5jbGFzcyBGbHZQbGF5ZXIgZXh0ZW5kcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvciAoY29uZmlnKSB7XG4gICAgc3VwZXIoY29uZmlnKVxuICAgIHRoaXMuY29udGV4dCA9IG5ldyBDb250ZXh0KGZsdkFsbG93ZWRFdmVudHMpXG4gICAgdGhpcy5pbml0RXZlbnRzKClcbiAgfVxuXG4gIHN0YXJ0ICgpIHtcbiAgICB0aGlzLmluaXRGbHYoKVxuICAgIHRoaXMuY29udGV4dC5pbml0KClcbiAgICB0aGlzLmZsdi5zZWVrKDApO1xuICAgIHN1cGVyLnN0YXJ0KHRoaXMuY29uZmlnLnVybCk7XG4gICAgdGhpcy5wbGF5KCk7XG4gIH1cblxuICBpbml0Rmx2RXZlbnRzIChmbHYpIHtcbiAgICBjb25zdCBwbGF5ZXIgPSB0aGlzO1xuICAgIGZsdi5vbmNlKEVWRU5UUy5SRU1VWF9FVkVOVFMuSU5JVF9TRUdNRU5ULCAoKSA9PiB7XG4gICAgICBQbGF5ZXIudXRpbC5hZGRDbGFzcyhwbGF5ZXIucm9vdCwgJ3hncGxheWVyLWlzLWxpdmUnKVxuICAgICAgaWYgKCFQbGF5ZXIudXRpbC5maW5kRG9tKHRoaXMucm9vdCwgJ3hnLWxpdmUnKSkge1xuICAgICAgICBjb25zdCBsaXZlID0gUGxheWVyLnV0aWwuY3JlYXRlRG9tKCd4Zy1saXZlJywgJ+ato+WcqOebtOaSrScsIHt9LCAneGdwbGF5ZXItbGl2ZScpXG4gICAgICAgIHBsYXllci5jb250cm9scy5hcHBlbmRDaGlsZChsaXZlKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBmbHYub25jZShFVkVOVFMuTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsICgpID0+IHtcbiAgICAgIC8vIOebtOaSreWujOaIkO+8jOW+heaSreaUvuWZqOaSreWujOe8k+WtmOWQjuWPkemAgeWFs+mXreS6i+S7tlxuICAgICAgaWYgKCFwbGF5ZXIucGF1c2VkKSB7XG4gICAgICAgIGNvbnN0IHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGVuZCA9IHBsYXllci5nZXRCdWZmZXJlZFJhbmdlKClbMV1cbiAgICAgICAgICBpZiAoTWF0aC5hYnMocGxheWVyLmN1cnJlbnRUaW1lIC0gZW5kKSA8IDAuNSkge1xuICAgICAgICAgICAgcGxheWVyLmVtaXQoJ2VuZGVkJylcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgMjAwKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBpbml0RXZlbnRzICgpIHtcbiAgICB0aGlzLm9uKCd0aW1ldXBkYXRlJywgKCkgPT4ge1xuICAgICAgdGhpcy5sb2FkRGF0YSgpXG4gICAgfSlcblxuICAgIHRoaXMub24oJ3NlZWtpbmcnLCAoKSA9PiB7XG4gICAgICBjb25zdCB0aW1lID0gdGhpcy5jdXJyZW50VGltZVxuICAgICAgY29uc3QgcmFuZ2UgPSB0aGlzLmdldEJ1ZmZlcmVkUmFuZ2UoKVxuICAgICAgaWYgKHRpbWUgPiByYW5nZVsxXSB8fCB0aW1lIDwgcmFuZ2VbMF0pIHtcbiAgICAgICAgdGhpcy5mbHYuc2Vlayh0aGlzLmN1cnJlbnRUaW1lKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBpbml0Rmx2ICgpIHtcbiAgICBjb25zdCBmbHYgPSB0aGlzLmNvbnRleHQucmVnaXN0cnkoJ0ZMVl9DT05UUk9MTEVSJywgRkxWKSh0aGlzKVxuICAgIHRoaXMuaW5pdEZsdkV2ZW50cyhmbHYpXG4gICAgdGhpcy5mbHYgPSBmbHZcbiAgfVxuXG4gIHBsYXkgKCkge1xuICAgIGNvbnNvbGUubG9nKCdwbGF5Jyk7XG4gICAgaWYgKHRoaXMuX2hhc1N0YXJ0KSB7XG4gICAgICB0aGlzLl9kZXN0cm95KClcbiAgICAgIHRoaXMuY29udGV4dCA9IG5ldyBDb250ZXh0KGZsdkFsbG93ZWRFdmVudHMpXG4gICAgICBjb25zdCBmbHYgPSB0aGlzLmNvbnRleHQucmVnaXN0cnkoJ0ZMVl9DT05UUk9MTEVSJywgRkxWKSh0aGlzKVxuICAgICAgdGhpcy5pbml0Rmx2RXZlbnRzKGZsdilcbiAgICAgIHRoaXMuZmx2ID0gZmx2XG4gICAgICB0aGlzLmNvbnRleHQuaW5pdCgpXG4gICAgICBzdXBlci5zdGFydChmbHYubXNlLnVybClcbiAgICAgIHN1cGVyLnBsYXkoKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5wbGF5KClcbiAgICB9XG4gIH1cblxuICBwYXVzZSAoKSB7XG4gICAgc3VwZXIucGF1c2UoKVxuICAgIGlmICh0aGlzLmZsdikge1xuICAgICAgdGhpcy5mbHYucGF1c2UoKVxuICAgIH1cbiAgfVxuXG4gIGxvYWREYXRhICh0aW1lID0gdGhpcy5jdXJyZW50VGltZSkge1xuICAgIGlmICh0aGlzLmZsdikge1xuICAgICAgdGhpcy5mbHYuc2Vlayh0aW1lKVxuICAgIH1cbiAgfVxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLl9kZXN0cm95KClcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gIH1cblxuICBfZGVzdHJveSAoKSB7XG4gICAgdGhpcy5jb250ZXh0LmRlc3Ryb3koKVxuICAgIHRoaXMuZmx2ID0gbnVsbFxuICAgIHRoaXMuY29udGV4dCA9IG51bGxcbiAgfVxuXG4gIGdldCBzcmMgKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRTcmNcbiAgfVxuXG4gIHNldCBzcmMgKHVybCkge1xuICAgIHRoaXMucGxheWVyLmNvbmZpZy51cmwgPSB1cmxcbiAgICBpZiAoIXRoaXMucGF1c2VkKSB7XG4gICAgICB0aGlzLnBhdXNlKClcbiAgICAgIHRoaXMub25jZSgncGF1c2UnLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3RhcnQodXJsKVxuICAgICAgfSlcbiAgICAgIHRoaXMub25jZSgnY2FucGxheScsICgpID0+IHtcbiAgICAgICAgdGhpcy5wbGF5KClcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhcnQodXJsKVxuICAgIH1cbiAgICB0aGlzLm9uY2UoJ2NhbnBsYXknLCAoKSA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRUaW1lID0gMFxuICAgIH0pXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGbHZQbGF5ZXJcbiIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJQbGF5ZXJcIl07IH0oKSk7Il0sInNvdXJjZVJvb3QiOiIifQ==