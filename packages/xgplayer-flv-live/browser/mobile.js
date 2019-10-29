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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9GbHZQbGF5ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy9Vc2Vycy9qaWFuZ3l1cWluZy9EZXNrdG9wL1Byb2plY3RzL3hncGxheWVyL25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWJ1ZmZlci9zcmMvYnVmZmVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1idWZmZXIvc3JjL3ByZXNvdWNlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1idWZmZXIvc3JjL3RyYWNrLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1jb2RlYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItY29kZWMvc3JjL2FhYy9hYWMtaGVscGVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1jb2RlYy9zcmMvY29tcGF0aWJpbGl0eS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItY29kZWMvc3JjL2gyNjQvbmFsdW5pdC9nb2xvbWIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWNvZGVjL3NyYy9oMjY0L25hbHVuaXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWNvZGVjL3NyYy9oMjY0L25hbHVuaXQvc3BzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1kZW11eC9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItZGVtdXgvc3JjL2Zsdi9hbWYtcGFyc2VyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1kZW11eC9zcmMvZmx2L2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1kZW11eC9zcmMvaGxzL2RlbXV4ZXIvbTN1OHBhcnNlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItZGVtdXgvc3JjL2hscy9kZW11eGVyL3RzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1kZW11eC9zcmMvaGxzL3BsYXlsaXN0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1sb2FkZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWxvYWRlci9zcmMvZmV0Y2gtbG9hZGVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1yZW11eC9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItcmVtdXgvc3JjL21wNC9mbXA0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1yZW11eC9zcmMvbXA0L2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvbm9kZV9tb2R1bGVzL2NvbmNhdC10eXBlZC1hcnJheS9saWIvY29uY2F0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9ub2RlX21vZHVsZXMvY29uY2F0LXR5cGVkLWFycmF5L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvbm9kZV9tb2R1bGVzL3dlYndvcmtpZnktd2VicGFjay9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL2NvbnN0YW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9jb25zdGFudHMvd29ya2VyLWNvbW1hbmRzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvY29udGV4dC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL2NyeXB0by9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL2Vudi9pc2xlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvZW52L3NuaWZmZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9lbnYvdXRmOC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vYmlsZS9hdWRpby1jb250ZXh0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9iaWxlL21vYmlsZS12aWRlby5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vYmlsZS9zb3VyY2VidWZmZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2JpbGUvdGlja2VyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9iaWxlL3ZpZGVvLWNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2JpbGUvd29ya2VyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9iaWxlL3l1di1jYW52YXMuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2RlbHMvbWVkaWEtaW5mby5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vZGVscy9tZWRpYS1zYW1wbGUuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2RlbHMvbWVkaWEtc2VnbWVudC1saXN0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9kZWxzL21lZGlhLXNlZ21lbnQuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2RlbHMvdHJhY2stbWV0YS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vZGVscy90cmFjay1zYW1wbGUuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy93cml0ZS9idWZmZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy93cml0ZS9zdHJlYW0uanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL2Zsdi1saXZlLW1vYmlsZS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9zcmMvbW9iaWxlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci9leHRlcm5hbCBcIlBsYXllclwiIl0sIm5hbWVzIjpbIlIiLCJSZWZsZWN0IiwiUmVmbGVjdEFwcGx5IiwiYXBwbHkiLCJ0YXJnZXQiLCJyZWNlaXZlciIsImFyZ3MiLCJGdW5jdGlvbiIsInByb3RvdHlwZSIsImNhbGwiLCJSZWZsZWN0T3duS2V5cyIsIm93bktleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiY29uY2F0IiwiUHJvY2Vzc0VtaXRXYXJuaW5nIiwid2FybmluZyIsImNvbnNvbGUiLCJ3YXJuIiwiTnVtYmVySXNOYU4iLCJOdW1iZXIiLCJpc05hTiIsInZhbHVlIiwiRXZlbnRFbWl0dGVyIiwiaW5pdCIsIm1vZHVsZSIsImV4cG9ydHMiLCJfZXZlbnRzIiwidW5kZWZpbmVkIiwiX2V2ZW50c0NvdW50IiwiX21heExpc3RlbmVycyIsImRlZmF1bHRNYXhMaXN0ZW5lcnMiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJnZXQiLCJzZXQiLCJhcmciLCJSYW5nZUVycm9yIiwiZ2V0UHJvdG90eXBlT2YiLCJjcmVhdGUiLCJzZXRNYXhMaXN0ZW5lcnMiLCJuIiwiJGdldE1heExpc3RlbmVycyIsInRoYXQiLCJnZXRNYXhMaXN0ZW5lcnMiLCJlbWl0IiwidHlwZSIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJwdXNoIiwiZG9FcnJvciIsImV2ZW50cyIsImVycm9yIiwiZXIiLCJFcnJvciIsImVyciIsIm1lc3NhZ2UiLCJjb250ZXh0IiwiaGFuZGxlciIsImxlbiIsImxpc3RlbmVycyIsImFycmF5Q2xvbmUiLCJfYWRkTGlzdGVuZXIiLCJsaXN0ZW5lciIsInByZXBlbmQiLCJtIiwiZXhpc3RpbmciLCJUeXBlRXJyb3IiLCJuZXdMaXN0ZW5lciIsInVuc2hpZnQiLCJ3YXJuZWQiLCJ3IiwiU3RyaW5nIiwibmFtZSIsImVtaXR0ZXIiLCJjb3VudCIsImFkZExpc3RlbmVyIiwib24iLCJwcmVwZW5kTGlzdGVuZXIiLCJvbmNlV3JhcHBlciIsImZpcmVkIiwicmVtb3ZlTGlzdGVuZXIiLCJ3cmFwRm4iLCJfb25jZVdyYXAiLCJzdGF0ZSIsIndyYXBwZWQiLCJiaW5kIiwib25jZSIsInByZXBlbmRPbmNlTGlzdGVuZXIiLCJsaXN0IiwicG9zaXRpb24iLCJvcmlnaW5hbExpc3RlbmVyIiwic2hpZnQiLCJzcGxpY2VPbmUiLCJvZmYiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJrZXlzIiwia2V5IiwiX2xpc3RlbmVycyIsInVud3JhcCIsImV2bGlzdGVuZXIiLCJ1bndyYXBMaXN0ZW5lcnMiLCJyYXdMaXN0ZW5lcnMiLCJsaXN0ZW5lckNvdW50IiwiZXZlbnROYW1lcyIsImFyciIsImNvcHkiLCJBcnJheSIsImluZGV4IiwicG9wIiwicmV0IiwiVHJhY2siLCJyZXF1aXJlIiwiZGVmYXVsdCIsIlRyYWNrcyIsIkF1ZGlvVHJhY2siLCJWaWRlb1RyYWNrIiwiWGdCdWZmZXIiLCJSZW11eEJ1ZmZlciIsIlByZVNvdXJjZSIsImNvbnN0cnVjdG9yIiwiaGlzdG9yeUxlbiIsImFycmF5Iiwib2Zmc2V0IiwiZGF0YSIsImJ5dGVMZW5ndGgiLCJVaW50OEFycmF5IiwiX3NoaWZ0QnVmZmVyIiwic2xpY2UiLCJ0bXBvZmYiLCJ0bXAiLCJ0ZW1wbGVuZ3RoIiwiY2xlYXIiLCJkZXN0cm95IiwidG9JbnQiLCJzdGFydCIsInJldEludCIsInZpZGVvIiwiYXVkaW8iLCJTb3VyY2UiLCJtaW1ldHlwZSIsInNvdXJjZXMiLCJnZXRTb3VyY2UiLCJzb3VyY2UiLCJjcmVhdGVTb3VyY2UiLCJpZCIsInNlcXVlbmNlTnVtYmVyIiwic2FtcGxlcyIsImRyb3BwZWRTYW1wbGVzIiwicmVzZXQiLCJkaXN0cm95IiwiVEFHIiwiZHJvcHBlZCIsImF1ZGlvVHJhY2siLCJ2aWRlb1RyYWNrIiwiTmFsdW5pdCIsIlNwc1BhcnNlciIsIkNvbXBhdGliaWxpdHkiLCJBQUMiLCJnZXRTaWxlbnRGcmFtZSIsImNvZGVjIiwiY2hhbm5lbENvdW50IiwiUkVNVVhfRVZFTlRTIiwiREVNVVhfRVZFTlRTIiwiRVZFTlRTIiwibmV4dEF1ZGlvRHRzIiwibmV4dFZpZGVvRHRzIiwibGFzdEF1ZGlvU2FtcGxlc0xlbiIsImxhc3RWaWRlb1NhbXBsZXNMZW4iLCJsYXN0VmlkZW9EdHMiLCJsYXN0QXVkaW9EdHMiLCJhbGxBdWRpb1NhbXBsZXNDb3VudCIsImFsbFZpZGVvU2FtcGxlc0NvdW50IiwiX2ZpcnN0QXVkaW9TYW1wbGUiLCJfZmlyc3RWaWRlb1NhbXBsZSIsImZpbGxlZEF1ZGlvU2FtcGxlcyIsImZpbGxlZFZpZGVvU2FtcGxlcyIsIl92aWRlb0xhcmdlR2FwIiwiX2F1ZGlvTGFyZ2VHYXAiLCJiZWZvcmUiLCJSRU1VWF9NRURJQSIsImRvRml4IiwiaXNGaXJzdEF1ZGlvU2FtcGxlcyIsImlzRmlyc3RWaWRlb1NhbXBsZXMiLCJnZXRGaXJzdFNhbXBsZSIsInJlY29yZFNhbXBsZXNDb3VudCIsImZpeFJlZlNhbXBsZUR1cmF0aW9uIiwibWV0YSIsImNoYW5nZWQiLCJ2aWRlb0NoYW5nZWQiLCJjaGFuZ2VkSWR4IiwidmlkZW9DaGFuZ2VkSWR4IiwiZGV0YWN0Q2hhbmdlU3RyZWFtIiwiZml4Q2hhbmdlU3RyZWFtVmlkZW8iLCJkb0ZpeFZpZGVvIiwiYXVkaW9DaGFuZ2VkIiwiYXVkaW9DaGFuZ2VkSWR4IiwiZml4Q2hhbmdlU3RyZWFtQXVkaW8iLCJkb0ZpeEF1ZGlvIiwiZmlyc3QiLCJzdHJlYW1DaGFuZ2VTdGFydCIsInZpZGVvU2FtcGxlcyIsImZyYW1lUmF0ZSIsImZpeGVkIiwiZmlyc3RTYW1wbGUiLCJzYW1wbGVzTGVuIiwiZG9GaXhMYXJnZUdhcCIsImR0cyIsImRldGVjdExhcmdlR2FwIiwiZmlyc3REdHMiLCJ2aWRlb0ZpcnN0RHRzIiwiYXVkaW9GaXJzdER0cyIsImdhcCIsInJlZlNhbXBsZUR1cmF0aW9uIiwiZmlsbENvdW50IiwiTWF0aCIsImZsb29yIiwiY2xvbmVkRmlyc3RTYW1wbGUiLCJhc3NpZ24iLCJwdHMiLCJjdHMiLCJzaXplIiwiYWJzR2FwIiwiYWJzIiwiZmlsbEZyYW1lQ291bnQiLCJjbG9uZWRTYW1wbGUiLCJjb21wdXRlZCIsIm9yaWdpbkR0cyIsImxhc3REdHMiLCJsYXN0U2FtcGxlRHVyYXRpb24iLCJjdXJyZW50IiwibmV4dCIsImR1cmF0aW9uIiwiZmlsbEZyYW1lSWR4IiwiZmlsbEZyYW1lIiwic3BsaWNlIiwiYXVkaW9TYW1wbGVzIiwic2lsZW50RnJhbWUiLCJfZmlyc3RTYW1wbGUiLCJ2aWRlb0ZpcnN0UHRzIiwic2lsZW50U2FtcGxlQ291bnQiLCJzaWxlbnRTYW1wbGUiLCJkYXRhc2l6ZSIsImZpbHRlcmVkIiwicmVmU2FtcGxlRHVyYXRpb25GaXhlZCIsInNpbGVudEZyYW1lQ291bnQiLCJzb3J0QXVkaW9TYW1wbGVzIiwiY2hhbmdlSWR4IiwicHJldkR0cyIsImdldFN0cmVhbUNoYW5nZVN0YXJ0IiwiY3VyRHRzIiwiaXNDb250aW51ZSIsIm9wdGlvbnMiLCJmaXJzdFBhcnRTYW1wbGVzIiwic2Vjb25kUGFydFNhbXBsZXMiLCJjaGFuZ2VTYW1wbGUiLCJmaXJzdFBhcnREdXJhdGlvbiIsImZpbmRGaXJzdFZpZGVvU2FtcGxlIiwiZmluZEZpcnN0QXVkaW9TYW1wbGUiLCJpc1ZpZGVvIiwiYWxsU2FtcGxlc0NvdW50IiwiZmlsbGVkU2FtcGxlc0NvdW50IiwiZHVyYXRpb25BdmciLCJyZW1vdmVJbnZhbGlkU2FtcGxlcyIsImZpbHRlciIsInNhbXBsZSIsImR0c0Jhc2UiLCJJbmZpbml0eSIsInNvcnQiLCJhIiwiYiIsInNvcnRlZCIsImlzS2V5ZnJhbWUiLCJuZXh0RHRzIiwiY29uZDEiLCJjb25kMiIsImRpc2NvbnRpbnVlIiwibG9nIiwidHJhY2tzIiwiX2NvbnRleHQiLCJnZXRJbnN0YW5jZSIsInJlbXV4ZXIiLCJfZHRzQmFzZSIsIkdvbG9tYiIsInVpbnQ4YXJyYXkiLCJfYnVmZmVyIiwiX2J1ZmZlckluZGV4IiwiX3RvdGFsQnl0ZXMiLCJfdG90YWxCaXRzIiwiX2N1cnJlbnRXb3JkIiwiX2N1cnJlbnRXb3JkQml0c0xlZnQiLCJfZmlsbEN1cnJlbnRXb3JkIiwiYnVmZmVyQnl0ZXNMZWZ0IiwiYnl0ZXNSZWFkIiwibWluIiwid29yZCIsInN1YmFycmF5IiwiRGF0YVZpZXciLCJidWZmZXIiLCJnZXRVaW50MzIiLCJyZWFkQml0cyIsImJpdHMiLCJ2YWx1IiwicmVhZEJvb2wiLCJyZWFkQnl0ZSIsIl9za2lwTGVhZGluZ1plcm8iLCJ6ZXJvQ291bnQiLCJyZWFkVUVHIiwibGVhZGluZ1plcm9zIiwicmVhZFNFRyIsImdldE5hbHVuaXRzIiwiYnVmIiwiZGF0YXZpZXciLCJnZXRJbnQzMiIsImdldEludDE2IiwiZ2V0SW50OCIsImdldEFubmV4Yk5hbHMiLCJnZXRBdmNjTmFscyIsIm5hbHMiLCJnZXRIZWFkZXJQb3NpdGlvbkFubmV4QiIsInBvcyIsImVuZCIsImhlYWRlciIsImhlYWRlckxlbmd0aCIsInNraXAiLCJib2R5IiwidW5pdCIsImFuYWx5c2VOYWwiLCJuZHIiLCJpZHIiLCJzcHMiLCJwYXJzZVNQUyIsInBwcyIsImdldEF2Y2MiLCJTUFNQYXJzZXIiLCJfZWJzcDJyYnNwIiwic3JjIiwic3JjTGVuZ3RoIiwiZHN0IiwiZHN0SWR4IiwicmJzcCIsImdiIiwicHJvZmlsZUlkYyIsImxldmVsSWRjIiwicHJvZmlsZV9zdHJpbmciLCJnZXRQcm9maWxlU3RyaW5nIiwibGV2ZWxfc3RyaW5nIiwiZ2V0TGV2ZWxTdHJpbmciLCJjaHJvbWFfZm9ybWF0X2lkYyIsImNocm9tYV9mb3JtYXQiLCJjaHJvbWFfZm9ybWF0X3RhYmxlIiwiYml0X2RlcHRoIiwic2NhbGluZ19saXN0X2NvdW50IiwiX3NraXBTY2FsaW5nTGlzdCIsInBpY19vcmRlcl9jbnRfdHlwZSIsIm51bV9yZWZfZnJhbWVzX2luX3BpY19vcmRlcl9jbnRfY3ljbGUiLCJwaWNfd2lkdGhfaW5fbWJzX21pbnVzMSIsInBpY19oZWlnaHRfaW5fbWFwX3VuaXRzX21pbnVzMSIsImZyYW1lX21ic19vbmx5X2ZsYWciLCJmcmFtZV9jcm9wX2xlZnRfb2Zmc2V0IiwiZnJhbWVfY3JvcF9yaWdodF9vZmZzZXQiLCJmcmFtZV9jcm9wX3RvcF9vZmZzZXQiLCJmcmFtZV9jcm9wX2JvdHRvbV9vZmZzZXQiLCJmcmFtZV9jcm9wcGluZ19mbGFnIiwicGFyX3dpZHRoIiwicGFyX2hlaWdodCIsImZwcyIsImZwc19maXhlZCIsImZwc19udW0iLCJmcHNfZGVuIiwidnVpX3BhcmFtZXRlcnNfcHJlc2VudF9mbGFnIiwiYXNwZWN0X3JhdGlvX2lkYyIsInBhcl93X3RhYmxlIiwicGFyX2hfdGFibGUiLCJudW1fdW5pdHNfaW5fdGljayIsInRpbWVfc2NhbGUiLCJwYXJTY2FsZSIsImNyb3BfdW5pdF94IiwiY3JvcF91bml0X3kiLCJzdWJfd2MiLCJzdWJfaGMiLCJjb2RlY193aWR0aCIsImNvZGVjX2hlaWdodCIsInByZXNlbnRfd2lkdGgiLCJjZWlsIiwiY2hyb21hX2Zvcm1hdF9zdHJpbmciLCJnZXRDaHJvbWFGb3JtYXRTdHJpbmciLCJmcmFtZV9yYXRlIiwicGFyX3JhdGlvIiwid2lkdGgiLCJoZWlnaHQiLCJjb2RlY19zaXplIiwicHJlc2VudF9zaXplIiwibGFzdF9zY2FsZSIsIm5leHRfc2NhbGUiLCJkZWx0YV9zY2FsZSIsInRvRml4ZWQiLCJjaHJvbWEiLCJ0b1ZpZGVvTWV0YSIsInNwc0NvbmZpZyIsImNvZGVjV2lkdGgiLCJjb2RlY0hlaWdodCIsInByZXNlbnRXaWR0aCIsInByZXNlbnRIZWlnaHQiLCJwcm9maWxlIiwibGV2ZWwiLCJiaXREZXB0aCIsImNocm9tYUZvcm1hdCIsInBhclJhdGlvIiwiZnBzRGVuIiwiZnBzTnVtIiwidGltZXNjYWxlIiwiTTNVOFBhcnNlciIsIlRzRGVtdXhlciIsIlBsYXlsaXN0IiwiRmx2RGVtdXhlciIsIkRBVEFfVFlQRVMiLCJOVU1CRVIiLCJCT09MRUFOIiwiU1RSSU5HIiwiT0JKRUNUIiwiTUlYX0FSUkFZIiwiT0JKRUNUX0VORCIsIlNUUklDVF9BUlJBWSIsIkRBVEUiLCJMT05FX1NUUklORyIsIkFNRlBhcnNlciIsInJlYWRPZmZzZXQiLCJyZXNvbHZlIiwibWV0YURhdGEiLCJwYXJzZVZhbHVlIiwiYm9keVNpemUiLCJyZXNldFN0YXR1cyIsInBhcnNlU3RyaW5nIiwiZHYiLCJzdHJMZW4iLCJnZXRVaW50MTYiLCJpc0xlIiwic3RyIiwiVVRGOCIsImRlY29kZSIsInBhcnNlRGF0ZSIsInRzIiwiZ2V0RmxvYXQ2NCIsInRpbWVPZmZzZXQiLCJEYXRlIiwicGFyc2VPYmplY3QiLCJpc09iakVuZCIsInBhcnNlTG9uZ1N0cmluZyIsIkFycmF5QnVmZmVyIiwiZGF0YVZpZXciLCJnZXRVaW50OCIsImJvb2xOdW0iLCJvYmpFbmRTaXplIiwiYW1mT2JqIiwiaXNPYmplY3RFbmQiLCJtYXJrIiwiYW1mVmFyIiwibWFya2VyIiwiYXJyTGVuZ3RoIiwic2NyaXB0IiwiZGF0ZSIsImxvbmdTdHIiLCJfZmlyc3RGcmFnbWVudExvYWRlZCIsIl90cmFja051bSIsIl9oYXNTY3JpcHQiLCJERU1VWF9TVEFSVCIsImRvUGFyc2VGbHYiLCJpc0ZsdkZpbGUiLCJnZXRQbGF5VHlwZSIsInN0cmVhbUZsYWciLCJyZXN1bHQiLCJoYXNWaWRlbyIsImhhc0F1ZGlvIiwibG9hZGVyQnVmZmVyIiwicGFyc2VGbHZIZWFkZXIiLCJjaHVuayIsImxvb3BNYXgiLCJfcGFyc2VGbHZUYWciLCJERU1VWF9DT01QTEVURSIsIkRFTVVYX0VSUk9SIiwicGxheVR5cGUiLCJpbml0VmlkZW9UcmFjayIsImluaXRBdWRpb1RyYWNrIiwiVmlkZW9UcmFja01ldGEiLCJBdWRpb1RyYWNrTWV0YSIsIl9wYXJzZUZsdlRhZ0hlYWRlciIsIl9wcm9jZXNzQ2h1bmsiLCJ0YWdUeXBlIiwidGltZXN0YW1wIiwidGltZXN0YW1wRXh0IiwiX3BhcnNlU2NyaXB0RGF0YSIsIl9wYXJzZUFBQ0RhdGEiLCJfcGFyc2VIZXZjRGF0YSIsImluZm8iLCJvbk1ldGFEYXRhIiwibWVkaWFJbmZvIiwiaHNhQXVkaW8iLCJ2YWxpZGF0ZSIsIl9kYXRhc2l6ZVZhbGlkYXRvciIsIk1FRElBX0lORk8iLCJoYXNTcGVjaWZpY0NvbmZpZyIsImF1ZGlvc2FtcGxlcmF0ZSIsInNhbXBsZVJhdGUiLCJhdWRpb2NoYW5uZWxzIiwic2FtcGxlUmF0ZUluZGV4IiwiZnJhbWVyYXRlIiwiX2FhY1NlcXVlbmNlSGVhZGVyUGFyc2VyIiwib2JqZWN0VHlwZSIsIl9zd2l0Y2hBdWRpb1NhbXBsZVJhdGUiLCJmcmFtZUxlbmd0aCIsImRlcGVuZHNPbkNvcmVDb2RlciIsImV4dGVuc2lvbkZsYWdJbmRleCIsInVzZXJBZ2VudCIsIndpbmRvdyIsIm5hdmlnYXRvciIsInRvTG93ZXJDYXNlIiwiZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCIsImNvbmZpZyIsInNhbXBsaW5nSW5kZXgiLCJpbmRleE9mIiwidHJhY2siLCJmb3JtYXQiLCJfaGFzQXVkaW9TZXF1ZW5jZSIsIl9zd2l0Y2hBdWRpb1NhbXBsaW5nRnJlcXVlbmN5IiwiZnJhbWVMZW50aCIsImF1ZGlvU2FtcGxlUmF0ZSIsImF1ZGlvU2FtcGxlUmF0ZUluZGV4IiwiYWFjSGVhZGVyIiwiYXVkaW9NZWRpYSIsIk1FVEFEQVRBX1BBUlNFRCIsIkFVRElPX01FVEFEQVRBX0NIQU5HRSIsIl9tZXRhQ2hhbmdlIiwiZnJhbWVUeXBlIiwiY29kZWNJRCIsImF2Y1BhY2tldFR5cGUiLCJwYXJzZUludCIsIm5hbHUiLCJyIiwic2l6ZXMiLCJhdmNjbGVuZ3RoIiwiX2F2Y1NlcXVlbmNlSGVhZGVyUGFyc2VyIiwiX2hhc1ZpZGVvU2VxdWVuY2UiLCJWSURFT19NRVRBREFUQV9DSEFOR0UiLCJjb25maWd1cmF0aW9uVmVyc2lvbiIsImF2Y1Byb2ZpbGVJbmRpY2F0aW9uIiwicHJvZmlsZUNvbXBhdGliaWxpdHkiLCJhdmNMZXZlbEluZGljYXRpb24iLCJuYWxVbml0TGVuZ3RoIiwibnVtT2ZTcHMiLCJqIiwiY29kZWNTdHJpbmciLCJoIiwidG9TdHJpbmciLCJudW1PZlBwcyIsInZpZGVvTWVkaWEiLCJhdmNjIiwic2FtcGxpbmdGcmVxdWVuY3lJbmRleCIsInNhbXBsaW5nRnJlcXVlbmN5TGlzdCIsIl9zd2l0Y2hBdWRpb0NoYW5uZWwiLCJzYW1wbGVUcmFja051bUluZGV4Iiwic2FtcGxlVHJhY2tOdW1MaXN0IiwiZGF0YXNpemVDb25maXJtIiwibG9nZ2VyIiwicGFyc2UiLCJ0ZXh0IiwiYmFzZXVybCIsInNwbGl0IiwicmVmcyIsInJlZiIsIm1hdGNoIiwicmVmbSIsInJlZmQiLCJ2ZXJzaW9uIiwic2VxdWVuY2UiLCJ0YXJnZXRkdXJhdGlvbiIsInBhcnNlRmxvYXQiLCJwYXJzZUZyYWciLCJwYXJzZURlY3J5cHQiLCJmcmFncyIsImZyZWciLCJuZXh0bGluZSIsImNoYXJBdCIsInVybCIsInBhcnNlVVJMIiwidXJscyIsImVuY3J5cHQiLCJjbWQiLCJtZXRob2QiLCJ1cmkiLCJpdiIsIml2YiIsImltIiwic3Vic3RyIiwiU3RyZWFtVHlwZSIsImNvbmZpZ3MiLCJkZW11eGluZyIsInBhdCIsInBtdCIsIl9oYXNWaWRlb01ldGEiLCJfaGFzQXVkaW9NZXRhIiwiZGVtdXgiLCJmcmFnIiwiaW5wdXRCdWZmZXIiLCJwZXNlcyIsInRzU3RyZWFtIiwiU3RyZWFtIiwicmVhZCIsInBlcyIsInBpZCIsIkVTIiwicGF5bG9hZCIsInN0cmVhbSIsIkF1ZGlvT3B0aW9ucyIsIlZpZGVvT3B0aW9ucyIsImVwZXNlcyIsIk1lcmdlIiwicHVzaEF1ZGlvU2FtcGxlIiwicHVzaFZpZGVvU2FtcGxlIiwiX3RyYWNrcyIsImZyZXF1ZW5jZSIsImNoYW5uZWwiLCJhdWRpb09iamVjdFR5cGUiLCJhdWRpb0NvbmZpZyIsImZyZXF1ZW5jeUluZGV4IiwibWV0YUVxdWFsIiwiY29tcGFpcmVNZXRhIiwiQXVkaW9UcmFja1NhbXBsZSIsInNhbXBsZUxlbmd0aCIsIm5hbCIsInNhclJhdGlvIiwic2FyX3JhdGlvIiwiVmlkZW9UcmFja1NhbXBsZSIsImRlc3RvcnkiLCJjb21wYWlyZUFycmF5IiwiYWwiLCJibCIsImlnbm9yZUR1cmF0aW9uIiwiayIsIml0ZW1hIiwiaXRlbWIiLCJidWZmZXJzIiwicmVhZEhlYWRlciIsInJlYWRQYXlsb2FkIiwicGFja2V0IiwidW5rbm93blBJRHMiLCJQRVMiLCJQQVQiLCJDQVQiLCJUU0RUIiwic29tZSIsIml0ZW0iLCJQTVQiLCJzdHMiLCJNZWRpYSIsInN0cmVhbVR5cGUiLCJzeW5jIiwicmVhZFVpbnQ4IiwicmVhZFVpbnQxNiIsInByaW9yaXR5Iiwic2NyYW1ibGluZyIsImFkYXB0YXRpb24iLCJjb250aW51aXR5IiwidGFiZWxJRCIsInplcm8iLCJzZWN0aW9uTGVuZ3RoIiwic3RyZWFtSUQiLCJzZWN0aW9uTnVtYmVyIiwibGFzdFNlY3Rpb25OdW1iZXIiLCJOIiwicHJvZ3JhbU51bWJlciIsInByb2dyYW0iLCJ0YWJsZUlEIiwib3JkZXIiLCJsYXN0T3JkZXIiLCJQQ1JfUElEIiwicHJvZ3JhbUxlbmd0aCIsImVzIiwibWFwIiwiYWRhcHRhdGlvbkxlbmd0aCIsImFjY2VzcyIsIlBDUiIsIk9QQ1IiLCJzcGxpY2VQb2ludCIsInRyYW5zcG9ydFByaXZhdGUiLCJhZGFwdGF0aW9uRmllbGQiLCJfc3RhcnQiLCJwcm9ncmFtQ2xvY2tCYXNlIiwicmVhZFVpbnQzMiIsInByb2dyYW1DbG9ja0V4dGVuc2lvbiIsIm9yaWdpblByb2dyYW1DbG9ja0Jhc2UiLCJvcmlnaW5Qcm9ncmFtQ2xvY2tFeHRlbnNpb24iLCJzcGxpY2VDb3VudGRvd24iLCJ0cmFuc3BvcnRQcml2YXRlRGF0YSIsImx0dyIsInBpZWNld2lzZSIsInNlYW1sZXNzIiwibHR3VmFsaWQiLCJsdHdPZmZzZXQiLCJyZWFkVWludDI0IiwicGllY2V3aXNlUmF0ZSIsInJlYWRJbnQ4Iiwic3BsaWNlVHlwZSIsImR0c05leHRBVTEiLCJtYXJrZXIxIiwiZHRzTmV4dEFVMiIsIm1hcmtlcjIiLCJkdHNOZXh0QVUzIiwibGFzdFN0dWZmaW5nIiwicGFja2V0TGVuZ3RoIiwicHRzRFRTRmxhZyIsImVzY3JGbGFnIiwiZXNSYXRlRmxhZyIsImRzbUZsYWciLCJhZGRpdGlvbmFsRmxhZyIsImNyY0ZsYWciLCJleHRlbnNpb25GbGFnIiwicGVzSGVhZGVyTGVuZ3RoIiwiTjEiLCJlc2NyIiwiZXgiLCJlc1JhdGUiLCJhZGRpdGlvbmFsQ29weUluZm8iLCJwZXNDUkMiLCJiYWNrIiwiZnEiLCJsYXllciIsImFic2VudCIsImdldEF1ZGlvQ29uZmlnIiwic2VjdGlvbkluZGljYXRvciIsImN1cnJlbnROZXh0SW5kaWNhdG9yIiwiY3JjMzIiLCJleHRlbnNpb25TYW1wbGVJbmRleCIsInRlc3QiLCJpbnB1dGJ1ZmZlciIsIl9iYXNlVVJMIiwiX2xpc3QiLCJfdHMiLCJmcmFnTGVuZ3RoIiwiX2xhc3RnZXQiLCJfYXVkb2NsZWFyIiwiYXV0b2NsZWFyIiwiYmFzZVVSTCIsImRvd25sb2FkZWQiLCJkb3dubG9hZGluZyIsImRlbGV0ZUZyYWciLCJ0aW1lIiwicHVzaE0zVTgiLCJkZWxldGVwcmUiLCJuZXdmcmFnbGlzdCIsInRzbGlzdCIsImdldFRzTGlzdCIsInRzbmFtZSIsImlzbG9hZGVkIiwibG9hZGluZyIsImdldFRzQnlOYW1lIiwiZ2V0VHMiLCJ0aW1lbGlzdCIsImNsZWFyRG93bmxvYWRlZCIsImwiLCJGZXRjaExvYWRlciIsIkxPQURFUl9FVkVOVFMiLCJSRUFEX1NUUkVBTSIsIlJFQURfVEVYVCIsIlJFQURfSlNPTiIsIlJFQURfQlVGRkVSIiwic3RhdHVzIiwiX3JlYWRlciIsIl9jYW5jZWxlZCIsIl9kZXN0cm95ZWQiLCJyZWFkdHlwZSIsIl9sb2FkZXJUYXNrTm8iLCJMQURFUl9TVEFSVCIsImxvYWQiLCJvcHRzIiwiX3RoaXMiLCJwYXJhbXMiLCJnZXRQYXJhbXMiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsIm9rIiwiX29uRmV0Y2hSZXNwb25zZSIsIkxPQURFUl9FUlJPUiIsImNhdGNoIiwidGFza25vIiwianNvbiIsIkxPQURFUl9DT01QTEVURSIsImFycmF5QnVmZmVyIiwiX29uUmVhZGVyIiwiZ2V0UmVhZGVyIiwicmVhZGVyIiwiY2FuY2VsIiwiZSIsInZhbCIsImRvbmUiLCJMT0FERVJfREFUQUxPQURFRCIsImhlYWRlcnMiLCJIZWFkZXJzIiwibW9kZSIsImNhY2hlIiwiY29uZmlnSGVhZGVycyIsImhhc093blByb3BlcnR5IiwiYXBwZW5kIiwib3B0SGVhZGVycyIsImNvcnMiLCJ3aXRoQ3JlZGVudGlhbHMiLCJjcmVkZW50aWFscyIsIk1wNFJlbXV4ZXIiLCJGbXA0IiwiQnVmZmVyIiwid3JpdGVVaW50MzIiLCJpbml0Qm94IiwiY29udGVudCIsIndyaXRlIiwiZXh0ZW5zaW9uIiwiZmxhZyIsImZ0eXAiLCJtb292IiwibXZoZCIsInRyYWsiLCJ2aWRlb1RyYWsiLCJhdWRpb1RyYWsiLCJtdmV4IiwiZm9yRWFjaCIsImJ5dGVzIiwidGtoZCIsIm1kaWEiLCJzYW1wbGVyYXRlIiwiZWR0cyIsIm1lZGlhVGltZSIsIm1kaGQiLCJoZGxyIiwibWluZiIsInZtaGQiLCJzbWhkIiwiZGluZiIsInN0YmwiLCJkcmVmIiwic3RzZCIsInN0dHMiLCJzdHNjIiwic3RzeiIsInN0Y28iLCJtcDRhIiwiYXZjMSIsImVzZHMiLCJjb25maWdsZW4iLCJoU3BhY2luZyIsInZTcGFjaW5nIiwiYnRydCIsInBhc3AiLCJ0cmFja0lEIiwibWVoZCIsInRyZXgiLCJtb29mIiwibWZoZCIsInRyYWYiLCJ0ZmhkIiwidGZkdCIsInNkdHAiLCJ0cnVuIiwic2R0cExlbmd0aCIsInNhbXBsZUNvdW50IiwiZmxhZ3MiLCJpc0xlYWRpbmciLCJkZXBlbmRzT24iLCJpc0RlcGVuZGVkT24iLCJoYXNSZWR1bmRhbmN5IiwiaXNOb25TeW5jIiwibnVtIiwibWRhdCIsIm1kYXRCb3giLCJjaGFyQ29kZUF0IiwiX2lzRHRzQmFzZUluaXRlZCIsImlzRmlyc3RWaWRlbyIsImlzRmlyc3RBdWRpbyIsInZpZGVvQWxsRHVyYXRpb24iLCJhdWRpb0FsbER1cmF0aW9uIiwicmVtdXgiLCJSRU1VWF9NRVRBREFUQSIsIm9uTWV0YURhdGFSZWFkeSIsIkRFVEVDVF9DSEFOR0VfU1RSRUFNIiwicmVzZXREdHNCYXNlIiwiX2R0c0Jhc2VJbml0ZWQiLCJjYWxjRHRzQmFzZSIsIl9yZW11eFZpZGVvIiwiX3JlbXV4QXVkaW8iLCJzZWVrIiwicHJlc291cmNlYnVmZmVyIiwicmVtdXhJbml0U2VnbWVudCIsIklOSVRfU0VHTUVOVCIsImluaXRTZWdtZW50IiwiYXVkaW9CYXNlIiwidmlkZW9CYXNlIiwibXA0U2FtcGxlcyIsImF2Y1NhbXBsZSIsIm1kYXRTYW1wbGUiLCJzYW1wbGVEdXJhdGlvbiIsInZpZGVvTWV0YSIsIm1vb2ZNZGF0Iiwid3JpdGVUb1NvdXJjZSIsIk1FRElBX1NFR01FTlQiLCJsYXN0U2FtcGxlIiwiX3ZpZGVvTmV4dER0cyIsImlzRmlyc3REdHNJbml0ZWQiLCJhdWRpb01ldGEiLCJtcDRTYW1wbGUiLCJpbml0U2lsZW50QXVkaW8iLCJDb250ZXh0IiwiV09SS0VSX0NPTU1BTkRTIiwic25pZmZlciIsIk1lZGlhSW5mbyIsIk1lZGlhU2FtcGxlIiwiTWVkaWFTZWdtZW50IiwiTWVkaWFTZWdtZW50TGlzdCIsIk1zZSIsIk1vYmlsZVZpZGVvIiwiQ3J5cHRvIiwiUmVzdWx0Q29uc3RydWN0b3IiLCJ0b3RhbExlbmd0aCIsIl9sZW4iLCJhcnJheXMiLCJfa2V5IiwiX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiIsIl9kaWRJdGVyYXRvckVycm9yIiwiX2l0ZXJhdG9yRXJyb3IiLCJfaXRlcmF0b3IiLCJTeW1ib2wiLCJpdGVyYXRvciIsIl9zdGVwIiwicmV0dXJuIiwiX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIiLCJfZGlkSXRlcmF0b3JFcnJvcjIiLCJfaXRlcmF0b3JFcnJvcjIiLCJfaXRlcmF0b3IyIiwiX3N0ZXAyIiwiX2FyciIsIl9jb25jYXQiLCJfY29uY2F0MiIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJvYmoiLCJfX2VzTW9kdWxlIiwid2VicGFja0Jvb3RzdHJhcEZ1bmMiLCJtb2R1bGVzIiwiaW5zdGFsbGVkTW9kdWxlcyIsIl9fd2VicGFja19yZXF1aXJlX18iLCJtb2R1bGVJZCIsImMiLCJkIiwiZ2V0dGVyIiwibyIsImNvbmZpZ3VyYWJsZSIsImdldERlZmF1bHQiLCJnZXRNb2R1bGVFeHBvcnRzIiwib2JqZWN0IiwicHJvcGVydHkiLCJwIiwib2UiLCJmIiwicyIsIkVOVFJZX01PRFVMRSIsIm1vZHVsZU5hbWVSZXFFeHAiLCJkZXBlbmRlbmN5UmVnRXhwIiwicXVvdGVSZWdFeHAiLCJyZXBsYWNlIiwiaXNOdW1lcmljIiwiZ2V0TW9kdWxlRGVwZW5kZW5jaWVzIiwicXVldWVOYW1lIiwicmV0dmFsIiwiZm5TdHJpbmciLCJ3cmFwcGVyU2lnbmF0dXJlIiwid2VicGFja1JlcXVpcmVOYW1lIiwicmUiLCJSZWdFeHAiLCJleGVjIiwiaGFzVmFsdWVzSW5RdWV1ZXMiLCJxdWV1ZXMiLCJyZWR1Y2UiLCJoYXNWYWx1ZXMiLCJnZXRSZXF1aXJlZE1vZHVsZXMiLCJtb2R1bGVzUXVldWUiLCJtYWluIiwicmVxdWlyZWRNb2R1bGVzIiwic2Vlbk1vZHVsZXMiLCJxdWV1ZSIsIm1vZHVsZVRvQ2hlY2siLCJuZXdNb2R1bGVzIiwibmV3TW9kdWxlc0tleXMiLCJfX3dlYnBhY2tfbW9kdWxlc19fIiwiYWxsIiwiZW50cnlNb2R1bGUiLCJKU09OIiwic3RyaW5naWZ5Iiwiam9pbiIsImJsb2IiLCJCbG9iIiwiYmFyZSIsIlVSTCIsIndlYmtpdFVSTCIsIm1velVSTCIsIm1zVVJMIiwid29ya2VyVXJsIiwiY3JlYXRlT2JqZWN0VVJMIiwid29ya2VyIiwiV29ya2VyIiwib2JqZWN0VVJMIiwiUkVNVVhfRVJST1IiLCJNU0VfRVZFTlRTIiwiU09VUkNFX1VQREFURV9FTkQiLCJITFNfRVZFTlRTIiwiUkVUUllfVElNRV9FWENFRURFRCIsIkNSWVRPX0VWRU5UUyIsIlNUQVJUX0RFQ1JZUFQiLCJERUNSWVBURUQiLCJBTExFVkVOVFMiLCJGbHZBbGxvd2VkRXZlbnRzIiwiSGxzQWxsb3dlZEV2ZW50cyIsIkNPTlRFWFRfQ09NT01BTkRTIiwiT04iLCJPTkNFIiwiT0ZGIiwiRU1JVCIsIkRFU1RST1kiLCJESVJFQ1RfRU1JVF9GTEFHIiwiYWxsb3dlZEV2ZW50cyIsIl9lbWl0dGVyIiwiX2luc3RhbmNlTWFwIiwiX2Nsc01hcCIsIl9pbml0ZWQiLCJfaG9va3MiLCJ0YWciLCJpbnN0YW5jZSIsImluaXRJbnN0YW5jZSIsIm5ld0luc3RhbmNlIiwicmVnaXN0cnkiLCJjbHMiLCJjaGVja01lc3NhZ2VOYW1lIiwiX2lzTWVzc2FnZU5hbWVWYWxpZCIsInNlbGYiLCJlbmhhbmNlZCIsIm9uY2VMaXN0ZW5lcnMiLCJtZXNzYWdlTmFtZSIsImNhbGxiYWNrIiwiYmVmb3JlTGlzdCIsImVtaXRUbyIsInJlbW92ZUxpc3RlbmVycyIsImhhc093biIsImNhbGxiYWNrcyIsImRlc3Ryb3lJbnN0YW5jZXMiLCJvdXRwdXRCdWZmZXIiLCJvdXRwdXRidWZmZXIiLCJjcnlwdG8iLCJtc0NyeXB0byIsImRlY3JpcHQiLCJhZXNrZXkiLCJzYmtleSIsInN1YnRsZSIsImltcG9ydEtleSIsImRlY3JpcHREYXRhIiwiZGVjcnlwdCIsInJlcyIsImxlIiwic2V0SW50MTYiLCJJbnQxNkFycmF5IiwiZGV2aWNlIiwib3MiLCJpc1BjIiwiaXNUYWJsZXQiLCJicm93c2VyIiwidWEiLCJyZWciLCJpZSIsImZpcmZveCIsImNocm9tZSIsIm9wZXJhIiwic2FmYXJpIiwiaXNXaW5kb3dzUGhvbmUiLCJpc1N5bWJpYW4iLCJpc0FuZHJvaWQiLCJpc0ZpcmVGb3giLCJpc1Bob25lIiwib3V0IiwiaW5wdXQiLCJmcm9tQ2hhckNvZGUiLCJfY2hlY2tDb250aW51YXRpb24iLCJ1Y3M0IiwiY2hlY2tMZW5ndGgiLCJBdWRpb0N0eCIsIkF1ZGlvQ29udGV4dCIsIndlYmtpdEF1ZGlvQ29udGV4dCIsImdhaW5Ob2RlIiwiY3JlYXRlR2FpbiIsImNvbm5lY3QiLCJkZXN0aW5hdGlvbiIsInByZWxvYWRUaW1lIiwiX2N1cnJlbnRCdWZmZXIiLCJfbmV4dEJ1ZmZlciIsIl9sYXN0cHRzIiwiX3ByZURlY29kZSIsIl9jdXJyZW50VGltZSIsIl9kZWNvZGluZyIsIl9wbGF5ZWQiLCJjdXJyZW50VGltZSIsImRlY29kZUF1ZGlvIiwic2V0QXVkaW9EYXRhIiwiZGVjb2RlQUFDIiwic2FtcGxlRGF0YSIsImdldEFBQ0RhdGEiLCJjb21iaWxlRGF0YSIsImRlY29kZUF1ZGlvRGF0YSIsImF1ZGlvU291cmNlIiwiY3JlYXRlQnVmZmVyU291cmNlIiwib25lbmRlZCIsIm9uU291cmNlRW5kZWQiLCJnZXRUaW1lQnVmZmVyIiwicGxheSIsInNldEF1ZGlvTWV0YURhdGEiLCJhZHRzIiwiZ2V0QWR0cyIsImFhY2ZyYW1lbGVuZ3RoIiwiQVZSZWNvbmNpbGVyIiwicHJvcHMiLCJhQ3R4IiwidkN0eCIsInRpbWVvdXRJZCIsImRvUmVjb25jaWxlIiwidkN1clRpbWUiLCJhQ3VyVGltZSIsInBhdXNlIiwic2V0VGltZW91dCIsIkhUTUxFbGVtZW50IiwiVmlkZW9DdHgiLCJ0aWNrZXIiLCJoaXN0b3J5VGltZSIsInJlY29uY2lsZXIiLCJoYW5kbGVBdWRpb1NvdXJjZUVuZCIsIm9uY2FucGxheSIsImFwcGVuZENoaWxkIiwiY2FudmFzIiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50Iiwibm93IiwiX29uVGltZXIiLCJfY2xlYW5CdWZmZXIiLCJjbGVhbkJ1ZmZlciIsIm9uRGVtdXhDb21wbGV0ZSIsImRlY29kZVZpZGVvIiwic2V0QXVkaW9NZXRhIiwic2V0VmlkZW9NZXRhIiwic2V0VmlkZW9NZXRhRGF0YSIsImN1c3RvbUVsZW1lbnRzIiwiZGVmaW5lIiwiU291cmNlQnVmZmVyIiwiY3VycmVudEdvcCIsIl9sYXN0R2V0IiwiZnJhbWUiLCJuZXh0R29wIiwiX2dldE5leHQiLCJnb3AiLCJyZW1vdmUiLCJUaWNrZXIiLCJpbnRlcnZhbCIsIm9uVGljayIsInNldEludGVydmFsIiwiUmFmVGlja2VyIiwicHJldiIsInRpbWVySWQiLCJfc3ViVGltZXJJZCIsIl90aWNrRnVuYyIsImdldFRpY2tGdW5jIiwidGljayIsIm5leHRUaWNrIiwic3RvcCIsImNhbmNlbEZ1bmMiLCJnZXRDYW5jZWxGdW5jIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSIsImlzU3VwcG9ydGVkIiwiVGltZW91dFRpY2tlciIsImNsZWFySW50ZXJ2YWwiLCJnZXRUaWNrZXIiLCJWaWRlb0NhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsIm9uRmlyc3RGcmFtZSIsInJlYWR5U3RhdHVzIiwicGF1c2VkIiwibGFzdFBsYXllZCIsIl9kZWNvZGVySW5pdGVkIiwiX2F2Y2NwdXNoZWQiLCJfZGVjb2RlZEZyYW1lcyIsIl9sYXN0U2FtcGxlRHRzIiwiX2Jhc2VEdHMiLCJfbGFzdFJlbmRlclRpbWUiLCJpbml0V2FzbVdvcmtlciIsIndhc213b3JrZXIiLCJwb3N0TWVzc2FnZSIsIm1zZyIsImFkZEV2ZW50TGlzdGVuZXIiLCJfb25EZWNvZGVkIiwieXV2Q2FudmFzIiwiWVVWQ2FudmFzIiwiX3ByZWxvYWQiLCJfYW5hbHlzZU5hbCIsImZyYW1lVGltZXMiLCJmcmFtZVRpbWUiLCJjdXJyZW50SWR4IiwicmVuZGVyIiwiTUFYX1NUUkVBTV9CVUZGRVJfTEVOR1RIIiwiRGVjb2RlciIsImluaXRlZCIsImluZm9saXN0IiwicGFyX2Jyb2Fkd2F5T25Ccm9hZHdheUluaXRlZCIsImJyb2Fkd2F5T25Ccm9hZHdheUluaXRlZCIsInBhcl9icm9hZHdheU9uUGljdHVyZURlY29kZWQiLCJicm9hZHdheU9uUGljdHVyZURlY29kZWQiLCJ0b1U4QXJyYXkiLCJwdHIiLCJIRUFQVTgiLCJNb2R1bGUiLCJfYnJvYWR3YXlJbml0Iiwic3RyZWFtQnVmZmVyIiwiX2Jyb2Fkd2F5Q3JlYXRlU3RyZWFtIiwiaW5mb2lkIiwiZGF0ZXRlbXAiLCJnZXRUaW1lIiwiX2Jyb2Fkd2F5UGxheVN0cmVhbSIsImRlY29kZXIiLCJvblBvc3RSdW4iLCJpbXBvcnRTY3JpcHRzIiwiYWRkT25Qb3N0UnVuIiwic3R5bGUiLCJfaW5pdENvbnRleHRHTCIsImNvbnRleHRHTCIsIl9pbml0UHJvZ3JhbSIsIl9pbml0QnVmZmVycyIsIl9pbml0VGV4dHVyZXMiLCJnbCIsInZhbGlkQ29udGV4dE5hbWVzIiwibmFtZUluZGV4IiwiY29udGV4dE5hbWUiLCJjb250ZXh0T3B0aW9ucyIsImdldENvbnRleHQiLCJnZXRQYXJhbWV0ZXIiLCJ2ZXJ0ZXhTaGFkZXJTY3JpcHQiLCJmcmFnbWVudFNoYWRlclNjcmlwdCIsIllVVjJSR0IiLCJ2ZXJ0ZXhTaGFkZXIiLCJjcmVhdGVTaGFkZXIiLCJWRVJURVhfU0hBREVSIiwic2hhZGVyU291cmNlIiwiY29tcGlsZVNoYWRlciIsImdldFNoYWRlclBhcmFtZXRlciIsIkNPTVBJTEVfU1RBVFVTIiwiZ2V0U2hhZGVySW5mb0xvZyIsImZyYWdtZW50U2hhZGVyIiwiRlJBR01FTlRfU0hBREVSIiwiY3JlYXRlUHJvZ3JhbSIsImF0dGFjaFNoYWRlciIsImxpbmtQcm9ncmFtIiwiZ2V0UHJvZ3JhbVBhcmFtZXRlciIsIkxJTktfU1RBVFVTIiwiZ2V0UHJvZ3JhbUluZm9Mb2ciLCJ1c2VQcm9ncmFtIiwiWVVWMlJHQlJlZiIsImdldFVuaWZvcm1Mb2NhdGlvbiIsInVuaWZvcm1NYXRyaXg0ZnYiLCJzaGFkZXJQcm9ncmFtIiwidmVydGV4UG9zQnVmZmVyIiwiY3JlYXRlQnVmZmVyIiwiYmluZEJ1ZmZlciIsIkFSUkFZX0JVRkZFUiIsImJ1ZmZlckRhdGEiLCJGbG9hdDMyQXJyYXkiLCJTVEFUSUNfRFJBVyIsInZlcnRleFBvc1JlZiIsImdldEF0dHJpYkxvY2F0aW9uIiwiZW5hYmxlVmVydGV4QXR0cmliQXJyYXkiLCJ2ZXJ0ZXhBdHRyaWJQb2ludGVyIiwiRkxPQVQiLCJ0ZXh0dXJlUG9zQnVmZmVyIiwidGV4dHVyZVBvc1JlZiIsInVUZXh0dXJlUG9zQnVmZmVyIiwidVRleHR1cmVQb3NSZWYiLCJ2VGV4dHVyZVBvc0J1ZmZlciIsInZUZXh0dXJlUG9zUmVmIiwieVRleHR1cmVSZWYiLCJfaW5pdFRleHR1cmUiLCJ5U2FtcGxlclJlZiIsInVuaWZvcm0xaSIsInVUZXh0dXJlUmVmIiwidVNhbXBsZXJSZWYiLCJ2VGV4dHVyZVJlZiIsInZTYW1wbGVyUmVmIiwidGV4dHVyZVJlZiIsImNyZWF0ZVRleHR1cmUiLCJiaW5kVGV4dHVyZSIsIlRFWFRVUkVfMkQiLCJ0ZXhQYXJhbWV0ZXJpIiwiVEVYVFVSRV9NQUdfRklMVEVSIiwiTkVBUkVTVCIsIlRFWFRVUkVfTUlOX0ZJTFRFUiIsIlRFWFRVUkVfV1JBUF9TIiwiQ0xBTVBfVE9fRURHRSIsIlRFWFRVUkVfV1JBUF9UIiwiX2RyYXdQaWN0dXJlR0wiLCJuV2lkdGgiLCJ5bGVuIiwidXZsZW4iLCJyZW5kZXJEYXRhIiwieURhdGEiLCJ1RGF0YSIsInZEYXRhIiwieUFycmF5IiwidUFycmF5IiwidkFycmF5IiwiX2RyYXdQaWN0dXJlR0w0MjAiLCJ5RGF0YVBlclJvdyIsInlSb3dDbnQiLCJ1RGF0YVBlclJvdyIsInVSb3dDbnQiLCJ2RGF0YVBlclJvdyIsInZSb3dDbnQiLCJyYXRpb3ciLCJyYXRpb2giLCJsZWZ0IiwidG9wIiwidmlld3BvcnQiLCJ0ZXh0dXJlUG9zVmFsdWVzIiwiRFlOQU1JQ19EUkFXIiwidVRleHR1cmVQb3NWYWx1ZXMiLCJ2VGV4dHVyZVBvc1ZhbHVlcyIsImFjdGl2ZVRleHR1cmUiLCJURVhUVVJFMCIsInRleEltYWdlMkQiLCJMVU1JTkFOQ0UiLCJVTlNJR05FRF9CWVRFIiwiVEVYVFVSRTEiLCJURVhUVVJFMiIsImRyYXdBcnJheXMiLCJUUklBTkdMRV9TVFJJUCIsIl9kcmF3UGljdHVyZVJHQiIsImlzT2JqZWN0RmlsbGVkIiwibWltZVR5cGUiLCJpc0NvbXBsZXRlIiwiaXNCYXNlSW5mb1JlYWR5IiwiaXNWaWRlb1JlYWR5IiwiaXNBdWRpb1JlYWR5IiwiX2RlZmF1bHQiLCJnZXREZWZhdWx0SW5mIiwiZW50cmllcyIsInYiLCJpc1JBUCIsIl90eXBlIiwiX2xhc3RBcHBlbmRMb2NhdGlvbiIsImlzRW1wdHkiLCJfc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUiLCJiZWdpbkR0cyIsImxhc3QiLCJtaWQiLCJsYm91bmQiLCJ1Ym91bmQiLCJpZHgiLCJfc2VhcmNoTmVhcmVzdFNlZ21lbnRBZnRlciIsInNlZ21lbnQiLCJsYXN0QXBwZW5kSWR4IiwiaW5zZXJ0SWR4Iiwib3JpZ2luU3RhcnREdHMiLCJnZXRMYXN0U2VnbWVudEJlZm9yZSIsImdldExhc3RTYW1wbGVCZWZvcmUiLCJnZXRMYXN0UkFQQmVmb3JlIiwic2VnbWVudElkeCIsInJhbmRvbUFjY2Vzc1BvaW50cyIsInN0YXJ0RHRzIiwiZW5kRHRzIiwic3RhcnRQdHMiLCJlbmRQdHMiLCJvcmlnaW5FbmREdHMiLCJhZGRSQVAiLCJNU0UiLCJjb250YWluZXIiLCJtZWRpYVNvdXJjZSIsInNvdXJjZUJ1ZmZlcnMiLCJvblNvdXJjZU9wZW4iLCJvblRpbWVVcGRhdGUiLCJvblVwZGF0ZUVuZCIsIm9uV2FpdGluZyIsIk1lZGlhU291cmNlIiwiYWRkU291cmNlQnVmZmVycyIsImRvQXBwZW5kIiwicmVhZHlTdGF0ZSIsImFkZCIsImR1ciIsIm1pbWUiLCJzb3VyY2VCdWZmZXIiLCJhZGRTb3VyY2VCdWZmZXIiLCJ1cGRhdGluZyIsImFwcGVuZEJ1ZmZlciIsImVuZE9mU3RyZWFtIiwiYWN0aXZlU291cmNlQnVmZmVycyIsInJlbW92ZUJ1ZmZlcnMiLCJ0YXNrTGlzdCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJ0YXNrIiwiUHJvbWlzZSIsImRvQ2xlYW5CdWZmZXIiLCJyZXRyeVRpbWUiLCJjbGVhbiIsImNsZWFyQnVmZmVyIiwicmVtb3ZlU291cmNlQnVmZmVyIiwicmV2b2tlT2JqZWN0VVJMIiwiYnVmZmVyZWQiLCJiRW5kIiwicmVhZEFzSW50IiwidGVtcCIsInBhZFN0YXJ0NEhleCIsImhleE51bSIsImhleFN0ciIsInBhZFN0YXJ0IiwibG9vcCIsInNpZ24iLCJyZWFkVWludDY0IiwicmVhZEludDE2IiwicmVhZEludDMyIiwiVGFnIiwiTG9nZ2VyIiwiRmx2Q29udHJvbGxlciIsInBsYXllciIsIl9wbGF5ZXIiLCJpbml0U2VnbWVudEFycml2ZWQiLCJpbml0TGlzdGVuZXJzIiwiX2hhbmRsZUxvYWRlckRhdGFMb2FkZWQiLCJfaGFuZGxlTmV0d29ya0Vycm9yIiwiX2hhbmRsZU1lZGlhSW5mbyIsIl9oYW5kbGVNZXRhZGF0YVBhcnNlZCIsIl9oYW5kbGVEZW11eENvbXBsZXRlIiwiX2hhbmRsZURlbXV4RXJyb3IiLCJfc2V0TWV0YVRvQXVkaW8iLCJfc2V0TWV0YVRvVmlkZW8iLCJfaGFuZGxlQXBwZW5kSW5pdFNlZ21lbnQiLCJQbGF5ZXIiLCJFcnJvcnMiLCJsb2FkRGF0YSIsImxvYWRlciIsInJlc29sdmVWaWRlb0dPUCIsImZpcnN0SWZyYW1lSWR4IiwibGFzdElmcmFtZUlkeCIsInRlbXBTYW1wbGVzIiwicmVzdCIsImZsdkFsbG93ZWRFdmVudHMiLCJGbHZQbGF5ZXIiLCJpbml0RXZlbnRzIiwiaW5pdEZsdiIsImZsdiIsImluaXRGbHZFdmVudHMiLCJ1dGlsIiwiYWRkQ2xhc3MiLCJyb290IiwiZmluZERvbSIsImxpdmUiLCJjcmVhdGVEb20iLCJjb250cm9scyIsInRpbWVyIiwiZ2V0QnVmZmVyZWRSYW5nZSIsInJhbmdlIiwiRkxWIiwiX2hhc1N0YXJ0IiwiX2Rlc3Ryb3kiLCJtc2UiLCJjdXJyZW50U3JjIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVh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RDs7QUFFRHl6QyxhQUFZO0FBQ1YsU0FBS3I0QyxPQUFMLENBQWE0RSxPQUFiO0FBQ0EsU0FBSzJ5QyxHQUFMLEdBQVcsSUFBWDtBQUNBLFNBQUt2M0MsT0FBTCxHQUFlLElBQWY7QUFDRDs7QUFFRCxNQUFJdVIsR0FBSixHQUFXO0FBQ1QsV0FBTyxLQUFLZ25DLFVBQVo7QUFDRDs7QUFFRCxNQUFJaG5DLEdBQUosQ0FBU3VQLEdBQVQsRUFBYztBQUNaLFNBQUsrMEIsTUFBTCxDQUFZaDVCLE1BQVosQ0FBbUJpRSxHQUFuQixHQUF5QkEsR0FBekI7QUFDQSxRQUFJLENBQUMsS0FBSzhsQixNQUFWLEVBQWtCO0FBQ2hCLFdBQUs1RCxLQUFMO0FBQ0EsV0FBS2xoQyxJQUFMLENBQVUsT0FBVixFQUFtQixNQUFNO0FBQ3ZCLGFBQUtnRCxLQUFMLENBQVdnYyxHQUFYO0FBQ0QsT0FGRDtBQUdBLFdBQUtoZixJQUFMLENBQVUsU0FBVixFQUFxQixNQUFNO0FBQ3pCLGFBQUtxZ0MsSUFBTDtBQUNELE9BRkQ7QUFHRCxLQVJELE1BUU87QUFDTCxXQUFLcjlCLEtBQUwsQ0FBV2djLEdBQVg7QUFDRDtBQUNELFNBQUtoZixJQUFMLENBQVUsU0FBVixFQUFxQixNQUFNO0FBQ3pCLFdBQUt3L0IsV0FBTCxHQUFtQixDQUFuQjtBQUNELEtBRkQ7QUFHRDtBQXRINEI7O0FBeUgvQnZqQyxPQUFPQyxPQUFQLEdBQWlCbzVDLFNBQWpCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUhBLGFBQWEsbUNBQW1DLEVBQUUsSSIsImZpbGUiOiJtb2JpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUiA9IHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyA/IFJlZmxlY3QgOiBudWxsXG52YXIgUmVmbGVjdEFwcGx5ID0gUiAmJiB0eXBlb2YgUi5hcHBseSA9PT0gJ2Z1bmN0aW9uJ1xuICA/IFIuYXBwbHlcbiAgOiBmdW5jdGlvbiBSZWZsZWN0QXBwbHkodGFyZ2V0LCByZWNlaXZlciwgYXJncykge1xuICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbCh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKTtcbiAgfVxuXG52YXIgUmVmbGVjdE93bktleXNcbmlmIChSICYmIHR5cGVvZiBSLm93bktleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgUmVmbGVjdE93bktleXMgPSBSLm93bktleXNcbn0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpXG4gICAgICAuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSk7XG4gIH07XG59IGVsc2Uge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBQcm9jZXNzRW1pdFdhcm5pbmcod2FybmluZykge1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbn1cblxudmFyIE51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uIE51bWJlcklzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgRXZlbnRFbWl0dGVyLmluaXQuY2FsbCh0aGlzKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50c0NvdW50ID0gMDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxudmFyIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50RW1pdHRlciwgJ2RlZmF1bHRNYXhMaXN0ZW5lcnMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oYXJnKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcgIT09ICdudW1iZXInIHx8IGFyZyA8IDAgfHwgTnVtYmVySXNOYU4oYXJnKSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgYXJnICsgJy4nKTtcbiAgICB9XG4gICAgZGVmYXVsdE1heExpc3RlbmVycyA9IGFyZztcbiAgfVxufSk7XG5cbkV2ZW50RW1pdHRlci5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgaWYgKHRoaXMuX2V2ZW50cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICB0aGlzLl9ldmVudHMgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzKSB7XG4gICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufTtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBuIDwgMCB8fCBOdW1iZXJJc05hTihuKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJuXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIG4gKyAnLicpO1xuICB9XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gJGdldE1heExpc3RlbmVycyh0aGF0KSB7XG4gIGlmICh0aGF0Ll9tYXhMaXN0ZW5lcnMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIHJldHVybiB0aGF0Ll9tYXhMaXN0ZW5lcnM7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gJGdldE1heExpc3RlbmVycyh0aGlzKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICB2YXIgYXJncyA9IFtdO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIHZhciBkb0Vycm9yID0gKHR5cGUgPT09ICdlcnJvcicpO1xuXG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZClcbiAgICBkb0Vycm9yID0gKGRvRXJyb3IgJiYgZXZlbnRzLmVycm9yID09PSB1bmRlZmluZWQpO1xuICBlbHNlIGlmICghZG9FcnJvcilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAoZG9FcnJvcikge1xuICAgIHZhciBlcjtcbiAgICBpZiAoYXJncy5sZW5ndGggPiAwKVxuICAgICAgZXIgPSBhcmdzWzBdO1xuICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAvLyBOb3RlOiBUaGUgY29tbWVudHMgb24gdGhlIGB0aHJvd2AgbGluZXMgYXJlIGludGVudGlvbmFsLCB0aGV5IHNob3dcbiAgICAgIC8vIHVwIGluIE5vZGUncyBvdXRwdXQgaWYgdGhpcyByZXN1bHRzIGluIGFuIHVuaGFuZGxlZCBleGNlcHRpb24uXG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICB9XG4gICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuaGFuZGxlZCBlcnJvci4nICsgKGVyID8gJyAoJyArIGVyLm1lc3NhZ2UgKyAnKScgOiAnJykpO1xuICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgdGhyb3cgZXJyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICB9XG5cbiAgdmFyIGhhbmRsZXIgPSBldmVudHNbdHlwZV07XG5cbiAgaWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgUmVmbGVjdEFwcGx5KGhhbmRsZXIsIHRoaXMsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBSZWZsZWN0QXBwbHkobGlzdGVuZXJzW2ldLCB0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuZnVuY3Rpb24gX2FkZExpc3RlbmVyKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIsIHByZXBlbmQpIHtcbiAgdmFyIG07XG4gIHZhciBldmVudHM7XG4gIHZhciBleGlzdGluZztcblxuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cblxuICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRhcmdldC5fZXZlbnRzQ291bnQgPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICAgIGlmIChldmVudHMubmV3TGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0LmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyID8gbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgICAgIC8vIFJlLWFzc2lnbiBgZXZlbnRzYCBiZWNhdXNlIGEgbmV3TGlzdGVuZXIgaGFuZGxlciBjb3VsZCBoYXZlIGNhdXNlZCB0aGVcbiAgICAgIC8vIHRoaXMuX2V2ZW50cyB0byBiZSBhc3NpZ25lZCB0byBhIG5ldyBvYmplY3RcbiAgICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICAgIH1cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXTtcbiAgfVxuXG4gIGlmIChleGlzdGluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICArK3RhcmdldC5fZXZlbnRzQ291bnQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBleGlzdGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9XG4gICAgICAgIHByZXBlbmQgPyBbbGlzdGVuZXIsIGV4aXN0aW5nXSA6IFtleGlzdGluZywgbGlzdGVuZXJdO1xuICAgICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIH0gZWxzZSBpZiAocHJlcGVuZCkge1xuICAgICAgZXhpc3RpbmcudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4aXN0aW5nLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gICAgbSA9ICRnZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICBpZiAobSA+IDAgJiYgZXhpc3RpbmcubGVuZ3RoID4gbSAmJiAhZXhpc3Rpbmcud2FybmVkKSB7XG4gICAgICBleGlzdGluZy53YXJuZWQgPSB0cnVlO1xuICAgICAgLy8gTm8gZXJyb3IgY29kZSBmb3IgdGhpcyBzaW5jZSBpdCBpcyBhIFdhcm5pbmdcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nLmxlbmd0aCArICcgJyArIFN0cmluZyh0eXBlKSArICcgbGlzdGVuZXJzICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnaW5jcmVhc2UgbGltaXQnKTtcbiAgICAgIHcubmFtZSA9ICdNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmcnO1xuICAgICAgdy5lbWl0dGVyID0gdGFyZ2V0O1xuICAgICAgdy50eXBlID0gdHlwZTtcbiAgICAgIHcuY291bnQgPSBleGlzdGluZy5sZW5ndGg7XG4gICAgICBQcm9jZXNzRW1pdFdhcm5pbmcodyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuXG5mdW5jdGlvbiBvbmNlV3JhcHBlcigpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBSZWZsZWN0QXBwbHkodGhpcy5saXN0ZW5lciwgdGhpcy50YXJnZXQsIGFyZ3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJlcGVuZExpc3RlbmVyKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuLy8gRW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmIGFuZCBvbmx5IGlmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgbGlzdCwgZXZlbnRzLCBwb3NpdGlvbiwgaSwgb3JpZ2luYWxMaXN0ZW5lcjtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgbGlzdCA9IGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHwgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3QubGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yIChpID0gbGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fCBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgb3JpZ2luYWxMaXN0ZW5lciA9IGxpc3RbaV0ubGlzdGVuZXI7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMClcbiAgICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNwbGljZU9uZShsaXN0LCBwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgZXZlbnRzW3R5cGVdID0gbGlzdFswXTtcblxuICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIG9yaWdpbmFsTGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbiAgICBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnModHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycywgZXZlbnRzLCBpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudHNbdHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBMSUZPIG9yZGVyXG4gICAgICAgIGZvciAoaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5mdW5jdGlvbiBfbGlzdGVuZXJzKHRhcmdldCwgdHlwZSwgdW53cmFwKSB7XG4gIHZhciBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuICBpZiAoZXZsaXN0ZW5lciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIHVud3JhcCA/IFtldmxpc3RlbmVyLmxpc3RlbmVyIHx8IGV2bGlzdGVuZXJdIDogW2V2bGlzdGVuZXJdO1xuXG4gIHJldHVybiB1bndyYXAgP1xuICAgIHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKSA6IGFycmF5Q2xvbmUoZXZsaXN0ZW5lciwgZXZsaXN0ZW5lci5sZW5ndGgpO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIHRydWUpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yYXdMaXN0ZW5lcnMgPSBmdW5jdGlvbiByYXdMaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcblxuICAgIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChldmxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgcmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50ID4gMCA/IFJlZmxlY3RPd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBuKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KG4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSlcbiAgICBjb3B5W2ldID0gYXJyW2ldO1xuICByZXR1cm4gY29weTtcbn1cblxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAoOyBpbmRleCArIDEgPCBsaXN0Lmxlbmd0aDsgaW5kZXgrKylcbiAgICBsaXN0W2luZGV4XSA9IGxpc3RbaW5kZXggKyAxXTtcbiAgbGlzdC5wb3AoKTtcbn1cblxuZnVuY3Rpb24gdW53cmFwTGlzdGVuZXJzKGFycikge1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGFyci5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5sZW5ndGg7ICsraSkge1xuICAgIHJldFtpXSA9IGFycltpXS5saXN0ZW5lciB8fCBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBUcmFjazogcmVxdWlyZSgnLi9zcmMvdHJhY2snKS5kZWZhdWx0LFxuICBUcmFja3M6IHJlcXVpcmUoJy4vc3JjL3RyYWNrJykuVHJhY2tzLFxuICBBdWRpb1RyYWNrOiByZXF1aXJlKCcuL3NyYy90cmFjaycpLkF1ZGlvVHJhY2ssXG4gIFZpZGVvVHJhY2s6IHJlcXVpcmUoJy4vc3JjL3RyYWNrJykuVmlkZW9UcmFjayxcblxuICBYZ0J1ZmZlcjogcmVxdWlyZSgnLi9zcmMvYnVmZmVyJykuWGdCdWZmZXIsXG4gIFJlbXV4QnVmZmVyOiByZXF1aXJlKCcuL3NyYy9idWZmZXInKS5SZW11eEJ1ZmZlcixcblxuICBQcmVTb3VyY2U6IHJlcXVpcmUoJy4vc3JjL3ByZXNvdWNlJykuZGVmYXVsdFxufTtcbiIsImV4cG9ydCBjbGFzcyBYZ0J1ZmZlciB7XG4gIC8qKlxuICAgKiBBIGJ1ZmZlciB0byBzdG9yZSBsb2FkZWQgZGF0YS5cbiAgICpcbiAgICogQGNsYXNzIExvYWRlckJ1ZmZlclxuICAgKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoIC0gT3B0aW9uYWwgdGhlIGJ1ZmZlciBzaXplXG4gICAqL1xuICBjb25zdHJ1Y3RvciAobGVuZ3RoKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGggfHwgMFxuICAgIHRoaXMuaGlzdG9yeUxlbiA9IGxlbmd0aCB8fCAwXG4gICAgdGhpcy5hcnJheSA9IFtdXG4gICAgdGhpcy5vZmZzZXQgPSAwXG4gIH1cblxuICAvKipcbiAgICogVGhlIGZ1bmN0aW9uIHRvIHB1c2ggZGF0YS5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IGRhdGEgLSBUaGUgZGF0YSB0byBwdXNoIGludG8gdGhlIGJ1ZmZlclxuICAgKi9cbiAgcHVzaCAoZGF0YSkge1xuICAgIHRoaXMuYXJyYXkucHVzaChkYXRhKVxuICAgIHRoaXMubGVuZ3RoICs9IGRhdGEuYnl0ZUxlbmd0aFxuICAgIHRoaXMuaGlzdG9yeUxlbiArPSBkYXRhLmJ5dGVMZW5ndGhcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZnVuY3Rpb24gdG8gc2hpZnQgZGF0YS5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aCAtIFRoZSBzaXplIG9mIHNoaWZ0LlxuICAgKi9cbiAgc2hpZnQgKGxlbmd0aCkge1xuICAgIGlmICh0aGlzLmFycmF5Lmxlbmd0aCA8IDEpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheSgwKVxuICAgIH1cblxuICAgIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NoaWZ0QnVmZmVyKClcbiAgICB9XG4gICAgaWYgKCh0aGlzLm9mZnNldCArIGxlbmd0aCkgPT09IHRoaXMuYXJyYXlbMF0ubGVuZ3RoKSB7XG4gICAgICBsZXQgcmV0ID0gdGhpcy5hcnJheVswXS5zbGljZSh0aGlzLm9mZnNldCwgdGhpcy5vZmZzZXQgKyBsZW5ndGgpXG4gICAgICB0aGlzLm9mZnNldCA9IDBcbiAgICAgIHRoaXMuYXJyYXkuc2hpZnQoKVxuICAgICAgdGhpcy5sZW5ndGggLT0gbGVuZ3RoXG4gICAgICByZXR1cm4gcmV0XG4gICAgfVxuXG4gICAgaWYgKCh0aGlzLm9mZnNldCArIGxlbmd0aCkgPCB0aGlzLmFycmF5WzBdLmxlbmd0aCkge1xuICAgICAgbGV0IHJldCA9IHRoaXMuYXJyYXlbMF0uc2xpY2UodGhpcy5vZmZzZXQsIHRoaXMub2Zmc2V0ICsgbGVuZ3RoKVxuICAgICAgdGhpcy5vZmZzZXQgKz0gbGVuZ3RoXG4gICAgICB0aGlzLmxlbmd0aCAtPSBsZW5ndGhcbiAgICAgIHJldHVybiByZXRcbiAgICB9XG5cbiAgICBsZXQgcmV0ID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKVxuICAgIGxldCB0bXBvZmYgPSAwXG4gICAgd2hpbGUgKHRoaXMuYXJyYXkubGVuZ3RoID4gMCAmJiBsZW5ndGggPiAwKSB7XG4gICAgICBpZiAoKHRoaXMub2Zmc2V0ICsgbGVuZ3RoKSA8IHRoaXMuYXJyYXlbMF0ubGVuZ3RoKSB7XG4gICAgICAgIGxldCB0bXAgPSB0aGlzLmFycmF5WzBdLnNsaWNlKHRoaXMub2Zmc2V0LCB0aGlzLm9mZnNldCArIGxlbmd0aClcbiAgICAgICAgcmV0LnNldCh0bXAsIHRtcG9mZilcbiAgICAgICAgdGhpcy5vZmZzZXQgKz0gbGVuZ3RoXG4gICAgICAgIHRoaXMubGVuZ3RoIC09IGxlbmd0aFxuICAgICAgICBsZW5ndGggPSAwXG4gICAgICAgIGJyZWFrXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgdGVtcGxlbmd0aCA9IHRoaXMuYXJyYXlbMF0ubGVuZ3RoIC0gdGhpcy5vZmZzZXRcbiAgICAgICAgcmV0LnNldCh0aGlzLmFycmF5WzBdLnNsaWNlKHRoaXMub2Zmc2V0LCB0aGlzLmFycmF5WzBdLmxlbmd0aCksIHRtcG9mZilcbiAgICAgICAgdGhpcy5hcnJheS5zaGlmdCgpXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gMFxuICAgICAgICB0bXBvZmYgKz0gdGVtcGxlbmd0aFxuICAgICAgICB0aGlzLmxlbmd0aCAtPSB0ZW1wbGVuZ3RoXG4gICAgICAgIGxlbmd0aCAtPSB0ZW1wbGVuZ3RoXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXRcbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0byBjbGVhciB0aGUgYnVmZmVyLlxuICAgKi9cbiAgY2xlYXIgKCkge1xuICAgIHRoaXMuYXJyYXkgPSBbXVxuICAgIHRoaXMubGVuZ3RoID0gMFxuICAgIHRoaXMub2Zmc2V0ID0gMFxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5jbGVhcigpXG4gICAgdGhpcy5oaXN0b3J5TGVuID0gMFxuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRvIHNoaWZ0IG9uZSB1bml0OEFycmF5LlxuICAgKi9cbiAgX3NoaWZ0QnVmZmVyICgpIHtcbiAgICB0aGlzLmxlbmd0aCAtPSB0aGlzLmFycmF5WzBdLmxlbmd0aFxuICAgIHRoaXMub2Zmc2V0ID0gMFxuICAgIHJldHVybiB0aGlzLmFycmF5LnNoaWZ0KClcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IHVpbnQ4IGRhdGEgdG8gbnVtYmVyLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgLSB0aGUgc3RhcnQgcG9zdGlvbi5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aCAtIHRoZSBsZW5ndGggb2YgZGF0YS5cbiAgICovXG4gIHRvSW50IChzdGFydCwgbGVuZ3RoKSB7XG4gICAgbGV0IHJldEludCA9IDBcbiAgICBsZXQgaSA9IHRoaXMub2Zmc2V0ICsgc3RhcnRcbiAgICB3aGlsZSAoaSA8IHRoaXMub2Zmc2V0ICsgbGVuZ3RoICsgc3RhcnQpIHtcbiAgICAgIGlmIChpIDwgdGhpcy5hcnJheVswXS5sZW5ndGgpIHtcbiAgICAgICAgcmV0SW50ID0gcmV0SW50ICogMjU2ICsgdGhpcy5hcnJheVswXVtpXVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmFycmF5WzFdKSB7XG4gICAgICAgIHJldEludCA9IHJldEludCAqIDI1NiArIHRoaXMuYXJyYXlbMV1baSAtIHRoaXMuYXJyYXlbMF0ubGVuZ3RoXVxuICAgICAgfVxuXG4gICAgICBpKytcbiAgICB9XG4gICAgcmV0dXJuIHJldEludFxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZW11eEJ1ZmZlciB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLnZpZGVvID0gW11cbiAgICB0aGlzLmF1ZGlvID0gW11cbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMudmlkZW8gPSBbXVxuICAgIHRoaXMuYXVkaW8gPSBbXVxuICB9XG59XG4iLCJjbGFzcyBTb3VyY2Uge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5taW1ldHlwZSA9ICcnO1xuICAgIHRoaXMuaW5pdCA9IG51bGw7XG4gICAgdGhpcy5kYXRhID0gW107XG4gIH1cbn1cblxuY2xhc3MgUHJlU291cmNlIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuc291cmNlcyA9IHt9O1xuICB9XG5cbiAgZ2V0U291cmNlIChzb3VyY2UpIHtcbiAgICByZXR1cm4gdGhpcy5zb3VyY2VzW3NvdXJjZV07XG4gIH1cblxuICBjcmVhdGVTb3VyY2UgKG5hbWUpIHtcbiAgICB0aGlzLnNvdXJjZXNbbmFtZV0gPSBuZXcgU291cmNlKCk7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlc1tuYW1lXTtcbiAgfVxuXG4gIGNsZWFyICgpIHtcbiAgICB0aGlzLnNvdXJjZXMgPSB7fTtcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuc291cmNlcyA9IHt9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByZVNvdXJjZTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyYWNrIHtcbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3Rvci5cbiAgICovXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLmlkID0gLTFcbiAgICB0aGlzLnNlcXVlbmNlTnVtYmVyID0gMFxuICAgIHRoaXMuc2FtcGxlcyA9IFtdXG4gICAgdGhpcy5kcm9wcGVkU2FtcGxlcyA9IFtdXG4gICAgdGhpcy5sZW5ndGggPSAwXG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhlIHRyYWNrLlxuICAgKi9cbiAgcmVzZXQgKCkge1xuICAgIHRoaXMuc2VxdWVuY2VOdW1iZXIgPSAwXG4gICAgdGhpcy5zYW1wbGVzID0gW11cbiAgICB0aGlzLmxlbmd0aCA9IDBcbiAgfVxuICAvKipcbiAgICogZGVzdHJveSB0aGUgdHJhY2suXG4gICAqL1xuICBkaXN0cm95ICgpIHtcbiAgICB0aGlzLnJlc2V0KClcbiAgICB0aGlzLmlkID0gLTFcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQXVkaW9UcmFjayBleHRlbmRzIFRyYWNrIHtcbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgYXVkaW8gdHJhY2suXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuVEFHID0gJ0F1ZGlvVHJhY2snXG4gICAgdGhpcy50eXBlID0gJ2F1ZGlvJ1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWaWRlb1RyYWNrIGV4dGVuZHMgVHJhY2sge1xuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB2aWRlbyB0cmFjay5cbiAgICovXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5UQUcgPSAnVmlkZW9UcmFjaydcbiAgICB0aGlzLnR5cGUgPSAndmlkZW8nXG4gICAgdGhpcy5kcm9wcGVkID0gMFxuICB9XG4gIC8qKlxuICAgKiByZXNldCB0aGUgdmlkZW8gdHJhY2suXG4gICAqL1xuICByZXNldCAoKSB7XG4gICAgdGhpcy5zZXF1ZW5jZU51bWJlciA9IDBcbiAgICB0aGlzLnNhbXBsZXMgPSBbXVxuICAgIHRoaXMubGVuZ3RoID0gMFxuICAgIHRoaXMuZHJvcHBlZCA9IDBcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVHJhY2tzIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuYXVkaW9UcmFjayA9IG51bGxcbiAgICB0aGlzLnZpZGVvVHJhY2sgPSBudWxsXG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmF1ZGlvVHJhY2sgPSBudWxsXG4gICAgdGhpcy52aWRlb1RyYWNrID0gbnVsbFxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgTmFsdW5pdDogcmVxdWlyZSgnLi9zcmMvaDI2NC9uYWx1bml0JykuZGVmYXVsdCxcbiAgU3BzUGFyc2VyOiByZXF1aXJlKCcuL3NyYy9oMjY0L25hbHVuaXQvc3BzJykuZGVmYXVsdCxcblxuICBDb21wYXRpYmlsaXR5OiByZXF1aXJlKCcuL3NyYy9jb21wYXRpYmlsaXR5JykuZGVmYXVsdFxufTtcbiIsIlxuY2xhc3MgQUFDIHtcblxuICBzdGF0aWMgZ2V0U2lsZW50RnJhbWUoY29kZWMsIGNoYW5uZWxDb3VudCkge1xuICAgIGlmIChjb2RlYyA9PT0gJ21wNGEuNDAuMicpIHtcbiAgICAgIC8vIGhhbmRsZSBMQy1BQUNcbiAgICAgIGlmIChjaGFubmVsQ291bnQgPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDAwLCAweGM4LCAweDAwLCAweDgwLCAweDIzLCAweDgwXSk7XG4gICAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gMikge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MjEsIDB4MDAsIDB4NDksIDB4OTAsIDB4MDIsIDB4MTksIDB4MDAsIDB4MjMsIDB4ODBdKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSAzKSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4ZV0pO1xuICAgICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDAwLCAweGM4LCAweDAwLCAweDgwLCAweDIwLCAweDg0LCAweDAxLCAweDI2LCAweDQwLCAweDA4LCAweDY0LCAweDAwLCAweDgwLCAweDJjLCAweDgwLCAweDA4LCAweDAyLCAweDM4XSk7XG4gICAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gNSkge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4ODIsIDB4MzAsIDB4MDQsIDB4OTksIDB4MDAsIDB4MjEsIDB4OTAsIDB4MDIsIDB4MzhdKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSA2KSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4MiwgMHgzMCwgMHgwNCwgMHg5OSwgMHgwMCwgMHgyMSwgMHg5MCwgMHgwMiwgMHgwMCwgMHhiMiwgMHgwMCwgMHgyMCwgMHgwOCwgMHhlMF0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBoYW5kbGUgSEUtQUFDIChtcDRhLjQwLjUgLyBtcDRhLjQwLjI5KVxuICAgICAgaWYgKGNoYW5uZWxDb3VudCA9PT0gMSkge1xuICAgICAgICAvLyBmZm1wZWcgLXkgLWYgbGF2ZmkgLWkgXCJhZXZhbHNyYz0wOmQ9MC4wNVwiIC1jOmEgbGliZmRrX2FhYyAtcHJvZmlsZTphIGFhY19oZSAtYjphIDRrIG91dHB1dC5hYWMgJiYgaGV4ZHVtcCAtdiAtZSAnMTYvMSBcIjB4JXgsXCIgXCJcXG5cIicgLXYgb3V0cHV0LmFhY1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MSwgMHg0MCwgMHgyMiwgMHg4MCwgMHhhMywgMHg0ZSwgMHhlNiwgMHg4MCwgMHhiYSwgMHg4LCAweDAsIDB4MCwgMHgwLCAweDFjLCAweDYsIDB4ZjEsIDB4YzEsIDB4YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1ZV0pO1xuICAgICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDIpIHtcbiAgICAgICAgLy8gZmZtcGVnIC15IC1mIGxhdmZpIC1pIFwiYWV2YWxzcmM9MHwwOmQ9MC4wNVwiIC1jOmEgbGliZmRrX2FhYyAtcHJvZmlsZTphIGFhY19oZV92MiAtYjphIDRrIG91dHB1dC5hYWMgJiYgaGV4ZHVtcCAtdiAtZSAnMTYvMSBcIjB4JXgsXCIgXCJcXG5cIicgLXYgb3V0cHV0LmFhY1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MSwgMHg0MCwgMHgyMiwgMHg4MCwgMHhhMywgMHg1ZSwgMHhlNiwgMHg4MCwgMHhiYSwgMHg4LCAweDAsIDB4MCwgMHgwLCAweDAsIDB4OTUsIDB4MCwgMHg2LCAweGYxLCAweGExLCAweGEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWVdKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSAzKSB7XG4gICAgICAgIC8vIGZmbXBlZyAteSAtZiBsYXZmaSAtaSBcImFldmFsc3JjPTB8MHwwOmQ9MC4wNVwiIC1jOmEgbGliZmRrX2FhYyAtcHJvZmlsZTphIGFhY19oZV92MiAtYjphIDRrIG91dHB1dC5hYWMgJiYgaGV4ZHVtcCAtdiAtZSAnMTYvMSBcIjB4JXgsXCIgXCJcXG5cIicgLXYgb3V0cHV0LmFhY1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MSwgMHg0MCwgMHgyMiwgMHg4MCwgMHhhMywgMHg1ZSwgMHhlNiwgMHg4MCwgMHhiYSwgMHg4LCAweDAsIDB4MCwgMHgwLCAweDAsIDB4OTUsIDB4MCwgMHg2LCAweGYxLCAweGExLCAweGEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWVdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBQUM7XG4iLCJpbXBvcnQge0VWRU5UU30gZnJvbSAneGdwbGF5ZXItdXRpbHMnXG5pbXBvcnQgQUFDIGZyb20gJy4vYWFjL2FhYy1oZWxwZXInXG5cbmNvbnN0IHtSRU1VWF9FVkVOVFMsIERFTVVYX0VWRU5UU30gPSBFVkVOVFNcblxuY2xhc3MgQ29tcGF0aWJpbGl0eSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLm5leHRBdWRpb0R0cyA9IDAgLy8g5qih5ouf5LiL5LiA5q616Z+z6aKR5pWw5o2u55qEZHRzXG4gICAgdGhpcy5uZXh0VmlkZW9EdHMgPSAwIC8vIOaooeaLn+S4i+S4gOauteinhumikeaVsOaNrueahGR0c1xuXG4gICAgdGhpcy5sYXN0QXVkaW9TYW1wbGVzTGVuID0gMCAvLyDkuIrkuIDmrrXpn7PpopHmlbDmja7nmoTplb/luqZcbiAgICB0aGlzLmxhc3RWaWRlb1NhbXBsZXNMZW4gPSAwIC8vIOS4iuS4gOauteinhumikeaVsOaNrueahOmVv+W6plxuXG4gICAgdGhpcy5sYXN0VmlkZW9EdHMgPSB1bmRlZmluZWQgLy8g5LiK5LiA5q616Z+z6aKR5pWw5o2u55qE6ZW/5bqmXG4gICAgdGhpcy5sYXN0QXVkaW9EdHMgPSB1bmRlZmluZWQgLy8g5LiK5LiA5q616KeG6aKR5pWw5o2u55qE6ZW/5bqmXG5cbiAgICB0aGlzLmFsbEF1ZGlvU2FtcGxlc0NvdW50ID0gMCAvLyDpn7PpopHmgLvmlbDmja7ph48o5Y6f5aeL5binKVxuICAgIHRoaXMuYWxsVmlkZW9TYW1wbGVzQ291bnQgPSAwIC8vIOinhumikeaAu+aVsOaNrumHjyjljp/lp4vluKcpXG5cbiAgICB0aGlzLl9maXJzdEF1ZGlvU2FtcGxlID0gbnVsbFxuICAgIHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUgPSBudWxsXG5cbiAgICB0aGlzLmZpbGxlZEF1ZGlvU2FtcGxlcyA9IFtdIC8vIOihpeWFhemfs+mikeW4p++8iO+8iVxuICAgIHRoaXMuZmlsbGVkVmlkZW9TYW1wbGVzID0gW10gLy8g6KGl5YWF6KeG6aKR5bin77yI77yJXG5cbiAgICB0aGlzLl92aWRlb0xhcmdlR2FwID0gMFxuICAgIHRoaXMuX2F1ZGlvTGFyZ2VHYXAgPSAwXG4gIH1cblxuICBpbml0ICgpIHtcbiAgICB0aGlzLmJlZm9yZShSRU1VWF9FVkVOVFMuUkVNVVhfTUVESUEsIHRoaXMuZG9GaXguYmluZCh0aGlzKSlcbiAgfVxuXG4gIHJlc2V0ICgpIHtcbiAgICB0aGlzLm5leHRBdWRpb0R0cyA9IG51bGwgLy8g5Lyw566X5LiL5LiA5q616Z+z6aKR5pWw5o2u55qEZHRzXG4gICAgdGhpcy5uZXh0VmlkZW9EdHMgPSBudWxsIC8vIOS8sOeul+S4i+S4gOauteinhumikeaVsOaNrueahGR0c1xuXG4gICAgdGhpcy5sYXN0QXVkaW9TYW1wbGVzTGVuID0gMCAvLyDkuIrkuIDmrrXpn7PpopHmlbDmja7nmoTplb/luqZcbiAgICB0aGlzLmxhc3RWaWRlb1NhbXBsZXNMZW4gPSAwIC8vIOS4iuS4gOauteinhumikeaVsOaNrueahOmVv+W6plxuXG4gICAgdGhpcy5sYXN0VmlkZW9EdHMgPSB1bmRlZmluZWQgLy8g5LiK5LiA5q616Z+z6aKR5pWw5o2u55qE6ZW/5bqmXG4gICAgdGhpcy5sYXN0QXVkaW9EdHMgPSB1bmRlZmluZWQgLy8g5LiK5LiA5q616KeG6aKR5pWw5o2u55qE6ZW/5bqmXG5cbiAgICAvLyB0aGlzLmFsbEF1ZGlvU2FtcGxlc0NvdW50ID0gMCAvLyDpn7PpopHmgLvmlbDmja7ph48o5Y6f5aeL5binKVxuICAgIC8vIHRoaXMuYWxsVmlkZW9TYW1wbGVzQ291bnQgPSAwIC8vIOinhumikeaAu+aVsOaNrumHjyjljp/lp4vluKcpXG5cbiAgICAvLyB0aGlzLl9maXJzdEF1ZGlvU2FtcGxlID0gbnVsbFxuICAgIC8vIHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUgPSBudWxsXG5cbiAgICB0aGlzLmZpbGxlZEF1ZGlvU2FtcGxlcyA9IFtdIC8vIOihpeWFhemfs+mikeW4p++8iO+8iVxuICAgIHRoaXMuZmlsbGVkVmlkZW9TYW1wbGVzID0gW10gLy8g6KGl5YWF6KeG6aKR5bin77yI77yJXG4gIH1cblxuICBkb0ZpeCAoKSB7XG4gICAgY29uc3QgeyBpc0ZpcnN0QXVkaW9TYW1wbGVzLCBpc0ZpcnN0VmlkZW9TYW1wbGVzIH0gPSB0aGlzLmdldEZpcnN0U2FtcGxlKClcblxuICAgIC8vIHRoaXMucmVtb3ZlSW52YWxpZFNhbXBsZXMoKVxuXG4gICAgdGhpcy5yZWNvcmRTYW1wbGVzQ291bnQoKVxuXG4gICAgaWYgKHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUpIHtcbiAgICAgIHRoaXMuZml4UmVmU2FtcGxlRHVyYXRpb24odGhpcy52aWRlb1RyYWNrLm1ldGEsIHRoaXMudmlkZW9UcmFjay5zYW1wbGVzKVxuICAgIH1cbiAgICBpZiAodGhpcy5fZmlyc3RBdWRpb1NhbXBsZSkge1xuICAgICAgdGhpcy5maXhSZWZTYW1wbGVEdXJhdGlvbih0aGlzLmF1ZGlvVHJhY2subWV0YSwgdGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMpXG4gICAgfVxuXG4gICAgY29uc3QgeyBjaGFuZ2VkOiB2aWRlb0NoYW5nZWQsIGNoYW5nZWRJZHg6IHZpZGVvQ2hhbmdlZElkeCB9ID0gQ29tcGF0aWJpbGl0eS5kZXRhY3RDaGFuZ2VTdHJlYW0odGhpcy52aWRlb1RyYWNrLnNhbXBsZXMpXG4gICAgaWYgKHZpZGVvQ2hhbmdlZCAmJiAhaXNGaXJzdEF1ZGlvU2FtcGxlcykge1xuICAgICAgdGhpcy5maXhDaGFuZ2VTdHJlYW1WaWRlbyh2aWRlb0NoYW5nZWRJZHgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZG9GaXhWaWRlbyhpc0ZpcnN0VmlkZW9TYW1wbGVzKVxuICAgIH1cblxuICAgIGNvbnN0IHsgY2hhbmdlZDogYXVkaW9DaGFuZ2VkLCBjaGFuZ2VkSWR4OiBhdWRpb0NoYW5nZWRJZHggfSA9IENvbXBhdGliaWxpdHkuZGV0YWN0Q2hhbmdlU3RyZWFtKHRoaXMuYXVkaW9UcmFjay5zYW1wbGVzKVxuICAgIGlmIChhdWRpb0NoYW5nZWQpIHtcbiAgICAgIHRoaXMuZml4Q2hhbmdlU3RyZWFtQXVkaW8oYXVkaW9DaGFuZ2VkSWR4KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRvRml4QXVkaW8oaXNGaXJzdEF1ZGlvU2FtcGxlcylcbiAgICB9XG5cbiAgICAvLyB0aGlzLnJlbW92ZUludmFsaWRTYW1wbGVzKClcbiAgfVxuXG4gIGRvRml4VmlkZW8gKGZpcnN0LCBzdHJlYW1DaGFuZ2VTdGFydCkge1xuICAgIGxldCB7c2FtcGxlczogdmlkZW9TYW1wbGVzLCBtZXRhfSA9IHRoaXMudmlkZW9UcmFja1xuXG4gICAgaWYgKG1ldGEuZnJhbWVSYXRlICYmIG1ldGEuZnJhbWVSYXRlLmZpeGVkID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdmlkZW9TYW1wbGVzIHx8ICF2aWRlb1NhbXBsZXMubGVuZ3RoIHx8ICF0aGlzLl9maXJzdFZpZGVvU2FtcGxlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBjb25zb2xlLmxvZyhgdmlkZW8gbGFzdFNhbXBsZSwgJHt2aWRlb1NhbXBsZXNbdmlkZW9TYW1wbGVzLmxlbmd0aCAtIDFdLmR0c31gKVxuXG4gICAgY29uc3QgZmlyc3RTYW1wbGUgPSB2aWRlb1NhbXBsZXNbMF1cblxuICAgIGNvbnN0IHNhbXBsZXNMZW4gPSB2aWRlb1NhbXBsZXMubGVuZ3RoO1xuXG4gICAgLy8gc3RlcDAu5L+u5aSNaGxz5rWB5Ye6546w5beo5aSnZ2Fw77yM6ZyA6KaB5by65Yi26YeN5a6a5L2N55qE6Zeu6aKYXG4gICAgaWYgKHRoaXMuX3ZpZGVvTGFyZ2VHYXAgPiAwKSB7XG4gICAgICBDb21wYXRpYmlsaXR5LmRvRml4TGFyZ2VHYXAodmlkZW9TYW1wbGVzLCB0aGlzLl92aWRlb0xhcmdlR2FwKVxuICAgIH1cblxuICAgIGlmIChmaXJzdFNhbXBsZS5kdHMgIT09IHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUuZHRzICYmIChzdHJlYW1DaGFuZ2VTdGFydCB8fCBDb21wYXRpYmlsaXR5LmRldGVjdExhcmdlR2FwKHRoaXMubmV4dFZpZGVvRHRzLCBmaXJzdFNhbXBsZSkpKSB7XG4gICAgICBpZiAoc3RyZWFtQ2hhbmdlU3RhcnQpIHtcbiAgICAgICAgdGhpcy5uZXh0VmlkZW9EdHMgPSBzdHJlYW1DaGFuZ2VTdGFydCAvLyBGSVg6IEhsc+S4remAlOWIh2NvZGVj77yM5Zyo5aaC5p6c55u05o6lc2Vla+WIsOWQjumdoueahOeCueS8muWvvOiHtGxhcmdlR2Fw6K6h566X5aSx6LSlXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3ZpZGVvTGFyZ2VHYXAgPSB0aGlzLm5leHRWaWRlb0R0cyAtIGZpcnN0U2FtcGxlLmR0c1xuICAgICAgQ29tcGF0aWJpbGl0eS5kb0ZpeExhcmdlR2FwKHZpZGVvU2FtcGxlcywgdGhpcy5fdmlkZW9MYXJnZUdhcClcbiAgICB9XG5cbiAgICBjb25zdCBmaXJzdER0cyA9IGZpcnN0U2FtcGxlLmR0c1xuXG4gICAgLy8gc3RlcDEuIOS/ruWkjeS4jmF1ZGlv6aaW5bin5beu6Led5aSq5aSn55qE6Zeu6aKYXG4gICAgaWYgKGZpcnN0ICYmIHRoaXMuX2ZpcnN0QXVkaW9TYW1wbGUpIHtcbiAgICAgIGNvbnN0IHZpZGVvRmlyc3REdHMgPSB0aGlzLl9maXJzdFZpZGVvU2FtcGxlLmR0c1xuICAgICAgY29uc3QgYXVkaW9GaXJzdER0cyA9IHRoaXMuX2ZpcnN0QXVkaW9TYW1wbGUuZHRzXG4gICAgICBjb25zdCBnYXAgPSB2aWRlb0ZpcnN0RHRzIC0gYXVkaW9GaXJzdER0c1xuICAgICAgaWYgKGdhcCA+ICgyICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbikpIHtcbiAgICAgICAgY29uc3QgZmlsbENvdW50ID0gTWF0aC5mbG9vcihnYXAgLyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsbENvdW50OyBpKyspIHtcbiAgICAgICAgICBjb25zdCBjbG9uZWRGaXJzdFNhbXBsZSA9IE9iamVjdC5hc3NpZ24oe30sIGZpcnN0U2FtcGxlKSAvLyDop4bpopHlpLTpg6jluKfnvLrlpLHpnIDopoHlpI3liLbnrKzkuIDluKdcbiAgICAgICAgICAvLyDph43mlrDorqHnrpdzYW1wbGXnmoRkdHPlkoxwdHNcbiAgICAgICAgICBjbG9uZWRGaXJzdFNhbXBsZS5kdHMgPSB2aWRlb0ZpcnN0RHRzIC0gKGkgKyAxKSAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb25cbiAgICAgICAgICBjbG9uZWRGaXJzdFNhbXBsZS5wdHMgPSBjbG9uZWRGaXJzdFNhbXBsZS5kdHMgKyBjbG9uZWRGaXJzdFNhbXBsZS5jdHNcblxuICAgICAgICAgIHZpZGVvU2FtcGxlcy51bnNoaWZ0KGNsb25lZEZpcnN0U2FtcGxlKVxuXG4gICAgICAgICAgdGhpcy5maWxsZWRWaWRlb1NhbXBsZXMucHVzaCh7XG4gICAgICAgICAgICBkdHM6IGNsb25lZEZpcnN0U2FtcGxlLmR0cyxcbiAgICAgICAgICAgIHNpemU6IGNsb25lZEZpcnN0U2FtcGxlLmRhdGEuYnl0ZUxlbmd0aFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgZ2FwXG4gICAgLy8gc3RlcDIuIOS/ruWkjXNhbXBsZXPmrrXkuYvpl7TnmoTpl7Tot53pl67popjjgIFcbiAgICBpZiAodGhpcy5uZXh0VmlkZW9EdHMpIHtcbiAgICAgIC8vIHN0ZXAxLiDlpITnkIZzYW1wbGVz5q615LmL6Ze055qE5Lii5bin5oOF5Ya1XG4gICAgICAvLyDlvZPlj5HnjrBkdXJhdGlvbuW3rui3neWkp+S6jjLluKfml7bov5vooYzooaXluKdcbiAgICAgIGdhcCA9IGZpcnN0RHRzIC0gdGhpcy5uZXh0VmlkZW9EdHNcbiAgICAgIGNvbnN0IGFic0dhcCA9IE1hdGguYWJzKGdhcClcbiAgICAgIGlmIChnYXAgPiAoMiAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pKSB7XG4gICAgICAgIGNvbnN0IGZpbGxGcmFtZUNvdW50ID0gTWF0aC5mbG9vcihnYXAgLyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsbEZyYW1lQ291bnQ7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGNsb25lZFNhbXBsZSA9IE9iamVjdC5hc3NpZ24oe30sIHZpZGVvU2FtcGxlc1swXSlcbiAgICAgICAgICBjb25zdCBjb21wdXRlZCA9IGZpcnN0RHRzIC0gKGkgKyAxKSAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb25cblxuICAgICAgICAgIGNsb25lZFNhbXBsZS5kdHMgPSBjb21wdXRlZCA+IHRoaXMubmV4dFZpZGVvRHRzID8gY29tcHV0ZWQgOiB0aGlzLm5leHRWaWRlb0R0cyAvLyDooaXnmoTnrKzkuIDluKfkuIDlrpropoHmmK9uZXh0VmlkZW9EdHNcbiAgICAgICAgICBjbG9uZWRTYW1wbGUucHRzID0gY2xvbmVkU2FtcGxlLmR0cyArIGNsb25lZFNhbXBsZS5jdHNcblxuICAgICAgICAgIHRoaXMudmlkZW9UcmFjay5zYW1wbGVzLnVuc2hpZnQoY2xvbmVkU2FtcGxlKVxuXG4gICAgICAgICAgdGhpcy5maWxsZWRWaWRlb1NhbXBsZXMucHVzaCh7XG4gICAgICAgICAgICBkdHM6IGNsb25lZFNhbXBsZS5kdHMsXG4gICAgICAgICAgICBzaXplOiBjbG9uZWRTYW1wbGUuZGF0YS5ieXRlTGVuZ3RoXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChhYnNHYXAgPD0gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiAmJiBhYnNHYXAgPiAwKSB7XG4gICAgICAgIC8vIOW9k+W3rui3neWcqCst5LiA5bin5LmL6Ze05pe25bCG56ys5LiA5bin55qEZHRz5by66KGM5a6a5L2N5Yiw5pyf5pyb5L2N572uXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCfph43lrprkvY3op4bpopHluKdkdHMnLCB2aWRlb1NhbXBsZXNbMF0uZHRzLCB0aGlzLm5leHRWaWRlb0R0cylcbiAgICAgICAgdmlkZW9TYW1wbGVzWzBdLmR0cyA9IHRoaXMubmV4dFZpZGVvRHRzXG4gICAgICAgIHZpZGVvU2FtcGxlc1swXS5vcmlnaW5EdHMgPSB2aWRlb1NhbXBsZXNbMF0uZHRzXG4gICAgICAgIHZpZGVvU2FtcGxlc1swXS5jdHMgPSB2aWRlb1NhbXBsZXNbMF0uY3RzICE9PSB1bmRlZmluZWQgPyB2aWRlb1NhbXBsZXNbMF0uY3RzIDogdmlkZW9TYW1wbGVzWzBdLnB0cyAtIHZpZGVvU2FtcGxlc1swXS5kdHNcbiAgICAgICAgdmlkZW9TYW1wbGVzWzBdLnB0cyA9IHZpZGVvU2FtcGxlc1swXS5kdHMgKyB2aWRlb1NhbXBsZXNbMF0uY3RzXG4gICAgICB9IGVsc2UgaWYgKGdhcCA8IDApIHtcbiAgICAgICAgLy8g5Ye6546w5aSn55qEZ2FwXG4gICAgICAgIENvbXBhdGliaWxpdHkuZG9GaXhMYXJnZUdhcCh2aWRlb1NhbXBsZXMsICgtMSAqIGdhcCkpXG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGxhc3REdHMgPSB2aWRlb1NhbXBsZXNbdmlkZW9TYW1wbGVzLmxlbmd0aCAtIDFdLmR0cztcblxuICAgIGNvbnN0IGxhc3RTYW1wbGVEdXJhdGlvbiA9IHZpZGVvU2FtcGxlcy5sZW5ndGggPj0gMiA/IGxhc3REdHMgLSB2aWRlb1NhbXBsZXNbdmlkZW9TYW1wbGVzLmxlbmd0aCAtIDJdLmR0cyA6IG1ldGEucmVmU2FtcGxlRHVyYXRpb25cblxuICAgIHRoaXMubGFzdFZpZGVvU2FtcGxlc0xlbiA9IHNhbXBsZXNMZW5cbiAgICB0aGlzLm5leHRWaWRlb0R0cyA9IGxhc3REdHMgKyBsYXN0U2FtcGxlRHVyYXRpb25cbiAgICB0aGlzLmxhc3RWaWRlb0R0cyA9IGxhc3REdHNcblxuICAgIC8vIHN0ZXAyLiDkv67lpI1zYW1wbGXmrrXkuYvlhoXnmoTpl7Tot53pl67pophcbiAgICAvLyBzdGVwMy4g5L+u5aSNc2FtcGxlc+auteWGhemDqOeahGR0c+W8guW4uOmXrumimFxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB2aWRlb1NhbXBsZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSB2aWRlb1NhbXBsZXNbaV1cbiAgICAgIGNvbnN0IG5leHQgPSB2aWRlb1NhbXBsZXNbaSArIDFdXG5cbiAgICAgIGlmICghbmV4dCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY29uc3QgZHVyYXRpb24gPSBuZXh0LmR0cyAtIGN1cnJlbnQuZHRzO1xuXG4gICAgICBpZiAoZHVyYXRpb24gPiAoMiAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pKSB7XG4gICAgICAgIC8vIOS4pOW4p+S5i+mXtOmXtOmalOWkquWkp++8jOmcgOimgeihpeepuueZveW4p1xuICAgICAgICBsZXQgZmlsbEZyYW1lQ291bnQgPSBNYXRoLmZsb29yKGR1cmF0aW9uIC8gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbilcblxuICAgICAgICBsZXQgZmlsbEZyYW1lSWR4ID0gMFxuICAgICAgICB3aGlsZSAoZmlsbEZyYW1lSWR4IDwgZmlsbEZyYW1lQ291bnQpIHtcbiAgICAgICAgICBjb25zdCBmaWxsRnJhbWUgPSBPYmplY3QuYXNzaWduKHt9LCBuZXh0KVxuICAgICAgICAgIGZpbGxGcmFtZS5kdHMgPSBjdXJyZW50LmR0cyArIChmaWxsRnJhbWVJZHggKyAxKSAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb25cbiAgICAgICAgICBmaWxsRnJhbWUucHRzID0gZmlsbEZyYW1lLmR0cyArIGZpbGxGcmFtZS5jdHNcbiAgICAgICAgICBpZiAoZmlsbEZyYW1lIDwgbmV4dC5kdHMpIHtcbiAgICAgICAgICAgIHZpZGVvU2FtcGxlcy5zcGxpY2UoaSwgMCwgZmlsbEZyYW1lKVxuXG4gICAgICAgICAgICB0aGlzLmZpbGxlZFZpZGVvU2FtcGxlcy5wdXNoKHtcbiAgICAgICAgICAgICAgZHRzOiBmaWxsRnJhbWUuZHRzLFxuICAgICAgICAgICAgICBzaXplOiBmaWxsRnJhbWUuZGF0YS5ieXRlTGVuZ3RoXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZpbGxGcmFtZUlkeCsrXG4gICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy52aWRlb1RyYWNrLnNhbXBsZXMgPSB2aWRlb1NhbXBsZXM7XG4gIH1cblxuICBkb0ZpeEF1ZGlvIChmaXJzdCwgc3RyZWFtQ2hhbmdlU3RhcnQpIHtcbiAgICBsZXQge3NhbXBsZXM6IGF1ZGlvU2FtcGxlcywgbWV0YX0gPSB0aGlzLmF1ZGlvVHJhY2tcblxuICAgIGlmICghYXVkaW9TYW1wbGVzIHx8ICFhdWRpb1NhbXBsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2coYGF1ZGlvIGxhc3RTYW1wbGUsICR7YXVkaW9TYW1wbGVzW2F1ZGlvU2FtcGxlcy5sZW5ndGggLSAxXS5kdHN9YClcblxuICAgIGNvbnN0IHNhbXBsZXNMZW4gPSBhdWRpb1NhbXBsZXMubGVuZ3RoO1xuICAgIGNvbnN0IHNpbGVudEZyYW1lID0gQUFDLmdldFNpbGVudEZyYW1lKG1ldGEuY29kZWMsIG1ldGEuY2hhbm5lbENvdW50KVxuXG4gICAgY29uc3QgZmlyc3RTYW1wbGUgPSB0aGlzLl9maXJzdEF1ZGlvU2FtcGxlXG5cbiAgICBjb25zdCBfZmlyc3RTYW1wbGUgPSBhdWRpb1NhbXBsZXNbMF1cbiAgICAvLyDlr7lhdWRpb1NhbXBsZXPmjInnhadkdHPlgZrmjpLluo9cbiAgICAvLyBhdWRpb1NhbXBsZXMgPSBDb21wYXRpYmlsaXR5LnNvcnRBdWRpb1NhbXBsZXMoYXVkaW9TYW1wbGVzKVxuICAgIGlmICh0aGlzLl9hdWRpb0xhcmdlR2FwID4gMCkge1xuICAgICAgQ29tcGF0aWJpbGl0eS5kb0ZpeExhcmdlR2FwKGF1ZGlvU2FtcGxlcywgdGhpcy5fYXVkaW9MYXJnZUdhcClcbiAgICB9XG5cbiAgICBpZiAoX2ZpcnN0U2FtcGxlLmR0cyAhPT0gdGhpcy5fZmlyc3RBdWRpb1NhbXBsZS5kdHMgJiYgKHN0cmVhbUNoYW5nZVN0YXJ0IHx8IENvbXBhdGliaWxpdHkuZGV0ZWN0TGFyZ2VHYXAodGhpcy5uZXh0QXVkaW9EdHMsIF9maXJzdFNhbXBsZSkpKSB7XG4gICAgICBpZiAoc3RyZWFtQ2hhbmdlU3RhcnQpIHtcbiAgICAgICAgdGhpcy5uZXh0QXVkaW9EdHMgPSBzdHJlYW1DaGFuZ2VTdGFydCAvLyBGSVg6IEhsc+S4remAlOWIh2NvZGVj77yM5Zyo5aaC5p6c55u05o6lc2Vla+WIsOWQjumdoueahOeCueS8muWvvOiHtGxhcmdlR2Fw6K6h566X5aSx6LSlXG4gICAgICB9XG4gICAgICB0aGlzLl9hdWRpb0xhcmdlR2FwID0gdGhpcy5uZXh0QXVkaW9EdHMgLSBfZmlyc3RTYW1wbGUuZHRzXG4gICAgICBDb21wYXRpYmlsaXR5LmRvRml4TGFyZ2VHYXAoYXVkaW9TYW1wbGVzLCB0aGlzLl9hdWRpb0xhcmdlR2FwKVxuICAgIH1cbiAgICAvLyBzdGVwMC4g6aaW5bin5LiOdmlkZW/pppbluKfpl7Tot53lpKfnmoTpl67pophcbiAgICBpZiAodGhpcy5fZmlyc3RWaWRlb1NhbXBsZSAmJiBmaXJzdCkge1xuICAgICAgY29uc3QgdmlkZW9GaXJzdFB0cyA9IHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUucHRzID8gdGhpcy5fZmlyc3RWaWRlb1NhbXBsZS5wdHMgOiB0aGlzLl9maXJzdFZpZGVvU2FtcGxlLmR0cyArIHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUuY3RzXG5cbiAgICAgIGlmIChmaXJzdFNhbXBsZS5kdHMgLSB2aWRlb0ZpcnN0UHRzID4gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbikge1xuICAgICAgICBjb25zdCBzaWxlbnRTYW1wbGVDb3VudCA9IE1hdGguZmxvb3IoKGZpcnN0U2FtcGxlLmR0cyAtIHZpZGVvRmlyc3RQdHMpIC8gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbilcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpbGVudFNhbXBsZUNvdW50OyBpKyspIHtcbiAgICAgICAgICBjb25zdCBzaWxlbnRTYW1wbGUgPSB7XG4gICAgICAgICAgICBkYXRhOiBzaWxlbnRGcmFtZSxcbiAgICAgICAgICAgIGRhdGFzaXplOiBzaWxlbnRGcmFtZS5ieXRlTGVuZ3RoLFxuICAgICAgICAgICAgZHRzOiBmaXJzdFNhbXBsZS5kdHMgLSAoaSArIDEpICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbixcbiAgICAgICAgICAgIGZpbHRlcmVkOiAwXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYXVkaW9TYW1wbGVzLnVuc2hpZnQoc2lsZW50U2FtcGxlKVxuXG4gICAgICAgICAgdGhpcy5maWxsZWRBdWRpb1NhbXBsZXMucHVzaCh7XG4gICAgICAgICAgICBkdHM6IHNpbGVudFNhbXBsZS5kdHMsXG4gICAgICAgICAgICBzaXplOiBzaWxlbnRTYW1wbGUuZGF0YS5ieXRlTGVuZ3RoXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBnYXBcbiAgICBjb25zdCBmaXJzdER0cyA9IGF1ZGlvU2FtcGxlc1swXS5kdHNcblxuICAgIGlmICh0aGlzLm5leHRBdWRpb0R0cykge1xuICAgICAgLy8gc3RlcDEuIOWkhOeQhnNhbXBsZXPmrrXkuYvpl7TnmoTkuKLluKfmg4XlhrVcbiAgICAgIC8vIOW9k+WPkeeOsGR1cmF0aW9u5beu6Led5aSn5LqOMeW4p+aXtui/m+ihjOihpeW4p1xuICAgICAgZ2FwID0gZmlyc3REdHMgLSB0aGlzLm5leHRBdWRpb0R0c1xuICAgICAgY29uc3QgYWJzR2FwID0gTWF0aC5hYnMoZ2FwKVxuXG4gICAgICBpZiAoYWJzR2FwID4gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiAmJiBzYW1wbGVzTGVuID09PSAxICYmIHRoaXMubGFzdEF1ZGlvU2FtcGxlc0xlbiA9PT0gMSkge1xuICAgICAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uRml4ZWQgPSB1bmRlZmluZWRcbiAgICAgIH1cblxuICAgICAgaWYgKGdhcCA+ICgyICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbikpIHtcbiAgICAgICAgaWYgKHNhbXBsZXNMZW4gPT09IDEgJiYgdGhpcy5sYXN0QXVkaW9TYW1wbGVzTGVuID09PSAxKSB7XG4gICAgICAgICAgLy8g5aaC5p6cc2FtcGxl55qEbGVuZ3Ro5LiA55u05pivMe+8jOiAjOS4lOS4gOebtOS4jeespuWQiHJlZlNhbXBsZUR1cmF0aW9u77yM6ZyA6KaB5Yqo5oCB5L+u5pS5cmVmU2FtcGxlRHVyYXRpb25cbiAgICAgICAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uRml4ZWQgPSBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uRml4ZWQgIT09IHVuZGVmaW5lZCA/IG1ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZCArIGdhcCA6IG1ldGEucmVmU2FtcGxlRHVyYXRpb24gKyBnYXBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBzaWxlbnRGcmFtZUNvdW50ID0gTWF0aC5mbG9vcihnYXAgLyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKVxuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaWxlbnRGcmFtZUNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbXB1dGVkID0gZmlyc3REdHMgLSAoaSArIDEpICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuICAgICAgICAgICAgY29uc3Qgc2lsZW50U2FtcGxlID0gT2JqZWN0LmFzc2lnbih7fSwgYXVkaW9TYW1wbGVzWzBdLCB7XG4gICAgICAgICAgICAgIGR0czogY29tcHV0ZWQgPiB0aGlzLm5leHRBdWRpb0R0cyA/IGNvbXB1dGVkIDogdGhpcy5uZXh0QXVkaW9EdHNcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHRoaXMuZmlsbGVkQXVkaW9TYW1wbGVzLnB1c2goe1xuICAgICAgICAgICAgICBkdHM6IHNpbGVudFNhbXBsZS5kdHMsXG4gICAgICAgICAgICAgIHNpemU6IHNpbGVudFNhbXBsZS5kYXRhLmJ5dGVMZW5ndGhcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLmF1ZGlvVHJhY2suc2FtcGxlcy51bnNoaWZ0KHNpbGVudFNhbXBsZSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoYWJzR2FwIDw9IG1ldGEucmVmU2FtcGxlRHVyYXRpb24gJiYgYWJzR2FwID4gMCkge1xuICAgICAgICAvLyDlvZPlt67ot53mr5TovoPlsI/nmoTml7blgJnlsIbpn7PpopHluKfph43lrprkvY1cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ+mHjeWumuS9jemfs+mikeW4p2R0cycsIGF1ZGlvU2FtcGxlc1swXS5kdHMsIHRoaXMubmV4dEF1ZGlvRHRzKVxuICAgICAgICBhdWRpb1NhbXBsZXNbMF0uZHRzID0gdGhpcy5uZXh0QXVkaW9EdHNcbiAgICAgICAgYXVkaW9TYW1wbGVzWzBdLnB0cyA9IHRoaXMubmV4dEF1ZGlvRHRzXG4gICAgICB9IGVsc2UgaWYgKGdhcCA8IDApIHtcbiAgICAgICAgQ29tcGF0aWJpbGl0eS5kb0ZpeExhcmdlR2FwKGF1ZGlvU2FtcGxlcywgKC0xICogZ2FwKSlcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgbGFzdER0cyA9IGF1ZGlvU2FtcGxlc1thdWRpb1NhbXBsZXMubGVuZ3RoIC0gMV0uZHRzO1xuICAgIGNvbnN0IGxhc3RTYW1wbGVEdXJhdGlvbiA9IGF1ZGlvU2FtcGxlcy5sZW5ndGggPj0gMiA/IGxhc3REdHMgLSBhdWRpb1NhbXBsZXNbYXVkaW9TYW1wbGVzLmxlbmd0aCAtIDJdLmR0cyA6IG1ldGEucmVmU2FtcGxlRHVyYXRpb25cblxuICAgIHRoaXMubGFzdEF1ZGlvU2FtcGxlc0xlbiA9IHNhbXBsZXNMZW47XG4gICAgdGhpcy5uZXh0QXVkaW9EdHMgPSBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uRml4ZWQgPyBsYXN0RHRzICsgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbkZpeGVkIDogbGFzdER0cyArIGxhc3RTYW1wbGVEdXJhdGlvblxuICAgIHRoaXMubGFzdEF1ZGlvRHRzID0gbGFzdER0c1xuXG4gICAgLy8gc3RlcDMuIOS/ruWkjXNhbXBsZXPmrrXlhoXpg6jnmoRkdHPlvILluLjpl67pophcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXVkaW9TYW1wbGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50ID0gYXVkaW9TYW1wbGVzW2ldXG4gICAgICBjb25zdCBuZXh0ID0gYXVkaW9TYW1wbGVzW2kgKyAxXVxuXG4gICAgICBpZiAoIW5leHQpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGR1cmF0aW9uID0gbmV4dC5kdHMgLSBjdXJyZW50LmR0cztcbiAgICAgIGF1ZGlvU2FtcGxlc1tpXS5kdXJhdGlvbiA9IGR1cmF0aW9uO1xuICAgICAgLypcbiAgICAgIGlmIChkdXJhdGlvbiA+ICgyICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbikpIHtcbiAgICAgICAgLy8g5Lik5bin5LmL6Ze06Ze06ZqU5aSq5aSn77yM6ZyA6KaB6KGl56m655m95binXG4gICAgICAgIC8qKlxuICAgICAgICBsZXQgc2lsZW50RnJhbWVDb3VudCA9IE1hdGguZmxvb3IoZHVyYXRpb24gLyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKVxuICAgICAgICBsZXQgZnJhbWVJZHggPSAwXG5cbiAgICAgICAgd2hpbGUgKGZyYW1lSWR4IDwgc2lsZW50RnJhbWVDb3VudCkge1xuICAgICAgICAgIGNvbnN0IHNpbGVudFNhbXBsZSA9IHtcbiAgICAgICAgICAgIGRhdGE6IHNpbGVudEZyYW1lLFxuICAgICAgICAgICAgZGF0YXNpemU6IHNpbGVudEZyYW1lLmJ5dGVMZW5ndGgsXG4gICAgICAgICAgICBkdHM6IGN1cnJlbnQuZHRzICsgKGZyYW1lSWR4ICsgMSkgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uLFxuICAgICAgICAgICAgZmlsdGVyZWQ6IDAsXG4gICAgICAgICAgICBpc1NpbGVudDogdHJ1ZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGF1ZGlvU2FtcGxlcy5zcGxpY2UoaSwgMCwgc2lsZW50U2FtcGxlKVxuXG4gICAgICAgICAgdGhpcy5maWxsZWRBdWRpb1NhbXBsZXMucHVzaCh7XG4gICAgICAgICAgICBkdHM6IHNpbGVudFNhbXBsZS5kdHMsXG4gICAgICAgICAgICBzaXplOiBzaWxlbnRTYW1wbGUuZGF0YS5ieXRlTGVuZ3RoXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIGZyYW1lSWR4KytcbiAgICAgICAgICBpKysgLy8g5LiN5a+56Z2Z6Z+z5bin5YGa5q+U6L6DXG4gICAgICAgIH1cbiAgICAgIH0gKi9cbiAgICB9XG5cbiAgICB0aGlzLmF1ZGlvVHJhY2suc2FtcGxlcyA9IENvbXBhdGliaWxpdHkuc29ydEF1ZGlvU2FtcGxlcyhhdWRpb1NhbXBsZXMpXG4gIH1cblxuICBmaXhDaGFuZ2VTdHJlYW1WaWRlbyAoY2hhbmdlSWR4KSB7XG4gICAgY29uc3QgeyBzYW1wbGVzLCBtZXRhIH0gPSB0aGlzLnZpZGVvVHJhY2s7XG4gICAgY29uc3QgcHJldkR0cyA9IGNoYW5nZUlkeCA9PT0gMCA/IHRoaXMuZ2V0U3RyZWFtQ2hhbmdlU3RhcnQoc2FtcGxlc1swXSkgOiBzYW1wbGVzW2NoYW5nZUlkeCAtIDFdLmR0cztcbiAgICBjb25zdCBjdXJEdHMgPSBzYW1wbGVzW2NoYW5nZUlkeF0uZHRzO1xuICAgIGNvbnN0IGlzQ29udGludWUgPSBNYXRoLmFicyhwcmV2RHRzIC0gY3VyRHRzKSA8PSAyICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbjtcblxuICAgIGlmIChpc0NvbnRpbnVlKSB7XG4gICAgICBpZiAoIXNhbXBsZXNbY2hhbmdlSWR4XS5vcHRpb25zKSB7XG4gICAgICAgIHNhbXBsZXNbY2hhbmdlSWR4XS5vcHRpb25zID0ge1xuICAgICAgICAgIGlzQ29udGludWU6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2FtcGxlc1tjaGFuZ2VJZHhdLm9wdGlvbnMuaXNDb250aW51ZSA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5kb0ZpeFZpZGVvKGZhbHNlKVxuICAgIH1cblxuICAgIGNvbnN0IGZpcnN0UGFydFNhbXBsZXMgPSBzYW1wbGVzLnNsaWNlKDAsIGNoYW5nZUlkeCk7XG4gICAgY29uc3Qgc2Vjb25kUGFydFNhbXBsZXMgPSBzYW1wbGVzLnNsaWNlKGNoYW5nZUlkeCk7XG4gICAgY29uc3QgZmlyc3RTYW1wbGUgPSBzYW1wbGVzWzBdXG5cbiAgICBjb25zdCBjaGFuZ2VTYW1wbGUgPSBzZWNvbmRQYXJ0U2FtcGxlc1swXVxuICAgIGNvbnN0IGZpcnN0UGFydER1cmF0aW9uID0gY2hhbmdlU2FtcGxlLmR0cyAtIGZpcnN0U2FtcGxlLmR0c1xuICAgIGNvbnN0IHN0cmVhbUNoYW5nZVN0YXJ0ID0gZmlyc3RTYW1wbGUub3B0aW9ucyAmJiBmaXJzdFNhbXBsZS5vcHRpb25zLnN0YXJ0ICsgZmlyc3RQYXJ0RHVyYXRpb24gPyBmaXJzdFNhbXBsZS5vcHRpb25zLnN0YXJ0IDogbnVsbFxuXG4gICAgdGhpcy52aWRlb1RyYWNrLnNhbXBsZXMgPSBzYW1wbGVzLnNsaWNlKDAsIGNoYW5nZUlkeCk7XG5cbiAgICB0aGlzLmRvRml4VmlkZW8oZmFsc2UpO1xuXG4gICAgdGhpcy52aWRlb1RyYWNrLnNhbXBsZXMgPSBzYW1wbGVzLnNsaWNlKGNoYW5nZUlkeCk7XG5cbiAgICB0aGlzLmRvRml4VmlkZW8oZmFsc2UsIHN0cmVhbUNoYW5nZVN0YXJ0KTtcblxuICAgIHRoaXMudmlkZW9UcmFjay5zYW1wbGVzID0gZmlyc3RQYXJ0U2FtcGxlcy5jb25jYXQoc2Vjb25kUGFydFNhbXBsZXMpXG4gIH1cblxuICBmaXhDaGFuZ2VTdHJlYW1BdWRpbyAoY2hhbmdlSWR4KSB7XG4gICAgY29uc3QgeyBzYW1wbGVzLCBtZXRhIH0gPSB0aGlzLmF1ZGlvVHJhY2s7XG5cbiAgICBjb25zdCBwcmV2RHRzID0gY2hhbmdlSWR4ID09PSAwID8gdGhpcy5nZXRTdHJlYW1DaGFuZ2VTdGFydChzYW1wbGVzWzBdKSA6IHNhbXBsZXNbY2hhbmdlSWR4IC0gMV0uZHRzO1xuICAgIGNvbnN0IGN1ckR0cyA9IHNhbXBsZXNbY2hhbmdlSWR4XS5kdHM7XG4gICAgY29uc3QgaXNDb250aW51ZSA9IE1hdGguYWJzKHByZXZEdHMgLSBjdXJEdHMpIDw9IDIgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uO1xuXG4gICAgaWYgKGlzQ29udGludWUpIHtcbiAgICAgIGlmICghc2FtcGxlc1tjaGFuZ2VJZHhdLm9wdGlvbnMpIHtcbiAgICAgICAgc2FtcGxlc1tjaGFuZ2VJZHhdLm9wdGlvbnMgPSB7XG4gICAgICAgICAgaXNDb250aW51ZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzYW1wbGVzW2NoYW5nZUlkeF0ub3B0aW9ucy5pc0NvbnRpbnVlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmRvRml4QXVkaW8oZmFsc2UpXG4gICAgfVxuXG4gICAgY29uc3QgZmlyc3RQYXJ0U2FtcGxlcyA9IHNhbXBsZXMuc2xpY2UoMCwgY2hhbmdlSWR4KTtcbiAgICBjb25zdCBzZWNvbmRQYXJ0U2FtcGxlcyA9IHNhbXBsZXMuc2xpY2UoY2hhbmdlSWR4KTtcbiAgICBjb25zdCBmaXJzdFNhbXBsZSA9IHNhbXBsZXNbMF1cblxuICAgIGNvbnN0IGNoYW5nZVNhbXBsZSA9IHNlY29uZFBhcnRTYW1wbGVzWzBdXG4gICAgY29uc3QgZmlyc3RQYXJ0RHVyYXRpb24gPSBjaGFuZ2VTYW1wbGUuZHRzIC0gZmlyc3RTYW1wbGUuZHRzXG4gICAgY29uc3Qgc3RyZWFtQ2hhbmdlU3RhcnQgPSBmaXJzdFNhbXBsZS5vcHRpb25zICYmIGZpcnN0U2FtcGxlLm9wdGlvbnMuc3RhcnQgKyBmaXJzdFBhcnREdXJhdGlvbiA/IGZpcnN0U2FtcGxlLm9wdGlvbnMuc3RhcnQgOiBudWxsXG5cbiAgICB0aGlzLmF1ZGlvVHJhY2suc2FtcGxlcyA9IGZpcnN0UGFydFNhbXBsZXM7XG5cbiAgICB0aGlzLmRvRml4QXVkaW8oZmFsc2UpO1xuXG4gICAgdGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMgPSBzZWNvbmRQYXJ0U2FtcGxlcztcblxuICAgIHRoaXMuZG9GaXhBdWRpbyhmYWxzZSwgc3RyZWFtQ2hhbmdlU3RhcnQpO1xuXG4gICAgdGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMgPSBmaXJzdFBhcnRTYW1wbGVzLmNvbmNhdChzZWNvbmRQYXJ0U2FtcGxlcylcbiAgfVxuXG4gIGdldEZpcnN0U2FtcGxlICgpIHtcbiAgICAvLyDojrflj5Z2aWRlb+WSjGF1ZGlv55qE6aaW5bin5pWw5o2uXG4gICAgbGV0IHtzYW1wbGVzOiB2aWRlb1NhbXBsZXN9ID0gdGhpcy52aWRlb1RyYWNrXG4gICAgbGV0IHtzYW1wbGVzOiBhdWRpb1NhbXBsZXN9ID0gdGhpcy5hdWRpb1RyYWNrXG5cbiAgICBsZXQgaXNGaXJzdFZpZGVvU2FtcGxlcyA9IGZhbHNlO1xuICAgIGxldCBpc0ZpcnN0QXVkaW9TYW1wbGVzID0gZmFsc2U7XG5cbiAgICBpZiAoIXRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUgJiYgdmlkZW9TYW1wbGVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5fZmlyc3RWaWRlb1NhbXBsZSA9IENvbXBhdGliaWxpdHkuZmluZEZpcnN0VmlkZW9TYW1wbGUodmlkZW9TYW1wbGVzKVxuICAgICAgaXNGaXJzdFZpZGVvU2FtcGxlcyA9IHRydWVcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2ZpcnN0QXVkaW9TYW1wbGUgJiYgYXVkaW9TYW1wbGVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5fZmlyc3RBdWRpb1NhbXBsZSA9IENvbXBhdGliaWxpdHkuZmluZEZpcnN0QXVkaW9TYW1wbGUoYXVkaW9TYW1wbGVzKSAvLyDlr7vmib5kdHPmnIDlsI/nmoTluKfkvZzkuLrpppbkuKrpn7PpopHluKdcbiAgICAgIGlzRmlyc3RBdWRpb1NhbXBsZXMgPSB0cnVlXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlzRmlyc3RWaWRlb1NhbXBsZXMsXG4gICAgICBpc0ZpcnN0QXVkaW9TYW1wbGVzXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOWcqOayoeaciXJlZlNhbXBsZUR1cmF0aW9u55qE6Zeu6aKY5rWB5Lit77yMXG4gICAqL1xuICBmaXhSZWZTYW1wbGVEdXJhdGlvbiAobWV0YSwgc2FtcGxlcykge1xuICAgIGNvbnN0IGlzVmlkZW8gPSBtZXRhLnR5cGUgPT09ICd2aWRlbydcbiAgICBjb25zdCBhbGxTYW1wbGVzQ291bnQgPSBpc1ZpZGVvID8gdGhpcy5hbGxWaWRlb1NhbXBsZXNDb3VudCA6IHRoaXMuYWxsQXVkaW9TYW1wbGVzQ291bnRcbiAgICBjb25zdCBmaXJzdER0cyA9IGlzVmlkZW8gPyB0aGlzLl9maXJzdFZpZGVvU2FtcGxlLmR0cyA6IHRoaXMuX2ZpcnN0QXVkaW9TYW1wbGUuZHRzXG4gICAgY29uc3QgZmlsbGVkU2FtcGxlc0NvdW50ID0gaXNWaWRlbyA/IHRoaXMuZmlsbGVkVmlkZW9TYW1wbGVzLmxlbmd0aCA6IHRoaXMuZmlsbGVkQXVkaW9TYW1wbGVzLmxlbmd0aFxuXG4gICAgaWYgKCFtZXRhLnJlZlNhbXBsZUR1cmF0aW9uIHx8IG1ldGEucmVmU2FtcGxlRHVyYXRpb24gPD0gMCB8fCBOdW1iZXIuaXNOYU4obWV0YS5yZWZTYW1wbGVEdXJhdGlvbikpIHtcbiAgICAgIGlmIChzYW1wbGVzLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgIGNvbnN0IGxhc3REdHMgPSBzYW1wbGVzW3NhbXBsZXMubGVuZ3RoIC0gMV0uZHRzXG5cbiAgICAgICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA9IE1hdGguZmxvb3IoKGxhc3REdHMgLSBmaXJzdER0cykgLyAoKGFsbFNhbXBsZXNDb3VudCArIGZpbGxlZFNhbXBsZXNDb3VudCkgLSAxKSk7IC8vIOWwhnJlZlNhbXBsZUR1cmF0aW9u6YeN572u5Li66K6h566X5ZCO55qE5bmz5Z2H5YC8XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSB7XG4gICAgICBpZiAoc2FtcGxlcy5sZW5ndGggPj0gNSkge1xuICAgICAgICBjb25zdCBsYXN0RHRzID0gc2FtcGxlc1tzYW1wbGVzLmxlbmd0aCAtIDFdLmR0c1xuICAgICAgICBjb25zdCBmaXJzdER0cyA9IHNhbXBsZXNbMF0uZHRzXG4gICAgICAgIGNvbnN0IGR1cmF0aW9uQXZnID0gKGxhc3REdHMgLSBmaXJzdER0cykgLyAoc2FtcGxlcy5sZW5ndGggLSAxKVxuXG4gICAgICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb24gPSBNYXRoLmZsb29yKE1hdGguYWJzKG1ldGEucmVmU2FtcGxlRHVyYXRpb24gLSBkdXJhdGlvbkF2ZykgPD0gNSA/IG1ldGEucmVmU2FtcGxlRHVyYXRpb24gOiBkdXJhdGlvbkF2Zyk7IC8vIOWwhnJlZlNhbXBsZUR1cmF0aW9u6YeN572u5Li66K6h566X5ZCO55qE5bmz5Z2H5YC8XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOiusOW9leaIquatouebruWJjeS4gOWFseaSreaUvuS6huWkmuWwkeW4p1xuICAgKi9cbiAgcmVjb3JkU2FtcGxlc0NvdW50ICgpIHtcbiAgICBjb25zdCB7IGF1ZGlvVHJhY2ssIHZpZGVvVHJhY2sgfSA9IHRoaXNcblxuICAgIHRoaXMuYWxsQXVkaW9TYW1wbGVzQ291bnQgKz0gYXVkaW9UcmFjay5zYW1wbGVzLmxlbmd0aFxuICAgIHRoaXMuYWxsVmlkZW9TYW1wbGVzQ291bnQgKz0gdmlkZW9UcmFjay5zYW1wbGVzLmxlbmd0aFxuICB9XG5cbiAgLyoqXG4gICAqIOWOu+mZpOS4jeWQiOazleeahOW4p++8iOWAkumAgOOAgemHjeWkjeW4p++8iVxuICAgKi9cbiAgcmVtb3ZlSW52YWxpZFNhbXBsZXMgKCkge1xuICAgIGNvbnN0IHsgX2ZpcnN0VmlkZW9TYW1wbGUsIF9maXJzdEF1ZGlvU2FtcGxlIH0gPSB0aGlzXG5cbiAgICB0aGlzLmF1ZGlvVHJhY2suc2FtcGxlcyA9IHRoaXMuYXVkaW9UcmFjay5zYW1wbGVzLmZpbHRlcigoc2FtcGxlKSA9PiB7XG4gICAgICByZXR1cm4gc2FtcGxlLmR0cyA+PSBfZmlyc3RBdWRpb1NhbXBsZS5kdHMgJiYgKHRoaXMubGFzdEF1ZGlvRHRzID09PSB1bmRlZmluZWQgfHwgc2FtcGxlLmR0cyA+IHRoaXMubGFzdEF1ZGlvRHRzKVxuICAgIH0pXG5cbiAgICB0aGlzLnZpZGVvVHJhY2suc2FtcGxlcyA9IHRoaXMudmlkZW9UcmFjay5zYW1wbGVzLmZpbHRlcigoc2FtcGxlKSA9PiB7XG4gICAgICByZXR1cm4gc2FtcGxlLmR0cyA+PSBfZmlyc3RWaWRlb1NhbXBsZS5kdHMgJiYgKHRoaXMubGFzdFZpZGVvRHRzID09PSB1bmRlZmluZWQgfHwgc2FtcGxlLmR0cyA+IHRoaXMubGFzdFZpZGVvRHRzKVxuICAgIH0pXG4gIH1cblxuICBnZXRTdHJlYW1DaGFuZ2VTdGFydCAoc2FtcGxlKSB7XG4gICAgaWYgKHNhbXBsZS5vcHRpb25zICYmIHNhbXBsZS5vcHRpb25zLnN0YXJ0KSB7XG4gICAgICByZXR1cm4gc2FtcGxlLm9wdGlvbnMuc3RhcnQgLSB0aGlzLmR0c0Jhc2U7XG4gICAgfVxuICAgIHJldHVybiBJbmZpbml0eVxuICB9XG5cbiAgc3RhdGljIHNvcnRBdWRpb1NhbXBsZXMgKHNhbXBsZXMpIHtcbiAgICBpZiAoc2FtcGxlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBzYW1wbGVzXG4gICAgfVxuXG4gICAgcmV0dXJuIHNhbXBsZXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgcmV0dXJuIGEuZHRzIC0gYi5kdHNcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIOWvu+aJvmR0c+acgOWwj+eahHNhbXBsZVxuICAgKiBAcGFyYW0gc2FtcGxlc1xuICAgKi9cbiAgc3RhdGljIGZpbmRGaXJzdEF1ZGlvU2FtcGxlIChzYW1wbGVzKSB7XG4gICAgaWYgKCFzYW1wbGVzIHx8IHNhbXBsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIHJldHVybiBDb21wYXRpYmlsaXR5LnNvcnRBdWRpb1NhbXBsZXMoc2FtcGxlcylbMF1cbiAgfVxuXG4gIHN0YXRpYyBmaW5kRmlyc3RWaWRlb1NhbXBsZSAoc2FtcGxlcykge1xuICAgIGlmICghc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgY29uc3Qgc29ydGVkID0gc2FtcGxlcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICByZXR1cm4gYS5kdHMgLSBiLmR0cztcbiAgICB9KVxuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNvcnRlZC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKHNvcnRlZFtpXS5pc0tleWZyYW1lKSB7XG4gICAgICAgIHJldHVybiBzb3J0ZWRbaV1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZGV0ZWN0TGFyZ2VHYXAgKG5leHREdHMsIGZpcnN0U2FtcGxlKSB7XG4gICAgaWYgKG5leHREdHMgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY3VyRHRzID0gZmlyc3RTYW1wbGUuZHRzIHx8IDBcbiAgICBjb25zdCBjb25kMSA9IG5leHREdHMgLSBjdXJEdHMgPj0gMTAwMCB8fCBjdXJEdHMgLSBuZXh0RHRzID49IDEwMDAgLy8gZml4IGhsc+a1geWHuueOsOWkp+mHj+a1gWR0c+mXtOi3nemXrumimFxuICAgIGNvbnN0IGNvbmQyID0gZmlyc3RTYW1wbGUub3B0aW9ucyAmJiBmaXJzdFNhbXBsZS5vcHRpb25zLmRpc2NvbnRpbnVlXG5cbiAgICByZXR1cm4gY29uZDEgfHwgY29uZDJcbiAgfVxuXG4gIHN0YXRpYyBkb0ZpeExhcmdlR2FwIChzYW1wbGVzLCBnYXApIHtcbiAgICBjb25zb2xlLmxvZygnZml4IGxhcmdlIGdhcCcpXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNhbXBsZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IHNhbXBsZSA9IHNhbXBsZXNbaV07XG4gICAgICBzYW1wbGUuZHRzICs9IGdhcFxuICAgICAgaWYgKHNhbXBsZS5wdHMpIHtcbiAgICAgICAgc2FtcGxlLnB0cyArPSBnYXBcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog5Lit6YCU5o2i5rWBXG4gICAqL1xuICBzdGF0aWMgZGV0YWN0Q2hhbmdlU3RyZWFtIChzYW1wbGVzKSB7XG4gICAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcbiAgICBsZXQgY2hhbmdlZElkeCA9IC0xO1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzYW1wbGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAoc2FtcGxlc1tpXS5vcHRpb25zICYmIHNhbXBsZXNbaV0ub3B0aW9ucy5tZXRhKSB7XG4gICAgICAgIGNoYW5nZWQgPSB0cnVlXG4gICAgICAgIGNoYW5nZWRJZHggPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgY2hhbmdlZCxcbiAgICAgIGNoYW5nZWRJZHhcbiAgICB9XG4gIH1cblxuICBnZXQgdHJhY2tzICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJylcbiAgfVxuXG4gIGdldCBhdWRpb1RyYWNrICgpIHtcbiAgICBpZiAodGhpcy50cmFja3MpIHtcbiAgICAgIHJldHVybiB0aGlzLnRyYWNrcy5hdWRpb1RyYWNrXG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBnZXQgdmlkZW9UcmFjayAoKSB7XG4gICAgaWYgKHRoaXMudHJhY2tzKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmFja3MudmlkZW9UcmFja1xuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgZ2V0IGR0c0Jhc2UgKCkge1xuICAgIGNvbnN0IHJlbXV4ZXIgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdNUDRfUkVNVVhFUicpO1xuICAgIGlmIChyZW11eGVyKSB7XG4gICAgICByZXR1cm4gcmVtdXhlci5fZHRzQmFzZVxuICAgIH1cbiAgICByZXR1cm4gMFxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBDb21wYXRpYmlsaXR5O1xuIiwiY2xhc3MgR29sb21iIHtcbiAgY29uc3RydWN0b3IgKHVpbnQ4YXJyYXkpIHtcbiAgICB0aGlzLlRBRyA9ICdHb2xvbWInXG4gICAgdGhpcy5fYnVmZmVyID0gdWludDhhcnJheVxuICAgIHRoaXMuX2J1ZmZlckluZGV4ID0gMFxuICAgIHRoaXMuX3RvdGFsQnl0ZXMgPSB1aW50OGFycmF5LmJ5dGVMZW5ndGhcbiAgICB0aGlzLl90b3RhbEJpdHMgPSB1aW50OGFycmF5LmJ5dGVMZW5ndGggKiA4XG4gICAgdGhpcy5fY3VycmVudFdvcmQgPSAwXG4gICAgdGhpcy5fY3VycmVudFdvcmRCaXRzTGVmdCA9IDBcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuX2J1ZmZlciA9IG51bGxcbiAgfVxuXG4gIF9maWxsQ3VycmVudFdvcmQgKCkge1xuICAgIGxldCBidWZmZXJCeXRlc0xlZnQgPSB0aGlzLl90b3RhbEJ5dGVzIC0gdGhpcy5fYnVmZmVySW5kZXhcbiAgICBpZiAoYnVmZmVyQnl0ZXNMZWZ0IDw9IDApIHtcbiAgICAgIC8vIFRPRE8g5byC5bi45aSE55CGXG4gICAgfVxuXG4gICAgbGV0IGJ5dGVzUmVhZCA9IE1hdGgubWluKDQsIGJ1ZmZlckJ5dGVzTGVmdClcbiAgICBsZXQgd29yZCA9IG5ldyBVaW50OEFycmF5KDQpXG4gICAgd29yZC5zZXQodGhpcy5fYnVmZmVyLnN1YmFycmF5KHRoaXMuX2J1ZmZlckluZGV4LCB0aGlzLl9idWZmZXJJbmRleCArIGJ5dGVzUmVhZCkpXG4gICAgdGhpcy5fY3VycmVudFdvcmQgPSBuZXcgRGF0YVZpZXcod29yZC5idWZmZXIpLmdldFVpbnQzMigwKVxuXG4gICAgdGhpcy5fYnVmZmVySW5kZXggKz0gYnl0ZXNSZWFkXG4gICAgdGhpcy5fY3VycmVudFdvcmRCaXRzTGVmdCA9IGJ5dGVzUmVhZCAqIDhcbiAgfVxuXG4gIHJlYWRCaXRzIChzaXplKSB7XG4gICAgbGV0IGJpdHMgPSBNYXRoLm1pbih0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0LCBzaXplKTsvLyA6dWludFxuICAgIGxldCB2YWx1ID0gdGhpcy5fY3VycmVudFdvcmQgPj4+ICgzMiAtIGJpdHMpO1xuICAgIGlmIChzaXplID4gMzIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHJlYWQgbW9yZSB0aGFuIDMyIGJpdHMgYXQgYSB0aW1lJyk7XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnRXb3JkQml0c0xlZnQgLT0gYml0cztcbiAgICBpZiAodGhpcy5fY3VycmVudFdvcmRCaXRzTGVmdCA+IDApIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRXb3JkIDw8PSBiaXRzO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fdG90YWxCeXRlcyAtIHRoaXMuX2J1ZmZlckluZGV4ID4gMCkge1xuICAgICAgdGhpcy5fZmlsbEN1cnJlbnRXb3JkKCk7XG4gICAgfVxuXG4gICAgYml0cyA9IHNpemUgLSBiaXRzO1xuICAgIGlmIChiaXRzID4gMCAmJiB0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0KSB7XG4gICAgICByZXR1cm4gdmFsdSA8PCBiaXRzIHwgdGhpcy5yZWFkQml0cyhiaXRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhbHU7XG4gICAgfVxuICB9XG5cbiAgcmVhZEJvb2wgKCkge1xuICAgIHJldHVybiB0aGlzLnJlYWRCaXRzKDEpID09PSAxXG4gIH1cblxuICByZWFkQnl0ZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVhZEJpdHMoOClcbiAgfVxuXG4gIF9za2lwTGVhZGluZ1plcm8gKCkge1xuICAgIGxldCB6ZXJvQ291bnRcbiAgICBmb3IgKHplcm9Db3VudCA9IDA7IHplcm9Db3VudCA8IHRoaXMuX2N1cnJlbnRXb3JkQml0c0xlZnQ7IHplcm9Db3VudCsrKSB7XG4gICAgICBpZiAoKHRoaXMuX2N1cnJlbnRXb3JkICYgKDB4ODAwMDAwMDAgPj4+IHplcm9Db3VudCkpICE9PSAwKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRXb3JkIDw8PSB6ZXJvQ291bnRcbiAgICAgICAgdGhpcy5fY3VycmVudFdvcmRCaXRzTGVmdCAtPSB6ZXJvQ291bnRcbiAgICAgICAgcmV0dXJuIHplcm9Db3VudFxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9maWxsQ3VycmVudFdvcmQoKVxuICAgIHJldHVybiB6ZXJvQ291bnQgKyB0aGlzLl9za2lwTGVhZGluZ1plcm8oKVxuICB9XG5cbiAgcmVhZFVFRyAoKSB7IC8vIHVuc2lnbmVkIGV4cG9uZW50aWFsIGdvbG9tYlxuICAgIGxldCBsZWFkaW5nWmVyb3MgPSB0aGlzLl9za2lwTGVhZGluZ1plcm8oKVxuICAgIHJldHVybiB0aGlzLnJlYWRCaXRzKGxlYWRpbmdaZXJvcyArIDEpIC0gMVxuICB9XG5cbiAgcmVhZFNFRyAoKSB7IC8vIHNpZ25lZCBleHBvbmVudGlhbCBnb2xvbWJcbiAgICBsZXQgdmFsdWUgPSB0aGlzLnJlYWRVRUcoKVxuICAgIGlmICh2YWx1ZSAmIDB4MDEpIHtcbiAgICAgIHJldHVybiAodmFsdWUgKyAxKSA+Pj4gMVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gLTEgKiAodmFsdWUgPj4+IDEpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdvbG9tYlxuIiwiaW1wb3J0IFNwc1BhcnNlciBmcm9tICcuL3Nwcyc7XG5jbGFzcyBOYWx1bml0IHtcbiAgc3RhdGljIGdldE5hbHVuaXRzIChidWZmZXIpIHtcbiAgICBpZiAoYnVmZmVyLmxlbmd0aCAtIGJ1ZmZlci5wb3NpdGlvbiA8IDQpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBsZXQgYnVmID0gYnVmZmVyLmRhdGF2aWV3O1xuICAgIGxldCBwb3NpdGlvbiA9IGJ1ZmZlci5wb3NpdGlvbjtcbiAgICBpZiAoYnVmLmdldEludDMyKHBvc2l0aW9uKSA9PT0gMSB8fFxuICAgIChidWYuZ2V0SW50MTYocG9zaXRpb24pID09PSAwICYmIGJ1Zi5nZXRJbnQ4KHBvc2l0aW9uICsgMikgPT09IDEpKSB7XG4gICAgICByZXR1cm4gTmFsdW5pdC5nZXRBbm5leGJOYWxzKGJ1ZmZlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBOYWx1bml0LmdldEF2Y2NOYWxzKGJ1ZmZlcik7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldEFubmV4Yk5hbHMgKGJ1ZmZlcikge1xuICAgIGxldCBuYWxzID0gW107XG4gICAgbGV0IHBvc2l0aW9uID0gTmFsdW5pdC5nZXRIZWFkZXJQb3NpdGlvbkFubmV4QihidWZmZXIpO1xuICAgIGxldCBzdGFydCA9IHBvc2l0aW9uLnBvcztcbiAgICBsZXQgZW5kID0gc3RhcnQ7XG4gICAgd2hpbGUgKHN0YXJ0IDwgYnVmZmVyLmxlbmd0aCAtIDQpIHtcbiAgICAgIGxldCBoZWFkZXIgPSBidWZmZXIuYnVmZmVyLnNsaWNlKHN0YXJ0LCBzdGFydCArIHBvc2l0aW9uLmhlYWRlckxlbmd0aCk7XG4gICAgICBpZiAocG9zaXRpb24ucG9zID09PSBidWZmZXIucG9zaXRpb24pIHtcbiAgICAgICAgYnVmZmVyLnNraXAocG9zaXRpb24uaGVhZGVyTGVuZ3RoKTtcbiAgICAgIH1cbiAgICAgIHBvc2l0aW9uID0gTmFsdW5pdC5nZXRIZWFkZXJQb3NpdGlvbkFubmV4QihidWZmZXIpO1xuICAgICAgZW5kID0gcG9zaXRpb24ucG9zO1xuICAgICAgbGV0IGJvZHkgPSBuZXcgVWludDhBcnJheShidWZmZXIuYnVmZmVyLnNsaWNlKHN0YXJ0ICsgaGVhZGVyLmJ5dGVMZW5ndGgsIGVuZCkpO1xuICAgICAgbGV0IHVuaXQgPSB7aGVhZGVyLCBib2R5fTtcbiAgICAgIE5hbHVuaXQuYW5hbHlzZU5hbCh1bml0KTtcbiAgICAgIG5hbHMucHVzaCh1bml0KTtcbiAgICAgIGJ1ZmZlci5za2lwKGVuZCAtIGJ1ZmZlci5wb3NpdGlvbik7XG4gICAgICBzdGFydCA9IGVuZDtcbiAgICB9XG4gICAgcmV0dXJuIG5hbHM7XG4gIH1cblxuICBzdGF0aWMgZ2V0QXZjY05hbHMgKGJ1ZmZlcikge1xuICAgIGxldCBuYWxzID0gW107XG4gICAgd2hpbGUgKGJ1ZmZlci5wb3NpdGlvbiA8IGJ1ZmZlci5sZW5ndGggLSA0KSB7XG4gICAgICBsZXQgbGVuZ3RoID0gYnVmZmVyLmRhdGF2aWV3LmdldEludDMyKGJ1ZmZlci5wb3NpdGlvbik7XG4gICAgICBpZiAoYnVmZmVyLmxlbmd0aCAtIGJ1ZmZlci5wb3NpdGlvbiA+PSBsZW5ndGgpIHtcbiAgICAgICAgbGV0IGhlYWRlciA9IGJ1ZmZlci5idWZmZXIuc2xpY2UoYnVmZmVyLnBvc2l0aW9uLCBidWZmZXIucG9zaXRpb24gKyA0KTtcbiAgICAgICAgYnVmZmVyLnNraXAoNClcbiAgICAgICAgbGV0IGJvZHkgPSBidWZmZXIuYnVmZmVyLnNsaWNlKGJ1ZmZlci5wb3NpdGlvbiwgYnVmZmVyLnBvc2l0aW9uICsgbGVuZ3RoKTtcbiAgICAgICAgYnVmZmVyLnNraXAobGVuZ3RoKTtcbiAgICAgICAgbGV0IHVuaXQgPSB7aGVhZGVyLCBib2R5fTtcbiAgICAgICAgTmFsdW5pdC5hbmFseXNlTmFsKHVuaXQpO1xuICAgICAgICBuYWxzLnB1c2godW5pdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5hbHM7XG4gIH1cblxuICBzdGF0aWMgYW5hbHlzZU5hbCAodW5pdCkge1xuICAgIGxldCB0eXBlID0gdW5pdC5ib2R5WzBdICYgMHgxZjtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgLy8gTkRSXG4gICAgICAgIHVuaXQubmRyID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDU6XG4gICAgICAgIC8vIElEUlxuICAgICAgICB1bml0LmlkciA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA2OlxuICAgICAgICAvLyBTRUlcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDc6XG4gICAgICAgIC8vIFNQU1xuICAgICAgICB1bml0LnNwcyA9IFNwc1BhcnNlci5wYXJzZVNQUyh1bml0LmJvZHkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgODpcbiAgICAgICAgLy8gUFBTXG4gICAgICAgIHVuaXQucHBzID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDk6XG4gICAgICAgIC8vIEFVRFxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRIZWFkZXJQb3NpdGlvbkFubmV4QiAoYnVmZmVyKSB7XG4gICAgLy8gc2VwZXJhdGVcbiAgICBsZXQgcG9zID0gYnVmZmVyLnBvc2l0aW9uO1xuICAgIGxldCBoZWFkZXJMZW5ndGggPSAwO1xuICAgIHdoaWxlIChoZWFkZXJMZW5ndGggIT09IDMgJiYgaGVhZGVyTGVuZ3RoICE9PSA0ICYmIHBvcyA8IGJ1ZmZlci5sZW5ndGggLSA0KSB7XG4gICAgICBpZiAoYnVmZmVyLmRhdGF2aWV3LmdldEludDE2KHBvcykgPT09IDApIHtcbiAgICAgICAgaWYgKGJ1ZmZlci5kYXRhdmlldy5nZXRJbnQxNihwb3MgKyAyKSA9PT0gMSkge1xuICAgICAgICAgIC8vIDB4MDAwMDAxXG4gICAgICAgICAgaGVhZGVyTGVuZ3RoID0gNDtcbiAgICAgICAgfSBlbHNlIGlmIChidWZmZXIuZGF0YXZpZXcuZ2V0SW50OChwb3MgKyAyKSA9PT0gMSkge1xuICAgICAgICAgIGhlYWRlckxlbmd0aCA9IDM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcG9zKys7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBvcysrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3MgPT09IGJ1ZmZlci5sZW5ndGggLSA0KSB7XG4gICAgICBpZiAoYnVmZmVyLmRhdGF2aWV3LmdldEludDE2KHBvcykgPT09IDApIHtcbiAgICAgICAgaWYgKGJ1ZmZlci5kYXRhdmlldy5nZXRJbnQxNihwb3MgKyAyKSA9PT0gMSkge1xuICAgICAgICAgIC8vIDB4MDAwMDAxXG4gICAgICAgICAgaGVhZGVyTGVuZ3RoID0gNDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcG9zKys7XG4gICAgICAgIGlmIChidWZmZXIuZGF0YXZpZXcuZ2V0SW50MTYocG9zKSA9PT0gMCAmJiBidWZmZXIuZGF0YXZpZXcuZ2V0SW50OChwb3MpID09PSAxKSB7XG4gICAgICAgICAgLy8gMHgwMDAwMDAxXG4gICAgICAgICAgaGVhZGVyTGVuZ3RoID0gMztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwb3MgPSBidWZmZXIubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7cG9zLCBoZWFkZXJMZW5ndGh9O1xuICB9XG5cbiAgc3RhdGljIGdldEF2Y2MgKHNwcywgcHBzKSB7XG4gICAgbGV0IHJldCA9IG5ldyBVaW50OEFycmF5KHNwcy5ieXRlTGVuZ3RoICsgcHBzLmJ5dGVMZW5ndGggKyAxMSk7XG4gICAgcmV0WzBdID0gMHgwMTtcbiAgICByZXRbMV0gPSBzcHNbMV07XG4gICAgcmV0WzJdID0gc3BzWzJdO1xuICAgIHJldFszXSA9IHNwc1szXTtcbiAgICByZXRbNF0gPSAyNTU7XG4gICAgcmV0WzVdID0gMjI1O1xuXG4gICAgbGV0IG9mZnNldCA9IDY7XG5cbiAgICByZXQuc2V0KG5ldyBVaW50OEFycmF5KFsoc3BzLmJ5dGVMZW5ndGggPj4+IDgpICYgMHhmZiwgc3BzLmJ5dGVMZW5ndGggJiAweGZmXSksIG9mZnNldCk7XG4gICAgb2Zmc2V0ICs9IDI7XG4gICAgcmV0LnNldChzcHMsIG9mZnNldCk7XG4gICAgb2Zmc2V0ICs9IHNwcy5ieXRlTGVuZ3RoO1xuXG4gICAgcmV0W29mZnNldF0gPSAxO1xuICAgIG9mZnNldCsrO1xuXG4gICAgcmV0LnNldChuZXcgVWludDhBcnJheShbKHBwcy5ieXRlTGVuZ3RoID4+PiA4KSAmIDB4ZmYsIHBwcy5ieXRlTGVuZ3RoICYgMHhmZl0pLCBvZmZzZXQpO1xuICAgIG9mZnNldCArPSAyO1xuICAgIHJldC5zZXQocHBzLCBvZmZzZXQpO1xuICAgIHJldHVybiByZXQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTmFsdW5pdDtcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAgKi9cbi8qIGVzbGludC1kaXNhYmxlIG9uZS12YXIgICovXG5pbXBvcnQgR29sb21iIGZyb20gJy4vZ29sb21iJ1xuXG5jbGFzcyBTUFNQYXJzZXIge1xuICBzdGF0aWMgX2Vic3AycmJzcCAodWludDhhcnJheSkge1xuICAgIGxldCBzcmMgPSB1aW50OGFycmF5XG4gICAgbGV0IHNyY0xlbmd0aCA9IHNyYy5ieXRlTGVuZ3RoXG4gICAgbGV0IGRzdCA9IG5ldyBVaW50OEFycmF5KHNyY0xlbmd0aClcbiAgICBsZXQgZHN0SWR4ID0gMFxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcmNMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGkgPj0gMikge1xuICAgICAgICBpZiAoc3JjW2ldID09PSAweDAzICYmIHNyY1tpIC0gMV0gPT09IDB4MDAgJiYgc3JjW2kgLSAyXSA9PT0gMHgwMCkge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGRzdFtkc3RJZHhdID0gc3JjW2ldXG4gICAgICBkc3RJZHgrK1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgVWludDhBcnJheShkc3QuYnVmZmVyLCAwLCBkc3RJZHgpXG4gIH1cblxuICBzdGF0aWMgcGFyc2VTUFMgKHVpbnQ4YXJyYXkpIHtcbiAgICBsZXQgcmJzcCA9IFNQU1BhcnNlci5fZWJzcDJyYnNwKHVpbnQ4YXJyYXkpXG4gICAgbGV0IGdiID0gbmV3IEdvbG9tYihyYnNwKVxuXG4gICAgZ2IucmVhZEJ5dGUoKVxuICAgIGxldCBwcm9maWxlSWRjID0gZ2IucmVhZEJ5dGUoKVxuICAgIGdiLnJlYWRCeXRlKClcbiAgICBsZXQgbGV2ZWxJZGMgPSBnYi5yZWFkQnl0ZSgpXG4gICAgZ2IucmVhZFVFRygpXG5cbiAgICBsZXQgcHJvZmlsZV9zdHJpbmcgPSBTUFNQYXJzZXIuZ2V0UHJvZmlsZVN0cmluZyhwcm9maWxlSWRjKVxuICAgIGxldCBsZXZlbF9zdHJpbmcgPSBTUFNQYXJzZXIuZ2V0TGV2ZWxTdHJpbmcobGV2ZWxJZGMpXG4gICAgbGV0IGNocm9tYV9mb3JtYXRfaWRjID0gMVxuICAgIGxldCBjaHJvbWFfZm9ybWF0ID0gNDIwXG4gICAgbGV0IGNocm9tYV9mb3JtYXRfdGFibGUgPSBbMCwgNDIwLCA0MjIsIDQ0NF1cbiAgICBsZXQgYml0X2RlcHRoID0gOFxuXG4gICAgaWYgKHByb2ZpbGVJZGMgPT09IDEwMCB8fCBwcm9maWxlSWRjID09PSAxMTAgfHwgcHJvZmlsZUlkYyA9PT0gMTIyIHx8XG4gICAgICBwcm9maWxlSWRjID09PSAyNDQgfHwgcHJvZmlsZUlkYyA9PT0gNDQgfHwgcHJvZmlsZUlkYyA9PT0gODMgfHxcbiAgICAgIHByb2ZpbGVJZGMgPT09IDg2IHx8IHByb2ZpbGVJZGMgPT09IDExOCB8fCBwcm9maWxlSWRjID09PSAxMjggfHxcbiAgICAgIHByb2ZpbGVJZGMgPT09IDEzOCB8fCBwcm9maWxlSWRjID09PSAxNDQpIHtcbiAgICAgIGNocm9tYV9mb3JtYXRfaWRjID0gZ2IucmVhZFVFRygpXG4gICAgICBpZiAoY2hyb21hX2Zvcm1hdF9pZGMgPT09IDMpIHtcbiAgICAgICAgZ2IucmVhZEJpdHMoMSlcbiAgICAgIH1cbiAgICAgIGlmIChjaHJvbWFfZm9ybWF0X2lkYyA8PSAzKSB7XG4gICAgICAgIGNocm9tYV9mb3JtYXQgPSBjaHJvbWFfZm9ybWF0X3RhYmxlW2Nocm9tYV9mb3JtYXRfaWRjXVxuICAgICAgfVxuXG4gICAgICBiaXRfZGVwdGggPSBnYi5yZWFkVUVHKCkgKyA4XG4gICAgICBnYi5yZWFkVUVHKClcbiAgICAgIGdiLnJlYWRCaXRzKDEpXG4gICAgICBpZiAoZ2IucmVhZEJvb2woKSkge1xuICAgICAgICBsZXQgc2NhbGluZ19saXN0X2NvdW50ID0gKGNocm9tYV9mb3JtYXRfaWRjICE9PSAzKSA/IDggOiAxMlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjYWxpbmdfbGlzdF9jb3VudDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGdiLnJlYWRCb29sKCkpIHtcbiAgICAgICAgICAgIGlmIChpIDwgNikge1xuICAgICAgICAgICAgICBTUFNQYXJzZXIuX3NraXBTY2FsaW5nTGlzdChnYiwgMTYpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBTUFNQYXJzZXIuX3NraXBTY2FsaW5nTGlzdChnYiwgNjQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGdiLnJlYWRVRUcoKVxuICAgIGxldCBwaWNfb3JkZXJfY250X3R5cGUgPSBnYi5yZWFkVUVHKClcbiAgICBpZiAocGljX29yZGVyX2NudF90eXBlID09PSAwKSB7XG4gICAgICBnYi5yZWFkVUVHKClcbiAgICB9IGVsc2UgaWYgKHBpY19vcmRlcl9jbnRfdHlwZSA9PT0gMSkge1xuICAgICAgZ2IucmVhZEJpdHMoMSlcbiAgICAgIGdiLnJlYWRTRUcoKVxuICAgICAgZ2IucmVhZFNFRygpXG4gICAgICBsZXQgbnVtX3JlZl9mcmFtZXNfaW5fcGljX29yZGVyX2NudF9jeWNsZSA9IGdiLnJlYWRVRUcoKVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1fcmVmX2ZyYW1lc19pbl9waWNfb3JkZXJfY250X2N5Y2xlOyBpKyspIHtcbiAgICAgICAgZ2IucmVhZFNFRygpXG4gICAgICB9XG4gICAgfVxuICAgIGdiLnJlYWRVRUcoKVxuICAgIGdiLnJlYWRCaXRzKDEpXG5cbiAgICBsZXQgcGljX3dpZHRoX2luX21ic19taW51czEgPSBnYi5yZWFkVUVHKClcbiAgICBsZXQgcGljX2hlaWdodF9pbl9tYXBfdW5pdHNfbWludXMxID0gZ2IucmVhZFVFRygpXG5cbiAgICBsZXQgZnJhbWVfbWJzX29ubHlfZmxhZyA9IGdiLnJlYWRCaXRzKDEpXG4gICAgaWYgKGZyYW1lX21ic19vbmx5X2ZsYWcgPT09IDApIHtcbiAgICAgIGdiLnJlYWRCaXRzKDEpXG4gICAgfVxuICAgIGdiLnJlYWRCaXRzKDEpXG5cbiAgICBsZXQgZnJhbWVfY3JvcF9sZWZ0X29mZnNldCA9IDBcbiAgICBsZXQgZnJhbWVfY3JvcF9yaWdodF9vZmZzZXQgPSAwXG4gICAgbGV0IGZyYW1lX2Nyb3BfdG9wX29mZnNldCA9IDBcbiAgICBsZXQgZnJhbWVfY3JvcF9ib3R0b21fb2Zmc2V0ID0gMFxuXG4gICAgbGV0IGZyYW1lX2Nyb3BwaW5nX2ZsYWcgPSBnYi5yZWFkQm9vbCgpXG4gICAgaWYgKGZyYW1lX2Nyb3BwaW5nX2ZsYWcpIHtcbiAgICAgIGZyYW1lX2Nyb3BfbGVmdF9vZmZzZXQgPSBnYi5yZWFkVUVHKClcbiAgICAgIGZyYW1lX2Nyb3BfcmlnaHRfb2Zmc2V0ID0gZ2IucmVhZFVFRygpXG4gICAgICBmcmFtZV9jcm9wX3RvcF9vZmZzZXQgPSBnYi5yZWFkVUVHKClcbiAgICAgIGZyYW1lX2Nyb3BfYm90dG9tX29mZnNldCA9IGdiLnJlYWRVRUcoKVxuICAgIH1cblxuICAgIGxldCBwYXJfd2lkdGggPSAxLCBwYXJfaGVpZ2h0ID0gMVxuICAgIGxldCBmcHMgPSAwLCBmcHNfZml4ZWQgPSB0cnVlLCBmcHNfbnVtID0gMCwgZnBzX2RlbiA9IDBcblxuICAgIGxldCB2dWlfcGFyYW1ldGVyc19wcmVzZW50X2ZsYWcgPSBnYi5yZWFkQm9vbCgpXG4gICAgaWYgKHZ1aV9wYXJhbWV0ZXJzX3ByZXNlbnRfZmxhZykge1xuICAgICAgaWYgKGdiLnJlYWRCb29sKCkpIHsgLy8gYXNwZWN0X3JhdGlvX2luZm9fcHJlc2VudF9mbGFnXG4gICAgICAgIGxldCBhc3BlY3RfcmF0aW9faWRjID0gZ2IucmVhZEJ5dGUoKVxuICAgICAgICBsZXQgcGFyX3dfdGFibGUgPSBbMSwgMTIsIDEwLCAxNiwgNDAsIDI0LCAyMCwgMzIsIDgwLCAxOCwgMTUsIDY0LCAxNjAsIDQsIDMsIDJdXG4gICAgICAgIGxldCBwYXJfaF90YWJsZSA9IFsxLCAxMSwgMTEsIDExLCAzMywgMTEsIDExLCAxMSwgMzMsIDExLCAxMSwgMzMsIDk5LCAzLCAyLCAxXVxuXG4gICAgICAgIGlmIChhc3BlY3RfcmF0aW9faWRjID4gMCAmJiBhc3BlY3RfcmF0aW9faWRjIDwgMTYpIHtcbiAgICAgICAgICBwYXJfd2lkdGggPSBwYXJfd190YWJsZVthc3BlY3RfcmF0aW9faWRjIC0gMV1cbiAgICAgICAgICBwYXJfaGVpZ2h0ID0gcGFyX2hfdGFibGVbYXNwZWN0X3JhdGlvX2lkYyAtIDFdXG4gICAgICAgIH0gZWxzZSBpZiAoYXNwZWN0X3JhdGlvX2lkYyA9PT0gMjU1KSB7XG4gICAgICAgICAgcGFyX3dpZHRoID0gZ2IucmVhZEJ5dGUoKSA8PCA4IHwgZ2IucmVhZEJ5dGUoKVxuICAgICAgICAgIHBhcl9oZWlnaHQgPSBnYi5yZWFkQnl0ZSgpIDw8IDggfCBnYi5yZWFkQnl0ZSgpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGdiLnJlYWRCb29sKCkpIHtcbiAgICAgICAgZ2IucmVhZEJvb2woKVxuICAgICAgfVxuICAgICAgaWYgKGdiLnJlYWRCb29sKCkpIHtcbiAgICAgICAgZ2IucmVhZEJpdHMoNClcbiAgICAgICAgaWYgKGdiLnJlYWRCb29sKCkpIHtcbiAgICAgICAgICBnYi5yZWFkQml0cygyNClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGdiLnJlYWRCb29sKCkpIHtcbiAgICAgICAgZ2IucmVhZFVFRygpXG4gICAgICAgIGdiLnJlYWRVRUcoKVxuICAgICAgfVxuICAgICAgaWYgKGdiLnJlYWRCb29sKCkpIHtcbiAgICAgICAgbGV0IG51bV91bml0c19pbl90aWNrID0gZ2IucmVhZEJpdHMoMzIpXG4gICAgICAgIGxldCB0aW1lX3NjYWxlID0gZ2IucmVhZEJpdHMoMzIpXG4gICAgICAgIGZwc19maXhlZCA9IGdiLnJlYWRCb29sKClcblxuICAgICAgICBmcHNfbnVtID0gdGltZV9zY2FsZVxuICAgICAgICBmcHNfZGVuID0gbnVtX3VuaXRzX2luX3RpY2sgKiAyXG4gICAgICAgIGZwcyA9IGZwc19udW0gLyBmcHNfZGVuXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHBhclNjYWxlID0gMVxuICAgIGlmIChwYXJfd2lkdGggIT09IDEgfHwgcGFyX2hlaWdodCAhPT0gMSkge1xuICAgICAgcGFyU2NhbGUgPSBwYXJfd2lkdGggLyBwYXJfaGVpZ2h0XG4gICAgfVxuXG4gICAgbGV0IGNyb3BfdW5pdF94ID0gMCwgY3JvcF91bml0X3kgPSAwXG4gICAgaWYgKGNocm9tYV9mb3JtYXRfaWRjID09PSAwKSB7XG4gICAgICBjcm9wX3VuaXRfeCA9IDFcbiAgICAgIGNyb3BfdW5pdF95ID0gMiAtIGZyYW1lX21ic19vbmx5X2ZsYWdcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHN1Yl93YyA9IChjaHJvbWFfZm9ybWF0X2lkYyA9PT0gMykgPyAxIDogMlxuICAgICAgbGV0IHN1Yl9oYyA9IChjaHJvbWFfZm9ybWF0X2lkYyA9PT0gMSkgPyAyIDogMVxuICAgICAgY3JvcF91bml0X3ggPSBzdWJfd2NcbiAgICAgIGNyb3BfdW5pdF95ID0gc3ViX2hjICogKDIgLSBmcmFtZV9tYnNfb25seV9mbGFnKVxuICAgIH1cblxuICAgIGxldCBjb2RlY193aWR0aCA9IChwaWNfd2lkdGhfaW5fbWJzX21pbnVzMSArIDEpICogMTZcbiAgICBsZXQgY29kZWNfaGVpZ2h0ID0gKDIgLSBmcmFtZV9tYnNfb25seV9mbGFnKSAqICgocGljX2hlaWdodF9pbl9tYXBfdW5pdHNfbWludXMxICsgMSkgKiAxNilcblxuICAgIGNvZGVjX3dpZHRoIC09IChmcmFtZV9jcm9wX2xlZnRfb2Zmc2V0ICsgZnJhbWVfY3JvcF9yaWdodF9vZmZzZXQpICogY3JvcF91bml0X3hcbiAgICBjb2RlY19oZWlnaHQgLT0gKGZyYW1lX2Nyb3BfdG9wX29mZnNldCArIGZyYW1lX2Nyb3BfYm90dG9tX29mZnNldCkgKiBjcm9wX3VuaXRfeVxuXG4gICAgbGV0IHByZXNlbnRfd2lkdGggPSBNYXRoLmNlaWwoY29kZWNfd2lkdGggKiBwYXJTY2FsZSlcblxuICAgIGdiLmRlc3Ryb3koKVxuICAgIGdiID0gbnVsbFxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHByb2ZpbGVfc3RyaW5nOiBwcm9maWxlX3N0cmluZyxcbiAgICAgIGxldmVsX3N0cmluZzogbGV2ZWxfc3RyaW5nLFxuICAgICAgYml0X2RlcHRoOiBiaXRfZGVwdGgsXG4gICAgICBjaHJvbWFfZm9ybWF0OiBjaHJvbWFfZm9ybWF0LFxuICAgICAgY2hyb21hX2Zvcm1hdF9zdHJpbmc6IFNQU1BhcnNlci5nZXRDaHJvbWFGb3JtYXRTdHJpbmcoY2hyb21hX2Zvcm1hdCksXG5cbiAgICAgIGZyYW1lX3JhdGU6IHtcbiAgICAgICAgZml4ZWQ6IGZwc19maXhlZCxcbiAgICAgICAgZnBzOiBmcHMsXG4gICAgICAgIGZwc19kZW46IGZwc19kZW4sXG4gICAgICAgIGZwc19udW06IGZwc19udW1cbiAgICAgIH0sXG5cbiAgICAgIHBhcl9yYXRpbzoge1xuICAgICAgICB3aWR0aDogcGFyX3dpZHRoLFxuICAgICAgICBoZWlnaHQ6IHBhcl9oZWlnaHRcbiAgICAgIH0sXG5cbiAgICAgIGNvZGVjX3NpemU6IHtcbiAgICAgICAgd2lkdGg6IGNvZGVjX3dpZHRoLFxuICAgICAgICBoZWlnaHQ6IGNvZGVjX2hlaWdodFxuICAgICAgfSxcblxuICAgICAgcHJlc2VudF9zaXplOiB7XG4gICAgICAgIHdpZHRoOiBwcmVzZW50X3dpZHRoLFxuICAgICAgICBoZWlnaHQ6IGNvZGVjX2hlaWdodFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBfc2tpcFNjYWxpbmdMaXN0IChnYiwgY291bnQpIHtcbiAgICBsZXQgbGFzdF9zY2FsZSA9IDgsIG5leHRfc2NhbGUgPSA4XG4gICAgbGV0IGRlbHRhX3NjYWxlID0gMFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgaWYgKG5leHRfc2NhbGUgIT09IDApIHtcbiAgICAgICAgZGVsdGFfc2NhbGUgPSBnYi5yZWFkU0VHKClcbiAgICAgICAgbmV4dF9zY2FsZSA9IChsYXN0X3NjYWxlICsgZGVsdGFfc2NhbGUgKyAyNTYpICUgMjU2XG4gICAgICB9XG4gICAgICBsYXN0X3NjYWxlID0gKG5leHRfc2NhbGUgPT09IDApID8gbGFzdF9zY2FsZSA6IG5leHRfc2NhbGVcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0UHJvZmlsZVN0cmluZyAocHJvZmlsZUlkYykge1xuICAgIHN3aXRjaCAocHJvZmlsZUlkYykge1xuICAgICAgY2FzZSA2NjpcbiAgICAgICAgcmV0dXJuICdCYXNlbGluZSdcbiAgICAgIGNhc2UgNzc6XG4gICAgICAgIHJldHVybiAnTWFpbidcbiAgICAgIGNhc2UgODg6XG4gICAgICAgIHJldHVybiAnRXh0ZW5kZWQnXG4gICAgICBjYXNlIDEwMDpcbiAgICAgICAgcmV0dXJuICdIaWdoJ1xuICAgICAgY2FzZSAxMTA6XG4gICAgICAgIHJldHVybiAnSGlnaDEwJ1xuICAgICAgY2FzZSAxMjI6XG4gICAgICAgIHJldHVybiAnSGlnaDQyMidcbiAgICAgIGNhc2UgMjQ0OlxuICAgICAgICByZXR1cm4gJ0hpZ2g0NDQnXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ1Vua25vd24nXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldExldmVsU3RyaW5nIChsZXZlbElkYykge1xuICAgIHJldHVybiAobGV2ZWxJZGMgLyAxMCkudG9GaXhlZCgxKVxuICB9XG5cbiAgc3RhdGljIGdldENocm9tYUZvcm1hdFN0cmluZyAoY2hyb21hKSB7XG4gICAgc3dpdGNoIChjaHJvbWEpIHtcbiAgICAgIGNhc2UgNDIwOlxuICAgICAgICByZXR1cm4gJzQ6MjowJ1xuICAgICAgY2FzZSA0MjI6XG4gICAgICAgIHJldHVybiAnNDoyOjInXG4gICAgICBjYXNlIDQ0NDpcbiAgICAgICAgcmV0dXJuICc0OjQ6NCdcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnVW5rbm93bidcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgdG9WaWRlb01ldGEgKHNwc0NvbmZpZykge1xuICAgIGxldCBtZXRhID0ge31cbiAgICBpZiAoc3BzQ29uZmlnICYmIHNwc0NvbmZpZy5jb2RlY19zaXplKSB7XG4gICAgICBtZXRhLmNvZGVjV2lkdGggPSBzcHNDb25maWcuY29kZWNfc2l6ZS53aWR0aFxuICAgICAgbWV0YS5jb2RlY0hlaWdodCA9IHNwc0NvbmZpZy5jb2RlY19zaXplLmhlaWdodFxuICAgICAgbWV0YS5wcmVzZW50V2lkdGggPSBzcHNDb25maWcucHJlc2VudF9zaXplLndpZHRoXG4gICAgICBtZXRhLnByZXNlbnRIZWlnaHQgPSBzcHNDb25maWcucHJlc2VudF9zaXplLmhlaWdodFxuICAgIH1cblxuICAgIG1ldGEucHJvZmlsZSA9IHNwc0NvbmZpZy5wcm9maWxlX3N0cmluZ1xuICAgIG1ldGEubGV2ZWwgPSBzcHNDb25maWcubGV2ZWxfc3RyaW5nXG4gICAgbWV0YS5iaXREZXB0aCA9IHNwc0NvbmZpZy5iaXRfZGVwdGhcbiAgICBtZXRhLmNocm9tYUZvcm1hdCA9IHNwc0NvbmZpZy5jaHJvbWFfZm9ybWF0XG5cbiAgICBtZXRhLnBhclJhdGlvID0ge1xuICAgICAgd2lkdGg6IHNwc0NvbmZpZy5wYXJfcmF0aW8ud2lkdGgsXG4gICAgICBoZWlnaHQ6IHNwc0NvbmZpZy5wYXJfcmF0aW8uaGVpZ2h0XG4gICAgfVxuXG4gICAgbWV0YS5mcmFtZVJhdGUgPSBzcHNDb25maWcuZnJhbWVfcmF0ZVxuXG4gICAgbGV0IGZwc0RlbiA9IG1ldGEuZnJhbWVSYXRlLmZwc19kZW5cbiAgICBsZXQgZnBzTnVtID0gbWV0YS5mcmFtZVJhdGUuZnBzX251bVxuICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb24gPSBNYXRoLmZsb29yKG1ldGEudGltZXNjYWxlICogKGZwc0RlbiAvIGZwc051bSkpXG4gICAgcmV0dXJuIG1ldGE7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU1BTUGFyc2VyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gSExTXG4gIE0zVThQYXJzZXI6IHJlcXVpcmUoJy4vc3JjL2hscy9kZW11eGVyL20zdThwYXJzZXInKS5kZWZhdWx0LFxuICBUc0RlbXV4ZXI6IHJlcXVpcmUoJy4vc3JjL2hscy9kZW11eGVyL3RzJykuZGVmYXVsdCxcbiAgUGxheWxpc3Q6IHJlcXVpcmUoJy4vc3JjL2hscy9wbGF5bGlzdCcpLmRlZmF1bHQsXG4gIEZsdkRlbXV4ZXI6IHJlcXVpcmUoJy4vc3JjL2Zsdi9pbmRleCcpLmRlZmF1bHRcbn07XG4iLCJpbXBvcnQgeyBpc0xlLCBVVEY4IH0gZnJvbSAneGdwbGF5ZXItdXRpbHMnXG5cbmNvbnN0IERBVEFfVFlQRVMgPSB7XG4gIE5VTUJFUjogMCxcbiAgQk9PTEVBTjogMSxcbiAgU1RSSU5HOiAyLFxuICBPQkpFQ1Q6IDMsXG4gIE1JWF9BUlJBWTogOCxcbiAgT0JKRUNUX0VORDogOSxcbiAgU1RSSUNUX0FSUkFZOiAxMCxcbiAgREFURTogMTEsXG4gIExPTkVfU1RSSU5HOiAxMlxufVxuXG4vKipcbiAqIG1ldGHkv6Hmga/op6PmnpBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQU1GUGFyc2VyIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMub2Zmc2V0ID0gMFxuICAgIHRoaXMucmVhZE9mZnNldCA9IHRoaXMub2Zmc2V0XG4gIH1cblxuICByZXNvbHZlIChtZXRhLCBzaXplKSB7XG4gICAgaWYgKHNpemUgPCAzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBlbm91Z2ggZGF0YSBmb3IgbWV0YWluZm8nKVxuICAgIH1cbiAgICBjb25zdCBtZXRhRGF0YSA9IHt9XG4gICAgY29uc3QgbmFtZSA9IHRoaXMucGFyc2VWYWx1ZShtZXRhKVxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5wYXJzZVZhbHVlKG1ldGEsIHNpemUgLSBuYW1lLmJvZHlTaXplKVxuICAgIG1ldGFEYXRhW25hbWUuZGF0YV0gPSB2YWx1ZS5kYXRhXG5cbiAgICB0aGlzLnJlc2V0U3RhdHVzKClcbiAgICByZXR1cm4gbWV0YURhdGFcbiAgfVxuXG4gIHJlc2V0U3RhdHVzICgpIHtcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgICB0aGlzLnJlYWRPZmZzZXQgPSB0aGlzLm9mZnNldFxuICB9XG5cbiAgcGFyc2VTdHJpbmcgKGJ1ZmZlcikge1xuICAgIGNvbnN0IGR2ID0gbmV3IERhdGFWaWV3KGJ1ZmZlciwgdGhpcy5yZWFkT2Zmc2V0KVxuICAgIGNvbnN0IHN0ckxlbiA9IGR2LmdldFVpbnQxNigwLCAhaXNMZSlcbiAgICBsZXQgc3RyID0gJydcbiAgICBpZiAoc3RyTGVuID4gMCkge1xuICAgICAgc3RyID0gVVRGOC5kZWNvZGUobmV3IFVpbnQ4QXJyYXkoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQgKyAyLCBzdHJMZW4pKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSAnJ1xuICAgIH1cbiAgICBsZXQgc2l6ZSA9IHN0ckxlbiArIDJcbiAgICB0aGlzLnJlYWRPZmZzZXQgKz0gc2l6ZVxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBzdHIsXG4gICAgICBib2R5U2l6ZTogc3RyTGVuICsgMlxuICAgIH1cbiAgfVxuXG4gIHBhcnNlRGF0ZSAoYnVmZmVyLCBzaXplKSB7XG4gICAgY29uc3QgZHYgPSBuZXcgRGF0YVZpZXcoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQsIHNpemUpXG4gICAgbGV0IHRzID0gZHYuZ2V0RmxvYXQ2NCgwLCAhaXNMZSlcbiAgICBjb25zdCB0aW1lT2Zmc2V0ID0gZHYuZ2V0SW50MTYoOCwgIWlzTGUpXG4gICAgdHMgKz0gdGltZU9mZnNldCAqIDYwICogMTAwMFxuXG4gICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDEwXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IG5ldyBEYXRlKHRzKSxcbiAgICAgIGJvZHlTaXplOiAxMFxuICAgIH1cbiAgfVxuXG4gIHBhcnNlT2JqZWN0IChidWZmZXIsIHNpemUpIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5wYXJzZVN0cmluZyhidWZmZXIsIHNpemUpXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnBhcnNlVmFsdWUoYnVmZmVyLCBzaXplIC0gbmFtZS5ib2R5U2l6ZSlcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YToge1xuICAgICAgICBuYW1lOiBuYW1lLmRhdGEsXG4gICAgICAgIHZhbHVlOiB2YWx1ZS5kYXRhXG4gICAgICB9LFxuICAgICAgYm9keVNpemU6IG5hbWUuYm9keVNpemUgKyB2YWx1ZS5ib2R5U2l6ZSxcbiAgICAgIGlzT2JqRW5kOiB2YWx1ZS5pc09iakVuZFxuICAgIH1cbiAgfVxuXG4gIHBhcnNlTG9uZ1N0cmluZyAoYnVmZmVyKSB7XG4gICAgY29uc3QgZHYgPSBuZXcgRGF0YVZpZXcoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQpXG4gICAgY29uc3Qgc3RyTGVuID0gZHYuZ2V0VWludDMyKDAsICFpc0xlKVxuICAgIGxldCBzdHIgPSAnJ1xuICAgIGlmIChzdHJMZW4gPiAwKSB7XG4gICAgICBzdHIgPSBVVEY4LmRlY29kZShuZXcgVWludDhBcnJheShidWZmZXIsIHRoaXMucmVhZE9mZnNldCArIDIsIHN0ckxlbikpXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9ICcnXG4gICAgfVxuICAgIC8vIGNvbnN0IHNpemUgPSBzdHJMZW4gKyA0O1xuICAgIHRoaXMucmVhZE9mZnNldCArPSBzdHJMZW4gKyA0XG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IHN0cixcbiAgICAgIGJvZHlTaXplOiBzdHJMZW4gKyA0XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOino+aekG1ldGHkuK3nmoTlj5jph49cbiAgICovXG4gIHBhcnNlVmFsdWUgKGRhdGEsIHNpemUpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKClcbiAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICBidWZmZXIgPSBkYXRhXG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1ZmZlciA9IGRhdGEuYnVmZmVyXG4gICAgfVxuICAgIGNvbnN0IHtcbiAgICAgIE5VTUJFUixcbiAgICAgIEJPT0xFQU4sXG4gICAgICBTVFJJTkcsXG4gICAgICBPQkpFQ1QsXG4gICAgICBNSVhfQVJSQVksXG4gICAgICBPQkpFQ1RfRU5ELFxuICAgICAgU1RSSUNUX0FSUkFZLFxuICAgICAgREFURSxcbiAgICAgIExPTkVfU1RSSU5HXG4gICAgfSA9IERBVEFfVFlQRVNcbiAgICBjb25zdCBkYXRhVmlldyA9IG5ldyBEYXRhVmlldyhidWZmZXIsIHRoaXMucmVhZE9mZnNldCwgc2l6ZSlcbiAgICBsZXQgaXNPYmpFbmQgPSBmYWxzZVxuICAgIGNvbnN0IHR5cGUgPSBkYXRhVmlldy5nZXRVaW50OCgwKVxuICAgIGxldCBvZmZzZXQgPSAxXG4gICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDFcbiAgICBsZXQgdmFsdWUgPSBudWxsXG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgTlVNQkVSOiB7XG4gICAgICAgIHZhbHVlID0gZGF0YVZpZXcuZ2V0RmxvYXQ2NCgxLCAhaXNMZSlcbiAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDhcbiAgICAgICAgb2Zmc2V0ICs9IDhcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGNhc2UgQk9PTEVBTjoge1xuICAgICAgICBjb25zdCBib29sTnVtID0gZGF0YVZpZXcuZ2V0VWludDgoMSlcbiAgICAgICAgdmFsdWUgPSAhIWJvb2xOdW1cbiAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDFcbiAgICAgICAgb2Zmc2V0ICs9IDFcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGNhc2UgU1RSSU5HOiB7XG4gICAgICAgIGNvbnN0IHN0ciA9IHRoaXMucGFyc2VTdHJpbmcoYnVmZmVyKVxuICAgICAgICB2YWx1ZSA9IHN0ci5kYXRhXG4gICAgICAgIG9mZnNldCArPSBzdHIuYm9keVNpemVcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGNhc2UgT0JKRUNUOiB7XG4gICAgICAgIHZhbHVlID0ge31cbiAgICAgICAgbGV0IG9iakVuZFNpemUgPSAwXG4gICAgICAgIGlmIChkYXRhVmlldy5nZXRVaW50MzIoc2l6ZSAtIDQsICFpc0xlKSAmIDB4MDBGRkZGRkYpIHtcbiAgICAgICAgICBvYmpFbmRTaXplID0gM1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMucmVhZE9mZnNldCArPSBvZmZzZXQgLSAxO1xuICAgICAgICB3aGlsZSAob2Zmc2V0IDwgc2l6ZSAtIDQpIHtcbiAgICAgICAgICBjb25zdCBhbWZPYmogPSB0aGlzLnBhcnNlT2JqZWN0KGJ1ZmZlciwgc2l6ZSAtIG9mZnNldCAtIG9iakVuZFNpemUpXG4gICAgICAgICAgaWYgKGFtZk9iai5pc09iamVjdEVuZCkgeyBicmVhayB9XG4gICAgICAgICAgdmFsdWVbYW1mT2JqLmRhdGEubmFtZV0gPSBhbWZPYmouZGF0YS52YWx1ZVxuICAgICAgICAgIG9mZnNldCArPSBhbWZPYmouYm9keVNpemVcbiAgICAgICAgfVxuICAgICAgICBpZiAob2Zmc2V0IDw9IHNpemUgLSAzKSB7XG4gICAgICAgICAgY29uc3QgbWFyayA9IGRhdGFWaWV3LmdldFVpbnQzMihvZmZzZXQgLSAxLCAhaXNMZSkgJiAweDAwRkZGRkZGXG4gICAgICAgICAgaWYgKG1hcmsgPT09IDkpIHtcbiAgICAgICAgICAgIHRoaXMucmVhZE9mZnNldCArPSAzXG4gICAgICAgICAgICBvZmZzZXQgKz0gM1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgY2FzZSBNSVhfQVJSQVk6IHtcbiAgICAgICAgdmFsdWUgPSB7fVxuICAgICAgICBvZmZzZXQgKz0gNFxuICAgICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gNFxuICAgICAgICBsZXQgb2JqRW5kU2l6ZSA9IDBcbiAgICAgICAgaWYgKChkYXRhVmlldy5nZXRVaW50MzIoc2l6ZSAtIDQsICFpc0xlKSAmIDB4MDBGRkZGRkYpID09PSA5KSB7XG4gICAgICAgICAgb2JqRW5kU2l6ZSA9IDNcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChvZmZzZXQgPCBzaXplIC0gOCkge1xuICAgICAgICAgIGNvbnN0IGFtZlZhciA9IHRoaXMucGFyc2VPYmplY3QoYnVmZmVyLCBzaXplIC0gb2Zmc2V0IC0gb2JqRW5kU2l6ZSlcbiAgICAgICAgICBpZiAoYW1mVmFyLmlzT2JqZWN0RW5kKSB7IGJyZWFrIH1cbiAgICAgICAgICB2YWx1ZVthbWZWYXIuZGF0YS5uYW1lXSA9IGFtZlZhci5kYXRhLnZhbHVlXG4gICAgICAgICAgb2Zmc2V0ICs9IGFtZlZhci5ib2R5U2l6ZVxuICAgICAgICB9XG4gICAgICAgIGlmIChvZmZzZXQgPD0gc2l6ZSAtIDMpIHtcbiAgICAgICAgICBjb25zdCBtYXJrZXIgPSBkYXRhVmlldy5nZXRVaW50MzIob2Zmc2V0IC0gMSwgIWlzTGUpICYgMHgwMEZGRkZGRlxuICAgICAgICAgIGlmIChtYXJrZXIgPT09IDkpIHtcbiAgICAgICAgICAgIG9mZnNldCArPSAzXG4gICAgICAgICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gM1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBjYXNlIE9CSkVDVF9FTkQ6IHtcbiAgICAgICAgdmFsdWUgPSBudWxsXG4gICAgICAgIGlzT2JqRW5kID0gdHJ1ZVxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBjYXNlIFNUUklDVF9BUlJBWToge1xuICAgICAgICB2YWx1ZSA9IFtdXG4gICAgICAgIGNvbnN0IGFyckxlbmd0aCA9IGRhdGFWaWV3LmdldFVpbnQzMigxLCAhaXNMZSlcbiAgICAgICAgb2Zmc2V0ICs9IDRcbiAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDRcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IHNjcmlwdCA9IHRoaXMucGFyc2VWYWx1ZShidWZmZXIsIHNpemUgLSBvZmZzZXQpXG4gICAgICAgICAgdmFsdWUucHVzaChzY3JpcHQuZGF0YSlcbiAgICAgICAgICBvZmZzZXQgKz0gc2NyaXB0LmJvZHlTaXplXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgY2FzZSBEQVRFOiB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSB0aGlzLnBhcnNlRGF0ZShidWZmZXIsIHNpemUgLSAxKVxuICAgICAgICB2YWx1ZSA9IGRhdGUuZGF0YVxuICAgICAgICBvZmZzZXQgKz0gZGF0ZS5ib2R5U2l6ZVxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBjYXNlIExPTkVfU1RSSU5HOiB7XG4gICAgICAgIGNvbnN0IGxvbmdTdHIgPSB0aGlzLnBhcnNlTG9uZ1N0cmluZyhidWZmZXIsIHNpemUgLSAxKVxuICAgICAgICB2YWx1ZSA9IGxvbmdTdHIuZGF0YVxuICAgICAgICBvZmZzZXQgKz0gbG9uZ1N0ci5ib2R5U2l6ZVxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIG9mZnNldCA9IHNpemVcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogdmFsdWUsXG4gICAgICBib2R5U2l6ZTogb2Zmc2V0LFxuICAgICAgaXNPYmpFbmQ6IGlzT2JqRW5kXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBFVkVOVFMsIEF1ZGlvVHJhY2tNZXRhLCBWaWRlb1RyYWNrTWV0YSB9IGZyb20gJ3hncGxheWVyLXV0aWxzJztcbmltcG9ydCB7IFNwc1BhcnNlciB9IGZyb20gJ3hncGxheWVyLWNvZGVjJztcbmltcG9ydCB7IFZpZGVvVHJhY2ssIEF1ZGlvVHJhY2sgfSBmcm9tICd4Z3BsYXllci1idWZmZXInXG5cbmltcG9ydCBBTUZQYXJzZXIgZnJvbSAnLi9hbWYtcGFyc2VyJ1xuXG5jb25zdCBERU1VWF9FVkVOVFMgPSBFVkVOVFMuREVNVVhfRVZFTlRTO1xuXG5jbGFzcyBGbHZEZW11eGVyIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuX2ZpcnN0RnJhZ21lbnRMb2FkZWQgPSBmYWxzZVxuICAgIHRoaXMuX3RyYWNrTnVtID0gMFxuICAgIHRoaXMuX2hhc1NjcmlwdCA9IGZhbHNlXG4gIH1cblxuICBpbml0ICgpIHtcbiAgICB0aGlzLm9uKERFTVVYX0VWRU5UUy5ERU1VWF9TVEFSVCwgdGhpcy5kb1BhcnNlRmx2LmJpbmQodGhpcykpXG4gIH1cblxuICAvKipcbiAgICogaWYgdGhlIGZsdiBoZWFkIGlzIHZhbGlkXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgc3RhdGljIGlzRmx2RmlsZSAoZGF0YSkge1xuICAgIHJldHVybiAhKGRhdGFbMF0gIT09IDB4NDYgfHwgZGF0YVsxXSAhPT0gMHg0QyB8fCBkYXRhWzJdICE9PSAweDU2IHx8IGRhdGFbM10gIT09IDB4MDEpXG4gIH1cblxuICAvKipcbiAgICogSWYgdGhlIHN0cmVhbSBoYXMgYXVkaW8gb3IgdmlkZW8uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzdHJlYW1GbGFnIC0gRGF0YSBmcm9tIHRoZSBzdHJlYW0gd2hpY2ggaXMgZGVmaW5lIHdoZXRoZXIgdGhlIGF1ZGlvIC8gdmlkZW8gdHJhY2sgaXMgZXhpc3QuXG4gICAqL1xuICBzdGF0aWMgZ2V0UGxheVR5cGUgKHN0cmVhbUZsYWcpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICBoYXNWaWRlbzogZmFsc2UsXG4gICAgICBoYXNBdWRpbzogZmFsc2VcbiAgICB9XG5cbiAgICBpZiAoc3RyZWFtRmxhZyAmIDB4MDEgPiAwKSB7XG4gICAgICByZXN1bHQuaGFzVmlkZW8gPSB0cnVlXG4gICAgfVxuXG4gICAgaWYgKHN0cmVhbUZsYWcgJiAweDA0ID4gMCkge1xuICAgICAgcmVzdWx0Lmhhc0F1ZGlvID0gdHJ1ZVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIGRvUGFyc2VGbHYgKCkge1xuICAgIGlmICghdGhpcy5fZmlyc3RGcmFnbWVudExvYWRlZCkge1xuICAgICAgaWYgKHRoaXMubG9hZGVyQnVmZmVyLmxlbmd0aCA8IDEzKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgY29uc3QgaGVhZGVyID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMTMpXG4gICAgICB0aGlzLnBhcnNlRmx2SGVhZGVyKGhlYWRlcilcbiAgICAgIHRoaXMuZG9QYXJzZUZsdigpIC8vIOmAkuW9kuiwg+eUqO+8jOe7p+e7reino+aekGZsdua1gVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5sb2FkZXJCdWZmZXIubGVuZ3RoIDwgMTEpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBsZXQgY2h1bms7XG5cbiAgICAgIGxldCBsb29wTWF4ID0gMTAwMDAwIC8vIOmYsuatouatu+W+queOr+S6p+eUn1xuICAgICAgZG8ge1xuICAgICAgICBjaHVuayA9IHRoaXMuX3BhcnNlRmx2VGFnKClcbiAgICAgIH0gd2hpbGUgKGNodW5rICYmIGxvb3BNYXgtLSA+IDApXG5cbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfQ09NUExFVEUpXG4gICAgfVxuICB9XG5cbiAgcGFyc2VGbHZIZWFkZXIgKGhlYWRlcikge1xuICAgIGlmICghRmx2RGVtdXhlci5pc0ZsdkZpbGUoaGVhZGVyKSkge1xuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgbmV3IEVycm9yKCdpbnZhbGlkIGZsdiBmaWxlJykpXG4gICAgICB0aGlzLmRvUGFyc2VGbHYoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9maXJzdEZyYWdtZW50TG9hZGVkID0gdHJ1ZVxuICAgICAgY29uc3QgcGxheVR5cGUgPSBGbHZEZW11eGVyLmdldFBsYXlUeXBlKGhlYWRlcls0XSlcblxuICAgICAgaWYgKHBsYXlUeXBlLmhhc1ZpZGVvKSB7XG4gICAgICAgIHRoaXMuaW5pdFZpZGVvVHJhY2soKVxuICAgICAgfVxuXG4gICAgICBpZiAocGxheVR5cGUuaGFzQXVkaW8pIHtcbiAgICAgICAgdGhpcy5pbml0QXVkaW9UcmFjaygpXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZG9QYXJzZUZsdigpXG4gIH1cblxuICAvKipcbiAgICogaW5pdCBkZWZhdWx0IHZpZGVvIHRyYWNrIGNvbmZpZ3NcbiAgICovXG4gIGluaXRWaWRlb1RyYWNrICgpIHtcbiAgICB0aGlzLl90cmFja051bSsrXG4gICAgbGV0IHZpZGVvVHJhY2sgPSBuZXcgVmlkZW9UcmFjaygpXG4gICAgdmlkZW9UcmFjay5tZXRhID0gbmV3IFZpZGVvVHJhY2tNZXRhKClcbiAgICB2aWRlb1RyYWNrLmlkID0gdmlkZW9UcmFjay5tZXRhLmlkID0gdGhpcy5fdHJhY2tOdW1cblxuICAgIHRoaXMudHJhY2tzLnZpZGVvVHJhY2sgPSB2aWRlb1RyYWNrXG4gIH1cblxuICAvKipcbiAgICogaW5pdCBkZWZhdWx0IGF1ZGlvIHRyYWNrIGNvbmZpZ3NcbiAgICovXG4gIGluaXRBdWRpb1RyYWNrICgpIHtcbiAgICB0aGlzLl90cmFja051bSsrXG4gICAgbGV0IGF1ZGlvVHJhY2sgPSBuZXcgQXVkaW9UcmFjaygpXG4gICAgYXVkaW9UcmFjay5tZXRhID0gbmV3IEF1ZGlvVHJhY2tNZXRhKClcbiAgICBhdWRpb1RyYWNrLmlkID0gYXVkaW9UcmFjay5tZXRhLmlkID0gdGhpcy5fdHJhY2tOdW1cblxuICAgIHRoaXMudHJhY2tzLmF1ZGlvVHJhY2sgPSBhdWRpb1RyYWNrXG4gIH1cblxuICAvKipcbiAgICogUGFja2FnZSB0aGUgZGF0YSBhcyB0aGUgZm9sbG93aW5nIGRhdGEgc3RydWN0dXJlXG4gICAqIHtcbiAgICogICAgZGF0YTogVWludDhBcnJheS4gdGhlIFN0cmVhbSBkYXRhLlxuICAgKiAgICBpbmZvOiBUaGUgZmlyc3QgYnl0ZSBpbmZvIG9mIHRoZSBUYWcuXG4gICAqICAgIHRhZ1R5cGU6IDjjgIE544CBMThcbiAgICogICAgdGltZVN0YW1wOiB0aGUgdGltZXN0ZW1wXG4gICAqIH1cbiAgICovXG4gIF9wYXJzZUZsdlRhZyAoKSB7XG4gICAgaWYgKHRoaXMubG9hZGVyQnVmZmVyLmxlbmd0aCA8IDExKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBsZXQgY2h1bmsgPSB0aGlzLl9wYXJzZUZsdlRhZ0hlYWRlcigpXG4gICAgaWYgKGNodW5rKSB7XG4gICAgICB0aGlzLl9wcm9jZXNzQ2h1bmsoY2h1bmspXG4gICAgfVxuICAgIHJldHVybiBjaHVua1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIHRoZSAxMSBieXRlIHRhZyBIZWFkZXJcbiAgICovXG4gIF9wYXJzZUZsdlRhZ0hlYWRlciAoKSB7XG4gICAgbGV0IG9mZnNldCA9IDBcbiAgICBsZXQgY2h1bmsgPSB7fVxuXG4gICAgbGV0IHRhZ1R5cGUgPSB0aGlzLmxvYWRlckJ1ZmZlci50b0ludChvZmZzZXQsIDEpXG4gICAgb2Zmc2V0ICs9IDFcblxuICAgIC8vIDIgYml0IEZNUyByZXNlcnZlZCwgMSBiaXQgZmlsdGVyZWQsIDUgYml0IHRhZyB0eXBlXG4gICAgY2h1bmsuZmlsdGVyZWQgPSAodGFnVHlwZSAmIDMyKSA+Pj4gNVxuICAgIGNodW5rLnRhZ1R5cGUgPSB0YWdUeXBlICYgMzFcblxuICAgIC8vIDMgQnl0ZSBkYXRhc2l6ZVxuICAgIGNodW5rLmRhdGFzaXplID0gdGhpcy5sb2FkZXJCdWZmZXIudG9JbnQob2Zmc2V0LCAzKVxuICAgIG9mZnNldCArPSAzXG5cbiAgICBpZiAoKGNodW5rLnRhZ1R5cGUgIT09IDggJiYgY2h1bmsudGFnVHlwZSAhPT0gOSAmJiBjaHVuay50YWdUeXBlICE9PSAxMSAmJiBjaHVuay50YWdUeXBlICE9PSAxOCkgfHxcbiAgICAgIHRoaXMubG9hZGVyQnVmZmVyLnRvSW50KDgsIDMpICE9PSAwKSB7XG4gICAgICBpZiAodGhpcy5sb2FkZXJCdWZmZXIgJiYgdGhpcy5sb2FkZXJCdWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgxKVxuICAgICAgfVxuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgdGhpcy5UQUcsIG5ldyBFcnJvcigndGFnVHlwZSAnICsgY2h1bmsudGFnVHlwZSksIGZhbHNlKVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sb2FkZXJCdWZmZXIubGVuZ3RoIDwgY2h1bmsuZGF0YXNpemUgKyAxNSkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICAvLyByZWFkIHRoZSBkYXRhLlxuICAgIHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDQpXG5cbiAgICAvLyAzIEJ5dGUgdGltZXN0YW1wXG4gICAgbGV0IHRpbWVzdGFtcCA9IHRoaXMubG9hZGVyQnVmZmVyLnRvSW50KDAsIDMpXG4gICAgdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMylcblxuICAgIC8vIDEgQnl0ZSB0aW1lc3RhbXBFeHRcbiAgICBsZXQgdGltZXN0YW1wRXh0ID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMSlbMF1cbiAgICBpZiAodGltZXN0YW1wRXh0ID4gMCkge1xuICAgICAgdGltZXN0YW1wICs9IHRpbWVzdGFtcEV4dCAqIDB4MTAwMDAwMFxuICAgIH1cblxuICAgIGNodW5rLmR0cyA9IHRpbWVzdGFtcFxuXG4gICAgLy8gc3RyZWFtSWRcbiAgICB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgzKVxuICAgIHJldHVybiBjaHVua1xuICB9XG5cbiAgX3Byb2Nlc3NDaHVuayAoY2h1bmspIHtcbiAgICBzd2l0Y2ggKGNodW5rLnRhZ1R5cGUpIHtcbiAgICAgIGNhc2UgMTg6XG4gICAgICAgIHRoaXMuX3BhcnNlU2NyaXB0RGF0YShjaHVuaylcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgODpcbiAgICAgICAgdGhpcy5fcGFyc2VBQUNEYXRhKGNodW5rKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSA5OlxuICAgICAgICB0aGlzLl9wYXJzZUhldmNEYXRhKGNodW5rKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAxMTpcbiAgICAgICAgLy8gZm9yIHNvbWUgQ0ROIHRoYXQgZGlkIG5vdCBwcm9jZXNzIHRoZSBjdXJyZWN0IFJUTVAgbWVzc2FnZXNcbiAgICAgICAgdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMylcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDEpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHBhcnNlIGZsdiBzY3JpcHQgZGF0YVxuICAgKiBAcGFyYW0gY2h1bmtcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9wYXJzZVNjcmlwdERhdGEgKGNodW5rKSB7XG4gICAgbGV0IGF1ZGlvVHJhY2sgPSB0aGlzLnRyYWNrcy5hdWRpb1RyYWNrXG4gICAgbGV0IHZpZGVvVHJhY2sgPSB0aGlzLnRyYWNrcy52aWRlb1RyYWNrXG5cbiAgICBsZXQgZGF0YSA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KGNodW5rLmRhdGFzaXplKVxuXG4gICAgY29uc3QgaW5mbyA9IG5ldyBBTUZQYXJzZXIoKS5yZXNvbHZlKGRhdGEsIGRhdGEubGVuZ3RoKVxuXG4gICAgY29uc3Qgb25NZXRhRGF0YSA9IHRoaXMuX2NvbnRleHQub25NZXRhRGF0YSA9IGluZm8gPyBpbmZvLm9uTWV0YURhdGEgOiB1bmRlZmluZWRcblxuICAgIC8vIGZpbGwgbWVkaWFJbmZvXG4gICAgdGhpcy5fY29udGV4dC5tZWRpYUluZm8uZHVyYXRpb24gPSBvbk1ldGFEYXRhLmR1cmF0aW9uXG4gICAgdGhpcy5fY29udGV4dC5tZWRpYUluZm8uaGFzVmlkZW8gPSBvbk1ldGFEYXRhLmhhc1ZpZGVvXG4gICAgdGhpcy5fY29udGV4dC5tZWRpYUluZm8uaHNhQXVkaW8gPSBvbk1ldGFEYXRhLmhhc0F1ZGlvXG5cbiAgICBsZXQgdmFsaWRhdGUgPSB0aGlzLl9kYXRhc2l6ZVZhbGlkYXRvcihjaHVuay5kYXRhc2l6ZSlcbiAgICBpZiAodmFsaWRhdGUpIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVESUFfSU5GTylcbiAgICAgIHRoaXMuX2hhc1NjcmlwdCA9IHRydWVcbiAgICB9XG5cbiAgICAvLyBFZGl0IGRlZmF1bHQgbWV0YS5cbiAgICBpZiAoYXVkaW9UcmFjayAmJiAhYXVkaW9UcmFjay5oYXNTcGVjaWZpY0NvbmZpZykge1xuICAgICAgbGV0IG1ldGEgPSBhdWRpb1RyYWNrLm1ldGFcbiAgICAgIGlmIChvbk1ldGFEYXRhLmF1ZGlvc2FtcGxlcmF0ZSkge1xuICAgICAgICBtZXRhLnNhbXBsZVJhdGUgPSBvbk1ldGFEYXRhLmF1ZGlvc2FtcGxlcmF0ZVxuICAgICAgfVxuXG4gICAgICBpZiAob25NZXRhRGF0YS5hdWRpb2NoYW5uZWxzKSB7XG4gICAgICAgIG1ldGEuY2hhbm5lbENvdW50ID0gb25NZXRhRGF0YS5hdWRpb2NoYW5uZWxzXG4gICAgICB9XG5cbiAgICAgIHN3aXRjaCAob25NZXRhRGF0YS5hdWRpb3NhbXBsZXJhdGUpIHtcbiAgICAgICAgY2FzZSA0NDEwMDpcbiAgICAgICAgICBtZXRhLnNhbXBsZVJhdGVJbmRleCA9IDRcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDIyMDUwOlxuICAgICAgICAgIG1ldGEuc2FtcGxlUmF0ZUluZGV4ID0gN1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMTEwMjU6XG4gICAgICAgICAgbWV0YS5zYW1wbGVSYXRlSW5kZXggPSAxMFxuICAgICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICAgIGlmICh2aWRlb1RyYWNrICYmICF2aWRlb1RyYWNrLmhhc1NwZWNpZmljQ29uZmlnKSB7XG4gICAgICBsZXQgbWV0YSA9IHZpZGVvVHJhY2subWV0YVxuICAgICAgaWYgKHR5cGVvZiBvbk1ldGFEYXRhLmZyYW1lcmF0ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgbGV0IGZwc051bSA9IE1hdGguZmxvb3Iob25NZXRhRGF0YS5mcmFtZXJhdGUgKiAxMDAwKVxuICAgICAgICBpZiAoZnBzTnVtID4gMCkge1xuICAgICAgICAgIGxldCBmcHMgPSBmcHNOdW0gLyAxMDAwXG4gICAgICAgICAgaWYgKCFtZXRhLmZyYW1lUmF0ZSkge1xuICAgICAgICAgICAgbWV0YS5mcmFtZVJhdGUgPSB7fVxuICAgICAgICAgIH1cbiAgICAgICAgICBtZXRhLmZyYW1lUmF0ZS5maXhlZCA9IHRydWVcbiAgICAgICAgICBtZXRhLmZyYW1lUmF0ZS5mcHMgPSBmcHNcbiAgICAgICAgICBtZXRhLmZyYW1lUmF0ZS5mcHNfbnVtID0gZnBzTnVtXG4gICAgICAgICAgbWV0YS5mcmFtZVJhdGUuZnBzX2RlbiA9IDEwMDBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9hYWNTZXF1ZW5jZUhlYWRlclBhcnNlciAoZGF0YSkge1xuICAgIGxldCByZXQgPSB7fVxuICAgIHJldC5oYXNTcGVjaWZpY0NvbmZpZyA9IHRydWVcbiAgICByZXQub2JqZWN0VHlwZSA9IGRhdGFbMV0gPj4+IDNcbiAgICByZXQuc2FtcGxlUmF0ZUluZGV4ID0gKChkYXRhWzFdICYgNykgPDwgMSkgfCAoZGF0YVsyXSA+Pj4gNylcbiAgICByZXQuYXVkaW9zYW1wbGVyYXRlID0gdGhpcy5fc3dpdGNoQXVkaW9TYW1wbGVSYXRlKHJldC5zYW1wbGVSYXRlSW5kZXgpXG4gICAgcmV0LmNoYW5uZWxDb3VudCA9IChkYXRhWzJdICYgMTIwKSA+Pj4gM1xuICAgIHJldC5mcmFtZUxlbmd0aCA9IChkYXRhWzJdICYgNCkgPj4+IDJcbiAgICByZXQuZGVwZW5kc09uQ29yZUNvZGVyID0gKGRhdGFbMl0gJiAyKSA+Pj4gMVxuICAgIHJldC5leHRlbnNpb25GbGFnSW5kZXggPSBkYXRhWzJdICYgMVxuXG4gICAgcmV0LmNvZGVjID0gYG1wNGEuNDAuJHtyZXQub2JqZWN0VHlwZX1gXG4gICAgbGV0IHVzZXJBZ2VudCA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgbGV0IGV4dGVuc2lvblNhbXBsaW5nSW5kZXg7XG5cbiAgICBsZXQgY29uZmlnO1xuICAgIGxldCBzYW1wbGluZ0luZGV4ID0gcmV0LnNhbXBsZVJhdGVJbmRleDtcblxuICAgIGlmICh1c2VyQWdlbnQuaW5kZXhPZignZmlyZWZveCcpICE9PSAtMSkge1xuICAgICAgLy8gZmlyZWZveDogdXNlIFNCUiAoSEUtQUFDKSBpZiBmcmVxIGxlc3MgdGhhbiAyNGtIelxuICAgICAgaWYgKHJldC5zYW1wbGVSYXRlSW5kZXggPj0gNikge1xuICAgICAgICByZXQub2JqZWN0VHlwZSA9IDU7XG4gICAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSg0KTtcbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCA9IHNhbXBsaW5nSW5kZXggLSAzO1xuICAgICAgfSBlbHNlIHsgLy8gdXNlIExDLUFBQ1xuICAgICAgICByZXQub2JqZWN0VHlwZSA9IDI7XG4gICAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSgyKTtcbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCA9IHNhbXBsaW5nSW5kZXg7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh1c2VyQWdlbnQuaW5kZXhPZignYW5kcm9pZCcpICE9PSAtMSkge1xuICAgICAgLy8gYW5kcm9pZDogYWx3YXlzIHVzZSBMQy1BQUNcbiAgICAgIHJldC5vYmplY3RUeXBlID0gMjtcbiAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSgyKTtcbiAgICAgIGV4dGVuc2lvblNhbXBsaW5nSW5kZXggPSBzYW1wbGluZ0luZGV4O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBmb3Igb3RoZXIgYnJvd3NlcnMsIGUuZy4gY2hyb21lLi4uXG4gICAgICAvLyBBbHdheXMgdXNlIEhFLUFBQyB0byBtYWtlIGl0IGVhc2llciB0byBzd2l0Y2ggYWFjIGNvZGVjIHByb2ZpbGVcbiAgICAgIHJldC5vYmplY3RUeXBlID0gNTtcbiAgICAgIGV4dGVuc2lvblNhbXBsaW5nSW5kZXggPSByZXQuc2FtcGxlUmF0ZUluZGV4O1xuICAgICAgY29uZmlnID0gbmV3IEFycmF5KDQpO1xuXG4gICAgICBpZiAocmV0LnNhbXBsZVJhdGVJbmRleCA+PSA2KSB7XG4gICAgICAgIGV4dGVuc2lvblNhbXBsaW5nSW5kZXggPSByZXQuc2FtcGxlUmF0ZUluZGV4IC0gMztcbiAgICAgIH0gZWxzZSBpZiAocmV0LmNoYW5uZWxDb3VudCA9PT0gMSkgeyAvLyBNb25vIGNoYW5uZWxcbiAgICAgICAgcmV0Lm9iamVjdFR5cGUgPSAyO1xuICAgICAgICBjb25maWcgPSBuZXcgQXJyYXkoMik7XG4gICAgICAgIGV4dGVuc2lvblNhbXBsaW5nSW5kZXggPSByZXQuc2FtcGxlUmF0ZUluZGV4O1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbmZpZ1swXSA9IHJldC5vYmplY3RUeXBlIDw8IDM7XG4gICAgY29uZmlnWzBdIHw9IChyZXQuc2FtcGxlUmF0ZUluZGV4ICYgMHgwRikgPj4+IDE7XG4gICAgY29uZmlnWzFdID0gKHJldC5zYW1wbGVSYXRlSW5kZXggJiAweDBGKSA8PCA3O1xuICAgIGNvbmZpZ1sxXSB8PSAocmV0LmNoYW5uZWxDb3VudCAmIDB4MEYpIDw8IDM7XG4gICAgaWYgKHJldC5vYmplY3RUeXBlID09PSA1KSB7XG4gICAgICBjb25maWdbMV0gfD0gKChleHRlbnNpb25TYW1wbGluZ0luZGV4ICYgMHgwRikgPj4+IDEpO1xuICAgICAgY29uZmlnWzJdID0gKGV4dGVuc2lvblNhbXBsaW5nSW5kZXggJiAweDAxKSA8PCA3O1xuICAgICAgLy8gZXh0ZW5kZWQgYXVkaW8gb2JqZWN0IHR5cGU6IGZvcmNlIHRvIDIgKExDLUFBQylcbiAgICAgIGNvbmZpZ1syXSB8PSAoMiA8PCAyKTtcbiAgICAgIGNvbmZpZ1szXSA9IDA7XG4gICAgfVxuICAgIHJldC5jb25maWcgPSBjb25maWdcbiAgICByZXR1cm4gcmV0XG4gIH1cblxuICBfcGFyc2VBQUNEYXRhIChjaHVuaykge1xuICAgIGxldCB0cmFjayA9IHRoaXMudHJhY2tzLmF1ZGlvVHJhY2tcbiAgICBpZiAoIXRyYWNrKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgbWV0YSA9IHRyYWNrLm1ldGFcblxuICAgIGlmICghbWV0YSkge1xuICAgICAgdHJhY2subWV0YSA9IG5ldyBBdWRpb1RyYWNrTWV0YSgpXG4gICAgICBtZXRhID0gdHJhY2subWV0YTtcbiAgICB9XG5cbiAgICBsZXQgaW5mbyA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDEpWzBdXG5cbiAgICBjaHVuay5kYXRhID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoY2h1bmsuZGF0YXNpemUgLSAxKVxuXG4gICAgbGV0IGZvcm1hdCA9IChpbmZvICYgMjQwKSA+Pj4gNFxuXG4gICAgdHJhY2suZm9ybWF0ID0gZm9ybWF0XG5cbiAgICBpZiAoZm9ybWF0ICE9PSAxMCkge1xuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgbmV3IEVycm9yKGBpbnZhbGlkIGF1ZGlvIGZvcm1hdDogJHtmb3JtYXR9YCkpXG4gICAgfVxuXG4gICAgaWYgKGZvcm1hdCA9PT0gMTAgJiYgIXRoaXMuX2hhc0F1ZGlvU2VxdWVuY2UpIHtcbiAgICAgIG1ldGEuc2FtcGxlUmF0ZSA9IHRoaXMuX3N3aXRjaEF1ZGlvU2FtcGxpbmdGcmVxdWVuY3koaW5mbylcbiAgICAgIG1ldGEuc2FtcGxlUmF0ZUluZGV4ID0gKGluZm8gJiAxMikgPj4+IDJcbiAgICAgIG1ldGEuZnJhbWVMZW50aCA9IChpbmZvICYgMikgPj4+IDFcbiAgICAgIG1ldGEuY2hhbm5lbENvdW50ID0gaW5mbyAmIDFcbiAgICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb24gPSBNYXRoLmZsb29yKDEwMjQgLyBtZXRhLmF1ZGlvU2FtcGxlUmF0ZSAqIG1ldGEudGltZXNjYWxlKVxuICAgIH1cblxuICAgIGxldCBhdWRpb1NhbXBsZVJhdGUgPSBtZXRhLmF1ZGlvU2FtcGxlUmF0ZVxuICAgIGxldCBhdWRpb1NhbXBsZVJhdGVJbmRleCA9IG1ldGEuc2FtcGxlUmF0ZUluZGV4XG4gICAgbGV0IHJlZlNhbXBsZUR1cmF0aW9uID0gbWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuXG4gICAgZGVsZXRlIGNodW5rLnRhZ1R5cGVcbiAgICBsZXQgdmFsaWRhdGUgPSB0aGlzLl9kYXRhc2l6ZVZhbGlkYXRvcihjaHVuay5kYXRhc2l6ZSlcblxuICAgIGlmIChjaHVuay5kYXRhWzBdID09PSAwKSB7IC8vIEFBQyBTZXF1ZW5jZSBIZWFkZXJcbiAgICAgIGxldCBhYWNIZWFkZXIgPSB0aGlzLl9hYWNTZXF1ZW5jZUhlYWRlclBhcnNlcihjaHVuay5kYXRhKVxuICAgICAgYXVkaW9TYW1wbGVSYXRlID0gYWFjSGVhZGVyLmF1ZGlvc2FtcGxlcmF0ZSB8fCBtZXRhLmF1ZGlvU2FtcGxlUmF0ZVxuICAgICAgYXVkaW9TYW1wbGVSYXRlSW5kZXggPSBhYWNIZWFkZXIuc2FtcGxlUmF0ZUluZGV4IHx8IG1ldGEuc2FtcGxlUmF0ZUluZGV4XG4gICAgICByZWZTYW1wbGVEdXJhdGlvbiA9IE1hdGguZmxvb3IoMTAyNCAvIGF1ZGlvU2FtcGxlUmF0ZSAqIG1ldGEudGltZXNjYWxlKVxuXG4gICAgICBtZXRhLmNoYW5uZWxDb3VudCA9IGFhY0hlYWRlci5jaGFubmVsQ291bnRcbiAgICAgIG1ldGEuc2FtcGxlUmF0ZSA9IGF1ZGlvU2FtcGxlUmF0ZVxuICAgICAgbWV0YS5zYW1wbGVSYXRlSW5kZXggPSBhdWRpb1NhbXBsZVJhdGVJbmRleFxuICAgICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA9IHJlZlNhbXBsZUR1cmF0aW9uXG4gICAgICBtZXRhLmR1cmF0aW9uID0gdGhpcy5fY29udGV4dC5tZWRpYUluZm8uZHVyYXRpb24gKiBtZXRhLnRpbWVzY2FsZVxuICAgICAgbWV0YS5jb25maWcgPSBhYWNIZWFkZXIuY29uZmlnXG4gICAgICBtZXRhLm9iamVjdFR5cGUgPSBhYWNIZWFkZXIub2JqZWN0VHlwZTtcblxuICAgICAgY29uc3QgYXVkaW9NZWRpYSA9IHRoaXMuX2NvbnRleHQubWVkaWFJbmZvLmF1ZGlvXG5cbiAgICAgIC8vIGZpbGwgYXVkaW8gbWVkaWEgaW5mb1xuICAgICAgYXVkaW9NZWRpYS5jb2RlYyA9IGFhY0hlYWRlci5jb2RlY1xuICAgICAgYXVkaW9NZWRpYS5jaGFubmVsQ291bnQgPSBhYWNIZWFkZXIuY2hhbm5lbENvdW50XG4gICAgICBhdWRpb01lZGlhLnNhbXBsZVJhdGUgPSBhdWRpb1NhbXBsZVJhdGVcbiAgICAgIGF1ZGlvTWVkaWEuc2FtcGxlUmF0ZUluZGV4ID0gYWFjSGVhZGVyLmF1ZGlvU2FtcGxlUmF0ZUluZGV4XG5cbiAgICAgIGlmICh0aGlzLl9oYXNTY3JpcHQgJiYgIXRoaXMuX2hhc0F1ZGlvU2VxdWVuY2UpIHtcbiAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICdhdWRpbycpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2hhc1NjcmlwdCAmJiB0aGlzLl9oYXNBdWRpb1NlcXVlbmNlKSB7XG4gICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAnYXVkaW8nKVxuICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkFVRElPX01FVEFEQVRBX0NIQU5HRSlcbiAgICAgICAgLy8gdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICdhdWRpbycpXG4gICAgICB9XG4gICAgICB0aGlzLl9oYXNBdWRpb1NlcXVlbmNlID0gdHJ1ZVxuXG4gICAgICB0aGlzLl9tZXRhQ2hhbmdlID0gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5fbWV0YUNoYW5nZSkge1xuICAgICAgICBjaHVuay5vcHRpb25zID0ge1xuICAgICAgICAgIG1ldGE6IHRyYWNrLm1ldGFcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fbWV0YUNoYW5nZSA9IGZhbHNlXG4gICAgICB9XG5cbiAgICAgIGNodW5rLmRhdGEgPSBjaHVuay5kYXRhLnNsaWNlKDEsIGNodW5rLmRhdGEubGVuZ3RoKVxuICAgICAgdHJhY2suc2FtcGxlcy5wdXNoKGNodW5rKVxuICAgIH1cbiAgICBpZiAoIXZhbGlkYXRlKSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLlRBRywgbmV3IEVycm9yKCdUQUcgbGVuZ3RoIGVycm9yIGF0ICcgKyBjaHVuay5kYXRhc2l6ZSksIGZhbHNlKVxuICAgICAgLy8gdGhpcy5sb2dnZXIud2Fybih0aGlzLlRBRywgZXJyb3IubWVzc2FnZSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcGFyc2UgaGV2Yy9hdmMgdmlkZW8gZGF0YVxuICAgKiBAcGFyYW0gY2h1bmtcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9wYXJzZUhldmNEYXRhIChjaHVuaykge1xuICAgIC8vIGhlYWRlclxuICAgIGxldCBpbmZvID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMSlbMF1cbiAgICBjaHVuay5mcmFtZVR5cGUgPSAoaW5mbyAmIDB4ZjApID4+PiA0XG4gICAgY2h1bmsuaXNLZXlmcmFtZSA9IGNodW5rLmZyYW1lVHlwZSA9PT0gMVxuICAgIC8vIGxldCB0ZW1wQ29kZWNJRCA9IHRoaXMudHJhY2tzLnZpZGVvVHJhY2suY29kZWNJRFxuICAgIGxldCBjb2RlY0lEID0gaW5mbyAmIDB4MGZcbiAgICB0aGlzLnRyYWNrcy52aWRlb1RyYWNrLmNvZGVjSUQgPSBjb2RlY0lEXG5cbiAgICAvLyBoZXZj5ZKMYXZj55qEaGVhZGVy6Kej5p6Q5pa55byP5LiA5qC3XG4gICAgY2h1bmsuYXZjUGFja2V0VHlwZSA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDEpWzBdXG4gICAgY2h1bmsuY3RzID0gdGhpcy5sb2FkZXJCdWZmZXIudG9JbnQoMCwgMylcbiAgICB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgzKVxuXG4gICAgLy8gMTIgZm9yIGhldmMsIDcgZm9yIGF2Y1xuICAgIGlmIChjb2RlY0lEID09PSAxMikge1xuICAgICAgY29uc3QgZGF0YSA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KGNodW5rLmRhdGFzaXplIC0gNSlcbiAgICAgIGNodW5rLmRhdGEgPSBkYXRhXG5cbiAgICAgIGlmIChOdW1iZXIucGFyc2VJbnQoY2h1bmsuYXZjUGFja2V0VHlwZSkgIT09IDApIHtcbiAgICAgICAgaWYgKCF0aGlzLl9kYXRhc2l6ZVZhbGlkYXRvcihjaHVuay5kYXRhc2l6ZSkpIHtcbiAgICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLlRBRywgbmV3IEVycm9yKGBpbnZhbGlkIHZpZGVvIHRhZyBkYXRhc2l6ZTogJHtjaHVuay5kYXRhc2l6ZX1gKSwgZmFsc2UpXG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5hbHUgPSB7fVxuICAgICAgICBsZXQgciA9IDBcbiAgICAgICAgbmFsdS5jdHMgPSBjaHVuay5jdHNcbiAgICAgICAgbmFsdS5kdHMgPSBjaHVuay5kdHNcbiAgICAgICAgd2hpbGUgKGNodW5rLmRhdGEubGVuZ3RoID4gcikge1xuICAgICAgICAgIGxldCBzaXplcyA9IGNodW5rLmRhdGEuc2xpY2UoTnVtYmVyLnBhcnNlSW50KHIpLCA0ICsgcilcbiAgICAgICAgICBuYWx1LnNpemUgPSBzaXplc1szXVxuICAgICAgICAgIG5hbHUuc2l6ZSArPSBzaXplc1syXSAqIDI1NlxuICAgICAgICAgIG5hbHUuc2l6ZSArPSBzaXplc1sxXSAqIDI1NiAqIDI1NlxuICAgICAgICAgIG5hbHUuc2l6ZSArPSBzaXplc1swXSAqIDI1NiAqIDI1NiAqIDI1NlxuICAgICAgICAgIHIgKz0gNFxuICAgICAgICAgIG5hbHUuZGF0YSA9IGNodW5rLmRhdGEuc2xpY2UoTnVtYmVyLnBhcnNlSW50KHIpLCBuYWx1LnNpemUgKyByKVxuICAgICAgICAgIHIgKz0gbmFsdS5zaXplXG4gICAgICAgICAgdGhpcy50cmFja3MudmlkZW9UcmFjay5zYW1wbGVzLnB1c2gobmFsdSlcbiAgICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgJ3ZpZGVvJylcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChOdW1iZXIucGFyc2VJbnQoY2h1bmsuYXZjUGFja2V0VHlwZSkgPT09IDApIHtcbiAgICAgICAgaWYgKCF0aGlzLl9kYXRhc2l6ZVZhbGlkYXRvcihjaHVuay5kYXRhc2l6ZSkpIHtcbiAgICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLlRBRywgbmV3IEVycm9yKGBpbnZhbGlkIHZpZGVvIHRhZyBkYXRhc2l6ZTogJHtjaHVuay5kYXRhc2l6ZX1gKSwgZmFsc2UpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICd2aWRlbycpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNvZGVjSUQgPT09IDcpIHtcbiAgICAgIGxldCBkYXRhID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoY2h1bmsuZGF0YXNpemUgLSA1KVxuICAgICAgaWYgKGRhdGFbNF0gPT09IDAgJiYgZGF0YVs1XSA9PT0gMCAmJiBkYXRhWzZdID09PSAwICYmIGRhdGFbN10gPT09IDEpIHtcbiAgICAgICAgbGV0IGF2Y2NsZW5ndGggPSAwXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgYXZjY2xlbmd0aCA9IGF2Y2NsZW5ndGggKiAyNTYgKyBkYXRhW2ldXG4gICAgICAgIH1cbiAgICAgICAgYXZjY2xlbmd0aCAtPSA0XG4gICAgICAgIGRhdGEgPSBkYXRhLnNsaWNlKDQsIGRhdGEubGVuZ3RoKVxuICAgICAgICBkYXRhWzNdID0gYXZjY2xlbmd0aCAlIDI1NlxuICAgICAgICBhdmNjbGVuZ3RoID0gKGF2Y2NsZW5ndGggLSBkYXRhWzNdKSAvIDI1NlxuICAgICAgICBkYXRhWzJdID0gYXZjY2xlbmd0aCAlIDI1NlxuICAgICAgICBhdmNjbGVuZ3RoID0gKGF2Y2NsZW5ndGggLSBkYXRhWzJdKSAvIDI1NlxuICAgICAgICBkYXRhWzFdID0gYXZjY2xlbmd0aCAlIDI1NlxuICAgICAgICBkYXRhWzBdID0gKGF2Y2NsZW5ndGggLSBkYXRhWzFdKSAvIDI1NlxuICAgICAgfVxuXG4gICAgICBjaHVuay5kYXRhID0gZGF0YVxuICAgICAgLy8gSWYgaXQgaXMgQVZDIHNlcXVlY2UgSGVhZGVyLlxuICAgICAgaWYgKGNodW5rLmF2Y1BhY2tldFR5cGUgPT09IDApIHtcbiAgICAgICAgdGhpcy5fYXZjU2VxdWVuY2VIZWFkZXJQYXJzZXIoY2h1bmsuZGF0YSlcbiAgICAgICAgbGV0IHZhbGlkYXRlID0gdGhpcy5fZGF0YXNpemVWYWxpZGF0b3IoY2h1bmsuZGF0YXNpemUpXG4gICAgICAgIGlmICh2YWxpZGF0ZSkge1xuICAgICAgICAgIGlmICh0aGlzLl9oYXNTY3JpcHQgJiYgIXRoaXMuX2hhc1ZpZGVvU2VxdWVuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAndmlkZW8nKVxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5faGFzU2NyaXB0ICYmIHRoaXMuX2hhc1ZpZGVvU2VxdWVuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAnYXVkaW8nKVxuICAgICAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5WSURFT19NRVRBREFUQV9DSEFOR0UpXG4gICAgICAgICAgICAvLyB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgJ3ZpZGVvJylcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5faGFzVmlkZW9TZXF1ZW5jZSA9IHRydWVcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tZXRhQ2hhbmdlID0gdHJ1ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCF0aGlzLl9kYXRhc2l6ZVZhbGlkYXRvcihjaHVuay5kYXRhc2l6ZSkpIHtcbiAgICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLlRBRywgbmV3IEVycm9yKGBpbnZhbGlkIHZpZGVvIHRhZyBkYXRhc2l6ZTogJHtjaHVuay5kYXRhc2l6ZX1gKSwgZmFsc2UpXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9tZXRhQ2hhbmdlKSB7XG4gICAgICAgICAgY2h1bmsub3B0aW9ucyA9IHtcbiAgICAgICAgICAgIG1ldGE6IE9iamVjdC5hc3NpZ24oe30sIHRoaXMudHJhY2tzLnZpZGVvVHJhY2subWV0YSlcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fbWV0YUNoYW5nZSA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50cmFja3MudmlkZW9UcmFjay5zYW1wbGVzLnB1c2goY2h1bmspXG4gICAgICAgIC8vIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfQ09NUExFVEUpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIHRoaXMuVEFHLCBuZXcgRXJyb3IoYHZpZGVvIGNvZGVpZCBpcyAke2NvZGVjSUR9YCksIGZhbHNlKVxuICAgICAgY2h1bmsuZGF0YSA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KGNodW5rLmRhdGFzaXplIC0gMSlcbiAgICAgIGlmICghdGhpcy5fZGF0YXNpemVWYWxpZGF0b3IoY2h1bmsuZGF0YXNpemUpKSB7XG4gICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIHRoaXMuVEFHLCBuZXcgRXJyb3IoYGludmFsaWQgdmlkZW8gdGFnIGRhdGFzaXplOiAke2NodW5rLmRhdGFzaXplfWApLCBmYWxzZSlcbiAgICAgIH1cbiAgICAgIHRoaXMudHJhY2tzLnZpZGVvVHJhY2suc2FtcGxlcy5wdXNoKGNodW5rKVxuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9DT01QTEVURSlcbiAgICB9XG4gICAgZGVsZXRlIGNodW5rLnRhZ1R5cGVcbiAgfVxuXG4gIC8qKlxuICAgKiBwYXJzZSBhdmMgbWV0YWRhdGFcbiAgICogQHBhcmFtIGRhdGFcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9hdmNTZXF1ZW5jZUhlYWRlclBhcnNlciAoZGF0YSkge1xuICAgIGxldCB0cmFjayA9IHRoaXMudHJhY2tzLnZpZGVvVHJhY2tcblxuICAgIGlmICghdHJhY2spIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBvZmZzZXQgPSAwXG5cbiAgICBpZiAoIXRyYWNrLm1ldGEpIHtcbiAgICAgIHRyYWNrLm1ldGEgPSBuZXcgVmlkZW9UcmFja01ldGEoKVxuICAgIH1cbiAgICBsZXQgbWV0YSA9IHRyYWNrLm1ldGFcblxuICAgIG1ldGEuY29uZmlndXJhdGlvblZlcnNpb24gPSBkYXRhWzBdXG4gICAgbWV0YS5hdmNQcm9maWxlSW5kaWNhdGlvbiA9IGRhdGFbMV1cbiAgICBtZXRhLnByb2ZpbGVDb21wYXRpYmlsaXR5ID0gZGF0YVsyXVxuICAgIG1ldGEuYXZjTGV2ZWxJbmRpY2F0aW9uID0gZGF0YVszXSAvIDEwXG4gICAgbWV0YS5uYWxVbml0TGVuZ3RoID0gKGRhdGFbNF0gJiAweDAzKSArIDFcblxuICAgIGxldCBudW1PZlNwcyA9IGRhdGFbNV0gJiAweDFmXG4gICAgb2Zmc2V0ID0gNlxuICAgIGxldCBjb25maWcgPSB7fVxuXG4gICAgLy8gcGFyc2UgU1BTXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1PZlNwczsgaSsrKSB7XG4gICAgICBsZXQgc2l6ZSA9IGRhdGFbb2Zmc2V0XSAqIDI1NSArIGRhdGFbb2Zmc2V0ICsgMV1cbiAgICAgIG9mZnNldCArPSAyXG5cbiAgICAgIGxldCBzcHMgPSBuZXcgVWludDhBcnJheShzaXplKVxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaXplOyBqKyspIHtcbiAgICAgICAgc3BzW2pdID0gZGF0YVtvZmZzZXQgKyBqXVxuICAgICAgfVxuXG4gICAgICAvLyBjb2RlYyBzdHJpbmdcbiAgICAgIGxldCBjb2RlY1N0cmluZyA9ICdhdmMxLidcbiAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgNDsgaisrKSB7XG4gICAgICAgIGxldCBoID0gc3BzW2pdLnRvU3RyaW5nKDE2KVxuICAgICAgICBpZiAoaC5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgaCA9ICcwJyArIGhcbiAgICAgICAgfVxuICAgICAgICBjb2RlY1N0cmluZyArPSBoXG4gICAgICB9XG5cbiAgICAgIG1ldGEuY29kZWMgPSBjb2RlY1N0cmluZ1xuXG4gICAgICBvZmZzZXQgKz0gc2l6ZVxuICAgICAgdGhpcy50cmFja3MudmlkZW9UcmFjay5tZXRhLnNwcyA9IHNwc1xuICAgICAgY29uZmlnID0gU3BzUGFyc2VyLnBhcnNlU1BTKHNwcylcbiAgICB9XG5cbiAgICBsZXQgbnVtT2ZQcHMgPSBkYXRhW29mZnNldF1cblxuICAgIG9mZnNldCsrXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bU9mUHBzOyBpKyspIHtcbiAgICAgIGxldCBzaXplID0gZGF0YVtvZmZzZXRdICogMjU1ICsgZGF0YVtvZmZzZXQgKyAxXVxuICAgICAgb2Zmc2V0ICs9IDJcbiAgICAgIGxldCBwcHMgPSBuZXcgVWludDhBcnJheShzaXplKVxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaXplOyBqKyspIHtcbiAgICAgICAgcHBzW2pdID0gZGF0YVtvZmZzZXQgKyBqXVxuICAgICAgfVxuICAgICAgb2Zmc2V0ICs9IHNpemVcbiAgICAgIHRoaXMudHJhY2tzLnZpZGVvVHJhY2subWV0YS5wcHMgPSBwcHNcbiAgICB9XG5cbiAgICBPYmplY3QuYXNzaWduKG1ldGEsIFNwc1BhcnNlci50b1ZpZGVvTWV0YShjb25maWcpKVxuXG4gICAgLy8gZmlsbCB2aWRlbyBtZWRpYSBpbmZvXG4gICAgY29uc3QgdmlkZW9NZWRpYSA9IHRoaXMuX2NvbnRleHQubWVkaWFJbmZvLnZpZGVvXG5cbiAgICB2aWRlb01lZGlhLmNvZGVjID0gbWV0YS5jb2RlY1xuICAgIHZpZGVvTWVkaWEucHJvZmlsZSA9IG1ldGEucHJvZmlsZVxuICAgIHZpZGVvTWVkaWEubGV2ZWwgPSBtZXRhLmxldmVsXG4gICAgdmlkZW9NZWRpYS5jaHJvbWFGb3JtYXQgPSBtZXRhLmNocm9tYUZvcm1hdFxuICAgIHZpZGVvTWVkaWEuZnJhbWVSYXRlID0gbWV0YS5mcmFtZVJhdGVcbiAgICB2aWRlb01lZGlhLnBhclJhdGlvID0gbWV0YS5wYXJSYXRpb1xuICAgIHZpZGVvTWVkaWEud2lkdGggPSB2aWRlb01lZGlhLndpZHRoID09PSBtZXRhLnByZXNlbnRXaWR0aCA/IHZpZGVvTWVkaWEud2lkdGggOiBtZXRhLnByZXNlbnRXaWR0aFxuICAgIHZpZGVvTWVkaWEuaGVpZ2h0ID0gdmlkZW9NZWRpYS5oZWlnaHQgPT09IG1ldGEucHJlc2VudEhlaWdodCA/IHZpZGVvTWVkaWEud2lkdGggOiBtZXRhLnByZXNlbnRIZWlnaHRcblxuICAgIG1ldGEuZHVyYXRpb24gPSB0aGlzLl9jb250ZXh0Lm1lZGlhSW5mby5kdXJhdGlvbiAqIG1ldGEudGltZXNjYWxlXG4gICAgbWV0YS5hdmNjID0gbmV3IFVpbnQ4QXJyYXkoZGF0YS5sZW5ndGgpXG4gICAgbWV0YS5hdmNjLnNldChkYXRhKVxuICAgIHRyYWNrLm1ldGEgPSBtZXRhXG4gIH1cblxuICAvKipcbiAgICogY2hvb3NlIGF1ZGlvIHNhbXBsZSByYXRlXG4gICAqIEBwYXJhbSBzYW1wbGluZ0ZyZXF1ZW5jeUluZGV4XG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc3dpdGNoQXVkaW9TYW1wbGVSYXRlIChzYW1wbGluZ0ZyZXF1ZW5jeUluZGV4KSB7XG4gICAgbGV0IHNhbXBsaW5nRnJlcXVlbmN5TGlzdCA9IFs5NjAwMCwgODgyMDAsIDY0MDAwLCA0ODAwMCwgNDQxMDAsIDMyMDAwLCAyNDAwMCwgMjIwNTAsIDE2MDAwLCAxMjAwMCwgMTEwMjUsIDgwMDAsIDczNTBdXG4gICAgcmV0dXJuIHNhbXBsaW5nRnJlcXVlbmN5TGlzdFtzYW1wbGluZ0ZyZXF1ZW5jeUluZGV4XVxuICB9XG5cbiAgLyoqXG4gICAqIGNob29zZSBhdWRpbyBzYW1wbGluZyBmcmVxdWVuY2VcbiAgICogQHBhcmFtIGluZm9cbiAgICogQHJldHVybnMge251bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zd2l0Y2hBdWRpb1NhbXBsaW5nRnJlcXVlbmN5IChpbmZvKSB7XG4gICAgbGV0IHNhbXBsaW5nRnJlcXVlbmN5SW5kZXggPSAoaW5mbyAmIDEyKSA+Pj4gMlxuICAgIGxldCBzYW1wbGluZ0ZyZXF1ZW5jeUxpc3QgPSBbNTUwMCwgMTEwMjUsIDIyMDUwLCA0NDEwMCwgNDgwMDBdXG4gICAgcmV0dXJuIHNhbXBsaW5nRnJlcXVlbmN5TGlzdFtzYW1wbGluZ0ZyZXF1ZW5jeUluZGV4XVxuICB9XG5cbiAgLyoqXG4gICAqIGNob29zZSBhdWRpbyBjaGFubmVsIGNvdW50XG4gICAqIEBwYXJhbSBpbmZvXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc3dpdGNoQXVkaW9DaGFubmVsIChpbmZvKSB7XG4gICAgbGV0IHNhbXBsZVRyYWNrTnVtSW5kZXggPSBpbmZvICYgMVxuICAgIGxldCBzYW1wbGVUcmFja051bUxpc3QgPSBbMSwgMl1cbiAgICByZXR1cm4gc2FtcGxlVHJhY2tOdW1MaXN0W3NhbXBsZVRyYWNrTnVtSW5kZXhdXG4gIH1cblxuICAvKipcbiAgICogY2hlY2sgZGF0YXNpemUgaXMgdmFsaWQgdXNlIDQgQnl0ZSBhZnRlciBjdXJyZW50IHRhZ1xuICAgKiBAcGFyYW0gZGF0YXNpemVcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZGF0YXNpemVWYWxpZGF0b3IgKGRhdGFzaXplKSB7XG4gICAgbGV0IGRhdGFzaXplQ29uZmlybSA9IHRoaXMubG9hZGVyQnVmZmVyLnRvSW50KDAsIDQpXG4gICAgdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoNClcbiAgICByZXR1cm4gZGF0YXNpemVDb25maXJtID09PSBkYXRhc2l6ZSArIDExXG4gIH1cblxuICBnZXQgbG9hZGVyQnVmZmVyICgpIHtcbiAgICBjb25zdCBidWZmZXIgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdMT0FERVJfQlVGRkVSJylcbiAgICBpZiAoYnVmZmVyKSB7XG4gICAgICByZXR1cm4gYnVmZmVyXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIG5ldyBFcnJvcign5om+5LiN5YiwIGxvYWRlckJ1ZmZlciDlrp7kvosnKSlcbiAgICB9XG4gIH1cblxuICBnZXQgdHJhY2tzICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJylcbiAgfVxuXG4gIGdldCBsb2dnZXIgKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdMT0dHRVInKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZsdkRlbXV4ZXJcbiIsIi8qKlxuICogUmVmZXJlbmNlOiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjODIxNiNzZWN0aW9uLTQuM1xuICovXG5jbGFzcyBNM1U4UGFyc2VyIHtcbiAgc3RhdGljIHBhcnNlICh0ZXh0LCBiYXNldXJsID0gJycpIHtcbiAgICBsZXQgcmV0ID0ge1xuICAgICAgZHVyYXRpb246IDBcbiAgICB9O1xuICAgIGlmICghdGV4dCB8fCAhdGV4dC5zcGxpdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgcmVmcyA9IHRleHQuc3BsaXQoL1xccnxcXG4vKTtcbiAgICByZWZzID0gcmVmcy5maWx0ZXIoKHJlZikgPT4ge1xuICAgICAgcmV0dXJuIHJlZjtcbiAgICB9KVxuICAgIGxldCByZWYgPSByZWZzLnNoaWZ0KClcbiAgICBpZiAoIXJlZi5tYXRjaCgnI0VYVE0zVScpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgbTN1OCBmaWxlOiBub3QgXCIjRVhUTTNVXCJgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZWYgPSByZWZzLnNoaWZ0KClcbiAgICB3aGlsZSAocmVmKSB7XG4gICAgICBsZXQgcmVmbSA9IHJlZi5tYXRjaCgvIyguW0EtWnwtXSopOiguKikvKTtcbiAgICAgIGxldCByZWZkID0gcmVmLm1hdGNoKC8jKC5bQS1afC1dKikvKTtcbiAgICAgIGlmIChyZWZkICYmIHJlZm0gJiYgcmVmbS5sZW5ndGggPiAyKSB7XG4gICAgICAgIHN3aXRjaCAocmVmbVsxXSkge1xuICAgICAgICAgIGNhc2UgJ0VYVC1YLVZFUlNJT04nOlxuICAgICAgICAgICAgcmV0LnZlcnNpb24gPSBwYXJzZUludChyZWZtWzJdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ0VYVC1YLU1FRElBLVNFUVVFTkNFJzpcbiAgICAgICAgICAgIHJldC5zZXF1ZW5jZSA9IHBhcnNlSW50KHJlZm1bMl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnRVhULVgtVEFSR0VURFVSQVRJT04nOlxuICAgICAgICAgICAgcmV0LnRhcmdldGR1cmF0aW9uID0gcGFyc2VGbG9hdChyZWZtWzJdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ0VYVElORic6XG4gICAgICAgICAgICBNM1U4UGFyc2VyLnBhcnNlRnJhZyhyZWZtLCByZWZzLCByZXQsIGJhc2V1cmwpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnRVhULVgtS0VZJzpcbiAgICAgICAgICAgIE0zVThQYXJzZXIucGFyc2VEZWNyeXB0KHJlZm1bMl0scmV0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSBpZihyZWZkICYmIHJlZmQubGVuZ3RoID4gMSkge1xuICAgICAgICBzd2l0Y2gocmVmZFsxXSkge1xuICAgICAgICAgIGNhc2UgJ0VYVC1YLURJU0NPTlRJTlVJVFknOlxuICAgICAgICAgICAgcmVmID0gcmVmcy5zaGlmdCgpO1xuICAgICAgICAgICAgbGV0IHJlZm0gPSByZWYubWF0Y2goLyMoLltBLVp8LV0qKTooLiopLyk7XG4gICAgICAgICAgICBpZihyZWZtLmxlbmd0aCA+MiAmJiByZWZtWzFdID09PSAnRVhUSU5GJykge1xuICAgICAgICAgICAgICBNM1U4UGFyc2VyLnBhcnNlRnJhZyhyZWZtLCByZWZzLCByZXQsIGJhc2V1cmwsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZWYgPSByZWZzLnNoaWZ0KClcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZUZyYWcgKHJlZm0sIHJlZnMsIHJldCwgYmFzZXVybCwgZGlzY29udGludWUpIHtcbiAgICBpZiAoIXJldC5mcmFncykge1xuICAgICAgcmV0LmZyYWdzID0gW11cbiAgICB9XG5cbiAgICBsZXQgZnJlZyA9IHtcbiAgICAgIHN0YXJ0OiByZXQuZHVyYXRpb24sXG4gICAgICBkdXJhdGlvbjogcGFyc2VGbG9hdChyZWZtWzJdKSAqIDEwMDBcbiAgICB9XG5cbiAgICByZXQuZHVyYXRpb24gKz0gZnJlZy5kdXJhdGlvbjtcbiAgICBsZXQgbmV4dGxpbmUgPSByZWZzLnNoaWZ0KCk7XG4gICAgaWYgKG5leHRsaW5lLm1hdGNoKC8jKC4qKTooLiopLykpIHtcbiAgICAgIG5leHRsaW5lID0gcmVmcy5zaGlmdCgpO1xuICAgIH1cbiAgICBpZiAobmV4dGxpbmUubGVuZ3RoID4gMCAmJiBuZXh0bGluZS5jaGFyQXQoMCkgPT09ICcvJyAmJiBiYXNldXJsLm1hdGNoKC8uKlxcL1xcLy4qXFwuXFx3Ky9nKSkge1xuICAgICAgYmFzZXVybCA9IGJhc2V1cmwubWF0Y2goLy4qXFwvXFwvLipcXC5cXHcrL2cpWzBdO1xuICAgIH1cbiAgICBpZiAobmV4dGxpbmUubWF0Y2goLy4qOlxcL1xcLy4qLykpIHtcbiAgICAgIGZyZWcudXJsID0gbmV4dGxpbmU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZyZWcudXJsID0gYmFzZXVybCArIG5leHRsaW5lO1xuICAgIH1cbiAgICBmcmVnLmRpc2NvbnRpbnVlID0gZGlzY29udGludWU7XG4gICAgcmV0LmZyYWdzLnB1c2goZnJlZyk7XG4gIH1cblxuICBzdGF0aWMgcGFyc2VVUkwgKHVybCkge1xuICAgIGxldCBiYXNldXJsID0gJyc7XG4gICAgbGV0IHVybHMgPSB1cmwubWF0Y2goLyguKlxcLykuKlxcLm0zdTgvKTtcbiAgICBpZiAodXJscyAmJiB1cmxzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdXJscy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodXJsc1tpXS5tYXRjaCgvLipcXC8kL2cpICYmIHVybHNbaV0ubGVuZ3RoID4gYmFzZXVybC5sZW5ndGgpIHtcbiAgICAgICAgICBiYXNldXJsID0gdXJsc1tpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYmFzZXVybDtcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZURlY3J5cHQocmVmbSwgcmV0KSB7XG4gICAgcmV0LmVuY3J5cHQgPSB7fTtcbiAgICBsZXQgcmVmcyA9IHJlZm0uc3BsaXQoJywnKTtcbiAgICBmb3IgKGxldCBpIGluIHJlZnMpIHsgXG4gICAgICBsZXQgY21kID0gcmVmc1tpXTtcbiAgICAgIGlmKGNtZC5tYXRjaCgvTUVUSE9EPSguKikvKSkge1xuICAgICAgICByZXQuZW5jcnlwdC5tZXRob2QgPSBjbWQubWF0Y2goL01FVEhPRD0oLiopLylbMV07XG4gICAgICB9XG4gICAgICBpZihjbWQubWF0Y2goL1VSST1cIiguKilcIi8pKSB7XG4gICAgICAgIHJldC5lbmNyeXB0LnVyaSA9IGNtZC5tYXRjaCgvVVJJPVwiKC4qKVwiLylbMV07XG4gICAgICB9XG5cbiAgICAgIGlmKGNtZC5tYXRjaCgvSVY9MHgoLiopLykpIHtcbiAgICAgICAgbGV0IGl2ID0gY21kLm1hdGNoKC9JVj0weCguKikvKVsxXTtcbiAgICAgICAgbGV0IGxlbmd0aCA9IE1hdGguY2VpbChpdi5sZW5ndGggLyAyKTtcbiAgICAgICAgcmV0LmVuY3J5cHQuaXZiID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKTtcbiAgICAgICAgZm9yKGxldCBpID0gbGVuZ3RoIC0gMTsgaSA+PTA7IGktLSkge1xuICAgICAgICAgIGxldCBpbSA9IHBhcnNlSW50KGl2LnN1YnN0cihpICogMiwgMiksIDE2KTtcbiAgICAgICAgICByZXQuZW5jcnlwdC5pdmJbaV0gPSBpbTtcbiAgICAgICAgfSBcbiAgICAgICAgcmV0LmVuY3J5cHQuaXYgPSBpdjtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE0zVThQYXJzZXI7XG4iLCJpbXBvcnQgeyBOYWx1bml0IH0gZnJvbSAneGdwbGF5ZXItY29kZWMnO1xuaW1wb3J0IHsgQXVkaW9UcmFjaywgVmlkZW9UcmFjayB9IGZyb20gJ3hncGxheWVyLWJ1ZmZlcic7XG5pbXBvcnQge1xuICBBdWRpb1RyYWNrTWV0YSxcbiAgVmlkZW9UcmFja01ldGEsXG4gIEF1ZGlvVHJhY2tTYW1wbGUsXG4gIFZpZGVvVHJhY2tTYW1wbGUsXG4gIEVWRU5UUyxcbiAgU3RyZWFtXG59IGZyb20gJ3hncGxheWVyLXV0aWxzJztcblxuY29uc3QgREVNVVhfRVZFTlRTID0gRVZFTlRTLkRFTVVYX0VWRU5UUztcbmNvbnN0IFN0cmVhbVR5cGUgPSB7XG4gIDB4MDE6IFsndmlkZW8nLCAnTVBFRy0xJ10sXG4gIDB4MDI6IFsndmlkZW8nLCAnTVBFRy0yJ10sXG4gIDB4MWI6IFsndmlkZW8nLCAnQVZDLkgyNjQnXSxcbiAgMHhlYTogWyd2aWRlbycsICdWQy0xJ10sXG4gIDB4MDM6IFsnYXVkaW8nLCAnTVBFRy0xJ10sXG4gIDB4MDQ6IFsnYXVkaW8nLCAnTVBFRy0yJ10sXG4gIDB4MGY6IFsnYXVkaW8nLCAnTVBFRy0yLkFBQyddLFxuICAweDExOiBbJ2F1ZGlvJywgJ01QRUctNC5BQUMnXSxcbiAgMHg4MDogWydhdWRpbycsICdMUENNJ10sXG4gIDB4ODE6IFsnYXVkaW8nLCAnQUMzJ10sXG4gIDB4MDY6IFsnYXVkaW8nLCAnQUMzJ10sXG4gIDB4ODI6IFsnYXVkaW8nLCAnRFRTJ10sXG4gIDB4ODM6IFsnYXVkaW8nLCAnRG9sYnkgVHJ1ZUhEJ10sXG4gIDB4ODQ6IFsnYXVkaW8nLCAnQUMzLVBsdXMnXSxcbiAgMHg4NTogWydhdWRpbycsICdEVFMtSEQnXSxcbiAgMHg4NjogWydhdWRpbycsICdEVFMtTUEnXSxcbiAgMHhhMTogWydhdWRpbycsICdBQzMtUGx1cy1TRUMnXSxcbiAgMHhhMjogWydhdWRpbycsICdEVFMtSEQtU0VDJ11cbn07XG5cbmNsYXNzIFRzRGVtdXhlciB7XG4gIGNvbnN0cnVjdG9yIChjb25maWdzKSB7XG4gICAgdGhpcy5jb25maWdzID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlncyk7XG4gICAgdGhpcy5kZW11eGluZyA9IGZhbHNlO1xuICAgIHRoaXMucGF0ID0gW107XG4gICAgdGhpcy5wbXQgPSBbXTtcbiAgICB0aGlzLl9oYXNWaWRlb01ldGEgPSBmYWxzZTtcbiAgICB0aGlzLl9oYXNBdWRpb01ldGEgPSBmYWxzZTtcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIHRoaXMub24oREVNVVhfRVZFTlRTLkRFTVVYX1NUQVJULCB0aGlzLmRlbXV4LmJpbmQodGhpcykpXG4gIH1cblxuICBkZW11eCAoZnJhZykge1xuICAgIGlmICh0aGlzLmRlbXV4aW5nKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgYnVmZmVyID0gdGhpcy5pbnB1dEJ1ZmZlcjtcbiAgICBsZXQgZnJhZ3MgPSB7IHBhdDogW10sIHBtdDogW10gfTtcbiAgICBsZXQgcGVzZXMgPSB7fTtcblxuICAgIC8vIFJlYWQgVFMgc2VnbWVudFxuICAgIHdoaWxlIChidWZmZXIubGVuZ3RoID49IDE4OCkge1xuICAgICAgaWYgKGJ1ZmZlci5sZW5ndGggPj0gMSAmJiBidWZmZXIuYXJyYXlbMF1bYnVmZmVyLm9mZnNldF0gIT09IDcxKSB7XG4gICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIHRoaXMuVEFHLCBuZXcgRXJyb3IoYFVudHJ1c3Qgc3luYyBjb2RlOiAke2J1ZmZlci5hcnJheVswXVtidWZmZXIub2Zmc2V0XX0sIHRyeSB0byByZWNvdmVyO2ApLCBmYWxzZSk7XG4gICAgICB9XG4gICAgICB3aGlsZSAoYnVmZmVyLmxlbmd0aCA+PSAxICYmIGJ1ZmZlci5hcnJheVswXVtidWZmZXIub2Zmc2V0XSAhPT0gNzEpIHtcbiAgICAgICAgYnVmZmVyLnNoaWZ0KDEpO1xuICAgICAgfVxuICAgICAgbGV0IGJ1ZiA9IGJ1ZmZlci5zaGlmdCgxODgpO1xuICAgICAgLy8gY29uc29sZS5sb2coYnVmKTtcbiAgICAgIGxldCB0c1N0cmVhbSA9IG5ldyBTdHJlYW0oYnVmLmJ1ZmZlcik7XG4gICAgICBsZXQgdHMgPSB7fTtcbiAgICAgIFRzRGVtdXhlci5yZWFkKHRzU3RyZWFtLCB0cywgZnJhZ3MpO1xuICAgICAgaWYgKHRzLnBlcykge1xuICAgICAgICBpZiAoIXBlc2VzW3RzLmhlYWRlci5waWRdKSB7XG4gICAgICAgICAgcGVzZXNbdHMuaGVhZGVyLnBpZF0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBwZXNlc1t0cy5oZWFkZXIucGlkXS5wdXNoKHRzLnBlcyk7XG4gICAgICAgIHRzLnBlcy5FUy5idWZmZXIgPSBbdHMucGVzLkVTLmJ1ZmZlcl07XG4gICAgICB9IGVsc2UgaWYgKHBlc2VzW3RzLmhlYWRlci5waWRdKSB7XG4gICAgICAgIHBlc2VzW3RzLmhlYWRlci5waWRdW3Blc2VzW3RzLmhlYWRlci5waWRdLmxlbmd0aCAtIDFdLkVTLmJ1ZmZlci5wdXNoKHRzLnBheWxvYWQuc3RyZWFtKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgQXVkaW9PcHRpb25zID0gZnJhZztcbiAgICBsZXQgVmlkZW9PcHRpb25zID0gZnJhZztcblxuICAgIC8vIEdldCBGcmFtZXMgZGF0YVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgT2JqZWN0LmtleXMocGVzZXMpLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgZXBlc2VzID0gcGVzZXNbT2JqZWN0LmtleXMocGVzZXMpW2ldXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZXBlc2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGVwZXNlc1tqXS5pZCA9IE9iamVjdC5rZXlzKHBlc2VzKVtpXTtcbiAgICAgICAgZXBlc2VzW2pdLkVTLmJ1ZmZlciA9IFRzRGVtdXhlci5NZXJnZShlcGVzZXNbal0uRVMuYnVmZmVyKTtcbiAgICAgICAgaWYgKGVwZXNlc1tqXS50eXBlID09PSAnYXVkaW8nKSB7XG4gICAgICAgICAgdGhpcy5wdXNoQXVkaW9TYW1wbGUoZXBlc2VzW2pdLCBBdWRpb09wdGlvbnMpO1xuICAgICAgICAgIEF1ZGlvT3B0aW9ucyA9IHt9O1xuICAgICAgICB9IGVsc2UgaWYgKGVwZXNlc1tqXS50eXBlID09PSAndmlkZW8nKSB7XG4gICAgICAgICAgdGhpcy5wdXNoVmlkZW9TYW1wbGUoZXBlc2VzW2pdLCBWaWRlb09wdGlvbnMpO1xuICAgICAgICAgIFZpZGVvT3B0aW9ucyA9IHt9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2hhc0F1ZGlvTWV0YSkge1xuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9DT01QTEVURSwgJ2F1ZGlvJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9oYXNWaWRlb01ldGEpIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfQ09NUExFVEUsICd2aWRlbycpO1xuICAgIH1cbiAgfVxuXG4gIHB1c2hBdWRpb1NhbXBsZSAocGVzLCBvcHRpb25zKSB7XG4gICAgbGV0IHRyYWNrO1xuICAgIGlmICghdGhpcy5fdHJhY2tzLmF1ZGlvVHJhY2spIHtcbiAgICAgIHRoaXMuX3RyYWNrcy5hdWRpb1RyYWNrID0gbmV3IEF1ZGlvVHJhY2soKTtcbiAgICAgIHRyYWNrID0gdGhpcy5fdHJhY2tzLmF1ZGlvVHJhY2s7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYWNrID0gdGhpcy5fdHJhY2tzLmF1ZGlvVHJhY2s7XG4gICAgfVxuICAgIGxldCBtZXRhID0gbmV3IEF1ZGlvVHJhY2tNZXRhKHtcbiAgICAgIGF1ZGlvU2FtcGxlUmF0ZTogcGVzLkVTLmZyZXF1ZW5jZSxcbiAgICAgIHNhbXBsZVJhdGU6IHBlcy5FUy5mcmVxdWVuY2UsXG4gICAgICBjaGFubmVsQ291bnQ6IHBlcy5FUy5jaGFubmVsLFxuICAgICAgY29kZWM6ICdtcDRhLjQwLicgKyBwZXMuRVMuYXVkaW9PYmplY3RUeXBlLFxuICAgICAgY29uZmlnOiBwZXMuRVMuYXVkaW9Db25maWcsXG4gICAgICBpZDogMixcbiAgICAgIHNhbXBsZVJhdGVJbmRleDogcGVzLkVTLmZyZXF1ZW5jeUluZGV4XG4gICAgfSk7XG4gICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA9IE1hdGguZmxvb3IoMTAyNCAvIG1ldGEuYXVkaW9TYW1wbGVSYXRlICogbWV0YS50aW1lc2NhbGUpO1xuXG4gICAgbGV0IG1ldGFFcXVhbCA9IFRzRGVtdXhlci5jb21wYWlyZU1ldGEodHJhY2subWV0YSwgbWV0YSwgdHJ1ZSk7XG5cbiAgICBpZiAoIXRoaXMuX2hhc0F1ZGlvTWV0YSB8fCAhbWV0YUVxdWFsKSB7XG4gICAgICB0cmFjay5tZXRhID0gbWV0YTtcbiAgICAgIHRoaXMuX2hhc0F1ZGlvTWV0YSA9IHRydWVcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAnYXVkaW8nKTtcbiAgICB9XG5cbiAgICBsZXQgZGF0YSA9IG5ldyBVaW50OEFycmF5KHBlcy5FUy5idWZmZXIuYnVmZmVyLnNsaWNlKHBlcy5FUy5idWZmZXIucG9zaXRpb24sIHBlcy5FUy5idWZmZXIubGVuZ3RoKSk7XG4gICAgbGV0IGR0cyA9IHBhcnNlSW50KHBlcy5wdHMgLyA5MCk7XG4gICAgbGV0IHB0cyA9IHBhcnNlSW50KHBlcy5wdHMgLyA5MCk7XG4gICAgbGV0IHNhbXBsZSA9IG5ldyBBdWRpb1RyYWNrU2FtcGxlKHtkdHMsIHB0cywgZGF0YSwgb3B0aW9uc30pO1xuICAgIHRyYWNrLnNhbXBsZXMucHVzaChzYW1wbGUpO1xuICB9XG5cbiAgcHVzaFZpZGVvU2FtcGxlIChwZXMsIG9wdGlvbnMpIHtcbiAgICBsZXQgbmFscyA9IE5hbHVuaXQuZ2V0TmFsdW5pdHMocGVzLkVTLmJ1ZmZlcik7XG4gICAgbGV0IHRyYWNrO1xuICAgIGxldCBtZXRhID0gbmV3IFZpZGVvVHJhY2tNZXRhKCk7XG4gICAgaWYgKCF0aGlzLl90cmFja3MudmlkZW9UcmFjaykge1xuICAgICAgdGhpcy5fdHJhY2tzLnZpZGVvVHJhY2sgPSBuZXcgVmlkZW9UcmFjaygpO1xuICAgICAgdHJhY2sgPSB0aGlzLl90cmFja3MudmlkZW9UcmFjaztcbiAgICB9IGVsc2Uge1xuICAgICAgdHJhY2sgPSB0aGlzLl90cmFja3MudmlkZW9UcmFjaztcbiAgICB9XG4gICAgbGV0IHNhbXBsZUxlbmd0aCA9IDA7XG4gICAgbGV0IHNwcyA9IGZhbHNlO1xuICAgIGxldCBwcHMgPSBmYWxzZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBuYWwgPSBuYWxzW2ldO1xuICAgICAgaWYgKG5hbC5zcHMpIHtcbiAgICAgICAgc3BzID0gbmFsO1xuICAgICAgICB0cmFjay5zcHMgPSBuYWwuYm9keTtcbiAgICAgICAgbWV0YS5jaHJvbWFGb3JtYXQgPSBzcHMuc3BzLmNocm9tYV9mb3JtYXRcbiAgICAgICAgbWV0YS5jb2RlYyA9ICdhdmMxLic7XG4gICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgNDsgaisrKSB7XG4gICAgICAgICAgdmFyIGggPSBzcHMuYm9keVtqXS50b1N0cmluZygxNik7XG4gICAgICAgICAgaWYgKGgubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgaCA9ICcwJyArIGg7XG4gICAgICAgICAgfVxuICAgICAgICAgIG1ldGEuY29kZWMgKz0gaDtcbiAgICAgICAgfVxuICAgICAgICBtZXRhLmNvZGVjSGVpZ2h0ID0gc3BzLnNwcy5jb2RlY19zaXplLmhlaWdodDtcbiAgICAgICAgbWV0YS5jb2RlY1dpZHRoID0gc3BzLnNwcy5jb2RlY19zaXplLndpZHRoO1xuICAgICAgICBtZXRhLmZyYW1lUmF0ZSA9IHNwcy5zcHMuZnJhbWVfcmF0ZTtcbiAgICAgICAgbWV0YS5pZCA9IDE7XG4gICAgICAgIG1ldGEubGV2ZWwgPSBzcHMuc3BzLmxldmVsX3N0cmluZztcbiAgICAgICAgbWV0YS5wcmVzZW50SGVpZ2h0ID0gc3BzLnNwcy5wcmVzZW50X3NpemUuaGVpZ2h0O1xuICAgICAgICBtZXRhLnByZXNlbnRXaWR0aCA9IHNwcy5zcHMucHJlc2VudF9zaXplLndpZHRoO1xuICAgICAgICBtZXRhLnByb2ZpbGUgPSBzcHMuc3BzLnByb2ZpbGVfc3RyaW5nO1xuICAgICAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uID0gTWF0aC5mbG9vcihtZXRhLnRpbWVzY2FsZSAqIChzcHMuc3BzLmZyYW1lX3JhdGUuZnBzX2RlbiAvIHNwcy5zcHMuZnJhbWVfcmF0ZS5mcHNfbnVtKSk7XG4gICAgICAgIG1ldGEuc2FyUmF0aW8gPSBzcHMuc3BzLnNhcl9yYXRpbyA/IHNwcy5zcHMuc2FyX3JhdGlvIDogc3BzLnNwcy5wYXJfcmF0aW87XG4gICAgICB9IGVsc2UgaWYgKG5hbC5wcHMpIHtcbiAgICAgICAgdHJhY2sucHBzID0gbmFsLmJvZHk7XG4gICAgICAgIHBwcyA9IG5hbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNhbXBsZUxlbmd0aCArPSAoNCArIG5hbC5ib2R5LmJ5dGVMZW5ndGgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzcHMgJiYgcHBzKSB7XG4gICAgICBtZXRhLmF2Y2MgPSBOYWx1bml0LmdldEF2Y2Moc3BzLmJvZHksIHBwcy5ib2R5KTtcbiAgICAgIGxldCBtZXRhRXF1YWwgPSBUc0RlbXV4ZXIuY29tcGFpcmVNZXRhKHRyYWNrLm1ldGEsIG1ldGEsIHRydWUpO1xuICAgICAgaWYgKCF0aGlzLl9oYXNWaWRlb01ldGEgfHwgIW1ldGFFcXVhbCkge1xuICAgICAgICBpZiAob3B0aW9ucykge1xuICAgICAgICAgIG9wdGlvbnMubWV0YSA9IE9iamVjdC5hc3NpZ24oe30sIG1ldGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBtZXRhOiBPYmplY3QuYXNzaWduKHt9LCBtZXRhKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0cmFjay5tZXRhID0gbWV0YTtcbiAgICAgICAgdGhpcy5faGFzVmlkZW9NZXRhID0gdHJ1ZVxuICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgJ3ZpZGVvJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGRhdGEgPSBuZXcgVWludDhBcnJheShzYW1wbGVMZW5ndGgpO1xuICAgIGxldCBvZmZzZXQgPSAwO1xuICAgIGxldCBpc0tleWZyYW1lID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgbmFsID0gbmFsc1tpXTtcbiAgICAgIGxldCBsZW5ndGggPSBuYWwuYm9keS5ieXRlTGVuZ3RoO1xuICAgICAgaWYgKG5hbC5pZHIpIHtcbiAgICAgICAgaXNLZXlmcmFtZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoIW5hbC5wcHMgJiYgIW5hbC5zcHMpIHtcbiAgICAgICAgZGF0YS5zZXQobmV3IFVpbnQ4QXJyYXkoW2xlbmd0aCA+Pj4gMjQgJiAweGZmLFxuICAgICAgICAgIGxlbmd0aCA+Pj4gMTYgJiAweGZmLFxuICAgICAgICAgIGxlbmd0aCA+Pj4gOCAmIDB4ZmYsXG4gICAgICAgICAgbGVuZ3RoICYgMHhmZlxuICAgICAgICBdKSwgb2Zmc2V0KTtcbiAgICAgICAgb2Zmc2V0ICs9IDQ7XG4gICAgICAgIGRhdGEuc2V0KG5hbC5ib2R5LCBvZmZzZXQpO1xuICAgICAgICBvZmZzZXQgKz0gbGVuZ3RoO1xuICAgICAgfVxuICAgIH1cbiAgICBsZXQgc2FtcGxlID0gbmV3IFZpZGVvVHJhY2tTYW1wbGUoe1xuICAgICAgZHRzOiBwYXJzZUludChwZXMuZHRzIC8gOTApLFxuICAgICAgcHRzOiBwYXJzZUludChwZXMucHRzIC8gOTApLFxuICAgICAgY3RzOiAocGVzLnB0cyAtIHBlcy5kdHMpIC8gOTAsXG4gICAgICBvcmlnaW5EdHM6IHBlcy5kdHMsXG4gICAgICBpc0tleWZyYW1lLFxuICAgICAgZGF0YSxcbiAgICAgIG9wdGlvbnNcbiAgICB9KVxuICAgIHRyYWNrLnNhbXBsZXMucHVzaChzYW1wbGUpO1xuICB9XG5cbiAgZGVzdG9yeSAoKSB7XG4gICAgdGhpcy5vZmYoREVNVVhfRVZFTlRTLkRFTVVYX1NUQVJULCB0aGlzLmRlbXV4KTtcbiAgICB0aGlzLmNvbmZpZ3MgPSB7fTtcbiAgICB0aGlzLmRlbXV4aW5nID0gZmFsc2U7XG4gICAgdGhpcy5wYXQgPSBbXTtcbiAgICB0aGlzLnBtdCA9IFtdO1xuICAgIHRoaXMuX2hhc1ZpZGVvTWV0YSA9IGZhbHNlO1xuICAgIHRoaXMuX2hhc0F1ZGlvTWV0YSA9IGZhbHNlO1xuICB9XG5cbiAgc3RhdGljIGNvbXBhaXJlQXJyYXkgKGEsIGIsIHR5cGUpIHtcbiAgICBsZXQgYWwgPSAwO1xuICAgIGxldCBibCA9IDA7XG4gICAgaWYgKHR5cGUgPT09ICdVaW50OEFycmF5Jykge1xuICAgICAgYWwgPSBhLmJ5dGVMZW5ndGg7XG4gICAgICBibCA9IGIuYnl0ZUxlbmd0aDtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdBcnJheScpIHtcbiAgICAgIGFsID0gYS5sZW5ndGg7XG4gICAgICBibCA9IGIubGVuZ3RoO1xuICAgIH1cbiAgICBpZiAoYWwgIT09IGJsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbDsgaSsrKSB7XG4gICAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3RhdGljIGNvbXBhaXJlTWV0YSAoYSwgYiwgaWdub3JlRHVyYXRpb24pIHtcbiAgICBpZiAoIWEgfHwgIWIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMCwgayA9IE9iamVjdC5rZXlzKGEpLmxlbmd0aDsgaSA8IGs7IGkrKykge1xuICAgICAgbGV0IGl0ZW1hID0gYVtPYmplY3Qua2V5cyhhKVtpXV07XG4gICAgICBsZXQgaXRlbWIgPSBiW09iamVjdC5rZXlzKGEpW2ldXTtcbiAgICAgIGlmICh0eXBlb2YgaXRlbWEgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmICgoaWdub3JlRHVyYXRpb24gJiYgT2JqZWN0LmtleXMoYSlbaV0gIT09ICdkdXJhdGlvbicgJiYgT2JqZWN0LmtleXMoYSlbaV0gIT09ICdyZWZTYW1wbGVEdXJhdGlvbicgJiYgT2JqZWN0LmtleXMoYSlbaV0gIT09ICdyZWZTYW1wbGVEdXJhdGlvbkZpeGVkJykgJiYgaXRlbWEgIT09IGl0ZW1iKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGl0ZW1hLmJ5dGVMZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoaXRlbWIuYnl0ZUxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghVHNEZW11eGVyLmNvbXBhaXJlQXJyYXkoaXRlbWEsIGl0ZW1iLCAnVWludDhBcnJheScpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGl0ZW1hLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChpdGVtYi5sZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIVRzRGVtdXhlci5jb21wYWlyZUFycmF5KGl0ZW1hLCBpdGVtYiwgJ0FycmF5JykpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghVHNEZW11eGVyLmNvbXBhaXJlTWV0YShpdGVtYSwgaXRlbWIpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3RhdGljIE1lcmdlIChidWZmZXJzKSB7XG4gICAgbGV0IGRhdGE7XG4gICAgbGV0IGxlbmd0aCA9IDA7XG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBidWZmZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZW5ndGggKz0gKGJ1ZmZlcnNbaV0ubGVuZ3RoIC0gYnVmZmVyc1tpXS5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgZGF0YSA9IG5ldyBVaW50OEFycmF5KGxlbmd0aCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBidWZmZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYnVmZmVyID0gYnVmZmVyc1tpXTtcbiAgICAgIGRhdGEuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZmZlci5idWZmZXIsIGJ1ZmZlci5wb3NpdGlvbiksIG9mZnNldCk7XG4gICAgICBvZmZzZXQgKz0gYnVmZmVyLmxlbmd0aCAtIGJ1ZmZlci5wb3NpdGlvbjtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBTdHJlYW0oZGF0YS5idWZmZXIpO1xuICB9XG5cbiAgc3RhdGljIHJlYWQgKHN0cmVhbSwgdHMsIGZyYWdzKSB7XG4gICAgVHNEZW11eGVyLnJlYWRIZWFkZXIoc3RyZWFtLCB0cyk7XG4gICAgVHNEZW11eGVyLnJlYWRQYXlsb2FkKHN0cmVhbSwgdHMsIGZyYWdzKTtcbiAgICBpZiAodHMuaGVhZGVyLnBhY2tldCA9PT0gJ01FRElBJyAmJiB0cy5oZWFkZXIucGF5bG9hZCA9PT0gMSAmJiAhdHMudW5rbm93blBJRHMpIHtcbiAgICAgIHRzLnBlcyA9IFRzRGVtdXhlci5QRVModHMpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyByZWFkUGF5bG9hZCAoc3RyZWFtLCB0cywgZnJhZ3MpIHtcbiAgICBsZXQgaGVhZGVyID0gdHMuaGVhZGVyXG4gICAgbGV0IHBpZCA9IGhlYWRlci5waWQ7XG4gICAgc3dpdGNoIChwaWQpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgVHNEZW11eGVyLlBBVChzdHJlYW0sIHRzLCBmcmFncyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxOlxuICAgICAgICBUc0RlbXV4ZXIuQ0FUKHN0cmVhbSwgdHMsIGZyYWdzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIFRzRGVtdXhlci5UU0RUKHN0cmVhbSwgdHMsIGZyYWdzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDB4MWZmZjpcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBUT0RPOiBzb21l55qE5YaZ5rOV5LiN5aSq5aW977yM5b6X5pS5XG4gICAgICAgIGlmIChmcmFncy5wYXQuc29tZSgoaXRlbSkgPT4geyByZXR1cm4gaXRlbS5waWQgPT09IHBpZDsgfSkpIHtcbiAgICAgICAgICBUc0RlbXV4ZXIuUE1UKHN0cmVhbSwgdHMsIGZyYWdzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgc3RzID0gZnJhZ3MucG10ID8gZnJhZ3MucG10LmZpbHRlcigoaXRlbSkgPT4gaXRlbS5waWQgPT09IHBpZCkgOiBbXTtcbiAgICAgICAgICBpZiAoc3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIFRzRGVtdXhlci5NZWRpYShzdHJlYW0sIHRzLCBTdHJlYW1UeXBlW3N0c1swXS5zdHJlYW1UeXBlXVswXSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHMudW5rbm93blBJRHMgPSB0cnVlO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgcmVhZEhlYWRlciAoc3RyZWFtLCB0cykge1xuICAgIGxldCBoZWFkZXIgPSB7fTtcbiAgICBoZWFkZXIuc3luYyA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICBsZXQgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgaGVhZGVyLmVycm9yID0gbmV4dCA+Pj4gMTU7XG4gICAgaGVhZGVyLnBheWxvYWQgPSBuZXh0ID4+PiAxNCAmIDE7XG4gICAgaGVhZGVyLnByaW9yaXR5ID0gbmV4dCA+Pj4gMTMgJiAxO1xuICAgIGhlYWRlci5waWQgPSBuZXh0ICYgMHgxZmZmO1xuXG4gICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDgoKTtcblxuICAgIGhlYWRlci5zY3JhbWJsaW5nID0gbmV4dCA+PiA2ICYgMHgzOyAvLyDmmK/lkKbliqDlr4bvvIwwMOihqOekuuS4jeWKoOWvhlxuXG4gICAgLyoqXG4gICAgICogMDAgSVNPL0lFQ+acquadpeS9v+eUqOS/neeVmVxuICAgICAqIDAxIOayoeacieiwg+aVtOWtl+aute+8jOS7heWQq+aciTE4NELmnInmlYjlh4DojbdcbiAgICAgKiAwMiDmsqHmnInmnInmlYjlh4DojbfvvIzku4XlkKvmnIkxODNC6LCD5pW05a2X5q61XG4gICAgICogMDMgMH4xODJC6LCD5pW05a2X5q615ZCO5Li65pyJ5pWI5YeA6I23XG4gICAgICovXG4gICAgaGVhZGVyLmFkYXB0YXRpb24gPSBuZXh0ID4+IDQgJiAweDM7XG4gICAgaGVhZGVyLmNvbnRpbnVpdHkgPSBuZXh0ICYgMTU7XG4gICAgaGVhZGVyLnBhY2tldCA9IGhlYWRlci5waWQgPT09IDAgPyAnUEFUJyA6ICdNRURJQSc7XG4gICAgdHMuaGVhZGVyID0gaGVhZGVyO1xuICB9XG5cbiAgc3RhdGljIFBBVCAoc3RyZWFtLCB0cywgZnJhZ3MpIHtcbiAgICBsZXQgcmV0ID0ge307XG4gICAgbGV0IG5leHQgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgc3RyZWFtLnNraXAobmV4dCk7XG4gICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICByZXQudGFiZWxJRCA9IG5leHQ7XG4gICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgcmV0LmVycm9yID0gbmV4dCA+Pj4gNztcbiAgICByZXQuemVybyA9IG5leHQgPj4+IDYgJiAxO1xuICAgIHJldC5zZWN0aW9uTGVuZ3RoID0gbmV4dCAmIDB4ZmZmO1xuICAgIHJldC5zdHJlYW1JRCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgcmV0LmN1cnJlbnQgPSBzdHJlYW0ucmVhZFVpbnQ4KCkgJiAxO1xuICAgIHJldC5zZWN0aW9uTnVtYmVyID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHJldC5sYXN0U2VjdGlvbk51bWJlciA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICBsZXQgTiA9IChyZXQuc2VjdGlvbkxlbmd0aCAtIDkpIC8gNDtcbiAgICBsZXQgbGlzdCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTjsgaSsrKSB7XG4gICAgICBsZXQgcHJvZ3JhbU51bWJlciA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgICBsZXQgcGlkID0gc3RyZWFtLnJlYWRVaW50MTYoKSAmIDB4MWZmZjtcbiAgICAgIGxpc3QucHVzaCh7XG4gICAgICAgIHByb2dyYW06IHByb2dyYW1OdW1iZXIsXG4gICAgICAgIHBpZCxcbiAgICAgICAgdHlwZTogcHJvZ3JhbU51bWJlciA9PT0gMCA/ICduZXR3b3JrJyA6ICdtYXBQSUQnXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgZnJhZ3MucGF0ID0gZnJhZ3MucGF0LmNvbmNhdChsaXN0KTtcbiAgICB9XG4gICAgcmV0Lmxpc3QgPSBsaXN0O1xuICAgIHJldC5wcm9ncmFtID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICByZXQucGlkID0gc3RyZWFtLnJlYWRVaW50MTYoKSAmIDB4MWZmZjtcbiAgICB0cy5wYXlsb2FkID0gcmV0O1xuICAgIC8vIFRPRE8gQ1JDXG4gIH1cblxuICBzdGF0aWMgUE1UIChzdHJlYW0sIHRzLCBmcmFncykge1xuICAgIGxldCByZXQgPSB7fTtcbiAgICBsZXQgaGVhZGVyID0gdHMuaGVhZGVyO1xuICAgIGhlYWRlci5wYWNrZXQgPSAnUE1UJztcbiAgICBsZXQgbmV4dCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICBzdHJlYW0uc2tpcChuZXh0KTtcbiAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHJldC50YWJsZUlEID0gbmV4dDtcbiAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICByZXQuc2VjdGlvbkxlbmd0aCA9IG5leHQgJiAweGZmZjtcbiAgICByZXQucHJvZ3JhbSA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgcmV0LmN1cnJlbnQgPSBzdHJlYW0ucmVhZFVpbnQ4KCkgJiAxO1xuICAgIHJldC5vcmRlciA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICByZXQubGFzdE9yZGVyID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHJldC5QQ1JfUElEID0gc3RyZWFtLnJlYWRVaW50MTYoKSAmIDB4MWZmZjtcbiAgICByZXQucHJvZ3JhbUxlbmd0aCA9IHN0cmVhbS5yZWFkVWludDE2KCkgJiAweGZmZjtcbiAgICBsZXQgTiA9IChyZXQuc2VjdGlvbkxlbmd0aCAtIDEzKSAvIDU7XG4gICAgbGV0IGxpc3QgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE47IGkrKykge1xuICAgICAgbGlzdC5wdXNoKHtcbiAgICAgICAgc3RyZWFtVHlwZTogc3RyZWFtLnJlYWRVaW50OCgpLFxuICAgICAgICBwaWQ6IHN0cmVhbS5yZWFkVWludDE2KCkgJiAweDFmZmYsIC8vIDB4MDdlNSDop4bpopHvvIwweDA3ZTZcbiAgICAgICAgZXM6IHN0cmVhbS5yZWFkVWludDE2KCkgJiAweGZmZlxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldC5saXN0ID0gbGlzdDtcbiAgICBpZiAoIXRoaXMucG10KSB7XG4gICAgICB0aGlzLnBtdCA9IFtdO1xuICAgIH1cbiAgICBmcmFncy5wbXQgPSB0aGlzLnBtdC5jb25jYXQobGlzdC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBpZDogaXRlbS5waWQsXG4gICAgICAgIGVzOiBpdGVtLmVzLFxuICAgICAgICBzdHJlYW1UeXBlOiBpdGVtLnN0cmVhbVR5cGUsXG4gICAgICAgIHByb2dyYW06IHJldC5wcm9ncmFtXG4gICAgICB9O1xuICAgIH0pKTtcbiAgICB0cy5wYXlsb2FkID0gcmV0O1xuICB9XG5cbiAgc3RhdGljIE1lZGlhIChzdHJlYW0sIHRzLCB0eXBlKSB7XG4gICAgbGV0IGhlYWRlciA9IHRzLmhlYWRlcjtcbiAgICBsZXQgcGF5bG9hZCA9IHt9O1xuICAgIGhlYWRlci50eXBlID0gdHlwZTtcbiAgICBpZiAoaGVhZGVyLmFkYXB0YXRpb24gPT09IDB4MDMpIHtcbiAgICAgIHBheWxvYWQuYWRhcHRhdGlvbkxlbmd0aCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICAgIGlmIChwYXlsb2FkLmFkYXB0YXRpb25MZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCBuZXh0ID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgICAgICBwYXlsb2FkLmRpc2NvbnRpbnVlID0gbmV4dCA+Pj4gNztcbiAgICAgICAgcGF5bG9hZC5hY2Nlc3MgPSBuZXh0ID4+PiA2ICYgMHgwMTtcbiAgICAgICAgcGF5bG9hZC5wcmlvcml0eSA9IG5leHQgPj4+IDUgJiAweDAxO1xuICAgICAgICBwYXlsb2FkLlBDUiA9IG5leHQgPj4+IDQgJiAweDAxO1xuICAgICAgICBwYXlsb2FkLk9QQ1IgPSBuZXh0ID4+PiAzICYgMHgwMTtcbiAgICAgICAgcGF5bG9hZC5zcGxpY2VQb2ludCA9IG5leHQgPj4+IDIgJiAweDAxO1xuICAgICAgICBwYXlsb2FkLnRyYW5zcG9ydFByaXZhdGUgPSBuZXh0ID4+PiAxICYgMHgwMTtcbiAgICAgICAgcGF5bG9hZC5hZGFwdGF0aW9uRmllbGQgPSBuZXh0ICYgMHgwMTtcbiAgICAgICAgbGV0IF9zdGFydCA9IHN0cmVhbS5wb3NpdGlvbjtcbiAgICAgICAgaWYgKHBheWxvYWQuUENSID09PSAxKSB7XG4gICAgICAgICAgcGF5bG9hZC5wcm9ncmFtQ2xvY2tCYXNlID0gc3RyZWFtLnJlYWRVaW50MzIoKSA8PCAxO1xuICAgICAgICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgICAgICAgIHBheWxvYWQucHJvZ3JhbUNsb2NrQmFzZSB8PSBuZXh0ID4+PiAxNTtcbiAgICAgICAgICBwYXlsb2FkLnByb2dyYW1DbG9ja0V4dGVuc2lvbiA9IG5leHQgJiAweDFmZjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF5bG9hZC5PUENSID09PSAxKSB7XG4gICAgICAgICAgcGF5bG9hZC5vcmlnaW5Qcm9ncmFtQ2xvY2tCYXNlID0gc3RyZWFtLnJlYWRVaW50MzIoKSA8PCAxO1xuICAgICAgICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgICAgICAgIHBheWxvYWQub3JpZ2luUHJvZ3JhbUNsb2NrQmFzZSArPSBuZXh0ID4+PiAxNTtcbiAgICAgICAgICBwYXlsb2FkLm9yaWdpblByb2dyYW1DbG9ja0V4dGVuc2lvbiA9IG5leHQgJiAweDFmZjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF5bG9hZC5zcGxpY2VQb2ludCA9PT0gMSkge1xuICAgICAgICAgIHBheWxvYWQuc3BsaWNlQ291bnRkb3duID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXlsb2FkLnRyYW5zcG9ydFByaXZhdGUgPT09IDEpIHtcbiAgICAgICAgICBsZXQgbGVuZ3RoID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgICAgICAgIGxldCB0cmFuc3BvcnRQcml2YXRlRGF0YSA9IFtdO1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRyYW5zcG9ydFByaXZhdGVEYXRhLnB1c2goc3RyZWFtLnJlYWRVaW50OCgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBheWxvYWQuYWRhcHRhdGlvbkZpZWxkID09PSAxKSB7XG4gICAgICAgICAgbGV0IGxlbmd0aCA9IHN0cmVhbS5yZWFkVWludDgoKVxuICAgICAgICAgIGxldCBuZXh0ID0gc3RyZWFtLnJlYWRVaW50OCgpXG4gICAgICAgICAgbGV0IHN0YXJ0ID0gc3RyZWFtLnBvc2l0aW9uO1xuICAgICAgICAgIGxldCBsdHcgPSBuZXh0ID4+PiA3O1xuICAgICAgICAgIGxldCBwaWVjZXdpc2UgPSBuZXh0ID4+PiA2ICYgMHgxO1xuICAgICAgICAgIGxldCBzZWFtbGVzcyA9IG5leHQgPj4+IDUgJiAweDE7XG4gICAgICAgICAgaWYgKGx0dyA9PT0gMSkge1xuICAgICAgICAgICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgICAgICAgICBwYXlsb2FkLmx0d1ZhbGlkID0gbmV4dCA+Pj4gMTU7XG4gICAgICAgICAgICBwYXlsb2FkLmx0d09mZnNldCA9IG5leHQgJiAweGVmZmY7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwaWVjZXdpc2UgPT09IDEpIHtcbiAgICAgICAgICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQyNCgpO1xuICAgICAgICAgICAgcGF5bG9hZC5waWVjZXdpc2VSYXRlID0gbmV4dCAmIDB4M2ZmZmZmO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2VhbWxlc3MgPT09IDEpIHtcbiAgICAgICAgICAgIG5leHQgPSBzdHJlYW0ucmVhZEludDgoKTtcbiAgICAgICAgICAgIHBheWxvYWQuc3BsaWNlVHlwZSA9IG5leHQgPj4+IDQ7XG4gICAgICAgICAgICBwYXlsb2FkLmR0c05leHRBVTEgPSBuZXh0ID4+PiAxICYgMHg3O1xuICAgICAgICAgICAgcGF5bG9hZC5tYXJrZXIxID0gbmV4dCAmIDB4MTtcbiAgICAgICAgICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgICAgICAgICAgcGF5bG9hZC5kdHNOZXh0QVUyID0gbmV4dCA+Pj4gMTtcbiAgICAgICAgICAgIHBheWxvYWQubWFya2VyMiA9IG5leHQgJiAweDE7XG4gICAgICAgICAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICAgIHBheWxvYWQuZHRzTmV4dEFVMyA9IG5leHQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN0cmVhbS5za2lwKGxlbmd0aCAtIDEgLSAoc3RyZWFtLnBvc2l0aW9uIC0gc3RhcnQpKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbGFzdFN0dWZmaW5nID0gcGF5bG9hZC5hZGFwdGF0aW9uTGVuZ3RoIC0gMSAtIChzdHJlYW0ucG9zaXRpb24gLSBfc3RhcnQpO1xuICAgICAgICBzdHJlYW0uc2tpcChsYXN0U3R1ZmZpbmcpO1xuICAgICAgfVxuICAgIH1cbiAgICBwYXlsb2FkLnN0cmVhbSA9IG5ldyBTdHJlYW0oc3RyZWFtLmJ1ZmZlci5zbGljZShzdHJlYW0ucG9zaXRpb24pKTtcbiAgICB0cy5wYXlsb2FkID0gcGF5bG9hZDtcbiAgfVxuXG4gIHN0YXRpYyBQRVMgKHRzKSB7XG4gICAgbGV0IHJldCA9IHt9O1xuICAgIGxldCBidWZmZXIgPSB0cy5wYXlsb2FkLnN0cmVhbTtcblxuICAgIGxldCBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MjQoKTtcbiAgICBpZiAobmV4dCAhPT0gMSkge1xuICAgICAgcmV0LkVTID0ge307XG4gICAgICByZXQuRVMuYnVmZmVyID0gYnVmZmVyO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgc3RyZWFtSUQgPSBidWZmZXIucmVhZFVpbnQ4KCk7XG4gICAgICBpZiAoc3RyZWFtSUQgPj0gMHhlMCAmJiBzdHJlYW1JRCA8PSAweGVmKSB7XG4gICAgICAgIHJldC50eXBlID0gJ3ZpZGVvJztcbiAgICAgIH1cbiAgICAgIGlmIChzdHJlYW1JRCA+PSAweGMwICYmIHN0cmVhbUlEIDw9IDB4ZGYpIHtcbiAgICAgICAgcmV0LnR5cGUgPSAnYXVkaW8nO1xuICAgICAgfVxuICAgICAgbGV0IHBhY2tldExlbmd0aCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICByZXQucGFja2V0TGVuZ3RoID0gcGFja2V0TGVuZ3RoO1xuICAgICAgaWYgKHJldC50eXBlID09PSAndmlkZW8nIHx8IHJldC50eXBlID09PSAnYXVkaW8nKSB7XG4gICAgICAgIGxldCBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICBsZXQgZmlyc3QgPSBuZXh0ID4+PiA2O1xuICAgICAgICBpZiAoZmlyc3QgIT09IDB4MDIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Vycm9yIHdoZW4gcGFyc2UgcGVzIGhlYWRlcicpO1xuICAgICAgICB9XG4gICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQ4KCk7XG4gICAgICAgIHJldC5wdHNEVFNGbGFnID0gbmV4dCA+Pj4gNjtcbiAgICAgICAgcmV0LmVzY3JGbGFnID0gbmV4dCA+Pj4gNSAmIDB4MDE7XG4gICAgICAgIHJldC5lc1JhdGVGbGFnID0gbmV4dCA+Pj4gNCAmIDB4MDE7XG4gICAgICAgIHJldC5kc21GbGFnID0gbmV4dCA+Pj4gMyAmIDB4MDE7XG4gICAgICAgIHJldC5hZGRpdGlvbmFsRmxhZyA9IG5leHQgPj4+IDIgJiAweDAxO1xuICAgICAgICByZXQuY3JjRmxhZyA9IG5leHQgPj4+IDEgJiAweDAxO1xuICAgICAgICByZXQuZXh0ZW5zaW9uRmxhZyA9IG5leHQgJiAweDAxO1xuICAgICAgICByZXQucGVzSGVhZGVyTGVuZ3RoID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICBsZXQgTjEgPSByZXQucGVzSGVhZGVyTGVuZ3RoO1xuXG4gICAgICAgIGlmIChyZXQucHRzRFRTRmxhZyA9PT0gMikge1xuICAgICAgICAgIGxldCBwdHMgPSBbXTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICAgIHB0cy5wdXNoKG5leHQgPj4+IDEgJiAweDA3KTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBwdHMucHVzaChuZXh0ID4+PiAxKTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBwdHMucHVzaChuZXh0ID4+PiAxKTtcbiAgICAgICAgICByZXQucHRzID0gKHB0c1swXSA8PCAzMCB8IHB0c1sxXSA8PCAxNSB8IHB0c1syXSk7XG4gICAgICAgICAgTjEgLT0gNTtcbiAgICAgICAgICAvLyDop4bpopHlpoLmnpzmsqHmnIlkdHPnlKhwdHNcbiAgICAgICAgICBpZiAocmV0LnR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgICAgICAgIHJldC5kdHMgPSByZXQucHRzO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0LnB0c0RUU0ZsYWcgPT09IDMpIHtcbiAgICAgICAgICBsZXQgcHRzID0gW107XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgICBwdHMucHVzaChuZXh0ID4+PiAxICYgMHgwNyk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgcHRzLnB1c2gobmV4dCA+Pj4gMSk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgcHRzLnB1c2gobmV4dCA+Pj4gMSk7XG4gICAgICAgICAgcmV0LnB0cyA9IChwdHNbMF0gPDwgMzAgfCBwdHNbMV0gPDwgMTUgfCBwdHNbMl0pO1xuICAgICAgICAgIGxldCBkdHMgPSBbXTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICAgIGR0cy5wdXNoKG5leHQgPj4+IDEgJiAweDA3KTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBkdHMucHVzaChuZXh0ID4+PiAxKTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBkdHMucHVzaChuZXh0ID4+PiAxKTtcbiAgICAgICAgICByZXQuZHRzID0gKGR0c1swXSA8PCAzMCB8IGR0c1sxXSA8PCAxNSB8IGR0c1syXSk7XG4gICAgICAgICAgTjEgLT0gMTA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldC5lc2NyRmxhZyA9PT0gMSkge1xuICAgICAgICAgIGxldCBlc2NyID0gW11cbiAgICAgICAgICBsZXQgZXggPSBbXTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICAgIGVzY3IucHVzaChuZXh0ID4+PiAzICYgMHgwNyk7XG4gICAgICAgICAgZXNjci5wdXNoKG5leHQgJiAweDAzKTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBlc2NyLnB1c2gobmV4dCA+Pj4gMTMpO1xuICAgICAgICAgIGVzY3IucHVzaChuZXh0ICYgMHgwMyk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgZXNjci5wdXNoKG5leHQgPj4+IDEzKTtcbiAgICAgICAgICBleC5wdXNoKG5leHQgJiAweDAzKTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICAgIGV4LnB1c2gobmV4dCA+Pj4gMSk7XG4gICAgICAgICAgcmV0LmVzY3IgPSAoZXNjclswXSA8PCAzMCB8IGVzY3JbMV0gPDwgMjggfCBlc2NyWzJdIDw8IDE1IHwgZXNjclszXSA8PCAxMyB8IGVzY3JbNF0pICogMzAwICsgKGV4WzBdIDw8IDcgfCBleFsxXSk7XG4gICAgICAgICAgTjEgLT0gNjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0LmVzUmF0ZUZsYWcgPT09IDEpIHtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MjQoKTtcbiAgICAgICAgICByZXQuZXNSYXRlID0gbmV4dCA+Pj4gMSAmIDB4M2ZmZmZmO1xuICAgICAgICAgIE4xIC09IDM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldC5kc21GbGFnID09PSAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3Qgc3VwcG9ydCBEU01fdHJpY2tfbW9kZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXQuYWRkaXRpb25hbEZsYWcgPT09IDEpIHtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICAgIHJldC5hZGRpdGlvbmFsQ29weUluZm8gPSBuZXh0ICYgMHg3ZjtcbiAgICAgICAgICBOMSAtPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXQuY3JjRmxhZyA9PT0gMSkge1xuICAgICAgICAgIHJldC5wZXNDUkMgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgICAgIE4xIC09IDI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldC5leHRlbnNpb25GbGFnID09PSAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3Qgc3VwcG9ydCBleHRlbnNpb24nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoTjEgPiAwKSB7XG4gICAgICAgICAgYnVmZmVyLnNraXAoTjEpO1xuICAgICAgICB9XG4gICAgICAgIHJldC5FUyA9IFRzRGVtdXhlci5FUyhidWZmZXIsIHJldC50eXBlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZm9ybWF0IGlzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIHN0YXRpYyBFUyAoYnVmZmVyLCB0eXBlKSB7XG4gICAgbGV0IG5leHQ7XG4gICAgbGV0IHJldCA9IHt9O1xuICAgIGlmICh0eXBlID09PSAndmlkZW8nKSB7XG4gICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MzIoKTtcbiAgICAgIGlmIChuZXh0ICE9PSAxKSB7XG4gICAgICAgIGJ1ZmZlci5iYWNrKDQpO1xuICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MjQoKTtcbiAgICAgICAgaWYgKG5leHQgIT09IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2gyNjQgbmFsIGhlYWRlciBwYXJzZSBmYWlsZWQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnVmZmVyLnNraXAoMik7Ly8gMDkgRjBcbiAgICAgIC8vIFRPRE8gcmVhZG5hbHVcbiAgICAgIHJldC5idWZmZXIgPSBidWZmZXI7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnYXVkaW8nKSB7XG4gICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgIC8vIGFkdHPnmoTlkIzmraXlrZfoioLvvIwxMuS9jVxuICAgICAgaWYgKG5leHQgPj4+IDQgIT09IDB4ZmZmKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYWFjIEVTIHBhcnNlIEVycm9yJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBmcSA9IFs5NjAwMCwgODgyMDAsIDY0MDAwLCA0ODAwMCwgNDQxMDAsIDMyMDAwLCAyNDAwMCwgMjIwNTAsIDE2MDAwLCAxMjAwMCwgMTEwMjUsIDgwMDAsIDczNTBdO1xuICAgICAgcmV0LmlkID0gKG5leHQgPj4+IDMgJiAweDAxKSA9PT0gMCA/ICdNUEVHLTQnIDogJ01QRUctMic7XG4gICAgICByZXQubGF5ZXIgPSBuZXh0ID4+PiAxICYgMHgwMztcbiAgICAgIHJldC5hYnNlbnQgPSBuZXh0ICYgMHgwMTtcbiAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgcmV0LmF1ZGlvT2JqZWN0VHlwZSA9IChuZXh0ID4+PiAxNCAmIDB4MDMpICsgMTtcbiAgICAgIHJldC5wcm9maWxlID0gcmV0LmF1ZGlvT2JqZWN0VHlwZSAtIDE7XG4gICAgICByZXQuZnJlcXVlbmN5SW5kZXggPSBuZXh0ID4+PiAxMCAmIDB4MGY7XG4gICAgICByZXQuZnJlcXVlbmNlID0gZnFbcmV0LmZyZXF1ZW5jeUluZGV4XTtcbiAgICAgIHJldC5jaGFubmVsID0gbmV4dCA+Pj4gNiAmIDB4MDc7XG4gICAgICByZXQuZnJhbWVMZW5ndGggPSAobmV4dCAmIDB4MDMpIDw8IDExIHwgKGJ1ZmZlci5yZWFkVWludDE2KCkgPj4+IDUpO1xuICAgICAgVHNEZW11eGVyLmdldEF1ZGlvQ29uZmlnKHJldCk7XG4gICAgICBidWZmZXIuc2tpcCgxKTtcbiAgICAgIHJldC5idWZmZXIgPSBidWZmZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRVMgJHt0eXBlfSBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIHN0YXRpYyBUU0RUIChzdHJlYW0sIHRzLCBmcmFncykge1xuICAgIC8vIFRPRE9cbiAgICB0cy5wYXlsb2FkID0ge307XG4gIH1cblxuICBzdGF0aWMgQ0FUIChzdHJlYW0sIHRzLCBmcmFncykge1xuICAgIGxldCByZXQgPSB7fVxuICAgIHJldC50YWJsZUlEID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIGxldCBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICByZXQuc2VjdGlvbkluZGljYXRvciA9IG5leHQgPj4+IDc7XG4gICAgcmV0LnNlY3Rpb25MZW5ndGggPSBuZXh0ICYgMHgwZmZmO1xuICAgIHN0cmVhbS5za2lwKDIpO1xuICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgcmV0LnZlcnNpb24gPSBuZXh0ID4+PiAzO1xuICAgIHJldC5jdXJyZW50TmV4dEluZGljYXRvciA9IG5leHQgJiAweDAxO1xuICAgIHJldC5zZWN0aW9uTnVtYmVyID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHJldC5sYXN0U2VjdGlvbk51bWJlciA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICBsZXQgTiA9ICh0aGlzLnNlY3Rpb25MZW5ndGggLSA5KSAvIDQ7XG4gICAgbGV0IGxpc3QgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE47IGkrKykge1xuICAgICAgbGlzdC5wdXNoKHt9KTtcbiAgICB9XG4gICAgcmV0LmNyYzMyID0gc3RyZWFtLnJlYWRVaW50MzIoKTtcbiAgICB0cy5wYXlsb2FkID0gcmV0O1xuICB9XG5cbiAgc3RhdGljIGdldEF1ZGlvQ29uZmlnIChyZXQpIHtcbiAgICBsZXQgdXNlckFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpXG4gICAgbGV0IGNvbmZpZztcbiAgICBsZXQgZXh0ZW5zaW9uU2FtcGxlSW5kZXg7XG4gICAgaWYgKC9maXJlZm94L2kudGVzdCh1c2VyQWdlbnQpKSB7XG4gICAgICBpZiAocmV0LmZyZXF1ZW5jeUluZGV4ID49IDYpIHtcbiAgICAgICAgcmV0LmF1ZGlvT2JqZWN0VHlwZSA9IDU7XG4gICAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSg0KTtcbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxlSW5kZXggPSByZXQuZnJlcXVlbmN5SW5kZXggLSAzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0LmF1ZGlvT2JqZWN0VHlwZSA9IDI7XG4gICAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSgyKTtcbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxlSW5kZXggPSByZXQuZnJlcXVlbmN5SW5kZXg7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh1c2VyQWdlbnQuaW5kZXhPZignYW5kcm9pZCcpICE9PSAtMSkge1xuICAgICAgcmV0LmF1ZGlvT2JqZWN0VHlwZSA9IDI7XG4gICAgICBjb25maWcgPSBuZXcgQXJyYXkoMik7XG4gICAgICBleHRlbnNpb25TYW1wbGVJbmRleCA9IHJldC5mcmVxdWVuY3lJbmRleDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0LmF1ZGlvT2JqZWN0VHlwZSA9IDU7XG4gICAgICBjb25maWcgPSBuZXcgQXJyYXkoNCk7XG4gICAgICBpZiAocmV0LmZyZXF1ZW5jeUluZGV4ID49IDYpIHtcbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxlSW5kZXggPSByZXQuZnJlcXVlbmN5SW5kZXggLSAzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHJldC5jaGFubmVsID09PSAxKSB7XG4gICAgICAgICAgcmV0LmF1ZGlvT2JqZWN0VHlwZSA9IDI7XG4gICAgICAgICAgY29uZmlnID0gbmV3IEFycmF5KDIpO1xuICAgICAgICB9XG4gICAgICAgIGV4dGVuc2lvblNhbXBsZUluZGV4ID0gcmV0LmZyZXF1ZW5jeUluZGV4O1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbmZpZ1swXSA9IHJldC5hdWRpb09iamVjdFR5cGUgPDwgMztcbiAgICBjb25maWdbMF0gfD0gKHJldC5mcmVxdWVuY3lJbmRleCAmIDB4MGUpID4+IDE7XG4gICAgY29uZmlnWzFdID0gKHJldC5mcmVxdWVuY3lJbmRleCAmIDB4MDEpIDw8IDc7XG4gICAgY29uZmlnWzFdIHw9IHJldC5jaGFubmVsIDw8IDM7XG4gICAgaWYgKHJldC5hdWRpb09iamVjdFR5cGUgPT09IDUpIHtcbiAgICAgIGNvbmZpZ1sxXSB8PSAoZXh0ZW5zaW9uU2FtcGxlSW5kZXggJiAweDBlKSA+PiAxO1xuICAgICAgY29uZmlnWzJdID0gKGV4dGVuc2lvblNhbXBsZUluZGV4ICYgMHgwMSkgPDwgNztcbiAgICAgIGNvbmZpZ1syXSB8PSAyIDw8IDI7XG4gICAgICBjb25maWdbM10gPSAwO1xuICAgIH1cbiAgICByZXQuYXVkaW9Db25maWcgPSBjb25maWc7XG4gIH1cblxuICBnZXQgaW5wdXRCdWZmZXIgKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKHRoaXMuY29uZmlncy5pbnB1dGJ1ZmZlcik7XG4gIH1cblxuICBnZXQgX3RyYWNrcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRzRGVtdXhlcjtcbiIsImNsYXNzIFBsYXlsaXN0IHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZ3MpIHtcbiAgICB0aGlzLl9iYXNlVVJMID0gJyc7XG4gICAgdGhpcy5fbGlzdCA9IHt9O1xuICAgIHRoaXMuX3RzID0ge307XG4gICAgdGhpcy52ZXJzaW9uID0gMDtcbiAgICB0aGlzLnNlcXVlbmNlID0gLTE7XG4gICAgdGhpcy50YXJnZXRkdXJhdGlvbiA9IDA7XG4gICAgdGhpcy5kdXJhdGlvbiA9IDA7XG4gICAgdGhpcy5mcmFnTGVuZ3RoID0gMDtcbiAgICB0aGlzLl9sYXN0Z2V0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2F1ZG9jbGVhciA9IGNvbmZpZ3MuYXV0b2NsZWFyIHx8IGZhbHNlO1xuICB9XG5cbiAgZ2V0IGxpc3QgKCkge1xuICAgIHJldHVybiB0aGlzLl9saXN0O1xuICB9XG5cbiAgc2V0IGJhc2VVUkwgKGJhc2VVUkwpIHtcbiAgICBpZiAodGhpcy5iYXNlVVJMICE9PSBiYXNlVVJMKSB7XG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICB0aGlzLl9iYXNlVVJMID0gYmFzZVVSTDtcbiAgICB9XG4gIH1cblxuICBnZXQgYmFzZVVSTCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Jhc2VVUkw7XG4gIH1cblxuICBwdXNoICh0cywgZHVyYXRpb24sIGRpc2NvbnRpbnVlKSB7XG4gICAgaWYgKCF0aGlzLl90c1t0c10pIHtcbiAgICAgIHRoaXMuX3RzW3RzXSA9IHtkdXJhdGlvbjogZHVyYXRpb24sIFxuICAgICAgICBkb3dubG9hZGVkOiBmYWxzZSwgXG4gICAgICAgIGRvd25sb2FkaW5nOiBmYWxzZSwgXG4gICAgICAgIHN0YXJ0OiB0aGlzLmR1cmF0aW9uLCBcbiAgICAgICAgZGlzY29udGludWU6IGRpc2NvbnRpbnVlID8gdHJ1ZTogZmFsc2VcbiAgICAgIH07XG4gICAgICB0aGlzLl9saXN0W3RoaXMuZHVyYXRpb25dID0gdHM7XG4gICAgICB0aGlzLmR1cmF0aW9uICs9IGR1cmF0aW9uO1xuICAgICAgdGhpcy5mcmFnTGVuZ3RoICs9IDE7XG4gICAgfVxuICB9XG5cbiAgZGVsZXRlRnJhZyAodXJsKSB7XG4gICAgaWYgKHRoaXMuX3RzW3VybF0pIHtcbiAgICAgIGlmICh0aGlzLl90c1t1cmxdLnN0YXJ0ID4gdGhpcy5fbGFzdGdldC50aW1lKSB7XG4gICAgICAgIHRoaXMuX2xhc3RnZXQgPSB7XG4gICAgICAgICAgZHVyYXRpb246IHRoaXMuX3RzW3VybF0uZHVyYXRpb24sXG4gICAgICAgICAgdGltZTogdGhpcy5fdHNbdXJsXS5zdGFydCxcbiAgICAgICAgICBkb3dubG9hZGVkOiBmYWxzZSxcbiAgICAgICAgICBkb3dubG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgdXJsOiB1cmxcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZGVsZXRlIHRoaXMuX2xpc3RbdGhpcy5fdHNbdXJsXS5zdGFydF07XG4gICAgICBkZWxldGUgdGhpcy5fdHNbdXJsXTtcbiAgICAgIHRoaXMuZnJhZ0xlbmd0aCAtPSAxO1xuICAgIH1cbiAgfVxuXG4gIHB1c2hNM1U4IChkYXRhLCBkZWxldGVwcmUpIHtcbiAgICAvLyDluLjop4Tkv6Hmga/mm7/mjaJcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gbTN1OCBkYXRhIHJlY2VpdmVkLmApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnZlcnNpb24gPSBkYXRhLnZlcnNpb247XG4gICAgdGhpcy50YXJnZXRkdXJhdGlvbiA9IGRhdGEudGFyZ2V0ZHVyYXRpb247XG4gICAgaWYoZGF0YS5lbmNyeXB0ICYmICF0aGlzLmVuY3J5cHQpIHtcbiAgICAgIHRoaXMuZW5jcnlwdCA9IGRhdGEuZW5jcnlwdDtcbiAgICB9XG4gICAgLy8g5paw5YiG54mH5L+h5oGvXG4gICAgaWYgKGRhdGEuc2VxdWVuY2UgPiB0aGlzLnNlcXVlbmNlKSB7XG4gICAgICB0aGlzLnNlcXVlbmNlID0gZGF0YS5zZXF1ZW5jZTtcbiAgICAgIGxldCBuZXdmcmFnbGlzdCA9IFtdXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuZnJhZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGZyYWcgPSBkYXRhLmZyYWdzW2ldO1xuICAgICAgICBpZiAoIXRoaXMuX3RzW2ZyYWcudXJsXSkge1xuICAgICAgICAgIG5ld2ZyYWdsaXN0LnB1c2goZnJhZy51cmwpXG4gICAgICAgICAgdGhpcy5wdXNoKGZyYWcudXJsLCBmcmFnLmR1cmF0aW9uLCBmcmFnLmRpc2NvbnRpbnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZihuZXdmcmFnbGlzdC5sZW5ndGggPCAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FuIG5vdCByZWFkIHRzIGZpbGUgbGlzdC5gKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKGRlbGV0ZXByZSkge1xuICAgICAgICBsZXQgdHNsaXN0ID0gdGhpcy5nZXRUc0xpc3QoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0c2xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAobmV3ZnJhZ2xpc3QuaW5kZXhPZih0c2xpc3RbaV0pIDwgMCkge1xuICAgICAgICAgICAgdGhpcy5kZWxldGVGcmFnKHRzbGlzdFtpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgT2xkIG0zdTggZmlsZSByZWNlaXZlZCwgJHtkYXRhLnNlcXVlbmNlfWApO1xuICAgIH1cbiAgfVxuXG4gIGdldFRzTGlzdCAoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX3RzKTtcbiAgfVxuXG4gIGRvd25sb2FkZWQgKHRzbmFtZSwgaXNsb2FkZWQpIHtcbiAgICBsZXQgdHMgPSB0aGlzLl90c1t0c25hbWVdO1xuICAgIGlmICh0cykge1xuICAgICAgdHMuZG93bmxvYWRlZCA9IGlzbG9hZGVkXG4gICAgfVxuICB9XG5cbiAgZG93bmxvYWRpbmcgKHRzbmFtZSwgbG9hZGluZykge1xuICAgIGxldCB0cyA9IHRoaXMuX3RzW3RzbmFtZV07XG4gICAgaWYgKHRzKSB7XG4gICAgICB0cy5kb3dubG9hZGluZyA9IGxvYWRpbmdcbiAgICB9XG4gIH1cblxuICBnZXRUc0J5TmFtZSAobmFtZSkge1xuICAgIHJldHVybiB0aGlzLl90c1tuYW1lXTtcbiAgfVxuXG4gIGdldFRzICh0aW1lKSB7XG4gICAgbGV0IHRpbWVsaXN0ID0gT2JqZWN0LmtleXModGhpcy5fbGlzdCk7XG4gICAgbGV0IHRzO1xuXG4gICAgaWYgKHRpbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHRoaXMuX2xhc3RnZXQpIHtcbiAgICAgICAgdGltZSA9IHRoaXMuX2xhc3RnZXQudGltZSArIHRoaXMuX2xhc3RnZXQuZHVyYXRpb247XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aW1lID0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGltZWxpc3QubGVuZ3RoIDwgMSB8fCB0aW1lID49IHRoaXMuZHVyYXRpb24pIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHRpbWVsaXN0LnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KGEpIC0gcGFyc2VGbG9hdChiKVxuICAgIH0pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGltZWxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aW1lID49IHBhcnNlSW50KHRpbWVsaXN0W2ldKSkge1xuICAgICAgICBsZXQgdXJsID0gdGhpcy5fbGlzdFt0aW1lbGlzdFtpXV07XG4gICAgICAgIGxldCBkb3dubG9hZGVkID0gdGhpcy5fdHNbdXJsXS5kb3dubG9hZGVkO1xuICAgICAgICBsZXQgZG93bmxvYWRpbmcgPSB0aGlzLl90c1t1cmxdLmRvd25sb2FkaW5nO1xuICAgICAgICB0cyA9IHt1cmwsIGRvd25sb2FkZWQsIGRvd25sb2FkaW5nLCB0aW1lOiBwYXJzZUludCh0aW1lbGlzdFtpXSksIGR1cmF0aW9uOiBwYXJzZUludCh0aGlzLl90c1t1cmxdLmR1cmF0aW9uKX07XG4gICAgICAgIGlmICh0aGlzLmF1dG9jbGVhcikge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLl90c1t0aGlzLl9sYXN0Z2V0LnVybF07XG4gICAgICAgICAgZGVsZXRlIHRoaXMuX2xpc3RbdGhpcy5fbGFzdGdldC50aW1lXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sYXN0Z2V0ID0gdHM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRzO1xuICB9XG5cbiAgY2xlYXIgKCkge1xuICAgIHRoaXMuX2Jhc2VVUkwgPSAnJztcbiAgICB0aGlzLl9saXN0ID0ge307XG4gICAgdGhpcy5fdHMgPSB7fTtcbiAgICB0aGlzLnZlcnNpb24gPSAwO1xuICAgIHRoaXMuc2VxdWVuY2UgPSAtMTtcbiAgICB0aGlzLnRhcmdldGR1cmF0aW9uID0gMDtcbiAgICB0aGlzLmR1cmF0aW9uID0gMDtcbiAgfVxuXG4gIGNsZWFyRG93bmxvYWRlZCAoKSB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBPYmplY3Qua2V5cyh0aGlzLl90cykubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBsZXQgdHMgPSB0aGlzLl90c1tPYmplY3Qua2V5cyh0aGlzLl90cylbaV1dO1xuICAgICAgdHMuZG93bmxvYWRlZCA9IGZhbHNlO1xuICAgICAgdHMuZG93bmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLl9iYXNlVVJMID0gJyc7XG4gICAgdGhpcy5fbGlzdCA9IHt9O1xuICAgIHRoaXMuX3RzID0ge307XG4gICAgdGhpcy52ZXJzaW9uID0gMDtcbiAgICB0aGlzLnNlcXVlbmNlID0gLTE7XG4gICAgdGhpcy50YXJnZXRkdXJhdGlvbiA9IDA7XG4gICAgdGhpcy5kdXJhdGlvbiA9IDA7XG4gICAgdGhpcy5mcmFnTGVuZ3RoID0gMDtcbiAgICB0aGlzLl9sYXN0Z2V0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2F1ZG9jbGVhciA9IGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXlsaXN0O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIEZldGNoTG9hZGVyOiByZXF1aXJlKCcuL3NyYy9mZXRjaC1sb2FkZXInKS5kZWZhdWx0XG59O1xuIiwiaW1wb3J0IHsgRVZFTlRTIH0gZnJvbSAneGdwbGF5ZXItdXRpbHMnO1xuXG5jb25zdCBMT0FERVJfRVZFTlRTID0gRVZFTlRTLkxPQURFUl9FVkVOVFM7XG5jb25zdCBSRUFEX1NUUkVBTSA9IDA7XG5jb25zdCBSRUFEX1RFWFQgPSAxO1xuY29uc3QgUkVBRF9KU09OID0gMjtcbmNvbnN0IFJFQURfQlVGRkVSID0gMztcbmNsYXNzIEZldGNoTG9hZGVyIHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZ3MpIHtcbiAgICB0aGlzLmNvbmZpZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWdzKTtcbiAgICB0aGlzLnVybCA9IG51bGxcbiAgICB0aGlzLnN0YXR1cyA9IDBcbiAgICB0aGlzLmVycm9yID0gbnVsbFxuICAgIHRoaXMuX3JlYWRlciA9IG51bGw7XG4gICAgdGhpcy5fY2FuY2VsZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9kZXN0cm95ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnJlYWR0eXBlID0gdGhpcy5jb25maWdzLnJlYWR0eXBlO1xuICAgIHRoaXMuYnVmZmVyID0gdGhpcy5jb25maWdzLmJ1ZmZlciB8fCAnTE9BREVSX0JVRkZFUic7XG4gICAgdGhpcy5fbG9hZGVyVGFza05vID0gMDtcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIHRoaXMub24oTE9BREVSX0VWRU5UUy5MQURFUl9TVEFSVCwgdGhpcy5sb2FkLmJpbmQodGhpcykpXG4gIH1cblxuICBzdGF0aWMgZ2V0IHR5cGUgKCkge1xuICAgIHJldHVybiAnbG9hZGVyJ1xuICB9XG5cbiAgbG9hZCAodXJsLCBvcHRzKSB7XG4gICAgbGV0IF90aGlzID0gdGhpcztcbiAgICB0aGlzLnVybCA9IHVybDtcbiAgICB0aGlzLl9jYW5jZWxlZCA9IGZhbHNlO1xuXG4gICAgLy8gVE9ETzogQWRkIFJhbmdlc1xuICAgIGxldCBwYXJhbXMgPSB0aGlzLmdldFBhcmFtcyhvcHRzKVxuICAgIF90aGlzLmxvYWRpbmcgPSB0cnVlXG4gICAgcmV0dXJuIGZldGNoKHRoaXMudXJsLCBwYXJhbXMpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgX3RoaXMuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzXG4gICAgICAgIHJldHVybiBfdGhpcy5fb25GZXRjaFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICAgIF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfRVJST1IsIF90aGlzLlRBRywgbmV3IEVycm9yKGBpbnZhbGlkIHJlc3BvbnNlLmApKTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpICB7XG4gICAgICBfdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0VSUk9SLCBfdGhpcy5UQUcsIGVycm9yKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKVxuICAgIH0pXG4gIH1cblxuICBfb25GZXRjaFJlc3BvbnNlIChyZXNwb25zZSkge1xuICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgbGV0IGJ1ZmZlciA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UodGhpcy5idWZmZXIpO1xuICAgIHRoaXMuX2xvYWRlclRhc2tObysrO1xuICAgIGxldCB0YXNrbm8gPSB0aGlzLl9sb2FkZXJUYXNrTm87XG4gICAgaWYgKHJlc3BvbnNlLm9rID09PSB0cnVlKSB7XG4gICAgICBzd2l0Y2ggKHRoaXMucmVhZHR5cGUpIHtcbiAgICAgICAgY2FzZSBSRUFEX0pTT046XG4gICAgICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIF90aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgICAgICAgaWYgKCFfdGhpcy5fY2FuY2VsZWQgJiYgIV90aGlzLl9kZXN0cm95ZWQpIHtcbiAgICAgICAgICAgICAgaWYgKGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsIGJ1ZmZlcik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9DT01QTEVURSwgZGF0YSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBSRUFEX1RFWFQ6XG4gICAgICAgICAgcmVzcG9uc2UudGV4dCgpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIF90aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgICAgICAgaWYgKCFfdGhpcy5fY2FuY2VsZWQgJiYgIV90aGlzLl9kZXN0cm95ZWQpIHtcbiAgICAgICAgICAgICAgaWYgKGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsIGJ1ZmZlcik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9DT01QTEVURSwgZGF0YSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBSRUFEX0JVRkZFUjpcbiAgICAgICAgICByZXNwb25zZS5hcnJheUJ1ZmZlcigpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIF90aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgICAgICAgaWYgKCFfdGhpcy5fY2FuY2VsZWQgJiYgIV90aGlzLl9kZXN0cm95ZWQpIHtcbiAgICAgICAgICAgICAgaWYgKGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoKG5ldyBVaW50OEFycmF5KGRhdGEpKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0NPTVBMRVRFLCBidWZmZXIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsIGRhdGEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgUkVBRF9TVFJFQU06XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX29uUmVhZGVyKHJlc3BvbnNlLmJvZHkuZ2V0UmVhZGVyKCksIHRhc2tubyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX29uUmVhZGVyIChyZWFkZXIsIHRhc2tubykge1xuICAgIGxldCBidWZmZXIgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKHRoaXMuYnVmZmVyKTtcbiAgICBpZiAoKCFidWZmZXIgJiYgdGhpcy5fcmVhZGVyKSB8fCB0aGlzLl9kZXN0cm95ZWQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuX3JlYWRlci5jYW5jZWwoKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBETyBOT1RISU5HXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fcmVhZGVyID0gcmVhZGVyXG4gICAgaWYgKHRoaXMubG9hZGluZyA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBfdGhpcyA9IHRoaXNcbiAgICAvLyByZWFkZXIgcmVhZCBmdW5jdGlvbiByZXR1cm5zIGEgUHJvbWlzZS4gZ2V0IGRhdGEgd2hlbiBjYWxsYmFjayBhbmQgaGFzIHZhbHVlLmRvbmUgd2hlbiBkaXNjb25uZWN0ZWQuXG4gICAgLy8gcmVhZOaWueazlei/lOWbnuS4gOS4qlByb21pc2UuIOWbnuiwg+S4reWPr+S7peiOt+WPluWIsOaVsOaNruOAguW9k3ZhbHVlLmRvbmXlrZjlnKjml7bvvIzor7TmmI7pk77mjqXmlq3lvIDjgIJcbiAgICB0aGlzLl9yZWFkZXIgJiYgdGhpcy5fcmVhZGVyLnJlYWQoKS50aGVuKGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgIGlmICh2YWwuZG9uZSkge1xuICAgICAgICAvLyBUT0RPOiDlrozmiJDlpITnkIZcbiAgICAgICAgX3RoaXMubG9hZGluZyA9IGZhbHNlXG4gICAgICAgIF90aGlzLnN0YXR1cyA9IDA7XG4gICAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsIGJ1ZmZlcilcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChfdGhpcy5fY2FuY2VsZWQgfHwgX3RoaXMuX2Rlc3Ryb3llZCkge1xuICAgICAgICBpZiAgKF90aGlzLl9yZWFkZXIpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgX3RoaXMuX3JlYWRlci5jYW5jZWwoKVxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIERPIE5PVEhJTkdcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBidWZmZXIucHVzaCh2YWwudmFsdWUpXG4gICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0RBVEFMT0FERUQsIGJ1ZmZlcilcbiAgICAgIHJldHVybiBfdGhpcy5fb25SZWFkZXIocmVhZGVyLCB0YXNrbm8pXG4gICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBfdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0VSUk9SLCBfdGhpcy5UQUcsIGVycm9yKTtcbiAgICB9KVxuICB9XG5cbiAgZ2V0UGFyYW1zIChvcHRzKSB7XG4gICAgbGV0IG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRzKVxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKVxuXG4gICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgbW9kZTogJ2NvcnMnLFxuICAgICAgY2FjaGU6ICdkZWZhdWx0J1xuICAgIH1cblxuICAgIC8vIGFkZCBjdXN0bW9yIGhlYWRlcnNcbiAgICAvLyDmt7vliqDoh6rlrprkuYnlpLRcbiAgICBpZiAodHlwZW9mIHRoaXMuY29uZmlncy5oZWFkZXJzID09PSAnb2JqZWN0Jykge1xuICAgICAgbGV0IGNvbmZpZ0hlYWRlcnMgPSB0aGlzLmNvbmZpZ3MuaGVhZGVyc1xuICAgICAgZm9yIChsZXQga2V5IGluIGNvbmZpZ0hlYWRlcnMpIHtcbiAgICAgICAgaWYgKGNvbmZpZ0hlYWRlcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGhlYWRlcnMuYXBwZW5kKGtleSwgY29uZmlnSGVhZGVyc1trZXldKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmhlYWRlcnMgPT09ICdvYmplY3QnKSB7XG4gICAgICBsZXQgb3B0SGVhZGVycyA9IG9wdGlvbnMuaGVhZGVyc1xuICAgICAgZm9yIChsZXQga2V5IGluIG9wdEhlYWRlcnMpIHtcbiAgICAgICAgaWYgKG9wdEhlYWRlcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGhlYWRlcnMuYXBwZW5kKGtleSwgb3B0SGVhZGVyc1trZXldKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuY29ycyA9PT0gZmFsc2UpIHtcbiAgICAgIHBhcmFtcy5tb2RlID0gJ3NhbWUtb3JpZ2luJ1xuICAgIH1cblxuICAgIC8vIHdpdGhDcmVkZW50aWFscyBpcyBkaXNhYmxlZCBieSBkZWZhdWx0XG4gICAgLy8gd2l0aENyZWRlbnRpYWxzIOWcqOm7mOiupOaDheWGteS4i+S4jeiiq+S9v+eUqOOAglxuICAgIGlmIChvcHRpb25zLndpdGhDcmVkZW50aWFscykge1xuICAgICAgcGFyYW1zLmNyZWRlbnRpYWxzID0gJ2luY2x1ZGUnXG4gICAgfVxuXG4gICAgLy8gVE9ETzogQWRkIHJhbmdlcztcbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgY2FuY2VsICgpIHtcbiAgICBpZiAodGhpcy5fcmVhZGVyKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLl9yZWFkZXIuY2FuY2VsKClcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8g6Ziy5q2iZmFpbGVkOiAyMDDplJnor6/ooqvmiZPljbDliLDmjqfliLblj7DkuIpcbiAgICAgIH1cbiAgICAgIHRoaXMuX3JlYWRlciA9IG51bGxcbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlXG4gICAgICB0aGlzLl9jYW5jZWxlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5fZGVzdHJveWVkID0gdHJ1ZVxuICAgIHRoaXMuY2FuY2VsKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRmV0Y2hMb2FkZXJcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBNcDRSZW11eGVyOiByZXF1aXJlKCcuL3NyYy9tcDQnKS5kZWZhdWx0XG59O1xuIiwiaW1wb3J0IHsgQnVmZmVyIH0gZnJvbSAneGdwbGF5ZXItdXRpbHMnO1xuXG4vLyBjb25zdCBVSU5UMzJfTUFYID0gTWF0aC5wb3coMiwgMzIpIC0gMTtcbmNsYXNzIEZtcDQge1xuICBzdGF0aWMgc2l6ZSAodmFsdWUpIHtcbiAgICByZXR1cm4gQnVmZmVyLndyaXRlVWludDMyKHZhbHVlKVxuICB9XG4gIHN0YXRpYyBpbml0Qm94IChzaXplLCBuYW1lLCAuLi5jb250ZW50KSB7XG4gICAgY29uc3QgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgYnVmZmVyLndyaXRlKEZtcDQuc2l6ZShzaXplKSwgRm1wNC50eXBlKG5hbWUpLCAuLi5jb250ZW50KVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIGV4dGVuc2lvbiAodmVyc2lvbiwgZmxhZykge1xuICAgIHJldHVybiBuZXcgVWludDhBcnJheShbXG4gICAgICB2ZXJzaW9uLFxuICAgICAgKGZsYWcgPj4gMTYpICYgMHhmZixcbiAgICAgIChmbGFnID4+IDgpICYgMHhmZixcbiAgICAgIGZsYWcgJiAweGZmXG4gICAgXSlcbiAgfVxuICBzdGF0aWMgZnR5cCAoKSB7XG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgyNCwgJ2Z0eXAnLCBuZXcgVWludDhBcnJheShbXG4gICAgICAweDY5LCAweDczLCAweDZGLCAweDZELCAvLyBpc29tLFxuICAgICAgMHgwLCAweDAsIDB4MDAsIDB4MDEsIC8vIG1pbm9yX3ZlcnNpb246IDB4MDFcbiAgICAgIDB4NjksIDB4NzMsIDB4NkYsIDB4NkQsIC8vIGlzb21cbiAgICAgIDB4NjEsIDB4NzYsIDB4NjMsIDB4MzEgLy8gYXZjMVxuICAgIF0pKVxuICB9XG4gIHN0YXRpYyBtb292ICh7IHR5cGUsIG1ldGEgfSkge1xuICAgIGxldCBzaXplID0gOFxuICAgIGxldCBtdmhkID0gRm1wNC5tdmhkKG1ldGEuZHVyYXRpb24sIG1ldGEudGltZXNjYWxlKVxuICAgIGxldCB0cmFrXG5cbiAgICBpZiAodHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgdHJhayA9IEZtcDQudmlkZW9UcmFrKG1ldGEpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYWsgPSBGbXA0LmF1ZGlvVHJhayhtZXRhKVxuICAgIH1cblxuICAgIGxldCBtdmV4ID0gRm1wNC5tdmV4KG1ldGEuZHVyYXRpb24sIG1ldGEudGltZXNjYWxlIHx8IDEwMDAsIG1ldGEuaWQpO1xuICAgIFttdmhkLCB0cmFrLCBtdmV4XS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGhcbiAgICB9KVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goc2l6ZSwgJ21vb3YnLCBtdmhkLCB0cmFrLCBtdmV4KVxuICB9XG4gIHN0YXRpYyBtdmhkIChkdXJhdGlvbiwgdGltZXNjYWxlID0gMTAwMCkge1xuICAgIC8vIGR1cmF0aW9uICo9IHRpbWVzY2FsZTtcbiAgICBsZXQgYnl0ZXMgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyB2ZXJzaW9uKDApICsgZmxhZ3MgICAgIDHkvY3nmoRib3jniYjmnKwrM+S9jWZsYWdzICAgYm9454mI5pys77yMMOaIljHvvIzkuIDoiKzkuLow44CC77yI5Lul5LiL5a2X6IqC5pWw5Z2H5oyJdmVyc2lvbj0w77yJXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBjcmVhdGlvbl90aW1lICAgIOWIm+W7uuaXtumXtCAg77yI55u45a+55LqOVVRD5pe26Ze0MTkwNC0wMS0wMembtueCueeahOenkuaVsO+8iVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gbW9kaWZpY2F0aW9uX3RpbWUgICDkv67mlLnml7bpl7RcblxuICAgICAgLyoqXG4gICAgICAgICAgICAgKiB0aW1lc2NhbGU6IDQgYnl0ZXPmlofku7blqpLkvZPlnKgx56eS5pe26Ze05YaF55qE5Yi75bqm5YC877yM5Y+v5Lul55CG6Kej5Li6MeenkumVv+W6plxuICAgICAgICAgICAgICovXG4gICAgICAodGltZXNjYWxlID4+PiAyNCkgJiAweEZGLFxuICAgICAgKHRpbWVzY2FsZSA+Pj4gMTYpICYgMHhGRixcbiAgICAgICh0aW1lc2NhbGUgPj4+IDgpICYgMHhGRixcbiAgICAgICh0aW1lc2NhbGUpICYgMHhGRixcblxuICAgICAgLyoqXG4gICAgICAgICAgICAgKiBkdXJhdGlvbjogNCBieXRlc+ivpXRyYWNr55qE5pe26Ze06ZW/5bqm77yM55SoZHVyYXRpb27lkox0aW1lIHNjYWxl5YC85Y+v5Lul6K6h566XdHJhY2vml7bplb/vvIzmr5TlpoJhdWRpbyB0cmFja+eahHRpbWUgc2NhbGUgPSA4MDAwLFxuICAgICAgICAgICAgICogZHVyYXRpb24gPSA1NjAxMjjvvIzml7bplb/kuLo3MC4wMTbvvIx2aWRlbyB0cmFja+eahHRpbWUgc2NhbGUgPSA2MDAsIGR1cmF0aW9uID0gNDIwMDDvvIzml7bplb/kuLo3MFxuICAgICAgICAgICAgICovXG4gICAgICAoZHVyYXRpb24gPj4+IDI0KSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24gPj4+IDE2KSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24gPj4+IDgpICYgMHhGRixcbiAgICAgIChkdXJhdGlvbikgJiAweEZGLFxuICAgICAgMHgwMCwgMHgwMSwgMHgwMCwgMHgwMCwgLy8gUHJlZmVycmVkIHJhdGU6IDEuMCAgIOaOqOiNkOaSreaUvumAn+eOh++8jOmrmDE25L2N5ZKM5L2OMTbkvY3liIbliKvkuLrlsI/mlbDngrnmlbTmlbDpg6jliIblkozlsI/mlbDpg6jliIbvvIzljbNbMTYuMTZdIOagvOW8j++8jOivpeWAvOS4ujEuMO+8iDB4MDAwMTAwMDDvvInooajnpLrmraPluLjliY3lkJHmkq3mlL5cbiAgICAgIC8qKlxuICAgICAgICAgICAgICogUHJlZmVycmVkVm9sdW1lKDEuMCwgMmJ5dGVzKSArIHJlc2VydmVkKDJieXRlcylcbiAgICAgICAgICAgICAqIOS4jnJhdGXnsbvkvLzvvIxbOC44XSDmoLzlvI/vvIwxLjDvvIgweDAxMDDvvInooajnpLrmnIDlpKfpn7Pph49cbiAgICAgICAgICAgICAqL1xuICAgICAgMHgwMSwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vICByZXNlcnZlZDogNCArIDQgYnl0ZXPkv53nlZnkvY1cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAxLCAweDAwLCAweDAwLCAvLyAtLS0tYmVnaW4gY29tcG9zaXRpb24gbWF0cml4LS0tLVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIOinhumikeWPmOaNouefqemYtSAgIOe6v+aAp+S7o+aVsFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDEsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDQwLCAweDAwLCAweDAwLCAweDAwLCAvLyAtLS0tZW5kIGNvbXBvc2l0aW9uIG1hdHJpeC0tLS1cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIC0tLS1iZWdpbiBwcmVfZGVmaW5lZCA2ICogNCBieXRlcy0tLS1cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBwcmUtZGVmaW5lZCDkv53nlZnkvY1cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gLS0tLWVuZCBwcmVfZGVmaW5lZCA2ICogNCBieXRlcy0tLS1cbiAgICAgIDB4RkYsIDB4RkYsIDB4RkYsIDB4RkYgLy8gbmV4dF90cmFja19JRCDkuIvkuIDkuKp0cmFja+S9v+eUqOeahGlk5Y+3XG4gICAgXSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDggKyBieXRlcy5sZW5ndGgsICdtdmhkJywgbmV3IFVpbnQ4QXJyYXkoYnl0ZXMpKVxuICB9XG4gIHN0YXRpYyB2aWRlb1RyYWsgKGRhdGEpIHtcbiAgICBsZXQgc2l6ZSA9IDhcblxuICAgIGxldCB0a2hkID0gRm1wNC50a2hkKHtcbiAgICAgIGlkOiAxLFxuICAgICAgZHVyYXRpb246IGRhdGEuZHVyYXRpb24sXG4gICAgICB0aW1lc2NhbGU6IGRhdGEudGltZXNjYWxlIHx8IDEwMDAsXG4gICAgICB3aWR0aDogZGF0YS5wcmVzZW50V2lkdGgsXG4gICAgICBoZWlnaHQ6IGRhdGEucHJlc2VudEhlaWdodCxcbiAgICAgIHR5cGU6ICd2aWRlbydcbiAgICB9KVxuICAgIGxldCBtZGlhID0gRm1wNC5tZGlhKHtcbiAgICAgIHR5cGU6ICd2aWRlbycsXG4gICAgICB0aW1lc2NhbGU6IGRhdGEudGltZXNjYWxlIHx8IDEwMDAsXG4gICAgICBkdXJhdGlvbjogZGF0YS5kdXJhdGlvbixcbiAgICAgIGF2Y2M6IGRhdGEuYXZjYyxcbiAgICAgIHBhclJhdGlvOiBkYXRhLnBhclJhdGlvLFxuICAgICAgd2lkdGg6IGRhdGEucHJlc2VudFdpZHRoLFxuICAgICAgaGVpZ2h0OiBkYXRhLnByZXNlbnRIZWlnaHRcbiAgICB9KTtcbiAgICBbdGtoZCwgbWRpYV0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KHNpemUsICd0cmFrJywgdGtoZCwgbWRpYSlcbiAgfVxuICBzdGF0aWMgYXVkaW9UcmFrIChkYXRhKSB7XG4gICAgbGV0IHNpemUgPSA4XG4gICAgbGV0IHRraGQgPSBGbXA0LnRraGQoe1xuICAgICAgaWQ6IDIsXG4gICAgICBkdXJhdGlvbjogZGF0YS5kdXJhdGlvbixcbiAgICAgIHRpbWVzY2FsZTogZGF0YS50aW1lc2NhbGUgfHwgMTAwMCxcbiAgICAgIHdpZHRoOiAwLFxuICAgICAgaGVpZ2h0OiAwLFxuICAgICAgdHlwZTogJ2F1ZGlvJ1xuICAgIH0pXG4gICAgbGV0IG1kaWEgPSBGbXA0Lm1kaWEoe1xuICAgICAgdHlwZTogJ2F1ZGlvJyxcbiAgICAgIHRpbWVzY2FsZTogZGF0YS50aW1lc2NhbGUgfHwgMTAwMCxcbiAgICAgIGR1cmF0aW9uOiBkYXRhLmR1cmF0aW9uLFxuICAgICAgY2hhbm5lbENvdW50OiBkYXRhLmNoYW5uZWxDb3VudCxcbiAgICAgIHNhbXBsZXJhdGU6IGRhdGEuc2FtcGxlUmF0ZSxcbiAgICAgIGNvbmZpZzogZGF0YS5jb25maWdcbiAgICB9KTtcbiAgICBbdGtoZCwgbWRpYV0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KHNpemUsICd0cmFrJywgdGtoZCwgbWRpYSlcbiAgfVxuICBzdGF0aWMgdGtoZCAoZGF0YSkge1xuICAgIGxldCBpZCA9IGRhdGEuaWRcbiAgICBsZXQgZHVyYXRpb24gPSBkYXRhLmR1cmF0aW9uXG4gICAgbGV0IHdpZHRoID0gZGF0YS53aWR0aFxuICAgIGxldCBoZWlnaHQgPSBkYXRhLmhlaWdodFxuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwNywgLy8gdmVyc2lvbigwKSArIGZsYWdzIDHkvY3niYjmnKwgYm9454mI5pys77yMMOaIljHvvIzkuIDoiKzkuLow44CC77yI5Lul5LiL5a2X6IqC5pWw5Z2H5oyJdmVyc2lvbj0w77yJ5oyJ5L2N5oiW5pON5L2c57uT5p6c5YC877yM6aKE5a6a5LmJ5aaC5LiL77yaXG4gICAgICAvLyAweDAwMDAwMSB0cmFja19lbmFibGVk77yM5ZCm5YiZ6K+ldHJhY2vkuI3ooqvmkq3mlL7vvJtcbiAgICAgIC8vIDB4MDAwMDAyIHRyYWNrX2luX21vdmll77yM6KGo56S66K+ldHJhY2vlnKjmkq3mlL7kuK3ooqvlvJXnlKjvvJtcbiAgICAgIC8vIDB4MDAwMDA0IHRyYWNrX2luX3ByZXZpZXfvvIzooajnpLror6V0cmFja+WcqOmihOiniOaXtuiiq+W8leeUqOOAglxuICAgICAgLy8g5LiA6Iis6K+l5YC85Li6N++8jDErMis0IOWmguaenOS4gOS4quWqkuS9k+aJgOaciXRyYWNr5Z2H5pyq6K6+572udHJhY2tfaW5fbW92aWXlkox0cmFja19pbl9wcmV2aWV377yM5bCG6KKr55CG6Kej5Li65omA5pyJdHJhY2vlnYforr7nva7kuobov5nkuKTpobnvvJvlr7nkuo5oaW50IHRyYWNr77yM6K+l5YC85Li6MFxuICAgICAgLy8gaGludCB0cmFjayDov5nkuKrnibnmrornmoR0cmFja+W5tuS4jeWMheWQq+WqkuS9k+aVsOaNru+8jOiAjOaYr+WMheWQq+S6huS4gOS6m+WwhuWFtuS7luaVsOaNrnRyYWNr5omT5YyF5oiQ5rWB5aqS5L2T55qE5oyH56S65L+h5oGv44CCXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBjcmVhdGlvbl90aW1l5Yib5bu65pe26Ze077yI55u45a+55LqOVVRD5pe26Ze0MTkwNC0wMS0wMembtueCueeahOenkuaVsO+8iVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gbW9kaWZpY2F0aW9uIHRpbWUg5L+u5pS55pe26Ze0XG4gICAgICAoaWQgPj4+IDI0KSAmIDB4RkYsIC8vIHRyYWNrX0lEOiA0IGJ5dGVzIGlk5Y+377yM5LiN6IO96YeN5aSN5LiU5LiN6IO95Li6MFxuICAgICAgKGlkID4+PiAxNikgJiAweEZGLFxuICAgICAgKGlkID4+PiA4KSAmIDB4RkYsXG4gICAgICAoaWQpICYgMHhGRixcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkOiA0IGJ5dGVzICAgIOS/neeVmeS9jVxuICAgICAgKGR1cmF0aW9uID4+PiAyNCkgJiAweEZGLCAvLyBkdXJhdGlvbjogNCBieXRlcyB0cmFja+eahOaXtumXtOmVv+W6plxuICAgICAgKGR1cmF0aW9uID4+PiAxNikgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uID4+PiA4KSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24pICYgMHhGRixcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkOiAyICogNCBieXRlcyAgICDkv53nlZnkvY1cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBsYXllcigyYnl0ZXMpICsgYWx0ZXJuYXRlX2dyb3VwKDJieXRlcykgIOinhumikeWxgu+8jOm7mOiupOS4ujDvvIzlgLzlsI/nmoTlnKjkuIrlsYIudHJhY2vliIbnu4Tkv6Hmga/vvIzpu5jorqTkuLow6KGo56S66K+ldHJhY2vmnKrkuI7lhbbku5Z0cmFja+aciee+pOe7hOWFs+ezu1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gdm9sdW1lKDJieXRlcykgKyByZXNlcnZlZCgyYnl0ZXMpICAgIFs4LjhdIOagvOW8j++8jOWmguaenOS4uumfs+mikXRyYWNr77yMMS4w77yIMHgwMTAw77yJ6KGo56S65pyA5aSn6Z+z6YeP77yb5ZCm5YiZ5Li6MCAgICvkv53nlZnkvY1cbiAgICAgIDB4MDAsIDB4MDEsIDB4MDAsIDB4MDAsIC8vIC0tLS1iZWdpbiBjb21wb3NpdGlvbiBtYXRyaXgtLS0tXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAxLCAweDAwLCAweDAwLCAvLyDop4bpopHlj5jmjaLnn6npmLVcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4NDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIC0tLS1lbmQgY29tcG9zaXRpb24gbWF0cml4LS0tLVxuICAgICAgKHdpZHRoID4+PiA4KSAmIDB4RkYsIC8vIC8v5a695bqmXG4gICAgICAod2lkdGgpICYgMHhGRixcbiAgICAgIDB4MDAsIDB4MDAsXG4gICAgICAoaGVpZ2h0ID4+PiA4KSAmIDB4RkYsIC8vIOmrmOW6plxuICAgICAgKGhlaWdodCkgJiAweEZGLFxuICAgICAgMHgwMCwgMHgwMFxuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCg4ICsgY29udGVudC5ieXRlTGVuZ3RoLCAndGtoZCcsIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIGVkdHMgKGRhdGEpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IGR1cmF0aW9uID0gZGF0YS5kdXJhdGlvblxuICAgIGxldCBtZWRpYVRpbWUgPSBkYXRhLm1lZGlhVGltZVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoMzYpLCBGbXA0LnR5cGUoJ2VkdHMnKSlcbiAgICAvLyBlbHN0XG4gICAgYnVmZmVyLndyaXRlKEZtcDQuc2l6ZSgyOCksIEZtcDQudHlwZSgnZWxzdCcpKVxuICAgIGJ1ZmZlci53cml0ZShuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAxLCAvLyBlbnRyeSBjb3VudFxuICAgICAgKGR1cmF0aW9uID4+IDI0KSAmIDB4ZmYsIChkdXJhdGlvbiA+PiAxNikgJiAweGZmLCAoZHVyYXRpb24gPj4gOCkgJiAweGZmLCBkdXJhdGlvbiAmIDB4ZmYsXG4gICAgICAobWVkaWFUaW1lID4+IDI0KSAmIDB4ZmYsIChtZWRpYVRpbWUgPj4gMTYpICYgMHhmZiwgKG1lZGlhVGltZSA+PiA4KSAmIDB4ZmYsIG1lZGlhVGltZSAmIDB4ZmYsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAxIC8vIG1lZGlhIHJhdGVcbiAgICBdKSlcbiAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlclxuICB9XG4gIHN0YXRpYyBtZGlhIChkYXRhKSB7XG4gICAgbGV0IHNpemUgPSA4XG4gICAgbGV0IG1kaGQgPSBGbXA0Lm1kaGQoZGF0YS50aW1lc2NhbGUsIGRhdGEuZHVyYXRpb24pXG4gICAgbGV0IGhkbHIgPSBGbXA0LmhkbHIoZGF0YS50eXBlKVxuICAgIGxldCBtaW5mID0gRm1wNC5taW5mKGRhdGEpO1xuICAgIFttZGhkLCBoZGxyLCBtaW5mXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGhcbiAgICB9KVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goc2l6ZSwgJ21kaWEnLCBtZGhkLCBoZGxyLCBtaW5mKVxuICB9XG4gIHN0YXRpYyBtZGhkICh0aW1lc2NhbGUgPSAxMDAwLCBkdXJhdGlvbikge1xuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gY3JlYXRpb25fdGltZSAgICDliJvlu7rml7bpl7RcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIG1vZGlmaWNhdGlvbl90aW1l5L+u5pS55pe26Ze0XG4gICAgICAodGltZXNjYWxlID4+PiAyNCkgJiAweEZGLCAvLyB0aW1lc2NhbGU6IDQgYnl0ZXMgICAg5paH5Lu25aqS5L2T5ZyoMeenkuaXtumXtOWGheeahOWIu+W6puWAvO+8jOWPr+S7peeQhuino+S4ujHnp5Lplb/luqZcbiAgICAgICh0aW1lc2NhbGUgPj4+IDE2KSAmIDB4RkYsXG4gICAgICAodGltZXNjYWxlID4+PiA4KSAmIDB4RkYsXG4gICAgICAodGltZXNjYWxlKSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24gPj4+IDI0KSAmIDB4RkYsIC8vIGR1cmF0aW9uOiA0IGJ5dGVzICB0cmFja+eahOaXtumXtOmVv+W6plxuICAgICAgKGR1cmF0aW9uID4+PiAxNikgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uID4+PiA4KSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24pICYgMHhGRixcbiAgICAgIDB4NTUsIDB4QzQsIC8vIGxhbmd1YWdlOiB1bmQgKHVuZGV0ZXJtaW5lZCkg5aqS5L2T6K+t6KiA56CB44CC5pyA6auY5L2N5Li6MO+8jOWQjumdojE15L2N5Li6M+S4quWtl+espu+8iOingUlTTyA2MzktMi9U5qCH5YeG5Lit5a6a5LmJ77yJXG4gICAgICAweDAwLCAweDAwIC8vIHByZV9kZWZpbmVkID0gMFxuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxMiArIGNvbnRlbnQuYnl0ZUxlbmd0aCwgJ21kaGQnLCBGbXA0LmV4dGVuc2lvbigwLCAwKSwgY29udGVudClcbiAgfVxuICBzdGF0aWMgaGRsciAodHlwZSkge1xuICAgIGxldCB2YWx1ZSA9IFsweDAwLCAvLyB2ZXJzaW9uIDBcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBwcmVfZGVmaW5lZFxuICAgICAgMHg3NiwgMHg2OSwgMHg2NCwgMHg2NSwgLy8gaGFuZGxlcl90eXBlOiAndmlkZSdcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4NTYsIDB4NjksIDB4NjQsIDB4NjUsXG4gICAgICAweDZmLCAweDQ4LCAweDYxLCAweDZlLFxuICAgICAgMHg2NCwgMHg2YywgMHg2NSwgMHg3MiwgMHgwMCAvLyBuYW1lOiAnVmlkZW9IYW5kbGVyJ1xuICAgIF1cbiAgICBpZiAodHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgdmFsdWUuc3BsaWNlKDgsIDQsIC4uLlsweDczLCAweDZmLCAweDc1LCAweDZlXSlcbiAgICAgIHZhbHVlLnNwbGljZSgyNCwgMTMsIC4uLlsweDUzLCAweDZmLCAweDc1LCAweDZlLFxuICAgICAgICAweDY0LCAweDQ4LCAweDYxLCAweDZlLFxuICAgICAgICAweDY0LCAweDZjLCAweDY1LCAweDcyLCAweDAwXSlcbiAgICB9XG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCg4ICsgdmFsdWUubGVuZ3RoLCAnaGRscicsIG5ldyBVaW50OEFycmF5KHZhbHVlKSlcbiAgfVxuICBzdGF0aWMgbWluZiAoZGF0YSkge1xuICAgIGxldCBzaXplID0gOFxuICAgIGxldCB2bWhkID0gZGF0YS50eXBlID09PSAndmlkZW8nID8gRm1wNC52bWhkKCkgOiBGbXA0LnNtaGQoKVxuICAgIGxldCBkaW5mID0gRm1wNC5kaW5mKClcbiAgICBsZXQgc3RibCA9IEZtcDQuc3RibChkYXRhKTtcbiAgICBbdm1oZCwgZGluZiwgc3RibF0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KHNpemUsICdtaW5mJywgdm1oZCwgZGluZiwgc3RibClcbiAgfVxuICBzdGF0aWMgdm1oZCAoKSB7XG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgyMCwgJ3ZtaGQnLCBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uXG4gICAgICAweDAwLCAweDAwLCAweDAxLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgLy8gZ3JhcGhpY3Ntb2RlXG4gICAgICAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAgLy8gb3Bjb2xvclxuICAgIF0pKVxuICB9XG4gIHN0YXRpYyBzbWhkICgpIHtcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDE2LCAnc21oZCcsIG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIC8vIHZlcnNpb25cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAweDAwLCAweDAwLCAvLyBiYWxhbmNlXG4gICAgICAweDAwLCAweDAwIC8vIHJlc2VydmVkXG4gICAgXSkpXG4gIH1cbiAgc3RhdGljIGRpbmYgKCkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgZHJlZiA9IFsweDAwLCAvLyB2ZXJzaW9uIDBcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAxLCAvLyBlbnRyeV9jb3VudFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwYywgLy8gZW50cnlfc2l6ZVxuICAgICAgMHg3NSwgMHg3MiwgMHg2YywgMHgyMCwgLy8gJ3VybCcgdHlwZVxuICAgICAgMHgwMCwgLy8gdmVyc2lvbiAwXG4gICAgICAweDAwLCAweDAwLCAweDAxIC8vIGVudHJ5X2ZsYWdzXG4gICAgXVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoMzYpLCBGbXA0LnR5cGUoJ2RpbmYnKSwgRm1wNC5zaXplKDI4KSwgRm1wNC50eXBlKCdkcmVmJyksIG5ldyBVaW50OEFycmF5KGRyZWYpKVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIHN0YmwgKGRhdGEpIHtcbiAgICBsZXQgc2l6ZSA9IDhcbiAgICBsZXQgc3RzZCA9IEZtcDQuc3RzZChkYXRhKVxuICAgIGxldCBzdHRzID0gRm1wNC5zdHRzKClcbiAgICBsZXQgc3RzYyA9IEZtcDQuc3RzYygpXG4gICAgbGV0IHN0c3ogPSBGbXA0LnN0c3ooKVxuICAgIGxldCBzdGNvID0gRm1wNC5zdGNvKCk7XG4gICAgW3N0c2QsIHN0dHMsIHN0c2MsIHN0c3osIHN0Y29dLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aFxuICAgIH0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveChzaXplLCAnc3RibCcsIHN0c2QsIHN0dHMsIHN0c2MsIHN0c3osIHN0Y28pXG4gIH1cbiAgc3RhdGljIHN0c2QgKGRhdGEpIHtcbiAgICBsZXQgY29udGVudFxuICAgIGlmIChkYXRhLnR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgIC8vIGlmICghZGF0YS5pc0FBQyAmJiBkYXRhLmNvZGVjID09PSAnbXA0Jykge1xuICAgICAgLy8gICAgIGNvbnRlbnQgPSBGTVA0Lm1wMyhkYXRhKTtcbiAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAvL1xuICAgICAgLy8gfVxuICAgICAgLy8g5pSv5oyBbXA0YVxuICAgICAgY29udGVudCA9IEZtcDQubXA0YShkYXRhKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb250ZW50ID0gRm1wNC5hdmMxKGRhdGEpXG4gICAgfVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTYgKyBjb250ZW50LmJ5dGVMZW5ndGgsICdzdHNkJywgRm1wNC5leHRlbnNpb24oMCwgMCksIG5ldyBVaW50OEFycmF5KFsweDAwLCAweDAwLCAweDAwLCAweDAxXSksIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIG1wNGEgKGRhdGEpIHtcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMSwgLy8gZGF0YV9yZWZlcmVuY2VfaW5kZXhcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgZGF0YS5jaGFubmVsQ291bnQsIC8vIGNoYW5uZWxjb3VudFxuICAgICAgMHgwMCwgMHgxMCwgLy8gc2FtcGxlU2l6ZToxNmJpdHNcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkMlxuICAgICAgKGRhdGEuc2FtcGxlcmF0ZSA+PiA4KSAmIDB4ZmYsXG4gICAgICBkYXRhLnNhbXBsZXJhdGUgJiAweGZmLCAvL1xuICAgICAgMHgwMCwgMHgwMFxuICAgIF0pXG4gICAgbGV0IGVzZHMgPSBGbXA0LmVzZHMoZGF0YS5jb25maWcpXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCg4ICsgY29udGVudC5ieXRlTGVuZ3RoICsgZXNkcy5ieXRlTGVuZ3RoLCAnbXA0YScsIGNvbnRlbnQsIGVzZHMpXG4gIH1cbiAgc3RhdGljIGVzZHMgKGNvbmZpZyA9IFs0MywgMTQ2LCA4LCAwXSkge1xuICAgIGNvbnN0IGNvbmZpZ2xlbiA9IGNvbmZpZy5sZW5ndGhcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uIDBcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG5cbiAgICAgIDB4MDMsIC8vIGRlc2NyaXB0b3JfdHlwZVxuICAgICAgMHgxNyArIGNvbmZpZ2xlbiwgLy8gbGVuZ3RoXG4gICAgICAweDAwLCAweDAxLCAvLyBlc19pZFxuICAgICAgMHgwMCwgLy8gc3RyZWFtX3ByaW9yaXR5XG5cbiAgICAgIDB4MDQsIC8vIGRlc2NyaXB0b3JfdHlwZVxuICAgICAgMHgwZiArIGNvbmZpZ2xlbiwgLy8gbGVuZ3RoXG4gICAgICAweDQwLCAvLyBjb2RlYyA6IG1wZWc0X2F1ZGlvXG4gICAgICAweDE1LCAvLyBzdHJlYW1fdHlwZVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gYnVmZmVyX3NpemVcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIG1heEJpdHJhdGVcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGF2Z0JpdHJhdGVcblxuICAgICAgMHgwNSAvLyBkZXNjcmlwdG9yX3R5cGVcbiAgICBdLmNvbmNhdChbY29uZmlnbGVuXSkuY29uY2F0KGNvbmZpZykuY29uY2F0KFsweDA2LCAweDAxLCAweDAyXSkpXG4gICAgYnVmZmVyLndyaXRlKEZtcDQuc2l6ZSg4ICsgY29udGVudC5ieXRlTGVuZ3RoKSwgRm1wNC50eXBlKCdlc2RzJyksIGNvbnRlbnQpXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgYXZjMSAoZGF0YSkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgc2l6ZSA9IDQwLy8gOChhdmMxKSs4KGF2Y2MpKzgoYnRydCkrMTYocGFzcClcbiAgICAvLyBsZXQgc3BzID0gZGF0YS5zcHNcbiAgICAvLyBsZXQgcHBzID0gZGF0YS5wcHNcbiAgICBsZXQgd2lkdGggPSBkYXRhLndpZHRoXG4gICAgbGV0IGhlaWdodCA9IGRhdGEuaGVpZ2h0XG4gICAgbGV0IGhTcGFjaW5nID0gZGF0YS5wYXJSYXRpby5oZWlnaHRcbiAgICBsZXQgdlNwYWNpbmcgPSBkYXRhLnBhclJhdGlvLndpZHRoXG4gICAgLy8gbGV0IGF2Y2NCdWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICAvLyBhdmNjQnVmZmVyLndyaXRlKG5ldyBVaW50OEFycmF5KFtcbiAgICAvLyAgIDB4MDEsIC8vIHZlcnNpb25cbiAgICAvLyAgIHNwc1sxXSwgLy8gcHJvZmlsZVxuICAgIC8vICAgc3BzWzJdLCAvLyBwcm9maWxlIGNvbXBhdGlibGVcbiAgICAvLyAgIHNwc1szXSwgLy8gbGV2ZWxcbiAgICAvLyAgIDB4ZmMgfCAzLFxuICAgIC8vICAgMHhFMCB8IDEgLy8g55uu5YmN5Y+q5aSE55CG5LiA5Liqc3BzXG4gICAgLy8gXS5jb25jYXQoW3Nwcy5sZW5ndGggPj4+IDggJiAweGZmLCBzcHMubGVuZ3RoICYgMHhmZl0pKSlcbiAgICAvLyBhdmNjQnVmZmVyLndyaXRlKHNwcywgbmV3IFVpbnQ4QXJyYXkoWzEsIHBwcy5sZW5ndGggPj4+IDggJiAweGZmLCBwcHMubGVuZ3RoICYgMHhmZl0pLCBwcHMpXG5cbiAgICBsZXQgYXZjYyA9IGRhdGEuYXZjY1xuICAgIGxldCBhdmMxID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAxLCAvLyBkYXRhX3JlZmVyZW5jZV9pbmRleFxuICAgICAgMHgwMCwgMHgwMCwgLy8gcHJlX2RlZmluZWRcbiAgICAgIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHByZV9kZWZpbmVkXG4gICAgICAod2lkdGggPj4gOCkgJiAweGZmLFxuICAgICAgd2lkdGggJiAweGZmLCAvLyB3aWR0aFxuICAgICAgKGhlaWdodCA+PiA4KSAmIDB4ZmYsXG4gICAgICBoZWlnaHQgJiAweGZmLCAvLyBoZWlnaHRcbiAgICAgIDB4MDAsIDB4NDgsIDB4MDAsIDB4MDAsIC8vIGhvcml6cmVzb2x1dGlvblxuICAgICAgMHgwMCwgMHg0OCwgMHgwMCwgMHgwMCwgLy8gdmVydHJlc29sdXRpb25cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAxLCAvLyBmcmFtZV9jb3VudFxuICAgICAgMHgxMixcbiAgICAgIDB4NjQsIDB4NjEsIDB4NjksIDB4NkMsIC8vIGRhaWx5bW90aW9uL2hscy5qc1xuICAgICAgMHg3OSwgMHg2RCwgMHg2RiwgMHg3NCxcbiAgICAgIDB4NjksIDB4NkYsIDB4NkUsIDB4MkYsXG4gICAgICAweDY4LCAweDZDLCAweDczLCAweDJFLFxuICAgICAgMHg2QSwgMHg3MywgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gY29tcHJlc3Nvcm5hbWVcbiAgICAgIDB4MDAsIDB4MTgsIC8vIGRlcHRoID0gMjRcbiAgICAgIDB4MTEsIDB4MTFdKSAvLyBwcmVfZGVmaW5lZCA9IC0xXG4gICAgbGV0IGJ0cnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAweDFjLCAweDljLCAweDgwLCAvLyBidWZmZXJTaXplREJcbiAgICAgIDB4MDAsIDB4MmQsIDB4YzYsIDB4YzAsIC8vIG1heEJpdHJhdGVcbiAgICAgIDB4MDAsIDB4MmQsIDB4YzYsIDB4YzAgLy8gYXZnQml0cmF0ZVxuICAgIF0pXG4gICAgbGV0IHBhc3AgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAoaFNwYWNpbmcgPj4gMjQpLCAvLyBoU3BhY2luZ1xuICAgICAgKGhTcGFjaW5nID4+IDE2KSAmIDB4ZmYsXG4gICAgICAoaFNwYWNpbmcgPj4gOCkgJiAweGZmLFxuICAgICAgaFNwYWNpbmcgJiAweGZmLFxuICAgICAgKHZTcGFjaW5nID4+IDI0KSwgLy8gdlNwYWNpbmdcbiAgICAgICh2U3BhY2luZyA+PiAxNikgJiAweGZmLFxuICAgICAgKHZTcGFjaW5nID4+IDgpICYgMHhmZixcbiAgICAgIHZTcGFjaW5nICYgMHhmZlxuICAgIF0pXG5cbiAgICBidWZmZXIud3JpdGUoXG4gICAgICBGbXA0LnNpemUoc2l6ZSArIGF2YzEuYnl0ZUxlbmd0aCArIGF2Y2MuYnl0ZUxlbmd0aCArIGJ0cnQuYnl0ZUxlbmd0aCksIEZtcDQudHlwZSgnYXZjMScpLCBhdmMxLFxuICAgICAgRm1wNC5zaXplKDggKyBhdmNjLmJ5dGVMZW5ndGgpLCBGbXA0LnR5cGUoJ2F2Y0MnKSwgYXZjYyxcbiAgICAgIEZtcDQuc2l6ZSgyMCksIEZtcDQudHlwZSgnYnRydCcpLCBidHJ0LFxuICAgICAgRm1wNC5zaXplKDE2KSwgRm1wNC50eXBlKCdwYXNwJyksIHBhc3BcbiAgICApXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgc3R0cyAoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCAvLyBlbnRyeV9jb3VudFxuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxNiwgJ3N0dHMnLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyBzdHNjICgpIHtcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIC8vIHZlcnNpb25cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwIC8vIGVudHJ5X2NvdW50XG4gICAgXSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDE2LCAnc3RzYycsIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIHN0Y28gKCkge1xuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgLy8gdmVyc2lvblxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAgLy8gZW50cnlfY291bnRcbiAgICBdKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTYsICdzdGNvJywgY29udGVudClcbiAgfVxuICBzdGF0aWMgc3RzeiAoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gc2FtcGxlX3NpemVcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAgLy8gc2FtcGxlX2NvdW50XG4gICAgXSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDIwLCAnc3RzeicsIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIG12ZXggKGR1cmF0aW9uLCB0aW1lc2NhbGUgPSAxMDAwLCB0cmFja0lEKSB7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGxldCBtZWhkID0gQnVmZmVyLndyaXRlVWludDMyKGR1cmF0aW9uKVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoNTYpLCBGbXA0LnR5cGUoJ212ZXgnKSwgRm1wNC5zaXplKDE2KSwgRm1wNC50eXBlKCdtZWhkJyksIEZtcDQuZXh0ZW5zaW9uKDAsIDApLCBtZWhkLCBGbXA0LnRyZXgodHJhY2tJRCkpXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgdHJleCAoaWQpIHtcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIC8vIHZlcnNpb24gMFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgIChpZCA+PiAyNCksXG4gICAgICAoaWQgPj4gMTYpICYgMHhmZixcbiAgICAgIChpZCA+PiA4KSAmIDB4ZmYsXG4gICAgICAoaWQgJiAweGZmKSwgLy8gdHJhY2tfSURcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDEsIC8vIGRlZmF1bHRfc2FtcGxlX2Rlc2NyaXB0aW9uX2luZGV4XG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBkZWZhdWx0X3NhbXBsZV9kdXJhdGlvblxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZGVmYXVsdF9zYW1wbGVfc2l6ZVxuICAgICAgMHgwMCwgMHgwMSwgMHgwMCwgMHgwMSAvLyBkZWZhdWx0X3NhbXBsZV9mbGFnc1xuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCg4ICsgY29udGVudC5ieXRlTGVuZ3RoLCAndHJleCcsIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIG1vb2YgKGRhdGEpIHtcbiAgICBsZXQgc2l6ZSA9IDhcbiAgICBsZXQgbWZoZCA9IEZtcDQubWZoZCgpXG4gICAgbGV0IHRyYWYgPSBGbXA0LnRyYWYoZGF0YSk7XG4gICAgW21maGQsIHRyYWZdLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aFxuICAgIH0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveChzaXplLCAnbW9vZicsIG1maGQsIHRyYWYpXG4gIH1cbiAgc3RhdGljIG1maGQgKCkge1xuICAgIGxldCBjb250ZW50ID0gQnVmZmVyLndyaXRlVWludDMyKEZtcDQuc2VxdWVuY2UpXG4gICAgRm1wNC5zZXF1ZW5jZSArPSAxXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxNiwgJ21maGQnLCBGbXA0LmV4dGVuc2lvbigwLCAwKSwgY29udGVudClcbiAgfVxuICBzdGF0aWMgdHJhZiAoZGF0YSkge1xuICAgIGxldCBzaXplID0gOFxuICAgIGxldCB0ZmhkID0gRm1wNC50ZmhkKGRhdGEuaWQpXG4gICAgbGV0IHRmZHQgPSBGbXA0LnRmZHQoZGF0YS50aW1lKVxuICAgIGxldCBzZHRwID0gRm1wNC5zZHRwKGRhdGEpXG4gICAgbGV0IHRydW4gPSBGbXA0LnRydW4oZGF0YSwgc2R0cC5ieXRlTGVuZ3RoKTtcblxuICAgIFt0ZmhkLCB0ZmR0LCB0cnVuLCBzZHRwXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGhcbiAgICB9KVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goc2l6ZSwgJ3RyYWYnLCB0ZmhkLCB0ZmR0LCB0cnVuLCBzZHRwKVxuICB9XG4gIHN0YXRpYyB0ZmhkIChpZCkge1xuICAgIGxldCBjb250ZW50ID0gQnVmZmVyLndyaXRlVWludDMyKGlkKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTYsICd0ZmhkJywgRm1wNC5leHRlbnNpb24oMCwgMCksIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIHRmZHQgKHRpbWUpIHtcbiAgICAvLyBsZXQgdXBwZXIgPSBNYXRoLmZsb29yKHRpbWUgLyAoVUlOVDMyX01BWCArIDEpKSxcbiAgICAvLyAgICAgbG93ZXIgPSBNYXRoLmZsb29yKHRpbWUgJSAoVUlOVDMyX01BWCArIDEpKTtcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDE2LCAndGZkdCcsIEZtcDQuZXh0ZW5zaW9uKDAsIDApLCBCdWZmZXIud3JpdGVVaW50MzIodGltZSkpXG4gIH1cbiAgc3RhdGljIHRydW4gKGRhdGEsIHNkdHBMZW5ndGgpIHtcbiAgICAvLyBsZXQgaWQgPSBkYXRhLmlkO1xuICAgIC8vIGxldCBjZWlsID0gaWQgPT09IDEgPyAxNiA6IDEyO1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgc2FtcGxlQ291bnQgPSBCdWZmZXIud3JpdGVVaW50MzIoZGF0YS5zYW1wbGVzLmxlbmd0aClcbiAgICAvLyBtZGF0LWhlYWRlciA4XG4gICAgLy8gbW9vZi1oZWFkZXIgOFxuICAgIC8vIG1maGQgMTZcbiAgICAvLyB0cmFmLWhlYWRlciA4XG4gICAgLy8gdGhoZCAxNlxuICAgIC8vIHRmZHQgMjBcbiAgICAvLyB0cnVuLWhlYWRlciAxMlxuICAgIC8vIHNhbXBsZUNvdW50IDRcbiAgICAvLyBkYXRhLW9mZnNldCA0XG4gICAgLy8gc2FtcGxlcy5sZW5ndGhcbiAgICBsZXQgb2Zmc2V0ID0gQnVmZmVyLndyaXRlVWludDMyKDggKyA4ICsgMTYgKyA4ICsgMTYgKyAxNiArIDEyICsgNCArIDQgKyAxNiAqIGRhdGEuc2FtcGxlcy5sZW5ndGggKyBzZHRwTGVuZ3RoKVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoMjAgKyAxNiAqIGRhdGEuc2FtcGxlcy5sZW5ndGgpLCBGbXA0LnR5cGUoJ3RydW4nKSwgbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4MDAsIDB4MEYsIDB4MDFdKSwgc2FtcGxlQ291bnQsIG9mZnNldClcblxuICAgIC8vIGxldCBzaXplID0gYnVmZmVyLmJ1ZmZlci5ieXRlTGVuZ3RoXG4gICAgLy8gbGV0IHdyaXRlT2Zmc2V0ID0gMFxuICAgIC8vIGRhdGEuc2FtcGxlcy5mb3JFYWNoKCgpID0+IHtcbiAgICAvLyAgIHNpemUgKz0gMTZcbiAgICAvLyB9KVxuICAgIC8vXG4gICAgLy8gbGV0IHRydW5Cb3ggPSBuZXcgVWludDhBcnJheShzaXplKVxuXG4gICAgLy8gdHJ1bkJveC5zZXQoYnVmZmVyLmJ1ZmZlciwgMClcblxuICAgIGRhdGEuc2FtcGxlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCBmbGFncyA9IGl0ZW0uZmxhZ3NcbiAgICAgIC8vIGNvbnNvbGUubG9nKGl0ZW0udHlwZSwgaXRlbS5kdHMsIGl0ZW0uZHVyYXRpb24pXG5cbiAgICAgIGJ1ZmZlci53cml0ZShuZXcgVWludDhBcnJheShbXG4gICAgICAgIChpdGVtLmR1cmF0aW9uID4+PiAyNCkgJiAweEZGLCAvLyBzYW1wbGVfZHVyYXRpb25cbiAgICAgICAgKGl0ZW0uZHVyYXRpb24gPj4+IDE2KSAmIDB4RkYsXG4gICAgICAgIChpdGVtLmR1cmF0aW9uID4+PiA4KSAmIDB4RkYsXG4gICAgICAgIChpdGVtLmR1cmF0aW9uKSAmIDB4RkYsXG4gICAgICAgIChpdGVtLnNpemUgPj4+IDI0KSAmIDB4RkYsIC8vIHNhbXBsZV9zaXplXG4gICAgICAgIChpdGVtLnNpemUgPj4+IDE2KSAmIDB4RkYsXG4gICAgICAgIChpdGVtLnNpemUgPj4+IDgpICYgMHhGRixcbiAgICAgICAgKGl0ZW0uc2l6ZSkgJiAweEZGLFxuICAgICAgICAoZmxhZ3MuaXNMZWFkaW5nIDw8IDIpIHwgZmxhZ3MuZGVwZW5kc09uLCAvLyBzYW1wbGVfZmxhZ3NcbiAgICAgICAgKGZsYWdzLmlzRGVwZW5kZWRPbiA8PCA2KSB8IChmbGFncy5oYXNSZWR1bmRhbmN5IDw8IDQpIHwgZmxhZ3MuaXNOb25TeW5jLFxuICAgICAgICAweDAwLCAweDAwLCAvLyBzYW1wbGVfZGVncmFkYXRpb25fcHJpb3JpdHlcbiAgICAgICAgKGl0ZW0uY3RzID4+PiAyNCkgJiAweEZGLCAvLyBzYW1wbGVfY29tcG9zaXRpb25fdGltZV9vZmZzZXRcbiAgICAgICAgKGl0ZW0uY3RzID4+PiAxNikgJiAweEZGLFxuICAgICAgICAoaXRlbS5jdHMgPj4+IDgpICYgMHhGRixcbiAgICAgICAgKGl0ZW0uY3RzKSAmIDB4RkZcbiAgICAgIF0pKVxuICAgICAgLy8gd3JpdGVPZmZzZXQgKz0gMTZcbiAgICAgIC8vIGJ1ZmZlci53cml0ZShCdWZmZXIud3JpdGVVaW50MzIoMCkpO1xuICAgIH0pXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgc2R0cCAoZGF0YSkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKDEyICsgZGF0YS5zYW1wbGVzLmxlbmd0aCksIEZtcDQudHlwZSgnc2R0cCcpLCBGbXA0LmV4dGVuc2lvbigwLCAwKSlcbiAgICBkYXRhLnNhbXBsZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGNvbnN0IGZsYWdzID0gaXRlbS5mbGFnc1xuICAgICAgY29uc3QgbnVtID0gKGZsYWdzLmlzTGVhZGluZyA8PCA2KSB8IC8vIGlzX2xlYWRpbmc6IDIgKGJpdClcbiAgICAgICAgKGZsYWdzLmRlcGVuZHNPbiA8PCA0KSB8IC8vIHNhbXBsZV9kZXBlbmRzX29uXG4gICAgICAgIChmbGFncy5pc0RlcGVuZGVkT24gPDwgMikgfCAvLyBzYW1wbGVfaXNfZGVwZW5kZWRfb25cbiAgICAgICAgKGZsYWdzLmhhc1JlZHVuZGFuY3kpLy8gc2FtcGxlX2hhc19yZWR1bmRhbmN5XG5cbiAgICAgIGJ1ZmZlci53cml0ZShuZXcgVWludDhBcnJheShbbnVtXSkpXG4gICAgfSlcbiAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlclxuICB9XG4gIHN0YXRpYyBtZGF0IChkYXRhKSB7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGxldCBzaXplID0gOFxuICAgIGRhdGEuc2FtcGxlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLnNpemVcbiAgICB9KVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoc2l6ZSksIEZtcDQudHlwZSgnbWRhdCcpKVxuICAgIGxldCBtZGF0Qm94ID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSlcbiAgICBsZXQgb2Zmc2V0ID0gMFxuICAgIG1kYXRCb3guc2V0KGJ1ZmZlci5idWZmZXIsIG9mZnNldClcbiAgICBvZmZzZXQgKz0gOFxuICAgIGRhdGEuc2FtcGxlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaXRlbS5idWZmZXIuZm9yRWFjaCgodW5pdCkgPT4ge1xuICAgICAgICBtZGF0Qm94LnNldCh1bml0LCBvZmZzZXQpXG4gICAgICAgIG9mZnNldCArPSB1bml0LmJ5dGVMZW5ndGhcbiAgICAgICAgLy8gYnVmZmVyLndyaXRlKHVuaXQuZGF0YSk7XG4gICAgICB9KVxuICAgIH0pXG4gICAgcmV0dXJuIG1kYXRCb3hcbiAgfVxufVxuRm1wNC50eXBlID0gKG5hbWUpID0+IHtcbiAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFtuYW1lLmNoYXJDb2RlQXQoMCksIG5hbWUuY2hhckNvZGVBdCgxKSwgbmFtZS5jaGFyQ29kZUF0KDIpLCBuYW1lLmNoYXJDb2RlQXQoMyldKVxufVxuRm1wNC5zZXF1ZW5jZSA9IDFcblxuZXhwb3J0IGRlZmF1bHQgRm1wNFxuIiwiaW1wb3J0IHtcbiAgRVZFTlRTLFxuICBzbmlmZmVyLFxuICBNZWRpYVNlZ21lbnRMaXN0LFxuICBCdWZmZXJcbn0gZnJvbSAneGdwbGF5ZXItdXRpbHMnO1xuaW1wb3J0IEZtcDQgZnJvbSAnLi9mbXA0J1xuXG5jb25zdCBSRU1VWF9FVkVOVFMgPSBFVkVOVFMuUkVNVVhfRVZFTlRTXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1wNFJlbXV4ZXIge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5fZHRzQmFzZSA9IDBcbiAgICB0aGlzLl9pc0R0c0Jhc2VJbml0ZWQgPSBmYWxzZVxuXG4gICAgdGhpcy5pc0ZpcnN0VmlkZW8gPSB0cnVlXG4gICAgdGhpcy5pc0ZpcnN0QXVkaW8gPSB0cnVlXG5cbiAgICB0aGlzLnZpZGVvQWxsRHVyYXRpb24gPSAwXG4gICAgdGhpcy5hdWRpb0FsbER1cmF0aW9uID0gMFxuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgdGhpcy5vbihSRU1VWF9FVkVOVFMuUkVNVVhfTUVESUEsIHRoaXMucmVtdXguYmluZCh0aGlzKSlcbiAgICB0aGlzLm9uKFJFTVVYX0VWRU5UUy5SRU1VWF9NRVRBREFUQSwgdGhpcy5vbk1ldGFEYXRhUmVhZHkuYmluZCh0aGlzKSlcbiAgICB0aGlzLm9uKFJFTVVYX0VWRU5UUy5ERVRFQ1RfQ0hBTkdFX1NUUkVBTSwgdGhpcy5yZXNldER0c0Jhc2UuYmluZCh0aGlzKSlcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuX2R0c0Jhc2UgPSAtMVxuICAgIHRoaXMuX2R0c0Jhc2VJbml0ZWQgPSBmYWxzZVxuICB9XG5cbiAgcmVzZXQgKCkge1xuICAgIHRoaXMuX2R0c0Jhc2UgPSAwXG4gICAgdGhpcy5faXNEdHNCYXNlSW5pdGVkID0gZmFsc2VcbiAgfVxuXG4gIHJlbXV4ICgpIHtcbiAgICBjb25zdCB7IGF1ZGlvVHJhY2ssIHZpZGVvVHJhY2sgfSA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpXG4gICAgIXRoaXMuX2lzRHRzQmFzZUluaXRlZCAmJiB0aGlzLmNhbGNEdHNCYXNlKGF1ZGlvVHJhY2ssIHZpZGVvVHJhY2spXG5cbiAgICB0aGlzLl9yZW11eFZpZGVvKHZpZGVvVHJhY2spXG4gICAgdGhpcy5fcmVtdXhBdWRpbyhhdWRpb1RyYWNrKVxuICB9XG5cbiAgcmVzZXREdHNCYXNlICgpIHtcbiAgICAvLyBmb3IgaGxzIOS4remAlOWIh+aNoiBtZXRh5ZCOc2Vla1xuICAgIHRoaXMuX2R0c0Jhc2UgPSAwXG4gICAgdGhpcy5fZHRzQmFzZUluaXRlZCA9IGZhbHNlXG4gIH1cblxuICBzZWVrICgpIHtcblxuICB9XG5cbiAgb25NZXRhRGF0YVJlYWR5ICh0eXBlKSB7XG4gICAgbGV0IHRyYWNrXG5cbiAgICBpZiAodHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgY29uc3QgeyBhdWRpb1RyYWNrIH0gPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKVxuICAgICAgdHJhY2sgPSBhdWRpb1RyYWNrO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB7IHZpZGVvVHJhY2sgfSA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpXG4gICAgICB0cmFjayA9IHZpZGVvVHJhY2s7XG4gICAgfVxuXG4gICAgbGV0IHByZXNvdXJjZWJ1ZmZlciA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1BSRV9TT1VSQ0VfQlVGRkVSJyk7XG4gICAgbGV0IHNvdXJjZSA9IHByZXNvdXJjZWJ1ZmZlci5nZXRTb3VyY2UodHlwZSk7XG4gICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgIHNvdXJjZSA9IHByZXNvdXJjZWJ1ZmZlci5jcmVhdGVTb3VyY2UodHlwZSk7XG4gICAgfVxuXG4gICAgc291cmNlLm1pbWV0eXBlID0gdHJhY2subWV0YS5jb2RlYztcbiAgICBzb3VyY2UuaW5pdCA9IHRoaXMucmVtdXhJbml0U2VnbWVudCh0eXBlLCB0cmFjay5tZXRhKTtcbiAgICAvLyBzb3VyY2UuaW5pdGVkID0gZmFsc2U7XG5cbiAgICAvLyB0aGlzLnJlc2V0RHRzQmFzZSgpXG4gICAgdGhpcy5lbWl0KFJFTVVYX0VWRU5UUy5JTklUX1NFR01FTlQsIHR5cGUpXG4gIH1cblxuICByZW11eEluaXRTZWdtZW50ICh0eXBlLCBtZXRhKSB7XG4gICAgbGV0IGluaXRTZWdtZW50ID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IGZ0eXAgPSBGbXA0LmZ0eXAoKVxuICAgIGxldCBtb292ID0gRm1wNC5tb292KHsgdHlwZSwgbWV0YTogbWV0YSB9KVxuXG4gICAgaW5pdFNlZ21lbnQud3JpdGUoZnR5cCwgbW9vdilcbiAgICByZXR1cm4gaW5pdFNlZ21lbnQ7XG4gIH1cblxuICBjYWxjRHRzQmFzZSAoYXVkaW9UcmFjaywgdmlkZW9UcmFjaykge1xuICAgIGlmICghYXVkaW9UcmFjay5zYW1wbGVzLmxlbmd0aCAmJiAhdmlkZW9UcmFjay5zYW1wbGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBhdWRpb0Jhc2UgPSBJbmZpbml0eVxuICAgIGxldCB2aWRlb0Jhc2UgPSBJbmZpbml0eVxuXG4gICAgaWYgKGF1ZGlvVHJhY2suc2FtcGxlcyAmJiBhdWRpb1RyYWNrLnNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICBhdWRpb0Jhc2UgPSBhdWRpb1RyYWNrLnNhbXBsZXNbMF0uZHRzXG4gICAgfVxuICAgIGlmICh2aWRlb1RyYWNrLnNhbXBsZXMgJiYgdmlkZW9UcmFjay5zYW1wbGVzLmxlbmd0aCkge1xuICAgICAgdmlkZW9CYXNlID0gdmlkZW9UcmFjay5zYW1wbGVzWzBdLmR0c1xuICAgIH1cblxuICAgIHRoaXMuX2R0c0Jhc2UgPSBNYXRoLm1pbihhdWRpb0Jhc2UsIHZpZGVvQmFzZSlcbiAgICB0aGlzLl9pc0R0c0Jhc2VJbml0ZWQgPSB0cnVlXG4gIH1cblxuICBfcmVtdXhWaWRlbyAodmlkZW9UcmFjaykge1xuICAgIGNvbnN0IHRyYWNrID0gdmlkZW9UcmFja1xuXG4gICAgaWYgKCF2aWRlb1RyYWNrLnNhbXBsZXMgfHwgIXZpZGVvVHJhY2suc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCB7c2FtcGxlc30gPSB0cmFja1xuICAgIGxldCBmaXJzdER0cyA9IC0xXG5cbiAgICBsZXQgaW5pdFNlZ21lbnQgPSBudWxsXG4gICAgY29uc3QgbXA0U2FtcGxlcyA9IFtdXG4gICAgY29uc3QgbWRhdEJveCA9IHtcbiAgICAgIHNhbXBsZXM6IFtdXG4gICAgfVxuXG4gICAgd2hpbGUgKHNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBhdmNTYW1wbGUgPSBzYW1wbGVzLnNoaWZ0KClcblxuICAgICAgY29uc3QgeyBpc0tleWZyYW1lLCBvcHRpb25zIH0gPSBhdmNTYW1wbGVcbiAgICAgIGlmICghdGhpcy5pc0ZpcnN0QXVkaW8gJiYgb3B0aW9ucyAmJiBvcHRpb25zLm1ldGEpIHtcbiAgICAgICAgaW5pdFNlZ21lbnQgPSB0aGlzLnJlbXV4SW5pdFNlZ21lbnQoJ3ZpZGVvJywgb3B0aW9ucy5tZXRhKVxuICAgICAgICBvcHRpb25zLm1ldGEgPSBudWxsXG4gICAgICAgIHNhbXBsZXMudW5zaGlmdChhdmNTYW1wbGUpXG4gICAgICAgIGlmICghb3B0aW9ucy5pc0NvbnRpbnVlKSB7XG4gICAgICAgICAgdGhpcy5yZXNldER0c0Jhc2UoKVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBsZXQgZHRzID0gYXZjU2FtcGxlLmR0cyAtIHRoaXMuX2R0c0Jhc2VcblxuICAgICAgaWYgKGZpcnN0RHRzID09PSAtMSkge1xuICAgICAgICBmaXJzdER0cyA9IGR0c1xuICAgICAgfVxuXG4gICAgICBsZXQgY3RzXG4gICAgICBsZXQgcHRzXG4gICAgICBpZiAoYXZjU2FtcGxlLnB0cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHB0cyA9IGF2Y1NhbXBsZS5wdHMgLSB0aGlzLl9kdHNCYXNlXG4gICAgICAgIGN0cyA9IHB0cyAtIGR0c1xuICAgICAgfVxuICAgICAgaWYgKGF2Y1NhbXBsZS5jdHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwdHMgPSBhdmNTYW1wbGUuY3RzICsgZHRzXG4gICAgICAgIGN0cyA9IGF2Y1NhbXBsZS5jdHNcbiAgICAgIH1cblxuICAgICAgbGV0IG1kYXRTYW1wbGUgPSB7XG4gICAgICAgIGJ1ZmZlcjogW10sXG4gICAgICAgIHNpemU6IDBcbiAgICAgIH1cbiAgICAgIG1kYXRCb3guc2FtcGxlcy5wdXNoKG1kYXRTYW1wbGUpXG4gICAgICBtZGF0U2FtcGxlLmJ1ZmZlci5wdXNoKGF2Y1NhbXBsZS5kYXRhKVxuICAgICAgbWRhdFNhbXBsZS5zaXplICs9IGF2Y1NhbXBsZS5kYXRhLmJ5dGVMZW5ndGhcblxuICAgICAgbGV0IHNhbXBsZUR1cmF0aW9uID0gMFxuICAgICAgaWYgKHNhbXBsZXMubGVuZ3RoID49IDEpIHtcbiAgICAgICAgY29uc3QgbmV4dER0cyA9IHNhbXBsZXNbMF0uZHRzIC0gdGhpcy5fZHRzQmFzZVxuICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IG5leHREdHMgLSBkdHNcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChtcDRTYW1wbGVzLmxlbmd0aCA+PSAxKSB7IC8vIGxhc3Rlc3Qgc2FtcGxlLCB1c2Ugc2Vjb25kIGxhc3QgZHVyYXRpb25cbiAgICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IG1wNFNhbXBsZXNbbXA0U2FtcGxlcy5sZW5ndGggLSAxXS5kdXJhdGlvblxuICAgICAgICB9IGVsc2UgeyAvLyB0aGUgb25seSBvbmUgc2FtcGxlLCB1c2UgcmVmZXJlbmNlIGR1cmF0aW9uXG4gICAgICAgICAgc2FtcGxlRHVyYXRpb24gPSB0aGlzLnZpZGVvTWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnZpZGVvQWxsRHVyYXRpb24gKz0gc2FtcGxlRHVyYXRpb25cbiAgICAgIC8vIGNvbnNvbGUubG9nKGBkdHMgJHtkdHN9YCwgYHB0cyAke3B0c31gLCBgY3RzOiAke2N0c31gLCBgZHVyYXRpb246ICR7c2FtcGxlRHVyYXRpb259YCwgYXZjU2FtcGxlKVxuICAgICAgbXA0U2FtcGxlcy5wdXNoKHtcbiAgICAgICAgZHRzLFxuICAgICAgICBjdHMsXG4gICAgICAgIHB0cyxcbiAgICAgICAgZGF0YTogYXZjU2FtcGxlLmRhdGEsXG4gICAgICAgIHNpemU6IGF2Y1NhbXBsZS5kYXRhLmJ5dGVMZW5ndGgsXG4gICAgICAgIGlzS2V5ZnJhbWUsXG4gICAgICAgIGR1cmF0aW9uOiBzYW1wbGVEdXJhdGlvbixcbiAgICAgICAgZmxhZ3M6IHtcbiAgICAgICAgICBpc0xlYWRpbmc6IDAsXG4gICAgICAgICAgZGVwZW5kc09uOiBpc0tleWZyYW1lID8gMiA6IDEsXG4gICAgICAgICAgaXNEZXBlbmRlZE9uOiBpc0tleWZyYW1lID8gMSA6IDAsXG4gICAgICAgICAgaGFzUmVkdW5kYW5jeTogMCxcbiAgICAgICAgICBpc05vblN5bmM6IGlzS2V5ZnJhbWUgPyAwIDogMVxuICAgICAgICB9LFxuICAgICAgICBvcmlnaW5EdHM6IGR0cyxcbiAgICAgICAgdHlwZTogJ3ZpZGVvJ1xuICAgICAgfSlcbiAgICB9XG5cbiAgICBsZXQgbW9vZk1kYXQgPSBuZXcgQnVmZmVyKClcbiAgICBpZiAobXA0U2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IG1vb2YgPSBGbXA0Lm1vb2Yoe1xuICAgICAgICBpZDogdHJhY2subWV0YS5pZCxcbiAgICAgICAgdGltZTogZmlyc3REdHMsXG4gICAgICAgIHNhbXBsZXM6IG1wNFNhbXBsZXNcbiAgICAgIH0pXG4gICAgICBjb25zdCBtZGF0ID0gRm1wNC5tZGF0KG1kYXRCb3gpXG4gICAgICBtb29mTWRhdC53cml0ZShtb29mLCBtZGF0KVxuXG4gICAgICB0aGlzLndyaXRlVG9Tb3VyY2UoJ3ZpZGVvJywgbW9vZk1kYXQpXG4gICAgfVxuXG4gICAgaWYgKGluaXRTZWdtZW50KSB7XG4gICAgICB0aGlzLndyaXRlVG9Tb3VyY2UoJ3ZpZGVvJywgaW5pdFNlZ21lbnQpXG5cbiAgICAgIGlmIChzYW1wbGVzLmxlbmd0aCkge1xuICAgICAgICAvLyBzZWNvbmQgcGFydCBvZiBzdHJlYW0gY2hhbmdlXG4gICAgICAgIHRyYWNrLnNhbXBsZXMgPSBzYW1wbGVzO1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVtdXhWaWRlbyh0cmFjaylcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmlzRmlyc3RWaWRlbyA9IGZhbHNlXG4gICAgdGhpcy5lbWl0KFJFTVVYX0VWRU5UUy5NRURJQV9TRUdNRU5ULCAndmlkZW8nKVxuXG4gICAgY29uc3QgbGFzdFNhbXBsZSA9IG1wNFNhbXBsZXNbbXA0U2FtcGxlcy5sZW5ndGggLSAxXVxuICAgIHRoaXMuX3ZpZGVvTmV4dER0cyA9IGxhc3RTYW1wbGUuZHRzICsgbGFzdFNhbXBsZS5kdXJhdGlvbjtcbiAgICB0cmFjay5zYW1wbGVzID0gW11cbiAgICB0cmFjay5sZW5ndGggPSAwXG4gIH1cblxuICBfcmVtdXhBdWRpbyAodHJhY2spIHtcbiAgICBjb25zdCB7c2FtcGxlc30gPSB0cmFja1xuICAgIGxldCBmaXJzdER0cyA9IC0xXG4gICAgbGV0IG1wNFNhbXBsZXMgPSBbXVxuXG4gICAgbGV0IGluaXRTZWdtZW50ID0gbnVsbFxuICAgIGNvbnN0IG1kYXRCb3ggPSB7XG4gICAgICBzYW1wbGVzOiBbXVxuICAgIH1cbiAgICBpZiAoIXNhbXBsZXMgfHwgIXNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgbGV0IGlzRmlyc3REdHNJbml0ZWQgPSBmYWxzZVxuICAgIHdoaWxlIChzYW1wbGVzLmxlbmd0aCkge1xuICAgICAgbGV0IHNhbXBsZSA9IHNhbXBsZXMuc2hpZnQoKVxuICAgICAgY29uc3QgeyBkYXRhLCBvcHRpb25zIH0gPSBzYW1wbGVcbiAgICAgIGlmICghdGhpcy5pc0ZpcnN0QXVkaW8gJiYgb3B0aW9ucyAmJiBvcHRpb25zLm1ldGEpIHtcbiAgICAgICAgaW5pdFNlZ21lbnQgPSB0aGlzLnJlbXV4SW5pdFNlZ21lbnQoJ2F1ZGlvJywgb3B0aW9ucy5tZXRhKVxuICAgICAgICBvcHRpb25zLm1ldGEgPSBudWxsO1xuICAgICAgICBzYW1wbGVzLnVuc2hpZnQoc2FtcGxlKVxuICAgICAgICBpZiAoIW9wdGlvbnMuaXNDb250aW51ZSkge1xuICAgICAgICAgIHRoaXMucmVzZXREdHNCYXNlKClcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgbGV0IGR0cyA9IHNhbXBsZS5kdHMgLSB0aGlzLl9kdHNCYXNlXG4gICAgICBjb25zdCBvcmlnaW5EdHMgPSBkdHNcbiAgICAgIGlmICghaXNGaXJzdER0c0luaXRlZCkge1xuICAgICAgICBmaXJzdER0cyA9IGR0c1xuICAgICAgICBpc0ZpcnN0RHRzSW5pdGVkID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBsZXQgc2FtcGxlRHVyYXRpb24gPSAwXG5cbiAgICAgIGlmICh0aGlzLmF1ZGlvTWV0YS5yZWZTYW1wbGVEdXJhdGlvbkZpeGVkKSB7XG4gICAgICAgIHNhbXBsZUR1cmF0aW9uID0gdGhpcy5hdWRpb01ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZFxuICAgICAgfSBlbHNlIGlmIChzYW1wbGVzLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgIGNvbnN0IG5leHREdHMgPSBzYW1wbGVzWzBdLmR0cyAtIHRoaXMuX2R0c0Jhc2U7XG4gICAgICAgIHNhbXBsZUR1cmF0aW9uID0gbmV4dER0cyAtIGR0c1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG1wNFNhbXBsZXMubGVuZ3RoID49IDEpIHsgLy8gdXNlIHNlY29uZCBsYXN0IHNhbXBsZSBkdXJhdGlvblxuICAgICAgICAgIHNhbXBsZUR1cmF0aW9uID0gbXA0U2FtcGxlc1ttcDRTYW1wbGVzLmxlbmd0aCAtIDFdLmR1cmF0aW9uXG4gICAgICAgIH0gZWxzZSB7IC8vIHRoZSBvbmx5IG9uZSBzYW1wbGUsIHVzZSByZWZlcmVuY2Ugc2FtcGxlIGR1cmF0aW9uXG4gICAgICAgICAgc2FtcGxlRHVyYXRpb24gPSB0aGlzLmF1ZGlvTWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKCdyZW11eCBhdWRpbyAnLCBkdHMpXG4gICAgICB0aGlzLmF1ZGlvQWxsRHVyYXRpb24gKz0gc2FtcGxlRHVyYXRpb25cbiAgICAgIGNvbnN0IG1wNFNhbXBsZSA9IHtcbiAgICAgICAgZHRzLFxuICAgICAgICBwdHM6IGR0cyxcbiAgICAgICAgY3RzOiAwLFxuICAgICAgICBzaXplOiBkYXRhLmJ5dGVMZW5ndGgsXG4gICAgICAgIGR1cmF0aW9uOiBzYW1wbGUuZHVyYXRpb24gPyBzYW1wbGUuZHVyYXRpb24gOiBzYW1wbGVEdXJhdGlvbixcbiAgICAgICAgZmxhZ3M6IHtcbiAgICAgICAgICBpc0xlYWRpbmc6IDAsXG4gICAgICAgICAgZGVwZW5kc09uOiAyLFxuICAgICAgICAgIGlzRGVwZW5kZWRPbjogMSxcbiAgICAgICAgICBoYXNSZWR1bmRhbmN5OiAwLFxuICAgICAgICAgIGlzTm9uU3luYzogMFxuICAgICAgICB9LFxuICAgICAgICBpc0tleWZyYW1lOiB0cnVlLFxuICAgICAgICBvcmlnaW5EdHMsXG4gICAgICAgIHR5cGU6ICdhdWRpbydcbiAgICAgIH1cblxuICAgICAgbGV0IG1kYXRTYW1wbGUgPSB7XG4gICAgICAgIGJ1ZmZlcjogW10sXG4gICAgICAgIHNpemU6IDBcbiAgICAgIH1cbiAgICAgIG1kYXRTYW1wbGUuYnVmZmVyLnB1c2goZGF0YSlcbiAgICAgIG1kYXRTYW1wbGUuc2l6ZSArPSBkYXRhLmJ5dGVMZW5ndGhcblxuICAgICAgbWRhdEJveC5zYW1wbGVzLnB1c2gobWRhdFNhbXBsZSlcblxuICAgICAgbXA0U2FtcGxlcy5wdXNoKG1wNFNhbXBsZSlcbiAgICB9XG5cbiAgICBjb25zdCBtb29mTWRhdCA9IG5ldyBCdWZmZXIoKVxuXG4gICAgaWYgKG1wNFNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBtb29mID0gRm1wNC5tb29mKHtcbiAgICAgICAgaWQ6IHRyYWNrLm1ldGEuaWQsXG4gICAgICAgIHRpbWU6IGZpcnN0RHRzLFxuICAgICAgICBzYW1wbGVzOiBtcDRTYW1wbGVzXG4gICAgICB9KVxuICAgICAgY29uc3QgbWRhdCA9IEZtcDQubWRhdChtZGF0Qm94KVxuICAgICAgbW9vZk1kYXQud3JpdGUobW9vZiwgbWRhdClcblxuICAgICAgdGhpcy53cml0ZVRvU291cmNlKCdhdWRpbycsIG1vb2ZNZGF0KVxuICAgIH1cblxuICAgIGlmIChpbml0U2VnbWVudCkge1xuICAgICAgdGhpcy53cml0ZVRvU291cmNlKCdhdWRpbycsIGluaXRTZWdtZW50KVxuICAgICAgaWYgKHNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICAgIC8vIHNlY29uZCBwYXJ0IG9mIHN0cmVhbSBjaGFuZ2VcbiAgICAgICAgdHJhY2suc2FtcGxlcyA9IHNhbXBsZXM7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZW11eEF1ZGlvKHRyYWNrKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaXNGaXJzdEF1ZGlvID0gZmFsc2VcbiAgICB0aGlzLmVtaXQoUkVNVVhfRVZFTlRTLk1FRElBX1NFR01FTlQsICdhdWRpbycsIG1vb2ZNZGF0KVxuXG4gICAgY29uc3QgbGFzdFNhbXBsZSA9IG1wNFNhbXBsZXNbbXA0U2FtcGxlcy5sZW5ndGggLSAxXVxuICAgIHRoaXMuX3ZpZGVvTmV4dER0cyA9IGxhc3RTYW1wbGUuZHRzICsgbGFzdFNhbXBsZS5kdXJhdGlvbjtcbiAgICB0cmFjay5zYW1wbGVzID0gW11cbiAgICB0cmFjay5sZW5ndGggPSAwXG4gIH1cblxuICB3cml0ZVRvU291cmNlICh0eXBlLCBidWZmZXIpIHtcbiAgICBsZXQgcHJlc291cmNlYnVmZmVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnUFJFX1NPVVJDRV9CVUZGRVInKTtcbiAgICBsZXQgc291cmNlID0gcHJlc291cmNlYnVmZmVyLmdldFNvdXJjZSh0eXBlKTtcbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgc291cmNlID0gcHJlc291cmNlYnVmZmVyLmNyZWF0ZVNvdXJjZSh0eXBlKTtcbiAgICB9XG5cbiAgICBzb3VyY2UuZGF0YS5wdXNoKGJ1ZmZlcilcbiAgfVxuXG4gIGluaXRTaWxlbnRBdWRpbyAoZHRzLCBkdXJhdGlvbikge1xuICAgIGNvbnN0IHVuaXQgPSBNcDRSZW11eGVyLmdldFNpbGVudEZyYW1lKHRoaXMuYXVkaW9NZXRhLmNoYW5uZWxDb3VudClcbiAgICByZXR1cm4ge1xuICAgICAgZHRzLFxuICAgICAgcHRzOiBkdHMsXG4gICAgICBjdHM6IDAsXG4gICAgICBkdXJhdGlvbixcbiAgICAgIHVuaXQsXG4gICAgICBzaXplOiB1bml0LmJ5dGVMZW5ndGgsXG4gICAgICBvcmlnaW5EdHM6IGR0cyxcbiAgICAgIHR5cGU6ICd2aWRlbydcbiAgICB9XG4gIH1cblxuICBnZXQgdmlkZW9NZXRhICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJykudmlkZW9UcmFjay5tZXRhXG4gIH1cbiAgZ2V0IGF1ZGlvTWV0YSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpLmF1ZGlvVHJhY2subWV0YVxuICB9XG5cbiAgc3RhdGljIGdldFNpbGVudEZyYW1lIChjaGFubmVsQ291bnQpIHtcbiAgICBpZiAoY2hhbm5lbENvdW50ID09PSAxKSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjMsIDB4ODBdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSAyKSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MjEsIDB4MDAsIDB4NDksIDB4OTAsIDB4MDIsIDB4MTksIDB4MDAsIDB4MjMsIDB4ODBdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSAzKSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4OGVdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSA0KSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4ODAsIDB4MmMsIDB4ODAsIDB4MDgsIDB4MDIsIDB4MzhdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSA1KSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4ODIsIDB4MzAsIDB4MDQsIDB4OTksIDB4MDAsIDB4MjEsIDB4OTAsIDB4MDIsIDB4MzhdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSA2KSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4ODIsIDB4MzAsIDB4MDQsIDB4OTksIDB4MDAsIDB4MjEsIDB4OTAsIDB4MDIsIDB4MDAsIDB4YjIsIDB4MDAsIDB4MjAsIDB4MDgsIDB4ZTBdKVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgQ29udGV4dDogcmVxdWlyZSgnLi9zcmMvY29udGV4dCcpLmRlZmF1bHQsXG5cbiAgLy8gTW9kdWxlcyBmcm9tIGNvbnN0YW50c1xuICBFVkVOVFM6IHJlcXVpcmUoJy4vc3JjL2NvbnN0YW50cy9ldmVudHMnKS5kZWZhdWx0LFxuICBXT1JLRVJfQ09NTUFORFM6IHJlcXVpcmUoJy4vc3JjL2NvbnN0YW50cy93b3JrZXItY29tbWFuZHMnKS5kZWZhdWx0LFxuXG4gIC8vIE1vZHVsZXMgZnJvbSBlbnZcbiAgc25pZmZlcjogcmVxdWlyZSgnLi9zcmMvZW52L3NuaWZmZXInKS5kZWZhdWx0LFxuICBpc0xlOiByZXF1aXJlKCcuL3NyYy9lbnYvaXNsZScpLmRlZmF1bHQsXG4gIFVURjg6IHJlcXVpcmUoJy4vc3JjL2Vudi91dGY4JykuZGVmYXVsdCxcblxuICAvLyBNb2RlbHNcbiAgTWVkaWFJbmZvOiByZXF1aXJlKCcuL3NyYy9tb2RlbHMvbWVkaWEtaW5mbycpLmRlZmF1bHQsXG4gIE1lZGlhU2FtcGxlOiByZXF1aXJlKCcuL3NyYy9tb2RlbHMvbWVkaWEtc2FtcGxlJykuZGVmYXVsdCxcbiAgTWVkaWFTZWdtZW50OiByZXF1aXJlKCcuL3NyYy9tb2RlbHMvbWVkaWEtc2VnbWVudCcpLmRlZmF1bHQsXG4gIE1lZGlhU2VnbWVudExpc3Q6IHJlcXVpcmUoJy4vc3JjL21vZGVscy9tZWRpYS1zZWdtZW50LWxpc3QnKS5kZWZhdWx0LFxuICBBdWRpb1RyYWNrTWV0YTogcmVxdWlyZSgnLi9zcmMvbW9kZWxzL3RyYWNrLW1ldGEnKS5BdWRpb1RyYWNrTWV0YSxcbiAgVmlkZW9UcmFja01ldGE6IHJlcXVpcmUoJy4vc3JjL21vZGVscy90cmFjay1tZXRhJykuVmlkZW9UcmFja01ldGEsXG4gIEF1ZGlvVHJhY2tTYW1wbGU6IHJlcXVpcmUoJy4vc3JjL21vZGVscy90cmFjay1zYW1wbGUnKS5BdWRpb1RyYWNrU2FtcGxlLFxuICBWaWRlb1RyYWNrU2FtcGxlOiByZXF1aXJlKCcuL3NyYy9tb2RlbHMvdHJhY2stc2FtcGxlJykuVmlkZW9UcmFja1NhbXBsZSxcblxuICAvLyBNb2R1bGVzIGZyb20gbXNlXG4gIE1zZTogcmVxdWlyZSgnLi9zcmMvbXNlL2luZGV4JykuZGVmYXVsdCxcblxuICAvLyBNb2R1bGVzIGZyb20gd3JpdGVcbiAgU3RyZWFtOiByZXF1aXJlKCcuL3NyYy93cml0ZS9zdHJlYW0nKS5kZWZhdWx0LFxuICBCdWZmZXI6IHJlcXVpcmUoJy4vc3JjL3dyaXRlL2J1ZmZlcicpLmRlZmF1bHQsXG5cbiAgTW9iaWxlVmlkZW86IHJlcXVpcmUoJy4vc3JjL21vYmlsZS9tb2JpbGUtdmlkZW8nKSxcbiAgLy8gQ3J5cHRvXG4gIENyeXB0bzogcmVxdWlyZSgnLi9zcmMvY3J5cHRvJykuZGVmYXVsdFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoUmVzdWx0Q29uc3RydWN0b3IpIHtcbiAgdmFyIHRvdGFsTGVuZ3RoID0gMDtcblxuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJyYXlzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFycmF5c1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBhcnJheXNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICB2YXIgYXJyID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgIHRvdGFsTGVuZ3RoICs9IGFyci5sZW5ndGg7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3IucmV0dXJuKSB7XG4gICAgICAgIF9pdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciByZXN1bHQgPSBuZXcgUmVzdWx0Q29uc3RydWN0b3IodG90YWxMZW5ndGgpO1xuICB2YXIgb2Zmc2V0ID0gMDtcbiAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICB2YXIgX2l0ZXJhdG9yRXJyb3IyID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IGFycmF5c1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge1xuICAgICAgdmFyIF9hcnIgPSBfc3RlcDIudmFsdWU7XG5cbiAgICAgIHJlc3VsdC5zZXQoX2Fyciwgb2Zmc2V0KTtcbiAgICAgIG9mZnNldCArPSBfYXJyLmxlbmd0aDtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kaWRJdGVyYXRvckVycm9yMiA9IHRydWU7XG4gICAgX2l0ZXJhdG9yRXJyb3IyID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjIucmV0dXJuKSB7XG4gICAgICAgIF9pdGVyYXRvcjIucmV0dXJuKCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjIpIHtcbiAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jb25jYXQgPSByZXF1aXJlKCcuL2NvbmNhdCcpO1xuXG52YXIgX2NvbmNhdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25jYXQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jb25jYXQyLmRlZmF1bHQ7IiwiZnVuY3Rpb24gd2VicGFja0Jvb3RzdHJhcEZ1bmMgKG1vZHVsZXMpIHtcbi8qKioqKiovICAvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyAgdmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuLyoqKioqKi8gIC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyAgZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4vKioqKioqLyAgICAvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovICAgIGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuLyoqKioqKi8gICAgICByZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuLyoqKioqKi8gICAgLy8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovICAgIHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovICAgICAgaTogbW9kdWxlSWQsXG4vKioqKioqLyAgICAgIGw6IGZhbHNlLFxuLyoqKioqKi8gICAgICBleHBvcnRzOiB7fVxuLyoqKioqKi8gICAgfTtcblxuLyoqKioqKi8gICAgLy8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyAgICBtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuLyoqKioqKi8gICAgLy8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gICAgbW9kdWxlLmwgPSB0cnVlO1xuXG4vKioqKioqLyAgICAvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gICAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gIH1cblxuLyoqKioqKi8gIC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4vKioqKioqLyAgX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuLyoqKioqKi8gIC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyAgX193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuLyoqKioqKi8gIC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbi8qKioqKiovICBfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbi8qKioqKiovICAvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovICBfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbi8qKioqKiovICAgIGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbi8qKioqKiovICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbi8qKioqKiovICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuLyoqKioqKi8gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4vKioqKioqLyAgICAgICAgZ2V0OiBnZXR0ZXJcbi8qKioqKiovICAgICAgfSk7XG4vKioqKioqLyAgICB9XG4vKioqKioqLyAgfTtcblxuLyoqKioqKi8gIC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbi8qKioqKiovICBfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4vKioqKioqLyAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuLyoqKioqKi8gIH07XG5cbi8qKioqKiovICAvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuLyoqKioqKi8gICAgdmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4vKioqKioqLyAgICAgIGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4vKioqKioqLyAgICAgIGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4vKioqKioqLyAgICBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4vKioqKioqLyAgICByZXR1cm4gZ2V0dGVyO1xuLyoqKioqKi8gIH07XG5cbi8qKioqKiovICAvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbi8qKioqKiovICBfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbi8qKioqKiovICAvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4vKioqKioqLyAgLy8gb24gZXJyb3IgZnVuY3Rpb24gZm9yIGFzeW5jIGxvYWRpbmdcbi8qKioqKiovICBfX3dlYnBhY2tfcmVxdWlyZV9fLm9lID0gZnVuY3Rpb24oZXJyKSB7IGNvbnNvbGUuZXJyb3IoZXJyKTsgdGhyb3cgZXJyOyB9O1xuXG4gIHZhciBmID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBFTlRSWV9NT0RVTEUpXG4gIHJldHVybiBmLmRlZmF1bHQgfHwgZiAvLyB0cnkgdG8gY2FsbCBkZWZhdWx0IGlmIGRlZmluZWQgdG8gYWxzbyBzdXBwb3J0IGJhYmVsIGVzbW9kdWxlIGV4cG9ydHNcbn1cblxudmFyIG1vZHVsZU5hbWVSZXFFeHAgPSAnW1xcXFwufFxcXFwtfFxcXFwrfFxcXFx3fFxcL3xAXSsnXG52YXIgZGVwZW5kZW5jeVJlZ0V4cCA9ICdcXFxcKFxcXFxzKihcXC9cXFxcKi4qP1xcXFwqXFwvKT9cXFxccyouKj8oJyArIG1vZHVsZU5hbWVSZXFFeHAgKyAnKS4qP1xcXFwpJyAvLyBhZGRpdGlvbmFsIGNoYXJzIHdoZW4gb3V0cHV0LnBhdGhpbmZvIGlzIHRydWVcblxuLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjU5MzY2MS8xMzA0NDJcbmZ1bmN0aW9uIHF1b3RlUmVnRXhwIChzdHIpIHtcbiAgcmV0dXJuIChzdHIgKyAnJykucmVwbGFjZSgvWy4/KiteJFtcXF1cXFxcKCl7fXwtXS9nLCAnXFxcXCQmJylcbn1cblxuZnVuY3Rpb24gaXNOdW1lcmljKG4pIHtcbiAgcmV0dXJuICFpc05hTigxICogbik7IC8vIDEgKiBuIGNvbnZlcnRzIGludGVnZXJzLCBpbnRlZ2VycyBhcyBzdHJpbmcgKFwiMTIzXCIpLCAxZTMgYW5kIFwiMWUzXCIgdG8gaW50ZWdlcnMgYW5kIHN0cmluZ3MgdG8gTmFOXG59XG5cbmZ1bmN0aW9uIGdldE1vZHVsZURlcGVuZGVuY2llcyAoc291cmNlcywgbW9kdWxlLCBxdWV1ZU5hbWUpIHtcbiAgdmFyIHJldHZhbCA9IHt9XG4gIHJldHZhbFtxdWV1ZU5hbWVdID0gW11cblxuICB2YXIgZm5TdHJpbmcgPSBtb2R1bGUudG9TdHJpbmcoKVxuICB2YXIgd3JhcHBlclNpZ25hdHVyZSA9IGZuU3RyaW5nLm1hdGNoKC9eZnVuY3Rpb25cXHM/XFx3KlxcKFxcdyssXFxzKlxcdyssXFxzKihcXHcrKVxcKS8pXG4gIGlmICghd3JhcHBlclNpZ25hdHVyZSkgcmV0dXJuIHJldHZhbFxuICB2YXIgd2VicGFja1JlcXVpcmVOYW1lID0gd3JhcHBlclNpZ25hdHVyZVsxXVxuXG4gIC8vIG1haW4gYnVuZGxlIGRlcHNcbiAgdmFyIHJlID0gbmV3IFJlZ0V4cCgnKFxcXFxcXFxcbnxcXFxcVyknICsgcXVvdGVSZWdFeHAod2VicGFja1JlcXVpcmVOYW1lKSArIGRlcGVuZGVuY3lSZWdFeHAsICdnJylcbiAgdmFyIG1hdGNoXG4gIHdoaWxlICgobWF0Y2ggPSByZS5leGVjKGZuU3RyaW5nKSkpIHtcbiAgICBpZiAobWF0Y2hbM10gPT09ICdkbGwtcmVmZXJlbmNlJykgY29udGludWVcbiAgICByZXR2YWxbcXVldWVOYW1lXS5wdXNoKG1hdGNoWzNdKVxuICB9XG5cbiAgLy8gZGxsIGRlcHNcbiAgcmUgPSBuZXcgUmVnRXhwKCdcXFxcKCcgKyBxdW90ZVJlZ0V4cCh3ZWJwYWNrUmVxdWlyZU5hbWUpICsgJ1xcXFwoXCIoZGxsLXJlZmVyZW5jZVxcXFxzKCcgKyBtb2R1bGVOYW1lUmVxRXhwICsgJykpXCJcXFxcKVxcXFwpJyArIGRlcGVuZGVuY3lSZWdFeHAsICdnJylcbiAgd2hpbGUgKChtYXRjaCA9IHJlLmV4ZWMoZm5TdHJpbmcpKSkge1xuICAgIGlmICghc291cmNlc1ttYXRjaFsyXV0pIHtcbiAgICAgIHJldHZhbFtxdWV1ZU5hbWVdLnB1c2gobWF0Y2hbMV0pXG4gICAgICBzb3VyY2VzW21hdGNoWzJdXSA9IF9fd2VicGFja19yZXF1aXJlX18obWF0Y2hbMV0pLm1cbiAgICB9XG4gICAgcmV0dmFsW21hdGNoWzJdXSA9IHJldHZhbFttYXRjaFsyXV0gfHwgW11cbiAgICByZXR2YWxbbWF0Y2hbMl1dLnB1c2gobWF0Y2hbNF0pXG4gIH1cblxuICAvLyBjb252ZXJ0IDFlMyBiYWNrIHRvIDEwMDAgLSB0aGlzIGNhbiBiZSBpbXBvcnRhbnQgYWZ0ZXIgdWdsaWZ5LWpzIGNvbnZlcnRlZCAxMDAwIHRvIDFlM1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHJldHZhbCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmV0dmFsW2tleXNbaV1dLmxlbmd0aDsgaisrKSB7XG4gICAgICBpZiAoaXNOdW1lcmljKHJldHZhbFtrZXlzW2ldXVtqXSkpIHtcbiAgICAgICAgcmV0dmFsW2tleXNbaV1dW2pdID0gMSAqIHJldHZhbFtrZXlzW2ldXVtqXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmV0dmFsXG59XG5cbmZ1bmN0aW9uIGhhc1ZhbHVlc0luUXVldWVzIChxdWV1ZXMpIHtcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhxdWV1ZXMpXG4gIHJldHVybiBrZXlzLnJlZHVjZShmdW5jdGlvbiAoaGFzVmFsdWVzLCBrZXkpIHtcbiAgICByZXR1cm4gaGFzVmFsdWVzIHx8IHF1ZXVlc1trZXldLmxlbmd0aCA+IDBcbiAgfSwgZmFsc2UpXG59XG5cbmZ1bmN0aW9uIGdldFJlcXVpcmVkTW9kdWxlcyAoc291cmNlcywgbW9kdWxlSWQpIHtcbiAgdmFyIG1vZHVsZXNRdWV1ZSA9IHtcbiAgICBtYWluOiBbbW9kdWxlSWRdXG4gIH1cbiAgdmFyIHJlcXVpcmVkTW9kdWxlcyA9IHtcbiAgICBtYWluOiBbXVxuICB9XG4gIHZhciBzZWVuTW9kdWxlcyA9IHtcbiAgICBtYWluOiB7fVxuICB9XG5cbiAgd2hpbGUgKGhhc1ZhbHVlc0luUXVldWVzKG1vZHVsZXNRdWV1ZSkpIHtcbiAgICB2YXIgcXVldWVzID0gT2JqZWN0LmtleXMobW9kdWxlc1F1ZXVlKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVldWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcXVldWVOYW1lID0gcXVldWVzW2ldXG4gICAgICB2YXIgcXVldWUgPSBtb2R1bGVzUXVldWVbcXVldWVOYW1lXVxuICAgICAgdmFyIG1vZHVsZVRvQ2hlY2sgPSBxdWV1ZS5wb3AoKVxuICAgICAgc2Vlbk1vZHVsZXNbcXVldWVOYW1lXSA9IHNlZW5Nb2R1bGVzW3F1ZXVlTmFtZV0gfHwge31cbiAgICAgIGlmIChzZWVuTW9kdWxlc1txdWV1ZU5hbWVdW21vZHVsZVRvQ2hlY2tdIHx8ICFzb3VyY2VzW3F1ZXVlTmFtZV1bbW9kdWxlVG9DaGVja10pIGNvbnRpbnVlXG4gICAgICBzZWVuTW9kdWxlc1txdWV1ZU5hbWVdW21vZHVsZVRvQ2hlY2tdID0gdHJ1ZVxuICAgICAgcmVxdWlyZWRNb2R1bGVzW3F1ZXVlTmFtZV0gPSByZXF1aXJlZE1vZHVsZXNbcXVldWVOYW1lXSB8fCBbXVxuICAgICAgcmVxdWlyZWRNb2R1bGVzW3F1ZXVlTmFtZV0ucHVzaChtb2R1bGVUb0NoZWNrKVxuICAgICAgdmFyIG5ld01vZHVsZXMgPSBnZXRNb2R1bGVEZXBlbmRlbmNpZXMoc291cmNlcywgc291cmNlc1txdWV1ZU5hbWVdW21vZHVsZVRvQ2hlY2tdLCBxdWV1ZU5hbWUpXG4gICAgICB2YXIgbmV3TW9kdWxlc0tleXMgPSBPYmplY3Qua2V5cyhuZXdNb2R1bGVzKVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBuZXdNb2R1bGVzS2V5cy5sZW5ndGg7IGorKykge1xuICAgICAgICBtb2R1bGVzUXVldWVbbmV3TW9kdWxlc0tleXNbal1dID0gbW9kdWxlc1F1ZXVlW25ld01vZHVsZXNLZXlzW2pdXSB8fCBbXVxuICAgICAgICBtb2R1bGVzUXVldWVbbmV3TW9kdWxlc0tleXNbal1dID0gbW9kdWxlc1F1ZXVlW25ld01vZHVsZXNLZXlzW2pdXS5jb25jYXQobmV3TW9kdWxlc1tuZXdNb2R1bGVzS2V5c1tqXV0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcXVpcmVkTW9kdWxlc1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChtb2R1bGVJZCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICB2YXIgc291cmNlcyA9IHtcbiAgICBtYWluOiBfX3dlYnBhY2tfbW9kdWxlc19fXG4gIH1cblxuICB2YXIgcmVxdWlyZWRNb2R1bGVzID0gb3B0aW9ucy5hbGwgPyB7IG1haW46IE9iamVjdC5rZXlzKHNvdXJjZXMubWFpbikgfSA6IGdldFJlcXVpcmVkTW9kdWxlcyhzb3VyY2VzLCBtb2R1bGVJZClcblxuICB2YXIgc3JjID0gJydcblxuICBPYmplY3Qua2V5cyhyZXF1aXJlZE1vZHVsZXMpLmZpbHRlcihmdW5jdGlvbiAobSkgeyByZXR1cm4gbSAhPT0gJ21haW4nIH0pLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZSkge1xuICAgIHZhciBlbnRyeU1vZHVsZSA9IDBcbiAgICB3aGlsZSAocmVxdWlyZWRNb2R1bGVzW21vZHVsZV1bZW50cnlNb2R1bGVdKSB7XG4gICAgICBlbnRyeU1vZHVsZSsrXG4gICAgfVxuICAgIHJlcXVpcmVkTW9kdWxlc1ttb2R1bGVdLnB1c2goZW50cnlNb2R1bGUpXG4gICAgc291cmNlc1ttb2R1bGVdW2VudHJ5TW9kdWxlXSA9ICcoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7IG1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXzsgfSknXG4gICAgc3JjID0gc3JjICsgJ3ZhciAnICsgbW9kdWxlICsgJyA9ICgnICsgd2VicGFja0Jvb3RzdHJhcEZ1bmMudG9TdHJpbmcoKS5yZXBsYWNlKCdFTlRSWV9NT0RVTEUnLCBKU09OLnN0cmluZ2lmeShlbnRyeU1vZHVsZSkpICsgJykoeycgKyByZXF1aXJlZE1vZHVsZXNbbW9kdWxlXS5tYXAoZnVuY3Rpb24gKGlkKSB7IHJldHVybiAnJyArIEpTT04uc3RyaW5naWZ5KGlkKSArICc6ICcgKyBzb3VyY2VzW21vZHVsZV1baWRdLnRvU3RyaW5nKCkgfSkuam9pbignLCcpICsgJ30pO1xcbidcbiAgfSlcblxuICBzcmMgPSBzcmMgKyAnbmV3ICgoJyArIHdlYnBhY2tCb290c3RyYXBGdW5jLnRvU3RyaW5nKCkucmVwbGFjZSgnRU5UUllfTU9EVUxFJywgSlNPTi5zdHJpbmdpZnkobW9kdWxlSWQpKSArICcpKHsnICsgcmVxdWlyZWRNb2R1bGVzLm1haW4ubWFwKGZ1bmN0aW9uIChpZCkgeyByZXR1cm4gJycgKyBKU09OLnN0cmluZ2lmeShpZCkgKyAnOiAnICsgc291cmNlcy5tYWluW2lkXS50b1N0cmluZygpIH0pLmpvaW4oJywnKSArICd9KSkoc2VsZik7J1xuXG4gIHZhciBibG9iID0gbmV3IHdpbmRvdy5CbG9iKFtzcmNdLCB7IHR5cGU6ICd0ZXh0L2phdmFzY3JpcHQnIH0pXG4gIGlmIChvcHRpb25zLmJhcmUpIHsgcmV0dXJuIGJsb2IgfVxuXG4gIHZhciBVUkwgPSB3aW5kb3cuVVJMIHx8IHdpbmRvdy53ZWJraXRVUkwgfHwgd2luZG93Lm1velVSTCB8fCB3aW5kb3cubXNVUkxcblxuICB2YXIgd29ya2VyVXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKVxuICB2YXIgd29ya2VyID0gbmV3IHdpbmRvdy5Xb3JrZXIod29ya2VyVXJsKVxuICB3b3JrZXIub2JqZWN0VVJMID0gd29ya2VyVXJsXG5cbiAgcmV0dXJuIHdvcmtlclxufVxuIiwiY29uc3QgTE9BREVSX0VWRU5UUyA9IHtcbiAgTEFERVJfU1RBUlQ6ICdMT0FERVJfU1RBUlQnLFxuICBMT0FERVJfREFUQUxPQURFRDogJ0xPQURFUl9EQVRBTE9BREVEJyxcbiAgTE9BREVSX0NPTVBMRVRFOiAnTE9BREVSX0NPTVBMRVRFJyxcbiAgTE9BREVSX0VSUk9SOiAnTE9BREVSX0VSUk9SJ1xufVxuXG5jb25zdCBERU1VWF9FVkVOVFMgPSB7XG4gIERFTVVYX1NUQVJUOiAnREVNVVhfU1RBUlQnLFxuICBERU1VWF9DT01QTEVURTogJ0RFTVVYX0NPTVBMRVRFJyxcbiAgREVNVVhfRVJST1I6ICdERU1VWF9FUlJPUicsXG4gIE1FVEFEQVRBX1BBUlNFRDogJ01FVEFEQVRBX1BBUlNFRCcsXG4gIFZJREVPX01FVEFEQVRBX0NIQU5HRTogJ1ZJREVPX01FVEFEQVRBX0NIQU5HRScsXG4gIEFVRElPX01FVEFEQVRBX0NIQU5HRTogJ0FVRElPX01FVEFEQVRBX0NIQU5HRScsXG4gIE1FRElBX0lORk86ICdNRURJQV9JTkZPJ1xufVxuXG5jb25zdCBSRU1VWF9FVkVOVFMgPSB7XG4gIFJFTVVYX01FVEFEQVRBOiAnUkVNVVhfTUVUQURBVEEnLFxuICBSRU1VWF9NRURJQTogJ1JFTVVYX01FRElBJyxcbiAgTUVESUFfU0VHTUVOVDogJ01FRElBX1NFR01FTlQnLFxuICBSRU1VWF9FUlJPUjogJ1JFTVVYX0VSUk9SJyxcbiAgSU5JVF9TRUdNRU5UOiAnSU5JVF9TRUdNRU5UJyxcbiAgREVURUNUX0NIQU5HRV9TVFJFQU06ICdERVRFQ1RfQ0hBTkdFX1NUUkVBTSdcbn1cblxuY29uc3QgTVNFX0VWRU5UUyA9IHtcbiAgU09VUkNFX1VQREFURV9FTkQ6ICdTT1VSQ0VfVVBEQVRFX0VORCdcbn1cblxuLy8gaGxz5LiT5pyJZXZlbnRzXG5jb25zdCBITFNfRVZFTlRTID0ge1xuICBSRVRSWV9USU1FX0VYQ0VFREVEOiAnUkVUUllfVElNRV9FWENFRURFRCdcbn1cblxuY29uc3QgQ1JZVE9fRVZFTlRTID0ge1xuICBTVEFSVF9ERUNSWVBUOiAnU1RBUlRfREVDUllQVCcsXG4gIERFQ1JZUFRFRDogJ0RFQ1JZUFRFRCdcbn1cbmNvbnN0IEFMTEVWRU5UUyA9IE9iamVjdC5hc3NpZ24oe30sIExPQURFUl9FVkVOVFMsIERFTVVYX0VWRU5UUywgUkVNVVhfRVZFTlRTLCBNU0VfRVZFTlRTLCBITFNfRVZFTlRTKVxuXG5jb25zdCBGbHZBbGxvd2VkRXZlbnRzID0gW11cbmNvbnN0IEhsc0FsbG93ZWRFdmVudHMgPSBbXVxuXG5mb3IgKGxldCBrZXkgaW4gQUxMRVZFTlRTKSB7XG4gIGlmIChBTExFVkVOVFMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgIEZsdkFsbG93ZWRFdmVudHMucHVzaChBTExFVkVOVFNba2V5XSlcbiAgfVxufVxuXG5mb3IgKGxldCBrZXkgaW4gQUxMRVZFTlRTKSB7XG4gIGlmIChBTExFVkVOVFMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgIEhsc0FsbG93ZWRFdmVudHMucHVzaChBTExFVkVOVFNba2V5XSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIEFMTEVWRU5UUyxcbiAgSExTX0VWRU5UUyxcbiAgUkVNVVhfRVZFTlRTLFxuICBERU1VWF9FVkVOVFMsXG4gIE1TRV9FVkVOVFMsXG4gIExPQURFUl9FVkVOVFMsXG4gIEZsdkFsbG93ZWRFdmVudHMsXG4gIEhsc0FsbG93ZWRFdmVudHMsXG4gIENSWVRPX0VWRU5UU1xufTtcbiIsImV4cG9ydCBjb25zdCBDT05URVhUX0NPTU9NQU5EUyA9IHtcbiAgT046ICdvbicsXG4gIE9OQ0U6ICdvbmNlJyxcbiAgT0ZGOiAnb2ZmJyxcbiAgRU1JVDogJ2VtaXQnLFxuICBERVNUUk9ZOiAnZGVzdHJveSdcbn1cbiIsImltcG9ydCBNZWRpYUluZm8gZnJvbSAnLi9tb2RlbHMvbWVkaWEtaW5mbydcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2V2ZW50cydcblxuY29uc3QgRElSRUNUX0VNSVRfRkxBRyA9ICdfX1RPX18nXG5cbmNsYXNzIENvbnRleHQge1xuICBjb25zdHJ1Y3RvciAoYWxsb3dlZEV2ZW50cyA9IFtdKSB7XG4gICAgdGhpcy5fZW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuICAgIHRoaXMuX2luc3RhbmNlTWFwID0ge30gLy8g5omA5pyJ55qE6Kej56CB5rWB56iL5a6e5L6LXG4gICAgdGhpcy5fY2xzTWFwID0ge30gLy8g5p6E6YCg5Ye95pWw55qEbWFwXG4gICAgdGhpcy5faW5pdGVkID0gZmFsc2VcbiAgICB0aGlzLm1lZGlhSW5mbyA9IG5ldyBNZWRpYUluZm8oKVxuICAgIHRoaXMuYWxsb3dlZEV2ZW50cyA9IGFsbG93ZWRFdmVudHNcbiAgICB0aGlzLl9ob29rcyA9IHt9IC8vIOazqOWGjOWcqOS6i+S7tuWJjS/lkI7nmoTpkqnlrZDvvIzkvovlpoIgYmVmb3JlKCdERU1VWF9DT01QTEVURScpXG4gIH1cblxuICAvKipcbiAgICog5LuO5LiK5LiL5paH5Lit6I635Y+W6Kej56CB5rWB56iL5a6e5L6L77yM5aaC5p6c5rKh5pyJ5a6e5L6L77yM5p6E6YCg5LiA5LiqXG4gICAqIEBwYXJhbSB0YWdcbiAgICogQHBhcmFtIGFyZ3NcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXRJbnN0YW5jZSAodGFnKSB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLl9pbnN0YW5jZU1hcFt0YWddXG4gICAgaWYgKGluc3RhbmNlKSB7XG4gICAgICByZXR1cm4gaW5zdGFuY2VcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdGhyb3cgbmV3IEVycm9yKGAke3RhZ33lrp7kvovlsJrmnKrliJ3lp4vljJZgKVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog5Yid5aeL5YyW5YW35L2T5a6e5L6LXG4gICAqIEBwYXJhbSB0YWdcbiAgICogQHBhcmFtIGFyZ3NcbiAgICovXG4gIGluaXRJbnN0YW5jZSAodGFnLCAuLi5hcmdzKSB7XG4gICAgaWYgKHRoaXMuX2Nsc01hcFt0YWddKSB7XG4gICAgICBjb25zdCBuZXdJbnN0YW5jZSA9IG5ldyB0aGlzLl9jbHNNYXBbdGFnXSguLi5hcmdzKVxuICAgICAgdGhpcy5faW5zdGFuY2VNYXBbdGFnXSA9IG5ld0luc3RhbmNlXG4gICAgICBpZiAobmV3SW5zdGFuY2UuaW5pdCkge1xuICAgICAgICBuZXdJbnN0YW5jZS5pbml0KCkgLy8gVE9ETzogbGlmZWNpcmNsZVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5ld0luc3RhbmNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHt0YWd95pyq5ZyoY29udGV4dOS4reazqOWGjGApXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOmBv+WFjeWkp+mHj+eahGluaXRJbnN0YW5jZeiwg+eUqO+8jOWIneWni+WMluaJgOacieeahOe7hOS7tlxuICAgKiBAcGFyYW0gY29uZmlnXG4gICAqL1xuICBpbml0IChjb25maWcpIHtcbiAgICBpZiAodGhpcy5faW5pdGVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgZm9yIChsZXQgdGFnIGluIHRoaXMuX2Nsc01hcCkge1xuICAgICAgLy8gaWYgbm90IGluaXRlZCwgaW5pdCBhbiBpbnN0YW5jZVxuICAgICAgaWYgKHRoaXMuX2Nsc01hcC5oYXNPd25Qcm9wZXJ0eSh0YWcpICYmICF0aGlzLl9pbnN0YW5jZU1hcFt0YWddKSB7XG4gICAgICAgIHRoaXMuaW5pdEluc3RhbmNlKHRhZywgY29uZmlnKVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9pbml0ZWQgPSB0cnVlXG4gIH1cblxuICAvKipcbiAgICog5rOo5YaM5LiA5Liq5LiK5LiL5paH5rWB56iL77yM5o+Q5L6b5a6J5YWo55qE5LqL5Lu25Y+R6YCB5py65Yi2XG4gICAqIEBwYXJhbSB0YWdcbiAgICogQHBhcmFtIGNsc1xuICAgKi9cbiAgcmVnaXN0cnkgKHRhZywgY2xzKSB7XG4gICAgY29uc3QgZW1pdHRlciA9IHRoaXMuX2VtaXR0ZXJcbiAgICBjb25zdCBjaGVja01lc3NhZ2VOYW1lID0gdGhpcy5faXNNZXNzYWdlTmFtZVZhbGlkLmJpbmQodGhpcylcbiAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgIGNvbnN0IGVuaGFuY2VkID0gY2xhc3MgZXh0ZW5kcyBjbHMge1xuICAgICAgY29uc3RydWN0b3IgKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncylcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSB7fVxuICAgICAgICB0aGlzLm9uY2VMaXN0ZW5lcnMgPSB7fVxuICAgICAgICB0aGlzLlRBRyA9IHRhZ1xuICAgICAgICB0aGlzLl9jb250ZXh0ID0gc2VsZlxuICAgICAgfVxuXG4gICAgICBvbiAobWVzc2FnZU5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNoZWNrTWVzc2FnZU5hbWUobWVzc2FnZU5hbWUpXG5cbiAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJzW21lc3NhZ2VOYW1lXSkge1xuICAgICAgICAgIHRoaXMubGlzdGVuZXJzW21lc3NhZ2VOYW1lXS5wdXNoKGNhbGxiYWNrKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubGlzdGVuZXJzW21lc3NhZ2VOYW1lXSA9IFtjYWxsYmFja11cbiAgICAgICAgfVxuXG4gICAgICAgIGVtaXR0ZXIub24oYCR7bWVzc2FnZU5hbWV9JHtESVJFQ1RfRU1JVF9GTEFHfSR7dGFnfWAsIGNhbGxiYWNrKSAvLyDlu7rnq4vlrprlkJHpgJrkv6Hnm5HlkKxcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXIub24obWVzc2FnZU5hbWUsIGNhbGxiYWNrKVxuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIOWcqOafkOS4quS6i+S7tuinpuWPkeWJjeaJp+ihjFxuICAgICAgICogQHBhcmFtIG1lc3NhZ2VOYW1lXG4gICAgICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICAgICAqL1xuICAgICAgYmVmb3JlIChtZXNzYWdlTmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgY2hlY2tNZXNzYWdlTmFtZShtZXNzYWdlTmFtZSlcbiAgICAgICAgaWYgKHNlbGYuX2hvb2tzW21lc3NhZ2VOYW1lXSkge1xuICAgICAgICAgIHNlbGYuX2hvb2tzW21lc3NhZ2VOYW1lXS5wdXNoKGNhbGxiYWNrKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGYuX2hvb2tzW21lc3NhZ2VOYW1lXSA9IFtjYWxsYmFja11cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBvbmNlIChtZXNzYWdlTmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgY2hlY2tNZXNzYWdlTmFtZShtZXNzYWdlTmFtZSlcblxuICAgICAgICBpZiAodGhpcy5vbmNlTGlzdGVuZXJzW21lc3NhZ2VOYW1lXSkge1xuICAgICAgICAgIHRoaXMub25jZUxpc3RlbmVyc1ttZXNzYWdlTmFtZV0ucHVzaChjYWxsYmFjaylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm9uY2VMaXN0ZW5lcnNbbWVzc2FnZU5hbWVdID0gW2NhbGxiYWNrXVxuICAgICAgICB9XG5cbiAgICAgICAgZW1pdHRlci5vbmNlKGAke21lc3NhZ2VOYW1lfSR7RElSRUNUX0VNSVRfRkxBR30ke3RhZ31gLCBjYWxsYmFjaylcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXIub25jZShtZXNzYWdlTmFtZSwgY2FsbGJhY2spXG4gICAgICB9XG5cbiAgICAgIGVtaXQgKG1lc3NhZ2VOYW1lLCAuLi5hcmdzKSB7XG4gICAgICAgIGNoZWNrTWVzc2FnZU5hbWUobWVzc2FnZU5hbWUpXG5cbiAgICAgICAgY29uc3QgYmVmb3JlTGlzdCA9IHNlbGYuX2hvb2tzID8gc2VsZi5faG9va3NbbWVzc2FnZU5hbWVdIDogbnVsbFxuXG4gICAgICAgIGlmIChiZWZvcmVMaXN0KSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGJlZm9yZUxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrID0gYmVmb3JlTGlzdFtpXVxuICAgICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZW1pdHRlci5lbWl0KG1lc3NhZ2VOYW1lLCAuLi5hcmdzKVxuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIOWumuWQkeWPkemAgee7meafkOS4que7hOS7tuWNleS+i+eahOa2iOaBr1xuICAgICAgICogQHBhcmFtIG1lc3NhZ2VOYW1lXG4gICAgICAgKiBAcGFyYW0gYXJnc1xuICAgICAgICovXG4gICAgICBlbWl0VG8gKHRhZywgbWVzc2FnZU5hbWUsIC4uLmFyZ3MpIHtcbiAgICAgICAgY2hlY2tNZXNzYWdlTmFtZShtZXNzYWdlTmFtZSlcblxuICAgICAgICByZXR1cm4gZW1pdHRlci5lbWl0KGAke21lc3NhZ2VOYW1lfSR7RElSRUNUX0VNSVRfRkxBR30ke3RhZ31gLCAuLi5hcmdzKVxuICAgICAgfVxuXG4gICAgICBvZmYgKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaykge1xuICAgICAgICBjaGVja01lc3NhZ2VOYW1lKG1lc3NhZ2VOYW1lKVxuICAgICAgICByZXR1cm4gZW1pdHRlci5vZmYobWVzc2FnZU5hbWUsIGNhbGxiYWNrKVxuICAgICAgfVxuXG4gICAgICByZW1vdmVMaXN0ZW5lcnMgKCkge1xuICAgICAgICBjb25zdCBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmJpbmQodGhpcy5saXN0ZW5lcnMpXG5cbiAgICAgICAgZm9yIChsZXQgbWVzc2FnZU5hbWUgaW4gdGhpcy5saXN0ZW5lcnMpIHtcbiAgICAgICAgICBpZiAoaGFzT3duKG1lc3NhZ2VOYW1lKSkge1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5saXN0ZW5lcnNbbWVzc2FnZU5hbWVdIHx8IFtdXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IGNhbGxiYWNrc1tpXVxuICAgICAgICAgICAgICBlbWl0dGVyLm9mZihtZXNzYWdlTmFtZSwgY2FsbGJhY2spXG4gICAgICAgICAgICAgIGVtaXR0ZXIub2ZmKGAke21lc3NhZ2VOYW1lfSR7RElSRUNUX0VNSVRfRkxBR30ke3RhZ31gLCBjYWxsYmFjaylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBtZXNzYWdlTmFtZSBpbiB0aGlzLm9uY2VMaXN0ZW5lcnMpIHtcbiAgICAgICAgICBpZiAoaGFzT3duKG1lc3NhZ2VOYW1lKSkge1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5vbmNlTGlzdGVuZXJzW21lc3NhZ2VOYW1lXSB8fCBbXVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSBjYWxsYmFja3NbaV1cbiAgICAgICAgICAgICAgZW1pdHRlci5vZmYobWVzc2FnZU5hbWUsIGNhbGxiYWNrKVxuICAgICAgICAgICAgICBlbWl0dGVyLm9mZihgJHttZXNzYWdlTmFtZX0ke0RJUkVDVF9FTUlUX0ZMQUd9JHt0YWd9YCwgY2FsbGJhY2spXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICog5Zyo57uE5Lu26ZSA5q+B5pe277yM6buY6K6k5bCG5a6D5rOo5YaM55qE5LqL5Lu25YWo6YOo5Y246L2977yM56Gu5L+d5LiN5Lya6YCg5oiQ5YaF5a2Y5rOE5ryPXG4gICAgICAgKi9cbiAgICAgIGRlc3Ryb3kgKCkge1xuICAgICAgICAvLyBzdGVwMSB1bmxpc3RlbiBldmVudHNcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcnMoKVxuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHt9XG5cbiAgICAgICAgLy8gc3RlcDIgcmVsZWFzZSBmcm9tIGNvbnRleHRcbiAgICAgICAgZGVsZXRlIHNlbGYuX2luc3RhbmNlTWFwW3RhZ11cbiAgICAgICAgaWYgKHN1cGVyLmRlc3Ryb3kpIHtcbiAgICAgICAgICByZXR1cm4gc3VwZXIuZGVzdHJveSgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fY2xzTWFwW3RhZ10gPSBlbmhhbmNlZFxuXG4gICAgLyoqXG4gICAgICogZ2V0IGluc3RhbmNlIGltbWVkaWF0ZWx5XG4gICAgICogZS5nIGNvbnN0IGluc3RhbmNlID0gY29udGV4dC5yZWdpc3RyeSh0YWcsIENscykoY29uZmlnKVxuICAgICAqICovXG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5pbml0SW5zdGFuY2UodGFnLCAuLi5hcmdzKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDlr7nlrZjlnKjnmoTlrp7kvovov5vooYxcbiAgICovXG4gIGRlc3Ryb3lJbnN0YW5jZXMgKCkge1xuICAgIE9iamVjdC5rZXlzKHRoaXMuX2luc3RhbmNlTWFwKS5mb3JFYWNoKCh0YWcpID0+IHtcbiAgICAgIGlmICh0aGlzLl9pbnN0YW5jZU1hcFt0YWddLmRlc3Ryb3kpIHtcbiAgICAgICAgdGhpcy5faW5zdGFuY2VNYXBbdGFnXS5kZXN0cm95KClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIOe8luino+eggea1geeoi+aXoOmcgOWFs+azqOS6i+S7tueahOino+e7kVxuICAgKi9cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5fZW1pdHRlciA9IG51bGxcbiAgICB0aGlzLmFsbG93ZWRFdmVudHMgPSBbXVxuICAgIHRoaXMuX2Nsc01hcCA9IG51bGxcbiAgICB0aGlzLl9jb250ZXh0ID0gbnVsbFxuICAgIHRoaXMuX2hvb2tzID0gbnVsbFxuICAgIHRoaXMuZGVzdHJveUluc3RhbmNlcygpXG4gIH1cblxuICAvKipcbiAgICog5a+55L+h6YGT6L+b6KGM5pS25ouiXG4gICAqIEBwYXJhbSBtZXNzYWdlTmFtZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2lzTWVzc2FnZU5hbWVWYWxpZCAobWVzc2FnZU5hbWUpIHtcbiAgICBpZiAoIXRoaXMuYWxsb3dlZEV2ZW50cy5pbmRleE9mKG1lc3NhZ2VOYW1lKSA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5yZWdpc3RlcmVkIG1lc3NhZ2UgbmFtZTogJHttZXNzYWdlTmFtZX1gKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb250ZXh0XG4iLCJpbXBvcnQgRVZFTlRTIGZyb20gJy4uL2NvbnN0YW50cy9ldmVudHMnO1xuY29uc3QgQ1JZVE9fRVZFTlRTID0gRVZFTlRTLkNSWVRPX0VWRU5UU1xuY2xhc3MgQ3J5cHRvIHtcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgdGhpcy5pbnB1dEJ1ZmZlciA9IGNvbmZpZy5pbnB1dGJ1ZmZlcjtcbiAgICAgICAgdGhpcy5vdXRwdXRCdWZmZXIgPSBjb25maWcub3V0cHV0YnVmZmVyO1xuICAgICAgICB0aGlzLmtleSA9IGNvbmZpZy5rZXk7XG4gICAgICAgIHRoaXMuaXYgPSBjb25maWcuaXY7XG4gICAgICAgIHRoaXMubWV0aG9kID0gY29uZmlnLm1ldGhvZDtcblxuICAgICAgICB0aGlzLmNyeXB0byA9ICB3aW5kb3cuY3J5cHRvIHx8IHdpbmRvdy5tc0NyeXB0b1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMub24oQ1JZVE9fRVZFTlRTLlNUQVJUX0RFQ1JZUFQsIHRoaXMuZGVjcmlwdC5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgXG4gICAgZGVjcmlwdCgpIHtcbiAgICAgICAgaWYoIXRoaXMuYWVza2V5KSB7XG4gICAgICAgICAgICBsZXQgc2JrZXkgPSB0aGlzLmNyeXB0by5zdWJ0bGUuaW1wb3J0S2V5KCdyYXcnLCB0aGlzLmtleS5idWZmZXIsIHsgbmFtZTogJ0FFUy1DQkMnIH0sIGZhbHNlLCBbJ2VuY3J5cHQnLCAnZGVjcnlwdCddKTtcbiAgICAgICAgICAgIHNia2V5LnRoZW4oa2V5ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFlc2tleSA9IGtleTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlY3JpcHREYXRhKCk7XG4gICAgICAgICAgICB9KSBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGVjcmlwdERhdGEoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlY3JpcHREYXRhKCkge1xuICAgICAgICBsZXQgaW5wdXRidWZmZXIgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKHRoaXMuaW5wdXRCdWZmZXIpO1xuICAgICAgICBsZXQgb3V0cHV0YnVmZmVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSh0aGlzLm91dHB1dEJ1ZmZlcik7XG4gICAgICAgIGxldCBkYXRhID0gaW5wdXRidWZmZXIuc2hpZnQoKTtcbiAgICAgICAgaWYoZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5jcnlwdG8uc3VidGxlLmRlY3J5cHQoeyBuYW1lOiAnQUVTLUNCQycsIGl2OiB0aGlzLml2LmJ1ZmZlciB9LCB0aGlzLmFlc2tleSwgZGF0YSkudGhlbihyZXM9PntcbiAgICAgICAgICAgICAgICBvdXRwdXRidWZmZXIucHVzaChuZXcgVWludDhBcnJheShyZXMpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoQ1JZVE9fRVZFTlRTLkRFQ1JZUFRFRCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWNyaXB0RGF0YShkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQ3J5cHRvOyIsImNvbnN0IGxlID0gKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgYnVmID0gbmV3IEFycmF5QnVmZmVyKDIpO1xuICAobmV3IERhdGFWaWV3KGJ1ZikpLnNldEludDE2KDAsIDI1NiwgdHJ1ZSkgLy8gbGl0dGxlLWVuZGlhbiB3cml0ZVxuICByZXR1cm4gKG5ldyBJbnQxNkFycmF5KGJ1ZikpWzBdID09PSAyNTYgLy8gcGxhdGZvcm0tc3BlYyByZWFkLCBpZiBlcXVhbCB0aGVuIExFXG59KSgpXG5cbmV4cG9ydCBkZWZhdWx0IGxlXG4iLCJjb25zdCBsZSA9IChmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcigyKTtcbiAgKG5ldyBEYXRhVmlldyhidWYpKS5zZXRJbnQxNigwLCAyNTYsIHRydWUpIC8vIGxpdHRsZS1lbmRpYW4gd3JpdGVcbiAgcmV0dXJuIChuZXcgSW50MTZBcnJheShidWYpKVswXSA9PT0gMjU2IC8vIHBsYXRmb3JtLXNwZWMgcmVhZCwgaWYgZXF1YWwgdGhlbiBMRVxufSkoKVxuXG5jb25zdCBzbmlmZmVyID0ge1xuICBnZXQgZGV2aWNlICgpIHtcbiAgICBsZXQgciA9IHNuaWZmZXIub3M7XG4gICAgcmV0dXJuIHIuaXNQYyA/ICdwYycgOiByLmlzVGFibGV0ID8gJ3RhYmxldCcgOiAnbW9iaWxlJztcbiAgfSxcbiAgZ2V0IGJyb3dzZXIgKCkge1xuICAgIGxldCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbiAgICBsZXQgcmVnID0ge1xuICAgICAgaWU6IC9ydjooW1xcZC5dKylcXCkgbGlrZSBnZWNrby8sXG4gICAgICBmaXJmb3g6IC9maXJlZm94XFwvKFtcXGQuXSspLyxcbiAgICAgIGNocm9tZTogL2Nocm9tZVxcLyhbXFxkLl0rKS8sXG4gICAgICBvcGVyYTogL29wZXJhLihbXFxkLl0rKS8sXG4gICAgICBzYWZhcmk6IC92ZXJzaW9uXFwvKFtcXGQuXSspLipzYWZhcmkvXG4gICAgfTtcbiAgICByZXR1cm4gW10uY29uY2F0KE9iamVjdC5rZXlzKHJlZykuZmlsdGVyKGtleSA9PiByZWdba2V5XS50ZXN0KHVhKSkpWzBdO1xuICB9LFxuICBnZXQgb3MgKCkge1xuICAgIGxldCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnRcbiAgICBsZXQgaXNXaW5kb3dzUGhvbmUgPSAvKD86V2luZG93cyBQaG9uZSkvLnRlc3QodWEpXG4gICAgbGV0IGlzU3ltYmlhbiA9IC8oPzpTeW1iaWFuT1MpLy50ZXN0KHVhKSB8fCBpc1dpbmRvd3NQaG9uZTtcbiAgICBsZXQgaXNBbmRyb2lkID0gLyg/OkFuZHJvaWQpLy50ZXN0KHVhKTtcbiAgICBsZXQgaXNGaXJlRm94ID0gLyg/OkZpcmVmb3gpLy50ZXN0KHVhKTtcbiAgICBsZXQgaXNUYWJsZXQgPSAvKD86aVBhZHxQbGF5Qm9vaykvLnRlc3QodWEpIHx8IChpc0FuZHJvaWQgJiYgIS8oPzpNb2JpbGUpLy50ZXN0KHVhKSkgfHwgKGlzRmlyZUZveCAmJiAvKD86VGFibGV0KS8udGVzdCh1YSkpO1xuICAgIGxldCBpc1Bob25lID0gLyg/OmlQaG9uZSkvLnRlc3QodWEpICYmICFpc1RhYmxldDtcbiAgICBsZXQgaXNQYyA9ICFpc1Bob25lICYmICFpc0FuZHJvaWQgJiYgIWlzU3ltYmlhbjtcbiAgICByZXR1cm4ge1xuICAgICAgaXNUYWJsZXQsXG4gICAgICBpc1Bob25lLFxuICAgICAgaXNBbmRyb2lkLFxuICAgICAgaXNQYyxcbiAgICAgIGlzU3ltYmlhbixcbiAgICAgIGlzV2luZG93c1Bob25lLFxuICAgICAgaXNGaXJlRm94XG4gICAgfTtcbiAgfSxcblxuICBnZXQgaXNMZSAoKSB7XG4gICAgcmV0dXJuIGxlXG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNuaWZmZXI7XG4iLCJjbGFzcyBVVEY4IHtcbiAgc3RhdGljIGRlY29kZSAodWludDhhcnJheSkge1xuICAgIGNvbnN0IG91dCA9IFtdO1xuICAgIGNvbnN0IGlucHV0ID0gdWludDhhcnJheTtcbiAgICBsZXQgaSA9IDA7XG4gICAgY29uc3QgbGVuZ3RoID0gdWludDhhcnJheS5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaSA8IGxlbmd0aCkge1xuICAgICAgaWYgKGlucHV0W2ldIDwgMHg4MCkge1xuICAgICAgICBvdXQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGlucHV0W2ldKSk7XG4gICAgICAgICsraTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9IGVsc2UgaWYgKGlucHV0W2ldIDwgMHhDMCkge1xuICAgICAgICAvLyBmYWxsdGhyb3VnaFxuICAgICAgfSBlbHNlIGlmIChpbnB1dFtpXSA8IDB4RTApIHtcbiAgICAgICAgaWYgKFVURjguX2NoZWNrQ29udGludWF0aW9uKGlucHV0LCBpLCAxKSkge1xuICAgICAgICAgIGNvbnN0IHVjczQgPSAoaW5wdXRbaV0gJiAweDFGKSA8PCA2IHwgKGlucHV0W2kgKyAxXSAmIDB4M0YpO1xuICAgICAgICAgIGlmICh1Y3M0ID49IDB4ODApIHtcbiAgICAgICAgICAgIG91dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUodWNzNCAmIDB4RkZGRikpO1xuICAgICAgICAgICAgaSArPSAyO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGlucHV0W2ldIDwgMHhGMCkge1xuICAgICAgICBpZiAoVVRGOC5fY2hlY2tDb250aW51YXRpb24oaW5wdXQsIGksIDIpKSB7XG4gICAgICAgICAgY29uc3QgdWNzNCA9IChpbnB1dFtpXSAmIDB4RikgPDwgMTIgfCAoaW5wdXRbaSArIDFdICYgMHgzRikgPDwgNiB8IGlucHV0W2kgKyAyXSAmIDB4M0Y7XG4gICAgICAgICAgaWYgKHVjczQgPj0gMHg4MDAgJiYgKHVjczQgJiAweEY4MDApICE9PSAweEQ4MDApIHtcbiAgICAgICAgICAgIG91dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUodWNzNCAmIDB4RkZGRikpO1xuICAgICAgICAgICAgaSArPSAzO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGlucHV0W2ldIDwgMHhGOCkge1xuICAgICAgICBpZiAoVVRGOC5fY2hlY2tDb250aW51YXRpb24oaW5wdXQsIGksIDMpKSB7XG4gICAgICAgICAgbGV0IHVjczQgPSAoaW5wdXRbaV0gJiAweDcpIDw8IDE4IHwgKGlucHV0W2kgKyAxXSAmIDB4M0YpIDw8IDEyIHxcbiAgICAgICAgICAgICAgICAgICAgKGlucHV0W2kgKyAyXSAmIDB4M0YpIDw8IDYgfCAoaW5wdXRbaSArIDNdICYgMHgzRik7XG4gICAgICAgICAgaWYgKHVjczQgPiAweDEwMDAwICYmIHVjczQgPCAweDExMDAwMCkge1xuICAgICAgICAgICAgdWNzNCAtPSAweDEwMDAwO1xuICAgICAgICAgICAgb3V0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgodWNzNCA+Pj4gMTApIHwgMHhEODAwKSk7XG4gICAgICAgICAgICBvdXQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKCh1Y3M0ICYgMHgzRkYpIHwgMHhEQzAwKSk7XG4gICAgICAgICAgICBpICs9IDQ7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG91dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoMHhGRkZEKSk7XG4gICAgICArK2k7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dC5qb2luKCcnKTtcbiAgfVxuXG4gIHN0YXRpYyBfY2hlY2tDb250aW51YXRpb24gKHVpbnQ4YXJyYXksIHN0YXJ0LCBjaGVja0xlbmd0aCkge1xuICAgIGxldCBhcnJheSA9IHVpbnQ4YXJyYXk7XG4gICAgaWYgKHN0YXJ0ICsgY2hlY2tMZW5ndGggPCBhcnJheS5sZW5ndGgpIHtcbiAgICAgIHdoaWxlIChjaGVja0xlbmd0aC0tKSB7XG4gICAgICAgIGlmICgoYXJyYXlbKytzdGFydF0gJiAweEMwKSAhPT0gMHg4MCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVVRGODtcbiIsImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnZXZlbnRzJ1xuY2xhc3MgQXVkaW9DdHggZXh0ZW5kcyBFdmVudEVtaXR0ZXJ7XG4gIGNvbnN0cnVjdG9yIChjb25maWcpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnKTtcbiAgICBsZXQgQXVkaW9Db250ZXh0ID0gIHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dDtcbiAgICB0aGlzLmNvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XG4gICAgdGhpcy5nYWluTm9kZSA9IHRoaXMuY29udGV4dC5jcmVhdGVHYWluKCk7XG4gICAgdGhpcy5nYWluTm9kZS5jb25uZWN0KHRoaXMuY29udGV4dC5kZXN0aW5hdGlvbik7XG4gICAgdGhpcy5tZXRhID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc2FtcGxlcyA9IFtdO1xuICAgIHRoaXMucHJlbG9hZFRpbWUgPSB0aGlzLmNvbmZpZy5wcmVsb2FkVGltZSB8fCAzO1xuICAgIHRoaXMuZHVyYXRpb24gPSAwO1xuXG4gICAgdGhpcy5fY3VycmVudEJ1ZmZlciA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9uZXh0QnVmZmVyID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2xhc3RwdHMgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fcHJlRGVjb2RlID0gW107XG4gICAgdGhpcy5fY3VycmVudFRpbWUgPSAwO1xuICAgIHRoaXMuX2RlY29kaW5nID0gZmFsc2U7XG4gICAgLy8g6K6w5b2V5aSW6YOo5Lyg6L6T55qE54q25oCBXG4gICAgdGhpcy5fcGxheWVkID0gZmFsc2U7XG4gIH1cblxuICBnZXQgY3VycmVudFRpbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRUaW1lO1xuICB9XG5cbiAgZGVjb2RlQXVkaW8gKGF1ZGlvVHJhY2spIHtcbiAgICBsZXQge3NhbXBsZXN9ID0gYXVkaW9UcmFjaztcbiAgICBsZXQgZGF0YSA9IHNhbXBsZXM7XG4gICAgYXVkaW9UcmFjay5zYW1wbGVzID0gW107XG4gICAgdGhpcy5zZXRBdWRpb0RhdGEoZGF0YSk7XG4gIH1cbiAgc2V0QXVkaW9EYXRhIChkYXRhKSB7XG4gICAgZm9yKGxldCBpID0gMDtpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgZGF0YVtpXS5wdHMgPSAoZGF0YVtpXS5wdHMgPT09IHVuZGVmaW5lZCkgPyBkYXRhW2ldLmR0cyA6IGRhdGFbaV0ucHRzO1xuICAgICAgdGhpcy5fcHJlRGVjb2RlLnB1c2goZGF0YVtpXSk7XG4gICAgfVxuICAgIGlmKHRoaXMuX3ByZURlY29kZS5sZW5ndGggPiAwKSB7XG4gICAgICBpZih0aGlzLl9sYXN0cHRzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fbGFzdHB0cyA9IHRoaXMuX3ByZURlY29kZVswXS5wdHM7XG4gICAgICB9XG4gICAgICBpZigodGhpcy5fcHJlRGVjb2RlW3RoaXMuX3ByZURlY29kZS5sZW5ndGggLSAxXS5wdHMgLSB0aGlzLl9sYXN0cHRzKSAvIDEwMDAgPiB0aGlzLnByZWxvYWRUaW1lKSB7XG4gICAgICAgIHRoaXMuZGVjb2RlQUFDKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGVjb2RlQUFDKCkge1xuICAgIGlmKHRoaXMuX2RlY29kaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2RlY29kaW5nID0gdHJ1ZTtcbiAgICBsZXQgZGF0YSA9IHRoaXMuX3ByZURlY29kZTtcbiAgICBsZXQgc2FtcGxlcyA9IFtdO1xuICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgbGV0IHNhbXBsZSA9IGRhdGEuc2hpZnQoKTtcbiAgICB3aGlsZShzYW1wbGUpIHtcbiAgICAgIGxldCBzYW1wbGVEYXRhID0gQXVkaW9DdHguZ2V0QUFDRGF0YSh0aGlzLm1ldGEsIHNhbXBsZSlcbiAgICAgIHNhbXBsZXMucHVzaChzYW1wbGVEYXRhKTtcbiAgICAgIHRoaXMuX2xhc3RwdHMgPSBzYW1wbGUucHRzO1xuICAgICAgc2FtcGxlID0gZGF0YS5zaGlmdCgpXG4gICAgfVxuICAgIGxldCBidWZmZXIgPSBBdWRpb0N0eC5jb21iaWxlRGF0YShzYW1wbGVzKTtcbiAgICB0cnkge1xuICAgICAgdGhpcy5jb250ZXh0LmRlY29kZUF1ZGlvRGF0YShidWZmZXIuYnVmZmVyLCBmdW5jdGlvbihidWZmZXIpIHtcbiAgICAgICAgbGV0IGF1ZGlvU291cmNlID0gX3RoaXMuY29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICAgICAgYXVkaW9Tb3VyY2UuYnVmZmVyID0gYnVmZmVyO1xuICAgICAgICBhdWRpb1NvdXJjZS5vbmVuZGVkID0gX3RoaXMub25Tb3VyY2VFbmRlZC5iaW5kKF90aGlzKTtcbiAgICAgICAgX3RoaXMuc2FtcGxlcy5wdXNoKHtcbiAgICAgICAgICB0aW1lOiBfdGhpcy5kdXJhdGlvbixcbiAgICAgICAgICBkdXJhdGlvbjogYnVmZmVyLmR1cmF0aW9uLFxuICAgICAgICAgIGRhdGE6IGF1ZGlvU291cmNlXG4gICAgICAgIH0pXG5cbiAgICAgICAgX3RoaXMuZHVyYXRpb24gKz0gYnVmZmVyLmR1cmF0aW9uO1xuXG4gICAgICAgIGlmKCFfdGhpcy5fY3VycmVudEJ1ZmZlcikge1xuICAgICAgICAgIF90aGlzLl9jdXJyZW50QnVmZmVyID0gX3RoaXMuZ2V0VGltZUJ1ZmZlcihfdGhpcy5jdXJyZW50VGltZSk7XG5cbiAgICAgICAgICBpZihfdGhpcy5fcGxheWVkKSB7XG4gICAgICAgICAgICBfdGhpcy5wbGF5KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoIV90aGlzLl9uZXh0QnVmZmVyICYmIF90aGlzLl9jdXJyZW50QnVmZmVyKSB7XG4gICAgICAgICAgX3RoaXMuX25leHRCdWZmZXIgPSBfdGhpcy5nZXRUaW1lQnVmZmVyKF90aGlzLmN1cnJlbnRUaW1lICsgX3RoaXMuX2N1cnJlbnRCdWZmZXIuZHVyYXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIF90aGlzLl9kZWNvZGluZyA9IGZhbHNlO1xuXG4gICAgICAgIGlmKChfdGhpcy5fcHJlRGVjb2RlLmxlbmd0aCA+IDAgJiYgX3RoaXMuX3ByZURlY29kZVtfdGhpcy5fcHJlRGVjb2RlLmxlbmd0aCAtIDFdLnB0cyAtIF90aGlzLl9sYXN0cHRzKSAvIDEwMDAgPj0gX3RoaXMucHJlbG9hZFRpbWUpIHtcbiAgICAgICAgICBfdGhpcy5kZWNvZGVBQUMoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH1cbiAgfVxuXG4gIG9uU291cmNlRW5kZWQoKSB7XG4gICAgaWYgKCF0aGlzLl9uZXh0QnVmZmVyIHx8ICF0aGlzLl9wbGF5ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGF1ZGlvU291cmNlID0gdGhpcy5fbmV4dEJ1ZmZlci5kYXRhO1xuICAgIGF1ZGlvU291cmNlLnN0YXJ0KCk7XG4gICAgYXVkaW9Tb3VyY2UuY29ubmVjdCh0aGlzLmdhaW5Ob2RlKTtcbiAgICB0aGlzLl9jdXJyZW50QnVmZmVyID0gdGhpcy5fbmV4dEJ1ZmZlcjtcbiAgICB0aGlzLl9jdXJyZW50VGltZSA9IHRoaXMuX2N1cnJlbnRCdWZmZXIudGltZTtcbiAgICB0aGlzLl9uZXh0QnVmZmVyID0gdGhpcy5nZXRUaW1lQnVmZmVyKHRoaXMuY3VycmVudFRpbWUpO1xuICAgIGlmICh0aGlzLl9jdXJyZW50QnVmZmVyKSB7XG4gICAgICB0aGlzLl9uZXh0QnVmZmVyID0gdGhpcy5nZXRUaW1lQnVmZmVyKHRoaXMuY3VycmVudFRpbWUgKyB0aGlzLl9jdXJyZW50QnVmZmVyLmR1cmF0aW9uKTtcbiAgICB9XG4gICAgdGhpcy5lbWl0KCdBVURJT19TT1VSQ0VfRU5EJylcbiAgfVxuXG4gIHBsYXkoKSB7XG4gICAgdGhpcy5fcGxheWVkID0gdHJ1ZTtcbiAgICBpZighdGhpcy5fY3VycmVudEJ1ZmZlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgYXVkaW9Tb3VyY2UgPSB0aGlzLl9jdXJyZW50QnVmZmVyLmRhdGE7XG4gICAgYXVkaW9Tb3VyY2UuY29ubmVjdCh0aGlzLmdhaW5Ob2RlKTtcbiAgICBhdWRpb1NvdXJjZS5zdGFydCgpO1xuICB9XG5cbiAgZ2V0VGltZUJ1ZmZlcih0aW1lKSB7XG4gICAgbGV0IHJldDtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zYW1wbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgc2FtcGxlID0gdGhpcy5zYW1wbGVzW2ldXG4gICAgICBpZihzYW1wbGUudGltZSA8PSB0aW1lICYmIChzYW1wbGUudGltZSArIHNhbXBsZS5kdXJhdGlvbikgPiB0aW1lKSB7XG4gICAgICAgIHJldCA9IHNhbXBsZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBzZXRBdWRpb01ldGFEYXRhKG1ldGEpIHtcbiAgICB0aGlzLm1ldGEgPSBtZXRhO1xuICB9XG5cbiAgc3RhdGljIGdldEFBQ0RhdGEobWV0YSwgc2FtcGxlKSB7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KHNhbXBsZS5kYXRhLmJ5dGVMZW5ndGggKyA3KTtcbiAgICBsZXQgYWR0cyA9IEF1ZGlvQ3R4LmdldEFkdHMobWV0YSwgc2FtcGxlLmRhdGEpO1xuICAgIGJ1ZmZlci5zZXQoYWR0cyk7XG4gICAgYnVmZmVyLnNldChzYW1wbGUuZGF0YSwgNyk7XG4gICAgcmV0dXJuIGJ1ZmZlcjtcbiAgfVxuXG4gIHN0YXRpYyBjb21iaWxlRGF0YShzYW1wbGVzKSB7XG4gICAgLy8gZ2V0IGxlbmd0aFxuICAgIGxldCBsZW5ndGggPSAwO1xuICAgIGZvcihsZXQgaSA9IDAsayA9IHNhbXBsZXMubGVuZ3RoOyBpIDwgazsgaSsrKSB7XG4gICAgICBsZW5ndGggKz0gc2FtcGxlc1tpXS5ieXRlTGVuZ3RoO1xuICAgIH1cblxuICAgIGxldCByZXQgPSBuZXcgVWludDhBcnJheShsZW5ndGgpO1xuICAgIGxldCBvZmZzZXQgPSAwO1xuICAgIC8vIGNvbWJpbGUgZGF0YTtcbiAgICBmb3IobGV0IGkgPSAwLGsgPSBzYW1wbGVzLmxlbmd0aDsgaSA8IGs7IGkrKykge1xuICAgICAgcmV0LnNldChzYW1wbGVzW2ldLCBvZmZzZXQpO1xuICAgICAgb2Zmc2V0ICs9IHNhbXBsZXNbaV0uYnl0ZUxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIHN0YXRpYyBnZXRBZHRzKG1ldGEsIGRhdGEpIHtcbiAgICBsZXQgYWR0cyA9IG5ldyBVaW50OEFycmF5KDcpO1xuXG4gICAgLy8g6K6+572u5ZCM5q2l5L2NIDB4ZmZmIDEyYml0XG4gICAgYWR0c1swXSA9IDB4ZmY7XG4gICAgYWR0c1sxXSA9IDB4ZjA7XG5cbiAgICAvLyBPYmplY3QgZGF0YSAo5rKh5LuA5LmI5Lq655SoTVBFRy0y5LqG77yMSExT5ZKMRkxW5Lmf5YWo5pivTVBFRy0077yM6L+Z6YeM55u05o6lMCkgIDFiaXRcbiAgICAvLyBMZXZlbCBhbHdheXMgMDAgMmJpdFxuICAgIC8vIENSQyBhbHdheXMgMSAxYml0XG4gICAgYWR0c1sxXSA9IGFkdHNbMV0gfCAweDAxO1xuXG4gICAgLy8gcHJvZmlsZSAyYml0XG4gICAgYWR0c1syXSA9IDB4YzAgJiAoKG1ldGEub2JqZWN0VHlwZS0xKSA8PCA2KTtcblxuICAgIC8vc2FtcGxlRnJlcXVlbmN5SW5kZXhcbiAgICBhZHRzWzJdID0gYWR0c1syXSB8ICgweDNjICYgKG1ldGEuc2FtcGxlUmF0ZUluZGV4IDw8IDIpKVxuXG4gICAgLy9wcml2YXRlIGJpdCAwIDFiaXRcbiAgICAvLyBjaGFuZWwgY29uZmlndXJhdGlvbiAzYml0XG4gICAgYWR0c1syXSA9IGFkdHNbMl0gfCAoMHgwMSAmIG1ldGEuY2hhbm5lbENvdW50ID4+IDIpO1xuICAgIGFkdHNbM10gPSAweGMwICYgKG1ldGEuY2hhbm5lbENvdW50IDw8IDYpO1xuXG4gICAgLy8gb3JpZ2luYWxfY29weTogMCAxYml0XG4gICAgLy8gaG9tZTogMCAxYml0XG5cbiAgICAvLyBhZHRzX3ZhcmlhYmxlX2hlYWRlcigpXG4gICAgLy8gY29weXJpZ2h0ZWRfaWRfYml0IDAgMWJpdFxuICAgIC8vIGNvcHlyaWdodGVkX2lkX3N0YXJ0IDAgMWJpdFxuXG4gICAgLy8gYWFjX2ZyYW1lX2xlbmd0aCAxM2JpdDtcbiAgICBsZXQgYWFjZnJhbWVsZW5ndGggPSBkYXRhLmJ5dGVMZW5ndGggKyA3O1xuXG4gICAgYWR0c1szXSA9IGFkdHNbM10gfCAoMHgwMyAmIGFhY2ZyYW1lbGVuZ3RoID4+IDExKTtcbiAgICBhZHRzWzRdID0gMHhmZiAmIChhYWNmcmFtZWxlbmd0aCA+PiAzKTtcbiAgICBhZHRzWzVdID0gMHhlMCAmIChhYWNmcmFtZWxlbmd0aCA8PCA1KTtcblxuICAgIC8vIGFkdHNfYnVmZmVyX2Z1bGxuZXNzIDB4N2ZmIDExYml0XG4gICAgYWR0c1s1XSA9IGFkdHNbNV0gfCAweDFmXG4gICAgYWR0c1s2XSA9IDB4ZmM7XG5cbiAgICAvLyBudW1iZXJfb2ZfcmF3X2RhdGFfYmxvY2tzX2luX2ZyYW1lIDAgMmJpdDtcbiAgICByZXR1cm4gYWR0cztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBdWRpb0N0eDtcbiIsImltcG9ydCBWaWRlb0N0eCBmcm9tICcuL3ZpZGVvLWNvbnRleHQnO1xuaW1wb3J0IEF1ZGlvQ3R4IGZyb20gJy4vYXVkaW8tY29udGV4dCc7XG5pbXBvcnQgeyBnZXRUaWNrZXIgfSBmcm9tICcuL3RpY2tlcic7XG5cbi8qKlxuICog6Z+z55S75ZCM5q2l6LCD5ZKM5ZmoXG4gKi9cbmNsYXNzIEFWUmVjb25jaWxlciB7XG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHRoaXMuYUN0eCA9IHByb3BzLmFDdHg7XG4gICAgdGhpcy52Q3R4ID0gcHJvcHMudkN0eDtcblxuICAgIHRoaXMudGltZW91dElkID0gbnVsbFxuICAgIHRoaXMuc3RhcnQgPSBudWxsXG4gIH1cblxuICBkb1JlY29uY2lsZSAoKSB7XG4gICAgY29uc3QgdkN1clRpbWUgPSB0aGlzLnZDdHguY3VycmVudFRpbWUgfHwgMDtcbiAgICBjb25zdCBhQ3VyVGltZSA9ICh0aGlzLmFDdHguY3VycmVudFRpbWUgfHwgMCkgKiAxMDAwO1xuXG4gICAgY29uc3QgZ2FwID0gdkN1clRpbWUgLSBhQ3VyVGltZTtcbiAgICBpZiAodGhpcy50aW1lb3V0SWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGdhcCA+IDIwMCkgeyAvLyBhdWRpbyBkZWxheWVkIGZvciBtb3JlIHRoYW4gMTAwbXNcbiAgICAgIHRoaXMuc3RhcnQgKz0gZ2FwXG4gICAgICB0aGlzLnZDdHgucGF1c2UoKVxuICAgICAgdGhpcy50aW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy52Q3R4LnBsYXkoKVxuICAgICAgICB0aGlzLnRpbWVvdXRJZCA9IG51bGxcbiAgICAgIH0sIGdhcClcbiAgICB9IGVsc2UgaWYgKGdhcCA8IC0xMjApIHtcbiAgICAgIHRoaXMudkN0eC5jdXJyZW50VGltZSA9IHRoaXMudkN0eC5jdXJyZW50VGltZSArIE1hdGguYWJzKGdhcCk7XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5hQ3R4ID0gbnVsbFxuICAgIHRoaXMudkN0eCA9IG51bGxcbiAgfVxufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbmNsYXNzIE1vYmlsZVZpZGVvIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvciAoY29uZmlnKSB7XG4gICAgc3VwZXIoKTtcbiAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgIHRoaXMudkN0eCA9IG5ldyBWaWRlb0N0eCgpO1xuICAgIHRoaXMuYUN0eCA9IG5ldyBBdWRpb0N0eChjb25maWcpO1xuICAgIHRoaXMudGlja2VyID0gbmV3IChnZXRUaWNrZXIoKSkoKVxuICAgIHRoaXMuaGlzdG9yeVRpbWUgPSAwO1xuICAgIHRoaXMucmVjb25jaWxlciA9IG5ldyBBVlJlY29uY2lsZXIoe1xuICAgICAgdkN0eDogdGhpcy52Q3R4LFxuICAgICAgYUN0eDogdGhpcy5hQ3R4XG4gICAgfSlcbiAgICB0aGlzLmhhbmRsZUF1ZGlvU291cmNlRW5kID0gdGhpcy5oYW5kbGVBdWRpb1NvdXJjZUVuZC5iaW5kKHRoaXMpXG4gICAgdGhpcy5pbml0KClcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIHRoaXMudkN0eC5vbmNhbnBsYXkgPSAoKSA9PiB7XG4gICAgICB0aGlzLmFwcGVuZENoaWxkKHRoaXMudkN0eC5jYW52YXMpO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjYW5wbGF5JykpO1xuICAgIH1cblxuICAgIHRoaXMudGlja2VyLnN0YXJ0KCgpID0+IHtcbiAgICAgIC8vXG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmFDdHguY3VycmVudFRpbWUpXG4gICAgICBpZiAoIXRoaXMuc3RhcnQpIHtcbiAgICAgICAgdGhpcy5zdGFydCA9IERhdGUubm93KClcbiAgICAgIH1cbiAgICAgIHRoaXMudkN0eC5fb25UaW1lcihEYXRlLm5vdygpIC0gdGhpcy5zdGFydClcbiAgICB9KVxuXG4gICAgdGhpcy5hQ3R4Lm9uKCdBVURJT19TT1VSQ0VfRU5EJywgdGhpcy5oYW5kbGVBdWRpb1NvdXJjZUVuZClcbiAgfVxuXG4gIGhhbmRsZUF1ZGlvU291cmNlRW5kICgpIHtcbiAgICB0aGlzLnJlY29uY2lsZXIuZG9SZWNvbmNpbGUoKVxuICB9XG5cbiAgX2NsZWFuQnVmZmVyICgpIHtcbiAgICB0aGlzLnZDdHguY2xlYW5CdWZmZXIoKVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5yZWNvbmNpbGVyLmRlc3Ryb3koKVxuICB9XG5cbiAgb25EZW11eENvbXBsZXRlICh2aWRlb1RyYWNrLCBhdWRpb1RyYWNrKSB7XG4gICAgdGhpcy5hQ3R4LmRlY29kZUF1ZGlvKGF1ZGlvVHJhY2spO1xuICAgIHRoaXMudkN0eC5kZWNvZGVWaWRlbyh2aWRlb1RyYWNrKTtcbiAgfVxuXG4gIHNldEF1ZGlvTWV0YSAobWV0YSkge1xuICAgIHRoaXMuYUN0eC5zZXRBdWRpb01ldGFEYXRhKG1ldGEpO1xuICB9XG5cbiAgc2V0VmlkZW9NZXRhIChtZXRhKSB7XG4gICAgdGhpcy52Q3R4LnNldFZpZGVvTWV0YURhdGEobWV0YSk7XG4gIH1cblxuICBnZXQgY3VycmVudFRpbWUgKCkge1xuXG4gIH1cblxuICBwbGF5ICgpIHtcbiAgICAvLyBpZiAoIXRoaXMudkN0eC4pXG4gICAgdGhpcy52Q3R4LnBsYXkoKTtcbiAgICB0aGlzLmFDdHgucGxheSgpO1xuICB9XG59XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbW9iaWxlLXZpZGVvJywgTW9iaWxlVmlkZW8pO1xuIiwiY2xhc3MgU291cmNlQnVmZmVyIHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZykge1xuICAgIHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnKTtcbiAgICB0aGlzLnR5cGUgPSB0aGlzLmNvbmZpZy50eXBlO1xuICAgIHRoaXMuYnVmZmVyID0gW107XG4gICAgdGhpcy5jdXJyZW50R29wID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2xhc3RHZXQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBwdXNoIChmcmFtZSkge1xuICAgIGlmICh0aGlzLnR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgIGlmIChmcmFtZS5pc0tleWZyYW1lKSB7XG4gICAgICAgIGxldCBjdXJyZW50R29wID0ge1xuICAgICAgICAgIHNhbXBsZXM6IFtdLFxuICAgICAgICAgIHN0YXJ0OiBmcmFtZS5kdHMsXG4gICAgICAgICAgZW5kOiBmcmFtZS5kdHMsXG4gICAgICAgICAgbmV4dEdvcDogdW5kZWZpbmVkXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRHb3ApIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRHb3AubmV4dEdvcCA9IGN1cnJlbnRHb3A7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50R29wID0gY3VycmVudEdvcDtcbiAgICAgICAgdGhpcy5idWZmZXIucHVzaCh0aGlzLmN1cnJlbnRHb3ApO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jdXJyZW50R29wKSB7XG4gICAgICAgIHRoaXMuY3VycmVudEdvcC5zYW1wbGVzLnB1c2goZnJhbWUpO1xuXG4gICAgICAgIGlmIChmcmFtZS5kdHMgPCB0aGlzLmN1cnJlbnRHb3Auc3RhcnQpIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRHb3Auc3RhcnQgPSBmcmFtZS5kdHM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZnJhbWUuZHRzID4gdGhpcy5jdXJyZW50R29wLmVuZCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudEdvcC5lbmQgPSBmcmFtZS5kdHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQgKHRpbWUpIHtcbiAgICBpZiAodGhpcy50eXBlID09PSAndmlkZW8nKSB7XG4gICAgICBpZiAodGhpcy5idWZmZXIubGVuZ3RoIDwgMSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0aW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbGV0IHNhbXBsZSA9IHRoaXMuX2dldE5leHQoKTtcbiAgICAgICAgcmV0dXJuIHNhbXBsZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfZ2V0TmV4dCAoKSB7XG4gICAgaWYgKCF0aGlzLl9sYXN0R2V0KSB7XG4gICAgICBsZXQgZ29wID0gdGhpcy5idWZmZXJbMF07XG4gICAgICBpZiAoZ29wLnNhbXBsZXMubGVuZ3RoIDwgMSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgdGhpcy5fbGFzdEdldCA9IHtcbiAgICAgICAgZ29wLFxuICAgICAgICBpbmRleDogMFxuICAgICAgfVxuICAgICAgcmV0dXJuIGdvcC5zYW1wbGVzWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZ29wID0gdGhpcy5fbGFzdEdldC5nb3A7XG4gICAgICBsZXQgc2FtcGxlID0gZ29wLnNhbXBsZXNbdGhpcy5fbGFzdEdldC5pbmRleCArIDFdO1xuICAgICAgaWYgKHNhbXBsZSkge1xuICAgICAgICB0aGlzLl9sYXN0R2V0LmluZGV4ID0gdGhpcy5fbGFzdEdldC5pbmRleCArIDE7XG4gICAgICAgIHJldHVybiBzYW1wbGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnb3AgPSBnb3AubmV4dEdvcDtcbiAgICAgICAgaWYgKCFnb3AgfHwgZ29wLnNhbXBsZXMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzYW1wbGUgPSBnb3Auc2FtcGxlc1swXTtcbiAgICAgICAgdGhpcy5fbGFzdEdldCA9IHtcbiAgICAgICAgICBnb3AsXG4gICAgICAgICAgaW5kZXg6IDBcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2FtcGxlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZSAoc3RhcnQsIGVuZCkge1xuICAgIGlmICh0aGlzLmJ1ZmZlci5sZW5ndGggPCAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCBnb3AgPSB0aGlzLmJ1ZmZlclswXTtcbiAgICB3aGlsZSAoZ29wKSB7XG4gICAgICBpZiAoZ29wLmVuZCA8IGVuZCAmJiBnb3Auc3RhcnQgPj0gc3RhcnQpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuYnVmZmVyW2ldO1xuICAgICAgICBnb3AgPSB0aGlzLmJ1ZmZlcltpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGkgKz0gMTtcbiAgICAgICAgZ29wID0gdGhpcy5idWZmZXJbaV07XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNvdXJjZUJ1ZmZlcjtcbiIsIi8qKlxuICogQGF1dGhvciBmdXl1aGFvQGJ5dGVkYW5jZS5jb21cbiAqL1xuXG5jbGFzcyBUaWNrZXIge1xuICBjb25zdHJ1Y3RvciAob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMgfHwge30sIHtcbiAgICAgIGludGVydmFsOiAxNlxuICAgIH0pXG5cbiAgICB0aGlzLmNhbGxiYWNrcyA9IFtdXG4gIH1cblxuICBzdGFydCguLi5jYWxsYmFja3MpIHtcbiAgICB0aGlzLmNhbGxiYWNrcyA9IGNhbGxiYWNrc1xuICB9XG5cbiAgb25UaWNrICgpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5jYWxsYmFja3MubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IGNhbGxiYWNrID0gdGhpcy5jYWxsYmFja3NbaV1cbiAgICAgIGNhbGxiYWNrKClcbiAgICB9XG4gIH1cblxuICBzZXRJbnRlcnZhbCAoaW50ZXJ2YWwpIHtcbiAgICB0aGlzLm9wdGlvbnMuaW50ZXJ2YWwgPSBpbnRlcnZhbFxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbi8qKlxuICogdGlja2VyIHVzZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAqL1xuY2xhc3MgUmFmVGlja2VyIGV4dGVuZHMgVGlja2VyIHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMucHJldiA9IG51bGw7XG4gICAgdGhpcy50aW1lcklkID0gbnVsbFxuICAgIHRoaXMuX3N1YlRpbWVySWQgPSBudWxsXG5cbiAgICB0aGlzLl90aWNrRnVuYyA9IFJhZlRpY2tlci5nZXRUaWNrRnVuYygpXG4gICAgdGhpcy50aWNrID0gdGhpcy50aWNrLmJpbmQodGhpcylcbiAgfVxuXG4gIHN0YXJ0ICguLi5jYWxsYmFja3MpIHtcbiAgICBzdXBlci5zdGFydCguLi5jYWxsYmFja3MpXG4gICAgdGhpcy50aWNrKClcbiAgfVxuXG4gIHRpY2sgKHRpbWVzdGFtcCkge1xuICAgIHRoaXMubmV4dFRpY2soKTtcbiAgICB0aGlzLm9uVGljaygpXG4gIH1cblxuICBuZXh0VGljayAoKSB7XG4gICAgY29uc3QgeyBfdGlja0Z1bmMgfSA9IHRoaXM7XG4gICAgdGhpcy50aW1lcklkID0gX3RpY2tGdW5jKHRoaXMudGljaylcbiAgfVxuXG4gIHN0b3AgKCkge1xuICAgIGlmICh0aGlzLnRpbWVySWQpIHtcbiAgICAgIGNvbnN0IGNhbmNlbEZ1bmMgPSBSYWZUaWNrZXIuZ2V0Q2FuY2VsRnVuYygpXG5cbiAgICAgIGNhbmNlbEZ1bmModGhpcy50aW1lcklkKVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRUaWNrRnVuYyAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZVxuICB9XG5cbiAgc3RhdGljIGdldENhbmNlbEZ1bmMgKCkge1xuICAgIHJldHVybiB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgd2luZG93LndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lXG4gIH1cblxuICBzdGF0aWMgaXNTdXBwb3J0ZWQgKCkge1xuICAgIHJldHVybiBSYWZUaWNrZXIuZ2V0VGlja0Z1bmMoKSAhPT0gdW5kZWZpbmVkXG4gIH1cbn1cblxuLyoqXG4gKiB1c2Ugc2V0VGltZW91dCBmb3IgYnJvd3NlcnMgd2l0aG91dCByYWYgc3VwcG9ydFxuICovXG5jbGFzcyBUaW1lb3V0VGlja2VyIGV4dGVuZHMgVGlja2VyIHtcbiAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgc3VwZXIoY29uZmlnKVxuICAgIHRoaXMudGltZW91dElkID0gbnVsbFxuXG4gIH1cblxuICBzdGFydCAoLi4uY2FsbGJhY2tzKSB7XG4gICAgc3VwZXIubmV4dFRpY2soLi4uY2FsbGJhY2tzKVxuICAgIHRoaXMudGltZW91dElkID0gd2luZG93LnNldEludGVydmFsKCgpID0+IHtcbiAgICAgIHRoaXMub25UaWNrKCk7XG4gICAgfSwgdGhpcy5vcHRpb25zLmludGVydmFsIHx8IDE2KVxuICB9XG5cbiAgc3RvcCAoKSB7XG4gICAgaWYgKHRoaXMudGltZW91dElkKSB7XG4gICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVvdXRJZClcbiAgICB9XG4gIH1cblxufVxuXG4vKipcbiAqIOi/lOWbnlRpY2tlcuaehOmAoOWHveaVsFxuICogQHJldHVybnMge1RpY2tlcn1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFRpY2tlciA9ICgpID0+IHtcbiAgaWYgKFJhZlRpY2tlci5pc1N1cHBvcnRlZCgpKSB7XG4gICAgcmV0dXJuIFJhZlRpY2tlclxuICB9IGVsc2Uge1xuICAgIHJldHVybiBUaW1lb3V0VGlja2VyXG4gIH1cbn1cbiIsImltcG9ydCBXb3JrZXJpZnkgZnJvbSAnd2Vid29ya2lmeS13ZWJwYWNrJ1xuaW1wb3J0IFN0cmVhbSBmcm9tICcuLi93cml0ZS9zdHJlYW0nO1xuaW1wb3J0IE5hbHVuaXQgZnJvbSAnLi4vLi4vLi4veGdwbGF5ZXItY29kZWMvc3JjL2gyNjQvbmFsdW5pdCc7XG5pbXBvcnQgWVVWQ2FudmFzIGZyb20gJy4veXV2LWNhbnZhcyc7XG5pbXBvcnQgU291cmNlQnVmZmVyIGZyb20gJy4vc291cmNlYnVmZmVyJztcbmNsYXNzIFZpZGVvQ2FudmFzIHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZykge1xuICAgIHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnKTtcbiAgICB0aGlzLmNhbnZhcyA9IHRoaXMuY29uZmlnLmNhbnZhcyA/IHRoaXMuY29uZmlnLmNhbnZhcyA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIHRoaXMuc291cmNlID0gbmV3IFNvdXJjZUJ1ZmZlcih7dHlwZTogJ3ZpZGVvJ30pO1xuICAgIHRoaXMucHJlbG9hZFRpbWUgPSB0aGlzLmNvbmZpZy5wcmVsb2FkVGltZSB8fCAzO1xuICAgIHRoaXMub25jYW5wbGF5ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMub25GaXJzdEZyYW1lID0gdW5kZWZpbmVkO1xuICAgIHRoaXMubWV0YSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnJlYWR5U3RhdHVzID0gMDtcbiAgICB0aGlzLnBhdXNlZCA9IHRydWU7XG4gICAgdGhpcy5jb3VudCA9IDA7XG4gICAgdGhpcy5jdXJyZW50VGltZSA9IDA7XG4gICAgdGhpcy5sYXN0UGxheWVkID0gMDtcblxuICAgIHRoaXMuX2RlY29kZXJJbml0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9hdmNjcHVzaGVkID0gZmFsc2U7XG4gICAgdGhpcy5fZGVjb2RlZEZyYW1lcyA9IHt9O1xuICAgIHRoaXMuX2xhc3RTYW1wbGVEdHMgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fYmFzZUR0cyA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9sYXN0UmVuZGVyVGltZSA9IG51bGxcbiAgfVxuXG4gIHBhdXNlICgpIHtcbiAgICB0aGlzLnBhdXNlZCA9IHRydWU7XG4gIH1cblxuICBpbml0V2FzbVdvcmtlciAoKSB7XG4gICAgbGV0IF90aGlzID0gdGhpcztcbiAgICB0aGlzLndhc213b3JrZXIgPSBXb3JrZXJpZnkocmVxdWlyZS5yZXNvbHZlKCcuL3dvcmtlci5qcycpKTtcbiAgICB0aGlzLndhc213b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgbXNnOiAnaW5pdCcsXG4gICAgICBtZXRhOiB0aGlzLm1ldGFcbiAgICB9KVxuICAgIHRoaXMud2FzbXdvcmtlci5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbXNnID0+IHtcbiAgICAgIHN3aXRjaCAobXNnLmRhdGEubXNnKSB7XG4gICAgICAgIGNhc2UgJ0RFQ09ERVJfUkVBRFknOlxuICAgICAgICAgIF90aGlzLl9kZWNvZGVySW5pdGVkID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnREVDT0RFRCc6XG4gICAgICAgICAgdGhpcy5fb25EZWNvZGVkKG1zZy5kYXRhKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNldFZpZGVvTWV0YURhdGEgKG1ldGEpIHtcbiAgICB0aGlzLm1ldGEgPSBtZXRhO1xuICAgIGlmICghdGhpcy5fZGVjb2RlckluaXRlZCkge1xuICAgICAgdGhpcy5pbml0V2FzbVdvcmtlcigpO1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuX2F2Y2NwdXNoZWQgPSB0cnVlO1xuICAgIGxldCBkYXRhID0gbmV3IFVpbnQ4QXJyYXkobWV0YS5zcHMuYnl0ZUxlbmd0aCArIDQpO1xuICAgIGRhdGEuc2V0KFswLCAwLCAwLCAxXSlcbiAgICBkYXRhLnNldChtZXRhLnNwcywgNCk7XG4gICAgdGhpcy53YXNtd29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgIG1zZzogJ2RlY29kZScsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSlcblxuICAgIGRhdGEgPSBuZXcgVWludDhBcnJheShtZXRhLnBwcy5ieXRlTGVuZ3RoICsgNCk7XG4gICAgZGF0YS5zZXQoWzAsIDAsIDAsIDFdKVxuICAgIGRhdGEuc2V0KG1ldGEucHBzLCA0KTtcbiAgICB0aGlzLndhc213b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgbXNnOiAnZGVjb2RlJyxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KVxuXG4gICAgaWYgKCF0aGlzLnl1dkNhbnZhcykge1xuICAgICAgbGV0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe21ldGEsIGNhbnZhczogdGhpcy5jYW52YXN9LCB0aGlzLmNvbmZpZyk7XG4gICAgICB0aGlzLnl1dkNhbnZhcyA9IG5ldyBZVVZDYW52YXMoY29uZmlnKTtcbiAgICB9XG4gICAgdGhpcy5yZWFkeVN0YXR1cyA9IDE7XG4gIH1cblxuICBkZWNvZGVWaWRlbyAodmlkZW9UcmFjaykge1xuICAgIGlmICghdGhpcy5fZGVjb2RlckluaXRlZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9hdmNjcHVzaGVkKSB7XG4gICAgICB0aGlzLnNldFZpZGVvTWV0YURhdGEodGhpcy5tZXRhKTtcbiAgICB9XG4gICAgbGV0IHsgc2FtcGxlcyB9ID0gdmlkZW9UcmFjaztcbiAgICBsZXQgc2FtcGxlID0gc2FtcGxlcy5zaGlmdCgpO1xuXG4gICAgd2hpbGUgKHNhbXBsZSkge1xuICAgICAgaWYgKCF0aGlzLl9iYXNlRHRzKSB7XG4gICAgICAgIHRoaXMuX2Jhc2VEdHMgPSBzYW1wbGUuZHRzO1xuICAgICAgfVxuICAgICAgdGhpcy5zb3VyY2UucHVzaChzYW1wbGUpO1xuICAgICAgc2FtcGxlID0gc2FtcGxlcy5zaGlmdCgpO1xuICAgIH1cblxuICAgIHRoaXMuX3ByZWxvYWQoKTtcbiAgfVxuXG4gIF9wcmVsb2FkICgpIHtcbiAgICBpZiAoIXRoaXMuX2xhc3RTYW1wbGVEdHMgfHwgdGhpcy5fbGFzdFNhbXBsZUR0cyAtIHRoaXMuX2Jhc2VEdHMgPCB0aGlzLmN1cnJlbnRUaW1lICsgdGhpcy5wcmVsb2FkVGltZSAqIDEwMDApIHtcbiAgICAgIGxldCBzYW1wbGUgPSB0aGlzLnNvdXJjZS5nZXQoKTtcbiAgICAgIGlmIChzYW1wbGUpIHtcbiAgICAgICAgdGhpcy5fbGFzdFNhbXBsZUR0cyA9IHNhbXBsZS5kdHM7XG4gICAgICAgIHRoaXMuX2FuYWx5c2VOYWwoc2FtcGxlKTtcbiAgICAgIH1cblxuICAgICAgd2hpbGUgKHNhbXBsZSAmJiB0aGlzLl9sYXN0U2FtcGxlRHRzIC0gdGhpcy5fYmFzZUR0cyA8IHRoaXMuY3VycmVudFRpbWUgKyB0aGlzLnByZWxvYWRUaW1lICogMTAwMCkge1xuICAgICAgICBzYW1wbGUgPSB0aGlzLnNvdXJjZS5nZXQoKTtcbiAgICAgICAgaWYgKHNhbXBsZSkge1xuICAgICAgICAgIHRoaXMuX2FuYWx5c2VOYWwoc2FtcGxlKTtcbiAgICAgICAgICB0aGlzLl9sYXN0U2FtcGxlRHRzID0gc2FtcGxlLmR0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9hbmFseXNlTmFsIChzYW1wbGUpIHtcbiAgICBsZXQgbmFscyA9IE5hbHVuaXQuZ2V0QXZjY05hbHMobmV3IFN0cmVhbShzYW1wbGUuZGF0YS5idWZmZXIpKTtcblxuICAgIGxldCBsZW5ndGggPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmFscy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IG5hbCA9IG5hbHNbaV07XG4gICAgICBsZW5ndGggKz0gbmFsLmJvZHkuYnl0ZUxlbmd0aCArIDQ7XG4gICAgfVxuICAgIGxldCBvZmZzZXQgPSAwO1xuICAgIGxldCBkYXRhID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBuYWwgPSBuYWxzW2ldO1xuICAgICAgZGF0YS5zZXQoWzAsIDAsIDAsIDFdLCBvZmZzZXQpO1xuICAgICAgb2Zmc2V0ICs9IDQ7XG4gICAgICBkYXRhLnNldChuZXcgVWludDhBcnJheShuYWwuYm9keSksIG9mZnNldCk7XG4gICAgICBvZmZzZXQgKz0gbmFsLmJvZHkuYnl0ZUxlbmd0aDtcbiAgICB9XG4gICAgdGhpcy53YXNtd29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgIG1zZzogJ2RlY29kZScsXG4gICAgICBkYXRhOiBkYXRhLFxuICAgICAgaW5mbzoge1xuICAgICAgICBkdHM6IHNhbXBsZS5kdHMsXG4gICAgICAgIHB0czogc2FtcGxlLnB0cyA/IHNhbXBsZS5wdHMgOiBzYW1wbGUuZHRzICsgc2FtcGxlLmN0cyxcbiAgICAgICAga2V5OiBzYW1wbGUuaXNLZXlmcmFtZVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBfb25EZWNvZGVkIChkYXRhKSB7XG4gICAgbGV0IHtkdHN9ID0gZGF0YS5pbmZvXG4gICAgdGhpcy5fZGVjb2RlZEZyYW1lc1tkdHNdID0gZGF0YTtcbiAgfVxuXG4gIHBsYXkgKCkge1xuICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XG4gICAgdGhpcy5fb25UaW1lcigpO1xuICB9XG5cbiAgX29uVGltZXIgKGN1cnJlbnRUaW1lKSB7XG4gICAgaWYgKHRoaXMucGF1c2VkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLm1ldGEpIHtcbiAgICAgIGlmICh0aGlzLm1ldGEuZnJhbWVSYXRlICYmIHRoaXMubWV0YS5mcmFtZVJhdGUuZml4ZWQgJiYgdGhpcy5tZXRhLmZyYW1lUmF0ZS5mcHMpIHtcbiAgICAgIH1cbiAgICAgIGxldCBmcmFtZVRpbWVzID0gT2JqZWN0LmtleXModGhpcy5fZGVjb2RlZEZyYW1lcyk7XG4gICAgICBpZiAoZnJhbWVUaW1lcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRpbWUgPSBjdXJyZW50VGltZTtcbiAgICAgICAgbGV0IGZyYW1lVGltZSA9IC0xO1xuICAgICAgICBsZXQgY3VycmVudElkeCA9IDBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmcmFtZVRpbWVzLmxlbmd0aCAmJiBOdW1iZXIucGFyc2VJbnQoZnJhbWVUaW1lc1tpXSkgLSB0aGlzLl9iYXNlRHRzIDw9IHRoaXMuY3VycmVudFRpbWU7IGkrKykge1xuICAgICAgICAgIGZyYW1lVGltZSA9IE51bWJlci5wYXJzZUludChmcmFtZVRpbWVzW2kgLSAxXSk7XG4gICAgICAgICAgY3VycmVudElkeCA9IGk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZnJhbWUgPSB0aGlzLl9kZWNvZGVkRnJhbWVzW2ZyYW1lVGltZV07XG4gICAgICAgIGlmIChmcmFtZSkge1xuICAgICAgICAgIGlmICh0aGlzLm9uY2FucGxheSAmJiB0aGlzLnJlYWR5U3RhdHVzIDwgNCkge1xuICAgICAgICAgICAgdGhpcy5vbmNhbnBsYXkoKTtcbiAgICAgICAgICAgIHRoaXMucmVhZHlTdGF0dXMgPSA0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zb2xlLmxvZyhmcmFtZVRpbWUpXG4gICAgICAgICAgdGhpcy55dXZDYW52YXMucmVuZGVyKGZyYW1lLmJ1ZmZlciwgZnJhbWUud2lkdGgsIGZyYW1lLmhlaWdodCk7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50SWR4OyBpKyspIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9kZWNvZGVkRnJhbWVzW2ldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9sYXN0UmVuZGVyVGltZSA9IERhdGUubm93KClcbiAgfVxuXG4gIGNsZWFuQnVmZmVyICgpIHtcbiAgICB0aGlzLnNvdXJjZS5yZW1vdmUoMCwgdGhpcy5jdXJyZW50VGltZSk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFZpZGVvQ2FudmFzO1xuIiwiY29uc3QgTUFYX1NUUkVBTV9CVUZGRVJfTEVOR1RIID0gMTAyNCAqIDEwMjQ7XG52YXIgRGVjb2RlciA9IGZ1bmN0aW9uIChzZWxmKSB7XG4gIHRoaXMuaW5pdGVkID0gZmFsc2U7XG4gIHRoaXMuc2VsZiA9IHNlbGY7XG4gIHRoaXMubWV0YSA9IHRoaXMuc2VsZi5tZXRhO1xuICB0aGlzLmluZm9saXN0ID0ge307XG4gIHNlbGYucGFyX2Jyb2Fkd2F5T25Ccm9hZHdheUluaXRlZCA9IHRoaXMuYnJvYWR3YXlPbkJyb2Fkd2F5SW5pdGVkLmJpbmQodGhpcyk7XG4gIHNlbGYucGFyX2Jyb2Fkd2F5T25QaWN0dXJlRGVjb2RlZCA9IHRoaXMuYnJvYWR3YXlPblBpY3R1cmVEZWNvZGVkLmJpbmQodGhpcyk7XG59XG5cbkRlY29kZXIucHJvdG90eXBlLnRvVThBcnJheSA9IGZ1bmN0aW9uIChwdHIsIGxlbmd0aCkge1xuICByZXR1cm4gdGhpcy5zZWxmLkhFQVBVOC5zdWJhcnJheShwdHIsIHB0ciArIGxlbmd0aCk7XG59XG5cbkRlY29kZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIE1vZHVsZS5fYnJvYWR3YXlJbml0KCk7XG4gIHRoaXMuc3RyZWFtQnVmZmVyID0gdGhpcy50b1U4QXJyYXkoTW9kdWxlLl9icm9hZHdheUNyZWF0ZVN0cmVhbShNQVhfU1RSRUFNX0JVRkZFUl9MRU5HVEgpLCBNQVhfU1RSRUFNX0JVRkZFUl9MRU5HVEgpO1xufVxuXG5EZWNvZGVyLnByb3RvdHlwZS5icm9hZHdheU9uUGljdHVyZURlY29kZWQgPSBmdW5jdGlvbiAob2Zmc2V0LCB3aWR0aCwgaGVpZ2h0LCBpbmZvaWQpIHtcbiAgbGV0IGluZm8gPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmluZm9saXN0W2luZm9pZF0pO1xuICBsZXQgcmVmID0gMztcbiAgaWYgKHRoaXMubWV0YS5jaHJvbWFGb3JtYXQgPT09IDQyMCkge1xuICAgIHJlZiA9IDEuNTtcbiAgfSBlbHNlIGlmICh0aGlzLm1ldGEuY2hyb21hRm9ybWF0ID09PSA0MjIpIHtcbiAgICByZWYgPSAyO1xuICB9XG4gIGxldCBkYXRhID0gdGhpcy50b1U4QXJyYXkob2Zmc2V0LCB3aWR0aCAqIGhlaWdodCAqIHJlZik7XG4gIHRoaXMuaW5mb2xpc3RbaW5mb2lkXSA9IG51bGw7XG4gIGxldCBkYXRldGVtcCA9IG5ldyBVaW50OEFycmF5KGRhdGEubGVuZ3RoKTtcbiAgZGF0ZXRlbXAuc2V0KGRhdGEpO1xuICBsZXQgYnVmZmVyID0gZGF0ZXRlbXAuYnVmZmVyO1xuICB0aGlzLnNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgIG1zZzogJ0RFQ09ERUQnLFxuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICBpbmZvLFxuICAgIGJ1ZmZlclxuICB9LCBbYnVmZmVyXSk7XG59XG5cbkRlY29kZXIucHJvdG90eXBlLmJyb2Fkd2F5T25Ccm9hZHdheUluaXRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5pbml0ZWQgPSB0cnVlO1xuICB0aGlzLnNlbGYucG9zdE1lc3NhZ2Uoe21zZzogJ0RFQ09ERVJfUkVBRFknfSk7XG59XG5cbkRlY29kZXIucHJvdG90eXBlLmRlY29kZSA9IGZ1bmN0aW9uIChkYXRhLCBpbmZvKSB7XG4gIGxldCB0aW1lID0gcGFyc2VJbnQobmV3IERhdGUoKS5nZXRUaW1lKCkpO1xuICBsZXQgaW5mb2lkID0gdGltZSAtIChNYXRoLmZsb29yKHRpbWUgLyAxMGU4KSAqIDEwZTgpO1xuICB0aGlzLmluZm9saXN0W2luZm9pZF0gPSBpbmZvO1xuICB0aGlzLnN0cmVhbUJ1ZmZlci5zZXQoZGF0YSk7XG4gIE1vZHVsZS5fYnJvYWR3YXlQbGF5U3RyZWFtKGRhdGEubGVuZ3RoLCBpbmZvaWQpO1xufVxuXG52YXIgZGVjb2RlcjtcblxuZnVuY3Rpb24gb25Qb3N0UnVuICgpIHtcbiAgZGVjb2RlciA9IG5ldyBEZWNvZGVyKHRoaXMpO1xuICBkZWNvZGVyLmluaXQoKTtcbn1cblxuZnVuY3Rpb24gaW5pdCAobWV0YSkge1xuICBzZWxmLmltcG9ydFNjcmlwdHMoJ2h0dHBzOi8vc2Y2LXZjbG91ZGNkbi5wc3RhdHAuY29tL29iai90dGZlL21lZGlhL2RlY29kZXIvaDI2NC9kZWNvZGVyLmpzJyk7XG4gIGFkZE9uUG9zdFJ1bihvblBvc3RSdW4uYmluZChzZWxmKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNlbGYpIHtcbiAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgZGF0YSA9IGUuZGF0YTtcbiAgICBpZiAoIWRhdGEubXNnKSB7XG4gICAgICBzZWxmLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgbXNnOiAnRVJST1I6aW52YWxpZCBtZXNzYWdlJ1xuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpdGNoIChkYXRhLm1zZykge1xuICAgICAgICBjYXNlICdpbml0JzpcbiAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICBzZWxmLm1ldGEgPSBkYXRhLm1ldGE7XG4gICAgICAgICAgaW5pdCgpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2RlY29kZSc6XG4gICAgICAgICAgZGVjb2Rlci5kZWNvZGUoZGF0YS5kYXRhLCBkYXRhLmluZm8pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSwgZmFsc2UpO1xufVxuIiwiY2xhc3MgWVVWQ2FudmFzIHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZ3MpIHtcbiAgICB0aGlzLmNvbmZpZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWdzKTtcbiAgICB0aGlzLmNhbnZhcyA9IHRoaXMuY29uZmlncy5jYW52YXM7XG4gICAgdGhpcy5tZXRhID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jb25maWdzLm1ldGEpO1xuICAgIHRoaXMuY2hyb21hID0gdGhpcy5tZXRhLmNocm9tYUZvcm1hdDtcbiAgICB0aGlzLmhlaWdodCA9IHRoaXMubWV0YS5wcmVzZW50SGVpZ2h0O1xuICAgIHRoaXMud2lkdGggPSB0aGlzLm1ldGEucHJlc2VudFdpZHRoO1xuICAgIHRoaXMuY2FudmFzLndpZHRoID0gMTI4MDtcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSA3MjA7XG4gICAgdGhpcy5jYW52YXMuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgdGhpcy5jYW52YXMuc3R5bGUuaGVpZ2h0ID0gJzEwMCUnO1xuICAgIHRoaXMuX2luaXRDb250ZXh0R0woKTtcbiAgICBpZiAodGhpcy5jb250ZXh0R0wpIHtcbiAgICAgIHRoaXMuX2luaXRQcm9ncmFtKCk7XG4gICAgICB0aGlzLl9pbml0QnVmZmVycygpO1xuICAgICAgdGhpcy5faW5pdFRleHR1cmVzKCk7XG4gICAgfTtcbiAgfVxuXG4gIF9pbml0Q29udGV4dEdMICgpIHtcbiAgICB2YXIgY2FudmFzID0gdGhpcy5jYW52YXM7XG4gICAgdmFyIGdsID0gbnVsbDtcblxuICAgIHZhciB2YWxpZENvbnRleHROYW1lcyA9IFsnd2ViZ2wnLCAnZXhwZXJpbWVudGFsLXdlYmdsJywgJ21vei13ZWJnbCcsICd3ZWJraXQtM2QnXTtcbiAgICB2YXIgbmFtZUluZGV4ID0gMDtcblxuICAgIHdoaWxlICghZ2wgJiYgbmFtZUluZGV4IDwgdmFsaWRDb250ZXh0TmFtZXMubGVuZ3RoKSB7XG4gICAgICB2YXIgY29udGV4dE5hbWUgPSB2YWxpZENvbnRleHROYW1lc1tuYW1lSW5kZXhdO1xuXG4gICAgICB0cnkge1xuICAgICAgICBpZiAodGhpcy5jb250ZXh0T3B0aW9ucykge1xuICAgICAgICAgIGdsID0gY2FudmFzLmdldENvbnRleHQoY29udGV4dE5hbWUsIHRoaXMuY29udGV4dE9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdsID0gY2FudmFzLmdldENvbnRleHQoY29udGV4dE5hbWUpO1xuICAgICAgICB9O1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBnbCA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmICghZ2wgfHwgdHlwZW9mIGdsLmdldFBhcmFtZXRlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBnbCA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgICsrbmFtZUluZGV4O1xuICAgIH07XG5cbiAgICB0aGlzLmNvbnRleHRHTCA9IGdsO1xuICB9O1xuXG4gIF9pbml0UHJvZ3JhbSAoKSB7XG4gICAgdmFyIGdsID0gdGhpcy5jb250ZXh0R0w7XG5cbiAgICAvLyB2ZXJ0ZXggc2hhZGVyIGlzIHRoZSBzYW1lIGZvciBhbGwgdHlwZXNcbiAgICB2YXIgdmVydGV4U2hhZGVyU2NyaXB0O1xuICAgIHZhciBmcmFnbWVudFNoYWRlclNjcmlwdDtcbiAgICB2ZXJ0ZXhTaGFkZXJTY3JpcHQgPSBbXG4gICAgICAnYXR0cmlidXRlIHZlYzQgdmVydGV4UG9zOycsXG4gICAgICAnYXR0cmlidXRlIHZlYzQgdGV4dHVyZVBvczsnLFxuICAgICAgJ2F0dHJpYnV0ZSB2ZWM0IHVUZXh0dXJlUG9zOycsXG4gICAgICAnYXR0cmlidXRlIHZlYzQgdlRleHR1cmVQb3M7JyxcbiAgICAgICd2YXJ5aW5nIHZlYzIgdGV4dHVyZUNvb3JkOycsXG4gICAgICAndmFyeWluZyB2ZWMyIHVUZXh0dXJlQ29vcmQ7JyxcbiAgICAgICd2YXJ5aW5nIHZlYzIgdlRleHR1cmVDb29yZDsnLFxuXG4gICAgICAndm9pZCBtYWluKCknLFxuICAgICAgJ3snLFxuICAgICAgJyAgZ2xfUG9zaXRpb24gPSB2ZXJ0ZXhQb3M7JyxcbiAgICAgICcgIHRleHR1cmVDb29yZCA9IHRleHR1cmVQb3MueHk7JyxcbiAgICAgICcgIHVUZXh0dXJlQ29vcmQgPSB1VGV4dHVyZVBvcy54eTsnLFxuICAgICAgJyAgdlRleHR1cmVDb29yZCA9IHZUZXh0dXJlUG9zLnh5OycsXG4gICAgICAnfSdcbiAgICBdLmpvaW4oJ1xcbicpO1xuXG4gICAgZnJhZ21lbnRTaGFkZXJTY3JpcHQgPSBbXG4gICAgICAncHJlY2lzaW9uIGhpZ2hwIGZsb2F0OycsXG4gICAgICAndmFyeWluZyBoaWdocCB2ZWMyIHRleHR1cmVDb29yZDsnLFxuICAgICAgJ3ZhcnlpbmcgaGlnaHAgdmVjMiB1VGV4dHVyZUNvb3JkOycsXG4gICAgICAndmFyeWluZyBoaWdocCB2ZWMyIHZUZXh0dXJlQ29vcmQ7JyxcbiAgICAgICd1bmlmb3JtIHNhbXBsZXIyRCB5U2FtcGxlcjsnLFxuICAgICAgJ3VuaWZvcm0gc2FtcGxlcjJEIHVTYW1wbGVyOycsXG4gICAgICAndW5pZm9ybSBzYW1wbGVyMkQgdlNhbXBsZXI7JyxcbiAgICAgICd1bmlmb3JtIG1hdDQgWVVWMlJHQjsnLFxuXG4gICAgICAndm9pZCBtYWluKHZvaWQpIHsnLFxuICAgICAgJyAgaGlnaHAgZmxvYXQgeSA9IHRleHR1cmUyRCh5U2FtcGxlciwgIHRleHR1cmVDb29yZCkucjsnLFxuICAgICAgJyAgaGlnaHAgZmxvYXQgdSA9IHRleHR1cmUyRCh1U2FtcGxlciwgIHVUZXh0dXJlQ29vcmQpLnI7JyxcbiAgICAgICcgIGhpZ2hwIGZsb2F0IHYgPSB0ZXh0dXJlMkQodlNhbXBsZXIsICB2VGV4dHVyZUNvb3JkKS5yOycsXG4gICAgICAnICBnbF9GcmFnQ29sb3IgPSB2ZWM0KHksIHUsIHYsIDEpICogWVVWMlJHQjsnLFxuICAgICAgJ30nXG4gICAgXS5qb2luKCdcXG4nKTtcblxuICAgIHZhciBZVVYyUkdCID0gW1xuICAgICAgMS4xNjQzOCwgMC4wMDAwMCwgMS41OTYwMywgLTAuODcwNzksXG4gICAgICAxLjE2NDM4LCAtMC4zOTE3NiwgLTAuODEyOTcsIDAuNTI5NTksXG4gICAgICAxLjE2NDM4LCAyLjAxNzIzLCAwLjAwMDAwLCAtMS4wODEzOSxcbiAgICAgIDAsIDAsIDAsIDFcbiAgICBdO1xuICAgIHZhciB2ZXJ0ZXhTaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuVkVSVEVYX1NIQURFUik7XG4gICAgZ2wuc2hhZGVyU291cmNlKHZlcnRleFNoYWRlciwgdmVydGV4U2hhZGVyU2NyaXB0KTtcbiAgICBnbC5jb21waWxlU2hhZGVyKHZlcnRleFNoYWRlcik7XG4gICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIodmVydGV4U2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdWZXJ0ZXggc2hhZGVyIGZhaWxlZCB0byBjb21waWxlOiAnICsgZ2wuZ2V0U2hhZGVySW5mb0xvZyh2ZXJ0ZXhTaGFkZXIpKTtcbiAgICB9XG5cbiAgICB2YXIgZnJhZ21lbnRTaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKTtcbiAgICBnbC5zaGFkZXJTb3VyY2UoZnJhZ21lbnRTaGFkZXIsIGZyYWdtZW50U2hhZGVyU2NyaXB0KTtcbiAgICBnbC5jb21waWxlU2hhZGVyKGZyYWdtZW50U2hhZGVyKTtcbiAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcihmcmFnbWVudFNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgICBjb25zb2xlLmxvZygnRnJhZ21lbnQgc2hhZGVyIGZhaWxlZCB0byBjb21waWxlOiAnICsgZ2wuZ2V0U2hhZGVySW5mb0xvZyhmcmFnbWVudFNoYWRlcikpO1xuICAgIH1cblxuICAgIHZhciBwcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCB2ZXJ0ZXhTaGFkZXIpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCBmcmFnbWVudFNoYWRlcik7XG4gICAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XG4gICAgaWYgKCFnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkxJTktfU1RBVFVTKSkge1xuICAgICAgY29uc29sZS5sb2coJ1Byb2dyYW0gZmFpbGVkIHRvIGNvbXBpbGU6ICcgKyBnbC5nZXRQcm9ncmFtSW5mb0xvZyhwcm9ncmFtKSk7XG4gICAgfVxuXG4gICAgZ2wudXNlUHJvZ3JhbShwcm9ncmFtKTtcblxuICAgIHZhciBZVVYyUkdCUmVmID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sICdZVVYyUkdCJyk7XG4gICAgZ2wudW5pZm9ybU1hdHJpeDRmdihZVVYyUkdCUmVmLCBmYWxzZSwgWVVWMlJHQik7XG5cbiAgICB0aGlzLnNoYWRlclByb2dyYW0gPSBwcm9ncmFtO1xuICB9XG5cbiAgX2luaXRCdWZmZXJzICgpIHtcbiAgICB2YXIgZ2wgPSB0aGlzLmNvbnRleHRHTDtcbiAgICB2YXIgcHJvZ3JhbSA9IHRoaXMuc2hhZGVyUHJvZ3JhbTtcblxuICAgIHZhciB2ZXJ0ZXhQb3NCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdmVydGV4UG9zQnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShbMSwgMSwgLTEsIDEsIDEsIC0xLCAtMSwgLTFdKSwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgdmFyIHZlcnRleFBvc1JlZiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sICd2ZXJ0ZXhQb3MnKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh2ZXJ0ZXhQb3NSZWYpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodmVydGV4UG9zUmVmLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuXG4gICAgdmFyIHRleHR1cmVQb3NCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGV4dHVyZVBvc0J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDAsIDEsIDEsIDAsIDFdKSwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgdmFyIHRleHR1cmVQb3NSZWYgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCAndGV4dHVyZVBvcycpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRleHR1cmVQb3NSZWYpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGV4dHVyZVBvc1JlZiwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcblxuICAgIHRoaXMudGV4dHVyZVBvc0J1ZmZlciA9IHRleHR1cmVQb3NCdWZmZXI7XG5cbiAgICB2YXIgdVRleHR1cmVQb3NCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdVRleHR1cmVQb3NCdWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KFsxLCAwLCAwLCAwLCAxLCAxLCAwLCAxXSksIGdsLlNUQVRJQ19EUkFXKTtcblxuICAgIHZhciB1VGV4dHVyZVBvc1JlZiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sICd1VGV4dHVyZVBvcycpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHVUZXh0dXJlUG9zUmVmKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHVUZXh0dXJlUG9zUmVmLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuXG4gICAgdGhpcy51VGV4dHVyZVBvc0J1ZmZlciA9IHVUZXh0dXJlUG9zQnVmZmVyO1xuXG4gICAgdmFyIHZUZXh0dXJlUG9zQnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHZUZXh0dXJlUG9zQnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShbMSwgMCwgMCwgMCwgMSwgMSwgMCwgMV0pLCBnbC5TVEFUSUNfRFJBVyk7XG5cbiAgICB2YXIgdlRleHR1cmVQb3NSZWYgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCAndlRleHR1cmVQb3MnKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh2VGV4dHVyZVBvc1JlZik7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcih2VGV4dHVyZVBvc1JlZiwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcblxuICAgIHRoaXMudlRleHR1cmVQb3NCdWZmZXIgPSB2VGV4dHVyZVBvc0J1ZmZlcjtcbiAgfTtcblxuICBfaW5pdFRleHR1cmVzICgpIHtcbiAgICB2YXIgZ2wgPSB0aGlzLmNvbnRleHRHTDtcbiAgICB2YXIgcHJvZ3JhbSA9IHRoaXMuc2hhZGVyUHJvZ3JhbTtcbiAgICB2YXIgeVRleHR1cmVSZWYgPSB0aGlzLl9pbml0VGV4dHVyZSgpO1xuICAgIHZhciB5U2FtcGxlclJlZiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCAneVNhbXBsZXInKTtcbiAgICBnbC51bmlmb3JtMWkoeVNhbXBsZXJSZWYsIDApO1xuICAgIHRoaXMueVRleHR1cmVSZWYgPSB5VGV4dHVyZVJlZjtcblxuICAgIHZhciB1VGV4dHVyZVJlZiA9IHRoaXMuX2luaXRUZXh0dXJlKCk7XG4gICAgdmFyIHVTYW1wbGVyUmVmID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sICd1U2FtcGxlcicpO1xuICAgIGdsLnVuaWZvcm0xaSh1U2FtcGxlclJlZiwgMSk7XG4gICAgdGhpcy51VGV4dHVyZVJlZiA9IHVUZXh0dXJlUmVmO1xuXG4gICAgdmFyIHZUZXh0dXJlUmVmID0gdGhpcy5faW5pdFRleHR1cmUoKTtcbiAgICB2YXIgdlNhbXBsZXJSZWYgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgJ3ZTYW1wbGVyJyk7XG4gICAgZ2wudW5pZm9ybTFpKHZTYW1wbGVyUmVmLCAyKTtcbiAgICB0aGlzLnZUZXh0dXJlUmVmID0gdlRleHR1cmVSZWY7XG4gIH1cblxuICBfaW5pdFRleHR1cmUgKCkge1xuICAgIHZhciBnbCA9IHRoaXMuY29udGV4dEdMO1xuXG4gICAgdmFyIHRleHR1cmVSZWYgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZVJlZik7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5DTEFNUF9UT19FREdFKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBudWxsKTtcblxuICAgIHJldHVybiB0ZXh0dXJlUmVmO1xuICB9XG5cbiAgX2RyYXdQaWN0dXJlR0wgKGRhdGEsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICBsZXQgbldpZHRoID0gd2lkdGg7XG4gICAgdmFyIHlsZW4gPSB3aWR0aCAqIGhlaWdodDtcbiAgICB2YXIgdXZsZW4gPSB5bGVuIC8gNDtcbiAgICBpZiAodGhpcy5jaHJvbWEgPT09IDQyMikge1xuICAgICAgdXZsZW4gPSB5bGVuIC8gMlxuICAgIH0gZWxzZSBpZiAodGhpcy5jaHJvbWEgPT09IDQ0NCkge1xuICAgICAgdXZsZW4gPSB5bGVuO1xuICAgIH1cbiAgICBkYXRhID0gbmV3IFVpbnQ4QXJyYXkoZGF0YSk7XG4gICAgbGV0IHJlbmRlckRhdGEgPSB7XG4gICAgICB5RGF0YTogZGF0YS5zdWJhcnJheSgwLCB5bGVuKSxcbiAgICAgIHVEYXRhOiBkYXRhLnN1YmFycmF5KHlsZW4sIHlsZW4gKyB1dmxlbiksXG4gICAgICB2RGF0YTogZGF0YS5zdWJhcnJheSh5bGVuICsgdXZsZW4sIHlsZW4gKyB1dmxlbiArIHV2bGVuKVxuICAgIH1cbiAgICBpZiAod2lkdGggJSA0ID4gMCkge1xuICAgICAgbldpZHRoID0gd2lkdGggKyA0IC0gKHdpZHRoICUgNCk7XG4gICAgICBsZXQgeUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkobldpZHRoICogaGVpZ2h0KTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVpZ2h0OyBpKyspIHtcbiAgICAgICAgeUFycmF5LnNldChyZW5kZXJEYXRhLnlEYXRhLnN1YmFycmF5KGkgKiB3aWR0aCwgKGkgKyAxKSAqIHdpZHRoKSwgaSAqIG5XaWR0aCk7XG4gICAgICB9XG4gICAgICByZW5kZXJEYXRhLnlEYXRhID0geUFycmF5O1xuICAgIH1cblxuICAgIGlmICgod2lkdGggLyAyKSAlIDQgPiAwKSB7XG4gICAgICBuV2lkdGggPSAod2lkdGggLyAyKSArIDQgLSAoKHdpZHRoIC8gMikgJSA0KTtcbiAgICAgIGxldCB1QXJyYXkgPSBuZXcgVWludDhBcnJheShuV2lkdGggKiBoZWlnaHQgLyAyKTtcbiAgICAgIGxldCB2QXJyYXkgPSBuZXcgVWludDhBcnJheShuV2lkdGggKiBoZWlnaHQgLyAyKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVpZ2h0IC8gMjsgaSsrKSB7XG4gICAgICAgIHVBcnJheS5zZXQocmVuZGVyRGF0YS51RGF0YS5zdWJhcnJheShpICogd2lkdGggLyAyLCAoaSArIDEpICogd2lkdGggLyAyKSwgaSAqIG5XaWR0aCk7XG4gICAgICAgIHZBcnJheS5zZXQocmVuZGVyRGF0YS52RGF0YS5zdWJhcnJheShpICogd2lkdGggLyAyLCAoaSArIDEpICogd2lkdGggLyAyKSwgaSAqIG5XaWR0aCk7XG4gICAgICB9XG4gICAgICByZW5kZXJEYXRhLnVEYXRhID0gdUFycmF5O1xuICAgICAgcmVuZGVyRGF0YS52RGF0YSA9IHZBcnJheTtcbiAgICB9XG4gICAgdGhpcy5fZHJhd1BpY3R1cmVHTDQyMChyZW5kZXJEYXRhLCB3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuXG4gIF9kcmF3UGljdHVyZUdMNDIwIChkYXRhLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdmFyIGdsID0gdGhpcy5jb250ZXh0R0w7XG4gICAgdmFyIHRleHR1cmVQb3NCdWZmZXIgPSB0aGlzLnRleHR1cmVQb3NCdWZmZXI7XG4gICAgdmFyIHVUZXh0dXJlUG9zQnVmZmVyID0gdGhpcy51VGV4dHVyZVBvc0J1ZmZlcjtcbiAgICB2YXIgdlRleHR1cmVQb3NCdWZmZXIgPSB0aGlzLnZUZXh0dXJlUG9zQnVmZmVyO1xuXG4gICAgdmFyIHlUZXh0dXJlUmVmID0gdGhpcy55VGV4dHVyZVJlZjtcbiAgICB2YXIgdVRleHR1cmVSZWYgPSB0aGlzLnVUZXh0dXJlUmVmO1xuICAgIHZhciB2VGV4dHVyZVJlZiA9IHRoaXMudlRleHR1cmVSZWY7XG5cbiAgICB2YXIgeURhdGEgPSBkYXRhLnlEYXRhO1xuICAgIHZhciB1RGF0YSA9IGRhdGEudURhdGE7XG4gICAgdmFyIHZEYXRhID0gZGF0YS52RGF0YTtcblxuICAgIHZhciB5RGF0YVBlclJvdyA9IHdpZHRoO1xuICAgIHZhciB5Um93Q250ID0gaGVpZ2h0O1xuXG4gICAgdmFyIHVEYXRhUGVyUm93ID0gd2lkdGggLyAyO1xuICAgIHZhciB1Um93Q250ID0gaGVpZ2h0IC8gMjtcblxuICAgIGlmICh0aGlzLmNocm9tYSA9PT0gNDIyIHx8IHRoaXMuY2hyb21hID09PSA0NDQpIHtcbiAgICAgIHVSb3dDbnQgPSBoZWlnaHQ7XG4gICAgfVxuICAgIGlmICh0aGlzLmNocm9tYSA9PT0gNDQ0KSB7XG4gICAgICB1RGF0YVBlclJvdyA9IHdpZHRoO1xuICAgIH1cbiAgICB2YXIgdkRhdGFQZXJSb3cgPSB1RGF0YVBlclJvdztcbiAgICB2YXIgdlJvd0NudCA9IHVSb3dDbnQ7XG4gICAgXG4gICAgbGV0IHJhdGlvdyA9IHRoaXMuY2FudmFzLndpZHRoIC8gdGhpcy53aWR0aDtcbiAgICBsZXQgcmF0aW9oID0gdGhpcy5jYW52YXMuaGVpZ2h0IC8gdGhpcy5oZWlnaHQ7XG4gICAgbGV0IGxlZnQgPSAwO1xuICAgIGxldCB0b3AgPSAwO1xuICAgIGxldCB3ID0gdGhpcy5jYW52YXMud2lkdGg7XG4gICAgbGV0IGggPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XG4gICAgaWYgKHJhdGlvdyA8IHJhdGlvaCkge1xuICAgICAgaCA9ICh0aGlzLmhlaWdodCAqIHRoaXMuY2FudmFzLndpZHRoIC8gdGhpcy53aWR0aCk7XG4gICAgICB0b3AgPSBwYXJzZUludCgodGhpcy5jYW52YXMuaGVpZ2h0IC0gKHRoaXMuaGVpZ2h0ICogdGhpcy5jYW52YXMud2lkdGggLyB0aGlzLndpZHRoKSkgLyAyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdyA9ICh0aGlzLndpZHRoICogdGhpcy5jYW52YXMuaGVpZ2h0IC8gdGhpcy5oZWlnaHQpO1xuICAgICAgbGVmdCA9IHBhcnNlSW50KCh0aGlzLmNhbnZhcy53aWR0aCAtICh0aGlzLndpZHRoICogdGhpcy5jYW52YXMuaGVpZ2h0IC8gdGhpcy5oZWlnaHQpKSAvIDIpO1xuICAgIH1cbiAgICBnbC52aWV3cG9ydChsZWZ0LCB0b3AsIHcsIGgpO1xuXG4gICAgdmFyIHRleHR1cmVQb3NWYWx1ZXMgPSBuZXcgRmxvYXQzMkFycmF5KFsxLCAwLCAwLCAwLCAxLCAxLCAwLCAxXSk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRleHR1cmVQb3NCdWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCB0ZXh0dXJlUG9zVmFsdWVzLCBnbC5EWU5BTUlDX0RSQVcpO1xuXG4gICAgdmFyIHVUZXh0dXJlUG9zVmFsdWVzID0gbmV3IEZsb2F0MzJBcnJheShbMSwgMCwgMCwgMCwgMSwgMSwgMCwgMV0pO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB1VGV4dHVyZVBvc0J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHVUZXh0dXJlUG9zVmFsdWVzLCBnbC5EWU5BTUlDX0RSQVcpO1xuXG4gICAgdmFyIHZUZXh0dXJlUG9zVmFsdWVzID0gbmV3IEZsb2F0MzJBcnJheShbMSwgMCwgMCwgMCwgMSwgMSwgMCwgMV0pO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2VGV4dHVyZVBvc0J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHZUZXh0dXJlUG9zVmFsdWVzLCBnbC5EWU5BTUlDX0RSQVcpO1xuICAgIFxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHlUZXh0dXJlUmVmKTtcbiAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLkxVTUlOQU5DRSwgeURhdGFQZXJSb3csIHlSb3dDbnQsIDAsIGdsLkxVTUlOQU5DRSwgZ2wuVU5TSUdORURfQllURSwgeURhdGEpO1xuXG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMSk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdVRleHR1cmVSZWYpO1xuICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuTFVNSU5BTkNFLCB1RGF0YVBlclJvdywgdVJvd0NudCwgMCwgZ2wuTFVNSU5BTkNFLCBnbC5VTlNJR05FRF9CWVRFLCB1RGF0YSk7XG5cbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUyKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB2VGV4dHVyZVJlZik7XG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5MVU1JTkFOQ0UsIHZEYXRhUGVyUm93LCB2Um93Q250LCAwLCBnbC5MVU1JTkFOQ0UsIGdsLlVOU0lHTkVEX0JZVEUsIHZEYXRhKTtcblxuICAgIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVfU1RSSVAsIDAsIDQpO1xuICB9XG5cbiAgX2RyYXdQaWN0dXJlUkdCIChkYXRhKSB7XG5cbiAgfVxuXG4gIHJlbmRlciAoZGF0YSwgd2lkdGgsIGhlaWdodCkge1xuICAgIHZhciBnbCA9IHRoaXMuY29udGV4dEdMO1xuICAgIGlmIChnbCkge1xuICAgICAgdGhpcy5fZHJhd1BpY3R1cmVHTChkYXRhLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZHJhd1BpY3R1cmVSR0IoZGF0YSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFlVVkNhbnZhcztcbiIsImNvbnN0IGlzT2JqZWN0RmlsbGVkID0gKG9iaikgPT4ge1xuICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBpZiAob2JqW2tleV0gPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lZGlhSW5mbyB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLm1pbWVUeXBlID0gbnVsbFxuICAgIHRoaXMuZHVyYXRpb24gPSBudWxsXG5cbiAgICB0aGlzLmhhc1ZpZGVvID0gbnVsbFxuICAgIHRoaXMudmlkZW8gPSB7XG4gICAgICBjb2RlYzogbnVsbCxcbiAgICAgIHdpZHRoOiBudWxsLFxuICAgICAgaGVpZ2h0OiBudWxsLFxuICAgICAgcHJvZmlsZTogbnVsbCxcbiAgICAgIGxldmVsOiBudWxsLFxuICAgICAgZnJhbWVSYXRlOiB7XG4gICAgICAgIGZpeGVkOiB0cnVlLFxuICAgICAgICBmcHM6IDI1LFxuICAgICAgICBmcHNfbnVtOiAyNTAwMCxcbiAgICAgICAgZnBzX2RlbjogMTAwMFxuICAgICAgfSxcbiAgICAgIGNocm9tYUZvcm1hdDogbnVsbCxcbiAgICAgIHBhclJhdGlvOiB7XG4gICAgICAgIHdpZHRoOiAxLFxuICAgICAgICBoZWlnaHQ6IDFcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmhhc0F1ZGlvID0gbnVsbFxuXG4gICAgdGhpcy5hdWRpbyA9IHtcbiAgICAgIGNvZGVjOiBudWxsLFxuICAgICAgc2FtcGxlUmF0ZTogbnVsbCxcbiAgICAgIHNhbXBsZVJhdGVJbmRleDogbnVsbCxcbiAgICAgIGNoYW5uZWxDb3VudDogbnVsbFxuICAgIH1cbiAgfVxuXG4gIGlzQ29tcGxldGUgKCkge1xuICAgIHJldHVybiBNZWRpYUluZm8uaXNCYXNlSW5mb1JlYWR5KHRoaXMpICYmIE1lZGlhSW5mby5pc1ZpZGVvUmVhZHkodGhpcykgJiYgTWVkaWFJbmZvLmlzQXVkaW9SZWFkeSh0aGlzKVxuICB9XG5cbiAgc3RhdGljIGlzQmFzZUluZm9SZWFkeSAobWVkaWFJbmZvKSB7XG4gICAgcmV0dXJuIGlzT2JqZWN0RmlsbGVkKG1lZGlhSW5mbylcbiAgfVxuXG4gIHN0YXRpYyBpc1ZpZGVvUmVhZHkgKG1lZGlhSW5mbykge1xuICAgIGlmICghbWVkaWFJbmZvLmhhc1ZpZGVvKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHJldHVybiBpc09iamVjdEZpbGxlZChtZWRpYUluZm8udmlkZW8pXG4gIH1cblxuICBzdGF0aWMgaXNBdWRpb1JlYWR5IChtZWRpYUluZm8pIHtcbiAgICBpZiAoIW1lZGlhSW5mby5oYXNBdWRpbykge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4gaXNPYmplY3RGaWxsZWQobWVkaWFJbmZvLnZpZGVvKVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNZWRpYVNhbXBsZSB7XG4gIGNvbnN0cnVjdG9yIChpbmZvKSB7XG4gICAgbGV0IF9kZWZhdWx0ID0gTWVkaWFTYW1wbGUuZ2V0RGVmYXVsdEluZigpXG5cbiAgICBpZiAoIWluZm8gfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGluZm8pICE9PSAnW29iamVjdCBPYmplY3RdJykge1xuICAgICAgcmV0dXJuIF9kZWZhdWx0XG4gICAgfVxuICAgIGxldCBzYW1wbGUgPSBPYmplY3QuYXNzaWduKHt9LCBfZGVmYXVsdCwgaW5mbylcblxuICAgIE9iamVjdC5lbnRyaWVzKHNhbXBsZSkuZm9yRWFjaCgoW2ssIHZdKSA9PiB7XG4gICAgICB0aGlzW2tdID0gdlxuICAgIH0pXG4gIH1cblxuICBzdGF0aWMgZ2V0RGVmYXVsdEluZiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGR0czogbnVsbCxcbiAgICAgIHB0czogbnVsbCxcbiAgICAgIGR1cmF0aW9uOiBudWxsLFxuICAgICAgcG9zaXRpb246IG51bGwsXG4gICAgICBpc1JBUDogZmFsc2UsIC8vIGlzIFJhbmRvbSBhY2Nlc3MgcG9pbnRcbiAgICAgIG9yaWdpbkR0czogbnVsbFxuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVkaWFTZWdtZW50TGlzdCB7XG5cbiAgICBjb25zdHJ1Y3RvciAodHlwZSkge1xuICAgICAgICB0aGlzLl90eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5fbGlzdCA9IFtdO1xuICAgICAgICB0aGlzLl9sYXN0QXBwZW5kTG9jYXRpb24gPSAtMTsgLy8gY2FjaGVkIGxhc3QgaW5zZXJ0IGxvY2F0aW9uXG4gICAgfVxuXG4gICAgZ2V0IHR5cGUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgICB9XG5cbiAgICBnZXQgbGVuZ3RoICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3QubGVuZ3RoO1xuICAgIH1cblxuICAgIGlzRW1wdHkgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGlzdC5sZW5ndGggPT09IDA7XG4gICAgfVxuXG4gICAgY2xlYXIgKCkge1xuICAgICAgICB0aGlzLl9saXN0ID0gW107XG4gICAgICAgIHRoaXMuX2xhc3RBcHBlbmRMb2NhdGlvbiA9IC0xO1xuICAgIH1cblxuICAgIF9zZWFyY2hOZWFyZXN0U2VnbWVudEJlZm9yZSAoYmVnaW5EdHMpIHtcbiAgICAgICAgbGV0IGxpc3QgPSB0aGlzLl9saXN0O1xuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAtMjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbGFzdCA9IGxpc3QubGVuZ3RoIC0gMTtcbiAgICAgICAgbGV0IG1pZCA9IDA7XG4gICAgICAgIGxldCBsYm91bmQgPSAwO1xuICAgICAgICBsZXQgdWJvdW5kID0gbGFzdDtcblxuICAgICAgICBsZXQgaWR4ID0gMDtcblxuICAgICAgICBpZiAoYmVnaW5EdHMgPCBsaXN0WzBdLm9yaWdpbkR0cykge1xuICAgICAgICAgICAgaWR4ID0gLTE7XG4gICAgICAgICAgICByZXR1cm4gaWR4O1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKGxib3VuZCA8PSB1Ym91bmQpIHtcbiAgICAgICAgICAgIG1pZCA9IGxib3VuZCArIE1hdGguZmxvb3IoKHVib3VuZCAtIGxib3VuZCkgLyAyKTtcbiAgICAgICAgICAgIGlmIChtaWQgPT09IGxhc3QgfHwgKGJlZ2luRHRzID4gbGlzdFttaWRdLmxhc3RTYW1wbGUub3JpZ2luRHRzXG4gICAgICAgICAgICAgICAgICAgICYmIChiZWdpbkR0cyA8IGxpc3RbbWlkICsgMV0ub3JpZ2luRHRzKSkpIHtcbiAgICAgICAgICAgICAgICBpZHggPSBtaWQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxpc3RbbWlkXS5vcmlnaW5EdHMgPCBiZWdpbkR0cykge1xuICAgICAgICAgICAgICAgIGxib3VuZCA9IG1pZCArIDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHVib3VuZCA9IG1pZCAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlkeDtcbiAgICB9XG5cbiAgICBfc2VhcmNoTmVhcmVzdFNlZ21lbnRBZnRlciAoYmVnaW5EdHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlYXJjaE5lYXJlc3RTZWdtZW50QmVmb3JlKGJlZ2luRHRzKSArIDE7XG4gICAgfVxuXG4gICAgYXBwZW5kIChzZWdtZW50KSB7XG4gICAgICAgIGxldCBsaXN0ID0gdGhpcy5fbGlzdDtcbiAgICAgICAgbGV0IGxhc3RBcHBlbmRJZHggPSB0aGlzLl9sYXN0QXBwZW5kTG9jYXRpb247XG4gICAgICAgIGxldCBpbnNlcnRJZHggPSAwO1xuXG4gICAgICAgIGlmIChsYXN0QXBwZW5kSWR4ICE9PSAtMSAmJiBsYXN0QXBwZW5kSWR4IDwgbGlzdC5sZW5ndGhcbiAgICAgICAgICAgICYmIHNlZ21lbnQub3JpZ2luU3RhcnREdHMgPj0gbGlzdFtsYXN0QXBwZW5kSWR4XS5sYXN0U2FtcGxlLm9yaWdpbkR0c1xuICAgICAgICAgICAgJiYgKChsYXN0QXBwZW5kSWR4ID09PSBsaXN0Lmxlbmd0aCAtIDEpXG4gICAgICAgICAgICAgICAgfHwgKGxhc3RBcHBlbmRJZHggPCBsaXN0Lmxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgICAgICAgJiYgc2VnbWVudC5vcmlnaW5TdGFydER0cyA8IGxpc3RbbGFzdEFwcGVuZElkeCArIDFdLm9yaWdpblN0YXJ0RHRzKSkpIHtcbiAgICAgICAgICAgIGluc2VydElkeCA9IGxhc3RBcHBlbmRJZHggKyAxOyAvLyB1c2UgY2FjaGVkIGxvY2F0aW9uIGlkeFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGluc2VydElkeCA9IHRoaXMuX3NlYXJjaE5lYXJlc3RTZWdtZW50QmVmb3JlKHNlZ21lbnQub3JpZ2luU3RhcnREdHMpICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2xhc3RBcHBlbmRMb2NhdGlvbiA9IGluc2VydElkeDtcbiAgICAgICAgdGhpcy5fbGlzdC5zcGxpY2UoaW5zZXJ0SWR4LCAwLCBzZWdtZW50KTtcbiAgICB9XG5cbiAgICBnZXRMYXN0U2VnbWVudEJlZm9yZSAoYmVnaW5EdHMpIHtcbiAgICAgICAgbGV0IGlkeCA9IHRoaXMuX3NlYXJjaE5lYXJlc3RTZWdtZW50QmVmb3JlKGJlZ2luRHRzKTtcbiAgICAgICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdFtpZHhdO1xuICAgICAgICB9IGVsc2UgeyAvLyAtMVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRMYXN0U2FtcGxlQmVmb3JlIChiZWdpbkR0cykge1xuICAgICAgICBsZXQgc2VnbWVudCA9IHRoaXMuZ2V0TGFzdFNlZ21lbnRCZWZvcmUoYmVnaW5EdHMpO1xuICAgICAgICBpZiAoc2VnbWVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHNlZ21lbnQubGFzdFNhbXBsZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TGFzdFJBUEJlZm9yZSAoYmVnaW5EdHMpIHtcbiAgICAgICAgbGV0IHNlZ21lbnRJZHggPSB0aGlzLl9zZWFyY2hOZWFyZXN0U2VnbWVudEJlZm9yZShiZWdpbkR0cyk7XG4gICAgICAgIGxldCByYW5kb21BY2Nlc3NQb2ludHMgPSB0aGlzLl9saXN0W3NlZ21lbnRJZHhdLnJhbmRvbUFjY2Vzc1BvaW50cztcbiAgICAgICAgd2hpbGUgKHJhbmRvbUFjY2Vzc1BvaW50cy5sZW5ndGggPT09IDAgJiYgc2VnbWVudElkeCA+IDApIHtcbiAgICAgICAgICAgIHNlZ21lbnRJZHgtLTtcbiAgICAgICAgICAgIHJhbmRvbUFjY2Vzc1BvaW50cyA9IHRoaXMuX2xpc3Rbc2VnbWVudElkeF0ucmFuZG9tQWNjZXNzUG9pbnRzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyYW5kb21BY2Nlc3NQb2ludHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHJhbmRvbUFjY2Vzc1BvaW50c1tyYW5kb21BY2Nlc3NQb2ludHMubGVuZ3RoIC0gMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lZGlhU2VnbWVudCB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICB0aGlzLnN0YXJ0RHRzID0gLTE7XG4gICAgICAgIHRoaXMuZW5kRHRzID0gLTE7XG4gICAgICAgIHRoaXMuc3RhcnRQdHMgPSAtMTtcbiAgICAgICAgdGhpcy5lbmRQdHMgPSAtMTtcbiAgICAgICAgdGhpcy5vcmlnaW5TdGFydER0cyA9IC0xO1xuICAgICAgICB0aGlzLm9yaWdpbkVuZER0cyA9IC0xO1xuICAgICAgICB0aGlzLnJhbmRvbUFjY2Vzc1BvaW50cyA9IFtdO1xuICAgICAgICB0aGlzLmZpcnN0U2FtcGxlID0gbnVsbDtcbiAgICAgICAgdGhpcy5sYXN0U2FtcGxlID0gbnVsbDtcbiAgICB9XG5cbiAgICBhZGRSQVAgKHNhbXBsZSkge1xuICAgICAgICBzYW1wbGUuaXNSQVAgPSB0cnVlO1xuICAgICAgICB0aGlzLnJhbmRvbUFjY2Vzc1BvaW50cy5wdXNoKHNhbXBsZSk7XG4gICAgfVxufSIsImV4cG9ydCBjbGFzcyBBdWRpb1RyYWNrTWV0YSB7XG4gIGNvbnN0cnVjdG9yIChtZXRhKSB7XG4gICAgY29uc3QgX2RlZmF1bHQgPSB7XG4gICAgICBzYW1wbGVSYXRlOiA0ODAwMCxcbiAgICAgIGNoYW5uZWxDb3VudDogMixcbiAgICAgIGNvZGVjOiAnbXA0YS40MC4yJyxcbiAgICAgIGNvbmZpZzogWzQxLCA0MDEsIDEzNiwgMF0sXG4gICAgICBkdXJhdGlvbjogMCxcbiAgICAgIGlkOiAyLFxuICAgICAgcmVmU2FtcGxlRHVyYXRpb246IDIxLFxuICAgICAgc2FtcGxlUmF0ZUluZGV4OiAzLFxuICAgICAgdGltZXNjYWxlOiAxMDAwLFxuICAgICAgdHlwZTogJ2F1ZGlvJ1xuICAgIH1cbiAgICBpZiAobWV0YSkge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIF9kZWZhdWx0LCBtZXRhKVxuICAgIH1cbiAgICByZXR1cm4gX2RlZmF1bHRcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuaW5pdCA9IG51bGxcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVmlkZW9UcmFja01ldGEge1xuICBjb25zdHJ1Y3RvciAobWV0YSkge1xuICAgIGNvbnN0IF9kZWZhdWx0ID0ge1xuICAgICAgYXZjYzogbnVsbCxcbiAgICAgIHNwczogbmV3IFVpbnQ4QXJyYXkoMCksXG4gICAgICBwcHM6IG5ldyBVaW50OEFycmF5KDApLFxuICAgICAgY2hyb21hRm9ybWF0OiA0MjAsXG4gICAgICBjb2RlYzogJ2F2YzEuNjQwMDIwJyxcbiAgICAgIGNvZGVjSGVpZ2h0OiA3MjAsXG4gICAgICBjb2RlY1dpZHRoOiAxMjgwLFxuICAgICAgZHVyYXRpb246IDAsXG4gICAgICBmcmFtZVJhdGU6IHtcbiAgICAgICAgZml4ZWQ6IHRydWUsXG4gICAgICAgIGZwczogMjUsXG4gICAgICAgIGZwc19udW06IDI1MDAwLFxuICAgICAgICBmcHNfZGVuOiAxMDAwXG4gICAgICB9LFxuICAgICAgaWQ6IDEsXG4gICAgICBsZXZlbDogJzMuMicsXG4gICAgICBwcmVzZW50SGVpZ2h0OiA3MjAsXG4gICAgICBwcmVzZW50V2lkdGg6IDEyODAsXG4gICAgICBwcm9maWxlOiAnSGlnaCcsXG4gICAgICByZWZTYW1wbGVEdXJhdGlvbjogNDAsXG4gICAgICBwYXJSYXRpbzoge1xuICAgICAgICBoZWlnaHQ6IDEsXG4gICAgICAgIHdpZHRoOiAxXG4gICAgICB9LFxuICAgICAgdGltZXNjYWxlOiAxMDAwLFxuICAgICAgdHlwZTogJ3ZpZGVvJ1xuICAgIH1cblxuICAgIGlmIChtZXRhKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgX2RlZmF1bHQsIG1ldGEpXG4gICAgfVxuICAgIHJldHVybiBfZGVmYXVsdFxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5pbml0ID0gbnVsbFxuICAgIHRoaXMuc3BzID0gbnVsbFxuICAgIHRoaXMucHBzID0gbnVsbFxuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgQXVkaW9UcmFja1NhbXBsZSB7XG4gIGNvbnN0cnVjdG9yIChpbmZvKSB7XG4gICAgbGV0IF9kZWZhdWx0ID0gQXVkaW9UcmFja1NhbXBsZS5nZXREZWZhdWx0KClcbiAgICBpZiAoIWluZm8pIHtcbiAgICAgIHJldHVybiBfZGVmYXVsdFxuICAgIH1cbiAgICBsZXQgc2FtcGxlID0gT2JqZWN0LmFzc2lnbih7fSwgX2RlZmF1bHQsIGluZm8pXG5cbiAgICByZXR1cm4gc2FtcGxlXG4gIH1cblxuICBzdGF0aWMgZ2V0RGVmYXVsdCAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGR0czogbnVsbCxcbiAgICAgIHB0czogbnVsbCxcbiAgICAgIGRhdGE6IG5ldyBVaW50OEFycmF5KClcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFZpZGVvVHJhY2tTYW1wbGUge1xuICBjb25zdHJ1Y3RvciAoaW5mbykge1xuICAgIGxldCBfZGVmYXVsdCA9IFZpZGVvVHJhY2tTYW1wbGUuZ2V0RGVmYXVsdCgpXG5cbiAgICBpZiAoIWluZm8pIHtcbiAgICAgIHJldHVybiBfZGVmYXVsdFxuICAgIH1cbiAgICBsZXQgc2FtcGxlID0gT2JqZWN0LmFzc2lnbih7fSwgX2RlZmF1bHQsIGluZm8pXG5cbiAgICByZXR1cm4gc2FtcGxlXG4gIH1cblxuICBzdGF0aWMgZ2V0RGVmYXVsdCAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGR0czogbnVsbCxcbiAgICAgIHB0czogbnVsbCxcbiAgICAgIGlzS2V5ZnJhbWU6IGZhbHNlLCAvLyBpcyBSYW5kb20gYWNjZXNzIHBvaW50XG4gICAgICBvcmlnaW5EdHM6IG51bGwsXG4gICAgICBkYXRhOiBuZXcgVWludDhBcnJheSgpXG4gICAgfVxuICB9XG59XG4iLCJjbGFzcyBNU0Uge1xuICBjb25zdHJ1Y3RvciAoY29uZmlncykge1xuICAgIHRoaXMuY29uZmlncyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZ3MpO1xuICAgIHRoaXMuY29udGFpbmVyID0gdGhpcy5jb25maWdzLmNvbnRhaW5lcjtcbiAgICB0aGlzLm1lZGlhU291cmNlID0gbnVsbDtcbiAgICB0aGlzLnNvdXJjZUJ1ZmZlcnMgPSB7fTtcbiAgICB0aGlzLnByZWxvYWRUaW1lID0gdGhpcy5jb25maWdzLnByZWxvYWRUaW1lIHx8IDE7XG4gICAgdGhpcy5vblNvdXJjZU9wZW4gPSB0aGlzLm9uU291cmNlT3Blbi5iaW5kKHRoaXMpXG4gICAgdGhpcy5vblRpbWVVcGRhdGUgPSB0aGlzLm9uVGltZVVwZGF0ZS5iaW5kKHRoaXMpXG4gICAgdGhpcy5vblVwZGF0ZUVuZCA9IHRoaXMub25VcGRhdGVFbmQuYmluZCh0aGlzKVxuICAgIHRoaXMub25XYWl0aW5nID0gdGhpcy5vbldhaXRpbmcuYmluZCh0aGlzKVxuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgdGhpcy5tZWRpYVNvdXJjZSA9IG5ldyBzZWxmLk1lZGlhU291cmNlKCk7XG4gICAgdGhpcy5tZWRpYVNvdXJjZS5hZGRFdmVudExpc3RlbmVyKCdzb3VyY2VvcGVuJywgdGhpcy5vblNvdXJjZU9wZW4pO1xuICAgIHRoaXMuY29udGFpbmVyLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwodGhpcy5tZWRpYVNvdXJjZSk7XG4gICAgdGhpcy51cmwgPSB0aGlzLmNvbnRhaW5lci5zcmM7XG4gICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcigndGltZXVwZGF0ZScsIHRoaXMub25UaW1lVXBkYXRlKTtcbiAgICB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd3YWl0aW5nJywgdGhpcy5vbldhaXRpbmcpO1xuICB9XG5cbiAgb25UaW1lVXBkYXRlICgpIHtcbiAgICB0aGlzLmVtaXQoJ1RJTUVfVVBEQVRFJywgdGhpcy5jb250YWluZXIpO1xuICB9XG5cbiAgb25XYWl0aW5nICgpIHtcbiAgICB0aGlzLmVtaXQoJ1dBSVRJTkcnLCB0aGlzLmNvbnRhaW5lcik7XG4gIH1cblxuICBvblNvdXJjZU9wZW4gKCkge1xuICAgIHRoaXMuYWRkU291cmNlQnVmZmVycygpO1xuICB9XG5cbiAgb25VcGRhdGVFbmQgKCkge1xuICAgIHRoaXMuZW1pdCgnU09VUkNFX1VQREFURV9FTkQnKTtcbiAgICB0aGlzLmRvQXBwZW5kKClcbiAgfVxuICBhZGRTb3VyY2VCdWZmZXJzICgpIHtcbiAgICBpZiAodGhpcy5tZWRpYVNvdXJjZS5yZWFkeVN0YXRlICE9PSAnb3BlbicpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHNvdXJjZXMgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdQUkVfU09VUkNFX0JVRkZFUicpO1xuICAgIGxldCB0cmFja3MgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKTtcbiAgICBsZXQgdHJhY2s7XG5cbiAgICBzb3VyY2VzID0gc291cmNlcy5zb3VyY2VzO1xuICAgIGxldCBhZGQgPSBmYWxzZTtcbiAgICBmb3IgKGxldCBpID0gMCwgayA9IE9iamVjdC5rZXlzKHNvdXJjZXMpLmxlbmd0aDsgaSA8IGs7IGkrKykge1xuICAgICAgbGV0IHR5cGUgPSBPYmplY3Qua2V5cyhzb3VyY2VzKVtpXTtcbiAgICAgIGlmICh0eXBlID09PSAnYXVkaW8nKSB7XG4gICAgICAgIHRyYWNrID0gdHJhY2tzLmF1ZGlvVHJhY2s7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgICAgdHJhY2sgPSB0cmFja3MudmlkZW9UcmFjaztcbiAgICAgICAgLy8gcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHRyYWNrKSB7XG4gICAgICAgIGxldCBkdXIgPSB0eXBlID09PSAnYXVkaW8nID8gMjEgOiA0MDtcbiAgICAgICAgaWYgKHRyYWNrLm1ldGEgJiYgdHJhY2subWV0YS5yZWZTYW1wbGVEdXJhdGlvbikgZHVyID0gdHJhY2subWV0YS5yZWZTYW1wbGVEdXJhdGlvbjtcbiAgICAgICAgaWYgKHNvdXJjZXNbdHlwZV0uZGF0YS5sZW5ndGggPj0gKHRoaXMucHJlbG9hZFRpbWUgLyBkdXIpKSB7XG4gICAgICAgICAgYWRkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChhZGQpIHtcbiAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLnNvdXJjZUJ1ZmZlcnMpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IDAsIGsgPSBPYmplY3Qua2V5cyhzb3VyY2VzKS5sZW5ndGg7IGkgPCBrOyBpKyspIHtcbiAgICAgICAgbGV0IHR5cGUgPSBPYmplY3Qua2V5cyhzb3VyY2VzKVtpXTtcbiAgICAgICAgbGV0IHNvdXJjZSA9IHNvdXJjZXNbdHlwZV1cbiAgICAgICAgbGV0IG1pbWUgPSAodHlwZSA9PT0gJ3ZpZGVvJykgPyAndmlkZW8vbXA0O2NvZGVjcz0nICsgc291cmNlLm1pbWV0eXBlIDogJ2F1ZGlvL21wNDtjb2RlY3M9JyArIHNvdXJjZS5taW1ldHlwZVxuICAgICAgICBsZXQgc291cmNlQnVmZmVyID0gdGhpcy5tZWRpYVNvdXJjZS5hZGRTb3VyY2VCdWZmZXIobWltZSk7XG4gICAgICAgIHRoaXMuc291cmNlQnVmZmVyc1t0eXBlXSA9IHNvdXJjZUJ1ZmZlcjtcbiAgICAgICAgc291cmNlQnVmZmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3VwZGF0ZWVuZCcsIHRoaXMub25VcGRhdGVFbmQpO1xuICAgICAgICB0aGlzLmRvQXBwZW5kKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZG9BcHBlbmQgKCkge1xuICAgIGxldCBzb3VyY2VzID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnUFJFX1NPVVJDRV9CVUZGRVInKTtcbiAgICBpZiAoc291cmNlcykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBPYmplY3Qua2V5cyh0aGlzLnNvdXJjZUJ1ZmZlcnMpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCB0eXBlID0gT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKVtpXVxuICAgICAgICBsZXQgc291cmNlQnVmZmVyID0gdGhpcy5zb3VyY2VCdWZmZXJzW3R5cGVdO1xuICAgICAgICBpZiAoIXNvdXJjZUJ1ZmZlci51cGRhdGluZykge1xuICAgICAgICAgIGxldCBzb3VyY2UgPSBzb3VyY2VzLnNvdXJjZXNbdHlwZV07XG4gICAgICAgICAgaWYgKHNvdXJjZSAmJiAhc291cmNlLmluaXRlZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2FwcGVuZCBpbml0aWFsIHNlZ21lbnQnKVxuICAgICAgICAgICAgc291cmNlQnVmZmVyLmFwcGVuZEJ1ZmZlcihzb3VyY2UuaW5pdC5idWZmZXIuYnVmZmVyKTtcbiAgICAgICAgICAgIHNvdXJjZS5pbml0ZWQgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc291cmNlKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHNvdXJjZS5kYXRhLnNoaWZ0KClcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgIHNvdXJjZUJ1ZmZlci5hcHBlbmRCdWZmZXIoZGF0YS5idWZmZXIuYnVmZmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBlbmRPZlN0cmVhbSAoKSB7XG4gICAgY29uc3QgeyByZWFkeVN0YXRlLCBhY3RpdmVTb3VyY2VCdWZmZXJzIH0gPSB0aGlzLm1lZGlhU291cmNlO1xuICAgIGlmIChyZWFkeVN0YXRlID09PSAnb3BlbicgJiYgYWN0aXZlU291cmNlQnVmZmVycy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMubWVkaWFTb3VyY2UuZW5kT2ZTdHJlYW0oKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBsb2dcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW1vdmUgKGVuZCwgc3RhcnQgPSAwKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBPYmplY3Qua2V5cyh0aGlzLnNvdXJjZUJ1ZmZlcnMpLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYnVmZmVyID0gdGhpcy5zb3VyY2VCdWZmZXJzW09iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycylbaV1dO1xuICAgICAgaWYgKCFidWZmZXIudXBkYXRpbmcpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coc3RhcnQsIGVuZClcbiAgICAgICAgYnVmZmVyLnJlbW92ZShzdGFydCwgZW5kKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmVtb3ZlQnVmZmVycyAoKSB7XG4gICAgY29uc3QgdGFza0xpc3QgPSBbXVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKS5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGJ1ZmZlciA9IHRoaXMuc291cmNlQnVmZmVyc1tPYmplY3Qua2V5cyh0aGlzLnNvdXJjZUJ1ZmZlcnMpW2ldXTtcbiAgICAgIGJ1ZmZlci5yZW1vdmVFdmVudExpc3RlbmVyKCd1cGRhdGVlbmQnLCB0aGlzLm9uVXBkYXRlRW5kKTtcblxuICAgICAgbGV0IHRhc2s7XG4gICAgICBpZiAoYnVmZmVyLnVwZGF0aW5nKSB7XG4gICAgICAgIHRhc2sgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGRvQ2xlYW5CdWZmZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsZXQgcmV0cnlUaW1lID0gM1xuXG4gICAgICAgICAgICBjb25zdCBjbGVhbiA9ICgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFidWZmZXIudXBkYXRpbmcpIHtcbiAgICAgICAgICAgICAgICBNU0UuY2xlYXJCdWZmZXIoYnVmZmVyKVxuICAgICAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJldHJ5VGltZSA+IDApe1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2xlYW4sIDIwMClcbiAgICAgICAgICAgICAgICByZXRyeVRpbWUtLVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoY2xlYW4sIDIwMClcbiAgICAgICAgICAgIGJ1ZmZlci5yZW1vdmVFdmVudExpc3RlbmVyKCd1cGRhdGVlbmQnLCBkb0NsZWFuQnVmZmVyKVxuICAgICAgICAgIH1cbiAgICAgICAgICBidWZmZXIuYWRkRXZlbnRMaXN0ZW5lcigndXBkYXRlZW5kJywgZG9DbGVhbkJ1ZmZlcilcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIE1TRS5jbGVhckJ1ZmZlcihidWZmZXIpXG4gICAgICAgIHRhc2sgPSBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgfVxuXG4gICAgICB0YXNrTGlzdC5wdXNoKHRhc2spXG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHRhc2tMaXN0KVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVtb3ZlQnVmZmVycygpLnRoZW4oKCkgPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBPYmplY3Qua2V5cyh0aGlzLnNvdXJjZUJ1ZmZlcnMpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBidWZmZXIgPSB0aGlzLnNvdXJjZUJ1ZmZlcnNbT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKVtpXV07XG4gICAgICAgIHRoaXMubWVkaWFTb3VyY2UucmVtb3ZlU291cmNlQnVmZmVyKGJ1ZmZlcik7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnNvdXJjZUJ1ZmZlcnNbT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKVtpXV07XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RpbWV1cGRhdGUnLCB0aGlzLm9uVGltZVVwZGF0ZSk7XG4gICAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCd3YWl0aW5nJywgdGhpcy5vbldhaXRpbmcpO1xuICAgICAgdGhpcy5tZWRpYVNvdXJjZS5yZW1vdmVFdmVudExpc3RlbmVyKCdzb3VyY2VvcGVuJywgdGhpcy5vblNvdXJjZU9wZW4pO1xuXG4gICAgICB0aGlzLmVuZE9mU3RyZWFtKClcbiAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKHRoaXMudXJsKTtcblxuICAgICAgdGhpcy51cmwgPSBudWxsXG4gICAgICB0aGlzLmNvbmZpZ3MgPSB7fTtcbiAgICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcbiAgICAgIHRoaXMubWVkaWFTb3VyY2UgPSBudWxsO1xuICAgICAgdGhpcy5zb3VyY2VCdWZmZXJzID0ge307XG4gICAgICB0aGlzLnByZWxvYWRUaW1lID0gMTtcbiAgICB9KVxuICB9XG5cbiAgc3RhdGljIGNsZWFyQnVmZmVyIChidWZmZXIpIHtcbiAgICBjb25zdCBidWZmZXJlZCA9IGJ1ZmZlci5idWZmZXJlZDtcbiAgICBsZXQgYkVuZCA9IDAuMVxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBidWZmZXJlZC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgYkVuZCA9IGJ1ZmZlcmVkLmVuZChpKVxuICAgIH1cbiAgICB0cnkge1xuICAgICAgYnVmZmVyLnJlbW92ZSgwLCBiRW5kKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIERPIE5PVEhJTkdcbiAgICB9XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IE1TRTtcbiIsImltcG9ydCBDb25jYXQgZnJvbSAnY29uY2F0LXR5cGVkLWFycmF5J1xuXG5jbGFzcyBCdWZmZXIge1xuICBjb25zdHJ1Y3RvciAoYnVmZmVyKSB7XG4gICAgdGhpcy5idWZmZXIgPSBidWZmZXIgfHwgbmV3IFVpbnQ4QXJyYXkoMClcbiAgfVxuXG4gIHdyaXRlICguLi5idWZmZXIpIHtcbiAgICBidWZmZXIuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHRoaXMuYnVmZmVyID0gQ29uY2F0KFVpbnQ4QXJyYXksIHRoaXMuYnVmZmVyLCBpdGVtKVxuICAgIH0pXG4gIH1cblxuICBzdGF0aWMgd3JpdGVVaW50MzIgKHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFtcbiAgICAgIHZhbHVlID4+IDI0LFxuICAgICAgKHZhbHVlID4+IDE2KSAmIDB4ZmYsXG4gICAgICAodmFsdWUgPj4gOCkgJiAweGZmLFxuICAgICAgdmFsdWUgJiAweGZmXG4gICAgXSlcbiAgfVxuXG4gIHN0YXRpYyByZWFkQXNJbnQgKGFycikge1xuICAgIGxldCB0ZW1wID0gJydcblxuICAgIGZ1bmN0aW9uIHBhZFN0YXJ0NEhleCAoaGV4TnVtKSB7XG4gICAgICBsZXQgaGV4U3RyID0gaGV4TnVtLnRvU3RyaW5nKDE2KVxuICAgICAgcmV0dXJuIGhleFN0ci5wYWRTdGFydCgyLCAnMCcpXG4gICAgfVxuXG4gICAgYXJyLmZvckVhY2gobnVtID0+IHtcbiAgICAgIHRlbXAgKz0gcGFkU3RhcnQ0SGV4KG51bSlcbiAgICB9KVxuICAgIHJldHVybiBwYXJzZUludCh0ZW1wLCAxNilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCdWZmZXJcbiIsImNsYXNzIFN0cmVhbSB7XG4gIGNvbnN0cnVjdG9yIChidWZmZXIpIHtcbiAgICBpZiAoYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICAgIHRoaXMuYnVmZmVyID0gYnVmZmVyO1xuICAgICAgdGhpcy5kYXRhdmlldyA9IG5ldyBEYXRhVmlldyhidWZmZXIpO1xuICAgICAgdGhpcy5kYXRhdmlldy5wb3NpdGlvbiA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZGF0YSBpcyBpbnZhbGlkJyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGxlbmd0aCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuYnVmZmVyLmJ5dGVMZW5ndGg7XG4gIH1cblxuICBzZXQgcG9zaXRpb24gKHZhbHVlKSB7XG4gICAgdGhpcy5kYXRhdmlldy5wb3NpdGlvbiA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHBvc2l0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhdmlldy5wb3NpdGlvbjtcbiAgfVxuXG4gIGJhY2sgKGNvdW50KSB7XG4gICAgdGhpcy5wb3NpdGlvbiAtPSBjb3VudDtcbiAgfVxuXG4gIHNraXAgKGNvdW50KSB7XG4gICAgbGV0IGxvb3AgPSBNYXRoLmZsb29yKGNvdW50IC8gNCk7XG4gICAgbGV0IGxhc3QgPSBjb3VudCAlIDQ7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb29wOyBpKyspIHtcbiAgICAgIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCA0KTtcbiAgICB9XG4gICAgaWYgKGxhc3QgPiAwKSB7XG4gICAgICBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgbGFzdCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFtyZWFkQnl0ZSDku45EYXRhVmlld+S4reivu+WPluaVsOaNrl1cbiAgICogQHBhcmFtICB7RGF0YVZpZXd9IGJ1ZmZlciBbRGF0YVZpZXflrp7kvotdXG4gICAqIEBwYXJhbSAge051bWJlcn0gc2l6ZSAgIFvor7vlj5blrZfoioLmlbBdXG4gICAqIEByZXR1cm4ge051bWJlcn0gICAgICAgIFvmlbTmlbBdXG4gICAqL1xuICBzdGF0aWMgcmVhZEJ5dGUgKGJ1ZmZlciwgc2l6ZSwgc2lnbikge1xuICAgIGxldCByZXM7XG4gICAgc3dpdGNoIChzaXplKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGlmIChzaWduKSB7XG4gICAgICAgICAgcmVzID0gYnVmZmVyLmdldEludDgoYnVmZmVyLnBvc2l0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXMgPSBidWZmZXIuZ2V0VWludDgoYnVmZmVyLnBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaWYgKHNpZ24pIHtcbiAgICAgICAgICByZXMgPSBidWZmZXIuZ2V0SW50MTYoYnVmZmVyLnBvc2l0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXMgPSBidWZmZXIuZ2V0VWludDE2KGJ1ZmZlci5wb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGlmIChzaWduKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3Qgc3VwcG9ydGVkIGZvciByZWFkQnl0ZSAzJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzID0gYnVmZmVyLmdldFVpbnQ4KGJ1ZmZlci5wb3NpdGlvbikgPDwgMTY7XG4gICAgICAgICAgcmVzIHw9IGJ1ZmZlci5nZXRVaW50OChidWZmZXIucG9zaXRpb24gKyAxKSA8PCA4O1xuICAgICAgICAgIHJlcyB8PSBidWZmZXIuZ2V0VWludDgoYnVmZmVyLnBvc2l0aW9uICsgMik7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQ6XG4gICAgICAgIGlmIChzaWduKSB7XG4gICAgICAgICAgcmVzID0gYnVmZmVyLmdldEludDMyKGJ1ZmZlci5wb3NpdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzID0gYnVmZmVyLmdldFVpbnQzMihidWZmZXIucG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA4OlxuICAgICAgICBpZiAoc2lnbikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IHN1cHBvcnRlZCBmb3IgcmVhZEJvZHkgOCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRVaW50MzIoYnVmZmVyLnBvc2l0aW9uKSA8PCAzMjtcbiAgICAgICAgICByZXMgfD0gYnVmZmVyLmdldFVpbnQzMihidWZmZXIucG9zaXRpb24gKyA0KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJlcyA9ICcnO1xuICAgIH1cbiAgICBidWZmZXIucG9zaXRpb24gKz0gc2l6ZTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgcmVhZFVpbnQ4ICgpIHtcbiAgICByZXR1cm4gU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIDEpO1xuICB9XG5cbiAgcmVhZFVpbnQxNiAoKSB7XG4gICAgcmV0dXJuIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCAyKTtcbiAgfVxuXG4gIHJlYWRVaW50MjQgKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgMyk7XG4gIH1cblxuICByZWFkVWludDMyICgpIHtcbiAgICByZXR1cm4gU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIDQpO1xuICB9XG5cbiAgcmVhZFVpbnQ2NCAoKSB7XG4gICAgcmV0dXJuIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCA4KTtcbiAgfVxuXG4gIHJlYWRJbnQ4ICgpIHtcbiAgICByZXR1cm4gU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIDEsIHRydWUpO1xuICB9XG4gIHJlYWRJbnQxNiAoKSB7XG4gICAgcmV0dXJuIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCAyLCB0cnVlKTtcbiAgfVxuXG4gIHJlYWRJbnQzMiAoKSB7XG4gICAgcmV0dXJuIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCA0LCB0cnVlKTtcbiAgfVxuXG4gIHdyaXRlVWludDMyICh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgVWludDhBcnJheShbXG4gICAgICB2YWx1ZSA+Pj4gMjQgJiAweGZmLFxuICAgICAgdmFsdWUgPj4+IDE2ICYgMHhmZixcbiAgICAgIHZhbHVlID4+PiA4ICYgMHhmZixcbiAgICAgIHZhbHVlICYgMHhmZlxuICAgIF0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0cmVhbTtcbiIsImltcG9ydCB7IEZldGNoTG9hZGVyIH0gZnJvbSAneGdwbGF5ZXItbG9hZGVyJ1xuaW1wb3J0IHsgRmx2RGVtdXhlciB9IGZyb20gJ3hncGxheWVyLWRlbXV4J1xuaW1wb3J0IHsgTXA0UmVtdXhlciB9IGZyb20gJ3hncGxheWVyLXJlbXV4J1xuaW1wb3J0IHsgVHJhY2tzLCBYZ0J1ZmZlciwgUHJlU291cmNlIH0gZnJvbSAneGdwbGF5ZXItYnVmZmVyJ1xuaW1wb3J0IHsgRVZFTlRTLCBNb2JpbGVWaWRlbyB9IGZyb20gJ3hncGxheWVyLXV0aWxzJ1xuaW1wb3J0IHsgQ29tcGF0aWJpbGl0eSB9IGZyb20gJ3hncGxheWVyLWNvZGVjJ1xuaW1wb3J0IFBsYXllciBmcm9tICd4Z3BsYXllcidcblxuY29uc3QgREVNVVhfRVZFTlRTID0gRVZFTlRTLkRFTVVYX0VWRU5UUztcbmNvbnN0IExPQURFUl9FVkVOVFMgPSBFVkVOVFMuTE9BREVSX0VWRU5UU1xuY29uc3QgUkVNVVhfRVZFTlRTID0gRVZFTlRTLlJFTVVYX0VWRU5UU1xuXG5jb25zdCBUYWcgPSAnRkxWQ29udHJvbGxlcidcblxuY2xhc3MgTG9nZ2VyIHtcbiAgd2FybiAoKSB7fVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbHZDb250cm9sbGVyIHtcbiAgY29uc3RydWN0b3IgKHBsYXllcikge1xuICAgIHRoaXMuVEFHID0gVGFnXG4gICAgdGhpcy5fcGxheWVyID0gcGxheWVyXG5cbiAgICAvLyBUT0RPIOS4tOaXtuaMgueahCDpnIDopoHlpITnkIbliLBQbGF5ZXLlsYJcbiAgICAvLyB0aGlzLnZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbW9iaWxlLXZpZGVvJyk7XG4gICAgdGhpcy5fcGxheWVyLnZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbW9iaWxlLXZpZGVvJyk7XG4gICAgdGhpcy52aWRlbyA9IHRoaXMuX3BsYXllci52aWRlbztcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaW5pdFNlZ21lbnRBcnJpdmVkOiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIHRoaXMuX2NvbnRleHQucmVnaXN0cnkoJ0ZFVENIX0xPQURFUicsIEZldGNoTG9hZGVyKVxuICAgIHRoaXMuX2NvbnRleHQucmVnaXN0cnkoJ0xPQURFUl9CVUZGRVInLCBYZ0J1ZmZlcilcbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdQUkVfU09VUkNFX0JVRkZFUicsIFByZVNvdXJjZSlcblxuICAgIHRoaXMuX2NvbnRleHQucmVnaXN0cnkoJ0ZMVl9ERU1VWEVSJywgRmx2RGVtdXhlcilcblxuICAgIHRoaXMuX2NvbnRleHQucmVnaXN0cnkoJ01QNF9SRU1VWEVSJywgTXA0UmVtdXhlcilcbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdUUkFDS1MnLCBUcmFja3MpXG5cbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdDT01QQVRJQklMSVRZJywgQ29tcGF0aWJpbGl0eSlcblxuICAgIHRoaXMuX2NvbnRleHQucmVnaXN0cnkoJ0xPR0dFUicsIExvZ2dlcilcblxuICAgIHRoaXMuaW5pdExpc3RlbmVycygpXG4gIH1cblxuICBpbml0TGlzdGVuZXJzICgpIHtcbiAgICB0aGlzLm9uKExPQURFUl9FVkVOVFMuTE9BREVSX0RBVEFMT0FERUQsIHRoaXMuX2hhbmRsZUxvYWRlckRhdGFMb2FkZWQuYmluZCh0aGlzKSlcbiAgICB0aGlzLm9uKExPQURFUl9FVkVOVFMuTE9BREVSX0VSUk9SLCB0aGlzLl9oYW5kbGVOZXR3b3JrRXJyb3IuYmluZCh0aGlzKSlcblxuICAgIHRoaXMub24oREVNVVhfRVZFTlRTLk1FRElBX0lORk8sIHRoaXMuX2hhbmRsZU1lZGlhSW5mby5iaW5kKHRoaXMpKVxuICAgIHRoaXMub24oREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgdGhpcy5faGFuZGxlTWV0YWRhdGFQYXJzZWQuYmluZCh0aGlzKSlcbiAgICB0aGlzLm9uKERFTVVYX0VWRU5UUy5ERU1VWF9DT01QTEVURSwgdGhpcy5faGFuZGxlRGVtdXhDb21wbGV0ZS5iaW5kKHRoaXMpKVxuICAgIHRoaXMub24oREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLl9oYW5kbGVEZW11eEVycm9yLmJpbmQodGhpcykpXG5cbiAgfVxuXG4gIF9oYW5kbGVNZWRpYUluZm8gKCkge1xuICAgIGlmICghdGhpcy5fY29udGV4dC5tZWRpYUluZm8pIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIG5ldyBFcnJvcignZmFpbGVkIHRvIGdldCBtZWRpYWluZm8nKSlcbiAgICB9XG4gIH1cblxuICBfaGFuZGxlTG9hZGVyRGF0YUxvYWRlZCAoKSB7XG4gICAgdGhpcy5lbWl0VG8oJ0ZMVl9ERU1VWEVSJywgREVNVVhfRVZFTlRTLkRFTVVYX1NUQVJUKVxuICB9XG5cbiAgX2hhbmRsZU1ldGFkYXRhUGFyc2VkICh0eXBlKSB7XG4gICAgaWYgKHR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgIC8vIOWwhumfs+mikW1ldGHkv6Hmga/kuqTnu5lhdWRpb0NvbnRleHTvvIzkuI3otbByZW11eOWwgeijhVxuICAgICAgY29uc3QgeyBhdWRpb1RyYWNrIH0gPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKVxuICAgICAgaWYgKGF1ZGlvVHJhY2sgJiYgYXVkaW9UcmFjay5tZXRhKSB7XG4gICAgICAgIHRoaXMuX3NldE1ldGFUb0F1ZGlvKGF1ZGlvVHJhY2subWV0YSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgeyB2aWRlb1RyYWNrIH0gPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKVxuICAgICAgaWYgKHZpZGVvVHJhY2sgJiYgdmlkZW9UcmFjay5tZXRhKSB7XG4gICAgICAgIHRoaXMuX3NldE1ldGFUb1ZpZGVvKHZpZGVvVHJhY2subWV0YSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfaGFuZGxlRGVtdXhDb21wbGV0ZSAoKSB7XG4gICAgaWYodGhpcy5fcGxheWVyLnZpZGVvKSB7XG4gICAgICBjb25zdCB7IHZpZGVvVHJhY2ssIGF1ZGlvVHJhY2sgfSA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpO1xuICAgICAgdGhpcy5fcGxheWVyLnZpZGVvLm9uRGVtdXhDb21wbGV0ZSh2aWRlb1RyYWNrLCBhdWRpb1RyYWNrKTtcbiAgICB9XG4gIH1cblxuICBfaGFuZGxlQXBwZW5kSW5pdFNlZ21lbnQgKCkge1xuICAgIHRoaXMuc3RhdGUuaW5pdFNlZ21lbnRBcnJpdmVkID0gdHJ1ZVxuICAvLyAgdGhpcy5tc2UuYWRkU291cmNlQnVmZmVycygpXG4gIH1cblxuXG4gIF9oYW5kbGVOZXR3b3JrRXJyb3IgKCkge1xuICAgIHRoaXMuX3BsYXllci5lbWl0KCdlcnJvcicsIG5ldyBQbGF5ZXIuRXJyb3JzKCduZXR3b3JrJywgdGhpcy5fcGxheWVyLmNvbmZpZy51cmwpKVxuICB9XG5cbiAgX2hhbmRsZURlbXV4RXJyb3IgKCkge1xuICAgIHRoaXMuX3BsYXllci5lbWl0KCdlcnJvcicsIG5ldyBQbGF5ZXIuRXJyb3JzKCdwYXJzZScsIHRoaXMuX3BsYXllci5jb25maWcudXJsKSlcbiAgfVxuXG4gXG4gIF9zZXRNZXRhVG9BdWRpbyAoYXVkaW9NZXRhKSB7XG4gICAgaWYgKHRoaXMuX3BsYXllci52aWRlbykge1xuICAgICAgdGhpcy5fcGxheWVyLnZpZGVvLnNldEF1ZGlvTWV0YShhdWRpb01ldGEpO1xuICAgIH1cbiAgfVxuXG4gIF9zZXRNZXRhVG9WaWRlbyAodmlkZW9NZXRhKSB7XG4gICAgaWYgKHRoaXMuX3BsYXllci52aWRlbykge1xuICAgICAgdGhpcy5fcGxheWVyLnZpZGVvLnNldFZpZGVvTWV0YSh2aWRlb01ldGEpO1xuICAgIH1cbiAgfVxuXG4gIHNlZWsgKCkge1xuICAgIGlmICghdGhpcy5zdGF0ZS5pbml0U2VnbWVudEFycml2ZWQpIHtcbiAgICAgIHRoaXMubG9hZERhdGEoKVxuICAgIH1cbiAgfVxuXG4gIGxvYWREYXRhICgpIHtcbiAgICB0aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MQURFUl9TVEFSVCwgdGhpcy5fcGxheWVyLmNvbmZpZy51cmwpXG4gIH1cblxuICBwYXVzZSAoKSB7XG4gICAgY29uc3QgbG9hZGVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnRkVUQ0hfTE9BREVSJylcblxuICAgIGlmIChsb2FkZXIpIHtcbiAgICAgIGxvYWRlci5jYW5jZWwoKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDkv53or4HlvZPliY3mkq3mlL7nmoTop4bpopHku6Vnb3DkuLrljZXkvY1cbiAgICogQHBhcmFtIHZpZGVvVHJhY2tcbiAgICovXG4gIHN0YXRpYyByZXNvbHZlVmlkZW9HT1AgKHZpZGVvVHJhY2spIHtcbiAgICBjb25zdCB7IHNhbXBsZXMgfSA9IHZpZGVvVHJhY2s7XG4gICAgaWYgKCFzYW1wbGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBmaXJzdElmcmFtZUlkeCA9IG51bGxcbiAgICBsZXQgbGFzdElmcmFtZUlkeCA9IG51bGxcblxuICAgIGlmICh2aWRlb1RyYWNrLnRlbXBTYW1wbGVzICYmIHZpZGVvVHJhY2sudGVtcFNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICAvLyDlsIbnvJPlrZjluKfmlL7nva7liLDpmJ/liJfnmoTlpLTpg6hcbiAgICAgIHNhbXBsZXMudW5zaGlmdC5hcHBseShzYW1wbGVzLCB2aWRlb1RyYWNrLnRlbXBTYW1wbGVzKTtcbiAgICB9XG5cbiAgICAvLyDlr7vmib7nrKzkuIDkuKpJ5binXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNhbXBsZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSBzYW1wbGVzW2ldO1xuICAgICAgaWYgKGN1cnJlbnQuaXNLZXlmcmFtZSkge1xuICAgICAgICBmaXJzdElmcmFtZUlkeCA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIOWvu+aJvuacgOWQjuS4gOS4qknluKdcbiAgICBmb3IgKGxldCBpID0gc2FtcGxlcy5sZW5ndGggLSAxOyBpID4gMDsgaSsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50ID0gc2FtcGxlc1tpXVxuXG4gICAgICBpZiAoY3VycmVudC5pc0tleWZyYW1lKSB7XG4gICAgICAgIGxhc3RJZnJhbWVJZHggPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZmlyc3RJZnJhbWVJZHggIT09IDApIHtcbiAgICAgIHNhbXBsZXMuc3BsaWNlKDAsIGZpcnN0SWZyYW1lSWR4IC0gMSlcbiAgICB9XG5cbiAgICB2aWRlb1RyYWNrLnNhbXBsZXMgPSBzYW1wbGVzLnNsaWNlKDAsIGxhc3RJZnJhbWVJZHgpXG4gICAgY29uc3QgcmVzdCA9IHNhbXBsZXMuc2xpY2UobGFzdElmcmFtZUlkeClcbiAgICBpZiAodmlkZW9UcmFjay50ZW1wU2FtcGxlcykge1xuICAgICAgdmlkZW9UcmFjay50ZW1wU2FtcGxlcy5wdXNoLmFwcGx5KHZpZGVvVHJhY2sudGVtcFNhbXBsZXMsIHJlc3QpXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOWwhuWJqeS4i+eahOW4p+e8k+WtmO+8jOetieW+heS4gOS4quWujOaVtOeahGdvcFxuICAgICAgdmlkZW9UcmFjay50ZW1wU2FtcGxlcyA9IHJlc3RcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQbGF5ZXIgZnJvbSAneGdwbGF5ZXInXG5pbXBvcnQgeyBDb250ZXh0LCBFVkVOVFMgfSBmcm9tICd4Z3BsYXllci11dGlscyc7XG5pbXBvcnQgRkxWIGZyb20gJy4vZmx2LWxpdmUtbW9iaWxlJ1xuY29uc3QgZmx2QWxsb3dlZEV2ZW50cyA9IEVWRU5UUy5GbHZBbGxvd2VkRXZlbnRzO1xuXG5jbGFzcyBGbHZQbGF5ZXIgZXh0ZW5kcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvciAoY29uZmlnKSB7XG4gICAgc3VwZXIoY29uZmlnKVxuICAgIHRoaXMuY29udGV4dCA9IG5ldyBDb250ZXh0KGZsdkFsbG93ZWRFdmVudHMpXG4gICAgdGhpcy5pbml0RXZlbnRzKClcbiAgfVxuXG4gIHN0YXJ0ICgpIHtcbiAgICB0aGlzLmluaXRGbHYoKVxuICAgIHRoaXMuY29udGV4dC5pbml0KClcbiAgICB0aGlzLmZsdi5zZWVrKDApO1xuICAgIHN1cGVyLnN0YXJ0KHRoaXMuY29uZmlnLnVybCk7XG4gICAgdGhpcy5wbGF5KCk7XG4gIH1cblxuICBpbml0Rmx2RXZlbnRzIChmbHYpIHtcbiAgICBjb25zdCBwbGF5ZXIgPSB0aGlzO1xuICAgIGZsdi5vbmNlKEVWRU5UUy5SRU1VWF9FVkVOVFMuSU5JVF9TRUdNRU5ULCAoKSA9PiB7XG4gICAgICBQbGF5ZXIudXRpbC5hZGRDbGFzcyhwbGF5ZXIucm9vdCwgJ3hncGxheWVyLWlzLWxpdmUnKVxuICAgICAgaWYgKCFQbGF5ZXIudXRpbC5maW5kRG9tKHRoaXMucm9vdCwgJ3hnLWxpdmUnKSkge1xuICAgICAgICBjb25zdCBsaXZlID0gUGxheWVyLnV0aWwuY3JlYXRlRG9tKCd4Zy1saXZlJywgJ+ato+WcqOebtOaSrScsIHt9LCAneGdwbGF5ZXItbGl2ZScpXG4gICAgICAgIHBsYXllci5jb250cm9scy5hcHBlbmRDaGlsZChsaXZlKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBmbHYub25jZShFVkVOVFMuTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsICgpID0+IHtcbiAgICAgIC8vIOebtOaSreWujOaIkO+8jOW+heaSreaUvuWZqOaSreWujOe8k+WtmOWQjuWPkemAgeWFs+mXreS6i+S7tlxuICAgICAgaWYgKCFwbGF5ZXIucGF1c2VkKSB7XG4gICAgICAgIGNvbnN0IHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGVuZCA9IHBsYXllci5nZXRCdWZmZXJlZFJhbmdlKClbMV1cbiAgICAgICAgICBpZiAoTWF0aC5hYnMocGxheWVyLmN1cnJlbnRUaW1lIC0gZW5kKSA8IDAuNSkge1xuICAgICAgICAgICAgcGxheWVyLmVtaXQoJ2VuZGVkJylcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgMjAwKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBpbml0RXZlbnRzICgpIHtcbiAgICB0aGlzLm9uKCd0aW1ldXBkYXRlJywgKCkgPT4ge1xuICAgICAgdGhpcy5sb2FkRGF0YSgpXG4gICAgfSlcblxuICAgIHRoaXMub24oJ3NlZWtpbmcnLCAoKSA9PiB7XG4gICAgICBjb25zdCB0aW1lID0gdGhpcy5jdXJyZW50VGltZVxuICAgICAgY29uc3QgcmFuZ2UgPSB0aGlzLmdldEJ1ZmZlcmVkUmFuZ2UoKVxuICAgICAgaWYgKHRpbWUgPiByYW5nZVsxXSB8fCB0aW1lIDwgcmFuZ2VbMF0pIHtcbiAgICAgICAgdGhpcy5mbHYuc2Vlayh0aGlzLmN1cnJlbnRUaW1lKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBpbml0Rmx2ICgpIHtcbiAgICBjb25zdCBmbHYgPSB0aGlzLmNvbnRleHQucmVnaXN0cnkoJ0ZMVl9DT05UUk9MTEVSJywgRkxWKSh0aGlzKVxuICAgIHRoaXMuaW5pdEZsdkV2ZW50cyhmbHYpXG4gICAgdGhpcy5mbHYgPSBmbHZcbiAgfVxuXG4gIHBsYXkgKCkge1xuICAgIGNvbnNvbGUubG9nKCdwbGF5Jyk7XG4gICAgaWYgKHRoaXMuX2hhc1N0YXJ0KSB7XG4gICAgICB0aGlzLl9kZXN0cm95KClcbiAgICAgIHRoaXMuY29udGV4dCA9IG5ldyBDb250ZXh0KGZsdkFsbG93ZWRFdmVudHMpXG4gICAgICBjb25zdCBmbHYgPSB0aGlzLmNvbnRleHQucmVnaXN0cnkoJ0ZMVl9DT05UUk9MTEVSJywgRkxWKSh0aGlzKVxuICAgICAgdGhpcy5pbml0Rmx2RXZlbnRzKGZsdilcbiAgICAgIHRoaXMuZmx2ID0gZmx2XG4gICAgICB0aGlzLmNvbnRleHQuaW5pdCgpXG4gICAgICBzdXBlci5zdGFydChmbHYubXNlLnVybClcbiAgICAgIHN1cGVyLnBsYXkoKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5wbGF5KClcbiAgICB9XG4gIH1cblxuICBwYXVzZSAoKSB7XG4gICAgc3VwZXIucGF1c2UoKVxuICAgIGlmICh0aGlzLmZsdikge1xuICAgICAgdGhpcy5mbHYucGF1c2UoKVxuICAgIH1cbiAgfVxuXG4gIGxvYWREYXRhICh0aW1lID0gdGhpcy5jdXJyZW50VGltZSkge1xuICAgIGlmICh0aGlzLmZsdikge1xuICAgICAgdGhpcy5mbHYuc2Vlayh0aW1lKVxuICAgIH1cbiAgfVxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLl9kZXN0cm95KClcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gIH1cblxuICBfZGVzdHJveSAoKSB7XG4gICAgdGhpcy5jb250ZXh0LmRlc3Ryb3koKVxuICAgIHRoaXMuZmx2ID0gbnVsbFxuICAgIHRoaXMuY29udGV4dCA9IG51bGxcbiAgfVxuXG4gIGdldCBzcmMgKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRTcmNcbiAgfVxuXG4gIHNldCBzcmMgKHVybCkge1xuICAgIHRoaXMucGxheWVyLmNvbmZpZy51cmwgPSB1cmxcbiAgICBpZiAoIXRoaXMucGF1c2VkKSB7XG4gICAgICB0aGlzLnBhdXNlKClcbiAgICAgIHRoaXMub25jZSgncGF1c2UnLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3RhcnQodXJsKVxuICAgICAgfSlcbiAgICAgIHRoaXMub25jZSgnY2FucGxheScsICgpID0+IHtcbiAgICAgICAgdGhpcy5wbGF5KClcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhcnQodXJsKVxuICAgIH1cbiAgICB0aGlzLm9uY2UoJ2NhbnBsYXknLCAoKSA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRUaW1lID0gMFxuICAgIH0pXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGbHZQbGF5ZXJcbiIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJQbGF5ZXJcIl07IH0oKSk7Il0sInNvdXJjZVJvb3QiOiIifQ==