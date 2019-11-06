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
/*!*******************************************************************************************!*\
  !*** /Users/jiangyuqing/Desktop/Projects/devspace/xgplayer/node_modules/events/events.js ***!
  \*******************************************************************************************/
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
    this.pendingPlayTask = Promise.all([this.vCtx.play(), this.aCtx.play()]).then(() => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9GbHZQbGF5ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy9Vc2Vycy9qaWFuZ3l1cWluZy9EZXNrdG9wL1Byb2plY3RzL2RldnNwYWNlL3hncGxheWVyL25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWJ1ZmZlci9zcmMvYnVmZmVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1idWZmZXIvc3JjL3ByZXNvdWNlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1idWZmZXIvc3JjL3RyYWNrLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1jb2RlYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItY29kZWMvc3JjL2FhYy9hYWMtaGVscGVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1jb2RlYy9zcmMvY29tcGF0aWJpbGl0eS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItY29kZWMvc3JjL2gyNjQvbmFsdW5pdC9nb2xvbWIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWNvZGVjL3NyYy9oMjY0L25hbHVuaXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWNvZGVjL3NyYy9oMjY0L25hbHVuaXQvc3BzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1kZW11eC9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItZGVtdXgvc3JjL2Zsdi9hbWYtcGFyc2VyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1kZW11eC9zcmMvZmx2L2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1kZW11eC9zcmMvaGxzL2RlbXV4ZXIvbTN1OHBhcnNlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItZGVtdXgvc3JjL2hscy9kZW11eGVyL3RzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1kZW11eC9zcmMvaGxzL3BsYXlsaXN0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1sb2FkZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWxvYWRlci9zcmMvZmV0Y2gtbG9hZGVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1yZW11eC9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItcmVtdXgvc3JjL21wNC9mbXA0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1yZW11eC9zcmMvbXA0L2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvbm9kZV9tb2R1bGVzL2NvbmNhdC10eXBlZC1hcnJheS9saWIvY29uY2F0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9ub2RlX21vZHVsZXMvY29uY2F0LXR5cGVkLWFycmF5L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvbm9kZV9tb2R1bGVzL3dlYndvcmtpZnktd2VicGFjay9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL2NvbnN0YW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9jb25zdGFudHMvd29ya2VyLWNvbW1hbmRzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvY29udGV4dC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL2NyeXB0by9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL2Vudi9QYWdlVmlzaWJpbGl0eS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL2Vudi9pc2xlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvZW52L3NuaWZmZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9lbnYvdXRmOC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vYmlsZS9hdWRpby1jb250ZXh0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9iaWxlL21vYmlsZS12aWRlby5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vYmlsZS9zb3VyY2VidWZmZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2JpbGUvdGlja2VyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9iaWxlL3ZpZGVvLWNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2JpbGUvd29ya2VyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9iaWxlL3l1di1jYW52YXMuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2RlbHMvVGltZVJhbmdlcy5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vZGVscy9tZWRpYS1pbmZvLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9kZWxzL21lZGlhLXNhbXBsZS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vZGVscy9tZWRpYS1zZWdtZW50LWxpc3QuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2RlbHMvbWVkaWEtc2VnbWVudC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vZGVscy90cmFjay1tZXRhLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9kZWxzL3RyYWNrLXNhbXBsZS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21zZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL3dyaXRlL2J1ZmZlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL3dyaXRlL3N0cmVhbS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9zcmMvZmx2LWxpdmUuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci9leHRlcm5hbCBcIlBsYXllclwiIl0sIm5hbWVzIjpbIlIiLCJSZWZsZWN0IiwiUmVmbGVjdEFwcGx5IiwiYXBwbHkiLCJ0YXJnZXQiLCJyZWNlaXZlciIsImFyZ3MiLCJGdW5jdGlvbiIsInByb3RvdHlwZSIsImNhbGwiLCJSZWZsZWN0T3duS2V5cyIsIm93bktleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiY29uY2F0IiwiUHJvY2Vzc0VtaXRXYXJuaW5nIiwid2FybmluZyIsImNvbnNvbGUiLCJ3YXJuIiwiTnVtYmVySXNOYU4iLCJOdW1iZXIiLCJpc05hTiIsInZhbHVlIiwiRXZlbnRFbWl0dGVyIiwiaW5pdCIsIm1vZHVsZSIsImV4cG9ydHMiLCJfZXZlbnRzIiwidW5kZWZpbmVkIiwiX2V2ZW50c0NvdW50IiwiX21heExpc3RlbmVycyIsImRlZmF1bHRNYXhMaXN0ZW5lcnMiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJnZXQiLCJzZXQiLCJhcmciLCJSYW5nZUVycm9yIiwiZ2V0UHJvdG90eXBlT2YiLCJjcmVhdGUiLCJzZXRNYXhMaXN0ZW5lcnMiLCJuIiwiJGdldE1heExpc3RlbmVycyIsInRoYXQiLCJnZXRNYXhMaXN0ZW5lcnMiLCJlbWl0IiwidHlwZSIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJwdXNoIiwiZG9FcnJvciIsImV2ZW50cyIsImVycm9yIiwiZXIiLCJFcnJvciIsImVyciIsIm1lc3NhZ2UiLCJjb250ZXh0IiwiaGFuZGxlciIsImxlbiIsImxpc3RlbmVycyIsImFycmF5Q2xvbmUiLCJfYWRkTGlzdGVuZXIiLCJsaXN0ZW5lciIsInByZXBlbmQiLCJtIiwiZXhpc3RpbmciLCJUeXBlRXJyb3IiLCJuZXdMaXN0ZW5lciIsInVuc2hpZnQiLCJ3YXJuZWQiLCJ3IiwiU3RyaW5nIiwibmFtZSIsImVtaXR0ZXIiLCJjb3VudCIsImFkZExpc3RlbmVyIiwib24iLCJwcmVwZW5kTGlzdGVuZXIiLCJvbmNlV3JhcHBlciIsImZpcmVkIiwicmVtb3ZlTGlzdGVuZXIiLCJ3cmFwRm4iLCJfb25jZVdyYXAiLCJzdGF0ZSIsIndyYXBwZWQiLCJiaW5kIiwib25jZSIsInByZXBlbmRPbmNlTGlzdGVuZXIiLCJsaXN0IiwicG9zaXRpb24iLCJvcmlnaW5hbExpc3RlbmVyIiwic2hpZnQiLCJzcGxpY2VPbmUiLCJvZmYiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJrZXlzIiwia2V5IiwiX2xpc3RlbmVycyIsInVud3JhcCIsImV2bGlzdGVuZXIiLCJ1bndyYXBMaXN0ZW5lcnMiLCJyYXdMaXN0ZW5lcnMiLCJsaXN0ZW5lckNvdW50IiwiZXZlbnROYW1lcyIsImFyciIsImNvcHkiLCJBcnJheSIsImluZGV4IiwicG9wIiwicmV0IiwiVHJhY2siLCJyZXF1aXJlIiwiZGVmYXVsdCIsIlRyYWNrcyIsIkF1ZGlvVHJhY2siLCJWaWRlb1RyYWNrIiwiWGdCdWZmZXIiLCJSZW11eEJ1ZmZlciIsIlByZVNvdXJjZSIsImNvbnN0cnVjdG9yIiwiaGlzdG9yeUxlbiIsImFycmF5Iiwib2Zmc2V0IiwiZGF0YSIsImJ5dGVMZW5ndGgiLCJVaW50OEFycmF5IiwiX3NoaWZ0QnVmZmVyIiwic2xpY2UiLCJ0bXBvZmYiLCJ0bXAiLCJ0ZW1wbGVuZ3RoIiwiY2xlYXIiLCJkZXN0cm95IiwidG9JbnQiLCJzdGFydCIsInJldEludCIsInZpZGVvIiwiYXVkaW8iLCJTb3VyY2UiLCJtaW1ldHlwZSIsInNvdXJjZXMiLCJnZXRTb3VyY2UiLCJzb3VyY2UiLCJjcmVhdGVTb3VyY2UiLCJpZCIsInNlcXVlbmNlTnVtYmVyIiwic2FtcGxlcyIsImRyb3BwZWRTYW1wbGVzIiwicmVzZXQiLCJkaXN0cm95IiwiVEFHIiwiZHJvcHBlZCIsImF1ZGlvVHJhY2siLCJ2aWRlb1RyYWNrIiwiTmFsdW5pdCIsIlNwc1BhcnNlciIsIkNvbXBhdGliaWxpdHkiLCJBQUMiLCJnZXRTaWxlbnRGcmFtZSIsImNvZGVjIiwiY2hhbm5lbENvdW50IiwiUkVNVVhfRVZFTlRTIiwiREVNVVhfRVZFTlRTIiwiRVZFTlRTIiwibmV4dEF1ZGlvRHRzIiwibmV4dFZpZGVvRHRzIiwibGFzdEF1ZGlvU2FtcGxlc0xlbiIsImxhc3RWaWRlb1NhbXBsZXNMZW4iLCJsYXN0VmlkZW9EdHMiLCJsYXN0QXVkaW9EdHMiLCJhbGxBdWRpb1NhbXBsZXNDb3VudCIsImFsbFZpZGVvU2FtcGxlc0NvdW50IiwiX2ZpcnN0QXVkaW9TYW1wbGUiLCJfZmlyc3RWaWRlb1NhbXBsZSIsImZpbGxlZEF1ZGlvU2FtcGxlcyIsImZpbGxlZFZpZGVvU2FtcGxlcyIsIl92aWRlb0xhcmdlR2FwIiwiX2F1ZGlvTGFyZ2VHYXAiLCJiZWZvcmUiLCJSRU1VWF9NRURJQSIsImRvRml4IiwiaXNGaXJzdEF1ZGlvU2FtcGxlcyIsImlzRmlyc3RWaWRlb1NhbXBsZXMiLCJnZXRGaXJzdFNhbXBsZSIsInJlY29yZFNhbXBsZXNDb3VudCIsImZpeFJlZlNhbXBsZUR1cmF0aW9uIiwibWV0YSIsImNoYW5nZWQiLCJ2aWRlb0NoYW5nZWQiLCJjaGFuZ2VkSWR4IiwidmlkZW9DaGFuZ2VkSWR4IiwiZGV0YWN0Q2hhbmdlU3RyZWFtIiwiZml4Q2hhbmdlU3RyZWFtVmlkZW8iLCJkb0ZpeFZpZGVvIiwiYXVkaW9DaGFuZ2VkIiwiYXVkaW9DaGFuZ2VkSWR4IiwiZml4Q2hhbmdlU3RyZWFtQXVkaW8iLCJkb0ZpeEF1ZGlvIiwiZmlyc3QiLCJzdHJlYW1DaGFuZ2VTdGFydCIsInZpZGVvU2FtcGxlcyIsImZyYW1lUmF0ZSIsImZpeGVkIiwiZmlyc3RTYW1wbGUiLCJzYW1wbGVzTGVuIiwiZG9GaXhMYXJnZUdhcCIsImR0cyIsImRldGVjdExhcmdlR2FwIiwiZmlyc3REdHMiLCJ2aWRlb0ZpcnN0RHRzIiwiYXVkaW9GaXJzdER0cyIsImdhcCIsInJlZlNhbXBsZUR1cmF0aW9uIiwiZmlsbENvdW50IiwiTWF0aCIsImZsb29yIiwiY2xvbmVkRmlyc3RTYW1wbGUiLCJhc3NpZ24iLCJwdHMiLCJjdHMiLCJzaXplIiwiYWJzR2FwIiwiYWJzIiwiZmlsbEZyYW1lQ291bnQiLCJjbG9uZWRTYW1wbGUiLCJjb21wdXRlZCIsIm9yaWdpbkR0cyIsImxhc3REdHMiLCJsYXN0U2FtcGxlRHVyYXRpb24iLCJjdXJyZW50IiwibmV4dCIsImR1cmF0aW9uIiwiZmlsbEZyYW1lSWR4IiwiZmlsbEZyYW1lIiwic3BsaWNlIiwiYXVkaW9TYW1wbGVzIiwic2lsZW50RnJhbWUiLCJfZmlyc3RTYW1wbGUiLCJ2aWRlb0ZpcnN0UHRzIiwic2lsZW50U2FtcGxlQ291bnQiLCJzaWxlbnRTYW1wbGUiLCJkYXRhc2l6ZSIsImZpbHRlcmVkIiwicmVmU2FtcGxlRHVyYXRpb25GaXhlZCIsInNpbGVudEZyYW1lQ291bnQiLCJzb3J0QXVkaW9TYW1wbGVzIiwiY2hhbmdlSWR4IiwicHJldkR0cyIsImdldFN0cmVhbUNoYW5nZVN0YXJ0IiwiY3VyRHRzIiwiaXNDb250aW51ZSIsIm9wdGlvbnMiLCJmaXJzdFBhcnRTYW1wbGVzIiwic2Vjb25kUGFydFNhbXBsZXMiLCJjaGFuZ2VTYW1wbGUiLCJmaXJzdFBhcnREdXJhdGlvbiIsImZpbmRGaXJzdFZpZGVvU2FtcGxlIiwiZmluZEZpcnN0QXVkaW9TYW1wbGUiLCJpc1ZpZGVvIiwiYWxsU2FtcGxlc0NvdW50IiwiZmlsbGVkU2FtcGxlc0NvdW50IiwiZHVyYXRpb25BdmciLCJyZW1vdmVJbnZhbGlkU2FtcGxlcyIsImZpbHRlciIsInNhbXBsZSIsImR0c0Jhc2UiLCJJbmZpbml0eSIsInNvcnQiLCJhIiwiYiIsInNvcnRlZCIsImlzS2V5ZnJhbWUiLCJuZXh0RHRzIiwiY29uZDEiLCJjb25kMiIsImRpc2NvbnRpbnVlIiwidHJhY2tzIiwiX2NvbnRleHQiLCJnZXRJbnN0YW5jZSIsInJlbXV4ZXIiLCJfZHRzQmFzZSIsIkdvbG9tYiIsInVpbnQ4YXJyYXkiLCJfYnVmZmVyIiwiX2J1ZmZlckluZGV4IiwiX3RvdGFsQnl0ZXMiLCJfdG90YWxCaXRzIiwiX2N1cnJlbnRXb3JkIiwiX2N1cnJlbnRXb3JkQml0c0xlZnQiLCJfZmlsbEN1cnJlbnRXb3JkIiwiYnVmZmVyQnl0ZXNMZWZ0IiwiYnl0ZXNSZWFkIiwibWluIiwid29yZCIsInN1YmFycmF5IiwiRGF0YVZpZXciLCJidWZmZXIiLCJnZXRVaW50MzIiLCJyZWFkQml0cyIsImJpdHMiLCJ2YWx1IiwicmVhZEJvb2wiLCJyZWFkQnl0ZSIsIl9za2lwTGVhZGluZ1plcm8iLCJ6ZXJvQ291bnQiLCJyZWFkVUVHIiwibGVhZGluZ1plcm9zIiwicmVhZFNFRyIsImdldE5hbHVuaXRzIiwiYnVmIiwiZGF0YXZpZXciLCJnZXRJbnQzMiIsImdldEludDE2IiwiZ2V0SW50OCIsImdldEFubmV4Yk5hbHMiLCJnZXRBdmNjTmFscyIsIm5hbHMiLCJnZXRIZWFkZXJQb3NpdGlvbkFubmV4QiIsInBvcyIsImVuZCIsImhlYWRlciIsImhlYWRlckxlbmd0aCIsInNraXAiLCJib2R5IiwidW5pdCIsImFuYWx5c2VOYWwiLCJuZHIiLCJpZHIiLCJzcHMiLCJwYXJzZVNQUyIsInBwcyIsImdldEF2Y2MiLCJTUFNQYXJzZXIiLCJfZWJzcDJyYnNwIiwic3JjIiwic3JjTGVuZ3RoIiwiZHN0IiwiZHN0SWR4IiwicmJzcCIsImdiIiwicHJvZmlsZUlkYyIsImxldmVsSWRjIiwicHJvZmlsZV9zdHJpbmciLCJnZXRQcm9maWxlU3RyaW5nIiwibGV2ZWxfc3RyaW5nIiwiZ2V0TGV2ZWxTdHJpbmciLCJjaHJvbWFfZm9ybWF0X2lkYyIsImNocm9tYV9mb3JtYXQiLCJjaHJvbWFfZm9ybWF0X3RhYmxlIiwiYml0X2RlcHRoIiwic2NhbGluZ19saXN0X2NvdW50IiwiX3NraXBTY2FsaW5nTGlzdCIsInBpY19vcmRlcl9jbnRfdHlwZSIsIm51bV9yZWZfZnJhbWVzX2luX3BpY19vcmRlcl9jbnRfY3ljbGUiLCJwaWNfd2lkdGhfaW5fbWJzX21pbnVzMSIsInBpY19oZWlnaHRfaW5fbWFwX3VuaXRzX21pbnVzMSIsImZyYW1lX21ic19vbmx5X2ZsYWciLCJmcmFtZV9jcm9wX2xlZnRfb2Zmc2V0IiwiZnJhbWVfY3JvcF9yaWdodF9vZmZzZXQiLCJmcmFtZV9jcm9wX3RvcF9vZmZzZXQiLCJmcmFtZV9jcm9wX2JvdHRvbV9vZmZzZXQiLCJmcmFtZV9jcm9wcGluZ19mbGFnIiwicGFyX3dpZHRoIiwicGFyX2hlaWdodCIsImZwcyIsImZwc19maXhlZCIsImZwc19udW0iLCJmcHNfZGVuIiwidnVpX3BhcmFtZXRlcnNfcHJlc2VudF9mbGFnIiwiYXNwZWN0X3JhdGlvX2lkYyIsInBhcl93X3RhYmxlIiwicGFyX2hfdGFibGUiLCJudW1fdW5pdHNfaW5fdGljayIsInRpbWVfc2NhbGUiLCJwYXJTY2FsZSIsImNyb3BfdW5pdF94IiwiY3JvcF91bml0X3kiLCJzdWJfd2MiLCJzdWJfaGMiLCJjb2RlY193aWR0aCIsImNvZGVjX2hlaWdodCIsInByZXNlbnRfd2lkdGgiLCJjZWlsIiwiY2hyb21hX2Zvcm1hdF9zdHJpbmciLCJnZXRDaHJvbWFGb3JtYXRTdHJpbmciLCJmcmFtZV9yYXRlIiwicGFyX3JhdGlvIiwid2lkdGgiLCJoZWlnaHQiLCJjb2RlY19zaXplIiwicHJlc2VudF9zaXplIiwibGFzdF9zY2FsZSIsIm5leHRfc2NhbGUiLCJkZWx0YV9zY2FsZSIsInRvRml4ZWQiLCJjaHJvbWEiLCJ0b1ZpZGVvTWV0YSIsInNwc0NvbmZpZyIsImNvZGVjV2lkdGgiLCJjb2RlY0hlaWdodCIsInByZXNlbnRXaWR0aCIsInByZXNlbnRIZWlnaHQiLCJwcm9maWxlIiwibGV2ZWwiLCJiaXREZXB0aCIsImNocm9tYUZvcm1hdCIsInBhclJhdGlvIiwiZnBzRGVuIiwiZnBzTnVtIiwidGltZXNjYWxlIiwiTTNVOFBhcnNlciIsIlRzRGVtdXhlciIsIlBsYXlsaXN0IiwiRmx2RGVtdXhlciIsIkRBVEFfVFlQRVMiLCJOVU1CRVIiLCJCT09MRUFOIiwiU1RSSU5HIiwiT0JKRUNUIiwiTUlYX0FSUkFZIiwiT0JKRUNUX0VORCIsIlNUUklDVF9BUlJBWSIsIkRBVEUiLCJMT05FX1NUUklORyIsIkFNRlBhcnNlciIsInJlYWRPZmZzZXQiLCJyZXNvbHZlIiwibWV0YURhdGEiLCJwYXJzZVZhbHVlIiwiYm9keVNpemUiLCJyZXNldFN0YXR1cyIsInBhcnNlU3RyaW5nIiwiZHYiLCJzdHJMZW4iLCJnZXRVaW50MTYiLCJpc0xlIiwic3RyIiwiVVRGOCIsImRlY29kZSIsInBhcnNlRGF0ZSIsInRzIiwiZ2V0RmxvYXQ2NCIsInRpbWVPZmZzZXQiLCJEYXRlIiwicGFyc2VPYmplY3QiLCJpc09iakVuZCIsInBhcnNlTG9uZ1N0cmluZyIsIkFycmF5QnVmZmVyIiwiZGF0YVZpZXciLCJnZXRVaW50OCIsImJvb2xOdW0iLCJvYmpFbmRTaXplIiwiYW1mT2JqIiwiaXNPYmplY3RFbmQiLCJtYXJrIiwiYW1mVmFyIiwibWFya2VyIiwiYXJyTGVuZ3RoIiwic2NyaXB0IiwiZGF0ZSIsImxvbmdTdHIiLCJfZmlyc3RGcmFnbWVudExvYWRlZCIsIl90cmFja051bSIsIl9oYXNTY3JpcHQiLCJERU1VWF9TVEFSVCIsImRvUGFyc2VGbHYiLCJpc0ZsdkZpbGUiLCJnZXRQbGF5VHlwZSIsInN0cmVhbUZsYWciLCJyZXN1bHQiLCJoYXNWaWRlbyIsImhhc0F1ZGlvIiwibG9hZGVyQnVmZmVyIiwicGFyc2VGbHZIZWFkZXIiLCJjaHVuayIsImxvb3BNYXgiLCJfcGFyc2VGbHZUYWciLCJERU1VWF9DT01QTEVURSIsIkRFTVVYX0VSUk9SIiwicGxheVR5cGUiLCJpbml0VmlkZW9UcmFjayIsImluaXRBdWRpb1RyYWNrIiwiVmlkZW9UcmFja01ldGEiLCJBdWRpb1RyYWNrTWV0YSIsIl9wYXJzZUZsdlRhZ0hlYWRlciIsIl9wcm9jZXNzQ2h1bmsiLCJ0YWdUeXBlIiwidGltZXN0YW1wIiwidGltZXN0YW1wRXh0IiwiX3BhcnNlU2NyaXB0RGF0YSIsIl9wYXJzZUFBQ0RhdGEiLCJfcGFyc2VIZXZjRGF0YSIsImluZm8iLCJvbk1ldGFEYXRhIiwibWVkaWFJbmZvIiwiaHNhQXVkaW8iLCJ2YWxpZGF0ZSIsIl9kYXRhc2l6ZVZhbGlkYXRvciIsIk1FRElBX0lORk8iLCJoYXNTcGVjaWZpY0NvbmZpZyIsImF1ZGlvc2FtcGxlcmF0ZSIsInNhbXBsZVJhdGUiLCJhdWRpb2NoYW5uZWxzIiwic2FtcGxlUmF0ZUluZGV4IiwiZnJhbWVyYXRlIiwiX2FhY1NlcXVlbmNlSGVhZGVyUGFyc2VyIiwib2JqZWN0VHlwZSIsIm9yaWdpbk9iamVjdFR5cGUiLCJfc3dpdGNoQXVkaW9TYW1wbGVSYXRlIiwiZnJhbWVMZW5ndGgiLCJkZXBlbmRzT25Db3JlQ29kZXIiLCJleHRlbnNpb25GbGFnSW5kZXgiLCJ1c2VyQWdlbnQiLCJ3aW5kb3ciLCJuYXZpZ2F0b3IiLCJ0b0xvd2VyQ2FzZSIsImV4dGVuc2lvblNhbXBsaW5nSW5kZXgiLCJjb25maWciLCJzYW1wbGluZ0luZGV4IiwiaW5kZXhPZiIsInNuaWZmZXIiLCJicm93c2VyIiwidHJhY2siLCJmb3JtYXQiLCJfaGFzQXVkaW9TZXF1ZW5jZSIsIl9zd2l0Y2hBdWRpb1NhbXBsaW5nRnJlcXVlbmN5IiwiZnJhbWVMZW50aCIsImF1ZGlvU2FtcGxlUmF0ZSIsImF1ZGlvU2FtcGxlUmF0ZUluZGV4IiwiYWFjSGVhZGVyIiwiYXVkaW9NZWRpYSIsIk1FVEFEQVRBX1BBUlNFRCIsIkFVRElPX01FVEFEQVRBX0NIQU5HRSIsIl9tZXRhQ2hhbmdlIiwiZnJhbWVUeXBlIiwiY29kZWNJRCIsImF2Y1BhY2tldFR5cGUiLCJwYXJzZUludCIsIm5hbHUiLCJyIiwic2l6ZXMiLCJhdmNjbGVuZ3RoIiwiX2F2Y1NlcXVlbmNlSGVhZGVyUGFyc2VyIiwiX2hhc1ZpZGVvU2VxdWVuY2UiLCJWSURFT19NRVRBREFUQV9DSEFOR0UiLCJjb25maWd1cmF0aW9uVmVyc2lvbiIsImF2Y1Byb2ZpbGVJbmRpY2F0aW9uIiwicHJvZmlsZUNvbXBhdGliaWxpdHkiLCJhdmNMZXZlbEluZGljYXRpb24iLCJuYWxVbml0TGVuZ3RoIiwibnVtT2ZTcHMiLCJqIiwiY29kZWNTdHJpbmciLCJoIiwidG9TdHJpbmciLCJudW1PZlBwcyIsInZpZGVvTWVkaWEiLCJhdmNjIiwic2FtcGxpbmdGcmVxdWVuY3lJbmRleCIsInNhbXBsaW5nRnJlcXVlbmN5TGlzdCIsIl9zd2l0Y2hBdWRpb0NoYW5uZWwiLCJzYW1wbGVUcmFja051bUluZGV4Iiwic2FtcGxlVHJhY2tOdW1MaXN0IiwiZGF0YXNpemVDb25maXJtIiwibG9nZ2VyIiwicGFyc2UiLCJ0ZXh0IiwiYmFzZXVybCIsInNwbGl0IiwicmVmcyIsInJlZiIsIm1hdGNoIiwicmVmbSIsInJlZmQiLCJ2ZXJzaW9uIiwic2VxdWVuY2UiLCJ0YXJnZXRkdXJhdGlvbiIsInBhcnNlRmxvYXQiLCJwYXJzZUZyYWciLCJwYXJzZURlY3J5cHQiLCJmcmFncyIsImZyZWciLCJuZXh0bGluZSIsImNoYXJBdCIsInVybCIsInBhcnNlVVJMIiwidXJscyIsImVuY3J5cHQiLCJjbWQiLCJtZXRob2QiLCJ1cmkiLCJpdiIsIml2YiIsImltIiwic3Vic3RyIiwiU3RyZWFtVHlwZSIsImNvbmZpZ3MiLCJkZW11eGluZyIsInBhdCIsInBtdCIsIl9oYXNWaWRlb01ldGEiLCJfaGFzQXVkaW9NZXRhIiwiZGVtdXgiLCJmcmFnIiwiaW5wdXRCdWZmZXIiLCJwZXNlcyIsInRzU3RyZWFtIiwiU3RyZWFtIiwicmVhZCIsInBlcyIsInBpZCIsIkVTIiwicGF5bG9hZCIsInN0cmVhbSIsIkF1ZGlvT3B0aW9ucyIsIlZpZGVvT3B0aW9ucyIsImVwZXNlcyIsIk1lcmdlIiwicHVzaEF1ZGlvU2FtcGxlIiwicHVzaFZpZGVvU2FtcGxlIiwiX3RyYWNrcyIsImZyZXF1ZW5jZSIsImNoYW5uZWwiLCJhdWRpb09iamVjdFR5cGUiLCJhdWRpb0NvbmZpZyIsImZyZXF1ZW5jeUluZGV4IiwibWV0YUVxdWFsIiwiY29tcGFpcmVNZXRhIiwiQXVkaW9UcmFja1NhbXBsZSIsInNhbXBsZUxlbmd0aCIsIm5hbCIsInNhclJhdGlvIiwic2FyX3JhdGlvIiwiVmlkZW9UcmFja1NhbXBsZSIsImRlc3RvcnkiLCJjb21wYWlyZUFycmF5IiwiYWwiLCJibCIsImlnbm9yZUR1cmF0aW9uIiwiayIsIml0ZW1hIiwiaXRlbWIiLCJidWZmZXJzIiwicmVhZEhlYWRlciIsInJlYWRQYXlsb2FkIiwicGFja2V0IiwidW5rbm93blBJRHMiLCJQRVMiLCJQQVQiLCJDQVQiLCJUU0RUIiwic29tZSIsIml0ZW0iLCJQTVQiLCJzdHMiLCJNZWRpYSIsInN0cmVhbVR5cGUiLCJzeW5jIiwicmVhZFVpbnQ4IiwicmVhZFVpbnQxNiIsInByaW9yaXR5Iiwic2NyYW1ibGluZyIsImFkYXB0YXRpb24iLCJjb250aW51aXR5IiwidGFiZWxJRCIsInplcm8iLCJzZWN0aW9uTGVuZ3RoIiwic3RyZWFtSUQiLCJzZWN0aW9uTnVtYmVyIiwibGFzdFNlY3Rpb25OdW1iZXIiLCJOIiwicHJvZ3JhbU51bWJlciIsInByb2dyYW0iLCJ0YWJsZUlEIiwib3JkZXIiLCJsYXN0T3JkZXIiLCJQQ1JfUElEIiwicHJvZ3JhbUxlbmd0aCIsImVzIiwibWFwIiwiYWRhcHRhdGlvbkxlbmd0aCIsImFjY2VzcyIsIlBDUiIsIk9QQ1IiLCJzcGxpY2VQb2ludCIsInRyYW5zcG9ydFByaXZhdGUiLCJhZGFwdGF0aW9uRmllbGQiLCJfc3RhcnQiLCJwcm9ncmFtQ2xvY2tCYXNlIiwicmVhZFVpbnQzMiIsInByb2dyYW1DbG9ja0V4dGVuc2lvbiIsIm9yaWdpblByb2dyYW1DbG9ja0Jhc2UiLCJvcmlnaW5Qcm9ncmFtQ2xvY2tFeHRlbnNpb24iLCJzcGxpY2VDb3VudGRvd24iLCJ0cmFuc3BvcnRQcml2YXRlRGF0YSIsImx0dyIsInBpZWNld2lzZSIsInNlYW1sZXNzIiwibHR3VmFsaWQiLCJsdHdPZmZzZXQiLCJyZWFkVWludDI0IiwicGllY2V3aXNlUmF0ZSIsInJlYWRJbnQ4Iiwic3BsaWNlVHlwZSIsImR0c05leHRBVTEiLCJtYXJrZXIxIiwiZHRzTmV4dEFVMiIsIm1hcmtlcjIiLCJkdHNOZXh0QVUzIiwibGFzdFN0dWZmaW5nIiwicGFja2V0TGVuZ3RoIiwicHRzRFRTRmxhZyIsImVzY3JGbGFnIiwiZXNSYXRlRmxhZyIsImRzbUZsYWciLCJhZGRpdGlvbmFsRmxhZyIsImNyY0ZsYWciLCJleHRlbnNpb25GbGFnIiwicGVzSGVhZGVyTGVuZ3RoIiwiTjEiLCJlc2NyIiwiZXgiLCJlc1JhdGUiLCJhZGRpdGlvbmFsQ29weUluZm8iLCJwZXNDUkMiLCJiYWNrIiwiZnEiLCJsYXllciIsImFic2VudCIsImdldEF1ZGlvQ29uZmlnIiwic2VjdGlvbkluZGljYXRvciIsImN1cnJlbnROZXh0SW5kaWNhdG9yIiwiY3JjMzIiLCJleHRlbnNpb25TYW1wbGVJbmRleCIsInRlc3QiLCJpbnB1dGJ1ZmZlciIsIl9iYXNlVVJMIiwiX2xpc3QiLCJfdHMiLCJmcmFnTGVuZ3RoIiwiX2xhc3RnZXQiLCJfYXVkb2NsZWFyIiwiYXV0b2NsZWFyIiwiYmFzZVVSTCIsImRvd25sb2FkZWQiLCJkb3dubG9hZGluZyIsImRlbGV0ZUZyYWciLCJ0aW1lIiwicHVzaE0zVTgiLCJkZWxldGVwcmUiLCJuZXdmcmFnbGlzdCIsInRzbGlzdCIsImdldFRzTGlzdCIsInRzbmFtZSIsImlzbG9hZGVkIiwibG9hZGluZyIsImdldFRzQnlOYW1lIiwiZ2V0VHMiLCJ0aW1lbGlzdCIsImNsZWFyRG93bmxvYWRlZCIsImwiLCJGZXRjaExvYWRlciIsIkxPQURFUl9FVkVOVFMiLCJSRUFEX1NUUkVBTSIsIlJFQURfVEVYVCIsIlJFQURfSlNPTiIsIlJFQURfQlVGRkVSIiwic3RhdHVzIiwiX3JlYWRlciIsIl9jYW5jZWxlZCIsIl9kZXN0cm95ZWQiLCJyZWFkdHlwZSIsIl9sb2FkZXJUYXNrTm8iLCJMQURFUl9TVEFSVCIsImxvYWQiLCJvcHRzIiwiX3RoaXMiLCJwYXJhbXMiLCJnZXRQYXJhbXMiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsIm9rIiwiX29uRmV0Y2hSZXNwb25zZSIsIkxPQURFUl9FUlJPUiIsImNhdGNoIiwidGFza25vIiwianNvbiIsIkxPQURFUl9DT01QTEVURSIsImFycmF5QnVmZmVyIiwiX29uUmVhZGVyIiwiZ2V0UmVhZGVyIiwicmVhZGVyIiwiY2FuY2VsIiwiZSIsInZhbCIsImRvbmUiLCJMT0FERVJfREFUQUxPQURFRCIsImhlYWRlcnMiLCJIZWFkZXJzIiwibW9kZSIsImNhY2hlIiwiY29uZmlnSGVhZGVycyIsImhhc093blByb3BlcnR5IiwiYXBwZW5kIiwib3B0SGVhZGVycyIsImNvcnMiLCJ3aXRoQ3JlZGVudGlhbHMiLCJjcmVkZW50aWFscyIsIk1wNFJlbXV4ZXIiLCJGbXA0IiwiQnVmZmVyIiwid3JpdGVVaW50MzIiLCJpbml0Qm94IiwiY29udGVudCIsIndyaXRlIiwiZXh0ZW5zaW9uIiwiZmxhZyIsImZ0eXAiLCJtb292IiwibXZoZCIsInRyYWsiLCJ2aWRlb1RyYWsiLCJhdWRpb1RyYWsiLCJtdmV4IiwiZm9yRWFjaCIsImJ5dGVzIiwidGtoZCIsIm1kaWEiLCJzYW1wbGVyYXRlIiwiZWR0cyIsIm1lZGlhVGltZSIsIm1kaGQiLCJoZGxyIiwibWluZiIsInZtaGQiLCJzbWhkIiwiZGluZiIsInN0YmwiLCJkcmVmIiwic3RzZCIsInN0dHMiLCJzdHNjIiwic3RzeiIsInN0Y28iLCJtcDRhIiwiYXZjMSIsImVzZHMiLCJjb25maWdsZW4iLCJoU3BhY2luZyIsInZTcGFjaW5nIiwiYnRydCIsInBhc3AiLCJ0cmFja0lEIiwibWVoZCIsInRyZXgiLCJtb29mIiwibWZoZCIsInRyYWYiLCJ0ZmhkIiwidGZkdCIsInNkdHAiLCJ0cnVuIiwic2R0cExlbmd0aCIsInNhbXBsZUNvdW50IiwiZmxhZ3MiLCJpc0xlYWRpbmciLCJkZXBlbmRzT24iLCJpc0RlcGVuZGVkT24iLCJoYXNSZWR1bmRhbmN5IiwiaXNOb25TeW5jIiwibnVtIiwibWRhdCIsIm1kYXRCb3giLCJjaGFyQ29kZUF0IiwiX2lzRHRzQmFzZUluaXRlZCIsImlzRmlyc3RWaWRlbyIsImlzRmlyc3RBdWRpbyIsInZpZGVvQWxsRHVyYXRpb24iLCJhdWRpb0FsbER1cmF0aW9uIiwicmVtdXgiLCJSRU1VWF9NRVRBREFUQSIsIm9uTWV0YURhdGFSZWFkeSIsIkRFVEVDVF9DSEFOR0VfU1RSRUFNIiwicmVzZXREdHNCYXNlIiwiX2R0c0Jhc2VJbml0ZWQiLCJjYWxjRHRzQmFzZSIsIl9yZW11eFZpZGVvIiwiX3JlbXV4QXVkaW8iLCJzZWVrIiwicHJlc291cmNlYnVmZmVyIiwicmVtdXhJbml0U2VnbWVudCIsIklOSVRfU0VHTUVOVCIsImluaXRTZWdtZW50IiwiYXVkaW9CYXNlIiwidmlkZW9CYXNlIiwibXA0U2FtcGxlcyIsImF2Y1NhbXBsZSIsIm1kYXRTYW1wbGUiLCJzYW1wbGVEdXJhdGlvbiIsInZpZGVvTWV0YSIsIm1vb2ZNZGF0Iiwid3JpdGVUb1NvdXJjZSIsIk1FRElBX1NFR01FTlQiLCJsYXN0U2FtcGxlIiwiX3ZpZGVvTmV4dER0cyIsImlzRmlyc3REdHNJbml0ZWQiLCJhdWRpb01ldGEiLCJtcDRTYW1wbGUiLCJpbml0U2lsZW50QXVkaW8iLCJDb250ZXh0IiwiV09SS0VSX0NPTU1BTkRTIiwiUGFnZVZpc2liaWxpdHkiLCJNZWRpYUluZm8iLCJNZWRpYVNhbXBsZSIsIk1lZGlhU2VnbWVudCIsIk1lZGlhU2VnbWVudExpc3QiLCJNc2UiLCJNb2JpbGVWaWRlbyIsIkNyeXB0byIsIlJlc3VsdENvbnN0cnVjdG9yIiwidG90YWxMZW5ndGgiLCJfbGVuIiwiYXJyYXlzIiwiX2tleSIsIl9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24iLCJfZGlkSXRlcmF0b3JFcnJvciIsIl9pdGVyYXRvckVycm9yIiwiX2l0ZXJhdG9yIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJfc3RlcCIsInJldHVybiIsIl9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yIiwiX2RpZEl0ZXJhdG9yRXJyb3IyIiwiX2l0ZXJhdG9yRXJyb3IyIiwiX2l0ZXJhdG9yMiIsIl9zdGVwMiIsIl9hcnIiLCJfY29uY2F0IiwiX2NvbmNhdDIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib2JqIiwiX19lc01vZHVsZSIsIndlYnBhY2tCb290c3RyYXBGdW5jIiwibW9kdWxlcyIsImluc3RhbGxlZE1vZHVsZXMiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJjIiwiZCIsImdldHRlciIsIm8iLCJjb25maWd1cmFibGUiLCJnZXREZWZhdWx0IiwiZ2V0TW9kdWxlRXhwb3J0cyIsIm9iamVjdCIsInByb3BlcnR5IiwicCIsIm9lIiwiZiIsInMiLCJFTlRSWV9NT0RVTEUiLCJtb2R1bGVOYW1lUmVxRXhwIiwiZGVwZW5kZW5jeVJlZ0V4cCIsInF1b3RlUmVnRXhwIiwicmVwbGFjZSIsImlzTnVtZXJpYyIsImdldE1vZHVsZURlcGVuZGVuY2llcyIsInF1ZXVlTmFtZSIsInJldHZhbCIsImZuU3RyaW5nIiwid3JhcHBlclNpZ25hdHVyZSIsIndlYnBhY2tSZXF1aXJlTmFtZSIsInJlIiwiUmVnRXhwIiwiZXhlYyIsImhhc1ZhbHVlc0luUXVldWVzIiwicXVldWVzIiwicmVkdWNlIiwiaGFzVmFsdWVzIiwiZ2V0UmVxdWlyZWRNb2R1bGVzIiwibW9kdWxlc1F1ZXVlIiwibWFpbiIsInJlcXVpcmVkTW9kdWxlcyIsInNlZW5Nb2R1bGVzIiwicXVldWUiLCJtb2R1bGVUb0NoZWNrIiwibmV3TW9kdWxlcyIsIm5ld01vZHVsZXNLZXlzIiwiX193ZWJwYWNrX21vZHVsZXNfXyIsImFsbCIsImVudHJ5TW9kdWxlIiwiSlNPTiIsInN0cmluZ2lmeSIsImpvaW4iLCJibG9iIiwiQmxvYiIsImJhcmUiLCJVUkwiLCJ3ZWJraXRVUkwiLCJtb3pVUkwiLCJtc1VSTCIsIndvcmtlclVybCIsImNyZWF0ZU9iamVjdFVSTCIsIndvcmtlciIsIldvcmtlciIsIm9iamVjdFVSTCIsIlJFTVVYX0VSUk9SIiwiTVNFX0VWRU5UUyIsIlNPVVJDRV9VUERBVEVfRU5EIiwiSExTX0VWRU5UUyIsIlJFVFJZX1RJTUVfRVhDRUVERUQiLCJDUllUT19FVkVOVFMiLCJTVEFSVF9ERUNSWVBUIiwiREVDUllQVEVEIiwiQlJPV1NFUl9FVkVOVFMiLCJWSVNJQklMSVRZX0NIQU5HRSIsIkFMTEVWRU5UUyIsIkZsdkFsbG93ZWRFdmVudHMiLCJIbHNBbGxvd2VkRXZlbnRzIiwiQ09OVEVYVF9DT01PTUFORFMiLCJPTiIsIk9OQ0UiLCJPRkYiLCJFTUlUIiwiREVTVFJPWSIsIkRJUkVDVF9FTUlUX0ZMQUciLCJhbGxvd2VkRXZlbnRzIiwiX2VtaXR0ZXIiLCJfaW5zdGFuY2VNYXAiLCJfY2xzTWFwIiwiX2luaXRlZCIsIl9ob29rcyIsInRhZyIsImluc3RhbmNlIiwiaW5pdEluc3RhbmNlIiwibmV3SW5zdGFuY2UiLCJyZWdpc3RyeSIsImNscyIsImNoZWNrTWVzc2FnZU5hbWUiLCJfaXNNZXNzYWdlTmFtZVZhbGlkIiwic2VsZiIsImVuaGFuY2VkIiwib25jZUxpc3RlbmVycyIsIm1lc3NhZ2VOYW1lIiwiY2FsbGJhY2siLCJiZWZvcmVMaXN0IiwiZW1pdFRvIiwicmVtb3ZlTGlzdGVuZXJzIiwiaGFzT3duIiwiY2FsbGJhY2tzIiwiZGVzdHJveUluc3RhbmNlcyIsIm91dHB1dEJ1ZmZlciIsIm91dHB1dGJ1ZmZlciIsImNyeXB0byIsIm1zQ3J5cHRvIiwiZGVjcmlwdCIsImFlc2tleSIsInNia2V5Iiwic3VidGxlIiwiaW1wb3J0S2V5IiwiZGVjcmlwdERhdGEiLCJkZWNyeXB0IiwicmVzIiwiRXZlbnRzIiwiaGlkZGVuIiwidmlzaWJpbGl0eUNoYW5nZSIsImRvY3VtZW50IiwibXNIaWRkZW4iLCJ3ZWJraXRIaWRkZW4iLCJvblNob3ciLCJvbkhpZGRlbiIsImhhbmRsZVZpc2liaWxpdHlDaGFuZ2UiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImxlIiwic2V0SW50MTYiLCJJbnQxNkFycmF5IiwiZGV2aWNlIiwib3MiLCJpc1BjIiwiaXNUYWJsZXQiLCJ1YSIsInJlZyIsImllIiwiZmlyZm94IiwiY2hyb21lIiwib3BlcmEiLCJzYWZhcmkiLCJpc1dpbmRvd3NQaG9uZSIsImlzU3ltYmlhbiIsImlzQW5kcm9pZCIsImlzRmlyZUZveCIsImlzUGhvbmUiLCJvdXQiLCJpbnB1dCIsImZyb21DaGFyQ29kZSIsIl9jaGVja0NvbnRpbnVhdGlvbiIsInVjczQiLCJjaGVja0xlbmd0aCIsIkF1ZGlvQ3R4IiwiQXVkaW9Db250ZXh0Iiwid2Via2l0QXVkaW9Db250ZXh0IiwiZ2Fpbk5vZGUiLCJjcmVhdGVHYWluIiwiY29ubmVjdCIsImRlc3RpbmF0aW9uIiwicHJlbG9hZFRpbWUiLCJfY3VycmVudEJ1ZmZlciIsIl9uZXh0QnVmZmVyIiwiX2xhc3RwdHMiLCJfcHJlRGVjb2RlIiwiX2N1cnJlbnRUaW1lIiwiX2RlY29kaW5nIiwiX3ZvbHVtZSIsInZvbHVtZSIsIl9wbGF5ZWQiLCJwbGF5RmluaXNoIiwid2FpdE5leHRJRCIsImN1cnJlbnRUaW1lIiwiZGVjb2RlQXVkaW8iLCJzZXRBdWRpb0RhdGEiLCJkZWNvZGVBQUMiLCJzYW1wbGVEYXRhIiwiZ2V0QUFDRGF0YSIsImNvbWJpbGVEYXRhIiwiZGVjb2RlQXVkaW9EYXRhIiwiYXVkaW9Tb3VyY2UiLCJjcmVhdGVCdWZmZXJTb3VyY2UiLCJnZXRUaW1lQnVmZmVyIiwib25Tb3VyY2VFbmRlZCIsInNldFRpbWVvdXQiLCJwbGF5IiwicmVzdW1lIiwicGxheVN0YXJ0IiwiUHJvbWlzZSIsInBhdXNlIiwiYXVkaW9DdHgiLCJzdXNwZW5kIiwic2V0QXVkaW9NZXRhRGF0YSIsImNsZWFyVGltZW91dCIsImNsb3NlIiwibXV0ZWQiLCJnYWluIiwiYWR0cyIsImdldEFkdHMiLCJhYWNmcmFtZWxlbmd0aCIsIkFWUmVjb25jaWxlciIsInByb3BzIiwiYUN0eCIsInZDdHgiLCJ0aW1lb3V0SWQiLCJkb1JlY29uY2lsZSIsInZDdXJUaW1lIiwiYUN1clRpbWUiLCJIVE1MRWxlbWVudCIsIl9jYW52YXMiLCJjcmVhdGVFbGVtZW50IiwiaGFuZGxlQXVkaW9Tb3VyY2VFbmQiLCJwbGF5ZWQiLCJwZW5kaW5nUGxheVRhc2siLCJfcGF1c2VkIiwidmlkZW9NZXRhSW5pdGVkIiwiYXVkaW9NZXRhSW5pdGVkIiwiVmlkZW9DdHgiLCJjYW52YXMiLCJzdHlsZSIsInRpY2tlciIsInJlY29uY2lsZXIiLCJvbmNhbnBsYXkiLCJhcHBlbmRDaGlsZCIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsImNsZWFuQnVmZmVyIiwiX2NsZWFuQnVmZmVyIiwic3RvcCIsIm9uRGVtdXhDb21wbGV0ZSIsImRlY29kZVZpZGVvIiwic2V0QXVkaW9NZXRhIiwic2V0VmlkZW9NZXRhIiwic2V0VmlkZW9NZXRhRGF0YSIsImdldEF0dHJpYnV0ZSIsInZpZGVvV2lkdGgiLCJkaXNwbGF5IiwicHhWYWwiLCJzZXRBdHRyaWJ1dGUiLCJ2aWRlb0hlaWdodCIsInJlYWR5U3RhdGUiLCJzZWVraW5nIiwicGF1c2VkIiwicGxheWJhY2tSYXRlIiwiaGFzQXR0cmlidXRlIiwiZW5kZWQiLCJhdXRvcGxheSIsIm5vdyIsIl9vblRpbWVyIiwidm9sIiwiYXR0ck11dGVkIiwiYnVmZmVyZWQiLCJjdXN0b21FbGVtZW50cyIsImRlZmluZSIsIlNvdXJjZUJ1ZmZlciIsImN1cnJlbnRHb3AiLCJfbGFzdEdldCIsImZyYW1lIiwibmV4dEdvcCIsIl9nZXROZXh0IiwiZ29wIiwicmVtb3ZlIiwiVGlja2VyIiwiaW50ZXJ2YWwiLCJvblRpY2siLCJzZXRJbnRlcnZhbCIsIlJhZlRpY2tlciIsInByZXYiLCJ0aW1lcklkIiwiX3N1YlRpbWVySWQiLCJfdGlja0Z1bmMiLCJnZXRUaWNrRnVuYyIsInRpY2siLCJuZXh0VGljayIsImNhbmNlbEZ1bmMiLCJnZXRDYW5jZWxGdW5jIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJ3ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSIsImlzU3VwcG9ydGVkIiwiVGltZW91dFRpY2tlciIsImNsZWFySW50ZXJ2YWwiLCJnZXRUaWNrZXIiLCJWaWRlb0NhbnZhcyIsIm9uRmlyc3RGcmFtZSIsInJlYWR5U3RhdHVzIiwibGFzdFBsYXllZCIsIl9kZWNvZGVySW5pdGVkIiwiX2F2Y2NwdXNoZWQiLCJfZGVjb2RlZEZyYW1lcyIsIl9sYXN0U2FtcGxlRHRzIiwiX2Jhc2VEdHMiLCJfbGFzdFJlbmRlclRpbWUiLCJpbml0V2FzbVdvcmtlciIsIndhc213b3JrZXIiLCJwb3N0TWVzc2FnZSIsIm1zZyIsIl9vbkRlY29kZWQiLCJ5dXZDYW52YXMiLCJZVVZDYW52YXMiLCJfcHJlbG9hZCIsIl9hbmFseXNlTmFsIiwiZnJhbWVUaW1lcyIsImZyYW1lVGltZSIsInJlbmRlciIsInlMaW5lc2l6ZSIsInV2TGluZXNpemUiLCJyYW5nZXMiLCJjdXJyZW50UmFuZ2UiLCJUaW1lUmFuZ2VzIiwiTUFYX1NUUkVBTV9CVUZGRVJfTEVOR1RIIiwiRGVjb2RlciIsImluaXRlZCIsImluZm9saXN0IiwicGFyX2Jyb2Fkd2F5T25Ccm9hZHdheUluaXRlZCIsImJyb2Fkd2F5T25Ccm9hZHdheUluaXRlZCIsInBhcl9icm9hZHdheU9uUGljdHVyZURlY29kZWQiLCJicm9hZHdheU9uUGljdHVyZURlY29kZWQiLCJ0b1U4QXJyYXkiLCJwdHIiLCJIRUFQVTgiLCJNb2R1bGUiLCJfYnJvYWR3YXlJbml0Iiwic3RyZWFtQnVmZmVyIiwiX2Jyb2Fkd2F5Q3JlYXRlU3RyZWFtIiwiaW5mb2lkIiwieVJvd2NvdW50IiwidXZSb3djb3VudCIsImRhdGV0ZW1wIiwiZ2V0VGltZSIsIl9icm9hZHdheVBsYXlTdHJlYW0iLCJfYnJvYWR3YXlFeGl0IiwiZGVjb2RlciIsIm9uUG9zdFJ1biIsImltcG9ydFNjcmlwdHMiLCJhZGRPblBvc3RSdW4iLCJsb2ciLCJfaW5pdENvbnRleHRHTCIsImNvbnRleHRHTCIsIl9pbml0UHJvZ3JhbSIsIl9pbml0QnVmZmVycyIsIl9pbml0VGV4dHVyZXMiLCJnbCIsInZhbGlkQ29udGV4dE5hbWVzIiwibmFtZUluZGV4IiwiY29udGV4dE5hbWUiLCJjb250ZXh0T3B0aW9ucyIsImdldENvbnRleHQiLCJnZXRQYXJhbWV0ZXIiLCJ2ZXJ0ZXhTaGFkZXJTY3JpcHQiLCJmcmFnbWVudFNoYWRlclNjcmlwdCIsIllVVjJSR0IiLCJ2ZXJ0ZXhTaGFkZXIiLCJjcmVhdGVTaGFkZXIiLCJWRVJURVhfU0hBREVSIiwic2hhZGVyU291cmNlIiwiY29tcGlsZVNoYWRlciIsImdldFNoYWRlclBhcmFtZXRlciIsIkNPTVBJTEVfU1RBVFVTIiwiZ2V0U2hhZGVySW5mb0xvZyIsImZyYWdtZW50U2hhZGVyIiwiRlJBR01FTlRfU0hBREVSIiwiY3JlYXRlUHJvZ3JhbSIsImF0dGFjaFNoYWRlciIsImxpbmtQcm9ncmFtIiwiZ2V0UHJvZ3JhbVBhcmFtZXRlciIsIkxJTktfU1RBVFVTIiwiZ2V0UHJvZ3JhbUluZm9Mb2ciLCJ1c2VQcm9ncmFtIiwiWVVWMlJHQlJlZiIsImdldFVuaWZvcm1Mb2NhdGlvbiIsInVuaWZvcm1NYXRyaXg0ZnYiLCJzaGFkZXJQcm9ncmFtIiwidmVydGV4UG9zQnVmZmVyIiwiY3JlYXRlQnVmZmVyIiwiYmluZEJ1ZmZlciIsIkFSUkFZX0JVRkZFUiIsImJ1ZmZlckRhdGEiLCJGbG9hdDMyQXJyYXkiLCJTVEFUSUNfRFJBVyIsInZlcnRleFBvc1JlZiIsImdldEF0dHJpYkxvY2F0aW9uIiwiZW5hYmxlVmVydGV4QXR0cmliQXJyYXkiLCJ2ZXJ0ZXhBdHRyaWJQb2ludGVyIiwiRkxPQVQiLCJ0ZXh0dXJlUG9zQnVmZmVyIiwidGV4dHVyZVBvc1JlZiIsInVUZXh0dXJlUG9zQnVmZmVyIiwidVRleHR1cmVQb3NSZWYiLCJ2VGV4dHVyZVBvc0J1ZmZlciIsInZUZXh0dXJlUG9zUmVmIiwieVRleHR1cmVSZWYiLCJfaW5pdFRleHR1cmUiLCJ5U2FtcGxlclJlZiIsInVuaWZvcm0xaSIsInVUZXh0dXJlUmVmIiwidVNhbXBsZXJSZWYiLCJ2VGV4dHVyZVJlZiIsInZTYW1wbGVyUmVmIiwidGV4dHVyZVJlZiIsImNyZWF0ZVRleHR1cmUiLCJiaW5kVGV4dHVyZSIsIlRFWFRVUkVfMkQiLCJ0ZXhQYXJhbWV0ZXJpIiwiVEVYVFVSRV9NQUdfRklMVEVSIiwiTkVBUkVTVCIsIlRFWFRVUkVfTUlOX0ZJTFRFUiIsIlRFWFRVUkVfV1JBUF9TIiwiQ0xBTVBfVE9fRURHRSIsIlRFWFRVUkVfV1JBUF9UIiwiX2RyYXdQaWN0dXJlR0wiLCJ5bGVuIiwidXZsZW4iLCJyZW5kZXJEYXRhIiwieURhdGEiLCJ1RGF0YSIsInZEYXRhIiwiX2RyYXdQaWN0dXJlR0w0MjAiLCJ5RGF0YVBlclJvdyIsInlSb3dDbnQiLCJ1RGF0YVBlclJvdyIsInVSb3dDbnQiLCJ2RGF0YVBlclJvdyIsInZSb3dDbnQiLCJyYXRpb3ciLCJyYXRpb2giLCJsZWZ0IiwidG9wIiwidmlld3BvcnQiLCJ0ZXh0dXJlUG9zVmFsdWVzIiwiRFlOQU1JQ19EUkFXIiwidVRleHR1cmVQb3NWYWx1ZXMiLCJ2VGV4dHVyZVBvc1ZhbHVlcyIsImFjdGl2ZVRleHR1cmUiLCJURVhUVVJFMCIsInRleEltYWdlMkQiLCJMVU1JTkFOQ0UiLCJVTlNJR05FRF9CWVRFIiwiVEVYVFVSRTEiLCJURVhUVVJFMiIsImRyYXdBcnJheXMiLCJUUklBTkdMRV9TVFJJUCIsIl9kcmF3UGljdHVyZVJHQiIsImlkeCIsImFkZCIsInJhbmdlIiwiaXNPYmplY3RGaWxsZWQiLCJtaW1lVHlwZSIsImlzQ29tcGxldGUiLCJpc0Jhc2VJbmZvUmVhZHkiLCJpc1ZpZGVvUmVhZHkiLCJpc0F1ZGlvUmVhZHkiLCJfZGVmYXVsdCIsImdldERlZmF1bHRJbmYiLCJlbnRyaWVzIiwidiIsImlzUkFQIiwiX3R5cGUiLCJfbGFzdEFwcGVuZExvY2F0aW9uIiwiaXNFbXB0eSIsIl9zZWFyY2hOZWFyZXN0U2VnbWVudEJlZm9yZSIsImJlZ2luRHRzIiwibGFzdCIsIm1pZCIsImxib3VuZCIsInVib3VuZCIsIl9zZWFyY2hOZWFyZXN0U2VnbWVudEFmdGVyIiwic2VnbWVudCIsImxhc3RBcHBlbmRJZHgiLCJpbnNlcnRJZHgiLCJvcmlnaW5TdGFydER0cyIsImdldExhc3RTZWdtZW50QmVmb3JlIiwiZ2V0TGFzdFNhbXBsZUJlZm9yZSIsImdldExhc3RSQVBCZWZvcmUiLCJzZWdtZW50SWR4IiwicmFuZG9tQWNjZXNzUG9pbnRzIiwic3RhcnREdHMiLCJlbmREdHMiLCJzdGFydFB0cyIsImVuZFB0cyIsIm9yaWdpbkVuZER0cyIsImFkZFJBUCIsIk1TRSIsImNvbnRhaW5lciIsIm1lZGlhU291cmNlIiwic291cmNlQnVmZmVycyIsIm9uU291cmNlT3BlbiIsIm9uVGltZVVwZGF0ZSIsIm9uVXBkYXRlRW5kIiwib25XYWl0aW5nIiwiTWVkaWFTb3VyY2UiLCJhZGRTb3VyY2VCdWZmZXJzIiwiZG9BcHBlbmQiLCJkdXIiLCJtaW1lIiwic291cmNlQnVmZmVyIiwiYWRkU291cmNlQnVmZmVyIiwidXBkYXRpbmciLCJhcHBlbmRCdWZmZXIiLCJlbmRPZlN0cmVhbSIsImFjdGl2ZVNvdXJjZUJ1ZmZlcnMiLCJyZW1vdmVCdWZmZXJzIiwidGFza0xpc3QiLCJ0YXNrIiwiZG9DbGVhbkJ1ZmZlciIsInJldHJ5VGltZSIsImNsZWFuIiwiY2xlYXJCdWZmZXIiLCJyZW1vdmVTb3VyY2VCdWZmZXIiLCJyZXZva2VPYmplY3RVUkwiLCJiRW5kIiwicmVhZEFzSW50IiwidGVtcCIsInBhZFN0YXJ0NEhleCIsImhleE51bSIsImhleFN0ciIsInBhZFN0YXJ0IiwibG9vcCIsInNpZ24iLCJyZWFkVWludDY0IiwicmVhZEludDE2IiwicmVhZEludDMyIiwiVGFnIiwiTG9nZ2VyIiwiRkxWX0VSUk9SIiwiRmx2Q29udHJvbGxlciIsInBsYXllciIsIl9wbGF5ZXIiLCJpbml0U2VnbWVudEFycml2ZWQiLCJidWZmZXJDbGVhclRpbWVyIiwiUmVtdXhlciIsImNvbXBhdGliaWxpdHkiLCJtc2UiLCJfaGFuZGxlVGltZVVwZGF0ZSIsImluaXRMaXN0ZW5lcnMiLCJfaGFuZGxlTG9hZGVyRGF0YUxvYWRlZCIsIl9oYW5kbGVOZXR3b3JrRXJyb3IiLCJfaGFuZGxlTWVkaWFJbmZvIiwiX2hhbmRsZU1ldGFkYXRhUGFyc2VkIiwiX2hhbmRsZURlbXV4Q29tcGxldGUiLCJfaGFuZGxlRGVtdXhFcnJvciIsIl9oYW5kbGVBcHBlbmRJbml0U2VnbWVudCIsIl9oYW5kbGVNZWRpYVNlZ21lbnQiLCJfaGFuZGxlU291cmNlVXBkYXRlRW5kIiwiYnVmZmVyRW5kIiwiYnVmZmVyU3RhcnQiLCJQbGF5ZXIiLCJFcnJvcnMiLCJfb25FcnJvciIsImZhdGFsIiwibW9kIiwiZXJyb3JUeXBlIiwiZXJyb3JEZXRhaWxzIiwiZXJyb3JGYXRhbCIsImxvYWREYXRhIiwibG9hZGVyIiwiZmx2QWxsb3dlZEV2ZW50cyIsIkZsdlBsYXllciIsImluaXRFdmVudHMiLCJsb2FkZXJDb21wbGV0ZVRpbWVyIiwiaW5pdEZsdiIsImZsdiIsImluaXRGbHZFdmVudHMiLCJ1dGlsIiwiYWRkQ2xhc3MiLCJyb290IiwiZmluZERvbSIsImxpdmUiLCJjcmVhdGVEb20iLCJjb250cm9scyIsImdldEJ1ZmZlcmVkUmFuZ2UiLCJGTFYiLCJfaGFzU3RhcnQiLCJfZGVzdHJveSIsImN1cnJlbnRTcmMiXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsSUFBSUEsSUFBSSxPQUFPQyxPQUFQLEtBQW1CLFFBQW5CLEdBQThCQSxPQUE5QixHQUF3QyxJQUFoRDtBQUNBLElBQUlD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YztBQUNaLFNBQUsyM0IsTUFBTCxDQUFZOTdCLE1BQVosQ0FBbUJtRSxHQUFuQixHQUF5QkEsR0FBekI7QUFDQSxRQUFJLENBQUMsS0FBSzhsQixNQUFWLEVBQWtCO0FBQ2hCLFdBQUtyRCxLQUFMO0FBQ0EsV0FBSzNoQyxJQUFMLENBQVUsT0FBVixFQUFtQixNQUFNO0FBQ3ZCLGFBQUtnRCxLQUFMLENBQVdrYyxHQUFYO0FBQ0QsT0FGRDtBQUdBLFdBQUtsZixJQUFMLENBQVUsU0FBVixFQUFxQixNQUFNO0FBQ3pCLGFBQUt1aEMsSUFBTDtBQUNELE9BRkQ7QUFHRCxLQVJELE1BUU87QUFDTCxXQUFLditCLEtBQUwsQ0FBV2tjLEdBQVg7QUFDRDtBQUNELFNBQUtsZixJQUFMLENBQVUsU0FBVixFQUFxQixNQUFNO0FBQ3pCLFdBQUswZ0MsV0FBTCxHQUFtQixDQUFuQjtBQUNELEtBRkQ7QUFHRDtBQTlINEI7O0FBaUkvQnprQyxPQUFPQyxPQUFQLEdBQWlCMDhDLFNBQWpCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdElBLGFBQWEsbUNBQW1DLEVBQUUsSSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSID0gdHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnID8gUmVmbGVjdCA6IG51bGxcbnZhciBSZWZsZWN0QXBwbHkgPSBSICYmIHR5cGVvZiBSLmFwcGx5ID09PSAnZnVuY3Rpb24nXG4gID8gUi5hcHBseVxuICA6IGZ1bmN0aW9uIFJlZmxlY3RBcHBseSh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpO1xuICB9XG5cbnZhciBSZWZsZWN0T3duS2V5c1xuaWYgKFIgJiYgdHlwZW9mIFIub3duS2V5cyA9PT0gJ2Z1bmN0aW9uJykge1xuICBSZWZsZWN0T3duS2V5cyA9IFIub3duS2V5c1xufSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldClcbiAgICAgIC5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFByb2Nlc3NFbWl0V2FybmluZyh3YXJuaW5nKSB7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2FybikgY29uc29sZS53YXJuKHdhcm5pbmcpO1xufVxuXG52YXIgTnVtYmVySXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgZnVuY3Rpb24gTnVtYmVySXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICBFdmVudEVtaXR0ZXIuaW5pdC5jYWxsKHRoaXMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzQ291bnQgPSAwO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG52YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnRFbWl0dGVyLCAnZGVmYXVsdE1heExpc3RlbmVycycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGVmYXVsdE1heExpc3RlbmVycztcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgfHwgYXJnIDwgMCB8fCBOdW1iZXJJc05hTihhcmcpKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiZGVmYXVsdE1heExpc3RlbmVyc1wiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBhcmcgKyAnLicpO1xuICAgIH1cbiAgICBkZWZhdWx0TWF4TGlzdGVuZXJzID0gYXJnO1xuICB9XG59KTtcblxuRXZlbnRFbWl0dGVyLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICBpZiAodGhpcy5fZXZlbnRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHRoaXMuX2V2ZW50cyA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHMpIHtcbiAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59O1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMobikge1xuICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInIHx8IG4gPCAwIHx8IE51bWJlcklzTmFOKG4pKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcIm5cIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgbiArICcuJyk7XG4gIH1cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiAkZ2V0TWF4TGlzdGVuZXJzKHRoYXQpIHtcbiAgaWYgKHRoYXQuX21heExpc3RlbmVycyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgcmV0dXJuIHRoYXQuX21heExpc3RlbmVycztcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiAkZ2V0TWF4TGlzdGVuZXJzKHRoaXMpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT09IHVuZGVmaW5lZCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgdmFyIGVyO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+IDApXG4gICAgICBlciA9IGFyZ3NbMF07XG4gICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIC8vIE5vdGU6IFRoZSBjb21tZW50cyBvbiB0aGUgYHRocm93YCBsaW5lcyBhcmUgaW50ZW50aW9uYWwsIHRoZXkgc2hvd1xuICAgICAgLy8gdXAgaW4gTm9kZSdzIG91dHB1dCBpZiB0aGlzIHJlc3VsdHMgaW4gYW4gdW5oYW5kbGVkIGV4Y2VwdGlvbi5cbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgIH1cbiAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5oYW5kbGVkIGVycm9yLicgKyAoZXIgPyAnICgnICsgZXIubWVzc2FnZSArICcpJyA6ICcnKSk7XG4gICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICB0aHJvdyBlcnI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gIH1cblxuICB2YXIgaGFuZGxlciA9IGV2ZW50c1t0eXBlXTtcblxuICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBSZWZsZWN0QXBwbHkoaGFuZGxlciwgdGhpcywgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIFJlZmxlY3RBcHBseShsaXN0ZW5lcnNbaV0sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGFyZ2V0Ll9ldmVudHNDb3VudCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gICAgaWYgKGV2ZW50cy5uZXdMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICAgICAgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgaWYgKGV4aXN0aW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICAgICsrdGFyZ2V0Ll9ldmVudHNDb3VudDtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIGV4aXN0aW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID1cbiAgICAgICAgcHJlcGVuZCA/IFtsaXN0ZW5lciwgZXhpc3RpbmddIDogW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgfSBlbHNlIGlmIChwcmVwZW5kKSB7XG4gICAgICBleGlzdGluZy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBtID0gJGdldE1heExpc3RlbmVycyh0YXJnZXQpO1xuICAgIGlmIChtID4gMCAmJiBleGlzdGluZy5sZW5ndGggPiBtICYmICFleGlzdGluZy53YXJuZWQpIHtcbiAgICAgIGV4aXN0aW5nLndhcm5lZCA9IHRydWU7XG4gICAgICAvLyBObyBlcnJvciBjb2RlIGZvciB0aGlzIHNpbmNlIGl0IGlzIGEgV2FybmluZ1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICB2YXIgdyA9IG5ldyBFcnJvcignUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcubGVuZ3RoICsgJyAnICsgU3RyaW5nKHR5cGUpICsgJyBsaXN0ZW5lcnMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdpbmNyZWFzZSBsaW1pdCcpO1xuICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICB3LmVtaXR0ZXIgPSB0YXJnZXQ7XG4gICAgICB3LnR5cGUgPSB0eXBlO1xuICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgIFByb2Nlc3NFbWl0V2FybmluZyh3KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG5cbmZ1bmN0aW9uIG9uY2VXcmFwcGVyKCkge1xuICB2YXIgYXJncyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIGlmICghdGhpcy5maXJlZCkge1xuICAgIHRoaXMudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy53cmFwRm4pO1xuICAgIHRoaXMuZmlyZWQgPSB0cnVlO1xuICAgIFJlZmxlY3RBcHBseSh0aGlzLmxpc3RlbmVyLCB0aGlzLnRhcmdldCwgYXJncyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX29uY2VXcmFwKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIHN0YXRlID0geyBmaXJlZDogZmFsc2UsIHdyYXBGbjogdW5kZWZpbmVkLCB0YXJnZXQ6IHRhcmdldCwgdHlwZTogdHlwZSwgbGlzdGVuZXI6IGxpc3RlbmVyIH07XG4gIHZhciB3cmFwcGVkID0gb25jZVdyYXBwZXIuYmluZChzdGF0ZSk7XG4gIHdyYXBwZWQubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgc3RhdGUud3JhcEZuID0gd3JhcHBlZDtcbiAgcmV0dXJuIHdyYXBwZWQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG4gIHRoaXMub24odHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kT25jZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgdGhpcy5wcmVwZW5kTGlzdGVuZXIodHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4vLyBFbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWYgYW5kIG9ubHkgaWYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBsaXN0LCBldmVudHMsIHBvc2l0aW9uLCBpLCBvcmlnaW5hbExpc3RlbmVyO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBsaXN0ID0gZXZlbnRzW3R5cGVdO1xuICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdC5saXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKGkgPSBsaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8IGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBvcmlnaW5hbExpc3RlbmVyID0gbGlzdFtpXS5saXN0ZW5lcjtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwKVxuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICBldmVudHNbdHlwZV0gPSBsaXN0WzBdO1xuXG4gICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgb3JpZ2luYWxMaXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyh0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzLCBldmVudHMsIGk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhldmVudHMpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gICAgICB9IGVsc2UgaWYgKGxpc3RlbmVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIExJRk8gb3JkZXJcbiAgICAgICAgZm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbmZ1bmN0aW9uIF9saXN0ZW5lcnModGFyZ2V0LCB0eXBlLCB1bndyYXApIHtcbiAgdmFyIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG4gIGlmIChldmxpc3RlbmVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gdW53cmFwID8gW2V2bGlzdGVuZXIubGlzdGVuZXIgfHwgZXZsaXN0ZW5lcl0gOiBbZXZsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIHVud3JhcCA/XG4gICAgdW53cmFwTGlzdGVuZXJzKGV2bGlzdGVuZXIpIDogYXJyYXlDbG9uZShldmxpc3RlbmVyLCBldmxpc3RlbmVyLmxlbmd0aCk7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgdHJ1ZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJhd0xpc3RlbmVycyA9IGZ1bmN0aW9uIHJhd0xpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIubGlzdGVuZXJDb3VudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyQ291bnQuY2FsbChlbWl0dGVyLCB0eXBlKTtcbiAgfVxufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gbGlzdGVuZXJDb3VudDtcbmZ1bmN0aW9uIGxpc3RlbmVyQ291bnQodHlwZSkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGV2bGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdE93bktleXModGhpcy5fZXZlbnRzKSA6IFtdO1xufTtcblxuZnVuY3Rpb24gYXJyYXlDbG9uZShhcnIsIG4pIHtcbiAgdmFyIGNvcHkgPSBuZXcgQXJyYXkobik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKVxuICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICg7IGluZGV4ICsgMSA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKVxuICAgIGxpc3RbaW5kZXhdID0gbGlzdFtpbmRleCArIDFdO1xuICBsaXN0LnBvcCgpO1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmV0W2ldID0gYXJyW2ldLmxpc3RlbmVyIHx8IGFycltpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFRyYWNrOiByZXF1aXJlKCcuL3NyYy90cmFjaycpLmRlZmF1bHQsXG4gIFRyYWNrczogcmVxdWlyZSgnLi9zcmMvdHJhY2snKS5UcmFja3MsXG4gIEF1ZGlvVHJhY2s6IHJlcXVpcmUoJy4vc3JjL3RyYWNrJykuQXVkaW9UcmFjayxcbiAgVmlkZW9UcmFjazogcmVxdWlyZSgnLi9zcmMvdHJhY2snKS5WaWRlb1RyYWNrLFxuXG4gIFhnQnVmZmVyOiByZXF1aXJlKCcuL3NyYy9idWZmZXInKS5YZ0J1ZmZlcixcbiAgUmVtdXhCdWZmZXI6IHJlcXVpcmUoJy4vc3JjL2J1ZmZlcicpLlJlbXV4QnVmZmVyLFxuXG4gIFByZVNvdXJjZTogcmVxdWlyZSgnLi9zcmMvcHJlc291Y2UnKS5kZWZhdWx0XG59O1xuIiwiZXhwb3J0IGNsYXNzIFhnQnVmZmVyIHtcbiAgLyoqXG4gICAqIEEgYnVmZmVyIHRvIHN0b3JlIGxvYWRlZCBkYXRhLlxuICAgKlxuICAgKiBAY2xhc3MgTG9hZGVyQnVmZmVyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSBPcHRpb25hbCB0aGUgYnVmZmVyIHNpemVcbiAgICovXG4gIGNvbnN0cnVjdG9yIChsZW5ndGgpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aCB8fCAwXG4gICAgdGhpcy5oaXN0b3J5TGVuID0gbGVuZ3RoIHx8IDBcbiAgICB0aGlzLmFycmF5ID0gW11cbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZnVuY3Rpb24gdG8gcHVzaCBkYXRhLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gZGF0YSAtIFRoZSBkYXRhIHRvIHB1c2ggaW50byB0aGUgYnVmZmVyXG4gICAqL1xuICBwdXNoIChkYXRhKSB7XG4gICAgdGhpcy5hcnJheS5wdXNoKGRhdGEpXG4gICAgdGhpcy5sZW5ndGggKz0gZGF0YS5ieXRlTGVuZ3RoXG4gICAgdGhpcy5oaXN0b3J5TGVuICs9IGRhdGEuYnl0ZUxlbmd0aFxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBmdW5jdGlvbiB0byBzaGlmdCBkYXRhLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoIC0gVGhlIHNpemUgb2Ygc2hpZnQuXG4gICAqL1xuICBzaGlmdCAobGVuZ3RoKSB7XG4gICAgaWYgKHRoaXMuYXJyYXkubGVuZ3RoIDwgMSkge1xuICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KDApXG4gICAgfVxuXG4gICAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2hpZnRCdWZmZXIoKVxuICAgIH1cbiAgICBpZiAoKHRoaXMub2Zmc2V0ICsgbGVuZ3RoKSA9PT0gdGhpcy5hcnJheVswXS5sZW5ndGgpIHtcbiAgICAgIGxldCByZXQgPSB0aGlzLmFycmF5WzBdLnNsaWNlKHRoaXMub2Zmc2V0LCB0aGlzLm9mZnNldCArIGxlbmd0aClcbiAgICAgIHRoaXMub2Zmc2V0ID0gMFxuICAgICAgdGhpcy5hcnJheS5zaGlmdCgpXG4gICAgICB0aGlzLmxlbmd0aCAtPSBsZW5ndGhcbiAgICAgIHJldHVybiByZXRcbiAgICB9XG5cbiAgICBpZiAoKHRoaXMub2Zmc2V0ICsgbGVuZ3RoKSA8IHRoaXMuYXJyYXlbMF0ubGVuZ3RoKSB7XG4gICAgICBsZXQgcmV0ID0gdGhpcy5hcnJheVswXS5zbGljZSh0aGlzLm9mZnNldCwgdGhpcy5vZmZzZXQgKyBsZW5ndGgpXG4gICAgICB0aGlzLm9mZnNldCArPSBsZW5ndGhcbiAgICAgIHRoaXMubGVuZ3RoIC09IGxlbmd0aFxuICAgICAgcmV0dXJuIHJldFxuICAgIH1cblxuICAgIGxldCByZXQgPSBuZXcgVWludDhBcnJheShsZW5ndGgpXG4gICAgbGV0IHRtcG9mZiA9IDBcbiAgICB3aGlsZSAodGhpcy5hcnJheS5sZW5ndGggPiAwICYmIGxlbmd0aCA+IDApIHtcbiAgICAgIGlmICgodGhpcy5vZmZzZXQgKyBsZW5ndGgpIDwgdGhpcy5hcnJheVswXS5sZW5ndGgpIHtcbiAgICAgICAgbGV0IHRtcCA9IHRoaXMuYXJyYXlbMF0uc2xpY2UodGhpcy5vZmZzZXQsIHRoaXMub2Zmc2V0ICsgbGVuZ3RoKVxuICAgICAgICByZXQuc2V0KHRtcCwgdG1wb2ZmKVxuICAgICAgICB0aGlzLm9mZnNldCArPSBsZW5ndGhcbiAgICAgICAgdGhpcy5sZW5ndGggLT0gbGVuZ3RoXG4gICAgICAgIGxlbmd0aCA9IDBcbiAgICAgICAgYnJlYWtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB0ZW1wbGVuZ3RoID0gdGhpcy5hcnJheVswXS5sZW5ndGggLSB0aGlzLm9mZnNldFxuICAgICAgICByZXQuc2V0KHRoaXMuYXJyYXlbMF0uc2xpY2UodGhpcy5vZmZzZXQsIHRoaXMuYXJyYXlbMF0ubGVuZ3RoKSwgdG1wb2ZmKVxuICAgICAgICB0aGlzLmFycmF5LnNoaWZ0KClcbiAgICAgICAgdGhpcy5vZmZzZXQgPSAwXG4gICAgICAgIHRtcG9mZiArPSB0ZW1wbGVuZ3RoXG4gICAgICAgIHRoaXMubGVuZ3RoIC09IHRlbXBsZW5ndGhcbiAgICAgICAgbGVuZ3RoIC09IHRlbXBsZW5ndGhcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldFxuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRvIGNsZWFyIHRoZSBidWZmZXIuXG4gICAqL1xuICBjbGVhciAoKSB7XG4gICAgdGhpcy5hcnJheSA9IFtdXG4gICAgdGhpcy5sZW5ndGggPSAwXG4gICAgdGhpcy5vZmZzZXQgPSAwXG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmNsZWFyKClcbiAgICB0aGlzLmhpc3RvcnlMZW4gPSAwXG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gdG8gc2hpZnQgb25lIHVuaXQ4QXJyYXkuXG4gICAqL1xuICBfc2hpZnRCdWZmZXIgKCkge1xuICAgIHRoaXMubGVuZ3RoIC09IHRoaXMuYXJyYXlbMF0ubGVuZ3RoXG4gICAgdGhpcy5vZmZzZXQgPSAwXG4gICAgcmV0dXJuIHRoaXMuYXJyYXkuc2hpZnQoKVxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgdWludDggZGF0YSB0byBudW1iZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCAtIHRoZSBzdGFydCBwb3N0aW9uLlxuICAgKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoIC0gdGhlIGxlbmd0aCBvZiBkYXRhLlxuICAgKi9cbiAgdG9JbnQgKHN0YXJ0LCBsZW5ndGgpIHtcbiAgICBsZXQgcmV0SW50ID0gMFxuICAgIGxldCBpID0gdGhpcy5vZmZzZXQgKyBzdGFydFxuICAgIHdoaWxlIChpIDwgdGhpcy5vZmZzZXQgKyBsZW5ndGggKyBzdGFydCkge1xuICAgICAgaWYgKGkgPCB0aGlzLmFycmF5WzBdLmxlbmd0aCkge1xuICAgICAgICByZXRJbnQgPSByZXRJbnQgKiAyNTYgKyB0aGlzLmFycmF5WzBdW2ldXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYXJyYXlbMV0pIHtcbiAgICAgICAgcmV0SW50ID0gcmV0SW50ICogMjU2ICsgdGhpcy5hcnJheVsxXVtpIC0gdGhpcy5hcnJheVswXS5sZW5ndGhdXG4gICAgICB9XG5cbiAgICAgIGkrK1xuICAgIH1cbiAgICByZXR1cm4gcmV0SW50XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlbXV4QnVmZmVyIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMudmlkZW8gPSBbXVxuICAgIHRoaXMuYXVkaW8gPSBbXVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy52aWRlbyA9IFtdXG4gICAgdGhpcy5hdWRpbyA9IFtdXG4gIH1cbn1cbiIsImNsYXNzIFNvdXJjZSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLm1pbWV0eXBlID0gJyc7XG4gICAgdGhpcy5pbml0ID0gbnVsbDtcbiAgICB0aGlzLmRhdGEgPSBbXTtcbiAgfVxufVxuXG5jbGFzcyBQcmVTb3VyY2Uge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5zb3VyY2VzID0ge307XG4gIH1cblxuICBnZXRTb3VyY2UgKHNvdXJjZSkge1xuICAgIHJldHVybiB0aGlzLnNvdXJjZXNbc291cmNlXTtcbiAgfVxuXG4gIGNyZWF0ZVNvdXJjZSAobmFtZSkge1xuICAgIHRoaXMuc291cmNlc1tuYW1lXSA9IG5ldyBTb3VyY2UoKTtcbiAgICByZXR1cm4gdGhpcy5zb3VyY2VzW25hbWVdO1xuICB9XG5cbiAgY2xlYXIgKCkge1xuICAgIHRoaXMuc291cmNlcyA9IHt9O1xuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5zb3VyY2VzID0ge307XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJlU291cmNlO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJhY2sge1xuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yLlxuICAgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuaWQgPSAtMVxuICAgIHRoaXMuc2VxdWVuY2VOdW1iZXIgPSAwXG4gICAgdGhpcy5zYW1wbGVzID0gW11cbiAgICB0aGlzLmRyb3BwZWRTYW1wbGVzID0gW11cbiAgICB0aGlzLmxlbmd0aCA9IDBcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgdHJhY2suXG4gICAqL1xuICByZXNldCAoKSB7XG4gICAgdGhpcy5zZXF1ZW5jZU51bWJlciA9IDBcbiAgICB0aGlzLnNhbXBsZXMgPSBbXVxuICAgIHRoaXMubGVuZ3RoID0gMFxuICB9XG4gIC8qKlxuICAgKiBkZXN0cm95IHRoZSB0cmFjay5cbiAgICovXG4gIGRpc3Ryb3kgKCkge1xuICAgIHRoaXMucmVzZXQoKVxuICAgIHRoaXMuaWQgPSAtMVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBdWRpb1RyYWNrIGV4dGVuZHMgVHJhY2sge1xuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciBhdWRpbyB0cmFjay5cbiAgICovXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5UQUcgPSAnQXVkaW9UcmFjaydcbiAgICB0aGlzLnR5cGUgPSAnYXVkaW8nXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFZpZGVvVHJhY2sgZXh0ZW5kcyBUcmFjayB7XG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIHZpZGVvIHRyYWNrLlxuICAgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLlRBRyA9ICdWaWRlb1RyYWNrJ1xuICAgIHRoaXMudHlwZSA9ICd2aWRlbydcbiAgICB0aGlzLmRyb3BwZWQgPSAwXG4gIH1cbiAgLyoqXG4gICAqIHJlc2V0IHRoZSB2aWRlbyB0cmFjay5cbiAgICovXG4gIHJlc2V0ICgpIHtcbiAgICB0aGlzLnNlcXVlbmNlTnVtYmVyID0gMFxuICAgIHRoaXMuc2FtcGxlcyA9IFtdXG4gICAgdGhpcy5sZW5ndGggPSAwXG4gICAgdGhpcy5kcm9wcGVkID0gMFxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUcmFja3Mge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5hdWRpb1RyYWNrID0gbnVsbFxuICAgIHRoaXMudmlkZW9UcmFjayA9IG51bGxcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuYXVkaW9UcmFjayA9IG51bGxcbiAgICB0aGlzLnZpZGVvVHJhY2sgPSBudWxsXG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBOYWx1bml0OiByZXF1aXJlKCcuL3NyYy9oMjY0L25hbHVuaXQnKS5kZWZhdWx0LFxuICBTcHNQYXJzZXI6IHJlcXVpcmUoJy4vc3JjL2gyNjQvbmFsdW5pdC9zcHMnKS5kZWZhdWx0LFxuXG4gIENvbXBhdGliaWxpdHk6IHJlcXVpcmUoJy4vc3JjL2NvbXBhdGliaWxpdHknKS5kZWZhdWx0XG59O1xuIiwiXG5jbGFzcyBBQUMge1xuXG4gIHN0YXRpYyBnZXRTaWxlbnRGcmFtZShjb2RlYywgY2hhbm5lbENvdW50KSB7XG4gICAgaWYgKGNvZGVjID09PSAnbXA0YS40MC4yJykge1xuICAgICAgLy8gaGFuZGxlIExDLUFBQ1xuICAgICAgaWYgKGNoYW5uZWxDb3VudCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjMsIDB4ODBdKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSAyKSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgyMSwgMHgwMCwgMHg0OSwgMHg5MCwgMHgwMiwgMHgxOSwgMHgwMCwgMHgyMywgMHg4MF0pO1xuICAgICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDAwLCAweGM4LCAweDAwLCAweDgwLCAweDIwLCAweDg0LCAweDAxLCAweDI2LCAweDQwLCAweDA4LCAweDY0LCAweDAwLCAweDhlXSk7XG4gICAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gNCkge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4ODAsIDB4MmMsIDB4ODAsIDB4MDgsIDB4MDIsIDB4MzhdKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSA1KSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4MiwgMHgzMCwgMHgwNCwgMHg5OSwgMHgwMCwgMHgyMSwgMHg5MCwgMHgwMiwgMHgzOF0pO1xuICAgICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDYpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDAwLCAweGM4LCAweDAwLCAweDgwLCAweDIwLCAweDg0LCAweDAxLCAweDI2LCAweDQwLCAweDA4LCAweDY0LCAweDAwLCAweDgyLCAweDMwLCAweDA0LCAweDk5LCAweDAwLCAweDIxLCAweDkwLCAweDAyLCAweDAwLCAweGIyLCAweDAwLCAweDIwLCAweDA4LCAweGUwXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGhhbmRsZSBIRS1BQUMgKG1wNGEuNDAuNSAvIG1wNGEuNDAuMjkpXG4gICAgICBpZiAoY2hhbm5lbENvdW50ID09PSAxKSB7XG4gICAgICAgIC8vIGZmbXBlZyAteSAtZiBsYXZmaSAtaSBcImFldmFsc3JjPTA6ZD0wLjA1XCIgLWM6YSBsaWJmZGtfYWFjIC1wcm9maWxlOmEgYWFjX2hlIC1iOmEgNGsgb3V0cHV0LmFhYyAmJiBoZXhkdW1wIC12IC1lICcxNi8xIFwiMHgleCxcIiBcIlxcblwiJyAtdiBvdXRwdXQuYWFjXG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgxLCAweDQwLCAweDIyLCAweDgwLCAweGEzLCAweDRlLCAweGU2LCAweDgwLCAweGJhLCAweDgsIDB4MCwgMHgwLCAweDAsIDB4MWMsIDB4NiwgMHhmMSwgMHhjMSwgMHhhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVlXSk7XG4gICAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gMikge1xuICAgICAgICAvLyBmZm1wZWcgLXkgLWYgbGF2ZmkgLWkgXCJhZXZhbHNyYz0wfDA6ZD0wLjA1XCIgLWM6YSBsaWJmZGtfYWFjIC1wcm9maWxlOmEgYWFjX2hlX3YyIC1iOmEgNGsgb3V0cHV0LmFhYyAmJiBoZXhkdW1wIC12IC1lICcxNi8xIFwiMHgleCxcIiBcIlxcblwiJyAtdiBvdXRwdXQuYWFjXG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgxLCAweDQwLCAweDIyLCAweDgwLCAweGEzLCAweDVlLCAweGU2LCAweDgwLCAweGJhLCAweDgsIDB4MCwgMHgwLCAweDAsIDB4MCwgMHg5NSwgMHgwLCAweDYsIDB4ZjEsIDB4YTEsIDB4YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1ZV0pO1xuICAgICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDMpIHtcbiAgICAgICAgLy8gZmZtcGVnIC15IC1mIGxhdmZpIC1pIFwiYWV2YWxzcmM9MHwwfDA6ZD0wLjA1XCIgLWM6YSBsaWJmZGtfYWFjIC1wcm9maWxlOmEgYWFjX2hlX3YyIC1iOmEgNGsgb3V0cHV0LmFhYyAmJiBoZXhkdW1wIC12IC1lICcxNi8xIFwiMHgleCxcIiBcIlxcblwiJyAtdiBvdXRwdXQuYWFjXG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgxLCAweDQwLCAweDIyLCAweDgwLCAweGEzLCAweDVlLCAweGU2LCAweDgwLCAweGJhLCAweDgsIDB4MCwgMHgwLCAweDAsIDB4MCwgMHg5NSwgMHgwLCAweDYsIDB4ZjEsIDB4YTEsIDB4YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1ZV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFBQztcbiIsImltcG9ydCB7RVZFTlRTfSBmcm9tICd4Z3BsYXllci11dGlscydcbmltcG9ydCBBQUMgZnJvbSAnLi9hYWMvYWFjLWhlbHBlcidcblxuY29uc3Qge1JFTVVYX0VWRU5UUywgREVNVVhfRVZFTlRTfSA9IEVWRU5UU1xuXG5jbGFzcyBDb21wYXRpYmlsaXR5IHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMubmV4dEF1ZGlvRHRzID0gMCAvLyDmqKHmi5/kuIvkuIDmrrXpn7PpopHmlbDmja7nmoRkdHNcbiAgICB0aGlzLm5leHRWaWRlb0R0cyA9IDAgLy8g5qih5ouf5LiL5LiA5q616KeG6aKR5pWw5o2u55qEZHRzXG5cbiAgICB0aGlzLmxhc3RBdWRpb1NhbXBsZXNMZW4gPSAwIC8vIOS4iuS4gOautemfs+mikeaVsOaNrueahOmVv+W6plxuICAgIHRoaXMubGFzdFZpZGVvU2FtcGxlc0xlbiA9IDAgLy8g5LiK5LiA5q616KeG6aKR5pWw5o2u55qE6ZW/5bqmXG5cbiAgICB0aGlzLmxhc3RWaWRlb0R0cyA9IHVuZGVmaW5lZCAvLyDkuIrkuIDmrrXpn7PpopHmlbDmja7nmoTplb/luqZcbiAgICB0aGlzLmxhc3RBdWRpb0R0cyA9IHVuZGVmaW5lZCAvLyDkuIrkuIDmrrXop4bpopHmlbDmja7nmoTplb/luqZcblxuICAgIHRoaXMuYWxsQXVkaW9TYW1wbGVzQ291bnQgPSAwIC8vIOmfs+mikeaAu+aVsOaNrumHjyjljp/lp4vluKcpXG4gICAgdGhpcy5hbGxWaWRlb1NhbXBsZXNDb3VudCA9IDAgLy8g6KeG6aKR5oC75pWw5o2u6YePKOWOn+Wni+W4pylcblxuICAgIHRoaXMuX2ZpcnN0QXVkaW9TYW1wbGUgPSBudWxsXG4gICAgdGhpcy5fZmlyc3RWaWRlb1NhbXBsZSA9IG51bGxcblxuICAgIHRoaXMuZmlsbGVkQXVkaW9TYW1wbGVzID0gW10gLy8g6KGl5YWF6Z+z6aKR5bin77yI77yJXG4gICAgdGhpcy5maWxsZWRWaWRlb1NhbXBsZXMgPSBbXSAvLyDooaXlhYXop4bpopHluKfvvIjvvIlcblxuICAgIHRoaXMuX3ZpZGVvTGFyZ2VHYXAgPSAwXG4gICAgdGhpcy5fYXVkaW9MYXJnZUdhcCA9IDBcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIHRoaXMuYmVmb3JlKFJFTVVYX0VWRU5UUy5SRU1VWF9NRURJQSwgdGhpcy5kb0ZpeC5iaW5kKHRoaXMpKVxuICB9XG5cbiAgcmVzZXQgKCkge1xuICAgIHRoaXMubmV4dEF1ZGlvRHRzID0gbnVsbCAvLyDkvLDnrpfkuIvkuIDmrrXpn7PpopHmlbDmja7nmoRkdHNcbiAgICB0aGlzLm5leHRWaWRlb0R0cyA9IG51bGwgLy8g5Lyw566X5LiL5LiA5q616KeG6aKR5pWw5o2u55qEZHRzXG5cbiAgICB0aGlzLmxhc3RBdWRpb1NhbXBsZXNMZW4gPSAwIC8vIOS4iuS4gOautemfs+mikeaVsOaNrueahOmVv+W6plxuICAgIHRoaXMubGFzdFZpZGVvU2FtcGxlc0xlbiA9IDAgLy8g5LiK5LiA5q616KeG6aKR5pWw5o2u55qE6ZW/5bqmXG5cbiAgICB0aGlzLmxhc3RWaWRlb0R0cyA9IHVuZGVmaW5lZCAvLyDkuIrkuIDmrrXpn7PpopHmlbDmja7nmoTplb/luqZcbiAgICB0aGlzLmxhc3RBdWRpb0R0cyA9IHVuZGVmaW5lZCAvLyDkuIrkuIDmrrXop4bpopHmlbDmja7nmoTplb/luqZcblxuICAgIC8vIHRoaXMuYWxsQXVkaW9TYW1wbGVzQ291bnQgPSAwIC8vIOmfs+mikeaAu+aVsOaNrumHjyjljp/lp4vluKcpXG4gICAgLy8gdGhpcy5hbGxWaWRlb1NhbXBsZXNDb3VudCA9IDAgLy8g6KeG6aKR5oC75pWw5o2u6YePKOWOn+Wni+W4pylcblxuICAgIC8vIHRoaXMuX2ZpcnN0QXVkaW9TYW1wbGUgPSBudWxsXG4gICAgLy8gdGhpcy5fZmlyc3RWaWRlb1NhbXBsZSA9IG51bGxcblxuICAgIHRoaXMuZmlsbGVkQXVkaW9TYW1wbGVzID0gW10gLy8g6KGl5YWF6Z+z6aKR5bin77yI77yJXG4gICAgdGhpcy5maWxsZWRWaWRlb1NhbXBsZXMgPSBbXSAvLyDooaXlhYXop4bpopHluKfvvIjvvIlcbiAgfVxuXG4gIGRvRml4ICgpIHtcbiAgICBjb25zdCB7IGlzRmlyc3RBdWRpb1NhbXBsZXMsIGlzRmlyc3RWaWRlb1NhbXBsZXMgfSA9IHRoaXMuZ2V0Rmlyc3RTYW1wbGUoKVxuXG4gICAgLy8gdGhpcy5yZW1vdmVJbnZhbGlkU2FtcGxlcygpXG5cbiAgICB0aGlzLnJlY29yZFNhbXBsZXNDb3VudCgpXG5cbiAgICBpZiAodGhpcy5fZmlyc3RWaWRlb1NhbXBsZSkge1xuICAgICAgdGhpcy5maXhSZWZTYW1wbGVEdXJhdGlvbih0aGlzLnZpZGVvVHJhY2subWV0YSwgdGhpcy52aWRlb1RyYWNrLnNhbXBsZXMpXG4gICAgfVxuICAgIGlmICh0aGlzLl9maXJzdEF1ZGlvU2FtcGxlKSB7XG4gICAgICB0aGlzLmZpeFJlZlNhbXBsZUR1cmF0aW9uKHRoaXMuYXVkaW9UcmFjay5tZXRhLCB0aGlzLmF1ZGlvVHJhY2suc2FtcGxlcylcbiAgICB9XG5cbiAgICBjb25zdCB7IGNoYW5nZWQ6IHZpZGVvQ2hhbmdlZCwgY2hhbmdlZElkeDogdmlkZW9DaGFuZ2VkSWR4IH0gPSBDb21wYXRpYmlsaXR5LmRldGFjdENoYW5nZVN0cmVhbSh0aGlzLnZpZGVvVHJhY2suc2FtcGxlcylcbiAgICBpZiAodmlkZW9DaGFuZ2VkICYmICFpc0ZpcnN0QXVkaW9TYW1wbGVzKSB7XG4gICAgICB0aGlzLmZpeENoYW5nZVN0cmVhbVZpZGVvKHZpZGVvQ2hhbmdlZElkeClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb0ZpeFZpZGVvKGlzRmlyc3RWaWRlb1NhbXBsZXMpXG4gICAgfVxuXG4gICAgY29uc3QgeyBjaGFuZ2VkOiBhdWRpb0NoYW5nZWQsIGNoYW5nZWRJZHg6IGF1ZGlvQ2hhbmdlZElkeCB9ID0gQ29tcGF0aWJpbGl0eS5kZXRhY3RDaGFuZ2VTdHJlYW0odGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMpXG4gICAgaWYgKGF1ZGlvQ2hhbmdlZCkge1xuICAgICAgdGhpcy5maXhDaGFuZ2VTdHJlYW1BdWRpbyhhdWRpb0NoYW5nZWRJZHgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZG9GaXhBdWRpbyhpc0ZpcnN0QXVkaW9TYW1wbGVzKVxuICAgIH1cblxuICAgIC8vIHRoaXMucmVtb3ZlSW52YWxpZFNhbXBsZXMoKVxuICB9XG5cbiAgZG9GaXhWaWRlbyAoZmlyc3QsIHN0cmVhbUNoYW5nZVN0YXJ0KSB7XG4gICAgbGV0IHtzYW1wbGVzOiB2aWRlb1NhbXBsZXMsIG1ldGF9ID0gdGhpcy52aWRlb1RyYWNrXG5cbiAgICBpZiAobWV0YS5mcmFtZVJhdGUgJiYgbWV0YS5mcmFtZVJhdGUuZml4ZWQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF2aWRlb1NhbXBsZXMgfHwgIXZpZGVvU2FtcGxlcy5sZW5ndGggfHwgIXRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIGNvbnNvbGUubG9nKGB2aWRlbyBsYXN0U2FtcGxlLCAke3ZpZGVvU2FtcGxlc1t2aWRlb1NhbXBsZXMubGVuZ3RoIC0gMV0uZHRzfWApXG5cbiAgICBjb25zdCBmaXJzdFNhbXBsZSA9IHZpZGVvU2FtcGxlc1swXVxuXG4gICAgY29uc3Qgc2FtcGxlc0xlbiA9IHZpZGVvU2FtcGxlcy5sZW5ndGg7XG5cbiAgICAvLyBzdGVwMC7kv67lpI1obHPmtYHlh7rnjrDlt6jlpKdnYXDvvIzpnIDopoHlvLrliLbph43lrprkvY3nmoTpl67pophcbiAgICBpZiAodGhpcy5fdmlkZW9MYXJnZUdhcCA+IDApIHtcbiAgICAgIENvbXBhdGliaWxpdHkuZG9GaXhMYXJnZUdhcCh2aWRlb1NhbXBsZXMsIHRoaXMuX3ZpZGVvTGFyZ2VHYXApXG4gICAgfVxuXG4gICAgaWYgKGZpcnN0U2FtcGxlLmR0cyAhPT0gdGhpcy5fZmlyc3RWaWRlb1NhbXBsZS5kdHMgJiYgKHN0cmVhbUNoYW5nZVN0YXJ0IHx8IENvbXBhdGliaWxpdHkuZGV0ZWN0TGFyZ2VHYXAodGhpcy5uZXh0VmlkZW9EdHMsIGZpcnN0U2FtcGxlKSkpIHtcbiAgICAgIGlmIChzdHJlYW1DaGFuZ2VTdGFydCkge1xuICAgICAgICB0aGlzLm5leHRWaWRlb0R0cyA9IHN0cmVhbUNoYW5nZVN0YXJ0IC8vIEZJWDogSGxz5Lit6YCU5YiHY29kZWPvvIzlnKjlpoLmnpznm7TmjqVzZWVr5Yiw5ZCO6Z2i55qE54K55Lya5a+86Ie0bGFyZ2VHYXDorqHnrpflpLHotKVcbiAgICAgIH1cblxuICAgICAgdGhpcy5fdmlkZW9MYXJnZUdhcCA9IHRoaXMubmV4dFZpZGVvRHRzIC0gZmlyc3RTYW1wbGUuZHRzXG4gICAgICBDb21wYXRpYmlsaXR5LmRvRml4TGFyZ2VHYXAodmlkZW9TYW1wbGVzLCB0aGlzLl92aWRlb0xhcmdlR2FwKVxuICAgIH1cblxuICAgIGNvbnN0IGZpcnN0RHRzID0gZmlyc3RTYW1wbGUuZHRzXG5cbiAgICAvLyBzdGVwMS4g5L+u5aSN5LiOYXVkaW/pppbluKflt67ot53lpKrlpKfnmoTpl67pophcbiAgICBpZiAoZmlyc3QgJiYgdGhpcy5fZmlyc3RBdWRpb1NhbXBsZSkge1xuICAgICAgY29uc3QgdmlkZW9GaXJzdER0cyA9IHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUuZHRzXG4gICAgICBjb25zdCBhdWRpb0ZpcnN0RHRzID0gdGhpcy5fZmlyc3RBdWRpb1NhbXBsZS5kdHNcbiAgICAgIGNvbnN0IGdhcCA9IHZpZGVvRmlyc3REdHMgLSBhdWRpb0ZpcnN0RHRzXG4gICAgICBpZiAoZ2FwID4gKDIgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSkge1xuICAgICAgICBjb25zdCBmaWxsQ291bnQgPSBNYXRoLmZsb29yKGdhcCAvIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pXG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxsQ291bnQ7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGNsb25lZEZpcnN0U2FtcGxlID0gT2JqZWN0LmFzc2lnbih7fSwgZmlyc3RTYW1wbGUpIC8vIOinhumikeWktOmDqOW4p+e8uuWksemcgOimgeWkjeWItuesrOS4gOW4p1xuICAgICAgICAgIC8vIOmHjeaWsOiuoeeul3NhbXBsZeeahGR0c+WSjHB0c1xuICAgICAgICAgIGNsb25lZEZpcnN0U2FtcGxlLmR0cyA9IHZpZGVvRmlyc3REdHMgLSAoaSArIDEpICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuICAgICAgICAgIGNsb25lZEZpcnN0U2FtcGxlLnB0cyA9IGNsb25lZEZpcnN0U2FtcGxlLmR0cyArIGNsb25lZEZpcnN0U2FtcGxlLmN0c1xuXG4gICAgICAgICAgdmlkZW9TYW1wbGVzLnVuc2hpZnQoY2xvbmVkRmlyc3RTYW1wbGUpXG5cbiAgICAgICAgICB0aGlzLmZpbGxlZFZpZGVvU2FtcGxlcy5wdXNoKHtcbiAgICAgICAgICAgIGR0czogY2xvbmVkRmlyc3RTYW1wbGUuZHRzLFxuICAgICAgICAgICAgc2l6ZTogY2xvbmVkRmlyc3RTYW1wbGUuZGF0YS5ieXRlTGVuZ3RoXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBnYXBcbiAgICAvLyBzdGVwMi4g5L+u5aSNc2FtcGxlc+auteS5i+mXtOeahOmXtOi3nemXrumimOOAgVxuICAgIGlmICh0aGlzLm5leHRWaWRlb0R0cykge1xuICAgICAgLy8gc3RlcDEuIOWkhOeQhnNhbXBsZXPmrrXkuYvpl7TnmoTkuKLluKfmg4XlhrVcbiAgICAgIC8vIOW9k+WPkeeOsGR1cmF0aW9u5beu6Led5aSn5LqOMuW4p+aXtui/m+ihjOihpeW4p1xuICAgICAgZ2FwID0gZmlyc3REdHMgLSB0aGlzLm5leHRWaWRlb0R0c1xuICAgICAgY29uc3QgYWJzR2FwID0gTWF0aC5hYnMoZ2FwKVxuICAgICAgaWYgKGdhcCA+ICgyICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbikpIHtcbiAgICAgICAgY29uc3QgZmlsbEZyYW1lQ291bnQgPSBNYXRoLmZsb29yKGdhcCAvIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pXG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxsRnJhbWVDb3VudDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgY2xvbmVkU2FtcGxlID0gT2JqZWN0LmFzc2lnbih7fSwgdmlkZW9TYW1wbGVzWzBdKVxuICAgICAgICAgIGNvbnN0IGNvbXB1dGVkID0gZmlyc3REdHMgLSAoaSArIDEpICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuXG4gICAgICAgICAgY2xvbmVkU2FtcGxlLmR0cyA9IGNvbXB1dGVkID4gdGhpcy5uZXh0VmlkZW9EdHMgPyBjb21wdXRlZCA6IHRoaXMubmV4dFZpZGVvRHRzIC8vIOihpeeahOesrOS4gOW4p+S4gOWumuimgeaYr25leHRWaWRlb0R0c1xuICAgICAgICAgIGNsb25lZFNhbXBsZS5wdHMgPSBjbG9uZWRTYW1wbGUuZHRzICsgY2xvbmVkU2FtcGxlLmN0c1xuXG4gICAgICAgICAgdGhpcy52aWRlb1RyYWNrLnNhbXBsZXMudW5zaGlmdChjbG9uZWRTYW1wbGUpXG5cbiAgICAgICAgICB0aGlzLmZpbGxlZFZpZGVvU2FtcGxlcy5wdXNoKHtcbiAgICAgICAgICAgIGR0czogY2xvbmVkU2FtcGxlLmR0cyxcbiAgICAgICAgICAgIHNpemU6IGNsb25lZFNhbXBsZS5kYXRhLmJ5dGVMZW5ndGhcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGFic0dhcCA8PSBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uICYmIGFic0dhcCA+IDApIHtcbiAgICAgICAgLy8g5b2T5beu6Led5ZyoKy3kuIDluKfkuYvpl7Tml7blsIbnrKzkuIDluKfnmoRkdHPlvLrooYzlrprkvY3liLDmnJ/mnJvkvY3nva5cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ+mHjeWumuS9jeinhumikeW4p2R0cycsIHZpZGVvU2FtcGxlc1swXS5kdHMsIHRoaXMubmV4dFZpZGVvRHRzKVxuICAgICAgICB2aWRlb1NhbXBsZXNbMF0uZHRzID0gdGhpcy5uZXh0VmlkZW9EdHNcbiAgICAgICAgdmlkZW9TYW1wbGVzWzBdLm9yaWdpbkR0cyA9IHZpZGVvU2FtcGxlc1swXS5kdHNcbiAgICAgICAgdmlkZW9TYW1wbGVzWzBdLmN0cyA9IHZpZGVvU2FtcGxlc1swXS5jdHMgIT09IHVuZGVmaW5lZCA/IHZpZGVvU2FtcGxlc1swXS5jdHMgOiB2aWRlb1NhbXBsZXNbMF0ucHRzIC0gdmlkZW9TYW1wbGVzWzBdLmR0c1xuICAgICAgICB2aWRlb1NhbXBsZXNbMF0ucHRzID0gdmlkZW9TYW1wbGVzWzBdLmR0cyArIHZpZGVvU2FtcGxlc1swXS5jdHNcbiAgICAgIH0gZWxzZSBpZiAoZ2FwIDwgMCkge1xuICAgICAgICAvLyDlh7rnjrDlpKfnmoRnYXBcbiAgICAgICAgQ29tcGF0aWJpbGl0eS5kb0ZpeExhcmdlR2FwKHZpZGVvU2FtcGxlcywgKC0xICogZ2FwKSlcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgbGFzdER0cyA9IHZpZGVvU2FtcGxlc1t2aWRlb1NhbXBsZXMubGVuZ3RoIC0gMV0uZHRzO1xuXG4gICAgY29uc3QgbGFzdFNhbXBsZUR1cmF0aW9uID0gdmlkZW9TYW1wbGVzLmxlbmd0aCA+PSAyID8gbGFzdER0cyAtIHZpZGVvU2FtcGxlc1t2aWRlb1NhbXBsZXMubGVuZ3RoIC0gMl0uZHRzIDogbWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuXG4gICAgdGhpcy5sYXN0VmlkZW9TYW1wbGVzTGVuID0gc2FtcGxlc0xlblxuICAgIHRoaXMubmV4dFZpZGVvRHRzID0gbGFzdER0cyArIGxhc3RTYW1wbGVEdXJhdGlvblxuICAgIHRoaXMubGFzdFZpZGVvRHRzID0gbGFzdER0c1xuXG4gICAgLy8gc3RlcDIuIOS/ruWkjXNhbXBsZeauteS5i+WGheeahOmXtOi3nemXrumimFxuICAgIC8vIHN0ZXAzLiDkv67lpI1zYW1wbGVz5q615YaF6YOo55qEZHRz5byC5bi46Zeu6aKYXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHZpZGVvU2FtcGxlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgY3VycmVudCA9IHZpZGVvU2FtcGxlc1tpXVxuICAgICAgY29uc3QgbmV4dCA9IHZpZGVvU2FtcGxlc1tpICsgMV1cblxuICAgICAgaWYgKCFuZXh0KSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkdXJhdGlvbiA9IG5leHQuZHRzIC0gY3VycmVudC5kdHM7XG5cbiAgICAgIGlmIChkdXJhdGlvbiA+ICgyICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbikpIHtcbiAgICAgICAgLy8g5Lik5bin5LmL6Ze06Ze06ZqU5aSq5aSn77yM6ZyA6KaB6KGl56m655m95binXG4gICAgICAgIGxldCBmaWxsRnJhbWVDb3VudCA9IE1hdGguZmxvb3IoZHVyYXRpb24gLyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKVxuXG4gICAgICAgIGxldCBmaWxsRnJhbWVJZHggPSAwXG4gICAgICAgIHdoaWxlIChmaWxsRnJhbWVJZHggPCBmaWxsRnJhbWVDb3VudCkge1xuICAgICAgICAgIGNvbnN0IGZpbGxGcmFtZSA9IE9iamVjdC5hc3NpZ24oe30sIG5leHQpXG4gICAgICAgICAgZmlsbEZyYW1lLmR0cyA9IGN1cnJlbnQuZHRzICsgKGZpbGxGcmFtZUlkeCArIDEpICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuICAgICAgICAgIGZpbGxGcmFtZS5wdHMgPSBmaWxsRnJhbWUuZHRzICsgZmlsbEZyYW1lLmN0c1xuICAgICAgICAgIGlmIChmaWxsRnJhbWUgPCBuZXh0LmR0cykge1xuICAgICAgICAgICAgdmlkZW9TYW1wbGVzLnNwbGljZShpLCAwLCBmaWxsRnJhbWUpXG5cbiAgICAgICAgICAgIHRoaXMuZmlsbGVkVmlkZW9TYW1wbGVzLnB1c2goe1xuICAgICAgICAgICAgICBkdHM6IGZpbGxGcmFtZS5kdHMsXG4gICAgICAgICAgICAgIHNpemU6IGZpbGxGcmFtZS5kYXRhLmJ5dGVMZW5ndGhcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZmlsbEZyYW1lSWR4KytcbiAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnZpZGVvVHJhY2suc2FtcGxlcyA9IHZpZGVvU2FtcGxlcztcbiAgfVxuXG4gIGRvRml4QXVkaW8gKGZpcnN0LCBzdHJlYW1DaGFuZ2VTdGFydCkge1xuICAgIGxldCB7c2FtcGxlczogYXVkaW9TYW1wbGVzLCBtZXRhfSA9IHRoaXMuYXVkaW9UcmFja1xuXG4gICAgaWYgKCFhdWRpb1NhbXBsZXMgfHwgIWF1ZGlvU2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyhgYXVkaW8gbGFzdFNhbXBsZSwgJHthdWRpb1NhbXBsZXNbYXVkaW9TYW1wbGVzLmxlbmd0aCAtIDFdLmR0c31gKVxuXG4gICAgY29uc3Qgc2FtcGxlc0xlbiA9IGF1ZGlvU2FtcGxlcy5sZW5ndGg7XG4gICAgY29uc3Qgc2lsZW50RnJhbWUgPSBBQUMuZ2V0U2lsZW50RnJhbWUobWV0YS5jb2RlYywgbWV0YS5jaGFubmVsQ291bnQpXG5cbiAgICBjb25zdCBmaXJzdFNhbXBsZSA9IHRoaXMuX2ZpcnN0QXVkaW9TYW1wbGVcblxuICAgIGNvbnN0IF9maXJzdFNhbXBsZSA9IGF1ZGlvU2FtcGxlc1swXVxuICAgIC8vIOWvuWF1ZGlvU2FtcGxlc+aMieeFp2R0c+WBmuaOkuW6j1xuICAgIC8vIGF1ZGlvU2FtcGxlcyA9IENvbXBhdGliaWxpdHkuc29ydEF1ZGlvU2FtcGxlcyhhdWRpb1NhbXBsZXMpXG4gICAgaWYgKHRoaXMuX2F1ZGlvTGFyZ2VHYXAgPiAwKSB7XG4gICAgICBDb21wYXRpYmlsaXR5LmRvRml4TGFyZ2VHYXAoYXVkaW9TYW1wbGVzLCB0aGlzLl9hdWRpb0xhcmdlR2FwKVxuICAgIH1cblxuICAgIGlmIChfZmlyc3RTYW1wbGUuZHRzICE9PSB0aGlzLl9maXJzdEF1ZGlvU2FtcGxlLmR0cyAmJiAoc3RyZWFtQ2hhbmdlU3RhcnQgfHwgQ29tcGF0aWJpbGl0eS5kZXRlY3RMYXJnZUdhcCh0aGlzLm5leHRBdWRpb0R0cywgX2ZpcnN0U2FtcGxlKSkpIHtcbiAgICAgIGlmIChzdHJlYW1DaGFuZ2VTdGFydCkge1xuICAgICAgICB0aGlzLm5leHRBdWRpb0R0cyA9IHN0cmVhbUNoYW5nZVN0YXJ0IC8vIEZJWDogSGxz5Lit6YCU5YiHY29kZWPvvIzlnKjlpoLmnpznm7TmjqVzZWVr5Yiw5ZCO6Z2i55qE54K55Lya5a+86Ie0bGFyZ2VHYXDorqHnrpflpLHotKVcbiAgICAgIH1cbiAgICAgIHRoaXMuX2F1ZGlvTGFyZ2VHYXAgPSB0aGlzLm5leHRBdWRpb0R0cyAtIF9maXJzdFNhbXBsZS5kdHNcbiAgICAgIENvbXBhdGliaWxpdHkuZG9GaXhMYXJnZUdhcChhdWRpb1NhbXBsZXMsIHRoaXMuX2F1ZGlvTGFyZ2VHYXApXG4gICAgfVxuICAgIC8vIHN0ZXAwLiDpppbluKfkuI52aWRlb+mmluW4p+mXtOi3neWkp+eahOmXrumimFxuICAgIGlmICh0aGlzLl9maXJzdFZpZGVvU2FtcGxlICYmIGZpcnN0KSB7XG4gICAgICBjb25zdCB2aWRlb0ZpcnN0UHRzID0gdGhpcy5fZmlyc3RWaWRlb1NhbXBsZS5wdHMgPyB0aGlzLl9maXJzdFZpZGVvU2FtcGxlLnB0cyA6IHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUuZHRzICsgdGhpcy5fZmlyc3RWaWRlb1NhbXBsZS5jdHNcblxuICAgICAgaWYgKGZpcnN0U2FtcGxlLmR0cyAtIHZpZGVvRmlyc3RQdHMgPiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSB7XG4gICAgICAgIGNvbnN0IHNpbGVudFNhbXBsZUNvdW50ID0gTWF0aC5mbG9vcigoZmlyc3RTYW1wbGUuZHRzIC0gdmlkZW9GaXJzdFB0cykgLyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2lsZW50U2FtcGxlQ291bnQ7IGkrKykge1xuICAgICAgICAgIGNvbnN0IHNpbGVudFNhbXBsZSA9IHtcbiAgICAgICAgICAgIGRhdGE6IHNpbGVudEZyYW1lLFxuICAgICAgICAgICAgZGF0YXNpemU6IHNpbGVudEZyYW1lLmJ5dGVMZW5ndGgsXG4gICAgICAgICAgICBkdHM6IGZpcnN0U2FtcGxlLmR0cyAtIChpICsgMSkgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uLFxuICAgICAgICAgICAgZmlsdGVyZWQ6IDBcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhdWRpb1NhbXBsZXMudW5zaGlmdChzaWxlbnRTYW1wbGUpXG5cbiAgICAgICAgICB0aGlzLmZpbGxlZEF1ZGlvU2FtcGxlcy5wdXNoKHtcbiAgICAgICAgICAgIGR0czogc2lsZW50U2FtcGxlLmR0cyxcbiAgICAgICAgICAgIHNpemU6IHNpbGVudFNhbXBsZS5kYXRhLmJ5dGVMZW5ndGhcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGdhcFxuICAgIGNvbnN0IGZpcnN0RHRzID0gYXVkaW9TYW1wbGVzWzBdLmR0c1xuXG4gICAgaWYgKHRoaXMubmV4dEF1ZGlvRHRzKSB7XG4gICAgICAvLyBzdGVwMS4g5aSE55CGc2FtcGxlc+auteS5i+mXtOeahOS4ouW4p+aDheWGtVxuICAgICAgLy8g5b2T5Y+R546wZHVyYXRpb27lt67ot53lpKfkuo4x5bin5pe26L+b6KGM6KGl5binXG4gICAgICBnYXAgPSBmaXJzdER0cyAtIHRoaXMubmV4dEF1ZGlvRHRzXG4gICAgICBjb25zdCBhYnNHYXAgPSBNYXRoLmFicyhnYXApXG5cbiAgICAgIGlmIChhYnNHYXAgPiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uICYmIHNhbXBsZXNMZW4gPT09IDEgJiYgdGhpcy5sYXN0QXVkaW9TYW1wbGVzTGVuID09PSAxKSB7XG4gICAgICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZCA9IHVuZGVmaW5lZFxuICAgICAgfVxuXG4gICAgICBpZiAoZ2FwID4gKDIgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSkge1xuICAgICAgICBpZiAoc2FtcGxlc0xlbiA9PT0gMSAmJiB0aGlzLmxhc3RBdWRpb1NhbXBsZXNMZW4gPT09IDEpIHtcbiAgICAgICAgICAvLyDlpoLmnpxzYW1wbGXnmoRsZW5ndGjkuIDnm7TmmK8x77yM6ICM5LiU5LiA55u05LiN56ym5ZCIcmVmU2FtcGxlRHVyYXRpb27vvIzpnIDopoHliqjmgIHkv67mlLlyZWZTYW1wbGVEdXJhdGlvblxuICAgICAgICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZCA9IG1ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZCAhPT0gdW5kZWZpbmVkID8gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbkZpeGVkICsgZ2FwIDogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiArIGdhcFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHNpbGVudEZyYW1lQ291bnQgPSBNYXRoLmZsb29yKGdhcCAvIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pXG5cbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpbGVudEZyYW1lQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY29tcHV0ZWQgPSBmaXJzdER0cyAtIChpICsgMSkgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG4gICAgICAgICAgICBjb25zdCBzaWxlbnRTYW1wbGUgPSBPYmplY3QuYXNzaWduKHt9LCBhdWRpb1NhbXBsZXNbMF0sIHtcbiAgICAgICAgICAgICAgZHRzOiBjb21wdXRlZCA+IHRoaXMubmV4dEF1ZGlvRHRzID8gY29tcHV0ZWQgOiB0aGlzLm5leHRBdWRpb0R0c1xuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgdGhpcy5maWxsZWRBdWRpb1NhbXBsZXMucHVzaCh7XG4gICAgICAgICAgICAgIGR0czogc2lsZW50U2FtcGxlLmR0cyxcbiAgICAgICAgICAgICAgc2l6ZTogc2lsZW50U2FtcGxlLmRhdGEuYnl0ZUxlbmd0aFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMuYXVkaW9UcmFjay5zYW1wbGVzLnVuc2hpZnQoc2lsZW50U2FtcGxlKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChhYnNHYXAgPD0gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiAmJiBhYnNHYXAgPiAwKSB7XG4gICAgICAgIC8vIOW9k+W3rui3neavlOi+g+Wwj+eahOaXtuWAmeWwhumfs+mikeW4p+mHjeWumuS9jVxuICAgICAgICAvLyBjb25zb2xlLmxvZygn6YeN5a6a5L2N6Z+z6aKR5binZHRzJywgYXVkaW9TYW1wbGVzWzBdLmR0cywgdGhpcy5uZXh0QXVkaW9EdHMpXG4gICAgICAgIGF1ZGlvU2FtcGxlc1swXS5kdHMgPSB0aGlzLm5leHRBdWRpb0R0c1xuICAgICAgICBhdWRpb1NhbXBsZXNbMF0ucHRzID0gdGhpcy5uZXh0QXVkaW9EdHNcbiAgICAgIH0gZWxzZSBpZiAoZ2FwIDwgMCkge1xuICAgICAgICBDb21wYXRpYmlsaXR5LmRvRml4TGFyZ2VHYXAoYXVkaW9TYW1wbGVzLCAoLTEgKiBnYXApKVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBsYXN0RHRzID0gYXVkaW9TYW1wbGVzW2F1ZGlvU2FtcGxlcy5sZW5ndGggLSAxXS5kdHM7XG4gICAgY29uc3QgbGFzdFNhbXBsZUR1cmF0aW9uID0gYXVkaW9TYW1wbGVzLmxlbmd0aCA+PSAyID8gbGFzdER0cyAtIGF1ZGlvU2FtcGxlc1thdWRpb1NhbXBsZXMubGVuZ3RoIC0gMl0uZHRzIDogbWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuXG4gICAgdGhpcy5sYXN0QXVkaW9TYW1wbGVzTGVuID0gc2FtcGxlc0xlbjtcbiAgICB0aGlzLm5leHRBdWRpb0R0cyA9IG1ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZCA/IGxhc3REdHMgKyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uRml4ZWQgOiBsYXN0RHRzICsgbGFzdFNhbXBsZUR1cmF0aW9uXG4gICAgdGhpcy5sYXN0QXVkaW9EdHMgPSBsYXN0RHRzXG5cbiAgICAvLyBzdGVwMy4g5L+u5aSNc2FtcGxlc+auteWGhemDqOeahGR0c+W8guW4uOmXrumimFxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhdWRpb1NhbXBsZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSBhdWRpb1NhbXBsZXNbaV1cbiAgICAgIGNvbnN0IG5leHQgPSBhdWRpb1NhbXBsZXNbaSArIDFdXG5cbiAgICAgIGlmICghbmV4dCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY29uc3QgZHVyYXRpb24gPSBuZXh0LmR0cyAtIGN1cnJlbnQuZHRzO1xuICAgICAgYXVkaW9TYW1wbGVzW2ldLmR1cmF0aW9uID0gZHVyYXRpb247XG4gICAgICAvKlxuICAgICAgaWYgKGR1cmF0aW9uID4gKDIgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSkge1xuICAgICAgICAvLyDkuKTluKfkuYvpl7Tpl7TpmpTlpKrlpKfvvIzpnIDopoHooaXnqbrnmb3luKdcbiAgICAgICAgLyoqXG4gICAgICAgIGxldCBzaWxlbnRGcmFtZUNvdW50ID0gTWF0aC5mbG9vcihkdXJhdGlvbiAvIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pXG4gICAgICAgIGxldCBmcmFtZUlkeCA9IDBcblxuICAgICAgICB3aGlsZSAoZnJhbWVJZHggPCBzaWxlbnRGcmFtZUNvdW50KSB7XG4gICAgICAgICAgY29uc3Qgc2lsZW50U2FtcGxlID0ge1xuICAgICAgICAgICAgZGF0YTogc2lsZW50RnJhbWUsXG4gICAgICAgICAgICBkYXRhc2l6ZTogc2lsZW50RnJhbWUuYnl0ZUxlbmd0aCxcbiAgICAgICAgICAgIGR0czogY3VycmVudC5kdHMgKyAoZnJhbWVJZHggKyAxKSAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb24sXG4gICAgICAgICAgICBmaWx0ZXJlZDogMCxcbiAgICAgICAgICAgIGlzU2lsZW50OiB0cnVlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYXVkaW9TYW1wbGVzLnNwbGljZShpLCAwLCBzaWxlbnRTYW1wbGUpXG5cbiAgICAgICAgICB0aGlzLmZpbGxlZEF1ZGlvU2FtcGxlcy5wdXNoKHtcbiAgICAgICAgICAgIGR0czogc2lsZW50U2FtcGxlLmR0cyxcbiAgICAgICAgICAgIHNpemU6IHNpbGVudFNhbXBsZS5kYXRhLmJ5dGVMZW5ndGhcbiAgICAgICAgICB9KVxuXG4gICAgICAgICAgZnJhbWVJZHgrK1xuICAgICAgICAgIGkrKyAvLyDkuI3lr7npnZnpn7PluKflgZrmr5TovoNcbiAgICAgICAgfVxuICAgICAgfSAqL1xuICAgIH1cblxuICAgIHRoaXMuYXVkaW9UcmFjay5zYW1wbGVzID0gQ29tcGF0aWJpbGl0eS5zb3J0QXVkaW9TYW1wbGVzKGF1ZGlvU2FtcGxlcylcbiAgfVxuXG4gIGZpeENoYW5nZVN0cmVhbVZpZGVvIChjaGFuZ2VJZHgpIHtcbiAgICBjb25zdCB7IHNhbXBsZXMsIG1ldGEgfSA9IHRoaXMudmlkZW9UcmFjaztcbiAgICBjb25zdCBwcmV2RHRzID0gY2hhbmdlSWR4ID09PSAwID8gdGhpcy5nZXRTdHJlYW1DaGFuZ2VTdGFydChzYW1wbGVzWzBdKSA6IHNhbXBsZXNbY2hhbmdlSWR4IC0gMV0uZHRzO1xuICAgIGNvbnN0IGN1ckR0cyA9IHNhbXBsZXNbY2hhbmdlSWR4XS5kdHM7XG4gICAgY29uc3QgaXNDb250aW51ZSA9IE1hdGguYWJzKHByZXZEdHMgLSBjdXJEdHMpIDw9IDIgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uO1xuXG4gICAgaWYgKGlzQ29udGludWUpIHtcbiAgICAgIGlmICghc2FtcGxlc1tjaGFuZ2VJZHhdLm9wdGlvbnMpIHtcbiAgICAgICAgc2FtcGxlc1tjaGFuZ2VJZHhdLm9wdGlvbnMgPSB7XG4gICAgICAgICAgaXNDb250aW51ZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzYW1wbGVzW2NoYW5nZUlkeF0ub3B0aW9ucy5pc0NvbnRpbnVlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmRvRml4VmlkZW8oZmFsc2UpXG4gICAgfVxuXG4gICAgY29uc3QgZmlyc3RQYXJ0U2FtcGxlcyA9IHNhbXBsZXMuc2xpY2UoMCwgY2hhbmdlSWR4KTtcbiAgICBjb25zdCBzZWNvbmRQYXJ0U2FtcGxlcyA9IHNhbXBsZXMuc2xpY2UoY2hhbmdlSWR4KTtcbiAgICBjb25zdCBmaXJzdFNhbXBsZSA9IHNhbXBsZXNbMF1cblxuICAgIGNvbnN0IGNoYW5nZVNhbXBsZSA9IHNlY29uZFBhcnRTYW1wbGVzWzBdXG4gICAgY29uc3QgZmlyc3RQYXJ0RHVyYXRpb24gPSBjaGFuZ2VTYW1wbGUuZHRzIC0gZmlyc3RTYW1wbGUuZHRzXG4gICAgY29uc3Qgc3RyZWFtQ2hhbmdlU3RhcnQgPSBmaXJzdFNhbXBsZS5vcHRpb25zICYmIGZpcnN0U2FtcGxlLm9wdGlvbnMuc3RhcnQgKyBmaXJzdFBhcnREdXJhdGlvbiA/IGZpcnN0U2FtcGxlLm9wdGlvbnMuc3RhcnQgOiBudWxsXG5cbiAgICB0aGlzLnZpZGVvVHJhY2suc2FtcGxlcyA9IHNhbXBsZXMuc2xpY2UoMCwgY2hhbmdlSWR4KTtcblxuICAgIHRoaXMuZG9GaXhWaWRlbyhmYWxzZSk7XG5cbiAgICB0aGlzLnZpZGVvVHJhY2suc2FtcGxlcyA9IHNhbXBsZXMuc2xpY2UoY2hhbmdlSWR4KTtcblxuICAgIHRoaXMuZG9GaXhWaWRlbyhmYWxzZSwgc3RyZWFtQ2hhbmdlU3RhcnQpO1xuXG4gICAgdGhpcy52aWRlb1RyYWNrLnNhbXBsZXMgPSBmaXJzdFBhcnRTYW1wbGVzLmNvbmNhdChzZWNvbmRQYXJ0U2FtcGxlcylcbiAgfVxuXG4gIGZpeENoYW5nZVN0cmVhbUF1ZGlvIChjaGFuZ2VJZHgpIHtcbiAgICBjb25zdCB7IHNhbXBsZXMsIG1ldGEgfSA9IHRoaXMuYXVkaW9UcmFjaztcblxuICAgIGNvbnN0IHByZXZEdHMgPSBjaGFuZ2VJZHggPT09IDAgPyB0aGlzLmdldFN0cmVhbUNoYW5nZVN0YXJ0KHNhbXBsZXNbMF0pIDogc2FtcGxlc1tjaGFuZ2VJZHggLSAxXS5kdHM7XG4gICAgY29uc3QgY3VyRHRzID0gc2FtcGxlc1tjaGFuZ2VJZHhdLmR0cztcbiAgICBjb25zdCBpc0NvbnRpbnVlID0gTWF0aC5hYnMocHJldkR0cyAtIGN1ckR0cykgPD0gMiAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb247XG5cbiAgICBpZiAoaXNDb250aW51ZSkge1xuICAgICAgaWYgKCFzYW1wbGVzW2NoYW5nZUlkeF0ub3B0aW9ucykge1xuICAgICAgICBzYW1wbGVzW2NoYW5nZUlkeF0ub3B0aW9ucyA9IHtcbiAgICAgICAgICBpc0NvbnRpbnVlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNhbXBsZXNbY2hhbmdlSWR4XS5vcHRpb25zLmlzQ29udGludWUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuZG9GaXhBdWRpbyhmYWxzZSlcbiAgICB9XG5cbiAgICBjb25zdCBmaXJzdFBhcnRTYW1wbGVzID0gc2FtcGxlcy5zbGljZSgwLCBjaGFuZ2VJZHgpO1xuICAgIGNvbnN0IHNlY29uZFBhcnRTYW1wbGVzID0gc2FtcGxlcy5zbGljZShjaGFuZ2VJZHgpO1xuICAgIGNvbnN0IGZpcnN0U2FtcGxlID0gc2FtcGxlc1swXVxuXG4gICAgY29uc3QgY2hhbmdlU2FtcGxlID0gc2Vjb25kUGFydFNhbXBsZXNbMF1cbiAgICBjb25zdCBmaXJzdFBhcnREdXJhdGlvbiA9IGNoYW5nZVNhbXBsZS5kdHMgLSBmaXJzdFNhbXBsZS5kdHNcbiAgICBjb25zdCBzdHJlYW1DaGFuZ2VTdGFydCA9IGZpcnN0U2FtcGxlLm9wdGlvbnMgJiYgZmlyc3RTYW1wbGUub3B0aW9ucy5zdGFydCArIGZpcnN0UGFydER1cmF0aW9uID8gZmlyc3RTYW1wbGUub3B0aW9ucy5zdGFydCA6IG51bGxcblxuICAgIHRoaXMuYXVkaW9UcmFjay5zYW1wbGVzID0gZmlyc3RQYXJ0U2FtcGxlcztcblxuICAgIHRoaXMuZG9GaXhBdWRpbyhmYWxzZSk7XG5cbiAgICB0aGlzLmF1ZGlvVHJhY2suc2FtcGxlcyA9IHNlY29uZFBhcnRTYW1wbGVzO1xuXG4gICAgdGhpcy5kb0ZpeEF1ZGlvKGZhbHNlLCBzdHJlYW1DaGFuZ2VTdGFydCk7XG5cbiAgICB0aGlzLmF1ZGlvVHJhY2suc2FtcGxlcyA9IGZpcnN0UGFydFNhbXBsZXMuY29uY2F0KHNlY29uZFBhcnRTYW1wbGVzKVxuICB9XG5cbiAgZ2V0Rmlyc3RTYW1wbGUgKCkge1xuICAgIC8vIOiOt+WPlnZpZGVv5ZKMYXVkaW/nmoTpppbluKfmlbDmja5cbiAgICBsZXQge3NhbXBsZXM6IHZpZGVvU2FtcGxlc30gPSB0aGlzLnZpZGVvVHJhY2tcbiAgICBsZXQge3NhbXBsZXM6IGF1ZGlvU2FtcGxlc30gPSB0aGlzLmF1ZGlvVHJhY2tcblxuICAgIGxldCBpc0ZpcnN0VmlkZW9TYW1wbGVzID0gZmFsc2U7XG4gICAgbGV0IGlzRmlyc3RBdWRpb1NhbXBsZXMgPSBmYWxzZTtcblxuICAgIGlmICghdGhpcy5fZmlyc3RWaWRlb1NhbXBsZSAmJiB2aWRlb1NhbXBsZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9maXJzdFZpZGVvU2FtcGxlID0gQ29tcGF0aWJpbGl0eS5maW5kRmlyc3RWaWRlb1NhbXBsZSh2aWRlb1NhbXBsZXMpXG4gICAgICBpc0ZpcnN0VmlkZW9TYW1wbGVzID0gdHJ1ZVxuICAgIH1cblxuICAgIGlmICghdGhpcy5fZmlyc3RBdWRpb1NhbXBsZSAmJiBhdWRpb1NhbXBsZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9maXJzdEF1ZGlvU2FtcGxlID0gQ29tcGF0aWJpbGl0eS5maW5kRmlyc3RBdWRpb1NhbXBsZShhdWRpb1NhbXBsZXMpIC8vIOWvu+aJvmR0c+acgOWwj+eahOW4p+S9nOS4uummluS4qumfs+mikeW4p1xuICAgICAgaXNGaXJzdEF1ZGlvU2FtcGxlcyA9IHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgaXNGaXJzdFZpZGVvU2FtcGxlcyxcbiAgICAgIGlzRmlyc3RBdWRpb1NhbXBsZXNcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog5Zyo5rKh5pyJcmVmU2FtcGxlRHVyYXRpb27nmoTpl67popjmtYHkuK3vvIxcbiAgICovXG4gIGZpeFJlZlNhbXBsZUR1cmF0aW9uIChtZXRhLCBzYW1wbGVzKSB7XG4gICAgY29uc3QgaXNWaWRlbyA9IG1ldGEudHlwZSA9PT0gJ3ZpZGVvJ1xuICAgIGNvbnN0IGFsbFNhbXBsZXNDb3VudCA9IGlzVmlkZW8gPyB0aGlzLmFsbFZpZGVvU2FtcGxlc0NvdW50IDogdGhpcy5hbGxBdWRpb1NhbXBsZXNDb3VudFxuICAgIGNvbnN0IGZpcnN0RHRzID0gaXNWaWRlbyA/IHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUuZHRzIDogdGhpcy5fZmlyc3RBdWRpb1NhbXBsZS5kdHNcbiAgICBjb25zdCBmaWxsZWRTYW1wbGVzQ291bnQgPSBpc1ZpZGVvID8gdGhpcy5maWxsZWRWaWRlb1NhbXBsZXMubGVuZ3RoIDogdGhpcy5maWxsZWRBdWRpb1NhbXBsZXMubGVuZ3RoXG5cbiAgICBpZiAoIW1ldGEucmVmU2FtcGxlRHVyYXRpb24gfHwgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA8PSAwIHx8IE51bWJlci5pc05hTihtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSkge1xuICAgICAgaWYgKHNhbXBsZXMubGVuZ3RoID49IDEpIHtcbiAgICAgICAgY29uc3QgbGFzdER0cyA9IHNhbXBsZXNbc2FtcGxlcy5sZW5ndGggLSAxXS5kdHNcblxuICAgICAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uID0gTWF0aC5mbG9vcigobGFzdER0cyAtIGZpcnN0RHRzKSAvICgoYWxsU2FtcGxlc0NvdW50ICsgZmlsbGVkU2FtcGxlc0NvdW50KSAtIDEpKTsgLy8g5bCGcmVmU2FtcGxlRHVyYXRpb27ph43nva7kuLrorqHnrpflkI7nmoTlubPlnYflgLxcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1ldGEucmVmU2FtcGxlRHVyYXRpb24pIHtcbiAgICAgIGlmIChzYW1wbGVzLmxlbmd0aCA+PSA1KSB7XG4gICAgICAgIGNvbnN0IGxhc3REdHMgPSBzYW1wbGVzW3NhbXBsZXMubGVuZ3RoIC0gMV0uZHRzXG4gICAgICAgIGNvbnN0IGZpcnN0RHRzID0gc2FtcGxlc1swXS5kdHNcbiAgICAgICAgY29uc3QgZHVyYXRpb25BdmcgPSAobGFzdER0cyAtIGZpcnN0RHRzKSAvIChzYW1wbGVzLmxlbmd0aCAtIDEpXG5cbiAgICAgICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5hYnMobWV0YS5yZWZTYW1wbGVEdXJhdGlvbiAtIGR1cmF0aW9uQXZnKSA8PSA1ID8gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA6IGR1cmF0aW9uQXZnKTsgLy8g5bCGcmVmU2FtcGxlRHVyYXRpb27ph43nva7kuLrorqHnrpflkI7nmoTlubPlnYflgLxcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog6K6w5b2V5oiq5q2i55uu5YmN5LiA5YWx5pKt5pS+5LqG5aSa5bCR5binXG4gICAqL1xuICByZWNvcmRTYW1wbGVzQ291bnQgKCkge1xuICAgIGNvbnN0IHsgYXVkaW9UcmFjaywgdmlkZW9UcmFjayB9ID0gdGhpc1xuXG4gICAgdGhpcy5hbGxBdWRpb1NhbXBsZXNDb3VudCArPSBhdWRpb1RyYWNrLnNhbXBsZXMubGVuZ3RoXG4gICAgdGhpcy5hbGxWaWRlb1NhbXBsZXNDb3VudCArPSB2aWRlb1RyYWNrLnNhbXBsZXMubGVuZ3RoXG4gIH1cblxuICAvKipcbiAgICog5Y676Zmk5LiN5ZCI5rOV55qE5bin77yI5YCS6YCA44CB6YeN5aSN5bin77yJXG4gICAqL1xuICByZW1vdmVJbnZhbGlkU2FtcGxlcyAoKSB7XG4gICAgY29uc3QgeyBfZmlyc3RWaWRlb1NhbXBsZSwgX2ZpcnN0QXVkaW9TYW1wbGUgfSA9IHRoaXNcblxuICAgIHRoaXMuYXVkaW9UcmFjay5zYW1wbGVzID0gdGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMuZmlsdGVyKChzYW1wbGUpID0+IHtcbiAgICAgIHJldHVybiBzYW1wbGUuZHRzID49IF9maXJzdEF1ZGlvU2FtcGxlLmR0cyAmJiAodGhpcy5sYXN0QXVkaW9EdHMgPT09IHVuZGVmaW5lZCB8fCBzYW1wbGUuZHRzID4gdGhpcy5sYXN0QXVkaW9EdHMpXG4gICAgfSlcblxuICAgIHRoaXMudmlkZW9UcmFjay5zYW1wbGVzID0gdGhpcy52aWRlb1RyYWNrLnNhbXBsZXMuZmlsdGVyKChzYW1wbGUpID0+IHtcbiAgICAgIHJldHVybiBzYW1wbGUuZHRzID49IF9maXJzdFZpZGVvU2FtcGxlLmR0cyAmJiAodGhpcy5sYXN0VmlkZW9EdHMgPT09IHVuZGVmaW5lZCB8fCBzYW1wbGUuZHRzID4gdGhpcy5sYXN0VmlkZW9EdHMpXG4gICAgfSlcbiAgfVxuXG4gIGdldFN0cmVhbUNoYW5nZVN0YXJ0IChzYW1wbGUpIHtcbiAgICBpZiAoc2FtcGxlLm9wdGlvbnMgJiYgc2FtcGxlLm9wdGlvbnMuc3RhcnQpIHtcbiAgICAgIHJldHVybiBzYW1wbGUub3B0aW9ucy5zdGFydCAtIHRoaXMuZHRzQmFzZTtcbiAgICB9XG4gICAgcmV0dXJuIEluZmluaXR5XG4gIH1cblxuICBzdGF0aWMgc29ydEF1ZGlvU2FtcGxlcyAoc2FtcGxlcykge1xuICAgIGlmIChzYW1wbGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIHNhbXBsZXNcbiAgICB9XG5cbiAgICByZXR1cm4gc2FtcGxlcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICByZXR1cm4gYS5kdHMgLSBiLmR0c1xuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICog5a+75om+ZHRz5pyA5bCP55qEc2FtcGxlXG4gICAqIEBwYXJhbSBzYW1wbGVzXG4gICAqL1xuICBzdGF0aWMgZmluZEZpcnN0QXVkaW9TYW1wbGUgKHNhbXBsZXMpIHtcbiAgICBpZiAoIXNhbXBsZXMgfHwgc2FtcGxlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgcmV0dXJuIENvbXBhdGliaWxpdHkuc29ydEF1ZGlvU2FtcGxlcyhzYW1wbGVzKVswXVxuICB9XG5cbiAgc3RhdGljIGZpbmRGaXJzdFZpZGVvU2FtcGxlIChzYW1wbGVzKSB7XG4gICAgaWYgKCFzYW1wbGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICBjb25zdCBzb3J0ZWQgPSBzYW1wbGVzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIHJldHVybiBhLmR0cyAtIGIuZHRzO1xuICAgIH0pXG5cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc29ydGVkLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAoc29ydGVkW2ldLmlzS2V5ZnJhbWUpIHtcbiAgICAgICAgcmV0dXJuIHNvcnRlZFtpXVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBkZXRlY3RMYXJnZUdhcCAobmV4dER0cywgZmlyc3RTYW1wbGUpIHtcbiAgICBpZiAobmV4dER0cyA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBjdXJEdHMgPSBmaXJzdFNhbXBsZS5kdHMgfHwgMFxuICAgIGNvbnN0IGNvbmQxID0gbmV4dER0cyAtIGN1ckR0cyA+PSAxMDAwIHx8IGN1ckR0cyAtIG5leHREdHMgPj0gMTAwMCAvLyBmaXggaGxz5rWB5Ye6546w5aSn6YeP5rWBZHRz6Ze06Led6Zeu6aKYXG4gICAgY29uc3QgY29uZDIgPSBmaXJzdFNhbXBsZS5vcHRpb25zICYmIGZpcnN0U2FtcGxlLm9wdGlvbnMuZGlzY29udGludWVcblxuICAgIHJldHVybiBjb25kMSB8fCBjb25kMlxuICB9XG5cbiAgc3RhdGljIGRvRml4TGFyZ2VHYXAgKHNhbXBsZXMsIGdhcCkge1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzYW1wbGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb25zdCBzYW1wbGUgPSBzYW1wbGVzW2ldO1xuICAgICAgc2FtcGxlLmR0cyArPSBnYXBcbiAgICAgIGlmIChzYW1wbGUucHRzKSB7XG4gICAgICAgIHNhbXBsZS5wdHMgKz0gZ2FwXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOS4remAlOaNoua1gVxuICAgKi9cbiAgc3RhdGljIGRldGFjdENoYW5nZVN0cmVhbSAoc2FtcGxlcykge1xuICAgIGxldCBjaGFuZ2VkID0gZmFsc2U7XG4gICAgbGV0IGNoYW5nZWRJZHggPSAtMTtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc2FtcGxlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKHNhbXBsZXNbaV0ub3B0aW9ucyAmJiBzYW1wbGVzW2ldLm9wdGlvbnMubWV0YSkge1xuICAgICAgICBjaGFuZ2VkID0gdHJ1ZVxuICAgICAgICBjaGFuZ2VkSWR4ID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNoYW5nZWQsXG4gICAgICBjaGFuZ2VkSWR4XG4gICAgfVxuICB9XG5cbiAgZ2V0IHRyYWNrcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpXG4gIH1cblxuICBnZXQgYXVkaW9UcmFjayAoKSB7XG4gICAgaWYgKHRoaXMudHJhY2tzKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmFja3MuYXVkaW9UcmFja1xuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgZ2V0IHZpZGVvVHJhY2sgKCkge1xuICAgIGlmICh0aGlzLnRyYWNrcykge1xuICAgICAgcmV0dXJuIHRoaXMudHJhY2tzLnZpZGVvVHJhY2tcbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIGdldCBkdHNCYXNlICgpIHtcbiAgICBjb25zdCByZW11eGVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnTVA0X1JFTVVYRVInKTtcbiAgICBpZiAocmVtdXhlcikge1xuICAgICAgcmV0dXJuIHJlbXV4ZXIuX2R0c0Jhc2VcbiAgICB9XG4gICAgcmV0dXJuIDBcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQ29tcGF0aWJpbGl0eTtcbiIsImNsYXNzIEdvbG9tYiB7XG4gIGNvbnN0cnVjdG9yICh1aW50OGFycmF5KSB7XG4gICAgdGhpcy5UQUcgPSAnR29sb21iJ1xuICAgIHRoaXMuX2J1ZmZlciA9IHVpbnQ4YXJyYXlcbiAgICB0aGlzLl9idWZmZXJJbmRleCA9IDBcbiAgICB0aGlzLl90b3RhbEJ5dGVzID0gdWludDhhcnJheS5ieXRlTGVuZ3RoXG4gICAgdGhpcy5fdG90YWxCaXRzID0gdWludDhhcnJheS5ieXRlTGVuZ3RoICogOFxuICAgIHRoaXMuX2N1cnJlbnRXb3JkID0gMFxuICAgIHRoaXMuX2N1cnJlbnRXb3JkQml0c0xlZnQgPSAwXG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLl9idWZmZXIgPSBudWxsXG4gIH1cblxuICBfZmlsbEN1cnJlbnRXb3JkICgpIHtcbiAgICBsZXQgYnVmZmVyQnl0ZXNMZWZ0ID0gdGhpcy5fdG90YWxCeXRlcyAtIHRoaXMuX2J1ZmZlckluZGV4XG4gICAgaWYgKGJ1ZmZlckJ5dGVzTGVmdCA8PSAwKSB7XG4gICAgICAvLyBUT0RPIOW8guW4uOWkhOeQhlxuICAgIH1cblxuICAgIGxldCBieXRlc1JlYWQgPSBNYXRoLm1pbig0LCBidWZmZXJCeXRlc0xlZnQpXG4gICAgbGV0IHdvcmQgPSBuZXcgVWludDhBcnJheSg0KVxuICAgIHdvcmQuc2V0KHRoaXMuX2J1ZmZlci5zdWJhcnJheSh0aGlzLl9idWZmZXJJbmRleCwgdGhpcy5fYnVmZmVySW5kZXggKyBieXRlc1JlYWQpKVxuICAgIHRoaXMuX2N1cnJlbnRXb3JkID0gbmV3IERhdGFWaWV3KHdvcmQuYnVmZmVyKS5nZXRVaW50MzIoMClcblxuICAgIHRoaXMuX2J1ZmZlckluZGV4ICs9IGJ5dGVzUmVhZFxuICAgIHRoaXMuX2N1cnJlbnRXb3JkQml0c0xlZnQgPSBieXRlc1JlYWQgKiA4XG4gIH1cblxuICByZWFkQml0cyAoc2l6ZSkge1xuICAgIGxldCBiaXRzID0gTWF0aC5taW4odGhpcy5fY3VycmVudFdvcmRCaXRzTGVmdCwgc2l6ZSk7Ly8gOnVpbnRcbiAgICBsZXQgdmFsdSA9IHRoaXMuX2N1cnJlbnRXb3JkID4+PiAoMzIgLSBiaXRzKTtcbiAgICBpZiAoc2l6ZSA+IDMyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCByZWFkIG1vcmUgdGhhbiAzMiBiaXRzIGF0IGEgdGltZScpO1xuICAgIH1cbiAgICB0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0IC09IGJpdHM7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRXb3JkQml0c0xlZnQgPiAwKSB7XG4gICAgICB0aGlzLl9jdXJyZW50V29yZCA8PD0gYml0cztcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3RvdGFsQnl0ZXMgLSB0aGlzLl9idWZmZXJJbmRleCA+IDApIHtcbiAgICAgIHRoaXMuX2ZpbGxDdXJyZW50V29yZCgpO1xuICAgIH1cblxuICAgIGJpdHMgPSBzaXplIC0gYml0cztcbiAgICBpZiAoYml0cyA+IDAgJiYgdGhpcy5fY3VycmVudFdvcmRCaXRzTGVmdCkge1xuICAgICAgcmV0dXJuIHZhbHUgPDwgYml0cyB8IHRoaXMucmVhZEJpdHMoYml0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWx1O1xuICAgIH1cbiAgfVxuXG4gIHJlYWRCb29sICgpIHtcbiAgICByZXR1cm4gdGhpcy5yZWFkQml0cygxKSA9PT0gMVxuICB9XG5cbiAgcmVhZEJ5dGUgKCkge1xuICAgIHJldHVybiB0aGlzLnJlYWRCaXRzKDgpXG4gIH1cblxuICBfc2tpcExlYWRpbmdaZXJvICgpIHtcbiAgICBsZXQgemVyb0NvdW50XG4gICAgZm9yICh6ZXJvQ291bnQgPSAwOyB6ZXJvQ291bnQgPCB0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0OyB6ZXJvQ291bnQrKykge1xuICAgICAgaWYgKCh0aGlzLl9jdXJyZW50V29yZCAmICgweDgwMDAwMDAwID4+PiB6ZXJvQ291bnQpKSAhPT0gMCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50V29yZCA8PD0gemVyb0NvdW50XG4gICAgICAgIHRoaXMuX2N1cnJlbnRXb3JkQml0c0xlZnQgLT0gemVyb0NvdW50XG4gICAgICAgIHJldHVybiB6ZXJvQ291bnRcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fZmlsbEN1cnJlbnRXb3JkKClcbiAgICByZXR1cm4gemVyb0NvdW50ICsgdGhpcy5fc2tpcExlYWRpbmdaZXJvKClcbiAgfVxuXG4gIHJlYWRVRUcgKCkgeyAvLyB1bnNpZ25lZCBleHBvbmVudGlhbCBnb2xvbWJcbiAgICBsZXQgbGVhZGluZ1plcm9zID0gdGhpcy5fc2tpcExlYWRpbmdaZXJvKClcbiAgICByZXR1cm4gdGhpcy5yZWFkQml0cyhsZWFkaW5nWmVyb3MgKyAxKSAtIDFcbiAgfVxuXG4gIHJlYWRTRUcgKCkgeyAvLyBzaWduZWQgZXhwb25lbnRpYWwgZ29sb21iXG4gICAgbGV0IHZhbHVlID0gdGhpcy5yZWFkVUVHKClcbiAgICBpZiAodmFsdWUgJiAweDAxKSB7XG4gICAgICByZXR1cm4gKHZhbHVlICsgMSkgPj4+IDFcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIC0xICogKHZhbHVlID4+PiAxKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHb2xvbWJcbiIsImltcG9ydCBTcHNQYXJzZXIgZnJvbSAnLi9zcHMnO1xuY2xhc3MgTmFsdW5pdCB7XG4gIHN0YXRpYyBnZXROYWx1bml0cyAoYnVmZmVyKSB7XG4gICAgaWYgKGJ1ZmZlci5sZW5ndGggLSBidWZmZXIucG9zaXRpb24gPCA0KSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgbGV0IGJ1ZiA9IGJ1ZmZlci5kYXRhdmlldztcbiAgICBsZXQgcG9zaXRpb24gPSBidWZmZXIucG9zaXRpb247XG4gICAgaWYgKGJ1Zi5nZXRJbnQzMihwb3NpdGlvbikgPT09IDEgfHxcbiAgICAoYnVmLmdldEludDE2KHBvc2l0aW9uKSA9PT0gMCAmJiBidWYuZ2V0SW50OChwb3NpdGlvbiArIDIpID09PSAxKSkge1xuICAgICAgcmV0dXJuIE5hbHVuaXQuZ2V0QW5uZXhiTmFscyhidWZmZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTmFsdW5pdC5nZXRBdmNjTmFscyhidWZmZXIpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRBbm5leGJOYWxzIChidWZmZXIpIHtcbiAgICBsZXQgbmFscyA9IFtdO1xuICAgIGxldCBwb3NpdGlvbiA9IE5hbHVuaXQuZ2V0SGVhZGVyUG9zaXRpb25Bbm5leEIoYnVmZmVyKTtcbiAgICBsZXQgc3RhcnQgPSBwb3NpdGlvbi5wb3M7XG4gICAgbGV0IGVuZCA9IHN0YXJ0O1xuICAgIHdoaWxlIChzdGFydCA8IGJ1ZmZlci5sZW5ndGggLSA0KSB7XG4gICAgICBsZXQgaGVhZGVyID0gYnVmZmVyLmJ1ZmZlci5zbGljZShzdGFydCwgc3RhcnQgKyBwb3NpdGlvbi5oZWFkZXJMZW5ndGgpO1xuICAgICAgaWYgKHBvc2l0aW9uLnBvcyA9PT0gYnVmZmVyLnBvc2l0aW9uKSB7XG4gICAgICAgIGJ1ZmZlci5za2lwKHBvc2l0aW9uLmhlYWRlckxlbmd0aCk7XG4gICAgICB9XG4gICAgICBwb3NpdGlvbiA9IE5hbHVuaXQuZ2V0SGVhZGVyUG9zaXRpb25Bbm5leEIoYnVmZmVyKTtcbiAgICAgIGVuZCA9IHBvc2l0aW9uLnBvcztcbiAgICAgIGxldCBib2R5ID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyLmJ1ZmZlci5zbGljZShzdGFydCArIGhlYWRlci5ieXRlTGVuZ3RoLCBlbmQpKTtcbiAgICAgIGxldCB1bml0ID0ge2hlYWRlciwgYm9keX07XG4gICAgICBOYWx1bml0LmFuYWx5c2VOYWwodW5pdCk7XG4gICAgICBuYWxzLnB1c2godW5pdCk7XG4gICAgICBidWZmZXIuc2tpcChlbmQgLSBidWZmZXIucG9zaXRpb24pO1xuICAgICAgc3RhcnQgPSBlbmQ7XG4gICAgfVxuICAgIHJldHVybiBuYWxzO1xuICB9XG5cbiAgc3RhdGljIGdldEF2Y2NOYWxzIChidWZmZXIpIHtcbiAgICBsZXQgbmFscyA9IFtdO1xuICAgIHdoaWxlIChidWZmZXIucG9zaXRpb24gPCBidWZmZXIubGVuZ3RoIC0gNCkge1xuICAgICAgbGV0IGxlbmd0aCA9IGJ1ZmZlci5kYXRhdmlldy5nZXRJbnQzMihidWZmZXIucG9zaXRpb24pO1xuICAgICAgaWYgKGJ1ZmZlci5sZW5ndGggLSBidWZmZXIucG9zaXRpb24gPj0gbGVuZ3RoKSB7XG4gICAgICAgIGxldCBoZWFkZXIgPSBidWZmZXIuYnVmZmVyLnNsaWNlKGJ1ZmZlci5wb3NpdGlvbiwgYnVmZmVyLnBvc2l0aW9uICsgNCk7XG4gICAgICAgIGJ1ZmZlci5za2lwKDQpXG4gICAgICAgIGxldCBib2R5ID0gYnVmZmVyLmJ1ZmZlci5zbGljZShidWZmZXIucG9zaXRpb24sIGJ1ZmZlci5wb3NpdGlvbiArIGxlbmd0aCk7XG4gICAgICAgIGJ1ZmZlci5za2lwKGxlbmd0aCk7XG4gICAgICAgIGxldCB1bml0ID0ge2hlYWRlciwgYm9keX07XG4gICAgICAgIE5hbHVuaXQuYW5hbHlzZU5hbCh1bml0KTtcbiAgICAgICAgbmFscy5wdXNoKHVuaXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuYWxzO1xuICB9XG5cbiAgc3RhdGljIGFuYWx5c2VOYWwgKHVuaXQpIHtcbiAgICBsZXQgdHlwZSA9IHVuaXQuYm9keVswXSAmIDB4MWY7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIC8vIE5EUlxuICAgICAgICB1bml0Lm5kciA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA1OlxuICAgICAgICAvLyBJRFJcbiAgICAgICAgdW5pdC5pZHIgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNjpcbiAgICAgICAgLy8gU0VJXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA3OlxuICAgICAgICAvLyBTUFNcbiAgICAgICAgdW5pdC5zcHMgPSBTcHNQYXJzZXIucGFyc2VTUFModW5pdC5ib2R5KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDg6XG4gICAgICAgIC8vIFBQU1xuICAgICAgICB1bml0LnBwcyA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA5OlxuICAgICAgICAvLyBBVURcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0SGVhZGVyUG9zaXRpb25Bbm5leEIgKGJ1ZmZlcikge1xuICAgIC8vIHNlcGVyYXRlXG4gICAgbGV0IHBvcyA9IGJ1ZmZlci5wb3NpdGlvbjtcbiAgICBsZXQgaGVhZGVyTGVuZ3RoID0gMDtcbiAgICB3aGlsZSAoaGVhZGVyTGVuZ3RoICE9PSAzICYmIGhlYWRlckxlbmd0aCAhPT0gNCAmJiBwb3MgPCBidWZmZXIubGVuZ3RoIC0gNCkge1xuICAgICAgaWYgKGJ1ZmZlci5kYXRhdmlldy5nZXRJbnQxNihwb3MpID09PSAwKSB7XG4gICAgICAgIGlmIChidWZmZXIuZGF0YXZpZXcuZ2V0SW50MTYocG9zICsgMikgPT09IDEpIHtcbiAgICAgICAgICAvLyAweDAwMDAwMVxuICAgICAgICAgIGhlYWRlckxlbmd0aCA9IDQ7XG4gICAgICAgIH0gZWxzZSBpZiAoYnVmZmVyLmRhdGF2aWV3LmdldEludDgocG9zICsgMikgPT09IDEpIHtcbiAgICAgICAgICBoZWFkZXJMZW5ndGggPSAzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBvcysrO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwb3MrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zID09PSBidWZmZXIubGVuZ3RoIC0gNCkge1xuICAgICAgaWYgKGJ1ZmZlci5kYXRhdmlldy5nZXRJbnQxNihwb3MpID09PSAwKSB7XG4gICAgICAgIGlmIChidWZmZXIuZGF0YXZpZXcuZ2V0SW50MTYocG9zICsgMikgPT09IDEpIHtcbiAgICAgICAgICAvLyAweDAwMDAwMVxuICAgICAgICAgIGhlYWRlckxlbmd0aCA9IDQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBvcysrO1xuICAgICAgICBpZiAoYnVmZmVyLmRhdGF2aWV3LmdldEludDE2KHBvcykgPT09IDAgJiYgYnVmZmVyLmRhdGF2aWV3LmdldEludDgocG9zKSA9PT0gMSkge1xuICAgICAgICAgIC8vIDB4MDAwMDAwMVxuICAgICAgICAgIGhlYWRlckxlbmd0aCA9IDM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcG9zID0gYnVmZmVyLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge3BvcywgaGVhZGVyTGVuZ3RofTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRBdmNjIChzcHMsIHBwcykge1xuICAgIGxldCByZXQgPSBuZXcgVWludDhBcnJheShzcHMuYnl0ZUxlbmd0aCArIHBwcy5ieXRlTGVuZ3RoICsgMTEpO1xuICAgIHJldFswXSA9IDB4MDE7XG4gICAgcmV0WzFdID0gc3BzWzFdO1xuICAgIHJldFsyXSA9IHNwc1syXTtcbiAgICByZXRbM10gPSBzcHNbM107XG4gICAgcmV0WzRdID0gMjU1O1xuICAgIHJldFs1XSA9IDIyNTtcblxuICAgIGxldCBvZmZzZXQgPSA2O1xuXG4gICAgcmV0LnNldChuZXcgVWludDhBcnJheShbKHNwcy5ieXRlTGVuZ3RoID4+PiA4KSAmIDB4ZmYsIHNwcy5ieXRlTGVuZ3RoICYgMHhmZl0pLCBvZmZzZXQpO1xuICAgIG9mZnNldCArPSAyO1xuICAgIHJldC5zZXQoc3BzLCBvZmZzZXQpO1xuICAgIG9mZnNldCArPSBzcHMuYnl0ZUxlbmd0aDtcblxuICAgIHJldFtvZmZzZXRdID0gMTtcbiAgICBvZmZzZXQrKztcblxuICAgIHJldC5zZXQobmV3IFVpbnQ4QXJyYXkoWyhwcHMuYnl0ZUxlbmd0aCA+Pj4gOCkgJiAweGZmLCBwcHMuYnl0ZUxlbmd0aCAmIDB4ZmZdKSwgb2Zmc2V0KTtcbiAgICBvZmZzZXQgKz0gMjtcbiAgICByZXQuc2V0KHBwcywgb2Zmc2V0KTtcbiAgICByZXR1cm4gcmV0O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5hbHVuaXQ7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgICovXG4vKiBlc2xpbnQtZGlzYWJsZSBvbmUtdmFyICAqL1xuaW1wb3J0IEdvbG9tYiBmcm9tICcuL2dvbG9tYidcblxuY2xhc3MgU1BTUGFyc2VyIHtcbiAgc3RhdGljIF9lYnNwMnJic3AgKHVpbnQ4YXJyYXkpIHtcbiAgICBsZXQgc3JjID0gdWludDhhcnJheVxuICAgIGxldCBzcmNMZW5ndGggPSBzcmMuYnl0ZUxlbmd0aFxuICAgIGxldCBkc3QgPSBuZXcgVWludDhBcnJheShzcmNMZW5ndGgpXG4gICAgbGV0IGRzdElkeCA9IDBcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3JjTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpID49IDIpIHtcbiAgICAgICAgaWYgKHNyY1tpXSA9PT0gMHgwMyAmJiBzcmNbaSAtIDFdID09PSAweDAwICYmIHNyY1tpIC0gMl0gPT09IDB4MDApIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBkc3RbZHN0SWR4XSA9IHNyY1tpXVxuICAgICAgZHN0SWR4KytcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZHN0LmJ1ZmZlciwgMCwgZHN0SWR4KVxuICB9XG5cbiAgc3RhdGljIHBhcnNlU1BTICh1aW50OGFycmF5KSB7XG4gICAgbGV0IHJic3AgPSBTUFNQYXJzZXIuX2Vic3AycmJzcCh1aW50OGFycmF5KVxuICAgIGxldCBnYiA9IG5ldyBHb2xvbWIocmJzcClcblxuICAgIGdiLnJlYWRCeXRlKClcbiAgICBsZXQgcHJvZmlsZUlkYyA9IGdiLnJlYWRCeXRlKClcbiAgICBnYi5yZWFkQnl0ZSgpXG4gICAgbGV0IGxldmVsSWRjID0gZ2IucmVhZEJ5dGUoKVxuICAgIGdiLnJlYWRVRUcoKVxuXG4gICAgbGV0IHByb2ZpbGVfc3RyaW5nID0gU1BTUGFyc2VyLmdldFByb2ZpbGVTdHJpbmcocHJvZmlsZUlkYylcbiAgICBsZXQgbGV2ZWxfc3RyaW5nID0gU1BTUGFyc2VyLmdldExldmVsU3RyaW5nKGxldmVsSWRjKVxuICAgIGxldCBjaHJvbWFfZm9ybWF0X2lkYyA9IDFcbiAgICBsZXQgY2hyb21hX2Zvcm1hdCA9IDQyMFxuICAgIGxldCBjaHJvbWFfZm9ybWF0X3RhYmxlID0gWzAsIDQyMCwgNDIyLCA0NDRdXG4gICAgbGV0IGJpdF9kZXB0aCA9IDhcblxuICAgIGlmIChwcm9maWxlSWRjID09PSAxMDAgfHwgcHJvZmlsZUlkYyA9PT0gMTEwIHx8IHByb2ZpbGVJZGMgPT09IDEyMiB8fFxuICAgICAgcHJvZmlsZUlkYyA9PT0gMjQ0IHx8IHByb2ZpbGVJZGMgPT09IDQ0IHx8IHByb2ZpbGVJZGMgPT09IDgzIHx8XG4gICAgICBwcm9maWxlSWRjID09PSA4NiB8fCBwcm9maWxlSWRjID09PSAxMTggfHwgcHJvZmlsZUlkYyA9PT0gMTI4IHx8XG4gICAgICBwcm9maWxlSWRjID09PSAxMzggfHwgcHJvZmlsZUlkYyA9PT0gMTQ0KSB7XG4gICAgICBjaHJvbWFfZm9ybWF0X2lkYyA9IGdiLnJlYWRVRUcoKVxuICAgICAgaWYgKGNocm9tYV9mb3JtYXRfaWRjID09PSAzKSB7XG4gICAgICAgIGdiLnJlYWRCaXRzKDEpXG4gICAgICB9XG4gICAgICBpZiAoY2hyb21hX2Zvcm1hdF9pZGMgPD0gMykge1xuICAgICAgICBjaHJvbWFfZm9ybWF0ID0gY2hyb21hX2Zvcm1hdF90YWJsZVtjaHJvbWFfZm9ybWF0X2lkY11cbiAgICAgIH1cblxuICAgICAgYml0X2RlcHRoID0gZ2IucmVhZFVFRygpICsgOFxuICAgICAgZ2IucmVhZFVFRygpXG4gICAgICBnYi5yZWFkQml0cygxKVxuICAgICAgaWYgKGdiLnJlYWRCb29sKCkpIHtcbiAgICAgICAgbGV0IHNjYWxpbmdfbGlzdF9jb3VudCA9IChjaHJvbWFfZm9ybWF0X2lkYyAhPT0gMykgPyA4IDogMTJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY2FsaW5nX2xpc3RfY291bnQ7IGkrKykge1xuICAgICAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgICAgICBpZiAoaSA8IDYpIHtcbiAgICAgICAgICAgICAgU1BTUGFyc2VyLl9za2lwU2NhbGluZ0xpc3QoZ2IsIDE2KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgU1BTUGFyc2VyLl9za2lwU2NhbGluZ0xpc3QoZ2IsIDY0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBnYi5yZWFkVUVHKClcbiAgICBsZXQgcGljX29yZGVyX2NudF90eXBlID0gZ2IucmVhZFVFRygpXG4gICAgaWYgKHBpY19vcmRlcl9jbnRfdHlwZSA9PT0gMCkge1xuICAgICAgZ2IucmVhZFVFRygpXG4gICAgfSBlbHNlIGlmIChwaWNfb3JkZXJfY250X3R5cGUgPT09IDEpIHtcbiAgICAgIGdiLnJlYWRCaXRzKDEpXG4gICAgICBnYi5yZWFkU0VHKClcbiAgICAgIGdiLnJlYWRTRUcoKVxuICAgICAgbGV0IG51bV9yZWZfZnJhbWVzX2luX3BpY19vcmRlcl9jbnRfY3ljbGUgPSBnYi5yZWFkVUVHKClcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtX3JlZl9mcmFtZXNfaW5fcGljX29yZGVyX2NudF9jeWNsZTsgaSsrKSB7XG4gICAgICAgIGdiLnJlYWRTRUcoKVxuICAgICAgfVxuICAgIH1cbiAgICBnYi5yZWFkVUVHKClcbiAgICBnYi5yZWFkQml0cygxKVxuXG4gICAgbGV0IHBpY193aWR0aF9pbl9tYnNfbWludXMxID0gZ2IucmVhZFVFRygpXG4gICAgbGV0IHBpY19oZWlnaHRfaW5fbWFwX3VuaXRzX21pbnVzMSA9IGdiLnJlYWRVRUcoKVxuXG4gICAgbGV0IGZyYW1lX21ic19vbmx5X2ZsYWcgPSBnYi5yZWFkQml0cygxKVxuICAgIGlmIChmcmFtZV9tYnNfb25seV9mbGFnID09PSAwKSB7XG4gICAgICBnYi5yZWFkQml0cygxKVxuICAgIH1cbiAgICBnYi5yZWFkQml0cygxKVxuXG4gICAgbGV0IGZyYW1lX2Nyb3BfbGVmdF9vZmZzZXQgPSAwXG4gICAgbGV0IGZyYW1lX2Nyb3BfcmlnaHRfb2Zmc2V0ID0gMFxuICAgIGxldCBmcmFtZV9jcm9wX3RvcF9vZmZzZXQgPSAwXG4gICAgbGV0IGZyYW1lX2Nyb3BfYm90dG9tX29mZnNldCA9IDBcblxuICAgIGxldCBmcmFtZV9jcm9wcGluZ19mbGFnID0gZ2IucmVhZEJvb2woKVxuICAgIGlmIChmcmFtZV9jcm9wcGluZ19mbGFnKSB7XG4gICAgICBmcmFtZV9jcm9wX2xlZnRfb2Zmc2V0ID0gZ2IucmVhZFVFRygpXG4gICAgICBmcmFtZV9jcm9wX3JpZ2h0X29mZnNldCA9IGdiLnJlYWRVRUcoKVxuICAgICAgZnJhbWVfY3JvcF90b3Bfb2Zmc2V0ID0gZ2IucmVhZFVFRygpXG4gICAgICBmcmFtZV9jcm9wX2JvdHRvbV9vZmZzZXQgPSBnYi5yZWFkVUVHKClcbiAgICB9XG5cbiAgICBsZXQgcGFyX3dpZHRoID0gMSwgcGFyX2hlaWdodCA9IDFcbiAgICBsZXQgZnBzID0gMCwgZnBzX2ZpeGVkID0gdHJ1ZSwgZnBzX251bSA9IDAsIGZwc19kZW4gPSAwXG5cbiAgICBsZXQgdnVpX3BhcmFtZXRlcnNfcHJlc2VudF9mbGFnID0gZ2IucmVhZEJvb2woKVxuICAgIGlmICh2dWlfcGFyYW1ldGVyc19wcmVzZW50X2ZsYWcpIHtcbiAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7IC8vIGFzcGVjdF9yYXRpb19pbmZvX3ByZXNlbnRfZmxhZ1xuICAgICAgICBsZXQgYXNwZWN0X3JhdGlvX2lkYyA9IGdiLnJlYWRCeXRlKClcbiAgICAgICAgbGV0IHBhcl93X3RhYmxlID0gWzEsIDEyLCAxMCwgMTYsIDQwLCAyNCwgMjAsIDMyLCA4MCwgMTgsIDE1LCA2NCwgMTYwLCA0LCAzLCAyXVxuICAgICAgICBsZXQgcGFyX2hfdGFibGUgPSBbMSwgMTEsIDExLCAxMSwgMzMsIDExLCAxMSwgMTEsIDMzLCAxMSwgMTEsIDMzLCA5OSwgMywgMiwgMV1cblxuICAgICAgICBpZiAoYXNwZWN0X3JhdGlvX2lkYyA+IDAgJiYgYXNwZWN0X3JhdGlvX2lkYyA8IDE2KSB7XG4gICAgICAgICAgcGFyX3dpZHRoID0gcGFyX3dfdGFibGVbYXNwZWN0X3JhdGlvX2lkYyAtIDFdXG4gICAgICAgICAgcGFyX2hlaWdodCA9IHBhcl9oX3RhYmxlW2FzcGVjdF9yYXRpb19pZGMgLSAxXVxuICAgICAgICB9IGVsc2UgaWYgKGFzcGVjdF9yYXRpb19pZGMgPT09IDI1NSkge1xuICAgICAgICAgIHBhcl93aWR0aCA9IGdiLnJlYWRCeXRlKCkgPDwgOCB8IGdiLnJlYWRCeXRlKClcbiAgICAgICAgICBwYXJfaGVpZ2h0ID0gZ2IucmVhZEJ5dGUoKSA8PCA4IHwgZ2IucmVhZEJ5dGUoKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgIGdiLnJlYWRCb29sKClcbiAgICAgIH1cbiAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgIGdiLnJlYWRCaXRzKDQpXG4gICAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgICAgZ2IucmVhZEJpdHMoMjQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgIGdiLnJlYWRVRUcoKVxuICAgICAgICBnYi5yZWFkVUVHKClcbiAgICAgIH1cbiAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgIGxldCBudW1fdW5pdHNfaW5fdGljayA9IGdiLnJlYWRCaXRzKDMyKVxuICAgICAgICBsZXQgdGltZV9zY2FsZSA9IGdiLnJlYWRCaXRzKDMyKVxuICAgICAgICBmcHNfZml4ZWQgPSBnYi5yZWFkQm9vbCgpXG5cbiAgICAgICAgZnBzX251bSA9IHRpbWVfc2NhbGVcbiAgICAgICAgZnBzX2RlbiA9IG51bV91bml0c19pbl90aWNrICogMlxuICAgICAgICBmcHMgPSBmcHNfbnVtIC8gZnBzX2RlblxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBwYXJTY2FsZSA9IDFcbiAgICBpZiAocGFyX3dpZHRoICE9PSAxIHx8IHBhcl9oZWlnaHQgIT09IDEpIHtcbiAgICAgIHBhclNjYWxlID0gcGFyX3dpZHRoIC8gcGFyX2hlaWdodFxuICAgIH1cblxuICAgIGxldCBjcm9wX3VuaXRfeCA9IDAsIGNyb3BfdW5pdF95ID0gMFxuICAgIGlmIChjaHJvbWFfZm9ybWF0X2lkYyA9PT0gMCkge1xuICAgICAgY3JvcF91bml0X3ggPSAxXG4gICAgICBjcm9wX3VuaXRfeSA9IDIgLSBmcmFtZV9tYnNfb25seV9mbGFnXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBzdWJfd2MgPSAoY2hyb21hX2Zvcm1hdF9pZGMgPT09IDMpID8gMSA6IDJcbiAgICAgIGxldCBzdWJfaGMgPSAoY2hyb21hX2Zvcm1hdF9pZGMgPT09IDEpID8gMiA6IDFcbiAgICAgIGNyb3BfdW5pdF94ID0gc3ViX3djXG4gICAgICBjcm9wX3VuaXRfeSA9IHN1Yl9oYyAqICgyIC0gZnJhbWVfbWJzX29ubHlfZmxhZylcbiAgICB9XG5cbiAgICBsZXQgY29kZWNfd2lkdGggPSAocGljX3dpZHRoX2luX21ic19taW51czEgKyAxKSAqIDE2XG4gICAgbGV0IGNvZGVjX2hlaWdodCA9ICgyIC0gZnJhbWVfbWJzX29ubHlfZmxhZykgKiAoKHBpY19oZWlnaHRfaW5fbWFwX3VuaXRzX21pbnVzMSArIDEpICogMTYpXG5cbiAgICBjb2RlY193aWR0aCAtPSAoZnJhbWVfY3JvcF9sZWZ0X29mZnNldCArIGZyYW1lX2Nyb3BfcmlnaHRfb2Zmc2V0KSAqIGNyb3BfdW5pdF94XG4gICAgY29kZWNfaGVpZ2h0IC09IChmcmFtZV9jcm9wX3RvcF9vZmZzZXQgKyBmcmFtZV9jcm9wX2JvdHRvbV9vZmZzZXQpICogY3JvcF91bml0X3lcblxuICAgIGxldCBwcmVzZW50X3dpZHRoID0gTWF0aC5jZWlsKGNvZGVjX3dpZHRoICogcGFyU2NhbGUpXG5cbiAgICBnYi5kZXN0cm95KClcbiAgICBnYiA9IG51bGxcblxuICAgIHJldHVybiB7XG4gICAgICBwcm9maWxlX3N0cmluZzogcHJvZmlsZV9zdHJpbmcsXG4gICAgICBsZXZlbF9zdHJpbmc6IGxldmVsX3N0cmluZyxcbiAgICAgIGJpdF9kZXB0aDogYml0X2RlcHRoLFxuICAgICAgY2hyb21hX2Zvcm1hdDogY2hyb21hX2Zvcm1hdCxcbiAgICAgIGNocm9tYV9mb3JtYXRfc3RyaW5nOiBTUFNQYXJzZXIuZ2V0Q2hyb21hRm9ybWF0U3RyaW5nKGNocm9tYV9mb3JtYXQpLFxuXG4gICAgICBmcmFtZV9yYXRlOiB7XG4gICAgICAgIGZpeGVkOiBmcHNfZml4ZWQsXG4gICAgICAgIGZwczogZnBzLFxuICAgICAgICBmcHNfZGVuOiBmcHNfZGVuLFxuICAgICAgICBmcHNfbnVtOiBmcHNfbnVtXG4gICAgICB9LFxuXG4gICAgICBwYXJfcmF0aW86IHtcbiAgICAgICAgd2lkdGg6IHBhcl93aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBwYXJfaGVpZ2h0XG4gICAgICB9LFxuXG4gICAgICBjb2RlY19zaXplOiB7XG4gICAgICAgIHdpZHRoOiBjb2RlY193aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBjb2RlY19oZWlnaHRcbiAgICAgIH0sXG5cbiAgICAgIHByZXNlbnRfc2l6ZToge1xuICAgICAgICB3aWR0aDogcHJlc2VudF93aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBjb2RlY19oZWlnaHRcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgX3NraXBTY2FsaW5nTGlzdCAoZ2IsIGNvdW50KSB7XG4gICAgbGV0IGxhc3Rfc2NhbGUgPSA4LCBuZXh0X3NjYWxlID0gOFxuICAgIGxldCBkZWx0YV9zY2FsZSA9IDBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgIGlmIChuZXh0X3NjYWxlICE9PSAwKSB7XG4gICAgICAgIGRlbHRhX3NjYWxlID0gZ2IucmVhZFNFRygpXG4gICAgICAgIG5leHRfc2NhbGUgPSAobGFzdF9zY2FsZSArIGRlbHRhX3NjYWxlICsgMjU2KSAlIDI1NlxuICAgICAgfVxuICAgICAgbGFzdF9zY2FsZSA9IChuZXh0X3NjYWxlID09PSAwKSA/IGxhc3Rfc2NhbGUgOiBuZXh0X3NjYWxlXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldFByb2ZpbGVTdHJpbmcgKHByb2ZpbGVJZGMpIHtcbiAgICBzd2l0Y2ggKHByb2ZpbGVJZGMpIHtcbiAgICAgIGNhc2UgNjY6XG4gICAgICAgIHJldHVybiAnQmFzZWxpbmUnXG4gICAgICBjYXNlIDc3OlxuICAgICAgICByZXR1cm4gJ01haW4nXG4gICAgICBjYXNlIDg4OlxuICAgICAgICByZXR1cm4gJ0V4dGVuZGVkJ1xuICAgICAgY2FzZSAxMDA6XG4gICAgICAgIHJldHVybiAnSGlnaCdcbiAgICAgIGNhc2UgMTEwOlxuICAgICAgICByZXR1cm4gJ0hpZ2gxMCdcbiAgICAgIGNhc2UgMTIyOlxuICAgICAgICByZXR1cm4gJ0hpZ2g0MjInXG4gICAgICBjYXNlIDI0NDpcbiAgICAgICAgcmV0dXJuICdIaWdoNDQ0J1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICdVbmtub3duJ1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRMZXZlbFN0cmluZyAobGV2ZWxJZGMpIHtcbiAgICByZXR1cm4gKGxldmVsSWRjIC8gMTApLnRvRml4ZWQoMSlcbiAgfVxuXG4gIHN0YXRpYyBnZXRDaHJvbWFGb3JtYXRTdHJpbmcgKGNocm9tYSkge1xuICAgIHN3aXRjaCAoY2hyb21hKSB7XG4gICAgICBjYXNlIDQyMDpcbiAgICAgICAgcmV0dXJuICc0OjI6MCdcbiAgICAgIGNhc2UgNDIyOlxuICAgICAgICByZXR1cm4gJzQ6MjoyJ1xuICAgICAgY2FzZSA0NDQ6XG4gICAgICAgIHJldHVybiAnNDo0OjQnXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ1Vua25vd24nXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHRvVmlkZW9NZXRhIChzcHNDb25maWcpIHtcbiAgICBsZXQgbWV0YSA9IHt9XG4gICAgaWYgKHNwc0NvbmZpZyAmJiBzcHNDb25maWcuY29kZWNfc2l6ZSkge1xuICAgICAgbWV0YS5jb2RlY1dpZHRoID0gc3BzQ29uZmlnLmNvZGVjX3NpemUud2lkdGhcbiAgICAgIG1ldGEuY29kZWNIZWlnaHQgPSBzcHNDb25maWcuY29kZWNfc2l6ZS5oZWlnaHRcbiAgICAgIG1ldGEucHJlc2VudFdpZHRoID0gc3BzQ29uZmlnLnByZXNlbnRfc2l6ZS53aWR0aFxuICAgICAgbWV0YS5wcmVzZW50SGVpZ2h0ID0gc3BzQ29uZmlnLnByZXNlbnRfc2l6ZS5oZWlnaHRcbiAgICB9XG5cbiAgICBtZXRhLnByb2ZpbGUgPSBzcHNDb25maWcucHJvZmlsZV9zdHJpbmdcbiAgICBtZXRhLmxldmVsID0gc3BzQ29uZmlnLmxldmVsX3N0cmluZ1xuICAgIG1ldGEuYml0RGVwdGggPSBzcHNDb25maWcuYml0X2RlcHRoXG4gICAgbWV0YS5jaHJvbWFGb3JtYXQgPSBzcHNDb25maWcuY2hyb21hX2Zvcm1hdFxuXG4gICAgbWV0YS5wYXJSYXRpbyA9IHtcbiAgICAgIHdpZHRoOiBzcHNDb25maWcucGFyX3JhdGlvLndpZHRoLFxuICAgICAgaGVpZ2h0OiBzcHNDb25maWcucGFyX3JhdGlvLmhlaWdodFxuICAgIH1cblxuICAgIG1ldGEuZnJhbWVSYXRlID0gc3BzQ29uZmlnLmZyYW1lX3JhdGVcblxuICAgIGxldCBmcHNEZW4gPSBtZXRhLmZyYW1lUmF0ZS5mcHNfZGVuXG4gICAgbGV0IGZwc051bSA9IG1ldGEuZnJhbWVSYXRlLmZwc19udW1cbiAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uID0gTWF0aC5mbG9vcihtZXRhLnRpbWVzY2FsZSAqIChmcHNEZW4gLyBmcHNOdW0pKVxuICAgIHJldHVybiBtZXRhO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNQU1BhcnNlclxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIEhMU1xuICBNM1U4UGFyc2VyOiByZXF1aXJlKCcuL3NyYy9obHMvZGVtdXhlci9tM3U4cGFyc2VyJykuZGVmYXVsdCxcbiAgVHNEZW11eGVyOiByZXF1aXJlKCcuL3NyYy9obHMvZGVtdXhlci90cycpLmRlZmF1bHQsXG4gIFBsYXlsaXN0OiByZXF1aXJlKCcuL3NyYy9obHMvcGxheWxpc3QnKS5kZWZhdWx0LFxuICBGbHZEZW11eGVyOiByZXF1aXJlKCcuL3NyYy9mbHYvaW5kZXgnKS5kZWZhdWx0XG59O1xuIiwiaW1wb3J0IHsgaXNMZSwgVVRGOCB9IGZyb20gJ3hncGxheWVyLXV0aWxzJ1xuXG5jb25zdCBEQVRBX1RZUEVTID0ge1xuICBOVU1CRVI6IDAsXG4gIEJPT0xFQU46IDEsXG4gIFNUUklORzogMixcbiAgT0JKRUNUOiAzLFxuICBNSVhfQVJSQVk6IDgsXG4gIE9CSkVDVF9FTkQ6IDksXG4gIFNUUklDVF9BUlJBWTogMTAsXG4gIERBVEU6IDExLFxuICBMT05FX1NUUklORzogMTJcbn1cblxuLyoqXG4gKiBtZXRh5L+h5oGv6Kej5p6QXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFNRlBhcnNlciB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgICB0aGlzLnJlYWRPZmZzZXQgPSB0aGlzLm9mZnNldFxuICB9XG5cbiAgcmVzb2x2ZSAobWV0YSwgc2l6ZSkge1xuICAgIGlmIChzaXplIDwgMykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3QgZW5vdWdoIGRhdGEgZm9yIG1ldGFpbmZvJylcbiAgICB9XG4gICAgY29uc3QgbWV0YURhdGEgPSB7fVxuICAgIGNvbnN0IG5hbWUgPSB0aGlzLnBhcnNlVmFsdWUobWV0YSlcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMucGFyc2VWYWx1ZShtZXRhLCBzaXplIC0gbmFtZS5ib2R5U2l6ZSlcbiAgICBtZXRhRGF0YVtuYW1lLmRhdGFdID0gdmFsdWUuZGF0YVxuXG4gICAgdGhpcy5yZXNldFN0YXR1cygpXG4gICAgcmV0dXJuIG1ldGFEYXRhXG4gIH1cblxuICByZXNldFN0YXR1cyAoKSB7XG4gICAgdGhpcy5vZmZzZXQgPSAwXG4gICAgdGhpcy5yZWFkT2Zmc2V0ID0gdGhpcy5vZmZzZXRcbiAgfVxuXG4gIHBhcnNlU3RyaW5nIChidWZmZXIpIHtcbiAgICBjb25zdCBkdiA9IG5ldyBEYXRhVmlldyhidWZmZXIsIHRoaXMucmVhZE9mZnNldClcbiAgICBjb25zdCBzdHJMZW4gPSBkdi5nZXRVaW50MTYoMCwgIWlzTGUpXG4gICAgbGV0IHN0ciA9ICcnXG4gICAgaWYgKHN0ckxlbiA+IDApIHtcbiAgICAgIHN0ciA9IFVURjguZGVjb2RlKG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgdGhpcy5yZWFkT2Zmc2V0ICsgMiwgc3RyTGVuKSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gJydcbiAgICB9XG4gICAgbGV0IHNpemUgPSBzdHJMZW4gKyAyXG4gICAgdGhpcy5yZWFkT2Zmc2V0ICs9IHNpemVcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogc3RyLFxuICAgICAgYm9keVNpemU6IHN0ckxlbiArIDJcbiAgICB9XG4gIH1cblxuICBwYXJzZURhdGUgKGJ1ZmZlciwgc2l6ZSkge1xuICAgIGNvbnN0IGR2ID0gbmV3IERhdGFWaWV3KGJ1ZmZlciwgdGhpcy5yZWFkT2Zmc2V0LCBzaXplKVxuICAgIGxldCB0cyA9IGR2LmdldEZsb2F0NjQoMCwgIWlzTGUpXG4gICAgY29uc3QgdGltZU9mZnNldCA9IGR2LmdldEludDE2KDgsICFpc0xlKVxuICAgIHRzICs9IHRpbWVPZmZzZXQgKiA2MCAqIDEwMDBcblxuICAgIHRoaXMucmVhZE9mZnNldCArPSAxMFxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBuZXcgRGF0ZSh0cyksXG4gICAgICBib2R5U2l6ZTogMTBcbiAgICB9XG4gIH1cblxuICBwYXJzZU9iamVjdCAoYnVmZmVyLCBzaXplKSB7XG4gICAgY29uc3QgbmFtZSA9IHRoaXMucGFyc2VTdHJpbmcoYnVmZmVyLCBzaXplKVxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5wYXJzZVZhbHVlKGJ1ZmZlciwgc2l6ZSAtIG5hbWUuYm9keVNpemUpXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgbmFtZTogbmFtZS5kYXRhLFxuICAgICAgICB2YWx1ZTogdmFsdWUuZGF0YVxuICAgICAgfSxcbiAgICAgIGJvZHlTaXplOiBuYW1lLmJvZHlTaXplICsgdmFsdWUuYm9keVNpemUsXG4gICAgICBpc09iakVuZDogdmFsdWUuaXNPYmpFbmRcbiAgICB9XG4gIH1cblxuICBwYXJzZUxvbmdTdHJpbmcgKGJ1ZmZlcikge1xuICAgIGNvbnN0IGR2ID0gbmV3IERhdGFWaWV3KGJ1ZmZlciwgdGhpcy5yZWFkT2Zmc2V0KVxuICAgIGNvbnN0IHN0ckxlbiA9IGR2LmdldFVpbnQzMigwLCAhaXNMZSlcbiAgICBsZXQgc3RyID0gJydcbiAgICBpZiAoc3RyTGVuID4gMCkge1xuICAgICAgc3RyID0gVVRGOC5kZWNvZGUobmV3IFVpbnQ4QXJyYXkoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQgKyAyLCBzdHJMZW4pKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSAnJ1xuICAgIH1cbiAgICAvLyBjb25zdCBzaXplID0gc3RyTGVuICsgNDtcbiAgICB0aGlzLnJlYWRPZmZzZXQgKz0gc3RyTGVuICsgNFxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBzdHIsXG4gICAgICBib2R5U2l6ZTogc3RyTGVuICsgNFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDop6PmnpBtZXRh5Lit55qE5Y+Y6YePXG4gICAqL1xuICBwYXJzZVZhbHVlIChkYXRhLCBzaXplKSB7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcigpXG4gICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgYnVmZmVyID0gZGF0YVxuICAgIH0gZWxzZSB7XG4gICAgICBidWZmZXIgPSBkYXRhLmJ1ZmZlclxuICAgIH1cbiAgICBjb25zdCB7XG4gICAgICBOVU1CRVIsXG4gICAgICBCT09MRUFOLFxuICAgICAgU1RSSU5HLFxuICAgICAgT0JKRUNULFxuICAgICAgTUlYX0FSUkFZLFxuICAgICAgT0JKRUNUX0VORCxcbiAgICAgIFNUUklDVF9BUlJBWSxcbiAgICAgIERBVEUsXG4gICAgICBMT05FX1NUUklOR1xuICAgIH0gPSBEQVRBX1RZUEVTXG4gICAgY29uc3QgZGF0YVZpZXcgPSBuZXcgRGF0YVZpZXcoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQsIHNpemUpXG4gICAgbGV0IGlzT2JqRW5kID0gZmFsc2VcbiAgICBjb25zdCB0eXBlID0gZGF0YVZpZXcuZ2V0VWludDgoMClcbiAgICBsZXQgb2Zmc2V0ID0gMVxuICAgIHRoaXMucmVhZE9mZnNldCArPSAxXG4gICAgbGV0IHZhbHVlID0gbnVsbFxuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIE5VTUJFUjoge1xuICAgICAgICB2YWx1ZSA9IGRhdGFWaWV3LmdldEZsb2F0NjQoMSwgIWlzTGUpXG4gICAgICAgIHRoaXMucmVhZE9mZnNldCArPSA4XG4gICAgICAgIG9mZnNldCArPSA4XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjYXNlIEJPT0xFQU46IHtcbiAgICAgICAgY29uc3QgYm9vbE51bSA9IGRhdGFWaWV3LmdldFVpbnQ4KDEpXG4gICAgICAgIHZhbHVlID0gISFib29sTnVtXG4gICAgICAgIHRoaXMucmVhZE9mZnNldCArPSAxXG4gICAgICAgIG9mZnNldCArPSAxXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjYXNlIFNUUklORzoge1xuICAgICAgICBjb25zdCBzdHIgPSB0aGlzLnBhcnNlU3RyaW5nKGJ1ZmZlcilcbiAgICAgICAgdmFsdWUgPSBzdHIuZGF0YVxuICAgICAgICBvZmZzZXQgKz0gc3RyLmJvZHlTaXplXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjYXNlIE9CSkVDVDoge1xuICAgICAgICB2YWx1ZSA9IHt9XG4gICAgICAgIGxldCBvYmpFbmRTaXplID0gMFxuICAgICAgICBpZiAoZGF0YVZpZXcuZ2V0VWludDMyKHNpemUgLSA0LCAhaXNMZSkgJiAweDAwRkZGRkZGKSB7XG4gICAgICAgICAgb2JqRW5kU2l6ZSA9IDNcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzLnJlYWRPZmZzZXQgKz0gb2Zmc2V0IC0gMTtcbiAgICAgICAgd2hpbGUgKG9mZnNldCA8IHNpemUgLSA0KSB7XG4gICAgICAgICAgY29uc3QgYW1mT2JqID0gdGhpcy5wYXJzZU9iamVjdChidWZmZXIsIHNpemUgLSBvZmZzZXQgLSBvYmpFbmRTaXplKVxuICAgICAgICAgIGlmIChhbWZPYmouaXNPYmplY3RFbmQpIHsgYnJlYWsgfVxuICAgICAgICAgIHZhbHVlW2FtZk9iai5kYXRhLm5hbWVdID0gYW1mT2JqLmRhdGEudmFsdWVcbiAgICAgICAgICBvZmZzZXQgKz0gYW1mT2JqLmJvZHlTaXplXG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9mZnNldCA8PSBzaXplIC0gMykge1xuICAgICAgICAgIGNvbnN0IG1hcmsgPSBkYXRhVmlldy5nZXRVaW50MzIob2Zmc2V0IC0gMSwgIWlzTGUpICYgMHgwMEZGRkZGRlxuICAgICAgICAgIGlmIChtYXJrID09PSA5KSB7XG4gICAgICAgICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gM1xuICAgICAgICAgICAgb2Zmc2V0ICs9IDNcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGNhc2UgTUlYX0FSUkFZOiB7XG4gICAgICAgIHZhbHVlID0ge31cbiAgICAgICAgb2Zmc2V0ICs9IDRcbiAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDRcbiAgICAgICAgbGV0IG9iakVuZFNpemUgPSAwXG4gICAgICAgIGlmICgoZGF0YVZpZXcuZ2V0VWludDMyKHNpemUgLSA0LCAhaXNMZSkgJiAweDAwRkZGRkZGKSA9PT0gOSkge1xuICAgICAgICAgIG9iakVuZFNpemUgPSAzXG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAob2Zmc2V0IDwgc2l6ZSAtIDgpIHtcbiAgICAgICAgICBjb25zdCBhbWZWYXIgPSB0aGlzLnBhcnNlT2JqZWN0KGJ1ZmZlciwgc2l6ZSAtIG9mZnNldCAtIG9iakVuZFNpemUpXG4gICAgICAgICAgaWYgKGFtZlZhci5pc09iamVjdEVuZCkgeyBicmVhayB9XG4gICAgICAgICAgdmFsdWVbYW1mVmFyLmRhdGEubmFtZV0gPSBhbWZWYXIuZGF0YS52YWx1ZVxuICAgICAgICAgIG9mZnNldCArPSBhbWZWYXIuYm9keVNpemVcbiAgICAgICAgfVxuICAgICAgICBpZiAob2Zmc2V0IDw9IHNpemUgLSAzKSB7XG4gICAgICAgICAgY29uc3QgbWFya2VyID0gZGF0YVZpZXcuZ2V0VWludDMyKG9mZnNldCAtIDEsICFpc0xlKSAmIDB4MDBGRkZGRkZcbiAgICAgICAgICBpZiAobWFya2VyID09PSA5KSB7XG4gICAgICAgICAgICBvZmZzZXQgKz0gM1xuICAgICAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDNcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgY2FzZSBPQkpFQ1RfRU5EOiB7XG4gICAgICAgIHZhbHVlID0gbnVsbFxuICAgICAgICBpc09iakVuZCA9IHRydWVcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgY2FzZSBTVFJJQ1RfQVJSQVk6IHtcbiAgICAgICAgdmFsdWUgPSBbXVxuICAgICAgICBjb25zdCBhcnJMZW5ndGggPSBkYXRhVmlldy5nZXRVaW50MzIoMSwgIWlzTGUpXG4gICAgICAgIG9mZnNldCArPSA0XG4gICAgICAgIHRoaXMucmVhZE9mZnNldCArPSA0XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBzY3JpcHQgPSB0aGlzLnBhcnNlVmFsdWUoYnVmZmVyLCBzaXplIC0gb2Zmc2V0KVxuICAgICAgICAgIHZhbHVlLnB1c2goc2NyaXB0LmRhdGEpXG4gICAgICAgICAgb2Zmc2V0ICs9IHNjcmlwdC5ib2R5U2l6ZVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGNhc2UgREFURToge1xuICAgICAgICBjb25zdCBkYXRlID0gdGhpcy5wYXJzZURhdGUoYnVmZmVyLCBzaXplIC0gMSlcbiAgICAgICAgdmFsdWUgPSBkYXRlLmRhdGFcbiAgICAgICAgb2Zmc2V0ICs9IGRhdGUuYm9keVNpemVcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgY2FzZSBMT05FX1NUUklORzoge1xuICAgICAgICBjb25zdCBsb25nU3RyID0gdGhpcy5wYXJzZUxvbmdTdHJpbmcoYnVmZmVyLCBzaXplIC0gMSlcbiAgICAgICAgdmFsdWUgPSBsb25nU3RyLmRhdGFcbiAgICAgICAgb2Zmc2V0ICs9IGxvbmdTdHIuYm9keVNpemVcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBvZmZzZXQgPSBzaXplXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IHZhbHVlLFxuICAgICAgYm9keVNpemU6IG9mZnNldCxcbiAgICAgIGlzT2JqRW5kOiBpc09iakVuZFxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgRVZFTlRTLCBBdWRpb1RyYWNrTWV0YSwgVmlkZW9UcmFja01ldGEsIHNuaWZmZXIgfSBmcm9tICd4Z3BsYXllci11dGlscyc7XG5pbXBvcnQgeyBTcHNQYXJzZXIgfSBmcm9tICd4Z3BsYXllci1jb2RlYyc7XG5pbXBvcnQgeyBWaWRlb1RyYWNrLCBBdWRpb1RyYWNrIH0gZnJvbSAneGdwbGF5ZXItYnVmZmVyJ1xuaW1wb3J0IEFNRlBhcnNlciBmcm9tICcuL2FtZi1wYXJzZXInXG5cbmNvbnN0IERFTVVYX0VWRU5UUyA9IEVWRU5UUy5ERU1VWF9FVkVOVFM7XG5cbmNsYXNzIEZsdkRlbXV4ZXIge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5fZmlyc3RGcmFnbWVudExvYWRlZCA9IGZhbHNlXG4gICAgdGhpcy5fdHJhY2tOdW0gPSAwXG4gICAgdGhpcy5faGFzU2NyaXB0ID0gZmFsc2VcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIHRoaXMub24oREVNVVhfRVZFTlRTLkRFTVVYX1NUQVJULCB0aGlzLmRvUGFyc2VGbHYuYmluZCh0aGlzKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBpZiB0aGUgZmx2IGhlYWQgaXMgdmFsaWRcbiAgICogQHBhcmFtIGRhdGFcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgaXNGbHZGaWxlIChkYXRhKSB7XG4gICAgcmV0dXJuICEoZGF0YVswXSAhPT0gMHg0NiB8fCBkYXRhWzFdICE9PSAweDRDIHx8IGRhdGFbMl0gIT09IDB4NTYgfHwgZGF0YVszXSAhPT0gMHgwMSlcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiB0aGUgc3RyZWFtIGhhcyBhdWRpbyBvciB2aWRlby5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHN0cmVhbUZsYWcgLSBEYXRhIGZyb20gdGhlIHN0cmVhbSB3aGljaCBpcyBkZWZpbmUgd2hldGhlciB0aGUgYXVkaW8gLyB2aWRlbyB0cmFjayBpcyBleGlzdC5cbiAgICovXG4gIHN0YXRpYyBnZXRQbGF5VHlwZSAoc3RyZWFtRmxhZykge1xuICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgIGhhc1ZpZGVvOiBmYWxzZSxcbiAgICAgIGhhc0F1ZGlvOiBmYWxzZVxuICAgIH1cblxuICAgIGlmIChzdHJlYW1GbGFnICYgMHgwMSA+IDApIHtcbiAgICAgIHJlc3VsdC5oYXNWaWRlbyA9IHRydWVcbiAgICB9XG5cbiAgICBpZiAoc3RyZWFtRmxhZyAmIDB4MDQgPiAwKSB7XG4gICAgICByZXN1bHQuaGFzQXVkaW8gPSB0cnVlXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgZG9QYXJzZUZsdiAoKSB7XG4gICAgaWYgKCF0aGlzLl9maXJzdEZyYWdtZW50TG9hZGVkKSB7XG4gICAgICBpZiAodGhpcy5sb2FkZXJCdWZmZXIubGVuZ3RoIDwgMTMpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjb25zdCBoZWFkZXIgPSB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgxMylcbiAgICAgIHRoaXMucGFyc2VGbHZIZWFkZXIoaGVhZGVyKVxuICAgICAgdGhpcy5kb1BhcnNlRmx2KCkgLy8g6YCS5b2S6LCD55So77yM57un57ut6Kej5p6QZmx25rWBXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmxvYWRlckJ1ZmZlci5sZW5ndGggPCAxMSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGxldCBjaHVuaztcblxuICAgICAgbGV0IGxvb3BNYXggPSAxMDAwMDAgLy8g6Ziy5q2i5q275b6q546v5Lqn55SfXG4gICAgICBkbyB7XG4gICAgICAgIGNodW5rID0gdGhpcy5fcGFyc2VGbHZUYWcoKVxuICAgICAgfSB3aGlsZSAoY2h1bmsgJiYgbG9vcE1heC0tID4gMClcblxuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9DT01QTEVURSlcbiAgICB9XG4gIH1cblxuICBwYXJzZUZsdkhlYWRlciAoaGVhZGVyKSB7XG4gICAgaWYgKCFGbHZEZW11eGVyLmlzRmx2RmlsZShoZWFkZXIpKSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCBuZXcgRXJyb3IoJ2ludmFsaWQgZmx2IGZpbGUnKSlcbiAgICAgIHRoaXMuZG9QYXJzZUZsdigpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2ZpcnN0RnJhZ21lbnRMb2FkZWQgPSB0cnVlXG4gICAgICBjb25zdCBwbGF5VHlwZSA9IEZsdkRlbXV4ZXIuZ2V0UGxheVR5cGUoaGVhZGVyWzRdKVxuXG4gICAgICBpZiAocGxheVR5cGUuaGFzVmlkZW8pIHtcbiAgICAgICAgdGhpcy5pbml0VmlkZW9UcmFjaygpXG4gICAgICB9XG5cbiAgICAgIGlmIChwbGF5VHlwZS5oYXNBdWRpbykge1xuICAgICAgICB0aGlzLmluaXRBdWRpb1RyYWNrKClcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5kb1BhcnNlRmx2KClcbiAgfVxuXG4gIC8qKlxuICAgKiBpbml0IGRlZmF1bHQgdmlkZW8gdHJhY2sgY29uZmlnc1xuICAgKi9cbiAgaW5pdFZpZGVvVHJhY2sgKCkge1xuICAgIHRoaXMuX3RyYWNrTnVtKytcbiAgICBsZXQgdmlkZW9UcmFjayA9IG5ldyBWaWRlb1RyYWNrKClcbiAgICB2aWRlb1RyYWNrLm1ldGEgPSBuZXcgVmlkZW9UcmFja01ldGEoKVxuICAgIHZpZGVvVHJhY2suaWQgPSB2aWRlb1RyYWNrLm1ldGEuaWQgPSB0aGlzLl90cmFja051bVxuXG4gICAgdGhpcy50cmFja3MudmlkZW9UcmFjayA9IHZpZGVvVHJhY2tcbiAgfVxuXG4gIC8qKlxuICAgKiBpbml0IGRlZmF1bHQgYXVkaW8gdHJhY2sgY29uZmlnc1xuICAgKi9cbiAgaW5pdEF1ZGlvVHJhY2sgKCkge1xuICAgIHRoaXMuX3RyYWNrTnVtKytcbiAgICBsZXQgYXVkaW9UcmFjayA9IG5ldyBBdWRpb1RyYWNrKClcbiAgICBhdWRpb1RyYWNrLm1ldGEgPSBuZXcgQXVkaW9UcmFja01ldGEoKVxuICAgIGF1ZGlvVHJhY2suaWQgPSBhdWRpb1RyYWNrLm1ldGEuaWQgPSB0aGlzLl90cmFja051bVxuXG4gICAgdGhpcy50cmFja3MuYXVkaW9UcmFjayA9IGF1ZGlvVHJhY2tcbiAgfVxuXG4gIC8qKlxuICAgKiBQYWNrYWdlIHRoZSBkYXRhIGFzIHRoZSBmb2xsb3dpbmcgZGF0YSBzdHJ1Y3R1cmVcbiAgICoge1xuICAgKiAgICBkYXRhOiBVaW50OEFycmF5LiB0aGUgU3RyZWFtIGRhdGEuXG4gICAqICAgIGluZm86IFRoZSBmaXJzdCBieXRlIGluZm8gb2YgdGhlIFRhZy5cbiAgICogICAgdGFnVHlwZTogOOOAgTnjgIExOFxuICAgKiAgICB0aW1lU3RhbXA6IHRoZSB0aW1lc3RlbXBcbiAgICogfVxuICAgKi9cbiAgX3BhcnNlRmx2VGFnICgpIHtcbiAgICBpZiAodGhpcy5sb2FkZXJCdWZmZXIubGVuZ3RoIDwgMTEpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIGxldCBjaHVuayA9IHRoaXMuX3BhcnNlRmx2VGFnSGVhZGVyKClcbiAgICBpZiAoY2h1bmspIHtcbiAgICAgIHRoaXMuX3Byb2Nlc3NDaHVuayhjaHVuaylcbiAgICB9XG4gICAgcmV0dXJuIGNodW5rXG4gIH1cblxuICAvKipcbiAgICogUGFyc2UgdGhlIDExIGJ5dGUgdGFnIEhlYWRlclxuICAgKi9cbiAgX3BhcnNlRmx2VGFnSGVhZGVyICgpIHtcbiAgICBsZXQgb2Zmc2V0ID0gMFxuICAgIGxldCBjaHVuayA9IHt9XG5cbiAgICBsZXQgdGFnVHlwZSA9IHRoaXMubG9hZGVyQnVmZmVyLnRvSW50KG9mZnNldCwgMSlcbiAgICBvZmZzZXQgKz0gMVxuXG4gICAgLy8gMiBiaXQgRk1TIHJlc2VydmVkLCAxIGJpdCBmaWx0ZXJlZCwgNSBiaXQgdGFnIHR5cGVcbiAgICBjaHVuay5maWx0ZXJlZCA9ICh0YWdUeXBlICYgMzIpID4+PiA1XG4gICAgY2h1bmsudGFnVHlwZSA9IHRhZ1R5cGUgJiAzMVxuXG4gICAgLy8gMyBCeXRlIGRhdGFzaXplXG4gICAgY2h1bmsuZGF0YXNpemUgPSB0aGlzLmxvYWRlckJ1ZmZlci50b0ludChvZmZzZXQsIDMpXG4gICAgb2Zmc2V0ICs9IDNcblxuICAgIGlmICgoY2h1bmsudGFnVHlwZSAhPT0gOCAmJiBjaHVuay50YWdUeXBlICE9PSA5ICYmIGNodW5rLnRhZ1R5cGUgIT09IDExICYmIGNodW5rLnRhZ1R5cGUgIT09IDE4KSB8fFxuICAgICAgdGhpcy5sb2FkZXJCdWZmZXIudG9JbnQoOCwgMykgIT09IDApIHtcbiAgICAgIGlmICh0aGlzLmxvYWRlckJ1ZmZlciAmJiB0aGlzLmxvYWRlckJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDEpXG4gICAgICB9XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLlRBRywgbmV3IEVycm9yKCd0YWdUeXBlICcgKyBjaHVuay50YWdUeXBlKSwgZmFsc2UpXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIGlmICh0aGlzLmxvYWRlckJ1ZmZlci5sZW5ndGggPCBjaHVuay5kYXRhc2l6ZSArIDE1KSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIC8vIHJlYWQgdGhlIGRhdGEuXG4gICAgdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoNClcblxuICAgIC8vIDMgQnl0ZSB0aW1lc3RhbXBcbiAgICBsZXQgdGltZXN0YW1wID0gdGhpcy5sb2FkZXJCdWZmZXIudG9JbnQoMCwgMylcbiAgICB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgzKVxuXG4gICAgLy8gMSBCeXRlIHRpbWVzdGFtcEV4dFxuICAgIGxldCB0aW1lc3RhbXBFeHQgPSB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgxKVswXVxuICAgIGlmICh0aW1lc3RhbXBFeHQgPiAwKSB7XG4gICAgICB0aW1lc3RhbXAgKz0gdGltZXN0YW1wRXh0ICogMHgxMDAwMDAwXG4gICAgfVxuXG4gICAgY2h1bmsuZHRzID0gdGltZXN0YW1wXG5cbiAgICAvLyBzdHJlYW1JZFxuICAgIHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDMpXG4gICAgcmV0dXJuIGNodW5rXG4gIH1cblxuICBfcHJvY2Vzc0NodW5rIChjaHVuaykge1xuICAgIHN3aXRjaCAoY2h1bmsudGFnVHlwZSkge1xuICAgICAgY2FzZSAxODpcbiAgICAgICAgdGhpcy5fcGFyc2VTY3JpcHREYXRhKGNodW5rKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSA4OlxuICAgICAgICB0aGlzLl9wYXJzZUFBQ0RhdGEoY2h1bmspXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDk6XG4gICAgICAgIHRoaXMuX3BhcnNlSGV2Y0RhdGEoY2h1bmspXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDExOlxuICAgICAgICAvLyBmb3Igc29tZSBDRE4gdGhhdCBkaWQgbm90IHByb2Nlc3MgdGhlIGN1cnJlY3QgUlRNUCBtZXNzYWdlc1xuICAgICAgICB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgzKVxuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcGFyc2UgZmx2IHNjcmlwdCBkYXRhXG4gICAqIEBwYXJhbSBjaHVua1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3BhcnNlU2NyaXB0RGF0YSAoY2h1bmspIHtcbiAgICBsZXQgYXVkaW9UcmFjayA9IHRoaXMudHJhY2tzLmF1ZGlvVHJhY2tcbiAgICBsZXQgdmlkZW9UcmFjayA9IHRoaXMudHJhY2tzLnZpZGVvVHJhY2tcblxuICAgIGxldCBkYXRhID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoY2h1bmsuZGF0YXNpemUpXG5cbiAgICBjb25zdCBpbmZvID0gbmV3IEFNRlBhcnNlcigpLnJlc29sdmUoZGF0YSwgZGF0YS5sZW5ndGgpXG5cbiAgICBjb25zdCBvbk1ldGFEYXRhID0gdGhpcy5fY29udGV4dC5vbk1ldGFEYXRhID0gaW5mbyA/IGluZm8ub25NZXRhRGF0YSA6IHVuZGVmaW5lZFxuXG4gICAgLy8gZmlsbCBtZWRpYUluZm9cbiAgICB0aGlzLl9jb250ZXh0Lm1lZGlhSW5mby5kdXJhdGlvbiA9IG9uTWV0YURhdGEuZHVyYXRpb25cbiAgICB0aGlzLl9jb250ZXh0Lm1lZGlhSW5mby5oYXNWaWRlbyA9IG9uTWV0YURhdGEuaGFzVmlkZW9cbiAgICB0aGlzLl9jb250ZXh0Lm1lZGlhSW5mby5oc2FBdWRpbyA9IG9uTWV0YURhdGEuaGFzQXVkaW9cblxuICAgIGxldCB2YWxpZGF0ZSA9IHRoaXMuX2RhdGFzaXplVmFsaWRhdG9yKGNodW5rLmRhdGFzaXplKVxuICAgIGlmICh2YWxpZGF0ZSkge1xuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRURJQV9JTkZPKVxuICAgICAgdGhpcy5faGFzU2NyaXB0ID0gdHJ1ZVxuICAgIH1cblxuICAgIC8vIEVkaXQgZGVmYXVsdCBtZXRhLlxuICAgIGlmIChhdWRpb1RyYWNrICYmICFhdWRpb1RyYWNrLmhhc1NwZWNpZmljQ29uZmlnKSB7XG4gICAgICBsZXQgbWV0YSA9IGF1ZGlvVHJhY2subWV0YVxuICAgICAgaWYgKG9uTWV0YURhdGEuYXVkaW9zYW1wbGVyYXRlKSB7XG4gICAgICAgIG1ldGEuc2FtcGxlUmF0ZSA9IG9uTWV0YURhdGEuYXVkaW9zYW1wbGVyYXRlXG4gICAgICB9XG5cbiAgICAgIGlmIChvbk1ldGFEYXRhLmF1ZGlvY2hhbm5lbHMpIHtcbiAgICAgICAgbWV0YS5jaGFubmVsQ291bnQgPSBvbk1ldGFEYXRhLmF1ZGlvY2hhbm5lbHNcbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChvbk1ldGFEYXRhLmF1ZGlvc2FtcGxlcmF0ZSkge1xuICAgICAgICBjYXNlIDQ0MTAwOlxuICAgICAgICAgIG1ldGEuc2FtcGxlUmF0ZUluZGV4ID0gNFxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjIwNTA6XG4gICAgICAgICAgbWV0YS5zYW1wbGVSYXRlSW5kZXggPSA3XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAxMTAyNTpcbiAgICAgICAgICBtZXRhLnNhbXBsZVJhdGVJbmRleCA9IDEwXG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHZpZGVvVHJhY2sgJiYgIXZpZGVvVHJhY2suaGFzU3BlY2lmaWNDb25maWcpIHtcbiAgICAgIGxldCBtZXRhID0gdmlkZW9UcmFjay5tZXRhXG4gICAgICBpZiAodHlwZW9mIG9uTWV0YURhdGEuZnJhbWVyYXRlID09PSAnbnVtYmVyJykge1xuICAgICAgICBsZXQgZnBzTnVtID0gTWF0aC5mbG9vcihvbk1ldGFEYXRhLmZyYW1lcmF0ZSAqIDEwMDApXG4gICAgICAgIGlmIChmcHNOdW0gPiAwKSB7XG4gICAgICAgICAgbGV0IGZwcyA9IGZwc051bSAvIDEwMDBcbiAgICAgICAgICBpZiAoIW1ldGEuZnJhbWVSYXRlKSB7XG4gICAgICAgICAgICBtZXRhLmZyYW1lUmF0ZSA9IHt9XG4gICAgICAgICAgfVxuICAgICAgICAgIG1ldGEuZnJhbWVSYXRlLmZpeGVkID0gdHJ1ZVxuICAgICAgICAgIG1ldGEuZnJhbWVSYXRlLmZwcyA9IGZwc1xuICAgICAgICAgIG1ldGEuZnJhbWVSYXRlLmZwc19udW0gPSBmcHNOdW1cbiAgICAgICAgICBtZXRhLmZyYW1lUmF0ZS5mcHNfZGVuID0gMTAwMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2FhY1NlcXVlbmNlSGVhZGVyUGFyc2VyIChkYXRhKSB7XG4gICAgbGV0IHJldCA9IHt9XG4gICAgcmV0Lmhhc1NwZWNpZmljQ29uZmlnID0gdHJ1ZVxuICAgIHJldC5vYmplY3RUeXBlID0gZGF0YVsxXSA+Pj4gM1xuICAgIHJldC5vcmlnaW5PYmplY3RUeXBlID0gcmV0Lm9iamVjdFR5cGVcbiAgICByZXQuc2FtcGxlUmF0ZUluZGV4ID0gKChkYXRhWzFdICYgNykgPDwgMSkgfCAoZGF0YVsyXSA+Pj4gNylcbiAgICByZXQuYXVkaW9zYW1wbGVyYXRlID0gdGhpcy5fc3dpdGNoQXVkaW9TYW1wbGVSYXRlKHJldC5zYW1wbGVSYXRlSW5kZXgpXG4gICAgcmV0LmNoYW5uZWxDb3VudCA9IChkYXRhWzJdICYgMTIwKSA+Pj4gM1xuICAgIHJldC5mcmFtZUxlbmd0aCA9IChkYXRhWzJdICYgNCkgPj4+IDJcbiAgICByZXQuZGVwZW5kc09uQ29yZUNvZGVyID0gKGRhdGFbMl0gJiAyKSA+Pj4gMVxuICAgIHJldC5leHRlbnNpb25GbGFnSW5kZXggPSBkYXRhWzJdICYgMVxuXG4gICAgcmV0LmNvZGVjID0gYG1wNGEuNDAuJHtyZXQub2JqZWN0VHlwZX1gXG4gICAgbGV0IHVzZXJBZ2VudCA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgbGV0IGV4dGVuc2lvblNhbXBsaW5nSW5kZXg7XG5cbiAgICBsZXQgY29uZmlnO1xuICAgIGxldCBzYW1wbGluZ0luZGV4ID0gcmV0LnNhbXBsZVJhdGVJbmRleDtcblxuICAgIGlmICh1c2VyQWdlbnQuaW5kZXhPZignZmlyZWZveCcpICE9PSAtMSkge1xuICAgICAgLy8gZmlyZWZveDogdXNlIFNCUiAoSEUtQUFDKSBpZiBmcmVxIGxlc3MgdGhhbiAyNGtIelxuICAgICAgaWYgKHJldC5zYW1wbGVSYXRlSW5kZXggPj0gNikge1xuICAgICAgICByZXQub2JqZWN0VHlwZSA9IDU7XG4gICAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSg0KTtcbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCA9IHNhbXBsaW5nSW5kZXggLSAzO1xuICAgICAgfSBlbHNlIHsgLy8gdXNlIExDLUFBQ1xuICAgICAgICByZXQub2JqZWN0VHlwZSA9IDI7XG4gICAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSgyKTtcbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCA9IHNhbXBsaW5nSW5kZXg7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh1c2VyQWdlbnQuaW5kZXhPZignYW5kcm9pZCcpICE9PSAtMSB8fCBzbmlmZmVyLmJyb3dzZXIgPT09ICdzYWZhcmknKSB7XG4gICAgICAvLyBhbmRyb2lkOiBhbHdheXMgdXNlIExDLUFBQ1xuICAgICAgcmV0Lm9iamVjdFR5cGUgPSAyO1xuICAgICAgY29uZmlnID0gbmV3IEFycmF5KDIpO1xuICAgICAgZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCA9IHNhbXBsaW5nSW5kZXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGZvciBvdGhlciBicm93c2VycywgZS5nLiBjaHJvbWUuLi5cbiAgICAgIC8vIEFsd2F5cyB1c2UgSEUtQUFDIHRvIG1ha2UgaXQgZWFzaWVyIHRvIHN3aXRjaCBhYWMgY29kZWMgcHJvZmlsZVxuICAgICAgcmV0Lm9iamVjdFR5cGUgPSA1O1xuICAgICAgZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCA9IHJldC5zYW1wbGVSYXRlSW5kZXg7XG4gICAgICBjb25maWcgPSBuZXcgQXJyYXkoNCk7XG5cbiAgICAgIGlmIChyZXQuc2FtcGxlUmF0ZUluZGV4ID49IDYpIHtcbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCA9IHJldC5zYW1wbGVSYXRlSW5kZXggLSAzO1xuICAgICAgfSBlbHNlIGlmIChyZXQuY2hhbm5lbENvdW50ID09PSAxKSB7IC8vIE1vbm8gY2hhbm5lbFxuICAgICAgICByZXQub2JqZWN0VHlwZSA9IDI7XG4gICAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSgyKTtcbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCA9IHJldC5zYW1wbGVSYXRlSW5kZXg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uZmlnWzBdID0gcmV0Lm9iamVjdFR5cGUgPDwgMztcbiAgICBjb25maWdbMF0gfD0gKHJldC5zYW1wbGVSYXRlSW5kZXggJiAweDBGKSA+Pj4gMTtcbiAgICBjb25maWdbMV0gPSAocmV0LnNhbXBsZVJhdGVJbmRleCAmIDB4MEYpIDw8IDc7XG4gICAgY29uZmlnWzFdIHw9IChyZXQuY2hhbm5lbENvdW50ICYgMHgwRikgPDwgMztcbiAgICBpZiAocmV0Lm9iamVjdFR5cGUgPT09IDUpIHtcbiAgICAgIGNvbmZpZ1sxXSB8PSAoKGV4dGVuc2lvblNhbXBsaW5nSW5kZXggJiAweDBGKSA+Pj4gMSk7XG4gICAgICBjb25maWdbMl0gPSAoZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCAmIDB4MDEpIDw8IDc7XG4gICAgICAvLyBleHRlbmRlZCBhdWRpbyBvYmplY3QgdHlwZTogZm9yY2UgdG8gMiAoTEMtQUFDKVxuICAgICAgY29uZmlnWzJdIHw9ICgyIDw8IDIpO1xuICAgICAgY29uZmlnWzNdID0gMDtcbiAgICB9XG4gICAgcmV0LmNvbmZpZyA9IGNvbmZpZ1xuICAgIHJldHVybiByZXRcbiAgfVxuXG4gIF9wYXJzZUFBQ0RhdGEgKGNodW5rKSB7XG4gICAgbGV0IHRyYWNrID0gdGhpcy50cmFja3MuYXVkaW9UcmFja1xuICAgIGlmICghdHJhY2spIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBtZXRhID0gdHJhY2subWV0YVxuXG4gICAgaWYgKCFtZXRhKSB7XG4gICAgICB0cmFjay5tZXRhID0gbmV3IEF1ZGlvVHJhY2tNZXRhKClcbiAgICAgIG1ldGEgPSB0cmFjay5tZXRhO1xuICAgIH1cblxuICAgIGxldCBpbmZvID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMSlbMF1cblxuICAgIGNodW5rLmRhdGEgPSB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdChjaHVuay5kYXRhc2l6ZSAtIDEpXG5cbiAgICBsZXQgZm9ybWF0ID0gKGluZm8gJiAyNDApID4+PiA0XG5cbiAgICB0cmFjay5mb3JtYXQgPSBmb3JtYXRcblxuICAgIGlmIChmb3JtYXQgIT09IDEwKSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCBuZXcgRXJyb3IoYGludmFsaWQgYXVkaW8gZm9ybWF0OiAke2Zvcm1hdH1gKSlcbiAgICB9XG5cbiAgICBpZiAoZm9ybWF0ID09PSAxMCAmJiAhdGhpcy5faGFzQXVkaW9TZXF1ZW5jZSkge1xuICAgICAgbWV0YS5zYW1wbGVSYXRlID0gdGhpcy5fc3dpdGNoQXVkaW9TYW1wbGluZ0ZyZXF1ZW5jeShpbmZvKVxuICAgICAgbWV0YS5zYW1wbGVSYXRlSW5kZXggPSAoaW5mbyAmIDEyKSA+Pj4gMlxuICAgICAgbWV0YS5mcmFtZUxlbnRoID0gKGluZm8gJiAyKSA+Pj4gMVxuICAgICAgbWV0YS5jaGFubmVsQ291bnQgPSBpbmZvICYgMVxuICAgICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA9IE1hdGguZmxvb3IoMTAyNCAvIG1ldGEuYXVkaW9TYW1wbGVSYXRlICogbWV0YS50aW1lc2NhbGUpXG4gICAgfVxuXG4gICAgbGV0IGF1ZGlvU2FtcGxlUmF0ZSA9IG1ldGEuYXVkaW9TYW1wbGVSYXRlXG4gICAgbGV0IGF1ZGlvU2FtcGxlUmF0ZUluZGV4ID0gbWV0YS5zYW1wbGVSYXRlSW5kZXhcbiAgICBsZXQgcmVmU2FtcGxlRHVyYXRpb24gPSBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG5cbiAgICBkZWxldGUgY2h1bmsudGFnVHlwZVxuICAgIGxldCB2YWxpZGF0ZSA9IHRoaXMuX2RhdGFzaXplVmFsaWRhdG9yKGNodW5rLmRhdGFzaXplKVxuXG4gICAgaWYgKGNodW5rLmRhdGFbMF0gPT09IDApIHsgLy8gQUFDIFNlcXVlbmNlIEhlYWRlclxuICAgICAgbGV0IGFhY0hlYWRlciA9IHRoaXMuX2FhY1NlcXVlbmNlSGVhZGVyUGFyc2VyKGNodW5rLmRhdGEpXG4gICAgICBhdWRpb1NhbXBsZVJhdGUgPSBhYWNIZWFkZXIuYXVkaW9zYW1wbGVyYXRlIHx8IG1ldGEuYXVkaW9TYW1wbGVSYXRlXG4gICAgICBhdWRpb1NhbXBsZVJhdGVJbmRleCA9IGFhY0hlYWRlci5zYW1wbGVSYXRlSW5kZXggfHwgbWV0YS5zYW1wbGVSYXRlSW5kZXhcbiAgICAgIHJlZlNhbXBsZUR1cmF0aW9uID0gTWF0aC5mbG9vcigxMDI0IC8gYXVkaW9TYW1wbGVSYXRlICogbWV0YS50aW1lc2NhbGUpXG5cbiAgICAgIG1ldGEuY2hhbm5lbENvdW50ID0gYWFjSGVhZGVyLmNoYW5uZWxDb3VudFxuICAgICAgbWV0YS5zYW1wbGVSYXRlID0gYXVkaW9TYW1wbGVSYXRlXG4gICAgICBtZXRhLnNhbXBsZVJhdGVJbmRleCA9IGF1ZGlvU2FtcGxlUmF0ZUluZGV4XG4gICAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uID0gcmVmU2FtcGxlRHVyYXRpb25cbiAgICAgIG1ldGEuZHVyYXRpb24gPSB0aGlzLl9jb250ZXh0Lm1lZGlhSW5mby5kdXJhdGlvbiAqIG1ldGEudGltZXNjYWxlXG4gICAgICBtZXRhLmNvbmZpZyA9IGFhY0hlYWRlci5jb25maWdcbiAgICAgIG1ldGEub2JqZWN0VHlwZSA9IGFhY0hlYWRlci5vYmplY3RUeXBlO1xuICAgICAgbWV0YS5vcmlnaW5PYmplY3RUeXBlID0gYWFjSGVhZGVyLm9yaWdpbk9iamVjdFR5cGU7XG5cbiAgICAgIGNvbnN0IGF1ZGlvTWVkaWEgPSB0aGlzLl9jb250ZXh0Lm1lZGlhSW5mby5hdWRpb1xuXG4gICAgICAvLyBmaWxsIGF1ZGlvIG1lZGlhIGluZm9cbiAgICAgIGF1ZGlvTWVkaWEuY29kZWMgPSBhYWNIZWFkZXIuY29kZWNcbiAgICAgIGF1ZGlvTWVkaWEuY2hhbm5lbENvdW50ID0gYWFjSGVhZGVyLmNoYW5uZWxDb3VudFxuICAgICAgYXVkaW9NZWRpYS5zYW1wbGVSYXRlID0gYXVkaW9TYW1wbGVSYXRlXG4gICAgICBhdWRpb01lZGlhLnNhbXBsZVJhdGVJbmRleCA9IGFhY0hlYWRlci5hdWRpb1NhbXBsZVJhdGVJbmRleFxuXG4gICAgICBpZiAodGhpcy5faGFzU2NyaXB0ICYmICF0aGlzLl9oYXNBdWRpb1NlcXVlbmNlKSB7XG4gICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAnYXVkaW8nKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9oYXNTY3JpcHQgJiYgdGhpcy5faGFzQXVkaW9TZXF1ZW5jZSkge1xuICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgJ2F1ZGlvJylcbiAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5BVURJT19NRVRBREFUQV9DSEFOR0UpXG4gICAgICAgIC8vIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAnYXVkaW8nKVxuICAgICAgfVxuICAgICAgdGhpcy5faGFzQXVkaW9TZXF1ZW5jZSA9IHRydWVcblxuICAgICAgdGhpcy5fbWV0YUNoYW5nZSA9IHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX21ldGFDaGFuZ2UpIHtcbiAgICAgICAgY2h1bmsub3B0aW9ucyA9IHtcbiAgICAgICAgICBtZXRhOiB0cmFjay5tZXRhXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX21ldGFDaGFuZ2UgPSBmYWxzZVxuICAgICAgfVxuXG4gICAgICBjaHVuay5kYXRhID0gY2h1bmsuZGF0YS5zbGljZSgxLCBjaHVuay5kYXRhLmxlbmd0aClcbiAgICAgIHRyYWNrLnNhbXBsZXMucHVzaChjaHVuaylcbiAgICB9XG4gICAgaWYgKCF2YWxpZGF0ZSkge1xuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgdGhpcy5UQUcsIG5ldyBFcnJvcignVEFHIGxlbmd0aCBlcnJvciBhdCAnICsgY2h1bmsuZGF0YXNpemUpLCBmYWxzZSlcbiAgICAgIC8vIHRoaXMubG9nZ2VyLndhcm4odGhpcy5UQUcsIGVycm9yLm1lc3NhZ2UpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHBhcnNlIGhldmMvYXZjIHZpZGVvIGRhdGFcbiAgICogQHBhcmFtIGNodW5rXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcGFyc2VIZXZjRGF0YSAoY2h1bmspIHtcbiAgICAvLyBoZWFkZXJcbiAgICBsZXQgaW5mbyA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDEpWzBdXG4gICAgY2h1bmsuZnJhbWVUeXBlID0gKGluZm8gJiAweGYwKSA+Pj4gNFxuICAgIGNodW5rLmlzS2V5ZnJhbWUgPSBjaHVuay5mcmFtZVR5cGUgPT09IDFcbiAgICAvLyBsZXQgdGVtcENvZGVjSUQgPSB0aGlzLnRyYWNrcy52aWRlb1RyYWNrLmNvZGVjSURcbiAgICBsZXQgY29kZWNJRCA9IGluZm8gJiAweDBmXG4gICAgdGhpcy50cmFja3MudmlkZW9UcmFjay5jb2RlY0lEID0gY29kZWNJRFxuXG4gICAgLy8gaGV2Y+WSjGF2Y+eahGhlYWRlcuino+aekOaWueW8j+S4gOagt1xuICAgIGNodW5rLmF2Y1BhY2tldFR5cGUgPSB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgxKVswXVxuICAgIGNodW5rLmN0cyA9IHRoaXMubG9hZGVyQnVmZmVyLnRvSW50KDAsIDMpXG4gICAgdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMylcblxuICAgIC8vIDEyIGZvciBoZXZjLCA3IGZvciBhdmNcbiAgICBpZiAoY29kZWNJRCA9PT0gMTIpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdChjaHVuay5kYXRhc2l6ZSAtIDUpXG4gICAgICBjaHVuay5kYXRhID0gZGF0YVxuXG4gICAgICBpZiAoTnVtYmVyLnBhcnNlSW50KGNodW5rLmF2Y1BhY2tldFR5cGUpICE9PSAwKSB7XG4gICAgICAgIGlmICghdGhpcy5fZGF0YXNpemVWYWxpZGF0b3IoY2h1bmsuZGF0YXNpemUpKSB7XG4gICAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgdGhpcy5UQUcsIG5ldyBFcnJvcihgaW52YWxpZCB2aWRlbyB0YWcgZGF0YXNpemU6ICR7Y2h1bmsuZGF0YXNpemV9YCksIGZhbHNlKVxuICAgICAgICB9XG4gICAgICAgIGxldCBuYWx1ID0ge31cbiAgICAgICAgbGV0IHIgPSAwXG4gICAgICAgIG5hbHUuY3RzID0gY2h1bmsuY3RzXG4gICAgICAgIG5hbHUuZHRzID0gY2h1bmsuZHRzXG4gICAgICAgIHdoaWxlIChjaHVuay5kYXRhLmxlbmd0aCA+IHIpIHtcbiAgICAgICAgICBsZXQgc2l6ZXMgPSBjaHVuay5kYXRhLnNsaWNlKE51bWJlci5wYXJzZUludChyKSwgNCArIHIpXG4gICAgICAgICAgbmFsdS5zaXplID0gc2l6ZXNbM11cbiAgICAgICAgICBuYWx1LnNpemUgKz0gc2l6ZXNbMl0gKiAyNTZcbiAgICAgICAgICBuYWx1LnNpemUgKz0gc2l6ZXNbMV0gKiAyNTYgKiAyNTZcbiAgICAgICAgICBuYWx1LnNpemUgKz0gc2l6ZXNbMF0gKiAyNTYgKiAyNTYgKiAyNTZcbiAgICAgICAgICByICs9IDRcbiAgICAgICAgICBuYWx1LmRhdGEgPSBjaHVuay5kYXRhLnNsaWNlKE51bWJlci5wYXJzZUludChyKSwgbmFsdS5zaXplICsgcilcbiAgICAgICAgICByICs9IG5hbHUuc2l6ZVxuICAgICAgICAgIHRoaXMudHJhY2tzLnZpZGVvVHJhY2suc2FtcGxlcy5wdXNoKG5hbHUpXG4gICAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICd2aWRlbycpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoTnVtYmVyLnBhcnNlSW50KGNodW5rLmF2Y1BhY2tldFR5cGUpID09PSAwKSB7XG4gICAgICAgIGlmICghdGhpcy5fZGF0YXNpemVWYWxpZGF0b3IoY2h1bmsuZGF0YXNpemUpKSB7XG4gICAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgdGhpcy5UQUcsIG5ldyBFcnJvcihgaW52YWxpZCB2aWRlbyB0YWcgZGF0YXNpemU6ICR7Y2h1bmsuZGF0YXNpemV9YCksIGZhbHNlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAndmlkZW8nKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjb2RlY0lEID09PSA3KSB7XG4gICAgICBsZXQgZGF0YSA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KGNodW5rLmRhdGFzaXplIC0gNSlcbiAgICAgIGlmIChkYXRhWzRdID09PSAwICYmIGRhdGFbNV0gPT09IDAgJiYgZGF0YVs2XSA9PT0gMCAmJiBkYXRhWzddID09PSAxKSB7XG4gICAgICAgIGxldCBhdmNjbGVuZ3RoID0gMFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgIGF2Y2NsZW5ndGggPSBhdmNjbGVuZ3RoICogMjU2ICsgZGF0YVtpXVxuICAgICAgICB9XG4gICAgICAgIGF2Y2NsZW5ndGggLT0gNFxuICAgICAgICBkYXRhID0gZGF0YS5zbGljZSg0LCBkYXRhLmxlbmd0aClcbiAgICAgICAgZGF0YVszXSA9IGF2Y2NsZW5ndGggJSAyNTZcbiAgICAgICAgYXZjY2xlbmd0aCA9IChhdmNjbGVuZ3RoIC0gZGF0YVszXSkgLyAyNTZcbiAgICAgICAgZGF0YVsyXSA9IGF2Y2NsZW5ndGggJSAyNTZcbiAgICAgICAgYXZjY2xlbmd0aCA9IChhdmNjbGVuZ3RoIC0gZGF0YVsyXSkgLyAyNTZcbiAgICAgICAgZGF0YVsxXSA9IGF2Y2NsZW5ndGggJSAyNTZcbiAgICAgICAgZGF0YVswXSA9IChhdmNjbGVuZ3RoIC0gZGF0YVsxXSkgLyAyNTZcbiAgICAgIH1cblxuICAgICAgY2h1bmsuZGF0YSA9IGRhdGFcbiAgICAgIC8vIElmIGl0IGlzIEFWQyBzZXF1ZWNlIEhlYWRlci5cbiAgICAgIGlmIChjaHVuay5hdmNQYWNrZXRUeXBlID09PSAwKSB7XG4gICAgICAgIHRoaXMuX2F2Y1NlcXVlbmNlSGVhZGVyUGFyc2VyKGNodW5rLmRhdGEpXG4gICAgICAgIGxldCB2YWxpZGF0ZSA9IHRoaXMuX2RhdGFzaXplVmFsaWRhdG9yKGNodW5rLmRhdGFzaXplKVxuICAgICAgICBpZiAodmFsaWRhdGUpIHtcbiAgICAgICAgICBpZiAodGhpcy5faGFzU2NyaXB0ICYmICF0aGlzLl9oYXNWaWRlb1NlcXVlbmNlKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgJ3ZpZGVvJylcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2hhc1NjcmlwdCAmJiB0aGlzLl9oYXNWaWRlb1NlcXVlbmNlKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgJ2F1ZGlvJylcbiAgICAgICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuVklERU9fTUVUQURBVEFfQ0hBTkdFKVxuICAgICAgICAgICAgLy8gdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICd2aWRlbycpXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX2hhc1ZpZGVvU2VxdWVuY2UgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWV0YUNoYW5nZSA9IHRydWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghdGhpcy5fZGF0YXNpemVWYWxpZGF0b3IoY2h1bmsuZGF0YXNpemUpKSB7XG4gICAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgdGhpcy5UQUcsIG5ldyBFcnJvcihgaW52YWxpZCB2aWRlbyB0YWcgZGF0YXNpemU6ICR7Y2h1bmsuZGF0YXNpemV9YCksIGZhbHNlKVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fbWV0YUNoYW5nZSkge1xuICAgICAgICAgIGNodW5rLm9wdGlvbnMgPSB7XG4gICAgICAgICAgICBtZXRhOiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnRyYWNrcy52aWRlb1RyYWNrLm1ldGEpXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX21ldGFDaGFuZ2UgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIHRoaXMudHJhY2tzLnZpZGVvVHJhY2suc2FtcGxlcy5wdXNoKGNodW5rKVxuICAgICAgICAvLyB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0NPTVBMRVRFKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLlRBRywgbmV3IEVycm9yKGB2aWRlbyBjb2RlaWQgaXMgJHtjb2RlY0lEfWApLCBmYWxzZSlcbiAgICAgIGNodW5rLmRhdGEgPSB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdChjaHVuay5kYXRhc2l6ZSAtIDEpXG4gICAgICBpZiAoIXRoaXMuX2RhdGFzaXplVmFsaWRhdG9yKGNodW5rLmRhdGFzaXplKSkge1xuICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLlRBRywgbmV3IEVycm9yKGBpbnZhbGlkIHZpZGVvIHRhZyBkYXRhc2l6ZTogJHtjaHVuay5kYXRhc2l6ZX1gKSwgZmFsc2UpXG4gICAgICB9XG4gICAgICB0aGlzLnRyYWNrcy52aWRlb1RyYWNrLnNhbXBsZXMucHVzaChjaHVuaylcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfQ09NUExFVEUpXG4gICAgfVxuICAgIGRlbGV0ZSBjaHVuay50YWdUeXBlXG4gIH1cblxuICAvKipcbiAgICogcGFyc2UgYXZjIG1ldGFkYXRhXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfYXZjU2VxdWVuY2VIZWFkZXJQYXJzZXIgKGRhdGEpIHtcbiAgICBsZXQgdHJhY2sgPSB0aGlzLnRyYWNrcy52aWRlb1RyYWNrXG5cbiAgICBpZiAoIXRyYWNrKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgb2Zmc2V0ID0gMFxuXG4gICAgaWYgKCF0cmFjay5tZXRhKSB7XG4gICAgICB0cmFjay5tZXRhID0gbmV3IFZpZGVvVHJhY2tNZXRhKClcbiAgICB9XG4gICAgbGV0IG1ldGEgPSB0cmFjay5tZXRhXG5cbiAgICBtZXRhLmNvbmZpZ3VyYXRpb25WZXJzaW9uID0gZGF0YVswXVxuICAgIG1ldGEuYXZjUHJvZmlsZUluZGljYXRpb24gPSBkYXRhWzFdXG4gICAgbWV0YS5wcm9maWxlQ29tcGF0aWJpbGl0eSA9IGRhdGFbMl1cbiAgICBtZXRhLmF2Y0xldmVsSW5kaWNhdGlvbiA9IGRhdGFbM10gLyAxMFxuICAgIG1ldGEubmFsVW5pdExlbmd0aCA9IChkYXRhWzRdICYgMHgwMykgKyAxXG5cbiAgICBsZXQgbnVtT2ZTcHMgPSBkYXRhWzVdICYgMHgxZlxuICAgIG9mZnNldCA9IDZcbiAgICBsZXQgY29uZmlnID0ge31cblxuICAgIC8vIHBhcnNlIFNQU1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtT2ZTcHM7IGkrKykge1xuICAgICAgbGV0IHNpemUgPSBkYXRhW29mZnNldF0gKiAyNTUgKyBkYXRhW29mZnNldCArIDFdXG4gICAgICBvZmZzZXQgKz0gMlxuXG4gICAgICBsZXQgc3BzID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSlcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgICAgIHNwc1tqXSA9IGRhdGFbb2Zmc2V0ICsgal1cbiAgICAgIH1cblxuICAgICAgLy8gY29kZWMgc3RyaW5nXG4gICAgICBsZXQgY29kZWNTdHJpbmcgPSAnYXZjMS4nXG4gICAgICBmb3IgKGxldCBqID0gMTsgaiA8IDQ7IGorKykge1xuICAgICAgICBsZXQgaCA9IHNwc1tqXS50b1N0cmluZygxNilcbiAgICAgICAgaWYgKGgubGVuZ3RoIDwgMikge1xuICAgICAgICAgIGggPSAnMCcgKyBoXG4gICAgICAgIH1cbiAgICAgICAgY29kZWNTdHJpbmcgKz0gaFxuICAgICAgfVxuXG4gICAgICBtZXRhLmNvZGVjID0gY29kZWNTdHJpbmdcblxuICAgICAgb2Zmc2V0ICs9IHNpemVcbiAgICAgIHRoaXMudHJhY2tzLnZpZGVvVHJhY2subWV0YS5zcHMgPSBzcHNcbiAgICAgIGNvbmZpZyA9IFNwc1BhcnNlci5wYXJzZVNQUyhzcHMpXG4gICAgfVxuXG4gICAgbGV0IG51bU9mUHBzID0gZGF0YVtvZmZzZXRdXG5cbiAgICBvZmZzZXQrK1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1PZlBwczsgaSsrKSB7XG4gICAgICBsZXQgc2l6ZSA9IGRhdGFbb2Zmc2V0XSAqIDI1NSArIGRhdGFbb2Zmc2V0ICsgMV1cbiAgICAgIG9mZnNldCArPSAyXG4gICAgICBsZXQgcHBzID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSlcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgICAgIHBwc1tqXSA9IGRhdGFbb2Zmc2V0ICsgal1cbiAgICAgIH1cbiAgICAgIG9mZnNldCArPSBzaXplXG4gICAgICB0aGlzLnRyYWNrcy52aWRlb1RyYWNrLm1ldGEucHBzID0gcHBzXG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbihtZXRhLCBTcHNQYXJzZXIudG9WaWRlb01ldGEoY29uZmlnKSlcblxuICAgIC8vIGZpbGwgdmlkZW8gbWVkaWEgaW5mb1xuICAgIGNvbnN0IHZpZGVvTWVkaWEgPSB0aGlzLl9jb250ZXh0Lm1lZGlhSW5mby52aWRlb1xuXG4gICAgdmlkZW9NZWRpYS5jb2RlYyA9IG1ldGEuY29kZWNcbiAgICB2aWRlb01lZGlhLnByb2ZpbGUgPSBtZXRhLnByb2ZpbGVcbiAgICB2aWRlb01lZGlhLmxldmVsID0gbWV0YS5sZXZlbFxuICAgIHZpZGVvTWVkaWEuY2hyb21hRm9ybWF0ID0gbWV0YS5jaHJvbWFGb3JtYXRcbiAgICB2aWRlb01lZGlhLmZyYW1lUmF0ZSA9IG1ldGEuZnJhbWVSYXRlXG4gICAgdmlkZW9NZWRpYS5wYXJSYXRpbyA9IG1ldGEucGFyUmF0aW9cbiAgICB2aWRlb01lZGlhLndpZHRoID0gdmlkZW9NZWRpYS53aWR0aCA9PT0gbWV0YS5wcmVzZW50V2lkdGggPyB2aWRlb01lZGlhLndpZHRoIDogbWV0YS5wcmVzZW50V2lkdGhcbiAgICB2aWRlb01lZGlhLmhlaWdodCA9IHZpZGVvTWVkaWEuaGVpZ2h0ID09PSBtZXRhLnByZXNlbnRIZWlnaHQgPyB2aWRlb01lZGlhLndpZHRoIDogbWV0YS5wcmVzZW50SGVpZ2h0XG5cbiAgICBtZXRhLmR1cmF0aW9uID0gdGhpcy5fY29udGV4dC5tZWRpYUluZm8uZHVyYXRpb24gKiBtZXRhLnRpbWVzY2FsZVxuICAgIG1ldGEuYXZjYyA9IG5ldyBVaW50OEFycmF5KGRhdGEubGVuZ3RoKVxuICAgIG1ldGEuYXZjYy5zZXQoZGF0YSlcbiAgICB0cmFjay5tZXRhID0gbWV0YVxuICB9XG5cbiAgLyoqXG4gICAqIGNob29zZSBhdWRpbyBzYW1wbGUgcmF0ZVxuICAgKiBAcGFyYW0gc2FtcGxpbmdGcmVxdWVuY3lJbmRleFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3N3aXRjaEF1ZGlvU2FtcGxlUmF0ZSAoc2FtcGxpbmdGcmVxdWVuY3lJbmRleCkge1xuICAgIGxldCBzYW1wbGluZ0ZyZXF1ZW5jeUxpc3QgPSBbOTYwMDAsIDg4MjAwLCA2NDAwMCwgNDgwMDAsIDQ0MTAwLCAzMjAwMCwgMjQwMDAsIDIyMDUwLCAxNjAwMCwgMTIwMDAsIDExMDI1LCA4MDAwLCA3MzUwXVxuICAgIHJldHVybiBzYW1wbGluZ0ZyZXF1ZW5jeUxpc3Rbc2FtcGxpbmdGcmVxdWVuY3lJbmRleF1cbiAgfVxuXG4gIC8qKlxuICAgKiBjaG9vc2UgYXVkaW8gc2FtcGxpbmcgZnJlcXVlbmNlXG4gICAqIEBwYXJhbSBpbmZvXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc3dpdGNoQXVkaW9TYW1wbGluZ0ZyZXF1ZW5jeSAoaW5mbykge1xuICAgIGxldCBzYW1wbGluZ0ZyZXF1ZW5jeUluZGV4ID0gKGluZm8gJiAxMikgPj4+IDJcbiAgICBsZXQgc2FtcGxpbmdGcmVxdWVuY3lMaXN0ID0gWzU1MDAsIDExMDI1LCAyMjA1MCwgNDQxMDAsIDQ4MDAwXVxuICAgIHJldHVybiBzYW1wbGluZ0ZyZXF1ZW5jeUxpc3Rbc2FtcGxpbmdGcmVxdWVuY3lJbmRleF1cbiAgfVxuXG4gIC8qKlxuICAgKiBjaG9vc2UgYXVkaW8gY2hhbm5lbCBjb3VudFxuICAgKiBAcGFyYW0gaW5mb1xuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3N3aXRjaEF1ZGlvQ2hhbm5lbCAoaW5mbykge1xuICAgIGxldCBzYW1wbGVUcmFja051bUluZGV4ID0gaW5mbyAmIDFcbiAgICBsZXQgc2FtcGxlVHJhY2tOdW1MaXN0ID0gWzEsIDJdXG4gICAgcmV0dXJuIHNhbXBsZVRyYWNrTnVtTGlzdFtzYW1wbGVUcmFja051bUluZGV4XVxuICB9XG5cbiAgLyoqXG4gICAqIGNoZWNrIGRhdGFzaXplIGlzIHZhbGlkIHVzZSA0IEJ5dGUgYWZ0ZXIgY3VycmVudCB0YWdcbiAgICogQHBhcmFtIGRhdGFzaXplXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2RhdGFzaXplVmFsaWRhdG9yIChkYXRhc2l6ZSkge1xuICAgIGxldCBkYXRhc2l6ZUNvbmZpcm0gPSB0aGlzLmxvYWRlckJ1ZmZlci50b0ludCgwLCA0KVxuICAgIHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDQpXG4gICAgcmV0dXJuIGRhdGFzaXplQ29uZmlybSA9PT0gZGF0YXNpemUgKyAxMVxuICB9XG5cbiAgZ2V0IGxvYWRlckJ1ZmZlciAoKSB7XG4gICAgY29uc3QgYnVmZmVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnTE9BREVSX0JVRkZFUicpXG4gICAgaWYgKGJ1ZmZlcikge1xuICAgICAgcmV0dXJuIGJ1ZmZlclxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCBuZXcgRXJyb3IoJ+aJvuS4jeWIsCBsb2FkZXJCdWZmZXIg5a6e5L6LJykpXG4gICAgfVxuICB9XG5cbiAgZ2V0IHRyYWNrcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpXG4gIH1cblxuICBnZXQgbG9nZ2VyICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnTE9HR0VSJylcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBGbHZEZW11eGVyXG4iLCIvKipcbiAqIFJlZmVyZW5jZTogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzgyMTYjc2VjdGlvbi00LjNcbiAqL1xuY2xhc3MgTTNVOFBhcnNlciB7XG4gIHN0YXRpYyBwYXJzZSAodGV4dCwgYmFzZXVybCA9ICcnKSB7XG4gICAgbGV0IHJldCA9IHtcbiAgICAgIGR1cmF0aW9uOiAwXG4gICAgfTtcbiAgICBpZiAoIXRleHQgfHwgIXRleHQuc3BsaXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHJlZnMgPSB0ZXh0LnNwbGl0KC9cXHJ8XFxuLyk7XG4gICAgcmVmcyA9IHJlZnMuZmlsdGVyKChyZWYpID0+IHtcbiAgICAgIHJldHVybiByZWY7XG4gICAgfSlcbiAgICBsZXQgcmVmID0gcmVmcy5zaGlmdCgpXG4gICAgaWYgKCFyZWYubWF0Y2goJyNFWFRNM1UnKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIG0zdTggZmlsZTogbm90IFwiI0VYVE0zVVwiYCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmVmID0gcmVmcy5zaGlmdCgpXG4gICAgd2hpbGUgKHJlZikge1xuICAgICAgbGV0IHJlZm0gPSByZWYubWF0Y2goLyMoLltBLVp8LV0qKTooLiopLyk7XG4gICAgICBsZXQgcmVmZCA9IHJlZi5tYXRjaCgvIyguW0EtWnwtXSopLyk7XG4gICAgICBpZiAocmVmZCAmJiByZWZtICYmIHJlZm0ubGVuZ3RoID4gMikge1xuICAgICAgICBzd2l0Y2ggKHJlZm1bMV0pIHtcbiAgICAgICAgICBjYXNlICdFWFQtWC1WRVJTSU9OJzpcbiAgICAgICAgICAgIHJldC52ZXJzaW9uID0gcGFyc2VJbnQocmVmbVsyXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdFWFQtWC1NRURJQS1TRVFVRU5DRSc6XG4gICAgICAgICAgICByZXQuc2VxdWVuY2UgPSBwYXJzZUludChyZWZtWzJdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ0VYVC1YLVRBUkdFVERVUkFUSU9OJzpcbiAgICAgICAgICAgIHJldC50YXJnZXRkdXJhdGlvbiA9IHBhcnNlRmxvYXQocmVmbVsyXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdFWFRJTkYnOlxuICAgICAgICAgICAgTTNVOFBhcnNlci5wYXJzZUZyYWcocmVmbSwgcmVmcywgcmV0LCBiYXNldXJsKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ0VYVC1YLUtFWSc6XG4gICAgICAgICAgICBNM1U4UGFyc2VyLnBhcnNlRGVjcnlwdChyZWZtWzJdLHJldCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0gaWYocmVmZCAmJiByZWZkLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgc3dpdGNoKHJlZmRbMV0pIHtcbiAgICAgICAgICBjYXNlICdFWFQtWC1ESVNDT05USU5VSVRZJzpcbiAgICAgICAgICAgIHJlZiA9IHJlZnMuc2hpZnQoKTtcbiAgICAgICAgICAgIGxldCByZWZtID0gcmVmLm1hdGNoKC8jKC5bQS1afC1dKik6KC4qKS8pO1xuICAgICAgICAgICAgaWYocmVmbS5sZW5ndGggPjIgJiYgcmVmbVsxXSA9PT0gJ0VYVElORicpIHtcbiAgICAgICAgICAgICAgTTNVOFBhcnNlci5wYXJzZUZyYWcocmVmbSwgcmVmcywgcmV0LCBiYXNldXJsLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVmID0gcmVmcy5zaGlmdCgpXG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBzdGF0aWMgcGFyc2VGcmFnIChyZWZtLCByZWZzLCByZXQsIGJhc2V1cmwsIGRpc2NvbnRpbnVlKSB7XG4gICAgaWYgKCFyZXQuZnJhZ3MpIHtcbiAgICAgIHJldC5mcmFncyA9IFtdXG4gICAgfVxuXG4gICAgbGV0IGZyZWcgPSB7XG4gICAgICBzdGFydDogcmV0LmR1cmF0aW9uLFxuICAgICAgZHVyYXRpb246IHBhcnNlRmxvYXQocmVmbVsyXSkgKiAxMDAwXG4gICAgfVxuXG4gICAgcmV0LmR1cmF0aW9uICs9IGZyZWcuZHVyYXRpb247XG4gICAgbGV0IG5leHRsaW5lID0gcmVmcy5zaGlmdCgpO1xuICAgIGlmIChuZXh0bGluZS5tYXRjaCgvIyguKik6KC4qKS8pKSB7XG4gICAgICBuZXh0bGluZSA9IHJlZnMuc2hpZnQoKTtcbiAgICB9XG4gICAgaWYgKG5leHRsaW5lLmxlbmd0aCA+IDAgJiYgbmV4dGxpbmUuY2hhckF0KDApID09PSAnLycgJiYgYmFzZXVybC5tYXRjaCgvLipcXC9cXC8uKlxcLlxcdysvZykpIHtcbiAgICAgIGJhc2V1cmwgPSBiYXNldXJsLm1hdGNoKC8uKlxcL1xcLy4qXFwuXFx3Ky9nKVswXTtcbiAgICB9XG4gICAgaWYgKG5leHRsaW5lLm1hdGNoKC8uKjpcXC9cXC8uKi8pKSB7XG4gICAgICBmcmVnLnVybCA9IG5leHRsaW5lO1xuICAgIH0gZWxzZSB7XG4gICAgICBmcmVnLnVybCA9IGJhc2V1cmwgKyBuZXh0bGluZTtcbiAgICB9XG4gICAgZnJlZy5kaXNjb250aW51ZSA9IGRpc2NvbnRpbnVlO1xuICAgIHJldC5mcmFncy5wdXNoKGZyZWcpO1xuICB9XG5cbiAgc3RhdGljIHBhcnNlVVJMICh1cmwpIHtcbiAgICBsZXQgYmFzZXVybCA9ICcnO1xuICAgIGxldCB1cmxzID0gdXJsLm1hdGNoKC8oLipcXC8pLipcXC5tM3U4Lyk7XG4gICAgaWYgKHVybHMgJiYgdXJscy5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHVybHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHVybHNbaV0ubWF0Y2goLy4qXFwvJC9nKSAmJiB1cmxzW2ldLmxlbmd0aCA+IGJhc2V1cmwubGVuZ3RoKSB7XG4gICAgICAgICAgYmFzZXVybCA9IHVybHNbaV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGJhc2V1cmw7XG4gIH1cblxuICBzdGF0aWMgcGFyc2VEZWNyeXB0KHJlZm0sIHJldCkge1xuICAgIHJldC5lbmNyeXB0ID0ge307XG4gICAgbGV0IHJlZnMgPSByZWZtLnNwbGl0KCcsJyk7XG4gICAgZm9yIChsZXQgaSBpbiByZWZzKSB7IFxuICAgICAgbGV0IGNtZCA9IHJlZnNbaV07XG4gICAgICBpZihjbWQubWF0Y2goL01FVEhPRD0oLiopLykpIHtcbiAgICAgICAgcmV0LmVuY3J5cHQubWV0aG9kID0gY21kLm1hdGNoKC9NRVRIT0Q9KC4qKS8pWzFdO1xuICAgICAgfVxuICAgICAgaWYoY21kLm1hdGNoKC9VUkk9XCIoLiopXCIvKSkge1xuICAgICAgICByZXQuZW5jcnlwdC51cmkgPSBjbWQubWF0Y2goL1VSST1cIiguKilcIi8pWzFdO1xuICAgICAgfVxuXG4gICAgICBpZihjbWQubWF0Y2goL0lWPTB4KC4qKS8pKSB7XG4gICAgICAgIGxldCBpdiA9IGNtZC5tYXRjaCgvSVY9MHgoLiopLylbMV07XG4gICAgICAgIGxldCBsZW5ndGggPSBNYXRoLmNlaWwoaXYubGVuZ3RoIC8gMik7XG4gICAgICAgIHJldC5lbmNyeXB0Lml2YiA9IG5ldyBVaW50OEFycmF5KGxlbmd0aCk7XG4gICAgICAgIGZvcihsZXQgaSA9IGxlbmd0aCAtIDE7IGkgPj0wOyBpLS0pIHtcbiAgICAgICAgICBsZXQgaW0gPSBwYXJzZUludChpdi5zdWJzdHIoaSAqIDIsIDIpLCAxNik7XG4gICAgICAgICAgcmV0LmVuY3J5cHQuaXZiW2ldID0gaW07XG4gICAgICAgIH0gXG4gICAgICAgIHJldC5lbmNyeXB0Lml2ID0gaXY7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNM1U4UGFyc2VyO1xuIiwiaW1wb3J0IHsgTmFsdW5pdCB9IGZyb20gJ3hncGxheWVyLWNvZGVjJztcbmltcG9ydCB7IEF1ZGlvVHJhY2ssIFZpZGVvVHJhY2sgfSBmcm9tICd4Z3BsYXllci1idWZmZXInO1xuaW1wb3J0IHtcbiAgQXVkaW9UcmFja01ldGEsXG4gIFZpZGVvVHJhY2tNZXRhLFxuICBBdWRpb1RyYWNrU2FtcGxlLFxuICBWaWRlb1RyYWNrU2FtcGxlLFxuICBFVkVOVFMsXG4gIFN0cmVhbVxufSBmcm9tICd4Z3BsYXllci11dGlscyc7XG5cbmNvbnN0IERFTVVYX0VWRU5UUyA9IEVWRU5UUy5ERU1VWF9FVkVOVFM7XG5jb25zdCBTdHJlYW1UeXBlID0ge1xuICAweDAxOiBbJ3ZpZGVvJywgJ01QRUctMSddLFxuICAweDAyOiBbJ3ZpZGVvJywgJ01QRUctMiddLFxuICAweDFiOiBbJ3ZpZGVvJywgJ0FWQy5IMjY0J10sXG4gIDB4ZWE6IFsndmlkZW8nLCAnVkMtMSddLFxuICAweDAzOiBbJ2F1ZGlvJywgJ01QRUctMSddLFxuICAweDA0OiBbJ2F1ZGlvJywgJ01QRUctMiddLFxuICAweDBmOiBbJ2F1ZGlvJywgJ01QRUctMi5BQUMnXSxcbiAgMHgxMTogWydhdWRpbycsICdNUEVHLTQuQUFDJ10sXG4gIDB4ODA6IFsnYXVkaW8nLCAnTFBDTSddLFxuICAweDgxOiBbJ2F1ZGlvJywgJ0FDMyddLFxuICAweDA2OiBbJ2F1ZGlvJywgJ0FDMyddLFxuICAweDgyOiBbJ2F1ZGlvJywgJ0RUUyddLFxuICAweDgzOiBbJ2F1ZGlvJywgJ0RvbGJ5IFRydWVIRCddLFxuICAweDg0OiBbJ2F1ZGlvJywgJ0FDMy1QbHVzJ10sXG4gIDB4ODU6IFsnYXVkaW8nLCAnRFRTLUhEJ10sXG4gIDB4ODY6IFsnYXVkaW8nLCAnRFRTLU1BJ10sXG4gIDB4YTE6IFsnYXVkaW8nLCAnQUMzLVBsdXMtU0VDJ10sXG4gIDB4YTI6IFsnYXVkaW8nLCAnRFRTLUhELVNFQyddXG59O1xuXG5jbGFzcyBUc0RlbXV4ZXIge1xuICBjb25zdHJ1Y3RvciAoY29uZmlncykge1xuICAgIHRoaXMuY29uZmlncyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZ3MpO1xuICAgIHRoaXMuZGVtdXhpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnBhdCA9IFtdO1xuICAgIHRoaXMucG10ID0gW107XG4gICAgdGhpcy5faGFzVmlkZW9NZXRhID0gZmFsc2U7XG4gICAgdGhpcy5faGFzQXVkaW9NZXRhID0gZmFsc2U7XG4gIH1cblxuICBpbml0ICgpIHtcbiAgICB0aGlzLm9uKERFTVVYX0VWRU5UUy5ERU1VWF9TVEFSVCwgdGhpcy5kZW11eC5iaW5kKHRoaXMpKVxuICB9XG5cbiAgZGVtdXggKGZyYWcpIHtcbiAgICBpZiAodGhpcy5kZW11eGluZykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IGJ1ZmZlciA9IHRoaXMuaW5wdXRCdWZmZXI7XG4gICAgbGV0IGZyYWdzID0geyBwYXQ6IFtdLCBwbXQ6IFtdIH07XG4gICAgbGV0IHBlc2VzID0ge307XG5cbiAgICAvLyBSZWFkIFRTIHNlZ21lbnRcbiAgICB3aGlsZSAoYnVmZmVyLmxlbmd0aCA+PSAxODgpIHtcbiAgICAgIGlmIChidWZmZXIubGVuZ3RoID49IDEgJiYgYnVmZmVyLmFycmF5WzBdW2J1ZmZlci5vZmZzZXRdICE9PSA3MSkge1xuICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLlRBRywgbmV3IEVycm9yKGBVbnRydXN0IHN5bmMgY29kZTogJHtidWZmZXIuYXJyYXlbMF1bYnVmZmVyLm9mZnNldF19LCB0cnkgdG8gcmVjb3ZlcjtgKSwgZmFsc2UpO1xuICAgICAgfVxuICAgICAgd2hpbGUgKGJ1ZmZlci5sZW5ndGggPj0gMSAmJiBidWZmZXIuYXJyYXlbMF1bYnVmZmVyLm9mZnNldF0gIT09IDcxKSB7XG4gICAgICAgIGJ1ZmZlci5zaGlmdCgxKTtcbiAgICAgIH1cbiAgICAgIGxldCBidWYgPSBidWZmZXIuc2hpZnQoMTg4KTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGJ1Zik7XG4gICAgICBsZXQgdHNTdHJlYW0gPSBuZXcgU3RyZWFtKGJ1Zi5idWZmZXIpO1xuICAgICAgbGV0IHRzID0ge307XG4gICAgICBUc0RlbXV4ZXIucmVhZCh0c1N0cmVhbSwgdHMsIGZyYWdzKTtcbiAgICAgIGlmICh0cy5wZXMpIHtcbiAgICAgICAgaWYgKCFwZXNlc1t0cy5oZWFkZXIucGlkXSkge1xuICAgICAgICAgIHBlc2VzW3RzLmhlYWRlci5waWRdID0gW107XG4gICAgICAgIH1cbiAgICAgICAgcGVzZXNbdHMuaGVhZGVyLnBpZF0ucHVzaCh0cy5wZXMpO1xuICAgICAgICB0cy5wZXMuRVMuYnVmZmVyID0gW3RzLnBlcy5FUy5idWZmZXJdO1xuICAgICAgfSBlbHNlIGlmIChwZXNlc1t0cy5oZWFkZXIucGlkXSkge1xuICAgICAgICBwZXNlc1t0cy5oZWFkZXIucGlkXVtwZXNlc1t0cy5oZWFkZXIucGlkXS5sZW5ndGggLSAxXS5FUy5idWZmZXIucHVzaCh0cy5wYXlsb2FkLnN0cmVhbSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IEF1ZGlvT3B0aW9ucyA9IGZyYWc7XG4gICAgbGV0IFZpZGVvT3B0aW9ucyA9IGZyYWc7XG5cbiAgICAvLyBHZXQgRnJhbWVzIGRhdGFcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE9iamVjdC5rZXlzKHBlc2VzKS5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGVwZXNlcyA9IHBlc2VzW09iamVjdC5rZXlzKHBlc2VzKVtpXV07XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGVwZXNlcy5sZW5ndGg7IGorKykge1xuICAgICAgICBlcGVzZXNbal0uaWQgPSBPYmplY3Qua2V5cyhwZXNlcylbaV07XG4gICAgICAgIGVwZXNlc1tqXS5FUy5idWZmZXIgPSBUc0RlbXV4ZXIuTWVyZ2UoZXBlc2VzW2pdLkVTLmJ1ZmZlcik7XG4gICAgICAgIGlmIChlcGVzZXNbal0udHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgICAgIHRoaXMucHVzaEF1ZGlvU2FtcGxlKGVwZXNlc1tqXSwgQXVkaW9PcHRpb25zKTtcbiAgICAgICAgICBBdWRpb09wdGlvbnMgPSB7fTtcbiAgICAgICAgfSBlbHNlIGlmIChlcGVzZXNbal0udHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgIHRoaXMucHVzaFZpZGVvU2FtcGxlKGVwZXNlc1tqXSwgVmlkZW9PcHRpb25zKTtcbiAgICAgICAgICBWaWRlb09wdGlvbnMgPSB7fTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9oYXNBdWRpb01ldGEpIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfQ09NUExFVEUsICdhdWRpbycpO1xuICAgIH1cbiAgICBpZiAodGhpcy5faGFzVmlkZW9NZXRhKSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0NPTVBMRVRFLCAndmlkZW8nKTtcbiAgICB9XG4gIH1cblxuICBwdXNoQXVkaW9TYW1wbGUgKHBlcywgb3B0aW9ucykge1xuICAgIGxldCB0cmFjaztcbiAgICBpZiAoIXRoaXMuX3RyYWNrcy5hdWRpb1RyYWNrKSB7XG4gICAgICB0aGlzLl90cmFja3MuYXVkaW9UcmFjayA9IG5ldyBBdWRpb1RyYWNrKCk7XG4gICAgICB0cmFjayA9IHRoaXMuX3RyYWNrcy5hdWRpb1RyYWNrO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cmFjayA9IHRoaXMuX3RyYWNrcy5hdWRpb1RyYWNrO1xuICAgIH1cbiAgICBsZXQgbWV0YSA9IG5ldyBBdWRpb1RyYWNrTWV0YSh7XG4gICAgICBhdWRpb1NhbXBsZVJhdGU6IHBlcy5FUy5mcmVxdWVuY2UsXG4gICAgICBzYW1wbGVSYXRlOiBwZXMuRVMuZnJlcXVlbmNlLFxuICAgICAgY2hhbm5lbENvdW50OiBwZXMuRVMuY2hhbm5lbCxcbiAgICAgIGNvZGVjOiAnbXA0YS40MC4nICsgcGVzLkVTLmF1ZGlvT2JqZWN0VHlwZSxcbiAgICAgIGNvbmZpZzogcGVzLkVTLmF1ZGlvQ29uZmlnLFxuICAgICAgaWQ6IDIsXG4gICAgICBzYW1wbGVSYXRlSW5kZXg6IHBlcy5FUy5mcmVxdWVuY3lJbmRleFxuICAgIH0pO1xuICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb24gPSBNYXRoLmZsb29yKDEwMjQgLyBtZXRhLmF1ZGlvU2FtcGxlUmF0ZSAqIG1ldGEudGltZXNjYWxlKTtcblxuICAgIGxldCBtZXRhRXF1YWwgPSBUc0RlbXV4ZXIuY29tcGFpcmVNZXRhKHRyYWNrLm1ldGEsIG1ldGEsIHRydWUpO1xuXG4gICAgaWYgKCF0aGlzLl9oYXNBdWRpb01ldGEgfHwgIW1ldGFFcXVhbCkge1xuICAgICAgdHJhY2subWV0YSA9IG1ldGE7XG4gICAgICB0aGlzLl9oYXNBdWRpb01ldGEgPSB0cnVlXG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgJ2F1ZGlvJyk7XG4gICAgfVxuXG4gICAgbGV0IGRhdGEgPSBuZXcgVWludDhBcnJheShwZXMuRVMuYnVmZmVyLmJ1ZmZlci5zbGljZShwZXMuRVMuYnVmZmVyLnBvc2l0aW9uLCBwZXMuRVMuYnVmZmVyLmxlbmd0aCkpO1xuICAgIGxldCBkdHMgPSBwYXJzZUludChwZXMucHRzIC8gOTApO1xuICAgIGxldCBwdHMgPSBwYXJzZUludChwZXMucHRzIC8gOTApO1xuICAgIGxldCBzYW1wbGUgPSBuZXcgQXVkaW9UcmFja1NhbXBsZSh7ZHRzLCBwdHMsIGRhdGEsIG9wdGlvbnN9KTtcbiAgICB0cmFjay5zYW1wbGVzLnB1c2goc2FtcGxlKTtcbiAgfVxuXG4gIHB1c2hWaWRlb1NhbXBsZSAocGVzLCBvcHRpb25zKSB7XG4gICAgbGV0IG5hbHMgPSBOYWx1bml0LmdldE5hbHVuaXRzKHBlcy5FUy5idWZmZXIpO1xuICAgIGxldCB0cmFjaztcbiAgICBsZXQgbWV0YSA9IG5ldyBWaWRlb1RyYWNrTWV0YSgpO1xuICAgIGlmICghdGhpcy5fdHJhY2tzLnZpZGVvVHJhY2spIHtcbiAgICAgIHRoaXMuX3RyYWNrcy52aWRlb1RyYWNrID0gbmV3IFZpZGVvVHJhY2soKTtcbiAgICAgIHRyYWNrID0gdGhpcy5fdHJhY2tzLnZpZGVvVHJhY2s7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYWNrID0gdGhpcy5fdHJhY2tzLnZpZGVvVHJhY2s7XG4gICAgfVxuICAgIGxldCBzYW1wbGVMZW5ndGggPSAwO1xuICAgIGxldCBzcHMgPSBmYWxzZTtcbiAgICBsZXQgcHBzID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgbmFsID0gbmFsc1tpXTtcbiAgICAgIGlmIChuYWwuc3BzKSB7XG4gICAgICAgIHNwcyA9IG5hbDtcbiAgICAgICAgdHJhY2suc3BzID0gbmFsLmJvZHk7XG4gICAgICAgIG1ldGEuY2hyb21hRm9ybWF0ID0gc3BzLnNwcy5jaHJvbWFfZm9ybWF0XG4gICAgICAgIG1ldGEuY29kZWMgPSAnYXZjMS4nO1xuICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IDQ7IGorKykge1xuICAgICAgICAgIHZhciBoID0gc3BzLmJvZHlbal0udG9TdHJpbmcoMTYpO1xuICAgICAgICAgIGlmIChoLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIGggPSAnMCcgKyBoO1xuICAgICAgICAgIH1cbiAgICAgICAgICBtZXRhLmNvZGVjICs9IGg7XG4gICAgICAgIH1cbiAgICAgICAgbWV0YS5jb2RlY0hlaWdodCA9IHNwcy5zcHMuY29kZWNfc2l6ZS5oZWlnaHQ7XG4gICAgICAgIG1ldGEuY29kZWNXaWR0aCA9IHNwcy5zcHMuY29kZWNfc2l6ZS53aWR0aDtcbiAgICAgICAgbWV0YS5mcmFtZVJhdGUgPSBzcHMuc3BzLmZyYW1lX3JhdGU7XG4gICAgICAgIG1ldGEuaWQgPSAxO1xuICAgICAgICBtZXRhLmxldmVsID0gc3BzLnNwcy5sZXZlbF9zdHJpbmc7XG4gICAgICAgIG1ldGEucHJlc2VudEhlaWdodCA9IHNwcy5zcHMucHJlc2VudF9zaXplLmhlaWdodDtcbiAgICAgICAgbWV0YS5wcmVzZW50V2lkdGggPSBzcHMuc3BzLnByZXNlbnRfc2l6ZS53aWR0aDtcbiAgICAgICAgbWV0YS5wcm9maWxlID0gc3BzLnNwcy5wcm9maWxlX3N0cmluZztcbiAgICAgICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA9IE1hdGguZmxvb3IobWV0YS50aW1lc2NhbGUgKiAoc3BzLnNwcy5mcmFtZV9yYXRlLmZwc19kZW4gLyBzcHMuc3BzLmZyYW1lX3JhdGUuZnBzX251bSkpO1xuICAgICAgICBtZXRhLnNhclJhdGlvID0gc3BzLnNwcy5zYXJfcmF0aW8gPyBzcHMuc3BzLnNhcl9yYXRpbyA6IHNwcy5zcHMucGFyX3JhdGlvO1xuICAgICAgfSBlbHNlIGlmIChuYWwucHBzKSB7XG4gICAgICAgIHRyYWNrLnBwcyA9IG5hbC5ib2R5O1xuICAgICAgICBwcHMgPSBuYWw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzYW1wbGVMZW5ndGggKz0gKDQgKyBuYWwuYm9keS5ieXRlTGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3BzICYmIHBwcykge1xuICAgICAgbWV0YS5hdmNjID0gTmFsdW5pdC5nZXRBdmNjKHNwcy5ib2R5LCBwcHMuYm9keSk7XG4gICAgICBsZXQgbWV0YUVxdWFsID0gVHNEZW11eGVyLmNvbXBhaXJlTWV0YSh0cmFjay5tZXRhLCBtZXRhLCB0cnVlKTtcbiAgICAgIGlmICghdGhpcy5faGFzVmlkZW9NZXRhIHx8ICFtZXRhRXF1YWwpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICBvcHRpb25zLm1ldGEgPSBPYmplY3QuYXNzaWduKHt9LCBtZXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgbWV0YTogT2JqZWN0LmFzc2lnbih7fSwgbWV0YSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdHJhY2subWV0YSA9IG1ldGE7XG4gICAgICAgIHRoaXMuX2hhc1ZpZGVvTWV0YSA9IHRydWVcbiAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICd2aWRlbycpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBkYXRhID0gbmV3IFVpbnQ4QXJyYXkoc2FtcGxlTGVuZ3RoKTtcbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICBsZXQgaXNLZXlmcmFtZSA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmFscy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IG5hbCA9IG5hbHNbaV07XG4gICAgICBsZXQgbGVuZ3RoID0gbmFsLmJvZHkuYnl0ZUxlbmd0aDtcbiAgICAgIGlmIChuYWwuaWRyKSB7XG4gICAgICAgIGlzS2V5ZnJhbWUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKCFuYWwucHBzICYmICFuYWwuc3BzKSB7XG4gICAgICAgIGRhdGEuc2V0KG5ldyBVaW50OEFycmF5KFtsZW5ndGggPj4+IDI0ICYgMHhmZixcbiAgICAgICAgICBsZW5ndGggPj4+IDE2ICYgMHhmZixcbiAgICAgICAgICBsZW5ndGggPj4+IDggJiAweGZmLFxuICAgICAgICAgIGxlbmd0aCAmIDB4ZmZcbiAgICAgICAgXSksIG9mZnNldCk7XG4gICAgICAgIG9mZnNldCArPSA0O1xuICAgICAgICBkYXRhLnNldChuYWwuYm9keSwgb2Zmc2V0KTtcbiAgICAgICAgb2Zmc2V0ICs9IGxlbmd0aDtcbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IHNhbXBsZSA9IG5ldyBWaWRlb1RyYWNrU2FtcGxlKHtcbiAgICAgIGR0czogcGFyc2VJbnQocGVzLmR0cyAvIDkwKSxcbiAgICAgIHB0czogcGFyc2VJbnQocGVzLnB0cyAvIDkwKSxcbiAgICAgIGN0czogKHBlcy5wdHMgLSBwZXMuZHRzKSAvIDkwLFxuICAgICAgb3JpZ2luRHRzOiBwZXMuZHRzLFxuICAgICAgaXNLZXlmcmFtZSxcbiAgICAgIGRhdGEsXG4gICAgICBvcHRpb25zXG4gICAgfSlcbiAgICB0cmFjay5zYW1wbGVzLnB1c2goc2FtcGxlKTtcbiAgfVxuXG4gIGRlc3RvcnkgKCkge1xuICAgIHRoaXMub2ZmKERFTVVYX0VWRU5UUy5ERU1VWF9TVEFSVCwgdGhpcy5kZW11eCk7XG4gICAgdGhpcy5jb25maWdzID0ge307XG4gICAgdGhpcy5kZW11eGluZyA9IGZhbHNlO1xuICAgIHRoaXMucGF0ID0gW107XG4gICAgdGhpcy5wbXQgPSBbXTtcbiAgICB0aGlzLl9oYXNWaWRlb01ldGEgPSBmYWxzZTtcbiAgICB0aGlzLl9oYXNBdWRpb01ldGEgPSBmYWxzZTtcbiAgfVxuXG4gIHN0YXRpYyBjb21wYWlyZUFycmF5IChhLCBiLCB0eXBlKSB7XG4gICAgbGV0IGFsID0gMDtcbiAgICBsZXQgYmwgPSAwO1xuICAgIGlmICh0eXBlID09PSAnVWludDhBcnJheScpIHtcbiAgICAgIGFsID0gYS5ieXRlTGVuZ3RoO1xuICAgICAgYmwgPSBiLmJ5dGVMZW5ndGg7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnQXJyYXknKSB7XG4gICAgICBhbCA9IGEubGVuZ3RoO1xuICAgICAgYmwgPSBiLmxlbmd0aDtcbiAgICB9XG4gICAgaWYgKGFsICE9PSBibCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWw7IGkrKykge1xuICAgICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN0YXRpYyBjb21wYWlyZU1ldGEgKGEsIGIsIGlnbm9yZUR1cmF0aW9uKSB7XG4gICAgaWYgKCFhIHx8ICFiKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDAsIGsgPSBPYmplY3Qua2V5cyhhKS5sZW5ndGg7IGkgPCBrOyBpKyspIHtcbiAgICAgIGxldCBpdGVtYSA9IGFbT2JqZWN0LmtleXMoYSlbaV1dO1xuICAgICAgbGV0IGl0ZW1iID0gYltPYmplY3Qua2V5cyhhKVtpXV07XG4gICAgICBpZiAodHlwZW9mIGl0ZW1hICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAoKGlnbm9yZUR1cmF0aW9uICYmIE9iamVjdC5rZXlzKGEpW2ldICE9PSAnZHVyYXRpb24nICYmIE9iamVjdC5rZXlzKGEpW2ldICE9PSAncmVmU2FtcGxlRHVyYXRpb24nICYmIE9iamVjdC5rZXlzKGEpW2ldICE9PSAncmVmU2FtcGxlRHVyYXRpb25GaXhlZCcpICYmIGl0ZW1hICE9PSBpdGVtYikge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpdGVtYS5ieXRlTGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGl0ZW1iLmJ5dGVMZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIVRzRGVtdXhlci5jb21wYWlyZUFycmF5KGl0ZW1hLCBpdGVtYiwgJ1VpbnQ4QXJyYXknKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpdGVtYS5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoaXRlbWIubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFUc0RlbXV4ZXIuY29tcGFpcmVBcnJheShpdGVtYSwgaXRlbWIsICdBcnJheScpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIVRzRGVtdXhlci5jb21wYWlyZU1ldGEoaXRlbWEsIGl0ZW1iKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN0YXRpYyBNZXJnZSAoYnVmZmVycykge1xuICAgIGxldCBkYXRhO1xuICAgIGxldCBsZW5ndGggPSAwO1xuICAgIGxldCBvZmZzZXQgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnVmZmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgbGVuZ3RoICs9IChidWZmZXJzW2ldLmxlbmd0aCAtIGJ1ZmZlcnNbaV0ucG9zaXRpb24pO1xuICAgIH1cblxuICAgIGRhdGEgPSBuZXcgVWludDhBcnJheShsZW5ndGgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnVmZmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGJ1ZmZlciA9IGJ1ZmZlcnNbaV07XG4gICAgICBkYXRhLnNldChuZXcgVWludDhBcnJheShidWZmZXIuYnVmZmVyLCBidWZmZXIucG9zaXRpb24pLCBvZmZzZXQpO1xuICAgICAgb2Zmc2V0ICs9IGJ1ZmZlci5sZW5ndGggLSBidWZmZXIucG9zaXRpb247XG4gICAgfVxuICAgIHJldHVybiBuZXcgU3RyZWFtKGRhdGEuYnVmZmVyKTtcbiAgfVxuXG4gIHN0YXRpYyByZWFkIChzdHJlYW0sIHRzLCBmcmFncykge1xuICAgIFRzRGVtdXhlci5yZWFkSGVhZGVyKHN0cmVhbSwgdHMpO1xuICAgIFRzRGVtdXhlci5yZWFkUGF5bG9hZChzdHJlYW0sIHRzLCBmcmFncyk7XG4gICAgaWYgKHRzLmhlYWRlci5wYWNrZXQgPT09ICdNRURJQScgJiYgdHMuaGVhZGVyLnBheWxvYWQgPT09IDEgJiYgIXRzLnVua25vd25QSURzKSB7XG4gICAgICB0cy5wZXMgPSBUc0RlbXV4ZXIuUEVTKHRzKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgcmVhZFBheWxvYWQgKHN0cmVhbSwgdHMsIGZyYWdzKSB7XG4gICAgbGV0IGhlYWRlciA9IHRzLmhlYWRlclxuICAgIGxldCBwaWQgPSBoZWFkZXIucGlkO1xuICAgIHN3aXRjaCAocGlkKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIFRzRGVtdXhlci5QQVQoc3RyZWFtLCB0cywgZnJhZ3MpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgVHNEZW11eGVyLkNBVChzdHJlYW0sIHRzLCBmcmFncyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBUc0RlbXV4ZXIuVFNEVChzdHJlYW0sIHRzLCBmcmFncyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAweDFmZmY6XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gVE9ETzogc29tZeeahOWGmeazleS4jeWkquWlve+8jOW+l+aUuVxuICAgICAgICBpZiAoZnJhZ3MucGF0LnNvbWUoKGl0ZW0pID0+IHsgcmV0dXJuIGl0ZW0ucGlkID09PSBwaWQ7IH0pKSB7XG4gICAgICAgICAgVHNEZW11eGVyLlBNVChzdHJlYW0sIHRzLCBmcmFncyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IHN0cyA9IGZyYWdzLnBtdCA/IGZyYWdzLnBtdC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ucGlkID09PSBwaWQpIDogW107XG4gICAgICAgICAgaWYgKHN0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBUc0RlbXV4ZXIuTWVkaWEoc3RyZWFtLCB0cywgU3RyZWFtVHlwZVtzdHNbMF0uc3RyZWFtVHlwZV1bMF0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRzLnVua25vd25QSURzID0gdHJ1ZTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHJlYWRIZWFkZXIgKHN0cmVhbSwgdHMpIHtcbiAgICBsZXQgaGVhZGVyID0ge307XG4gICAgaGVhZGVyLnN5bmMgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgbGV0IG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgIGhlYWRlci5lcnJvciA9IG5leHQgPj4+IDE1O1xuICAgIGhlYWRlci5wYXlsb2FkID0gbmV4dCA+Pj4gMTQgJiAxO1xuICAgIGhlYWRlci5wcmlvcml0eSA9IG5leHQgPj4+IDEzICYgMTtcbiAgICBoZWFkZXIucGlkID0gbmV4dCAmIDB4MWZmZjtcblxuICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG5cbiAgICBoZWFkZXIuc2NyYW1ibGluZyA9IG5leHQgPj4gNiAmIDB4MzsgLy8g5piv5ZCm5Yqg5a+G77yMMDDooajnpLrkuI3liqDlr4ZcblxuICAgIC8qKlxuICAgICAqIDAwIElTTy9JRUPmnKrmnaXkvb/nlKjkv53nlZlcbiAgICAgKiAwMSDmsqHmnInosIPmlbTlrZfmrrXvvIzku4XlkKvmnIkxODRC5pyJ5pWI5YeA6I23XG4gICAgICogMDIg5rKh5pyJ5pyJ5pWI5YeA6I2377yM5LuF5ZCr5pyJMTgzQuiwg+aVtOWtl+autVxuICAgICAqIDAzIDB+MTgyQuiwg+aVtOWtl+auteWQjuS4uuacieaViOWHgOiNt1xuICAgICAqL1xuICAgIGhlYWRlci5hZGFwdGF0aW9uID0gbmV4dCA+PiA0ICYgMHgzO1xuICAgIGhlYWRlci5jb250aW51aXR5ID0gbmV4dCAmIDE1O1xuICAgIGhlYWRlci5wYWNrZXQgPSBoZWFkZXIucGlkID09PSAwID8gJ1BBVCcgOiAnTUVESUEnO1xuICAgIHRzLmhlYWRlciA9IGhlYWRlcjtcbiAgfVxuXG4gIHN0YXRpYyBQQVQgKHN0cmVhbSwgdHMsIGZyYWdzKSB7XG4gICAgbGV0IHJldCA9IHt9O1xuICAgIGxldCBuZXh0ID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHN0cmVhbS5za2lwKG5leHQpO1xuICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgcmV0LnRhYmVsSUQgPSBuZXh0O1xuICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgIHJldC5lcnJvciA9IG5leHQgPj4+IDc7XG4gICAgcmV0Lnplcm8gPSBuZXh0ID4+PiA2ICYgMTtcbiAgICByZXQuc2VjdGlvbkxlbmd0aCA9IG5leHQgJiAweGZmZjtcbiAgICByZXQuc3RyZWFtSUQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgIHJldC5jdXJyZW50ID0gc3RyZWFtLnJlYWRVaW50OCgpICYgMTtcbiAgICByZXQuc2VjdGlvbk51bWJlciA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICByZXQubGFzdFNlY3Rpb25OdW1iZXIgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgbGV0IE4gPSAocmV0LnNlY3Rpb25MZW5ndGggLSA5KSAvIDQ7XG4gICAgbGV0IGxpc3QgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE47IGkrKykge1xuICAgICAgbGV0IHByb2dyYW1OdW1iZXIgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgICAgbGV0IHBpZCA9IHN0cmVhbS5yZWFkVWludDE2KCkgJiAweDFmZmY7XG4gICAgICBsaXN0LnB1c2goe1xuICAgICAgICBwcm9ncmFtOiBwcm9ncmFtTnVtYmVyLFxuICAgICAgICBwaWQsXG4gICAgICAgIHR5cGU6IHByb2dyYW1OdW1iZXIgPT09IDAgPyAnbmV0d29yaycgOiAnbWFwUElEJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChsaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgIGZyYWdzLnBhdCA9IGZyYWdzLnBhdC5jb25jYXQobGlzdCk7XG4gICAgfVxuICAgIHJldC5saXN0ID0gbGlzdDtcbiAgICByZXQucHJvZ3JhbSA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgcmV0LnBpZCA9IHN0cmVhbS5yZWFkVWludDE2KCkgJiAweDFmZmY7XG4gICAgdHMucGF5bG9hZCA9IHJldDtcbiAgICAvLyBUT0RPIENSQ1xuICB9XG5cbiAgc3RhdGljIFBNVCAoc3RyZWFtLCB0cywgZnJhZ3MpIHtcbiAgICBsZXQgcmV0ID0ge307XG4gICAgbGV0IGhlYWRlciA9IHRzLmhlYWRlcjtcbiAgICBoZWFkZXIucGFja2V0ID0gJ1BNVCc7XG4gICAgbGV0IG5leHQgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgc3RyZWFtLnNraXAobmV4dCk7XG4gICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICByZXQudGFibGVJRCA9IG5leHQ7XG4gICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgcmV0LnNlY3Rpb25MZW5ndGggPSBuZXh0ICYgMHhmZmY7XG4gICAgcmV0LnByb2dyYW0gPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgIHJldC5jdXJyZW50ID0gc3RyZWFtLnJlYWRVaW50OCgpICYgMTtcbiAgICByZXQub3JkZXIgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgcmV0Lmxhc3RPcmRlciA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICByZXQuUENSX1BJRCA9IHN0cmVhbS5yZWFkVWludDE2KCkgJiAweDFmZmY7XG4gICAgcmV0LnByb2dyYW1MZW5ndGggPSBzdHJlYW0ucmVhZFVpbnQxNigpICYgMHhmZmY7XG4gICAgbGV0IE4gPSAocmV0LnNlY3Rpb25MZW5ndGggLSAxMykgLyA1O1xuICAgIGxldCBsaXN0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOOyBpKyspIHtcbiAgICAgIGxpc3QucHVzaCh7XG4gICAgICAgIHN0cmVhbVR5cGU6IHN0cmVhbS5yZWFkVWludDgoKSxcbiAgICAgICAgcGlkOiBzdHJlYW0ucmVhZFVpbnQxNigpICYgMHgxZmZmLCAvLyAweDA3ZTUg6KeG6aKR77yMMHgwN2U2XG4gICAgICAgIGVzOiBzdHJlYW0ucmVhZFVpbnQxNigpICYgMHhmZmZcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXQubGlzdCA9IGxpc3Q7XG4gICAgaWYgKCF0aGlzLnBtdCkge1xuICAgICAgdGhpcy5wbXQgPSBbXTtcbiAgICB9XG4gICAgZnJhZ3MucG10ID0gdGhpcy5wbXQuY29uY2F0KGxpc3QubWFwKChpdGVtKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwaWQ6IGl0ZW0ucGlkLFxuICAgICAgICBlczogaXRlbS5lcyxcbiAgICAgICAgc3RyZWFtVHlwZTogaXRlbS5zdHJlYW1UeXBlLFxuICAgICAgICBwcm9ncmFtOiByZXQucHJvZ3JhbVxuICAgICAgfTtcbiAgICB9KSk7XG4gICAgdHMucGF5bG9hZCA9IHJldDtcbiAgfVxuXG4gIHN0YXRpYyBNZWRpYSAoc3RyZWFtLCB0cywgdHlwZSkge1xuICAgIGxldCBoZWFkZXIgPSB0cy5oZWFkZXI7XG4gICAgbGV0IHBheWxvYWQgPSB7fTtcbiAgICBoZWFkZXIudHlwZSA9IHR5cGU7XG4gICAgaWYgKGhlYWRlci5hZGFwdGF0aW9uID09PSAweDAzKSB7XG4gICAgICBwYXlsb2FkLmFkYXB0YXRpb25MZW5ndGggPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgICBpZiAocGF5bG9hZC5hZGFwdGF0aW9uTGVuZ3RoID4gMCkge1xuICAgICAgICBsZXQgbmV4dCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICAgICAgcGF5bG9hZC5kaXNjb250aW51ZSA9IG5leHQgPj4+IDc7XG4gICAgICAgIHBheWxvYWQuYWNjZXNzID0gbmV4dCA+Pj4gNiAmIDB4MDE7XG4gICAgICAgIHBheWxvYWQucHJpb3JpdHkgPSBuZXh0ID4+PiA1ICYgMHgwMTtcbiAgICAgICAgcGF5bG9hZC5QQ1IgPSBuZXh0ID4+PiA0ICYgMHgwMTtcbiAgICAgICAgcGF5bG9hZC5PUENSID0gbmV4dCA+Pj4gMyAmIDB4MDE7XG4gICAgICAgIHBheWxvYWQuc3BsaWNlUG9pbnQgPSBuZXh0ID4+PiAyICYgMHgwMTtcbiAgICAgICAgcGF5bG9hZC50cmFuc3BvcnRQcml2YXRlID0gbmV4dCA+Pj4gMSAmIDB4MDE7XG4gICAgICAgIHBheWxvYWQuYWRhcHRhdGlvbkZpZWxkID0gbmV4dCAmIDB4MDE7XG4gICAgICAgIGxldCBfc3RhcnQgPSBzdHJlYW0ucG9zaXRpb247XG4gICAgICAgIGlmIChwYXlsb2FkLlBDUiA9PT0gMSkge1xuICAgICAgICAgIHBheWxvYWQucHJvZ3JhbUNsb2NrQmFzZSA9IHN0cmVhbS5yZWFkVWludDMyKCkgPDwgMTtcbiAgICAgICAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBwYXlsb2FkLnByb2dyYW1DbG9ja0Jhc2UgfD0gbmV4dCA+Pj4gMTU7XG4gICAgICAgICAgcGF5bG9hZC5wcm9ncmFtQ2xvY2tFeHRlbnNpb24gPSBuZXh0ICYgMHgxZmY7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBheWxvYWQuT1BDUiA9PT0gMSkge1xuICAgICAgICAgIHBheWxvYWQub3JpZ2luUHJvZ3JhbUNsb2NrQmFzZSA9IHN0cmVhbS5yZWFkVWludDMyKCkgPDwgMTtcbiAgICAgICAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBwYXlsb2FkLm9yaWdpblByb2dyYW1DbG9ja0Jhc2UgKz0gbmV4dCA+Pj4gMTU7XG4gICAgICAgICAgcGF5bG9hZC5vcmlnaW5Qcm9ncmFtQ2xvY2tFeHRlbnNpb24gPSBuZXh0ICYgMHgxZmY7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBheWxvYWQuc3BsaWNlUG9pbnQgPT09IDEpIHtcbiAgICAgICAgICBwYXlsb2FkLnNwbGljZUNvdW50ZG93biA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF5bG9hZC50cmFuc3BvcnRQcml2YXRlID09PSAxKSB7XG4gICAgICAgICAgbGV0IGxlbmd0aCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICAgICAgICBsZXQgdHJhbnNwb3J0UHJpdmF0ZURhdGEgPSBbXTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0cmFuc3BvcnRQcml2YXRlRGF0YS5wdXNoKHN0cmVhbS5yZWFkVWludDgoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChwYXlsb2FkLmFkYXB0YXRpb25GaWVsZCA9PT0gMSkge1xuICAgICAgICAgIGxldCBsZW5ndGggPSBzdHJlYW0ucmVhZFVpbnQ4KClcbiAgICAgICAgICBsZXQgbmV4dCA9IHN0cmVhbS5yZWFkVWludDgoKVxuICAgICAgICAgIGxldCBzdGFydCA9IHN0cmVhbS5wb3NpdGlvbjtcbiAgICAgICAgICBsZXQgbHR3ID0gbmV4dCA+Pj4gNztcbiAgICAgICAgICBsZXQgcGllY2V3aXNlID0gbmV4dCA+Pj4gNiAmIDB4MTtcbiAgICAgICAgICBsZXQgc2VhbWxlc3MgPSBuZXh0ID4+PiA1ICYgMHgxO1xuICAgICAgICAgIGlmIChsdHcgPT09IDEpIHtcbiAgICAgICAgICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgICAgICAgICAgcGF5bG9hZC5sdHdWYWxpZCA9IG5leHQgPj4+IDE1O1xuICAgICAgICAgICAgcGF5bG9hZC5sdHdPZmZzZXQgPSBuZXh0ICYgMHhlZmZmO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocGllY2V3aXNlID09PSAxKSB7XG4gICAgICAgICAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MjQoKTtcbiAgICAgICAgICAgIHBheWxvYWQucGllY2V3aXNlUmF0ZSA9IG5leHQgJiAweDNmZmZmZjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNlYW1sZXNzID09PSAxKSB7XG4gICAgICAgICAgICBuZXh0ID0gc3RyZWFtLnJlYWRJbnQ4KCk7XG4gICAgICAgICAgICBwYXlsb2FkLnNwbGljZVR5cGUgPSBuZXh0ID4+PiA0O1xuICAgICAgICAgICAgcGF5bG9hZC5kdHNOZXh0QVUxID0gbmV4dCA+Pj4gMSAmIDB4NztcbiAgICAgICAgICAgIHBheWxvYWQubWFya2VyMSA9IG5leHQgJiAweDE7XG4gICAgICAgICAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICAgIHBheWxvYWQuZHRzTmV4dEFVMiA9IG5leHQgPj4+IDE7XG4gICAgICAgICAgICBwYXlsb2FkLm1hcmtlcjIgPSBuZXh0ICYgMHgxO1xuICAgICAgICAgICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgICAgICAgICBwYXlsb2FkLmR0c05leHRBVTMgPSBuZXh0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdHJlYW0uc2tpcChsZW5ndGggLSAxIC0gKHN0cmVhbS5wb3NpdGlvbiAtIHN0YXJ0KSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxhc3RTdHVmZmluZyA9IHBheWxvYWQuYWRhcHRhdGlvbkxlbmd0aCAtIDEgLSAoc3RyZWFtLnBvc2l0aW9uIC0gX3N0YXJ0KTtcbiAgICAgICAgc3RyZWFtLnNraXAobGFzdFN0dWZmaW5nKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcGF5bG9hZC5zdHJlYW0gPSBuZXcgU3RyZWFtKHN0cmVhbS5idWZmZXIuc2xpY2Uoc3RyZWFtLnBvc2l0aW9uKSk7XG4gICAgdHMucGF5bG9hZCA9IHBheWxvYWQ7XG4gIH1cblxuICBzdGF0aWMgUEVTICh0cykge1xuICAgIGxldCByZXQgPSB7fTtcbiAgICBsZXQgYnVmZmVyID0gdHMucGF5bG9hZC5zdHJlYW07XG5cbiAgICBsZXQgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDI0KCk7XG4gICAgaWYgKG5leHQgIT09IDEpIHtcbiAgICAgIHJldC5FUyA9IHt9O1xuICAgICAgcmV0LkVTLmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHN0cmVhbUlEID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgaWYgKHN0cmVhbUlEID49IDB4ZTAgJiYgc3RyZWFtSUQgPD0gMHhlZikge1xuICAgICAgICByZXQudHlwZSA9ICd2aWRlbyc7XG4gICAgICB9XG4gICAgICBpZiAoc3RyZWFtSUQgPj0gMHhjMCAmJiBzdHJlYW1JRCA8PSAweGRmKSB7XG4gICAgICAgIHJldC50eXBlID0gJ2F1ZGlvJztcbiAgICAgIH1cbiAgICAgIGxldCBwYWNrZXRMZW5ndGggPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgcmV0LnBhY2tldExlbmd0aCA9IHBhY2tldExlbmd0aDtcbiAgICAgIGlmIChyZXQudHlwZSA9PT0gJ3ZpZGVvJyB8fCByZXQudHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgICBsZXQgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgbGV0IGZpcnN0ID0gbmV4dCA+Pj4gNjtcbiAgICAgICAgaWYgKGZpcnN0ICE9PSAweDAyKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdlcnJvciB3aGVuIHBhcnNlIHBlcyBoZWFkZXInKTtcbiAgICAgICAgfVxuICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICByZXQucHRzRFRTRmxhZyA9IG5leHQgPj4+IDY7XG4gICAgICAgIHJldC5lc2NyRmxhZyA9IG5leHQgPj4+IDUgJiAweDAxO1xuICAgICAgICByZXQuZXNSYXRlRmxhZyA9IG5leHQgPj4+IDQgJiAweDAxO1xuICAgICAgICByZXQuZHNtRmxhZyA9IG5leHQgPj4+IDMgJiAweDAxO1xuICAgICAgICByZXQuYWRkaXRpb25hbEZsYWcgPSBuZXh0ID4+PiAyICYgMHgwMTtcbiAgICAgICAgcmV0LmNyY0ZsYWcgPSBuZXh0ID4+PiAxICYgMHgwMTtcbiAgICAgICAgcmV0LmV4dGVuc2lvbkZsYWcgPSBuZXh0ICYgMHgwMTtcbiAgICAgICAgcmV0LnBlc0hlYWRlckxlbmd0aCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgbGV0IE4xID0gcmV0LnBlc0hlYWRlckxlbmd0aDtcblxuICAgICAgICBpZiAocmV0LnB0c0RUU0ZsYWcgPT09IDIpIHtcbiAgICAgICAgICBsZXQgcHRzID0gW107XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgICBwdHMucHVzaChuZXh0ID4+PiAxICYgMHgwNyk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgcHRzLnB1c2gobmV4dCA+Pj4gMSk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgcHRzLnB1c2gobmV4dCA+Pj4gMSk7XG4gICAgICAgICAgcmV0LnB0cyA9IChwdHNbMF0gPDwgMzAgfCBwdHNbMV0gPDwgMTUgfCBwdHNbMl0pO1xuICAgICAgICAgIE4xIC09IDU7XG4gICAgICAgICAgLy8g6KeG6aKR5aaC5p6c5rKh5pyJZHRz55SocHRzXG4gICAgICAgICAgaWYgKHJldC50eXBlID09PSAndmlkZW8nKSB7XG4gICAgICAgICAgICByZXQuZHRzID0gcmV0LnB0cztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldC5wdHNEVFNGbGFnID09PSAzKSB7XG4gICAgICAgICAgbGV0IHB0cyA9IFtdO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQ4KCk7XG4gICAgICAgICAgcHRzLnB1c2gobmV4dCA+Pj4gMSAmIDB4MDcpO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgICAgIHB0cy5wdXNoKG5leHQgPj4+IDEpO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgICAgIHB0cy5wdXNoKG5leHQgPj4+IDEpO1xuICAgICAgICAgIHJldC5wdHMgPSAocHRzWzBdIDw8IDMwIHwgcHRzWzFdIDw8IDE1IHwgcHRzWzJdKTtcbiAgICAgICAgICBsZXQgZHRzID0gW107XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgICBkdHMucHVzaChuZXh0ID4+PiAxICYgMHgwNyk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgZHRzLnB1c2gobmV4dCA+Pj4gMSk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgZHRzLnB1c2gobmV4dCA+Pj4gMSk7XG4gICAgICAgICAgcmV0LmR0cyA9IChkdHNbMF0gPDwgMzAgfCBkdHNbMV0gPDwgMTUgfCBkdHNbMl0pO1xuICAgICAgICAgIE4xIC09IDEwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXQuZXNjckZsYWcgPT09IDEpIHtcbiAgICAgICAgICBsZXQgZXNjciA9IFtdXG4gICAgICAgICAgbGV0IGV4ID0gW107XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgICBlc2NyLnB1c2gobmV4dCA+Pj4gMyAmIDB4MDcpO1xuICAgICAgICAgIGVzY3IucHVzaChuZXh0ICYgMHgwMyk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgZXNjci5wdXNoKG5leHQgPj4+IDEzKTtcbiAgICAgICAgICBlc2NyLnB1c2gobmV4dCAmIDB4MDMpO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgICAgIGVzY3IucHVzaChuZXh0ID4+PiAxMyk7XG4gICAgICAgICAgZXgucHVzaChuZXh0ICYgMHgwMyk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgICBleC5wdXNoKG5leHQgPj4+IDEpO1xuICAgICAgICAgIHJldC5lc2NyID0gKGVzY3JbMF0gPDwgMzAgfCBlc2NyWzFdIDw8IDI4IHwgZXNjclsyXSA8PCAxNSB8IGVzY3JbM10gPDwgMTMgfCBlc2NyWzRdKSAqIDMwMCArIChleFswXSA8PCA3IHwgZXhbMV0pO1xuICAgICAgICAgIE4xIC09IDY7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldC5lc1JhdGVGbGFnID09PSAxKSB7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDI0KCk7XG4gICAgICAgICAgcmV0LmVzUmF0ZSA9IG5leHQgPj4+IDEgJiAweDNmZmZmZjtcbiAgICAgICAgICBOMSAtPSAzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXQuZHNtRmxhZyA9PT0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IHN1cHBvcnQgRFNNX3RyaWNrX21vZGUnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0LmFkZGl0aW9uYWxGbGFnID09PSAxKSB7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgICByZXQuYWRkaXRpb25hbENvcHlJbmZvID0gbmV4dCAmIDB4N2Y7XG4gICAgICAgICAgTjEgLT0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0LmNyY0ZsYWcgPT09IDEpIHtcbiAgICAgICAgICByZXQucGVzQ1JDID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBOMSAtPSAyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXQuZXh0ZW5zaW9uRmxhZyA9PT0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IHN1cHBvcnQgZXh0ZW5zaW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE4xID4gMCkge1xuICAgICAgICAgIGJ1ZmZlci5za2lwKE4xKTtcbiAgICAgICAgfVxuICAgICAgICByZXQuRVMgPSBUc0RlbXV4ZXIuRVMoYnVmZmVyLCByZXQudHlwZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Zvcm1hdCBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBzdGF0aWMgRVMgKGJ1ZmZlciwgdHlwZSkge1xuICAgIGxldCBuZXh0O1xuICAgIGxldCByZXQgPSB7fTtcbiAgICBpZiAodHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDMyKCk7XG4gICAgICBpZiAobmV4dCAhPT0gMSkge1xuICAgICAgICBidWZmZXIuYmFjayg0KTtcbiAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDI0KCk7XG4gICAgICAgIGlmIChuZXh0ICE9PSAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdoMjY0IG5hbCBoZWFkZXIgcGFyc2UgZmFpbGVkJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJ1ZmZlci5za2lwKDIpOy8vIDA5IEYwXG4gICAgICAvLyBUT0RPIHJlYWRuYWx1XG4gICAgICByZXQuYnVmZmVyID0gYnVmZmVyO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAvLyBhZHRz55qE5ZCM5q2l5a2X6IqC77yMMTLkvY1cbiAgICAgIGlmIChuZXh0ID4+PiA0ICE9PSAweGZmZikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FhYyBFUyBwYXJzZSBFcnJvcicpO1xuICAgICAgfVxuICAgICAgY29uc3QgZnEgPSBbOTYwMDAsIDg4MjAwLCA2NDAwMCwgNDgwMDAsIDQ0MTAwLCAzMjAwMCwgMjQwMDAsIDIyMDUwLCAxNjAwMCwgMTIwMDAsIDExMDI1LCA4MDAwLCA3MzUwXTtcbiAgICAgIHJldC5pZCA9IChuZXh0ID4+PiAzICYgMHgwMSkgPT09IDAgPyAnTVBFRy00JyA6ICdNUEVHLTInO1xuICAgICAgcmV0LmxheWVyID0gbmV4dCA+Pj4gMSAmIDB4MDM7XG4gICAgICByZXQuYWJzZW50ID0gbmV4dCAmIDB4MDE7XG4gICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgIHJldC5hdWRpb09iamVjdFR5cGUgPSAobmV4dCA+Pj4gMTQgJiAweDAzKSArIDE7XG4gICAgICByZXQucHJvZmlsZSA9IHJldC5hdWRpb09iamVjdFR5cGUgLSAxO1xuICAgICAgcmV0LmZyZXF1ZW5jeUluZGV4ID0gbmV4dCA+Pj4gMTAgJiAweDBmO1xuICAgICAgcmV0LmZyZXF1ZW5jZSA9IGZxW3JldC5mcmVxdWVuY3lJbmRleF07XG4gICAgICByZXQuY2hhbm5lbCA9IG5leHQgPj4+IDYgJiAweDA3O1xuICAgICAgcmV0LmZyYW1lTGVuZ3RoID0gKG5leHQgJiAweDAzKSA8PCAxMSB8IChidWZmZXIucmVhZFVpbnQxNigpID4+PiA1KTtcbiAgICAgIFRzRGVtdXhlci5nZXRBdWRpb0NvbmZpZyhyZXQpO1xuICAgICAgYnVmZmVyLnNraXAoMSk7XG4gICAgICByZXQuYnVmZmVyID0gYnVmZmVyO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEVTICR7dHlwZX0gaXMgbm90IHN1cHBvcnRlZGApO1xuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBzdGF0aWMgVFNEVCAoc3RyZWFtLCB0cywgZnJhZ3MpIHtcbiAgICAvLyBUT0RPXG4gICAgdHMucGF5bG9hZCA9IHt9O1xuICB9XG5cbiAgc3RhdGljIENBVCAoc3RyZWFtLCB0cywgZnJhZ3MpIHtcbiAgICBsZXQgcmV0ID0ge31cbiAgICByZXQudGFibGVJRCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICBsZXQgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgcmV0LnNlY3Rpb25JbmRpY2F0b3IgPSBuZXh0ID4+PiA3O1xuICAgIHJldC5zZWN0aW9uTGVuZ3RoID0gbmV4dCAmIDB4MGZmZjtcbiAgICBzdHJlYW0uc2tpcCgyKTtcbiAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHJldC52ZXJzaW9uID0gbmV4dCA+Pj4gMztcbiAgICByZXQuY3VycmVudE5leHRJbmRpY2F0b3IgPSBuZXh0ICYgMHgwMTtcbiAgICByZXQuc2VjdGlvbk51bWJlciA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICByZXQubGFzdFNlY3Rpb25OdW1iZXIgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgbGV0IE4gPSAodGhpcy5zZWN0aW9uTGVuZ3RoIC0gOSkgLyA0O1xuICAgIGxldCBsaXN0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOOyBpKyspIHtcbiAgICAgIGxpc3QucHVzaCh7fSk7XG4gICAgfVxuICAgIHJldC5jcmMzMiA9IHN0cmVhbS5yZWFkVWludDMyKCk7XG4gICAgdHMucGF5bG9hZCA9IHJldDtcbiAgfVxuXG4gIHN0YXRpYyBnZXRBdWRpb0NvbmZpZyAocmV0KSB7XG4gICAgbGV0IHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKVxuICAgIGxldCBjb25maWc7XG4gICAgbGV0IGV4dGVuc2lvblNhbXBsZUluZGV4O1xuICAgIGlmICgvZmlyZWZveC9pLnRlc3QodXNlckFnZW50KSkge1xuICAgICAgaWYgKHJldC5mcmVxdWVuY3lJbmRleCA+PSA2KSB7XG4gICAgICAgIHJldC5hdWRpb09iamVjdFR5cGUgPSA1O1xuICAgICAgICBjb25maWcgPSBuZXcgQXJyYXkoNCk7XG4gICAgICAgIGV4dGVuc2lvblNhbXBsZUluZGV4ID0gcmV0LmZyZXF1ZW5jeUluZGV4IC0gMztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldC5hdWRpb09iamVjdFR5cGUgPSAyO1xuICAgICAgICBjb25maWcgPSBuZXcgQXJyYXkoMik7XG4gICAgICAgIGV4dGVuc2lvblNhbXBsZUluZGV4ID0gcmV0LmZyZXF1ZW5jeUluZGV4O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodXNlckFnZW50LmluZGV4T2YoJ2FuZHJvaWQnKSAhPT0gLTEpIHtcbiAgICAgIHJldC5hdWRpb09iamVjdFR5cGUgPSAyO1xuICAgICAgY29uZmlnID0gbmV3IEFycmF5KDIpO1xuICAgICAgZXh0ZW5zaW9uU2FtcGxlSW5kZXggPSByZXQuZnJlcXVlbmN5SW5kZXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldC5hdWRpb09iamVjdFR5cGUgPSA1O1xuICAgICAgY29uZmlnID0gbmV3IEFycmF5KDQpO1xuICAgICAgaWYgKHJldC5mcmVxdWVuY3lJbmRleCA+PSA2KSB7XG4gICAgICAgIGV4dGVuc2lvblNhbXBsZUluZGV4ID0gcmV0LmZyZXF1ZW5jeUluZGV4IC0gMztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChyZXQuY2hhbm5lbCA9PT0gMSkge1xuICAgICAgICAgIHJldC5hdWRpb09iamVjdFR5cGUgPSAyO1xuICAgICAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSgyKTtcbiAgICAgICAgfVxuICAgICAgICBleHRlbnNpb25TYW1wbGVJbmRleCA9IHJldC5mcmVxdWVuY3lJbmRleDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25maWdbMF0gPSByZXQuYXVkaW9PYmplY3RUeXBlIDw8IDM7XG4gICAgY29uZmlnWzBdIHw9IChyZXQuZnJlcXVlbmN5SW5kZXggJiAweDBlKSA+PiAxO1xuICAgIGNvbmZpZ1sxXSA9IChyZXQuZnJlcXVlbmN5SW5kZXggJiAweDAxKSA8PCA3O1xuICAgIGNvbmZpZ1sxXSB8PSByZXQuY2hhbm5lbCA8PCAzO1xuICAgIGlmIChyZXQuYXVkaW9PYmplY3RUeXBlID09PSA1KSB7XG4gICAgICBjb25maWdbMV0gfD0gKGV4dGVuc2lvblNhbXBsZUluZGV4ICYgMHgwZSkgPj4gMTtcbiAgICAgIGNvbmZpZ1syXSA9IChleHRlbnNpb25TYW1wbGVJbmRleCAmIDB4MDEpIDw8IDc7XG4gICAgICBjb25maWdbMl0gfD0gMiA8PCAyO1xuICAgICAgY29uZmlnWzNdID0gMDtcbiAgICB9XG4gICAgcmV0LmF1ZGlvQ29uZmlnID0gY29uZmlnO1xuICB9XG5cbiAgZ2V0IGlucHV0QnVmZmVyICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSh0aGlzLmNvbmZpZ3MuaW5wdXRidWZmZXIpO1xuICB9XG5cbiAgZ2V0IF90cmFja3MgKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUc0RlbXV4ZXI7XG4iLCJjbGFzcyBQbGF5bGlzdCB7XG4gIGNvbnN0cnVjdG9yIChjb25maWdzKSB7XG4gICAgdGhpcy5fYmFzZVVSTCA9ICcnO1xuICAgIHRoaXMuX2xpc3QgPSB7fTtcbiAgICB0aGlzLl90cyA9IHt9O1xuICAgIHRoaXMudmVyc2lvbiA9IDA7XG4gICAgdGhpcy5zZXF1ZW5jZSA9IC0xO1xuICAgIHRoaXMudGFyZ2V0ZHVyYXRpb24gPSAwO1xuICAgIHRoaXMuZHVyYXRpb24gPSAwO1xuICAgIHRoaXMuZnJhZ0xlbmd0aCA9IDA7XG4gICAgdGhpcy5fbGFzdGdldCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9hdWRvY2xlYXIgPSBjb25maWdzLmF1dG9jbGVhciB8fCBmYWxzZTtcbiAgfVxuXG4gIGdldCBsaXN0ICgpIHtcbiAgICByZXR1cm4gdGhpcy5fbGlzdDtcbiAgfVxuXG4gIHNldCBiYXNlVVJMIChiYXNlVVJMKSB7XG4gICAgaWYgKHRoaXMuYmFzZVVSTCAhPT0gYmFzZVVSTCkge1xuICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgdGhpcy5fYmFzZVVSTCA9IGJhc2VVUkw7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGJhc2VVUkwgKCkge1xuICAgIHJldHVybiB0aGlzLl9iYXNlVVJMO1xuICB9XG5cbiAgcHVzaCAodHMsIGR1cmF0aW9uLCBkaXNjb250aW51ZSkge1xuICAgIGlmICghdGhpcy5fdHNbdHNdKSB7XG4gICAgICB0aGlzLl90c1t0c10gPSB7ZHVyYXRpb246IGR1cmF0aW9uLCBcbiAgICAgICAgZG93bmxvYWRlZDogZmFsc2UsIFxuICAgICAgICBkb3dubG9hZGluZzogZmFsc2UsIFxuICAgICAgICBzdGFydDogdGhpcy5kdXJhdGlvbiwgXG4gICAgICAgIGRpc2NvbnRpbnVlOiBkaXNjb250aW51ZSA/IHRydWU6IGZhbHNlXG4gICAgICB9O1xuICAgICAgdGhpcy5fbGlzdFt0aGlzLmR1cmF0aW9uXSA9IHRzO1xuICAgICAgdGhpcy5kdXJhdGlvbiArPSBkdXJhdGlvbjtcbiAgICAgIHRoaXMuZnJhZ0xlbmd0aCArPSAxO1xuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZUZyYWcgKHVybCkge1xuICAgIGlmICh0aGlzLl90c1t1cmxdKSB7XG4gICAgICBpZiAodGhpcy5fdHNbdXJsXS5zdGFydCA+IHRoaXMuX2xhc3RnZXQudGltZSkge1xuICAgICAgICB0aGlzLl9sYXN0Z2V0ID0ge1xuICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLl90c1t1cmxdLmR1cmF0aW9uLFxuICAgICAgICAgIHRpbWU6IHRoaXMuX3RzW3VybF0uc3RhcnQsXG4gICAgICAgICAgZG93bmxvYWRlZDogZmFsc2UsXG4gICAgICAgICAgZG93bmxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgIHVybDogdXJsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGRlbGV0ZSB0aGlzLl9saXN0W3RoaXMuX3RzW3VybF0uc3RhcnRdO1xuICAgICAgZGVsZXRlIHRoaXMuX3RzW3VybF07XG4gICAgICB0aGlzLmZyYWdMZW5ndGggLT0gMTtcbiAgICB9XG4gIH1cblxuICBwdXNoTTNVOCAoZGF0YSwgZGVsZXRlcHJlKSB7XG4gICAgLy8g5bi46KeE5L+h5oGv5pu/5o2iXG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIG0zdTggZGF0YSByZWNlaXZlZC5gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy52ZXJzaW9uID0gZGF0YS52ZXJzaW9uO1xuICAgIHRoaXMudGFyZ2V0ZHVyYXRpb24gPSBkYXRhLnRhcmdldGR1cmF0aW9uO1xuICAgIGlmKGRhdGEuZW5jcnlwdCAmJiAhdGhpcy5lbmNyeXB0KSB7XG4gICAgICB0aGlzLmVuY3J5cHQgPSBkYXRhLmVuY3J5cHQ7XG4gICAgfVxuICAgIC8vIOaWsOWIhueJh+S/oeaBr1xuICAgIGlmIChkYXRhLnNlcXVlbmNlID4gdGhpcy5zZXF1ZW5jZSkge1xuICAgICAgdGhpcy5zZXF1ZW5jZSA9IGRhdGEuc2VxdWVuY2U7XG4gICAgICBsZXQgbmV3ZnJhZ2xpc3QgPSBbXVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmZyYWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBmcmFnID0gZGF0YS5mcmFnc1tpXTtcbiAgICAgICAgaWYgKCF0aGlzLl90c1tmcmFnLnVybF0pIHtcbiAgICAgICAgICBuZXdmcmFnbGlzdC5wdXNoKGZyYWcudXJsKVxuICAgICAgICAgIHRoaXMucHVzaChmcmFnLnVybCwgZnJhZy5kdXJhdGlvbiwgZnJhZy5kaXNjb250aW51ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYobmV3ZnJhZ2xpc3QubGVuZ3RoIDwgMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbiBub3QgcmVhZCB0cyBmaWxlIGxpc3QuYCk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGlmIChkZWxldGVwcmUpIHtcbiAgICAgICAgbGV0IHRzbGlzdCA9IHRoaXMuZ2V0VHNMaXN0KCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHNsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKG5ld2ZyYWdsaXN0LmluZGV4T2YodHNsaXN0W2ldKSA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlRnJhZyh0c2xpc3RbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE9sZCBtM3U4IGZpbGUgcmVjZWl2ZWQsICR7ZGF0YS5zZXF1ZW5jZX1gKTtcbiAgICB9XG4gIH1cblxuICBnZXRUc0xpc3QgKCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl90cyk7XG4gIH1cblxuICBkb3dubG9hZGVkICh0c25hbWUsIGlzbG9hZGVkKSB7XG4gICAgbGV0IHRzID0gdGhpcy5fdHNbdHNuYW1lXTtcbiAgICBpZiAodHMpIHtcbiAgICAgIHRzLmRvd25sb2FkZWQgPSBpc2xvYWRlZFxuICAgIH1cbiAgfVxuXG4gIGRvd25sb2FkaW5nICh0c25hbWUsIGxvYWRpbmcpIHtcbiAgICBsZXQgdHMgPSB0aGlzLl90c1t0c25hbWVdO1xuICAgIGlmICh0cykge1xuICAgICAgdHMuZG93bmxvYWRpbmcgPSBsb2FkaW5nXG4gICAgfVxuICB9XG5cbiAgZ2V0VHNCeU5hbWUgKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fdHNbbmFtZV07XG4gIH1cblxuICBnZXRUcyAodGltZSkge1xuICAgIGxldCB0aW1lbGlzdCA9IE9iamVjdC5rZXlzKHRoaXMuX2xpc3QpO1xuICAgIGxldCB0cztcblxuICAgIGlmICh0aW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0aGlzLl9sYXN0Z2V0KSB7XG4gICAgICAgIHRpbWUgPSB0aGlzLl9sYXN0Z2V0LnRpbWUgKyB0aGlzLl9sYXN0Z2V0LmR1cmF0aW9uO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGltZSA9IDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRpbWVsaXN0Lmxlbmd0aCA8IDEgfHwgdGltZSA+PSB0aGlzLmR1cmF0aW9uKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB0aW1lbGlzdC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICByZXR1cm4gcGFyc2VGbG9hdChhKSAtIHBhcnNlRmxvYXQoYilcbiAgICB9KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbWVsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGltZSA+PSBwYXJzZUludCh0aW1lbGlzdFtpXSkpIHtcbiAgICAgICAgbGV0IHVybCA9IHRoaXMuX2xpc3RbdGltZWxpc3RbaV1dO1xuICAgICAgICBsZXQgZG93bmxvYWRlZCA9IHRoaXMuX3RzW3VybF0uZG93bmxvYWRlZDtcbiAgICAgICAgbGV0IGRvd25sb2FkaW5nID0gdGhpcy5fdHNbdXJsXS5kb3dubG9hZGluZztcbiAgICAgICAgdHMgPSB7dXJsLCBkb3dubG9hZGVkLCBkb3dubG9hZGluZywgdGltZTogcGFyc2VJbnQodGltZWxpc3RbaV0pLCBkdXJhdGlvbjogcGFyc2VJbnQodGhpcy5fdHNbdXJsXS5kdXJhdGlvbil9O1xuICAgICAgICBpZiAodGhpcy5hdXRvY2xlYXIpIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5fdHNbdGhpcy5fbGFzdGdldC51cmxdO1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLl9saXN0W3RoaXMuX2xhc3RnZXQudGltZV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGFzdGdldCA9IHRzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cztcbiAgfVxuXG4gIGNsZWFyICgpIHtcbiAgICB0aGlzLl9iYXNlVVJMID0gJyc7XG4gICAgdGhpcy5fbGlzdCA9IHt9O1xuICAgIHRoaXMuX3RzID0ge307XG4gICAgdGhpcy52ZXJzaW9uID0gMDtcbiAgICB0aGlzLnNlcXVlbmNlID0gLTE7XG4gICAgdGhpcy50YXJnZXRkdXJhdGlvbiA9IDA7XG4gICAgdGhpcy5kdXJhdGlvbiA9IDA7XG4gIH1cblxuICBjbGVhckRvd25sb2FkZWQgKCkge1xuICAgIGZvciAobGV0IGkgPSAwLCBsID0gT2JqZWN0LmtleXModGhpcy5fdHMpLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgbGV0IHRzID0gdGhpcy5fdHNbT2JqZWN0LmtleXModGhpcy5fdHMpW2ldXTtcbiAgICAgIHRzLmRvd25sb2FkZWQgPSBmYWxzZTtcbiAgICAgIHRzLmRvd25sb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5fYmFzZVVSTCA9ICcnO1xuICAgIHRoaXMuX2xpc3QgPSB7fTtcbiAgICB0aGlzLl90cyA9IHt9O1xuICAgIHRoaXMudmVyc2lvbiA9IDA7XG4gICAgdGhpcy5zZXF1ZW5jZSA9IC0xO1xuICAgIHRoaXMudGFyZ2V0ZHVyYXRpb24gPSAwO1xuICAgIHRoaXMuZHVyYXRpb24gPSAwO1xuICAgIHRoaXMuZnJhZ0xlbmd0aCA9IDA7XG4gICAgdGhpcy5fbGFzdGdldCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9hdWRvY2xlYXIgPSBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5bGlzdDtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBGZXRjaExvYWRlcjogcmVxdWlyZSgnLi9zcmMvZmV0Y2gtbG9hZGVyJykuZGVmYXVsdFxufTtcbiIsImltcG9ydCB7IEVWRU5UUyB9IGZyb20gJ3hncGxheWVyLXV0aWxzJztcblxuY29uc3QgTE9BREVSX0VWRU5UUyA9IEVWRU5UUy5MT0FERVJfRVZFTlRTO1xuY29uc3QgUkVBRF9TVFJFQU0gPSAwO1xuY29uc3QgUkVBRF9URVhUID0gMTtcbmNvbnN0IFJFQURfSlNPTiA9IDI7XG5jb25zdCBSRUFEX0JVRkZFUiA9IDM7XG5jbGFzcyBGZXRjaExvYWRlciB7XG4gIGNvbnN0cnVjdG9yIChjb25maWdzKSB7XG4gICAgdGhpcy5jb25maWdzID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlncyk7XG4gICAgdGhpcy51cmwgPSBudWxsXG4gICAgdGhpcy5zdGF0dXMgPSAwXG4gICAgdGhpcy5lcnJvciA9IG51bGxcbiAgICB0aGlzLl9yZWFkZXIgPSBudWxsO1xuICAgIHRoaXMuX2NhbmNlbGVkID0gZmFsc2U7XG4gICAgdGhpcy5fZGVzdHJveWVkID0gZmFsc2U7XG4gICAgdGhpcy5yZWFkdHlwZSA9IHRoaXMuY29uZmlncy5yZWFkdHlwZTtcbiAgICB0aGlzLmJ1ZmZlciA9IHRoaXMuY29uZmlncy5idWZmZXIgfHwgJ0xPQURFUl9CVUZGRVInO1xuICAgIHRoaXMuX2xvYWRlclRhc2tObyA9IDA7XG4gIH1cblxuICBpbml0ICgpIHtcbiAgICB0aGlzLm9uKExPQURFUl9FVkVOVFMuTEFERVJfU1RBUlQsIHRoaXMubG9hZC5iaW5kKHRoaXMpKVxuICB9XG5cbiAgc3RhdGljIGdldCB0eXBlICgpIHtcbiAgICByZXR1cm4gJ2xvYWRlcidcbiAgfVxuXG4gIGxvYWQgKHVybCwgb3B0cykge1xuICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy51cmwgPSB1cmw7XG4gICAgdGhpcy5fY2FuY2VsZWQgPSBmYWxzZTtcblxuICAgIC8vIFRPRE86IEFkZCBSYW5nZXNcbiAgICBsZXQgcGFyYW1zID0gdGhpcy5nZXRQYXJhbXMob3B0cylcbiAgICBfdGhpcy5sb2FkaW5nID0gdHJ1ZVxuICAgIHJldHVybiBmZXRjaCh0aGlzLnVybCwgcGFyYW1zKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgIF90aGlzLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1c1xuICAgICAgICByZXR1cm4gX3RoaXMuX29uRmV0Y2hSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICB9XG4gICAgICBfdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0VSUk9SLCBfdGhpcy5UQUcsIG5ldyBFcnJvcihgaW52YWxpZCByZXNwb25zZS5gKSk7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSAge1xuICAgICAgX3RoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9FUlJPUiwgX3RoaXMuVEFHLCBlcnJvcik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSlcbiAgICB9KVxuICB9XG5cbiAgX29uRmV0Y2hSZXNwb25zZSAocmVzcG9uc2UpIHtcbiAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgIGxldCBidWZmZXIgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKHRoaXMuYnVmZmVyKTtcbiAgICB0aGlzLl9sb2FkZXJUYXNrTm8rKztcbiAgICBsZXQgdGFza25vID0gdGhpcy5fbG9hZGVyVGFza05vO1xuICAgIGlmIChyZXNwb25zZS5vayA9PT0gdHJ1ZSkge1xuICAgICAgc3dpdGNoICh0aGlzLnJlYWR0eXBlKSB7XG4gICAgICAgIGNhc2UgUkVBRF9KU09OOlxuICAgICAgICAgIHJlc3BvbnNlLmpzb24oKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBfdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgICAgICAgIGlmICghX3RoaXMuX2NhbmNlbGVkICYmICFfdGhpcy5fZGVzdHJveWVkKSB7XG4gICAgICAgICAgICAgIGlmIChidWZmZXIpIHtcbiAgICAgICAgICAgICAgICBidWZmZXIucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0NPTVBMRVRFLCBidWZmZXIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsIGRhdGEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgUkVBRF9URVhUOlxuICAgICAgICAgIHJlc3BvbnNlLnRleHQoKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBfdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgICAgICAgIGlmICghX3RoaXMuX2NhbmNlbGVkICYmICFfdGhpcy5fZGVzdHJveWVkKSB7XG4gICAgICAgICAgICAgIGlmIChidWZmZXIpIHtcbiAgICAgICAgICAgICAgICBidWZmZXIucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0NPTVBMRVRFLCBidWZmZXIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsIGRhdGEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgUkVBRF9CVUZGRVI6XG4gICAgICAgICAgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBfdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgICAgICAgIGlmICghX3RoaXMuX2NhbmNlbGVkICYmICFfdGhpcy5fZGVzdHJveWVkKSB7XG4gICAgICAgICAgICAgIGlmIChidWZmZXIpIHtcbiAgICAgICAgICAgICAgICBidWZmZXIucHVzaChuZXcgVWludDhBcnJheShkYXRhKSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9DT01QTEVURSwgYnVmZmVyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0NPTVBMRVRFLCBkYXRhKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFJFQURfU1RSRUFNOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiB0aGlzLl9vblJlYWRlcihyZXNwb25zZS5ib2R5LmdldFJlYWRlcigpLCB0YXNrbm8pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9vblJlYWRlciAocmVhZGVyLCB0YXNrbm8pIHtcbiAgICBsZXQgYnVmZmVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSh0aGlzLmJ1ZmZlcik7XG4gICAgaWYgKCghYnVmZmVyICYmIHRoaXMuX3JlYWRlcikgfHwgdGhpcy5fZGVzdHJveWVkKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLl9yZWFkZXIuY2FuY2VsKClcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRE8gTk9USElOR1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX3JlYWRlciA9IHJlYWRlclxuICAgIGlmICh0aGlzLmxvYWRpbmcgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgX3RoaXMgPSB0aGlzXG4gICAgLy8gcmVhZGVyIHJlYWQgZnVuY3Rpb24gcmV0dXJucyBhIFByb21pc2UuIGdldCBkYXRhIHdoZW4gY2FsbGJhY2sgYW5kIGhhcyB2YWx1ZS5kb25lIHdoZW4gZGlzY29ubmVjdGVkLlxuICAgIC8vIHJlYWTmlrnms5Xov5Tlm57kuIDkuKpQcm9taXNlLiDlm57osIPkuK3lj6/ku6Xojrflj5bliLDmlbDmja7jgILlvZN2YWx1ZS5kb25l5a2Y5Zyo5pe277yM6K+05piO6ZO+5o6l5pat5byA44CCXG4gICAgdGhpcy5fcmVhZGVyICYmIHRoaXMuX3JlYWRlci5yZWFkKCkudGhlbihmdW5jdGlvbiAodmFsKSB7XG4gICAgICBpZiAodmFsLmRvbmUpIHtcbiAgICAgICAgLy8gVE9ETzog5a6M5oiQ5aSE55CGXG4gICAgICAgIF90aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgICBfdGhpcy5zdGF0dXMgPSAwO1xuICAgICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0NPTVBMRVRFLCBidWZmZXIpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoX3RoaXMuX2NhbmNlbGVkIHx8IF90aGlzLl9kZXN0cm95ZWQpIHtcbiAgICAgICAgaWYgIChfdGhpcy5fcmVhZGVyKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIF90aGlzLl9yZWFkZXIuY2FuY2VsKClcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBETyBOT1RISU5HXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYnVmZmVyLnB1c2godmFsLnZhbHVlKVxuICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9EQVRBTE9BREVELCBidWZmZXIpXG4gICAgICByZXR1cm4gX3RoaXMuX29uUmVhZGVyKHJlYWRlciwgdGFza25vKVxuICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgX3RoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9FUlJPUiwgX3RoaXMuVEFHLCBlcnJvcik7XG4gICAgfSlcbiAgfVxuXG4gIGdldFBhcmFtcyAob3B0cykge1xuICAgIGxldCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0cylcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKClcblxuICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgIG1vZGU6ICdjb3JzJyxcbiAgICAgIGNhY2hlOiAnZGVmYXVsdCdcbiAgICB9XG5cbiAgICAvLyBhZGQgY3VzdG1vciBoZWFkZXJzXG4gICAgLy8g5re75Yqg6Ieq5a6a5LmJ5aS0XG4gICAgaWYgKHR5cGVvZiB0aGlzLmNvbmZpZ3MuaGVhZGVycyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGxldCBjb25maWdIZWFkZXJzID0gdGhpcy5jb25maWdzLmhlYWRlcnNcbiAgICAgIGZvciAobGV0IGtleSBpbiBjb25maWdIZWFkZXJzKSB7XG4gICAgICAgIGlmIChjb25maWdIZWFkZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBoZWFkZXJzLmFwcGVuZChrZXksIGNvbmZpZ0hlYWRlcnNba2V5XSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5oZWFkZXJzID09PSAnb2JqZWN0Jykge1xuICAgICAgbGV0IG9wdEhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnNcbiAgICAgIGZvciAobGV0IGtleSBpbiBvcHRIZWFkZXJzKSB7XG4gICAgICAgIGlmIChvcHRIZWFkZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBoZWFkZXJzLmFwcGVuZChrZXksIG9wdEhlYWRlcnNba2V5XSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmNvcnMgPT09IGZhbHNlKSB7XG4gICAgICBwYXJhbXMubW9kZSA9ICdzYW1lLW9yaWdpbidcbiAgICB9XG5cbiAgICAvLyB3aXRoQ3JlZGVudGlhbHMgaXMgZGlzYWJsZWQgYnkgZGVmYXVsdFxuICAgIC8vIHdpdGhDcmVkZW50aWFscyDlnKjpu5jorqTmg4XlhrXkuIvkuI3ooqvkvb/nlKjjgIJcbiAgICBpZiAob3B0aW9ucy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgIHBhcmFtcy5jcmVkZW50aWFscyA9ICdpbmNsdWRlJ1xuICAgIH1cblxuICAgIC8vIFRPRE86IEFkZCByYW5nZXM7XG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxuXG4gIGNhbmNlbCAoKSB7XG4gICAgaWYgKHRoaXMuX3JlYWRlcikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5fcmVhZGVyLmNhbmNlbCgpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIOmYsuatomZhaWxlZDogMjAw6ZSZ6K+v6KKr5omT5Y2w5Yiw5o6n5Yi25Y+w5LiKXG4gICAgICB9XG4gICAgICB0aGlzLl9yZWFkZXIgPSBudWxsXG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgdGhpcy5fY2FuY2VsZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuX2Rlc3Ryb3llZCA9IHRydWVcbiAgICB0aGlzLmNhbmNlbCgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZldGNoTG9hZGVyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgTXA0UmVtdXhlcjogcmVxdWlyZSgnLi9zcmMvbXA0JykuZGVmYXVsdFxufTtcbiIsImltcG9ydCB7IEJ1ZmZlciB9IGZyb20gJ3hncGxheWVyLXV0aWxzJztcblxuLy8gY29uc3QgVUlOVDMyX01BWCA9IE1hdGgucG93KDIsIDMyKSAtIDE7XG5jbGFzcyBGbXA0IHtcbiAgc3RhdGljIHNpemUgKHZhbHVlKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci53cml0ZVVpbnQzMih2YWx1ZSlcbiAgfVxuICBzdGF0aWMgaW5pdEJveCAoc2l6ZSwgbmFtZSwgLi4uY29udGVudCkge1xuICAgIGNvbnN0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoc2l6ZSksIEZtcDQudHlwZShuYW1lKSwgLi4uY29udGVudClcbiAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlclxuICB9XG4gIHN0YXRpYyBleHRlbnNpb24gKHZlcnNpb24sIGZsYWcpIHtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgdmVyc2lvbixcbiAgICAgIChmbGFnID4+IDE2KSAmIDB4ZmYsXG4gICAgICAoZmxhZyA+PiA4KSAmIDB4ZmYsXG4gICAgICBmbGFnICYgMHhmZlxuICAgIF0pXG4gIH1cbiAgc3RhdGljIGZ0eXAgKCkge1xuICAgIHJldHVybiBGbXA0LmluaXRCb3goMjQsICdmdHlwJywgbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHg2OSwgMHg3MywgMHg2RiwgMHg2RCwgLy8gaXNvbSxcbiAgICAgIDB4MCwgMHgwLCAweDAwLCAweDAxLCAvLyBtaW5vcl92ZXJzaW9uOiAweDAxXG4gICAgICAweDY5LCAweDczLCAweDZGLCAweDZELCAvLyBpc29tXG4gICAgICAweDYxLCAweDc2LCAweDYzLCAweDMxIC8vIGF2YzFcbiAgICBdKSlcbiAgfVxuICBzdGF0aWMgbW9vdiAoeyB0eXBlLCBtZXRhIH0pIHtcbiAgICBsZXQgc2l6ZSA9IDhcbiAgICBsZXQgbXZoZCA9IEZtcDQubXZoZChtZXRhLmR1cmF0aW9uLCBtZXRhLnRpbWVzY2FsZSlcbiAgICBsZXQgdHJha1xuXG4gICAgaWYgKHR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgIHRyYWsgPSBGbXA0LnZpZGVvVHJhayhtZXRhKVxuICAgIH0gZWxzZSB7XG4gICAgICB0cmFrID0gRm1wNC5hdWRpb1RyYWsobWV0YSlcbiAgICB9XG5cbiAgICBsZXQgbXZleCA9IEZtcDQubXZleChtZXRhLmR1cmF0aW9uLCBtZXRhLnRpbWVzY2FsZSB8fCAxMDAwLCBtZXRhLmlkKTtcbiAgICBbbXZoZCwgdHJhaywgbXZleF0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KHNpemUsICdtb292JywgbXZoZCwgdHJhaywgbXZleClcbiAgfVxuICBzdGF0aWMgbXZoZCAoZHVyYXRpb24sIHRpbWVzY2FsZSA9IDEwMDApIHtcbiAgICAvLyBkdXJhdGlvbiAqPSB0aW1lc2NhbGU7XG4gICAgbGV0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gdmVyc2lvbigwKSArIGZsYWdzICAgICAx5L2N55qEYm9454mI5pysKzPkvY1mbGFncyAgIGJveOeJiOacrO+8jDDmiJYx77yM5LiA6Iis5Li6MOOAgu+8iOS7peS4i+Wtl+iKguaVsOWdh+aMiXZlcnNpb249MO+8iVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gY3JlYXRpb25fdGltZSAgICDliJvlu7rml7bpl7QgIO+8iOebuOWvueS6jlVUQ+aXtumXtDE5MDQtMDEtMDHpm7bngrnnmoTnp5LmlbDvvIlcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIG1vZGlmaWNhdGlvbl90aW1lICAg5L+u5pS55pe26Ze0XG5cbiAgICAgIC8qKlxuICAgICAgICAgICAgICogdGltZXNjYWxlOiA0IGJ5dGVz5paH5Lu25aqS5L2T5ZyoMeenkuaXtumXtOWGheeahOWIu+W6puWAvO+8jOWPr+S7peeQhuino+S4ujHnp5Lplb/luqZcbiAgICAgICAgICAgICAqL1xuICAgICAgKHRpbWVzY2FsZSA+Pj4gMjQpICYgMHhGRixcbiAgICAgICh0aW1lc2NhbGUgPj4+IDE2KSAmIDB4RkYsXG4gICAgICAodGltZXNjYWxlID4+PiA4KSAmIDB4RkYsXG4gICAgICAodGltZXNjYWxlKSAmIDB4RkYsXG5cbiAgICAgIC8qKlxuICAgICAgICAgICAgICogZHVyYXRpb246IDQgYnl0ZXPor6V0cmFja+eahOaXtumXtOmVv+W6pu+8jOeUqGR1cmF0aW9u5ZKMdGltZSBzY2FsZeWAvOWPr+S7peiuoeeul3RyYWNr5pe26ZW/77yM5q+U5aaCYXVkaW8gdHJhY2vnmoR0aW1lIHNjYWxlID0gODAwMCxcbiAgICAgICAgICAgICAqIGR1cmF0aW9uID0gNTYwMTI477yM5pe26ZW/5Li6NzAuMDE277yMdmlkZW8gdHJhY2vnmoR0aW1lIHNjYWxlID0gNjAwLCBkdXJhdGlvbiA9IDQyMDAw77yM5pe26ZW/5Li6NzBcbiAgICAgICAgICAgICAqL1xuICAgICAgKGR1cmF0aW9uID4+PiAyNCkgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uID4+PiAxNikgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uID4+PiA4KSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24pICYgMHhGRixcbiAgICAgIDB4MDAsIDB4MDEsIDB4MDAsIDB4MDAsIC8vIFByZWZlcnJlZCByYXRlOiAxLjAgICDmjqjojZDmkq3mlL7pgJ/njofvvIzpq5gxNuS9jeWSjOS9jjE25L2N5YiG5Yir5Li65bCP5pWw54K55pW05pWw6YOo5YiG5ZKM5bCP5pWw6YOo5YiG77yM5Y2zWzE2LjE2XSDmoLzlvI/vvIzor6XlgLzkuLoxLjDvvIgweDAwMDEwMDAw77yJ6KGo56S65q2j5bi45YmN5ZCR5pKt5pS+XG4gICAgICAvKipcbiAgICAgICAgICAgICAqIFByZWZlcnJlZFZvbHVtZSgxLjAsIDJieXRlcykgKyByZXNlcnZlZCgyYnl0ZXMpXG4gICAgICAgICAgICAgKiDkuI5yYXRl57G75Ly877yMWzguOF0g5qC85byP77yMMS4w77yIMHgwMTAw77yJ6KGo56S65pyA5aSn6Z+z6YePXG4gICAgICAgICAgICAgKi9cbiAgICAgIDB4MDEsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyAgcmVzZXJ2ZWQ6IDQgKyA0IGJ5dGVz5L+d55WZ5L2NXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMSwgMHgwMCwgMHgwMCwgLy8gLS0tLWJlZ2luIGNvbXBvc2l0aW9uIG1hdHJpeC0tLS1cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyDop4bpopHlj5jmjaLnn6npmLUgICDnur/mgKfku6PmlbBcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAxLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHg0MCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gLS0tLWVuZCBjb21wb3NpdGlvbiBtYXRyaXgtLS0tXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyAtLS0tYmVnaW4gcHJlX2RlZmluZWQgNiAqIDQgYnl0ZXMtLS0tXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcHJlLWRlZmluZWQg5L+d55WZ5L2NXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIC0tLS1lbmQgcHJlX2RlZmluZWQgNiAqIDQgYnl0ZXMtLS0tXG4gICAgICAweEZGLCAweEZGLCAweEZGLCAweEZGIC8vIG5leHRfdHJhY2tfSUQg5LiL5LiA5LiqdHJhY2vkvb/nlKjnmoRpZOWPt1xuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCg4ICsgYnl0ZXMubGVuZ3RoLCAnbXZoZCcsIG5ldyBVaW50OEFycmF5KGJ5dGVzKSlcbiAgfVxuICBzdGF0aWMgdmlkZW9UcmFrIChkYXRhKSB7XG4gICAgbGV0IHNpemUgPSA4XG5cbiAgICBsZXQgdGtoZCA9IEZtcDQudGtoZCh7XG4gICAgICBpZDogMSxcbiAgICAgIGR1cmF0aW9uOiBkYXRhLmR1cmF0aW9uLFxuICAgICAgdGltZXNjYWxlOiBkYXRhLnRpbWVzY2FsZSB8fCAxMDAwLFxuICAgICAgd2lkdGg6IGRhdGEucHJlc2VudFdpZHRoLFxuICAgICAgaGVpZ2h0OiBkYXRhLnByZXNlbnRIZWlnaHQsXG4gICAgICB0eXBlOiAndmlkZW8nXG4gICAgfSlcbiAgICBsZXQgbWRpYSA9IEZtcDQubWRpYSh7XG4gICAgICB0eXBlOiAndmlkZW8nLFxuICAgICAgdGltZXNjYWxlOiBkYXRhLnRpbWVzY2FsZSB8fCAxMDAwLFxuICAgICAgZHVyYXRpb246IGRhdGEuZHVyYXRpb24sXG4gICAgICBhdmNjOiBkYXRhLmF2Y2MsXG4gICAgICBwYXJSYXRpbzogZGF0YS5wYXJSYXRpbyxcbiAgICAgIHdpZHRoOiBkYXRhLnByZXNlbnRXaWR0aCxcbiAgICAgIGhlaWdodDogZGF0YS5wcmVzZW50SGVpZ2h0XG4gICAgfSk7XG4gICAgW3RraGQsIG1kaWFdLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aFxuICAgIH0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveChzaXplLCAndHJhaycsIHRraGQsIG1kaWEpXG4gIH1cbiAgc3RhdGljIGF1ZGlvVHJhayAoZGF0YSkge1xuICAgIGxldCBzaXplID0gOFxuICAgIGxldCB0a2hkID0gRm1wNC50a2hkKHtcbiAgICAgIGlkOiAyLFxuICAgICAgZHVyYXRpb246IGRhdGEuZHVyYXRpb24sXG4gICAgICB0aW1lc2NhbGU6IGRhdGEudGltZXNjYWxlIHx8IDEwMDAsXG4gICAgICB3aWR0aDogMCxcbiAgICAgIGhlaWdodDogMCxcbiAgICAgIHR5cGU6ICdhdWRpbydcbiAgICB9KVxuICAgIGxldCBtZGlhID0gRm1wNC5tZGlhKHtcbiAgICAgIHR5cGU6ICdhdWRpbycsXG4gICAgICB0aW1lc2NhbGU6IGRhdGEudGltZXNjYWxlIHx8IDEwMDAsXG4gICAgICBkdXJhdGlvbjogZGF0YS5kdXJhdGlvbixcbiAgICAgIGNoYW5uZWxDb3VudDogZGF0YS5jaGFubmVsQ291bnQsXG4gICAgICBzYW1wbGVyYXRlOiBkYXRhLnNhbXBsZVJhdGUsXG4gICAgICBjb25maWc6IGRhdGEuY29uZmlnXG4gICAgfSk7XG4gICAgW3RraGQsIG1kaWFdLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aFxuICAgIH0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveChzaXplLCAndHJhaycsIHRraGQsIG1kaWEpXG4gIH1cbiAgc3RhdGljIHRraGQgKGRhdGEpIHtcbiAgICBsZXQgaWQgPSBkYXRhLmlkXG4gICAgbGV0IGR1cmF0aW9uID0gZGF0YS5kdXJhdGlvblxuICAgIGxldCB3aWR0aCA9IGRhdGEud2lkdGhcbiAgICBsZXQgaGVpZ2h0ID0gZGF0YS5oZWlnaHRcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDcsIC8vIHZlcnNpb24oMCkgKyBmbGFncyAx5L2N54mI5pysIGJveOeJiOacrO+8jDDmiJYx77yM5LiA6Iis5Li6MOOAgu+8iOS7peS4i+Wtl+iKguaVsOWdh+aMiXZlcnNpb249MO+8ieaMieS9jeaIluaTjeS9nOe7k+aenOWAvO+8jOmihOWumuS5ieWmguS4i++8mlxuICAgICAgLy8gMHgwMDAwMDEgdHJhY2tfZW5hYmxlZO+8jOWQpuWImeivpXRyYWNr5LiN6KKr5pKt5pS+77ybXG4gICAgICAvLyAweDAwMDAwMiB0cmFja19pbl9tb3ZpZe+8jOihqOekuuivpXRyYWNr5Zyo5pKt5pS+5Lit6KKr5byV55So77ybXG4gICAgICAvLyAweDAwMDAwNCB0cmFja19pbl9wcmV2aWV377yM6KGo56S66K+ldHJhY2vlnKjpooTop4jml7booqvlvJXnlKjjgIJcbiAgICAgIC8vIOS4gOiIrOivpeWAvOS4ujfvvIwxKzIrNCDlpoLmnpzkuIDkuKrlqpLkvZPmiYDmnIl0cmFja+Wdh+acquiuvue9rnRyYWNrX2luX21vdmll5ZKMdHJhY2tfaW5fcHJldmlld++8jOWwhuiiq+eQhuino+S4uuaJgOaciXRyYWNr5Z2H6K6+572u5LqG6L+Z5Lik6aG577yb5a+55LqOaGludCB0cmFja++8jOivpeWAvOS4ujBcbiAgICAgIC8vIGhpbnQgdHJhY2sg6L+Z5Liq54m55q6K55qEdHJhY2vlubbkuI3ljIXlkKvlqpLkvZPmlbDmja7vvIzogIzmmK/ljIXlkKvkuobkuIDkupvlsIblhbbku5bmlbDmja50cmFja+aJk+WMheaIkOa1geWqkuS9k+eahOaMh+ekuuS/oeaBr+OAglxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gY3JlYXRpb25fdGltZeWIm+W7uuaXtumXtO+8iOebuOWvueS6jlVUQ+aXtumXtDE5MDQtMDEtMDHpm7bngrnnmoTnp5LmlbDvvIlcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIG1vZGlmaWNhdGlvbiB0aW1lIOS/ruaUueaXtumXtFxuICAgICAgKGlkID4+PiAyNCkgJiAweEZGLCAvLyB0cmFja19JRDogNCBieXRlcyBpZOWPt++8jOS4jeiDvemHjeWkjeS4lOS4jeiDveS4ujBcbiAgICAgIChpZCA+Pj4gMTYpICYgMHhGRixcbiAgICAgIChpZCA+Pj4gOCkgJiAweEZGLFxuICAgICAgKGlkKSAmIDB4RkYsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZDogNCBieXRlcyAgICDkv53nlZnkvY1cbiAgICAgIChkdXJhdGlvbiA+Pj4gMjQpICYgMHhGRiwgLy8gZHVyYXRpb246IDQgYnl0ZXMgdHJhY2vnmoTml7bpl7Tplb/luqZcbiAgICAgIChkdXJhdGlvbiA+Pj4gMTYpICYgMHhGRixcbiAgICAgIChkdXJhdGlvbiA+Pj4gOCkgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uKSAmIDB4RkYsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZDogMiAqIDQgYnl0ZXMgICAg5L+d55WZ5L2NXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gbGF5ZXIoMmJ5dGVzKSArIGFsdGVybmF0ZV9ncm91cCgyYnl0ZXMpICDop4bpopHlsYLvvIzpu5jorqTkuLow77yM5YC85bCP55qE5Zyo5LiK5bGCLnRyYWNr5YiG57uE5L+h5oGv77yM6buY6K6k5Li6MOihqOekuuivpXRyYWNr5pyq5LiO5YW25LuWdHJhY2vmnInnvqTnu4TlhbPns7tcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHZvbHVtZSgyYnl0ZXMpICsgcmVzZXJ2ZWQoMmJ5dGVzKSAgICBbOC44XSDmoLzlvI/vvIzlpoLmnpzkuLrpn7PpopF0cmFja++8jDEuMO+8iDB4MDEwMO+8ieihqOekuuacgOWkp+mfs+mHj++8m+WQpuWImeS4ujAgICAr5L+d55WZ5L2NXG4gICAgICAweDAwLCAweDAxLCAweDAwLCAweDAwLCAvLyAtLS0tYmVnaW4gY29tcG9zaXRpb24gbWF0cml4LS0tLVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMSwgMHgwMCwgMHgwMCwgLy8g6KeG6aKR5Y+Y5o2i55+p6Zi1XG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDQwLCAweDAwLCAweDAwLCAweDAwLCAvLyAtLS0tZW5kIGNvbXBvc2l0aW9uIG1hdHJpeC0tLS1cbiAgICAgICh3aWR0aCA+Pj4gOCkgJiAweEZGLCAvLyAvL+WuveW6plxuICAgICAgKHdpZHRoKSAmIDB4RkYsXG4gICAgICAweDAwLCAweDAwLFxuICAgICAgKGhlaWdodCA+Pj4gOCkgJiAweEZGLCAvLyDpq5jluqZcbiAgICAgIChoZWlnaHQpICYgMHhGRixcbiAgICAgIDB4MDAsIDB4MDBcbiAgICBdKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goOCArIGNvbnRlbnQuYnl0ZUxlbmd0aCwgJ3RraGQnLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyBlZHRzIChkYXRhKSB7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGxldCBkdXJhdGlvbiA9IGRhdGEuZHVyYXRpb25cbiAgICBsZXQgbWVkaWFUaW1lID0gZGF0YS5tZWRpYVRpbWVcbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKDM2KSwgRm1wNC50eXBlKCdlZHRzJykpXG4gICAgLy8gZWxzdFxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoMjgpLCBGbXA0LnR5cGUoJ2Vsc3QnKSlcbiAgICBidWZmZXIud3JpdGUobmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMSwgLy8gZW50cnkgY291bnRcbiAgICAgIChkdXJhdGlvbiA+PiAyNCkgJiAweGZmLCAoZHVyYXRpb24gPj4gMTYpICYgMHhmZiwgKGR1cmF0aW9uID4+IDgpICYgMHhmZiwgZHVyYXRpb24gJiAweGZmLFxuICAgICAgKG1lZGlhVGltZSA+PiAyNCkgJiAweGZmLCAobWVkaWFUaW1lID4+IDE2KSAmIDB4ZmYsIChtZWRpYVRpbWUgPj4gOCkgJiAweGZmLCBtZWRpYVRpbWUgJiAweGZmLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMSAvLyBtZWRpYSByYXRlXG4gICAgXSkpXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgbWRpYSAoZGF0YSkge1xuICAgIGxldCBzaXplID0gOFxuICAgIGxldCBtZGhkID0gRm1wNC5tZGhkKGRhdGEudGltZXNjYWxlLCBkYXRhLmR1cmF0aW9uKVxuICAgIGxldCBoZGxyID0gRm1wNC5oZGxyKGRhdGEudHlwZSlcbiAgICBsZXQgbWluZiA9IEZtcDQubWluZihkYXRhKTtcbiAgICBbbWRoZCwgaGRsciwgbWluZl0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KHNpemUsICdtZGlhJywgbWRoZCwgaGRsciwgbWluZilcbiAgfVxuICBzdGF0aWMgbWRoZCAodGltZXNjYWxlID0gMTAwMCwgZHVyYXRpb24pIHtcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGNyZWF0aW9uX3RpbWUgICAg5Yib5bu65pe26Ze0XG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBtb2RpZmljYXRpb25fdGltZeS/ruaUueaXtumXtFxuICAgICAgKHRpbWVzY2FsZSA+Pj4gMjQpICYgMHhGRiwgLy8gdGltZXNjYWxlOiA0IGJ5dGVzICAgIOaWh+S7tuWqkuS9k+WcqDHnp5Lml7bpl7TlhoXnmoTliLvluqblgLzvvIzlj6/ku6XnkIbop6PkuLox56eS6ZW/5bqmXG4gICAgICAodGltZXNjYWxlID4+PiAxNikgJiAweEZGLFxuICAgICAgKHRpbWVzY2FsZSA+Pj4gOCkgJiAweEZGLFxuICAgICAgKHRpbWVzY2FsZSkgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uID4+PiAyNCkgJiAweEZGLCAvLyBkdXJhdGlvbjogNCBieXRlcyAgdHJhY2vnmoTml7bpl7Tplb/luqZcbiAgICAgIChkdXJhdGlvbiA+Pj4gMTYpICYgMHhGRixcbiAgICAgIChkdXJhdGlvbiA+Pj4gOCkgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uKSAmIDB4RkYsXG4gICAgICAweDU1LCAweEM0LCAvLyBsYW5ndWFnZTogdW5kICh1bmRldGVybWluZWQpIOWqkuS9k+ivreiogOeggeOAguacgOmrmOS9jeS4ujDvvIzlkI7pnaIxNeS9jeS4ujPkuKrlrZfnrKbvvIjop4FJU08gNjM5LTIvVOagh+WHhuS4reWumuS5ie+8iVxuICAgICAgMHgwMCwgMHgwMCAvLyBwcmVfZGVmaW5lZCA9IDBcbiAgICBdKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTIgKyBjb250ZW50LmJ5dGVMZW5ndGgsICdtZGhkJywgRm1wNC5leHRlbnNpb24oMCwgMCksIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIGhkbHIgKHR5cGUpIHtcbiAgICBsZXQgdmFsdWUgPSBbMHgwMCwgLy8gdmVyc2lvbiAwXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcHJlX2RlZmluZWRcbiAgICAgIDB4NzYsIDB4NjksIDB4NjQsIDB4NjUsIC8vIGhhbmRsZXJfdHlwZTogJ3ZpZGUnXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDU2LCAweDY5LCAweDY0LCAweDY1LFxuICAgICAgMHg2ZiwgMHg0OCwgMHg2MSwgMHg2ZSxcbiAgICAgIDB4NjQsIDB4NmMsIDB4NjUsIDB4NzIsIDB4MDAgLy8gbmFtZTogJ1ZpZGVvSGFuZGxlcidcbiAgICBdXG4gICAgaWYgKHR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgIHZhbHVlLnNwbGljZSg4LCA0LCAuLi5bMHg3MywgMHg2ZiwgMHg3NSwgMHg2ZV0pXG4gICAgICB2YWx1ZS5zcGxpY2UoMjQsIDEzLCAuLi5bMHg1MywgMHg2ZiwgMHg3NSwgMHg2ZSxcbiAgICAgICAgMHg2NCwgMHg0OCwgMHg2MSwgMHg2ZSxcbiAgICAgICAgMHg2NCwgMHg2YywgMHg2NSwgMHg3MiwgMHgwMF0pXG4gICAgfVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goOCArIHZhbHVlLmxlbmd0aCwgJ2hkbHInLCBuZXcgVWludDhBcnJheSh2YWx1ZSkpXG4gIH1cbiAgc3RhdGljIG1pbmYgKGRhdGEpIHtcbiAgICBsZXQgc2l6ZSA9IDhcbiAgICBsZXQgdm1oZCA9IGRhdGEudHlwZSA9PT0gJ3ZpZGVvJyA/IEZtcDQudm1oZCgpIDogRm1wNC5zbWhkKClcbiAgICBsZXQgZGluZiA9IEZtcDQuZGluZigpXG4gICAgbGV0IHN0YmwgPSBGbXA0LnN0YmwoZGF0YSk7XG4gICAgW3ZtaGQsIGRpbmYsIHN0YmxdLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aFxuICAgIH0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveChzaXplLCAnbWluZicsIHZtaGQsIGRpbmYsIHN0YmwpXG4gIH1cbiAgc3RhdGljIHZtaGQgKCkge1xuICAgIHJldHVybiBGbXA0LmluaXRCb3goMjAsICd2bWhkJywgbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgLy8gdmVyc2lvblxuICAgICAgMHgwMCwgMHgwMCwgMHgwMSwgLy8gZmxhZ3NcbiAgICAgIDB4MDAsIDB4MDAsIC8vIGdyYXBoaWNzbW9kZVxuICAgICAgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwIC8vIG9wY29sb3JcbiAgICBdKSlcbiAgfVxuICBzdGF0aWMgc21oZCAoKSB7XG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxNiwgJ3NtaGQnLCBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgLy8gYmFsYW5jZVxuICAgICAgMHgwMCwgMHgwMCAvLyByZXNlcnZlZFxuICAgIF0pKVxuICB9XG4gIHN0YXRpYyBkaW5mICgpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IGRyZWYgPSBbMHgwMCwgLy8gdmVyc2lvbiAwXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMSwgLy8gZW50cnlfY291bnRcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MGMsIC8vIGVudHJ5X3NpemVcbiAgICAgIDB4NzUsIDB4NzIsIDB4NmMsIDB4MjAsIC8vICd1cmwnIHR5cGVcbiAgICAgIDB4MDAsIC8vIHZlcnNpb24gMFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMSAvLyBlbnRyeV9mbGFnc1xuICAgIF1cbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKDM2KSwgRm1wNC50eXBlKCdkaW5mJyksIEZtcDQuc2l6ZSgyOCksIEZtcDQudHlwZSgnZHJlZicpLCBuZXcgVWludDhBcnJheShkcmVmKSlcbiAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlclxuICB9XG4gIHN0YXRpYyBzdGJsIChkYXRhKSB7XG4gICAgbGV0IHNpemUgPSA4XG4gICAgbGV0IHN0c2QgPSBGbXA0LnN0c2QoZGF0YSlcbiAgICBsZXQgc3R0cyA9IEZtcDQuc3R0cygpXG4gICAgbGV0IHN0c2MgPSBGbXA0LnN0c2MoKVxuICAgIGxldCBzdHN6ID0gRm1wNC5zdHN6KClcbiAgICBsZXQgc3RjbyA9IEZtcDQuc3RjbygpO1xuICAgIFtzdHNkLCBzdHRzLCBzdHNjLCBzdHN6LCBzdGNvXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGhcbiAgICB9KVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goc2l6ZSwgJ3N0YmwnLCBzdHNkLCBzdHRzLCBzdHNjLCBzdHN6LCBzdGNvKVxuICB9XG4gIHN0YXRpYyBzdHNkIChkYXRhKSB7XG4gICAgbGV0IGNvbnRlbnRcbiAgICBpZiAoZGF0YS50eXBlID09PSAnYXVkaW8nKSB7XG4gICAgICAvLyBpZiAoIWRhdGEuaXNBQUMgJiYgZGF0YS5jb2RlYyA9PT0gJ21wNCcpIHtcbiAgICAgIC8vICAgICBjb250ZW50ID0gRk1QNC5tcDMoZGF0YSk7XG4gICAgICAvLyB9IGVsc2Uge1xuICAgICAgLy9cbiAgICAgIC8vIH1cbiAgICAgIC8vIOaUr+aMgW1wNGFcbiAgICAgIGNvbnRlbnQgPSBGbXA0Lm1wNGEoZGF0YSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29udGVudCA9IEZtcDQuYXZjMShkYXRhKVxuICAgIH1cbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDE2ICsgY29udGVudC5ieXRlTGVuZ3RoLCAnc3RzZCcsIEZtcDQuZXh0ZW5zaW9uKDAsIDApLCBuZXcgVWludDhBcnJheShbMHgwMCwgMHgwMCwgMHgwMCwgMHgwMV0pLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyBtcDRhIChkYXRhKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIDB4MDEsIC8vIGRhdGFfcmVmZXJlbmNlX2luZGV4XG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIGRhdGEuY2hhbm5lbENvdW50LCAvLyBjaGFubmVsY291bnRcbiAgICAgIDB4MDAsIDB4MTAsIC8vIHNhbXBsZVNpemU6MTZiaXRzXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZDJcbiAgICAgIChkYXRhLnNhbXBsZXJhdGUgPj4gOCkgJiAweGZmLFxuICAgICAgZGF0YS5zYW1wbGVyYXRlICYgMHhmZiwgLy9cbiAgICAgIDB4MDAsIDB4MDBcbiAgICBdKVxuICAgIGxldCBlc2RzID0gRm1wNC5lc2RzKGRhdGEuY29uZmlnKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goOCArIGNvbnRlbnQuYnl0ZUxlbmd0aCArIGVzZHMuYnl0ZUxlbmd0aCwgJ21wNGEnLCBjb250ZW50LCBlc2RzKVxuICB9XG4gIHN0YXRpYyBlc2RzIChjb25maWcgPSBbNDMsIDE0NiwgOCwgMF0pIHtcbiAgICBjb25zdCBjb25maWdsZW4gPSBjb25maWcubGVuZ3RoXG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgLy8gdmVyc2lvbiAwXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuXG4gICAgICAweDAzLCAvLyBkZXNjcmlwdG9yX3R5cGVcbiAgICAgIDB4MTcgKyBjb25maWdsZW4sIC8vIGxlbmd0aFxuICAgICAgMHgwMCwgMHgwMSwgLy8gZXNfaWRcbiAgICAgIDB4MDAsIC8vIHN0cmVhbV9wcmlvcml0eVxuXG4gICAgICAweDA0LCAvLyBkZXNjcmlwdG9yX3R5cGVcbiAgICAgIDB4MGYgKyBjb25maWdsZW4sIC8vIGxlbmd0aFxuICAgICAgMHg0MCwgLy8gY29kZWMgOiBtcGVnNF9hdWRpb1xuICAgICAgMHgxNSwgLy8gc3RyZWFtX3R5cGVcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGJ1ZmZlcl9zaXplXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBtYXhCaXRyYXRlXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBhdmdCaXRyYXRlXG5cbiAgICAgIDB4MDUgLy8gZGVzY3JpcHRvcl90eXBlXG4gICAgXS5jb25jYXQoW2NvbmZpZ2xlbl0pLmNvbmNhdChjb25maWcpLmNvbmNhdChbMHgwNiwgMHgwMSwgMHgwMl0pKVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoOCArIGNvbnRlbnQuYnl0ZUxlbmd0aCksIEZtcDQudHlwZSgnZXNkcycpLCBjb250ZW50KVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIGF2YzEgKGRhdGEpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IHNpemUgPSA0MC8vIDgoYXZjMSkrOChhdmNjKSs4KGJ0cnQpKzE2KHBhc3ApXG4gICAgLy8gbGV0IHNwcyA9IGRhdGEuc3BzXG4gICAgLy8gbGV0IHBwcyA9IGRhdGEucHBzXG4gICAgbGV0IHdpZHRoID0gZGF0YS53aWR0aFxuICAgIGxldCBoZWlnaHQgPSBkYXRhLmhlaWdodFxuICAgIGxldCBoU3BhY2luZyA9IGRhdGEucGFyUmF0aW8uaGVpZ2h0XG4gICAgbGV0IHZTcGFjaW5nID0gZGF0YS5wYXJSYXRpby53aWR0aFxuICAgIC8vIGxldCBhdmNjQnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgLy8gYXZjY0J1ZmZlci53cml0ZShuZXcgVWludDhBcnJheShbXG4gICAgLy8gICAweDAxLCAvLyB2ZXJzaW9uXG4gICAgLy8gICBzcHNbMV0sIC8vIHByb2ZpbGVcbiAgICAvLyAgIHNwc1syXSwgLy8gcHJvZmlsZSBjb21wYXRpYmxlXG4gICAgLy8gICBzcHNbM10sIC8vIGxldmVsXG4gICAgLy8gICAweGZjIHwgMyxcbiAgICAvLyAgIDB4RTAgfCAxIC8vIOebruWJjeWPquWkhOeQhuS4gOS4qnNwc1xuICAgIC8vIF0uY29uY2F0KFtzcHMubGVuZ3RoID4+PiA4ICYgMHhmZiwgc3BzLmxlbmd0aCAmIDB4ZmZdKSkpXG4gICAgLy8gYXZjY0J1ZmZlci53cml0ZShzcHMsIG5ldyBVaW50OEFycmF5KFsxLCBwcHMubGVuZ3RoID4+PiA4ICYgMHhmZiwgcHBzLmxlbmd0aCAmIDB4ZmZdKSwgcHBzKVxuXG4gICAgbGV0IGF2Y2MgPSBkYXRhLmF2Y2NcbiAgICBsZXQgYXZjMSA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMSwgLy8gZGF0YV9yZWZlcmVuY2VfaW5kZXhcbiAgICAgIDB4MDAsIDB4MDAsIC8vIHByZV9kZWZpbmVkXG4gICAgICAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBwcmVfZGVmaW5lZFxuICAgICAgKHdpZHRoID4+IDgpICYgMHhmZixcbiAgICAgIHdpZHRoICYgMHhmZiwgLy8gd2lkdGhcbiAgICAgIChoZWlnaHQgPj4gOCkgJiAweGZmLFxuICAgICAgaGVpZ2h0ICYgMHhmZiwgLy8gaGVpZ2h0XG4gICAgICAweDAwLCAweDQ4LCAweDAwLCAweDAwLCAvLyBob3JpenJlc29sdXRpb25cbiAgICAgIDB4MDAsIDB4NDgsIDB4MDAsIDB4MDAsIC8vIHZlcnRyZXNvbHV0aW9uXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMSwgLy8gZnJhbWVfY291bnRcbiAgICAgIDB4MTIsXG4gICAgICAweDY0LCAweDYxLCAweDY5LCAweDZDLCAvLyBkYWlseW1vdGlvbi9obHMuanNcbiAgICAgIDB4NzksIDB4NkQsIDB4NkYsIDB4NzQsXG4gICAgICAweDY5LCAweDZGLCAweDZFLCAweDJGLFxuICAgICAgMHg2OCwgMHg2QywgMHg3MywgMHgyRSxcbiAgICAgIDB4NkEsIDB4NzMsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGNvbXByZXNzb3JuYW1lXG4gICAgICAweDAwLCAweDE4LCAvLyBkZXB0aCA9IDI0XG4gICAgICAweDExLCAweDExXSkgLy8gcHJlX2RlZmluZWQgPSAtMVxuICAgIGxldCBidHJ0ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgxYywgMHg5YywgMHg4MCwgLy8gYnVmZmVyU2l6ZURCXG4gICAgICAweDAwLCAweDJkLCAweGM2LCAweGMwLCAvLyBtYXhCaXRyYXRlXG4gICAgICAweDAwLCAweDJkLCAweGM2LCAweGMwIC8vIGF2Z0JpdHJhdGVcbiAgICBdKVxuICAgIGxldCBwYXNwID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgKGhTcGFjaW5nID4+IDI0KSwgLy8gaFNwYWNpbmdcbiAgICAgIChoU3BhY2luZyA+PiAxNikgJiAweGZmLFxuICAgICAgKGhTcGFjaW5nID4+IDgpICYgMHhmZixcbiAgICAgIGhTcGFjaW5nICYgMHhmZixcbiAgICAgICh2U3BhY2luZyA+PiAyNCksIC8vIHZTcGFjaW5nXG4gICAgICAodlNwYWNpbmcgPj4gMTYpICYgMHhmZixcbiAgICAgICh2U3BhY2luZyA+PiA4KSAmIDB4ZmYsXG4gICAgICB2U3BhY2luZyAmIDB4ZmZcbiAgICBdKVxuXG4gICAgYnVmZmVyLndyaXRlKFxuICAgICAgRm1wNC5zaXplKHNpemUgKyBhdmMxLmJ5dGVMZW5ndGggKyBhdmNjLmJ5dGVMZW5ndGggKyBidHJ0LmJ5dGVMZW5ndGgpLCBGbXA0LnR5cGUoJ2F2YzEnKSwgYXZjMSxcbiAgICAgIEZtcDQuc2l6ZSg4ICsgYXZjYy5ieXRlTGVuZ3RoKSwgRm1wNC50eXBlKCdhdmNDJyksIGF2Y2MsXG4gICAgICBGbXA0LnNpemUoMjApLCBGbXA0LnR5cGUoJ2J0cnQnKSwgYnRydCxcbiAgICAgIEZtcDQuc2l6ZSgxNiksIEZtcDQudHlwZSgncGFzcCcpLCBwYXNwXG4gICAgKVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIHN0dHMgKCkge1xuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgLy8gdmVyc2lvblxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAgLy8gZW50cnlfY291bnRcbiAgICBdKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTYsICdzdHRzJywgY29udGVudClcbiAgfVxuICBzdGF0aWMgc3RzYyAoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCAvLyBlbnRyeV9jb3VudFxuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxNiwgJ3N0c2MnLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyBzdGNvICgpIHtcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIC8vIHZlcnNpb25cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwIC8vIGVudHJ5X2NvdW50XG4gICAgXSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDE2LCAnc3RjbycsIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIHN0c3ogKCkge1xuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgLy8gdmVyc2lvblxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHNhbXBsZV9zaXplXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwIC8vIHNhbXBsZV9jb3VudFxuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgyMCwgJ3N0c3onLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyBtdmV4IChkdXJhdGlvbiwgdGltZXNjYWxlID0gMTAwMCwgdHJhY2tJRCkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgbWVoZCA9IEJ1ZmZlci53cml0ZVVpbnQzMihkdXJhdGlvbilcbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKDU2KSwgRm1wNC50eXBlKCdtdmV4JyksIEZtcDQuc2l6ZSgxNiksIEZtcDQudHlwZSgnbWVoZCcpLCBGbXA0LmV4dGVuc2lvbigwLCAwKSwgbWVoZCwgRm1wNC50cmV4KHRyYWNrSUQpKVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIHRyZXggKGlkKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uIDBcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAoaWQgPj4gMjQpLFxuICAgICAgKGlkID4+IDE2KSAmIDB4ZmYsXG4gICAgICAoaWQgPj4gOCkgJiAweGZmLFxuICAgICAgKGlkICYgMHhmZiksIC8vIHRyYWNrX0lEXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAxLCAvLyBkZWZhdWx0X3NhbXBsZV9kZXNjcmlwdGlvbl9pbmRleFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZGVmYXVsdF9zYW1wbGVfZHVyYXRpb25cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGRlZmF1bHRfc2FtcGxlX3NpemVcbiAgICAgIDB4MDAsIDB4MDEsIDB4MDAsIDB4MDEgLy8gZGVmYXVsdF9zYW1wbGVfZmxhZ3NcbiAgICBdKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goOCArIGNvbnRlbnQuYnl0ZUxlbmd0aCwgJ3RyZXgnLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyBtb29mIChkYXRhKSB7XG4gICAgbGV0IHNpemUgPSA4XG4gICAgbGV0IG1maGQgPSBGbXA0Lm1maGQoKVxuICAgIGxldCB0cmFmID0gRm1wNC50cmFmKGRhdGEpO1xuICAgIFttZmhkLCB0cmFmXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGhcbiAgICB9KVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goc2l6ZSwgJ21vb2YnLCBtZmhkLCB0cmFmKVxuICB9XG4gIHN0YXRpYyBtZmhkICgpIHtcbiAgICBsZXQgY29udGVudCA9IEJ1ZmZlci53cml0ZVVpbnQzMihGbXA0LnNlcXVlbmNlKVxuICAgIEZtcDQuc2VxdWVuY2UgKz0gMVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTYsICdtZmhkJywgRm1wNC5leHRlbnNpb24oMCwgMCksIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIHRyYWYgKGRhdGEpIHtcbiAgICBsZXQgc2l6ZSA9IDhcbiAgICBsZXQgdGZoZCA9IEZtcDQudGZoZChkYXRhLmlkKVxuICAgIGxldCB0ZmR0ID0gRm1wNC50ZmR0KGRhdGEudGltZSlcbiAgICBsZXQgc2R0cCA9IEZtcDQuc2R0cChkYXRhKVxuICAgIGxldCB0cnVuID0gRm1wNC50cnVuKGRhdGEsIHNkdHAuYnl0ZUxlbmd0aCk7XG5cbiAgICBbdGZoZCwgdGZkdCwgdHJ1biwgc2R0cF0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KHNpemUsICd0cmFmJywgdGZoZCwgdGZkdCwgdHJ1biwgc2R0cClcbiAgfVxuICBzdGF0aWMgdGZoZCAoaWQpIHtcbiAgICBsZXQgY29udGVudCA9IEJ1ZmZlci53cml0ZVVpbnQzMihpZClcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDE2LCAndGZoZCcsIEZtcDQuZXh0ZW5zaW9uKDAsIDApLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyB0ZmR0ICh0aW1lKSB7XG4gICAgLy8gbGV0IHVwcGVyID0gTWF0aC5mbG9vcih0aW1lIC8gKFVJTlQzMl9NQVggKyAxKSksXG4gICAgLy8gICAgIGxvd2VyID0gTWF0aC5mbG9vcih0aW1lICUgKFVJTlQzMl9NQVggKyAxKSk7XG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxNiwgJ3RmZHQnLCBGbXA0LmV4dGVuc2lvbigwLCAwKSwgQnVmZmVyLndyaXRlVWludDMyKHRpbWUpKVxuICB9XG4gIHN0YXRpYyB0cnVuIChkYXRhLCBzZHRwTGVuZ3RoKSB7XG4gICAgLy8gbGV0IGlkID0gZGF0YS5pZDtcbiAgICAvLyBsZXQgY2VpbCA9IGlkID09PSAxID8gMTYgOiAxMjtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IHNhbXBsZUNvdW50ID0gQnVmZmVyLndyaXRlVWludDMyKGRhdGEuc2FtcGxlcy5sZW5ndGgpXG4gICAgLy8gbWRhdC1oZWFkZXIgOFxuICAgIC8vIG1vb2YtaGVhZGVyIDhcbiAgICAvLyBtZmhkIDE2XG4gICAgLy8gdHJhZi1oZWFkZXIgOFxuICAgIC8vIHRoaGQgMTZcbiAgICAvLyB0ZmR0IDIwXG4gICAgLy8gdHJ1bi1oZWFkZXIgMTJcbiAgICAvLyBzYW1wbGVDb3VudCA0XG4gICAgLy8gZGF0YS1vZmZzZXQgNFxuICAgIC8vIHNhbXBsZXMubGVuZ3RoXG4gICAgbGV0IG9mZnNldCA9IEJ1ZmZlci53cml0ZVVpbnQzMig4ICsgOCArIDE2ICsgOCArIDE2ICsgMTYgKyAxMiArIDQgKyA0ICsgMTYgKiBkYXRhLnNhbXBsZXMubGVuZ3RoICsgc2R0cExlbmd0aClcbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKDIwICsgMTYgKiBkYXRhLnNhbXBsZXMubGVuZ3RoKSwgRm1wNC50eXBlKCd0cnVuJyksIG5ldyBVaW50OEFycmF5KFsweDAwLCAweDAwLCAweDBGLCAweDAxXSksIHNhbXBsZUNvdW50LCBvZmZzZXQpXG5cbiAgICAvLyBsZXQgc2l6ZSA9IGJ1ZmZlci5idWZmZXIuYnl0ZUxlbmd0aFxuICAgIC8vIGxldCB3cml0ZU9mZnNldCA9IDBcbiAgICAvLyBkYXRhLnNhbXBsZXMuZm9yRWFjaCgoKSA9PiB7XG4gICAgLy8gICBzaXplICs9IDE2XG4gICAgLy8gfSlcbiAgICAvL1xuICAgIC8vIGxldCB0cnVuQm94ID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSlcblxuICAgIC8vIHRydW5Cb3guc2V0KGJ1ZmZlci5idWZmZXIsIDApXG5cbiAgICBkYXRhLnNhbXBsZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgZmxhZ3MgPSBpdGVtLmZsYWdzXG4gICAgICAvLyBjb25zb2xlLmxvZyhpdGVtLnR5cGUsIGl0ZW0uZHRzLCBpdGVtLmR1cmF0aW9uKVxuXG4gICAgICBidWZmZXIud3JpdGUobmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAoaXRlbS5kdXJhdGlvbiA+Pj4gMjQpICYgMHhGRiwgLy8gc2FtcGxlX2R1cmF0aW9uXG4gICAgICAgIChpdGVtLmR1cmF0aW9uID4+PiAxNikgJiAweEZGLFxuICAgICAgICAoaXRlbS5kdXJhdGlvbiA+Pj4gOCkgJiAweEZGLFxuICAgICAgICAoaXRlbS5kdXJhdGlvbikgJiAweEZGLFxuICAgICAgICAoaXRlbS5zaXplID4+PiAyNCkgJiAweEZGLCAvLyBzYW1wbGVfc2l6ZVxuICAgICAgICAoaXRlbS5zaXplID4+PiAxNikgJiAweEZGLFxuICAgICAgICAoaXRlbS5zaXplID4+PiA4KSAmIDB4RkYsXG4gICAgICAgIChpdGVtLnNpemUpICYgMHhGRixcbiAgICAgICAgKGZsYWdzLmlzTGVhZGluZyA8PCAyKSB8IGZsYWdzLmRlcGVuZHNPbiwgLy8gc2FtcGxlX2ZsYWdzXG4gICAgICAgIChmbGFncy5pc0RlcGVuZGVkT24gPDwgNikgfCAoZmxhZ3MuaGFzUmVkdW5kYW5jeSA8PCA0KSB8IGZsYWdzLmlzTm9uU3luYyxcbiAgICAgICAgMHgwMCwgMHgwMCwgLy8gc2FtcGxlX2RlZ3JhZGF0aW9uX3ByaW9yaXR5XG4gICAgICAgIChpdGVtLmN0cyA+Pj4gMjQpICYgMHhGRiwgLy8gc2FtcGxlX2NvbXBvc2l0aW9uX3RpbWVfb2Zmc2V0XG4gICAgICAgIChpdGVtLmN0cyA+Pj4gMTYpICYgMHhGRixcbiAgICAgICAgKGl0ZW0uY3RzID4+PiA4KSAmIDB4RkYsXG4gICAgICAgIChpdGVtLmN0cykgJiAweEZGXG4gICAgICBdKSlcbiAgICAgIC8vIHdyaXRlT2Zmc2V0ICs9IDE2XG4gICAgICAvLyBidWZmZXIud3JpdGUoQnVmZmVyLndyaXRlVWludDMyKDApKTtcbiAgICB9KVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIHNkdHAgKGRhdGEpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgYnVmZmVyLndyaXRlKEZtcDQuc2l6ZSgxMiArIGRhdGEuc2FtcGxlcy5sZW5ndGgpLCBGbXA0LnR5cGUoJ3NkdHAnKSwgRm1wNC5leHRlbnNpb24oMCwgMCkpXG4gICAgZGF0YS5zYW1wbGVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBjb25zdCBmbGFncyA9IGl0ZW0uZmxhZ3NcbiAgICAgIGNvbnN0IG51bSA9IChmbGFncy5pc0xlYWRpbmcgPDwgNikgfCAvLyBpc19sZWFkaW5nOiAyIChiaXQpXG4gICAgICAgIChmbGFncy5kZXBlbmRzT24gPDwgNCkgfCAvLyBzYW1wbGVfZGVwZW5kc19vblxuICAgICAgICAoZmxhZ3MuaXNEZXBlbmRlZE9uIDw8IDIpIHwgLy8gc2FtcGxlX2lzX2RlcGVuZGVkX29uXG4gICAgICAgIChmbGFncy5oYXNSZWR1bmRhbmN5KS8vIHNhbXBsZV9oYXNfcmVkdW5kYW5jeVxuXG4gICAgICBidWZmZXIud3JpdGUobmV3IFVpbnQ4QXJyYXkoW251bV0pKVxuICAgIH0pXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgbWRhdCAoZGF0YSkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgc2l6ZSA9IDhcbiAgICBkYXRhLnNhbXBsZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5zaXplXG4gICAgfSlcbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKHNpemUpLCBGbXA0LnR5cGUoJ21kYXQnKSlcbiAgICBsZXQgbWRhdEJveCA9IG5ldyBVaW50OEFycmF5KHNpemUpXG4gICAgbGV0IG9mZnNldCA9IDBcbiAgICBtZGF0Qm94LnNldChidWZmZXIuYnVmZmVyLCBvZmZzZXQpXG4gICAgb2Zmc2V0ICs9IDhcbiAgICBkYXRhLnNhbXBsZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGl0ZW0uYnVmZmVyLmZvckVhY2goKHVuaXQpID0+IHtcbiAgICAgICAgbWRhdEJveC5zZXQodW5pdCwgb2Zmc2V0KVxuICAgICAgICBvZmZzZXQgKz0gdW5pdC5ieXRlTGVuZ3RoXG4gICAgICAgIC8vIGJ1ZmZlci53cml0ZSh1bml0LmRhdGEpO1xuICAgICAgfSlcbiAgICB9KVxuICAgIHJldHVybiBtZGF0Qm94XG4gIH1cbn1cbkZtcDQudHlwZSA9IChuYW1lKSA9PiB7XG4gIHJldHVybiBuZXcgVWludDhBcnJheShbbmFtZS5jaGFyQ29kZUF0KDApLCBuYW1lLmNoYXJDb2RlQXQoMSksIG5hbWUuY2hhckNvZGVBdCgyKSwgbmFtZS5jaGFyQ29kZUF0KDMpXSlcbn1cbkZtcDQuc2VxdWVuY2UgPSAxXG5cbmV4cG9ydCBkZWZhdWx0IEZtcDRcbiIsImltcG9ydCB7XG4gIEVWRU5UUyxcbiAgc25pZmZlcixcbiAgTWVkaWFTZWdtZW50TGlzdCxcbiAgQnVmZmVyXG59IGZyb20gJ3hncGxheWVyLXV0aWxzJztcbmltcG9ydCBGbXA0IGZyb20gJy4vZm1wNCdcblxuY29uc3QgUkVNVVhfRVZFTlRTID0gRVZFTlRTLlJFTVVYX0VWRU5UU1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNcDRSZW11eGVyIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuX2R0c0Jhc2UgPSAwXG4gICAgdGhpcy5faXNEdHNCYXNlSW5pdGVkID0gZmFsc2VcblxuICAgIHRoaXMuaXNGaXJzdFZpZGVvID0gdHJ1ZVxuICAgIHRoaXMuaXNGaXJzdEF1ZGlvID0gdHJ1ZVxuXG4gICAgdGhpcy52aWRlb0FsbER1cmF0aW9uID0gMFxuICAgIHRoaXMuYXVkaW9BbGxEdXJhdGlvbiA9IDBcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIHRoaXMub24oUkVNVVhfRVZFTlRTLlJFTVVYX01FRElBLCB0aGlzLnJlbXV4LmJpbmQodGhpcykpXG4gICAgdGhpcy5vbihSRU1VWF9FVkVOVFMuUkVNVVhfTUVUQURBVEEsIHRoaXMub25NZXRhRGF0YVJlYWR5LmJpbmQodGhpcykpXG4gICAgdGhpcy5vbihSRU1VWF9FVkVOVFMuREVURUNUX0NIQU5HRV9TVFJFQU0sIHRoaXMucmVzZXREdHNCYXNlLmJpbmQodGhpcykpXG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLl9kdHNCYXNlID0gLTFcbiAgICB0aGlzLl9kdHNCYXNlSW5pdGVkID0gZmFsc2VcbiAgfVxuXG4gIHJlc2V0ICgpIHtcbiAgICB0aGlzLl9kdHNCYXNlID0gMFxuICAgIHRoaXMuX2lzRHRzQmFzZUluaXRlZCA9IGZhbHNlXG4gIH1cblxuICByZW11eCAoKSB7XG4gICAgY29uc3QgeyBhdWRpb1RyYWNrLCB2aWRlb1RyYWNrIH0gPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKVxuICAgICF0aGlzLl9pc0R0c0Jhc2VJbml0ZWQgJiYgdGhpcy5jYWxjRHRzQmFzZShhdWRpb1RyYWNrLCB2aWRlb1RyYWNrKVxuXG4gICAgdGhpcy5fcmVtdXhWaWRlbyh2aWRlb1RyYWNrKVxuICAgIHRoaXMuX3JlbXV4QXVkaW8oYXVkaW9UcmFjaylcbiAgfVxuXG4gIHJlc2V0RHRzQmFzZSAoKSB7XG4gICAgLy8gZm9yIGhscyDkuK3pgJTliIfmjaIgbWV0YeWQjnNlZWtcbiAgICB0aGlzLl9kdHNCYXNlID0gMFxuICAgIHRoaXMuX2R0c0Jhc2VJbml0ZWQgPSBmYWxzZVxuICB9XG5cbiAgc2VlayAoKSB7XG5cbiAgfVxuXG4gIG9uTWV0YURhdGFSZWFkeSAodHlwZSkge1xuICAgIGxldCB0cmFja1xuXG4gICAgaWYgKHR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgIGNvbnN0IHsgYXVkaW9UcmFjayB9ID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJylcbiAgICAgIHRyYWNrID0gYXVkaW9UcmFjaztcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgeyB2aWRlb1RyYWNrIH0gPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKVxuICAgICAgdHJhY2sgPSB2aWRlb1RyYWNrO1xuICAgIH1cblxuICAgIGxldCBwcmVzb3VyY2VidWZmZXIgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdQUkVfU09VUkNFX0JVRkZFUicpO1xuICAgIGxldCBzb3VyY2UgPSBwcmVzb3VyY2VidWZmZXIuZ2V0U291cmNlKHR5cGUpO1xuICAgIGlmICghc291cmNlKSB7XG4gICAgICBzb3VyY2UgPSBwcmVzb3VyY2VidWZmZXIuY3JlYXRlU291cmNlKHR5cGUpO1xuICAgIH1cblxuICAgIHNvdXJjZS5taW1ldHlwZSA9IHRyYWNrLm1ldGEuY29kZWM7XG4gICAgc291cmNlLmluaXQgPSB0aGlzLnJlbXV4SW5pdFNlZ21lbnQodHlwZSwgdHJhY2subWV0YSk7XG4gICAgLy8gc291cmNlLmluaXRlZCA9IGZhbHNlO1xuXG4gICAgLy8gdGhpcy5yZXNldER0c0Jhc2UoKVxuICAgIHRoaXMuZW1pdChSRU1VWF9FVkVOVFMuSU5JVF9TRUdNRU5ULCB0eXBlKVxuICB9XG5cbiAgcmVtdXhJbml0U2VnbWVudCAodHlwZSwgbWV0YSkge1xuICAgIGxldCBpbml0U2VnbWVudCA9IG5ldyBCdWZmZXIoKVxuICAgIGxldCBmdHlwID0gRm1wNC5mdHlwKClcbiAgICBsZXQgbW9vdiA9IEZtcDQubW9vdih7IHR5cGUsIG1ldGE6IG1ldGEgfSlcblxuICAgIGluaXRTZWdtZW50LndyaXRlKGZ0eXAsIG1vb3YpXG4gICAgcmV0dXJuIGluaXRTZWdtZW50O1xuICB9XG5cbiAgY2FsY0R0c0Jhc2UgKGF1ZGlvVHJhY2ssIHZpZGVvVHJhY2spIHtcbiAgICBpZiAoIWF1ZGlvVHJhY2suc2FtcGxlcy5sZW5ndGggJiYgIXZpZGVvVHJhY2suc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgYXVkaW9CYXNlID0gSW5maW5pdHlcbiAgICBsZXQgdmlkZW9CYXNlID0gSW5maW5pdHlcblxuICAgIGlmIChhdWRpb1RyYWNrLnNhbXBsZXMgJiYgYXVkaW9UcmFjay5zYW1wbGVzLmxlbmd0aCkge1xuICAgICAgYXVkaW9CYXNlID0gYXVkaW9UcmFjay5zYW1wbGVzWzBdLmR0c1xuICAgIH1cbiAgICBpZiAodmlkZW9UcmFjay5zYW1wbGVzICYmIHZpZGVvVHJhY2suc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHZpZGVvQmFzZSA9IHZpZGVvVHJhY2suc2FtcGxlc1swXS5kdHNcbiAgICB9XG5cbiAgICB0aGlzLl9kdHNCYXNlID0gTWF0aC5taW4oYXVkaW9CYXNlLCB2aWRlb0Jhc2UpXG4gICAgdGhpcy5faXNEdHNCYXNlSW5pdGVkID0gdHJ1ZVxuICB9XG5cbiAgX3JlbXV4VmlkZW8gKHZpZGVvVHJhY2spIHtcbiAgICBjb25zdCB0cmFjayA9IHZpZGVvVHJhY2tcblxuICAgIGlmICghdmlkZW9UcmFjay5zYW1wbGVzIHx8ICF2aWRlb1RyYWNrLnNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQge3NhbXBsZXN9ID0gdHJhY2tcbiAgICBsZXQgZmlyc3REdHMgPSAtMVxuXG4gICAgbGV0IGluaXRTZWdtZW50ID0gbnVsbFxuICAgIGNvbnN0IG1wNFNhbXBsZXMgPSBbXVxuICAgIGNvbnN0IG1kYXRCb3ggPSB7XG4gICAgICBzYW1wbGVzOiBbXVxuICAgIH1cblxuICAgIHdoaWxlIChzYW1wbGVzLmxlbmd0aCkge1xuICAgICAgY29uc3QgYXZjU2FtcGxlID0gc2FtcGxlcy5zaGlmdCgpXG5cbiAgICAgIGNvbnN0IHsgaXNLZXlmcmFtZSwgb3B0aW9ucyB9ID0gYXZjU2FtcGxlXG4gICAgICBpZiAoIXRoaXMuaXNGaXJzdEF1ZGlvICYmIG9wdGlvbnMgJiYgb3B0aW9ucy5tZXRhKSB7XG4gICAgICAgIGluaXRTZWdtZW50ID0gdGhpcy5yZW11eEluaXRTZWdtZW50KCd2aWRlbycsIG9wdGlvbnMubWV0YSlcbiAgICAgICAgb3B0aW9ucy5tZXRhID0gbnVsbFxuICAgICAgICBzYW1wbGVzLnVuc2hpZnQoYXZjU2FtcGxlKVxuICAgICAgICBpZiAoIW9wdGlvbnMuaXNDb250aW51ZSkge1xuICAgICAgICAgIHRoaXMucmVzZXREdHNCYXNlKClcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgbGV0IGR0cyA9IGF2Y1NhbXBsZS5kdHMgLSB0aGlzLl9kdHNCYXNlXG5cbiAgICAgIGlmIChmaXJzdER0cyA9PT0gLTEpIHtcbiAgICAgICAgZmlyc3REdHMgPSBkdHNcbiAgICAgIH1cblxuICAgICAgbGV0IGN0c1xuICAgICAgbGV0IHB0c1xuICAgICAgaWYgKGF2Y1NhbXBsZS5wdHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwdHMgPSBhdmNTYW1wbGUucHRzIC0gdGhpcy5fZHRzQmFzZVxuICAgICAgICBjdHMgPSBwdHMgLSBkdHNcbiAgICAgIH1cbiAgICAgIGlmIChhdmNTYW1wbGUuY3RzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcHRzID0gYXZjU2FtcGxlLmN0cyArIGR0c1xuICAgICAgICBjdHMgPSBhdmNTYW1wbGUuY3RzXG4gICAgICB9XG5cbiAgICAgIGxldCBtZGF0U2FtcGxlID0ge1xuICAgICAgICBidWZmZXI6IFtdLFxuICAgICAgICBzaXplOiAwXG4gICAgICB9XG4gICAgICBtZGF0Qm94LnNhbXBsZXMucHVzaChtZGF0U2FtcGxlKVxuICAgICAgbWRhdFNhbXBsZS5idWZmZXIucHVzaChhdmNTYW1wbGUuZGF0YSlcbiAgICAgIG1kYXRTYW1wbGUuc2l6ZSArPSBhdmNTYW1wbGUuZGF0YS5ieXRlTGVuZ3RoXG5cbiAgICAgIGxldCBzYW1wbGVEdXJhdGlvbiA9IDBcbiAgICAgIGlmIChzYW1wbGVzLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgIGNvbnN0IG5leHREdHMgPSBzYW1wbGVzWzBdLmR0cyAtIHRoaXMuX2R0c0Jhc2VcbiAgICAgICAgc2FtcGxlRHVyYXRpb24gPSBuZXh0RHRzIC0gZHRzXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobXA0U2FtcGxlcy5sZW5ndGggPj0gMSkgeyAvLyBsYXN0ZXN0IHNhbXBsZSwgdXNlIHNlY29uZCBsYXN0IGR1cmF0aW9uXG4gICAgICAgICAgc2FtcGxlRHVyYXRpb24gPSBtcDRTYW1wbGVzW21wNFNhbXBsZXMubGVuZ3RoIC0gMV0uZHVyYXRpb25cbiAgICAgICAgfSBlbHNlIHsgLy8gdGhlIG9ubHkgb25lIHNhbXBsZSwgdXNlIHJlZmVyZW5jZSBkdXJhdGlvblxuICAgICAgICAgIHNhbXBsZUR1cmF0aW9uID0gdGhpcy52aWRlb01ldGEucmVmU2FtcGxlRHVyYXRpb25cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy52aWRlb0FsbER1cmF0aW9uICs9IHNhbXBsZUR1cmF0aW9uXG4gICAgICAvLyBjb25zb2xlLmxvZyhgZHRzICR7ZHRzfWAsIGBwdHMgJHtwdHN9YCwgYGN0czogJHtjdHN9YCwgYGR1cmF0aW9uOiAke3NhbXBsZUR1cmF0aW9ufWAsIGF2Y1NhbXBsZSlcbiAgICAgIG1wNFNhbXBsZXMucHVzaCh7XG4gICAgICAgIGR0cyxcbiAgICAgICAgY3RzLFxuICAgICAgICBwdHMsXG4gICAgICAgIGRhdGE6IGF2Y1NhbXBsZS5kYXRhLFxuICAgICAgICBzaXplOiBhdmNTYW1wbGUuZGF0YS5ieXRlTGVuZ3RoLFxuICAgICAgICBpc0tleWZyYW1lLFxuICAgICAgICBkdXJhdGlvbjogc2FtcGxlRHVyYXRpb24sXG4gICAgICAgIGZsYWdzOiB7XG4gICAgICAgICAgaXNMZWFkaW5nOiAwLFxuICAgICAgICAgIGRlcGVuZHNPbjogaXNLZXlmcmFtZSA/IDIgOiAxLFxuICAgICAgICAgIGlzRGVwZW5kZWRPbjogaXNLZXlmcmFtZSA/IDEgOiAwLFxuICAgICAgICAgIGhhc1JlZHVuZGFuY3k6IDAsXG4gICAgICAgICAgaXNOb25TeW5jOiBpc0tleWZyYW1lID8gMCA6IDFcbiAgICAgICAgfSxcbiAgICAgICAgb3JpZ2luRHRzOiBkdHMsXG4gICAgICAgIHR5cGU6ICd2aWRlbydcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgbGV0IG1vb2ZNZGF0ID0gbmV3IEJ1ZmZlcigpXG4gICAgaWYgKG1wNFNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBtb29mID0gRm1wNC5tb29mKHtcbiAgICAgICAgaWQ6IHRyYWNrLm1ldGEuaWQsXG4gICAgICAgIHRpbWU6IGZpcnN0RHRzLFxuICAgICAgICBzYW1wbGVzOiBtcDRTYW1wbGVzXG4gICAgICB9KVxuICAgICAgY29uc3QgbWRhdCA9IEZtcDQubWRhdChtZGF0Qm94KVxuICAgICAgbW9vZk1kYXQud3JpdGUobW9vZiwgbWRhdClcblxuICAgICAgdGhpcy53cml0ZVRvU291cmNlKCd2aWRlbycsIG1vb2ZNZGF0KVxuICAgIH1cblxuICAgIGlmIChpbml0U2VnbWVudCkge1xuICAgICAgdGhpcy53cml0ZVRvU291cmNlKCd2aWRlbycsIGluaXRTZWdtZW50KVxuXG4gICAgICBpZiAoc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgICAgLy8gc2Vjb25kIHBhcnQgb2Ygc3RyZWFtIGNoYW5nZVxuICAgICAgICB0cmFjay5zYW1wbGVzID0gc2FtcGxlcztcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbXV4VmlkZW8odHJhY2spXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5pc0ZpcnN0VmlkZW8gPSBmYWxzZVxuICAgIHRoaXMuZW1pdChSRU1VWF9FVkVOVFMuTUVESUFfU0VHTUVOVCwgJ3ZpZGVvJylcblxuICAgIGNvbnN0IGxhc3RTYW1wbGUgPSBtcDRTYW1wbGVzW21wNFNhbXBsZXMubGVuZ3RoIC0gMV1cbiAgICB0aGlzLl92aWRlb05leHREdHMgPSBsYXN0U2FtcGxlLmR0cyArIGxhc3RTYW1wbGUuZHVyYXRpb247XG4gICAgdHJhY2suc2FtcGxlcyA9IFtdXG4gICAgdHJhY2subGVuZ3RoID0gMFxuICB9XG5cbiAgX3JlbXV4QXVkaW8gKHRyYWNrKSB7XG4gICAgY29uc3Qge3NhbXBsZXN9ID0gdHJhY2tcbiAgICBsZXQgZmlyc3REdHMgPSAtMVxuICAgIGxldCBtcDRTYW1wbGVzID0gW11cblxuICAgIGxldCBpbml0U2VnbWVudCA9IG51bGxcbiAgICBjb25zdCBtZGF0Qm94ID0ge1xuICAgICAgc2FtcGxlczogW11cbiAgICB9XG4gICAgaWYgKCFzYW1wbGVzIHx8ICFzYW1wbGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGxldCBpc0ZpcnN0RHRzSW5pdGVkID0gZmFsc2VcbiAgICB3aGlsZSAoc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIGxldCBzYW1wbGUgPSBzYW1wbGVzLnNoaWZ0KClcbiAgICAgIGNvbnN0IHsgZGF0YSwgb3B0aW9ucyB9ID0gc2FtcGxlXG4gICAgICBpZiAoIXRoaXMuaXNGaXJzdEF1ZGlvICYmIG9wdGlvbnMgJiYgb3B0aW9ucy5tZXRhKSB7XG4gICAgICAgIGluaXRTZWdtZW50ID0gdGhpcy5yZW11eEluaXRTZWdtZW50KCdhdWRpbycsIG9wdGlvbnMubWV0YSlcbiAgICAgICAgb3B0aW9ucy5tZXRhID0gbnVsbDtcbiAgICAgICAgc2FtcGxlcy51bnNoaWZ0KHNhbXBsZSlcbiAgICAgICAgaWYgKCFvcHRpb25zLmlzQ29udGludWUpIHtcbiAgICAgICAgICB0aGlzLnJlc2V0RHRzQmFzZSgpXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGxldCBkdHMgPSBzYW1wbGUuZHRzIC0gdGhpcy5fZHRzQmFzZVxuICAgICAgY29uc3Qgb3JpZ2luRHRzID0gZHRzXG4gICAgICBpZiAoIWlzRmlyc3REdHNJbml0ZWQpIHtcbiAgICAgICAgZmlyc3REdHMgPSBkdHNcbiAgICAgICAgaXNGaXJzdER0c0luaXRlZCA9IHRydWVcbiAgICAgIH1cblxuICAgICAgbGV0IHNhbXBsZUR1cmF0aW9uID0gMFxuXG4gICAgICBpZiAodGhpcy5hdWRpb01ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZCkge1xuICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IHRoaXMuYXVkaW9NZXRhLnJlZlNhbXBsZUR1cmF0aW9uRml4ZWRcbiAgICAgIH0gZWxzZSBpZiAoc2FtcGxlcy5sZW5ndGggPj0gMSkge1xuICAgICAgICBjb25zdCBuZXh0RHRzID0gc2FtcGxlc1swXS5kdHMgLSB0aGlzLl9kdHNCYXNlO1xuICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IG5leHREdHMgLSBkdHNcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChtcDRTYW1wbGVzLmxlbmd0aCA+PSAxKSB7IC8vIHVzZSBzZWNvbmQgbGFzdCBzYW1wbGUgZHVyYXRpb25cbiAgICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IG1wNFNhbXBsZXNbbXA0U2FtcGxlcy5sZW5ndGggLSAxXS5kdXJhdGlvblxuICAgICAgICB9IGVsc2UgeyAvLyB0aGUgb25seSBvbmUgc2FtcGxlLCB1c2UgcmVmZXJlbmNlIHNhbXBsZSBkdXJhdGlvblxuICAgICAgICAgIHNhbXBsZUR1cmF0aW9uID0gdGhpcy5hdWRpb01ldGEucmVmU2FtcGxlRHVyYXRpb25cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBjb25zb2xlLmxvZygncmVtdXggYXVkaW8gJywgZHRzKVxuICAgICAgdGhpcy5hdWRpb0FsbER1cmF0aW9uICs9IHNhbXBsZUR1cmF0aW9uXG4gICAgICBjb25zdCBtcDRTYW1wbGUgPSB7XG4gICAgICAgIGR0cyxcbiAgICAgICAgcHRzOiBkdHMsXG4gICAgICAgIGN0czogMCxcbiAgICAgICAgc2l6ZTogZGF0YS5ieXRlTGVuZ3RoLFxuICAgICAgICBkdXJhdGlvbjogc2FtcGxlLmR1cmF0aW9uID8gc2FtcGxlLmR1cmF0aW9uIDogc2FtcGxlRHVyYXRpb24sXG4gICAgICAgIGZsYWdzOiB7XG4gICAgICAgICAgaXNMZWFkaW5nOiAwLFxuICAgICAgICAgIGRlcGVuZHNPbjogMixcbiAgICAgICAgICBpc0RlcGVuZGVkT246IDEsXG4gICAgICAgICAgaGFzUmVkdW5kYW5jeTogMCxcbiAgICAgICAgICBpc05vblN5bmM6IDBcbiAgICAgICAgfSxcbiAgICAgICAgaXNLZXlmcmFtZTogdHJ1ZSxcbiAgICAgICAgb3JpZ2luRHRzLFxuICAgICAgICB0eXBlOiAnYXVkaW8nXG4gICAgICB9XG5cbiAgICAgIGxldCBtZGF0U2FtcGxlID0ge1xuICAgICAgICBidWZmZXI6IFtdLFxuICAgICAgICBzaXplOiAwXG4gICAgICB9XG4gICAgICBtZGF0U2FtcGxlLmJ1ZmZlci5wdXNoKGRhdGEpXG4gICAgICBtZGF0U2FtcGxlLnNpemUgKz0gZGF0YS5ieXRlTGVuZ3RoXG5cbiAgICAgIG1kYXRCb3guc2FtcGxlcy5wdXNoKG1kYXRTYW1wbGUpXG5cbiAgICAgIG1wNFNhbXBsZXMucHVzaChtcDRTYW1wbGUpXG4gICAgfVxuXG4gICAgY29uc3QgbW9vZk1kYXQgPSBuZXcgQnVmZmVyKClcblxuICAgIGlmIChtcDRTYW1wbGVzLmxlbmd0aCkge1xuICAgICAgY29uc3QgbW9vZiA9IEZtcDQubW9vZih7XG4gICAgICAgIGlkOiB0cmFjay5tZXRhLmlkLFxuICAgICAgICB0aW1lOiBmaXJzdER0cyxcbiAgICAgICAgc2FtcGxlczogbXA0U2FtcGxlc1xuICAgICAgfSlcbiAgICAgIGNvbnN0IG1kYXQgPSBGbXA0Lm1kYXQobWRhdEJveClcbiAgICAgIG1vb2ZNZGF0LndyaXRlKG1vb2YsIG1kYXQpXG5cbiAgICAgIHRoaXMud3JpdGVUb1NvdXJjZSgnYXVkaW8nLCBtb29mTWRhdClcbiAgICB9XG5cbiAgICBpZiAoaW5pdFNlZ21lbnQpIHtcbiAgICAgIHRoaXMud3JpdGVUb1NvdXJjZSgnYXVkaW8nLCBpbml0U2VnbWVudClcbiAgICAgIGlmIChzYW1wbGVzLmxlbmd0aCkge1xuICAgICAgICAvLyBzZWNvbmQgcGFydCBvZiBzdHJlYW0gY2hhbmdlXG4gICAgICAgIHRyYWNrLnNhbXBsZXMgPSBzYW1wbGVzO1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVtdXhBdWRpbyh0cmFjaylcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmlzRmlyc3RBdWRpbyA9IGZhbHNlXG4gICAgdGhpcy5lbWl0KFJFTVVYX0VWRU5UUy5NRURJQV9TRUdNRU5ULCAnYXVkaW8nLCBtb29mTWRhdClcblxuICAgIGNvbnN0IGxhc3RTYW1wbGUgPSBtcDRTYW1wbGVzW21wNFNhbXBsZXMubGVuZ3RoIC0gMV1cbiAgICB0aGlzLl92aWRlb05leHREdHMgPSBsYXN0U2FtcGxlLmR0cyArIGxhc3RTYW1wbGUuZHVyYXRpb247XG4gICAgdHJhY2suc2FtcGxlcyA9IFtdXG4gICAgdHJhY2subGVuZ3RoID0gMFxuICB9XG5cbiAgd3JpdGVUb1NvdXJjZSAodHlwZSwgYnVmZmVyKSB7XG4gICAgbGV0IHByZXNvdXJjZWJ1ZmZlciA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1BSRV9TT1VSQ0VfQlVGRkVSJyk7XG4gICAgbGV0IHNvdXJjZSA9IHByZXNvdXJjZWJ1ZmZlci5nZXRTb3VyY2UodHlwZSk7XG4gICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgIHNvdXJjZSA9IHByZXNvdXJjZWJ1ZmZlci5jcmVhdGVTb3VyY2UodHlwZSk7XG4gICAgfVxuXG4gICAgc291cmNlLmRhdGEucHVzaChidWZmZXIpXG4gIH1cblxuICBpbml0U2lsZW50QXVkaW8gKGR0cywgZHVyYXRpb24pIHtcbiAgICBjb25zdCB1bml0ID0gTXA0UmVtdXhlci5nZXRTaWxlbnRGcmFtZSh0aGlzLmF1ZGlvTWV0YS5jaGFubmVsQ291bnQpXG4gICAgcmV0dXJuIHtcbiAgICAgIGR0cyxcbiAgICAgIHB0czogZHRzLFxuICAgICAgY3RzOiAwLFxuICAgICAgZHVyYXRpb24sXG4gICAgICB1bml0LFxuICAgICAgc2l6ZTogdW5pdC5ieXRlTGVuZ3RoLFxuICAgICAgb3JpZ2luRHRzOiBkdHMsXG4gICAgICB0eXBlOiAndmlkZW8nXG4gICAgfVxuICB9XG5cbiAgZ2V0IHZpZGVvTWV0YSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpLnZpZGVvVHJhY2subWV0YVxuICB9XG4gIGdldCBhdWRpb01ldGEgKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKS5hdWRpb1RyYWNrLm1ldGFcbiAgfVxuXG4gIHN0YXRpYyBnZXRTaWxlbnRGcmFtZSAoY2hhbm5lbENvdW50KSB7XG4gICAgaWYgKGNoYW5uZWxDb3VudCA9PT0gMSkge1xuICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDAwLCAweGM4LCAweDAwLCAweDgwLCAweDIzLCAweDgwXSlcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gMikge1xuICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDIxLCAweDAwLCAweDQ5LCAweDkwLCAweDAyLCAweDE5LCAweDAwLCAweDIzLCAweDgwXSlcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gMykge1xuICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDAwLCAweGM4LCAweDAwLCAweDgwLCAweDIwLCAweDg0LCAweDAxLCAweDI2LCAweDQwLCAweDA4LCAweDY0LCAweDAwLCAweDhlXSlcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gNCkge1xuICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDAwLCAweGM4LCAweDAwLCAweDgwLCAweDIwLCAweDg0LCAweDAxLCAweDI2LCAweDQwLCAweDA4LCAweDY0LCAweDAwLCAweDgwLCAweDJjLCAweDgwLCAweDA4LCAweDAyLCAweDM4XSlcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gNSkge1xuICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDAwLCAweGM4LCAweDAwLCAweDgwLCAweDIwLCAweDg0LCAweDAxLCAweDI2LCAweDQwLCAweDA4LCAweDY0LCAweDAwLCAweDgyLCAweDMwLCAweDA0LCAweDk5LCAweDAwLCAweDIxLCAweDkwLCAweDAyLCAweDM4XSlcbiAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gNikge1xuICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDAwLCAweGM4LCAweDAwLCAweDgwLCAweDIwLCAweDg0LCAweDAxLCAweDI2LCAweDQwLCAweDA4LCAweDY0LCAweDAwLCAweDgyLCAweDMwLCAweDA0LCAweDk5LCAweDAwLCAweDIxLCAweDkwLCAweDAyLCAweDAwLCAweGIyLCAweDAwLCAweDIwLCAweDA4LCAweGUwXSlcbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIENvbnRleHQ6IHJlcXVpcmUoJy4vc3JjL2NvbnRleHQnKS5kZWZhdWx0LFxuXG4gIC8vIE1vZHVsZXMgZnJvbSBjb25zdGFudHNcbiAgRVZFTlRTOiByZXF1aXJlKCcuL3NyYy9jb25zdGFudHMvZXZlbnRzJykuZGVmYXVsdCxcbiAgV09SS0VSX0NPTU1BTkRTOiByZXF1aXJlKCcuL3NyYy9jb25zdGFudHMvd29ya2VyLWNvbW1hbmRzJykuZGVmYXVsdCxcblxuICAvLyBNb2R1bGVzIGZyb20gZW52XG4gIHNuaWZmZXI6IHJlcXVpcmUoJy4vc3JjL2Vudi9zbmlmZmVyJykuZGVmYXVsdCxcbiAgaXNMZTogcmVxdWlyZSgnLi9zcmMvZW52L2lzbGUnKS5kZWZhdWx0LFxuICBVVEY4OiByZXF1aXJlKCcuL3NyYy9lbnYvdXRmOCcpLmRlZmF1bHQsXG4gIFBhZ2VWaXNpYmlsaXR5OiByZXF1aXJlKCcuL3NyYy9lbnYvUGFnZVZpc2liaWxpdHknKS5kZWZhdWx0LFxuXG4gIC8vIE1vZGVsc1xuICBNZWRpYUluZm86IHJlcXVpcmUoJy4vc3JjL21vZGVscy9tZWRpYS1pbmZvJykuZGVmYXVsdCxcbiAgTWVkaWFTYW1wbGU6IHJlcXVpcmUoJy4vc3JjL21vZGVscy9tZWRpYS1zYW1wbGUnKS5kZWZhdWx0LFxuICBNZWRpYVNlZ21lbnQ6IHJlcXVpcmUoJy4vc3JjL21vZGVscy9tZWRpYS1zZWdtZW50JykuZGVmYXVsdCxcbiAgTWVkaWFTZWdtZW50TGlzdDogcmVxdWlyZSgnLi9zcmMvbW9kZWxzL21lZGlhLXNlZ21lbnQtbGlzdCcpLmRlZmF1bHQsXG4gIEF1ZGlvVHJhY2tNZXRhOiByZXF1aXJlKCcuL3NyYy9tb2RlbHMvdHJhY2stbWV0YScpLkF1ZGlvVHJhY2tNZXRhLFxuICBWaWRlb1RyYWNrTWV0YTogcmVxdWlyZSgnLi9zcmMvbW9kZWxzL3RyYWNrLW1ldGEnKS5WaWRlb1RyYWNrTWV0YSxcbiAgQXVkaW9UcmFja1NhbXBsZTogcmVxdWlyZSgnLi9zcmMvbW9kZWxzL3RyYWNrLXNhbXBsZScpLkF1ZGlvVHJhY2tTYW1wbGUsXG4gIFZpZGVvVHJhY2tTYW1wbGU6IHJlcXVpcmUoJy4vc3JjL21vZGVscy90cmFjay1zYW1wbGUnKS5WaWRlb1RyYWNrU2FtcGxlLFxuXG4gIC8vIE1vZHVsZXMgZnJvbSBtc2VcbiAgTXNlOiByZXF1aXJlKCcuL3NyYy9tc2UvaW5kZXgnKS5kZWZhdWx0LFxuXG4gIC8vIE1vZHVsZXMgZnJvbSB3cml0ZVxuICBTdHJlYW06IHJlcXVpcmUoJy4vc3JjL3dyaXRlL3N0cmVhbScpLmRlZmF1bHQsXG4gIEJ1ZmZlcjogcmVxdWlyZSgnLi9zcmMvd3JpdGUvYnVmZmVyJykuZGVmYXVsdCxcblxuICBNb2JpbGVWaWRlbzogcmVxdWlyZSgnLi9zcmMvbW9iaWxlL21vYmlsZS12aWRlbycpLFxuICAvLyBDcnlwdG9cbiAgQ3J5cHRvOiByZXF1aXJlKCcuL3NyYy9jcnlwdG8nKS5kZWZhdWx0XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChSZXN1bHRDb25zdHJ1Y3Rvcikge1xuICB2YXIgdG90YWxMZW5ndGggPSAwO1xuXG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcnJheXMgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJyYXlzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGFycmF5c1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgIHZhciBhcnIgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgdG90YWxMZW5ndGggKz0gYXJyLmxlbmd0aDtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIHJlc3VsdCA9IG5ldyBSZXN1bHRDb25zdHJ1Y3Rvcih0b3RhbExlbmd0aCk7XG4gIHZhciBvZmZzZXQgPSAwO1xuICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlO1xuICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7XG4gIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gYXJyYXlzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAyOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gKF9zdGVwMiA9IF9pdGVyYXRvcjIubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlKSB7XG4gICAgICB2YXIgX2FyciA9IF9zdGVwMi52YWx1ZTtcblxuICAgICAgcmVzdWx0LnNldChfYXJyLCBvZmZzZXQpO1xuICAgICAgb2Zmc2V0ICs9IF9hcnIubGVuZ3RoO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICBfaXRlcmF0b3JFcnJvcjIgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgJiYgX2l0ZXJhdG9yMi5yZXR1cm4pIHtcbiAgICAgICAgX2l0ZXJhdG9yMi5yZXR1cm4oKTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NvbmNhdCA9IHJlcXVpcmUoJy4vY29uY2F0Jyk7XG5cbnZhciBfY29uY2F0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmNhdCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbm1vZHVsZS5leHBvcnRzID0gX2NvbmNhdDIuZGVmYXVsdDsiLCJmdW5jdGlvbiB3ZWJwYWNrQm9vdHN0cmFwRnVuYyAobW9kdWxlcykge1xuLyoqKioqKi8gIC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovICB2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4vKioqKioqLyAgLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovICBmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbi8qKioqKiovICAgIC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gICAgaWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4vKioqKioqLyAgICAgIHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4vKioqKioqLyAgICAvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gICAgdmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gICAgICBpOiBtb2R1bGVJZCxcbi8qKioqKiovICAgICAgbDogZmFsc2UsXG4vKioqKioqLyAgICAgIGV4cG9ydHM6IHt9XG4vKioqKioqLyAgICB9O1xuXG4vKioqKioqLyAgICAvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovICAgIG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4vKioqKioqLyAgICAvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyAgICBtb2R1bGUubCA9IHRydWU7XG5cbi8qKioqKiovICAgIC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyAgfVxuXG4vKioqKioqLyAgLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovICBfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4vKioqKioqLyAgLy8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovICBfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4vKioqKioqLyAgLy8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuLyoqKioqKi8gIC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuLyoqKioqKi8gICAgaWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuLyoqKioqKi8gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuLyoqKioqKi8gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4vKioqKioqLyAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbi8qKioqKiovICAgICAgICBnZXQ6IGdldHRlclxuLyoqKioqKi8gICAgICB9KTtcbi8qKioqKiovICAgIH1cbi8qKioqKiovICB9O1xuXG4vKioqKioqLyAgLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbi8qKioqKiovICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4vKioqKioqLyAgfTtcblxuLyoqKioqKi8gIC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4vKioqKioqLyAgX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4vKioqKioqLyAgICB2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbi8qKioqKiovICAgICAgZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbi8qKioqKiovICAgICAgZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbi8qKioqKiovICAgIF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbi8qKioqKiovICAgIHJldHVybiBnZXR0ZXI7XG4vKioqKioqLyAgfTtcblxuLyoqKioqKi8gIC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuLyoqKioqKi8gIC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4vKioqKioqLyAgX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbi8qKioqKiovICAvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiAgdmFyIGYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IEVOVFJZX01PRFVMRSlcbiAgcmV0dXJuIGYuZGVmYXVsdCB8fCBmIC8vIHRyeSB0byBjYWxsIGRlZmF1bHQgaWYgZGVmaW5lZCB0byBhbHNvIHN1cHBvcnQgYmFiZWwgZXNtb2R1bGUgZXhwb3J0c1xufVxuXG52YXIgbW9kdWxlTmFtZVJlcUV4cCA9ICdbXFxcXC58XFxcXC18XFxcXCt8XFxcXHd8XFwvfEBdKydcbnZhciBkZXBlbmRlbmN5UmVnRXhwID0gJ1xcXFwoXFxcXHMqKFxcL1xcXFwqLio/XFxcXCpcXC8pP1xcXFxzKi4qPygnICsgbW9kdWxlTmFtZVJlcUV4cCArICcpLio/XFxcXCknIC8vIGFkZGl0aW9uYWwgY2hhcnMgd2hlbiBvdXRwdXQucGF0aGluZm8gaXMgdHJ1ZVxuXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNTkzNjYxLzEzMDQ0MlxuZnVuY3Rpb24gcXVvdGVSZWdFeHAgKHN0cikge1xuICByZXR1cm4gKHN0ciArICcnKS5yZXBsYWNlKC9bLj8qK14kW1xcXVxcXFwoKXt9fC1dL2csICdcXFxcJCYnKVxufVxuXG5mdW5jdGlvbiBpc051bWVyaWMobikge1xuICByZXR1cm4gIWlzTmFOKDEgKiBuKTsgLy8gMSAqIG4gY29udmVydHMgaW50ZWdlcnMsIGludGVnZXJzIGFzIHN0cmluZyAoXCIxMjNcIiksIDFlMyBhbmQgXCIxZTNcIiB0byBpbnRlZ2VycyBhbmQgc3RyaW5ncyB0byBOYU5cbn1cblxuZnVuY3Rpb24gZ2V0TW9kdWxlRGVwZW5kZW5jaWVzIChzb3VyY2VzLCBtb2R1bGUsIHF1ZXVlTmFtZSkge1xuICB2YXIgcmV0dmFsID0ge31cbiAgcmV0dmFsW3F1ZXVlTmFtZV0gPSBbXVxuXG4gIHZhciBmblN0cmluZyA9IG1vZHVsZS50b1N0cmluZygpXG4gIHZhciB3cmFwcGVyU2lnbmF0dXJlID0gZm5TdHJpbmcubWF0Y2goL15mdW5jdGlvblxccz9cXHcqXFwoXFx3KyxcXHMqXFx3KyxcXHMqKFxcdyspXFwpLylcbiAgaWYgKCF3cmFwcGVyU2lnbmF0dXJlKSByZXR1cm4gcmV0dmFsXG4gIHZhciB3ZWJwYWNrUmVxdWlyZU5hbWUgPSB3cmFwcGVyU2lnbmF0dXJlWzFdXG5cbiAgLy8gbWFpbiBidW5kbGUgZGVwc1xuICB2YXIgcmUgPSBuZXcgUmVnRXhwKCcoXFxcXFxcXFxufFxcXFxXKScgKyBxdW90ZVJlZ0V4cCh3ZWJwYWNrUmVxdWlyZU5hbWUpICsgZGVwZW5kZW5jeVJlZ0V4cCwgJ2cnKVxuICB2YXIgbWF0Y2hcbiAgd2hpbGUgKChtYXRjaCA9IHJlLmV4ZWMoZm5TdHJpbmcpKSkge1xuICAgIGlmIChtYXRjaFszXSA9PT0gJ2RsbC1yZWZlcmVuY2UnKSBjb250aW51ZVxuICAgIHJldHZhbFtxdWV1ZU5hbWVdLnB1c2gobWF0Y2hbM10pXG4gIH1cblxuICAvLyBkbGwgZGVwc1xuICByZSA9IG5ldyBSZWdFeHAoJ1xcXFwoJyArIHF1b3RlUmVnRXhwKHdlYnBhY2tSZXF1aXJlTmFtZSkgKyAnXFxcXChcIihkbGwtcmVmZXJlbmNlXFxcXHMoJyArIG1vZHVsZU5hbWVSZXFFeHAgKyAnKSlcIlxcXFwpXFxcXCknICsgZGVwZW5kZW5jeVJlZ0V4cCwgJ2cnKVxuICB3aGlsZSAoKG1hdGNoID0gcmUuZXhlYyhmblN0cmluZykpKSB7XG4gICAgaWYgKCFzb3VyY2VzW21hdGNoWzJdXSkge1xuICAgICAgcmV0dmFsW3F1ZXVlTmFtZV0ucHVzaChtYXRjaFsxXSlcbiAgICAgIHNvdXJjZXNbbWF0Y2hbMl1dID0gX193ZWJwYWNrX3JlcXVpcmVfXyhtYXRjaFsxXSkubVxuICAgIH1cbiAgICByZXR2YWxbbWF0Y2hbMl1dID0gcmV0dmFsW21hdGNoWzJdXSB8fCBbXVxuICAgIHJldHZhbFttYXRjaFsyXV0ucHVzaChtYXRjaFs0XSlcbiAgfVxuXG4gIC8vIGNvbnZlcnQgMWUzIGJhY2sgdG8gMTAwMCAtIHRoaXMgY2FuIGJlIGltcG9ydGFudCBhZnRlciB1Z2xpZnktanMgY29udmVydGVkIDEwMDAgdG8gMWUzXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMocmV0dmFsKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCByZXR2YWxba2V5c1tpXV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIGlmIChpc051bWVyaWMocmV0dmFsW2tleXNbaV1dW2pdKSkge1xuICAgICAgICByZXR2YWxba2V5c1tpXV1bal0gPSAxICogcmV0dmFsW2tleXNbaV1dW2pdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXR2YWxcbn1cblxuZnVuY3Rpb24gaGFzVmFsdWVzSW5RdWV1ZXMgKHF1ZXVlcykge1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHF1ZXVlcylcbiAgcmV0dXJuIGtleXMucmVkdWNlKGZ1bmN0aW9uIChoYXNWYWx1ZXMsIGtleSkge1xuICAgIHJldHVybiBoYXNWYWx1ZXMgfHwgcXVldWVzW2tleV0ubGVuZ3RoID4gMFxuICB9LCBmYWxzZSlcbn1cblxuZnVuY3Rpb24gZ2V0UmVxdWlyZWRNb2R1bGVzIChzb3VyY2VzLCBtb2R1bGVJZCkge1xuICB2YXIgbW9kdWxlc1F1ZXVlID0ge1xuICAgIG1haW46IFttb2R1bGVJZF1cbiAgfVxuICB2YXIgcmVxdWlyZWRNb2R1bGVzID0ge1xuICAgIG1haW46IFtdXG4gIH1cbiAgdmFyIHNlZW5Nb2R1bGVzID0ge1xuICAgIG1haW46IHt9XG4gIH1cblxuICB3aGlsZSAoaGFzVmFsdWVzSW5RdWV1ZXMobW9kdWxlc1F1ZXVlKSkge1xuICAgIHZhciBxdWV1ZXMgPSBPYmplY3Qua2V5cyhtb2R1bGVzUXVldWUpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBxdWV1ZU5hbWUgPSBxdWV1ZXNbaV1cbiAgICAgIHZhciBxdWV1ZSA9IG1vZHVsZXNRdWV1ZVtxdWV1ZU5hbWVdXG4gICAgICB2YXIgbW9kdWxlVG9DaGVjayA9IHF1ZXVlLnBvcCgpXG4gICAgICBzZWVuTW9kdWxlc1txdWV1ZU5hbWVdID0gc2Vlbk1vZHVsZXNbcXVldWVOYW1lXSB8fCB7fVxuICAgICAgaWYgKHNlZW5Nb2R1bGVzW3F1ZXVlTmFtZV1bbW9kdWxlVG9DaGVja10gfHwgIXNvdXJjZXNbcXVldWVOYW1lXVttb2R1bGVUb0NoZWNrXSkgY29udGludWVcbiAgICAgIHNlZW5Nb2R1bGVzW3F1ZXVlTmFtZV1bbW9kdWxlVG9DaGVja10gPSB0cnVlXG4gICAgICByZXF1aXJlZE1vZHVsZXNbcXVldWVOYW1lXSA9IHJlcXVpcmVkTW9kdWxlc1txdWV1ZU5hbWVdIHx8IFtdXG4gICAgICByZXF1aXJlZE1vZHVsZXNbcXVldWVOYW1lXS5wdXNoKG1vZHVsZVRvQ2hlY2spXG4gICAgICB2YXIgbmV3TW9kdWxlcyA9IGdldE1vZHVsZURlcGVuZGVuY2llcyhzb3VyY2VzLCBzb3VyY2VzW3F1ZXVlTmFtZV1bbW9kdWxlVG9DaGVja10sIHF1ZXVlTmFtZSlcbiAgICAgIHZhciBuZXdNb2R1bGVzS2V5cyA9IE9iamVjdC5rZXlzKG5ld01vZHVsZXMpXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG5ld01vZHVsZXNLZXlzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIG1vZHVsZXNRdWV1ZVtuZXdNb2R1bGVzS2V5c1tqXV0gPSBtb2R1bGVzUXVldWVbbmV3TW9kdWxlc0tleXNbal1dIHx8IFtdXG4gICAgICAgIG1vZHVsZXNRdWV1ZVtuZXdNb2R1bGVzS2V5c1tqXV0gPSBtb2R1bGVzUXVldWVbbmV3TW9kdWxlc0tleXNbal1dLmNvbmNhdChuZXdNb2R1bGVzW25ld01vZHVsZXNLZXlzW2pdXSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVxdWlyZWRNb2R1bGVzXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG1vZHVsZUlkLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIHZhciBzb3VyY2VzID0ge1xuICAgIG1haW46IF9fd2VicGFja19tb2R1bGVzX19cbiAgfVxuXG4gIHZhciByZXF1aXJlZE1vZHVsZXMgPSBvcHRpb25zLmFsbCA/IHsgbWFpbjogT2JqZWN0LmtleXMoc291cmNlcy5tYWluKSB9IDogZ2V0UmVxdWlyZWRNb2R1bGVzKHNvdXJjZXMsIG1vZHVsZUlkKVxuXG4gIHZhciBzcmMgPSAnJ1xuXG4gIE9iamVjdC5rZXlzKHJlcXVpcmVkTW9kdWxlcykuZmlsdGVyKGZ1bmN0aW9uIChtKSB7IHJldHVybiBtICE9PSAnbWFpbicgfSkuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlKSB7XG4gICAgdmFyIGVudHJ5TW9kdWxlID0gMFxuICAgIHdoaWxlIChyZXF1aXJlZE1vZHVsZXNbbW9kdWxlXVtlbnRyeU1vZHVsZV0pIHtcbiAgICAgIGVudHJ5TW9kdWxlKytcbiAgICB9XG4gICAgcmVxdWlyZWRNb2R1bGVzW21vZHVsZV0ucHVzaChlbnRyeU1vZHVsZSlcbiAgICBzb3VyY2VzW21vZHVsZV1bZW50cnlNb2R1bGVdID0gJyhmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHsgbW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fOyB9KSdcbiAgICBzcmMgPSBzcmMgKyAndmFyICcgKyBtb2R1bGUgKyAnID0gKCcgKyB3ZWJwYWNrQm9vdHN0cmFwRnVuYy50b1N0cmluZygpLnJlcGxhY2UoJ0VOVFJZX01PRFVMRScsIEpTT04uc3RyaW5naWZ5KGVudHJ5TW9kdWxlKSkgKyAnKSh7JyArIHJlcXVpcmVkTW9kdWxlc1ttb2R1bGVdLm1hcChmdW5jdGlvbiAoaWQpIHsgcmV0dXJuICcnICsgSlNPTi5zdHJpbmdpZnkoaWQpICsgJzogJyArIHNvdXJjZXNbbW9kdWxlXVtpZF0udG9TdHJpbmcoKSB9KS5qb2luKCcsJykgKyAnfSk7XFxuJ1xuICB9KVxuXG4gIHNyYyA9IHNyYyArICduZXcgKCgnICsgd2VicGFja0Jvb3RzdHJhcEZ1bmMudG9TdHJpbmcoKS5yZXBsYWNlKCdFTlRSWV9NT0RVTEUnLCBKU09OLnN0cmluZ2lmeShtb2R1bGVJZCkpICsgJykoeycgKyByZXF1aXJlZE1vZHVsZXMubWFpbi5tYXAoZnVuY3Rpb24gKGlkKSB7IHJldHVybiAnJyArIEpTT04uc3RyaW5naWZ5KGlkKSArICc6ICcgKyBzb3VyY2VzLm1haW5baWRdLnRvU3RyaW5nKCkgfSkuam9pbignLCcpICsgJ30pKShzZWxmKTsnXG5cbiAgdmFyIGJsb2IgPSBuZXcgd2luZG93LkJsb2IoW3NyY10sIHsgdHlwZTogJ3RleHQvamF2YXNjcmlwdCcgfSlcbiAgaWYgKG9wdGlvbnMuYmFyZSkgeyByZXR1cm4gYmxvYiB9XG5cbiAgdmFyIFVSTCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTCB8fCB3aW5kb3cubW96VVJMIHx8IHdpbmRvdy5tc1VSTFxuXG4gIHZhciB3b3JrZXJVcmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpXG4gIHZhciB3b3JrZXIgPSBuZXcgd2luZG93Lldvcmtlcih3b3JrZXJVcmwpXG4gIHdvcmtlci5vYmplY3RVUkwgPSB3b3JrZXJVcmxcblxuICByZXR1cm4gd29ya2VyXG59XG4iLCJjb25zdCBMT0FERVJfRVZFTlRTID0ge1xuICBMQURFUl9TVEFSVDogJ0xPQURFUl9TVEFSVCcsXG4gIExPQURFUl9EQVRBTE9BREVEOiAnTE9BREVSX0RBVEFMT0FERUQnLFxuICBMT0FERVJfQ09NUExFVEU6ICdMT0FERVJfQ09NUExFVEUnLFxuICBMT0FERVJfRVJST1I6ICdMT0FERVJfRVJST1InXG59XG5cbmNvbnN0IERFTVVYX0VWRU5UUyA9IHtcbiAgREVNVVhfU1RBUlQ6ICdERU1VWF9TVEFSVCcsXG4gIERFTVVYX0NPTVBMRVRFOiAnREVNVVhfQ09NUExFVEUnLFxuICBERU1VWF9FUlJPUjogJ0RFTVVYX0VSUk9SJyxcbiAgTUVUQURBVEFfUEFSU0VEOiAnTUVUQURBVEFfUEFSU0VEJyxcbiAgVklERU9fTUVUQURBVEFfQ0hBTkdFOiAnVklERU9fTUVUQURBVEFfQ0hBTkdFJyxcbiAgQVVESU9fTUVUQURBVEFfQ0hBTkdFOiAnQVVESU9fTUVUQURBVEFfQ0hBTkdFJyxcbiAgTUVESUFfSU5GTzogJ01FRElBX0lORk8nXG59XG5cbmNvbnN0IFJFTVVYX0VWRU5UUyA9IHtcbiAgUkVNVVhfTUVUQURBVEE6ICdSRU1VWF9NRVRBREFUQScsXG4gIFJFTVVYX01FRElBOiAnUkVNVVhfTUVESUEnLFxuICBNRURJQV9TRUdNRU5UOiAnTUVESUFfU0VHTUVOVCcsXG4gIFJFTVVYX0VSUk9SOiAnUkVNVVhfRVJST1InLFxuICBJTklUX1NFR01FTlQ6ICdJTklUX1NFR01FTlQnLFxuICBERVRFQ1RfQ0hBTkdFX1NUUkVBTTogJ0RFVEVDVF9DSEFOR0VfU1RSRUFNJ1xufVxuXG5jb25zdCBNU0VfRVZFTlRTID0ge1xuICBTT1VSQ0VfVVBEQVRFX0VORDogJ1NPVVJDRV9VUERBVEVfRU5EJ1xufVxuXG4vLyBobHPkuJPmnIlldmVudHNcbmNvbnN0IEhMU19FVkVOVFMgPSB7XG4gIFJFVFJZX1RJTUVfRVhDRUVERUQ6ICdSRVRSWV9USU1FX0VYQ0VFREVEJ1xufVxuXG5jb25zdCBDUllUT19FVkVOVFMgPSB7XG4gIFNUQVJUX0RFQ1JZUFQ6ICdTVEFSVF9ERUNSWVBUJyxcbiAgREVDUllQVEVEOiAnREVDUllQVEVEJ1xufVxuXG5jb25zdCBCUk9XU0VSX0VWRU5UUyA9IHtcbiAgVklTSUJJTElUWV9DSEFOR0U6ICdWSVNJQklMSVRZX0NIQU5HRSdcbn1cblxuY29uc3QgQUxMRVZFTlRTID0gT2JqZWN0LmFzc2lnbih7fSwgTE9BREVSX0VWRU5UUywgREVNVVhfRVZFTlRTLCBSRU1VWF9FVkVOVFMsIE1TRV9FVkVOVFMsIEhMU19FVkVOVFMsIEJST1dTRVJfRVZFTlRTKVxuXG5jb25zdCBGbHZBbGxvd2VkRXZlbnRzID0gW11cbmNvbnN0IEhsc0FsbG93ZWRFdmVudHMgPSBbXVxuXG5mb3IgKGxldCBrZXkgaW4gQUxMRVZFTlRTKSB7XG4gIGlmIChBTExFVkVOVFMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgIEZsdkFsbG93ZWRFdmVudHMucHVzaChBTExFVkVOVFNba2V5XSlcbiAgfVxufVxuXG5mb3IgKGxldCBrZXkgaW4gQUxMRVZFTlRTKSB7XG4gIGlmIChBTExFVkVOVFMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgIEhsc0FsbG93ZWRFdmVudHMucHVzaChBTExFVkVOVFNba2V5XSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIEFMTEVWRU5UUyxcbiAgSExTX0VWRU5UUyxcbiAgUkVNVVhfRVZFTlRTLFxuICBERU1VWF9FVkVOVFMsXG4gIE1TRV9FVkVOVFMsXG4gIExPQURFUl9FVkVOVFMsXG4gIEZsdkFsbG93ZWRFdmVudHMsXG4gIEhsc0FsbG93ZWRFdmVudHMsXG4gIENSWVRPX0VWRU5UUyxcbiAgQlJPV1NFUl9FVkVOVFNcbn07XG4iLCJleHBvcnQgY29uc3QgQ09OVEVYVF9DT01PTUFORFMgPSB7XG4gIE9OOiAnb24nLFxuICBPTkNFOiAnb25jZScsXG4gIE9GRjogJ29mZicsXG4gIEVNSVQ6ICdlbWl0JyxcbiAgREVTVFJPWTogJ2Rlc3Ryb3knXG59XG4iLCJpbXBvcnQgTWVkaWFJbmZvIGZyb20gJy4vbW9kZWxzL21lZGlhLWluZm8nXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnXG5cbmNvbnN0IERJUkVDVF9FTUlUX0ZMQUcgPSAnX19UT19fJ1xuXG5jbGFzcyBDb250ZXh0IHtcbiAgY29uc3RydWN0b3IgKGFsbG93ZWRFdmVudHMgPSBbXSkge1xuICAgIHRoaXMuX2VtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKClcbiAgICB0aGlzLl9pbnN0YW5jZU1hcCA9IHt9IC8vIOaJgOacieeahOino+eggea1geeoi+WunuS+i1xuICAgIHRoaXMuX2Nsc01hcCA9IHt9IC8vIOaehOmAoOWHveaVsOeahG1hcFxuICAgIHRoaXMuX2luaXRlZCA9IGZhbHNlXG4gICAgdGhpcy5tZWRpYUluZm8gPSBuZXcgTWVkaWFJbmZvKClcbiAgICB0aGlzLmFsbG93ZWRFdmVudHMgPSBhbGxvd2VkRXZlbnRzXG4gICAgdGhpcy5faG9va3MgPSB7fSAvLyDms6jlhozlnKjkuovku7bliY0v5ZCO55qE6ZKp5a2Q77yM5L6L5aaCIGJlZm9yZSgnREVNVVhfQ09NUExFVEUnKVxuICB9XG5cbiAgLyoqXG4gICAqIOS7juS4iuS4i+aWh+S4reiOt+WPluino+eggea1geeoi+WunuS+i++8jOWmguaenOayoeacieWunuS+i++8jOaehOmAoOS4gOS4qlxuICAgKiBAcGFyYW0gdGFnXG4gICAqIEBwYXJhbSBhcmdzXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0SW5zdGFuY2UgKHRhZykge1xuICAgIGNvbnN0IGluc3RhbmNlID0gdGhpcy5faW5zdGFuY2VNYXBbdGFnXVxuICAgIGlmIChpbnN0YW5jZSkge1xuICAgICAgcmV0dXJuIGluc3RhbmNlXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRocm93IG5ldyBFcnJvcihgJHt0YWd95a6e5L6L5bCa5pyq5Yid5aeL5YyWYClcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOWIneWni+WMluWFt+S9k+WunuS+i1xuICAgKiBAcGFyYW0gdGFnXG4gICAqIEBwYXJhbSBhcmdzXG4gICAqL1xuICBpbml0SW5zdGFuY2UgKHRhZywgLi4uYXJncykge1xuICAgIGlmICh0aGlzLl9jbHNNYXBbdGFnXSkge1xuICAgICAgY29uc3QgbmV3SW5zdGFuY2UgPSBuZXcgdGhpcy5fY2xzTWFwW3RhZ10oLi4uYXJncylcbiAgICAgIHRoaXMuX2luc3RhbmNlTWFwW3RhZ10gPSBuZXdJbnN0YW5jZVxuICAgICAgaWYgKG5ld0luc3RhbmNlLmluaXQpIHtcbiAgICAgICAgbmV3SW5zdGFuY2UuaW5pdCgpIC8vIFRPRE86IGxpZmVjaXJjbGVcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXdJbnN0YW5jZVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dGFnfeacquWcqGNvbnRleHTkuK3ms6jlhoxgKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDpgb/lhY3lpKfph4/nmoRpbml0SW5zdGFuY2XosIPnlKjvvIzliJ3lp4vljJbmiYDmnInnmoTnu4Tku7ZcbiAgICogQHBhcmFtIGNvbmZpZ1xuICAgKi9cbiAgaW5pdCAoY29uZmlnKSB7XG4gICAgaWYgKHRoaXMuX2luaXRlZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGZvciAobGV0IHRhZyBpbiB0aGlzLl9jbHNNYXApIHtcbiAgICAgIC8vIGlmIG5vdCBpbml0ZWQsIGluaXQgYW4gaW5zdGFuY2VcbiAgICAgIGlmICh0aGlzLl9jbHNNYXAuaGFzT3duUHJvcGVydHkodGFnKSAmJiAhdGhpcy5faW5zdGFuY2VNYXBbdGFnXSkge1xuICAgICAgICB0aGlzLmluaXRJbnN0YW5jZSh0YWcsIGNvbmZpZylcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5faW5pdGVkID0gdHJ1ZVxuICB9XG5cbiAgLyoqXG4gICAqIOazqOWGjOS4gOS4quS4iuS4i+aWh+a1geeoi++8jOaPkOS+m+WuieWFqOeahOS6i+S7tuWPkemAgeacuuWItlxuICAgKiBAcGFyYW0gdGFnXG4gICAqIEBwYXJhbSBjbHNcbiAgICovXG4gIHJlZ2lzdHJ5ICh0YWcsIGNscykge1xuICAgIGNvbnN0IGVtaXR0ZXIgPSB0aGlzLl9lbWl0dGVyXG4gICAgY29uc3QgY2hlY2tNZXNzYWdlTmFtZSA9IHRoaXMuX2lzTWVzc2FnZU5hbWVWYWxpZC5iaW5kKHRoaXMpXG4gICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICBjb25zdCBlbmhhbmNlZCA9IGNsYXNzIGV4dGVuZHMgY2xzIHtcbiAgICAgIGNvbnN0cnVjdG9yICguLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0ge31cbiAgICAgICAgdGhpcy5vbmNlTGlzdGVuZXJzID0ge31cbiAgICAgICAgdGhpcy5UQUcgPSB0YWdcbiAgICAgICAgdGhpcy5fY29udGV4dCA9IHNlbGZcbiAgICAgIH1cblxuICAgICAgb24gKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaykge1xuICAgICAgICBjaGVja01lc3NhZ2VOYW1lKG1lc3NhZ2VOYW1lKVxuXG4gICAgICAgIGlmICh0aGlzLmxpc3RlbmVyc1ttZXNzYWdlTmFtZV0pIHtcbiAgICAgICAgICB0aGlzLmxpc3RlbmVyc1ttZXNzYWdlTmFtZV0ucHVzaChjYWxsYmFjaylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxpc3RlbmVyc1ttZXNzYWdlTmFtZV0gPSBbY2FsbGJhY2tdXG4gICAgICAgIH1cblxuICAgICAgICBlbWl0dGVyLm9uKGAke21lc3NhZ2VOYW1lfSR7RElSRUNUX0VNSVRfRkxBR30ke3RhZ31gLCBjYWxsYmFjaykgLy8g5bu656uL5a6a5ZCR6YCa5L+h55uR5ZCsXG4gICAgICAgIHJldHVybiBlbWl0dGVyLm9uKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaylcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiDlnKjmn5DkuKrkuovku7bop6blj5HliY3miafooYxcbiAgICAgICAqIEBwYXJhbSBtZXNzYWdlTmFtZVxuICAgICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICAgKi9cbiAgICAgIGJlZm9yZSAobWVzc2FnZU5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNoZWNrTWVzc2FnZU5hbWUobWVzc2FnZU5hbWUpXG4gICAgICAgIGlmIChzZWxmLl9ob29rc1ttZXNzYWdlTmFtZV0pIHtcbiAgICAgICAgICBzZWxmLl9ob29rc1ttZXNzYWdlTmFtZV0ucHVzaChjYWxsYmFjaylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWxmLl9ob29rc1ttZXNzYWdlTmFtZV0gPSBbY2FsbGJhY2tdXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgb25jZSAobWVzc2FnZU5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNoZWNrTWVzc2FnZU5hbWUobWVzc2FnZU5hbWUpXG5cbiAgICAgICAgaWYgKHRoaXMub25jZUxpc3RlbmVyc1ttZXNzYWdlTmFtZV0pIHtcbiAgICAgICAgICB0aGlzLm9uY2VMaXN0ZW5lcnNbbWVzc2FnZU5hbWVdLnB1c2goY2FsbGJhY2spXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5vbmNlTGlzdGVuZXJzW21lc3NhZ2VOYW1lXSA9IFtjYWxsYmFja11cbiAgICAgICAgfVxuXG4gICAgICAgIGVtaXR0ZXIub25jZShgJHttZXNzYWdlTmFtZX0ke0RJUkVDVF9FTUlUX0ZMQUd9JHt0YWd9YCwgY2FsbGJhY2spXG4gICAgICAgIHJldHVybiBlbWl0dGVyLm9uY2UobWVzc2FnZU5hbWUsIGNhbGxiYWNrKVxuICAgICAgfVxuXG4gICAgICBlbWl0IChtZXNzYWdlTmFtZSwgLi4uYXJncykge1xuICAgICAgICBjaGVja01lc3NhZ2VOYW1lKG1lc3NhZ2VOYW1lKVxuXG4gICAgICAgIGNvbnN0IGJlZm9yZUxpc3QgPSBzZWxmLl9ob29rcyA/IHNlbGYuX2hvb2tzW21lc3NhZ2VOYW1lXSA6IG51bGxcblxuICAgICAgICBpZiAoYmVmb3JlTGlzdCkge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBiZWZvcmVMaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IGJlZm9yZUxpc3RbaV1cbiAgICAgICAgICAgIGNhbGxiYWNrKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVtaXR0ZXIuZW1pdChtZXNzYWdlTmFtZSwgLi4uYXJncylcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiDlrprlkJHlj5HpgIHnu5nmn5DkuKrnu4Tku7bljZXkvovnmoTmtojmga9cbiAgICAgICAqIEBwYXJhbSBtZXNzYWdlTmFtZVxuICAgICAgICogQHBhcmFtIGFyZ3NcbiAgICAgICAqL1xuICAgICAgZW1pdFRvICh0YWcsIG1lc3NhZ2VOYW1lLCAuLi5hcmdzKSB7XG4gICAgICAgIGNoZWNrTWVzc2FnZU5hbWUobWVzc2FnZU5hbWUpXG5cbiAgICAgICAgcmV0dXJuIGVtaXR0ZXIuZW1pdChgJHttZXNzYWdlTmFtZX0ke0RJUkVDVF9FTUlUX0ZMQUd9JHt0YWd9YCwgLi4uYXJncylcbiAgICAgIH1cblxuICAgICAgb2ZmIChtZXNzYWdlTmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgY2hlY2tNZXNzYWdlTmFtZShtZXNzYWdlTmFtZSlcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXIub2ZmKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaylcbiAgICAgIH1cblxuICAgICAgcmVtb3ZlTGlzdGVuZXJzICgpIHtcbiAgICAgICAgY29uc3QgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5iaW5kKHRoaXMubGlzdGVuZXJzKVxuXG4gICAgICAgIGZvciAobGV0IG1lc3NhZ2VOYW1lIGluIHRoaXMubGlzdGVuZXJzKSB7XG4gICAgICAgICAgaWYgKGhhc093bihtZXNzYWdlTmFtZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMubGlzdGVuZXJzW21lc3NhZ2VOYW1lXSB8fCBbXVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSBjYWxsYmFja3NbaV1cbiAgICAgICAgICAgICAgZW1pdHRlci5vZmYobWVzc2FnZU5hbWUsIGNhbGxiYWNrKVxuICAgICAgICAgICAgICBlbWl0dGVyLm9mZihgJHttZXNzYWdlTmFtZX0ke0RJUkVDVF9FTUlUX0ZMQUd9JHt0YWd9YCwgY2FsbGJhY2spXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgbWVzc2FnZU5hbWUgaW4gdGhpcy5vbmNlTGlzdGVuZXJzKSB7XG4gICAgICAgICAgaWYgKGhhc093bihtZXNzYWdlTmFtZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMub25jZUxpc3RlbmVyc1ttZXNzYWdlTmFtZV0gfHwgW11cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrID0gY2FsbGJhY2tzW2ldXG4gICAgICAgICAgICAgIGVtaXR0ZXIub2ZmKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaylcbiAgICAgICAgICAgICAgZW1pdHRlci5vZmYoYCR7bWVzc2FnZU5hbWV9JHtESVJFQ1RfRU1JVF9GTEFHfSR7dGFnfWAsIGNhbGxiYWNrKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIOWcqOe7hOS7tumUgOavgeaXtu+8jOm7mOiupOWwhuWug+azqOWGjOeahOS6i+S7tuWFqOmDqOWNuOi9ve+8jOehruS/neS4jeS8mumAoOaIkOWGheWtmOazhOa8j1xuICAgICAgICovXG4gICAgICBkZXN0cm95ICgpIHtcbiAgICAgICAgLy8gc3RlcDEgdW5saXN0ZW4gZXZlbnRzXG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXJzKClcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSB7fVxuXG4gICAgICAgIC8vIHN0ZXAyIHJlbGVhc2UgZnJvbSBjb250ZXh0XG4gICAgICAgIGRlbGV0ZSBzZWxmLl9pbnN0YW5jZU1hcFt0YWddXG4gICAgICAgIGlmIChzdXBlci5kZXN0cm95KSB7XG4gICAgICAgICAgcmV0dXJuIHN1cGVyLmRlc3Ryb3koKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2Nsc01hcFt0YWddID0gZW5oYW5jZWRcblxuICAgIC8qKlxuICAgICAqIGdldCBpbnN0YW5jZSBpbW1lZGlhdGVseVxuICAgICAqIGUuZyBjb25zdCBpbnN0YW5jZSA9IGNvbnRleHQucmVnaXN0cnkodGFnLCBDbHMpKGNvbmZpZylcbiAgICAgKiAqL1xuICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaW5pdEluc3RhbmNlKHRhZywgLi4uYXJncylcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog5a+55a2Y5Zyo55qE5a6e5L6L6L+b6KGMXG4gICAqL1xuICBkZXN0cm95SW5zdGFuY2VzICgpIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLl9pbnN0YW5jZU1hcCkuZm9yRWFjaCgodGFnKSA9PiB7XG4gICAgICBpZiAodGhpcy5faW5zdGFuY2VNYXBbdGFnXS5kZXN0cm95KSB7XG4gICAgICAgIHRoaXMuX2luc3RhbmNlTWFwW3RhZ10uZGVzdHJveSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiDnvJbop6PnoIHmtYHnqIvml6DpnIDlhbPms6jkuovku7bnmoTop6Pnu5FcbiAgICovXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuX2VtaXR0ZXIgPSBudWxsXG4gICAgdGhpcy5hbGxvd2VkRXZlbnRzID0gW11cbiAgICB0aGlzLl9jbHNNYXAgPSBudWxsXG4gICAgdGhpcy5fY29udGV4dCA9IG51bGxcbiAgICB0aGlzLl9ob29rcyA9IG51bGxcbiAgICB0aGlzLmRlc3Ryb3lJbnN0YW5jZXMoKVxuICB9XG5cbiAgLyoqXG4gICAqIOWvueS/oemBk+i/m+ihjOaUtuaLolxuICAgKiBAcGFyYW0gbWVzc2FnZU5hbWVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9pc01lc3NhZ2VOYW1lVmFsaWQgKG1lc3NhZ2VOYW1lKSB7XG4gICAgaWYgKCF0aGlzLmFsbG93ZWRFdmVudHMuaW5kZXhPZihtZXNzYWdlTmFtZSkgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVucmVnaXN0ZXJlZCBtZXNzYWdlIG5hbWU6ICR7bWVzc2FnZU5hbWV9YClcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29udGV4dFxuIiwiaW1wb3J0IEVWRU5UUyBmcm9tICcuLi9jb25zdGFudHMvZXZlbnRzJztcbmNvbnN0IENSWVRPX0VWRU5UUyA9IEVWRU5UUy5DUllUT19FVkVOVFNcbmNsYXNzIENyeXB0byB7XG4gICAgY29uc3RydWN0b3IoY29uZmlnKSB7XG4gICAgICAgIHRoaXMuaW5wdXRCdWZmZXIgPSBjb25maWcuaW5wdXRidWZmZXI7XG4gICAgICAgIHRoaXMub3V0cHV0QnVmZmVyID0gY29uZmlnLm91dHB1dGJ1ZmZlcjtcbiAgICAgICAgdGhpcy5rZXkgPSBjb25maWcua2V5O1xuICAgICAgICB0aGlzLml2ID0gY29uZmlnLml2O1xuICAgICAgICB0aGlzLm1ldGhvZCA9IGNvbmZpZy5tZXRob2Q7XG5cbiAgICAgICAgdGhpcy5jcnlwdG8gPSAgd2luZG93LmNyeXB0byB8fCB3aW5kb3cubXNDcnlwdG9cbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLm9uKENSWVRPX0VWRU5UUy5TVEFSVF9ERUNSWVBULCB0aGlzLmRlY3JpcHQuYmluZCh0aGlzKSk7XG4gICAgfVxuICAgIFxuICAgIGRlY3JpcHQoKSB7XG4gICAgICAgIGlmKCF0aGlzLmFlc2tleSkge1xuICAgICAgICAgICAgbGV0IHNia2V5ID0gdGhpcy5jcnlwdG8uc3VidGxlLmltcG9ydEtleSgncmF3JywgdGhpcy5rZXkuYnVmZmVyLCB7IG5hbWU6ICdBRVMtQ0JDJyB9LCBmYWxzZSwgWydlbmNyeXB0JywgJ2RlY3J5cHQnXSk7XG4gICAgICAgICAgICBzYmtleS50aGVuKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZXNrZXkgPSBrZXk7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWNyaXB0RGF0YSgpO1xuICAgICAgICAgICAgfSkgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRlY3JpcHREYXRhKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWNyaXB0RGF0YSgpIHtcbiAgICAgICAgbGV0IGlucHV0YnVmZmVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSh0aGlzLmlucHV0QnVmZmVyKTtcbiAgICAgICAgbGV0IG91dHB1dGJ1ZmZlciA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UodGhpcy5vdXRwdXRCdWZmZXIpO1xuICAgICAgICBsZXQgZGF0YSA9IGlucHV0YnVmZmVyLnNoaWZ0KCk7XG4gICAgICAgIGlmKGRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuY3J5cHRvLnN1YnRsZS5kZWNyeXB0KHsgbmFtZTogJ0FFUy1DQkMnLCBpdjogdGhpcy5pdi5idWZmZXIgfSwgdGhpcy5hZXNrZXksIGRhdGEpLnRoZW4ocmVzPT57XG4gICAgICAgICAgICAgICAgb3V0cHV0YnVmZmVyLnB1c2gobmV3IFVpbnQ4QXJyYXkocmVzKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KENSWVRPX0VWRU5UUy5ERUNSWVBURUQpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGVjcmlwdERhdGEoZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IENyeXB0bzsiLCJpbXBvcnQgRXZlbnRzIGZyb20gJy4uL2NvbnN0YW50cy9ldmVudHMnXG5jb25zdCBCUk9XU0VSX0VWRU5UUyA9IEV2ZW50cy5CUk9XU0VSX0VWRU5UU1xuXG5sZXQgaGlkZGVuO1xubGV0IHZpc2liaWxpdHlDaGFuZ2U7XG5pZiAodHlwZW9mIGRvY3VtZW50LmhpZGRlbiAhPT0gJ3VuZGVmaW5lZCcpIHsgLy8gT3BlcmEgMTIuMTAgYW5kIEZpcmVmb3ggMTggYW5kIGxhdGVyIHN1cHBvcnRcbiAgaGlkZGVuID0gJ2hpZGRlbic7XG4gIHZpc2liaWxpdHlDaGFuZ2UgPSAndmlzaWJpbGl0eWNoYW5nZSc7XG59IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudC5tc0hpZGRlbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgaGlkZGVuID0gJ21zSGlkZGVuJztcbiAgdmlzaWJpbGl0eUNoYW5nZSA9ICdtc3Zpc2liaWxpdHljaGFuZ2UnO1xufSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQud2Via2l0SGlkZGVuICE9PSAndW5kZWZpbmVkJykge1xuICBoaWRkZW4gPSAnd2Via2l0SGlkZGVuJztcbiAgdmlzaWJpbGl0eUNoYW5nZSA9ICd3ZWJraXR2aXNpYmlsaXR5Y2hhbmdlJztcbn1cblxuY2xhc3MgUGFnZVZpc2liaWxpdHkge1xuXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLmNhbGxiYWNrcyA9IHtcbiAgICAgIG9uU2hvdzogW10sXG4gICAgICBvbkhpZGRlbjogW11cbiAgICB9XG4gICAgdGhpcy5oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlID0gdGhpcy5oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlLmJpbmQodGhpcylcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIodmlzaWJpbGl0eUNoYW5nZSwgdGhpcy5oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlLCBmYWxzZSk7XG4gIH1cblxuICBoYW5kbGVWaXNpYmlsaXR5Q2hhbmdlICgpIHtcbiAgICB0aGlzLmVtaXQoQlJPV1NFUl9FVkVOVFMuVklTSUJJTElUWV9DSEFOR0UsIGRvY3VtZW50W2hpZGRlbl0pXG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHZpc2liaWxpdHlDaGFuZ2UsIHRoaXMuaGFuZGxlVmlzaWJpbGl0eUNoYW5nZSk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBQYWdlVmlzaWJpbGl0eTtcbiIsImNvbnN0IGxlID0gKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgYnVmID0gbmV3IEFycmF5QnVmZmVyKDIpO1xuICAobmV3IERhdGFWaWV3KGJ1ZikpLnNldEludDE2KDAsIDI1NiwgdHJ1ZSkgLy8gbGl0dGxlLWVuZGlhbiB3cml0ZVxuICByZXR1cm4gKG5ldyBJbnQxNkFycmF5KGJ1ZikpWzBdID09PSAyNTYgLy8gcGxhdGZvcm0tc3BlYyByZWFkLCBpZiBlcXVhbCB0aGVuIExFXG59KSgpXG5cbmV4cG9ydCBkZWZhdWx0IGxlXG4iLCJjb25zdCBsZSA9IChmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcigyKTtcbiAgKG5ldyBEYXRhVmlldyhidWYpKS5zZXRJbnQxNigwLCAyNTYsIHRydWUpIC8vIGxpdHRsZS1lbmRpYW4gd3JpdGVcbiAgcmV0dXJuIChuZXcgSW50MTZBcnJheShidWYpKVswXSA9PT0gMjU2IC8vIHBsYXRmb3JtLXNwZWMgcmVhZCwgaWYgZXF1YWwgdGhlbiBMRVxufSkoKVxuXG5jb25zdCBzbmlmZmVyID0ge1xuICBnZXQgZGV2aWNlICgpIHtcbiAgICBsZXQgciA9IHNuaWZmZXIub3M7XG4gICAgcmV0dXJuIHIuaXNQYyA/ICdwYycgOiByLmlzVGFibGV0ID8gJ3RhYmxldCcgOiAnbW9iaWxlJztcbiAgfSxcbiAgZ2V0IGJyb3dzZXIgKCkge1xuICAgIGxldCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbiAgICBsZXQgcmVnID0ge1xuICAgICAgaWU6IC9ydjooW1xcZC5dKylcXCkgbGlrZSBnZWNrby8sXG4gICAgICBmaXJmb3g6IC9maXJlZm94XFwvKFtcXGQuXSspLyxcbiAgICAgIGNocm9tZTogL2Nocm9tZVxcLyhbXFxkLl0rKS8sXG4gICAgICBvcGVyYTogL29wZXJhLihbXFxkLl0rKS8sXG4gICAgICBzYWZhcmk6IC92ZXJzaW9uXFwvKFtcXGQuXSspLipzYWZhcmkvXG4gICAgfTtcbiAgICByZXR1cm4gW10uY29uY2F0KE9iamVjdC5rZXlzKHJlZykuZmlsdGVyKGtleSA9PiByZWdba2V5XS50ZXN0KHVhKSkpWzBdO1xuICB9LFxuICBnZXQgb3MgKCkge1xuICAgIGxldCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnRcbiAgICBsZXQgaXNXaW5kb3dzUGhvbmUgPSAvKD86V2luZG93cyBQaG9uZSkvLnRlc3QodWEpXG4gICAgbGV0IGlzU3ltYmlhbiA9IC8oPzpTeW1iaWFuT1MpLy50ZXN0KHVhKSB8fCBpc1dpbmRvd3NQaG9uZTtcbiAgICBsZXQgaXNBbmRyb2lkID0gLyg/OkFuZHJvaWQpLy50ZXN0KHVhKTtcbiAgICBsZXQgaXNGaXJlRm94ID0gLyg/OkZpcmVmb3gpLy50ZXN0KHVhKTtcbiAgICBsZXQgaXNUYWJsZXQgPSAvKD86aVBhZHxQbGF5Qm9vaykvLnRlc3QodWEpIHx8IChpc0FuZHJvaWQgJiYgIS8oPzpNb2JpbGUpLy50ZXN0KHVhKSkgfHwgKGlzRmlyZUZveCAmJiAvKD86VGFibGV0KS8udGVzdCh1YSkpO1xuICAgIGxldCBpc1Bob25lID0gLyg/OmlQaG9uZSkvLnRlc3QodWEpICYmICFpc1RhYmxldDtcbiAgICBsZXQgaXNQYyA9ICFpc1Bob25lICYmICFpc0FuZHJvaWQgJiYgIWlzU3ltYmlhbjtcbiAgICByZXR1cm4ge1xuICAgICAgaXNUYWJsZXQsXG4gICAgICBpc1Bob25lLFxuICAgICAgaXNBbmRyb2lkLFxuICAgICAgaXNQYyxcbiAgICAgIGlzU3ltYmlhbixcbiAgICAgIGlzV2luZG93c1Bob25lLFxuICAgICAgaXNGaXJlRm94XG4gICAgfTtcbiAgfSxcblxuICBnZXQgaXNMZSAoKSB7XG4gICAgcmV0dXJuIGxlXG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNuaWZmZXI7XG4iLCJjbGFzcyBVVEY4IHtcbiAgc3RhdGljIGRlY29kZSAodWludDhhcnJheSkge1xuICAgIGNvbnN0IG91dCA9IFtdO1xuICAgIGNvbnN0IGlucHV0ID0gdWludDhhcnJheTtcbiAgICBsZXQgaSA9IDA7XG4gICAgY29uc3QgbGVuZ3RoID0gdWludDhhcnJheS5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaSA8IGxlbmd0aCkge1xuICAgICAgaWYgKGlucHV0W2ldIDwgMHg4MCkge1xuICAgICAgICBvdXQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGlucHV0W2ldKSk7XG4gICAgICAgICsraTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9IGVsc2UgaWYgKGlucHV0W2ldIDwgMHhDMCkge1xuICAgICAgICAvLyBmYWxsdGhyb3VnaFxuICAgICAgfSBlbHNlIGlmIChpbnB1dFtpXSA8IDB4RTApIHtcbiAgICAgICAgaWYgKFVURjguX2NoZWNrQ29udGludWF0aW9uKGlucHV0LCBpLCAxKSkge1xuICAgICAgICAgIGNvbnN0IHVjczQgPSAoaW5wdXRbaV0gJiAweDFGKSA8PCA2IHwgKGlucHV0W2kgKyAxXSAmIDB4M0YpO1xuICAgICAgICAgIGlmICh1Y3M0ID49IDB4ODApIHtcbiAgICAgICAgICAgIG91dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUodWNzNCAmIDB4RkZGRikpO1xuICAgICAgICAgICAgaSArPSAyO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGlucHV0W2ldIDwgMHhGMCkge1xuICAgICAgICBpZiAoVVRGOC5fY2hlY2tDb250aW51YXRpb24oaW5wdXQsIGksIDIpKSB7XG4gICAgICAgICAgY29uc3QgdWNzNCA9IChpbnB1dFtpXSAmIDB4RikgPDwgMTIgfCAoaW5wdXRbaSArIDFdICYgMHgzRikgPDwgNiB8IGlucHV0W2kgKyAyXSAmIDB4M0Y7XG4gICAgICAgICAgaWYgKHVjczQgPj0gMHg4MDAgJiYgKHVjczQgJiAweEY4MDApICE9PSAweEQ4MDApIHtcbiAgICAgICAgICAgIG91dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUodWNzNCAmIDB4RkZGRikpO1xuICAgICAgICAgICAgaSArPSAzO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGlucHV0W2ldIDwgMHhGOCkge1xuICAgICAgICBpZiAoVVRGOC5fY2hlY2tDb250aW51YXRpb24oaW5wdXQsIGksIDMpKSB7XG4gICAgICAgICAgbGV0IHVjczQgPSAoaW5wdXRbaV0gJiAweDcpIDw8IDE4IHwgKGlucHV0W2kgKyAxXSAmIDB4M0YpIDw8IDEyIHxcbiAgICAgICAgICAgICAgICAgICAgKGlucHV0W2kgKyAyXSAmIDB4M0YpIDw8IDYgfCAoaW5wdXRbaSArIDNdICYgMHgzRik7XG4gICAgICAgICAgaWYgKHVjczQgPiAweDEwMDAwICYmIHVjczQgPCAweDExMDAwMCkge1xuICAgICAgICAgICAgdWNzNCAtPSAweDEwMDAwO1xuICAgICAgICAgICAgb3V0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgodWNzNCA+Pj4gMTApIHwgMHhEODAwKSk7XG4gICAgICAgICAgICBvdXQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKCh1Y3M0ICYgMHgzRkYpIHwgMHhEQzAwKSk7XG4gICAgICAgICAgICBpICs9IDQ7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG91dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoMHhGRkZEKSk7XG4gICAgICArK2k7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dC5qb2luKCcnKTtcbiAgfVxuXG4gIHN0YXRpYyBfY2hlY2tDb250aW51YXRpb24gKHVpbnQ4YXJyYXksIHN0YXJ0LCBjaGVja0xlbmd0aCkge1xuICAgIGxldCBhcnJheSA9IHVpbnQ4YXJyYXk7XG4gICAgaWYgKHN0YXJ0ICsgY2hlY2tMZW5ndGggPCBhcnJheS5sZW5ndGgpIHtcbiAgICAgIHdoaWxlIChjaGVja0xlbmd0aC0tKSB7XG4gICAgICAgIGlmICgoYXJyYXlbKytzdGFydF0gJiAweEMwKSAhPT0gMHg4MCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVVRGODtcbiIsImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnZXZlbnRzJ1xuY2xhc3MgQXVkaW9DdHggZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvciAoY29uZmlnKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZyk7XG4gICAgbGV0IEF1ZGlvQ29udGV4dCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dDtcbiAgICB0aGlzLmNvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XG4gICAgdGhpcy5nYWluTm9kZSA9IHRoaXMuY29udGV4dC5jcmVhdGVHYWluKCk7XG4gICAgdGhpcy5nYWluTm9kZS5jb25uZWN0KHRoaXMuY29udGV4dC5kZXN0aW5hdGlvbik7XG4gICAgdGhpcy5tZXRhID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc2FtcGxlcyA9IFtdO1xuICAgIHRoaXMucHJlbG9hZFRpbWUgPSB0aGlzLmNvbmZpZy5wcmVsb2FkVGltZSB8fCAzO1xuICAgIHRoaXMuZHVyYXRpb24gPSAwO1xuXG4gICAgdGhpcy5fY3VycmVudEJ1ZmZlciA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9uZXh0QnVmZmVyID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2xhc3RwdHMgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fcHJlRGVjb2RlID0gW107XG4gICAgdGhpcy5fY3VycmVudFRpbWUgPSAwO1xuICAgIHRoaXMuX2RlY29kaW5nID0gZmFsc2U7XG4gICAgdGhpcy5fdm9sdW1lID0gdGhpcy5jb25maWcudm9sdW1lIHx8IDAuNlxuICAgIC8vIOiusOW9leWklumDqOS8oOi+k+eahOeKtuaAgVxuICAgIHRoaXMuX3BsYXllZCA9IGZhbHNlO1xuICAgIHRoaXMucGxheUZpbmlzaCA9IG51bGw7IC8vIHBlbmRpbmcgcGxheSB0YXNrXG4gICAgdGhpcy53YWl0TmV4dElEID0gbnVsbDsgLy8gYXVkaW8gc291cmNlIGVuZCBhbmQgbmV4dCBzb3VyY2Ugbm90IGxvYWRlZFxuICB9XG5cbiAgZ2V0IGN1cnJlbnRUaW1lICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFRpbWU7XG4gIH1cblxuICBkZWNvZGVBdWRpbyAoYXVkaW9UcmFjaykge1xuICAgIGxldCB7c2FtcGxlc30gPSBhdWRpb1RyYWNrO1xuICAgIGxldCBkYXRhID0gc2FtcGxlcztcbiAgICBhdWRpb1RyYWNrLnNhbXBsZXMgPSBbXTtcbiAgICB0aGlzLnNldEF1ZGlvRGF0YShkYXRhKTtcbiAgfVxuICBzZXRBdWRpb0RhdGEgKGRhdGEpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRhdGFbaV0ucHRzID0gKGRhdGFbaV0ucHRzID09PSB1bmRlZmluZWQpID8gZGF0YVtpXS5kdHMgOiBkYXRhW2ldLnB0cztcbiAgICAgIHRoaXMuX3ByZURlY29kZS5wdXNoKGRhdGFbaV0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5fcHJlRGVjb2RlLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmICh0aGlzLl9sYXN0cHRzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fbGFzdHB0cyA9IHRoaXMuX3ByZURlY29kZVswXS5wdHM7XG4gICAgICB9XG4gICAgICBpZiAoKHRoaXMuX3ByZURlY29kZVt0aGlzLl9wcmVEZWNvZGUubGVuZ3RoIC0gMV0ucHRzIC0gdGhpcy5fbGFzdHB0cykgLyAxMDAwID4gdGhpcy5wcmVsb2FkVGltZSkge1xuICAgICAgICB0aGlzLmRlY29kZUFBQygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRlY29kZUFBQyAoKSB7XG4gICAgaWYgKHRoaXMuX2RlY29kaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2RlY29kaW5nID0gdHJ1ZTtcbiAgICBsZXQgZGF0YSA9IHRoaXMuX3ByZURlY29kZTtcbiAgICBsZXQgc2FtcGxlcyA9IFtdO1xuICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgbGV0IHNhbXBsZSA9IGRhdGEuc2hpZnQoKTtcbiAgICB3aGlsZSAoc2FtcGxlKSB7XG4gICAgICBsZXQgc2FtcGxlRGF0YSA9IEF1ZGlvQ3R4LmdldEFBQ0RhdGEodGhpcy5tZXRhLCBzYW1wbGUpXG4gICAgICBzYW1wbGVzLnB1c2goc2FtcGxlRGF0YSk7XG4gICAgICB0aGlzLl9sYXN0cHRzID0gc2FtcGxlLnB0cztcbiAgICAgIHNhbXBsZSA9IGRhdGEuc2hpZnQoKVxuICAgIH1cbiAgICBsZXQgYnVmZmVyID0gQXVkaW9DdHguY29tYmlsZURhdGEoc2FtcGxlcyk7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuY29udGV4dC5kZWNvZGVBdWRpb0RhdGEoYnVmZmVyLmJ1ZmZlciwgZnVuY3Rpb24gKGJ1ZmZlcikge1xuICAgICAgICBsZXQgYXVkaW9Tb3VyY2UgPSBfdGhpcy5jb250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgICAgICBhdWRpb1NvdXJjZS5idWZmZXIgPSBidWZmZXI7XG4gICAgICAgIC8vIGF1ZGlvU291cmNlLm9uZW5kZWQgPSBfdGhpcy5vblNvdXJjZUVuZGVkLmJpbmQoX3RoaXMpO1xuICAgICAgICBfdGhpcy5zYW1wbGVzLnB1c2goe1xuICAgICAgICAgIHRpbWU6IF90aGlzLmR1cmF0aW9uLFxuICAgICAgICAgIGR1cmF0aW9uOiBidWZmZXIuZHVyYXRpb24sXG4gICAgICAgICAgZGF0YTogYXVkaW9Tb3VyY2VcbiAgICAgICAgfSlcblxuICAgICAgICBfdGhpcy5kdXJhdGlvbiArPSBidWZmZXIuZHVyYXRpb247XG5cbiAgICAgICAgaWYgKCFfdGhpcy5fY3VycmVudEJ1ZmZlcikge1xuICAgICAgICAgIF90aGlzLl9jdXJyZW50QnVmZmVyID0gX3RoaXMuZ2V0VGltZUJ1ZmZlcihfdGhpcy5jdXJyZW50VGltZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIV90aGlzLl9uZXh0QnVmZmVyICYmIF90aGlzLl9jdXJyZW50QnVmZmVyKSB7XG4gICAgICAgICAgX3RoaXMuX25leHRCdWZmZXIgPSBfdGhpcy5nZXRUaW1lQnVmZmVyKF90aGlzLmN1cnJlbnRUaW1lICsgX3RoaXMuX2N1cnJlbnRCdWZmZXIuZHVyYXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIF90aGlzLl9kZWNvZGluZyA9IGZhbHNlO1xuXG4gICAgICAgIGlmICgoX3RoaXMuX3ByZURlY29kZS5sZW5ndGggPiAwICYmIF90aGlzLl9wcmVEZWNvZGVbX3RoaXMuX3ByZURlY29kZS5sZW5ndGggLSAxXS5wdHMgLSBfdGhpcy5fbGFzdHB0cykgLyAxMDAwID49IF90aGlzLnByZWxvYWRUaW1lKSB7XG4gICAgICAgICAgX3RoaXMuZGVjb2RlQUFDKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoX3RoaXMucGxheUZpbmlzaCkge1xuICAgICAgICAgIF90aGlzLnBsYXlGaW5pc2goKVxuICAgICAgICB9XG4gICAgICB9LCAoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpXG4gICAgICB9KVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH1cbiAgfVxuXG4gIG9uU291cmNlRW5kZWQgKCkge1xuICAgIGlmICghdGhpcy5fbmV4dEJ1ZmZlciB8fCAhdGhpcy5fcGxheWVkKSB7XG4gICAgICB0aGlzLndhaXROZXh0SUQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5vblNvdXJjZUVuZGVkKCk7XG4gICAgICB9LCAyMDApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgYXVkaW9Tb3VyY2UgPSB0aGlzLl9uZXh0QnVmZmVyLmRhdGE7XG4gICAgYXVkaW9Tb3VyY2Uuc3RhcnQoKTtcbiAgICBhdWRpb1NvdXJjZS5jb25uZWN0KHRoaXMuZ2Fpbk5vZGUpO1xuICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBfdGhpcy5vblNvdXJjZUVuZGVkLmNhbGwodGhpcyk7XG4gICAgfSwgYXVkaW9Tb3VyY2UuYnVmZmVyLmR1cmF0aW9uICogMTAwMCAtIDEwKTtcbiAgICB0aGlzLl9jdXJyZW50QnVmZmVyID0gdGhpcy5fbmV4dEJ1ZmZlcjtcbiAgICB0aGlzLl9jdXJyZW50VGltZSA9IHRoaXMuX2N1cnJlbnRCdWZmZXIudGltZTtcbiAgICB0aGlzLl9uZXh0QnVmZmVyID0gdGhpcy5nZXRUaW1lQnVmZmVyKHRoaXMuY3VycmVudFRpbWUpO1xuICAgIGlmICh0aGlzLl9jdXJyZW50QnVmZmVyKSB7XG4gICAgICB0aGlzLl9uZXh0QnVmZmVyID0gdGhpcy5nZXRUaW1lQnVmZmVyKHRoaXMuY3VycmVudFRpbWUgKyB0aGlzLl9jdXJyZW50QnVmZmVyLmR1cmF0aW9uKTtcbiAgICB9XG4gICAgdGhpcy5lbWl0KCdBVURJT19TT1VSQ0VfRU5EJylcbiAgfVxuXG4gIHBsYXkgKCkge1xuICAgIGlmICh0aGlzLnBsYXlGaW5pc2gpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fcGxheWVkID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5jb250ZXh0LnN0YXRlID09PSAnc3VzcGVuZGVkJykge1xuICAgICAgdGhpcy5jb250ZXh0LnJlc3VtZSgpXG4gICAgfVxuICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgY29uc3QgcGxheVN0YXJ0ID0gKCkgPT4ge1xuICAgICAgbGV0IGF1ZGlvU291cmNlID0gdGhpcy5fY3VycmVudEJ1ZmZlci5kYXRhO1xuICAgICAgYXVkaW9Tb3VyY2UuY29ubmVjdCh0aGlzLmdhaW5Ob2RlKTtcbiAgICAgIGF1ZGlvU291cmNlLnN0YXJ0KCk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgX3RoaXMub25Tb3VyY2VFbmRlZC5jYWxsKHRoaXMpO1xuICAgICAgfSwgYXVkaW9Tb3VyY2UuYnVmZmVyLmR1cmF0aW9uICogMTAwMCAtIDEwKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2N1cnJlbnRCdWZmZXIpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICB0aGlzLnBsYXlGaW5pc2ggPSByZXNvbHZlO1xuICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMucGxheUZpbmlzaCA9IG51bGw7XG4gICAgICAgIHBsYXlTdGFydCgpXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGxheVN0YXJ0KCk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICB9XG4gIH1cblxuICBwYXVzZSAoKSB7XG4gICAgY29uc3QgYXVkaW9DdHggPSB0aGlzLmNvbnRleHQ7XG4gICAgaWYgKGF1ZGlvQ3R4LnN0YXRlID09PSAncnVubmluZycpIHtcbiAgICAgIGF1ZGlvQ3R4LnN1c3BlbmQoKVxuICAgIH1cbiAgfVxuXG4gIGdldFRpbWVCdWZmZXIgKHRpbWUpIHtcbiAgICBsZXQgcmV0O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zYW1wbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgc2FtcGxlID0gdGhpcy5zYW1wbGVzW2ldXG4gICAgICBpZiAoc2FtcGxlLnRpbWUgPD0gdGltZSAmJiAoc2FtcGxlLnRpbWUgKyBzYW1wbGUuZHVyYXRpb24pID4gdGltZSkge1xuICAgICAgICByZXQgPSBzYW1wbGU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgc2V0QXVkaW9NZXRhRGF0YSAobWV0YSkge1xuICAgIHRoaXMubWV0YSA9IG1ldGE7XG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICBpZiAodGhpcy53YWl0TmV4dElEKSB7XG4gICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMud2FpdE5leHRJRClcbiAgICB9XG4gICAgdGhpcy5jb250ZXh0LmNsb3NlKCk7XG4gIH1cblxuICBzZXQgbXV0ZWQgKHZhbCkge1xuICAgIGlmICh2YWwpIHtcbiAgICAgIHRoaXMuZ2Fpbk5vZGUuZ2Fpbi52YWx1ZSA9IDBcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nYWluTm9kZS5nYWluLnZhbHVlID0gdGhpcy5fdm9sdW1lXG4gICAgfVxuICB9XG5cbiAgZ2V0IHZvbHVtZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZvbHVtZVxuICB9XG5cbiAgc2V0IHZvbHVtZSAodmFsKSB7XG4gICAgaWYgKHZhbCA8IDApIHtcbiAgICAgIHRoaXMuX3ZvbHVtZSA9IDA7XG4gICAgICB0aGlzLmdhaW5Ob2RlLmdhaW4udmFsdWUgPSAwXG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmICh2YWwgPiAxKSB7XG4gICAgICB0aGlzLl92b2x1bWUgPSAxO1xuICAgICAgdGhpcy5nYWluTm9kZS5nYWluLnZhbHVlID0gMVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3ZvbHVtZSA9IHZhbDtcbiAgICB0aGlzLmdhaW5Ob2RlLmdhaW4udmFsdWUgPSB2YWxcbiAgfVxuXG4gIHN0YXRpYyBnZXRBQUNEYXRhIChtZXRhLCBzYW1wbGUpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoc2FtcGxlLmRhdGEuYnl0ZUxlbmd0aCArIDcpO1xuICAgIGxldCBhZHRzID0gQXVkaW9DdHguZ2V0QWR0cyhtZXRhLCBzYW1wbGUuZGF0YSk7XG4gICAgYnVmZmVyLnNldChhZHRzKTtcbiAgICBidWZmZXIuc2V0KHNhbXBsZS5kYXRhLCA3KTtcbiAgICByZXR1cm4gYnVmZmVyO1xuICB9XG5cbiAgc3RhdGljIGNvbWJpbGVEYXRhIChzYW1wbGVzKSB7XG4gICAgLy8gZ2V0IGxlbmd0aFxuICAgIGxldCBsZW5ndGggPSAwO1xuICAgIGZvciAobGV0IGkgPSAwLCBrID0gc2FtcGxlcy5sZW5ndGg7IGkgPCBrOyBpKyspIHtcbiAgICAgIGxlbmd0aCArPSBzYW1wbGVzW2ldLmJ5dGVMZW5ndGg7XG4gICAgfVxuXG4gICAgbGV0IHJldCA9IG5ldyBVaW50OEFycmF5KGxlbmd0aCk7XG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgLy8gY29tYmlsZSBkYXRhO1xuICAgIGZvciAobGV0IGkgPSAwLCBrID0gc2FtcGxlcy5sZW5ndGg7IGkgPCBrOyBpKyspIHtcbiAgICAgIHJldC5zZXQoc2FtcGxlc1tpXSwgb2Zmc2V0KTtcbiAgICAgIG9mZnNldCArPSBzYW1wbGVzW2ldLmJ5dGVMZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBzdGF0aWMgZ2V0QWR0cyAobWV0YSwgZGF0YSkge1xuICAgIGxldCBhZHRzID0gbmV3IFVpbnQ4QXJyYXkoNyk7XG5cbiAgICAvLyDorr7nva7lkIzmraXkvY0gMHhmZmYgMTJiaXRcbiAgICBhZHRzWzBdID0gMHhmZjtcbiAgICBhZHRzWzFdID0gMHhmMDtcblxuICAgIC8vIE9iamVjdCBkYXRhICjmsqHku4DkuYjkurrnlKhNUEVHLTLkuobvvIxITFPlkoxGTFbkuZ/lhajmmK9NUEVHLTTvvIzov5nph4znm7TmjqUwKSAgMWJpdFxuICAgIC8vIExldmVsIGFsd2F5cyAwMCAyYml0XG4gICAgLy8gQ1JDIGFsd2F5cyAxIDFiaXRcbiAgICBhZHRzWzFdID0gYWR0c1sxXSB8IDB4MDE7XG5cbiAgICAvLyBwcm9maWxlIDJiaXRcbiAgICBhZHRzWzJdID0gMHhjMCAmICgobWV0YS5vYmplY3RUeXBlIC0gMSkgPDwgNik7XG5cbiAgICAvLyBzYW1wbGVGcmVxdWVuY3lJbmRleFxuICAgIGFkdHNbMl0gPSBhZHRzWzJdIHwgKDB4M2MgJiAobWV0YS5zYW1wbGVSYXRlSW5kZXggPDwgMikpXG5cbiAgICAvLyBwcml2YXRlIGJpdCAwIDFiaXRcbiAgICAvLyBjaGFuZWwgY29uZmlndXJhdGlvbiAzYml0XG4gICAgYWR0c1syXSA9IGFkdHNbMl0gfCAoMHgwMSAmIG1ldGEuY2hhbm5lbENvdW50ID4+IDIpO1xuICAgIGFkdHNbM10gPSAweGMwICYgKG1ldGEuY2hhbm5lbENvdW50IDw8IDYpO1xuXG4gICAgLy8gb3JpZ2luYWxfY29weTogMCAxYml0XG4gICAgLy8gaG9tZTogMCAxYml0XG5cbiAgICAvLyBhZHRzX3ZhcmlhYmxlX2hlYWRlcigpXG4gICAgLy8gY29weXJpZ2h0ZWRfaWRfYml0IDAgMWJpdFxuICAgIC8vIGNvcHlyaWdodGVkX2lkX3N0YXJ0IDAgMWJpdFxuXG4gICAgLy8gYWFjX2ZyYW1lX2xlbmd0aCAxM2JpdDtcbiAgICBsZXQgYWFjZnJhbWVsZW5ndGggPSBkYXRhLmJ5dGVMZW5ndGggKyA3O1xuXG4gICAgYWR0c1szXSA9IGFkdHNbM10gfCAoMHgwMyAmIGFhY2ZyYW1lbGVuZ3RoID4+IDExKTtcbiAgICBhZHRzWzRdID0gMHhmZiAmIChhYWNmcmFtZWxlbmd0aCA+PiAzKTtcbiAgICBhZHRzWzVdID0gMHhlMCAmIChhYWNmcmFtZWxlbmd0aCA8PCA1KTtcblxuICAgIC8vIGFkdHNfYnVmZmVyX2Z1bGxuZXNzIDB4N2ZmIDExYml0XG4gICAgYWR0c1s1XSA9IGFkdHNbNV0gfCAweDFmXG4gICAgYWR0c1s2XSA9IDB4ZmM7XG5cbiAgICAvLyBudW1iZXJfb2ZfcmF3X2RhdGFfYmxvY2tzX2luX2ZyYW1lIDAgMmJpdDtcbiAgICByZXR1cm4gYWR0cztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBdWRpb0N0eDtcbiIsImltcG9ydCBWaWRlb0N0eCBmcm9tICcuL3ZpZGVvLWNvbnRleHQnO1xuaW1wb3J0IEF1ZGlvQ3R4IGZyb20gJy4vYXVkaW8tY29udGV4dCc7XG5pbXBvcnQgeyBnZXRUaWNrZXIgfSBmcm9tICcuL3RpY2tlcic7XG4vKipcbiAqIOmfs+eUu+WQjOatpeiwg+WSjOWZqFxuICovXG5jbGFzcyBBVlJlY29uY2lsZXIge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICB0aGlzLmFDdHggPSBwcm9wcy5hQ3R4O1xuICAgIHRoaXMudkN0eCA9IHByb3BzLnZDdHg7XG4gICAgdGhpcy52aWRlbyA9IHByb3BzLnZpZGVvXG4gICAgdGhpcy50aW1lb3V0SWQgPSBudWxsXG4gICAgdGhpcy5zdGFydCA9IG51bGxcbiAgfVxuXG4gIGRvUmVjb25jaWxlICgpIHtcbiAgICBjb25zdCB2Q3VyVGltZSA9ICh0aGlzLnZDdHguY3VycmVudFRpbWUgfHwgMCk7XG4gICAgY29uc3QgYUN1clRpbWUgPSAodGhpcy5hQ3R4LmN1cnJlbnRUaW1lIHx8IDApICogMTAwMDtcblxuICAgIGNvbnN0IGdhcCA9IHZDdXJUaW1lIC0gYUN1clRpbWU7XG4gICAgaWYgKHRoaXMudGltZW91dElkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChnYXAgPiAyMDApIHsgLy8gYXVkaW8gZGVsYXllZCBmb3IgbW9yZSB0aGFuIDEwMG1zXG4gICAgICB0aGlzLnZpZGVvLnN0YXJ0ICs9IGdhcFxuICAgICAgdGhpcy52Q3R4LnBhdXNlKClcbiAgICAgIHRoaXMudGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMudkN0eC5wbGF5KClcbiAgICAgICAgdGhpcy50aW1lb3V0SWQgPSBudWxsXG4gICAgICB9LCBnYXApXG4gICAgfSBlbHNlIGlmIChnYXAgPCAtMTIwKSB7XG4gICAgICB0aGlzLnZpZGVvLnN0YXJ0ICs9IGdhcFxuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuc3RhcnQgPSBudWxsXG4gICAgdGhpcy5hQ3R4ID0gbnVsbFxuICAgIHRoaXMudkN0eCA9IG51bGxcbiAgfVxufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbmNsYXNzIE1vYmlsZVZpZGVvIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgIHRoaXMuaGFuZGxlQXVkaW9Tb3VyY2VFbmQgPSB0aGlzLmhhbmRsZUF1ZGlvU291cmNlRW5kLmJpbmQodGhpcylcbiAgICB0aGlzLnBsYXllZCA9IGZhbHNlO1xuICAgIHRoaXMucGVuZGluZ1BsYXlUYXNrID0gbnVsbFxuICAgIHRoaXMuX3BhdXNlZCA9IHRydWU7XG4gICAgdGhpcy52aWRlb01ldGFJbml0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmF1ZGlvTWV0YUluaXRlZCA9IGZhbHNlO1xuICAgIHRoaXMuaW5pdCgpXG4gIH1cblxuICBpbml0ICgpIHtcbiAgICB0aGlzLnZDdHggPSBuZXcgVmlkZW9DdHgoT2JqZWN0LmFzc2lnbih7XG4gICAgICBjYW52YXM6IHRoaXMuX2NhbnZhc1xuICAgIH0sIHsgc3R5bGU6IHsgd2lkdGg6IHRoaXMud2lkdGgsIGhlaWdodDogdGhpcy5oZWlnaHQgfSB9KSk7XG4gICAgdGhpcy5hQ3R4ID0gbmV3IEF1ZGlvQ3R4KHt9KTtcbiAgICB0aGlzLnRpY2tlciA9IG5ldyAoZ2V0VGlja2VyKCkpKClcbiAgICB0aGlzLnJlY29uY2lsZXIgPSBuZXcgQVZSZWNvbmNpbGVyKHtcbiAgICAgIHZDdHg6IHRoaXMudkN0eCxcbiAgICAgIGFDdHg6IHRoaXMuYUN0eCxcbiAgICAgIHZpZGVvOiB0aGlzXG4gICAgfSlcbiAgICB0aGlzLnZDdHgub25jYW5wbGF5ID0gKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLnBsYXllZCkge1xuICAgICAgICB0aGlzLmFwcGVuZENoaWxkKHRoaXMuX2NhbnZhcyk7XG4gICAgICB9XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjYW5wbGF5JykpO1xuICAgIH1cblxuICAgIHRoaXMuYUN0eC5vbignQVVESU9fU09VUkNFX0VORCcsIHRoaXMuaGFuZGxlQXVkaW9Tb3VyY2VFbmQpXG4gIH1cblxuICBoYW5kbGVBdWRpb1NvdXJjZUVuZCAoKSB7XG4gICAgdGhpcy5yZWNvbmNpbGVyLmRvUmVjb25jaWxlKClcbiAgICB0aGlzLnZDdHguY2xlYW5CdWZmZXIoKTtcbiAgfVxuXG4gIF9jbGVhbkJ1ZmZlciAoKSB7XG4gICAgdGhpcy52Q3R4LmNsZWFuQnVmZmVyKClcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuYUN0eC5kZXN0cm95KClcbiAgICB0aGlzLnZDdHguZGVzdHJveSgpXG4gICAgdGhpcy50aWNrZXIuc3RvcCgpXG4gICAgdGhpcy5zdGFydCA9IG51bGw7XG4gICAgdGhpcy5yZWNvbmNpbGVyLmRlc3Ryb3koKVxuICAgIHRoaXMuYUN0eCA9IG51bGw7XG4gICAgdGhpcy52Q3R4ID0gbnVsbDtcbiAgICB0aGlzLnRpY2tlciA9IG51bGw7XG4gIH1cblxuICBvbkRlbXV4Q29tcGxldGUgKHZpZGVvVHJhY2ssIGF1ZGlvVHJhY2spIHtcbiAgICB0aGlzLmFDdHguZGVjb2RlQXVkaW8oYXVkaW9UcmFjayk7XG4gICAgdGhpcy52Q3R4LmRlY29kZVZpZGVvKHZpZGVvVHJhY2spO1xuICB9XG5cbiAgc2V0QXVkaW9NZXRhIChtZXRhKSB7XG4gICAgdGhpcy5hQ3R4LnNldEF1ZGlvTWV0YURhdGEobWV0YSk7XG4gICAgdGhpcy5hdWRpb01ldGFJbml0ZWQgPSB0cnVlO1xuICB9XG5cbiAgc2V0VmlkZW9NZXRhIChtZXRhKSB7XG4gICAgdGhpcy52Q3R4LnNldFZpZGVvTWV0YURhdGEobWV0YSk7XG4gICAgdGhpcy52aWRlb01ldGFJbml0ZWQgPSB0cnVlO1xuICB9XG5cbiAgZ2V0IHdpZHRoICgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3dpZHRoJykgfHwgdGhpcy52aWRlb1dpZHRoXG4gIH1cblxuICBzZXQgd2lkdGggKHZhbCkge1xuICAgIHRoaXMuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snXG4gICAgY29uc3QgcHhWYWwgPSB0eXBlb2YgdmFsID09PSAnbnVtYmVyJyA/IGAke3ZhbH1weGAgOiB2YWxcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBweFZhbClcbiAgICB0aGlzLnN0eWxlLndpZHRoID0gcHhWYWxcbiAgICB0aGlzLl9jYW52YXMuc3R5bGUud2lkdGggPSBweFZhbDtcbiAgICB0aGlzLl9jYW52YXMud2lkdGggPSB2YWw7XG4gIH1cblxuICBnZXQgaGVpZ2h0ICgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpXG4gIH1cblxuICBzZXQgaGVpZ2h0ICh2YWwpIHtcbiAgICB0aGlzLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJ1xuICAgIGNvbnN0IHB4VmFsID0gdHlwZW9mIHZhbCA9PT0gJ251bWJlcicgPyBgJHt2YWx9cHhgIDogdmFsXG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHB4VmFsKVxuICAgIHRoaXMuc3R5bGUuaGVpZ2h0ID0gcHhWYWxcbiAgICB0aGlzLl9jYW52YXMuc3R5bGUuaGVpZ2h0ID0gcHhWYWw7XG4gICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IHZhbDtcbiAgfVxuXG4gIGdldCB2aWRlb1dpZHRoICgpIHtcbiAgICBpZiAodGhpcy52Q3R4ICYmIHRoaXMudkN0eC52aWRlb1dpZHRoKSB7XG4gICAgICByZXR1cm4gdGhpcy52Q3R4LnZpZGVvV2lkdGhcbiAgICB9XG4gICAgcmV0dXJuIDBcbiAgfVxuXG4gIGdldCB2aWRlb0hlaWdodCAoKSB7XG4gICAgaWYgKHRoaXMudkN0eCAmJiB0aGlzLnZDdHgudmlkZW9IZWlnaHQpIHtcbiAgICAgIHJldHVybiB0aGlzLnZDdHgudmlkZW9IZWlnaHRcbiAgICB9XG4gICAgcmV0dXJuIDBcbiAgfVxuXG4gIGdldCBzcmMgKCkge1xuICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnc3JjJyk7XG4gIH1cblxuICBzZXQgc3JjICh2YWwpIHtcbiAgICAvLyBkbyBub3RoaW5nXG4gIH1cblxuICBnZXQgcmVhZHlTdGF0ZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlkZW9NZXRhSW5pdGVkID8gdGhpcy52Q3R4LnJlYWR5U3RhdGUgOiAwXG4gIH1cblxuICBnZXQgc2Vla2luZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlkZW9NZXRhSW5pdGVkID8gdGhpcy52Q3R4LnNlZWtpbmcgOiBmYWxzZVxuICB9XG5cbiAgZ2V0IGN1cnJlbnRUaW1lICgpIHtcbiAgICByZXR1cm4gdGhpcy52aWRlb01ldGFJbml0ZWQgPyB0aGlzLnZDdHguY3VycmVudFRpbWUgLyAxMDAwIDogMFxuICB9XG5cbiAgZ2V0IGR1cmF0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5hdWRpb01ldGFJbml0ZWQgPyB0aGlzLmFDdHguZHVyYXRpb24gOiAwXG4gIH1cblxuICBnZXQgcGF1c2VkICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcGF1c2VkXG4gIH1cblxuICBnZXQgcGxheWJhY2tSYXRlICgpIHtcbiAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ3BsYXliYWNrUmF0ZScpKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3BsYXliYWNrUmF0ZScpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAxLjBcbiAgICB9XG4gIH1cblxuICBzZXQgcGxheWJhY2tSYXRlICh2YWwpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgncGxheWJhY2tyYXRlJywgdmFsKTtcbiAgICB0aGlzLmFDdHgucGxheWJhY2tSYXRlID0gdmFsO1xuICAgIHRoaXMudkN0eC5wbGF5YmFja1JhdGUgPSB2YWw7XG5cbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdyYXRlY2hhbmdlJykpXG4gIH1cblxuICBnZXQgZW5kZWQgKCkge1xuICAgIGlmICh0aGlzLmF1ZGlvTWV0YUluaXRlZCkge1xuICAgICAgcmV0dXJuIHRoaXMuYUN0eC5lbmRlZDtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0IGF1dG9wbGF5ICgpIHtcbiAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ2F1dG9wbGF5JykpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnYXV0b3BsYXknKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cbiAgc2V0IGF1dG9wbGF5ICh2YWx1ZSkge1xuXG4gIH1cbiAgcGxheSAoKSB7XG4gICAgaWYgKHRoaXMucGVuZGluZ1BsYXlUYXNrKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGxheWVkKSB7XG4gICAgICB0aGlzLmRlc3Ryb3koKVxuICAgICAgdGhpcy5pbml0KClcbiAgICB9XG4gICAgdGhpcy5wZW5kaW5nUGxheVRhc2sgPSBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLnZDdHgucGxheSgpLFxuICAgICAgdGhpcy5hQ3R4LnBsYXkoKVxuICAgIF0pLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy50aWNrZXIuc3RhcnQoKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuc3RhcnQpIHtcbiAgICAgICAgICB0aGlzLnN0YXJ0ID0gRGF0ZS5ub3coKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2N1cnJlbnRUaW1lID0gRGF0ZS5ub3coKSAtIHRoaXMuc3RhcnRcbiAgICAgICAgdGhpcy52Q3R4Ll9vblRpbWVyKHRoaXMuX2N1cnJlbnRUaW1lKVxuICAgICAgfSlcblxuICAgICAgdGhpcy5wZW5kaW5nUGxheVRhc2sgPSBudWxsXG4gICAgICB0aGlzLnBsYXllZCA9IHRydWU7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdwbGF5JykpXG4gICAgICB0aGlzLl9wYXVzZWQgPSBmYWxzZVxuICAgIH0pXG4gIH1cblxuICBwYXVzZSAoKSB7XG4gICAgdGhpcy5fcGF1c2VkID0gdHJ1ZTtcbiAgICB0aGlzLmFDdHgucGF1c2UoKVxuICAgIHRoaXMudkN0eC5wYXVzZSgpXG5cbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdwYXVzZScpKVxuICB9XG5cbiAgZ2V0IHZvbHVtZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuYUN0eC52b2x1bWVcbiAgfVxuXG4gIHNldCB2b2x1bWUgKHZvbCkge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCd2b2x1bWUnLCB2b2wpO1xuICAgIHRoaXMuYUN0eC52b2x1bWUgPSB2b2xcbiAgfVxuXG4gIGdldCBtdXRlZCAoKSB7XG4gICAgY29uc3QgYXR0ck11dGVkID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ211dGVkJykgPT09ICd0cnVlJ1xuICAgIGlmIChhdHRyTXV0ZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGF0dHJNdXRlZDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKCd2b2x1bWUnKSkge1xuICAgICAgcmV0dXJuIE51bWJlci5wYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgndm9sdW1lJykpID09PSAwXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHNldCBtdXRlZCAodmFsKSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ211dGVkJywgdmFsKTtcbiAgICBpZiAoIXZhbCkge1xuICAgICAgdGhpcy5hQ3R4Lm11dGVkID0gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hQ3R4Lm11dGVkID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGdldCBlcnJvciAoKSB7XG4gICAgcmV0dXJuIHRoaXMudkN0eC5lcnJvciB8fCB0aGlzLmFDdHguZXJyb3I7XG4gIH1cblxuICBnZXQgYnVmZmVyZWQgKCkge1xuICAgIHJldHVybiB0aGlzLnZDdHguYnVmZmVyZWRcbiAgfVxufVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ21vYmlsZS12aWRlbycsIE1vYmlsZVZpZGVvKTtcbiIsImNsYXNzIFNvdXJjZUJ1ZmZlciB7XG4gIGNvbnN0cnVjdG9yIChjb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZyk7XG4gICAgdGhpcy50eXBlID0gdGhpcy5jb25maWcudHlwZTtcbiAgICB0aGlzLmJ1ZmZlciA9IFtdO1xuICAgIHRoaXMuY3VycmVudEdvcCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9sYXN0R2V0ID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHVzaCAoZnJhbWUpIHtcbiAgICBpZiAodGhpcy50eXBlID09PSAndmlkZW8nKSB7XG4gICAgICBpZiAoZnJhbWUuaXNLZXlmcmFtZSkge1xuICAgICAgICBsZXQgY3VycmVudEdvcCA9IHtcbiAgICAgICAgICBzYW1wbGVzOiBbXSxcbiAgICAgICAgICBzdGFydDogZnJhbWUuZHRzLFxuICAgICAgICAgIGVuZDogZnJhbWUuZHRzLFxuICAgICAgICAgIG5leHRHb3A6IHVuZGVmaW5lZFxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50R29wKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50R29wLm5leHRHb3AgPSBjdXJyZW50R29wO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VycmVudEdvcCA9IGN1cnJlbnRHb3A7XG4gICAgICAgIHRoaXMuYnVmZmVyLnB1c2godGhpcy5jdXJyZW50R29wKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY3VycmVudEdvcCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRHb3Auc2FtcGxlcy5wdXNoKGZyYW1lKTtcblxuICAgICAgICBpZiAoZnJhbWUuZHRzIDwgdGhpcy5jdXJyZW50R29wLnN0YXJ0KSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50R29wLnN0YXJ0ID0gZnJhbWUuZHRzO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZyYW1lLmR0cyA+IHRoaXMuY3VycmVudEdvcC5lbmQpIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRHb3AuZW5kID0gZnJhbWUuZHRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0ICh0aW1lKSB7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgaWYgKHRoaXMuYnVmZmVyLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGltZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxldCBzYW1wbGUgPSB0aGlzLl9nZXROZXh0KCk7XG4gICAgICAgIHJldHVybiBzYW1wbGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2dldE5leHQgKCkge1xuICAgIGlmICghdGhpcy5fbGFzdEdldCkge1xuICAgICAgbGV0IGdvcCA9IHRoaXMuYnVmZmVyWzBdO1xuICAgICAgaWYgKGdvcC5zYW1wbGVzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2xhc3RHZXQgPSB7XG4gICAgICAgIGdvcCxcbiAgICAgICAgaW5kZXg6IDBcbiAgICAgIH1cbiAgICAgIHJldHVybiBnb3Auc2FtcGxlc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGdvcCA9IHRoaXMuX2xhc3RHZXQuZ29wO1xuICAgICAgbGV0IHNhbXBsZSA9IGdvcC5zYW1wbGVzW3RoaXMuX2xhc3RHZXQuaW5kZXggKyAxXTtcbiAgICAgIGlmIChzYW1wbGUpIHtcbiAgICAgICAgdGhpcy5fbGFzdEdldC5pbmRleCA9IHRoaXMuX2xhc3RHZXQuaW5kZXggKyAxO1xuICAgICAgICByZXR1cm4gc2FtcGxlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ29wID0gZ29wLm5leHRHb3A7XG4gICAgICAgIGlmICghZ29wIHx8IGdvcC5zYW1wbGVzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2FtcGxlID0gZ29wLnNhbXBsZXNbMF07XG4gICAgICAgIHRoaXMuX2xhc3RHZXQgPSB7XG4gICAgICAgICAgZ29wLFxuICAgICAgICAgIGluZGV4OiAwXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNhbXBsZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW1vdmUgKHN0YXJ0LCBlbmQpIHtcbiAgICBpZiAodGhpcy5idWZmZXIubGVuZ3RoIDwgMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBpID0gMDtcbiAgICBsZXQgZ29wID0gdGhpcy5idWZmZXJbMF07XG4gICAgd2hpbGUgKGdvcCkge1xuICAgICAgaWYgKGdvcC5lbmQgPCBlbmQgJiYgZ29wLnN0YXJ0ID49IHN0YXJ0KSB7XG4gICAgICAgIHRoaXMuYnVmZmVyLnNwbGljZShpLCAxKVxuICAgICAgICBnb3AgPSB0aGlzLmJ1ZmZlcltpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGkgKz0gMTtcbiAgICAgICAgZ29wID0gdGhpcy5idWZmZXJbaV07XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNvdXJjZUJ1ZmZlcjtcbiIsIi8qKlxuICogQGF1dGhvciBmdXl1aGFvQGJ5dGVkYW5jZS5jb21cbiAqL1xuXG5jbGFzcyBUaWNrZXIge1xuICBjb25zdHJ1Y3RvciAob3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMgfHwge30sIHtcbiAgICAgIGludGVydmFsOiAxNlxuICAgIH0pXG5cbiAgICB0aGlzLmNhbGxiYWNrcyA9IFtdXG4gIH1cblxuICBzdGFydCguLi5jYWxsYmFja3MpIHtcbiAgICB0aGlzLmNhbGxiYWNrcyA9IGNhbGxiYWNrc1xuICB9XG5cbiAgb25UaWNrICgpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5jYWxsYmFja3MubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IGNhbGxiYWNrID0gdGhpcy5jYWxsYmFja3NbaV1cbiAgICAgIGNhbGxiYWNrKClcbiAgICB9XG4gIH1cblxuICBzZXRJbnRlcnZhbCAoaW50ZXJ2YWwpIHtcbiAgICB0aGlzLm9wdGlvbnMuaW50ZXJ2YWwgPSBpbnRlcnZhbFxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbi8qKlxuICogdGlja2VyIHVzZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAqL1xuY2xhc3MgUmFmVGlja2VyIGV4dGVuZHMgVGlja2VyIHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMucHJldiA9IG51bGw7XG4gICAgdGhpcy50aW1lcklkID0gbnVsbFxuICAgIHRoaXMuX3N1YlRpbWVySWQgPSBudWxsXG5cbiAgICB0aGlzLl90aWNrRnVuYyA9IFJhZlRpY2tlci5nZXRUaWNrRnVuYygpXG4gICAgdGhpcy50aWNrID0gdGhpcy50aWNrLmJpbmQodGhpcylcbiAgfVxuXG4gIHN0YXJ0ICguLi5jYWxsYmFja3MpIHtcbiAgICBzdXBlci5zdGFydCguLi5jYWxsYmFja3MpXG4gICAgdGhpcy50aWNrKClcbiAgfVxuXG4gIHRpY2sgKCkge1xuICAgIHRoaXMubmV4dFRpY2soKTtcbiAgICB0aGlzLm9uVGljaygpXG4gIH1cblxuICBuZXh0VGljayAoKSB7XG4gICAgY29uc3QgeyBfdGlja0Z1bmMgfSA9IHRoaXM7XG4gICAgdGhpcy50aW1lcklkID0gX3RpY2tGdW5jKHRoaXMudGljaylcbiAgfVxuXG4gIHN0b3AgKCkge1xuICAgIGlmICh0aGlzLnRpbWVySWQpIHtcbiAgICAgIGNvbnN0IGNhbmNlbEZ1bmMgPSBSYWZUaWNrZXIuZ2V0Q2FuY2VsRnVuYygpXG5cbiAgICAgIGNhbmNlbEZ1bmModGhpcy50aW1lcklkKVxuICAgIH1cbiAgfVxuXG4gIHJlc3VtZSgpIHtcbiAgICB0aGlzLm5leHRUaWNrKCk7XG4gIH1cblxuICBzdGF0aWMgZ2V0VGlja0Z1bmMgKCkge1xuICAgIHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgfVxuXG4gIHN0YXRpYyBnZXRDYW5jZWxGdW5jICgpIHtcbiAgICByZXR1cm4gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZVxuICB9XG5cbiAgc3RhdGljIGlzU3VwcG9ydGVkICgpIHtcbiAgICByZXR1cm4gUmFmVGlja2VyLmdldFRpY2tGdW5jKCkgIT09IHVuZGVmaW5lZFxuICB9XG59XG5cbi8qKlxuICogdXNlIHNldFRpbWVvdXQgZm9yIGJyb3dzZXJzIHdpdGhvdXQgcmFmIHN1cHBvcnRcbiAqL1xuY2xhc3MgVGltZW91dFRpY2tlciBleHRlbmRzIFRpY2tlciB7XG4gIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgIHN1cGVyKGNvbmZpZylcbiAgICB0aGlzLnRpbWVvdXRJZCA9IG51bGxcblxuICB9XG5cbiAgc3RhcnQgKC4uLmNhbGxiYWNrcykge1xuICAgIHN1cGVyLm5leHRUaWNrKC4uLmNhbGxiYWNrcylcbiAgICB0aGlzLnRpbWVvdXRJZCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICB0aGlzLm9uVGljaygpO1xuICAgIH0sIHRoaXMub3B0aW9ucy5pbnRlcnZhbCB8fCAxNilcbiAgfVxuXG4gIHN0b3AgKCkge1xuICAgIGlmICh0aGlzLnRpbWVvdXRJZCkge1xuICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy50aW1lb3V0SWQpXG4gICAgfVxuICB9XG5cbn1cblxuLyoqXG4gKiDov5Tlm55UaWNrZXLmnoTpgKDlh73mlbBcbiAqIEByZXR1cm5zIHtUaWNrZXJ9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRUaWNrZXIgPSAoKSA9PiB7XG4gIGlmIChSYWZUaWNrZXIuaXNTdXBwb3J0ZWQoKSkge1xuICAgIHJldHVybiBSYWZUaWNrZXJcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gVGltZW91dFRpY2tlclxuICB9XG59XG4iLCJpbXBvcnQgV29ya2VyaWZ5IGZyb20gJ3dlYndvcmtpZnktd2VicGFjaydcbmltcG9ydCBTdHJlYW0gZnJvbSAnLi4vd3JpdGUvc3RyZWFtJztcbmltcG9ydCBOYWx1bml0IGZyb20gJy4uLy4uLy4uL3hncGxheWVyLWNvZGVjL3NyYy9oMjY0L25hbHVuaXQnO1xuaW1wb3J0IFlVVkNhbnZhcyBmcm9tICcuL3l1di1jYW52YXMnO1xuaW1wb3J0IFNvdXJjZUJ1ZmZlciBmcm9tICcuL3NvdXJjZWJ1ZmZlcic7XG5pbXBvcnQgVGltZVJhbmdlcyBmcm9tICcuLi9tb2RlbHMvVGltZVJhbmdlcyc7XG5cbmNsYXNzIFZpZGVvQ2FudmFzIHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZykge1xuICAgIHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnKTtcbiAgICB0aGlzLmNhbnZhcyA9IHRoaXMuY29uZmlnLmNhbnZhcyA/IHRoaXMuY29uZmlnLmNhbnZhcyA6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIHRoaXMuc291cmNlID0gbmV3IFNvdXJjZUJ1ZmZlcih7dHlwZTogJ3ZpZGVvJ30pO1xuICAgIHRoaXMucHJlbG9hZFRpbWUgPSB0aGlzLmNvbmZpZy5wcmVsb2FkVGltZSB8fCAzO1xuICAgIHRoaXMub25jYW5wbGF5ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMub25GaXJzdEZyYW1lID0gdW5kZWZpbmVkO1xuICAgIHRoaXMubWV0YSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnJlYWR5U3RhdHVzID0gMDtcbiAgICB0aGlzLnBhdXNlZCA9IHRydWU7XG4gICAgdGhpcy5jb3VudCA9IDA7XG4gICAgdGhpcy5jdXJyZW50VGltZSA9IDA7XG4gICAgdGhpcy5sYXN0UGxheWVkID0gMDtcblxuICAgIHRoaXMuX2RlY29kZXJJbml0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9hdmNjcHVzaGVkID0gZmFsc2U7XG4gICAgdGhpcy5fZGVjb2RlZEZyYW1lcyA9IHt9O1xuICAgIHRoaXMuX2xhc3RTYW1wbGVEdHMgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fYmFzZUR0cyA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9sYXN0UmVuZGVyVGltZSA9IG51bGxcbiAgICB0aGlzLnBsYXlGaW5pc2ggPSBudWxsXG5cbiAgfVxuXG4gIHBhdXNlICgpIHtcbiAgICB0aGlzLnBhdXNlZCA9IHRydWU7XG4gIH1cblxuICBpbml0V2FzbVdvcmtlciAoKSB7XG4gICAgbGV0IF90aGlzID0gdGhpcztcbiAgICB0aGlzLndhc213b3JrZXIgPSBXb3JrZXJpZnkocmVxdWlyZS5yZXNvbHZlKCcuL3dvcmtlci5qcycpKTtcbiAgICB0aGlzLndhc213b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgbXNnOiAnaW5pdCcsXG4gICAgICBtZXRhOiB0aGlzLm1ldGFcbiAgICB9KVxuICAgIHRoaXMud2FzbXdvcmtlci5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbXNnID0+IHtcbiAgICAgIHN3aXRjaCAobXNnLmRhdGEubXNnKSB7XG4gICAgICAgIGNhc2UgJ0RFQ09ERVJfUkVBRFknOlxuICAgICAgICAgIF90aGlzLl9kZWNvZGVySW5pdGVkID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnREVDT0RFRCc6XG4gICAgICAgICAgdGhpcy5fb25EZWNvZGVkKG1zZy5kYXRhKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNldFZpZGVvTWV0YURhdGEgKG1ldGEpIHtcbiAgICB0aGlzLm1ldGEgPSBtZXRhO1xuICAgIGlmICghdGhpcy5fZGVjb2RlckluaXRlZCkge1xuICAgICAgdGhpcy5pbml0V2FzbVdvcmtlcigpO1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuX2F2Y2NwdXNoZWQgPSB0cnVlO1xuICAgIGxldCBkYXRhID0gbmV3IFVpbnQ4QXJyYXkobWV0YS5zcHMuYnl0ZUxlbmd0aCArIDQpO1xuICAgIGRhdGEuc2V0KFswLCAwLCAwLCAxXSlcbiAgICBkYXRhLnNldChtZXRhLnNwcywgNCk7XG4gICAgdGhpcy53YXNtd29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgIG1zZzogJ2RlY29kZScsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSlcblxuICAgIGRhdGEgPSBuZXcgVWludDhBcnJheShtZXRhLnBwcy5ieXRlTGVuZ3RoICsgNCk7XG4gICAgZGF0YS5zZXQoWzAsIDAsIDAsIDFdKVxuICAgIGRhdGEuc2V0KG1ldGEucHBzLCA0KTtcbiAgICB0aGlzLndhc213b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgbXNnOiAnZGVjb2RlJyxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KVxuXG4gICAgaWYgKCF0aGlzLnl1dkNhbnZhcykge1xuICAgICAgbGV0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe21ldGEsIGNhbnZhczogdGhpcy5jYW52YXN9LCB0aGlzLmNvbmZpZyk7XG4gICAgICB0aGlzLnl1dkNhbnZhcyA9IG5ldyBZVVZDYW52YXMoY29uZmlnKTtcbiAgICB9XG4gICAgdGhpcy5yZWFkeVN0YXR1cyA9IDE7XG4gIH1cblxuICBkZWNvZGVWaWRlbyAodmlkZW9UcmFjaykge1xuICAgIGlmICghdGhpcy5fZGVjb2RlckluaXRlZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9hdmNjcHVzaGVkKSB7XG4gICAgICB0aGlzLnNldFZpZGVvTWV0YURhdGEodGhpcy5tZXRhKTtcbiAgICB9XG4gICAgbGV0IHsgc2FtcGxlcyB9ID0gdmlkZW9UcmFjaztcbiAgICBsZXQgc2FtcGxlID0gc2FtcGxlcy5zaGlmdCgpO1xuXG4gICAgd2hpbGUgKHNhbXBsZSkge1xuICAgICAgaWYgKCF0aGlzLl9iYXNlRHRzKSB7XG4gICAgICAgIHRoaXMuX2Jhc2VEdHMgPSBzYW1wbGUuZHRzO1xuICAgICAgfVxuICAgICAgdGhpcy5zb3VyY2UucHVzaChzYW1wbGUpO1xuICAgICAgc2FtcGxlID0gc2FtcGxlcy5zaGlmdCgpO1xuICAgIH1cblxuICAgIHRoaXMuX3ByZWxvYWQoKTtcbiAgfVxuXG4gIF9wcmVsb2FkICgpIHtcbiAgICBpZiAoIXRoaXMuX2xhc3RTYW1wbGVEdHMgfHwgdGhpcy5fbGFzdFNhbXBsZUR0cyAtIHRoaXMuX2Jhc2VEdHMgPCB0aGlzLmN1cnJlbnRUaW1lICsgdGhpcy5wcmVsb2FkVGltZSAqIDEwMDApIHtcbiAgICAgIGxldCBzYW1wbGUgPSB0aGlzLnNvdXJjZS5nZXQoKTtcbiAgICAgIGlmIChzYW1wbGUpIHtcbiAgICAgICAgdGhpcy5fbGFzdFNhbXBsZUR0cyA9IHNhbXBsZS5kdHM7XG4gICAgICAgIHRoaXMuX2FuYWx5c2VOYWwoc2FtcGxlKTtcbiAgICAgIH1cblxuICAgICAgd2hpbGUgKHNhbXBsZSAmJiB0aGlzLl9sYXN0U2FtcGxlRHRzIC0gdGhpcy5fYmFzZUR0cyA8IHRoaXMuY3VycmVudFRpbWUgKyB0aGlzLnByZWxvYWRUaW1lICogMTAwMCkge1xuICAgICAgICBzYW1wbGUgPSB0aGlzLnNvdXJjZS5nZXQoKTtcbiAgICAgICAgaWYgKHNhbXBsZSkge1xuICAgICAgICAgIHRoaXMuX2FuYWx5c2VOYWwoc2FtcGxlKTtcbiAgICAgICAgICB0aGlzLl9sYXN0U2FtcGxlRHRzID0gc2FtcGxlLmR0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9hbmFseXNlTmFsIChzYW1wbGUpIHtcbiAgICBsZXQgbmFscyA9IE5hbHVuaXQuZ2V0QXZjY05hbHMobmV3IFN0cmVhbShzYW1wbGUuZGF0YS5idWZmZXIpKTtcblxuICAgIGxldCBsZW5ndGggPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmFscy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IG5hbCA9IG5hbHNbaV07XG4gICAgICBsZW5ndGggKz0gbmFsLmJvZHkuYnl0ZUxlbmd0aCArIDQ7XG4gICAgfVxuICAgIGxldCBvZmZzZXQgPSAwO1xuICAgIGxldCBkYXRhID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBuYWwgPSBuYWxzW2ldO1xuICAgICAgZGF0YS5zZXQoWzAsIDAsIDAsIDFdLCBvZmZzZXQpO1xuICAgICAgb2Zmc2V0ICs9IDQ7XG4gICAgICBkYXRhLnNldChuZXcgVWludDhBcnJheShuYWwuYm9keSksIG9mZnNldCk7XG4gICAgICBvZmZzZXQgKz0gbmFsLmJvZHkuYnl0ZUxlbmd0aDtcbiAgICB9XG4gICAgdGhpcy53YXNtd29ya2VyLnBvc3RNZXNzYWdlKHtcbiAgICAgIG1zZzogJ2RlY29kZScsXG4gICAgICBkYXRhOiBkYXRhLFxuICAgICAgaW5mbzoge1xuICAgICAgICBkdHM6IHNhbXBsZS5kdHMsXG4gICAgICAgIHB0czogc2FtcGxlLnB0cyA/IHNhbXBsZS5wdHMgOiBzYW1wbGUuZHRzICsgc2FtcGxlLmN0cyxcbiAgICAgICAga2V5OiBzYW1wbGUuaXNLZXlmcmFtZVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBfb25EZWNvZGVkIChkYXRhKSB7XG4gICAgbGV0IHtkdHN9ID0gZGF0YS5pbmZvXG4gICAgdGhpcy5fZGVjb2RlZEZyYW1lc1tkdHNdID0gZGF0YTtcbiAgICBpZiAoT2JqZWN0LmtleXModGhpcy5fZGVjb2RlZEZyYW1lcykubGVuZ3RoID4gMTApIHtcbiAgICAgIGlmICh0aGlzLnBsYXlGaW5pc2gpIHtcbiAgICAgICAgdGhpcy5wbGF5RmluaXNoKClcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLm9uY2FucGxheSkge1xuICAgICAgICB0aGlzLm9uY2FucGxheSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBsYXkgKCkge1xuICAgIHRoaXMucGF1c2VkID0gZmFsc2U7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICB0aGlzLnBsYXlGaW5pc2ggPSByZXNvbHZlXG4gICAgfSkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLnBsYXlGaW5pc2ggPSBudWxsXG4gICAgfSlcbiAgfVxuXG4gIF9vblRpbWVyIChjdXJyZW50VGltZSkge1xuICAgIGlmICh0aGlzLnBhdXNlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5tZXRhKSB7XG4gICAgICBpZiAodGhpcy5tZXRhLmZyYW1lUmF0ZSAmJiB0aGlzLm1ldGEuZnJhbWVSYXRlLmZpeGVkICYmIHRoaXMubWV0YS5mcmFtZVJhdGUuZnBzKSB7XG4gICAgICB9XG4gICAgICBsZXQgZnJhbWVUaW1lcyA9IE9iamVjdC5rZXlzKHRoaXMuX2RlY29kZWRGcmFtZXMpO1xuICAgICAgaWYgKGZyYW1lVGltZXMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRUaW1lID0gY3VycmVudFRpbWU7XG4gICAgICAgIGxldCBmcmFtZVRpbWUgPSAtMTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmcmFtZVRpbWVzLmxlbmd0aCAmJiBOdW1iZXIucGFyc2VJbnQoZnJhbWVUaW1lc1tpXSkgLSB0aGlzLl9iYXNlRHRzIDw9IHRoaXMuY3VycmVudFRpbWU7IGkrKykge1xuICAgICAgICAgIGZyYW1lVGltZSA9IE51bWJlci5wYXJzZUludChmcmFtZVRpbWVzW2kgLSAxXSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZnJhbWUgPSB0aGlzLl9kZWNvZGVkRnJhbWVzW2ZyYW1lVGltZV07XG4gICAgICAgIGlmIChmcmFtZSkge1xuICAgICAgICAgIHRoaXMueXV2Q2FudmFzLnJlbmRlcihmcmFtZS5idWZmZXIsIGZyYW1lLndpZHRoLCBmcmFtZS5oZWlnaHQsIGZyYW1lLnlMaW5lc2l6ZSwgZnJhbWUudXZMaW5lc2l6ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmcmFtZVRpbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKE51bWJlci5wYXJzZUludChmcmFtZVRpbWVzW2ldKSA8IGZyYW1lVGltZSkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2RlY29kZWRGcmFtZXNbZnJhbWVUaW1lc1tpXV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2xhc3RSZW5kZXJUaW1lID0gRGF0ZS5ub3coKVxuICB9XG5cbiAgY2xlYW5CdWZmZXIgKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRUaW1lID4gMSkge1xuICAgICAgdGhpcy5zb3VyY2UucmVtb3ZlKDAsIHRoaXMuY3VycmVudFRpbWUgLSAxKTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLndhc213b3JrZXIucG9zdE1lc3NhZ2Uoe21zZzogJ2Rlc3Ryb3knfSlcbiAgICB0aGlzLndhc213b3JrZXIgPSBudWxsO1xuICAgIHRoaXMuY2FudmFzID0gbnVsbFxuICAgIHRoaXMuc291cmNlID0gbnVsbFxuICAgIHRoaXMuX2RlY29kZXJJbml0ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIGdldCBidWZmZXJlZCAoKSB7XG4gICAgY29uc3QgcmFuZ2VzID0gW11cbiAgICBsZXQgY3VycmVudFJhbmdlID0ge1xuICAgICAgc3RhcnQ6IG51bGwsXG4gICAgICBlbmQ6IG51bGxcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNvdXJjZS5idWZmZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHsgc3RhcnQsIGVuZCB9ID0gdGhpcy5zb3VyY2UuYnVmZmVyW2ldO1xuICAgICAgaWYgKCFjdXJyZW50UmFuZ2Uuc3RhcnQpIHtcbiAgICAgICAgY3VycmVudFJhbmdlLnN0YXJ0ID0gc3RhcnQ7XG4gICAgICB9XG4gICAgICBpZiAoIWN1cnJlbnRSYW5nZS5lbmQpIHtcbiAgICAgICAgY3VycmVudFJhbmdlLmVuZCA9IGVuZDtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXJ0IC0gY3VycmVudFJhbmdlLmVuZCA+IDEwMDApIHtcbiAgICAgICAgY3VycmVudFJhbmdlLnN0YXJ0ID0gY3VycmVudFJhbmdlLnN0YXJ0IC8gMTAwMFxuICAgICAgICBjdXJyZW50UmFuZ2UuZW5kID0gY3VycmVudFJhbmdlLmVuZCAvIDEwMDBcbiAgICAgICAgY3VycmVudFJhbmdlID0ge1xuICAgICAgICAgIHN0YXJ0LFxuICAgICAgICAgIGVuZFxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdXJyZW50UmFuZ2UuZW5kID0gZW5kXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGN1cnJlbnRSYW5nZS5zdGFydCAhPT0gbnVsbCAmJiBjdXJyZW50UmFuZ2UuZW5kICE9PSBudWxsKSB7XG4gICAgICBjdXJyZW50UmFuZ2Uuc3RhcnQgPSBjdXJyZW50UmFuZ2Uuc3RhcnQgLyAxMDAwXG4gICAgICBjdXJyZW50UmFuZ2UuZW5kID0gY3VycmVudFJhbmdlLmVuZCAvIDEwMDBcbiAgICAgIHJhbmdlcy5wdXNoKGN1cnJlbnRSYW5nZSlcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFRpbWVSYW5nZXMocmFuZ2VzKVxuICB9XG5cbn1cbmV4cG9ydCBkZWZhdWx0IFZpZGVvQ2FudmFzO1xuIiwiY29uc3QgTUFYX1NUUkVBTV9CVUZGRVJfTEVOR1RIID0gMTAyNCAqIDEwMjQ7XG52YXIgRGVjb2RlciA9IGZ1bmN0aW9uIChzZWxmKSB7XG4gIHRoaXMuaW5pdGVkID0gZmFsc2U7XG4gIHRoaXMuc2VsZiA9IHNlbGY7XG4gIHRoaXMubWV0YSA9IHRoaXMuc2VsZi5tZXRhO1xuICB0aGlzLmluZm9saXN0ID0ge307XG4gIHNlbGYucGFyX2Jyb2Fkd2F5T25Ccm9hZHdheUluaXRlZCA9IHRoaXMuYnJvYWR3YXlPbkJyb2Fkd2F5SW5pdGVkLmJpbmQodGhpcyk7XG4gIHNlbGYucGFyX2Jyb2Fkd2F5T25QaWN0dXJlRGVjb2RlZCA9IHRoaXMuYnJvYWR3YXlPblBpY3R1cmVEZWNvZGVkLmJpbmQodGhpcyk7XG59XG5cbkRlY29kZXIucHJvdG90eXBlLnRvVThBcnJheSA9IGZ1bmN0aW9uIChwdHIsIGxlbmd0aCkge1xuICByZXR1cm4gdGhpcy5zZWxmLkhFQVBVOC5zdWJhcnJheShwdHIsIHB0ciArIGxlbmd0aCk7XG59XG5cbkRlY29kZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIE1vZHVsZS5fYnJvYWR3YXlJbml0KCk7XG4gIHRoaXMuc3RyZWFtQnVmZmVyID0gdGhpcy50b1U4QXJyYXkoTW9kdWxlLl9icm9hZHdheUNyZWF0ZVN0cmVhbShNQVhfU1RSRUFNX0JVRkZFUl9MRU5HVEgpLCBNQVhfU1RSRUFNX0JVRkZFUl9MRU5HVEgpO1xufVxuXG5EZWNvZGVyLnByb3RvdHlwZS5icm9hZHdheU9uUGljdHVyZURlY29kZWQgPSBmdW5jdGlvbiAob2Zmc2V0LCB3aWR0aCwgaGVpZ2h0LCB5TGluZXNpemUsIHV2TGluZXNpemUsIGluZm9pZCkge1xuICBsZXQgaW5mbyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuaW5mb2xpc3RbaW5mb2lkXSk7XG4gIGxldCB5Um93Y291bnQgPSBoZWlnaHQ7XG4gIGxldCB1dlJvd2NvdW50ID0gaGVpZ2h0IC8gMjtcbiAgaWYgKHRoaXMubWV0YS5jaHJvbWFGb3JtYXQgPT09IDQ0NCB8fCB0aGlzLm1ldGEuY2hyb21hRm9ybWF0ID09PSA0MjIpIHtcbiAgICB1dlJvd2NvdW50ID0gaGVpZ2h0O1xuICB9XG4gIGxldCBkYXRhID0gdGhpcy50b1U4QXJyYXkob2Zmc2V0LCAoeUxpbmVzaXplICogeVJvd2NvdW50KSArIDIgKiAodXZMaW5lc2l6ZSAqIHV2Um93Y291bnQpKTtcbiAgdGhpcy5pbmZvbGlzdFtpbmZvaWRdID0gbnVsbDtcbiAgbGV0IGRhdGV0ZW1wID0gbmV3IFVpbnQ4QXJyYXkoZGF0YS5sZW5ndGgpO1xuICBkYXRldGVtcC5zZXQoZGF0YSk7XG4gIGxldCBidWZmZXIgPSBkYXRldGVtcC5idWZmZXI7XG4gIHRoaXMuc2VsZi5wb3N0TWVzc2FnZSh7XG4gICAgbXNnOiAnREVDT0RFRCcsXG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIHlMaW5lc2l6ZSxcbiAgICB1dkxpbmVzaXplLFxuICAgIGluZm8sXG4gICAgYnVmZmVyXG4gIH0sIFtidWZmZXJdKTtcbn1cblxuRGVjb2Rlci5wcm90b3R5cGUuYnJvYWR3YXlPbkJyb2Fkd2F5SW5pdGVkID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmluaXRlZCA9IHRydWU7XG4gIHRoaXMuc2VsZi5wb3N0TWVzc2FnZSh7bXNnOiAnREVDT0RFUl9SRUFEWSd9KTtcbn1cblxuRGVjb2Rlci5wcm90b3R5cGUuZGVjb2RlID0gZnVuY3Rpb24gKGRhdGEsIGluZm8pIHtcbiAgbGV0IHRpbWUgPSBwYXJzZUludChuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG4gIGxldCBpbmZvaWQgPSB0aW1lIC0gKE1hdGguZmxvb3IodGltZSAvIDEwZTgpICogMTBlOCk7XG4gIHRoaXMuaW5mb2xpc3RbaW5mb2lkXSA9IGluZm87XG4gIHRoaXMuc3RyZWFtQnVmZmVyLnNldChkYXRhKTtcbiAgTW9kdWxlLl9icm9hZHdheVBsYXlTdHJlYW0oZGF0YS5sZW5ndGgsIGluZm9pZCk7XG59XG5cbkRlY29kZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gIE1vZHVsZS5fYnJvYWR3YXlFeGl0KCk7XG59XG5cbnZhciBkZWNvZGVyO1xuXG5mdW5jdGlvbiBvblBvc3RSdW4gKCkge1xuICBkZWNvZGVyID0gbmV3IERlY29kZXIodGhpcyk7XG4gIGRlY29kZXIuaW5pdCgpO1xufVxuXG5mdW5jdGlvbiBpbml0IChtZXRhKSB7XG4gIHNlbGYuaW1wb3J0U2NyaXB0cygnaHR0cHM6Ly9zZjEtdmNsb3VkY2RuLnBzdGF0cC5jb20vb2JqL3R0ZmUvbWVkaWEvZGVjb2Rlci9oMjY0L2RlY29kZXIuanMnKTtcbiAgYWRkT25Qb3N0UnVuKG9uUG9zdFJ1bi5iaW5kKHNlbGYpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2VsZikge1xuICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBkYXRhID0gZS5kYXRhO1xuICAgIGlmICghZGF0YS5tc2cpIHtcbiAgICAgIHNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBtc2c6ICdFUlJPUjppbnZhbGlkIG1lc3NhZ2UnXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKGRhdGEubXNnKSB7XG4gICAgICAgIGNhc2UgJ2luaXQnOlxuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgIHNlbGYubWV0YSA9IGRhdGEubWV0YTtcbiAgICAgICAgICBpbml0KClcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZGVjb2RlJzpcbiAgICAgICAgICBkZWNvZGVyLmRlY29kZShkYXRhLmRhdGEsIGRhdGEuaW5mbyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2Rlc3RvcnknOlxuICAgICAgICAgIGRlY29kZXIuZGVzdHJveSgpO1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9LCBmYWxzZSk7XG59XG4iLCJjbGFzcyBZVVZDYW52YXMge1xuICBjb25zdHJ1Y3RvciAoY29uZmlncykge1xuICAgIHRoaXMuY29uZmlncyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZ3MpO1xuICAgIHRoaXMuY2FudmFzID0gdGhpcy5jb25maWdzLmNhbnZhcztcbiAgICB0aGlzLm1ldGEgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmNvbmZpZ3MubWV0YSk7XG4gICAgdGhpcy5jaHJvbWEgPSB0aGlzLm1ldGEuY2hyb21hRm9ybWF0O1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5tZXRhLnByZXNlbnRIZWlnaHQ7XG4gICAgdGhpcy53aWR0aCA9IHRoaXMubWV0YS5wcmVzZW50V2lkdGg7XG4gICAgLy8gdGhpcy5jYW52YXMud2lkdGggPSB0aGlzLm1ldGEucHJlc2VudFdpZHRoO1xuICAgIC8vIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMubWV0YS5wcmVzZW50SGVpZ2h0O1xuICAgIC8vIHRoaXMuY2FudmFzLnN0eWxlLndpZHRoID0gY29uZmlncy5zdHlsZS53aWR0aDtcbiAgICAvLyB0aGlzLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSBjb25maWdzLnN0eWxlLmhlaWdodDtcbiAgICB0aGlzLl9pbml0Q29udGV4dEdMKCk7XG4gICAgaWYgKHRoaXMuY29udGV4dEdMKSB7XG4gICAgICB0aGlzLl9pbml0UHJvZ3JhbSgpO1xuICAgICAgdGhpcy5faW5pdEJ1ZmZlcnMoKTtcbiAgICAgIHRoaXMuX2luaXRUZXh0dXJlcygpO1xuICAgIH07XG4gIH1cblxuICBfaW5pdENvbnRleHRHTCAoKSB7XG4gICAgdmFyIGNhbnZhcyA9IHRoaXMuY2FudmFzO1xuICAgIHZhciBnbCA9IG51bGw7XG5cbiAgICB2YXIgdmFsaWRDb250ZXh0TmFtZXMgPSBbJ3dlYmdsJywgJ2V4cGVyaW1lbnRhbC13ZWJnbCcsICdtb3otd2ViZ2wnLCAnd2Via2l0LTNkJ107XG4gICAgdmFyIG5hbWVJbmRleCA9IDA7XG5cbiAgICB3aGlsZSAoIWdsICYmIG5hbWVJbmRleCA8IHZhbGlkQ29udGV4dE5hbWVzLmxlbmd0aCkge1xuICAgICAgdmFyIGNvbnRleHROYW1lID0gdmFsaWRDb250ZXh0TmFtZXNbbmFtZUluZGV4XTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHRoaXMuY29udGV4dE9wdGlvbnMpIHtcbiAgICAgICAgICBnbCA9IGNhbnZhcy5nZXRDb250ZXh0KGNvbnRleHROYW1lLCB0aGlzLmNvbnRleHRPcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBnbCA9IGNhbnZhcy5nZXRDb250ZXh0KGNvbnRleHROYW1lKTtcbiAgICAgICAgfTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZ2wgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWdsIHx8IHR5cGVvZiBnbC5nZXRQYXJhbWV0ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZ2wgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICArK25hbWVJbmRleDtcbiAgICB9O1xuXG4gICAgdGhpcy5jb250ZXh0R0wgPSBnbDtcbiAgfTtcblxuICBfaW5pdFByb2dyYW0gKCkge1xuICAgIHZhciBnbCA9IHRoaXMuY29udGV4dEdMO1xuXG4gICAgLy8gdmVydGV4IHNoYWRlciBpcyB0aGUgc2FtZSBmb3IgYWxsIHR5cGVzXG4gICAgdmFyIHZlcnRleFNoYWRlclNjcmlwdDtcbiAgICB2YXIgZnJhZ21lbnRTaGFkZXJTY3JpcHQ7XG4gICAgdmVydGV4U2hhZGVyU2NyaXB0ID0gW1xuICAgICAgJ2F0dHJpYnV0ZSB2ZWM0IHZlcnRleFBvczsnLFxuICAgICAgJ2F0dHJpYnV0ZSB2ZWM0IHRleHR1cmVQb3M7JyxcbiAgICAgICdhdHRyaWJ1dGUgdmVjNCB1VGV4dHVyZVBvczsnLFxuICAgICAgJ2F0dHJpYnV0ZSB2ZWM0IHZUZXh0dXJlUG9zOycsXG4gICAgICAndmFyeWluZyB2ZWMyIHRleHR1cmVDb29yZDsnLFxuICAgICAgJ3ZhcnlpbmcgdmVjMiB1VGV4dHVyZUNvb3JkOycsXG4gICAgICAndmFyeWluZyB2ZWMyIHZUZXh0dXJlQ29vcmQ7JyxcblxuICAgICAgJ3ZvaWQgbWFpbigpJyxcbiAgICAgICd7JyxcbiAgICAgICcgIGdsX1Bvc2l0aW9uID0gdmVydGV4UG9zOycsXG4gICAgICAnICB0ZXh0dXJlQ29vcmQgPSB0ZXh0dXJlUG9zLnh5OycsXG4gICAgICAnICB1VGV4dHVyZUNvb3JkID0gdVRleHR1cmVQb3MueHk7JyxcbiAgICAgICcgIHZUZXh0dXJlQ29vcmQgPSB2VGV4dHVyZVBvcy54eTsnLFxuICAgICAgJ30nXG4gICAgXS5qb2luKCdcXG4nKTtcblxuICAgIGZyYWdtZW50U2hhZGVyU2NyaXB0ID0gW1xuICAgICAgJ3ByZWNpc2lvbiBoaWdocCBmbG9hdDsnLFxuICAgICAgJ3ZhcnlpbmcgaGlnaHAgdmVjMiB0ZXh0dXJlQ29vcmQ7JyxcbiAgICAgICd2YXJ5aW5nIGhpZ2hwIHZlYzIgdVRleHR1cmVDb29yZDsnLFxuICAgICAgJ3ZhcnlpbmcgaGlnaHAgdmVjMiB2VGV4dHVyZUNvb3JkOycsXG4gICAgICAndW5pZm9ybSBzYW1wbGVyMkQgeVNhbXBsZXI7JyxcbiAgICAgICd1bmlmb3JtIHNhbXBsZXIyRCB1U2FtcGxlcjsnLFxuICAgICAgJ3VuaWZvcm0gc2FtcGxlcjJEIHZTYW1wbGVyOycsXG4gICAgICAndW5pZm9ybSBtYXQ0IFlVVjJSR0I7JyxcblxuICAgICAgJ3ZvaWQgbWFpbih2b2lkKSB7JyxcbiAgICAgICcgIGhpZ2hwIGZsb2F0IHkgPSB0ZXh0dXJlMkQoeVNhbXBsZXIsICB0ZXh0dXJlQ29vcmQpLnI7JyxcbiAgICAgICcgIGhpZ2hwIGZsb2F0IHUgPSB0ZXh0dXJlMkQodVNhbXBsZXIsICB1VGV4dHVyZUNvb3JkKS5yOycsXG4gICAgICAnICBoaWdocCBmbG9hdCB2ID0gdGV4dHVyZTJEKHZTYW1wbGVyLCAgdlRleHR1cmVDb29yZCkucjsnLFxuICAgICAgJyAgZ2xfRnJhZ0NvbG9yID0gdmVjNCh5LCB1LCB2LCAxKSAqIFlVVjJSR0I7JyxcbiAgICAgICd9J1xuICAgIF0uam9pbignXFxuJyk7XG5cbiAgICB2YXIgWVVWMlJHQiA9IFtcbiAgICAgIDEuMTY0MzgsIDAuMDAwMDAsIDEuNTk2MDMsIC0wLjg3MDc5LFxuICAgICAgMS4xNjQzOCwgLTAuMzkxNzYsIC0wLjgxMjk3LCAwLjUyOTU5LFxuICAgICAgMS4xNjQzOCwgMi4wMTcyMywgMC4wMDAwMCwgLTEuMDgxMzksXG4gICAgICAwLCAwLCAwLCAxXG4gICAgXTtcbiAgICB2YXIgdmVydGV4U2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKGdsLlZFUlRFWF9TSEFERVIpO1xuICAgIGdsLnNoYWRlclNvdXJjZSh2ZXJ0ZXhTaGFkZXIsIHZlcnRleFNoYWRlclNjcmlwdCk7XG4gICAgZ2wuY29tcGlsZVNoYWRlcih2ZXJ0ZXhTaGFkZXIpO1xuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHZlcnRleFNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgICBjb25zb2xlLmxvZygnVmVydGV4IHNoYWRlciBmYWlsZWQgdG8gY29tcGlsZTogJyArIGdsLmdldFNoYWRlckluZm9Mb2codmVydGV4U2hhZGVyKSk7XG4gICAgfVxuXG4gICAgdmFyIGZyYWdtZW50U2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUik7XG4gICAgZ2wuc2hhZGVyU291cmNlKGZyYWdtZW50U2hhZGVyLCBmcmFnbWVudFNoYWRlclNjcmlwdCk7XG4gICAgZ2wuY29tcGlsZVNoYWRlcihmcmFnbWVudFNoYWRlcik7XG4gICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoZnJhZ21lbnRTaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgY29uc29sZS5sb2coJ0ZyYWdtZW50IHNoYWRlciBmYWlsZWQgdG8gY29tcGlsZTogJyArIGdsLmdldFNoYWRlckluZm9Mb2coZnJhZ21lbnRTaGFkZXIpKTtcbiAgICB9XG5cbiAgICB2YXIgcHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcbiAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgdmVydGV4U2hhZGVyKTtcbiAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgZnJhZ21lbnRTaGFkZXIpO1xuICAgIGdsLmxpbmtQcm9ncmFtKHByb2dyYW0pO1xuICAgIGlmICghZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5MSU5LX1NUQVRVUykpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdQcm9ncmFtIGZhaWxlZCB0byBjb21waWxlOiAnICsgZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cocHJvZ3JhbSkpO1xuICAgIH1cblxuICAgIGdsLnVzZVByb2dyYW0ocHJvZ3JhbSk7XG5cbiAgICB2YXIgWVVWMlJHQlJlZiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCAnWVVWMlJHQicpO1xuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYoWVVWMlJHQlJlZiwgZmFsc2UsIFlVVjJSR0IpO1xuXG4gICAgdGhpcy5zaGFkZXJQcm9ncmFtID0gcHJvZ3JhbTtcbiAgfVxuXG4gIF9pbml0QnVmZmVycyAoKSB7XG4gICAgdmFyIGdsID0gdGhpcy5jb250ZXh0R0w7XG4gICAgdmFyIHByb2dyYW0gPSB0aGlzLnNoYWRlclByb2dyYW07XG5cbiAgICB2YXIgdmVydGV4UG9zQnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHZlcnRleFBvc0J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoWzEsIDEsIC0xLCAxLCAxLCAtMSwgLTEsIC0xXSksIGdsLlNUQVRJQ19EUkFXKTtcblxuICAgIHZhciB2ZXJ0ZXhQb3NSZWYgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCAndmVydGV4UG9zJyk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodmVydGV4UG9zUmVmKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHZlcnRleFBvc1JlZiwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcblxuICAgIHZhciB0ZXh0dXJlUG9zQnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRleHR1cmVQb3NCdWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KFsxLCAwLCAwLCAwLCAxLCAxLCAwLCAxXSksIGdsLlNUQVRJQ19EUkFXKTtcblxuICAgIHZhciB0ZXh0dXJlUG9zUmVmID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgJ3RleHR1cmVQb3MnKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0ZXh0dXJlUG9zUmVmKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRleHR1cmVQb3NSZWYsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG5cbiAgICB0aGlzLnRleHR1cmVQb3NCdWZmZXIgPSB0ZXh0dXJlUG9zQnVmZmVyO1xuXG4gICAgdmFyIHVUZXh0dXJlUG9zQnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHVUZXh0dXJlUG9zQnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShbMSwgMCwgMCwgMCwgMSwgMSwgMCwgMV0pLCBnbC5TVEFUSUNfRFJBVyk7XG5cbiAgICB2YXIgdVRleHR1cmVQb3NSZWYgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCAndVRleHR1cmVQb3MnKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh1VGV4dHVyZVBvc1JlZik7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcih1VGV4dHVyZVBvc1JlZiwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcblxuICAgIHRoaXMudVRleHR1cmVQb3NCdWZmZXIgPSB1VGV4dHVyZVBvc0J1ZmZlcjtcblxuICAgIHZhciB2VGV4dHVyZVBvc0J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2VGV4dHVyZVBvc0J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDAsIDEsIDEsIDAsIDFdKSwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgdmFyIHZUZXh0dXJlUG9zUmVmID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgJ3ZUZXh0dXJlUG9zJyk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodlRleHR1cmVQb3NSZWYpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodlRleHR1cmVQb3NSZWYsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG5cbiAgICB0aGlzLnZUZXh0dXJlUG9zQnVmZmVyID0gdlRleHR1cmVQb3NCdWZmZXI7XG4gIH07XG5cbiAgX2luaXRUZXh0dXJlcyAoKSB7XG4gICAgdmFyIGdsID0gdGhpcy5jb250ZXh0R0w7XG4gICAgdmFyIHByb2dyYW0gPSB0aGlzLnNoYWRlclByb2dyYW07XG4gICAgdmFyIHlUZXh0dXJlUmVmID0gdGhpcy5faW5pdFRleHR1cmUoKTtcbiAgICB2YXIgeVNhbXBsZXJSZWYgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgJ3lTYW1wbGVyJyk7XG4gICAgZ2wudW5pZm9ybTFpKHlTYW1wbGVyUmVmLCAwKTtcbiAgICB0aGlzLnlUZXh0dXJlUmVmID0geVRleHR1cmVSZWY7XG5cbiAgICB2YXIgdVRleHR1cmVSZWYgPSB0aGlzLl9pbml0VGV4dHVyZSgpO1xuICAgIHZhciB1U2FtcGxlclJlZiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCAndVNhbXBsZXInKTtcbiAgICBnbC51bmlmb3JtMWkodVNhbXBsZXJSZWYsIDEpO1xuICAgIHRoaXMudVRleHR1cmVSZWYgPSB1VGV4dHVyZVJlZjtcblxuICAgIHZhciB2VGV4dHVyZVJlZiA9IHRoaXMuX2luaXRUZXh0dXJlKCk7XG4gICAgdmFyIHZTYW1wbGVyUmVmID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sICd2U2FtcGxlcicpO1xuICAgIGdsLnVuaWZvcm0xaSh2U2FtcGxlclJlZiwgMik7XG4gICAgdGhpcy52VGV4dHVyZVJlZiA9IHZUZXh0dXJlUmVmO1xuICB9XG5cbiAgX2luaXRUZXh0dXJlICgpIHtcbiAgICB2YXIgZ2wgPSB0aGlzLmNvbnRleHRHTDtcblxuICAgIHZhciB0ZXh0dXJlUmVmID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmVSZWYpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5ORUFSRVNUKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgbnVsbCk7XG5cbiAgICByZXR1cm4gdGV4dHVyZVJlZjtcbiAgfVxuXG4gIF9kcmF3UGljdHVyZUdMIChkYXRhLCB3aWR0aCwgaGVpZ2h0LCB5TGluZXNpemUsIHV2TGluZXNpemUpIHtcbiAgICB2YXIgeWxlbiA9IHlMaW5lc2l6ZSAqIGhlaWdodDtcbiAgICB2YXIgdXZsZW4gPSB1dkxpbmVzaXplICogaGVpZ2h0IC8gMjtcbiAgICBpZiAodGhpcy5jaHJvbWEgPT09IDQ0NCB8fCB0aGlzLmNocm9tYSA9PT0gNDIyKSB7XG4gICAgICB1dmxlbiAqPSAyO1xuICAgIH1cbiAgICBkYXRhID0gbmV3IFVpbnQ4QXJyYXkoZGF0YSk7XG4gICAgbGV0IHJlbmRlckRhdGEgPSB7XG4gICAgICB5RGF0YTogZGF0YS5zdWJhcnJheSgwLCB5bGVuKSxcbiAgICAgIHVEYXRhOiBkYXRhLnN1YmFycmF5KHlsZW4sIHlsZW4gKyB1dmxlbiksXG4gICAgICB2RGF0YTogZGF0YS5zdWJhcnJheSh5bGVuICsgdXZsZW4sIHlsZW4gKyB1dmxlbiArIHV2bGVuKVxuICAgIH1cbiAgICB0aGlzLl9kcmF3UGljdHVyZUdMNDIwKHJlbmRlckRhdGEsIHdpZHRoLCBoZWlnaHQsIHlMaW5lc2l6ZSwgdXZMaW5lc2l6ZSk7XG4gIH1cblxuICBfZHJhd1BpY3R1cmVHTDQyMCAoZGF0YSwgd2lkdGgsIGhlaWdodCwgeUxpbmVzaXplLCB1dkxpbmVzaXplKSB7XG4gICAgdmFyIGdsID0gdGhpcy5jb250ZXh0R0w7XG4gICAgdmFyIHRleHR1cmVQb3NCdWZmZXIgPSB0aGlzLnRleHR1cmVQb3NCdWZmZXI7XG4gICAgdmFyIHVUZXh0dXJlUG9zQnVmZmVyID0gdGhpcy51VGV4dHVyZVBvc0J1ZmZlcjtcbiAgICB2YXIgdlRleHR1cmVQb3NCdWZmZXIgPSB0aGlzLnZUZXh0dXJlUG9zQnVmZmVyO1xuXG4gICAgdmFyIHlUZXh0dXJlUmVmID0gdGhpcy55VGV4dHVyZVJlZjtcbiAgICB2YXIgdVRleHR1cmVSZWYgPSB0aGlzLnVUZXh0dXJlUmVmO1xuICAgIHZhciB2VGV4dHVyZVJlZiA9IHRoaXMudlRleHR1cmVSZWY7XG5cbiAgICB2YXIgeURhdGEgPSBkYXRhLnlEYXRhO1xuICAgIHZhciB1RGF0YSA9IGRhdGEudURhdGE7XG4gICAgdmFyIHZEYXRhID0gZGF0YS52RGF0YTtcblxuICAgIHZhciB5RGF0YVBlclJvdyA9IHlMaW5lc2l6ZTtcbiAgICB2YXIgeVJvd0NudCA9IGhlaWdodDtcblxuICAgIHZhciB1RGF0YVBlclJvdyA9IHdpZHRoIC8gMjtcbiAgICB2YXIgdVJvd0NudCA9IGhlaWdodCAvIDI7XG5cbiAgICBpZiAodGhpcy5jaHJvbWEgPT09IDQyMiB8fCB0aGlzLmNocm9tYSA9PT0gNDQ0KSB7XG4gICAgICB1Um93Q250ID0gaGVpZ2h0O1xuICAgIH1cblxuICAgIHZhciB2RGF0YVBlclJvdyA9IHV2TGluZXNpemU7XG4gICAgdmFyIHZSb3dDbnQgPSB1Um93Q250O1xuXG4gICAgbGV0IHJhdGlvdyA9IHRoaXMuY2FudmFzLndpZHRoIC8gdGhpcy53aWR0aDtcbiAgICBsZXQgcmF0aW9oID0gdGhpcy5jYW52YXMuaGVpZ2h0IC8gdGhpcy5oZWlnaHQ7XG4gICAgbGV0IGxlZnQgPSAwO1xuICAgIGxldCB0b3AgPSAwO1xuICAgIGxldCB3ID0gdGhpcy5jYW52YXMud2lkdGg7XG4gICAgbGV0IGggPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XG4gICAgaWYgKHJhdGlvdyA8IHJhdGlvaCkge1xuICAgICAgaCA9ICh0aGlzLmhlaWdodCAqIHRoaXMuY2FudmFzLndpZHRoIC8gdGhpcy53aWR0aCk7XG4gICAgICB0b3AgPSBwYXJzZUludCgodGhpcy5jYW52YXMuaGVpZ2h0IC0gKHRoaXMuaGVpZ2h0ICogdGhpcy5jYW52YXMud2lkdGggLyB0aGlzLndpZHRoKSkgLyAyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdyA9ICh0aGlzLndpZHRoICogdGhpcy5jYW52YXMuaGVpZ2h0IC8gdGhpcy5oZWlnaHQpO1xuICAgICAgbGVmdCA9IHBhcnNlSW50KCh0aGlzLmNhbnZhcy53aWR0aCAtICh0aGlzLndpZHRoICogdGhpcy5jYW52YXMuaGVpZ2h0IC8gdGhpcy5oZWlnaHQpKSAvIDIpO1xuICAgIH1cbiAgICBnbC52aWV3cG9ydChsZWZ0LCB0b3AsIHcsIGgpO1xuXG4gICAgdmFyIHRleHR1cmVQb3NWYWx1ZXMgPSBuZXcgRmxvYXQzMkFycmF5KFsxLCAwLCAwLCAwLCAxLCAxLCAwLCAxXSk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRleHR1cmVQb3NCdWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCB0ZXh0dXJlUG9zVmFsdWVzLCBnbC5EWU5BTUlDX0RSQVcpO1xuXG4gICAgdmFyIHVUZXh0dXJlUG9zVmFsdWVzID0gbmV3IEZsb2F0MzJBcnJheShbMSwgMCwgMCwgMCwgMSwgMSwgMCwgMV0pO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB1VGV4dHVyZVBvc0J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHVUZXh0dXJlUG9zVmFsdWVzLCBnbC5EWU5BTUlDX0RSQVcpO1xuXG4gICAgdmFyIHZUZXh0dXJlUG9zVmFsdWVzID0gbmV3IEZsb2F0MzJBcnJheShbMSwgMCwgMCwgMCwgMSwgMSwgMCwgMV0pO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2VGV4dHVyZVBvc0J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHZUZXh0dXJlUG9zVmFsdWVzLCBnbC5EWU5BTUlDX0RSQVcpO1xuXG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgeVRleHR1cmVSZWYpO1xuICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuTFVNSU5BTkNFLCB5RGF0YVBlclJvdywgeVJvd0NudCwgMCwgZ2wuTFVNSU5BTkNFLCBnbC5VTlNJR05FRF9CWVRFLCB5RGF0YSk7XG5cbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUxKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB1VGV4dHVyZVJlZik7XG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5MVU1JTkFOQ0UsIHVEYXRhUGVyUm93LCB1Um93Q250LCAwLCBnbC5MVU1JTkFOQ0UsIGdsLlVOU0lHTkVEX0JZVEUsIHVEYXRhKTtcbiAgICBcbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUyKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB2VGV4dHVyZVJlZik7XG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5MVU1JTkFOQ0UsIHZEYXRhUGVyUm93LCB2Um93Q250LCAwLCBnbC5MVU1JTkFOQ0UsIGdsLlVOU0lHTkVEX0JZVEUsIHZEYXRhKTtcblxuICAgIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVfU1RSSVAsIDAsIDQpO1xuICB9XG5cbiAgX2RyYXdQaWN0dXJlUkdCIChkYXRhKSB7XG5cbiAgfVxuXG4gIHJlbmRlciAoZGF0YSwgd2lkdGgsIGhlaWdodCwgeUxpbmVzaXplLCB1dkxpbmVzaXplKSB7XG4gICAgdmFyIGdsID0gdGhpcy5jb250ZXh0R0w7XG4gICAgaWYgKGdsKSB7XG4gICAgICB0aGlzLl9kcmF3UGljdHVyZUdMKGRhdGEsIHdpZHRoLCBoZWlnaHQsIHlMaW5lc2l6ZSwgdXZMaW5lc2l6ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RyYXdQaWN0dXJlUkdCKGRhdGEpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBZVVZDYW52YXM7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUaW1lUmFuZ2VzIHtcbiAgY29uc3RydWN0b3IgKHJhbmdlcykge1xuICAgIHRoaXMucmFuZ2VzID0gcmFuZ2VzIHx8IFtdO1xuICB9XG5cbiAgc3RhcnQgKGlkeCkge1xuICAgIHJldHVybiB0aGlzLnJhbmdlc1tpZHhdID8gdGhpcy5yYW5nZXNbaWR4XS5zdGFydCA6IDBcbiAgfVxuXG4gIGVuZCAoaWR4KSB7XG4gICAgcmV0dXJuIHRoaXMucmFuZ2VzW2lkeF0gPyB0aGlzLnJhbmdlc1tpZHhdLmVuZCA6IDBcbiAgfVxuXG4gIGFkZCAocmFuZ2UpIHtcbiAgICB0aGlzLnJhbmdlcy5wdXNoKHJhbmdlKVxuICB9XG5cbiAgZ2V0IGxlbmd0aCAoKSB7XG4gICAgcmV0dXJuIHRoaXMucmFuZ2VzLmxlbmd0aFxuICB9XG59XG4iLCJjb25zdCBpc09iamVjdEZpbGxlZCA9IChvYmopID0+IHtcbiAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgaWYgKG9ialtrZXldID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZWRpYUluZm8ge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5taW1lVHlwZSA9IG51bGxcbiAgICB0aGlzLmR1cmF0aW9uID0gbnVsbFxuXG4gICAgdGhpcy5oYXNWaWRlbyA9IG51bGxcbiAgICB0aGlzLnZpZGVvID0ge1xuICAgICAgY29kZWM6IG51bGwsXG4gICAgICB3aWR0aDogbnVsbCxcbiAgICAgIGhlaWdodDogbnVsbCxcbiAgICAgIHByb2ZpbGU6IG51bGwsXG4gICAgICBsZXZlbDogbnVsbCxcbiAgICAgIGZyYW1lUmF0ZToge1xuICAgICAgICBmaXhlZDogdHJ1ZSxcbiAgICAgICAgZnBzOiAyNSxcbiAgICAgICAgZnBzX251bTogMjUwMDAsXG4gICAgICAgIGZwc19kZW46IDEwMDBcbiAgICAgIH0sXG4gICAgICBjaHJvbWFGb3JtYXQ6IG51bGwsXG4gICAgICBwYXJSYXRpbzoge1xuICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgaGVpZ2h0OiAxXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5oYXNBdWRpbyA9IG51bGxcblxuICAgIHRoaXMuYXVkaW8gPSB7XG4gICAgICBjb2RlYzogbnVsbCxcbiAgICAgIHNhbXBsZVJhdGU6IG51bGwsXG4gICAgICBzYW1wbGVSYXRlSW5kZXg6IG51bGwsXG4gICAgICBjaGFubmVsQ291bnQ6IG51bGxcbiAgICB9XG4gIH1cblxuICBpc0NvbXBsZXRlICgpIHtcbiAgICByZXR1cm4gTWVkaWFJbmZvLmlzQmFzZUluZm9SZWFkeSh0aGlzKSAmJiBNZWRpYUluZm8uaXNWaWRlb1JlYWR5KHRoaXMpICYmIE1lZGlhSW5mby5pc0F1ZGlvUmVhZHkodGhpcylcbiAgfVxuXG4gIHN0YXRpYyBpc0Jhc2VJbmZvUmVhZHkgKG1lZGlhSW5mbykge1xuICAgIHJldHVybiBpc09iamVjdEZpbGxlZChtZWRpYUluZm8pXG4gIH1cblxuICBzdGF0aWMgaXNWaWRlb1JlYWR5IChtZWRpYUluZm8pIHtcbiAgICBpZiAoIW1lZGlhSW5mby5oYXNWaWRlbykge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4gaXNPYmplY3RGaWxsZWQobWVkaWFJbmZvLnZpZGVvKVxuICB9XG5cbiAgc3RhdGljIGlzQXVkaW9SZWFkeSAobWVkaWFJbmZvKSB7XG4gICAgaWYgKCFtZWRpYUluZm8uaGFzQXVkaW8pIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgcmV0dXJuIGlzT2JqZWN0RmlsbGVkKG1lZGlhSW5mby52aWRlbylcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVkaWFTYW1wbGUge1xuICBjb25zdHJ1Y3RvciAoaW5mbykge1xuICAgIGxldCBfZGVmYXVsdCA9IE1lZGlhU2FtcGxlLmdldERlZmF1bHRJbmYoKVxuXG4gICAgaWYgKCFpbmZvIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbmZvKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgIHJldHVybiBfZGVmYXVsdFxuICAgIH1cbiAgICBsZXQgc2FtcGxlID0gT2JqZWN0LmFzc2lnbih7fSwgX2RlZmF1bHQsIGluZm8pXG5cbiAgICBPYmplY3QuZW50cmllcyhzYW1wbGUpLmZvckVhY2goKFtrLCB2XSkgPT4ge1xuICAgICAgdGhpc1trXSA9IHZcbiAgICB9KVxuICB9XG5cbiAgc3RhdGljIGdldERlZmF1bHRJbmYgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkdHM6IG51bGwsXG4gICAgICBwdHM6IG51bGwsXG4gICAgICBkdXJhdGlvbjogbnVsbCxcbiAgICAgIHBvc2l0aW9uOiBudWxsLFxuICAgICAgaXNSQVA6IGZhbHNlLCAvLyBpcyBSYW5kb20gYWNjZXNzIHBvaW50XG4gICAgICBvcmlnaW5EdHM6IG51bGxcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lZGlhU2VnbWVudExpc3Qge1xuXG4gICAgY29uc3RydWN0b3IgKHR5cGUpIHtcbiAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuX2xpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5fbGFzdEFwcGVuZExvY2F0aW9uID0gLTE7IC8vIGNhY2hlZCBsYXN0IGluc2VydCBsb2NhdGlvblxuICAgIH1cblxuICAgIGdldCB0eXBlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gICAgfVxuXG4gICAgZ2V0IGxlbmd0aCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0Lmxlbmd0aDtcbiAgICB9XG5cbiAgICBpc0VtcHR5ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3QubGVuZ3RoID09PSAwO1xuICAgIH1cblxuICAgIGNsZWFyICgpIHtcbiAgICAgICAgdGhpcy5fbGlzdCA9IFtdO1xuICAgICAgICB0aGlzLl9sYXN0QXBwZW5kTG9jYXRpb24gPSAtMTtcbiAgICB9XG5cbiAgICBfc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUgKGJlZ2luRHRzKSB7XG4gICAgICAgIGxldCBsaXN0ID0gdGhpcy5fbGlzdDtcbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gLTI7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxhc3QgPSBsaXN0Lmxlbmd0aCAtIDE7XG4gICAgICAgIGxldCBtaWQgPSAwO1xuICAgICAgICBsZXQgbGJvdW5kID0gMDtcbiAgICAgICAgbGV0IHVib3VuZCA9IGxhc3Q7XG5cbiAgICAgICAgbGV0IGlkeCA9IDA7XG5cbiAgICAgICAgaWYgKGJlZ2luRHRzIDwgbGlzdFswXS5vcmlnaW5EdHMpIHtcbiAgICAgICAgICAgIGlkeCA9IC0xO1xuICAgICAgICAgICAgcmV0dXJuIGlkeDtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChsYm91bmQgPD0gdWJvdW5kKSB7XG4gICAgICAgICAgICBtaWQgPSBsYm91bmQgKyBNYXRoLmZsb29yKCh1Ym91bmQgLSBsYm91bmQpIC8gMik7XG4gICAgICAgICAgICBpZiAobWlkID09PSBsYXN0IHx8IChiZWdpbkR0cyA+IGxpc3RbbWlkXS5sYXN0U2FtcGxlLm9yaWdpbkR0c1xuICAgICAgICAgICAgICAgICAgICAmJiAoYmVnaW5EdHMgPCBsaXN0W21pZCArIDFdLm9yaWdpbkR0cykpKSB7XG4gICAgICAgICAgICAgICAgaWR4ID0gbWlkO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsaXN0W21pZF0ub3JpZ2luRHRzIDwgYmVnaW5EdHMpIHtcbiAgICAgICAgICAgICAgICBsYm91bmQgPSBtaWQgKyAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB1Ym91bmQgPSBtaWQgLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpZHg7XG4gICAgfVxuXG4gICAgX3NlYXJjaE5lYXJlc3RTZWdtZW50QWZ0ZXIgKGJlZ2luRHRzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWFyY2hOZWFyZXN0U2VnbWVudEJlZm9yZShiZWdpbkR0cykgKyAxO1xuICAgIH1cblxuICAgIGFwcGVuZCAoc2VnbWVudCkge1xuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuX2xpc3Q7XG4gICAgICAgIGxldCBsYXN0QXBwZW5kSWR4ID0gdGhpcy5fbGFzdEFwcGVuZExvY2F0aW9uO1xuICAgICAgICBsZXQgaW5zZXJ0SWR4ID0gMDtcblxuICAgICAgICBpZiAobGFzdEFwcGVuZElkeCAhPT0gLTEgJiYgbGFzdEFwcGVuZElkeCA8IGxpc3QubGVuZ3RoXG4gICAgICAgICAgICAmJiBzZWdtZW50Lm9yaWdpblN0YXJ0RHRzID49IGxpc3RbbGFzdEFwcGVuZElkeF0ubGFzdFNhbXBsZS5vcmlnaW5EdHNcbiAgICAgICAgICAgICYmICgobGFzdEFwcGVuZElkeCA9PT0gbGlzdC5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICAgIHx8IChsYXN0QXBwZW5kSWR4IDwgbGlzdC5sZW5ndGggLSAxXG4gICAgICAgICAgICAgICAgICAgICYmIHNlZ21lbnQub3JpZ2luU3RhcnREdHMgPCBsaXN0W2xhc3RBcHBlbmRJZHggKyAxXS5vcmlnaW5TdGFydER0cykpKSB7XG4gICAgICAgICAgICBpbnNlcnRJZHggPSBsYXN0QXBwZW5kSWR4ICsgMTsgLy8gdXNlIGNhY2hlZCBsb2NhdGlvbiBpZHhcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChsaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBpbnNlcnRJZHggPSB0aGlzLl9zZWFyY2hOZWFyZXN0U2VnbWVudEJlZm9yZShzZWdtZW50Lm9yaWdpblN0YXJ0RHRzKSArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9sYXN0QXBwZW5kTG9jYXRpb24gPSBpbnNlcnRJZHg7XG4gICAgICAgIHRoaXMuX2xpc3Quc3BsaWNlKGluc2VydElkeCwgMCwgc2VnbWVudCk7XG4gICAgfVxuXG4gICAgZ2V0TGFzdFNlZ21lbnRCZWZvcmUgKGJlZ2luRHRzKSB7XG4gICAgICAgIGxldCBpZHggPSB0aGlzLl9zZWFyY2hOZWFyZXN0U2VnbWVudEJlZm9yZShiZWdpbkR0cyk7XG4gICAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RbaWR4XTtcbiAgICAgICAgfSBlbHNlIHsgLy8gLTFcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TGFzdFNhbXBsZUJlZm9yZSAoYmVnaW5EdHMpIHtcbiAgICAgICAgbGV0IHNlZ21lbnQgPSB0aGlzLmdldExhc3RTZWdtZW50QmVmb3JlKGJlZ2luRHRzKTtcbiAgICAgICAgaWYgKHNlZ21lbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWdtZW50Lmxhc3RTYW1wbGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldExhc3RSQVBCZWZvcmUgKGJlZ2luRHRzKSB7XG4gICAgICAgIGxldCBzZWdtZW50SWR4ID0gdGhpcy5fc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUoYmVnaW5EdHMpO1xuICAgICAgICBsZXQgcmFuZG9tQWNjZXNzUG9pbnRzID0gdGhpcy5fbGlzdFtzZWdtZW50SWR4XS5yYW5kb21BY2Nlc3NQb2ludHM7XG4gICAgICAgIHdoaWxlIChyYW5kb21BY2Nlc3NQb2ludHMubGVuZ3RoID09PSAwICYmIHNlZ21lbnRJZHggPiAwKSB7XG4gICAgICAgICAgICBzZWdtZW50SWR4LS07XG4gICAgICAgICAgICByYW5kb21BY2Nlc3NQb2ludHMgPSB0aGlzLl9saXN0W3NlZ21lbnRJZHhdLnJhbmRvbUFjY2Vzc1BvaW50cztcbiAgICAgICAgfVxuICAgICAgICBpZiAocmFuZG9tQWNjZXNzUG9pbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiByYW5kb21BY2Nlc3NQb2ludHNbcmFuZG9tQWNjZXNzUG9pbnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNZWRpYVNlZ21lbnQge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgdGhpcy5zdGFydER0cyA9IC0xO1xuICAgICAgICB0aGlzLmVuZER0cyA9IC0xO1xuICAgICAgICB0aGlzLnN0YXJ0UHRzID0gLTE7XG4gICAgICAgIHRoaXMuZW5kUHRzID0gLTE7XG4gICAgICAgIHRoaXMub3JpZ2luU3RhcnREdHMgPSAtMTtcbiAgICAgICAgdGhpcy5vcmlnaW5FbmREdHMgPSAtMTtcbiAgICAgICAgdGhpcy5yYW5kb21BY2Nlc3NQb2ludHMgPSBbXTtcbiAgICAgICAgdGhpcy5maXJzdFNhbXBsZSA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdFNhbXBsZSA9IG51bGw7XG4gICAgfVxuXG4gICAgYWRkUkFQIChzYW1wbGUpIHtcbiAgICAgICAgc2FtcGxlLmlzUkFQID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yYW5kb21BY2Nlc3NQb2ludHMucHVzaChzYW1wbGUpO1xuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgQXVkaW9UcmFja01ldGEge1xuICBjb25zdHJ1Y3RvciAobWV0YSkge1xuICAgIGNvbnN0IF9kZWZhdWx0ID0ge1xuICAgICAgc2FtcGxlUmF0ZTogNDgwMDAsXG4gICAgICBjaGFubmVsQ291bnQ6IDIsXG4gICAgICBjb2RlYzogJ21wNGEuNDAuMicsXG4gICAgICBjb25maWc6IFs0MSwgNDAxLCAxMzYsIDBdLFxuICAgICAgZHVyYXRpb246IDAsXG4gICAgICBpZDogMixcbiAgICAgIHJlZlNhbXBsZUR1cmF0aW9uOiAyMSxcbiAgICAgIHNhbXBsZVJhdGVJbmRleDogMyxcbiAgICAgIHRpbWVzY2FsZTogMTAwMCxcbiAgICAgIHR5cGU6ICdhdWRpbydcbiAgICB9XG4gICAgaWYgKG1ldGEpIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBfZGVmYXVsdCwgbWV0YSlcbiAgICB9XG4gICAgcmV0dXJuIF9kZWZhdWx0XG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmluaXQgPSBudWxsXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFZpZGVvVHJhY2tNZXRhIHtcbiAgY29uc3RydWN0b3IgKG1ldGEpIHtcbiAgICBjb25zdCBfZGVmYXVsdCA9IHtcbiAgICAgIGF2Y2M6IG51bGwsXG4gICAgICBzcHM6IG5ldyBVaW50OEFycmF5KDApLFxuICAgICAgcHBzOiBuZXcgVWludDhBcnJheSgwKSxcbiAgICAgIGNocm9tYUZvcm1hdDogNDIwLFxuICAgICAgY29kZWM6ICdhdmMxLjY0MDAyMCcsXG4gICAgICBjb2RlY0hlaWdodDogNzIwLFxuICAgICAgY29kZWNXaWR0aDogMTI4MCxcbiAgICAgIGR1cmF0aW9uOiAwLFxuICAgICAgZnJhbWVSYXRlOiB7XG4gICAgICAgIGZpeGVkOiB0cnVlLFxuICAgICAgICBmcHM6IDI1LFxuICAgICAgICBmcHNfbnVtOiAyNTAwMCxcbiAgICAgICAgZnBzX2RlbjogMTAwMFxuICAgICAgfSxcbiAgICAgIGlkOiAxLFxuICAgICAgbGV2ZWw6ICczLjInLFxuICAgICAgcHJlc2VudEhlaWdodDogNzIwLFxuICAgICAgcHJlc2VudFdpZHRoOiAxMjgwLFxuICAgICAgcHJvZmlsZTogJ0hpZ2gnLFxuICAgICAgcmVmU2FtcGxlRHVyYXRpb246IDQwLFxuICAgICAgcGFyUmF0aW86IHtcbiAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICB3aWR0aDogMVxuICAgICAgfSxcbiAgICAgIHRpbWVzY2FsZTogMTAwMCxcbiAgICAgIHR5cGU6ICd2aWRlbydcbiAgICB9XG5cbiAgICBpZiAobWV0YSkge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIF9kZWZhdWx0LCBtZXRhKVxuICAgIH1cbiAgICByZXR1cm4gX2RlZmF1bHRcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuaW5pdCA9IG51bGxcbiAgICB0aGlzLnNwcyA9IG51bGxcbiAgICB0aGlzLnBwcyA9IG51bGxcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEF1ZGlvVHJhY2tTYW1wbGUge1xuICBjb25zdHJ1Y3RvciAoaW5mbykge1xuICAgIGxldCBfZGVmYXVsdCA9IEF1ZGlvVHJhY2tTYW1wbGUuZ2V0RGVmYXVsdCgpXG4gICAgaWYgKCFpbmZvKSB7XG4gICAgICByZXR1cm4gX2RlZmF1bHRcbiAgICB9XG4gICAgbGV0IHNhbXBsZSA9IE9iamVjdC5hc3NpZ24oe30sIF9kZWZhdWx0LCBpbmZvKVxuXG4gICAgcmV0dXJuIHNhbXBsZVxuICB9XG5cbiAgc3RhdGljIGdldERlZmF1bHQgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkdHM6IG51bGwsXG4gICAgICBwdHM6IG51bGwsXG4gICAgICBkYXRhOiBuZXcgVWludDhBcnJheSgpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWaWRlb1RyYWNrU2FtcGxlIHtcbiAgY29uc3RydWN0b3IgKGluZm8pIHtcbiAgICBsZXQgX2RlZmF1bHQgPSBWaWRlb1RyYWNrU2FtcGxlLmdldERlZmF1bHQoKVxuXG4gICAgaWYgKCFpbmZvKSB7XG4gICAgICByZXR1cm4gX2RlZmF1bHRcbiAgICB9XG4gICAgbGV0IHNhbXBsZSA9IE9iamVjdC5hc3NpZ24oe30sIF9kZWZhdWx0LCBpbmZvKVxuXG4gICAgcmV0dXJuIHNhbXBsZVxuICB9XG5cbiAgc3RhdGljIGdldERlZmF1bHQgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkdHM6IG51bGwsXG4gICAgICBwdHM6IG51bGwsXG4gICAgICBpc0tleWZyYW1lOiBmYWxzZSwgLy8gaXMgUmFuZG9tIGFjY2VzcyBwb2ludFxuICAgICAgb3JpZ2luRHRzOiBudWxsLFxuICAgICAgZGF0YTogbmV3IFVpbnQ4QXJyYXkoKVxuICAgIH1cbiAgfVxufVxuIiwiY2xhc3MgTVNFIHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZ3MpIHtcbiAgICB0aGlzLmNvbmZpZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWdzKTtcbiAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMuY29uZmlncy5jb250YWluZXI7XG4gICAgdGhpcy5tZWRpYVNvdXJjZSA9IG51bGw7XG4gICAgdGhpcy5zb3VyY2VCdWZmZXJzID0ge307XG4gICAgdGhpcy5wcmVsb2FkVGltZSA9IHRoaXMuY29uZmlncy5wcmVsb2FkVGltZSB8fCAxO1xuICAgIHRoaXMub25Tb3VyY2VPcGVuID0gdGhpcy5vblNvdXJjZU9wZW4uYmluZCh0aGlzKVxuICAgIHRoaXMub25UaW1lVXBkYXRlID0gdGhpcy5vblRpbWVVcGRhdGUuYmluZCh0aGlzKVxuICAgIHRoaXMub25VcGRhdGVFbmQgPSB0aGlzLm9uVXBkYXRlRW5kLmJpbmQodGhpcylcbiAgICB0aGlzLm9uV2FpdGluZyA9IHRoaXMub25XYWl0aW5nLmJpbmQodGhpcylcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIHRoaXMubWVkaWFTb3VyY2UgPSBuZXcgc2VsZi5NZWRpYVNvdXJjZSgpO1xuICAgIHRoaXMubWVkaWFTb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcignc291cmNlb3BlbicsIHRoaXMub25Tb3VyY2VPcGVuKTtcbiAgICB0aGlzLmNvbnRhaW5lci5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHRoaXMubWVkaWFTb3VyY2UpO1xuICAgIHRoaXMudXJsID0gdGhpcy5jb250YWluZXIuc3JjO1xuICAgIHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RpbWV1cGRhdGUnLCB0aGlzLm9uVGltZVVwZGF0ZSk7XG4gICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignd2FpdGluZycsIHRoaXMub25XYWl0aW5nKTtcbiAgfVxuXG4gIG9uVGltZVVwZGF0ZSAoKSB7XG4gICAgdGhpcy5lbWl0KCdUSU1FX1VQREFURScsIHRoaXMuY29udGFpbmVyKTtcbiAgfVxuXG4gIG9uV2FpdGluZyAoKSB7XG4gICAgdGhpcy5lbWl0KCdXQUlUSU5HJywgdGhpcy5jb250YWluZXIpO1xuICB9XG5cbiAgb25Tb3VyY2VPcGVuICgpIHtcbiAgICB0aGlzLmFkZFNvdXJjZUJ1ZmZlcnMoKTtcbiAgfVxuXG4gIG9uVXBkYXRlRW5kICgpIHtcbiAgICB0aGlzLmVtaXQoJ1NPVVJDRV9VUERBVEVfRU5EJyk7XG4gICAgdGhpcy5kb0FwcGVuZCgpXG4gIH1cbiAgYWRkU291cmNlQnVmZmVycyAoKSB7XG4gICAgaWYgKHRoaXMubWVkaWFTb3VyY2UucmVhZHlTdGF0ZSAhPT0gJ29wZW4nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBzb3VyY2VzID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnUFJFX1NPVVJDRV9CVUZGRVInKTtcbiAgICBsZXQgdHJhY2tzID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJyk7XG4gICAgbGV0IHRyYWNrO1xuXG4gICAgc291cmNlcyA9IHNvdXJjZXMuc291cmNlcztcbiAgICBsZXQgYWRkID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDAsIGsgPSBPYmplY3Qua2V5cyhzb3VyY2VzKS5sZW5ndGg7IGkgPCBrOyBpKyspIHtcbiAgICAgIGxldCB0eXBlID0gT2JqZWN0LmtleXMoc291cmNlcylbaV07XG4gICAgICBpZiAodHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgICB0cmFjayA9IHRyYWNrcy5hdWRpb1RyYWNrO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAndmlkZW8nKSB7XG4gICAgICAgIHRyYWNrID0gdHJhY2tzLnZpZGVvVHJhY2s7XG4gICAgICAgIC8vIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0cmFjaykge1xuICAgICAgICBsZXQgZHVyID0gdHlwZSA9PT0gJ2F1ZGlvJyA/IDIxIDogNDA7XG4gICAgICAgIGlmICh0cmFjay5tZXRhICYmIHRyYWNrLm1ldGEucmVmU2FtcGxlRHVyYXRpb24pIGR1ciA9IHRyYWNrLm1ldGEucmVmU2FtcGxlRHVyYXRpb247XG4gICAgICAgIGlmIChzb3VyY2VzW3R5cGVdLmRhdGEubGVuZ3RoID49ICh0aGlzLnByZWxvYWRUaW1lIC8gZHVyKSkge1xuICAgICAgICAgIGFkZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYWRkKSB7XG4gICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAwLCBrID0gT2JqZWN0LmtleXMoc291cmNlcykubGVuZ3RoOyBpIDwgazsgaSsrKSB7XG4gICAgICAgIGxldCB0eXBlID0gT2JqZWN0LmtleXMoc291cmNlcylbaV07XG4gICAgICAgIGxldCBzb3VyY2UgPSBzb3VyY2VzW3R5cGVdXG4gICAgICAgIGxldCBtaW1lID0gKHR5cGUgPT09ICd2aWRlbycpID8gJ3ZpZGVvL21wNDtjb2RlY3M9JyArIHNvdXJjZS5taW1ldHlwZSA6ICdhdWRpby9tcDQ7Y29kZWNzPScgKyBzb3VyY2UubWltZXR5cGVcbiAgICAgICAgbGV0IHNvdXJjZUJ1ZmZlciA9IHRoaXMubWVkaWFTb3VyY2UuYWRkU291cmNlQnVmZmVyKG1pbWUpO1xuICAgICAgICB0aGlzLnNvdXJjZUJ1ZmZlcnNbdHlwZV0gPSBzb3VyY2VCdWZmZXI7XG4gICAgICAgIHNvdXJjZUJ1ZmZlci5hZGRFdmVudExpc3RlbmVyKCd1cGRhdGVlbmQnLCB0aGlzLm9uVXBkYXRlRW5kKTtcbiAgICAgICAgdGhpcy5kb0FwcGVuZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRvQXBwZW5kICgpIHtcbiAgICBsZXQgc291cmNlcyA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1BSRV9TT1VSQ0VfQlVGRkVSJyk7XG4gICAgaWYgKHNvdXJjZXMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKS5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdHlwZSA9IE9iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycylbaV1cbiAgICAgICAgbGV0IHNvdXJjZUJ1ZmZlciA9IHRoaXMuc291cmNlQnVmZmVyc1t0eXBlXTtcbiAgICAgICAgaWYgKCFzb3VyY2VCdWZmZXIudXBkYXRpbmcpIHtcbiAgICAgICAgICBsZXQgc291cmNlID0gc291cmNlcy5zb3VyY2VzW3R5cGVdO1xuICAgICAgICAgIGlmIChzb3VyY2UgJiYgIXNvdXJjZS5pbml0ZWQpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdhcHBlbmQgaW5pdGlhbCBzZWdtZW50JylcbiAgICAgICAgICAgIHNvdXJjZUJ1ZmZlci5hcHBlbmRCdWZmZXIoc291cmNlLmluaXQuYnVmZmVyLmJ1ZmZlcik7XG4gICAgICAgICAgICBzb3VyY2UuaW5pdGVkID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNvdXJjZSkge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBzb3VyY2UuZGF0YS5zaGlmdCgpXG4gICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICBzb3VyY2VCdWZmZXIuYXBwZW5kQnVmZmVyKGRhdGEuYnVmZmVyLmJ1ZmZlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZW5kT2ZTdHJlYW0gKCkge1xuICAgIGNvbnN0IHsgcmVhZHlTdGF0ZSwgYWN0aXZlU291cmNlQnVmZmVycyB9ID0gdGhpcy5tZWRpYVNvdXJjZTtcbiAgICBpZiAocmVhZHlTdGF0ZSA9PT0gJ29wZW4nICYmIGFjdGl2ZVNvdXJjZUJ1ZmZlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLm1lZGlhU291cmNlLmVuZE9mU3RyZWFtKClcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gbG9nXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlIChlbmQsIHN0YXJ0ID0gMCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKS5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGJ1ZmZlciA9IHRoaXMuc291cmNlQnVmZmVyc1tPYmplY3Qua2V5cyh0aGlzLnNvdXJjZUJ1ZmZlcnMpW2ldXTtcbiAgICAgIGlmICghYnVmZmVyLnVwZGF0aW5nKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHN0YXJ0LCBlbmQpXG4gICAgICAgIGJ1ZmZlci5yZW1vdmUoc3RhcnQsIGVuZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJlbW92ZUJ1ZmZlcnMgKCkge1xuICAgIGNvbnN0IHRhc2tMaXN0ID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE9iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycykubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBidWZmZXIgPSB0aGlzLnNvdXJjZUJ1ZmZlcnNbT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKVtpXV07XG4gICAgICBidWZmZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndXBkYXRlZW5kJywgdGhpcy5vblVwZGF0ZUVuZCk7XG5cbiAgICAgIGxldCB0YXNrO1xuICAgICAgaWYgKGJ1ZmZlci51cGRhdGluZykge1xuICAgICAgICB0YXNrID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICBjb25zdCBkb0NsZWFuQnVmZmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IHJldHJ5VGltZSA9IDNcblxuICAgICAgICAgICAgY29uc3QgY2xlYW4gPSAoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghYnVmZmVyLnVwZGF0aW5nKSB7XG4gICAgICAgICAgICAgICAgTVNFLmNsZWFyQnVmZmVyKGJ1ZmZlcilcbiAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXRyeVRpbWUgPiAwKXtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNsZWFuLCAyMDApXG4gICAgICAgICAgICAgICAgcmV0cnlUaW1lLS1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGNsZWFuLCAyMDApXG4gICAgICAgICAgICBidWZmZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndXBkYXRlZW5kJywgZG9DbGVhbkJ1ZmZlcilcbiAgICAgICAgICB9XG4gICAgICAgICAgYnVmZmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3VwZGF0ZWVuZCcsIGRvQ2xlYW5CdWZmZXIpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBNU0UuY2xlYXJCdWZmZXIoYnVmZmVyKVxuICAgICAgICB0YXNrID0gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgIH1cblxuICAgICAgdGFza0xpc3QucHVzaCh0YXNrKVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLmFsbCh0YXNrTGlzdClcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHJldHVybiB0aGlzLnJlbW92ZUJ1ZmZlcnMoKS50aGVuKCgpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKS5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgYnVmZmVyID0gdGhpcy5zb3VyY2VCdWZmZXJzW09iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycylbaV1dO1xuICAgICAgICB0aGlzLm1lZGlhU291cmNlLnJlbW92ZVNvdXJjZUJ1ZmZlcihidWZmZXIpO1xuICAgICAgICBkZWxldGUgdGhpcy5zb3VyY2VCdWZmZXJzW09iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycylbaV1dO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgdGhpcy5vblRpbWVVcGRhdGUpO1xuICAgICAgdGhpcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2FpdGluZycsIHRoaXMub25XYWl0aW5nKTtcbiAgICAgIHRoaXMubWVkaWFTb3VyY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcignc291cmNlb3BlbicsIHRoaXMub25Tb3VyY2VPcGVuKTtcblxuICAgICAgdGhpcy5lbmRPZlN0cmVhbSgpXG4gICAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTCh0aGlzLnVybCk7XG5cbiAgICAgIHRoaXMudXJsID0gbnVsbFxuICAgICAgdGhpcy5jb25maWdzID0ge307XG4gICAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gICAgICB0aGlzLm1lZGlhU291cmNlID0gbnVsbDtcbiAgICAgIHRoaXMuc291cmNlQnVmZmVycyA9IHt9O1xuICAgICAgdGhpcy5wcmVsb2FkVGltZSA9IDE7XG4gICAgfSlcbiAgfVxuXG4gIHN0YXRpYyBjbGVhckJ1ZmZlciAoYnVmZmVyKSB7XG4gICAgY29uc3QgYnVmZmVyZWQgPSBidWZmZXIuYnVmZmVyZWQ7XG4gICAgbGV0IGJFbmQgPSAwLjFcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYnVmZmVyZWQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGJFbmQgPSBidWZmZXJlZC5lbmQoaSlcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGJ1ZmZlci5yZW1vdmUoMCwgYkVuZClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBETyBOT1RISU5HXG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBNU0U7XG4iLCJpbXBvcnQgQ29uY2F0IGZyb20gJ2NvbmNhdC10eXBlZC1hcnJheSdcblxuY2xhc3MgQnVmZmVyIHtcbiAgY29uc3RydWN0b3IgKGJ1ZmZlcikge1xuICAgIHRoaXMuYnVmZmVyID0gYnVmZmVyIHx8IG5ldyBVaW50OEFycmF5KDApXG4gIH1cblxuICB3cml0ZSAoLi4uYnVmZmVyKSB7XG4gICAgYnVmZmVyLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICB0aGlzLmJ1ZmZlciA9IENvbmNhdChVaW50OEFycmF5LCB0aGlzLmJ1ZmZlciwgaXRlbSlcbiAgICB9KVxuICB9XG5cbiAgc3RhdGljIHdyaXRlVWludDMyICh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgVWludDhBcnJheShbXG4gICAgICB2YWx1ZSA+PiAyNCxcbiAgICAgICh2YWx1ZSA+PiAxNikgJiAweGZmLFxuICAgICAgKHZhbHVlID4+IDgpICYgMHhmZixcbiAgICAgIHZhbHVlICYgMHhmZlxuICAgIF0pXG4gIH1cblxuICBzdGF0aWMgcmVhZEFzSW50IChhcnIpIHtcbiAgICBsZXQgdGVtcCA9ICcnXG5cbiAgICBmdW5jdGlvbiBwYWRTdGFydDRIZXggKGhleE51bSkge1xuICAgICAgbGV0IGhleFN0ciA9IGhleE51bS50b1N0cmluZygxNilcbiAgICAgIHJldHVybiBoZXhTdHIucGFkU3RhcnQoMiwgJzAnKVxuICAgIH1cblxuICAgIGFyci5mb3JFYWNoKG51bSA9PiB7XG4gICAgICB0ZW1wICs9IHBhZFN0YXJ0NEhleChudW0pXG4gICAgfSlcbiAgICByZXR1cm4gcGFyc2VJbnQodGVtcCwgMTYpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQnVmZmVyXG4iLCJjbGFzcyBTdHJlYW0ge1xuICBjb25zdHJ1Y3RvciAoYnVmZmVyKSB7XG4gICAgaWYgKGJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICB0aGlzLmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgIHRoaXMuZGF0YXZpZXcgPSBuZXcgRGF0YVZpZXcoYnVmZmVyKTtcbiAgICAgIHRoaXMuZGF0YXZpZXcucG9zaXRpb24gPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RhdGEgaXMgaW52YWxpZCcpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBsZW5ndGggKCkge1xuICAgIHJldHVybiB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoO1xuICB9XG5cbiAgc2V0IHBvc2l0aW9uICh2YWx1ZSkge1xuICAgIHRoaXMuZGF0YXZpZXcucG9zaXRpb24gPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBwb3NpdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YXZpZXcucG9zaXRpb247XG4gIH1cblxuICBiYWNrIChjb3VudCkge1xuICAgIHRoaXMucG9zaXRpb24gLT0gY291bnQ7XG4gIH1cblxuICBza2lwIChjb3VudCkge1xuICAgIGxldCBsb29wID0gTWF0aC5mbG9vcihjb3VudCAvIDQpO1xuICAgIGxldCBsYXN0ID0gY291bnQgJSA0O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbG9vcDsgaSsrKSB7XG4gICAgICBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgNCk7XG4gICAgfVxuICAgIGlmIChsYXN0ID4gMCkge1xuICAgICAgU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIGxhc3QpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBbcmVhZEJ5dGUg5LuORGF0YVZpZXfkuK3or7vlj5bmlbDmja5dXG4gICAqIEBwYXJhbSAge0RhdGFWaWV3fSBidWZmZXIgW0RhdGFWaWV35a6e5L6LXVxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHNpemUgICBb6K+75Y+W5a2X6IqC5pWwXVxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9ICAgICAgICBb5pW05pWwXVxuICAgKi9cbiAgc3RhdGljIHJlYWRCeXRlIChidWZmZXIsIHNpemUsIHNpZ24pIHtcbiAgICBsZXQgcmVzO1xuICAgIHN3aXRjaCAoc2l6ZSkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICBpZiAoc2lnbikge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRJbnQ4KGJ1ZmZlci5wb3NpdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzID0gYnVmZmVyLmdldFVpbnQ4KGJ1ZmZlci5wb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGlmIChzaWduKSB7XG4gICAgICAgICAgcmVzID0gYnVmZmVyLmdldEludDE2KGJ1ZmZlci5wb3NpdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzID0gYnVmZmVyLmdldFVpbnQxNihidWZmZXIucG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBpZiAoc2lnbikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IHN1cHBvcnRlZCBmb3IgcmVhZEJ5dGUgMycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRVaW50OChidWZmZXIucG9zaXRpb24pIDw8IDE2O1xuICAgICAgICAgIHJlcyB8PSBidWZmZXIuZ2V0VWludDgoYnVmZmVyLnBvc2l0aW9uICsgMSkgPDwgODtcbiAgICAgICAgICByZXMgfD0gYnVmZmVyLmdldFVpbnQ4KGJ1ZmZlci5wb3NpdGlvbiArIDIpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0OlxuICAgICAgICBpZiAoc2lnbikge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRJbnQzMihidWZmZXIucG9zaXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRVaW50MzIoYnVmZmVyLnBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgODpcbiAgICAgICAgaWYgKHNpZ24pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBzdXBwb3J0ZWQgZm9yIHJlYWRCb2R5IDgnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXMgPSBidWZmZXIuZ2V0VWludDMyKGJ1ZmZlci5wb3NpdGlvbikgPDwgMzI7XG4gICAgICAgICAgcmVzIHw9IGJ1ZmZlci5nZXRVaW50MzIoYnVmZmVyLnBvc2l0aW9uICsgNCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXMgPSAnJztcbiAgICB9XG4gICAgYnVmZmVyLnBvc2l0aW9uICs9IHNpemU7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHJlYWRVaW50OCAoKSB7XG4gICAgcmV0dXJuIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCAxKTtcbiAgfVxuXG4gIHJlYWRVaW50MTYgKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgMik7XG4gIH1cblxuICByZWFkVWludDI0ICgpIHtcbiAgICByZXR1cm4gU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIDMpO1xuICB9XG5cbiAgcmVhZFVpbnQzMiAoKSB7XG4gICAgcmV0dXJuIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCA0KTtcbiAgfVxuXG4gIHJlYWRVaW50NjQgKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgOCk7XG4gIH1cblxuICByZWFkSW50OCAoKSB7XG4gICAgcmV0dXJuIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCAxLCB0cnVlKTtcbiAgfVxuICByZWFkSW50MTYgKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgMiwgdHJ1ZSk7XG4gIH1cblxuICByZWFkSW50MzIgKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgNCwgdHJ1ZSk7XG4gIH1cblxuICB3cml0ZVVpbnQzMiAodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgdmFsdWUgPj4+IDI0ICYgMHhmZixcbiAgICAgIHZhbHVlID4+PiAxNiAmIDB4ZmYsXG4gICAgICB2YWx1ZSA+Pj4gOCAmIDB4ZmYsXG4gICAgICB2YWx1ZSAmIDB4ZmZcbiAgICBdKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdHJlYW07XG4iLCJpbXBvcnQgUmVtdXhlciBmcm9tICd4Z3BsYXllci1yZW11eCdcbmltcG9ydCB7IEZldGNoTG9hZGVyIH0gZnJvbSAneGdwbGF5ZXItbG9hZGVyJ1xuaW1wb3J0IHsgRmx2RGVtdXhlciB9IGZyb20gJ3hncGxheWVyLWRlbXV4J1xuaW1wb3J0IHsgVHJhY2tzLCBYZ0J1ZmZlciwgUHJlU291cmNlIH0gZnJvbSAneGdwbGF5ZXItYnVmZmVyJ1xuaW1wb3J0IHsgTXNlLCBFVkVOVFMgfSBmcm9tICd4Z3BsYXllci11dGlscydcbmltcG9ydCB7IENvbXBhdGliaWxpdHkgfSBmcm9tICd4Z3BsYXllci1jb2RlYydcbmltcG9ydCBQbGF5ZXIgZnJvbSAneGdwbGF5ZXInXG5cbmNvbnN0IFJFTVVYX0VWRU5UUyA9IEVWRU5UUy5SRU1VWF9FVkVOVFM7XG5jb25zdCBERU1VWF9FVkVOVFMgPSBFVkVOVFMuREVNVVhfRVZFTlRTO1xuY29uc3QgTE9BREVSX0VWRU5UUyA9IEVWRU5UUy5MT0FERVJfRVZFTlRTXG5jb25zdCBNU0VfRVZFTlRTID0gRVZFTlRTLk1TRV9FVkVOVFNcblxuY29uc3QgVGFnID0gJ0ZMVkNvbnRyb2xsZXInXG5cbmNsYXNzIExvZ2dlciB7XG4gIHdhcm4gKCkge31cbn1cblxuY29uc3QgRkxWX0VSUk9SID0gJ0ZMVl9FUlJPUidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmx2Q29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yIChwbGF5ZXIpIHtcbiAgICB0aGlzLlRBRyA9IFRhZ1xuICAgIHRoaXMuX3BsYXllciA9IHBsYXllclxuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGluaXRTZWdtZW50QXJyaXZlZDogZmFsc2VcbiAgICB9XG5cbiAgICB0aGlzLmJ1ZmZlckNsZWFyVGltZXIgPSBudWxsO1xuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgdGhpcy5fY29udGV4dC5yZWdpc3RyeSgnRkVUQ0hfTE9BREVSJywgRmV0Y2hMb2FkZXIpXG4gICAgdGhpcy5fY29udGV4dC5yZWdpc3RyeSgnTE9BREVSX0JVRkZFUicsIFhnQnVmZmVyKVxuXG4gICAgdGhpcy5fY29udGV4dC5yZWdpc3RyeSgnRkxWX0RFTVVYRVInLCBGbHZEZW11eGVyKVxuICAgIHRoaXMuX2NvbnRleHQucmVnaXN0cnkoJ1RSQUNLUycsIFRyYWNrcylcblxuICAgIHRoaXMuX2NvbnRleHQucmVnaXN0cnkoJ01QNF9SRU1VWEVSJywgUmVtdXhlci5NcDRSZW11eGVyKVxuICAgIHRoaXMuX2NvbnRleHQucmVnaXN0cnkoJ1BSRV9TT1VSQ0VfQlVGRkVSJywgUHJlU291cmNlKVxuXG4gICAgaWYgKHRoaXMuX3BsYXllci5jb25maWcuY29tcGF0aWJpbGl0eSAhPT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuX2NvbnRleHQucmVnaXN0cnkoJ0NPTVBBVElCSUxJVFknLCBDb21wYXRpYmlsaXR5KVxuICAgIH1cblxuICAgIHRoaXMuX2NvbnRleHQucmVnaXN0cnkoJ0xPR0dFUicsIExvZ2dlcilcbiAgICB0aGlzLm1zZSA9IHRoaXMuX2NvbnRleHQucmVnaXN0cnkoJ01TRScsIE1zZSkoeyBjb250YWluZXI6IHRoaXMuX3BsYXllci52aWRlbyB9KVxuXG4gICAgdGhpcy5faGFuZGxlVGltZVVwZGF0ZSA9IHRoaXMuX2hhbmRsZVRpbWVVcGRhdGUuYmluZCh0aGlzKVxuXG4gICAgdGhpcy5pbml0TGlzdGVuZXJzKClcbiAgfVxuXG4gIGluaXRMaXN0ZW5lcnMgKCkge1xuICAgIHRoaXMub24oTE9BREVSX0VWRU5UUy5MT0FERVJfREFUQUxPQURFRCwgdGhpcy5faGFuZGxlTG9hZGVyRGF0YUxvYWRlZC5iaW5kKHRoaXMpKVxuICAgIHRoaXMub24oTE9BREVSX0VWRU5UUy5MT0FERVJfRVJST1IsIHRoaXMuX2hhbmRsZU5ldHdvcmtFcnJvci5iaW5kKHRoaXMpKVxuXG4gICAgdGhpcy5vbihERU1VWF9FVkVOVFMuTUVESUFfSU5GTywgdGhpcy5faGFuZGxlTWVkaWFJbmZvLmJpbmQodGhpcykpXG4gICAgdGhpcy5vbihERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCB0aGlzLl9oYW5kbGVNZXRhZGF0YVBhcnNlZC5iaW5kKHRoaXMpKVxuICAgIHRoaXMub24oREVNVVhfRVZFTlRTLkRFTVVYX0NPTVBMRVRFLCB0aGlzLl9oYW5kbGVEZW11eENvbXBsZXRlLmJpbmQodGhpcykpXG4gICAgdGhpcy5vbihERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIHRoaXMuX2hhbmRsZURlbXV4RXJyb3IuYmluZCh0aGlzKSlcblxuICAgIHRoaXMub24oUkVNVVhfRVZFTlRTLklOSVRfU0VHTUVOVCwgdGhpcy5faGFuZGxlQXBwZW5kSW5pdFNlZ21lbnQuYmluZCh0aGlzKSlcbiAgICB0aGlzLm9uKFJFTVVYX0VWRU5UUy5NRURJQV9TRUdNRU5ULCB0aGlzLl9oYW5kbGVNZWRpYVNlZ21lbnQuYmluZCh0aGlzKSlcblxuICAgIHRoaXMub24oTVNFX0VWRU5UUy5TT1VSQ0VfVVBEQVRFX0VORCwgdGhpcy5faGFuZGxlU291cmNlVXBkYXRlRW5kLmJpbmQodGhpcykpXG5cbiAgICB0aGlzLl9wbGF5ZXIub24oJ3RpbWV1cGRhdGUnLCB0aGlzLl9oYW5kbGVUaW1lVXBkYXRlKVxuICB9XG5cbiAgX2hhbmRsZU1lZGlhSW5mbyAoKSB7XG4gICAgaWYgKCF0aGlzLl9jb250ZXh0Lm1lZGlhSW5mbykge1xuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgbmV3IEVycm9yKCdmYWlsZWQgdG8gZ2V0IG1lZGlhaW5mbycpKVxuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVMb2FkZXJEYXRhTG9hZGVkICgpIHtcbiAgICB0aGlzLmVtaXRUbygnRkxWX0RFTVVYRVInLCBERU1VWF9FVkVOVFMuREVNVVhfU1RBUlQpXG4gIH1cblxuICBfaGFuZGxlTWV0YWRhdGFQYXJzZWQgKHR5cGUpIHtcbiAgICB0aGlzLmVtaXQoUkVNVVhfRVZFTlRTLlJFTVVYX01FVEFEQVRBLCB0eXBlKVxuICB9XG4gIF9oYW5kbGVEZW11eENvbXBsZXRlICgpIHtcbiAgICB0aGlzLmVtaXQoUkVNVVhfRVZFTlRTLlJFTVVYX01FRElBKVxuICB9XG5cbiAgX2hhbmRsZUFwcGVuZEluaXRTZWdtZW50ICgpIHtcbiAgICB0aGlzLnN0YXRlLmluaXRTZWdtZW50QXJyaXZlZCA9IHRydWVcbiAgICB0aGlzLm1zZS5hZGRTb3VyY2VCdWZmZXJzKClcbiAgfVxuXG4gIF9oYW5kbGVNZWRpYVNlZ21lbnQgKCkge1xuICAgIHRoaXMubXNlLmFkZFNvdXJjZUJ1ZmZlcnMoKVxuICAgIHRoaXMubXNlLmRvQXBwZW5kKCk7XG4gIH1cblxuICBfaGFuZGxlU291cmNlVXBkYXRlRW5kICgpIHtcbiAgICBjb25zdCB0aW1lID0gdGhpcy5fcGxheWVyLmN1cnJlbnRUaW1lO1xuICAgIGNvbnN0IHZpZGVvID0gdGhpcy5fcGxheWVyLnZpZGVvO1xuICAgIGNvbnN0IHByZWxvYWRUaW1lID0gdGhpcy5fcGxheWVyLmNvbmZpZy5wcmVsb2FkVGltZSB8fCA1XG5cbiAgICBjb25zdCB7IGxlbmd0aCB9ID0gdmlkZW8uYnVmZmVyZWQ7XG5cbiAgICBpZiAobGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYnVmZmVyRW5kID0gdmlkZW8uYnVmZmVyZWQuZW5kKGxlbmd0aCAtIDEpO1xuICAgIGlmIChidWZmZXJFbmQgLSB0aW1lID4gcHJlbG9hZFRpbWUgKiAyKSB7XG4gICAgICB0aGlzLl9wbGF5ZXIuY3VycmVudFRpbWUgPSBidWZmZXJFbmQgLSBwcmVsb2FkVGltZVxuICAgIH1cbiAgICB0aGlzLm1zZS5kb0FwcGVuZCgpO1xuICB9XG5cbiAgX2hhbmRsZVRpbWVVcGRhdGUgKCkge1xuICAgIGNvbnN0IHRpbWUgPSB0aGlzLl9wbGF5ZXIuY3VycmVudFRpbWVcblxuICAgIGNvbnN0IHZpZGVvID0gdGhpcy5fcGxheWVyLnZpZGVvO1xuICAgIGxldCBidWZmZXJlZCA9IHZpZGVvLmJ1ZmZlcmVkXG5cbiAgICBpZiAoIWJ1ZmZlcmVkIHx8ICFidWZmZXJlZC5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBidWZmZXJTdGFydCA9IGJ1ZmZlcmVkLnN0YXJ0KGJ1ZmZlcmVkLmxlbmd0aCAtIDEpXG4gICAgLy8gY29uc3QgYnVmZmVyU3RhcnQgPSB0aGlzLl9wbGF5ZXIuZ2V0QnVmZmVyZWRSYW5nZSgpWzBdXG4gICAgaWYgKHRpbWUgLSBidWZmZXJTdGFydCA+IDEwKSB7XG4gICAgICAvLyDlnKjnm7Tmkq3ml7blj4rml7bmuIXnqbpidWZmZXLvvIzpmY3kvY7nm7Tmkq3lhoXlrZjljaDnlKhcbiAgICAgIGlmICh0aGlzLmJ1ZmZlckNsZWFyVGltZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm1zZS5yZW1vdmUodGltZSAtIDEsIGJ1ZmZlclN0YXJ0KVxuICAgICAgdGhpcy5idWZmZXJDbGVhclRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuYnVmZmVyQ2xlYXJUaW1lciA9IG51bGxcbiAgICAgIH0sIDUwMDApXG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZU5ldHdvcmtFcnJvciAodGFnLCBlcnIpIHtcbiAgICB0aGlzLl9wbGF5ZXIuZW1pdCgnZXJyb3InLCBuZXcgUGxheWVyLkVycm9ycygnbmV0d29yaycsIHRoaXMuX3BsYXllci5jb25maWcudXJsKSlcbiAgICB0aGlzLl9vbkVycm9yKExPQURFUl9FVkVOVFMuTE9BREVSX0VSUk9SLCB0YWcsIGVyciwgdHJ1ZSlcbiAgfVxuXG4gIF9oYW5kbGVEZW11eEVycm9yKHRhZywgZXJyLCBmYXRhbCkge1xuICAgIGlmIChmYXRhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBmYXRhbCA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLl9wbGF5ZXIuZW1pdCgnZXJyb3InLCBuZXcgUGxheWVyLkVycm9ycygncGFyc2UnLCB0aGlzLl9wbGF5ZXIuY29uZmlnLnVybCkpXG4gICAgdGhpcy5fb25FcnJvcihMT0FERVJfRVZFTlRTLkxPQURFUl9FUlJPUiwgdGFnLCBlcnIsIGZhdGFsKVxuICB9XG5cbiAgX29uRXJyb3IodHlwZSwgbW9kLCBlcnIsIGZhdGFsKSB7XG4gICAgbGV0IGVycm9yID0ge1xuICAgICAgZXJyb3JUeXBlOiB0eXBlLFxuICAgICAgZXJyb3JEZXRhaWxzOiBgWyR7bW9kfV06ICR7ZXJyLm1lc3NhZ2V9YCxcbiAgICAgIGVycm9yRmF0YWw6IGZhdGFsIHx8IGZhbHNlXG4gICAgfVxuICAgIHRoaXMuX3BsYXllci5lbWl0KEZMVl9FUlJPUiwgZXJyb3IpO1xuICB9XG5cbiAgc2VlayAoKSB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLmluaXRTZWdtZW50QXJyaXZlZCkge1xuICAgICAgdGhpcy5sb2FkRGF0YSgpXG4gICAgfVxuICB9XG5cbiAgbG9hZERhdGEgKCkge1xuICAgIHRoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxBREVSX1NUQVJULCB0aGlzLl9wbGF5ZXIuY29uZmlnLnVybClcbiAgfVxuXG4gIHBhdXNlICgpIHtcbiAgICBjb25zdCBsb2FkZXIgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdGRVRDSF9MT0FERVInKVxuXG4gICAgaWYgKGxvYWRlcikge1xuICAgICAgbG9hZGVyLmNhbmNlbCgpXG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5fcGxheWVyLm9mZigndGltZXVwZGF0ZScsIHRoaXMuX2hhbmRsZVRpbWVVcGRhdGUpXG4gICAgdGhpcy5fcGxheWVyID0gbnVsbFxuICAgIHRoaXMubXNlID0gbnVsbFxuICB9XG59XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gJ3hncGxheWVyJ1xuaW1wb3J0IHsgQ29udGV4dCwgRVZFTlRTIH0gZnJvbSAneGdwbGF5ZXItdXRpbHMnO1xuaW1wb3J0IEZMViBmcm9tICcuL2Zsdi1saXZlJ1xuY29uc3QgZmx2QWxsb3dlZEV2ZW50cyA9IEVWRU5UUy5GbHZBbGxvd2VkRXZlbnRzO1xuXG5jbGFzcyBGbHZQbGF5ZXIgZXh0ZW5kcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvciAoY29uZmlnKSB7XG4gICAgc3VwZXIoY29uZmlnKVxuICAgIHRoaXMuY29udGV4dCA9IG5ldyBDb250ZXh0KGZsdkFsbG93ZWRFdmVudHMpXG4gICAgdGhpcy5pbml0RXZlbnRzKClcbiAgICB0aGlzLmxvYWRlckNvbXBsZXRlVGltZXIgPSBudWxsXG4gICAgLy8gY29uc3QgcHJlbG9hZFRpbWUgPSBwbGF5ZXIuY29uZmlnLnByZWxvYWRUaW1lIHx8IDE1XG4gIH1cblxuICBzdGFydCAoKSB7XG4gICAgdGhpcy5pbml0Rmx2KClcbiAgICB0aGlzLmNvbnRleHQuaW5pdCgpXG4gICAgc3VwZXIuc3RhcnQodGhpcy5mbHYubXNlLnVybClcbiAgfVxuXG4gIGluaXRGbHZFdmVudHMgKGZsdikge1xuICAgIGNvbnN0IHBsYXllciA9IHRoaXM7XG4gICAgZmx2Lm9uY2UoRVZFTlRTLlJFTVVYX0VWRU5UUy5JTklUX1NFR01FTlQsICgpID0+IHtcbiAgICAgIFBsYXllci51dGlsLmFkZENsYXNzKHBsYXllci5yb290LCAneGdwbGF5ZXItaXMtbGl2ZScpXG4gICAgICBpZiAoIVBsYXllci51dGlsLmZpbmREb20odGhpcy5yb290LCAneGctbGl2ZScpKSB7XG4gICAgICAgIGNvbnN0IGxpdmUgPSBQbGF5ZXIudXRpbC5jcmVhdGVEb20oJ3hnLWxpdmUnLCAn5q2j5Zyo55u05pKtJywge30sICd4Z3BsYXllci1saXZlJylcbiAgICAgICAgcGxheWVyLmNvbnRyb2xzLmFwcGVuZENoaWxkKGxpdmUpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGZsdi5vbmNlKEVWRU5UUy5MT0FERVJfRVZFTlRTLkxPQURFUl9DT01QTEVURSwgKCkgPT4ge1xuICAgICAgLy8g55u05pKt5a6M5oiQ77yM5b6F5pKt5pS+5Zmo5pKt5a6M57yT5a2Y5ZCO5Y+R6YCB5YWz6Zet5LqL5Lu2XG4gICAgICBpZiAoIXBsYXllci5wYXVzZWQpIHtcbiAgICAgICAgdGhpcy5sb2FkZXJDb21wbGV0ZVRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGVuZCA9IHBsYXllci5nZXRCdWZmZXJlZFJhbmdlKClbMV1cbiAgICAgICAgICBpZiAoTWF0aC5hYnMocGxheWVyLmN1cnJlbnRUaW1lIC0gZW5kKSA8IDAuNSkge1xuICAgICAgICAgICAgcGxheWVyLmVtaXQoJ2VuZGVkJylcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMubG9hZGVyQ29tcGxldGVUaW1lcilcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDIwMClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgaW5pdEV2ZW50cyAoKSB7XG4gICAgdGhpcy5vbigndGltZXVwZGF0ZScsICgpID0+IHtcbiAgICAgIHRoaXMubG9hZERhdGEoKVxuICAgIH0pXG5cbiAgICB0aGlzLm9uKCdzZWVraW5nJywgKCkgPT4ge1xuICAgICAgY29uc3QgdGltZSA9IHRoaXMuY3VycmVudFRpbWVcbiAgICAgIGNvbnN0IHJhbmdlID0gdGhpcy5nZXRCdWZmZXJlZFJhbmdlKClcbiAgICAgIGlmICh0aW1lID4gcmFuZ2VbMV0gfHwgdGltZSA8IHJhbmdlWzBdKSB7XG4gICAgICAgIHRoaXMuZmx2LnNlZWsodGhpcy5jdXJyZW50VGltZSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgaW5pdEZsdiAoKSB7XG4gICAgY29uc3QgZmx2ID0gdGhpcy5jb250ZXh0LnJlZ2lzdHJ5KCdGTFZfQ09OVFJPTExFUicsIEZMVikodGhpcylcbiAgICB0aGlzLmluaXRGbHZFdmVudHMoZmx2KVxuICAgIHRoaXMuZmx2ID0gZmx2XG4gIH1cblxuICBwbGF5ICgpIHtcbiAgICBpZiAodGhpcy5faGFzU3RhcnQpIHtcbiAgICAgIHRoaXMuX2Rlc3Ryb3koKS50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gbmV3IENvbnRleHQoZmx2QWxsb3dlZEV2ZW50cylcbiAgICAgICAgY29uc3QgZmx2ID0gdGhpcy5jb250ZXh0LnJlZ2lzdHJ5KCdGTFZfQ09OVFJPTExFUicsIEZMVikodGhpcylcbiAgICAgICAgdGhpcy5pbml0Rmx2RXZlbnRzKGZsdilcbiAgICAgICAgdGhpcy5mbHYgPSBmbHZcbiAgICAgICAgdGhpcy5jb250ZXh0LmluaXQoKVxuICAgICAgICBzdXBlci5zdGFydChmbHYubXNlLnVybClcbiAgICAgICAgc3VwZXIucGxheSgpXG4gICAgICB9KVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLnBsYXkoKVxuICAgIH1cbiAgfVxuXG4gIHBhdXNlICgpIHtcbiAgICBzdXBlci5wYXVzZSgpXG4gICAgaWYgKHRoaXMuZmx2KSB7XG4gICAgICB0aGlzLmZsdi5wYXVzZSgpXG4gICAgfVxuICB9XG5cbiAgbG9hZERhdGEgKHRpbWUgPSB0aGlzLmN1cnJlbnRUaW1lKSB7XG4gICAgaWYgKHRoaXMuZmx2KSB7XG4gICAgICB0aGlzLmZsdi5zZWVrKHRpbWUpXG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5fZGVzdHJveSgpLnRoZW4oKCkgPT4ge1xuICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIH0pXG4gIH1cblxuICBfZGVzdHJveSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmx2Lm1zZS5kZXN0cm95KCkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLmNvbnRleHQuZGVzdHJveSgpXG4gICAgICB0aGlzLmZsdiA9IG51bGxcbiAgICAgIHRoaXMuY29udGV4dCA9IG51bGxcbiAgICAgIGlmICh0aGlzLmxvYWRlckNvbXBsZXRlVGltZXIpIHtcbiAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5sb2FkZXJDb21wbGV0ZVRpbWVyKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBnZXQgc3JjICgpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50U3JjXG4gIH1cblxuICBzZXQgc3JjICh1cmwpIHtcbiAgICB0aGlzLnBsYXllci5jb25maWcudXJsID0gdXJsXG4gICAgaWYgKCF0aGlzLnBhdXNlZCkge1xuICAgICAgdGhpcy5wYXVzZSgpXG4gICAgICB0aGlzLm9uY2UoJ3BhdXNlJywgKCkgPT4ge1xuICAgICAgICB0aGlzLnN0YXJ0KHVybClcbiAgICAgIH0pXG4gICAgICB0aGlzLm9uY2UoJ2NhbnBsYXknLCAoKSA9PiB7XG4gICAgICAgIHRoaXMucGxheSgpXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXJ0KHVybClcbiAgICB9XG4gICAgdGhpcy5vbmNlKCdjYW5wbGF5JywgKCkgPT4ge1xuICAgICAgdGhpcy5jdXJyZW50VGltZSA9IDBcbiAgICB9KVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRmx2UGxheWVyXG4iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gd2luZG93W1wiUGxheWVyXCJdOyB9KCkpOyJdLCJzb3VyY2VSb290IjoiIn0=