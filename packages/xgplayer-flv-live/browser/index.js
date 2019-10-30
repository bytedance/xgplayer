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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../node_modules/events/events.js":
/*!**********************************************************************************!*\
  !*** /Users/jiangyuqing/Desktop/Projects/xgplayer/node_modules/events/events.js ***!
  \**********************************************************************************/
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
    console.log('fix large gap');
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
  HlsAllowedEvents,
  CRYTO_EVENTS
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

Decoder.prototype.broadwayOnPictureDecoded = function (offset, width, height, infoid) {
  let info = Object.assign({}, this.infolist[infoid]);
  let ref = 3;
  if (this.meta.chromaFormat === 420) {
    ref = 1.5;
  } else if (this.meta.chromaFormat === 422) {
    ref = 2;
  }
  let data = this.toU8Array(offset, width * height * ref);
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

function init(meta) {
  self.importScripts('https://sf6-vcloudcdn.pstatp.com/obj/ttfe/media/decoder/h264/decoder.js');
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
    this.canvas.width = 1280;
    this.canvas.height = 720;
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

  _drawPictureGL(data, width, height) {
    let nWidth = width;
    var ylen = width * height;
    var uvlen = ylen / 4;
    if (this.chroma === 422) {
      uvlen = ylen / 2;
    } else if (this.chroma === 444) {
      uvlen = ylen;
    }
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

    if (this.chroma === 422 || this.chroma === 444) {
      uRowCnt = height;
    }
    if (this.chroma === 444) {
      uDataPerRow = width;
    }
    var vDataPerRow = uDataPerRow;
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

/***/ "./src/flv-live.js":
/*!*************************!*\
  !*** ./src/flv-live.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xgplayerRemux = __webpack_require__(/*! xgplayer-remux */ "../xgplayer-remux/index.js");

var _xgplayerRemux2 = _interopRequireDefault(_xgplayerRemux);

var _xgplayerLoader = __webpack_require__(/*! xgplayer-loader */ "../xgplayer-loader/index.js");

var _xgplayerDemux = __webpack_require__(/*! xgplayer-demux */ "../xgplayer-demux/index.js");

var _xgplayerBuffer = __webpack_require__(/*! xgplayer-buffer */ "../xgplayer-buffer/index.js");

var _xgplayerUtils = __webpack_require__(/*! xgplayer-utils */ "../xgplayer-utils/index.js");

var _xgplayerCodec = __webpack_require__(/*! xgplayer-codec */ "../xgplayer-codec/index.js");

var _xgplayer = __webpack_require__(/*! xgplayer */ "xgplayer");

var _xgplayer2 = _interopRequireDefault(_xgplayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const REMUX_EVENTS = _xgplayerUtils.EVENTS.REMUX_EVENTS;
const DEMUX_EVENTS = _xgplayerUtils.EVENTS.DEMUX_EVENTS;
const LOADER_EVENTS = _xgplayerUtils.EVENTS.LOADER_EVENTS;
const MSE_EVENTS = _xgplayerUtils.EVENTS.MSE_EVENTS;

const Tag = 'FLVController';

class Logger {
  warn() {}
}

const FLV_ERROR = 'FLV_ERROR';

class FlvController {
  constructor(player) {
    this.TAG = Tag;
    this._player = player;

    this.state = {
      initSegmentArrived: false
    };

    this.bufferClearTimer = null;
  }

  init() {
    this._context.registry('FETCH_LOADER', _xgplayerLoader.FetchLoader);
    this._context.registry('LOADER_BUFFER', _xgplayerBuffer.XgBuffer);

    this._context.registry('FLV_DEMUXER', _xgplayerDemux.FlvDemuxer);
    this._context.registry('TRACKS', _xgplayerBuffer.Tracks);

    this._context.registry('MP4_REMUXER', _xgplayerRemux2.default.Mp4Remuxer);
    this._context.registry('PRE_SOURCE_BUFFER', _xgplayerBuffer.PreSource);

    if (this._player.config.compatibility !== false) {
      this._context.registry('COMPATIBILITY', _xgplayerCodec.Compatibility);
    }

    this._context.registry('LOGGER', Logger);
    this.mse = this._context.registry('MSE', _xgplayerUtils.Mse)({ container: this._player.video });

    this._handleTimeUpdate = this._handleTimeUpdate.bind(this);

    this.initListeners();
  }

  initListeners() {
    this.on(LOADER_EVENTS.LOADER_DATALOADED, this._handleLoaderDataLoaded.bind(this));
    this.on(LOADER_EVENTS.LOADER_ERROR, this._handleNetworkError.bind(this));

    this.on(DEMUX_EVENTS.MEDIA_INFO, this._handleMediaInfo.bind(this));
    this.on(DEMUX_EVENTS.METADATA_PARSED, this._handleMetadataParsed.bind(this));
    this.on(DEMUX_EVENTS.DEMUX_COMPLETE, this._handleDemuxComplete.bind(this));
    this.on(DEMUX_EVENTS.DEMUX_ERROR, this._handleDemuxError.bind(this));

    this.on(REMUX_EVENTS.INIT_SEGMENT, this._handleAppendInitSegment.bind(this));
    this.on(REMUX_EVENTS.MEDIA_SEGMENT, this._handleMediaSegment.bind(this));

    this.on(MSE_EVENTS.SOURCE_UPDATE_END, this._handleSourceUpdateEnd.bind(this));

    this._player.on('timeupdate', this._handleTimeUpdate);
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
    this.emit(REMUX_EVENTS.REMUX_METADATA, type);
  }
  _handleDemuxComplete() {
    this.emit(REMUX_EVENTS.REMUX_MEDIA);
  }

  _handleAppendInitSegment() {
    this.state.initSegmentArrived = true;
    this.mse.addSourceBuffers();
  }

  _handleMediaSegment() {
    this.mse.addSourceBuffers();
    this.mse.doAppend();
  }

  _handleSourceUpdateEnd() {
    const time = this._player.currentTime;
    const video = this._player.video;
    const preloadTime = this._player.config.preloadTime || 5;

    const { length } = video.buffered;

    if (length === 0) {
      return;
    }

    const bufferEnd = video.buffered.end(length - 1);
    if (bufferEnd - time > preloadTime * 2) {
      this._player.currentTime = bufferEnd - preloadTime;
    }
    this.mse.doAppend();
  }

  _handleTimeUpdate() {
    const time = this._player.currentTime;

    const video = this._player.video;
    let buffered = video.buffered;

    if (!buffered || !buffered.length) {
      return;
    }

    const bufferStart = buffered.start(buffered.length - 1);
    // const bufferStart = this._player.getBufferedRange()[0]
    if (time - bufferStart > 10) {
      // 在直播时及时清空buffer，降低直播内存占用
      if (this.bufferClearTimer) {
        return;
      }

      this.mse.remove(time - 1, bufferStart);
      this.bufferClearTimer = setTimeout(() => {
        this.bufferClearTimer = null;
      }, 5000);
    }
  }

  _handleNetworkError(tag, err) {
    this._player.emit('error', new _xgplayer2.default.Errors('network', this._player.config.url));
    this._onError(LOADER_EVENTS.LOADER_ERROR, tag, err, true);
  }

  _handleDemuxError(tag, err, fatal) {
    if (fatal === undefined) {
      fatal = false;
    }
    this._player.emit('error', new _xgplayer2.default.Errors('parse', this._player.config.url));
    this._onError(LOADER_EVENTS.LOADER_ERROR, tag, err, fatal);
  }

  _onError(type, mod, err, fatal) {
    let error = {
      errorType: type,
      errorDetails: `[${mod}]: ${err.message}`,
      errorFatal: fatal || false
    };
    this._player.emit(FLV_ERROR, error);
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

  destroy() {
    this._player.off('timeupdate', this._handleTimeUpdate);
    this._player = null;
    this.mse = null;
  }
}
exports.default = FlvController;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _xgplayer = __webpack_require__(/*! xgplayer */ "xgplayer");

var _xgplayer2 = _interopRequireDefault(_xgplayer);

var _xgplayerUtils = __webpack_require__(/*! xgplayer-utils */ "../xgplayer-utils/index.js");

var _flvLive = __webpack_require__(/*! ./flv-live */ "./src/flv-live.js");

var _flvLive2 = _interopRequireDefault(_flvLive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const flvAllowedEvents = _xgplayerUtils.EVENTS.FlvAllowedEvents;

class FlvPlayer extends _xgplayer2.default {
  constructor(config) {
    super(config);
    this.context = new _xgplayerUtils.Context(flvAllowedEvents);
    this.initEvents();
    this.loaderCompleteTimer = null;
    // const preloadTime = player.config.preloadTime || 15
  }

  start() {
    this.initFlv();
    this.context.init();
    super.start(this.flv.mse.url);
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
        this.loaderCompleteTimer = setInterval(() => {
          const end = player.getBufferedRange()[1];
          if (Math.abs(player.currentTime - end) < 0.5) {
            player.emit('ended');
            window.clearInterval(this.loaderCompleteTimer);
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
    const flv = this.context.registry('FLV_CONTROLLER', _flvLive2.default)(this);
    this.initFlvEvents(flv);
    this.flv = flv;
  }

  play() {
    if (this._hasStart) {
      this._destroy().then(() => {
        this.context = new _xgplayerUtils.Context(flvAllowedEvents);
        const flv = this.context.registry('FLV_CONTROLLER', _flvLive2.default)(this);
        this.initFlvEvents(flv);
        this.flv = flv;
        this.context.init();
        super.start(flv.mse.url);
        super.play();
      });
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
    this._destroy().then(() => {
      super.destroy();
    });
  }

  _destroy() {
    return this.flv.mse.destroy().then(() => {
      this.context.destroy();
      this.flv = null;
      this.context = null;
      if (this.loaderCompleteTimer) {
        window.clearInterval(this.loaderCompleteTimer);
      }
    });
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

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/index.js */"./src/index.js");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9GbHZQbGF5ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy9Vc2Vycy9qaWFuZ3l1cWluZy9EZXNrdG9wL1Byb2plY3RzL3hncGxheWVyL25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWJ1ZmZlci9zcmMvYnVmZmVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1idWZmZXIvc3JjL3ByZXNvdWNlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1idWZmZXIvc3JjL3RyYWNrLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1jb2RlYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItY29kZWMvc3JjL2FhYy9hYWMtaGVscGVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1jb2RlYy9zcmMvY29tcGF0aWJpbGl0eS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItY29kZWMvc3JjL2gyNjQvbmFsdW5pdC9nb2xvbWIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWNvZGVjL3NyYy9oMjY0L25hbHVuaXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWNvZGVjL3NyYy9oMjY0L25hbHVuaXQvc3BzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1kZW11eC9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItZGVtdXgvc3JjL2Zsdi9hbWYtcGFyc2VyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1kZW11eC9zcmMvZmx2L2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1kZW11eC9zcmMvaGxzL2RlbXV4ZXIvbTN1OHBhcnNlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItZGVtdXgvc3JjL2hscy9kZW11eGVyL3RzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1kZW11eC9zcmMvaGxzL3BsYXlsaXN0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1sb2FkZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWxvYWRlci9zcmMvZmV0Y2gtbG9hZGVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1yZW11eC9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItcmVtdXgvc3JjL21wNC9mbXA0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1yZW11eC9zcmMvbXA0L2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvbm9kZV9tb2R1bGVzL2NvbmNhdC10eXBlZC1hcnJheS9saWIvY29uY2F0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9ub2RlX21vZHVsZXMvY29uY2F0LXR5cGVkLWFycmF5L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvbm9kZV9tb2R1bGVzL3dlYndvcmtpZnktd2VicGFjay9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL2NvbnN0YW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9jb25zdGFudHMvd29ya2VyLWNvbW1hbmRzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvY29udGV4dC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL2NyeXB0by9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL2Vudi9pc2xlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvZW52L3NuaWZmZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9lbnYvdXRmOC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vYmlsZS9hdWRpby1jb250ZXh0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9iaWxlL21vYmlsZS12aWRlby5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vYmlsZS9zb3VyY2VidWZmZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2JpbGUvdGlja2VyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9iaWxlL3ZpZGVvLWNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2JpbGUvd29ya2VyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9iaWxlL3l1di1jYW52YXMuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2RlbHMvbWVkaWEtaW5mby5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vZGVscy9tZWRpYS1zYW1wbGUuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2RlbHMvbWVkaWEtc2VnbWVudC1saXN0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9kZWxzL21lZGlhLXNlZ21lbnQuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2RlbHMvdHJhY2stbWV0YS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vZGVscy90cmFjay1zYW1wbGUuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy93cml0ZS9idWZmZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy93cml0ZS9zdHJlYW0uanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL2Zsdi1saXZlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvZXh0ZXJuYWwgXCJQbGF5ZXJcIiJdLCJuYW1lcyI6WyJSIiwiUmVmbGVjdCIsIlJlZmxlY3RBcHBseSIsImFwcGx5IiwidGFyZ2V0IiwicmVjZWl2ZXIiLCJhcmdzIiwiRnVuY3Rpb24iLCJwcm90b3R5cGUiLCJjYWxsIiwiUmVmbGVjdE93bktleXMiLCJvd25LZXlzIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImNvbmNhdCIsIlByb2Nlc3NFbWl0V2FybmluZyIsIndhcm5pbmciLCJjb25zb2xlIiwid2FybiIsIk51bWJlcklzTmFOIiwiTnVtYmVyIiwiaXNOYU4iLCJ2YWx1ZSIsIkV2ZW50RW1pdHRlciIsImluaXQiLCJtb2R1bGUiLCJleHBvcnRzIiwiX2V2ZW50cyIsInVuZGVmaW5lZCIsIl9ldmVudHNDb3VudCIsIl9tYXhMaXN0ZW5lcnMiLCJkZWZhdWx0TWF4TGlzdGVuZXJzIiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0Iiwic2V0IiwiYXJnIiwiUmFuZ2VFcnJvciIsImdldFByb3RvdHlwZU9mIiwiY3JlYXRlIiwic2V0TWF4TGlzdGVuZXJzIiwibiIsIiRnZXRNYXhMaXN0ZW5lcnMiLCJ0aGF0IiwiZ2V0TWF4TGlzdGVuZXJzIiwiZW1pdCIsInR5cGUiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwicHVzaCIsImRvRXJyb3IiLCJldmVudHMiLCJlcnJvciIsImVyIiwiRXJyb3IiLCJlcnIiLCJtZXNzYWdlIiwiY29udGV4dCIsImhhbmRsZXIiLCJsZW4iLCJsaXN0ZW5lcnMiLCJhcnJheUNsb25lIiwiX2FkZExpc3RlbmVyIiwibGlzdGVuZXIiLCJwcmVwZW5kIiwibSIsImV4aXN0aW5nIiwiVHlwZUVycm9yIiwibmV3TGlzdGVuZXIiLCJ1bnNoaWZ0Iiwid2FybmVkIiwidyIsIlN0cmluZyIsIm5hbWUiLCJlbWl0dGVyIiwiY291bnQiLCJhZGRMaXN0ZW5lciIsIm9uIiwicHJlcGVuZExpc3RlbmVyIiwib25jZVdyYXBwZXIiLCJmaXJlZCIsInJlbW92ZUxpc3RlbmVyIiwid3JhcEZuIiwiX29uY2VXcmFwIiwic3RhdGUiLCJ3cmFwcGVkIiwiYmluZCIsIm9uY2UiLCJwcmVwZW5kT25jZUxpc3RlbmVyIiwibGlzdCIsInBvc2l0aW9uIiwib3JpZ2luYWxMaXN0ZW5lciIsInNoaWZ0Iiwic3BsaWNlT25lIiwib2ZmIiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwia2V5cyIsImtleSIsIl9saXN0ZW5lcnMiLCJ1bndyYXAiLCJldmxpc3RlbmVyIiwidW53cmFwTGlzdGVuZXJzIiwicmF3TGlzdGVuZXJzIiwibGlzdGVuZXJDb3VudCIsImV2ZW50TmFtZXMiLCJhcnIiLCJjb3B5IiwiQXJyYXkiLCJpbmRleCIsInBvcCIsInJldCIsIlRyYWNrIiwicmVxdWlyZSIsImRlZmF1bHQiLCJUcmFja3MiLCJBdWRpb1RyYWNrIiwiVmlkZW9UcmFjayIsIlhnQnVmZmVyIiwiUmVtdXhCdWZmZXIiLCJQcmVTb3VyY2UiLCJjb25zdHJ1Y3RvciIsImhpc3RvcnlMZW4iLCJhcnJheSIsIm9mZnNldCIsImRhdGEiLCJieXRlTGVuZ3RoIiwiVWludDhBcnJheSIsIl9zaGlmdEJ1ZmZlciIsInNsaWNlIiwidG1wb2ZmIiwidG1wIiwidGVtcGxlbmd0aCIsImNsZWFyIiwiZGVzdHJveSIsInRvSW50Iiwic3RhcnQiLCJyZXRJbnQiLCJ2aWRlbyIsImF1ZGlvIiwiU291cmNlIiwibWltZXR5cGUiLCJzb3VyY2VzIiwiZ2V0U291cmNlIiwic291cmNlIiwiY3JlYXRlU291cmNlIiwiaWQiLCJzZXF1ZW5jZU51bWJlciIsInNhbXBsZXMiLCJkcm9wcGVkU2FtcGxlcyIsInJlc2V0IiwiZGlzdHJveSIsIlRBRyIsImRyb3BwZWQiLCJhdWRpb1RyYWNrIiwidmlkZW9UcmFjayIsIk5hbHVuaXQiLCJTcHNQYXJzZXIiLCJDb21wYXRpYmlsaXR5IiwiQUFDIiwiZ2V0U2lsZW50RnJhbWUiLCJjb2RlYyIsImNoYW5uZWxDb3VudCIsIlJFTVVYX0VWRU5UUyIsIkRFTVVYX0VWRU5UUyIsIkVWRU5UUyIsIm5leHRBdWRpb0R0cyIsIm5leHRWaWRlb0R0cyIsImxhc3RBdWRpb1NhbXBsZXNMZW4iLCJsYXN0VmlkZW9TYW1wbGVzTGVuIiwibGFzdFZpZGVvRHRzIiwibGFzdEF1ZGlvRHRzIiwiYWxsQXVkaW9TYW1wbGVzQ291bnQiLCJhbGxWaWRlb1NhbXBsZXNDb3VudCIsIl9maXJzdEF1ZGlvU2FtcGxlIiwiX2ZpcnN0VmlkZW9TYW1wbGUiLCJmaWxsZWRBdWRpb1NhbXBsZXMiLCJmaWxsZWRWaWRlb1NhbXBsZXMiLCJfdmlkZW9MYXJnZUdhcCIsIl9hdWRpb0xhcmdlR2FwIiwiYmVmb3JlIiwiUkVNVVhfTUVESUEiLCJkb0ZpeCIsImlzRmlyc3RBdWRpb1NhbXBsZXMiLCJpc0ZpcnN0VmlkZW9TYW1wbGVzIiwiZ2V0Rmlyc3RTYW1wbGUiLCJyZWNvcmRTYW1wbGVzQ291bnQiLCJmaXhSZWZTYW1wbGVEdXJhdGlvbiIsIm1ldGEiLCJjaGFuZ2VkIiwidmlkZW9DaGFuZ2VkIiwiY2hhbmdlZElkeCIsInZpZGVvQ2hhbmdlZElkeCIsImRldGFjdENoYW5nZVN0cmVhbSIsImZpeENoYW5nZVN0cmVhbVZpZGVvIiwiZG9GaXhWaWRlbyIsImF1ZGlvQ2hhbmdlZCIsImF1ZGlvQ2hhbmdlZElkeCIsImZpeENoYW5nZVN0cmVhbUF1ZGlvIiwiZG9GaXhBdWRpbyIsImZpcnN0Iiwic3RyZWFtQ2hhbmdlU3RhcnQiLCJ2aWRlb1NhbXBsZXMiLCJmcmFtZVJhdGUiLCJmaXhlZCIsImZpcnN0U2FtcGxlIiwic2FtcGxlc0xlbiIsImRvRml4TGFyZ2VHYXAiLCJkdHMiLCJkZXRlY3RMYXJnZUdhcCIsImZpcnN0RHRzIiwidmlkZW9GaXJzdER0cyIsImF1ZGlvRmlyc3REdHMiLCJnYXAiLCJyZWZTYW1wbGVEdXJhdGlvbiIsImZpbGxDb3VudCIsIk1hdGgiLCJmbG9vciIsImNsb25lZEZpcnN0U2FtcGxlIiwiYXNzaWduIiwicHRzIiwiY3RzIiwic2l6ZSIsImFic0dhcCIsImFicyIsImZpbGxGcmFtZUNvdW50IiwiY2xvbmVkU2FtcGxlIiwiY29tcHV0ZWQiLCJvcmlnaW5EdHMiLCJsYXN0RHRzIiwibGFzdFNhbXBsZUR1cmF0aW9uIiwiY3VycmVudCIsIm5leHQiLCJkdXJhdGlvbiIsImZpbGxGcmFtZUlkeCIsImZpbGxGcmFtZSIsInNwbGljZSIsImF1ZGlvU2FtcGxlcyIsInNpbGVudEZyYW1lIiwiX2ZpcnN0U2FtcGxlIiwidmlkZW9GaXJzdFB0cyIsInNpbGVudFNhbXBsZUNvdW50Iiwic2lsZW50U2FtcGxlIiwiZGF0YXNpemUiLCJmaWx0ZXJlZCIsInJlZlNhbXBsZUR1cmF0aW9uRml4ZWQiLCJzaWxlbnRGcmFtZUNvdW50Iiwic29ydEF1ZGlvU2FtcGxlcyIsImNoYW5nZUlkeCIsInByZXZEdHMiLCJnZXRTdHJlYW1DaGFuZ2VTdGFydCIsImN1ckR0cyIsImlzQ29udGludWUiLCJvcHRpb25zIiwiZmlyc3RQYXJ0U2FtcGxlcyIsInNlY29uZFBhcnRTYW1wbGVzIiwiY2hhbmdlU2FtcGxlIiwiZmlyc3RQYXJ0RHVyYXRpb24iLCJmaW5kRmlyc3RWaWRlb1NhbXBsZSIsImZpbmRGaXJzdEF1ZGlvU2FtcGxlIiwiaXNWaWRlbyIsImFsbFNhbXBsZXNDb3VudCIsImZpbGxlZFNhbXBsZXNDb3VudCIsImR1cmF0aW9uQXZnIiwicmVtb3ZlSW52YWxpZFNhbXBsZXMiLCJmaWx0ZXIiLCJzYW1wbGUiLCJkdHNCYXNlIiwiSW5maW5pdHkiLCJzb3J0IiwiYSIsImIiLCJzb3J0ZWQiLCJpc0tleWZyYW1lIiwibmV4dER0cyIsImNvbmQxIiwiY29uZDIiLCJkaXNjb250aW51ZSIsImxvZyIsInRyYWNrcyIsIl9jb250ZXh0IiwiZ2V0SW5zdGFuY2UiLCJyZW11eGVyIiwiX2R0c0Jhc2UiLCJHb2xvbWIiLCJ1aW50OGFycmF5IiwiX2J1ZmZlciIsIl9idWZmZXJJbmRleCIsIl90b3RhbEJ5dGVzIiwiX3RvdGFsQml0cyIsIl9jdXJyZW50V29yZCIsIl9jdXJyZW50V29yZEJpdHNMZWZ0IiwiX2ZpbGxDdXJyZW50V29yZCIsImJ1ZmZlckJ5dGVzTGVmdCIsImJ5dGVzUmVhZCIsIm1pbiIsIndvcmQiLCJzdWJhcnJheSIsIkRhdGFWaWV3IiwiYnVmZmVyIiwiZ2V0VWludDMyIiwicmVhZEJpdHMiLCJiaXRzIiwidmFsdSIsInJlYWRCb29sIiwicmVhZEJ5dGUiLCJfc2tpcExlYWRpbmdaZXJvIiwiemVyb0NvdW50IiwicmVhZFVFRyIsImxlYWRpbmdaZXJvcyIsInJlYWRTRUciLCJnZXROYWx1bml0cyIsImJ1ZiIsImRhdGF2aWV3IiwiZ2V0SW50MzIiLCJnZXRJbnQxNiIsImdldEludDgiLCJnZXRBbm5leGJOYWxzIiwiZ2V0QXZjY05hbHMiLCJuYWxzIiwiZ2V0SGVhZGVyUG9zaXRpb25Bbm5leEIiLCJwb3MiLCJlbmQiLCJoZWFkZXIiLCJoZWFkZXJMZW5ndGgiLCJza2lwIiwiYm9keSIsInVuaXQiLCJhbmFseXNlTmFsIiwibmRyIiwiaWRyIiwic3BzIiwicGFyc2VTUFMiLCJwcHMiLCJnZXRBdmNjIiwiU1BTUGFyc2VyIiwiX2Vic3AycmJzcCIsInNyYyIsInNyY0xlbmd0aCIsImRzdCIsImRzdElkeCIsInJic3AiLCJnYiIsInByb2ZpbGVJZGMiLCJsZXZlbElkYyIsInByb2ZpbGVfc3RyaW5nIiwiZ2V0UHJvZmlsZVN0cmluZyIsImxldmVsX3N0cmluZyIsImdldExldmVsU3RyaW5nIiwiY2hyb21hX2Zvcm1hdF9pZGMiLCJjaHJvbWFfZm9ybWF0IiwiY2hyb21hX2Zvcm1hdF90YWJsZSIsImJpdF9kZXB0aCIsInNjYWxpbmdfbGlzdF9jb3VudCIsIl9za2lwU2NhbGluZ0xpc3QiLCJwaWNfb3JkZXJfY250X3R5cGUiLCJudW1fcmVmX2ZyYW1lc19pbl9waWNfb3JkZXJfY250X2N5Y2xlIiwicGljX3dpZHRoX2luX21ic19taW51czEiLCJwaWNfaGVpZ2h0X2luX21hcF91bml0c19taW51czEiLCJmcmFtZV9tYnNfb25seV9mbGFnIiwiZnJhbWVfY3JvcF9sZWZ0X29mZnNldCIsImZyYW1lX2Nyb3BfcmlnaHRfb2Zmc2V0IiwiZnJhbWVfY3JvcF90b3Bfb2Zmc2V0IiwiZnJhbWVfY3JvcF9ib3R0b21fb2Zmc2V0IiwiZnJhbWVfY3JvcHBpbmdfZmxhZyIsInBhcl93aWR0aCIsInBhcl9oZWlnaHQiLCJmcHMiLCJmcHNfZml4ZWQiLCJmcHNfbnVtIiwiZnBzX2RlbiIsInZ1aV9wYXJhbWV0ZXJzX3ByZXNlbnRfZmxhZyIsImFzcGVjdF9yYXRpb19pZGMiLCJwYXJfd190YWJsZSIsInBhcl9oX3RhYmxlIiwibnVtX3VuaXRzX2luX3RpY2siLCJ0aW1lX3NjYWxlIiwicGFyU2NhbGUiLCJjcm9wX3VuaXRfeCIsImNyb3BfdW5pdF95Iiwic3ViX3djIiwic3ViX2hjIiwiY29kZWNfd2lkdGgiLCJjb2RlY19oZWlnaHQiLCJwcmVzZW50X3dpZHRoIiwiY2VpbCIsImNocm9tYV9mb3JtYXRfc3RyaW5nIiwiZ2V0Q2hyb21hRm9ybWF0U3RyaW5nIiwiZnJhbWVfcmF0ZSIsInBhcl9yYXRpbyIsIndpZHRoIiwiaGVpZ2h0IiwiY29kZWNfc2l6ZSIsInByZXNlbnRfc2l6ZSIsImxhc3Rfc2NhbGUiLCJuZXh0X3NjYWxlIiwiZGVsdGFfc2NhbGUiLCJ0b0ZpeGVkIiwiY2hyb21hIiwidG9WaWRlb01ldGEiLCJzcHNDb25maWciLCJjb2RlY1dpZHRoIiwiY29kZWNIZWlnaHQiLCJwcmVzZW50V2lkdGgiLCJwcmVzZW50SGVpZ2h0IiwicHJvZmlsZSIsImxldmVsIiwiYml0RGVwdGgiLCJjaHJvbWFGb3JtYXQiLCJwYXJSYXRpbyIsImZwc0RlbiIsImZwc051bSIsInRpbWVzY2FsZSIsIk0zVThQYXJzZXIiLCJUc0RlbXV4ZXIiLCJQbGF5bGlzdCIsIkZsdkRlbXV4ZXIiLCJEQVRBX1RZUEVTIiwiTlVNQkVSIiwiQk9PTEVBTiIsIlNUUklORyIsIk9CSkVDVCIsIk1JWF9BUlJBWSIsIk9CSkVDVF9FTkQiLCJTVFJJQ1RfQVJSQVkiLCJEQVRFIiwiTE9ORV9TVFJJTkciLCJBTUZQYXJzZXIiLCJyZWFkT2Zmc2V0IiwicmVzb2x2ZSIsIm1ldGFEYXRhIiwicGFyc2VWYWx1ZSIsImJvZHlTaXplIiwicmVzZXRTdGF0dXMiLCJwYXJzZVN0cmluZyIsImR2Iiwic3RyTGVuIiwiZ2V0VWludDE2IiwiaXNMZSIsInN0ciIsIlVURjgiLCJkZWNvZGUiLCJwYXJzZURhdGUiLCJ0cyIsImdldEZsb2F0NjQiLCJ0aW1lT2Zmc2V0IiwiRGF0ZSIsInBhcnNlT2JqZWN0IiwiaXNPYmpFbmQiLCJwYXJzZUxvbmdTdHJpbmciLCJBcnJheUJ1ZmZlciIsImRhdGFWaWV3IiwiZ2V0VWludDgiLCJib29sTnVtIiwib2JqRW5kU2l6ZSIsImFtZk9iaiIsImlzT2JqZWN0RW5kIiwibWFyayIsImFtZlZhciIsIm1hcmtlciIsImFyckxlbmd0aCIsInNjcmlwdCIsImRhdGUiLCJsb25nU3RyIiwiX2ZpcnN0RnJhZ21lbnRMb2FkZWQiLCJfdHJhY2tOdW0iLCJfaGFzU2NyaXB0IiwiREVNVVhfU1RBUlQiLCJkb1BhcnNlRmx2IiwiaXNGbHZGaWxlIiwiZ2V0UGxheVR5cGUiLCJzdHJlYW1GbGFnIiwicmVzdWx0IiwiaGFzVmlkZW8iLCJoYXNBdWRpbyIsImxvYWRlckJ1ZmZlciIsInBhcnNlRmx2SGVhZGVyIiwiY2h1bmsiLCJsb29wTWF4IiwiX3BhcnNlRmx2VGFnIiwiREVNVVhfQ09NUExFVEUiLCJERU1VWF9FUlJPUiIsInBsYXlUeXBlIiwiaW5pdFZpZGVvVHJhY2siLCJpbml0QXVkaW9UcmFjayIsIlZpZGVvVHJhY2tNZXRhIiwiQXVkaW9UcmFja01ldGEiLCJfcGFyc2VGbHZUYWdIZWFkZXIiLCJfcHJvY2Vzc0NodW5rIiwidGFnVHlwZSIsInRpbWVzdGFtcCIsInRpbWVzdGFtcEV4dCIsIl9wYXJzZVNjcmlwdERhdGEiLCJfcGFyc2VBQUNEYXRhIiwiX3BhcnNlSGV2Y0RhdGEiLCJpbmZvIiwib25NZXRhRGF0YSIsIm1lZGlhSW5mbyIsImhzYUF1ZGlvIiwidmFsaWRhdGUiLCJfZGF0YXNpemVWYWxpZGF0b3IiLCJNRURJQV9JTkZPIiwiaGFzU3BlY2lmaWNDb25maWciLCJhdWRpb3NhbXBsZXJhdGUiLCJzYW1wbGVSYXRlIiwiYXVkaW9jaGFubmVscyIsInNhbXBsZVJhdGVJbmRleCIsImZyYW1lcmF0ZSIsIl9hYWNTZXF1ZW5jZUhlYWRlclBhcnNlciIsIm9iamVjdFR5cGUiLCJfc3dpdGNoQXVkaW9TYW1wbGVSYXRlIiwiZnJhbWVMZW5ndGgiLCJkZXBlbmRzT25Db3JlQ29kZXIiLCJleHRlbnNpb25GbGFnSW5kZXgiLCJ1c2VyQWdlbnQiLCJ3aW5kb3ciLCJuYXZpZ2F0b3IiLCJ0b0xvd2VyQ2FzZSIsImV4dGVuc2lvblNhbXBsaW5nSW5kZXgiLCJjb25maWciLCJzYW1wbGluZ0luZGV4IiwiaW5kZXhPZiIsInRyYWNrIiwiZm9ybWF0IiwiX2hhc0F1ZGlvU2VxdWVuY2UiLCJfc3dpdGNoQXVkaW9TYW1wbGluZ0ZyZXF1ZW5jeSIsImZyYW1lTGVudGgiLCJhdWRpb1NhbXBsZVJhdGUiLCJhdWRpb1NhbXBsZVJhdGVJbmRleCIsImFhY0hlYWRlciIsImF1ZGlvTWVkaWEiLCJNRVRBREFUQV9QQVJTRUQiLCJBVURJT19NRVRBREFUQV9DSEFOR0UiLCJfbWV0YUNoYW5nZSIsImZyYW1lVHlwZSIsImNvZGVjSUQiLCJhdmNQYWNrZXRUeXBlIiwicGFyc2VJbnQiLCJuYWx1IiwiciIsInNpemVzIiwiYXZjY2xlbmd0aCIsIl9hdmNTZXF1ZW5jZUhlYWRlclBhcnNlciIsIl9oYXNWaWRlb1NlcXVlbmNlIiwiVklERU9fTUVUQURBVEFfQ0hBTkdFIiwiY29uZmlndXJhdGlvblZlcnNpb24iLCJhdmNQcm9maWxlSW5kaWNhdGlvbiIsInByb2ZpbGVDb21wYXRpYmlsaXR5IiwiYXZjTGV2ZWxJbmRpY2F0aW9uIiwibmFsVW5pdExlbmd0aCIsIm51bU9mU3BzIiwiaiIsImNvZGVjU3RyaW5nIiwiaCIsInRvU3RyaW5nIiwibnVtT2ZQcHMiLCJ2aWRlb01lZGlhIiwiYXZjYyIsInNhbXBsaW5nRnJlcXVlbmN5SW5kZXgiLCJzYW1wbGluZ0ZyZXF1ZW5jeUxpc3QiLCJfc3dpdGNoQXVkaW9DaGFubmVsIiwic2FtcGxlVHJhY2tOdW1JbmRleCIsInNhbXBsZVRyYWNrTnVtTGlzdCIsImRhdGFzaXplQ29uZmlybSIsImxvZ2dlciIsInBhcnNlIiwidGV4dCIsImJhc2V1cmwiLCJzcGxpdCIsInJlZnMiLCJyZWYiLCJtYXRjaCIsInJlZm0iLCJyZWZkIiwidmVyc2lvbiIsInNlcXVlbmNlIiwidGFyZ2V0ZHVyYXRpb24iLCJwYXJzZUZsb2F0IiwicGFyc2VGcmFnIiwicGFyc2VEZWNyeXB0IiwiZnJhZ3MiLCJmcmVnIiwibmV4dGxpbmUiLCJjaGFyQXQiLCJ1cmwiLCJwYXJzZVVSTCIsInVybHMiLCJlbmNyeXB0IiwiY21kIiwibWV0aG9kIiwidXJpIiwiaXYiLCJpdmIiLCJpbSIsInN1YnN0ciIsIlN0cmVhbVR5cGUiLCJjb25maWdzIiwiZGVtdXhpbmciLCJwYXQiLCJwbXQiLCJfaGFzVmlkZW9NZXRhIiwiX2hhc0F1ZGlvTWV0YSIsImRlbXV4IiwiZnJhZyIsImlucHV0QnVmZmVyIiwicGVzZXMiLCJ0c1N0cmVhbSIsIlN0cmVhbSIsInJlYWQiLCJwZXMiLCJwaWQiLCJFUyIsInBheWxvYWQiLCJzdHJlYW0iLCJBdWRpb09wdGlvbnMiLCJWaWRlb09wdGlvbnMiLCJlcGVzZXMiLCJNZXJnZSIsInB1c2hBdWRpb1NhbXBsZSIsInB1c2hWaWRlb1NhbXBsZSIsIl90cmFja3MiLCJmcmVxdWVuY2UiLCJjaGFubmVsIiwiYXVkaW9PYmplY3RUeXBlIiwiYXVkaW9Db25maWciLCJmcmVxdWVuY3lJbmRleCIsIm1ldGFFcXVhbCIsImNvbXBhaXJlTWV0YSIsIkF1ZGlvVHJhY2tTYW1wbGUiLCJzYW1wbGVMZW5ndGgiLCJuYWwiLCJzYXJSYXRpbyIsInNhcl9yYXRpbyIsIlZpZGVvVHJhY2tTYW1wbGUiLCJkZXN0b3J5IiwiY29tcGFpcmVBcnJheSIsImFsIiwiYmwiLCJpZ25vcmVEdXJhdGlvbiIsImsiLCJpdGVtYSIsIml0ZW1iIiwiYnVmZmVycyIsInJlYWRIZWFkZXIiLCJyZWFkUGF5bG9hZCIsInBhY2tldCIsInVua25vd25QSURzIiwiUEVTIiwiUEFUIiwiQ0FUIiwiVFNEVCIsInNvbWUiLCJpdGVtIiwiUE1UIiwic3RzIiwiTWVkaWEiLCJzdHJlYW1UeXBlIiwic3luYyIsInJlYWRVaW50OCIsInJlYWRVaW50MTYiLCJwcmlvcml0eSIsInNjcmFtYmxpbmciLCJhZGFwdGF0aW9uIiwiY29udGludWl0eSIsInRhYmVsSUQiLCJ6ZXJvIiwic2VjdGlvbkxlbmd0aCIsInN0cmVhbUlEIiwic2VjdGlvbk51bWJlciIsImxhc3RTZWN0aW9uTnVtYmVyIiwiTiIsInByb2dyYW1OdW1iZXIiLCJwcm9ncmFtIiwidGFibGVJRCIsIm9yZGVyIiwibGFzdE9yZGVyIiwiUENSX1BJRCIsInByb2dyYW1MZW5ndGgiLCJlcyIsIm1hcCIsImFkYXB0YXRpb25MZW5ndGgiLCJhY2Nlc3MiLCJQQ1IiLCJPUENSIiwic3BsaWNlUG9pbnQiLCJ0cmFuc3BvcnRQcml2YXRlIiwiYWRhcHRhdGlvbkZpZWxkIiwiX3N0YXJ0IiwicHJvZ3JhbUNsb2NrQmFzZSIsInJlYWRVaW50MzIiLCJwcm9ncmFtQ2xvY2tFeHRlbnNpb24iLCJvcmlnaW5Qcm9ncmFtQ2xvY2tCYXNlIiwib3JpZ2luUHJvZ3JhbUNsb2NrRXh0ZW5zaW9uIiwic3BsaWNlQ291bnRkb3duIiwidHJhbnNwb3J0UHJpdmF0ZURhdGEiLCJsdHciLCJwaWVjZXdpc2UiLCJzZWFtbGVzcyIsImx0d1ZhbGlkIiwibHR3T2Zmc2V0IiwicmVhZFVpbnQyNCIsInBpZWNld2lzZVJhdGUiLCJyZWFkSW50OCIsInNwbGljZVR5cGUiLCJkdHNOZXh0QVUxIiwibWFya2VyMSIsImR0c05leHRBVTIiLCJtYXJrZXIyIiwiZHRzTmV4dEFVMyIsImxhc3RTdHVmZmluZyIsInBhY2tldExlbmd0aCIsInB0c0RUU0ZsYWciLCJlc2NyRmxhZyIsImVzUmF0ZUZsYWciLCJkc21GbGFnIiwiYWRkaXRpb25hbEZsYWciLCJjcmNGbGFnIiwiZXh0ZW5zaW9uRmxhZyIsInBlc0hlYWRlckxlbmd0aCIsIk4xIiwiZXNjciIsImV4IiwiZXNSYXRlIiwiYWRkaXRpb25hbENvcHlJbmZvIiwicGVzQ1JDIiwiYmFjayIsImZxIiwibGF5ZXIiLCJhYnNlbnQiLCJnZXRBdWRpb0NvbmZpZyIsInNlY3Rpb25JbmRpY2F0b3IiLCJjdXJyZW50TmV4dEluZGljYXRvciIsImNyYzMyIiwiZXh0ZW5zaW9uU2FtcGxlSW5kZXgiLCJ0ZXN0IiwiaW5wdXRidWZmZXIiLCJfYmFzZVVSTCIsIl9saXN0IiwiX3RzIiwiZnJhZ0xlbmd0aCIsIl9sYXN0Z2V0IiwiX2F1ZG9jbGVhciIsImF1dG9jbGVhciIsImJhc2VVUkwiLCJkb3dubG9hZGVkIiwiZG93bmxvYWRpbmciLCJkZWxldGVGcmFnIiwidGltZSIsInB1c2hNM1U4IiwiZGVsZXRlcHJlIiwibmV3ZnJhZ2xpc3QiLCJ0c2xpc3QiLCJnZXRUc0xpc3QiLCJ0c25hbWUiLCJpc2xvYWRlZCIsImxvYWRpbmciLCJnZXRUc0J5TmFtZSIsImdldFRzIiwidGltZWxpc3QiLCJjbGVhckRvd25sb2FkZWQiLCJsIiwiRmV0Y2hMb2FkZXIiLCJMT0FERVJfRVZFTlRTIiwiUkVBRF9TVFJFQU0iLCJSRUFEX1RFWFQiLCJSRUFEX0pTT04iLCJSRUFEX0JVRkZFUiIsInN0YXR1cyIsIl9yZWFkZXIiLCJfY2FuY2VsZWQiLCJfZGVzdHJveWVkIiwicmVhZHR5cGUiLCJfbG9hZGVyVGFza05vIiwiTEFERVJfU1RBUlQiLCJsb2FkIiwib3B0cyIsIl90aGlzIiwicGFyYW1zIiwiZ2V0UGFyYW1zIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJvayIsIl9vbkZldGNoUmVzcG9uc2UiLCJMT0FERVJfRVJST1IiLCJjYXRjaCIsInRhc2tubyIsImpzb24iLCJMT0FERVJfQ09NUExFVEUiLCJhcnJheUJ1ZmZlciIsIl9vblJlYWRlciIsImdldFJlYWRlciIsInJlYWRlciIsImNhbmNlbCIsImUiLCJ2YWwiLCJkb25lIiwiTE9BREVSX0RBVEFMT0FERUQiLCJoZWFkZXJzIiwiSGVhZGVycyIsIm1vZGUiLCJjYWNoZSIsImNvbmZpZ0hlYWRlcnMiLCJoYXNPd25Qcm9wZXJ0eSIsImFwcGVuZCIsIm9wdEhlYWRlcnMiLCJjb3JzIiwid2l0aENyZWRlbnRpYWxzIiwiY3JlZGVudGlhbHMiLCJNcDRSZW11eGVyIiwiRm1wNCIsIkJ1ZmZlciIsIndyaXRlVWludDMyIiwiaW5pdEJveCIsImNvbnRlbnQiLCJ3cml0ZSIsImV4dGVuc2lvbiIsImZsYWciLCJmdHlwIiwibW9vdiIsIm12aGQiLCJ0cmFrIiwidmlkZW9UcmFrIiwiYXVkaW9UcmFrIiwibXZleCIsImZvckVhY2giLCJieXRlcyIsInRraGQiLCJtZGlhIiwic2FtcGxlcmF0ZSIsImVkdHMiLCJtZWRpYVRpbWUiLCJtZGhkIiwiaGRsciIsIm1pbmYiLCJ2bWhkIiwic21oZCIsImRpbmYiLCJzdGJsIiwiZHJlZiIsInN0c2QiLCJzdHRzIiwic3RzYyIsInN0c3oiLCJzdGNvIiwibXA0YSIsImF2YzEiLCJlc2RzIiwiY29uZmlnbGVuIiwiaFNwYWNpbmciLCJ2U3BhY2luZyIsImJ0cnQiLCJwYXNwIiwidHJhY2tJRCIsIm1laGQiLCJ0cmV4IiwibW9vZiIsIm1maGQiLCJ0cmFmIiwidGZoZCIsInRmZHQiLCJzZHRwIiwidHJ1biIsInNkdHBMZW5ndGgiLCJzYW1wbGVDb3VudCIsImZsYWdzIiwiaXNMZWFkaW5nIiwiZGVwZW5kc09uIiwiaXNEZXBlbmRlZE9uIiwiaGFzUmVkdW5kYW5jeSIsImlzTm9uU3luYyIsIm51bSIsIm1kYXQiLCJtZGF0Qm94IiwiY2hhckNvZGVBdCIsIl9pc0R0c0Jhc2VJbml0ZWQiLCJpc0ZpcnN0VmlkZW8iLCJpc0ZpcnN0QXVkaW8iLCJ2aWRlb0FsbER1cmF0aW9uIiwiYXVkaW9BbGxEdXJhdGlvbiIsInJlbXV4IiwiUkVNVVhfTUVUQURBVEEiLCJvbk1ldGFEYXRhUmVhZHkiLCJERVRFQ1RfQ0hBTkdFX1NUUkVBTSIsInJlc2V0RHRzQmFzZSIsIl9kdHNCYXNlSW5pdGVkIiwiY2FsY0R0c0Jhc2UiLCJfcmVtdXhWaWRlbyIsIl9yZW11eEF1ZGlvIiwic2VlayIsInByZXNvdXJjZWJ1ZmZlciIsInJlbXV4SW5pdFNlZ21lbnQiLCJJTklUX1NFR01FTlQiLCJpbml0U2VnbWVudCIsImF1ZGlvQmFzZSIsInZpZGVvQmFzZSIsIm1wNFNhbXBsZXMiLCJhdmNTYW1wbGUiLCJtZGF0U2FtcGxlIiwic2FtcGxlRHVyYXRpb24iLCJ2aWRlb01ldGEiLCJtb29mTWRhdCIsIndyaXRlVG9Tb3VyY2UiLCJNRURJQV9TRUdNRU5UIiwibGFzdFNhbXBsZSIsIl92aWRlb05leHREdHMiLCJpc0ZpcnN0RHRzSW5pdGVkIiwiYXVkaW9NZXRhIiwibXA0U2FtcGxlIiwiaW5pdFNpbGVudEF1ZGlvIiwiQ29udGV4dCIsIldPUktFUl9DT01NQU5EUyIsInNuaWZmZXIiLCJNZWRpYUluZm8iLCJNZWRpYVNhbXBsZSIsIk1lZGlhU2VnbWVudCIsIk1lZGlhU2VnbWVudExpc3QiLCJNc2UiLCJNb2JpbGVWaWRlbyIsIkNyeXB0byIsIlJlc3VsdENvbnN0cnVjdG9yIiwidG90YWxMZW5ndGgiLCJfbGVuIiwiYXJyYXlzIiwiX2tleSIsIl9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24iLCJfZGlkSXRlcmF0b3JFcnJvciIsIl9pdGVyYXRvckVycm9yIiwiX2l0ZXJhdG9yIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJfc3RlcCIsInJldHVybiIsIl9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yIiwiX2RpZEl0ZXJhdG9yRXJyb3IyIiwiX2l0ZXJhdG9yRXJyb3IyIiwiX2l0ZXJhdG9yMiIsIl9zdGVwMiIsIl9hcnIiLCJfY29uY2F0IiwiX2NvbmNhdDIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib2JqIiwiX19lc01vZHVsZSIsIndlYnBhY2tCb290c3RyYXBGdW5jIiwibW9kdWxlcyIsImluc3RhbGxlZE1vZHVsZXMiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJjIiwiZCIsImdldHRlciIsIm8iLCJjb25maWd1cmFibGUiLCJnZXREZWZhdWx0IiwiZ2V0TW9kdWxlRXhwb3J0cyIsIm9iamVjdCIsInByb3BlcnR5IiwicCIsIm9lIiwiZiIsInMiLCJFTlRSWV9NT0RVTEUiLCJtb2R1bGVOYW1lUmVxRXhwIiwiZGVwZW5kZW5jeVJlZ0V4cCIsInF1b3RlUmVnRXhwIiwicmVwbGFjZSIsImlzTnVtZXJpYyIsImdldE1vZHVsZURlcGVuZGVuY2llcyIsInF1ZXVlTmFtZSIsInJldHZhbCIsImZuU3RyaW5nIiwid3JhcHBlclNpZ25hdHVyZSIsIndlYnBhY2tSZXF1aXJlTmFtZSIsInJlIiwiUmVnRXhwIiwiZXhlYyIsImhhc1ZhbHVlc0luUXVldWVzIiwicXVldWVzIiwicmVkdWNlIiwiaGFzVmFsdWVzIiwiZ2V0UmVxdWlyZWRNb2R1bGVzIiwibW9kdWxlc1F1ZXVlIiwibWFpbiIsInJlcXVpcmVkTW9kdWxlcyIsInNlZW5Nb2R1bGVzIiwicXVldWUiLCJtb2R1bGVUb0NoZWNrIiwibmV3TW9kdWxlcyIsIm5ld01vZHVsZXNLZXlzIiwiX193ZWJwYWNrX21vZHVsZXNfXyIsImFsbCIsImVudHJ5TW9kdWxlIiwiSlNPTiIsInN0cmluZ2lmeSIsImpvaW4iLCJibG9iIiwiQmxvYiIsImJhcmUiLCJVUkwiLCJ3ZWJraXRVUkwiLCJtb3pVUkwiLCJtc1VSTCIsIndvcmtlclVybCIsImNyZWF0ZU9iamVjdFVSTCIsIndvcmtlciIsIldvcmtlciIsIm9iamVjdFVSTCIsIlJFTVVYX0VSUk9SIiwiTVNFX0VWRU5UUyIsIlNPVVJDRV9VUERBVEVfRU5EIiwiSExTX0VWRU5UUyIsIlJFVFJZX1RJTUVfRVhDRUVERUQiLCJDUllUT19FVkVOVFMiLCJTVEFSVF9ERUNSWVBUIiwiREVDUllQVEVEIiwiQUxMRVZFTlRTIiwiRmx2QWxsb3dlZEV2ZW50cyIsIkhsc0FsbG93ZWRFdmVudHMiLCJDT05URVhUX0NPTU9NQU5EUyIsIk9OIiwiT05DRSIsIk9GRiIsIkVNSVQiLCJERVNUUk9ZIiwiRElSRUNUX0VNSVRfRkxBRyIsImFsbG93ZWRFdmVudHMiLCJfZW1pdHRlciIsIl9pbnN0YW5jZU1hcCIsIl9jbHNNYXAiLCJfaW5pdGVkIiwiX2hvb2tzIiwidGFnIiwiaW5zdGFuY2UiLCJpbml0SW5zdGFuY2UiLCJuZXdJbnN0YW5jZSIsInJlZ2lzdHJ5IiwiY2xzIiwiY2hlY2tNZXNzYWdlTmFtZSIsIl9pc01lc3NhZ2VOYW1lVmFsaWQiLCJzZWxmIiwiZW5oYW5jZWQiLCJvbmNlTGlzdGVuZXJzIiwibWVzc2FnZU5hbWUiLCJjYWxsYmFjayIsImJlZm9yZUxpc3QiLCJlbWl0VG8iLCJyZW1vdmVMaXN0ZW5lcnMiLCJoYXNPd24iLCJjYWxsYmFja3MiLCJkZXN0cm95SW5zdGFuY2VzIiwib3V0cHV0QnVmZmVyIiwib3V0cHV0YnVmZmVyIiwiY3J5cHRvIiwibXNDcnlwdG8iLCJkZWNyaXB0IiwiYWVza2V5Iiwic2JrZXkiLCJzdWJ0bGUiLCJpbXBvcnRLZXkiLCJkZWNyaXB0RGF0YSIsImRlY3J5cHQiLCJyZXMiLCJsZSIsInNldEludDE2IiwiSW50MTZBcnJheSIsImRldmljZSIsIm9zIiwiaXNQYyIsImlzVGFibGV0IiwiYnJvd3NlciIsInVhIiwicmVnIiwiaWUiLCJmaXJmb3giLCJjaHJvbWUiLCJvcGVyYSIsInNhZmFyaSIsImlzV2luZG93c1Bob25lIiwiaXNTeW1iaWFuIiwiaXNBbmRyb2lkIiwiaXNGaXJlRm94IiwiaXNQaG9uZSIsIm91dCIsImlucHV0IiwiZnJvbUNoYXJDb2RlIiwiX2NoZWNrQ29udGludWF0aW9uIiwidWNzNCIsImNoZWNrTGVuZ3RoIiwiQXVkaW9DdHgiLCJBdWRpb0NvbnRleHQiLCJ3ZWJraXRBdWRpb0NvbnRleHQiLCJnYWluTm9kZSIsImNyZWF0ZUdhaW4iLCJjb25uZWN0IiwiZGVzdGluYXRpb24iLCJwcmVsb2FkVGltZSIsIl9jdXJyZW50QnVmZmVyIiwiX25leHRCdWZmZXIiLCJfbGFzdHB0cyIsIl9wcmVEZWNvZGUiLCJfY3VycmVudFRpbWUiLCJfZGVjb2RpbmciLCJfcGxheWVkIiwiY3VycmVudFRpbWUiLCJkZWNvZGVBdWRpbyIsInNldEF1ZGlvRGF0YSIsImRlY29kZUFBQyIsInNhbXBsZURhdGEiLCJnZXRBQUNEYXRhIiwiY29tYmlsZURhdGEiLCJkZWNvZGVBdWRpb0RhdGEiLCJhdWRpb1NvdXJjZSIsImNyZWF0ZUJ1ZmZlclNvdXJjZSIsIm9uZW5kZWQiLCJvblNvdXJjZUVuZGVkIiwiZ2V0VGltZUJ1ZmZlciIsInBsYXkiLCJzZXRBdWRpb01ldGFEYXRhIiwiYWR0cyIsImdldEFkdHMiLCJhYWNmcmFtZWxlbmd0aCIsIkFWUmVjb25jaWxlciIsInByb3BzIiwiYUN0eCIsInZDdHgiLCJ0aW1lb3V0SWQiLCJkb1JlY29uY2lsZSIsInZDdXJUaW1lIiwiYUN1clRpbWUiLCJwYXVzZSIsInNldFRpbWVvdXQiLCJIVE1MRWxlbWVudCIsIlZpZGVvQ3R4IiwidGlja2VyIiwiaGlzdG9yeVRpbWUiLCJyZWNvbmNpbGVyIiwiaGFuZGxlQXVkaW9Tb3VyY2VFbmQiLCJvbmNhbnBsYXkiLCJhcHBlbmRDaGlsZCIsImNhbnZhcyIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsIm5vdyIsIl9vblRpbWVyIiwiX2NsZWFuQnVmZmVyIiwiY2xlYW5CdWZmZXIiLCJvbkRlbXV4Q29tcGxldGUiLCJkZWNvZGVWaWRlbyIsInNldEF1ZGlvTWV0YSIsInNldFZpZGVvTWV0YSIsInNldFZpZGVvTWV0YURhdGEiLCJjdXN0b21FbGVtZW50cyIsImRlZmluZSIsIlNvdXJjZUJ1ZmZlciIsImN1cnJlbnRHb3AiLCJfbGFzdEdldCIsImZyYW1lIiwibmV4dEdvcCIsIl9nZXROZXh0IiwiZ29wIiwicmVtb3ZlIiwiVGlja2VyIiwiaW50ZXJ2YWwiLCJvblRpY2siLCJzZXRJbnRlcnZhbCIsIlJhZlRpY2tlciIsInByZXYiLCJ0aW1lcklkIiwiX3N1YlRpbWVySWQiLCJfdGlja0Z1bmMiLCJnZXRUaWNrRnVuYyIsInRpY2siLCJuZXh0VGljayIsInN0b3AiLCJjYW5jZWxGdW5jIiwiZ2V0Q2FuY2VsRnVuYyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwid2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJpc1N1cHBvcnRlZCIsIlRpbWVvdXRUaWNrZXIiLCJjbGVhckludGVydmFsIiwiZ2V0VGlja2VyIiwiVmlkZW9DYW52YXMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJvbkZpcnN0RnJhbWUiLCJyZWFkeVN0YXR1cyIsInBhdXNlZCIsImxhc3RQbGF5ZWQiLCJfZGVjb2RlckluaXRlZCIsIl9hdmNjcHVzaGVkIiwiX2RlY29kZWRGcmFtZXMiLCJfbGFzdFNhbXBsZUR0cyIsIl9iYXNlRHRzIiwiX2xhc3RSZW5kZXJUaW1lIiwiaW5pdFdhc21Xb3JrZXIiLCJ3YXNtd29ya2VyIiwicG9zdE1lc3NhZ2UiLCJtc2ciLCJhZGRFdmVudExpc3RlbmVyIiwiX29uRGVjb2RlZCIsInl1dkNhbnZhcyIsIllVVkNhbnZhcyIsIl9wcmVsb2FkIiwiX2FuYWx5c2VOYWwiLCJmcmFtZVRpbWVzIiwiZnJhbWVUaW1lIiwiY3VycmVudElkeCIsInJlbmRlciIsIk1BWF9TVFJFQU1fQlVGRkVSX0xFTkdUSCIsIkRlY29kZXIiLCJpbml0ZWQiLCJpbmZvbGlzdCIsInBhcl9icm9hZHdheU9uQnJvYWR3YXlJbml0ZWQiLCJicm9hZHdheU9uQnJvYWR3YXlJbml0ZWQiLCJwYXJfYnJvYWR3YXlPblBpY3R1cmVEZWNvZGVkIiwiYnJvYWR3YXlPblBpY3R1cmVEZWNvZGVkIiwidG9VOEFycmF5IiwicHRyIiwiSEVBUFU4IiwiTW9kdWxlIiwiX2Jyb2Fkd2F5SW5pdCIsInN0cmVhbUJ1ZmZlciIsIl9icm9hZHdheUNyZWF0ZVN0cmVhbSIsImluZm9pZCIsImRhdGV0ZW1wIiwiZ2V0VGltZSIsIl9icm9hZHdheVBsYXlTdHJlYW0iLCJkZWNvZGVyIiwib25Qb3N0UnVuIiwiaW1wb3J0U2NyaXB0cyIsImFkZE9uUG9zdFJ1biIsInN0eWxlIiwiX2luaXRDb250ZXh0R0wiLCJjb250ZXh0R0wiLCJfaW5pdFByb2dyYW0iLCJfaW5pdEJ1ZmZlcnMiLCJfaW5pdFRleHR1cmVzIiwiZ2wiLCJ2YWxpZENvbnRleHROYW1lcyIsIm5hbWVJbmRleCIsImNvbnRleHROYW1lIiwiY29udGV4dE9wdGlvbnMiLCJnZXRDb250ZXh0IiwiZ2V0UGFyYW1ldGVyIiwidmVydGV4U2hhZGVyU2NyaXB0IiwiZnJhZ21lbnRTaGFkZXJTY3JpcHQiLCJZVVYyUkdCIiwidmVydGV4U2hhZGVyIiwiY3JlYXRlU2hhZGVyIiwiVkVSVEVYX1NIQURFUiIsInNoYWRlclNvdXJjZSIsImNvbXBpbGVTaGFkZXIiLCJnZXRTaGFkZXJQYXJhbWV0ZXIiLCJDT01QSUxFX1NUQVRVUyIsImdldFNoYWRlckluZm9Mb2ciLCJmcmFnbWVudFNoYWRlciIsIkZSQUdNRU5UX1NIQURFUiIsImNyZWF0ZVByb2dyYW0iLCJhdHRhY2hTaGFkZXIiLCJsaW5rUHJvZ3JhbSIsImdldFByb2dyYW1QYXJhbWV0ZXIiLCJMSU5LX1NUQVRVUyIsImdldFByb2dyYW1JbmZvTG9nIiwidXNlUHJvZ3JhbSIsIllVVjJSR0JSZWYiLCJnZXRVbmlmb3JtTG9jYXRpb24iLCJ1bmlmb3JtTWF0cml4NGZ2Iiwic2hhZGVyUHJvZ3JhbSIsInZlcnRleFBvc0J1ZmZlciIsImNyZWF0ZUJ1ZmZlciIsImJpbmRCdWZmZXIiLCJBUlJBWV9CVUZGRVIiLCJidWZmZXJEYXRhIiwiRmxvYXQzMkFycmF5IiwiU1RBVElDX0RSQVciLCJ2ZXJ0ZXhQb3NSZWYiLCJnZXRBdHRyaWJMb2NhdGlvbiIsImVuYWJsZVZlcnRleEF0dHJpYkFycmF5IiwidmVydGV4QXR0cmliUG9pbnRlciIsIkZMT0FUIiwidGV4dHVyZVBvc0J1ZmZlciIsInRleHR1cmVQb3NSZWYiLCJ1VGV4dHVyZVBvc0J1ZmZlciIsInVUZXh0dXJlUG9zUmVmIiwidlRleHR1cmVQb3NCdWZmZXIiLCJ2VGV4dHVyZVBvc1JlZiIsInlUZXh0dXJlUmVmIiwiX2luaXRUZXh0dXJlIiwieVNhbXBsZXJSZWYiLCJ1bmlmb3JtMWkiLCJ1VGV4dHVyZVJlZiIsInVTYW1wbGVyUmVmIiwidlRleHR1cmVSZWYiLCJ2U2FtcGxlclJlZiIsInRleHR1cmVSZWYiLCJjcmVhdGVUZXh0dXJlIiwiYmluZFRleHR1cmUiLCJURVhUVVJFXzJEIiwidGV4UGFyYW1ldGVyaSIsIlRFWFRVUkVfTUFHX0ZJTFRFUiIsIk5FQVJFU1QiLCJURVhUVVJFX01JTl9GSUxURVIiLCJURVhUVVJFX1dSQVBfUyIsIkNMQU1QX1RPX0VER0UiLCJURVhUVVJFX1dSQVBfVCIsIl9kcmF3UGljdHVyZUdMIiwibldpZHRoIiwieWxlbiIsInV2bGVuIiwicmVuZGVyRGF0YSIsInlEYXRhIiwidURhdGEiLCJ2RGF0YSIsInlBcnJheSIsInVBcnJheSIsInZBcnJheSIsIl9kcmF3UGljdHVyZUdMNDIwIiwieURhdGFQZXJSb3ciLCJ5Um93Q250IiwidURhdGFQZXJSb3ciLCJ1Um93Q250IiwidkRhdGFQZXJSb3ciLCJ2Um93Q250IiwicmF0aW93IiwicmF0aW9oIiwibGVmdCIsInRvcCIsInZpZXdwb3J0IiwidGV4dHVyZVBvc1ZhbHVlcyIsIkRZTkFNSUNfRFJBVyIsInVUZXh0dXJlUG9zVmFsdWVzIiwidlRleHR1cmVQb3NWYWx1ZXMiLCJhY3RpdmVUZXh0dXJlIiwiVEVYVFVSRTAiLCJ0ZXhJbWFnZTJEIiwiTFVNSU5BTkNFIiwiVU5TSUdORURfQllURSIsIlRFWFRVUkUxIiwiVEVYVFVSRTIiLCJkcmF3QXJyYXlzIiwiVFJJQU5HTEVfU1RSSVAiLCJfZHJhd1BpY3R1cmVSR0IiLCJpc09iamVjdEZpbGxlZCIsIm1pbWVUeXBlIiwiaXNDb21wbGV0ZSIsImlzQmFzZUluZm9SZWFkeSIsImlzVmlkZW9SZWFkeSIsImlzQXVkaW9SZWFkeSIsIl9kZWZhdWx0IiwiZ2V0RGVmYXVsdEluZiIsImVudHJpZXMiLCJ2IiwiaXNSQVAiLCJfdHlwZSIsIl9sYXN0QXBwZW5kTG9jYXRpb24iLCJpc0VtcHR5IiwiX3NlYXJjaE5lYXJlc3RTZWdtZW50QmVmb3JlIiwiYmVnaW5EdHMiLCJsYXN0IiwibWlkIiwibGJvdW5kIiwidWJvdW5kIiwiaWR4IiwiX3NlYXJjaE5lYXJlc3RTZWdtZW50QWZ0ZXIiLCJzZWdtZW50IiwibGFzdEFwcGVuZElkeCIsImluc2VydElkeCIsIm9yaWdpblN0YXJ0RHRzIiwiZ2V0TGFzdFNlZ21lbnRCZWZvcmUiLCJnZXRMYXN0U2FtcGxlQmVmb3JlIiwiZ2V0TGFzdFJBUEJlZm9yZSIsInNlZ21lbnRJZHgiLCJyYW5kb21BY2Nlc3NQb2ludHMiLCJzdGFydER0cyIsImVuZER0cyIsInN0YXJ0UHRzIiwiZW5kUHRzIiwib3JpZ2luRW5kRHRzIiwiYWRkUkFQIiwiTVNFIiwiY29udGFpbmVyIiwibWVkaWFTb3VyY2UiLCJzb3VyY2VCdWZmZXJzIiwib25Tb3VyY2VPcGVuIiwib25UaW1lVXBkYXRlIiwib25VcGRhdGVFbmQiLCJvbldhaXRpbmciLCJNZWRpYVNvdXJjZSIsImFkZFNvdXJjZUJ1ZmZlcnMiLCJkb0FwcGVuZCIsInJlYWR5U3RhdGUiLCJhZGQiLCJkdXIiLCJtaW1lIiwic291cmNlQnVmZmVyIiwiYWRkU291cmNlQnVmZmVyIiwidXBkYXRpbmciLCJhcHBlbmRCdWZmZXIiLCJlbmRPZlN0cmVhbSIsImFjdGl2ZVNvdXJjZUJ1ZmZlcnMiLCJyZW1vdmVCdWZmZXJzIiwidGFza0xpc3QiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwidGFzayIsIlByb21pc2UiLCJkb0NsZWFuQnVmZmVyIiwicmV0cnlUaW1lIiwiY2xlYW4iLCJjbGVhckJ1ZmZlciIsInJlbW92ZVNvdXJjZUJ1ZmZlciIsInJldm9rZU9iamVjdFVSTCIsImJ1ZmZlcmVkIiwiYkVuZCIsInJlYWRBc0ludCIsInRlbXAiLCJwYWRTdGFydDRIZXgiLCJoZXhOdW0iLCJoZXhTdHIiLCJwYWRTdGFydCIsImxvb3AiLCJzaWduIiwicmVhZFVpbnQ2NCIsInJlYWRJbnQxNiIsInJlYWRJbnQzMiIsIlRhZyIsIkxvZ2dlciIsIkZMVl9FUlJPUiIsIkZsdkNvbnRyb2xsZXIiLCJwbGF5ZXIiLCJfcGxheWVyIiwiaW5pdFNlZ21lbnRBcnJpdmVkIiwiYnVmZmVyQ2xlYXJUaW1lciIsIlJlbXV4ZXIiLCJjb21wYXRpYmlsaXR5IiwibXNlIiwiX2hhbmRsZVRpbWVVcGRhdGUiLCJpbml0TGlzdGVuZXJzIiwiX2hhbmRsZUxvYWRlckRhdGFMb2FkZWQiLCJfaGFuZGxlTmV0d29ya0Vycm9yIiwiX2hhbmRsZU1lZGlhSW5mbyIsIl9oYW5kbGVNZXRhZGF0YVBhcnNlZCIsIl9oYW5kbGVEZW11eENvbXBsZXRlIiwiX2hhbmRsZURlbXV4RXJyb3IiLCJfaGFuZGxlQXBwZW5kSW5pdFNlZ21lbnQiLCJfaGFuZGxlTWVkaWFTZWdtZW50IiwiX2hhbmRsZVNvdXJjZVVwZGF0ZUVuZCIsImJ1ZmZlckVuZCIsImJ1ZmZlclN0YXJ0IiwiUGxheWVyIiwiRXJyb3JzIiwiX29uRXJyb3IiLCJmYXRhbCIsIm1vZCIsImVycm9yVHlwZSIsImVycm9yRGV0YWlscyIsImVycm9yRmF0YWwiLCJsb2FkRGF0YSIsImxvYWRlciIsImZsdkFsbG93ZWRFdmVudHMiLCJGbHZQbGF5ZXIiLCJpbml0RXZlbnRzIiwibG9hZGVyQ29tcGxldGVUaW1lciIsImluaXRGbHYiLCJmbHYiLCJpbml0Rmx2RXZlbnRzIiwidXRpbCIsImFkZENsYXNzIiwicm9vdCIsImZpbmREb20iLCJsaXZlIiwiY3JlYXRlRG9tIiwiY29udHJvbHMiLCJnZXRCdWZmZXJlZFJhbmdlIiwicmFuZ2UiLCJGTFYiLCJfaGFzU3RhcnQiLCJfZGVzdHJveSIsImN1cnJlbnRTcmMiXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7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LEtBQUswUixtQkFBMUI7QUFDRDtBQUNGLEtBUE0sQ0FBUDtBQVFEOztBQUVELE1BQUl4bUMsR0FBSixHQUFXO0FBQ1QsV0FBTyxLQUFLd25DLFVBQVo7QUFDRDs7QUFFRCxNQUFJeG5DLEdBQUosQ0FBU3VQLEdBQVQsRUFBYztBQUNaLFNBQUtnMUIsTUFBTCxDQUFZajVCLE1BQVosQ0FBbUJpRSxHQUFuQixHQUF5QkEsR0FBekI7QUFDQSxRQUFJLENBQUMsS0FBSzhsQixNQUFWLEVBQWtCO0FBQ2hCLFdBQUs1RCxLQUFMO0FBQ0EsV0FBS2xoQyxJQUFMLENBQVUsT0FBVixFQUFtQixNQUFNO0FBQ3ZCLGFBQUtnRCxLQUFMLENBQVdnYyxHQUFYO0FBQ0QsT0FGRDtBQUdBLFdBQUtoZixJQUFMLENBQVUsU0FBVixFQUFxQixNQUFNO0FBQ3pCLGFBQUtxZ0MsSUFBTDtBQUNELE9BRkQ7QUFHRCxLQVJELE1BUU87QUFDTCxXQUFLcjlCLEtBQUwsQ0FBV2djLEdBQVg7QUFDRDtBQUNELFNBQUtoZixJQUFMLENBQVUsU0FBVixFQUFxQixNQUFNO0FBQ3pCLFdBQUt3L0IsV0FBTCxHQUFtQixDQUFuQjtBQUNELEtBRkQ7QUFHRDtBQTlINEI7O0FBaUkvQnZqQyxPQUFPQyxPQUFQLEdBQWlCNjVDLFNBQWpCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdElBLGFBQWEsbUNBQW1DLEVBQUUsSSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSID0gdHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnID8gUmVmbGVjdCA6IG51bGxcbnZhciBSZWZsZWN0QXBwbHkgPSBSICYmIHR5cGVvZiBSLmFwcGx5ID09PSAnZnVuY3Rpb24nXG4gID8gUi5hcHBseVxuICA6IGZ1bmN0aW9uIFJlZmxlY3RBcHBseSh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpO1xuICB9XG5cbnZhciBSZWZsZWN0T3duS2V5c1xuaWYgKFIgJiYgdHlwZW9mIFIub3duS2V5cyA9PT0gJ2Z1bmN0aW9uJykge1xuICBSZWZsZWN0T3duS2V5cyA9IFIub3duS2V5c1xufSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldClcbiAgICAgIC5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFByb2Nlc3NFbWl0V2FybmluZyh3YXJuaW5nKSB7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2FybikgY29uc29sZS53YXJuKHdhcm5pbmcpO1xufVxuXG52YXIgTnVtYmVySXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgZnVuY3Rpb24gTnVtYmVySXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICBFdmVudEVtaXR0ZXIuaW5pdC5jYWxsKHRoaXMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzQ291bnQgPSAwO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG52YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnRFbWl0dGVyLCAnZGVmYXVsdE1heExpc3RlbmVycycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGVmYXVsdE1heExpc3RlbmVycztcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgfHwgYXJnIDwgMCB8fCBOdW1iZXJJc05hTihhcmcpKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiZGVmYXVsdE1heExpc3RlbmVyc1wiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBhcmcgKyAnLicpO1xuICAgIH1cbiAgICBkZWZhdWx0TWF4TGlzdGVuZXJzID0gYXJnO1xuICB9XG59KTtcblxuRXZlbnRFbWl0dGVyLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICBpZiAodGhpcy5fZXZlbnRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHRoaXMuX2V2ZW50cyA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHMpIHtcbiAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59O1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMobikge1xuICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInIHx8IG4gPCAwIHx8IE51bWJlcklzTmFOKG4pKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcIm5cIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgbiArICcuJyk7XG4gIH1cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiAkZ2V0TWF4TGlzdGVuZXJzKHRoYXQpIHtcbiAgaWYgKHRoYXQuX21heExpc3RlbmVycyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgcmV0dXJuIHRoYXQuX21heExpc3RlbmVycztcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiAkZ2V0TWF4TGlzdGVuZXJzKHRoaXMpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT09IHVuZGVmaW5lZCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgdmFyIGVyO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+IDApXG4gICAgICBlciA9IGFyZ3NbMF07XG4gICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIC8vIE5vdGU6IFRoZSBjb21tZW50cyBvbiB0aGUgYHRocm93YCBsaW5lcyBhcmUgaW50ZW50aW9uYWwsIHRoZXkgc2hvd1xuICAgICAgLy8gdXAgaW4gTm9kZSdzIG91dHB1dCBpZiB0aGlzIHJlc3VsdHMgaW4gYW4gdW5oYW5kbGVkIGV4Y2VwdGlvbi5cbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgIH1cbiAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5oYW5kbGVkIGVycm9yLicgKyAoZXIgPyAnICgnICsgZXIubWVzc2FnZSArICcpJyA6ICcnKSk7XG4gICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICB0aHJvdyBlcnI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gIH1cblxuICB2YXIgaGFuZGxlciA9IGV2ZW50c1t0eXBlXTtcblxuICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBSZWZsZWN0QXBwbHkoaGFuZGxlciwgdGhpcywgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIFJlZmxlY3RBcHBseShsaXN0ZW5lcnNbaV0sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGFyZ2V0Ll9ldmVudHNDb3VudCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gICAgaWYgKGV2ZW50cy5uZXdMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICAgICAgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgaWYgKGV4aXN0aW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICAgICsrdGFyZ2V0Ll9ldmVudHNDb3VudDtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIGV4aXN0aW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID1cbiAgICAgICAgcHJlcGVuZCA/IFtsaXN0ZW5lciwgZXhpc3RpbmddIDogW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgfSBlbHNlIGlmIChwcmVwZW5kKSB7XG4gICAgICBleGlzdGluZy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBtID0gJGdldE1heExpc3RlbmVycyh0YXJnZXQpO1xuICAgIGlmIChtID4gMCAmJiBleGlzdGluZy5sZW5ndGggPiBtICYmICFleGlzdGluZy53YXJuZWQpIHtcbiAgICAgIGV4aXN0aW5nLndhcm5lZCA9IHRydWU7XG4gICAgICAvLyBObyBlcnJvciBjb2RlIGZvciB0aGlzIHNpbmNlIGl0IGlzIGEgV2FybmluZ1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICB2YXIgdyA9IG5ldyBFcnJvcignUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcubGVuZ3RoICsgJyAnICsgU3RyaW5nKHR5cGUpICsgJyBsaXN0ZW5lcnMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdpbmNyZWFzZSBsaW1pdCcpO1xuICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICB3LmVtaXR0ZXIgPSB0YXJnZXQ7XG4gICAgICB3LnR5cGUgPSB0eXBlO1xuICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgIFByb2Nlc3NFbWl0V2FybmluZyh3KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG5cbmZ1bmN0aW9uIG9uY2VXcmFwcGVyKCkge1xuICB2YXIgYXJncyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIGlmICghdGhpcy5maXJlZCkge1xuICAgIHRoaXMudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy53cmFwRm4pO1xuICAgIHRoaXMuZmlyZWQgPSB0cnVlO1xuICAgIFJlZmxlY3RBcHBseSh0aGlzLmxpc3RlbmVyLCB0aGlzLnRhcmdldCwgYXJncyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX29uY2VXcmFwKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIHN0YXRlID0geyBmaXJlZDogZmFsc2UsIHdyYXBGbjogdW5kZWZpbmVkLCB0YXJnZXQ6IHRhcmdldCwgdHlwZTogdHlwZSwgbGlzdGVuZXI6IGxpc3RlbmVyIH07XG4gIHZhciB3cmFwcGVkID0gb25jZVdyYXBwZXIuYmluZChzdGF0ZSk7XG4gIHdyYXBwZWQubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgc3RhdGUud3JhcEZuID0gd3JhcHBlZDtcbiAgcmV0dXJuIHdyYXBwZWQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG4gIHRoaXMub24odHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kT25jZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgdGhpcy5wcmVwZW5kTGlzdGVuZXIodHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4vLyBFbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWYgYW5kIG9ubHkgaWYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBsaXN0LCBldmVudHMsIHBvc2l0aW9uLCBpLCBvcmlnaW5hbExpc3RlbmVyO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBsaXN0ID0gZXZlbnRzW3R5cGVdO1xuICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdC5saXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKGkgPSBsaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8IGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBvcmlnaW5hbExpc3RlbmVyID0gbGlzdFtpXS5saXN0ZW5lcjtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwKVxuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICBldmVudHNbdHlwZV0gPSBsaXN0WzBdO1xuXG4gICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgb3JpZ2luYWxMaXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyh0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzLCBldmVudHMsIGk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhldmVudHMpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gICAgICB9IGVsc2UgaWYgKGxpc3RlbmVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIExJRk8gb3JkZXJcbiAgICAgICAgZm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbmZ1bmN0aW9uIF9saXN0ZW5lcnModGFyZ2V0LCB0eXBlLCB1bndyYXApIHtcbiAgdmFyIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG4gIGlmIChldmxpc3RlbmVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gdW53cmFwID8gW2V2bGlzdGVuZXIubGlzdGVuZXIgfHwgZXZsaXN0ZW5lcl0gOiBbZXZsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIHVud3JhcCA/XG4gICAgdW53cmFwTGlzdGVuZXJzKGV2bGlzdGVuZXIpIDogYXJyYXlDbG9uZShldmxpc3RlbmVyLCBldmxpc3RlbmVyLmxlbmd0aCk7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgdHJ1ZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJhd0xpc3RlbmVycyA9IGZ1bmN0aW9uIHJhd0xpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIubGlzdGVuZXJDb3VudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyQ291bnQuY2FsbChlbWl0dGVyLCB0eXBlKTtcbiAgfVxufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gbGlzdGVuZXJDb3VudDtcbmZ1bmN0aW9uIGxpc3RlbmVyQ291bnQodHlwZSkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGV2bGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdE93bktleXModGhpcy5fZXZlbnRzKSA6IFtdO1xufTtcblxuZnVuY3Rpb24gYXJyYXlDbG9uZShhcnIsIG4pIHtcbiAgdmFyIGNvcHkgPSBuZXcgQXJyYXkobik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKVxuICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICg7IGluZGV4ICsgMSA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKVxuICAgIGxpc3RbaW5kZXhdID0gbGlzdFtpbmRleCArIDFdO1xuICBsaXN0LnBvcCgpO1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmV0W2ldID0gYXJyW2ldLmxpc3RlbmVyIHx8IGFycltpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFRyYWNrOiByZXF1aXJlKCcuL3NyYy90cmFjaycpLmRlZmF1bHQsXG4gIFRyYWNrczogcmVxdWlyZSgnLi9zcmMvdHJhY2snKS5UcmFja3MsXG4gIEF1ZGlvVHJhY2s6IHJlcXVpcmUoJy4vc3JjL3RyYWNrJykuQXVkaW9UcmFjayxcbiAgVmlkZW9UcmFjazogcmVxdWlyZSgnLi9zcmMvdHJhY2snKS5WaWRlb1RyYWNrLFxuXG4gIFhnQnVmZmVyOiByZXF1aXJlKCcuL3NyYy9idWZmZXInKS5YZ0J1ZmZlcixcbiAgUmVtdXhCdWZmZXI6IHJlcXVpcmUoJy4vc3JjL2J1ZmZlcicpLlJlbXV4QnVmZmVyLFxuXG4gIFByZVNvdXJjZTogcmVxdWlyZSgnLi9zcmMvcHJlc291Y2UnKS5kZWZhdWx0XG59O1xuIiwiZXhwb3J0IGNsYXNzIFhnQnVmZmVyIHtcbiAgLyoqXG4gICAqIEEgYnVmZmVyIHRvIHN0b3JlIGxvYWRlZCBkYXRhLlxuICAgKlxuICAgKiBAY2xhc3MgTG9hZGVyQnVmZmVyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSBPcHRpb25hbCB0aGUgYnVmZmVyIHNpemVcbiAgICovXG4gIGNvbnN0cnVjdG9yIChsZW5ndGgpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aCB8fCAwXG4gICAgdGhpcy5oaXN0b3J5TGVuID0gbGVuZ3RoIHx8IDBcbiAgICB0aGlzLmFycmF5ID0gW11cbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZnVuY3Rpb24gdG8gcHVzaCBkYXRhLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gZGF0YSAtIFRoZSBkYXRhIHRvIHB1c2ggaW50byB0aGUgYnVmZmVyXG4gICAqL1xuICBwdXNoIChkYXRhKSB7XG4gICAgdGhpcy5hcnJheS5wdXNoKGRhdGEpXG4gICAgdGhpcy5sZW5ndGggKz0gZGF0YS5ieXRlTGVuZ3RoXG4gICAgdGhpcy5oaXN0b3J5TGVuICs9IGRhdGEuYnl0ZUxlbmd0aFxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBmdW5jdGlvbiB0byBzaGlmdCBkYXRhLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoIC0gVGhlIHNpemUgb2Ygc2hpZnQuXG4gICAqL1xuICBzaGlmdCAobGVuZ3RoKSB7XG4gICAgaWYgKHRoaXMuYXJyYXkubGVuZ3RoIDwgMSkge1xuICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KDApXG4gICAgfVxuXG4gICAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2hpZnRCdWZmZXIoKVxuICAgIH1cbiAgICBpZiAoKHRoaXMub2Zmc2V0ICsgbGVuZ3RoKSA9PT0gdGhpcy5hcnJheVswXS5sZW5ndGgpIHtcbiAgICAgIGxldCByZXQgPSB0aGlzLmFycmF5WzBdLnNsaWNlKHRoaXMub2Zmc2V0LCB0aGlzLm9mZnNldCArIGxlbmd0aClcbiAgICAgIHRoaXMub2Zmc2V0ID0gMFxuICAgICAgdGhpcy5hcnJheS5zaGlmdCgpXG4gICAgICB0aGlzLmxlbmd0aCAtPSBsZW5ndGhcbiAgICAgIHJldHVybiByZXRcbiAgICB9XG5cbiAgICBpZiAoKHRoaXMub2Zmc2V0ICsgbGVuZ3RoKSA8IHRoaXMuYXJyYXlbMF0ubGVuZ3RoKSB7XG4gICAgICBsZXQgcmV0ID0gdGhpcy5hcnJheVswXS5zbGljZSh0aGlzLm9mZnNldCwgdGhpcy5vZmZzZXQgKyBsZW5ndGgpXG4gICAgICB0aGlzLm9mZnNldCArPSBsZW5ndGhcbiAgICAgIHRoaXMubGVuZ3RoIC09IGxlbmd0aFxuICAgICAgcmV0dXJuIHJldFxuICAgIH1cblxuICAgIGxldCByZXQgPSBuZXcgVWludDhBcnJheShsZW5ndGgpXG4gICAgbGV0IHRtcG9mZiA9IDBcbiAgICB3aGlsZSAodGhpcy5hcnJheS5sZW5ndGggPiAwICYmIGxlbmd0aCA+IDApIHtcbiAgICAgIGlmICgodGhpcy5vZmZzZXQgKyBsZW5ndGgpIDwgdGhpcy5hcnJheVswXS5sZW5ndGgpIHtcbiAgICAgICAgbGV0IHRtcCA9IHRoaXMuYXJyYXlbMF0uc2xpY2UodGhpcy5vZmZzZXQsIHRoaXMub2Zmc2V0ICsgbGVuZ3RoKVxuICAgICAgICByZXQuc2V0KHRtcCwgdG1wb2ZmKVxuICAgICAgICB0aGlzLm9mZnNldCArPSBsZW5ndGhcbiAgICAgICAgdGhpcy5sZW5ndGggLT0gbGVuZ3RoXG4gICAgICAgIGxlbmd0aCA9IDBcbiAgICAgICAgYnJlYWtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB0ZW1wbGVuZ3RoID0gdGhpcy5hcnJheVswXS5sZW5ndGggLSB0aGlzLm9mZnNldFxuICAgICAgICByZXQuc2V0KHRoaXMuYXJyYXlbMF0uc2xpY2UodGhpcy5vZmZzZXQsIHRoaXMuYXJyYXlbMF0ubGVuZ3RoKSwgdG1wb2ZmKVxuICAgICAgICB0aGlzLmFycmF5LnNoaWZ0KClcbiAgICAgICAgdGhpcy5vZmZzZXQgPSAwXG4gICAgICAgIHRtcG9mZiArPSB0ZW1wbGVuZ3RoXG4gICAgICAgIHRoaXMubGVuZ3RoIC09IHRlbXBsZW5ndGhcbiAgICAgICAgbGVuZ3RoIC09IHRlbXBsZW5ndGhcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldFxuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRvIGNsZWFyIHRoZSBidWZmZXIuXG4gICAqL1xuICBjbGVhciAoKSB7XG4gICAgdGhpcy5hcnJheSA9IFtdXG4gICAgdGhpcy5sZW5ndGggPSAwXG4gICAgdGhpcy5vZmZzZXQgPSAwXG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmNsZWFyKClcbiAgICB0aGlzLmhpc3RvcnlMZW4gPSAwXG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gdG8gc2hpZnQgb25lIHVuaXQ4QXJyYXkuXG4gICAqL1xuICBfc2hpZnRCdWZmZXIgKCkge1xuICAgIHRoaXMubGVuZ3RoIC09IHRoaXMuYXJyYXlbMF0ubGVuZ3RoXG4gICAgdGhpcy5vZmZzZXQgPSAwXG4gICAgcmV0dXJuIHRoaXMuYXJyYXkuc2hpZnQoKVxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgdWludDggZGF0YSB0byBudW1iZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCAtIHRoZSBzdGFydCBwb3N0aW9uLlxuICAgKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoIC0gdGhlIGxlbmd0aCBvZiBkYXRhLlxuICAgKi9cbiAgdG9JbnQgKHN0YXJ0LCBsZW5ndGgpIHtcbiAgICBsZXQgcmV0SW50ID0gMFxuICAgIGxldCBpID0gdGhpcy5vZmZzZXQgKyBzdGFydFxuICAgIHdoaWxlIChpIDwgdGhpcy5vZmZzZXQgKyBsZW5ndGggKyBzdGFydCkge1xuICAgICAgaWYgKGkgPCB0aGlzLmFycmF5WzBdLmxlbmd0aCkge1xuICAgICAgICByZXRJbnQgPSByZXRJbnQgKiAyNTYgKyB0aGlzLmFycmF5WzBdW2ldXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYXJyYXlbMV0pIHtcbiAgICAgICAgcmV0SW50ID0gcmV0SW50ICogMjU2ICsgdGhpcy5hcnJheVsxXVtpIC0gdGhpcy5hcnJheVswXS5sZW5ndGhdXG4gICAgICB9XG5cbiAgICAgIGkrK1xuICAgIH1cbiAgICByZXR1cm4gcmV0SW50XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlbXV4QnVmZmVyIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMudmlkZW8gPSBbXVxuICAgIHRoaXMuYXVkaW8gPSBbXVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy52aWRlbyA9IFtdXG4gICAgdGhpcy5hdWRpbyA9IFtdXG4gIH1cbn1cbiIsImNsYXNzIFNvdXJjZSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLm1pbWV0eXBlID0gJyc7XG4gICAgdGhpcy5pbml0ID0gbnVsbDtcbiAgICB0aGlzLmRhdGEgPSBbXTtcbiAgfVxufVxuXG5jbGFzcyBQcmVTb3VyY2Uge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5zb3VyY2VzID0ge307XG4gIH1cblxuICBnZXRTb3VyY2UgKHNvdXJjZSkge1xuICAgIHJldHVybiB0aGlzLnNvdXJjZXNbc291cmNlXTtcbiAgfVxuXG4gIGNyZWF0ZVNvdXJjZSAobmFtZSkge1xuICAgIHRoaXMuc291cmNlc1tuYW1lXSA9IG5ldyBTb3VyY2UoKTtcbiAgICByZXR1cm4gdGhpcy5zb3VyY2VzW25hbWVdO1xuICB9XG5cbiAgY2xlYXIgKCkge1xuICAgIHRoaXMuc291cmNlcyA9IHt9O1xuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5zb3VyY2VzID0ge307XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJlU291cmNlO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJhY2sge1xuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yLlxuICAgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuaWQgPSAtMVxuICAgIHRoaXMuc2VxdWVuY2VOdW1iZXIgPSAwXG4gICAgdGhpcy5zYW1wbGVzID0gW11cbiAgICB0aGlzLmRyb3BwZWRTYW1wbGVzID0gW11cbiAgICB0aGlzLmxlbmd0aCA9IDBcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgdHJhY2suXG4gICAqL1xuICByZXNldCAoKSB7XG4gICAgdGhpcy5zZXF1ZW5jZU51bWJlciA9IDBcbiAgICB0aGlzLnNhbXBsZXMgPSBbXVxuICAgIHRoaXMubGVuZ3RoID0gMFxuICB9XG4gIC8qKlxuICAgKiBkZXN0cm95IHRoZSB0cmFjay5cbiAgICovXG4gIGRpc3Ryb3kgKCkge1xuICAgIHRoaXMucmVzZXQoKVxuICAgIHRoaXMuaWQgPSAtMVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBdWRpb1RyYWNrIGV4dGVuZHMgVHJhY2sge1xuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciBhdWRpbyB0cmFjay5cbiAgICovXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5UQUcgPSAnQXVkaW9UcmFjaydcbiAgICB0aGlzLnR5cGUgPSAnYXVkaW8nXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFZpZGVvVHJhY2sgZXh0ZW5kcyBUcmFjayB7XG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHZpZGVvIHRyYWNrLlxuICAgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLlRBRyA9ICdWaWRlb1RyYWNrJ1xuICAgIHRoaXMudHlwZSA9ICd2aWRlbydcbiAgICB0aGlzLmRyb3BwZWQgPSAwXG4gIH1cbiAgLyoqXG4gICAqIHJlc2V0IHRoZSB2aWRlbyB0cmFjay5cbiAgICovXG4gIHJlc2V0ICgpIHtcbiAgICB0aGlzLnNlcXVlbmNlTnVtYmVyID0gMFxuICAgIHRoaXMuc2FtcGxlcyA9IFtdXG4gICAgdGhpcy5sZW5ndGggPSAwXG4gICAgdGhpcy5kcm9wcGVkID0gMFxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUcmFja3Mge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5hdWRpb1RyYWNrID0gbnVsbFxuICAgIHRoaXMudmlkZW9UcmFjayA9IG51bGxcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuYXVkaW9UcmFjayA9IG51bGxcbiAgICB0aGlzLnZpZGVvVHJhY2sgPSBudWxsXG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBOYWx1bml0OiByZXF1aXJlKCcuL3NyYy9oMjY0L25hbHVuaXQnKS5kZWZhdWx0LFxuICBTcHNQYXJzZXI6IHJlcXVpcmUoJy4vc3JjL2gyNjQvbmFsdW5pdC9zcHMnKS5kZWZhdWx0LFxuXG4gIENvbXBhdGliaWxpdHk6IHJlcXVpcmUoJy4vc3JjL2NvbXBhdGliaWxpdHknKS5kZWZhdWx0XG59O1xuIiwiXG5jbGFzcyBBQUMge1xuXG4gIHN0YXRpYyBnZXRTaWxlbnRGcmFtZShjb2RlYywgY2hhbm5lbENvdW50KSB7XG4gICAgaWYgKGNvZGVjID09PSAnbXA0YS40MC4yJykge1xuICAgICAgLy8gaGFuZGxlIExDLUFBQ1xuICAgICAgaWYgKGNoYW5uZWxDb3VudCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjMsIDB4ODBdKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSAyKSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgyMSwgMHgwMCwgMHg0OSwgMHg5MCwgMHgwMiwgMHgxOSwgMHgwMCwgMHgyMywgMHg4MF0pO1xuICAgICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDAwLCAweGM4LCAweDAwLCAweDgwLCAweDIwLCAweDg0LCAweDAxLCAweDI2LCAweDQwLCAweDA4LCAweDY0LCAweDAwLCAweDhlXSk7XG4gICAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gNCkge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4ODAsIDB4MmMsIDB4ODAsIDB4MDgsIDB4MDIsIDB4MzhdKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSA1KSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4MiwgMHgzMCwgMHgwNCwgMHg5OSwgMHgwMCwgMHgyMSwgMHg5MCwgMHgwMiwgMHgzOF0pO1xuICAgICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDYpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDAwLCAweGM4LCAweDAwLCAweDgwLCAweDIwLCAweDg0LCAweDAxLCAweDI2LCAweDQwLCAweDA4LCAweDY0LCAweDAwLCAweDgyLCAweDMwLCAweDA0LCAweDk5LCAweDAwLCAweDIxLCAweDkwLCAweDAyLCAweDAwLCAweGIyLCAweDAwLCAweDIwLCAweDA4LCAweGUwXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGhhbmRsZSBIRS1BQUMgKG1wNGEuNDAuNSAvIG1wNGEuNDAuMjkpXG4gICAgICBpZiAoY2hhbm5lbENvdW50ID09PSAxKSB7XG4gICAgICAgIC8vIGZmbXBlZyAteSAtZiBsYXZmaSAtaSBcImFldmFsc3JjPTA6ZD0wLjA1XCIgLWM6YSBsaWJmZGtfYWFjIC1wcm9maWxlOmEgYWFjX2hlIC1iOmEgNGsgb3V0cHV0LmFhYyAmJiBoZXhkdW1wIC12IC1lICcxNi8xIFwiMHgleCxcIiBcIlxcblwiJyAtdiBvdXRwdXQuYWFjXG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgxLCAweDQwLCAweDIyLCAweDgwLCAweGEzLCAweDRlLCAweGU2LCAweDgwLCAweGJhLCAweDgsIDB4MCwgMHgwLCAweDAsIDB4MWMsIDB4NiwgMHhmMSwgMHhjMSwgMHhhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVlXSk7XG4gICAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gMikge1xuICAgICAgICAvLyBmZm1wZWcgLXkgLWYgbGF2ZmkgLWkgXCJhZXZhbHNyYz0wfDA6ZD0wLjA1XCIgLWM6YSBsaWJmZGtfYWFjIC1wcm9maWxlOmEgYWFjX2hlX3YyIC1iOmEgNGsgb3V0cHV0LmFhYyAmJiBoZXhkdW1wIC12IC1lICcxNi8xIFwiMHgleCxcIiBcIlxcblwiJyAtdiBvdXRwdXQuYWFjXG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgxLCAweDQwLCAweDIyLCAweDgwLCAweGEzLCAweDVlLCAweGU2LCAweDgwLCAweGJhLCAweDgsIDB4MCwgMHgwLCAweDAsIDB4MCwgMHg5NSwgMHgwLCAweDYsIDB4ZjEsIDB4YTEsIDB4YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1ZV0pO1xuICAgICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDMpIHtcbiAgICAgICAgLy8gZmZtcGVnIC15IC1mIGxhdmZpIC1pIFwiYWV2YWxzcmM9MHwwfDA6ZD0wLjA1XCIgLWM6YSBsaWJmZGtfYWFjIC1wcm9maWxlOmEgYWFjX2hlX3YyIC1iOmEgNGsgb3V0cHV0LmFhYyAmJiBoZXhkdW1wIC12IC1lICcxNi8xIFwiMHgleCxcIiBcIlxcblwiJyAtdiBvdXRwdXQuYWFjXG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgxLCAweDQwLCAweDIyLCAweDgwLCAweGEzLCAweDVlLCAweGU2LCAweDgwLCAweGJhLCAweDgsIDB4MCwgMHgwLCAweDAsIDB4MCwgMHg5NSwgMHgwLCAweDYsIDB4ZjEsIDB4YTEsIDB4YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1ZV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFBQztcbiIsImltcG9ydCB7RVZFTlRTfSBmcm9tICd4Z3BsYXllci11dGlscydcbmltcG9ydCBBQUMgZnJvbSAnLi9hYWMvYWFjLWhlbHBlcidcblxuY29uc3Qge1JFTVVYX0VWRU5UUywgREVNVVhfRVZFTlRTfSA9IEVWRU5UU1xuXG5jbGFzcyBDb21wYXRpYmlsaXR5IHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMubmV4dEF1ZGlvRHRzID0gMCAvLyDmqKHmi5/kuIvkuIDmrrXpn7PpopHmlbDmja7nmoRkdHNcbiAgICB0aGlzLm5leHRWaWRlb0R0cyA9IDAgLy8g5qih5ouf5LiL5LiA5q616KeG6aKR5pWw5o2u55qEZHRzXG5cbiAgICB0aGlzLmxhc3RBdWRpb1NhbXBsZXNMZW4gPSAwIC8vIOS4iuS4gOautemfs+mikeaVsOaNrueahOmVv+W6plxuICAgIHRoaXMubGFzdFZpZGVvU2FtcGxlc0xlbiA9IDAgLy8g5LiK5LiA5q616KeG6aKR5pWw5o2u55qE6ZW/5bqmXG5cbiAgICB0aGlzLmxhc3RWaWRlb0R0cyA9IHVuZGVmaW5lZCAvLyDkuIrkuIDmrrXpn7PpopHmlbDmja7nmoTplb/luqZcbiAgICB0aGlzLmxhc3RBdWRpb0R0cyA9IHVuZGVmaW5lZCAvLyDkuIrkuIDmrrXop4bpopHmlbDmja7nmoTplb/luqZcblxuICAgIHRoaXMuYWxsQXVkaW9TYW1wbGVzQ291bnQgPSAwIC8vIOmfs+mikeaAu+aVsOaNrumHjyjljp/lp4vluKcpXG4gICAgdGhpcy5hbGxWaWRlb1NhbXBsZXNDb3VudCA9IDAgLy8g6KeG6aKR5oC75pWw5o2u6YePKOWOn+Wni+W4pylcblxuICAgIHRoaXMuX2ZpcnN0QXVkaW9TYW1wbGUgPSBudWxsXG4gICAgdGhpcy5fZmlyc3RWaWRlb1NhbXBsZSA9IG51bGxcblxuICAgIHRoaXMuZmlsbGVkQXVkaW9TYW1wbGVzID0gW10gLy8g6KGl5YWF6Z+z6aKR5bin77yI77yJXG4gICAgdGhpcy5maWxsZWRWaWRlb1NhbXBsZXMgPSBbXSAvLyDooaXlhYXop4bpopHluKfvvIjvvIlcblxuICAgIHRoaXMuX3ZpZGVvTGFyZ2VHYXAgPSAwXG4gICAgdGhpcy5fYXVkaW9MYXJnZUdhcCA9IDBcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIHRoaXMuYmVmb3JlKFJFTVVYX0VWRU5UUy5SRU1VWF9NRURJQSwgdGhpcy5kb0ZpeC5iaW5kKHRoaXMpKVxuICB9XG5cbiAgcmVzZXQgKCkge1xuICAgIHRoaXMubmV4dEF1ZGlvRHRzID0gbnVsbCAvLyDkvLDnrpfkuIvkuIDmrrXpn7PpopHmlbDmja7nmoRkdHNcbiAgICB0aGlzLm5leHRWaWRlb0R0cyA9IG51bGwgLy8g5Lyw566X5LiL5LiA5q616KeG6aKR5pWw5o2u55qEZHRzXG5cbiAgICB0aGlzLmxhc3RBdWRpb1NhbXBsZXNMZW4gPSAwIC8vIOS4iuS4gOautemfs+mikeaVsOaNrueahOmVv+W6plxuICAgIHRoaXMubGFzdFZpZGVvU2FtcGxlc0xlbiA9IDAgLy8g5LiK5LiA5q616KeG6aKR5pWw5o2u55qE6ZW/5bqmXG5cbiAgICB0aGlzLmxhc3RWaWRlb0R0cyA9IHVuZGVmaW5lZCAvLyDkuIrkuIDmrrXpn7PpopHmlbDmja7nmoTplb/luqZcbiAgICB0aGlzLmxhc3RBdWRpb0R0cyA9IHVuZGVmaW5lZCAvLyDkuIrkuIDmrrXop4bpopHmlbDmja7nmoTplb/luqZcblxuICAgIC8vIHRoaXMuYWxsQXVkaW9TYW1wbGVzQ291bnQgPSAwIC8vIOmfs+mikeaAu+aVsOaNrumHjyjljp/lp4vluKcpXG4gICAgLy8gdGhpcy5hbGxWaWRlb1NhbXBsZXNDb3VudCA9IDAgLy8g6KeG6aKR5oC75pWw5o2u6YePKOWOn+Wni+W4pylcblxuICAgIC8vIHRoaXMuX2ZpcnN0QXVkaW9TYW1wbGUgPSBudWxsXG4gICAgLy8gdGhpcy5fZmlyc3RWaWRlb1NhbXBsZSA9IG51bGxcblxuICAgIHRoaXMuZmlsbGVkQXVkaW9TYW1wbGVzID0gW10gLy8g6KGl5YWF6Z+z6aKR5bin77yI77yJXG4gICAgdGhpcy5maWxsZWRWaWRlb1NhbXBsZXMgPSBbXSAvLyDooaXlhYXop4bpopHluKfvvIjvvIlcbiAgfVxuXG4gIGRvRml4ICgpIHtcbiAgICBjb25zdCB7IGlzRmlyc3RBdWRpb1NhbXBsZXMsIGlzRmlyc3RWaWRlb1NhbXBsZXMgfSA9IHRoaXMuZ2V0Rmlyc3RTYW1wbGUoKVxuXG4gICAgLy8gdGhpcy5yZW1vdmVJbnZhbGlkU2FtcGxlcygpXG5cbiAgICB0aGlzLnJlY29yZFNhbXBsZXNDb3VudCgpXG5cbiAgICBpZiAodGhpcy5fZmlyc3RWaWRlb1NhbXBsZSkge1xuICAgICAgdGhpcy5maXhSZWZTYW1wbGVEdXJhdGlvbih0aGlzLnZpZGVvVHJhY2subWV0YSwgdGhpcy52aWRlb1RyYWNrLnNhbXBsZXMpXG4gICAgfVxuICAgIGlmICh0aGlzLl9maXJzdEF1ZGlvU2FtcGxlKSB7XG4gICAgICB0aGlzLmZpeFJlZlNhbXBsZUR1cmF0aW9uKHRoaXMuYXVkaW9UcmFjay5tZXRhLCB0aGlzLmF1ZGlvVHJhY2suc2FtcGxlcylcbiAgICB9XG5cbiAgICBjb25zdCB7IGNoYW5nZWQ6IHZpZGVvQ2hhbmdlZCwgY2hhbmdlZElkeDogdmlkZW9DaGFuZ2VkSWR4IH0gPSBDb21wYXRpYmlsaXR5LmRldGFjdENoYW5nZVN0cmVhbSh0aGlzLnZpZGVvVHJhY2suc2FtcGxlcylcbiAgICBpZiAodmlkZW9DaGFuZ2VkICYmICFpc0ZpcnN0QXVkaW9TYW1wbGVzKSB7XG4gICAgICB0aGlzLmZpeENoYW5nZVN0cmVhbVZpZGVvKHZpZGVvQ2hhbmdlZElkeClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb0ZpeFZpZGVvKGlzRmlyc3RWaWRlb1NhbXBsZXMpXG4gICAgfVxuXG4gICAgY29uc3QgeyBjaGFuZ2VkOiBhdWRpb0NoYW5nZWQsIGNoYW5nZWRJZHg6IGF1ZGlvQ2hhbmdlZElkeCB9ID0gQ29tcGF0aWJpbGl0eS5kZXRhY3RDaGFuZ2VTdHJlYW0odGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMpXG4gICAgaWYgKGF1ZGlvQ2hhbmdlZCkge1xuICAgICAgdGhpcy5maXhDaGFuZ2VTdHJlYW1BdWRpbyhhdWRpb0NoYW5nZWRJZHgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZG9GaXhBdWRpbyhpc0ZpcnN0QXVkaW9TYW1wbGVzKVxuICAgIH1cblxuICAgIC8vIHRoaXMucmVtb3ZlSW52YWxpZFNhbXBsZXMoKVxuICB9XG5cbiAgZG9GaXhWaWRlbyAoZmlyc3QsIHN0cmVhbUNoYW5nZVN0YXJ0KSB7XG4gICAgbGV0IHtzYW1wbGVzOiB2aWRlb1NhbXBsZXMsIG1ldGF9ID0gdGhpcy52aWRlb1RyYWNrXG5cbiAgICBpZiAobWV0YS5mcmFtZVJhdGUgJiYgbWV0YS5mcmFtZVJhdGUuZml4ZWQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF2aWRlb1NhbXBsZXMgfHwgIXZpZGVvU2FtcGxlcy5sZW5ndGggfHwgIXRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIGNvbnNvbGUubG9nKGB2aWRlbyBsYXN0U2FtcGxlLCAke3ZpZGVvU2FtcGxlc1t2aWRlb1NhbXBsZXMubGVuZ3RoIC0gMV0uZHRzfWApXG5cbiAgICBjb25zdCBmaXJzdFNhbXBsZSA9IHZpZGVvU2FtcGxlc1swXVxuXG4gICAgY29uc3Qgc2FtcGxlc0xlbiA9IHZpZGVvU2FtcGxlcy5sZW5ndGg7XG5cbiAgICAvLyBzdGVwMC7kv67lpI1obHPmtYHlh7rnjrDlt6jlpKdnYXDvvIzpnIDopoHlvLrliLbph43lrprkvY3nmoTpl67pophcbiAgICBpZiAodGhpcy5fdmlkZW9MYXJnZUdhcCA+IDApIHtcbiAgICAgIENvbXBhdGliaWxpdHkuZG9GaXhMYXJnZUdhcCh2aWRlb1NhbXBsZXMsIHRoaXMuX3ZpZGVvTGFyZ2VHYXApXG4gICAgfVxuXG4gICAgaWYgKGZpcnN0U2FtcGxlLmR0cyAhPT0gdGhpcy5fZmlyc3RWaWRlb1NhbXBsZS5kdHMgJiYgKHN0cmVhbUNoYW5nZVN0YXJ0IHx8IENvbXBhdGliaWxpdHkuZGV0ZWN0TGFyZ2VHYXAodGhpcy5uZXh0VmlkZW9EdHMsIGZpcnN0U2FtcGxlKSkpIHtcbiAgICAgIGlmIChzdHJlYW1DaGFuZ2VTdGFydCkge1xuICAgICAgICB0aGlzLm5leHRWaWRlb0R0cyA9IHN0cmVhbUNoYW5nZVN0YXJ0IC8vIEZJWDogSGxz5Lit6YCU5YiHY29kZWPvvIzlnKjlpoLmnpznm7TmjqVzZWVr5Yiw5ZCO6Z2i55qE54K55Lya5a+86Ie0bGFyZ2VHYXDorqHnrpflpLHotKVcbiAgICAgIH1cblxuICAgICAgdGhpcy5fdmlkZW9MYXJnZUdhcCA9IHRoaXMubmV4dFZpZGVvRHRzIC0gZmlyc3RTYW1wbGUuZHRzXG4gICAgICBDb21wYXRpYmlsaXR5LmRvRml4TGFyZ2VHYXAodmlkZW9TYW1wbGVzLCB0aGlzLl92aWRlb0xhcmdlR2FwKVxuICAgIH1cblxuICAgIGNvbnN0IGZpcnN0RHRzID0gZmlyc3RTYW1wbGUuZHRzXG5cbiAgICAvLyBzdGVwMS4g5L+u5aSN5LiOYXVkaW/pppbluKflt67ot53lpKrlpKfnmoTpl67pophcbiAgICBpZiAoZmlyc3QgJiYgdGhpcy5fZmlyc3RBdWRpb1NhbXBsZSkge1xuICAgICAgY29uc3QgdmlkZW9GaXJzdER0cyA9IHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUuZHRzXG4gICAgICBjb25zdCBhdWRpb0ZpcnN0RHRzID0gdGhpcy5fZmlyc3RBdWRpb1NhbXBsZS5kdHNcbiAgICAgIGNvbnN0IGdhcCA9IHZpZGVvRmlyc3REdHMgLSBhdWRpb0ZpcnN0RHRzXG4gICAgICBpZiAoZ2FwID4gKDIgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSkge1xuICAgICAgICBjb25zdCBmaWxsQ291bnQgPSBNYXRoLmZsb29yKGdhcCAvIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pXG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxsQ291bnQ7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGNsb25lZEZpcnN0U2FtcGxlID0gT2JqZWN0LmFzc2lnbih7fSwgZmlyc3RTYW1wbGUpIC8vIOinhumikeWktOmDqOW4p+e8uuWksemcgOimgeWkjeWItuesrOS4gOW4p1xuICAgICAgICAgIC8vIOmHjeaWsOiuoeeul3NhbXBsZeeahGR0c+WSjHB0c1xuICAgICAgICAgIGNsb25lZEZpcnN0U2FtcGxlLmR0cyA9IHZpZGVvRmlyc3REdHMgLSAoaSArIDEpICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuICAgICAgICAgIGNsb25lZEZpcnN0U2FtcGxlLnB0cyA9IGNsb25lZEZpcnN0U2FtcGxlLmR0cyArIGNsb25lZEZpcnN0U2FtcGxlLmN0c1xuXG4gICAgICAgICAgdmlkZW9TYW1wbGVzLnVuc2hpZnQoY2xvbmVkRmlyc3RTYW1wbGUpXG5cbiAgICAgICAgICB0aGlzLmZpbGxlZFZpZGVvU2FtcGxlcy5wdXNoKHtcbiAgICAgICAgICAgIGR0czogY2xvbmVkRmlyc3RTYW1wbGUuZHRzLFxuICAgICAgICAgICAgc2l6ZTogY2xvbmVkRmlyc3RTYW1wbGUuZGF0YS5ieXRlTGVuZ3RoXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBnYXBcbiAgICAvLyBzdGVwMi4g5L+u5aSNc2FtcGxlc+auteS5i+mXtOeahOmXtOi3nemXrumimOOAgVxuICAgIGlmICh0aGlzLm5leHRWaWRlb0R0cykge1xuICAgICAgLy8gc3RlcDEuIOWkhOeQhnNhbXBsZXPmrrXkuYvpl7TnmoTkuKLluKfmg4XlhrVcbiAgICAgIC8vIOW9k+WPkeeOsGR1cmF0aW9u5beu6Led5aSn5LqOMuW4p+aXtui/m+ihjOihpeW4p1xuICAgICAgZ2FwID0gZmlyc3REdHMgLSB0aGlzLm5leHRWaWRlb0R0c1xuICAgICAgY29uc3QgYWJzR2FwID0gTWF0aC5hYnMoZ2FwKVxuICAgICAgaWYgKGdhcCA+ICgyICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbikpIHtcbiAgICAgICAgY29uc3QgZmlsbEZyYW1lQ291bnQgPSBNYXRoLmZsb29yKGdhcCAvIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pXG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxsRnJhbWVDb3VudDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgY2xvbmVkU2FtcGxlID0gT2JqZWN0LmFzc2lnbih7fSwgdmlkZW9TYW1wbGVzWzBdKVxuICAgICAgICAgIGNvbnN0IGNvbXB1dGVkID0gZmlyc3REdHMgLSAoaSArIDEpICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuXG4gICAgICAgICAgY2xvbmVkU2FtcGxlLmR0cyA9IGNvbXB1dGVkID4gdGhpcy5uZXh0VmlkZW9EdHMgPyBjb21wdXRlZCA6IHRoaXMubmV4dFZpZGVvRHRzIC8vIOihpeeahOesrOS4gOW4p+S4gOWumuimgeaYr25leHRWaWRlb0R0c1xuICAgICAgICAgIGNsb25lZFNhbXBsZS5wdHMgPSBjbG9uZWRTYW1wbGUuZHRzICsgY2xvbmVkU2FtcGxlLmN0c1xuXG4gICAgICAgICAgdGhpcy52aWRlb1RyYWNrLnNhbXBsZXMudW5zaGlmdChjbG9uZWRTYW1wbGUpXG5cbiAgICAgICAgICB0aGlzLmZpbGxlZFZpZGVvU2FtcGxlcy5wdXNoKHtcbiAgICAgICAgICAgIGR0czogY2xvbmVkU2FtcGxlLmR0cyxcbiAgICAgICAgICAgIHNpemU6IGNsb25lZFNhbXBsZS5kYXRhLmJ5dGVMZW5ndGhcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGFic0dhcCA8PSBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uICYmIGFic0dhcCA+IDApIHtcbiAgICAgICAgLy8g5b2T5beu6Led5ZyoKy3kuIDluKfkuYvpl7Tml7blsIbnrKzkuIDluKfnmoRkdHPlvLrooYzlrprkvY3liLDmnJ/mnJvkvY3nva5cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ+mHjeWumuS9jeinhumikeW4p2R0cycsIHZpZGVvU2FtcGxlc1swXS5kdHMsIHRoaXMubmV4dFZpZGVvRHRzKVxuICAgICAgICB2aWRlb1NhbXBsZXNbMF0uZHRzID0gdGhpcy5uZXh0VmlkZW9EdHNcbiAgICAgICAgdmlkZW9TYW1wbGVzWzBdLm9yaWdpbkR0cyA9IHZpZGVvU2FtcGxlc1swXS5kdHNcbiAgICAgICAgdmlkZW9TYW1wbGVzWzBdLmN0cyA9IHZpZGVvU2FtcGxlc1swXS5jdHMgIT09IHVuZGVmaW5lZCA/IHZpZGVvU2FtcGxlc1swXS5jdHMgOiB2aWRlb1NhbXBsZXNbMF0ucHRzIC0gdmlkZW9TYW1wbGVzWzBdLmR0c1xuICAgICAgICB2aWRlb1NhbXBsZXNbMF0ucHRzID0gdmlkZW9TYW1wbGVzWzBdLmR0cyArIHZpZGVvU2FtcGxlc1swXS5jdHNcbiAgICAgIH0gZWxzZSBpZiAoZ2FwIDwgMCkge1xuICAgICAgICAvLyDlh7rnjrDlpKfnmoRnYXBcbiAgICAgICAgQ29tcGF0aWJpbGl0eS5kb0ZpeExhcmdlR2FwKHZpZGVvU2FtcGxlcywgKC0xICogZ2FwKSlcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgbGFzdER0cyA9IHZpZGVvU2FtcGxlc1t2aWRlb1NhbXBsZXMubGVuZ3RoIC0gMV0uZHRzO1xuXG4gICAgY29uc3QgbGFzdFNhbXBsZUR1cmF0aW9uID0gdmlkZW9TYW1wbGVzLmxlbmd0aCA+PSAyID8gbGFzdER0cyAtIHZpZGVvU2FtcGxlc1t2aWRlb1NhbXBsZXMubGVuZ3RoIC0gMl0uZHRzIDogbWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuXG4gICAgdGhpcy5sYXN0VmlkZW9TYW1wbGVzTGVuID0gc2FtcGxlc0xlblxuICAgIHRoaXMubmV4dFZpZGVvRHRzID0gbGFzdER0cyArIGxhc3RTYW1wbGVEdXJhdGlvblxuICAgIHRoaXMubGFzdFZpZGVvRHRzID0gbGFzdER0c1xuXG4gICAgLy8gc3RlcDIuIOS/ruWkjXNhbXBsZeauteS5i+WGheeahOmXtOi3nemXrumimFxuICAgIC8vIHN0ZXAzLiDkv67lpI1zYW1wbGVz5q615YaF6YOo55qEZHRz5byC5bi46Zeu6aKYXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHZpZGVvU2FtcGxlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgY3VycmVudCA9IHZpZGVvU2FtcGxlc1tpXVxuICAgICAgY29uc3QgbmV4dCA9IHZpZGVvU2FtcGxlc1tpICsgMV1cblxuICAgICAgaWYgKCFuZXh0KSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkdXJhdGlvbiA9IG5leHQuZHRzIC0gY3VycmVudC5kdHM7XG5cbiAgICAgIGlmIChkdXJhdGlvbiA+ICgyICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbikpIHtcbiAgICAgICAgLy8g5Lik5bin5LmL6Ze06Ze06ZqU5aSq5aSn77yM6ZyA6KaB6KGl56m655m95binXG4gICAgICAgIGxldCBmaWxsRnJhbWVDb3VudCA9IE1hdGguZmxvb3IoZHVyYXRpb24gLyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKVxuXG4gICAgICAgIGxldCBmaWxsRnJhbWVJZHggPSAwXG4gICAgICAgIHdoaWxlIChmaWxsRnJhbWVJZHggPCBmaWxsRnJhbWVDb3VudCkge1xuICAgICAgICAgIGNvbnN0IGZpbGxGcmFtZSA9IE9iamVjdC5hc3NpZ24oe30sIG5leHQpXG4gICAgICAgICAgZmlsbEZyYW1lLmR0cyA9IGN1cnJlbnQuZHRzICsgKGZpbGxGcmFtZUlkeCArIDEpICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuICAgICAgICAgIGZpbGxGcmFtZS5wdHMgPSBmaWxsRnJhbWUuZHRzICsgZmlsbEZyYW1lLmN0c1xuICAgICAgICAgIGlmIChmaWxsRnJhbWUgPCBuZXh0LmR0cykge1xuICAgICAgICAgICAgdmlkZW9TYW1wbGVzLnNwbGljZShpLCAwLCBmaWxsRnJhbWUpXG5cbiAgICAgICAgICAgIHRoaXMuZmlsbGVkVmlkZW9TYW1wbGVzLnB1c2goe1xuICAgICAgICAgICAgICBkdHM6IGZpbGxGcmFtZS5kdHMsXG4gICAgICAgICAgICAgIHNpemU6IGZpbGxGcmFtZS5kYXRhLmJ5dGVMZW5ndGhcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZmlsbEZyYW1lSWR4KytcbiAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnZpZGVvVHJhY2suc2FtcGxlcyA9IHZpZGVvU2FtcGxlcztcbiAgfVxuXG4gIGRvRml4QXVkaW8gKGZpcnN0LCBzdHJlYW1DaGFuZ2VTdGFydCkge1xuICAgIGxldCB7c2FtcGxlczogYXVkaW9TYW1wbGVzLCBtZXRhfSA9IHRoaXMuYXVkaW9UcmFja1xuXG4gICAgaWYgKCFhdWRpb1NhbXBsZXMgfHwgIWF1ZGlvU2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyhgYXVkaW8gbGFzdFNhbXBsZSwgJHthdWRpb1NhbXBsZXNbYXVkaW9TYW1wbGVzLmxlbmd0aCAtIDFdLmR0c31gKVxuXG4gICAgY29uc3Qgc2FtcGxlc0xlbiA9IGF1ZGlvU2FtcGxlcy5sZW5ndGg7XG4gICAgY29uc3Qgc2lsZW50RnJhbWUgPSBBQUMuZ2V0U2lsZW50RnJhbWUobWV0YS5jb2RlYywgbWV0YS5jaGFubmVsQ291bnQpXG5cbiAgICBjb25zdCBmaXJzdFNhbXBsZSA9IHRoaXMuX2ZpcnN0QXVkaW9TYW1wbGVcblxuICAgIGNvbnN0IF9maXJzdFNhbXBsZSA9IGF1ZGlvU2FtcGxlc1swXVxuICAgIC8vIOWvuWF1ZGlvU2FtcGxlc+aMieeFp2R0c+WBmuaOkuW6j1xuICAgIC8vIGF1ZGlvU2FtcGxlcyA9IENvbXBhdGliaWxpdHkuc29ydEF1ZGlvU2FtcGxlcyhhdWRpb1NhbXBsZXMpXG4gICAgaWYgKHRoaXMuX2F1ZGlvTGFyZ2VHYXAgPiAwKSB7XG4gICAgICBDb21wYXRpYmlsaXR5LmRvRml4TGFyZ2VHYXAoYXVkaW9TYW1wbGVzLCB0aGlzLl9hdWRpb0xhcmdlR2FwKVxuICAgIH1cblxuICAgIGlmIChfZmlyc3RTYW1wbGUuZHRzICE9PSB0aGlzLl9maXJzdEF1ZGlvU2FtcGxlLmR0cyAmJiAoc3RyZWFtQ2hhbmdlU3RhcnQgfHwgQ29tcGF0aWJpbGl0eS5kZXRlY3RMYXJnZUdhcCh0aGlzLm5leHRBdWRpb0R0cywgX2ZpcnN0U2FtcGxlKSkpIHtcbiAgICAgIGlmIChzdHJlYW1DaGFuZ2VTdGFydCkge1xuICAgICAgICB0aGlzLm5leHRBdWRpb0R0cyA9IHN0cmVhbUNoYW5nZVN0YXJ0IC8vIEZJWDogSGxz5Lit6YCU5YiHY29kZWPvvIzlnKjlpoLmnpznm7TmjqVzZWVr5Yiw5ZCO6Z2i55qE54K55Lya5a+86Ie0bGFyZ2VHYXDorqHnrpflpLHotKVcbiAgICAgIH1cbiAgICAgIHRoaXMuX2F1ZGlvTGFyZ2VHYXAgPSB0aGlzLm5leHRBdWRpb0R0cyAtIF9maXJzdFNhbXBsZS5kdHNcbiAgICAgIENvbXBhdGliaWxpdHkuZG9GaXhMYXJnZUdhcChhdWRpb1NhbXBsZXMsIHRoaXMuX2F1ZGlvTGFyZ2VHYXApXG4gICAgfVxuICAgIC8vIHN0ZXAwLiDpppbluKfkuI52aWRlb+mmluW4p+mXtOi3neWkp+eahOmXrumimFxuICAgIGlmICh0aGlzLl9maXJzdFZpZGVvU2FtcGxlICYmIGZpcnN0KSB7XG4gICAgICBjb25zdCB2aWRlb0ZpcnN0UHRzID0gdGhpcy5fZmlyc3RWaWRlb1NhbXBsZS5wdHMgPyB0aGlzLl9maXJzdFZpZGVvU2FtcGxlLnB0cyA6IHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUuZHRzICsgdGhpcy5fZmlyc3RWaWRlb1NhbXBsZS5jdHNcblxuICAgICAgaWYgKGZpcnN0U2FtcGxlLmR0cyAtIHZpZGVvRmlyc3RQdHMgPiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSB7XG4gICAgICAgIGNvbnN0IHNpbGVudFNhbXBsZUNvdW50ID0gTWF0aC5mbG9vcigoZmlyc3RTYW1wbGUuZHRzIC0gdmlkZW9GaXJzdFB0cykgLyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2lsZW50U2FtcGxlQ291bnQ7IGkrKykge1xuICAgICAgICAgIGNvbnN0IHNpbGVudFNhbXBsZSA9IHtcbiAgICAgICAgICAgIGRhdGE6IHNpbGVudEZyYW1lLFxuICAgICAgICAgICAgZGF0YXNpemU6IHNpbGVudEZyYW1lLmJ5dGVMZW5ndGgsXG4gICAgICAgICAgICBkdHM6IGZpcnN0U2FtcGxlLmR0cyAtIChpICsgMSkgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uLFxuICAgICAgICAgICAgZmlsdGVyZWQ6IDBcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhdWRpb1NhbXBsZXMudW5zaGlmdChzaWxlbnRTYW1wbGUpXG5cbiAgICAgICAgICB0aGlzLmZpbGxlZEF1ZGlvU2FtcGxlcy5wdXNoKHtcbiAgICAgICAgICAgIGR0czogc2lsZW50U2FtcGxlLmR0cyxcbiAgICAgICAgICAgIHNpemU6IHNpbGVudFNhbXBsZS5kYXRhLmJ5dGVMZW5ndGhcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGdhcFxuICAgIGNvbnN0IGZpcnN0RHRzID0gYXVkaW9TYW1wbGVzWzBdLmR0c1xuXG4gICAgaWYgKHRoaXMubmV4dEF1ZGlvRHRzKSB7XG4gICAgICAvLyBzdGVwMS4g5aSE55CGc2FtcGxlc+auteS5i+mXtOeahOS4ouW4p+aDheWGtVxuICAgICAgLy8g5b2T5Y+R546wZHVyYXRpb27lt67ot53lpKfkuo4x5bin5pe26L+b6KGM6KGl5binXG4gICAgICBnYXAgPSBmaXJzdER0cyAtIHRoaXMubmV4dEF1ZGlvRHRzXG4gICAgICBjb25zdCBhYnNHYXAgPSBNYXRoLmFicyhnYXApXG5cbiAgICAgIGlmIChhYnNHYXAgPiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uICYmIHNhbXBsZXNMZW4gPT09IDEgJiYgdGhpcy5sYXN0QXVkaW9TYW1wbGVzTGVuID09PSAxKSB7XG4gICAgICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZCA9IHVuZGVmaW5lZFxuICAgICAgfVxuXG4gICAgICBpZiAoZ2FwID4gKDIgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSkge1xuICAgICAgICBpZiAoc2FtcGxlc0xlbiA9PT0gMSAmJiB0aGlzLmxhc3RBdWRpb1NhbXBsZXNMZW4gPT09IDEpIHtcbiAgICAgICAgICAvLyDlpoLmnpxzYW1wbGXnmoRsZW5ndGjkuIDnm7TmmK8x77yM6ICM5LiU5LiA55u05LiN56ym5ZCIcmVmU2FtcGxlRHVyYXRpb27vvIzpnIDopoHliqjmgIHkv67mlLlyZWZTYW1wbGVEdXJhdGlvblxuICAgICAgICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZCA9IG1ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZCAhPT0gdW5kZWZpbmVkID8gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbkZpeGVkICsgZ2FwIDogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiArIGdhcFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHNpbGVudEZyYW1lQ291bnQgPSBNYXRoLmZsb29yKGdhcCAvIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pXG5cbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpbGVudEZyYW1lQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY29tcHV0ZWQgPSBmaXJzdER0cyAtIChpICsgMSkgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG4gICAgICAgICAgICBjb25zdCBzaWxlbnRTYW1wbGUgPSBPYmplY3QuYXNzaWduKHt9LCBhdWRpb1NhbXBsZXNbMF0sIHtcbiAgICAgICAgICAgICAgZHRzOiBjb21wdXRlZCA+IHRoaXMubmV4dEF1ZGlvRHRzID8gY29tcHV0ZWQgOiB0aGlzLm5leHRBdWRpb0R0c1xuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgdGhpcy5maWxsZWRBdWRpb1NhbXBsZXMucHVzaCh7XG4gICAgICAgICAgICAgIGR0czogc2lsZW50U2FtcGxlLmR0cyxcbiAgICAgICAgICAgICAgc2l6ZTogc2lsZW50U2FtcGxlLmRhdGEuYnl0ZUxlbmd0aFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMuYXVkaW9UcmFjay5zYW1wbGVzLnVuc2hpZnQoc2lsZW50U2FtcGxlKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChhYnNHYXAgPD0gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiAmJiBhYnNHYXAgPiAwKSB7XG4gICAgICAgIC8vIOW9k+W3rui3neavlOi+g+Wwj+eahOaXtuWAmeWwhumfs+mikeW4p+mHjeWumuS9jVxuICAgICAgICAvLyBjb25zb2xlLmxvZygn6YeN5a6a5L2N6Z+z6aKR5binZHRzJywgYXVkaW9TYW1wbGVzWzBdLmR0cywgdGhpcy5uZXh0QXVkaW9EdHMpXG4gICAgICAgIGF1ZGlvU2FtcGxlc1swXS5kdHMgPSB0aGlzLm5leHRBdWRpb0R0c1xuICAgICAgICBhdWRpb1NhbXBsZXNbMF0ucHRzID0gdGhpcy5uZXh0QXVkaW9EdHNcbiAgICAgIH0gZWxzZSBpZiAoZ2FwIDwgMCkge1xuICAgICAgICBDb21wYXRpYmlsaXR5LmRvRml4TGFyZ2VHYXAoYXVkaW9TYW1wbGVzLCAoLTEgKiBnYXApKVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBsYXN0RHRzID0gYXVkaW9TYW1wbGVzW2F1ZGlvU2FtcGxlcy5sZW5ndGggLSAxXS5kdHM7XG4gICAgY29uc3QgbGFzdFNhbXBsZUR1cmF0aW9uID0gYXVkaW9TYW1wbGVzLmxlbmd0aCA+PSAyID8gbGFzdER0cyAtIGF1ZGlvU2FtcGxlc1thdWRpb1NhbXBsZXMubGVuZ3RoIC0gMl0uZHRzIDogbWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuXG4gICAgdGhpcy5sYXN0QXVkaW9TYW1wbGVzTGVuID0gc2FtcGxlc0xlbjtcbiAgICB0aGlzLm5leHRBdWRpb0R0cyA9IG1ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZCA/IGxhc3REdHMgKyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uRml4ZWQgOiBsYXN0RHRzICsgbGFzdFNhbXBsZUR1cmF0aW9uXG4gICAgdGhpcy5sYXN0QXVkaW9EdHMgPSBsYXN0RHRzXG5cbiAgICAvLyBzdGVwMy4g5L+u5aSNc2FtcGxlc+auteWGhemDqOeahGR0c+W8guW4uOmXrumimFxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhdWRpb1NhbXBsZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSBhdWRpb1NhbXBsZXNbaV1cbiAgICAgIGNvbnN0IG5leHQgPSBhdWRpb1NhbXBsZXNbaSArIDFdXG5cbiAgICAgIGlmICghbmV4dCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY29uc3QgZHVyYXRpb24gPSBuZXh0LmR0cyAtIGN1cnJlbnQuZHRzO1xuICAgICAgYXVkaW9TYW1wbGVzW2ldLmR1cmF0aW9uID0gZHVyYXRpb247XG4gICAgICAvKlxuICAgICAgaWYgKGR1cmF0aW9uID4gKDIgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSkge1xuICAgICAgICAvLyDkuKTluKfkuYvpl7Tpl7TpmpTlpKrlpKfvvIzpnIDopoHooaXnqbrnmb3luKdcbiAgICAgICAgLyoqXG4gICAgICAgIGxldCBzaWxlbnRGcmFtZUNvdW50ID0gTWF0aC5mbG9vcihkdXJhdGlvbiAvIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pXG4gICAgICAgIGxldCBmcmFtZUlkeCA9IDBcblxuICAgICAgICB3aGlsZSAoZnJhbWVJZHggPCBzaWxlbnRGcmFtZUNvdW50KSB7XG4gICAgICAgICAgY29uc3Qgc2lsZW50U2FtcGxlID0ge1xuICAgICAgICAgICAgZGF0YTogc2lsZW50RnJhbWUsXG4gICAgICAgICAgICBkYXRhc2l6ZTogc2lsZW50RnJhbWUuYnl0ZUxlbmd0aCxcbiAgICAgICAgICAgIGR0czogY3VycmVudC5kdHMgKyAoZnJhbWVJZHggKyAxKSAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb24sXG4gICAgICAgICAgICBmaWx0ZXJlZDogMCxcbiAgICAgICAgICAgIGlzU2lsZW50OiB0cnVlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYXVkaW9TYW1wbGVzLnNwbGljZShpLCAwLCBzaWxlbnRTYW1wbGUpXG5cbiAgICAgICAgICB0aGlzLmZpbGxlZEF1ZGlvU2FtcGxlcy5wdXNoKHtcbiAgICAgICAgICAgIGR0czogc2lsZW50U2FtcGxlLmR0cyxcbiAgICAgICAgICAgIHNpemU6IHNpbGVudFNhbXBsZS5kYXRhLmJ5dGVMZW5ndGhcbiAgICAgICAgICB9KVxuXG4gICAgICAgICAgZnJhbWVJZHgrK1xuICAgICAgICAgIGkrKyAvLyDkuI3lr7npnZnpn7PluKflgZrmr5TovoNcbiAgICAgICAgfVxuICAgICAgfSAqL1xuICAgIH1cblxuICAgIHRoaXMuYXVkaW9UcmFjay5zYW1wbGVzID0gQ29tcGF0aWJpbGl0eS5zb3J0QXVkaW9TYW1wbGVzKGF1ZGlvU2FtcGxlcylcbiAgfVxuXG4gIGZpeENoYW5nZVN0cmVhbVZpZGVvIChjaGFuZ2VJZHgpIHtcbiAgICBjb25zdCB7IHNhbXBsZXMsIG1ldGEgfSA9IHRoaXMudmlkZW9UcmFjaztcbiAgICBjb25zdCBwcmV2RHRzID0gY2hhbmdlSWR4ID09PSAwID8gdGhpcy5nZXRTdHJlYW1DaGFuZ2VTdGFydChzYW1wbGVzWzBdKSA6IHNhbXBsZXNbY2hhbmdlSWR4IC0gMV0uZHRzO1xuICAgIGNvbnN0IGN1ckR0cyA9IHNhbXBsZXNbY2hhbmdlSWR4XS5kdHM7XG4gICAgY29uc3QgaXNDb250aW51ZSA9IE1hdGguYWJzKHByZXZEdHMgLSBjdXJEdHMpIDw9IDIgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uO1xuXG4gICAgaWYgKGlzQ29udGludWUpIHtcbiAgICAgIGlmICghc2FtcGxlc1tjaGFuZ2VJZHhdLm9wdGlvbnMpIHtcbiAgICAgICAgc2FtcGxlc1tjaGFuZ2VJZHhdLm9wdGlvbnMgPSB7XG4gICAgICAgICAgaXNDb250aW51ZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzYW1wbGVzW2NoYW5nZUlkeF0ub3B0aW9ucy5pc0NvbnRpbnVlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmRvRml4VmlkZW8oZmFsc2UpXG4gICAgfVxuXG4gICAgY29uc3QgZmlyc3RQYXJ0U2FtcGxlcyA9IHNhbXBsZXMuc2xpY2UoMCwgY2hhbmdlSWR4KTtcbiAgICBjb25zdCBzZWNvbmRQYXJ0U2FtcGxlcyA9IHNhbXBsZXMuc2xpY2UoY2hhbmdlSWR4KTtcbiAgICBjb25zdCBmaXJzdFNhbXBsZSA9IHNhbXBsZXNbMF1cblxuICAgIGNvbnN0IGNoYW5nZVNhbXBsZSA9IHNlY29uZFBhcnRTYW1wbGVzWzBdXG4gICAgY29uc3QgZmlyc3RQYXJ0RHVyYXRpb24gPSBjaGFuZ2VTYW1wbGUuZHRzIC0gZmlyc3RTYW1wbGUuZHRzXG4gICAgY29uc3Qgc3RyZWFtQ2hhbmdlU3RhcnQgPSBmaXJzdFNhbXBsZS5vcHRpb25zICYmIGZpcnN0U2FtcGxlLm9wdGlvbnMuc3RhcnQgKyBmaXJzdFBhcnREdXJhdGlvbiA/IGZpcnN0U2FtcGxlLm9wdGlvbnMuc3RhcnQgOiBudWxsXG5cbiAgICB0aGlzLnZpZGVvVHJhY2suc2FtcGxlcyA9IHNhbXBsZXMuc2xpY2UoMCwgY2hhbmdlSWR4KTtcblxuICAgIHRoaXMuZG9GaXhWaWRlbyhmYWxzZSk7XG5cbiAgICB0aGlzLnZpZGVvVHJhY2suc2FtcGxlcyA9IHNhbXBsZXMuc2xpY2UoY2hhbmdlSWR4KTtcblxuICAgIHRoaXMuZG9GaXhWaWRlbyhmYWxzZSwgc3RyZWFtQ2hhbmdlU3RhcnQpO1xuXG4gICAgdGhpcy52aWRlb1RyYWNrLnNhbXBsZXMgPSBmaXJzdFBhcnRTYW1wbGVzLmNvbmNhdChzZWNvbmRQYXJ0U2FtcGxlcylcbiAgfVxuXG4gIGZpeENoYW5nZVN0cmVhbUF1ZGlvIChjaGFuZ2VJZHgpIHtcbiAgICBjb25zdCB7IHNhbXBsZXMsIG1ldGEgfSA9IHRoaXMuYXVkaW9UcmFjaztcblxuICAgIGNvbnN0IHByZXZEdHMgPSBjaGFuZ2VJZHggPT09IDAgPyB0aGlzLmdldFN0cmVhbUNoYW5nZVN0YXJ0KHNhbXBsZXNbMF0pIDogc2FtcGxlc1tjaGFuZ2VJZHggLSAxXS5kdHM7XG4gICAgY29uc3QgY3VyRHRzID0gc2FtcGxlc1tjaGFuZ2VJZHhdLmR0cztcbiAgICBjb25zdCBpc0NvbnRpbnVlID0gTWF0aC5hYnMocHJldkR0cyAtIGN1ckR0cykgPD0gMiAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb247XG5cbiAgICBpZiAoaXNDb250aW51ZSkge1xuICAgICAgaWYgKCFzYW1wbGVzW2NoYW5nZUlkeF0ub3B0aW9ucykge1xuICAgICAgICBzYW1wbGVzW2NoYW5nZUlkeF0ub3B0aW9ucyA9IHtcbiAgICAgICAgICBpc0NvbnRpbnVlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNhbXBsZXNbY2hhbmdlSWR4XS5vcHRpb25zLmlzQ29udGludWUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuZG9GaXhBdWRpbyhmYWxzZSlcbiAgICB9XG5cbiAgICBjb25zdCBmaXJzdFBhcnRTYW1wbGVzID0gc2FtcGxlcy5zbGljZSgwLCBjaGFuZ2VJZHgpO1xuICAgIGNvbnN0IHNlY29uZFBhcnRTYW1wbGVzID0gc2FtcGxlcy5zbGljZShjaGFuZ2VJZHgpO1xuICAgIGNvbnN0IGZpcnN0U2FtcGxlID0gc2FtcGxlc1swXVxuXG4gICAgY29uc3QgY2hhbmdlU2FtcGxlID0gc2Vjb25kUGFydFNhbXBsZXNbMF1cbiAgICBjb25zdCBmaXJzdFBhcnREdXJhdGlvbiA9IGNoYW5nZVNhbXBsZS5kdHMgLSBmaXJzdFNhbXBsZS5kdHNcbiAgICBjb25zdCBzdHJlYW1DaGFuZ2VTdGFydCA9IGZpcnN0U2FtcGxlLm9wdGlvbnMgJiYgZmlyc3RTYW1wbGUub3B0aW9ucy5zdGFydCArIGZpcnN0UGFydER1cmF0aW9uID8gZmlyc3RTYW1wbGUub3B0aW9ucy5zdGFydCA6IG51bGxcblxuICAgIHRoaXMuYXVkaW9UcmFjay5zYW1wbGVzID0gZmlyc3RQYXJ0U2FtcGxlcztcblxuICAgIHRoaXMuZG9GaXhBdWRpbyhmYWxzZSk7XG5cbiAgICB0aGlzLmF1ZGlvVHJhY2suc2FtcGxlcyA9IHNlY29uZFBhcnRTYW1wbGVzO1xuXG4gICAgdGhpcy5kb0ZpeEF1ZGlvKGZhbHNlLCBzdHJlYW1DaGFuZ2VTdGFydCk7XG5cbiAgICB0aGlzLmF1ZGlvVHJhY2suc2FtcGxlcyA9IGZpcnN0UGFydFNhbXBsZXMuY29uY2F0KHNlY29uZFBhcnRTYW1wbGVzKVxuICB9XG5cbiAgZ2V0Rmlyc3RTYW1wbGUgKCkge1xuICAgIC8vIOiOt+WPlnZpZGVv5ZKMYXVkaW/nmoTpppbluKfmlbDmja5cbiAgICBsZXQge3NhbXBsZXM6IHZpZGVvU2FtcGxlc30gPSB0aGlzLnZpZGVvVHJhY2tcbiAgICBsZXQge3NhbXBsZXM6IGF1ZGlvU2FtcGxlc30gPSB0aGlzLmF1ZGlvVHJhY2tcblxuICAgIGxldCBpc0ZpcnN0VmlkZW9TYW1wbGVzID0gZmFsc2U7XG4gICAgbGV0IGlzRmlyc3RBdWRpb1NhbXBsZXMgPSBmYWxzZTtcblxuICAgIGlmICghdGhpcy5fZmlyc3RWaWRlb1NhbXBsZSAmJiB2aWRlb1NhbXBsZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9maXJzdFZpZGVvU2FtcGxlID0gQ29tcGF0aWJpbGl0eS5maW5kRmlyc3RWaWRlb1NhbXBsZSh2aWRlb1NhbXBsZXMpXG4gICAgICBpc0ZpcnN0VmlkZW9TYW1wbGVzID0gdHJ1ZVxuICAgIH1cblxuICAgIGlmICghdGhpcy5fZmlyc3RBdWRpb1NhbXBsZSAmJiBhdWRpb1NhbXBsZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9maXJzdEF1ZGlvU2FtcGxlID0gQ29tcGF0aWJpbGl0eS5maW5kRmlyc3RBdWRpb1NhbXBsZShhdWRpb1NhbXBsZXMpIC8vIOWvu+aJvmR0c+acgOWwj+eahOW4p+S9nOS4uummluS4qumfs+mikeW4p1xuICAgICAgaXNGaXJzdEF1ZGlvU2FtcGxlcyA9IHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgaXNGaXJzdFZpZGVvU2FtcGxlcyxcbiAgICAgIGlzRmlyc3RBdWRpb1NhbXBsZXNcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog5Zyo5rKh5pyJcmVmU2FtcGxlRHVyYXRpb27nmoTpl67popjmtYHkuK3vvIxcbiAgICovXG4gIGZpeFJlZlNhbXBsZUR1cmF0aW9uIChtZXRhLCBzYW1wbGVzKSB7XG4gICAgY29uc3QgaXNWaWRlbyA9IG1ldGEudHlwZSA9PT0gJ3ZpZGVvJ1xuICAgIGNvbnN0IGFsbFNhbXBsZXNDb3VudCA9IGlzVmlkZW8gPyB0aGlzLmFsbFZpZGVvU2FtcGxlc0NvdW50IDogdGhpcy5hbGxBdWRpb1NhbXBsZXNDb3VudFxuICAgIGNvbnN0IGZpcnN0RHRzID0gaXNWaWRlbyA/IHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUuZHRzIDogdGhpcy5fZmlyc3RBdWRpb1NhbXBsZS5kdHNcbiAgICBjb25zdCBmaWxsZWRTYW1wbGVzQ291bnQgPSBpc1ZpZGVvID8gdGhpcy5maWxsZWRWaWRlb1NhbXBsZXMubGVuZ3RoIDogdGhpcy5maWxsZWRBdWRpb1NhbXBsZXMubGVuZ3RoXG5cbiAgICBpZiAoIW1ldGEucmVmU2FtcGxlRHVyYXRpb24gfHwgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA8PSAwIHx8IE51bWJlci5pc05hTihtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSkge1xuICAgICAgaWYgKHNhbXBsZXMubGVuZ3RoID49IDEpIHtcbiAgICAgICAgY29uc3QgbGFzdER0cyA9IHNhbXBsZXNbc2FtcGxlcy5sZW5ndGggLSAxXS5kdHNcblxuICAgICAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uID0gTWF0aC5mbG9vcigobGFzdER0cyAtIGZpcnN0RHRzKSAvICgoYWxsU2FtcGxlc0NvdW50ICsgZmlsbGVkU2FtcGxlc0NvdW50KSAtIDEpKTsgLy8g5bCGcmVmU2FtcGxlRHVyYXRpb27ph43nva7kuLrorqHnrpflkI7nmoTlubPlnYflgLxcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1ldGEucmVmU2FtcGxlRHVyYXRpb24pIHtcbiAgICAgIGlmIChzYW1wbGVzLmxlbmd0aCA+PSA1KSB7XG4gICAgICAgIGNvbnN0IGxhc3REdHMgPSBzYW1wbGVzW3NhbXBsZXMubGVuZ3RoIC0gMV0uZHRzXG4gICAgICAgIGNvbnN0IGZpcnN0RHRzID0gc2FtcGxlc1swXS5kdHNcbiAgICAgICAgY29uc3QgZHVyYXRpb25BdmcgPSAobGFzdER0cyAtIGZpcnN0RHRzKSAvIChzYW1wbGVzLmxlbmd0aCAtIDEpXG5cbiAgICAgICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5hYnMobWV0YS5yZWZTYW1wbGVEdXJhdGlvbiAtIGR1cmF0aW9uQXZnKSA8PSA1ID8gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA6IGR1cmF0aW9uQXZnKTsgLy8g5bCGcmVmU2FtcGxlRHVyYXRpb27ph43nva7kuLrorqHnrpflkI7nmoTlubPlnYflgLxcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog6K6w5b2V5oiq5q2i55uu5YmN5LiA5YWx5pKt5pS+5LqG5aSa5bCR5binXG4gICAqL1xuICByZWNvcmRTYW1wbGVzQ291bnQgKCkge1xuICAgIGNvbnN0IHsgYXVkaW9UcmFjaywgdmlkZW9UcmFjayB9ID0gdGhpc1xuXG4gICAgdGhpcy5hbGxBdWRpb1NhbXBsZXNDb3VudCArPSBhdWRpb1RyYWNrLnNhbXBsZXMubGVuZ3RoXG4gICAgdGhpcy5hbGxWaWRlb1NhbXBsZXNDb3VudCArPSB2aWRlb1RyYWNrLnNhbXBsZXMubGVuZ3RoXG4gIH1cblxuICAvKipcbiAgICog5Y676Zmk5LiN5ZCI5rOV55qE5bin77yI5YCS6YCA44CB6YeN5aSN5bin77yJXG4gICAqL1xuICByZW1vdmVJbnZhbGlkU2FtcGxlcyAoKSB7XG4gICAgY29uc3QgeyBfZmlyc3RWaWRlb1NhbXBsZSwgX2ZpcnN0QXVkaW9TYW1wbGUgfSA9IHRoaXNcblxuICAgIHRoaXMuYXVkaW9UcmFjay5zYW1wbGVzID0gdGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMuZmlsdGVyKChzYW1wbGUpID0+IHtcbiAgICAgIHJldHVybiBzYW1wbGUuZHRzID49IF9maXJzdEF1ZGlvU2FtcGxlLmR0cyAmJiAodGhpcy5sYXN0QXVkaW9EdHMgPT09IHVuZGVmaW5lZCB8fCBzYW1wbGUuZHRzID4gdGhpcy5sYXN0QXVkaW9EdHMpXG4gICAgfSlcblxuICAgIHRoaXMudmlkZW9UcmFjay5zYW1wbGVzID0gdGhpcy52aWRlb1RyYWNrLnNhbXBsZXMuZmlsdGVyKChzYW1wbGUpID0+IHtcbiAgICAgIHJldHVybiBzYW1wbGUuZHRzID49IF9maXJzdFZpZGVvU2FtcGxlLmR0cyAmJiAodGhpcy5sYXN0VmlkZW9EdHMgPT09IHVuZGVmaW5lZCB8fCBzYW1wbGUuZHRzID4gdGhpcy5sYXN0VmlkZW9EdHMpXG4gICAgfSlcbiAgfVxuXG4gIGdldFN0cmVhbUNoYW5nZVN0YXJ0IChzYW1wbGUpIHtcbiAgICBpZiAoc2FtcGxlLm9wdGlvbnMgJiYgc2FtcGxlLm9wdGlvbnMuc3RhcnQpIHtcbiAgICAgIHJldHVybiBzYW1wbGUub3B0aW9ucy5zdGFydCAtIHRoaXMuZHRzQmFzZTtcbiAgICB9XG4gICAgcmV0dXJuIEluZmluaXR5XG4gIH1cblxuICBzdGF0aWMgc29ydEF1ZGlvU2FtcGxlcyAoc2FtcGxlcykge1xuICAgIGlmIChzYW1wbGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIHNhbXBsZXNcbiAgICB9XG5cbiAgICByZXR1cm4gc2FtcGxlcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICByZXR1cm4gYS5kdHMgLSBiLmR0c1xuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICog5a+75om+ZHRz5pyA5bCP55qEc2FtcGxlXG4gICAqIEBwYXJhbSBzYW1wbGVzXG4gICAqL1xuICBzdGF0aWMgZmluZEZpcnN0QXVkaW9TYW1wbGUgKHNhbXBsZXMpIHtcbiAgICBpZiAoIXNhbXBsZXMgfHwgc2FtcGxlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgcmV0dXJuIENvbXBhdGliaWxpdHkuc29ydEF1ZGlvU2FtcGxlcyhzYW1wbGVzKVswXVxuICB9XG5cbiAgc3RhdGljIGZpbmRGaXJzdFZpZGVvU2FtcGxlIChzYW1wbGVzKSB7XG4gICAgaWYgKCFzYW1wbGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICBjb25zdCBzb3J0ZWQgPSBzYW1wbGVzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIHJldHVybiBhLmR0cyAtIGIuZHRzO1xuICAgIH0pXG5cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc29ydGVkLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAoc29ydGVkW2ldLmlzS2V5ZnJhbWUpIHtcbiAgICAgICAgcmV0dXJuIHNvcnRlZFtpXVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBkZXRlY3RMYXJnZUdhcCAobmV4dER0cywgZmlyc3RTYW1wbGUpIHtcbiAgICBpZiAobmV4dER0cyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBjdXJEdHMgPSBmaXJzdFNhbXBsZS5kdHMgfHwgMFxuICAgIGNvbnN0IGNvbmQxID0gbmV4dER0cyAtIGN1ckR0cyA+PSAxMDAwIHx8IGN1ckR0cyAtIG5leHREdHMgPj0gMTAwMCAvLyBmaXggaGxz5rWB5Ye6546w5aSn6YeP5rWBZHRz6Ze06Led6Zeu6aKYXG4gICAgY29uc3QgY29uZDIgPSBmaXJzdFNhbXBsZS5vcHRpb25zICYmIGZpcnN0U2FtcGxlLm9wdGlvbnMuZGlzY29udGludWVcblxuICAgIHJldHVybiBjb25kMSB8fCBjb25kMlxuICB9XG5cbiAgc3RhdGljIGRvRml4TGFyZ2VHYXAgKHNhbXBsZXMsIGdhcCkge1xuICAgIGNvbnNvbGUubG9nKCdmaXggbGFyZ2UgZ2FwJylcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc2FtcGxlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3Qgc2FtcGxlID0gc2FtcGxlc1tpXTtcbiAgICAgIHNhbXBsZS5kdHMgKz0gZ2FwXG4gICAgICBpZiAoc2FtcGxlLnB0cykge1xuICAgICAgICBzYW1wbGUucHRzICs9IGdhcFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDkuK3pgJTmjaLmtYFcbiAgICovXG4gIHN0YXRpYyBkZXRhY3RDaGFuZ2VTdHJlYW0gKHNhbXBsZXMpIHtcbiAgICBsZXQgY2hhbmdlZCA9IGZhbHNlO1xuICAgIGxldCBjaGFuZ2VkSWR4ID0gLTE7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNhbXBsZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChzYW1wbGVzW2ldLm9wdGlvbnMgJiYgc2FtcGxlc1tpXS5vcHRpb25zLm1ldGEpIHtcbiAgICAgICAgY2hhbmdlZCA9IHRydWVcbiAgICAgICAgY2hhbmdlZElkeCA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBjaGFuZ2VkLFxuICAgICAgY2hhbmdlZElkeFxuICAgIH1cbiAgfVxuXG4gIGdldCB0cmFja3MgKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKVxuICB9XG5cbiAgZ2V0IGF1ZGlvVHJhY2sgKCkge1xuICAgIGlmICh0aGlzLnRyYWNrcykge1xuICAgICAgcmV0dXJuIHRoaXMudHJhY2tzLmF1ZGlvVHJhY2tcbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIGdldCB2aWRlb1RyYWNrICgpIHtcbiAgICBpZiAodGhpcy50cmFja3MpIHtcbiAgICAgIHJldHVybiB0aGlzLnRyYWNrcy52aWRlb1RyYWNrXG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBnZXQgZHRzQmFzZSAoKSB7XG4gICAgY29uc3QgcmVtdXhlciA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ01QNF9SRU1VWEVSJyk7XG4gICAgaWYgKHJlbXV4ZXIpIHtcbiAgICAgIHJldHVybiByZW11eGVyLl9kdHNCYXNlXG4gICAgfVxuICAgIHJldHVybiAwXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IENvbXBhdGliaWxpdHk7XG4iLCJjbGFzcyBHb2xvbWIge1xuICBjb25zdHJ1Y3RvciAodWludDhhcnJheSkge1xuICAgIHRoaXMuVEFHID0gJ0dvbG9tYidcbiAgICB0aGlzLl9idWZmZXIgPSB1aW50OGFycmF5XG4gICAgdGhpcy5fYnVmZmVySW5kZXggPSAwXG4gICAgdGhpcy5fdG90YWxCeXRlcyA9IHVpbnQ4YXJyYXkuYnl0ZUxlbmd0aFxuICAgIHRoaXMuX3RvdGFsQml0cyA9IHVpbnQ4YXJyYXkuYnl0ZUxlbmd0aCAqIDhcbiAgICB0aGlzLl9jdXJyZW50V29yZCA9IDBcbiAgICB0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0ID0gMFxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5fYnVmZmVyID0gbnVsbFxuICB9XG5cbiAgX2ZpbGxDdXJyZW50V29yZCAoKSB7XG4gICAgbGV0IGJ1ZmZlckJ5dGVzTGVmdCA9IHRoaXMuX3RvdGFsQnl0ZXMgLSB0aGlzLl9idWZmZXJJbmRleFxuICAgIGlmIChidWZmZXJCeXRlc0xlZnQgPD0gMCkge1xuICAgICAgLy8gVE9ETyDlvILluLjlpITnkIZcbiAgICB9XG5cbiAgICBsZXQgYnl0ZXNSZWFkID0gTWF0aC5taW4oNCwgYnVmZmVyQnl0ZXNMZWZ0KVxuICAgIGxldCB3b3JkID0gbmV3IFVpbnQ4QXJyYXkoNClcbiAgICB3b3JkLnNldCh0aGlzLl9idWZmZXIuc3ViYXJyYXkodGhpcy5fYnVmZmVySW5kZXgsIHRoaXMuX2J1ZmZlckluZGV4ICsgYnl0ZXNSZWFkKSlcbiAgICB0aGlzLl9jdXJyZW50V29yZCA9IG5ldyBEYXRhVmlldyh3b3JkLmJ1ZmZlcikuZ2V0VWludDMyKDApXG5cbiAgICB0aGlzLl9idWZmZXJJbmRleCArPSBieXRlc1JlYWRcbiAgICB0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0ID0gYnl0ZXNSZWFkICogOFxuICB9XG5cbiAgcmVhZEJpdHMgKHNpemUpIHtcbiAgICBsZXQgYml0cyA9IE1hdGgubWluKHRoaXMuX2N1cnJlbnRXb3JkQml0c0xlZnQsIHNpemUpOy8vIDp1aW50XG4gICAgbGV0IHZhbHUgPSB0aGlzLl9jdXJyZW50V29yZCA+Pj4gKDMyIC0gYml0cyk7XG4gICAgaWYgKHNpemUgPiAzMikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgcmVhZCBtb3JlIHRoYW4gMzIgYml0cyBhdCBhIHRpbWUnKTtcbiAgICB9XG4gICAgdGhpcy5fY3VycmVudFdvcmRCaXRzTGVmdCAtPSBiaXRzO1xuICAgIGlmICh0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0ID4gMCkge1xuICAgICAgdGhpcy5fY3VycmVudFdvcmQgPDw9IGJpdHM7XG4gICAgfSBlbHNlIGlmICh0aGlzLl90b3RhbEJ5dGVzIC0gdGhpcy5fYnVmZmVySW5kZXggPiAwKSB7XG4gICAgICB0aGlzLl9maWxsQ3VycmVudFdvcmQoKTtcbiAgICB9XG5cbiAgICBiaXRzID0gc2l6ZSAtIGJpdHM7XG4gICAgaWYgKGJpdHMgPiAwICYmIHRoaXMuX2N1cnJlbnRXb3JkQml0c0xlZnQpIHtcbiAgICAgIHJldHVybiB2YWx1IDw8IGJpdHMgfCB0aGlzLnJlYWRCaXRzKGJpdHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdmFsdTtcbiAgICB9XG4gIH1cblxuICByZWFkQm9vbCAoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVhZEJpdHMoMSkgPT09IDFcbiAgfVxuXG4gIHJlYWRCeXRlICgpIHtcbiAgICByZXR1cm4gdGhpcy5yZWFkQml0cyg4KVxuICB9XG5cbiAgX3NraXBMZWFkaW5nWmVybyAoKSB7XG4gICAgbGV0IHplcm9Db3VudFxuICAgIGZvciAoemVyb0NvdW50ID0gMDsgemVyb0NvdW50IDwgdGhpcy5fY3VycmVudFdvcmRCaXRzTGVmdDsgemVyb0NvdW50KyspIHtcbiAgICAgIGlmICgodGhpcy5fY3VycmVudFdvcmQgJiAoMHg4MDAwMDAwMCA+Pj4gemVyb0NvdW50KSkgIT09IDApIHtcbiAgICAgICAgdGhpcy5fY3VycmVudFdvcmQgPDw9IHplcm9Db3VudFxuICAgICAgICB0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0IC09IHplcm9Db3VudFxuICAgICAgICByZXR1cm4gemVyb0NvdW50XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2ZpbGxDdXJyZW50V29yZCgpXG4gICAgcmV0dXJuIHplcm9Db3VudCArIHRoaXMuX3NraXBMZWFkaW5nWmVybygpXG4gIH1cblxuICByZWFkVUVHICgpIHsgLy8gdW5zaWduZWQgZXhwb25lbnRpYWwgZ29sb21iXG4gICAgbGV0IGxlYWRpbmdaZXJvcyA9IHRoaXMuX3NraXBMZWFkaW5nWmVybygpXG4gICAgcmV0dXJuIHRoaXMucmVhZEJpdHMobGVhZGluZ1plcm9zICsgMSkgLSAxXG4gIH1cblxuICByZWFkU0VHICgpIHsgLy8gc2lnbmVkIGV4cG9uZW50aWFsIGdvbG9tYlxuICAgIGxldCB2YWx1ZSA9IHRoaXMucmVhZFVFRygpXG4gICAgaWYgKHZhbHVlICYgMHgwMSkge1xuICAgICAgcmV0dXJuICh2YWx1ZSArIDEpID4+PiAxXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAtMSAqICh2YWx1ZSA+Pj4gMSlcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR29sb21iXG4iLCJpbXBvcnQgU3BzUGFyc2VyIGZyb20gJy4vc3BzJztcbmNsYXNzIE5hbHVuaXQge1xuICBzdGF0aWMgZ2V0TmFsdW5pdHMgKGJ1ZmZlcikge1xuICAgIGlmIChidWZmZXIubGVuZ3RoIC0gYnVmZmVyLnBvc2l0aW9uIDwgNCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGxldCBidWYgPSBidWZmZXIuZGF0YXZpZXc7XG4gICAgbGV0IHBvc2l0aW9uID0gYnVmZmVyLnBvc2l0aW9uO1xuICAgIGlmIChidWYuZ2V0SW50MzIocG9zaXRpb24pID09PSAxIHx8XG4gICAgKGJ1Zi5nZXRJbnQxNihwb3NpdGlvbikgPT09IDAgJiYgYnVmLmdldEludDgocG9zaXRpb24gKyAyKSA9PT0gMSkpIHtcbiAgICAgIHJldHVybiBOYWx1bml0LmdldEFubmV4Yk5hbHMoYnVmZmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE5hbHVuaXQuZ2V0QXZjY05hbHMoYnVmZmVyKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0QW5uZXhiTmFscyAoYnVmZmVyKSB7XG4gICAgbGV0IG5hbHMgPSBbXTtcbiAgICBsZXQgcG9zaXRpb24gPSBOYWx1bml0LmdldEhlYWRlclBvc2l0aW9uQW5uZXhCKGJ1ZmZlcik7XG4gICAgbGV0IHN0YXJ0ID0gcG9zaXRpb24ucG9zO1xuICAgIGxldCBlbmQgPSBzdGFydDtcbiAgICB3aGlsZSAoc3RhcnQgPCBidWZmZXIubGVuZ3RoIC0gNCkge1xuICAgICAgbGV0IGhlYWRlciA9IGJ1ZmZlci5idWZmZXIuc2xpY2Uoc3RhcnQsIHN0YXJ0ICsgcG9zaXRpb24uaGVhZGVyTGVuZ3RoKTtcbiAgICAgIGlmIChwb3NpdGlvbi5wb3MgPT09IGJ1ZmZlci5wb3NpdGlvbikge1xuICAgICAgICBidWZmZXIuc2tpcChwb3NpdGlvbi5oZWFkZXJMZW5ndGgpO1xuICAgICAgfVxuICAgICAgcG9zaXRpb24gPSBOYWx1bml0LmdldEhlYWRlclBvc2l0aW9uQW5uZXhCKGJ1ZmZlcik7XG4gICAgICBlbmQgPSBwb3NpdGlvbi5wb3M7XG4gICAgICBsZXQgYm9keSA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlci5idWZmZXIuc2xpY2Uoc3RhcnQgKyBoZWFkZXIuYnl0ZUxlbmd0aCwgZW5kKSk7XG4gICAgICBsZXQgdW5pdCA9IHtoZWFkZXIsIGJvZHl9O1xuICAgICAgTmFsdW5pdC5hbmFseXNlTmFsKHVuaXQpO1xuICAgICAgbmFscy5wdXNoKHVuaXQpO1xuICAgICAgYnVmZmVyLnNraXAoZW5kIC0gYnVmZmVyLnBvc2l0aW9uKTtcbiAgICAgIHN0YXJ0ID0gZW5kO1xuICAgIH1cbiAgICByZXR1cm4gbmFscztcbiAgfVxuXG4gIHN0YXRpYyBnZXRBdmNjTmFscyAoYnVmZmVyKSB7XG4gICAgbGV0IG5hbHMgPSBbXTtcbiAgICB3aGlsZSAoYnVmZmVyLnBvc2l0aW9uIDwgYnVmZmVyLmxlbmd0aCAtIDQpIHtcbiAgICAgIGxldCBsZW5ndGggPSBidWZmZXIuZGF0YXZpZXcuZ2V0SW50MzIoYnVmZmVyLnBvc2l0aW9uKTtcbiAgICAgIGlmIChidWZmZXIubGVuZ3RoIC0gYnVmZmVyLnBvc2l0aW9uID49IGxlbmd0aCkge1xuICAgICAgICBsZXQgaGVhZGVyID0gYnVmZmVyLmJ1ZmZlci5zbGljZShidWZmZXIucG9zaXRpb24sIGJ1ZmZlci5wb3NpdGlvbiArIDQpO1xuICAgICAgICBidWZmZXIuc2tpcCg0KVxuICAgICAgICBsZXQgYm9keSA9IGJ1ZmZlci5idWZmZXIuc2xpY2UoYnVmZmVyLnBvc2l0aW9uLCBidWZmZXIucG9zaXRpb24gKyBsZW5ndGgpO1xuICAgICAgICBidWZmZXIuc2tpcChsZW5ndGgpO1xuICAgICAgICBsZXQgdW5pdCA9IHtoZWFkZXIsIGJvZHl9O1xuICAgICAgICBOYWx1bml0LmFuYWx5c2VOYWwodW5pdCk7XG4gICAgICAgIG5hbHMucHVzaCh1bml0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmFscztcbiAgfVxuXG4gIHN0YXRpYyBhbmFseXNlTmFsICh1bml0KSB7XG4gICAgbGV0IHR5cGUgPSB1bml0LmJvZHlbMF0gJiAweDFmO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICAvLyBORFJcbiAgICAgICAgdW5pdC5uZHIgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNTpcbiAgICAgICAgLy8gSURSXG4gICAgICAgIHVuaXQuaWRyID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDY6XG4gICAgICAgIC8vIFNFSVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNzpcbiAgICAgICAgLy8gU1BTXG4gICAgICAgIHVuaXQuc3BzID0gU3BzUGFyc2VyLnBhcnNlU1BTKHVuaXQuYm9keSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA4OlxuICAgICAgICAvLyBQUFNcbiAgICAgICAgdW5pdC5wcHMgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgOTpcbiAgICAgICAgLy8gQVVEXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldEhlYWRlclBvc2l0aW9uQW5uZXhCIChidWZmZXIpIHtcbiAgICAvLyBzZXBlcmF0ZVxuICAgIGxldCBwb3MgPSBidWZmZXIucG9zaXRpb247XG4gICAgbGV0IGhlYWRlckxlbmd0aCA9IDA7XG4gICAgd2hpbGUgKGhlYWRlckxlbmd0aCAhPT0gMyAmJiBoZWFkZXJMZW5ndGggIT09IDQgJiYgcG9zIDwgYnVmZmVyLmxlbmd0aCAtIDQpIHtcbiAgICAgIGlmIChidWZmZXIuZGF0YXZpZXcuZ2V0SW50MTYocG9zKSA9PT0gMCkge1xuICAgICAgICBpZiAoYnVmZmVyLmRhdGF2aWV3LmdldEludDE2KHBvcyArIDIpID09PSAxKSB7XG4gICAgICAgICAgLy8gMHgwMDAwMDFcbiAgICAgICAgICBoZWFkZXJMZW5ndGggPSA0O1xuICAgICAgICB9IGVsc2UgaWYgKGJ1ZmZlci5kYXRhdmlldy5nZXRJbnQ4KHBvcyArIDIpID09PSAxKSB7XG4gICAgICAgICAgaGVhZGVyTGVuZ3RoID0gMztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwb3MrKztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcG9zKys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBvcyA9PT0gYnVmZmVyLmxlbmd0aCAtIDQpIHtcbiAgICAgIGlmIChidWZmZXIuZGF0YXZpZXcuZ2V0SW50MTYocG9zKSA9PT0gMCkge1xuICAgICAgICBpZiAoYnVmZmVyLmRhdGF2aWV3LmdldEludDE2KHBvcyArIDIpID09PSAxKSB7XG4gICAgICAgICAgLy8gMHgwMDAwMDFcbiAgICAgICAgICBoZWFkZXJMZW5ndGggPSA0O1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwb3MrKztcbiAgICAgICAgaWYgKGJ1ZmZlci5kYXRhdmlldy5nZXRJbnQxNihwb3MpID09PSAwICYmIGJ1ZmZlci5kYXRhdmlldy5nZXRJbnQ4KHBvcykgPT09IDEpIHtcbiAgICAgICAgICAvLyAweDAwMDAwMDFcbiAgICAgICAgICBoZWFkZXJMZW5ndGggPSAzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBvcyA9IGJ1ZmZlci5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtwb3MsIGhlYWRlckxlbmd0aH07XG4gIH1cblxuICBzdGF0aWMgZ2V0QXZjYyAoc3BzLCBwcHMpIHtcbiAgICBsZXQgcmV0ID0gbmV3IFVpbnQ4QXJyYXkoc3BzLmJ5dGVMZW5ndGggKyBwcHMuYnl0ZUxlbmd0aCArIDExKTtcbiAgICByZXRbMF0gPSAweDAxO1xuICAgIHJldFsxXSA9IHNwc1sxXTtcbiAgICByZXRbMl0gPSBzcHNbMl07XG4gICAgcmV0WzNdID0gc3BzWzNdO1xuICAgIHJldFs0XSA9IDI1NTtcbiAgICByZXRbNV0gPSAyMjU7XG5cbiAgICBsZXQgb2Zmc2V0ID0gNjtcblxuICAgIHJldC5zZXQobmV3IFVpbnQ4QXJyYXkoWyhzcHMuYnl0ZUxlbmd0aCA+Pj4gOCkgJiAweGZmLCBzcHMuYnl0ZUxlbmd0aCAmIDB4ZmZdKSwgb2Zmc2V0KTtcbiAgICBvZmZzZXQgKz0gMjtcbiAgICByZXQuc2V0KHNwcywgb2Zmc2V0KTtcbiAgICBvZmZzZXQgKz0gc3BzLmJ5dGVMZW5ndGg7XG5cbiAgICByZXRbb2Zmc2V0XSA9IDE7XG4gICAgb2Zmc2V0Kys7XG5cbiAgICByZXQuc2V0KG5ldyBVaW50OEFycmF5KFsocHBzLmJ5dGVMZW5ndGggPj4+IDgpICYgMHhmZiwgcHBzLmJ5dGVMZW5ndGggJiAweGZmXSksIG9mZnNldCk7XG4gICAgb2Zmc2V0ICs9IDI7XG4gICAgcmV0LnNldChwcHMsIG9mZnNldCk7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBOYWx1bml0O1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICAqL1xuLyogZXNsaW50LWRpc2FibGUgb25lLXZhciAgKi9cbmltcG9ydCBHb2xvbWIgZnJvbSAnLi9nb2xvbWInXG5cbmNsYXNzIFNQU1BhcnNlciB7XG4gIHN0YXRpYyBfZWJzcDJyYnNwICh1aW50OGFycmF5KSB7XG4gICAgbGV0IHNyYyA9IHVpbnQ4YXJyYXlcbiAgICBsZXQgc3JjTGVuZ3RoID0gc3JjLmJ5dGVMZW5ndGhcbiAgICBsZXQgZHN0ID0gbmV3IFVpbnQ4QXJyYXkoc3JjTGVuZ3RoKVxuICAgIGxldCBkc3RJZHggPSAwXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNyY0xlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaSA+PSAyKSB7XG4gICAgICAgIGlmIChzcmNbaV0gPT09IDB4MDMgJiYgc3JjW2kgLSAxXSA9PT0gMHgwMCAmJiBzcmNbaSAtIDJdID09PSAweDAwKSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZHN0W2RzdElkeF0gPSBzcmNbaV1cbiAgICAgIGRzdElkeCsrXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGRzdC5idWZmZXIsIDAsIGRzdElkeClcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZVNQUyAodWludDhhcnJheSkge1xuICAgIGxldCByYnNwID0gU1BTUGFyc2VyLl9lYnNwMnJic3AodWludDhhcnJheSlcbiAgICBsZXQgZ2IgPSBuZXcgR29sb21iKHJic3ApXG5cbiAgICBnYi5yZWFkQnl0ZSgpXG4gICAgbGV0IHByb2ZpbGVJZGMgPSBnYi5yZWFkQnl0ZSgpXG4gICAgZ2IucmVhZEJ5dGUoKVxuICAgIGxldCBsZXZlbElkYyA9IGdiLnJlYWRCeXRlKClcbiAgICBnYi5yZWFkVUVHKClcblxuICAgIGxldCBwcm9maWxlX3N0cmluZyA9IFNQU1BhcnNlci5nZXRQcm9maWxlU3RyaW5nKHByb2ZpbGVJZGMpXG4gICAgbGV0IGxldmVsX3N0cmluZyA9IFNQU1BhcnNlci5nZXRMZXZlbFN0cmluZyhsZXZlbElkYylcbiAgICBsZXQgY2hyb21hX2Zvcm1hdF9pZGMgPSAxXG4gICAgbGV0IGNocm9tYV9mb3JtYXQgPSA0MjBcbiAgICBsZXQgY2hyb21hX2Zvcm1hdF90YWJsZSA9IFswLCA0MjAsIDQyMiwgNDQ0XVxuICAgIGxldCBiaXRfZGVwdGggPSA4XG5cbiAgICBpZiAocHJvZmlsZUlkYyA9PT0gMTAwIHx8IHByb2ZpbGVJZGMgPT09IDExMCB8fCBwcm9maWxlSWRjID09PSAxMjIgfHxcbiAgICAgIHByb2ZpbGVJZGMgPT09IDI0NCB8fCBwcm9maWxlSWRjID09PSA0NCB8fCBwcm9maWxlSWRjID09PSA4MyB8fFxuICAgICAgcHJvZmlsZUlkYyA9PT0gODYgfHwgcHJvZmlsZUlkYyA9PT0gMTE4IHx8IHByb2ZpbGVJZGMgPT09IDEyOCB8fFxuICAgICAgcHJvZmlsZUlkYyA9PT0gMTM4IHx8IHByb2ZpbGVJZGMgPT09IDE0NCkge1xuICAgICAgY2hyb21hX2Zvcm1hdF9pZGMgPSBnYi5yZWFkVUVHKClcbiAgICAgIGlmIChjaHJvbWFfZm9ybWF0X2lkYyA9PT0gMykge1xuICAgICAgICBnYi5yZWFkQml0cygxKVxuICAgICAgfVxuICAgICAgaWYgKGNocm9tYV9mb3JtYXRfaWRjIDw9IDMpIHtcbiAgICAgICAgY2hyb21hX2Zvcm1hdCA9IGNocm9tYV9mb3JtYXRfdGFibGVbY2hyb21hX2Zvcm1hdF9pZGNdXG4gICAgICB9XG5cbiAgICAgIGJpdF9kZXB0aCA9IGdiLnJlYWRVRUcoKSArIDhcbiAgICAgIGdiLnJlYWRVRUcoKVxuICAgICAgZ2IucmVhZEJpdHMoMSlcbiAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgIGxldCBzY2FsaW5nX2xpc3RfY291bnQgPSAoY2hyb21hX2Zvcm1hdF9pZGMgIT09IDMpID8gOCA6IDEyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NhbGluZ19saXN0X2NvdW50OyBpKyspIHtcbiAgICAgICAgICBpZiAoZ2IucmVhZEJvb2woKSkge1xuICAgICAgICAgICAgaWYgKGkgPCA2KSB7XG4gICAgICAgICAgICAgIFNQU1BhcnNlci5fc2tpcFNjYWxpbmdMaXN0KGdiLCAxNilcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIFNQU1BhcnNlci5fc2tpcFNjYWxpbmdMaXN0KGdiLCA2NClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZ2IucmVhZFVFRygpXG4gICAgbGV0IHBpY19vcmRlcl9jbnRfdHlwZSA9IGdiLnJlYWRVRUcoKVxuICAgIGlmIChwaWNfb3JkZXJfY250X3R5cGUgPT09IDApIHtcbiAgICAgIGdiLnJlYWRVRUcoKVxuICAgIH0gZWxzZSBpZiAocGljX29yZGVyX2NudF90eXBlID09PSAxKSB7XG4gICAgICBnYi5yZWFkQml0cygxKVxuICAgICAgZ2IucmVhZFNFRygpXG4gICAgICBnYi5yZWFkU0VHKClcbiAgICAgIGxldCBudW1fcmVmX2ZyYW1lc19pbl9waWNfb3JkZXJfY250X2N5Y2xlID0gZ2IucmVhZFVFRygpXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bV9yZWZfZnJhbWVzX2luX3BpY19vcmRlcl9jbnRfY3ljbGU7IGkrKykge1xuICAgICAgICBnYi5yZWFkU0VHKClcbiAgICAgIH1cbiAgICB9XG4gICAgZ2IucmVhZFVFRygpXG4gICAgZ2IucmVhZEJpdHMoMSlcblxuICAgIGxldCBwaWNfd2lkdGhfaW5fbWJzX21pbnVzMSA9IGdiLnJlYWRVRUcoKVxuICAgIGxldCBwaWNfaGVpZ2h0X2luX21hcF91bml0c19taW51czEgPSBnYi5yZWFkVUVHKClcblxuICAgIGxldCBmcmFtZV9tYnNfb25seV9mbGFnID0gZ2IucmVhZEJpdHMoMSlcbiAgICBpZiAoZnJhbWVfbWJzX29ubHlfZmxhZyA9PT0gMCkge1xuICAgICAgZ2IucmVhZEJpdHMoMSlcbiAgICB9XG4gICAgZ2IucmVhZEJpdHMoMSlcblxuICAgIGxldCBmcmFtZV9jcm9wX2xlZnRfb2Zmc2V0ID0gMFxuICAgIGxldCBmcmFtZV9jcm9wX3JpZ2h0X29mZnNldCA9IDBcbiAgICBsZXQgZnJhbWVfY3JvcF90b3Bfb2Zmc2V0ID0gMFxuICAgIGxldCBmcmFtZV9jcm9wX2JvdHRvbV9vZmZzZXQgPSAwXG5cbiAgICBsZXQgZnJhbWVfY3JvcHBpbmdfZmxhZyA9IGdiLnJlYWRCb29sKClcbiAgICBpZiAoZnJhbWVfY3JvcHBpbmdfZmxhZykge1xuICAgICAgZnJhbWVfY3JvcF9sZWZ0X29mZnNldCA9IGdiLnJlYWRVRUcoKVxuICAgICAgZnJhbWVfY3JvcF9yaWdodF9vZmZzZXQgPSBnYi5yZWFkVUVHKClcbiAgICAgIGZyYW1lX2Nyb3BfdG9wX29mZnNldCA9IGdiLnJlYWRVRUcoKVxuICAgICAgZnJhbWVfY3JvcF9ib3R0b21fb2Zmc2V0ID0gZ2IucmVhZFVFRygpXG4gICAgfVxuXG4gICAgbGV0IHBhcl93aWR0aCA9IDEsIHBhcl9oZWlnaHQgPSAxXG4gICAgbGV0IGZwcyA9IDAsIGZwc19maXhlZCA9IHRydWUsIGZwc19udW0gPSAwLCBmcHNfZGVuID0gMFxuXG4gICAgbGV0IHZ1aV9wYXJhbWV0ZXJzX3ByZXNlbnRfZmxhZyA9IGdiLnJlYWRCb29sKClcbiAgICBpZiAodnVpX3BhcmFtZXRlcnNfcHJlc2VudF9mbGFnKSB7XG4gICAgICBpZiAoZ2IucmVhZEJvb2woKSkgeyAvLyBhc3BlY3RfcmF0aW9faW5mb19wcmVzZW50X2ZsYWdcbiAgICAgICAgbGV0IGFzcGVjdF9yYXRpb19pZGMgPSBnYi5yZWFkQnl0ZSgpXG4gICAgICAgIGxldCBwYXJfd190YWJsZSA9IFsxLCAxMiwgMTAsIDE2LCA0MCwgMjQsIDIwLCAzMiwgODAsIDE4LCAxNSwgNjQsIDE2MCwgNCwgMywgMl1cbiAgICAgICAgbGV0IHBhcl9oX3RhYmxlID0gWzEsIDExLCAxMSwgMTEsIDMzLCAxMSwgMTEsIDExLCAzMywgMTEsIDExLCAzMywgOTksIDMsIDIsIDFdXG5cbiAgICAgICAgaWYgKGFzcGVjdF9yYXRpb19pZGMgPiAwICYmIGFzcGVjdF9yYXRpb19pZGMgPCAxNikge1xuICAgICAgICAgIHBhcl93aWR0aCA9IHBhcl93X3RhYmxlW2FzcGVjdF9yYXRpb19pZGMgLSAxXVxuICAgICAgICAgIHBhcl9oZWlnaHQgPSBwYXJfaF90YWJsZVthc3BlY3RfcmF0aW9faWRjIC0gMV1cbiAgICAgICAgfSBlbHNlIGlmIChhc3BlY3RfcmF0aW9faWRjID09PSAyNTUpIHtcbiAgICAgICAgICBwYXJfd2lkdGggPSBnYi5yZWFkQnl0ZSgpIDw8IDggfCBnYi5yZWFkQnl0ZSgpXG4gICAgICAgICAgcGFyX2hlaWdodCA9IGdiLnJlYWRCeXRlKCkgPDwgOCB8IGdiLnJlYWRCeXRlKClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZ2IucmVhZEJvb2woKSkge1xuICAgICAgICBnYi5yZWFkQm9vbCgpXG4gICAgICB9XG4gICAgICBpZiAoZ2IucmVhZEJvb2woKSkge1xuICAgICAgICBnYi5yZWFkQml0cyg0KVxuICAgICAgICBpZiAoZ2IucmVhZEJvb2woKSkge1xuICAgICAgICAgIGdiLnJlYWRCaXRzKDI0KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZ2IucmVhZEJvb2woKSkge1xuICAgICAgICBnYi5yZWFkVUVHKClcbiAgICAgICAgZ2IucmVhZFVFRygpXG4gICAgICB9XG4gICAgICBpZiAoZ2IucmVhZEJvb2woKSkge1xuICAgICAgICBsZXQgbnVtX3VuaXRzX2luX3RpY2sgPSBnYi5yZWFkQml0cygzMilcbiAgICAgICAgbGV0IHRpbWVfc2NhbGUgPSBnYi5yZWFkQml0cygzMilcbiAgICAgICAgZnBzX2ZpeGVkID0gZ2IucmVhZEJvb2woKVxuXG4gICAgICAgIGZwc19udW0gPSB0aW1lX3NjYWxlXG4gICAgICAgIGZwc19kZW4gPSBudW1fdW5pdHNfaW5fdGljayAqIDJcbiAgICAgICAgZnBzID0gZnBzX251bSAvIGZwc19kZW5cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcGFyU2NhbGUgPSAxXG4gICAgaWYgKHBhcl93aWR0aCAhPT0gMSB8fCBwYXJfaGVpZ2h0ICE9PSAxKSB7XG4gICAgICBwYXJTY2FsZSA9IHBhcl93aWR0aCAvIHBhcl9oZWlnaHRcbiAgICB9XG5cbiAgICBsZXQgY3JvcF91bml0X3ggPSAwLCBjcm9wX3VuaXRfeSA9IDBcbiAgICBpZiAoY2hyb21hX2Zvcm1hdF9pZGMgPT09IDApIHtcbiAgICAgIGNyb3BfdW5pdF94ID0gMVxuICAgICAgY3JvcF91bml0X3kgPSAyIC0gZnJhbWVfbWJzX29ubHlfZmxhZ1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgc3ViX3djID0gKGNocm9tYV9mb3JtYXRfaWRjID09PSAzKSA/IDEgOiAyXG4gICAgICBsZXQgc3ViX2hjID0gKGNocm9tYV9mb3JtYXRfaWRjID09PSAxKSA/IDIgOiAxXG4gICAgICBjcm9wX3VuaXRfeCA9IHN1Yl93Y1xuICAgICAgY3JvcF91bml0X3kgPSBzdWJfaGMgKiAoMiAtIGZyYW1lX21ic19vbmx5X2ZsYWcpXG4gICAgfVxuXG4gICAgbGV0IGNvZGVjX3dpZHRoID0gKHBpY193aWR0aF9pbl9tYnNfbWludXMxICsgMSkgKiAxNlxuICAgIGxldCBjb2RlY19oZWlnaHQgPSAoMiAtIGZyYW1lX21ic19vbmx5X2ZsYWcpICogKChwaWNfaGVpZ2h0X2luX21hcF91bml0c19taW51czEgKyAxKSAqIDE2KVxuXG4gICAgY29kZWNfd2lkdGggLT0gKGZyYW1lX2Nyb3BfbGVmdF9vZmZzZXQgKyBmcmFtZV9jcm9wX3JpZ2h0X29mZnNldCkgKiBjcm9wX3VuaXRfeFxuICAgIGNvZGVjX2hlaWdodCAtPSAoZnJhbWVfY3JvcF90b3Bfb2Zmc2V0ICsgZnJhbWVfY3JvcF9ib3R0b21fb2Zmc2V0KSAqIGNyb3BfdW5pdF95XG5cbiAgICBsZXQgcHJlc2VudF93aWR0aCA9IE1hdGguY2VpbChjb2RlY193aWR0aCAqIHBhclNjYWxlKVxuXG4gICAgZ2IuZGVzdHJveSgpXG4gICAgZ2IgPSBudWxsXG5cbiAgICByZXR1cm4ge1xuICAgICAgcHJvZmlsZV9zdHJpbmc6IHByb2ZpbGVfc3RyaW5nLFxuICAgICAgbGV2ZWxfc3RyaW5nOiBsZXZlbF9zdHJpbmcsXG4gICAgICBiaXRfZGVwdGg6IGJpdF9kZXB0aCxcbiAgICAgIGNocm9tYV9mb3JtYXQ6IGNocm9tYV9mb3JtYXQsXG4gICAgICBjaHJvbWFfZm9ybWF0X3N0cmluZzogU1BTUGFyc2VyLmdldENocm9tYUZvcm1hdFN0cmluZyhjaHJvbWFfZm9ybWF0KSxcblxuICAgICAgZnJhbWVfcmF0ZToge1xuICAgICAgICBmaXhlZDogZnBzX2ZpeGVkLFxuICAgICAgICBmcHM6IGZwcyxcbiAgICAgICAgZnBzX2RlbjogZnBzX2RlbixcbiAgICAgICAgZnBzX251bTogZnBzX251bVxuICAgICAgfSxcblxuICAgICAgcGFyX3JhdGlvOiB7XG4gICAgICAgIHdpZHRoOiBwYXJfd2lkdGgsXG4gICAgICAgIGhlaWdodDogcGFyX2hlaWdodFxuICAgICAgfSxcblxuICAgICAgY29kZWNfc2l6ZToge1xuICAgICAgICB3aWR0aDogY29kZWNfd2lkdGgsXG4gICAgICAgIGhlaWdodDogY29kZWNfaGVpZ2h0XG4gICAgICB9LFxuXG4gICAgICBwcmVzZW50X3NpemU6IHtcbiAgICAgICAgd2lkdGg6IHByZXNlbnRfd2lkdGgsXG4gICAgICAgIGhlaWdodDogY29kZWNfaGVpZ2h0XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIF9za2lwU2NhbGluZ0xpc3QgKGdiLCBjb3VudCkge1xuICAgIGxldCBsYXN0X3NjYWxlID0gOCwgbmV4dF9zY2FsZSA9IDhcbiAgICBsZXQgZGVsdGFfc2NhbGUgPSAwXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICBpZiAobmV4dF9zY2FsZSAhPT0gMCkge1xuICAgICAgICBkZWx0YV9zY2FsZSA9IGdiLnJlYWRTRUcoKVxuICAgICAgICBuZXh0X3NjYWxlID0gKGxhc3Rfc2NhbGUgKyBkZWx0YV9zY2FsZSArIDI1NikgJSAyNTZcbiAgICAgIH1cbiAgICAgIGxhc3Rfc2NhbGUgPSAobmV4dF9zY2FsZSA9PT0gMCkgPyBsYXN0X3NjYWxlIDogbmV4dF9zY2FsZVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRQcm9maWxlU3RyaW5nIChwcm9maWxlSWRjKSB7XG4gICAgc3dpdGNoIChwcm9maWxlSWRjKSB7XG4gICAgICBjYXNlIDY2OlxuICAgICAgICByZXR1cm4gJ0Jhc2VsaW5lJ1xuICAgICAgY2FzZSA3NzpcbiAgICAgICAgcmV0dXJuICdNYWluJ1xuICAgICAgY2FzZSA4ODpcbiAgICAgICAgcmV0dXJuICdFeHRlbmRlZCdcbiAgICAgIGNhc2UgMTAwOlxuICAgICAgICByZXR1cm4gJ0hpZ2gnXG4gICAgICBjYXNlIDExMDpcbiAgICAgICAgcmV0dXJuICdIaWdoMTAnXG4gICAgICBjYXNlIDEyMjpcbiAgICAgICAgcmV0dXJuICdIaWdoNDIyJ1xuICAgICAgY2FzZSAyNDQ6XG4gICAgICAgIHJldHVybiAnSGlnaDQ0NCdcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnVW5rbm93bidcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0TGV2ZWxTdHJpbmcgKGxldmVsSWRjKSB7XG4gICAgcmV0dXJuIChsZXZlbElkYyAvIDEwKS50b0ZpeGVkKDEpXG4gIH1cblxuICBzdGF0aWMgZ2V0Q2hyb21hRm9ybWF0U3RyaW5nIChjaHJvbWEpIHtcbiAgICBzd2l0Y2ggKGNocm9tYSkge1xuICAgICAgY2FzZSA0MjA6XG4gICAgICAgIHJldHVybiAnNDoyOjAnXG4gICAgICBjYXNlIDQyMjpcbiAgICAgICAgcmV0dXJuICc0OjI6MidcbiAgICAgIGNhc2UgNDQ0OlxuICAgICAgICByZXR1cm4gJzQ6NDo0J1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICdVbmtub3duJ1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyB0b1ZpZGVvTWV0YSAoc3BzQ29uZmlnKSB7XG4gICAgbGV0IG1ldGEgPSB7fVxuICAgIGlmIChzcHNDb25maWcgJiYgc3BzQ29uZmlnLmNvZGVjX3NpemUpIHtcbiAgICAgIG1ldGEuY29kZWNXaWR0aCA9IHNwc0NvbmZpZy5jb2RlY19zaXplLndpZHRoXG4gICAgICBtZXRhLmNvZGVjSGVpZ2h0ID0gc3BzQ29uZmlnLmNvZGVjX3NpemUuaGVpZ2h0XG4gICAgICBtZXRhLnByZXNlbnRXaWR0aCA9IHNwc0NvbmZpZy5wcmVzZW50X3NpemUud2lkdGhcbiAgICAgIG1ldGEucHJlc2VudEhlaWdodCA9IHNwc0NvbmZpZy5wcmVzZW50X3NpemUuaGVpZ2h0XG4gICAgfVxuXG4gICAgbWV0YS5wcm9maWxlID0gc3BzQ29uZmlnLnByb2ZpbGVfc3RyaW5nXG4gICAgbWV0YS5sZXZlbCA9IHNwc0NvbmZpZy5sZXZlbF9zdHJpbmdcbiAgICBtZXRhLmJpdERlcHRoID0gc3BzQ29uZmlnLmJpdF9kZXB0aFxuICAgIG1ldGEuY2hyb21hRm9ybWF0ID0gc3BzQ29uZmlnLmNocm9tYV9mb3JtYXRcblxuICAgIG1ldGEucGFyUmF0aW8gPSB7XG4gICAgICB3aWR0aDogc3BzQ29uZmlnLnBhcl9yYXRpby53aWR0aCxcbiAgICAgIGhlaWdodDogc3BzQ29uZmlnLnBhcl9yYXRpby5oZWlnaHRcbiAgICB9XG5cbiAgICBtZXRhLmZyYW1lUmF0ZSA9IHNwc0NvbmZpZy5mcmFtZV9yYXRlXG5cbiAgICBsZXQgZnBzRGVuID0gbWV0YS5mcmFtZVJhdGUuZnBzX2RlblxuICAgIGxldCBmcHNOdW0gPSBtZXRhLmZyYW1lUmF0ZS5mcHNfbnVtXG4gICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA9IE1hdGguZmxvb3IobWV0YS50aW1lc2NhbGUgKiAoZnBzRGVuIC8gZnBzTnVtKSlcbiAgICByZXR1cm4gbWV0YTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTUFNQYXJzZXJcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBITFNcbiAgTTNVOFBhcnNlcjogcmVxdWlyZSgnLi9zcmMvaGxzL2RlbXV4ZXIvbTN1OHBhcnNlcicpLmRlZmF1bHQsXG4gIFRzRGVtdXhlcjogcmVxdWlyZSgnLi9zcmMvaGxzL2RlbXV4ZXIvdHMnKS5kZWZhdWx0LFxuICBQbGF5bGlzdDogcmVxdWlyZSgnLi9zcmMvaGxzL3BsYXlsaXN0JykuZGVmYXVsdCxcbiAgRmx2RGVtdXhlcjogcmVxdWlyZSgnLi9zcmMvZmx2L2luZGV4JykuZGVmYXVsdFxufTtcbiIsImltcG9ydCB7IGlzTGUsIFVURjggfSBmcm9tICd4Z3BsYXllci11dGlscydcblxuY29uc3QgREFUQV9UWVBFUyA9IHtcbiAgTlVNQkVSOiAwLFxuICBCT09MRUFOOiAxLFxuICBTVFJJTkc6IDIsXG4gIE9CSkVDVDogMyxcbiAgTUlYX0FSUkFZOiA4LFxuICBPQkpFQ1RfRU5EOiA5LFxuICBTVFJJQ1RfQVJSQVk6IDEwLFxuICBEQVRFOiAxMSxcbiAgTE9ORV9TVFJJTkc6IDEyXG59XG5cbi8qKlxuICogbWV0YeS/oeaBr+ino+aekFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBTUZQYXJzZXIge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5vZmZzZXQgPSAwXG4gICAgdGhpcy5yZWFkT2Zmc2V0ID0gdGhpcy5vZmZzZXRcbiAgfVxuXG4gIHJlc29sdmUgKG1ldGEsIHNpemUpIHtcbiAgICBpZiAoc2l6ZSA8IDMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm90IGVub3VnaCBkYXRhIGZvciBtZXRhaW5mbycpXG4gICAgfVxuICAgIGNvbnN0IG1ldGFEYXRhID0ge31cbiAgICBjb25zdCBuYW1lID0gdGhpcy5wYXJzZVZhbHVlKG1ldGEpXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnBhcnNlVmFsdWUobWV0YSwgc2l6ZSAtIG5hbWUuYm9keVNpemUpXG4gICAgbWV0YURhdGFbbmFtZS5kYXRhXSA9IHZhbHVlLmRhdGFcblxuICAgIHRoaXMucmVzZXRTdGF0dXMoKVxuICAgIHJldHVybiBtZXRhRGF0YVxuICB9XG5cbiAgcmVzZXRTdGF0dXMgKCkge1xuICAgIHRoaXMub2Zmc2V0ID0gMFxuICAgIHRoaXMucmVhZE9mZnNldCA9IHRoaXMub2Zmc2V0XG4gIH1cblxuICBwYXJzZVN0cmluZyAoYnVmZmVyKSB7XG4gICAgY29uc3QgZHYgPSBuZXcgRGF0YVZpZXcoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQpXG4gICAgY29uc3Qgc3RyTGVuID0gZHYuZ2V0VWludDE2KDAsICFpc0xlKVxuICAgIGxldCBzdHIgPSAnJ1xuICAgIGlmIChzdHJMZW4gPiAwKSB7XG4gICAgICBzdHIgPSBVVEY4LmRlY29kZShuZXcgVWludDhBcnJheShidWZmZXIsIHRoaXMucmVhZE9mZnNldCArIDIsIHN0ckxlbikpXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9ICcnXG4gICAgfVxuICAgIGxldCBzaXplID0gc3RyTGVuICsgMlxuICAgIHRoaXMucmVhZE9mZnNldCArPSBzaXplXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IHN0cixcbiAgICAgIGJvZHlTaXplOiBzdHJMZW4gKyAyXG4gICAgfVxuICB9XG5cbiAgcGFyc2VEYXRlIChidWZmZXIsIHNpemUpIHtcbiAgICBjb25zdCBkdiA9IG5ldyBEYXRhVmlldyhidWZmZXIsIHRoaXMucmVhZE9mZnNldCwgc2l6ZSlcbiAgICBsZXQgdHMgPSBkdi5nZXRGbG9hdDY0KDAsICFpc0xlKVxuICAgIGNvbnN0IHRpbWVPZmZzZXQgPSBkdi5nZXRJbnQxNig4LCAhaXNMZSlcbiAgICB0cyArPSB0aW1lT2Zmc2V0ICogNjAgKiAxMDAwXG5cbiAgICB0aGlzLnJlYWRPZmZzZXQgKz0gMTBcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogbmV3IERhdGUodHMpLFxuICAgICAgYm9keVNpemU6IDEwXG4gICAgfVxuICB9XG5cbiAgcGFyc2VPYmplY3QgKGJ1ZmZlciwgc2l6ZSkge1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLnBhcnNlU3RyaW5nKGJ1ZmZlciwgc2l6ZSlcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMucGFyc2VWYWx1ZShidWZmZXIsIHNpemUgLSBuYW1lLmJvZHlTaXplKVxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIG5hbWU6IG5hbWUuZGF0YSxcbiAgICAgICAgdmFsdWU6IHZhbHVlLmRhdGFcbiAgICAgIH0sXG4gICAgICBib2R5U2l6ZTogbmFtZS5ib2R5U2l6ZSArIHZhbHVlLmJvZHlTaXplLFxuICAgICAgaXNPYmpFbmQ6IHZhbHVlLmlzT2JqRW5kXG4gICAgfVxuICB9XG5cbiAgcGFyc2VMb25nU3RyaW5nIChidWZmZXIpIHtcbiAgICBjb25zdCBkdiA9IG5ldyBEYXRhVmlldyhidWZmZXIsIHRoaXMucmVhZE9mZnNldClcbiAgICBjb25zdCBzdHJMZW4gPSBkdi5nZXRVaW50MzIoMCwgIWlzTGUpXG4gICAgbGV0IHN0ciA9ICcnXG4gICAgaWYgKHN0ckxlbiA+IDApIHtcbiAgICAgIHN0ciA9IFVURjguZGVjb2RlKG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgdGhpcy5yZWFkT2Zmc2V0ICsgMiwgc3RyTGVuKSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gJydcbiAgICB9XG4gICAgLy8gY29uc3Qgc2l6ZSA9IHN0ckxlbiArIDQ7XG4gICAgdGhpcy5yZWFkT2Zmc2V0ICs9IHN0ckxlbiArIDRcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogc3RyLFxuICAgICAgYm9keVNpemU6IHN0ckxlbiArIDRcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog6Kej5p6QbWV0YeS4reeahOWPmOmHj1xuICAgKi9cbiAgcGFyc2VWYWx1ZSAoZGF0YSwgc2l6ZSkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoKVxuICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICAgIGJ1ZmZlciA9IGRhdGFcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmZmVyID0gZGF0YS5idWZmZXJcbiAgICB9XG4gICAgY29uc3Qge1xuICAgICAgTlVNQkVSLFxuICAgICAgQk9PTEVBTixcbiAgICAgIFNUUklORyxcbiAgICAgIE9CSkVDVCxcbiAgICAgIE1JWF9BUlJBWSxcbiAgICAgIE9CSkVDVF9FTkQsXG4gICAgICBTVFJJQ1RfQVJSQVksXG4gICAgICBEQVRFLFxuICAgICAgTE9ORV9TVFJJTkdcbiAgICB9ID0gREFUQV9UWVBFU1xuICAgIGNvbnN0IGRhdGFWaWV3ID0gbmV3IERhdGFWaWV3KGJ1ZmZlciwgdGhpcy5yZWFkT2Zmc2V0LCBzaXplKVxuICAgIGxldCBpc09iakVuZCA9IGZhbHNlXG4gICAgY29uc3QgdHlwZSA9IGRhdGFWaWV3LmdldFVpbnQ4KDApXG4gICAgbGV0IG9mZnNldCA9IDFcbiAgICB0aGlzLnJlYWRPZmZzZXQgKz0gMVxuICAgIGxldCB2YWx1ZSA9IG51bGxcblxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBOVU1CRVI6IHtcbiAgICAgICAgdmFsdWUgPSBkYXRhVmlldy5nZXRGbG9hdDY0KDEsICFpc0xlKVxuICAgICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gOFxuICAgICAgICBvZmZzZXQgKz0gOFxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgY2FzZSBCT09MRUFOOiB7XG4gICAgICAgIGNvbnN0IGJvb2xOdW0gPSBkYXRhVmlldy5nZXRVaW50OCgxKVxuICAgICAgICB2YWx1ZSA9ICEhYm9vbE51bVxuICAgICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gMVxuICAgICAgICBvZmZzZXQgKz0gMVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgY2FzZSBTVFJJTkc6IHtcbiAgICAgICAgY29uc3Qgc3RyID0gdGhpcy5wYXJzZVN0cmluZyhidWZmZXIpXG4gICAgICAgIHZhbHVlID0gc3RyLmRhdGFcbiAgICAgICAgb2Zmc2V0ICs9IHN0ci5ib2R5U2l6ZVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgY2FzZSBPQkpFQ1Q6IHtcbiAgICAgICAgdmFsdWUgPSB7fVxuICAgICAgICBsZXQgb2JqRW5kU2l6ZSA9IDBcbiAgICAgICAgaWYgKGRhdGFWaWV3LmdldFVpbnQzMihzaXplIC0gNCwgIWlzTGUpICYgMHgwMEZGRkZGRikge1xuICAgICAgICAgIG9iakVuZFNpemUgPSAzXG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcy5yZWFkT2Zmc2V0ICs9IG9mZnNldCAtIDE7XG4gICAgICAgIHdoaWxlIChvZmZzZXQgPCBzaXplIC0gNCkge1xuICAgICAgICAgIGNvbnN0IGFtZk9iaiA9IHRoaXMucGFyc2VPYmplY3QoYnVmZmVyLCBzaXplIC0gb2Zmc2V0IC0gb2JqRW5kU2l6ZSlcbiAgICAgICAgICBpZiAoYW1mT2JqLmlzT2JqZWN0RW5kKSB7IGJyZWFrIH1cbiAgICAgICAgICB2YWx1ZVthbWZPYmouZGF0YS5uYW1lXSA9IGFtZk9iai5kYXRhLnZhbHVlXG4gICAgICAgICAgb2Zmc2V0ICs9IGFtZk9iai5ib2R5U2l6ZVxuICAgICAgICB9XG4gICAgICAgIGlmIChvZmZzZXQgPD0gc2l6ZSAtIDMpIHtcbiAgICAgICAgICBjb25zdCBtYXJrID0gZGF0YVZpZXcuZ2V0VWludDMyKG9mZnNldCAtIDEsICFpc0xlKSAmIDB4MDBGRkZGRkZcbiAgICAgICAgICBpZiAobWFyayA9PT0gOSkge1xuICAgICAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDNcbiAgICAgICAgICAgIG9mZnNldCArPSAzXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjYXNlIE1JWF9BUlJBWToge1xuICAgICAgICB2YWx1ZSA9IHt9XG4gICAgICAgIG9mZnNldCArPSA0XG4gICAgICAgIHRoaXMucmVhZE9mZnNldCArPSA0XG4gICAgICAgIGxldCBvYmpFbmRTaXplID0gMFxuICAgICAgICBpZiAoKGRhdGFWaWV3LmdldFVpbnQzMihzaXplIC0gNCwgIWlzTGUpICYgMHgwMEZGRkZGRikgPT09IDkpIHtcbiAgICAgICAgICBvYmpFbmRTaXplID0gM1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKG9mZnNldCA8IHNpemUgLSA4KSB7XG4gICAgICAgICAgY29uc3QgYW1mVmFyID0gdGhpcy5wYXJzZU9iamVjdChidWZmZXIsIHNpemUgLSBvZmZzZXQgLSBvYmpFbmRTaXplKVxuICAgICAgICAgIGlmIChhbWZWYXIuaXNPYmplY3RFbmQpIHsgYnJlYWsgfVxuICAgICAgICAgIHZhbHVlW2FtZlZhci5kYXRhLm5hbWVdID0gYW1mVmFyLmRhdGEudmFsdWVcbiAgICAgICAgICBvZmZzZXQgKz0gYW1mVmFyLmJvZHlTaXplXG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9mZnNldCA8PSBzaXplIC0gMykge1xuICAgICAgICAgIGNvbnN0IG1hcmtlciA9IGRhdGFWaWV3LmdldFVpbnQzMihvZmZzZXQgLSAxLCAhaXNMZSkgJiAweDAwRkZGRkZGXG4gICAgICAgICAgaWYgKG1hcmtlciA9PT0gOSkge1xuICAgICAgICAgICAgb2Zmc2V0ICs9IDNcbiAgICAgICAgICAgIHRoaXMucmVhZE9mZnNldCArPSAzXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGNhc2UgT0JKRUNUX0VORDoge1xuICAgICAgICB2YWx1ZSA9IG51bGxcbiAgICAgICAgaXNPYmpFbmQgPSB0cnVlXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGNhc2UgU1RSSUNUX0FSUkFZOiB7XG4gICAgICAgIHZhbHVlID0gW11cbiAgICAgICAgY29uc3QgYXJyTGVuZ3RoID0gZGF0YVZpZXcuZ2V0VWludDMyKDEsICFpc0xlKVxuICAgICAgICBvZmZzZXQgKz0gNFxuICAgICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gNFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyckxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3Qgc2NyaXB0ID0gdGhpcy5wYXJzZVZhbHVlKGJ1ZmZlciwgc2l6ZSAtIG9mZnNldClcbiAgICAgICAgICB2YWx1ZS5wdXNoKHNjcmlwdC5kYXRhKVxuICAgICAgICAgIG9mZnNldCArPSBzY3JpcHQuYm9keVNpemVcbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBjYXNlIERBVEU6IHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IHRoaXMucGFyc2VEYXRlKGJ1ZmZlciwgc2l6ZSAtIDEpXG4gICAgICAgIHZhbHVlID0gZGF0ZS5kYXRhXG4gICAgICAgIG9mZnNldCArPSBkYXRlLmJvZHlTaXplXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGNhc2UgTE9ORV9TVFJJTkc6IHtcbiAgICAgICAgY29uc3QgbG9uZ1N0ciA9IHRoaXMucGFyc2VMb25nU3RyaW5nKGJ1ZmZlciwgc2l6ZSAtIDEpXG4gICAgICAgIHZhbHVlID0gbG9uZ1N0ci5kYXRhXG4gICAgICAgIG9mZnNldCArPSBsb25nU3RyLmJvZHlTaXplXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgb2Zmc2V0ID0gc2l6ZVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiB2YWx1ZSxcbiAgICAgIGJvZHlTaXplOiBvZmZzZXQsXG4gICAgICBpc09iakVuZDogaXNPYmpFbmRcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IEVWRU5UUywgQXVkaW9UcmFja01ldGEsIFZpZGVvVHJhY2tNZXRhIH0gZnJvbSAneGdwbGF5ZXItdXRpbHMnO1xuaW1wb3J0IHsgU3BzUGFyc2VyIH0gZnJvbSAneGdwbGF5ZXItY29kZWMnO1xuaW1wb3J0IHsgVmlkZW9UcmFjaywgQXVkaW9UcmFjayB9IGZyb20gJ3hncGxheWVyLWJ1ZmZlcidcblxuaW1wb3J0IEFNRlBhcnNlciBmcm9tICcuL2FtZi1wYXJzZXInXG5cbmNvbnN0IERFTVVYX0VWRU5UUyA9IEVWRU5UUy5ERU1VWF9FVkVOVFM7XG5cbmNsYXNzIEZsdkRlbXV4ZXIge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5fZmlyc3RGcmFnbWVudExvYWRlZCA9IGZhbHNlXG4gICAgdGhpcy5fdHJhY2tOdW0gPSAwXG4gICAgdGhpcy5faGFzU2NyaXB0ID0gZmFsc2VcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIHRoaXMub24oREVNVVhfRVZFTlRTLkRFTVVYX1NUQVJULCB0aGlzLmRvUGFyc2VGbHYuYmluZCh0aGlzKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBpZiB0aGUgZmx2IGhlYWQgaXMgdmFsaWRcbiAgICogQHBhcmFtIGRhdGFcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgaXNGbHZGaWxlIChkYXRhKSB7XG4gICAgcmV0dXJuICEoZGF0YVswXSAhPT0gMHg0NiB8fCBkYXRhWzFdICE9PSAweDRDIHx8IGRhdGFbMl0gIT09IDB4NTYgfHwgZGF0YVszXSAhPT0gMHgwMSlcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiB0aGUgc3RyZWFtIGhhcyBhdWRpbyBvciB2aWRlby5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHN0cmVhbUZsYWcgLSBEYXRhIGZyb20gdGhlIHN0cmVhbSB3aGljaCBpcyBkZWZpbmUgd2hldGhlciB0aGUgYXVkaW8gLyB2aWRlbyB0cmFjayBpcyBleGlzdC5cbiAgICovXG4gIHN0YXRpYyBnZXRQbGF5VHlwZSAoc3RyZWFtRmxhZykge1xuICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgIGhhc1ZpZGVvOiBmYWxzZSxcbiAgICAgIGhhc0F1ZGlvOiBmYWxzZVxuICAgIH1cblxuICAgIGlmIChzdHJlYW1GbGFnICYgMHgwMSA+IDApIHtcbiAgICAgIHJlc3VsdC5oYXNWaWRlbyA9IHRydWVcbiAgICB9XG5cbiAgICBpZiAoc3RyZWFtRmxhZyAmIDB4MDQgPiAwKSB7XG4gICAgICByZXN1bHQuaGFzQXVkaW8gPSB0cnVlXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgZG9QYXJzZUZsdiAoKSB7XG4gICAgaWYgKCF0aGlzLl9maXJzdEZyYWdtZW50TG9hZGVkKSB7XG4gICAgICBpZiAodGhpcy5sb2FkZXJCdWZmZXIubGVuZ3RoIDwgMTMpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjb25zdCBoZWFkZXIgPSB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgxMylcbiAgICAgIHRoaXMucGFyc2VGbHZIZWFkZXIoaGVhZGVyKVxuICAgICAgdGhpcy5kb1BhcnNlRmx2KCkgLy8g6YCS5b2S6LCD55So77yM57un57ut6Kej5p6QZmx25rWBXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmxvYWRlckJ1ZmZlci5sZW5ndGggPCAxMSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGxldCBjaHVuaztcblxuICAgICAgbGV0IGxvb3BNYXggPSAxMDAwMDAgLy8g6Ziy5q2i5q275b6q546v5Lqn55SfXG4gICAgICBkbyB7XG4gICAgICAgIGNodW5rID0gdGhpcy5fcGFyc2VGbHZUYWcoKVxuICAgICAgfSB3aGlsZSAoY2h1bmsgJiYgbG9vcE1heC0tID4gMClcblxuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9DT01QTEVURSlcbiAgICB9XG4gIH1cblxuICBwYXJzZUZsdkhlYWRlciAoaGVhZGVyKSB7XG4gICAgaWYgKCFGbHZEZW11eGVyLmlzRmx2RmlsZShoZWFkZXIpKSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCBuZXcgRXJyb3IoJ2ludmFsaWQgZmx2IGZpbGUnKSlcbiAgICAgIHRoaXMuZG9QYXJzZUZsdigpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2ZpcnN0RnJhZ21lbnRMb2FkZWQgPSB0cnVlXG4gICAgICBjb25zdCBwbGF5VHlwZSA9IEZsdkRlbXV4ZXIuZ2V0UGxheVR5cGUoaGVhZGVyWzRdKVxuXG4gICAgICBpZiAocGxheVR5cGUuaGFzVmlkZW8pIHtcbiAgICAgICAgdGhpcy5pbml0VmlkZW9UcmFjaygpXG4gICAgICB9XG5cbiAgICAgIGlmIChwbGF5VHlwZS5oYXNBdWRpbykge1xuICAgICAgICB0aGlzLmluaXRBdWRpb1RyYWNrKClcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5kb1BhcnNlRmx2KClcbiAgfVxuXG4gIC8qKlxuICAgKiBpbml0IGRlZmF1bHQgdmlkZW8gdHJhY2sgY29uZmlnc1xuICAgKi9cbiAgaW5pdFZpZGVvVHJhY2sgKCkge1xuICAgIHRoaXMuX3RyYWNrTnVtKytcbiAgICBsZXQgdmlkZW9UcmFjayA9IG5ldyBWaWRlb1RyYWNrKClcbiAgICB2aWRlb1RyYWNrLm1ldGEgPSBuZXcgVmlkZW9UcmFja01ldGEoKVxuICAgIHZpZGVvVHJhY2suaWQgPSB2aWRlb1RyYWNrLm1ldGEuaWQgPSB0aGlzLl90cmFja051bVxuXG4gICAgdGhpcy50cmFja3MudmlkZW9UcmFjayA9IHZpZGVvVHJhY2tcbiAgfVxuXG4gIC8qKlxuICAgKiBpbml0IGRlZmF1bHQgYXVkaW8gdHJhY2sgY29uZmlnc1xuICAgKi9cbiAgaW5pdEF1ZGlvVHJhY2sgKCkge1xuICAgIHRoaXMuX3RyYWNrTnVtKytcbiAgICBsZXQgYXVkaW9UcmFjayA9IG5ldyBBdWRpb1RyYWNrKClcbiAgICBhdWRpb1RyYWNrLm1ldGEgPSBuZXcgQXVkaW9UcmFja01ldGEoKVxuICAgIGF1ZGlvVHJhY2suaWQgPSBhdWRpb1RyYWNrLm1ldGEuaWQgPSB0aGlzLl90cmFja051bVxuXG4gICAgdGhpcy50cmFja3MuYXVkaW9UcmFjayA9IGF1ZGlvVHJhY2tcbiAgfVxuXG4gIC8qKlxuICAgKiBQYWNrYWdlIHRoZSBkYXRhIGFzIHRoZSBmb2xsb3dpbmcgZGF0YSBzdHJ1Y3R1cmVcbiAgICoge1xuICAgKiAgICBkYXRhOiBVaW50OEFycmF5LiB0aGUgU3RyZWFtIGRhdGEuXG4gICAqICAgIGluZm86IFRoZSBmaXJzdCBieXRlIGluZm8gb2YgdGhlIFRhZy5cbiAgICogICAgdGFnVHlwZTogOOOAgTnjgIExOFxuICAgKiAgICB0aW1lU3RhbXA6IHRoZSB0aW1lc3RlbXBcbiAgICogfVxuICAgKi9cbiAgX3BhcnNlRmx2VGFnICgpIHtcbiAgICBpZiAodGhpcy5sb2FkZXJCdWZmZXIubGVuZ3RoIDwgMTEpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIGxldCBjaHVuayA9IHRoaXMuX3BhcnNlRmx2VGFnSGVhZGVyKClcbiAgICBpZiAoY2h1bmspIHtcbiAgICAgIHRoaXMuX3Byb2Nlc3NDaHVuayhjaHVuaylcbiAgICB9XG4gICAgcmV0dXJuIGNodW5rXG4gIH1cblxuICAvKipcbiAgICogUGFyc2UgdGhlIDExIGJ5dGUgdGFnIEhlYWRlclxuICAgKi9cbiAgX3BhcnNlRmx2VGFnSGVhZGVyICgpIHtcbiAgICBsZXQgb2Zmc2V0ID0gMFxuICAgIGxldCBjaHVuayA9IHt9XG5cbiAgICBsZXQgdGFnVHlwZSA9IHRoaXMubG9hZGVyQnVmZmVyLnRvSW50KG9mZnNldCwgMSlcbiAgICBvZmZzZXQgKz0gMVxuXG4gICAgLy8gMiBiaXQgRk1TIHJlc2VydmVkLCAxIGJpdCBmaWx0ZXJlZCwgNSBiaXQgdGFnIHR5cGVcbiAgICBjaHVuay5maWx0ZXJlZCA9ICh0YWdUeXBlICYgMzIpID4+PiA1XG4gICAgY2h1bmsudGFnVHlwZSA9IHRhZ1R5cGUgJiAzMVxuXG4gICAgLy8gMyBCeXRlIGRhdGFzaXplXG4gICAgY2h1bmsuZGF0YXNpemUgPSB0aGlzLmxvYWRlckJ1ZmZlci50b0ludChvZmZzZXQsIDMpXG4gICAgb2Zmc2V0ICs9IDNcblxuICAgIGlmICgoY2h1bmsudGFnVHlwZSAhPT0gOCAmJiBjaHVuay50YWdUeXBlICE9PSA5ICYmIGNodW5rLnRhZ1R5cGUgIT09IDExICYmIGNodW5rLnRhZ1R5cGUgIT09IDE4KSB8fFxuICAgICAgdGhpcy5sb2FkZXJCdWZmZXIudG9JbnQoOCwgMykgIT09IDApIHtcbiAgICAgIGlmICh0aGlzLmxvYWRlckJ1ZmZlciAmJiB0aGlzLmxvYWRlckJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDEpXG4gICAgICB9XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLlRBRywgbmV3IEVycm9yKCd0YWdUeXBlICcgKyBjaHVuay50YWdUeXBlKSwgZmFsc2UpXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIGlmICh0aGlzLmxvYWRlckJ1ZmZlci5sZW5ndGggPCBjaHVuay5kYXRhc2l6ZSArIDE1KSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIC8vIHJlYWQgdGhlIGRhdGEuXG4gICAgdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoNClcblxuICAgIC8vIDMgQnl0ZSB0aW1lc3RhbXBcbiAgICBsZXQgdGltZXN0YW1wID0gdGhpcy5sb2FkZXJCdWZmZXIudG9JbnQoMCwgMylcbiAgICB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgzKVxuXG4gICAgLy8gMSBCeXRlIHRpbWVzdGFtcEV4dFxuICAgIGxldCB0aW1lc3RhbXBFeHQgPSB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgxKVswXVxuICAgIGlmICh0aW1lc3RhbXBFeHQgPiAwKSB7XG4gICAgICB0aW1lc3RhbXAgKz0gdGltZXN0YW1wRXh0ICogMHgxMDAwMDAwXG4gICAgfVxuXG4gICAgY2h1bmsuZHRzID0gdGltZXN0YW1wXG5cbiAgICAvLyBzdHJlYW1JZFxuICAgIHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDMpXG4gICAgcmV0dXJuIGNodW5rXG4gIH1cblxuICBfcHJvY2Vzc0NodW5rIChjaHVuaykge1xuICAgIHN3aXRjaCAoY2h1bmsudGFnVHlwZSkge1xuICAgICAgY2FzZSAxODpcbiAgICAgICAgdGhpcy5fcGFyc2VTY3JpcHREYXRhKGNodW5rKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSA4OlxuICAgICAgICB0aGlzLl9wYXJzZUFBQ0RhdGEoY2h1bmspXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDk6XG4gICAgICAgIHRoaXMuX3BhcnNlSGV2Y0RhdGEoY2h1bmspXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDExOlxuICAgICAgICAvLyBmb3Igc29tZSBDRE4gdGhhdCBkaWQgbm90IHByb2Nlc3MgdGhlIGN1cnJlY3QgUlRNUCBtZXNzYWdlc1xuICAgICAgICB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgzKVxuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcGFyc2UgZmx2IHNjcmlwdCBkYXRhXG4gICAqIEBwYXJhbSBjaHVua1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3BhcnNlU2NyaXB0RGF0YSAoY2h1bmspIHtcbiAgICBsZXQgYXVkaW9UcmFjayA9IHRoaXMudHJhY2tzLmF1ZGlvVHJhY2tcbiAgICBsZXQgdmlkZW9UcmFjayA9IHRoaXMudHJhY2tzLnZpZGVvVHJhY2tcblxuICAgIGxldCBkYXRhID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoY2h1bmsuZGF0YXNpemUpXG5cbiAgICBjb25zdCBpbmZvID0gbmV3IEFNRlBhcnNlcigpLnJlc29sdmUoZGF0YSwgZGF0YS5sZW5ndGgpXG5cbiAgICBjb25zdCBvbk1ldGFEYXRhID0gdGhpcy5fY29udGV4dC5vbk1ldGFEYXRhID0gaW5mbyA/IGluZm8ub25NZXRhRGF0YSA6IHVuZGVmaW5lZFxuXG4gICAgLy8gZmlsbCBtZWRpYUluZm9cbiAgICB0aGlzLl9jb250ZXh0Lm1lZGlhSW5mby5kdXJhdGlvbiA9IG9uTWV0YURhdGEuZHVyYXRpb25cbiAgICB0aGlzLl9jb250ZXh0Lm1lZGlhSW5mby5oYXNWaWRlbyA9IG9uTWV0YURhdGEuaGFzVmlkZW9cbiAgICB0aGlzLl9jb250ZXh0Lm1lZGlhSW5mby5oc2FBdWRpbyA9IG9uTWV0YURhdGEuaGFzQXVkaW9cblxuICAgIGxldCB2YWxpZGF0ZSA9IHRoaXMuX2RhdGFzaXplVmFsaWRhdG9yKGNodW5rLmRhdGFzaXplKVxuICAgIGlmICh2YWxpZGF0ZSkge1xuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRURJQV9JTkZPKVxuICAgICAgdGhpcy5faGFzU2NyaXB0ID0gdHJ1ZVxuICAgIH1cblxuICAgIC8vIEVkaXQgZGVmYXVsdCBtZXRhLlxuICAgIGlmIChhdWRpb1RyYWNrICYmICFhdWRpb1RyYWNrLmhhc1NwZWNpZmljQ29uZmlnKSB7XG4gICAgICBsZXQgbWV0YSA9IGF1ZGlvVHJhY2subWV0YVxuICAgICAgaWYgKG9uTWV0YURhdGEuYXVkaW9zYW1wbGVyYXRlKSB7XG4gICAgICAgIG1ldGEuc2FtcGxlUmF0ZSA9IG9uTWV0YURhdGEuYXVkaW9zYW1wbGVyYXRlXG4gICAgICB9XG5cbiAgICAgIGlmIChvbk1ldGFEYXRhLmF1ZGlvY2hhbm5lbHMpIHtcbiAgICAgICAgbWV0YS5jaGFubmVsQ291bnQgPSBvbk1ldGFEYXRhLmF1ZGlvY2hhbm5lbHNcbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChvbk1ldGFEYXRhLmF1ZGlvc2FtcGxlcmF0ZSkge1xuICAgICAgICBjYXNlIDQ0MTAwOlxuICAgICAgICAgIG1ldGEuc2FtcGxlUmF0ZUluZGV4ID0gNFxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjIwNTA6XG4gICAgICAgICAgbWV0YS5zYW1wbGVSYXRlSW5kZXggPSA3XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAxMTAyNTpcbiAgICAgICAgICBtZXRhLnNhbXBsZVJhdGVJbmRleCA9IDEwXG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHZpZGVvVHJhY2sgJiYgIXZpZGVvVHJhY2suaGFzU3BlY2lmaWNDb25maWcpIHtcbiAgICAgIGxldCBtZXRhID0gdmlkZW9UcmFjay5tZXRhXG4gICAgICBpZiAodHlwZW9mIG9uTWV0YURhdGEuZnJhbWVyYXRlID09PSAnbnVtYmVyJykge1xuICAgICAgICBsZXQgZnBzTnVtID0gTWF0aC5mbG9vcihvbk1ldGFEYXRhLmZyYW1lcmF0ZSAqIDEwMDApXG4gICAgICAgIGlmIChmcHNOdW0gPiAwKSB7XG4gICAgICAgICAgbGV0IGZwcyA9IGZwc051bSAvIDEwMDBcbiAgICAgICAgICBpZiAoIW1ldGEuZnJhbWVSYXRlKSB7XG4gICAgICAgICAgICBtZXRhLmZyYW1lUmF0ZSA9IHt9XG4gICAgICAgICAgfVxuICAgICAgICAgIG1ldGEuZnJhbWVSYXRlLmZpeGVkID0gdHJ1ZVxuICAgICAgICAgIG1ldGEuZnJhbWVSYXRlLmZwcyA9IGZwc1xuICAgICAgICAgIG1ldGEuZnJhbWVSYXRlLmZwc19udW0gPSBmcHNOdW1cbiAgICAgICAgICBtZXRhLmZyYW1lUmF0ZS5mcHNfZGVuID0gMTAwMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2FhY1NlcXVlbmNlSGVhZGVyUGFyc2VyIChkYXRhKSB7XG4gICAgbGV0IHJldCA9IHt9XG4gICAgcmV0Lmhhc1NwZWNpZmljQ29uZmlnID0gdHJ1ZVxuICAgIHJldC5vYmplY3RUeXBlID0gZGF0YVsxXSA+Pj4gM1xuICAgIHJldC5zYW1wbGVSYXRlSW5kZXggPSAoKGRhdGFbMV0gJiA3KSA8PCAxKSB8IChkYXRhWzJdID4+PiA3KVxuICAgIHJldC5hdWRpb3NhbXBsZXJhdGUgPSB0aGlzLl9zd2l0Y2hBdWRpb1NhbXBsZVJhdGUocmV0LnNhbXBsZVJhdGVJbmRleClcbiAgICByZXQuY2hhbm5lbENvdW50ID0gKGRhdGFbMl0gJiAxMjApID4+PiAzXG4gICAgcmV0LmZyYW1lTGVuZ3RoID0gKGRhdGFbMl0gJiA0KSA+Pj4gMlxuICAgIHJldC5kZXBlbmRzT25Db3JlQ29kZXIgPSAoZGF0YVsyXSAmIDIpID4+PiAxXG4gICAgcmV0LmV4dGVuc2lvbkZsYWdJbmRleCA9IGRhdGFbMl0gJiAxXG5cbiAgICByZXQuY29kZWMgPSBgbXA0YS40MC4ke3JldC5vYmplY3RUeXBlfWBcbiAgICBsZXQgdXNlckFnZW50ID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbiAgICBsZXQgZXh0ZW5zaW9uU2FtcGxpbmdJbmRleDtcblxuICAgIGxldCBjb25maWc7XG4gICAgbGV0IHNhbXBsaW5nSW5kZXggPSByZXQuc2FtcGxlUmF0ZUluZGV4O1xuXG4gICAgaWYgKHVzZXJBZ2VudC5pbmRleE9mKCdmaXJlZm94JykgIT09IC0xKSB7XG4gICAgICAvLyBmaXJlZm94OiB1c2UgU0JSIChIRS1BQUMpIGlmIGZyZXEgbGVzcyB0aGFuIDI0a0h6XG4gICAgICBpZiAocmV0LnNhbXBsZVJhdGVJbmRleCA+PSA2KSB7XG4gICAgICAgIHJldC5vYmplY3RUeXBlID0gNTtcbiAgICAgICAgY29uZmlnID0gbmV3IEFycmF5KDQpO1xuICAgICAgICBleHRlbnNpb25TYW1wbGluZ0luZGV4ID0gc2FtcGxpbmdJbmRleCAtIDM7XG4gICAgICB9IGVsc2UgeyAvLyB1c2UgTEMtQUFDXG4gICAgICAgIHJldC5vYmplY3RUeXBlID0gMjtcbiAgICAgICAgY29uZmlnID0gbmV3IEFycmF5KDIpO1xuICAgICAgICBleHRlbnNpb25TYW1wbGluZ0luZGV4ID0gc2FtcGxpbmdJbmRleDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHVzZXJBZ2VudC5pbmRleE9mKCdhbmRyb2lkJykgIT09IC0xKSB7XG4gICAgICAvLyBhbmRyb2lkOiBhbHdheXMgdXNlIExDLUFBQ1xuICAgICAgcmV0Lm9iamVjdFR5cGUgPSAyO1xuICAgICAgY29uZmlnID0gbmV3IEFycmF5KDIpO1xuICAgICAgZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCA9IHNhbXBsaW5nSW5kZXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGZvciBvdGhlciBicm93c2VycywgZS5nLiBjaHJvbWUuLi5cbiAgICAgIC8vIEFsd2F5cyB1c2UgSEUtQUFDIHRvIG1ha2UgaXQgZWFzaWVyIHRvIHN3aXRjaCBhYWMgY29kZWMgcHJvZmlsZVxuICAgICAgcmV0Lm9iamVjdFR5cGUgPSA1O1xuICAgICAgZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCA9IHJldC5zYW1wbGVSYXRlSW5kZXg7XG4gICAgICBjb25maWcgPSBuZXcgQXJyYXkoNCk7XG5cbiAgICAgIGlmIChyZXQuc2FtcGxlUmF0ZUluZGV4ID49IDYpIHtcbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCA9IHJldC5zYW1wbGVSYXRlSW5kZXggLSAzO1xuICAgICAgfSBlbHNlIGlmIChyZXQuY2hhbm5lbENvdW50ID09PSAxKSB7IC8vIE1vbm8gY2hhbm5lbFxuICAgICAgICByZXQub2JqZWN0VHlwZSA9IDI7XG4gICAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSgyKTtcbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCA9IHJldC5zYW1wbGVSYXRlSW5kZXg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uZmlnWzBdID0gcmV0Lm9iamVjdFR5cGUgPDwgMztcbiAgICBjb25maWdbMF0gfD0gKHJldC5zYW1wbGVSYXRlSW5kZXggJiAweDBGKSA+Pj4gMTtcbiAgICBjb25maWdbMV0gPSAocmV0LnNhbXBsZVJhdGVJbmRleCAmIDB4MEYpIDw8IDc7XG4gICAgY29uZmlnWzFdIHw9IChyZXQuY2hhbm5lbENvdW50ICYgMHgwRikgPDwgMztcbiAgICBpZiAocmV0Lm9iamVjdFR5cGUgPT09IDUpIHtcbiAgICAgIGNvbmZpZ1sxXSB8PSAoKGV4dGVuc2lvblNhbXBsaW5nSW5kZXggJiAweDBGKSA+Pj4gMSk7XG4gICAgICBjb25maWdbMl0gPSAoZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCAmIDB4MDEpIDw8IDc7XG4gICAgICAvLyBleHRlbmRlZCBhdWRpbyBvYmplY3QgdHlwZTogZm9yY2UgdG8gMiAoTEMtQUFDKVxuICAgICAgY29uZmlnWzJdIHw9ICgyIDw8IDIpO1xuICAgICAgY29uZmlnWzNdID0gMDtcbiAgICB9XG4gICAgcmV0LmNvbmZpZyA9IGNvbmZpZ1xuICAgIHJldHVybiByZXRcbiAgfVxuXG4gIF9wYXJzZUFBQ0RhdGEgKGNodW5rKSB7XG4gICAgbGV0IHRyYWNrID0gdGhpcy50cmFja3MuYXVkaW9UcmFja1xuICAgIGlmICghdHJhY2spIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBtZXRhID0gdHJhY2subWV0YVxuXG4gICAgaWYgKCFtZXRhKSB7XG4gICAgICB0cmFjay5tZXRhID0gbmV3IEF1ZGlvVHJhY2tNZXRhKClcbiAgICAgIG1ldGEgPSB0cmFjay5tZXRhO1xuICAgIH1cblxuICAgIGxldCBpbmZvID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMSlbMF1cblxuICAgIGNodW5rLmRhdGEgPSB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdChjaHVuay5kYXRhc2l6ZSAtIDEpXG5cbiAgICBsZXQgZm9ybWF0ID0gKGluZm8gJiAyNDApID4+PiA0XG5cbiAgICB0cmFjay5mb3JtYXQgPSBmb3JtYXRcblxuICAgIGlmIChmb3JtYXQgIT09IDEwKSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCBuZXcgRXJyb3IoYGludmFsaWQgYXVkaW8gZm9ybWF0OiAke2Zvcm1hdH1gKSlcbiAgICB9XG5cbiAgICBpZiAoZm9ybWF0ID09PSAxMCAmJiAhdGhpcy5faGFzQXVkaW9TZXF1ZW5jZSkge1xuICAgICAgbWV0YS5zYW1wbGVSYXRlID0gdGhpcy5fc3dpdGNoQXVkaW9TYW1wbGluZ0ZyZXF1ZW5jeShpbmZvKVxuICAgICAgbWV0YS5zYW1wbGVSYXRlSW5kZXggPSAoaW5mbyAmIDEyKSA+Pj4gMlxuICAgICAgbWV0YS5mcmFtZUxlbnRoID0gKGluZm8gJiAyKSA+Pj4gMVxuICAgICAgbWV0YS5jaGFubmVsQ291bnQgPSBpbmZvICYgMVxuICAgICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA9IE1hdGguZmxvb3IoMTAyNCAvIG1ldGEuYXVkaW9TYW1wbGVSYXRlICogbWV0YS50aW1lc2NhbGUpXG4gICAgfVxuXG4gICAgbGV0IGF1ZGlvU2FtcGxlUmF0ZSA9IG1ldGEuYXVkaW9TYW1wbGVSYXRlXG4gICAgbGV0IGF1ZGlvU2FtcGxlUmF0ZUluZGV4ID0gbWV0YS5zYW1wbGVSYXRlSW5kZXhcbiAgICBsZXQgcmVmU2FtcGxlRHVyYXRpb24gPSBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG5cbiAgICBkZWxldGUgY2h1bmsudGFnVHlwZVxuICAgIGxldCB2YWxpZGF0ZSA9IHRoaXMuX2RhdGFzaXplVmFsaWRhdG9yKGNodW5rLmRhdGFzaXplKVxuXG4gICAgaWYgKGNodW5rLmRhdGFbMF0gPT09IDApIHsgLy8gQUFDIFNlcXVlbmNlIEhlYWRlclxuICAgICAgbGV0IGFhY0hlYWRlciA9IHRoaXMuX2FhY1NlcXVlbmNlSGVhZGVyUGFyc2VyKGNodW5rLmRhdGEpXG4gICAgICBhdWRpb1NhbXBsZVJhdGUgPSBhYWNIZWFkZXIuYXVkaW9zYW1wbGVyYXRlIHx8IG1ldGEuYXVkaW9TYW1wbGVSYXRlXG4gICAgICBhdWRpb1NhbXBsZVJhdGVJbmRleCA9IGFhY0hlYWRlci5zYW1wbGVSYXRlSW5kZXggfHwgbWV0YS5zYW1wbGVSYXRlSW5kZXhcbiAgICAgIHJlZlNhbXBsZUR1cmF0aW9uID0gTWF0aC5mbG9vcigxMDI0IC8gYXVkaW9TYW1wbGVSYXRlICogbWV0YS50aW1lc2NhbGUpXG5cbiAgICAgIG1ldGEuY2hhbm5lbENvdW50ID0gYWFjSGVhZGVyLmNoYW5uZWxDb3VudFxuICAgICAgbWV0YS5zYW1wbGVSYXRlID0gYXVkaW9TYW1wbGVSYXRlXG4gICAgICBtZXRhLnNhbXBsZVJhdGVJbmRleCA9IGF1ZGlvU2FtcGxlUmF0ZUluZGV4XG4gICAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uID0gcmVmU2FtcGxlRHVyYXRpb25cbiAgICAgIG1ldGEuZHVyYXRpb24gPSB0aGlzLl9jb250ZXh0Lm1lZGlhSW5mby5kdXJhdGlvbiAqIG1ldGEudGltZXNjYWxlXG4gICAgICBtZXRhLmNvbmZpZyA9IGFhY0hlYWRlci5jb25maWdcbiAgICAgIG1ldGEub2JqZWN0VHlwZSA9IGFhY0hlYWRlci5vYmplY3RUeXBlO1xuXG4gICAgICBjb25zdCBhdWRpb01lZGlhID0gdGhpcy5fY29udGV4dC5tZWRpYUluZm8uYXVkaW9cblxuICAgICAgLy8gZmlsbCBhdWRpbyBtZWRpYSBpbmZvXG4gICAgICBhdWRpb01lZGlhLmNvZGVjID0gYWFjSGVhZGVyLmNvZGVjXG4gICAgICBhdWRpb01lZGlhLmNoYW5uZWxDb3VudCA9IGFhY0hlYWRlci5jaGFubmVsQ291bnRcbiAgICAgIGF1ZGlvTWVkaWEuc2FtcGxlUmF0ZSA9IGF1ZGlvU2FtcGxlUmF0ZVxuICAgICAgYXVkaW9NZWRpYS5zYW1wbGVSYXRlSW5kZXggPSBhYWNIZWFkZXIuYXVkaW9TYW1wbGVSYXRlSW5kZXhcblxuICAgICAgaWYgKHRoaXMuX2hhc1NjcmlwdCAmJiAhdGhpcy5faGFzQXVkaW9TZXF1ZW5jZSkge1xuICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgJ2F1ZGlvJylcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5faGFzU2NyaXB0ICYmIHRoaXMuX2hhc0F1ZGlvU2VxdWVuY2UpIHtcbiAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICdhdWRpbycpXG4gICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuQVVESU9fTUVUQURBVEFfQ0hBTkdFKVxuICAgICAgICAvLyB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgJ2F1ZGlvJylcbiAgICAgIH1cbiAgICAgIHRoaXMuX2hhc0F1ZGlvU2VxdWVuY2UgPSB0cnVlXG5cbiAgICAgIHRoaXMuX21ldGFDaGFuZ2UgPSB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLl9tZXRhQ2hhbmdlKSB7XG4gICAgICAgIGNodW5rLm9wdGlvbnMgPSB7XG4gICAgICAgICAgbWV0YTogdHJhY2subWV0YVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9tZXRhQ2hhbmdlID0gZmFsc2VcbiAgICAgIH1cblxuICAgICAgY2h1bmsuZGF0YSA9IGNodW5rLmRhdGEuc2xpY2UoMSwgY2h1bmsuZGF0YS5sZW5ndGgpXG4gICAgICB0cmFjay5zYW1wbGVzLnB1c2goY2h1bmspXG4gICAgfVxuICAgIGlmICghdmFsaWRhdGUpIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIHRoaXMuVEFHLCBuZXcgRXJyb3IoJ1RBRyBsZW5ndGggZXJyb3IgYXQgJyArIGNodW5rLmRhdGFzaXplKSwgZmFsc2UpXG4gICAgICAvLyB0aGlzLmxvZ2dlci53YXJuKHRoaXMuVEFHLCBlcnJvci5tZXNzYWdlKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBwYXJzZSBoZXZjL2F2YyB2aWRlbyBkYXRhXG4gICAqIEBwYXJhbSBjaHVua1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3BhcnNlSGV2Y0RhdGEgKGNodW5rKSB7XG4gICAgLy8gaGVhZGVyXG4gICAgbGV0IGluZm8gPSB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgxKVswXVxuICAgIGNodW5rLmZyYW1lVHlwZSA9IChpbmZvICYgMHhmMCkgPj4+IDRcbiAgICBjaHVuay5pc0tleWZyYW1lID0gY2h1bmsuZnJhbWVUeXBlID09PSAxXG4gICAgLy8gbGV0IHRlbXBDb2RlY0lEID0gdGhpcy50cmFja3MudmlkZW9UcmFjay5jb2RlY0lEXG4gICAgbGV0IGNvZGVjSUQgPSBpbmZvICYgMHgwZlxuICAgIHRoaXMudHJhY2tzLnZpZGVvVHJhY2suY29kZWNJRCA9IGNvZGVjSURcblxuICAgIC8vIGhldmPlkoxhdmPnmoRoZWFkZXLop6PmnpDmlrnlvI/kuIDmoLdcbiAgICBjaHVuay5hdmNQYWNrZXRUeXBlID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMSlbMF1cbiAgICBjaHVuay5jdHMgPSB0aGlzLmxvYWRlckJ1ZmZlci50b0ludCgwLCAzKVxuICAgIHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDMpXG5cbiAgICAvLyAxMiBmb3IgaGV2YywgNyBmb3IgYXZjXG4gICAgaWYgKGNvZGVjSUQgPT09IDEyKSB7XG4gICAgICBjb25zdCBkYXRhID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoY2h1bmsuZGF0YXNpemUgLSA1KVxuICAgICAgY2h1bmsuZGF0YSA9IGRhdGFcblxuICAgICAgaWYgKE51bWJlci5wYXJzZUludChjaHVuay5hdmNQYWNrZXRUeXBlKSAhPT0gMCkge1xuICAgICAgICBpZiAoIXRoaXMuX2RhdGFzaXplVmFsaWRhdG9yKGNodW5rLmRhdGFzaXplKSkge1xuICAgICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIHRoaXMuVEFHLCBuZXcgRXJyb3IoYGludmFsaWQgdmlkZW8gdGFnIGRhdGFzaXplOiAke2NodW5rLmRhdGFzaXplfWApLCBmYWxzZSlcbiAgICAgICAgfVxuICAgICAgICBsZXQgbmFsdSA9IHt9XG4gICAgICAgIGxldCByID0gMFxuICAgICAgICBuYWx1LmN0cyA9IGNodW5rLmN0c1xuICAgICAgICBuYWx1LmR0cyA9IGNodW5rLmR0c1xuICAgICAgICB3aGlsZSAoY2h1bmsuZGF0YS5sZW5ndGggPiByKSB7XG4gICAgICAgICAgbGV0IHNpemVzID0gY2h1bmsuZGF0YS5zbGljZShOdW1iZXIucGFyc2VJbnQociksIDQgKyByKVxuICAgICAgICAgIG5hbHUuc2l6ZSA9IHNpemVzWzNdXG4gICAgICAgICAgbmFsdS5zaXplICs9IHNpemVzWzJdICogMjU2XG4gICAgICAgICAgbmFsdS5zaXplICs9IHNpemVzWzFdICogMjU2ICogMjU2XG4gICAgICAgICAgbmFsdS5zaXplICs9IHNpemVzWzBdICogMjU2ICogMjU2ICogMjU2XG4gICAgICAgICAgciArPSA0XG4gICAgICAgICAgbmFsdS5kYXRhID0gY2h1bmsuZGF0YS5zbGljZShOdW1iZXIucGFyc2VJbnQociksIG5hbHUuc2l6ZSArIHIpXG4gICAgICAgICAgciArPSBuYWx1LnNpemVcbiAgICAgICAgICB0aGlzLnRyYWNrcy52aWRlb1RyYWNrLnNhbXBsZXMucHVzaChuYWx1KVxuICAgICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAndmlkZW8nKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKE51bWJlci5wYXJzZUludChjaHVuay5hdmNQYWNrZXRUeXBlKSA9PT0gMCkge1xuICAgICAgICBpZiAoIXRoaXMuX2RhdGFzaXplVmFsaWRhdG9yKGNodW5rLmRhdGFzaXplKSkge1xuICAgICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIHRoaXMuVEFHLCBuZXcgRXJyb3IoYGludmFsaWQgdmlkZW8gdGFnIGRhdGFzaXplOiAke2NodW5rLmRhdGFzaXplfWApLCBmYWxzZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgJ3ZpZGVvJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY29kZWNJRCA9PT0gNykge1xuICAgICAgbGV0IGRhdGEgPSB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdChjaHVuay5kYXRhc2l6ZSAtIDUpXG4gICAgICBpZiAoZGF0YVs0XSA9PT0gMCAmJiBkYXRhWzVdID09PSAwICYmIGRhdGFbNl0gPT09IDAgJiYgZGF0YVs3XSA9PT0gMSkge1xuICAgICAgICBsZXQgYXZjY2xlbmd0aCA9IDBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICBhdmNjbGVuZ3RoID0gYXZjY2xlbmd0aCAqIDI1NiArIGRhdGFbaV1cbiAgICAgICAgfVxuICAgICAgICBhdmNjbGVuZ3RoIC09IDRcbiAgICAgICAgZGF0YSA9IGRhdGEuc2xpY2UoNCwgZGF0YS5sZW5ndGgpXG4gICAgICAgIGRhdGFbM10gPSBhdmNjbGVuZ3RoICUgMjU2XG4gICAgICAgIGF2Y2NsZW5ndGggPSAoYXZjY2xlbmd0aCAtIGRhdGFbM10pIC8gMjU2XG4gICAgICAgIGRhdGFbMl0gPSBhdmNjbGVuZ3RoICUgMjU2XG4gICAgICAgIGF2Y2NsZW5ndGggPSAoYXZjY2xlbmd0aCAtIGRhdGFbMl0pIC8gMjU2XG4gICAgICAgIGRhdGFbMV0gPSBhdmNjbGVuZ3RoICUgMjU2XG4gICAgICAgIGRhdGFbMF0gPSAoYXZjY2xlbmd0aCAtIGRhdGFbMV0pIC8gMjU2XG4gICAgICB9XG5cbiAgICAgIGNodW5rLmRhdGEgPSBkYXRhXG4gICAgICAvLyBJZiBpdCBpcyBBVkMgc2VxdWVjZSBIZWFkZXIuXG4gICAgICBpZiAoY2h1bmsuYXZjUGFja2V0VHlwZSA9PT0gMCkge1xuICAgICAgICB0aGlzLl9hdmNTZXF1ZW5jZUhlYWRlclBhcnNlcihjaHVuay5kYXRhKVxuICAgICAgICBsZXQgdmFsaWRhdGUgPSB0aGlzLl9kYXRhc2l6ZVZhbGlkYXRvcihjaHVuay5kYXRhc2l6ZSlcbiAgICAgICAgaWYgKHZhbGlkYXRlKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX2hhc1NjcmlwdCAmJiAhdGhpcy5faGFzVmlkZW9TZXF1ZW5jZSkge1xuICAgICAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICd2aWRlbycpXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9oYXNTY3JpcHQgJiYgdGhpcy5faGFzVmlkZW9TZXF1ZW5jZSkge1xuICAgICAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICdhdWRpbycpXG4gICAgICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLlZJREVPX01FVEFEQVRBX0NIQU5HRSlcbiAgICAgICAgICAgIC8vIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAndmlkZW8nKVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9oYXNWaWRlb1NlcXVlbmNlID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21ldGFDaGFuZ2UgPSB0cnVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIXRoaXMuX2RhdGFzaXplVmFsaWRhdG9yKGNodW5rLmRhdGFzaXplKSkge1xuICAgICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIHRoaXMuVEFHLCBuZXcgRXJyb3IoYGludmFsaWQgdmlkZW8gdGFnIGRhdGFzaXplOiAke2NodW5rLmRhdGFzaXplfWApLCBmYWxzZSlcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX21ldGFDaGFuZ2UpIHtcbiAgICAgICAgICBjaHVuay5vcHRpb25zID0ge1xuICAgICAgICAgICAgbWV0YTogT2JqZWN0LmFzc2lnbih7fSwgdGhpcy50cmFja3MudmlkZW9UcmFjay5tZXRhKVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9tZXRhQ2hhbmdlID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRyYWNrcy52aWRlb1RyYWNrLnNhbXBsZXMucHVzaChjaHVuaylcbiAgICAgICAgLy8gdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9DT01QTEVURSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgdGhpcy5UQUcsIG5ldyBFcnJvcihgdmlkZW8gY29kZWlkIGlzICR7Y29kZWNJRH1gKSwgZmFsc2UpXG4gICAgICBjaHVuay5kYXRhID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoY2h1bmsuZGF0YXNpemUgLSAxKVxuICAgICAgaWYgKCF0aGlzLl9kYXRhc2l6ZVZhbGlkYXRvcihjaHVuay5kYXRhc2l6ZSkpIHtcbiAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgdGhpcy5UQUcsIG5ldyBFcnJvcihgaW52YWxpZCB2aWRlbyB0YWcgZGF0YXNpemU6ICR7Y2h1bmsuZGF0YXNpemV9YCksIGZhbHNlKVxuICAgICAgfVxuICAgICAgdGhpcy50cmFja3MudmlkZW9UcmFjay5zYW1wbGVzLnB1c2goY2h1bmspXG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0NPTVBMRVRFKVxuICAgIH1cbiAgICBkZWxldGUgY2h1bmsudGFnVHlwZVxuICB9XG5cbiAgLyoqXG4gICAqIHBhcnNlIGF2YyBtZXRhZGF0YVxuICAgKiBAcGFyYW0gZGF0YVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2F2Y1NlcXVlbmNlSGVhZGVyUGFyc2VyIChkYXRhKSB7XG4gICAgbGV0IHRyYWNrID0gdGhpcy50cmFja3MudmlkZW9UcmFja1xuXG4gICAgaWYgKCF0cmFjaykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IG9mZnNldCA9IDBcblxuICAgIGlmICghdHJhY2subWV0YSkge1xuICAgICAgdHJhY2subWV0YSA9IG5ldyBWaWRlb1RyYWNrTWV0YSgpXG4gICAgfVxuICAgIGxldCBtZXRhID0gdHJhY2subWV0YVxuXG4gICAgbWV0YS5jb25maWd1cmF0aW9uVmVyc2lvbiA9IGRhdGFbMF1cbiAgICBtZXRhLmF2Y1Byb2ZpbGVJbmRpY2F0aW9uID0gZGF0YVsxXVxuICAgIG1ldGEucHJvZmlsZUNvbXBhdGliaWxpdHkgPSBkYXRhWzJdXG4gICAgbWV0YS5hdmNMZXZlbEluZGljYXRpb24gPSBkYXRhWzNdIC8gMTBcbiAgICBtZXRhLm5hbFVuaXRMZW5ndGggPSAoZGF0YVs0XSAmIDB4MDMpICsgMVxuXG4gICAgbGV0IG51bU9mU3BzID0gZGF0YVs1XSAmIDB4MWZcbiAgICBvZmZzZXQgPSA2XG4gICAgbGV0IGNvbmZpZyA9IHt9XG5cbiAgICAvLyBwYXJzZSBTUFNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bU9mU3BzOyBpKyspIHtcbiAgICAgIGxldCBzaXplID0gZGF0YVtvZmZzZXRdICogMjU1ICsgZGF0YVtvZmZzZXQgKyAxXVxuICAgICAgb2Zmc2V0ICs9IDJcblxuICAgICAgbGV0IHNwcyA9IG5ldyBVaW50OEFycmF5KHNpemUpXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNpemU7IGorKykge1xuICAgICAgICBzcHNbal0gPSBkYXRhW29mZnNldCArIGpdXG4gICAgICB9XG5cbiAgICAgIC8vIGNvZGVjIHN0cmluZ1xuICAgICAgbGV0IGNvZGVjU3RyaW5nID0gJ2F2YzEuJ1xuICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCA0OyBqKyspIHtcbiAgICAgICAgbGV0IGggPSBzcHNbal0udG9TdHJpbmcoMTYpXG4gICAgICAgIGlmIChoLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICBoID0gJzAnICsgaFxuICAgICAgICB9XG4gICAgICAgIGNvZGVjU3RyaW5nICs9IGhcbiAgICAgIH1cblxuICAgICAgbWV0YS5jb2RlYyA9IGNvZGVjU3RyaW5nXG5cbiAgICAgIG9mZnNldCArPSBzaXplXG4gICAgICB0aGlzLnRyYWNrcy52aWRlb1RyYWNrLm1ldGEuc3BzID0gc3BzXG4gICAgICBjb25maWcgPSBTcHNQYXJzZXIucGFyc2VTUFMoc3BzKVxuICAgIH1cblxuICAgIGxldCBudW1PZlBwcyA9IGRhdGFbb2Zmc2V0XVxuXG4gICAgb2Zmc2V0KytcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtT2ZQcHM7IGkrKykge1xuICAgICAgbGV0IHNpemUgPSBkYXRhW29mZnNldF0gKiAyNTUgKyBkYXRhW29mZnNldCArIDFdXG4gICAgICBvZmZzZXQgKz0gMlxuICAgICAgbGV0IHBwcyA9IG5ldyBVaW50OEFycmF5KHNpemUpXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNpemU7IGorKykge1xuICAgICAgICBwcHNbal0gPSBkYXRhW29mZnNldCArIGpdXG4gICAgICB9XG4gICAgICBvZmZzZXQgKz0gc2l6ZVxuICAgICAgdGhpcy50cmFja3MudmlkZW9UcmFjay5tZXRhLnBwcyA9IHBwc1xuICAgIH1cblxuICAgIE9iamVjdC5hc3NpZ24obWV0YSwgU3BzUGFyc2VyLnRvVmlkZW9NZXRhKGNvbmZpZykpXG5cbiAgICAvLyBmaWxsIHZpZGVvIG1lZGlhIGluZm9cbiAgICBjb25zdCB2aWRlb01lZGlhID0gdGhpcy5fY29udGV4dC5tZWRpYUluZm8udmlkZW9cblxuICAgIHZpZGVvTWVkaWEuY29kZWMgPSBtZXRhLmNvZGVjXG4gICAgdmlkZW9NZWRpYS5wcm9maWxlID0gbWV0YS5wcm9maWxlXG4gICAgdmlkZW9NZWRpYS5sZXZlbCA9IG1ldGEubGV2ZWxcbiAgICB2aWRlb01lZGlhLmNocm9tYUZvcm1hdCA9IG1ldGEuY2hyb21hRm9ybWF0XG4gICAgdmlkZW9NZWRpYS5mcmFtZVJhdGUgPSBtZXRhLmZyYW1lUmF0ZVxuICAgIHZpZGVvTWVkaWEucGFyUmF0aW8gPSBtZXRhLnBhclJhdGlvXG4gICAgdmlkZW9NZWRpYS53aWR0aCA9IHZpZGVvTWVkaWEud2lkdGggPT09IG1ldGEucHJlc2VudFdpZHRoID8gdmlkZW9NZWRpYS53aWR0aCA6IG1ldGEucHJlc2VudFdpZHRoXG4gICAgdmlkZW9NZWRpYS5oZWlnaHQgPSB2aWRlb01lZGlhLmhlaWdodCA9PT0gbWV0YS5wcmVzZW50SGVpZ2h0ID8gdmlkZW9NZWRpYS53aWR0aCA6IG1ldGEucHJlc2VudEhlaWdodFxuXG4gICAgbWV0YS5kdXJhdGlvbiA9IHRoaXMuX2NvbnRleHQubWVkaWFJbmZvLmR1cmF0aW9uICogbWV0YS50aW1lc2NhbGVcbiAgICBtZXRhLmF2Y2MgPSBuZXcgVWludDhBcnJheShkYXRhLmxlbmd0aClcbiAgICBtZXRhLmF2Y2Muc2V0KGRhdGEpXG4gICAgdHJhY2subWV0YSA9IG1ldGFcbiAgfVxuXG4gIC8qKlxuICAgKiBjaG9vc2UgYXVkaW8gc2FtcGxlIHJhdGVcbiAgICogQHBhcmFtIHNhbXBsaW5nRnJlcXVlbmN5SW5kZXhcbiAgICogQHJldHVybnMge251bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zd2l0Y2hBdWRpb1NhbXBsZVJhdGUgKHNhbXBsaW5nRnJlcXVlbmN5SW5kZXgpIHtcbiAgICBsZXQgc2FtcGxpbmdGcmVxdWVuY3lMaXN0ID0gWzk2MDAwLCA4ODIwMCwgNjQwMDAsIDQ4MDAwLCA0NDEwMCwgMzIwMDAsIDI0MDAwLCAyMjA1MCwgMTYwMDAsIDEyMDAwLCAxMTAyNSwgODAwMCwgNzM1MF1cbiAgICByZXR1cm4gc2FtcGxpbmdGcmVxdWVuY3lMaXN0W3NhbXBsaW5nRnJlcXVlbmN5SW5kZXhdXG4gIH1cblxuICAvKipcbiAgICogY2hvb3NlIGF1ZGlvIHNhbXBsaW5nIGZyZXF1ZW5jZVxuICAgKiBAcGFyYW0gaW5mb1xuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3N3aXRjaEF1ZGlvU2FtcGxpbmdGcmVxdWVuY3kgKGluZm8pIHtcbiAgICBsZXQgc2FtcGxpbmdGcmVxdWVuY3lJbmRleCA9IChpbmZvICYgMTIpID4+PiAyXG4gICAgbGV0IHNhbXBsaW5nRnJlcXVlbmN5TGlzdCA9IFs1NTAwLCAxMTAyNSwgMjIwNTAsIDQ0MTAwLCA0ODAwMF1cbiAgICByZXR1cm4gc2FtcGxpbmdGcmVxdWVuY3lMaXN0W3NhbXBsaW5nRnJlcXVlbmN5SW5kZXhdXG4gIH1cblxuICAvKipcbiAgICogY2hvb3NlIGF1ZGlvIGNoYW5uZWwgY291bnRcbiAgICogQHBhcmFtIGluZm9cbiAgICogQHJldHVybnMge251bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zd2l0Y2hBdWRpb0NoYW5uZWwgKGluZm8pIHtcbiAgICBsZXQgc2FtcGxlVHJhY2tOdW1JbmRleCA9IGluZm8gJiAxXG4gICAgbGV0IHNhbXBsZVRyYWNrTnVtTGlzdCA9IFsxLCAyXVxuICAgIHJldHVybiBzYW1wbGVUcmFja051bUxpc3Rbc2FtcGxlVHJhY2tOdW1JbmRleF1cbiAgfVxuXG4gIC8qKlxuICAgKiBjaGVjayBkYXRhc2l6ZSBpcyB2YWxpZCB1c2UgNCBCeXRlIGFmdGVyIGN1cnJlbnQgdGFnXG4gICAqIEBwYXJhbSBkYXRhc2l6ZVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9kYXRhc2l6ZVZhbGlkYXRvciAoZGF0YXNpemUpIHtcbiAgICBsZXQgZGF0YXNpemVDb25maXJtID0gdGhpcy5sb2FkZXJCdWZmZXIudG9JbnQoMCwgNClcbiAgICB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCg0KVxuICAgIHJldHVybiBkYXRhc2l6ZUNvbmZpcm0gPT09IGRhdGFzaXplICsgMTFcbiAgfVxuXG4gIGdldCBsb2FkZXJCdWZmZXIgKCkge1xuICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ0xPQURFUl9CVUZGRVInKVxuICAgIGlmIChidWZmZXIpIHtcbiAgICAgIHJldHVybiBidWZmZXJcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgbmV3IEVycm9yKCfmib7kuI3liLAgbG9hZGVyQnVmZmVyIOWunuS+iycpKVxuICAgIH1cbiAgfVxuXG4gIGdldCB0cmFja3MgKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKVxuICB9XG5cbiAgZ2V0IGxvZ2dlciAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ0xPR0dFUicpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRmx2RGVtdXhlclxuIiwiLyoqXG4gKiBSZWZlcmVuY2U6IGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM4MjE2I3NlY3Rpb24tNC4zXG4gKi9cbmNsYXNzIE0zVThQYXJzZXIge1xuICBzdGF0aWMgcGFyc2UgKHRleHQsIGJhc2V1cmwgPSAnJykge1xuICAgIGxldCByZXQgPSB7XG4gICAgICBkdXJhdGlvbjogMFxuICAgIH07XG4gICAgaWYgKCF0ZXh0IHx8ICF0ZXh0LnNwbGl0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCByZWZzID0gdGV4dC5zcGxpdCgvXFxyfFxcbi8pO1xuICAgIHJlZnMgPSByZWZzLmZpbHRlcigocmVmKSA9PiB7XG4gICAgICByZXR1cm4gcmVmO1xuICAgIH0pXG4gICAgbGV0IHJlZiA9IHJlZnMuc2hpZnQoKVxuICAgIGlmICghcmVmLm1hdGNoKCcjRVhUTTNVJykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBtM3U4IGZpbGU6IG5vdCBcIiNFWFRNM1VcImApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJlZiA9IHJlZnMuc2hpZnQoKVxuICAgIHdoaWxlIChyZWYpIHtcbiAgICAgIGxldCByZWZtID0gcmVmLm1hdGNoKC8jKC5bQS1afC1dKik6KC4qKS8pO1xuICAgICAgbGV0IHJlZmQgPSByZWYubWF0Y2goLyMoLltBLVp8LV0qKS8pO1xuICAgICAgaWYgKHJlZmQgJiYgcmVmbSAmJiByZWZtLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgc3dpdGNoIChyZWZtWzFdKSB7XG4gICAgICAgICAgY2FzZSAnRVhULVgtVkVSU0lPTic6XG4gICAgICAgICAgICByZXQudmVyc2lvbiA9IHBhcnNlSW50KHJlZm1bMl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnRVhULVgtTUVESUEtU0VRVUVOQ0UnOlxuICAgICAgICAgICAgcmV0LnNlcXVlbmNlID0gcGFyc2VJbnQocmVmbVsyXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdFWFQtWC1UQVJHRVREVVJBVElPTic6XG4gICAgICAgICAgICByZXQudGFyZ2V0ZHVyYXRpb24gPSBwYXJzZUZsb2F0KHJlZm1bMl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnRVhUSU5GJzpcbiAgICAgICAgICAgIE0zVThQYXJzZXIucGFyc2VGcmFnKHJlZm0sIHJlZnMsIHJldCwgYmFzZXVybCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdFWFQtWC1LRVknOlxuICAgICAgICAgICAgTTNVOFBhcnNlci5wYXJzZURlY3J5cHQocmVmbVsyXSxyZXQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9IGlmKHJlZmQgJiYgcmVmZC5sZW5ndGggPiAxKSB7XG4gICAgICAgIHN3aXRjaChyZWZkWzFdKSB7XG4gICAgICAgICAgY2FzZSAnRVhULVgtRElTQ09OVElOVUlUWSc6XG4gICAgICAgICAgICByZWYgPSByZWZzLnNoaWZ0KCk7XG4gICAgICAgICAgICBsZXQgcmVmbSA9IHJlZi5tYXRjaCgvIyguW0EtWnwtXSopOiguKikvKTtcbiAgICAgICAgICAgIGlmKHJlZm0ubGVuZ3RoID4yICYmIHJlZm1bMV0gPT09ICdFWFRJTkYnKSB7XG4gICAgICAgICAgICAgIE0zVThQYXJzZXIucGFyc2VGcmFnKHJlZm0sIHJlZnMsIHJldCwgYmFzZXVybCwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlZiA9IHJlZnMuc2hpZnQoKVxuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgc3RhdGljIHBhcnNlRnJhZyAocmVmbSwgcmVmcywgcmV0LCBiYXNldXJsLCBkaXNjb250aW51ZSkge1xuICAgIGlmICghcmV0LmZyYWdzKSB7XG4gICAgICByZXQuZnJhZ3MgPSBbXVxuICAgIH1cblxuICAgIGxldCBmcmVnID0ge1xuICAgICAgc3RhcnQ6IHJldC5kdXJhdGlvbixcbiAgICAgIGR1cmF0aW9uOiBwYXJzZUZsb2F0KHJlZm1bMl0pICogMTAwMFxuICAgIH1cblxuICAgIHJldC5kdXJhdGlvbiArPSBmcmVnLmR1cmF0aW9uO1xuICAgIGxldCBuZXh0bGluZSA9IHJlZnMuc2hpZnQoKTtcbiAgICBpZiAobmV4dGxpbmUubWF0Y2goLyMoLiopOiguKikvKSkge1xuICAgICAgbmV4dGxpbmUgPSByZWZzLnNoaWZ0KCk7XG4gICAgfVxuICAgIGlmIChuZXh0bGluZS5sZW5ndGggPiAwICYmIG5leHRsaW5lLmNoYXJBdCgwKSA9PT0gJy8nICYmIGJhc2V1cmwubWF0Y2goLy4qXFwvXFwvLipcXC5cXHcrL2cpKSB7XG4gICAgICBiYXNldXJsID0gYmFzZXVybC5tYXRjaCgvLipcXC9cXC8uKlxcLlxcdysvZylbMF07XG4gICAgfVxuICAgIGlmIChuZXh0bGluZS5tYXRjaCgvLio6XFwvXFwvLiovKSkge1xuICAgICAgZnJlZy51cmwgPSBuZXh0bGluZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnJlZy51cmwgPSBiYXNldXJsICsgbmV4dGxpbmU7XG4gICAgfVxuICAgIGZyZWcuZGlzY29udGludWUgPSBkaXNjb250aW51ZTtcbiAgICByZXQuZnJhZ3MucHVzaChmcmVnKTtcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZVVSTCAodXJsKSB7XG4gICAgbGV0IGJhc2V1cmwgPSAnJztcbiAgICBsZXQgdXJscyA9IHVybC5tYXRjaCgvKC4qXFwvKS4qXFwubTN1OC8pO1xuICAgIGlmICh1cmxzICYmIHVybHMubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB1cmxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh1cmxzW2ldLm1hdGNoKC8uKlxcLyQvZykgJiYgdXJsc1tpXS5sZW5ndGggPiBiYXNldXJsLmxlbmd0aCkge1xuICAgICAgICAgIGJhc2V1cmwgPSB1cmxzW2ldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBiYXNldXJsO1xuICB9XG5cbiAgc3RhdGljIHBhcnNlRGVjcnlwdChyZWZtLCByZXQpIHtcbiAgICByZXQuZW5jcnlwdCA9IHt9O1xuICAgIGxldCByZWZzID0gcmVmbS5zcGxpdCgnLCcpO1xuICAgIGZvciAobGV0IGkgaW4gcmVmcykgeyBcbiAgICAgIGxldCBjbWQgPSByZWZzW2ldO1xuICAgICAgaWYoY21kLm1hdGNoKC9NRVRIT0Q9KC4qKS8pKSB7XG4gICAgICAgIHJldC5lbmNyeXB0Lm1ldGhvZCA9IGNtZC5tYXRjaCgvTUVUSE9EPSguKikvKVsxXTtcbiAgICAgIH1cbiAgICAgIGlmKGNtZC5tYXRjaCgvVVJJPVwiKC4qKVwiLykpIHtcbiAgICAgICAgcmV0LmVuY3J5cHQudXJpID0gY21kLm1hdGNoKC9VUkk9XCIoLiopXCIvKVsxXTtcbiAgICAgIH1cblxuICAgICAgaWYoY21kLm1hdGNoKC9JVj0weCguKikvKSkge1xuICAgICAgICBsZXQgaXYgPSBjbWQubWF0Y2goL0lWPTB4KC4qKS8pWzFdO1xuICAgICAgICBsZXQgbGVuZ3RoID0gTWF0aC5jZWlsKGl2Lmxlbmd0aCAvIDIpO1xuICAgICAgICByZXQuZW5jcnlwdC5pdmIgPSBuZXcgVWludDhBcnJheShsZW5ndGgpO1xuICAgICAgICBmb3IobGV0IGkgPSBsZW5ndGggLSAxOyBpID49MDsgaS0tKSB7XG4gICAgICAgICAgbGV0IGltID0gcGFyc2VJbnQoaXYuc3Vic3RyKGkgKiAyLCAyKSwgMTYpO1xuICAgICAgICAgIHJldC5lbmNyeXB0Lml2YltpXSA9IGltO1xuICAgICAgICB9IFxuICAgICAgICByZXQuZW5jcnlwdC5pdiA9IGl2O1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTTNVOFBhcnNlcjtcbiIsImltcG9ydCB7IE5hbHVuaXQgfSBmcm9tICd4Z3BsYXllci1jb2RlYyc7XG5pbXBvcnQgeyBBdWRpb1RyYWNrLCBWaWRlb1RyYWNrIH0gZnJvbSAneGdwbGF5ZXItYnVmZmVyJztcbmltcG9ydCB7XG4gIEF1ZGlvVHJhY2tNZXRhLFxuICBWaWRlb1RyYWNrTWV0YSxcbiAgQXVkaW9UcmFja1NhbXBsZSxcbiAgVmlkZW9UcmFja1NhbXBsZSxcbiAgRVZFTlRTLFxuICBTdHJlYW1cbn0gZnJvbSAneGdwbGF5ZXItdXRpbHMnO1xuXG5jb25zdCBERU1VWF9FVkVOVFMgPSBFVkVOVFMuREVNVVhfRVZFTlRTO1xuY29uc3QgU3RyZWFtVHlwZSA9IHtcbiAgMHgwMTogWyd2aWRlbycsICdNUEVHLTEnXSxcbiAgMHgwMjogWyd2aWRlbycsICdNUEVHLTInXSxcbiAgMHgxYjogWyd2aWRlbycsICdBVkMuSDI2NCddLFxuICAweGVhOiBbJ3ZpZGVvJywgJ1ZDLTEnXSxcbiAgMHgwMzogWydhdWRpbycsICdNUEVHLTEnXSxcbiAgMHgwNDogWydhdWRpbycsICdNUEVHLTInXSxcbiAgMHgwZjogWydhdWRpbycsICdNUEVHLTIuQUFDJ10sXG4gIDB4MTE6IFsnYXVkaW8nLCAnTVBFRy00LkFBQyddLFxuICAweDgwOiBbJ2F1ZGlvJywgJ0xQQ00nXSxcbiAgMHg4MTogWydhdWRpbycsICdBQzMnXSxcbiAgMHgwNjogWydhdWRpbycsICdBQzMnXSxcbiAgMHg4MjogWydhdWRpbycsICdEVFMnXSxcbiAgMHg4MzogWydhdWRpbycsICdEb2xieSBUcnVlSEQnXSxcbiAgMHg4NDogWydhdWRpbycsICdBQzMtUGx1cyddLFxuICAweDg1OiBbJ2F1ZGlvJywgJ0RUUy1IRCddLFxuICAweDg2OiBbJ2F1ZGlvJywgJ0RUUy1NQSddLFxuICAweGExOiBbJ2F1ZGlvJywgJ0FDMy1QbHVzLVNFQyddLFxuICAweGEyOiBbJ2F1ZGlvJywgJ0RUUy1IRC1TRUMnXVxufTtcblxuY2xhc3MgVHNEZW11eGVyIHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZ3MpIHtcbiAgICB0aGlzLmNvbmZpZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWdzKTtcbiAgICB0aGlzLmRlbXV4aW5nID0gZmFsc2U7XG4gICAgdGhpcy5wYXQgPSBbXTtcbiAgICB0aGlzLnBtdCA9IFtdO1xuICAgIHRoaXMuX2hhc1ZpZGVvTWV0YSA9IGZhbHNlO1xuICAgIHRoaXMuX2hhc0F1ZGlvTWV0YSA9IGZhbHNlO1xuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgdGhpcy5vbihERU1VWF9FVkVOVFMuREVNVVhfU1RBUlQsIHRoaXMuZGVtdXguYmluZCh0aGlzKSlcbiAgfVxuXG4gIGRlbXV4IChmcmFnKSB7XG4gICAgaWYgKHRoaXMuZGVtdXhpbmcpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBidWZmZXIgPSB0aGlzLmlucHV0QnVmZmVyO1xuICAgIGxldCBmcmFncyA9IHsgcGF0OiBbXSwgcG10OiBbXSB9O1xuICAgIGxldCBwZXNlcyA9IHt9O1xuXG4gICAgLy8gUmVhZCBUUyBzZWdtZW50XG4gICAgd2hpbGUgKGJ1ZmZlci5sZW5ndGggPj0gMTg4KSB7XG4gICAgICBpZiAoYnVmZmVyLmxlbmd0aCA+PSAxICYmIGJ1ZmZlci5hcnJheVswXVtidWZmZXIub2Zmc2V0XSAhPT0gNzEpIHtcbiAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgdGhpcy5UQUcsIG5ldyBFcnJvcihgVW50cnVzdCBzeW5jIGNvZGU6ICR7YnVmZmVyLmFycmF5WzBdW2J1ZmZlci5vZmZzZXRdfSwgdHJ5IHRvIHJlY292ZXI7YCksIGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChidWZmZXIubGVuZ3RoID49IDEgJiYgYnVmZmVyLmFycmF5WzBdW2J1ZmZlci5vZmZzZXRdICE9PSA3MSkge1xuICAgICAgICBidWZmZXIuc2hpZnQoMSk7XG4gICAgICB9XG4gICAgICBsZXQgYnVmID0gYnVmZmVyLnNoaWZ0KDE4OCk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhidWYpO1xuICAgICAgbGV0IHRzU3RyZWFtID0gbmV3IFN0cmVhbShidWYuYnVmZmVyKTtcbiAgICAgIGxldCB0cyA9IHt9O1xuICAgICAgVHNEZW11eGVyLnJlYWQodHNTdHJlYW0sIHRzLCBmcmFncyk7XG4gICAgICBpZiAodHMucGVzKSB7XG4gICAgICAgIGlmICghcGVzZXNbdHMuaGVhZGVyLnBpZF0pIHtcbiAgICAgICAgICBwZXNlc1t0cy5oZWFkZXIucGlkXSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHBlc2VzW3RzLmhlYWRlci5waWRdLnB1c2godHMucGVzKTtcbiAgICAgICAgdHMucGVzLkVTLmJ1ZmZlciA9IFt0cy5wZXMuRVMuYnVmZmVyXTtcbiAgICAgIH0gZWxzZSBpZiAocGVzZXNbdHMuaGVhZGVyLnBpZF0pIHtcbiAgICAgICAgcGVzZXNbdHMuaGVhZGVyLnBpZF1bcGVzZXNbdHMuaGVhZGVyLnBpZF0ubGVuZ3RoIC0gMV0uRVMuYnVmZmVyLnB1c2godHMucGF5bG9hZC5zdHJlYW0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBBdWRpb09wdGlvbnMgPSBmcmFnO1xuICAgIGxldCBWaWRlb09wdGlvbnMgPSBmcmFnO1xuXG4gICAgLy8gR2V0IEZyYW1lcyBkYXRhXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBPYmplY3Qua2V5cyhwZXNlcykubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBlcGVzZXMgPSBwZXNlc1tPYmplY3Qua2V5cyhwZXNlcylbaV1dO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBlcGVzZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZXBlc2VzW2pdLmlkID0gT2JqZWN0LmtleXMocGVzZXMpW2ldO1xuICAgICAgICBlcGVzZXNbal0uRVMuYnVmZmVyID0gVHNEZW11eGVyLk1lcmdlKGVwZXNlc1tqXS5FUy5idWZmZXIpO1xuICAgICAgICBpZiAoZXBlc2VzW2pdLnR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgICAgICB0aGlzLnB1c2hBdWRpb1NhbXBsZShlcGVzZXNbal0sIEF1ZGlvT3B0aW9ucyk7XG4gICAgICAgICAgQXVkaW9PcHRpb25zID0ge307XG4gICAgICAgIH0gZWxzZSBpZiAoZXBlc2VzW2pdLnR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgICAgICB0aGlzLnB1c2hWaWRlb1NhbXBsZShlcGVzZXNbal0sIFZpZGVvT3B0aW9ucyk7XG4gICAgICAgICAgVmlkZW9PcHRpb25zID0ge307XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5faGFzQXVkaW9NZXRhKSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0NPTVBMRVRFLCAnYXVkaW8nKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2hhc1ZpZGVvTWV0YSkge1xuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9DT01QTEVURSwgJ3ZpZGVvJyk7XG4gICAgfVxuICB9XG5cbiAgcHVzaEF1ZGlvU2FtcGxlIChwZXMsIG9wdGlvbnMpIHtcbiAgICBsZXQgdHJhY2s7XG4gICAgaWYgKCF0aGlzLl90cmFja3MuYXVkaW9UcmFjaykge1xuICAgICAgdGhpcy5fdHJhY2tzLmF1ZGlvVHJhY2sgPSBuZXcgQXVkaW9UcmFjaygpO1xuICAgICAgdHJhY2sgPSB0aGlzLl90cmFja3MuYXVkaW9UcmFjaztcbiAgICB9IGVsc2Uge1xuICAgICAgdHJhY2sgPSB0aGlzLl90cmFja3MuYXVkaW9UcmFjaztcbiAgICB9XG4gICAgbGV0IG1ldGEgPSBuZXcgQXVkaW9UcmFja01ldGEoe1xuICAgICAgYXVkaW9TYW1wbGVSYXRlOiBwZXMuRVMuZnJlcXVlbmNlLFxuICAgICAgc2FtcGxlUmF0ZTogcGVzLkVTLmZyZXF1ZW5jZSxcbiAgICAgIGNoYW5uZWxDb3VudDogcGVzLkVTLmNoYW5uZWwsXG4gICAgICBjb2RlYzogJ21wNGEuNDAuJyArIHBlcy5FUy5hdWRpb09iamVjdFR5cGUsXG4gICAgICBjb25maWc6IHBlcy5FUy5hdWRpb0NvbmZpZyxcbiAgICAgIGlkOiAyLFxuICAgICAgc2FtcGxlUmF0ZUluZGV4OiBwZXMuRVMuZnJlcXVlbmN5SW5kZXhcbiAgICB9KTtcbiAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uID0gTWF0aC5mbG9vcigxMDI0IC8gbWV0YS5hdWRpb1NhbXBsZVJhdGUgKiBtZXRhLnRpbWVzY2FsZSk7XG5cbiAgICBsZXQgbWV0YUVxdWFsID0gVHNEZW11eGVyLmNvbXBhaXJlTWV0YSh0cmFjay5tZXRhLCBtZXRhLCB0cnVlKTtcblxuICAgIGlmICghdGhpcy5faGFzQXVkaW9NZXRhIHx8ICFtZXRhRXF1YWwpIHtcbiAgICAgIHRyYWNrLm1ldGEgPSBtZXRhO1xuICAgICAgdGhpcy5faGFzQXVkaW9NZXRhID0gdHJ1ZVxuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICdhdWRpbycpO1xuICAgIH1cblxuICAgIGxldCBkYXRhID0gbmV3IFVpbnQ4QXJyYXkocGVzLkVTLmJ1ZmZlci5idWZmZXIuc2xpY2UocGVzLkVTLmJ1ZmZlci5wb3NpdGlvbiwgcGVzLkVTLmJ1ZmZlci5sZW5ndGgpKTtcbiAgICBsZXQgZHRzID0gcGFyc2VJbnQocGVzLnB0cyAvIDkwKTtcbiAgICBsZXQgcHRzID0gcGFyc2VJbnQocGVzLnB0cyAvIDkwKTtcbiAgICBsZXQgc2FtcGxlID0gbmV3IEF1ZGlvVHJhY2tTYW1wbGUoe2R0cywgcHRzLCBkYXRhLCBvcHRpb25zfSk7XG4gICAgdHJhY2suc2FtcGxlcy5wdXNoKHNhbXBsZSk7XG4gIH1cblxuICBwdXNoVmlkZW9TYW1wbGUgKHBlcywgb3B0aW9ucykge1xuICAgIGxldCBuYWxzID0gTmFsdW5pdC5nZXROYWx1bml0cyhwZXMuRVMuYnVmZmVyKTtcbiAgICBsZXQgdHJhY2s7XG4gICAgbGV0IG1ldGEgPSBuZXcgVmlkZW9UcmFja01ldGEoKTtcbiAgICBpZiAoIXRoaXMuX3RyYWNrcy52aWRlb1RyYWNrKSB7XG4gICAgICB0aGlzLl90cmFja3MudmlkZW9UcmFjayA9IG5ldyBWaWRlb1RyYWNrKCk7XG4gICAgICB0cmFjayA9IHRoaXMuX3RyYWNrcy52aWRlb1RyYWNrO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cmFjayA9IHRoaXMuX3RyYWNrcy52aWRlb1RyYWNrO1xuICAgIH1cbiAgICBsZXQgc2FtcGxlTGVuZ3RoID0gMDtcbiAgICBsZXQgc3BzID0gZmFsc2U7XG4gICAgbGV0IHBwcyA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmFscy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IG5hbCA9IG5hbHNbaV07XG4gICAgICBpZiAobmFsLnNwcykge1xuICAgICAgICBzcHMgPSBuYWw7XG4gICAgICAgIHRyYWNrLnNwcyA9IG5hbC5ib2R5O1xuICAgICAgICBtZXRhLmNocm9tYUZvcm1hdCA9IHNwcy5zcHMuY2hyb21hX2Zvcm1hdFxuICAgICAgICBtZXRhLmNvZGVjID0gJ2F2YzEuJztcbiAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCA0OyBqKyspIHtcbiAgICAgICAgICB2YXIgaCA9IHNwcy5ib2R5W2pdLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgICBpZiAoaC5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICBoID0gJzAnICsgaDtcbiAgICAgICAgICB9XG4gICAgICAgICAgbWV0YS5jb2RlYyArPSBoO1xuICAgICAgICB9XG4gICAgICAgIG1ldGEuY29kZWNIZWlnaHQgPSBzcHMuc3BzLmNvZGVjX3NpemUuaGVpZ2h0O1xuICAgICAgICBtZXRhLmNvZGVjV2lkdGggPSBzcHMuc3BzLmNvZGVjX3NpemUud2lkdGg7XG4gICAgICAgIG1ldGEuZnJhbWVSYXRlID0gc3BzLnNwcy5mcmFtZV9yYXRlO1xuICAgICAgICBtZXRhLmlkID0gMTtcbiAgICAgICAgbWV0YS5sZXZlbCA9IHNwcy5zcHMubGV2ZWxfc3RyaW5nO1xuICAgICAgICBtZXRhLnByZXNlbnRIZWlnaHQgPSBzcHMuc3BzLnByZXNlbnRfc2l6ZS5oZWlnaHQ7XG4gICAgICAgIG1ldGEucHJlc2VudFdpZHRoID0gc3BzLnNwcy5wcmVzZW50X3NpemUud2lkdGg7XG4gICAgICAgIG1ldGEucHJvZmlsZSA9IHNwcy5zcHMucHJvZmlsZV9zdHJpbmc7XG4gICAgICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb24gPSBNYXRoLmZsb29yKG1ldGEudGltZXNjYWxlICogKHNwcy5zcHMuZnJhbWVfcmF0ZS5mcHNfZGVuIC8gc3BzLnNwcy5mcmFtZV9yYXRlLmZwc19udW0pKTtcbiAgICAgICAgbWV0YS5zYXJSYXRpbyA9IHNwcy5zcHMuc2FyX3JhdGlvID8gc3BzLnNwcy5zYXJfcmF0aW8gOiBzcHMuc3BzLnBhcl9yYXRpbztcbiAgICAgIH0gZWxzZSBpZiAobmFsLnBwcykge1xuICAgICAgICB0cmFjay5wcHMgPSBuYWwuYm9keTtcbiAgICAgICAgcHBzID0gbmFsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2FtcGxlTGVuZ3RoICs9ICg0ICsgbmFsLmJvZHkuYnl0ZUxlbmd0aCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHNwcyAmJiBwcHMpIHtcbiAgICAgIG1ldGEuYXZjYyA9IE5hbHVuaXQuZ2V0QXZjYyhzcHMuYm9keSwgcHBzLmJvZHkpO1xuICAgICAgbGV0IG1ldGFFcXVhbCA9IFRzRGVtdXhlci5jb21wYWlyZU1ldGEodHJhY2subWV0YSwgbWV0YSwgdHJ1ZSk7XG4gICAgICBpZiAoIXRoaXMuX2hhc1ZpZGVvTWV0YSB8fCAhbWV0YUVxdWFsKSB7XG4gICAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgb3B0aW9ucy5tZXRhID0gT2JqZWN0LmFzc2lnbih7fSwgbWV0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIG1ldGE6IE9iamVjdC5hc3NpZ24oe30sIG1ldGEpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRyYWNrLm1ldGEgPSBtZXRhO1xuICAgICAgICB0aGlzLl9oYXNWaWRlb01ldGEgPSB0cnVlXG4gICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAndmlkZW8nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgZGF0YSA9IG5ldyBVaW50OEFycmF5KHNhbXBsZUxlbmd0aCk7XG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgbGV0IGlzS2V5ZnJhbWUgPSBmYWxzZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBuYWwgPSBuYWxzW2ldO1xuICAgICAgbGV0IGxlbmd0aCA9IG5hbC5ib2R5LmJ5dGVMZW5ndGg7XG4gICAgICBpZiAobmFsLmlkcikge1xuICAgICAgICBpc0tleWZyYW1lID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICghbmFsLnBwcyAmJiAhbmFsLnNwcykge1xuICAgICAgICBkYXRhLnNldChuZXcgVWludDhBcnJheShbbGVuZ3RoID4+PiAyNCAmIDB4ZmYsXG4gICAgICAgICAgbGVuZ3RoID4+PiAxNiAmIDB4ZmYsXG4gICAgICAgICAgbGVuZ3RoID4+PiA4ICYgMHhmZixcbiAgICAgICAgICBsZW5ndGggJiAweGZmXG4gICAgICAgIF0pLCBvZmZzZXQpO1xuICAgICAgICBvZmZzZXQgKz0gNDtcbiAgICAgICAgZGF0YS5zZXQobmFsLmJvZHksIG9mZnNldCk7XG4gICAgICAgIG9mZnNldCArPSBsZW5ndGg7XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBzYW1wbGUgPSBuZXcgVmlkZW9UcmFja1NhbXBsZSh7XG4gICAgICBkdHM6IHBhcnNlSW50KHBlcy5kdHMgLyA5MCksXG4gICAgICBwdHM6IHBhcnNlSW50KHBlcy5wdHMgLyA5MCksXG4gICAgICBjdHM6IChwZXMucHRzIC0gcGVzLmR0cykgLyA5MCxcbiAgICAgIG9yaWdpbkR0czogcGVzLmR0cyxcbiAgICAgIGlzS2V5ZnJhbWUsXG4gICAgICBkYXRhLFxuICAgICAgb3B0aW9uc1xuICAgIH0pXG4gICAgdHJhY2suc2FtcGxlcy5wdXNoKHNhbXBsZSk7XG4gIH1cblxuICBkZXN0b3J5ICgpIHtcbiAgICB0aGlzLm9mZihERU1VWF9FVkVOVFMuREVNVVhfU1RBUlQsIHRoaXMuZGVtdXgpO1xuICAgIHRoaXMuY29uZmlncyA9IHt9O1xuICAgIHRoaXMuZGVtdXhpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnBhdCA9IFtdO1xuICAgIHRoaXMucG10ID0gW107XG4gICAgdGhpcy5faGFzVmlkZW9NZXRhID0gZmFsc2U7XG4gICAgdGhpcy5faGFzQXVkaW9NZXRhID0gZmFsc2U7XG4gIH1cblxuICBzdGF0aWMgY29tcGFpcmVBcnJheSAoYSwgYiwgdHlwZSkge1xuICAgIGxldCBhbCA9IDA7XG4gICAgbGV0IGJsID0gMDtcbiAgICBpZiAodHlwZSA9PT0gJ1VpbnQ4QXJyYXknKSB7XG4gICAgICBhbCA9IGEuYnl0ZUxlbmd0aDtcbiAgICAgIGJsID0gYi5ieXRlTGVuZ3RoO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ0FycmF5Jykge1xuICAgICAgYWwgPSBhLmxlbmd0aDtcbiAgICAgIGJsID0gYi5sZW5ndGg7XG4gICAgfVxuICAgIGlmIChhbCAhPT0gYmwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsOyBpKyspIHtcbiAgICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzdGF0aWMgY29tcGFpcmVNZXRhIChhLCBiLCBpZ25vcmVEdXJhdGlvbikge1xuICAgIGlmICghYSB8fCAhYikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwLCBrID0gT2JqZWN0LmtleXMoYSkubGVuZ3RoOyBpIDwgazsgaSsrKSB7XG4gICAgICBsZXQgaXRlbWEgPSBhW09iamVjdC5rZXlzKGEpW2ldXTtcbiAgICAgIGxldCBpdGVtYiA9IGJbT2JqZWN0LmtleXMoYSlbaV1dO1xuICAgICAgaWYgKHR5cGVvZiBpdGVtYSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKChpZ25vcmVEdXJhdGlvbiAmJiBPYmplY3Qua2V5cyhhKVtpXSAhPT0gJ2R1cmF0aW9uJyAmJiBPYmplY3Qua2V5cyhhKVtpXSAhPT0gJ3JlZlNhbXBsZUR1cmF0aW9uJyAmJiBPYmplY3Qua2V5cyhhKVtpXSAhPT0gJ3JlZlNhbXBsZUR1cmF0aW9uRml4ZWQnKSAmJiBpdGVtYSAhPT0gaXRlbWIpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXRlbWEuYnl0ZUxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChpdGVtYi5ieXRlTGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFUc0RlbXV4ZXIuY29tcGFpcmVBcnJheShpdGVtYSwgaXRlbWIsICdVaW50OEFycmF5JykpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXRlbWEubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGl0ZW1iLmxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghVHNEZW11eGVyLmNvbXBhaXJlQXJyYXkoaXRlbWEsIGl0ZW1iLCAnQXJyYXknKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCFUc0RlbXV4ZXIuY29tcGFpcmVNZXRhKGl0ZW1hLCBpdGVtYikpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzdGF0aWMgTWVyZ2UgKGJ1ZmZlcnMpIHtcbiAgICBsZXQgZGF0YTtcbiAgICBsZXQgbGVuZ3RoID0gMDtcbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1ZmZlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxlbmd0aCArPSAoYnVmZmVyc1tpXS5sZW5ndGggLSBidWZmZXJzW2ldLnBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBkYXRhID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1ZmZlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBidWZmZXIgPSBidWZmZXJzW2ldO1xuICAgICAgZGF0YS5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmZmVyLmJ1ZmZlciwgYnVmZmVyLnBvc2l0aW9uKSwgb2Zmc2V0KTtcbiAgICAgIG9mZnNldCArPSBidWZmZXIubGVuZ3RoIC0gYnVmZmVyLnBvc2l0aW9uO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFN0cmVhbShkYXRhLmJ1ZmZlcik7XG4gIH1cblxuICBzdGF0aWMgcmVhZCAoc3RyZWFtLCB0cywgZnJhZ3MpIHtcbiAgICBUc0RlbXV4ZXIucmVhZEhlYWRlcihzdHJlYW0sIHRzKTtcbiAgICBUc0RlbXV4ZXIucmVhZFBheWxvYWQoc3RyZWFtLCB0cywgZnJhZ3MpO1xuICAgIGlmICh0cy5oZWFkZXIucGFja2V0ID09PSAnTUVESUEnICYmIHRzLmhlYWRlci5wYXlsb2FkID09PSAxICYmICF0cy51bmtub3duUElEcykge1xuICAgICAgdHMucGVzID0gVHNEZW11eGVyLlBFUyh0cyk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHJlYWRQYXlsb2FkIChzdHJlYW0sIHRzLCBmcmFncykge1xuICAgIGxldCBoZWFkZXIgPSB0cy5oZWFkZXJcbiAgICBsZXQgcGlkID0gaGVhZGVyLnBpZDtcbiAgICBzd2l0Y2ggKHBpZCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBUc0RlbXV4ZXIuUEFUKHN0cmVhbSwgdHMsIGZyYWdzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIFRzRGVtdXhlci5DQVQoc3RyZWFtLCB0cywgZnJhZ3MpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgVHNEZW11eGVyLlRTRFQoc3RyZWFtLCB0cywgZnJhZ3MpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMHgxZmZmOlxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIFRPRE86IHNvbWXnmoTlhpnms5XkuI3lpKrlpb3vvIzlvpfmlLlcbiAgICAgICAgaWYgKGZyYWdzLnBhdC5zb21lKChpdGVtKSA9PiB7IHJldHVybiBpdGVtLnBpZCA9PT0gcGlkOyB9KSkge1xuICAgICAgICAgIFRzRGVtdXhlci5QTVQoc3RyZWFtLCB0cywgZnJhZ3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCBzdHMgPSBmcmFncy5wbXQgPyBmcmFncy5wbXQuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnBpZCA9PT0gcGlkKSA6IFtdO1xuICAgICAgICAgIGlmIChzdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgVHNEZW11eGVyLk1lZGlhKHN0cmVhbSwgdHMsIFN0cmVhbVR5cGVbc3RzWzBdLnN0cmVhbVR5cGVdWzBdKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cy51bmtub3duUElEcyA9IHRydWU7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyByZWFkSGVhZGVyIChzdHJlYW0sIHRzKSB7XG4gICAgbGV0IGhlYWRlciA9IHt9O1xuICAgIGhlYWRlci5zeW5jID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIGxldCBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICBoZWFkZXIuZXJyb3IgPSBuZXh0ID4+PiAxNTtcbiAgICBoZWFkZXIucGF5bG9hZCA9IG5leHQgPj4+IDE0ICYgMTtcbiAgICBoZWFkZXIucHJpb3JpdHkgPSBuZXh0ID4+PiAxMyAmIDE7XG4gICAgaGVhZGVyLnBpZCA9IG5leHQgJiAweDFmZmY7XG5cbiAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuXG4gICAgaGVhZGVyLnNjcmFtYmxpbmcgPSBuZXh0ID4+IDYgJiAweDM7IC8vIOaYr+WQpuWKoOWvhu+8jDAw6KGo56S65LiN5Yqg5a+GXG5cbiAgICAvKipcbiAgICAgKiAwMCBJU08vSUVD5pyq5p2l5L2/55So5L+d55WZXG4gICAgICogMDEg5rKh5pyJ6LCD5pW05a2X5q6177yM5LuF5ZCr5pyJMTg0QuacieaViOWHgOiNt1xuICAgICAqIDAyIOayoeacieacieaViOWHgOiNt++8jOS7heWQq+aciTE4M0LosIPmlbTlrZfmrrVcbiAgICAgKiAwMyAwfjE4MkLosIPmlbTlrZfmrrXlkI7kuLrmnInmlYjlh4DojbdcbiAgICAgKi9cbiAgICBoZWFkZXIuYWRhcHRhdGlvbiA9IG5leHQgPj4gNCAmIDB4MztcbiAgICBoZWFkZXIuY29udGludWl0eSA9IG5leHQgJiAxNTtcbiAgICBoZWFkZXIucGFja2V0ID0gaGVhZGVyLnBpZCA9PT0gMCA/ICdQQVQnIDogJ01FRElBJztcbiAgICB0cy5oZWFkZXIgPSBoZWFkZXI7XG4gIH1cblxuICBzdGF0aWMgUEFUIChzdHJlYW0sIHRzLCBmcmFncykge1xuICAgIGxldCByZXQgPSB7fTtcbiAgICBsZXQgbmV4dCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICBzdHJlYW0uc2tpcChuZXh0KTtcbiAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHJldC50YWJlbElEID0gbmV4dDtcbiAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICByZXQuZXJyb3IgPSBuZXh0ID4+PiA3O1xuICAgIHJldC56ZXJvID0gbmV4dCA+Pj4gNiAmIDE7XG4gICAgcmV0LnNlY3Rpb25MZW5ndGggPSBuZXh0ICYgMHhmZmY7XG4gICAgcmV0LnN0cmVhbUlEID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICByZXQuY3VycmVudCA9IHN0cmVhbS5yZWFkVWludDgoKSAmIDE7XG4gICAgcmV0LnNlY3Rpb25OdW1iZXIgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgcmV0Lmxhc3RTZWN0aW9uTnVtYmVyID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIGxldCBOID0gKHJldC5zZWN0aW9uTGVuZ3RoIC0gOSkgLyA0O1xuICAgIGxldCBsaXN0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOOyBpKyspIHtcbiAgICAgIGxldCBwcm9ncmFtTnVtYmVyID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICAgIGxldCBwaWQgPSBzdHJlYW0ucmVhZFVpbnQxNigpICYgMHgxZmZmO1xuICAgICAgbGlzdC5wdXNoKHtcbiAgICAgICAgcHJvZ3JhbTogcHJvZ3JhbU51bWJlcixcbiAgICAgICAgcGlkLFxuICAgICAgICB0eXBlOiBwcm9ncmFtTnVtYmVyID09PSAwID8gJ25ldHdvcmsnIDogJ21hcFBJRCdcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAobGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICBmcmFncy5wYXQgPSBmcmFncy5wYXQuY29uY2F0KGxpc3QpO1xuICAgIH1cbiAgICByZXQubGlzdCA9IGxpc3Q7XG4gICAgcmV0LnByb2dyYW0gPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgIHJldC5waWQgPSBzdHJlYW0ucmVhZFVpbnQxNigpICYgMHgxZmZmO1xuICAgIHRzLnBheWxvYWQgPSByZXQ7XG4gICAgLy8gVE9ETyBDUkNcbiAgfVxuXG4gIHN0YXRpYyBQTVQgKHN0cmVhbSwgdHMsIGZyYWdzKSB7XG4gICAgbGV0IHJldCA9IHt9O1xuICAgIGxldCBoZWFkZXIgPSB0cy5oZWFkZXI7XG4gICAgaGVhZGVyLnBhY2tldCA9ICdQTVQnO1xuICAgIGxldCBuZXh0ID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHN0cmVhbS5za2lwKG5leHQpO1xuICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgcmV0LnRhYmxlSUQgPSBuZXh0O1xuICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgIHJldC5zZWN0aW9uTGVuZ3RoID0gbmV4dCAmIDB4ZmZmO1xuICAgIHJldC5wcm9ncmFtID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICByZXQuY3VycmVudCA9IHN0cmVhbS5yZWFkVWludDgoKSAmIDE7XG4gICAgcmV0Lm9yZGVyID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHJldC5sYXN0T3JkZXIgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgcmV0LlBDUl9QSUQgPSBzdHJlYW0ucmVhZFVpbnQxNigpICYgMHgxZmZmO1xuICAgIHJldC5wcm9ncmFtTGVuZ3RoID0gc3RyZWFtLnJlYWRVaW50MTYoKSAmIDB4ZmZmO1xuICAgIGxldCBOID0gKHJldC5zZWN0aW9uTGVuZ3RoIC0gMTMpIC8gNTtcbiAgICBsZXQgbGlzdCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTjsgaSsrKSB7XG4gICAgICBsaXN0LnB1c2goe1xuICAgICAgICBzdHJlYW1UeXBlOiBzdHJlYW0ucmVhZFVpbnQ4KCksXG4gICAgICAgIHBpZDogc3RyZWFtLnJlYWRVaW50MTYoKSAmIDB4MWZmZiwgLy8gMHgwN2U1IOinhumike+8jDB4MDdlNlxuICAgICAgICBlczogc3RyZWFtLnJlYWRVaW50MTYoKSAmIDB4ZmZmXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0Lmxpc3QgPSBsaXN0O1xuICAgIGlmICghdGhpcy5wbXQpIHtcbiAgICAgIHRoaXMucG10ID0gW107XG4gICAgfVxuICAgIGZyYWdzLnBtdCA9IHRoaXMucG10LmNvbmNhdChsaXN0Lm1hcCgoaXRlbSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGlkOiBpdGVtLnBpZCxcbiAgICAgICAgZXM6IGl0ZW0uZXMsXG4gICAgICAgIHN0cmVhbVR5cGU6IGl0ZW0uc3RyZWFtVHlwZSxcbiAgICAgICAgcHJvZ3JhbTogcmV0LnByb2dyYW1cbiAgICAgIH07XG4gICAgfSkpO1xuICAgIHRzLnBheWxvYWQgPSByZXQ7XG4gIH1cblxuICBzdGF0aWMgTWVkaWEgKHN0cmVhbSwgdHMsIHR5cGUpIHtcbiAgICBsZXQgaGVhZGVyID0gdHMuaGVhZGVyO1xuICAgIGxldCBwYXlsb2FkID0ge307XG4gICAgaGVhZGVyLnR5cGUgPSB0eXBlO1xuICAgIGlmIChoZWFkZXIuYWRhcHRhdGlvbiA9PT0gMHgwMykge1xuICAgICAgcGF5bG9hZC5hZGFwdGF0aW9uTGVuZ3RoID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgICAgaWYgKHBheWxvYWQuYWRhcHRhdGlvbkxlbmd0aCA+IDApIHtcbiAgICAgICAgbGV0IG5leHQgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgICAgIHBheWxvYWQuZGlzY29udGludWUgPSBuZXh0ID4+PiA3O1xuICAgICAgICBwYXlsb2FkLmFjY2VzcyA9IG5leHQgPj4+IDYgJiAweDAxO1xuICAgICAgICBwYXlsb2FkLnByaW9yaXR5ID0gbmV4dCA+Pj4gNSAmIDB4MDE7XG4gICAgICAgIHBheWxvYWQuUENSID0gbmV4dCA+Pj4gNCAmIDB4MDE7XG4gICAgICAgIHBheWxvYWQuT1BDUiA9IG5leHQgPj4+IDMgJiAweDAxO1xuICAgICAgICBwYXlsb2FkLnNwbGljZVBvaW50ID0gbmV4dCA+Pj4gMiAmIDB4MDE7XG4gICAgICAgIHBheWxvYWQudHJhbnNwb3J0UHJpdmF0ZSA9IG5leHQgPj4+IDEgJiAweDAxO1xuICAgICAgICBwYXlsb2FkLmFkYXB0YXRpb25GaWVsZCA9IG5leHQgJiAweDAxO1xuICAgICAgICBsZXQgX3N0YXJ0ID0gc3RyZWFtLnBvc2l0aW9uO1xuICAgICAgICBpZiAocGF5bG9hZC5QQ1IgPT09IDEpIHtcbiAgICAgICAgICBwYXlsb2FkLnByb2dyYW1DbG9ja0Jhc2UgPSBzdHJlYW0ucmVhZFVpbnQzMigpIDw8IDE7XG4gICAgICAgICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgICAgICAgcGF5bG9hZC5wcm9ncmFtQ2xvY2tCYXNlIHw9IG5leHQgPj4+IDE1O1xuICAgICAgICAgIHBheWxvYWQucHJvZ3JhbUNsb2NrRXh0ZW5zaW9uID0gbmV4dCAmIDB4MWZmO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXlsb2FkLk9QQ1IgPT09IDEpIHtcbiAgICAgICAgICBwYXlsb2FkLm9yaWdpblByb2dyYW1DbG9ja0Jhc2UgPSBzdHJlYW0ucmVhZFVpbnQzMigpIDw8IDE7XG4gICAgICAgICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgICAgICAgcGF5bG9hZC5vcmlnaW5Qcm9ncmFtQ2xvY2tCYXNlICs9IG5leHQgPj4+IDE1O1xuICAgICAgICAgIHBheWxvYWQub3JpZ2luUHJvZ3JhbUNsb2NrRXh0ZW5zaW9uID0gbmV4dCAmIDB4MWZmO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXlsb2FkLnNwbGljZVBvaW50ID09PSAxKSB7XG4gICAgICAgICAgcGF5bG9hZC5zcGxpY2VDb3VudGRvd24gPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBheWxvYWQudHJhbnNwb3J0UHJpdmF0ZSA9PT0gMSkge1xuICAgICAgICAgIGxldCBsZW5ndGggPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgICAgICAgbGV0IHRyYW5zcG9ydFByaXZhdGVEYXRhID0gW107XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdHJhbnNwb3J0UHJpdmF0ZURhdGEucHVzaChzdHJlYW0ucmVhZFVpbnQ4KCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocGF5bG9hZC5hZGFwdGF0aW9uRmllbGQgPT09IDEpIHtcbiAgICAgICAgICBsZXQgbGVuZ3RoID0gc3RyZWFtLnJlYWRVaW50OCgpXG4gICAgICAgICAgbGV0IG5leHQgPSBzdHJlYW0ucmVhZFVpbnQ4KClcbiAgICAgICAgICBsZXQgc3RhcnQgPSBzdHJlYW0ucG9zaXRpb247XG4gICAgICAgICAgbGV0IGx0dyA9IG5leHQgPj4+IDc7XG4gICAgICAgICAgbGV0IHBpZWNld2lzZSA9IG5leHQgPj4+IDYgJiAweDE7XG4gICAgICAgICAgbGV0IHNlYW1sZXNzID0gbmV4dCA+Pj4gNSAmIDB4MTtcbiAgICAgICAgICBpZiAobHR3ID09PSAxKSB7XG4gICAgICAgICAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICAgIHBheWxvYWQubHR3VmFsaWQgPSBuZXh0ID4+PiAxNTtcbiAgICAgICAgICAgIHBheWxvYWQubHR3T2Zmc2V0ID0gbmV4dCAmIDB4ZWZmZjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHBpZWNld2lzZSA9PT0gMSkge1xuICAgICAgICAgICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDI0KCk7XG4gICAgICAgICAgICBwYXlsb2FkLnBpZWNld2lzZVJhdGUgPSBuZXh0ICYgMHgzZmZmZmY7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzZWFtbGVzcyA9PT0gMSkge1xuICAgICAgICAgICAgbmV4dCA9IHN0cmVhbS5yZWFkSW50OCgpO1xuICAgICAgICAgICAgcGF5bG9hZC5zcGxpY2VUeXBlID0gbmV4dCA+Pj4gNDtcbiAgICAgICAgICAgIHBheWxvYWQuZHRzTmV4dEFVMSA9IG5leHQgPj4+IDEgJiAweDc7XG4gICAgICAgICAgICBwYXlsb2FkLm1hcmtlcjEgPSBuZXh0ICYgMHgxO1xuICAgICAgICAgICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgICAgICAgICBwYXlsb2FkLmR0c05leHRBVTIgPSBuZXh0ID4+PiAxO1xuICAgICAgICAgICAgcGF5bG9hZC5tYXJrZXIyID0gbmV4dCAmIDB4MTtcbiAgICAgICAgICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgICAgICAgICAgcGF5bG9hZC5kdHNOZXh0QVUzID0gbmV4dDtcbiAgICAgICAgICB9XG4gICAgICAgICAgc3RyZWFtLnNraXAobGVuZ3RoIC0gMSAtIChzdHJlYW0ucG9zaXRpb24gLSBzdGFydCkpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBsYXN0U3R1ZmZpbmcgPSBwYXlsb2FkLmFkYXB0YXRpb25MZW5ndGggLSAxIC0gKHN0cmVhbS5wb3NpdGlvbiAtIF9zdGFydCk7XG4gICAgICAgIHN0cmVhbS5za2lwKGxhc3RTdHVmZmluZyk7XG4gICAgICB9XG4gICAgfVxuICAgIHBheWxvYWQuc3RyZWFtID0gbmV3IFN0cmVhbShzdHJlYW0uYnVmZmVyLnNsaWNlKHN0cmVhbS5wb3NpdGlvbikpO1xuICAgIHRzLnBheWxvYWQgPSBwYXlsb2FkO1xuICB9XG5cbiAgc3RhdGljIFBFUyAodHMpIHtcbiAgICBsZXQgcmV0ID0ge307XG4gICAgbGV0IGJ1ZmZlciA9IHRzLnBheWxvYWQuc3RyZWFtO1xuXG4gICAgbGV0IG5leHQgPSBidWZmZXIucmVhZFVpbnQyNCgpO1xuICAgIGlmIChuZXh0ICE9PSAxKSB7XG4gICAgICByZXQuRVMgPSB7fTtcbiAgICAgIHJldC5FUy5idWZmZXIgPSBidWZmZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBzdHJlYW1JRCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgIGlmIChzdHJlYW1JRCA+PSAweGUwICYmIHN0cmVhbUlEIDw9IDB4ZWYpIHtcbiAgICAgICAgcmV0LnR5cGUgPSAndmlkZW8nO1xuICAgICAgfVxuICAgICAgaWYgKHN0cmVhbUlEID49IDB4YzAgJiYgc3RyZWFtSUQgPD0gMHhkZikge1xuICAgICAgICByZXQudHlwZSA9ICdhdWRpbyc7XG4gICAgICB9XG4gICAgICBsZXQgcGFja2V0TGVuZ3RoID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgIHJldC5wYWNrZXRMZW5ndGggPSBwYWNrZXRMZW5ndGg7XG4gICAgICBpZiAocmV0LnR5cGUgPT09ICd2aWRlbycgfHwgcmV0LnR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgICAgbGV0IG5leHQgPSBidWZmZXIucmVhZFVpbnQ4KCk7XG4gICAgICAgIGxldCBmaXJzdCA9IG5leHQgPj4+IDY7XG4gICAgICAgIGlmIChmaXJzdCAhPT0gMHgwMikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZXJyb3Igd2hlbiBwYXJzZSBwZXMgaGVhZGVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgcmV0LnB0c0RUU0ZsYWcgPSBuZXh0ID4+PiA2O1xuICAgICAgICByZXQuZXNjckZsYWcgPSBuZXh0ID4+PiA1ICYgMHgwMTtcbiAgICAgICAgcmV0LmVzUmF0ZUZsYWcgPSBuZXh0ID4+PiA0ICYgMHgwMTtcbiAgICAgICAgcmV0LmRzbUZsYWcgPSBuZXh0ID4+PiAzICYgMHgwMTtcbiAgICAgICAgcmV0LmFkZGl0aW9uYWxGbGFnID0gbmV4dCA+Pj4gMiAmIDB4MDE7XG4gICAgICAgIHJldC5jcmNGbGFnID0gbmV4dCA+Pj4gMSAmIDB4MDE7XG4gICAgICAgIHJldC5leHRlbnNpb25GbGFnID0gbmV4dCAmIDB4MDE7XG4gICAgICAgIHJldC5wZXNIZWFkZXJMZW5ndGggPSBidWZmZXIucmVhZFVpbnQ4KCk7XG4gICAgICAgIGxldCBOMSA9IHJldC5wZXNIZWFkZXJMZW5ndGg7XG5cbiAgICAgICAgaWYgKHJldC5wdHNEVFNGbGFnID09PSAyKSB7XG4gICAgICAgICAgbGV0IHB0cyA9IFtdO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQ4KCk7XG4gICAgICAgICAgcHRzLnB1c2gobmV4dCA+Pj4gMSAmIDB4MDcpO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgICAgIHB0cy5wdXNoKG5leHQgPj4+IDEpO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgICAgIHB0cy5wdXNoKG5leHQgPj4+IDEpO1xuICAgICAgICAgIHJldC5wdHMgPSAocHRzWzBdIDw8IDMwIHwgcHRzWzFdIDw8IDE1IHwgcHRzWzJdKTtcbiAgICAgICAgICBOMSAtPSA1O1xuICAgICAgICAgIC8vIOinhumikeWmguaenOayoeaciWR0c+eUqHB0c1xuICAgICAgICAgIGlmIChyZXQudHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgICAgcmV0LmR0cyA9IHJldC5wdHM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChyZXQucHRzRFRTRmxhZyA9PT0gMykge1xuICAgICAgICAgIGxldCBwdHMgPSBbXTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICAgIHB0cy5wdXNoKG5leHQgPj4+IDEgJiAweDA3KTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBwdHMucHVzaChuZXh0ID4+PiAxKTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBwdHMucHVzaChuZXh0ID4+PiAxKTtcbiAgICAgICAgICByZXQucHRzID0gKHB0c1swXSA8PCAzMCB8IHB0c1sxXSA8PCAxNSB8IHB0c1syXSk7XG4gICAgICAgICAgbGV0IGR0cyA9IFtdO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQ4KCk7XG4gICAgICAgICAgZHRzLnB1c2gobmV4dCA+Pj4gMSAmIDB4MDcpO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgICAgIGR0cy5wdXNoKG5leHQgPj4+IDEpO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgICAgIGR0cy5wdXNoKG5leHQgPj4+IDEpO1xuICAgICAgICAgIHJldC5kdHMgPSAoZHRzWzBdIDw8IDMwIHwgZHRzWzFdIDw8IDE1IHwgZHRzWzJdKTtcbiAgICAgICAgICBOMSAtPSAxMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0LmVzY3JGbGFnID09PSAxKSB7XG4gICAgICAgICAgbGV0IGVzY3IgPSBbXVxuICAgICAgICAgIGxldCBleCA9IFtdO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQ4KCk7XG4gICAgICAgICAgZXNjci5wdXNoKG5leHQgPj4+IDMgJiAweDA3KTtcbiAgICAgICAgICBlc2NyLnB1c2gobmV4dCAmIDB4MDMpO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgICAgIGVzY3IucHVzaChuZXh0ID4+PiAxMyk7XG4gICAgICAgICAgZXNjci5wdXNoKG5leHQgJiAweDAzKTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBlc2NyLnB1c2gobmV4dCA+Pj4gMTMpO1xuICAgICAgICAgIGV4LnB1c2gobmV4dCAmIDB4MDMpO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQ4KCk7XG4gICAgICAgICAgZXgucHVzaChuZXh0ID4+PiAxKTtcbiAgICAgICAgICByZXQuZXNjciA9IChlc2NyWzBdIDw8IDMwIHwgZXNjclsxXSA8PCAyOCB8IGVzY3JbMl0gPDwgMTUgfCBlc2NyWzNdIDw8IDEzIHwgZXNjcls0XSkgKiAzMDAgKyAoZXhbMF0gPDwgNyB8IGV4WzFdKTtcbiAgICAgICAgICBOMSAtPSA2O1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXQuZXNSYXRlRmxhZyA9PT0gMSkge1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQyNCgpO1xuICAgICAgICAgIHJldC5lc1JhdGUgPSBuZXh0ID4+PiAxICYgMHgzZmZmZmY7XG4gICAgICAgICAgTjEgLT0gMztcbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0LmRzbUZsYWcgPT09IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBzdXBwb3J0IERTTV90cmlja19tb2RlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldC5hZGRpdGlvbmFsRmxhZyA9PT0gMSkge1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQ4KCk7XG4gICAgICAgICAgcmV0LmFkZGl0aW9uYWxDb3B5SW5mbyA9IG5leHQgJiAweDdmO1xuICAgICAgICAgIE4xIC09IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldC5jcmNGbGFnID09PSAxKSB7XG4gICAgICAgICAgcmV0LnBlc0NSQyA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgTjEgLT0gMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0LmV4dGVuc2lvbkZsYWcgPT09IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBzdXBwb3J0IGV4dGVuc2lvbicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChOMSA+IDApIHtcbiAgICAgICAgICBidWZmZXIuc2tpcChOMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0LkVTID0gVHNEZW11eGVyLkVTKGJ1ZmZlciwgcmV0LnR5cGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdmb3JtYXQgaXMgbm90IHN1cHBvcnRlZCcpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgc3RhdGljIEVTIChidWZmZXIsIHR5cGUpIHtcbiAgICBsZXQgbmV4dDtcbiAgICBsZXQgcmV0ID0ge307XG4gICAgaWYgKHR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQzMigpO1xuICAgICAgaWYgKG5leHQgIT09IDEpIHtcbiAgICAgICAgYnVmZmVyLmJhY2soNCk7XG4gICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQyNCgpO1xuICAgICAgICBpZiAobmV4dCAhPT0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaDI2NCBuYWwgaGVhZGVyIHBhcnNlIGZhaWxlZCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBidWZmZXIuc2tpcCgyKTsvLyAwOSBGMFxuICAgICAgLy8gVE9ETyByZWFkbmFsdVxuICAgICAgcmV0LmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgLy8gYWR0c+eahOWQjOatpeWtl+iKgu+8jDEy5L2NXG4gICAgICBpZiAobmV4dCA+Pj4gNCAhPT0gMHhmZmYpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhYWMgRVMgcGFyc2UgRXJyb3InKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGZxID0gWzk2MDAwLCA4ODIwMCwgNjQwMDAsIDQ4MDAwLCA0NDEwMCwgMzIwMDAsIDI0MDAwLCAyMjA1MCwgMTYwMDAsIDEyMDAwLCAxMTAyNSwgODAwMCwgNzM1MF07XG4gICAgICByZXQuaWQgPSAobmV4dCA+Pj4gMyAmIDB4MDEpID09PSAwID8gJ01QRUctNCcgOiAnTVBFRy0yJztcbiAgICAgIHJldC5sYXllciA9IG5leHQgPj4+IDEgJiAweDAzO1xuICAgICAgcmV0LmFic2VudCA9IG5leHQgJiAweDAxO1xuICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICByZXQuYXVkaW9PYmplY3RUeXBlID0gKG5leHQgPj4+IDE0ICYgMHgwMykgKyAxO1xuICAgICAgcmV0LnByb2ZpbGUgPSByZXQuYXVkaW9PYmplY3RUeXBlIC0gMTtcbiAgICAgIHJldC5mcmVxdWVuY3lJbmRleCA9IG5leHQgPj4+IDEwICYgMHgwZjtcbiAgICAgIHJldC5mcmVxdWVuY2UgPSBmcVtyZXQuZnJlcXVlbmN5SW5kZXhdO1xuICAgICAgcmV0LmNoYW5uZWwgPSBuZXh0ID4+PiA2ICYgMHgwNztcbiAgICAgIHJldC5mcmFtZUxlbmd0aCA9IChuZXh0ICYgMHgwMykgPDwgMTEgfCAoYnVmZmVyLnJlYWRVaW50MTYoKSA+Pj4gNSk7XG4gICAgICBUc0RlbXV4ZXIuZ2V0QXVkaW9Db25maWcocmV0KTtcbiAgICAgIGJ1ZmZlci5za2lwKDEpO1xuICAgICAgcmV0LmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFUyAke3R5cGV9IGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgc3RhdGljIFRTRFQgKHN0cmVhbSwgdHMsIGZyYWdzKSB7XG4gICAgLy8gVE9ET1xuICAgIHRzLnBheWxvYWQgPSB7fTtcbiAgfVxuXG4gIHN0YXRpYyBDQVQgKHN0cmVhbSwgdHMsIGZyYWdzKSB7XG4gICAgbGV0IHJldCA9IHt9XG4gICAgcmV0LnRhYmxlSUQgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgbGV0IG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgIHJldC5zZWN0aW9uSW5kaWNhdG9yID0gbmV4dCA+Pj4gNztcbiAgICByZXQuc2VjdGlvbkxlbmd0aCA9IG5leHQgJiAweDBmZmY7XG4gICAgc3RyZWFtLnNraXAoMik7XG4gICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICByZXQudmVyc2lvbiA9IG5leHQgPj4+IDM7XG4gICAgcmV0LmN1cnJlbnROZXh0SW5kaWNhdG9yID0gbmV4dCAmIDB4MDE7XG4gICAgcmV0LnNlY3Rpb25OdW1iZXIgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgcmV0Lmxhc3RTZWN0aW9uTnVtYmVyID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIGxldCBOID0gKHRoaXMuc2VjdGlvbkxlbmd0aCAtIDkpIC8gNDtcbiAgICBsZXQgbGlzdCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTjsgaSsrKSB7XG4gICAgICBsaXN0LnB1c2goe30pO1xuICAgIH1cbiAgICByZXQuY3JjMzIgPSBzdHJlYW0ucmVhZFVpbnQzMigpO1xuICAgIHRzLnBheWxvYWQgPSByZXQ7XG4gIH1cblxuICBzdGF0aWMgZ2V0QXVkaW9Db25maWcgKHJldCkge1xuICAgIGxldCB1c2VyQWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKClcbiAgICBsZXQgY29uZmlnO1xuICAgIGxldCBleHRlbnNpb25TYW1wbGVJbmRleDtcbiAgICBpZiAoL2ZpcmVmb3gvaS50ZXN0KHVzZXJBZ2VudCkpIHtcbiAgICAgIGlmIChyZXQuZnJlcXVlbmN5SW5kZXggPj0gNikge1xuICAgICAgICByZXQuYXVkaW9PYmplY3RUeXBlID0gNTtcbiAgICAgICAgY29uZmlnID0gbmV3IEFycmF5KDQpO1xuICAgICAgICBleHRlbnNpb25TYW1wbGVJbmRleCA9IHJldC5mcmVxdWVuY3lJbmRleCAtIDM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXQuYXVkaW9PYmplY3RUeXBlID0gMjtcbiAgICAgICAgY29uZmlnID0gbmV3IEFycmF5KDIpO1xuICAgICAgICBleHRlbnNpb25TYW1wbGVJbmRleCA9IHJldC5mcmVxdWVuY3lJbmRleDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHVzZXJBZ2VudC5pbmRleE9mKCdhbmRyb2lkJykgIT09IC0xKSB7XG4gICAgICByZXQuYXVkaW9PYmplY3RUeXBlID0gMjtcbiAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSgyKTtcbiAgICAgIGV4dGVuc2lvblNhbXBsZUluZGV4ID0gcmV0LmZyZXF1ZW5jeUluZGV4O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXQuYXVkaW9PYmplY3RUeXBlID0gNTtcbiAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSg0KTtcbiAgICAgIGlmIChyZXQuZnJlcXVlbmN5SW5kZXggPj0gNikge1xuICAgICAgICBleHRlbnNpb25TYW1wbGVJbmRleCA9IHJldC5mcmVxdWVuY3lJbmRleCAtIDM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocmV0LmNoYW5uZWwgPT09IDEpIHtcbiAgICAgICAgICByZXQuYXVkaW9PYmplY3RUeXBlID0gMjtcbiAgICAgICAgICBjb25maWcgPSBuZXcgQXJyYXkoMik7XG4gICAgICAgIH1cbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxlSW5kZXggPSByZXQuZnJlcXVlbmN5SW5kZXg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uZmlnWzBdID0gcmV0LmF1ZGlvT2JqZWN0VHlwZSA8PCAzO1xuICAgIGNvbmZpZ1swXSB8PSAocmV0LmZyZXF1ZW5jeUluZGV4ICYgMHgwZSkgPj4gMTtcbiAgICBjb25maWdbMV0gPSAocmV0LmZyZXF1ZW5jeUluZGV4ICYgMHgwMSkgPDwgNztcbiAgICBjb25maWdbMV0gfD0gcmV0LmNoYW5uZWwgPDwgMztcbiAgICBpZiAocmV0LmF1ZGlvT2JqZWN0VHlwZSA9PT0gNSkge1xuICAgICAgY29uZmlnWzFdIHw9IChleHRlbnNpb25TYW1wbGVJbmRleCAmIDB4MGUpID4+IDE7XG4gICAgICBjb25maWdbMl0gPSAoZXh0ZW5zaW9uU2FtcGxlSW5kZXggJiAweDAxKSA8PCA3O1xuICAgICAgY29uZmlnWzJdIHw9IDIgPDwgMjtcbiAgICAgIGNvbmZpZ1szXSA9IDA7XG4gICAgfVxuICAgIHJldC5hdWRpb0NvbmZpZyA9IGNvbmZpZztcbiAgfVxuXG4gIGdldCBpbnB1dEJ1ZmZlciAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UodGhpcy5jb25maWdzLmlucHV0YnVmZmVyKTtcbiAgfVxuXG4gIGdldCBfdHJhY2tzICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHNEZW11eGVyO1xuIiwiY2xhc3MgUGxheWxpc3Qge1xuICBjb25zdHJ1Y3RvciAoY29uZmlncykge1xuICAgIHRoaXMuX2Jhc2VVUkwgPSAnJztcbiAgICB0aGlzLl9saXN0ID0ge307XG4gICAgdGhpcy5fdHMgPSB7fTtcbiAgICB0aGlzLnZlcnNpb24gPSAwO1xuICAgIHRoaXMuc2VxdWVuY2UgPSAtMTtcbiAgICB0aGlzLnRhcmdldGR1cmF0aW9uID0gMDtcbiAgICB0aGlzLmR1cmF0aW9uID0gMDtcbiAgICB0aGlzLmZyYWdMZW5ndGggPSAwO1xuICAgIHRoaXMuX2xhc3RnZXQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fYXVkb2NsZWFyID0gY29uZmlncy5hdXRvY2xlYXIgfHwgZmFsc2U7XG4gIH1cblxuICBnZXQgbGlzdCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpc3Q7XG4gIH1cblxuICBzZXQgYmFzZVVSTCAoYmFzZVVSTCkge1xuICAgIGlmICh0aGlzLmJhc2VVUkwgIT09IGJhc2VVUkwpIHtcbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgIHRoaXMuX2Jhc2VVUkwgPSBiYXNlVVJMO1xuICAgIH1cbiAgfVxuXG4gIGdldCBiYXNlVVJMICgpIHtcbiAgICByZXR1cm4gdGhpcy5fYmFzZVVSTDtcbiAgfVxuXG4gIHB1c2ggKHRzLCBkdXJhdGlvbiwgZGlzY29udGludWUpIHtcbiAgICBpZiAoIXRoaXMuX3RzW3RzXSkge1xuICAgICAgdGhpcy5fdHNbdHNdID0ge2R1cmF0aW9uOiBkdXJhdGlvbiwgXG4gICAgICAgIGRvd25sb2FkZWQ6IGZhbHNlLCBcbiAgICAgICAgZG93bmxvYWRpbmc6IGZhbHNlLCBcbiAgICAgICAgc3RhcnQ6IHRoaXMuZHVyYXRpb24sIFxuICAgICAgICBkaXNjb250aW51ZTogZGlzY29udGludWUgPyB0cnVlOiBmYWxzZVxuICAgICAgfTtcbiAgICAgIHRoaXMuX2xpc3RbdGhpcy5kdXJhdGlvbl0gPSB0cztcbiAgICAgIHRoaXMuZHVyYXRpb24gKz0gZHVyYXRpb247XG4gICAgICB0aGlzLmZyYWdMZW5ndGggKz0gMTtcbiAgICB9XG4gIH1cblxuICBkZWxldGVGcmFnICh1cmwpIHtcbiAgICBpZiAodGhpcy5fdHNbdXJsXSkge1xuICAgICAgaWYgKHRoaXMuX3RzW3VybF0uc3RhcnQgPiB0aGlzLl9sYXN0Z2V0LnRpbWUpIHtcbiAgICAgICAgdGhpcy5fbGFzdGdldCA9IHtcbiAgICAgICAgICBkdXJhdGlvbjogdGhpcy5fdHNbdXJsXS5kdXJhdGlvbixcbiAgICAgICAgICB0aW1lOiB0aGlzLl90c1t1cmxdLnN0YXJ0LFxuICAgICAgICAgIGRvd25sb2FkZWQ6IGZhbHNlLFxuICAgICAgICAgIGRvd25sb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICB1cmw6IHVybFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBkZWxldGUgdGhpcy5fbGlzdFt0aGlzLl90c1t1cmxdLnN0YXJ0XTtcbiAgICAgIGRlbGV0ZSB0aGlzLl90c1t1cmxdO1xuICAgICAgdGhpcy5mcmFnTGVuZ3RoIC09IDE7XG4gICAgfVxuICB9XG5cbiAgcHVzaE0zVTggKGRhdGEsIGRlbGV0ZXByZSkge1xuICAgIC8vIOW4uOinhOS/oeaBr+abv+aNolxuICAgIGlmICghZGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBtM3U4IGRhdGEgcmVjZWl2ZWQuYCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudmVyc2lvbiA9IGRhdGEudmVyc2lvbjtcbiAgICB0aGlzLnRhcmdldGR1cmF0aW9uID0gZGF0YS50YXJnZXRkdXJhdGlvbjtcbiAgICBpZihkYXRhLmVuY3J5cHQgJiYgIXRoaXMuZW5jcnlwdCkge1xuICAgICAgdGhpcy5lbmNyeXB0ID0gZGF0YS5lbmNyeXB0O1xuICAgIH1cbiAgICAvLyDmlrDliIbniYfkv6Hmga9cbiAgICBpZiAoZGF0YS5zZXF1ZW5jZSA+IHRoaXMuc2VxdWVuY2UpIHtcbiAgICAgIHRoaXMuc2VxdWVuY2UgPSBkYXRhLnNlcXVlbmNlO1xuICAgICAgbGV0IG5ld2ZyYWdsaXN0ID0gW11cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5mcmFncy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgZnJhZyA9IGRhdGEuZnJhZ3NbaV07XG4gICAgICAgIGlmICghdGhpcy5fdHNbZnJhZy51cmxdKSB7XG4gICAgICAgICAgbmV3ZnJhZ2xpc3QucHVzaChmcmFnLnVybClcbiAgICAgICAgICB0aGlzLnB1c2goZnJhZy51cmwsIGZyYWcuZHVyYXRpb24sIGZyYWcuZGlzY29udGludWUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmKG5ld2ZyYWdsaXN0Lmxlbmd0aCA8IDEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4gbm90IHJlYWQgdHMgZmlsZSBsaXN0LmApO1xuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAoZGVsZXRlcHJlKSB7XG4gICAgICAgIGxldCB0c2xpc3QgPSB0aGlzLmdldFRzTGlzdCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRzbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChuZXdmcmFnbGlzdC5pbmRleE9mKHRzbGlzdFtpXSkgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLmRlbGV0ZUZyYWcodHNsaXN0W2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBPbGQgbTN1OCBmaWxlIHJlY2VpdmVkLCAke2RhdGEuc2VxdWVuY2V9YCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0VHNMaXN0ICgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5fdHMpO1xuICB9XG5cbiAgZG93bmxvYWRlZCAodHNuYW1lLCBpc2xvYWRlZCkge1xuICAgIGxldCB0cyA9IHRoaXMuX3RzW3RzbmFtZV07XG4gICAgaWYgKHRzKSB7XG4gICAgICB0cy5kb3dubG9hZGVkID0gaXNsb2FkZWRcbiAgICB9XG4gIH1cblxuICBkb3dubG9hZGluZyAodHNuYW1lLCBsb2FkaW5nKSB7XG4gICAgbGV0IHRzID0gdGhpcy5fdHNbdHNuYW1lXTtcbiAgICBpZiAodHMpIHtcbiAgICAgIHRzLmRvd25sb2FkaW5nID0gbG9hZGluZ1xuICAgIH1cbiAgfVxuXG4gIGdldFRzQnlOYW1lIChuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RzW25hbWVdO1xuICB9XG5cbiAgZ2V0VHMgKHRpbWUpIHtcbiAgICBsZXQgdGltZWxpc3QgPSBPYmplY3Qua2V5cyh0aGlzLl9saXN0KTtcbiAgICBsZXQgdHM7XG5cbiAgICBpZiAodGltZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAodGhpcy5fbGFzdGdldCkge1xuICAgICAgICB0aW1lID0gdGhpcy5fbGFzdGdldC50aW1lICsgdGhpcy5fbGFzdGdldC5kdXJhdGlvbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRpbWUgPSAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aW1lbGlzdC5sZW5ndGggPCAxIHx8IHRpbWUgPj0gdGhpcy5kdXJhdGlvbikge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdGltZWxpc3Quc29ydCgoYSwgYikgPT4ge1xuICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoYSkgLSBwYXJzZUZsb2F0KGIpXG4gICAgfSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aW1lbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRpbWUgPj0gcGFyc2VJbnQodGltZWxpc3RbaV0pKSB7XG4gICAgICAgIGxldCB1cmwgPSB0aGlzLl9saXN0W3RpbWVsaXN0W2ldXTtcbiAgICAgICAgbGV0IGRvd25sb2FkZWQgPSB0aGlzLl90c1t1cmxdLmRvd25sb2FkZWQ7XG4gICAgICAgIGxldCBkb3dubG9hZGluZyA9IHRoaXMuX3RzW3VybF0uZG93bmxvYWRpbmc7XG4gICAgICAgIHRzID0ge3VybCwgZG93bmxvYWRlZCwgZG93bmxvYWRpbmcsIHRpbWU6IHBhcnNlSW50KHRpbWVsaXN0W2ldKSwgZHVyYXRpb246IHBhcnNlSW50KHRoaXMuX3RzW3VybF0uZHVyYXRpb24pfTtcbiAgICAgICAgaWYgKHRoaXMuYXV0b2NsZWFyKSB7XG4gICAgICAgICAgZGVsZXRlIHRoaXMuX3RzW3RoaXMuX2xhc3RnZXQudXJsXTtcbiAgICAgICAgICBkZWxldGUgdGhpcy5fbGlzdFt0aGlzLl9sYXN0Z2V0LnRpbWVdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xhc3RnZXQgPSB0cztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHM7XG4gIH1cblxuICBjbGVhciAoKSB7XG4gICAgdGhpcy5fYmFzZVVSTCA9ICcnO1xuICAgIHRoaXMuX2xpc3QgPSB7fTtcbiAgICB0aGlzLl90cyA9IHt9O1xuICAgIHRoaXMudmVyc2lvbiA9IDA7XG4gICAgdGhpcy5zZXF1ZW5jZSA9IC0xO1xuICAgIHRoaXMudGFyZ2V0ZHVyYXRpb24gPSAwO1xuICAgIHRoaXMuZHVyYXRpb24gPSAwO1xuICB9XG5cbiAgY2xlYXJEb3dubG9hZGVkICgpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IE9iamVjdC5rZXlzKHRoaXMuX3RzKS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGxldCB0cyA9IHRoaXMuX3RzW09iamVjdC5rZXlzKHRoaXMuX3RzKVtpXV07XG4gICAgICB0cy5kb3dubG9hZGVkID0gZmFsc2U7XG4gICAgICB0cy5kb3dubG9hZGluZyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuX2Jhc2VVUkwgPSAnJztcbiAgICB0aGlzLl9saXN0ID0ge307XG4gICAgdGhpcy5fdHMgPSB7fTtcbiAgICB0aGlzLnZlcnNpb24gPSAwO1xuICAgIHRoaXMuc2VxdWVuY2UgPSAtMTtcbiAgICB0aGlzLnRhcmdldGR1cmF0aW9uID0gMDtcbiAgICB0aGlzLmR1cmF0aW9uID0gMDtcbiAgICB0aGlzLmZyYWdMZW5ndGggPSAwO1xuICAgIHRoaXMuX2xhc3RnZXQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fYXVkb2NsZWFyID0gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWxpc3Q7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgRmV0Y2hMb2FkZXI6IHJlcXVpcmUoJy4vc3JjL2ZldGNoLWxvYWRlcicpLmRlZmF1bHRcbn07XG4iLCJpbXBvcnQgeyBFVkVOVFMgfSBmcm9tICd4Z3BsYXllci11dGlscyc7XG5cbmNvbnN0IExPQURFUl9FVkVOVFMgPSBFVkVOVFMuTE9BREVSX0VWRU5UUztcbmNvbnN0IFJFQURfU1RSRUFNID0gMDtcbmNvbnN0IFJFQURfVEVYVCA9IDE7XG5jb25zdCBSRUFEX0pTT04gPSAyO1xuY29uc3QgUkVBRF9CVUZGRVIgPSAzO1xuY2xhc3MgRmV0Y2hMb2FkZXIge1xuICBjb25zdHJ1Y3RvciAoY29uZmlncykge1xuICAgIHRoaXMuY29uZmlncyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZ3MpO1xuICAgIHRoaXMudXJsID0gbnVsbFxuICAgIHRoaXMuc3RhdHVzID0gMFxuICAgIHRoaXMuZXJyb3IgPSBudWxsXG4gICAgdGhpcy5fcmVhZGVyID0gbnVsbDtcbiAgICB0aGlzLl9jYW5jZWxlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2Rlc3Ryb3llZCA9IGZhbHNlO1xuICAgIHRoaXMucmVhZHR5cGUgPSB0aGlzLmNvbmZpZ3MucmVhZHR5cGU7XG4gICAgdGhpcy5idWZmZXIgPSB0aGlzLmNvbmZpZ3MuYnVmZmVyIHx8ICdMT0FERVJfQlVGRkVSJztcbiAgICB0aGlzLl9sb2FkZXJUYXNrTm8gPSAwO1xuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgdGhpcy5vbihMT0FERVJfRVZFTlRTLkxBREVSX1NUQVJULCB0aGlzLmxvYWQuYmluZCh0aGlzKSlcbiAgfVxuXG4gIHN0YXRpYyBnZXQgdHlwZSAoKSB7XG4gICAgcmV0dXJuICdsb2FkZXInXG4gIH1cblxuICBsb2FkICh1cmwsIG9wdHMpIHtcbiAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgIHRoaXMudXJsID0gdXJsO1xuICAgIHRoaXMuX2NhbmNlbGVkID0gZmFsc2U7XG5cbiAgICAvLyBUT0RPOiBBZGQgUmFuZ2VzXG4gICAgbGV0IHBhcmFtcyA9IHRoaXMuZ2V0UGFyYW1zKG9wdHMpXG4gICAgX3RoaXMubG9hZGluZyA9IHRydWVcbiAgICByZXR1cm4gZmV0Y2godGhpcy51cmwsIHBhcmFtcykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICBfdGhpcy5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXNcbiAgICAgICAgcmV0dXJuIF90aGlzLl9vbkZldGNoUmVzcG9uc2UocmVzcG9uc2UpO1xuICAgICAgfVxuICAgICAgX3RoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9FUlJPUiwgX3RoaXMuVEFHLCBuZXcgRXJyb3IoYGludmFsaWQgcmVzcG9uc2UuYCkpO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikgIHtcbiAgICAgIF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfRVJST1IsIF90aGlzLlRBRywgZXJyb3IpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpXG4gICAgfSlcbiAgfVxuXG4gIF9vbkZldGNoUmVzcG9uc2UgKHJlc3BvbnNlKSB7XG4gICAgbGV0IF90aGlzID0gdGhpcztcbiAgICBsZXQgYnVmZmVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSh0aGlzLmJ1ZmZlcik7XG4gICAgdGhpcy5fbG9hZGVyVGFza05vKys7XG4gICAgbGV0IHRhc2tubyA9IHRoaXMuX2xvYWRlclRhc2tObztcbiAgICBpZiAocmVzcG9uc2Uub2sgPT09IHRydWUpIHtcbiAgICAgIHN3aXRjaCAodGhpcy5yZWFkdHlwZSkge1xuICAgICAgICBjYXNlIFJFQURfSlNPTjpcbiAgICAgICAgICByZXNwb25zZS5qc29uKCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgX3RoaXMubG9hZGluZyA9IGZhbHNlXG4gICAgICAgICAgICBpZiAoIV90aGlzLl9jYW5jZWxlZCAmJiAhX3RoaXMuX2Rlc3Ryb3llZCkge1xuICAgICAgICAgICAgICBpZiAoYnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgYnVmZmVyLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9DT01QTEVURSwgYnVmZmVyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0NPTVBMRVRFLCBkYXRhKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFJFQURfVEVYVDpcbiAgICAgICAgICByZXNwb25zZS50ZXh0KCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgX3RoaXMubG9hZGluZyA9IGZhbHNlXG4gICAgICAgICAgICBpZiAoIV90aGlzLl9jYW5jZWxlZCAmJiAhX3RoaXMuX2Rlc3Ryb3llZCkge1xuICAgICAgICAgICAgICBpZiAoYnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgYnVmZmVyLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9DT01QTEVURSwgYnVmZmVyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0NPTVBMRVRFLCBkYXRhKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFJFQURfQlVGRkVSOlxuICAgICAgICAgIHJlc3BvbnNlLmFycmF5QnVmZmVyKCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgX3RoaXMubG9hZGluZyA9IGZhbHNlXG4gICAgICAgICAgICBpZiAoIV90aGlzLl9jYW5jZWxlZCAmJiAhX3RoaXMuX2Rlc3Ryb3llZCkge1xuICAgICAgICAgICAgICBpZiAoYnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgYnVmZmVyLnB1c2gobmV3IFVpbnQ4QXJyYXkoZGF0YSkpO1xuICAgICAgICAgICAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsIGJ1ZmZlcik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9DT01QTEVURSwgZGF0YSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBSRUFEX1NUUkVBTTpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gdGhpcy5fb25SZWFkZXIocmVzcG9uc2UuYm9keS5nZXRSZWFkZXIoKSwgdGFza25vKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfb25SZWFkZXIgKHJlYWRlciwgdGFza25vKSB7XG4gICAgbGV0IGJ1ZmZlciA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UodGhpcy5idWZmZXIpO1xuICAgIGlmICgoIWJ1ZmZlciAmJiB0aGlzLl9yZWFkZXIpIHx8IHRoaXMuX2Rlc3Ryb3llZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5fcmVhZGVyLmNhbmNlbCgpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIERPIE5PVEhJTkdcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9yZWFkZXIgPSByZWFkZXJcbiAgICBpZiAodGhpcy5sb2FkaW5nID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IF90aGlzID0gdGhpc1xuICAgIC8vIHJlYWRlciByZWFkIGZ1bmN0aW9uIHJldHVybnMgYSBQcm9taXNlLiBnZXQgZGF0YSB3aGVuIGNhbGxiYWNrIGFuZCBoYXMgdmFsdWUuZG9uZSB3aGVuIGRpc2Nvbm5lY3RlZC5cbiAgICAvLyByZWFk5pa55rOV6L+U5Zue5LiA5LiqUHJvbWlzZS4g5Zue6LCD5Lit5Y+v5Lul6I635Y+W5Yiw5pWw5o2u44CC5b2TdmFsdWUuZG9uZeWtmOWcqOaXtu+8jOivtOaYjumTvuaOpeaWreW8gOOAglxuICAgIHRoaXMuX3JlYWRlciAmJiB0aGlzLl9yZWFkZXIucmVhZCgpLnRoZW4oZnVuY3Rpb24gKHZhbCkge1xuICAgICAgaWYgKHZhbC5kb25lKSB7XG4gICAgICAgIC8vIFRPRE86IOWujOaIkOWkhOeQhlxuICAgICAgICBfdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgICAgX3RoaXMuc3RhdHVzID0gMDtcbiAgICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9DT01QTEVURSwgYnVmZmVyKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKF90aGlzLl9jYW5jZWxlZCB8fCBfdGhpcy5fZGVzdHJveWVkKSB7XG4gICAgICAgIGlmICAoX3RoaXMuX3JlYWRlcikge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBfdGhpcy5fcmVhZGVyLmNhbmNlbCgpXG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gRE8gTk9USElOR1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGJ1ZmZlci5wdXNoKHZhbC52YWx1ZSlcbiAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfREFUQUxPQURFRCwgYnVmZmVyKVxuICAgICAgcmV0dXJuIF90aGlzLl9vblJlYWRlcihyZWFkZXIsIHRhc2tubylcbiAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfRVJST1IsIF90aGlzLlRBRywgZXJyb3IpO1xuICAgIH0pXG4gIH1cblxuICBnZXRQYXJhbXMgKG9wdHMpIHtcbiAgICBsZXQgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdHMpXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpXG5cbiAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICBtb2RlOiAnY29ycycsXG4gICAgICBjYWNoZTogJ2RlZmF1bHQnXG4gICAgfVxuXG4gICAgLy8gYWRkIGN1c3Rtb3IgaGVhZGVyc1xuICAgIC8vIOa3u+WKoOiHquWumuS5ieWktFxuICAgIGlmICh0eXBlb2YgdGhpcy5jb25maWdzLmhlYWRlcnMgPT09ICdvYmplY3QnKSB7XG4gICAgICBsZXQgY29uZmlnSGVhZGVycyA9IHRoaXMuY29uZmlncy5oZWFkZXJzXG4gICAgICBmb3IgKGxldCBrZXkgaW4gY29uZmlnSGVhZGVycykge1xuICAgICAgICBpZiAoY29uZmlnSGVhZGVycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgaGVhZGVycy5hcHBlbmQoa2V5LCBjb25maWdIZWFkZXJzW2tleV0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuaGVhZGVycyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGxldCBvcHRIZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzXG4gICAgICBmb3IgKGxldCBrZXkgaW4gb3B0SGVhZGVycykge1xuICAgICAgICBpZiAob3B0SGVhZGVycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgaGVhZGVycy5hcHBlbmQoa2V5LCBvcHRIZWFkZXJzW2tleV0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5jb3JzID09PSBmYWxzZSkge1xuICAgICAgcGFyYW1zLm1vZGUgPSAnc2FtZS1vcmlnaW4nXG4gICAgfVxuXG4gICAgLy8gd2l0aENyZWRlbnRpYWxzIGlzIGRpc2FibGVkIGJ5IGRlZmF1bHRcbiAgICAvLyB3aXRoQ3JlZGVudGlhbHMg5Zyo6buY6K6k5oOF5Ya15LiL5LiN6KKr5L2/55So44CCXG4gICAgaWYgKG9wdGlvbnMud2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICBwYXJhbXMuY3JlZGVudGlhbHMgPSAnaW5jbHVkZSdcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBBZGQgcmFuZ2VzO1xuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICBjYW5jZWwgKCkge1xuICAgIGlmICh0aGlzLl9yZWFkZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuX3JlYWRlci5jYW5jZWwoKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyDpmLLmraJmYWlsZWQ6IDIwMOmUmeivr+iiq+aJk+WNsOWIsOaOp+WItuWPsOS4ilxuICAgICAgfVxuICAgICAgdGhpcy5fcmVhZGVyID0gbnVsbFxuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgIHRoaXMuX2NhbmNlbGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLl9kZXN0cm95ZWQgPSB0cnVlXG4gICAgdGhpcy5jYW5jZWwoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBGZXRjaExvYWRlclxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIE1wNFJlbXV4ZXI6IHJlcXVpcmUoJy4vc3JjL21wNCcpLmRlZmF1bHRcbn07XG4iLCJpbXBvcnQgeyBCdWZmZXIgfSBmcm9tICd4Z3BsYXllci11dGlscyc7XG5cbi8vIGNvbnN0IFVJTlQzMl9NQVggPSBNYXRoLnBvdygyLCAzMikgLSAxO1xuY2xhc3MgRm1wNCB7XG4gIHN0YXRpYyBzaXplICh2YWx1ZSkge1xuICAgIHJldHVybiBCdWZmZXIud3JpdGVVaW50MzIodmFsdWUpXG4gIH1cbiAgc3RhdGljIGluaXRCb3ggKHNpemUsIG5hbWUsIC4uLmNvbnRlbnQpIHtcbiAgICBjb25zdCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKHNpemUpLCBGbXA0LnR5cGUobmFtZSksIC4uLmNvbnRlbnQpXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgZXh0ZW5zaW9uICh2ZXJzaW9uLCBmbGFnKSB7XG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFtcbiAgICAgIHZlcnNpb24sXG4gICAgICAoZmxhZyA+PiAxNikgJiAweGZmLFxuICAgICAgKGZsYWcgPj4gOCkgJiAweGZmLFxuICAgICAgZmxhZyAmIDB4ZmZcbiAgICBdKVxuICB9XG4gIHN0YXRpYyBmdHlwICgpIHtcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDI0LCAnZnR5cCcsIG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4NjksIDB4NzMsIDB4NkYsIDB4NkQsIC8vIGlzb20sXG4gICAgICAweDAsIDB4MCwgMHgwMCwgMHgwMSwgLy8gbWlub3JfdmVyc2lvbjogMHgwMVxuICAgICAgMHg2OSwgMHg3MywgMHg2RiwgMHg2RCwgLy8gaXNvbVxuICAgICAgMHg2MSwgMHg3NiwgMHg2MywgMHgzMSAvLyBhdmMxXG4gICAgXSkpXG4gIH1cbiAgc3RhdGljIG1vb3YgKHsgdHlwZSwgbWV0YSB9KSB7XG4gICAgbGV0IHNpemUgPSA4XG4gICAgbGV0IG12aGQgPSBGbXA0Lm12aGQobWV0YS5kdXJhdGlvbiwgbWV0YS50aW1lc2NhbGUpXG4gICAgbGV0IHRyYWtcblxuICAgIGlmICh0eXBlID09PSAndmlkZW8nKSB7XG4gICAgICB0cmFrID0gRm1wNC52aWRlb1RyYWsobWV0YSlcbiAgICB9IGVsc2Uge1xuICAgICAgdHJhayA9IEZtcDQuYXVkaW9UcmFrKG1ldGEpXG4gICAgfVxuXG4gICAgbGV0IG12ZXggPSBGbXA0Lm12ZXgobWV0YS5kdXJhdGlvbiwgbWV0YS50aW1lc2NhbGUgfHwgMTAwMCwgbWV0YS5pZCk7XG4gICAgW212aGQsIHRyYWssIG12ZXhdLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aFxuICAgIH0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveChzaXplLCAnbW9vdicsIG12aGQsIHRyYWssIG12ZXgpXG4gIH1cbiAgc3RhdGljIG12aGQgKGR1cmF0aW9uLCB0aW1lc2NhbGUgPSAxMDAwKSB7XG4gICAgLy8gZHVyYXRpb24gKj0gdGltZXNjYWxlO1xuICAgIGxldCBieXRlcyA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHZlcnNpb24oMCkgKyBmbGFncyAgICAgMeS9jeeahGJveOeJiOacrCsz5L2NZmxhZ3MgICBib3jniYjmnKzvvIww5oiWMe+8jOS4gOiIrOS4ujDjgILvvIjku6XkuIvlrZfoioLmlbDlnYfmjIl2ZXJzaW9uPTDvvIlcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGNyZWF0aW9uX3RpbWUgICAg5Yib5bu65pe26Ze0ICDvvIjnm7jlr7nkuo5VVEPml7bpl7QxOTA0LTAxLTAx6Zu254K555qE56eS5pWw77yJXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBtb2RpZmljYXRpb25fdGltZSAgIOS/ruaUueaXtumXtFxuXG4gICAgICAvKipcbiAgICAgICAgICAgICAqIHRpbWVzY2FsZTogNCBieXRlc+aWh+S7tuWqkuS9k+WcqDHnp5Lml7bpl7TlhoXnmoTliLvluqblgLzvvIzlj6/ku6XnkIbop6PkuLox56eS6ZW/5bqmXG4gICAgICAgICAgICAgKi9cbiAgICAgICh0aW1lc2NhbGUgPj4+IDI0KSAmIDB4RkYsXG4gICAgICAodGltZXNjYWxlID4+PiAxNikgJiAweEZGLFxuICAgICAgKHRpbWVzY2FsZSA+Pj4gOCkgJiAweEZGLFxuICAgICAgKHRpbWVzY2FsZSkgJiAweEZGLFxuXG4gICAgICAvKipcbiAgICAgICAgICAgICAqIGR1cmF0aW9uOiA0IGJ5dGVz6K+ldHJhY2vnmoTml7bpl7Tplb/luqbvvIznlKhkdXJhdGlvbuWSjHRpbWUgc2NhbGXlgLzlj6/ku6XorqHnrpd0cmFja+aXtumVv++8jOavlOWmgmF1ZGlvIHRyYWNr55qEdGltZSBzY2FsZSA9IDgwMDAsXG4gICAgICAgICAgICAgKiBkdXJhdGlvbiA9IDU2MDEyOO+8jOaXtumVv+S4ujcwLjAxNu+8jHZpZGVvIHRyYWNr55qEdGltZSBzY2FsZSA9IDYwMCwgZHVyYXRpb24gPSA0MjAwMO+8jOaXtumVv+S4ujcwXG4gICAgICAgICAgICAgKi9cbiAgICAgIChkdXJhdGlvbiA+Pj4gMjQpICYgMHhGRixcbiAgICAgIChkdXJhdGlvbiA+Pj4gMTYpICYgMHhGRixcbiAgICAgIChkdXJhdGlvbiA+Pj4gOCkgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uKSAmIDB4RkYsXG4gICAgICAweDAwLCAweDAxLCAweDAwLCAweDAwLCAvLyBQcmVmZXJyZWQgcmF0ZTogMS4wICAg5o6o6I2Q5pKt5pS+6YCf546H77yM6auYMTbkvY3lkozkvY4xNuS9jeWIhuWIq+S4uuWwj+aVsOeCueaVtOaVsOmDqOWIhuWSjOWwj+aVsOmDqOWIhu+8jOWNs1sxNi4xNl0g5qC85byP77yM6K+l5YC85Li6MS4w77yIMHgwMDAxMDAwMO+8ieihqOekuuato+W4uOWJjeWQkeaSreaUvlxuICAgICAgLyoqXG4gICAgICAgICAgICAgKiBQcmVmZXJyZWRWb2x1bWUoMS4wLCAyYnl0ZXMpICsgcmVzZXJ2ZWQoMmJ5dGVzKVxuICAgICAgICAgICAgICog5LiOcmF0Zeexu+S8vO+8jFs4LjhdIOagvOW8j++8jDEuMO+8iDB4MDEwMO+8ieihqOekuuacgOWkp+mfs+mHj1xuICAgICAgICAgICAgICovXG4gICAgICAweDAxLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gIHJlc2VydmVkOiA0ICsgNCBieXRlc+S/neeVmeS9jVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDEsIDB4MDAsIDB4MDAsIC8vIC0tLS1iZWdpbiBjb21wb3NpdGlvbiBtYXRyaXgtLS0tXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8g6KeG6aKR5Y+Y5o2i55+p6Zi1ICAg57q/5oCn5Luj5pWwXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMSwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4NDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIC0tLS1lbmQgY29tcG9zaXRpb24gbWF0cml4LS0tLVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gLS0tLWJlZ2luIHByZV9kZWZpbmVkIDYgKiA0IGJ5dGVzLS0tLVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHByZS1kZWZpbmVkIOS/neeVmeS9jVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyAtLS0tZW5kIHByZV9kZWZpbmVkIDYgKiA0IGJ5dGVzLS0tLVxuICAgICAgMHhGRiwgMHhGRiwgMHhGRiwgMHhGRiAvLyBuZXh0X3RyYWNrX0lEIOS4i+S4gOS4qnRyYWNr5L2/55So55qEaWTlj7dcbiAgICBdKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goOCArIGJ5dGVzLmxlbmd0aCwgJ212aGQnLCBuZXcgVWludDhBcnJheShieXRlcykpXG4gIH1cbiAgc3RhdGljIHZpZGVvVHJhayAoZGF0YSkge1xuICAgIGxldCBzaXplID0gOFxuXG4gICAgbGV0IHRraGQgPSBGbXA0LnRraGQoe1xuICAgICAgaWQ6IDEsXG4gICAgICBkdXJhdGlvbjogZGF0YS5kdXJhdGlvbixcbiAgICAgIHRpbWVzY2FsZTogZGF0YS50aW1lc2NhbGUgfHwgMTAwMCxcbiAgICAgIHdpZHRoOiBkYXRhLnByZXNlbnRXaWR0aCxcbiAgICAgIGhlaWdodDogZGF0YS5wcmVzZW50SGVpZ2h0LFxuICAgICAgdHlwZTogJ3ZpZGVvJ1xuICAgIH0pXG4gICAgbGV0IG1kaWEgPSBGbXA0Lm1kaWEoe1xuICAgICAgdHlwZTogJ3ZpZGVvJyxcbiAgICAgIHRpbWVzY2FsZTogZGF0YS50aW1lc2NhbGUgfHwgMTAwMCxcbiAgICAgIGR1cmF0aW9uOiBkYXRhLmR1cmF0aW9uLFxuICAgICAgYXZjYzogZGF0YS5hdmNjLFxuICAgICAgcGFyUmF0aW86IGRhdGEucGFyUmF0aW8sXG4gICAgICB3aWR0aDogZGF0YS5wcmVzZW50V2lkdGgsXG4gICAgICBoZWlnaHQ6IGRhdGEucHJlc2VudEhlaWdodFxuICAgIH0pO1xuICAgIFt0a2hkLCBtZGlhXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGhcbiAgICB9KVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goc2l6ZSwgJ3RyYWsnLCB0a2hkLCBtZGlhKVxuICB9XG4gIHN0YXRpYyBhdWRpb1RyYWsgKGRhdGEpIHtcbiAgICBsZXQgc2l6ZSA9IDhcbiAgICBsZXQgdGtoZCA9IEZtcDQudGtoZCh7XG4gICAgICBpZDogMixcbiAgICAgIGR1cmF0aW9uOiBkYXRhLmR1cmF0aW9uLFxuICAgICAgdGltZXNjYWxlOiBkYXRhLnRpbWVzY2FsZSB8fCAxMDAwLFxuICAgICAgd2lkdGg6IDAsXG4gICAgICBoZWlnaHQ6IDAsXG4gICAgICB0eXBlOiAnYXVkaW8nXG4gICAgfSlcbiAgICBsZXQgbWRpYSA9IEZtcDQubWRpYSh7XG4gICAgICB0eXBlOiAnYXVkaW8nLFxuICAgICAgdGltZXNjYWxlOiBkYXRhLnRpbWVzY2FsZSB8fCAxMDAwLFxuICAgICAgZHVyYXRpb246IGRhdGEuZHVyYXRpb24sXG4gICAgICBjaGFubmVsQ291bnQ6IGRhdGEuY2hhbm5lbENvdW50LFxuICAgICAgc2FtcGxlcmF0ZTogZGF0YS5zYW1wbGVSYXRlLFxuICAgICAgY29uZmlnOiBkYXRhLmNvbmZpZ1xuICAgIH0pO1xuICAgIFt0a2hkLCBtZGlhXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGhcbiAgICB9KVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goc2l6ZSwgJ3RyYWsnLCB0a2hkLCBtZGlhKVxuICB9XG4gIHN0YXRpYyB0a2hkIChkYXRhKSB7XG4gICAgbGV0IGlkID0gZGF0YS5pZFxuICAgIGxldCBkdXJhdGlvbiA9IGRhdGEuZHVyYXRpb25cbiAgICBsZXQgd2lkdGggPSBkYXRhLndpZHRoXG4gICAgbGV0IGhlaWdodCA9IGRhdGEuaGVpZ2h0XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDA3LCAvLyB2ZXJzaW9uKDApICsgZmxhZ3MgMeS9jeeJiOacrCBib3jniYjmnKzvvIww5oiWMe+8jOS4gOiIrOS4ujDjgILvvIjku6XkuIvlrZfoioLmlbDlnYfmjIl2ZXJzaW9uPTDvvInmjInkvY3miJbmk43kvZznu5PmnpzlgLzvvIzpooTlrprkuYnlpoLkuIvvvJpcbiAgICAgIC8vIDB4MDAwMDAxIHRyYWNrX2VuYWJsZWTvvIzlkKbliJnor6V0cmFja+S4jeiiq+aSreaUvu+8m1xuICAgICAgLy8gMHgwMDAwMDIgdHJhY2tfaW5fbW92aWXvvIzooajnpLror6V0cmFja+WcqOaSreaUvuS4reiiq+W8leeUqO+8m1xuICAgICAgLy8gMHgwMDAwMDQgdHJhY2tfaW5fcHJldmlld++8jOihqOekuuivpXRyYWNr5Zyo6aKE6KeI5pe26KKr5byV55So44CCXG4gICAgICAvLyDkuIDoiKzor6XlgLzkuLo377yMMSsyKzQg5aaC5p6c5LiA5Liq5aqS5L2T5omA5pyJdHJhY2vlnYfmnKrorr7nva50cmFja19pbl9tb3ZpZeWSjHRyYWNrX2luX3ByZXZpZXfvvIzlsIbooqvnkIbop6PkuLrmiYDmnIl0cmFja+Wdh+iuvue9ruS6hui/meS4pOmhue+8m+WvueS6jmhpbnQgdHJhY2vvvIzor6XlgLzkuLowXG4gICAgICAvLyBoaW50IHRyYWNrIOi/meS4queJueauiueahHRyYWNr5bm25LiN5YyF5ZCr5aqS5L2T5pWw5o2u77yM6ICM5piv5YyF5ZCr5LqG5LiA5Lqb5bCG5YW25LuW5pWw5o2udHJhY2vmiZPljIXmiJDmtYHlqpLkvZPnmoTmjIfnpLrkv6Hmga/jgIJcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGNyZWF0aW9uX3RpbWXliJvlu7rml7bpl7TvvIjnm7jlr7nkuo5VVEPml7bpl7QxOTA0LTAxLTAx6Zu254K555qE56eS5pWw77yJXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBtb2RpZmljYXRpb24gdGltZSDkv67mlLnml7bpl7RcbiAgICAgIChpZCA+Pj4gMjQpICYgMHhGRiwgLy8gdHJhY2tfSUQ6IDQgYnl0ZXMgaWTlj7fvvIzkuI3og73ph43lpI3kuJTkuI3og73kuLowXG4gICAgICAoaWQgPj4+IDE2KSAmIDB4RkYsXG4gICAgICAoaWQgPj4+IDgpICYgMHhGRixcbiAgICAgIChpZCkgJiAweEZGLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWQ6IDQgYnl0ZXMgICAg5L+d55WZ5L2NXG4gICAgICAoZHVyYXRpb24gPj4+IDI0KSAmIDB4RkYsIC8vIGR1cmF0aW9uOiA0IGJ5dGVzIHRyYWNr55qE5pe26Ze06ZW/5bqmXG4gICAgICAoZHVyYXRpb24gPj4+IDE2KSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24gPj4+IDgpICYgMHhGRixcbiAgICAgIChkdXJhdGlvbikgJiAweEZGLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWQ6IDIgKiA0IGJ5dGVzICAgIOS/neeVmeS9jVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGxheWVyKDJieXRlcykgKyBhbHRlcm5hdGVfZ3JvdXAoMmJ5dGVzKSAg6KeG6aKR5bGC77yM6buY6K6k5Li6MO+8jOWAvOWwj+eahOWcqOS4iuWxgi50cmFja+WIhue7hOS/oeaBr++8jOm7mOiupOS4ujDooajnpLror6V0cmFja+acquS4juWFtuS7lnRyYWNr5pyJ576k57uE5YWz57O7XG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyB2b2x1bWUoMmJ5dGVzKSArIHJlc2VydmVkKDJieXRlcykgICAgWzguOF0g5qC85byP77yM5aaC5p6c5Li66Z+z6aKRdHJhY2vvvIwxLjDvvIgweDAxMDDvvInooajnpLrmnIDlpKfpn7Pph4/vvJvlkKbliJnkuLowICAgK+S/neeVmeS9jVxuICAgICAgMHgwMCwgMHgwMSwgMHgwMCwgMHgwMCwgLy8gLS0tLWJlZ2luIGNvbXBvc2l0aW9uIG1hdHJpeC0tLS1cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDEsIDB4MDAsIDB4MDAsIC8vIOinhumikeWPmOaNouefqemYtVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHg0MCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gLS0tLWVuZCBjb21wb3NpdGlvbiBtYXRyaXgtLS0tXG4gICAgICAod2lkdGggPj4+IDgpICYgMHhGRiwgLy8gLy/lrr3luqZcbiAgICAgICh3aWR0aCkgJiAweEZGLFxuICAgICAgMHgwMCwgMHgwMCxcbiAgICAgIChoZWlnaHQgPj4+IDgpICYgMHhGRiwgLy8g6auY5bqmXG4gICAgICAoaGVpZ2h0KSAmIDB4RkYsXG4gICAgICAweDAwLCAweDAwXG4gICAgXSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDggKyBjb250ZW50LmJ5dGVMZW5ndGgsICd0a2hkJywgY29udGVudClcbiAgfVxuICBzdGF0aWMgZWR0cyAoZGF0YSkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgZHVyYXRpb24gPSBkYXRhLmR1cmF0aW9uXG4gICAgbGV0IG1lZGlhVGltZSA9IGRhdGEubWVkaWFUaW1lXG4gICAgYnVmZmVyLndyaXRlKEZtcDQuc2l6ZSgzNiksIEZtcDQudHlwZSgnZWR0cycpKVxuICAgIC8vIGVsc3RcbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKDI4KSwgRm1wNC50eXBlKCdlbHN0JykpXG4gICAgYnVmZmVyLndyaXRlKG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDEsIC8vIGVudHJ5IGNvdW50XG4gICAgICAoZHVyYXRpb24gPj4gMjQpICYgMHhmZiwgKGR1cmF0aW9uID4+IDE2KSAmIDB4ZmYsIChkdXJhdGlvbiA+PiA4KSAmIDB4ZmYsIGR1cmF0aW9uICYgMHhmZixcbiAgICAgIChtZWRpYVRpbWUgPj4gMjQpICYgMHhmZiwgKG1lZGlhVGltZSA+PiAxNikgJiAweGZmLCAobWVkaWFUaW1lID4+IDgpICYgMHhmZiwgbWVkaWFUaW1lICYgMHhmZixcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDEgLy8gbWVkaWEgcmF0ZVxuICAgIF0pKVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIG1kaWEgKGRhdGEpIHtcbiAgICBsZXQgc2l6ZSA9IDhcbiAgICBsZXQgbWRoZCA9IEZtcDQubWRoZChkYXRhLnRpbWVzY2FsZSwgZGF0YS5kdXJhdGlvbilcbiAgICBsZXQgaGRsciA9IEZtcDQuaGRscihkYXRhLnR5cGUpXG4gICAgbGV0IG1pbmYgPSBGbXA0Lm1pbmYoZGF0YSk7XG4gICAgW21kaGQsIGhkbHIsIG1pbmZdLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aFxuICAgIH0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveChzaXplLCAnbWRpYScsIG1kaGQsIGhkbHIsIG1pbmYpXG4gIH1cbiAgc3RhdGljIG1kaGQgKHRpbWVzY2FsZSA9IDEwMDAsIGR1cmF0aW9uKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBjcmVhdGlvbl90aW1lICAgIOWIm+W7uuaXtumXtFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gbW9kaWZpY2F0aW9uX3RpbWXkv67mlLnml7bpl7RcbiAgICAgICh0aW1lc2NhbGUgPj4+IDI0KSAmIDB4RkYsIC8vIHRpbWVzY2FsZTogNCBieXRlcyAgICDmlofku7blqpLkvZPlnKgx56eS5pe26Ze05YaF55qE5Yi75bqm5YC877yM5Y+v5Lul55CG6Kej5Li6MeenkumVv+W6plxuICAgICAgKHRpbWVzY2FsZSA+Pj4gMTYpICYgMHhGRixcbiAgICAgICh0aW1lc2NhbGUgPj4+IDgpICYgMHhGRixcbiAgICAgICh0aW1lc2NhbGUpICYgMHhGRixcbiAgICAgIChkdXJhdGlvbiA+Pj4gMjQpICYgMHhGRiwgLy8gZHVyYXRpb246IDQgYnl0ZXMgIHRyYWNr55qE5pe26Ze06ZW/5bqmXG4gICAgICAoZHVyYXRpb24gPj4+IDE2KSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24gPj4+IDgpICYgMHhGRixcbiAgICAgIChkdXJhdGlvbikgJiAweEZGLFxuICAgICAgMHg1NSwgMHhDNCwgLy8gbGFuZ3VhZ2U6IHVuZCAodW5kZXRlcm1pbmVkKSDlqpLkvZPor63oqIDnoIHjgILmnIDpq5jkvY3kuLow77yM5ZCO6Z2iMTXkvY3kuLoz5Liq5a2X56ym77yI6KeBSVNPIDYzOS0yL1TmoIflh4bkuK3lrprkuYnvvIlcbiAgICAgIDB4MDAsIDB4MDAgLy8gcHJlX2RlZmluZWQgPSAwXG4gICAgXSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDEyICsgY29udGVudC5ieXRlTGVuZ3RoLCAnbWRoZCcsIEZtcDQuZXh0ZW5zaW9uKDAsIDApLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyBoZGxyICh0eXBlKSB7XG4gICAgbGV0IHZhbHVlID0gWzB4MDAsIC8vIHZlcnNpb24gMFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHByZV9kZWZpbmVkXG4gICAgICAweDc2LCAweDY5LCAweDY0LCAweDY1LCAvLyBoYW5kbGVyX3R5cGU6ICd2aWRlJ1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHg1NiwgMHg2OSwgMHg2NCwgMHg2NSxcbiAgICAgIDB4NmYsIDB4NDgsIDB4NjEsIDB4NmUsXG4gICAgICAweDY0LCAweDZjLCAweDY1LCAweDcyLCAweDAwIC8vIG5hbWU6ICdWaWRlb0hhbmRsZXInXG4gICAgXVxuICAgIGlmICh0eXBlID09PSAnYXVkaW8nKSB7XG4gICAgICB2YWx1ZS5zcGxpY2UoOCwgNCwgLi4uWzB4NzMsIDB4NmYsIDB4NzUsIDB4NmVdKVxuICAgICAgdmFsdWUuc3BsaWNlKDI0LCAxMywgLi4uWzB4NTMsIDB4NmYsIDB4NzUsIDB4NmUsXG4gICAgICAgIDB4NjQsIDB4NDgsIDB4NjEsIDB4NmUsXG4gICAgICAgIDB4NjQsIDB4NmMsIDB4NjUsIDB4NzIsIDB4MDBdKVxuICAgIH1cbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDggKyB2YWx1ZS5sZW5ndGgsICdoZGxyJywgbmV3IFVpbnQ4QXJyYXkodmFsdWUpKVxuICB9XG4gIHN0YXRpYyBtaW5mIChkYXRhKSB7XG4gICAgbGV0IHNpemUgPSA4XG4gICAgbGV0IHZtaGQgPSBkYXRhLnR5cGUgPT09ICd2aWRlbycgPyBGbXA0LnZtaGQoKSA6IEZtcDQuc21oZCgpXG4gICAgbGV0IGRpbmYgPSBGbXA0LmRpbmYoKVxuICAgIGxldCBzdGJsID0gRm1wNC5zdGJsKGRhdGEpO1xuICAgIFt2bWhkLCBkaW5mLCBzdGJsXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGhcbiAgICB9KVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goc2l6ZSwgJ21pbmYnLCB2bWhkLCBkaW5mLCBzdGJsKVxuICB9XG4gIHN0YXRpYyB2bWhkICgpIHtcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDIwLCAndm1oZCcsIG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIC8vIHZlcnNpb25cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDEsIC8vIGZsYWdzXG4gICAgICAweDAwLCAweDAwLCAvLyBncmFwaGljc21vZGVcbiAgICAgIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCAvLyBvcGNvbG9yXG4gICAgXSkpXG4gIH1cbiAgc3RhdGljIHNtaGQgKCkge1xuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTYsICdzbWhkJywgbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgLy8gdmVyc2lvblxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgIDB4MDAsIDB4MDAsIC8vIGJhbGFuY2VcbiAgICAgIDB4MDAsIDB4MDAgLy8gcmVzZXJ2ZWRcbiAgICBdKSlcbiAgfVxuICBzdGF0aWMgZGluZiAoKSB7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGxldCBkcmVmID0gWzB4MDAsIC8vIHZlcnNpb24gMFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDEsIC8vIGVudHJ5X2NvdW50XG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDBjLCAvLyBlbnRyeV9zaXplXG4gICAgICAweDc1LCAweDcyLCAweDZjLCAweDIwLCAvLyAndXJsJyB0eXBlXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uIDBcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDEgLy8gZW50cnlfZmxhZ3NcbiAgICBdXG4gICAgYnVmZmVyLndyaXRlKEZtcDQuc2l6ZSgzNiksIEZtcDQudHlwZSgnZGluZicpLCBGbXA0LnNpemUoMjgpLCBGbXA0LnR5cGUoJ2RyZWYnKSwgbmV3IFVpbnQ4QXJyYXkoZHJlZikpXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgc3RibCAoZGF0YSkge1xuICAgIGxldCBzaXplID0gOFxuICAgIGxldCBzdHNkID0gRm1wNC5zdHNkKGRhdGEpXG4gICAgbGV0IHN0dHMgPSBGbXA0LnN0dHMoKVxuICAgIGxldCBzdHNjID0gRm1wNC5zdHNjKClcbiAgICBsZXQgc3RzeiA9IEZtcDQuc3RzeigpXG4gICAgbGV0IHN0Y28gPSBGbXA0LnN0Y28oKTtcbiAgICBbc3RzZCwgc3R0cywgc3RzYywgc3Rzeiwgc3Rjb10uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KHNpemUsICdzdGJsJywgc3RzZCwgc3R0cywgc3RzYywgc3Rzeiwgc3RjbylcbiAgfVxuICBzdGF0aWMgc3RzZCAoZGF0YSkge1xuICAgIGxldCBjb250ZW50XG4gICAgaWYgKGRhdGEudHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgLy8gaWYgKCFkYXRhLmlzQUFDICYmIGRhdGEuY29kZWMgPT09ICdtcDQnKSB7XG4gICAgICAvLyAgICAgY29udGVudCA9IEZNUDQubXAzKGRhdGEpO1xuICAgICAgLy8gfSBlbHNlIHtcbiAgICAgIC8vXG4gICAgICAvLyB9XG4gICAgICAvLyDmlK/mjIFtcDRhXG4gICAgICBjb250ZW50ID0gRm1wNC5tcDRhKGRhdGEpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRlbnQgPSBGbXA0LmF2YzEoZGF0YSlcbiAgICB9XG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxNiArIGNvbnRlbnQuYnl0ZUxlbmd0aCwgJ3N0c2QnLCBGbXA0LmV4dGVuc2lvbigwLCAwKSwgbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4MDAsIDB4MDAsIDB4MDFdKSwgY29udGVudClcbiAgfVxuICBzdGF0aWMgbXA0YSAoZGF0YSkge1xuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAxLCAvLyBkYXRhX3JlZmVyZW5jZV9pbmRleFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCBkYXRhLmNoYW5uZWxDb3VudCwgLy8gY2hhbm5lbGNvdW50XG4gICAgICAweDAwLCAweDEwLCAvLyBzYW1wbGVTaXplOjE2Yml0c1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWQyXG4gICAgICAoZGF0YS5zYW1wbGVyYXRlID4+IDgpICYgMHhmZixcbiAgICAgIGRhdGEuc2FtcGxlcmF0ZSAmIDB4ZmYsIC8vXG4gICAgICAweDAwLCAweDAwXG4gICAgXSlcbiAgICBsZXQgZXNkcyA9IEZtcDQuZXNkcyhkYXRhLmNvbmZpZylcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDggKyBjb250ZW50LmJ5dGVMZW5ndGggKyBlc2RzLmJ5dGVMZW5ndGgsICdtcDRhJywgY29udGVudCwgZXNkcylcbiAgfVxuICBzdGF0aWMgZXNkcyAoY29uZmlnID0gWzQzLCAxNDYsIDgsIDBdKSB7XG4gICAgY29uc3QgY29uZmlnbGVuID0gY29uZmlnLmxlbmd0aFxuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIC8vIHZlcnNpb24gMFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcblxuICAgICAgMHgwMywgLy8gZGVzY3JpcHRvcl90eXBlXG4gICAgICAweDE3ICsgY29uZmlnbGVuLCAvLyBsZW5ndGhcbiAgICAgIDB4MDAsIDB4MDEsIC8vIGVzX2lkXG4gICAgICAweDAwLCAvLyBzdHJlYW1fcHJpb3JpdHlcblxuICAgICAgMHgwNCwgLy8gZGVzY3JpcHRvcl90eXBlXG4gICAgICAweDBmICsgY29uZmlnbGVuLCAvLyBsZW5ndGhcbiAgICAgIDB4NDAsIC8vIGNvZGVjIDogbXBlZzRfYXVkaW9cbiAgICAgIDB4MTUsIC8vIHN0cmVhbV90eXBlXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBidWZmZXJfc2l6ZVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gbWF4Qml0cmF0ZVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gYXZnQml0cmF0ZVxuXG4gICAgICAweDA1IC8vIGRlc2NyaXB0b3JfdHlwZVxuICAgIF0uY29uY2F0KFtjb25maWdsZW5dKS5jb25jYXQoY29uZmlnKS5jb25jYXQoWzB4MDYsIDB4MDEsIDB4MDJdKSlcbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKDggKyBjb250ZW50LmJ5dGVMZW5ndGgpLCBGbXA0LnR5cGUoJ2VzZHMnKSwgY29udGVudClcbiAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlclxuICB9XG4gIHN0YXRpYyBhdmMxIChkYXRhKSB7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGxldCBzaXplID0gNDAvLyA4KGF2YzEpKzgoYXZjYykrOChidHJ0KSsxNihwYXNwKVxuICAgIC8vIGxldCBzcHMgPSBkYXRhLnNwc1xuICAgIC8vIGxldCBwcHMgPSBkYXRhLnBwc1xuICAgIGxldCB3aWR0aCA9IGRhdGEud2lkdGhcbiAgICBsZXQgaGVpZ2h0ID0gZGF0YS5oZWlnaHRcbiAgICBsZXQgaFNwYWNpbmcgPSBkYXRhLnBhclJhdGlvLmhlaWdodFxuICAgIGxldCB2U3BhY2luZyA9IGRhdGEucGFyUmF0aW8ud2lkdGhcbiAgICAvLyBsZXQgYXZjY0J1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIC8vIGF2Y2NCdWZmZXIud3JpdGUobmV3IFVpbnQ4QXJyYXkoW1xuICAgIC8vICAgMHgwMSwgLy8gdmVyc2lvblxuICAgIC8vICAgc3BzWzFdLCAvLyBwcm9maWxlXG4gICAgLy8gICBzcHNbMl0sIC8vIHByb2ZpbGUgY29tcGF0aWJsZVxuICAgIC8vICAgc3BzWzNdLCAvLyBsZXZlbFxuICAgIC8vICAgMHhmYyB8IDMsXG4gICAgLy8gICAweEUwIHwgMSAvLyDnm67liY3lj6rlpITnkIbkuIDkuKpzcHNcbiAgICAvLyBdLmNvbmNhdChbc3BzLmxlbmd0aCA+Pj4gOCAmIDB4ZmYsIHNwcy5sZW5ndGggJiAweGZmXSkpKVxuICAgIC8vIGF2Y2NCdWZmZXIud3JpdGUoc3BzLCBuZXcgVWludDhBcnJheShbMSwgcHBzLmxlbmd0aCA+Pj4gOCAmIDB4ZmYsIHBwcy5sZW5ndGggJiAweGZmXSksIHBwcylcblxuICAgIGxldCBhdmNjID0gZGF0YS5hdmNjXG4gICAgbGV0IGF2YzEgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIDB4MDEsIC8vIGRhdGFfcmVmZXJlbmNlX2luZGV4XG4gICAgICAweDAwLCAweDAwLCAvLyBwcmVfZGVmaW5lZFxuICAgICAgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcHJlX2RlZmluZWRcbiAgICAgICh3aWR0aCA+PiA4KSAmIDB4ZmYsXG4gICAgICB3aWR0aCAmIDB4ZmYsIC8vIHdpZHRoXG4gICAgICAoaGVpZ2h0ID4+IDgpICYgMHhmZixcbiAgICAgIGhlaWdodCAmIDB4ZmYsIC8vIGhlaWdodFxuICAgICAgMHgwMCwgMHg0OCwgMHgwMCwgMHgwMCwgLy8gaG9yaXpyZXNvbHV0aW9uXG4gICAgICAweDAwLCAweDQ4LCAweDAwLCAweDAwLCAvLyB2ZXJ0cmVzb2x1dGlvblxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIDB4MDEsIC8vIGZyYW1lX2NvdW50XG4gICAgICAweDEyLFxuICAgICAgMHg2NCwgMHg2MSwgMHg2OSwgMHg2QywgLy8gZGFpbHltb3Rpb24vaGxzLmpzXG4gICAgICAweDc5LCAweDZELCAweDZGLCAweDc0LFxuICAgICAgMHg2OSwgMHg2RiwgMHg2RSwgMHgyRixcbiAgICAgIDB4NjgsIDB4NkMsIDB4NzMsIDB4MkUsXG4gICAgICAweDZBLCAweDczLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBjb21wcmVzc29ybmFtZVxuICAgICAgMHgwMCwgMHgxOCwgLy8gZGVwdGggPSAyNFxuICAgICAgMHgxMSwgMHgxMV0pIC8vIHByZV9kZWZpbmVkID0gLTFcbiAgICBsZXQgYnRydCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIDB4MWMsIDB4OWMsIDB4ODAsIC8vIGJ1ZmZlclNpemVEQlxuICAgICAgMHgwMCwgMHgyZCwgMHhjNiwgMHhjMCwgLy8gbWF4Qml0cmF0ZVxuICAgICAgMHgwMCwgMHgyZCwgMHhjNiwgMHhjMCAvLyBhdmdCaXRyYXRlXG4gICAgXSlcbiAgICBsZXQgcGFzcCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIChoU3BhY2luZyA+PiAyNCksIC8vIGhTcGFjaW5nXG4gICAgICAoaFNwYWNpbmcgPj4gMTYpICYgMHhmZixcbiAgICAgIChoU3BhY2luZyA+PiA4KSAmIDB4ZmYsXG4gICAgICBoU3BhY2luZyAmIDB4ZmYsXG4gICAgICAodlNwYWNpbmcgPj4gMjQpLCAvLyB2U3BhY2luZ1xuICAgICAgKHZTcGFjaW5nID4+IDE2KSAmIDB4ZmYsXG4gICAgICAodlNwYWNpbmcgPj4gOCkgJiAweGZmLFxuICAgICAgdlNwYWNpbmcgJiAweGZmXG4gICAgXSlcblxuICAgIGJ1ZmZlci53cml0ZShcbiAgICAgIEZtcDQuc2l6ZShzaXplICsgYXZjMS5ieXRlTGVuZ3RoICsgYXZjYy5ieXRlTGVuZ3RoICsgYnRydC5ieXRlTGVuZ3RoKSwgRm1wNC50eXBlKCdhdmMxJyksIGF2YzEsXG4gICAgICBGbXA0LnNpemUoOCArIGF2Y2MuYnl0ZUxlbmd0aCksIEZtcDQudHlwZSgnYXZjQycpLCBhdmNjLFxuICAgICAgRm1wNC5zaXplKDIwKSwgRm1wNC50eXBlKCdidHJ0JyksIGJ0cnQsXG4gICAgICBGbXA0LnNpemUoMTYpLCBGbXA0LnR5cGUoJ3Bhc3AnKSwgcGFzcFxuICAgIClcbiAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlclxuICB9XG4gIHN0YXRpYyBzdHRzICgpIHtcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIC8vIHZlcnNpb25cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwIC8vIGVudHJ5X2NvdW50XG4gICAgXSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDE2LCAnc3R0cycsIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIHN0c2MgKCkge1xuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgLy8gdmVyc2lvblxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAgLy8gZW50cnlfY291bnRcbiAgICBdKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTYsICdzdHNjJywgY29udGVudClcbiAgfVxuICBzdGF0aWMgc3RjbyAoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCAvLyBlbnRyeV9jb3VudFxuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxNiwgJ3N0Y28nLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyBzdHN6ICgpIHtcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIC8vIHZlcnNpb25cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBzYW1wbGVfc2l6ZVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCAvLyBzYW1wbGVfY291bnRcbiAgICBdKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goMjAsICdzdHN6JywgY29udGVudClcbiAgfVxuICBzdGF0aWMgbXZleCAoZHVyYXRpb24sIHRpbWVzY2FsZSA9IDEwMDAsIHRyYWNrSUQpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IG1laGQgPSBCdWZmZXIud3JpdGVVaW50MzIoZHVyYXRpb24pXG4gICAgYnVmZmVyLndyaXRlKEZtcDQuc2l6ZSg1NiksIEZtcDQudHlwZSgnbXZleCcpLCBGbXA0LnNpemUoMTYpLCBGbXA0LnR5cGUoJ21laGQnKSwgRm1wNC5leHRlbnNpb24oMCwgMCksIG1laGQsIEZtcDQudHJleCh0cmFja0lEKSlcbiAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlclxuICB9XG4gIHN0YXRpYyB0cmV4IChpZCkge1xuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgLy8gdmVyc2lvbiAwXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgKGlkID4+IDI0KSxcbiAgICAgIChpZCA+PiAxNikgJiAweGZmLFxuICAgICAgKGlkID4+IDgpICYgMHhmZixcbiAgICAgIChpZCAmIDB4ZmYpLCAvLyB0cmFja19JRFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMSwgLy8gZGVmYXVsdF9zYW1wbGVfZGVzY3JpcHRpb25faW5kZXhcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGRlZmF1bHRfc2FtcGxlX2R1cmF0aW9uXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBkZWZhdWx0X3NhbXBsZV9zaXplXG4gICAgICAweDAwLCAweDAxLCAweDAwLCAweDAxIC8vIGRlZmF1bHRfc2FtcGxlX2ZsYWdzXG4gICAgXSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDggKyBjb250ZW50LmJ5dGVMZW5ndGgsICd0cmV4JywgY29udGVudClcbiAgfVxuICBzdGF0aWMgbW9vZiAoZGF0YSkge1xuICAgIGxldCBzaXplID0gOFxuICAgIGxldCBtZmhkID0gRm1wNC5tZmhkKClcbiAgICBsZXQgdHJhZiA9IEZtcDQudHJhZihkYXRhKTtcbiAgICBbbWZoZCwgdHJhZl0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KHNpemUsICdtb29mJywgbWZoZCwgdHJhZilcbiAgfVxuICBzdGF0aWMgbWZoZCAoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBCdWZmZXIud3JpdGVVaW50MzIoRm1wNC5zZXF1ZW5jZSlcbiAgICBGbXA0LnNlcXVlbmNlICs9IDFcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDE2LCAnbWZoZCcsIEZtcDQuZXh0ZW5zaW9uKDAsIDApLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyB0cmFmIChkYXRhKSB7XG4gICAgbGV0IHNpemUgPSA4XG4gICAgbGV0IHRmaGQgPSBGbXA0LnRmaGQoZGF0YS5pZClcbiAgICBsZXQgdGZkdCA9IEZtcDQudGZkdChkYXRhLnRpbWUpXG4gICAgbGV0IHNkdHAgPSBGbXA0LnNkdHAoZGF0YSlcbiAgICBsZXQgdHJ1biA9IEZtcDQudHJ1bihkYXRhLCBzZHRwLmJ5dGVMZW5ndGgpO1xuXG4gICAgW3RmaGQsIHRmZHQsIHRydW4sIHNkdHBdLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aFxuICAgIH0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveChzaXplLCAndHJhZicsIHRmaGQsIHRmZHQsIHRydW4sIHNkdHApXG4gIH1cbiAgc3RhdGljIHRmaGQgKGlkKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBCdWZmZXIud3JpdGVVaW50MzIoaWQpXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxNiwgJ3RmaGQnLCBGbXA0LmV4dGVuc2lvbigwLCAwKSwgY29udGVudClcbiAgfVxuICBzdGF0aWMgdGZkdCAodGltZSkge1xuICAgIC8vIGxldCB1cHBlciA9IE1hdGguZmxvb3IodGltZSAvIChVSU5UMzJfTUFYICsgMSkpLFxuICAgIC8vICAgICBsb3dlciA9IE1hdGguZmxvb3IodGltZSAlIChVSU5UMzJfTUFYICsgMSkpO1xuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTYsICd0ZmR0JywgRm1wNC5leHRlbnNpb24oMCwgMCksIEJ1ZmZlci53cml0ZVVpbnQzMih0aW1lKSlcbiAgfVxuICBzdGF0aWMgdHJ1biAoZGF0YSwgc2R0cExlbmd0aCkge1xuICAgIC8vIGxldCBpZCA9IGRhdGEuaWQ7XG4gICAgLy8gbGV0IGNlaWwgPSBpZCA9PT0gMSA/IDE2IDogMTI7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGxldCBzYW1wbGVDb3VudCA9IEJ1ZmZlci53cml0ZVVpbnQzMihkYXRhLnNhbXBsZXMubGVuZ3RoKVxuICAgIC8vIG1kYXQtaGVhZGVyIDhcbiAgICAvLyBtb29mLWhlYWRlciA4XG4gICAgLy8gbWZoZCAxNlxuICAgIC8vIHRyYWYtaGVhZGVyIDhcbiAgICAvLyB0aGhkIDE2XG4gICAgLy8gdGZkdCAyMFxuICAgIC8vIHRydW4taGVhZGVyIDEyXG4gICAgLy8gc2FtcGxlQ291bnQgNFxuICAgIC8vIGRhdGEtb2Zmc2V0IDRcbiAgICAvLyBzYW1wbGVzLmxlbmd0aFxuICAgIGxldCBvZmZzZXQgPSBCdWZmZXIud3JpdGVVaW50MzIoOCArIDggKyAxNiArIDggKyAxNiArIDE2ICsgMTIgKyA0ICsgNCArIDE2ICogZGF0YS5zYW1wbGVzLmxlbmd0aCArIHNkdHBMZW5ndGgpXG4gICAgYnVmZmVyLndyaXRlKEZtcDQuc2l6ZSgyMCArIDE2ICogZGF0YS5zYW1wbGVzLmxlbmd0aCksIEZtcDQudHlwZSgndHJ1bicpLCBuZXcgVWludDhBcnJheShbMHgwMCwgMHgwMCwgMHgwRiwgMHgwMV0pLCBzYW1wbGVDb3VudCwgb2Zmc2V0KVxuXG4gICAgLy8gbGV0IHNpemUgPSBidWZmZXIuYnVmZmVyLmJ5dGVMZW5ndGhcbiAgICAvLyBsZXQgd3JpdGVPZmZzZXQgPSAwXG4gICAgLy8gZGF0YS5zYW1wbGVzLmZvckVhY2goKCkgPT4ge1xuICAgIC8vICAgc2l6ZSArPSAxNlxuICAgIC8vIH0pXG4gICAgLy9cbiAgICAvLyBsZXQgdHJ1bkJveCA9IG5ldyBVaW50OEFycmF5KHNpemUpXG5cbiAgICAvLyB0cnVuQm94LnNldChidWZmZXIuYnVmZmVyLCAwKVxuXG4gICAgZGF0YS5zYW1wbGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGZsYWdzID0gaXRlbS5mbGFnc1xuICAgICAgLy8gY29uc29sZS5sb2coaXRlbS50eXBlLCBpdGVtLmR0cywgaXRlbS5kdXJhdGlvbilcblxuICAgICAgYnVmZmVyLndyaXRlKG5ldyBVaW50OEFycmF5KFtcbiAgICAgICAgKGl0ZW0uZHVyYXRpb24gPj4+IDI0KSAmIDB4RkYsIC8vIHNhbXBsZV9kdXJhdGlvblxuICAgICAgICAoaXRlbS5kdXJhdGlvbiA+Pj4gMTYpICYgMHhGRixcbiAgICAgICAgKGl0ZW0uZHVyYXRpb24gPj4+IDgpICYgMHhGRixcbiAgICAgICAgKGl0ZW0uZHVyYXRpb24pICYgMHhGRixcbiAgICAgICAgKGl0ZW0uc2l6ZSA+Pj4gMjQpICYgMHhGRiwgLy8gc2FtcGxlX3NpemVcbiAgICAgICAgKGl0ZW0uc2l6ZSA+Pj4gMTYpICYgMHhGRixcbiAgICAgICAgKGl0ZW0uc2l6ZSA+Pj4gOCkgJiAweEZGLFxuICAgICAgICAoaXRlbS5zaXplKSAmIDB4RkYsXG4gICAgICAgIChmbGFncy5pc0xlYWRpbmcgPDwgMikgfCBmbGFncy5kZXBlbmRzT24sIC8vIHNhbXBsZV9mbGFnc1xuICAgICAgICAoZmxhZ3MuaXNEZXBlbmRlZE9uIDw8IDYpIHwgKGZsYWdzLmhhc1JlZHVuZGFuY3kgPDwgNCkgfCBmbGFncy5pc05vblN5bmMsXG4gICAgICAgIDB4MDAsIDB4MDAsIC8vIHNhbXBsZV9kZWdyYWRhdGlvbl9wcmlvcml0eVxuICAgICAgICAoaXRlbS5jdHMgPj4+IDI0KSAmIDB4RkYsIC8vIHNhbXBsZV9jb21wb3NpdGlvbl90aW1lX29mZnNldFxuICAgICAgICAoaXRlbS5jdHMgPj4+IDE2KSAmIDB4RkYsXG4gICAgICAgIChpdGVtLmN0cyA+Pj4gOCkgJiAweEZGLFxuICAgICAgICAoaXRlbS5jdHMpICYgMHhGRlxuICAgICAgXSkpXG4gICAgICAvLyB3cml0ZU9mZnNldCArPSAxNlxuICAgICAgLy8gYnVmZmVyLndyaXRlKEJ1ZmZlci53cml0ZVVpbnQzMigwKSk7XG4gICAgfSlcbiAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlclxuICB9XG4gIHN0YXRpYyBzZHRwIChkYXRhKSB7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoMTIgKyBkYXRhLnNhbXBsZXMubGVuZ3RoKSwgRm1wNC50eXBlKCdzZHRwJyksIEZtcDQuZXh0ZW5zaW9uKDAsIDApKVxuICAgIGRhdGEuc2FtcGxlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgY29uc3QgZmxhZ3MgPSBpdGVtLmZsYWdzXG4gICAgICBjb25zdCBudW0gPSAoZmxhZ3MuaXNMZWFkaW5nIDw8IDYpIHwgLy8gaXNfbGVhZGluZzogMiAoYml0KVxuICAgICAgICAoZmxhZ3MuZGVwZW5kc09uIDw8IDQpIHwgLy8gc2FtcGxlX2RlcGVuZHNfb25cbiAgICAgICAgKGZsYWdzLmlzRGVwZW5kZWRPbiA8PCAyKSB8IC8vIHNhbXBsZV9pc19kZXBlbmRlZF9vblxuICAgICAgICAoZmxhZ3MuaGFzUmVkdW5kYW5jeSkvLyBzYW1wbGVfaGFzX3JlZHVuZGFuY3lcblxuICAgICAgYnVmZmVyLndyaXRlKG5ldyBVaW50OEFycmF5KFtudW1dKSlcbiAgICB9KVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIG1kYXQgKGRhdGEpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IHNpemUgPSA4XG4gICAgZGF0YS5zYW1wbGVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzaXplICs9IGl0ZW0uc2l6ZVxuICAgIH0pXG4gICAgYnVmZmVyLndyaXRlKEZtcDQuc2l6ZShzaXplKSwgRm1wNC50eXBlKCdtZGF0JykpXG4gICAgbGV0IG1kYXRCb3ggPSBuZXcgVWludDhBcnJheShzaXplKVxuICAgIGxldCBvZmZzZXQgPSAwXG4gICAgbWRhdEJveC5zZXQoYnVmZmVyLmJ1ZmZlciwgb2Zmc2V0KVxuICAgIG9mZnNldCArPSA4XG4gICAgZGF0YS5zYW1wbGVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpdGVtLmJ1ZmZlci5mb3JFYWNoKCh1bml0KSA9PiB7XG4gICAgICAgIG1kYXRCb3guc2V0KHVuaXQsIG9mZnNldClcbiAgICAgICAgb2Zmc2V0ICs9IHVuaXQuYnl0ZUxlbmd0aFxuICAgICAgICAvLyBidWZmZXIud3JpdGUodW5pdC5kYXRhKTtcbiAgICAgIH0pXG4gICAgfSlcbiAgICByZXR1cm4gbWRhdEJveFxuICB9XG59XG5GbXA0LnR5cGUgPSAobmFtZSkgPT4ge1xuICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoW25hbWUuY2hhckNvZGVBdCgwKSwgbmFtZS5jaGFyQ29kZUF0KDEpLCBuYW1lLmNoYXJDb2RlQXQoMiksIG5hbWUuY2hhckNvZGVBdCgzKV0pXG59XG5GbXA0LnNlcXVlbmNlID0gMVxuXG5leHBvcnQgZGVmYXVsdCBGbXA0XG4iLCJpbXBvcnQge1xuICBFVkVOVFMsXG4gIHNuaWZmZXIsXG4gIE1lZGlhU2VnbWVudExpc3QsXG4gIEJ1ZmZlclxufSBmcm9tICd4Z3BsYXllci11dGlscyc7XG5pbXBvcnQgRm1wNCBmcm9tICcuL2ZtcDQnXG5cbmNvbnN0IFJFTVVYX0VWRU5UUyA9IEVWRU5UUy5SRU1VWF9FVkVOVFNcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXA0UmVtdXhlciB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLl9kdHNCYXNlID0gMFxuICAgIHRoaXMuX2lzRHRzQmFzZUluaXRlZCA9IGZhbHNlXG5cbiAgICB0aGlzLmlzRmlyc3RWaWRlbyA9IHRydWVcbiAgICB0aGlzLmlzRmlyc3RBdWRpbyA9IHRydWVcblxuICAgIHRoaXMudmlkZW9BbGxEdXJhdGlvbiA9IDBcbiAgICB0aGlzLmF1ZGlvQWxsRHVyYXRpb24gPSAwXG4gIH1cblxuICBpbml0ICgpIHtcbiAgICB0aGlzLm9uKFJFTVVYX0VWRU5UUy5SRU1VWF9NRURJQSwgdGhpcy5yZW11eC5iaW5kKHRoaXMpKVxuICAgIHRoaXMub24oUkVNVVhfRVZFTlRTLlJFTVVYX01FVEFEQVRBLCB0aGlzLm9uTWV0YURhdGFSZWFkeS5iaW5kKHRoaXMpKVxuICAgIHRoaXMub24oUkVNVVhfRVZFTlRTLkRFVEVDVF9DSEFOR0VfU1RSRUFNLCB0aGlzLnJlc2V0RHRzQmFzZS5iaW5kKHRoaXMpKVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5fZHRzQmFzZSA9IC0xXG4gICAgdGhpcy5fZHRzQmFzZUluaXRlZCA9IGZhbHNlXG4gIH1cblxuICByZXNldCAoKSB7XG4gICAgdGhpcy5fZHRzQmFzZSA9IDBcbiAgICB0aGlzLl9pc0R0c0Jhc2VJbml0ZWQgPSBmYWxzZVxuICB9XG5cbiAgcmVtdXggKCkge1xuICAgIGNvbnN0IHsgYXVkaW9UcmFjaywgdmlkZW9UcmFjayB9ID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJylcbiAgICAhdGhpcy5faXNEdHNCYXNlSW5pdGVkICYmIHRoaXMuY2FsY0R0c0Jhc2UoYXVkaW9UcmFjaywgdmlkZW9UcmFjaylcblxuICAgIHRoaXMuX3JlbXV4VmlkZW8odmlkZW9UcmFjaylcbiAgICB0aGlzLl9yZW11eEF1ZGlvKGF1ZGlvVHJhY2spXG4gIH1cblxuICByZXNldER0c0Jhc2UgKCkge1xuICAgIC8vIGZvciBobHMg5Lit6YCU5YiH5o2iIG1ldGHlkI5zZWVrXG4gICAgdGhpcy5fZHRzQmFzZSA9IDBcbiAgICB0aGlzLl9kdHNCYXNlSW5pdGVkID0gZmFsc2VcbiAgfVxuXG4gIHNlZWsgKCkge1xuXG4gIH1cblxuICBvbk1ldGFEYXRhUmVhZHkgKHR5cGUpIHtcbiAgICBsZXQgdHJhY2tcblxuICAgIGlmICh0eXBlID09PSAnYXVkaW8nKSB7XG4gICAgICBjb25zdCB7IGF1ZGlvVHJhY2sgfSA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpXG4gICAgICB0cmFjayA9IGF1ZGlvVHJhY2s7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHsgdmlkZW9UcmFjayB9ID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJylcbiAgICAgIHRyYWNrID0gdmlkZW9UcmFjaztcbiAgICB9XG5cbiAgICBsZXQgcHJlc291cmNlYnVmZmVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnUFJFX1NPVVJDRV9CVUZGRVInKTtcbiAgICBsZXQgc291cmNlID0gcHJlc291cmNlYnVmZmVyLmdldFNvdXJjZSh0eXBlKTtcbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgc291cmNlID0gcHJlc291cmNlYnVmZmVyLmNyZWF0ZVNvdXJjZSh0eXBlKTtcbiAgICB9XG5cbiAgICBzb3VyY2UubWltZXR5cGUgPSB0cmFjay5tZXRhLmNvZGVjO1xuICAgIHNvdXJjZS5pbml0ID0gdGhpcy5yZW11eEluaXRTZWdtZW50KHR5cGUsIHRyYWNrLm1ldGEpO1xuICAgIC8vIHNvdXJjZS5pbml0ZWQgPSBmYWxzZTtcblxuICAgIC8vIHRoaXMucmVzZXREdHNCYXNlKClcbiAgICB0aGlzLmVtaXQoUkVNVVhfRVZFTlRTLklOSVRfU0VHTUVOVCwgdHlwZSlcbiAgfVxuXG4gIHJlbXV4SW5pdFNlZ21lbnQgKHR5cGUsIG1ldGEpIHtcbiAgICBsZXQgaW5pdFNlZ21lbnQgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgZnR5cCA9IEZtcDQuZnR5cCgpXG4gICAgbGV0IG1vb3YgPSBGbXA0Lm1vb3YoeyB0eXBlLCBtZXRhOiBtZXRhIH0pXG5cbiAgICBpbml0U2VnbWVudC53cml0ZShmdHlwLCBtb292KVxuICAgIHJldHVybiBpbml0U2VnbWVudDtcbiAgfVxuXG4gIGNhbGNEdHNCYXNlIChhdWRpb1RyYWNrLCB2aWRlb1RyYWNrKSB7XG4gICAgaWYgKCFhdWRpb1RyYWNrLnNhbXBsZXMubGVuZ3RoICYmICF2aWRlb1RyYWNrLnNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGF1ZGlvQmFzZSA9IEluZmluaXR5XG4gICAgbGV0IHZpZGVvQmFzZSA9IEluZmluaXR5XG5cbiAgICBpZiAoYXVkaW9UcmFjay5zYW1wbGVzICYmIGF1ZGlvVHJhY2suc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIGF1ZGlvQmFzZSA9IGF1ZGlvVHJhY2suc2FtcGxlc1swXS5kdHNcbiAgICB9XG4gICAgaWYgKHZpZGVvVHJhY2suc2FtcGxlcyAmJiB2aWRlb1RyYWNrLnNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICB2aWRlb0Jhc2UgPSB2aWRlb1RyYWNrLnNhbXBsZXNbMF0uZHRzXG4gICAgfVxuXG4gICAgdGhpcy5fZHRzQmFzZSA9IE1hdGgubWluKGF1ZGlvQmFzZSwgdmlkZW9CYXNlKVxuICAgIHRoaXMuX2lzRHRzQmFzZUluaXRlZCA9IHRydWVcbiAgfVxuXG4gIF9yZW11eFZpZGVvICh2aWRlb1RyYWNrKSB7XG4gICAgY29uc3QgdHJhY2sgPSB2aWRlb1RyYWNrXG5cbiAgICBpZiAoIXZpZGVvVHJhY2suc2FtcGxlcyB8fCAhdmlkZW9UcmFjay5zYW1wbGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IHtzYW1wbGVzfSA9IHRyYWNrXG4gICAgbGV0IGZpcnN0RHRzID0gLTFcblxuICAgIGxldCBpbml0U2VnbWVudCA9IG51bGxcbiAgICBjb25zdCBtcDRTYW1wbGVzID0gW11cbiAgICBjb25zdCBtZGF0Qm94ID0ge1xuICAgICAgc2FtcGxlczogW11cbiAgICB9XG5cbiAgICB3aGlsZSAoc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGF2Y1NhbXBsZSA9IHNhbXBsZXMuc2hpZnQoKVxuXG4gICAgICBjb25zdCB7IGlzS2V5ZnJhbWUsIG9wdGlvbnMgfSA9IGF2Y1NhbXBsZVxuICAgICAgaWYgKCF0aGlzLmlzRmlyc3RBdWRpbyAmJiBvcHRpb25zICYmIG9wdGlvbnMubWV0YSkge1xuICAgICAgICBpbml0U2VnbWVudCA9IHRoaXMucmVtdXhJbml0U2VnbWVudCgndmlkZW8nLCBvcHRpb25zLm1ldGEpXG4gICAgICAgIG9wdGlvbnMubWV0YSA9IG51bGxcbiAgICAgICAgc2FtcGxlcy51bnNoaWZ0KGF2Y1NhbXBsZSlcbiAgICAgICAgaWYgKCFvcHRpb25zLmlzQ29udGludWUpIHtcbiAgICAgICAgICB0aGlzLnJlc2V0RHRzQmFzZSgpXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGxldCBkdHMgPSBhdmNTYW1wbGUuZHRzIC0gdGhpcy5fZHRzQmFzZVxuXG4gICAgICBpZiAoZmlyc3REdHMgPT09IC0xKSB7XG4gICAgICAgIGZpcnN0RHRzID0gZHRzXG4gICAgICB9XG5cbiAgICAgIGxldCBjdHNcbiAgICAgIGxldCBwdHNcbiAgICAgIGlmIChhdmNTYW1wbGUucHRzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcHRzID0gYXZjU2FtcGxlLnB0cyAtIHRoaXMuX2R0c0Jhc2VcbiAgICAgICAgY3RzID0gcHRzIC0gZHRzXG4gICAgICB9XG4gICAgICBpZiAoYXZjU2FtcGxlLmN0cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHB0cyA9IGF2Y1NhbXBsZS5jdHMgKyBkdHNcbiAgICAgICAgY3RzID0gYXZjU2FtcGxlLmN0c1xuICAgICAgfVxuXG4gICAgICBsZXQgbWRhdFNhbXBsZSA9IHtcbiAgICAgICAgYnVmZmVyOiBbXSxcbiAgICAgICAgc2l6ZTogMFxuICAgICAgfVxuICAgICAgbWRhdEJveC5zYW1wbGVzLnB1c2gobWRhdFNhbXBsZSlcbiAgICAgIG1kYXRTYW1wbGUuYnVmZmVyLnB1c2goYXZjU2FtcGxlLmRhdGEpXG4gICAgICBtZGF0U2FtcGxlLnNpemUgKz0gYXZjU2FtcGxlLmRhdGEuYnl0ZUxlbmd0aFxuXG4gICAgICBsZXQgc2FtcGxlRHVyYXRpb24gPSAwXG4gICAgICBpZiAoc2FtcGxlcy5sZW5ndGggPj0gMSkge1xuICAgICAgICBjb25zdCBuZXh0RHRzID0gc2FtcGxlc1swXS5kdHMgLSB0aGlzLl9kdHNCYXNlXG4gICAgICAgIHNhbXBsZUR1cmF0aW9uID0gbmV4dER0cyAtIGR0c1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG1wNFNhbXBsZXMubGVuZ3RoID49IDEpIHsgLy8gbGFzdGVzdCBzYW1wbGUsIHVzZSBzZWNvbmQgbGFzdCBkdXJhdGlvblxuICAgICAgICAgIHNhbXBsZUR1cmF0aW9uID0gbXA0U2FtcGxlc1ttcDRTYW1wbGVzLmxlbmd0aCAtIDFdLmR1cmF0aW9uXG4gICAgICAgIH0gZWxzZSB7IC8vIHRoZSBvbmx5IG9uZSBzYW1wbGUsIHVzZSByZWZlcmVuY2UgZHVyYXRpb25cbiAgICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IHRoaXMudmlkZW9NZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMudmlkZW9BbGxEdXJhdGlvbiArPSBzYW1wbGVEdXJhdGlvblxuICAgICAgLy8gY29uc29sZS5sb2coYGR0cyAke2R0c31gLCBgcHRzICR7cHRzfWAsIGBjdHM6ICR7Y3RzfWAsIGBkdXJhdGlvbjogJHtzYW1wbGVEdXJhdGlvbn1gLCBhdmNTYW1wbGUpXG4gICAgICBtcDRTYW1wbGVzLnB1c2goe1xuICAgICAgICBkdHMsXG4gICAgICAgIGN0cyxcbiAgICAgICAgcHRzLFxuICAgICAgICBkYXRhOiBhdmNTYW1wbGUuZGF0YSxcbiAgICAgICAgc2l6ZTogYXZjU2FtcGxlLmRhdGEuYnl0ZUxlbmd0aCxcbiAgICAgICAgaXNLZXlmcmFtZSxcbiAgICAgICAgZHVyYXRpb246IHNhbXBsZUR1cmF0aW9uLFxuICAgICAgICBmbGFnczoge1xuICAgICAgICAgIGlzTGVhZGluZzogMCxcbiAgICAgICAgICBkZXBlbmRzT246IGlzS2V5ZnJhbWUgPyAyIDogMSxcbiAgICAgICAgICBpc0RlcGVuZGVkT246IGlzS2V5ZnJhbWUgPyAxIDogMCxcbiAgICAgICAgICBoYXNSZWR1bmRhbmN5OiAwLFxuICAgICAgICAgIGlzTm9uU3luYzogaXNLZXlmcmFtZSA/IDAgOiAxXG4gICAgICAgIH0sXG4gICAgICAgIG9yaWdpbkR0czogZHRzLFxuICAgICAgICB0eXBlOiAndmlkZW8nXG4gICAgICB9KVxuICAgIH1cblxuICAgIGxldCBtb29mTWRhdCA9IG5ldyBCdWZmZXIoKVxuICAgIGlmIChtcDRTYW1wbGVzLmxlbmd0aCkge1xuICAgICAgY29uc3QgbW9vZiA9IEZtcDQubW9vZih7XG4gICAgICAgIGlkOiB0cmFjay5tZXRhLmlkLFxuICAgICAgICB0aW1lOiBmaXJzdER0cyxcbiAgICAgICAgc2FtcGxlczogbXA0U2FtcGxlc1xuICAgICAgfSlcbiAgICAgIGNvbnN0IG1kYXQgPSBGbXA0Lm1kYXQobWRhdEJveClcbiAgICAgIG1vb2ZNZGF0LndyaXRlKG1vb2YsIG1kYXQpXG5cbiAgICAgIHRoaXMud3JpdGVUb1NvdXJjZSgndmlkZW8nLCBtb29mTWRhdClcbiAgICB9XG5cbiAgICBpZiAoaW5pdFNlZ21lbnQpIHtcbiAgICAgIHRoaXMud3JpdGVUb1NvdXJjZSgndmlkZW8nLCBpbml0U2VnbWVudClcblxuICAgICAgaWYgKHNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICAgIC8vIHNlY29uZCBwYXJ0IG9mIHN0cmVhbSBjaGFuZ2VcbiAgICAgICAgdHJhY2suc2FtcGxlcyA9IHNhbXBsZXM7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZW11eFZpZGVvKHRyYWNrKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaXNGaXJzdFZpZGVvID0gZmFsc2VcbiAgICB0aGlzLmVtaXQoUkVNVVhfRVZFTlRTLk1FRElBX1NFR01FTlQsICd2aWRlbycpXG5cbiAgICBjb25zdCBsYXN0U2FtcGxlID0gbXA0U2FtcGxlc1ttcDRTYW1wbGVzLmxlbmd0aCAtIDFdXG4gICAgdGhpcy5fdmlkZW9OZXh0RHRzID0gbGFzdFNhbXBsZS5kdHMgKyBsYXN0U2FtcGxlLmR1cmF0aW9uO1xuICAgIHRyYWNrLnNhbXBsZXMgPSBbXVxuICAgIHRyYWNrLmxlbmd0aCA9IDBcbiAgfVxuXG4gIF9yZW11eEF1ZGlvICh0cmFjaykge1xuICAgIGNvbnN0IHtzYW1wbGVzfSA9IHRyYWNrXG4gICAgbGV0IGZpcnN0RHRzID0gLTFcbiAgICBsZXQgbXA0U2FtcGxlcyA9IFtdXG5cbiAgICBsZXQgaW5pdFNlZ21lbnQgPSBudWxsXG4gICAgY29uc3QgbWRhdEJveCA9IHtcbiAgICAgIHNhbXBsZXM6IFtdXG4gICAgfVxuICAgIGlmICghc2FtcGxlcyB8fCAhc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBsZXQgaXNGaXJzdER0c0luaXRlZCA9IGZhbHNlXG4gICAgd2hpbGUgKHNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICBsZXQgc2FtcGxlID0gc2FtcGxlcy5zaGlmdCgpXG4gICAgICBjb25zdCB7IGRhdGEsIG9wdGlvbnMgfSA9IHNhbXBsZVxuICAgICAgaWYgKCF0aGlzLmlzRmlyc3RBdWRpbyAmJiBvcHRpb25zICYmIG9wdGlvbnMubWV0YSkge1xuICAgICAgICBpbml0U2VnbWVudCA9IHRoaXMucmVtdXhJbml0U2VnbWVudCgnYXVkaW8nLCBvcHRpb25zLm1ldGEpXG4gICAgICAgIG9wdGlvbnMubWV0YSA9IG51bGw7XG4gICAgICAgIHNhbXBsZXMudW5zaGlmdChzYW1wbGUpXG4gICAgICAgIGlmICghb3B0aW9ucy5pc0NvbnRpbnVlKSB7XG4gICAgICAgICAgdGhpcy5yZXNldER0c0Jhc2UoKVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBsZXQgZHRzID0gc2FtcGxlLmR0cyAtIHRoaXMuX2R0c0Jhc2VcbiAgICAgIGNvbnN0IG9yaWdpbkR0cyA9IGR0c1xuICAgICAgaWYgKCFpc0ZpcnN0RHRzSW5pdGVkKSB7XG4gICAgICAgIGZpcnN0RHRzID0gZHRzXG4gICAgICAgIGlzRmlyc3REdHNJbml0ZWQgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGxldCBzYW1wbGVEdXJhdGlvbiA9IDBcblxuICAgICAgaWYgKHRoaXMuYXVkaW9NZXRhLnJlZlNhbXBsZUR1cmF0aW9uRml4ZWQpIHtcbiAgICAgICAgc2FtcGxlRHVyYXRpb24gPSB0aGlzLmF1ZGlvTWV0YS5yZWZTYW1wbGVEdXJhdGlvbkZpeGVkXG4gICAgICB9IGVsc2UgaWYgKHNhbXBsZXMubGVuZ3RoID49IDEpIHtcbiAgICAgICAgY29uc3QgbmV4dER0cyA9IHNhbXBsZXNbMF0uZHRzIC0gdGhpcy5fZHRzQmFzZTtcbiAgICAgICAgc2FtcGxlRHVyYXRpb24gPSBuZXh0RHRzIC0gZHRzXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobXA0U2FtcGxlcy5sZW5ndGggPj0gMSkgeyAvLyB1c2Ugc2Vjb25kIGxhc3Qgc2FtcGxlIGR1cmF0aW9uXG4gICAgICAgICAgc2FtcGxlRHVyYXRpb24gPSBtcDRTYW1wbGVzW21wNFNhbXBsZXMubGVuZ3RoIC0gMV0uZHVyYXRpb25cbiAgICAgICAgfSBlbHNlIHsgLy8gdGhlIG9ubHkgb25lIHNhbXBsZSwgdXNlIHJlZmVyZW5jZSBzYW1wbGUgZHVyYXRpb25cbiAgICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IHRoaXMuYXVkaW9NZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gY29uc29sZS5sb2coJ3JlbXV4IGF1ZGlvICcsIGR0cylcbiAgICAgIHRoaXMuYXVkaW9BbGxEdXJhdGlvbiArPSBzYW1wbGVEdXJhdGlvblxuICAgICAgY29uc3QgbXA0U2FtcGxlID0ge1xuICAgICAgICBkdHMsXG4gICAgICAgIHB0czogZHRzLFxuICAgICAgICBjdHM6IDAsXG4gICAgICAgIHNpemU6IGRhdGEuYnl0ZUxlbmd0aCxcbiAgICAgICAgZHVyYXRpb246IHNhbXBsZS5kdXJhdGlvbiA/IHNhbXBsZS5kdXJhdGlvbiA6IHNhbXBsZUR1cmF0aW9uLFxuICAgICAgICBmbGFnczoge1xuICAgICAgICAgIGlzTGVhZGluZzogMCxcbiAgICAgICAgICBkZXBlbmRzT246IDIsXG4gICAgICAgICAgaXNEZXBlbmRlZE9uOiAxLFxuICAgICAgICAgIGhhc1JlZHVuZGFuY3k6IDAsXG4gICAgICAgICAgaXNOb25TeW5jOiAwXG4gICAgICAgIH0sXG4gICAgICAgIGlzS2V5ZnJhbWU6IHRydWUsXG4gICAgICAgIG9yaWdpbkR0cyxcbiAgICAgICAgdHlwZTogJ2F1ZGlvJ1xuICAgICAgfVxuXG4gICAgICBsZXQgbWRhdFNhbXBsZSA9IHtcbiAgICAgICAgYnVmZmVyOiBbXSxcbiAgICAgICAgc2l6ZTogMFxuICAgICAgfVxuICAgICAgbWRhdFNhbXBsZS5idWZmZXIucHVzaChkYXRhKVxuICAgICAgbWRhdFNhbXBsZS5zaXplICs9IGRhdGEuYnl0ZUxlbmd0aFxuXG4gICAgICBtZGF0Qm94LnNhbXBsZXMucHVzaChtZGF0U2FtcGxlKVxuXG4gICAgICBtcDRTYW1wbGVzLnB1c2gobXA0U2FtcGxlKVxuICAgIH1cblxuICAgIGNvbnN0IG1vb2ZNZGF0ID0gbmV3IEJ1ZmZlcigpXG5cbiAgICBpZiAobXA0U2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IG1vb2YgPSBGbXA0Lm1vb2Yoe1xuICAgICAgICBpZDogdHJhY2subWV0YS5pZCxcbiAgICAgICAgdGltZTogZmlyc3REdHMsXG4gICAgICAgIHNhbXBsZXM6IG1wNFNhbXBsZXNcbiAgICAgIH0pXG4gICAgICBjb25zdCBtZGF0ID0gRm1wNC5tZGF0KG1kYXRCb3gpXG4gICAgICBtb29mTWRhdC53cml0ZShtb29mLCBtZGF0KVxuXG4gICAgICB0aGlzLndyaXRlVG9Tb3VyY2UoJ2F1ZGlvJywgbW9vZk1kYXQpXG4gICAgfVxuXG4gICAgaWYgKGluaXRTZWdtZW50KSB7XG4gICAgICB0aGlzLndyaXRlVG9Tb3VyY2UoJ2F1ZGlvJywgaW5pdFNlZ21lbnQpXG4gICAgICBpZiAoc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgICAgLy8gc2Vjb25kIHBhcnQgb2Ygc3RyZWFtIGNoYW5nZVxuICAgICAgICB0cmFjay5zYW1wbGVzID0gc2FtcGxlcztcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbXV4QXVkaW8odHJhY2spXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5pc0ZpcnN0QXVkaW8gPSBmYWxzZVxuICAgIHRoaXMuZW1pdChSRU1VWF9FVkVOVFMuTUVESUFfU0VHTUVOVCwgJ2F1ZGlvJywgbW9vZk1kYXQpXG5cbiAgICBjb25zdCBsYXN0U2FtcGxlID0gbXA0U2FtcGxlc1ttcDRTYW1wbGVzLmxlbmd0aCAtIDFdXG4gICAgdGhpcy5fdmlkZW9OZXh0RHRzID0gbGFzdFNhbXBsZS5kdHMgKyBsYXN0U2FtcGxlLmR1cmF0aW9uO1xuICAgIHRyYWNrLnNhbXBsZXMgPSBbXVxuICAgIHRyYWNrLmxlbmd0aCA9IDBcbiAgfVxuXG4gIHdyaXRlVG9Tb3VyY2UgKHR5cGUsIGJ1ZmZlcikge1xuICAgIGxldCBwcmVzb3VyY2VidWZmZXIgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdQUkVfU09VUkNFX0JVRkZFUicpO1xuICAgIGxldCBzb3VyY2UgPSBwcmVzb3VyY2VidWZmZXIuZ2V0U291cmNlKHR5cGUpO1xuICAgIGlmICghc291cmNlKSB7XG4gICAgICBzb3VyY2UgPSBwcmVzb3VyY2VidWZmZXIuY3JlYXRlU291cmNlKHR5cGUpO1xuICAgIH1cblxuICAgIHNvdXJjZS5kYXRhLnB1c2goYnVmZmVyKVxuICB9XG5cbiAgaW5pdFNpbGVudEF1ZGlvIChkdHMsIGR1cmF0aW9uKSB7XG4gICAgY29uc3QgdW5pdCA9IE1wNFJlbXV4ZXIuZ2V0U2lsZW50RnJhbWUodGhpcy5hdWRpb01ldGEuY2hhbm5lbENvdW50KVxuICAgIHJldHVybiB7XG4gICAgICBkdHMsXG4gICAgICBwdHM6IGR0cyxcbiAgICAgIGN0czogMCxcbiAgICAgIGR1cmF0aW9uLFxuICAgICAgdW5pdCxcbiAgICAgIHNpemU6IHVuaXQuYnl0ZUxlbmd0aCxcbiAgICAgIG9yaWdpbkR0czogZHRzLFxuICAgICAgdHlwZTogJ3ZpZGVvJ1xuICAgIH1cbiAgfVxuXG4gIGdldCB2aWRlb01ldGEgKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKS52aWRlb1RyYWNrLm1ldGFcbiAgfVxuICBnZXQgYXVkaW9NZXRhICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJykuYXVkaW9UcmFjay5tZXRhXG4gIH1cblxuICBzdGF0aWMgZ2V0U2lsZW50RnJhbWUgKGNoYW5uZWxDb3VudCkge1xuICAgIGlmIChjaGFubmVsQ291bnQgPT09IDEpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMywgMHg4MF0pXG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDIpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgyMSwgMHgwMCwgMHg0OSwgMHg5MCwgMHgwMiwgMHgxOSwgMHgwMCwgMHgyMywgMHg4MF0pXG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDMpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4ZV0pXG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDQpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4MCwgMHgyYywgMHg4MCwgMHgwOCwgMHgwMiwgMHgzOF0pXG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDUpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4MiwgMHgzMCwgMHgwNCwgMHg5OSwgMHgwMCwgMHgyMSwgMHg5MCwgMHgwMiwgMHgzOF0pXG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDYpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4MiwgMHgzMCwgMHgwNCwgMHg5OSwgMHgwMCwgMHgyMSwgMHg5MCwgMHgwMiwgMHgwMCwgMHhiMiwgMHgwMCwgMHgyMCwgMHgwOCwgMHhlMF0pXG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBDb250ZXh0OiByZXF1aXJlKCcuL3NyYy9jb250ZXh0JykuZGVmYXVsdCxcblxuICAvLyBNb2R1bGVzIGZyb20gY29uc3RhbnRzXG4gIEVWRU5UUzogcmVxdWlyZSgnLi9zcmMvY29uc3RhbnRzL2V2ZW50cycpLmRlZmF1bHQsXG4gIFdPUktFUl9DT01NQU5EUzogcmVxdWlyZSgnLi9zcmMvY29uc3RhbnRzL3dvcmtlci1jb21tYW5kcycpLmRlZmF1bHQsXG5cbiAgLy8gTW9kdWxlcyBmcm9tIGVudlxuICBzbmlmZmVyOiByZXF1aXJlKCcuL3NyYy9lbnYvc25pZmZlcicpLmRlZmF1bHQsXG4gIGlzTGU6IHJlcXVpcmUoJy4vc3JjL2Vudi9pc2xlJykuZGVmYXVsdCxcbiAgVVRGODogcmVxdWlyZSgnLi9zcmMvZW52L3V0ZjgnKS5kZWZhdWx0LFxuXG4gIC8vIE1vZGVsc1xuICBNZWRpYUluZm86IHJlcXVpcmUoJy4vc3JjL21vZGVscy9tZWRpYS1pbmZvJykuZGVmYXVsdCxcbiAgTWVkaWFTYW1wbGU6IHJlcXVpcmUoJy4vc3JjL21vZGVscy9tZWRpYS1zYW1wbGUnKS5kZWZhdWx0LFxuICBNZWRpYVNlZ21lbnQ6IHJlcXVpcmUoJy4vc3JjL21vZGVscy9tZWRpYS1zZWdtZW50JykuZGVmYXVsdCxcbiAgTWVkaWFTZWdtZW50TGlzdDogcmVxdWlyZSgnLi9zcmMvbW9kZWxzL21lZGlhLXNlZ21lbnQtbGlzdCcpLmRlZmF1bHQsXG4gIEF1ZGlvVHJhY2tNZXRhOiByZXF1aXJlKCcuL3NyYy9tb2RlbHMvdHJhY2stbWV0YScpLkF1ZGlvVHJhY2tNZXRhLFxuICBWaWRlb1RyYWNrTWV0YTogcmVxdWlyZSgnLi9zcmMvbW9kZWxzL3RyYWNrLW1ldGEnKS5WaWRlb1RyYWNrTWV0YSxcbiAgQXVkaW9UcmFja1NhbXBsZTogcmVxdWlyZSgnLi9zcmMvbW9kZWxzL3RyYWNrLXNhbXBsZScpLkF1ZGlvVHJhY2tTYW1wbGUsXG4gIFZpZGVvVHJhY2tTYW1wbGU6IHJlcXVpcmUoJy4vc3JjL21vZGVscy90cmFjay1zYW1wbGUnKS5WaWRlb1RyYWNrU2FtcGxlLFxuXG4gIC8vIE1vZHVsZXMgZnJvbSBtc2VcbiAgTXNlOiByZXF1aXJlKCcuL3NyYy9tc2UvaW5kZXgnKS5kZWZhdWx0LFxuXG4gIC8vIE1vZHVsZXMgZnJvbSB3cml0ZVxuICBTdHJlYW06IHJlcXVpcmUoJy4vc3JjL3dyaXRlL3N0cmVhbScpLmRlZmF1bHQsXG4gIEJ1ZmZlcjogcmVxdWlyZSgnLi9zcmMvd3JpdGUvYnVmZmVyJykuZGVmYXVsdCxcblxuICBNb2JpbGVWaWRlbzogcmVxdWlyZSgnLi9zcmMvbW9iaWxlL21vYmlsZS12aWRlbycpLFxuICAvLyBDcnlwdG9cbiAgQ3J5cHRvOiByZXF1aXJlKCcuL3NyYy9jcnlwdG8nKS5kZWZhdWx0XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChSZXN1bHRDb25zdHJ1Y3Rvcikge1xuICB2YXIgdG90YWxMZW5ndGggPSAwO1xuXG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcnJheXMgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJyYXlzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGFycmF5c1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgIHZhciBhcnIgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgdG90YWxMZW5ndGggKz0gYXJyLmxlbmd0aDtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIHJlc3VsdCA9IG5ldyBSZXN1bHRDb25zdHJ1Y3Rvcih0b3RhbExlbmd0aCk7XG4gIHZhciBvZmZzZXQgPSAwO1xuICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlO1xuICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7XG4gIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gYXJyYXlzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAyOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gKF9zdGVwMiA9IF9pdGVyYXRvcjIubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlKSB7XG4gICAgICB2YXIgX2FyciA9IF9zdGVwMi52YWx1ZTtcblxuICAgICAgcmVzdWx0LnNldChfYXJyLCBvZmZzZXQpO1xuICAgICAgb2Zmc2V0ICs9IF9hcnIubGVuZ3RoO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICBfaXRlcmF0b3JFcnJvcjIgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgJiYgX2l0ZXJhdG9yMi5yZXR1cm4pIHtcbiAgICAgICAgX2l0ZXJhdG9yMi5yZXR1cm4oKTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NvbmNhdCA9IHJlcXVpcmUoJy4vY29uY2F0Jyk7XG5cbnZhciBfY29uY2F0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmNhdCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbm1vZHVsZS5leHBvcnRzID0gX2NvbmNhdDIuZGVmYXVsdDsiLCJmdW5jdGlvbiB3ZWJwYWNrQm9vdHN0cmFwRnVuYyAobW9kdWxlcykge1xuLyoqKioqKi8gIC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovICB2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4vKioqKioqLyAgLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovICBmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbi8qKioqKiovICAgIC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gICAgaWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4vKioqKioqLyAgICAgIHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4vKioqKioqLyAgICAvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gICAgdmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gICAgICBpOiBtb2R1bGVJZCxcbi8qKioqKiovICAgICAgbDogZmFsc2UsXG4vKioqKioqLyAgICAgIGV4cG9ydHM6IHt9XG4vKioqKioqLyAgICB9O1xuXG4vKioqKioqLyAgICAvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovICAgIG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4vKioqKioqLyAgICAvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyAgICBtb2R1bGUubCA9IHRydWU7XG5cbi8qKioqKiovICAgIC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyAgfVxuXG4vKioqKioqLyAgLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovICBfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4vKioqKioqLyAgLy8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovICBfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4vKioqKioqLyAgLy8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuLyoqKioqKi8gIC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuLyoqKioqKi8gICAgaWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuLyoqKioqKi8gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuLyoqKioqKi8gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4vKioqKioqLyAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbi8qKioqKiovICAgICAgICBnZXQ6IGdldHRlclxuLyoqKioqKi8gICAgICB9KTtcbi8qKioqKiovICAgIH1cbi8qKioqKiovICB9O1xuXG4vKioqKioqLyAgLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbi8qKioqKiovICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4vKioqKioqLyAgfTtcblxuLyoqKioqKi8gIC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4vKioqKioqLyAgX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4vKioqKioqLyAgICB2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbi8qKioqKiovICAgICAgZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbi8qKioqKiovICAgICAgZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbi8qKioqKiovICAgIF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbi8qKioqKiovICAgIHJldHVybiBnZXR0ZXI7XG4vKioqKioqLyAgfTtcblxuLyoqKioqKi8gIC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuLyoqKioqKi8gIC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4vKioqKioqLyAgX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbi8qKioqKiovICAvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiAgdmFyIGYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IEVOVFJZX01PRFVMRSlcbiAgcmV0dXJuIGYuZGVmYXVsdCB8fCBmIC8vIHRyeSB0byBjYWxsIGRlZmF1bHQgaWYgZGVmaW5lZCB0byBhbHNvIHN1cHBvcnQgYmFiZWwgZXNtb2R1bGUgZXhwb3J0c1xufVxuXG52YXIgbW9kdWxlTmFtZVJlcUV4cCA9ICdbXFxcXC58XFxcXC18XFxcXCt8XFxcXHd8XFwvfEBdKydcbnZhciBkZXBlbmRlbmN5UmVnRXhwID0gJ1xcXFwoXFxcXHMqKFxcL1xcXFwqLio/XFxcXCpcXC8pP1xcXFxzKi4qPygnICsgbW9kdWxlTmFtZVJlcUV4cCArICcpLio/XFxcXCknIC8vIGFkZGl0aW9uYWwgY2hhcnMgd2hlbiBvdXRwdXQucGF0aGluZm8gaXMgdHJ1ZVxuXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNTkzNjYxLzEzMDQ0MlxuZnVuY3Rpb24gcXVvdGVSZWdFeHAgKHN0cikge1xuICByZXR1cm4gKHN0ciArICcnKS5yZXBsYWNlKC9bLj8qK14kW1xcXVxcXFwoKXt9fC1dL2csICdcXFxcJCYnKVxufVxuXG5mdW5jdGlvbiBpc051bWVyaWMobikge1xuICByZXR1cm4gIWlzTmFOKDEgKiBuKTsgLy8gMSAqIG4gY29udmVydHMgaW50ZWdlcnMsIGludGVnZXJzIGFzIHN0cmluZyAoXCIxMjNcIiksIDFlMyBhbmQgXCIxZTNcIiB0byBpbnRlZ2VycyBhbmQgc3RyaW5ncyB0byBOYU5cbn1cblxuZnVuY3Rpb24gZ2V0TW9kdWxlRGVwZW5kZW5jaWVzIChzb3VyY2VzLCBtb2R1bGUsIHF1ZXVlTmFtZSkge1xuICB2YXIgcmV0dmFsID0ge31cbiAgcmV0dmFsW3F1ZXVlTmFtZV0gPSBbXVxuXG4gIHZhciBmblN0cmluZyA9IG1vZHVsZS50b1N0cmluZygpXG4gIHZhciB3cmFwcGVyU2lnbmF0dXJlID0gZm5TdHJpbmcubWF0Y2goL15mdW5jdGlvblxccz9cXHcqXFwoXFx3KyxcXHMqXFx3KyxcXHMqKFxcdyspXFwpLylcbiAgaWYgKCF3cmFwcGVyU2lnbmF0dXJlKSByZXR1cm4gcmV0dmFsXG4gIHZhciB3ZWJwYWNrUmVxdWlyZU5hbWUgPSB3cmFwcGVyU2lnbmF0dXJlWzFdXG5cbiAgLy8gbWFpbiBidW5kbGUgZGVwc1xuICB2YXIgcmUgPSBuZXcgUmVnRXhwKCcoXFxcXFxcXFxufFxcXFxXKScgKyBxdW90ZVJlZ0V4cCh3ZWJwYWNrUmVxdWlyZU5hbWUpICsgZGVwZW5kZW5jeVJlZ0V4cCwgJ2cnKVxuICB2YXIgbWF0Y2hcbiAgd2hpbGUgKChtYXRjaCA9IHJlLmV4ZWMoZm5TdHJpbmcpKSkge1xuICAgIGlmIChtYXRjaFszXSA9PT0gJ2RsbC1yZWZlcmVuY2UnKSBjb250aW51ZVxuICAgIHJldHZhbFtxdWV1ZU5hbWVdLnB1c2gobWF0Y2hbM10pXG4gIH1cblxuICAvLyBkbGwgZGVwc1xuICByZSA9IG5ldyBSZWdFeHAoJ1xcXFwoJyArIHF1b3RlUmVnRXhwKHdlYnBhY2tSZXF1aXJlTmFtZSkgKyAnXFxcXChcIihkbGwtcmVmZXJlbmNlXFxcXHMoJyArIG1vZHVsZU5hbWVSZXFFeHAgKyAnKSlcIlxcXFwpXFxcXCknICsgZGVwZW5kZW5jeVJlZ0V4cCwgJ2cnKVxuICB3aGlsZSAoKG1hdGNoID0gcmUuZXhlYyhmblN0cmluZykpKSB7XG4gICAgaWYgKCFzb3VyY2VzW21hdGNoWzJdXSkge1xuICAgICAgcmV0dmFsW3F1ZXVlTmFtZV0ucHVzaChtYXRjaFsxXSlcbiAgICAgIHNvdXJjZXNbbWF0Y2hbMl1dID0gX193ZWJwYWNrX3JlcXVpcmVfXyhtYXRjaFsxXSkubVxuICAgIH1cbiAgICByZXR2YWxbbWF0Y2hbMl1dID0gcmV0dmFsW21hdGNoWzJdXSB8fCBbXVxuICAgIHJldHZhbFttYXRjaFsyXV0ucHVzaChtYXRjaFs0XSlcbiAgfVxuXG4gIC8vIGNvbnZlcnQgMWUzIGJhY2sgdG8gMTAwMCAtIHRoaXMgY2FuIGJlIGltcG9ydGFudCBhZnRlciB1Z2xpZnktanMgY29udmVydGVkIDEwMDAgdG8gMWUzXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMocmV0dmFsKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCByZXR2YWxba2V5c1tpXV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIGlmIChpc051bWVyaWMocmV0dmFsW2tleXNbaV1dW2pdKSkge1xuICAgICAgICByZXR2YWxba2V5c1tpXV1bal0gPSAxICogcmV0dmFsW2tleXNbaV1dW2pdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXR2YWxcbn1cblxuZnVuY3Rpb24gaGFzVmFsdWVzSW5RdWV1ZXMgKHF1ZXVlcykge1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHF1ZXVlcylcbiAgcmV0dXJuIGtleXMucmVkdWNlKGZ1bmN0aW9uIChoYXNWYWx1ZXMsIGtleSkge1xuICAgIHJldHVybiBoYXNWYWx1ZXMgfHwgcXVldWVzW2tleV0ubGVuZ3RoID4gMFxuICB9LCBmYWxzZSlcbn1cblxuZnVuY3Rpb24gZ2V0UmVxdWlyZWRNb2R1bGVzIChzb3VyY2VzLCBtb2R1bGVJZCkge1xuICB2YXIgbW9kdWxlc1F1ZXVlID0ge1xuICAgIG1haW46IFttb2R1bGVJZF1cbiAgfVxuICB2YXIgcmVxdWlyZWRNb2R1bGVzID0ge1xuICAgIG1haW46IFtdXG4gIH1cbiAgdmFyIHNlZW5Nb2R1bGVzID0ge1xuICAgIG1haW46IHt9XG4gIH1cblxuICB3aGlsZSAoaGFzVmFsdWVzSW5RdWV1ZXMobW9kdWxlc1F1ZXVlKSkge1xuICAgIHZhciBxdWV1ZXMgPSBPYmplY3Qua2V5cyhtb2R1bGVzUXVldWUpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBxdWV1ZU5hbWUgPSBxdWV1ZXNbaV1cbiAgICAgIHZhciBxdWV1ZSA9IG1vZHVsZXNRdWV1ZVtxdWV1ZU5hbWVdXG4gICAgICB2YXIgbW9kdWxlVG9DaGVjayA9IHF1ZXVlLnBvcCgpXG4gICAgICBzZWVuTW9kdWxlc1txdWV1ZU5hbWVdID0gc2Vlbk1vZHVsZXNbcXVldWVOYW1lXSB8fCB7fVxuICAgICAgaWYgKHNlZW5Nb2R1bGVzW3F1ZXVlTmFtZV1bbW9kdWxlVG9DaGVja10gfHwgIXNvdXJjZXNbcXVldWVOYW1lXVttb2R1bGVUb0NoZWNrXSkgY29udGludWVcbiAgICAgIHNlZW5Nb2R1bGVzW3F1ZXVlTmFtZV1bbW9kdWxlVG9DaGVja10gPSB0cnVlXG4gICAgICByZXF1aXJlZE1vZHVsZXNbcXVldWVOYW1lXSA9IHJlcXVpcmVkTW9kdWxlc1txdWV1ZU5hbWVdIHx8IFtdXG4gICAgICByZXF1aXJlZE1vZHVsZXNbcXVldWVOYW1lXS5wdXNoKG1vZHVsZVRvQ2hlY2spXG4gICAgICB2YXIgbmV3TW9kdWxlcyA9IGdldE1vZHVsZURlcGVuZGVuY2llcyhzb3VyY2VzLCBzb3VyY2VzW3F1ZXVlTmFtZV1bbW9kdWxlVG9DaGVja10sIHF1ZXVlTmFtZSlcbiAgICAgIHZhciBuZXdNb2R1bGVzS2V5cyA9IE9iamVjdC5rZXlzKG5ld01vZHVsZXMpXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG5ld01vZHVsZXNLZXlzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIG1vZHVsZXNRdWV1ZVtuZXdNb2R1bGVzS2V5c1tqXV0gPSBtb2R1bGVzUXVldWVbbmV3TW9kdWxlc0tleXNbal1dIHx8IFtdXG4gICAgICAgIG1vZHVsZXNRdWV1ZVtuZXdNb2R1bGVzS2V5c1tqXV0gPSBtb2R1bGVzUXVldWVbbmV3TW9kdWxlc0tleXNbal1dLmNvbmNhdChuZXdNb2R1bGVzW25ld01vZHVsZXNLZXlzW2pdXSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVxdWlyZWRNb2R1bGVzXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG1vZHVsZUlkLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIHZhciBzb3VyY2VzID0ge1xuICAgIG1haW46IF9fd2VicGFja19tb2R1bGVzX19cbiAgfVxuXG4gIHZhciByZXF1aXJlZE1vZHVsZXMgPSBvcHRpb25zLmFsbCA/IHsgbWFpbjogT2JqZWN0LmtleXMoc291cmNlcy5tYWluKSB9IDogZ2V0UmVxdWlyZWRNb2R1bGVzKHNvdXJjZXMsIG1vZHVsZUlkKVxuXG4gIHZhciBzcmMgPSAnJ1xuXG4gIE9iamVjdC5rZXlzKHJlcXVpcmVkTW9kdWxlcykuZmlsdGVyKGZ1bmN0aW9uIChtKSB7IHJldHVybiBtICE9PSAnbWFpbicgfSkuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlKSB7XG4gICAgdmFyIGVudHJ5TW9kdWxlID0gMFxuICAgIHdoaWxlIChyZXF1aXJlZE1vZHVsZXNbbW9kdWxlXVtlbnRyeU1vZHVsZV0pIHtcbiAgICAgIGVudHJ5TW9kdWxlKytcbiAgICB9XG4gICAgcmVxdWlyZWRNb2R1bGVzW21vZHVsZV0ucHVzaChlbnRyeU1vZHVsZSlcbiAgICBzb3VyY2VzW21vZHVsZV1bZW50cnlNb2R1bGVdID0gJyhmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHsgbW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fOyB9KSdcbiAgICBzcmMgPSBzcmMgKyAndmFyICcgKyBtb2R1bGUgKyAnID0gKCcgKyB3ZWJwYWNrQm9vdHN0cmFwRnVuYy50b1N0cmluZygpLnJlcGxhY2UoJ0VOVFJZX01PRFVMRScsIEpTT04uc3RyaW5naWZ5KGVudHJ5TW9kdWxlKSkgKyAnKSh7JyArIHJlcXVpcmVkTW9kdWxlc1ttb2R1bGVdLm1hcChmdW5jdGlvbiAoaWQpIHsgcmV0dXJuICcnICsgSlNPTi5zdHJpbmdpZnkoaWQpICsgJzogJyArIHNvdXJjZXNbbW9kdWxlXVtpZF0udG9TdHJpbmcoKSB9KS5qb2luKCcsJykgKyAnfSk7XFxuJ1xuICB9KVxuXG4gIHNyYyA9IHNyYyArICduZXcgKCgnICsgd2VicGFja0Jvb3RzdHJhcEZ1bmMudG9TdHJpbmcoKS5yZXBsYWNlKCdFTlRSWV9NT0RVTEUnLCBKU09OLnN0cmluZ2lmeShtb2R1bGVJZCkpICsgJykoeycgKyByZXF1aXJlZE1vZHVsZXMubWFpbi5tYXAoZnVuY3Rpb24gKGlkKSB7IHJldHVybiAnJyArIEpTT04uc3RyaW5naWZ5KGlkKSArICc6ICcgKyBzb3VyY2VzLm1haW5baWRdLnRvU3RyaW5nKCkgfSkuam9pbignLCcpICsgJ30pKShzZWxmKTsnXG5cbiAgdmFyIGJsb2IgPSBuZXcgd2luZG93LkJsb2IoW3NyY10sIHsgdHlwZTogJ3RleHQvamF2YXNjcmlwdCcgfSlcbiAgaWYgKG9wdGlvbnMuYmFyZSkgeyByZXR1cm4gYmxvYiB9XG5cbiAgdmFyIFVSTCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTCB8fCB3aW5kb3cubW96VVJMIHx8IHdpbmRvdy5tc1VSTFxuXG4gIHZhciB3b3JrZXJVcmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpXG4gIHZhciB3b3JrZXIgPSBuZXcgd2luZG93Lldvcmtlcih3b3JrZXJVcmwpXG4gIHdvcmtlci5vYmplY3RVUkwgPSB3b3JrZXJVcmxcblxuICByZXR1cm4gd29ya2VyXG59XG4iLCJjb25zdCBMT0FERVJfRVZFTlRTID0ge1xuICBMQURFUl9TVEFSVDogJ0xPQURFUl9TVEFSVCcsXG4gIExPQURFUl9EQVRBTE9BREVEOiAnTE9BREVSX0RBVEFMT0FERUQnLFxuICBMT0FERVJfQ09NUExFVEU6ICdMT0FERVJfQ09NUExFVEUnLFxuICBMT0FERVJfRVJST1I6ICdMT0FERVJfRVJST1InXG59XG5cbmNvbnN0IERFTVVYX0VWRU5UUyA9IHtcbiAgREVNVVhfU1RBUlQ6ICdERU1VWF9TVEFSVCcsXG4gIERFTVVYX0NPTVBMRVRFOiAnREVNVVhfQ09NUExFVEUnLFxuICBERU1VWF9FUlJPUjogJ0RFTVVYX0VSUk9SJyxcbiAgTUVUQURBVEFfUEFSU0VEOiAnTUVUQURBVEFfUEFSU0VEJyxcbiAgVklERU9fTUVUQURBVEFfQ0hBTkdFOiAnVklERU9fTUVUQURBVEFfQ0hBTkdFJyxcbiAgQVVESU9fTUVUQURBVEFfQ0hBTkdFOiAnQVVESU9fTUVUQURBVEFfQ0hBTkdFJyxcbiAgTUVESUFfSU5GTzogJ01FRElBX0lORk8nXG59XG5cbmNvbnN0IFJFTVVYX0VWRU5UUyA9IHtcbiAgUkVNVVhfTUVUQURBVEE6ICdSRU1VWF9NRVRBREFUQScsXG4gIFJFTVVYX01FRElBOiAnUkVNVVhfTUVESUEnLFxuICBNRURJQV9TRUdNRU5UOiAnTUVESUFfU0VHTUVOVCcsXG4gIFJFTVVYX0VSUk9SOiAnUkVNVVhfRVJST1InLFxuICBJTklUX1NFR01FTlQ6ICdJTklUX1NFR01FTlQnLFxuICBERVRFQ1RfQ0hBTkdFX1NUUkVBTTogJ0RFVEVDVF9DSEFOR0VfU1RSRUFNJ1xufVxuXG5jb25zdCBNU0VfRVZFTlRTID0ge1xuICBTT1VSQ0VfVVBEQVRFX0VORDogJ1NPVVJDRV9VUERBVEVfRU5EJ1xufVxuXG4vLyBobHPkuJPmnIlldmVudHNcbmNvbnN0IEhMU19FVkVOVFMgPSB7XG4gIFJFVFJZX1RJTUVfRVhDRUVERUQ6ICdSRVRSWV9USU1FX0VYQ0VFREVEJ1xufVxuXG5jb25zdCBDUllUT19FVkVOVFMgPSB7XG4gIFNUQVJUX0RFQ1JZUFQ6ICdTVEFSVF9ERUNSWVBUJyxcbiAgREVDUllQVEVEOiAnREVDUllQVEVEJ1xufVxuY29uc3QgQUxMRVZFTlRTID0gT2JqZWN0LmFzc2lnbih7fSwgTE9BREVSX0VWRU5UUywgREVNVVhfRVZFTlRTLCBSRU1VWF9FVkVOVFMsIE1TRV9FVkVOVFMsIEhMU19FVkVOVFMpXG5cbmNvbnN0IEZsdkFsbG93ZWRFdmVudHMgPSBbXVxuY29uc3QgSGxzQWxsb3dlZEV2ZW50cyA9IFtdXG5cbmZvciAobGV0IGtleSBpbiBBTExFVkVOVFMpIHtcbiAgaWYgKEFMTEVWRU5UUy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgRmx2QWxsb3dlZEV2ZW50cy5wdXNoKEFMTEVWRU5UU1trZXldKVxuICB9XG59XG5cbmZvciAobGV0IGtleSBpbiBBTExFVkVOVFMpIHtcbiAgaWYgKEFMTEVWRU5UUy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgSGxzQWxsb3dlZEV2ZW50cy5wdXNoKEFMTEVWRU5UU1trZXldKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgQUxMRVZFTlRTLFxuICBITFNfRVZFTlRTLFxuICBSRU1VWF9FVkVOVFMsXG4gIERFTVVYX0VWRU5UUyxcbiAgTVNFX0VWRU5UUyxcbiAgTE9BREVSX0VWRU5UUyxcbiAgRmx2QWxsb3dlZEV2ZW50cyxcbiAgSGxzQWxsb3dlZEV2ZW50cyxcbiAgQ1JZVE9fRVZFTlRTXG59O1xuIiwiZXhwb3J0IGNvbnN0IENPTlRFWFRfQ09NT01BTkRTID0ge1xuICBPTjogJ29uJyxcbiAgT05DRTogJ29uY2UnLFxuICBPRkY6ICdvZmYnLFxuICBFTUlUOiAnZW1pdCcsXG4gIERFU1RST1k6ICdkZXN0cm95J1xufVxuIiwiaW1wb3J0IE1lZGlhSW5mbyBmcm9tICcuL21vZGVscy9tZWRpYS1pbmZvJ1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJ1xuXG5jb25zdCBESVJFQ1RfRU1JVF9GTEFHID0gJ19fVE9fXydcblxuY2xhc3MgQ29udGV4dCB7XG4gIGNvbnN0cnVjdG9yIChhbGxvd2VkRXZlbnRzID0gW10pIHtcbiAgICB0aGlzLl9lbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpXG4gICAgdGhpcy5faW5zdGFuY2VNYXAgPSB7fSAvLyDmiYDmnInnmoTop6PnoIHmtYHnqIvlrp7kvotcbiAgICB0aGlzLl9jbHNNYXAgPSB7fSAvLyDmnoTpgKDlh73mlbDnmoRtYXBcbiAgICB0aGlzLl9pbml0ZWQgPSBmYWxzZVxuICAgIHRoaXMubWVkaWFJbmZvID0gbmV3IE1lZGlhSW5mbygpXG4gICAgdGhpcy5hbGxvd2VkRXZlbnRzID0gYWxsb3dlZEV2ZW50c1xuICAgIHRoaXMuX2hvb2tzID0ge30gLy8g5rOo5YaM5Zyo5LqL5Lu25YmNL+WQjueahOmSqeWtkO+8jOS+i+WmgiBiZWZvcmUoJ0RFTVVYX0NPTVBMRVRFJylcbiAgfVxuXG4gIC8qKlxuICAgKiDku47kuIrkuIvmlofkuK3ojrflj5bop6PnoIHmtYHnqIvlrp7kvovvvIzlpoLmnpzmsqHmnInlrp7kvovvvIzmnoTpgKDkuIDkuKpcbiAgICogQHBhcmFtIHRhZ1xuICAgKiBAcGFyYW0gYXJnc1xuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldEluc3RhbmNlICh0YWcpIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuX2luc3RhbmNlTWFwW3RhZ11cbiAgICBpZiAoaW5zdGFuY2UpIHtcbiAgICAgIHJldHVybiBpbnN0YW5jZVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0aHJvdyBuZXcgRXJyb3IoYCR7dGFnfeWunuS+i+WwmuacquWIneWni+WMlmApXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDliJ3lp4vljJblhbfkvZPlrp7kvotcbiAgICogQHBhcmFtIHRhZ1xuICAgKiBAcGFyYW0gYXJnc1xuICAgKi9cbiAgaW5pdEluc3RhbmNlICh0YWcsIC4uLmFyZ3MpIHtcbiAgICBpZiAodGhpcy5fY2xzTWFwW3RhZ10pIHtcbiAgICAgIGNvbnN0IG5ld0luc3RhbmNlID0gbmV3IHRoaXMuX2Nsc01hcFt0YWddKC4uLmFyZ3MpXG4gICAgICB0aGlzLl9pbnN0YW5jZU1hcFt0YWddID0gbmV3SW5zdGFuY2VcbiAgICAgIGlmIChuZXdJbnN0YW5jZS5pbml0KSB7XG4gICAgICAgIG5ld0luc3RhbmNlLmluaXQoKSAvLyBUT0RPOiBsaWZlY2lyY2xlXG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3SW5zdGFuY2VcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3RhZ33mnKrlnKhjb250ZXh05Lit5rOo5YaMYClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog6YG/5YWN5aSn6YeP55qEaW5pdEluc3RhbmNl6LCD55So77yM5Yid5aeL5YyW5omA5pyJ55qE57uE5Lu2XG4gICAqIEBwYXJhbSBjb25maWdcbiAgICovXG4gIGluaXQgKGNvbmZpZykge1xuICAgIGlmICh0aGlzLl9pbml0ZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBmb3IgKGxldCB0YWcgaW4gdGhpcy5fY2xzTWFwKSB7XG4gICAgICAvLyBpZiBub3QgaW5pdGVkLCBpbml0IGFuIGluc3RhbmNlXG4gICAgICBpZiAodGhpcy5fY2xzTWFwLmhhc093blByb3BlcnR5KHRhZykgJiYgIXRoaXMuX2luc3RhbmNlTWFwW3RhZ10pIHtcbiAgICAgICAgdGhpcy5pbml0SW5zdGFuY2UodGFnLCBjb25maWcpXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2luaXRlZCA9IHRydWVcbiAgfVxuXG4gIC8qKlxuICAgKiDms6jlhozkuIDkuKrkuIrkuIvmlofmtYHnqIvvvIzmj5DkvpvlronlhajnmoTkuovku7blj5HpgIHmnLrliLZcbiAgICogQHBhcmFtIHRhZ1xuICAgKiBAcGFyYW0gY2xzXG4gICAqL1xuICByZWdpc3RyeSAodGFnLCBjbHMpIHtcbiAgICBjb25zdCBlbWl0dGVyID0gdGhpcy5fZW1pdHRlclxuICAgIGNvbnN0IGNoZWNrTWVzc2FnZU5hbWUgPSB0aGlzLl9pc01lc3NhZ2VOYW1lVmFsaWQuYmluZCh0aGlzKVxuICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgY29uc3QgZW5oYW5jZWQgPSBjbGFzcyBleHRlbmRzIGNscyB7XG4gICAgICBjb25zdHJ1Y3RvciAoLi4uYXJncykge1xuICAgICAgICBzdXBlciguLi5hcmdzKVxuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHt9XG4gICAgICAgIHRoaXMub25jZUxpc3RlbmVycyA9IHt9XG4gICAgICAgIHRoaXMuVEFHID0gdGFnXG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBzZWxmXG4gICAgICB9XG5cbiAgICAgIG9uIChtZXNzYWdlTmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgY2hlY2tNZXNzYWdlTmFtZShtZXNzYWdlTmFtZSlcblxuICAgICAgICBpZiAodGhpcy5saXN0ZW5lcnNbbWVzc2FnZU5hbWVdKSB7XG4gICAgICAgICAgdGhpcy5saXN0ZW5lcnNbbWVzc2FnZU5hbWVdLnB1c2goY2FsbGJhY2spXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5saXN0ZW5lcnNbbWVzc2FnZU5hbWVdID0gW2NhbGxiYWNrXVxuICAgICAgICB9XG5cbiAgICAgICAgZW1pdHRlci5vbihgJHttZXNzYWdlTmFtZX0ke0RJUkVDVF9FTUlUX0ZMQUd9JHt0YWd9YCwgY2FsbGJhY2spIC8vIOW7uueri+WumuWQkemAmuS/oeebkeWQrFxuICAgICAgICByZXR1cm4gZW1pdHRlci5vbihtZXNzYWdlTmFtZSwgY2FsbGJhY2spXG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICog5Zyo5p+Q5Liq5LqL5Lu26Kem5Y+R5YmN5omn6KGMXG4gICAgICAgKiBAcGFyYW0gbWVzc2FnZU5hbWVcbiAgICAgICAqIEBwYXJhbSBjYWxsYmFja1xuICAgICAgICovXG4gICAgICBiZWZvcmUgKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaykge1xuICAgICAgICBjaGVja01lc3NhZ2VOYW1lKG1lc3NhZ2VOYW1lKVxuICAgICAgICBpZiAoc2VsZi5faG9va3NbbWVzc2FnZU5hbWVdKSB7XG4gICAgICAgICAgc2VsZi5faG9va3NbbWVzc2FnZU5hbWVdLnB1c2goY2FsbGJhY2spXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VsZi5faG9va3NbbWVzc2FnZU5hbWVdID0gW2NhbGxiYWNrXVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG9uY2UgKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaykge1xuICAgICAgICBjaGVja01lc3NhZ2VOYW1lKG1lc3NhZ2VOYW1lKVxuXG4gICAgICAgIGlmICh0aGlzLm9uY2VMaXN0ZW5lcnNbbWVzc2FnZU5hbWVdKSB7XG4gICAgICAgICAgdGhpcy5vbmNlTGlzdGVuZXJzW21lc3NhZ2VOYW1lXS5wdXNoKGNhbGxiYWNrKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMub25jZUxpc3RlbmVyc1ttZXNzYWdlTmFtZV0gPSBbY2FsbGJhY2tdXG4gICAgICAgIH1cblxuICAgICAgICBlbWl0dGVyLm9uY2UoYCR7bWVzc2FnZU5hbWV9JHtESVJFQ1RfRU1JVF9GTEFHfSR7dGFnfWAsIGNhbGxiYWNrKVxuICAgICAgICByZXR1cm4gZW1pdHRlci5vbmNlKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaylcbiAgICAgIH1cblxuICAgICAgZW1pdCAobWVzc2FnZU5hbWUsIC4uLmFyZ3MpIHtcbiAgICAgICAgY2hlY2tNZXNzYWdlTmFtZShtZXNzYWdlTmFtZSlcblxuICAgICAgICBjb25zdCBiZWZvcmVMaXN0ID0gc2VsZi5faG9va3MgPyBzZWxmLl9ob29rc1ttZXNzYWdlTmFtZV0gOiBudWxsXG5cbiAgICAgICAgaWYgKGJlZm9yZUxpc3QpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYmVmb3JlTGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSBiZWZvcmVMaXN0W2ldXG4gICAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbWl0dGVyLmVtaXQobWVzc2FnZU5hbWUsIC4uLmFyZ3MpXG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICog5a6a5ZCR5Y+R6YCB57uZ5p+Q5Liq57uE5Lu25Y2V5L6L55qE5raI5oGvXG4gICAgICAgKiBAcGFyYW0gbWVzc2FnZU5hbWVcbiAgICAgICAqIEBwYXJhbSBhcmdzXG4gICAgICAgKi9cbiAgICAgIGVtaXRUbyAodGFnLCBtZXNzYWdlTmFtZSwgLi4uYXJncykge1xuICAgICAgICBjaGVja01lc3NhZ2VOYW1lKG1lc3NhZ2VOYW1lKVxuXG4gICAgICAgIHJldHVybiBlbWl0dGVyLmVtaXQoYCR7bWVzc2FnZU5hbWV9JHtESVJFQ1RfRU1JVF9GTEFHfSR7dGFnfWAsIC4uLmFyZ3MpXG4gICAgICB9XG5cbiAgICAgIG9mZiAobWVzc2FnZU5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNoZWNrTWVzc2FnZU5hbWUobWVzc2FnZU5hbWUpXG4gICAgICAgIHJldHVybiBlbWl0dGVyLm9mZihtZXNzYWdlTmFtZSwgY2FsbGJhY2spXG4gICAgICB9XG5cbiAgICAgIHJlbW92ZUxpc3RlbmVycyAoKSB7XG4gICAgICAgIGNvbnN0IGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuYmluZCh0aGlzLmxpc3RlbmVycylcblxuICAgICAgICBmb3IgKGxldCBtZXNzYWdlTmFtZSBpbiB0aGlzLmxpc3RlbmVycykge1xuICAgICAgICAgIGlmIChoYXNPd24obWVzc2FnZU5hbWUpKSB7XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLmxpc3RlbmVyc1ttZXNzYWdlTmFtZV0gfHwgW11cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrID0gY2FsbGJhY2tzW2ldXG4gICAgICAgICAgICAgIGVtaXR0ZXIub2ZmKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaylcbiAgICAgICAgICAgICAgZW1pdHRlci5vZmYoYCR7bWVzc2FnZU5hbWV9JHtESVJFQ1RfRU1JVF9GTEFHfSR7dGFnfWAsIGNhbGxiYWNrKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IG1lc3NhZ2VOYW1lIGluIHRoaXMub25jZUxpc3RlbmVycykge1xuICAgICAgICAgIGlmIChoYXNPd24obWVzc2FnZU5hbWUpKSB7XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLm9uY2VMaXN0ZW5lcnNbbWVzc2FnZU5hbWVdIHx8IFtdXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IGNhbGxiYWNrc1tpXVxuICAgICAgICAgICAgICBlbWl0dGVyLm9mZihtZXNzYWdlTmFtZSwgY2FsbGJhY2spXG4gICAgICAgICAgICAgIGVtaXR0ZXIub2ZmKGAke21lc3NhZ2VOYW1lfSR7RElSRUNUX0VNSVRfRkxBR30ke3RhZ31gLCBjYWxsYmFjaylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiDlnKjnu4Tku7bplIDmr4Hml7bvvIzpu5jorqTlsIblroPms6jlhoznmoTkuovku7blhajpg6jljbjovb3vvIznoa7kv53kuI3kvJrpgKDmiJDlhoXlrZjms4TmvI9cbiAgICAgICAqL1xuICAgICAgZGVzdHJveSAoKSB7XG4gICAgICAgIC8vIHN0ZXAxIHVubGlzdGVuIGV2ZW50c1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVycygpXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0ge31cblxuICAgICAgICAvLyBzdGVwMiByZWxlYXNlIGZyb20gY29udGV4dFxuICAgICAgICBkZWxldGUgc2VsZi5faW5zdGFuY2VNYXBbdGFnXVxuICAgICAgICBpZiAoc3VwZXIuZGVzdHJveSkge1xuICAgICAgICAgIHJldHVybiBzdXBlci5kZXN0cm95KClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9jbHNNYXBbdGFnXSA9IGVuaGFuY2VkXG5cbiAgICAvKipcbiAgICAgKiBnZXQgaW5zdGFuY2UgaW1tZWRpYXRlbHlcbiAgICAgKiBlLmcgY29uc3QgaW5zdGFuY2UgPSBjb250ZXh0LnJlZ2lzdHJ5KHRhZywgQ2xzKShjb25maWcpXG4gICAgICogKi9cbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmluaXRJbnN0YW5jZSh0YWcsIC4uLmFyZ3MpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOWvueWtmOWcqOeahOWunuS+i+i/m+ihjFxuICAgKi9cbiAgZGVzdHJveUluc3RhbmNlcyAoKSB7XG4gICAgT2JqZWN0LmtleXModGhpcy5faW5zdGFuY2VNYXApLmZvckVhY2goKHRhZykgPT4ge1xuICAgICAgaWYgKHRoaXMuX2luc3RhbmNlTWFwW3RhZ10uZGVzdHJveSkge1xuICAgICAgICB0aGlzLl9pbnN0YW5jZU1hcFt0YWddLmRlc3Ryb3koKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICog57yW6Kej56CB5rWB56iL5peg6ZyA5YWz5rOo5LqL5Lu255qE6Kej57uRXG4gICAqL1xuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLl9lbWl0dGVyID0gbnVsbFxuICAgIHRoaXMuYWxsb3dlZEV2ZW50cyA9IFtdXG4gICAgdGhpcy5fY2xzTWFwID0gbnVsbFxuICAgIHRoaXMuX2NvbnRleHQgPSBudWxsXG4gICAgdGhpcy5faG9va3MgPSBudWxsXG4gICAgdGhpcy5kZXN0cm95SW5zdGFuY2VzKClcbiAgfVxuXG4gIC8qKlxuICAgKiDlr7nkv6HpgZPov5vooYzmlLbmi6JcbiAgICogQHBhcmFtIG1lc3NhZ2VOYW1lXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaXNNZXNzYWdlTmFtZVZhbGlkIChtZXNzYWdlTmFtZSkge1xuICAgIGlmICghdGhpcy5hbGxvd2VkRXZlbnRzLmluZGV4T2YobWVzc2FnZU5hbWUpIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnJlZ2lzdGVyZWQgbWVzc2FnZSBuYW1lOiAke21lc3NhZ2VOYW1lfWApXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRleHRcbiIsImltcG9ydCBFVkVOVFMgZnJvbSAnLi4vY29uc3RhbnRzL2V2ZW50cyc7XG5jb25zdCBDUllUT19FVkVOVFMgPSBFVkVOVFMuQ1JZVE9fRVZFTlRTXG5jbGFzcyBDcnlwdG8ge1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICB0aGlzLmlucHV0QnVmZmVyID0gY29uZmlnLmlucHV0YnVmZmVyO1xuICAgICAgICB0aGlzLm91dHB1dEJ1ZmZlciA9IGNvbmZpZy5vdXRwdXRidWZmZXI7XG4gICAgICAgIHRoaXMua2V5ID0gY29uZmlnLmtleTtcbiAgICAgICAgdGhpcy5pdiA9IGNvbmZpZy5pdjtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBjb25maWcubWV0aG9kO1xuXG4gICAgICAgIHRoaXMuY3J5cHRvID0gIHdpbmRvdy5jcnlwdG8gfHwgd2luZG93Lm1zQ3J5cHRvXG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5vbihDUllUT19FVkVOVFMuU1RBUlRfREVDUllQVCwgdGhpcy5kZWNyaXB0LmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBcbiAgICBkZWNyaXB0KCkge1xuICAgICAgICBpZighdGhpcy5hZXNrZXkpIHtcbiAgICAgICAgICAgIGxldCBzYmtleSA9IHRoaXMuY3J5cHRvLnN1YnRsZS5pbXBvcnRLZXkoJ3JhdycsIHRoaXMua2V5LmJ1ZmZlciwgeyBuYW1lOiAnQUVTLUNCQycgfSwgZmFsc2UsIFsnZW5jcnlwdCcsICdkZWNyeXB0J10pO1xuICAgICAgICAgICAgc2JrZXkudGhlbihrZXkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWVza2V5ID0ga2V5O1xuICAgICAgICAgICAgICAgIHRoaXMuZGVjcmlwdERhdGEoKTtcbiAgICAgICAgICAgIH0pIFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kZWNyaXB0RGF0YSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVjcmlwdERhdGEoKSB7XG4gICAgICAgIGxldCBpbnB1dGJ1ZmZlciA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UodGhpcy5pbnB1dEJ1ZmZlcik7XG4gICAgICAgIGxldCBvdXRwdXRidWZmZXIgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKHRoaXMub3V0cHV0QnVmZmVyKTtcbiAgICAgICAgbGV0IGRhdGEgPSBpbnB1dGJ1ZmZlci5zaGlmdCgpO1xuICAgICAgICBpZihkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmNyeXB0by5zdWJ0bGUuZGVjcnlwdCh7IG5hbWU6ICdBRVMtQ0JDJywgaXY6IHRoaXMuaXYuYnVmZmVyIH0sIHRoaXMuYWVza2V5LCBkYXRhKS50aGVuKHJlcz0+e1xuICAgICAgICAgICAgICAgIG91dHB1dGJ1ZmZlci5wdXNoKG5ldyBVaW50OEFycmF5KHJlcykpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChDUllUT19FVkVOVFMuREVDUllQVEVEKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlY3JpcHREYXRhKGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBDcnlwdG87IiwiY29uc3QgbGUgPSAoZnVuY3Rpb24gKCkge1xuICBjb25zdCBidWYgPSBuZXcgQXJyYXlCdWZmZXIoMik7XG4gIChuZXcgRGF0YVZpZXcoYnVmKSkuc2V0SW50MTYoMCwgMjU2LCB0cnVlKSAvLyBsaXR0bGUtZW5kaWFuIHdyaXRlXG4gIHJldHVybiAobmV3IEludDE2QXJyYXkoYnVmKSlbMF0gPT09IDI1NiAvLyBwbGF0Zm9ybS1zcGVjIHJlYWQsIGlmIGVxdWFsIHRoZW4gTEVcbn0pKClcblxuZXhwb3J0IGRlZmF1bHQgbGVcbiIsImNvbnN0IGxlID0gKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgYnVmID0gbmV3IEFycmF5QnVmZmVyKDIpO1xuICAobmV3IERhdGFWaWV3KGJ1ZikpLnNldEludDE2KDAsIDI1NiwgdHJ1ZSkgLy8gbGl0dGxlLWVuZGlhbiB3cml0ZVxuICByZXR1cm4gKG5ldyBJbnQxNkFycmF5KGJ1ZikpWzBdID09PSAyNTYgLy8gcGxhdGZvcm0tc3BlYyByZWFkLCBpZiBlcXVhbCB0aGVuIExFXG59KSgpXG5cbmNvbnN0IHNuaWZmZXIgPSB7XG4gIGdldCBkZXZpY2UgKCkge1xuICAgIGxldCByID0gc25pZmZlci5vcztcbiAgICByZXR1cm4gci5pc1BjID8gJ3BjJyA6IHIuaXNUYWJsZXQgPyAndGFibGV0JyA6ICdtb2JpbGUnO1xuICB9LFxuICBnZXQgYnJvd3NlciAoKSB7XG4gICAgbGV0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xuICAgIGxldCByZWcgPSB7XG4gICAgICBpZTogL3J2OihbXFxkLl0rKVxcKSBsaWtlIGdlY2tvLyxcbiAgICAgIGZpcmZveDogL2ZpcmVmb3hcXC8oW1xcZC5dKykvLFxuICAgICAgY2hyb21lOiAvY2hyb21lXFwvKFtcXGQuXSspLyxcbiAgICAgIG9wZXJhOiAvb3BlcmEuKFtcXGQuXSspLyxcbiAgICAgIHNhZmFyaTogL3ZlcnNpb25cXC8oW1xcZC5dKykuKnNhZmFyaS9cbiAgICB9O1xuICAgIHJldHVybiBbXS5jb25jYXQoT2JqZWN0LmtleXMocmVnKS5maWx0ZXIoa2V5ID0+IHJlZ1trZXldLnRlc3QodWEpKSlbMF07XG4gIH0sXG4gIGdldCBvcyAoKSB7XG4gICAgbGV0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudFxuICAgIGxldCBpc1dpbmRvd3NQaG9uZSA9IC8oPzpXaW5kb3dzIFBob25lKS8udGVzdCh1YSlcbiAgICBsZXQgaXNTeW1iaWFuID0gLyg/OlN5bWJpYW5PUykvLnRlc3QodWEpIHx8IGlzV2luZG93c1Bob25lO1xuICAgIGxldCBpc0FuZHJvaWQgPSAvKD86QW5kcm9pZCkvLnRlc3QodWEpO1xuICAgIGxldCBpc0ZpcmVGb3ggPSAvKD86RmlyZWZveCkvLnRlc3QodWEpO1xuICAgIGxldCBpc1RhYmxldCA9IC8oPzppUGFkfFBsYXlCb29rKS8udGVzdCh1YSkgfHwgKGlzQW5kcm9pZCAmJiAhLyg/Ok1vYmlsZSkvLnRlc3QodWEpKSB8fCAoaXNGaXJlRm94ICYmIC8oPzpUYWJsZXQpLy50ZXN0KHVhKSk7XG4gICAgbGV0IGlzUGhvbmUgPSAvKD86aVBob25lKS8udGVzdCh1YSkgJiYgIWlzVGFibGV0O1xuICAgIGxldCBpc1BjID0gIWlzUGhvbmUgJiYgIWlzQW5kcm9pZCAmJiAhaXNTeW1iaWFuO1xuICAgIHJldHVybiB7XG4gICAgICBpc1RhYmxldCxcbiAgICAgIGlzUGhvbmUsXG4gICAgICBpc0FuZHJvaWQsXG4gICAgICBpc1BjLFxuICAgICAgaXNTeW1iaWFuLFxuICAgICAgaXNXaW5kb3dzUGhvbmUsXG4gICAgICBpc0ZpcmVGb3hcbiAgICB9O1xuICB9LFxuXG4gIGdldCBpc0xlICgpIHtcbiAgICByZXR1cm4gbGVcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgc25pZmZlcjtcbiIsImNsYXNzIFVURjgge1xuICBzdGF0aWMgZGVjb2RlICh1aW50OGFycmF5KSB7XG4gICAgY29uc3Qgb3V0ID0gW107XG4gICAgY29uc3QgaW5wdXQgPSB1aW50OGFycmF5O1xuICAgIGxldCBpID0gMDtcbiAgICBjb25zdCBsZW5ndGggPSB1aW50OGFycmF5Lmxlbmd0aDtcblxuICAgIHdoaWxlIChpIDwgbGVuZ3RoKSB7XG4gICAgICBpZiAoaW5wdXRbaV0gPCAweDgwKSB7XG4gICAgICAgIG91dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoaW5wdXRbaV0pKTtcbiAgICAgICAgKytpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH0gZWxzZSBpZiAoaW5wdXRbaV0gPCAweEMwKSB7XG4gICAgICAgIC8vIGZhbGx0aHJvdWdoXG4gICAgICB9IGVsc2UgaWYgKGlucHV0W2ldIDwgMHhFMCkge1xuICAgICAgICBpZiAoVVRGOC5fY2hlY2tDb250aW51YXRpb24oaW5wdXQsIGksIDEpKSB7XG4gICAgICAgICAgY29uc3QgdWNzNCA9IChpbnB1dFtpXSAmIDB4MUYpIDw8IDYgfCAoaW5wdXRbaSArIDFdICYgMHgzRik7XG4gICAgICAgICAgaWYgKHVjczQgPj0gMHg4MCkge1xuICAgICAgICAgICAgb3V0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSh1Y3M0ICYgMHhGRkZGKSk7XG4gICAgICAgICAgICBpICs9IDI7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaW5wdXRbaV0gPCAweEYwKSB7XG4gICAgICAgIGlmIChVVEY4Ll9jaGVja0NvbnRpbnVhdGlvbihpbnB1dCwgaSwgMikpIHtcbiAgICAgICAgICBjb25zdCB1Y3M0ID0gKGlucHV0W2ldICYgMHhGKSA8PCAxMiB8IChpbnB1dFtpICsgMV0gJiAweDNGKSA8PCA2IHwgaW5wdXRbaSArIDJdICYgMHgzRjtcbiAgICAgICAgICBpZiAodWNzNCA+PSAweDgwMCAmJiAodWNzNCAmIDB4RjgwMCkgIT09IDB4RDgwMCkge1xuICAgICAgICAgICAgb3V0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSh1Y3M0ICYgMHhGRkZGKSk7XG4gICAgICAgICAgICBpICs9IDM7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaW5wdXRbaV0gPCAweEY4KSB7XG4gICAgICAgIGlmIChVVEY4Ll9jaGVja0NvbnRpbnVhdGlvbihpbnB1dCwgaSwgMykpIHtcbiAgICAgICAgICBsZXQgdWNzNCA9IChpbnB1dFtpXSAmIDB4NykgPDwgMTggfCAoaW5wdXRbaSArIDFdICYgMHgzRikgPDwgMTIgfFxuICAgICAgICAgICAgICAgICAgICAoaW5wdXRbaSArIDJdICYgMHgzRikgPDwgNiB8IChpbnB1dFtpICsgM10gJiAweDNGKTtcbiAgICAgICAgICBpZiAodWNzNCA+IDB4MTAwMDAgJiYgdWNzNCA8IDB4MTEwMDAwKSB7XG4gICAgICAgICAgICB1Y3M0IC09IDB4MTAwMDA7XG4gICAgICAgICAgICBvdXQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKCh1Y3M0ID4+PiAxMCkgfCAweEQ4MDApKTtcbiAgICAgICAgICAgIG91dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoKHVjczQgJiAweDNGRikgfCAweERDMDApKTtcbiAgICAgICAgICAgIGkgKz0gNDtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgb3V0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgweEZGRkQpKTtcbiAgICAgICsraTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0LmpvaW4oJycpO1xuICB9XG5cbiAgc3RhdGljIF9jaGVja0NvbnRpbnVhdGlvbiAodWludDhhcnJheSwgc3RhcnQsIGNoZWNrTGVuZ3RoKSB7XG4gICAgbGV0IGFycmF5ID0gdWludDhhcnJheTtcbiAgICBpZiAoc3RhcnQgKyBjaGVja0xlbmd0aCA8IGFycmF5Lmxlbmd0aCkge1xuICAgICAgd2hpbGUgKGNoZWNrTGVuZ3RoLS0pIHtcbiAgICAgICAgaWYgKChhcnJheVsrK3N0YXJ0XSAmIDB4QzApICE9PSAweDgwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVVEY4O1xuIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICdldmVudHMnXG5jbGFzcyBBdWRpb0N0eCBleHRlbmRzIEV2ZW50RW1pdHRlcntcbiAgY29uc3RydWN0b3IgKGNvbmZpZykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWcpO1xuICAgIGxldCBBdWRpb0NvbnRleHQgPSAgd2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0O1xuICAgIHRoaXMuY29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcbiAgICB0aGlzLmdhaW5Ob2RlID0gdGhpcy5jb250ZXh0LmNyZWF0ZUdhaW4oKTtcbiAgICB0aGlzLmdhaW5Ob2RlLmNvbm5lY3QodGhpcy5jb250ZXh0LmRlc3RpbmF0aW9uKTtcbiAgICB0aGlzLm1ldGEgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5zYW1wbGVzID0gW107XG4gICAgdGhpcy5wcmVsb2FkVGltZSA9IHRoaXMuY29uZmlnLnByZWxvYWRUaW1lIHx8IDM7XG4gICAgdGhpcy5kdXJhdGlvbiA9IDA7XG5cbiAgICB0aGlzLl9jdXJyZW50QnVmZmVyID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX25leHRCdWZmZXIgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fbGFzdHB0cyA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9wcmVEZWNvZGUgPSBbXTtcbiAgICB0aGlzLl9jdXJyZW50VGltZSA9IDA7XG4gICAgdGhpcy5fZGVjb2RpbmcgPSBmYWxzZTtcbiAgICAvLyDorrDlvZXlpJbpg6jkvKDovpPnmoTnirbmgIFcbiAgICB0aGlzLl9wbGF5ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIGdldCBjdXJyZW50VGltZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFRpbWU7XG4gIH1cblxuICBkZWNvZGVBdWRpbyAoYXVkaW9UcmFjaykge1xuICAgIGxldCB7c2FtcGxlc30gPSBhdWRpb1RyYWNrO1xuICAgIGxldCBkYXRhID0gc2FtcGxlcztcbiAgICBhdWRpb1RyYWNrLnNhbXBsZXMgPSBbXTtcbiAgICB0aGlzLnNldEF1ZGlvRGF0YShkYXRhKTtcbiAgfVxuICBzZXRBdWRpb0RhdGEgKGRhdGEpIHtcbiAgICBmb3IobGV0IGkgPSAwO2kgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBkYXRhW2ldLnB0cyA9IChkYXRhW2ldLnB0cyA9PT0gdW5kZWZpbmVkKSA/IGRhdGFbaV0uZHRzIDogZGF0YVtpXS5wdHM7XG4gICAgICB0aGlzLl9wcmVEZWNvZGUucHVzaChkYXRhW2ldKTtcbiAgICB9XG4gICAgaWYodGhpcy5fcHJlRGVjb2RlLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmKHRoaXMuX2xhc3RwdHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9sYXN0cHRzID0gdGhpcy5fcHJlRGVjb2RlWzBdLnB0cztcbiAgICAgIH1cbiAgICAgIGlmKCh0aGlzLl9wcmVEZWNvZGVbdGhpcy5fcHJlRGVjb2RlLmxlbmd0aCAtIDFdLnB0cyAtIHRoaXMuX2xhc3RwdHMpIC8gMTAwMCA+IHRoaXMucHJlbG9hZFRpbWUpIHtcbiAgICAgICAgdGhpcy5kZWNvZGVBQUMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkZWNvZGVBQUMoKSB7XG4gICAgaWYodGhpcy5fZGVjb2RpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fZGVjb2RpbmcgPSB0cnVlO1xuICAgIGxldCBkYXRhID0gdGhpcy5fcHJlRGVjb2RlO1xuICAgIGxldCBzYW1wbGVzID0gW107XG4gICAgbGV0IF90aGlzID0gdGhpcztcbiAgICBsZXQgc2FtcGxlID0gZGF0YS5zaGlmdCgpO1xuICAgIHdoaWxlKHNhbXBsZSkge1xuICAgICAgbGV0IHNhbXBsZURhdGEgPSBBdWRpb0N0eC5nZXRBQUNEYXRhKHRoaXMubWV0YSwgc2FtcGxlKVxuICAgICAgc2FtcGxlcy5wdXNoKHNhbXBsZURhdGEpO1xuICAgICAgdGhpcy5fbGFzdHB0cyA9IHNhbXBsZS5wdHM7XG4gICAgICBzYW1wbGUgPSBkYXRhLnNoaWZ0KClcbiAgICB9XG4gICAgbGV0IGJ1ZmZlciA9IEF1ZGlvQ3R4LmNvbWJpbGVEYXRhKHNhbXBsZXMpO1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmNvbnRleHQuZGVjb2RlQXVkaW9EYXRhKGJ1ZmZlci5idWZmZXIsIGZ1bmN0aW9uKGJ1ZmZlcikge1xuICAgICAgICBsZXQgYXVkaW9Tb3VyY2UgPSBfdGhpcy5jb250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgICAgICBhdWRpb1NvdXJjZS5idWZmZXIgPSBidWZmZXI7XG4gICAgICAgIGF1ZGlvU291cmNlLm9uZW5kZWQgPSBfdGhpcy5vblNvdXJjZUVuZGVkLmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5zYW1wbGVzLnB1c2goe1xuICAgICAgICAgIHRpbWU6IF90aGlzLmR1cmF0aW9uLFxuICAgICAgICAgIGR1cmF0aW9uOiBidWZmZXIuZHVyYXRpb24sXG4gICAgICAgICAgZGF0YTogYXVkaW9Tb3VyY2VcbiAgICAgICAgfSlcblxuICAgICAgICBfdGhpcy5kdXJhdGlvbiArPSBidWZmZXIuZHVyYXRpb247XG5cbiAgICAgICAgaWYoIV90aGlzLl9jdXJyZW50QnVmZmVyKSB7XG4gICAgICAgICAgX3RoaXMuX2N1cnJlbnRCdWZmZXIgPSBfdGhpcy5nZXRUaW1lQnVmZmVyKF90aGlzLmN1cnJlbnRUaW1lKTtcblxuICAgICAgICAgIGlmKF90aGlzLl9wbGF5ZWQpIHtcbiAgICAgICAgICAgIF90aGlzLnBsYXkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZighX3RoaXMuX25leHRCdWZmZXIgJiYgX3RoaXMuX2N1cnJlbnRCdWZmZXIpIHtcbiAgICAgICAgICBfdGhpcy5fbmV4dEJ1ZmZlciA9IF90aGlzLmdldFRpbWVCdWZmZXIoX3RoaXMuY3VycmVudFRpbWUgKyBfdGhpcy5fY3VycmVudEJ1ZmZlci5kdXJhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuX2RlY29kaW5nID0gZmFsc2U7XG5cbiAgICAgICAgaWYoKF90aGlzLl9wcmVEZWNvZGUubGVuZ3RoID4gMCAmJiBfdGhpcy5fcHJlRGVjb2RlW190aGlzLl9wcmVEZWNvZGUubGVuZ3RoIC0gMV0ucHRzIC0gX3RoaXMuX2xhc3RwdHMpIC8gMTAwMCA+PSBfdGhpcy5wcmVsb2FkVGltZSkge1xuICAgICAgICAgIF90aGlzLmRlY29kZUFBQygpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfVxuICB9XG5cbiAgb25Tb3VyY2VFbmRlZCgpIHtcbiAgICBpZiAoIXRoaXMuX25leHRCdWZmZXIgfHwgIXRoaXMuX3BsYXllZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgYXVkaW9Tb3VyY2UgPSB0aGlzLl9uZXh0QnVmZmVyLmRhdGE7XG4gICAgYXVkaW9Tb3VyY2Uuc3RhcnQoKTtcbiAgICBhdWRpb1NvdXJjZS5jb25uZWN0KHRoaXMuZ2Fpbk5vZGUpO1xuICAgIHRoaXMuX2N1cnJlbnRCdWZmZXIgPSB0aGlzLl9uZXh0QnVmZmVyO1xuICAgIHRoaXMuX2N1cnJlbnRUaW1lID0gdGhpcy5fY3VycmVudEJ1ZmZlci50aW1lO1xuICAgIHRoaXMuX25leHRCdWZmZXIgPSB0aGlzLmdldFRpbWVCdWZmZXIodGhpcy5jdXJyZW50VGltZSk7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRCdWZmZXIpIHtcbiAgICAgIHRoaXMuX25leHRCdWZmZXIgPSB0aGlzLmdldFRpbWVCdWZmZXIodGhpcy5jdXJyZW50VGltZSArIHRoaXMuX2N1cnJlbnRCdWZmZXIuZHVyYXRpb24pO1xuICAgIH1cbiAgICB0aGlzLmVtaXQoJ0FVRElPX1NPVVJDRV9FTkQnKVxuICB9XG5cbiAgcGxheSgpIHtcbiAgICB0aGlzLl9wbGF5ZWQgPSB0cnVlO1xuICAgIGlmKCF0aGlzLl9jdXJyZW50QnVmZmVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBhdWRpb1NvdXJjZSA9IHRoaXMuX2N1cnJlbnRCdWZmZXIuZGF0YTtcbiAgICBhdWRpb1NvdXJjZS5jb25uZWN0KHRoaXMuZ2Fpbk5vZGUpO1xuICAgIGF1ZGlvU291cmNlLnN0YXJ0KCk7XG4gIH1cblxuICBnZXRUaW1lQnVmZmVyKHRpbWUpIHtcbiAgICBsZXQgcmV0O1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnNhbXBsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBzYW1wbGUgPSB0aGlzLnNhbXBsZXNbaV1cbiAgICAgIGlmKHNhbXBsZS50aW1lIDw9IHRpbWUgJiYgKHNhbXBsZS50aW1lICsgc2FtcGxlLmR1cmF0aW9uKSA+IHRpbWUpIHtcbiAgICAgICAgcmV0ID0gc2FtcGxlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIHNldEF1ZGlvTWV0YURhdGEobWV0YSkge1xuICAgIHRoaXMubWV0YSA9IG1ldGE7XG4gIH1cblxuICBzdGF0aWMgZ2V0QUFDRGF0YShtZXRhLCBzYW1wbGUpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoc2FtcGxlLmRhdGEuYnl0ZUxlbmd0aCArIDcpO1xuICAgIGxldCBhZHRzID0gQXVkaW9DdHguZ2V0QWR0cyhtZXRhLCBzYW1wbGUuZGF0YSk7XG4gICAgYnVmZmVyLnNldChhZHRzKTtcbiAgICBidWZmZXIuc2V0KHNhbXBsZS5kYXRhLCA3KTtcbiAgICByZXR1cm4gYnVmZmVyO1xuICB9XG5cbiAgc3RhdGljIGNvbWJpbGVEYXRhKHNhbXBsZXMpIHtcbiAgICAvLyBnZXQgbGVuZ3RoXG4gICAgbGV0IGxlbmd0aCA9IDA7XG4gICAgZm9yKGxldCBpID0gMCxrID0gc2FtcGxlcy5sZW5ndGg7IGkgPCBrOyBpKyspIHtcbiAgICAgIGxlbmd0aCArPSBzYW1wbGVzW2ldLmJ5dGVMZW5ndGg7XG4gICAgfVxuXG4gICAgbGV0IHJldCA9IG5ldyBVaW50OEFycmF5KGxlbmd0aCk7XG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgLy8gY29tYmlsZSBkYXRhO1xuICAgIGZvcihsZXQgaSA9IDAsayA9IHNhbXBsZXMubGVuZ3RoOyBpIDwgazsgaSsrKSB7XG4gICAgICByZXQuc2V0KHNhbXBsZXNbaV0sIG9mZnNldCk7XG4gICAgICBvZmZzZXQgKz0gc2FtcGxlc1tpXS5ieXRlTGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgc3RhdGljIGdldEFkdHMobWV0YSwgZGF0YSkge1xuICAgIGxldCBhZHRzID0gbmV3IFVpbnQ4QXJyYXkoNyk7XG5cbiAgICAvLyDorr7nva7lkIzmraXkvY0gMHhmZmYgMTJiaXRcbiAgICBhZHRzWzBdID0gMHhmZjtcbiAgICBhZHRzWzFdID0gMHhmMDtcblxuICAgIC8vIE9iamVjdCBkYXRhICjmsqHku4DkuYjkurrnlKhNUEVHLTLkuobvvIxITFPlkoxGTFbkuZ/lhajmmK9NUEVHLTTvvIzov5nph4znm7TmjqUwKSAgMWJpdFxuICAgIC8vIExldmVsIGFsd2F5cyAwMCAyYml0XG4gICAgLy8gQ1JDIGFsd2F5cyAxIDFiaXRcbiAgICBhZHRzWzFdID0gYWR0c1sxXSB8IDB4MDE7XG5cbiAgICAvLyBwcm9maWxlIDJiaXRcbiAgICBhZHRzWzJdID0gMHhjMCAmICgobWV0YS5vYmplY3RUeXBlLTEpIDw8IDYpO1xuXG4gICAgLy9zYW1wbGVGcmVxdWVuY3lJbmRleFxuICAgIGFkdHNbMl0gPSBhZHRzWzJdIHwgKDB4M2MgJiAobWV0YS5zYW1wbGVSYXRlSW5kZXggPDwgMikpXG5cbiAgICAvL3ByaXZhdGUgYml0IDAgMWJpdFxuICAgIC8vIGNoYW5lbCBjb25maWd1cmF0aW9uIDNiaXRcbiAgICBhZHRzWzJdID0gYWR0c1syXSB8ICgweDAxICYgbWV0YS5jaGFubmVsQ291bnQgPj4gMik7XG4gICAgYWR0c1szXSA9IDB4YzAgJiAobWV0YS5jaGFubmVsQ291bnQgPDwgNik7XG5cbiAgICAvLyBvcmlnaW5hbF9jb3B5OiAwIDFiaXRcbiAgICAvLyBob21lOiAwIDFiaXRcblxuICAgIC8vIGFkdHNfdmFyaWFibGVfaGVhZGVyKClcbiAgICAvLyBjb3B5cmlnaHRlZF9pZF9iaXQgMCAxYml0XG4gICAgLy8gY29weXJpZ2h0ZWRfaWRfc3RhcnQgMCAxYml0XG5cbiAgICAvLyBhYWNfZnJhbWVfbGVuZ3RoIDEzYml0O1xuICAgIGxldCBhYWNmcmFtZWxlbmd0aCA9IGRhdGEuYnl0ZUxlbmd0aCArIDc7XG5cbiAgICBhZHRzWzNdID0gYWR0c1szXSB8ICgweDAzICYgYWFjZnJhbWVsZW5ndGggPj4gMTEpO1xuICAgIGFkdHNbNF0gPSAweGZmICYgKGFhY2ZyYW1lbGVuZ3RoID4+IDMpO1xuICAgIGFkdHNbNV0gPSAweGUwICYgKGFhY2ZyYW1lbGVuZ3RoIDw8IDUpO1xuXG4gICAgLy8gYWR0c19idWZmZXJfZnVsbG5lc3MgMHg3ZmYgMTFiaXRcbiAgICBhZHRzWzVdID0gYWR0c1s1XSB8IDB4MWZcbiAgICBhZHRzWzZdID0gMHhmYztcblxuICAgIC8vIG51bWJlcl9vZl9yYXdfZGF0YV9ibG9ja3NfaW5fZnJhbWUgMCAyYml0O1xuICAgIHJldHVybiBhZHRzO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEF1ZGlvQ3R4O1xuIiwiaW1wb3J0IFZpZGVvQ3R4IGZyb20gJy4vdmlkZW8tY29udGV4dCc7XG5pbXBvcnQgQXVkaW9DdHggZnJvbSAnLi9hdWRpby1jb250ZXh0JztcbmltcG9ydCB7IGdldFRpY2tlciB9IGZyb20gJy4vdGlja2VyJztcblxuLyoqXG4gKiDpn7PnlLvlkIzmraXosIPlkozlmahcbiAqL1xuY2xhc3MgQVZSZWNvbmNpbGVyIHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgdGhpcy5hQ3R4ID0gcHJvcHMuYUN0eDtcbiAgICB0aGlzLnZDdHggPSBwcm9wcy52Q3R4O1xuXG4gICAgdGhpcy50aW1lb3V0SWQgPSBudWxsXG4gICAgdGhpcy5zdGFydCA9IG51bGxcbiAgfVxuXG4gIGRvUmVjb25jaWxlICgpIHtcbiAgICBjb25zdCB2Q3VyVGltZSA9IHRoaXMudkN0eC5jdXJyZW50VGltZSB8fCAwO1xuICAgIGNvbnN0IGFDdXJUaW1lID0gKHRoaXMuYUN0eC5jdXJyZW50VGltZSB8fCAwKSAqIDEwMDA7XG5cbiAgICBjb25zdCBnYXAgPSB2Q3VyVGltZSAtIGFDdXJUaW1lO1xuICAgIGlmICh0aGlzLnRpbWVvdXRJZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZ2FwID4gMjAwKSB7IC8vIGF1ZGlvIGRlbGF5ZWQgZm9yIG1vcmUgdGhhbiAxMDBtc1xuICAgICAgdGhpcy5zdGFydCArPSBnYXBcbiAgICAgIHRoaXMudkN0eC5wYXVzZSgpXG4gICAgICB0aGlzLnRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnZDdHgucGxheSgpXG4gICAgICAgIHRoaXMudGltZW91dElkID0gbnVsbFxuICAgICAgfSwgZ2FwKVxuICAgIH0gZWxzZSBpZiAoZ2FwIDwgLTEyMCkge1xuICAgICAgdGhpcy52Q3R4LmN1cnJlbnRUaW1lID0gdGhpcy52Q3R4LmN1cnJlbnRUaW1lICsgTWF0aC5hYnMoZ2FwKTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmFDdHggPSBudWxsXG4gICAgdGhpcy52Q3R4ID0gbnVsbFxuICB9XG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuY2xhc3MgTW9iaWxlVmlkZW8gZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yIChjb25maWcpIHtcbiAgICBzdXBlcigpO1xuICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy52Q3R4ID0gbmV3IFZpZGVvQ3R4KCk7XG4gICAgdGhpcy5hQ3R4ID0gbmV3IEF1ZGlvQ3R4KGNvbmZpZyk7XG4gICAgdGhpcy50aWNrZXIgPSBuZXcgKGdldFRpY2tlcigpKSgpXG4gICAgdGhpcy5oaXN0b3J5VGltZSA9IDA7XG4gICAgdGhpcy5yZWNvbmNpbGVyID0gbmV3IEFWUmVjb25jaWxlcih7XG4gICAgICB2Q3R4OiB0aGlzLnZDdHgsXG4gICAgICBhQ3R4OiB0aGlzLmFDdHhcbiAgICB9KVxuICAgIHRoaXMuaGFuZGxlQXVkaW9Tb3VyY2VFbmQgPSB0aGlzLmhhbmRsZUF1ZGlvU291cmNlRW5kLmJpbmQodGhpcylcbiAgICB0aGlzLmluaXQoKVxuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgdGhpcy52Q3R4Lm9uY2FucGxheSA9ICgpID0+IHtcbiAgICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy52Q3R4LmNhbnZhcyk7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NhbnBsYXknKSk7XG4gICAgfVxuXG4gICAgdGhpcy50aWNrZXIuc3RhcnQoKCkgPT4ge1xuICAgICAgLy9cbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYUN0eC5jdXJyZW50VGltZSlcbiAgICAgIGlmICghdGhpcy5zdGFydCkge1xuICAgICAgICB0aGlzLnN0YXJ0ID0gRGF0ZS5ub3coKVxuICAgICAgfVxuICAgICAgdGhpcy52Q3R4Ll9vblRpbWVyKERhdGUubm93KCkgLSB0aGlzLnN0YXJ0KVxuICAgIH0pXG5cbiAgICB0aGlzLmFDdHgub24oJ0FVRElPX1NPVVJDRV9FTkQnLCB0aGlzLmhhbmRsZUF1ZGlvU291cmNlRW5kKVxuICB9XG5cbiAgaGFuZGxlQXVkaW9Tb3VyY2VFbmQgKCkge1xuICAgIHRoaXMucmVjb25jaWxlci5kb1JlY29uY2lsZSgpXG4gIH1cblxuICBfY2xlYW5CdWZmZXIgKCkge1xuICAgIHRoaXMudkN0eC5jbGVhbkJ1ZmZlcigpXG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLnJlY29uY2lsZXIuZGVzdHJveSgpXG4gIH1cblxuICBvbkRlbXV4Q29tcGxldGUgKHZpZGVvVHJhY2ssIGF1ZGlvVHJhY2spIHtcbiAgICB0aGlzLmFDdHguZGVjb2RlQXVkaW8oYXVkaW9UcmFjayk7XG4gICAgdGhpcy52Q3R4LmRlY29kZVZpZGVvKHZpZGVvVHJhY2spO1xuICB9XG5cbiAgc2V0QXVkaW9NZXRhIChtZXRhKSB7XG4gICAgdGhpcy5hQ3R4LnNldEF1ZGlvTWV0YURhdGEobWV0YSk7XG4gIH1cblxuICBzZXRWaWRlb01ldGEgKG1ldGEpIHtcbiAgICB0aGlzLnZDdHguc2V0VmlkZW9NZXRhRGF0YShtZXRhKTtcbiAgfVxuXG4gIGdldCBjdXJyZW50VGltZSAoKSB7XG5cbiAgfVxuXG4gIHBsYXkgKCkge1xuICAgIC8vIGlmICghdGhpcy52Q3R4LilcbiAgICB0aGlzLnZDdHgucGxheSgpO1xuICAgIHRoaXMuYUN0eC5wbGF5KCk7XG4gIH1cbn1cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtb2JpbGUtdmlkZW8nLCBNb2JpbGVWaWRlbyk7XG4iLCJjbGFzcyBTb3VyY2VCdWZmZXIge1xuICBjb25zdHJ1Y3RvciAoY29uZmlnKSB7XG4gICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWcpO1xuICAgIHRoaXMudHlwZSA9IHRoaXMuY29uZmlnLnR5cGU7XG4gICAgdGhpcy5idWZmZXIgPSBbXTtcbiAgICB0aGlzLmN1cnJlbnRHb3AgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fbGFzdEdldCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHB1c2ggKGZyYW1lKSB7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgaWYgKGZyYW1lLmlzS2V5ZnJhbWUpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRHb3AgPSB7XG4gICAgICAgICAgc2FtcGxlczogW10sXG4gICAgICAgICAgc3RhcnQ6IGZyYW1lLmR0cyxcbiAgICAgICAgICBlbmQ6IGZyYW1lLmR0cyxcbiAgICAgICAgICBuZXh0R29wOiB1bmRlZmluZWRcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEdvcCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudEdvcC5uZXh0R29wID0gY3VycmVudEdvcDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJlbnRHb3AgPSBjdXJyZW50R29wO1xuICAgICAgICB0aGlzLmJ1ZmZlci5wdXNoKHRoaXMuY3VycmVudEdvcCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRHb3ApIHtcbiAgICAgICAgdGhpcy5jdXJyZW50R29wLnNhbXBsZXMucHVzaChmcmFtZSk7XG5cbiAgICAgICAgaWYgKGZyYW1lLmR0cyA8IHRoaXMuY3VycmVudEdvcC5zdGFydCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudEdvcC5zdGFydCA9IGZyYW1lLmR0cztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmcmFtZS5kdHMgPiB0aGlzLmN1cnJlbnRHb3AuZW5kKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50R29wLmVuZCA9IGZyYW1lLmR0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldCAodGltZSkge1xuICAgIGlmICh0aGlzLnR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgIGlmICh0aGlzLmJ1ZmZlci5sZW5ndGggPCAxKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRpbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsZXQgc2FtcGxlID0gdGhpcy5fZ2V0TmV4dCgpO1xuICAgICAgICByZXR1cm4gc2FtcGxlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9nZXROZXh0ICgpIHtcbiAgICBpZiAoIXRoaXMuX2xhc3RHZXQpIHtcbiAgICAgIGxldCBnb3AgPSB0aGlzLmJ1ZmZlclswXTtcbiAgICAgIGlmIChnb3Auc2FtcGxlcy5sZW5ndGggPCAxKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB0aGlzLl9sYXN0R2V0ID0ge1xuICAgICAgICBnb3AsXG4gICAgICAgIGluZGV4OiAwXG4gICAgICB9XG4gICAgICByZXR1cm4gZ29wLnNhbXBsZXNbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBnb3AgPSB0aGlzLl9sYXN0R2V0LmdvcDtcbiAgICAgIGxldCBzYW1wbGUgPSBnb3Auc2FtcGxlc1t0aGlzLl9sYXN0R2V0LmluZGV4ICsgMV07XG4gICAgICBpZiAoc2FtcGxlKSB7XG4gICAgICAgIHRoaXMuX2xhc3RHZXQuaW5kZXggPSB0aGlzLl9sYXN0R2V0LmluZGV4ICsgMTtcbiAgICAgICAgcmV0dXJuIHNhbXBsZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdvcCA9IGdvcC5uZXh0R29wO1xuICAgICAgICBpZiAoIWdvcCB8fCBnb3Auc2FtcGxlcy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNhbXBsZSA9IGdvcC5zYW1wbGVzWzBdO1xuICAgICAgICB0aGlzLl9sYXN0R2V0ID0ge1xuICAgICAgICAgIGdvcCxcbiAgICAgICAgICBpbmRleDogMFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzYW1wbGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlIChzdGFydCwgZW5kKSB7XG4gICAgaWYgKHRoaXMuYnVmZmVyLmxlbmd0aCA8IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGdvcCA9IHRoaXMuYnVmZmVyWzBdO1xuICAgIHdoaWxlIChnb3ApIHtcbiAgICAgIGlmIChnb3AuZW5kIDwgZW5kICYmIGdvcC5zdGFydCA+PSBzdGFydCkge1xuICAgICAgICBkZWxldGUgdGhpcy5idWZmZXJbaV07XG4gICAgICAgIGdvcCA9IHRoaXMuYnVmZmVyW2ldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaSArPSAxO1xuICAgICAgICBnb3AgPSB0aGlzLmJ1ZmZlcltpXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU291cmNlQnVmZmVyO1xuIiwiLyoqXG4gKiBAYXV0aG9yIGZ1eXVoYW9AYnl0ZWRhbmNlLmNvbVxuICovXG5cbmNsYXNzIFRpY2tlciB7XG4gIGNvbnN0cnVjdG9yIChvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyB8fCB7fSwge1xuICAgICAgaW50ZXJ2YWw6IDE2XG4gICAgfSlcblxuICAgIHRoaXMuY2FsbGJhY2tzID0gW11cbiAgfVxuXG4gIHN0YXJ0KC4uLmNhbGxiYWNrcykge1xuICAgIHRoaXMuY2FsbGJhY2tzID0gY2FsbGJhY2tzXG4gIH1cblxuICBvblRpY2sgKCkge1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLmNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgY2FsbGJhY2sgPSB0aGlzLmNhbGxiYWNrc1tpXVxuICAgICAgY2FsbGJhY2soKVxuICAgIH1cbiAgfVxuXG4gIHNldEludGVydmFsIChpbnRlcnZhbCkge1xuICAgIHRoaXMub3B0aW9ucy5pbnRlcnZhbCA9IGludGVydmFsXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuLyoqXG4gKiB0aWNrZXIgdXNlIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuICovXG5jbGFzcyBSYWZUaWNrZXIgZXh0ZW5kcyBUaWNrZXIge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5wcmV2ID0gbnVsbDtcbiAgICB0aGlzLnRpbWVySWQgPSBudWxsXG4gICAgdGhpcy5fc3ViVGltZXJJZCA9IG51bGxcblxuICAgIHRoaXMuX3RpY2tGdW5jID0gUmFmVGlja2VyLmdldFRpY2tGdW5jKClcbiAgICB0aGlzLnRpY2sgPSB0aGlzLnRpY2suYmluZCh0aGlzKVxuICB9XG5cbiAgc3RhcnQgKC4uLmNhbGxiYWNrcykge1xuICAgIHN1cGVyLnN0YXJ0KC4uLmNhbGxiYWNrcylcbiAgICB0aGlzLnRpY2soKVxuICB9XG5cbiAgdGljayAodGltZXN0YW1wKSB7XG4gICAgdGhpcy5uZXh0VGljaygpO1xuICAgIHRoaXMub25UaWNrKClcbiAgfVxuXG4gIG5leHRUaWNrICgpIHtcbiAgICBjb25zdCB7IF90aWNrRnVuYyB9ID0gdGhpcztcbiAgICB0aGlzLnRpbWVySWQgPSBfdGlja0Z1bmModGhpcy50aWNrKVxuICB9XG5cbiAgc3RvcCAoKSB7XG4gICAgaWYgKHRoaXMudGltZXJJZCkge1xuICAgICAgY29uc3QgY2FuY2VsRnVuYyA9IFJhZlRpY2tlci5nZXRDYW5jZWxGdW5jKClcblxuICAgICAgY2FuY2VsRnVuYyh0aGlzLnRpbWVySWQpXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldFRpY2tGdW5jICgpIHtcbiAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gIH1cblxuICBzdGF0aWMgZ2V0Q2FuY2VsRnVuYyAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWVcbiAgfVxuXG4gIHN0YXRpYyBpc1N1cHBvcnRlZCAoKSB7XG4gICAgcmV0dXJuIFJhZlRpY2tlci5nZXRUaWNrRnVuYygpICE9PSB1bmRlZmluZWRcbiAgfVxufVxuXG4vKipcbiAqIHVzZSBzZXRUaW1lb3V0IGZvciBicm93c2VycyB3aXRob3V0IHJhZiBzdXBwb3J0XG4gKi9cbmNsYXNzIFRpbWVvdXRUaWNrZXIgZXh0ZW5kcyBUaWNrZXIge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcihjb25maWcpXG4gICAgdGhpcy50aW1lb3V0SWQgPSBudWxsXG5cbiAgfVxuXG4gIHN0YXJ0ICguLi5jYWxsYmFja3MpIHtcbiAgICBzdXBlci5uZXh0VGljayguLi5jYWxsYmFja3MpXG4gICAgdGhpcy50aW1lb3V0SWQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgdGhpcy5vblRpY2soKTtcbiAgICB9LCB0aGlzLm9wdGlvbnMuaW50ZXJ2YWwgfHwgMTYpXG4gIH1cblxuICBzdG9wICgpIHtcbiAgICBpZiAodGhpcy50aW1lb3V0SWQpIHtcbiAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMudGltZW91dElkKVxuICAgIH1cbiAgfVxuXG59XG5cbi8qKlxuICog6L+U5ZueVGlja2Vy5p6E6YCg5Ye95pWwXG4gKiBAcmV0dXJucyB7VGlja2VyfVxuICovXG5leHBvcnQgY29uc3QgZ2V0VGlja2VyID0gKCkgPT4ge1xuICBpZiAoUmFmVGlja2VyLmlzU3VwcG9ydGVkKCkpIHtcbiAgICByZXR1cm4gUmFmVGlja2VyXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFRpbWVvdXRUaWNrZXJcbiAgfVxufVxuIiwiaW1wb3J0IFdvcmtlcmlmeSBmcm9tICd3ZWJ3b3JraWZ5LXdlYnBhY2snXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL3dyaXRlL3N0cmVhbSc7XG5pbXBvcnQgTmFsdW5pdCBmcm9tICcuLi8uLi8uLi94Z3BsYXllci1jb2RlYy9zcmMvaDI2NC9uYWx1bml0JztcbmltcG9ydCBZVVZDYW52YXMgZnJvbSAnLi95dXYtY2FudmFzJztcbmltcG9ydCBTb3VyY2VCdWZmZXIgZnJvbSAnLi9zb3VyY2VidWZmZXInO1xuY2xhc3MgVmlkZW9DYW52YXMge1xuICBjb25zdHJ1Y3RvciAoY29uZmlnKSB7XG4gICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWcpO1xuICAgIHRoaXMuY2FudmFzID0gdGhpcy5jb25maWcuY2FudmFzID8gdGhpcy5jb25maWcuY2FudmFzIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgdGhpcy5zb3VyY2UgPSBuZXcgU291cmNlQnVmZmVyKHt0eXBlOiAndmlkZW8nfSk7XG4gICAgdGhpcy5wcmVsb2FkVGltZSA9IHRoaXMuY29uZmlnLnByZWxvYWRUaW1lIHx8IDM7XG4gICAgdGhpcy5vbmNhbnBsYXkgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5vbkZpcnN0RnJhbWUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5tZXRhID0gdW5kZWZpbmVkO1xuICAgIHRoaXMucmVhZHlTdGF0dXMgPSAwO1xuICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcbiAgICB0aGlzLmNvdW50ID0gMDtcbiAgICB0aGlzLmN1cnJlbnRUaW1lID0gMDtcbiAgICB0aGlzLmxhc3RQbGF5ZWQgPSAwO1xuXG4gICAgdGhpcy5fZGVjb2RlckluaXRlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2F2Y2NwdXNoZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9kZWNvZGVkRnJhbWVzID0ge307XG4gICAgdGhpcy5fbGFzdFNhbXBsZUR0cyA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9iYXNlRHRzID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2xhc3RSZW5kZXJUaW1lID0gbnVsbFxuICB9XG5cbiAgcGF1c2UgKCkge1xuICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcbiAgfVxuXG4gIGluaXRXYXNtV29ya2VyICgpIHtcbiAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgIHRoaXMud2FzbXdvcmtlciA9IFdvcmtlcmlmeShyZXF1aXJlLnJlc29sdmUoJy4vd29ya2VyLmpzJykpO1xuICAgIHRoaXMud2FzbXdvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICBtc2c6ICdpbml0JyxcbiAgICAgIG1ldGE6IHRoaXMubWV0YVxuICAgIH0pXG4gICAgdGhpcy53YXNtd29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBtc2cgPT4ge1xuICAgICAgc3dpdGNoIChtc2cuZGF0YS5tc2cpIHtcbiAgICAgICAgY2FzZSAnREVDT0RFUl9SRUFEWSc6XG4gICAgICAgICAgX3RoaXMuX2RlY29kZXJJbml0ZWQgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdERUNPREVEJzpcbiAgICAgICAgICB0aGlzLl9vbkRlY29kZWQobXNnLmRhdGEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2V0VmlkZW9NZXRhRGF0YSAobWV0YSkge1xuICAgIHRoaXMubWV0YSA9IG1ldGE7XG4gICAgaWYgKCF0aGlzLl9kZWNvZGVySW5pdGVkKSB7XG4gICAgICB0aGlzLmluaXRXYXNtV29ya2VyKCk7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGhpcy5fYXZjY3B1c2hlZCA9IHRydWU7XG4gICAgbGV0IGRhdGEgPSBuZXcgVWludDhBcnJheShtZXRhLnNwcy5ieXRlTGVuZ3RoICsgNCk7XG4gICAgZGF0YS5zZXQoWzAsIDAsIDAsIDFdKVxuICAgIGRhdGEuc2V0KG1ldGEuc3BzLCA0KTtcbiAgICB0aGlzLndhc213b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgbXNnOiAnZGVjb2RlJyxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KVxuXG4gICAgZGF0YSA9IG5ldyBVaW50OEFycmF5KG1ldGEucHBzLmJ5dGVMZW5ndGggKyA0KTtcbiAgICBkYXRhLnNldChbMCwgMCwgMCwgMV0pXG4gICAgZGF0YS5zZXQobWV0YS5wcHMsIDQpO1xuICAgIHRoaXMud2FzbXdvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICBtc2c6ICdkZWNvZGUnLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pXG5cbiAgICBpZiAoIXRoaXMueXV2Q2FudmFzKSB7XG4gICAgICBsZXQgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7bWV0YSwgY2FudmFzOiB0aGlzLmNhbnZhc30sIHRoaXMuY29uZmlnKTtcbiAgICAgIHRoaXMueXV2Q2FudmFzID0gbmV3IFlVVkNhbnZhcyhjb25maWcpO1xuICAgIH1cbiAgICB0aGlzLnJlYWR5U3RhdHVzID0gMTtcbiAgfVxuXG4gIGRlY29kZVZpZGVvICh2aWRlb1RyYWNrKSB7XG4gICAgaWYgKCF0aGlzLl9kZWNvZGVySW5pdGVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2F2Y2NwdXNoZWQpIHtcbiAgICAgIHRoaXMuc2V0VmlkZW9NZXRhRGF0YSh0aGlzLm1ldGEpO1xuICAgIH1cbiAgICBsZXQgeyBzYW1wbGVzIH0gPSB2aWRlb1RyYWNrO1xuICAgIGxldCBzYW1wbGUgPSBzYW1wbGVzLnNoaWZ0KCk7XG5cbiAgICB3aGlsZSAoc2FtcGxlKSB7XG4gICAgICBpZiAoIXRoaXMuX2Jhc2VEdHMpIHtcbiAgICAgICAgdGhpcy5fYmFzZUR0cyA9IHNhbXBsZS5kdHM7XG4gICAgICB9XG4gICAgICB0aGlzLnNvdXJjZS5wdXNoKHNhbXBsZSk7XG4gICAgICBzYW1wbGUgPSBzYW1wbGVzLnNoaWZ0KCk7XG4gICAgfVxuXG4gICAgdGhpcy5fcHJlbG9hZCgpO1xuICB9XG5cbiAgX3ByZWxvYWQgKCkge1xuICAgIGlmICghdGhpcy5fbGFzdFNhbXBsZUR0cyB8fCB0aGlzLl9sYXN0U2FtcGxlRHRzIC0gdGhpcy5fYmFzZUR0cyA8IHRoaXMuY3VycmVudFRpbWUgKyB0aGlzLnByZWxvYWRUaW1lICogMTAwMCkge1xuICAgICAgbGV0IHNhbXBsZSA9IHRoaXMuc291cmNlLmdldCgpO1xuICAgICAgaWYgKHNhbXBsZSkge1xuICAgICAgICB0aGlzLl9sYXN0U2FtcGxlRHRzID0gc2FtcGxlLmR0cztcbiAgICAgICAgdGhpcy5fYW5hbHlzZU5hbChzYW1wbGUpO1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAoc2FtcGxlICYmIHRoaXMuX2xhc3RTYW1wbGVEdHMgLSB0aGlzLl9iYXNlRHRzIDwgdGhpcy5jdXJyZW50VGltZSArIHRoaXMucHJlbG9hZFRpbWUgKiAxMDAwKSB7XG4gICAgICAgIHNhbXBsZSA9IHRoaXMuc291cmNlLmdldCgpO1xuICAgICAgICBpZiAoc2FtcGxlKSB7XG4gICAgICAgICAgdGhpcy5fYW5hbHlzZU5hbChzYW1wbGUpO1xuICAgICAgICAgIHRoaXMuX2xhc3RTYW1wbGVEdHMgPSBzYW1wbGUuZHRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2FuYWx5c2VOYWwgKHNhbXBsZSkge1xuICAgIGxldCBuYWxzID0gTmFsdW5pdC5nZXRBdmNjTmFscyhuZXcgU3RyZWFtKHNhbXBsZS5kYXRhLmJ1ZmZlcikpO1xuXG4gICAgbGV0IGxlbmd0aCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgbmFsID0gbmFsc1tpXTtcbiAgICAgIGxlbmd0aCArPSBuYWwuYm9keS5ieXRlTGVuZ3RoICsgNDtcbiAgICB9XG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgbGV0IGRhdGEgPSBuZXcgVWludDhBcnJheShsZW5ndGgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmFscy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IG5hbCA9IG5hbHNbaV07XG4gICAgICBkYXRhLnNldChbMCwgMCwgMCwgMV0sIG9mZnNldCk7XG4gICAgICBvZmZzZXQgKz0gNDtcbiAgICAgIGRhdGEuc2V0KG5ldyBVaW50OEFycmF5KG5hbC5ib2R5KSwgb2Zmc2V0KTtcbiAgICAgIG9mZnNldCArPSBuYWwuYm9keS5ieXRlTGVuZ3RoO1xuICAgIH1cbiAgICB0aGlzLndhc213b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgbXNnOiAnZGVjb2RlJyxcbiAgICAgIGRhdGE6IGRhdGEsXG4gICAgICBpbmZvOiB7XG4gICAgICAgIGR0czogc2FtcGxlLmR0cyxcbiAgICAgICAgcHRzOiBzYW1wbGUucHRzID8gc2FtcGxlLnB0cyA6IHNhbXBsZS5kdHMgKyBzYW1wbGUuY3RzLFxuICAgICAgICBrZXk6IHNhbXBsZS5pc0tleWZyYW1lXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIF9vbkRlY29kZWQgKGRhdGEpIHtcbiAgICBsZXQge2R0c30gPSBkYXRhLmluZm9cbiAgICB0aGlzLl9kZWNvZGVkRnJhbWVzW2R0c10gPSBkYXRhO1xuICB9XG5cbiAgcGxheSAoKSB7XG4gICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9vblRpbWVyKCk7XG4gIH1cblxuICBfb25UaW1lciAoY3VycmVudFRpbWUpIHtcbiAgICBpZiAodGhpcy5wYXVzZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMubWV0YSkge1xuICAgICAgaWYgKHRoaXMubWV0YS5mcmFtZVJhdGUgJiYgdGhpcy5tZXRhLmZyYW1lUmF0ZS5maXhlZCAmJiB0aGlzLm1ldGEuZnJhbWVSYXRlLmZwcykge1xuICAgICAgfVxuICAgICAgbGV0IGZyYW1lVGltZXMgPSBPYmplY3Qua2V5cyh0aGlzLl9kZWNvZGVkRnJhbWVzKTtcbiAgICAgIGlmIChmcmFtZVRpbWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZSA9IGN1cnJlbnRUaW1lO1xuICAgICAgICBsZXQgZnJhbWVUaW1lID0gLTE7XG4gICAgICAgIGxldCBjdXJyZW50SWR4ID0gMFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZyYW1lVGltZXMubGVuZ3RoICYmIE51bWJlci5wYXJzZUludChmcmFtZVRpbWVzW2ldKSAtIHRoaXMuX2Jhc2VEdHMgPD0gdGhpcy5jdXJyZW50VGltZTsgaSsrKSB7XG4gICAgICAgICAgZnJhbWVUaW1lID0gTnVtYmVyLnBhcnNlSW50KGZyYW1lVGltZXNbaSAtIDFdKTtcbiAgICAgICAgICBjdXJyZW50SWR4ID0gaTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmcmFtZSA9IHRoaXMuX2RlY29kZWRGcmFtZXNbZnJhbWVUaW1lXTtcbiAgICAgICAgaWYgKGZyYW1lKSB7XG4gICAgICAgICAgaWYgKHRoaXMub25jYW5wbGF5ICYmIHRoaXMucmVhZHlTdGF0dXMgPCA0KSB7XG4gICAgICAgICAgICB0aGlzLm9uY2FucGxheSgpO1xuICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXR1cyA9IDQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnNvbGUubG9nKGZyYW1lVGltZSlcbiAgICAgICAgICB0aGlzLnl1dkNhbnZhcy5yZW5kZXIoZnJhbWUuYnVmZmVyLCBmcmFtZS53aWR0aCwgZnJhbWUuaGVpZ2h0KTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRJZHg7IGkrKykge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2RlY29kZWRGcmFtZXNbaV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2xhc3RSZW5kZXJUaW1lID0gRGF0ZS5ub3coKVxuICB9XG5cbiAgY2xlYW5CdWZmZXIgKCkge1xuICAgIHRoaXMuc291cmNlLnJlbW92ZSgwLCB0aGlzLmN1cnJlbnRUaW1lKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgVmlkZW9DYW52YXM7XG4iLCJjb25zdCBNQVhfU1RSRUFNX0JVRkZFUl9MRU5HVEggPSAxMDI0ICogMTAyNDtcbnZhciBEZWNvZGVyID0gZnVuY3Rpb24gKHNlbGYpIHtcbiAgdGhpcy5pbml0ZWQgPSBmYWxzZTtcbiAgdGhpcy5zZWxmID0gc2VsZjtcbiAgdGhpcy5tZXRhID0gdGhpcy5zZWxmLm1ldGE7XG4gIHRoaXMuaW5mb2xpc3QgPSB7fTtcbiAgc2VsZi5wYXJfYnJvYWR3YXlPbkJyb2Fkd2F5SW5pdGVkID0gdGhpcy5icm9hZHdheU9uQnJvYWR3YXlJbml0ZWQuYmluZCh0aGlzKTtcbiAgc2VsZi5wYXJfYnJvYWR3YXlPblBpY3R1cmVEZWNvZGVkID0gdGhpcy5icm9hZHdheU9uUGljdHVyZURlY29kZWQuYmluZCh0aGlzKTtcbn1cblxuRGVjb2Rlci5wcm90b3R5cGUudG9VOEFycmF5ID0gZnVuY3Rpb24gKHB0ciwgbGVuZ3RoKSB7XG4gIHJldHVybiB0aGlzLnNlbGYuSEVBUFU4LnN1YmFycmF5KHB0ciwgcHRyICsgbGVuZ3RoKTtcbn1cblxuRGVjb2Rlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgTW9kdWxlLl9icm9hZHdheUluaXQoKTtcbiAgdGhpcy5zdHJlYW1CdWZmZXIgPSB0aGlzLnRvVThBcnJheShNb2R1bGUuX2Jyb2Fkd2F5Q3JlYXRlU3RyZWFtKE1BWF9TVFJFQU1fQlVGRkVSX0xFTkdUSCksIE1BWF9TVFJFQU1fQlVGRkVSX0xFTkdUSCk7XG59XG5cbkRlY29kZXIucHJvdG90eXBlLmJyb2Fkd2F5T25QaWN0dXJlRGVjb2RlZCA9IGZ1bmN0aW9uIChvZmZzZXQsIHdpZHRoLCBoZWlnaHQsIGluZm9pZCkge1xuICBsZXQgaW5mbyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuaW5mb2xpc3RbaW5mb2lkXSk7XG4gIGxldCByZWYgPSAzO1xuICBpZiAodGhpcy5tZXRhLmNocm9tYUZvcm1hdCA9PT0gNDIwKSB7XG4gICAgcmVmID0gMS41O1xuICB9IGVsc2UgaWYgKHRoaXMubWV0YS5jaHJvbWFGb3JtYXQgPT09IDQyMikge1xuICAgIHJlZiA9IDI7XG4gIH1cbiAgbGV0IGRhdGEgPSB0aGlzLnRvVThBcnJheShvZmZzZXQsIHdpZHRoICogaGVpZ2h0ICogcmVmKTtcbiAgdGhpcy5pbmZvbGlzdFtpbmZvaWRdID0gbnVsbDtcbiAgbGV0IGRhdGV0ZW1wID0gbmV3IFVpbnQ4QXJyYXkoZGF0YS5sZW5ndGgpO1xuICBkYXRldGVtcC5zZXQoZGF0YSk7XG4gIGxldCBidWZmZXIgPSBkYXRldGVtcC5idWZmZXI7XG4gIHRoaXMuc2VsZi5wb3N0TWVzc2FnZSh7XG4gICAgbXNnOiAnREVDT0RFRCcsXG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIGluZm8sXG4gICAgYnVmZmVyXG4gIH0sIFtidWZmZXJdKTtcbn1cblxuRGVjb2Rlci5wcm90b3R5cGUuYnJvYWR3YXlPbkJyb2Fkd2F5SW5pdGVkID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmluaXRlZCA9IHRydWU7XG4gIHRoaXMuc2VsZi5wb3N0TWVzc2FnZSh7bXNnOiAnREVDT0RFUl9SRUFEWSd9KTtcbn1cblxuRGVjb2Rlci5wcm90b3R5cGUuZGVjb2RlID0gZnVuY3Rpb24gKGRhdGEsIGluZm8pIHtcbiAgbGV0IHRpbWUgPSBwYXJzZUludChuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG4gIGxldCBpbmZvaWQgPSB0aW1lIC0gKE1hdGguZmxvb3IodGltZSAvIDEwZTgpICogMTBlOCk7XG4gIHRoaXMuaW5mb2xpc3RbaW5mb2lkXSA9IGluZm87XG4gIHRoaXMuc3RyZWFtQnVmZmVyLnNldChkYXRhKTtcbiAgTW9kdWxlLl9icm9hZHdheVBsYXlTdHJlYW0oZGF0YS5sZW5ndGgsIGluZm9pZCk7XG59XG5cbnZhciBkZWNvZGVyO1xuXG5mdW5jdGlvbiBvblBvc3RSdW4gKCkge1xuICBkZWNvZGVyID0gbmV3IERlY29kZXIodGhpcyk7XG4gIGRlY29kZXIuaW5pdCgpO1xufVxuXG5mdW5jdGlvbiBpbml0IChtZXRhKSB7XG4gIHNlbGYuaW1wb3J0U2NyaXB0cygnaHR0cHM6Ly9zZjYtdmNsb3VkY2RuLnBzdGF0cC5jb20vb2JqL3R0ZmUvbWVkaWEvZGVjb2Rlci9oMjY0L2RlY29kZXIuanMnKTtcbiAgYWRkT25Qb3N0UnVuKG9uUG9zdFJ1bi5iaW5kKHNlbGYpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2VsZikge1xuICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBkYXRhID0gZS5kYXRhO1xuICAgIGlmICghZGF0YS5tc2cpIHtcbiAgICAgIHNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBtc2c6ICdFUlJPUjppbnZhbGlkIG1lc3NhZ2UnXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKGRhdGEubXNnKSB7XG4gICAgICAgIGNhc2UgJ2luaXQnOlxuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgIHNlbGYubWV0YSA9IGRhdGEubWV0YTtcbiAgICAgICAgICBpbml0KClcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZGVjb2RlJzpcbiAgICAgICAgICBkZWNvZGVyLmRlY29kZShkYXRhLmRhdGEsIGRhdGEuaW5mbyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9LCBmYWxzZSk7XG59XG4iLCJjbGFzcyBZVVZDYW52YXMge1xuICBjb25zdHJ1Y3RvciAoY29uZmlncykge1xuICAgIHRoaXMuY29uZmlncyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZ3MpO1xuICAgIHRoaXMuY2FudmFzID0gdGhpcy5jb25maWdzLmNhbnZhcztcbiAgICB0aGlzLm1ldGEgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmNvbmZpZ3MubWV0YSk7XG4gICAgdGhpcy5jaHJvbWEgPSB0aGlzLm1ldGEuY2hyb21hRm9ybWF0O1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5tZXRhLnByZXNlbnRIZWlnaHQ7XG4gICAgdGhpcy53aWR0aCA9IHRoaXMubWV0YS5wcmVzZW50V2lkdGg7XG4gICAgdGhpcy5jYW52YXMud2lkdGggPSAxMjgwO1xuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IDcyMDtcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgdGhpcy5faW5pdENvbnRleHRHTCgpO1xuICAgIGlmICh0aGlzLmNvbnRleHRHTCkge1xuICAgICAgdGhpcy5faW5pdFByb2dyYW0oKTtcbiAgICAgIHRoaXMuX2luaXRCdWZmZXJzKCk7XG4gICAgICB0aGlzLl9pbml0VGV4dHVyZXMoKTtcbiAgICB9O1xuICB9XG5cbiAgX2luaXRDb250ZXh0R0wgKCkge1xuICAgIHZhciBjYW52YXMgPSB0aGlzLmNhbnZhcztcbiAgICB2YXIgZ2wgPSBudWxsO1xuXG4gICAgdmFyIHZhbGlkQ29udGV4dE5hbWVzID0gWyd3ZWJnbCcsICdleHBlcmltZW50YWwtd2ViZ2wnLCAnbW96LXdlYmdsJywgJ3dlYmtpdC0zZCddO1xuICAgIHZhciBuYW1lSW5kZXggPSAwO1xuXG4gICAgd2hpbGUgKCFnbCAmJiBuYW1lSW5kZXggPCB2YWxpZENvbnRleHROYW1lcy5sZW5ndGgpIHtcbiAgICAgIHZhciBjb250ZXh0TmFtZSA9IHZhbGlkQ29udGV4dE5hbWVzW25hbWVJbmRleF07XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRleHRPcHRpb25zKSB7XG4gICAgICAgICAgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dChjb250ZXh0TmFtZSwgdGhpcy5jb250ZXh0T3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dChjb250ZXh0TmFtZSk7XG4gICAgICAgIH07XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGdsID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFnbCB8fCB0eXBlb2YgZ2wuZ2V0UGFyYW1ldGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGdsID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgKytuYW1lSW5kZXg7XG4gICAgfTtcblxuICAgIHRoaXMuY29udGV4dEdMID0gZ2w7XG4gIH07XG5cbiAgX2luaXRQcm9ncmFtICgpIHtcbiAgICB2YXIgZ2wgPSB0aGlzLmNvbnRleHRHTDtcblxuICAgIC8vIHZlcnRleCBzaGFkZXIgaXMgdGhlIHNhbWUgZm9yIGFsbCB0eXBlc1xuICAgIHZhciB2ZXJ0ZXhTaGFkZXJTY3JpcHQ7XG4gICAgdmFyIGZyYWdtZW50U2hhZGVyU2NyaXB0O1xuICAgIHZlcnRleFNoYWRlclNjcmlwdCA9IFtcbiAgICAgICdhdHRyaWJ1dGUgdmVjNCB2ZXJ0ZXhQb3M7JyxcbiAgICAgICdhdHRyaWJ1dGUgdmVjNCB0ZXh0dXJlUG9zOycsXG4gICAgICAnYXR0cmlidXRlIHZlYzQgdVRleHR1cmVQb3M7JyxcbiAgICAgICdhdHRyaWJ1dGUgdmVjNCB2VGV4dHVyZVBvczsnLFxuICAgICAgJ3ZhcnlpbmcgdmVjMiB0ZXh0dXJlQ29vcmQ7JyxcbiAgICAgICd2YXJ5aW5nIHZlYzIgdVRleHR1cmVDb29yZDsnLFxuICAgICAgJ3ZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkOycsXG5cbiAgICAgICd2b2lkIG1haW4oKScsXG4gICAgICAneycsXG4gICAgICAnICBnbF9Qb3NpdGlvbiA9IHZlcnRleFBvczsnLFxuICAgICAgJyAgdGV4dHVyZUNvb3JkID0gdGV4dHVyZVBvcy54eTsnLFxuICAgICAgJyAgdVRleHR1cmVDb29yZCA9IHVUZXh0dXJlUG9zLnh5OycsXG4gICAgICAnICB2VGV4dHVyZUNvb3JkID0gdlRleHR1cmVQb3MueHk7JyxcbiAgICAgICd9J1xuICAgIF0uam9pbignXFxuJyk7XG5cbiAgICBmcmFnbWVudFNoYWRlclNjcmlwdCA9IFtcbiAgICAgICdwcmVjaXNpb24gaGlnaHAgZmxvYXQ7JyxcbiAgICAgICd2YXJ5aW5nIGhpZ2hwIHZlYzIgdGV4dHVyZUNvb3JkOycsXG4gICAgICAndmFyeWluZyBoaWdocCB2ZWMyIHVUZXh0dXJlQ29vcmQ7JyxcbiAgICAgICd2YXJ5aW5nIGhpZ2hwIHZlYzIgdlRleHR1cmVDb29yZDsnLFxuICAgICAgJ3VuaWZvcm0gc2FtcGxlcjJEIHlTYW1wbGVyOycsXG4gICAgICAndW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7JyxcbiAgICAgICd1bmlmb3JtIHNhbXBsZXIyRCB2U2FtcGxlcjsnLFxuICAgICAgJ3VuaWZvcm0gbWF0NCBZVVYyUkdCOycsXG5cbiAgICAgICd2b2lkIG1haW4odm9pZCkgeycsXG4gICAgICAnICBoaWdocCBmbG9hdCB5ID0gdGV4dHVyZTJEKHlTYW1wbGVyLCAgdGV4dHVyZUNvb3JkKS5yOycsXG4gICAgICAnICBoaWdocCBmbG9hdCB1ID0gdGV4dHVyZTJEKHVTYW1wbGVyLCAgdVRleHR1cmVDb29yZCkucjsnLFxuICAgICAgJyAgaGlnaHAgZmxvYXQgdiA9IHRleHR1cmUyRCh2U2FtcGxlciwgIHZUZXh0dXJlQ29vcmQpLnI7JyxcbiAgICAgICcgIGdsX0ZyYWdDb2xvciA9IHZlYzQoeSwgdSwgdiwgMSkgKiBZVVYyUkdCOycsXG4gICAgICAnfSdcbiAgICBdLmpvaW4oJ1xcbicpO1xuXG4gICAgdmFyIFlVVjJSR0IgPSBbXG4gICAgICAxLjE2NDM4LCAwLjAwMDAwLCAxLjU5NjAzLCAtMC44NzA3OSxcbiAgICAgIDEuMTY0MzgsIC0wLjM5MTc2LCAtMC44MTI5NywgMC41Mjk1OSxcbiAgICAgIDEuMTY0MzgsIDIuMDE3MjMsIDAuMDAwMDAsIC0xLjA4MTM5LFxuICAgICAgMCwgMCwgMCwgMVxuICAgIF07XG4gICAgdmFyIHZlcnRleFNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcbiAgICBnbC5zaGFkZXJTb3VyY2UodmVydGV4U2hhZGVyLCB2ZXJ0ZXhTaGFkZXJTY3JpcHQpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIodmVydGV4U2hhZGVyKTtcbiAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcih2ZXJ0ZXhTaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgY29uc29sZS5sb2coJ1ZlcnRleCBzaGFkZXIgZmFpbGVkIHRvIGNvbXBpbGU6ICcgKyBnbC5nZXRTaGFkZXJJbmZvTG9nKHZlcnRleFNoYWRlcikpO1xuICAgIH1cblxuICAgIHZhciBmcmFnbWVudFNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihnbC5GUkFHTUVOVF9TSEFERVIpO1xuICAgIGdsLnNoYWRlclNvdXJjZShmcmFnbWVudFNoYWRlciwgZnJhZ21lbnRTaGFkZXJTY3JpcHQpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIoZnJhZ21lbnRTaGFkZXIpO1xuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKGZyYWdtZW50U2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdGcmFnbWVudCBzaGFkZXIgZmFpbGVkIHRvIGNvbXBpbGU6ICcgKyBnbC5nZXRTaGFkZXJJbmZvTG9nKGZyYWdtZW50U2hhZGVyKSk7XG4gICAgfVxuXG4gICAgdmFyIHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHZlcnRleFNoYWRlcik7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcbiAgICBnbC5saW5rUHJvZ3JhbShwcm9ncmFtKTtcbiAgICBpZiAoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpKSB7XG4gICAgICBjb25zb2xlLmxvZygnUHJvZ3JhbSBmYWlsZWQgdG8gY29tcGlsZTogJyArIGdsLmdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pKTtcbiAgICB9XG5cbiAgICBnbC51c2VQcm9ncmFtKHByb2dyYW0pO1xuXG4gICAgdmFyIFlVVjJSR0JSZWYgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgJ1lVVjJSR0InKTtcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KFlVVjJSR0JSZWYsIGZhbHNlLCBZVVYyUkdCKTtcblxuICAgIHRoaXMuc2hhZGVyUHJvZ3JhbSA9IHByb2dyYW07XG4gIH1cblxuICBfaW5pdEJ1ZmZlcnMgKCkge1xuICAgIHZhciBnbCA9IHRoaXMuY29udGV4dEdMO1xuICAgIHZhciBwcm9ncmFtID0gdGhpcy5zaGFkZXJQcm9ncmFtO1xuXG4gICAgdmFyIHZlcnRleFBvc0J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2ZXJ0ZXhQb3NCdWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KFsxLCAxLCAtMSwgMSwgMSwgLTEsIC0xLCAtMV0pLCBnbC5TVEFUSUNfRFJBVyk7XG5cbiAgICB2YXIgdmVydGV4UG9zUmVmID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgJ3ZlcnRleFBvcycpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHZlcnRleFBvc1JlZik7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcih2ZXJ0ZXhQb3NSZWYsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG5cbiAgICB2YXIgdGV4dHVyZVBvc0J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0ZXh0dXJlUG9zQnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShbMSwgMCwgMCwgMCwgMSwgMSwgMCwgMV0pLCBnbC5TVEFUSUNfRFJBVyk7XG5cbiAgICB2YXIgdGV4dHVyZVBvc1JlZiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sICd0ZXh0dXJlUG9zJyk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGV4dHVyZVBvc1JlZik7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcih0ZXh0dXJlUG9zUmVmLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuXG4gICAgdGhpcy50ZXh0dXJlUG9zQnVmZmVyID0gdGV4dHVyZVBvc0J1ZmZlcjtcblxuICAgIHZhciB1VGV4dHVyZVBvc0J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB1VGV4dHVyZVBvc0J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDAsIDEsIDEsIDAsIDFdKSwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgdmFyIHVUZXh0dXJlUG9zUmVmID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgJ3VUZXh0dXJlUG9zJyk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodVRleHR1cmVQb3NSZWYpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodVRleHR1cmVQb3NSZWYsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG5cbiAgICB0aGlzLnVUZXh0dXJlUG9zQnVmZmVyID0gdVRleHR1cmVQb3NCdWZmZXI7XG5cbiAgICB2YXIgdlRleHR1cmVQb3NCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdlRleHR1cmVQb3NCdWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KFsxLCAwLCAwLCAwLCAxLCAxLCAwLCAxXSksIGdsLlNUQVRJQ19EUkFXKTtcblxuICAgIHZhciB2VGV4dHVyZVBvc1JlZiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sICd2VGV4dHVyZVBvcycpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHZUZXh0dXJlUG9zUmVmKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHZUZXh0dXJlUG9zUmVmLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuXG4gICAgdGhpcy52VGV4dHVyZVBvc0J1ZmZlciA9IHZUZXh0dXJlUG9zQnVmZmVyO1xuICB9O1xuXG4gIF9pbml0VGV4dHVyZXMgKCkge1xuICAgIHZhciBnbCA9IHRoaXMuY29udGV4dEdMO1xuICAgIHZhciBwcm9ncmFtID0gdGhpcy5zaGFkZXJQcm9ncmFtO1xuICAgIHZhciB5VGV4dHVyZVJlZiA9IHRoaXMuX2luaXRUZXh0dXJlKCk7XG4gICAgdmFyIHlTYW1wbGVyUmVmID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sICd5U2FtcGxlcicpO1xuICAgIGdsLnVuaWZvcm0xaSh5U2FtcGxlclJlZiwgMCk7XG4gICAgdGhpcy55VGV4dHVyZVJlZiA9IHlUZXh0dXJlUmVmO1xuXG4gICAgdmFyIHVUZXh0dXJlUmVmID0gdGhpcy5faW5pdFRleHR1cmUoKTtcbiAgICB2YXIgdVNhbXBsZXJSZWYgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgJ3VTYW1wbGVyJyk7XG4gICAgZ2wudW5pZm9ybTFpKHVTYW1wbGVyUmVmLCAxKTtcbiAgICB0aGlzLnVUZXh0dXJlUmVmID0gdVRleHR1cmVSZWY7XG5cbiAgICB2YXIgdlRleHR1cmVSZWYgPSB0aGlzLl9pbml0VGV4dHVyZSgpO1xuICAgIHZhciB2U2FtcGxlclJlZiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCAndlNhbXBsZXInKTtcbiAgICBnbC51bmlmb3JtMWkodlNhbXBsZXJSZWYsIDIpO1xuICAgIHRoaXMudlRleHR1cmVSZWYgPSB2VGV4dHVyZVJlZjtcbiAgfVxuXG4gIF9pbml0VGV4dHVyZSAoKSB7XG4gICAgdmFyIGdsID0gdGhpcy5jb250ZXh0R0w7XG5cbiAgICB2YXIgdGV4dHVyZVJlZiA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlUmVmKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpO1xuXG4gICAgcmV0dXJuIHRleHR1cmVSZWY7XG4gIH1cblxuICBfZHJhd1BpY3R1cmVHTCAoZGF0YSwgd2lkdGgsIGhlaWdodCkge1xuICAgIGxldCBuV2lkdGggPSB3aWR0aDtcbiAgICB2YXIgeWxlbiA9IHdpZHRoICogaGVpZ2h0O1xuICAgIHZhciB1dmxlbiA9IHlsZW4gLyA0O1xuICAgIGlmICh0aGlzLmNocm9tYSA9PT0gNDIyKSB7XG4gICAgICB1dmxlbiA9IHlsZW4gLyAyXG4gICAgfSBlbHNlIGlmICh0aGlzLmNocm9tYSA9PT0gNDQ0KSB7XG4gICAgICB1dmxlbiA9IHlsZW47XG4gICAgfVxuICAgIGRhdGEgPSBuZXcgVWludDhBcnJheShkYXRhKTtcbiAgICBsZXQgcmVuZGVyRGF0YSA9IHtcbiAgICAgIHlEYXRhOiBkYXRhLnN1YmFycmF5KDAsIHlsZW4pLFxuICAgICAgdURhdGE6IGRhdGEuc3ViYXJyYXkoeWxlbiwgeWxlbiArIHV2bGVuKSxcbiAgICAgIHZEYXRhOiBkYXRhLnN1YmFycmF5KHlsZW4gKyB1dmxlbiwgeWxlbiArIHV2bGVuICsgdXZsZW4pXG4gICAgfVxuICAgIGlmICh3aWR0aCAlIDQgPiAwKSB7XG4gICAgICBuV2lkdGggPSB3aWR0aCArIDQgLSAod2lkdGggJSA0KTtcbiAgICAgIGxldCB5QXJyYXkgPSBuZXcgVWludDhBcnJheShuV2lkdGggKiBoZWlnaHQpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWlnaHQ7IGkrKykge1xuICAgICAgICB5QXJyYXkuc2V0KHJlbmRlckRhdGEueURhdGEuc3ViYXJyYXkoaSAqIHdpZHRoLCAoaSArIDEpICogd2lkdGgpLCBpICogbldpZHRoKTtcbiAgICAgIH1cbiAgICAgIHJlbmRlckRhdGEueURhdGEgPSB5QXJyYXk7XG4gICAgfVxuXG4gICAgaWYgKCh3aWR0aCAvIDIpICUgNCA+IDApIHtcbiAgICAgIG5XaWR0aCA9ICh3aWR0aCAvIDIpICsgNCAtICgod2lkdGggLyAyKSAlIDQpO1xuICAgICAgbGV0IHVBcnJheSA9IG5ldyBVaW50OEFycmF5KG5XaWR0aCAqIGhlaWdodCAvIDIpO1xuICAgICAgbGV0IHZBcnJheSA9IG5ldyBVaW50OEFycmF5KG5XaWR0aCAqIGhlaWdodCAvIDIpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWlnaHQgLyAyOyBpKyspIHtcbiAgICAgICAgdUFycmF5LnNldChyZW5kZXJEYXRhLnVEYXRhLnN1YmFycmF5KGkgKiB3aWR0aCAvIDIsIChpICsgMSkgKiB3aWR0aCAvIDIpLCBpICogbldpZHRoKTtcbiAgICAgICAgdkFycmF5LnNldChyZW5kZXJEYXRhLnZEYXRhLnN1YmFycmF5KGkgKiB3aWR0aCAvIDIsIChpICsgMSkgKiB3aWR0aCAvIDIpLCBpICogbldpZHRoKTtcbiAgICAgIH1cbiAgICAgIHJlbmRlckRhdGEudURhdGEgPSB1QXJyYXk7XG4gICAgICByZW5kZXJEYXRhLnZEYXRhID0gdkFycmF5O1xuICAgIH1cbiAgICB0aGlzLl9kcmF3UGljdHVyZUdMNDIwKHJlbmRlckRhdGEsIHdpZHRoLCBoZWlnaHQpO1xuICB9XG5cbiAgX2RyYXdQaWN0dXJlR0w0MjAgKGRhdGEsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICB2YXIgZ2wgPSB0aGlzLmNvbnRleHRHTDtcbiAgICB2YXIgdGV4dHVyZVBvc0J1ZmZlciA9IHRoaXMudGV4dHVyZVBvc0J1ZmZlcjtcbiAgICB2YXIgdVRleHR1cmVQb3NCdWZmZXIgPSB0aGlzLnVUZXh0dXJlUG9zQnVmZmVyO1xuICAgIHZhciB2VGV4dHVyZVBvc0J1ZmZlciA9IHRoaXMudlRleHR1cmVQb3NCdWZmZXI7XG5cbiAgICB2YXIgeVRleHR1cmVSZWYgPSB0aGlzLnlUZXh0dXJlUmVmO1xuICAgIHZhciB1VGV4dHVyZVJlZiA9IHRoaXMudVRleHR1cmVSZWY7XG4gICAgdmFyIHZUZXh0dXJlUmVmID0gdGhpcy52VGV4dHVyZVJlZjtcblxuICAgIHZhciB5RGF0YSA9IGRhdGEueURhdGE7XG4gICAgdmFyIHVEYXRhID0gZGF0YS51RGF0YTtcbiAgICB2YXIgdkRhdGEgPSBkYXRhLnZEYXRhO1xuXG4gICAgdmFyIHlEYXRhUGVyUm93ID0gd2lkdGg7XG4gICAgdmFyIHlSb3dDbnQgPSBoZWlnaHQ7XG5cbiAgICB2YXIgdURhdGFQZXJSb3cgPSB3aWR0aCAvIDI7XG4gICAgdmFyIHVSb3dDbnQgPSBoZWlnaHQgLyAyO1xuXG4gICAgaWYgKHRoaXMuY2hyb21hID09PSA0MjIgfHwgdGhpcy5jaHJvbWEgPT09IDQ0NCkge1xuICAgICAgdVJvd0NudCA9IGhlaWdodDtcbiAgICB9XG4gICAgaWYgKHRoaXMuY2hyb21hID09PSA0NDQpIHtcbiAgICAgIHVEYXRhUGVyUm93ID0gd2lkdGg7XG4gICAgfVxuICAgIHZhciB2RGF0YVBlclJvdyA9IHVEYXRhUGVyUm93O1xuICAgIHZhciB2Um93Q250ID0gdVJvd0NudDtcbiAgICBcbiAgICBsZXQgcmF0aW93ID0gdGhpcy5jYW52YXMud2lkdGggLyB0aGlzLndpZHRoO1xuICAgIGxldCByYXRpb2ggPSB0aGlzLmNhbnZhcy5oZWlnaHQgLyB0aGlzLmhlaWdodDtcbiAgICBsZXQgbGVmdCA9IDA7XG4gICAgbGV0IHRvcCA9IDA7XG4gICAgbGV0IHcgPSB0aGlzLmNhbnZhcy53aWR0aDtcbiAgICBsZXQgaCA9IHRoaXMuY2FudmFzLmhlaWdodDtcbiAgICBpZiAocmF0aW93IDwgcmF0aW9oKSB7XG4gICAgICBoID0gKHRoaXMuaGVpZ2h0ICogdGhpcy5jYW52YXMud2lkdGggLyB0aGlzLndpZHRoKTtcbiAgICAgIHRvcCA9IHBhcnNlSW50KCh0aGlzLmNhbnZhcy5oZWlnaHQgLSAodGhpcy5oZWlnaHQgKiB0aGlzLmNhbnZhcy53aWR0aCAvIHRoaXMud2lkdGgpKSAvIDIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3ID0gKHRoaXMud2lkdGggKiB0aGlzLmNhbnZhcy5oZWlnaHQgLyB0aGlzLmhlaWdodCk7XG4gICAgICBsZWZ0ID0gcGFyc2VJbnQoKHRoaXMuY2FudmFzLndpZHRoIC0gKHRoaXMud2lkdGggKiB0aGlzLmNhbnZhcy5oZWlnaHQgLyB0aGlzLmhlaWdodCkpIC8gMik7XG4gICAgfVxuICAgIGdsLnZpZXdwb3J0KGxlZnQsIHRvcCwgdywgaCk7XG5cbiAgICB2YXIgdGV4dHVyZVBvc1ZhbHVlcyA9IG5ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDAsIDEsIDEsIDAsIDFdKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGV4dHVyZVBvc0J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHRleHR1cmVQb3NWYWx1ZXMsIGdsLkRZTkFNSUNfRFJBVyk7XG5cbiAgICB2YXIgdVRleHR1cmVQb3NWYWx1ZXMgPSBuZXcgRmxvYXQzMkFycmF5KFsxLCAwLCAwLCAwLCAxLCAxLCAwLCAxXSk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHVUZXh0dXJlUG9zQnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdVRleHR1cmVQb3NWYWx1ZXMsIGdsLkRZTkFNSUNfRFJBVyk7XG5cbiAgICB2YXIgdlRleHR1cmVQb3NWYWx1ZXMgPSBuZXcgRmxvYXQzMkFycmF5KFsxLCAwLCAwLCAwLCAxLCAxLCAwLCAxXSk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHZUZXh0dXJlUG9zQnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdlRleHR1cmVQb3NWYWx1ZXMsIGdsLkRZTkFNSUNfRFJBVyk7XG4gICAgXG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgeVRleHR1cmVSZWYpO1xuICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuTFVNSU5BTkNFLCB5RGF0YVBlclJvdywgeVJvd0NudCwgMCwgZ2wuTFVNSU5BTkNFLCBnbC5VTlNJR05FRF9CWVRFLCB5RGF0YSk7XG5cbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUxKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB1VGV4dHVyZVJlZik7XG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5MVU1JTkFOQ0UsIHVEYXRhUGVyUm93LCB1Um93Q250LCAwLCBnbC5MVU1JTkFOQ0UsIGdsLlVOU0lHTkVEX0JZVEUsIHVEYXRhKTtcblxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTIpO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHZUZXh0dXJlUmVmKTtcbiAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLkxVTUlOQU5DRSwgdkRhdGFQZXJSb3csIHZSb3dDbnQsIDAsIGdsLkxVTUlOQU5DRSwgZ2wuVU5TSUdORURfQllURSwgdkRhdGEpO1xuXG4gICAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRV9TVFJJUCwgMCwgNCk7XG4gIH1cblxuICBfZHJhd1BpY3R1cmVSR0IgKGRhdGEpIHtcblxuICB9XG5cbiAgcmVuZGVyIChkYXRhLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdmFyIGdsID0gdGhpcy5jb250ZXh0R0w7XG4gICAgaWYgKGdsKSB7XG4gICAgICB0aGlzLl9kcmF3UGljdHVyZUdMKGRhdGEsIHdpZHRoLCBoZWlnaHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kcmF3UGljdHVyZVJHQihkYXRhKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgWVVWQ2FudmFzO1xuIiwiY29uc3QgaXNPYmplY3RGaWxsZWQgPSAob2JqKSA9PiB7XG4gIGZvciAobGV0IGtleSBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGlmIChvYmpba2V5XSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVkaWFJbmZvIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMubWltZVR5cGUgPSBudWxsXG4gICAgdGhpcy5kdXJhdGlvbiA9IG51bGxcblxuICAgIHRoaXMuaGFzVmlkZW8gPSBudWxsXG4gICAgdGhpcy52aWRlbyA9IHtcbiAgICAgIGNvZGVjOiBudWxsLFxuICAgICAgd2lkdGg6IG51bGwsXG4gICAgICBoZWlnaHQ6IG51bGwsXG4gICAgICBwcm9maWxlOiBudWxsLFxuICAgICAgbGV2ZWw6IG51bGwsXG4gICAgICBmcmFtZVJhdGU6IHtcbiAgICAgICAgZml4ZWQ6IHRydWUsXG4gICAgICAgIGZwczogMjUsXG4gICAgICAgIGZwc19udW06IDI1MDAwLFxuICAgICAgICBmcHNfZGVuOiAxMDAwXG4gICAgICB9LFxuICAgICAgY2hyb21hRm9ybWF0OiBudWxsLFxuICAgICAgcGFyUmF0aW86IHtcbiAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgIGhlaWdodDogMVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaGFzQXVkaW8gPSBudWxsXG5cbiAgICB0aGlzLmF1ZGlvID0ge1xuICAgICAgY29kZWM6IG51bGwsXG4gICAgICBzYW1wbGVSYXRlOiBudWxsLFxuICAgICAgc2FtcGxlUmF0ZUluZGV4OiBudWxsLFxuICAgICAgY2hhbm5lbENvdW50OiBudWxsXG4gICAgfVxuICB9XG5cbiAgaXNDb21wbGV0ZSAoKSB7XG4gICAgcmV0dXJuIE1lZGlhSW5mby5pc0Jhc2VJbmZvUmVhZHkodGhpcykgJiYgTWVkaWFJbmZvLmlzVmlkZW9SZWFkeSh0aGlzKSAmJiBNZWRpYUluZm8uaXNBdWRpb1JlYWR5KHRoaXMpXG4gIH1cblxuICBzdGF0aWMgaXNCYXNlSW5mb1JlYWR5IChtZWRpYUluZm8pIHtcbiAgICByZXR1cm4gaXNPYmplY3RGaWxsZWQobWVkaWFJbmZvKVxuICB9XG5cbiAgc3RhdGljIGlzVmlkZW9SZWFkeSAobWVkaWFJbmZvKSB7XG4gICAgaWYgKCFtZWRpYUluZm8uaGFzVmlkZW8pIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgcmV0dXJuIGlzT2JqZWN0RmlsbGVkKG1lZGlhSW5mby52aWRlbylcbiAgfVxuXG4gIHN0YXRpYyBpc0F1ZGlvUmVhZHkgKG1lZGlhSW5mbykge1xuICAgIGlmICghbWVkaWFJbmZvLmhhc0F1ZGlvKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHJldHVybiBpc09iamVjdEZpbGxlZChtZWRpYUluZm8udmlkZW8pXG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lZGlhU2FtcGxlIHtcbiAgY29uc3RydWN0b3IgKGluZm8pIHtcbiAgICBsZXQgX2RlZmF1bHQgPSBNZWRpYVNhbXBsZS5nZXREZWZhdWx0SW5mKClcblxuICAgIGlmICghaW5mbyB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5mbykgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICByZXR1cm4gX2RlZmF1bHRcbiAgICB9XG4gICAgbGV0IHNhbXBsZSA9IE9iamVjdC5hc3NpZ24oe30sIF9kZWZhdWx0LCBpbmZvKVxuXG4gICAgT2JqZWN0LmVudHJpZXMoc2FtcGxlKS5mb3JFYWNoKChbaywgdl0pID0+IHtcbiAgICAgIHRoaXNba10gPSB2XG4gICAgfSlcbiAgfVxuXG4gIHN0YXRpYyBnZXREZWZhdWx0SW5mICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZHRzOiBudWxsLFxuICAgICAgcHRzOiBudWxsLFxuICAgICAgZHVyYXRpb246IG51bGwsXG4gICAgICBwb3NpdGlvbjogbnVsbCxcbiAgICAgIGlzUkFQOiBmYWxzZSwgLy8gaXMgUmFuZG9tIGFjY2VzcyBwb2ludFxuICAgICAgb3JpZ2luRHRzOiBudWxsXG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNZWRpYVNlZ21lbnRMaXN0IHtcblxuICAgIGNvbnN0cnVjdG9yICh0eXBlKSB7XG4gICAgICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLl9saXN0ID0gW107XG4gICAgICAgIHRoaXMuX2xhc3RBcHBlbmRMb2NhdGlvbiA9IC0xOyAvLyBjYWNoZWQgbGFzdCBpbnNlcnQgbG9jYXRpb25cbiAgICB9XG5cbiAgICBnZXQgdHlwZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90eXBlO1xuICAgIH1cblxuICAgIGdldCBsZW5ndGggKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGlzdC5sZW5ndGg7XG4gICAgfVxuXG4gICAgaXNFbXB0eSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0Lmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICBjbGVhciAoKSB7XG4gICAgICAgIHRoaXMuX2xpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5fbGFzdEFwcGVuZExvY2F0aW9uID0gLTE7XG4gICAgfVxuXG4gICAgX3NlYXJjaE5lYXJlc3RTZWdtZW50QmVmb3JlIChiZWdpbkR0cykge1xuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuX2xpc3Q7XG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIC0yO1xuICAgICAgICB9XG4gICAgICAgIGxldCBsYXN0ID0gbGlzdC5sZW5ndGggLSAxO1xuICAgICAgICBsZXQgbWlkID0gMDtcbiAgICAgICAgbGV0IGxib3VuZCA9IDA7XG4gICAgICAgIGxldCB1Ym91bmQgPSBsYXN0O1xuXG4gICAgICAgIGxldCBpZHggPSAwO1xuXG4gICAgICAgIGlmIChiZWdpbkR0cyA8IGxpc3RbMF0ub3JpZ2luRHRzKSB7XG4gICAgICAgICAgICBpZHggPSAtMTtcbiAgICAgICAgICAgIHJldHVybiBpZHg7XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAobGJvdW5kIDw9IHVib3VuZCkge1xuICAgICAgICAgICAgbWlkID0gbGJvdW5kICsgTWF0aC5mbG9vcigodWJvdW5kIC0gbGJvdW5kKSAvIDIpO1xuICAgICAgICAgICAgaWYgKG1pZCA9PT0gbGFzdCB8fCAoYmVnaW5EdHMgPiBsaXN0W21pZF0ubGFzdFNhbXBsZS5vcmlnaW5EdHNcbiAgICAgICAgICAgICAgICAgICAgJiYgKGJlZ2luRHRzIDwgbGlzdFttaWQgKyAxXS5vcmlnaW5EdHMpKSkge1xuICAgICAgICAgICAgICAgIGlkeCA9IG1pZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGlzdFttaWRdLm9yaWdpbkR0cyA8IGJlZ2luRHRzKSB7XG4gICAgICAgICAgICAgICAgbGJvdW5kID0gbWlkICsgMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdWJvdW5kID0gbWlkIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaWR4O1xuICAgIH1cblxuICAgIF9zZWFyY2hOZWFyZXN0U2VnbWVudEFmdGVyIChiZWdpbkR0cykge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUoYmVnaW5EdHMpICsgMTtcbiAgICB9XG5cbiAgICBhcHBlbmQgKHNlZ21lbnQpIHtcbiAgICAgICAgbGV0IGxpc3QgPSB0aGlzLl9saXN0O1xuICAgICAgICBsZXQgbGFzdEFwcGVuZElkeCA9IHRoaXMuX2xhc3RBcHBlbmRMb2NhdGlvbjtcbiAgICAgICAgbGV0IGluc2VydElkeCA9IDA7XG5cbiAgICAgICAgaWYgKGxhc3RBcHBlbmRJZHggIT09IC0xICYmIGxhc3RBcHBlbmRJZHggPCBsaXN0Lmxlbmd0aFxuICAgICAgICAgICAgJiYgc2VnbWVudC5vcmlnaW5TdGFydER0cyA+PSBsaXN0W2xhc3RBcHBlbmRJZHhdLmxhc3RTYW1wbGUub3JpZ2luRHRzXG4gICAgICAgICAgICAmJiAoKGxhc3RBcHBlbmRJZHggPT09IGxpc3QubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgICAgICB8fCAobGFzdEFwcGVuZElkeCA8IGxpc3QubGVuZ3RoIC0gMVxuICAgICAgICAgICAgICAgICAgICAmJiBzZWdtZW50Lm9yaWdpblN0YXJ0RHRzIDwgbGlzdFtsYXN0QXBwZW5kSWR4ICsgMV0ub3JpZ2luU3RhcnREdHMpKSkge1xuICAgICAgICAgICAgaW5zZXJ0SWR4ID0gbGFzdEFwcGVuZElkeCArIDE7IC8vIHVzZSBjYWNoZWQgbG9jYXRpb24gaWR4XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAobGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaW5zZXJ0SWR4ID0gdGhpcy5fc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUoc2VnbWVudC5vcmlnaW5TdGFydER0cykgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbGFzdEFwcGVuZExvY2F0aW9uID0gaW5zZXJ0SWR4O1xuICAgICAgICB0aGlzLl9saXN0LnNwbGljZShpbnNlcnRJZHgsIDAsIHNlZ21lbnQpO1xuICAgIH1cblxuICAgIGdldExhc3RTZWdtZW50QmVmb3JlIChiZWdpbkR0cykge1xuICAgICAgICBsZXQgaWR4ID0gdGhpcy5fc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUoYmVnaW5EdHMpO1xuICAgICAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0W2lkeF07XG4gICAgICAgIH0gZWxzZSB7IC8vIC0xXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldExhc3RTYW1wbGVCZWZvcmUgKGJlZ2luRHRzKSB7XG4gICAgICAgIGxldCBzZWdtZW50ID0gdGhpcy5nZXRMYXN0U2VnbWVudEJlZm9yZShiZWdpbkR0cyk7XG4gICAgICAgIGlmIChzZWdtZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VnbWVudC5sYXN0U2FtcGxlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRMYXN0UkFQQmVmb3JlIChiZWdpbkR0cykge1xuICAgICAgICBsZXQgc2VnbWVudElkeCA9IHRoaXMuX3NlYXJjaE5lYXJlc3RTZWdtZW50QmVmb3JlKGJlZ2luRHRzKTtcbiAgICAgICAgbGV0IHJhbmRvbUFjY2Vzc1BvaW50cyA9IHRoaXMuX2xpc3Rbc2VnbWVudElkeF0ucmFuZG9tQWNjZXNzUG9pbnRzO1xuICAgICAgICB3aGlsZSAocmFuZG9tQWNjZXNzUG9pbnRzLmxlbmd0aCA9PT0gMCAmJiBzZWdtZW50SWR4ID4gMCkge1xuICAgICAgICAgICAgc2VnbWVudElkeC0tO1xuICAgICAgICAgICAgcmFuZG9tQWNjZXNzUG9pbnRzID0gdGhpcy5fbGlzdFtzZWdtZW50SWR4XS5yYW5kb21BY2Nlc3NQb2ludHM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhbmRvbUFjY2Vzc1BvaW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gcmFuZG9tQWNjZXNzUG9pbnRzW3JhbmRvbUFjY2Vzc1BvaW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVkaWFTZWdtZW50IHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHRoaXMuc3RhcnREdHMgPSAtMTtcbiAgICAgICAgdGhpcy5lbmREdHMgPSAtMTtcbiAgICAgICAgdGhpcy5zdGFydFB0cyA9IC0xO1xuICAgICAgICB0aGlzLmVuZFB0cyA9IC0xO1xuICAgICAgICB0aGlzLm9yaWdpblN0YXJ0RHRzID0gLTE7XG4gICAgICAgIHRoaXMub3JpZ2luRW5kRHRzID0gLTE7XG4gICAgICAgIHRoaXMucmFuZG9tQWNjZXNzUG9pbnRzID0gW107XG4gICAgICAgIHRoaXMuZmlyc3RTYW1wbGUgPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RTYW1wbGUgPSBudWxsO1xuICAgIH1cblxuICAgIGFkZFJBUCAoc2FtcGxlKSB7XG4gICAgICAgIHNhbXBsZS5pc1JBUCA9IHRydWU7XG4gICAgICAgIHRoaXMucmFuZG9tQWNjZXNzUG9pbnRzLnB1c2goc2FtcGxlKTtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIEF1ZGlvVHJhY2tNZXRhIHtcbiAgY29uc3RydWN0b3IgKG1ldGEpIHtcbiAgICBjb25zdCBfZGVmYXVsdCA9IHtcbiAgICAgIHNhbXBsZVJhdGU6IDQ4MDAwLFxuICAgICAgY2hhbm5lbENvdW50OiAyLFxuICAgICAgY29kZWM6ICdtcDRhLjQwLjInLFxuICAgICAgY29uZmlnOiBbNDEsIDQwMSwgMTM2LCAwXSxcbiAgICAgIGR1cmF0aW9uOiAwLFxuICAgICAgaWQ6IDIsXG4gICAgICByZWZTYW1wbGVEdXJhdGlvbjogMjEsXG4gICAgICBzYW1wbGVSYXRlSW5kZXg6IDMsXG4gICAgICB0aW1lc2NhbGU6IDEwMDAsXG4gICAgICB0eXBlOiAnYXVkaW8nXG4gICAgfVxuICAgIGlmIChtZXRhKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgX2RlZmF1bHQsIG1ldGEpXG4gICAgfVxuICAgIHJldHVybiBfZGVmYXVsdFxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5pbml0ID0gbnVsbFxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWaWRlb1RyYWNrTWV0YSB7XG4gIGNvbnN0cnVjdG9yIChtZXRhKSB7XG4gICAgY29uc3QgX2RlZmF1bHQgPSB7XG4gICAgICBhdmNjOiBudWxsLFxuICAgICAgc3BzOiBuZXcgVWludDhBcnJheSgwKSxcbiAgICAgIHBwczogbmV3IFVpbnQ4QXJyYXkoMCksXG4gICAgICBjaHJvbWFGb3JtYXQ6IDQyMCxcbiAgICAgIGNvZGVjOiAnYXZjMS42NDAwMjAnLFxuICAgICAgY29kZWNIZWlnaHQ6IDcyMCxcbiAgICAgIGNvZGVjV2lkdGg6IDEyODAsXG4gICAgICBkdXJhdGlvbjogMCxcbiAgICAgIGZyYW1lUmF0ZToge1xuICAgICAgICBmaXhlZDogdHJ1ZSxcbiAgICAgICAgZnBzOiAyNSxcbiAgICAgICAgZnBzX251bTogMjUwMDAsXG4gICAgICAgIGZwc19kZW46IDEwMDBcbiAgICAgIH0sXG4gICAgICBpZDogMSxcbiAgICAgIGxldmVsOiAnMy4yJyxcbiAgICAgIHByZXNlbnRIZWlnaHQ6IDcyMCxcbiAgICAgIHByZXNlbnRXaWR0aDogMTI4MCxcbiAgICAgIHByb2ZpbGU6ICdIaWdoJyxcbiAgICAgIHJlZlNhbXBsZUR1cmF0aW9uOiA0MCxcbiAgICAgIHBhclJhdGlvOiB7XG4gICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgd2lkdGg6IDFcbiAgICAgIH0sXG4gICAgICB0aW1lc2NhbGU6IDEwMDAsXG4gICAgICB0eXBlOiAndmlkZW8nXG4gICAgfVxuXG4gICAgaWYgKG1ldGEpIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBfZGVmYXVsdCwgbWV0YSlcbiAgICB9XG4gICAgcmV0dXJuIF9kZWZhdWx0XG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmluaXQgPSBudWxsXG4gICAgdGhpcy5zcHMgPSBudWxsXG4gICAgdGhpcy5wcHMgPSBudWxsXG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBBdWRpb1RyYWNrU2FtcGxlIHtcbiAgY29uc3RydWN0b3IgKGluZm8pIHtcbiAgICBsZXQgX2RlZmF1bHQgPSBBdWRpb1RyYWNrU2FtcGxlLmdldERlZmF1bHQoKVxuICAgIGlmICghaW5mbykge1xuICAgICAgcmV0dXJuIF9kZWZhdWx0XG4gICAgfVxuICAgIGxldCBzYW1wbGUgPSBPYmplY3QuYXNzaWduKHt9LCBfZGVmYXVsdCwgaW5mbylcblxuICAgIHJldHVybiBzYW1wbGVcbiAgfVxuXG4gIHN0YXRpYyBnZXREZWZhdWx0ICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZHRzOiBudWxsLFxuICAgICAgcHRzOiBudWxsLFxuICAgICAgZGF0YTogbmV3IFVpbnQ4QXJyYXkoKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVmlkZW9UcmFja1NhbXBsZSB7XG4gIGNvbnN0cnVjdG9yIChpbmZvKSB7XG4gICAgbGV0IF9kZWZhdWx0ID0gVmlkZW9UcmFja1NhbXBsZS5nZXREZWZhdWx0KClcblxuICAgIGlmICghaW5mbykge1xuICAgICAgcmV0dXJuIF9kZWZhdWx0XG4gICAgfVxuICAgIGxldCBzYW1wbGUgPSBPYmplY3QuYXNzaWduKHt9LCBfZGVmYXVsdCwgaW5mbylcblxuICAgIHJldHVybiBzYW1wbGVcbiAgfVxuXG4gIHN0YXRpYyBnZXREZWZhdWx0ICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZHRzOiBudWxsLFxuICAgICAgcHRzOiBudWxsLFxuICAgICAgaXNLZXlmcmFtZTogZmFsc2UsIC8vIGlzIFJhbmRvbSBhY2Nlc3MgcG9pbnRcbiAgICAgIG9yaWdpbkR0czogbnVsbCxcbiAgICAgIGRhdGE6IG5ldyBVaW50OEFycmF5KClcbiAgICB9XG4gIH1cbn1cbiIsImNsYXNzIE1TRSB7XG4gIGNvbnN0cnVjdG9yIChjb25maWdzKSB7XG4gICAgdGhpcy5jb25maWdzID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlncyk7XG4gICAgdGhpcy5jb250YWluZXIgPSB0aGlzLmNvbmZpZ3MuY29udGFpbmVyO1xuICAgIHRoaXMubWVkaWFTb3VyY2UgPSBudWxsO1xuICAgIHRoaXMuc291cmNlQnVmZmVycyA9IHt9O1xuICAgIHRoaXMucHJlbG9hZFRpbWUgPSB0aGlzLmNvbmZpZ3MucHJlbG9hZFRpbWUgfHwgMTtcbiAgICB0aGlzLm9uU291cmNlT3BlbiA9IHRoaXMub25Tb3VyY2VPcGVuLmJpbmQodGhpcylcbiAgICB0aGlzLm9uVGltZVVwZGF0ZSA9IHRoaXMub25UaW1lVXBkYXRlLmJpbmQodGhpcylcbiAgICB0aGlzLm9uVXBkYXRlRW5kID0gdGhpcy5vblVwZGF0ZUVuZC5iaW5kKHRoaXMpXG4gICAgdGhpcy5vbldhaXRpbmcgPSB0aGlzLm9uV2FpdGluZy5iaW5kKHRoaXMpXG4gIH1cblxuICBpbml0ICgpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICB0aGlzLm1lZGlhU291cmNlID0gbmV3IHNlbGYuTWVkaWFTb3VyY2UoKTtcbiAgICB0aGlzLm1lZGlhU291cmNlLmFkZEV2ZW50TGlzdGVuZXIoJ3NvdXJjZW9wZW4nLCB0aGlzLm9uU291cmNlT3Blbik7XG4gICAgdGhpcy5jb250YWluZXIuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTCh0aGlzLm1lZGlhU291cmNlKTtcbiAgICB0aGlzLnVybCA9IHRoaXMuY29udGFpbmVyLnNyYztcbiAgICB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgdGhpcy5vblRpbWVVcGRhdGUpO1xuICAgIHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3dhaXRpbmcnLCB0aGlzLm9uV2FpdGluZyk7XG4gIH1cblxuICBvblRpbWVVcGRhdGUgKCkge1xuICAgIHRoaXMuZW1pdCgnVElNRV9VUERBVEUnLCB0aGlzLmNvbnRhaW5lcik7XG4gIH1cblxuICBvbldhaXRpbmcgKCkge1xuICAgIHRoaXMuZW1pdCgnV0FJVElORycsIHRoaXMuY29udGFpbmVyKTtcbiAgfVxuXG4gIG9uU291cmNlT3BlbiAoKSB7XG4gICAgdGhpcy5hZGRTb3VyY2VCdWZmZXJzKCk7XG4gIH1cblxuICBvblVwZGF0ZUVuZCAoKSB7XG4gICAgdGhpcy5lbWl0KCdTT1VSQ0VfVVBEQVRFX0VORCcpO1xuICAgIHRoaXMuZG9BcHBlbmQoKVxuICB9XG4gIGFkZFNvdXJjZUJ1ZmZlcnMgKCkge1xuICAgIGlmICh0aGlzLm1lZGlhU291cmNlLnJlYWR5U3RhdGUgIT09ICdvcGVuJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgc291cmNlcyA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1BSRV9TT1VSQ0VfQlVGRkVSJyk7XG4gICAgbGV0IHRyYWNrcyA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpO1xuICAgIGxldCB0cmFjaztcblxuICAgIHNvdXJjZXMgPSBzb3VyY2VzLnNvdXJjZXM7XG4gICAgbGV0IGFkZCA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwLCBrID0gT2JqZWN0LmtleXMoc291cmNlcykubGVuZ3RoOyBpIDwgazsgaSsrKSB7XG4gICAgICBsZXQgdHlwZSA9IE9iamVjdC5rZXlzKHNvdXJjZXMpW2ldO1xuICAgICAgaWYgKHR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgICAgdHJhY2sgPSB0cmFja3MuYXVkaW9UcmFjaztcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICB0cmFjayA9IHRyYWNrcy52aWRlb1RyYWNrO1xuICAgICAgICAvLyByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodHJhY2spIHtcbiAgICAgICAgbGV0IGR1ciA9IHR5cGUgPT09ICdhdWRpbycgPyAyMSA6IDQwO1xuICAgICAgICBpZiAodHJhY2subWV0YSAmJiB0cmFjay5tZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSBkdXIgPSB0cmFjay5tZXRhLnJlZlNhbXBsZUR1cmF0aW9uO1xuICAgICAgICBpZiAoc291cmNlc1t0eXBlXS5kYXRhLmxlbmd0aCA+PSAodGhpcy5wcmVsb2FkVGltZSAvIGR1cikpIHtcbiAgICAgICAgICBhZGQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGFkZCkge1xuICAgICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycykubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gMCwgayA9IE9iamVjdC5rZXlzKHNvdXJjZXMpLmxlbmd0aDsgaSA8IGs7IGkrKykge1xuICAgICAgICBsZXQgdHlwZSA9IE9iamVjdC5rZXlzKHNvdXJjZXMpW2ldO1xuICAgICAgICBsZXQgc291cmNlID0gc291cmNlc1t0eXBlXVxuICAgICAgICBsZXQgbWltZSA9ICh0eXBlID09PSAndmlkZW8nKSA/ICd2aWRlby9tcDQ7Y29kZWNzPScgKyBzb3VyY2UubWltZXR5cGUgOiAnYXVkaW8vbXA0O2NvZGVjcz0nICsgc291cmNlLm1pbWV0eXBlXG4gICAgICAgIGxldCBzb3VyY2VCdWZmZXIgPSB0aGlzLm1lZGlhU291cmNlLmFkZFNvdXJjZUJ1ZmZlcihtaW1lKTtcbiAgICAgICAgdGhpcy5zb3VyY2VCdWZmZXJzW3R5cGVdID0gc291cmNlQnVmZmVyO1xuICAgICAgICBzb3VyY2VCdWZmZXIuYWRkRXZlbnRMaXN0ZW5lcigndXBkYXRlZW5kJywgdGhpcy5vblVwZGF0ZUVuZCk7XG4gICAgICAgIHRoaXMuZG9BcHBlbmQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkb0FwcGVuZCAoKSB7XG4gICAgbGV0IHNvdXJjZXMgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdQUkVfU09VUkNFX0JVRkZFUicpO1xuICAgIGlmIChzb3VyY2VzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE9iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycykubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHR5cGUgPSBPYmplY3Qua2V5cyh0aGlzLnNvdXJjZUJ1ZmZlcnMpW2ldXG4gICAgICAgIGxldCBzb3VyY2VCdWZmZXIgPSB0aGlzLnNvdXJjZUJ1ZmZlcnNbdHlwZV07XG4gICAgICAgIGlmICghc291cmNlQnVmZmVyLnVwZGF0aW5nKSB7XG4gICAgICAgICAgbGV0IHNvdXJjZSA9IHNvdXJjZXMuc291cmNlc1t0eXBlXTtcbiAgICAgICAgICBpZiAoc291cmNlICYmICFzb3VyY2UuaW5pdGVkKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnYXBwZW5kIGluaXRpYWwgc2VnbWVudCcpXG4gICAgICAgICAgICBzb3VyY2VCdWZmZXIuYXBwZW5kQnVmZmVyKHNvdXJjZS5pbml0LmJ1ZmZlci5idWZmZXIpO1xuICAgICAgICAgICAgc291cmNlLmluaXRlZCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gc291cmNlLmRhdGEuc2hpZnQoKVxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgc291cmNlQnVmZmVyLmFwcGVuZEJ1ZmZlcihkYXRhLmJ1ZmZlci5idWZmZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGVuZE9mU3RyZWFtICgpIHtcbiAgICBjb25zdCB7IHJlYWR5U3RhdGUsIGFjdGl2ZVNvdXJjZUJ1ZmZlcnMgfSA9IHRoaXMubWVkaWFTb3VyY2U7XG4gICAgaWYgKHJlYWR5U3RhdGUgPT09ICdvcGVuJyAmJiBhY3RpdmVTb3VyY2VCdWZmZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5tZWRpYVNvdXJjZS5lbmRPZlN0cmVhbSgpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGxvZ1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZSAoZW5kLCBzdGFydCA9IDApIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE9iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycykubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBidWZmZXIgPSB0aGlzLnNvdXJjZUJ1ZmZlcnNbT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKVtpXV07XG4gICAgICBpZiAoIWJ1ZmZlci51cGRhdGluZykge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhzdGFydCwgZW5kKVxuICAgICAgICBidWZmZXIucmVtb3ZlKHN0YXJ0LCBlbmQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZW1vdmVCdWZmZXJzICgpIHtcbiAgICBjb25zdCB0YXNrTGlzdCA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBPYmplY3Qua2V5cyh0aGlzLnNvdXJjZUJ1ZmZlcnMpLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYnVmZmVyID0gdGhpcy5zb3VyY2VCdWZmZXJzW09iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycylbaV1dO1xuICAgICAgYnVmZmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3VwZGF0ZWVuZCcsIHRoaXMub25VcGRhdGVFbmQpO1xuXG4gICAgICBsZXQgdGFzaztcbiAgICAgIGlmIChidWZmZXIudXBkYXRpbmcpIHtcbiAgICAgICAgdGFzayA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgY29uc3QgZG9DbGVhbkJ1ZmZlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCByZXRyeVRpbWUgPSAzXG5cbiAgICAgICAgICAgIGNvbnN0IGNsZWFuID0gKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWJ1ZmZlci51cGRhdGluZykge1xuICAgICAgICAgICAgICAgIE1TRS5jbGVhckJ1ZmZlcihidWZmZXIpXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAocmV0cnlUaW1lID4gMCl7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChjbGVhbiwgMjAwKVxuICAgICAgICAgICAgICAgIHJldHJ5VGltZS0tXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2V0VGltZW91dChjbGVhbiwgMjAwKVxuICAgICAgICAgICAgYnVmZmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3VwZGF0ZWVuZCcsIGRvQ2xlYW5CdWZmZXIpXG4gICAgICAgICAgfVxuICAgICAgICAgIGJ1ZmZlci5hZGRFdmVudExpc3RlbmVyKCd1cGRhdGVlbmQnLCBkb0NsZWFuQnVmZmVyKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgTVNFLmNsZWFyQnVmZmVyKGJ1ZmZlcilcbiAgICAgICAgdGFzayA9IFByb21pc2UucmVzb2x2ZSgpXG4gICAgICB9XG5cbiAgICAgIHRhc2tMaXN0LnB1c2godGFzaylcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwodGFza0xpc3QpXG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICByZXR1cm4gdGhpcy5yZW1vdmVCdWZmZXJzKCkudGhlbigoKSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE9iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycykubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IHRoaXMuc291cmNlQnVmZmVyc1tPYmplY3Qua2V5cyh0aGlzLnNvdXJjZUJ1ZmZlcnMpW2ldXTtcbiAgICAgICAgdGhpcy5tZWRpYVNvdXJjZS5yZW1vdmVTb3VyY2VCdWZmZXIoYnVmZmVyKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuc291cmNlQnVmZmVyc1tPYmplY3Qua2V5cyh0aGlzLnNvdXJjZUJ1ZmZlcnMpW2ldXTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndGltZXVwZGF0ZScsIHRoaXMub25UaW1lVXBkYXRlKTtcbiAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3dhaXRpbmcnLCB0aGlzLm9uV2FpdGluZyk7XG4gICAgICB0aGlzLm1lZGlhU291cmNlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3NvdXJjZW9wZW4nLCB0aGlzLm9uU291cmNlT3Blbik7XG5cbiAgICAgIHRoaXMuZW5kT2ZTdHJlYW0oKVxuICAgICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwodGhpcy51cmwpO1xuXG4gICAgICB0aGlzLnVybCA9IG51bGxcbiAgICAgIHRoaXMuY29uZmlncyA9IHt9O1xuICAgICAgdGhpcy5jb250YWluZXIgPSBudWxsO1xuICAgICAgdGhpcy5tZWRpYVNvdXJjZSA9IG51bGw7XG4gICAgICB0aGlzLnNvdXJjZUJ1ZmZlcnMgPSB7fTtcbiAgICAgIHRoaXMucHJlbG9hZFRpbWUgPSAxO1xuICAgIH0pXG4gIH1cblxuICBzdGF0aWMgY2xlYXJCdWZmZXIgKGJ1ZmZlcikge1xuICAgIGNvbnN0IGJ1ZmZlcmVkID0gYnVmZmVyLmJ1ZmZlcmVkO1xuICAgIGxldCBiRW5kID0gMC4xXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGJ1ZmZlcmVkLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBiRW5kID0gYnVmZmVyZWQuZW5kKGkpXG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBidWZmZXIucmVtb3ZlKDAsIGJFbmQpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gRE8gTk9USElOR1xuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgTVNFO1xuIiwiaW1wb3J0IENvbmNhdCBmcm9tICdjb25jYXQtdHlwZWQtYXJyYXknXG5cbmNsYXNzIEJ1ZmZlciB7XG4gIGNvbnN0cnVjdG9yIChidWZmZXIpIHtcbiAgICB0aGlzLmJ1ZmZlciA9IGJ1ZmZlciB8fCBuZXcgVWludDhBcnJheSgwKVxuICB9XG5cbiAgd3JpdGUgKC4uLmJ1ZmZlcikge1xuICAgIGJ1ZmZlci5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgdGhpcy5idWZmZXIgPSBDb25jYXQoVWludDhBcnJheSwgdGhpcy5idWZmZXIsIGl0ZW0pXG4gICAgfSlcbiAgfVxuXG4gIHN0YXRpYyB3cml0ZVVpbnQzMiAodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgdmFsdWUgPj4gMjQsXG4gICAgICAodmFsdWUgPj4gMTYpICYgMHhmZixcbiAgICAgICh2YWx1ZSA+PiA4KSAmIDB4ZmYsXG4gICAgICB2YWx1ZSAmIDB4ZmZcbiAgICBdKVxuICB9XG5cbiAgc3RhdGljIHJlYWRBc0ludCAoYXJyKSB7XG4gICAgbGV0IHRlbXAgPSAnJ1xuXG4gICAgZnVuY3Rpb24gcGFkU3RhcnQ0SGV4IChoZXhOdW0pIHtcbiAgICAgIGxldCBoZXhTdHIgPSBoZXhOdW0udG9TdHJpbmcoMTYpXG4gICAgICByZXR1cm4gaGV4U3RyLnBhZFN0YXJ0KDIsICcwJylcbiAgICB9XG5cbiAgICBhcnIuZm9yRWFjaChudW0gPT4ge1xuICAgICAgdGVtcCArPSBwYWRTdGFydDRIZXgobnVtKVxuICAgIH0pXG4gICAgcmV0dXJuIHBhcnNlSW50KHRlbXAsIDE2KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJ1ZmZlclxuIiwiY2xhc3MgU3RyZWFtIHtcbiAgY29uc3RydWN0b3IgKGJ1ZmZlcikge1xuICAgIGlmIChidWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgdGhpcy5idWZmZXIgPSBidWZmZXI7XG4gICAgICB0aGlzLmRhdGF2aWV3ID0gbmV3IERhdGFWaWV3KGJ1ZmZlcik7XG4gICAgICB0aGlzLmRhdGF2aWV3LnBvc2l0aW9uID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdkYXRhIGlzIGludmFsaWQnKTtcbiAgICB9XG4gIH1cblxuICBnZXQgbGVuZ3RoICgpIHtcbiAgICByZXR1cm4gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aDtcbiAgfVxuXG4gIHNldCBwb3NpdGlvbiAodmFsdWUpIHtcbiAgICB0aGlzLmRhdGF2aWV3LnBvc2l0aW9uID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcG9zaXRpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGF2aWV3LnBvc2l0aW9uO1xuICB9XG5cbiAgYmFjayAoY291bnQpIHtcbiAgICB0aGlzLnBvc2l0aW9uIC09IGNvdW50O1xuICB9XG5cbiAgc2tpcCAoY291bnQpIHtcbiAgICBsZXQgbG9vcCA9IE1hdGguZmxvb3IoY291bnQgLyA0KTtcbiAgICBsZXQgbGFzdCA9IGNvdW50ICUgNDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxvb3A7IGkrKykge1xuICAgICAgU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIDQpO1xuICAgIH1cbiAgICBpZiAobGFzdCA+IDApIHtcbiAgICAgIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCBsYXN0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogW3JlYWRCeXRlIOS7jkRhdGFWaWV35Lit6K+75Y+W5pWw5o2uXVxuICAgKiBAcGFyYW0gIHtEYXRhVmlld30gYnVmZmVyIFtEYXRhVmlld+WunuS+i11cbiAgICogQHBhcmFtICB7TnVtYmVyfSBzaXplICAgW+ivu+WPluWtl+iKguaVsF1cbiAgICogQHJldHVybiB7TnVtYmVyfSAgICAgICAgW+aVtOaVsF1cbiAgICovXG4gIHN0YXRpYyByZWFkQnl0ZSAoYnVmZmVyLCBzaXplLCBzaWduKSB7XG4gICAgbGV0IHJlcztcbiAgICBzd2l0Y2ggKHNpemUpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaWYgKHNpZ24pIHtcbiAgICAgICAgICByZXMgPSBidWZmZXIuZ2V0SW50OChidWZmZXIucG9zaXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRVaW50OChidWZmZXIucG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBpZiAoc2lnbikge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRJbnQxNihidWZmZXIucG9zaXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRVaW50MTYoYnVmZmVyLnBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaWYgKHNpZ24pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBzdXBwb3J0ZWQgZm9yIHJlYWRCeXRlIDMnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXMgPSBidWZmZXIuZ2V0VWludDgoYnVmZmVyLnBvc2l0aW9uKSA8PCAxNjtcbiAgICAgICAgICByZXMgfD0gYnVmZmVyLmdldFVpbnQ4KGJ1ZmZlci5wb3NpdGlvbiArIDEpIDw8IDg7XG4gICAgICAgICAgcmVzIHw9IGJ1ZmZlci5nZXRVaW50OChidWZmZXIucG9zaXRpb24gKyAyKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgaWYgKHNpZ24pIHtcbiAgICAgICAgICByZXMgPSBidWZmZXIuZ2V0SW50MzIoYnVmZmVyLnBvc2l0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXMgPSBidWZmZXIuZ2V0VWludDMyKGJ1ZmZlci5wb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDg6XG4gICAgICAgIGlmIChzaWduKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3Qgc3VwcG9ydGVkIGZvciByZWFkQm9keSA4Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzID0gYnVmZmVyLmdldFVpbnQzMihidWZmZXIucG9zaXRpb24pIDw8IDMyO1xuICAgICAgICAgIHJlcyB8PSBidWZmZXIuZ2V0VWludDMyKGJ1ZmZlci5wb3NpdGlvbiArIDQpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmVzID0gJyc7XG4gICAgfVxuICAgIGJ1ZmZlci5wb3NpdGlvbiArPSBzaXplO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICByZWFkVWludDggKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgMSk7XG4gIH1cblxuICByZWFkVWludDE2ICgpIHtcbiAgICByZXR1cm4gU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIDIpO1xuICB9XG5cbiAgcmVhZFVpbnQyNCAoKSB7XG4gICAgcmV0dXJuIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCAzKTtcbiAgfVxuXG4gIHJlYWRVaW50MzIgKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgNCk7XG4gIH1cblxuICByZWFkVWludDY0ICgpIHtcbiAgICByZXR1cm4gU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIDgpO1xuICB9XG5cbiAgcmVhZEludDggKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgMSwgdHJ1ZSk7XG4gIH1cbiAgcmVhZEludDE2ICgpIHtcbiAgICByZXR1cm4gU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIDIsIHRydWUpO1xuICB9XG5cbiAgcmVhZEludDMyICgpIHtcbiAgICByZXR1cm4gU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIDQsIHRydWUpO1xuICB9XG5cbiAgd3JpdGVVaW50MzIgKHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFtcbiAgICAgIHZhbHVlID4+PiAyNCAmIDB4ZmYsXG4gICAgICB2YWx1ZSA+Pj4gMTYgJiAweGZmLFxuICAgICAgdmFsdWUgPj4+IDggJiAweGZmLFxuICAgICAgdmFsdWUgJiAweGZmXG4gICAgXSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RyZWFtO1xuIiwiaW1wb3J0IFJlbXV4ZXIgZnJvbSAneGdwbGF5ZXItcmVtdXgnXG5pbXBvcnQgeyBGZXRjaExvYWRlciB9IGZyb20gJ3hncGxheWVyLWxvYWRlcidcbmltcG9ydCB7IEZsdkRlbXV4ZXIgfSBmcm9tICd4Z3BsYXllci1kZW11eCdcbmltcG9ydCB7IFRyYWNrcywgWGdCdWZmZXIsIFByZVNvdXJjZSB9IGZyb20gJ3hncGxheWVyLWJ1ZmZlcidcbmltcG9ydCB7IE1zZSwgRVZFTlRTIH0gZnJvbSAneGdwbGF5ZXItdXRpbHMnXG5pbXBvcnQgeyBDb21wYXRpYmlsaXR5IH0gZnJvbSAneGdwbGF5ZXItY29kZWMnXG5pbXBvcnQgUGxheWVyIGZyb20gJ3hncGxheWVyJ1xuXG5jb25zdCBSRU1VWF9FVkVOVFMgPSBFVkVOVFMuUkVNVVhfRVZFTlRTO1xuY29uc3QgREVNVVhfRVZFTlRTID0gRVZFTlRTLkRFTVVYX0VWRU5UUztcbmNvbnN0IExPQURFUl9FVkVOVFMgPSBFVkVOVFMuTE9BREVSX0VWRU5UU1xuY29uc3QgTVNFX0VWRU5UUyA9IEVWRU5UUy5NU0VfRVZFTlRTXG5cbmNvbnN0IFRhZyA9ICdGTFZDb250cm9sbGVyJ1xuXG5jbGFzcyBMb2dnZXIge1xuICB3YXJuICgpIHt9XG59XG5cbmNvbnN0IEZMVl9FUlJPUiA9ICdGTFZfRVJST1InXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZsdkNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvciAocGxheWVyKSB7XG4gICAgdGhpcy5UQUcgPSBUYWdcbiAgICB0aGlzLl9wbGF5ZXIgPSBwbGF5ZXJcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpbml0U2VnbWVudEFycml2ZWQ6IGZhbHNlXG4gICAgfVxuXG4gICAgdGhpcy5idWZmZXJDbGVhclRpbWVyID0gbnVsbDtcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIHRoaXMuX2NvbnRleHQucmVnaXN0cnkoJ0ZFVENIX0xPQURFUicsIEZldGNoTG9hZGVyKVxuICAgIHRoaXMuX2NvbnRleHQucmVnaXN0cnkoJ0xPQURFUl9CVUZGRVInLCBYZ0J1ZmZlcilcblxuICAgIHRoaXMuX2NvbnRleHQucmVnaXN0cnkoJ0ZMVl9ERU1VWEVSJywgRmx2RGVtdXhlcilcbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdUUkFDS1MnLCBUcmFja3MpXG5cbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdNUDRfUkVNVVhFUicsIFJlbXV4ZXIuTXA0UmVtdXhlcilcbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdQUkVfU09VUkNFX0JVRkZFUicsIFByZVNvdXJjZSlcblxuICAgIGlmICh0aGlzLl9wbGF5ZXIuY29uZmlnLmNvbXBhdGliaWxpdHkgIT09IGZhbHNlKSB7XG4gICAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdDT01QQVRJQklMSVRZJywgQ29tcGF0aWJpbGl0eSlcbiAgICB9XG5cbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdMT0dHRVInLCBMb2dnZXIpXG4gICAgdGhpcy5tc2UgPSB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdNU0UnLCBNc2UpKHsgY29udGFpbmVyOiB0aGlzLl9wbGF5ZXIudmlkZW8gfSlcblxuICAgIHRoaXMuX2hhbmRsZVRpbWVVcGRhdGUgPSB0aGlzLl9oYW5kbGVUaW1lVXBkYXRlLmJpbmQodGhpcylcblxuICAgIHRoaXMuaW5pdExpc3RlbmVycygpXG4gIH1cblxuICBpbml0TGlzdGVuZXJzICgpIHtcbiAgICB0aGlzLm9uKExPQURFUl9FVkVOVFMuTE9BREVSX0RBVEFMT0FERUQsIHRoaXMuX2hhbmRsZUxvYWRlckRhdGFMb2FkZWQuYmluZCh0aGlzKSlcbiAgICB0aGlzLm9uKExPQURFUl9FVkVOVFMuTE9BREVSX0VSUk9SLCB0aGlzLl9oYW5kbGVOZXR3b3JrRXJyb3IuYmluZCh0aGlzKSlcblxuICAgIHRoaXMub24oREVNVVhfRVZFTlRTLk1FRElBX0lORk8sIHRoaXMuX2hhbmRsZU1lZGlhSW5mby5iaW5kKHRoaXMpKVxuICAgIHRoaXMub24oREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgdGhpcy5faGFuZGxlTWV0YWRhdGFQYXJzZWQuYmluZCh0aGlzKSlcbiAgICB0aGlzLm9uKERFTVVYX0VWRU5UUy5ERU1VWF9DT01QTEVURSwgdGhpcy5faGFuZGxlRGVtdXhDb21wbGV0ZS5iaW5kKHRoaXMpKVxuICAgIHRoaXMub24oREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLl9oYW5kbGVEZW11eEVycm9yLmJpbmQodGhpcykpXG5cbiAgICB0aGlzLm9uKFJFTVVYX0VWRU5UUy5JTklUX1NFR01FTlQsIHRoaXMuX2hhbmRsZUFwcGVuZEluaXRTZWdtZW50LmJpbmQodGhpcykpXG4gICAgdGhpcy5vbihSRU1VWF9FVkVOVFMuTUVESUFfU0VHTUVOVCwgdGhpcy5faGFuZGxlTWVkaWFTZWdtZW50LmJpbmQodGhpcykpXG5cbiAgICB0aGlzLm9uKE1TRV9FVkVOVFMuU09VUkNFX1VQREFURV9FTkQsIHRoaXMuX2hhbmRsZVNvdXJjZVVwZGF0ZUVuZC5iaW5kKHRoaXMpKVxuXG4gICAgdGhpcy5fcGxheWVyLm9uKCd0aW1ldXBkYXRlJywgdGhpcy5faGFuZGxlVGltZVVwZGF0ZSlcbiAgfVxuXG4gIF9oYW5kbGVNZWRpYUluZm8gKCkge1xuICAgIGlmICghdGhpcy5fY29udGV4dC5tZWRpYUluZm8pIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIG5ldyBFcnJvcignZmFpbGVkIHRvIGdldCBtZWRpYWluZm8nKSlcbiAgICB9XG4gIH1cblxuICBfaGFuZGxlTG9hZGVyRGF0YUxvYWRlZCAoKSB7XG4gICAgdGhpcy5lbWl0VG8oJ0ZMVl9ERU1VWEVSJywgREVNVVhfRVZFTlRTLkRFTVVYX1NUQVJUKVxuICB9XG5cbiAgX2hhbmRsZU1ldGFkYXRhUGFyc2VkICh0eXBlKSB7XG4gICAgdGhpcy5lbWl0KFJFTVVYX0VWRU5UUy5SRU1VWF9NRVRBREFUQSwgdHlwZSlcbiAgfVxuICBfaGFuZGxlRGVtdXhDb21wbGV0ZSAoKSB7XG4gICAgdGhpcy5lbWl0KFJFTVVYX0VWRU5UUy5SRU1VWF9NRURJQSlcbiAgfVxuXG4gIF9oYW5kbGVBcHBlbmRJbml0U2VnbWVudCAoKSB7XG4gICAgdGhpcy5zdGF0ZS5pbml0U2VnbWVudEFycml2ZWQgPSB0cnVlXG4gICAgdGhpcy5tc2UuYWRkU291cmNlQnVmZmVycygpXG4gIH1cblxuICBfaGFuZGxlTWVkaWFTZWdtZW50ICgpIHtcbiAgICB0aGlzLm1zZS5hZGRTb3VyY2VCdWZmZXJzKClcbiAgICB0aGlzLm1zZS5kb0FwcGVuZCgpO1xuICB9XG5cbiAgX2hhbmRsZVNvdXJjZVVwZGF0ZUVuZCAoKSB7XG4gICAgY29uc3QgdGltZSA9IHRoaXMuX3BsYXllci5jdXJyZW50VGltZTtcbiAgICBjb25zdCB2aWRlbyA9IHRoaXMuX3BsYXllci52aWRlbztcbiAgICBjb25zdCBwcmVsb2FkVGltZSA9IHRoaXMuX3BsYXllci5jb25maWcucHJlbG9hZFRpbWUgfHwgNVxuXG4gICAgY29uc3QgeyBsZW5ndGggfSA9IHZpZGVvLmJ1ZmZlcmVkO1xuXG4gICAgaWYgKGxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGJ1ZmZlckVuZCA9IHZpZGVvLmJ1ZmZlcmVkLmVuZChsZW5ndGggLSAxKTtcbiAgICBpZiAoYnVmZmVyRW5kIC0gdGltZSA+IHByZWxvYWRUaW1lICogMikge1xuICAgICAgdGhpcy5fcGxheWVyLmN1cnJlbnRUaW1lID0gYnVmZmVyRW5kIC0gcHJlbG9hZFRpbWVcbiAgICB9XG4gICAgdGhpcy5tc2UuZG9BcHBlbmQoKTtcbiAgfVxuXG4gIF9oYW5kbGVUaW1lVXBkYXRlICgpIHtcbiAgICBjb25zdCB0aW1lID0gdGhpcy5fcGxheWVyLmN1cnJlbnRUaW1lXG5cbiAgICBjb25zdCB2aWRlbyA9IHRoaXMuX3BsYXllci52aWRlbztcbiAgICBsZXQgYnVmZmVyZWQgPSB2aWRlby5idWZmZXJlZFxuXG4gICAgaWYgKCFidWZmZXJlZCB8fCAhYnVmZmVyZWQubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYnVmZmVyU3RhcnQgPSBidWZmZXJlZC5zdGFydChidWZmZXJlZC5sZW5ndGggLSAxKVxuICAgIC8vIGNvbnN0IGJ1ZmZlclN0YXJ0ID0gdGhpcy5fcGxheWVyLmdldEJ1ZmZlcmVkUmFuZ2UoKVswXVxuICAgIGlmICh0aW1lIC0gYnVmZmVyU3RhcnQgPiAxMCkge1xuICAgICAgLy8g5Zyo55u05pKt5pe25Y+K5pe25riF56m6YnVmZmVy77yM6ZmN5L2O55u05pKt5YaF5a2Y5Y2g55SoXG4gICAgICBpZiAodGhpcy5idWZmZXJDbGVhclRpbWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5tc2UucmVtb3ZlKHRpbWUgLSAxLCBidWZmZXJTdGFydClcbiAgICAgIHRoaXMuYnVmZmVyQ2xlYXJUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmJ1ZmZlckNsZWFyVGltZXIgPSBudWxsXG4gICAgICB9LCA1MDAwKVxuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVOZXR3b3JrRXJyb3IgKHRhZywgZXJyKSB7XG4gICAgdGhpcy5fcGxheWVyLmVtaXQoJ2Vycm9yJywgbmV3IFBsYXllci5FcnJvcnMoJ25ldHdvcmsnLCB0aGlzLl9wbGF5ZXIuY29uZmlnLnVybCkpXG4gICAgdGhpcy5fb25FcnJvcihMT0FERVJfRVZFTlRTLkxPQURFUl9FUlJPUiwgdGFnLCBlcnIsIHRydWUpXG4gIH1cblxuICBfaGFuZGxlRGVtdXhFcnJvcih0YWcsIGVyciwgZmF0YWwpIHtcbiAgICBpZiAoZmF0YWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZmF0YWwgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5fcGxheWVyLmVtaXQoJ2Vycm9yJywgbmV3IFBsYXllci5FcnJvcnMoJ3BhcnNlJywgdGhpcy5fcGxheWVyLmNvbmZpZy51cmwpKVxuICAgIHRoaXMuX29uRXJyb3IoTE9BREVSX0VWRU5UUy5MT0FERVJfRVJST1IsIHRhZywgZXJyLCBmYXRhbClcbiAgfVxuXG4gIF9vbkVycm9yKHR5cGUsIG1vZCwgZXJyLCBmYXRhbCkge1xuICAgIGxldCBlcnJvciA9IHtcbiAgICAgIGVycm9yVHlwZTogdHlwZSxcbiAgICAgIGVycm9yRGV0YWlsczogYFske21vZH1dOiAke2Vyci5tZXNzYWdlfWAsXG4gICAgICBlcnJvckZhdGFsOiBmYXRhbCB8fCBmYWxzZVxuICAgIH1cbiAgICB0aGlzLl9wbGF5ZXIuZW1pdChGTFZfRVJST1IsIGVycm9yKTtcbiAgfVxuXG4gIHNlZWsgKCkge1xuICAgIGlmICghdGhpcy5zdGF0ZS5pbml0U2VnbWVudEFycml2ZWQpIHtcbiAgICAgIHRoaXMubG9hZERhdGEoKVxuICAgIH1cbiAgfVxuXG4gIGxvYWREYXRhICgpIHtcbiAgICB0aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MQURFUl9TVEFSVCwgdGhpcy5fcGxheWVyLmNvbmZpZy51cmwpXG4gIH1cblxuICBwYXVzZSAoKSB7XG4gICAgY29uc3QgbG9hZGVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnRkVUQ0hfTE9BREVSJylcblxuICAgIGlmIChsb2FkZXIpIHtcbiAgICAgIGxvYWRlci5jYW5jZWwoKVxuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuX3BsYXllci5vZmYoJ3RpbWV1cGRhdGUnLCB0aGlzLl9oYW5kbGVUaW1lVXBkYXRlKVxuICAgIHRoaXMuX3BsYXllciA9IG51bGxcbiAgICB0aGlzLm1zZSA9IG51bGxcbiAgfVxufVxuIiwiaW1wb3J0IFBsYXllciBmcm9tICd4Z3BsYXllcidcbmltcG9ydCB7IENvbnRleHQsIEVWRU5UUyB9IGZyb20gJ3hncGxheWVyLXV0aWxzJztcbmltcG9ydCBGTFYgZnJvbSAnLi9mbHYtbGl2ZSdcbmNvbnN0IGZsdkFsbG93ZWRFdmVudHMgPSBFVkVOVFMuRmx2QWxsb3dlZEV2ZW50cztcblxuY2xhc3MgRmx2UGxheWVyIGV4dGVuZHMgUGxheWVyIHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZykge1xuICAgIHN1cGVyKGNvbmZpZylcbiAgICB0aGlzLmNvbnRleHQgPSBuZXcgQ29udGV4dChmbHZBbGxvd2VkRXZlbnRzKVxuICAgIHRoaXMuaW5pdEV2ZW50cygpXG4gICAgdGhpcy5sb2FkZXJDb21wbGV0ZVRpbWVyID0gbnVsbFxuICAgIC8vIGNvbnN0IHByZWxvYWRUaW1lID0gcGxheWVyLmNvbmZpZy5wcmVsb2FkVGltZSB8fCAxNVxuICB9XG5cbiAgc3RhcnQgKCkge1xuICAgIHRoaXMuaW5pdEZsdigpXG4gICAgdGhpcy5jb250ZXh0LmluaXQoKVxuICAgIHN1cGVyLnN0YXJ0KHRoaXMuZmx2Lm1zZS51cmwpXG4gIH1cblxuICBpbml0Rmx2RXZlbnRzIChmbHYpIHtcbiAgICBjb25zdCBwbGF5ZXIgPSB0aGlzO1xuICAgIGZsdi5vbmNlKEVWRU5UUy5SRU1VWF9FVkVOVFMuSU5JVF9TRUdNRU5ULCAoKSA9PiB7XG4gICAgICBQbGF5ZXIudXRpbC5hZGRDbGFzcyhwbGF5ZXIucm9vdCwgJ3hncGxheWVyLWlzLWxpdmUnKVxuICAgICAgaWYgKCFQbGF5ZXIudXRpbC5maW5kRG9tKHRoaXMucm9vdCwgJ3hnLWxpdmUnKSkge1xuICAgICAgICBjb25zdCBsaXZlID0gUGxheWVyLnV0aWwuY3JlYXRlRG9tKCd4Zy1saXZlJywgJ+ato+WcqOebtOaSrScsIHt9LCAneGdwbGF5ZXItbGl2ZScpXG4gICAgICAgIHBsYXllci5jb250cm9scy5hcHBlbmRDaGlsZChsaXZlKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBmbHYub25jZShFVkVOVFMuTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsICgpID0+IHtcbiAgICAgIC8vIOebtOaSreWujOaIkO+8jOW+heaSreaUvuWZqOaSreWujOe8k+WtmOWQjuWPkemAgeWFs+mXreS6i+S7tlxuICAgICAgaWYgKCFwbGF5ZXIucGF1c2VkKSB7XG4gICAgICAgIHRoaXMubG9hZGVyQ29tcGxldGVUaW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICBjb25zdCBlbmQgPSBwbGF5ZXIuZ2V0QnVmZmVyZWRSYW5nZSgpWzFdXG4gICAgICAgICAgaWYgKE1hdGguYWJzKHBsYXllci5jdXJyZW50VGltZSAtIGVuZCkgPCAwLjUpIHtcbiAgICAgICAgICAgIHBsYXllci5lbWl0KCdlbmRlZCcpXG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLmxvYWRlckNvbXBsZXRlVGltZXIpXG4gICAgICAgICAgfVxuICAgICAgICB9LCAyMDApXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGluaXRFdmVudHMgKCkge1xuICAgIHRoaXMub24oJ3RpbWV1cGRhdGUnLCAoKSA9PiB7XG4gICAgICB0aGlzLmxvYWREYXRhKClcbiAgICB9KVxuXG4gICAgdGhpcy5vbignc2Vla2luZycsICgpID0+IHtcbiAgICAgIGNvbnN0IHRpbWUgPSB0aGlzLmN1cnJlbnRUaW1lXG4gICAgICBjb25zdCByYW5nZSA9IHRoaXMuZ2V0QnVmZmVyZWRSYW5nZSgpXG4gICAgICBpZiAodGltZSA+IHJhbmdlWzFdIHx8IHRpbWUgPCByYW5nZVswXSkge1xuICAgICAgICB0aGlzLmZsdi5zZWVrKHRoaXMuY3VycmVudFRpbWUpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGluaXRGbHYgKCkge1xuICAgIGNvbnN0IGZsdiA9IHRoaXMuY29udGV4dC5yZWdpc3RyeSgnRkxWX0NPTlRST0xMRVInLCBGTFYpKHRoaXMpXG4gICAgdGhpcy5pbml0Rmx2RXZlbnRzKGZsdilcbiAgICB0aGlzLmZsdiA9IGZsdlxuICB9XG5cbiAgcGxheSAoKSB7XG4gICAgaWYgKHRoaXMuX2hhc1N0YXJ0KSB7XG4gICAgICB0aGlzLl9kZXN0cm95KCkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IG5ldyBDb250ZXh0KGZsdkFsbG93ZWRFdmVudHMpXG4gICAgICAgIGNvbnN0IGZsdiA9IHRoaXMuY29udGV4dC5yZWdpc3RyeSgnRkxWX0NPTlRST0xMRVInLCBGTFYpKHRoaXMpXG4gICAgICAgIHRoaXMuaW5pdEZsdkV2ZW50cyhmbHYpXG4gICAgICAgIHRoaXMuZmx2ID0gZmx2XG4gICAgICAgIHRoaXMuY29udGV4dC5pbml0KClcbiAgICAgICAgc3VwZXIuc3RhcnQoZmx2Lm1zZS51cmwpXG4gICAgICAgIHN1cGVyLnBsYXkoKVxuICAgICAgfSlcblxuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5wbGF5KClcbiAgICB9XG4gIH1cblxuICBwYXVzZSAoKSB7XG4gICAgc3VwZXIucGF1c2UoKVxuICAgIGlmICh0aGlzLmZsdikge1xuICAgICAgdGhpcy5mbHYucGF1c2UoKVxuICAgIH1cbiAgfVxuXG4gIGxvYWREYXRhICh0aW1lID0gdGhpcy5jdXJyZW50VGltZSkge1xuICAgIGlmICh0aGlzLmZsdikge1xuICAgICAgdGhpcy5mbHYuc2Vlayh0aW1lKVxuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuX2Rlc3Ryb3koKS50aGVuKCgpID0+IHtcbiAgICAgIHN1cGVyLmRlc3Ryb3koKTtcbiAgICB9KVxuICB9XG5cbiAgX2Rlc3Ryb3kgKCkge1xuICAgIHJldHVybiB0aGlzLmZsdi5tc2UuZGVzdHJveSgpLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5jb250ZXh0LmRlc3Ryb3koKVxuICAgICAgdGhpcy5mbHYgPSBudWxsXG4gICAgICB0aGlzLmNvbnRleHQgPSBudWxsXG4gICAgICBpZiAodGhpcy5sb2FkZXJDb21wbGV0ZVRpbWVyKSB7XG4gICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMubG9hZGVyQ29tcGxldGVUaW1lcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZ2V0IHNyYyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFNyY1xuICB9XG5cbiAgc2V0IHNyYyAodXJsKSB7XG4gICAgdGhpcy5wbGF5ZXIuY29uZmlnLnVybCA9IHVybFxuICAgIGlmICghdGhpcy5wYXVzZWQpIHtcbiAgICAgIHRoaXMucGF1c2UoKVxuICAgICAgdGhpcy5vbmNlKCdwYXVzZScsICgpID0+IHtcbiAgICAgICAgdGhpcy5zdGFydCh1cmwpXG4gICAgICB9KVxuICAgICAgdGhpcy5vbmNlKCdjYW5wbGF5JywgKCkgPT4ge1xuICAgICAgICB0aGlzLnBsYXkoKVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGFydCh1cmwpXG4gICAgfVxuICAgIHRoaXMub25jZSgnY2FucGxheScsICgpID0+IHtcbiAgICAgIHRoaXMuY3VycmVudFRpbWUgPSAwXG4gICAgfSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZsdlBsYXllclxuIiwiKGZ1bmN0aW9uKCkgeyBtb2R1bGUuZXhwb3J0cyA9IHdpbmRvd1tcIlBsYXllclwiXTsgfSgpKTsiXSwic291cmNlUm9vdCI6IiJ9