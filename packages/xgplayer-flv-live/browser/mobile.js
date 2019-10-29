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
      this.initWasmWorker();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9GbHZQbGF5ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy9Vc2Vycy9qaWFuZ3l1cWluZy9EZXNrdG9wL1Byb2plY3RzL3hncGxheWVyL25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWJ1ZmZlci9zcmMvYnVmZmVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1idWZmZXIvc3JjL3ByZXNvdWNlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1idWZmZXIvc3JjL3RyYWNrLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1jb2RlYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItY29kZWMvc3JjL2FhYy9hYWMtaGVscGVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1jb2RlYy9zcmMvY29tcGF0aWJpbGl0eS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItY29kZWMvc3JjL2gyNjQvbmFsdW5pdC9nb2xvbWIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWNvZGVjL3NyYy9oMjY0L25hbHVuaXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWNvZGVjL3NyYy9oMjY0L25hbHVuaXQvc3BzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1kZW11eC9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItZGVtdXgvc3JjL2Zsdi9hbWYtcGFyc2VyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1kZW11eC9zcmMvZmx2L2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1kZW11eC9zcmMvaGxzL2RlbXV4ZXIvbTN1OHBhcnNlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItZGVtdXgvc3JjL2hscy9kZW11eGVyL3RzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1kZW11eC9zcmMvaGxzL3BsYXlsaXN0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1sb2FkZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWxvYWRlci9zcmMvZmV0Y2gtbG9hZGVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1yZW11eC9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItcmVtdXgvc3JjL21wNC9mbXA0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1yZW11eC9zcmMvbXA0L2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvbm9kZV9tb2R1bGVzL2NvbmNhdC10eXBlZC1hcnJheS9saWIvY29uY2F0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9ub2RlX21vZHVsZXMvY29uY2F0LXR5cGVkLWFycmF5L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvbm9kZV9tb2R1bGVzL3dlYndvcmtpZnktd2VicGFjay9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL2NvbnN0YW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9jb25zdGFudHMvd29ya2VyLWNvbW1hbmRzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvY29udGV4dC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL2NyeXB0by9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL2Vudi9pc2xlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvZW52L3NuaWZmZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9lbnYvdXRmOC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vYmlsZS9hdWRpby1jb250ZXh0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9iaWxlL21vYmlsZS12aWRlby5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vYmlsZS9zb3VyY2VidWZmZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2JpbGUvdGlja2VyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9iaWxlL3ZpZGVvLWNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2JpbGUvd29ya2VyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9iaWxlL3l1di1jYW52YXMuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2RlbHMvbWVkaWEtaW5mby5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vZGVscy9tZWRpYS1zYW1wbGUuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2RlbHMvbWVkaWEtc2VnbWVudC1saXN0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9kZWxzL21lZGlhLXNlZ21lbnQuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2RlbHMvdHJhY2stbWV0YS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vZGVscy90cmFjay1zYW1wbGUuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy93cml0ZS9idWZmZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy93cml0ZS9zdHJlYW0uanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL2Zsdi1saXZlLW1vYmlsZS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9zcmMvbW9iaWxlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci9leHRlcm5hbCBcIlBsYXllclwiIl0sIm5hbWVzIjpbIlIiLCJSZWZsZWN0IiwiUmVmbGVjdEFwcGx5IiwiYXBwbHkiLCJ0YXJnZXQiLCJyZWNlaXZlciIsImFyZ3MiLCJGdW5jdGlvbiIsInByb3RvdHlwZSIsImNhbGwiLCJSZWZsZWN0T3duS2V5cyIsIm93bktleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiY29uY2F0IiwiUHJvY2Vzc0VtaXRXYXJuaW5nIiwid2FybmluZyIsImNvbnNvbGUiLCJ3YXJuIiwiTnVtYmVySXNOYU4iLCJOdW1iZXIiLCJpc05hTiIsInZhbHVlIiwiRXZlbnRFbWl0dGVyIiwiaW5pdCIsIm1vZHVsZSIsImV4cG9ydHMiLCJfZXZlbnRzIiwidW5kZWZpbmVkIiwiX2V2ZW50c0NvdW50IiwiX21heExpc3RlbmVycyIsImRlZmF1bHRNYXhMaXN0ZW5lcnMiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJnZXQiLCJzZXQiLCJhcmciLCJSYW5nZUVycm9yIiwiZ2V0UHJvdG90eXBlT2YiLCJjcmVhdGUiLCJzZXRNYXhMaXN0ZW5lcnMiLCJuIiwiJGdldE1heExpc3RlbmVycyIsInRoYXQiLCJnZXRNYXhMaXN0ZW5lcnMiLCJlbWl0IiwidHlwZSIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJwdXNoIiwiZG9FcnJvciIsImV2ZW50cyIsImVycm9yIiwiZXIiLCJFcnJvciIsImVyciIsIm1lc3NhZ2UiLCJjb250ZXh0IiwiaGFuZGxlciIsImxlbiIsImxpc3RlbmVycyIsImFycmF5Q2xvbmUiLCJfYWRkTGlzdGVuZXIiLCJsaXN0ZW5lciIsInByZXBlbmQiLCJtIiwiZXhpc3RpbmciLCJUeXBlRXJyb3IiLCJuZXdMaXN0ZW5lciIsInVuc2hpZnQiLCJ3YXJuZWQiLCJ3IiwiU3RyaW5nIiwibmFtZSIsImVtaXR0ZXIiLCJjb3VudCIsImFkZExpc3RlbmVyIiwib24iLCJwcmVwZW5kTGlzdGVuZXIiLCJvbmNlV3JhcHBlciIsImZpcmVkIiwicmVtb3ZlTGlzdGVuZXIiLCJ3cmFwRm4iLCJfb25jZVdyYXAiLCJzdGF0ZSIsIndyYXBwZWQiLCJiaW5kIiwib25jZSIsInByZXBlbmRPbmNlTGlzdGVuZXIiLCJsaXN0IiwicG9zaXRpb24iLCJvcmlnaW5hbExpc3RlbmVyIiwic2hpZnQiLCJzcGxpY2VPbmUiLCJvZmYiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJrZXlzIiwia2V5IiwiX2xpc3RlbmVycyIsInVud3JhcCIsImV2bGlzdGVuZXIiLCJ1bndyYXBMaXN0ZW5lcnMiLCJyYXdMaXN0ZW5lcnMiLCJsaXN0ZW5lckNvdW50IiwiZXZlbnROYW1lcyIsImFyciIsImNvcHkiLCJBcnJheSIsImluZGV4IiwicG9wIiwicmV0IiwiVHJhY2siLCJyZXF1aXJlIiwiZGVmYXVsdCIsIlRyYWNrcyIsIkF1ZGlvVHJhY2siLCJWaWRlb1RyYWNrIiwiWGdCdWZmZXIiLCJSZW11eEJ1ZmZlciIsIlByZVNvdXJjZSIsImNvbnN0cnVjdG9yIiwiaGlzdG9yeUxlbiIsImFycmF5Iiwib2Zmc2V0IiwiZGF0YSIsImJ5dGVMZW5ndGgiLCJVaW50OEFycmF5IiwiX3NoaWZ0QnVmZmVyIiwic2xpY2UiLCJ0bXBvZmYiLCJ0bXAiLCJ0ZW1wbGVuZ3RoIiwiY2xlYXIiLCJkZXN0cm95IiwidG9JbnQiLCJzdGFydCIsInJldEludCIsInZpZGVvIiwiYXVkaW8iLCJTb3VyY2UiLCJtaW1ldHlwZSIsInNvdXJjZXMiLCJnZXRTb3VyY2UiLCJzb3VyY2UiLCJjcmVhdGVTb3VyY2UiLCJpZCIsInNlcXVlbmNlTnVtYmVyIiwic2FtcGxlcyIsImRyb3BwZWRTYW1wbGVzIiwicmVzZXQiLCJkaXN0cm95IiwiVEFHIiwiZHJvcHBlZCIsImF1ZGlvVHJhY2siLCJ2aWRlb1RyYWNrIiwiTmFsdW5pdCIsIlNwc1BhcnNlciIsIkNvbXBhdGliaWxpdHkiLCJBQUMiLCJnZXRTaWxlbnRGcmFtZSIsImNvZGVjIiwiY2hhbm5lbENvdW50IiwiUkVNVVhfRVZFTlRTIiwiREVNVVhfRVZFTlRTIiwiRVZFTlRTIiwibmV4dEF1ZGlvRHRzIiwibmV4dFZpZGVvRHRzIiwibGFzdEF1ZGlvU2FtcGxlc0xlbiIsImxhc3RWaWRlb1NhbXBsZXNMZW4iLCJsYXN0VmlkZW9EdHMiLCJsYXN0QXVkaW9EdHMiLCJhbGxBdWRpb1NhbXBsZXNDb3VudCIsImFsbFZpZGVvU2FtcGxlc0NvdW50IiwiX2ZpcnN0QXVkaW9TYW1wbGUiLCJfZmlyc3RWaWRlb1NhbXBsZSIsImZpbGxlZEF1ZGlvU2FtcGxlcyIsImZpbGxlZFZpZGVvU2FtcGxlcyIsIl92aWRlb0xhcmdlR2FwIiwiX2F1ZGlvTGFyZ2VHYXAiLCJiZWZvcmUiLCJSRU1VWF9NRURJQSIsImRvRml4IiwiaXNGaXJzdEF1ZGlvU2FtcGxlcyIsImlzRmlyc3RWaWRlb1NhbXBsZXMiLCJnZXRGaXJzdFNhbXBsZSIsInJlY29yZFNhbXBsZXNDb3VudCIsImZpeFJlZlNhbXBsZUR1cmF0aW9uIiwibWV0YSIsImNoYW5nZWQiLCJ2aWRlb0NoYW5nZWQiLCJjaGFuZ2VkSWR4IiwidmlkZW9DaGFuZ2VkSWR4IiwiZGV0YWN0Q2hhbmdlU3RyZWFtIiwiZml4Q2hhbmdlU3RyZWFtVmlkZW8iLCJkb0ZpeFZpZGVvIiwiYXVkaW9DaGFuZ2VkIiwiYXVkaW9DaGFuZ2VkSWR4IiwiZml4Q2hhbmdlU3RyZWFtQXVkaW8iLCJkb0ZpeEF1ZGlvIiwiZmlyc3QiLCJzdHJlYW1DaGFuZ2VTdGFydCIsInZpZGVvU2FtcGxlcyIsImZyYW1lUmF0ZSIsImZpeGVkIiwiZmlyc3RTYW1wbGUiLCJzYW1wbGVzTGVuIiwiZG9GaXhMYXJnZUdhcCIsImR0cyIsImRldGVjdExhcmdlR2FwIiwiZmlyc3REdHMiLCJ2aWRlb0ZpcnN0RHRzIiwiYXVkaW9GaXJzdER0cyIsImdhcCIsInJlZlNhbXBsZUR1cmF0aW9uIiwiZmlsbENvdW50IiwiTWF0aCIsImZsb29yIiwiY2xvbmVkRmlyc3RTYW1wbGUiLCJhc3NpZ24iLCJwdHMiLCJjdHMiLCJzaXplIiwiYWJzR2FwIiwiYWJzIiwiZmlsbEZyYW1lQ291bnQiLCJjbG9uZWRTYW1wbGUiLCJjb21wdXRlZCIsIm9yaWdpbkR0cyIsImxhc3REdHMiLCJsYXN0U2FtcGxlRHVyYXRpb24iLCJjdXJyZW50IiwibmV4dCIsImR1cmF0aW9uIiwiZmlsbEZyYW1lSWR4IiwiZmlsbEZyYW1lIiwic3BsaWNlIiwiYXVkaW9TYW1wbGVzIiwic2lsZW50RnJhbWUiLCJfZmlyc3RTYW1wbGUiLCJ2aWRlb0ZpcnN0UHRzIiwic2lsZW50U2FtcGxlQ291bnQiLCJzaWxlbnRTYW1wbGUiLCJkYXRhc2l6ZSIsImZpbHRlcmVkIiwicmVmU2FtcGxlRHVyYXRpb25GaXhlZCIsInNpbGVudEZyYW1lQ291bnQiLCJzb3J0QXVkaW9TYW1wbGVzIiwiY2hhbmdlSWR4IiwicHJldkR0cyIsImdldFN0cmVhbUNoYW5nZVN0YXJ0IiwiY3VyRHRzIiwiaXNDb250aW51ZSIsIm9wdGlvbnMiLCJmaXJzdFBhcnRTYW1wbGVzIiwic2Vjb25kUGFydFNhbXBsZXMiLCJjaGFuZ2VTYW1wbGUiLCJmaXJzdFBhcnREdXJhdGlvbiIsImZpbmRGaXJzdFZpZGVvU2FtcGxlIiwiZmluZEZpcnN0QXVkaW9TYW1wbGUiLCJpc1ZpZGVvIiwiYWxsU2FtcGxlc0NvdW50IiwiZmlsbGVkU2FtcGxlc0NvdW50IiwiZHVyYXRpb25BdmciLCJyZW1vdmVJbnZhbGlkU2FtcGxlcyIsImZpbHRlciIsInNhbXBsZSIsImR0c0Jhc2UiLCJJbmZpbml0eSIsInNvcnQiLCJhIiwiYiIsInNvcnRlZCIsImlzS2V5ZnJhbWUiLCJuZXh0RHRzIiwiY29uZDEiLCJjb25kMiIsImRpc2NvbnRpbnVlIiwibG9nIiwidHJhY2tzIiwiX2NvbnRleHQiLCJnZXRJbnN0YW5jZSIsInJlbXV4ZXIiLCJfZHRzQmFzZSIsIkdvbG9tYiIsInVpbnQ4YXJyYXkiLCJfYnVmZmVyIiwiX2J1ZmZlckluZGV4IiwiX3RvdGFsQnl0ZXMiLCJfdG90YWxCaXRzIiwiX2N1cnJlbnRXb3JkIiwiX2N1cnJlbnRXb3JkQml0c0xlZnQiLCJfZmlsbEN1cnJlbnRXb3JkIiwiYnVmZmVyQnl0ZXNMZWZ0IiwiYnl0ZXNSZWFkIiwibWluIiwid29yZCIsInN1YmFycmF5IiwiRGF0YVZpZXciLCJidWZmZXIiLCJnZXRVaW50MzIiLCJyZWFkQml0cyIsImJpdHMiLCJ2YWx1IiwicmVhZEJvb2wiLCJyZWFkQnl0ZSIsIl9za2lwTGVhZGluZ1plcm8iLCJ6ZXJvQ291bnQiLCJyZWFkVUVHIiwibGVhZGluZ1plcm9zIiwicmVhZFNFRyIsImdldE5hbHVuaXRzIiwiYnVmIiwiZGF0YXZpZXciLCJnZXRJbnQzMiIsImdldEludDE2IiwiZ2V0SW50OCIsImdldEFubmV4Yk5hbHMiLCJnZXRBdmNjTmFscyIsIm5hbHMiLCJnZXRIZWFkZXJQb3NpdGlvbkFubmV4QiIsInBvcyIsImVuZCIsImhlYWRlciIsImhlYWRlckxlbmd0aCIsInNraXAiLCJib2R5IiwidW5pdCIsImFuYWx5c2VOYWwiLCJuZHIiLCJpZHIiLCJzcHMiLCJwYXJzZVNQUyIsInBwcyIsImdldEF2Y2MiLCJTUFNQYXJzZXIiLCJfZWJzcDJyYnNwIiwic3JjIiwic3JjTGVuZ3RoIiwiZHN0IiwiZHN0SWR4IiwicmJzcCIsImdiIiwicHJvZmlsZUlkYyIsImxldmVsSWRjIiwicHJvZmlsZV9zdHJpbmciLCJnZXRQcm9maWxlU3RyaW5nIiwibGV2ZWxfc3RyaW5nIiwiZ2V0TGV2ZWxTdHJpbmciLCJjaHJvbWFfZm9ybWF0X2lkYyIsImNocm9tYV9mb3JtYXQiLCJjaHJvbWFfZm9ybWF0X3RhYmxlIiwiYml0X2RlcHRoIiwic2NhbGluZ19saXN0X2NvdW50IiwiX3NraXBTY2FsaW5nTGlzdCIsInBpY19vcmRlcl9jbnRfdHlwZSIsIm51bV9yZWZfZnJhbWVzX2luX3BpY19vcmRlcl9jbnRfY3ljbGUiLCJwaWNfd2lkdGhfaW5fbWJzX21pbnVzMSIsInBpY19oZWlnaHRfaW5fbWFwX3VuaXRzX21pbnVzMSIsImZyYW1lX21ic19vbmx5X2ZsYWciLCJmcmFtZV9jcm9wX2xlZnRfb2Zmc2V0IiwiZnJhbWVfY3JvcF9yaWdodF9vZmZzZXQiLCJmcmFtZV9jcm9wX3RvcF9vZmZzZXQiLCJmcmFtZV9jcm9wX2JvdHRvbV9vZmZzZXQiLCJmcmFtZV9jcm9wcGluZ19mbGFnIiwicGFyX3dpZHRoIiwicGFyX2hlaWdodCIsImZwcyIsImZwc19maXhlZCIsImZwc19udW0iLCJmcHNfZGVuIiwidnVpX3BhcmFtZXRlcnNfcHJlc2VudF9mbGFnIiwiYXNwZWN0X3JhdGlvX2lkYyIsInBhcl93X3RhYmxlIiwicGFyX2hfdGFibGUiLCJudW1fdW5pdHNfaW5fdGljayIsInRpbWVfc2NhbGUiLCJwYXJTY2FsZSIsImNyb3BfdW5pdF94IiwiY3JvcF91bml0X3kiLCJzdWJfd2MiLCJzdWJfaGMiLCJjb2RlY193aWR0aCIsImNvZGVjX2hlaWdodCIsInByZXNlbnRfd2lkdGgiLCJjZWlsIiwiY2hyb21hX2Zvcm1hdF9zdHJpbmciLCJnZXRDaHJvbWFGb3JtYXRTdHJpbmciLCJmcmFtZV9yYXRlIiwicGFyX3JhdGlvIiwid2lkdGgiLCJoZWlnaHQiLCJjb2RlY19zaXplIiwicHJlc2VudF9zaXplIiwibGFzdF9zY2FsZSIsIm5leHRfc2NhbGUiLCJkZWx0YV9zY2FsZSIsInRvRml4ZWQiLCJjaHJvbWEiLCJ0b1ZpZGVvTWV0YSIsInNwc0NvbmZpZyIsImNvZGVjV2lkdGgiLCJjb2RlY0hlaWdodCIsInByZXNlbnRXaWR0aCIsInByZXNlbnRIZWlnaHQiLCJwcm9maWxlIiwibGV2ZWwiLCJiaXREZXB0aCIsImNocm9tYUZvcm1hdCIsInBhclJhdGlvIiwiZnBzRGVuIiwiZnBzTnVtIiwidGltZXNjYWxlIiwiTTNVOFBhcnNlciIsIlRzRGVtdXhlciIsIlBsYXlsaXN0IiwiRmx2RGVtdXhlciIsIkRBVEFfVFlQRVMiLCJOVU1CRVIiLCJCT09MRUFOIiwiU1RSSU5HIiwiT0JKRUNUIiwiTUlYX0FSUkFZIiwiT0JKRUNUX0VORCIsIlNUUklDVF9BUlJBWSIsIkRBVEUiLCJMT05FX1NUUklORyIsIkFNRlBhcnNlciIsInJlYWRPZmZzZXQiLCJyZXNvbHZlIiwibWV0YURhdGEiLCJwYXJzZVZhbHVlIiwiYm9keVNpemUiLCJyZXNldFN0YXR1cyIsInBhcnNlU3RyaW5nIiwiZHYiLCJzdHJMZW4iLCJnZXRVaW50MTYiLCJpc0xlIiwic3RyIiwiVVRGOCIsImRlY29kZSIsInBhcnNlRGF0ZSIsInRzIiwiZ2V0RmxvYXQ2NCIsInRpbWVPZmZzZXQiLCJEYXRlIiwicGFyc2VPYmplY3QiLCJpc09iakVuZCIsInBhcnNlTG9uZ1N0cmluZyIsIkFycmF5QnVmZmVyIiwiZGF0YVZpZXciLCJnZXRVaW50OCIsImJvb2xOdW0iLCJvYmpFbmRTaXplIiwiYW1mT2JqIiwiaXNPYmplY3RFbmQiLCJtYXJrIiwiYW1mVmFyIiwibWFya2VyIiwiYXJyTGVuZ3RoIiwic2NyaXB0IiwiZGF0ZSIsImxvbmdTdHIiLCJfZmlyc3RGcmFnbWVudExvYWRlZCIsIl90cmFja051bSIsIl9oYXNTY3JpcHQiLCJERU1VWF9TVEFSVCIsImRvUGFyc2VGbHYiLCJpc0ZsdkZpbGUiLCJnZXRQbGF5VHlwZSIsInN0cmVhbUZsYWciLCJyZXN1bHQiLCJoYXNWaWRlbyIsImhhc0F1ZGlvIiwibG9hZGVyQnVmZmVyIiwicGFyc2VGbHZIZWFkZXIiLCJjaHVuayIsImxvb3BNYXgiLCJfcGFyc2VGbHZUYWciLCJERU1VWF9DT01QTEVURSIsIkRFTVVYX0VSUk9SIiwicGxheVR5cGUiLCJpbml0VmlkZW9UcmFjayIsImluaXRBdWRpb1RyYWNrIiwiVmlkZW9UcmFja01ldGEiLCJBdWRpb1RyYWNrTWV0YSIsIl9wYXJzZUZsdlRhZ0hlYWRlciIsIl9wcm9jZXNzQ2h1bmsiLCJ0YWdUeXBlIiwidGltZXN0YW1wIiwidGltZXN0YW1wRXh0IiwiX3BhcnNlU2NyaXB0RGF0YSIsIl9wYXJzZUFBQ0RhdGEiLCJfcGFyc2VIZXZjRGF0YSIsImluZm8iLCJvbk1ldGFEYXRhIiwibWVkaWFJbmZvIiwiaHNhQXVkaW8iLCJ2YWxpZGF0ZSIsIl9kYXRhc2l6ZVZhbGlkYXRvciIsIk1FRElBX0lORk8iLCJoYXNTcGVjaWZpY0NvbmZpZyIsImF1ZGlvc2FtcGxlcmF0ZSIsInNhbXBsZVJhdGUiLCJhdWRpb2NoYW5uZWxzIiwic2FtcGxlUmF0ZUluZGV4IiwiZnJhbWVyYXRlIiwiX2FhY1NlcXVlbmNlSGVhZGVyUGFyc2VyIiwib2JqZWN0VHlwZSIsIl9zd2l0Y2hBdWRpb1NhbXBsZVJhdGUiLCJmcmFtZUxlbmd0aCIsImRlcGVuZHNPbkNvcmVDb2RlciIsImV4dGVuc2lvbkZsYWdJbmRleCIsInVzZXJBZ2VudCIsIndpbmRvdyIsIm5hdmlnYXRvciIsInRvTG93ZXJDYXNlIiwiZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCIsImNvbmZpZyIsInNhbXBsaW5nSW5kZXgiLCJpbmRleE9mIiwidHJhY2siLCJmb3JtYXQiLCJfaGFzQXVkaW9TZXF1ZW5jZSIsIl9zd2l0Y2hBdWRpb1NhbXBsaW5nRnJlcXVlbmN5IiwiZnJhbWVMZW50aCIsImF1ZGlvU2FtcGxlUmF0ZSIsImF1ZGlvU2FtcGxlUmF0ZUluZGV4IiwiYWFjSGVhZGVyIiwiYXVkaW9NZWRpYSIsIk1FVEFEQVRBX1BBUlNFRCIsIkFVRElPX01FVEFEQVRBX0NIQU5HRSIsIl9tZXRhQ2hhbmdlIiwiZnJhbWVUeXBlIiwiY29kZWNJRCIsImF2Y1BhY2tldFR5cGUiLCJwYXJzZUludCIsIm5hbHUiLCJyIiwic2l6ZXMiLCJhdmNjbGVuZ3RoIiwiX2F2Y1NlcXVlbmNlSGVhZGVyUGFyc2VyIiwiX2hhc1ZpZGVvU2VxdWVuY2UiLCJWSURFT19NRVRBREFUQV9DSEFOR0UiLCJjb25maWd1cmF0aW9uVmVyc2lvbiIsImF2Y1Byb2ZpbGVJbmRpY2F0aW9uIiwicHJvZmlsZUNvbXBhdGliaWxpdHkiLCJhdmNMZXZlbEluZGljYXRpb24iLCJuYWxVbml0TGVuZ3RoIiwibnVtT2ZTcHMiLCJqIiwiY29kZWNTdHJpbmciLCJoIiwidG9TdHJpbmciLCJudW1PZlBwcyIsInZpZGVvTWVkaWEiLCJhdmNjIiwic2FtcGxpbmdGcmVxdWVuY3lJbmRleCIsInNhbXBsaW5nRnJlcXVlbmN5TGlzdCIsIl9zd2l0Y2hBdWRpb0NoYW5uZWwiLCJzYW1wbGVUcmFja051bUluZGV4Iiwic2FtcGxlVHJhY2tOdW1MaXN0IiwiZGF0YXNpemVDb25maXJtIiwibG9nZ2VyIiwicGFyc2UiLCJ0ZXh0IiwiYmFzZXVybCIsInNwbGl0IiwicmVmcyIsInJlZiIsIm1hdGNoIiwicmVmbSIsInJlZmQiLCJ2ZXJzaW9uIiwic2VxdWVuY2UiLCJ0YXJnZXRkdXJhdGlvbiIsInBhcnNlRmxvYXQiLCJwYXJzZUZyYWciLCJwYXJzZURlY3J5cHQiLCJmcmFncyIsImZyZWciLCJuZXh0bGluZSIsImNoYXJBdCIsInVybCIsInBhcnNlVVJMIiwidXJscyIsImVuY3J5cHQiLCJjbWQiLCJtZXRob2QiLCJ1cmkiLCJpdiIsIml2YiIsImltIiwic3Vic3RyIiwiU3RyZWFtVHlwZSIsImNvbmZpZ3MiLCJkZW11eGluZyIsInBhdCIsInBtdCIsIl9oYXNWaWRlb01ldGEiLCJfaGFzQXVkaW9NZXRhIiwiZGVtdXgiLCJmcmFnIiwiaW5wdXRCdWZmZXIiLCJwZXNlcyIsInRzU3RyZWFtIiwiU3RyZWFtIiwicmVhZCIsInBlcyIsInBpZCIsIkVTIiwicGF5bG9hZCIsInN0cmVhbSIsIkF1ZGlvT3B0aW9ucyIsIlZpZGVvT3B0aW9ucyIsImVwZXNlcyIsIk1lcmdlIiwicHVzaEF1ZGlvU2FtcGxlIiwicHVzaFZpZGVvU2FtcGxlIiwiX3RyYWNrcyIsImZyZXF1ZW5jZSIsImNoYW5uZWwiLCJhdWRpb09iamVjdFR5cGUiLCJhdWRpb0NvbmZpZyIsImZyZXF1ZW5jeUluZGV4IiwibWV0YUVxdWFsIiwiY29tcGFpcmVNZXRhIiwiQXVkaW9UcmFja1NhbXBsZSIsInNhbXBsZUxlbmd0aCIsIm5hbCIsInNhclJhdGlvIiwic2FyX3JhdGlvIiwiVmlkZW9UcmFja1NhbXBsZSIsImRlc3RvcnkiLCJjb21wYWlyZUFycmF5IiwiYWwiLCJibCIsImlnbm9yZUR1cmF0aW9uIiwiayIsIml0ZW1hIiwiaXRlbWIiLCJidWZmZXJzIiwicmVhZEhlYWRlciIsInJlYWRQYXlsb2FkIiwicGFja2V0IiwidW5rbm93blBJRHMiLCJQRVMiLCJQQVQiLCJDQVQiLCJUU0RUIiwic29tZSIsIml0ZW0iLCJQTVQiLCJzdHMiLCJNZWRpYSIsInN0cmVhbVR5cGUiLCJzeW5jIiwicmVhZFVpbnQ4IiwicmVhZFVpbnQxNiIsInByaW9yaXR5Iiwic2NyYW1ibGluZyIsImFkYXB0YXRpb24iLCJjb250aW51aXR5IiwidGFiZWxJRCIsInplcm8iLCJzZWN0aW9uTGVuZ3RoIiwic3RyZWFtSUQiLCJzZWN0aW9uTnVtYmVyIiwibGFzdFNlY3Rpb25OdW1iZXIiLCJOIiwicHJvZ3JhbU51bWJlciIsInByb2dyYW0iLCJ0YWJsZUlEIiwib3JkZXIiLCJsYXN0T3JkZXIiLCJQQ1JfUElEIiwicHJvZ3JhbUxlbmd0aCIsImVzIiwibWFwIiwiYWRhcHRhdGlvbkxlbmd0aCIsImFjY2VzcyIsIlBDUiIsIk9QQ1IiLCJzcGxpY2VQb2ludCIsInRyYW5zcG9ydFByaXZhdGUiLCJhZGFwdGF0aW9uRmllbGQiLCJfc3RhcnQiLCJwcm9ncmFtQ2xvY2tCYXNlIiwicmVhZFVpbnQzMiIsInByb2dyYW1DbG9ja0V4dGVuc2lvbiIsIm9yaWdpblByb2dyYW1DbG9ja0Jhc2UiLCJvcmlnaW5Qcm9ncmFtQ2xvY2tFeHRlbnNpb24iLCJzcGxpY2VDb3VudGRvd24iLCJ0cmFuc3BvcnRQcml2YXRlRGF0YSIsImx0dyIsInBpZWNld2lzZSIsInNlYW1sZXNzIiwibHR3VmFsaWQiLCJsdHdPZmZzZXQiLCJyZWFkVWludDI0IiwicGllY2V3aXNlUmF0ZSIsInJlYWRJbnQ4Iiwic3BsaWNlVHlwZSIsImR0c05leHRBVTEiLCJtYXJrZXIxIiwiZHRzTmV4dEFVMiIsIm1hcmtlcjIiLCJkdHNOZXh0QVUzIiwibGFzdFN0dWZmaW5nIiwicGFja2V0TGVuZ3RoIiwicHRzRFRTRmxhZyIsImVzY3JGbGFnIiwiZXNSYXRlRmxhZyIsImRzbUZsYWciLCJhZGRpdGlvbmFsRmxhZyIsImNyY0ZsYWciLCJleHRlbnNpb25GbGFnIiwicGVzSGVhZGVyTGVuZ3RoIiwiTjEiLCJlc2NyIiwiZXgiLCJlc1JhdGUiLCJhZGRpdGlvbmFsQ29weUluZm8iLCJwZXNDUkMiLCJiYWNrIiwiZnEiLCJsYXllciIsImFic2VudCIsImdldEF1ZGlvQ29uZmlnIiwic2VjdGlvbkluZGljYXRvciIsImN1cnJlbnROZXh0SW5kaWNhdG9yIiwiY3JjMzIiLCJleHRlbnNpb25TYW1wbGVJbmRleCIsInRlc3QiLCJpbnB1dGJ1ZmZlciIsIl9iYXNlVVJMIiwiX2xpc3QiLCJfdHMiLCJmcmFnTGVuZ3RoIiwiX2xhc3RnZXQiLCJfYXVkb2NsZWFyIiwiYXV0b2NsZWFyIiwiYmFzZVVSTCIsImRvd25sb2FkZWQiLCJkb3dubG9hZGluZyIsImRlbGV0ZUZyYWciLCJ0aW1lIiwicHVzaE0zVTgiLCJkZWxldGVwcmUiLCJuZXdmcmFnbGlzdCIsInRzbGlzdCIsImdldFRzTGlzdCIsInRzbmFtZSIsImlzbG9hZGVkIiwibG9hZGluZyIsImdldFRzQnlOYW1lIiwiZ2V0VHMiLCJ0aW1lbGlzdCIsImNsZWFyRG93bmxvYWRlZCIsImwiLCJGZXRjaExvYWRlciIsIkxPQURFUl9FVkVOVFMiLCJSRUFEX1NUUkVBTSIsIlJFQURfVEVYVCIsIlJFQURfSlNPTiIsIlJFQURfQlVGRkVSIiwic3RhdHVzIiwiX3JlYWRlciIsIl9jYW5jZWxlZCIsIl9kZXN0cm95ZWQiLCJyZWFkdHlwZSIsIl9sb2FkZXJUYXNrTm8iLCJMQURFUl9TVEFSVCIsImxvYWQiLCJvcHRzIiwiX3RoaXMiLCJwYXJhbXMiLCJnZXRQYXJhbXMiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsIm9rIiwiX29uRmV0Y2hSZXNwb25zZSIsIkxPQURFUl9FUlJPUiIsImNhdGNoIiwidGFza25vIiwianNvbiIsIkxPQURFUl9DT01QTEVURSIsImFycmF5QnVmZmVyIiwiX29uUmVhZGVyIiwiZ2V0UmVhZGVyIiwicmVhZGVyIiwiY2FuY2VsIiwiZSIsInZhbCIsImRvbmUiLCJMT0FERVJfREFUQUxPQURFRCIsImhlYWRlcnMiLCJIZWFkZXJzIiwibW9kZSIsImNhY2hlIiwiY29uZmlnSGVhZGVycyIsImhhc093blByb3BlcnR5IiwiYXBwZW5kIiwib3B0SGVhZGVycyIsImNvcnMiLCJ3aXRoQ3JlZGVudGlhbHMiLCJjcmVkZW50aWFscyIsIk1wNFJlbXV4ZXIiLCJGbXA0IiwiQnVmZmVyIiwid3JpdGVVaW50MzIiLCJpbml0Qm94IiwiY29udGVudCIsIndyaXRlIiwiZXh0ZW5zaW9uIiwiZmxhZyIsImZ0eXAiLCJtb292IiwibXZoZCIsInRyYWsiLCJ2aWRlb1RyYWsiLCJhdWRpb1RyYWsiLCJtdmV4IiwiZm9yRWFjaCIsImJ5dGVzIiwidGtoZCIsIm1kaWEiLCJzYW1wbGVyYXRlIiwiZWR0cyIsIm1lZGlhVGltZSIsIm1kaGQiLCJoZGxyIiwibWluZiIsInZtaGQiLCJzbWhkIiwiZGluZiIsInN0YmwiLCJkcmVmIiwic3RzZCIsInN0dHMiLCJzdHNjIiwic3RzeiIsInN0Y28iLCJtcDRhIiwiYXZjMSIsImVzZHMiLCJjb25maWdsZW4iLCJoU3BhY2luZyIsInZTcGFjaW5nIiwiYnRydCIsInBhc3AiLCJ0cmFja0lEIiwibWVoZCIsInRyZXgiLCJtb29mIiwibWZoZCIsInRyYWYiLCJ0ZmhkIiwidGZkdCIsInNkdHAiLCJ0cnVuIiwic2R0cExlbmd0aCIsInNhbXBsZUNvdW50IiwiZmxhZ3MiLCJpc0xlYWRpbmciLCJkZXBlbmRzT24iLCJpc0RlcGVuZGVkT24iLCJoYXNSZWR1bmRhbmN5IiwiaXNOb25TeW5jIiwibnVtIiwibWRhdCIsIm1kYXRCb3giLCJjaGFyQ29kZUF0IiwiX2lzRHRzQmFzZUluaXRlZCIsImlzRmlyc3RWaWRlbyIsImlzRmlyc3RBdWRpbyIsInZpZGVvQWxsRHVyYXRpb24iLCJhdWRpb0FsbER1cmF0aW9uIiwicmVtdXgiLCJSRU1VWF9NRVRBREFUQSIsIm9uTWV0YURhdGFSZWFkeSIsIkRFVEVDVF9DSEFOR0VfU1RSRUFNIiwicmVzZXREdHNCYXNlIiwiX2R0c0Jhc2VJbml0ZWQiLCJjYWxjRHRzQmFzZSIsIl9yZW11eFZpZGVvIiwiX3JlbXV4QXVkaW8iLCJzZWVrIiwicHJlc291cmNlYnVmZmVyIiwicmVtdXhJbml0U2VnbWVudCIsIklOSVRfU0VHTUVOVCIsImluaXRTZWdtZW50IiwiYXVkaW9CYXNlIiwidmlkZW9CYXNlIiwibXA0U2FtcGxlcyIsImF2Y1NhbXBsZSIsIm1kYXRTYW1wbGUiLCJzYW1wbGVEdXJhdGlvbiIsInZpZGVvTWV0YSIsIm1vb2ZNZGF0Iiwid3JpdGVUb1NvdXJjZSIsIk1FRElBX1NFR01FTlQiLCJsYXN0U2FtcGxlIiwiX3ZpZGVvTmV4dER0cyIsImlzRmlyc3REdHNJbml0ZWQiLCJhdWRpb01ldGEiLCJtcDRTYW1wbGUiLCJpbml0U2lsZW50QXVkaW8iLCJDb250ZXh0IiwiV09SS0VSX0NPTU1BTkRTIiwic25pZmZlciIsIk1lZGlhSW5mbyIsIk1lZGlhU2FtcGxlIiwiTWVkaWFTZWdtZW50IiwiTWVkaWFTZWdtZW50TGlzdCIsIk1zZSIsIk1vYmlsZVZpZGVvIiwiQ3J5cHRvIiwiUmVzdWx0Q29uc3RydWN0b3IiLCJ0b3RhbExlbmd0aCIsIl9sZW4iLCJhcnJheXMiLCJfa2V5IiwiX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiIsIl9kaWRJdGVyYXRvckVycm9yIiwiX2l0ZXJhdG9yRXJyb3IiLCJfaXRlcmF0b3IiLCJTeW1ib2wiLCJpdGVyYXRvciIsIl9zdGVwIiwicmV0dXJuIiwiX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIiLCJfZGlkSXRlcmF0b3JFcnJvcjIiLCJfaXRlcmF0b3JFcnJvcjIiLCJfaXRlcmF0b3IyIiwiX3N0ZXAyIiwiX2FyciIsIl9jb25jYXQiLCJfY29uY2F0MiIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJvYmoiLCJfX2VzTW9kdWxlIiwid2VicGFja0Jvb3RzdHJhcEZ1bmMiLCJtb2R1bGVzIiwiaW5zdGFsbGVkTW9kdWxlcyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJtb2R1bGVJZCIsImMiLCJkIiwiZ2V0dGVyIiwibyIsImNvbmZpZ3VyYWJsZSIsImdldERlZmF1bHQiLCJnZXRNb2R1bGVFeHBvcnRzIiwib2JqZWN0IiwicHJvcGVydHkiLCJwIiwib2UiLCJmIiwicyIsIkVOVFJZX01PRFVMRSIsIm1vZHVsZU5hbWVSZXFFeHAiLCJkZXBlbmRlbmN5UmVnRXhwIiwicXVvdGVSZWdFeHAiLCJyZXBsYWNlIiwiaXNOdW1lcmljIiwiZ2V0TW9kdWxlRGVwZW5kZW5jaWVzIiwicXVldWVOYW1lIiwicmV0dmFsIiwiZm5TdHJpbmciLCJ3cmFwcGVyU2lnbmF0dXJlIiwid2VicGFja1JlcXVpcmVOYW1lIiwicmUiLCJSZWdFeHAiLCJleGVjIiwiaGFzVmFsdWVzSW5RdWV1ZXMiLCJxdWV1ZXMiLCJyZWR1Y2UiLCJoYXNWYWx1ZXMiLCJnZXRSZXF1aXJlZE1vZHVsZXMiLCJtb2R1bGVzUXVldWUiLCJtYWluIiwicmVxdWlyZWRNb2R1bGVzIiwic2Vlbk1vZHVsZXMiLCJxdWV1ZSIsIm1vZHVsZVRvQ2hlY2siLCJuZXdNb2R1bGVzIiwibmV3TW9kdWxlc0tleXMiLCJfX3dlYnBhY2tfbW9kdWxlc19fIiwiYWxsIiwiZW50cnlNb2R1bGUiLCJKU09OIiwic3RyaW5naWZ5Iiwiam9pbiIsImJsb2IiLCJCbG9iIiwiYmFyZSIsIlVSTCIsIndlYmtpdFVSTCIsIm1velVSTCIsIm1zVVJMIiwid29ya2VyVXJsIiwiY3JlYXRlT2JqZWN0VVJMIiwid29ya2VyIiwiV29ya2VyIiwib2JqZWN0VVJMIiwiUkVNVVhfRVJST1IiLCJNU0VfRVZFTlRTIiwiU09VUkNFX1VQREFURV9FTkQiLCJITFNfRVZFTlRTIiwiUkVUUllfVElNRV9FWENFRURFRCIsIkNSWVRPX0VWRU5UUyIsIlNUQVJUX0RFQ1JZUFQiLCJERUNSWVBURUQiLCJBTExFVkVOVFMiLCJGbHZBbGxvd2VkRXZlbnRzIiwiSGxzQWxsb3dlZEV2ZW50cyIsIkNPTlRFWFRfQ09NT01BTkRTIiwiT04iLCJPTkNFIiwiT0ZGIiwiRU1JVCIsIkRFU1RST1kiLCJESVJFQ1RfRU1JVF9GTEFHIiwiYWxsb3dlZEV2ZW50cyIsIl9lbWl0dGVyIiwiX2luc3RhbmNlTWFwIiwiX2Nsc01hcCIsIl9pbml0ZWQiLCJfaG9va3MiLCJ0YWciLCJpbnN0YW5jZSIsImluaXRJbnN0YW5jZSIsIm5ld0luc3RhbmNlIiwicmVnaXN0cnkiLCJjbHMiLCJjaGVja01lc3NhZ2VOYW1lIiwiX2lzTWVzc2FnZU5hbWVWYWxpZCIsInNlbGYiLCJlbmhhbmNlZCIsIm9uY2VMaXN0ZW5lcnMiLCJtZXNzYWdlTmFtZSIsImNhbGxiYWNrIiwiYmVmb3JlTGlzdCIsImVtaXRUbyIsInJlbW92ZUxpc3RlbmVycyIsImhhc093biIsImNhbGxiYWNrcyIsImRlc3Ryb3lJbnN0YW5jZXMiLCJvdXRwdXRCdWZmZXIiLCJvdXRwdXRidWZmZXIiLCJjcnlwdG8iLCJtc0NyeXB0byIsImRlY3JpcHQiLCJhZXNrZXkiLCJzYmtleSIsInN1YnRsZSIsImltcG9ydEtleSIsImRlY3JpcHREYXRhIiwiZGVjcnlwdCIsInJlcyIsImxlIiwic2V0SW50MTYiLCJJbnQxNkFycmF5IiwiZGV2aWNlIiwib3MiLCJpc1BjIiwiaXNUYWJsZXQiLCJicm93c2VyIiwidWEiLCJyZWciLCJpZSIsImZpcmZveCIsImNocm9tZSIsIm9wZXJhIiwic2FmYXJpIiwiaXNXaW5kb3dzUGhvbmUiLCJpc1N5bWJpYW4iLCJpc0FuZHJvaWQiLCJpc0ZpcmVGb3giLCJpc1Bob25lIiwib3V0IiwiaW5wdXQiLCJmcm9tQ2hhckNvZGUiLCJfY2hlY2tDb250aW51YXRpb24iLCJ1Y3M0IiwiY2hlY2tMZW5ndGgiLCJBdWRpb0N0eCIsIkF1ZGlvQ29udGV4dCIsIndlYmtpdEF1ZGlvQ29udGV4dCIsImdhaW5Ob2RlIiwiY3JlYXRlR2FpbiIsImNvbm5lY3QiLCJkZXN0aW5hdGlvbiIsInByZWxvYWRUaW1lIiwiX2N1cnJlbnRCdWZmZXIiLCJfbmV4dEJ1ZmZlciIsIl9sYXN0cHRzIiwiX3ByZURlY29kZSIsIl9jdXJyZW50VGltZSIsIl9kZWNvZGluZyIsIl9wbGF5ZWQiLCJjdXJyZW50VGltZSIsImRlY29kZUF1ZGlvIiwic2V0QXVkaW9EYXRhIiwiZGVjb2RlQUFDIiwic2FtcGxlRGF0YSIsImdldEFBQ0RhdGEiLCJjb21iaWxlRGF0YSIsImRlY29kZUF1ZGlvRGF0YSIsImF1ZGlvU291cmNlIiwiY3JlYXRlQnVmZmVyU291cmNlIiwib25lbmRlZCIsIm9uU291cmNlRW5kZWQiLCJnZXRUaW1lQnVmZmVyIiwicGxheSIsInNldEF1ZGlvTWV0YURhdGEiLCJhZHRzIiwiZ2V0QWR0cyIsImFhY2ZyYW1lbGVuZ3RoIiwiQVZSZWNvbmNpbGVyIiwicHJvcHMiLCJhQ3R4IiwidkN0eCIsInRpbWVvdXRJZCIsImRvUmVjb25jaWxlIiwidkN1clRpbWUiLCJhQ3VyVGltZSIsInBhdXNlIiwic2V0VGltZW91dCIsIkhUTUxFbGVtZW50IiwiVmlkZW9DdHgiLCJ0aWNrZXIiLCJoaXN0b3J5VGltZSIsInJlY29uY2lsZXIiLCJoYW5kbGVBdWRpb1NvdXJjZUVuZCIsIm9uY2FucGxheSIsImFwcGVuZENoaWxkIiwiY2FudmFzIiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50Iiwibm93IiwiX29uVGltZXIiLCJfY2xlYW5CdWZmZXIiLCJjbGVhbkJ1ZmZlciIsIm9uRGVtdXhDb21wbGV0ZSIsImRlY29kZVZpZGVvIiwic2V0QXVkaW9NZXRhIiwic2V0VmlkZW9NZXRhIiwic2V0VmlkZW9NZXRhRGF0YSIsImN1c3RvbUVsZW1lbnRzIiwiZGVmaW5lIiwiU291cmNlQnVmZmVyIiwiY3VycmVudEdvcCIsIl9sYXN0R2V0IiwiZnJhbWUiLCJuZXh0R29wIiwiX2dldE5leHQiLCJnb3AiLCJyZW1vdmUiLCJUaWNrZXIiLCJpbnRlcnZhbCIsIm9uVGljayIsInNldEludGVydmFsIiwiUmFmVGlja2VyIiwicHJldiIsInRpbWVySWQiLCJfc3ViVGltZXJJZCIsIl90aWNrRnVuYyIsImdldFRpY2tGdW5jIiwidGljayIsIm5leHRUaWNrIiwic3RvcCIsImNhbmNlbEZ1bmMiLCJnZXRDYW5jZWxGdW5jIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSIsImlzU3VwcG9ydGVkIiwiVGltZW91dFRpY2tlciIsImNsZWFySW50ZXJ2YWwiLCJnZXRUaWNrZXIiLCJWaWRlb0NhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsIm9uRmlyc3RGcmFtZSIsInJlYWR5U3RhdHVzIiwicGF1c2VkIiwibGFzdFBsYXllZCIsIl9kZWNvZGVySW5pdGVkIiwiX2F2Y2NwdXNoZWQiLCJfZGVjb2RlZEZyYW1lcyIsIl9sYXN0U2FtcGxlRHRzIiwiX2Jhc2VEdHMiLCJfbGFzdFJlbmRlclRpbWUiLCJpbml0V2FzbVdvcmtlciIsIndhc213b3JrZXIiLCJwb3N0TWVzc2FnZSIsIm1zZyIsImFkZEV2ZW50TGlzdGVuZXIiLCJfb25EZWNvZGVkIiwieXV2Q2FudmFzIiwiWVVWQ2FudmFzIiwiX3ByZWxvYWQiLCJfYW5hbHlzZU5hbCIsImZyYW1lVGltZXMiLCJmcmFtZVRpbWUiLCJjdXJyZW50SWR4IiwicmVuZGVyIiwiTUFYX1NUUkVBTV9CVUZGRVJfTEVOR1RIIiwiRGVjb2RlciIsImluaXRlZCIsImluZm9saXN0IiwicGFyX2Jyb2Fkd2F5T25Ccm9hZHdheUluaXRlZCIsImJyb2Fkd2F5T25Ccm9hZHdheUluaXRlZCIsInBhcl9icm9hZHdheU9uUGljdHVyZURlY29kZWQiLCJicm9hZHdheU9uUGljdHVyZURlY29kZWQiLCJ0b1U4QXJyYXkiLCJwdHIiLCJIRUFQVTgiLCJNb2R1bGUiLCJfYnJvYWR3YXlJbml0Iiwic3RyZWFtQnVmZmVyIiwiX2Jyb2Fkd2F5Q3JlYXRlU3RyZWFtIiwiaW5mb2lkIiwiZGF0ZXRlbXAiLCJnZXRUaW1lIiwiX2Jyb2Fkd2F5UGxheVN0cmVhbSIsImRlY29kZXIiLCJvblBvc3RSdW4iLCJpbXBvcnRTY3JpcHRzIiwiYWRkT25Qb3N0UnVuIiwic3R5bGUiLCJfaW5pdENvbnRleHRHTCIsImNvbnRleHRHTCIsIl9pbml0UHJvZ3JhbSIsIl9pbml0QnVmZmVycyIsIl9pbml0VGV4dHVyZXMiLCJnbCIsInZhbGlkQ29udGV4dE5hbWVzIiwibmFtZUluZGV4IiwiY29udGV4dE5hbWUiLCJjb250ZXh0T3B0aW9ucyIsImdldENvbnRleHQiLCJnZXRQYXJhbWV0ZXIiLCJ2ZXJ0ZXhTaGFkZXJTY3JpcHQiLCJmcmFnbWVudFNoYWRlclNjcmlwdCIsIllVVjJSR0IiLCJ2ZXJ0ZXhTaGFkZXIiLCJjcmVhdGVTaGFkZXIiLCJWRVJURVhfU0hBREVSIiwic2hhZGVyU291cmNlIiwiY29tcGlsZVNoYWRlciIsImdldFNoYWRlclBhcmFtZXRlciIsIkNPTVBJTEVfU1RBVFVTIiwiZ2V0U2hhZGVySW5mb0xvZyIsImZyYWdtZW50U2hhZGVyIiwiRlJBR01FTlRfU0hBREVSIiwiY3JlYXRlUHJvZ3JhbSIsImF0dGFjaFNoYWRlciIsImxpbmtQcm9ncmFtIiwiZ2V0UHJvZ3JhbVBhcmFtZXRlciIsIkxJTktfU1RBVFVTIiwiZ2V0UHJvZ3JhbUluZm9Mb2ciLCJ1c2VQcm9ncmFtIiwiWVVWMlJHQlJlZiIsImdldFVuaWZvcm1Mb2NhdGlvbiIsInVuaWZvcm1NYXRyaXg0ZnYiLCJzaGFkZXJQcm9ncmFtIiwidmVydGV4UG9zQnVmZmVyIiwiY3JlYXRlQnVmZmVyIiwiYmluZEJ1ZmZlciIsIkFSUkFZX0JVRkZFUiIsImJ1ZmZlckRhdGEiLCJGbG9hdDMyQXJyYXkiLCJTVEFUSUNfRFJBVyIsInZlcnRleFBvc1JlZiIsImdldEF0dHJpYkxvY2F0aW9uIiwiZW5hYmxlVmVydGV4QXR0cmliQXJyYXkiLCJ2ZXJ0ZXhBdHRyaWJQb2ludGVyIiwiRkxPQVQiLCJ0ZXh0dXJlUG9zQnVmZmVyIiwidGV4dHVyZVBvc1JlZiIsInVUZXh0dXJlUG9zQnVmZmVyIiwidVRleHR1cmVQb3NSZWYiLCJ2VGV4dHVyZVBvc0J1ZmZlciIsInZUZXh0dXJlUG9zUmVmIiwieVRleHR1cmVSZWYiLCJfaW5pdFRleHR1cmUiLCJ5U2FtcGxlclJlZiIsInVuaWZvcm0xaSIsInVUZXh0dXJlUmVmIiwidVNhbXBsZXJSZWYiLCJ2VGV4dHVyZVJlZiIsInZTYW1wbGVyUmVmIiwidGV4dHVyZVJlZiIsImNyZWF0ZVRleHR1cmUiLCJiaW5kVGV4dHVyZSIsIlRFWFRVUkVfMkQiLCJ0ZXhQYXJhbWV0ZXJpIiwiVEVYVFVSRV9NQUdfRklMVEVSIiwiTkVBUkVTVCIsIlRFWFRVUkVfTUlOX0ZJTFRFUiIsIlRFWFRVUkVfV1JBUF9TIiwiQ0xBTVBfVE9fRURHRSIsIlRFWFRVUkVfV1JBUF9UIiwiX2RyYXdQaWN0dXJlR0wiLCJuV2lkdGgiLCJ5bGVuIiwidXZsZW4iLCJyZW5kZXJEYXRhIiwieURhdGEiLCJ1RGF0YSIsInZEYXRhIiwieUFycmF5IiwidUFycmF5IiwidkFycmF5IiwiX2RyYXdQaWN0dXJlR0w0MjAiLCJ5RGF0YVBlclJvdyIsInlSb3dDbnQiLCJ1RGF0YVBlclJvdyIsInVSb3dDbnQiLCJ2RGF0YVBlclJvdyIsInZSb3dDbnQiLCJyYXRpb3ciLCJyYXRpb2giLCJsZWZ0IiwidG9wIiwidmlld3BvcnQiLCJ0ZXh0dXJlUG9zVmFsdWVzIiwiRFlOQU1JQ19EUkFXIiwidVRleHR1cmVQb3NWYWx1ZXMiLCJ2VGV4dHVyZVBvc1ZhbHVlcyIsImFjdGl2ZVRleHR1cmUiLCJURVhUVVJFMCIsInRleEltYWdlMkQiLCJMVU1JTkFOQ0UiLCJVTlNJR05FRF9CWVRFIiwiVEVYVFVSRTEiLCJURVhUVVJFMiIsImRyYXdBcnJheXMiLCJUUklBTkdMRV9TVFJJUCIsIl9kcmF3UGljdHVyZVJHQiIsImlzT2JqZWN0RmlsbGVkIiwibWltZVR5cGUiLCJpc0NvbXBsZXRlIiwiaXNCYXNlSW5mb1JlYWR5IiwiaXNWaWRlb1JlYWR5IiwiaXNBdWRpb1JlYWR5IiwiX2RlZmF1bHQiLCJnZXREZWZhdWx0SW5mIiwiZW50cmllcyIsInYiLCJpc1JBUCIsIl90eXBlIiwiX2xhc3RBcHBlbmRMb2NhdGlvbiIsImlzRW1wdHkiLCJfc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUiLCJiZWdpbkR0cyIsImxhc3QiLCJtaWQiLCJsYm91bmQiLCJ1Ym91bmQiLCJpZHgiLCJfc2VhcmNoTmVhcmVzdFNlZ21lbnRBZnRlciIsInNlZ21lbnQiLCJsYXN0QXBwZW5kSWR4IiwiaW5zZXJ0SWR4Iiwib3JpZ2luU3RhcnREdHMiLCJnZXRMYXN0U2VnbWVudEJlZm9yZSIsImdldExhc3RTYW1wbGVCZWZvcmUiLCJnZXRMYXN0UkFQQmVmb3JlIiwic2VnbWVudElkeCIsInJhbmRvbUFjY2Vzc1BvaW50cyIsInN0YXJ0RHRzIiwiZW5kRHRzIiwic3RhcnRQdHMiLCJlbmRQdHMiLCJvcmlnaW5FbmREdHMiLCJhZGRSQVAiLCJNU0UiLCJjb250YWluZXIiLCJtZWRpYVNvdXJjZSIsInNvdXJjZUJ1ZmZlcnMiLCJvblNvdXJjZU9wZW4iLCJvblRpbWVVcGRhdGUiLCJvblVwZGF0ZUVuZCIsIm9uV2FpdGluZyIsIk1lZGlhU291cmNlIiwiYWRkU291cmNlQnVmZmVycyIsImRvQXBwZW5kIiwicmVhZHlTdGF0ZSIsImFkZCIsImR1ciIsIm1pbWUiLCJzb3VyY2VCdWZmZXIiLCJhZGRTb3VyY2VCdWZmZXIiLCJ1cGRhdGluZyIsImFwcGVuZEJ1ZmZlciIsImVuZE9mU3RyZWFtIiwiYWN0aXZlU291cmNlQnVmZmVycyIsInJlbW92ZUJ1ZmZlcnMiLCJ0YXNrTGlzdCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJ0YXNrIiwiUHJvbWlzZSIsImRvQ2xlYW5CdWZmZXIiLCJyZXRyeVRpbWUiLCJjbGVhbiIsImNsZWFyQnVmZmVyIiwicmVtb3ZlU291cmNlQnVmZmVyIiwicmV2b2tlT2JqZWN0VVJMIiwiYnVmZmVyZWQiLCJiRW5kIiwicmVhZEFzSW50IiwidGVtcCIsInBhZFN0YXJ0NEhleCIsImhleE51bSIsImhleFN0ciIsInBhZFN0YXJ0IiwibG9vcCIsInNpZ24iLCJyZWFkVWludDY0IiwicmVhZEludDE2IiwicmVhZEludDMyIiwiVGFnIiwiTG9nZ2VyIiwiRmx2Q29udHJvbGxlciIsInBsYXllciIsIl9wbGF5ZXIiLCJpbml0U2VnbWVudEFycml2ZWQiLCJpbml0TGlzdGVuZXJzIiwiX2hhbmRsZUxvYWRlckRhdGFMb2FkZWQiLCJfaGFuZGxlTmV0d29ya0Vycm9yIiwiX2hhbmRsZU1lZGlhSW5mbyIsIl9oYW5kbGVNZXRhZGF0YVBhcnNlZCIsIl9oYW5kbGVEZW11eENvbXBsZXRlIiwiX2hhbmRsZURlbXV4RXJyb3IiLCJfc2V0TWV0YVRvQXVkaW8iLCJfc2V0TWV0YVRvVmlkZW8iLCJfaGFuZGxlQXBwZW5kSW5pdFNlZ21lbnQiLCJQbGF5ZXIiLCJFcnJvcnMiLCJsb2FkRGF0YSIsImxvYWRlciIsInJlc29sdmVWaWRlb0dPUCIsImZpcnN0SWZyYW1lSWR4IiwibGFzdElmcmFtZUlkeCIsInRlbXBTYW1wbGVzIiwicmVzdCIsImZsdkFsbG93ZWRFdmVudHMiLCJGbHZQbGF5ZXIiLCJpbml0RXZlbnRzIiwiaW5pdEZsdiIsImZsdiIsImluaXRGbHZFdmVudHMiLCJ1dGlsIiwiYWRkQ2xhc3MiLCJyb290IiwiZmluZERvbSIsImxpdmUiLCJjcmVhdGVEb20iLCJjb250cm9scyIsInRpbWVyIiwiZ2V0QnVmZmVyZWRSYW5nZSIsInJhbmdlIiwiRkxWIiwiX2hhc1N0YXJ0IiwiX2Rlc3Ryb3kiLCJtc2UiLCJjdXJyZW50U3JjIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVh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VUFBTXp6QyxPQUFOO0FBQ0Q7O0FBRUR5ekMsYUFBWTtBQUNWLFNBQUtyNEMsT0FBTCxDQUFhNEUsT0FBYjtBQUNBLFNBQUsyeUMsR0FBTCxHQUFXLElBQVg7QUFDQSxTQUFLdjNDLE9BQUwsR0FBZSxJQUFmO0FBQ0Q7O0FBRUQsTUFBSXVSLEdBQUosR0FBVztBQUNULFdBQU8sS0FBS2duQyxVQUFaO0FBQ0Q7O0FBRUQsTUFBSWhuQyxHQUFKLENBQVN1UCxHQUFULEVBQWM7QUFDWixTQUFLKzBCLE1BQUwsQ0FBWWg1QixNQUFaLENBQW1CaUUsR0FBbkIsR0FBeUJBLEdBQXpCO0FBQ0EsUUFBSSxDQUFDLEtBQUs4bEIsTUFBVixFQUFrQjtBQUNoQixXQUFLNUQsS0FBTDtBQUNBLFdBQUtsaEMsSUFBTCxDQUFVLE9BQVYsRUFBbUIsTUFBTTtBQUN2QixhQUFLZ0QsS0FBTCxDQUFXZ2MsR0FBWDtBQUNELE9BRkQ7QUFHQSxXQUFLaGYsSUFBTCxDQUFVLFNBQVYsRUFBcUIsTUFBTTtBQUN6QixhQUFLcWdDLElBQUw7QUFDRCxPQUZEO0FBR0QsS0FSRCxNQVFPO0FBQ0wsV0FBS3I5QixLQUFMLENBQVdnYyxHQUFYO0FBQ0Q7QUFDRCxTQUFLaGYsSUFBTCxDQUFVLFNBQVYsRUFBcUIsTUFBTTtBQUN6QixXQUFLdy9CLFdBQUwsR0FBbUIsQ0FBbkI7QUFDRCxLQUZEO0FBR0Q7QUF0SDRCOztBQXlIL0J2akMsT0FBT0MsT0FBUCxHQUFpQm81QyxTQUFqQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlIQSxhQUFhLG1DQUFtQyxFQUFFLEkiLCJmaWxlIjoibW9iaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFIgPSB0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgPyBSZWZsZWN0IDogbnVsbFxudmFyIFJlZmxlY3RBcHBseSA9IFIgJiYgdHlwZW9mIFIuYXBwbHkgPT09ICdmdW5jdGlvbidcbiAgPyBSLmFwcGx5XG4gIDogZnVuY3Rpb24gUmVmbGVjdEFwcGx5KHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwodGFyZ2V0LCByZWNlaXZlciwgYXJncyk7XG4gIH1cblxudmFyIFJlZmxlY3RPd25LZXlzXG5pZiAoUiAmJiB0eXBlb2YgUi5vd25LZXlzID09PSAnZnVuY3Rpb24nKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gUi5vd25LZXlzXG59IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KVxuICAgICAgLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkpO1xuICB9O1xufSBlbHNlIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gUHJvY2Vzc0VtaXRXYXJuaW5nKHdhcm5pbmcpIHtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSBjb25zb2xlLndhcm4od2FybmluZyk7XG59XG5cbnZhciBOdW1iZXJJc05hTiA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiBOdW1iZXJJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHNDb3VudCA9IDA7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbnZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudEVtaXR0ZXIsICdkZWZhdWx0TWF4TGlzdGVuZXJzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyB8fCBhcmcgPCAwIHx8IE51bWJlcklzTmFOKGFyZykpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIGFyZyArICcuJyk7XG4gICAgfVxuICAgIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBhcmc7XG4gIH1cbn0pO1xuXG5FdmVudEVtaXR0ZXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gIGlmICh0aGlzLl9ldmVudHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgTnVtYmVySXNOYU4obikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBuICsgJy4nKTtcbiAgfVxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uICRnZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuICRnZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICB2YXIgZG9FcnJvciA9ICh0eXBlID09PSAnZXJyb3InKTtcblxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpXG4gICAgZG9FcnJvciA9IChkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PT0gdW5kZWZpbmVkKTtcbiAgZWxzZSBpZiAoIWRvRXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICB2YXIgZXI7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMClcbiAgICAgIGVyID0gYXJnc1swXTtcbiAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgLy8gTm90ZTogVGhlIGNvbW1lbnRzIG9uIHRoZSBgdGhyb3dgIGxpbmVzIGFyZSBpbnRlbnRpb25hbCwgdGhleSBzaG93XG4gICAgICAvLyB1cCBpbiBOb2RlJ3Mgb3V0cHV0IGlmIHRoaXMgcmVzdWx0cyBpbiBhbiB1bmhhbmRsZWQgZXhjZXB0aW9uLlxuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgfVxuICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmhhbmRsZWQgZXJyb3IuJyArIChlciA/ICcgKCcgKyBlci5tZXNzYWdlICsgJyknIDogJycpKTtcbiAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgIHRocm93IGVycjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgfVxuXG4gIHZhciBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIFJlZmxlY3RBcHBseShoYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgUmVmbGVjdEFwcGx5KGxpc3RlbmVyc1tpXSwgdGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldC5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA/IGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gICAgICAvLyBSZS1hc3NpZ24gYGV2ZW50c2AgYmVjYXVzZSBhIG5ld0xpc3RlbmVyIGhhbmRsZXIgY291bGQgaGF2ZSBjYXVzZWQgdGhlXG4gICAgICAvLyB0aGlzLl9ldmVudHMgdG8gYmUgYXNzaWduZWQgdG8gYSBuZXcgb2JqZWN0XG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPVxuICAgICAgICBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOiBbZXhpc3RpbmcsIGxpc3RlbmVyXTtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB9IGVsc2UgaWYgKHByZXBlbmQpIHtcbiAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdGluZy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICAgIG0gPSAkZ2V0TWF4TGlzdGVuZXJzKHRhcmdldCk7XG4gICAgaWYgKG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0gJiYgIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgIC8vIE5vIGVycm9yIGNvZGUgZm9yIHRoaXMgc2luY2UgaXQgaXMgYSBXYXJuaW5nXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIHZhciB3ID0gbmV3IEVycm9yKCdQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5sZW5ndGggKyAnICcgKyBTdHJpbmcodHlwZSkgKyAnIGxpc3RlbmVycyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luY3JlYXNlIGxpbWl0Jyk7XG4gICAgICB3Lm5hbWUgPSAnTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nJztcbiAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgIHcudHlwZSA9IHR5cGU7XG4gICAgICB3LmNvdW50ID0gZXhpc3RpbmcubGVuZ3RoO1xuICAgICAgUHJvY2Vzc0VtaXRXYXJuaW5nKHcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcblxuZnVuY3Rpb24gb25jZVdyYXBwZXIoKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgaWYgKCF0aGlzLmZpcmVkKSB7XG4gICAgdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLCB0aGlzLndyYXBGbik7XG4gICAgdGhpcy5maXJlZCA9IHRydWU7XG4gICAgUmVmbGVjdEFwcGx5KHRoaXMubGlzdGVuZXIsIHRoaXMudGFyZ2V0LCBhcmdzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfb25jZVdyYXAodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgc3RhdGUgPSB7IGZpcmVkOiBmYWxzZSwgd3JhcEZuOiB1bmRlZmluZWQsIHRhcmdldDogdGFyZ2V0LCB0eXBlOiB0eXBlLCBsaXN0ZW5lcjogbGlzdGVuZXIgfTtcbiAgdmFyIHdyYXBwZWQgPSBvbmNlV3JhcHBlci5iaW5kKHN0YXRlKTtcbiAgd3JhcHBlZC5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICBzdGF0ZS53cmFwRm4gPSB3cmFwcGVkO1xuICByZXR1cm4gd3JhcHBlZDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cbiAgdGhpcy5vbih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRPbmNlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGxpc3QgPSBldmVudHNbdHlwZV07XG4gICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8IGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0Lmxpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgICAgIGZvciAoaSA9IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHwgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsTGlzdGVuZXIgPSBsaXN0W2ldLmxpc3RlbmVyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09IDApXG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcGxpY2VPbmUobGlzdCwgcG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKVxuICAgICAgICAgIGV2ZW50c1t0eXBlXSA9IGxpc3RbMF07XG5cbiAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBvcmlnaW5hbExpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cywgaTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRzW3R5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV07XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuZnVuY3Rpb24gX2xpc3RlbmVycyh0YXJnZXQsIHR5cGUsIHVud3JhcCkge1xuICB2YXIgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgaWYgKGV2bGlzdGVuZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiB1bndyYXAgPyBbZXZsaXN0ZW5lci5saXN0ZW5lciB8fCBldmxpc3RlbmVyXSA6IFtldmxpc3RlbmVyXTtcblxuICByZXR1cm4gdW53cmFwID9cbiAgICB1bndyYXBMaXN0ZW5lcnMoZXZsaXN0ZW5lcikgOiBhcnJheUNsb25lKGV2bGlzdGVuZXIsIGV2bGlzdGVuZXIubGVuZ3RoKTtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCB0cnVlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmF3TGlzdGVuZXJzID0gZnVuY3Rpb24gcmF3TGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5saXN0ZW5lckNvdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGlzdGVuZXJDb3VudC5jYWxsKGVtaXR0ZXIsIHR5cGUpO1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBsaXN0ZW5lckNvdW50O1xuZnVuY3Rpb24gbGlzdGVuZXJDb3VudCh0eXBlKSB7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHJldHVybiB0aGlzLl9ldmVudHNDb3VudCA+IDAgPyBSZWZsZWN0T3duS2V5cyh0aGlzLl9ldmVudHMpIDogW107XG59O1xuXG5mdW5jdGlvbiBhcnJheUNsb25lKGFyciwgbikge1xuICB2YXIgY29weSA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpXG4gICAgY29weVtpXSA9IGFycltpXTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKDsgaW5kZXggKyAxIDwgbGlzdC5sZW5ndGg7IGluZGV4KyspXG4gICAgbGlzdFtpbmRleF0gPSBsaXN0W2luZGV4ICsgMV07XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhhcnIpIHtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyArK2kpIHtcbiAgICByZXRbaV0gPSBhcnJbaV0ubGlzdGVuZXIgfHwgYXJyW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgVHJhY2s6IHJlcXVpcmUoJy4vc3JjL3RyYWNrJykuZGVmYXVsdCxcbiAgVHJhY2tzOiByZXF1aXJlKCcuL3NyYy90cmFjaycpLlRyYWNrcyxcbiAgQXVkaW9UcmFjazogcmVxdWlyZSgnLi9zcmMvdHJhY2snKS5BdWRpb1RyYWNrLFxuICBWaWRlb1RyYWNrOiByZXF1aXJlKCcuL3NyYy90cmFjaycpLlZpZGVvVHJhY2ssXG5cbiAgWGdCdWZmZXI6IHJlcXVpcmUoJy4vc3JjL2J1ZmZlcicpLlhnQnVmZmVyLFxuICBSZW11eEJ1ZmZlcjogcmVxdWlyZSgnLi9zcmMvYnVmZmVyJykuUmVtdXhCdWZmZXIsXG5cbiAgUHJlU291cmNlOiByZXF1aXJlKCcuL3NyYy9wcmVzb3VjZScpLmRlZmF1bHRcbn07XG4iLCJleHBvcnQgY2xhc3MgWGdCdWZmZXIge1xuICAvKipcbiAgICogQSBidWZmZXIgdG8gc3RvcmUgbG9hZGVkIGRhdGEuXG4gICAqXG4gICAqIEBjbGFzcyBMb2FkZXJCdWZmZXJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aCAtIE9wdGlvbmFsIHRoZSBidWZmZXIgc2l6ZVxuICAgKi9cbiAgY29uc3RydWN0b3IgKGxlbmd0aCkge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoIHx8IDBcbiAgICB0aGlzLmhpc3RvcnlMZW4gPSBsZW5ndGggfHwgMFxuICAgIHRoaXMuYXJyYXkgPSBbXVxuICAgIHRoaXMub2Zmc2V0ID0gMFxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBmdW5jdGlvbiB0byBwdXNoIGRhdGEuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBkYXRhIC0gVGhlIGRhdGEgdG8gcHVzaCBpbnRvIHRoZSBidWZmZXJcbiAgICovXG4gIHB1c2ggKGRhdGEpIHtcbiAgICB0aGlzLmFycmF5LnB1c2goZGF0YSlcbiAgICB0aGlzLmxlbmd0aCArPSBkYXRhLmJ5dGVMZW5ndGhcbiAgICB0aGlzLmhpc3RvcnlMZW4gKz0gZGF0YS5ieXRlTGVuZ3RoXG4gIH1cblxuICAvKipcbiAgICogVGhlIGZ1bmN0aW9uIHRvIHNoaWZ0IGRhdGEuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSBUaGUgc2l6ZSBvZiBzaGlmdC5cbiAgICovXG4gIHNoaWZ0IChsZW5ndGgpIHtcbiAgICBpZiAodGhpcy5hcnJheS5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoMClcbiAgICB9XG5cbiAgICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zaGlmdEJ1ZmZlcigpXG4gICAgfVxuICAgIGlmICgodGhpcy5vZmZzZXQgKyBsZW5ndGgpID09PSB0aGlzLmFycmF5WzBdLmxlbmd0aCkge1xuICAgICAgbGV0IHJldCA9IHRoaXMuYXJyYXlbMF0uc2xpY2UodGhpcy5vZmZzZXQsIHRoaXMub2Zmc2V0ICsgbGVuZ3RoKVxuICAgICAgdGhpcy5vZmZzZXQgPSAwXG4gICAgICB0aGlzLmFycmF5LnNoaWZ0KClcbiAgICAgIHRoaXMubGVuZ3RoIC09IGxlbmd0aFxuICAgICAgcmV0dXJuIHJldFxuICAgIH1cblxuICAgIGlmICgodGhpcy5vZmZzZXQgKyBsZW5ndGgpIDwgdGhpcy5hcnJheVswXS5sZW5ndGgpIHtcbiAgICAgIGxldCByZXQgPSB0aGlzLmFycmF5WzBdLnNsaWNlKHRoaXMub2Zmc2V0LCB0aGlzLm9mZnNldCArIGxlbmd0aClcbiAgICAgIHRoaXMub2Zmc2V0ICs9IGxlbmd0aFxuICAgICAgdGhpcy5sZW5ndGggLT0gbGVuZ3RoXG4gICAgICByZXR1cm4gcmV0XG4gICAgfVxuXG4gICAgbGV0IHJldCA9IG5ldyBVaW50OEFycmF5KGxlbmd0aClcbiAgICBsZXQgdG1wb2ZmID0gMFxuICAgIHdoaWxlICh0aGlzLmFycmF5Lmxlbmd0aCA+IDAgJiYgbGVuZ3RoID4gMCkge1xuICAgICAgaWYgKCh0aGlzLm9mZnNldCArIGxlbmd0aCkgPCB0aGlzLmFycmF5WzBdLmxlbmd0aCkge1xuICAgICAgICBsZXQgdG1wID0gdGhpcy5hcnJheVswXS5zbGljZSh0aGlzLm9mZnNldCwgdGhpcy5vZmZzZXQgKyBsZW5ndGgpXG4gICAgICAgIHJldC5zZXQodG1wLCB0bXBvZmYpXG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IGxlbmd0aFxuICAgICAgICB0aGlzLmxlbmd0aCAtPSBsZW5ndGhcbiAgICAgICAgbGVuZ3RoID0gMFxuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHRlbXBsZW5ndGggPSB0aGlzLmFycmF5WzBdLmxlbmd0aCAtIHRoaXMub2Zmc2V0XG4gICAgICAgIHJldC5zZXQodGhpcy5hcnJheVswXS5zbGljZSh0aGlzLm9mZnNldCwgdGhpcy5hcnJheVswXS5sZW5ndGgpLCB0bXBvZmYpXG4gICAgICAgIHRoaXMuYXJyYXkuc2hpZnQoKVxuICAgICAgICB0aGlzLm9mZnNldCA9IDBcbiAgICAgICAgdG1wb2ZmICs9IHRlbXBsZW5ndGhcbiAgICAgICAgdGhpcy5sZW5ndGggLT0gdGVtcGxlbmd0aFxuICAgICAgICBsZW5ndGggLT0gdGVtcGxlbmd0aFxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0XG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gdG8gY2xlYXIgdGhlIGJ1ZmZlci5cbiAgICovXG4gIGNsZWFyICgpIHtcbiAgICB0aGlzLmFycmF5ID0gW11cbiAgICB0aGlzLmxlbmd0aCA9IDBcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuY2xlYXIoKVxuICAgIHRoaXMuaGlzdG9yeUxlbiA9IDBcbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0byBzaGlmdCBvbmUgdW5pdDhBcnJheS5cbiAgICovXG4gIF9zaGlmdEJ1ZmZlciAoKSB7XG4gICAgdGhpcy5sZW5ndGggLT0gdGhpcy5hcnJheVswXS5sZW5ndGhcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgICByZXR1cm4gdGhpcy5hcnJheS5zaGlmdCgpXG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCB1aW50OCBkYXRhIHRvIG51bWJlci5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IC0gdGhlIHN0YXJ0IHBvc3Rpb24uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSB0aGUgbGVuZ3RoIG9mIGRhdGEuXG4gICAqL1xuICB0b0ludCAoc3RhcnQsIGxlbmd0aCkge1xuICAgIGxldCByZXRJbnQgPSAwXG4gICAgbGV0IGkgPSB0aGlzLm9mZnNldCArIHN0YXJ0XG4gICAgd2hpbGUgKGkgPCB0aGlzLm9mZnNldCArIGxlbmd0aCArIHN0YXJ0KSB7XG4gICAgICBpZiAoaSA8IHRoaXMuYXJyYXlbMF0ubGVuZ3RoKSB7XG4gICAgICAgIHJldEludCA9IHJldEludCAqIDI1NiArIHRoaXMuYXJyYXlbMF1baV1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hcnJheVsxXSkge1xuICAgICAgICByZXRJbnQgPSByZXRJbnQgKiAyNTYgKyB0aGlzLmFycmF5WzFdW2kgLSB0aGlzLmFycmF5WzBdLmxlbmd0aF1cbiAgICAgIH1cblxuICAgICAgaSsrXG4gICAgfVxuICAgIHJldHVybiByZXRJbnRcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVtdXhCdWZmZXIge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy52aWRlbyA9IFtdXG4gICAgdGhpcy5hdWRpbyA9IFtdXG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLnZpZGVvID0gW11cbiAgICB0aGlzLmF1ZGlvID0gW11cbiAgfVxufVxuIiwiY2xhc3MgU291cmNlIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMubWltZXR5cGUgPSAnJztcbiAgICB0aGlzLmluaXQgPSBudWxsO1xuICAgIHRoaXMuZGF0YSA9IFtdO1xuICB9XG59XG5cbmNsYXNzIFByZVNvdXJjZSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLnNvdXJjZXMgPSB7fTtcbiAgfVxuXG4gIGdldFNvdXJjZSAoc291cmNlKSB7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlc1tzb3VyY2VdO1xuICB9XG5cbiAgY3JlYXRlU291cmNlIChuYW1lKSB7XG4gICAgdGhpcy5zb3VyY2VzW25hbWVdID0gbmV3IFNvdXJjZSgpO1xuICAgIHJldHVybiB0aGlzLnNvdXJjZXNbbmFtZV07XG4gIH1cblxuICBjbGVhciAoKSB7XG4gICAgdGhpcy5zb3VyY2VzID0ge307XG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLnNvdXJjZXMgPSB7fTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcmVTb3VyY2U7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUcmFjayB7XG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IuXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5pZCA9IC0xXG4gICAgdGhpcy5zZXF1ZW5jZU51bWJlciA9IDBcbiAgICB0aGlzLnNhbXBsZXMgPSBbXVxuICAgIHRoaXMuZHJvcHBlZFNhbXBsZXMgPSBbXVxuICAgIHRoaXMubGVuZ3RoID0gMFxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSB0cmFjay5cbiAgICovXG4gIHJlc2V0ICgpIHtcbiAgICB0aGlzLnNlcXVlbmNlTnVtYmVyID0gMFxuICAgIHRoaXMuc2FtcGxlcyA9IFtdXG4gICAgdGhpcy5sZW5ndGggPSAwXG4gIH1cbiAgLyoqXG4gICAqIGRlc3Ryb3kgdGhlIHRyYWNrLlxuICAgKi9cbiAgZGlzdHJveSAoKSB7XG4gICAgdGhpcy5yZXNldCgpXG4gICAgdGhpcy5pZCA9IC0xXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEF1ZGlvVHJhY2sgZXh0ZW5kcyBUcmFjayB7XG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIGF1ZGlvIHRyYWNrLlxuICAgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLlRBRyA9ICdBdWRpb1RyYWNrJ1xuICAgIHRoaXMudHlwZSA9ICdhdWRpbydcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVmlkZW9UcmFjayBleHRlbmRzIFRyYWNrIHtcbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdmlkZW8gdHJhY2suXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuVEFHID0gJ1ZpZGVvVHJhY2snXG4gICAgdGhpcy50eXBlID0gJ3ZpZGVvJ1xuICAgIHRoaXMuZHJvcHBlZCA9IDBcbiAgfVxuICAvKipcbiAgICogcmVzZXQgdGhlIHZpZGVvIHRyYWNrLlxuICAgKi9cbiAgcmVzZXQgKCkge1xuICAgIHRoaXMuc2VxdWVuY2VOdW1iZXIgPSAwXG4gICAgdGhpcy5zYW1wbGVzID0gW11cbiAgICB0aGlzLmxlbmd0aCA9IDBcbiAgICB0aGlzLmRyb3BwZWQgPSAwXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRyYWNrcyB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLmF1ZGlvVHJhY2sgPSBudWxsXG4gICAgdGhpcy52aWRlb1RyYWNrID0gbnVsbFxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5hdWRpb1RyYWNrID0gbnVsbFxuICAgIHRoaXMudmlkZW9UcmFjayA9IG51bGxcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIE5hbHVuaXQ6IHJlcXVpcmUoJy4vc3JjL2gyNjQvbmFsdW5pdCcpLmRlZmF1bHQsXG4gIFNwc1BhcnNlcjogcmVxdWlyZSgnLi9zcmMvaDI2NC9uYWx1bml0L3NwcycpLmRlZmF1bHQsXG5cbiAgQ29tcGF0aWJpbGl0eTogcmVxdWlyZSgnLi9zcmMvY29tcGF0aWJpbGl0eScpLmRlZmF1bHRcbn07XG4iLCJcbmNsYXNzIEFBQyB7XG5cbiAgc3RhdGljIGdldFNpbGVudEZyYW1lKGNvZGVjLCBjaGFubmVsQ291bnQpIHtcbiAgICBpZiAoY29kZWMgPT09ICdtcDRhLjQwLjInKSB7XG4gICAgICAvLyBoYW5kbGUgTEMtQUFDXG4gICAgICBpZiAoY2hhbm5lbENvdW50ID09PSAxKSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMywgMHg4MF0pO1xuICAgICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDIxLCAweDAwLCAweDQ5LCAweDkwLCAweDAyLCAweDE5LCAweDAwLCAweDIzLCAweDgwXSk7XG4gICAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gMykge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4OGVdKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSA0KSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4MCwgMHgyYywgMHg4MCwgMHgwOCwgMHgwMiwgMHgzOF0pO1xuICAgICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDAwLCAweGM4LCAweDAwLCAweDgwLCAweDIwLCAweDg0LCAweDAxLCAweDI2LCAweDQwLCAweDA4LCAweDY0LCAweDAwLCAweDgyLCAweDMwLCAweDA0LCAweDk5LCAweDAwLCAweDIxLCAweDkwLCAweDAyLCAweDM4XSk7XG4gICAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gNikge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4ODIsIDB4MzAsIDB4MDQsIDB4OTksIDB4MDAsIDB4MjEsIDB4OTAsIDB4MDIsIDB4MDAsIDB4YjIsIDB4MDAsIDB4MjAsIDB4MDgsIDB4ZTBdKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaGFuZGxlIEhFLUFBQyAobXA0YS40MC41IC8gbXA0YS40MC4yOSlcbiAgICAgIGlmIChjaGFubmVsQ291bnQgPT09IDEpIHtcbiAgICAgICAgLy8gZmZtcGVnIC15IC1mIGxhdmZpIC1pIFwiYWV2YWxzcmM9MDpkPTAuMDVcIiAtYzphIGxpYmZka19hYWMgLXByb2ZpbGU6YSBhYWNfaGUgLWI6YSA0ayBvdXRwdXQuYWFjICYmIGhleGR1bXAgLXYgLWUgJzE2LzEgXCIweCV4LFwiIFwiXFxuXCInIC12IG91dHB1dC5hYWNcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDEsIDB4NDAsIDB4MjIsIDB4ODAsIDB4YTMsIDB4NGUsIDB4ZTYsIDB4ODAsIDB4YmEsIDB4OCwgMHgwLCAweDAsIDB4MCwgMHgxYywgMHg2LCAweGYxLCAweGMxLCAweGEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWVdKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSAyKSB7XG4gICAgICAgIC8vIGZmbXBlZyAteSAtZiBsYXZmaSAtaSBcImFldmFsc3JjPTB8MDpkPTAuMDVcIiAtYzphIGxpYmZka19hYWMgLXByb2ZpbGU6YSBhYWNfaGVfdjIgLWI6YSA0ayBvdXRwdXQuYWFjICYmIGhleGR1bXAgLXYgLWUgJzE2LzEgXCIweCV4LFwiIFwiXFxuXCInIC12IG91dHB1dC5hYWNcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDEsIDB4NDAsIDB4MjIsIDB4ODAsIDB4YTMsIDB4NWUsIDB4ZTYsIDB4ODAsIDB4YmEsIDB4OCwgMHgwLCAweDAsIDB4MCwgMHgwLCAweDk1LCAweDAsIDB4NiwgMHhmMSwgMHhhMSwgMHhhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVlXSk7XG4gICAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gMykge1xuICAgICAgICAvLyBmZm1wZWcgLXkgLWYgbGF2ZmkgLWkgXCJhZXZhbHNyYz0wfDB8MDpkPTAuMDVcIiAtYzphIGxpYmZka19hYWMgLXByb2ZpbGU6YSBhYWNfaGVfdjIgLWI6YSA0ayBvdXRwdXQuYWFjICYmIGhleGR1bXAgLXYgLWUgJzE2LzEgXCIweCV4LFwiIFwiXFxuXCInIC12IG91dHB1dC5hYWNcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDEsIDB4NDAsIDB4MjIsIDB4ODAsIDB4YTMsIDB4NWUsIDB4ZTYsIDB4ODAsIDB4YmEsIDB4OCwgMHgwLCAweDAsIDB4MCwgMHgwLCAweDk1LCAweDAsIDB4NiwgMHhmMSwgMHhhMSwgMHhhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVlXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQUFDO1xuIiwiaW1wb3J0IHtFVkVOVFN9IGZyb20gJ3hncGxheWVyLXV0aWxzJ1xuaW1wb3J0IEFBQyBmcm9tICcuL2FhYy9hYWMtaGVscGVyJ1xuXG5jb25zdCB7UkVNVVhfRVZFTlRTLCBERU1VWF9FVkVOVFN9ID0gRVZFTlRTXG5cbmNsYXNzIENvbXBhdGliaWxpdHkge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5uZXh0QXVkaW9EdHMgPSAwIC8vIOaooeaLn+S4i+S4gOautemfs+mikeaVsOaNrueahGR0c1xuICAgIHRoaXMubmV4dFZpZGVvRHRzID0gMCAvLyDmqKHmi5/kuIvkuIDmrrXop4bpopHmlbDmja7nmoRkdHNcblxuICAgIHRoaXMubGFzdEF1ZGlvU2FtcGxlc0xlbiA9IDAgLy8g5LiK5LiA5q616Z+z6aKR5pWw5o2u55qE6ZW/5bqmXG4gICAgdGhpcy5sYXN0VmlkZW9TYW1wbGVzTGVuID0gMCAvLyDkuIrkuIDmrrXop4bpopHmlbDmja7nmoTplb/luqZcblxuICAgIHRoaXMubGFzdFZpZGVvRHRzID0gdW5kZWZpbmVkIC8vIOS4iuS4gOautemfs+mikeaVsOaNrueahOmVv+W6plxuICAgIHRoaXMubGFzdEF1ZGlvRHRzID0gdW5kZWZpbmVkIC8vIOS4iuS4gOauteinhumikeaVsOaNrueahOmVv+W6plxuXG4gICAgdGhpcy5hbGxBdWRpb1NhbXBsZXNDb3VudCA9IDAgLy8g6Z+z6aKR5oC75pWw5o2u6YePKOWOn+Wni+W4pylcbiAgICB0aGlzLmFsbFZpZGVvU2FtcGxlc0NvdW50ID0gMCAvLyDop4bpopHmgLvmlbDmja7ph48o5Y6f5aeL5binKVxuXG4gICAgdGhpcy5fZmlyc3RBdWRpb1NhbXBsZSA9IG51bGxcbiAgICB0aGlzLl9maXJzdFZpZGVvU2FtcGxlID0gbnVsbFxuXG4gICAgdGhpcy5maWxsZWRBdWRpb1NhbXBsZXMgPSBbXSAvLyDooaXlhYXpn7PpopHluKfvvIjvvIlcbiAgICB0aGlzLmZpbGxlZFZpZGVvU2FtcGxlcyA9IFtdIC8vIOihpeWFheinhumikeW4p++8iO+8iVxuXG4gICAgdGhpcy5fdmlkZW9MYXJnZUdhcCA9IDBcbiAgICB0aGlzLl9hdWRpb0xhcmdlR2FwID0gMFxuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgdGhpcy5iZWZvcmUoUkVNVVhfRVZFTlRTLlJFTVVYX01FRElBLCB0aGlzLmRvRml4LmJpbmQodGhpcykpXG4gIH1cblxuICByZXNldCAoKSB7XG4gICAgdGhpcy5uZXh0QXVkaW9EdHMgPSBudWxsIC8vIOS8sOeul+S4i+S4gOautemfs+mikeaVsOaNrueahGR0c1xuICAgIHRoaXMubmV4dFZpZGVvRHRzID0gbnVsbCAvLyDkvLDnrpfkuIvkuIDmrrXop4bpopHmlbDmja7nmoRkdHNcblxuICAgIHRoaXMubGFzdEF1ZGlvU2FtcGxlc0xlbiA9IDAgLy8g5LiK5LiA5q616Z+z6aKR5pWw5o2u55qE6ZW/5bqmXG4gICAgdGhpcy5sYXN0VmlkZW9TYW1wbGVzTGVuID0gMCAvLyDkuIrkuIDmrrXop4bpopHmlbDmja7nmoTplb/luqZcblxuICAgIHRoaXMubGFzdFZpZGVvRHRzID0gdW5kZWZpbmVkIC8vIOS4iuS4gOautemfs+mikeaVsOaNrueahOmVv+W6plxuICAgIHRoaXMubGFzdEF1ZGlvRHRzID0gdW5kZWZpbmVkIC8vIOS4iuS4gOauteinhumikeaVsOaNrueahOmVv+W6plxuXG4gICAgLy8gdGhpcy5hbGxBdWRpb1NhbXBsZXNDb3VudCA9IDAgLy8g6Z+z6aKR5oC75pWw5o2u6YePKOWOn+Wni+W4pylcbiAgICAvLyB0aGlzLmFsbFZpZGVvU2FtcGxlc0NvdW50ID0gMCAvLyDop4bpopHmgLvmlbDmja7ph48o5Y6f5aeL5binKVxuXG4gICAgLy8gdGhpcy5fZmlyc3RBdWRpb1NhbXBsZSA9IG51bGxcbiAgICAvLyB0aGlzLl9maXJzdFZpZGVvU2FtcGxlID0gbnVsbFxuXG4gICAgdGhpcy5maWxsZWRBdWRpb1NhbXBsZXMgPSBbXSAvLyDooaXlhYXpn7PpopHluKfvvIjvvIlcbiAgICB0aGlzLmZpbGxlZFZpZGVvU2FtcGxlcyA9IFtdIC8vIOihpeWFheinhumikeW4p++8iO+8iVxuICB9XG5cbiAgZG9GaXggKCkge1xuICAgIGNvbnN0IHsgaXNGaXJzdEF1ZGlvU2FtcGxlcywgaXNGaXJzdFZpZGVvU2FtcGxlcyB9ID0gdGhpcy5nZXRGaXJzdFNhbXBsZSgpXG5cbiAgICAvLyB0aGlzLnJlbW92ZUludmFsaWRTYW1wbGVzKClcblxuICAgIHRoaXMucmVjb3JkU2FtcGxlc0NvdW50KClcblxuICAgIGlmICh0aGlzLl9maXJzdFZpZGVvU2FtcGxlKSB7XG4gICAgICB0aGlzLmZpeFJlZlNhbXBsZUR1cmF0aW9uKHRoaXMudmlkZW9UcmFjay5tZXRhLCB0aGlzLnZpZGVvVHJhY2suc2FtcGxlcylcbiAgICB9XG4gICAgaWYgKHRoaXMuX2ZpcnN0QXVkaW9TYW1wbGUpIHtcbiAgICAgIHRoaXMuZml4UmVmU2FtcGxlRHVyYXRpb24odGhpcy5hdWRpb1RyYWNrLm1ldGEsIHRoaXMuYXVkaW9UcmFjay5zYW1wbGVzKVxuICAgIH1cblxuICAgIGNvbnN0IHsgY2hhbmdlZDogdmlkZW9DaGFuZ2VkLCBjaGFuZ2VkSWR4OiB2aWRlb0NoYW5nZWRJZHggfSA9IENvbXBhdGliaWxpdHkuZGV0YWN0Q2hhbmdlU3RyZWFtKHRoaXMudmlkZW9UcmFjay5zYW1wbGVzKVxuICAgIGlmICh2aWRlb0NoYW5nZWQgJiYgIWlzRmlyc3RBdWRpb1NhbXBsZXMpIHtcbiAgICAgIHRoaXMuZml4Q2hhbmdlU3RyZWFtVmlkZW8odmlkZW9DaGFuZ2VkSWR4KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRvRml4VmlkZW8oaXNGaXJzdFZpZGVvU2FtcGxlcylcbiAgICB9XG5cbiAgICBjb25zdCB7IGNoYW5nZWQ6IGF1ZGlvQ2hhbmdlZCwgY2hhbmdlZElkeDogYXVkaW9DaGFuZ2VkSWR4IH0gPSBDb21wYXRpYmlsaXR5LmRldGFjdENoYW5nZVN0cmVhbSh0aGlzLmF1ZGlvVHJhY2suc2FtcGxlcylcbiAgICBpZiAoYXVkaW9DaGFuZ2VkKSB7XG4gICAgICB0aGlzLmZpeENoYW5nZVN0cmVhbUF1ZGlvKGF1ZGlvQ2hhbmdlZElkeClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb0ZpeEF1ZGlvKGlzRmlyc3RBdWRpb1NhbXBsZXMpXG4gICAgfVxuXG4gICAgLy8gdGhpcy5yZW1vdmVJbnZhbGlkU2FtcGxlcygpXG4gIH1cblxuICBkb0ZpeFZpZGVvIChmaXJzdCwgc3RyZWFtQ2hhbmdlU3RhcnQpIHtcbiAgICBsZXQge3NhbXBsZXM6IHZpZGVvU2FtcGxlcywgbWV0YX0gPSB0aGlzLnZpZGVvVHJhY2tcblxuICAgIGlmIChtZXRhLmZyYW1lUmF0ZSAmJiBtZXRhLmZyYW1lUmF0ZS5maXhlZCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXZpZGVvU2FtcGxlcyB8fCAhdmlkZW9TYW1wbGVzLmxlbmd0aCB8fCAhdGhpcy5fZmlyc3RWaWRlb1NhbXBsZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gY29uc29sZS5sb2coYHZpZGVvIGxhc3RTYW1wbGUsICR7dmlkZW9TYW1wbGVzW3ZpZGVvU2FtcGxlcy5sZW5ndGggLSAxXS5kdHN9YClcblxuICAgIGNvbnN0IGZpcnN0U2FtcGxlID0gdmlkZW9TYW1wbGVzWzBdXG5cbiAgICBjb25zdCBzYW1wbGVzTGVuID0gdmlkZW9TYW1wbGVzLmxlbmd0aDtcblxuICAgIC8vIHN0ZXAwLuS/ruWkjWhsc+a1geWHuueOsOW3qOWkp2dhcO+8jOmcgOimgeW8uuWItumHjeWumuS9jeeahOmXrumimFxuICAgIGlmICh0aGlzLl92aWRlb0xhcmdlR2FwID4gMCkge1xuICAgICAgQ29tcGF0aWJpbGl0eS5kb0ZpeExhcmdlR2FwKHZpZGVvU2FtcGxlcywgdGhpcy5fdmlkZW9MYXJnZUdhcClcbiAgICB9XG5cbiAgICBpZiAoZmlyc3RTYW1wbGUuZHRzICE9PSB0aGlzLl9maXJzdFZpZGVvU2FtcGxlLmR0cyAmJiAoc3RyZWFtQ2hhbmdlU3RhcnQgfHwgQ29tcGF0aWJpbGl0eS5kZXRlY3RMYXJnZUdhcCh0aGlzLm5leHRWaWRlb0R0cywgZmlyc3RTYW1wbGUpKSkge1xuICAgICAgaWYgKHN0cmVhbUNoYW5nZVN0YXJ0KSB7XG4gICAgICAgIHRoaXMubmV4dFZpZGVvRHRzID0gc3RyZWFtQ2hhbmdlU3RhcnQgLy8gRklYOiBIbHPkuK3pgJTliIdjb2RlY++8jOWcqOWmguaenOebtOaOpXNlZWvliLDlkI7pnaLnmoTngrnkvJrlr7zoh7RsYXJnZUdhcOiuoeeul+Wksei0pVxuICAgICAgfVxuXG4gICAgICB0aGlzLl92aWRlb0xhcmdlR2FwID0gdGhpcy5uZXh0VmlkZW9EdHMgLSBmaXJzdFNhbXBsZS5kdHNcbiAgICAgIENvbXBhdGliaWxpdHkuZG9GaXhMYXJnZUdhcCh2aWRlb1NhbXBsZXMsIHRoaXMuX3ZpZGVvTGFyZ2VHYXApXG4gICAgfVxuXG4gICAgY29uc3QgZmlyc3REdHMgPSBmaXJzdFNhbXBsZS5kdHNcblxuICAgIC8vIHN0ZXAxLiDkv67lpI3kuI5hdWRpb+mmluW4p+W3rui3neWkquWkp+eahOmXrumimFxuICAgIGlmIChmaXJzdCAmJiB0aGlzLl9maXJzdEF1ZGlvU2FtcGxlKSB7XG4gICAgICBjb25zdCB2aWRlb0ZpcnN0RHRzID0gdGhpcy5fZmlyc3RWaWRlb1NhbXBsZS5kdHNcbiAgICAgIGNvbnN0IGF1ZGlvRmlyc3REdHMgPSB0aGlzLl9maXJzdEF1ZGlvU2FtcGxlLmR0c1xuICAgICAgY29uc3QgZ2FwID0gdmlkZW9GaXJzdER0cyAtIGF1ZGlvRmlyc3REdHNcbiAgICAgIGlmIChnYXAgPiAoMiAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pKSB7XG4gICAgICAgIGNvbnN0IGZpbGxDb3VudCA9IE1hdGguZmxvb3IoZ2FwIC8gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbilcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGxDb3VudDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgY2xvbmVkRmlyc3RTYW1wbGUgPSBPYmplY3QuYXNzaWduKHt9LCBmaXJzdFNhbXBsZSkgLy8g6KeG6aKR5aS06YOo5bin57y65aSx6ZyA6KaB5aSN5Yi256ys5LiA5binXG4gICAgICAgICAgLy8g6YeN5paw6K6h566Xc2FtcGxl55qEZHRz5ZKMcHRzXG4gICAgICAgICAgY2xvbmVkRmlyc3RTYW1wbGUuZHRzID0gdmlkZW9GaXJzdER0cyAtIChpICsgMSkgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG4gICAgICAgICAgY2xvbmVkRmlyc3RTYW1wbGUucHRzID0gY2xvbmVkRmlyc3RTYW1wbGUuZHRzICsgY2xvbmVkRmlyc3RTYW1wbGUuY3RzXG5cbiAgICAgICAgICB2aWRlb1NhbXBsZXMudW5zaGlmdChjbG9uZWRGaXJzdFNhbXBsZSlcblxuICAgICAgICAgIHRoaXMuZmlsbGVkVmlkZW9TYW1wbGVzLnB1c2goe1xuICAgICAgICAgICAgZHRzOiBjbG9uZWRGaXJzdFNhbXBsZS5kdHMsXG4gICAgICAgICAgICBzaXplOiBjbG9uZWRGaXJzdFNhbXBsZS5kYXRhLmJ5dGVMZW5ndGhcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGdhcFxuICAgIC8vIHN0ZXAyLiDkv67lpI1zYW1wbGVz5q615LmL6Ze055qE6Ze06Led6Zeu6aKY44CBXG4gICAgaWYgKHRoaXMubmV4dFZpZGVvRHRzKSB7XG4gICAgICAvLyBzdGVwMS4g5aSE55CGc2FtcGxlc+auteS5i+mXtOeahOS4ouW4p+aDheWGtVxuICAgICAgLy8g5b2T5Y+R546wZHVyYXRpb27lt67ot53lpKfkuo4y5bin5pe26L+b6KGM6KGl5binXG4gICAgICBnYXAgPSBmaXJzdER0cyAtIHRoaXMubmV4dFZpZGVvRHRzXG4gICAgICBjb25zdCBhYnNHYXAgPSBNYXRoLmFicyhnYXApXG4gICAgICBpZiAoZ2FwID4gKDIgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSkge1xuICAgICAgICBjb25zdCBmaWxsRnJhbWVDb3VudCA9IE1hdGguZmxvb3IoZ2FwIC8gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbilcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGxGcmFtZUNvdW50OyBpKyspIHtcbiAgICAgICAgICBjb25zdCBjbG9uZWRTYW1wbGUgPSBPYmplY3QuYXNzaWduKHt9LCB2aWRlb1NhbXBsZXNbMF0pXG4gICAgICAgICAgY29uc3QgY29tcHV0ZWQgPSBmaXJzdER0cyAtIChpICsgMSkgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG5cbiAgICAgICAgICBjbG9uZWRTYW1wbGUuZHRzID0gY29tcHV0ZWQgPiB0aGlzLm5leHRWaWRlb0R0cyA/IGNvbXB1dGVkIDogdGhpcy5uZXh0VmlkZW9EdHMgLy8g6KGl55qE56ys5LiA5bin5LiA5a6a6KaB5pivbmV4dFZpZGVvRHRzXG4gICAgICAgICAgY2xvbmVkU2FtcGxlLnB0cyA9IGNsb25lZFNhbXBsZS5kdHMgKyBjbG9uZWRTYW1wbGUuY3RzXG5cbiAgICAgICAgICB0aGlzLnZpZGVvVHJhY2suc2FtcGxlcy51bnNoaWZ0KGNsb25lZFNhbXBsZSlcblxuICAgICAgICAgIHRoaXMuZmlsbGVkVmlkZW9TYW1wbGVzLnB1c2goe1xuICAgICAgICAgICAgZHRzOiBjbG9uZWRTYW1wbGUuZHRzLFxuICAgICAgICAgICAgc2l6ZTogY2xvbmVkU2FtcGxlLmRhdGEuYnl0ZUxlbmd0aFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoYWJzR2FwIDw9IG1ldGEucmVmU2FtcGxlRHVyYXRpb24gJiYgYWJzR2FwID4gMCkge1xuICAgICAgICAvLyDlvZPlt67ot53lnKgrLeS4gOW4p+S5i+mXtOaXtuWwhuesrOS4gOW4p+eahGR0c+W8uuihjOWumuS9jeWIsOacn+acm+S9jee9rlxuICAgICAgICAvLyBjb25zb2xlLmxvZygn6YeN5a6a5L2N6KeG6aKR5binZHRzJywgdmlkZW9TYW1wbGVzWzBdLmR0cywgdGhpcy5uZXh0VmlkZW9EdHMpXG4gICAgICAgIHZpZGVvU2FtcGxlc1swXS5kdHMgPSB0aGlzLm5leHRWaWRlb0R0c1xuICAgICAgICB2aWRlb1NhbXBsZXNbMF0ub3JpZ2luRHRzID0gdmlkZW9TYW1wbGVzWzBdLmR0c1xuICAgICAgICB2aWRlb1NhbXBsZXNbMF0uY3RzID0gdmlkZW9TYW1wbGVzWzBdLmN0cyAhPT0gdW5kZWZpbmVkID8gdmlkZW9TYW1wbGVzWzBdLmN0cyA6IHZpZGVvU2FtcGxlc1swXS5wdHMgLSB2aWRlb1NhbXBsZXNbMF0uZHRzXG4gICAgICAgIHZpZGVvU2FtcGxlc1swXS5wdHMgPSB2aWRlb1NhbXBsZXNbMF0uZHRzICsgdmlkZW9TYW1wbGVzWzBdLmN0c1xuICAgICAgfSBlbHNlIGlmIChnYXAgPCAwKSB7XG4gICAgICAgIC8vIOWHuueOsOWkp+eahGdhcFxuICAgICAgICBDb21wYXRpYmlsaXR5LmRvRml4TGFyZ2VHYXAodmlkZW9TYW1wbGVzLCAoLTEgKiBnYXApKVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBsYXN0RHRzID0gdmlkZW9TYW1wbGVzW3ZpZGVvU2FtcGxlcy5sZW5ndGggLSAxXS5kdHM7XG5cbiAgICBjb25zdCBsYXN0U2FtcGxlRHVyYXRpb24gPSB2aWRlb1NhbXBsZXMubGVuZ3RoID49IDIgPyBsYXN0RHRzIC0gdmlkZW9TYW1wbGVzW3ZpZGVvU2FtcGxlcy5sZW5ndGggLSAyXS5kdHMgOiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG5cbiAgICB0aGlzLmxhc3RWaWRlb1NhbXBsZXNMZW4gPSBzYW1wbGVzTGVuXG4gICAgdGhpcy5uZXh0VmlkZW9EdHMgPSBsYXN0RHRzICsgbGFzdFNhbXBsZUR1cmF0aW9uXG4gICAgdGhpcy5sYXN0VmlkZW9EdHMgPSBsYXN0RHRzXG5cbiAgICAvLyBzdGVwMi4g5L+u5aSNc2FtcGxl5q615LmL5YaF55qE6Ze06Led6Zeu6aKYXG4gICAgLy8gc3RlcDMuIOS/ruWkjXNhbXBsZXPmrrXlhoXpg6jnmoRkdHPlvILluLjpl67pophcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdmlkZW9TYW1wbGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50ID0gdmlkZW9TYW1wbGVzW2ldXG4gICAgICBjb25zdCBuZXh0ID0gdmlkZW9TYW1wbGVzW2kgKyAxXVxuXG4gICAgICBpZiAoIW5leHQpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGR1cmF0aW9uID0gbmV4dC5kdHMgLSBjdXJyZW50LmR0cztcblxuICAgICAgaWYgKGR1cmF0aW9uID4gKDIgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSkge1xuICAgICAgICAvLyDkuKTluKfkuYvpl7Tpl7TpmpTlpKrlpKfvvIzpnIDopoHooaXnqbrnmb3luKdcbiAgICAgICAgbGV0IGZpbGxGcmFtZUNvdW50ID0gTWF0aC5mbG9vcihkdXJhdGlvbiAvIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pXG5cbiAgICAgICAgbGV0IGZpbGxGcmFtZUlkeCA9IDBcbiAgICAgICAgd2hpbGUgKGZpbGxGcmFtZUlkeCA8IGZpbGxGcmFtZUNvdW50KSB7XG4gICAgICAgICAgY29uc3QgZmlsbEZyYW1lID0gT2JqZWN0LmFzc2lnbih7fSwgbmV4dClcbiAgICAgICAgICBmaWxsRnJhbWUuZHRzID0gY3VycmVudC5kdHMgKyAoZmlsbEZyYW1lSWR4ICsgMSkgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG4gICAgICAgICAgZmlsbEZyYW1lLnB0cyA9IGZpbGxGcmFtZS5kdHMgKyBmaWxsRnJhbWUuY3RzXG4gICAgICAgICAgaWYgKGZpbGxGcmFtZSA8IG5leHQuZHRzKSB7XG4gICAgICAgICAgICB2aWRlb1NhbXBsZXMuc3BsaWNlKGksIDAsIGZpbGxGcmFtZSlcblxuICAgICAgICAgICAgdGhpcy5maWxsZWRWaWRlb1NhbXBsZXMucHVzaCh7XG4gICAgICAgICAgICAgIGR0czogZmlsbEZyYW1lLmR0cyxcbiAgICAgICAgICAgICAgc2l6ZTogZmlsbEZyYW1lLmRhdGEuYnl0ZUxlbmd0aFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmaWxsRnJhbWVJZHgrK1xuICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudmlkZW9UcmFjay5zYW1wbGVzID0gdmlkZW9TYW1wbGVzO1xuICB9XG5cbiAgZG9GaXhBdWRpbyAoZmlyc3QsIHN0cmVhbUNoYW5nZVN0YXJ0KSB7XG4gICAgbGV0IHtzYW1wbGVzOiBhdWRpb1NhbXBsZXMsIG1ldGF9ID0gdGhpcy5hdWRpb1RyYWNrXG5cbiAgICBpZiAoIWF1ZGlvU2FtcGxlcyB8fCAhYXVkaW9TYW1wbGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKGBhdWRpbyBsYXN0U2FtcGxlLCAke2F1ZGlvU2FtcGxlc1thdWRpb1NhbXBsZXMubGVuZ3RoIC0gMV0uZHRzfWApXG5cbiAgICBjb25zdCBzYW1wbGVzTGVuID0gYXVkaW9TYW1wbGVzLmxlbmd0aDtcbiAgICBjb25zdCBzaWxlbnRGcmFtZSA9IEFBQy5nZXRTaWxlbnRGcmFtZShtZXRhLmNvZGVjLCBtZXRhLmNoYW5uZWxDb3VudClcblxuICAgIGNvbnN0IGZpcnN0U2FtcGxlID0gdGhpcy5fZmlyc3RBdWRpb1NhbXBsZVxuXG4gICAgY29uc3QgX2ZpcnN0U2FtcGxlID0gYXVkaW9TYW1wbGVzWzBdXG4gICAgLy8g5a+5YXVkaW9TYW1wbGVz5oyJ54WnZHRz5YGa5o6S5bqPXG4gICAgLy8gYXVkaW9TYW1wbGVzID0gQ29tcGF0aWJpbGl0eS5zb3J0QXVkaW9TYW1wbGVzKGF1ZGlvU2FtcGxlcylcbiAgICBpZiAodGhpcy5fYXVkaW9MYXJnZUdhcCA+IDApIHtcbiAgICAgIENvbXBhdGliaWxpdHkuZG9GaXhMYXJnZUdhcChhdWRpb1NhbXBsZXMsIHRoaXMuX2F1ZGlvTGFyZ2VHYXApXG4gICAgfVxuXG4gICAgaWYgKF9maXJzdFNhbXBsZS5kdHMgIT09IHRoaXMuX2ZpcnN0QXVkaW9TYW1wbGUuZHRzICYmIChzdHJlYW1DaGFuZ2VTdGFydCB8fCBDb21wYXRpYmlsaXR5LmRldGVjdExhcmdlR2FwKHRoaXMubmV4dEF1ZGlvRHRzLCBfZmlyc3RTYW1wbGUpKSkge1xuICAgICAgaWYgKHN0cmVhbUNoYW5nZVN0YXJ0KSB7XG4gICAgICAgIHRoaXMubmV4dEF1ZGlvRHRzID0gc3RyZWFtQ2hhbmdlU3RhcnQgLy8gRklYOiBIbHPkuK3pgJTliIdjb2RlY++8jOWcqOWmguaenOebtOaOpXNlZWvliLDlkI7pnaLnmoTngrnkvJrlr7zoh7RsYXJnZUdhcOiuoeeul+Wksei0pVxuICAgICAgfVxuICAgICAgdGhpcy5fYXVkaW9MYXJnZUdhcCA9IHRoaXMubmV4dEF1ZGlvRHRzIC0gX2ZpcnN0U2FtcGxlLmR0c1xuICAgICAgQ29tcGF0aWJpbGl0eS5kb0ZpeExhcmdlR2FwKGF1ZGlvU2FtcGxlcywgdGhpcy5fYXVkaW9MYXJnZUdhcClcbiAgICB9XG4gICAgLy8gc3RlcDAuIOmmluW4p+S4jnZpZGVv6aaW5bin6Ze06Led5aSn55qE6Zeu6aKYXG4gICAgaWYgKHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUgJiYgZmlyc3QpIHtcbiAgICAgIGNvbnN0IHZpZGVvRmlyc3RQdHMgPSB0aGlzLl9maXJzdFZpZGVvU2FtcGxlLnB0cyA/IHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUucHRzIDogdGhpcy5fZmlyc3RWaWRlb1NhbXBsZS5kdHMgKyB0aGlzLl9maXJzdFZpZGVvU2FtcGxlLmN0c1xuXG4gICAgICBpZiAoZmlyc3RTYW1wbGUuZHRzIC0gdmlkZW9GaXJzdFB0cyA+IG1ldGEucmVmU2FtcGxlRHVyYXRpb24pIHtcbiAgICAgICAgY29uc3Qgc2lsZW50U2FtcGxlQ291bnQgPSBNYXRoLmZsb29yKChmaXJzdFNhbXBsZS5kdHMgLSB2aWRlb0ZpcnN0UHRzKSAvIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pXG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaWxlbnRTYW1wbGVDb3VudDsgaSsrKSB7XG4gICAgICAgICAgY29uc3Qgc2lsZW50U2FtcGxlID0ge1xuICAgICAgICAgICAgZGF0YTogc2lsZW50RnJhbWUsXG4gICAgICAgICAgICBkYXRhc2l6ZTogc2lsZW50RnJhbWUuYnl0ZUxlbmd0aCxcbiAgICAgICAgICAgIGR0czogZmlyc3RTYW1wbGUuZHRzIC0gKGkgKyAxKSAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb24sXG4gICAgICAgICAgICBmaWx0ZXJlZDogMFxuICAgICAgICAgIH1cblxuICAgICAgICAgIGF1ZGlvU2FtcGxlcy51bnNoaWZ0KHNpbGVudFNhbXBsZSlcblxuICAgICAgICAgIHRoaXMuZmlsbGVkQXVkaW9TYW1wbGVzLnB1c2goe1xuICAgICAgICAgICAgZHRzOiBzaWxlbnRTYW1wbGUuZHRzLFxuICAgICAgICAgICAgc2l6ZTogc2lsZW50U2FtcGxlLmRhdGEuYnl0ZUxlbmd0aFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgZ2FwXG4gICAgY29uc3QgZmlyc3REdHMgPSBhdWRpb1NhbXBsZXNbMF0uZHRzXG5cbiAgICBpZiAodGhpcy5uZXh0QXVkaW9EdHMpIHtcbiAgICAgIC8vIHN0ZXAxLiDlpITnkIZzYW1wbGVz5q615LmL6Ze055qE5Lii5bin5oOF5Ya1XG4gICAgICAvLyDlvZPlj5HnjrBkdXJhdGlvbuW3rui3neWkp+S6jjHluKfml7bov5vooYzooaXluKdcbiAgICAgIGdhcCA9IGZpcnN0RHRzIC0gdGhpcy5uZXh0QXVkaW9EdHNcbiAgICAgIGNvbnN0IGFic0dhcCA9IE1hdGguYWJzKGdhcClcblxuICAgICAgaWYgKGFic0dhcCA+IG1ldGEucmVmU2FtcGxlRHVyYXRpb24gJiYgc2FtcGxlc0xlbiA9PT0gMSAmJiB0aGlzLmxhc3RBdWRpb1NhbXBsZXNMZW4gPT09IDEpIHtcbiAgICAgICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbkZpeGVkID0gdW5kZWZpbmVkXG4gICAgICB9XG5cbiAgICAgIGlmIChnYXAgPiAoMiAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pKSB7XG4gICAgICAgIGlmIChzYW1wbGVzTGVuID09PSAxICYmIHRoaXMubGFzdEF1ZGlvU2FtcGxlc0xlbiA9PT0gMSkge1xuICAgICAgICAgIC8vIOWmguaenHNhbXBsZeeahGxlbmd0aOS4gOebtOaYrzHvvIzogIzkuJTkuIDnm7TkuI3nrKblkIhyZWZTYW1wbGVEdXJhdGlvbu+8jOmcgOimgeWKqOaAgeS/ruaUuXJlZlNhbXBsZUR1cmF0aW9uXG4gICAgICAgICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbkZpeGVkID0gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbkZpeGVkICE9PSB1bmRlZmluZWQgPyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uRml4ZWQgKyBnYXAgOiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uICsgZ2FwXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3Qgc2lsZW50RnJhbWVDb3VudCA9IE1hdGguZmxvb3IoZ2FwIC8gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbilcblxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2lsZW50RnJhbWVDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjb21wdXRlZCA9IGZpcnN0RHRzIC0gKGkgKyAxKSAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb25cbiAgICAgICAgICAgIGNvbnN0IHNpbGVudFNhbXBsZSA9IE9iamVjdC5hc3NpZ24oe30sIGF1ZGlvU2FtcGxlc1swXSwge1xuICAgICAgICAgICAgICBkdHM6IGNvbXB1dGVkID4gdGhpcy5uZXh0QXVkaW9EdHMgPyBjb21wdXRlZCA6IHRoaXMubmV4dEF1ZGlvRHRzXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB0aGlzLmZpbGxlZEF1ZGlvU2FtcGxlcy5wdXNoKHtcbiAgICAgICAgICAgICAgZHRzOiBzaWxlbnRTYW1wbGUuZHRzLFxuICAgICAgICAgICAgICBzaXplOiBzaWxlbnRTYW1wbGUuZGF0YS5ieXRlTGVuZ3RoXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMudW5zaGlmdChzaWxlbnRTYW1wbGUpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGFic0dhcCA8PSBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uICYmIGFic0dhcCA+IDApIHtcbiAgICAgICAgLy8g5b2T5beu6Led5q+U6L6D5bCP55qE5pe25YCZ5bCG6Z+z6aKR5bin6YeN5a6a5L2NXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCfph43lrprkvY3pn7PpopHluKdkdHMnLCBhdWRpb1NhbXBsZXNbMF0uZHRzLCB0aGlzLm5leHRBdWRpb0R0cylcbiAgICAgICAgYXVkaW9TYW1wbGVzWzBdLmR0cyA9IHRoaXMubmV4dEF1ZGlvRHRzXG4gICAgICAgIGF1ZGlvU2FtcGxlc1swXS5wdHMgPSB0aGlzLm5leHRBdWRpb0R0c1xuICAgICAgfSBlbHNlIGlmIChnYXAgPCAwKSB7XG4gICAgICAgIENvbXBhdGliaWxpdHkuZG9GaXhMYXJnZUdhcChhdWRpb1NhbXBsZXMsICgtMSAqIGdhcCkpXG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGxhc3REdHMgPSBhdWRpb1NhbXBsZXNbYXVkaW9TYW1wbGVzLmxlbmd0aCAtIDFdLmR0cztcbiAgICBjb25zdCBsYXN0U2FtcGxlRHVyYXRpb24gPSBhdWRpb1NhbXBsZXMubGVuZ3RoID49IDIgPyBsYXN0RHRzIC0gYXVkaW9TYW1wbGVzW2F1ZGlvU2FtcGxlcy5sZW5ndGggLSAyXS5kdHMgOiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG5cbiAgICB0aGlzLmxhc3RBdWRpb1NhbXBsZXNMZW4gPSBzYW1wbGVzTGVuO1xuICAgIHRoaXMubmV4dEF1ZGlvRHRzID0gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbkZpeGVkID8gbGFzdER0cyArIG1ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZCA6IGxhc3REdHMgKyBsYXN0U2FtcGxlRHVyYXRpb25cbiAgICB0aGlzLmxhc3RBdWRpb0R0cyA9IGxhc3REdHNcblxuICAgIC8vIHN0ZXAzLiDkv67lpI1zYW1wbGVz5q615YaF6YOo55qEZHRz5byC5bi46Zeu6aKYXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGF1ZGlvU2FtcGxlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgY3VycmVudCA9IGF1ZGlvU2FtcGxlc1tpXVxuICAgICAgY29uc3QgbmV4dCA9IGF1ZGlvU2FtcGxlc1tpICsgMV1cblxuICAgICAgaWYgKCFuZXh0KSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkdXJhdGlvbiA9IG5leHQuZHRzIC0gY3VycmVudC5kdHM7XG4gICAgICBhdWRpb1NhbXBsZXNbaV0uZHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICAgIC8qXG4gICAgICBpZiAoZHVyYXRpb24gPiAoMiAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pKSB7XG4gICAgICAgIC8vIOS4pOW4p+S5i+mXtOmXtOmalOWkquWkp++8jOmcgOimgeihpeepuueZveW4p1xuICAgICAgICAvKipcbiAgICAgICAgbGV0IHNpbGVudEZyYW1lQ291bnQgPSBNYXRoLmZsb29yKGR1cmF0aW9uIC8gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbilcbiAgICAgICAgbGV0IGZyYW1lSWR4ID0gMFxuXG4gICAgICAgIHdoaWxlIChmcmFtZUlkeCA8IHNpbGVudEZyYW1lQ291bnQpIHtcbiAgICAgICAgICBjb25zdCBzaWxlbnRTYW1wbGUgPSB7XG4gICAgICAgICAgICBkYXRhOiBzaWxlbnRGcmFtZSxcbiAgICAgICAgICAgIGRhdGFzaXplOiBzaWxlbnRGcmFtZS5ieXRlTGVuZ3RoLFxuICAgICAgICAgICAgZHRzOiBjdXJyZW50LmR0cyArIChmcmFtZUlkeCArIDEpICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbixcbiAgICAgICAgICAgIGZpbHRlcmVkOiAwLFxuICAgICAgICAgICAgaXNTaWxlbnQ6IHRydWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhdWRpb1NhbXBsZXMuc3BsaWNlKGksIDAsIHNpbGVudFNhbXBsZSlcblxuICAgICAgICAgIHRoaXMuZmlsbGVkQXVkaW9TYW1wbGVzLnB1c2goe1xuICAgICAgICAgICAgZHRzOiBzaWxlbnRTYW1wbGUuZHRzLFxuICAgICAgICAgICAgc2l6ZTogc2lsZW50U2FtcGxlLmRhdGEuYnl0ZUxlbmd0aFxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICBmcmFtZUlkeCsrXG4gICAgICAgICAgaSsrIC8vIOS4jeWvuemdmemfs+W4p+WBmuavlOi+g1xuICAgICAgICB9XG4gICAgICB9ICovXG4gICAgfVxuXG4gICAgdGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMgPSBDb21wYXRpYmlsaXR5LnNvcnRBdWRpb1NhbXBsZXMoYXVkaW9TYW1wbGVzKVxuICB9XG5cbiAgZml4Q2hhbmdlU3RyZWFtVmlkZW8gKGNoYW5nZUlkeCkge1xuICAgIGNvbnN0IHsgc2FtcGxlcywgbWV0YSB9ID0gdGhpcy52aWRlb1RyYWNrO1xuICAgIGNvbnN0IHByZXZEdHMgPSBjaGFuZ2VJZHggPT09IDAgPyB0aGlzLmdldFN0cmVhbUNoYW5nZVN0YXJ0KHNhbXBsZXNbMF0pIDogc2FtcGxlc1tjaGFuZ2VJZHggLSAxXS5kdHM7XG4gICAgY29uc3QgY3VyRHRzID0gc2FtcGxlc1tjaGFuZ2VJZHhdLmR0cztcbiAgICBjb25zdCBpc0NvbnRpbnVlID0gTWF0aC5hYnMocHJldkR0cyAtIGN1ckR0cykgPD0gMiAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb247XG5cbiAgICBpZiAoaXNDb250aW51ZSkge1xuICAgICAgaWYgKCFzYW1wbGVzW2NoYW5nZUlkeF0ub3B0aW9ucykge1xuICAgICAgICBzYW1wbGVzW2NoYW5nZUlkeF0ub3B0aW9ucyA9IHtcbiAgICAgICAgICBpc0NvbnRpbnVlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNhbXBsZXNbY2hhbmdlSWR4XS5vcHRpb25zLmlzQ29udGludWUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuZG9GaXhWaWRlbyhmYWxzZSlcbiAgICB9XG5cbiAgICBjb25zdCBmaXJzdFBhcnRTYW1wbGVzID0gc2FtcGxlcy5zbGljZSgwLCBjaGFuZ2VJZHgpO1xuICAgIGNvbnN0IHNlY29uZFBhcnRTYW1wbGVzID0gc2FtcGxlcy5zbGljZShjaGFuZ2VJZHgpO1xuICAgIGNvbnN0IGZpcnN0U2FtcGxlID0gc2FtcGxlc1swXVxuXG4gICAgY29uc3QgY2hhbmdlU2FtcGxlID0gc2Vjb25kUGFydFNhbXBsZXNbMF1cbiAgICBjb25zdCBmaXJzdFBhcnREdXJhdGlvbiA9IGNoYW5nZVNhbXBsZS5kdHMgLSBmaXJzdFNhbXBsZS5kdHNcbiAgICBjb25zdCBzdHJlYW1DaGFuZ2VTdGFydCA9IGZpcnN0U2FtcGxlLm9wdGlvbnMgJiYgZmlyc3RTYW1wbGUub3B0aW9ucy5zdGFydCArIGZpcnN0UGFydER1cmF0aW9uID8gZmlyc3RTYW1wbGUub3B0aW9ucy5zdGFydCA6IG51bGxcblxuICAgIHRoaXMudmlkZW9UcmFjay5zYW1wbGVzID0gc2FtcGxlcy5zbGljZSgwLCBjaGFuZ2VJZHgpO1xuXG4gICAgdGhpcy5kb0ZpeFZpZGVvKGZhbHNlKTtcblxuICAgIHRoaXMudmlkZW9UcmFjay5zYW1wbGVzID0gc2FtcGxlcy5zbGljZShjaGFuZ2VJZHgpO1xuXG4gICAgdGhpcy5kb0ZpeFZpZGVvKGZhbHNlLCBzdHJlYW1DaGFuZ2VTdGFydCk7XG5cbiAgICB0aGlzLnZpZGVvVHJhY2suc2FtcGxlcyA9IGZpcnN0UGFydFNhbXBsZXMuY29uY2F0KHNlY29uZFBhcnRTYW1wbGVzKVxuICB9XG5cbiAgZml4Q2hhbmdlU3RyZWFtQXVkaW8gKGNoYW5nZUlkeCkge1xuICAgIGNvbnN0IHsgc2FtcGxlcywgbWV0YSB9ID0gdGhpcy5hdWRpb1RyYWNrO1xuXG4gICAgY29uc3QgcHJldkR0cyA9IGNoYW5nZUlkeCA9PT0gMCA/IHRoaXMuZ2V0U3RyZWFtQ2hhbmdlU3RhcnQoc2FtcGxlc1swXSkgOiBzYW1wbGVzW2NoYW5nZUlkeCAtIDFdLmR0cztcbiAgICBjb25zdCBjdXJEdHMgPSBzYW1wbGVzW2NoYW5nZUlkeF0uZHRzO1xuICAgIGNvbnN0IGlzQ29udGludWUgPSBNYXRoLmFicyhwcmV2RHRzIC0gY3VyRHRzKSA8PSAyICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbjtcblxuICAgIGlmIChpc0NvbnRpbnVlKSB7XG4gICAgICBpZiAoIXNhbXBsZXNbY2hhbmdlSWR4XS5vcHRpb25zKSB7XG4gICAgICAgIHNhbXBsZXNbY2hhbmdlSWR4XS5vcHRpb25zID0ge1xuICAgICAgICAgIGlzQ29udGludWU6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2FtcGxlc1tjaGFuZ2VJZHhdLm9wdGlvbnMuaXNDb250aW51ZSA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5kb0ZpeEF1ZGlvKGZhbHNlKVxuICAgIH1cblxuICAgIGNvbnN0IGZpcnN0UGFydFNhbXBsZXMgPSBzYW1wbGVzLnNsaWNlKDAsIGNoYW5nZUlkeCk7XG4gICAgY29uc3Qgc2Vjb25kUGFydFNhbXBsZXMgPSBzYW1wbGVzLnNsaWNlKGNoYW5nZUlkeCk7XG4gICAgY29uc3QgZmlyc3RTYW1wbGUgPSBzYW1wbGVzWzBdXG5cbiAgICBjb25zdCBjaGFuZ2VTYW1wbGUgPSBzZWNvbmRQYXJ0U2FtcGxlc1swXVxuICAgIGNvbnN0IGZpcnN0UGFydER1cmF0aW9uID0gY2hhbmdlU2FtcGxlLmR0cyAtIGZpcnN0U2FtcGxlLmR0c1xuICAgIGNvbnN0IHN0cmVhbUNoYW5nZVN0YXJ0ID0gZmlyc3RTYW1wbGUub3B0aW9ucyAmJiBmaXJzdFNhbXBsZS5vcHRpb25zLnN0YXJ0ICsgZmlyc3RQYXJ0RHVyYXRpb24gPyBmaXJzdFNhbXBsZS5vcHRpb25zLnN0YXJ0IDogbnVsbFxuXG4gICAgdGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMgPSBmaXJzdFBhcnRTYW1wbGVzO1xuXG4gICAgdGhpcy5kb0ZpeEF1ZGlvKGZhbHNlKTtcblxuICAgIHRoaXMuYXVkaW9UcmFjay5zYW1wbGVzID0gc2Vjb25kUGFydFNhbXBsZXM7XG5cbiAgICB0aGlzLmRvRml4QXVkaW8oZmFsc2UsIHN0cmVhbUNoYW5nZVN0YXJ0KTtcblxuICAgIHRoaXMuYXVkaW9UcmFjay5zYW1wbGVzID0gZmlyc3RQYXJ0U2FtcGxlcy5jb25jYXQoc2Vjb25kUGFydFNhbXBsZXMpXG4gIH1cblxuICBnZXRGaXJzdFNhbXBsZSAoKSB7XG4gICAgLy8g6I635Y+WdmlkZW/lkoxhdWRpb+eahOmmluW4p+aVsOaNrlxuICAgIGxldCB7c2FtcGxlczogdmlkZW9TYW1wbGVzfSA9IHRoaXMudmlkZW9UcmFja1xuICAgIGxldCB7c2FtcGxlczogYXVkaW9TYW1wbGVzfSA9IHRoaXMuYXVkaW9UcmFja1xuXG4gICAgbGV0IGlzRmlyc3RWaWRlb1NhbXBsZXMgPSBmYWxzZTtcbiAgICBsZXQgaXNGaXJzdEF1ZGlvU2FtcGxlcyA9IGZhbHNlO1xuXG4gICAgaWYgKCF0aGlzLl9maXJzdFZpZGVvU2FtcGxlICYmIHZpZGVvU2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUgPSBDb21wYXRpYmlsaXR5LmZpbmRGaXJzdFZpZGVvU2FtcGxlKHZpZGVvU2FtcGxlcylcbiAgICAgIGlzRmlyc3RWaWRlb1NhbXBsZXMgPSB0cnVlXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9maXJzdEF1ZGlvU2FtcGxlICYmIGF1ZGlvU2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX2ZpcnN0QXVkaW9TYW1wbGUgPSBDb21wYXRpYmlsaXR5LmZpbmRGaXJzdEF1ZGlvU2FtcGxlKGF1ZGlvU2FtcGxlcykgLy8g5a+75om+ZHRz5pyA5bCP55qE5bin5L2c5Li66aaW5Liq6Z+z6aKR5binXG4gICAgICBpc0ZpcnN0QXVkaW9TYW1wbGVzID0gdHJ1ZVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBpc0ZpcnN0VmlkZW9TYW1wbGVzLFxuICAgICAgaXNGaXJzdEF1ZGlvU2FtcGxlc1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDlnKjmsqHmnIlyZWZTYW1wbGVEdXJhdGlvbueahOmXrumimOa1geS4re+8jFxuICAgKi9cbiAgZml4UmVmU2FtcGxlRHVyYXRpb24gKG1ldGEsIHNhbXBsZXMpIHtcbiAgICBjb25zdCBpc1ZpZGVvID0gbWV0YS50eXBlID09PSAndmlkZW8nXG4gICAgY29uc3QgYWxsU2FtcGxlc0NvdW50ID0gaXNWaWRlbyA/IHRoaXMuYWxsVmlkZW9TYW1wbGVzQ291bnQgOiB0aGlzLmFsbEF1ZGlvU2FtcGxlc0NvdW50XG4gICAgY29uc3QgZmlyc3REdHMgPSBpc1ZpZGVvID8gdGhpcy5fZmlyc3RWaWRlb1NhbXBsZS5kdHMgOiB0aGlzLl9maXJzdEF1ZGlvU2FtcGxlLmR0c1xuICAgIGNvbnN0IGZpbGxlZFNhbXBsZXNDb3VudCA9IGlzVmlkZW8gPyB0aGlzLmZpbGxlZFZpZGVvU2FtcGxlcy5sZW5ndGggOiB0aGlzLmZpbGxlZEF1ZGlvU2FtcGxlcy5sZW5ndGhcblxuICAgIGlmICghbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiB8fCBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uIDw9IDAgfHwgTnVtYmVyLmlzTmFOKG1ldGEucmVmU2FtcGxlRHVyYXRpb24pKSB7XG4gICAgICBpZiAoc2FtcGxlcy5sZW5ndGggPj0gMSkge1xuICAgICAgICBjb25zdCBsYXN0RHRzID0gc2FtcGxlc1tzYW1wbGVzLmxlbmd0aCAtIDFdLmR0c1xuXG4gICAgICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb24gPSBNYXRoLmZsb29yKChsYXN0RHRzIC0gZmlyc3REdHMpIC8gKChhbGxTYW1wbGVzQ291bnQgKyBmaWxsZWRTYW1wbGVzQ291bnQpIC0gMSkpOyAvLyDlsIZyZWZTYW1wbGVEdXJhdGlvbumHjee9ruS4uuiuoeeul+WQjueahOW5s+Wdh+WAvFxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobWV0YS5yZWZTYW1wbGVEdXJhdGlvbikge1xuICAgICAgaWYgKHNhbXBsZXMubGVuZ3RoID49IDUpIHtcbiAgICAgICAgY29uc3QgbGFzdER0cyA9IHNhbXBsZXNbc2FtcGxlcy5sZW5ndGggLSAxXS5kdHNcbiAgICAgICAgY29uc3QgZmlyc3REdHMgPSBzYW1wbGVzWzBdLmR0c1xuICAgICAgICBjb25zdCBkdXJhdGlvbkF2ZyA9IChsYXN0RHRzIC0gZmlyc3REdHMpIC8gKHNhbXBsZXMubGVuZ3RoIC0gMSlcblxuICAgICAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uID0gTWF0aC5mbG9vcihNYXRoLmFicyhtZXRhLnJlZlNhbXBsZUR1cmF0aW9uIC0gZHVyYXRpb25BdmcpIDw9IDUgPyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uIDogZHVyYXRpb25BdmcpOyAvLyDlsIZyZWZTYW1wbGVEdXJhdGlvbumHjee9ruS4uuiuoeeul+WQjueahOW5s+Wdh+WAvFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDorrDlvZXmiKrmraLnm67liY3kuIDlhbHmkq3mlL7kuoblpJrlsJHluKdcbiAgICovXG4gIHJlY29yZFNhbXBsZXNDb3VudCAoKSB7XG4gICAgY29uc3QgeyBhdWRpb1RyYWNrLCB2aWRlb1RyYWNrIH0gPSB0aGlzXG5cbiAgICB0aGlzLmFsbEF1ZGlvU2FtcGxlc0NvdW50ICs9IGF1ZGlvVHJhY2suc2FtcGxlcy5sZW5ndGhcbiAgICB0aGlzLmFsbFZpZGVvU2FtcGxlc0NvdW50ICs9IHZpZGVvVHJhY2suc2FtcGxlcy5sZW5ndGhcbiAgfVxuXG4gIC8qKlxuICAgKiDljrvpmaTkuI3lkIjms5XnmoTluKfvvIjlgJLpgIDjgIHph43lpI3luKfvvIlcbiAgICovXG4gIHJlbW92ZUludmFsaWRTYW1wbGVzICgpIHtcbiAgICBjb25zdCB7IF9maXJzdFZpZGVvU2FtcGxlLCBfZmlyc3RBdWRpb1NhbXBsZSB9ID0gdGhpc1xuXG4gICAgdGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMgPSB0aGlzLmF1ZGlvVHJhY2suc2FtcGxlcy5maWx0ZXIoKHNhbXBsZSkgPT4ge1xuICAgICAgcmV0dXJuIHNhbXBsZS5kdHMgPj0gX2ZpcnN0QXVkaW9TYW1wbGUuZHRzICYmICh0aGlzLmxhc3RBdWRpb0R0cyA9PT0gdW5kZWZpbmVkIHx8IHNhbXBsZS5kdHMgPiB0aGlzLmxhc3RBdWRpb0R0cylcbiAgICB9KVxuXG4gICAgdGhpcy52aWRlb1RyYWNrLnNhbXBsZXMgPSB0aGlzLnZpZGVvVHJhY2suc2FtcGxlcy5maWx0ZXIoKHNhbXBsZSkgPT4ge1xuICAgICAgcmV0dXJuIHNhbXBsZS5kdHMgPj0gX2ZpcnN0VmlkZW9TYW1wbGUuZHRzICYmICh0aGlzLmxhc3RWaWRlb0R0cyA9PT0gdW5kZWZpbmVkIHx8IHNhbXBsZS5kdHMgPiB0aGlzLmxhc3RWaWRlb0R0cylcbiAgICB9KVxuICB9XG5cbiAgZ2V0U3RyZWFtQ2hhbmdlU3RhcnQgKHNhbXBsZSkge1xuICAgIGlmIChzYW1wbGUub3B0aW9ucyAmJiBzYW1wbGUub3B0aW9ucy5zdGFydCkge1xuICAgICAgcmV0dXJuIHNhbXBsZS5vcHRpb25zLnN0YXJ0IC0gdGhpcy5kdHNCYXNlO1xuICAgIH1cbiAgICByZXR1cm4gSW5maW5pdHlcbiAgfVxuXG4gIHN0YXRpYyBzb3J0QXVkaW9TYW1wbGVzIChzYW1wbGVzKSB7XG4gICAgaWYgKHNhbXBsZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gc2FtcGxlc1xuICAgIH1cblxuICAgIHJldHVybiBzYW1wbGVzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIHJldHVybiBhLmR0cyAtIGIuZHRzXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiDlr7vmib5kdHPmnIDlsI/nmoRzYW1wbGVcbiAgICogQHBhcmFtIHNhbXBsZXNcbiAgICovXG4gIHN0YXRpYyBmaW5kRmlyc3RBdWRpb1NhbXBsZSAoc2FtcGxlcykge1xuICAgIGlmICghc2FtcGxlcyB8fCBzYW1wbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICByZXR1cm4gQ29tcGF0aWJpbGl0eS5zb3J0QXVkaW9TYW1wbGVzKHNhbXBsZXMpWzBdXG4gIH1cblxuICBzdGF0aWMgZmluZEZpcnN0VmlkZW9TYW1wbGUgKHNhbXBsZXMpIHtcbiAgICBpZiAoIXNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIGNvbnN0IHNvcnRlZCA9IHNhbXBsZXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgcmV0dXJuIGEuZHRzIC0gYi5kdHM7XG4gICAgfSlcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzb3J0ZWQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChzb3J0ZWRbaV0uaXNLZXlmcmFtZSkge1xuICAgICAgICByZXR1cm4gc29ydGVkW2ldXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGRldGVjdExhcmdlR2FwIChuZXh0RHRzLCBmaXJzdFNhbXBsZSkge1xuICAgIGlmIChuZXh0RHRzID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGN1ckR0cyA9IGZpcnN0U2FtcGxlLmR0cyB8fCAwXG4gICAgY29uc3QgY29uZDEgPSBuZXh0RHRzIC0gY3VyRHRzID49IDEwMDAgfHwgY3VyRHRzIC0gbmV4dER0cyA+PSAxMDAwIC8vIGZpeCBobHPmtYHlh7rnjrDlpKfph4/mtYFkdHPpl7Tot53pl67pophcbiAgICBjb25zdCBjb25kMiA9IGZpcnN0U2FtcGxlLm9wdGlvbnMgJiYgZmlyc3RTYW1wbGUub3B0aW9ucy5kaXNjb250aW51ZVxuXG4gICAgcmV0dXJuIGNvbmQxIHx8IGNvbmQyXG4gIH1cblxuICBzdGF0aWMgZG9GaXhMYXJnZUdhcCAoc2FtcGxlcywgZ2FwKSB7XG4gICAgY29uc29sZS5sb2coJ2ZpeCBsYXJnZSBnYXAnKVxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzYW1wbGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb25zdCBzYW1wbGUgPSBzYW1wbGVzW2ldO1xuICAgICAgc2FtcGxlLmR0cyArPSBnYXBcbiAgICAgIGlmIChzYW1wbGUucHRzKSB7XG4gICAgICAgIHNhbXBsZS5wdHMgKz0gZ2FwXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOS4remAlOaNoua1gVxuICAgKi9cbiAgc3RhdGljIGRldGFjdENoYW5nZVN0cmVhbSAoc2FtcGxlcykge1xuICAgIGxldCBjaGFuZ2VkID0gZmFsc2U7XG4gICAgbGV0IGNoYW5nZWRJZHggPSAtMTtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc2FtcGxlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKHNhbXBsZXNbaV0ub3B0aW9ucyAmJiBzYW1wbGVzW2ldLm9wdGlvbnMubWV0YSkge1xuICAgICAgICBjaGFuZ2VkID0gdHJ1ZVxuICAgICAgICBjaGFuZ2VkSWR4ID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNoYW5nZWQsXG4gICAgICBjaGFuZ2VkSWR4XG4gICAgfVxuICB9XG5cbiAgZ2V0IHRyYWNrcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpXG4gIH1cblxuICBnZXQgYXVkaW9UcmFjayAoKSB7XG4gICAgaWYgKHRoaXMudHJhY2tzKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmFja3MuYXVkaW9UcmFja1xuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgZ2V0IHZpZGVvVHJhY2sgKCkge1xuICAgIGlmICh0aGlzLnRyYWNrcykge1xuICAgICAgcmV0dXJuIHRoaXMudHJhY2tzLnZpZGVvVHJhY2tcbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIGdldCBkdHNCYXNlICgpIHtcbiAgICBjb25zdCByZW11eGVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnTVA0X1JFTVVYRVInKTtcbiAgICBpZiAocmVtdXhlcikge1xuICAgICAgcmV0dXJuIHJlbXV4ZXIuX2R0c0Jhc2VcbiAgICB9XG4gICAgcmV0dXJuIDBcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQ29tcGF0aWJpbGl0eTtcbiIsImNsYXNzIEdvbG9tYiB7XG4gIGNvbnN0cnVjdG9yICh1aW50OGFycmF5KSB7XG4gICAgdGhpcy5UQUcgPSAnR29sb21iJ1xuICAgIHRoaXMuX2J1ZmZlciA9IHVpbnQ4YXJyYXlcbiAgICB0aGlzLl9idWZmZXJJbmRleCA9IDBcbiAgICB0aGlzLl90b3RhbEJ5dGVzID0gdWludDhhcnJheS5ieXRlTGVuZ3RoXG4gICAgdGhpcy5fdG90YWxCaXRzID0gdWludDhhcnJheS5ieXRlTGVuZ3RoICogOFxuICAgIHRoaXMuX2N1cnJlbnRXb3JkID0gMFxuICAgIHRoaXMuX2N1cnJlbnRXb3JkQml0c0xlZnQgPSAwXG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLl9idWZmZXIgPSBudWxsXG4gIH1cblxuICBfZmlsbEN1cnJlbnRXb3JkICgpIHtcbiAgICBsZXQgYnVmZmVyQnl0ZXNMZWZ0ID0gdGhpcy5fdG90YWxCeXRlcyAtIHRoaXMuX2J1ZmZlckluZGV4XG4gICAgaWYgKGJ1ZmZlckJ5dGVzTGVmdCA8PSAwKSB7XG4gICAgICAvLyBUT0RPIOW8guW4uOWkhOeQhlxuICAgIH1cblxuICAgIGxldCBieXRlc1JlYWQgPSBNYXRoLm1pbig0LCBidWZmZXJCeXRlc0xlZnQpXG4gICAgbGV0IHdvcmQgPSBuZXcgVWludDhBcnJheSg0KVxuICAgIHdvcmQuc2V0KHRoaXMuX2J1ZmZlci5zdWJhcnJheSh0aGlzLl9idWZmZXJJbmRleCwgdGhpcy5fYnVmZmVySW5kZXggKyBieXRlc1JlYWQpKVxuICAgIHRoaXMuX2N1cnJlbnRXb3JkID0gbmV3IERhdGFWaWV3KHdvcmQuYnVmZmVyKS5nZXRVaW50MzIoMClcblxuICAgIHRoaXMuX2J1ZmZlckluZGV4ICs9IGJ5dGVzUmVhZFxuICAgIHRoaXMuX2N1cnJlbnRXb3JkQml0c0xlZnQgPSBieXRlc1JlYWQgKiA4XG4gIH1cblxuICByZWFkQml0cyAoc2l6ZSkge1xuICAgIGxldCBiaXRzID0gTWF0aC5taW4odGhpcy5fY3VycmVudFdvcmRCaXRzTGVmdCwgc2l6ZSk7Ly8gOnVpbnRcbiAgICBsZXQgdmFsdSA9IHRoaXMuX2N1cnJlbnRXb3JkID4+PiAoMzIgLSBiaXRzKTtcbiAgICBpZiAoc2l6ZSA+IDMyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCByZWFkIG1vcmUgdGhhbiAzMiBiaXRzIGF0IGEgdGltZScpO1xuICAgIH1cbiAgICB0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0IC09IGJpdHM7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRXb3JkQml0c0xlZnQgPiAwKSB7XG4gICAgICB0aGlzLl9jdXJyZW50V29yZCA8PD0gYml0cztcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3RvdGFsQnl0ZXMgLSB0aGlzLl9idWZmZXJJbmRleCA+IDApIHtcbiAgICAgIHRoaXMuX2ZpbGxDdXJyZW50V29yZCgpO1xuICAgIH1cblxuICAgIGJpdHMgPSBzaXplIC0gYml0cztcbiAgICBpZiAoYml0cyA+IDAgJiYgdGhpcy5fY3VycmVudFdvcmRCaXRzTGVmdCkge1xuICAgICAgcmV0dXJuIHZhbHUgPDwgYml0cyB8IHRoaXMucmVhZEJpdHMoYml0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWx1O1xuICAgIH1cbiAgfVxuXG4gIHJlYWRCb29sICgpIHtcbiAgICByZXR1cm4gdGhpcy5yZWFkQml0cygxKSA9PT0gMVxuICB9XG5cbiAgcmVhZEJ5dGUgKCkge1xuICAgIHJldHVybiB0aGlzLnJlYWRCaXRzKDgpXG4gIH1cblxuICBfc2tpcExlYWRpbmdaZXJvICgpIHtcbiAgICBsZXQgemVyb0NvdW50XG4gICAgZm9yICh6ZXJvQ291bnQgPSAwOyB6ZXJvQ291bnQgPCB0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0OyB6ZXJvQ291bnQrKykge1xuICAgICAgaWYgKCh0aGlzLl9jdXJyZW50V29yZCAmICgweDgwMDAwMDAwID4+PiB6ZXJvQ291bnQpKSAhPT0gMCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50V29yZCA8PD0gemVyb0NvdW50XG4gICAgICAgIHRoaXMuX2N1cnJlbnRXb3JkQml0c0xlZnQgLT0gemVyb0NvdW50XG4gICAgICAgIHJldHVybiB6ZXJvQ291bnRcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fZmlsbEN1cnJlbnRXb3JkKClcbiAgICByZXR1cm4gemVyb0NvdW50ICsgdGhpcy5fc2tpcExlYWRpbmdaZXJvKClcbiAgfVxuXG4gIHJlYWRVRUcgKCkgeyAvLyB1bnNpZ25lZCBleHBvbmVudGlhbCBnb2xvbWJcbiAgICBsZXQgbGVhZGluZ1plcm9zID0gdGhpcy5fc2tpcExlYWRpbmdaZXJvKClcbiAgICByZXR1cm4gdGhpcy5yZWFkQml0cyhsZWFkaW5nWmVyb3MgKyAxKSAtIDFcbiAgfVxuXG4gIHJlYWRTRUcgKCkgeyAvLyBzaWduZWQgZXhwb25lbnRpYWwgZ29sb21iXG4gICAgbGV0IHZhbHVlID0gdGhpcy5yZWFkVUVHKClcbiAgICBpZiAodmFsdWUgJiAweDAxKSB7XG4gICAgICByZXR1cm4gKHZhbHVlICsgMSkgPj4+IDFcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIC0xICogKHZhbHVlID4+PiAxKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHb2xvbWJcbiIsImltcG9ydCBTcHNQYXJzZXIgZnJvbSAnLi9zcHMnO1xuY2xhc3MgTmFsdW5pdCB7XG4gIHN0YXRpYyBnZXROYWx1bml0cyAoYnVmZmVyKSB7XG4gICAgaWYgKGJ1ZmZlci5sZW5ndGggLSBidWZmZXIucG9zaXRpb24gPCA0KSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgbGV0IGJ1ZiA9IGJ1ZmZlci5kYXRhdmlldztcbiAgICBsZXQgcG9zaXRpb24gPSBidWZmZXIucG9zaXRpb247XG4gICAgaWYgKGJ1Zi5nZXRJbnQzMihwb3NpdGlvbikgPT09IDEgfHxcbiAgICAoYnVmLmdldEludDE2KHBvc2l0aW9uKSA9PT0gMCAmJiBidWYuZ2V0SW50OChwb3NpdGlvbiArIDIpID09PSAxKSkge1xuICAgICAgcmV0dXJuIE5hbHVuaXQuZ2V0QW5uZXhiTmFscyhidWZmZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTmFsdW5pdC5nZXRBdmNjTmFscyhidWZmZXIpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRBbm5leGJOYWxzIChidWZmZXIpIHtcbiAgICBsZXQgbmFscyA9IFtdO1xuICAgIGxldCBwb3NpdGlvbiA9IE5hbHVuaXQuZ2V0SGVhZGVyUG9zaXRpb25Bbm5leEIoYnVmZmVyKTtcbiAgICBsZXQgc3RhcnQgPSBwb3NpdGlvbi5wb3M7XG4gICAgbGV0IGVuZCA9IHN0YXJ0O1xuICAgIHdoaWxlIChzdGFydCA8IGJ1ZmZlci5sZW5ndGggLSA0KSB7XG4gICAgICBsZXQgaGVhZGVyID0gYnVmZmVyLmJ1ZmZlci5zbGljZShzdGFydCwgc3RhcnQgKyBwb3NpdGlvbi5oZWFkZXJMZW5ndGgpO1xuICAgICAgaWYgKHBvc2l0aW9uLnBvcyA9PT0gYnVmZmVyLnBvc2l0aW9uKSB7XG4gICAgICAgIGJ1ZmZlci5za2lwKHBvc2l0aW9uLmhlYWRlckxlbmd0aCk7XG4gICAgICB9XG4gICAgICBwb3NpdGlvbiA9IE5hbHVuaXQuZ2V0SGVhZGVyUG9zaXRpb25Bbm5leEIoYnVmZmVyKTtcbiAgICAgIGVuZCA9IHBvc2l0aW9uLnBvcztcbiAgICAgIGxldCBib2R5ID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyLmJ1ZmZlci5zbGljZShzdGFydCArIGhlYWRlci5ieXRlTGVuZ3RoLCBlbmQpKTtcbiAgICAgIGxldCB1bml0ID0ge2hlYWRlciwgYm9keX07XG4gICAgICBOYWx1bml0LmFuYWx5c2VOYWwodW5pdCk7XG4gICAgICBuYWxzLnB1c2godW5pdCk7XG4gICAgICBidWZmZXIuc2tpcChlbmQgLSBidWZmZXIucG9zaXRpb24pO1xuICAgICAgc3RhcnQgPSBlbmQ7XG4gICAgfVxuICAgIHJldHVybiBuYWxzO1xuICB9XG5cbiAgc3RhdGljIGdldEF2Y2NOYWxzIChidWZmZXIpIHtcbiAgICBsZXQgbmFscyA9IFtdO1xuICAgIHdoaWxlIChidWZmZXIucG9zaXRpb24gPCBidWZmZXIubGVuZ3RoIC0gNCkge1xuICAgICAgbGV0IGxlbmd0aCA9IGJ1ZmZlci5kYXRhdmlldy5nZXRJbnQzMihidWZmZXIucG9zaXRpb24pO1xuICAgICAgaWYgKGJ1ZmZlci5sZW5ndGggLSBidWZmZXIucG9zaXRpb24gPj0gbGVuZ3RoKSB7XG4gICAgICAgIGxldCBoZWFkZXIgPSBidWZmZXIuYnVmZmVyLnNsaWNlKGJ1ZmZlci5wb3NpdGlvbiwgYnVmZmVyLnBvc2l0aW9uICsgNCk7XG4gICAgICAgIGJ1ZmZlci5za2lwKDQpXG4gICAgICAgIGxldCBib2R5ID0gYnVmZmVyLmJ1ZmZlci5zbGljZShidWZmZXIucG9zaXRpb24sIGJ1ZmZlci5wb3NpdGlvbiArIGxlbmd0aCk7XG4gICAgICAgIGJ1ZmZlci5za2lwKGxlbmd0aCk7XG4gICAgICAgIGxldCB1bml0ID0ge2hlYWRlciwgYm9keX07XG4gICAgICAgIE5hbHVuaXQuYW5hbHlzZU5hbCh1bml0KTtcbiAgICAgICAgbmFscy5wdXNoKHVuaXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuYWxzO1xuICB9XG5cbiAgc3RhdGljIGFuYWx5c2VOYWwgKHVuaXQpIHtcbiAgICBsZXQgdHlwZSA9IHVuaXQuYm9keVswXSAmIDB4MWY7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIC8vIE5EUlxuICAgICAgICB1bml0Lm5kciA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA1OlxuICAgICAgICAvLyBJRFJcbiAgICAgICAgdW5pdC5pZHIgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNjpcbiAgICAgICAgLy8gU0VJXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA3OlxuICAgICAgICAvLyBTUFNcbiAgICAgICAgdW5pdC5zcHMgPSBTcHNQYXJzZXIucGFyc2VTUFModW5pdC5ib2R5KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDg6XG4gICAgICAgIC8vIFBQU1xuICAgICAgICB1bml0LnBwcyA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA5OlxuICAgICAgICAvLyBBVURcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0SGVhZGVyUG9zaXRpb25Bbm5leEIgKGJ1ZmZlcikge1xuICAgIC8vIHNlcGVyYXRlXG4gICAgbGV0IHBvcyA9IGJ1ZmZlci5wb3NpdGlvbjtcbiAgICBsZXQgaGVhZGVyTGVuZ3RoID0gMDtcbiAgICB3aGlsZSAoaGVhZGVyTGVuZ3RoICE9PSAzICYmIGhlYWRlckxlbmd0aCAhPT0gNCAmJiBwb3MgPCBidWZmZXIubGVuZ3RoIC0gNCkge1xuICAgICAgaWYgKGJ1ZmZlci5kYXRhdmlldy5nZXRJbnQxNihwb3MpID09PSAwKSB7XG4gICAgICAgIGlmIChidWZmZXIuZGF0YXZpZXcuZ2V0SW50MTYocG9zICsgMikgPT09IDEpIHtcbiAgICAgICAgICAvLyAweDAwMDAwMVxuICAgICAgICAgIGhlYWRlckxlbmd0aCA9IDQ7XG4gICAgICAgIH0gZWxzZSBpZiAoYnVmZmVyLmRhdGF2aWV3LmdldEludDgocG9zICsgMikgPT09IDEpIHtcbiAgICAgICAgICBoZWFkZXJMZW5ndGggPSAzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBvcysrO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwb3MrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zID09PSBidWZmZXIubGVuZ3RoIC0gNCkge1xuICAgICAgaWYgKGJ1ZmZlci5kYXRhdmlldy5nZXRJbnQxNihwb3MpID09PSAwKSB7XG4gICAgICAgIGlmIChidWZmZXIuZGF0YXZpZXcuZ2V0SW50MTYocG9zICsgMikgPT09IDEpIHtcbiAgICAgICAgICAvLyAweDAwMDAwMVxuICAgICAgICAgIGhlYWRlckxlbmd0aCA9IDQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBvcysrO1xuICAgICAgICBpZiAoYnVmZmVyLmRhdGF2aWV3LmdldEludDE2KHBvcykgPT09IDAgJiYgYnVmZmVyLmRhdGF2aWV3LmdldEludDgocG9zKSA9PT0gMSkge1xuICAgICAgICAgIC8vIDB4MDAwMDAwMVxuICAgICAgICAgIGhlYWRlckxlbmd0aCA9IDM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcG9zID0gYnVmZmVyLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge3BvcywgaGVhZGVyTGVuZ3RofTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRBdmNjIChzcHMsIHBwcykge1xuICAgIGxldCByZXQgPSBuZXcgVWludDhBcnJheShzcHMuYnl0ZUxlbmd0aCArIHBwcy5ieXRlTGVuZ3RoICsgMTEpO1xuICAgIHJldFswXSA9IDB4MDE7XG4gICAgcmV0WzFdID0gc3BzWzFdO1xuICAgIHJldFsyXSA9IHNwc1syXTtcbiAgICByZXRbM10gPSBzcHNbM107XG4gICAgcmV0WzRdID0gMjU1O1xuICAgIHJldFs1XSA9IDIyNTtcblxuICAgIGxldCBvZmZzZXQgPSA2O1xuXG4gICAgcmV0LnNldChuZXcgVWludDhBcnJheShbKHNwcy5ieXRlTGVuZ3RoID4+PiA4KSAmIDB4ZmYsIHNwcy5ieXRlTGVuZ3RoICYgMHhmZl0pLCBvZmZzZXQpO1xuICAgIG9mZnNldCArPSAyO1xuICAgIHJldC5zZXQoc3BzLCBvZmZzZXQpO1xuICAgIG9mZnNldCArPSBzcHMuYnl0ZUxlbmd0aDtcblxuICAgIHJldFtvZmZzZXRdID0gMTtcbiAgICBvZmZzZXQrKztcblxuICAgIHJldC5zZXQobmV3IFVpbnQ4QXJyYXkoWyhwcHMuYnl0ZUxlbmd0aCA+Pj4gOCkgJiAweGZmLCBwcHMuYnl0ZUxlbmd0aCAmIDB4ZmZdKSwgb2Zmc2V0KTtcbiAgICBvZmZzZXQgKz0gMjtcbiAgICByZXQuc2V0KHBwcywgb2Zmc2V0KTtcbiAgICByZXR1cm4gcmV0O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5hbHVuaXQ7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgICovXG4vKiBlc2xpbnQtZGlzYWJsZSBvbmUtdmFyICAqL1xuaW1wb3J0IEdvbG9tYiBmcm9tICcuL2dvbG9tYidcblxuY2xhc3MgU1BTUGFyc2VyIHtcbiAgc3RhdGljIF9lYnNwMnJic3AgKHVpbnQ4YXJyYXkpIHtcbiAgICBsZXQgc3JjID0gdWludDhhcnJheVxuICAgIGxldCBzcmNMZW5ndGggPSBzcmMuYnl0ZUxlbmd0aFxuICAgIGxldCBkc3QgPSBuZXcgVWludDhBcnJheShzcmNMZW5ndGgpXG4gICAgbGV0IGRzdElkeCA9IDBcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3JjTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpID49IDIpIHtcbiAgICAgICAgaWYgKHNyY1tpXSA9PT0gMHgwMyAmJiBzcmNbaSAtIDFdID09PSAweDAwICYmIHNyY1tpIC0gMl0gPT09IDB4MDApIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBkc3RbZHN0SWR4XSA9IHNyY1tpXVxuICAgICAgZHN0SWR4KytcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZHN0LmJ1ZmZlciwgMCwgZHN0SWR4KVxuICB9XG5cbiAgc3RhdGljIHBhcnNlU1BTICh1aW50OGFycmF5KSB7XG4gICAgbGV0IHJic3AgPSBTUFNQYXJzZXIuX2Vic3AycmJzcCh1aW50OGFycmF5KVxuICAgIGxldCBnYiA9IG5ldyBHb2xvbWIocmJzcClcblxuICAgIGdiLnJlYWRCeXRlKClcbiAgICBsZXQgcHJvZmlsZUlkYyA9IGdiLnJlYWRCeXRlKClcbiAgICBnYi5yZWFkQnl0ZSgpXG4gICAgbGV0IGxldmVsSWRjID0gZ2IucmVhZEJ5dGUoKVxuICAgIGdiLnJlYWRVRUcoKVxuXG4gICAgbGV0IHByb2ZpbGVfc3RyaW5nID0gU1BTUGFyc2VyLmdldFByb2ZpbGVTdHJpbmcocHJvZmlsZUlkYylcbiAgICBsZXQgbGV2ZWxfc3RyaW5nID0gU1BTUGFyc2VyLmdldExldmVsU3RyaW5nKGxldmVsSWRjKVxuICAgIGxldCBjaHJvbWFfZm9ybWF0X2lkYyA9IDFcbiAgICBsZXQgY2hyb21hX2Zvcm1hdCA9IDQyMFxuICAgIGxldCBjaHJvbWFfZm9ybWF0X3RhYmxlID0gWzAsIDQyMCwgNDIyLCA0NDRdXG4gICAgbGV0IGJpdF9kZXB0aCA9IDhcblxuICAgIGlmIChwcm9maWxlSWRjID09PSAxMDAgfHwgcHJvZmlsZUlkYyA9PT0gMTEwIHx8IHByb2ZpbGVJZGMgPT09IDEyMiB8fFxuICAgICAgcHJvZmlsZUlkYyA9PT0gMjQ0IHx8IHByb2ZpbGVJZGMgPT09IDQ0IHx8IHByb2ZpbGVJZGMgPT09IDgzIHx8XG4gICAgICBwcm9maWxlSWRjID09PSA4NiB8fCBwcm9maWxlSWRjID09PSAxMTggfHwgcHJvZmlsZUlkYyA9PT0gMTI4IHx8XG4gICAgICBwcm9maWxlSWRjID09PSAxMzggfHwgcHJvZmlsZUlkYyA9PT0gMTQ0KSB7XG4gICAgICBjaHJvbWFfZm9ybWF0X2lkYyA9IGdiLnJlYWRVRUcoKVxuICAgICAgaWYgKGNocm9tYV9mb3JtYXRfaWRjID09PSAzKSB7XG4gICAgICAgIGdiLnJlYWRCaXRzKDEpXG4gICAgICB9XG4gICAgICBpZiAoY2hyb21hX2Zvcm1hdF9pZGMgPD0gMykge1xuICAgICAgICBjaHJvbWFfZm9ybWF0ID0gY2hyb21hX2Zvcm1hdF90YWJsZVtjaHJvbWFfZm9ybWF0X2lkY11cbiAgICAgIH1cblxuICAgICAgYml0X2RlcHRoID0gZ2IucmVhZFVFRygpICsgOFxuICAgICAgZ2IucmVhZFVFRygpXG4gICAgICBnYi5yZWFkQml0cygxKVxuICAgICAgaWYgKGdiLnJlYWRCb29sKCkpIHtcbiAgICAgICAgbGV0IHNjYWxpbmdfbGlzdF9jb3VudCA9IChjaHJvbWFfZm9ybWF0X2lkYyAhPT0gMykgPyA4IDogMTJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY2FsaW5nX2xpc3RfY291bnQ7IGkrKykge1xuICAgICAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgICAgICBpZiAoaSA8IDYpIHtcbiAgICAgICAgICAgICAgU1BTUGFyc2VyLl9za2lwU2NhbGluZ0xpc3QoZ2IsIDE2KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgU1BTUGFyc2VyLl9za2lwU2NhbGluZ0xpc3QoZ2IsIDY0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBnYi5yZWFkVUVHKClcbiAgICBsZXQgcGljX29yZGVyX2NudF90eXBlID0gZ2IucmVhZFVFRygpXG4gICAgaWYgKHBpY19vcmRlcl9jbnRfdHlwZSA9PT0gMCkge1xuICAgICAgZ2IucmVhZFVFRygpXG4gICAgfSBlbHNlIGlmIChwaWNfb3JkZXJfY250X3R5cGUgPT09IDEpIHtcbiAgICAgIGdiLnJlYWRCaXRzKDEpXG4gICAgICBnYi5yZWFkU0VHKClcbiAgICAgIGdiLnJlYWRTRUcoKVxuICAgICAgbGV0IG51bV9yZWZfZnJhbWVzX2luX3BpY19vcmRlcl9jbnRfY3ljbGUgPSBnYi5yZWFkVUVHKClcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtX3JlZl9mcmFtZXNfaW5fcGljX29yZGVyX2NudF9jeWNsZTsgaSsrKSB7XG4gICAgICAgIGdiLnJlYWRTRUcoKVxuICAgICAgfVxuICAgIH1cbiAgICBnYi5yZWFkVUVHKClcbiAgICBnYi5yZWFkQml0cygxKVxuXG4gICAgbGV0IHBpY193aWR0aF9pbl9tYnNfbWludXMxID0gZ2IucmVhZFVFRygpXG4gICAgbGV0IHBpY19oZWlnaHRfaW5fbWFwX3VuaXRzX21pbnVzMSA9IGdiLnJlYWRVRUcoKVxuXG4gICAgbGV0IGZyYW1lX21ic19vbmx5X2ZsYWcgPSBnYi5yZWFkQml0cygxKVxuICAgIGlmIChmcmFtZV9tYnNfb25seV9mbGFnID09PSAwKSB7XG4gICAgICBnYi5yZWFkQml0cygxKVxuICAgIH1cbiAgICBnYi5yZWFkQml0cygxKVxuXG4gICAgbGV0IGZyYW1lX2Nyb3BfbGVmdF9vZmZzZXQgPSAwXG4gICAgbGV0IGZyYW1lX2Nyb3BfcmlnaHRfb2Zmc2V0ID0gMFxuICAgIGxldCBmcmFtZV9jcm9wX3RvcF9vZmZzZXQgPSAwXG4gICAgbGV0IGZyYW1lX2Nyb3BfYm90dG9tX29mZnNldCA9IDBcblxuICAgIGxldCBmcmFtZV9jcm9wcGluZ19mbGFnID0gZ2IucmVhZEJvb2woKVxuICAgIGlmIChmcmFtZV9jcm9wcGluZ19mbGFnKSB7XG4gICAgICBmcmFtZV9jcm9wX2xlZnRfb2Zmc2V0ID0gZ2IucmVhZFVFRygpXG4gICAgICBmcmFtZV9jcm9wX3JpZ2h0X29mZnNldCA9IGdiLnJlYWRVRUcoKVxuICAgICAgZnJhbWVfY3JvcF90b3Bfb2Zmc2V0ID0gZ2IucmVhZFVFRygpXG4gICAgICBmcmFtZV9jcm9wX2JvdHRvbV9vZmZzZXQgPSBnYi5yZWFkVUVHKClcbiAgICB9XG5cbiAgICBsZXQgcGFyX3dpZHRoID0gMSwgcGFyX2hlaWdodCA9IDFcbiAgICBsZXQgZnBzID0gMCwgZnBzX2ZpeGVkID0gdHJ1ZSwgZnBzX251bSA9IDAsIGZwc19kZW4gPSAwXG5cbiAgICBsZXQgdnVpX3BhcmFtZXRlcnNfcHJlc2VudF9mbGFnID0gZ2IucmVhZEJvb2woKVxuICAgIGlmICh2dWlfcGFyYW1ldGVyc19wcmVzZW50X2ZsYWcpIHtcbiAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7IC8vIGFzcGVjdF9yYXRpb19pbmZvX3ByZXNlbnRfZmxhZ1xuICAgICAgICBsZXQgYXNwZWN0X3JhdGlvX2lkYyA9IGdiLnJlYWRCeXRlKClcbiAgICAgICAgbGV0IHBhcl93X3RhYmxlID0gWzEsIDEyLCAxMCwgMTYsIDQwLCAyNCwgMjAsIDMyLCA4MCwgMTgsIDE1LCA2NCwgMTYwLCA0LCAzLCAyXVxuICAgICAgICBsZXQgcGFyX2hfdGFibGUgPSBbMSwgMTEsIDExLCAxMSwgMzMsIDExLCAxMSwgMTEsIDMzLCAxMSwgMTEsIDMzLCA5OSwgMywgMiwgMV1cblxuICAgICAgICBpZiAoYXNwZWN0X3JhdGlvX2lkYyA+IDAgJiYgYXNwZWN0X3JhdGlvX2lkYyA8IDE2KSB7XG4gICAgICAgICAgcGFyX3dpZHRoID0gcGFyX3dfdGFibGVbYXNwZWN0X3JhdGlvX2lkYyAtIDFdXG4gICAgICAgICAgcGFyX2hlaWdodCA9IHBhcl9oX3RhYmxlW2FzcGVjdF9yYXRpb19pZGMgLSAxXVxuICAgICAgICB9IGVsc2UgaWYgKGFzcGVjdF9yYXRpb19pZGMgPT09IDI1NSkge1xuICAgICAgICAgIHBhcl93aWR0aCA9IGdiLnJlYWRCeXRlKCkgPDwgOCB8IGdiLnJlYWRCeXRlKClcbiAgICAgICAgICBwYXJfaGVpZ2h0ID0gZ2IucmVhZEJ5dGUoKSA8PCA4IHwgZ2IucmVhZEJ5dGUoKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgIGdiLnJlYWRCb29sKClcbiAgICAgIH1cbiAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgIGdiLnJlYWRCaXRzKDQpXG4gICAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgICAgZ2IucmVhZEJpdHMoMjQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgIGdiLnJlYWRVRUcoKVxuICAgICAgICBnYi5yZWFkVUVHKClcbiAgICAgIH1cbiAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgIGxldCBudW1fdW5pdHNfaW5fdGljayA9IGdiLnJlYWRCaXRzKDMyKVxuICAgICAgICBsZXQgdGltZV9zY2FsZSA9IGdiLnJlYWRCaXRzKDMyKVxuICAgICAgICBmcHNfZml4ZWQgPSBnYi5yZWFkQm9vbCgpXG5cbiAgICAgICAgZnBzX251bSA9IHRpbWVfc2NhbGVcbiAgICAgICAgZnBzX2RlbiA9IG51bV91bml0c19pbl90aWNrICogMlxuICAgICAgICBmcHMgPSBmcHNfbnVtIC8gZnBzX2RlblxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBwYXJTY2FsZSA9IDFcbiAgICBpZiAocGFyX3dpZHRoICE9PSAxIHx8IHBhcl9oZWlnaHQgIT09IDEpIHtcbiAgICAgIHBhclNjYWxlID0gcGFyX3dpZHRoIC8gcGFyX2hlaWdodFxuICAgIH1cblxuICAgIGxldCBjcm9wX3VuaXRfeCA9IDAsIGNyb3BfdW5pdF95ID0gMFxuICAgIGlmIChjaHJvbWFfZm9ybWF0X2lkYyA9PT0gMCkge1xuICAgICAgY3JvcF91bml0X3ggPSAxXG4gICAgICBjcm9wX3VuaXRfeSA9IDIgLSBmcmFtZV9tYnNfb25seV9mbGFnXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBzdWJfd2MgPSAoY2hyb21hX2Zvcm1hdF9pZGMgPT09IDMpID8gMSA6IDJcbiAgICAgIGxldCBzdWJfaGMgPSAoY2hyb21hX2Zvcm1hdF9pZGMgPT09IDEpID8gMiA6IDFcbiAgICAgIGNyb3BfdW5pdF94ID0gc3ViX3djXG4gICAgICBjcm9wX3VuaXRfeSA9IHN1Yl9oYyAqICgyIC0gZnJhbWVfbWJzX29ubHlfZmxhZylcbiAgICB9XG5cbiAgICBsZXQgY29kZWNfd2lkdGggPSAocGljX3dpZHRoX2luX21ic19taW51czEgKyAxKSAqIDE2XG4gICAgbGV0IGNvZGVjX2hlaWdodCA9ICgyIC0gZnJhbWVfbWJzX29ubHlfZmxhZykgKiAoKHBpY19oZWlnaHRfaW5fbWFwX3VuaXRzX21pbnVzMSArIDEpICogMTYpXG5cbiAgICBjb2RlY193aWR0aCAtPSAoZnJhbWVfY3JvcF9sZWZ0X29mZnNldCArIGZyYW1lX2Nyb3BfcmlnaHRfb2Zmc2V0KSAqIGNyb3BfdW5pdF94XG4gICAgY29kZWNfaGVpZ2h0IC09IChmcmFtZV9jcm9wX3RvcF9vZmZzZXQgKyBmcmFtZV9jcm9wX2JvdHRvbV9vZmZzZXQpICogY3JvcF91bml0X3lcblxuICAgIGxldCBwcmVzZW50X3dpZHRoID0gTWF0aC5jZWlsKGNvZGVjX3dpZHRoICogcGFyU2NhbGUpXG5cbiAgICBnYi5kZXN0cm95KClcbiAgICBnYiA9IG51bGxcblxuICAgIHJldHVybiB7XG4gICAgICBwcm9maWxlX3N0cmluZzogcHJvZmlsZV9zdHJpbmcsXG4gICAgICBsZXZlbF9zdHJpbmc6IGxldmVsX3N0cmluZyxcbiAgICAgIGJpdF9kZXB0aDogYml0X2RlcHRoLFxuICAgICAgY2hyb21hX2Zvcm1hdDogY2hyb21hX2Zvcm1hdCxcbiAgICAgIGNocm9tYV9mb3JtYXRfc3RyaW5nOiBTUFNQYXJzZXIuZ2V0Q2hyb21hRm9ybWF0U3RyaW5nKGNocm9tYV9mb3JtYXQpLFxuXG4gICAgICBmcmFtZV9yYXRlOiB7XG4gICAgICAgIGZpeGVkOiBmcHNfZml4ZWQsXG4gICAgICAgIGZwczogZnBzLFxuICAgICAgICBmcHNfZGVuOiBmcHNfZGVuLFxuICAgICAgICBmcHNfbnVtOiBmcHNfbnVtXG4gICAgICB9LFxuXG4gICAgICBwYXJfcmF0aW86IHtcbiAgICAgICAgd2lkdGg6IHBhcl93aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBwYXJfaGVpZ2h0XG4gICAgICB9LFxuXG4gICAgICBjb2RlY19zaXplOiB7XG4gICAgICAgIHdpZHRoOiBjb2RlY193aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBjb2RlY19oZWlnaHRcbiAgICAgIH0sXG5cbiAgICAgIHByZXNlbnRfc2l6ZToge1xuICAgICAgICB3aWR0aDogcHJlc2VudF93aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBjb2RlY19oZWlnaHRcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgX3NraXBTY2FsaW5nTGlzdCAoZ2IsIGNvdW50KSB7XG4gICAgbGV0IGxhc3Rfc2NhbGUgPSA4LCBuZXh0X3NjYWxlID0gOFxuICAgIGxldCBkZWx0YV9zY2FsZSA9IDBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgIGlmIChuZXh0X3NjYWxlICE9PSAwKSB7XG4gICAgICAgIGRlbHRhX3NjYWxlID0gZ2IucmVhZFNFRygpXG4gICAgICAgIG5leHRfc2NhbGUgPSAobGFzdF9zY2FsZSArIGRlbHRhX3NjYWxlICsgMjU2KSAlIDI1NlxuICAgICAgfVxuICAgICAgbGFzdF9zY2FsZSA9IChuZXh0X3NjYWxlID09PSAwKSA/IGxhc3Rfc2NhbGUgOiBuZXh0X3NjYWxlXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldFByb2ZpbGVTdHJpbmcgKHByb2ZpbGVJZGMpIHtcbiAgICBzd2l0Y2ggKHByb2ZpbGVJZGMpIHtcbiAgICAgIGNhc2UgNjY6XG4gICAgICAgIHJldHVybiAnQmFzZWxpbmUnXG4gICAgICBjYXNlIDc3OlxuICAgICAgICByZXR1cm4gJ01haW4nXG4gICAgICBjYXNlIDg4OlxuICAgICAgICByZXR1cm4gJ0V4dGVuZGVkJ1xuICAgICAgY2FzZSAxMDA6XG4gICAgICAgIHJldHVybiAnSGlnaCdcbiAgICAgIGNhc2UgMTEwOlxuICAgICAgICByZXR1cm4gJ0hpZ2gxMCdcbiAgICAgIGNhc2UgMTIyOlxuICAgICAgICByZXR1cm4gJ0hpZ2g0MjInXG4gICAgICBjYXNlIDI0NDpcbiAgICAgICAgcmV0dXJuICdIaWdoNDQ0J1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICdVbmtub3duJ1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRMZXZlbFN0cmluZyAobGV2ZWxJZGMpIHtcbiAgICByZXR1cm4gKGxldmVsSWRjIC8gMTApLnRvRml4ZWQoMSlcbiAgfVxuXG4gIHN0YXRpYyBnZXRDaHJvbWFGb3JtYXRTdHJpbmcgKGNocm9tYSkge1xuICAgIHN3aXRjaCAoY2hyb21hKSB7XG4gICAgICBjYXNlIDQyMDpcbiAgICAgICAgcmV0dXJuICc0OjI6MCdcbiAgICAgIGNhc2UgNDIyOlxuICAgICAgICByZXR1cm4gJzQ6MjoyJ1xuICAgICAgY2FzZSA0NDQ6XG4gICAgICAgIHJldHVybiAnNDo0OjQnXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ1Vua25vd24nXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHRvVmlkZW9NZXRhIChzcHNDb25maWcpIHtcbiAgICBsZXQgbWV0YSA9IHt9XG4gICAgaWYgKHNwc0NvbmZpZyAmJiBzcHNDb25maWcuY29kZWNfc2l6ZSkge1xuICAgICAgbWV0YS5jb2RlY1dpZHRoID0gc3BzQ29uZmlnLmNvZGVjX3NpemUud2lkdGhcbiAgICAgIG1ldGEuY29kZWNIZWlnaHQgPSBzcHNDb25maWcuY29kZWNfc2l6ZS5oZWlnaHRcbiAgICAgIG1ldGEucHJlc2VudFdpZHRoID0gc3BzQ29uZmlnLnByZXNlbnRfc2l6ZS53aWR0aFxuICAgICAgbWV0YS5wcmVzZW50SGVpZ2h0ID0gc3BzQ29uZmlnLnByZXNlbnRfc2l6ZS5oZWlnaHRcbiAgICB9XG5cbiAgICBtZXRhLnByb2ZpbGUgPSBzcHNDb25maWcucHJvZmlsZV9zdHJpbmdcbiAgICBtZXRhLmxldmVsID0gc3BzQ29uZmlnLmxldmVsX3N0cmluZ1xuICAgIG1ldGEuYml0RGVwdGggPSBzcHNDb25maWcuYml0X2RlcHRoXG4gICAgbWV0YS5jaHJvbWFGb3JtYXQgPSBzcHNDb25maWcuY2hyb21hX2Zvcm1hdFxuXG4gICAgbWV0YS5wYXJSYXRpbyA9IHtcbiAgICAgIHdpZHRoOiBzcHNDb25maWcucGFyX3JhdGlvLndpZHRoLFxuICAgICAgaGVpZ2h0OiBzcHNDb25maWcucGFyX3JhdGlvLmhlaWdodFxuICAgIH1cblxuICAgIG1ldGEuZnJhbWVSYXRlID0gc3BzQ29uZmlnLmZyYW1lX3JhdGVcblxuICAgIGxldCBmcHNEZW4gPSBtZXRhLmZyYW1lUmF0ZS5mcHNfZGVuXG4gICAgbGV0IGZwc051bSA9IG1ldGEuZnJhbWVSYXRlLmZwc19udW1cbiAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uID0gTWF0aC5mbG9vcihtZXRhLnRpbWVzY2FsZSAqIChmcHNEZW4gLyBmcHNOdW0pKVxuICAgIHJldHVybiBtZXRhO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNQU1BhcnNlclxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIEhMU1xuICBNM1U4UGFyc2VyOiByZXF1aXJlKCcuL3NyYy9obHMvZGVtdXhlci9tM3U4cGFyc2VyJykuZGVmYXVsdCxcbiAgVHNEZW11eGVyOiByZXF1aXJlKCcuL3NyYy9obHMvZGVtdXhlci90cycpLmRlZmF1bHQsXG4gIFBsYXlsaXN0OiByZXF1aXJlKCcuL3NyYy9obHMvcGxheWxpc3QnKS5kZWZhdWx0LFxuICBGbHZEZW11eGVyOiByZXF1aXJlKCcuL3NyYy9mbHYvaW5kZXgnKS5kZWZhdWx0XG59O1xuIiwiaW1wb3J0IHsgaXNMZSwgVVRGOCB9IGZyb20gJ3hncGxheWVyLXV0aWxzJ1xuXG5jb25zdCBEQVRBX1RZUEVTID0ge1xuICBOVU1CRVI6IDAsXG4gIEJPT0xFQU46IDEsXG4gIFNUUklORzogMixcbiAgT0JKRUNUOiAzLFxuICBNSVhfQVJSQVk6IDgsXG4gIE9CSkVDVF9FTkQ6IDksXG4gIFNUUklDVF9BUlJBWTogMTAsXG4gIERBVEU6IDExLFxuICBMT05FX1NUUklORzogMTJcbn1cblxuLyoqXG4gKiBtZXRh5L+h5oGv6Kej5p6QXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFNRlBhcnNlciB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgICB0aGlzLnJlYWRPZmZzZXQgPSB0aGlzLm9mZnNldFxuICB9XG5cbiAgcmVzb2x2ZSAobWV0YSwgc2l6ZSkge1xuICAgIGlmIChzaXplIDwgMykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3QgZW5vdWdoIGRhdGEgZm9yIG1ldGFpbmZvJylcbiAgICB9XG4gICAgY29uc3QgbWV0YURhdGEgPSB7fVxuICAgIGNvbnN0IG5hbWUgPSB0aGlzLnBhcnNlVmFsdWUobWV0YSlcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMucGFyc2VWYWx1ZShtZXRhLCBzaXplIC0gbmFtZS5ib2R5U2l6ZSlcbiAgICBtZXRhRGF0YVtuYW1lLmRhdGFdID0gdmFsdWUuZGF0YVxuXG4gICAgdGhpcy5yZXNldFN0YXR1cygpXG4gICAgcmV0dXJuIG1ldGFEYXRhXG4gIH1cblxuICByZXNldFN0YXR1cyAoKSB7XG4gICAgdGhpcy5vZmZzZXQgPSAwXG4gICAgdGhpcy5yZWFkT2Zmc2V0ID0gdGhpcy5vZmZzZXRcbiAgfVxuXG4gIHBhcnNlU3RyaW5nIChidWZmZXIpIHtcbiAgICBjb25zdCBkdiA9IG5ldyBEYXRhVmlldyhidWZmZXIsIHRoaXMucmVhZE9mZnNldClcbiAgICBjb25zdCBzdHJMZW4gPSBkdi5nZXRVaW50MTYoMCwgIWlzTGUpXG4gICAgbGV0IHN0ciA9ICcnXG4gICAgaWYgKHN0ckxlbiA+IDApIHtcbiAgICAgIHN0ciA9IFVURjguZGVjb2RlKG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgdGhpcy5yZWFkT2Zmc2V0ICsgMiwgc3RyTGVuKSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gJydcbiAgICB9XG4gICAgbGV0IHNpemUgPSBzdHJMZW4gKyAyXG4gICAgdGhpcy5yZWFkT2Zmc2V0ICs9IHNpemVcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogc3RyLFxuICAgICAgYm9keVNpemU6IHN0ckxlbiArIDJcbiAgICB9XG4gIH1cblxuICBwYXJzZURhdGUgKGJ1ZmZlciwgc2l6ZSkge1xuICAgIGNvbnN0IGR2ID0gbmV3IERhdGFWaWV3KGJ1ZmZlciwgdGhpcy5yZWFkT2Zmc2V0LCBzaXplKVxuICAgIGxldCB0cyA9IGR2LmdldEZsb2F0NjQoMCwgIWlzTGUpXG4gICAgY29uc3QgdGltZU9mZnNldCA9IGR2LmdldEludDE2KDgsICFpc0xlKVxuICAgIHRzICs9IHRpbWVPZmZzZXQgKiA2MCAqIDEwMDBcblxuICAgIHRoaXMucmVhZE9mZnNldCArPSAxMFxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBuZXcgRGF0ZSh0cyksXG4gICAgICBib2R5U2l6ZTogMTBcbiAgICB9XG4gIH1cblxuICBwYXJzZU9iamVjdCAoYnVmZmVyLCBzaXplKSB7XG4gICAgY29uc3QgbmFtZSA9IHRoaXMucGFyc2VTdHJpbmcoYnVmZmVyLCBzaXplKVxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5wYXJzZVZhbHVlKGJ1ZmZlciwgc2l6ZSAtIG5hbWUuYm9keVNpemUpXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgbmFtZTogbmFtZS5kYXRhLFxuICAgICAgICB2YWx1ZTogdmFsdWUuZGF0YVxuICAgICAgfSxcbiAgICAgIGJvZHlTaXplOiBuYW1lLmJvZHlTaXplICsgdmFsdWUuYm9keVNpemUsXG4gICAgICBpc09iakVuZDogdmFsdWUuaXNPYmpFbmRcbiAgICB9XG4gIH1cblxuICBwYXJzZUxvbmdTdHJpbmcgKGJ1ZmZlcikge1xuICAgIGNvbnN0IGR2ID0gbmV3IERhdGFWaWV3KGJ1ZmZlciwgdGhpcy5yZWFkT2Zmc2V0KVxuICAgIGNvbnN0IHN0ckxlbiA9IGR2LmdldFVpbnQzMigwLCAhaXNMZSlcbiAgICBsZXQgc3RyID0gJydcbiAgICBpZiAoc3RyTGVuID4gMCkge1xuICAgICAgc3RyID0gVVRGOC5kZWNvZGUobmV3IFVpbnQ4QXJyYXkoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQgKyAyLCBzdHJMZW4pKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSAnJ1xuICAgIH1cbiAgICAvLyBjb25zdCBzaXplID0gc3RyTGVuICsgNDtcbiAgICB0aGlzLnJlYWRPZmZzZXQgKz0gc3RyTGVuICsgNFxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBzdHIsXG4gICAgICBib2R5U2l6ZTogc3RyTGVuICsgNFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDop6PmnpBtZXRh5Lit55qE5Y+Y6YePXG4gICAqL1xuICBwYXJzZVZhbHVlIChkYXRhLCBzaXplKSB7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcigpXG4gICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgYnVmZmVyID0gZGF0YVxuICAgIH0gZWxzZSB7XG4gICAgICBidWZmZXIgPSBkYXRhLmJ1ZmZlclxuICAgIH1cbiAgICBjb25zdCB7XG4gICAgICBOVU1CRVIsXG4gICAgICBCT09MRUFOLFxuICAgICAgU1RSSU5HLFxuICAgICAgT0JKRUNULFxuICAgICAgTUlYX0FSUkFZLFxuICAgICAgT0JKRUNUX0VORCxcbiAgICAgIFNUUklDVF9BUlJBWSxcbiAgICAgIERBVEUsXG4gICAgICBMT05FX1NUUklOR1xuICAgIH0gPSBEQVRBX1RZUEVTXG4gICAgY29uc3QgZGF0YVZpZXcgPSBuZXcgRGF0YVZpZXcoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQsIHNpemUpXG4gICAgbGV0IGlzT2JqRW5kID0gZmFsc2VcbiAgICBjb25zdCB0eXBlID0gZGF0YVZpZXcuZ2V0VWludDgoMClcbiAgICBsZXQgb2Zmc2V0ID0gMVxuICAgIHRoaXMucmVhZE9mZnNldCArPSAxXG4gICAgbGV0IHZhbHVlID0gbnVsbFxuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIE5VTUJFUjoge1xuICAgICAgICB2YWx1ZSA9IGRhdGFWaWV3LmdldEZsb2F0NjQoMSwgIWlzTGUpXG4gICAgICAgIHRoaXMucmVhZE9mZnNldCArPSA4XG4gICAgICAgIG9mZnNldCArPSA4XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjYXNlIEJPT0xFQU46IHtcbiAgICAgICAgY29uc3QgYm9vbE51bSA9IGRhdGFWaWV3LmdldFVpbnQ4KDEpXG4gICAgICAgIHZhbHVlID0gISFib29sTnVtXG4gICAgICAgIHRoaXMucmVhZE9mZnNldCArPSAxXG4gICAgICAgIG9mZnNldCArPSAxXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjYXNlIFNUUklORzoge1xuICAgICAgICBjb25zdCBzdHIgPSB0aGlzLnBhcnNlU3RyaW5nKGJ1ZmZlcilcbiAgICAgICAgdmFsdWUgPSBzdHIuZGF0YVxuICAgICAgICBvZmZzZXQgKz0gc3RyLmJvZHlTaXplXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjYXNlIE9CSkVDVDoge1xuICAgICAgICB2YWx1ZSA9IHt9XG4gICAgICAgIGxldCBvYmpFbmRTaXplID0gMFxuICAgICAgICBpZiAoZGF0YVZpZXcuZ2V0VWludDMyKHNpemUgLSA0LCAhaXNMZSkgJiAweDAwRkZGRkZGKSB7XG4gICAgICAgICAgb2JqRW5kU2l6ZSA9IDNcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzLnJlYWRPZmZzZXQgKz0gb2Zmc2V0IC0gMTtcbiAgICAgICAgd2hpbGUgKG9mZnNldCA8IHNpemUgLSA0KSB7XG4gICAgICAgICAgY29uc3QgYW1mT2JqID0gdGhpcy5wYXJzZU9iamVjdChidWZmZXIsIHNpemUgLSBvZmZzZXQgLSBvYmpFbmRTaXplKVxuICAgICAgICAgIGlmIChhbWZPYmouaXNPYmplY3RFbmQpIHsgYnJlYWsgfVxuICAgICAgICAgIHZhbHVlW2FtZk9iai5kYXRhLm5hbWVdID0gYW1mT2JqLmRhdGEudmFsdWVcbiAgICAgICAgICBvZmZzZXQgKz0gYW1mT2JqLmJvZHlTaXplXG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9mZnNldCA8PSBzaXplIC0gMykge1xuICAgICAgICAgIGNvbnN0IG1hcmsgPSBkYXRhVmlldy5nZXRVaW50MzIob2Zmc2V0IC0gMSwgIWlzTGUpICYgMHgwMEZGRkZGRlxuICAgICAgICAgIGlmIChtYXJrID09PSA5KSB7XG4gICAgICAgICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gM1xuICAgICAgICAgICAgb2Zmc2V0ICs9IDNcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGNhc2UgTUlYX0FSUkFZOiB7XG4gICAgICAgIHZhbHVlID0ge31cbiAgICAgICAgb2Zmc2V0ICs9IDRcbiAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDRcbiAgICAgICAgbGV0IG9iakVuZFNpemUgPSAwXG4gICAgICAgIGlmICgoZGF0YVZpZXcuZ2V0VWludDMyKHNpemUgLSA0LCAhaXNMZSkgJiAweDAwRkZGRkZGKSA9PT0gOSkge1xuICAgICAgICAgIG9iakVuZFNpemUgPSAzXG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAob2Zmc2V0IDwgc2l6ZSAtIDgpIHtcbiAgICAgICAgICBjb25zdCBhbWZWYXIgPSB0aGlzLnBhcnNlT2JqZWN0KGJ1ZmZlciwgc2l6ZSAtIG9mZnNldCAtIG9iakVuZFNpemUpXG4gICAgICAgICAgaWYgKGFtZlZhci5pc09iamVjdEVuZCkgeyBicmVhayB9XG4gICAgICAgICAgdmFsdWVbYW1mVmFyLmRhdGEubmFtZV0gPSBhbWZWYXIuZGF0YS52YWx1ZVxuICAgICAgICAgIG9mZnNldCArPSBhbWZWYXIuYm9keVNpemVcbiAgICAgICAgfVxuICAgICAgICBpZiAob2Zmc2V0IDw9IHNpemUgLSAzKSB7XG4gICAgICAgICAgY29uc3QgbWFya2VyID0gZGF0YVZpZXcuZ2V0VWludDMyKG9mZnNldCAtIDEsICFpc0xlKSAmIDB4MDBGRkZGRkZcbiAgICAgICAgICBpZiAobWFya2VyID09PSA5KSB7XG4gICAgICAgICAgICBvZmZzZXQgKz0gM1xuICAgICAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDNcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgY2FzZSBPQkpFQ1RfRU5EOiB7XG4gICAgICAgIHZhbHVlID0gbnVsbFxuICAgICAgICBpc09iakVuZCA9IHRydWVcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgY2FzZSBTVFJJQ1RfQVJSQVk6IHtcbiAgICAgICAgdmFsdWUgPSBbXVxuICAgICAgICBjb25zdCBhcnJMZW5ndGggPSBkYXRhVmlldy5nZXRVaW50MzIoMSwgIWlzTGUpXG4gICAgICAgIG9mZnNldCArPSA0XG4gICAgICAgIHRoaXMucmVhZE9mZnNldCArPSA0XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBzY3JpcHQgPSB0aGlzLnBhcnNlVmFsdWUoYnVmZmVyLCBzaXplIC0gb2Zmc2V0KVxuICAgICAgICAgIHZhbHVlLnB1c2goc2NyaXB0LmRhdGEpXG4gICAgICAgICAgb2Zmc2V0ICs9IHNjcmlwdC5ib2R5U2l6ZVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGNhc2UgREFURToge1xuICAgICAgICBjb25zdCBkYXRlID0gdGhpcy5wYXJzZURhdGUoYnVmZmVyLCBzaXplIC0gMSlcbiAgICAgICAgdmFsdWUgPSBkYXRlLmRhdGFcbiAgICAgICAgb2Zmc2V0ICs9IGRhdGUuYm9keVNpemVcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgY2FzZSBMT05FX1NUUklORzoge1xuICAgICAgICBjb25zdCBsb25nU3RyID0gdGhpcy5wYXJzZUxvbmdTdHJpbmcoYnVmZmVyLCBzaXplIC0gMSlcbiAgICAgICAgdmFsdWUgPSBsb25nU3RyLmRhdGFcbiAgICAgICAgb2Zmc2V0ICs9IGxvbmdTdHIuYm9keVNpemVcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBvZmZzZXQgPSBzaXplXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IHZhbHVlLFxuICAgICAgYm9keVNpemU6IG9mZnNldCxcbiAgICAgIGlzT2JqRW5kOiBpc09iakVuZFxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgRVZFTlRTLCBBdWRpb1RyYWNrTWV0YSwgVmlkZW9UcmFja01ldGEgfSBmcm9tICd4Z3BsYXllci11dGlscyc7XG5pbXBvcnQgeyBTcHNQYXJzZXIgfSBmcm9tICd4Z3BsYXllci1jb2RlYyc7XG5pbXBvcnQgeyBWaWRlb1RyYWNrLCBBdWRpb1RyYWNrIH0gZnJvbSAneGdwbGF5ZXItYnVmZmVyJ1xuXG5pbXBvcnQgQU1GUGFyc2VyIGZyb20gJy4vYW1mLXBhcnNlcidcblxuY29uc3QgREVNVVhfRVZFTlRTID0gRVZFTlRTLkRFTVVYX0VWRU5UUztcblxuY2xhc3MgRmx2RGVtdXhlciB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLl9maXJzdEZyYWdtZW50TG9hZGVkID0gZmFsc2VcbiAgICB0aGlzLl90cmFja051bSA9IDBcbiAgICB0aGlzLl9oYXNTY3JpcHQgPSBmYWxzZVxuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgdGhpcy5vbihERU1VWF9FVkVOVFMuREVNVVhfU1RBUlQsIHRoaXMuZG9QYXJzZUZsdi5iaW5kKHRoaXMpKVxuICB9XG5cbiAgLyoqXG4gICAqIGlmIHRoZSBmbHYgaGVhZCBpcyB2YWxpZFxuICAgKiBAcGFyYW0gZGF0YVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHN0YXRpYyBpc0ZsdkZpbGUgKGRhdGEpIHtcbiAgICByZXR1cm4gIShkYXRhWzBdICE9PSAweDQ2IHx8IGRhdGFbMV0gIT09IDB4NEMgfHwgZGF0YVsyXSAhPT0gMHg1NiB8fCBkYXRhWzNdICE9PSAweDAxKVxuICB9XG5cbiAgLyoqXG4gICAqIElmIHRoZSBzdHJlYW0gaGFzIGF1ZGlvIG9yIHZpZGVvLlxuICAgKiBAcGFyYW0ge251bWJlcn0gc3RyZWFtRmxhZyAtIERhdGEgZnJvbSB0aGUgc3RyZWFtIHdoaWNoIGlzIGRlZmluZSB3aGV0aGVyIHRoZSBhdWRpbyAvIHZpZGVvIHRyYWNrIGlzIGV4aXN0LlxuICAgKi9cbiAgc3RhdGljIGdldFBsYXlUeXBlIChzdHJlYW1GbGFnKSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgaGFzVmlkZW86IGZhbHNlLFxuICAgICAgaGFzQXVkaW86IGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKHN0cmVhbUZsYWcgJiAweDAxID4gMCkge1xuICAgICAgcmVzdWx0Lmhhc1ZpZGVvID0gdHJ1ZVxuICAgIH1cblxuICAgIGlmIChzdHJlYW1GbGFnICYgMHgwNCA+IDApIHtcbiAgICAgIHJlc3VsdC5oYXNBdWRpbyA9IHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICBkb1BhcnNlRmx2ICgpIHtcbiAgICBpZiAoIXRoaXMuX2ZpcnN0RnJhZ21lbnRMb2FkZWQpIHtcbiAgICAgIGlmICh0aGlzLmxvYWRlckJ1ZmZlci5sZW5ndGggPCAxMykge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IGhlYWRlciA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDEzKVxuICAgICAgdGhpcy5wYXJzZUZsdkhlYWRlcihoZWFkZXIpXG4gICAgICB0aGlzLmRvUGFyc2VGbHYoKSAvLyDpgJLlvZLosIPnlKjvvIznu6fnu63op6PmnpBmbHbmtYFcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMubG9hZGVyQnVmZmVyLmxlbmd0aCA8IDExKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgbGV0IGNodW5rO1xuXG4gICAgICBsZXQgbG9vcE1heCA9IDEwMDAwMCAvLyDpmLLmraLmrbvlvqrnjq/kuqfnlJ9cbiAgICAgIGRvIHtcbiAgICAgICAgY2h1bmsgPSB0aGlzLl9wYXJzZUZsdlRhZygpXG4gICAgICB9IHdoaWxlIChjaHVuayAmJiBsb29wTWF4LS0gPiAwKVxuXG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0NPTVBMRVRFKVxuICAgIH1cbiAgfVxuXG4gIHBhcnNlRmx2SGVhZGVyIChoZWFkZXIpIHtcbiAgICBpZiAoIUZsdkRlbXV4ZXIuaXNGbHZGaWxlKGhlYWRlcikpIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIG5ldyBFcnJvcignaW52YWxpZCBmbHYgZmlsZScpKVxuICAgICAgdGhpcy5kb1BhcnNlRmx2KClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZmlyc3RGcmFnbWVudExvYWRlZCA9IHRydWVcbiAgICAgIGNvbnN0IHBsYXlUeXBlID0gRmx2RGVtdXhlci5nZXRQbGF5VHlwZShoZWFkZXJbNF0pXG5cbiAgICAgIGlmIChwbGF5VHlwZS5oYXNWaWRlbykge1xuICAgICAgICB0aGlzLmluaXRWaWRlb1RyYWNrKClcbiAgICAgIH1cblxuICAgICAgaWYgKHBsYXlUeXBlLmhhc0F1ZGlvKSB7XG4gICAgICAgIHRoaXMuaW5pdEF1ZGlvVHJhY2soKVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmRvUGFyc2VGbHYoKVxuICB9XG5cbiAgLyoqXG4gICAqIGluaXQgZGVmYXVsdCB2aWRlbyB0cmFjayBjb25maWdzXG4gICAqL1xuICBpbml0VmlkZW9UcmFjayAoKSB7XG4gICAgdGhpcy5fdHJhY2tOdW0rK1xuICAgIGxldCB2aWRlb1RyYWNrID0gbmV3IFZpZGVvVHJhY2soKVxuICAgIHZpZGVvVHJhY2subWV0YSA9IG5ldyBWaWRlb1RyYWNrTWV0YSgpXG4gICAgdmlkZW9UcmFjay5pZCA9IHZpZGVvVHJhY2subWV0YS5pZCA9IHRoaXMuX3RyYWNrTnVtXG5cbiAgICB0aGlzLnRyYWNrcy52aWRlb1RyYWNrID0gdmlkZW9UcmFja1xuICB9XG5cbiAgLyoqXG4gICAqIGluaXQgZGVmYXVsdCBhdWRpbyB0cmFjayBjb25maWdzXG4gICAqL1xuICBpbml0QXVkaW9UcmFjayAoKSB7XG4gICAgdGhpcy5fdHJhY2tOdW0rK1xuICAgIGxldCBhdWRpb1RyYWNrID0gbmV3IEF1ZGlvVHJhY2soKVxuICAgIGF1ZGlvVHJhY2subWV0YSA9IG5ldyBBdWRpb1RyYWNrTWV0YSgpXG4gICAgYXVkaW9UcmFjay5pZCA9IGF1ZGlvVHJhY2subWV0YS5pZCA9IHRoaXMuX3RyYWNrTnVtXG5cbiAgICB0aGlzLnRyYWNrcy5hdWRpb1RyYWNrID0gYXVkaW9UcmFja1xuICB9XG5cbiAgLyoqXG4gICAqIFBhY2thZ2UgdGhlIGRhdGEgYXMgdGhlIGZvbGxvd2luZyBkYXRhIHN0cnVjdHVyZVxuICAgKiB7XG4gICAqICAgIGRhdGE6IFVpbnQ4QXJyYXkuIHRoZSBTdHJlYW0gZGF0YS5cbiAgICogICAgaW5mbzogVGhlIGZpcnN0IGJ5dGUgaW5mbyBvZiB0aGUgVGFnLlxuICAgKiAgICB0YWdUeXBlOiA444CBOeOAgTE4XG4gICAqICAgIHRpbWVTdGFtcDogdGhlIHRpbWVzdGVtcFxuICAgKiB9XG4gICAqL1xuICBfcGFyc2VGbHZUYWcgKCkge1xuICAgIGlmICh0aGlzLmxvYWRlckJ1ZmZlci5sZW5ndGggPCAxMSkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgbGV0IGNodW5rID0gdGhpcy5fcGFyc2VGbHZUYWdIZWFkZXIoKVxuICAgIGlmIChjaHVuaykge1xuICAgICAgdGhpcy5fcHJvY2Vzc0NodW5rKGNodW5rKVxuICAgIH1cbiAgICByZXR1cm4gY2h1bmtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZSB0aGUgMTEgYnl0ZSB0YWcgSGVhZGVyXG4gICAqL1xuICBfcGFyc2VGbHZUYWdIZWFkZXIgKCkge1xuICAgIGxldCBvZmZzZXQgPSAwXG4gICAgbGV0IGNodW5rID0ge31cblxuICAgIGxldCB0YWdUeXBlID0gdGhpcy5sb2FkZXJCdWZmZXIudG9JbnQob2Zmc2V0LCAxKVxuICAgIG9mZnNldCArPSAxXG5cbiAgICAvLyAyIGJpdCBGTVMgcmVzZXJ2ZWQsIDEgYml0IGZpbHRlcmVkLCA1IGJpdCB0YWcgdHlwZVxuICAgIGNodW5rLmZpbHRlcmVkID0gKHRhZ1R5cGUgJiAzMikgPj4+IDVcbiAgICBjaHVuay50YWdUeXBlID0gdGFnVHlwZSAmIDMxXG5cbiAgICAvLyAzIEJ5dGUgZGF0YXNpemVcbiAgICBjaHVuay5kYXRhc2l6ZSA9IHRoaXMubG9hZGVyQnVmZmVyLnRvSW50KG9mZnNldCwgMylcbiAgICBvZmZzZXQgKz0gM1xuXG4gICAgaWYgKChjaHVuay50YWdUeXBlICE9PSA4ICYmIGNodW5rLnRhZ1R5cGUgIT09IDkgJiYgY2h1bmsudGFnVHlwZSAhPT0gMTEgJiYgY2h1bmsudGFnVHlwZSAhPT0gMTgpIHx8XG4gICAgICB0aGlzLmxvYWRlckJ1ZmZlci50b0ludCg4LCAzKSAhPT0gMCkge1xuICAgICAgaWYgKHRoaXMubG9hZGVyQnVmZmVyICYmIHRoaXMubG9hZGVyQnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMSlcbiAgICAgIH1cbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIHRoaXMuVEFHLCBuZXcgRXJyb3IoJ3RhZ1R5cGUgJyArIGNodW5rLnRhZ1R5cGUpLCBmYWxzZSlcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgaWYgKHRoaXMubG9hZGVyQnVmZmVyLmxlbmd0aCA8IGNodW5rLmRhdGFzaXplICsgMTUpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgLy8gcmVhZCB0aGUgZGF0YS5cbiAgICB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCg0KVxuXG4gICAgLy8gMyBCeXRlIHRpbWVzdGFtcFxuICAgIGxldCB0aW1lc3RhbXAgPSB0aGlzLmxvYWRlckJ1ZmZlci50b0ludCgwLCAzKVxuICAgIHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDMpXG5cbiAgICAvLyAxIEJ5dGUgdGltZXN0YW1wRXh0XG4gICAgbGV0IHRpbWVzdGFtcEV4dCA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDEpWzBdXG4gICAgaWYgKHRpbWVzdGFtcEV4dCA+IDApIHtcbiAgICAgIHRpbWVzdGFtcCArPSB0aW1lc3RhbXBFeHQgKiAweDEwMDAwMDBcbiAgICB9XG5cbiAgICBjaHVuay5kdHMgPSB0aW1lc3RhbXBcblxuICAgIC8vIHN0cmVhbUlkXG4gICAgdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMylcbiAgICByZXR1cm4gY2h1bmtcbiAgfVxuXG4gIF9wcm9jZXNzQ2h1bmsgKGNodW5rKSB7XG4gICAgc3dpdGNoIChjaHVuay50YWdUeXBlKSB7XG4gICAgICBjYXNlIDE4OlxuICAgICAgICB0aGlzLl9wYXJzZVNjcmlwdERhdGEoY2h1bmspXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDg6XG4gICAgICAgIHRoaXMuX3BhcnNlQUFDRGF0YShjaHVuaylcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgOTpcbiAgICAgICAgdGhpcy5fcGFyc2VIZXZjRGF0YShjaHVuaylcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMTE6XG4gICAgICAgIC8vIGZvciBzb21lIENETiB0aGF0IGRpZCBub3QgcHJvY2VzcyB0aGUgY3VycmVjdCBSVE1QIG1lc3NhZ2VzXG4gICAgICAgIHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDMpXG4gICAgICAgIGJyZWFrXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgxKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBwYXJzZSBmbHYgc2NyaXB0IGRhdGFcbiAgICogQHBhcmFtIGNodW5rXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcGFyc2VTY3JpcHREYXRhIChjaHVuaykge1xuICAgIGxldCBhdWRpb1RyYWNrID0gdGhpcy50cmFja3MuYXVkaW9UcmFja1xuICAgIGxldCB2aWRlb1RyYWNrID0gdGhpcy50cmFja3MudmlkZW9UcmFja1xuXG4gICAgbGV0IGRhdGEgPSB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdChjaHVuay5kYXRhc2l6ZSlcblxuICAgIGNvbnN0IGluZm8gPSBuZXcgQU1GUGFyc2VyKCkucmVzb2x2ZShkYXRhLCBkYXRhLmxlbmd0aClcblxuICAgIGNvbnN0IG9uTWV0YURhdGEgPSB0aGlzLl9jb250ZXh0Lm9uTWV0YURhdGEgPSBpbmZvID8gaW5mby5vbk1ldGFEYXRhIDogdW5kZWZpbmVkXG5cbiAgICAvLyBmaWxsIG1lZGlhSW5mb1xuICAgIHRoaXMuX2NvbnRleHQubWVkaWFJbmZvLmR1cmF0aW9uID0gb25NZXRhRGF0YS5kdXJhdGlvblxuICAgIHRoaXMuX2NvbnRleHQubWVkaWFJbmZvLmhhc1ZpZGVvID0gb25NZXRhRGF0YS5oYXNWaWRlb1xuICAgIHRoaXMuX2NvbnRleHQubWVkaWFJbmZvLmhzYUF1ZGlvID0gb25NZXRhRGF0YS5oYXNBdWRpb1xuXG4gICAgbGV0IHZhbGlkYXRlID0gdGhpcy5fZGF0YXNpemVWYWxpZGF0b3IoY2h1bmsuZGF0YXNpemUpXG4gICAgaWYgKHZhbGlkYXRlKSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FRElBX0lORk8pXG4gICAgICB0aGlzLl9oYXNTY3JpcHQgPSB0cnVlXG4gICAgfVxuXG4gICAgLy8gRWRpdCBkZWZhdWx0IG1ldGEuXG4gICAgaWYgKGF1ZGlvVHJhY2sgJiYgIWF1ZGlvVHJhY2suaGFzU3BlY2lmaWNDb25maWcpIHtcbiAgICAgIGxldCBtZXRhID0gYXVkaW9UcmFjay5tZXRhXG4gICAgICBpZiAob25NZXRhRGF0YS5hdWRpb3NhbXBsZXJhdGUpIHtcbiAgICAgICAgbWV0YS5zYW1wbGVSYXRlID0gb25NZXRhRGF0YS5hdWRpb3NhbXBsZXJhdGVcbiAgICAgIH1cblxuICAgICAgaWYgKG9uTWV0YURhdGEuYXVkaW9jaGFubmVscykge1xuICAgICAgICBtZXRhLmNoYW5uZWxDb3VudCA9IG9uTWV0YURhdGEuYXVkaW9jaGFubmVsc1xuICAgICAgfVxuXG4gICAgICBzd2l0Y2ggKG9uTWV0YURhdGEuYXVkaW9zYW1wbGVyYXRlKSB7XG4gICAgICAgIGNhc2UgNDQxMDA6XG4gICAgICAgICAgbWV0YS5zYW1wbGVSYXRlSW5kZXggPSA0XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAyMjA1MDpcbiAgICAgICAgICBtZXRhLnNhbXBsZVJhdGVJbmRleCA9IDdcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDExMDI1OlxuICAgICAgICAgIG1ldGEuc2FtcGxlUmF0ZUluZGV4ID0gMTBcbiAgICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodmlkZW9UcmFjayAmJiAhdmlkZW9UcmFjay5oYXNTcGVjaWZpY0NvbmZpZykge1xuICAgICAgbGV0IG1ldGEgPSB2aWRlb1RyYWNrLm1ldGFcbiAgICAgIGlmICh0eXBlb2Ygb25NZXRhRGF0YS5mcmFtZXJhdGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGxldCBmcHNOdW0gPSBNYXRoLmZsb29yKG9uTWV0YURhdGEuZnJhbWVyYXRlICogMTAwMClcbiAgICAgICAgaWYgKGZwc051bSA+IDApIHtcbiAgICAgICAgICBsZXQgZnBzID0gZnBzTnVtIC8gMTAwMFxuICAgICAgICAgIGlmICghbWV0YS5mcmFtZVJhdGUpIHtcbiAgICAgICAgICAgIG1ldGEuZnJhbWVSYXRlID0ge31cbiAgICAgICAgICB9XG4gICAgICAgICAgbWV0YS5mcmFtZVJhdGUuZml4ZWQgPSB0cnVlXG4gICAgICAgICAgbWV0YS5mcmFtZVJhdGUuZnBzID0gZnBzXG4gICAgICAgICAgbWV0YS5mcmFtZVJhdGUuZnBzX251bSA9IGZwc051bVxuICAgICAgICAgIG1ldGEuZnJhbWVSYXRlLmZwc19kZW4gPSAxMDAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfYWFjU2VxdWVuY2VIZWFkZXJQYXJzZXIgKGRhdGEpIHtcbiAgICBsZXQgcmV0ID0ge31cbiAgICByZXQuaGFzU3BlY2lmaWNDb25maWcgPSB0cnVlXG4gICAgcmV0Lm9iamVjdFR5cGUgPSBkYXRhWzFdID4+PiAzXG4gICAgcmV0LnNhbXBsZVJhdGVJbmRleCA9ICgoZGF0YVsxXSAmIDcpIDw8IDEpIHwgKGRhdGFbMl0gPj4+IDcpXG4gICAgcmV0LmF1ZGlvc2FtcGxlcmF0ZSA9IHRoaXMuX3N3aXRjaEF1ZGlvU2FtcGxlUmF0ZShyZXQuc2FtcGxlUmF0ZUluZGV4KVxuICAgIHJldC5jaGFubmVsQ291bnQgPSAoZGF0YVsyXSAmIDEyMCkgPj4+IDNcbiAgICByZXQuZnJhbWVMZW5ndGggPSAoZGF0YVsyXSAmIDQpID4+PiAyXG4gICAgcmV0LmRlcGVuZHNPbkNvcmVDb2RlciA9IChkYXRhWzJdICYgMikgPj4+IDFcbiAgICByZXQuZXh0ZW5zaW9uRmxhZ0luZGV4ID0gZGF0YVsyXSAmIDFcblxuICAgIHJldC5jb2RlYyA9IGBtcDRhLjQwLiR7cmV0Lm9iamVjdFR5cGV9YFxuICAgIGxldCB1c2VyQWdlbnQgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xuICAgIGxldCBleHRlbnNpb25TYW1wbGluZ0luZGV4O1xuXG4gICAgbGV0IGNvbmZpZztcbiAgICBsZXQgc2FtcGxpbmdJbmRleCA9IHJldC5zYW1wbGVSYXRlSW5kZXg7XG5cbiAgICBpZiAodXNlckFnZW50LmluZGV4T2YoJ2ZpcmVmb3gnKSAhPT0gLTEpIHtcbiAgICAgIC8vIGZpcmVmb3g6IHVzZSBTQlIgKEhFLUFBQykgaWYgZnJlcSBsZXNzIHRoYW4gMjRrSHpcbiAgICAgIGlmIChyZXQuc2FtcGxlUmF0ZUluZGV4ID49IDYpIHtcbiAgICAgICAgcmV0Lm9iamVjdFR5cGUgPSA1O1xuICAgICAgICBjb25maWcgPSBuZXcgQXJyYXkoNCk7XG4gICAgICAgIGV4dGVuc2lvblNhbXBsaW5nSW5kZXggPSBzYW1wbGluZ0luZGV4IC0gMztcbiAgICAgIH0gZWxzZSB7IC8vIHVzZSBMQy1BQUNcbiAgICAgICAgcmV0Lm9iamVjdFR5cGUgPSAyO1xuICAgICAgICBjb25maWcgPSBuZXcgQXJyYXkoMik7XG4gICAgICAgIGV4dGVuc2lvblNhbXBsaW5nSW5kZXggPSBzYW1wbGluZ0luZGV4O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodXNlckFnZW50LmluZGV4T2YoJ2FuZHJvaWQnKSAhPT0gLTEpIHtcbiAgICAgIC8vIGFuZHJvaWQ6IGFsd2F5cyB1c2UgTEMtQUFDXG4gICAgICByZXQub2JqZWN0VHlwZSA9IDI7XG4gICAgICBjb25maWcgPSBuZXcgQXJyYXkoMik7XG4gICAgICBleHRlbnNpb25TYW1wbGluZ0luZGV4ID0gc2FtcGxpbmdJbmRleDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZm9yIG90aGVyIGJyb3dzZXJzLCBlLmcuIGNocm9tZS4uLlxuICAgICAgLy8gQWx3YXlzIHVzZSBIRS1BQUMgdG8gbWFrZSBpdCBlYXNpZXIgdG8gc3dpdGNoIGFhYyBjb2RlYyBwcm9maWxlXG4gICAgICByZXQub2JqZWN0VHlwZSA9IDU7XG4gICAgICBleHRlbnNpb25TYW1wbGluZ0luZGV4ID0gcmV0LnNhbXBsZVJhdGVJbmRleDtcbiAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSg0KTtcblxuICAgICAgaWYgKHJldC5zYW1wbGVSYXRlSW5kZXggPj0gNikge1xuICAgICAgICBleHRlbnNpb25TYW1wbGluZ0luZGV4ID0gcmV0LnNhbXBsZVJhdGVJbmRleCAtIDM7XG4gICAgICB9IGVsc2UgaWYgKHJldC5jaGFubmVsQ291bnQgPT09IDEpIHsgLy8gTW9ubyBjaGFubmVsXG4gICAgICAgIHJldC5vYmplY3RUeXBlID0gMjtcbiAgICAgICAgY29uZmlnID0gbmV3IEFycmF5KDIpO1xuICAgICAgICBleHRlbnNpb25TYW1wbGluZ0luZGV4ID0gcmV0LnNhbXBsZVJhdGVJbmRleDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25maWdbMF0gPSByZXQub2JqZWN0VHlwZSA8PCAzO1xuICAgIGNvbmZpZ1swXSB8PSAocmV0LnNhbXBsZVJhdGVJbmRleCAmIDB4MEYpID4+PiAxO1xuICAgIGNvbmZpZ1sxXSA9IChyZXQuc2FtcGxlUmF0ZUluZGV4ICYgMHgwRikgPDwgNztcbiAgICBjb25maWdbMV0gfD0gKHJldC5jaGFubmVsQ291bnQgJiAweDBGKSA8PCAzO1xuICAgIGlmIChyZXQub2JqZWN0VHlwZSA9PT0gNSkge1xuICAgICAgY29uZmlnWzFdIHw9ICgoZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCAmIDB4MEYpID4+PiAxKTtcbiAgICAgIGNvbmZpZ1syXSA9IChleHRlbnNpb25TYW1wbGluZ0luZGV4ICYgMHgwMSkgPDwgNztcbiAgICAgIC8vIGV4dGVuZGVkIGF1ZGlvIG9iamVjdCB0eXBlOiBmb3JjZSB0byAyIChMQy1BQUMpXG4gICAgICBjb25maWdbMl0gfD0gKDIgPDwgMik7XG4gICAgICBjb25maWdbM10gPSAwO1xuICAgIH1cbiAgICByZXQuY29uZmlnID0gY29uZmlnXG4gICAgcmV0dXJuIHJldFxuICB9XG5cbiAgX3BhcnNlQUFDRGF0YSAoY2h1bmspIHtcbiAgICBsZXQgdHJhY2sgPSB0aGlzLnRyYWNrcy5hdWRpb1RyYWNrXG4gICAgaWYgKCF0cmFjaykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IG1ldGEgPSB0cmFjay5tZXRhXG5cbiAgICBpZiAoIW1ldGEpIHtcbiAgICAgIHRyYWNrLm1ldGEgPSBuZXcgQXVkaW9UcmFja01ldGEoKVxuICAgICAgbWV0YSA9IHRyYWNrLm1ldGE7XG4gICAgfVxuXG4gICAgbGV0IGluZm8gPSB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgxKVswXVxuXG4gICAgY2h1bmsuZGF0YSA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KGNodW5rLmRhdGFzaXplIC0gMSlcblxuICAgIGxldCBmb3JtYXQgPSAoaW5mbyAmIDI0MCkgPj4+IDRcblxuICAgIHRyYWNrLmZvcm1hdCA9IGZvcm1hdFxuXG4gICAgaWYgKGZvcm1hdCAhPT0gMTApIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIG5ldyBFcnJvcihgaW52YWxpZCBhdWRpbyBmb3JtYXQ6ICR7Zm9ybWF0fWApKVxuICAgIH1cblxuICAgIGlmIChmb3JtYXQgPT09IDEwICYmICF0aGlzLl9oYXNBdWRpb1NlcXVlbmNlKSB7XG4gICAgICBtZXRhLnNhbXBsZVJhdGUgPSB0aGlzLl9zd2l0Y2hBdWRpb1NhbXBsaW5nRnJlcXVlbmN5KGluZm8pXG4gICAgICBtZXRhLnNhbXBsZVJhdGVJbmRleCA9IChpbmZvICYgMTIpID4+PiAyXG4gICAgICBtZXRhLmZyYW1lTGVudGggPSAoaW5mbyAmIDIpID4+PiAxXG4gICAgICBtZXRhLmNoYW5uZWxDb3VudCA9IGluZm8gJiAxXG4gICAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uID0gTWF0aC5mbG9vcigxMDI0IC8gbWV0YS5hdWRpb1NhbXBsZVJhdGUgKiBtZXRhLnRpbWVzY2FsZSlcbiAgICB9XG5cbiAgICBsZXQgYXVkaW9TYW1wbGVSYXRlID0gbWV0YS5hdWRpb1NhbXBsZVJhdGVcbiAgICBsZXQgYXVkaW9TYW1wbGVSYXRlSW5kZXggPSBtZXRhLnNhbXBsZVJhdGVJbmRleFxuICAgIGxldCByZWZTYW1wbGVEdXJhdGlvbiA9IG1ldGEucmVmU2FtcGxlRHVyYXRpb25cblxuICAgIGRlbGV0ZSBjaHVuay50YWdUeXBlXG4gICAgbGV0IHZhbGlkYXRlID0gdGhpcy5fZGF0YXNpemVWYWxpZGF0b3IoY2h1bmsuZGF0YXNpemUpXG5cbiAgICBpZiAoY2h1bmsuZGF0YVswXSA9PT0gMCkgeyAvLyBBQUMgU2VxdWVuY2UgSGVhZGVyXG4gICAgICBsZXQgYWFjSGVhZGVyID0gdGhpcy5fYWFjU2VxdWVuY2VIZWFkZXJQYXJzZXIoY2h1bmsuZGF0YSlcbiAgICAgIGF1ZGlvU2FtcGxlUmF0ZSA9IGFhY0hlYWRlci5hdWRpb3NhbXBsZXJhdGUgfHwgbWV0YS5hdWRpb1NhbXBsZVJhdGVcbiAgICAgIGF1ZGlvU2FtcGxlUmF0ZUluZGV4ID0gYWFjSGVhZGVyLnNhbXBsZVJhdGVJbmRleCB8fCBtZXRhLnNhbXBsZVJhdGVJbmRleFxuICAgICAgcmVmU2FtcGxlRHVyYXRpb24gPSBNYXRoLmZsb29yKDEwMjQgLyBhdWRpb1NhbXBsZVJhdGUgKiBtZXRhLnRpbWVzY2FsZSlcblxuICAgICAgbWV0YS5jaGFubmVsQ291bnQgPSBhYWNIZWFkZXIuY2hhbm5lbENvdW50XG4gICAgICBtZXRhLnNhbXBsZVJhdGUgPSBhdWRpb1NhbXBsZVJhdGVcbiAgICAgIG1ldGEuc2FtcGxlUmF0ZUluZGV4ID0gYXVkaW9TYW1wbGVSYXRlSW5kZXhcbiAgICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb24gPSByZWZTYW1wbGVEdXJhdGlvblxuICAgICAgbWV0YS5kdXJhdGlvbiA9IHRoaXMuX2NvbnRleHQubWVkaWFJbmZvLmR1cmF0aW9uICogbWV0YS50aW1lc2NhbGVcbiAgICAgIG1ldGEuY29uZmlnID0gYWFjSGVhZGVyLmNvbmZpZ1xuICAgICAgbWV0YS5vYmplY3RUeXBlID0gYWFjSGVhZGVyLm9iamVjdFR5cGU7XG5cbiAgICAgIGNvbnN0IGF1ZGlvTWVkaWEgPSB0aGlzLl9jb250ZXh0Lm1lZGlhSW5mby5hdWRpb1xuXG4gICAgICAvLyBmaWxsIGF1ZGlvIG1lZGlhIGluZm9cbiAgICAgIGF1ZGlvTWVkaWEuY29kZWMgPSBhYWNIZWFkZXIuY29kZWNcbiAgICAgIGF1ZGlvTWVkaWEuY2hhbm5lbENvdW50ID0gYWFjSGVhZGVyLmNoYW5uZWxDb3VudFxuICAgICAgYXVkaW9NZWRpYS5zYW1wbGVSYXRlID0gYXVkaW9TYW1wbGVSYXRlXG4gICAgICBhdWRpb01lZGlhLnNhbXBsZVJhdGVJbmRleCA9IGFhY0hlYWRlci5hdWRpb1NhbXBsZVJhdGVJbmRleFxuXG4gICAgICBpZiAodGhpcy5faGFzU2NyaXB0ICYmICF0aGlzLl9oYXNBdWRpb1NlcXVlbmNlKSB7XG4gICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAnYXVkaW8nKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9oYXNTY3JpcHQgJiYgdGhpcy5faGFzQXVkaW9TZXF1ZW5jZSkge1xuICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgJ2F1ZGlvJylcbiAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5BVURJT19NRVRBREFUQV9DSEFOR0UpXG4gICAgICAgIC8vIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAnYXVkaW8nKVxuICAgICAgfVxuICAgICAgdGhpcy5faGFzQXVkaW9TZXF1ZW5jZSA9IHRydWVcblxuICAgICAgdGhpcy5fbWV0YUNoYW5nZSA9IHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX21ldGFDaGFuZ2UpIHtcbiAgICAgICAgY2h1bmsub3B0aW9ucyA9IHtcbiAgICAgICAgICBtZXRhOiB0cmFjay5tZXRhXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX21ldGFDaGFuZ2UgPSBmYWxzZVxuICAgICAgfVxuXG4gICAgICBjaHVuay5kYXRhID0gY2h1bmsuZGF0YS5zbGljZSgxLCBjaHVuay5kYXRhLmxlbmd0aClcbiAgICAgIHRyYWNrLnNhbXBsZXMucHVzaChjaHVuaylcbiAgICB9XG4gICAgaWYgKCF2YWxpZGF0ZSkge1xuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgdGhpcy5UQUcsIG5ldyBFcnJvcignVEFHIGxlbmd0aCBlcnJvciBhdCAnICsgY2h1bmsuZGF0YXNpemUpLCBmYWxzZSlcbiAgICAgIC8vIHRoaXMubG9nZ2VyLndhcm4odGhpcy5UQUcsIGVycm9yLm1lc3NhZ2UpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHBhcnNlIGhldmMvYXZjIHZpZGVvIGRhdGFcbiAgICogQHBhcmFtIGNodW5rXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcGFyc2VIZXZjRGF0YSAoY2h1bmspIHtcbiAgICAvLyBoZWFkZXJcbiAgICBsZXQgaW5mbyA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDEpWzBdXG4gICAgY2h1bmsuZnJhbWVUeXBlID0gKGluZm8gJiAweGYwKSA+Pj4gNFxuICAgIGNodW5rLmlzS2V5ZnJhbWUgPSBjaHVuay5mcmFtZVR5cGUgPT09IDFcbiAgICAvLyBsZXQgdGVtcENvZGVjSUQgPSB0aGlzLnRyYWNrcy52aWRlb1RyYWNrLmNvZGVjSURcbiAgICBsZXQgY29kZWNJRCA9IGluZm8gJiAweDBmXG4gICAgdGhpcy50cmFja3MudmlkZW9UcmFjay5jb2RlY0lEID0gY29kZWNJRFxuXG4gICAgLy8gaGV2Y+WSjGF2Y+eahGhlYWRlcuino+aekOaWueW8j+S4gOagt1xuICAgIGNodW5rLmF2Y1BhY2tldFR5cGUgPSB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgxKVswXVxuICAgIGNodW5rLmN0cyA9IHRoaXMubG9hZGVyQnVmZmVyLnRvSW50KDAsIDMpXG4gICAgdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMylcblxuICAgIC8vIDEyIGZvciBoZXZjLCA3IGZvciBhdmNcbiAgICBpZiAoY29kZWNJRCA9PT0gMTIpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdChjaHVuay5kYXRhc2l6ZSAtIDUpXG4gICAgICBjaHVuay5kYXRhID0gZGF0YVxuXG4gICAgICBpZiAoTnVtYmVyLnBhcnNlSW50KGNodW5rLmF2Y1BhY2tldFR5cGUpICE9PSAwKSB7XG4gICAgICAgIGlmICghdGhpcy5fZGF0YXNpemVWYWxpZGF0b3IoY2h1bmsuZGF0YXNpemUpKSB7XG4gICAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgdGhpcy5UQUcsIG5ldyBFcnJvcihgaW52YWxpZCB2aWRlbyB0YWcgZGF0YXNpemU6ICR7Y2h1bmsuZGF0YXNpemV9YCksIGZhbHNlKVxuICAgICAgICB9XG4gICAgICAgIGxldCBuYWx1ID0ge31cbiAgICAgICAgbGV0IHIgPSAwXG4gICAgICAgIG5hbHUuY3RzID0gY2h1bmsuY3RzXG4gICAgICAgIG5hbHUuZHRzID0gY2h1bmsuZHRzXG4gICAgICAgIHdoaWxlIChjaHVuay5kYXRhLmxlbmd0aCA+IHIpIHtcbiAgICAgICAgICBsZXQgc2l6ZXMgPSBjaHVuay5kYXRhLnNsaWNlKE51bWJlci5wYXJzZUludChyKSwgNCArIHIpXG4gICAgICAgICAgbmFsdS5zaXplID0gc2l6ZXNbM11cbiAgICAgICAgICBuYWx1LnNpemUgKz0gc2l6ZXNbMl0gKiAyNTZcbiAgICAgICAgICBuYWx1LnNpemUgKz0gc2l6ZXNbMV0gKiAyNTYgKiAyNTZcbiAgICAgICAgICBuYWx1LnNpemUgKz0gc2l6ZXNbMF0gKiAyNTYgKiAyNTYgKiAyNTZcbiAgICAgICAgICByICs9IDRcbiAgICAgICAgICBuYWx1LmRhdGEgPSBjaHVuay5kYXRhLnNsaWNlKE51bWJlci5wYXJzZUludChyKSwgbmFsdS5zaXplICsgcilcbiAgICAgICAgICByICs9IG5hbHUuc2l6ZVxuICAgICAgICAgIHRoaXMudHJhY2tzLnZpZGVvVHJhY2suc2FtcGxlcy5wdXNoKG5hbHUpXG4gICAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICd2aWRlbycpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoTnVtYmVyLnBhcnNlSW50KGNodW5rLmF2Y1BhY2tldFR5cGUpID09PSAwKSB7XG4gICAgICAgIGlmICghdGhpcy5fZGF0YXNpemVWYWxpZGF0b3IoY2h1bmsuZGF0YXNpemUpKSB7XG4gICAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgdGhpcy5UQUcsIG5ldyBFcnJvcihgaW52YWxpZCB2aWRlbyB0YWcgZGF0YXNpemU6ICR7Y2h1bmsuZGF0YXNpemV9YCksIGZhbHNlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAndmlkZW8nKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjb2RlY0lEID09PSA3KSB7XG4gICAgICBsZXQgZGF0YSA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KGNodW5rLmRhdGFzaXplIC0gNSlcbiAgICAgIGlmIChkYXRhWzRdID09PSAwICYmIGRhdGFbNV0gPT09IDAgJiYgZGF0YVs2XSA9PT0gMCAmJiBkYXRhWzddID09PSAxKSB7XG4gICAgICAgIGxldCBhdmNjbGVuZ3RoID0gMFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgIGF2Y2NsZW5ndGggPSBhdmNjbGVuZ3RoICogMjU2ICsgZGF0YVtpXVxuICAgICAgICB9XG4gICAgICAgIGF2Y2NsZW5ndGggLT0gNFxuICAgICAgICBkYXRhID0gZGF0YS5zbGljZSg0LCBkYXRhLmxlbmd0aClcbiAgICAgICAgZGF0YVszXSA9IGF2Y2NsZW5ndGggJSAyNTZcbiAgICAgICAgYXZjY2xlbmd0aCA9IChhdmNjbGVuZ3RoIC0gZGF0YVszXSkgLyAyNTZcbiAgICAgICAgZGF0YVsyXSA9IGF2Y2NsZW5ndGggJSAyNTZcbiAgICAgICAgYXZjY2xlbmd0aCA9IChhdmNjbGVuZ3RoIC0gZGF0YVsyXSkgLyAyNTZcbiAgICAgICAgZGF0YVsxXSA9IGF2Y2NsZW5ndGggJSAyNTZcbiAgICAgICAgZGF0YVswXSA9IChhdmNjbGVuZ3RoIC0gZGF0YVsxXSkgLyAyNTZcbiAgICAgIH1cblxuICAgICAgY2h1bmsuZGF0YSA9IGRhdGFcbiAgICAgIC8vIElmIGl0IGlzIEFWQyBzZXF1ZWNlIEhlYWRlci5cbiAgICAgIGlmIChjaHVuay5hdmNQYWNrZXRUeXBlID09PSAwKSB7XG4gICAgICAgIHRoaXMuX2F2Y1NlcXVlbmNlSGVhZGVyUGFyc2VyKGNodW5rLmRhdGEpXG4gICAgICAgIGxldCB2YWxpZGF0ZSA9IHRoaXMuX2RhdGFzaXplVmFsaWRhdG9yKGNodW5rLmRhdGFzaXplKVxuICAgICAgICBpZiAodmFsaWRhdGUpIHtcbiAgICAgICAgICBpZiAodGhpcy5faGFzU2NyaXB0ICYmICF0aGlzLl9oYXNWaWRlb1NlcXVlbmNlKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgJ3ZpZGVvJylcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2hhc1NjcmlwdCAmJiB0aGlzLl9oYXNWaWRlb1NlcXVlbmNlKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgJ2F1ZGlvJylcbiAgICAgICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuVklERU9fTUVUQURBVEFfQ0hBTkdFKVxuICAgICAgICAgICAgLy8gdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICd2aWRlbycpXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX2hhc1ZpZGVvU2VxdWVuY2UgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWV0YUNoYW5nZSA9IHRydWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghdGhpcy5fZGF0YXNpemVWYWxpZGF0b3IoY2h1bmsuZGF0YXNpemUpKSB7XG4gICAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgdGhpcy5UQUcsIG5ldyBFcnJvcihgaW52YWxpZCB2aWRlbyB0YWcgZGF0YXNpemU6ICR7Y2h1bmsuZGF0YXNpemV9YCksIGZhbHNlKVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fbWV0YUNoYW5nZSkge1xuICAgICAgICAgIGNodW5rLm9wdGlvbnMgPSB7XG4gICAgICAgICAgICBtZXRhOiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnRyYWNrcy52aWRlb1RyYWNrLm1ldGEpXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX21ldGFDaGFuZ2UgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIHRoaXMudHJhY2tzLnZpZGVvVHJhY2suc2FtcGxlcy5wdXNoKGNodW5rKVxuICAgICAgICAvLyB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0NPTVBMRVRFKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLlRBRywgbmV3IEVycm9yKGB2aWRlbyBjb2RlaWQgaXMgJHtjb2RlY0lEfWApLCBmYWxzZSlcbiAgICAgIGNodW5rLmRhdGEgPSB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdChjaHVuay5kYXRhc2l6ZSAtIDEpXG4gICAgICBpZiAoIXRoaXMuX2RhdGFzaXplVmFsaWRhdG9yKGNodW5rLmRhdGFzaXplKSkge1xuICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLlRBRywgbmV3IEVycm9yKGBpbnZhbGlkIHZpZGVvIHRhZyBkYXRhc2l6ZTogJHtjaHVuay5kYXRhc2l6ZX1gKSwgZmFsc2UpXG4gICAgICB9XG4gICAgICB0aGlzLnRyYWNrcy52aWRlb1RyYWNrLnNhbXBsZXMucHVzaChjaHVuaylcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfQ09NUExFVEUpXG4gICAgfVxuICAgIGRlbGV0ZSBjaHVuay50YWdUeXBlXG4gIH1cblxuICAvKipcbiAgICogcGFyc2UgYXZjIG1ldGFkYXRhXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfYXZjU2VxdWVuY2VIZWFkZXJQYXJzZXIgKGRhdGEpIHtcbiAgICBsZXQgdHJhY2sgPSB0aGlzLnRyYWNrcy52aWRlb1RyYWNrXG5cbiAgICBpZiAoIXRyYWNrKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgb2Zmc2V0ID0gMFxuXG4gICAgaWYgKCF0cmFjay5tZXRhKSB7XG4gICAgICB0cmFjay5tZXRhID0gbmV3IFZpZGVvVHJhY2tNZXRhKClcbiAgICB9XG4gICAgbGV0IG1ldGEgPSB0cmFjay5tZXRhXG5cbiAgICBtZXRhLmNvbmZpZ3VyYXRpb25WZXJzaW9uID0gZGF0YVswXVxuICAgIG1ldGEuYXZjUHJvZmlsZUluZGljYXRpb24gPSBkYXRhWzFdXG4gICAgbWV0YS5wcm9maWxlQ29tcGF0aWJpbGl0eSA9IGRhdGFbMl1cbiAgICBtZXRhLmF2Y0xldmVsSW5kaWNhdGlvbiA9IGRhdGFbM10gLyAxMFxuICAgIG1ldGEubmFsVW5pdExlbmd0aCA9IChkYXRhWzRdICYgMHgwMykgKyAxXG5cbiAgICBsZXQgbnVtT2ZTcHMgPSBkYXRhWzVdICYgMHgxZlxuICAgIG9mZnNldCA9IDZcbiAgICBsZXQgY29uZmlnID0ge31cblxuICAgIC8vIHBhcnNlIFNQU1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtT2ZTcHM7IGkrKykge1xuICAgICAgbGV0IHNpemUgPSBkYXRhW29mZnNldF0gKiAyNTUgKyBkYXRhW29mZnNldCArIDFdXG4gICAgICBvZmZzZXQgKz0gMlxuXG4gICAgICBsZXQgc3BzID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSlcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgICAgIHNwc1tqXSA9IGRhdGFbb2Zmc2V0ICsgal1cbiAgICAgIH1cblxuICAgICAgLy8gY29kZWMgc3RyaW5nXG4gICAgICBsZXQgY29kZWNTdHJpbmcgPSAnYXZjMS4nXG4gICAgICBmb3IgKGxldCBqID0gMTsgaiA8IDQ7IGorKykge1xuICAgICAgICBsZXQgaCA9IHNwc1tqXS50b1N0cmluZygxNilcbiAgICAgICAgaWYgKGgubGVuZ3RoIDwgMikge1xuICAgICAgICAgIGggPSAnMCcgKyBoXG4gICAgICAgIH1cbiAgICAgICAgY29kZWNTdHJpbmcgKz0gaFxuICAgICAgfVxuXG4gICAgICBtZXRhLmNvZGVjID0gY29kZWNTdHJpbmdcblxuICAgICAgb2Zmc2V0ICs9IHNpemVcbiAgICAgIHRoaXMudHJhY2tzLnZpZGVvVHJhY2subWV0YS5zcHMgPSBzcHNcbiAgICAgIGNvbmZpZyA9IFNwc1BhcnNlci5wYXJzZVNQUyhzcHMpXG4gICAgfVxuXG4gICAgbGV0IG51bU9mUHBzID0gZGF0YVtvZmZzZXRdXG5cbiAgICBvZmZzZXQrK1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1PZlBwczsgaSsrKSB7XG4gICAgICBsZXQgc2l6ZSA9IGRhdGFbb2Zmc2V0XSAqIDI1NSArIGRhdGFbb2Zmc2V0ICsgMV1cbiAgICAgIG9mZnNldCArPSAyXG4gICAgICBsZXQgcHBzID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSlcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgICAgIHBwc1tqXSA9IGRhdGFbb2Zmc2V0ICsgal1cbiAgICAgIH1cbiAgICAgIG9mZnNldCArPSBzaXplXG4gICAgICB0aGlzLnRyYWNrcy52aWRlb1RyYWNrLm1ldGEucHBzID0gcHBzXG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbihtZXRhLCBTcHNQYXJzZXIudG9WaWRlb01ldGEoY29uZmlnKSlcblxuICAgIC8vIGZpbGwgdmlkZW8gbWVkaWEgaW5mb1xuICAgIGNvbnN0IHZpZGVvTWVkaWEgPSB0aGlzLl9jb250ZXh0Lm1lZGlhSW5mby52aWRlb1xuXG4gICAgdmlkZW9NZWRpYS5jb2RlYyA9IG1ldGEuY29kZWNcbiAgICB2aWRlb01lZGlhLnByb2ZpbGUgPSBtZXRhLnByb2ZpbGVcbiAgICB2aWRlb01lZGlhLmxldmVsID0gbWV0YS5sZXZlbFxuICAgIHZpZGVvTWVkaWEuY2hyb21hRm9ybWF0ID0gbWV0YS5jaHJvbWFGb3JtYXRcbiAgICB2aWRlb01lZGlhLmZyYW1lUmF0ZSA9IG1ldGEuZnJhbWVSYXRlXG4gICAgdmlkZW9NZWRpYS5wYXJSYXRpbyA9IG1ldGEucGFyUmF0aW9cbiAgICB2aWRlb01lZGlhLndpZHRoID0gdmlkZW9NZWRpYS53aWR0aCA9PT0gbWV0YS5wcmVzZW50V2lkdGggPyB2aWRlb01lZGlhLndpZHRoIDogbWV0YS5wcmVzZW50V2lkdGhcbiAgICB2aWRlb01lZGlhLmhlaWdodCA9IHZpZGVvTWVkaWEuaGVpZ2h0ID09PSBtZXRhLnByZXNlbnRIZWlnaHQgPyB2aWRlb01lZGlhLndpZHRoIDogbWV0YS5wcmVzZW50SGVpZ2h0XG5cbiAgICBtZXRhLmR1cmF0aW9uID0gdGhpcy5fY29udGV4dC5tZWRpYUluZm8uZHVyYXRpb24gKiBtZXRhLnRpbWVzY2FsZVxuICAgIG1ldGEuYXZjYyA9IG5ldyBVaW50OEFycmF5KGRhdGEubGVuZ3RoKVxuICAgIG1ldGEuYXZjYy5zZXQoZGF0YSlcbiAgICB0cmFjay5tZXRhID0gbWV0YVxuICB9XG5cbiAgLyoqXG4gICAqIGNob29zZSBhdWRpbyBzYW1wbGUgcmF0ZVxuICAgKiBAcGFyYW0gc2FtcGxpbmdGcmVxdWVuY3lJbmRleFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3N3aXRjaEF1ZGlvU2FtcGxlUmF0ZSAoc2FtcGxpbmdGcmVxdWVuY3lJbmRleCkge1xuICAgIGxldCBzYW1wbGluZ0ZyZXF1ZW5jeUxpc3QgPSBbOTYwMDAsIDg4MjAwLCA2NDAwMCwgNDgwMDAsIDQ0MTAwLCAzMjAwMCwgMjQwMDAsIDIyMDUwLCAxNjAwMCwgMTIwMDAsIDExMDI1LCA4MDAwLCA3MzUwXVxuICAgIHJldHVybiBzYW1wbGluZ0ZyZXF1ZW5jeUxpc3Rbc2FtcGxpbmdGcmVxdWVuY3lJbmRleF1cbiAgfVxuXG4gIC8qKlxuICAgKiBjaG9vc2UgYXVkaW8gc2FtcGxpbmcgZnJlcXVlbmNlXG4gICAqIEBwYXJhbSBpbmZvXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc3dpdGNoQXVkaW9TYW1wbGluZ0ZyZXF1ZW5jeSAoaW5mbykge1xuICAgIGxldCBzYW1wbGluZ0ZyZXF1ZW5jeUluZGV4ID0gKGluZm8gJiAxMikgPj4+IDJcbiAgICBsZXQgc2FtcGxpbmdGcmVxdWVuY3lMaXN0ID0gWzU1MDAsIDExMDI1LCAyMjA1MCwgNDQxMDAsIDQ4MDAwXVxuICAgIHJldHVybiBzYW1wbGluZ0ZyZXF1ZW5jeUxpc3Rbc2FtcGxpbmdGcmVxdWVuY3lJbmRleF1cbiAgfVxuXG4gIC8qKlxuICAgKiBjaG9vc2UgYXVkaW8gY2hhbm5lbCBjb3VudFxuICAgKiBAcGFyYW0gaW5mb1xuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3N3aXRjaEF1ZGlvQ2hhbm5lbCAoaW5mbykge1xuICAgIGxldCBzYW1wbGVUcmFja051bUluZGV4ID0gaW5mbyAmIDFcbiAgICBsZXQgc2FtcGxlVHJhY2tOdW1MaXN0ID0gWzEsIDJdXG4gICAgcmV0dXJuIHNhbXBsZVRyYWNrTnVtTGlzdFtzYW1wbGVUcmFja051bUluZGV4XVxuICB9XG5cbiAgLyoqXG4gICAqIGNoZWNrIGRhdGFzaXplIGlzIHZhbGlkIHVzZSA0IEJ5dGUgYWZ0ZXIgY3VycmVudCB0YWdcbiAgICogQHBhcmFtIGRhdGFzaXplXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2RhdGFzaXplVmFsaWRhdG9yIChkYXRhc2l6ZSkge1xuICAgIGxldCBkYXRhc2l6ZUNvbmZpcm0gPSB0aGlzLmxvYWRlckJ1ZmZlci50b0ludCgwLCA0KVxuICAgIHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDQpXG4gICAgcmV0dXJuIGRhdGFzaXplQ29uZmlybSA9PT0gZGF0YXNpemUgKyAxMVxuICB9XG5cbiAgZ2V0IGxvYWRlckJ1ZmZlciAoKSB7XG4gICAgY29uc3QgYnVmZmVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnTE9BREVSX0JVRkZFUicpXG4gICAgaWYgKGJ1ZmZlcikge1xuICAgICAgcmV0dXJuIGJ1ZmZlclxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCBuZXcgRXJyb3IoJ+aJvuS4jeWIsCBsb2FkZXJCdWZmZXIg5a6e5L6LJykpXG4gICAgfVxuICB9XG5cbiAgZ2V0IHRyYWNrcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpXG4gIH1cblxuICBnZXQgbG9nZ2VyICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnTE9HR0VSJylcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBGbHZEZW11eGVyXG4iLCIvKipcbiAqIFJlZmVyZW5jZTogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzgyMTYjc2VjdGlvbi00LjNcbiAqL1xuY2xhc3MgTTNVOFBhcnNlciB7XG4gIHN0YXRpYyBwYXJzZSAodGV4dCwgYmFzZXVybCA9ICcnKSB7XG4gICAgbGV0IHJldCA9IHtcbiAgICAgIGR1cmF0aW9uOiAwXG4gICAgfTtcbiAgICBpZiAoIXRleHQgfHwgIXRleHQuc3BsaXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHJlZnMgPSB0ZXh0LnNwbGl0KC9cXHJ8XFxuLyk7XG4gICAgcmVmcyA9IHJlZnMuZmlsdGVyKChyZWYpID0+IHtcbiAgICAgIHJldHVybiByZWY7XG4gICAgfSlcbiAgICBsZXQgcmVmID0gcmVmcy5zaGlmdCgpXG4gICAgaWYgKCFyZWYubWF0Y2goJyNFWFRNM1UnKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIG0zdTggZmlsZTogbm90IFwiI0VYVE0zVVwiYCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmVmID0gcmVmcy5zaGlmdCgpXG4gICAgd2hpbGUgKHJlZikge1xuICAgICAgbGV0IHJlZm0gPSByZWYubWF0Y2goLyMoLltBLVp8LV0qKTooLiopLyk7XG4gICAgICBsZXQgcmVmZCA9IHJlZi5tYXRjaCgvIyguW0EtWnwtXSopLyk7XG4gICAgICBpZiAocmVmZCAmJiByZWZtICYmIHJlZm0ubGVuZ3RoID4gMikge1xuICAgICAgICBzd2l0Y2ggKHJlZm1bMV0pIHtcbiAgICAgICAgICBjYXNlICdFWFQtWC1WRVJTSU9OJzpcbiAgICAgICAgICAgIHJldC52ZXJzaW9uID0gcGFyc2VJbnQocmVmbVsyXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdFWFQtWC1NRURJQS1TRVFVRU5DRSc6XG4gICAgICAgICAgICByZXQuc2VxdWVuY2UgPSBwYXJzZUludChyZWZtWzJdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ0VYVC1YLVRBUkdFVERVUkFUSU9OJzpcbiAgICAgICAgICAgIHJldC50YXJnZXRkdXJhdGlvbiA9IHBhcnNlRmxvYXQocmVmbVsyXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdFWFRJTkYnOlxuICAgICAgICAgICAgTTNVOFBhcnNlci5wYXJzZUZyYWcocmVmbSwgcmVmcywgcmV0LCBiYXNldXJsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ0VYVC1YLUtFWSc6XG4gICAgICAgICAgICBNM1U4UGFyc2VyLnBhcnNlRGVjcnlwdChyZWZtWzJdLHJldCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0gaWYocmVmZCAmJiByZWZkLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgc3dpdGNoKHJlZmRbMV0pIHtcbiAgICAgICAgICBjYXNlICdFWFQtWC1ESVNDT05USU5VSVRZJzpcbiAgICAgICAgICAgIHJlZiA9IHJlZnMuc2hpZnQoKTtcbiAgICAgICAgICAgIGxldCByZWZtID0gcmVmLm1hdGNoKC8jKC5bQS1afC1dKik6KC4qKS8pO1xuICAgICAgICAgICAgaWYocmVmbS5sZW5ndGggPjIgJiYgcmVmbVsxXSA9PT0gJ0VYVElORicpIHtcbiAgICAgICAgICAgICAgTTNVOFBhcnNlci5wYXJzZUZyYWcocmVmbSwgcmVmcywgcmV0LCBiYXNldXJsLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVmID0gcmVmcy5zaGlmdCgpXG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBzdGF0aWMgcGFyc2VGcmFnIChyZWZtLCByZWZzLCByZXQsIGJhc2V1cmwsIGRpc2NvbnRpbnVlKSB7XG4gICAgaWYgKCFyZXQuZnJhZ3MpIHtcbiAgICAgIHJldC5mcmFncyA9IFtdXG4gICAgfVxuXG4gICAgbGV0IGZyZWcgPSB7XG4gICAgICBzdGFydDogcmV0LmR1cmF0aW9uLFxuICAgICAgZHVyYXRpb246IHBhcnNlRmxvYXQocmVmbVsyXSkgKiAxMDAwXG4gICAgfVxuXG4gICAgcmV0LmR1cmF0aW9uICs9IGZyZWcuZHVyYXRpb247XG4gICAgbGV0IG5leHRsaW5lID0gcmVmcy5zaGlmdCgpO1xuICAgIGlmIChuZXh0bGluZS5tYXRjaCgvIyguKik6KC4qKS8pKSB7XG4gICAgICBuZXh0bGluZSA9IHJlZnMuc2hpZnQoKTtcbiAgICB9XG4gICAgaWYgKG5leHRsaW5lLmxlbmd0aCA+IDAgJiYgbmV4dGxpbmUuY2hhckF0KDApID09PSAnLycgJiYgYmFzZXVybC5tYXRjaCgvLipcXC9cXC8uKlxcLlxcdysvZykpIHtcbiAgICAgIGJhc2V1cmwgPSBiYXNldXJsLm1hdGNoKC8uKlxcL1xcLy4qXFwuXFx3Ky9nKVswXTtcbiAgICB9XG4gICAgaWYgKG5leHRsaW5lLm1hdGNoKC8uKjpcXC9cXC8uKi8pKSB7XG4gICAgICBmcmVnLnVybCA9IG5leHRsaW5lO1xuICAgIH0gZWxzZSB7XG4gICAgICBmcmVnLnVybCA9IGJhc2V1cmwgKyBuZXh0bGluZTtcbiAgICB9XG4gICAgZnJlZy5kaXNjb250aW51ZSA9IGRpc2NvbnRpbnVlO1xuICAgIHJldC5mcmFncy5wdXNoKGZyZWcpO1xuICB9XG5cbiAgc3RhdGljIHBhcnNlVVJMICh1cmwpIHtcbiAgICBsZXQgYmFzZXVybCA9ICcnO1xuICAgIGxldCB1cmxzID0gdXJsLm1hdGNoKC8oLipcXC8pLipcXC5tM3U4Lyk7XG4gICAgaWYgKHVybHMgJiYgdXJscy5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHVybHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHVybHNbaV0ubWF0Y2goLy4qXFwvJC9nKSAmJiB1cmxzW2ldLmxlbmd0aCA+IGJhc2V1cmwubGVuZ3RoKSB7XG4gICAgICAgICAgYmFzZXVybCA9IHVybHNbaV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGJhc2V1cmw7XG4gIH1cblxuICBzdGF0aWMgcGFyc2VEZWNyeXB0KHJlZm0sIHJldCkge1xuICAgIHJldC5lbmNyeXB0ID0ge307XG4gICAgbGV0IHJlZnMgPSByZWZtLnNwbGl0KCcsJyk7XG4gICAgZm9yIChsZXQgaSBpbiByZWZzKSB7IFxuICAgICAgbGV0IGNtZCA9IHJlZnNbaV07XG4gICAgICBpZihjbWQubWF0Y2goL01FVEhPRD0oLiopLykpIHtcbiAgICAgICAgcmV0LmVuY3J5cHQubWV0aG9kID0gY21kLm1hdGNoKC9NRVRIT0Q9KC4qKS8pWzFdO1xuICAgICAgfVxuICAgICAgaWYoY21kLm1hdGNoKC9VUkk9XCIoLiopXCIvKSkge1xuICAgICAgICByZXQuZW5jcnlwdC51cmkgPSBjbWQubWF0Y2goL1VSST1cIiguKilcIi8pWzFdO1xuICAgICAgfVxuXG4gICAgICBpZihjbWQubWF0Y2goL0lWPTB4KC4qKS8pKSB7XG4gICAgICAgIGxldCBpdiA9IGNtZC5tYXRjaCgvSVY9MHgoLiopLylbMV07XG4gICAgICAgIGxldCBsZW5ndGggPSBNYXRoLmNlaWwoaXYubGVuZ3RoIC8gMik7XG4gICAgICAgIHJldC5lbmNyeXB0Lml2YiA9IG5ldyBVaW50OEFycmF5KGxlbmd0aCk7XG4gICAgICAgIGZvcihsZXQgaSA9IGxlbmd0aCAtIDE7IGkgPj0wOyBpLS0pIHtcbiAgICAgICAgICBsZXQgaW0gPSBwYXJzZUludChpdi5zdWJzdHIoaSAqIDIsIDIpLCAxNik7XG4gICAgICAgICAgcmV0LmVuY3J5cHQuaXZiW2ldID0gaW07XG4gICAgICAgIH0gXG4gICAgICAgIHJldC5lbmNyeXB0Lml2ID0gaXY7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNM1U4UGFyc2VyO1xuIiwiaW1wb3J0IHsgTmFsdW5pdCB9IGZyb20gJ3hncGxheWVyLWNvZGVjJztcbmltcG9ydCB7IEF1ZGlvVHJhY2ssIFZpZGVvVHJhY2sgfSBmcm9tICd4Z3BsYXllci1idWZmZXInO1xuaW1wb3J0IHtcbiAgQXVkaW9UcmFja01ldGEsXG4gIFZpZGVvVHJhY2tNZXRhLFxuICBBdWRpb1RyYWNrU2FtcGxlLFxuICBWaWRlb1RyYWNrU2FtcGxlLFxuICBFVkVOVFMsXG4gIFN0cmVhbVxufSBmcm9tICd4Z3BsYXllci11dGlscyc7XG5cbmNvbnN0IERFTVVYX0VWRU5UUyA9IEVWRU5UUy5ERU1VWF9FVkVOVFM7XG5jb25zdCBTdHJlYW1UeXBlID0ge1xuICAweDAxOiBbJ3ZpZGVvJywgJ01QRUctMSddLFxuICAweDAyOiBbJ3ZpZGVvJywgJ01QRUctMiddLFxuICAweDFiOiBbJ3ZpZGVvJywgJ0FWQy5IMjY0J10sXG4gIDB4ZWE6IFsndmlkZW8nLCAnVkMtMSddLFxuICAweDAzOiBbJ2F1ZGlvJywgJ01QRUctMSddLFxuICAweDA0OiBbJ2F1ZGlvJywgJ01QRUctMiddLFxuICAweDBmOiBbJ2F1ZGlvJywgJ01QRUctMi5BQUMnXSxcbiAgMHgxMTogWydhdWRpbycsICdNUEVHLTQuQUFDJ10sXG4gIDB4ODA6IFsnYXVkaW8nLCAnTFBDTSddLFxuICAweDgxOiBbJ2F1ZGlvJywgJ0FDMyddLFxuICAweDA2OiBbJ2F1ZGlvJywgJ0FDMyddLFxuICAweDgyOiBbJ2F1ZGlvJywgJ0RUUyddLFxuICAweDgzOiBbJ2F1ZGlvJywgJ0RvbGJ5IFRydWVIRCddLFxuICAweDg0OiBbJ2F1ZGlvJywgJ0FDMy1QbHVzJ10sXG4gIDB4ODU6IFsnYXVkaW8nLCAnRFRTLUhEJ10sXG4gIDB4ODY6IFsnYXVkaW8nLCAnRFRTLU1BJ10sXG4gIDB4YTE6IFsnYXVkaW8nLCAnQUMzLVBsdXMtU0VDJ10sXG4gIDB4YTI6IFsnYXVkaW8nLCAnRFRTLUhELVNFQyddXG59O1xuXG5jbGFzcyBUc0RlbXV4ZXIge1xuICBjb25zdHJ1Y3RvciAoY29uZmlncykge1xuICAgIHRoaXMuY29uZmlncyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZ3MpO1xuICAgIHRoaXMuZGVtdXhpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnBhdCA9IFtdO1xuICAgIHRoaXMucG10ID0gW107XG4gICAgdGhpcy5faGFzVmlkZW9NZXRhID0gZmFsc2U7XG4gICAgdGhpcy5faGFzQXVkaW9NZXRhID0gZmFsc2U7XG4gIH1cblxuICBpbml0ICgpIHtcbiAgICB0aGlzLm9uKERFTVVYX0VWRU5UUy5ERU1VWF9TVEFSVCwgdGhpcy5kZW11eC5iaW5kKHRoaXMpKVxuICB9XG5cbiAgZGVtdXggKGZyYWcpIHtcbiAgICBpZiAodGhpcy5kZW11eGluZykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IGJ1ZmZlciA9IHRoaXMuaW5wdXRCdWZmZXI7XG4gICAgbGV0IGZyYWdzID0geyBwYXQ6IFtdLCBwbXQ6IFtdIH07XG4gICAgbGV0IHBlc2VzID0ge307XG5cbiAgICAvLyBSZWFkIFRTIHNlZ21lbnRcbiAgICB3aGlsZSAoYnVmZmVyLmxlbmd0aCA+PSAxODgpIHtcbiAgICAgIGlmIChidWZmZXIubGVuZ3RoID49IDEgJiYgYnVmZmVyLmFycmF5WzBdW2J1ZmZlci5vZmZzZXRdICE9PSA3MSkge1xuICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLlRBRywgbmV3IEVycm9yKGBVbnRydXN0IHN5bmMgY29kZTogJHtidWZmZXIuYXJyYXlbMF1bYnVmZmVyLm9mZnNldF19LCB0cnkgdG8gcmVjb3ZlcjtgKSwgZmFsc2UpO1xuICAgICAgfVxuICAgICAgd2hpbGUgKGJ1ZmZlci5sZW5ndGggPj0gMSAmJiBidWZmZXIuYXJyYXlbMF1bYnVmZmVyLm9mZnNldF0gIT09IDcxKSB7XG4gICAgICAgIGJ1ZmZlci5zaGlmdCgxKTtcbiAgICAgIH1cbiAgICAgIGxldCBidWYgPSBidWZmZXIuc2hpZnQoMTg4KTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGJ1Zik7XG4gICAgICBsZXQgdHNTdHJlYW0gPSBuZXcgU3RyZWFtKGJ1Zi5idWZmZXIpO1xuICAgICAgbGV0IHRzID0ge307XG4gICAgICBUc0RlbXV4ZXIucmVhZCh0c1N0cmVhbSwgdHMsIGZyYWdzKTtcbiAgICAgIGlmICh0cy5wZXMpIHtcbiAgICAgICAgaWYgKCFwZXNlc1t0cy5oZWFkZXIucGlkXSkge1xuICAgICAgICAgIHBlc2VzW3RzLmhlYWRlci5waWRdID0gW107XG4gICAgICAgIH1cbiAgICAgICAgcGVzZXNbdHMuaGVhZGVyLnBpZF0ucHVzaCh0cy5wZXMpO1xuICAgICAgICB0cy5wZXMuRVMuYnVmZmVyID0gW3RzLnBlcy5FUy5idWZmZXJdO1xuICAgICAgfSBlbHNlIGlmIChwZXNlc1t0cy5oZWFkZXIucGlkXSkge1xuICAgICAgICBwZXNlc1t0cy5oZWFkZXIucGlkXVtwZXNlc1t0cy5oZWFkZXIucGlkXS5sZW5ndGggLSAxXS5FUy5idWZmZXIucHVzaCh0cy5wYXlsb2FkLnN0cmVhbSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IEF1ZGlvT3B0aW9ucyA9IGZyYWc7XG4gICAgbGV0IFZpZGVvT3B0aW9ucyA9IGZyYWc7XG5cbiAgICAvLyBHZXQgRnJhbWVzIGRhdGFcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE9iamVjdC5rZXlzKHBlc2VzKS5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGVwZXNlcyA9IHBlc2VzW09iamVjdC5rZXlzKHBlc2VzKVtpXV07XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGVwZXNlcy5sZW5ndGg7IGorKykge1xuICAgICAgICBlcGVzZXNbal0uaWQgPSBPYmplY3Qua2V5cyhwZXNlcylbaV07XG4gICAgICAgIGVwZXNlc1tqXS5FUy5idWZmZXIgPSBUc0RlbXV4ZXIuTWVyZ2UoZXBlc2VzW2pdLkVTLmJ1ZmZlcik7XG4gICAgICAgIGlmIChlcGVzZXNbal0udHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgICAgIHRoaXMucHVzaEF1ZGlvU2FtcGxlKGVwZXNlc1tqXSwgQXVkaW9PcHRpb25zKTtcbiAgICAgICAgICBBdWRpb09wdGlvbnMgPSB7fTtcbiAgICAgICAgfSBlbHNlIGlmIChlcGVzZXNbal0udHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgIHRoaXMucHVzaFZpZGVvU2FtcGxlKGVwZXNlc1tqXSwgVmlkZW9PcHRpb25zKTtcbiAgICAgICAgICBWaWRlb09wdGlvbnMgPSB7fTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9oYXNBdWRpb01ldGEpIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfQ09NUExFVEUsICdhdWRpbycpO1xuICAgIH1cbiAgICBpZiAodGhpcy5faGFzVmlkZW9NZXRhKSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0NPTVBMRVRFLCAndmlkZW8nKTtcbiAgICB9XG4gIH1cblxuICBwdXNoQXVkaW9TYW1wbGUgKHBlcywgb3B0aW9ucykge1xuICAgIGxldCB0cmFjaztcbiAgICBpZiAoIXRoaXMuX3RyYWNrcy5hdWRpb1RyYWNrKSB7XG4gICAgICB0aGlzLl90cmFja3MuYXVkaW9UcmFjayA9IG5ldyBBdWRpb1RyYWNrKCk7XG4gICAgICB0cmFjayA9IHRoaXMuX3RyYWNrcy5hdWRpb1RyYWNrO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cmFjayA9IHRoaXMuX3RyYWNrcy5hdWRpb1RyYWNrO1xuICAgIH1cbiAgICBsZXQgbWV0YSA9IG5ldyBBdWRpb1RyYWNrTWV0YSh7XG4gICAgICBhdWRpb1NhbXBsZVJhdGU6IHBlcy5FUy5mcmVxdWVuY2UsXG4gICAgICBzYW1wbGVSYXRlOiBwZXMuRVMuZnJlcXVlbmNlLFxuICAgICAgY2hhbm5lbENvdW50OiBwZXMuRVMuY2hhbm5lbCxcbiAgICAgIGNvZGVjOiAnbXA0YS40MC4nICsgcGVzLkVTLmF1ZGlvT2JqZWN0VHlwZSxcbiAgICAgIGNvbmZpZzogcGVzLkVTLmF1ZGlvQ29uZmlnLFxuICAgICAgaWQ6IDIsXG4gICAgICBzYW1wbGVSYXRlSW5kZXg6IHBlcy5FUy5mcmVxdWVuY3lJbmRleFxuICAgIH0pO1xuICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb24gPSBNYXRoLmZsb29yKDEwMjQgLyBtZXRhLmF1ZGlvU2FtcGxlUmF0ZSAqIG1ldGEudGltZXNjYWxlKTtcblxuICAgIGxldCBtZXRhRXF1YWwgPSBUc0RlbXV4ZXIuY29tcGFpcmVNZXRhKHRyYWNrLm1ldGEsIG1ldGEsIHRydWUpO1xuXG4gICAgaWYgKCF0aGlzLl9oYXNBdWRpb01ldGEgfHwgIW1ldGFFcXVhbCkge1xuICAgICAgdHJhY2subWV0YSA9IG1ldGE7XG4gICAgICB0aGlzLl9oYXNBdWRpb01ldGEgPSB0cnVlXG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgJ2F1ZGlvJyk7XG4gICAgfVxuXG4gICAgbGV0IGRhdGEgPSBuZXcgVWludDhBcnJheShwZXMuRVMuYnVmZmVyLmJ1ZmZlci5zbGljZShwZXMuRVMuYnVmZmVyLnBvc2l0aW9uLCBwZXMuRVMuYnVmZmVyLmxlbmd0aCkpO1xuICAgIGxldCBkdHMgPSBwYXJzZUludChwZXMucHRzIC8gOTApO1xuICAgIGxldCBwdHMgPSBwYXJzZUludChwZXMucHRzIC8gOTApO1xuICAgIGxldCBzYW1wbGUgPSBuZXcgQXVkaW9UcmFja1NhbXBsZSh7ZHRzLCBwdHMsIGRhdGEsIG9wdGlvbnN9KTtcbiAgICB0cmFjay5zYW1wbGVzLnB1c2goc2FtcGxlKTtcbiAgfVxuXG4gIHB1c2hWaWRlb1NhbXBsZSAocGVzLCBvcHRpb25zKSB7XG4gICAgbGV0IG5hbHMgPSBOYWx1bml0LmdldE5hbHVuaXRzKHBlcy5FUy5idWZmZXIpO1xuICAgIGxldCB0cmFjaztcbiAgICBsZXQgbWV0YSA9IG5ldyBWaWRlb1RyYWNrTWV0YSgpO1xuICAgIGlmICghdGhpcy5fdHJhY2tzLnZpZGVvVHJhY2spIHtcbiAgICAgIHRoaXMuX3RyYWNrcy52aWRlb1RyYWNrID0gbmV3IFZpZGVvVHJhY2soKTtcbiAgICAgIHRyYWNrID0gdGhpcy5fdHJhY2tzLnZpZGVvVHJhY2s7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYWNrID0gdGhpcy5fdHJhY2tzLnZpZGVvVHJhY2s7XG4gICAgfVxuICAgIGxldCBzYW1wbGVMZW5ndGggPSAwO1xuICAgIGxldCBzcHMgPSBmYWxzZTtcbiAgICBsZXQgcHBzID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgbmFsID0gbmFsc1tpXTtcbiAgICAgIGlmIChuYWwuc3BzKSB7XG4gICAgICAgIHNwcyA9IG5hbDtcbiAgICAgICAgdHJhY2suc3BzID0gbmFsLmJvZHk7XG4gICAgICAgIG1ldGEuY2hyb21hRm9ybWF0ID0gc3BzLnNwcy5jaHJvbWFfZm9ybWF0XG4gICAgICAgIG1ldGEuY29kZWMgPSAnYXZjMS4nO1xuICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IDQ7IGorKykge1xuICAgICAgICAgIHZhciBoID0gc3BzLmJvZHlbal0udG9TdHJpbmcoMTYpO1xuICAgICAgICAgIGlmIChoLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIGggPSAnMCcgKyBoO1xuICAgICAgICAgIH1cbiAgICAgICAgICBtZXRhLmNvZGVjICs9IGg7XG4gICAgICAgIH1cbiAgICAgICAgbWV0YS5jb2RlY0hlaWdodCA9IHNwcy5zcHMuY29kZWNfc2l6ZS5oZWlnaHQ7XG4gICAgICAgIG1ldGEuY29kZWNXaWR0aCA9IHNwcy5zcHMuY29kZWNfc2l6ZS53aWR0aDtcbiAgICAgICAgbWV0YS5mcmFtZVJhdGUgPSBzcHMuc3BzLmZyYW1lX3JhdGU7XG4gICAgICAgIG1ldGEuaWQgPSAxO1xuICAgICAgICBtZXRhLmxldmVsID0gc3BzLnNwcy5sZXZlbF9zdHJpbmc7XG4gICAgICAgIG1ldGEucHJlc2VudEhlaWdodCA9IHNwcy5zcHMucHJlc2VudF9zaXplLmhlaWdodDtcbiAgICAgICAgbWV0YS5wcmVzZW50V2lkdGggPSBzcHMuc3BzLnByZXNlbnRfc2l6ZS53aWR0aDtcbiAgICAgICAgbWV0YS5wcm9maWxlID0gc3BzLnNwcy5wcm9maWxlX3N0cmluZztcbiAgICAgICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA9IE1hdGguZmxvb3IobWV0YS50aW1lc2NhbGUgKiAoc3BzLnNwcy5mcmFtZV9yYXRlLmZwc19kZW4gLyBzcHMuc3BzLmZyYW1lX3JhdGUuZnBzX251bSkpO1xuICAgICAgICBtZXRhLnNhclJhdGlvID0gc3BzLnNwcy5zYXJfcmF0aW8gPyBzcHMuc3BzLnNhcl9yYXRpbyA6IHNwcy5zcHMucGFyX3JhdGlvO1xuICAgICAgfSBlbHNlIGlmIChuYWwucHBzKSB7XG4gICAgICAgIHRyYWNrLnBwcyA9IG5hbC5ib2R5O1xuICAgICAgICBwcHMgPSBuYWw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzYW1wbGVMZW5ndGggKz0gKDQgKyBuYWwuYm9keS5ieXRlTGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3BzICYmIHBwcykge1xuICAgICAgbWV0YS5hdmNjID0gTmFsdW5pdC5nZXRBdmNjKHNwcy5ib2R5LCBwcHMuYm9keSk7XG4gICAgICBsZXQgbWV0YUVxdWFsID0gVHNEZW11eGVyLmNvbXBhaXJlTWV0YSh0cmFjay5tZXRhLCBtZXRhLCB0cnVlKTtcbiAgICAgIGlmICghdGhpcy5faGFzVmlkZW9NZXRhIHx8ICFtZXRhRXF1YWwpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICBvcHRpb25zLm1ldGEgPSBPYmplY3QuYXNzaWduKHt9LCBtZXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgbWV0YTogT2JqZWN0LmFzc2lnbih7fSwgbWV0YSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdHJhY2subWV0YSA9IG1ldGE7XG4gICAgICAgIHRoaXMuX2hhc1ZpZGVvTWV0YSA9IHRydWVcbiAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICd2aWRlbycpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBkYXRhID0gbmV3IFVpbnQ4QXJyYXkoc2FtcGxlTGVuZ3RoKTtcbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICBsZXQgaXNLZXlmcmFtZSA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmFscy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IG5hbCA9IG5hbHNbaV07XG4gICAgICBsZXQgbGVuZ3RoID0gbmFsLmJvZHkuYnl0ZUxlbmd0aDtcbiAgICAgIGlmIChuYWwuaWRyKSB7XG4gICAgICAgIGlzS2V5ZnJhbWUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKCFuYWwucHBzICYmICFuYWwuc3BzKSB7XG4gICAgICAgIGRhdGEuc2V0KG5ldyBVaW50OEFycmF5KFtsZW5ndGggPj4+IDI0ICYgMHhmZixcbiAgICAgICAgICBsZW5ndGggPj4+IDE2ICYgMHhmZixcbiAgICAgICAgICBsZW5ndGggPj4+IDggJiAweGZmLFxuICAgICAgICAgIGxlbmd0aCAmIDB4ZmZcbiAgICAgICAgXSksIG9mZnNldCk7XG4gICAgICAgIG9mZnNldCArPSA0O1xuICAgICAgICBkYXRhLnNldChuYWwuYm9keSwgb2Zmc2V0KTtcbiAgICAgICAgb2Zmc2V0ICs9IGxlbmd0aDtcbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IHNhbXBsZSA9IG5ldyBWaWRlb1RyYWNrU2FtcGxlKHtcbiAgICAgIGR0czogcGFyc2VJbnQocGVzLmR0cyAvIDkwKSxcbiAgICAgIHB0czogcGFyc2VJbnQocGVzLnB0cyAvIDkwKSxcbiAgICAgIGN0czogKHBlcy5wdHMgLSBwZXMuZHRzKSAvIDkwLFxuICAgICAgb3JpZ2luRHRzOiBwZXMuZHRzLFxuICAgICAgaXNLZXlmcmFtZSxcbiAgICAgIGRhdGEsXG4gICAgICBvcHRpb25zXG4gICAgfSlcbiAgICB0cmFjay5zYW1wbGVzLnB1c2goc2FtcGxlKTtcbiAgfVxuXG4gIGRlc3RvcnkgKCkge1xuICAgIHRoaXMub2ZmKERFTVVYX0VWRU5UUy5ERU1VWF9TVEFSVCwgdGhpcy5kZW11eCk7XG4gICAgdGhpcy5jb25maWdzID0ge307XG4gICAgdGhpcy5kZW11eGluZyA9IGZhbHNlO1xuICAgIHRoaXMucGF0ID0gW107XG4gICAgdGhpcy5wbXQgPSBbXTtcbiAgICB0aGlzLl9oYXNWaWRlb01ldGEgPSBmYWxzZTtcbiAgICB0aGlzLl9oYXNBdWRpb01ldGEgPSBmYWxzZTtcbiAgfVxuXG4gIHN0YXRpYyBjb21wYWlyZUFycmF5IChhLCBiLCB0eXBlKSB7XG4gICAgbGV0IGFsID0gMDtcbiAgICBsZXQgYmwgPSAwO1xuICAgIGlmICh0eXBlID09PSAnVWludDhBcnJheScpIHtcbiAgICAgIGFsID0gYS5ieXRlTGVuZ3RoO1xuICAgICAgYmwgPSBiLmJ5dGVMZW5ndGg7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnQXJyYXknKSB7XG4gICAgICBhbCA9IGEubGVuZ3RoO1xuICAgICAgYmwgPSBiLmxlbmd0aDtcbiAgICB9XG4gICAgaWYgKGFsICE9PSBibCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWw7IGkrKykge1xuICAgICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN0YXRpYyBjb21wYWlyZU1ldGEgKGEsIGIsIGlnbm9yZUR1cmF0aW9uKSB7XG4gICAgaWYgKCFhIHx8ICFiKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDAsIGsgPSBPYmplY3Qua2V5cyhhKS5sZW5ndGg7IGkgPCBrOyBpKyspIHtcbiAgICAgIGxldCBpdGVtYSA9IGFbT2JqZWN0LmtleXMoYSlbaV1dO1xuICAgICAgbGV0IGl0ZW1iID0gYltPYmplY3Qua2V5cyhhKVtpXV07XG4gICAgICBpZiAodHlwZW9mIGl0ZW1hICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAoKGlnbm9yZUR1cmF0aW9uICYmIE9iamVjdC5rZXlzKGEpW2ldICE9PSAnZHVyYXRpb24nICYmIE9iamVjdC5rZXlzKGEpW2ldICE9PSAncmVmU2FtcGxlRHVyYXRpb24nICYmIE9iamVjdC5rZXlzKGEpW2ldICE9PSAncmVmU2FtcGxlRHVyYXRpb25GaXhlZCcpICYmIGl0ZW1hICE9PSBpdGVtYikge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpdGVtYS5ieXRlTGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGl0ZW1iLmJ5dGVMZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIVRzRGVtdXhlci5jb21wYWlyZUFycmF5KGl0ZW1hLCBpdGVtYiwgJ1VpbnQ4QXJyYXknKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpdGVtYS5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoaXRlbWIubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFUc0RlbXV4ZXIuY29tcGFpcmVBcnJheShpdGVtYSwgaXRlbWIsICdBcnJheScpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIVRzRGVtdXhlci5jb21wYWlyZU1ldGEoaXRlbWEsIGl0ZW1iKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN0YXRpYyBNZXJnZSAoYnVmZmVycykge1xuICAgIGxldCBkYXRhO1xuICAgIGxldCBsZW5ndGggPSAwO1xuICAgIGxldCBvZmZzZXQgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnVmZmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgbGVuZ3RoICs9IChidWZmZXJzW2ldLmxlbmd0aCAtIGJ1ZmZlcnNbaV0ucG9zaXRpb24pO1xuICAgIH1cblxuICAgIGRhdGEgPSBuZXcgVWludDhBcnJheShsZW5ndGgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnVmZmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGJ1ZmZlciA9IGJ1ZmZlcnNbaV07XG4gICAgICBkYXRhLnNldChuZXcgVWludDhBcnJheShidWZmZXIuYnVmZmVyLCBidWZmZXIucG9zaXRpb24pLCBvZmZzZXQpO1xuICAgICAgb2Zmc2V0ICs9IGJ1ZmZlci5sZW5ndGggLSBidWZmZXIucG9zaXRpb247XG4gICAgfVxuICAgIHJldHVybiBuZXcgU3RyZWFtKGRhdGEuYnVmZmVyKTtcbiAgfVxuXG4gIHN0YXRpYyByZWFkIChzdHJlYW0sIHRzLCBmcmFncykge1xuICAgIFRzRGVtdXhlci5yZWFkSGVhZGVyKHN0cmVhbSwgdHMpO1xuICAgIFRzRGVtdXhlci5yZWFkUGF5bG9hZChzdHJlYW0sIHRzLCBmcmFncyk7XG4gICAgaWYgKHRzLmhlYWRlci5wYWNrZXQgPT09ICdNRURJQScgJiYgdHMuaGVhZGVyLnBheWxvYWQgPT09IDEgJiYgIXRzLnVua25vd25QSURzKSB7XG4gICAgICB0cy5wZXMgPSBUc0RlbXV4ZXIuUEVTKHRzKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgcmVhZFBheWxvYWQgKHN0cmVhbSwgdHMsIGZyYWdzKSB7XG4gICAgbGV0IGhlYWRlciA9IHRzLmhlYWRlclxuICAgIGxldCBwaWQgPSBoZWFkZXIucGlkO1xuICAgIHN3aXRjaCAocGlkKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIFRzRGVtdXhlci5QQVQoc3RyZWFtLCB0cywgZnJhZ3MpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgVHNEZW11eGVyLkNBVChzdHJlYW0sIHRzLCBmcmFncyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBUc0RlbXV4ZXIuVFNEVChzdHJlYW0sIHRzLCBmcmFncyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAweDFmZmY6XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gVE9ETzogc29tZeeahOWGmeazleS4jeWkquWlve+8jOW+l+aUuVxuICAgICAgICBpZiAoZnJhZ3MucGF0LnNvbWUoKGl0ZW0pID0+IHsgcmV0dXJuIGl0ZW0ucGlkID09PSBwaWQ7IH0pKSB7XG4gICAgICAgICAgVHNEZW11eGVyLlBNVChzdHJlYW0sIHRzLCBmcmFncyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IHN0cyA9IGZyYWdzLnBtdCA/IGZyYWdzLnBtdC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ucGlkID09PSBwaWQpIDogW107XG4gICAgICAgICAgaWYgKHN0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBUc0RlbXV4ZXIuTWVkaWEoc3RyZWFtLCB0cywgU3RyZWFtVHlwZVtzdHNbMF0uc3RyZWFtVHlwZV1bMF0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRzLnVua25vd25QSURzID0gdHJ1ZTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHJlYWRIZWFkZXIgKHN0cmVhbSwgdHMpIHtcbiAgICBsZXQgaGVhZGVyID0ge307XG4gICAgaGVhZGVyLnN5bmMgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgbGV0IG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgIGhlYWRlci5lcnJvciA9IG5leHQgPj4+IDE1O1xuICAgIGhlYWRlci5wYXlsb2FkID0gbmV4dCA+Pj4gMTQgJiAxO1xuICAgIGhlYWRlci5wcmlvcml0eSA9IG5leHQgPj4+IDEzICYgMTtcbiAgICBoZWFkZXIucGlkID0gbmV4dCAmIDB4MWZmZjtcblxuICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG5cbiAgICBoZWFkZXIuc2NyYW1ibGluZyA9IG5leHQgPj4gNiAmIDB4MzsgLy8g5piv5ZCm5Yqg5a+G77yMMDDooajnpLrkuI3liqDlr4ZcblxuICAgIC8qKlxuICAgICAqIDAwIElTTy9JRUPmnKrmnaXkvb/nlKjkv53nlZlcbiAgICAgKiAwMSDmsqHmnInosIPmlbTlrZfmrrXvvIzku4XlkKvmnIkxODRC5pyJ5pWI5YeA6I23XG4gICAgICogMDIg5rKh5pyJ5pyJ5pWI5YeA6I2377yM5LuF5ZCr5pyJMTgzQuiwg+aVtOWtl+autVxuICAgICAqIDAzIDB+MTgyQuiwg+aVtOWtl+auteWQjuS4uuacieaViOWHgOiNt1xuICAgICAqL1xuICAgIGhlYWRlci5hZGFwdGF0aW9uID0gbmV4dCA+PiA0ICYgMHgzO1xuICAgIGhlYWRlci5jb250aW51aXR5ID0gbmV4dCAmIDE1O1xuICAgIGhlYWRlci5wYWNrZXQgPSBoZWFkZXIucGlkID09PSAwID8gJ1BBVCcgOiAnTUVESUEnO1xuICAgIHRzLmhlYWRlciA9IGhlYWRlcjtcbiAgfVxuXG4gIHN0YXRpYyBQQVQgKHN0cmVhbSwgdHMsIGZyYWdzKSB7XG4gICAgbGV0IHJldCA9IHt9O1xuICAgIGxldCBuZXh0ID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHN0cmVhbS5za2lwKG5leHQpO1xuICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgcmV0LnRhYmVsSUQgPSBuZXh0O1xuICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgIHJldC5lcnJvciA9IG5leHQgPj4+IDc7XG4gICAgcmV0Lnplcm8gPSBuZXh0ID4+PiA2ICYgMTtcbiAgICByZXQuc2VjdGlvbkxlbmd0aCA9IG5leHQgJiAweGZmZjtcbiAgICByZXQuc3RyZWFtSUQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgIHJldC5jdXJyZW50ID0gc3RyZWFtLnJlYWRVaW50OCgpICYgMTtcbiAgICByZXQuc2VjdGlvbk51bWJlciA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICByZXQubGFzdFNlY3Rpb25OdW1iZXIgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgbGV0IE4gPSAocmV0LnNlY3Rpb25MZW5ndGggLSA5KSAvIDQ7XG4gICAgbGV0IGxpc3QgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE47IGkrKykge1xuICAgICAgbGV0IHByb2dyYW1OdW1iZXIgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgICAgbGV0IHBpZCA9IHN0cmVhbS5yZWFkVWludDE2KCkgJiAweDFmZmY7XG4gICAgICBsaXN0LnB1c2goe1xuICAgICAgICBwcm9ncmFtOiBwcm9ncmFtTnVtYmVyLFxuICAgICAgICBwaWQsXG4gICAgICAgIHR5cGU6IHByb2dyYW1OdW1iZXIgPT09IDAgPyAnbmV0d29yaycgOiAnbWFwUElEJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChsaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgIGZyYWdzLnBhdCA9IGZyYWdzLnBhdC5jb25jYXQobGlzdCk7XG4gICAgfVxuICAgIHJldC5saXN0ID0gbGlzdDtcbiAgICByZXQucHJvZ3JhbSA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgcmV0LnBpZCA9IHN0cmVhbS5yZWFkVWludDE2KCkgJiAweDFmZmY7XG4gICAgdHMucGF5bG9hZCA9IHJldDtcbiAgICAvLyBUT0RPIENSQ1xuICB9XG5cbiAgc3RhdGljIFBNVCAoc3RyZWFtLCB0cywgZnJhZ3MpIHtcbiAgICBsZXQgcmV0ID0ge307XG4gICAgbGV0IGhlYWRlciA9IHRzLmhlYWRlcjtcbiAgICBoZWFkZXIucGFja2V0ID0gJ1BNVCc7XG4gICAgbGV0IG5leHQgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgc3RyZWFtLnNraXAobmV4dCk7XG4gICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICByZXQudGFibGVJRCA9IG5leHQ7XG4gICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgcmV0LnNlY3Rpb25MZW5ndGggPSBuZXh0ICYgMHhmZmY7XG4gICAgcmV0LnByb2dyYW0gPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgIHJldC5jdXJyZW50ID0gc3RyZWFtLnJlYWRVaW50OCgpICYgMTtcbiAgICByZXQub3JkZXIgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgcmV0Lmxhc3RPcmRlciA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICByZXQuUENSX1BJRCA9IHN0cmVhbS5yZWFkVWludDE2KCkgJiAweDFmZmY7XG4gICAgcmV0LnByb2dyYW1MZW5ndGggPSBzdHJlYW0ucmVhZFVpbnQxNigpICYgMHhmZmY7XG4gICAgbGV0IE4gPSAocmV0LnNlY3Rpb25MZW5ndGggLSAxMykgLyA1O1xuICAgIGxldCBsaXN0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOOyBpKyspIHtcbiAgICAgIGxpc3QucHVzaCh7XG4gICAgICAgIHN0cmVhbVR5cGU6IHN0cmVhbS5yZWFkVWludDgoKSxcbiAgICAgICAgcGlkOiBzdHJlYW0ucmVhZFVpbnQxNigpICYgMHgxZmZmLCAvLyAweDA3ZTUg6KeG6aKR77yMMHgwN2U2XG4gICAgICAgIGVzOiBzdHJlYW0ucmVhZFVpbnQxNigpICYgMHhmZmZcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXQubGlzdCA9IGxpc3Q7XG4gICAgaWYgKCF0aGlzLnBtdCkge1xuICAgICAgdGhpcy5wbXQgPSBbXTtcbiAgICB9XG4gICAgZnJhZ3MucG10ID0gdGhpcy5wbXQuY29uY2F0KGxpc3QubWFwKChpdGVtKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwaWQ6IGl0ZW0ucGlkLFxuICAgICAgICBlczogaXRlbS5lcyxcbiAgICAgICAgc3RyZWFtVHlwZTogaXRlbS5zdHJlYW1UeXBlLFxuICAgICAgICBwcm9ncmFtOiByZXQucHJvZ3JhbVxuICAgICAgfTtcbiAgICB9KSk7XG4gICAgdHMucGF5bG9hZCA9IHJldDtcbiAgfVxuXG4gIHN0YXRpYyBNZWRpYSAoc3RyZWFtLCB0cywgdHlwZSkge1xuICAgIGxldCBoZWFkZXIgPSB0cy5oZWFkZXI7XG4gICAgbGV0IHBheWxvYWQgPSB7fTtcbiAgICBoZWFkZXIudHlwZSA9IHR5cGU7XG4gICAgaWYgKGhlYWRlci5hZGFwdGF0aW9uID09PSAweDAzKSB7XG4gICAgICBwYXlsb2FkLmFkYXB0YXRpb25MZW5ndGggPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgICBpZiAocGF5bG9hZC5hZGFwdGF0aW9uTGVuZ3RoID4gMCkge1xuICAgICAgICBsZXQgbmV4dCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICAgICAgcGF5bG9hZC5kaXNjb250aW51ZSA9IG5leHQgPj4+IDc7XG4gICAgICAgIHBheWxvYWQuYWNjZXNzID0gbmV4dCA+Pj4gNiAmIDB4MDE7XG4gICAgICAgIHBheWxvYWQucHJpb3JpdHkgPSBuZXh0ID4+PiA1ICYgMHgwMTtcbiAgICAgICAgcGF5bG9hZC5QQ1IgPSBuZXh0ID4+PiA0ICYgMHgwMTtcbiAgICAgICAgcGF5bG9hZC5PUENSID0gbmV4dCA+Pj4gMyAmIDB4MDE7XG4gICAgICAgIHBheWxvYWQuc3BsaWNlUG9pbnQgPSBuZXh0ID4+PiAyICYgMHgwMTtcbiAgICAgICAgcGF5bG9hZC50cmFuc3BvcnRQcml2YXRlID0gbmV4dCA+Pj4gMSAmIDB4MDE7XG4gICAgICAgIHBheWxvYWQuYWRhcHRhdGlvbkZpZWxkID0gbmV4dCAmIDB4MDE7XG4gICAgICAgIGxldCBfc3RhcnQgPSBzdHJlYW0ucG9zaXRpb247XG4gICAgICAgIGlmIChwYXlsb2FkLlBDUiA9PT0gMSkge1xuICAgICAgICAgIHBheWxvYWQucHJvZ3JhbUNsb2NrQmFzZSA9IHN0cmVhbS5yZWFkVWludDMyKCkgPDwgMTtcbiAgICAgICAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBwYXlsb2FkLnByb2dyYW1DbG9ja0Jhc2UgfD0gbmV4dCA+Pj4gMTU7XG4gICAgICAgICAgcGF5bG9hZC5wcm9ncmFtQ2xvY2tFeHRlbnNpb24gPSBuZXh0ICYgMHgxZmY7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBheWxvYWQuT1BDUiA9PT0gMSkge1xuICAgICAgICAgIHBheWxvYWQub3JpZ2luUHJvZ3JhbUNsb2NrQmFzZSA9IHN0cmVhbS5yZWFkVWludDMyKCkgPDwgMTtcbiAgICAgICAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBwYXlsb2FkLm9yaWdpblByb2dyYW1DbG9ja0Jhc2UgKz0gbmV4dCA+Pj4gMTU7XG4gICAgICAgICAgcGF5bG9hZC5vcmlnaW5Qcm9ncmFtQ2xvY2tFeHRlbnNpb24gPSBuZXh0ICYgMHgxZmY7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBheWxvYWQuc3BsaWNlUG9pbnQgPT09IDEpIHtcbiAgICAgICAgICBwYXlsb2FkLnNwbGljZUNvdW50ZG93biA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF5bG9hZC50cmFuc3BvcnRQcml2YXRlID09PSAxKSB7XG4gICAgICAgICAgbGV0IGxlbmd0aCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICAgICAgICBsZXQgdHJhbnNwb3J0UHJpdmF0ZURhdGEgPSBbXTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0cmFuc3BvcnRQcml2YXRlRGF0YS5wdXNoKHN0cmVhbS5yZWFkVWludDgoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChwYXlsb2FkLmFkYXB0YXRpb25GaWVsZCA9PT0gMSkge1xuICAgICAgICAgIGxldCBsZW5ndGggPSBzdHJlYW0ucmVhZFVpbnQ4KClcbiAgICAgICAgICBsZXQgbmV4dCA9IHN0cmVhbS5yZWFkVWludDgoKVxuICAgICAgICAgIGxldCBzdGFydCA9IHN0cmVhbS5wb3NpdGlvbjtcbiAgICAgICAgICBsZXQgbHR3ID0gbmV4dCA+Pj4gNztcbiAgICAgICAgICBsZXQgcGllY2V3aXNlID0gbmV4dCA+Pj4gNiAmIDB4MTtcbiAgICAgICAgICBsZXQgc2VhbWxlc3MgPSBuZXh0ID4+PiA1ICYgMHgxO1xuICAgICAgICAgIGlmIChsdHcgPT09IDEpIHtcbiAgICAgICAgICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgICAgICAgICAgcGF5bG9hZC5sdHdWYWxpZCA9IG5leHQgPj4+IDE1O1xuICAgICAgICAgICAgcGF5bG9hZC5sdHdPZmZzZXQgPSBuZXh0ICYgMHhlZmZmO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocGllY2V3aXNlID09PSAxKSB7XG4gICAgICAgICAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MjQoKTtcbiAgICAgICAgICAgIHBheWxvYWQucGllY2V3aXNlUmF0ZSA9IG5leHQgJiAweDNmZmZmZjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNlYW1sZXNzID09PSAxKSB7XG4gICAgICAgICAgICBuZXh0ID0gc3RyZWFtLnJlYWRJbnQ4KCk7XG4gICAgICAgICAgICBwYXlsb2FkLnNwbGljZVR5cGUgPSBuZXh0ID4+PiA0O1xuICAgICAgICAgICAgcGF5bG9hZC5kdHNOZXh0QVUxID0gbmV4dCA+Pj4gMSAmIDB4NztcbiAgICAgICAgICAgIHBheWxvYWQubWFya2VyMSA9IG5leHQgJiAweDE7XG4gICAgICAgICAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICAgIHBheWxvYWQuZHRzTmV4dEFVMiA9IG5leHQgPj4+IDE7XG4gICAgICAgICAgICBwYXlsb2FkLm1hcmtlcjIgPSBuZXh0ICYgMHgxO1xuICAgICAgICAgICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgICAgICAgICBwYXlsb2FkLmR0c05leHRBVTMgPSBuZXh0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdHJlYW0uc2tpcChsZW5ndGggLSAxIC0gKHN0cmVhbS5wb3NpdGlvbiAtIHN0YXJ0KSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxhc3RTdHVmZmluZyA9IHBheWxvYWQuYWRhcHRhdGlvbkxlbmd0aCAtIDEgLSAoc3RyZWFtLnBvc2l0aW9uIC0gX3N0YXJ0KTtcbiAgICAgICAgc3RyZWFtLnNraXAobGFzdFN0dWZmaW5nKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcGF5bG9hZC5zdHJlYW0gPSBuZXcgU3RyZWFtKHN0cmVhbS5idWZmZXIuc2xpY2Uoc3RyZWFtLnBvc2l0aW9uKSk7XG4gICAgdHMucGF5bG9hZCA9IHBheWxvYWQ7XG4gIH1cblxuICBzdGF0aWMgUEVTICh0cykge1xuICAgIGxldCByZXQgPSB7fTtcbiAgICBsZXQgYnVmZmVyID0gdHMucGF5bG9hZC5zdHJlYW07XG5cbiAgICBsZXQgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDI0KCk7XG4gICAgaWYgKG5leHQgIT09IDEpIHtcbiAgICAgIHJldC5FUyA9IHt9O1xuICAgICAgcmV0LkVTLmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHN0cmVhbUlEID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgaWYgKHN0cmVhbUlEID49IDB4ZTAgJiYgc3RyZWFtSUQgPD0gMHhlZikge1xuICAgICAgICByZXQudHlwZSA9ICd2aWRlbyc7XG4gICAgICB9XG4gICAgICBpZiAoc3RyZWFtSUQgPj0gMHhjMCAmJiBzdHJlYW1JRCA8PSAweGRmKSB7XG4gICAgICAgIHJldC50eXBlID0gJ2F1ZGlvJztcbiAgICAgIH1cbiAgICAgIGxldCBwYWNrZXRMZW5ndGggPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgcmV0LnBhY2tldExlbmd0aCA9IHBhY2tldExlbmd0aDtcbiAgICAgIGlmIChyZXQudHlwZSA9PT0gJ3ZpZGVvJyB8fCByZXQudHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgICBsZXQgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgbGV0IGZpcnN0ID0gbmV4dCA+Pj4gNjtcbiAgICAgICAgaWYgKGZpcnN0ICE9PSAweDAyKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdlcnJvciB3aGVuIHBhcnNlIHBlcyBoZWFkZXInKTtcbiAgICAgICAgfVxuICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICByZXQucHRzRFRTRmxhZyA9IG5leHQgPj4+IDY7XG4gICAgICAgIHJldC5lc2NyRmxhZyA9IG5leHQgPj4+IDUgJiAweDAxO1xuICAgICAgICByZXQuZXNSYXRlRmxhZyA9IG5leHQgPj4+IDQgJiAweDAxO1xuICAgICAgICByZXQuZHNtRmxhZyA9IG5leHQgPj4+IDMgJiAweDAxO1xuICAgICAgICByZXQuYWRkaXRpb25hbEZsYWcgPSBuZXh0ID4+PiAyICYgMHgwMTtcbiAgICAgICAgcmV0LmNyY0ZsYWcgPSBuZXh0ID4+PiAxICYgMHgwMTtcbiAgICAgICAgcmV0LmV4dGVuc2lvbkZsYWcgPSBuZXh0ICYgMHgwMTtcbiAgICAgICAgcmV0LnBlc0hlYWRlckxlbmd0aCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgbGV0IE4xID0gcmV0LnBlc0hlYWRlckxlbmd0aDtcblxuICAgICAgICBpZiAocmV0LnB0c0RUU0ZsYWcgPT09IDIpIHtcbiAgICAgICAgICBsZXQgcHRzID0gW107XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgICBwdHMucHVzaChuZXh0ID4+PiAxICYgMHgwNyk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgcHRzLnB1c2gobmV4dCA+Pj4gMSk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgcHRzLnB1c2gobmV4dCA+Pj4gMSk7XG4gICAgICAgICAgcmV0LnB0cyA9IChwdHNbMF0gPDwgMzAgfCBwdHNbMV0gPDwgMTUgfCBwdHNbMl0pO1xuICAgICAgICAgIE4xIC09IDU7XG4gICAgICAgICAgLy8g6KeG6aKR5aaC5p6c5rKh5pyJZHRz55SocHRzXG4gICAgICAgICAgaWYgKHJldC50eXBlID09PSAndmlkZW8nKSB7XG4gICAgICAgICAgICByZXQuZHRzID0gcmV0LnB0cztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldC5wdHNEVFNGbGFnID09PSAzKSB7XG4gICAgICAgICAgbGV0IHB0cyA9IFtdO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQ4KCk7XG4gICAgICAgICAgcHRzLnB1c2gobmV4dCA+Pj4gMSAmIDB4MDcpO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgICAgIHB0cy5wdXNoKG5leHQgPj4+IDEpO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgICAgIHB0cy5wdXNoKG5leHQgPj4+IDEpO1xuICAgICAgICAgIHJldC5wdHMgPSAocHRzWzBdIDw8IDMwIHwgcHRzWzFdIDw8IDE1IHwgcHRzWzJdKTtcbiAgICAgICAgICBsZXQgZHRzID0gW107XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgICBkdHMucHVzaChuZXh0ID4+PiAxICYgMHgwNyk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgZHRzLnB1c2gobmV4dCA+Pj4gMSk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgZHRzLnB1c2gobmV4dCA+Pj4gMSk7XG4gICAgICAgICAgcmV0LmR0cyA9IChkdHNbMF0gPDwgMzAgfCBkdHNbMV0gPDwgMTUgfCBkdHNbMl0pO1xuICAgICAgICAgIE4xIC09IDEwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXQuZXNjckZsYWcgPT09IDEpIHtcbiAgICAgICAgICBsZXQgZXNjciA9IFtdXG4gICAgICAgICAgbGV0IGV4ID0gW107XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgICBlc2NyLnB1c2gobmV4dCA+Pj4gMyAmIDB4MDcpO1xuICAgICAgICAgIGVzY3IucHVzaChuZXh0ICYgMHgwMyk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgZXNjci5wdXNoKG5leHQgPj4+IDEzKTtcbiAgICAgICAgICBlc2NyLnB1c2gobmV4dCAmIDB4MDMpO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgICAgIGVzY3IucHVzaChuZXh0ID4+PiAxMyk7XG4gICAgICAgICAgZXgucHVzaChuZXh0ICYgMHgwMyk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgICBleC5wdXNoKG5leHQgPj4+IDEpO1xuICAgICAgICAgIHJldC5lc2NyID0gKGVzY3JbMF0gPDwgMzAgfCBlc2NyWzFdIDw8IDI4IHwgZXNjclsyXSA8PCAxNSB8IGVzY3JbM10gPDwgMTMgfCBlc2NyWzRdKSAqIDMwMCArIChleFswXSA8PCA3IHwgZXhbMV0pO1xuICAgICAgICAgIE4xIC09IDY7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldC5lc1JhdGVGbGFnID09PSAxKSB7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDI0KCk7XG4gICAgICAgICAgcmV0LmVzUmF0ZSA9IG5leHQgPj4+IDEgJiAweDNmZmZmZjtcbiAgICAgICAgICBOMSAtPSAzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXQuZHNtRmxhZyA9PT0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IHN1cHBvcnQgRFNNX3RyaWNrX21vZGUnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0LmFkZGl0aW9uYWxGbGFnID09PSAxKSB7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgICByZXQuYWRkaXRpb25hbENvcHlJbmZvID0gbmV4dCAmIDB4N2Y7XG4gICAgICAgICAgTjEgLT0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0LmNyY0ZsYWcgPT09IDEpIHtcbiAgICAgICAgICByZXQucGVzQ1JDID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBOMSAtPSAyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXQuZXh0ZW5zaW9uRmxhZyA9PT0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IHN1cHBvcnQgZXh0ZW5zaW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE4xID4gMCkge1xuICAgICAgICAgIGJ1ZmZlci5za2lwKE4xKTtcbiAgICAgICAgfVxuICAgICAgICByZXQuRVMgPSBUc0RlbXV4ZXIuRVMoYnVmZmVyLCByZXQudHlwZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Zvcm1hdCBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBzdGF0aWMgRVMgKGJ1ZmZlciwgdHlwZSkge1xuICAgIGxldCBuZXh0O1xuICAgIGxldCByZXQgPSB7fTtcbiAgICBpZiAodHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDMyKCk7XG4gICAgICBpZiAobmV4dCAhPT0gMSkge1xuICAgICAgICBidWZmZXIuYmFjayg0KTtcbiAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDI0KCk7XG4gICAgICAgIGlmIChuZXh0ICE9PSAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdoMjY0IG5hbCBoZWFkZXIgcGFyc2UgZmFpbGVkJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJ1ZmZlci5za2lwKDIpOy8vIDA5IEYwXG4gICAgICAvLyBUT0RPIHJlYWRuYWx1XG4gICAgICByZXQuYnVmZmVyID0gYnVmZmVyO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAvLyBhZHRz55qE5ZCM5q2l5a2X6IqC77yMMTLkvY1cbiAgICAgIGlmIChuZXh0ID4+PiA0ICE9PSAweGZmZikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FhYyBFUyBwYXJzZSBFcnJvcicpO1xuICAgICAgfVxuICAgICAgY29uc3QgZnEgPSBbOTYwMDAsIDg4MjAwLCA2NDAwMCwgNDgwMDAsIDQ0MTAwLCAzMjAwMCwgMjQwMDAsIDIyMDUwLCAxNjAwMCwgMTIwMDAsIDExMDI1LCA4MDAwLCA3MzUwXTtcbiAgICAgIHJldC5pZCA9IChuZXh0ID4+PiAzICYgMHgwMSkgPT09IDAgPyAnTVBFRy00JyA6ICdNUEVHLTInO1xuICAgICAgcmV0LmxheWVyID0gbmV4dCA+Pj4gMSAmIDB4MDM7XG4gICAgICByZXQuYWJzZW50ID0gbmV4dCAmIDB4MDE7XG4gICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgIHJldC5hdWRpb09iamVjdFR5cGUgPSAobmV4dCA+Pj4gMTQgJiAweDAzKSArIDE7XG4gICAgICByZXQucHJvZmlsZSA9IHJldC5hdWRpb09iamVjdFR5cGUgLSAxO1xuICAgICAgcmV0LmZyZXF1ZW5jeUluZGV4ID0gbmV4dCA+Pj4gMTAgJiAweDBmO1xuICAgICAgcmV0LmZyZXF1ZW5jZSA9IGZxW3JldC5mcmVxdWVuY3lJbmRleF07XG4gICAgICByZXQuY2hhbm5lbCA9IG5leHQgPj4+IDYgJiAweDA3O1xuICAgICAgcmV0LmZyYW1lTGVuZ3RoID0gKG5leHQgJiAweDAzKSA8PCAxMSB8IChidWZmZXIucmVhZFVpbnQxNigpID4+PiA1KTtcbiAgICAgIFRzRGVtdXhlci5nZXRBdWRpb0NvbmZpZyhyZXQpO1xuICAgICAgYnVmZmVyLnNraXAoMSk7XG4gICAgICByZXQuYnVmZmVyID0gYnVmZmVyO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEVTICR7dHlwZX0gaXMgbm90IHN1cHBvcnRlZGApO1xuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBzdGF0aWMgVFNEVCAoc3RyZWFtLCB0cywgZnJhZ3MpIHtcbiAgICAvLyBUT0RPXG4gICAgdHMucGF5bG9hZCA9IHt9O1xuICB9XG5cbiAgc3RhdGljIENBVCAoc3RyZWFtLCB0cywgZnJhZ3MpIHtcbiAgICBsZXQgcmV0ID0ge31cbiAgICByZXQudGFibGVJRCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICBsZXQgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgcmV0LnNlY3Rpb25JbmRpY2F0b3IgPSBuZXh0ID4+PiA3O1xuICAgIHJldC5zZWN0aW9uTGVuZ3RoID0gbmV4dCAmIDB4MGZmZjtcbiAgICBzdHJlYW0uc2tpcCgyKTtcbiAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHJldC52ZXJzaW9uID0gbmV4dCA+Pj4gMztcbiAgICByZXQuY3VycmVudE5leHRJbmRpY2F0b3IgPSBuZXh0ICYgMHgwMTtcbiAgICByZXQuc2VjdGlvbk51bWJlciA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICByZXQubGFzdFNlY3Rpb25OdW1iZXIgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgbGV0IE4gPSAodGhpcy5zZWN0aW9uTGVuZ3RoIC0gOSkgLyA0O1xuICAgIGxldCBsaXN0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOOyBpKyspIHtcbiAgICAgIGxpc3QucHVzaCh7fSk7XG4gICAgfVxuICAgIHJldC5jcmMzMiA9IHN0cmVhbS5yZWFkVWludDMyKCk7XG4gICAgdHMucGF5bG9hZCA9IHJldDtcbiAgfVxuXG4gIHN0YXRpYyBnZXRBdWRpb0NvbmZpZyAocmV0KSB7XG4gICAgbGV0IHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKVxuICAgIGxldCBjb25maWc7XG4gICAgbGV0IGV4dGVuc2lvblNhbXBsZUluZGV4O1xuICAgIGlmICgvZmlyZWZveC9pLnRlc3QodXNlckFnZW50KSkge1xuICAgICAgaWYgKHJldC5mcmVxdWVuY3lJbmRleCA+PSA2KSB7XG4gICAgICAgIHJldC5hdWRpb09iamVjdFR5cGUgPSA1O1xuICAgICAgICBjb25maWcgPSBuZXcgQXJyYXkoNCk7XG4gICAgICAgIGV4dGVuc2lvblNhbXBsZUluZGV4ID0gcmV0LmZyZXF1ZW5jeUluZGV4IC0gMztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldC5hdWRpb09iamVjdFR5cGUgPSAyO1xuICAgICAgICBjb25maWcgPSBuZXcgQXJyYXkoMik7XG4gICAgICAgIGV4dGVuc2lvblNhbXBsZUluZGV4ID0gcmV0LmZyZXF1ZW5jeUluZGV4O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodXNlckFnZW50LmluZGV4T2YoJ2FuZHJvaWQnKSAhPT0gLTEpIHtcbiAgICAgIHJldC5hdWRpb09iamVjdFR5cGUgPSAyO1xuICAgICAgY29uZmlnID0gbmV3IEFycmF5KDIpO1xuICAgICAgZXh0ZW5zaW9uU2FtcGxlSW5kZXggPSByZXQuZnJlcXVlbmN5SW5kZXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldC5hdWRpb09iamVjdFR5cGUgPSA1O1xuICAgICAgY29uZmlnID0gbmV3IEFycmF5KDQpO1xuICAgICAgaWYgKHJldC5mcmVxdWVuY3lJbmRleCA+PSA2KSB7XG4gICAgICAgIGV4dGVuc2lvblNhbXBsZUluZGV4ID0gcmV0LmZyZXF1ZW5jeUluZGV4IC0gMztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChyZXQuY2hhbm5lbCA9PT0gMSkge1xuICAgICAgICAgIHJldC5hdWRpb09iamVjdFR5cGUgPSAyO1xuICAgICAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSgyKTtcbiAgICAgICAgfVxuICAgICAgICBleHRlbnNpb25TYW1wbGVJbmRleCA9IHJldC5mcmVxdWVuY3lJbmRleDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25maWdbMF0gPSByZXQuYXVkaW9PYmplY3RUeXBlIDw8IDM7XG4gICAgY29uZmlnWzBdIHw9IChyZXQuZnJlcXVlbmN5SW5kZXggJiAweDBlKSA+PiAxO1xuICAgIGNvbmZpZ1sxXSA9IChyZXQuZnJlcXVlbmN5SW5kZXggJiAweDAxKSA8PCA3O1xuICAgIGNvbmZpZ1sxXSB8PSByZXQuY2hhbm5lbCA8PCAzO1xuICAgIGlmIChyZXQuYXVkaW9PYmplY3RUeXBlID09PSA1KSB7XG4gICAgICBjb25maWdbMV0gfD0gKGV4dGVuc2lvblNhbXBsZUluZGV4ICYgMHgwZSkgPj4gMTtcbiAgICAgIGNvbmZpZ1syXSA9IChleHRlbnNpb25TYW1wbGVJbmRleCAmIDB4MDEpIDw8IDc7XG4gICAgICBjb25maWdbMl0gfD0gMiA8PCAyO1xuICAgICAgY29uZmlnWzNdID0gMDtcbiAgICB9XG4gICAgcmV0LmF1ZGlvQ29uZmlnID0gY29uZmlnO1xuICB9XG5cbiAgZ2V0IGlucHV0QnVmZmVyICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSh0aGlzLmNvbmZpZ3MuaW5wdXRidWZmZXIpO1xuICB9XG5cbiAgZ2V0IF90cmFja3MgKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUc0RlbXV4ZXI7XG4iLCJjbGFzcyBQbGF5bGlzdCB7XG4gIGNvbnN0cnVjdG9yIChjb25maWdzKSB7XG4gICAgdGhpcy5fYmFzZVVSTCA9ICcnO1xuICAgIHRoaXMuX2xpc3QgPSB7fTtcbiAgICB0aGlzLl90cyA9IHt9O1xuICAgIHRoaXMudmVyc2lvbiA9IDA7XG4gICAgdGhpcy5zZXF1ZW5jZSA9IC0xO1xuICAgIHRoaXMudGFyZ2V0ZHVyYXRpb24gPSAwO1xuICAgIHRoaXMuZHVyYXRpb24gPSAwO1xuICAgIHRoaXMuZnJhZ0xlbmd0aCA9IDA7XG4gICAgdGhpcy5fbGFzdGdldCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9hdWRvY2xlYXIgPSBjb25maWdzLmF1dG9jbGVhciB8fCBmYWxzZTtcbiAgfVxuXG4gIGdldCBsaXN0ICgpIHtcbiAgICByZXR1cm4gdGhpcy5fbGlzdDtcbiAgfVxuXG4gIHNldCBiYXNlVVJMIChiYXNlVVJMKSB7XG4gICAgaWYgKHRoaXMuYmFzZVVSTCAhPT0gYmFzZVVSTCkge1xuICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgdGhpcy5fYmFzZVVSTCA9IGJhc2VVUkw7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGJhc2VVUkwgKCkge1xuICAgIHJldHVybiB0aGlzLl9iYXNlVVJMO1xuICB9XG5cbiAgcHVzaCAodHMsIGR1cmF0aW9uLCBkaXNjb250aW51ZSkge1xuICAgIGlmICghdGhpcy5fdHNbdHNdKSB7XG4gICAgICB0aGlzLl90c1t0c10gPSB7ZHVyYXRpb246IGR1cmF0aW9uLCBcbiAgICAgICAgZG93bmxvYWRlZDogZmFsc2UsIFxuICAgICAgICBkb3dubG9hZGluZzogZmFsc2UsIFxuICAgICAgICBzdGFydDogdGhpcy5kdXJhdGlvbiwgXG4gICAgICAgIGRpc2NvbnRpbnVlOiBkaXNjb250aW51ZSA/IHRydWU6IGZhbHNlXG4gICAgICB9O1xuICAgICAgdGhpcy5fbGlzdFt0aGlzLmR1cmF0aW9uXSA9IHRzO1xuICAgICAgdGhpcy5kdXJhdGlvbiArPSBkdXJhdGlvbjtcbiAgICAgIHRoaXMuZnJhZ0xlbmd0aCArPSAxO1xuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZUZyYWcgKHVybCkge1xuICAgIGlmICh0aGlzLl90c1t1cmxdKSB7XG4gICAgICBpZiAodGhpcy5fdHNbdXJsXS5zdGFydCA+IHRoaXMuX2xhc3RnZXQudGltZSkge1xuICAgICAgICB0aGlzLl9sYXN0Z2V0ID0ge1xuICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLl90c1t1cmxdLmR1cmF0aW9uLFxuICAgICAgICAgIHRpbWU6IHRoaXMuX3RzW3VybF0uc3RhcnQsXG4gICAgICAgICAgZG93bmxvYWRlZDogZmFsc2UsXG4gICAgICAgICAgZG93bmxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgIHVybDogdXJsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGRlbGV0ZSB0aGlzLl9saXN0W3RoaXMuX3RzW3VybF0uc3RhcnRdO1xuICAgICAgZGVsZXRlIHRoaXMuX3RzW3VybF07XG4gICAgICB0aGlzLmZyYWdMZW5ndGggLT0gMTtcbiAgICB9XG4gIH1cblxuICBwdXNoTTNVOCAoZGF0YSwgZGVsZXRlcHJlKSB7XG4gICAgLy8g5bi46KeE5L+h5oGv5pu/5o2iXG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIG0zdTggZGF0YSByZWNlaXZlZC5gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy52ZXJzaW9uID0gZGF0YS52ZXJzaW9uO1xuICAgIHRoaXMudGFyZ2V0ZHVyYXRpb24gPSBkYXRhLnRhcmdldGR1cmF0aW9uO1xuICAgIGlmKGRhdGEuZW5jcnlwdCAmJiAhdGhpcy5lbmNyeXB0KSB7XG4gICAgICB0aGlzLmVuY3J5cHQgPSBkYXRhLmVuY3J5cHQ7XG4gICAgfVxuICAgIC8vIOaWsOWIhueJh+S/oeaBr1xuICAgIGlmIChkYXRhLnNlcXVlbmNlID4gdGhpcy5zZXF1ZW5jZSkge1xuICAgICAgdGhpcy5zZXF1ZW5jZSA9IGRhdGEuc2VxdWVuY2U7XG4gICAgICBsZXQgbmV3ZnJhZ2xpc3QgPSBbXVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmZyYWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBmcmFnID0gZGF0YS5mcmFnc1tpXTtcbiAgICAgICAgaWYgKCF0aGlzLl90c1tmcmFnLnVybF0pIHtcbiAgICAgICAgICBuZXdmcmFnbGlzdC5wdXNoKGZyYWcudXJsKVxuICAgICAgICAgIHRoaXMucHVzaChmcmFnLnVybCwgZnJhZy5kdXJhdGlvbiwgZnJhZy5kaXNjb250aW51ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYobmV3ZnJhZ2xpc3QubGVuZ3RoIDwgMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbiBub3QgcmVhZCB0cyBmaWxlIGxpc3QuYCk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGlmIChkZWxldGVwcmUpIHtcbiAgICAgICAgbGV0IHRzbGlzdCA9IHRoaXMuZ2V0VHNMaXN0KCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHNsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKG5ld2ZyYWdsaXN0LmluZGV4T2YodHNsaXN0W2ldKSA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlRnJhZyh0c2xpc3RbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE9sZCBtM3U4IGZpbGUgcmVjZWl2ZWQsICR7ZGF0YS5zZXF1ZW5jZX1gKTtcbiAgICB9XG4gIH1cblxuICBnZXRUc0xpc3QgKCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl90cyk7XG4gIH1cblxuICBkb3dubG9hZGVkICh0c25hbWUsIGlzbG9hZGVkKSB7XG4gICAgbGV0IHRzID0gdGhpcy5fdHNbdHNuYW1lXTtcbiAgICBpZiAodHMpIHtcbiAgICAgIHRzLmRvd25sb2FkZWQgPSBpc2xvYWRlZFxuICAgIH1cbiAgfVxuXG4gIGRvd25sb2FkaW5nICh0c25hbWUsIGxvYWRpbmcpIHtcbiAgICBsZXQgdHMgPSB0aGlzLl90c1t0c25hbWVdO1xuICAgIGlmICh0cykge1xuICAgICAgdHMuZG93bmxvYWRpbmcgPSBsb2FkaW5nXG4gICAgfVxuICB9XG5cbiAgZ2V0VHNCeU5hbWUgKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fdHNbbmFtZV07XG4gIH1cblxuICBnZXRUcyAodGltZSkge1xuICAgIGxldCB0aW1lbGlzdCA9IE9iamVjdC5rZXlzKHRoaXMuX2xpc3QpO1xuICAgIGxldCB0cztcblxuICAgIGlmICh0aW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0aGlzLl9sYXN0Z2V0KSB7XG4gICAgICAgIHRpbWUgPSB0aGlzLl9sYXN0Z2V0LnRpbWUgKyB0aGlzLl9sYXN0Z2V0LmR1cmF0aW9uO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGltZSA9IDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRpbWVsaXN0Lmxlbmd0aCA8IDEgfHwgdGltZSA+PSB0aGlzLmR1cmF0aW9uKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB0aW1lbGlzdC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICByZXR1cm4gcGFyc2VGbG9hdChhKSAtIHBhcnNlRmxvYXQoYilcbiAgICB9KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbWVsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGltZSA+PSBwYXJzZUludCh0aW1lbGlzdFtpXSkpIHtcbiAgICAgICAgbGV0IHVybCA9IHRoaXMuX2xpc3RbdGltZWxpc3RbaV1dO1xuICAgICAgICBsZXQgZG93bmxvYWRlZCA9IHRoaXMuX3RzW3VybF0uZG93bmxvYWRlZDtcbiAgICAgICAgbGV0IGRvd25sb2FkaW5nID0gdGhpcy5fdHNbdXJsXS5kb3dubG9hZGluZztcbiAgICAgICAgdHMgPSB7dXJsLCBkb3dubG9hZGVkLCBkb3dubG9hZGluZywgdGltZTogcGFyc2VJbnQodGltZWxpc3RbaV0pLCBkdXJhdGlvbjogcGFyc2VJbnQodGhpcy5fdHNbdXJsXS5kdXJhdGlvbil9O1xuICAgICAgICBpZiAodGhpcy5hdXRvY2xlYXIpIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5fdHNbdGhpcy5fbGFzdGdldC51cmxdO1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLl9saXN0W3RoaXMuX2xhc3RnZXQudGltZV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGFzdGdldCA9IHRzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cztcbiAgfVxuXG4gIGNsZWFyICgpIHtcbiAgICB0aGlzLl9iYXNlVVJMID0gJyc7XG4gICAgdGhpcy5fbGlzdCA9IHt9O1xuICAgIHRoaXMuX3RzID0ge307XG4gICAgdGhpcy52ZXJzaW9uID0gMDtcbiAgICB0aGlzLnNlcXVlbmNlID0gLTE7XG4gICAgdGhpcy50YXJnZXRkdXJhdGlvbiA9IDA7XG4gICAgdGhpcy5kdXJhdGlvbiA9IDA7XG4gIH1cblxuICBjbGVhckRvd25sb2FkZWQgKCkge1xuICAgIGZvciAobGV0IGkgPSAwLCBsID0gT2JqZWN0LmtleXModGhpcy5fdHMpLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgbGV0IHRzID0gdGhpcy5fdHNbT2JqZWN0LmtleXModGhpcy5fdHMpW2ldXTtcbiAgICAgIHRzLmRvd25sb2FkZWQgPSBmYWxzZTtcbiAgICAgIHRzLmRvd25sb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5fYmFzZVVSTCA9ICcnO1xuICAgIHRoaXMuX2xpc3QgPSB7fTtcbiAgICB0aGlzLl90cyA9IHt9O1xuICAgIHRoaXMudmVyc2lvbiA9IDA7XG4gICAgdGhpcy5zZXF1ZW5jZSA9IC0xO1xuICAgIHRoaXMudGFyZ2V0ZHVyYXRpb24gPSAwO1xuICAgIHRoaXMuZHVyYXRpb24gPSAwO1xuICAgIHRoaXMuZnJhZ0xlbmd0aCA9IDA7XG4gICAgdGhpcy5fbGFzdGdldCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9hdWRvY2xlYXIgPSBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5bGlzdDtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBGZXRjaExvYWRlcjogcmVxdWlyZSgnLi9zcmMvZmV0Y2gtbG9hZGVyJykuZGVmYXVsdFxufTtcbiIsImltcG9ydCB7IEVWRU5UUyB9IGZyb20gJ3hncGxheWVyLXV0aWxzJztcblxuY29uc3QgTE9BREVSX0VWRU5UUyA9IEVWRU5UUy5MT0FERVJfRVZFTlRTO1xuY29uc3QgUkVBRF9TVFJFQU0gPSAwO1xuY29uc3QgUkVBRF9URVhUID0gMTtcbmNvbnN0IFJFQURfSlNPTiA9IDI7XG5jb25zdCBSRUFEX0JVRkZFUiA9IDM7XG5jbGFzcyBGZXRjaExvYWRlciB7XG4gIGNvbnN0cnVjdG9yIChjb25maWdzKSB7XG4gICAgdGhpcy5jb25maWdzID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlncyk7XG4gICAgdGhpcy51cmwgPSBudWxsXG4gICAgdGhpcy5zdGF0dXMgPSAwXG4gICAgdGhpcy5lcnJvciA9IG51bGxcbiAgICB0aGlzLl9yZWFkZXIgPSBudWxsO1xuICAgIHRoaXMuX2NhbmNlbGVkID0gZmFsc2U7XG4gICAgdGhpcy5fZGVzdHJveWVkID0gZmFsc2U7XG4gICAgdGhpcy5yZWFkdHlwZSA9IHRoaXMuY29uZmlncy5yZWFkdHlwZTtcbiAgICB0aGlzLmJ1ZmZlciA9IHRoaXMuY29uZmlncy5idWZmZXIgfHwgJ0xPQURFUl9CVUZGRVInO1xuICAgIHRoaXMuX2xvYWRlclRhc2tObyA9IDA7XG4gIH1cblxuICBpbml0ICgpIHtcbiAgICB0aGlzLm9uKExPQURFUl9FVkVOVFMuTEFERVJfU1RBUlQsIHRoaXMubG9hZC5iaW5kKHRoaXMpKVxuICB9XG5cbiAgc3RhdGljIGdldCB0eXBlICgpIHtcbiAgICByZXR1cm4gJ2xvYWRlcidcbiAgfVxuXG4gIGxvYWQgKHVybCwgb3B0cykge1xuICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy51cmwgPSB1cmw7XG4gICAgdGhpcy5fY2FuY2VsZWQgPSBmYWxzZTtcblxuICAgIC8vIFRPRE86IEFkZCBSYW5nZXNcbiAgICBsZXQgcGFyYW1zID0gdGhpcy5nZXRQYXJhbXMob3B0cylcbiAgICBfdGhpcy5sb2FkaW5nID0gdHJ1ZVxuICAgIHJldHVybiBmZXRjaCh0aGlzLnVybCwgcGFyYW1zKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgIF90aGlzLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1c1xuICAgICAgICByZXR1cm4gX3RoaXMuX29uRmV0Y2hSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICB9XG4gICAgICBfdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0VSUk9SLCBfdGhpcy5UQUcsIG5ldyBFcnJvcihgaW52YWxpZCByZXNwb25zZS5gKSk7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSAge1xuICAgICAgX3RoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9FUlJPUiwgX3RoaXMuVEFHLCBlcnJvcik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSlcbiAgICB9KVxuICB9XG5cbiAgX29uRmV0Y2hSZXNwb25zZSAocmVzcG9uc2UpIHtcbiAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgIGxldCBidWZmZXIgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKHRoaXMuYnVmZmVyKTtcbiAgICB0aGlzLl9sb2FkZXJUYXNrTm8rKztcbiAgICBsZXQgdGFza25vID0gdGhpcy5fbG9hZGVyVGFza05vO1xuICAgIGlmIChyZXNwb25zZS5vayA9PT0gdHJ1ZSkge1xuICAgICAgc3dpdGNoICh0aGlzLnJlYWR0eXBlKSB7XG4gICAgICAgIGNhc2UgUkVBRF9KU09OOlxuICAgICAgICAgIHJlc3BvbnNlLmpzb24oKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBfdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgICAgICAgIGlmICghX3RoaXMuX2NhbmNlbGVkICYmICFfdGhpcy5fZGVzdHJveWVkKSB7XG4gICAgICAgICAgICAgIGlmIChidWZmZXIpIHtcbiAgICAgICAgICAgICAgICBidWZmZXIucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0NPTVBMRVRFLCBidWZmZXIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsIGRhdGEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgUkVBRF9URVhUOlxuICAgICAgICAgIHJlc3BvbnNlLnRleHQoKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBfdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgICAgICAgIGlmICghX3RoaXMuX2NhbmNlbGVkICYmICFfdGhpcy5fZGVzdHJveWVkKSB7XG4gICAgICAgICAgICAgIGlmIChidWZmZXIpIHtcbiAgICAgICAgICAgICAgICBidWZmZXIucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0NPTVBMRVRFLCBidWZmZXIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsIGRhdGEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgUkVBRF9CVUZGRVI6XG4gICAgICAgICAgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBfdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgICAgICAgIGlmICghX3RoaXMuX2NhbmNlbGVkICYmICFfdGhpcy5fZGVzdHJveWVkKSB7XG4gICAgICAgICAgICAgIGlmIChidWZmZXIpIHtcbiAgICAgICAgICAgICAgICBidWZmZXIucHVzaChuZXcgVWludDhBcnJheShkYXRhKSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9DT01QTEVURSwgYnVmZmVyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0NPTVBMRVRFLCBkYXRhKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFJFQURfU1RSRUFNOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiB0aGlzLl9vblJlYWRlcihyZXNwb25zZS5ib2R5LmdldFJlYWRlcigpLCB0YXNrbm8pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9vblJlYWRlciAocmVhZGVyLCB0YXNrbm8pIHtcbiAgICBsZXQgYnVmZmVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSh0aGlzLmJ1ZmZlcik7XG4gICAgaWYgKCghYnVmZmVyICYmIHRoaXMuX3JlYWRlcikgfHwgdGhpcy5fZGVzdHJveWVkKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLl9yZWFkZXIuY2FuY2VsKClcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRE8gTk9USElOR1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX3JlYWRlciA9IHJlYWRlclxuICAgIGlmICh0aGlzLmxvYWRpbmcgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgX3RoaXMgPSB0aGlzXG4gICAgLy8gcmVhZGVyIHJlYWQgZnVuY3Rpb24gcmV0dXJucyBhIFByb21pc2UuIGdldCBkYXRhIHdoZW4gY2FsbGJhY2sgYW5kIGhhcyB2YWx1ZS5kb25lIHdoZW4gZGlzY29ubmVjdGVkLlxuICAgIC8vIHJlYWTmlrnms5Xov5Tlm57kuIDkuKpQcm9taXNlLiDlm57osIPkuK3lj6/ku6Xojrflj5bliLDmlbDmja7jgILlvZN2YWx1ZS5kb25l5a2Y5Zyo5pe277yM6K+05piO6ZO+5o6l5pat5byA44CCXG4gICAgdGhpcy5fcmVhZGVyICYmIHRoaXMuX3JlYWRlci5yZWFkKCkudGhlbihmdW5jdGlvbiAodmFsKSB7XG4gICAgICBpZiAodmFsLmRvbmUpIHtcbiAgICAgICAgLy8gVE9ETzog5a6M5oiQ5aSE55CGXG4gICAgICAgIF90aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgICBfdGhpcy5zdGF0dXMgPSAwO1xuICAgICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0NPTVBMRVRFLCBidWZmZXIpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoX3RoaXMuX2NhbmNlbGVkIHx8IF90aGlzLl9kZXN0cm95ZWQpIHtcbiAgICAgICAgaWYgIChfdGhpcy5fcmVhZGVyKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIF90aGlzLl9yZWFkZXIuY2FuY2VsKClcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBETyBOT1RISU5HXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYnVmZmVyLnB1c2godmFsLnZhbHVlKVxuICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9EQVRBTE9BREVELCBidWZmZXIpXG4gICAgICByZXR1cm4gX3RoaXMuX29uUmVhZGVyKHJlYWRlciwgdGFza25vKVxuICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgX3RoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9FUlJPUiwgX3RoaXMuVEFHLCBlcnJvcik7XG4gICAgfSlcbiAgfVxuXG4gIGdldFBhcmFtcyAob3B0cykge1xuICAgIGxldCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0cylcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKClcblxuICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgIG1vZGU6ICdjb3JzJyxcbiAgICAgIGNhY2hlOiAnZGVmYXVsdCdcbiAgICB9XG5cbiAgICAvLyBhZGQgY3VzdG1vciBoZWFkZXJzXG4gICAgLy8g5re75Yqg6Ieq5a6a5LmJ5aS0XG4gICAgaWYgKHR5cGVvZiB0aGlzLmNvbmZpZ3MuaGVhZGVycyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGxldCBjb25maWdIZWFkZXJzID0gdGhpcy5jb25maWdzLmhlYWRlcnNcbiAgICAgIGZvciAobGV0IGtleSBpbiBjb25maWdIZWFkZXJzKSB7XG4gICAgICAgIGlmIChjb25maWdIZWFkZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBoZWFkZXJzLmFwcGVuZChrZXksIGNvbmZpZ0hlYWRlcnNba2V5XSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5oZWFkZXJzID09PSAnb2JqZWN0Jykge1xuICAgICAgbGV0IG9wdEhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnNcbiAgICAgIGZvciAobGV0IGtleSBpbiBvcHRIZWFkZXJzKSB7XG4gICAgICAgIGlmIChvcHRIZWFkZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBoZWFkZXJzLmFwcGVuZChrZXksIG9wdEhlYWRlcnNba2V5XSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmNvcnMgPT09IGZhbHNlKSB7XG4gICAgICBwYXJhbXMubW9kZSA9ICdzYW1lLW9yaWdpbidcbiAgICB9XG5cbiAgICAvLyB3aXRoQ3JlZGVudGlhbHMgaXMgZGlzYWJsZWQgYnkgZGVmYXVsdFxuICAgIC8vIHdpdGhDcmVkZW50aWFscyDlnKjpu5jorqTmg4XlhrXkuIvkuI3ooqvkvb/nlKjjgIJcbiAgICBpZiAob3B0aW9ucy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgIHBhcmFtcy5jcmVkZW50aWFscyA9ICdpbmNsdWRlJ1xuICAgIH1cblxuICAgIC8vIFRPRE86IEFkZCByYW5nZXM7XG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxuXG4gIGNhbmNlbCAoKSB7XG4gICAgaWYgKHRoaXMuX3JlYWRlcikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5fcmVhZGVyLmNhbmNlbCgpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIOmYsuatomZhaWxlZDogMjAw6ZSZ6K+v6KKr5omT5Y2w5Yiw5o6n5Yi25Y+w5LiKXG4gICAgICB9XG4gICAgICB0aGlzLl9yZWFkZXIgPSBudWxsXG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgdGhpcy5fY2FuY2VsZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuX2Rlc3Ryb3llZCA9IHRydWVcbiAgICB0aGlzLmNhbmNlbCgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZldGNoTG9hZGVyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgTXA0UmVtdXhlcjogcmVxdWlyZSgnLi9zcmMvbXA0JykuZGVmYXVsdFxufTtcbiIsImltcG9ydCB7IEJ1ZmZlciB9IGZyb20gJ3hncGxheWVyLXV0aWxzJztcblxuLy8gY29uc3QgVUlOVDMyX01BWCA9IE1hdGgucG93KDIsIDMyKSAtIDE7XG5jbGFzcyBGbXA0IHtcbiAgc3RhdGljIHNpemUgKHZhbHVlKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci53cml0ZVVpbnQzMih2YWx1ZSlcbiAgfVxuICBzdGF0aWMgaW5pdEJveCAoc2l6ZSwgbmFtZSwgLi4uY29udGVudCkge1xuICAgIGNvbnN0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoc2l6ZSksIEZtcDQudHlwZShuYW1lKSwgLi4uY29udGVudClcbiAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlclxuICB9XG4gIHN0YXRpYyBleHRlbnNpb24gKHZlcnNpb24sIGZsYWcpIHtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgdmVyc2lvbixcbiAgICAgIChmbGFnID4+IDE2KSAmIDB4ZmYsXG4gICAgICAoZmxhZyA+PiA4KSAmIDB4ZmYsXG4gICAgICBmbGFnICYgMHhmZlxuICAgIF0pXG4gIH1cbiAgc3RhdGljIGZ0eXAgKCkge1xuICAgIHJldHVybiBGbXA0LmluaXRCb3goMjQsICdmdHlwJywgbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHg2OSwgMHg3MywgMHg2RiwgMHg2RCwgLy8gaXNvbSxcbiAgICAgIDB4MCwgMHgwLCAweDAwLCAweDAxLCAvLyBtaW5vcl92ZXJzaW9uOiAweDAxXG4gICAgICAweDY5LCAweDczLCAweDZGLCAweDZELCAvLyBpc29tXG4gICAgICAweDYxLCAweDc2LCAweDYzLCAweDMxIC8vIGF2YzFcbiAgICBdKSlcbiAgfVxuICBzdGF0aWMgbW9vdiAoeyB0eXBlLCBtZXRhIH0pIHtcbiAgICBsZXQgc2l6ZSA9IDhcbiAgICBsZXQgbXZoZCA9IEZtcDQubXZoZChtZXRhLmR1cmF0aW9uLCBtZXRhLnRpbWVzY2FsZSlcbiAgICBsZXQgdHJha1xuXG4gICAgaWYgKHR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgIHRyYWsgPSBGbXA0LnZpZGVvVHJhayhtZXRhKVxuICAgIH0gZWxzZSB7XG4gICAgICB0cmFrID0gRm1wNC5hdWRpb1RyYWsobWV0YSlcbiAgICB9XG5cbiAgICBsZXQgbXZleCA9IEZtcDQubXZleChtZXRhLmR1cmF0aW9uLCBtZXRhLnRpbWVzY2FsZSB8fCAxMDAwLCBtZXRhLmlkKTtcbiAgICBbbXZoZCwgdHJhaywgbXZleF0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KHNpemUsICdtb292JywgbXZoZCwgdHJhaywgbXZleClcbiAgfVxuICBzdGF0aWMgbXZoZCAoZHVyYXRpb24sIHRpbWVzY2FsZSA9IDEwMDApIHtcbiAgICAvLyBkdXJhdGlvbiAqPSB0aW1lc2NhbGU7XG4gICAgbGV0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gdmVyc2lvbigwKSArIGZsYWdzICAgICAx5L2N55qEYm9454mI5pysKzPkvY1mbGFncyAgIGJveOeJiOacrO+8jDDmiJYx77yM5LiA6Iis5Li6MOOAgu+8iOS7peS4i+Wtl+iKguaVsOWdh+aMiXZlcnNpb249MO+8iVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gY3JlYXRpb25fdGltZSAgICDliJvlu7rml7bpl7QgIO+8iOebuOWvueS6jlVUQ+aXtumXtDE5MDQtMDEtMDHpm7bngrnnmoTnp5LmlbDvvIlcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIG1vZGlmaWNhdGlvbl90aW1lICAg5L+u5pS55pe26Ze0XG5cbiAgICAgIC8qKlxuICAgICAgICAgICAgICogdGltZXNjYWxlOiA0IGJ5dGVz5paH5Lu25aqS5L2T5ZyoMeenkuaXtumXtOWGheeahOWIu+W6puWAvO+8jOWPr+S7peeQhuino+S4ujHnp5Lplb/luqZcbiAgICAgICAgICAgICAqL1xuICAgICAgKHRpbWVzY2FsZSA+Pj4gMjQpICYgMHhGRixcbiAgICAgICh0aW1lc2NhbGUgPj4+IDE2KSAmIDB4RkYsXG4gICAgICAodGltZXNjYWxlID4+PiA4KSAmIDB4RkYsXG4gICAgICAodGltZXNjYWxlKSAmIDB4RkYsXG5cbiAgICAgIC8qKlxuICAgICAgICAgICAgICogZHVyYXRpb246IDQgYnl0ZXPor6V0cmFja+eahOaXtumXtOmVv+W6pu+8jOeUqGR1cmF0aW9u5ZKMdGltZSBzY2FsZeWAvOWPr+S7peiuoeeul3RyYWNr5pe26ZW/77yM5q+U5aaCYXVkaW8gdHJhY2vnmoR0aW1lIHNjYWxlID0gODAwMCxcbiAgICAgICAgICAgICAqIGR1cmF0aW9uID0gNTYwMTI477yM5pe26ZW/5Li6NzAuMDE277yMdmlkZW8gdHJhY2vnmoR0aW1lIHNjYWxlID0gNjAwLCBkdXJhdGlvbiA9IDQyMDAw77yM5pe26ZW/5Li6NzBcbiAgICAgICAgICAgICAqL1xuICAgICAgKGR1cmF0aW9uID4+PiAyNCkgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uID4+PiAxNikgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uID4+PiA4KSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24pICYgMHhGRixcbiAgICAgIDB4MDAsIDB4MDEsIDB4MDAsIDB4MDAsIC8vIFByZWZlcnJlZCByYXRlOiAxLjAgICDmjqjojZDmkq3mlL7pgJ/njofvvIzpq5gxNuS9jeWSjOS9jjE25L2N5YiG5Yir5Li65bCP5pWw54K55pW05pWw6YOo5YiG5ZKM5bCP5pWw6YOo5YiG77yM5Y2zWzE2LjE2XSDmoLzlvI/vvIzor6XlgLzkuLoxLjDvvIgweDAwMDEwMDAw77yJ6KGo56S65q2j5bi45YmN5ZCR5pKt5pS+XG4gICAgICAvKipcbiAgICAgICAgICAgICAqIFByZWZlcnJlZFZvbHVtZSgxLjAsIDJieXRlcykgKyByZXNlcnZlZCgyYnl0ZXMpXG4gICAgICAgICAgICAgKiDkuI5yYXRl57G75Ly877yMWzguOF0g5qC85byP77yMMS4w77yIMHgwMTAw77yJ6KGo56S65pyA5aSn6Z+z6YePXG4gICAgICAgICAgICAgKi9cbiAgICAgIDB4MDEsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyAgcmVzZXJ2ZWQ6IDQgKyA0IGJ5dGVz5L+d55WZ5L2NXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMSwgMHgwMCwgMHgwMCwgLy8gLS0tLWJlZ2luIGNvbXBvc2l0aW9uIG1hdHJpeC0tLS1cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyDop4bpopHlj5jmjaLnn6npmLUgICDnur/mgKfku6PmlbBcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAxLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHg0MCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gLS0tLWVuZCBjb21wb3NpdGlvbiBtYXRyaXgtLS0tXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyAtLS0tYmVnaW4gcHJlX2RlZmluZWQgNiAqIDQgYnl0ZXMtLS0tXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcHJlLWRlZmluZWQg5L+d55WZ5L2NXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIC0tLS1lbmQgcHJlX2RlZmluZWQgNiAqIDQgYnl0ZXMtLS0tXG4gICAgICAweEZGLCAweEZGLCAweEZGLCAweEZGIC8vIG5leHRfdHJhY2tfSUQg5LiL5LiA5LiqdHJhY2vkvb/nlKjnmoRpZOWPt1xuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCg4ICsgYnl0ZXMubGVuZ3RoLCAnbXZoZCcsIG5ldyBVaW50OEFycmF5KGJ5dGVzKSlcbiAgfVxuICBzdGF0aWMgdmlkZW9UcmFrIChkYXRhKSB7XG4gICAgbGV0IHNpemUgPSA4XG5cbiAgICBsZXQgdGtoZCA9IEZtcDQudGtoZCh7XG4gICAgICBpZDogMSxcbiAgICAgIGR1cmF0aW9uOiBkYXRhLmR1cmF0aW9uLFxuICAgICAgdGltZXNjYWxlOiBkYXRhLnRpbWVzY2FsZSB8fCAxMDAwLFxuICAgICAgd2lkdGg6IGRhdGEucHJlc2VudFdpZHRoLFxuICAgICAgaGVpZ2h0OiBkYXRhLnByZXNlbnRIZWlnaHQsXG4gICAgICB0eXBlOiAndmlkZW8nXG4gICAgfSlcbiAgICBsZXQgbWRpYSA9IEZtcDQubWRpYSh7XG4gICAgICB0eXBlOiAndmlkZW8nLFxuICAgICAgdGltZXNjYWxlOiBkYXRhLnRpbWVzY2FsZSB8fCAxMDAwLFxuICAgICAgZHVyYXRpb246IGRhdGEuZHVyYXRpb24sXG4gICAgICBhdmNjOiBkYXRhLmF2Y2MsXG4gICAgICBwYXJSYXRpbzogZGF0YS5wYXJSYXRpbyxcbiAgICAgIHdpZHRoOiBkYXRhLnByZXNlbnRXaWR0aCxcbiAgICAgIGhlaWdodDogZGF0YS5wcmVzZW50SGVpZ2h0XG4gICAgfSk7XG4gICAgW3RraGQsIG1kaWFdLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aFxuICAgIH0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveChzaXplLCAndHJhaycsIHRraGQsIG1kaWEpXG4gIH1cbiAgc3RhdGljIGF1ZGlvVHJhayAoZGF0YSkge1xuICAgIGxldCBzaXplID0gOFxuICAgIGxldCB0a2hkID0gRm1wNC50a2hkKHtcbiAgICAgIGlkOiAyLFxuICAgICAgZHVyYXRpb246IGRhdGEuZHVyYXRpb24sXG4gICAgICB0aW1lc2NhbGU6IGRhdGEudGltZXNjYWxlIHx8IDEwMDAsXG4gICAgICB3aWR0aDogMCxcbiAgICAgIGhlaWdodDogMCxcbiAgICAgIHR5cGU6ICdhdWRpbydcbiAgICB9KVxuICAgIGxldCBtZGlhID0gRm1wNC5tZGlhKHtcbiAgICAgIHR5cGU6ICdhdWRpbycsXG4gICAgICB0aW1lc2NhbGU6IGRhdGEudGltZXNjYWxlIHx8IDEwMDAsXG4gICAgICBkdXJhdGlvbjogZGF0YS5kdXJhdGlvbixcbiAgICAgIGNoYW5uZWxDb3VudDogZGF0YS5jaGFubmVsQ291bnQsXG4gICAgICBzYW1wbGVyYXRlOiBkYXRhLnNhbXBsZVJhdGUsXG4gICAgICBjb25maWc6IGRhdGEuY29uZmlnXG4gICAgfSk7XG4gICAgW3RraGQsIG1kaWFdLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aFxuICAgIH0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveChzaXplLCAndHJhaycsIHRraGQsIG1kaWEpXG4gIH1cbiAgc3RhdGljIHRraGQgKGRhdGEpIHtcbiAgICBsZXQgaWQgPSBkYXRhLmlkXG4gICAgbGV0IGR1cmF0aW9uID0gZGF0YS5kdXJhdGlvblxuICAgIGxldCB3aWR0aCA9IGRhdGEud2lkdGhcbiAgICBsZXQgaGVpZ2h0ID0gZGF0YS5oZWlnaHRcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDcsIC8vIHZlcnNpb24oMCkgKyBmbGFncyAx5L2N54mI5pysIGJveOeJiOacrO+8jDDmiJYx77yM5LiA6Iis5Li6MOOAgu+8iOS7peS4i+Wtl+iKguaVsOWdh+aMiXZlcnNpb249MO+8ieaMieS9jeaIluaTjeS9nOe7k+aenOWAvO+8jOmihOWumuS5ieWmguS4i++8mlxuICAgICAgLy8gMHgwMDAwMDEgdHJhY2tfZW5hYmxlZO+8jOWQpuWImeivpXRyYWNr5LiN6KKr5pKt5pS+77ybXG4gICAgICAvLyAweDAwMDAwMiB0cmFja19pbl9tb3ZpZe+8jOihqOekuuivpXRyYWNr5Zyo5pKt5pS+5Lit6KKr5byV55So77ybXG4gICAgICAvLyAweDAwMDAwNCB0cmFja19pbl9wcmV2aWV377yM6KGo56S66K+ldHJhY2vlnKjpooTop4jml7booqvlvJXnlKjjgIJcbiAgICAgIC8vIOS4gOiIrOivpeWAvOS4ujfvvIwxKzIrNCDlpoLmnpzkuIDkuKrlqpLkvZPmiYDmnIl0cmFja+Wdh+acquiuvue9rnRyYWNrX2luX21vdmll5ZKMdHJhY2tfaW5fcHJldmlld++8jOWwhuiiq+eQhuino+S4uuaJgOaciXRyYWNr5Z2H6K6+572u5LqG6L+Z5Lik6aG577yb5a+55LqOaGludCB0cmFja++8jOivpeWAvOS4ujBcbiAgICAgIC8vIGhpbnQgdHJhY2sg6L+Z5Liq54m55q6K55qEdHJhY2vlubbkuI3ljIXlkKvlqpLkvZPmlbDmja7vvIzogIzmmK/ljIXlkKvkuobkuIDkupvlsIblhbbku5bmlbDmja50cmFja+aJk+WMheaIkOa1geWqkuS9k+eahOaMh+ekuuS/oeaBr+OAglxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gY3JlYXRpb25fdGltZeWIm+W7uuaXtumXtO+8iOebuOWvueS6jlVUQ+aXtumXtDE5MDQtMDEtMDHpm7bngrnnmoTnp5LmlbDvvIlcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIG1vZGlmaWNhdGlvbiB0aW1lIOS/ruaUueaXtumXtFxuICAgICAgKGlkID4+PiAyNCkgJiAweEZGLCAvLyB0cmFja19JRDogNCBieXRlcyBpZOWPt++8jOS4jeiDvemHjeWkjeS4lOS4jeiDveS4ujBcbiAgICAgIChpZCA+Pj4gMTYpICYgMHhGRixcbiAgICAgIChpZCA+Pj4gOCkgJiAweEZGLFxuICAgICAgKGlkKSAmIDB4RkYsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZDogNCBieXRlcyAgICDkv53nlZnkvY1cbiAgICAgIChkdXJhdGlvbiA+Pj4gMjQpICYgMHhGRiwgLy8gZHVyYXRpb246IDQgYnl0ZXMgdHJhY2vnmoTml7bpl7Tplb/luqZcbiAgICAgIChkdXJhdGlvbiA+Pj4gMTYpICYgMHhGRixcbiAgICAgIChkdXJhdGlvbiA+Pj4gOCkgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uKSAmIDB4RkYsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZDogMiAqIDQgYnl0ZXMgICAg5L+d55WZ5L2NXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gbGF5ZXIoMmJ5dGVzKSArIGFsdGVybmF0ZV9ncm91cCgyYnl0ZXMpICDop4bpopHlsYLvvIzpu5jorqTkuLow77yM5YC85bCP55qE5Zyo5LiK5bGCLnRyYWNr5YiG57uE5L+h5oGv77yM6buY6K6k5Li6MOihqOekuuivpXRyYWNr5pyq5LiO5YW25LuWdHJhY2vmnInnvqTnu4TlhbPns7tcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHZvbHVtZSgyYnl0ZXMpICsgcmVzZXJ2ZWQoMmJ5dGVzKSAgICBbOC44XSDmoLzlvI/vvIzlpoLmnpzkuLrpn7PpopF0cmFja++8jDEuMO+8iDB4MDEwMO+8ieihqOekuuacgOWkp+mfs+mHj++8m+WQpuWImeS4ujAgICAr5L+d55WZ5L2NXG4gICAgICAweDAwLCAweDAxLCAweDAwLCAweDAwLCAvLyAtLS0tYmVnaW4gY29tcG9zaXRpb24gbWF0cml4LS0tLVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMSwgMHgwMCwgMHgwMCwgLy8g6KeG6aKR5Y+Y5o2i55+p6Zi1XG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDQwLCAweDAwLCAweDAwLCAweDAwLCAvLyAtLS0tZW5kIGNvbXBvc2l0aW9uIG1hdHJpeC0tLS1cbiAgICAgICh3aWR0aCA+Pj4gOCkgJiAweEZGLCAvLyAvL+WuveW6plxuICAgICAgKHdpZHRoKSAmIDB4RkYsXG4gICAgICAweDAwLCAweDAwLFxuICAgICAgKGhlaWdodCA+Pj4gOCkgJiAweEZGLCAvLyDpq5jluqZcbiAgICAgIChoZWlnaHQpICYgMHhGRixcbiAgICAgIDB4MDAsIDB4MDBcbiAgICBdKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goOCArIGNvbnRlbnQuYnl0ZUxlbmd0aCwgJ3RraGQnLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyBlZHRzIChkYXRhKSB7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGxldCBkdXJhdGlvbiA9IGRhdGEuZHVyYXRpb25cbiAgICBsZXQgbWVkaWFUaW1lID0gZGF0YS5tZWRpYVRpbWVcbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKDM2KSwgRm1wNC50eXBlKCdlZHRzJykpXG4gICAgLy8gZWxzdFxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoMjgpLCBGbXA0LnR5cGUoJ2Vsc3QnKSlcbiAgICBidWZmZXIud3JpdGUobmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMSwgLy8gZW50cnkgY291bnRcbiAgICAgIChkdXJhdGlvbiA+PiAyNCkgJiAweGZmLCAoZHVyYXRpb24gPj4gMTYpICYgMHhmZiwgKGR1cmF0aW9uID4+IDgpICYgMHhmZiwgZHVyYXRpb24gJiAweGZmLFxuICAgICAgKG1lZGlhVGltZSA+PiAyNCkgJiAweGZmLCAobWVkaWFUaW1lID4+IDE2KSAmIDB4ZmYsIChtZWRpYVRpbWUgPj4gOCkgJiAweGZmLCBtZWRpYVRpbWUgJiAweGZmLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMSAvLyBtZWRpYSByYXRlXG4gICAgXSkpXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgbWRpYSAoZGF0YSkge1xuICAgIGxldCBzaXplID0gOFxuICAgIGxldCBtZGhkID0gRm1wNC5tZGhkKGRhdGEudGltZXNjYWxlLCBkYXRhLmR1cmF0aW9uKVxuICAgIGxldCBoZGxyID0gRm1wNC5oZGxyKGRhdGEudHlwZSlcbiAgICBsZXQgbWluZiA9IEZtcDQubWluZihkYXRhKTtcbiAgICBbbWRoZCwgaGRsciwgbWluZl0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KHNpemUsICdtZGlhJywgbWRoZCwgaGRsciwgbWluZilcbiAgfVxuICBzdGF0aWMgbWRoZCAodGltZXNjYWxlID0gMTAwMCwgZHVyYXRpb24pIHtcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGNyZWF0aW9uX3RpbWUgICAg5Yib5bu65pe26Ze0XG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBtb2RpZmljYXRpb25fdGltZeS/ruaUueaXtumXtFxuICAgICAgKHRpbWVzY2FsZSA+Pj4gMjQpICYgMHhGRiwgLy8gdGltZXNjYWxlOiA0IGJ5dGVzICAgIOaWh+S7tuWqkuS9k+WcqDHnp5Lml7bpl7TlhoXnmoTliLvluqblgLzvvIzlj6/ku6XnkIbop6PkuLox56eS6ZW/5bqmXG4gICAgICAodGltZXNjYWxlID4+PiAxNikgJiAweEZGLFxuICAgICAgKHRpbWVzY2FsZSA+Pj4gOCkgJiAweEZGLFxuICAgICAgKHRpbWVzY2FsZSkgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uID4+PiAyNCkgJiAweEZGLCAvLyBkdXJhdGlvbjogNCBieXRlcyAgdHJhY2vnmoTml7bpl7Tplb/luqZcbiAgICAgIChkdXJhdGlvbiA+Pj4gMTYpICYgMHhGRixcbiAgICAgIChkdXJhdGlvbiA+Pj4gOCkgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uKSAmIDB4RkYsXG4gICAgICAweDU1LCAweEM0LCAvLyBsYW5ndWFnZTogdW5kICh1bmRldGVybWluZWQpIOWqkuS9k+ivreiogOeggeOAguacgOmrmOS9jeS4ujDvvIzlkI7pnaIxNeS9jeS4ujPkuKrlrZfnrKbvvIjop4FJU08gNjM5LTIvVOagh+WHhuS4reWumuS5ie+8iVxuICAgICAgMHgwMCwgMHgwMCAvLyBwcmVfZGVmaW5lZCA9IDBcbiAgICBdKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTIgKyBjb250ZW50LmJ5dGVMZW5ndGgsICdtZGhkJywgRm1wNC5leHRlbnNpb24oMCwgMCksIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIGhkbHIgKHR5cGUpIHtcbiAgICBsZXQgdmFsdWUgPSBbMHgwMCwgLy8gdmVyc2lvbiAwXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcHJlX2RlZmluZWRcbiAgICAgIDB4NzYsIDB4NjksIDB4NjQsIDB4NjUsIC8vIGhhbmRsZXJfdHlwZTogJ3ZpZGUnXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDU2LCAweDY5LCAweDY0LCAweDY1LFxuICAgICAgMHg2ZiwgMHg0OCwgMHg2MSwgMHg2ZSxcbiAgICAgIDB4NjQsIDB4NmMsIDB4NjUsIDB4NzIsIDB4MDAgLy8gbmFtZTogJ1ZpZGVvSGFuZGxlcidcbiAgICBdXG4gICAgaWYgKHR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgIHZhbHVlLnNwbGljZSg4LCA0LCAuLi5bMHg3MywgMHg2ZiwgMHg3NSwgMHg2ZV0pXG4gICAgICB2YWx1ZS5zcGxpY2UoMjQsIDEzLCAuLi5bMHg1MywgMHg2ZiwgMHg3NSwgMHg2ZSxcbiAgICAgICAgMHg2NCwgMHg0OCwgMHg2MSwgMHg2ZSxcbiAgICAgICAgMHg2NCwgMHg2YywgMHg2NSwgMHg3MiwgMHgwMF0pXG4gICAgfVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goOCArIHZhbHVlLmxlbmd0aCwgJ2hkbHInLCBuZXcgVWludDhBcnJheSh2YWx1ZSkpXG4gIH1cbiAgc3RhdGljIG1pbmYgKGRhdGEpIHtcbiAgICBsZXQgc2l6ZSA9IDhcbiAgICBsZXQgdm1oZCA9IGRhdGEudHlwZSA9PT0gJ3ZpZGVvJyA/IEZtcDQudm1oZCgpIDogRm1wNC5zbWhkKClcbiAgICBsZXQgZGluZiA9IEZtcDQuZGluZigpXG4gICAgbGV0IHN0YmwgPSBGbXA0LnN0YmwoZGF0YSk7XG4gICAgW3ZtaGQsIGRpbmYsIHN0YmxdLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aFxuICAgIH0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveChzaXplLCAnbWluZicsIHZtaGQsIGRpbmYsIHN0YmwpXG4gIH1cbiAgc3RhdGljIHZtaGQgKCkge1xuICAgIHJldHVybiBGbXA0LmluaXRCb3goMjAsICd2bWhkJywgbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgLy8gdmVyc2lvblxuICAgICAgMHgwMCwgMHgwMCwgMHgwMSwgLy8gZmxhZ3NcbiAgICAgIDB4MDAsIDB4MDAsIC8vIGdyYXBoaWNzbW9kZVxuICAgICAgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwIC8vIG9wY29sb3JcbiAgICBdKSlcbiAgfVxuICBzdGF0aWMgc21oZCAoKSB7XG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxNiwgJ3NtaGQnLCBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgLy8gYmFsYW5jZVxuICAgICAgMHgwMCwgMHgwMCAvLyByZXNlcnZlZFxuICAgIF0pKVxuICB9XG4gIHN0YXRpYyBkaW5mICgpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IGRyZWYgPSBbMHgwMCwgLy8gdmVyc2lvbiAwXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMSwgLy8gZW50cnlfY291bnRcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MGMsIC8vIGVudHJ5X3NpemVcbiAgICAgIDB4NzUsIDB4NzIsIDB4NmMsIDB4MjAsIC8vICd1cmwnIHR5cGVcbiAgICAgIDB4MDAsIC8vIHZlcnNpb24gMFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMSAvLyBlbnRyeV9mbGFnc1xuICAgIF1cbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKDM2KSwgRm1wNC50eXBlKCdkaW5mJyksIEZtcDQuc2l6ZSgyOCksIEZtcDQudHlwZSgnZHJlZicpLCBuZXcgVWludDhBcnJheShkcmVmKSlcbiAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlclxuICB9XG4gIHN0YXRpYyBzdGJsIChkYXRhKSB7XG4gICAgbGV0IHNpemUgPSA4XG4gICAgbGV0IHN0c2QgPSBGbXA0LnN0c2QoZGF0YSlcbiAgICBsZXQgc3R0cyA9IEZtcDQuc3R0cygpXG4gICAgbGV0IHN0c2MgPSBGbXA0LnN0c2MoKVxuICAgIGxldCBzdHN6ID0gRm1wNC5zdHN6KClcbiAgICBsZXQgc3RjbyA9IEZtcDQuc3RjbygpO1xuICAgIFtzdHNkLCBzdHRzLCBzdHNjLCBzdHN6LCBzdGNvXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGhcbiAgICB9KVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goc2l6ZSwgJ3N0YmwnLCBzdHNkLCBzdHRzLCBzdHNjLCBzdHN6LCBzdGNvKVxuICB9XG4gIHN0YXRpYyBzdHNkIChkYXRhKSB7XG4gICAgbGV0IGNvbnRlbnRcbiAgICBpZiAoZGF0YS50eXBlID09PSAnYXVkaW8nKSB7XG4gICAgICAvLyBpZiAoIWRhdGEuaXNBQUMgJiYgZGF0YS5jb2RlYyA9PT0gJ21wNCcpIHtcbiAgICAgIC8vICAgICBjb250ZW50ID0gRk1QNC5tcDMoZGF0YSk7XG4gICAgICAvLyB9IGVsc2Uge1xuICAgICAgLy9cbiAgICAgIC8vIH1cbiAgICAgIC8vIOaUr+aMgW1wNGFcbiAgICAgIGNvbnRlbnQgPSBGbXA0Lm1wNGEoZGF0YSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29udGVudCA9IEZtcDQuYXZjMShkYXRhKVxuICAgIH1cbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDE2ICsgY29udGVudC5ieXRlTGVuZ3RoLCAnc3RzZCcsIEZtcDQuZXh0ZW5zaW9uKDAsIDApLCBuZXcgVWludDhBcnJheShbMHgwMCwgMHgwMCwgMHgwMCwgMHgwMV0pLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyBtcDRhIChkYXRhKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIDB4MDEsIC8vIGRhdGFfcmVmZXJlbmNlX2luZGV4XG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIGRhdGEuY2hhbm5lbENvdW50LCAvLyBjaGFubmVsY291bnRcbiAgICAgIDB4MDAsIDB4MTAsIC8vIHNhbXBsZVNpemU6MTZiaXRzXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZDJcbiAgICAgIChkYXRhLnNhbXBsZXJhdGUgPj4gOCkgJiAweGZmLFxuICAgICAgZGF0YS5zYW1wbGVyYXRlICYgMHhmZiwgLy9cbiAgICAgIDB4MDAsIDB4MDBcbiAgICBdKVxuICAgIGxldCBlc2RzID0gRm1wNC5lc2RzKGRhdGEuY29uZmlnKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goOCArIGNvbnRlbnQuYnl0ZUxlbmd0aCArIGVzZHMuYnl0ZUxlbmd0aCwgJ21wNGEnLCBjb250ZW50LCBlc2RzKVxuICB9XG4gIHN0YXRpYyBlc2RzIChjb25maWcgPSBbNDMsIDE0NiwgOCwgMF0pIHtcbiAgICBjb25zdCBjb25maWdsZW4gPSBjb25maWcubGVuZ3RoXG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgLy8gdmVyc2lvbiAwXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuXG4gICAgICAweDAzLCAvLyBkZXNjcmlwdG9yX3R5cGVcbiAgICAgIDB4MTcgKyBjb25maWdsZW4sIC8vIGxlbmd0aFxuICAgICAgMHgwMCwgMHgwMSwgLy8gZXNfaWRcbiAgICAgIDB4MDAsIC8vIHN0cmVhbV9wcmlvcml0eVxuXG4gICAgICAweDA0LCAvLyBkZXNjcmlwdG9yX3R5cGVcbiAgICAgIDB4MGYgKyBjb25maWdsZW4sIC8vIGxlbmd0aFxuICAgICAgMHg0MCwgLy8gY29kZWMgOiBtcGVnNF9hdWRpb1xuICAgICAgMHgxNSwgLy8gc3RyZWFtX3R5cGVcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGJ1ZmZlcl9zaXplXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBtYXhCaXRyYXRlXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBhdmdCaXRyYXRlXG5cbiAgICAgIDB4MDUgLy8gZGVzY3JpcHRvcl90eXBlXG4gICAgXS5jb25jYXQoW2NvbmZpZ2xlbl0pLmNvbmNhdChjb25maWcpLmNvbmNhdChbMHgwNiwgMHgwMSwgMHgwMl0pKVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoOCArIGNvbnRlbnQuYnl0ZUxlbmd0aCksIEZtcDQudHlwZSgnZXNkcycpLCBjb250ZW50KVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIGF2YzEgKGRhdGEpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IHNpemUgPSA0MC8vIDgoYXZjMSkrOChhdmNjKSs4KGJ0cnQpKzE2KHBhc3ApXG4gICAgLy8gbGV0IHNwcyA9IGRhdGEuc3BzXG4gICAgLy8gbGV0IHBwcyA9IGRhdGEucHBzXG4gICAgbGV0IHdpZHRoID0gZGF0YS53aWR0aFxuICAgIGxldCBoZWlnaHQgPSBkYXRhLmhlaWdodFxuICAgIGxldCBoU3BhY2luZyA9IGRhdGEucGFyUmF0aW8uaGVpZ2h0XG4gICAgbGV0IHZTcGFjaW5nID0gZGF0YS5wYXJSYXRpby53aWR0aFxuICAgIC8vIGxldCBhdmNjQnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgLy8gYXZjY0J1ZmZlci53cml0ZShuZXcgVWludDhBcnJheShbXG4gICAgLy8gICAweDAxLCAvLyB2ZXJzaW9uXG4gICAgLy8gICBzcHNbMV0sIC8vIHByb2ZpbGVcbiAgICAvLyAgIHNwc1syXSwgLy8gcHJvZmlsZSBjb21wYXRpYmxlXG4gICAgLy8gICBzcHNbM10sIC8vIGxldmVsXG4gICAgLy8gICAweGZjIHwgMyxcbiAgICAvLyAgIDB4RTAgfCAxIC8vIOebruWJjeWPquWkhOeQhuS4gOS4qnNwc1xuICAgIC8vIF0uY29uY2F0KFtzcHMubGVuZ3RoID4+PiA4ICYgMHhmZiwgc3BzLmxlbmd0aCAmIDB4ZmZdKSkpXG4gICAgLy8gYXZjY0J1ZmZlci53cml0ZShzcHMsIG5ldyBVaW50OEFycmF5KFsxLCBwcHMubGVuZ3RoID4+PiA4ICYgMHhmZiwgcHBzLmxlbmd0aCAmIDB4ZmZdKSwgcHBzKVxuXG4gICAgbGV0IGF2Y2MgPSBkYXRhLmF2Y2NcbiAgICBsZXQgYXZjMSA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMSwgLy8gZGF0YV9yZWZlcmVuY2VfaW5kZXhcbiAgICAgIDB4MDAsIDB4MDAsIC8vIHByZV9kZWZpbmVkXG4gICAgICAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBwcmVfZGVmaW5lZFxuICAgICAgKHdpZHRoID4+IDgpICYgMHhmZixcbiAgICAgIHdpZHRoICYgMHhmZiwgLy8gd2lkdGhcbiAgICAgIChoZWlnaHQgPj4gOCkgJiAweGZmLFxuICAgICAgaGVpZ2h0ICYgMHhmZiwgLy8gaGVpZ2h0XG4gICAgICAweDAwLCAweDQ4LCAweDAwLCAweDAwLCAvLyBob3JpenJlc29sdXRpb25cbiAgICAgIDB4MDAsIDB4NDgsIDB4MDAsIDB4MDAsIC8vIHZlcnRyZXNvbHV0aW9uXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMSwgLy8gZnJhbWVfY291bnRcbiAgICAgIDB4MTIsXG4gICAgICAweDY0LCAweDYxLCAweDY5LCAweDZDLCAvLyBkYWlseW1vdGlvbi9obHMuanNcbiAgICAgIDB4NzksIDB4NkQsIDB4NkYsIDB4NzQsXG4gICAgICAweDY5LCAweDZGLCAweDZFLCAweDJGLFxuICAgICAgMHg2OCwgMHg2QywgMHg3MywgMHgyRSxcbiAgICAgIDB4NkEsIDB4NzMsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGNvbXByZXNzb3JuYW1lXG4gICAgICAweDAwLCAweDE4LCAvLyBkZXB0aCA9IDI0XG4gICAgICAweDExLCAweDExXSkgLy8gcHJlX2RlZmluZWQgPSAtMVxuICAgIGxldCBidHJ0ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgxYywgMHg5YywgMHg4MCwgLy8gYnVmZmVyU2l6ZURCXG4gICAgICAweDAwLCAweDJkLCAweGM2LCAweGMwLCAvLyBtYXhCaXRyYXRlXG4gICAgICAweDAwLCAweDJkLCAweGM2LCAweGMwIC8vIGF2Z0JpdHJhdGVcbiAgICBdKVxuICAgIGxldCBwYXNwID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgKGhTcGFjaW5nID4+IDI0KSwgLy8gaFNwYWNpbmdcbiAgICAgIChoU3BhY2luZyA+PiAxNikgJiAweGZmLFxuICAgICAgKGhTcGFjaW5nID4+IDgpICYgMHhmZixcbiAgICAgIGhTcGFjaW5nICYgMHhmZixcbiAgICAgICh2U3BhY2luZyA+PiAyNCksIC8vIHZTcGFjaW5nXG4gICAgICAodlNwYWNpbmcgPj4gMTYpICYgMHhmZixcbiAgICAgICh2U3BhY2luZyA+PiA4KSAmIDB4ZmYsXG4gICAgICB2U3BhY2luZyAmIDB4ZmZcbiAgICBdKVxuXG4gICAgYnVmZmVyLndyaXRlKFxuICAgICAgRm1wNC5zaXplKHNpemUgKyBhdmMxLmJ5dGVMZW5ndGggKyBhdmNjLmJ5dGVMZW5ndGggKyBidHJ0LmJ5dGVMZW5ndGgpLCBGbXA0LnR5cGUoJ2F2YzEnKSwgYXZjMSxcbiAgICAgIEZtcDQuc2l6ZSg4ICsgYXZjYy5ieXRlTGVuZ3RoKSwgRm1wNC50eXBlKCdhdmNDJyksIGF2Y2MsXG4gICAgICBGbXA0LnNpemUoMjApLCBGbXA0LnR5cGUoJ2J0cnQnKSwgYnRydCxcbiAgICAgIEZtcDQuc2l6ZSgxNiksIEZtcDQudHlwZSgncGFzcCcpLCBwYXNwXG4gICAgKVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIHN0dHMgKCkge1xuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgLy8gdmVyc2lvblxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAgLy8gZW50cnlfY291bnRcbiAgICBdKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTYsICdzdHRzJywgY29udGVudClcbiAgfVxuICBzdGF0aWMgc3RzYyAoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCAvLyBlbnRyeV9jb3VudFxuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxNiwgJ3N0c2MnLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyBzdGNvICgpIHtcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIC8vIHZlcnNpb25cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwIC8vIGVudHJ5X2NvdW50XG4gICAgXSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDE2LCAnc3RjbycsIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIHN0c3ogKCkge1xuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgLy8gdmVyc2lvblxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHNhbXBsZV9zaXplXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwIC8vIHNhbXBsZV9jb3VudFxuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgyMCwgJ3N0c3onLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyBtdmV4IChkdXJhdGlvbiwgdGltZXNjYWxlID0gMTAwMCwgdHJhY2tJRCkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgbWVoZCA9IEJ1ZmZlci53cml0ZVVpbnQzMihkdXJhdGlvbilcbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKDU2KSwgRm1wNC50eXBlKCdtdmV4JyksIEZtcDQuc2l6ZSgxNiksIEZtcDQudHlwZSgnbWVoZCcpLCBGbXA0LmV4dGVuc2lvbigwLCAwKSwgbWVoZCwgRm1wNC50cmV4KHRyYWNrSUQpKVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIHRyZXggKGlkKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uIDBcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAoaWQgPj4gMjQpLFxuICAgICAgKGlkID4+IDE2KSAmIDB4ZmYsXG4gICAgICAoaWQgPj4gOCkgJiAweGZmLFxuICAgICAgKGlkICYgMHhmZiksIC8vIHRyYWNrX0lEXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAxLCAvLyBkZWZhdWx0X3NhbXBsZV9kZXNjcmlwdGlvbl9pbmRleFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZGVmYXVsdF9zYW1wbGVfZHVyYXRpb25cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGRlZmF1bHRfc2FtcGxlX3NpemVcbiAgICAgIDB4MDAsIDB4MDEsIDB4MDAsIDB4MDEgLy8gZGVmYXVsdF9zYW1wbGVfZmxhZ3NcbiAgICBdKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goOCArIGNvbnRlbnQuYnl0ZUxlbmd0aCwgJ3RyZXgnLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyBtb29mIChkYXRhKSB7XG4gICAgbGV0IHNpemUgPSA4XG4gICAgbGV0IG1maGQgPSBGbXA0Lm1maGQoKVxuICAgIGxldCB0cmFmID0gRm1wNC50cmFmKGRhdGEpO1xuICAgIFttZmhkLCB0cmFmXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGhcbiAgICB9KVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goc2l6ZSwgJ21vb2YnLCBtZmhkLCB0cmFmKVxuICB9XG4gIHN0YXRpYyBtZmhkICgpIHtcbiAgICBsZXQgY29udGVudCA9IEJ1ZmZlci53cml0ZVVpbnQzMihGbXA0LnNlcXVlbmNlKVxuICAgIEZtcDQuc2VxdWVuY2UgKz0gMVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTYsICdtZmhkJywgRm1wNC5leHRlbnNpb24oMCwgMCksIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIHRyYWYgKGRhdGEpIHtcbiAgICBsZXQgc2l6ZSA9IDhcbiAgICBsZXQgdGZoZCA9IEZtcDQudGZoZChkYXRhLmlkKVxuICAgIGxldCB0ZmR0ID0gRm1wNC50ZmR0KGRhdGEudGltZSlcbiAgICBsZXQgc2R0cCA9IEZtcDQuc2R0cChkYXRhKVxuICAgIGxldCB0cnVuID0gRm1wNC50cnVuKGRhdGEsIHNkdHAuYnl0ZUxlbmd0aCk7XG5cbiAgICBbdGZoZCwgdGZkdCwgdHJ1biwgc2R0cF0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KHNpemUsICd0cmFmJywgdGZoZCwgdGZkdCwgdHJ1biwgc2R0cClcbiAgfVxuICBzdGF0aWMgdGZoZCAoaWQpIHtcbiAgICBsZXQgY29udGVudCA9IEJ1ZmZlci53cml0ZVVpbnQzMihpZClcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDE2LCAndGZoZCcsIEZtcDQuZXh0ZW5zaW9uKDAsIDApLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyB0ZmR0ICh0aW1lKSB7XG4gICAgLy8gbGV0IHVwcGVyID0gTWF0aC5mbG9vcih0aW1lIC8gKFVJTlQzMl9NQVggKyAxKSksXG4gICAgLy8gICAgIGxvd2VyID0gTWF0aC5mbG9vcih0aW1lICUgKFVJTlQzMl9NQVggKyAxKSk7XG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxNiwgJ3RmZHQnLCBGbXA0LmV4dGVuc2lvbigwLCAwKSwgQnVmZmVyLndyaXRlVWludDMyKHRpbWUpKVxuICB9XG4gIHN0YXRpYyB0cnVuIChkYXRhLCBzZHRwTGVuZ3RoKSB7XG4gICAgLy8gbGV0IGlkID0gZGF0YS5pZDtcbiAgICAvLyBsZXQgY2VpbCA9IGlkID09PSAxID8gMTYgOiAxMjtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IHNhbXBsZUNvdW50ID0gQnVmZmVyLndyaXRlVWludDMyKGRhdGEuc2FtcGxlcy5sZW5ndGgpXG4gICAgLy8gbWRhdC1oZWFkZXIgOFxuICAgIC8vIG1vb2YtaGVhZGVyIDhcbiAgICAvLyBtZmhkIDE2XG4gICAgLy8gdHJhZi1oZWFkZXIgOFxuICAgIC8vIHRoaGQgMTZcbiAgICAvLyB0ZmR0IDIwXG4gICAgLy8gdHJ1bi1oZWFkZXIgMTJcbiAgICAvLyBzYW1wbGVDb3VudCA0XG4gICAgLy8gZGF0YS1vZmZzZXQgNFxuICAgIC8vIHNhbXBsZXMubGVuZ3RoXG4gICAgbGV0IG9mZnNldCA9IEJ1ZmZlci53cml0ZVVpbnQzMig4ICsgOCArIDE2ICsgOCArIDE2ICsgMTYgKyAxMiArIDQgKyA0ICsgMTYgKiBkYXRhLnNhbXBsZXMubGVuZ3RoICsgc2R0cExlbmd0aClcbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKDIwICsgMTYgKiBkYXRhLnNhbXBsZXMubGVuZ3RoKSwgRm1wNC50eXBlKCd0cnVuJyksIG5ldyBVaW50OEFycmF5KFsweDAwLCAweDAwLCAweDBGLCAweDAxXSksIHNhbXBsZUNvdW50LCBvZmZzZXQpXG5cbiAgICAvLyBsZXQgc2l6ZSA9IGJ1ZmZlci5idWZmZXIuYnl0ZUxlbmd0aFxuICAgIC8vIGxldCB3cml0ZU9mZnNldCA9IDBcbiAgICAvLyBkYXRhLnNhbXBsZXMuZm9yRWFjaCgoKSA9PiB7XG4gICAgLy8gICBzaXplICs9IDE2XG4gICAgLy8gfSlcbiAgICAvL1xuICAgIC8vIGxldCB0cnVuQm94ID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSlcblxuICAgIC8vIHRydW5Cb3guc2V0KGJ1ZmZlci5idWZmZXIsIDApXG5cbiAgICBkYXRhLnNhbXBsZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgZmxhZ3MgPSBpdGVtLmZsYWdzXG4gICAgICAvLyBjb25zb2xlLmxvZyhpdGVtLnR5cGUsIGl0ZW0uZHRzLCBpdGVtLmR1cmF0aW9uKVxuXG4gICAgICBidWZmZXIud3JpdGUobmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAoaXRlbS5kdXJhdGlvbiA+Pj4gMjQpICYgMHhGRiwgLy8gc2FtcGxlX2R1cmF0aW9uXG4gICAgICAgIChpdGVtLmR1cmF0aW9uID4+PiAxNikgJiAweEZGLFxuICAgICAgICAoaXRlbS5kdXJhdGlvbiA+Pj4gOCkgJiAweEZGLFxuICAgICAgICAoaXRlbS5kdXJhdGlvbikgJiAweEZGLFxuICAgICAgICAoaXRlbS5zaXplID4+PiAyNCkgJiAweEZGLCAvLyBzYW1wbGVfc2l6ZVxuICAgICAgICAoaXRlbS5zaXplID4+PiAxNikgJiAweEZGLFxuICAgICAgICAoaXRlbS5zaXplID4+PiA4KSAmIDB4RkYsXG4gICAgICAgIChpdGVtLnNpemUpICYgMHhGRixcbiAgICAgICAgKGZsYWdzLmlzTGVhZGluZyA8PCAyKSB8IGZsYWdzLmRlcGVuZHNPbiwgLy8gc2FtcGxlX2ZsYWdzXG4gICAgICAgIChmbGFncy5pc0RlcGVuZGVkT24gPDwgNikgfCAoZmxhZ3MuaGFzUmVkdW5kYW5jeSA8PCA0KSB8IGZsYWdzLmlzTm9uU3luYyxcbiAgICAgICAgMHgwMCwgMHgwMCwgLy8gc2FtcGxlX2RlZ3JhZGF0aW9uX3ByaW9yaXR5XG4gICAgICAgIChpdGVtLmN0cyA+Pj4gMjQpICYgMHhGRiwgLy8gc2FtcGxlX2NvbXBvc2l0aW9uX3RpbWVfb2Zmc2V0XG4gICAgICAgIChpdGVtLmN0cyA+Pj4gMTYpICYgMHhGRixcbiAgICAgICAgKGl0ZW0uY3RzID4+PiA4KSAmIDB4RkYsXG4gICAgICAgIChpdGVtLmN0cykgJiAweEZGXG4gICAgICBdKSlcbiAgICAgIC8vIHdyaXRlT2Zmc2V0ICs9IDE2XG4gICAgICAvLyBidWZmZXIud3JpdGUoQnVmZmVyLndyaXRlVWludDMyKDApKTtcbiAgICB9KVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIHNkdHAgKGRhdGEpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgYnVmZmVyLndyaXRlKEZtcDQuc2l6ZSgxMiArIGRhdGEuc2FtcGxlcy5sZW5ndGgpLCBGbXA0LnR5cGUoJ3NkdHAnKSwgRm1wNC5leHRlbnNpb24oMCwgMCkpXG4gICAgZGF0YS5zYW1wbGVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBjb25zdCBmbGFncyA9IGl0ZW0uZmxhZ3NcbiAgICAgIGNvbnN0IG51bSA9IChmbGFncy5pc0xlYWRpbmcgPDwgNikgfCAvLyBpc19sZWFkaW5nOiAyIChiaXQpXG4gICAgICAgIChmbGFncy5kZXBlbmRzT24gPDwgNCkgfCAvLyBzYW1wbGVfZGVwZW5kc19vblxuICAgICAgICAoZmxhZ3MuaXNEZXBlbmRlZE9uIDw8IDIpIHwgLy8gc2FtcGxlX2lzX2RlcGVuZGVkX29uXG4gICAgICAgIChmbGFncy5oYXNSZWR1bmRhbmN5KS8vIHNhbXBsZV9oYXNfcmVkdW5kYW5jeVxuXG4gICAgICBidWZmZXIud3JpdGUobmV3IFVpbnQ4QXJyYXkoW251bV0pKVxuICAgIH0pXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgbWRhdCAoZGF0YSkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgc2l6ZSA9IDhcbiAgICBkYXRhLnNhbXBsZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5zaXplXG4gICAgfSlcbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKHNpemUpLCBGbXA0LnR5cGUoJ21kYXQnKSlcbiAgICBsZXQgbWRhdEJveCA9IG5ldyBVaW50OEFycmF5KHNpemUpXG4gICAgbGV0IG9mZnNldCA9IDBcbiAgICBtZGF0Qm94LnNldChidWZmZXIuYnVmZmVyLCBvZmZzZXQpXG4gICAgb2Zmc2V0ICs9IDhcbiAgICBkYXRhLnNhbXBsZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGl0ZW0uYnVmZmVyLmZvckVhY2goKHVuaXQpID0+IHtcbiAgICAgICAgbWRhdEJveC5zZXQodW5pdCwgb2Zmc2V0KVxuICAgICAgICBvZmZzZXQgKz0gdW5pdC5ieXRlTGVuZ3RoXG4gICAgICAgIC8vIGJ1ZmZlci53cml0ZSh1bml0LmRhdGEpO1xuICAgICAgfSlcbiAgICB9KVxuICAgIHJldHVybiBtZGF0Qm94XG4gIH1cbn1cbkZtcDQudHlwZSA9IChuYW1lKSA9PiB7XG4gIHJldHVybiBuZXcgVWludDhBcnJheShbbmFtZS5jaGFyQ29kZUF0KDApLCBuYW1lLmNoYXJDb2RlQXQoMSksIG5hbWUuY2hhckNvZGVBdCgyKSwgbmFtZS5jaGFyQ29kZUF0KDMpXSlcbn1cbkZtcDQuc2VxdWVuY2UgPSAxXG5cbmV4cG9ydCBkZWZhdWx0IEZtcDRcbiIsImltcG9ydCB7XG4gIEVWRU5UUyxcbiAgc25pZmZlcixcbiAgTWVkaWFTZWdtZW50TGlzdCxcbiAgQnVmZmVyXG59IGZyb20gJ3hncGxheWVyLXV0aWxzJztcbmltcG9ydCBGbXA0IGZyb20gJy4vZm1wNCdcblxuY29uc3QgUkVNVVhfRVZFTlRTID0gRVZFTlRTLlJFTVVYX0VWRU5UU1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNcDRSZW11eGVyIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuX2R0c0Jhc2UgPSAwXG4gICAgdGhpcy5faXNEdHNCYXNlSW5pdGVkID0gZmFsc2VcblxuICAgIHRoaXMuaXNGaXJzdFZpZGVvID0gdHJ1ZVxuICAgIHRoaXMuaXNGaXJzdEF1ZGlvID0gdHJ1ZVxuXG4gICAgdGhpcy52aWRlb0FsbER1cmF0aW9uID0gMFxuICAgIHRoaXMuYXVkaW9BbGxEdXJhdGlvbiA9IDBcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIHRoaXMub24oUkVNVVhfRVZFTlRTLlJFTVVYX01FRElBLCB0aGlzLnJlbXV4LmJpbmQodGhpcykpXG4gICAgdGhpcy5vbihSRU1VWF9FVkVOVFMuUkVNVVhfTUVUQURBVEEsIHRoaXMub25NZXRhRGF0YVJlYWR5LmJpbmQodGhpcykpXG4gICAgdGhpcy5vbihSRU1VWF9FVkVOVFMuREVURUNUX0NIQU5HRV9TVFJFQU0sIHRoaXMucmVzZXREdHNCYXNlLmJpbmQodGhpcykpXG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLl9kdHNCYXNlID0gLTFcbiAgICB0aGlzLl9kdHNCYXNlSW5pdGVkID0gZmFsc2VcbiAgfVxuXG4gIHJlc2V0ICgpIHtcbiAgICB0aGlzLl9kdHNCYXNlID0gMFxuICAgIHRoaXMuX2lzRHRzQmFzZUluaXRlZCA9IGZhbHNlXG4gIH1cblxuICByZW11eCAoKSB7XG4gICAgY29uc3QgeyBhdWRpb1RyYWNrLCB2aWRlb1RyYWNrIH0gPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKVxuICAgICF0aGlzLl9pc0R0c0Jhc2VJbml0ZWQgJiYgdGhpcy5jYWxjRHRzQmFzZShhdWRpb1RyYWNrLCB2aWRlb1RyYWNrKVxuXG4gICAgdGhpcy5fcmVtdXhWaWRlbyh2aWRlb1RyYWNrKVxuICAgIHRoaXMuX3JlbXV4QXVkaW8oYXVkaW9UcmFjaylcbiAgfVxuXG4gIHJlc2V0RHRzQmFzZSAoKSB7XG4gICAgLy8gZm9yIGhscyDkuK3pgJTliIfmjaIgbWV0YeWQjnNlZWtcbiAgICB0aGlzLl9kdHNCYXNlID0gMFxuICAgIHRoaXMuX2R0c0Jhc2VJbml0ZWQgPSBmYWxzZVxuICB9XG5cbiAgc2VlayAoKSB7XG5cbiAgfVxuXG4gIG9uTWV0YURhdGFSZWFkeSAodHlwZSkge1xuICAgIGxldCB0cmFja1xuXG4gICAgaWYgKHR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgIGNvbnN0IHsgYXVkaW9UcmFjayB9ID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJylcbiAgICAgIHRyYWNrID0gYXVkaW9UcmFjaztcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgeyB2aWRlb1RyYWNrIH0gPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKVxuICAgICAgdHJhY2sgPSB2aWRlb1RyYWNrO1xuICAgIH1cblxuICAgIGxldCBwcmVzb3VyY2VidWZmZXIgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdQUkVfU09VUkNFX0JVRkZFUicpO1xuICAgIGxldCBzb3VyY2UgPSBwcmVzb3VyY2VidWZmZXIuZ2V0U291cmNlKHR5cGUpO1xuICAgIGlmICghc291cmNlKSB7XG4gICAgICBzb3VyY2UgPSBwcmVzb3VyY2VidWZmZXIuY3JlYXRlU291cmNlKHR5cGUpO1xuICAgIH1cblxuICAgIHNvdXJjZS5taW1ldHlwZSA9IHRyYWNrLm1ldGEuY29kZWM7XG4gICAgc291cmNlLmluaXQgPSB0aGlzLnJlbXV4SW5pdFNlZ21lbnQodHlwZSwgdHJhY2subWV0YSk7XG4gICAgLy8gc291cmNlLmluaXRlZCA9IGZhbHNlO1xuXG4gICAgLy8gdGhpcy5yZXNldER0c0Jhc2UoKVxuICAgIHRoaXMuZW1pdChSRU1VWF9FVkVOVFMuSU5JVF9TRUdNRU5ULCB0eXBlKVxuICB9XG5cbiAgcmVtdXhJbml0U2VnbWVudCAodHlwZSwgbWV0YSkge1xuICAgIGxldCBpbml0U2VnbWVudCA9IG5ldyBCdWZmZXIoKVxuICAgIGxldCBmdHlwID0gRm1wNC5mdHlwKClcbiAgICBsZXQgbW9vdiA9IEZtcDQubW9vdih7IHR5cGUsIG1ldGE6IG1ldGEgfSlcblxuICAgIGluaXRTZWdtZW50LndyaXRlKGZ0eXAsIG1vb3YpXG4gICAgcmV0dXJuIGluaXRTZWdtZW50O1xuICB9XG5cbiAgY2FsY0R0c0Jhc2UgKGF1ZGlvVHJhY2ssIHZpZGVvVHJhY2spIHtcbiAgICBpZiAoIWF1ZGlvVHJhY2suc2FtcGxlcy5sZW5ndGggJiYgIXZpZGVvVHJhY2suc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgYXVkaW9CYXNlID0gSW5maW5pdHlcbiAgICBsZXQgdmlkZW9CYXNlID0gSW5maW5pdHlcblxuICAgIGlmIChhdWRpb1RyYWNrLnNhbXBsZXMgJiYgYXVkaW9UcmFjay5zYW1wbGVzLmxlbmd0aCkge1xuICAgICAgYXVkaW9CYXNlID0gYXVkaW9UcmFjay5zYW1wbGVzWzBdLmR0c1xuICAgIH1cbiAgICBpZiAodmlkZW9UcmFjay5zYW1wbGVzICYmIHZpZGVvVHJhY2suc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHZpZGVvQmFzZSA9IHZpZGVvVHJhY2suc2FtcGxlc1swXS5kdHNcbiAgICB9XG5cbiAgICB0aGlzLl9kdHNCYXNlID0gTWF0aC5taW4oYXVkaW9CYXNlLCB2aWRlb0Jhc2UpXG4gICAgdGhpcy5faXNEdHNCYXNlSW5pdGVkID0gdHJ1ZVxuICB9XG5cbiAgX3JlbXV4VmlkZW8gKHZpZGVvVHJhY2spIHtcbiAgICBjb25zdCB0cmFjayA9IHZpZGVvVHJhY2tcblxuICAgIGlmICghdmlkZW9UcmFjay5zYW1wbGVzIHx8ICF2aWRlb1RyYWNrLnNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQge3NhbXBsZXN9ID0gdHJhY2tcbiAgICBsZXQgZmlyc3REdHMgPSAtMVxuXG4gICAgbGV0IGluaXRTZWdtZW50ID0gbnVsbFxuICAgIGNvbnN0IG1wNFNhbXBsZXMgPSBbXVxuICAgIGNvbnN0IG1kYXRCb3ggPSB7XG4gICAgICBzYW1wbGVzOiBbXVxuICAgIH1cblxuICAgIHdoaWxlIChzYW1wbGVzLmxlbmd0aCkge1xuICAgICAgY29uc3QgYXZjU2FtcGxlID0gc2FtcGxlcy5zaGlmdCgpXG5cbiAgICAgIGNvbnN0IHsgaXNLZXlmcmFtZSwgb3B0aW9ucyB9ID0gYXZjU2FtcGxlXG4gICAgICBpZiAoIXRoaXMuaXNGaXJzdEF1ZGlvICYmIG9wdGlvbnMgJiYgb3B0aW9ucy5tZXRhKSB7XG4gICAgICAgIGluaXRTZWdtZW50ID0gdGhpcy5yZW11eEluaXRTZWdtZW50KCd2aWRlbycsIG9wdGlvbnMubWV0YSlcbiAgICAgICAgb3B0aW9ucy5tZXRhID0gbnVsbFxuICAgICAgICBzYW1wbGVzLnVuc2hpZnQoYXZjU2FtcGxlKVxuICAgICAgICBpZiAoIW9wdGlvbnMuaXNDb250aW51ZSkge1xuICAgICAgICAgIHRoaXMucmVzZXREdHNCYXNlKClcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgbGV0IGR0cyA9IGF2Y1NhbXBsZS5kdHMgLSB0aGlzLl9kdHNCYXNlXG5cbiAgICAgIGlmIChmaXJzdER0cyA9PT0gLTEpIHtcbiAgICAgICAgZmlyc3REdHMgPSBkdHNcbiAgICAgIH1cblxuICAgICAgbGV0IGN0c1xuICAgICAgbGV0IHB0c1xuICAgICAgaWYgKGF2Y1NhbXBsZS5wdHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwdHMgPSBhdmNTYW1wbGUucHRzIC0gdGhpcy5fZHRzQmFzZVxuICAgICAgICBjdHMgPSBwdHMgLSBkdHNcbiAgICAgIH1cbiAgICAgIGlmIChhdmNTYW1wbGUuY3RzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcHRzID0gYXZjU2FtcGxlLmN0cyArIGR0c1xuICAgICAgICBjdHMgPSBhdmNTYW1wbGUuY3RzXG4gICAgICB9XG5cbiAgICAgIGxldCBtZGF0U2FtcGxlID0ge1xuICAgICAgICBidWZmZXI6IFtdLFxuICAgICAgICBzaXplOiAwXG4gICAgICB9XG4gICAgICBtZGF0Qm94LnNhbXBsZXMucHVzaChtZGF0U2FtcGxlKVxuICAgICAgbWRhdFNhbXBsZS5idWZmZXIucHVzaChhdmNTYW1wbGUuZGF0YSlcbiAgICAgIG1kYXRTYW1wbGUuc2l6ZSArPSBhdmNTYW1wbGUuZGF0YS5ieXRlTGVuZ3RoXG5cbiAgICAgIGxldCBzYW1wbGVEdXJhdGlvbiA9IDBcbiAgICAgIGlmIChzYW1wbGVzLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgIGNvbnN0IG5leHREdHMgPSBzYW1wbGVzWzBdLmR0cyAtIHRoaXMuX2R0c0Jhc2VcbiAgICAgICAgc2FtcGxlRHVyYXRpb24gPSBuZXh0RHRzIC0gZHRzXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobXA0U2FtcGxlcy5sZW5ndGggPj0gMSkgeyAvLyBsYXN0ZXN0IHNhbXBsZSwgdXNlIHNlY29uZCBsYXN0IGR1cmF0aW9uXG4gICAgICAgICAgc2FtcGxlRHVyYXRpb24gPSBtcDRTYW1wbGVzW21wNFNhbXBsZXMubGVuZ3RoIC0gMV0uZHVyYXRpb25cbiAgICAgICAgfSBlbHNlIHsgLy8gdGhlIG9ubHkgb25lIHNhbXBsZSwgdXNlIHJlZmVyZW5jZSBkdXJhdGlvblxuICAgICAgICAgIHNhbXBsZUR1cmF0aW9uID0gdGhpcy52aWRlb01ldGEucmVmU2FtcGxlRHVyYXRpb25cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy52aWRlb0FsbER1cmF0aW9uICs9IHNhbXBsZUR1cmF0aW9uXG4gICAgICAvLyBjb25zb2xlLmxvZyhgZHRzICR7ZHRzfWAsIGBwdHMgJHtwdHN9YCwgYGN0czogJHtjdHN9YCwgYGR1cmF0aW9uOiAke3NhbXBsZUR1cmF0aW9ufWAsIGF2Y1NhbXBsZSlcbiAgICAgIG1wNFNhbXBsZXMucHVzaCh7XG4gICAgICAgIGR0cyxcbiAgICAgICAgY3RzLFxuICAgICAgICBwdHMsXG4gICAgICAgIGRhdGE6IGF2Y1NhbXBsZS5kYXRhLFxuICAgICAgICBzaXplOiBhdmNTYW1wbGUuZGF0YS5ieXRlTGVuZ3RoLFxuICAgICAgICBpc0tleWZyYW1lLFxuICAgICAgICBkdXJhdGlvbjogc2FtcGxlRHVyYXRpb24sXG4gICAgICAgIGZsYWdzOiB7XG4gICAgICAgICAgaXNMZWFkaW5nOiAwLFxuICAgICAgICAgIGRlcGVuZHNPbjogaXNLZXlmcmFtZSA/IDIgOiAxLFxuICAgICAgICAgIGlzRGVwZW5kZWRPbjogaXNLZXlmcmFtZSA/IDEgOiAwLFxuICAgICAgICAgIGhhc1JlZHVuZGFuY3k6IDAsXG4gICAgICAgICAgaXNOb25TeW5jOiBpc0tleWZyYW1lID8gMCA6IDFcbiAgICAgICAgfSxcbiAgICAgICAgb3JpZ2luRHRzOiBkdHMsXG4gICAgICAgIHR5cGU6ICd2aWRlbydcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgbGV0IG1vb2ZNZGF0ID0gbmV3IEJ1ZmZlcigpXG4gICAgaWYgKG1wNFNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBtb29mID0gRm1wNC5tb29mKHtcbiAgICAgICAgaWQ6IHRyYWNrLm1ldGEuaWQsXG4gICAgICAgIHRpbWU6IGZpcnN0RHRzLFxuICAgICAgICBzYW1wbGVzOiBtcDRTYW1wbGVzXG4gICAgICB9KVxuICAgICAgY29uc3QgbWRhdCA9IEZtcDQubWRhdChtZGF0Qm94KVxuICAgICAgbW9vZk1kYXQud3JpdGUobW9vZiwgbWRhdClcblxuICAgICAgdGhpcy53cml0ZVRvU291cmNlKCd2aWRlbycsIG1vb2ZNZGF0KVxuICAgIH1cblxuICAgIGlmIChpbml0U2VnbWVudCkge1xuICAgICAgdGhpcy53cml0ZVRvU291cmNlKCd2aWRlbycsIGluaXRTZWdtZW50KVxuXG4gICAgICBpZiAoc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgICAgLy8gc2Vjb25kIHBhcnQgb2Ygc3RyZWFtIGNoYW5nZVxuICAgICAgICB0cmFjay5zYW1wbGVzID0gc2FtcGxlcztcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbXV4VmlkZW8odHJhY2spXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5pc0ZpcnN0VmlkZW8gPSBmYWxzZVxuICAgIHRoaXMuZW1pdChSRU1VWF9FVkVOVFMuTUVESUFfU0VHTUVOVCwgJ3ZpZGVvJylcblxuICAgIGNvbnN0IGxhc3RTYW1wbGUgPSBtcDRTYW1wbGVzW21wNFNhbXBsZXMubGVuZ3RoIC0gMV1cbiAgICB0aGlzLl92aWRlb05leHREdHMgPSBsYXN0U2FtcGxlLmR0cyArIGxhc3RTYW1wbGUuZHVyYXRpb247XG4gICAgdHJhY2suc2FtcGxlcyA9IFtdXG4gICAgdHJhY2subGVuZ3RoID0gMFxuICB9XG5cbiAgX3JlbXV4QXVkaW8gKHRyYWNrKSB7XG4gICAgY29uc3Qge3NhbXBsZXN9ID0gdHJhY2tcbiAgICBsZXQgZmlyc3REdHMgPSAtMVxuICAgIGxldCBtcDRTYW1wbGVzID0gW11cblxuICAgIGxldCBpbml0U2VnbWVudCA9IG51bGxcbiAgICBjb25zdCBtZGF0Qm94ID0ge1xuICAgICAgc2FtcGxlczogW11cbiAgICB9XG4gICAgaWYgKCFzYW1wbGVzIHx8ICFzYW1wbGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGxldCBpc0ZpcnN0RHRzSW5pdGVkID0gZmFsc2VcbiAgICB3aGlsZSAoc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIGxldCBzYW1wbGUgPSBzYW1wbGVzLnNoaWZ0KClcbiAgICAgIGNvbnN0IHsgZGF0YSwgb3B0aW9ucyB9ID0gc2FtcGxlXG4gICAgICBpZiAoIXRoaXMuaXNGaXJzdEF1ZGlvICYmIG9wdGlvbnMgJiYgb3B0aW9ucy5tZXRhKSB7XG4gICAgICAgIGluaXRTZWdtZW50ID0gdGhpcy5yZW11eEluaXRTZWdtZW50KCdhdWRpbycsIG9wdGlvbnMubWV0YSlcbiAgICAgICAgb3B0aW9ucy5tZXRhID0gbnVsbDtcbiAgICAgICAgc2FtcGxlcy51bnNoaWZ0KHNhbXBsZSlcbiAgICAgICAgaWYgKCFvcHRpb25zLmlzQ29udGludWUpIHtcbiAgICAgICAgICB0aGlzLnJlc2V0RHRzQmFzZSgpXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGxldCBkdHMgPSBzYW1wbGUuZHRzIC0gdGhpcy5fZHRzQmFzZVxuICAgICAgY29uc3Qgb3JpZ2luRHRzID0gZHRzXG4gICAgICBpZiAoIWlzRmlyc3REdHNJbml0ZWQpIHtcbiAgICAgICAgZmlyc3REdHMgPSBkdHNcbiAgICAgICAgaXNGaXJzdER0c0luaXRlZCA9IHRydWVcbiAgICAgIH1cblxuICAgICAgbGV0IHNhbXBsZUR1cmF0aW9uID0gMFxuXG4gICAgICBpZiAodGhpcy5hdWRpb01ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZCkge1xuICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IHRoaXMuYXVkaW9NZXRhLnJlZlNhbXBsZUR1cmF0aW9uRml4ZWRcbiAgICAgIH0gZWxzZSBpZiAoc2FtcGxlcy5sZW5ndGggPj0gMSkge1xuICAgICAgICBjb25zdCBuZXh0RHRzID0gc2FtcGxlc1swXS5kdHMgLSB0aGlzLl9kdHNCYXNlO1xuICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IG5leHREdHMgLSBkdHNcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChtcDRTYW1wbGVzLmxlbmd0aCA+PSAxKSB7IC8vIHVzZSBzZWNvbmQgbGFzdCBzYW1wbGUgZHVyYXRpb25cbiAgICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IG1wNFNhbXBsZXNbbXA0U2FtcGxlcy5sZW5ndGggLSAxXS5kdXJhdGlvblxuICAgICAgICB9IGVsc2UgeyAvLyB0aGUgb25seSBvbmUgc2FtcGxlLCB1c2UgcmVmZXJlbmNlIHNhbXBsZSBkdXJhdGlvblxuICAgICAgICAgIHNhbXBsZUR1cmF0aW9uID0gdGhpcy5hdWRpb01ldGEucmVmU2FtcGxlRHVyYXRpb25cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBjb25zb2xlLmxvZygncmVtdXggYXVkaW8gJywgZHRzKVxuICAgICAgdGhpcy5hdWRpb0FsbER1cmF0aW9uICs9IHNhbXBsZUR1cmF0aW9uXG4gICAgICBjb25zdCBtcDRTYW1wbGUgPSB7XG4gICAgICAgIGR0cyxcbiAgICAgICAgcHRzOiBkdHMsXG4gICAgICAgIGN0czogMCxcbiAgICAgICAgc2l6ZTogZGF0YS5ieXRlTGVuZ3RoLFxuICAgICAgICBkdXJhdGlvbjogc2FtcGxlLmR1cmF0aW9uID8gc2FtcGxlLmR1cmF0aW9uIDogc2FtcGxlRHVyYXRpb24sXG4gICAgICAgIGZsYWdzOiB7XG4gICAgICAgICAgaXNMZWFkaW5nOiAwLFxuICAgICAgICAgIGRlcGVuZHNPbjogMixcbiAgICAgICAgICBpc0RlcGVuZGVkT246IDEsXG4gICAgICAgICAgaGFzUmVkdW5kYW5jeTogMCxcbiAgICAgICAgICBpc05vblN5bmM6IDBcbiAgICAgICAgfSxcbiAgICAgICAgaXNLZXlmcmFtZTogdHJ1ZSxcbiAgICAgICAgb3JpZ2luRHRzLFxuICAgICAgICB0eXBlOiAnYXVkaW8nXG4gICAgICB9XG5cbiAgICAgIGxldCBtZGF0U2FtcGxlID0ge1xuICAgICAgICBidWZmZXI6IFtdLFxuICAgICAgICBzaXplOiAwXG4gICAgICB9XG4gICAgICBtZGF0U2FtcGxlLmJ1ZmZlci5wdXNoKGRhdGEpXG4gICAgICBtZGF0U2FtcGxlLnNpemUgKz0gZGF0YS5ieXRlTGVuZ3RoXG5cbiAgICAgIG1kYXRCb3guc2FtcGxlcy5wdXNoKG1kYXRTYW1wbGUpXG5cbiAgICAgIG1wNFNhbXBsZXMucHVzaChtcDRTYW1wbGUpXG4gICAgfVxuXG4gICAgY29uc3QgbW9vZk1kYXQgPSBuZXcgQnVmZmVyKClcblxuICAgIGlmIChtcDRTYW1wbGVzLmxlbmd0aCkge1xuICAgICAgY29uc3QgbW9vZiA9IEZtcDQubW9vZih7XG4gICAgICAgIGlkOiB0cmFjay5tZXRhLmlkLFxuICAgICAgICB0aW1lOiBmaXJzdER0cyxcbiAgICAgICAgc2FtcGxlczogbXA0U2FtcGxlc1xuICAgICAgfSlcbiAgICAgIGNvbnN0IG1kYXQgPSBGbXA0Lm1kYXQobWRhdEJveClcbiAgICAgIG1vb2ZNZGF0LndyaXRlKG1vb2YsIG1kYXQpXG5cbiAgICAgIHRoaXMud3JpdGVUb1NvdXJjZSgnYXVkaW8nLCBtb29mTWRhdClcbiAgICB9XG5cbiAgICBpZiAoaW5pdFNlZ21lbnQpIHtcbiAgICAgIHRoaXMud3JpdGVUb1NvdXJjZSgnYXVkaW8nLCBpbml0U2VnbWVudClcbiAgICAgIGlmIChzYW1wbGVzLmxlbmd0aCkge1xuICAgICAgICAvLyBzZWNvbmQgcGFydCBvZiBzdHJlYW0gY2hhbmdlXG4gICAgICAgIHRyYWNrLnNhbXBsZXMgPSBzYW1wbGVzO1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVtdXhBdWRpbyh0cmFjaylcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmlzRmlyc3RBdWRpbyA9IGZhbHNlXG4gICAgdGhpcy5lbWl0KFJFTVVYX0VWRU5UUy5NRURJQV9TRUdNRU5ULCAnYXVkaW8nLCBtb29mTWRhdClcblxuICAgIGNvbnN0IGxhc3RTYW1wbGUgPSBtcDRTYW1wbGVzW21wNFNhbXBsZXMubGVuZ3RoIC0gMV1cbiAgICB0aGlzLl92aWRlb05leHREdHMgPSBsYXN0U2FtcGxlLmR0cyArIGxhc3RTYW1wbGUuZHVyYXRpb247XG4gICAgdHJhY2suc2FtcGxlcyA9IFtdXG4gICAgdHJhY2subGVuZ3RoID0gMFxuICB9XG5cbiAgd3JpdGVUb1NvdXJjZSAodHlwZSwgYnVmZmVyKSB7XG4gICAgbGV0IHByZXNvdXJjZWJ1ZmZlciA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1BSRV9TT1VSQ0VfQlVGRkVSJyk7XG4gICAgbGV0IHNvdXJjZSA9IHByZXNvdXJjZWJ1ZmZlci5nZXRTb3VyY2UodHlwZSk7XG4gICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgIHNvdXJjZSA9IHByZXNvdXJjZWJ1ZmZlci5jcmVhdGVTb3VyY2UodHlwZSk7XG4gICAgfVxuXG4gICAgc291cmNlLmRhdGEucHVzaChidWZmZXIpXG4gIH1cblxuICBpbml0U2lsZW50QXVkaW8gKGR0cywgZHVyYXRpb24pIHtcbiAgICBjb25zdCB1bml0ID0gTXA0UmVtdXhlci5nZXRTaWxlbnRGcmFtZSh0aGlzLmF1ZGlvTWV0YS5jaGFubmVsQ291bnQpXG4gICAgcmV0dXJuIHtcbiAgICAgIGR0cyxcbiAgICAgIHB0czogZHRzLFxuICAgICAgY3RzOiAwLFxuICAgICAgZHVyYXRpb24sXG4gICAgICB1bml0LFxuICAgICAgc2l6ZTogdW5pdC5ieXRlTGVuZ3RoLFxuICAgICAgb3JpZ2luRHRzOiBkdHMsXG4gICAgICB0eXBlOiAndmlkZW8nXG4gICAgfVxuICB9XG5cbiAgZ2V0IHZpZGVvTWV0YSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpLnZpZGVvVHJhY2subWV0YVxuICB9XG4gIGdldCBhdWRpb01ldGEgKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKS5hdWRpb1RyYWNrLm1ldGFcbiAgfVxuXG4gIHN0YXRpYyBnZXRTaWxlbnRGcmFtZSAoY2hhbm5lbENvdW50KSB7XG4gICAgaWYgKGNoYW5uZWxDb3VudCA9PT0gMSkge1xuICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDAwLCAweGM4LCAweDAwLCAweDgwLCAweDIzLCAweDgwXSlcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gMikge1xuICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDIxLCAweDAwLCAweDQ5LCAweDkwLCAweDAyLCAweDE5LCAweDAwLCAweDIzLCAweDgwXSlcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gMykge1xuICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDAwLCAweGM4LCAweDAwLCAweDgwLCAweDIwLCAweDg0LCAweDAxLCAweDI2LCAweDQwLCAweDA4LCAweDY0LCAweDAwLCAweDhlXSlcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gNCkge1xuICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDAwLCAweGM4LCAweDAwLCAweDgwLCAweDIwLCAweDg0LCAweDAxLCAweDI2LCAweDQwLCAweDA4LCAweDY0LCAweDAwLCAweDgwLCAweDJjLCAweDgwLCAweDA4LCAweDAyLCAweDM4XSlcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gNSkge1xuICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDAwLCAweGM4LCAweDAwLCAweDgwLCAweDIwLCAweDg0LCAweDAxLCAweDI2LCAweDQwLCAweDA4LCAweDY0LCAweDAwLCAweDgyLCAweDMwLCAweDA0LCAweDk5LCAweDAwLCAweDIxLCAweDkwLCAweDAyLCAweDM4XSlcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gNikge1xuICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDAwLCAweGM4LCAweDAwLCAweDgwLCAweDIwLCAweDg0LCAweDAxLCAweDI2LCAweDQwLCAweDA4LCAweDY0LCAweDAwLCAweDgyLCAweDMwLCAweDA0LCAweDk5LCAweDAwLCAweDIxLCAweDkwLCAweDAyLCAweDAwLCAweGIyLCAweDAwLCAweDIwLCAweDA4LCAweGUwXSlcbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIENvbnRleHQ6IHJlcXVpcmUoJy4vc3JjL2NvbnRleHQnKS5kZWZhdWx0LFxuXG4gIC8vIE1vZHVsZXMgZnJvbSBjb25zdGFudHNcbiAgRVZFTlRTOiByZXF1aXJlKCcuL3NyYy9jb25zdGFudHMvZXZlbnRzJykuZGVmYXVsdCxcbiAgV09SS0VSX0NPTU1BTkRTOiByZXF1aXJlKCcuL3NyYy9jb25zdGFudHMvd29ya2VyLWNvbW1hbmRzJykuZGVmYXVsdCxcblxuICAvLyBNb2R1bGVzIGZyb20gZW52XG4gIHNuaWZmZXI6IHJlcXVpcmUoJy4vc3JjL2Vudi9zbmlmZmVyJykuZGVmYXVsdCxcbiAgaXNMZTogcmVxdWlyZSgnLi9zcmMvZW52L2lzbGUnKS5kZWZhdWx0LFxuICBVVEY4OiByZXF1aXJlKCcuL3NyYy9lbnYvdXRmOCcpLmRlZmF1bHQsXG5cbiAgLy8gTW9kZWxzXG4gIE1lZGlhSW5mbzogcmVxdWlyZSgnLi9zcmMvbW9kZWxzL21lZGlhLWluZm8nKS5kZWZhdWx0LFxuICBNZWRpYVNhbXBsZTogcmVxdWlyZSgnLi9zcmMvbW9kZWxzL21lZGlhLXNhbXBsZScpLmRlZmF1bHQsXG4gIE1lZGlhU2VnbWVudDogcmVxdWlyZSgnLi9zcmMvbW9kZWxzL21lZGlhLXNlZ21lbnQnKS5kZWZhdWx0LFxuICBNZWRpYVNlZ21lbnRMaXN0OiByZXF1aXJlKCcuL3NyYy9tb2RlbHMvbWVkaWEtc2VnbWVudC1saXN0JykuZGVmYXVsdCxcbiAgQXVkaW9UcmFja01ldGE6IHJlcXVpcmUoJy4vc3JjL21vZGVscy90cmFjay1tZXRhJykuQXVkaW9UcmFja01ldGEsXG4gIFZpZGVvVHJhY2tNZXRhOiByZXF1aXJlKCcuL3NyYy9tb2RlbHMvdHJhY2stbWV0YScpLlZpZGVvVHJhY2tNZXRhLFxuICBBdWRpb1RyYWNrU2FtcGxlOiByZXF1aXJlKCcuL3NyYy9tb2RlbHMvdHJhY2stc2FtcGxlJykuQXVkaW9UcmFja1NhbXBsZSxcbiAgVmlkZW9UcmFja1NhbXBsZTogcmVxdWlyZSgnLi9zcmMvbW9kZWxzL3RyYWNrLXNhbXBsZScpLlZpZGVvVHJhY2tTYW1wbGUsXG5cbiAgLy8gTW9kdWxlcyBmcm9tIG1zZVxuICBNc2U6IHJlcXVpcmUoJy4vc3JjL21zZS9pbmRleCcpLmRlZmF1bHQsXG5cbiAgLy8gTW9kdWxlcyBmcm9tIHdyaXRlXG4gIFN0cmVhbTogcmVxdWlyZSgnLi9zcmMvd3JpdGUvc3RyZWFtJykuZGVmYXVsdCxcbiAgQnVmZmVyOiByZXF1aXJlKCcuL3NyYy93cml0ZS9idWZmZXInKS5kZWZhdWx0LFxuXG4gIE1vYmlsZVZpZGVvOiByZXF1aXJlKCcuL3NyYy9tb2JpbGUvbW9iaWxlLXZpZGVvJyksXG4gIC8vIENyeXB0b1xuICBDcnlwdG86IHJlcXVpcmUoJy4vc3JjL2NyeXB0bycpLmRlZmF1bHRcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKFJlc3VsdENvbnN0cnVjdG9yKSB7XG4gIHZhciB0b3RhbExlbmd0aCA9IDA7XG5cbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFycmF5cyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBhcnJheXNbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gYXJyYXlzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgdmFyIGFyciA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICB0b3RhbExlbmd0aCArPSBhcnIubGVuZ3RoO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybikge1xuICAgICAgICBfaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgcmVzdWx0ID0gbmV3IFJlc3VsdENvbnN0cnVjdG9yKHRvdGFsTGVuZ3RoKTtcbiAgdmFyIG9mZnNldCA9IDA7XG4gIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gIHZhciBfZGlkSXRlcmF0b3JFcnJvcjIgPSBmYWxzZTtcbiAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSBhcnJheXNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgIHZhciBfYXJyID0gX3N0ZXAyLnZhbHVlO1xuXG4gICAgICByZXN1bHQuc2V0KF9hcnIsIG9mZnNldCk7XG4gICAgICBvZmZzZXQgKz0gX2Fyci5sZW5ndGg7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyLnJldHVybikge1xuICAgICAgICBfaXRlcmF0b3IyLnJldHVybigpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfY29uY2F0ID0gcmVxdWlyZSgnLi9jb25jYXQnKTtcblxudmFyIF9jb25jYXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uY2F0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxubW9kdWxlLmV4cG9ydHMgPSBfY29uY2F0Mi5kZWZhdWx0OyIsImZ1bmN0aW9uIHdlYnBhY2tCb290c3RyYXBGdW5jIChtb2R1bGVzKSB7XG4vKioqKioqLyAgLy8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gIHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbi8qKioqKiovICAvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gIGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuLyoqKioqKi8gICAgLy8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyAgICBpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbi8qKioqKiovICAgICAgcmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbi8qKioqKiovICAgIC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyAgICB2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyAgICAgIGk6IG1vZHVsZUlkLFxuLyoqKioqKi8gICAgICBsOiBmYWxzZSxcbi8qKioqKiovICAgICAgZXhwb3J0czoge31cbi8qKioqKiovICAgIH07XG5cbi8qKioqKiovICAgIC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gICAgbW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbi8qKioqKiovICAgIC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbi8qKioqKiovICAgIG1vZHVsZS5sID0gdHJ1ZTtcblxuLyoqKioqKi8gICAgLy8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovICB9XG5cbi8qKioqKiovICAvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbi8qKioqKiovICAvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbi8qKioqKiovICAvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4vKioqKioqLyAgX193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4vKioqKioqLyAgLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyAgX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4vKioqKioqLyAgICBpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4vKioqKioqLyAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4vKioqKioqLyAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbi8qKioqKiovICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuLyoqKioqKi8gICAgICAgIGdldDogZ2V0dGVyXG4vKioqKioqLyAgICAgIH0pO1xuLyoqKioqKi8gICAgfVxuLyoqKioqKi8gIH07XG5cbi8qKioqKiovICAvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4vKioqKioqLyAgX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuLyoqKioqKi8gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKioqKiovICB9O1xuXG4vKioqKioqLyAgLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbi8qKioqKiovICBfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbi8qKioqKiovICAgIHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuLyoqKioqKi8gICAgICBmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuLyoqKioqKi8gICAgICBmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuLyoqKioqKi8gICAgX193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuLyoqKioqKi8gICAgcmV0dXJuIGdldHRlcjtcbi8qKioqKiovICB9O1xuXG4vKioqKioqLyAgLy8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4vKioqKioqLyAgX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4vKioqKioqLyAgLy8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovICBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuLyoqKioqKi8gIC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4vKioqKioqLyAgX193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuICB2YXIgZiA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gRU5UUllfTU9EVUxFKVxuICByZXR1cm4gZi5kZWZhdWx0IHx8IGYgLy8gdHJ5IHRvIGNhbGwgZGVmYXVsdCBpZiBkZWZpbmVkIHRvIGFsc28gc3VwcG9ydCBiYWJlbCBlc21vZHVsZSBleHBvcnRzXG59XG5cbnZhciBtb2R1bGVOYW1lUmVxRXhwID0gJ1tcXFxcLnxcXFxcLXxcXFxcK3xcXFxcd3xcXC98QF0rJ1xudmFyIGRlcGVuZGVuY3lSZWdFeHAgPSAnXFxcXChcXFxccyooXFwvXFxcXCouKj9cXFxcKlxcLyk/XFxcXHMqLio/KCcgKyBtb2R1bGVOYW1lUmVxRXhwICsgJykuKj9cXFxcKScgLy8gYWRkaXRpb25hbCBjaGFycyB3aGVuIG91dHB1dC5wYXRoaW5mbyBpcyB0cnVlXG5cbi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI1OTM2NjEvMTMwNDQyXG5mdW5jdGlvbiBxdW90ZVJlZ0V4cCAoc3RyKSB7XG4gIHJldHVybiAoc3RyICsgJycpLnJlcGxhY2UoL1suPyorXiRbXFxdXFxcXCgpe318LV0vZywgJ1xcXFwkJicpXG59XG5cbmZ1bmN0aW9uIGlzTnVtZXJpYyhuKSB7XG4gIHJldHVybiAhaXNOYU4oMSAqIG4pOyAvLyAxICogbiBjb252ZXJ0cyBpbnRlZ2VycywgaW50ZWdlcnMgYXMgc3RyaW5nIChcIjEyM1wiKSwgMWUzIGFuZCBcIjFlM1wiIHRvIGludGVnZXJzIGFuZCBzdHJpbmdzIHRvIE5hTlxufVxuXG5mdW5jdGlvbiBnZXRNb2R1bGVEZXBlbmRlbmNpZXMgKHNvdXJjZXMsIG1vZHVsZSwgcXVldWVOYW1lKSB7XG4gIHZhciByZXR2YWwgPSB7fVxuICByZXR2YWxbcXVldWVOYW1lXSA9IFtdXG5cbiAgdmFyIGZuU3RyaW5nID0gbW9kdWxlLnRvU3RyaW5nKClcbiAgdmFyIHdyYXBwZXJTaWduYXR1cmUgPSBmblN0cmluZy5tYXRjaCgvXmZ1bmN0aW9uXFxzP1xcdypcXChcXHcrLFxccypcXHcrLFxccyooXFx3KylcXCkvKVxuICBpZiAoIXdyYXBwZXJTaWduYXR1cmUpIHJldHVybiByZXR2YWxcbiAgdmFyIHdlYnBhY2tSZXF1aXJlTmFtZSA9IHdyYXBwZXJTaWduYXR1cmVbMV1cblxuICAvLyBtYWluIGJ1bmRsZSBkZXBzXG4gIHZhciByZSA9IG5ldyBSZWdFeHAoJyhcXFxcXFxcXG58XFxcXFcpJyArIHF1b3RlUmVnRXhwKHdlYnBhY2tSZXF1aXJlTmFtZSkgKyBkZXBlbmRlbmN5UmVnRXhwLCAnZycpXG4gIHZhciBtYXRjaFxuICB3aGlsZSAoKG1hdGNoID0gcmUuZXhlYyhmblN0cmluZykpKSB7XG4gICAgaWYgKG1hdGNoWzNdID09PSAnZGxsLXJlZmVyZW5jZScpIGNvbnRpbnVlXG4gICAgcmV0dmFsW3F1ZXVlTmFtZV0ucHVzaChtYXRjaFszXSlcbiAgfVxuXG4gIC8vIGRsbCBkZXBzXG4gIHJlID0gbmV3IFJlZ0V4cCgnXFxcXCgnICsgcXVvdGVSZWdFeHAod2VicGFja1JlcXVpcmVOYW1lKSArICdcXFxcKFwiKGRsbC1yZWZlcmVuY2VcXFxccygnICsgbW9kdWxlTmFtZVJlcUV4cCArICcpKVwiXFxcXClcXFxcKScgKyBkZXBlbmRlbmN5UmVnRXhwLCAnZycpXG4gIHdoaWxlICgobWF0Y2ggPSByZS5leGVjKGZuU3RyaW5nKSkpIHtcbiAgICBpZiAoIXNvdXJjZXNbbWF0Y2hbMl1dKSB7XG4gICAgICByZXR2YWxbcXVldWVOYW1lXS5wdXNoKG1hdGNoWzFdKVxuICAgICAgc291cmNlc1ttYXRjaFsyXV0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKG1hdGNoWzFdKS5tXG4gICAgfVxuICAgIHJldHZhbFttYXRjaFsyXV0gPSByZXR2YWxbbWF0Y2hbMl1dIHx8IFtdXG4gICAgcmV0dmFsW21hdGNoWzJdXS5wdXNoKG1hdGNoWzRdKVxuICB9XG5cbiAgLy8gY29udmVydCAxZTMgYmFjayB0byAxMDAwIC0gdGhpcyBjYW4gYmUgaW1wb3J0YW50IGFmdGVyIHVnbGlmeS1qcyBjb252ZXJ0ZWQgMTAwMCB0byAxZTNcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhyZXR2YWwpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJldHZhbFtrZXlzW2ldXS5sZW5ndGg7IGorKykge1xuICAgICAgaWYgKGlzTnVtZXJpYyhyZXR2YWxba2V5c1tpXV1bal0pKSB7XG4gICAgICAgIHJldHZhbFtrZXlzW2ldXVtqXSA9IDEgKiByZXR2YWxba2V5c1tpXV1bal07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJldHZhbFxufVxuXG5mdW5jdGlvbiBoYXNWYWx1ZXNJblF1ZXVlcyAocXVldWVzKSB7XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMocXVldWVzKVxuICByZXR1cm4ga2V5cy5yZWR1Y2UoZnVuY3Rpb24gKGhhc1ZhbHVlcywga2V5KSB7XG4gICAgcmV0dXJuIGhhc1ZhbHVlcyB8fCBxdWV1ZXNba2V5XS5sZW5ndGggPiAwXG4gIH0sIGZhbHNlKVxufVxuXG5mdW5jdGlvbiBnZXRSZXF1aXJlZE1vZHVsZXMgKHNvdXJjZXMsIG1vZHVsZUlkKSB7XG4gIHZhciBtb2R1bGVzUXVldWUgPSB7XG4gICAgbWFpbjogW21vZHVsZUlkXVxuICB9XG4gIHZhciByZXF1aXJlZE1vZHVsZXMgPSB7XG4gICAgbWFpbjogW11cbiAgfVxuICB2YXIgc2Vlbk1vZHVsZXMgPSB7XG4gICAgbWFpbjoge31cbiAgfVxuXG4gIHdoaWxlIChoYXNWYWx1ZXNJblF1ZXVlcyhtb2R1bGVzUXVldWUpKSB7XG4gICAgdmFyIHF1ZXVlcyA9IE9iamVjdC5rZXlzKG1vZHVsZXNRdWV1ZSlcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHF1ZXVlTmFtZSA9IHF1ZXVlc1tpXVxuICAgICAgdmFyIHF1ZXVlID0gbW9kdWxlc1F1ZXVlW3F1ZXVlTmFtZV1cbiAgICAgIHZhciBtb2R1bGVUb0NoZWNrID0gcXVldWUucG9wKClcbiAgICAgIHNlZW5Nb2R1bGVzW3F1ZXVlTmFtZV0gPSBzZWVuTW9kdWxlc1txdWV1ZU5hbWVdIHx8IHt9XG4gICAgICBpZiAoc2Vlbk1vZHVsZXNbcXVldWVOYW1lXVttb2R1bGVUb0NoZWNrXSB8fCAhc291cmNlc1txdWV1ZU5hbWVdW21vZHVsZVRvQ2hlY2tdKSBjb250aW51ZVxuICAgICAgc2Vlbk1vZHVsZXNbcXVldWVOYW1lXVttb2R1bGVUb0NoZWNrXSA9IHRydWVcbiAgICAgIHJlcXVpcmVkTW9kdWxlc1txdWV1ZU5hbWVdID0gcmVxdWlyZWRNb2R1bGVzW3F1ZXVlTmFtZV0gfHwgW11cbiAgICAgIHJlcXVpcmVkTW9kdWxlc1txdWV1ZU5hbWVdLnB1c2gobW9kdWxlVG9DaGVjaylcbiAgICAgIHZhciBuZXdNb2R1bGVzID0gZ2V0TW9kdWxlRGVwZW5kZW5jaWVzKHNvdXJjZXMsIHNvdXJjZXNbcXVldWVOYW1lXVttb2R1bGVUb0NoZWNrXSwgcXVldWVOYW1lKVxuICAgICAgdmFyIG5ld01vZHVsZXNLZXlzID0gT2JqZWN0LmtleXMobmV3TW9kdWxlcylcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbmV3TW9kdWxlc0tleXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgbW9kdWxlc1F1ZXVlW25ld01vZHVsZXNLZXlzW2pdXSA9IG1vZHVsZXNRdWV1ZVtuZXdNb2R1bGVzS2V5c1tqXV0gfHwgW11cbiAgICAgICAgbW9kdWxlc1F1ZXVlW25ld01vZHVsZXNLZXlzW2pdXSA9IG1vZHVsZXNRdWV1ZVtuZXdNb2R1bGVzS2V5c1tqXV0uY29uY2F0KG5ld01vZHVsZXNbbmV3TW9kdWxlc0tleXNbal1dKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXF1aXJlZE1vZHVsZXNcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobW9kdWxlSWQsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgdmFyIHNvdXJjZXMgPSB7XG4gICAgbWFpbjogX193ZWJwYWNrX21vZHVsZXNfX1xuICB9XG5cbiAgdmFyIHJlcXVpcmVkTW9kdWxlcyA9IG9wdGlvbnMuYWxsID8geyBtYWluOiBPYmplY3Qua2V5cyhzb3VyY2VzLm1haW4pIH0gOiBnZXRSZXF1aXJlZE1vZHVsZXMoc291cmNlcywgbW9kdWxlSWQpXG5cbiAgdmFyIHNyYyA9ICcnXG5cbiAgT2JqZWN0LmtleXMocmVxdWlyZWRNb2R1bGVzKS5maWx0ZXIoZnVuY3Rpb24gKG0pIHsgcmV0dXJuIG0gIT09ICdtYWluJyB9KS5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGUpIHtcbiAgICB2YXIgZW50cnlNb2R1bGUgPSAwXG4gICAgd2hpbGUgKHJlcXVpcmVkTW9kdWxlc1ttb2R1bGVdW2VudHJ5TW9kdWxlXSkge1xuICAgICAgZW50cnlNb2R1bGUrK1xuICAgIH1cbiAgICByZXF1aXJlZE1vZHVsZXNbbW9kdWxlXS5wdXNoKGVudHJ5TW9kdWxlKVxuICAgIHNvdXJjZXNbbW9kdWxlXVtlbnRyeU1vZHVsZV0gPSAnKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykgeyBtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX187IH0pJ1xuICAgIHNyYyA9IHNyYyArICd2YXIgJyArIG1vZHVsZSArICcgPSAoJyArIHdlYnBhY2tCb290c3RyYXBGdW5jLnRvU3RyaW5nKCkucmVwbGFjZSgnRU5UUllfTU9EVUxFJywgSlNPTi5zdHJpbmdpZnkoZW50cnlNb2R1bGUpKSArICcpKHsnICsgcmVxdWlyZWRNb2R1bGVzW21vZHVsZV0ubWFwKGZ1bmN0aW9uIChpZCkgeyByZXR1cm4gJycgKyBKU09OLnN0cmluZ2lmeShpZCkgKyAnOiAnICsgc291cmNlc1ttb2R1bGVdW2lkXS50b1N0cmluZygpIH0pLmpvaW4oJywnKSArICd9KTtcXG4nXG4gIH0pXG5cbiAgc3JjID0gc3JjICsgJ25ldyAoKCcgKyB3ZWJwYWNrQm9vdHN0cmFwRnVuYy50b1N0cmluZygpLnJlcGxhY2UoJ0VOVFJZX01PRFVMRScsIEpTT04uc3RyaW5naWZ5KG1vZHVsZUlkKSkgKyAnKSh7JyArIHJlcXVpcmVkTW9kdWxlcy5tYWluLm1hcChmdW5jdGlvbiAoaWQpIHsgcmV0dXJuICcnICsgSlNPTi5zdHJpbmdpZnkoaWQpICsgJzogJyArIHNvdXJjZXMubWFpbltpZF0udG9TdHJpbmcoKSB9KS5qb2luKCcsJykgKyAnfSkpKHNlbGYpOydcblxuICB2YXIgYmxvYiA9IG5ldyB3aW5kb3cuQmxvYihbc3JjXSwgeyB0eXBlOiAndGV4dC9qYXZhc2NyaXB0JyB9KVxuICBpZiAob3B0aW9ucy5iYXJlKSB7IHJldHVybiBibG9iIH1cblxuICB2YXIgVVJMID0gd2luZG93LlVSTCB8fCB3aW5kb3cud2Via2l0VVJMIHx8IHdpbmRvdy5tb3pVUkwgfHwgd2luZG93Lm1zVVJMXG5cbiAgdmFyIHdvcmtlclVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYilcbiAgdmFyIHdvcmtlciA9IG5ldyB3aW5kb3cuV29ya2VyKHdvcmtlclVybClcbiAgd29ya2VyLm9iamVjdFVSTCA9IHdvcmtlclVybFxuXG4gIHJldHVybiB3b3JrZXJcbn1cbiIsImNvbnN0IExPQURFUl9FVkVOVFMgPSB7XG4gIExBREVSX1NUQVJUOiAnTE9BREVSX1NUQVJUJyxcbiAgTE9BREVSX0RBVEFMT0FERUQ6ICdMT0FERVJfREFUQUxPQURFRCcsXG4gIExPQURFUl9DT01QTEVURTogJ0xPQURFUl9DT01QTEVURScsXG4gIExPQURFUl9FUlJPUjogJ0xPQURFUl9FUlJPUidcbn1cblxuY29uc3QgREVNVVhfRVZFTlRTID0ge1xuICBERU1VWF9TVEFSVDogJ0RFTVVYX1NUQVJUJyxcbiAgREVNVVhfQ09NUExFVEU6ICdERU1VWF9DT01QTEVURScsXG4gIERFTVVYX0VSUk9SOiAnREVNVVhfRVJST1InLFxuICBNRVRBREFUQV9QQVJTRUQ6ICdNRVRBREFUQV9QQVJTRUQnLFxuICBWSURFT19NRVRBREFUQV9DSEFOR0U6ICdWSURFT19NRVRBREFUQV9DSEFOR0UnLFxuICBBVURJT19NRVRBREFUQV9DSEFOR0U6ICdBVURJT19NRVRBREFUQV9DSEFOR0UnLFxuICBNRURJQV9JTkZPOiAnTUVESUFfSU5GTydcbn1cblxuY29uc3QgUkVNVVhfRVZFTlRTID0ge1xuICBSRU1VWF9NRVRBREFUQTogJ1JFTVVYX01FVEFEQVRBJyxcbiAgUkVNVVhfTUVESUE6ICdSRU1VWF9NRURJQScsXG4gIE1FRElBX1NFR01FTlQ6ICdNRURJQV9TRUdNRU5UJyxcbiAgUkVNVVhfRVJST1I6ICdSRU1VWF9FUlJPUicsXG4gIElOSVRfU0VHTUVOVDogJ0lOSVRfU0VHTUVOVCcsXG4gIERFVEVDVF9DSEFOR0VfU1RSRUFNOiAnREVURUNUX0NIQU5HRV9TVFJFQU0nXG59XG5cbmNvbnN0IE1TRV9FVkVOVFMgPSB7XG4gIFNPVVJDRV9VUERBVEVfRU5EOiAnU09VUkNFX1VQREFURV9FTkQnXG59XG5cbi8vIGhsc+S4k+aciWV2ZW50c1xuY29uc3QgSExTX0VWRU5UUyA9IHtcbiAgUkVUUllfVElNRV9FWENFRURFRDogJ1JFVFJZX1RJTUVfRVhDRUVERUQnXG59XG5cbmNvbnN0IENSWVRPX0VWRU5UUyA9IHtcbiAgU1RBUlRfREVDUllQVDogJ1NUQVJUX0RFQ1JZUFQnLFxuICBERUNSWVBURUQ6ICdERUNSWVBURUQnXG59XG5jb25zdCBBTExFVkVOVFMgPSBPYmplY3QuYXNzaWduKHt9LCBMT0FERVJfRVZFTlRTLCBERU1VWF9FVkVOVFMsIFJFTVVYX0VWRU5UUywgTVNFX0VWRU5UUywgSExTX0VWRU5UUylcblxuY29uc3QgRmx2QWxsb3dlZEV2ZW50cyA9IFtdXG5jb25zdCBIbHNBbGxvd2VkRXZlbnRzID0gW11cblxuZm9yIChsZXQga2V5IGluIEFMTEVWRU5UUykge1xuICBpZiAoQUxMRVZFTlRTLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICBGbHZBbGxvd2VkRXZlbnRzLnB1c2goQUxMRVZFTlRTW2tleV0pXG4gIH1cbn1cblxuZm9yIChsZXQga2V5IGluIEFMTEVWRU5UUykge1xuICBpZiAoQUxMRVZFTlRTLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICBIbHNBbGxvd2VkRXZlbnRzLnB1c2goQUxMRVZFTlRTW2tleV0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBBTExFVkVOVFMsXG4gIEhMU19FVkVOVFMsXG4gIFJFTVVYX0VWRU5UUyxcbiAgREVNVVhfRVZFTlRTLFxuICBNU0VfRVZFTlRTLFxuICBMT0FERVJfRVZFTlRTLFxuICBGbHZBbGxvd2VkRXZlbnRzLFxuICBIbHNBbGxvd2VkRXZlbnRzLFxuICBDUllUT19FVkVOVFNcbn07XG4iLCJleHBvcnQgY29uc3QgQ09OVEVYVF9DT01PTUFORFMgPSB7XG4gIE9OOiAnb24nLFxuICBPTkNFOiAnb25jZScsXG4gIE9GRjogJ29mZicsXG4gIEVNSVQ6ICdlbWl0JyxcbiAgREVTVFJPWTogJ2Rlc3Ryb3knXG59XG4iLCJpbXBvcnQgTWVkaWFJbmZvIGZyb20gJy4vbW9kZWxzL21lZGlhLWluZm8nXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnXG5cbmNvbnN0IERJUkVDVF9FTUlUX0ZMQUcgPSAnX19UT19fJ1xuXG5jbGFzcyBDb250ZXh0IHtcbiAgY29uc3RydWN0b3IgKGFsbG93ZWRFdmVudHMgPSBbXSkge1xuICAgIHRoaXMuX2VtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKClcbiAgICB0aGlzLl9pbnN0YW5jZU1hcCA9IHt9IC8vIOaJgOacieeahOino+eggea1geeoi+WunuS+i1xuICAgIHRoaXMuX2Nsc01hcCA9IHt9IC8vIOaehOmAoOWHveaVsOeahG1hcFxuICAgIHRoaXMuX2luaXRlZCA9IGZhbHNlXG4gICAgdGhpcy5tZWRpYUluZm8gPSBuZXcgTWVkaWFJbmZvKClcbiAgICB0aGlzLmFsbG93ZWRFdmVudHMgPSBhbGxvd2VkRXZlbnRzXG4gICAgdGhpcy5faG9va3MgPSB7fSAvLyDms6jlhozlnKjkuovku7bliY0v5ZCO55qE6ZKp5a2Q77yM5L6L5aaCIGJlZm9yZSgnREVNVVhfQ09NUExFVEUnKVxuICB9XG5cbiAgLyoqXG4gICAqIOS7juS4iuS4i+aWh+S4reiOt+WPluino+eggea1geeoi+WunuS+i++8jOWmguaenOayoeacieWunuS+i++8jOaehOmAoOS4gOS4qlxuICAgKiBAcGFyYW0gdGFnXG4gICAqIEBwYXJhbSBhcmdzXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0SW5zdGFuY2UgKHRhZykge1xuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5faW5zdGFuY2VNYXBbdGFnXVxuICAgIGlmIChpbnN0YW5jZSkge1xuICAgICAgcmV0dXJuIGluc3RhbmNlXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRocm93IG5ldyBFcnJvcihgJHt0YWd95a6e5L6L5bCa5pyq5Yid5aeL5YyWYClcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOWIneWni+WMluWFt+S9k+WunuS+i1xuICAgKiBAcGFyYW0gdGFnXG4gICAqIEBwYXJhbSBhcmdzXG4gICAqL1xuICBpbml0SW5zdGFuY2UgKHRhZywgLi4uYXJncykge1xuICAgIGlmICh0aGlzLl9jbHNNYXBbdGFnXSkge1xuICAgICAgY29uc3QgbmV3SW5zdGFuY2UgPSBuZXcgdGhpcy5fY2xzTWFwW3RhZ10oLi4uYXJncylcbiAgICAgIHRoaXMuX2luc3RhbmNlTWFwW3RhZ10gPSBuZXdJbnN0YW5jZVxuICAgICAgaWYgKG5ld0luc3RhbmNlLmluaXQpIHtcbiAgICAgICAgbmV3SW5zdGFuY2UuaW5pdCgpIC8vIFRPRE86IGxpZmVjaXJjbGVcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXdJbnN0YW5jZVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dGFnfeacquWcqGNvbnRleHTkuK3ms6jlhoxgKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDpgb/lhY3lpKfph4/nmoRpbml0SW5zdGFuY2XosIPnlKjvvIzliJ3lp4vljJbmiYDmnInnmoTnu4Tku7ZcbiAgICogQHBhcmFtIGNvbmZpZ1xuICAgKi9cbiAgaW5pdCAoY29uZmlnKSB7XG4gICAgaWYgKHRoaXMuX2luaXRlZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGZvciAobGV0IHRhZyBpbiB0aGlzLl9jbHNNYXApIHtcbiAgICAgIC8vIGlmIG5vdCBpbml0ZWQsIGluaXQgYW4gaW5zdGFuY2VcbiAgICAgIGlmICh0aGlzLl9jbHNNYXAuaGFzT3duUHJvcGVydHkodGFnKSAmJiAhdGhpcy5faW5zdGFuY2VNYXBbdGFnXSkge1xuICAgICAgICB0aGlzLmluaXRJbnN0YW5jZSh0YWcsIGNvbmZpZylcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5faW5pdGVkID0gdHJ1ZVxuICB9XG5cbiAgLyoqXG4gICAqIOazqOWGjOS4gOS4quS4iuS4i+aWh+a1geeoi++8jOaPkOS+m+WuieWFqOeahOS6i+S7tuWPkemAgeacuuWItlxuICAgKiBAcGFyYW0gdGFnXG4gICAqIEBwYXJhbSBjbHNcbiAgICovXG4gIHJlZ2lzdHJ5ICh0YWcsIGNscykge1xuICAgIGNvbnN0IGVtaXR0ZXIgPSB0aGlzLl9lbWl0dGVyXG4gICAgY29uc3QgY2hlY2tNZXNzYWdlTmFtZSA9IHRoaXMuX2lzTWVzc2FnZU5hbWVWYWxpZC5iaW5kKHRoaXMpXG4gICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICBjb25zdCBlbmhhbmNlZCA9IGNsYXNzIGV4dGVuZHMgY2xzIHtcbiAgICAgIGNvbnN0cnVjdG9yICguLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0ge31cbiAgICAgICAgdGhpcy5vbmNlTGlzdGVuZXJzID0ge31cbiAgICAgICAgdGhpcy5UQUcgPSB0YWdcbiAgICAgICAgdGhpcy5fY29udGV4dCA9IHNlbGZcbiAgICAgIH1cblxuICAgICAgb24gKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaykge1xuICAgICAgICBjaGVja01lc3NhZ2VOYW1lKG1lc3NhZ2VOYW1lKVxuXG4gICAgICAgIGlmICh0aGlzLmxpc3RlbmVyc1ttZXNzYWdlTmFtZV0pIHtcbiAgICAgICAgICB0aGlzLmxpc3RlbmVyc1ttZXNzYWdlTmFtZV0ucHVzaChjYWxsYmFjaylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxpc3RlbmVyc1ttZXNzYWdlTmFtZV0gPSBbY2FsbGJhY2tdXG4gICAgICAgIH1cblxuICAgICAgICBlbWl0dGVyLm9uKGAke21lc3NhZ2VOYW1lfSR7RElSRUNUX0VNSVRfRkxBR30ke3RhZ31gLCBjYWxsYmFjaykgLy8g5bu656uL5a6a5ZCR6YCa5L+h55uR5ZCsXG4gICAgICAgIHJldHVybiBlbWl0dGVyLm9uKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaylcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiDlnKjmn5DkuKrkuovku7bop6blj5HliY3miafooYxcbiAgICAgICAqIEBwYXJhbSBtZXNzYWdlTmFtZVxuICAgICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICAgKi9cbiAgICAgIGJlZm9yZSAobWVzc2FnZU5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNoZWNrTWVzc2FnZU5hbWUobWVzc2FnZU5hbWUpXG4gICAgICAgIGlmIChzZWxmLl9ob29rc1ttZXNzYWdlTmFtZV0pIHtcbiAgICAgICAgICBzZWxmLl9ob29rc1ttZXNzYWdlTmFtZV0ucHVzaChjYWxsYmFjaylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWxmLl9ob29rc1ttZXNzYWdlTmFtZV0gPSBbY2FsbGJhY2tdXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgb25jZSAobWVzc2FnZU5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNoZWNrTWVzc2FnZU5hbWUobWVzc2FnZU5hbWUpXG5cbiAgICAgICAgaWYgKHRoaXMub25jZUxpc3RlbmVyc1ttZXNzYWdlTmFtZV0pIHtcbiAgICAgICAgICB0aGlzLm9uY2VMaXN0ZW5lcnNbbWVzc2FnZU5hbWVdLnB1c2goY2FsbGJhY2spXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5vbmNlTGlzdGVuZXJzW21lc3NhZ2VOYW1lXSA9IFtjYWxsYmFja11cbiAgICAgICAgfVxuXG4gICAgICAgIGVtaXR0ZXIub25jZShgJHttZXNzYWdlTmFtZX0ke0RJUkVDVF9FTUlUX0ZMQUd9JHt0YWd9YCwgY2FsbGJhY2spXG4gICAgICAgIHJldHVybiBlbWl0dGVyLm9uY2UobWVzc2FnZU5hbWUsIGNhbGxiYWNrKVxuICAgICAgfVxuXG4gICAgICBlbWl0IChtZXNzYWdlTmFtZSwgLi4uYXJncykge1xuICAgICAgICBjaGVja01lc3NhZ2VOYW1lKG1lc3NhZ2VOYW1lKVxuXG4gICAgICAgIGNvbnN0IGJlZm9yZUxpc3QgPSBzZWxmLl9ob29rcyA/IHNlbGYuX2hvb2tzW21lc3NhZ2VOYW1lXSA6IG51bGxcblxuICAgICAgICBpZiAoYmVmb3JlTGlzdCkge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBiZWZvcmVMaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IGJlZm9yZUxpc3RbaV1cbiAgICAgICAgICAgIGNhbGxiYWNrKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVtaXR0ZXIuZW1pdChtZXNzYWdlTmFtZSwgLi4uYXJncylcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiDlrprlkJHlj5HpgIHnu5nmn5DkuKrnu4Tku7bljZXkvovnmoTmtojmga9cbiAgICAgICAqIEBwYXJhbSBtZXNzYWdlTmFtZVxuICAgICAgICogQHBhcmFtIGFyZ3NcbiAgICAgICAqL1xuICAgICAgZW1pdFRvICh0YWcsIG1lc3NhZ2VOYW1lLCAuLi5hcmdzKSB7XG4gICAgICAgIGNoZWNrTWVzc2FnZU5hbWUobWVzc2FnZU5hbWUpXG5cbiAgICAgICAgcmV0dXJuIGVtaXR0ZXIuZW1pdChgJHttZXNzYWdlTmFtZX0ke0RJUkVDVF9FTUlUX0ZMQUd9JHt0YWd9YCwgLi4uYXJncylcbiAgICAgIH1cblxuICAgICAgb2ZmIChtZXNzYWdlTmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgY2hlY2tNZXNzYWdlTmFtZShtZXNzYWdlTmFtZSlcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXIub2ZmKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaylcbiAgICAgIH1cblxuICAgICAgcmVtb3ZlTGlzdGVuZXJzICgpIHtcbiAgICAgICAgY29uc3QgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5iaW5kKHRoaXMubGlzdGVuZXJzKVxuXG4gICAgICAgIGZvciAobGV0IG1lc3NhZ2VOYW1lIGluIHRoaXMubGlzdGVuZXJzKSB7XG4gICAgICAgICAgaWYgKGhhc093bihtZXNzYWdlTmFtZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMubGlzdGVuZXJzW21lc3NhZ2VOYW1lXSB8fCBbXVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSBjYWxsYmFja3NbaV1cbiAgICAgICAgICAgICAgZW1pdHRlci5vZmYobWVzc2FnZU5hbWUsIGNhbGxiYWNrKVxuICAgICAgICAgICAgICBlbWl0dGVyLm9mZihgJHttZXNzYWdlTmFtZX0ke0RJUkVDVF9FTUlUX0ZMQUd9JHt0YWd9YCwgY2FsbGJhY2spXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgbWVzc2FnZU5hbWUgaW4gdGhpcy5vbmNlTGlzdGVuZXJzKSB7XG4gICAgICAgICAgaWYgKGhhc093bihtZXNzYWdlTmFtZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMub25jZUxpc3RlbmVyc1ttZXNzYWdlTmFtZV0gfHwgW11cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrID0gY2FsbGJhY2tzW2ldXG4gICAgICAgICAgICAgIGVtaXR0ZXIub2ZmKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaylcbiAgICAgICAgICAgICAgZW1pdHRlci5vZmYoYCR7bWVzc2FnZU5hbWV9JHtESVJFQ1RfRU1JVF9GTEFHfSR7dGFnfWAsIGNhbGxiYWNrKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIOWcqOe7hOS7tumUgOavgeaXtu+8jOm7mOiupOWwhuWug+azqOWGjOeahOS6i+S7tuWFqOmDqOWNuOi9ve+8jOehruS/neS4jeS8mumAoOaIkOWGheWtmOazhOa8j1xuICAgICAgICovXG4gICAgICBkZXN0cm95ICgpIHtcbiAgICAgICAgLy8gc3RlcDEgdW5saXN0ZW4gZXZlbnRzXG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXJzKClcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSB7fVxuXG4gICAgICAgIC8vIHN0ZXAyIHJlbGVhc2UgZnJvbSBjb250ZXh0XG4gICAgICAgIGRlbGV0ZSBzZWxmLl9pbnN0YW5jZU1hcFt0YWddXG4gICAgICAgIGlmIChzdXBlci5kZXN0cm95KSB7XG4gICAgICAgICAgcmV0dXJuIHN1cGVyLmRlc3Ryb3koKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2Nsc01hcFt0YWddID0gZW5oYW5jZWRcblxuICAgIC8qKlxuICAgICAqIGdldCBpbnN0YW5jZSBpbW1lZGlhdGVseVxuICAgICAqIGUuZyBjb25zdCBpbnN0YW5jZSA9IGNvbnRleHQucmVnaXN0cnkodGFnLCBDbHMpKGNvbmZpZylcbiAgICAgKiAqL1xuICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaW5pdEluc3RhbmNlKHRhZywgLi4uYXJncylcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog5a+55a2Y5Zyo55qE5a6e5L6L6L+b6KGMXG4gICAqL1xuICBkZXN0cm95SW5zdGFuY2VzICgpIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLl9pbnN0YW5jZU1hcCkuZm9yRWFjaCgodGFnKSA9PiB7XG4gICAgICBpZiAodGhpcy5faW5zdGFuY2VNYXBbdGFnXS5kZXN0cm95KSB7XG4gICAgICAgIHRoaXMuX2luc3RhbmNlTWFwW3RhZ10uZGVzdHJveSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiDnvJbop6PnoIHmtYHnqIvml6DpnIDlhbPms6jkuovku7bnmoTop6Pnu5FcbiAgICovXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuX2VtaXR0ZXIgPSBudWxsXG4gICAgdGhpcy5hbGxvd2VkRXZlbnRzID0gW11cbiAgICB0aGlzLl9jbHNNYXAgPSBudWxsXG4gICAgdGhpcy5fY29udGV4dCA9IG51bGxcbiAgICB0aGlzLl9ob29rcyA9IG51bGxcbiAgICB0aGlzLmRlc3Ryb3lJbnN0YW5jZXMoKVxuICB9XG5cbiAgLyoqXG4gICAqIOWvueS/oemBk+i/m+ihjOaUtuaLolxuICAgKiBAcGFyYW0gbWVzc2FnZU5hbWVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pc01lc3NhZ2VOYW1lVmFsaWQgKG1lc3NhZ2VOYW1lKSB7XG4gICAgaWYgKCF0aGlzLmFsbG93ZWRFdmVudHMuaW5kZXhPZihtZXNzYWdlTmFtZSkgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVucmVnaXN0ZXJlZCBtZXNzYWdlIG5hbWU6ICR7bWVzc2FnZU5hbWV9YClcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29udGV4dFxuIiwiaW1wb3J0IEVWRU5UUyBmcm9tICcuLi9jb25zdGFudHMvZXZlbnRzJztcbmNvbnN0IENSWVRPX0VWRU5UUyA9IEVWRU5UUy5DUllUT19FVkVOVFNcbmNsYXNzIENyeXB0byB7XG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHRoaXMuaW5wdXRCdWZmZXIgPSBjb25maWcuaW5wdXRidWZmZXI7XG4gICAgICAgIHRoaXMub3V0cHV0QnVmZmVyID0gY29uZmlnLm91dHB1dGJ1ZmZlcjtcbiAgICAgICAgdGhpcy5rZXkgPSBjb25maWcua2V5O1xuICAgICAgICB0aGlzLml2ID0gY29uZmlnLml2O1xuICAgICAgICB0aGlzLm1ldGhvZCA9IGNvbmZpZy5tZXRob2Q7XG5cbiAgICAgICAgdGhpcy5jcnlwdG8gPSAgd2luZG93LmNyeXB0byB8fCB3aW5kb3cubXNDcnlwdG9cbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLm9uKENSWVRPX0VWRU5UUy5TVEFSVF9ERUNSWVBULCB0aGlzLmRlY3JpcHQuYmluZCh0aGlzKSk7XG4gICAgfVxuICAgIFxuICAgIGRlY3JpcHQoKSB7XG4gICAgICAgIGlmKCF0aGlzLmFlc2tleSkge1xuICAgICAgICAgICAgbGV0IHNia2V5ID0gdGhpcy5jcnlwdG8uc3VidGxlLmltcG9ydEtleSgncmF3JywgdGhpcy5rZXkuYnVmZmVyLCB7IG5hbWU6ICdBRVMtQ0JDJyB9LCBmYWxzZSwgWydlbmNyeXB0JywgJ2RlY3J5cHQnXSk7XG4gICAgICAgICAgICBzYmtleS50aGVuKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZXNrZXkgPSBrZXk7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWNyaXB0RGF0YSgpO1xuICAgICAgICAgICAgfSkgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRlY3JpcHREYXRhKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWNyaXB0RGF0YSgpIHtcbiAgICAgICAgbGV0IGlucHV0YnVmZmVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSh0aGlzLmlucHV0QnVmZmVyKTtcbiAgICAgICAgbGV0IG91dHB1dGJ1ZmZlciA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UodGhpcy5vdXRwdXRCdWZmZXIpO1xuICAgICAgICBsZXQgZGF0YSA9IGlucHV0YnVmZmVyLnNoaWZ0KCk7XG4gICAgICAgIGlmKGRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuY3J5cHRvLnN1YnRsZS5kZWNyeXB0KHsgbmFtZTogJ0FFUy1DQkMnLCBpdjogdGhpcy5pdi5idWZmZXIgfSwgdGhpcy5hZXNrZXksIGRhdGEpLnRoZW4ocmVzPT57XG4gICAgICAgICAgICAgICAgb3V0cHV0YnVmZmVyLnB1c2gobmV3IFVpbnQ4QXJyYXkocmVzKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KENSWVRPX0VWRU5UUy5ERUNSWVBURUQpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGVjcmlwdERhdGEoZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IENyeXB0bzsiLCJjb25zdCBsZSA9IChmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcigyKTtcbiAgKG5ldyBEYXRhVmlldyhidWYpKS5zZXRJbnQxNigwLCAyNTYsIHRydWUpIC8vIGxpdHRsZS1lbmRpYW4gd3JpdGVcbiAgcmV0dXJuIChuZXcgSW50MTZBcnJheShidWYpKVswXSA9PT0gMjU2IC8vIHBsYXRmb3JtLXNwZWMgcmVhZCwgaWYgZXF1YWwgdGhlbiBMRVxufSkoKVxuXG5leHBvcnQgZGVmYXVsdCBsZVxuIiwiY29uc3QgbGUgPSAoZnVuY3Rpb24gKCkge1xuICBjb25zdCBidWYgPSBuZXcgQXJyYXlCdWZmZXIoMik7XG4gIChuZXcgRGF0YVZpZXcoYnVmKSkuc2V0SW50MTYoMCwgMjU2LCB0cnVlKSAvLyBsaXR0bGUtZW5kaWFuIHdyaXRlXG4gIHJldHVybiAobmV3IEludDE2QXJyYXkoYnVmKSlbMF0gPT09IDI1NiAvLyBwbGF0Zm9ybS1zcGVjIHJlYWQsIGlmIGVxdWFsIHRoZW4gTEVcbn0pKClcblxuY29uc3Qgc25pZmZlciA9IHtcbiAgZ2V0IGRldmljZSAoKSB7XG4gICAgbGV0IHIgPSBzbmlmZmVyLm9zO1xuICAgIHJldHVybiByLmlzUGMgPyAncGMnIDogci5pc1RhYmxldCA/ICd0YWJsZXQnIDogJ21vYmlsZSc7XG4gIH0sXG4gIGdldCBicm93c2VyICgpIHtcbiAgICBsZXQgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgbGV0IHJlZyA9IHtcbiAgICAgIGllOiAvcnY6KFtcXGQuXSspXFwpIGxpa2UgZ2Vja28vLFxuICAgICAgZmlyZm94OiAvZmlyZWZveFxcLyhbXFxkLl0rKS8sXG4gICAgICBjaHJvbWU6IC9jaHJvbWVcXC8oW1xcZC5dKykvLFxuICAgICAgb3BlcmE6IC9vcGVyYS4oW1xcZC5dKykvLFxuICAgICAgc2FmYXJpOiAvdmVyc2lvblxcLyhbXFxkLl0rKS4qc2FmYXJpL1xuICAgIH07XG4gICAgcmV0dXJuIFtdLmNvbmNhdChPYmplY3Qua2V5cyhyZWcpLmZpbHRlcihrZXkgPT4gcmVnW2tleV0udGVzdCh1YSkpKVswXTtcbiAgfSxcbiAgZ2V0IG9zICgpIHtcbiAgICBsZXQgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50XG4gICAgbGV0IGlzV2luZG93c1Bob25lID0gLyg/OldpbmRvd3MgUGhvbmUpLy50ZXN0KHVhKVxuICAgIGxldCBpc1N5bWJpYW4gPSAvKD86U3ltYmlhbk9TKS8udGVzdCh1YSkgfHwgaXNXaW5kb3dzUGhvbmU7XG4gICAgbGV0IGlzQW5kcm9pZCA9IC8oPzpBbmRyb2lkKS8udGVzdCh1YSk7XG4gICAgbGV0IGlzRmlyZUZveCA9IC8oPzpGaXJlZm94KS8udGVzdCh1YSk7XG4gICAgbGV0IGlzVGFibGV0ID0gLyg/OmlQYWR8UGxheUJvb2spLy50ZXN0KHVhKSB8fCAoaXNBbmRyb2lkICYmICEvKD86TW9iaWxlKS8udGVzdCh1YSkpIHx8IChpc0ZpcmVGb3ggJiYgLyg/OlRhYmxldCkvLnRlc3QodWEpKTtcbiAgICBsZXQgaXNQaG9uZSA9IC8oPzppUGhvbmUpLy50ZXN0KHVhKSAmJiAhaXNUYWJsZXQ7XG4gICAgbGV0IGlzUGMgPSAhaXNQaG9uZSAmJiAhaXNBbmRyb2lkICYmICFpc1N5bWJpYW47XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzVGFibGV0LFxuICAgICAgaXNQaG9uZSxcbiAgICAgIGlzQW5kcm9pZCxcbiAgICAgIGlzUGMsXG4gICAgICBpc1N5bWJpYW4sXG4gICAgICBpc1dpbmRvd3NQaG9uZSxcbiAgICAgIGlzRmlyZUZveFxuICAgIH07XG4gIH0sXG5cbiAgZ2V0IGlzTGUgKCkge1xuICAgIHJldHVybiBsZVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBzbmlmZmVyO1xuIiwiY2xhc3MgVVRGOCB7XG4gIHN0YXRpYyBkZWNvZGUgKHVpbnQ4YXJyYXkpIHtcbiAgICBjb25zdCBvdXQgPSBbXTtcbiAgICBjb25zdCBpbnB1dCA9IHVpbnQ4YXJyYXk7XG4gICAgbGV0IGkgPSAwO1xuICAgIGNvbnN0IGxlbmd0aCA9IHVpbnQ4YXJyYXkubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGkgPCBsZW5ndGgpIHtcbiAgICAgIGlmIChpbnB1dFtpXSA8IDB4ODApIHtcbiAgICAgICAgb3V0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShpbnB1dFtpXSkpO1xuICAgICAgICArK2k7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfSBlbHNlIGlmIChpbnB1dFtpXSA8IDB4QzApIHtcbiAgICAgICAgLy8gZmFsbHRocm91Z2hcbiAgICAgIH0gZWxzZSBpZiAoaW5wdXRbaV0gPCAweEUwKSB7XG4gICAgICAgIGlmIChVVEY4Ll9jaGVja0NvbnRpbnVhdGlvbihpbnB1dCwgaSwgMSkpIHtcbiAgICAgICAgICBjb25zdCB1Y3M0ID0gKGlucHV0W2ldICYgMHgxRikgPDwgNiB8IChpbnB1dFtpICsgMV0gJiAweDNGKTtcbiAgICAgICAgICBpZiAodWNzNCA+PSAweDgwKSB7XG4gICAgICAgICAgICBvdXQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKHVjczQgJiAweEZGRkYpKTtcbiAgICAgICAgICAgIGkgKz0gMjtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpbnB1dFtpXSA8IDB4RjApIHtcbiAgICAgICAgaWYgKFVURjguX2NoZWNrQ29udGludWF0aW9uKGlucHV0LCBpLCAyKSkge1xuICAgICAgICAgIGNvbnN0IHVjczQgPSAoaW5wdXRbaV0gJiAweEYpIDw8IDEyIHwgKGlucHV0W2kgKyAxXSAmIDB4M0YpIDw8IDYgfCBpbnB1dFtpICsgMl0gJiAweDNGO1xuICAgICAgICAgIGlmICh1Y3M0ID49IDB4ODAwICYmICh1Y3M0ICYgMHhGODAwKSAhPT0gMHhEODAwKSB7XG4gICAgICAgICAgICBvdXQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKHVjczQgJiAweEZGRkYpKTtcbiAgICAgICAgICAgIGkgKz0gMztcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpbnB1dFtpXSA8IDB4RjgpIHtcbiAgICAgICAgaWYgKFVURjguX2NoZWNrQ29udGludWF0aW9uKGlucHV0LCBpLCAzKSkge1xuICAgICAgICAgIGxldCB1Y3M0ID0gKGlucHV0W2ldICYgMHg3KSA8PCAxOCB8IChpbnB1dFtpICsgMV0gJiAweDNGKSA8PCAxMiB8XG4gICAgICAgICAgICAgICAgICAgIChpbnB1dFtpICsgMl0gJiAweDNGKSA8PCA2IHwgKGlucHV0W2kgKyAzXSAmIDB4M0YpO1xuICAgICAgICAgIGlmICh1Y3M0ID4gMHgxMDAwMCAmJiB1Y3M0IDwgMHgxMTAwMDApIHtcbiAgICAgICAgICAgIHVjczQgLT0gMHgxMDAwMDtcbiAgICAgICAgICAgIG91dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoKHVjczQgPj4+IDEwKSB8IDB4RDgwMCkpO1xuICAgICAgICAgICAgb3V0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgodWNzNCAmIDB4M0ZGKSB8IDB4REMwMCkpO1xuICAgICAgICAgICAgaSArPSA0O1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBvdXQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKDB4RkZGRCkpO1xuICAgICAgKytpO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQuam9pbignJyk7XG4gIH1cblxuICBzdGF0aWMgX2NoZWNrQ29udGludWF0aW9uICh1aW50OGFycmF5LCBzdGFydCwgY2hlY2tMZW5ndGgpIHtcbiAgICBsZXQgYXJyYXkgPSB1aW50OGFycmF5O1xuICAgIGlmIChzdGFydCArIGNoZWNrTGVuZ3RoIDwgYXJyYXkubGVuZ3RoKSB7XG4gICAgICB3aGlsZSAoY2hlY2tMZW5ndGgtLSkge1xuICAgICAgICBpZiAoKGFycmF5Wysrc3RhcnRdICYgMHhDMCkgIT09IDB4ODApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFVURjg7XG4iLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ2V2ZW50cydcbmNsYXNzIEF1ZGlvQ3R4IGV4dGVuZHMgRXZlbnRFbWl0dGVye1xuICBjb25zdHJ1Y3RvciAoY29uZmlnKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZyk7XG4gICAgbGV0IEF1ZGlvQ29udGV4dCA9ICB3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQ7XG4gICAgdGhpcy5jb250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuICAgIHRoaXMuZ2Fpbk5vZGUgPSB0aGlzLmNvbnRleHQuY3JlYXRlR2FpbigpO1xuICAgIHRoaXMuZ2Fpbk5vZGUuY29ubmVjdCh0aGlzLmNvbnRleHQuZGVzdGluYXRpb24pO1xuICAgIHRoaXMubWV0YSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnNhbXBsZXMgPSBbXTtcbiAgICB0aGlzLnByZWxvYWRUaW1lID0gdGhpcy5jb25maWcucHJlbG9hZFRpbWUgfHwgMztcbiAgICB0aGlzLmR1cmF0aW9uID0gMDtcblxuICAgIHRoaXMuX2N1cnJlbnRCdWZmZXIgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fbmV4dEJ1ZmZlciA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9sYXN0cHRzID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3ByZURlY29kZSA9IFtdO1xuICAgIHRoaXMuX2N1cnJlbnRUaW1lID0gMDtcbiAgICB0aGlzLl9kZWNvZGluZyA9IGZhbHNlO1xuICAgIC8vIOiusOW9leWklumDqOS8oOi+k+eahOeKtuaAgVxuICAgIHRoaXMuX3BsYXllZCA9IGZhbHNlO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRUaW1lKCkge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50VGltZTtcbiAgfVxuXG4gIGRlY29kZUF1ZGlvIChhdWRpb1RyYWNrKSB7XG4gICAgbGV0IHtzYW1wbGVzfSA9IGF1ZGlvVHJhY2s7XG4gICAgbGV0IGRhdGEgPSBzYW1wbGVzO1xuICAgIGF1ZGlvVHJhY2suc2FtcGxlcyA9IFtdO1xuICAgIHRoaXMuc2V0QXVkaW9EYXRhKGRhdGEpO1xuICB9XG4gIHNldEF1ZGlvRGF0YSAoZGF0YSkge1xuICAgIGZvcihsZXQgaSA9IDA7aSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRhdGFbaV0ucHRzID0gKGRhdGFbaV0ucHRzID09PSB1bmRlZmluZWQpID8gZGF0YVtpXS5kdHMgOiBkYXRhW2ldLnB0cztcbiAgICAgIHRoaXMuX3ByZURlY29kZS5wdXNoKGRhdGFbaV0pO1xuICAgIH1cbiAgICBpZih0aGlzLl9wcmVEZWNvZGUubGVuZ3RoID4gMCkge1xuICAgICAgaWYodGhpcy5fbGFzdHB0cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX2xhc3RwdHMgPSB0aGlzLl9wcmVEZWNvZGVbMF0ucHRzO1xuICAgICAgfVxuICAgICAgaWYoKHRoaXMuX3ByZURlY29kZVt0aGlzLl9wcmVEZWNvZGUubGVuZ3RoIC0gMV0ucHRzIC0gdGhpcy5fbGFzdHB0cykgLyAxMDAwID4gdGhpcy5wcmVsb2FkVGltZSkge1xuICAgICAgICB0aGlzLmRlY29kZUFBQygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRlY29kZUFBQygpIHtcbiAgICBpZih0aGlzLl9kZWNvZGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9kZWNvZGluZyA9IHRydWU7XG4gICAgbGV0IGRhdGEgPSB0aGlzLl9wcmVEZWNvZGU7XG4gICAgbGV0IHNhbXBsZXMgPSBbXTtcbiAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgIGxldCBzYW1wbGUgPSBkYXRhLnNoaWZ0KCk7XG4gICAgd2hpbGUoc2FtcGxlKSB7XG4gICAgICBsZXQgc2FtcGxlRGF0YSA9IEF1ZGlvQ3R4LmdldEFBQ0RhdGEodGhpcy5tZXRhLCBzYW1wbGUpXG4gICAgICBzYW1wbGVzLnB1c2goc2FtcGxlRGF0YSk7XG4gICAgICB0aGlzLl9sYXN0cHRzID0gc2FtcGxlLnB0cztcbiAgICAgIHNhbXBsZSA9IGRhdGEuc2hpZnQoKVxuICAgIH1cbiAgICBsZXQgYnVmZmVyID0gQXVkaW9DdHguY29tYmlsZURhdGEoc2FtcGxlcyk7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuY29udGV4dC5kZWNvZGVBdWRpb0RhdGEoYnVmZmVyLmJ1ZmZlciwgZnVuY3Rpb24oYnVmZmVyKSB7XG4gICAgICAgIGxldCBhdWRpb1NvdXJjZSA9IF90aGlzLmNvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgICAgIGF1ZGlvU291cmNlLmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgICAgYXVkaW9Tb3VyY2Uub25lbmRlZCA9IF90aGlzLm9uU291cmNlRW5kZWQuYmluZChfdGhpcyk7XG4gICAgICAgIF90aGlzLnNhbXBsZXMucHVzaCh7XG4gICAgICAgICAgdGltZTogX3RoaXMuZHVyYXRpb24sXG4gICAgICAgICAgZHVyYXRpb246IGJ1ZmZlci5kdXJhdGlvbixcbiAgICAgICAgICBkYXRhOiBhdWRpb1NvdXJjZVxuICAgICAgICB9KVxuXG4gICAgICAgIF90aGlzLmR1cmF0aW9uICs9IGJ1ZmZlci5kdXJhdGlvbjtcblxuICAgICAgICBpZighX3RoaXMuX2N1cnJlbnRCdWZmZXIpIHtcbiAgICAgICAgICBfdGhpcy5fY3VycmVudEJ1ZmZlciA9IF90aGlzLmdldFRpbWVCdWZmZXIoX3RoaXMuY3VycmVudFRpbWUpO1xuXG4gICAgICAgICAgaWYoX3RoaXMuX3BsYXllZCkge1xuICAgICAgICAgICAgX3RoaXMucGxheSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFfdGhpcy5fbmV4dEJ1ZmZlciAmJiBfdGhpcy5fY3VycmVudEJ1ZmZlcikge1xuICAgICAgICAgIF90aGlzLl9uZXh0QnVmZmVyID0gX3RoaXMuZ2V0VGltZUJ1ZmZlcihfdGhpcy5jdXJyZW50VGltZSArIF90aGlzLl9jdXJyZW50QnVmZmVyLmR1cmF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy5fZGVjb2RpbmcgPSBmYWxzZTtcblxuICAgICAgICBpZigoX3RoaXMuX3ByZURlY29kZS5sZW5ndGggPiAwICYmIF90aGlzLl9wcmVEZWNvZGVbX3RoaXMuX3ByZURlY29kZS5sZW5ndGggLSAxXS5wdHMgLSBfdGhpcy5fbGFzdHB0cykgLyAxMDAwID49IF90aGlzLnByZWxvYWRUaW1lKSB7XG4gICAgICAgICAgX3RoaXMuZGVjb2RlQUFDKCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICB9XG4gIH1cblxuICBvblNvdXJjZUVuZGVkKCkge1xuICAgIGlmICghdGhpcy5fbmV4dEJ1ZmZlciB8fCAhdGhpcy5fcGxheWVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBhdWRpb1NvdXJjZSA9IHRoaXMuX25leHRCdWZmZXIuZGF0YTtcbiAgICBhdWRpb1NvdXJjZS5zdGFydCgpO1xuICAgIGF1ZGlvU291cmNlLmNvbm5lY3QodGhpcy5nYWluTm9kZSk7XG4gICAgdGhpcy5fY3VycmVudEJ1ZmZlciA9IHRoaXMuX25leHRCdWZmZXI7XG4gICAgdGhpcy5fY3VycmVudFRpbWUgPSB0aGlzLl9jdXJyZW50QnVmZmVyLnRpbWU7XG4gICAgdGhpcy5fbmV4dEJ1ZmZlciA9IHRoaXMuZ2V0VGltZUJ1ZmZlcih0aGlzLmN1cnJlbnRUaW1lKTtcbiAgICBpZiAodGhpcy5fY3VycmVudEJ1ZmZlcikge1xuICAgICAgdGhpcy5fbmV4dEJ1ZmZlciA9IHRoaXMuZ2V0VGltZUJ1ZmZlcih0aGlzLmN1cnJlbnRUaW1lICsgdGhpcy5fY3VycmVudEJ1ZmZlci5kdXJhdGlvbik7XG4gICAgfVxuICAgIHRoaXMuZW1pdCgnQVVESU9fU09VUkNFX0VORCcpXG4gIH1cblxuICBwbGF5KCkge1xuICAgIHRoaXMuX3BsYXllZCA9IHRydWU7XG4gICAgaWYoIXRoaXMuX2N1cnJlbnRCdWZmZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGF1ZGlvU291cmNlID0gdGhpcy5fY3VycmVudEJ1ZmZlci5kYXRhO1xuICAgIGF1ZGlvU291cmNlLmNvbm5lY3QodGhpcy5nYWluTm9kZSk7XG4gICAgYXVkaW9Tb3VyY2Uuc3RhcnQoKTtcbiAgfVxuXG4gIGdldFRpbWVCdWZmZXIodGltZSkge1xuICAgIGxldCByZXQ7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuc2FtcGxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHNhbXBsZSA9IHRoaXMuc2FtcGxlc1tpXVxuICAgICAgaWYoc2FtcGxlLnRpbWUgPD0gdGltZSAmJiAoc2FtcGxlLnRpbWUgKyBzYW1wbGUuZHVyYXRpb24pID4gdGltZSkge1xuICAgICAgICByZXQgPSBzYW1wbGU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgc2V0QXVkaW9NZXRhRGF0YShtZXRhKSB7XG4gICAgdGhpcy5tZXRhID0gbWV0YTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRBQUNEYXRhKG1ldGEsIHNhbXBsZSkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgVWludDhBcnJheShzYW1wbGUuZGF0YS5ieXRlTGVuZ3RoICsgNyk7XG4gICAgbGV0IGFkdHMgPSBBdWRpb0N0eC5nZXRBZHRzKG1ldGEsIHNhbXBsZS5kYXRhKTtcbiAgICBidWZmZXIuc2V0KGFkdHMpO1xuICAgIGJ1ZmZlci5zZXQoc2FtcGxlLmRhdGEsIDcpO1xuICAgIHJldHVybiBidWZmZXI7XG4gIH1cblxuICBzdGF0aWMgY29tYmlsZURhdGEoc2FtcGxlcykge1xuICAgIC8vIGdldCBsZW5ndGhcbiAgICBsZXQgbGVuZ3RoID0gMDtcbiAgICBmb3IobGV0IGkgPSAwLGsgPSBzYW1wbGVzLmxlbmd0aDsgaSA8IGs7IGkrKykge1xuICAgICAgbGVuZ3RoICs9IHNhbXBsZXNbaV0uYnl0ZUxlbmd0aDtcbiAgICB9XG5cbiAgICBsZXQgcmV0ID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKTtcbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICAvLyBjb21iaWxlIGRhdGE7XG4gICAgZm9yKGxldCBpID0gMCxrID0gc2FtcGxlcy5sZW5ndGg7IGkgPCBrOyBpKyspIHtcbiAgICAgIHJldC5zZXQoc2FtcGxlc1tpXSwgb2Zmc2V0KTtcbiAgICAgIG9mZnNldCArPSBzYW1wbGVzW2ldLmJ5dGVMZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBzdGF0aWMgZ2V0QWR0cyhtZXRhLCBkYXRhKSB7XG4gICAgbGV0IGFkdHMgPSBuZXcgVWludDhBcnJheSg3KTtcblxuICAgIC8vIOiuvue9ruWQjOatpeS9jSAweGZmZiAxMmJpdFxuICAgIGFkdHNbMF0gPSAweGZmO1xuICAgIGFkdHNbMV0gPSAweGYwO1xuXG4gICAgLy8gT2JqZWN0IGRhdGEgKOayoeS7gOS5iOS6uueUqE1QRUctMuS6hu+8jEhMU+WSjEZMVuS5n+WFqOaYr01QRUctNO+8jOi/memHjOebtOaOpTApICAxYml0XG4gICAgLy8gTGV2ZWwgYWx3YXlzIDAwIDJiaXRcbiAgICAvLyBDUkMgYWx3YXlzIDEgMWJpdFxuICAgIGFkdHNbMV0gPSBhZHRzWzFdIHwgMHgwMTtcblxuICAgIC8vIHByb2ZpbGUgMmJpdFxuICAgIGFkdHNbMl0gPSAweGMwICYgKChtZXRhLm9iamVjdFR5cGUtMSkgPDwgNik7XG5cbiAgICAvL3NhbXBsZUZyZXF1ZW5jeUluZGV4XG4gICAgYWR0c1syXSA9IGFkdHNbMl0gfCAoMHgzYyAmIChtZXRhLnNhbXBsZVJhdGVJbmRleCA8PCAyKSlcblxuICAgIC8vcHJpdmF0ZSBiaXQgMCAxYml0XG4gICAgLy8gY2hhbmVsIGNvbmZpZ3VyYXRpb24gM2JpdFxuICAgIGFkdHNbMl0gPSBhZHRzWzJdIHwgKDB4MDEgJiBtZXRhLmNoYW5uZWxDb3VudCA+PiAyKTtcbiAgICBhZHRzWzNdID0gMHhjMCAmIChtZXRhLmNoYW5uZWxDb3VudCA8PCA2KTtcblxuICAgIC8vIG9yaWdpbmFsX2NvcHk6IDAgMWJpdFxuICAgIC8vIGhvbWU6IDAgMWJpdFxuXG4gICAgLy8gYWR0c192YXJpYWJsZV9oZWFkZXIoKVxuICAgIC8vIGNvcHlyaWdodGVkX2lkX2JpdCAwIDFiaXRcbiAgICAvLyBjb3B5cmlnaHRlZF9pZF9zdGFydCAwIDFiaXRcblxuICAgIC8vIGFhY19mcmFtZV9sZW5ndGggMTNiaXQ7XG4gICAgbGV0IGFhY2ZyYW1lbGVuZ3RoID0gZGF0YS5ieXRlTGVuZ3RoICsgNztcblxuICAgIGFkdHNbM10gPSBhZHRzWzNdIHwgKDB4MDMgJiBhYWNmcmFtZWxlbmd0aCA+PiAxMSk7XG4gICAgYWR0c1s0XSA9IDB4ZmYgJiAoYWFjZnJhbWVsZW5ndGggPj4gMyk7XG4gICAgYWR0c1s1XSA9IDB4ZTAgJiAoYWFjZnJhbWVsZW5ndGggPDwgNSk7XG5cbiAgICAvLyBhZHRzX2J1ZmZlcl9mdWxsbmVzcyAweDdmZiAxMWJpdFxuICAgIGFkdHNbNV0gPSBhZHRzWzVdIHwgMHgxZlxuICAgIGFkdHNbNl0gPSAweGZjO1xuXG4gICAgLy8gbnVtYmVyX29mX3Jhd19kYXRhX2Jsb2Nrc19pbl9mcmFtZSAwIDJiaXQ7XG4gICAgcmV0dXJuIGFkdHM7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXVkaW9DdHg7XG4iLCJpbXBvcnQgVmlkZW9DdHggZnJvbSAnLi92aWRlby1jb250ZXh0JztcbmltcG9ydCBBdWRpb0N0eCBmcm9tICcuL2F1ZGlvLWNvbnRleHQnO1xuaW1wb3J0IHsgZ2V0VGlja2VyIH0gZnJvbSAnLi90aWNrZXInO1xuXG4vKipcbiAqIOmfs+eUu+WQjOatpeiwg+WSjOWZqFxuICovXG5jbGFzcyBBVlJlY29uY2lsZXIge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICB0aGlzLmFDdHggPSBwcm9wcy5hQ3R4O1xuICAgIHRoaXMudkN0eCA9IHByb3BzLnZDdHg7XG5cbiAgICB0aGlzLnRpbWVvdXRJZCA9IG51bGxcbiAgICB0aGlzLnN0YXJ0ID0gbnVsbFxuICB9XG5cbiAgZG9SZWNvbmNpbGUgKCkge1xuICAgIGNvbnN0IHZDdXJUaW1lID0gdGhpcy52Q3R4LmN1cnJlbnRUaW1lIHx8IDA7XG4gICAgY29uc3QgYUN1clRpbWUgPSAodGhpcy5hQ3R4LmN1cnJlbnRUaW1lIHx8IDApICogMTAwMDtcblxuICAgIGNvbnN0IGdhcCA9IHZDdXJUaW1lIC0gYUN1clRpbWU7XG4gICAgaWYgKHRoaXMudGltZW91dElkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChnYXAgPiAyMDApIHsgLy8gYXVkaW8gZGVsYXllZCBmb3IgbW9yZSB0aGFuIDEwMG1zXG4gICAgICB0aGlzLnN0YXJ0ICs9IGdhcFxuICAgICAgdGhpcy52Q3R4LnBhdXNlKClcbiAgICAgIHRoaXMudGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMudkN0eC5wbGF5KClcbiAgICAgICAgdGhpcy50aW1lb3V0SWQgPSBudWxsXG4gICAgICB9LCBnYXApXG4gICAgfSBlbHNlIGlmIChnYXAgPCAtMTIwKSB7XG4gICAgICB0aGlzLnZDdHguY3VycmVudFRpbWUgPSB0aGlzLnZDdHguY3VycmVudFRpbWUgKyBNYXRoLmFicyhnYXApO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuYUN0eCA9IG51bGxcbiAgICB0aGlzLnZDdHggPSBudWxsXG4gIH1cbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5jbGFzcyBNb2JpbGVWaWRlbyBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZykge1xuICAgIHN1cGVyKCk7XG4gICAgbGV0IF90aGlzID0gdGhpcztcbiAgICB0aGlzLnZDdHggPSBuZXcgVmlkZW9DdHgoKTtcbiAgICB0aGlzLmFDdHggPSBuZXcgQXVkaW9DdHgoY29uZmlnKTtcbiAgICB0aGlzLnRpY2tlciA9IG5ldyAoZ2V0VGlja2VyKCkpKClcbiAgICB0aGlzLmhpc3RvcnlUaW1lID0gMDtcbiAgICB0aGlzLnJlY29uY2lsZXIgPSBuZXcgQVZSZWNvbmNpbGVyKHtcbiAgICAgIHZDdHg6IHRoaXMudkN0eCxcbiAgICAgIGFDdHg6IHRoaXMuYUN0eFxuICAgIH0pXG4gICAgdGhpcy5oYW5kbGVBdWRpb1NvdXJjZUVuZCA9IHRoaXMuaGFuZGxlQXVkaW9Tb3VyY2VFbmQuYmluZCh0aGlzKVxuICAgIHRoaXMuaW5pdCgpXG4gIH1cblxuICBpbml0ICgpIHtcbiAgICB0aGlzLnZDdHgub25jYW5wbGF5ID0gKCkgPT4ge1xuICAgICAgdGhpcy5hcHBlbmRDaGlsZCh0aGlzLnZDdHguY2FudmFzKTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2FucGxheScpKTtcbiAgICB9XG5cbiAgICB0aGlzLnRpY2tlci5zdGFydCgoKSA9PiB7XG4gICAgICAvL1xuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5hQ3R4LmN1cnJlbnRUaW1lKVxuICAgICAgaWYgKCF0aGlzLnN0YXJ0KSB7XG4gICAgICAgIHRoaXMuc3RhcnQgPSBEYXRlLm5vdygpXG4gICAgICB9XG4gICAgICB0aGlzLnZDdHguX29uVGltZXIoRGF0ZS5ub3coKSAtIHRoaXMuc3RhcnQpXG4gICAgfSlcblxuICAgIHRoaXMuYUN0eC5vbignQVVESU9fU09VUkNFX0VORCcsIHRoaXMuaGFuZGxlQXVkaW9Tb3VyY2VFbmQpXG4gIH1cblxuICBoYW5kbGVBdWRpb1NvdXJjZUVuZCAoKSB7XG4gICAgdGhpcy5yZWNvbmNpbGVyLmRvUmVjb25jaWxlKClcbiAgfVxuXG4gIF9jbGVhbkJ1ZmZlciAoKSB7XG4gICAgdGhpcy52Q3R4LmNsZWFuQnVmZmVyKClcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMucmVjb25jaWxlci5kZXN0cm95KClcbiAgfVxuXG4gIG9uRGVtdXhDb21wbGV0ZSAodmlkZW9UcmFjaywgYXVkaW9UcmFjaykge1xuICAgIHRoaXMuYUN0eC5kZWNvZGVBdWRpbyhhdWRpb1RyYWNrKTtcbiAgICB0aGlzLnZDdHguZGVjb2RlVmlkZW8odmlkZW9UcmFjayk7XG4gIH1cblxuICBzZXRBdWRpb01ldGEgKG1ldGEpIHtcbiAgICB0aGlzLmFDdHguc2V0QXVkaW9NZXRhRGF0YShtZXRhKTtcbiAgfVxuXG4gIHNldFZpZGVvTWV0YSAobWV0YSkge1xuICAgIHRoaXMudkN0eC5zZXRWaWRlb01ldGFEYXRhKG1ldGEpO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRUaW1lICgpIHtcblxuICB9XG5cbiAgcGxheSAoKSB7XG4gICAgLy8gaWYgKCF0aGlzLnZDdHguKVxuICAgIHRoaXMudkN0eC5wbGF5KCk7XG4gICAgdGhpcy5hQ3R4LnBsYXkoKTtcbiAgfVxufVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21vYmlsZS12aWRlbycsIE1vYmlsZVZpZGVvKTtcbiIsImNsYXNzIFNvdXJjZUJ1ZmZlciB7XG4gIGNvbnN0cnVjdG9yIChjb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZyk7XG4gICAgdGhpcy50eXBlID0gdGhpcy5jb25maWcudHlwZTtcbiAgICB0aGlzLmJ1ZmZlciA9IFtdO1xuICAgIHRoaXMuY3VycmVudEdvcCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9sYXN0R2V0ID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHVzaCAoZnJhbWUpIHtcbiAgICBpZiAodGhpcy50eXBlID09PSAndmlkZW8nKSB7XG4gICAgICBpZiAoZnJhbWUuaXNLZXlmcmFtZSkge1xuICAgICAgICBsZXQgY3VycmVudEdvcCA9IHtcbiAgICAgICAgICBzYW1wbGVzOiBbXSxcbiAgICAgICAgICBzdGFydDogZnJhbWUuZHRzLFxuICAgICAgICAgIGVuZDogZnJhbWUuZHRzLFxuICAgICAgICAgIG5leHRHb3A6IHVuZGVmaW5lZFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50R29wKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50R29wLm5leHRHb3AgPSBjdXJyZW50R29wO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudEdvcCA9IGN1cnJlbnRHb3A7XG4gICAgICAgIHRoaXMuYnVmZmVyLnB1c2godGhpcy5jdXJyZW50R29wKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY3VycmVudEdvcCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRHb3Auc2FtcGxlcy5wdXNoKGZyYW1lKTtcblxuICAgICAgICBpZiAoZnJhbWUuZHRzIDwgdGhpcy5jdXJyZW50R29wLnN0YXJ0KSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50R29wLnN0YXJ0ID0gZnJhbWUuZHRzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZyYW1lLmR0cyA+IHRoaXMuY3VycmVudEdvcC5lbmQpIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRHb3AuZW5kID0gZnJhbWUuZHRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0ICh0aW1lKSB7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgaWYgKHRoaXMuYnVmZmVyLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGltZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxldCBzYW1wbGUgPSB0aGlzLl9nZXROZXh0KCk7XG4gICAgICAgIHJldHVybiBzYW1wbGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2dldE5leHQgKCkge1xuICAgIGlmICghdGhpcy5fbGFzdEdldCkge1xuICAgICAgbGV0IGdvcCA9IHRoaXMuYnVmZmVyWzBdO1xuICAgICAgaWYgKGdvcC5zYW1wbGVzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2xhc3RHZXQgPSB7XG4gICAgICAgIGdvcCxcbiAgICAgICAgaW5kZXg6IDBcbiAgICAgIH1cbiAgICAgIHJldHVybiBnb3Auc2FtcGxlc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGdvcCA9IHRoaXMuX2xhc3RHZXQuZ29wO1xuICAgICAgbGV0IHNhbXBsZSA9IGdvcC5zYW1wbGVzW3RoaXMuX2xhc3RHZXQuaW5kZXggKyAxXTtcbiAgICAgIGlmIChzYW1wbGUpIHtcbiAgICAgICAgdGhpcy5fbGFzdEdldC5pbmRleCA9IHRoaXMuX2xhc3RHZXQuaW5kZXggKyAxO1xuICAgICAgICByZXR1cm4gc2FtcGxlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ29wID0gZ29wLm5leHRHb3A7XG4gICAgICAgIGlmICghZ29wIHx8IGdvcC5zYW1wbGVzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2FtcGxlID0gZ29wLnNhbXBsZXNbMF07XG4gICAgICAgIHRoaXMuX2xhc3RHZXQgPSB7XG4gICAgICAgICAgZ29wLFxuICAgICAgICAgIGluZGV4OiAwXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNhbXBsZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW1vdmUgKHN0YXJ0LCBlbmQpIHtcbiAgICBpZiAodGhpcy5idWZmZXIubGVuZ3RoIDwgMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBpID0gMDtcbiAgICBsZXQgZ29wID0gdGhpcy5idWZmZXJbMF07XG4gICAgd2hpbGUgKGdvcCkge1xuICAgICAgaWYgKGdvcC5lbmQgPCBlbmQgJiYgZ29wLnN0YXJ0ID49IHN0YXJ0KSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmJ1ZmZlcltpXTtcbiAgICAgICAgZ29wID0gdGhpcy5idWZmZXJbaV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpICs9IDE7XG4gICAgICAgIGdvcCA9IHRoaXMuYnVmZmVyW2ldO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTb3VyY2VCdWZmZXI7XG4iLCIvKipcbiAqIEBhdXRob3IgZnV5dWhhb0BieXRlZGFuY2UuY29tXG4gKi9cblxuY2xhc3MgVGlja2VyIHtcbiAgY29uc3RydWN0b3IgKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zIHx8IHt9LCB7XG4gICAgICBpbnRlcnZhbDogMTZcbiAgICB9KVxuXG4gICAgdGhpcy5jYWxsYmFja3MgPSBbXVxuICB9XG5cbiAgc3RhcnQoLi4uY2FsbGJhY2tzKSB7XG4gICAgdGhpcy5jYWxsYmFja3MgPSBjYWxsYmFja3NcbiAgfVxuXG4gIG9uVGljayAoKSB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb25zdCBjYWxsYmFjayA9IHRoaXMuY2FsbGJhY2tzW2ldXG4gICAgICBjYWxsYmFjaygpXG4gICAgfVxuICB9XG5cbiAgc2V0SW50ZXJ2YWwgKGludGVydmFsKSB7XG4gICAgdGhpcy5vcHRpb25zLmludGVydmFsID0gaW50ZXJ2YWxcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG4vKipcbiAqIHRpY2tlciB1c2UgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gKi9cbmNsYXNzIFJhZlRpY2tlciBleHRlbmRzIFRpY2tlciB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnByZXYgPSBudWxsO1xuICAgIHRoaXMudGltZXJJZCA9IG51bGxcbiAgICB0aGlzLl9zdWJUaW1lcklkID0gbnVsbFxuXG4gICAgdGhpcy5fdGlja0Z1bmMgPSBSYWZUaWNrZXIuZ2V0VGlja0Z1bmMoKVxuICAgIHRoaXMudGljayA9IHRoaXMudGljay5iaW5kKHRoaXMpXG4gIH1cblxuICBzdGFydCAoLi4uY2FsbGJhY2tzKSB7XG4gICAgc3VwZXIuc3RhcnQoLi4uY2FsbGJhY2tzKVxuICAgIHRoaXMudGljaygpXG4gIH1cblxuICB0aWNrICh0aW1lc3RhbXApIHtcbiAgICB0aGlzLm5leHRUaWNrKCk7XG4gICAgdGhpcy5vblRpY2soKVxuICB9XG5cbiAgbmV4dFRpY2sgKCkge1xuICAgIGNvbnN0IHsgX3RpY2tGdW5jIH0gPSB0aGlzO1xuICAgIHRoaXMudGltZXJJZCA9IF90aWNrRnVuYyh0aGlzLnRpY2spXG4gIH1cblxuICBzdG9wICgpIHtcbiAgICBpZiAodGhpcy50aW1lcklkKSB7XG4gICAgICBjb25zdCBjYW5jZWxGdW5jID0gUmFmVGlja2VyLmdldENhbmNlbEZ1bmMoKVxuXG4gICAgICBjYW5jZWxGdW5jKHRoaXMudGltZXJJZClcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0VGlja0Z1bmMgKCkge1xuICAgIHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgfVxuXG4gIHN0YXRpYyBnZXRDYW5jZWxGdW5jICgpIHtcbiAgICByZXR1cm4gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZVxuICB9XG5cbiAgc3RhdGljIGlzU3VwcG9ydGVkICgpIHtcbiAgICByZXR1cm4gUmFmVGlja2VyLmdldFRpY2tGdW5jKCkgIT09IHVuZGVmaW5lZFxuICB9XG59XG5cbi8qKlxuICogdXNlIHNldFRpbWVvdXQgZm9yIGJyb3dzZXJzIHdpdGhvdXQgcmFmIHN1cHBvcnRcbiAqL1xuY2xhc3MgVGltZW91dFRpY2tlciBleHRlbmRzIFRpY2tlciB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKGNvbmZpZylcbiAgICB0aGlzLnRpbWVvdXRJZCA9IG51bGxcblxuICB9XG5cbiAgc3RhcnQgKC4uLmNhbGxiYWNrcykge1xuICAgIHN1cGVyLm5leHRUaWNrKC4uLmNhbGxiYWNrcylcbiAgICB0aGlzLnRpbWVvdXRJZCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICB0aGlzLm9uVGljaygpO1xuICAgIH0sIHRoaXMub3B0aW9ucy5pbnRlcnZhbCB8fCAxNilcbiAgfVxuXG4gIHN0b3AgKCkge1xuICAgIGlmICh0aGlzLnRpbWVvdXRJZCkge1xuICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy50aW1lb3V0SWQpXG4gICAgfVxuICB9XG5cbn1cblxuLyoqXG4gKiDov5Tlm55UaWNrZXLmnoTpgKDlh73mlbBcbiAqIEByZXR1cm5zIHtUaWNrZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRUaWNrZXIgPSAoKSA9PiB7XG4gIGlmIChSYWZUaWNrZXIuaXNTdXBwb3J0ZWQoKSkge1xuICAgIHJldHVybiBSYWZUaWNrZXJcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gVGltZW91dFRpY2tlclxuICB9XG59XG4iLCJpbXBvcnQgV29ya2VyaWZ5IGZyb20gJ3dlYndvcmtpZnktd2VicGFjaydcbmltcG9ydCBTdHJlYW0gZnJvbSAnLi4vd3JpdGUvc3RyZWFtJztcbmltcG9ydCBOYWx1bml0IGZyb20gJy4uLy4uLy4uL3hncGxheWVyLWNvZGVjL3NyYy9oMjY0L25hbHVuaXQnO1xuaW1wb3J0IFlVVkNhbnZhcyBmcm9tICcuL3l1di1jYW52YXMnO1xuaW1wb3J0IFNvdXJjZUJ1ZmZlciBmcm9tICcuL3NvdXJjZWJ1ZmZlcic7XG5jbGFzcyBWaWRlb0NhbnZhcyB7XG4gIGNvbnN0cnVjdG9yIChjb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZyk7XG4gICAgdGhpcy5jYW52YXMgPSB0aGlzLmNvbmZpZy5jYW52YXMgPyB0aGlzLmNvbmZpZy5jYW52YXMgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICB0aGlzLnNvdXJjZSA9IG5ldyBTb3VyY2VCdWZmZXIoe3R5cGU6ICd2aWRlbyd9KTtcbiAgICB0aGlzLnByZWxvYWRUaW1lID0gdGhpcy5jb25maWcucHJlbG9hZFRpbWUgfHwgMztcbiAgICB0aGlzLm9uY2FucGxheSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm9uRmlyc3RGcmFtZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm1ldGEgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5yZWFkeVN0YXR1cyA9IDA7XG4gICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgIHRoaXMuY291bnQgPSAwO1xuICAgIHRoaXMuY3VycmVudFRpbWUgPSAwO1xuICAgIHRoaXMubGFzdFBsYXllZCA9IDA7XG5cbiAgICB0aGlzLl9kZWNvZGVySW5pdGVkID0gZmFsc2U7XG4gICAgdGhpcy5fYXZjY3B1c2hlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2RlY29kZWRGcmFtZXMgPSB7fTtcbiAgICB0aGlzLl9sYXN0U2FtcGxlRHRzID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2Jhc2VEdHMgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fbGFzdFJlbmRlclRpbWUgPSBudWxsXG4gIH1cblxuICBwYXVzZSAoKSB7XG4gICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICB9XG5cbiAgaW5pdFdhc21Xb3JrZXIgKCkge1xuICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy53YXNtd29ya2VyID0gV29ya2VyaWZ5KHJlcXVpcmUucmVzb2x2ZSgnLi93b3JrZXIuanMnKSk7XG4gICAgdGhpcy53YXNtd29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgIG1zZzogJ2luaXQnLFxuICAgICAgbWV0YTogdGhpcy5tZXRhXG4gICAgfSlcbiAgICB0aGlzLndhc213b3JrZXIuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIG1zZyA9PiB7XG4gICAgICBzd2l0Y2ggKG1zZy5kYXRhLm1zZykge1xuICAgICAgICBjYXNlICdERUNPREVSX1JFQURZJzpcbiAgICAgICAgICBfdGhpcy5fZGVjb2RlckluaXRlZCA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0RFQ09ERUQnOlxuICAgICAgICAgIHRoaXMuX29uRGVjb2RlZChtc2cuZGF0YSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzZXRWaWRlb01ldGFEYXRhIChtZXRhKSB7XG4gICAgdGhpcy5tZXRhID0gbWV0YTtcbiAgICBpZiAoIXRoaXMuX2RlY29kZXJJbml0ZWQpIHtcbiAgICAgIHRoaXMuaW5pdFdhc21Xb3JrZXIoKTtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLl9hdmNjcHVzaGVkID0gdHJ1ZTtcbiAgICBsZXQgZGF0YSA9IG5ldyBVaW50OEFycmF5KG1ldGEuc3BzLmJ5dGVMZW5ndGggKyA0KTtcbiAgICBkYXRhLnNldChbMCwgMCwgMCwgMV0pXG4gICAgZGF0YS5zZXQobWV0YS5zcHMsIDQpO1xuICAgIHRoaXMud2FzbXdvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICBtc2c6ICdkZWNvZGUnLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pXG5cbiAgICBkYXRhID0gbmV3IFVpbnQ4QXJyYXkobWV0YS5wcHMuYnl0ZUxlbmd0aCArIDQpO1xuICAgIGRhdGEuc2V0KFswLCAwLCAwLCAxXSlcbiAgICBkYXRhLnNldChtZXRhLnBwcywgNCk7XG4gICAgdGhpcy53YXNtd29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgIG1zZzogJ2RlY29kZScsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSlcblxuICAgIGlmICghdGhpcy55dXZDYW52YXMpIHtcbiAgICAgIGxldCBjb25maWcgPSBPYmplY3QuYXNzaWduKHttZXRhLCBjYW52YXM6IHRoaXMuY2FudmFzfSwgdGhpcy5jb25maWcpO1xuICAgICAgdGhpcy55dXZDYW52YXMgPSBuZXcgWVVWQ2FudmFzKGNvbmZpZyk7XG4gICAgfVxuICAgIHRoaXMucmVhZHlTdGF0dXMgPSAxO1xuICB9XG5cbiAgZGVjb2RlVmlkZW8gKHZpZGVvVHJhY2spIHtcbiAgICBpZiAoIXRoaXMuX2RlY29kZXJJbml0ZWQpIHtcbiAgICAgIHRoaXMuaW5pdFdhc21Xb3JrZXIoKTtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICghdGhpcy5fYXZjY3B1c2hlZCkge1xuICAgICAgdGhpcy5zZXRWaWRlb01ldGFEYXRhKHRoaXMubWV0YSk7XG4gICAgfVxuICAgIGxldCB7IHNhbXBsZXMgfSA9IHZpZGVvVHJhY2s7XG4gICAgbGV0IHNhbXBsZSA9IHNhbXBsZXMuc2hpZnQoKTtcblxuICAgIHdoaWxlIChzYW1wbGUpIHtcbiAgICAgIGlmICghdGhpcy5fYmFzZUR0cykge1xuICAgICAgICB0aGlzLl9iYXNlRHRzID0gc2FtcGxlLmR0cztcbiAgICAgIH1cbiAgICAgIHRoaXMuc291cmNlLnB1c2goc2FtcGxlKTtcbiAgICAgIHNhbXBsZSA9IHNhbXBsZXMuc2hpZnQoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9wcmVsb2FkKCk7XG4gIH1cblxuICBfcHJlbG9hZCAoKSB7XG4gICAgaWYgKCF0aGlzLl9sYXN0U2FtcGxlRHRzIHx8IHRoaXMuX2xhc3RTYW1wbGVEdHMgLSB0aGlzLl9iYXNlRHRzIDwgdGhpcy5jdXJyZW50VGltZSArIHRoaXMucHJlbG9hZFRpbWUgKiAxMDAwKSB7XG4gICAgICBsZXQgc2FtcGxlID0gdGhpcy5zb3VyY2UuZ2V0KCk7XG4gICAgICBpZiAoc2FtcGxlKSB7XG4gICAgICAgIHRoaXMuX2xhc3RTYW1wbGVEdHMgPSBzYW1wbGUuZHRzO1xuICAgICAgICB0aGlzLl9hbmFseXNlTmFsKHNhbXBsZSk7XG4gICAgICB9XG5cbiAgICAgIHdoaWxlIChzYW1wbGUgJiYgdGhpcy5fbGFzdFNhbXBsZUR0cyAtIHRoaXMuX2Jhc2VEdHMgPCB0aGlzLmN1cnJlbnRUaW1lICsgdGhpcy5wcmVsb2FkVGltZSAqIDEwMDApIHtcbiAgICAgICAgc2FtcGxlID0gdGhpcy5zb3VyY2UuZ2V0KCk7XG4gICAgICAgIGlmIChzYW1wbGUpIHtcbiAgICAgICAgICB0aGlzLl9hbmFseXNlTmFsKHNhbXBsZSk7XG4gICAgICAgICAgdGhpcy5fbGFzdFNhbXBsZUR0cyA9IHNhbXBsZS5kdHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfYW5hbHlzZU5hbCAoc2FtcGxlKSB7XG4gICAgbGV0IG5hbHMgPSBOYWx1bml0LmdldEF2Y2NOYWxzKG5ldyBTdHJlYW0oc2FtcGxlLmRhdGEuYnVmZmVyKSk7XG5cbiAgICBsZXQgbGVuZ3RoID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBuYWwgPSBuYWxzW2ldO1xuICAgICAgbGVuZ3RoICs9IG5hbC5ib2R5LmJ5dGVMZW5ndGggKyA0O1xuICAgIH1cbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICBsZXQgZGF0YSA9IG5ldyBVaW50OEFycmF5KGxlbmd0aCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgbmFsID0gbmFsc1tpXTtcbiAgICAgIGRhdGEuc2V0KFswLCAwLCAwLCAxXSwgb2Zmc2V0KTtcbiAgICAgIG9mZnNldCArPSA0O1xuICAgICAgZGF0YS5zZXQobmV3IFVpbnQ4QXJyYXkobmFsLmJvZHkpLCBvZmZzZXQpO1xuICAgICAgb2Zmc2V0ICs9IG5hbC5ib2R5LmJ5dGVMZW5ndGg7XG4gICAgfVxuICAgIHRoaXMud2FzbXdvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICBtc2c6ICdkZWNvZGUnLFxuICAgICAgZGF0YTogZGF0YSxcbiAgICAgIGluZm86IHtcbiAgICAgICAgZHRzOiBzYW1wbGUuZHRzLFxuICAgICAgICBwdHM6IHNhbXBsZS5wdHMgPyBzYW1wbGUucHRzIDogc2FtcGxlLmR0cyArIHNhbXBsZS5jdHMsXG4gICAgICAgIGtleTogc2FtcGxlLmlzS2V5ZnJhbWVcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgX29uRGVjb2RlZCAoZGF0YSkge1xuICAgIGxldCB7ZHRzfSA9IGRhdGEuaW5mb1xuICAgIHRoaXMuX2RlY29kZWRGcmFtZXNbZHRzXSA9IGRhdGE7XG4gIH1cblxuICBwbGF5ICgpIHtcbiAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICAgIHRoaXMuX29uVGltZXIoKTtcbiAgfVxuXG4gIF9vblRpbWVyIChjdXJyZW50VGltZSkge1xuICAgIGlmICh0aGlzLnBhdXNlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5tZXRhKSB7XG4gICAgICBpZiAodGhpcy5tZXRhLmZyYW1lUmF0ZSAmJiB0aGlzLm1ldGEuZnJhbWVSYXRlLmZpeGVkICYmIHRoaXMubWV0YS5mcmFtZVJhdGUuZnBzKSB7XG4gICAgICB9XG4gICAgICBsZXQgZnJhbWVUaW1lcyA9IE9iamVjdC5rZXlzKHRoaXMuX2RlY29kZWRGcmFtZXMpO1xuICAgICAgaWYgKGZyYW1lVGltZXMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRUaW1lID0gY3VycmVudFRpbWU7XG4gICAgICAgIGxldCBmcmFtZVRpbWUgPSAtMTtcbiAgICAgICAgbGV0IGN1cnJlbnRJZHggPSAwXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnJhbWVUaW1lcy5sZW5ndGggJiYgTnVtYmVyLnBhcnNlSW50KGZyYW1lVGltZXNbaV0pIC0gdGhpcy5fYmFzZUR0cyA8PSB0aGlzLmN1cnJlbnRUaW1lOyBpKyspIHtcbiAgICAgICAgICBmcmFtZVRpbWUgPSBOdW1iZXIucGFyc2VJbnQoZnJhbWVUaW1lc1tpIC0gMV0pO1xuICAgICAgICAgIGN1cnJlbnRJZHggPSBpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZyYW1lID0gdGhpcy5fZGVjb2RlZEZyYW1lc1tmcmFtZVRpbWVdO1xuICAgICAgICBpZiAoZnJhbWUpIHtcbiAgICAgICAgICBpZiAodGhpcy5vbmNhbnBsYXkgJiYgdGhpcy5yZWFkeVN0YXR1cyA8IDQpIHtcbiAgICAgICAgICAgIHRoaXMub25jYW5wbGF5KCk7XG4gICAgICAgICAgICB0aGlzLnJlYWR5U3RhdHVzID0gNDtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc29sZS5sb2coZnJhbWVUaW1lKVxuICAgICAgICAgIHRoaXMueXV2Q2FudmFzLnJlbmRlcihmcmFtZS5idWZmZXIsIGZyYW1lLndpZHRoLCBmcmFtZS5oZWlnaHQpO1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3VycmVudElkeDsgaSsrKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fZGVjb2RlZEZyYW1lc1tpXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fbGFzdFJlbmRlclRpbWUgPSBEYXRlLm5vdygpXG4gIH1cblxuICBjbGVhbkJ1ZmZlciAoKSB7XG4gICAgdGhpcy5zb3VyY2UucmVtb3ZlKDAsIHRoaXMuY3VycmVudFRpbWUpO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBWaWRlb0NhbnZhcztcbiIsImNvbnN0IE1BWF9TVFJFQU1fQlVGRkVSX0xFTkdUSCA9IDEwMjQgKiAxMDI0O1xudmFyIERlY29kZXIgPSBmdW5jdGlvbiAoc2VsZikge1xuICB0aGlzLmluaXRlZCA9IGZhbHNlO1xuICB0aGlzLnNlbGYgPSBzZWxmO1xuICB0aGlzLm1ldGEgPSB0aGlzLnNlbGYubWV0YTtcbiAgdGhpcy5pbmZvbGlzdCA9IHt9O1xuICBzZWxmLnBhcl9icm9hZHdheU9uQnJvYWR3YXlJbml0ZWQgPSB0aGlzLmJyb2Fkd2F5T25Ccm9hZHdheUluaXRlZC5iaW5kKHRoaXMpO1xuICBzZWxmLnBhcl9icm9hZHdheU9uUGljdHVyZURlY29kZWQgPSB0aGlzLmJyb2Fkd2F5T25QaWN0dXJlRGVjb2RlZC5iaW5kKHRoaXMpO1xufVxuXG5EZWNvZGVyLnByb3RvdHlwZS50b1U4QXJyYXkgPSBmdW5jdGlvbiAocHRyLCBsZW5ndGgpIHtcbiAgcmV0dXJuIHRoaXMuc2VsZi5IRUFQVTguc3ViYXJyYXkocHRyLCBwdHIgKyBsZW5ndGgpO1xufVxuXG5EZWNvZGVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCkge1xuICBNb2R1bGUuX2Jyb2Fkd2F5SW5pdCgpO1xuICB0aGlzLnN0cmVhbUJ1ZmZlciA9IHRoaXMudG9VOEFycmF5KE1vZHVsZS5fYnJvYWR3YXlDcmVhdGVTdHJlYW0oTUFYX1NUUkVBTV9CVUZGRVJfTEVOR1RIKSwgTUFYX1NUUkVBTV9CVUZGRVJfTEVOR1RIKTtcbn1cblxuRGVjb2Rlci5wcm90b3R5cGUuYnJvYWR3YXlPblBpY3R1cmVEZWNvZGVkID0gZnVuY3Rpb24gKG9mZnNldCwgd2lkdGgsIGhlaWdodCwgaW5mb2lkKSB7XG4gIGxldCBpbmZvID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5pbmZvbGlzdFtpbmZvaWRdKTtcbiAgbGV0IHJlZiA9IDM7XG4gIGlmICh0aGlzLm1ldGEuY2hyb21hRm9ybWF0ID09PSA0MjApIHtcbiAgICByZWYgPSAxLjU7XG4gIH0gZWxzZSBpZiAodGhpcy5tZXRhLmNocm9tYUZvcm1hdCA9PT0gNDIyKSB7XG4gICAgcmVmID0gMjtcbiAgfVxuICBsZXQgZGF0YSA9IHRoaXMudG9VOEFycmF5KG9mZnNldCwgd2lkdGggKiBoZWlnaHQgKiByZWYpO1xuICB0aGlzLmluZm9saXN0W2luZm9pZF0gPSBudWxsO1xuICBsZXQgZGF0ZXRlbXAgPSBuZXcgVWludDhBcnJheShkYXRhLmxlbmd0aCk7XG4gIGRhdGV0ZW1wLnNldChkYXRhKTtcbiAgbGV0IGJ1ZmZlciA9IGRhdGV0ZW1wLmJ1ZmZlcjtcbiAgdGhpcy5zZWxmLnBvc3RNZXNzYWdlKHtcbiAgICBtc2c6ICdERUNPREVEJyxcbiAgICB3aWR0aCxcbiAgICBoZWlnaHQsXG4gICAgaW5mbyxcbiAgICBidWZmZXJcbiAgfSwgW2J1ZmZlcl0pO1xufVxuXG5EZWNvZGVyLnByb3RvdHlwZS5icm9hZHdheU9uQnJvYWR3YXlJbml0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuaW5pdGVkID0gdHJ1ZTtcbiAgdGhpcy5zZWxmLnBvc3RNZXNzYWdlKHttc2c6ICdERUNPREVSX1JFQURZJ30pO1xufVxuXG5EZWNvZGVyLnByb3RvdHlwZS5kZWNvZGUgPSBmdW5jdGlvbiAoZGF0YSwgaW5mbykge1xuICBsZXQgdGltZSA9IHBhcnNlSW50KG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcbiAgbGV0IGluZm9pZCA9IHRpbWUgLSAoTWF0aC5mbG9vcih0aW1lIC8gMTBlOCkgKiAxMGU4KTtcbiAgdGhpcy5pbmZvbGlzdFtpbmZvaWRdID0gaW5mbztcbiAgdGhpcy5zdHJlYW1CdWZmZXIuc2V0KGRhdGEpO1xuICBNb2R1bGUuX2Jyb2Fkd2F5UGxheVN0cmVhbShkYXRhLmxlbmd0aCwgaW5mb2lkKTtcbn1cblxudmFyIGRlY29kZXI7XG5cbmZ1bmN0aW9uIG9uUG9zdFJ1biAoKSB7XG4gIGRlY29kZXIgPSBuZXcgRGVjb2Rlcih0aGlzKTtcbiAgZGVjb2Rlci5pbml0KCk7XG59XG5cbmZ1bmN0aW9uIGluaXQgKG1ldGEpIHtcbiAgc2VsZi5pbXBvcnRTY3JpcHRzKCdodHRwczovL3NmNi12Y2xvdWRjZG4ucHN0YXRwLmNvbS9vYmovdHRmZS9tZWRpYS9kZWNvZGVyL2gyNjQvZGVjb2Rlci5qcycpO1xuICBhZGRPblBvc3RSdW4ob25Qb3N0UnVuLmJpbmQoc2VsZikpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzZWxmKSB7XG4gIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIGRhdGEgPSBlLmRhdGE7XG4gICAgaWYgKCFkYXRhLm1zZykge1xuICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7XG4gICAgICAgIG1zZzogJ0VSUk9SOmludmFsaWQgbWVzc2FnZSdcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCAoZGF0YS5tc2cpIHtcbiAgICAgICAgY2FzZSAnaW5pdCc6XG4gICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgc2VsZi5tZXRhID0gZGF0YS5tZXRhO1xuICAgICAgICAgIGluaXQoKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdkZWNvZGUnOlxuICAgICAgICAgIGRlY29kZXIuZGVjb2RlKGRhdGEuZGF0YSwgZGF0YS5pbmZvKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH0sIGZhbHNlKTtcbn1cbiIsImNsYXNzIFlVVkNhbnZhcyB7XG4gIGNvbnN0cnVjdG9yIChjb25maWdzKSB7XG4gICAgdGhpcy5jb25maWdzID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlncyk7XG4gICAgdGhpcy5jYW52YXMgPSB0aGlzLmNvbmZpZ3MuY2FudmFzO1xuICAgIHRoaXMubWV0YSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuY29uZmlncy5tZXRhKTtcbiAgICB0aGlzLmNocm9tYSA9IHRoaXMubWV0YS5jaHJvbWFGb3JtYXQ7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLm1ldGEucHJlc2VudEhlaWdodDtcbiAgICB0aGlzLndpZHRoID0gdGhpcy5tZXRhLnByZXNlbnRXaWR0aDtcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IDEyODA7XG4gICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gNzIwO1xuICAgIHRoaXMuY2FudmFzLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIHRoaXMuY2FudmFzLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICB0aGlzLl9pbml0Q29udGV4dEdMKCk7XG4gICAgaWYgKHRoaXMuY29udGV4dEdMKSB7XG4gICAgICB0aGlzLl9pbml0UHJvZ3JhbSgpO1xuICAgICAgdGhpcy5faW5pdEJ1ZmZlcnMoKTtcbiAgICAgIHRoaXMuX2luaXRUZXh0dXJlcygpO1xuICAgIH07XG4gIH1cblxuICBfaW5pdENvbnRleHRHTCAoKSB7XG4gICAgdmFyIGNhbnZhcyA9IHRoaXMuY2FudmFzO1xuICAgIHZhciBnbCA9IG51bGw7XG5cbiAgICB2YXIgdmFsaWRDb250ZXh0TmFtZXMgPSBbJ3dlYmdsJywgJ2V4cGVyaW1lbnRhbC13ZWJnbCcsICdtb3otd2ViZ2wnLCAnd2Via2l0LTNkJ107XG4gICAgdmFyIG5hbWVJbmRleCA9IDA7XG5cbiAgICB3aGlsZSAoIWdsICYmIG5hbWVJbmRleCA8IHZhbGlkQ29udGV4dE5hbWVzLmxlbmd0aCkge1xuICAgICAgdmFyIGNvbnRleHROYW1lID0gdmFsaWRDb250ZXh0TmFtZXNbbmFtZUluZGV4XTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dE9wdGlvbnMpIHtcbiAgICAgICAgICBnbCA9IGNhbnZhcy5nZXRDb250ZXh0KGNvbnRleHROYW1lLCB0aGlzLmNvbnRleHRPcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBnbCA9IGNhbnZhcy5nZXRDb250ZXh0KGNvbnRleHROYW1lKTtcbiAgICAgICAgfTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZ2wgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWdsIHx8IHR5cGVvZiBnbC5nZXRQYXJhbWV0ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZ2wgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICArK25hbWVJbmRleDtcbiAgICB9O1xuXG4gICAgdGhpcy5jb250ZXh0R0wgPSBnbDtcbiAgfTtcblxuICBfaW5pdFByb2dyYW0gKCkge1xuICAgIHZhciBnbCA9IHRoaXMuY29udGV4dEdMO1xuXG4gICAgLy8gdmVydGV4IHNoYWRlciBpcyB0aGUgc2FtZSBmb3IgYWxsIHR5cGVzXG4gICAgdmFyIHZlcnRleFNoYWRlclNjcmlwdDtcbiAgICB2YXIgZnJhZ21lbnRTaGFkZXJTY3JpcHQ7XG4gICAgdmVydGV4U2hhZGVyU2NyaXB0ID0gW1xuICAgICAgJ2F0dHJpYnV0ZSB2ZWM0IHZlcnRleFBvczsnLFxuICAgICAgJ2F0dHJpYnV0ZSB2ZWM0IHRleHR1cmVQb3M7JyxcbiAgICAgICdhdHRyaWJ1dGUgdmVjNCB1VGV4dHVyZVBvczsnLFxuICAgICAgJ2F0dHJpYnV0ZSB2ZWM0IHZUZXh0dXJlUG9zOycsXG4gICAgICAndmFyeWluZyB2ZWMyIHRleHR1cmVDb29yZDsnLFxuICAgICAgJ3ZhcnlpbmcgdmVjMiB1VGV4dHVyZUNvb3JkOycsXG4gICAgICAndmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7JyxcblxuICAgICAgJ3ZvaWQgbWFpbigpJyxcbiAgICAgICd7JyxcbiAgICAgICcgIGdsX1Bvc2l0aW9uID0gdmVydGV4UG9zOycsXG4gICAgICAnICB0ZXh0dXJlQ29vcmQgPSB0ZXh0dXJlUG9zLnh5OycsXG4gICAgICAnICB1VGV4dHVyZUNvb3JkID0gdVRleHR1cmVQb3MueHk7JyxcbiAgICAgICcgIHZUZXh0dXJlQ29vcmQgPSB2VGV4dHVyZVBvcy54eTsnLFxuICAgICAgJ30nXG4gICAgXS5qb2luKCdcXG4nKTtcblxuICAgIGZyYWdtZW50U2hhZGVyU2NyaXB0ID0gW1xuICAgICAgJ3ByZWNpc2lvbiBoaWdocCBmbG9hdDsnLFxuICAgICAgJ3ZhcnlpbmcgaGlnaHAgdmVjMiB0ZXh0dXJlQ29vcmQ7JyxcbiAgICAgICd2YXJ5aW5nIGhpZ2hwIHZlYzIgdVRleHR1cmVDb29yZDsnLFxuICAgICAgJ3ZhcnlpbmcgaGlnaHAgdmVjMiB2VGV4dHVyZUNvb3JkOycsXG4gICAgICAndW5pZm9ybSBzYW1wbGVyMkQgeVNhbXBsZXI7JyxcbiAgICAgICd1bmlmb3JtIHNhbXBsZXIyRCB1U2FtcGxlcjsnLFxuICAgICAgJ3VuaWZvcm0gc2FtcGxlcjJEIHZTYW1wbGVyOycsXG4gICAgICAndW5pZm9ybSBtYXQ0IFlVVjJSR0I7JyxcblxuICAgICAgJ3ZvaWQgbWFpbih2b2lkKSB7JyxcbiAgICAgICcgIGhpZ2hwIGZsb2F0IHkgPSB0ZXh0dXJlMkQoeVNhbXBsZXIsICB0ZXh0dXJlQ29vcmQpLnI7JyxcbiAgICAgICcgIGhpZ2hwIGZsb2F0IHUgPSB0ZXh0dXJlMkQodVNhbXBsZXIsICB1VGV4dHVyZUNvb3JkKS5yOycsXG4gICAgICAnICBoaWdocCBmbG9hdCB2ID0gdGV4dHVyZTJEKHZTYW1wbGVyLCAgdlRleHR1cmVDb29yZCkucjsnLFxuICAgICAgJyAgZ2xfRnJhZ0NvbG9yID0gdmVjNCh5LCB1LCB2LCAxKSAqIFlVVjJSR0I7JyxcbiAgICAgICd9J1xuICAgIF0uam9pbignXFxuJyk7XG5cbiAgICB2YXIgWVVWMlJHQiA9IFtcbiAgICAgIDEuMTY0MzgsIDAuMDAwMDAsIDEuNTk2MDMsIC0wLjg3MDc5LFxuICAgICAgMS4xNjQzOCwgLTAuMzkxNzYsIC0wLjgxMjk3LCAwLjUyOTU5LFxuICAgICAgMS4xNjQzOCwgMi4wMTcyMywgMC4wMDAwMCwgLTEuMDgxMzksXG4gICAgICAwLCAwLCAwLCAxXG4gICAgXTtcbiAgICB2YXIgdmVydGV4U2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKGdsLlZFUlRFWF9TSEFERVIpO1xuICAgIGdsLnNoYWRlclNvdXJjZSh2ZXJ0ZXhTaGFkZXIsIHZlcnRleFNoYWRlclNjcmlwdCk7XG4gICAgZ2wuY29tcGlsZVNoYWRlcih2ZXJ0ZXhTaGFkZXIpO1xuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHZlcnRleFNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgICBjb25zb2xlLmxvZygnVmVydGV4IHNoYWRlciBmYWlsZWQgdG8gY29tcGlsZTogJyArIGdsLmdldFNoYWRlckluZm9Mb2codmVydGV4U2hhZGVyKSk7XG4gICAgfVxuXG4gICAgdmFyIGZyYWdtZW50U2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUik7XG4gICAgZ2wuc2hhZGVyU291cmNlKGZyYWdtZW50U2hhZGVyLCBmcmFnbWVudFNoYWRlclNjcmlwdCk7XG4gICAgZ2wuY29tcGlsZVNoYWRlcihmcmFnbWVudFNoYWRlcik7XG4gICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoZnJhZ21lbnRTaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgY29uc29sZS5sb2coJ0ZyYWdtZW50IHNoYWRlciBmYWlsZWQgdG8gY29tcGlsZTogJyArIGdsLmdldFNoYWRlckluZm9Mb2coZnJhZ21lbnRTaGFkZXIpKTtcbiAgICB9XG5cbiAgICB2YXIgcHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcbiAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgdmVydGV4U2hhZGVyKTtcbiAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgZnJhZ21lbnRTaGFkZXIpO1xuICAgIGdsLmxpbmtQcm9ncmFtKHByb2dyYW0pO1xuICAgIGlmICghZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5MSU5LX1NUQVRVUykpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdQcm9ncmFtIGZhaWxlZCB0byBjb21waWxlOiAnICsgZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cocHJvZ3JhbSkpO1xuICAgIH1cblxuICAgIGdsLnVzZVByb2dyYW0ocHJvZ3JhbSk7XG5cbiAgICB2YXIgWVVWMlJHQlJlZiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCAnWVVWMlJHQicpO1xuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYoWVVWMlJHQlJlZiwgZmFsc2UsIFlVVjJSR0IpO1xuXG4gICAgdGhpcy5zaGFkZXJQcm9ncmFtID0gcHJvZ3JhbTtcbiAgfVxuXG4gIF9pbml0QnVmZmVycyAoKSB7XG4gICAgdmFyIGdsID0gdGhpcy5jb250ZXh0R0w7XG4gICAgdmFyIHByb2dyYW0gPSB0aGlzLnNoYWRlclByb2dyYW07XG5cbiAgICB2YXIgdmVydGV4UG9zQnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHZlcnRleFBvc0J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoWzEsIDEsIC0xLCAxLCAxLCAtMSwgLTEsIC0xXSksIGdsLlNUQVRJQ19EUkFXKTtcblxuICAgIHZhciB2ZXJ0ZXhQb3NSZWYgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCAndmVydGV4UG9zJyk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodmVydGV4UG9zUmVmKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHZlcnRleFBvc1JlZiwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcblxuICAgIHZhciB0ZXh0dXJlUG9zQnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRleHR1cmVQb3NCdWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KFsxLCAwLCAwLCAwLCAxLCAxLCAwLCAxXSksIGdsLlNUQVRJQ19EUkFXKTtcblxuICAgIHZhciB0ZXh0dXJlUG9zUmVmID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgJ3RleHR1cmVQb3MnKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0ZXh0dXJlUG9zUmVmKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRleHR1cmVQb3NSZWYsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG5cbiAgICB0aGlzLnRleHR1cmVQb3NCdWZmZXIgPSB0ZXh0dXJlUG9zQnVmZmVyO1xuXG4gICAgdmFyIHVUZXh0dXJlUG9zQnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHVUZXh0dXJlUG9zQnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShbMSwgMCwgMCwgMCwgMSwgMSwgMCwgMV0pLCBnbC5TVEFUSUNfRFJBVyk7XG5cbiAgICB2YXIgdVRleHR1cmVQb3NSZWYgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCAndVRleHR1cmVQb3MnKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh1VGV4dHVyZVBvc1JlZik7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcih1VGV4dHVyZVBvc1JlZiwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcblxuICAgIHRoaXMudVRleHR1cmVQb3NCdWZmZXIgPSB1VGV4dHVyZVBvc0J1ZmZlcjtcblxuICAgIHZhciB2VGV4dHVyZVBvc0J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2VGV4dHVyZVBvc0J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDAsIDEsIDEsIDAsIDFdKSwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgdmFyIHZUZXh0dXJlUG9zUmVmID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgJ3ZUZXh0dXJlUG9zJyk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodlRleHR1cmVQb3NSZWYpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodlRleHR1cmVQb3NSZWYsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG5cbiAgICB0aGlzLnZUZXh0dXJlUG9zQnVmZmVyID0gdlRleHR1cmVQb3NCdWZmZXI7XG4gIH07XG5cbiAgX2luaXRUZXh0dXJlcyAoKSB7XG4gICAgdmFyIGdsID0gdGhpcy5jb250ZXh0R0w7XG4gICAgdmFyIHByb2dyYW0gPSB0aGlzLnNoYWRlclByb2dyYW07XG4gICAgdmFyIHlUZXh0dXJlUmVmID0gdGhpcy5faW5pdFRleHR1cmUoKTtcbiAgICB2YXIgeVNhbXBsZXJSZWYgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgJ3lTYW1wbGVyJyk7XG4gICAgZ2wudW5pZm9ybTFpKHlTYW1wbGVyUmVmLCAwKTtcbiAgICB0aGlzLnlUZXh0dXJlUmVmID0geVRleHR1cmVSZWY7XG5cbiAgICB2YXIgdVRleHR1cmVSZWYgPSB0aGlzLl9pbml0VGV4dHVyZSgpO1xuICAgIHZhciB1U2FtcGxlclJlZiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCAndVNhbXBsZXInKTtcbiAgICBnbC51bmlmb3JtMWkodVNhbXBsZXJSZWYsIDEpO1xuICAgIHRoaXMudVRleHR1cmVSZWYgPSB1VGV4dHVyZVJlZjtcblxuICAgIHZhciB2VGV4dHVyZVJlZiA9IHRoaXMuX2luaXRUZXh0dXJlKCk7XG4gICAgdmFyIHZTYW1wbGVyUmVmID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sICd2U2FtcGxlcicpO1xuICAgIGdsLnVuaWZvcm0xaSh2U2FtcGxlclJlZiwgMik7XG4gICAgdGhpcy52VGV4dHVyZVJlZiA9IHZUZXh0dXJlUmVmO1xuICB9XG5cbiAgX2luaXRUZXh0dXJlICgpIHtcbiAgICB2YXIgZ2wgPSB0aGlzLmNvbnRleHRHTDtcblxuICAgIHZhciB0ZXh0dXJlUmVmID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmVSZWYpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgbnVsbCk7XG5cbiAgICByZXR1cm4gdGV4dHVyZVJlZjtcbiAgfVxuXG4gIF9kcmF3UGljdHVyZUdMIChkYXRhLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgbGV0IG5XaWR0aCA9IHdpZHRoO1xuICAgIHZhciB5bGVuID0gd2lkdGggKiBoZWlnaHQ7XG4gICAgdmFyIHV2bGVuID0geWxlbiAvIDQ7XG4gICAgaWYgKHRoaXMuY2hyb21hID09PSA0MjIpIHtcbiAgICAgIHV2bGVuID0geWxlbiAvIDJcbiAgICB9IGVsc2UgaWYgKHRoaXMuY2hyb21hID09PSA0NDQpIHtcbiAgICAgIHV2bGVuID0geWxlbjtcbiAgICB9XG4gICAgZGF0YSA9IG5ldyBVaW50OEFycmF5KGRhdGEpO1xuICAgIGxldCByZW5kZXJEYXRhID0ge1xuICAgICAgeURhdGE6IGRhdGEuc3ViYXJyYXkoMCwgeWxlbiksXG4gICAgICB1RGF0YTogZGF0YS5zdWJhcnJheSh5bGVuLCB5bGVuICsgdXZsZW4pLFxuICAgICAgdkRhdGE6IGRhdGEuc3ViYXJyYXkoeWxlbiArIHV2bGVuLCB5bGVuICsgdXZsZW4gKyB1dmxlbilcbiAgICB9XG4gICAgaWYgKHdpZHRoICUgNCA+IDApIHtcbiAgICAgIG5XaWR0aCA9IHdpZHRoICsgNCAtICh3aWR0aCAlIDQpO1xuICAgICAgbGV0IHlBcnJheSA9IG5ldyBVaW50OEFycmF5KG5XaWR0aCAqIGhlaWdodCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlaWdodDsgaSsrKSB7XG4gICAgICAgIHlBcnJheS5zZXQocmVuZGVyRGF0YS55RGF0YS5zdWJhcnJheShpICogd2lkdGgsIChpICsgMSkgKiB3aWR0aCksIGkgKiBuV2lkdGgpO1xuICAgICAgfVxuICAgICAgcmVuZGVyRGF0YS55RGF0YSA9IHlBcnJheTtcbiAgICB9XG5cbiAgICBpZiAoKHdpZHRoIC8gMikgJSA0ID4gMCkge1xuICAgICAgbldpZHRoID0gKHdpZHRoIC8gMikgKyA0IC0gKCh3aWR0aCAvIDIpICUgNCk7XG4gICAgICBsZXQgdUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkobldpZHRoICogaGVpZ2h0IC8gMik7XG4gICAgICBsZXQgdkFycmF5ID0gbmV3IFVpbnQ4QXJyYXkobldpZHRoICogaGVpZ2h0IC8gMik7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlaWdodCAvIDI7IGkrKykge1xuICAgICAgICB1QXJyYXkuc2V0KHJlbmRlckRhdGEudURhdGEuc3ViYXJyYXkoaSAqIHdpZHRoIC8gMiwgKGkgKyAxKSAqIHdpZHRoIC8gMiksIGkgKiBuV2lkdGgpO1xuICAgICAgICB2QXJyYXkuc2V0KHJlbmRlckRhdGEudkRhdGEuc3ViYXJyYXkoaSAqIHdpZHRoIC8gMiwgKGkgKyAxKSAqIHdpZHRoIC8gMiksIGkgKiBuV2lkdGgpO1xuICAgICAgfVxuICAgICAgcmVuZGVyRGF0YS51RGF0YSA9IHVBcnJheTtcbiAgICAgIHJlbmRlckRhdGEudkRhdGEgPSB2QXJyYXk7XG4gICAgfVxuICAgIHRoaXMuX2RyYXdQaWN0dXJlR0w0MjAocmVuZGVyRGF0YSwgd2lkdGgsIGhlaWdodCk7XG4gIH1cblxuICBfZHJhd1BpY3R1cmVHTDQyMCAoZGF0YSwgd2lkdGgsIGhlaWdodCkge1xuICAgIHZhciBnbCA9IHRoaXMuY29udGV4dEdMO1xuICAgIHZhciB0ZXh0dXJlUG9zQnVmZmVyID0gdGhpcy50ZXh0dXJlUG9zQnVmZmVyO1xuICAgIHZhciB1VGV4dHVyZVBvc0J1ZmZlciA9IHRoaXMudVRleHR1cmVQb3NCdWZmZXI7XG4gICAgdmFyIHZUZXh0dXJlUG9zQnVmZmVyID0gdGhpcy52VGV4dHVyZVBvc0J1ZmZlcjtcblxuICAgIHZhciB5VGV4dHVyZVJlZiA9IHRoaXMueVRleHR1cmVSZWY7XG4gICAgdmFyIHVUZXh0dXJlUmVmID0gdGhpcy51VGV4dHVyZVJlZjtcbiAgICB2YXIgdlRleHR1cmVSZWYgPSB0aGlzLnZUZXh0dXJlUmVmO1xuXG4gICAgdmFyIHlEYXRhID0gZGF0YS55RGF0YTtcbiAgICB2YXIgdURhdGEgPSBkYXRhLnVEYXRhO1xuICAgIHZhciB2RGF0YSA9IGRhdGEudkRhdGE7XG5cbiAgICB2YXIgeURhdGFQZXJSb3cgPSB3aWR0aDtcbiAgICB2YXIgeVJvd0NudCA9IGhlaWdodDtcblxuICAgIHZhciB1RGF0YVBlclJvdyA9IHdpZHRoIC8gMjtcbiAgICB2YXIgdVJvd0NudCA9IGhlaWdodCAvIDI7XG5cbiAgICBpZiAodGhpcy5jaHJvbWEgPT09IDQyMiB8fCB0aGlzLmNocm9tYSA9PT0gNDQ0KSB7XG4gICAgICB1Um93Q250ID0gaGVpZ2h0O1xuICAgIH1cbiAgICBpZiAodGhpcy5jaHJvbWEgPT09IDQ0NCkge1xuICAgICAgdURhdGFQZXJSb3cgPSB3aWR0aDtcbiAgICB9XG4gICAgdmFyIHZEYXRhUGVyUm93ID0gdURhdGFQZXJSb3c7XG4gICAgdmFyIHZSb3dDbnQgPSB1Um93Q250O1xuICAgIFxuICAgIGxldCByYXRpb3cgPSB0aGlzLmNhbnZhcy53aWR0aCAvIHRoaXMud2lkdGg7XG4gICAgbGV0IHJhdGlvaCA9IHRoaXMuY2FudmFzLmhlaWdodCAvIHRoaXMuaGVpZ2h0O1xuICAgIGxldCBsZWZ0ID0gMDtcbiAgICBsZXQgdG9wID0gMDtcbiAgICBsZXQgdyA9IHRoaXMuY2FudmFzLndpZHRoO1xuICAgIGxldCBoID0gdGhpcy5jYW52YXMuaGVpZ2h0O1xuICAgIGlmIChyYXRpb3cgPCByYXRpb2gpIHtcbiAgICAgIGggPSAodGhpcy5oZWlnaHQgKiB0aGlzLmNhbnZhcy53aWR0aCAvIHRoaXMud2lkdGgpO1xuICAgICAgdG9wID0gcGFyc2VJbnQoKHRoaXMuY2FudmFzLmhlaWdodCAtICh0aGlzLmhlaWdodCAqIHRoaXMuY2FudmFzLndpZHRoIC8gdGhpcy53aWR0aCkpIC8gMik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHcgPSAodGhpcy53aWR0aCAqIHRoaXMuY2FudmFzLmhlaWdodCAvIHRoaXMuaGVpZ2h0KTtcbiAgICAgIGxlZnQgPSBwYXJzZUludCgodGhpcy5jYW52YXMud2lkdGggLSAodGhpcy53aWR0aCAqIHRoaXMuY2FudmFzLmhlaWdodCAvIHRoaXMuaGVpZ2h0KSkgLyAyKTtcbiAgICB9XG4gICAgZ2wudmlld3BvcnQobGVmdCwgdG9wLCB3LCBoKTtcblxuICAgIHZhciB0ZXh0dXJlUG9zVmFsdWVzID0gbmV3IEZsb2F0MzJBcnJheShbMSwgMCwgMCwgMCwgMSwgMSwgMCwgMV0pO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0ZXh0dXJlUG9zQnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdGV4dHVyZVBvc1ZhbHVlcywgZ2wuRFlOQU1JQ19EUkFXKTtcblxuICAgIHZhciB1VGV4dHVyZVBvc1ZhbHVlcyA9IG5ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDAsIDEsIDEsIDAsIDFdKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdVRleHR1cmVQb3NCdWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCB1VGV4dHVyZVBvc1ZhbHVlcywgZ2wuRFlOQU1JQ19EUkFXKTtcblxuICAgIHZhciB2VGV4dHVyZVBvc1ZhbHVlcyA9IG5ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDAsIDEsIDEsIDAsIDFdKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdlRleHR1cmVQb3NCdWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCB2VGV4dHVyZVBvc1ZhbHVlcywgZ2wuRFlOQU1JQ19EUkFXKTtcbiAgICBcbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB5VGV4dHVyZVJlZik7XG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5MVU1JTkFOQ0UsIHlEYXRhUGVyUm93LCB5Um93Q250LCAwLCBnbC5MVU1JTkFOQ0UsIGdsLlVOU0lHTkVEX0JZVEUsIHlEYXRhKTtcblxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTEpO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHVUZXh0dXJlUmVmKTtcbiAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLkxVTUlOQU5DRSwgdURhdGFQZXJSb3csIHVSb3dDbnQsIDAsIGdsLkxVTUlOQU5DRSwgZ2wuVU5TSUdORURfQllURSwgdURhdGEpO1xuXG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMik7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdlRleHR1cmVSZWYpO1xuICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuTFVNSU5BTkNFLCB2RGF0YVBlclJvdywgdlJvd0NudCwgMCwgZ2wuTFVNSU5BTkNFLCBnbC5VTlNJR05FRF9CWVRFLCB2RGF0YSk7XG5cbiAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFX1NUUklQLCAwLCA0KTtcbiAgfVxuXG4gIF9kcmF3UGljdHVyZVJHQiAoZGF0YSkge1xuXG4gIH1cblxuICByZW5kZXIgKGRhdGEsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICB2YXIgZ2wgPSB0aGlzLmNvbnRleHRHTDtcbiAgICBpZiAoZ2wpIHtcbiAgICAgIHRoaXMuX2RyYXdQaWN0dXJlR0woZGF0YSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RyYXdQaWN0dXJlUkdCKGRhdGEpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBZVVZDYW52YXM7XG4iLCJjb25zdCBpc09iamVjdEZpbGxlZCA9IChvYmopID0+IHtcbiAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgaWYgKG9ialtrZXldID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZWRpYUluZm8ge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5taW1lVHlwZSA9IG51bGxcbiAgICB0aGlzLmR1cmF0aW9uID0gbnVsbFxuXG4gICAgdGhpcy5oYXNWaWRlbyA9IG51bGxcbiAgICB0aGlzLnZpZGVvID0ge1xuICAgICAgY29kZWM6IG51bGwsXG4gICAgICB3aWR0aDogbnVsbCxcbiAgICAgIGhlaWdodDogbnVsbCxcbiAgICAgIHByb2ZpbGU6IG51bGwsXG4gICAgICBsZXZlbDogbnVsbCxcbiAgICAgIGZyYW1lUmF0ZToge1xuICAgICAgICBmaXhlZDogdHJ1ZSxcbiAgICAgICAgZnBzOiAyNSxcbiAgICAgICAgZnBzX251bTogMjUwMDAsXG4gICAgICAgIGZwc19kZW46IDEwMDBcbiAgICAgIH0sXG4gICAgICBjaHJvbWFGb3JtYXQ6IG51bGwsXG4gICAgICBwYXJSYXRpbzoge1xuICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgaGVpZ2h0OiAxXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5oYXNBdWRpbyA9IG51bGxcblxuICAgIHRoaXMuYXVkaW8gPSB7XG4gICAgICBjb2RlYzogbnVsbCxcbiAgICAgIHNhbXBsZVJhdGU6IG51bGwsXG4gICAgICBzYW1wbGVSYXRlSW5kZXg6IG51bGwsXG4gICAgICBjaGFubmVsQ291bnQ6IG51bGxcbiAgICB9XG4gIH1cblxuICBpc0NvbXBsZXRlICgpIHtcbiAgICByZXR1cm4gTWVkaWFJbmZvLmlzQmFzZUluZm9SZWFkeSh0aGlzKSAmJiBNZWRpYUluZm8uaXNWaWRlb1JlYWR5KHRoaXMpICYmIE1lZGlhSW5mby5pc0F1ZGlvUmVhZHkodGhpcylcbiAgfVxuXG4gIHN0YXRpYyBpc0Jhc2VJbmZvUmVhZHkgKG1lZGlhSW5mbykge1xuICAgIHJldHVybiBpc09iamVjdEZpbGxlZChtZWRpYUluZm8pXG4gIH1cblxuICBzdGF0aWMgaXNWaWRlb1JlYWR5IChtZWRpYUluZm8pIHtcbiAgICBpZiAoIW1lZGlhSW5mby5oYXNWaWRlbykge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4gaXNPYmplY3RGaWxsZWQobWVkaWFJbmZvLnZpZGVvKVxuICB9XG5cbiAgc3RhdGljIGlzQXVkaW9SZWFkeSAobWVkaWFJbmZvKSB7XG4gICAgaWYgKCFtZWRpYUluZm8uaGFzQXVkaW8pIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgcmV0dXJuIGlzT2JqZWN0RmlsbGVkKG1lZGlhSW5mby52aWRlbylcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVkaWFTYW1wbGUge1xuICBjb25zdHJ1Y3RvciAoaW5mbykge1xuICAgIGxldCBfZGVmYXVsdCA9IE1lZGlhU2FtcGxlLmdldERlZmF1bHRJbmYoKVxuXG4gICAgaWYgKCFpbmZvIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbmZvKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgIHJldHVybiBfZGVmYXVsdFxuICAgIH1cbiAgICBsZXQgc2FtcGxlID0gT2JqZWN0LmFzc2lnbih7fSwgX2RlZmF1bHQsIGluZm8pXG5cbiAgICBPYmplY3QuZW50cmllcyhzYW1wbGUpLmZvckVhY2goKFtrLCB2XSkgPT4ge1xuICAgICAgdGhpc1trXSA9IHZcbiAgICB9KVxuICB9XG5cbiAgc3RhdGljIGdldERlZmF1bHRJbmYgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkdHM6IG51bGwsXG4gICAgICBwdHM6IG51bGwsXG4gICAgICBkdXJhdGlvbjogbnVsbCxcbiAgICAgIHBvc2l0aW9uOiBudWxsLFxuICAgICAgaXNSQVA6IGZhbHNlLCAvLyBpcyBSYW5kb20gYWNjZXNzIHBvaW50XG4gICAgICBvcmlnaW5EdHM6IG51bGxcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lZGlhU2VnbWVudExpc3Qge1xuXG4gICAgY29uc3RydWN0b3IgKHR5cGUpIHtcbiAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuX2xpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5fbGFzdEFwcGVuZExvY2F0aW9uID0gLTE7IC8vIGNhY2hlZCBsYXN0IGluc2VydCBsb2NhdGlvblxuICAgIH1cblxuICAgIGdldCB0eXBlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gICAgfVxuXG4gICAgZ2V0IGxlbmd0aCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0Lmxlbmd0aDtcbiAgICB9XG5cbiAgICBpc0VtcHR5ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3QubGVuZ3RoID09PSAwO1xuICAgIH1cblxuICAgIGNsZWFyICgpIHtcbiAgICAgICAgdGhpcy5fbGlzdCA9IFtdO1xuICAgICAgICB0aGlzLl9sYXN0QXBwZW5kTG9jYXRpb24gPSAtMTtcbiAgICB9XG5cbiAgICBfc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUgKGJlZ2luRHRzKSB7XG4gICAgICAgIGxldCBsaXN0ID0gdGhpcy5fbGlzdDtcbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gLTI7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxhc3QgPSBsaXN0Lmxlbmd0aCAtIDE7XG4gICAgICAgIGxldCBtaWQgPSAwO1xuICAgICAgICBsZXQgbGJvdW5kID0gMDtcbiAgICAgICAgbGV0IHVib3VuZCA9IGxhc3Q7XG5cbiAgICAgICAgbGV0IGlkeCA9IDA7XG5cbiAgICAgICAgaWYgKGJlZ2luRHRzIDwgbGlzdFswXS5vcmlnaW5EdHMpIHtcbiAgICAgICAgICAgIGlkeCA9IC0xO1xuICAgICAgICAgICAgcmV0dXJuIGlkeDtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChsYm91bmQgPD0gdWJvdW5kKSB7XG4gICAgICAgICAgICBtaWQgPSBsYm91bmQgKyBNYXRoLmZsb29yKCh1Ym91bmQgLSBsYm91bmQpIC8gMik7XG4gICAgICAgICAgICBpZiAobWlkID09PSBsYXN0IHx8IChiZWdpbkR0cyA+IGxpc3RbbWlkXS5sYXN0U2FtcGxlLm9yaWdpbkR0c1xuICAgICAgICAgICAgICAgICAgICAmJiAoYmVnaW5EdHMgPCBsaXN0W21pZCArIDFdLm9yaWdpbkR0cykpKSB7XG4gICAgICAgICAgICAgICAgaWR4ID0gbWlkO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsaXN0W21pZF0ub3JpZ2luRHRzIDwgYmVnaW5EdHMpIHtcbiAgICAgICAgICAgICAgICBsYm91bmQgPSBtaWQgKyAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB1Ym91bmQgPSBtaWQgLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpZHg7XG4gICAgfVxuXG4gICAgX3NlYXJjaE5lYXJlc3RTZWdtZW50QWZ0ZXIgKGJlZ2luRHRzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWFyY2hOZWFyZXN0U2VnbWVudEJlZm9yZShiZWdpbkR0cykgKyAxO1xuICAgIH1cblxuICAgIGFwcGVuZCAoc2VnbWVudCkge1xuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuX2xpc3Q7XG4gICAgICAgIGxldCBsYXN0QXBwZW5kSWR4ID0gdGhpcy5fbGFzdEFwcGVuZExvY2F0aW9uO1xuICAgICAgICBsZXQgaW5zZXJ0SWR4ID0gMDtcblxuICAgICAgICBpZiAobGFzdEFwcGVuZElkeCAhPT0gLTEgJiYgbGFzdEFwcGVuZElkeCA8IGxpc3QubGVuZ3RoXG4gICAgICAgICAgICAmJiBzZWdtZW50Lm9yaWdpblN0YXJ0RHRzID49IGxpc3RbbGFzdEFwcGVuZElkeF0ubGFzdFNhbXBsZS5vcmlnaW5EdHNcbiAgICAgICAgICAgICYmICgobGFzdEFwcGVuZElkeCA9PT0gbGlzdC5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICAgIHx8IChsYXN0QXBwZW5kSWR4IDwgbGlzdC5sZW5ndGggLSAxXG4gICAgICAgICAgICAgICAgICAgICYmIHNlZ21lbnQub3JpZ2luU3RhcnREdHMgPCBsaXN0W2xhc3RBcHBlbmRJZHggKyAxXS5vcmlnaW5TdGFydER0cykpKSB7XG4gICAgICAgICAgICBpbnNlcnRJZHggPSBsYXN0QXBwZW5kSWR4ICsgMTsgLy8gdXNlIGNhY2hlZCBsb2NhdGlvbiBpZHhcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChsaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBpbnNlcnRJZHggPSB0aGlzLl9zZWFyY2hOZWFyZXN0U2VnbWVudEJlZm9yZShzZWdtZW50Lm9yaWdpblN0YXJ0RHRzKSArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9sYXN0QXBwZW5kTG9jYXRpb24gPSBpbnNlcnRJZHg7XG4gICAgICAgIHRoaXMuX2xpc3Quc3BsaWNlKGluc2VydElkeCwgMCwgc2VnbWVudCk7XG4gICAgfVxuXG4gICAgZ2V0TGFzdFNlZ21lbnRCZWZvcmUgKGJlZ2luRHRzKSB7XG4gICAgICAgIGxldCBpZHggPSB0aGlzLl9zZWFyY2hOZWFyZXN0U2VnbWVudEJlZm9yZShiZWdpbkR0cyk7XG4gICAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RbaWR4XTtcbiAgICAgICAgfSBlbHNlIHsgLy8gLTFcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TGFzdFNhbXBsZUJlZm9yZSAoYmVnaW5EdHMpIHtcbiAgICAgICAgbGV0IHNlZ21lbnQgPSB0aGlzLmdldExhc3RTZWdtZW50QmVmb3JlKGJlZ2luRHRzKTtcbiAgICAgICAgaWYgKHNlZ21lbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWdtZW50Lmxhc3RTYW1wbGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldExhc3RSQVBCZWZvcmUgKGJlZ2luRHRzKSB7XG4gICAgICAgIGxldCBzZWdtZW50SWR4ID0gdGhpcy5fc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUoYmVnaW5EdHMpO1xuICAgICAgICBsZXQgcmFuZG9tQWNjZXNzUG9pbnRzID0gdGhpcy5fbGlzdFtzZWdtZW50SWR4XS5yYW5kb21BY2Nlc3NQb2ludHM7XG4gICAgICAgIHdoaWxlIChyYW5kb21BY2Nlc3NQb2ludHMubGVuZ3RoID09PSAwICYmIHNlZ21lbnRJZHggPiAwKSB7XG4gICAgICAgICAgICBzZWdtZW50SWR4LS07XG4gICAgICAgICAgICByYW5kb21BY2Nlc3NQb2ludHMgPSB0aGlzLl9saXN0W3NlZ21lbnRJZHhdLnJhbmRvbUFjY2Vzc1BvaW50cztcbiAgICAgICAgfVxuICAgICAgICBpZiAocmFuZG9tQWNjZXNzUG9pbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiByYW5kb21BY2Nlc3NQb2ludHNbcmFuZG9tQWNjZXNzUG9pbnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNZWRpYVNlZ21lbnQge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgdGhpcy5zdGFydER0cyA9IC0xO1xuICAgICAgICB0aGlzLmVuZER0cyA9IC0xO1xuICAgICAgICB0aGlzLnN0YXJ0UHRzID0gLTE7XG4gICAgICAgIHRoaXMuZW5kUHRzID0gLTE7XG4gICAgICAgIHRoaXMub3JpZ2luU3RhcnREdHMgPSAtMTtcbiAgICAgICAgdGhpcy5vcmlnaW5FbmREdHMgPSAtMTtcbiAgICAgICAgdGhpcy5yYW5kb21BY2Nlc3NQb2ludHMgPSBbXTtcbiAgICAgICAgdGhpcy5maXJzdFNhbXBsZSA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdFNhbXBsZSA9IG51bGw7XG4gICAgfVxuXG4gICAgYWRkUkFQIChzYW1wbGUpIHtcbiAgICAgICAgc2FtcGxlLmlzUkFQID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yYW5kb21BY2Nlc3NQb2ludHMucHVzaChzYW1wbGUpO1xuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgQXVkaW9UcmFja01ldGEge1xuICBjb25zdHJ1Y3RvciAobWV0YSkge1xuICAgIGNvbnN0IF9kZWZhdWx0ID0ge1xuICAgICAgc2FtcGxlUmF0ZTogNDgwMDAsXG4gICAgICBjaGFubmVsQ291bnQ6IDIsXG4gICAgICBjb2RlYzogJ21wNGEuNDAuMicsXG4gICAgICBjb25maWc6IFs0MSwgNDAxLCAxMzYsIDBdLFxuICAgICAgZHVyYXRpb246IDAsXG4gICAgICBpZDogMixcbiAgICAgIHJlZlNhbXBsZUR1cmF0aW9uOiAyMSxcbiAgICAgIHNhbXBsZVJhdGVJbmRleDogMyxcbiAgICAgIHRpbWVzY2FsZTogMTAwMCxcbiAgICAgIHR5cGU6ICdhdWRpbydcbiAgICB9XG4gICAgaWYgKG1ldGEpIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBfZGVmYXVsdCwgbWV0YSlcbiAgICB9XG4gICAgcmV0dXJuIF9kZWZhdWx0XG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmluaXQgPSBudWxsXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFZpZGVvVHJhY2tNZXRhIHtcbiAgY29uc3RydWN0b3IgKG1ldGEpIHtcbiAgICBjb25zdCBfZGVmYXVsdCA9IHtcbiAgICAgIGF2Y2M6IG51bGwsXG4gICAgICBzcHM6IG5ldyBVaW50OEFycmF5KDApLFxuICAgICAgcHBzOiBuZXcgVWludDhBcnJheSgwKSxcbiAgICAgIGNocm9tYUZvcm1hdDogNDIwLFxuICAgICAgY29kZWM6ICdhdmMxLjY0MDAyMCcsXG4gICAgICBjb2RlY0hlaWdodDogNzIwLFxuICAgICAgY29kZWNXaWR0aDogMTI4MCxcbiAgICAgIGR1cmF0aW9uOiAwLFxuICAgICAgZnJhbWVSYXRlOiB7XG4gICAgICAgIGZpeGVkOiB0cnVlLFxuICAgICAgICBmcHM6IDI1LFxuICAgICAgICBmcHNfbnVtOiAyNTAwMCxcbiAgICAgICAgZnBzX2RlbjogMTAwMFxuICAgICAgfSxcbiAgICAgIGlkOiAxLFxuICAgICAgbGV2ZWw6ICczLjInLFxuICAgICAgcHJlc2VudEhlaWdodDogNzIwLFxuICAgICAgcHJlc2VudFdpZHRoOiAxMjgwLFxuICAgICAgcHJvZmlsZTogJ0hpZ2gnLFxuICAgICAgcmVmU2FtcGxlRHVyYXRpb246IDQwLFxuICAgICAgcGFyUmF0aW86IHtcbiAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICB3aWR0aDogMVxuICAgICAgfSxcbiAgICAgIHRpbWVzY2FsZTogMTAwMCxcbiAgICAgIHR5cGU6ICd2aWRlbydcbiAgICB9XG5cbiAgICBpZiAobWV0YSkge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIF9kZWZhdWx0LCBtZXRhKVxuICAgIH1cbiAgICByZXR1cm4gX2RlZmF1bHRcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuaW5pdCA9IG51bGxcbiAgICB0aGlzLnNwcyA9IG51bGxcbiAgICB0aGlzLnBwcyA9IG51bGxcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEF1ZGlvVHJhY2tTYW1wbGUge1xuICBjb25zdHJ1Y3RvciAoaW5mbykge1xuICAgIGxldCBfZGVmYXVsdCA9IEF1ZGlvVHJhY2tTYW1wbGUuZ2V0RGVmYXVsdCgpXG4gICAgaWYgKCFpbmZvKSB7XG4gICAgICByZXR1cm4gX2RlZmF1bHRcbiAgICB9XG4gICAgbGV0IHNhbXBsZSA9IE9iamVjdC5hc3NpZ24oe30sIF9kZWZhdWx0LCBpbmZvKVxuXG4gICAgcmV0dXJuIHNhbXBsZVxuICB9XG5cbiAgc3RhdGljIGdldERlZmF1bHQgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkdHM6IG51bGwsXG4gICAgICBwdHM6IG51bGwsXG4gICAgICBkYXRhOiBuZXcgVWludDhBcnJheSgpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWaWRlb1RyYWNrU2FtcGxlIHtcbiAgY29uc3RydWN0b3IgKGluZm8pIHtcbiAgICBsZXQgX2RlZmF1bHQgPSBWaWRlb1RyYWNrU2FtcGxlLmdldERlZmF1bHQoKVxuXG4gICAgaWYgKCFpbmZvKSB7XG4gICAgICByZXR1cm4gX2RlZmF1bHRcbiAgICB9XG4gICAgbGV0IHNhbXBsZSA9IE9iamVjdC5hc3NpZ24oe30sIF9kZWZhdWx0LCBpbmZvKVxuXG4gICAgcmV0dXJuIHNhbXBsZVxuICB9XG5cbiAgc3RhdGljIGdldERlZmF1bHQgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkdHM6IG51bGwsXG4gICAgICBwdHM6IG51bGwsXG4gICAgICBpc0tleWZyYW1lOiBmYWxzZSwgLy8gaXMgUmFuZG9tIGFjY2VzcyBwb2ludFxuICAgICAgb3JpZ2luRHRzOiBudWxsLFxuICAgICAgZGF0YTogbmV3IFVpbnQ4QXJyYXkoKVxuICAgIH1cbiAgfVxufVxuIiwiY2xhc3MgTVNFIHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZ3MpIHtcbiAgICB0aGlzLmNvbmZpZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWdzKTtcbiAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMuY29uZmlncy5jb250YWluZXI7XG4gICAgdGhpcy5tZWRpYVNvdXJjZSA9IG51bGw7XG4gICAgdGhpcy5zb3VyY2VCdWZmZXJzID0ge307XG4gICAgdGhpcy5wcmVsb2FkVGltZSA9IHRoaXMuY29uZmlncy5wcmVsb2FkVGltZSB8fCAxO1xuICAgIHRoaXMub25Tb3VyY2VPcGVuID0gdGhpcy5vblNvdXJjZU9wZW4uYmluZCh0aGlzKVxuICAgIHRoaXMub25UaW1lVXBkYXRlID0gdGhpcy5vblRpbWVVcGRhdGUuYmluZCh0aGlzKVxuICAgIHRoaXMub25VcGRhdGVFbmQgPSB0aGlzLm9uVXBkYXRlRW5kLmJpbmQodGhpcylcbiAgICB0aGlzLm9uV2FpdGluZyA9IHRoaXMub25XYWl0aW5nLmJpbmQodGhpcylcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIHRoaXMubWVkaWFTb3VyY2UgPSBuZXcgc2VsZi5NZWRpYVNvdXJjZSgpO1xuICAgIHRoaXMubWVkaWFTb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcignc291cmNlb3BlbicsIHRoaXMub25Tb3VyY2VPcGVuKTtcbiAgICB0aGlzLmNvbnRhaW5lci5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHRoaXMubWVkaWFTb3VyY2UpO1xuICAgIHRoaXMudXJsID0gdGhpcy5jb250YWluZXIuc3JjO1xuICAgIHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RpbWV1cGRhdGUnLCB0aGlzLm9uVGltZVVwZGF0ZSk7XG4gICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignd2FpdGluZycsIHRoaXMub25XYWl0aW5nKTtcbiAgfVxuXG4gIG9uVGltZVVwZGF0ZSAoKSB7XG4gICAgdGhpcy5lbWl0KCdUSU1FX1VQREFURScsIHRoaXMuY29udGFpbmVyKTtcbiAgfVxuXG4gIG9uV2FpdGluZyAoKSB7XG4gICAgdGhpcy5lbWl0KCdXQUlUSU5HJywgdGhpcy5jb250YWluZXIpO1xuICB9XG5cbiAgb25Tb3VyY2VPcGVuICgpIHtcbiAgICB0aGlzLmFkZFNvdXJjZUJ1ZmZlcnMoKTtcbiAgfVxuXG4gIG9uVXBkYXRlRW5kICgpIHtcbiAgICB0aGlzLmVtaXQoJ1NPVVJDRV9VUERBVEVfRU5EJyk7XG4gICAgdGhpcy5kb0FwcGVuZCgpXG4gIH1cbiAgYWRkU291cmNlQnVmZmVycyAoKSB7XG4gICAgaWYgKHRoaXMubWVkaWFTb3VyY2UucmVhZHlTdGF0ZSAhPT0gJ29wZW4nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBzb3VyY2VzID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnUFJFX1NPVVJDRV9CVUZGRVInKTtcbiAgICBsZXQgdHJhY2tzID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJyk7XG4gICAgbGV0IHRyYWNrO1xuXG4gICAgc291cmNlcyA9IHNvdXJjZXMuc291cmNlcztcbiAgICBsZXQgYWRkID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDAsIGsgPSBPYmplY3Qua2V5cyhzb3VyY2VzKS5sZW5ndGg7IGkgPCBrOyBpKyspIHtcbiAgICAgIGxldCB0eXBlID0gT2JqZWN0LmtleXMoc291cmNlcylbaV07XG4gICAgICBpZiAodHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgICB0cmFjayA9IHRyYWNrcy5hdWRpb1RyYWNrO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAndmlkZW8nKSB7XG4gICAgICAgIHRyYWNrID0gdHJhY2tzLnZpZGVvVHJhY2s7XG4gICAgICAgIC8vIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0cmFjaykge1xuICAgICAgICBsZXQgZHVyID0gdHlwZSA9PT0gJ2F1ZGlvJyA/IDIxIDogNDA7XG4gICAgICAgIGlmICh0cmFjay5tZXRhICYmIHRyYWNrLm1ldGEucmVmU2FtcGxlRHVyYXRpb24pIGR1ciA9IHRyYWNrLm1ldGEucmVmU2FtcGxlRHVyYXRpb247XG4gICAgICAgIGlmIChzb3VyY2VzW3R5cGVdLmRhdGEubGVuZ3RoID49ICh0aGlzLnByZWxvYWRUaW1lIC8gZHVyKSkge1xuICAgICAgICAgIGFkZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYWRkKSB7XG4gICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAwLCBrID0gT2JqZWN0LmtleXMoc291cmNlcykubGVuZ3RoOyBpIDwgazsgaSsrKSB7XG4gICAgICAgIGxldCB0eXBlID0gT2JqZWN0LmtleXMoc291cmNlcylbaV07XG4gICAgICAgIGxldCBzb3VyY2UgPSBzb3VyY2VzW3R5cGVdXG4gICAgICAgIGxldCBtaW1lID0gKHR5cGUgPT09ICd2aWRlbycpID8gJ3ZpZGVvL21wNDtjb2RlY3M9JyArIHNvdXJjZS5taW1ldHlwZSA6ICdhdWRpby9tcDQ7Y29kZWNzPScgKyBzb3VyY2UubWltZXR5cGVcbiAgICAgICAgbGV0IHNvdXJjZUJ1ZmZlciA9IHRoaXMubWVkaWFTb3VyY2UuYWRkU291cmNlQnVmZmVyKG1pbWUpO1xuICAgICAgICB0aGlzLnNvdXJjZUJ1ZmZlcnNbdHlwZV0gPSBzb3VyY2VCdWZmZXI7XG4gICAgICAgIHNvdXJjZUJ1ZmZlci5hZGRFdmVudExpc3RlbmVyKCd1cGRhdGVlbmQnLCB0aGlzLm9uVXBkYXRlRW5kKTtcbiAgICAgICAgdGhpcy5kb0FwcGVuZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRvQXBwZW5kICgpIHtcbiAgICBsZXQgc291cmNlcyA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1BSRV9TT1VSQ0VfQlVGRkVSJyk7XG4gICAgaWYgKHNvdXJjZXMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKS5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdHlwZSA9IE9iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycylbaV1cbiAgICAgICAgbGV0IHNvdXJjZUJ1ZmZlciA9IHRoaXMuc291cmNlQnVmZmVyc1t0eXBlXTtcbiAgICAgICAgaWYgKCFzb3VyY2VCdWZmZXIudXBkYXRpbmcpIHtcbiAgICAgICAgICBsZXQgc291cmNlID0gc291cmNlcy5zb3VyY2VzW3R5cGVdO1xuICAgICAgICAgIGlmIChzb3VyY2UgJiYgIXNvdXJjZS5pbml0ZWQpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdhcHBlbmQgaW5pdGlhbCBzZWdtZW50JylcbiAgICAgICAgICAgIHNvdXJjZUJ1ZmZlci5hcHBlbmRCdWZmZXIoc291cmNlLmluaXQuYnVmZmVyLmJ1ZmZlcik7XG4gICAgICAgICAgICBzb3VyY2UuaW5pdGVkID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNvdXJjZSkge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBzb3VyY2UuZGF0YS5zaGlmdCgpXG4gICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICBzb3VyY2VCdWZmZXIuYXBwZW5kQnVmZmVyKGRhdGEuYnVmZmVyLmJ1ZmZlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZW5kT2ZTdHJlYW0gKCkge1xuICAgIGNvbnN0IHsgcmVhZHlTdGF0ZSwgYWN0aXZlU291cmNlQnVmZmVycyB9ID0gdGhpcy5tZWRpYVNvdXJjZTtcbiAgICBpZiAocmVhZHlTdGF0ZSA9PT0gJ29wZW4nICYmIGFjdGl2ZVNvdXJjZUJ1ZmZlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLm1lZGlhU291cmNlLmVuZE9mU3RyZWFtKClcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gbG9nXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlIChlbmQsIHN0YXJ0ID0gMCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKS5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGJ1ZmZlciA9IHRoaXMuc291cmNlQnVmZmVyc1tPYmplY3Qua2V5cyh0aGlzLnNvdXJjZUJ1ZmZlcnMpW2ldXTtcbiAgICAgIGlmICghYnVmZmVyLnVwZGF0aW5nKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHN0YXJ0LCBlbmQpXG4gICAgICAgIGJ1ZmZlci5yZW1vdmUoc3RhcnQsIGVuZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJlbW92ZUJ1ZmZlcnMgKCkge1xuICAgIGNvbnN0IHRhc2tMaXN0ID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE9iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycykubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBidWZmZXIgPSB0aGlzLnNvdXJjZUJ1ZmZlcnNbT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKVtpXV07XG4gICAgICBidWZmZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndXBkYXRlZW5kJywgdGhpcy5vblVwZGF0ZUVuZCk7XG5cbiAgICAgIGxldCB0YXNrO1xuICAgICAgaWYgKGJ1ZmZlci51cGRhdGluZykge1xuICAgICAgICB0YXNrID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICBjb25zdCBkb0NsZWFuQnVmZmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IHJldHJ5VGltZSA9IDNcblxuICAgICAgICAgICAgY29uc3QgY2xlYW4gPSAoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghYnVmZmVyLnVwZGF0aW5nKSB7XG4gICAgICAgICAgICAgICAgTVNFLmNsZWFyQnVmZmVyKGJ1ZmZlcilcbiAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXRyeVRpbWUgPiAwKXtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNsZWFuLCAyMDApXG4gICAgICAgICAgICAgICAgcmV0cnlUaW1lLS1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGNsZWFuLCAyMDApXG4gICAgICAgICAgICBidWZmZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndXBkYXRlZW5kJywgZG9DbGVhbkJ1ZmZlcilcbiAgICAgICAgICB9XG4gICAgICAgICAgYnVmZmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3VwZGF0ZWVuZCcsIGRvQ2xlYW5CdWZmZXIpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBNU0UuY2xlYXJCdWZmZXIoYnVmZmVyKVxuICAgICAgICB0YXNrID0gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgIH1cblxuICAgICAgdGFza0xpc3QucHVzaCh0YXNrKVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLmFsbCh0YXNrTGlzdClcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHJldHVybiB0aGlzLnJlbW92ZUJ1ZmZlcnMoKS50aGVuKCgpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKS5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgYnVmZmVyID0gdGhpcy5zb3VyY2VCdWZmZXJzW09iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycylbaV1dO1xuICAgICAgICB0aGlzLm1lZGlhU291cmNlLnJlbW92ZVNvdXJjZUJ1ZmZlcihidWZmZXIpO1xuICAgICAgICBkZWxldGUgdGhpcy5zb3VyY2VCdWZmZXJzW09iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycylbaV1dO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgdGhpcy5vblRpbWVVcGRhdGUpO1xuICAgICAgdGhpcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2FpdGluZycsIHRoaXMub25XYWl0aW5nKTtcbiAgICAgIHRoaXMubWVkaWFTb3VyY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcignc291cmNlb3BlbicsIHRoaXMub25Tb3VyY2VPcGVuKTtcblxuICAgICAgdGhpcy5lbmRPZlN0cmVhbSgpXG4gICAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTCh0aGlzLnVybCk7XG5cbiAgICAgIHRoaXMudXJsID0gbnVsbFxuICAgICAgdGhpcy5jb25maWdzID0ge307XG4gICAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gICAgICB0aGlzLm1lZGlhU291cmNlID0gbnVsbDtcbiAgICAgIHRoaXMuc291cmNlQnVmZmVycyA9IHt9O1xuICAgICAgdGhpcy5wcmVsb2FkVGltZSA9IDE7XG4gICAgfSlcbiAgfVxuXG4gIHN0YXRpYyBjbGVhckJ1ZmZlciAoYnVmZmVyKSB7XG4gICAgY29uc3QgYnVmZmVyZWQgPSBidWZmZXIuYnVmZmVyZWQ7XG4gICAgbGV0IGJFbmQgPSAwLjFcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYnVmZmVyZWQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGJFbmQgPSBidWZmZXJlZC5lbmQoaSlcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGJ1ZmZlci5yZW1vdmUoMCwgYkVuZClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBETyBOT1RISU5HXG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBNU0U7XG4iLCJpbXBvcnQgQ29uY2F0IGZyb20gJ2NvbmNhdC10eXBlZC1hcnJheSdcblxuY2xhc3MgQnVmZmVyIHtcbiAgY29uc3RydWN0b3IgKGJ1ZmZlcikge1xuICAgIHRoaXMuYnVmZmVyID0gYnVmZmVyIHx8IG5ldyBVaW50OEFycmF5KDApXG4gIH1cblxuICB3cml0ZSAoLi4uYnVmZmVyKSB7XG4gICAgYnVmZmVyLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICB0aGlzLmJ1ZmZlciA9IENvbmNhdChVaW50OEFycmF5LCB0aGlzLmJ1ZmZlciwgaXRlbSlcbiAgICB9KVxuICB9XG5cbiAgc3RhdGljIHdyaXRlVWludDMyICh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgVWludDhBcnJheShbXG4gICAgICB2YWx1ZSA+PiAyNCxcbiAgICAgICh2YWx1ZSA+PiAxNikgJiAweGZmLFxuICAgICAgKHZhbHVlID4+IDgpICYgMHhmZixcbiAgICAgIHZhbHVlICYgMHhmZlxuICAgIF0pXG4gIH1cblxuICBzdGF0aWMgcmVhZEFzSW50IChhcnIpIHtcbiAgICBsZXQgdGVtcCA9ICcnXG5cbiAgICBmdW5jdGlvbiBwYWRTdGFydDRIZXggKGhleE51bSkge1xuICAgICAgbGV0IGhleFN0ciA9IGhleE51bS50b1N0cmluZygxNilcbiAgICAgIHJldHVybiBoZXhTdHIucGFkU3RhcnQoMiwgJzAnKVxuICAgIH1cblxuICAgIGFyci5mb3JFYWNoKG51bSA9PiB7XG4gICAgICB0ZW1wICs9IHBhZFN0YXJ0NEhleChudW0pXG4gICAgfSlcbiAgICByZXR1cm4gcGFyc2VJbnQodGVtcCwgMTYpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQnVmZmVyXG4iLCJjbGFzcyBTdHJlYW0ge1xuICBjb25zdHJ1Y3RvciAoYnVmZmVyKSB7XG4gICAgaWYgKGJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICB0aGlzLmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgIHRoaXMuZGF0YXZpZXcgPSBuZXcgRGF0YVZpZXcoYnVmZmVyKTtcbiAgICAgIHRoaXMuZGF0YXZpZXcucG9zaXRpb24gPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RhdGEgaXMgaW52YWxpZCcpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBsZW5ndGggKCkge1xuICAgIHJldHVybiB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoO1xuICB9XG5cbiAgc2V0IHBvc2l0aW9uICh2YWx1ZSkge1xuICAgIHRoaXMuZGF0YXZpZXcucG9zaXRpb24gPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBwb3NpdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YXZpZXcucG9zaXRpb247XG4gIH1cblxuICBiYWNrIChjb3VudCkge1xuICAgIHRoaXMucG9zaXRpb24gLT0gY291bnQ7XG4gIH1cblxuICBza2lwIChjb3VudCkge1xuICAgIGxldCBsb29wID0gTWF0aC5mbG9vcihjb3VudCAvIDQpO1xuICAgIGxldCBsYXN0ID0gY291bnQgJSA0O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbG9vcDsgaSsrKSB7XG4gICAgICBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgNCk7XG4gICAgfVxuICAgIGlmIChsYXN0ID4gMCkge1xuICAgICAgU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIGxhc3QpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBbcmVhZEJ5dGUg5LuORGF0YVZpZXfkuK3or7vlj5bmlbDmja5dXG4gICAqIEBwYXJhbSAge0RhdGFWaWV3fSBidWZmZXIgW0RhdGFWaWV35a6e5L6LXVxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHNpemUgICBb6K+75Y+W5a2X6IqC5pWwXVxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9ICAgICAgICBb5pW05pWwXVxuICAgKi9cbiAgc3RhdGljIHJlYWRCeXRlIChidWZmZXIsIHNpemUsIHNpZ24pIHtcbiAgICBsZXQgcmVzO1xuICAgIHN3aXRjaCAoc2l6ZSkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICBpZiAoc2lnbikge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRJbnQ4KGJ1ZmZlci5wb3NpdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzID0gYnVmZmVyLmdldFVpbnQ4KGJ1ZmZlci5wb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGlmIChzaWduKSB7XG4gICAgICAgICAgcmVzID0gYnVmZmVyLmdldEludDE2KGJ1ZmZlci5wb3NpdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzID0gYnVmZmVyLmdldFVpbnQxNihidWZmZXIucG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBpZiAoc2lnbikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IHN1cHBvcnRlZCBmb3IgcmVhZEJ5dGUgMycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRVaW50OChidWZmZXIucG9zaXRpb24pIDw8IDE2O1xuICAgICAgICAgIHJlcyB8PSBidWZmZXIuZ2V0VWludDgoYnVmZmVyLnBvc2l0aW9uICsgMSkgPDwgODtcbiAgICAgICAgICByZXMgfD0gYnVmZmVyLmdldFVpbnQ4KGJ1ZmZlci5wb3NpdGlvbiArIDIpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0OlxuICAgICAgICBpZiAoc2lnbikge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRJbnQzMihidWZmZXIucG9zaXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRVaW50MzIoYnVmZmVyLnBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgODpcbiAgICAgICAgaWYgKHNpZ24pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBzdXBwb3J0ZWQgZm9yIHJlYWRCb2R5IDgnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXMgPSBidWZmZXIuZ2V0VWludDMyKGJ1ZmZlci5wb3NpdGlvbikgPDwgMzI7XG4gICAgICAgICAgcmVzIHw9IGJ1ZmZlci5nZXRVaW50MzIoYnVmZmVyLnBvc2l0aW9uICsgNCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXMgPSAnJztcbiAgICB9XG4gICAgYnVmZmVyLnBvc2l0aW9uICs9IHNpemU7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHJlYWRVaW50OCAoKSB7XG4gICAgcmV0dXJuIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCAxKTtcbiAgfVxuXG4gIHJlYWRVaW50MTYgKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgMik7XG4gIH1cblxuICByZWFkVWludDI0ICgpIHtcbiAgICByZXR1cm4gU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIDMpO1xuICB9XG5cbiAgcmVhZFVpbnQzMiAoKSB7XG4gICAgcmV0dXJuIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCA0KTtcbiAgfVxuXG4gIHJlYWRVaW50NjQgKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgOCk7XG4gIH1cblxuICByZWFkSW50OCAoKSB7XG4gICAgcmV0dXJuIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCAxLCB0cnVlKTtcbiAgfVxuICByZWFkSW50MTYgKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgMiwgdHJ1ZSk7XG4gIH1cblxuICByZWFkSW50MzIgKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgNCwgdHJ1ZSk7XG4gIH1cblxuICB3cml0ZVVpbnQzMiAodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgdmFsdWUgPj4+IDI0ICYgMHhmZixcbiAgICAgIHZhbHVlID4+PiAxNiAmIDB4ZmYsXG4gICAgICB2YWx1ZSA+Pj4gOCAmIDB4ZmYsXG4gICAgICB2YWx1ZSAmIDB4ZmZcbiAgICBdKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdHJlYW07XG4iLCJpbXBvcnQgeyBGZXRjaExvYWRlciB9IGZyb20gJ3hncGxheWVyLWxvYWRlcidcbmltcG9ydCB7IEZsdkRlbXV4ZXIgfSBmcm9tICd4Z3BsYXllci1kZW11eCdcbmltcG9ydCB7IE1wNFJlbXV4ZXIgfSBmcm9tICd4Z3BsYXllci1yZW11eCdcbmltcG9ydCB7IFRyYWNrcywgWGdCdWZmZXIsIFByZVNvdXJjZSB9IGZyb20gJ3hncGxheWVyLWJ1ZmZlcidcbmltcG9ydCB7IEVWRU5UUywgTW9iaWxlVmlkZW8gfSBmcm9tICd4Z3BsYXllci11dGlscydcbmltcG9ydCB7IENvbXBhdGliaWxpdHkgfSBmcm9tICd4Z3BsYXllci1jb2RlYydcbmltcG9ydCBQbGF5ZXIgZnJvbSAneGdwbGF5ZXInXG5cbmNvbnN0IERFTVVYX0VWRU5UUyA9IEVWRU5UUy5ERU1VWF9FVkVOVFM7XG5jb25zdCBMT0FERVJfRVZFTlRTID0gRVZFTlRTLkxPQURFUl9FVkVOVFNcbmNvbnN0IFJFTVVYX0VWRU5UUyA9IEVWRU5UUy5SRU1VWF9FVkVOVFNcblxuY29uc3QgVGFnID0gJ0ZMVkNvbnRyb2xsZXInXG5cbmNsYXNzIExvZ2dlciB7XG4gIHdhcm4gKCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmx2Q29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yIChwbGF5ZXIpIHtcbiAgICB0aGlzLlRBRyA9IFRhZ1xuICAgIHRoaXMuX3BsYXllciA9IHBsYXllclxuXG4gICAgLy8gVE9ETyDkuLTml7bmjILnmoQg6ZyA6KaB5aSE55CG5YiwUGxheWVy5bGCXG4gICAgLy8gdGhpcy52aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21vYmlsZS12aWRlbycpO1xuICAgIHRoaXMuX3BsYXllci52aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21vYmlsZS12aWRlbycpO1xuICAgIHRoaXMudmlkZW8gPSB0aGlzLl9wbGF5ZXIudmlkZW87XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGluaXRTZWdtZW50QXJyaXZlZDogZmFsc2VcbiAgICB9XG4gIH1cblxuICBpbml0ICgpIHtcbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdGRVRDSF9MT0FERVInLCBGZXRjaExvYWRlcilcbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdMT0FERVJfQlVGRkVSJywgWGdCdWZmZXIpXG4gICAgdGhpcy5fY29udGV4dC5yZWdpc3RyeSgnUFJFX1NPVVJDRV9CVUZGRVInLCBQcmVTb3VyY2UpXG5cbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdGTFZfREVNVVhFUicsIEZsdkRlbXV4ZXIpXG5cbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdNUDRfUkVNVVhFUicsIE1wNFJlbXV4ZXIpXG4gICAgdGhpcy5fY29udGV4dC5yZWdpc3RyeSgnVFJBQ0tTJywgVHJhY2tzKVxuXG4gICAgdGhpcy5fY29udGV4dC5yZWdpc3RyeSgnQ09NUEFUSUJJTElUWScsIENvbXBhdGliaWxpdHkpXG5cbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdMT0dHRVInLCBMb2dnZXIpXG5cbiAgICB0aGlzLmluaXRMaXN0ZW5lcnMoKVxuICB9XG5cbiAgaW5pdExpc3RlbmVycyAoKSB7XG4gICAgdGhpcy5vbihMT0FERVJfRVZFTlRTLkxPQURFUl9EQVRBTE9BREVELCB0aGlzLl9oYW5kbGVMb2FkZXJEYXRhTG9hZGVkLmJpbmQodGhpcykpXG4gICAgdGhpcy5vbihMT0FERVJfRVZFTlRTLkxPQURFUl9FUlJPUiwgdGhpcy5faGFuZGxlTmV0d29ya0Vycm9yLmJpbmQodGhpcykpXG5cbiAgICB0aGlzLm9uKERFTVVYX0VWRU5UUy5NRURJQV9JTkZPLCB0aGlzLl9oYW5kbGVNZWRpYUluZm8uYmluZCh0aGlzKSlcbiAgICB0aGlzLm9uKERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsIHRoaXMuX2hhbmRsZU1ldGFkYXRhUGFyc2VkLmJpbmQodGhpcykpXG4gICAgdGhpcy5vbihERU1VWF9FVkVOVFMuREVNVVhfQ09NUExFVEUsIHRoaXMuX2hhbmRsZURlbXV4Q29tcGxldGUuYmluZCh0aGlzKSlcbiAgICB0aGlzLm9uKERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgdGhpcy5faGFuZGxlRGVtdXhFcnJvci5iaW5kKHRoaXMpKVxuXG4gIH1cblxuICBfaGFuZGxlTWVkaWFJbmZvICgpIHtcbiAgICBpZiAoIXRoaXMuX2NvbnRleHQubWVkaWFJbmZvKSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCBuZXcgRXJyb3IoJ2ZhaWxlZCB0byBnZXQgbWVkaWFpbmZvJykpXG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZUxvYWRlckRhdGFMb2FkZWQgKCkge1xuICAgIHRoaXMuZW1pdFRvKCdGTFZfREVNVVhFUicsIERFTVVYX0VWRU5UUy5ERU1VWF9TVEFSVClcbiAgfVxuXG4gIF9oYW5kbGVNZXRhZGF0YVBhcnNlZCAodHlwZSkge1xuICAgIGlmICh0eXBlID09PSAnYXVkaW8nKSB7XG4gICAgICAvLyDlsIbpn7PpopFtZXRh5L+h5oGv5Lqk57uZYXVkaW9Db250ZXh077yM5LiN6LWwcmVtdXjlsIHoo4VcbiAgICAgIGNvbnN0IHsgYXVkaW9UcmFjayB9ID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJylcbiAgICAgIGlmIChhdWRpb1RyYWNrICYmIGF1ZGlvVHJhY2subWV0YSkge1xuICAgICAgICB0aGlzLl9zZXRNZXRhVG9BdWRpbyhhdWRpb1RyYWNrLm1ldGEpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHsgdmlkZW9UcmFjayB9ID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJylcbiAgICAgIGlmICh2aWRlb1RyYWNrICYmIHZpZGVvVHJhY2subWV0YSkge1xuICAgICAgICB0aGlzLl9zZXRNZXRhVG9WaWRlbyh2aWRlb1RyYWNrLm1ldGEpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZURlbXV4Q29tcGxldGUgKCkge1xuICAgIGlmKHRoaXMuX3BsYXllci52aWRlbykge1xuICAgICAgY29uc3QgeyB2aWRlb1RyYWNrLCBhdWRpb1RyYWNrIH0gPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKTtcbiAgICAgIHRoaXMuX3BsYXllci52aWRlby5vbkRlbXV4Q29tcGxldGUodmlkZW9UcmFjaywgYXVkaW9UcmFjayk7XG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZUFwcGVuZEluaXRTZWdtZW50ICgpIHtcbiAgICB0aGlzLnN0YXRlLmluaXRTZWdtZW50QXJyaXZlZCA9IHRydWVcbiAgLy8gIHRoaXMubXNlLmFkZFNvdXJjZUJ1ZmZlcnMoKVxuICB9XG5cblxuICBfaGFuZGxlTmV0d29ya0Vycm9yICgpIHtcbiAgICB0aGlzLl9wbGF5ZXIuZW1pdCgnZXJyb3InLCBuZXcgUGxheWVyLkVycm9ycygnbmV0d29yaycsIHRoaXMuX3BsYXllci5jb25maWcudXJsKSlcbiAgfVxuXG4gIF9oYW5kbGVEZW11eEVycm9yICgpIHtcbiAgICB0aGlzLl9wbGF5ZXIuZW1pdCgnZXJyb3InLCBuZXcgUGxheWVyLkVycm9ycygncGFyc2UnLCB0aGlzLl9wbGF5ZXIuY29uZmlnLnVybCkpXG4gIH1cblxuIFxuICBfc2V0TWV0YVRvQXVkaW8gKGF1ZGlvTWV0YSkge1xuICAgIGlmICh0aGlzLl9wbGF5ZXIudmlkZW8pIHtcbiAgICAgIHRoaXMuX3BsYXllci52aWRlby5zZXRBdWRpb01ldGEoYXVkaW9NZXRhKTtcbiAgICB9XG4gIH1cblxuICBfc2V0TWV0YVRvVmlkZW8gKHZpZGVvTWV0YSkge1xuICAgIGlmICh0aGlzLl9wbGF5ZXIudmlkZW8pIHtcbiAgICAgIHRoaXMuX3BsYXllci52aWRlby5zZXRWaWRlb01ldGEodmlkZW9NZXRhKTtcbiAgICB9XG4gIH1cblxuICBzZWVrICgpIHtcbiAgICBpZiAoIXRoaXMuc3RhdGUuaW5pdFNlZ21lbnRBcnJpdmVkKSB7XG4gICAgICB0aGlzLmxvYWREYXRhKClcbiAgICB9XG4gIH1cblxuICBsb2FkRGF0YSAoKSB7XG4gICAgdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTEFERVJfU1RBUlQsIHRoaXMuX3BsYXllci5jb25maWcudXJsKVxuICB9XG5cbiAgcGF1c2UgKCkge1xuICAgIGNvbnN0IGxvYWRlciA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ0ZFVENIX0xPQURFUicpXG5cbiAgICBpZiAobG9hZGVyKSB7XG4gICAgICBsb2FkZXIuY2FuY2VsKClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog5L+d6K+B5b2T5YmN5pKt5pS+55qE6KeG6aKR5LulZ29w5Li65Y2V5L2NXG4gICAqIEBwYXJhbSB2aWRlb1RyYWNrXG4gICAqL1xuICBzdGF0aWMgcmVzb2x2ZVZpZGVvR09QICh2aWRlb1RyYWNrKSB7XG4gICAgY29uc3QgeyBzYW1wbGVzIH0gPSB2aWRlb1RyYWNrO1xuICAgIGlmICghc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgZmlyc3RJZnJhbWVJZHggPSBudWxsXG4gICAgbGV0IGxhc3RJZnJhbWVJZHggPSBudWxsXG5cbiAgICBpZiAodmlkZW9UcmFjay50ZW1wU2FtcGxlcyAmJiB2aWRlb1RyYWNrLnRlbXBTYW1wbGVzLmxlbmd0aCkge1xuICAgICAgLy8g5bCG57yT5a2Y5bin5pS+572u5Yiw6Zif5YiX55qE5aS06YOoXG4gICAgICBzYW1wbGVzLnVuc2hpZnQuYXBwbHkoc2FtcGxlcywgdmlkZW9UcmFjay50ZW1wU2FtcGxlcyk7XG4gICAgfVxuXG4gICAgLy8g5a+75om+56ys5LiA5LiqSeW4p1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzYW1wbGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50ID0gc2FtcGxlc1tpXTtcbiAgICAgIGlmIChjdXJyZW50LmlzS2V5ZnJhbWUpIHtcbiAgICAgICAgZmlyc3RJZnJhbWVJZHggPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDlr7vmib7mnIDlkI7kuIDkuKpJ5binXG4gICAgZm9yIChsZXQgaSA9IHNhbXBsZXMubGVuZ3RoIC0gMTsgaSA+IDA7IGkrKykge1xuICAgICAgY29uc3QgY3VycmVudCA9IHNhbXBsZXNbaV1cblxuICAgICAgaWYgKGN1cnJlbnQuaXNLZXlmcmFtZSkge1xuICAgICAgICBsYXN0SWZyYW1lSWR4ID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGZpcnN0SWZyYW1lSWR4ICE9PSAwKSB7XG4gICAgICBzYW1wbGVzLnNwbGljZSgwLCBmaXJzdElmcmFtZUlkeCAtIDEpXG4gICAgfVxuXG4gICAgdmlkZW9UcmFjay5zYW1wbGVzID0gc2FtcGxlcy5zbGljZSgwLCBsYXN0SWZyYW1lSWR4KVxuICAgIGNvbnN0IHJlc3QgPSBzYW1wbGVzLnNsaWNlKGxhc3RJZnJhbWVJZHgpXG4gICAgaWYgKHZpZGVvVHJhY2sudGVtcFNhbXBsZXMpIHtcbiAgICAgIHZpZGVvVHJhY2sudGVtcFNhbXBsZXMucHVzaC5hcHBseSh2aWRlb1RyYWNrLnRlbXBTYW1wbGVzLCByZXN0KVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyDlsIbliankuIvnmoTluKfnvJPlrZjvvIznrYnlvoXkuIDkuKrlrozmlbTnmoRnb3BcbiAgICAgIHZpZGVvVHJhY2sudGVtcFNhbXBsZXMgPSByZXN0XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gJ3hncGxheWVyJ1xuaW1wb3J0IHsgQ29udGV4dCwgRVZFTlRTIH0gZnJvbSAneGdwbGF5ZXItdXRpbHMnO1xuaW1wb3J0IEZMViBmcm9tICcuL2Zsdi1saXZlLW1vYmlsZSdcbmNvbnN0IGZsdkFsbG93ZWRFdmVudHMgPSBFVkVOVFMuRmx2QWxsb3dlZEV2ZW50cztcblxuY2xhc3MgRmx2UGxheWVyIGV4dGVuZHMgUGxheWVyIHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZykge1xuICAgIHN1cGVyKGNvbmZpZylcbiAgICB0aGlzLmNvbnRleHQgPSBuZXcgQ29udGV4dChmbHZBbGxvd2VkRXZlbnRzKVxuICAgIHRoaXMuaW5pdEV2ZW50cygpXG4gIH1cblxuICBzdGFydCAoKSB7XG4gICAgdGhpcy5pbml0Rmx2KClcbiAgICB0aGlzLmNvbnRleHQuaW5pdCgpXG4gICAgdGhpcy5mbHYuc2VlaygwKTtcbiAgICBzdXBlci5zdGFydCh0aGlzLmNvbmZpZy51cmwpO1xuICAgIHRoaXMucGxheSgpO1xuICB9XG5cbiAgaW5pdEZsdkV2ZW50cyAoZmx2KSB7XG4gICAgY29uc3QgcGxheWVyID0gdGhpcztcbiAgICBmbHYub25jZShFVkVOVFMuUkVNVVhfRVZFTlRTLklOSVRfU0VHTUVOVCwgKCkgPT4ge1xuICAgICAgUGxheWVyLnV0aWwuYWRkQ2xhc3MocGxheWVyLnJvb3QsICd4Z3BsYXllci1pcy1saXZlJylcbiAgICAgIGlmICghUGxheWVyLnV0aWwuZmluZERvbSh0aGlzLnJvb3QsICd4Zy1saXZlJykpIHtcbiAgICAgICAgY29uc3QgbGl2ZSA9IFBsYXllci51dGlsLmNyZWF0ZURvbSgneGctbGl2ZScsICfmraPlnKjnm7Tmkq0nLCB7fSwgJ3hncGxheWVyLWxpdmUnKVxuICAgICAgICBwbGF5ZXIuY29udHJvbHMuYXBwZW5kQ2hpbGQobGl2ZSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgZmx2Lm9uY2UoRVZFTlRTLkxPQURFUl9FVkVOVFMuTE9BREVSX0NPTVBMRVRFLCAoKSA9PiB7XG4gICAgICAvLyDnm7Tmkq3lrozmiJDvvIzlvoXmkq3mlL7lmajmkq3lroznvJPlrZjlkI7lj5HpgIHlhbPpl63kuovku7ZcbiAgICAgIGlmICghcGxheWVyLnBhdXNlZCkge1xuICAgICAgICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICBjb25zdCBlbmQgPSBwbGF5ZXIuZ2V0QnVmZmVyZWRSYW5nZSgpWzFdXG4gICAgICAgICAgaWYgKE1hdGguYWJzKHBsYXllci5jdXJyZW50VGltZSAtIGVuZCkgPCAwLjUpIHtcbiAgICAgICAgICAgIHBsYXllci5lbWl0KCdlbmRlZCcpXG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDIwMClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgaW5pdEV2ZW50cyAoKSB7XG4gICAgdGhpcy5vbigndGltZXVwZGF0ZScsICgpID0+IHtcbiAgICAgIHRoaXMubG9hZERhdGEoKVxuICAgIH0pXG5cbiAgICB0aGlzLm9uKCdzZWVraW5nJywgKCkgPT4ge1xuICAgICAgY29uc3QgdGltZSA9IHRoaXMuY3VycmVudFRpbWVcbiAgICAgIGNvbnN0IHJhbmdlID0gdGhpcy5nZXRCdWZmZXJlZFJhbmdlKClcbiAgICAgIGlmICh0aW1lID4gcmFuZ2VbMV0gfHwgdGltZSA8IHJhbmdlWzBdKSB7XG4gICAgICAgIHRoaXMuZmx2LnNlZWsodGhpcy5jdXJyZW50VGltZSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgaW5pdEZsdiAoKSB7XG4gICAgY29uc3QgZmx2ID0gdGhpcy5jb250ZXh0LnJlZ2lzdHJ5KCdGTFZfQ09OVFJPTExFUicsIEZMVikodGhpcylcbiAgICB0aGlzLmluaXRGbHZFdmVudHMoZmx2KVxuICAgIHRoaXMuZmx2ID0gZmx2XG4gIH1cblxuICBwbGF5ICgpIHtcbiAgICBjb25zb2xlLmxvZygncGxheScpO1xuICAgIGlmICh0aGlzLl9oYXNTdGFydCkge1xuICAgICAgdGhpcy5fZGVzdHJveSgpXG4gICAgICB0aGlzLmNvbnRleHQgPSBuZXcgQ29udGV4dChmbHZBbGxvd2VkRXZlbnRzKVxuICAgICAgY29uc3QgZmx2ID0gdGhpcy5jb250ZXh0LnJlZ2lzdHJ5KCdGTFZfQ09OVFJPTExFUicsIEZMVikodGhpcylcbiAgICAgIHRoaXMuaW5pdEZsdkV2ZW50cyhmbHYpXG4gICAgICB0aGlzLmZsdiA9IGZsdlxuICAgICAgdGhpcy5jb250ZXh0LmluaXQoKVxuICAgICAgc3VwZXIuc3RhcnQoZmx2Lm1zZS51cmwpXG4gICAgICBzdXBlci5wbGF5KClcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIucGxheSgpXG4gICAgfVxuICB9XG5cbiAgcGF1c2UgKCkge1xuICAgIHN1cGVyLnBhdXNlKClcbiAgICBpZiAodGhpcy5mbHYpIHtcbiAgICAgIHRoaXMuZmx2LnBhdXNlKClcbiAgICB9XG4gIH1cblxuICBsb2FkRGF0YSAodGltZSA9IHRoaXMuY3VycmVudFRpbWUpIHtcbiAgICBpZiAodGhpcy5mbHYpIHtcbiAgICAgIHRoaXMuZmx2LnNlZWsodGltZSlcbiAgICB9XG4gIH1cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5fZGVzdHJveSgpXG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICB9XG5cbiAgX2Rlc3Ryb3kgKCkge1xuICAgIHRoaXMuY29udGV4dC5kZXN0cm95KClcbiAgICB0aGlzLmZsdiA9IG51bGxcbiAgICB0aGlzLmNvbnRleHQgPSBudWxsXG4gIH1cblxuICBnZXQgc3JjICgpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50U3JjXG4gIH1cblxuICBzZXQgc3JjICh1cmwpIHtcbiAgICB0aGlzLnBsYXllci5jb25maWcudXJsID0gdXJsXG4gICAgaWYgKCF0aGlzLnBhdXNlZCkge1xuICAgICAgdGhpcy5wYXVzZSgpXG4gICAgICB0aGlzLm9uY2UoJ3BhdXNlJywgKCkgPT4ge1xuICAgICAgICB0aGlzLnN0YXJ0KHVybClcbiAgICAgIH0pXG4gICAgICB0aGlzLm9uY2UoJ2NhbnBsYXknLCAoKSA9PiB7XG4gICAgICAgIHRoaXMucGxheSgpXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXJ0KHVybClcbiAgICB9XG4gICAgdGhpcy5vbmNlKCdjYW5wbGF5JywgKCkgPT4ge1xuICAgICAgdGhpcy5jdXJyZW50VGltZSA9IDBcbiAgICB9KVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRmx2UGxheWVyXG4iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gd2luZG93W1wiUGxheWVyXCJdOyB9KCkpOyJdLCJzb3VyY2VSb290IjoiIn0=