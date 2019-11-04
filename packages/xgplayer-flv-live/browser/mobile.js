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
    this.preloadTime = this.config.preloadTime || 0.5;
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
    let sampleCount = 0;

    while (sample && sampleCount < 40) {
      let sampleData = AudioCtx.getAACData(this.meta, sample);
      samples.push(sampleData);
      this._lastpts = sample.pts;
      sample = data.shift();
      sampleCount++;
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
      }, function (error) {
        _this._decoding = false;
        console.error(error);
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
    console.log('aaplay', this._currentBuffer);
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
    adts[2] = 0xc0 & meta.originObjectType - 1 << 6;

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
    const vCurTime = (this.video.currentTime || 0) * 1000;
    const aCurTime = (this.aCtx.currentTime || 0) * 1000;

    const gap = vCurTime - aCurTime;
    if (this.timeoutId) {
      return;
    }
    if (gap > 200) {
      // audio delayed for more than 100ms
      console.log(gap);
      this.video.start += gap;
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
      aCtx: this.aCtx,
      video: this
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
      if (!this.start) {
        this.start = Date.now();
      }
      this._currentTime = Date.now() - this.start;
      this.vCtx._onTimer(this._currentTime);
    });

    this.aCtx.on('AUDIO_SOURCE_END', this.handleAudioSourceEnd);
  }

  handleAudioSourceEnd() {
    console.log(this.aCtx.currentTime);
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

  get currentTime() {
    return this._currentTime / 1000;
  }

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
          this.yuvCanvas.render(frame.buffer, frame.width, frame.height, frame.yLinesize, frame.uvLinesize);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9GbHZQbGF5ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy9Vc2Vycy9qaWFuZ3l1cWluZy9EZXNrdG9wL1Byb2plY3RzL2RldnNwYWNlL3hncGxheWVyL25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWJ1ZmZlci9zcmMvYnVmZmVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1idWZmZXIvc3JjL3ByZXNvdWNlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1idWZmZXIvc3JjL3RyYWNrLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1jb2RlYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItY29kZWMvc3JjL2FhYy9hYWMtaGVscGVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1jb2RlYy9zcmMvY29tcGF0aWJpbGl0eS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItY29kZWMvc3JjL2gyNjQvbmFsdW5pdC9nb2xvbWIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWNvZGVjL3NyYy9oMjY0L25hbHVuaXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWNvZGVjL3NyYy9oMjY0L25hbHVuaXQvc3BzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1kZW11eC9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItZGVtdXgvc3JjL2Zsdi9hbWYtcGFyc2VyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1kZW11eC9zcmMvZmx2L2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1kZW11eC9zcmMvaGxzL2RlbXV4ZXIvbTN1OHBhcnNlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItZGVtdXgvc3JjL2hscy9kZW11eGVyL3RzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1kZW11eC9zcmMvaGxzL3BsYXlsaXN0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1sb2FkZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWxvYWRlci9zcmMvZmV0Y2gtbG9hZGVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1yZW11eC9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItcmVtdXgvc3JjL21wNC9mbXA0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1yZW11eC9zcmMvbXA0L2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvbm9kZV9tb2R1bGVzL2NvbmNhdC10eXBlZC1hcnJheS9saWIvY29uY2F0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9ub2RlX21vZHVsZXMvY29uY2F0LXR5cGVkLWFycmF5L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvbm9kZV9tb2R1bGVzL3dlYndvcmtpZnktd2VicGFjay9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL2NvbnN0YW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9jb25zdGFudHMvd29ya2VyLWNvbW1hbmRzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvY29udGV4dC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL2NyeXB0by9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL2Vudi9pc2xlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvZW52L3NuaWZmZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9lbnYvdXRmOC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vYmlsZS9hdWRpby1jb250ZXh0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9iaWxlL21vYmlsZS12aWRlby5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vYmlsZS9zb3VyY2VidWZmZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2JpbGUvdGlja2VyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9iaWxlL3ZpZGVvLWNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2JpbGUvd29ya2VyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9iaWxlL3l1di1jYW52YXMuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2RlbHMvbWVkaWEtaW5mby5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vZGVscy9tZWRpYS1zYW1wbGUuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2RlbHMvbWVkaWEtc2VnbWVudC1saXN0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9kZWxzL21lZGlhLXNlZ21lbnQuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2RlbHMvdHJhY2stbWV0YS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vZGVscy90cmFjay1zYW1wbGUuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy93cml0ZS9idWZmZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy93cml0ZS9zdHJlYW0uanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL2Zsdi1saXZlLW1vYmlsZS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9zcmMvbW9iaWxlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci9leHRlcm5hbCBcIlBsYXllclwiIl0sIm5hbWVzIjpbIlIiLCJSZWZsZWN0IiwiUmVmbGVjdEFwcGx5IiwiYXBwbHkiLCJ0YXJnZXQiLCJyZWNlaXZlciIsImFyZ3MiLCJGdW5jdGlvbiIsInByb3RvdHlwZSIsImNhbGwiLCJSZWZsZWN0T3duS2V5cyIsIm93bktleXMiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiY29uY2F0IiwiUHJvY2Vzc0VtaXRXYXJuaW5nIiwid2FybmluZyIsImNvbnNvbGUiLCJ3YXJuIiwiTnVtYmVySXNOYU4iLCJOdW1iZXIiLCJpc05hTiIsInZhbHVlIiwiRXZlbnRFbWl0dGVyIiwiaW5pdCIsIm1vZHVsZSIsImV4cG9ydHMiLCJfZXZlbnRzIiwidW5kZWZpbmVkIiwiX2V2ZW50c0NvdW50IiwiX21heExpc3RlbmVycyIsImRlZmF1bHRNYXhMaXN0ZW5lcnMiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJnZXQiLCJzZXQiLCJhcmciLCJSYW5nZUVycm9yIiwiZ2V0UHJvdG90eXBlT2YiLCJjcmVhdGUiLCJzZXRNYXhMaXN0ZW5lcnMiLCJuIiwiJGdldE1heExpc3RlbmVycyIsInRoYXQiLCJnZXRNYXhMaXN0ZW5lcnMiLCJlbWl0IiwidHlwZSIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJwdXNoIiwiZG9FcnJvciIsImV2ZW50cyIsImVycm9yIiwiZXIiLCJFcnJvciIsImVyciIsIm1lc3NhZ2UiLCJjb250ZXh0IiwiaGFuZGxlciIsImxlbiIsImxpc3RlbmVycyIsImFycmF5Q2xvbmUiLCJfYWRkTGlzdGVuZXIiLCJsaXN0ZW5lciIsInByZXBlbmQiLCJtIiwiZXhpc3RpbmciLCJUeXBlRXJyb3IiLCJuZXdMaXN0ZW5lciIsInVuc2hpZnQiLCJ3YXJuZWQiLCJ3IiwiU3RyaW5nIiwibmFtZSIsImVtaXR0ZXIiLCJjb3VudCIsImFkZExpc3RlbmVyIiwib24iLCJwcmVwZW5kTGlzdGVuZXIiLCJvbmNlV3JhcHBlciIsImZpcmVkIiwicmVtb3ZlTGlzdGVuZXIiLCJ3cmFwRm4iLCJfb25jZVdyYXAiLCJzdGF0ZSIsIndyYXBwZWQiLCJiaW5kIiwib25jZSIsInByZXBlbmRPbmNlTGlzdGVuZXIiLCJsaXN0IiwicG9zaXRpb24iLCJvcmlnaW5hbExpc3RlbmVyIiwic2hpZnQiLCJzcGxpY2VPbmUiLCJvZmYiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJrZXlzIiwia2V5IiwiX2xpc3RlbmVycyIsInVud3JhcCIsImV2bGlzdGVuZXIiLCJ1bndyYXBMaXN0ZW5lcnMiLCJyYXdMaXN0ZW5lcnMiLCJsaXN0ZW5lckNvdW50IiwiZXZlbnROYW1lcyIsImFyciIsImNvcHkiLCJBcnJheSIsImluZGV4IiwicG9wIiwicmV0IiwiVHJhY2siLCJyZXF1aXJlIiwiZGVmYXVsdCIsIlRyYWNrcyIsIkF1ZGlvVHJhY2siLCJWaWRlb1RyYWNrIiwiWGdCdWZmZXIiLCJSZW11eEJ1ZmZlciIsIlByZVNvdXJjZSIsImNvbnN0cnVjdG9yIiwiaGlzdG9yeUxlbiIsImFycmF5Iiwib2Zmc2V0IiwiZGF0YSIsImJ5dGVMZW5ndGgiLCJVaW50OEFycmF5IiwiX3NoaWZ0QnVmZmVyIiwic2xpY2UiLCJ0bXBvZmYiLCJ0bXAiLCJ0ZW1wbGVuZ3RoIiwiY2xlYXIiLCJkZXN0cm95IiwidG9JbnQiLCJzdGFydCIsInJldEludCIsInZpZGVvIiwiYXVkaW8iLCJTb3VyY2UiLCJtaW1ldHlwZSIsInNvdXJjZXMiLCJnZXRTb3VyY2UiLCJzb3VyY2UiLCJjcmVhdGVTb3VyY2UiLCJpZCIsInNlcXVlbmNlTnVtYmVyIiwic2FtcGxlcyIsImRyb3BwZWRTYW1wbGVzIiwicmVzZXQiLCJkaXN0cm95IiwiVEFHIiwiZHJvcHBlZCIsImF1ZGlvVHJhY2siLCJ2aWRlb1RyYWNrIiwiTmFsdW5pdCIsIlNwc1BhcnNlciIsIkNvbXBhdGliaWxpdHkiLCJBQUMiLCJnZXRTaWxlbnRGcmFtZSIsImNvZGVjIiwiY2hhbm5lbENvdW50IiwiUkVNVVhfRVZFTlRTIiwiREVNVVhfRVZFTlRTIiwiRVZFTlRTIiwibmV4dEF1ZGlvRHRzIiwibmV4dFZpZGVvRHRzIiwibGFzdEF1ZGlvU2FtcGxlc0xlbiIsImxhc3RWaWRlb1NhbXBsZXNMZW4iLCJsYXN0VmlkZW9EdHMiLCJsYXN0QXVkaW9EdHMiLCJhbGxBdWRpb1NhbXBsZXNDb3VudCIsImFsbFZpZGVvU2FtcGxlc0NvdW50IiwiX2ZpcnN0QXVkaW9TYW1wbGUiLCJfZmlyc3RWaWRlb1NhbXBsZSIsImZpbGxlZEF1ZGlvU2FtcGxlcyIsImZpbGxlZFZpZGVvU2FtcGxlcyIsIl92aWRlb0xhcmdlR2FwIiwiX2F1ZGlvTGFyZ2VHYXAiLCJiZWZvcmUiLCJSRU1VWF9NRURJQSIsImRvRml4IiwiaXNGaXJzdEF1ZGlvU2FtcGxlcyIsImlzRmlyc3RWaWRlb1NhbXBsZXMiLCJnZXRGaXJzdFNhbXBsZSIsInJlY29yZFNhbXBsZXNDb3VudCIsImZpeFJlZlNhbXBsZUR1cmF0aW9uIiwibWV0YSIsImNoYW5nZWQiLCJ2aWRlb0NoYW5nZWQiLCJjaGFuZ2VkSWR4IiwidmlkZW9DaGFuZ2VkSWR4IiwiZGV0YWN0Q2hhbmdlU3RyZWFtIiwiZml4Q2hhbmdlU3RyZWFtVmlkZW8iLCJkb0ZpeFZpZGVvIiwiYXVkaW9DaGFuZ2VkIiwiYXVkaW9DaGFuZ2VkSWR4IiwiZml4Q2hhbmdlU3RyZWFtQXVkaW8iLCJkb0ZpeEF1ZGlvIiwiZmlyc3QiLCJzdHJlYW1DaGFuZ2VTdGFydCIsInZpZGVvU2FtcGxlcyIsImZyYW1lUmF0ZSIsImZpeGVkIiwiZmlyc3RTYW1wbGUiLCJzYW1wbGVzTGVuIiwiZG9GaXhMYXJnZUdhcCIsImR0cyIsImRldGVjdExhcmdlR2FwIiwiZmlyc3REdHMiLCJ2aWRlb0ZpcnN0RHRzIiwiYXVkaW9GaXJzdER0cyIsImdhcCIsInJlZlNhbXBsZUR1cmF0aW9uIiwiZmlsbENvdW50IiwiTWF0aCIsImZsb29yIiwiY2xvbmVkRmlyc3RTYW1wbGUiLCJhc3NpZ24iLCJwdHMiLCJjdHMiLCJzaXplIiwiYWJzR2FwIiwiYWJzIiwiZmlsbEZyYW1lQ291bnQiLCJjbG9uZWRTYW1wbGUiLCJjb21wdXRlZCIsIm9yaWdpbkR0cyIsImxhc3REdHMiLCJsYXN0U2FtcGxlRHVyYXRpb24iLCJjdXJyZW50IiwibmV4dCIsImR1cmF0aW9uIiwiZmlsbEZyYW1lSWR4IiwiZmlsbEZyYW1lIiwic3BsaWNlIiwiYXVkaW9TYW1wbGVzIiwic2lsZW50RnJhbWUiLCJfZmlyc3RTYW1wbGUiLCJ2aWRlb0ZpcnN0UHRzIiwic2lsZW50U2FtcGxlQ291bnQiLCJzaWxlbnRTYW1wbGUiLCJkYXRhc2l6ZSIsImZpbHRlcmVkIiwicmVmU2FtcGxlRHVyYXRpb25GaXhlZCIsInNpbGVudEZyYW1lQ291bnQiLCJzb3J0QXVkaW9TYW1wbGVzIiwiY2hhbmdlSWR4IiwicHJldkR0cyIsImdldFN0cmVhbUNoYW5nZVN0YXJ0IiwiY3VyRHRzIiwiaXNDb250aW51ZSIsIm9wdGlvbnMiLCJmaXJzdFBhcnRTYW1wbGVzIiwic2Vjb25kUGFydFNhbXBsZXMiLCJjaGFuZ2VTYW1wbGUiLCJmaXJzdFBhcnREdXJhdGlvbiIsImZpbmRGaXJzdFZpZGVvU2FtcGxlIiwiZmluZEZpcnN0QXVkaW9TYW1wbGUiLCJpc1ZpZGVvIiwiYWxsU2FtcGxlc0NvdW50IiwiZmlsbGVkU2FtcGxlc0NvdW50IiwiZHVyYXRpb25BdmciLCJyZW1vdmVJbnZhbGlkU2FtcGxlcyIsImZpbHRlciIsInNhbXBsZSIsImR0c0Jhc2UiLCJJbmZpbml0eSIsInNvcnQiLCJhIiwiYiIsInNvcnRlZCIsImlzS2V5ZnJhbWUiLCJuZXh0RHRzIiwiY29uZDEiLCJjb25kMiIsImRpc2NvbnRpbnVlIiwidHJhY2tzIiwiX2NvbnRleHQiLCJnZXRJbnN0YW5jZSIsInJlbXV4ZXIiLCJfZHRzQmFzZSIsIkdvbG9tYiIsInVpbnQ4YXJyYXkiLCJfYnVmZmVyIiwiX2J1ZmZlckluZGV4IiwiX3RvdGFsQnl0ZXMiLCJfdG90YWxCaXRzIiwiX2N1cnJlbnRXb3JkIiwiX2N1cnJlbnRXb3JkQml0c0xlZnQiLCJfZmlsbEN1cnJlbnRXb3JkIiwiYnVmZmVyQnl0ZXNMZWZ0IiwiYnl0ZXNSZWFkIiwibWluIiwid29yZCIsInN1YmFycmF5IiwiRGF0YVZpZXciLCJidWZmZXIiLCJnZXRVaW50MzIiLCJyZWFkQml0cyIsImJpdHMiLCJ2YWx1IiwicmVhZEJvb2wiLCJyZWFkQnl0ZSIsIl9za2lwTGVhZGluZ1plcm8iLCJ6ZXJvQ291bnQiLCJyZWFkVUVHIiwibGVhZGluZ1plcm9zIiwicmVhZFNFRyIsImdldE5hbHVuaXRzIiwiYnVmIiwiZGF0YXZpZXciLCJnZXRJbnQzMiIsImdldEludDE2IiwiZ2V0SW50OCIsImdldEFubmV4Yk5hbHMiLCJnZXRBdmNjTmFscyIsIm5hbHMiLCJnZXRIZWFkZXJQb3NpdGlvbkFubmV4QiIsInBvcyIsImVuZCIsImhlYWRlciIsImhlYWRlckxlbmd0aCIsInNraXAiLCJib2R5IiwidW5pdCIsImFuYWx5c2VOYWwiLCJuZHIiLCJpZHIiLCJzcHMiLCJwYXJzZVNQUyIsInBwcyIsImdldEF2Y2MiLCJTUFNQYXJzZXIiLCJfZWJzcDJyYnNwIiwic3JjIiwic3JjTGVuZ3RoIiwiZHN0IiwiZHN0SWR4IiwicmJzcCIsImdiIiwicHJvZmlsZUlkYyIsImxldmVsSWRjIiwicHJvZmlsZV9zdHJpbmciLCJnZXRQcm9maWxlU3RyaW5nIiwibGV2ZWxfc3RyaW5nIiwiZ2V0TGV2ZWxTdHJpbmciLCJjaHJvbWFfZm9ybWF0X2lkYyIsImNocm9tYV9mb3JtYXQiLCJjaHJvbWFfZm9ybWF0X3RhYmxlIiwiYml0X2RlcHRoIiwic2NhbGluZ19saXN0X2NvdW50IiwiX3NraXBTY2FsaW5nTGlzdCIsInBpY19vcmRlcl9jbnRfdHlwZSIsIm51bV9yZWZfZnJhbWVzX2luX3BpY19vcmRlcl9jbnRfY3ljbGUiLCJwaWNfd2lkdGhfaW5fbWJzX21pbnVzMSIsInBpY19oZWlnaHRfaW5fbWFwX3VuaXRzX21pbnVzMSIsImZyYW1lX21ic19vbmx5X2ZsYWciLCJmcmFtZV9jcm9wX2xlZnRfb2Zmc2V0IiwiZnJhbWVfY3JvcF9yaWdodF9vZmZzZXQiLCJmcmFtZV9jcm9wX3RvcF9vZmZzZXQiLCJmcmFtZV9jcm9wX2JvdHRvbV9vZmZzZXQiLCJmcmFtZV9jcm9wcGluZ19mbGFnIiwicGFyX3dpZHRoIiwicGFyX2hlaWdodCIsImZwcyIsImZwc19maXhlZCIsImZwc19udW0iLCJmcHNfZGVuIiwidnVpX3BhcmFtZXRlcnNfcHJlc2VudF9mbGFnIiwiYXNwZWN0X3JhdGlvX2lkYyIsInBhcl93X3RhYmxlIiwicGFyX2hfdGFibGUiLCJudW1fdW5pdHNfaW5fdGljayIsInRpbWVfc2NhbGUiLCJwYXJTY2FsZSIsImNyb3BfdW5pdF94IiwiY3JvcF91bml0X3kiLCJzdWJfd2MiLCJzdWJfaGMiLCJjb2RlY193aWR0aCIsImNvZGVjX2hlaWdodCIsInByZXNlbnRfd2lkdGgiLCJjZWlsIiwiY2hyb21hX2Zvcm1hdF9zdHJpbmciLCJnZXRDaHJvbWFGb3JtYXRTdHJpbmciLCJmcmFtZV9yYXRlIiwicGFyX3JhdGlvIiwid2lkdGgiLCJoZWlnaHQiLCJjb2RlY19zaXplIiwicHJlc2VudF9zaXplIiwibGFzdF9zY2FsZSIsIm5leHRfc2NhbGUiLCJkZWx0YV9zY2FsZSIsInRvRml4ZWQiLCJjaHJvbWEiLCJ0b1ZpZGVvTWV0YSIsInNwc0NvbmZpZyIsImNvZGVjV2lkdGgiLCJjb2RlY0hlaWdodCIsInByZXNlbnRXaWR0aCIsInByZXNlbnRIZWlnaHQiLCJwcm9maWxlIiwibGV2ZWwiLCJiaXREZXB0aCIsImNocm9tYUZvcm1hdCIsInBhclJhdGlvIiwiZnBzRGVuIiwiZnBzTnVtIiwidGltZXNjYWxlIiwiTTNVOFBhcnNlciIsIlRzRGVtdXhlciIsIlBsYXlsaXN0IiwiRmx2RGVtdXhlciIsIkRBVEFfVFlQRVMiLCJOVU1CRVIiLCJCT09MRUFOIiwiU1RSSU5HIiwiT0JKRUNUIiwiTUlYX0FSUkFZIiwiT0JKRUNUX0VORCIsIlNUUklDVF9BUlJBWSIsIkRBVEUiLCJMT05FX1NUUklORyIsIkFNRlBhcnNlciIsInJlYWRPZmZzZXQiLCJyZXNvbHZlIiwibWV0YURhdGEiLCJwYXJzZVZhbHVlIiwiYm9keVNpemUiLCJyZXNldFN0YXR1cyIsInBhcnNlU3RyaW5nIiwiZHYiLCJzdHJMZW4iLCJnZXRVaW50MTYiLCJpc0xlIiwic3RyIiwiVVRGOCIsImRlY29kZSIsInBhcnNlRGF0ZSIsInRzIiwiZ2V0RmxvYXQ2NCIsInRpbWVPZmZzZXQiLCJEYXRlIiwicGFyc2VPYmplY3QiLCJpc09iakVuZCIsInBhcnNlTG9uZ1N0cmluZyIsIkFycmF5QnVmZmVyIiwiZGF0YVZpZXciLCJnZXRVaW50OCIsImJvb2xOdW0iLCJvYmpFbmRTaXplIiwiYW1mT2JqIiwiaXNPYmplY3RFbmQiLCJtYXJrIiwiYW1mVmFyIiwibWFya2VyIiwiYXJyTGVuZ3RoIiwic2NyaXB0IiwiZGF0ZSIsImxvbmdTdHIiLCJfZmlyc3RGcmFnbWVudExvYWRlZCIsIl90cmFja051bSIsIl9oYXNTY3JpcHQiLCJERU1VWF9TVEFSVCIsImRvUGFyc2VGbHYiLCJpc0ZsdkZpbGUiLCJnZXRQbGF5VHlwZSIsInN0cmVhbUZsYWciLCJyZXN1bHQiLCJoYXNWaWRlbyIsImhhc0F1ZGlvIiwibG9hZGVyQnVmZmVyIiwicGFyc2VGbHZIZWFkZXIiLCJjaHVuayIsImxvb3BNYXgiLCJfcGFyc2VGbHZUYWciLCJERU1VWF9DT01QTEVURSIsIkRFTVVYX0VSUk9SIiwicGxheVR5cGUiLCJpbml0VmlkZW9UcmFjayIsImluaXRBdWRpb1RyYWNrIiwiVmlkZW9UcmFja01ldGEiLCJBdWRpb1RyYWNrTWV0YSIsIl9wYXJzZUZsdlRhZ0hlYWRlciIsIl9wcm9jZXNzQ2h1bmsiLCJ0YWdUeXBlIiwidGltZXN0YW1wIiwidGltZXN0YW1wRXh0IiwiX3BhcnNlU2NyaXB0RGF0YSIsIl9wYXJzZUFBQ0RhdGEiLCJfcGFyc2VIZXZjRGF0YSIsImluZm8iLCJvbk1ldGFEYXRhIiwibWVkaWFJbmZvIiwiaHNhQXVkaW8iLCJ2YWxpZGF0ZSIsIl9kYXRhc2l6ZVZhbGlkYXRvciIsIk1FRElBX0lORk8iLCJoYXNTcGVjaWZpY0NvbmZpZyIsImF1ZGlvc2FtcGxlcmF0ZSIsInNhbXBsZVJhdGUiLCJhdWRpb2NoYW5uZWxzIiwic2FtcGxlUmF0ZUluZGV4IiwiZnJhbWVyYXRlIiwiX2FhY1NlcXVlbmNlSGVhZGVyUGFyc2VyIiwib2JqZWN0VHlwZSIsIm9yaWdpbk9iamVjdFR5cGUiLCJfc3dpdGNoQXVkaW9TYW1wbGVSYXRlIiwiZnJhbWVMZW5ndGgiLCJkZXBlbmRzT25Db3JlQ29kZXIiLCJleHRlbnNpb25GbGFnSW5kZXgiLCJ1c2VyQWdlbnQiLCJ3aW5kb3ciLCJuYXZpZ2F0b3IiLCJ0b0xvd2VyQ2FzZSIsImV4dGVuc2lvblNhbXBsaW5nSW5kZXgiLCJjb25maWciLCJzYW1wbGluZ0luZGV4IiwiaW5kZXhPZiIsInRyYWNrIiwiZm9ybWF0IiwiX2hhc0F1ZGlvU2VxdWVuY2UiLCJfc3dpdGNoQXVkaW9TYW1wbGluZ0ZyZXF1ZW5jeSIsImZyYW1lTGVudGgiLCJhdWRpb1NhbXBsZVJhdGUiLCJhdWRpb1NhbXBsZVJhdGVJbmRleCIsImFhY0hlYWRlciIsImF1ZGlvTWVkaWEiLCJNRVRBREFUQV9QQVJTRUQiLCJBVURJT19NRVRBREFUQV9DSEFOR0UiLCJfbWV0YUNoYW5nZSIsImZyYW1lVHlwZSIsImNvZGVjSUQiLCJhdmNQYWNrZXRUeXBlIiwicGFyc2VJbnQiLCJuYWx1IiwiciIsInNpemVzIiwiYXZjY2xlbmd0aCIsIl9hdmNTZXF1ZW5jZUhlYWRlclBhcnNlciIsIl9oYXNWaWRlb1NlcXVlbmNlIiwiVklERU9fTUVUQURBVEFfQ0hBTkdFIiwiY29uZmlndXJhdGlvblZlcnNpb24iLCJhdmNQcm9maWxlSW5kaWNhdGlvbiIsInByb2ZpbGVDb21wYXRpYmlsaXR5IiwiYXZjTGV2ZWxJbmRpY2F0aW9uIiwibmFsVW5pdExlbmd0aCIsIm51bU9mU3BzIiwiaiIsImNvZGVjU3RyaW5nIiwiaCIsInRvU3RyaW5nIiwibnVtT2ZQcHMiLCJ2aWRlb01lZGlhIiwiYXZjYyIsInNhbXBsaW5nRnJlcXVlbmN5SW5kZXgiLCJzYW1wbGluZ0ZyZXF1ZW5jeUxpc3QiLCJfc3dpdGNoQXVkaW9DaGFubmVsIiwic2FtcGxlVHJhY2tOdW1JbmRleCIsInNhbXBsZVRyYWNrTnVtTGlzdCIsImRhdGFzaXplQ29uZmlybSIsImxvZ2dlciIsInBhcnNlIiwidGV4dCIsImJhc2V1cmwiLCJzcGxpdCIsInJlZnMiLCJyZWYiLCJtYXRjaCIsInJlZm0iLCJyZWZkIiwidmVyc2lvbiIsInNlcXVlbmNlIiwidGFyZ2V0ZHVyYXRpb24iLCJwYXJzZUZsb2F0IiwicGFyc2VGcmFnIiwicGFyc2VEZWNyeXB0IiwiZnJhZ3MiLCJmcmVnIiwibmV4dGxpbmUiLCJjaGFyQXQiLCJ1cmwiLCJwYXJzZVVSTCIsInVybHMiLCJlbmNyeXB0IiwiY21kIiwibWV0aG9kIiwidXJpIiwiaXYiLCJpdmIiLCJpbSIsInN1YnN0ciIsIlN0cmVhbVR5cGUiLCJjb25maWdzIiwiZGVtdXhpbmciLCJwYXQiLCJwbXQiLCJfaGFzVmlkZW9NZXRhIiwiX2hhc0F1ZGlvTWV0YSIsImRlbXV4IiwiZnJhZyIsImlucHV0QnVmZmVyIiwicGVzZXMiLCJ0c1N0cmVhbSIsIlN0cmVhbSIsInJlYWQiLCJwZXMiLCJwaWQiLCJFUyIsInBheWxvYWQiLCJzdHJlYW0iLCJBdWRpb09wdGlvbnMiLCJWaWRlb09wdGlvbnMiLCJlcGVzZXMiLCJNZXJnZSIsInB1c2hBdWRpb1NhbXBsZSIsInB1c2hWaWRlb1NhbXBsZSIsIl90cmFja3MiLCJmcmVxdWVuY2UiLCJjaGFubmVsIiwiYXVkaW9PYmplY3RUeXBlIiwiYXVkaW9Db25maWciLCJmcmVxdWVuY3lJbmRleCIsIm1ldGFFcXVhbCIsImNvbXBhaXJlTWV0YSIsIkF1ZGlvVHJhY2tTYW1wbGUiLCJzYW1wbGVMZW5ndGgiLCJuYWwiLCJzYXJSYXRpbyIsInNhcl9yYXRpbyIsIlZpZGVvVHJhY2tTYW1wbGUiLCJkZXN0b3J5IiwiY29tcGFpcmVBcnJheSIsImFsIiwiYmwiLCJpZ25vcmVEdXJhdGlvbiIsImsiLCJpdGVtYSIsIml0ZW1iIiwiYnVmZmVycyIsInJlYWRIZWFkZXIiLCJyZWFkUGF5bG9hZCIsInBhY2tldCIsInVua25vd25QSURzIiwiUEVTIiwiUEFUIiwiQ0FUIiwiVFNEVCIsInNvbWUiLCJpdGVtIiwiUE1UIiwic3RzIiwiTWVkaWEiLCJzdHJlYW1UeXBlIiwic3luYyIsInJlYWRVaW50OCIsInJlYWRVaW50MTYiLCJwcmlvcml0eSIsInNjcmFtYmxpbmciLCJhZGFwdGF0aW9uIiwiY29udGludWl0eSIsInRhYmVsSUQiLCJ6ZXJvIiwic2VjdGlvbkxlbmd0aCIsInN0cmVhbUlEIiwic2VjdGlvbk51bWJlciIsImxhc3RTZWN0aW9uTnVtYmVyIiwiTiIsInByb2dyYW1OdW1iZXIiLCJwcm9ncmFtIiwidGFibGVJRCIsIm9yZGVyIiwibGFzdE9yZGVyIiwiUENSX1BJRCIsInByb2dyYW1MZW5ndGgiLCJlcyIsIm1hcCIsImFkYXB0YXRpb25MZW5ndGgiLCJhY2Nlc3MiLCJQQ1IiLCJPUENSIiwic3BsaWNlUG9pbnQiLCJ0cmFuc3BvcnRQcml2YXRlIiwiYWRhcHRhdGlvbkZpZWxkIiwiX3N0YXJ0IiwicHJvZ3JhbUNsb2NrQmFzZSIsInJlYWRVaW50MzIiLCJwcm9ncmFtQ2xvY2tFeHRlbnNpb24iLCJvcmlnaW5Qcm9ncmFtQ2xvY2tCYXNlIiwib3JpZ2luUHJvZ3JhbUNsb2NrRXh0ZW5zaW9uIiwic3BsaWNlQ291bnRkb3duIiwidHJhbnNwb3J0UHJpdmF0ZURhdGEiLCJsdHciLCJwaWVjZXdpc2UiLCJzZWFtbGVzcyIsImx0d1ZhbGlkIiwibHR3T2Zmc2V0IiwicmVhZFVpbnQyNCIsInBpZWNld2lzZVJhdGUiLCJyZWFkSW50OCIsInNwbGljZVR5cGUiLCJkdHNOZXh0QVUxIiwibWFya2VyMSIsImR0c05leHRBVTIiLCJtYXJrZXIyIiwiZHRzTmV4dEFVMyIsImxhc3RTdHVmZmluZyIsInBhY2tldExlbmd0aCIsInB0c0RUU0ZsYWciLCJlc2NyRmxhZyIsImVzUmF0ZUZsYWciLCJkc21GbGFnIiwiYWRkaXRpb25hbEZsYWciLCJjcmNGbGFnIiwiZXh0ZW5zaW9uRmxhZyIsInBlc0hlYWRlckxlbmd0aCIsIk4xIiwiZXNjciIsImV4IiwiZXNSYXRlIiwiYWRkaXRpb25hbENvcHlJbmZvIiwicGVzQ1JDIiwiYmFjayIsImZxIiwibGF5ZXIiLCJhYnNlbnQiLCJnZXRBdWRpb0NvbmZpZyIsInNlY3Rpb25JbmRpY2F0b3IiLCJjdXJyZW50TmV4dEluZGljYXRvciIsImNyYzMyIiwiZXh0ZW5zaW9uU2FtcGxlSW5kZXgiLCJ0ZXN0IiwiaW5wdXRidWZmZXIiLCJfYmFzZVVSTCIsIl9saXN0IiwiX3RzIiwiZnJhZ0xlbmd0aCIsIl9sYXN0Z2V0IiwiX2F1ZG9jbGVhciIsImF1dG9jbGVhciIsImJhc2VVUkwiLCJkb3dubG9hZGVkIiwiZG93bmxvYWRpbmciLCJkZWxldGVGcmFnIiwidGltZSIsInB1c2hNM1U4IiwiZGVsZXRlcHJlIiwibmV3ZnJhZ2xpc3QiLCJ0c2xpc3QiLCJnZXRUc0xpc3QiLCJ0c25hbWUiLCJpc2xvYWRlZCIsImxvYWRpbmciLCJnZXRUc0J5TmFtZSIsImdldFRzIiwidGltZWxpc3QiLCJjbGVhckRvd25sb2FkZWQiLCJsIiwiRmV0Y2hMb2FkZXIiLCJMT0FERVJfRVZFTlRTIiwiUkVBRF9TVFJFQU0iLCJSRUFEX1RFWFQiLCJSRUFEX0pTT04iLCJSRUFEX0JVRkZFUiIsInN0YXR1cyIsIl9yZWFkZXIiLCJfY2FuY2VsZWQiLCJfZGVzdHJveWVkIiwicmVhZHR5cGUiLCJfbG9hZGVyVGFza05vIiwiTEFERVJfU1RBUlQiLCJsb2FkIiwib3B0cyIsIl90aGlzIiwicGFyYW1zIiwiZ2V0UGFyYW1zIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJvayIsIl9vbkZldGNoUmVzcG9uc2UiLCJMT0FERVJfRVJST1IiLCJjYXRjaCIsInRhc2tubyIsImpzb24iLCJMT0FERVJfQ09NUExFVEUiLCJhcnJheUJ1ZmZlciIsIl9vblJlYWRlciIsImdldFJlYWRlciIsInJlYWRlciIsImNhbmNlbCIsImUiLCJ2YWwiLCJkb25lIiwiTE9BREVSX0RBVEFMT0FERUQiLCJoZWFkZXJzIiwiSGVhZGVycyIsIm1vZGUiLCJjYWNoZSIsImNvbmZpZ0hlYWRlcnMiLCJoYXNPd25Qcm9wZXJ0eSIsImFwcGVuZCIsIm9wdEhlYWRlcnMiLCJjb3JzIiwid2l0aENyZWRlbnRpYWxzIiwiY3JlZGVudGlhbHMiLCJNcDRSZW11eGVyIiwiRm1wNCIsIkJ1ZmZlciIsIndyaXRlVWludDMyIiwiaW5pdEJveCIsImNvbnRlbnQiLCJ3cml0ZSIsImV4dGVuc2lvbiIsImZsYWciLCJmdHlwIiwibW9vdiIsIm12aGQiLCJ0cmFrIiwidmlkZW9UcmFrIiwiYXVkaW9UcmFrIiwibXZleCIsImZvckVhY2giLCJieXRlcyIsInRraGQiLCJtZGlhIiwic2FtcGxlcmF0ZSIsImVkdHMiLCJtZWRpYVRpbWUiLCJtZGhkIiwiaGRsciIsIm1pbmYiLCJ2bWhkIiwic21oZCIsImRpbmYiLCJzdGJsIiwiZHJlZiIsInN0c2QiLCJzdHRzIiwic3RzYyIsInN0c3oiLCJzdGNvIiwibXA0YSIsImF2YzEiLCJlc2RzIiwiY29uZmlnbGVuIiwiaFNwYWNpbmciLCJ2U3BhY2luZyIsImJ0cnQiLCJwYXNwIiwidHJhY2tJRCIsIm1laGQiLCJ0cmV4IiwibW9vZiIsIm1maGQiLCJ0cmFmIiwidGZoZCIsInRmZHQiLCJzZHRwIiwidHJ1biIsInNkdHBMZW5ndGgiLCJzYW1wbGVDb3VudCIsImZsYWdzIiwiaXNMZWFkaW5nIiwiZGVwZW5kc09uIiwiaXNEZXBlbmRlZE9uIiwiaGFzUmVkdW5kYW5jeSIsImlzTm9uU3luYyIsIm51bSIsIm1kYXQiLCJtZGF0Qm94IiwiY2hhckNvZGVBdCIsIl9pc0R0c0Jhc2VJbml0ZWQiLCJpc0ZpcnN0VmlkZW8iLCJpc0ZpcnN0QXVkaW8iLCJ2aWRlb0FsbER1cmF0aW9uIiwiYXVkaW9BbGxEdXJhdGlvbiIsInJlbXV4IiwiUkVNVVhfTUVUQURBVEEiLCJvbk1ldGFEYXRhUmVhZHkiLCJERVRFQ1RfQ0hBTkdFX1NUUkVBTSIsInJlc2V0RHRzQmFzZSIsIl9kdHNCYXNlSW5pdGVkIiwiY2FsY0R0c0Jhc2UiLCJfcmVtdXhWaWRlbyIsIl9yZW11eEF1ZGlvIiwic2VlayIsInByZXNvdXJjZWJ1ZmZlciIsInJlbXV4SW5pdFNlZ21lbnQiLCJJTklUX1NFR01FTlQiLCJpbml0U2VnbWVudCIsImF1ZGlvQmFzZSIsInZpZGVvQmFzZSIsIm1wNFNhbXBsZXMiLCJhdmNTYW1wbGUiLCJtZGF0U2FtcGxlIiwic2FtcGxlRHVyYXRpb24iLCJ2aWRlb01ldGEiLCJtb29mTWRhdCIsIndyaXRlVG9Tb3VyY2UiLCJNRURJQV9TRUdNRU5UIiwibGFzdFNhbXBsZSIsIl92aWRlb05leHREdHMiLCJpc0ZpcnN0RHRzSW5pdGVkIiwiYXVkaW9NZXRhIiwibXA0U2FtcGxlIiwiaW5pdFNpbGVudEF1ZGlvIiwiQ29udGV4dCIsIldPUktFUl9DT01NQU5EUyIsInNuaWZmZXIiLCJNZWRpYUluZm8iLCJNZWRpYVNhbXBsZSIsIk1lZGlhU2VnbWVudCIsIk1lZGlhU2VnbWVudExpc3QiLCJNc2UiLCJNb2JpbGVWaWRlbyIsIkNyeXB0byIsIlJlc3VsdENvbnN0cnVjdG9yIiwidG90YWxMZW5ndGgiLCJfbGVuIiwiYXJyYXlzIiwiX2tleSIsIl9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24iLCJfZGlkSXRlcmF0b3JFcnJvciIsIl9pdGVyYXRvckVycm9yIiwiX2l0ZXJhdG9yIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJfc3RlcCIsInJldHVybiIsIl9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yIiwiX2RpZEl0ZXJhdG9yRXJyb3IyIiwiX2l0ZXJhdG9yRXJyb3IyIiwiX2l0ZXJhdG9yMiIsIl9zdGVwMiIsIl9hcnIiLCJfY29uY2F0IiwiX2NvbmNhdDIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib2JqIiwiX19lc01vZHVsZSIsIndlYnBhY2tCb290c3RyYXBGdW5jIiwibW9kdWxlcyIsImluc3RhbGxlZE1vZHVsZXMiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJjIiwiZCIsImdldHRlciIsIm8iLCJjb25maWd1cmFibGUiLCJnZXREZWZhdWx0IiwiZ2V0TW9kdWxlRXhwb3J0cyIsIm9iamVjdCIsInByb3BlcnR5IiwicCIsIm9lIiwiZiIsInMiLCJFTlRSWV9NT0RVTEUiLCJtb2R1bGVOYW1lUmVxRXhwIiwiZGVwZW5kZW5jeVJlZ0V4cCIsInF1b3RlUmVnRXhwIiwicmVwbGFjZSIsImlzTnVtZXJpYyIsImdldE1vZHVsZURlcGVuZGVuY2llcyIsInF1ZXVlTmFtZSIsInJldHZhbCIsImZuU3RyaW5nIiwid3JhcHBlclNpZ25hdHVyZSIsIndlYnBhY2tSZXF1aXJlTmFtZSIsInJlIiwiUmVnRXhwIiwiZXhlYyIsImhhc1ZhbHVlc0luUXVldWVzIiwicXVldWVzIiwicmVkdWNlIiwiaGFzVmFsdWVzIiwiZ2V0UmVxdWlyZWRNb2R1bGVzIiwibW9kdWxlc1F1ZXVlIiwibWFpbiIsInJlcXVpcmVkTW9kdWxlcyIsInNlZW5Nb2R1bGVzIiwicXVldWUiLCJtb2R1bGVUb0NoZWNrIiwibmV3TW9kdWxlcyIsIm5ld01vZHVsZXNLZXlzIiwiX193ZWJwYWNrX21vZHVsZXNfXyIsImFsbCIsImVudHJ5TW9kdWxlIiwiSlNPTiIsInN0cmluZ2lmeSIsImpvaW4iLCJibG9iIiwiQmxvYiIsImJhcmUiLCJVUkwiLCJ3ZWJraXRVUkwiLCJtb3pVUkwiLCJtc1VSTCIsIndvcmtlclVybCIsImNyZWF0ZU9iamVjdFVSTCIsIndvcmtlciIsIldvcmtlciIsIm9iamVjdFVSTCIsIlJFTVVYX0VSUk9SIiwiTVNFX0VWRU5UUyIsIlNPVVJDRV9VUERBVEVfRU5EIiwiSExTX0VWRU5UUyIsIlJFVFJZX1RJTUVfRVhDRUVERUQiLCJDUllUT19FVkVOVFMiLCJTVEFSVF9ERUNSWVBUIiwiREVDUllQVEVEIiwiQUxMRVZFTlRTIiwiRmx2QWxsb3dlZEV2ZW50cyIsIkhsc0FsbG93ZWRFdmVudHMiLCJDT05URVhUX0NPTU9NQU5EUyIsIk9OIiwiT05DRSIsIk9GRiIsIkVNSVQiLCJERVNUUk9ZIiwiRElSRUNUX0VNSVRfRkxBRyIsImFsbG93ZWRFdmVudHMiLCJfZW1pdHRlciIsIl9pbnN0YW5jZU1hcCIsIl9jbHNNYXAiLCJfaW5pdGVkIiwiX2hvb2tzIiwidGFnIiwiaW5zdGFuY2UiLCJpbml0SW5zdGFuY2UiLCJuZXdJbnN0YW5jZSIsInJlZ2lzdHJ5IiwiY2xzIiwiY2hlY2tNZXNzYWdlTmFtZSIsIl9pc01lc3NhZ2VOYW1lVmFsaWQiLCJzZWxmIiwiZW5oYW5jZWQiLCJvbmNlTGlzdGVuZXJzIiwibWVzc2FnZU5hbWUiLCJjYWxsYmFjayIsImJlZm9yZUxpc3QiLCJlbWl0VG8iLCJyZW1vdmVMaXN0ZW5lcnMiLCJoYXNPd24iLCJjYWxsYmFja3MiLCJkZXN0cm95SW5zdGFuY2VzIiwib3V0cHV0QnVmZmVyIiwib3V0cHV0YnVmZmVyIiwiY3J5cHRvIiwibXNDcnlwdG8iLCJkZWNyaXB0IiwiYWVza2V5Iiwic2JrZXkiLCJzdWJ0bGUiLCJpbXBvcnRLZXkiLCJkZWNyaXB0RGF0YSIsImRlY3J5cHQiLCJyZXMiLCJsZSIsInNldEludDE2IiwiSW50MTZBcnJheSIsImRldmljZSIsIm9zIiwiaXNQYyIsImlzVGFibGV0IiwiYnJvd3NlciIsInVhIiwicmVnIiwiaWUiLCJmaXJmb3giLCJjaHJvbWUiLCJvcGVyYSIsInNhZmFyaSIsImlzV2luZG93c1Bob25lIiwiaXNTeW1iaWFuIiwiaXNBbmRyb2lkIiwiaXNGaXJlRm94IiwiaXNQaG9uZSIsIm91dCIsImlucHV0IiwiZnJvbUNoYXJDb2RlIiwiX2NoZWNrQ29udGludWF0aW9uIiwidWNzNCIsImNoZWNrTGVuZ3RoIiwiQXVkaW9DdHgiLCJBdWRpb0NvbnRleHQiLCJ3ZWJraXRBdWRpb0NvbnRleHQiLCJnYWluTm9kZSIsImNyZWF0ZUdhaW4iLCJjb25uZWN0IiwiZGVzdGluYXRpb24iLCJwcmVsb2FkVGltZSIsIl9jdXJyZW50QnVmZmVyIiwiX25leHRCdWZmZXIiLCJfbGFzdHB0cyIsIl9wcmVEZWNvZGUiLCJfY3VycmVudFRpbWUiLCJfZGVjb2RpbmciLCJfcGxheWVkIiwiY3VycmVudFRpbWUiLCJkZWNvZGVBdWRpbyIsInNldEF1ZGlvRGF0YSIsImRlY29kZUFBQyIsInNhbXBsZURhdGEiLCJnZXRBQUNEYXRhIiwiY29tYmlsZURhdGEiLCJkZWNvZGVBdWRpb0RhdGEiLCJhdWRpb1NvdXJjZSIsImNyZWF0ZUJ1ZmZlclNvdXJjZSIsIm9uZW5kZWQiLCJvblNvdXJjZUVuZGVkIiwiZ2V0VGltZUJ1ZmZlciIsInBsYXkiLCJsb2ciLCJzZXRBdWRpb01ldGFEYXRhIiwiYWR0cyIsImdldEFkdHMiLCJhYWNmcmFtZWxlbmd0aCIsIkFWUmVjb25jaWxlciIsInByb3BzIiwiYUN0eCIsInZDdHgiLCJ0aW1lb3V0SWQiLCJkb1JlY29uY2lsZSIsInZDdXJUaW1lIiwiYUN1clRpbWUiLCJwYXVzZSIsInNldFRpbWVvdXQiLCJIVE1MRWxlbWVudCIsIlZpZGVvQ3R4IiwidGlja2VyIiwiaGlzdG9yeVRpbWUiLCJyZWNvbmNpbGVyIiwiaGFuZGxlQXVkaW9Tb3VyY2VFbmQiLCJvbmNhbnBsYXkiLCJhcHBlbmRDaGlsZCIsImNhbnZhcyIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsIm5vdyIsIl9vblRpbWVyIiwiX2NsZWFuQnVmZmVyIiwiY2xlYW5CdWZmZXIiLCJvbkRlbXV4Q29tcGxldGUiLCJkZWNvZGVWaWRlbyIsInNldEF1ZGlvTWV0YSIsInNldFZpZGVvTWV0YSIsInNldFZpZGVvTWV0YURhdGEiLCJjdXN0b21FbGVtZW50cyIsImRlZmluZSIsIlNvdXJjZUJ1ZmZlciIsImN1cnJlbnRHb3AiLCJfbGFzdEdldCIsImZyYW1lIiwibmV4dEdvcCIsIl9nZXROZXh0IiwiZ29wIiwicmVtb3ZlIiwiVGlja2VyIiwiaW50ZXJ2YWwiLCJvblRpY2siLCJzZXRJbnRlcnZhbCIsIlJhZlRpY2tlciIsInByZXYiLCJ0aW1lcklkIiwiX3N1YlRpbWVySWQiLCJfdGlja0Z1bmMiLCJnZXRUaWNrRnVuYyIsInRpY2siLCJuZXh0VGljayIsInN0b3AiLCJjYW5jZWxGdW5jIiwiZ2V0Q2FuY2VsRnVuYyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwid2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJpc1N1cHBvcnRlZCIsIlRpbWVvdXRUaWNrZXIiLCJjbGVhckludGVydmFsIiwiZ2V0VGlja2VyIiwiVmlkZW9DYW52YXMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJvbkZpcnN0RnJhbWUiLCJyZWFkeVN0YXR1cyIsInBhdXNlZCIsImxhc3RQbGF5ZWQiLCJfZGVjb2RlckluaXRlZCIsIl9hdmNjcHVzaGVkIiwiX2RlY29kZWRGcmFtZXMiLCJfbGFzdFNhbXBsZUR0cyIsIl9iYXNlRHRzIiwiX2xhc3RSZW5kZXJUaW1lIiwiaW5pdFdhc21Xb3JrZXIiLCJ3YXNtd29ya2VyIiwicG9zdE1lc3NhZ2UiLCJtc2ciLCJhZGRFdmVudExpc3RlbmVyIiwiX29uRGVjb2RlZCIsInl1dkNhbnZhcyIsIllVVkNhbnZhcyIsIl9wcmVsb2FkIiwiX2FuYWx5c2VOYWwiLCJmcmFtZVRpbWVzIiwiZnJhbWVUaW1lIiwiY3VycmVudElkeCIsInJlbmRlciIsInlMaW5lc2l6ZSIsInV2TGluZXNpemUiLCJNQVhfU1RSRUFNX0JVRkZFUl9MRU5HVEgiLCJEZWNvZGVyIiwiaW5pdGVkIiwiaW5mb2xpc3QiLCJwYXJfYnJvYWR3YXlPbkJyb2Fkd2F5SW5pdGVkIiwiYnJvYWR3YXlPbkJyb2Fkd2F5SW5pdGVkIiwicGFyX2Jyb2Fkd2F5T25QaWN0dXJlRGVjb2RlZCIsImJyb2Fkd2F5T25QaWN0dXJlRGVjb2RlZCIsInRvVThBcnJheSIsInB0ciIsIkhFQVBVOCIsIk1vZHVsZSIsIl9icm9hZHdheUluaXQiLCJzdHJlYW1CdWZmZXIiLCJfYnJvYWR3YXlDcmVhdGVTdHJlYW0iLCJpbmZvaWQiLCJ5Um93Y291bnQiLCJ1dlJvd2NvdW50IiwiZGF0ZXRlbXAiLCJnZXRUaW1lIiwiX2Jyb2Fkd2F5UGxheVN0cmVhbSIsImRlY29kZXIiLCJvblBvc3RSdW4iLCJpbXBvcnRTY3JpcHRzIiwiYWRkT25Qb3N0UnVuIiwic3R5bGUiLCJfaW5pdENvbnRleHRHTCIsImNvbnRleHRHTCIsIl9pbml0UHJvZ3JhbSIsIl9pbml0QnVmZmVycyIsIl9pbml0VGV4dHVyZXMiLCJnbCIsInZhbGlkQ29udGV4dE5hbWVzIiwibmFtZUluZGV4IiwiY29udGV4dE5hbWUiLCJjb250ZXh0T3B0aW9ucyIsImdldENvbnRleHQiLCJnZXRQYXJhbWV0ZXIiLCJ2ZXJ0ZXhTaGFkZXJTY3JpcHQiLCJmcmFnbWVudFNoYWRlclNjcmlwdCIsIllVVjJSR0IiLCJ2ZXJ0ZXhTaGFkZXIiLCJjcmVhdGVTaGFkZXIiLCJWRVJURVhfU0hBREVSIiwic2hhZGVyU291cmNlIiwiY29tcGlsZVNoYWRlciIsImdldFNoYWRlclBhcmFtZXRlciIsIkNPTVBJTEVfU1RBVFVTIiwiZ2V0U2hhZGVySW5mb0xvZyIsImZyYWdtZW50U2hhZGVyIiwiRlJBR01FTlRfU0hBREVSIiwiY3JlYXRlUHJvZ3JhbSIsImF0dGFjaFNoYWRlciIsImxpbmtQcm9ncmFtIiwiZ2V0UHJvZ3JhbVBhcmFtZXRlciIsIkxJTktfU1RBVFVTIiwiZ2V0UHJvZ3JhbUluZm9Mb2ciLCJ1c2VQcm9ncmFtIiwiWVVWMlJHQlJlZiIsImdldFVuaWZvcm1Mb2NhdGlvbiIsInVuaWZvcm1NYXRyaXg0ZnYiLCJzaGFkZXJQcm9ncmFtIiwidmVydGV4UG9zQnVmZmVyIiwiY3JlYXRlQnVmZmVyIiwiYmluZEJ1ZmZlciIsIkFSUkFZX0JVRkZFUiIsImJ1ZmZlckRhdGEiLCJGbG9hdDMyQXJyYXkiLCJTVEFUSUNfRFJBVyIsInZlcnRleFBvc1JlZiIsImdldEF0dHJpYkxvY2F0aW9uIiwiZW5hYmxlVmVydGV4QXR0cmliQXJyYXkiLCJ2ZXJ0ZXhBdHRyaWJQb2ludGVyIiwiRkxPQVQiLCJ0ZXh0dXJlUG9zQnVmZmVyIiwidGV4dHVyZVBvc1JlZiIsInVUZXh0dXJlUG9zQnVmZmVyIiwidVRleHR1cmVQb3NSZWYiLCJ2VGV4dHVyZVBvc0J1ZmZlciIsInZUZXh0dXJlUG9zUmVmIiwieVRleHR1cmVSZWYiLCJfaW5pdFRleHR1cmUiLCJ5U2FtcGxlclJlZiIsInVuaWZvcm0xaSIsInVUZXh0dXJlUmVmIiwidVNhbXBsZXJSZWYiLCJ2VGV4dHVyZVJlZiIsInZTYW1wbGVyUmVmIiwidGV4dHVyZVJlZiIsImNyZWF0ZVRleHR1cmUiLCJiaW5kVGV4dHVyZSIsIlRFWFRVUkVfMkQiLCJ0ZXhQYXJhbWV0ZXJpIiwiVEVYVFVSRV9NQUdfRklMVEVSIiwiTkVBUkVTVCIsIlRFWFRVUkVfTUlOX0ZJTFRFUiIsIlRFWFRVUkVfV1JBUF9TIiwiQ0xBTVBfVE9fRURHRSIsIlRFWFRVUkVfV1JBUF9UIiwiX2RyYXdQaWN0dXJlR0wiLCJ5bGVuIiwidXZsZW4iLCJyZW5kZXJEYXRhIiwieURhdGEiLCJ1RGF0YSIsInZEYXRhIiwiX2RyYXdQaWN0dXJlR0w0MjAiLCJ5RGF0YVBlclJvdyIsInlSb3dDbnQiLCJ1RGF0YVBlclJvdyIsInVSb3dDbnQiLCJ2RGF0YVBlclJvdyIsInZSb3dDbnQiLCJyYXRpb3ciLCJyYXRpb2giLCJsZWZ0IiwidG9wIiwidmlld3BvcnQiLCJ0ZXh0dXJlUG9zVmFsdWVzIiwiRFlOQU1JQ19EUkFXIiwidVRleHR1cmVQb3NWYWx1ZXMiLCJ2VGV4dHVyZVBvc1ZhbHVlcyIsImFjdGl2ZVRleHR1cmUiLCJURVhUVVJFMCIsInRleEltYWdlMkQiLCJMVU1JTkFOQ0UiLCJVTlNJR05FRF9CWVRFIiwiVEVYVFVSRTEiLCJURVhUVVJFMiIsImRyYXdBcnJheXMiLCJUUklBTkdMRV9TVFJJUCIsIl9kcmF3UGljdHVyZVJHQiIsImlzT2JqZWN0RmlsbGVkIiwibWltZVR5cGUiLCJpc0NvbXBsZXRlIiwiaXNCYXNlSW5mb1JlYWR5IiwiaXNWaWRlb1JlYWR5IiwiaXNBdWRpb1JlYWR5IiwiX2RlZmF1bHQiLCJnZXREZWZhdWx0SW5mIiwiZW50cmllcyIsInYiLCJpc1JBUCIsIl90eXBlIiwiX2xhc3RBcHBlbmRMb2NhdGlvbiIsImlzRW1wdHkiLCJfc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUiLCJiZWdpbkR0cyIsImxhc3QiLCJtaWQiLCJsYm91bmQiLCJ1Ym91bmQiLCJpZHgiLCJfc2VhcmNoTmVhcmVzdFNlZ21lbnRBZnRlciIsInNlZ21lbnQiLCJsYXN0QXBwZW5kSWR4IiwiaW5zZXJ0SWR4Iiwib3JpZ2luU3RhcnREdHMiLCJnZXRMYXN0U2VnbWVudEJlZm9yZSIsImdldExhc3RTYW1wbGVCZWZvcmUiLCJnZXRMYXN0UkFQQmVmb3JlIiwic2VnbWVudElkeCIsInJhbmRvbUFjY2Vzc1BvaW50cyIsInN0YXJ0RHRzIiwiZW5kRHRzIiwic3RhcnRQdHMiLCJlbmRQdHMiLCJvcmlnaW5FbmREdHMiLCJhZGRSQVAiLCJNU0UiLCJjb250YWluZXIiLCJtZWRpYVNvdXJjZSIsInNvdXJjZUJ1ZmZlcnMiLCJvblNvdXJjZU9wZW4iLCJvblRpbWVVcGRhdGUiLCJvblVwZGF0ZUVuZCIsIm9uV2FpdGluZyIsIk1lZGlhU291cmNlIiwiYWRkU291cmNlQnVmZmVycyIsImRvQXBwZW5kIiwicmVhZHlTdGF0ZSIsImFkZCIsImR1ciIsIm1pbWUiLCJzb3VyY2VCdWZmZXIiLCJhZGRTb3VyY2VCdWZmZXIiLCJ1cGRhdGluZyIsImFwcGVuZEJ1ZmZlciIsImVuZE9mU3RyZWFtIiwiYWN0aXZlU291cmNlQnVmZmVycyIsInJlbW92ZUJ1ZmZlcnMiLCJ0YXNrTGlzdCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJ0YXNrIiwiUHJvbWlzZSIsImRvQ2xlYW5CdWZmZXIiLCJyZXRyeVRpbWUiLCJjbGVhbiIsImNsZWFyQnVmZmVyIiwicmVtb3ZlU291cmNlQnVmZmVyIiwicmV2b2tlT2JqZWN0VVJMIiwiYnVmZmVyZWQiLCJiRW5kIiwicmVhZEFzSW50IiwidGVtcCIsInBhZFN0YXJ0NEhleCIsImhleE51bSIsImhleFN0ciIsInBhZFN0YXJ0IiwibG9vcCIsInNpZ24iLCJyZWFkVWludDY0IiwicmVhZEludDE2IiwicmVhZEludDMyIiwiVGFnIiwiTG9nZ2VyIiwiRmx2Q29udHJvbGxlciIsInBsYXllciIsIl9wbGF5ZXIiLCJpbml0U2VnbWVudEFycml2ZWQiLCJpbml0TGlzdGVuZXJzIiwiX2hhbmRsZUxvYWRlckRhdGFMb2FkZWQiLCJfaGFuZGxlTmV0d29ya0Vycm9yIiwiX2hhbmRsZU1lZGlhSW5mbyIsIl9oYW5kbGVNZXRhZGF0YVBhcnNlZCIsIl9oYW5kbGVEZW11eENvbXBsZXRlIiwiX2hhbmRsZURlbXV4RXJyb3IiLCJfc2V0TWV0YVRvQXVkaW8iLCJfc2V0TWV0YVRvVmlkZW8iLCJfaGFuZGxlQXBwZW5kSW5pdFNlZ21lbnQiLCJQbGF5ZXIiLCJFcnJvcnMiLCJsb2FkRGF0YSIsImxvYWRlciIsInJlc29sdmVWaWRlb0dPUCIsImZpcnN0SWZyYW1lSWR4IiwibGFzdElmcmFtZUlkeCIsInRlbXBTYW1wbGVzIiwicmVzdCIsImZsdkFsbG93ZWRFdmVudHMiLCJGbHZQbGF5ZXIiLCJpbml0RXZlbnRzIiwiaW5pdEZsdiIsImZsdiIsImluaXRGbHZFdmVudHMiLCJ1dGlsIiwiYWRkQ2xhc3MiLCJyb290IiwiZmluZERvbSIsImxpdmUiLCJjcmVhdGVEb20iLCJjb250cm9scyIsInRpbWVyIiwiZ2V0QnVmZmVyZWRSYW5nZSIsInJhbmdlIiwiRkxWIiwiX2hhc1N0YXJ0IiwiX2Rlc3Ryb3kiLCJtc2UiLCJjdXJyZW50U3JjIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFDTCxXQUFLcjlCLEtBQUwsQ0FBV2djLEdBQVg7QUFDRDtBQUNELFNBQUtoZixJQUFMLENBQVUsU0FBVixFQUFxQixNQUFNO0FBQ3pCLFdBQUt3L0IsV0FBTCxHQUFtQixDQUFuQjtBQUNELEtBRkQ7QUFHRDtBQXRINEI7O0FBeUgvQnZqQyxPQUFPQyxPQUFQLEdBQWlCcTVDLFNBQWpCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUhBLGFBQWEsbUNBQW1DLEVBQUUsSSIsImZpbGUiOiJtb2JpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUiA9IHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyA/IFJlZmxlY3QgOiBudWxsXG52YXIgUmVmbGVjdEFwcGx5ID0gUiAmJiB0eXBlb2YgUi5hcHBseSA9PT0gJ2Z1bmN0aW9uJ1xuICA/IFIuYXBwbHlcbiAgOiBmdW5jdGlvbiBSZWZsZWN0QXBwbHkodGFyZ2V0LCByZWNlaXZlciwgYXJncykge1xuICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbCh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKTtcbiAgfVxuXG52YXIgUmVmbGVjdE93bktleXNcbmlmIChSICYmIHR5cGVvZiBSLm93bktleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgUmVmbGVjdE93bktleXMgPSBSLm93bktleXNcbn0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpXG4gICAgICAuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSk7XG4gIH07XG59IGVsc2Uge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBQcm9jZXNzRW1pdFdhcm5pbmcod2FybmluZykge1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbn1cblxudmFyIE51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uIE51bWJlcklzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgRXZlbnRFbWl0dGVyLmluaXQuY2FsbCh0aGlzKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50c0NvdW50ID0gMDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxudmFyIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50RW1pdHRlciwgJ2RlZmF1bHRNYXhMaXN0ZW5lcnMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oYXJnKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcgIT09ICdudW1iZXInIHx8IGFyZyA8IDAgfHwgTnVtYmVySXNOYU4oYXJnKSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgYXJnICsgJy4nKTtcbiAgICB9XG4gICAgZGVmYXVsdE1heExpc3RlbmVycyA9IGFyZztcbiAgfVxufSk7XG5cbkV2ZW50RW1pdHRlci5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgaWYgKHRoaXMuX2V2ZW50cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICB0aGlzLl9ldmVudHMgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzKSB7XG4gICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufTtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBuIDwgMCB8fCBOdW1iZXJJc05hTihuKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJuXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIG4gKyAnLicpO1xuICB9XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gJGdldE1heExpc3RlbmVycyh0aGF0KSB7XG4gIGlmICh0aGF0Ll9tYXhMaXN0ZW5lcnMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIHJldHVybiB0aGF0Ll9tYXhMaXN0ZW5lcnM7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gJGdldE1heExpc3RlbmVycyh0aGlzKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICB2YXIgYXJncyA9IFtdO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIHZhciBkb0Vycm9yID0gKHR5cGUgPT09ICdlcnJvcicpO1xuXG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZClcbiAgICBkb0Vycm9yID0gKGRvRXJyb3IgJiYgZXZlbnRzLmVycm9yID09PSB1bmRlZmluZWQpO1xuICBlbHNlIGlmICghZG9FcnJvcilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAoZG9FcnJvcikge1xuICAgIHZhciBlcjtcbiAgICBpZiAoYXJncy5sZW5ndGggPiAwKVxuICAgICAgZXIgPSBhcmdzWzBdO1xuICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAvLyBOb3RlOiBUaGUgY29tbWVudHMgb24gdGhlIGB0aHJvd2AgbGluZXMgYXJlIGludGVudGlvbmFsLCB0aGV5IHNob3dcbiAgICAgIC8vIHVwIGluIE5vZGUncyBvdXRwdXQgaWYgdGhpcyByZXN1bHRzIGluIGFuIHVuaGFuZGxlZCBleGNlcHRpb24uXG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICB9XG4gICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuaGFuZGxlZCBlcnJvci4nICsgKGVyID8gJyAoJyArIGVyLm1lc3NhZ2UgKyAnKScgOiAnJykpO1xuICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgdGhyb3cgZXJyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICB9XG5cbiAgdmFyIGhhbmRsZXIgPSBldmVudHNbdHlwZV07XG5cbiAgaWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgUmVmbGVjdEFwcGx5KGhhbmRsZXIsIHRoaXMsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBSZWZsZWN0QXBwbHkobGlzdGVuZXJzW2ldLCB0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuZnVuY3Rpb24gX2FkZExpc3RlbmVyKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIsIHByZXBlbmQpIHtcbiAgdmFyIG07XG4gIHZhciBldmVudHM7XG4gIHZhciBleGlzdGluZztcblxuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cblxuICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRhcmdldC5fZXZlbnRzQ291bnQgPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICAgIGlmIChldmVudHMubmV3TGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0LmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyID8gbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgICAgIC8vIFJlLWFzc2lnbiBgZXZlbnRzYCBiZWNhdXNlIGEgbmV3TGlzdGVuZXIgaGFuZGxlciBjb3VsZCBoYXZlIGNhdXNlZCB0aGVcbiAgICAgIC8vIHRoaXMuX2V2ZW50cyB0byBiZSBhc3NpZ25lZCB0byBhIG5ldyBvYmplY3RcbiAgICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICAgIH1cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXTtcbiAgfVxuXG4gIGlmIChleGlzdGluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICArK3RhcmdldC5fZXZlbnRzQ291bnQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBleGlzdGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9XG4gICAgICAgIHByZXBlbmQgPyBbbGlzdGVuZXIsIGV4aXN0aW5nXSA6IFtleGlzdGluZywgbGlzdGVuZXJdO1xuICAgICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIH0gZWxzZSBpZiAocHJlcGVuZCkge1xuICAgICAgZXhpc3RpbmcudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4aXN0aW5nLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gICAgbSA9ICRnZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICBpZiAobSA+IDAgJiYgZXhpc3RpbmcubGVuZ3RoID4gbSAmJiAhZXhpc3Rpbmcud2FybmVkKSB7XG4gICAgICBleGlzdGluZy53YXJuZWQgPSB0cnVlO1xuICAgICAgLy8gTm8gZXJyb3IgY29kZSBmb3IgdGhpcyBzaW5jZSBpdCBpcyBhIFdhcm5pbmdcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nLmxlbmd0aCArICcgJyArIFN0cmluZyh0eXBlKSArICcgbGlzdGVuZXJzICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnaW5jcmVhc2UgbGltaXQnKTtcbiAgICAgIHcubmFtZSA9ICdNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmcnO1xuICAgICAgdy5lbWl0dGVyID0gdGFyZ2V0O1xuICAgICAgdy50eXBlID0gdHlwZTtcbiAgICAgIHcuY291bnQgPSBleGlzdGluZy5sZW5ndGg7XG4gICAgICBQcm9jZXNzRW1pdFdhcm5pbmcodyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuXG5mdW5jdGlvbiBvbmNlV3JhcHBlcigpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBSZWZsZWN0QXBwbHkodGhpcy5saXN0ZW5lciwgdGhpcy50YXJnZXQsIGFyZ3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJlcGVuZExpc3RlbmVyKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuLy8gRW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmIGFuZCBvbmx5IGlmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgbGlzdCwgZXZlbnRzLCBwb3NpdGlvbiwgaSwgb3JpZ2luYWxMaXN0ZW5lcjtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgbGlzdCA9IGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHwgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3QubGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yIChpID0gbGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fCBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgb3JpZ2luYWxMaXN0ZW5lciA9IGxpc3RbaV0ubGlzdGVuZXI7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMClcbiAgICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNwbGljZU9uZShsaXN0LCBwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgZXZlbnRzW3R5cGVdID0gbGlzdFswXTtcblxuICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIG9yaWdpbmFsTGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbiAgICBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnModHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycywgZXZlbnRzLCBpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudHNbdHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBMSUZPIG9yZGVyXG4gICAgICAgIGZvciAoaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5mdW5jdGlvbiBfbGlzdGVuZXJzKHRhcmdldCwgdHlwZSwgdW53cmFwKSB7XG4gIHZhciBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuICBpZiAoZXZsaXN0ZW5lciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIHVud3JhcCA/IFtldmxpc3RlbmVyLmxpc3RlbmVyIHx8IGV2bGlzdGVuZXJdIDogW2V2bGlzdGVuZXJdO1xuXG4gIHJldHVybiB1bndyYXAgP1xuICAgIHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKSA6IGFycmF5Q2xvbmUoZXZsaXN0ZW5lciwgZXZsaXN0ZW5lci5sZW5ndGgpO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIHRydWUpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yYXdMaXN0ZW5lcnMgPSBmdW5jdGlvbiByYXdMaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcblxuICAgIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChldmxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgcmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50ID4gMCA/IFJlZmxlY3RPd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBuKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KG4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSlcbiAgICBjb3B5W2ldID0gYXJyW2ldO1xuICByZXR1cm4gY29weTtcbn1cblxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAoOyBpbmRleCArIDEgPCBsaXN0Lmxlbmd0aDsgaW5kZXgrKylcbiAgICBsaXN0W2luZGV4XSA9IGxpc3RbaW5kZXggKyAxXTtcbiAgbGlzdC5wb3AoKTtcbn1cblxuZnVuY3Rpb24gdW53cmFwTGlzdGVuZXJzKGFycikge1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGFyci5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5sZW5ndGg7ICsraSkge1xuICAgIHJldFtpXSA9IGFycltpXS5saXN0ZW5lciB8fCBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBUcmFjazogcmVxdWlyZSgnLi9zcmMvdHJhY2snKS5kZWZhdWx0LFxuICBUcmFja3M6IHJlcXVpcmUoJy4vc3JjL3RyYWNrJykuVHJhY2tzLFxuICBBdWRpb1RyYWNrOiByZXF1aXJlKCcuL3NyYy90cmFjaycpLkF1ZGlvVHJhY2ssXG4gIFZpZGVvVHJhY2s6IHJlcXVpcmUoJy4vc3JjL3RyYWNrJykuVmlkZW9UcmFjayxcblxuICBYZ0J1ZmZlcjogcmVxdWlyZSgnLi9zcmMvYnVmZmVyJykuWGdCdWZmZXIsXG4gIFJlbXV4QnVmZmVyOiByZXF1aXJlKCcuL3NyYy9idWZmZXInKS5SZW11eEJ1ZmZlcixcblxuICBQcmVTb3VyY2U6IHJlcXVpcmUoJy4vc3JjL3ByZXNvdWNlJykuZGVmYXVsdFxufTtcbiIsImV4cG9ydCBjbGFzcyBYZ0J1ZmZlciB7XG4gIC8qKlxuICAgKiBBIGJ1ZmZlciB0byBzdG9yZSBsb2FkZWQgZGF0YS5cbiAgICpcbiAgICogQGNsYXNzIExvYWRlckJ1ZmZlclxuICAgKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoIC0gT3B0aW9uYWwgdGhlIGJ1ZmZlciBzaXplXG4gICAqL1xuICBjb25zdHJ1Y3RvciAobGVuZ3RoKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGggfHwgMFxuICAgIHRoaXMuaGlzdG9yeUxlbiA9IGxlbmd0aCB8fCAwXG4gICAgdGhpcy5hcnJheSA9IFtdXG4gICAgdGhpcy5vZmZzZXQgPSAwXG4gIH1cblxuICAvKipcbiAgICogVGhlIGZ1bmN0aW9uIHRvIHB1c2ggZGF0YS5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IGRhdGEgLSBUaGUgZGF0YSB0byBwdXNoIGludG8gdGhlIGJ1ZmZlclxuICAgKi9cbiAgcHVzaCAoZGF0YSkge1xuICAgIHRoaXMuYXJyYXkucHVzaChkYXRhKVxuICAgIHRoaXMubGVuZ3RoICs9IGRhdGEuYnl0ZUxlbmd0aFxuICAgIHRoaXMuaGlzdG9yeUxlbiArPSBkYXRhLmJ5dGVMZW5ndGhcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZnVuY3Rpb24gdG8gc2hpZnQgZGF0YS5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aCAtIFRoZSBzaXplIG9mIHNoaWZ0LlxuICAgKi9cbiAgc2hpZnQgKGxlbmd0aCkge1xuICAgIGlmICh0aGlzLmFycmF5Lmxlbmd0aCA8IDEpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheSgwKVxuICAgIH1cblxuICAgIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NoaWZ0QnVmZmVyKClcbiAgICB9XG4gICAgaWYgKCh0aGlzLm9mZnNldCArIGxlbmd0aCkgPT09IHRoaXMuYXJyYXlbMF0ubGVuZ3RoKSB7XG4gICAgICBsZXQgcmV0ID0gdGhpcy5hcnJheVswXS5zbGljZSh0aGlzLm9mZnNldCwgdGhpcy5vZmZzZXQgKyBsZW5ndGgpXG4gICAgICB0aGlzLm9mZnNldCA9IDBcbiAgICAgIHRoaXMuYXJyYXkuc2hpZnQoKVxuICAgICAgdGhpcy5sZW5ndGggLT0gbGVuZ3RoXG4gICAgICByZXR1cm4gcmV0XG4gICAgfVxuXG4gICAgaWYgKCh0aGlzLm9mZnNldCArIGxlbmd0aCkgPCB0aGlzLmFycmF5WzBdLmxlbmd0aCkge1xuICAgICAgbGV0IHJldCA9IHRoaXMuYXJyYXlbMF0uc2xpY2UodGhpcy5vZmZzZXQsIHRoaXMub2Zmc2V0ICsgbGVuZ3RoKVxuICAgICAgdGhpcy5vZmZzZXQgKz0gbGVuZ3RoXG4gICAgICB0aGlzLmxlbmd0aCAtPSBsZW5ndGhcbiAgICAgIHJldHVybiByZXRcbiAgICB9XG5cbiAgICBsZXQgcmV0ID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKVxuICAgIGxldCB0bXBvZmYgPSAwXG4gICAgd2hpbGUgKHRoaXMuYXJyYXkubGVuZ3RoID4gMCAmJiBsZW5ndGggPiAwKSB7XG4gICAgICBpZiAoKHRoaXMub2Zmc2V0ICsgbGVuZ3RoKSA8IHRoaXMuYXJyYXlbMF0ubGVuZ3RoKSB7XG4gICAgICAgIGxldCB0bXAgPSB0aGlzLmFycmF5WzBdLnNsaWNlKHRoaXMub2Zmc2V0LCB0aGlzLm9mZnNldCArIGxlbmd0aClcbiAgICAgICAgcmV0LnNldCh0bXAsIHRtcG9mZilcbiAgICAgICAgdGhpcy5vZmZzZXQgKz0gbGVuZ3RoXG4gICAgICAgIHRoaXMubGVuZ3RoIC09IGxlbmd0aFxuICAgICAgICBsZW5ndGggPSAwXG4gICAgICAgIGJyZWFrXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgdGVtcGxlbmd0aCA9IHRoaXMuYXJyYXlbMF0ubGVuZ3RoIC0gdGhpcy5vZmZzZXRcbiAgICAgICAgcmV0LnNldCh0aGlzLmFycmF5WzBdLnNsaWNlKHRoaXMub2Zmc2V0LCB0aGlzLmFycmF5WzBdLmxlbmd0aCksIHRtcG9mZilcbiAgICAgICAgdGhpcy5hcnJheS5zaGlmdCgpXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gMFxuICAgICAgICB0bXBvZmYgKz0gdGVtcGxlbmd0aFxuICAgICAgICB0aGlzLmxlbmd0aCAtPSB0ZW1wbGVuZ3RoXG4gICAgICAgIGxlbmd0aCAtPSB0ZW1wbGVuZ3RoXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXRcbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0byBjbGVhciB0aGUgYnVmZmVyLlxuICAgKi9cbiAgY2xlYXIgKCkge1xuICAgIHRoaXMuYXJyYXkgPSBbXVxuICAgIHRoaXMubGVuZ3RoID0gMFxuICAgIHRoaXMub2Zmc2V0ID0gMFxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5jbGVhcigpXG4gICAgdGhpcy5oaXN0b3J5TGVuID0gMFxuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRvIHNoaWZ0IG9uZSB1bml0OEFycmF5LlxuICAgKi9cbiAgX3NoaWZ0QnVmZmVyICgpIHtcbiAgICB0aGlzLmxlbmd0aCAtPSB0aGlzLmFycmF5WzBdLmxlbmd0aFxuICAgIHRoaXMub2Zmc2V0ID0gMFxuICAgIHJldHVybiB0aGlzLmFycmF5LnNoaWZ0KClcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IHVpbnQ4IGRhdGEgdG8gbnVtYmVyLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgLSB0aGUgc3RhcnQgcG9zdGlvbi5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aCAtIHRoZSBsZW5ndGggb2YgZGF0YS5cbiAgICovXG4gIHRvSW50IChzdGFydCwgbGVuZ3RoKSB7XG4gICAgbGV0IHJldEludCA9IDBcbiAgICBsZXQgaSA9IHRoaXMub2Zmc2V0ICsgc3RhcnRcbiAgICB3aGlsZSAoaSA8IHRoaXMub2Zmc2V0ICsgbGVuZ3RoICsgc3RhcnQpIHtcbiAgICAgIGlmIChpIDwgdGhpcy5hcnJheVswXS5sZW5ndGgpIHtcbiAgICAgICAgcmV0SW50ID0gcmV0SW50ICogMjU2ICsgdGhpcy5hcnJheVswXVtpXVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmFycmF5WzFdKSB7XG4gICAgICAgIHJldEludCA9IHJldEludCAqIDI1NiArIHRoaXMuYXJyYXlbMV1baSAtIHRoaXMuYXJyYXlbMF0ubGVuZ3RoXVxuICAgICAgfVxuXG4gICAgICBpKytcbiAgICB9XG4gICAgcmV0dXJuIHJldEludFxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZW11eEJ1ZmZlciB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLnZpZGVvID0gW11cbiAgICB0aGlzLmF1ZGlvID0gW11cbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMudmlkZW8gPSBbXVxuICAgIHRoaXMuYXVkaW8gPSBbXVxuICB9XG59XG4iLCJjbGFzcyBTb3VyY2Uge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5taW1ldHlwZSA9ICcnO1xuICAgIHRoaXMuaW5pdCA9IG51bGw7XG4gICAgdGhpcy5kYXRhID0gW107XG4gIH1cbn1cblxuY2xhc3MgUHJlU291cmNlIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuc291cmNlcyA9IHt9O1xuICB9XG5cbiAgZ2V0U291cmNlIChzb3VyY2UpIHtcbiAgICByZXR1cm4gdGhpcy5zb3VyY2VzW3NvdXJjZV07XG4gIH1cblxuICBjcmVhdGVTb3VyY2UgKG5hbWUpIHtcbiAgICB0aGlzLnNvdXJjZXNbbmFtZV0gPSBuZXcgU291cmNlKCk7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlc1tuYW1lXTtcbiAgfVxuXG4gIGNsZWFyICgpIHtcbiAgICB0aGlzLnNvdXJjZXMgPSB7fTtcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuc291cmNlcyA9IHt9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByZVNvdXJjZTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyYWNrIHtcbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3Rvci5cbiAgICovXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLmlkID0gLTFcbiAgICB0aGlzLnNlcXVlbmNlTnVtYmVyID0gMFxuICAgIHRoaXMuc2FtcGxlcyA9IFtdXG4gICAgdGhpcy5kcm9wcGVkU2FtcGxlcyA9IFtdXG4gICAgdGhpcy5sZW5ndGggPSAwXG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhlIHRyYWNrLlxuICAgKi9cbiAgcmVzZXQgKCkge1xuICAgIHRoaXMuc2VxdWVuY2VOdW1iZXIgPSAwXG4gICAgdGhpcy5zYW1wbGVzID0gW11cbiAgICB0aGlzLmxlbmd0aCA9IDBcbiAgfVxuICAvKipcbiAgICogZGVzdHJveSB0aGUgdHJhY2suXG4gICAqL1xuICBkaXN0cm95ICgpIHtcbiAgICB0aGlzLnJlc2V0KClcbiAgICB0aGlzLmlkID0gLTFcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQXVkaW9UcmFjayBleHRlbmRzIFRyYWNrIHtcbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgYXVkaW8gdHJhY2suXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuVEFHID0gJ0F1ZGlvVHJhY2snXG4gICAgdGhpcy50eXBlID0gJ2F1ZGlvJ1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWaWRlb1RyYWNrIGV4dGVuZHMgVHJhY2sge1xuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB2aWRlbyB0cmFjay5cbiAgICovXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5UQUcgPSAnVmlkZW9UcmFjaydcbiAgICB0aGlzLnR5cGUgPSAndmlkZW8nXG4gICAgdGhpcy5kcm9wcGVkID0gMFxuICB9XG4gIC8qKlxuICAgKiByZXNldCB0aGUgdmlkZW8gdHJhY2suXG4gICAqL1xuICByZXNldCAoKSB7XG4gICAgdGhpcy5zZXF1ZW5jZU51bWJlciA9IDBcbiAgICB0aGlzLnNhbXBsZXMgPSBbXVxuICAgIHRoaXMubGVuZ3RoID0gMFxuICAgIHRoaXMuZHJvcHBlZCA9IDBcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVHJhY2tzIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuYXVkaW9UcmFjayA9IG51bGxcbiAgICB0aGlzLnZpZGVvVHJhY2sgPSBudWxsXG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmF1ZGlvVHJhY2sgPSBudWxsXG4gICAgdGhpcy52aWRlb1RyYWNrID0gbnVsbFxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgTmFsdW5pdDogcmVxdWlyZSgnLi9zcmMvaDI2NC9uYWx1bml0JykuZGVmYXVsdCxcbiAgU3BzUGFyc2VyOiByZXF1aXJlKCcuL3NyYy9oMjY0L25hbHVuaXQvc3BzJykuZGVmYXVsdCxcblxuICBDb21wYXRpYmlsaXR5OiByZXF1aXJlKCcuL3NyYy9jb21wYXRpYmlsaXR5JykuZGVmYXVsdFxufTtcbiIsIlxuY2xhc3MgQUFDIHtcblxuICBzdGF0aWMgZ2V0U2lsZW50RnJhbWUoY29kZWMsIGNoYW5uZWxDb3VudCkge1xuICAgIGlmIChjb2RlYyA9PT0gJ21wNGEuNDAuMicpIHtcbiAgICAgIC8vIGhhbmRsZSBMQy1BQUNcbiAgICAgIGlmIChjaGFubmVsQ291bnQgPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDAwLCAweGM4LCAweDAwLCAweDgwLCAweDIzLCAweDgwXSk7XG4gICAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gMikge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MjEsIDB4MDAsIDB4NDksIDB4OTAsIDB4MDIsIDB4MTksIDB4MDAsIDB4MjMsIDB4ODBdKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSAzKSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4ZV0pO1xuICAgICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDAwLCAweGM4LCAweDAwLCAweDgwLCAweDIwLCAweDg0LCAweDAxLCAweDI2LCAweDQwLCAweDA4LCAweDY0LCAweDAwLCAweDgwLCAweDJjLCAweDgwLCAweDA4LCAweDAyLCAweDM4XSk7XG4gICAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gNSkge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4ODIsIDB4MzAsIDB4MDQsIDB4OTksIDB4MDAsIDB4MjEsIDB4OTAsIDB4MDIsIDB4MzhdKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSA2KSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4MiwgMHgzMCwgMHgwNCwgMHg5OSwgMHgwMCwgMHgyMSwgMHg5MCwgMHgwMiwgMHgwMCwgMHhiMiwgMHgwMCwgMHgyMCwgMHgwOCwgMHhlMF0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBoYW5kbGUgSEUtQUFDIChtcDRhLjQwLjUgLyBtcDRhLjQwLjI5KVxuICAgICAgaWYgKGNoYW5uZWxDb3VudCA9PT0gMSkge1xuICAgICAgICAvLyBmZm1wZWcgLXkgLWYgbGF2ZmkgLWkgXCJhZXZhbHNyYz0wOmQ9MC4wNVwiIC1jOmEgbGliZmRrX2FhYyAtcHJvZmlsZTphIGFhY19oZSAtYjphIDRrIG91dHB1dC5hYWMgJiYgaGV4ZHVtcCAtdiAtZSAnMTYvMSBcIjB4JXgsXCIgXCJcXG5cIicgLXYgb3V0cHV0LmFhY1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MSwgMHg0MCwgMHgyMiwgMHg4MCwgMHhhMywgMHg0ZSwgMHhlNiwgMHg4MCwgMHhiYSwgMHg4LCAweDAsIDB4MCwgMHgwLCAweDFjLCAweDYsIDB4ZjEsIDB4YzEsIDB4YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1ZV0pO1xuICAgICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDIpIHtcbiAgICAgICAgLy8gZmZtcGVnIC15IC1mIGxhdmZpIC1pIFwiYWV2YWxzcmM9MHwwOmQ9MC4wNVwiIC1jOmEgbGliZmRrX2FhYyAtcHJvZmlsZTphIGFhY19oZV92MiAtYjphIDRrIG91dHB1dC5hYWMgJiYgaGV4ZHVtcCAtdiAtZSAnMTYvMSBcIjB4JXgsXCIgXCJcXG5cIicgLXYgb3V0cHV0LmFhY1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MSwgMHg0MCwgMHgyMiwgMHg4MCwgMHhhMywgMHg1ZSwgMHhlNiwgMHg4MCwgMHhiYSwgMHg4LCAweDAsIDB4MCwgMHgwLCAweDAsIDB4OTUsIDB4MCwgMHg2LCAweGYxLCAweGExLCAweGEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWVdKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSAzKSB7XG4gICAgICAgIC8vIGZmbXBlZyAteSAtZiBsYXZmaSAtaSBcImFldmFsc3JjPTB8MHwwOmQ9MC4wNVwiIC1jOmEgbGliZmRrX2FhYyAtcHJvZmlsZTphIGFhY19oZV92MiAtYjphIDRrIG91dHB1dC5hYWMgJiYgaGV4ZHVtcCAtdiAtZSAnMTYvMSBcIjB4JXgsXCIgXCJcXG5cIicgLXYgb3V0cHV0LmFhY1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MSwgMHg0MCwgMHgyMiwgMHg4MCwgMHhhMywgMHg1ZSwgMHhlNiwgMHg4MCwgMHhiYSwgMHg4LCAweDAsIDB4MCwgMHgwLCAweDAsIDB4OTUsIDB4MCwgMHg2LCAweGYxLCAweGExLCAweGEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWVdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBQUM7XG4iLCJpbXBvcnQge0VWRU5UU30gZnJvbSAneGdwbGF5ZXItdXRpbHMnXG5pbXBvcnQgQUFDIGZyb20gJy4vYWFjL2FhYy1oZWxwZXInXG5cbmNvbnN0IHtSRU1VWF9FVkVOVFMsIERFTVVYX0VWRU5UU30gPSBFVkVOVFNcblxuY2xhc3MgQ29tcGF0aWJpbGl0eSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLm5leHRBdWRpb0R0cyA9IDAgLy8g5qih5ouf5LiL5LiA5q616Z+z6aKR5pWw5o2u55qEZHRzXG4gICAgdGhpcy5uZXh0VmlkZW9EdHMgPSAwIC8vIOaooeaLn+S4i+S4gOauteinhumikeaVsOaNrueahGR0c1xuXG4gICAgdGhpcy5sYXN0QXVkaW9TYW1wbGVzTGVuID0gMCAvLyDkuIrkuIDmrrXpn7PpopHmlbDmja7nmoTplb/luqZcbiAgICB0aGlzLmxhc3RWaWRlb1NhbXBsZXNMZW4gPSAwIC8vIOS4iuS4gOauteinhumikeaVsOaNrueahOmVv+W6plxuXG4gICAgdGhpcy5sYXN0VmlkZW9EdHMgPSB1bmRlZmluZWQgLy8g5LiK5LiA5q616Z+z6aKR5pWw5o2u55qE6ZW/5bqmXG4gICAgdGhpcy5sYXN0QXVkaW9EdHMgPSB1bmRlZmluZWQgLy8g5LiK5LiA5q616KeG6aKR5pWw5o2u55qE6ZW/5bqmXG5cbiAgICB0aGlzLmFsbEF1ZGlvU2FtcGxlc0NvdW50ID0gMCAvLyDpn7PpopHmgLvmlbDmja7ph48o5Y6f5aeL5binKVxuICAgIHRoaXMuYWxsVmlkZW9TYW1wbGVzQ291bnQgPSAwIC8vIOinhumikeaAu+aVsOaNrumHjyjljp/lp4vluKcpXG5cbiAgICB0aGlzLl9maXJzdEF1ZGlvU2FtcGxlID0gbnVsbFxuICAgIHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUgPSBudWxsXG5cbiAgICB0aGlzLmZpbGxlZEF1ZGlvU2FtcGxlcyA9IFtdIC8vIOihpeWFhemfs+mikeW4p++8iO+8iVxuICAgIHRoaXMuZmlsbGVkVmlkZW9TYW1wbGVzID0gW10gLy8g6KGl5YWF6KeG6aKR5bin77yI77yJXG5cbiAgICB0aGlzLl92aWRlb0xhcmdlR2FwID0gMFxuICAgIHRoaXMuX2F1ZGlvTGFyZ2VHYXAgPSAwXG4gIH1cblxuICBpbml0ICgpIHtcbiAgICB0aGlzLmJlZm9yZShSRU1VWF9FVkVOVFMuUkVNVVhfTUVESUEsIHRoaXMuZG9GaXguYmluZCh0aGlzKSlcbiAgfVxuXG4gIHJlc2V0ICgpIHtcbiAgICB0aGlzLm5leHRBdWRpb0R0cyA9IG51bGwgLy8g5Lyw566X5LiL5LiA5q616Z+z6aKR5pWw5o2u55qEZHRzXG4gICAgdGhpcy5uZXh0VmlkZW9EdHMgPSBudWxsIC8vIOS8sOeul+S4i+S4gOauteinhumikeaVsOaNrueahGR0c1xuXG4gICAgdGhpcy5sYXN0QXVkaW9TYW1wbGVzTGVuID0gMCAvLyDkuIrkuIDmrrXpn7PpopHmlbDmja7nmoTplb/luqZcbiAgICB0aGlzLmxhc3RWaWRlb1NhbXBsZXNMZW4gPSAwIC8vIOS4iuS4gOauteinhumikeaVsOaNrueahOmVv+W6plxuXG4gICAgdGhpcy5sYXN0VmlkZW9EdHMgPSB1bmRlZmluZWQgLy8g5LiK5LiA5q616Z+z6aKR5pWw5o2u55qE6ZW/5bqmXG4gICAgdGhpcy5sYXN0QXVkaW9EdHMgPSB1bmRlZmluZWQgLy8g5LiK5LiA5q616KeG6aKR5pWw5o2u55qE6ZW/5bqmXG5cbiAgICAvLyB0aGlzLmFsbEF1ZGlvU2FtcGxlc0NvdW50ID0gMCAvLyDpn7PpopHmgLvmlbDmja7ph48o5Y6f5aeL5binKVxuICAgIC8vIHRoaXMuYWxsVmlkZW9TYW1wbGVzQ291bnQgPSAwIC8vIOinhumikeaAu+aVsOaNrumHjyjljp/lp4vluKcpXG5cbiAgICAvLyB0aGlzLl9maXJzdEF1ZGlvU2FtcGxlID0gbnVsbFxuICAgIC8vIHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUgPSBudWxsXG5cbiAgICB0aGlzLmZpbGxlZEF1ZGlvU2FtcGxlcyA9IFtdIC8vIOihpeWFhemfs+mikeW4p++8iO+8iVxuICAgIHRoaXMuZmlsbGVkVmlkZW9TYW1wbGVzID0gW10gLy8g6KGl5YWF6KeG6aKR5bin77yI77yJXG4gIH1cblxuICBkb0ZpeCAoKSB7XG4gICAgY29uc3QgeyBpc0ZpcnN0QXVkaW9TYW1wbGVzLCBpc0ZpcnN0VmlkZW9TYW1wbGVzIH0gPSB0aGlzLmdldEZpcnN0U2FtcGxlKClcblxuICAgIC8vIHRoaXMucmVtb3ZlSW52YWxpZFNhbXBsZXMoKVxuXG4gICAgdGhpcy5yZWNvcmRTYW1wbGVzQ291bnQoKVxuXG4gICAgaWYgKHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUpIHtcbiAgICAgIHRoaXMuZml4UmVmU2FtcGxlRHVyYXRpb24odGhpcy52aWRlb1RyYWNrLm1ldGEsIHRoaXMudmlkZW9UcmFjay5zYW1wbGVzKVxuICAgIH1cbiAgICBpZiAodGhpcy5fZmlyc3RBdWRpb1NhbXBsZSkge1xuICAgICAgdGhpcy5maXhSZWZTYW1wbGVEdXJhdGlvbih0aGlzLmF1ZGlvVHJhY2subWV0YSwgdGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMpXG4gICAgfVxuXG4gICAgY29uc3QgeyBjaGFuZ2VkOiB2aWRlb0NoYW5nZWQsIGNoYW5nZWRJZHg6IHZpZGVvQ2hhbmdlZElkeCB9ID0gQ29tcGF0aWJpbGl0eS5kZXRhY3RDaGFuZ2VTdHJlYW0odGhpcy52aWRlb1RyYWNrLnNhbXBsZXMpXG4gICAgaWYgKHZpZGVvQ2hhbmdlZCAmJiAhaXNGaXJzdEF1ZGlvU2FtcGxlcykge1xuICAgICAgdGhpcy5maXhDaGFuZ2VTdHJlYW1WaWRlbyh2aWRlb0NoYW5nZWRJZHgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZG9GaXhWaWRlbyhpc0ZpcnN0VmlkZW9TYW1wbGVzKVxuICAgIH1cblxuICAgIGNvbnN0IHsgY2hhbmdlZDogYXVkaW9DaGFuZ2VkLCBjaGFuZ2VkSWR4OiBhdWRpb0NoYW5nZWRJZHggfSA9IENvbXBhdGliaWxpdHkuZGV0YWN0Q2hhbmdlU3RyZWFtKHRoaXMuYXVkaW9UcmFjay5zYW1wbGVzKVxuICAgIGlmIChhdWRpb0NoYW5nZWQpIHtcbiAgICAgIHRoaXMuZml4Q2hhbmdlU3RyZWFtQXVkaW8oYXVkaW9DaGFuZ2VkSWR4KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRvRml4QXVkaW8oaXNGaXJzdEF1ZGlvU2FtcGxlcylcbiAgICB9XG5cbiAgICAvLyB0aGlzLnJlbW92ZUludmFsaWRTYW1wbGVzKClcbiAgfVxuXG4gIGRvRml4VmlkZW8gKGZpcnN0LCBzdHJlYW1DaGFuZ2VTdGFydCkge1xuICAgIGxldCB7c2FtcGxlczogdmlkZW9TYW1wbGVzLCBtZXRhfSA9IHRoaXMudmlkZW9UcmFja1xuXG4gICAgaWYgKG1ldGEuZnJhbWVSYXRlICYmIG1ldGEuZnJhbWVSYXRlLmZpeGVkID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdmlkZW9TYW1wbGVzIHx8ICF2aWRlb1NhbXBsZXMubGVuZ3RoIHx8ICF0aGlzLl9maXJzdFZpZGVvU2FtcGxlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBjb25zb2xlLmxvZyhgdmlkZW8gbGFzdFNhbXBsZSwgJHt2aWRlb1NhbXBsZXNbdmlkZW9TYW1wbGVzLmxlbmd0aCAtIDFdLmR0c31gKVxuXG4gICAgY29uc3QgZmlyc3RTYW1wbGUgPSB2aWRlb1NhbXBsZXNbMF1cblxuICAgIGNvbnN0IHNhbXBsZXNMZW4gPSB2aWRlb1NhbXBsZXMubGVuZ3RoO1xuXG4gICAgLy8gc3RlcDAu5L+u5aSNaGxz5rWB5Ye6546w5beo5aSnZ2Fw77yM6ZyA6KaB5by65Yi26YeN5a6a5L2N55qE6Zeu6aKYXG4gICAgaWYgKHRoaXMuX3ZpZGVvTGFyZ2VHYXAgPiAwKSB7XG4gICAgICBDb21wYXRpYmlsaXR5LmRvRml4TGFyZ2VHYXAodmlkZW9TYW1wbGVzLCB0aGlzLl92aWRlb0xhcmdlR2FwKVxuICAgIH1cblxuICAgIGlmIChmaXJzdFNhbXBsZS5kdHMgIT09IHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUuZHRzICYmIChzdHJlYW1DaGFuZ2VTdGFydCB8fCBDb21wYXRpYmlsaXR5LmRldGVjdExhcmdlR2FwKHRoaXMubmV4dFZpZGVvRHRzLCBmaXJzdFNhbXBsZSkpKSB7XG4gICAgICBpZiAoc3RyZWFtQ2hhbmdlU3RhcnQpIHtcbiAgICAgICAgdGhpcy5uZXh0VmlkZW9EdHMgPSBzdHJlYW1DaGFuZ2VTdGFydCAvLyBGSVg6IEhsc+S4remAlOWIh2NvZGVj77yM5Zyo5aaC5p6c55u05o6lc2Vla+WIsOWQjumdoueahOeCueS8muWvvOiHtGxhcmdlR2Fw6K6h566X5aSx6LSlXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3ZpZGVvTGFyZ2VHYXAgPSB0aGlzLm5leHRWaWRlb0R0cyAtIGZpcnN0U2FtcGxlLmR0c1xuICAgICAgQ29tcGF0aWJpbGl0eS5kb0ZpeExhcmdlR2FwKHZpZGVvU2FtcGxlcywgdGhpcy5fdmlkZW9MYXJnZUdhcClcbiAgICB9XG5cbiAgICBjb25zdCBmaXJzdER0cyA9IGZpcnN0U2FtcGxlLmR0c1xuXG4gICAgLy8gc3RlcDEuIOS/ruWkjeS4jmF1ZGlv6aaW5bin5beu6Led5aSq5aSn55qE6Zeu6aKYXG4gICAgaWYgKGZpcnN0ICYmIHRoaXMuX2ZpcnN0QXVkaW9TYW1wbGUpIHtcbiAgICAgIGNvbnN0IHZpZGVvRmlyc3REdHMgPSB0aGlzLl9maXJzdFZpZGVvU2FtcGxlLmR0c1xuICAgICAgY29uc3QgYXVkaW9GaXJzdER0cyA9IHRoaXMuX2ZpcnN0QXVkaW9TYW1wbGUuZHRzXG4gICAgICBjb25zdCBnYXAgPSB2aWRlb0ZpcnN0RHRzIC0gYXVkaW9GaXJzdER0c1xuICAgICAgaWYgKGdhcCA+ICgyICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbikpIHtcbiAgICAgICAgY29uc3QgZmlsbENvdW50ID0gTWF0aC5mbG9vcihnYXAgLyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsbENvdW50OyBpKyspIHtcbiAgICAgICAgICBjb25zdCBjbG9uZWRGaXJzdFNhbXBsZSA9IE9iamVjdC5hc3NpZ24oe30sIGZpcnN0U2FtcGxlKSAvLyDop4bpopHlpLTpg6jluKfnvLrlpLHpnIDopoHlpI3liLbnrKzkuIDluKdcbiAgICAgICAgICAvLyDph43mlrDorqHnrpdzYW1wbGXnmoRkdHPlkoxwdHNcbiAgICAgICAgICBjbG9uZWRGaXJzdFNhbXBsZS5kdHMgPSB2aWRlb0ZpcnN0RHRzIC0gKGkgKyAxKSAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb25cbiAgICAgICAgICBjbG9uZWRGaXJzdFNhbXBsZS5wdHMgPSBjbG9uZWRGaXJzdFNhbXBsZS5kdHMgKyBjbG9uZWRGaXJzdFNhbXBsZS5jdHNcblxuICAgICAgICAgIHZpZGVvU2FtcGxlcy51bnNoaWZ0KGNsb25lZEZpcnN0U2FtcGxlKVxuXG4gICAgICAgICAgdGhpcy5maWxsZWRWaWRlb1NhbXBsZXMucHVzaCh7XG4gICAgICAgICAgICBkdHM6IGNsb25lZEZpcnN0U2FtcGxlLmR0cyxcbiAgICAgICAgICAgIHNpemU6IGNsb25lZEZpcnN0U2FtcGxlLmRhdGEuYnl0ZUxlbmd0aFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgZ2FwXG4gICAgLy8gc3RlcDIuIOS/ruWkjXNhbXBsZXPmrrXkuYvpl7TnmoTpl7Tot53pl67popjjgIFcbiAgICBpZiAodGhpcy5uZXh0VmlkZW9EdHMpIHtcbiAgICAgIC8vIHN0ZXAxLiDlpITnkIZzYW1wbGVz5q615LmL6Ze055qE5Lii5bin5oOF5Ya1XG4gICAgICAvLyDlvZPlj5HnjrBkdXJhdGlvbuW3rui3neWkp+S6jjLluKfml7bov5vooYzooaXluKdcbiAgICAgIGdhcCA9IGZpcnN0RHRzIC0gdGhpcy5uZXh0VmlkZW9EdHNcbiAgICAgIGNvbnN0IGFic0dhcCA9IE1hdGguYWJzKGdhcClcbiAgICAgIGlmIChnYXAgPiAoMiAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pKSB7XG4gICAgICAgIGNvbnN0IGZpbGxGcmFtZUNvdW50ID0gTWF0aC5mbG9vcihnYXAgLyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKVxuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsbEZyYW1lQ291bnQ7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGNsb25lZFNhbXBsZSA9IE9iamVjdC5hc3NpZ24oe30sIHZpZGVvU2FtcGxlc1swXSlcbiAgICAgICAgICBjb25zdCBjb21wdXRlZCA9IGZpcnN0RHRzIC0gKGkgKyAxKSAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb25cblxuICAgICAgICAgIGNsb25lZFNhbXBsZS5kdHMgPSBjb21wdXRlZCA+IHRoaXMubmV4dFZpZGVvRHRzID8gY29tcHV0ZWQgOiB0aGlzLm5leHRWaWRlb0R0cyAvLyDooaXnmoTnrKzkuIDluKfkuIDlrpropoHmmK9uZXh0VmlkZW9EdHNcbiAgICAgICAgICBjbG9uZWRTYW1wbGUucHRzID0gY2xvbmVkU2FtcGxlLmR0cyArIGNsb25lZFNhbXBsZS5jdHNcblxuICAgICAgICAgIHRoaXMudmlkZW9UcmFjay5zYW1wbGVzLnVuc2hpZnQoY2xvbmVkU2FtcGxlKVxuXG4gICAgICAgICAgdGhpcy5maWxsZWRWaWRlb1NhbXBsZXMucHVzaCh7XG4gICAgICAgICAgICBkdHM6IGNsb25lZFNhbXBsZS5kdHMsXG4gICAgICAgICAgICBzaXplOiBjbG9uZWRTYW1wbGUuZGF0YS5ieXRlTGVuZ3RoXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChhYnNHYXAgPD0gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiAmJiBhYnNHYXAgPiAwKSB7XG4gICAgICAgIC8vIOW9k+W3rui3neWcqCst5LiA5bin5LmL6Ze05pe25bCG56ys5LiA5bin55qEZHRz5by66KGM5a6a5L2N5Yiw5pyf5pyb5L2N572uXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCfph43lrprkvY3op4bpopHluKdkdHMnLCB2aWRlb1NhbXBsZXNbMF0uZHRzLCB0aGlzLm5leHRWaWRlb0R0cylcbiAgICAgICAgdmlkZW9TYW1wbGVzWzBdLmR0cyA9IHRoaXMubmV4dFZpZGVvRHRzXG4gICAgICAgIHZpZGVvU2FtcGxlc1swXS5vcmlnaW5EdHMgPSB2aWRlb1NhbXBsZXNbMF0uZHRzXG4gICAgICAgIHZpZGVvU2FtcGxlc1swXS5jdHMgPSB2aWRlb1NhbXBsZXNbMF0uY3RzICE9PSB1bmRlZmluZWQgPyB2aWRlb1NhbXBsZXNbMF0uY3RzIDogdmlkZW9TYW1wbGVzWzBdLnB0cyAtIHZpZGVvU2FtcGxlc1swXS5kdHNcbiAgICAgICAgdmlkZW9TYW1wbGVzWzBdLnB0cyA9IHZpZGVvU2FtcGxlc1swXS5kdHMgKyB2aWRlb1NhbXBsZXNbMF0uY3RzXG4gICAgICB9IGVsc2UgaWYgKGdhcCA8IDApIHtcbiAgICAgICAgLy8g5Ye6546w5aSn55qEZ2FwXG4gICAgICAgIENvbXBhdGliaWxpdHkuZG9GaXhMYXJnZUdhcCh2aWRlb1NhbXBsZXMsICgtMSAqIGdhcCkpXG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGxhc3REdHMgPSB2aWRlb1NhbXBsZXNbdmlkZW9TYW1wbGVzLmxlbmd0aCAtIDFdLmR0cztcblxuICAgIGNvbnN0IGxhc3RTYW1wbGVEdXJhdGlvbiA9IHZpZGVvU2FtcGxlcy5sZW5ndGggPj0gMiA/IGxhc3REdHMgLSB2aWRlb1NhbXBsZXNbdmlkZW9TYW1wbGVzLmxlbmd0aCAtIDJdLmR0cyA6IG1ldGEucmVmU2FtcGxlRHVyYXRpb25cblxuICAgIHRoaXMubGFzdFZpZGVvU2FtcGxlc0xlbiA9IHNhbXBsZXNMZW5cbiAgICB0aGlzLm5leHRWaWRlb0R0cyA9IGxhc3REdHMgKyBsYXN0U2FtcGxlRHVyYXRpb25cbiAgICB0aGlzLmxhc3RWaWRlb0R0cyA9IGxhc3REdHNcblxuICAgIC8vIHN0ZXAyLiDkv67lpI1zYW1wbGXmrrXkuYvlhoXnmoTpl7Tot53pl67pophcbiAgICAvLyBzdGVwMy4g5L+u5aSNc2FtcGxlc+auteWGhemDqOeahGR0c+W8guW4uOmXrumimFxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB2aWRlb1NhbXBsZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSB2aWRlb1NhbXBsZXNbaV1cbiAgICAgIGNvbnN0IG5leHQgPSB2aWRlb1NhbXBsZXNbaSArIDFdXG5cbiAgICAgIGlmICghbmV4dCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY29uc3QgZHVyYXRpb24gPSBuZXh0LmR0cyAtIGN1cnJlbnQuZHRzO1xuXG4gICAgICBpZiAoZHVyYXRpb24gPiAoMiAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pKSB7XG4gICAgICAgIC8vIOS4pOW4p+S5i+mXtOmXtOmalOWkquWkp++8jOmcgOimgeihpeepuueZveW4p1xuICAgICAgICBsZXQgZmlsbEZyYW1lQ291bnQgPSBNYXRoLmZsb29yKGR1cmF0aW9uIC8gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbilcblxuICAgICAgICBsZXQgZmlsbEZyYW1lSWR4ID0gMFxuICAgICAgICB3aGlsZSAoZmlsbEZyYW1lSWR4IDwgZmlsbEZyYW1lQ291bnQpIHtcbiAgICAgICAgICBjb25zdCBmaWxsRnJhbWUgPSBPYmplY3QuYXNzaWduKHt9LCBuZXh0KVxuICAgICAgICAgIGZpbGxGcmFtZS5kdHMgPSBjdXJyZW50LmR0cyArIChmaWxsRnJhbWVJZHggKyAxKSAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb25cbiAgICAgICAgICBmaWxsRnJhbWUucHRzID0gZmlsbEZyYW1lLmR0cyArIGZpbGxGcmFtZS5jdHNcbiAgICAgICAgICBpZiAoZmlsbEZyYW1lIDwgbmV4dC5kdHMpIHtcbiAgICAgICAgICAgIHZpZGVvU2FtcGxlcy5zcGxpY2UoaSwgMCwgZmlsbEZyYW1lKVxuXG4gICAgICAgICAgICB0aGlzLmZpbGxlZFZpZGVvU2FtcGxlcy5wdXNoKHtcbiAgICAgICAgICAgICAgZHRzOiBmaWxsRnJhbWUuZHRzLFxuICAgICAgICAgICAgICBzaXplOiBmaWxsRnJhbWUuZGF0YS5ieXRlTGVuZ3RoXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZpbGxGcmFtZUlkeCsrXG4gICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy52aWRlb1RyYWNrLnNhbXBsZXMgPSB2aWRlb1NhbXBsZXM7XG4gIH1cblxuICBkb0ZpeEF1ZGlvIChmaXJzdCwgc3RyZWFtQ2hhbmdlU3RhcnQpIHtcbiAgICBsZXQge3NhbXBsZXM6IGF1ZGlvU2FtcGxlcywgbWV0YX0gPSB0aGlzLmF1ZGlvVHJhY2tcblxuICAgIGlmICghYXVkaW9TYW1wbGVzIHx8ICFhdWRpb1NhbXBsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2coYGF1ZGlvIGxhc3RTYW1wbGUsICR7YXVkaW9TYW1wbGVzW2F1ZGlvU2FtcGxlcy5sZW5ndGggLSAxXS5kdHN9YClcblxuICAgIGNvbnN0IHNhbXBsZXNMZW4gPSBhdWRpb1NhbXBsZXMubGVuZ3RoO1xuICAgIGNvbnN0IHNpbGVudEZyYW1lID0gQUFDLmdldFNpbGVudEZyYW1lKG1ldGEuY29kZWMsIG1ldGEuY2hhbm5lbENvdW50KVxuXG4gICAgY29uc3QgZmlyc3RTYW1wbGUgPSB0aGlzLl9maXJzdEF1ZGlvU2FtcGxlXG5cbiAgICBjb25zdCBfZmlyc3RTYW1wbGUgPSBhdWRpb1NhbXBsZXNbMF1cbiAgICAvLyDlr7lhdWRpb1NhbXBsZXPmjInnhadkdHPlgZrmjpLluo9cbiAgICAvLyBhdWRpb1NhbXBsZXMgPSBDb21wYXRpYmlsaXR5LnNvcnRBdWRpb1NhbXBsZXMoYXVkaW9TYW1wbGVzKVxuICAgIGlmICh0aGlzLl9hdWRpb0xhcmdlR2FwID4gMCkge1xuICAgICAgQ29tcGF0aWJpbGl0eS5kb0ZpeExhcmdlR2FwKGF1ZGlvU2FtcGxlcywgdGhpcy5fYXVkaW9MYXJnZUdhcClcbiAgICB9XG5cbiAgICBpZiAoX2ZpcnN0U2FtcGxlLmR0cyAhPT0gdGhpcy5fZmlyc3RBdWRpb1NhbXBsZS5kdHMgJiYgKHN0cmVhbUNoYW5nZVN0YXJ0IHx8IENvbXBhdGliaWxpdHkuZGV0ZWN0TGFyZ2VHYXAodGhpcy5uZXh0QXVkaW9EdHMsIF9maXJzdFNhbXBsZSkpKSB7XG4gICAgICBpZiAoc3RyZWFtQ2hhbmdlU3RhcnQpIHtcbiAgICAgICAgdGhpcy5uZXh0QXVkaW9EdHMgPSBzdHJlYW1DaGFuZ2VTdGFydCAvLyBGSVg6IEhsc+S4remAlOWIh2NvZGVj77yM5Zyo5aaC5p6c55u05o6lc2Vla+WIsOWQjumdoueahOeCueS8muWvvOiHtGxhcmdlR2Fw6K6h566X5aSx6LSlXG4gICAgICB9XG4gICAgICB0aGlzLl9hdWRpb0xhcmdlR2FwID0gdGhpcy5uZXh0QXVkaW9EdHMgLSBfZmlyc3RTYW1wbGUuZHRzXG4gICAgICBDb21wYXRpYmlsaXR5LmRvRml4TGFyZ2VHYXAoYXVkaW9TYW1wbGVzLCB0aGlzLl9hdWRpb0xhcmdlR2FwKVxuICAgIH1cbiAgICAvLyBzdGVwMC4g6aaW5bin5LiOdmlkZW/pppbluKfpl7Tot53lpKfnmoTpl67pophcbiAgICBpZiAodGhpcy5fZmlyc3RWaWRlb1NhbXBsZSAmJiBmaXJzdCkge1xuICAgICAgY29uc3QgdmlkZW9GaXJzdFB0cyA9IHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUucHRzID8gdGhpcy5fZmlyc3RWaWRlb1NhbXBsZS5wdHMgOiB0aGlzLl9maXJzdFZpZGVvU2FtcGxlLmR0cyArIHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUuY3RzXG5cbiAgICAgIGlmIChmaXJzdFNhbXBsZS5kdHMgLSB2aWRlb0ZpcnN0UHRzID4gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbikge1xuICAgICAgICBjb25zdCBzaWxlbnRTYW1wbGVDb3VudCA9IE1hdGguZmxvb3IoKGZpcnN0U2FtcGxlLmR0cyAtIHZpZGVvRmlyc3RQdHMpIC8gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbilcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpbGVudFNhbXBsZUNvdW50OyBpKyspIHtcbiAgICAgICAgICBjb25zdCBzaWxlbnRTYW1wbGUgPSB7XG4gICAgICAgICAgICBkYXRhOiBzaWxlbnRGcmFtZSxcbiAgICAgICAgICAgIGRhdGFzaXplOiBzaWxlbnRGcmFtZS5ieXRlTGVuZ3RoLFxuICAgICAgICAgICAgZHRzOiBmaXJzdFNhbXBsZS5kdHMgLSAoaSArIDEpICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbixcbiAgICAgICAgICAgIGZpbHRlcmVkOiAwXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYXVkaW9TYW1wbGVzLnVuc2hpZnQoc2lsZW50U2FtcGxlKVxuXG4gICAgICAgICAgdGhpcy5maWxsZWRBdWRpb1NhbXBsZXMucHVzaCh7XG4gICAgICAgICAgICBkdHM6IHNpbGVudFNhbXBsZS5kdHMsXG4gICAgICAgICAgICBzaXplOiBzaWxlbnRTYW1wbGUuZGF0YS5ieXRlTGVuZ3RoXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBnYXBcbiAgICBjb25zdCBmaXJzdER0cyA9IGF1ZGlvU2FtcGxlc1swXS5kdHNcblxuICAgIGlmICh0aGlzLm5leHRBdWRpb0R0cykge1xuICAgICAgLy8gc3RlcDEuIOWkhOeQhnNhbXBsZXPmrrXkuYvpl7TnmoTkuKLluKfmg4XlhrVcbiAgICAgIC8vIOW9k+WPkeeOsGR1cmF0aW9u5beu6Led5aSn5LqOMeW4p+aXtui/m+ihjOihpeW4p1xuICAgICAgZ2FwID0gZmlyc3REdHMgLSB0aGlzLm5leHRBdWRpb0R0c1xuICAgICAgY29uc3QgYWJzR2FwID0gTWF0aC5hYnMoZ2FwKVxuXG4gICAgICBpZiAoYWJzR2FwID4gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiAmJiBzYW1wbGVzTGVuID09PSAxICYmIHRoaXMubGFzdEF1ZGlvU2FtcGxlc0xlbiA9PT0gMSkge1xuICAgICAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uRml4ZWQgPSB1bmRlZmluZWRcbiAgICAgIH1cblxuICAgICAgaWYgKGdhcCA+ICgyICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbikpIHtcbiAgICAgICAgaWYgKHNhbXBsZXNMZW4gPT09IDEgJiYgdGhpcy5sYXN0QXVkaW9TYW1wbGVzTGVuID09PSAxKSB7XG4gICAgICAgICAgLy8g5aaC5p6cc2FtcGxl55qEbGVuZ3Ro5LiA55u05pivMe+8jOiAjOS4lOS4gOebtOS4jeespuWQiHJlZlNhbXBsZUR1cmF0aW9u77yM6ZyA6KaB5Yqo5oCB5L+u5pS5cmVmU2FtcGxlRHVyYXRpb25cbiAgICAgICAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uRml4ZWQgPSBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uRml4ZWQgIT09IHVuZGVmaW5lZCA/IG1ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZCArIGdhcCA6IG1ldGEucmVmU2FtcGxlRHVyYXRpb24gKyBnYXBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBzaWxlbnRGcmFtZUNvdW50ID0gTWF0aC5mbG9vcihnYXAgLyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKVxuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaWxlbnRGcmFtZUNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbXB1dGVkID0gZmlyc3REdHMgLSAoaSArIDEpICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuICAgICAgICAgICAgY29uc3Qgc2lsZW50U2FtcGxlID0gT2JqZWN0LmFzc2lnbih7fSwgYXVkaW9TYW1wbGVzWzBdLCB7XG4gICAgICAgICAgICAgIGR0czogY29tcHV0ZWQgPiB0aGlzLm5leHRBdWRpb0R0cyA/IGNvbXB1dGVkIDogdGhpcy5uZXh0QXVkaW9EdHNcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHRoaXMuZmlsbGVkQXVkaW9TYW1wbGVzLnB1c2goe1xuICAgICAgICAgICAgICBkdHM6IHNpbGVudFNhbXBsZS5kdHMsXG4gICAgICAgICAgICAgIHNpemU6IHNpbGVudFNhbXBsZS5kYXRhLmJ5dGVMZW5ndGhcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLmF1ZGlvVHJhY2suc2FtcGxlcy51bnNoaWZ0KHNpbGVudFNhbXBsZSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoYWJzR2FwIDw9IG1ldGEucmVmU2FtcGxlRHVyYXRpb24gJiYgYWJzR2FwID4gMCkge1xuICAgICAgICAvLyDlvZPlt67ot53mr5TovoPlsI/nmoTml7blgJnlsIbpn7PpopHluKfph43lrprkvY1cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ+mHjeWumuS9jemfs+mikeW4p2R0cycsIGF1ZGlvU2FtcGxlc1swXS5kdHMsIHRoaXMubmV4dEF1ZGlvRHRzKVxuICAgICAgICBhdWRpb1NhbXBsZXNbMF0uZHRzID0gdGhpcy5uZXh0QXVkaW9EdHNcbiAgICAgICAgYXVkaW9TYW1wbGVzWzBdLnB0cyA9IHRoaXMubmV4dEF1ZGlvRHRzXG4gICAgICB9IGVsc2UgaWYgKGdhcCA8IDApIHtcbiAgICAgICAgQ29tcGF0aWJpbGl0eS5kb0ZpeExhcmdlR2FwKGF1ZGlvU2FtcGxlcywgKC0xICogZ2FwKSlcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgbGFzdER0cyA9IGF1ZGlvU2FtcGxlc1thdWRpb1NhbXBsZXMubGVuZ3RoIC0gMV0uZHRzO1xuICAgIGNvbnN0IGxhc3RTYW1wbGVEdXJhdGlvbiA9IGF1ZGlvU2FtcGxlcy5sZW5ndGggPj0gMiA/IGxhc3REdHMgLSBhdWRpb1NhbXBsZXNbYXVkaW9TYW1wbGVzLmxlbmd0aCAtIDJdLmR0cyA6IG1ldGEucmVmU2FtcGxlRHVyYXRpb25cblxuICAgIHRoaXMubGFzdEF1ZGlvU2FtcGxlc0xlbiA9IHNhbXBsZXNMZW47XG4gICAgdGhpcy5uZXh0QXVkaW9EdHMgPSBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uRml4ZWQgPyBsYXN0RHRzICsgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbkZpeGVkIDogbGFzdER0cyArIGxhc3RTYW1wbGVEdXJhdGlvblxuICAgIHRoaXMubGFzdEF1ZGlvRHRzID0gbGFzdER0c1xuXG4gICAgLy8gc3RlcDMuIOS/ruWkjXNhbXBsZXPmrrXlhoXpg6jnmoRkdHPlvILluLjpl67pophcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXVkaW9TYW1wbGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50ID0gYXVkaW9TYW1wbGVzW2ldXG4gICAgICBjb25zdCBuZXh0ID0gYXVkaW9TYW1wbGVzW2kgKyAxXVxuXG4gICAgICBpZiAoIW5leHQpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGR1cmF0aW9uID0gbmV4dC5kdHMgLSBjdXJyZW50LmR0cztcbiAgICAgIGF1ZGlvU2FtcGxlc1tpXS5kdXJhdGlvbiA9IGR1cmF0aW9uO1xuICAgICAgLypcbiAgICAgIGlmIChkdXJhdGlvbiA+ICgyICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbikpIHtcbiAgICAgICAgLy8g5Lik5bin5LmL6Ze06Ze06ZqU5aSq5aSn77yM6ZyA6KaB6KGl56m655m95binXG4gICAgICAgIC8qKlxuICAgICAgICBsZXQgc2lsZW50RnJhbWVDb3VudCA9IE1hdGguZmxvb3IoZHVyYXRpb24gLyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKVxuICAgICAgICBsZXQgZnJhbWVJZHggPSAwXG5cbiAgICAgICAgd2hpbGUgKGZyYW1lSWR4IDwgc2lsZW50RnJhbWVDb3VudCkge1xuICAgICAgICAgIGNvbnN0IHNpbGVudFNhbXBsZSA9IHtcbiAgICAgICAgICAgIGRhdGE6IHNpbGVudEZyYW1lLFxuICAgICAgICAgICAgZGF0YXNpemU6IHNpbGVudEZyYW1lLmJ5dGVMZW5ndGgsXG4gICAgICAgICAgICBkdHM6IGN1cnJlbnQuZHRzICsgKGZyYW1lSWR4ICsgMSkgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uLFxuICAgICAgICAgICAgZmlsdGVyZWQ6IDAsXG4gICAgICAgICAgICBpc1NpbGVudDogdHJ1ZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGF1ZGlvU2FtcGxlcy5zcGxpY2UoaSwgMCwgc2lsZW50U2FtcGxlKVxuXG4gICAgICAgICAgdGhpcy5maWxsZWRBdWRpb1NhbXBsZXMucHVzaCh7XG4gICAgICAgICAgICBkdHM6IHNpbGVudFNhbXBsZS5kdHMsXG4gICAgICAgICAgICBzaXplOiBzaWxlbnRTYW1wbGUuZGF0YS5ieXRlTGVuZ3RoXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIGZyYW1lSWR4KytcbiAgICAgICAgICBpKysgLy8g5LiN5a+56Z2Z6Z+z5bin5YGa5q+U6L6DXG4gICAgICAgIH1cbiAgICAgIH0gKi9cbiAgICB9XG5cbiAgICB0aGlzLmF1ZGlvVHJhY2suc2FtcGxlcyA9IENvbXBhdGliaWxpdHkuc29ydEF1ZGlvU2FtcGxlcyhhdWRpb1NhbXBsZXMpXG4gIH1cblxuICBmaXhDaGFuZ2VTdHJlYW1WaWRlbyAoY2hhbmdlSWR4KSB7XG4gICAgY29uc3QgeyBzYW1wbGVzLCBtZXRhIH0gPSB0aGlzLnZpZGVvVHJhY2s7XG4gICAgY29uc3QgcHJldkR0cyA9IGNoYW5nZUlkeCA9PT0gMCA/IHRoaXMuZ2V0U3RyZWFtQ2hhbmdlU3RhcnQoc2FtcGxlc1swXSkgOiBzYW1wbGVzW2NoYW5nZUlkeCAtIDFdLmR0cztcbiAgICBjb25zdCBjdXJEdHMgPSBzYW1wbGVzW2NoYW5nZUlkeF0uZHRzO1xuICAgIGNvbnN0IGlzQ29udGludWUgPSBNYXRoLmFicyhwcmV2RHRzIC0gY3VyRHRzKSA8PSAyICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbjtcblxuICAgIGlmIChpc0NvbnRpbnVlKSB7XG4gICAgICBpZiAoIXNhbXBsZXNbY2hhbmdlSWR4XS5vcHRpb25zKSB7XG4gICAgICAgIHNhbXBsZXNbY2hhbmdlSWR4XS5vcHRpb25zID0ge1xuICAgICAgICAgIGlzQ29udGludWU6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2FtcGxlc1tjaGFuZ2VJZHhdLm9wdGlvbnMuaXNDb250aW51ZSA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5kb0ZpeFZpZGVvKGZhbHNlKVxuICAgIH1cblxuICAgIGNvbnN0IGZpcnN0UGFydFNhbXBsZXMgPSBzYW1wbGVzLnNsaWNlKDAsIGNoYW5nZUlkeCk7XG4gICAgY29uc3Qgc2Vjb25kUGFydFNhbXBsZXMgPSBzYW1wbGVzLnNsaWNlKGNoYW5nZUlkeCk7XG4gICAgY29uc3QgZmlyc3RTYW1wbGUgPSBzYW1wbGVzWzBdXG5cbiAgICBjb25zdCBjaGFuZ2VTYW1wbGUgPSBzZWNvbmRQYXJ0U2FtcGxlc1swXVxuICAgIGNvbnN0IGZpcnN0UGFydER1cmF0aW9uID0gY2hhbmdlU2FtcGxlLmR0cyAtIGZpcnN0U2FtcGxlLmR0c1xuICAgIGNvbnN0IHN0cmVhbUNoYW5nZVN0YXJ0ID0gZmlyc3RTYW1wbGUub3B0aW9ucyAmJiBmaXJzdFNhbXBsZS5vcHRpb25zLnN0YXJ0ICsgZmlyc3RQYXJ0RHVyYXRpb24gPyBmaXJzdFNhbXBsZS5vcHRpb25zLnN0YXJ0IDogbnVsbFxuXG4gICAgdGhpcy52aWRlb1RyYWNrLnNhbXBsZXMgPSBzYW1wbGVzLnNsaWNlKDAsIGNoYW5nZUlkeCk7XG5cbiAgICB0aGlzLmRvRml4VmlkZW8oZmFsc2UpO1xuXG4gICAgdGhpcy52aWRlb1RyYWNrLnNhbXBsZXMgPSBzYW1wbGVzLnNsaWNlKGNoYW5nZUlkeCk7XG5cbiAgICB0aGlzLmRvRml4VmlkZW8oZmFsc2UsIHN0cmVhbUNoYW5nZVN0YXJ0KTtcblxuICAgIHRoaXMudmlkZW9UcmFjay5zYW1wbGVzID0gZmlyc3RQYXJ0U2FtcGxlcy5jb25jYXQoc2Vjb25kUGFydFNhbXBsZXMpXG4gIH1cblxuICBmaXhDaGFuZ2VTdHJlYW1BdWRpbyAoY2hhbmdlSWR4KSB7XG4gICAgY29uc3QgeyBzYW1wbGVzLCBtZXRhIH0gPSB0aGlzLmF1ZGlvVHJhY2s7XG5cbiAgICBjb25zdCBwcmV2RHRzID0gY2hhbmdlSWR4ID09PSAwID8gdGhpcy5nZXRTdHJlYW1DaGFuZ2VTdGFydChzYW1wbGVzWzBdKSA6IHNhbXBsZXNbY2hhbmdlSWR4IC0gMV0uZHRzO1xuICAgIGNvbnN0IGN1ckR0cyA9IHNhbXBsZXNbY2hhbmdlSWR4XS5kdHM7XG4gICAgY29uc3QgaXNDb250aW51ZSA9IE1hdGguYWJzKHByZXZEdHMgLSBjdXJEdHMpIDw9IDIgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uO1xuXG4gICAgaWYgKGlzQ29udGludWUpIHtcbiAgICAgIGlmICghc2FtcGxlc1tjaGFuZ2VJZHhdLm9wdGlvbnMpIHtcbiAgICAgICAgc2FtcGxlc1tjaGFuZ2VJZHhdLm9wdGlvbnMgPSB7XG4gICAgICAgICAgaXNDb250aW51ZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzYW1wbGVzW2NoYW5nZUlkeF0ub3B0aW9ucy5pc0NvbnRpbnVlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmRvRml4QXVkaW8oZmFsc2UpXG4gICAgfVxuXG4gICAgY29uc3QgZmlyc3RQYXJ0U2FtcGxlcyA9IHNhbXBsZXMuc2xpY2UoMCwgY2hhbmdlSWR4KTtcbiAgICBjb25zdCBzZWNvbmRQYXJ0U2FtcGxlcyA9IHNhbXBsZXMuc2xpY2UoY2hhbmdlSWR4KTtcbiAgICBjb25zdCBmaXJzdFNhbXBsZSA9IHNhbXBsZXNbMF1cblxuICAgIGNvbnN0IGNoYW5nZVNhbXBsZSA9IHNlY29uZFBhcnRTYW1wbGVzWzBdXG4gICAgY29uc3QgZmlyc3RQYXJ0RHVyYXRpb24gPSBjaGFuZ2VTYW1wbGUuZHRzIC0gZmlyc3RTYW1wbGUuZHRzXG4gICAgY29uc3Qgc3RyZWFtQ2hhbmdlU3RhcnQgPSBmaXJzdFNhbXBsZS5vcHRpb25zICYmIGZpcnN0U2FtcGxlLm9wdGlvbnMuc3RhcnQgKyBmaXJzdFBhcnREdXJhdGlvbiA/IGZpcnN0U2FtcGxlLm9wdGlvbnMuc3RhcnQgOiBudWxsXG5cbiAgICB0aGlzLmF1ZGlvVHJhY2suc2FtcGxlcyA9IGZpcnN0UGFydFNhbXBsZXM7XG5cbiAgICB0aGlzLmRvRml4QXVkaW8oZmFsc2UpO1xuXG4gICAgdGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMgPSBzZWNvbmRQYXJ0U2FtcGxlcztcblxuICAgIHRoaXMuZG9GaXhBdWRpbyhmYWxzZSwgc3RyZWFtQ2hhbmdlU3RhcnQpO1xuXG4gICAgdGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMgPSBmaXJzdFBhcnRTYW1wbGVzLmNvbmNhdChzZWNvbmRQYXJ0U2FtcGxlcylcbiAgfVxuXG4gIGdldEZpcnN0U2FtcGxlICgpIHtcbiAgICAvLyDojrflj5Z2aWRlb+WSjGF1ZGlv55qE6aaW5bin5pWw5o2uXG4gICAgbGV0IHtzYW1wbGVzOiB2aWRlb1NhbXBsZXN9ID0gdGhpcy52aWRlb1RyYWNrXG4gICAgbGV0IHtzYW1wbGVzOiBhdWRpb1NhbXBsZXN9ID0gdGhpcy5hdWRpb1RyYWNrXG5cbiAgICBsZXQgaXNGaXJzdFZpZGVvU2FtcGxlcyA9IGZhbHNlO1xuICAgIGxldCBpc0ZpcnN0QXVkaW9TYW1wbGVzID0gZmFsc2U7XG5cbiAgICBpZiAoIXRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUgJiYgdmlkZW9TYW1wbGVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5fZmlyc3RWaWRlb1NhbXBsZSA9IENvbXBhdGliaWxpdHkuZmluZEZpcnN0VmlkZW9TYW1wbGUodmlkZW9TYW1wbGVzKVxuICAgICAgaXNGaXJzdFZpZGVvU2FtcGxlcyA9IHRydWVcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2ZpcnN0QXVkaW9TYW1wbGUgJiYgYXVkaW9TYW1wbGVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5fZmlyc3RBdWRpb1NhbXBsZSA9IENvbXBhdGliaWxpdHkuZmluZEZpcnN0QXVkaW9TYW1wbGUoYXVkaW9TYW1wbGVzKSAvLyDlr7vmib5kdHPmnIDlsI/nmoTluKfkvZzkuLrpppbkuKrpn7PpopHluKdcbiAgICAgIGlzRmlyc3RBdWRpb1NhbXBsZXMgPSB0cnVlXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlzRmlyc3RWaWRlb1NhbXBsZXMsXG4gICAgICBpc0ZpcnN0QXVkaW9TYW1wbGVzXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOWcqOayoeaciXJlZlNhbXBsZUR1cmF0aW9u55qE6Zeu6aKY5rWB5Lit77yMXG4gICAqL1xuICBmaXhSZWZTYW1wbGVEdXJhdGlvbiAobWV0YSwgc2FtcGxlcykge1xuICAgIGNvbnN0IGlzVmlkZW8gPSBtZXRhLnR5cGUgPT09ICd2aWRlbydcbiAgICBjb25zdCBhbGxTYW1wbGVzQ291bnQgPSBpc1ZpZGVvID8gdGhpcy5hbGxWaWRlb1NhbXBsZXNDb3VudCA6IHRoaXMuYWxsQXVkaW9TYW1wbGVzQ291bnRcbiAgICBjb25zdCBmaXJzdER0cyA9IGlzVmlkZW8gPyB0aGlzLl9maXJzdFZpZGVvU2FtcGxlLmR0cyA6IHRoaXMuX2ZpcnN0QXVkaW9TYW1wbGUuZHRzXG4gICAgY29uc3QgZmlsbGVkU2FtcGxlc0NvdW50ID0gaXNWaWRlbyA/IHRoaXMuZmlsbGVkVmlkZW9TYW1wbGVzLmxlbmd0aCA6IHRoaXMuZmlsbGVkQXVkaW9TYW1wbGVzLmxlbmd0aFxuXG4gICAgaWYgKCFtZXRhLnJlZlNhbXBsZUR1cmF0aW9uIHx8IG1ldGEucmVmU2FtcGxlRHVyYXRpb24gPD0gMCB8fCBOdW1iZXIuaXNOYU4obWV0YS5yZWZTYW1wbGVEdXJhdGlvbikpIHtcbiAgICAgIGlmIChzYW1wbGVzLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgIGNvbnN0IGxhc3REdHMgPSBzYW1wbGVzW3NhbXBsZXMubGVuZ3RoIC0gMV0uZHRzXG5cbiAgICAgICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA9IE1hdGguZmxvb3IoKGxhc3REdHMgLSBmaXJzdER0cykgLyAoKGFsbFNhbXBsZXNDb3VudCArIGZpbGxlZFNhbXBsZXNDb3VudCkgLSAxKSk7IC8vIOWwhnJlZlNhbXBsZUR1cmF0aW9u6YeN572u5Li66K6h566X5ZCO55qE5bmz5Z2H5YC8XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSB7XG4gICAgICBpZiAoc2FtcGxlcy5sZW5ndGggPj0gNSkge1xuICAgICAgICBjb25zdCBsYXN0RHRzID0gc2FtcGxlc1tzYW1wbGVzLmxlbmd0aCAtIDFdLmR0c1xuICAgICAgICBjb25zdCBmaXJzdER0cyA9IHNhbXBsZXNbMF0uZHRzXG4gICAgICAgIGNvbnN0IGR1cmF0aW9uQXZnID0gKGxhc3REdHMgLSBmaXJzdER0cykgLyAoc2FtcGxlcy5sZW5ndGggLSAxKVxuXG4gICAgICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb24gPSBNYXRoLmZsb29yKE1hdGguYWJzKG1ldGEucmVmU2FtcGxlRHVyYXRpb24gLSBkdXJhdGlvbkF2ZykgPD0gNSA/IG1ldGEucmVmU2FtcGxlRHVyYXRpb24gOiBkdXJhdGlvbkF2Zyk7IC8vIOWwhnJlZlNhbXBsZUR1cmF0aW9u6YeN572u5Li66K6h566X5ZCO55qE5bmz5Z2H5YC8XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOiusOW9leaIquatouebruWJjeS4gOWFseaSreaUvuS6huWkmuWwkeW4p1xuICAgKi9cbiAgcmVjb3JkU2FtcGxlc0NvdW50ICgpIHtcbiAgICBjb25zdCB7IGF1ZGlvVHJhY2ssIHZpZGVvVHJhY2sgfSA9IHRoaXNcblxuICAgIHRoaXMuYWxsQXVkaW9TYW1wbGVzQ291bnQgKz0gYXVkaW9UcmFjay5zYW1wbGVzLmxlbmd0aFxuICAgIHRoaXMuYWxsVmlkZW9TYW1wbGVzQ291bnQgKz0gdmlkZW9UcmFjay5zYW1wbGVzLmxlbmd0aFxuICB9XG5cbiAgLyoqXG4gICAqIOWOu+mZpOS4jeWQiOazleeahOW4p++8iOWAkumAgOOAgemHjeWkjeW4p++8iVxuICAgKi9cbiAgcmVtb3ZlSW52YWxpZFNhbXBsZXMgKCkge1xuICAgIGNvbnN0IHsgX2ZpcnN0VmlkZW9TYW1wbGUsIF9maXJzdEF1ZGlvU2FtcGxlIH0gPSB0aGlzXG5cbiAgICB0aGlzLmF1ZGlvVHJhY2suc2FtcGxlcyA9IHRoaXMuYXVkaW9UcmFjay5zYW1wbGVzLmZpbHRlcigoc2FtcGxlKSA9PiB7XG4gICAgICByZXR1cm4gc2FtcGxlLmR0cyA+PSBfZmlyc3RBdWRpb1NhbXBsZS5kdHMgJiYgKHRoaXMubGFzdEF1ZGlvRHRzID09PSB1bmRlZmluZWQgfHwgc2FtcGxlLmR0cyA+IHRoaXMubGFzdEF1ZGlvRHRzKVxuICAgIH0pXG5cbiAgICB0aGlzLnZpZGVvVHJhY2suc2FtcGxlcyA9IHRoaXMudmlkZW9UcmFjay5zYW1wbGVzLmZpbHRlcigoc2FtcGxlKSA9PiB7XG4gICAgICByZXR1cm4gc2FtcGxlLmR0cyA+PSBfZmlyc3RWaWRlb1NhbXBsZS5kdHMgJiYgKHRoaXMubGFzdFZpZGVvRHRzID09PSB1bmRlZmluZWQgfHwgc2FtcGxlLmR0cyA+IHRoaXMubGFzdFZpZGVvRHRzKVxuICAgIH0pXG4gIH1cblxuICBnZXRTdHJlYW1DaGFuZ2VTdGFydCAoc2FtcGxlKSB7XG4gICAgaWYgKHNhbXBsZS5vcHRpb25zICYmIHNhbXBsZS5vcHRpb25zLnN0YXJ0KSB7XG4gICAgICByZXR1cm4gc2FtcGxlLm9wdGlvbnMuc3RhcnQgLSB0aGlzLmR0c0Jhc2U7XG4gICAgfVxuICAgIHJldHVybiBJbmZpbml0eVxuICB9XG5cbiAgc3RhdGljIHNvcnRBdWRpb1NhbXBsZXMgKHNhbXBsZXMpIHtcbiAgICBpZiAoc2FtcGxlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBzYW1wbGVzXG4gICAgfVxuXG4gICAgcmV0dXJuIHNhbXBsZXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgcmV0dXJuIGEuZHRzIC0gYi5kdHNcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIOWvu+aJvmR0c+acgOWwj+eahHNhbXBsZVxuICAgKiBAcGFyYW0gc2FtcGxlc1xuICAgKi9cbiAgc3RhdGljIGZpbmRGaXJzdEF1ZGlvU2FtcGxlIChzYW1wbGVzKSB7XG4gICAgaWYgKCFzYW1wbGVzIHx8IHNhbXBsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIHJldHVybiBDb21wYXRpYmlsaXR5LnNvcnRBdWRpb1NhbXBsZXMoc2FtcGxlcylbMF1cbiAgfVxuXG4gIHN0YXRpYyBmaW5kRmlyc3RWaWRlb1NhbXBsZSAoc2FtcGxlcykge1xuICAgIGlmICghc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgY29uc3Qgc29ydGVkID0gc2FtcGxlcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICByZXR1cm4gYS5kdHMgLSBiLmR0cztcbiAgICB9KVxuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNvcnRlZC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKHNvcnRlZFtpXS5pc0tleWZyYW1lKSB7XG4gICAgICAgIHJldHVybiBzb3J0ZWRbaV1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZGV0ZWN0TGFyZ2VHYXAgKG5leHREdHMsIGZpcnN0U2FtcGxlKSB7XG4gICAgaWYgKG5leHREdHMgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY3VyRHRzID0gZmlyc3RTYW1wbGUuZHRzIHx8IDBcbiAgICBjb25zdCBjb25kMSA9IG5leHREdHMgLSBjdXJEdHMgPj0gMTAwMCB8fCBjdXJEdHMgLSBuZXh0RHRzID49IDEwMDAgLy8gZml4IGhsc+a1geWHuueOsOWkp+mHj+a1gWR0c+mXtOi3nemXrumimFxuICAgIGNvbnN0IGNvbmQyID0gZmlyc3RTYW1wbGUub3B0aW9ucyAmJiBmaXJzdFNhbXBsZS5vcHRpb25zLmRpc2NvbnRpbnVlXG5cbiAgICByZXR1cm4gY29uZDEgfHwgY29uZDJcbiAgfVxuXG4gIHN0YXRpYyBkb0ZpeExhcmdlR2FwIChzYW1wbGVzLCBnYXApIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc2FtcGxlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3Qgc2FtcGxlID0gc2FtcGxlc1tpXTtcbiAgICAgIHNhbXBsZS5kdHMgKz0gZ2FwXG4gICAgICBpZiAoc2FtcGxlLnB0cykge1xuICAgICAgICBzYW1wbGUucHRzICs9IGdhcFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDkuK3pgJTmjaLmtYFcbiAgICovXG4gIHN0YXRpYyBkZXRhY3RDaGFuZ2VTdHJlYW0gKHNhbXBsZXMpIHtcbiAgICBsZXQgY2hhbmdlZCA9IGZhbHNlO1xuICAgIGxldCBjaGFuZ2VkSWR4ID0gLTE7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNhbXBsZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChzYW1wbGVzW2ldLm9wdGlvbnMgJiYgc2FtcGxlc1tpXS5vcHRpb25zLm1ldGEpIHtcbiAgICAgICAgY2hhbmdlZCA9IHRydWVcbiAgICAgICAgY2hhbmdlZElkeCA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBjaGFuZ2VkLFxuICAgICAgY2hhbmdlZElkeFxuICAgIH1cbiAgfVxuXG4gIGdldCB0cmFja3MgKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKVxuICB9XG5cbiAgZ2V0IGF1ZGlvVHJhY2sgKCkge1xuICAgIGlmICh0aGlzLnRyYWNrcykge1xuICAgICAgcmV0dXJuIHRoaXMudHJhY2tzLmF1ZGlvVHJhY2tcbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIGdldCB2aWRlb1RyYWNrICgpIHtcbiAgICBpZiAodGhpcy50cmFja3MpIHtcbiAgICAgIHJldHVybiB0aGlzLnRyYWNrcy52aWRlb1RyYWNrXG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBnZXQgZHRzQmFzZSAoKSB7XG4gICAgY29uc3QgcmVtdXhlciA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ01QNF9SRU1VWEVSJyk7XG4gICAgaWYgKHJlbXV4ZXIpIHtcbiAgICAgIHJldHVybiByZW11eGVyLl9kdHNCYXNlXG4gICAgfVxuICAgIHJldHVybiAwXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IENvbXBhdGliaWxpdHk7XG4iLCJjbGFzcyBHb2xvbWIge1xuICBjb25zdHJ1Y3RvciAodWludDhhcnJheSkge1xuICAgIHRoaXMuVEFHID0gJ0dvbG9tYidcbiAgICB0aGlzLl9idWZmZXIgPSB1aW50OGFycmF5XG4gICAgdGhpcy5fYnVmZmVySW5kZXggPSAwXG4gICAgdGhpcy5fdG90YWxCeXRlcyA9IHVpbnQ4YXJyYXkuYnl0ZUxlbmd0aFxuICAgIHRoaXMuX3RvdGFsQml0cyA9IHVpbnQ4YXJyYXkuYnl0ZUxlbmd0aCAqIDhcbiAgICB0aGlzLl9jdXJyZW50V29yZCA9IDBcbiAgICB0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0ID0gMFxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5fYnVmZmVyID0gbnVsbFxuICB9XG5cbiAgX2ZpbGxDdXJyZW50V29yZCAoKSB7XG4gICAgbGV0IGJ1ZmZlckJ5dGVzTGVmdCA9IHRoaXMuX3RvdGFsQnl0ZXMgLSB0aGlzLl9idWZmZXJJbmRleFxuICAgIGlmIChidWZmZXJCeXRlc0xlZnQgPD0gMCkge1xuICAgICAgLy8gVE9ETyDlvILluLjlpITnkIZcbiAgICB9XG5cbiAgICBsZXQgYnl0ZXNSZWFkID0gTWF0aC5taW4oNCwgYnVmZmVyQnl0ZXNMZWZ0KVxuICAgIGxldCB3b3JkID0gbmV3IFVpbnQ4QXJyYXkoNClcbiAgICB3b3JkLnNldCh0aGlzLl9idWZmZXIuc3ViYXJyYXkodGhpcy5fYnVmZmVySW5kZXgsIHRoaXMuX2J1ZmZlckluZGV4ICsgYnl0ZXNSZWFkKSlcbiAgICB0aGlzLl9jdXJyZW50V29yZCA9IG5ldyBEYXRhVmlldyh3b3JkLmJ1ZmZlcikuZ2V0VWludDMyKDApXG5cbiAgICB0aGlzLl9idWZmZXJJbmRleCArPSBieXRlc1JlYWRcbiAgICB0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0ID0gYnl0ZXNSZWFkICogOFxuICB9XG5cbiAgcmVhZEJpdHMgKHNpemUpIHtcbiAgICBsZXQgYml0cyA9IE1hdGgubWluKHRoaXMuX2N1cnJlbnRXb3JkQml0c0xlZnQsIHNpemUpOy8vIDp1aW50XG4gICAgbGV0IHZhbHUgPSB0aGlzLl9jdXJyZW50V29yZCA+Pj4gKDMyIC0gYml0cyk7XG4gICAgaWYgKHNpemUgPiAzMikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgcmVhZCBtb3JlIHRoYW4gMzIgYml0cyBhdCBhIHRpbWUnKTtcbiAgICB9XG4gICAgdGhpcy5fY3VycmVudFdvcmRCaXRzTGVmdCAtPSBiaXRzO1xuICAgIGlmICh0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0ID4gMCkge1xuICAgICAgdGhpcy5fY3VycmVudFdvcmQgPDw9IGJpdHM7XG4gICAgfSBlbHNlIGlmICh0aGlzLl90b3RhbEJ5dGVzIC0gdGhpcy5fYnVmZmVySW5kZXggPiAwKSB7XG4gICAgICB0aGlzLl9maWxsQ3VycmVudFdvcmQoKTtcbiAgICB9XG5cbiAgICBiaXRzID0gc2l6ZSAtIGJpdHM7XG4gICAgaWYgKGJpdHMgPiAwICYmIHRoaXMuX2N1cnJlbnRXb3JkQml0c0xlZnQpIHtcbiAgICAgIHJldHVybiB2YWx1IDw8IGJpdHMgfCB0aGlzLnJlYWRCaXRzKGJpdHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdmFsdTtcbiAgICB9XG4gIH1cblxuICByZWFkQm9vbCAoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVhZEJpdHMoMSkgPT09IDFcbiAgfVxuXG4gIHJlYWRCeXRlICgpIHtcbiAgICByZXR1cm4gdGhpcy5yZWFkQml0cyg4KVxuICB9XG5cbiAgX3NraXBMZWFkaW5nWmVybyAoKSB7XG4gICAgbGV0IHplcm9Db3VudFxuICAgIGZvciAoemVyb0NvdW50ID0gMDsgemVyb0NvdW50IDwgdGhpcy5fY3VycmVudFdvcmRCaXRzTGVmdDsgemVyb0NvdW50KyspIHtcbiAgICAgIGlmICgodGhpcy5fY3VycmVudFdvcmQgJiAoMHg4MDAwMDAwMCA+Pj4gemVyb0NvdW50KSkgIT09IDApIHtcbiAgICAgICAgdGhpcy5fY3VycmVudFdvcmQgPDw9IHplcm9Db3VudFxuICAgICAgICB0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0IC09IHplcm9Db3VudFxuICAgICAgICByZXR1cm4gemVyb0NvdW50XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2ZpbGxDdXJyZW50V29yZCgpXG4gICAgcmV0dXJuIHplcm9Db3VudCArIHRoaXMuX3NraXBMZWFkaW5nWmVybygpXG4gIH1cblxuICByZWFkVUVHICgpIHsgLy8gdW5zaWduZWQgZXhwb25lbnRpYWwgZ29sb21iXG4gICAgbGV0IGxlYWRpbmdaZXJvcyA9IHRoaXMuX3NraXBMZWFkaW5nWmVybygpXG4gICAgcmV0dXJuIHRoaXMucmVhZEJpdHMobGVhZGluZ1plcm9zICsgMSkgLSAxXG4gIH1cblxuICByZWFkU0VHICgpIHsgLy8gc2lnbmVkIGV4cG9uZW50aWFsIGdvbG9tYlxuICAgIGxldCB2YWx1ZSA9IHRoaXMucmVhZFVFRygpXG4gICAgaWYgKHZhbHVlICYgMHgwMSkge1xuICAgICAgcmV0dXJuICh2YWx1ZSArIDEpID4+PiAxXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAtMSAqICh2YWx1ZSA+Pj4gMSlcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR29sb21iXG4iLCJpbXBvcnQgU3BzUGFyc2VyIGZyb20gJy4vc3BzJztcbmNsYXNzIE5hbHVuaXQge1xuICBzdGF0aWMgZ2V0TmFsdW5pdHMgKGJ1ZmZlcikge1xuICAgIGlmIChidWZmZXIubGVuZ3RoIC0gYnVmZmVyLnBvc2l0aW9uIDwgNCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGxldCBidWYgPSBidWZmZXIuZGF0YXZpZXc7XG4gICAgbGV0IHBvc2l0aW9uID0gYnVmZmVyLnBvc2l0aW9uO1xuICAgIGlmIChidWYuZ2V0SW50MzIocG9zaXRpb24pID09PSAxIHx8XG4gICAgKGJ1Zi5nZXRJbnQxNihwb3NpdGlvbikgPT09IDAgJiYgYnVmLmdldEludDgocG9zaXRpb24gKyAyKSA9PT0gMSkpIHtcbiAgICAgIHJldHVybiBOYWx1bml0LmdldEFubmV4Yk5hbHMoYnVmZmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE5hbHVuaXQuZ2V0QXZjY05hbHMoYnVmZmVyKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0QW5uZXhiTmFscyAoYnVmZmVyKSB7XG4gICAgbGV0IG5hbHMgPSBbXTtcbiAgICBsZXQgcG9zaXRpb24gPSBOYWx1bml0LmdldEhlYWRlclBvc2l0aW9uQW5uZXhCKGJ1ZmZlcik7XG4gICAgbGV0IHN0YXJ0ID0gcG9zaXRpb24ucG9zO1xuICAgIGxldCBlbmQgPSBzdGFydDtcbiAgICB3aGlsZSAoc3RhcnQgPCBidWZmZXIubGVuZ3RoIC0gNCkge1xuICAgICAgbGV0IGhlYWRlciA9IGJ1ZmZlci5idWZmZXIuc2xpY2Uoc3RhcnQsIHN0YXJ0ICsgcG9zaXRpb24uaGVhZGVyTGVuZ3RoKTtcbiAgICAgIGlmIChwb3NpdGlvbi5wb3MgPT09IGJ1ZmZlci5wb3NpdGlvbikge1xuICAgICAgICBidWZmZXIuc2tpcChwb3NpdGlvbi5oZWFkZXJMZW5ndGgpO1xuICAgICAgfVxuICAgICAgcG9zaXRpb24gPSBOYWx1bml0LmdldEhlYWRlclBvc2l0aW9uQW5uZXhCKGJ1ZmZlcik7XG4gICAgICBlbmQgPSBwb3NpdGlvbi5wb3M7XG4gICAgICBsZXQgYm9keSA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlci5idWZmZXIuc2xpY2Uoc3RhcnQgKyBoZWFkZXIuYnl0ZUxlbmd0aCwgZW5kKSk7XG4gICAgICBsZXQgdW5pdCA9IHtoZWFkZXIsIGJvZHl9O1xuICAgICAgTmFsdW5pdC5hbmFseXNlTmFsKHVuaXQpO1xuICAgICAgbmFscy5wdXNoKHVuaXQpO1xuICAgICAgYnVmZmVyLnNraXAoZW5kIC0gYnVmZmVyLnBvc2l0aW9uKTtcbiAgICAgIHN0YXJ0ID0gZW5kO1xuICAgIH1cbiAgICByZXR1cm4gbmFscztcbiAgfVxuXG4gIHN0YXRpYyBnZXRBdmNjTmFscyAoYnVmZmVyKSB7XG4gICAgbGV0IG5hbHMgPSBbXTtcbiAgICB3aGlsZSAoYnVmZmVyLnBvc2l0aW9uIDwgYnVmZmVyLmxlbmd0aCAtIDQpIHtcbiAgICAgIGxldCBsZW5ndGggPSBidWZmZXIuZGF0YXZpZXcuZ2V0SW50MzIoYnVmZmVyLnBvc2l0aW9uKTtcbiAgICAgIGlmIChidWZmZXIubGVuZ3RoIC0gYnVmZmVyLnBvc2l0aW9uID49IGxlbmd0aCkge1xuICAgICAgICBsZXQgaGVhZGVyID0gYnVmZmVyLmJ1ZmZlci5zbGljZShidWZmZXIucG9zaXRpb24sIGJ1ZmZlci5wb3NpdGlvbiArIDQpO1xuICAgICAgICBidWZmZXIuc2tpcCg0KVxuICAgICAgICBsZXQgYm9keSA9IGJ1ZmZlci5idWZmZXIuc2xpY2UoYnVmZmVyLnBvc2l0aW9uLCBidWZmZXIucG9zaXRpb24gKyBsZW5ndGgpO1xuICAgICAgICBidWZmZXIuc2tpcChsZW5ndGgpO1xuICAgICAgICBsZXQgdW5pdCA9IHtoZWFkZXIsIGJvZHl9O1xuICAgICAgICBOYWx1bml0LmFuYWx5c2VOYWwodW5pdCk7XG4gICAgICAgIG5hbHMucHVzaCh1bml0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmFscztcbiAgfVxuXG4gIHN0YXRpYyBhbmFseXNlTmFsICh1bml0KSB7XG4gICAgbGV0IHR5cGUgPSB1bml0LmJvZHlbMF0gJiAweDFmO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICAvLyBORFJcbiAgICAgICAgdW5pdC5uZHIgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNTpcbiAgICAgICAgLy8gSURSXG4gICAgICAgIHVuaXQuaWRyID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDY6XG4gICAgICAgIC8vIFNFSVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNzpcbiAgICAgICAgLy8gU1BTXG4gICAgICAgIHVuaXQuc3BzID0gU3BzUGFyc2VyLnBhcnNlU1BTKHVuaXQuYm9keSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA4OlxuICAgICAgICAvLyBQUFNcbiAgICAgICAgdW5pdC5wcHMgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgOTpcbiAgICAgICAgLy8gQVVEXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldEhlYWRlclBvc2l0aW9uQW5uZXhCIChidWZmZXIpIHtcbiAgICAvLyBzZXBlcmF0ZVxuICAgIGxldCBwb3MgPSBidWZmZXIucG9zaXRpb247XG4gICAgbGV0IGhlYWRlckxlbmd0aCA9IDA7XG4gICAgd2hpbGUgKGhlYWRlckxlbmd0aCAhPT0gMyAmJiBoZWFkZXJMZW5ndGggIT09IDQgJiYgcG9zIDwgYnVmZmVyLmxlbmd0aCAtIDQpIHtcbiAgICAgIGlmIChidWZmZXIuZGF0YXZpZXcuZ2V0SW50MTYocG9zKSA9PT0gMCkge1xuICAgICAgICBpZiAoYnVmZmVyLmRhdGF2aWV3LmdldEludDE2KHBvcyArIDIpID09PSAxKSB7XG4gICAgICAgICAgLy8gMHgwMDAwMDFcbiAgICAgICAgICBoZWFkZXJMZW5ndGggPSA0O1xuICAgICAgICB9IGVsc2UgaWYgKGJ1ZmZlci5kYXRhdmlldy5nZXRJbnQ4KHBvcyArIDIpID09PSAxKSB7XG4gICAgICAgICAgaGVhZGVyTGVuZ3RoID0gMztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwb3MrKztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcG9zKys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBvcyA9PT0gYnVmZmVyLmxlbmd0aCAtIDQpIHtcbiAgICAgIGlmIChidWZmZXIuZGF0YXZpZXcuZ2V0SW50MTYocG9zKSA9PT0gMCkge1xuICAgICAgICBpZiAoYnVmZmVyLmRhdGF2aWV3LmdldEludDE2KHBvcyArIDIpID09PSAxKSB7XG4gICAgICAgICAgLy8gMHgwMDAwMDFcbiAgICAgICAgICBoZWFkZXJMZW5ndGggPSA0O1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwb3MrKztcbiAgICAgICAgaWYgKGJ1ZmZlci5kYXRhdmlldy5nZXRJbnQxNihwb3MpID09PSAwICYmIGJ1ZmZlci5kYXRhdmlldy5nZXRJbnQ4KHBvcykgPT09IDEpIHtcbiAgICAgICAgICAvLyAweDAwMDAwMDFcbiAgICAgICAgICBoZWFkZXJMZW5ndGggPSAzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBvcyA9IGJ1ZmZlci5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtwb3MsIGhlYWRlckxlbmd0aH07XG4gIH1cblxuICBzdGF0aWMgZ2V0QXZjYyAoc3BzLCBwcHMpIHtcbiAgICBsZXQgcmV0ID0gbmV3IFVpbnQ4QXJyYXkoc3BzLmJ5dGVMZW5ndGggKyBwcHMuYnl0ZUxlbmd0aCArIDExKTtcbiAgICByZXRbMF0gPSAweDAxO1xuICAgIHJldFsxXSA9IHNwc1sxXTtcbiAgICByZXRbMl0gPSBzcHNbMl07XG4gICAgcmV0WzNdID0gc3BzWzNdO1xuICAgIHJldFs0XSA9IDI1NTtcbiAgICByZXRbNV0gPSAyMjU7XG5cbiAgICBsZXQgb2Zmc2V0ID0gNjtcblxuICAgIHJldC5zZXQobmV3IFVpbnQ4QXJyYXkoWyhzcHMuYnl0ZUxlbmd0aCA+Pj4gOCkgJiAweGZmLCBzcHMuYnl0ZUxlbmd0aCAmIDB4ZmZdKSwgb2Zmc2V0KTtcbiAgICBvZmZzZXQgKz0gMjtcbiAgICByZXQuc2V0KHNwcywgb2Zmc2V0KTtcbiAgICBvZmZzZXQgKz0gc3BzLmJ5dGVMZW5ndGg7XG5cbiAgICByZXRbb2Zmc2V0XSA9IDE7XG4gICAgb2Zmc2V0Kys7XG5cbiAgICByZXQuc2V0KG5ldyBVaW50OEFycmF5KFsocHBzLmJ5dGVMZW5ndGggPj4+IDgpICYgMHhmZiwgcHBzLmJ5dGVMZW5ndGggJiAweGZmXSksIG9mZnNldCk7XG4gICAgb2Zmc2V0ICs9IDI7XG4gICAgcmV0LnNldChwcHMsIG9mZnNldCk7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBOYWx1bml0O1xuIiwiLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICAqL1xuLyogZXNsaW50LWRpc2FibGUgb25lLXZhciAgKi9cbmltcG9ydCBHb2xvbWIgZnJvbSAnLi9nb2xvbWInXG5cbmNsYXNzIFNQU1BhcnNlciB7XG4gIHN0YXRpYyBfZWJzcDJyYnNwICh1aW50OGFycmF5KSB7XG4gICAgbGV0IHNyYyA9IHVpbnQ4YXJyYXlcbiAgICBsZXQgc3JjTGVuZ3RoID0gc3JjLmJ5dGVMZW5ndGhcbiAgICBsZXQgZHN0ID0gbmV3IFVpbnQ4QXJyYXkoc3JjTGVuZ3RoKVxuICAgIGxldCBkc3RJZHggPSAwXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNyY0xlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaSA+PSAyKSB7XG4gICAgICAgIGlmIChzcmNbaV0gPT09IDB4MDMgJiYgc3JjW2kgLSAxXSA9PT0gMHgwMCAmJiBzcmNbaSAtIDJdID09PSAweDAwKSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZHN0W2RzdElkeF0gPSBzcmNbaV1cbiAgICAgIGRzdElkeCsrXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGRzdC5idWZmZXIsIDAsIGRzdElkeClcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZVNQUyAodWludDhhcnJheSkge1xuICAgIGxldCByYnNwID0gU1BTUGFyc2VyLl9lYnNwMnJic3AodWludDhhcnJheSlcbiAgICBsZXQgZ2IgPSBuZXcgR29sb21iKHJic3ApXG5cbiAgICBnYi5yZWFkQnl0ZSgpXG4gICAgbGV0IHByb2ZpbGVJZGMgPSBnYi5yZWFkQnl0ZSgpXG4gICAgZ2IucmVhZEJ5dGUoKVxuICAgIGxldCBsZXZlbElkYyA9IGdiLnJlYWRCeXRlKClcbiAgICBnYi5yZWFkVUVHKClcblxuICAgIGxldCBwcm9maWxlX3N0cmluZyA9IFNQU1BhcnNlci5nZXRQcm9maWxlU3RyaW5nKHByb2ZpbGVJZGMpXG4gICAgbGV0IGxldmVsX3N0cmluZyA9IFNQU1BhcnNlci5nZXRMZXZlbFN0cmluZyhsZXZlbElkYylcbiAgICBsZXQgY2hyb21hX2Zvcm1hdF9pZGMgPSAxXG4gICAgbGV0IGNocm9tYV9mb3JtYXQgPSA0MjBcbiAgICBsZXQgY2hyb21hX2Zvcm1hdF90YWJsZSA9IFswLCA0MjAsIDQyMiwgNDQ0XVxuICAgIGxldCBiaXRfZGVwdGggPSA4XG5cbiAgICBpZiAocHJvZmlsZUlkYyA9PT0gMTAwIHx8IHByb2ZpbGVJZGMgPT09IDExMCB8fCBwcm9maWxlSWRjID09PSAxMjIgfHxcbiAgICAgIHByb2ZpbGVJZGMgPT09IDI0NCB8fCBwcm9maWxlSWRjID09PSA0NCB8fCBwcm9maWxlSWRjID09PSA4MyB8fFxuICAgICAgcHJvZmlsZUlkYyA9PT0gODYgfHwgcHJvZmlsZUlkYyA9PT0gMTE4IHx8IHByb2ZpbGVJZGMgPT09IDEyOCB8fFxuICAgICAgcHJvZmlsZUlkYyA9PT0gMTM4IHx8IHByb2ZpbGVJZGMgPT09IDE0NCkge1xuICAgICAgY2hyb21hX2Zvcm1hdF9pZGMgPSBnYi5yZWFkVUVHKClcbiAgICAgIGlmIChjaHJvbWFfZm9ybWF0X2lkYyA9PT0gMykge1xuICAgICAgICBnYi5yZWFkQml0cygxKVxuICAgICAgfVxuICAgICAgaWYgKGNocm9tYV9mb3JtYXRfaWRjIDw9IDMpIHtcbiAgICAgICAgY2hyb21hX2Zvcm1hdCA9IGNocm9tYV9mb3JtYXRfdGFibGVbY2hyb21hX2Zvcm1hdF9pZGNdXG4gICAgICB9XG5cbiAgICAgIGJpdF9kZXB0aCA9IGdiLnJlYWRVRUcoKSArIDhcbiAgICAgIGdiLnJlYWRVRUcoKVxuICAgICAgZ2IucmVhZEJpdHMoMSlcbiAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgIGxldCBzY2FsaW5nX2xpc3RfY291bnQgPSAoY2hyb21hX2Zvcm1hdF9pZGMgIT09IDMpID8gOCA6IDEyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NhbGluZ19saXN0X2NvdW50OyBpKyspIHtcbiAgICAgICAgICBpZiAoZ2IucmVhZEJvb2woKSkge1xuICAgICAgICAgICAgaWYgKGkgPCA2KSB7XG4gICAgICAgICAgICAgIFNQU1BhcnNlci5fc2tpcFNjYWxpbmdMaXN0KGdiLCAxNilcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIFNQU1BhcnNlci5fc2tpcFNjYWxpbmdMaXN0KGdiLCA2NClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZ2IucmVhZFVFRygpXG4gICAgbGV0IHBpY19vcmRlcl9jbnRfdHlwZSA9IGdiLnJlYWRVRUcoKVxuICAgIGlmIChwaWNfb3JkZXJfY250X3R5cGUgPT09IDApIHtcbiAgICAgIGdiLnJlYWRVRUcoKVxuICAgIH0gZWxzZSBpZiAocGljX29yZGVyX2NudF90eXBlID09PSAxKSB7XG4gICAgICBnYi5yZWFkQml0cygxKVxuICAgICAgZ2IucmVhZFNFRygpXG4gICAgICBnYi5yZWFkU0VHKClcbiAgICAgIGxldCBudW1fcmVmX2ZyYW1lc19pbl9waWNfb3JkZXJfY250X2N5Y2xlID0gZ2IucmVhZFVFRygpXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bV9yZWZfZnJhbWVzX2luX3BpY19vcmRlcl9jbnRfY3ljbGU7IGkrKykge1xuICAgICAgICBnYi5yZWFkU0VHKClcbiAgICAgIH1cbiAgICB9XG4gICAgZ2IucmVhZFVFRygpXG4gICAgZ2IucmVhZEJpdHMoMSlcblxuICAgIGxldCBwaWNfd2lkdGhfaW5fbWJzX21pbnVzMSA9IGdiLnJlYWRVRUcoKVxuICAgIGxldCBwaWNfaGVpZ2h0X2luX21hcF91bml0c19taW51czEgPSBnYi5yZWFkVUVHKClcblxuICAgIGxldCBmcmFtZV9tYnNfb25seV9mbGFnID0gZ2IucmVhZEJpdHMoMSlcbiAgICBpZiAoZnJhbWVfbWJzX29ubHlfZmxhZyA9PT0gMCkge1xuICAgICAgZ2IucmVhZEJpdHMoMSlcbiAgICB9XG4gICAgZ2IucmVhZEJpdHMoMSlcblxuICAgIGxldCBmcmFtZV9jcm9wX2xlZnRfb2Zmc2V0ID0gMFxuICAgIGxldCBmcmFtZV9jcm9wX3JpZ2h0X29mZnNldCA9IDBcbiAgICBsZXQgZnJhbWVfY3JvcF90b3Bfb2Zmc2V0ID0gMFxuICAgIGxldCBmcmFtZV9jcm9wX2JvdHRvbV9vZmZzZXQgPSAwXG5cbiAgICBsZXQgZnJhbWVfY3JvcHBpbmdfZmxhZyA9IGdiLnJlYWRCb29sKClcbiAgICBpZiAoZnJhbWVfY3JvcHBpbmdfZmxhZykge1xuICAgICAgZnJhbWVfY3JvcF9sZWZ0X29mZnNldCA9IGdiLnJlYWRVRUcoKVxuICAgICAgZnJhbWVfY3JvcF9yaWdodF9vZmZzZXQgPSBnYi5yZWFkVUVHKClcbiAgICAgIGZyYW1lX2Nyb3BfdG9wX29mZnNldCA9IGdiLnJlYWRVRUcoKVxuICAgICAgZnJhbWVfY3JvcF9ib3R0b21fb2Zmc2V0ID0gZ2IucmVhZFVFRygpXG4gICAgfVxuXG4gICAgbGV0IHBhcl93aWR0aCA9IDEsIHBhcl9oZWlnaHQgPSAxXG4gICAgbGV0IGZwcyA9IDAsIGZwc19maXhlZCA9IHRydWUsIGZwc19udW0gPSAwLCBmcHNfZGVuID0gMFxuXG4gICAgbGV0IHZ1aV9wYXJhbWV0ZXJzX3ByZXNlbnRfZmxhZyA9IGdiLnJlYWRCb29sKClcbiAgICBpZiAodnVpX3BhcmFtZXRlcnNfcHJlc2VudF9mbGFnKSB7XG4gICAgICBpZiAoZ2IucmVhZEJvb2woKSkgeyAvLyBhc3BlY3RfcmF0aW9faW5mb19wcmVzZW50X2ZsYWdcbiAgICAgICAgbGV0IGFzcGVjdF9yYXRpb19pZGMgPSBnYi5yZWFkQnl0ZSgpXG4gICAgICAgIGxldCBwYXJfd190YWJsZSA9IFsxLCAxMiwgMTAsIDE2LCA0MCwgMjQsIDIwLCAzMiwgODAsIDE4LCAxNSwgNjQsIDE2MCwgNCwgMywgMl1cbiAgICAgICAgbGV0IHBhcl9oX3RhYmxlID0gWzEsIDExLCAxMSwgMTEsIDMzLCAxMSwgMTEsIDExLCAzMywgMTEsIDExLCAzMywgOTksIDMsIDIsIDFdXG5cbiAgICAgICAgaWYgKGFzcGVjdF9yYXRpb19pZGMgPiAwICYmIGFzcGVjdF9yYXRpb19pZGMgPCAxNikge1xuICAgICAgICAgIHBhcl93aWR0aCA9IHBhcl93X3RhYmxlW2FzcGVjdF9yYXRpb19pZGMgLSAxXVxuICAgICAgICAgIHBhcl9oZWlnaHQgPSBwYXJfaF90YWJsZVthc3BlY3RfcmF0aW9faWRjIC0gMV1cbiAgICAgICAgfSBlbHNlIGlmIChhc3BlY3RfcmF0aW9faWRjID09PSAyNTUpIHtcbiAgICAgICAgICBwYXJfd2lkdGggPSBnYi5yZWFkQnl0ZSgpIDw8IDggfCBnYi5yZWFkQnl0ZSgpXG4gICAgICAgICAgcGFyX2hlaWdodCA9IGdiLnJlYWRCeXRlKCkgPDwgOCB8IGdiLnJlYWRCeXRlKClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZ2IucmVhZEJvb2woKSkge1xuICAgICAgICBnYi5yZWFkQm9vbCgpXG4gICAgICB9XG4gICAgICBpZiAoZ2IucmVhZEJvb2woKSkge1xuICAgICAgICBnYi5yZWFkQml0cyg0KVxuICAgICAgICBpZiAoZ2IucmVhZEJvb2woKSkge1xuICAgICAgICAgIGdiLnJlYWRCaXRzKDI0KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZ2IucmVhZEJvb2woKSkge1xuICAgICAgICBnYi5yZWFkVUVHKClcbiAgICAgICAgZ2IucmVhZFVFRygpXG4gICAgICB9XG4gICAgICBpZiAoZ2IucmVhZEJvb2woKSkge1xuICAgICAgICBsZXQgbnVtX3VuaXRzX2luX3RpY2sgPSBnYi5yZWFkQml0cygzMilcbiAgICAgICAgbGV0IHRpbWVfc2NhbGUgPSBnYi5yZWFkQml0cygzMilcbiAgICAgICAgZnBzX2ZpeGVkID0gZ2IucmVhZEJvb2woKVxuXG4gICAgICAgIGZwc19udW0gPSB0aW1lX3NjYWxlXG4gICAgICAgIGZwc19kZW4gPSBudW1fdW5pdHNfaW5fdGljayAqIDJcbiAgICAgICAgZnBzID0gZnBzX251bSAvIGZwc19kZW5cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcGFyU2NhbGUgPSAxXG4gICAgaWYgKHBhcl93aWR0aCAhPT0gMSB8fCBwYXJfaGVpZ2h0ICE9PSAxKSB7XG4gICAgICBwYXJTY2FsZSA9IHBhcl93aWR0aCAvIHBhcl9oZWlnaHRcbiAgICB9XG5cbiAgICBsZXQgY3JvcF91bml0X3ggPSAwLCBjcm9wX3VuaXRfeSA9IDBcbiAgICBpZiAoY2hyb21hX2Zvcm1hdF9pZGMgPT09IDApIHtcbiAgICAgIGNyb3BfdW5pdF94ID0gMVxuICAgICAgY3JvcF91bml0X3kgPSAyIC0gZnJhbWVfbWJzX29ubHlfZmxhZ1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgc3ViX3djID0gKGNocm9tYV9mb3JtYXRfaWRjID09PSAzKSA/IDEgOiAyXG4gICAgICBsZXQgc3ViX2hjID0gKGNocm9tYV9mb3JtYXRfaWRjID09PSAxKSA/IDIgOiAxXG4gICAgICBjcm9wX3VuaXRfeCA9IHN1Yl93Y1xuICAgICAgY3JvcF91bml0X3kgPSBzdWJfaGMgKiAoMiAtIGZyYW1lX21ic19vbmx5X2ZsYWcpXG4gICAgfVxuXG4gICAgbGV0IGNvZGVjX3dpZHRoID0gKHBpY193aWR0aF9pbl9tYnNfbWludXMxICsgMSkgKiAxNlxuICAgIGxldCBjb2RlY19oZWlnaHQgPSAoMiAtIGZyYW1lX21ic19vbmx5X2ZsYWcpICogKChwaWNfaGVpZ2h0X2luX21hcF91bml0c19taW51czEgKyAxKSAqIDE2KVxuXG4gICAgY29kZWNfd2lkdGggLT0gKGZyYW1lX2Nyb3BfbGVmdF9vZmZzZXQgKyBmcmFtZV9jcm9wX3JpZ2h0X29mZnNldCkgKiBjcm9wX3VuaXRfeFxuICAgIGNvZGVjX2hlaWdodCAtPSAoZnJhbWVfY3JvcF90b3Bfb2Zmc2V0ICsgZnJhbWVfY3JvcF9ib3R0b21fb2Zmc2V0KSAqIGNyb3BfdW5pdF95XG5cbiAgICBsZXQgcHJlc2VudF93aWR0aCA9IE1hdGguY2VpbChjb2RlY193aWR0aCAqIHBhclNjYWxlKVxuXG4gICAgZ2IuZGVzdHJveSgpXG4gICAgZ2IgPSBudWxsXG5cbiAgICByZXR1cm4ge1xuICAgICAgcHJvZmlsZV9zdHJpbmc6IHByb2ZpbGVfc3RyaW5nLFxuICAgICAgbGV2ZWxfc3RyaW5nOiBsZXZlbF9zdHJpbmcsXG4gICAgICBiaXRfZGVwdGg6IGJpdF9kZXB0aCxcbiAgICAgIGNocm9tYV9mb3JtYXQ6IGNocm9tYV9mb3JtYXQsXG4gICAgICBjaHJvbWFfZm9ybWF0X3N0cmluZzogU1BTUGFyc2VyLmdldENocm9tYUZvcm1hdFN0cmluZyhjaHJvbWFfZm9ybWF0KSxcblxuICAgICAgZnJhbWVfcmF0ZToge1xuICAgICAgICBmaXhlZDogZnBzX2ZpeGVkLFxuICAgICAgICBmcHM6IGZwcyxcbiAgICAgICAgZnBzX2RlbjogZnBzX2RlbixcbiAgICAgICAgZnBzX251bTogZnBzX251bVxuICAgICAgfSxcblxuICAgICAgcGFyX3JhdGlvOiB7XG4gICAgICAgIHdpZHRoOiBwYXJfd2lkdGgsXG4gICAgICAgIGhlaWdodDogcGFyX2hlaWdodFxuICAgICAgfSxcblxuICAgICAgY29kZWNfc2l6ZToge1xuICAgICAgICB3aWR0aDogY29kZWNfd2lkdGgsXG4gICAgICAgIGhlaWdodDogY29kZWNfaGVpZ2h0XG4gICAgICB9LFxuXG4gICAgICBwcmVzZW50X3NpemU6IHtcbiAgICAgICAgd2lkdGg6IHByZXNlbnRfd2lkdGgsXG4gICAgICAgIGhlaWdodDogY29kZWNfaGVpZ2h0XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIF9za2lwU2NhbGluZ0xpc3QgKGdiLCBjb3VudCkge1xuICAgIGxldCBsYXN0X3NjYWxlID0gOCwgbmV4dF9zY2FsZSA9IDhcbiAgICBsZXQgZGVsdGFfc2NhbGUgPSAwXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICBpZiAobmV4dF9zY2FsZSAhPT0gMCkge1xuICAgICAgICBkZWx0YV9zY2FsZSA9IGdiLnJlYWRTRUcoKVxuICAgICAgICBuZXh0X3NjYWxlID0gKGxhc3Rfc2NhbGUgKyBkZWx0YV9zY2FsZSArIDI1NikgJSAyNTZcbiAgICAgIH1cbiAgICAgIGxhc3Rfc2NhbGUgPSAobmV4dF9zY2FsZSA9PT0gMCkgPyBsYXN0X3NjYWxlIDogbmV4dF9zY2FsZVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRQcm9maWxlU3RyaW5nIChwcm9maWxlSWRjKSB7XG4gICAgc3dpdGNoIChwcm9maWxlSWRjKSB7XG4gICAgICBjYXNlIDY2OlxuICAgICAgICByZXR1cm4gJ0Jhc2VsaW5lJ1xuICAgICAgY2FzZSA3NzpcbiAgICAgICAgcmV0dXJuICdNYWluJ1xuICAgICAgY2FzZSA4ODpcbiAgICAgICAgcmV0dXJuICdFeHRlbmRlZCdcbiAgICAgIGNhc2UgMTAwOlxuICAgICAgICByZXR1cm4gJ0hpZ2gnXG4gICAgICBjYXNlIDExMDpcbiAgICAgICAgcmV0dXJuICdIaWdoMTAnXG4gICAgICBjYXNlIDEyMjpcbiAgICAgICAgcmV0dXJuICdIaWdoNDIyJ1xuICAgICAgY2FzZSAyNDQ6XG4gICAgICAgIHJldHVybiAnSGlnaDQ0NCdcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnVW5rbm93bidcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0TGV2ZWxTdHJpbmcgKGxldmVsSWRjKSB7XG4gICAgcmV0dXJuIChsZXZlbElkYyAvIDEwKS50b0ZpeGVkKDEpXG4gIH1cblxuICBzdGF0aWMgZ2V0Q2hyb21hRm9ybWF0U3RyaW5nIChjaHJvbWEpIHtcbiAgICBzd2l0Y2ggKGNocm9tYSkge1xuICAgICAgY2FzZSA0MjA6XG4gICAgICAgIHJldHVybiAnNDoyOjAnXG4gICAgICBjYXNlIDQyMjpcbiAgICAgICAgcmV0dXJuICc0OjI6MidcbiAgICAgIGNhc2UgNDQ0OlxuICAgICAgICByZXR1cm4gJzQ6NDo0J1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICdVbmtub3duJ1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyB0b1ZpZGVvTWV0YSAoc3BzQ29uZmlnKSB7XG4gICAgbGV0IG1ldGEgPSB7fVxuICAgIGlmIChzcHNDb25maWcgJiYgc3BzQ29uZmlnLmNvZGVjX3NpemUpIHtcbiAgICAgIG1ldGEuY29kZWNXaWR0aCA9IHNwc0NvbmZpZy5jb2RlY19zaXplLndpZHRoXG4gICAgICBtZXRhLmNvZGVjSGVpZ2h0ID0gc3BzQ29uZmlnLmNvZGVjX3NpemUuaGVpZ2h0XG4gICAgICBtZXRhLnByZXNlbnRXaWR0aCA9IHNwc0NvbmZpZy5wcmVzZW50X3NpemUud2lkdGhcbiAgICAgIG1ldGEucHJlc2VudEhlaWdodCA9IHNwc0NvbmZpZy5wcmVzZW50X3NpemUuaGVpZ2h0XG4gICAgfVxuXG4gICAgbWV0YS5wcm9maWxlID0gc3BzQ29uZmlnLnByb2ZpbGVfc3RyaW5nXG4gICAgbWV0YS5sZXZlbCA9IHNwc0NvbmZpZy5sZXZlbF9zdHJpbmdcbiAgICBtZXRhLmJpdERlcHRoID0gc3BzQ29uZmlnLmJpdF9kZXB0aFxuICAgIG1ldGEuY2hyb21hRm9ybWF0ID0gc3BzQ29uZmlnLmNocm9tYV9mb3JtYXRcblxuICAgIG1ldGEucGFyUmF0aW8gPSB7XG4gICAgICB3aWR0aDogc3BzQ29uZmlnLnBhcl9yYXRpby53aWR0aCxcbiAgICAgIGhlaWdodDogc3BzQ29uZmlnLnBhcl9yYXRpby5oZWlnaHRcbiAgICB9XG5cbiAgICBtZXRhLmZyYW1lUmF0ZSA9IHNwc0NvbmZpZy5mcmFtZV9yYXRlXG5cbiAgICBsZXQgZnBzRGVuID0gbWV0YS5mcmFtZVJhdGUuZnBzX2RlblxuICAgIGxldCBmcHNOdW0gPSBtZXRhLmZyYW1lUmF0ZS5mcHNfbnVtXG4gICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA9IE1hdGguZmxvb3IobWV0YS50aW1lc2NhbGUgKiAoZnBzRGVuIC8gZnBzTnVtKSlcbiAgICByZXR1cm4gbWV0YTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTUFNQYXJzZXJcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBITFNcbiAgTTNVOFBhcnNlcjogcmVxdWlyZSgnLi9zcmMvaGxzL2RlbXV4ZXIvbTN1OHBhcnNlcicpLmRlZmF1bHQsXG4gIFRzRGVtdXhlcjogcmVxdWlyZSgnLi9zcmMvaGxzL2RlbXV4ZXIvdHMnKS5kZWZhdWx0LFxuICBQbGF5bGlzdDogcmVxdWlyZSgnLi9zcmMvaGxzL3BsYXlsaXN0JykuZGVmYXVsdCxcbiAgRmx2RGVtdXhlcjogcmVxdWlyZSgnLi9zcmMvZmx2L2luZGV4JykuZGVmYXVsdFxufTtcbiIsImltcG9ydCB7IGlzTGUsIFVURjggfSBmcm9tICd4Z3BsYXllci11dGlscydcblxuY29uc3QgREFUQV9UWVBFUyA9IHtcbiAgTlVNQkVSOiAwLFxuICBCT09MRUFOOiAxLFxuICBTVFJJTkc6IDIsXG4gIE9CSkVDVDogMyxcbiAgTUlYX0FSUkFZOiA4LFxuICBPQkpFQ1RfRU5EOiA5LFxuICBTVFJJQ1RfQVJSQVk6IDEwLFxuICBEQVRFOiAxMSxcbiAgTE9ORV9TVFJJTkc6IDEyXG59XG5cbi8qKlxuICogbWV0YeS/oeaBr+ino+aekFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBTUZQYXJzZXIge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5vZmZzZXQgPSAwXG4gICAgdGhpcy5yZWFkT2Zmc2V0ID0gdGhpcy5vZmZzZXRcbiAgfVxuXG4gIHJlc29sdmUgKG1ldGEsIHNpemUpIHtcbiAgICBpZiAoc2l6ZSA8IDMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm90IGVub3VnaCBkYXRhIGZvciBtZXRhaW5mbycpXG4gICAgfVxuICAgIGNvbnN0IG1ldGFEYXRhID0ge31cbiAgICBjb25zdCBuYW1lID0gdGhpcy5wYXJzZVZhbHVlKG1ldGEpXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnBhcnNlVmFsdWUobWV0YSwgc2l6ZSAtIG5hbWUuYm9keVNpemUpXG4gICAgbWV0YURhdGFbbmFtZS5kYXRhXSA9IHZhbHVlLmRhdGFcblxuICAgIHRoaXMucmVzZXRTdGF0dXMoKVxuICAgIHJldHVybiBtZXRhRGF0YVxuICB9XG5cbiAgcmVzZXRTdGF0dXMgKCkge1xuICAgIHRoaXMub2Zmc2V0ID0gMFxuICAgIHRoaXMucmVhZE9mZnNldCA9IHRoaXMub2Zmc2V0XG4gIH1cblxuICBwYXJzZVN0cmluZyAoYnVmZmVyKSB7XG4gICAgY29uc3QgZHYgPSBuZXcgRGF0YVZpZXcoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQpXG4gICAgY29uc3Qgc3RyTGVuID0gZHYuZ2V0VWludDE2KDAsICFpc0xlKVxuICAgIGxldCBzdHIgPSAnJ1xuICAgIGlmIChzdHJMZW4gPiAwKSB7XG4gICAgICBzdHIgPSBVVEY4LmRlY29kZShuZXcgVWludDhBcnJheShidWZmZXIsIHRoaXMucmVhZE9mZnNldCArIDIsIHN0ckxlbikpXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9ICcnXG4gICAgfVxuICAgIGxldCBzaXplID0gc3RyTGVuICsgMlxuICAgIHRoaXMucmVhZE9mZnNldCArPSBzaXplXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IHN0cixcbiAgICAgIGJvZHlTaXplOiBzdHJMZW4gKyAyXG4gICAgfVxuICB9XG5cbiAgcGFyc2VEYXRlIChidWZmZXIsIHNpemUpIHtcbiAgICBjb25zdCBkdiA9IG5ldyBEYXRhVmlldyhidWZmZXIsIHRoaXMucmVhZE9mZnNldCwgc2l6ZSlcbiAgICBsZXQgdHMgPSBkdi5nZXRGbG9hdDY0KDAsICFpc0xlKVxuICAgIGNvbnN0IHRpbWVPZmZzZXQgPSBkdi5nZXRJbnQxNig4LCAhaXNMZSlcbiAgICB0cyArPSB0aW1lT2Zmc2V0ICogNjAgKiAxMDAwXG5cbiAgICB0aGlzLnJlYWRPZmZzZXQgKz0gMTBcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogbmV3IERhdGUodHMpLFxuICAgICAgYm9keVNpemU6IDEwXG4gICAgfVxuICB9XG5cbiAgcGFyc2VPYmplY3QgKGJ1ZmZlciwgc2l6ZSkge1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLnBhcnNlU3RyaW5nKGJ1ZmZlciwgc2l6ZSlcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMucGFyc2VWYWx1ZShidWZmZXIsIHNpemUgLSBuYW1lLmJvZHlTaXplKVxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIG5hbWU6IG5hbWUuZGF0YSxcbiAgICAgICAgdmFsdWU6IHZhbHVlLmRhdGFcbiAgICAgIH0sXG4gICAgICBib2R5U2l6ZTogbmFtZS5ib2R5U2l6ZSArIHZhbHVlLmJvZHlTaXplLFxuICAgICAgaXNPYmpFbmQ6IHZhbHVlLmlzT2JqRW5kXG4gICAgfVxuICB9XG5cbiAgcGFyc2VMb25nU3RyaW5nIChidWZmZXIpIHtcbiAgICBjb25zdCBkdiA9IG5ldyBEYXRhVmlldyhidWZmZXIsIHRoaXMucmVhZE9mZnNldClcbiAgICBjb25zdCBzdHJMZW4gPSBkdi5nZXRVaW50MzIoMCwgIWlzTGUpXG4gICAgbGV0IHN0ciA9ICcnXG4gICAgaWYgKHN0ckxlbiA+IDApIHtcbiAgICAgIHN0ciA9IFVURjguZGVjb2RlKG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgdGhpcy5yZWFkT2Zmc2V0ICsgMiwgc3RyTGVuKSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gJydcbiAgICB9XG4gICAgLy8gY29uc3Qgc2l6ZSA9IHN0ckxlbiArIDQ7XG4gICAgdGhpcy5yZWFkT2Zmc2V0ICs9IHN0ckxlbiArIDRcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogc3RyLFxuICAgICAgYm9keVNpemU6IHN0ckxlbiArIDRcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog6Kej5p6QbWV0YeS4reeahOWPmOmHj1xuICAgKi9cbiAgcGFyc2VWYWx1ZSAoZGF0YSwgc2l6ZSkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoKVxuICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICAgIGJ1ZmZlciA9IGRhdGFcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmZmVyID0gZGF0YS5idWZmZXJcbiAgICB9XG4gICAgY29uc3Qge1xuICAgICAgTlVNQkVSLFxuICAgICAgQk9PTEVBTixcbiAgICAgIFNUUklORyxcbiAgICAgIE9CSkVDVCxcbiAgICAgIE1JWF9BUlJBWSxcbiAgICAgIE9CSkVDVF9FTkQsXG4gICAgICBTVFJJQ1RfQVJSQVksXG4gICAgICBEQVRFLFxuICAgICAgTE9ORV9TVFJJTkdcbiAgICB9ID0gREFUQV9UWVBFU1xuICAgIGNvbnN0IGRhdGFWaWV3ID0gbmV3IERhdGFWaWV3KGJ1ZmZlciwgdGhpcy5yZWFkT2Zmc2V0LCBzaXplKVxuICAgIGxldCBpc09iakVuZCA9IGZhbHNlXG4gICAgY29uc3QgdHlwZSA9IGRhdGFWaWV3LmdldFVpbnQ4KDApXG4gICAgbGV0IG9mZnNldCA9IDFcbiAgICB0aGlzLnJlYWRPZmZzZXQgKz0gMVxuICAgIGxldCB2YWx1ZSA9IG51bGxcblxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBOVU1CRVI6IHtcbiAgICAgICAgdmFsdWUgPSBkYXRhVmlldy5nZXRGbG9hdDY0KDEsICFpc0xlKVxuICAgICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gOFxuICAgICAgICBvZmZzZXQgKz0gOFxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgY2FzZSBCT09MRUFOOiB7XG4gICAgICAgIGNvbnN0IGJvb2xOdW0gPSBkYXRhVmlldy5nZXRVaW50OCgxKVxuICAgICAgICB2YWx1ZSA9ICEhYm9vbE51bVxuICAgICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gMVxuICAgICAgICBvZmZzZXQgKz0gMVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgY2FzZSBTVFJJTkc6IHtcbiAgICAgICAgY29uc3Qgc3RyID0gdGhpcy5wYXJzZVN0cmluZyhidWZmZXIpXG4gICAgICAgIHZhbHVlID0gc3RyLmRhdGFcbiAgICAgICAgb2Zmc2V0ICs9IHN0ci5ib2R5U2l6ZVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgY2FzZSBPQkpFQ1Q6IHtcbiAgICAgICAgdmFsdWUgPSB7fVxuICAgICAgICBsZXQgb2JqRW5kU2l6ZSA9IDBcbiAgICAgICAgaWYgKGRhdGFWaWV3LmdldFVpbnQzMihzaXplIC0gNCwgIWlzTGUpICYgMHgwMEZGRkZGRikge1xuICAgICAgICAgIG9iakVuZFNpemUgPSAzXG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcy5yZWFkT2Zmc2V0ICs9IG9mZnNldCAtIDE7XG4gICAgICAgIHdoaWxlIChvZmZzZXQgPCBzaXplIC0gNCkge1xuICAgICAgICAgIGNvbnN0IGFtZk9iaiA9IHRoaXMucGFyc2VPYmplY3QoYnVmZmVyLCBzaXplIC0gb2Zmc2V0IC0gb2JqRW5kU2l6ZSlcbiAgICAgICAgICBpZiAoYW1mT2JqLmlzT2JqZWN0RW5kKSB7IGJyZWFrIH1cbiAgICAgICAgICB2YWx1ZVthbWZPYmouZGF0YS5uYW1lXSA9IGFtZk9iai5kYXRhLnZhbHVlXG4gICAgICAgICAgb2Zmc2V0ICs9IGFtZk9iai5ib2R5U2l6ZVxuICAgICAgICB9XG4gICAgICAgIGlmIChvZmZzZXQgPD0gc2l6ZSAtIDMpIHtcbiAgICAgICAgICBjb25zdCBtYXJrID0gZGF0YVZpZXcuZ2V0VWludDMyKG9mZnNldCAtIDEsICFpc0xlKSAmIDB4MDBGRkZGRkZcbiAgICAgICAgICBpZiAobWFyayA9PT0gOSkge1xuICAgICAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDNcbiAgICAgICAgICAgIG9mZnNldCArPSAzXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjYXNlIE1JWF9BUlJBWToge1xuICAgICAgICB2YWx1ZSA9IHt9XG4gICAgICAgIG9mZnNldCArPSA0XG4gICAgICAgIHRoaXMucmVhZE9mZnNldCArPSA0XG4gICAgICAgIGxldCBvYmpFbmRTaXplID0gMFxuICAgICAgICBpZiAoKGRhdGFWaWV3LmdldFVpbnQzMihzaXplIC0gNCwgIWlzTGUpICYgMHgwMEZGRkZGRikgPT09IDkpIHtcbiAgICAgICAgICBvYmpFbmRTaXplID0gM1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKG9mZnNldCA8IHNpemUgLSA4KSB7XG4gICAgICAgICAgY29uc3QgYW1mVmFyID0gdGhpcy5wYXJzZU9iamVjdChidWZmZXIsIHNpemUgLSBvZmZzZXQgLSBvYmpFbmRTaXplKVxuICAgICAgICAgIGlmIChhbWZWYXIuaXNPYmplY3RFbmQpIHsgYnJlYWsgfVxuICAgICAgICAgIHZhbHVlW2FtZlZhci5kYXRhLm5hbWVdID0gYW1mVmFyLmRhdGEudmFsdWVcbiAgICAgICAgICBvZmZzZXQgKz0gYW1mVmFyLmJvZHlTaXplXG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9mZnNldCA8PSBzaXplIC0gMykge1xuICAgICAgICAgIGNvbnN0IG1hcmtlciA9IGRhdGFWaWV3LmdldFVpbnQzMihvZmZzZXQgLSAxLCAhaXNMZSkgJiAweDAwRkZGRkZGXG4gICAgICAgICAgaWYgKG1hcmtlciA9PT0gOSkge1xuICAgICAgICAgICAgb2Zmc2V0ICs9IDNcbiAgICAgICAgICAgIHRoaXMucmVhZE9mZnNldCArPSAzXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGNhc2UgT0JKRUNUX0VORDoge1xuICAgICAgICB2YWx1ZSA9IG51bGxcbiAgICAgICAgaXNPYmpFbmQgPSB0cnVlXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGNhc2UgU1RSSUNUX0FSUkFZOiB7XG4gICAgICAgIHZhbHVlID0gW11cbiAgICAgICAgY29uc3QgYXJyTGVuZ3RoID0gZGF0YVZpZXcuZ2V0VWludDMyKDEsICFpc0xlKVxuICAgICAgICBvZmZzZXQgKz0gNFxuICAgICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gNFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyckxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3Qgc2NyaXB0ID0gdGhpcy5wYXJzZVZhbHVlKGJ1ZmZlciwgc2l6ZSAtIG9mZnNldClcbiAgICAgICAgICB2YWx1ZS5wdXNoKHNjcmlwdC5kYXRhKVxuICAgICAgICAgIG9mZnNldCArPSBzY3JpcHQuYm9keVNpemVcbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBjYXNlIERBVEU6IHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IHRoaXMucGFyc2VEYXRlKGJ1ZmZlciwgc2l6ZSAtIDEpXG4gICAgICAgIHZhbHVlID0gZGF0ZS5kYXRhXG4gICAgICAgIG9mZnNldCArPSBkYXRlLmJvZHlTaXplXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGNhc2UgTE9ORV9TVFJJTkc6IHtcbiAgICAgICAgY29uc3QgbG9uZ1N0ciA9IHRoaXMucGFyc2VMb25nU3RyaW5nKGJ1ZmZlciwgc2l6ZSAtIDEpXG4gICAgICAgIHZhbHVlID0gbG9uZ1N0ci5kYXRhXG4gICAgICAgIG9mZnNldCArPSBsb25nU3RyLmJvZHlTaXplXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgb2Zmc2V0ID0gc2l6ZVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiB2YWx1ZSxcbiAgICAgIGJvZHlTaXplOiBvZmZzZXQsXG4gICAgICBpc09iakVuZDogaXNPYmpFbmRcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IEVWRU5UUywgQXVkaW9UcmFja01ldGEsIFZpZGVvVHJhY2tNZXRhIH0gZnJvbSAneGdwbGF5ZXItdXRpbHMnO1xuaW1wb3J0IHsgU3BzUGFyc2VyIH0gZnJvbSAneGdwbGF5ZXItY29kZWMnO1xuaW1wb3J0IHsgVmlkZW9UcmFjaywgQXVkaW9UcmFjayB9IGZyb20gJ3hncGxheWVyLWJ1ZmZlcidcblxuaW1wb3J0IEFNRlBhcnNlciBmcm9tICcuL2FtZi1wYXJzZXInXG5cbmNvbnN0IERFTVVYX0VWRU5UUyA9IEVWRU5UUy5ERU1VWF9FVkVOVFM7XG5cbmNsYXNzIEZsdkRlbXV4ZXIge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5fZmlyc3RGcmFnbWVudExvYWRlZCA9IGZhbHNlXG4gICAgdGhpcy5fdHJhY2tOdW0gPSAwXG4gICAgdGhpcy5faGFzU2NyaXB0ID0gZmFsc2VcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIHRoaXMub24oREVNVVhfRVZFTlRTLkRFTVVYX1NUQVJULCB0aGlzLmRvUGFyc2VGbHYuYmluZCh0aGlzKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBpZiB0aGUgZmx2IGhlYWQgaXMgdmFsaWRcbiAgICogQHBhcmFtIGRhdGFcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgaXNGbHZGaWxlIChkYXRhKSB7XG4gICAgcmV0dXJuICEoZGF0YVswXSAhPT0gMHg0NiB8fCBkYXRhWzFdICE9PSAweDRDIHx8IGRhdGFbMl0gIT09IDB4NTYgfHwgZGF0YVszXSAhPT0gMHgwMSlcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiB0aGUgc3RyZWFtIGhhcyBhdWRpbyBvciB2aWRlby5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHN0cmVhbUZsYWcgLSBEYXRhIGZyb20gdGhlIHN0cmVhbSB3aGljaCBpcyBkZWZpbmUgd2hldGhlciB0aGUgYXVkaW8gLyB2aWRlbyB0cmFjayBpcyBleGlzdC5cbiAgICovXG4gIHN0YXRpYyBnZXRQbGF5VHlwZSAoc3RyZWFtRmxhZykge1xuICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgIGhhc1ZpZGVvOiBmYWxzZSxcbiAgICAgIGhhc0F1ZGlvOiBmYWxzZVxuICAgIH1cblxuICAgIGlmIChzdHJlYW1GbGFnICYgMHgwMSA+IDApIHtcbiAgICAgIHJlc3VsdC5oYXNWaWRlbyA9IHRydWVcbiAgICB9XG5cbiAgICBpZiAoc3RyZWFtRmxhZyAmIDB4MDQgPiAwKSB7XG4gICAgICByZXN1bHQuaGFzQXVkaW8gPSB0cnVlXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgZG9QYXJzZUZsdiAoKSB7XG4gICAgaWYgKCF0aGlzLl9maXJzdEZyYWdtZW50TG9hZGVkKSB7XG4gICAgICBpZiAodGhpcy5sb2FkZXJCdWZmZXIubGVuZ3RoIDwgMTMpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBjb25zdCBoZWFkZXIgPSB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgxMylcbiAgICAgIHRoaXMucGFyc2VGbHZIZWFkZXIoaGVhZGVyKVxuICAgICAgdGhpcy5kb1BhcnNlRmx2KCkgLy8g6YCS5b2S6LCD55So77yM57un57ut6Kej5p6QZmx25rWBXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmxvYWRlckJ1ZmZlci5sZW5ndGggPCAxMSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGxldCBjaHVuaztcblxuICAgICAgbGV0IGxvb3BNYXggPSAxMDAwMDAgLy8g6Ziy5q2i5q275b6q546v5Lqn55SfXG4gICAgICBkbyB7XG4gICAgICAgIGNodW5rID0gdGhpcy5fcGFyc2VGbHZUYWcoKVxuICAgICAgfSB3aGlsZSAoY2h1bmsgJiYgbG9vcE1heC0tID4gMClcblxuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9DT01QTEVURSlcbiAgICB9XG4gIH1cblxuICBwYXJzZUZsdkhlYWRlciAoaGVhZGVyKSB7XG4gICAgaWYgKCFGbHZEZW11eGVyLmlzRmx2RmlsZShoZWFkZXIpKSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCBuZXcgRXJyb3IoJ2ludmFsaWQgZmx2IGZpbGUnKSlcbiAgICAgIHRoaXMuZG9QYXJzZUZsdigpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2ZpcnN0RnJhZ21lbnRMb2FkZWQgPSB0cnVlXG4gICAgICBjb25zdCBwbGF5VHlwZSA9IEZsdkRlbXV4ZXIuZ2V0UGxheVR5cGUoaGVhZGVyWzRdKVxuXG4gICAgICBpZiAocGxheVR5cGUuaGFzVmlkZW8pIHtcbiAgICAgICAgdGhpcy5pbml0VmlkZW9UcmFjaygpXG4gICAgICB9XG5cbiAgICAgIGlmIChwbGF5VHlwZS5oYXNBdWRpbykge1xuICAgICAgICB0aGlzLmluaXRBdWRpb1RyYWNrKClcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5kb1BhcnNlRmx2KClcbiAgfVxuXG4gIC8qKlxuICAgKiBpbml0IGRlZmF1bHQgdmlkZW8gdHJhY2sgY29uZmlnc1xuICAgKi9cbiAgaW5pdFZpZGVvVHJhY2sgKCkge1xuICAgIHRoaXMuX3RyYWNrTnVtKytcbiAgICBsZXQgdmlkZW9UcmFjayA9IG5ldyBWaWRlb1RyYWNrKClcbiAgICB2aWRlb1RyYWNrLm1ldGEgPSBuZXcgVmlkZW9UcmFja01ldGEoKVxuICAgIHZpZGVvVHJhY2suaWQgPSB2aWRlb1RyYWNrLm1ldGEuaWQgPSB0aGlzLl90cmFja051bVxuXG4gICAgdGhpcy50cmFja3MudmlkZW9UcmFjayA9IHZpZGVvVHJhY2tcbiAgfVxuXG4gIC8qKlxuICAgKiBpbml0IGRlZmF1bHQgYXVkaW8gdHJhY2sgY29uZmlnc1xuICAgKi9cbiAgaW5pdEF1ZGlvVHJhY2sgKCkge1xuICAgIHRoaXMuX3RyYWNrTnVtKytcbiAgICBsZXQgYXVkaW9UcmFjayA9IG5ldyBBdWRpb1RyYWNrKClcbiAgICBhdWRpb1RyYWNrLm1ldGEgPSBuZXcgQXVkaW9UcmFja01ldGEoKVxuICAgIGF1ZGlvVHJhY2suaWQgPSBhdWRpb1RyYWNrLm1ldGEuaWQgPSB0aGlzLl90cmFja051bVxuXG4gICAgdGhpcy50cmFja3MuYXVkaW9UcmFjayA9IGF1ZGlvVHJhY2tcbiAgfVxuXG4gIC8qKlxuICAgKiBQYWNrYWdlIHRoZSBkYXRhIGFzIHRoZSBmb2xsb3dpbmcgZGF0YSBzdHJ1Y3R1cmVcbiAgICoge1xuICAgKiAgICBkYXRhOiBVaW50OEFycmF5LiB0aGUgU3RyZWFtIGRhdGEuXG4gICAqICAgIGluZm86IFRoZSBmaXJzdCBieXRlIGluZm8gb2YgdGhlIFRhZy5cbiAgICogICAgdGFnVHlwZTogOOOAgTnjgIExOFxuICAgKiAgICB0aW1lU3RhbXA6IHRoZSB0aW1lc3RlbXBcbiAgICogfVxuICAgKi9cbiAgX3BhcnNlRmx2VGFnICgpIHtcbiAgICBpZiAodGhpcy5sb2FkZXJCdWZmZXIubGVuZ3RoIDwgMTEpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIGxldCBjaHVuayA9IHRoaXMuX3BhcnNlRmx2VGFnSGVhZGVyKClcbiAgICBpZiAoY2h1bmspIHtcbiAgICAgIHRoaXMuX3Byb2Nlc3NDaHVuayhjaHVuaylcbiAgICB9XG4gICAgcmV0dXJuIGNodW5rXG4gIH1cblxuICAvKipcbiAgICogUGFyc2UgdGhlIDExIGJ5dGUgdGFnIEhlYWRlclxuICAgKi9cbiAgX3BhcnNlRmx2VGFnSGVhZGVyICgpIHtcbiAgICBsZXQgb2Zmc2V0ID0gMFxuICAgIGxldCBjaHVuayA9IHt9XG5cbiAgICBsZXQgdGFnVHlwZSA9IHRoaXMubG9hZGVyQnVmZmVyLnRvSW50KG9mZnNldCwgMSlcbiAgICBvZmZzZXQgKz0gMVxuXG4gICAgLy8gMiBiaXQgRk1TIHJlc2VydmVkLCAxIGJpdCBmaWx0ZXJlZCwgNSBiaXQgdGFnIHR5cGVcbiAgICBjaHVuay5maWx0ZXJlZCA9ICh0YWdUeXBlICYgMzIpID4+PiA1XG4gICAgY2h1bmsudGFnVHlwZSA9IHRhZ1R5cGUgJiAzMVxuXG4gICAgLy8gMyBCeXRlIGRhdGFzaXplXG4gICAgY2h1bmsuZGF0YXNpemUgPSB0aGlzLmxvYWRlckJ1ZmZlci50b0ludChvZmZzZXQsIDMpXG4gICAgb2Zmc2V0ICs9IDNcblxuICAgIGlmICgoY2h1bmsudGFnVHlwZSAhPT0gOCAmJiBjaHVuay50YWdUeXBlICE9PSA5ICYmIGNodW5rLnRhZ1R5cGUgIT09IDExICYmIGNodW5rLnRhZ1R5cGUgIT09IDE4KSB8fFxuICAgICAgdGhpcy5sb2FkZXJCdWZmZXIudG9JbnQoOCwgMykgIT09IDApIHtcbiAgICAgIGlmICh0aGlzLmxvYWRlckJ1ZmZlciAmJiB0aGlzLmxvYWRlckJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDEpXG4gICAgICB9XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLlRBRywgbmV3IEVycm9yKCd0YWdUeXBlICcgKyBjaHVuay50YWdUeXBlKSwgZmFsc2UpXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIGlmICh0aGlzLmxvYWRlckJ1ZmZlci5sZW5ndGggPCBjaHVuay5kYXRhc2l6ZSArIDE1KSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIC8vIHJlYWQgdGhlIGRhdGEuXG4gICAgdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoNClcblxuICAgIC8vIDMgQnl0ZSB0aW1lc3RhbXBcbiAgICBsZXQgdGltZXN0YW1wID0gdGhpcy5sb2FkZXJCdWZmZXIudG9JbnQoMCwgMylcbiAgICB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgzKVxuXG4gICAgLy8gMSBCeXRlIHRpbWVzdGFtcEV4dFxuICAgIGxldCB0aW1lc3RhbXBFeHQgPSB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgxKVswXVxuICAgIGlmICh0aW1lc3RhbXBFeHQgPiAwKSB7XG4gICAgICB0aW1lc3RhbXAgKz0gdGltZXN0YW1wRXh0ICogMHgxMDAwMDAwXG4gICAgfVxuXG4gICAgY2h1bmsuZHRzID0gdGltZXN0YW1wXG5cbiAgICAvLyBzdHJlYW1JZFxuICAgIHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDMpXG4gICAgcmV0dXJuIGNodW5rXG4gIH1cblxuICBfcHJvY2Vzc0NodW5rIChjaHVuaykge1xuICAgIHN3aXRjaCAoY2h1bmsudGFnVHlwZSkge1xuICAgICAgY2FzZSAxODpcbiAgICAgICAgdGhpcy5fcGFyc2VTY3JpcHREYXRhKGNodW5rKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSA4OlxuICAgICAgICB0aGlzLl9wYXJzZUFBQ0RhdGEoY2h1bmspXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDk6XG4gICAgICAgIHRoaXMuX3BhcnNlSGV2Y0RhdGEoY2h1bmspXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDExOlxuICAgICAgICAvLyBmb3Igc29tZSBDRE4gdGhhdCBkaWQgbm90IHByb2Nlc3MgdGhlIGN1cnJlY3QgUlRNUCBtZXNzYWdlc1xuICAgICAgICB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgzKVxuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcGFyc2UgZmx2IHNjcmlwdCBkYXRhXG4gICAqIEBwYXJhbSBjaHVua1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3BhcnNlU2NyaXB0RGF0YSAoY2h1bmspIHtcbiAgICBsZXQgYXVkaW9UcmFjayA9IHRoaXMudHJhY2tzLmF1ZGlvVHJhY2tcbiAgICBsZXQgdmlkZW9UcmFjayA9IHRoaXMudHJhY2tzLnZpZGVvVHJhY2tcblxuICAgIGxldCBkYXRhID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoY2h1bmsuZGF0YXNpemUpXG5cbiAgICBjb25zdCBpbmZvID0gbmV3IEFNRlBhcnNlcigpLnJlc29sdmUoZGF0YSwgZGF0YS5sZW5ndGgpXG5cbiAgICBjb25zdCBvbk1ldGFEYXRhID0gdGhpcy5fY29udGV4dC5vbk1ldGFEYXRhID0gaW5mbyA/IGluZm8ub25NZXRhRGF0YSA6IHVuZGVmaW5lZFxuXG4gICAgLy8gZmlsbCBtZWRpYUluZm9cbiAgICB0aGlzLl9jb250ZXh0Lm1lZGlhSW5mby5kdXJhdGlvbiA9IG9uTWV0YURhdGEuZHVyYXRpb25cbiAgICB0aGlzLl9jb250ZXh0Lm1lZGlhSW5mby5oYXNWaWRlbyA9IG9uTWV0YURhdGEuaGFzVmlkZW9cbiAgICB0aGlzLl9jb250ZXh0Lm1lZGlhSW5mby5oc2FBdWRpbyA9IG9uTWV0YURhdGEuaGFzQXVkaW9cblxuICAgIGxldCB2YWxpZGF0ZSA9IHRoaXMuX2RhdGFzaXplVmFsaWRhdG9yKGNodW5rLmRhdGFzaXplKVxuICAgIGlmICh2YWxpZGF0ZSkge1xuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRURJQV9JTkZPKVxuICAgICAgdGhpcy5faGFzU2NyaXB0ID0gdHJ1ZVxuICAgIH1cblxuICAgIC8vIEVkaXQgZGVmYXVsdCBtZXRhLlxuICAgIGlmIChhdWRpb1RyYWNrICYmICFhdWRpb1RyYWNrLmhhc1NwZWNpZmljQ29uZmlnKSB7XG4gICAgICBsZXQgbWV0YSA9IGF1ZGlvVHJhY2subWV0YVxuICAgICAgaWYgKG9uTWV0YURhdGEuYXVkaW9zYW1wbGVyYXRlKSB7XG4gICAgICAgIG1ldGEuc2FtcGxlUmF0ZSA9IG9uTWV0YURhdGEuYXVkaW9zYW1wbGVyYXRlXG4gICAgICB9XG5cbiAgICAgIGlmIChvbk1ldGFEYXRhLmF1ZGlvY2hhbm5lbHMpIHtcbiAgICAgICAgbWV0YS5jaGFubmVsQ291bnQgPSBvbk1ldGFEYXRhLmF1ZGlvY2hhbm5lbHNcbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChvbk1ldGFEYXRhLmF1ZGlvc2FtcGxlcmF0ZSkge1xuICAgICAgICBjYXNlIDQ0MTAwOlxuICAgICAgICAgIG1ldGEuc2FtcGxlUmF0ZUluZGV4ID0gNFxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjIwNTA6XG4gICAgICAgICAgbWV0YS5zYW1wbGVSYXRlSW5kZXggPSA3XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAxMTAyNTpcbiAgICAgICAgICBtZXRhLnNhbXBsZVJhdGVJbmRleCA9IDEwXG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHZpZGVvVHJhY2sgJiYgIXZpZGVvVHJhY2suaGFzU3BlY2lmaWNDb25maWcpIHtcbiAgICAgIGxldCBtZXRhID0gdmlkZW9UcmFjay5tZXRhXG4gICAgICBpZiAodHlwZW9mIG9uTWV0YURhdGEuZnJhbWVyYXRlID09PSAnbnVtYmVyJykge1xuICAgICAgICBsZXQgZnBzTnVtID0gTWF0aC5mbG9vcihvbk1ldGFEYXRhLmZyYW1lcmF0ZSAqIDEwMDApXG4gICAgICAgIGlmIChmcHNOdW0gPiAwKSB7XG4gICAgICAgICAgbGV0IGZwcyA9IGZwc051bSAvIDEwMDBcbiAgICAgICAgICBpZiAoIW1ldGEuZnJhbWVSYXRlKSB7XG4gICAgICAgICAgICBtZXRhLmZyYW1lUmF0ZSA9IHt9XG4gICAgICAgICAgfVxuICAgICAgICAgIG1ldGEuZnJhbWVSYXRlLmZpeGVkID0gdHJ1ZVxuICAgICAgICAgIG1ldGEuZnJhbWVSYXRlLmZwcyA9IGZwc1xuICAgICAgICAgIG1ldGEuZnJhbWVSYXRlLmZwc19udW0gPSBmcHNOdW1cbiAgICAgICAgICBtZXRhLmZyYW1lUmF0ZS5mcHNfZGVuID0gMTAwMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2FhY1NlcXVlbmNlSGVhZGVyUGFyc2VyIChkYXRhKSB7XG4gICAgbGV0IHJldCA9IHt9XG4gICAgcmV0Lmhhc1NwZWNpZmljQ29uZmlnID0gdHJ1ZVxuICAgIHJldC5vYmplY3RUeXBlID0gZGF0YVsxXSA+Pj4gM1xuICAgIHJldC5vcmlnaW5PYmplY3RUeXBlID0gcmV0Lm9iamVjdFR5cGVcbiAgICByZXQuc2FtcGxlUmF0ZUluZGV4ID0gKChkYXRhWzFdICYgNykgPDwgMSkgfCAoZGF0YVsyXSA+Pj4gNylcbiAgICByZXQuYXVkaW9zYW1wbGVyYXRlID0gdGhpcy5fc3dpdGNoQXVkaW9TYW1wbGVSYXRlKHJldC5zYW1wbGVSYXRlSW5kZXgpXG4gICAgcmV0LmNoYW5uZWxDb3VudCA9IChkYXRhWzJdICYgMTIwKSA+Pj4gM1xuICAgIHJldC5mcmFtZUxlbmd0aCA9IChkYXRhWzJdICYgNCkgPj4+IDJcbiAgICByZXQuZGVwZW5kc09uQ29yZUNvZGVyID0gKGRhdGFbMl0gJiAyKSA+Pj4gMVxuICAgIHJldC5leHRlbnNpb25GbGFnSW5kZXggPSBkYXRhWzJdICYgMVxuXG4gICAgcmV0LmNvZGVjID0gYG1wNGEuNDAuJHtyZXQub2JqZWN0VHlwZX1gXG4gICAgbGV0IHVzZXJBZ2VudCA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgbGV0IGV4dGVuc2lvblNhbXBsaW5nSW5kZXg7XG5cbiAgICBsZXQgY29uZmlnO1xuICAgIGxldCBzYW1wbGluZ0luZGV4ID0gcmV0LnNhbXBsZVJhdGVJbmRleDtcblxuICAgIGlmICh1c2VyQWdlbnQuaW5kZXhPZignZmlyZWZveCcpICE9PSAtMSkge1xuICAgICAgLy8gZmlyZWZveDogdXNlIFNCUiAoSEUtQUFDKSBpZiBmcmVxIGxlc3MgdGhhbiAyNGtIelxuICAgICAgaWYgKHJldC5zYW1wbGVSYXRlSW5kZXggPj0gNikge1xuICAgICAgICByZXQub2JqZWN0VHlwZSA9IDU7XG4gICAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSg0KTtcbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCA9IHNhbXBsaW5nSW5kZXggLSAzO1xuICAgICAgfSBlbHNlIHsgLy8gdXNlIExDLUFBQ1xuICAgICAgICByZXQub2JqZWN0VHlwZSA9IDI7XG4gICAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSgyKTtcbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCA9IHNhbXBsaW5nSW5kZXg7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh1c2VyQWdlbnQuaW5kZXhPZignYW5kcm9pZCcpICE9PSAtMSkge1xuICAgICAgLy8gYW5kcm9pZDogYWx3YXlzIHVzZSBMQy1BQUNcbiAgICAgIHJldC5vYmplY3RUeXBlID0gMjtcbiAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSgyKTtcbiAgICAgIGV4dGVuc2lvblNhbXBsaW5nSW5kZXggPSBzYW1wbGluZ0luZGV4O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBmb3Igb3RoZXIgYnJvd3NlcnMsIGUuZy4gY2hyb21lLi4uXG4gICAgICAvLyBBbHdheXMgdXNlIEhFLUFBQyB0byBtYWtlIGl0IGVhc2llciB0byBzd2l0Y2ggYWFjIGNvZGVjIHByb2ZpbGVcbiAgICAgIHJldC5vYmplY3RUeXBlID0gNTtcbiAgICAgIGV4dGVuc2lvblNhbXBsaW5nSW5kZXggPSByZXQuc2FtcGxlUmF0ZUluZGV4O1xuICAgICAgY29uZmlnID0gbmV3IEFycmF5KDQpO1xuXG4gICAgICBpZiAocmV0LnNhbXBsZVJhdGVJbmRleCA+PSA2KSB7XG4gICAgICAgIGV4dGVuc2lvblNhbXBsaW5nSW5kZXggPSByZXQuc2FtcGxlUmF0ZUluZGV4IC0gMztcbiAgICAgIH0gZWxzZSBpZiAocmV0LmNoYW5uZWxDb3VudCA9PT0gMSkgeyAvLyBNb25vIGNoYW5uZWxcbiAgICAgICAgcmV0Lm9iamVjdFR5cGUgPSAyO1xuICAgICAgICBjb25maWcgPSBuZXcgQXJyYXkoMik7XG4gICAgICAgIGV4dGVuc2lvblNhbXBsaW5nSW5kZXggPSByZXQuc2FtcGxlUmF0ZUluZGV4O1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbmZpZ1swXSA9IHJldC5vYmplY3RUeXBlIDw8IDM7XG4gICAgY29uZmlnWzBdIHw9IChyZXQuc2FtcGxlUmF0ZUluZGV4ICYgMHgwRikgPj4+IDE7XG4gICAgY29uZmlnWzFdID0gKHJldC5zYW1wbGVSYXRlSW5kZXggJiAweDBGKSA8PCA3O1xuICAgIGNvbmZpZ1sxXSB8PSAocmV0LmNoYW5uZWxDb3VudCAmIDB4MEYpIDw8IDM7XG4gICAgaWYgKHJldC5vYmplY3RUeXBlID09PSA1KSB7XG4gICAgICBjb25maWdbMV0gfD0gKChleHRlbnNpb25TYW1wbGluZ0luZGV4ICYgMHgwRikgPj4+IDEpO1xuICAgICAgY29uZmlnWzJdID0gKGV4dGVuc2lvblNhbXBsaW5nSW5kZXggJiAweDAxKSA8PCA3O1xuICAgICAgLy8gZXh0ZW5kZWQgYXVkaW8gb2JqZWN0IHR5cGU6IGZvcmNlIHRvIDIgKExDLUFBQylcbiAgICAgIGNvbmZpZ1syXSB8PSAoMiA8PCAyKTtcbiAgICAgIGNvbmZpZ1szXSA9IDA7XG4gICAgfVxuICAgIHJldC5jb25maWcgPSBjb25maWdcbiAgICByZXR1cm4gcmV0XG4gIH1cblxuICBfcGFyc2VBQUNEYXRhIChjaHVuaykge1xuICAgIGxldCB0cmFjayA9IHRoaXMudHJhY2tzLmF1ZGlvVHJhY2tcbiAgICBpZiAoIXRyYWNrKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgbWV0YSA9IHRyYWNrLm1ldGFcblxuICAgIGlmICghbWV0YSkge1xuICAgICAgdHJhY2subWV0YSA9IG5ldyBBdWRpb1RyYWNrTWV0YSgpXG4gICAgICBtZXRhID0gdHJhY2subWV0YTtcbiAgICB9XG5cbiAgICBsZXQgaW5mbyA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDEpWzBdXG5cbiAgICBjaHVuay5kYXRhID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoY2h1bmsuZGF0YXNpemUgLSAxKVxuXG4gICAgbGV0IGZvcm1hdCA9IChpbmZvICYgMjQwKSA+Pj4gNFxuXG4gICAgdHJhY2suZm9ybWF0ID0gZm9ybWF0XG5cbiAgICBpZiAoZm9ybWF0ICE9PSAxMCkge1xuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgbmV3IEVycm9yKGBpbnZhbGlkIGF1ZGlvIGZvcm1hdDogJHtmb3JtYXR9YCkpXG4gICAgfVxuXG4gICAgaWYgKGZvcm1hdCA9PT0gMTAgJiYgIXRoaXMuX2hhc0F1ZGlvU2VxdWVuY2UpIHtcbiAgICAgIG1ldGEuc2FtcGxlUmF0ZSA9IHRoaXMuX3N3aXRjaEF1ZGlvU2FtcGxpbmdGcmVxdWVuY3koaW5mbylcbiAgICAgIG1ldGEuc2FtcGxlUmF0ZUluZGV4ID0gKGluZm8gJiAxMikgPj4+IDJcbiAgICAgIG1ldGEuZnJhbWVMZW50aCA9IChpbmZvICYgMikgPj4+IDFcbiAgICAgIG1ldGEuY2hhbm5lbENvdW50ID0gaW5mbyAmIDFcbiAgICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb24gPSBNYXRoLmZsb29yKDEwMjQgLyBtZXRhLmF1ZGlvU2FtcGxlUmF0ZSAqIG1ldGEudGltZXNjYWxlKVxuICAgIH1cblxuICAgIGxldCBhdWRpb1NhbXBsZVJhdGUgPSBtZXRhLmF1ZGlvU2FtcGxlUmF0ZVxuICAgIGxldCBhdWRpb1NhbXBsZVJhdGVJbmRleCA9IG1ldGEuc2FtcGxlUmF0ZUluZGV4XG4gICAgbGV0IHJlZlNhbXBsZUR1cmF0aW9uID0gbWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuXG4gICAgZGVsZXRlIGNodW5rLnRhZ1R5cGVcbiAgICBsZXQgdmFsaWRhdGUgPSB0aGlzLl9kYXRhc2l6ZVZhbGlkYXRvcihjaHVuay5kYXRhc2l6ZSlcblxuICAgIGlmIChjaHVuay5kYXRhWzBdID09PSAwKSB7IC8vIEFBQyBTZXF1ZW5jZSBIZWFkZXJcbiAgICAgIGxldCBhYWNIZWFkZXIgPSB0aGlzLl9hYWNTZXF1ZW5jZUhlYWRlclBhcnNlcihjaHVuay5kYXRhKVxuICAgICAgYXVkaW9TYW1wbGVSYXRlID0gYWFjSGVhZGVyLmF1ZGlvc2FtcGxlcmF0ZSB8fCBtZXRhLmF1ZGlvU2FtcGxlUmF0ZVxuICAgICAgYXVkaW9TYW1wbGVSYXRlSW5kZXggPSBhYWNIZWFkZXIuc2FtcGxlUmF0ZUluZGV4IHx8IG1ldGEuc2FtcGxlUmF0ZUluZGV4XG4gICAgICByZWZTYW1wbGVEdXJhdGlvbiA9IE1hdGguZmxvb3IoMTAyNCAvIGF1ZGlvU2FtcGxlUmF0ZSAqIG1ldGEudGltZXNjYWxlKVxuXG4gICAgICBtZXRhLmNoYW5uZWxDb3VudCA9IGFhY0hlYWRlci5jaGFubmVsQ291bnRcbiAgICAgIG1ldGEuc2FtcGxlUmF0ZSA9IGF1ZGlvU2FtcGxlUmF0ZVxuICAgICAgbWV0YS5zYW1wbGVSYXRlSW5kZXggPSBhdWRpb1NhbXBsZVJhdGVJbmRleFxuICAgICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA9IHJlZlNhbXBsZUR1cmF0aW9uXG4gICAgICBtZXRhLmR1cmF0aW9uID0gdGhpcy5fY29udGV4dC5tZWRpYUluZm8uZHVyYXRpb24gKiBtZXRhLnRpbWVzY2FsZVxuICAgICAgbWV0YS5jb25maWcgPSBhYWNIZWFkZXIuY29uZmlnXG4gICAgICBtZXRhLm9iamVjdFR5cGUgPSBhYWNIZWFkZXIub2JqZWN0VHlwZTtcbiAgICAgIG1ldGEub3JpZ2luT2JqZWN0VHlwZSA9IGFhY0hlYWRlci5vcmlnaW5PYmplY3RUeXBlO1xuXG4gICAgICBjb25zdCBhdWRpb01lZGlhID0gdGhpcy5fY29udGV4dC5tZWRpYUluZm8uYXVkaW9cblxuICAgICAgLy8gZmlsbCBhdWRpbyBtZWRpYSBpbmZvXG4gICAgICBhdWRpb01lZGlhLmNvZGVjID0gYWFjSGVhZGVyLmNvZGVjXG4gICAgICBhdWRpb01lZGlhLmNoYW5uZWxDb3VudCA9IGFhY0hlYWRlci5jaGFubmVsQ291bnRcbiAgICAgIGF1ZGlvTWVkaWEuc2FtcGxlUmF0ZSA9IGF1ZGlvU2FtcGxlUmF0ZVxuICAgICAgYXVkaW9NZWRpYS5zYW1wbGVSYXRlSW5kZXggPSBhYWNIZWFkZXIuYXVkaW9TYW1wbGVSYXRlSW5kZXhcblxuICAgICAgaWYgKHRoaXMuX2hhc1NjcmlwdCAmJiAhdGhpcy5faGFzQXVkaW9TZXF1ZW5jZSkge1xuICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgJ2F1ZGlvJylcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5faGFzU2NyaXB0ICYmIHRoaXMuX2hhc0F1ZGlvU2VxdWVuY2UpIHtcbiAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICdhdWRpbycpXG4gICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuQVVESU9fTUVUQURBVEFfQ0hBTkdFKVxuICAgICAgICAvLyB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgJ2F1ZGlvJylcbiAgICAgIH1cbiAgICAgIHRoaXMuX2hhc0F1ZGlvU2VxdWVuY2UgPSB0cnVlXG5cbiAgICAgIHRoaXMuX21ldGFDaGFuZ2UgPSB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLl9tZXRhQ2hhbmdlKSB7XG4gICAgICAgIGNodW5rLm9wdGlvbnMgPSB7XG4gICAgICAgICAgbWV0YTogdHJhY2subWV0YVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9tZXRhQ2hhbmdlID0gZmFsc2VcbiAgICAgIH1cblxuICAgICAgY2h1bmsuZGF0YSA9IGNodW5rLmRhdGEuc2xpY2UoMSwgY2h1bmsuZGF0YS5sZW5ndGgpXG4gICAgICB0cmFjay5zYW1wbGVzLnB1c2goY2h1bmspXG4gICAgfVxuICAgIGlmICghdmFsaWRhdGUpIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIHRoaXMuVEFHLCBuZXcgRXJyb3IoJ1RBRyBsZW5ndGggZXJyb3IgYXQgJyArIGNodW5rLmRhdGFzaXplKSwgZmFsc2UpXG4gICAgICAvLyB0aGlzLmxvZ2dlci53YXJuKHRoaXMuVEFHLCBlcnJvci5tZXNzYWdlKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBwYXJzZSBoZXZjL2F2YyB2aWRlbyBkYXRhXG4gICAqIEBwYXJhbSBjaHVua1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3BhcnNlSGV2Y0RhdGEgKGNodW5rKSB7XG4gICAgLy8gaGVhZGVyXG4gICAgbGV0IGluZm8gPSB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgxKVswXVxuICAgIGNodW5rLmZyYW1lVHlwZSA9IChpbmZvICYgMHhmMCkgPj4+IDRcbiAgICBjaHVuay5pc0tleWZyYW1lID0gY2h1bmsuZnJhbWVUeXBlID09PSAxXG4gICAgLy8gbGV0IHRlbXBDb2RlY0lEID0gdGhpcy50cmFja3MudmlkZW9UcmFjay5jb2RlY0lEXG4gICAgbGV0IGNvZGVjSUQgPSBpbmZvICYgMHgwZlxuICAgIHRoaXMudHJhY2tzLnZpZGVvVHJhY2suY29kZWNJRCA9IGNvZGVjSURcblxuICAgIC8vIGhldmPlkoxhdmPnmoRoZWFkZXLop6PmnpDmlrnlvI/kuIDmoLdcbiAgICBjaHVuay5hdmNQYWNrZXRUeXBlID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMSlbMF1cbiAgICBjaHVuay5jdHMgPSB0aGlzLmxvYWRlckJ1ZmZlci50b0ludCgwLCAzKVxuICAgIHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDMpXG5cbiAgICAvLyAxMiBmb3IgaGV2YywgNyBmb3IgYXZjXG4gICAgaWYgKGNvZGVjSUQgPT09IDEyKSB7XG4gICAgICBjb25zdCBkYXRhID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoY2h1bmsuZGF0YXNpemUgLSA1KVxuICAgICAgY2h1bmsuZGF0YSA9IGRhdGFcblxuICAgICAgaWYgKE51bWJlci5wYXJzZUludChjaHVuay5hdmNQYWNrZXRUeXBlKSAhPT0gMCkge1xuICAgICAgICBpZiAoIXRoaXMuX2RhdGFzaXplVmFsaWRhdG9yKGNodW5rLmRhdGFzaXplKSkge1xuICAgICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIHRoaXMuVEFHLCBuZXcgRXJyb3IoYGludmFsaWQgdmlkZW8gdGFnIGRhdGFzaXplOiAke2NodW5rLmRhdGFzaXplfWApLCBmYWxzZSlcbiAgICAgICAgfVxuICAgICAgICBsZXQgbmFsdSA9IHt9XG4gICAgICAgIGxldCByID0gMFxuICAgICAgICBuYWx1LmN0cyA9IGNodW5rLmN0c1xuICAgICAgICBuYWx1LmR0cyA9IGNodW5rLmR0c1xuICAgICAgICB3aGlsZSAoY2h1bmsuZGF0YS5sZW5ndGggPiByKSB7XG4gICAgICAgICAgbGV0IHNpemVzID0gY2h1bmsuZGF0YS5zbGljZShOdW1iZXIucGFyc2VJbnQociksIDQgKyByKVxuICAgICAgICAgIG5hbHUuc2l6ZSA9IHNpemVzWzNdXG4gICAgICAgICAgbmFsdS5zaXplICs9IHNpemVzWzJdICogMjU2XG4gICAgICAgICAgbmFsdS5zaXplICs9IHNpemVzWzFdICogMjU2ICogMjU2XG4gICAgICAgICAgbmFsdS5zaXplICs9IHNpemVzWzBdICogMjU2ICogMjU2ICogMjU2XG4gICAgICAgICAgciArPSA0XG4gICAgICAgICAgbmFsdS5kYXRhID0gY2h1bmsuZGF0YS5zbGljZShOdW1iZXIucGFyc2VJbnQociksIG5hbHUuc2l6ZSArIHIpXG4gICAgICAgICAgciArPSBuYWx1LnNpemVcbiAgICAgICAgICB0aGlzLnRyYWNrcy52aWRlb1RyYWNrLnNhbXBsZXMucHVzaChuYWx1KVxuICAgICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAndmlkZW8nKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKE51bWJlci5wYXJzZUludChjaHVuay5hdmNQYWNrZXRUeXBlKSA9PT0gMCkge1xuICAgICAgICBpZiAoIXRoaXMuX2RhdGFzaXplVmFsaWRhdG9yKGNodW5rLmRhdGFzaXplKSkge1xuICAgICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIHRoaXMuVEFHLCBuZXcgRXJyb3IoYGludmFsaWQgdmlkZW8gdGFnIGRhdGFzaXplOiAke2NodW5rLmRhdGFzaXplfWApLCBmYWxzZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgJ3ZpZGVvJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY29kZWNJRCA9PT0gNykge1xuICAgICAgbGV0IGRhdGEgPSB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdChjaHVuay5kYXRhc2l6ZSAtIDUpXG4gICAgICBpZiAoZGF0YVs0XSA9PT0gMCAmJiBkYXRhWzVdID09PSAwICYmIGRhdGFbNl0gPT09IDAgJiYgZGF0YVs3XSA9PT0gMSkge1xuICAgICAgICBsZXQgYXZjY2xlbmd0aCA9IDBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICBhdmNjbGVuZ3RoID0gYXZjY2xlbmd0aCAqIDI1NiArIGRhdGFbaV1cbiAgICAgICAgfVxuICAgICAgICBhdmNjbGVuZ3RoIC09IDRcbiAgICAgICAgZGF0YSA9IGRhdGEuc2xpY2UoNCwgZGF0YS5sZW5ndGgpXG4gICAgICAgIGRhdGFbM10gPSBhdmNjbGVuZ3RoICUgMjU2XG4gICAgICAgIGF2Y2NsZW5ndGggPSAoYXZjY2xlbmd0aCAtIGRhdGFbM10pIC8gMjU2XG4gICAgICAgIGRhdGFbMl0gPSBhdmNjbGVuZ3RoICUgMjU2XG4gICAgICAgIGF2Y2NsZW5ndGggPSAoYXZjY2xlbmd0aCAtIGRhdGFbMl0pIC8gMjU2XG4gICAgICAgIGRhdGFbMV0gPSBhdmNjbGVuZ3RoICUgMjU2XG4gICAgICAgIGRhdGFbMF0gPSAoYXZjY2xlbmd0aCAtIGRhdGFbMV0pIC8gMjU2XG4gICAgICB9XG5cbiAgICAgIGNodW5rLmRhdGEgPSBkYXRhXG4gICAgICAvLyBJZiBpdCBpcyBBVkMgc2VxdWVjZSBIZWFkZXIuXG4gICAgICBpZiAoY2h1bmsuYXZjUGFja2V0VHlwZSA9PT0gMCkge1xuICAgICAgICB0aGlzLl9hdmNTZXF1ZW5jZUhlYWRlclBhcnNlcihjaHVuay5kYXRhKVxuICAgICAgICBsZXQgdmFsaWRhdGUgPSB0aGlzLl9kYXRhc2l6ZVZhbGlkYXRvcihjaHVuay5kYXRhc2l6ZSlcbiAgICAgICAgaWYgKHZhbGlkYXRlKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX2hhc1NjcmlwdCAmJiAhdGhpcy5faGFzVmlkZW9TZXF1ZW5jZSkge1xuICAgICAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICd2aWRlbycpXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9oYXNTY3JpcHQgJiYgdGhpcy5faGFzVmlkZW9TZXF1ZW5jZSkge1xuICAgICAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICdhdWRpbycpXG4gICAgICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLlZJREVPX01FVEFEQVRBX0NIQU5HRSlcbiAgICAgICAgICAgIC8vIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAndmlkZW8nKVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9oYXNWaWRlb1NlcXVlbmNlID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21ldGFDaGFuZ2UgPSB0cnVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIXRoaXMuX2RhdGFzaXplVmFsaWRhdG9yKGNodW5rLmRhdGFzaXplKSkge1xuICAgICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIHRoaXMuVEFHLCBuZXcgRXJyb3IoYGludmFsaWQgdmlkZW8gdGFnIGRhdGFzaXplOiAke2NodW5rLmRhdGFzaXplfWApLCBmYWxzZSlcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX21ldGFDaGFuZ2UpIHtcbiAgICAgICAgICBjaHVuay5vcHRpb25zID0ge1xuICAgICAgICAgICAgbWV0YTogT2JqZWN0LmFzc2lnbih7fSwgdGhpcy50cmFja3MudmlkZW9UcmFjay5tZXRhKVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9tZXRhQ2hhbmdlID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRyYWNrcy52aWRlb1RyYWNrLnNhbXBsZXMucHVzaChjaHVuaylcbiAgICAgICAgLy8gdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9DT01QTEVURSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgdGhpcy5UQUcsIG5ldyBFcnJvcihgdmlkZW8gY29kZWlkIGlzICR7Y29kZWNJRH1gKSwgZmFsc2UpXG4gICAgICBjaHVuay5kYXRhID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoY2h1bmsuZGF0YXNpemUgLSAxKVxuICAgICAgaWYgKCF0aGlzLl9kYXRhc2l6ZVZhbGlkYXRvcihjaHVuay5kYXRhc2l6ZSkpIHtcbiAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgdGhpcy5UQUcsIG5ldyBFcnJvcihgaW52YWxpZCB2aWRlbyB0YWcgZGF0YXNpemU6ICR7Y2h1bmsuZGF0YXNpemV9YCksIGZhbHNlKVxuICAgICAgfVxuICAgICAgdGhpcy50cmFja3MudmlkZW9UcmFjay5zYW1wbGVzLnB1c2goY2h1bmspXG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0NPTVBMRVRFKVxuICAgIH1cbiAgICBkZWxldGUgY2h1bmsudGFnVHlwZVxuICB9XG5cbiAgLyoqXG4gICAqIHBhcnNlIGF2YyBtZXRhZGF0YVxuICAgKiBAcGFyYW0gZGF0YVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2F2Y1NlcXVlbmNlSGVhZGVyUGFyc2VyIChkYXRhKSB7XG4gICAgbGV0IHRyYWNrID0gdGhpcy50cmFja3MudmlkZW9UcmFja1xuXG4gICAgaWYgKCF0cmFjaykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IG9mZnNldCA9IDBcblxuICAgIGlmICghdHJhY2subWV0YSkge1xuICAgICAgdHJhY2subWV0YSA9IG5ldyBWaWRlb1RyYWNrTWV0YSgpXG4gICAgfVxuICAgIGxldCBtZXRhID0gdHJhY2subWV0YVxuXG4gICAgbWV0YS5jb25maWd1cmF0aW9uVmVyc2lvbiA9IGRhdGFbMF1cbiAgICBtZXRhLmF2Y1Byb2ZpbGVJbmRpY2F0aW9uID0gZGF0YVsxXVxuICAgIG1ldGEucHJvZmlsZUNvbXBhdGliaWxpdHkgPSBkYXRhWzJdXG4gICAgbWV0YS5hdmNMZXZlbEluZGljYXRpb24gPSBkYXRhWzNdIC8gMTBcbiAgICBtZXRhLm5hbFVuaXRMZW5ndGggPSAoZGF0YVs0XSAmIDB4MDMpICsgMVxuXG4gICAgbGV0IG51bU9mU3BzID0gZGF0YVs1XSAmIDB4MWZcbiAgICBvZmZzZXQgPSA2XG4gICAgbGV0IGNvbmZpZyA9IHt9XG5cbiAgICAvLyBwYXJzZSBTUFNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bU9mU3BzOyBpKyspIHtcbiAgICAgIGxldCBzaXplID0gZGF0YVtvZmZzZXRdICogMjU1ICsgZGF0YVtvZmZzZXQgKyAxXVxuICAgICAgb2Zmc2V0ICs9IDJcblxuICAgICAgbGV0IHNwcyA9IG5ldyBVaW50OEFycmF5KHNpemUpXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNpemU7IGorKykge1xuICAgICAgICBzcHNbal0gPSBkYXRhW29mZnNldCArIGpdXG4gICAgICB9XG5cbiAgICAgIC8vIGNvZGVjIHN0cmluZ1xuICAgICAgbGV0IGNvZGVjU3RyaW5nID0gJ2F2YzEuJ1xuICAgICAgZm9yIChsZXQgaiA9IDE7IGogPCA0OyBqKyspIHtcbiAgICAgICAgbGV0IGggPSBzcHNbal0udG9TdHJpbmcoMTYpXG4gICAgICAgIGlmIChoLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICBoID0gJzAnICsgaFxuICAgICAgICB9XG4gICAgICAgIGNvZGVjU3RyaW5nICs9IGhcbiAgICAgIH1cblxuICAgICAgbWV0YS5jb2RlYyA9IGNvZGVjU3RyaW5nXG5cbiAgICAgIG9mZnNldCArPSBzaXplXG4gICAgICB0aGlzLnRyYWNrcy52aWRlb1RyYWNrLm1ldGEuc3BzID0gc3BzXG4gICAgICBjb25maWcgPSBTcHNQYXJzZXIucGFyc2VTUFMoc3BzKVxuICAgIH1cblxuICAgIGxldCBudW1PZlBwcyA9IGRhdGFbb2Zmc2V0XVxuXG4gICAgb2Zmc2V0KytcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtT2ZQcHM7IGkrKykge1xuICAgICAgbGV0IHNpemUgPSBkYXRhW29mZnNldF0gKiAyNTUgKyBkYXRhW29mZnNldCArIDFdXG4gICAgICBvZmZzZXQgKz0gMlxuICAgICAgbGV0IHBwcyA9IG5ldyBVaW50OEFycmF5KHNpemUpXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNpemU7IGorKykge1xuICAgICAgICBwcHNbal0gPSBkYXRhW29mZnNldCArIGpdXG4gICAgICB9XG4gICAgICBvZmZzZXQgKz0gc2l6ZVxuICAgICAgdGhpcy50cmFja3MudmlkZW9UcmFjay5tZXRhLnBwcyA9IHBwc1xuICAgIH1cblxuICAgIE9iamVjdC5hc3NpZ24obWV0YSwgU3BzUGFyc2VyLnRvVmlkZW9NZXRhKGNvbmZpZykpXG5cbiAgICAvLyBmaWxsIHZpZGVvIG1lZGlhIGluZm9cbiAgICBjb25zdCB2aWRlb01lZGlhID0gdGhpcy5fY29udGV4dC5tZWRpYUluZm8udmlkZW9cblxuICAgIHZpZGVvTWVkaWEuY29kZWMgPSBtZXRhLmNvZGVjXG4gICAgdmlkZW9NZWRpYS5wcm9maWxlID0gbWV0YS5wcm9maWxlXG4gICAgdmlkZW9NZWRpYS5sZXZlbCA9IG1ldGEubGV2ZWxcbiAgICB2aWRlb01lZGlhLmNocm9tYUZvcm1hdCA9IG1ldGEuY2hyb21hRm9ybWF0XG4gICAgdmlkZW9NZWRpYS5mcmFtZVJhdGUgPSBtZXRhLmZyYW1lUmF0ZVxuICAgIHZpZGVvTWVkaWEucGFyUmF0aW8gPSBtZXRhLnBhclJhdGlvXG4gICAgdmlkZW9NZWRpYS53aWR0aCA9IHZpZGVvTWVkaWEud2lkdGggPT09IG1ldGEucHJlc2VudFdpZHRoID8gdmlkZW9NZWRpYS53aWR0aCA6IG1ldGEucHJlc2VudFdpZHRoXG4gICAgdmlkZW9NZWRpYS5oZWlnaHQgPSB2aWRlb01lZGlhLmhlaWdodCA9PT0gbWV0YS5wcmVzZW50SGVpZ2h0ID8gdmlkZW9NZWRpYS53aWR0aCA6IG1ldGEucHJlc2VudEhlaWdodFxuXG4gICAgbWV0YS5kdXJhdGlvbiA9IHRoaXMuX2NvbnRleHQubWVkaWFJbmZvLmR1cmF0aW9uICogbWV0YS50aW1lc2NhbGVcbiAgICBtZXRhLmF2Y2MgPSBuZXcgVWludDhBcnJheShkYXRhLmxlbmd0aClcbiAgICBtZXRhLmF2Y2Muc2V0KGRhdGEpXG4gICAgdHJhY2subWV0YSA9IG1ldGFcbiAgfVxuXG4gIC8qKlxuICAgKiBjaG9vc2UgYXVkaW8gc2FtcGxlIHJhdGVcbiAgICogQHBhcmFtIHNhbXBsaW5nRnJlcXVlbmN5SW5kZXhcbiAgICogQHJldHVybnMge251bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zd2l0Y2hBdWRpb1NhbXBsZVJhdGUgKHNhbXBsaW5nRnJlcXVlbmN5SW5kZXgpIHtcbiAgICBsZXQgc2FtcGxpbmdGcmVxdWVuY3lMaXN0ID0gWzk2MDAwLCA4ODIwMCwgNjQwMDAsIDQ4MDAwLCA0NDEwMCwgMzIwMDAsIDI0MDAwLCAyMjA1MCwgMTYwMDAsIDEyMDAwLCAxMTAyNSwgODAwMCwgNzM1MF1cbiAgICByZXR1cm4gc2FtcGxpbmdGcmVxdWVuY3lMaXN0W3NhbXBsaW5nRnJlcXVlbmN5SW5kZXhdXG4gIH1cblxuICAvKipcbiAgICogY2hvb3NlIGF1ZGlvIHNhbXBsaW5nIGZyZXF1ZW5jZVxuICAgKiBAcGFyYW0gaW5mb1xuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3N3aXRjaEF1ZGlvU2FtcGxpbmdGcmVxdWVuY3kgKGluZm8pIHtcbiAgICBsZXQgc2FtcGxpbmdGcmVxdWVuY3lJbmRleCA9IChpbmZvICYgMTIpID4+PiAyXG4gICAgbGV0IHNhbXBsaW5nRnJlcXVlbmN5TGlzdCA9IFs1NTAwLCAxMTAyNSwgMjIwNTAsIDQ0MTAwLCA0ODAwMF1cbiAgICByZXR1cm4gc2FtcGxpbmdGcmVxdWVuY3lMaXN0W3NhbXBsaW5nRnJlcXVlbmN5SW5kZXhdXG4gIH1cblxuICAvKipcbiAgICogY2hvb3NlIGF1ZGlvIGNoYW5uZWwgY291bnRcbiAgICogQHBhcmFtIGluZm9cbiAgICogQHJldHVybnMge251bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zd2l0Y2hBdWRpb0NoYW5uZWwgKGluZm8pIHtcbiAgICBsZXQgc2FtcGxlVHJhY2tOdW1JbmRleCA9IGluZm8gJiAxXG4gICAgbGV0IHNhbXBsZVRyYWNrTnVtTGlzdCA9IFsxLCAyXVxuICAgIHJldHVybiBzYW1wbGVUcmFja051bUxpc3Rbc2FtcGxlVHJhY2tOdW1JbmRleF1cbiAgfVxuXG4gIC8qKlxuICAgKiBjaGVjayBkYXRhc2l6ZSBpcyB2YWxpZCB1c2UgNCBCeXRlIGFmdGVyIGN1cnJlbnQgdGFnXG4gICAqIEBwYXJhbSBkYXRhc2l6ZVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9kYXRhc2l6ZVZhbGlkYXRvciAoZGF0YXNpemUpIHtcbiAgICBsZXQgZGF0YXNpemVDb25maXJtID0gdGhpcy5sb2FkZXJCdWZmZXIudG9JbnQoMCwgNClcbiAgICB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCg0KVxuICAgIHJldHVybiBkYXRhc2l6ZUNvbmZpcm0gPT09IGRhdGFzaXplICsgMTFcbiAgfVxuXG4gIGdldCBsb2FkZXJCdWZmZXIgKCkge1xuICAgIGNvbnN0IGJ1ZmZlciA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ0xPQURFUl9CVUZGRVInKVxuICAgIGlmIChidWZmZXIpIHtcbiAgICAgIHJldHVybiBidWZmZXJcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgbmV3IEVycm9yKCfmib7kuI3liLAgbG9hZGVyQnVmZmVyIOWunuS+iycpKVxuICAgIH1cbiAgfVxuXG4gIGdldCB0cmFja3MgKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKVxuICB9XG5cbiAgZ2V0IGxvZ2dlciAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ0xPR0dFUicpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRmx2RGVtdXhlclxuIiwiLyoqXG4gKiBSZWZlcmVuY2U6IGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM4MjE2I3NlY3Rpb24tNC4zXG4gKi9cbmNsYXNzIE0zVThQYXJzZXIge1xuICBzdGF0aWMgcGFyc2UgKHRleHQsIGJhc2V1cmwgPSAnJykge1xuICAgIGxldCByZXQgPSB7XG4gICAgICBkdXJhdGlvbjogMFxuICAgIH07XG4gICAgaWYgKCF0ZXh0IHx8ICF0ZXh0LnNwbGl0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCByZWZzID0gdGV4dC5zcGxpdCgvXFxyfFxcbi8pO1xuICAgIHJlZnMgPSByZWZzLmZpbHRlcigocmVmKSA9PiB7XG4gICAgICByZXR1cm4gcmVmO1xuICAgIH0pXG4gICAgbGV0IHJlZiA9IHJlZnMuc2hpZnQoKVxuICAgIGlmICghcmVmLm1hdGNoKCcjRVhUTTNVJykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBtM3U4IGZpbGU6IG5vdCBcIiNFWFRNM1VcImApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJlZiA9IHJlZnMuc2hpZnQoKVxuICAgIHdoaWxlIChyZWYpIHtcbiAgICAgIGxldCByZWZtID0gcmVmLm1hdGNoKC8jKC5bQS1afC1dKik6KC4qKS8pO1xuICAgICAgbGV0IHJlZmQgPSByZWYubWF0Y2goLyMoLltBLVp8LV0qKS8pO1xuICAgICAgaWYgKHJlZmQgJiYgcmVmbSAmJiByZWZtLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgc3dpdGNoIChyZWZtWzFdKSB7XG4gICAgICAgICAgY2FzZSAnRVhULVgtVkVSU0lPTic6XG4gICAgICAgICAgICByZXQudmVyc2lvbiA9IHBhcnNlSW50KHJlZm1bMl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnRVhULVgtTUVESUEtU0VRVUVOQ0UnOlxuICAgICAgICAgICAgcmV0LnNlcXVlbmNlID0gcGFyc2VJbnQocmVmbVsyXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdFWFQtWC1UQVJHRVREVVJBVElPTic6XG4gICAgICAgICAgICByZXQudGFyZ2V0ZHVyYXRpb24gPSBwYXJzZUZsb2F0KHJlZm1bMl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnRVhUSU5GJzpcbiAgICAgICAgICAgIE0zVThQYXJzZXIucGFyc2VGcmFnKHJlZm0sIHJlZnMsIHJldCwgYmFzZXVybCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdFWFQtWC1LRVknOlxuICAgICAgICAgICAgTTNVOFBhcnNlci5wYXJzZURlY3J5cHQocmVmbVsyXSxyZXQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9IGlmKHJlZmQgJiYgcmVmZC5sZW5ndGggPiAxKSB7XG4gICAgICAgIHN3aXRjaChyZWZkWzFdKSB7XG4gICAgICAgICAgY2FzZSAnRVhULVgtRElTQ09OVElOVUlUWSc6XG4gICAgICAgICAgICByZWYgPSByZWZzLnNoaWZ0KCk7XG4gICAgICAgICAgICBsZXQgcmVmbSA9IHJlZi5tYXRjaCgvIyguW0EtWnwtXSopOiguKikvKTtcbiAgICAgICAgICAgIGlmKHJlZm0ubGVuZ3RoID4yICYmIHJlZm1bMV0gPT09ICdFWFRJTkYnKSB7XG4gICAgICAgICAgICAgIE0zVThQYXJzZXIucGFyc2VGcmFnKHJlZm0sIHJlZnMsIHJldCwgYmFzZXVybCwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJlZiA9IHJlZnMuc2hpZnQoKVxuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgc3RhdGljIHBhcnNlRnJhZyAocmVmbSwgcmVmcywgcmV0LCBiYXNldXJsLCBkaXNjb250aW51ZSkge1xuICAgIGlmICghcmV0LmZyYWdzKSB7XG4gICAgICByZXQuZnJhZ3MgPSBbXVxuICAgIH1cblxuICAgIGxldCBmcmVnID0ge1xuICAgICAgc3RhcnQ6IHJldC5kdXJhdGlvbixcbiAgICAgIGR1cmF0aW9uOiBwYXJzZUZsb2F0KHJlZm1bMl0pICogMTAwMFxuICAgIH1cblxuICAgIHJldC5kdXJhdGlvbiArPSBmcmVnLmR1cmF0aW9uO1xuICAgIGxldCBuZXh0bGluZSA9IHJlZnMuc2hpZnQoKTtcbiAgICBpZiAobmV4dGxpbmUubWF0Y2goLyMoLiopOiguKikvKSkge1xuICAgICAgbmV4dGxpbmUgPSByZWZzLnNoaWZ0KCk7XG4gICAgfVxuICAgIGlmIChuZXh0bGluZS5sZW5ndGggPiAwICYmIG5leHRsaW5lLmNoYXJBdCgwKSA9PT0gJy8nICYmIGJhc2V1cmwubWF0Y2goLy4qXFwvXFwvLipcXC5cXHcrL2cpKSB7XG4gICAgICBiYXNldXJsID0gYmFzZXVybC5tYXRjaCgvLipcXC9cXC8uKlxcLlxcdysvZylbMF07XG4gICAgfVxuICAgIGlmIChuZXh0bGluZS5tYXRjaCgvLio6XFwvXFwvLiovKSkge1xuICAgICAgZnJlZy51cmwgPSBuZXh0bGluZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnJlZy51cmwgPSBiYXNldXJsICsgbmV4dGxpbmU7XG4gICAgfVxuICAgIGZyZWcuZGlzY29udGludWUgPSBkaXNjb250aW51ZTtcbiAgICByZXQuZnJhZ3MucHVzaChmcmVnKTtcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZVVSTCAodXJsKSB7XG4gICAgbGV0IGJhc2V1cmwgPSAnJztcbiAgICBsZXQgdXJscyA9IHVybC5tYXRjaCgvKC4qXFwvKS4qXFwubTN1OC8pO1xuICAgIGlmICh1cmxzICYmIHVybHMubGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB1cmxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh1cmxzW2ldLm1hdGNoKC8uKlxcLyQvZykgJiYgdXJsc1tpXS5sZW5ndGggPiBiYXNldXJsLmxlbmd0aCkge1xuICAgICAgICAgIGJhc2V1cmwgPSB1cmxzW2ldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBiYXNldXJsO1xuICB9XG5cbiAgc3RhdGljIHBhcnNlRGVjcnlwdChyZWZtLCByZXQpIHtcbiAgICByZXQuZW5jcnlwdCA9IHt9O1xuICAgIGxldCByZWZzID0gcmVmbS5zcGxpdCgnLCcpO1xuICAgIGZvciAobGV0IGkgaW4gcmVmcykgeyBcbiAgICAgIGxldCBjbWQgPSByZWZzW2ldO1xuICAgICAgaWYoY21kLm1hdGNoKC9NRVRIT0Q9KC4qKS8pKSB7XG4gICAgICAgIHJldC5lbmNyeXB0Lm1ldGhvZCA9IGNtZC5tYXRjaCgvTUVUSE9EPSguKikvKVsxXTtcbiAgICAgIH1cbiAgICAgIGlmKGNtZC5tYXRjaCgvVVJJPVwiKC4qKVwiLykpIHtcbiAgICAgICAgcmV0LmVuY3J5cHQudXJpID0gY21kLm1hdGNoKC9VUkk9XCIoLiopXCIvKVsxXTtcbiAgICAgIH1cblxuICAgICAgaWYoY21kLm1hdGNoKC9JVj0weCguKikvKSkge1xuICAgICAgICBsZXQgaXYgPSBjbWQubWF0Y2goL0lWPTB4KC4qKS8pWzFdO1xuICAgICAgICBsZXQgbGVuZ3RoID0gTWF0aC5jZWlsKGl2Lmxlbmd0aCAvIDIpO1xuICAgICAgICByZXQuZW5jcnlwdC5pdmIgPSBuZXcgVWludDhBcnJheShsZW5ndGgpO1xuICAgICAgICBmb3IobGV0IGkgPSBsZW5ndGggLSAxOyBpID49MDsgaS0tKSB7XG4gICAgICAgICAgbGV0IGltID0gcGFyc2VJbnQoaXYuc3Vic3RyKGkgKiAyLCAyKSwgMTYpO1xuICAgICAgICAgIHJldC5lbmNyeXB0Lml2YltpXSA9IGltO1xuICAgICAgICB9IFxuICAgICAgICByZXQuZW5jcnlwdC5pdiA9IGl2O1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTTNVOFBhcnNlcjtcbiIsImltcG9ydCB7IE5hbHVuaXQgfSBmcm9tICd4Z3BsYXllci1jb2RlYyc7XG5pbXBvcnQgeyBBdWRpb1RyYWNrLCBWaWRlb1RyYWNrIH0gZnJvbSAneGdwbGF5ZXItYnVmZmVyJztcbmltcG9ydCB7XG4gIEF1ZGlvVHJhY2tNZXRhLFxuICBWaWRlb1RyYWNrTWV0YSxcbiAgQXVkaW9UcmFja1NhbXBsZSxcbiAgVmlkZW9UcmFja1NhbXBsZSxcbiAgRVZFTlRTLFxuICBTdHJlYW1cbn0gZnJvbSAneGdwbGF5ZXItdXRpbHMnO1xuXG5jb25zdCBERU1VWF9FVkVOVFMgPSBFVkVOVFMuREVNVVhfRVZFTlRTO1xuY29uc3QgU3RyZWFtVHlwZSA9IHtcbiAgMHgwMTogWyd2aWRlbycsICdNUEVHLTEnXSxcbiAgMHgwMjogWyd2aWRlbycsICdNUEVHLTInXSxcbiAgMHgxYjogWyd2aWRlbycsICdBVkMuSDI2NCddLFxuICAweGVhOiBbJ3ZpZGVvJywgJ1ZDLTEnXSxcbiAgMHgwMzogWydhdWRpbycsICdNUEVHLTEnXSxcbiAgMHgwNDogWydhdWRpbycsICdNUEVHLTInXSxcbiAgMHgwZjogWydhdWRpbycsICdNUEVHLTIuQUFDJ10sXG4gIDB4MTE6IFsnYXVkaW8nLCAnTVBFRy00LkFBQyddLFxuICAweDgwOiBbJ2F1ZGlvJywgJ0xQQ00nXSxcbiAgMHg4MTogWydhdWRpbycsICdBQzMnXSxcbiAgMHgwNjogWydhdWRpbycsICdBQzMnXSxcbiAgMHg4MjogWydhdWRpbycsICdEVFMnXSxcbiAgMHg4MzogWydhdWRpbycsICdEb2xieSBUcnVlSEQnXSxcbiAgMHg4NDogWydhdWRpbycsICdBQzMtUGx1cyddLFxuICAweDg1OiBbJ2F1ZGlvJywgJ0RUUy1IRCddLFxuICAweDg2OiBbJ2F1ZGlvJywgJ0RUUy1NQSddLFxuICAweGExOiBbJ2F1ZGlvJywgJ0FDMy1QbHVzLVNFQyddLFxuICAweGEyOiBbJ2F1ZGlvJywgJ0RUUy1IRC1TRUMnXVxufTtcblxuY2xhc3MgVHNEZW11eGVyIHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZ3MpIHtcbiAgICB0aGlzLmNvbmZpZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWdzKTtcbiAgICB0aGlzLmRlbXV4aW5nID0gZmFsc2U7XG4gICAgdGhpcy5wYXQgPSBbXTtcbiAgICB0aGlzLnBtdCA9IFtdO1xuICAgIHRoaXMuX2hhc1ZpZGVvTWV0YSA9IGZhbHNlO1xuICAgIHRoaXMuX2hhc0F1ZGlvTWV0YSA9IGZhbHNlO1xuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgdGhpcy5vbihERU1VWF9FVkVOVFMuREVNVVhfU1RBUlQsIHRoaXMuZGVtdXguYmluZCh0aGlzKSlcbiAgfVxuXG4gIGRlbXV4IChmcmFnKSB7XG4gICAgaWYgKHRoaXMuZGVtdXhpbmcpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBidWZmZXIgPSB0aGlzLmlucHV0QnVmZmVyO1xuICAgIGxldCBmcmFncyA9IHsgcGF0OiBbXSwgcG10OiBbXSB9O1xuICAgIGxldCBwZXNlcyA9IHt9O1xuXG4gICAgLy8gUmVhZCBUUyBzZWdtZW50XG4gICAgd2hpbGUgKGJ1ZmZlci5sZW5ndGggPj0gMTg4KSB7XG4gICAgICBpZiAoYnVmZmVyLmxlbmd0aCA+PSAxICYmIGJ1ZmZlci5hcnJheVswXVtidWZmZXIub2Zmc2V0XSAhPT0gNzEpIHtcbiAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgdGhpcy5UQUcsIG5ldyBFcnJvcihgVW50cnVzdCBzeW5jIGNvZGU6ICR7YnVmZmVyLmFycmF5WzBdW2J1ZmZlci5vZmZzZXRdfSwgdHJ5IHRvIHJlY292ZXI7YCksIGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChidWZmZXIubGVuZ3RoID49IDEgJiYgYnVmZmVyLmFycmF5WzBdW2J1ZmZlci5vZmZzZXRdICE9PSA3MSkge1xuICAgICAgICBidWZmZXIuc2hpZnQoMSk7XG4gICAgICB9XG4gICAgICBsZXQgYnVmID0gYnVmZmVyLnNoaWZ0KDE4OCk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhidWYpO1xuICAgICAgbGV0IHRzU3RyZWFtID0gbmV3IFN0cmVhbShidWYuYnVmZmVyKTtcbiAgICAgIGxldCB0cyA9IHt9O1xuICAgICAgVHNEZW11eGVyLnJlYWQodHNTdHJlYW0sIHRzLCBmcmFncyk7XG4gICAgICBpZiAodHMucGVzKSB7XG4gICAgICAgIGlmICghcGVzZXNbdHMuaGVhZGVyLnBpZF0pIHtcbiAgICAgICAgICBwZXNlc1t0cy5oZWFkZXIucGlkXSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHBlc2VzW3RzLmhlYWRlci5waWRdLnB1c2godHMucGVzKTtcbiAgICAgICAgdHMucGVzLkVTLmJ1ZmZlciA9IFt0cy5wZXMuRVMuYnVmZmVyXTtcbiAgICAgIH0gZWxzZSBpZiAocGVzZXNbdHMuaGVhZGVyLnBpZF0pIHtcbiAgICAgICAgcGVzZXNbdHMuaGVhZGVyLnBpZF1bcGVzZXNbdHMuaGVhZGVyLnBpZF0ubGVuZ3RoIC0gMV0uRVMuYnVmZmVyLnB1c2godHMucGF5bG9hZC5zdHJlYW0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBBdWRpb09wdGlvbnMgPSBmcmFnO1xuICAgIGxldCBWaWRlb09wdGlvbnMgPSBmcmFnO1xuXG4gICAgLy8gR2V0IEZyYW1lcyBkYXRhXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBPYmplY3Qua2V5cyhwZXNlcykubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBlcGVzZXMgPSBwZXNlc1tPYmplY3Qua2V5cyhwZXNlcylbaV1dO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBlcGVzZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgZXBlc2VzW2pdLmlkID0gT2JqZWN0LmtleXMocGVzZXMpW2ldO1xuICAgICAgICBlcGVzZXNbal0uRVMuYnVmZmVyID0gVHNEZW11eGVyLk1lcmdlKGVwZXNlc1tqXS5FUy5idWZmZXIpO1xuICAgICAgICBpZiAoZXBlc2VzW2pdLnR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgICAgICB0aGlzLnB1c2hBdWRpb1NhbXBsZShlcGVzZXNbal0sIEF1ZGlvT3B0aW9ucyk7XG4gICAgICAgICAgQXVkaW9PcHRpb25zID0ge307XG4gICAgICAgIH0gZWxzZSBpZiAoZXBlc2VzW2pdLnR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgICAgICB0aGlzLnB1c2hWaWRlb1NhbXBsZShlcGVzZXNbal0sIFZpZGVvT3B0aW9ucyk7XG4gICAgICAgICAgVmlkZW9PcHRpb25zID0ge307XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5faGFzQXVkaW9NZXRhKSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0NPTVBMRVRFLCAnYXVkaW8nKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2hhc1ZpZGVvTWV0YSkge1xuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9DT01QTEVURSwgJ3ZpZGVvJyk7XG4gICAgfVxuICB9XG5cbiAgcHVzaEF1ZGlvU2FtcGxlIChwZXMsIG9wdGlvbnMpIHtcbiAgICBsZXQgdHJhY2s7XG4gICAgaWYgKCF0aGlzLl90cmFja3MuYXVkaW9UcmFjaykge1xuICAgICAgdGhpcy5fdHJhY2tzLmF1ZGlvVHJhY2sgPSBuZXcgQXVkaW9UcmFjaygpO1xuICAgICAgdHJhY2sgPSB0aGlzLl90cmFja3MuYXVkaW9UcmFjaztcbiAgICB9IGVsc2Uge1xuICAgICAgdHJhY2sgPSB0aGlzLl90cmFja3MuYXVkaW9UcmFjaztcbiAgICB9XG4gICAgbGV0IG1ldGEgPSBuZXcgQXVkaW9UcmFja01ldGEoe1xuICAgICAgYXVkaW9TYW1wbGVSYXRlOiBwZXMuRVMuZnJlcXVlbmNlLFxuICAgICAgc2FtcGxlUmF0ZTogcGVzLkVTLmZyZXF1ZW5jZSxcbiAgICAgIGNoYW5uZWxDb3VudDogcGVzLkVTLmNoYW5uZWwsXG4gICAgICBjb2RlYzogJ21wNGEuNDAuJyArIHBlcy5FUy5hdWRpb09iamVjdFR5cGUsXG4gICAgICBjb25maWc6IHBlcy5FUy5hdWRpb0NvbmZpZyxcbiAgICAgIGlkOiAyLFxuICAgICAgc2FtcGxlUmF0ZUluZGV4OiBwZXMuRVMuZnJlcXVlbmN5SW5kZXhcbiAgICB9KTtcbiAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uID0gTWF0aC5mbG9vcigxMDI0IC8gbWV0YS5hdWRpb1NhbXBsZVJhdGUgKiBtZXRhLnRpbWVzY2FsZSk7XG5cbiAgICBsZXQgbWV0YUVxdWFsID0gVHNEZW11eGVyLmNvbXBhaXJlTWV0YSh0cmFjay5tZXRhLCBtZXRhLCB0cnVlKTtcblxuICAgIGlmICghdGhpcy5faGFzQXVkaW9NZXRhIHx8ICFtZXRhRXF1YWwpIHtcbiAgICAgIHRyYWNrLm1ldGEgPSBtZXRhO1xuICAgICAgdGhpcy5faGFzQXVkaW9NZXRhID0gdHJ1ZVxuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICdhdWRpbycpO1xuICAgIH1cblxuICAgIGxldCBkYXRhID0gbmV3IFVpbnQ4QXJyYXkocGVzLkVTLmJ1ZmZlci5idWZmZXIuc2xpY2UocGVzLkVTLmJ1ZmZlci5wb3NpdGlvbiwgcGVzLkVTLmJ1ZmZlci5sZW5ndGgpKTtcbiAgICBsZXQgZHRzID0gcGFyc2VJbnQocGVzLnB0cyAvIDkwKTtcbiAgICBsZXQgcHRzID0gcGFyc2VJbnQocGVzLnB0cyAvIDkwKTtcbiAgICBsZXQgc2FtcGxlID0gbmV3IEF1ZGlvVHJhY2tTYW1wbGUoe2R0cywgcHRzLCBkYXRhLCBvcHRpb25zfSk7XG4gICAgdHJhY2suc2FtcGxlcy5wdXNoKHNhbXBsZSk7XG4gIH1cblxuICBwdXNoVmlkZW9TYW1wbGUgKHBlcywgb3B0aW9ucykge1xuICAgIGxldCBuYWxzID0gTmFsdW5pdC5nZXROYWx1bml0cyhwZXMuRVMuYnVmZmVyKTtcbiAgICBsZXQgdHJhY2s7XG4gICAgbGV0IG1ldGEgPSBuZXcgVmlkZW9UcmFja01ldGEoKTtcbiAgICBpZiAoIXRoaXMuX3RyYWNrcy52aWRlb1RyYWNrKSB7XG4gICAgICB0aGlzLl90cmFja3MudmlkZW9UcmFjayA9IG5ldyBWaWRlb1RyYWNrKCk7XG4gICAgICB0cmFjayA9IHRoaXMuX3RyYWNrcy52aWRlb1RyYWNrO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cmFjayA9IHRoaXMuX3RyYWNrcy52aWRlb1RyYWNrO1xuICAgIH1cbiAgICBsZXQgc2FtcGxlTGVuZ3RoID0gMDtcbiAgICBsZXQgc3BzID0gZmFsc2U7XG4gICAgbGV0IHBwcyA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmFscy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IG5hbCA9IG5hbHNbaV07XG4gICAgICBpZiAobmFsLnNwcykge1xuICAgICAgICBzcHMgPSBuYWw7XG4gICAgICAgIHRyYWNrLnNwcyA9IG5hbC5ib2R5O1xuICAgICAgICBtZXRhLmNocm9tYUZvcm1hdCA9IHNwcy5zcHMuY2hyb21hX2Zvcm1hdFxuICAgICAgICBtZXRhLmNvZGVjID0gJ2F2YzEuJztcbiAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCA0OyBqKyspIHtcbiAgICAgICAgICB2YXIgaCA9IHNwcy5ib2R5W2pdLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgICBpZiAoaC5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICBoID0gJzAnICsgaDtcbiAgICAgICAgICB9XG4gICAgICAgICAgbWV0YS5jb2RlYyArPSBoO1xuICAgICAgICB9XG4gICAgICAgIG1ldGEuY29kZWNIZWlnaHQgPSBzcHMuc3BzLmNvZGVjX3NpemUuaGVpZ2h0O1xuICAgICAgICBtZXRhLmNvZGVjV2lkdGggPSBzcHMuc3BzLmNvZGVjX3NpemUud2lkdGg7XG4gICAgICAgIG1ldGEuZnJhbWVSYXRlID0gc3BzLnNwcy5mcmFtZV9yYXRlO1xuICAgICAgICBtZXRhLmlkID0gMTtcbiAgICAgICAgbWV0YS5sZXZlbCA9IHNwcy5zcHMubGV2ZWxfc3RyaW5nO1xuICAgICAgICBtZXRhLnByZXNlbnRIZWlnaHQgPSBzcHMuc3BzLnByZXNlbnRfc2l6ZS5oZWlnaHQ7XG4gICAgICAgIG1ldGEucHJlc2VudFdpZHRoID0gc3BzLnNwcy5wcmVzZW50X3NpemUud2lkdGg7XG4gICAgICAgIG1ldGEucHJvZmlsZSA9IHNwcy5zcHMucHJvZmlsZV9zdHJpbmc7XG4gICAgICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb24gPSBNYXRoLmZsb29yKG1ldGEudGltZXNjYWxlICogKHNwcy5zcHMuZnJhbWVfcmF0ZS5mcHNfZGVuIC8gc3BzLnNwcy5mcmFtZV9yYXRlLmZwc19udW0pKTtcbiAgICAgICAgbWV0YS5zYXJSYXRpbyA9IHNwcy5zcHMuc2FyX3JhdGlvID8gc3BzLnNwcy5zYXJfcmF0aW8gOiBzcHMuc3BzLnBhcl9yYXRpbztcbiAgICAgIH0gZWxzZSBpZiAobmFsLnBwcykge1xuICAgICAgICB0cmFjay5wcHMgPSBuYWwuYm9keTtcbiAgICAgICAgcHBzID0gbmFsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2FtcGxlTGVuZ3RoICs9ICg0ICsgbmFsLmJvZHkuYnl0ZUxlbmd0aCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHNwcyAmJiBwcHMpIHtcbiAgICAgIG1ldGEuYXZjYyA9IE5hbHVuaXQuZ2V0QXZjYyhzcHMuYm9keSwgcHBzLmJvZHkpO1xuICAgICAgbGV0IG1ldGFFcXVhbCA9IFRzRGVtdXhlci5jb21wYWlyZU1ldGEodHJhY2subWV0YSwgbWV0YSwgdHJ1ZSk7XG4gICAgICBpZiAoIXRoaXMuX2hhc1ZpZGVvTWV0YSB8fCAhbWV0YUVxdWFsKSB7XG4gICAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgb3B0aW9ucy5tZXRhID0gT2JqZWN0LmFzc2lnbih7fSwgbWV0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIG1ldGE6IE9iamVjdC5hc3NpZ24oe30sIG1ldGEpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRyYWNrLm1ldGEgPSBtZXRhO1xuICAgICAgICB0aGlzLl9oYXNWaWRlb01ldGEgPSB0cnVlXG4gICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAndmlkZW8nKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgZGF0YSA9IG5ldyBVaW50OEFycmF5KHNhbXBsZUxlbmd0aCk7XG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgbGV0IGlzS2V5ZnJhbWUgPSBmYWxzZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBuYWwgPSBuYWxzW2ldO1xuICAgICAgbGV0IGxlbmd0aCA9IG5hbC5ib2R5LmJ5dGVMZW5ndGg7XG4gICAgICBpZiAobmFsLmlkcikge1xuICAgICAgICBpc0tleWZyYW1lID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICghbmFsLnBwcyAmJiAhbmFsLnNwcykge1xuICAgICAgICBkYXRhLnNldChuZXcgVWludDhBcnJheShbbGVuZ3RoID4+PiAyNCAmIDB4ZmYsXG4gICAgICAgICAgbGVuZ3RoID4+PiAxNiAmIDB4ZmYsXG4gICAgICAgICAgbGVuZ3RoID4+PiA4ICYgMHhmZixcbiAgICAgICAgICBsZW5ndGggJiAweGZmXG4gICAgICAgIF0pLCBvZmZzZXQpO1xuICAgICAgICBvZmZzZXQgKz0gNDtcbiAgICAgICAgZGF0YS5zZXQobmFsLmJvZHksIG9mZnNldCk7XG4gICAgICAgIG9mZnNldCArPSBsZW5ndGg7XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBzYW1wbGUgPSBuZXcgVmlkZW9UcmFja1NhbXBsZSh7XG4gICAgICBkdHM6IHBhcnNlSW50KHBlcy5kdHMgLyA5MCksXG4gICAgICBwdHM6IHBhcnNlSW50KHBlcy5wdHMgLyA5MCksXG4gICAgICBjdHM6IChwZXMucHRzIC0gcGVzLmR0cykgLyA5MCxcbiAgICAgIG9yaWdpbkR0czogcGVzLmR0cyxcbiAgICAgIGlzS2V5ZnJhbWUsXG4gICAgICBkYXRhLFxuICAgICAgb3B0aW9uc1xuICAgIH0pXG4gICAgdHJhY2suc2FtcGxlcy5wdXNoKHNhbXBsZSk7XG4gIH1cblxuICBkZXN0b3J5ICgpIHtcbiAgICB0aGlzLm9mZihERU1VWF9FVkVOVFMuREVNVVhfU1RBUlQsIHRoaXMuZGVtdXgpO1xuICAgIHRoaXMuY29uZmlncyA9IHt9O1xuICAgIHRoaXMuZGVtdXhpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnBhdCA9IFtdO1xuICAgIHRoaXMucG10ID0gW107XG4gICAgdGhpcy5faGFzVmlkZW9NZXRhID0gZmFsc2U7XG4gICAgdGhpcy5faGFzQXVkaW9NZXRhID0gZmFsc2U7XG4gIH1cblxuICBzdGF0aWMgY29tcGFpcmVBcnJheSAoYSwgYiwgdHlwZSkge1xuICAgIGxldCBhbCA9IDA7XG4gICAgbGV0IGJsID0gMDtcbiAgICBpZiAodHlwZSA9PT0gJ1VpbnQ4QXJyYXknKSB7XG4gICAgICBhbCA9IGEuYnl0ZUxlbmd0aDtcbiAgICAgIGJsID0gYi5ieXRlTGVuZ3RoO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ0FycmF5Jykge1xuICAgICAgYWwgPSBhLmxlbmd0aDtcbiAgICAgIGJsID0gYi5sZW5ndGg7XG4gICAgfVxuICAgIGlmIChhbCAhPT0gYmwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFsOyBpKyspIHtcbiAgICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzdGF0aWMgY29tcGFpcmVNZXRhIChhLCBiLCBpZ25vcmVEdXJhdGlvbikge1xuICAgIGlmICghYSB8fCAhYikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwLCBrID0gT2JqZWN0LmtleXMoYSkubGVuZ3RoOyBpIDwgazsgaSsrKSB7XG4gICAgICBsZXQgaXRlbWEgPSBhW09iamVjdC5rZXlzKGEpW2ldXTtcbiAgICAgIGxldCBpdGVtYiA9IGJbT2JqZWN0LmtleXMoYSlbaV1dO1xuICAgICAgaWYgKHR5cGVvZiBpdGVtYSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKChpZ25vcmVEdXJhdGlvbiAmJiBPYmplY3Qua2V5cyhhKVtpXSAhPT0gJ2R1cmF0aW9uJyAmJiBPYmplY3Qua2V5cyhhKVtpXSAhPT0gJ3JlZlNhbXBsZUR1cmF0aW9uJyAmJiBPYmplY3Qua2V5cyhhKVtpXSAhPT0gJ3JlZlNhbXBsZUR1cmF0aW9uRml4ZWQnKSAmJiBpdGVtYSAhPT0gaXRlbWIpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXRlbWEuYnl0ZUxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChpdGVtYi5ieXRlTGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFUc0RlbXV4ZXIuY29tcGFpcmVBcnJheShpdGVtYSwgaXRlbWIsICdVaW50OEFycmF5JykpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXRlbWEubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGl0ZW1iLmxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghVHNEZW11eGVyLmNvbXBhaXJlQXJyYXkoaXRlbWEsIGl0ZW1iLCAnQXJyYXknKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCFUc0RlbXV4ZXIuY29tcGFpcmVNZXRhKGl0ZW1hLCBpdGVtYikpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzdGF0aWMgTWVyZ2UgKGJ1ZmZlcnMpIHtcbiAgICBsZXQgZGF0YTtcbiAgICBsZXQgbGVuZ3RoID0gMDtcbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1ZmZlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxlbmd0aCArPSAoYnVmZmVyc1tpXS5sZW5ndGggLSBidWZmZXJzW2ldLnBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBkYXRhID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1ZmZlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBidWZmZXIgPSBidWZmZXJzW2ldO1xuICAgICAgZGF0YS5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmZmVyLmJ1ZmZlciwgYnVmZmVyLnBvc2l0aW9uKSwgb2Zmc2V0KTtcbiAgICAgIG9mZnNldCArPSBidWZmZXIubGVuZ3RoIC0gYnVmZmVyLnBvc2l0aW9uO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFN0cmVhbShkYXRhLmJ1ZmZlcik7XG4gIH1cblxuICBzdGF0aWMgcmVhZCAoc3RyZWFtLCB0cywgZnJhZ3MpIHtcbiAgICBUc0RlbXV4ZXIucmVhZEhlYWRlcihzdHJlYW0sIHRzKTtcbiAgICBUc0RlbXV4ZXIucmVhZFBheWxvYWQoc3RyZWFtLCB0cywgZnJhZ3MpO1xuICAgIGlmICh0cy5oZWFkZXIucGFja2V0ID09PSAnTUVESUEnICYmIHRzLmhlYWRlci5wYXlsb2FkID09PSAxICYmICF0cy51bmtub3duUElEcykge1xuICAgICAgdHMucGVzID0gVHNEZW11eGVyLlBFUyh0cyk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHJlYWRQYXlsb2FkIChzdHJlYW0sIHRzLCBmcmFncykge1xuICAgIGxldCBoZWFkZXIgPSB0cy5oZWFkZXJcbiAgICBsZXQgcGlkID0gaGVhZGVyLnBpZDtcbiAgICBzd2l0Y2ggKHBpZCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBUc0RlbXV4ZXIuUEFUKHN0cmVhbSwgdHMsIGZyYWdzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIFRzRGVtdXhlci5DQVQoc3RyZWFtLCB0cywgZnJhZ3MpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgVHNEZW11eGVyLlRTRFQoc3RyZWFtLCB0cywgZnJhZ3MpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMHgxZmZmOlxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIFRPRE86IHNvbWXnmoTlhpnms5XkuI3lpKrlpb3vvIzlvpfmlLlcbiAgICAgICAgaWYgKGZyYWdzLnBhdC5zb21lKChpdGVtKSA9PiB7IHJldHVybiBpdGVtLnBpZCA9PT0gcGlkOyB9KSkge1xuICAgICAgICAgIFRzRGVtdXhlci5QTVQoc3RyZWFtLCB0cywgZnJhZ3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCBzdHMgPSBmcmFncy5wbXQgPyBmcmFncy5wbXQuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnBpZCA9PT0gcGlkKSA6IFtdO1xuICAgICAgICAgIGlmIChzdHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgVHNEZW11eGVyLk1lZGlhKHN0cmVhbSwgdHMsIFN0cmVhbVR5cGVbc3RzWzBdLnN0cmVhbVR5cGVdWzBdKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cy51bmtub3duUElEcyA9IHRydWU7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyByZWFkSGVhZGVyIChzdHJlYW0sIHRzKSB7XG4gICAgbGV0IGhlYWRlciA9IHt9O1xuICAgIGhlYWRlci5zeW5jID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIGxldCBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICBoZWFkZXIuZXJyb3IgPSBuZXh0ID4+PiAxNTtcbiAgICBoZWFkZXIucGF5bG9hZCA9IG5leHQgPj4+IDE0ICYgMTtcbiAgICBoZWFkZXIucHJpb3JpdHkgPSBuZXh0ID4+PiAxMyAmIDE7XG4gICAgaGVhZGVyLnBpZCA9IG5leHQgJiAweDFmZmY7XG5cbiAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuXG4gICAgaGVhZGVyLnNjcmFtYmxpbmcgPSBuZXh0ID4+IDYgJiAweDM7IC8vIOaYr+WQpuWKoOWvhu+8jDAw6KGo56S65LiN5Yqg5a+GXG5cbiAgICAvKipcbiAgICAgKiAwMCBJU08vSUVD5pyq5p2l5L2/55So5L+d55WZXG4gICAgICogMDEg5rKh5pyJ6LCD5pW05a2X5q6177yM5LuF5ZCr5pyJMTg0QuacieaViOWHgOiNt1xuICAgICAqIDAyIOayoeacieacieaViOWHgOiNt++8jOS7heWQq+aciTE4M0LosIPmlbTlrZfmrrVcbiAgICAgKiAwMyAwfjE4MkLosIPmlbTlrZfmrrXlkI7kuLrmnInmlYjlh4DojbdcbiAgICAgKi9cbiAgICBoZWFkZXIuYWRhcHRhdGlvbiA9IG5leHQgPj4gNCAmIDB4MztcbiAgICBoZWFkZXIuY29udGludWl0eSA9IG5leHQgJiAxNTtcbiAgICBoZWFkZXIucGFja2V0ID0gaGVhZGVyLnBpZCA9PT0gMCA/ICdQQVQnIDogJ01FRElBJztcbiAgICB0cy5oZWFkZXIgPSBoZWFkZXI7XG4gIH1cblxuICBzdGF0aWMgUEFUIChzdHJlYW0sIHRzLCBmcmFncykge1xuICAgIGxldCByZXQgPSB7fTtcbiAgICBsZXQgbmV4dCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICBzdHJlYW0uc2tpcChuZXh0KTtcbiAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHJldC50YWJlbElEID0gbmV4dDtcbiAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICByZXQuZXJyb3IgPSBuZXh0ID4+PiA3O1xuICAgIHJldC56ZXJvID0gbmV4dCA+Pj4gNiAmIDE7XG4gICAgcmV0LnNlY3Rpb25MZW5ndGggPSBuZXh0ICYgMHhmZmY7XG4gICAgcmV0LnN0cmVhbUlEID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICByZXQuY3VycmVudCA9IHN0cmVhbS5yZWFkVWludDgoKSAmIDE7XG4gICAgcmV0LnNlY3Rpb25OdW1iZXIgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgcmV0Lmxhc3RTZWN0aW9uTnVtYmVyID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIGxldCBOID0gKHJldC5zZWN0aW9uTGVuZ3RoIC0gOSkgLyA0O1xuICAgIGxldCBsaXN0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOOyBpKyspIHtcbiAgICAgIGxldCBwcm9ncmFtTnVtYmVyID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICAgIGxldCBwaWQgPSBzdHJlYW0ucmVhZFVpbnQxNigpICYgMHgxZmZmO1xuICAgICAgbGlzdC5wdXNoKHtcbiAgICAgICAgcHJvZ3JhbTogcHJvZ3JhbU51bWJlcixcbiAgICAgICAgcGlkLFxuICAgICAgICB0eXBlOiBwcm9ncmFtTnVtYmVyID09PSAwID8gJ25ldHdvcmsnIDogJ21hcFBJRCdcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAobGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICBmcmFncy5wYXQgPSBmcmFncy5wYXQuY29uY2F0KGxpc3QpO1xuICAgIH1cbiAgICByZXQubGlzdCA9IGxpc3Q7XG4gICAgcmV0LnByb2dyYW0gPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgIHJldC5waWQgPSBzdHJlYW0ucmVhZFVpbnQxNigpICYgMHgxZmZmO1xuICAgIHRzLnBheWxvYWQgPSByZXQ7XG4gICAgLy8gVE9ETyBDUkNcbiAgfVxuXG4gIHN0YXRpYyBQTVQgKHN0cmVhbSwgdHMsIGZyYWdzKSB7XG4gICAgbGV0IHJldCA9IHt9O1xuICAgIGxldCBoZWFkZXIgPSB0cy5oZWFkZXI7XG4gICAgaGVhZGVyLnBhY2tldCA9ICdQTVQnO1xuICAgIGxldCBuZXh0ID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHN0cmVhbS5za2lwKG5leHQpO1xuICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgcmV0LnRhYmxlSUQgPSBuZXh0O1xuICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgIHJldC5zZWN0aW9uTGVuZ3RoID0gbmV4dCAmIDB4ZmZmO1xuICAgIHJldC5wcm9ncmFtID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICByZXQuY3VycmVudCA9IHN0cmVhbS5yZWFkVWludDgoKSAmIDE7XG4gICAgcmV0Lm9yZGVyID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHJldC5sYXN0T3JkZXIgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgcmV0LlBDUl9QSUQgPSBzdHJlYW0ucmVhZFVpbnQxNigpICYgMHgxZmZmO1xuICAgIHJldC5wcm9ncmFtTGVuZ3RoID0gc3RyZWFtLnJlYWRVaW50MTYoKSAmIDB4ZmZmO1xuICAgIGxldCBOID0gKHJldC5zZWN0aW9uTGVuZ3RoIC0gMTMpIC8gNTtcbiAgICBsZXQgbGlzdCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTjsgaSsrKSB7XG4gICAgICBsaXN0LnB1c2goe1xuICAgICAgICBzdHJlYW1UeXBlOiBzdHJlYW0ucmVhZFVpbnQ4KCksXG4gICAgICAgIHBpZDogc3RyZWFtLnJlYWRVaW50MTYoKSAmIDB4MWZmZiwgLy8gMHgwN2U1IOinhumike+8jDB4MDdlNlxuICAgICAgICBlczogc3RyZWFtLnJlYWRVaW50MTYoKSAmIDB4ZmZmXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0Lmxpc3QgPSBsaXN0O1xuICAgIGlmICghdGhpcy5wbXQpIHtcbiAgICAgIHRoaXMucG10ID0gW107XG4gICAgfVxuICAgIGZyYWdzLnBtdCA9IHRoaXMucG10LmNvbmNhdChsaXN0Lm1hcCgoaXRlbSkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGlkOiBpdGVtLnBpZCxcbiAgICAgICAgZXM6IGl0ZW0uZXMsXG4gICAgICAgIHN0cmVhbVR5cGU6IGl0ZW0uc3RyZWFtVHlwZSxcbiAgICAgICAgcHJvZ3JhbTogcmV0LnByb2dyYW1cbiAgICAgIH07XG4gICAgfSkpO1xuICAgIHRzLnBheWxvYWQgPSByZXQ7XG4gIH1cblxuICBzdGF0aWMgTWVkaWEgKHN0cmVhbSwgdHMsIHR5cGUpIHtcbiAgICBsZXQgaGVhZGVyID0gdHMuaGVhZGVyO1xuICAgIGxldCBwYXlsb2FkID0ge307XG4gICAgaGVhZGVyLnR5cGUgPSB0eXBlO1xuICAgIGlmIChoZWFkZXIuYWRhcHRhdGlvbiA9PT0gMHgwMykge1xuICAgICAgcGF5bG9hZC5hZGFwdGF0aW9uTGVuZ3RoID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgICAgaWYgKHBheWxvYWQuYWRhcHRhdGlvbkxlbmd0aCA+IDApIHtcbiAgICAgICAgbGV0IG5leHQgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgICAgIHBheWxvYWQuZGlzY29udGludWUgPSBuZXh0ID4+PiA3O1xuICAgICAgICBwYXlsb2FkLmFjY2VzcyA9IG5leHQgPj4+IDYgJiAweDAxO1xuICAgICAgICBwYXlsb2FkLnByaW9yaXR5ID0gbmV4dCA+Pj4gNSAmIDB4MDE7XG4gICAgICAgIHBheWxvYWQuUENSID0gbmV4dCA+Pj4gNCAmIDB4MDE7XG4gICAgICAgIHBheWxvYWQuT1BDUiA9IG5leHQgPj4+IDMgJiAweDAxO1xuICAgICAgICBwYXlsb2FkLnNwbGljZVBvaW50ID0gbmV4dCA+Pj4gMiAmIDB4MDE7XG4gICAgICAgIHBheWxvYWQudHJhbnNwb3J0UHJpdmF0ZSA9IG5leHQgPj4+IDEgJiAweDAxO1xuICAgICAgICBwYXlsb2FkLmFkYXB0YXRpb25GaWVsZCA9IG5leHQgJiAweDAxO1xuICAgICAgICBsZXQgX3N0YXJ0ID0gc3RyZWFtLnBvc2l0aW9uO1xuICAgICAgICBpZiAocGF5bG9hZC5QQ1IgPT09IDEpIHtcbiAgICAgICAgICBwYXlsb2FkLnByb2dyYW1DbG9ja0Jhc2UgPSBzdHJlYW0ucmVhZFVpbnQzMigpIDw8IDE7XG4gICAgICAgICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgICAgICAgcGF5bG9hZC5wcm9ncmFtQ2xvY2tCYXNlIHw9IG5leHQgPj4+IDE1O1xuICAgICAgICAgIHBheWxvYWQucHJvZ3JhbUNsb2NrRXh0ZW5zaW9uID0gbmV4dCAmIDB4MWZmO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXlsb2FkLk9QQ1IgPT09IDEpIHtcbiAgICAgICAgICBwYXlsb2FkLm9yaWdpblByb2dyYW1DbG9ja0Jhc2UgPSBzdHJlYW0ucmVhZFVpbnQzMigpIDw8IDE7XG4gICAgICAgICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgICAgICAgcGF5bG9hZC5vcmlnaW5Qcm9ncmFtQ2xvY2tCYXNlICs9IG5leHQgPj4+IDE1O1xuICAgICAgICAgIHBheWxvYWQub3JpZ2luUHJvZ3JhbUNsb2NrRXh0ZW5zaW9uID0gbmV4dCAmIDB4MWZmO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXlsb2FkLnNwbGljZVBvaW50ID09PSAxKSB7XG4gICAgICAgICAgcGF5bG9hZC5zcGxpY2VDb3VudGRvd24gPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBheWxvYWQudHJhbnNwb3J0UHJpdmF0ZSA9PT0gMSkge1xuICAgICAgICAgIGxldCBsZW5ndGggPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgICAgICAgbGV0IHRyYW5zcG9ydFByaXZhdGVEYXRhID0gW107XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdHJhbnNwb3J0UHJpdmF0ZURhdGEucHVzaChzdHJlYW0ucmVhZFVpbnQ4KCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocGF5bG9hZC5hZGFwdGF0aW9uRmllbGQgPT09IDEpIHtcbiAgICAgICAgICBsZXQgbGVuZ3RoID0gc3RyZWFtLnJlYWRVaW50OCgpXG4gICAgICAgICAgbGV0IG5leHQgPSBzdHJlYW0ucmVhZFVpbnQ4KClcbiAgICAgICAgICBsZXQgc3RhcnQgPSBzdHJlYW0ucG9zaXRpb247XG4gICAgICAgICAgbGV0IGx0dyA9IG5leHQgPj4+IDc7XG4gICAgICAgICAgbGV0IHBpZWNld2lzZSA9IG5leHQgPj4+IDYgJiAweDE7XG4gICAgICAgICAgbGV0IHNlYW1sZXNzID0gbmV4dCA+Pj4gNSAmIDB4MTtcbiAgICAgICAgICBpZiAobHR3ID09PSAxKSB7XG4gICAgICAgICAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICAgIHBheWxvYWQubHR3VmFsaWQgPSBuZXh0ID4+PiAxNTtcbiAgICAgICAgICAgIHBheWxvYWQubHR3T2Zmc2V0ID0gbmV4dCAmIDB4ZWZmZjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHBpZWNld2lzZSA9PT0gMSkge1xuICAgICAgICAgICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDI0KCk7XG4gICAgICAgICAgICBwYXlsb2FkLnBpZWNld2lzZVJhdGUgPSBuZXh0ICYgMHgzZmZmZmY7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzZWFtbGVzcyA9PT0gMSkge1xuICAgICAgICAgICAgbmV4dCA9IHN0cmVhbS5yZWFkSW50OCgpO1xuICAgICAgICAgICAgcGF5bG9hZC5zcGxpY2VUeXBlID0gbmV4dCA+Pj4gNDtcbiAgICAgICAgICAgIHBheWxvYWQuZHRzTmV4dEFVMSA9IG5leHQgPj4+IDEgJiAweDc7XG4gICAgICAgICAgICBwYXlsb2FkLm1hcmtlcjEgPSBuZXh0ICYgMHgxO1xuICAgICAgICAgICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgICAgICAgICBwYXlsb2FkLmR0c05leHRBVTIgPSBuZXh0ID4+PiAxO1xuICAgICAgICAgICAgcGF5bG9hZC5tYXJrZXIyID0gbmV4dCAmIDB4MTtcbiAgICAgICAgICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgICAgICAgICAgcGF5bG9hZC5kdHNOZXh0QVUzID0gbmV4dDtcbiAgICAgICAgICB9XG4gICAgICAgICAgc3RyZWFtLnNraXAobGVuZ3RoIC0gMSAtIChzdHJlYW0ucG9zaXRpb24gLSBzdGFydCkpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBsYXN0U3R1ZmZpbmcgPSBwYXlsb2FkLmFkYXB0YXRpb25MZW5ndGggLSAxIC0gKHN0cmVhbS5wb3NpdGlvbiAtIF9zdGFydCk7XG4gICAgICAgIHN0cmVhbS5za2lwKGxhc3RTdHVmZmluZyk7XG4gICAgICB9XG4gICAgfVxuICAgIHBheWxvYWQuc3RyZWFtID0gbmV3IFN0cmVhbShzdHJlYW0uYnVmZmVyLnNsaWNlKHN0cmVhbS5wb3NpdGlvbikpO1xuICAgIHRzLnBheWxvYWQgPSBwYXlsb2FkO1xuICB9XG5cbiAgc3RhdGljIFBFUyAodHMpIHtcbiAgICBsZXQgcmV0ID0ge307XG4gICAgbGV0IGJ1ZmZlciA9IHRzLnBheWxvYWQuc3RyZWFtO1xuXG4gICAgbGV0IG5leHQgPSBidWZmZXIucmVhZFVpbnQyNCgpO1xuICAgIGlmIChuZXh0ICE9PSAxKSB7XG4gICAgICByZXQuRVMgPSB7fTtcbiAgICAgIHJldC5FUy5idWZmZXIgPSBidWZmZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBzdHJlYW1JRCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgIGlmIChzdHJlYW1JRCA+PSAweGUwICYmIHN0cmVhbUlEIDw9IDB4ZWYpIHtcbiAgICAgICAgcmV0LnR5cGUgPSAndmlkZW8nO1xuICAgICAgfVxuICAgICAgaWYgKHN0cmVhbUlEID49IDB4YzAgJiYgc3RyZWFtSUQgPD0gMHhkZikge1xuICAgICAgICByZXQudHlwZSA9ICdhdWRpbyc7XG4gICAgICB9XG4gICAgICBsZXQgcGFja2V0TGVuZ3RoID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgIHJldC5wYWNrZXRMZW5ndGggPSBwYWNrZXRMZW5ndGg7XG4gICAgICBpZiAocmV0LnR5cGUgPT09ICd2aWRlbycgfHwgcmV0LnR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgICAgbGV0IG5leHQgPSBidWZmZXIucmVhZFVpbnQ4KCk7XG4gICAgICAgIGxldCBmaXJzdCA9IG5leHQgPj4+IDY7XG4gICAgICAgIGlmIChmaXJzdCAhPT0gMHgwMikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZXJyb3Igd2hlbiBwYXJzZSBwZXMgaGVhZGVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgcmV0LnB0c0RUU0ZsYWcgPSBuZXh0ID4+PiA2O1xuICAgICAgICByZXQuZXNjckZsYWcgPSBuZXh0ID4+PiA1ICYgMHgwMTtcbiAgICAgICAgcmV0LmVzUmF0ZUZsYWcgPSBuZXh0ID4+PiA0ICYgMHgwMTtcbiAgICAgICAgcmV0LmRzbUZsYWcgPSBuZXh0ID4+PiAzICYgMHgwMTtcbiAgICAgICAgcmV0LmFkZGl0aW9uYWxGbGFnID0gbmV4dCA+Pj4gMiAmIDB4MDE7XG4gICAgICAgIHJldC5jcmNGbGFnID0gbmV4dCA+Pj4gMSAmIDB4MDE7XG4gICAgICAgIHJldC5leHRlbnNpb25GbGFnID0gbmV4dCAmIDB4MDE7XG4gICAgICAgIHJldC5wZXNIZWFkZXJMZW5ndGggPSBidWZmZXIucmVhZFVpbnQ4KCk7XG4gICAgICAgIGxldCBOMSA9IHJldC5wZXNIZWFkZXJMZW5ndGg7XG5cbiAgICAgICAgaWYgKHJldC5wdHNEVFNGbGFnID09PSAyKSB7XG4gICAgICAgICAgbGV0IHB0cyA9IFtdO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQ4KCk7XG4gICAgICAgICAgcHRzLnB1c2gobmV4dCA+Pj4gMSAmIDB4MDcpO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgICAgIHB0cy5wdXNoKG5leHQgPj4+IDEpO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgICAgIHB0cy5wdXNoKG5leHQgPj4+IDEpO1xuICAgICAgICAgIHJldC5wdHMgPSAocHRzWzBdIDw8IDMwIHwgcHRzWzFdIDw8IDE1IHwgcHRzWzJdKTtcbiAgICAgICAgICBOMSAtPSA1O1xuICAgICAgICAgIC8vIOinhumikeWmguaenOayoeaciWR0c+eUqHB0c1xuICAgICAgICAgIGlmIChyZXQudHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgICAgcmV0LmR0cyA9IHJldC5wdHM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChyZXQucHRzRFRTRmxhZyA9PT0gMykge1xuICAgICAgICAgIGxldCBwdHMgPSBbXTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICAgIHB0cy5wdXNoKG5leHQgPj4+IDEgJiAweDA3KTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBwdHMucHVzaChuZXh0ID4+PiAxKTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBwdHMucHVzaChuZXh0ID4+PiAxKTtcbiAgICAgICAgICByZXQucHRzID0gKHB0c1swXSA8PCAzMCB8IHB0c1sxXSA8PCAxNSB8IHB0c1syXSk7XG4gICAgICAgICAgbGV0IGR0cyA9IFtdO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQ4KCk7XG4gICAgICAgICAgZHRzLnB1c2gobmV4dCA+Pj4gMSAmIDB4MDcpO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgICAgIGR0cy5wdXNoKG5leHQgPj4+IDEpO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgICAgIGR0cy5wdXNoKG5leHQgPj4+IDEpO1xuICAgICAgICAgIHJldC5kdHMgPSAoZHRzWzBdIDw8IDMwIHwgZHRzWzFdIDw8IDE1IHwgZHRzWzJdKTtcbiAgICAgICAgICBOMSAtPSAxMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0LmVzY3JGbGFnID09PSAxKSB7XG4gICAgICAgICAgbGV0IGVzY3IgPSBbXVxuICAgICAgICAgIGxldCBleCA9IFtdO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQ4KCk7XG4gICAgICAgICAgZXNjci5wdXNoKG5leHQgPj4+IDMgJiAweDA3KTtcbiAgICAgICAgICBlc2NyLnB1c2gobmV4dCAmIDB4MDMpO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgICAgIGVzY3IucHVzaChuZXh0ID4+PiAxMyk7XG4gICAgICAgICAgZXNjci5wdXNoKG5leHQgJiAweDAzKTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBlc2NyLnB1c2gobmV4dCA+Pj4gMTMpO1xuICAgICAgICAgIGV4LnB1c2gobmV4dCAmIDB4MDMpO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQ4KCk7XG4gICAgICAgICAgZXgucHVzaChuZXh0ID4+PiAxKTtcbiAgICAgICAgICByZXQuZXNjciA9IChlc2NyWzBdIDw8IDMwIHwgZXNjclsxXSA8PCAyOCB8IGVzY3JbMl0gPDwgMTUgfCBlc2NyWzNdIDw8IDEzIHwgZXNjcls0XSkgKiAzMDAgKyAoZXhbMF0gPDwgNyB8IGV4WzFdKTtcbiAgICAgICAgICBOMSAtPSA2O1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXQuZXNSYXRlRmxhZyA9PT0gMSkge1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQyNCgpO1xuICAgICAgICAgIHJldC5lc1JhdGUgPSBuZXh0ID4+PiAxICYgMHgzZmZmZmY7XG4gICAgICAgICAgTjEgLT0gMztcbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0LmRzbUZsYWcgPT09IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBzdXBwb3J0IERTTV90cmlja19tb2RlJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldC5hZGRpdGlvbmFsRmxhZyA9PT0gMSkge1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQ4KCk7XG4gICAgICAgICAgcmV0LmFkZGl0aW9uYWxDb3B5SW5mbyA9IG5leHQgJiAweDdmO1xuICAgICAgICAgIE4xIC09IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldC5jcmNGbGFnID09PSAxKSB7XG4gICAgICAgICAgcmV0LnBlc0NSQyA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgTjEgLT0gMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0LmV4dGVuc2lvbkZsYWcgPT09IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBzdXBwb3J0IGV4dGVuc2lvbicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChOMSA+IDApIHtcbiAgICAgICAgICBidWZmZXIuc2tpcChOMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0LkVTID0gVHNEZW11eGVyLkVTKGJ1ZmZlciwgcmV0LnR5cGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdmb3JtYXQgaXMgbm90IHN1cHBvcnRlZCcpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgc3RhdGljIEVTIChidWZmZXIsIHR5cGUpIHtcbiAgICBsZXQgbmV4dDtcbiAgICBsZXQgcmV0ID0ge307XG4gICAgaWYgKHR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQzMigpO1xuICAgICAgaWYgKG5leHQgIT09IDEpIHtcbiAgICAgICAgYnVmZmVyLmJhY2soNCk7XG4gICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQyNCgpO1xuICAgICAgICBpZiAobmV4dCAhPT0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaDI2NCBuYWwgaGVhZGVyIHBhcnNlIGZhaWxlZCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBidWZmZXIuc2tpcCgyKTsvLyAwOSBGMFxuICAgICAgLy8gVE9ETyByZWFkbmFsdVxuICAgICAgcmV0LmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgLy8gYWR0c+eahOWQjOatpeWtl+iKgu+8jDEy5L2NXG4gICAgICBpZiAobmV4dCA+Pj4gNCAhPT0gMHhmZmYpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhYWMgRVMgcGFyc2UgRXJyb3InKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGZxID0gWzk2MDAwLCA4ODIwMCwgNjQwMDAsIDQ4MDAwLCA0NDEwMCwgMzIwMDAsIDI0MDAwLCAyMjA1MCwgMTYwMDAsIDEyMDAwLCAxMTAyNSwgODAwMCwgNzM1MF07XG4gICAgICByZXQuaWQgPSAobmV4dCA+Pj4gMyAmIDB4MDEpID09PSAwID8gJ01QRUctNCcgOiAnTVBFRy0yJztcbiAgICAgIHJldC5sYXllciA9IG5leHQgPj4+IDEgJiAweDAzO1xuICAgICAgcmV0LmFic2VudCA9IG5leHQgJiAweDAxO1xuICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICByZXQuYXVkaW9PYmplY3RUeXBlID0gKG5leHQgPj4+IDE0ICYgMHgwMykgKyAxO1xuICAgICAgcmV0LnByb2ZpbGUgPSByZXQuYXVkaW9PYmplY3RUeXBlIC0gMTtcbiAgICAgIHJldC5mcmVxdWVuY3lJbmRleCA9IG5leHQgPj4+IDEwICYgMHgwZjtcbiAgICAgIHJldC5mcmVxdWVuY2UgPSBmcVtyZXQuZnJlcXVlbmN5SW5kZXhdO1xuICAgICAgcmV0LmNoYW5uZWwgPSBuZXh0ID4+PiA2ICYgMHgwNztcbiAgICAgIHJldC5mcmFtZUxlbmd0aCA9IChuZXh0ICYgMHgwMykgPDwgMTEgfCAoYnVmZmVyLnJlYWRVaW50MTYoKSA+Pj4gNSk7XG4gICAgICBUc0RlbXV4ZXIuZ2V0QXVkaW9Db25maWcocmV0KTtcbiAgICAgIGJ1ZmZlci5za2lwKDEpO1xuICAgICAgcmV0LmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFUyAke3R5cGV9IGlzIG5vdCBzdXBwb3J0ZWRgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgc3RhdGljIFRTRFQgKHN0cmVhbSwgdHMsIGZyYWdzKSB7XG4gICAgLy8gVE9ET1xuICAgIHRzLnBheWxvYWQgPSB7fTtcbiAgfVxuXG4gIHN0YXRpYyBDQVQgKHN0cmVhbSwgdHMsIGZyYWdzKSB7XG4gICAgbGV0IHJldCA9IHt9XG4gICAgcmV0LnRhYmxlSUQgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgbGV0IG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgIHJldC5zZWN0aW9uSW5kaWNhdG9yID0gbmV4dCA+Pj4gNztcbiAgICByZXQuc2VjdGlvbkxlbmd0aCA9IG5leHQgJiAweDBmZmY7XG4gICAgc3RyZWFtLnNraXAoMik7XG4gICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICByZXQudmVyc2lvbiA9IG5leHQgPj4+IDM7XG4gICAgcmV0LmN1cnJlbnROZXh0SW5kaWNhdG9yID0gbmV4dCAmIDB4MDE7XG4gICAgcmV0LnNlY3Rpb25OdW1iZXIgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgcmV0Lmxhc3RTZWN0aW9uTnVtYmVyID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIGxldCBOID0gKHRoaXMuc2VjdGlvbkxlbmd0aCAtIDkpIC8gNDtcbiAgICBsZXQgbGlzdCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTjsgaSsrKSB7XG4gICAgICBsaXN0LnB1c2goe30pO1xuICAgIH1cbiAgICByZXQuY3JjMzIgPSBzdHJlYW0ucmVhZFVpbnQzMigpO1xuICAgIHRzLnBheWxvYWQgPSByZXQ7XG4gIH1cblxuICBzdGF0aWMgZ2V0QXVkaW9Db25maWcgKHJldCkge1xuICAgIGxldCB1c2VyQWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKClcbiAgICBsZXQgY29uZmlnO1xuICAgIGxldCBleHRlbnNpb25TYW1wbGVJbmRleDtcbiAgICBpZiAoL2ZpcmVmb3gvaS50ZXN0KHVzZXJBZ2VudCkpIHtcbiAgICAgIGlmIChyZXQuZnJlcXVlbmN5SW5kZXggPj0gNikge1xuICAgICAgICByZXQuYXVkaW9PYmplY3RUeXBlID0gNTtcbiAgICAgICAgY29uZmlnID0gbmV3IEFycmF5KDQpO1xuICAgICAgICBleHRlbnNpb25TYW1wbGVJbmRleCA9IHJldC5mcmVxdWVuY3lJbmRleCAtIDM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXQuYXVkaW9PYmplY3RUeXBlID0gMjtcbiAgICAgICAgY29uZmlnID0gbmV3IEFycmF5KDIpO1xuICAgICAgICBleHRlbnNpb25TYW1wbGVJbmRleCA9IHJldC5mcmVxdWVuY3lJbmRleDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHVzZXJBZ2VudC5pbmRleE9mKCdhbmRyb2lkJykgIT09IC0xKSB7XG4gICAgICByZXQuYXVkaW9PYmplY3RUeXBlID0gMjtcbiAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSgyKTtcbiAgICAgIGV4dGVuc2lvblNhbXBsZUluZGV4ID0gcmV0LmZyZXF1ZW5jeUluZGV4O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXQuYXVkaW9PYmplY3RUeXBlID0gNTtcbiAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSg0KTtcbiAgICAgIGlmIChyZXQuZnJlcXVlbmN5SW5kZXggPj0gNikge1xuICAgICAgICBleHRlbnNpb25TYW1wbGVJbmRleCA9IHJldC5mcmVxdWVuY3lJbmRleCAtIDM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocmV0LmNoYW5uZWwgPT09IDEpIHtcbiAgICAgICAgICByZXQuYXVkaW9PYmplY3RUeXBlID0gMjtcbiAgICAgICAgICBjb25maWcgPSBuZXcgQXJyYXkoMik7XG4gICAgICAgIH1cbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxlSW5kZXggPSByZXQuZnJlcXVlbmN5SW5kZXg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uZmlnWzBdID0gcmV0LmF1ZGlvT2JqZWN0VHlwZSA8PCAzO1xuICAgIGNvbmZpZ1swXSB8PSAocmV0LmZyZXF1ZW5jeUluZGV4ICYgMHgwZSkgPj4gMTtcbiAgICBjb25maWdbMV0gPSAocmV0LmZyZXF1ZW5jeUluZGV4ICYgMHgwMSkgPDwgNztcbiAgICBjb25maWdbMV0gfD0gcmV0LmNoYW5uZWwgPDwgMztcbiAgICBpZiAocmV0LmF1ZGlvT2JqZWN0VHlwZSA9PT0gNSkge1xuICAgICAgY29uZmlnWzFdIHw9IChleHRlbnNpb25TYW1wbGVJbmRleCAmIDB4MGUpID4+IDE7XG4gICAgICBjb25maWdbMl0gPSAoZXh0ZW5zaW9uU2FtcGxlSW5kZXggJiAweDAxKSA8PCA3O1xuICAgICAgY29uZmlnWzJdIHw9IDIgPDwgMjtcbiAgICAgIGNvbmZpZ1szXSA9IDA7XG4gICAgfVxuICAgIHJldC5hdWRpb0NvbmZpZyA9IGNvbmZpZztcbiAgfVxuXG4gIGdldCBpbnB1dEJ1ZmZlciAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UodGhpcy5jb25maWdzLmlucHV0YnVmZmVyKTtcbiAgfVxuXG4gIGdldCBfdHJhY2tzICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHNEZW11eGVyO1xuIiwiY2xhc3MgUGxheWxpc3Qge1xuICBjb25zdHJ1Y3RvciAoY29uZmlncykge1xuICAgIHRoaXMuX2Jhc2VVUkwgPSAnJztcbiAgICB0aGlzLl9saXN0ID0ge307XG4gICAgdGhpcy5fdHMgPSB7fTtcbiAgICB0aGlzLnZlcnNpb24gPSAwO1xuICAgIHRoaXMuc2VxdWVuY2UgPSAtMTtcbiAgICB0aGlzLnRhcmdldGR1cmF0aW9uID0gMDtcbiAgICB0aGlzLmR1cmF0aW9uID0gMDtcbiAgICB0aGlzLmZyYWdMZW5ndGggPSAwO1xuICAgIHRoaXMuX2xhc3RnZXQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fYXVkb2NsZWFyID0gY29uZmlncy5hdXRvY2xlYXIgfHwgZmFsc2U7XG4gIH1cblxuICBnZXQgbGlzdCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpc3Q7XG4gIH1cblxuICBzZXQgYmFzZVVSTCAoYmFzZVVSTCkge1xuICAgIGlmICh0aGlzLmJhc2VVUkwgIT09IGJhc2VVUkwpIHtcbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgIHRoaXMuX2Jhc2VVUkwgPSBiYXNlVVJMO1xuICAgIH1cbiAgfVxuXG4gIGdldCBiYXNlVVJMICgpIHtcbiAgICByZXR1cm4gdGhpcy5fYmFzZVVSTDtcbiAgfVxuXG4gIHB1c2ggKHRzLCBkdXJhdGlvbiwgZGlzY29udGludWUpIHtcbiAgICBpZiAoIXRoaXMuX3RzW3RzXSkge1xuICAgICAgdGhpcy5fdHNbdHNdID0ge2R1cmF0aW9uOiBkdXJhdGlvbiwgXG4gICAgICAgIGRvd25sb2FkZWQ6IGZhbHNlLCBcbiAgICAgICAgZG93bmxvYWRpbmc6IGZhbHNlLCBcbiAgICAgICAgc3RhcnQ6IHRoaXMuZHVyYXRpb24sIFxuICAgICAgICBkaXNjb250aW51ZTogZGlzY29udGludWUgPyB0cnVlOiBmYWxzZVxuICAgICAgfTtcbiAgICAgIHRoaXMuX2xpc3RbdGhpcy5kdXJhdGlvbl0gPSB0cztcbiAgICAgIHRoaXMuZHVyYXRpb24gKz0gZHVyYXRpb247XG4gICAgICB0aGlzLmZyYWdMZW5ndGggKz0gMTtcbiAgICB9XG4gIH1cblxuICBkZWxldGVGcmFnICh1cmwpIHtcbiAgICBpZiAodGhpcy5fdHNbdXJsXSkge1xuICAgICAgaWYgKHRoaXMuX3RzW3VybF0uc3RhcnQgPiB0aGlzLl9sYXN0Z2V0LnRpbWUpIHtcbiAgICAgICAgdGhpcy5fbGFzdGdldCA9IHtcbiAgICAgICAgICBkdXJhdGlvbjogdGhpcy5fdHNbdXJsXS5kdXJhdGlvbixcbiAgICAgICAgICB0aW1lOiB0aGlzLl90c1t1cmxdLnN0YXJ0LFxuICAgICAgICAgIGRvd25sb2FkZWQ6IGZhbHNlLFxuICAgICAgICAgIGRvd25sb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICB1cmw6IHVybFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBkZWxldGUgdGhpcy5fbGlzdFt0aGlzLl90c1t1cmxdLnN0YXJ0XTtcbiAgICAgIGRlbGV0ZSB0aGlzLl90c1t1cmxdO1xuICAgICAgdGhpcy5mcmFnTGVuZ3RoIC09IDE7XG4gICAgfVxuICB9XG5cbiAgcHVzaE0zVTggKGRhdGEsIGRlbGV0ZXByZSkge1xuICAgIC8vIOW4uOinhOS/oeaBr+abv+aNolxuICAgIGlmICghZGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBObyBtM3U4IGRhdGEgcmVjZWl2ZWQuYCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudmVyc2lvbiA9IGRhdGEudmVyc2lvbjtcbiAgICB0aGlzLnRhcmdldGR1cmF0aW9uID0gZGF0YS50YXJnZXRkdXJhdGlvbjtcbiAgICBpZihkYXRhLmVuY3J5cHQgJiYgIXRoaXMuZW5jcnlwdCkge1xuICAgICAgdGhpcy5lbmNyeXB0ID0gZGF0YS5lbmNyeXB0O1xuICAgIH1cbiAgICAvLyDmlrDliIbniYfkv6Hmga9cbiAgICBpZiAoZGF0YS5zZXF1ZW5jZSA+IHRoaXMuc2VxdWVuY2UpIHtcbiAgICAgIHRoaXMuc2VxdWVuY2UgPSBkYXRhLnNlcXVlbmNlO1xuICAgICAgbGV0IG5ld2ZyYWdsaXN0ID0gW11cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5mcmFncy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgZnJhZyA9IGRhdGEuZnJhZ3NbaV07XG4gICAgICAgIGlmICghdGhpcy5fdHNbZnJhZy51cmxdKSB7XG4gICAgICAgICAgbmV3ZnJhZ2xpc3QucHVzaChmcmFnLnVybClcbiAgICAgICAgICB0aGlzLnB1c2goZnJhZy51cmwsIGZyYWcuZHVyYXRpb24sIGZyYWcuZGlzY29udGludWUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmKG5ld2ZyYWdsaXN0Lmxlbmd0aCA8IDEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW4gbm90IHJlYWQgdHMgZmlsZSBsaXN0LmApO1xuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAoZGVsZXRlcHJlKSB7XG4gICAgICAgIGxldCB0c2xpc3QgPSB0aGlzLmdldFRzTGlzdCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRzbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChuZXdmcmFnbGlzdC5pbmRleE9mKHRzbGlzdFtpXSkgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLmRlbGV0ZUZyYWcodHNsaXN0W2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBPbGQgbTN1OCBmaWxlIHJlY2VpdmVkLCAke2RhdGEuc2VxdWVuY2V9YCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0VHNMaXN0ICgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5fdHMpO1xuICB9XG5cbiAgZG93bmxvYWRlZCAodHNuYW1lLCBpc2xvYWRlZCkge1xuICAgIGxldCB0cyA9IHRoaXMuX3RzW3RzbmFtZV07XG4gICAgaWYgKHRzKSB7XG4gICAgICB0cy5kb3dubG9hZGVkID0gaXNsb2FkZWRcbiAgICB9XG4gIH1cblxuICBkb3dubG9hZGluZyAodHNuYW1lLCBsb2FkaW5nKSB7XG4gICAgbGV0IHRzID0gdGhpcy5fdHNbdHNuYW1lXTtcbiAgICBpZiAodHMpIHtcbiAgICAgIHRzLmRvd25sb2FkaW5nID0gbG9hZGluZ1xuICAgIH1cbiAgfVxuXG4gIGdldFRzQnlOYW1lIChuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RzW25hbWVdO1xuICB9XG5cbiAgZ2V0VHMgKHRpbWUpIHtcbiAgICBsZXQgdGltZWxpc3QgPSBPYmplY3Qua2V5cyh0aGlzLl9saXN0KTtcbiAgICBsZXQgdHM7XG5cbiAgICBpZiAodGltZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAodGhpcy5fbGFzdGdldCkge1xuICAgICAgICB0aW1lID0gdGhpcy5fbGFzdGdldC50aW1lICsgdGhpcy5fbGFzdGdldC5kdXJhdGlvbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRpbWUgPSAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aW1lbGlzdC5sZW5ndGggPCAxIHx8IHRpbWUgPj0gdGhpcy5kdXJhdGlvbikge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdGltZWxpc3Quc29ydCgoYSwgYikgPT4ge1xuICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoYSkgLSBwYXJzZUZsb2F0KGIpXG4gICAgfSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aW1lbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHRpbWUgPj0gcGFyc2VJbnQodGltZWxpc3RbaV0pKSB7XG4gICAgICAgIGxldCB1cmwgPSB0aGlzLl9saXN0W3RpbWVsaXN0W2ldXTtcbiAgICAgICAgbGV0IGRvd25sb2FkZWQgPSB0aGlzLl90c1t1cmxdLmRvd25sb2FkZWQ7XG4gICAgICAgIGxldCBkb3dubG9hZGluZyA9IHRoaXMuX3RzW3VybF0uZG93bmxvYWRpbmc7XG4gICAgICAgIHRzID0ge3VybCwgZG93bmxvYWRlZCwgZG93bmxvYWRpbmcsIHRpbWU6IHBhcnNlSW50KHRpbWVsaXN0W2ldKSwgZHVyYXRpb246IHBhcnNlSW50KHRoaXMuX3RzW3VybF0uZHVyYXRpb24pfTtcbiAgICAgICAgaWYgKHRoaXMuYXV0b2NsZWFyKSB7XG4gICAgICAgICAgZGVsZXRlIHRoaXMuX3RzW3RoaXMuX2xhc3RnZXQudXJsXTtcbiAgICAgICAgICBkZWxldGUgdGhpcy5fbGlzdFt0aGlzLl9sYXN0Z2V0LnRpbWVdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xhc3RnZXQgPSB0cztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHM7XG4gIH1cblxuICBjbGVhciAoKSB7XG4gICAgdGhpcy5fYmFzZVVSTCA9ICcnO1xuICAgIHRoaXMuX2xpc3QgPSB7fTtcbiAgICB0aGlzLl90cyA9IHt9O1xuICAgIHRoaXMudmVyc2lvbiA9IDA7XG4gICAgdGhpcy5zZXF1ZW5jZSA9IC0xO1xuICAgIHRoaXMudGFyZ2V0ZHVyYXRpb24gPSAwO1xuICAgIHRoaXMuZHVyYXRpb24gPSAwO1xuICB9XG5cbiAgY2xlYXJEb3dubG9hZGVkICgpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IE9iamVjdC5rZXlzKHRoaXMuX3RzKS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGxldCB0cyA9IHRoaXMuX3RzW09iamVjdC5rZXlzKHRoaXMuX3RzKVtpXV07XG4gICAgICB0cy5kb3dubG9hZGVkID0gZmFsc2U7XG4gICAgICB0cy5kb3dubG9hZGluZyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuX2Jhc2VVUkwgPSAnJztcbiAgICB0aGlzLl9saXN0ID0ge307XG4gICAgdGhpcy5fdHMgPSB7fTtcbiAgICB0aGlzLnZlcnNpb24gPSAwO1xuICAgIHRoaXMuc2VxdWVuY2UgPSAtMTtcbiAgICB0aGlzLnRhcmdldGR1cmF0aW9uID0gMDtcbiAgICB0aGlzLmR1cmF0aW9uID0gMDtcbiAgICB0aGlzLmZyYWdMZW5ndGggPSAwO1xuICAgIHRoaXMuX2xhc3RnZXQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fYXVkb2NsZWFyID0gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWxpc3Q7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgRmV0Y2hMb2FkZXI6IHJlcXVpcmUoJy4vc3JjL2ZldGNoLWxvYWRlcicpLmRlZmF1bHRcbn07XG4iLCJpbXBvcnQgeyBFVkVOVFMgfSBmcm9tICd4Z3BsYXllci11dGlscyc7XG5cbmNvbnN0IExPQURFUl9FVkVOVFMgPSBFVkVOVFMuTE9BREVSX0VWRU5UUztcbmNvbnN0IFJFQURfU1RSRUFNID0gMDtcbmNvbnN0IFJFQURfVEVYVCA9IDE7XG5jb25zdCBSRUFEX0pTT04gPSAyO1xuY29uc3QgUkVBRF9CVUZGRVIgPSAzO1xuY2xhc3MgRmV0Y2hMb2FkZXIge1xuICBjb25zdHJ1Y3RvciAoY29uZmlncykge1xuICAgIHRoaXMuY29uZmlncyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZ3MpO1xuICAgIHRoaXMudXJsID0gbnVsbFxuICAgIHRoaXMuc3RhdHVzID0gMFxuICAgIHRoaXMuZXJyb3IgPSBudWxsXG4gICAgdGhpcy5fcmVhZGVyID0gbnVsbDtcbiAgICB0aGlzLl9jYW5jZWxlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2Rlc3Ryb3llZCA9IGZhbHNlO1xuICAgIHRoaXMucmVhZHR5cGUgPSB0aGlzLmNvbmZpZ3MucmVhZHR5cGU7XG4gICAgdGhpcy5idWZmZXIgPSB0aGlzLmNvbmZpZ3MuYnVmZmVyIHx8ICdMT0FERVJfQlVGRkVSJztcbiAgICB0aGlzLl9sb2FkZXJUYXNrTm8gPSAwO1xuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgdGhpcy5vbihMT0FERVJfRVZFTlRTLkxBREVSX1NUQVJULCB0aGlzLmxvYWQuYmluZCh0aGlzKSlcbiAgfVxuXG4gIHN0YXRpYyBnZXQgdHlwZSAoKSB7XG4gICAgcmV0dXJuICdsb2FkZXInXG4gIH1cblxuICBsb2FkICh1cmwsIG9wdHMpIHtcbiAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgIHRoaXMudXJsID0gdXJsO1xuICAgIHRoaXMuX2NhbmNlbGVkID0gZmFsc2U7XG5cbiAgICAvLyBUT0RPOiBBZGQgUmFuZ2VzXG4gICAgbGV0IHBhcmFtcyA9IHRoaXMuZ2V0UGFyYW1zKG9wdHMpXG4gICAgX3RoaXMubG9hZGluZyA9IHRydWVcbiAgICByZXR1cm4gZmV0Y2godGhpcy51cmwsIHBhcmFtcykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICBfdGhpcy5zdGF0dXMgPSByZXNwb25zZS5zdGF0dXNcbiAgICAgICAgcmV0dXJuIF90aGlzLl9vbkZldGNoUmVzcG9uc2UocmVzcG9uc2UpO1xuICAgICAgfVxuICAgICAgX3RoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9FUlJPUiwgX3RoaXMuVEFHLCBuZXcgRXJyb3IoYGludmFsaWQgcmVzcG9uc2UuYCkpO1xuICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikgIHtcbiAgICAgIF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfRVJST1IsIF90aGlzLlRBRywgZXJyb3IpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yLm1lc3NhZ2UpXG4gICAgfSlcbiAgfVxuXG4gIF9vbkZldGNoUmVzcG9uc2UgKHJlc3BvbnNlKSB7XG4gICAgbGV0IF90aGlzID0gdGhpcztcbiAgICBsZXQgYnVmZmVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSh0aGlzLmJ1ZmZlcik7XG4gICAgdGhpcy5fbG9hZGVyVGFza05vKys7XG4gICAgbGV0IHRhc2tubyA9IHRoaXMuX2xvYWRlclRhc2tObztcbiAgICBpZiAocmVzcG9uc2Uub2sgPT09IHRydWUpIHtcbiAgICAgIHN3aXRjaCAodGhpcy5yZWFkdHlwZSkge1xuICAgICAgICBjYXNlIFJFQURfSlNPTjpcbiAgICAgICAgICByZXNwb25zZS5qc29uKCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgX3RoaXMubG9hZGluZyA9IGZhbHNlXG4gICAgICAgICAgICBpZiAoIV90aGlzLl9jYW5jZWxlZCAmJiAhX3RoaXMuX2Rlc3Ryb3llZCkge1xuICAgICAgICAgICAgICBpZiAoYnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgYnVmZmVyLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9DT01QTEVURSwgYnVmZmVyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0NPTVBMRVRFLCBkYXRhKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFJFQURfVEVYVDpcbiAgICAgICAgICByZXNwb25zZS50ZXh0KCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgX3RoaXMubG9hZGluZyA9IGZhbHNlXG4gICAgICAgICAgICBpZiAoIV90aGlzLl9jYW5jZWxlZCAmJiAhX3RoaXMuX2Rlc3Ryb3llZCkge1xuICAgICAgICAgICAgICBpZiAoYnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgYnVmZmVyLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9DT01QTEVURSwgYnVmZmVyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0NPTVBMRVRFLCBkYXRhKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFJFQURfQlVGRkVSOlxuICAgICAgICAgIHJlc3BvbnNlLmFycmF5QnVmZmVyKCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgX3RoaXMubG9hZGluZyA9IGZhbHNlXG4gICAgICAgICAgICBpZiAoIV90aGlzLl9jYW5jZWxlZCAmJiAhX3RoaXMuX2Rlc3Ryb3llZCkge1xuICAgICAgICAgICAgICBpZiAoYnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgYnVmZmVyLnB1c2gobmV3IFVpbnQ4QXJyYXkoZGF0YSkpO1xuICAgICAgICAgICAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsIGJ1ZmZlcik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9DT01QTEVURSwgZGF0YSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBSRUFEX1NUUkVBTTpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gdGhpcy5fb25SZWFkZXIocmVzcG9uc2UuYm9keS5nZXRSZWFkZXIoKSwgdGFza25vKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfb25SZWFkZXIgKHJlYWRlciwgdGFza25vKSB7XG4gICAgbGV0IGJ1ZmZlciA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UodGhpcy5idWZmZXIpO1xuICAgIGlmICgoIWJ1ZmZlciAmJiB0aGlzLl9yZWFkZXIpIHx8IHRoaXMuX2Rlc3Ryb3llZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5fcmVhZGVyLmNhbmNlbCgpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIERPIE5PVEhJTkdcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9yZWFkZXIgPSByZWFkZXJcbiAgICBpZiAodGhpcy5sb2FkaW5nID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IF90aGlzID0gdGhpc1xuICAgIC8vIHJlYWRlciByZWFkIGZ1bmN0aW9uIHJldHVybnMgYSBQcm9taXNlLiBnZXQgZGF0YSB3aGVuIGNhbGxiYWNrIGFuZCBoYXMgdmFsdWUuZG9uZSB3aGVuIGRpc2Nvbm5lY3RlZC5cbiAgICAvLyByZWFk5pa55rOV6L+U5Zue5LiA5LiqUHJvbWlzZS4g5Zue6LCD5Lit5Y+v5Lul6I635Y+W5Yiw5pWw5o2u44CC5b2TdmFsdWUuZG9uZeWtmOWcqOaXtu+8jOivtOaYjumTvuaOpeaWreW8gOOAglxuICAgIHRoaXMuX3JlYWRlciAmJiB0aGlzLl9yZWFkZXIucmVhZCgpLnRoZW4oZnVuY3Rpb24gKHZhbCkge1xuICAgICAgaWYgKHZhbC5kb25lKSB7XG4gICAgICAgIC8vIFRPRE86IOWujOaIkOWkhOeQhlxuICAgICAgICBfdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgICAgX3RoaXMuc3RhdHVzID0gMDtcbiAgICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9DT01QTEVURSwgYnVmZmVyKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKF90aGlzLl9jYW5jZWxlZCB8fCBfdGhpcy5fZGVzdHJveWVkKSB7XG4gICAgICAgIGlmICAoX3RoaXMuX3JlYWRlcikge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBfdGhpcy5fcmVhZGVyLmNhbmNlbCgpXG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gRE8gTk9USElOR1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGJ1ZmZlci5wdXNoKHZhbC52YWx1ZSlcbiAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfREFUQUxPQURFRCwgYnVmZmVyKVxuICAgICAgcmV0dXJuIF90aGlzLl9vblJlYWRlcihyZWFkZXIsIHRhc2tubylcbiAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfRVJST1IsIF90aGlzLlRBRywgZXJyb3IpO1xuICAgIH0pXG4gIH1cblxuICBnZXRQYXJhbXMgKG9wdHMpIHtcbiAgICBsZXQgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdHMpXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpXG5cbiAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICBtb2RlOiAnY29ycycsXG4gICAgICBjYWNoZTogJ2RlZmF1bHQnXG4gICAgfVxuXG4gICAgLy8gYWRkIGN1c3Rtb3IgaGVhZGVyc1xuICAgIC8vIOa3u+WKoOiHquWumuS5ieWktFxuICAgIGlmICh0eXBlb2YgdGhpcy5jb25maWdzLmhlYWRlcnMgPT09ICdvYmplY3QnKSB7XG4gICAgICBsZXQgY29uZmlnSGVhZGVycyA9IHRoaXMuY29uZmlncy5oZWFkZXJzXG4gICAgICBmb3IgKGxldCBrZXkgaW4gY29uZmlnSGVhZGVycykge1xuICAgICAgICBpZiAoY29uZmlnSGVhZGVycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgaGVhZGVycy5hcHBlbmQoa2V5LCBjb25maWdIZWFkZXJzW2tleV0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuaGVhZGVycyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGxldCBvcHRIZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzXG4gICAgICBmb3IgKGxldCBrZXkgaW4gb3B0SGVhZGVycykge1xuICAgICAgICBpZiAob3B0SGVhZGVycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgaGVhZGVycy5hcHBlbmQoa2V5LCBvcHRIZWFkZXJzW2tleV0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5jb3JzID09PSBmYWxzZSkge1xuICAgICAgcGFyYW1zLm1vZGUgPSAnc2FtZS1vcmlnaW4nXG4gICAgfVxuXG4gICAgLy8gd2l0aENyZWRlbnRpYWxzIGlzIGRpc2FibGVkIGJ5IGRlZmF1bHRcbiAgICAvLyB3aXRoQ3JlZGVudGlhbHMg5Zyo6buY6K6k5oOF5Ya15LiL5LiN6KKr5L2/55So44CCXG4gICAgaWYgKG9wdGlvbnMud2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICBwYXJhbXMuY3JlZGVudGlhbHMgPSAnaW5jbHVkZSdcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBBZGQgcmFuZ2VzO1xuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICBjYW5jZWwgKCkge1xuICAgIGlmICh0aGlzLl9yZWFkZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuX3JlYWRlci5jYW5jZWwoKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyDpmLLmraJmYWlsZWQ6IDIwMOmUmeivr+iiq+aJk+WNsOWIsOaOp+WItuWPsOS4ilxuICAgICAgfVxuICAgICAgdGhpcy5fcmVhZGVyID0gbnVsbFxuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgIHRoaXMuX2NhbmNlbGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLl9kZXN0cm95ZWQgPSB0cnVlXG4gICAgdGhpcy5jYW5jZWwoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBGZXRjaExvYWRlclxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIE1wNFJlbXV4ZXI6IHJlcXVpcmUoJy4vc3JjL21wNCcpLmRlZmF1bHRcbn07XG4iLCJpbXBvcnQgeyBCdWZmZXIgfSBmcm9tICd4Z3BsYXllci11dGlscyc7XG5cbi8vIGNvbnN0IFVJTlQzMl9NQVggPSBNYXRoLnBvdygyLCAzMikgLSAxO1xuY2xhc3MgRm1wNCB7XG4gIHN0YXRpYyBzaXplICh2YWx1ZSkge1xuICAgIHJldHVybiBCdWZmZXIud3JpdGVVaW50MzIodmFsdWUpXG4gIH1cbiAgc3RhdGljIGluaXRCb3ggKHNpemUsIG5hbWUsIC4uLmNvbnRlbnQpIHtcbiAgICBjb25zdCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKHNpemUpLCBGbXA0LnR5cGUobmFtZSksIC4uLmNvbnRlbnQpXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgZXh0ZW5zaW9uICh2ZXJzaW9uLCBmbGFnKSB7XG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFtcbiAgICAgIHZlcnNpb24sXG4gICAgICAoZmxhZyA+PiAxNikgJiAweGZmLFxuICAgICAgKGZsYWcgPj4gOCkgJiAweGZmLFxuICAgICAgZmxhZyAmIDB4ZmZcbiAgICBdKVxuICB9XG4gIHN0YXRpYyBmdHlwICgpIHtcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDI0LCAnZnR5cCcsIG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4NjksIDB4NzMsIDB4NkYsIDB4NkQsIC8vIGlzb20sXG4gICAgICAweDAsIDB4MCwgMHgwMCwgMHgwMSwgLy8gbWlub3JfdmVyc2lvbjogMHgwMVxuICAgICAgMHg2OSwgMHg3MywgMHg2RiwgMHg2RCwgLy8gaXNvbVxuICAgICAgMHg2MSwgMHg3NiwgMHg2MywgMHgzMSAvLyBhdmMxXG4gICAgXSkpXG4gIH1cbiAgc3RhdGljIG1vb3YgKHsgdHlwZSwgbWV0YSB9KSB7XG4gICAgbGV0IHNpemUgPSA4XG4gICAgbGV0IG12aGQgPSBGbXA0Lm12aGQobWV0YS5kdXJhdGlvbiwgbWV0YS50aW1lc2NhbGUpXG4gICAgbGV0IHRyYWtcblxuICAgIGlmICh0eXBlID09PSAndmlkZW8nKSB7XG4gICAgICB0cmFrID0gRm1wNC52aWRlb1RyYWsobWV0YSlcbiAgICB9IGVsc2Uge1xuICAgICAgdHJhayA9IEZtcDQuYXVkaW9UcmFrKG1ldGEpXG4gICAgfVxuXG4gICAgbGV0IG12ZXggPSBGbXA0Lm12ZXgobWV0YS5kdXJhdGlvbiwgbWV0YS50aW1lc2NhbGUgfHwgMTAwMCwgbWV0YS5pZCk7XG4gICAgW212aGQsIHRyYWssIG12ZXhdLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aFxuICAgIH0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveChzaXplLCAnbW9vdicsIG12aGQsIHRyYWssIG12ZXgpXG4gIH1cbiAgc3RhdGljIG12aGQgKGR1cmF0aW9uLCB0aW1lc2NhbGUgPSAxMDAwKSB7XG4gICAgLy8gZHVyYXRpb24gKj0gdGltZXNjYWxlO1xuICAgIGxldCBieXRlcyA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHZlcnNpb24oMCkgKyBmbGFncyAgICAgMeS9jeeahGJveOeJiOacrCsz5L2NZmxhZ3MgICBib3jniYjmnKzvvIww5oiWMe+8jOS4gOiIrOS4ujDjgILvvIjku6XkuIvlrZfoioLmlbDlnYfmjIl2ZXJzaW9uPTDvvIlcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGNyZWF0aW9uX3RpbWUgICAg5Yib5bu65pe26Ze0ICDvvIjnm7jlr7nkuo5VVEPml7bpl7QxOTA0LTAxLTAx6Zu254K555qE56eS5pWw77yJXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBtb2RpZmljYXRpb25fdGltZSAgIOS/ruaUueaXtumXtFxuXG4gICAgICAvKipcbiAgICAgICAgICAgICAqIHRpbWVzY2FsZTogNCBieXRlc+aWh+S7tuWqkuS9k+WcqDHnp5Lml7bpl7TlhoXnmoTliLvluqblgLzvvIzlj6/ku6XnkIbop6PkuLox56eS6ZW/5bqmXG4gICAgICAgICAgICAgKi9cbiAgICAgICh0aW1lc2NhbGUgPj4+IDI0KSAmIDB4RkYsXG4gICAgICAodGltZXNjYWxlID4+PiAxNikgJiAweEZGLFxuICAgICAgKHRpbWVzY2FsZSA+Pj4gOCkgJiAweEZGLFxuICAgICAgKHRpbWVzY2FsZSkgJiAweEZGLFxuXG4gICAgICAvKipcbiAgICAgICAgICAgICAqIGR1cmF0aW9uOiA0IGJ5dGVz6K+ldHJhY2vnmoTml7bpl7Tplb/luqbvvIznlKhkdXJhdGlvbuWSjHRpbWUgc2NhbGXlgLzlj6/ku6XorqHnrpd0cmFja+aXtumVv++8jOavlOWmgmF1ZGlvIHRyYWNr55qEdGltZSBzY2FsZSA9IDgwMDAsXG4gICAgICAgICAgICAgKiBkdXJhdGlvbiA9IDU2MDEyOO+8jOaXtumVv+S4ujcwLjAxNu+8jHZpZGVvIHRyYWNr55qEdGltZSBzY2FsZSA9IDYwMCwgZHVyYXRpb24gPSA0MjAwMO+8jOaXtumVv+S4ujcwXG4gICAgICAgICAgICAgKi9cbiAgICAgIChkdXJhdGlvbiA+Pj4gMjQpICYgMHhGRixcbiAgICAgIChkdXJhdGlvbiA+Pj4gMTYpICYgMHhGRixcbiAgICAgIChkdXJhdGlvbiA+Pj4gOCkgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uKSAmIDB4RkYsXG4gICAgICAweDAwLCAweDAxLCAweDAwLCAweDAwLCAvLyBQcmVmZXJyZWQgcmF0ZTogMS4wICAg5o6o6I2Q5pKt5pS+6YCf546H77yM6auYMTbkvY3lkozkvY4xNuS9jeWIhuWIq+S4uuWwj+aVsOeCueaVtOaVsOmDqOWIhuWSjOWwj+aVsOmDqOWIhu+8jOWNs1sxNi4xNl0g5qC85byP77yM6K+l5YC85Li6MS4w77yIMHgwMDAxMDAwMO+8ieihqOekuuato+W4uOWJjeWQkeaSreaUvlxuICAgICAgLyoqXG4gICAgICAgICAgICAgKiBQcmVmZXJyZWRWb2x1bWUoMS4wLCAyYnl0ZXMpICsgcmVzZXJ2ZWQoMmJ5dGVzKVxuICAgICAgICAgICAgICog5LiOcmF0Zeexu+S8vO+8jFs4LjhdIOagvOW8j++8jDEuMO+8iDB4MDEwMO+8ieihqOekuuacgOWkp+mfs+mHj1xuICAgICAgICAgICAgICovXG4gICAgICAweDAxLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gIHJlc2VydmVkOiA0ICsgNCBieXRlc+S/neeVmeS9jVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDEsIDB4MDAsIDB4MDAsIC8vIC0tLS1iZWdpbiBjb21wb3NpdGlvbiBtYXRyaXgtLS0tXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8g6KeG6aKR5Y+Y5o2i55+p6Zi1ICAg57q/5oCn5Luj5pWwXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMSwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4NDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIC0tLS1lbmQgY29tcG9zaXRpb24gbWF0cml4LS0tLVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gLS0tLWJlZ2luIHByZV9kZWZpbmVkIDYgKiA0IGJ5dGVzLS0tLVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHByZS1kZWZpbmVkIOS/neeVmeS9jVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyAtLS0tZW5kIHByZV9kZWZpbmVkIDYgKiA0IGJ5dGVzLS0tLVxuICAgICAgMHhGRiwgMHhGRiwgMHhGRiwgMHhGRiAvLyBuZXh0X3RyYWNrX0lEIOS4i+S4gOS4qnRyYWNr5L2/55So55qEaWTlj7dcbiAgICBdKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goOCArIGJ5dGVzLmxlbmd0aCwgJ212aGQnLCBuZXcgVWludDhBcnJheShieXRlcykpXG4gIH1cbiAgc3RhdGljIHZpZGVvVHJhayAoZGF0YSkge1xuICAgIGxldCBzaXplID0gOFxuXG4gICAgbGV0IHRraGQgPSBGbXA0LnRraGQoe1xuICAgICAgaWQ6IDEsXG4gICAgICBkdXJhdGlvbjogZGF0YS5kdXJhdGlvbixcbiAgICAgIHRpbWVzY2FsZTogZGF0YS50aW1lc2NhbGUgfHwgMTAwMCxcbiAgICAgIHdpZHRoOiBkYXRhLnByZXNlbnRXaWR0aCxcbiAgICAgIGhlaWdodDogZGF0YS5wcmVzZW50SGVpZ2h0LFxuICAgICAgdHlwZTogJ3ZpZGVvJ1xuICAgIH0pXG4gICAgbGV0IG1kaWEgPSBGbXA0Lm1kaWEoe1xuICAgICAgdHlwZTogJ3ZpZGVvJyxcbiAgICAgIHRpbWVzY2FsZTogZGF0YS50aW1lc2NhbGUgfHwgMTAwMCxcbiAgICAgIGR1cmF0aW9uOiBkYXRhLmR1cmF0aW9uLFxuICAgICAgYXZjYzogZGF0YS5hdmNjLFxuICAgICAgcGFyUmF0aW86IGRhdGEucGFyUmF0aW8sXG4gICAgICB3aWR0aDogZGF0YS5wcmVzZW50V2lkdGgsXG4gICAgICBoZWlnaHQ6IGRhdGEucHJlc2VudEhlaWdodFxuICAgIH0pO1xuICAgIFt0a2hkLCBtZGlhXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGhcbiAgICB9KVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goc2l6ZSwgJ3RyYWsnLCB0a2hkLCBtZGlhKVxuICB9XG4gIHN0YXRpYyBhdWRpb1RyYWsgKGRhdGEpIHtcbiAgICBsZXQgc2l6ZSA9IDhcbiAgICBsZXQgdGtoZCA9IEZtcDQudGtoZCh7XG4gICAgICBpZDogMixcbiAgICAgIGR1cmF0aW9uOiBkYXRhLmR1cmF0aW9uLFxuICAgICAgdGltZXNjYWxlOiBkYXRhLnRpbWVzY2FsZSB8fCAxMDAwLFxuICAgICAgd2lkdGg6IDAsXG4gICAgICBoZWlnaHQ6IDAsXG4gICAgICB0eXBlOiAnYXVkaW8nXG4gICAgfSlcbiAgICBsZXQgbWRpYSA9IEZtcDQubWRpYSh7XG4gICAgICB0eXBlOiAnYXVkaW8nLFxuICAgICAgdGltZXNjYWxlOiBkYXRhLnRpbWVzY2FsZSB8fCAxMDAwLFxuICAgICAgZHVyYXRpb246IGRhdGEuZHVyYXRpb24sXG4gICAgICBjaGFubmVsQ291bnQ6IGRhdGEuY2hhbm5lbENvdW50LFxuICAgICAgc2FtcGxlcmF0ZTogZGF0YS5zYW1wbGVSYXRlLFxuICAgICAgY29uZmlnOiBkYXRhLmNvbmZpZ1xuICAgIH0pO1xuICAgIFt0a2hkLCBtZGlhXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGhcbiAgICB9KVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goc2l6ZSwgJ3RyYWsnLCB0a2hkLCBtZGlhKVxuICB9XG4gIHN0YXRpYyB0a2hkIChkYXRhKSB7XG4gICAgbGV0IGlkID0gZGF0YS5pZFxuICAgIGxldCBkdXJhdGlvbiA9IGRhdGEuZHVyYXRpb25cbiAgICBsZXQgd2lkdGggPSBkYXRhLndpZHRoXG4gICAgbGV0IGhlaWdodCA9IGRhdGEuaGVpZ2h0XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDA3LCAvLyB2ZXJzaW9uKDApICsgZmxhZ3MgMeS9jeeJiOacrCBib3jniYjmnKzvvIww5oiWMe+8jOS4gOiIrOS4ujDjgILvvIjku6XkuIvlrZfoioLmlbDlnYfmjIl2ZXJzaW9uPTDvvInmjInkvY3miJbmk43kvZznu5PmnpzlgLzvvIzpooTlrprkuYnlpoLkuIvvvJpcbiAgICAgIC8vIDB4MDAwMDAxIHRyYWNrX2VuYWJsZWTvvIzlkKbliJnor6V0cmFja+S4jeiiq+aSreaUvu+8m1xuICAgICAgLy8gMHgwMDAwMDIgdHJhY2tfaW5fbW92aWXvvIzooajnpLror6V0cmFja+WcqOaSreaUvuS4reiiq+W8leeUqO+8m1xuICAgICAgLy8gMHgwMDAwMDQgdHJhY2tfaW5fcHJldmlld++8jOihqOekuuivpXRyYWNr5Zyo6aKE6KeI5pe26KKr5byV55So44CCXG4gICAgICAvLyDkuIDoiKzor6XlgLzkuLo377yMMSsyKzQg5aaC5p6c5LiA5Liq5aqS5L2T5omA5pyJdHJhY2vlnYfmnKrorr7nva50cmFja19pbl9tb3ZpZeWSjHRyYWNrX2luX3ByZXZpZXfvvIzlsIbooqvnkIbop6PkuLrmiYDmnIl0cmFja+Wdh+iuvue9ruS6hui/meS4pOmhue+8m+WvueS6jmhpbnQgdHJhY2vvvIzor6XlgLzkuLowXG4gICAgICAvLyBoaW50IHRyYWNrIOi/meS4queJueauiueahHRyYWNr5bm25LiN5YyF5ZCr5aqS5L2T5pWw5o2u77yM6ICM5piv5YyF5ZCr5LqG5LiA5Lqb5bCG5YW25LuW5pWw5o2udHJhY2vmiZPljIXmiJDmtYHlqpLkvZPnmoTmjIfnpLrkv6Hmga/jgIJcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGNyZWF0aW9uX3RpbWXliJvlu7rml7bpl7TvvIjnm7jlr7nkuo5VVEPml7bpl7QxOTA0LTAxLTAx6Zu254K555qE56eS5pWw77yJXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBtb2RpZmljYXRpb24gdGltZSDkv67mlLnml7bpl7RcbiAgICAgIChpZCA+Pj4gMjQpICYgMHhGRiwgLy8gdHJhY2tfSUQ6IDQgYnl0ZXMgaWTlj7fvvIzkuI3og73ph43lpI3kuJTkuI3og73kuLowXG4gICAgICAoaWQgPj4+IDE2KSAmIDB4RkYsXG4gICAgICAoaWQgPj4+IDgpICYgMHhGRixcbiAgICAgIChpZCkgJiAweEZGLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWQ6IDQgYnl0ZXMgICAg5L+d55WZ5L2NXG4gICAgICAoZHVyYXRpb24gPj4+IDI0KSAmIDB4RkYsIC8vIGR1cmF0aW9uOiA0IGJ5dGVzIHRyYWNr55qE5pe26Ze06ZW/5bqmXG4gICAgICAoZHVyYXRpb24gPj4+IDE2KSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24gPj4+IDgpICYgMHhGRixcbiAgICAgIChkdXJhdGlvbikgJiAweEZGLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWQ6IDIgKiA0IGJ5dGVzICAgIOS/neeVmeS9jVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGxheWVyKDJieXRlcykgKyBhbHRlcm5hdGVfZ3JvdXAoMmJ5dGVzKSAg6KeG6aKR5bGC77yM6buY6K6k5Li6MO+8jOWAvOWwj+eahOWcqOS4iuWxgi50cmFja+WIhue7hOS/oeaBr++8jOm7mOiupOS4ujDooajnpLror6V0cmFja+acquS4juWFtuS7lnRyYWNr5pyJ576k57uE5YWz57O7XG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyB2b2x1bWUoMmJ5dGVzKSArIHJlc2VydmVkKDJieXRlcykgICAgWzguOF0g5qC85byP77yM5aaC5p6c5Li66Z+z6aKRdHJhY2vvvIwxLjDvvIgweDAxMDDvvInooajnpLrmnIDlpKfpn7Pph4/vvJvlkKbliJnkuLowICAgK+S/neeVmeS9jVxuICAgICAgMHgwMCwgMHgwMSwgMHgwMCwgMHgwMCwgLy8gLS0tLWJlZ2luIGNvbXBvc2l0aW9uIG1hdHJpeC0tLS1cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDEsIDB4MDAsIDB4MDAsIC8vIOinhumikeWPmOaNouefqemYtVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHg0MCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gLS0tLWVuZCBjb21wb3NpdGlvbiBtYXRyaXgtLS0tXG4gICAgICAod2lkdGggPj4+IDgpICYgMHhGRiwgLy8gLy/lrr3luqZcbiAgICAgICh3aWR0aCkgJiAweEZGLFxuICAgICAgMHgwMCwgMHgwMCxcbiAgICAgIChoZWlnaHQgPj4+IDgpICYgMHhGRiwgLy8g6auY5bqmXG4gICAgICAoaGVpZ2h0KSAmIDB4RkYsXG4gICAgICAweDAwLCAweDAwXG4gICAgXSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDggKyBjb250ZW50LmJ5dGVMZW5ndGgsICd0a2hkJywgY29udGVudClcbiAgfVxuICBzdGF0aWMgZWR0cyAoZGF0YSkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgZHVyYXRpb24gPSBkYXRhLmR1cmF0aW9uXG4gICAgbGV0IG1lZGlhVGltZSA9IGRhdGEubWVkaWFUaW1lXG4gICAgYnVmZmVyLndyaXRlKEZtcDQuc2l6ZSgzNiksIEZtcDQudHlwZSgnZWR0cycpKVxuICAgIC8vIGVsc3RcbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKDI4KSwgRm1wNC50eXBlKCdlbHN0JykpXG4gICAgYnVmZmVyLndyaXRlKG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDEsIC8vIGVudHJ5IGNvdW50XG4gICAgICAoZHVyYXRpb24gPj4gMjQpICYgMHhmZiwgKGR1cmF0aW9uID4+IDE2KSAmIDB4ZmYsIChkdXJhdGlvbiA+PiA4KSAmIDB4ZmYsIGR1cmF0aW9uICYgMHhmZixcbiAgICAgIChtZWRpYVRpbWUgPj4gMjQpICYgMHhmZiwgKG1lZGlhVGltZSA+PiAxNikgJiAweGZmLCAobWVkaWFUaW1lID4+IDgpICYgMHhmZiwgbWVkaWFUaW1lICYgMHhmZixcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDEgLy8gbWVkaWEgcmF0ZVxuICAgIF0pKVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIG1kaWEgKGRhdGEpIHtcbiAgICBsZXQgc2l6ZSA9IDhcbiAgICBsZXQgbWRoZCA9IEZtcDQubWRoZChkYXRhLnRpbWVzY2FsZSwgZGF0YS5kdXJhdGlvbilcbiAgICBsZXQgaGRsciA9IEZtcDQuaGRscihkYXRhLnR5cGUpXG4gICAgbGV0IG1pbmYgPSBGbXA0Lm1pbmYoZGF0YSk7XG4gICAgW21kaGQsIGhkbHIsIG1pbmZdLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aFxuICAgIH0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveChzaXplLCAnbWRpYScsIG1kaGQsIGhkbHIsIG1pbmYpXG4gIH1cbiAgc3RhdGljIG1kaGQgKHRpbWVzY2FsZSA9IDEwMDAsIGR1cmF0aW9uKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBjcmVhdGlvbl90aW1lICAgIOWIm+W7uuaXtumXtFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gbW9kaWZpY2F0aW9uX3RpbWXkv67mlLnml7bpl7RcbiAgICAgICh0aW1lc2NhbGUgPj4+IDI0KSAmIDB4RkYsIC8vIHRpbWVzY2FsZTogNCBieXRlcyAgICDmlofku7blqpLkvZPlnKgx56eS5pe26Ze05YaF55qE5Yi75bqm5YC877yM5Y+v5Lul55CG6Kej5Li6MeenkumVv+W6plxuICAgICAgKHRpbWVzY2FsZSA+Pj4gMTYpICYgMHhGRixcbiAgICAgICh0aW1lc2NhbGUgPj4+IDgpICYgMHhGRixcbiAgICAgICh0aW1lc2NhbGUpICYgMHhGRixcbiAgICAgIChkdXJhdGlvbiA+Pj4gMjQpICYgMHhGRiwgLy8gZHVyYXRpb246IDQgYnl0ZXMgIHRyYWNr55qE5pe26Ze06ZW/5bqmXG4gICAgICAoZHVyYXRpb24gPj4+IDE2KSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24gPj4+IDgpICYgMHhGRixcbiAgICAgIChkdXJhdGlvbikgJiAweEZGLFxuICAgICAgMHg1NSwgMHhDNCwgLy8gbGFuZ3VhZ2U6IHVuZCAodW5kZXRlcm1pbmVkKSDlqpLkvZPor63oqIDnoIHjgILmnIDpq5jkvY3kuLow77yM5ZCO6Z2iMTXkvY3kuLoz5Liq5a2X56ym77yI6KeBSVNPIDYzOS0yL1TmoIflh4bkuK3lrprkuYnvvIlcbiAgICAgIDB4MDAsIDB4MDAgLy8gcHJlX2RlZmluZWQgPSAwXG4gICAgXSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDEyICsgY29udGVudC5ieXRlTGVuZ3RoLCAnbWRoZCcsIEZtcDQuZXh0ZW5zaW9uKDAsIDApLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyBoZGxyICh0eXBlKSB7XG4gICAgbGV0IHZhbHVlID0gWzB4MDAsIC8vIHZlcnNpb24gMFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHByZV9kZWZpbmVkXG4gICAgICAweDc2LCAweDY5LCAweDY0LCAweDY1LCAvLyBoYW5kbGVyX3R5cGU6ICd2aWRlJ1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHg1NiwgMHg2OSwgMHg2NCwgMHg2NSxcbiAgICAgIDB4NmYsIDB4NDgsIDB4NjEsIDB4NmUsXG4gICAgICAweDY0LCAweDZjLCAweDY1LCAweDcyLCAweDAwIC8vIG5hbWU6ICdWaWRlb0hhbmRsZXInXG4gICAgXVxuICAgIGlmICh0eXBlID09PSAnYXVkaW8nKSB7XG4gICAgICB2YWx1ZS5zcGxpY2UoOCwgNCwgLi4uWzB4NzMsIDB4NmYsIDB4NzUsIDB4NmVdKVxuICAgICAgdmFsdWUuc3BsaWNlKDI0LCAxMywgLi4uWzB4NTMsIDB4NmYsIDB4NzUsIDB4NmUsXG4gICAgICAgIDB4NjQsIDB4NDgsIDB4NjEsIDB4NmUsXG4gICAgICAgIDB4NjQsIDB4NmMsIDB4NjUsIDB4NzIsIDB4MDBdKVxuICAgIH1cbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDggKyB2YWx1ZS5sZW5ndGgsICdoZGxyJywgbmV3IFVpbnQ4QXJyYXkodmFsdWUpKVxuICB9XG4gIHN0YXRpYyBtaW5mIChkYXRhKSB7XG4gICAgbGV0IHNpemUgPSA4XG4gICAgbGV0IHZtaGQgPSBkYXRhLnR5cGUgPT09ICd2aWRlbycgPyBGbXA0LnZtaGQoKSA6IEZtcDQuc21oZCgpXG4gICAgbGV0IGRpbmYgPSBGbXA0LmRpbmYoKVxuICAgIGxldCBzdGJsID0gRm1wNC5zdGJsKGRhdGEpO1xuICAgIFt2bWhkLCBkaW5mLCBzdGJsXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGhcbiAgICB9KVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goc2l6ZSwgJ21pbmYnLCB2bWhkLCBkaW5mLCBzdGJsKVxuICB9XG4gIHN0YXRpYyB2bWhkICgpIHtcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDIwLCAndm1oZCcsIG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIC8vIHZlcnNpb25cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDEsIC8vIGZsYWdzXG4gICAgICAweDAwLCAweDAwLCAvLyBncmFwaGljc21vZGVcbiAgICAgIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCAvLyBvcGNvbG9yXG4gICAgXSkpXG4gIH1cbiAgc3RhdGljIHNtaGQgKCkge1xuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTYsICdzbWhkJywgbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgLy8gdmVyc2lvblxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgIDB4MDAsIDB4MDAsIC8vIGJhbGFuY2VcbiAgICAgIDB4MDAsIDB4MDAgLy8gcmVzZXJ2ZWRcbiAgICBdKSlcbiAgfVxuICBzdGF0aWMgZGluZiAoKSB7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGxldCBkcmVmID0gWzB4MDAsIC8vIHZlcnNpb24gMFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDEsIC8vIGVudHJ5X2NvdW50XG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDBjLCAvLyBlbnRyeV9zaXplXG4gICAgICAweDc1LCAweDcyLCAweDZjLCAweDIwLCAvLyAndXJsJyB0eXBlXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uIDBcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDEgLy8gZW50cnlfZmxhZ3NcbiAgICBdXG4gICAgYnVmZmVyLndyaXRlKEZtcDQuc2l6ZSgzNiksIEZtcDQudHlwZSgnZGluZicpLCBGbXA0LnNpemUoMjgpLCBGbXA0LnR5cGUoJ2RyZWYnKSwgbmV3IFVpbnQ4QXJyYXkoZHJlZikpXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgc3RibCAoZGF0YSkge1xuICAgIGxldCBzaXplID0gOFxuICAgIGxldCBzdHNkID0gRm1wNC5zdHNkKGRhdGEpXG4gICAgbGV0IHN0dHMgPSBGbXA0LnN0dHMoKVxuICAgIGxldCBzdHNjID0gRm1wNC5zdHNjKClcbiAgICBsZXQgc3RzeiA9IEZtcDQuc3RzeigpXG4gICAgbGV0IHN0Y28gPSBGbXA0LnN0Y28oKTtcbiAgICBbc3RzZCwgc3R0cywgc3RzYywgc3Rzeiwgc3Rjb10uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KHNpemUsICdzdGJsJywgc3RzZCwgc3R0cywgc3RzYywgc3Rzeiwgc3RjbylcbiAgfVxuICBzdGF0aWMgc3RzZCAoZGF0YSkge1xuICAgIGxldCBjb250ZW50XG4gICAgaWYgKGRhdGEudHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgLy8gaWYgKCFkYXRhLmlzQUFDICYmIGRhdGEuY29kZWMgPT09ICdtcDQnKSB7XG4gICAgICAvLyAgICAgY29udGVudCA9IEZNUDQubXAzKGRhdGEpO1xuICAgICAgLy8gfSBlbHNlIHtcbiAgICAgIC8vXG4gICAgICAvLyB9XG4gICAgICAvLyDmlK/mjIFtcDRhXG4gICAgICBjb250ZW50ID0gRm1wNC5tcDRhKGRhdGEpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRlbnQgPSBGbXA0LmF2YzEoZGF0YSlcbiAgICB9XG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxNiArIGNvbnRlbnQuYnl0ZUxlbmd0aCwgJ3N0c2QnLCBGbXA0LmV4dGVuc2lvbigwLCAwKSwgbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4MDAsIDB4MDAsIDB4MDFdKSwgY29udGVudClcbiAgfVxuICBzdGF0aWMgbXA0YSAoZGF0YSkge1xuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAxLCAvLyBkYXRhX3JlZmVyZW5jZV9pbmRleFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCBkYXRhLmNoYW5uZWxDb3VudCwgLy8gY2hhbm5lbGNvdW50XG4gICAgICAweDAwLCAweDEwLCAvLyBzYW1wbGVTaXplOjE2Yml0c1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWQyXG4gICAgICAoZGF0YS5zYW1wbGVyYXRlID4+IDgpICYgMHhmZixcbiAgICAgIGRhdGEuc2FtcGxlcmF0ZSAmIDB4ZmYsIC8vXG4gICAgICAweDAwLCAweDAwXG4gICAgXSlcbiAgICBsZXQgZXNkcyA9IEZtcDQuZXNkcyhkYXRhLmNvbmZpZylcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDggKyBjb250ZW50LmJ5dGVMZW5ndGggKyBlc2RzLmJ5dGVMZW5ndGgsICdtcDRhJywgY29udGVudCwgZXNkcylcbiAgfVxuICBzdGF0aWMgZXNkcyAoY29uZmlnID0gWzQzLCAxNDYsIDgsIDBdKSB7XG4gICAgY29uc3QgY29uZmlnbGVuID0gY29uZmlnLmxlbmd0aFxuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIC8vIHZlcnNpb24gMFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcblxuICAgICAgMHgwMywgLy8gZGVzY3JpcHRvcl90eXBlXG4gICAgICAweDE3ICsgY29uZmlnbGVuLCAvLyBsZW5ndGhcbiAgICAgIDB4MDAsIDB4MDEsIC8vIGVzX2lkXG4gICAgICAweDAwLCAvLyBzdHJlYW1fcHJpb3JpdHlcblxuICAgICAgMHgwNCwgLy8gZGVzY3JpcHRvcl90eXBlXG4gICAgICAweDBmICsgY29uZmlnbGVuLCAvLyBsZW5ndGhcbiAgICAgIDB4NDAsIC8vIGNvZGVjIDogbXBlZzRfYXVkaW9cbiAgICAgIDB4MTUsIC8vIHN0cmVhbV90eXBlXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBidWZmZXJfc2l6ZVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gbWF4Qml0cmF0ZVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gYXZnQml0cmF0ZVxuXG4gICAgICAweDA1IC8vIGRlc2NyaXB0b3JfdHlwZVxuICAgIF0uY29uY2F0KFtjb25maWdsZW5dKS5jb25jYXQoY29uZmlnKS5jb25jYXQoWzB4MDYsIDB4MDEsIDB4MDJdKSlcbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKDggKyBjb250ZW50LmJ5dGVMZW5ndGgpLCBGbXA0LnR5cGUoJ2VzZHMnKSwgY29udGVudClcbiAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlclxuICB9XG4gIHN0YXRpYyBhdmMxIChkYXRhKSB7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGxldCBzaXplID0gNDAvLyA4KGF2YzEpKzgoYXZjYykrOChidHJ0KSsxNihwYXNwKVxuICAgIC8vIGxldCBzcHMgPSBkYXRhLnNwc1xuICAgIC8vIGxldCBwcHMgPSBkYXRhLnBwc1xuICAgIGxldCB3aWR0aCA9IGRhdGEud2lkdGhcbiAgICBsZXQgaGVpZ2h0ID0gZGF0YS5oZWlnaHRcbiAgICBsZXQgaFNwYWNpbmcgPSBkYXRhLnBhclJhdGlvLmhlaWdodFxuICAgIGxldCB2U3BhY2luZyA9IGRhdGEucGFyUmF0aW8ud2lkdGhcbiAgICAvLyBsZXQgYXZjY0J1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIC8vIGF2Y2NCdWZmZXIud3JpdGUobmV3IFVpbnQ4QXJyYXkoW1xuICAgIC8vICAgMHgwMSwgLy8gdmVyc2lvblxuICAgIC8vICAgc3BzWzFdLCAvLyBwcm9maWxlXG4gICAgLy8gICBzcHNbMl0sIC8vIHByb2ZpbGUgY29tcGF0aWJsZVxuICAgIC8vICAgc3BzWzNdLCAvLyBsZXZlbFxuICAgIC8vICAgMHhmYyB8IDMsXG4gICAgLy8gICAweEUwIHwgMSAvLyDnm67liY3lj6rlpITnkIbkuIDkuKpzcHNcbiAgICAvLyBdLmNvbmNhdChbc3BzLmxlbmd0aCA+Pj4gOCAmIDB4ZmYsIHNwcy5sZW5ndGggJiAweGZmXSkpKVxuICAgIC8vIGF2Y2NCdWZmZXIud3JpdGUoc3BzLCBuZXcgVWludDhBcnJheShbMSwgcHBzLmxlbmd0aCA+Pj4gOCAmIDB4ZmYsIHBwcy5sZW5ndGggJiAweGZmXSksIHBwcylcblxuICAgIGxldCBhdmNjID0gZGF0YS5hdmNjXG4gICAgbGV0IGF2YzEgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIDB4MDEsIC8vIGRhdGFfcmVmZXJlbmNlX2luZGV4XG4gICAgICAweDAwLCAweDAwLCAvLyBwcmVfZGVmaW5lZFxuICAgICAgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcHJlX2RlZmluZWRcbiAgICAgICh3aWR0aCA+PiA4KSAmIDB4ZmYsXG4gICAgICB3aWR0aCAmIDB4ZmYsIC8vIHdpZHRoXG4gICAgICAoaGVpZ2h0ID4+IDgpICYgMHhmZixcbiAgICAgIGhlaWdodCAmIDB4ZmYsIC8vIGhlaWdodFxuICAgICAgMHgwMCwgMHg0OCwgMHgwMCwgMHgwMCwgLy8gaG9yaXpyZXNvbHV0aW9uXG4gICAgICAweDAwLCAweDQ4LCAweDAwLCAweDAwLCAvLyB2ZXJ0cmVzb2x1dGlvblxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIDB4MDEsIC8vIGZyYW1lX2NvdW50XG4gICAgICAweDEyLFxuICAgICAgMHg2NCwgMHg2MSwgMHg2OSwgMHg2QywgLy8gZGFpbHltb3Rpb24vaGxzLmpzXG4gICAgICAweDc5LCAweDZELCAweDZGLCAweDc0LFxuICAgICAgMHg2OSwgMHg2RiwgMHg2RSwgMHgyRixcbiAgICAgIDB4NjgsIDB4NkMsIDB4NzMsIDB4MkUsXG4gICAgICAweDZBLCAweDczLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBjb21wcmVzc29ybmFtZVxuICAgICAgMHgwMCwgMHgxOCwgLy8gZGVwdGggPSAyNFxuICAgICAgMHgxMSwgMHgxMV0pIC8vIHByZV9kZWZpbmVkID0gLTFcbiAgICBsZXQgYnRydCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIDB4MWMsIDB4OWMsIDB4ODAsIC8vIGJ1ZmZlclNpemVEQlxuICAgICAgMHgwMCwgMHgyZCwgMHhjNiwgMHhjMCwgLy8gbWF4Qml0cmF0ZVxuICAgICAgMHgwMCwgMHgyZCwgMHhjNiwgMHhjMCAvLyBhdmdCaXRyYXRlXG4gICAgXSlcbiAgICBsZXQgcGFzcCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIChoU3BhY2luZyA+PiAyNCksIC8vIGhTcGFjaW5nXG4gICAgICAoaFNwYWNpbmcgPj4gMTYpICYgMHhmZixcbiAgICAgIChoU3BhY2luZyA+PiA4KSAmIDB4ZmYsXG4gICAgICBoU3BhY2luZyAmIDB4ZmYsXG4gICAgICAodlNwYWNpbmcgPj4gMjQpLCAvLyB2U3BhY2luZ1xuICAgICAgKHZTcGFjaW5nID4+IDE2KSAmIDB4ZmYsXG4gICAgICAodlNwYWNpbmcgPj4gOCkgJiAweGZmLFxuICAgICAgdlNwYWNpbmcgJiAweGZmXG4gICAgXSlcblxuICAgIGJ1ZmZlci53cml0ZShcbiAgICAgIEZtcDQuc2l6ZShzaXplICsgYXZjMS5ieXRlTGVuZ3RoICsgYXZjYy5ieXRlTGVuZ3RoICsgYnRydC5ieXRlTGVuZ3RoKSwgRm1wNC50eXBlKCdhdmMxJyksIGF2YzEsXG4gICAgICBGbXA0LnNpemUoOCArIGF2Y2MuYnl0ZUxlbmd0aCksIEZtcDQudHlwZSgnYXZjQycpLCBhdmNjLFxuICAgICAgRm1wNC5zaXplKDIwKSwgRm1wNC50eXBlKCdidHJ0JyksIGJ0cnQsXG4gICAgICBGbXA0LnNpemUoMTYpLCBGbXA0LnR5cGUoJ3Bhc3AnKSwgcGFzcFxuICAgIClcbiAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlclxuICB9XG4gIHN0YXRpYyBzdHRzICgpIHtcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIC8vIHZlcnNpb25cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwIC8vIGVudHJ5X2NvdW50XG4gICAgXSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDE2LCAnc3R0cycsIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIHN0c2MgKCkge1xuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgLy8gdmVyc2lvblxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAgLy8gZW50cnlfY291bnRcbiAgICBdKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTYsICdzdHNjJywgY29udGVudClcbiAgfVxuICBzdGF0aWMgc3RjbyAoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCAvLyBlbnRyeV9jb3VudFxuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxNiwgJ3N0Y28nLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyBzdHN6ICgpIHtcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIC8vIHZlcnNpb25cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBzYW1wbGVfc2l6ZVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCAvLyBzYW1wbGVfY291bnRcbiAgICBdKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goMjAsICdzdHN6JywgY29udGVudClcbiAgfVxuICBzdGF0aWMgbXZleCAoZHVyYXRpb24sIHRpbWVzY2FsZSA9IDEwMDAsIHRyYWNrSUQpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IG1laGQgPSBCdWZmZXIud3JpdGVVaW50MzIoZHVyYXRpb24pXG4gICAgYnVmZmVyLndyaXRlKEZtcDQuc2l6ZSg1NiksIEZtcDQudHlwZSgnbXZleCcpLCBGbXA0LnNpemUoMTYpLCBGbXA0LnR5cGUoJ21laGQnKSwgRm1wNC5leHRlbnNpb24oMCwgMCksIG1laGQsIEZtcDQudHJleCh0cmFja0lEKSlcbiAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlclxuICB9XG4gIHN0YXRpYyB0cmV4IChpZCkge1xuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgLy8gdmVyc2lvbiAwXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgKGlkID4+IDI0KSxcbiAgICAgIChpZCA+PiAxNikgJiAweGZmLFxuICAgICAgKGlkID4+IDgpICYgMHhmZixcbiAgICAgIChpZCAmIDB4ZmYpLCAvLyB0cmFja19JRFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMSwgLy8gZGVmYXVsdF9zYW1wbGVfZGVzY3JpcHRpb25faW5kZXhcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGRlZmF1bHRfc2FtcGxlX2R1cmF0aW9uXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBkZWZhdWx0X3NhbXBsZV9zaXplXG4gICAgICAweDAwLCAweDAxLCAweDAwLCAweDAxIC8vIGRlZmF1bHRfc2FtcGxlX2ZsYWdzXG4gICAgXSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDggKyBjb250ZW50LmJ5dGVMZW5ndGgsICd0cmV4JywgY29udGVudClcbiAgfVxuICBzdGF0aWMgbW9vZiAoZGF0YSkge1xuICAgIGxldCBzaXplID0gOFxuICAgIGxldCBtZmhkID0gRm1wNC5tZmhkKClcbiAgICBsZXQgdHJhZiA9IEZtcDQudHJhZihkYXRhKTtcbiAgICBbbWZoZCwgdHJhZl0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KHNpemUsICdtb29mJywgbWZoZCwgdHJhZilcbiAgfVxuICBzdGF0aWMgbWZoZCAoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBCdWZmZXIud3JpdGVVaW50MzIoRm1wNC5zZXF1ZW5jZSlcbiAgICBGbXA0LnNlcXVlbmNlICs9IDFcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDE2LCAnbWZoZCcsIEZtcDQuZXh0ZW5zaW9uKDAsIDApLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyB0cmFmIChkYXRhKSB7XG4gICAgbGV0IHNpemUgPSA4XG4gICAgbGV0IHRmaGQgPSBGbXA0LnRmaGQoZGF0YS5pZClcbiAgICBsZXQgdGZkdCA9IEZtcDQudGZkdChkYXRhLnRpbWUpXG4gICAgbGV0IHNkdHAgPSBGbXA0LnNkdHAoZGF0YSlcbiAgICBsZXQgdHJ1biA9IEZtcDQudHJ1bihkYXRhLCBzZHRwLmJ5dGVMZW5ndGgpO1xuXG4gICAgW3RmaGQsIHRmZHQsIHRydW4sIHNkdHBdLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aFxuICAgIH0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveChzaXplLCAndHJhZicsIHRmaGQsIHRmZHQsIHRydW4sIHNkdHApXG4gIH1cbiAgc3RhdGljIHRmaGQgKGlkKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBCdWZmZXIud3JpdGVVaW50MzIoaWQpXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxNiwgJ3RmaGQnLCBGbXA0LmV4dGVuc2lvbigwLCAwKSwgY29udGVudClcbiAgfVxuICBzdGF0aWMgdGZkdCAodGltZSkge1xuICAgIC8vIGxldCB1cHBlciA9IE1hdGguZmxvb3IodGltZSAvIChVSU5UMzJfTUFYICsgMSkpLFxuICAgIC8vICAgICBsb3dlciA9IE1hdGguZmxvb3IodGltZSAlIChVSU5UMzJfTUFYICsgMSkpO1xuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTYsICd0ZmR0JywgRm1wNC5leHRlbnNpb24oMCwgMCksIEJ1ZmZlci53cml0ZVVpbnQzMih0aW1lKSlcbiAgfVxuICBzdGF0aWMgdHJ1biAoZGF0YSwgc2R0cExlbmd0aCkge1xuICAgIC8vIGxldCBpZCA9IGRhdGEuaWQ7XG4gICAgLy8gbGV0IGNlaWwgPSBpZCA9PT0gMSA/IDE2IDogMTI7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGxldCBzYW1wbGVDb3VudCA9IEJ1ZmZlci53cml0ZVVpbnQzMihkYXRhLnNhbXBsZXMubGVuZ3RoKVxuICAgIC8vIG1kYXQtaGVhZGVyIDhcbiAgICAvLyBtb29mLWhlYWRlciA4XG4gICAgLy8gbWZoZCAxNlxuICAgIC8vIHRyYWYtaGVhZGVyIDhcbiAgICAvLyB0aGhkIDE2XG4gICAgLy8gdGZkdCAyMFxuICAgIC8vIHRydW4taGVhZGVyIDEyXG4gICAgLy8gc2FtcGxlQ291bnQgNFxuICAgIC8vIGRhdGEtb2Zmc2V0IDRcbiAgICAvLyBzYW1wbGVzLmxlbmd0aFxuICAgIGxldCBvZmZzZXQgPSBCdWZmZXIud3JpdGVVaW50MzIoOCArIDggKyAxNiArIDggKyAxNiArIDE2ICsgMTIgKyA0ICsgNCArIDE2ICogZGF0YS5zYW1wbGVzLmxlbmd0aCArIHNkdHBMZW5ndGgpXG4gICAgYnVmZmVyLndyaXRlKEZtcDQuc2l6ZSgyMCArIDE2ICogZGF0YS5zYW1wbGVzLmxlbmd0aCksIEZtcDQudHlwZSgndHJ1bicpLCBuZXcgVWludDhBcnJheShbMHgwMCwgMHgwMCwgMHgwRiwgMHgwMV0pLCBzYW1wbGVDb3VudCwgb2Zmc2V0KVxuXG4gICAgLy8gbGV0IHNpemUgPSBidWZmZXIuYnVmZmVyLmJ5dGVMZW5ndGhcbiAgICAvLyBsZXQgd3JpdGVPZmZzZXQgPSAwXG4gICAgLy8gZGF0YS5zYW1wbGVzLmZvckVhY2goKCkgPT4ge1xuICAgIC8vICAgc2l6ZSArPSAxNlxuICAgIC8vIH0pXG4gICAgLy9cbiAgICAvLyBsZXQgdHJ1bkJveCA9IG5ldyBVaW50OEFycmF5KHNpemUpXG5cbiAgICAvLyB0cnVuQm94LnNldChidWZmZXIuYnVmZmVyLCAwKVxuXG4gICAgZGF0YS5zYW1wbGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGZsYWdzID0gaXRlbS5mbGFnc1xuICAgICAgLy8gY29uc29sZS5sb2coaXRlbS50eXBlLCBpdGVtLmR0cywgaXRlbS5kdXJhdGlvbilcblxuICAgICAgYnVmZmVyLndyaXRlKG5ldyBVaW50OEFycmF5KFtcbiAgICAgICAgKGl0ZW0uZHVyYXRpb24gPj4+IDI0KSAmIDB4RkYsIC8vIHNhbXBsZV9kdXJhdGlvblxuICAgICAgICAoaXRlbS5kdXJhdGlvbiA+Pj4gMTYpICYgMHhGRixcbiAgICAgICAgKGl0ZW0uZHVyYXRpb24gPj4+IDgpICYgMHhGRixcbiAgICAgICAgKGl0ZW0uZHVyYXRpb24pICYgMHhGRixcbiAgICAgICAgKGl0ZW0uc2l6ZSA+Pj4gMjQpICYgMHhGRiwgLy8gc2FtcGxlX3NpemVcbiAgICAgICAgKGl0ZW0uc2l6ZSA+Pj4gMTYpICYgMHhGRixcbiAgICAgICAgKGl0ZW0uc2l6ZSA+Pj4gOCkgJiAweEZGLFxuICAgICAgICAoaXRlbS5zaXplKSAmIDB4RkYsXG4gICAgICAgIChmbGFncy5pc0xlYWRpbmcgPDwgMikgfCBmbGFncy5kZXBlbmRzT24sIC8vIHNhbXBsZV9mbGFnc1xuICAgICAgICAoZmxhZ3MuaXNEZXBlbmRlZE9uIDw8IDYpIHwgKGZsYWdzLmhhc1JlZHVuZGFuY3kgPDwgNCkgfCBmbGFncy5pc05vblN5bmMsXG4gICAgICAgIDB4MDAsIDB4MDAsIC8vIHNhbXBsZV9kZWdyYWRhdGlvbl9wcmlvcml0eVxuICAgICAgICAoaXRlbS5jdHMgPj4+IDI0KSAmIDB4RkYsIC8vIHNhbXBsZV9jb21wb3NpdGlvbl90aW1lX29mZnNldFxuICAgICAgICAoaXRlbS5jdHMgPj4+IDE2KSAmIDB4RkYsXG4gICAgICAgIChpdGVtLmN0cyA+Pj4gOCkgJiAweEZGLFxuICAgICAgICAoaXRlbS5jdHMpICYgMHhGRlxuICAgICAgXSkpXG4gICAgICAvLyB3cml0ZU9mZnNldCArPSAxNlxuICAgICAgLy8gYnVmZmVyLndyaXRlKEJ1ZmZlci53cml0ZVVpbnQzMigwKSk7XG4gICAgfSlcbiAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlclxuICB9XG4gIHN0YXRpYyBzZHRwIChkYXRhKSB7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoMTIgKyBkYXRhLnNhbXBsZXMubGVuZ3RoKSwgRm1wNC50eXBlKCdzZHRwJyksIEZtcDQuZXh0ZW5zaW9uKDAsIDApKVxuICAgIGRhdGEuc2FtcGxlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgY29uc3QgZmxhZ3MgPSBpdGVtLmZsYWdzXG4gICAgICBjb25zdCBudW0gPSAoZmxhZ3MuaXNMZWFkaW5nIDw8IDYpIHwgLy8gaXNfbGVhZGluZzogMiAoYml0KVxuICAgICAgICAoZmxhZ3MuZGVwZW5kc09uIDw8IDQpIHwgLy8gc2FtcGxlX2RlcGVuZHNfb25cbiAgICAgICAgKGZsYWdzLmlzRGVwZW5kZWRPbiA8PCAyKSB8IC8vIHNhbXBsZV9pc19kZXBlbmRlZF9vblxuICAgICAgICAoZmxhZ3MuaGFzUmVkdW5kYW5jeSkvLyBzYW1wbGVfaGFzX3JlZHVuZGFuY3lcblxuICAgICAgYnVmZmVyLndyaXRlKG5ldyBVaW50OEFycmF5KFtudW1dKSlcbiAgICB9KVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIG1kYXQgKGRhdGEpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IHNpemUgPSA4XG4gICAgZGF0YS5zYW1wbGVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzaXplICs9IGl0ZW0uc2l6ZVxuICAgIH0pXG4gICAgYnVmZmVyLndyaXRlKEZtcDQuc2l6ZShzaXplKSwgRm1wNC50eXBlKCdtZGF0JykpXG4gICAgbGV0IG1kYXRCb3ggPSBuZXcgVWludDhBcnJheShzaXplKVxuICAgIGxldCBvZmZzZXQgPSAwXG4gICAgbWRhdEJveC5zZXQoYnVmZmVyLmJ1ZmZlciwgb2Zmc2V0KVxuICAgIG9mZnNldCArPSA4XG4gICAgZGF0YS5zYW1wbGVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpdGVtLmJ1ZmZlci5mb3JFYWNoKCh1bml0KSA9PiB7XG4gICAgICAgIG1kYXRCb3guc2V0KHVuaXQsIG9mZnNldClcbiAgICAgICAgb2Zmc2V0ICs9IHVuaXQuYnl0ZUxlbmd0aFxuICAgICAgICAvLyBidWZmZXIud3JpdGUodW5pdC5kYXRhKTtcbiAgICAgIH0pXG4gICAgfSlcbiAgICByZXR1cm4gbWRhdEJveFxuICB9XG59XG5GbXA0LnR5cGUgPSAobmFtZSkgPT4ge1xuICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoW25hbWUuY2hhckNvZGVBdCgwKSwgbmFtZS5jaGFyQ29kZUF0KDEpLCBuYW1lLmNoYXJDb2RlQXQoMiksIG5hbWUuY2hhckNvZGVBdCgzKV0pXG59XG5GbXA0LnNlcXVlbmNlID0gMVxuXG5leHBvcnQgZGVmYXVsdCBGbXA0XG4iLCJpbXBvcnQge1xuICBFVkVOVFMsXG4gIHNuaWZmZXIsXG4gIE1lZGlhU2VnbWVudExpc3QsXG4gIEJ1ZmZlclxufSBmcm9tICd4Z3BsYXllci11dGlscyc7XG5pbXBvcnQgRm1wNCBmcm9tICcuL2ZtcDQnXG5cbmNvbnN0IFJFTVVYX0VWRU5UUyA9IEVWRU5UUy5SRU1VWF9FVkVOVFNcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTXA0UmVtdXhlciB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLl9kdHNCYXNlID0gMFxuICAgIHRoaXMuX2lzRHRzQmFzZUluaXRlZCA9IGZhbHNlXG5cbiAgICB0aGlzLmlzRmlyc3RWaWRlbyA9IHRydWVcbiAgICB0aGlzLmlzRmlyc3RBdWRpbyA9IHRydWVcblxuICAgIHRoaXMudmlkZW9BbGxEdXJhdGlvbiA9IDBcbiAgICB0aGlzLmF1ZGlvQWxsRHVyYXRpb24gPSAwXG4gIH1cblxuICBpbml0ICgpIHtcbiAgICB0aGlzLm9uKFJFTVVYX0VWRU5UUy5SRU1VWF9NRURJQSwgdGhpcy5yZW11eC5iaW5kKHRoaXMpKVxuICAgIHRoaXMub24oUkVNVVhfRVZFTlRTLlJFTVVYX01FVEFEQVRBLCB0aGlzLm9uTWV0YURhdGFSZWFkeS5iaW5kKHRoaXMpKVxuICAgIHRoaXMub24oUkVNVVhfRVZFTlRTLkRFVEVDVF9DSEFOR0VfU1RSRUFNLCB0aGlzLnJlc2V0RHRzQmFzZS5iaW5kKHRoaXMpKVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5fZHRzQmFzZSA9IC0xXG4gICAgdGhpcy5fZHRzQmFzZUluaXRlZCA9IGZhbHNlXG4gIH1cblxuICByZXNldCAoKSB7XG4gICAgdGhpcy5fZHRzQmFzZSA9IDBcbiAgICB0aGlzLl9pc0R0c0Jhc2VJbml0ZWQgPSBmYWxzZVxuICB9XG5cbiAgcmVtdXggKCkge1xuICAgIGNvbnN0IHsgYXVkaW9UcmFjaywgdmlkZW9UcmFjayB9ID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJylcbiAgICAhdGhpcy5faXNEdHNCYXNlSW5pdGVkICYmIHRoaXMuY2FsY0R0c0Jhc2UoYXVkaW9UcmFjaywgdmlkZW9UcmFjaylcblxuICAgIHRoaXMuX3JlbXV4VmlkZW8odmlkZW9UcmFjaylcbiAgICB0aGlzLl9yZW11eEF1ZGlvKGF1ZGlvVHJhY2spXG4gIH1cblxuICByZXNldER0c0Jhc2UgKCkge1xuICAgIC8vIGZvciBobHMg5Lit6YCU5YiH5o2iIG1ldGHlkI5zZWVrXG4gICAgdGhpcy5fZHRzQmFzZSA9IDBcbiAgICB0aGlzLl9kdHNCYXNlSW5pdGVkID0gZmFsc2VcbiAgfVxuXG4gIHNlZWsgKCkge1xuXG4gIH1cblxuICBvbk1ldGFEYXRhUmVhZHkgKHR5cGUpIHtcbiAgICBsZXQgdHJhY2tcblxuICAgIGlmICh0eXBlID09PSAnYXVkaW8nKSB7XG4gICAgICBjb25zdCB7IGF1ZGlvVHJhY2sgfSA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpXG4gICAgICB0cmFjayA9IGF1ZGlvVHJhY2s7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHsgdmlkZW9UcmFjayB9ID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJylcbiAgICAgIHRyYWNrID0gdmlkZW9UcmFjaztcbiAgICB9XG5cbiAgICBsZXQgcHJlc291cmNlYnVmZmVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnUFJFX1NPVVJDRV9CVUZGRVInKTtcbiAgICBsZXQgc291cmNlID0gcHJlc291cmNlYnVmZmVyLmdldFNvdXJjZSh0eXBlKTtcbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgc291cmNlID0gcHJlc291cmNlYnVmZmVyLmNyZWF0ZVNvdXJjZSh0eXBlKTtcbiAgICB9XG5cbiAgICBzb3VyY2UubWltZXR5cGUgPSB0cmFjay5tZXRhLmNvZGVjO1xuICAgIHNvdXJjZS5pbml0ID0gdGhpcy5yZW11eEluaXRTZWdtZW50KHR5cGUsIHRyYWNrLm1ldGEpO1xuICAgIC8vIHNvdXJjZS5pbml0ZWQgPSBmYWxzZTtcblxuICAgIC8vIHRoaXMucmVzZXREdHNCYXNlKClcbiAgICB0aGlzLmVtaXQoUkVNVVhfRVZFTlRTLklOSVRfU0VHTUVOVCwgdHlwZSlcbiAgfVxuXG4gIHJlbXV4SW5pdFNlZ21lbnQgKHR5cGUsIG1ldGEpIHtcbiAgICBsZXQgaW5pdFNlZ21lbnQgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgZnR5cCA9IEZtcDQuZnR5cCgpXG4gICAgbGV0IG1vb3YgPSBGbXA0Lm1vb3YoeyB0eXBlLCBtZXRhOiBtZXRhIH0pXG5cbiAgICBpbml0U2VnbWVudC53cml0ZShmdHlwLCBtb292KVxuICAgIHJldHVybiBpbml0U2VnbWVudDtcbiAgfVxuXG4gIGNhbGNEdHNCYXNlIChhdWRpb1RyYWNrLCB2aWRlb1RyYWNrKSB7XG4gICAgaWYgKCFhdWRpb1RyYWNrLnNhbXBsZXMubGVuZ3RoICYmICF2aWRlb1RyYWNrLnNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGF1ZGlvQmFzZSA9IEluZmluaXR5XG4gICAgbGV0IHZpZGVvQmFzZSA9IEluZmluaXR5XG5cbiAgICBpZiAoYXVkaW9UcmFjay5zYW1wbGVzICYmIGF1ZGlvVHJhY2suc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIGF1ZGlvQmFzZSA9IGF1ZGlvVHJhY2suc2FtcGxlc1swXS5kdHNcbiAgICB9XG4gICAgaWYgKHZpZGVvVHJhY2suc2FtcGxlcyAmJiB2aWRlb1RyYWNrLnNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICB2aWRlb0Jhc2UgPSB2aWRlb1RyYWNrLnNhbXBsZXNbMF0uZHRzXG4gICAgfVxuXG4gICAgdGhpcy5fZHRzQmFzZSA9IE1hdGgubWluKGF1ZGlvQmFzZSwgdmlkZW9CYXNlKVxuICAgIHRoaXMuX2lzRHRzQmFzZUluaXRlZCA9IHRydWVcbiAgfVxuXG4gIF9yZW11eFZpZGVvICh2aWRlb1RyYWNrKSB7XG4gICAgY29uc3QgdHJhY2sgPSB2aWRlb1RyYWNrXG5cbiAgICBpZiAoIXZpZGVvVHJhY2suc2FtcGxlcyB8fCAhdmlkZW9UcmFjay5zYW1wbGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IHtzYW1wbGVzfSA9IHRyYWNrXG4gICAgbGV0IGZpcnN0RHRzID0gLTFcblxuICAgIGxldCBpbml0U2VnbWVudCA9IG51bGxcbiAgICBjb25zdCBtcDRTYW1wbGVzID0gW11cbiAgICBjb25zdCBtZGF0Qm94ID0ge1xuICAgICAgc2FtcGxlczogW11cbiAgICB9XG5cbiAgICB3aGlsZSAoc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGF2Y1NhbXBsZSA9IHNhbXBsZXMuc2hpZnQoKVxuXG4gICAgICBjb25zdCB7IGlzS2V5ZnJhbWUsIG9wdGlvbnMgfSA9IGF2Y1NhbXBsZVxuICAgICAgaWYgKCF0aGlzLmlzRmlyc3RBdWRpbyAmJiBvcHRpb25zICYmIG9wdGlvbnMubWV0YSkge1xuICAgICAgICBpbml0U2VnbWVudCA9IHRoaXMucmVtdXhJbml0U2VnbWVudCgndmlkZW8nLCBvcHRpb25zLm1ldGEpXG4gICAgICAgIG9wdGlvbnMubWV0YSA9IG51bGxcbiAgICAgICAgc2FtcGxlcy51bnNoaWZ0KGF2Y1NhbXBsZSlcbiAgICAgICAgaWYgKCFvcHRpb25zLmlzQ29udGludWUpIHtcbiAgICAgICAgICB0aGlzLnJlc2V0RHRzQmFzZSgpXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGxldCBkdHMgPSBhdmNTYW1wbGUuZHRzIC0gdGhpcy5fZHRzQmFzZVxuXG4gICAgICBpZiAoZmlyc3REdHMgPT09IC0xKSB7XG4gICAgICAgIGZpcnN0RHRzID0gZHRzXG4gICAgICB9XG5cbiAgICAgIGxldCBjdHNcbiAgICAgIGxldCBwdHNcbiAgICAgIGlmIChhdmNTYW1wbGUucHRzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcHRzID0gYXZjU2FtcGxlLnB0cyAtIHRoaXMuX2R0c0Jhc2VcbiAgICAgICAgY3RzID0gcHRzIC0gZHRzXG4gICAgICB9XG4gICAgICBpZiAoYXZjU2FtcGxlLmN0cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHB0cyA9IGF2Y1NhbXBsZS5jdHMgKyBkdHNcbiAgICAgICAgY3RzID0gYXZjU2FtcGxlLmN0c1xuICAgICAgfVxuXG4gICAgICBsZXQgbWRhdFNhbXBsZSA9IHtcbiAgICAgICAgYnVmZmVyOiBbXSxcbiAgICAgICAgc2l6ZTogMFxuICAgICAgfVxuICAgICAgbWRhdEJveC5zYW1wbGVzLnB1c2gobWRhdFNhbXBsZSlcbiAgICAgIG1kYXRTYW1wbGUuYnVmZmVyLnB1c2goYXZjU2FtcGxlLmRhdGEpXG4gICAgICBtZGF0U2FtcGxlLnNpemUgKz0gYXZjU2FtcGxlLmRhdGEuYnl0ZUxlbmd0aFxuXG4gICAgICBsZXQgc2FtcGxlRHVyYXRpb24gPSAwXG4gICAgICBpZiAoc2FtcGxlcy5sZW5ndGggPj0gMSkge1xuICAgICAgICBjb25zdCBuZXh0RHRzID0gc2FtcGxlc1swXS5kdHMgLSB0aGlzLl9kdHNCYXNlXG4gICAgICAgIHNhbXBsZUR1cmF0aW9uID0gbmV4dER0cyAtIGR0c1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG1wNFNhbXBsZXMubGVuZ3RoID49IDEpIHsgLy8gbGFzdGVzdCBzYW1wbGUsIHVzZSBzZWNvbmQgbGFzdCBkdXJhdGlvblxuICAgICAgICAgIHNhbXBsZUR1cmF0aW9uID0gbXA0U2FtcGxlc1ttcDRTYW1wbGVzLmxlbmd0aCAtIDFdLmR1cmF0aW9uXG4gICAgICAgIH0gZWxzZSB7IC8vIHRoZSBvbmx5IG9uZSBzYW1wbGUsIHVzZSByZWZlcmVuY2UgZHVyYXRpb25cbiAgICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IHRoaXMudmlkZW9NZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMudmlkZW9BbGxEdXJhdGlvbiArPSBzYW1wbGVEdXJhdGlvblxuICAgICAgLy8gY29uc29sZS5sb2coYGR0cyAke2R0c31gLCBgcHRzICR7cHRzfWAsIGBjdHM6ICR7Y3RzfWAsIGBkdXJhdGlvbjogJHtzYW1wbGVEdXJhdGlvbn1gLCBhdmNTYW1wbGUpXG4gICAgICBtcDRTYW1wbGVzLnB1c2goe1xuICAgICAgICBkdHMsXG4gICAgICAgIGN0cyxcbiAgICAgICAgcHRzLFxuICAgICAgICBkYXRhOiBhdmNTYW1wbGUuZGF0YSxcbiAgICAgICAgc2l6ZTogYXZjU2FtcGxlLmRhdGEuYnl0ZUxlbmd0aCxcbiAgICAgICAgaXNLZXlmcmFtZSxcbiAgICAgICAgZHVyYXRpb246IHNhbXBsZUR1cmF0aW9uLFxuICAgICAgICBmbGFnczoge1xuICAgICAgICAgIGlzTGVhZGluZzogMCxcbiAgICAgICAgICBkZXBlbmRzT246IGlzS2V5ZnJhbWUgPyAyIDogMSxcbiAgICAgICAgICBpc0RlcGVuZGVkT246IGlzS2V5ZnJhbWUgPyAxIDogMCxcbiAgICAgICAgICBoYXNSZWR1bmRhbmN5OiAwLFxuICAgICAgICAgIGlzTm9uU3luYzogaXNLZXlmcmFtZSA/IDAgOiAxXG4gICAgICAgIH0sXG4gICAgICAgIG9yaWdpbkR0czogZHRzLFxuICAgICAgICB0eXBlOiAndmlkZW8nXG4gICAgICB9KVxuICAgIH1cblxuICAgIGxldCBtb29mTWRhdCA9IG5ldyBCdWZmZXIoKVxuICAgIGlmIChtcDRTYW1wbGVzLmxlbmd0aCkge1xuICAgICAgY29uc3QgbW9vZiA9IEZtcDQubW9vZih7XG4gICAgICAgIGlkOiB0cmFjay5tZXRhLmlkLFxuICAgICAgICB0aW1lOiBmaXJzdER0cyxcbiAgICAgICAgc2FtcGxlczogbXA0U2FtcGxlc1xuICAgICAgfSlcbiAgICAgIGNvbnN0IG1kYXQgPSBGbXA0Lm1kYXQobWRhdEJveClcbiAgICAgIG1vb2ZNZGF0LndyaXRlKG1vb2YsIG1kYXQpXG5cbiAgICAgIHRoaXMud3JpdGVUb1NvdXJjZSgndmlkZW8nLCBtb29mTWRhdClcbiAgICB9XG5cbiAgICBpZiAoaW5pdFNlZ21lbnQpIHtcbiAgICAgIHRoaXMud3JpdGVUb1NvdXJjZSgndmlkZW8nLCBpbml0U2VnbWVudClcblxuICAgICAgaWYgKHNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICAgIC8vIHNlY29uZCBwYXJ0IG9mIHN0cmVhbSBjaGFuZ2VcbiAgICAgICAgdHJhY2suc2FtcGxlcyA9IHNhbXBsZXM7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZW11eFZpZGVvKHRyYWNrKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaXNGaXJzdFZpZGVvID0gZmFsc2VcbiAgICB0aGlzLmVtaXQoUkVNVVhfRVZFTlRTLk1FRElBX1NFR01FTlQsICd2aWRlbycpXG5cbiAgICBjb25zdCBsYXN0U2FtcGxlID0gbXA0U2FtcGxlc1ttcDRTYW1wbGVzLmxlbmd0aCAtIDFdXG4gICAgdGhpcy5fdmlkZW9OZXh0RHRzID0gbGFzdFNhbXBsZS5kdHMgKyBsYXN0U2FtcGxlLmR1cmF0aW9uO1xuICAgIHRyYWNrLnNhbXBsZXMgPSBbXVxuICAgIHRyYWNrLmxlbmd0aCA9IDBcbiAgfVxuXG4gIF9yZW11eEF1ZGlvICh0cmFjaykge1xuICAgIGNvbnN0IHtzYW1wbGVzfSA9IHRyYWNrXG4gICAgbGV0IGZpcnN0RHRzID0gLTFcbiAgICBsZXQgbXA0U2FtcGxlcyA9IFtdXG5cbiAgICBsZXQgaW5pdFNlZ21lbnQgPSBudWxsXG4gICAgY29uc3QgbWRhdEJveCA9IHtcbiAgICAgIHNhbXBsZXM6IFtdXG4gICAgfVxuICAgIGlmICghc2FtcGxlcyB8fCAhc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBsZXQgaXNGaXJzdER0c0luaXRlZCA9IGZhbHNlXG4gICAgd2hpbGUgKHNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICBsZXQgc2FtcGxlID0gc2FtcGxlcy5zaGlmdCgpXG4gICAgICBjb25zdCB7IGRhdGEsIG9wdGlvbnMgfSA9IHNhbXBsZVxuICAgICAgaWYgKCF0aGlzLmlzRmlyc3RBdWRpbyAmJiBvcHRpb25zICYmIG9wdGlvbnMubWV0YSkge1xuICAgICAgICBpbml0U2VnbWVudCA9IHRoaXMucmVtdXhJbml0U2VnbWVudCgnYXVkaW8nLCBvcHRpb25zLm1ldGEpXG4gICAgICAgIG9wdGlvbnMubWV0YSA9IG51bGw7XG4gICAgICAgIHNhbXBsZXMudW5zaGlmdChzYW1wbGUpXG4gICAgICAgIGlmICghb3B0aW9ucy5pc0NvbnRpbnVlKSB7XG4gICAgICAgICAgdGhpcy5yZXNldER0c0Jhc2UoKVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBsZXQgZHRzID0gc2FtcGxlLmR0cyAtIHRoaXMuX2R0c0Jhc2VcbiAgICAgIGNvbnN0IG9yaWdpbkR0cyA9IGR0c1xuICAgICAgaWYgKCFpc0ZpcnN0RHRzSW5pdGVkKSB7XG4gICAgICAgIGZpcnN0RHRzID0gZHRzXG4gICAgICAgIGlzRmlyc3REdHNJbml0ZWQgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGxldCBzYW1wbGVEdXJhdGlvbiA9IDBcblxuICAgICAgaWYgKHRoaXMuYXVkaW9NZXRhLnJlZlNhbXBsZUR1cmF0aW9uRml4ZWQpIHtcbiAgICAgICAgc2FtcGxlRHVyYXRpb24gPSB0aGlzLmF1ZGlvTWV0YS5yZWZTYW1wbGVEdXJhdGlvbkZpeGVkXG4gICAgICB9IGVsc2UgaWYgKHNhbXBsZXMubGVuZ3RoID49IDEpIHtcbiAgICAgICAgY29uc3QgbmV4dER0cyA9IHNhbXBsZXNbMF0uZHRzIC0gdGhpcy5fZHRzQmFzZTtcbiAgICAgICAgc2FtcGxlRHVyYXRpb24gPSBuZXh0RHRzIC0gZHRzXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobXA0U2FtcGxlcy5sZW5ndGggPj0gMSkgeyAvLyB1c2Ugc2Vjb25kIGxhc3Qgc2FtcGxlIGR1cmF0aW9uXG4gICAgICAgICAgc2FtcGxlRHVyYXRpb24gPSBtcDRTYW1wbGVzW21wNFNhbXBsZXMubGVuZ3RoIC0gMV0uZHVyYXRpb25cbiAgICAgICAgfSBlbHNlIHsgLy8gdGhlIG9ubHkgb25lIHNhbXBsZSwgdXNlIHJlZmVyZW5jZSBzYW1wbGUgZHVyYXRpb25cbiAgICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IHRoaXMuYXVkaW9NZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gY29uc29sZS5sb2coJ3JlbXV4IGF1ZGlvICcsIGR0cylcbiAgICAgIHRoaXMuYXVkaW9BbGxEdXJhdGlvbiArPSBzYW1wbGVEdXJhdGlvblxuICAgICAgY29uc3QgbXA0U2FtcGxlID0ge1xuICAgICAgICBkdHMsXG4gICAgICAgIHB0czogZHRzLFxuICAgICAgICBjdHM6IDAsXG4gICAgICAgIHNpemU6IGRhdGEuYnl0ZUxlbmd0aCxcbiAgICAgICAgZHVyYXRpb246IHNhbXBsZS5kdXJhdGlvbiA/IHNhbXBsZS5kdXJhdGlvbiA6IHNhbXBsZUR1cmF0aW9uLFxuICAgICAgICBmbGFnczoge1xuICAgICAgICAgIGlzTGVhZGluZzogMCxcbiAgICAgICAgICBkZXBlbmRzT246IDIsXG4gICAgICAgICAgaXNEZXBlbmRlZE9uOiAxLFxuICAgICAgICAgIGhhc1JlZHVuZGFuY3k6IDAsXG4gICAgICAgICAgaXNOb25TeW5jOiAwXG4gICAgICAgIH0sXG4gICAgICAgIGlzS2V5ZnJhbWU6IHRydWUsXG4gICAgICAgIG9yaWdpbkR0cyxcbiAgICAgICAgdHlwZTogJ2F1ZGlvJ1xuICAgICAgfVxuXG4gICAgICBsZXQgbWRhdFNhbXBsZSA9IHtcbiAgICAgICAgYnVmZmVyOiBbXSxcbiAgICAgICAgc2l6ZTogMFxuICAgICAgfVxuICAgICAgbWRhdFNhbXBsZS5idWZmZXIucHVzaChkYXRhKVxuICAgICAgbWRhdFNhbXBsZS5zaXplICs9IGRhdGEuYnl0ZUxlbmd0aFxuXG4gICAgICBtZGF0Qm94LnNhbXBsZXMucHVzaChtZGF0U2FtcGxlKVxuXG4gICAgICBtcDRTYW1wbGVzLnB1c2gobXA0U2FtcGxlKVxuICAgIH1cblxuICAgIGNvbnN0IG1vb2ZNZGF0ID0gbmV3IEJ1ZmZlcigpXG5cbiAgICBpZiAobXA0U2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IG1vb2YgPSBGbXA0Lm1vb2Yoe1xuICAgICAgICBpZDogdHJhY2subWV0YS5pZCxcbiAgICAgICAgdGltZTogZmlyc3REdHMsXG4gICAgICAgIHNhbXBsZXM6IG1wNFNhbXBsZXNcbiAgICAgIH0pXG4gICAgICBjb25zdCBtZGF0ID0gRm1wNC5tZGF0KG1kYXRCb3gpXG4gICAgICBtb29mTWRhdC53cml0ZShtb29mLCBtZGF0KVxuXG4gICAgICB0aGlzLndyaXRlVG9Tb3VyY2UoJ2F1ZGlvJywgbW9vZk1kYXQpXG4gICAgfVxuXG4gICAgaWYgKGluaXRTZWdtZW50KSB7XG4gICAgICB0aGlzLndyaXRlVG9Tb3VyY2UoJ2F1ZGlvJywgaW5pdFNlZ21lbnQpXG4gICAgICBpZiAoc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgICAgLy8gc2Vjb25kIHBhcnQgb2Ygc3RyZWFtIGNoYW5nZVxuICAgICAgICB0cmFjay5zYW1wbGVzID0gc2FtcGxlcztcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbXV4QXVkaW8odHJhY2spXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5pc0ZpcnN0QXVkaW8gPSBmYWxzZVxuICAgIHRoaXMuZW1pdChSRU1VWF9FVkVOVFMuTUVESUFfU0VHTUVOVCwgJ2F1ZGlvJywgbW9vZk1kYXQpXG5cbiAgICBjb25zdCBsYXN0U2FtcGxlID0gbXA0U2FtcGxlc1ttcDRTYW1wbGVzLmxlbmd0aCAtIDFdXG4gICAgdGhpcy5fdmlkZW9OZXh0RHRzID0gbGFzdFNhbXBsZS5kdHMgKyBsYXN0U2FtcGxlLmR1cmF0aW9uO1xuICAgIHRyYWNrLnNhbXBsZXMgPSBbXVxuICAgIHRyYWNrLmxlbmd0aCA9IDBcbiAgfVxuXG4gIHdyaXRlVG9Tb3VyY2UgKHR5cGUsIGJ1ZmZlcikge1xuICAgIGxldCBwcmVzb3VyY2VidWZmZXIgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdQUkVfU09VUkNFX0JVRkZFUicpO1xuICAgIGxldCBzb3VyY2UgPSBwcmVzb3VyY2VidWZmZXIuZ2V0U291cmNlKHR5cGUpO1xuICAgIGlmICghc291cmNlKSB7XG4gICAgICBzb3VyY2UgPSBwcmVzb3VyY2VidWZmZXIuY3JlYXRlU291cmNlKHR5cGUpO1xuICAgIH1cblxuICAgIHNvdXJjZS5kYXRhLnB1c2goYnVmZmVyKVxuICB9XG5cbiAgaW5pdFNpbGVudEF1ZGlvIChkdHMsIGR1cmF0aW9uKSB7XG4gICAgY29uc3QgdW5pdCA9IE1wNFJlbXV4ZXIuZ2V0U2lsZW50RnJhbWUodGhpcy5hdWRpb01ldGEuY2hhbm5lbENvdW50KVxuICAgIHJldHVybiB7XG4gICAgICBkdHMsXG4gICAgICBwdHM6IGR0cyxcbiAgICAgIGN0czogMCxcbiAgICAgIGR1cmF0aW9uLFxuICAgICAgdW5pdCxcbiAgICAgIHNpemU6IHVuaXQuYnl0ZUxlbmd0aCxcbiAgICAgIG9yaWdpbkR0czogZHRzLFxuICAgICAgdHlwZTogJ3ZpZGVvJ1xuICAgIH1cbiAgfVxuXG4gIGdldCB2aWRlb01ldGEgKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKS52aWRlb1RyYWNrLm1ldGFcbiAgfVxuICBnZXQgYXVkaW9NZXRhICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJykuYXVkaW9UcmFjay5tZXRhXG4gIH1cblxuICBzdGF0aWMgZ2V0U2lsZW50RnJhbWUgKGNoYW5uZWxDb3VudCkge1xuICAgIGlmIChjaGFubmVsQ291bnQgPT09IDEpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMywgMHg4MF0pXG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDIpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgyMSwgMHgwMCwgMHg0OSwgMHg5MCwgMHgwMiwgMHgxOSwgMHgwMCwgMHgyMywgMHg4MF0pXG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDMpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4ZV0pXG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDQpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4MCwgMHgyYywgMHg4MCwgMHgwOCwgMHgwMiwgMHgzOF0pXG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDUpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4MiwgMHgzMCwgMHgwNCwgMHg5OSwgMHgwMCwgMHgyMSwgMHg5MCwgMHgwMiwgMHgzOF0pXG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDYpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4MiwgMHgzMCwgMHgwNCwgMHg5OSwgMHgwMCwgMHgyMSwgMHg5MCwgMHgwMiwgMHgwMCwgMHhiMiwgMHgwMCwgMHgyMCwgMHgwOCwgMHhlMF0pXG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBDb250ZXh0OiByZXF1aXJlKCcuL3NyYy9jb250ZXh0JykuZGVmYXVsdCxcblxuICAvLyBNb2R1bGVzIGZyb20gY29uc3RhbnRzXG4gIEVWRU5UUzogcmVxdWlyZSgnLi9zcmMvY29uc3RhbnRzL2V2ZW50cycpLmRlZmF1bHQsXG4gIFdPUktFUl9DT01NQU5EUzogcmVxdWlyZSgnLi9zcmMvY29uc3RhbnRzL3dvcmtlci1jb21tYW5kcycpLmRlZmF1bHQsXG5cbiAgLy8gTW9kdWxlcyBmcm9tIGVudlxuICBzbmlmZmVyOiByZXF1aXJlKCcuL3NyYy9lbnYvc25pZmZlcicpLmRlZmF1bHQsXG4gIGlzTGU6IHJlcXVpcmUoJy4vc3JjL2Vudi9pc2xlJykuZGVmYXVsdCxcbiAgVVRGODogcmVxdWlyZSgnLi9zcmMvZW52L3V0ZjgnKS5kZWZhdWx0LFxuXG4gIC8vIE1vZGVsc1xuICBNZWRpYUluZm86IHJlcXVpcmUoJy4vc3JjL21vZGVscy9tZWRpYS1pbmZvJykuZGVmYXVsdCxcbiAgTWVkaWFTYW1wbGU6IHJlcXVpcmUoJy4vc3JjL21vZGVscy9tZWRpYS1zYW1wbGUnKS5kZWZhdWx0LFxuICBNZWRpYVNlZ21lbnQ6IHJlcXVpcmUoJy4vc3JjL21vZGVscy9tZWRpYS1zZWdtZW50JykuZGVmYXVsdCxcbiAgTWVkaWFTZWdtZW50TGlzdDogcmVxdWlyZSgnLi9zcmMvbW9kZWxzL21lZGlhLXNlZ21lbnQtbGlzdCcpLmRlZmF1bHQsXG4gIEF1ZGlvVHJhY2tNZXRhOiByZXF1aXJlKCcuL3NyYy9tb2RlbHMvdHJhY2stbWV0YScpLkF1ZGlvVHJhY2tNZXRhLFxuICBWaWRlb1RyYWNrTWV0YTogcmVxdWlyZSgnLi9zcmMvbW9kZWxzL3RyYWNrLW1ldGEnKS5WaWRlb1RyYWNrTWV0YSxcbiAgQXVkaW9UcmFja1NhbXBsZTogcmVxdWlyZSgnLi9zcmMvbW9kZWxzL3RyYWNrLXNhbXBsZScpLkF1ZGlvVHJhY2tTYW1wbGUsXG4gIFZpZGVvVHJhY2tTYW1wbGU6IHJlcXVpcmUoJy4vc3JjL21vZGVscy90cmFjay1zYW1wbGUnKS5WaWRlb1RyYWNrU2FtcGxlLFxuXG4gIC8vIE1vZHVsZXMgZnJvbSBtc2VcbiAgTXNlOiByZXF1aXJlKCcuL3NyYy9tc2UvaW5kZXgnKS5kZWZhdWx0LFxuXG4gIC8vIE1vZHVsZXMgZnJvbSB3cml0ZVxuICBTdHJlYW06IHJlcXVpcmUoJy4vc3JjL3dyaXRlL3N0cmVhbScpLmRlZmF1bHQsXG4gIEJ1ZmZlcjogcmVxdWlyZSgnLi9zcmMvd3JpdGUvYnVmZmVyJykuZGVmYXVsdCxcblxuICBNb2JpbGVWaWRlbzogcmVxdWlyZSgnLi9zcmMvbW9iaWxlL21vYmlsZS12aWRlbycpLFxuICAvLyBDcnlwdG9cbiAgQ3J5cHRvOiByZXF1aXJlKCcuL3NyYy9jcnlwdG8nKS5kZWZhdWx0XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChSZXN1bHRDb25zdHJ1Y3Rvcikge1xuICB2YXIgdG90YWxMZW5ndGggPSAwO1xuXG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcnJheXMgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJyYXlzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGFycmF5c1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgIHZhciBhcnIgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgdG90YWxMZW5ndGggKz0gYXJyLmxlbmd0aDtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIHJlc3VsdCA9IG5ldyBSZXN1bHRDb25zdHJ1Y3Rvcih0b3RhbExlbmd0aCk7XG4gIHZhciBvZmZzZXQgPSAwO1xuICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlO1xuICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7XG4gIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gYXJyYXlzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAyOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gKF9zdGVwMiA9IF9pdGVyYXRvcjIubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlKSB7XG4gICAgICB2YXIgX2FyciA9IF9zdGVwMi52YWx1ZTtcblxuICAgICAgcmVzdWx0LnNldChfYXJyLCBvZmZzZXQpO1xuICAgICAgb2Zmc2V0ICs9IF9hcnIubGVuZ3RoO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICBfaXRlcmF0b3JFcnJvcjIgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgJiYgX2l0ZXJhdG9yMi5yZXR1cm4pIHtcbiAgICAgICAgX2l0ZXJhdG9yMi5yZXR1cm4oKTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NvbmNhdCA9IHJlcXVpcmUoJy4vY29uY2F0Jyk7XG5cbnZhciBfY29uY2F0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmNhdCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbm1vZHVsZS5leHBvcnRzID0gX2NvbmNhdDIuZGVmYXVsdDsiLCJmdW5jdGlvbiB3ZWJwYWNrQm9vdHN0cmFwRnVuYyAobW9kdWxlcykge1xuLyoqKioqKi8gIC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovICB2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4vKioqKioqLyAgLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovICBmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbi8qKioqKiovICAgIC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gICAgaWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4vKioqKioqLyAgICAgIHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4vKioqKioqLyAgICAvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gICAgdmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gICAgICBpOiBtb2R1bGVJZCxcbi8qKioqKiovICAgICAgbDogZmFsc2UsXG4vKioqKioqLyAgICAgIGV4cG9ydHM6IHt9XG4vKioqKioqLyAgICB9O1xuXG4vKioqKioqLyAgICAvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovICAgIG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4vKioqKioqLyAgICAvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyAgICBtb2R1bGUubCA9IHRydWU7XG5cbi8qKioqKiovICAgIC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyAgfVxuXG4vKioqKioqLyAgLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovICBfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4vKioqKioqLyAgLy8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovICBfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4vKioqKioqLyAgLy8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuLyoqKioqKi8gIC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuLyoqKioqKi8gICAgaWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuLyoqKioqKi8gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuLyoqKioqKi8gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4vKioqKioqLyAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbi8qKioqKiovICAgICAgICBnZXQ6IGdldHRlclxuLyoqKioqKi8gICAgICB9KTtcbi8qKioqKiovICAgIH1cbi8qKioqKiovICB9O1xuXG4vKioqKioqLyAgLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbi8qKioqKiovICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4vKioqKioqLyAgfTtcblxuLyoqKioqKi8gIC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4vKioqKioqLyAgX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4vKioqKioqLyAgICB2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbi8qKioqKiovICAgICAgZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbi8qKioqKiovICAgICAgZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbi8qKioqKiovICAgIF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbi8qKioqKiovICAgIHJldHVybiBnZXR0ZXI7XG4vKioqKioqLyAgfTtcblxuLyoqKioqKi8gIC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuLyoqKioqKi8gIC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4vKioqKioqLyAgX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbi8qKioqKiovICAvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18ub2UgPSBmdW5jdGlvbihlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB0aHJvdyBlcnI7IH07XG5cbiAgdmFyIGYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IEVOVFJZX01PRFVMRSlcbiAgcmV0dXJuIGYuZGVmYXVsdCB8fCBmIC8vIHRyeSB0byBjYWxsIGRlZmF1bHQgaWYgZGVmaW5lZCB0byBhbHNvIHN1cHBvcnQgYmFiZWwgZXNtb2R1bGUgZXhwb3J0c1xufVxuXG52YXIgbW9kdWxlTmFtZVJlcUV4cCA9ICdbXFxcXC58XFxcXC18XFxcXCt8XFxcXHd8XFwvfEBdKydcbnZhciBkZXBlbmRlbmN5UmVnRXhwID0gJ1xcXFwoXFxcXHMqKFxcL1xcXFwqLio/XFxcXCpcXC8pP1xcXFxzKi4qPygnICsgbW9kdWxlTmFtZVJlcUV4cCArICcpLio/XFxcXCknIC8vIGFkZGl0aW9uYWwgY2hhcnMgd2hlbiBvdXRwdXQucGF0aGluZm8gaXMgdHJ1ZVxuXG4vLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNTkzNjYxLzEzMDQ0MlxuZnVuY3Rpb24gcXVvdGVSZWdFeHAgKHN0cikge1xuICByZXR1cm4gKHN0ciArICcnKS5yZXBsYWNlKC9bLj8qK14kW1xcXVxcXFwoKXt9fC1dL2csICdcXFxcJCYnKVxufVxuXG5mdW5jdGlvbiBpc051bWVyaWMobikge1xuICByZXR1cm4gIWlzTmFOKDEgKiBuKTsgLy8gMSAqIG4gY29udmVydHMgaW50ZWdlcnMsIGludGVnZXJzIGFzIHN0cmluZyAoXCIxMjNcIiksIDFlMyBhbmQgXCIxZTNcIiB0byBpbnRlZ2VycyBhbmQgc3RyaW5ncyB0byBOYU5cbn1cblxuZnVuY3Rpb24gZ2V0TW9kdWxlRGVwZW5kZW5jaWVzIChzb3VyY2VzLCBtb2R1bGUsIHF1ZXVlTmFtZSkge1xuICB2YXIgcmV0dmFsID0ge31cbiAgcmV0dmFsW3F1ZXVlTmFtZV0gPSBbXVxuXG4gIHZhciBmblN0cmluZyA9IG1vZHVsZS50b1N0cmluZygpXG4gIHZhciB3cmFwcGVyU2lnbmF0dXJlID0gZm5TdHJpbmcubWF0Y2goL15mdW5jdGlvblxccz9cXHcqXFwoXFx3KyxcXHMqXFx3KyxcXHMqKFxcdyspXFwpLylcbiAgaWYgKCF3cmFwcGVyU2lnbmF0dXJlKSByZXR1cm4gcmV0dmFsXG4gIHZhciB3ZWJwYWNrUmVxdWlyZU5hbWUgPSB3cmFwcGVyU2lnbmF0dXJlWzFdXG5cbiAgLy8gbWFpbiBidW5kbGUgZGVwc1xuICB2YXIgcmUgPSBuZXcgUmVnRXhwKCcoXFxcXFxcXFxufFxcXFxXKScgKyBxdW90ZVJlZ0V4cCh3ZWJwYWNrUmVxdWlyZU5hbWUpICsgZGVwZW5kZW5jeVJlZ0V4cCwgJ2cnKVxuICB2YXIgbWF0Y2hcbiAgd2hpbGUgKChtYXRjaCA9IHJlLmV4ZWMoZm5TdHJpbmcpKSkge1xuICAgIGlmIChtYXRjaFszXSA9PT0gJ2RsbC1yZWZlcmVuY2UnKSBjb250aW51ZVxuICAgIHJldHZhbFtxdWV1ZU5hbWVdLnB1c2gobWF0Y2hbM10pXG4gIH1cblxuICAvLyBkbGwgZGVwc1xuICByZSA9IG5ldyBSZWdFeHAoJ1xcXFwoJyArIHF1b3RlUmVnRXhwKHdlYnBhY2tSZXF1aXJlTmFtZSkgKyAnXFxcXChcIihkbGwtcmVmZXJlbmNlXFxcXHMoJyArIG1vZHVsZU5hbWVSZXFFeHAgKyAnKSlcIlxcXFwpXFxcXCknICsgZGVwZW5kZW5jeVJlZ0V4cCwgJ2cnKVxuICB3aGlsZSAoKG1hdGNoID0gcmUuZXhlYyhmblN0cmluZykpKSB7XG4gICAgaWYgKCFzb3VyY2VzW21hdGNoWzJdXSkge1xuICAgICAgcmV0dmFsW3F1ZXVlTmFtZV0ucHVzaChtYXRjaFsxXSlcbiAgICAgIHNvdXJjZXNbbWF0Y2hbMl1dID0gX193ZWJwYWNrX3JlcXVpcmVfXyhtYXRjaFsxXSkubVxuICAgIH1cbiAgICByZXR2YWxbbWF0Y2hbMl1dID0gcmV0dmFsW21hdGNoWzJdXSB8fCBbXVxuICAgIHJldHZhbFttYXRjaFsyXV0ucHVzaChtYXRjaFs0XSlcbiAgfVxuXG4gIC8vIGNvbnZlcnQgMWUzIGJhY2sgdG8gMTAwMCAtIHRoaXMgY2FuIGJlIGltcG9ydGFudCBhZnRlciB1Z2xpZnktanMgY29udmVydGVkIDEwMDAgdG8gMWUzXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMocmV0dmFsKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCByZXR2YWxba2V5c1tpXV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIGlmIChpc051bWVyaWMocmV0dmFsW2tleXNbaV1dW2pdKSkge1xuICAgICAgICByZXR2YWxba2V5c1tpXV1bal0gPSAxICogcmV0dmFsW2tleXNbaV1dW2pdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXR2YWxcbn1cblxuZnVuY3Rpb24gaGFzVmFsdWVzSW5RdWV1ZXMgKHF1ZXVlcykge1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHF1ZXVlcylcbiAgcmV0dXJuIGtleXMucmVkdWNlKGZ1bmN0aW9uIChoYXNWYWx1ZXMsIGtleSkge1xuICAgIHJldHVybiBoYXNWYWx1ZXMgfHwgcXVldWVzW2tleV0ubGVuZ3RoID4gMFxuICB9LCBmYWxzZSlcbn1cblxuZnVuY3Rpb24gZ2V0UmVxdWlyZWRNb2R1bGVzIChzb3VyY2VzLCBtb2R1bGVJZCkge1xuICB2YXIgbW9kdWxlc1F1ZXVlID0ge1xuICAgIG1haW46IFttb2R1bGVJZF1cbiAgfVxuICB2YXIgcmVxdWlyZWRNb2R1bGVzID0ge1xuICAgIG1haW46IFtdXG4gIH1cbiAgdmFyIHNlZW5Nb2R1bGVzID0ge1xuICAgIG1haW46IHt9XG4gIH1cblxuICB3aGlsZSAoaGFzVmFsdWVzSW5RdWV1ZXMobW9kdWxlc1F1ZXVlKSkge1xuICAgIHZhciBxdWV1ZXMgPSBPYmplY3Qua2V5cyhtb2R1bGVzUXVldWUpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBxdWV1ZU5hbWUgPSBxdWV1ZXNbaV1cbiAgICAgIHZhciBxdWV1ZSA9IG1vZHVsZXNRdWV1ZVtxdWV1ZU5hbWVdXG4gICAgICB2YXIgbW9kdWxlVG9DaGVjayA9IHF1ZXVlLnBvcCgpXG4gICAgICBzZWVuTW9kdWxlc1txdWV1ZU5hbWVdID0gc2Vlbk1vZHVsZXNbcXVldWVOYW1lXSB8fCB7fVxuICAgICAgaWYgKHNlZW5Nb2R1bGVzW3F1ZXVlTmFtZV1bbW9kdWxlVG9DaGVja10gfHwgIXNvdXJjZXNbcXVldWVOYW1lXVttb2R1bGVUb0NoZWNrXSkgY29udGludWVcbiAgICAgIHNlZW5Nb2R1bGVzW3F1ZXVlTmFtZV1bbW9kdWxlVG9DaGVja10gPSB0cnVlXG4gICAgICByZXF1aXJlZE1vZHVsZXNbcXVldWVOYW1lXSA9IHJlcXVpcmVkTW9kdWxlc1txdWV1ZU5hbWVdIHx8IFtdXG4gICAgICByZXF1aXJlZE1vZHVsZXNbcXVldWVOYW1lXS5wdXNoKG1vZHVsZVRvQ2hlY2spXG4gICAgICB2YXIgbmV3TW9kdWxlcyA9IGdldE1vZHVsZURlcGVuZGVuY2llcyhzb3VyY2VzLCBzb3VyY2VzW3F1ZXVlTmFtZV1bbW9kdWxlVG9DaGVja10sIHF1ZXVlTmFtZSlcbiAgICAgIHZhciBuZXdNb2R1bGVzS2V5cyA9IE9iamVjdC5rZXlzKG5ld01vZHVsZXMpXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG5ld01vZHVsZXNLZXlzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIG1vZHVsZXNRdWV1ZVtuZXdNb2R1bGVzS2V5c1tqXV0gPSBtb2R1bGVzUXVldWVbbmV3TW9kdWxlc0tleXNbal1dIHx8IFtdXG4gICAgICAgIG1vZHVsZXNRdWV1ZVtuZXdNb2R1bGVzS2V5c1tqXV0gPSBtb2R1bGVzUXVldWVbbmV3TW9kdWxlc0tleXNbal1dLmNvbmNhdChuZXdNb2R1bGVzW25ld01vZHVsZXNLZXlzW2pdXSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVxdWlyZWRNb2R1bGVzXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG1vZHVsZUlkLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIHZhciBzb3VyY2VzID0ge1xuICAgIG1haW46IF9fd2VicGFja19tb2R1bGVzX19cbiAgfVxuXG4gIHZhciByZXF1aXJlZE1vZHVsZXMgPSBvcHRpb25zLmFsbCA/IHsgbWFpbjogT2JqZWN0LmtleXMoc291cmNlcy5tYWluKSB9IDogZ2V0UmVxdWlyZWRNb2R1bGVzKHNvdXJjZXMsIG1vZHVsZUlkKVxuXG4gIHZhciBzcmMgPSAnJ1xuXG4gIE9iamVjdC5rZXlzKHJlcXVpcmVkTW9kdWxlcykuZmlsdGVyKGZ1bmN0aW9uIChtKSB7IHJldHVybiBtICE9PSAnbWFpbicgfSkuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlKSB7XG4gICAgdmFyIGVudHJ5TW9kdWxlID0gMFxuICAgIHdoaWxlIChyZXF1aXJlZE1vZHVsZXNbbW9kdWxlXVtlbnRyeU1vZHVsZV0pIHtcbiAgICAgIGVudHJ5TW9kdWxlKytcbiAgICB9XG4gICAgcmVxdWlyZWRNb2R1bGVzW21vZHVsZV0ucHVzaChlbnRyeU1vZHVsZSlcbiAgICBzb3VyY2VzW21vZHVsZV1bZW50cnlNb2R1bGVdID0gJyhmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHsgbW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fOyB9KSdcbiAgICBzcmMgPSBzcmMgKyAndmFyICcgKyBtb2R1bGUgKyAnID0gKCcgKyB3ZWJwYWNrQm9vdHN0cmFwRnVuYy50b1N0cmluZygpLnJlcGxhY2UoJ0VOVFJZX01PRFVMRScsIEpTT04uc3RyaW5naWZ5KGVudHJ5TW9kdWxlKSkgKyAnKSh7JyArIHJlcXVpcmVkTW9kdWxlc1ttb2R1bGVdLm1hcChmdW5jdGlvbiAoaWQpIHsgcmV0dXJuICcnICsgSlNPTi5zdHJpbmdpZnkoaWQpICsgJzogJyArIHNvdXJjZXNbbW9kdWxlXVtpZF0udG9TdHJpbmcoKSB9KS5qb2luKCcsJykgKyAnfSk7XFxuJ1xuICB9KVxuXG4gIHNyYyA9IHNyYyArICduZXcgKCgnICsgd2VicGFja0Jvb3RzdHJhcEZ1bmMudG9TdHJpbmcoKS5yZXBsYWNlKCdFTlRSWV9NT0RVTEUnLCBKU09OLnN0cmluZ2lmeShtb2R1bGVJZCkpICsgJykoeycgKyByZXF1aXJlZE1vZHVsZXMubWFpbi5tYXAoZnVuY3Rpb24gKGlkKSB7IHJldHVybiAnJyArIEpTT04uc3RyaW5naWZ5KGlkKSArICc6ICcgKyBzb3VyY2VzLm1haW5baWRdLnRvU3RyaW5nKCkgfSkuam9pbignLCcpICsgJ30pKShzZWxmKTsnXG5cbiAgdmFyIGJsb2IgPSBuZXcgd2luZG93LkJsb2IoW3NyY10sIHsgdHlwZTogJ3RleHQvamF2YXNjcmlwdCcgfSlcbiAgaWYgKG9wdGlvbnMuYmFyZSkgeyByZXR1cm4gYmxvYiB9XG5cbiAgdmFyIFVSTCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTCB8fCB3aW5kb3cubW96VVJMIHx8IHdpbmRvdy5tc1VSTFxuXG4gIHZhciB3b3JrZXJVcmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpXG4gIHZhciB3b3JrZXIgPSBuZXcgd2luZG93Lldvcmtlcih3b3JrZXJVcmwpXG4gIHdvcmtlci5vYmplY3RVUkwgPSB3b3JrZXJVcmxcblxuICByZXR1cm4gd29ya2VyXG59XG4iLCJjb25zdCBMT0FERVJfRVZFTlRTID0ge1xuICBMQURFUl9TVEFSVDogJ0xPQURFUl9TVEFSVCcsXG4gIExPQURFUl9EQVRBTE9BREVEOiAnTE9BREVSX0RBVEFMT0FERUQnLFxuICBMT0FERVJfQ09NUExFVEU6ICdMT0FERVJfQ09NUExFVEUnLFxuICBMT0FERVJfRVJST1I6ICdMT0FERVJfRVJST1InXG59XG5cbmNvbnN0IERFTVVYX0VWRU5UUyA9IHtcbiAgREVNVVhfU1RBUlQ6ICdERU1VWF9TVEFSVCcsXG4gIERFTVVYX0NPTVBMRVRFOiAnREVNVVhfQ09NUExFVEUnLFxuICBERU1VWF9FUlJPUjogJ0RFTVVYX0VSUk9SJyxcbiAgTUVUQURBVEFfUEFSU0VEOiAnTUVUQURBVEFfUEFSU0VEJyxcbiAgVklERU9fTUVUQURBVEFfQ0hBTkdFOiAnVklERU9fTUVUQURBVEFfQ0hBTkdFJyxcbiAgQVVESU9fTUVUQURBVEFfQ0hBTkdFOiAnQVVESU9fTUVUQURBVEFfQ0hBTkdFJyxcbiAgTUVESUFfSU5GTzogJ01FRElBX0lORk8nXG59XG5cbmNvbnN0IFJFTVVYX0VWRU5UUyA9IHtcbiAgUkVNVVhfTUVUQURBVEE6ICdSRU1VWF9NRVRBREFUQScsXG4gIFJFTVVYX01FRElBOiAnUkVNVVhfTUVESUEnLFxuICBNRURJQV9TRUdNRU5UOiAnTUVESUFfU0VHTUVOVCcsXG4gIFJFTVVYX0VSUk9SOiAnUkVNVVhfRVJST1InLFxuICBJTklUX1NFR01FTlQ6ICdJTklUX1NFR01FTlQnLFxuICBERVRFQ1RfQ0hBTkdFX1NUUkVBTTogJ0RFVEVDVF9DSEFOR0VfU1RSRUFNJ1xufVxuXG5jb25zdCBNU0VfRVZFTlRTID0ge1xuICBTT1VSQ0VfVVBEQVRFX0VORDogJ1NPVVJDRV9VUERBVEVfRU5EJ1xufVxuXG4vLyBobHPkuJPmnIlldmVudHNcbmNvbnN0IEhMU19FVkVOVFMgPSB7XG4gIFJFVFJZX1RJTUVfRVhDRUVERUQ6ICdSRVRSWV9USU1FX0VYQ0VFREVEJ1xufVxuXG5jb25zdCBDUllUT19FVkVOVFMgPSB7XG4gIFNUQVJUX0RFQ1JZUFQ6ICdTVEFSVF9ERUNSWVBUJyxcbiAgREVDUllQVEVEOiAnREVDUllQVEVEJ1xufVxuY29uc3QgQUxMRVZFTlRTID0gT2JqZWN0LmFzc2lnbih7fSwgTE9BREVSX0VWRU5UUywgREVNVVhfRVZFTlRTLCBSRU1VWF9FVkVOVFMsIE1TRV9FVkVOVFMsIEhMU19FVkVOVFMpXG5cbmNvbnN0IEZsdkFsbG93ZWRFdmVudHMgPSBbXVxuY29uc3QgSGxzQWxsb3dlZEV2ZW50cyA9IFtdXG5cbmZvciAobGV0IGtleSBpbiBBTExFVkVOVFMpIHtcbiAgaWYgKEFMTEVWRU5UUy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgRmx2QWxsb3dlZEV2ZW50cy5wdXNoKEFMTEVWRU5UU1trZXldKVxuICB9XG59XG5cbmZvciAobGV0IGtleSBpbiBBTExFVkVOVFMpIHtcbiAgaWYgKEFMTEVWRU5UUy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgSGxzQWxsb3dlZEV2ZW50cy5wdXNoKEFMTEVWRU5UU1trZXldKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgQUxMRVZFTlRTLFxuICBITFNfRVZFTlRTLFxuICBSRU1VWF9FVkVOVFMsXG4gIERFTVVYX0VWRU5UUyxcbiAgTVNFX0VWRU5UUyxcbiAgTE9BREVSX0VWRU5UUyxcbiAgRmx2QWxsb3dlZEV2ZW50cyxcbiAgSGxzQWxsb3dlZEV2ZW50cyxcbiAgQ1JZVE9fRVZFTlRTXG59O1xuIiwiZXhwb3J0IGNvbnN0IENPTlRFWFRfQ09NT01BTkRTID0ge1xuICBPTjogJ29uJyxcbiAgT05DRTogJ29uY2UnLFxuICBPRkY6ICdvZmYnLFxuICBFTUlUOiAnZW1pdCcsXG4gIERFU1RST1k6ICdkZXN0cm95J1xufVxuIiwiaW1wb3J0IE1lZGlhSW5mbyBmcm9tICcuL21vZGVscy9tZWRpYS1pbmZvJ1xuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJ1xuXG5jb25zdCBESVJFQ1RfRU1JVF9GTEFHID0gJ19fVE9fXydcblxuY2xhc3MgQ29udGV4dCB7XG4gIGNvbnN0cnVjdG9yIChhbGxvd2VkRXZlbnRzID0gW10pIHtcbiAgICB0aGlzLl9lbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpXG4gICAgdGhpcy5faW5zdGFuY2VNYXAgPSB7fSAvLyDmiYDmnInnmoTop6PnoIHmtYHnqIvlrp7kvotcbiAgICB0aGlzLl9jbHNNYXAgPSB7fSAvLyDmnoTpgKDlh73mlbDnmoRtYXBcbiAgICB0aGlzLl9pbml0ZWQgPSBmYWxzZVxuICAgIHRoaXMubWVkaWFJbmZvID0gbmV3IE1lZGlhSW5mbygpXG4gICAgdGhpcy5hbGxvd2VkRXZlbnRzID0gYWxsb3dlZEV2ZW50c1xuICAgIHRoaXMuX2hvb2tzID0ge30gLy8g5rOo5YaM5Zyo5LqL5Lu25YmNL+WQjueahOmSqeWtkO+8jOS+i+WmgiBiZWZvcmUoJ0RFTVVYX0NPTVBMRVRFJylcbiAgfVxuXG4gIC8qKlxuICAgKiDku47kuIrkuIvmlofkuK3ojrflj5bop6PnoIHmtYHnqIvlrp7kvovvvIzlpoLmnpzmsqHmnInlrp7kvovvvIzmnoTpgKDkuIDkuKpcbiAgICogQHBhcmFtIHRhZ1xuICAgKiBAcGFyYW0gYXJnc1xuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldEluc3RhbmNlICh0YWcpIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuX2luc3RhbmNlTWFwW3RhZ11cbiAgICBpZiAoaW5zdGFuY2UpIHtcbiAgICAgIHJldHVybiBpbnN0YW5jZVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0aHJvdyBuZXcgRXJyb3IoYCR7dGFnfeWunuS+i+WwmuacquWIneWni+WMlmApXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDliJ3lp4vljJblhbfkvZPlrp7kvotcbiAgICogQHBhcmFtIHRhZ1xuICAgKiBAcGFyYW0gYXJnc1xuICAgKi9cbiAgaW5pdEluc3RhbmNlICh0YWcsIC4uLmFyZ3MpIHtcbiAgICBpZiAodGhpcy5fY2xzTWFwW3RhZ10pIHtcbiAgICAgIGNvbnN0IG5ld0luc3RhbmNlID0gbmV3IHRoaXMuX2Nsc01hcFt0YWddKC4uLmFyZ3MpXG4gICAgICB0aGlzLl9pbnN0YW5jZU1hcFt0YWddID0gbmV3SW5zdGFuY2VcbiAgICAgIGlmIChuZXdJbnN0YW5jZS5pbml0KSB7XG4gICAgICAgIG5ld0luc3RhbmNlLmluaXQoKSAvLyBUT0RPOiBsaWZlY2lyY2xlXG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3SW5zdGFuY2VcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3RhZ33mnKrlnKhjb250ZXh05Lit5rOo5YaMYClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog6YG/5YWN5aSn6YeP55qEaW5pdEluc3RhbmNl6LCD55So77yM5Yid5aeL5YyW5omA5pyJ55qE57uE5Lu2XG4gICAqIEBwYXJhbSBjb25maWdcbiAgICovXG4gIGluaXQgKGNvbmZpZykge1xuICAgIGlmICh0aGlzLl9pbml0ZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBmb3IgKGxldCB0YWcgaW4gdGhpcy5fY2xzTWFwKSB7XG4gICAgICAvLyBpZiBub3QgaW5pdGVkLCBpbml0IGFuIGluc3RhbmNlXG4gICAgICBpZiAodGhpcy5fY2xzTWFwLmhhc093blByb3BlcnR5KHRhZykgJiYgIXRoaXMuX2luc3RhbmNlTWFwW3RhZ10pIHtcbiAgICAgICAgdGhpcy5pbml0SW5zdGFuY2UodGFnLCBjb25maWcpXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2luaXRlZCA9IHRydWVcbiAgfVxuXG4gIC8qKlxuICAgKiDms6jlhozkuIDkuKrkuIrkuIvmlofmtYHnqIvvvIzmj5DkvpvlronlhajnmoTkuovku7blj5HpgIHmnLrliLZcbiAgICogQHBhcmFtIHRhZ1xuICAgKiBAcGFyYW0gY2xzXG4gICAqL1xuICByZWdpc3RyeSAodGFnLCBjbHMpIHtcbiAgICBjb25zdCBlbWl0dGVyID0gdGhpcy5fZW1pdHRlclxuICAgIGNvbnN0IGNoZWNrTWVzc2FnZU5hbWUgPSB0aGlzLl9pc01lc3NhZ2VOYW1lVmFsaWQuYmluZCh0aGlzKVxuICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgY29uc3QgZW5oYW5jZWQgPSBjbGFzcyBleHRlbmRzIGNscyB7XG4gICAgICBjb25zdHJ1Y3RvciAoLi4uYXJncykge1xuICAgICAgICBzdXBlciguLi5hcmdzKVxuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHt9XG4gICAgICAgIHRoaXMub25jZUxpc3RlbmVycyA9IHt9XG4gICAgICAgIHRoaXMuVEFHID0gdGFnXG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBzZWxmXG4gICAgICB9XG5cbiAgICAgIG9uIChtZXNzYWdlTmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgY2hlY2tNZXNzYWdlTmFtZShtZXNzYWdlTmFtZSlcblxuICAgICAgICBpZiAodGhpcy5saXN0ZW5lcnNbbWVzc2FnZU5hbWVdKSB7XG4gICAgICAgICAgdGhpcy5saXN0ZW5lcnNbbWVzc2FnZU5hbWVdLnB1c2goY2FsbGJhY2spXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5saXN0ZW5lcnNbbWVzc2FnZU5hbWVdID0gW2NhbGxiYWNrXVxuICAgICAgICB9XG5cbiAgICAgICAgZW1pdHRlci5vbihgJHttZXNzYWdlTmFtZX0ke0RJUkVDVF9FTUlUX0ZMQUd9JHt0YWd9YCwgY2FsbGJhY2spIC8vIOW7uueri+WumuWQkemAmuS/oeebkeWQrFxuICAgICAgICByZXR1cm4gZW1pdHRlci5vbihtZXNzYWdlTmFtZSwgY2FsbGJhY2spXG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICog5Zyo5p+Q5Liq5LqL5Lu26Kem5Y+R5YmN5omn6KGMXG4gICAgICAgKiBAcGFyYW0gbWVzc2FnZU5hbWVcbiAgICAgICAqIEBwYXJhbSBjYWxsYmFja1xuICAgICAgICovXG4gICAgICBiZWZvcmUgKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaykge1xuICAgICAgICBjaGVja01lc3NhZ2VOYW1lKG1lc3NhZ2VOYW1lKVxuICAgICAgICBpZiAoc2VsZi5faG9va3NbbWVzc2FnZU5hbWVdKSB7XG4gICAgICAgICAgc2VsZi5faG9va3NbbWVzc2FnZU5hbWVdLnB1c2goY2FsbGJhY2spXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VsZi5faG9va3NbbWVzc2FnZU5hbWVdID0gW2NhbGxiYWNrXVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG9uY2UgKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaykge1xuICAgICAgICBjaGVja01lc3NhZ2VOYW1lKG1lc3NhZ2VOYW1lKVxuXG4gICAgICAgIGlmICh0aGlzLm9uY2VMaXN0ZW5lcnNbbWVzc2FnZU5hbWVdKSB7XG4gICAgICAgICAgdGhpcy5vbmNlTGlzdGVuZXJzW21lc3NhZ2VOYW1lXS5wdXNoKGNhbGxiYWNrKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMub25jZUxpc3RlbmVyc1ttZXNzYWdlTmFtZV0gPSBbY2FsbGJhY2tdXG4gICAgICAgIH1cblxuICAgICAgICBlbWl0dGVyLm9uY2UoYCR7bWVzc2FnZU5hbWV9JHtESVJFQ1RfRU1JVF9GTEFHfSR7dGFnfWAsIGNhbGxiYWNrKVxuICAgICAgICByZXR1cm4gZW1pdHRlci5vbmNlKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaylcbiAgICAgIH1cblxuICAgICAgZW1pdCAobWVzc2FnZU5hbWUsIC4uLmFyZ3MpIHtcbiAgICAgICAgY2hlY2tNZXNzYWdlTmFtZShtZXNzYWdlTmFtZSlcblxuICAgICAgICBjb25zdCBiZWZvcmVMaXN0ID0gc2VsZi5faG9va3MgPyBzZWxmLl9ob29rc1ttZXNzYWdlTmFtZV0gOiBudWxsXG5cbiAgICAgICAgaWYgKGJlZm9yZUxpc3QpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYmVmb3JlTGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSBiZWZvcmVMaXN0W2ldXG4gICAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbWl0dGVyLmVtaXQobWVzc2FnZU5hbWUsIC4uLmFyZ3MpXG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICog5a6a5ZCR5Y+R6YCB57uZ5p+Q5Liq57uE5Lu25Y2V5L6L55qE5raI5oGvXG4gICAgICAgKiBAcGFyYW0gbWVzc2FnZU5hbWVcbiAgICAgICAqIEBwYXJhbSBhcmdzXG4gICAgICAgKi9cbiAgICAgIGVtaXRUbyAodGFnLCBtZXNzYWdlTmFtZSwgLi4uYXJncykge1xuICAgICAgICBjaGVja01lc3NhZ2VOYW1lKG1lc3NhZ2VOYW1lKVxuXG4gICAgICAgIHJldHVybiBlbWl0dGVyLmVtaXQoYCR7bWVzc2FnZU5hbWV9JHtESVJFQ1RfRU1JVF9GTEFHfSR7dGFnfWAsIC4uLmFyZ3MpXG4gICAgICB9XG5cbiAgICAgIG9mZiAobWVzc2FnZU5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNoZWNrTWVzc2FnZU5hbWUobWVzc2FnZU5hbWUpXG4gICAgICAgIHJldHVybiBlbWl0dGVyLm9mZihtZXNzYWdlTmFtZSwgY2FsbGJhY2spXG4gICAgICB9XG5cbiAgICAgIHJlbW92ZUxpc3RlbmVycyAoKSB7XG4gICAgICAgIGNvbnN0IGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuYmluZCh0aGlzLmxpc3RlbmVycylcblxuICAgICAgICBmb3IgKGxldCBtZXNzYWdlTmFtZSBpbiB0aGlzLmxpc3RlbmVycykge1xuICAgICAgICAgIGlmIChoYXNPd24obWVzc2FnZU5hbWUpKSB7XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLmxpc3RlbmVyc1ttZXNzYWdlTmFtZV0gfHwgW11cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrID0gY2FsbGJhY2tzW2ldXG4gICAgICAgICAgICAgIGVtaXR0ZXIub2ZmKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaylcbiAgICAgICAgICAgICAgZW1pdHRlci5vZmYoYCR7bWVzc2FnZU5hbWV9JHtESVJFQ1RfRU1JVF9GTEFHfSR7dGFnfWAsIGNhbGxiYWNrKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IG1lc3NhZ2VOYW1lIGluIHRoaXMub25jZUxpc3RlbmVycykge1xuICAgICAgICAgIGlmIChoYXNPd24obWVzc2FnZU5hbWUpKSB7XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLm9uY2VMaXN0ZW5lcnNbbWVzc2FnZU5hbWVdIHx8IFtdXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IGNhbGxiYWNrc1tpXVxuICAgICAgICAgICAgICBlbWl0dGVyLm9mZihtZXNzYWdlTmFtZSwgY2FsbGJhY2spXG4gICAgICAgICAgICAgIGVtaXR0ZXIub2ZmKGAke21lc3NhZ2VOYW1lfSR7RElSRUNUX0VNSVRfRkxBR30ke3RhZ31gLCBjYWxsYmFjaylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiDlnKjnu4Tku7bplIDmr4Hml7bvvIzpu5jorqTlsIblroPms6jlhoznmoTkuovku7blhajpg6jljbjovb3vvIznoa7kv53kuI3kvJrpgKDmiJDlhoXlrZjms4TmvI9cbiAgICAgICAqL1xuICAgICAgZGVzdHJveSAoKSB7XG4gICAgICAgIC8vIHN0ZXAxIHVubGlzdGVuIGV2ZW50c1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVycygpXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0ge31cblxuICAgICAgICAvLyBzdGVwMiByZWxlYXNlIGZyb20gY29udGV4dFxuICAgICAgICBkZWxldGUgc2VsZi5faW5zdGFuY2VNYXBbdGFnXVxuICAgICAgICBpZiAoc3VwZXIuZGVzdHJveSkge1xuICAgICAgICAgIHJldHVybiBzdXBlci5kZXN0cm95KClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9jbHNNYXBbdGFnXSA9IGVuaGFuY2VkXG5cbiAgICAvKipcbiAgICAgKiBnZXQgaW5zdGFuY2UgaW1tZWRpYXRlbHlcbiAgICAgKiBlLmcgY29uc3QgaW5zdGFuY2UgPSBjb250ZXh0LnJlZ2lzdHJ5KHRhZywgQ2xzKShjb25maWcpXG4gICAgICogKi9cbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmluaXRJbnN0YW5jZSh0YWcsIC4uLmFyZ3MpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOWvueWtmOWcqOeahOWunuS+i+i/m+ihjFxuICAgKi9cbiAgZGVzdHJveUluc3RhbmNlcyAoKSB7XG4gICAgT2JqZWN0LmtleXModGhpcy5faW5zdGFuY2VNYXApLmZvckVhY2goKHRhZykgPT4ge1xuICAgICAgaWYgKHRoaXMuX2luc3RhbmNlTWFwW3RhZ10uZGVzdHJveSkge1xuICAgICAgICB0aGlzLl9pbnN0YW5jZU1hcFt0YWddLmRlc3Ryb3koKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICog57yW6Kej56CB5rWB56iL5peg6ZyA5YWz5rOo5LqL5Lu255qE6Kej57uRXG4gICAqL1xuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLl9lbWl0dGVyID0gbnVsbFxuICAgIHRoaXMuYWxsb3dlZEV2ZW50cyA9IFtdXG4gICAgdGhpcy5fY2xzTWFwID0gbnVsbFxuICAgIHRoaXMuX2NvbnRleHQgPSBudWxsXG4gICAgdGhpcy5faG9va3MgPSBudWxsXG4gICAgdGhpcy5kZXN0cm95SW5zdGFuY2VzKClcbiAgfVxuXG4gIC8qKlxuICAgKiDlr7nkv6HpgZPov5vooYzmlLbmi6JcbiAgICogQHBhcmFtIG1lc3NhZ2VOYW1lXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaXNNZXNzYWdlTmFtZVZhbGlkIChtZXNzYWdlTmFtZSkge1xuICAgIGlmICghdGhpcy5hbGxvd2VkRXZlbnRzLmluZGV4T2YobWVzc2FnZU5hbWUpIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnJlZ2lzdGVyZWQgbWVzc2FnZSBuYW1lOiAke21lc3NhZ2VOYW1lfWApXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRleHRcbiIsImltcG9ydCBFVkVOVFMgZnJvbSAnLi4vY29uc3RhbnRzL2V2ZW50cyc7XG5jb25zdCBDUllUT19FVkVOVFMgPSBFVkVOVFMuQ1JZVE9fRVZFTlRTXG5jbGFzcyBDcnlwdG8ge1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICB0aGlzLmlucHV0QnVmZmVyID0gY29uZmlnLmlucHV0YnVmZmVyO1xuICAgICAgICB0aGlzLm91dHB1dEJ1ZmZlciA9IGNvbmZpZy5vdXRwdXRidWZmZXI7XG4gICAgICAgIHRoaXMua2V5ID0gY29uZmlnLmtleTtcbiAgICAgICAgdGhpcy5pdiA9IGNvbmZpZy5pdjtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBjb25maWcubWV0aG9kO1xuXG4gICAgICAgIHRoaXMuY3J5cHRvID0gIHdpbmRvdy5jcnlwdG8gfHwgd2luZG93Lm1zQ3J5cHRvXG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5vbihDUllUT19FVkVOVFMuU1RBUlRfREVDUllQVCwgdGhpcy5kZWNyaXB0LmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBcbiAgICBkZWNyaXB0KCkge1xuICAgICAgICBpZighdGhpcy5hZXNrZXkpIHtcbiAgICAgICAgICAgIGxldCBzYmtleSA9IHRoaXMuY3J5cHRvLnN1YnRsZS5pbXBvcnRLZXkoJ3JhdycsIHRoaXMua2V5LmJ1ZmZlciwgeyBuYW1lOiAnQUVTLUNCQycgfSwgZmFsc2UsIFsnZW5jcnlwdCcsICdkZWNyeXB0J10pO1xuICAgICAgICAgICAgc2JrZXkudGhlbihrZXkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWVza2V5ID0ga2V5O1xuICAgICAgICAgICAgICAgIHRoaXMuZGVjcmlwdERhdGEoKTtcbiAgICAgICAgICAgIH0pIFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kZWNyaXB0RGF0YSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVjcmlwdERhdGEoKSB7XG4gICAgICAgIGxldCBpbnB1dGJ1ZmZlciA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UodGhpcy5pbnB1dEJ1ZmZlcik7XG4gICAgICAgIGxldCBvdXRwdXRidWZmZXIgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKHRoaXMub3V0cHV0QnVmZmVyKTtcbiAgICAgICAgbGV0IGRhdGEgPSBpbnB1dGJ1ZmZlci5zaGlmdCgpO1xuICAgICAgICBpZihkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmNyeXB0by5zdWJ0bGUuZGVjcnlwdCh7IG5hbWU6ICdBRVMtQ0JDJywgaXY6IHRoaXMuaXYuYnVmZmVyIH0sIHRoaXMuYWVza2V5LCBkYXRhKS50aGVuKHJlcz0+e1xuICAgICAgICAgICAgICAgIG91dHB1dGJ1ZmZlci5wdXNoKG5ldyBVaW50OEFycmF5KHJlcykpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChDUllUT19FVkVOVFMuREVDUllQVEVEKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlY3JpcHREYXRhKGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBDcnlwdG87IiwiY29uc3QgbGUgPSAoZnVuY3Rpb24gKCkge1xuICBjb25zdCBidWYgPSBuZXcgQXJyYXlCdWZmZXIoMik7XG4gIChuZXcgRGF0YVZpZXcoYnVmKSkuc2V0SW50MTYoMCwgMjU2LCB0cnVlKSAvLyBsaXR0bGUtZW5kaWFuIHdyaXRlXG4gIHJldHVybiAobmV3IEludDE2QXJyYXkoYnVmKSlbMF0gPT09IDI1NiAvLyBwbGF0Zm9ybS1zcGVjIHJlYWQsIGlmIGVxdWFsIHRoZW4gTEVcbn0pKClcblxuZXhwb3J0IGRlZmF1bHQgbGVcbiIsImNvbnN0IGxlID0gKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgYnVmID0gbmV3IEFycmF5QnVmZmVyKDIpO1xuICAobmV3IERhdGFWaWV3KGJ1ZikpLnNldEludDE2KDAsIDI1NiwgdHJ1ZSkgLy8gbGl0dGxlLWVuZGlhbiB3cml0ZVxuICByZXR1cm4gKG5ldyBJbnQxNkFycmF5KGJ1ZikpWzBdID09PSAyNTYgLy8gcGxhdGZvcm0tc3BlYyByZWFkLCBpZiBlcXVhbCB0aGVuIExFXG59KSgpXG5cbmNvbnN0IHNuaWZmZXIgPSB7XG4gIGdldCBkZXZpY2UgKCkge1xuICAgIGxldCByID0gc25pZmZlci5vcztcbiAgICByZXR1cm4gci5pc1BjID8gJ3BjJyA6IHIuaXNUYWJsZXQgPyAndGFibGV0JyA6ICdtb2JpbGUnO1xuICB9LFxuICBnZXQgYnJvd3NlciAoKSB7XG4gICAgbGV0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xuICAgIGxldCByZWcgPSB7XG4gICAgICBpZTogL3J2OihbXFxkLl0rKVxcKSBsaWtlIGdlY2tvLyxcbiAgICAgIGZpcmZveDogL2ZpcmVmb3hcXC8oW1xcZC5dKykvLFxuICAgICAgY2hyb21lOiAvY2hyb21lXFwvKFtcXGQuXSspLyxcbiAgICAgIG9wZXJhOiAvb3BlcmEuKFtcXGQuXSspLyxcbiAgICAgIHNhZmFyaTogL3ZlcnNpb25cXC8oW1xcZC5dKykuKnNhZmFyaS9cbiAgICB9O1xuICAgIHJldHVybiBbXS5jb25jYXQoT2JqZWN0LmtleXMocmVnKS5maWx0ZXIoa2V5ID0+IHJlZ1trZXldLnRlc3QodWEpKSlbMF07XG4gIH0sXG4gIGdldCBvcyAoKSB7XG4gICAgbGV0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudFxuICAgIGxldCBpc1dpbmRvd3NQaG9uZSA9IC8oPzpXaW5kb3dzIFBob25lKS8udGVzdCh1YSlcbiAgICBsZXQgaXNTeW1iaWFuID0gLyg/OlN5bWJpYW5PUykvLnRlc3QodWEpIHx8IGlzV2luZG93c1Bob25lO1xuICAgIGxldCBpc0FuZHJvaWQgPSAvKD86QW5kcm9pZCkvLnRlc3QodWEpO1xuICAgIGxldCBpc0ZpcmVGb3ggPSAvKD86RmlyZWZveCkvLnRlc3QodWEpO1xuICAgIGxldCBpc1RhYmxldCA9IC8oPzppUGFkfFBsYXlCb29rKS8udGVzdCh1YSkgfHwgKGlzQW5kcm9pZCAmJiAhLyg/Ok1vYmlsZSkvLnRlc3QodWEpKSB8fCAoaXNGaXJlRm94ICYmIC8oPzpUYWJsZXQpLy50ZXN0KHVhKSk7XG4gICAgbGV0IGlzUGhvbmUgPSAvKD86aVBob25lKS8udGVzdCh1YSkgJiYgIWlzVGFibGV0O1xuICAgIGxldCBpc1BjID0gIWlzUGhvbmUgJiYgIWlzQW5kcm9pZCAmJiAhaXNTeW1iaWFuO1xuICAgIHJldHVybiB7XG4gICAgICBpc1RhYmxldCxcbiAgICAgIGlzUGhvbmUsXG4gICAgICBpc0FuZHJvaWQsXG4gICAgICBpc1BjLFxuICAgICAgaXNTeW1iaWFuLFxuICAgICAgaXNXaW5kb3dzUGhvbmUsXG4gICAgICBpc0ZpcmVGb3hcbiAgICB9O1xuICB9LFxuXG4gIGdldCBpc0xlICgpIHtcbiAgICByZXR1cm4gbGVcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgc25pZmZlcjtcbiIsImNsYXNzIFVURjgge1xuICBzdGF0aWMgZGVjb2RlICh1aW50OGFycmF5KSB7XG4gICAgY29uc3Qgb3V0ID0gW107XG4gICAgY29uc3QgaW5wdXQgPSB1aW50OGFycmF5O1xuICAgIGxldCBpID0gMDtcbiAgICBjb25zdCBsZW5ndGggPSB1aW50OGFycmF5Lmxlbmd0aDtcblxuICAgIHdoaWxlIChpIDwgbGVuZ3RoKSB7XG4gICAgICBpZiAoaW5wdXRbaV0gPCAweDgwKSB7XG4gICAgICAgIG91dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoaW5wdXRbaV0pKTtcbiAgICAgICAgKytpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH0gZWxzZSBpZiAoaW5wdXRbaV0gPCAweEMwKSB7XG4gICAgICAgIC8vIGZhbGx0aHJvdWdoXG4gICAgICB9IGVsc2UgaWYgKGlucHV0W2ldIDwgMHhFMCkge1xuICAgICAgICBpZiAoVVRGOC5fY2hlY2tDb250aW51YXRpb24oaW5wdXQsIGksIDEpKSB7XG4gICAgICAgICAgY29uc3QgdWNzNCA9IChpbnB1dFtpXSAmIDB4MUYpIDw8IDYgfCAoaW5wdXRbaSArIDFdICYgMHgzRik7XG4gICAgICAgICAgaWYgKHVjczQgPj0gMHg4MCkge1xuICAgICAgICAgICAgb3V0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSh1Y3M0ICYgMHhGRkZGKSk7XG4gICAgICAgICAgICBpICs9IDI7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaW5wdXRbaV0gPCAweEYwKSB7XG4gICAgICAgIGlmIChVVEY4Ll9jaGVja0NvbnRpbnVhdGlvbihpbnB1dCwgaSwgMikpIHtcbiAgICAgICAgICBjb25zdCB1Y3M0ID0gKGlucHV0W2ldICYgMHhGKSA8PCAxMiB8IChpbnB1dFtpICsgMV0gJiAweDNGKSA8PCA2IHwgaW5wdXRbaSArIDJdICYgMHgzRjtcbiAgICAgICAgICBpZiAodWNzNCA+PSAweDgwMCAmJiAodWNzNCAmIDB4RjgwMCkgIT09IDB4RDgwMCkge1xuICAgICAgICAgICAgb3V0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSh1Y3M0ICYgMHhGRkZGKSk7XG4gICAgICAgICAgICBpICs9IDM7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaW5wdXRbaV0gPCAweEY4KSB7XG4gICAgICAgIGlmIChVVEY4Ll9jaGVja0NvbnRpbnVhdGlvbihpbnB1dCwgaSwgMykpIHtcbiAgICAgICAgICBsZXQgdWNzNCA9IChpbnB1dFtpXSAmIDB4NykgPDwgMTggfCAoaW5wdXRbaSArIDFdICYgMHgzRikgPDwgMTIgfFxuICAgICAgICAgICAgICAgICAgICAoaW5wdXRbaSArIDJdICYgMHgzRikgPDwgNiB8IChpbnB1dFtpICsgM10gJiAweDNGKTtcbiAgICAgICAgICBpZiAodWNzNCA+IDB4MTAwMDAgJiYgdWNzNCA8IDB4MTEwMDAwKSB7XG4gICAgICAgICAgICB1Y3M0IC09IDB4MTAwMDA7XG4gICAgICAgICAgICBvdXQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKCh1Y3M0ID4+PiAxMCkgfCAweEQ4MDApKTtcbiAgICAgICAgICAgIG91dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoKHVjczQgJiAweDNGRikgfCAweERDMDApKTtcbiAgICAgICAgICAgIGkgKz0gNDtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgb3V0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgweEZGRkQpKTtcbiAgICAgICsraTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0LmpvaW4oJycpO1xuICB9XG5cbiAgc3RhdGljIF9jaGVja0NvbnRpbnVhdGlvbiAodWludDhhcnJheSwgc3RhcnQsIGNoZWNrTGVuZ3RoKSB7XG4gICAgbGV0IGFycmF5ID0gdWludDhhcnJheTtcbiAgICBpZiAoc3RhcnQgKyBjaGVja0xlbmd0aCA8IGFycmF5Lmxlbmd0aCkge1xuICAgICAgd2hpbGUgKGNoZWNrTGVuZ3RoLS0pIHtcbiAgICAgICAgaWYgKChhcnJheVsrK3N0YXJ0XSAmIDB4QzApICE9PSAweDgwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVVEY4O1xuIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICdldmVudHMnXG5jbGFzcyBBdWRpb0N0eCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yIChjb25maWcpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnKTtcbiAgICBsZXQgQXVkaW9Db250ZXh0ID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0O1xuICAgIHRoaXMuY29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcbiAgICB0aGlzLmdhaW5Ob2RlID0gdGhpcy5jb250ZXh0LmNyZWF0ZUdhaW4oKTtcbiAgICB0aGlzLmdhaW5Ob2RlLmNvbm5lY3QodGhpcy5jb250ZXh0LmRlc3RpbmF0aW9uKTtcbiAgICB0aGlzLm1ldGEgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5zYW1wbGVzID0gW107XG4gICAgdGhpcy5wcmVsb2FkVGltZSA9IHRoaXMuY29uZmlnLnByZWxvYWRUaW1lIHx8IDAuNTtcbiAgICB0aGlzLmR1cmF0aW9uID0gMDtcblxuICAgIHRoaXMuX2N1cnJlbnRCdWZmZXIgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fbmV4dEJ1ZmZlciA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9sYXN0cHRzID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3ByZURlY29kZSA9IFtdO1xuICAgIHRoaXMuX2N1cnJlbnRUaW1lID0gMDtcbiAgICB0aGlzLl9kZWNvZGluZyA9IGZhbHNlO1xuICAgIC8vIOiusOW9leWklumDqOS8oOi+k+eahOeKtuaAgVxuICAgIHRoaXMuX3BsYXllZCA9IGZhbHNlO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRUaW1lICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFRpbWU7XG4gIH1cblxuICBkZWNvZGVBdWRpbyAoYXVkaW9UcmFjaykge1xuICAgIGxldCB7c2FtcGxlc30gPSBhdWRpb1RyYWNrO1xuICAgIGxldCBkYXRhID0gc2FtcGxlcztcbiAgICBhdWRpb1RyYWNrLnNhbXBsZXMgPSBbXTtcbiAgICB0aGlzLnNldEF1ZGlvRGF0YShkYXRhKTtcbiAgfVxuICBzZXRBdWRpb0RhdGEgKGRhdGEpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRhdGFbaV0ucHRzID0gKGRhdGFbaV0ucHRzID09PSB1bmRlZmluZWQpID8gZGF0YVtpXS5kdHMgOiBkYXRhW2ldLnB0cztcbiAgICAgIHRoaXMuX3ByZURlY29kZS5wdXNoKGRhdGFbaV0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5fcHJlRGVjb2RlLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmICh0aGlzLl9sYXN0cHRzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fbGFzdHB0cyA9IHRoaXMuX3ByZURlY29kZVswXS5wdHM7XG4gICAgICB9XG4gICAgICBpZiAoKHRoaXMuX3ByZURlY29kZVt0aGlzLl9wcmVEZWNvZGUubGVuZ3RoIC0gMV0ucHRzIC0gdGhpcy5fbGFzdHB0cykgLyAxMDAwID4gdGhpcy5wcmVsb2FkVGltZSkge1xuICAgICAgICB0aGlzLmRlY29kZUFBQygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRlY29kZUFBQyAoKSB7XG4gICAgaWYgKHRoaXMuX2RlY29kaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2RlY29kaW5nID0gdHJ1ZTtcbiAgICBsZXQgZGF0YSA9IHRoaXMuX3ByZURlY29kZTtcbiAgICBsZXQgc2FtcGxlcyA9IFtdO1xuICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgbGV0IHNhbXBsZSA9IGRhdGEuc2hpZnQoKTtcbiAgICBsZXQgc2FtcGxlQ291bnQgPSAwO1xuICAgIFxuICAgIHdoaWxlIChzYW1wbGUgJiYgc2FtcGxlQ291bnQgPCA0MCkge1xuICAgICAgbGV0IHNhbXBsZURhdGEgPSBBdWRpb0N0eC5nZXRBQUNEYXRhKHRoaXMubWV0YSwgc2FtcGxlKVxuICAgICAgc2FtcGxlcy5wdXNoKHNhbXBsZURhdGEpO1xuICAgICAgdGhpcy5fbGFzdHB0cyA9IHNhbXBsZS5wdHM7XG4gICAgICBzYW1wbGUgPSBkYXRhLnNoaWZ0KClcbiAgICAgIHNhbXBsZUNvdW50Kys7XG4gICAgfVxuICAgIGxldCBidWZmZXIgPSBBdWRpb0N0eC5jb21iaWxlRGF0YShzYW1wbGVzKTtcbiAgICB0cnkge1xuICAgICAgdGhpcy5jb250ZXh0LmRlY29kZUF1ZGlvRGF0YShidWZmZXIuYnVmZmVyLCBmdW5jdGlvbiAoYnVmZmVyKSB7XG4gICAgICAgIGxldCBhdWRpb1NvdXJjZSA9IF90aGlzLmNvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgICAgIGF1ZGlvU291cmNlLmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgICAgYXVkaW9Tb3VyY2Uub25lbmRlZCA9IF90aGlzLm9uU291cmNlRW5kZWQuYmluZChfdGhpcyk7XG4gICAgICAgIF90aGlzLnNhbXBsZXMucHVzaCh7XG4gICAgICAgICAgdGltZTogX3RoaXMuZHVyYXRpb24sXG4gICAgICAgICAgZHVyYXRpb246IGJ1ZmZlci5kdXJhdGlvbixcbiAgICAgICAgICBkYXRhOiBhdWRpb1NvdXJjZVxuICAgICAgICB9KVxuXG4gICAgICAgIF90aGlzLmR1cmF0aW9uICs9IGJ1ZmZlci5kdXJhdGlvbjtcblxuICAgICAgICBpZiAoIV90aGlzLl9jdXJyZW50QnVmZmVyKSB7XG4gICAgICAgICAgX3RoaXMuX2N1cnJlbnRCdWZmZXIgPSBfdGhpcy5nZXRUaW1lQnVmZmVyKF90aGlzLmN1cnJlbnRUaW1lKTtcblxuICAgICAgICAgIGlmIChfdGhpcy5fcGxheWVkKSB7XG4gICAgICAgICAgICBfdGhpcy5wbGF5KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFfdGhpcy5fbmV4dEJ1ZmZlciAmJiBfdGhpcy5fY3VycmVudEJ1ZmZlcikge1xuICAgICAgICAgIF90aGlzLl9uZXh0QnVmZmVyID0gX3RoaXMuZ2V0VGltZUJ1ZmZlcihfdGhpcy5jdXJyZW50VGltZSArIF90aGlzLl9jdXJyZW50QnVmZmVyLmR1cmF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy5fZGVjb2RpbmcgPSBmYWxzZTtcblxuICAgICAgICBpZiAoKF90aGlzLl9wcmVEZWNvZGUubGVuZ3RoID4gMCAmJiBfdGhpcy5fcHJlRGVjb2RlW190aGlzLl9wcmVEZWNvZGUubGVuZ3RoIC0gMV0ucHRzIC0gX3RoaXMuX2xhc3RwdHMpIC8gMTAwMCA+PSBfdGhpcy5wcmVsb2FkVGltZSkge1xuICAgICAgICAgIF90aGlzLmRlY29kZUFBQygpO1xuICAgICAgICB9XG4gICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgX3RoaXMuX2RlY29kaW5nID0gZmFsc2U7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgfSlcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICB9XG4gIH1cblxuICBvblNvdXJjZUVuZGVkICgpIHtcbiAgICBpZiAoIXRoaXMuX25leHRCdWZmZXIgfHwgIXRoaXMuX3BsYXllZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgYXVkaW9Tb3VyY2UgPSB0aGlzLl9uZXh0QnVmZmVyLmRhdGE7XG4gICAgYXVkaW9Tb3VyY2Uuc3RhcnQoKTtcbiAgICBhdWRpb1NvdXJjZS5jb25uZWN0KHRoaXMuZ2Fpbk5vZGUpO1xuICAgIHRoaXMuX2N1cnJlbnRCdWZmZXIgPSB0aGlzLl9uZXh0QnVmZmVyO1xuICAgIHRoaXMuX2N1cnJlbnRUaW1lID0gdGhpcy5fY3VycmVudEJ1ZmZlci50aW1lO1xuICAgIHRoaXMuX25leHRCdWZmZXIgPSB0aGlzLmdldFRpbWVCdWZmZXIodGhpcy5jdXJyZW50VGltZSk7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRCdWZmZXIpIHtcbiAgICAgIHRoaXMuX25leHRCdWZmZXIgPSB0aGlzLmdldFRpbWVCdWZmZXIodGhpcy5jdXJyZW50VGltZSArIHRoaXMuX2N1cnJlbnRCdWZmZXIuZHVyYXRpb24pO1xuICAgIH1cbiAgICB0aGlzLmVtaXQoJ0FVRElPX1NPVVJDRV9FTkQnKVxuICB9XG5cbiAgcGxheSAoKSB7XG4gICAgdGhpcy5fcGxheWVkID0gdHJ1ZTtcbiAgICBjb25zb2xlLmxvZygnYWFwbGF5JywgdGhpcy5fY3VycmVudEJ1ZmZlcik7XG4gICAgaWYgKCF0aGlzLl9jdXJyZW50QnVmZmVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGF1ZGlvU291cmNlID0gdGhpcy5fY3VycmVudEJ1ZmZlci5kYXRhO1xuICAgIGF1ZGlvU291cmNlLmNvbm5lY3QodGhpcy5nYWluTm9kZSk7XG4gICAgYXVkaW9Tb3VyY2Uuc3RhcnQoKTtcbiAgfVxuXG4gIGdldFRpbWVCdWZmZXIgKHRpbWUpIHtcbiAgICBsZXQgcmV0O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zYW1wbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgc2FtcGxlID0gdGhpcy5zYW1wbGVzW2ldXG4gICAgICBpZiAoc2FtcGxlLnRpbWUgPD0gdGltZSAmJiAoc2FtcGxlLnRpbWUgKyBzYW1wbGUuZHVyYXRpb24pID4gdGltZSkge1xuICAgICAgICByZXQgPSBzYW1wbGU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgc2V0QXVkaW9NZXRhRGF0YSAobWV0YSkge1xuICAgIHRoaXMubWV0YSA9IG1ldGE7XG4gIH1cblxuICBzdGF0aWMgZ2V0QUFDRGF0YSAobWV0YSwgc2FtcGxlKSB7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KHNhbXBsZS5kYXRhLmJ5dGVMZW5ndGggKyA3KTtcbiAgICBsZXQgYWR0cyA9IEF1ZGlvQ3R4LmdldEFkdHMobWV0YSwgc2FtcGxlLmRhdGEpO1xuICAgIGJ1ZmZlci5zZXQoYWR0cyk7XG4gICAgYnVmZmVyLnNldChzYW1wbGUuZGF0YSwgNyk7XG4gICAgcmV0dXJuIGJ1ZmZlcjtcbiAgfVxuXG4gIHN0YXRpYyBjb21iaWxlRGF0YSAoc2FtcGxlcykge1xuICAgIC8vIGdldCBsZW5ndGhcbiAgICBsZXQgbGVuZ3RoID0gMDtcbiAgICBmb3IgKGxldCBpID0gMCwgayA9IHNhbXBsZXMubGVuZ3RoOyBpIDwgazsgaSsrKSB7XG4gICAgICBsZW5ndGggKz0gc2FtcGxlc1tpXS5ieXRlTGVuZ3RoO1xuICAgIH1cblxuICAgIGxldCByZXQgPSBuZXcgVWludDhBcnJheShsZW5ndGgpO1xuICAgIGxldCBvZmZzZXQgPSAwO1xuICAgIC8vIGNvbWJpbGUgZGF0YTtcbiAgICBmb3IgKGxldCBpID0gMCwgayA9IHNhbXBsZXMubGVuZ3RoOyBpIDwgazsgaSsrKSB7XG4gICAgICByZXQuc2V0KHNhbXBsZXNbaV0sIG9mZnNldCk7XG4gICAgICBvZmZzZXQgKz0gc2FtcGxlc1tpXS5ieXRlTGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgc3RhdGljIGdldEFkdHMgKG1ldGEsIGRhdGEpIHtcbiAgICBsZXQgYWR0cyA9IG5ldyBVaW50OEFycmF5KDcpO1xuXG4gICAgLy8g6K6+572u5ZCM5q2l5L2NIDB4ZmZmIDEyYml0XG4gICAgYWR0c1swXSA9IDB4ZmY7XG4gICAgYWR0c1sxXSA9IDB4ZjA7XG5cbiAgICAvLyBPYmplY3QgZGF0YSAo5rKh5LuA5LmI5Lq655SoTVBFRy0y5LqG77yMSExT5ZKMRkxW5Lmf5YWo5pivTVBFRy0077yM6L+Z6YeM55u05o6lMCkgIDFiaXRcbiAgICAvLyBMZXZlbCBhbHdheXMgMDAgMmJpdFxuICAgIC8vIENSQyBhbHdheXMgMSAxYml0XG4gICAgYWR0c1sxXSA9IGFkdHNbMV0gfCAweDAxO1xuXG4gICAgLy8gcHJvZmlsZSAyYml0XG4gICAgYWR0c1syXSA9IDB4YzAgJiAoKG1ldGEub3JpZ2luT2JqZWN0VHlwZSAtIDEpIDw8IDYpO1xuXG4gICAgLy8gc2FtcGxlRnJlcXVlbmN5SW5kZXhcbiAgICBhZHRzWzJdID0gYWR0c1syXSB8ICgweDNjICYgKG1ldGEuc2FtcGxlUmF0ZUluZGV4IDw8IDIpKVxuXG4gICAgLy8gcHJpdmF0ZSBiaXQgMCAxYml0XG4gICAgLy8gY2hhbmVsIGNvbmZpZ3VyYXRpb24gM2JpdFxuICAgIGFkdHNbMl0gPSBhZHRzWzJdIHwgKDB4MDEgJiBtZXRhLmNoYW5uZWxDb3VudCA+PiAyKTtcbiAgICBhZHRzWzNdID0gMHhjMCAmIChtZXRhLmNoYW5uZWxDb3VudCA8PCA2KTtcblxuICAgIC8vIG9yaWdpbmFsX2NvcHk6IDAgMWJpdFxuICAgIC8vIGhvbWU6IDAgMWJpdFxuXG4gICAgLy8gYWR0c192YXJpYWJsZV9oZWFkZXIoKVxuICAgIC8vIGNvcHlyaWdodGVkX2lkX2JpdCAwIDFiaXRcbiAgICAvLyBjb3B5cmlnaHRlZF9pZF9zdGFydCAwIDFiaXRcblxuICAgIC8vIGFhY19mcmFtZV9sZW5ndGggMTNiaXQ7XG4gICAgbGV0IGFhY2ZyYW1lbGVuZ3RoID0gZGF0YS5ieXRlTGVuZ3RoICsgNztcblxuICAgIGFkdHNbM10gPSBhZHRzWzNdIHwgKDB4MDMgJiBhYWNmcmFtZWxlbmd0aCA+PiAxMSk7XG4gICAgYWR0c1s0XSA9IDB4ZmYgJiAoYWFjZnJhbWVsZW5ndGggPj4gMyk7XG4gICAgYWR0c1s1XSA9IDB4ZTAgJiAoYWFjZnJhbWVsZW5ndGggPDwgNSk7XG5cbiAgICAvLyBhZHRzX2J1ZmZlcl9mdWxsbmVzcyAweDdmZiAxMWJpdFxuICAgIGFkdHNbNV0gPSBhZHRzWzVdIHwgMHgxZlxuICAgIGFkdHNbNl0gPSAweGZjO1xuXG4gICAgLy8gbnVtYmVyX29mX3Jhd19kYXRhX2Jsb2Nrc19pbl9mcmFtZSAwIDJiaXQ7XG4gICAgcmV0dXJuIGFkdHM7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXVkaW9DdHg7XG4iLCJpbXBvcnQgVmlkZW9DdHggZnJvbSAnLi92aWRlby1jb250ZXh0JztcbmltcG9ydCBBdWRpb0N0eCBmcm9tICcuL2F1ZGlvLWNvbnRleHQnO1xuaW1wb3J0IHsgZ2V0VGlja2VyIH0gZnJvbSAnLi90aWNrZXInO1xuXG4vKipcbiAqIOmfs+eUu+WQjOatpeiwg+WSjOWZqFxuICovXG5jbGFzcyBBVlJlY29uY2lsZXIge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICB0aGlzLmFDdHggPSBwcm9wcy5hQ3R4O1xuICAgIHRoaXMudkN0eCA9IHByb3BzLnZDdHg7XG4gICAgdGhpcy52aWRlbyA9IHByb3BzLnZpZGVvXG4gICAgdGhpcy50aW1lb3V0SWQgPSBudWxsXG4gICAgdGhpcy5zdGFydCA9IG51bGxcbiAgfVxuXG4gIGRvUmVjb25jaWxlICgpIHtcbiAgICBjb25zdCB2Q3VyVGltZSA9ICh0aGlzLnZpZGVvLmN1cnJlbnRUaW1lIHx8IDApICogMTAwMDtcbiAgICBjb25zdCBhQ3VyVGltZSA9ICh0aGlzLmFDdHguY3VycmVudFRpbWUgfHwgMCkgKiAxMDAwO1xuXG4gICAgY29uc3QgZ2FwID0gdkN1clRpbWUgLSBhQ3VyVGltZTtcbiAgICBpZiAodGhpcy50aW1lb3V0SWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGdhcCA+IDIwMCkgeyAvLyBhdWRpbyBkZWxheWVkIGZvciBtb3JlIHRoYW4gMTAwbXNcbiAgICAgIGNvbnNvbGUubG9nKGdhcClcbiAgICAgIHRoaXMudmlkZW8uc3RhcnQgKz0gZ2FwXG4gICAgICB0aGlzLnZDdHgucGF1c2UoKVxuICAgICAgdGhpcy50aW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy52Q3R4LnBsYXkoKVxuICAgICAgICB0aGlzLnRpbWVvdXRJZCA9IG51bGxcbiAgICAgIH0sIGdhcClcbiAgICB9IGVsc2UgaWYgKGdhcCA8IC0xMjApIHtcbiAgICAgIHRoaXMudkN0eC5jdXJyZW50VGltZSA9IHRoaXMudkN0eC5jdXJyZW50VGltZSArIE1hdGguYWJzKGdhcCk7XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5hQ3R4ID0gbnVsbFxuICAgIHRoaXMudkN0eCA9IG51bGxcbiAgfVxufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbmNsYXNzIE1vYmlsZVZpZGVvIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvciAoY29uZmlnKSB7XG4gICAgc3VwZXIoKTtcbiAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgIHRoaXMudkN0eCA9IG5ldyBWaWRlb0N0eCgpO1xuICAgIHRoaXMuYUN0eCA9IG5ldyBBdWRpb0N0eChjb25maWcpO1xuICAgIHRoaXMudGlja2VyID0gbmV3IChnZXRUaWNrZXIoKSkoKVxuICAgIHRoaXMuaGlzdG9yeVRpbWUgPSAwO1xuICAgIHRoaXMucmVjb25jaWxlciA9IG5ldyBBVlJlY29uY2lsZXIoe1xuICAgICAgdkN0eDogdGhpcy52Q3R4LFxuICAgICAgYUN0eDogdGhpcy5hQ3R4LFxuICAgICAgdmlkZW86IHRoaXNcbiAgICB9KVxuICAgIHRoaXMuaGFuZGxlQXVkaW9Tb3VyY2VFbmQgPSB0aGlzLmhhbmRsZUF1ZGlvU291cmNlRW5kLmJpbmQodGhpcylcbiAgICB0aGlzLmluaXQoKVxuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgdGhpcy52Q3R4Lm9uY2FucGxheSA9ICgpID0+IHtcbiAgICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy52Q3R4LmNhbnZhcyk7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NhbnBsYXknKSk7XG4gICAgfVxuXG4gICAgdGhpcy50aWNrZXIuc3RhcnQoKCkgPT4ge1xuICAgICAgLy9cbiAgICAgIGlmICghdGhpcy5zdGFydCkge1xuICAgICAgICB0aGlzLnN0YXJ0ID0gRGF0ZS5ub3coKVxuICAgICAgfVxuICAgICAgdGhpcy5fY3VycmVudFRpbWUgPSBEYXRlLm5vdygpIC0gdGhpcy5zdGFydFxuICAgICAgdGhpcy52Q3R4Ll9vblRpbWVyKHRoaXMuX2N1cnJlbnRUaW1lKVxuICAgIH0pXG5cbiAgICB0aGlzLmFDdHgub24oJ0FVRElPX1NPVVJDRV9FTkQnLCB0aGlzLmhhbmRsZUF1ZGlvU291cmNlRW5kKVxuICB9XG5cbiAgaGFuZGxlQXVkaW9Tb3VyY2VFbmQgKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMuYUN0eC5jdXJyZW50VGltZSlcbiAgICB0aGlzLnJlY29uY2lsZXIuZG9SZWNvbmNpbGUoKVxuICB9XG5cbiAgX2NsZWFuQnVmZmVyICgpIHtcbiAgICB0aGlzLnZDdHguY2xlYW5CdWZmZXIoKVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5yZWNvbmNpbGVyLmRlc3Ryb3koKVxuICB9XG5cbiAgb25EZW11eENvbXBsZXRlICh2aWRlb1RyYWNrLCBhdWRpb1RyYWNrKSB7XG4gICAgdGhpcy5hQ3R4LmRlY29kZUF1ZGlvKGF1ZGlvVHJhY2spO1xuICAgIHRoaXMudkN0eC5kZWNvZGVWaWRlbyh2aWRlb1RyYWNrKTtcbiAgfVxuXG4gIHNldEF1ZGlvTWV0YSAobWV0YSkge1xuICAgIHRoaXMuYUN0eC5zZXRBdWRpb01ldGFEYXRhKG1ldGEpO1xuICB9XG5cbiAgc2V0VmlkZW9NZXRhIChtZXRhKSB7XG4gICAgdGhpcy52Q3R4LnNldFZpZGVvTWV0YURhdGEobWV0YSk7XG4gIH1cblxuICBnZXQgY3VycmVudFRpbWUgKCkge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50VGltZSAvIDEwMDBcbiAgfVxuXG4gIHBsYXkgKCkge1xuICAgIFxuICAgIC8vIGlmICghdGhpcy52Q3R4LilcbiAgICB0aGlzLnZDdHgucGxheSgpO1xuICAgIHRoaXMuYUN0eC5wbGF5KCk7XG4gIH1cbn1cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdtb2JpbGUtdmlkZW8nLCBNb2JpbGVWaWRlbyk7XG4iLCJjbGFzcyBTb3VyY2VCdWZmZXIge1xuICBjb25zdHJ1Y3RvciAoY29uZmlnKSB7XG4gICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWcpO1xuICAgIHRoaXMudHlwZSA9IHRoaXMuY29uZmlnLnR5cGU7XG4gICAgdGhpcy5idWZmZXIgPSBbXTtcbiAgICB0aGlzLmN1cnJlbnRHb3AgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fbGFzdEdldCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHB1c2ggKGZyYW1lKSB7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgaWYgKGZyYW1lLmlzS2V5ZnJhbWUpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRHb3AgPSB7XG4gICAgICAgICAgc2FtcGxlczogW10sXG4gICAgICAgICAgc3RhcnQ6IGZyYW1lLmR0cyxcbiAgICAgICAgICBlbmQ6IGZyYW1lLmR0cyxcbiAgICAgICAgICBuZXh0R29wOiB1bmRlZmluZWRcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEdvcCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudEdvcC5uZXh0R29wID0gY3VycmVudEdvcDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJlbnRHb3AgPSBjdXJyZW50R29wO1xuICAgICAgICB0aGlzLmJ1ZmZlci5wdXNoKHRoaXMuY3VycmVudEdvcCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmN1cnJlbnRHb3ApIHtcbiAgICAgICAgdGhpcy5jdXJyZW50R29wLnNhbXBsZXMucHVzaChmcmFtZSk7XG5cbiAgICAgICAgaWYgKGZyYW1lLmR0cyA8IHRoaXMuY3VycmVudEdvcC5zdGFydCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudEdvcC5zdGFydCA9IGZyYW1lLmR0cztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmcmFtZS5kdHMgPiB0aGlzLmN1cnJlbnRHb3AuZW5kKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50R29wLmVuZCA9IGZyYW1lLmR0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldCAodGltZSkge1xuICAgIGlmICh0aGlzLnR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgIGlmICh0aGlzLmJ1ZmZlci5sZW5ndGggPCAxKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRpbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsZXQgc2FtcGxlID0gdGhpcy5fZ2V0TmV4dCgpO1xuICAgICAgICByZXR1cm4gc2FtcGxlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9nZXROZXh0ICgpIHtcbiAgICBpZiAoIXRoaXMuX2xhc3RHZXQpIHtcbiAgICAgIGxldCBnb3AgPSB0aGlzLmJ1ZmZlclswXTtcbiAgICAgIGlmIChnb3Auc2FtcGxlcy5sZW5ndGggPCAxKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICB0aGlzLl9sYXN0R2V0ID0ge1xuICAgICAgICBnb3AsXG4gICAgICAgIGluZGV4OiAwXG4gICAgICB9XG4gICAgICByZXR1cm4gZ29wLnNhbXBsZXNbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBnb3AgPSB0aGlzLl9sYXN0R2V0LmdvcDtcbiAgICAgIGxldCBzYW1wbGUgPSBnb3Auc2FtcGxlc1t0aGlzLl9sYXN0R2V0LmluZGV4ICsgMV07XG4gICAgICBpZiAoc2FtcGxlKSB7XG4gICAgICAgIHRoaXMuX2xhc3RHZXQuaW5kZXggPSB0aGlzLl9sYXN0R2V0LmluZGV4ICsgMTtcbiAgICAgICAgcmV0dXJuIHNhbXBsZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdvcCA9IGdvcC5uZXh0R29wO1xuICAgICAgICBpZiAoIWdvcCB8fCBnb3Auc2FtcGxlcy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHNhbXBsZSA9IGdvcC5zYW1wbGVzWzBdO1xuICAgICAgICB0aGlzLl9sYXN0R2V0ID0ge1xuICAgICAgICAgIGdvcCxcbiAgICAgICAgICBpbmRleDogMFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzYW1wbGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlIChzdGFydCwgZW5kKSB7XG4gICAgaWYgKHRoaXMuYnVmZmVyLmxlbmd0aCA8IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGdvcCA9IHRoaXMuYnVmZmVyWzBdO1xuICAgIHdoaWxlIChnb3ApIHtcbiAgICAgIGlmIChnb3AuZW5kIDwgZW5kICYmIGdvcC5zdGFydCA+PSBzdGFydCkge1xuICAgICAgICBkZWxldGUgdGhpcy5idWZmZXJbaV07XG4gICAgICAgIGdvcCA9IHRoaXMuYnVmZmVyW2ldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaSArPSAxO1xuICAgICAgICBnb3AgPSB0aGlzLmJ1ZmZlcltpXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU291cmNlQnVmZmVyO1xuIiwiLyoqXG4gKiBAYXV0aG9yIGZ1eXVoYW9AYnl0ZWRhbmNlLmNvbVxuICovXG5cbmNsYXNzIFRpY2tlciB7XG4gIGNvbnN0cnVjdG9yIChvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyB8fCB7fSwge1xuICAgICAgaW50ZXJ2YWw6IDE2XG4gICAgfSlcblxuICAgIHRoaXMuY2FsbGJhY2tzID0gW11cbiAgfVxuXG4gIHN0YXJ0KC4uLmNhbGxiYWNrcykge1xuICAgIHRoaXMuY2FsbGJhY2tzID0gY2FsbGJhY2tzXG4gIH1cblxuICBvblRpY2sgKCkge1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLmNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgY2FsbGJhY2sgPSB0aGlzLmNhbGxiYWNrc1tpXVxuICAgICAgY2FsbGJhY2soKVxuICAgIH1cbiAgfVxuXG4gIHNldEludGVydmFsIChpbnRlcnZhbCkge1xuICAgIHRoaXMub3B0aW9ucy5pbnRlcnZhbCA9IGludGVydmFsXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuLyoqXG4gKiB0aWNrZXIgdXNlIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuICovXG5jbGFzcyBSYWZUaWNrZXIgZXh0ZW5kcyBUaWNrZXIge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5wcmV2ID0gbnVsbDtcbiAgICB0aGlzLnRpbWVySWQgPSBudWxsXG4gICAgdGhpcy5fc3ViVGltZXJJZCA9IG51bGxcblxuICAgIHRoaXMuX3RpY2tGdW5jID0gUmFmVGlja2VyLmdldFRpY2tGdW5jKClcbiAgICB0aGlzLnRpY2sgPSB0aGlzLnRpY2suYmluZCh0aGlzKVxuICB9XG5cbiAgc3RhcnQgKC4uLmNhbGxiYWNrcykge1xuICAgIHN1cGVyLnN0YXJ0KC4uLmNhbGxiYWNrcylcbiAgICB0aGlzLnRpY2soKVxuICB9XG5cbiAgdGljayAodGltZXN0YW1wKSB7XG4gICAgdGhpcy5uZXh0VGljaygpO1xuICAgIHRoaXMub25UaWNrKClcbiAgfVxuXG4gIG5leHRUaWNrICgpIHtcbiAgICBjb25zdCB7IF90aWNrRnVuYyB9ID0gdGhpcztcbiAgICB0aGlzLnRpbWVySWQgPSBfdGlja0Z1bmModGhpcy50aWNrKVxuICB9XG5cbiAgc3RvcCAoKSB7XG4gICAgaWYgKHRoaXMudGltZXJJZCkge1xuICAgICAgY29uc3QgY2FuY2VsRnVuYyA9IFJhZlRpY2tlci5nZXRDYW5jZWxGdW5jKClcblxuICAgICAgY2FuY2VsRnVuYyh0aGlzLnRpbWVySWQpXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldFRpY2tGdW5jICgpIHtcbiAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gIH1cblxuICBzdGF0aWMgZ2V0Q2FuY2VsRnVuYyAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWVcbiAgfVxuXG4gIHN0YXRpYyBpc1N1cHBvcnRlZCAoKSB7XG4gICAgcmV0dXJuIFJhZlRpY2tlci5nZXRUaWNrRnVuYygpICE9PSB1bmRlZmluZWRcbiAgfVxufVxuXG4vKipcbiAqIHVzZSBzZXRUaW1lb3V0IGZvciBicm93c2VycyB3aXRob3V0IHJhZiBzdXBwb3J0XG4gKi9cbmNsYXNzIFRpbWVvdXRUaWNrZXIgZXh0ZW5kcyBUaWNrZXIge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcihjb25maWcpXG4gICAgdGhpcy50aW1lb3V0SWQgPSBudWxsXG5cbiAgfVxuXG4gIHN0YXJ0ICguLi5jYWxsYmFja3MpIHtcbiAgICBzdXBlci5uZXh0VGljayguLi5jYWxsYmFja3MpXG4gICAgdGhpcy50aW1lb3V0SWQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgdGhpcy5vblRpY2soKTtcbiAgICB9LCB0aGlzLm9wdGlvbnMuaW50ZXJ2YWwgfHwgMTYpXG4gIH1cblxuICBzdG9wICgpIHtcbiAgICBpZiAodGhpcy50aW1lb3V0SWQpIHtcbiAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMudGltZW91dElkKVxuICAgIH1cbiAgfVxuXG59XG5cbi8qKlxuICog6L+U5ZueVGlja2Vy5p6E6YCg5Ye95pWwXG4gKiBAcmV0dXJucyB7VGlja2VyfVxuICovXG5leHBvcnQgY29uc3QgZ2V0VGlja2VyID0gKCkgPT4ge1xuICBpZiAoUmFmVGlja2VyLmlzU3VwcG9ydGVkKCkpIHtcbiAgICByZXR1cm4gUmFmVGlja2VyXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFRpbWVvdXRUaWNrZXJcbiAgfVxufVxuIiwiaW1wb3J0IFdvcmtlcmlmeSBmcm9tICd3ZWJ3b3JraWZ5LXdlYnBhY2snXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL3dyaXRlL3N0cmVhbSc7XG5pbXBvcnQgTmFsdW5pdCBmcm9tICcuLi8uLi8uLi94Z3BsYXllci1jb2RlYy9zcmMvaDI2NC9uYWx1bml0JztcbmltcG9ydCBZVVZDYW52YXMgZnJvbSAnLi95dXYtY2FudmFzJztcbmltcG9ydCBTb3VyY2VCdWZmZXIgZnJvbSAnLi9zb3VyY2VidWZmZXInO1xuY2xhc3MgVmlkZW9DYW52YXMge1xuICBjb25zdHJ1Y3RvciAoY29uZmlnKSB7XG4gICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWcpO1xuICAgIHRoaXMuY2FudmFzID0gdGhpcy5jb25maWcuY2FudmFzID8gdGhpcy5jb25maWcuY2FudmFzIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgdGhpcy5zb3VyY2UgPSBuZXcgU291cmNlQnVmZmVyKHt0eXBlOiAndmlkZW8nfSk7XG4gICAgdGhpcy5wcmVsb2FkVGltZSA9IHRoaXMuY29uZmlnLnByZWxvYWRUaW1lIHx8IDM7XG4gICAgdGhpcy5vbmNhbnBsYXkgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5vbkZpcnN0RnJhbWUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5tZXRhID0gdW5kZWZpbmVkO1xuICAgIHRoaXMucmVhZHlTdGF0dXMgPSAwO1xuICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcbiAgICB0aGlzLmNvdW50ID0gMDtcbiAgICB0aGlzLmN1cnJlbnRUaW1lID0gMDtcbiAgICB0aGlzLmxhc3RQbGF5ZWQgPSAwO1xuXG4gICAgdGhpcy5fZGVjb2RlckluaXRlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2F2Y2NwdXNoZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9kZWNvZGVkRnJhbWVzID0ge307XG4gICAgdGhpcy5fbGFzdFNhbXBsZUR0cyA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9iYXNlRHRzID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2xhc3RSZW5kZXJUaW1lID0gbnVsbFxuICB9XG5cbiAgcGF1c2UgKCkge1xuICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcbiAgfVxuXG4gIGluaXRXYXNtV29ya2VyICgpIHtcbiAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgIHRoaXMud2FzbXdvcmtlciA9IFdvcmtlcmlmeShyZXF1aXJlLnJlc29sdmUoJy4vd29ya2VyLmpzJykpO1xuICAgIHRoaXMud2FzbXdvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICBtc2c6ICdpbml0JyxcbiAgICAgIG1ldGE6IHRoaXMubWV0YVxuICAgIH0pXG4gICAgdGhpcy53YXNtd29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBtc2cgPT4ge1xuICAgICAgc3dpdGNoIChtc2cuZGF0YS5tc2cpIHtcbiAgICAgICAgY2FzZSAnREVDT0RFUl9SRUFEWSc6XG4gICAgICAgICAgX3RoaXMuX2RlY29kZXJJbml0ZWQgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdERUNPREVEJzpcbiAgICAgICAgICB0aGlzLl9vbkRlY29kZWQobXNnLmRhdGEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2V0VmlkZW9NZXRhRGF0YSAobWV0YSkge1xuICAgIHRoaXMubWV0YSA9IG1ldGE7XG4gICAgaWYgKCF0aGlzLl9kZWNvZGVySW5pdGVkKSB7XG4gICAgICB0aGlzLmluaXRXYXNtV29ya2VyKCk7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGhpcy5fYXZjY3B1c2hlZCA9IHRydWU7XG4gICAgbGV0IGRhdGEgPSBuZXcgVWludDhBcnJheShtZXRhLnNwcy5ieXRlTGVuZ3RoICsgNCk7XG4gICAgZGF0YS5zZXQoWzAsIDAsIDAsIDFdKVxuICAgIGRhdGEuc2V0KG1ldGEuc3BzLCA0KTtcbiAgICB0aGlzLndhc213b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgbXNnOiAnZGVjb2RlJyxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KVxuXG4gICAgZGF0YSA9IG5ldyBVaW50OEFycmF5KG1ldGEucHBzLmJ5dGVMZW5ndGggKyA0KTtcbiAgICBkYXRhLnNldChbMCwgMCwgMCwgMV0pXG4gICAgZGF0YS5zZXQobWV0YS5wcHMsIDQpO1xuICAgIHRoaXMud2FzbXdvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICBtc2c6ICdkZWNvZGUnLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pXG5cbiAgICBpZiAoIXRoaXMueXV2Q2FudmFzKSB7XG4gICAgICBsZXQgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7bWV0YSwgY2FudmFzOiB0aGlzLmNhbnZhc30sIHRoaXMuY29uZmlnKTtcbiAgICAgIHRoaXMueXV2Q2FudmFzID0gbmV3IFlVVkNhbnZhcyhjb25maWcpO1xuICAgIH1cbiAgICB0aGlzLnJlYWR5U3RhdHVzID0gMTtcbiAgfVxuXG4gIGRlY29kZVZpZGVvICh2aWRlb1RyYWNrKSB7XG4gICAgaWYgKCF0aGlzLl9kZWNvZGVySW5pdGVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2F2Y2NwdXNoZWQpIHtcbiAgICAgIHRoaXMuc2V0VmlkZW9NZXRhRGF0YSh0aGlzLm1ldGEpO1xuICAgIH1cbiAgICBsZXQgeyBzYW1wbGVzIH0gPSB2aWRlb1RyYWNrO1xuICAgIGxldCBzYW1wbGUgPSBzYW1wbGVzLnNoaWZ0KCk7XG5cbiAgICB3aGlsZSAoc2FtcGxlKSB7XG4gICAgICBpZiAoIXRoaXMuX2Jhc2VEdHMpIHtcbiAgICAgICAgdGhpcy5fYmFzZUR0cyA9IHNhbXBsZS5kdHM7XG4gICAgICB9XG4gICAgICB0aGlzLnNvdXJjZS5wdXNoKHNhbXBsZSk7XG4gICAgICBzYW1wbGUgPSBzYW1wbGVzLnNoaWZ0KCk7XG4gICAgfVxuXG4gICAgdGhpcy5fcHJlbG9hZCgpO1xuICB9XG5cbiAgX3ByZWxvYWQgKCkge1xuICAgIGlmICghdGhpcy5fbGFzdFNhbXBsZUR0cyB8fCB0aGlzLl9sYXN0U2FtcGxlRHRzIC0gdGhpcy5fYmFzZUR0cyA8IHRoaXMuY3VycmVudFRpbWUgKyB0aGlzLnByZWxvYWRUaW1lICogMTAwMCkge1xuICAgICAgbGV0IHNhbXBsZSA9IHRoaXMuc291cmNlLmdldCgpO1xuICAgICAgaWYgKHNhbXBsZSkge1xuICAgICAgICB0aGlzLl9sYXN0U2FtcGxlRHRzID0gc2FtcGxlLmR0cztcbiAgICAgICAgdGhpcy5fYW5hbHlzZU5hbChzYW1wbGUpO1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAoc2FtcGxlICYmIHRoaXMuX2xhc3RTYW1wbGVEdHMgLSB0aGlzLl9iYXNlRHRzIDwgdGhpcy5jdXJyZW50VGltZSArIHRoaXMucHJlbG9hZFRpbWUgKiAxMDAwKSB7XG4gICAgICAgIHNhbXBsZSA9IHRoaXMuc291cmNlLmdldCgpO1xuICAgICAgICBpZiAoc2FtcGxlKSB7XG4gICAgICAgICAgdGhpcy5fYW5hbHlzZU5hbChzYW1wbGUpO1xuICAgICAgICAgIHRoaXMuX2xhc3RTYW1wbGVEdHMgPSBzYW1wbGUuZHRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2FuYWx5c2VOYWwgKHNhbXBsZSkge1xuICAgIGxldCBuYWxzID0gTmFsdW5pdC5nZXRBdmNjTmFscyhuZXcgU3RyZWFtKHNhbXBsZS5kYXRhLmJ1ZmZlcikpO1xuXG4gICAgbGV0IGxlbmd0aCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgbmFsID0gbmFsc1tpXTtcbiAgICAgIGxlbmd0aCArPSBuYWwuYm9keS5ieXRlTGVuZ3RoICsgNDtcbiAgICB9XG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgbGV0IGRhdGEgPSBuZXcgVWludDhBcnJheShsZW5ndGgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmFscy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IG5hbCA9IG5hbHNbaV07XG4gICAgICBkYXRhLnNldChbMCwgMCwgMCwgMV0sIG9mZnNldCk7XG4gICAgICBvZmZzZXQgKz0gNDtcbiAgICAgIGRhdGEuc2V0KG5ldyBVaW50OEFycmF5KG5hbC5ib2R5KSwgb2Zmc2V0KTtcbiAgICAgIG9mZnNldCArPSBuYWwuYm9keS5ieXRlTGVuZ3RoO1xuICAgIH1cbiAgICB0aGlzLndhc213b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgbXNnOiAnZGVjb2RlJyxcbiAgICAgIGRhdGE6IGRhdGEsXG4gICAgICBpbmZvOiB7XG4gICAgICAgIGR0czogc2FtcGxlLmR0cyxcbiAgICAgICAgcHRzOiBzYW1wbGUucHRzID8gc2FtcGxlLnB0cyA6IHNhbXBsZS5kdHMgKyBzYW1wbGUuY3RzLFxuICAgICAgICBrZXk6IHNhbXBsZS5pc0tleWZyYW1lXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIF9vbkRlY29kZWQgKGRhdGEpIHtcbiAgICBsZXQge2R0c30gPSBkYXRhLmluZm9cbiAgICB0aGlzLl9kZWNvZGVkRnJhbWVzW2R0c10gPSBkYXRhO1xuICB9XG5cbiAgcGxheSAoKSB7XG4gICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9vblRpbWVyKCk7XG4gIH1cblxuICBfb25UaW1lciAoY3VycmVudFRpbWUpIHtcbiAgICBpZiAodGhpcy5wYXVzZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMubWV0YSkge1xuICAgICAgaWYgKHRoaXMubWV0YS5mcmFtZVJhdGUgJiYgdGhpcy5tZXRhLmZyYW1lUmF0ZS5maXhlZCAmJiB0aGlzLm1ldGEuZnJhbWVSYXRlLmZwcykge1xuICAgICAgfVxuICAgICAgbGV0IGZyYW1lVGltZXMgPSBPYmplY3Qua2V5cyh0aGlzLl9kZWNvZGVkRnJhbWVzKTtcbiAgICAgIGlmIChmcmFtZVRpbWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZSA9IGN1cnJlbnRUaW1lO1xuICAgICAgICBsZXQgZnJhbWVUaW1lID0gLTE7XG4gICAgICAgIGxldCBjdXJyZW50SWR4ID0gMFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZyYW1lVGltZXMubGVuZ3RoICYmIE51bWJlci5wYXJzZUludChmcmFtZVRpbWVzW2ldKSAtIHRoaXMuX2Jhc2VEdHMgPD0gdGhpcy5jdXJyZW50VGltZTsgaSsrKSB7XG4gICAgICAgICAgZnJhbWVUaW1lID0gTnVtYmVyLnBhcnNlSW50KGZyYW1lVGltZXNbaSAtIDFdKTtcbiAgICAgICAgICBjdXJyZW50SWR4ID0gaTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmcmFtZSA9IHRoaXMuX2RlY29kZWRGcmFtZXNbZnJhbWVUaW1lXTtcbiAgICAgICAgaWYgKGZyYW1lKSB7XG4gICAgICAgICAgaWYgKHRoaXMub25jYW5wbGF5ICYmIHRoaXMucmVhZHlTdGF0dXMgPCA0KSB7XG4gICAgICAgICAgICB0aGlzLm9uY2FucGxheSgpO1xuICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXR1cyA9IDQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMueXV2Q2FudmFzLnJlbmRlcihmcmFtZS5idWZmZXIsIGZyYW1lLndpZHRoLCBmcmFtZS5oZWlnaHQsIGZyYW1lLnlMaW5lc2l6ZSwgZnJhbWUudXZMaW5lc2l6ZSk7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50SWR4OyBpKyspIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9kZWNvZGVkRnJhbWVzW2ldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9sYXN0UmVuZGVyVGltZSA9IERhdGUubm93KClcbiAgfVxuXG4gIGNsZWFuQnVmZmVyICgpIHtcbiAgICB0aGlzLnNvdXJjZS5yZW1vdmUoMCwgdGhpcy5jdXJyZW50VGltZSk7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFZpZGVvQ2FudmFzO1xuIiwiY29uc3QgTUFYX1NUUkVBTV9CVUZGRVJfTEVOR1RIID0gMTAyNCAqIDEwMjQ7XG52YXIgRGVjb2RlciA9IGZ1bmN0aW9uIChzZWxmKSB7XG4gIHRoaXMuaW5pdGVkID0gZmFsc2U7XG4gIHRoaXMuc2VsZiA9IHNlbGY7XG4gIHRoaXMubWV0YSA9IHRoaXMuc2VsZi5tZXRhO1xuICB0aGlzLmluZm9saXN0ID0ge307XG4gIHNlbGYucGFyX2Jyb2Fkd2F5T25Ccm9hZHdheUluaXRlZCA9IHRoaXMuYnJvYWR3YXlPbkJyb2Fkd2F5SW5pdGVkLmJpbmQodGhpcyk7XG4gIHNlbGYucGFyX2Jyb2Fkd2F5T25QaWN0dXJlRGVjb2RlZCA9IHRoaXMuYnJvYWR3YXlPblBpY3R1cmVEZWNvZGVkLmJpbmQodGhpcyk7XG59XG5cbkRlY29kZXIucHJvdG90eXBlLnRvVThBcnJheSA9IGZ1bmN0aW9uIChwdHIsIGxlbmd0aCkge1xuICByZXR1cm4gdGhpcy5zZWxmLkhFQVBVOC5zdWJhcnJheShwdHIsIHB0ciArIGxlbmd0aCk7XG59XG5cbkRlY29kZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIE1vZHVsZS5fYnJvYWR3YXlJbml0KCk7XG4gIHRoaXMuc3RyZWFtQnVmZmVyID0gdGhpcy50b1U4QXJyYXkoTW9kdWxlLl9icm9hZHdheUNyZWF0ZVN0cmVhbShNQVhfU1RSRUFNX0JVRkZFUl9MRU5HVEgpLCBNQVhfU1RSRUFNX0JVRkZFUl9MRU5HVEgpO1xufVxuXG5EZWNvZGVyLnByb3RvdHlwZS5icm9hZHdheU9uUGljdHVyZURlY29kZWQgPSBmdW5jdGlvbiAob2Zmc2V0LCB3aWR0aCwgaGVpZ2h0LCB5TGluZXNpemUsIHV2TGluZXNpemUsIGluZm9pZCkge1xuICBsZXQgaW5mbyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuaW5mb2xpc3RbaW5mb2lkXSk7XG4gIGxldCB5Um93Y291bnQgPSBoZWlnaHQ7XG4gIGxldCB1dlJvd2NvdW50ID0gaGVpZ2h0IC8gMjtcbiAgaWYgKHRoaXMubWV0YS5jaHJvbWFGb3JtYXQgPT09IDQ0NCB8fCB0aGlzLm1ldGEuY2hyb21hRm9ybWF0ID09PSA0MjIpIHtcbiAgICB1dlJvd2NvdW50ID0gaGVpZ2h0O1xuICB9XG4gIGxldCBkYXRhID0gdGhpcy50b1U4QXJyYXkob2Zmc2V0LCAoeUxpbmVzaXplICogeVJvd2NvdW50KSArIDIgKiAodXZMaW5lc2l6ZSAqIHV2Um93Y291bnQpKTtcbiAgdGhpcy5pbmZvbGlzdFtpbmZvaWRdID0gbnVsbDtcbiAgbGV0IGRhdGV0ZW1wID0gbmV3IFVpbnQ4QXJyYXkoZGF0YS5sZW5ndGgpO1xuICBkYXRldGVtcC5zZXQoZGF0YSk7XG4gIGxldCBidWZmZXIgPSBkYXRldGVtcC5idWZmZXI7XG4gIHRoaXMuc2VsZi5wb3N0TWVzc2FnZSh7XG4gICAgbXNnOiAnREVDT0RFRCcsXG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIHlMaW5lc2l6ZSxcbiAgICB1dkxpbmVzaXplLFxuICAgIGluZm8sXG4gICAgYnVmZmVyXG4gIH0sIFtidWZmZXJdKTtcbn1cblxuRGVjb2Rlci5wcm90b3R5cGUuYnJvYWR3YXlPbkJyb2Fkd2F5SW5pdGVkID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmluaXRlZCA9IHRydWU7XG4gIHRoaXMuc2VsZi5wb3N0TWVzc2FnZSh7bXNnOiAnREVDT0RFUl9SRUFEWSd9KTtcbn1cblxuRGVjb2Rlci5wcm90b3R5cGUuZGVjb2RlID0gZnVuY3Rpb24gKGRhdGEsIGluZm8pIHtcbiAgbGV0IHRpbWUgPSBwYXJzZUludChuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG4gIGxldCBpbmZvaWQgPSB0aW1lIC0gKE1hdGguZmxvb3IodGltZSAvIDEwZTgpICogMTBlOCk7XG4gIHRoaXMuaW5mb2xpc3RbaW5mb2lkXSA9IGluZm87XG4gIHRoaXMuc3RyZWFtQnVmZmVyLnNldChkYXRhKTtcbiAgTW9kdWxlLl9icm9hZHdheVBsYXlTdHJlYW0oZGF0YS5sZW5ndGgsIGluZm9pZCk7XG59XG5cbnZhciBkZWNvZGVyO1xuXG5mdW5jdGlvbiBvblBvc3RSdW4gKCkge1xuICBkZWNvZGVyID0gbmV3IERlY29kZXIodGhpcyk7XG4gIGRlY29kZXIuaW5pdCgpO1xufVxuXG5mdW5jdGlvbiBpbml0IChtZXRhKSB7XG4gIHNlbGYuaW1wb3J0U2NyaXB0cygnaHR0cHM6Ly9zZjEtdmNsb3VkY2RuLnBzdGF0cC5jb20vb2JqL3R0ZmUvbWVkaWEvZGVjb2Rlci9oMjY0L2RlY29kZXIuanMnKTtcbiAgYWRkT25Qb3N0UnVuKG9uUG9zdFJ1bi5iaW5kKHNlbGYpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2VsZikge1xuICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBkYXRhID0gZS5kYXRhO1xuICAgIGlmICghZGF0YS5tc2cpIHtcbiAgICAgIHNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBtc2c6ICdFUlJPUjppbnZhbGlkIG1lc3NhZ2UnXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKGRhdGEubXNnKSB7XG4gICAgICAgIGNhc2UgJ2luaXQnOlxuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgIHNlbGYubWV0YSA9IGRhdGEubWV0YTtcbiAgICAgICAgICBpbml0KClcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZGVjb2RlJzpcbiAgICAgICAgICBkZWNvZGVyLmRlY29kZShkYXRhLmRhdGEsIGRhdGEuaW5mbyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9LCBmYWxzZSk7XG59XG4iLCJjbGFzcyBZVVZDYW52YXMge1xuICBjb25zdHJ1Y3RvciAoY29uZmlncykge1xuICAgIHRoaXMuY29uZmlncyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZ3MpO1xuICAgIHRoaXMuY2FudmFzID0gdGhpcy5jb25maWdzLmNhbnZhcztcbiAgICB0aGlzLm1ldGEgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmNvbmZpZ3MubWV0YSk7XG4gICAgdGhpcy5jaHJvbWEgPSB0aGlzLm1ldGEuY2hyb21hRm9ybWF0O1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5tZXRhLnByZXNlbnRIZWlnaHQ7XG4gICAgdGhpcy53aWR0aCA9IHRoaXMubWV0YS5wcmVzZW50V2lkdGg7XG4gICAgdGhpcy5jYW52YXMud2lkdGggPSAxMjgwO1xuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IDcyMDtcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgdGhpcy5faW5pdENvbnRleHRHTCgpO1xuICAgIGlmICh0aGlzLmNvbnRleHRHTCkge1xuICAgICAgdGhpcy5faW5pdFByb2dyYW0oKTtcbiAgICAgIHRoaXMuX2luaXRCdWZmZXJzKCk7XG4gICAgICB0aGlzLl9pbml0VGV4dHVyZXMoKTtcbiAgICB9O1xuICB9XG5cbiAgX2luaXRDb250ZXh0R0wgKCkge1xuICAgIHZhciBjYW52YXMgPSB0aGlzLmNhbnZhcztcbiAgICB2YXIgZ2wgPSBudWxsO1xuXG4gICAgdmFyIHZhbGlkQ29udGV4dE5hbWVzID0gWyd3ZWJnbCcsICdleHBlcmltZW50YWwtd2ViZ2wnLCAnbW96LXdlYmdsJywgJ3dlYmtpdC0zZCddO1xuICAgIHZhciBuYW1lSW5kZXggPSAwO1xuXG4gICAgd2hpbGUgKCFnbCAmJiBuYW1lSW5kZXggPCB2YWxpZENvbnRleHROYW1lcy5sZW5ndGgpIHtcbiAgICAgIHZhciBjb250ZXh0TmFtZSA9IHZhbGlkQ29udGV4dE5hbWVzW25hbWVJbmRleF07XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRleHRPcHRpb25zKSB7XG4gICAgICAgICAgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dChjb250ZXh0TmFtZSwgdGhpcy5jb250ZXh0T3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dChjb250ZXh0TmFtZSk7XG4gICAgICAgIH07XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGdsID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFnbCB8fCB0eXBlb2YgZ2wuZ2V0UGFyYW1ldGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGdsID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgKytuYW1lSW5kZXg7XG4gICAgfTtcblxuICAgIHRoaXMuY29udGV4dEdMID0gZ2w7XG4gIH07XG5cbiAgX2luaXRQcm9ncmFtICgpIHtcbiAgICB2YXIgZ2wgPSB0aGlzLmNvbnRleHRHTDtcblxuICAgIC8vIHZlcnRleCBzaGFkZXIgaXMgdGhlIHNhbWUgZm9yIGFsbCB0eXBlc1xuICAgIHZhciB2ZXJ0ZXhTaGFkZXJTY3JpcHQ7XG4gICAgdmFyIGZyYWdtZW50U2hhZGVyU2NyaXB0O1xuICAgIHZlcnRleFNoYWRlclNjcmlwdCA9IFtcbiAgICAgICdhdHRyaWJ1dGUgdmVjNCB2ZXJ0ZXhQb3M7JyxcbiAgICAgICdhdHRyaWJ1dGUgdmVjNCB0ZXh0dXJlUG9zOycsXG4gICAgICAnYXR0cmlidXRlIHZlYzQgdVRleHR1cmVQb3M7JyxcbiAgICAgICdhdHRyaWJ1dGUgdmVjNCB2VGV4dHVyZVBvczsnLFxuICAgICAgJ3ZhcnlpbmcgdmVjMiB0ZXh0dXJlQ29vcmQ7JyxcbiAgICAgICd2YXJ5aW5nIHZlYzIgdVRleHR1cmVDb29yZDsnLFxuICAgICAgJ3ZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkOycsXG5cbiAgICAgICd2b2lkIG1haW4oKScsXG4gICAgICAneycsXG4gICAgICAnICBnbF9Qb3NpdGlvbiA9IHZlcnRleFBvczsnLFxuICAgICAgJyAgdGV4dHVyZUNvb3JkID0gdGV4dHVyZVBvcy54eTsnLFxuICAgICAgJyAgdVRleHR1cmVDb29yZCA9IHVUZXh0dXJlUG9zLnh5OycsXG4gICAgICAnICB2VGV4dHVyZUNvb3JkID0gdlRleHR1cmVQb3MueHk7JyxcbiAgICAgICd9J1xuICAgIF0uam9pbignXFxuJyk7XG5cbiAgICBmcmFnbWVudFNoYWRlclNjcmlwdCA9IFtcbiAgICAgICdwcmVjaXNpb24gaGlnaHAgZmxvYXQ7JyxcbiAgICAgICd2YXJ5aW5nIGhpZ2hwIHZlYzIgdGV4dHVyZUNvb3JkOycsXG4gICAgICAndmFyeWluZyBoaWdocCB2ZWMyIHVUZXh0dXJlQ29vcmQ7JyxcbiAgICAgICd2YXJ5aW5nIGhpZ2hwIHZlYzIgdlRleHR1cmVDb29yZDsnLFxuICAgICAgJ3VuaWZvcm0gc2FtcGxlcjJEIHlTYW1wbGVyOycsXG4gICAgICAndW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7JyxcbiAgICAgICd1bmlmb3JtIHNhbXBsZXIyRCB2U2FtcGxlcjsnLFxuICAgICAgJ3VuaWZvcm0gbWF0NCBZVVYyUkdCOycsXG5cbiAgICAgICd2b2lkIG1haW4odm9pZCkgeycsXG4gICAgICAnICBoaWdocCBmbG9hdCB5ID0gdGV4dHVyZTJEKHlTYW1wbGVyLCAgdGV4dHVyZUNvb3JkKS5yOycsXG4gICAgICAnICBoaWdocCBmbG9hdCB1ID0gdGV4dHVyZTJEKHVTYW1wbGVyLCAgdVRleHR1cmVDb29yZCkucjsnLFxuICAgICAgJyAgaGlnaHAgZmxvYXQgdiA9IHRleHR1cmUyRCh2U2FtcGxlciwgIHZUZXh0dXJlQ29vcmQpLnI7JyxcbiAgICAgICcgIGdsX0ZyYWdDb2xvciA9IHZlYzQoeSwgdSwgdiwgMSkgKiBZVVYyUkdCOycsXG4gICAgICAnfSdcbiAgICBdLmpvaW4oJ1xcbicpO1xuXG4gICAgdmFyIFlVVjJSR0IgPSBbXG4gICAgICAxLjE2NDM4LCAwLjAwMDAwLCAxLjU5NjAzLCAtMC44NzA3OSxcbiAgICAgIDEuMTY0MzgsIC0wLjM5MTc2LCAtMC44MTI5NywgMC41Mjk1OSxcbiAgICAgIDEuMTY0MzgsIDIuMDE3MjMsIDAuMDAwMDAsIC0xLjA4MTM5LFxuICAgICAgMCwgMCwgMCwgMVxuICAgIF07XG4gICAgdmFyIHZlcnRleFNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcbiAgICBnbC5zaGFkZXJTb3VyY2UodmVydGV4U2hhZGVyLCB2ZXJ0ZXhTaGFkZXJTY3JpcHQpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIodmVydGV4U2hhZGVyKTtcbiAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcih2ZXJ0ZXhTaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgY29uc29sZS5sb2coJ1ZlcnRleCBzaGFkZXIgZmFpbGVkIHRvIGNvbXBpbGU6ICcgKyBnbC5nZXRTaGFkZXJJbmZvTG9nKHZlcnRleFNoYWRlcikpO1xuICAgIH1cblxuICAgIHZhciBmcmFnbWVudFNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihnbC5GUkFHTUVOVF9TSEFERVIpO1xuICAgIGdsLnNoYWRlclNvdXJjZShmcmFnbWVudFNoYWRlciwgZnJhZ21lbnRTaGFkZXJTY3JpcHQpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIoZnJhZ21lbnRTaGFkZXIpO1xuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKGZyYWdtZW50U2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdGcmFnbWVudCBzaGFkZXIgZmFpbGVkIHRvIGNvbXBpbGU6ICcgKyBnbC5nZXRTaGFkZXJJbmZvTG9nKGZyYWdtZW50U2hhZGVyKSk7XG4gICAgfVxuXG4gICAgdmFyIHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHZlcnRleFNoYWRlcik7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcbiAgICBnbC5saW5rUHJvZ3JhbShwcm9ncmFtKTtcbiAgICBpZiAoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpKSB7XG4gICAgICBjb25zb2xlLmxvZygnUHJvZ3JhbSBmYWlsZWQgdG8gY29tcGlsZTogJyArIGdsLmdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pKTtcbiAgICB9XG5cbiAgICBnbC51c2VQcm9ncmFtKHByb2dyYW0pO1xuXG4gICAgdmFyIFlVVjJSR0JSZWYgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgJ1lVVjJSR0InKTtcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KFlVVjJSR0JSZWYsIGZhbHNlLCBZVVYyUkdCKTtcblxuICAgIHRoaXMuc2hhZGVyUHJvZ3JhbSA9IHByb2dyYW07XG4gIH1cblxuICBfaW5pdEJ1ZmZlcnMgKCkge1xuICAgIHZhciBnbCA9IHRoaXMuY29udGV4dEdMO1xuICAgIHZhciBwcm9ncmFtID0gdGhpcy5zaGFkZXJQcm9ncmFtO1xuXG4gICAgdmFyIHZlcnRleFBvc0J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2ZXJ0ZXhQb3NCdWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KFsxLCAxLCAtMSwgMSwgMSwgLTEsIC0xLCAtMV0pLCBnbC5TVEFUSUNfRFJBVyk7XG5cbiAgICB2YXIgdmVydGV4UG9zUmVmID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgJ3ZlcnRleFBvcycpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHZlcnRleFBvc1JlZik7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcih2ZXJ0ZXhQb3NSZWYsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG5cbiAgICB2YXIgdGV4dHVyZVBvc0J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0ZXh0dXJlUG9zQnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShbMSwgMCwgMCwgMCwgMSwgMSwgMCwgMV0pLCBnbC5TVEFUSUNfRFJBVyk7XG5cbiAgICB2YXIgdGV4dHVyZVBvc1JlZiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sICd0ZXh0dXJlUG9zJyk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGV4dHVyZVBvc1JlZik7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcih0ZXh0dXJlUG9zUmVmLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuXG4gICAgdGhpcy50ZXh0dXJlUG9zQnVmZmVyID0gdGV4dHVyZVBvc0J1ZmZlcjtcblxuICAgIHZhciB1VGV4dHVyZVBvc0J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB1VGV4dHVyZVBvc0J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDAsIDEsIDEsIDAsIDFdKSwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgdmFyIHVUZXh0dXJlUG9zUmVmID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgJ3VUZXh0dXJlUG9zJyk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodVRleHR1cmVQb3NSZWYpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodVRleHR1cmVQb3NSZWYsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG5cbiAgICB0aGlzLnVUZXh0dXJlUG9zQnVmZmVyID0gdVRleHR1cmVQb3NCdWZmZXI7XG5cbiAgICB2YXIgdlRleHR1cmVQb3NCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdlRleHR1cmVQb3NCdWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KFsxLCAwLCAwLCAwLCAxLCAxLCAwLCAxXSksIGdsLlNUQVRJQ19EUkFXKTtcblxuICAgIHZhciB2VGV4dHVyZVBvc1JlZiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sICd2VGV4dHVyZVBvcycpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHZUZXh0dXJlUG9zUmVmKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHZUZXh0dXJlUG9zUmVmLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuXG4gICAgdGhpcy52VGV4dHVyZVBvc0J1ZmZlciA9IHZUZXh0dXJlUG9zQnVmZmVyO1xuICB9O1xuXG4gIF9pbml0VGV4dHVyZXMgKCkge1xuICAgIHZhciBnbCA9IHRoaXMuY29udGV4dEdMO1xuICAgIHZhciBwcm9ncmFtID0gdGhpcy5zaGFkZXJQcm9ncmFtO1xuICAgIHZhciB5VGV4dHVyZVJlZiA9IHRoaXMuX2luaXRUZXh0dXJlKCk7XG4gICAgdmFyIHlTYW1wbGVyUmVmID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sICd5U2FtcGxlcicpO1xuICAgIGdsLnVuaWZvcm0xaSh5U2FtcGxlclJlZiwgMCk7XG4gICAgdGhpcy55VGV4dHVyZVJlZiA9IHlUZXh0dXJlUmVmO1xuXG4gICAgdmFyIHVUZXh0dXJlUmVmID0gdGhpcy5faW5pdFRleHR1cmUoKTtcbiAgICB2YXIgdVNhbXBsZXJSZWYgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgJ3VTYW1wbGVyJyk7XG4gICAgZ2wudW5pZm9ybTFpKHVTYW1wbGVyUmVmLCAxKTtcbiAgICB0aGlzLnVUZXh0dXJlUmVmID0gdVRleHR1cmVSZWY7XG5cbiAgICB2YXIgdlRleHR1cmVSZWYgPSB0aGlzLl9pbml0VGV4dHVyZSgpO1xuICAgIHZhciB2U2FtcGxlclJlZiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCAndlNhbXBsZXInKTtcbiAgICBnbC51bmlmb3JtMWkodlNhbXBsZXJSZWYsIDIpO1xuICAgIHRoaXMudlRleHR1cmVSZWYgPSB2VGV4dHVyZVJlZjtcbiAgfVxuXG4gIF9pbml0VGV4dHVyZSAoKSB7XG4gICAgdmFyIGdsID0gdGhpcy5jb250ZXh0R0w7XG5cbiAgICB2YXIgdGV4dHVyZVJlZiA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlUmVmKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpO1xuXG4gICAgcmV0dXJuIHRleHR1cmVSZWY7XG4gIH1cblxuICBfZHJhd1BpY3R1cmVHTCAoZGF0YSwgd2lkdGgsIGhlaWdodCwgeUxpbmVzaXplLCB1dkxpbmVzaXplKSB7XG4gICAgdmFyIHlsZW4gPSB5TGluZXNpemUgKiBoZWlnaHQ7XG4gICAgdmFyIHV2bGVuID0gdXZMaW5lc2l6ZSAqIGhlaWdodCAvIDI7XG4gICAgaWYgKHRoaXMuY2hyb21hID09PSA0NDQgfHwgdGhpcy5jaHJvbWEgPT09IDQyMikge1xuICAgICAgdXZsZW4gKj0gMjtcbiAgICB9XG4gICAgZGF0YSA9IG5ldyBVaW50OEFycmF5KGRhdGEpO1xuICAgIGxldCByZW5kZXJEYXRhID0ge1xuICAgICAgeURhdGE6IGRhdGEuc3ViYXJyYXkoMCwgeWxlbiksXG4gICAgICB1RGF0YTogZGF0YS5zdWJhcnJheSh5bGVuLCB5bGVuICsgdXZsZW4pLFxuICAgICAgdkRhdGE6IGRhdGEuc3ViYXJyYXkoeWxlbiArIHV2bGVuLCB5bGVuICsgdXZsZW4gKyB1dmxlbilcbiAgICB9XG4gICAgdGhpcy5fZHJhd1BpY3R1cmVHTDQyMChyZW5kZXJEYXRhLCB3aWR0aCwgaGVpZ2h0LCB5TGluZXNpemUsIHV2TGluZXNpemUpO1xuICB9XG5cbiAgX2RyYXdQaWN0dXJlR0w0MjAgKGRhdGEsIHdpZHRoLCBoZWlnaHQsIHlMaW5lc2l6ZSwgdXZMaW5lc2l6ZSkge1xuICAgIHZhciBnbCA9IHRoaXMuY29udGV4dEdMO1xuICAgIHZhciB0ZXh0dXJlUG9zQnVmZmVyID0gdGhpcy50ZXh0dXJlUG9zQnVmZmVyO1xuICAgIHZhciB1VGV4dHVyZVBvc0J1ZmZlciA9IHRoaXMudVRleHR1cmVQb3NCdWZmZXI7XG4gICAgdmFyIHZUZXh0dXJlUG9zQnVmZmVyID0gdGhpcy52VGV4dHVyZVBvc0J1ZmZlcjtcblxuICAgIHZhciB5VGV4dHVyZVJlZiA9IHRoaXMueVRleHR1cmVSZWY7XG4gICAgdmFyIHVUZXh0dXJlUmVmID0gdGhpcy51VGV4dHVyZVJlZjtcbiAgICB2YXIgdlRleHR1cmVSZWYgPSB0aGlzLnZUZXh0dXJlUmVmO1xuXG4gICAgdmFyIHlEYXRhID0gZGF0YS55RGF0YTtcbiAgICB2YXIgdURhdGEgPSBkYXRhLnVEYXRhO1xuICAgIHZhciB2RGF0YSA9IGRhdGEudkRhdGE7XG5cbiAgICB2YXIgeURhdGFQZXJSb3cgPSB5TGluZXNpemU7XG4gICAgdmFyIHlSb3dDbnQgPSBoZWlnaHQ7XG5cbiAgICB2YXIgdURhdGFQZXJSb3cgPSB3aWR0aCAvIDI7XG4gICAgdmFyIHVSb3dDbnQgPSBoZWlnaHQgLyAyO1xuXG4gICAgaWYgKHRoaXMuY2hyb21hID09PSA0MjIgfHwgdGhpcy5jaHJvbWEgPT09IDQ0NCkge1xuICAgICAgdVJvd0NudCA9IGhlaWdodDtcbiAgICB9XG4gICAgXG4gICAgdmFyIHZEYXRhUGVyUm93ID0gdXZMaW5lc2l6ZTtcbiAgICB2YXIgdlJvd0NudCA9IHVSb3dDbnQ7XG4gICAgXG4gICAgbGV0IHJhdGlvdyA9IHRoaXMuY2FudmFzLndpZHRoIC8gdGhpcy53aWR0aDtcbiAgICBsZXQgcmF0aW9oID0gdGhpcy5jYW52YXMuaGVpZ2h0IC8gdGhpcy5oZWlnaHQ7XG4gICAgbGV0IGxlZnQgPSAwO1xuICAgIGxldCB0b3AgPSAwO1xuICAgIGxldCB3ID0gdGhpcy5jYW52YXMud2lkdGg7XG4gICAgbGV0IGggPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XG4gICAgaWYgKHJhdGlvdyA8IHJhdGlvaCkge1xuICAgICAgaCA9ICh0aGlzLmhlaWdodCAqIHRoaXMuY2FudmFzLndpZHRoIC8gdGhpcy53aWR0aCk7XG4gICAgICB0b3AgPSBwYXJzZUludCgodGhpcy5jYW52YXMuaGVpZ2h0IC0gKHRoaXMuaGVpZ2h0ICogdGhpcy5jYW52YXMud2lkdGggLyB0aGlzLndpZHRoKSkgLyAyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdyA9ICh0aGlzLndpZHRoICogdGhpcy5jYW52YXMuaGVpZ2h0IC8gdGhpcy5oZWlnaHQpO1xuICAgICAgbGVmdCA9IHBhcnNlSW50KCh0aGlzLmNhbnZhcy53aWR0aCAtICh0aGlzLndpZHRoICogdGhpcy5jYW52YXMuaGVpZ2h0IC8gdGhpcy5oZWlnaHQpKSAvIDIpO1xuICAgIH1cbiAgICBnbC52aWV3cG9ydChsZWZ0LCB0b3AsIHcsIGgpO1xuXG4gICAgdmFyIHRleHR1cmVQb3NWYWx1ZXMgPSBuZXcgRmxvYXQzMkFycmF5KFsxLCAwLCAwLCAwLCAxLCAxLCAwLCAxXSk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRleHR1cmVQb3NCdWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCB0ZXh0dXJlUG9zVmFsdWVzLCBnbC5EWU5BTUlDX0RSQVcpO1xuXG4gICAgdmFyIHVUZXh0dXJlUG9zVmFsdWVzID0gbmV3IEZsb2F0MzJBcnJheShbMSwgMCwgMCwgMCwgMSwgMSwgMCwgMV0pO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB1VGV4dHVyZVBvc0J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHVUZXh0dXJlUG9zVmFsdWVzLCBnbC5EWU5BTUlDX0RSQVcpO1xuXG4gICAgdmFyIHZUZXh0dXJlUG9zVmFsdWVzID0gbmV3IEZsb2F0MzJBcnJheShbMSwgMCwgMCwgMCwgMSwgMSwgMCwgMV0pO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2VGV4dHVyZVBvc0J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHZUZXh0dXJlUG9zVmFsdWVzLCBnbC5EWU5BTUlDX0RSQVcpO1xuICAgIFxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHlUZXh0dXJlUmVmKTtcbiAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLkxVTUlOQU5DRSwgeURhdGFQZXJSb3csIHlSb3dDbnQsIDAsIGdsLkxVTUlOQU5DRSwgZ2wuVU5TSUdORURfQllURSwgeURhdGEpO1xuXG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMSk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdVRleHR1cmVSZWYpO1xuICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuTFVNSU5BTkNFLCB1RGF0YVBlclJvdywgdVJvd0NudCwgMCwgZ2wuTFVNSU5BTkNFLCBnbC5VTlNJR05FRF9CWVRFLCB1RGF0YSk7XG5cbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUyKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB2VGV4dHVyZVJlZik7XG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5MVU1JTkFOQ0UsIHZEYXRhUGVyUm93LCB2Um93Q250LCAwLCBnbC5MVU1JTkFOQ0UsIGdsLlVOU0lHTkVEX0JZVEUsIHZEYXRhKTtcblxuICAgIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVfU1RSSVAsIDAsIDQpO1xuICB9XG5cbiAgX2RyYXdQaWN0dXJlUkdCIChkYXRhKSB7XG5cbiAgfVxuXG4gIHJlbmRlciAoZGF0YSwgd2lkdGgsIGhlaWdodCwgeUxpbmVzaXplLCB1dkxpbmVzaXplKSB7XG4gICAgdmFyIGdsID0gdGhpcy5jb250ZXh0R0w7XG4gICAgaWYgKGdsKSB7XG4gICAgICB0aGlzLl9kcmF3UGljdHVyZUdMKGRhdGEsIHdpZHRoLCBoZWlnaHQsIHlMaW5lc2l6ZSwgdXZMaW5lc2l6ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RyYXdQaWN0dXJlUkdCKGRhdGEpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBZVVZDYW52YXM7XG4iLCJjb25zdCBpc09iamVjdEZpbGxlZCA9IChvYmopID0+IHtcbiAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgaWYgKG9ialtrZXldID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZWRpYUluZm8ge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5taW1lVHlwZSA9IG51bGxcbiAgICB0aGlzLmR1cmF0aW9uID0gbnVsbFxuXG4gICAgdGhpcy5oYXNWaWRlbyA9IG51bGxcbiAgICB0aGlzLnZpZGVvID0ge1xuICAgICAgY29kZWM6IG51bGwsXG4gICAgICB3aWR0aDogbnVsbCxcbiAgICAgIGhlaWdodDogbnVsbCxcbiAgICAgIHByb2ZpbGU6IG51bGwsXG4gICAgICBsZXZlbDogbnVsbCxcbiAgICAgIGZyYW1lUmF0ZToge1xuICAgICAgICBmaXhlZDogdHJ1ZSxcbiAgICAgICAgZnBzOiAyNSxcbiAgICAgICAgZnBzX251bTogMjUwMDAsXG4gICAgICAgIGZwc19kZW46IDEwMDBcbiAgICAgIH0sXG4gICAgICBjaHJvbWFGb3JtYXQ6IG51bGwsXG4gICAgICBwYXJSYXRpbzoge1xuICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgaGVpZ2h0OiAxXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5oYXNBdWRpbyA9IG51bGxcblxuICAgIHRoaXMuYXVkaW8gPSB7XG4gICAgICBjb2RlYzogbnVsbCxcbiAgICAgIHNhbXBsZVJhdGU6IG51bGwsXG4gICAgICBzYW1wbGVSYXRlSW5kZXg6IG51bGwsXG4gICAgICBjaGFubmVsQ291bnQ6IG51bGxcbiAgICB9XG4gIH1cblxuICBpc0NvbXBsZXRlICgpIHtcbiAgICByZXR1cm4gTWVkaWFJbmZvLmlzQmFzZUluZm9SZWFkeSh0aGlzKSAmJiBNZWRpYUluZm8uaXNWaWRlb1JlYWR5KHRoaXMpICYmIE1lZGlhSW5mby5pc0F1ZGlvUmVhZHkodGhpcylcbiAgfVxuXG4gIHN0YXRpYyBpc0Jhc2VJbmZvUmVhZHkgKG1lZGlhSW5mbykge1xuICAgIHJldHVybiBpc09iamVjdEZpbGxlZChtZWRpYUluZm8pXG4gIH1cblxuICBzdGF0aWMgaXNWaWRlb1JlYWR5IChtZWRpYUluZm8pIHtcbiAgICBpZiAoIW1lZGlhSW5mby5oYXNWaWRlbykge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4gaXNPYmplY3RGaWxsZWQobWVkaWFJbmZvLnZpZGVvKVxuICB9XG5cbiAgc3RhdGljIGlzQXVkaW9SZWFkeSAobWVkaWFJbmZvKSB7XG4gICAgaWYgKCFtZWRpYUluZm8uaGFzQXVkaW8pIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgcmV0dXJuIGlzT2JqZWN0RmlsbGVkKG1lZGlhSW5mby52aWRlbylcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVkaWFTYW1wbGUge1xuICBjb25zdHJ1Y3RvciAoaW5mbykge1xuICAgIGxldCBfZGVmYXVsdCA9IE1lZGlhU2FtcGxlLmdldERlZmF1bHRJbmYoKVxuXG4gICAgaWYgKCFpbmZvIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbmZvKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgIHJldHVybiBfZGVmYXVsdFxuICAgIH1cbiAgICBsZXQgc2FtcGxlID0gT2JqZWN0LmFzc2lnbih7fSwgX2RlZmF1bHQsIGluZm8pXG5cbiAgICBPYmplY3QuZW50cmllcyhzYW1wbGUpLmZvckVhY2goKFtrLCB2XSkgPT4ge1xuICAgICAgdGhpc1trXSA9IHZcbiAgICB9KVxuICB9XG5cbiAgc3RhdGljIGdldERlZmF1bHRJbmYgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkdHM6IG51bGwsXG4gICAgICBwdHM6IG51bGwsXG4gICAgICBkdXJhdGlvbjogbnVsbCxcbiAgICAgIHBvc2l0aW9uOiBudWxsLFxuICAgICAgaXNSQVA6IGZhbHNlLCAvLyBpcyBSYW5kb20gYWNjZXNzIHBvaW50XG4gICAgICBvcmlnaW5EdHM6IG51bGxcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lZGlhU2VnbWVudExpc3Qge1xuXG4gICAgY29uc3RydWN0b3IgKHR5cGUpIHtcbiAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuX2xpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5fbGFzdEFwcGVuZExvY2F0aW9uID0gLTE7IC8vIGNhY2hlZCBsYXN0IGluc2VydCBsb2NhdGlvblxuICAgIH1cblxuICAgIGdldCB0eXBlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gICAgfVxuXG4gICAgZ2V0IGxlbmd0aCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0Lmxlbmd0aDtcbiAgICB9XG5cbiAgICBpc0VtcHR5ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3QubGVuZ3RoID09PSAwO1xuICAgIH1cblxuICAgIGNsZWFyICgpIHtcbiAgICAgICAgdGhpcy5fbGlzdCA9IFtdO1xuICAgICAgICB0aGlzLl9sYXN0QXBwZW5kTG9jYXRpb24gPSAtMTtcbiAgICB9XG5cbiAgICBfc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUgKGJlZ2luRHRzKSB7XG4gICAgICAgIGxldCBsaXN0ID0gdGhpcy5fbGlzdDtcbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gLTI7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxhc3QgPSBsaXN0Lmxlbmd0aCAtIDE7XG4gICAgICAgIGxldCBtaWQgPSAwO1xuICAgICAgICBsZXQgbGJvdW5kID0gMDtcbiAgICAgICAgbGV0IHVib3VuZCA9IGxhc3Q7XG5cbiAgICAgICAgbGV0IGlkeCA9IDA7XG5cbiAgICAgICAgaWYgKGJlZ2luRHRzIDwgbGlzdFswXS5vcmlnaW5EdHMpIHtcbiAgICAgICAgICAgIGlkeCA9IC0xO1xuICAgICAgICAgICAgcmV0dXJuIGlkeDtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChsYm91bmQgPD0gdWJvdW5kKSB7XG4gICAgICAgICAgICBtaWQgPSBsYm91bmQgKyBNYXRoLmZsb29yKCh1Ym91bmQgLSBsYm91bmQpIC8gMik7XG4gICAgICAgICAgICBpZiAobWlkID09PSBsYXN0IHx8IChiZWdpbkR0cyA+IGxpc3RbbWlkXS5sYXN0U2FtcGxlLm9yaWdpbkR0c1xuICAgICAgICAgICAgICAgICAgICAmJiAoYmVnaW5EdHMgPCBsaXN0W21pZCArIDFdLm9yaWdpbkR0cykpKSB7XG4gICAgICAgICAgICAgICAgaWR4ID0gbWlkO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsaXN0W21pZF0ub3JpZ2luRHRzIDwgYmVnaW5EdHMpIHtcbiAgICAgICAgICAgICAgICBsYm91bmQgPSBtaWQgKyAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB1Ym91bmQgPSBtaWQgLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpZHg7XG4gICAgfVxuXG4gICAgX3NlYXJjaE5lYXJlc3RTZWdtZW50QWZ0ZXIgKGJlZ2luRHRzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWFyY2hOZWFyZXN0U2VnbWVudEJlZm9yZShiZWdpbkR0cykgKyAxO1xuICAgIH1cblxuICAgIGFwcGVuZCAoc2VnbWVudCkge1xuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuX2xpc3Q7XG4gICAgICAgIGxldCBsYXN0QXBwZW5kSWR4ID0gdGhpcy5fbGFzdEFwcGVuZExvY2F0aW9uO1xuICAgICAgICBsZXQgaW5zZXJ0SWR4ID0gMDtcblxuICAgICAgICBpZiAobGFzdEFwcGVuZElkeCAhPT0gLTEgJiYgbGFzdEFwcGVuZElkeCA8IGxpc3QubGVuZ3RoXG4gICAgICAgICAgICAmJiBzZWdtZW50Lm9yaWdpblN0YXJ0RHRzID49IGxpc3RbbGFzdEFwcGVuZElkeF0ubGFzdFNhbXBsZS5vcmlnaW5EdHNcbiAgICAgICAgICAgICYmICgobGFzdEFwcGVuZElkeCA9PT0gbGlzdC5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICAgIHx8IChsYXN0QXBwZW5kSWR4IDwgbGlzdC5sZW5ndGggLSAxXG4gICAgICAgICAgICAgICAgICAgICYmIHNlZ21lbnQub3JpZ2luU3RhcnREdHMgPCBsaXN0W2xhc3RBcHBlbmRJZHggKyAxXS5vcmlnaW5TdGFydER0cykpKSB7XG4gICAgICAgICAgICBpbnNlcnRJZHggPSBsYXN0QXBwZW5kSWR4ICsgMTsgLy8gdXNlIGNhY2hlZCBsb2NhdGlvbiBpZHhcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChsaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBpbnNlcnRJZHggPSB0aGlzLl9zZWFyY2hOZWFyZXN0U2VnbWVudEJlZm9yZShzZWdtZW50Lm9yaWdpblN0YXJ0RHRzKSArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9sYXN0QXBwZW5kTG9jYXRpb24gPSBpbnNlcnRJZHg7XG4gICAgICAgIHRoaXMuX2xpc3Quc3BsaWNlKGluc2VydElkeCwgMCwgc2VnbWVudCk7XG4gICAgfVxuXG4gICAgZ2V0TGFzdFNlZ21lbnRCZWZvcmUgKGJlZ2luRHRzKSB7XG4gICAgICAgIGxldCBpZHggPSB0aGlzLl9zZWFyY2hOZWFyZXN0U2VnbWVudEJlZm9yZShiZWdpbkR0cyk7XG4gICAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RbaWR4XTtcbiAgICAgICAgfSBlbHNlIHsgLy8gLTFcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TGFzdFNhbXBsZUJlZm9yZSAoYmVnaW5EdHMpIHtcbiAgICAgICAgbGV0IHNlZ21lbnQgPSB0aGlzLmdldExhc3RTZWdtZW50QmVmb3JlKGJlZ2luRHRzKTtcbiAgICAgICAgaWYgKHNlZ21lbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWdtZW50Lmxhc3RTYW1wbGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldExhc3RSQVBCZWZvcmUgKGJlZ2luRHRzKSB7XG4gICAgICAgIGxldCBzZWdtZW50SWR4ID0gdGhpcy5fc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUoYmVnaW5EdHMpO1xuICAgICAgICBsZXQgcmFuZG9tQWNjZXNzUG9pbnRzID0gdGhpcy5fbGlzdFtzZWdtZW50SWR4XS5yYW5kb21BY2Nlc3NQb2ludHM7XG4gICAgICAgIHdoaWxlIChyYW5kb21BY2Nlc3NQb2ludHMubGVuZ3RoID09PSAwICYmIHNlZ21lbnRJZHggPiAwKSB7XG4gICAgICAgICAgICBzZWdtZW50SWR4LS07XG4gICAgICAgICAgICByYW5kb21BY2Nlc3NQb2ludHMgPSB0aGlzLl9saXN0W3NlZ21lbnRJZHhdLnJhbmRvbUFjY2Vzc1BvaW50cztcbiAgICAgICAgfVxuICAgICAgICBpZiAocmFuZG9tQWNjZXNzUG9pbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiByYW5kb21BY2Nlc3NQb2ludHNbcmFuZG9tQWNjZXNzUG9pbnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNZWRpYVNlZ21lbnQge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgdGhpcy5zdGFydER0cyA9IC0xO1xuICAgICAgICB0aGlzLmVuZER0cyA9IC0xO1xuICAgICAgICB0aGlzLnN0YXJ0UHRzID0gLTE7XG4gICAgICAgIHRoaXMuZW5kUHRzID0gLTE7XG4gICAgICAgIHRoaXMub3JpZ2luU3RhcnREdHMgPSAtMTtcbiAgICAgICAgdGhpcy5vcmlnaW5FbmREdHMgPSAtMTtcbiAgICAgICAgdGhpcy5yYW5kb21BY2Nlc3NQb2ludHMgPSBbXTtcbiAgICAgICAgdGhpcy5maXJzdFNhbXBsZSA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdFNhbXBsZSA9IG51bGw7XG4gICAgfVxuXG4gICAgYWRkUkFQIChzYW1wbGUpIHtcbiAgICAgICAgc2FtcGxlLmlzUkFQID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yYW5kb21BY2Nlc3NQb2ludHMucHVzaChzYW1wbGUpO1xuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgQXVkaW9UcmFja01ldGEge1xuICBjb25zdHJ1Y3RvciAobWV0YSkge1xuICAgIGNvbnN0IF9kZWZhdWx0ID0ge1xuICAgICAgc2FtcGxlUmF0ZTogNDgwMDAsXG4gICAgICBjaGFubmVsQ291bnQ6IDIsXG4gICAgICBjb2RlYzogJ21wNGEuNDAuMicsXG4gICAgICBjb25maWc6IFs0MSwgNDAxLCAxMzYsIDBdLFxuICAgICAgZHVyYXRpb246IDAsXG4gICAgICBpZDogMixcbiAgICAgIHJlZlNhbXBsZUR1cmF0aW9uOiAyMSxcbiAgICAgIHNhbXBsZVJhdGVJbmRleDogMyxcbiAgICAgIHRpbWVzY2FsZTogMTAwMCxcbiAgICAgIHR5cGU6ICdhdWRpbydcbiAgICB9XG4gICAgaWYgKG1ldGEpIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBfZGVmYXVsdCwgbWV0YSlcbiAgICB9XG4gICAgcmV0dXJuIF9kZWZhdWx0XG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmluaXQgPSBudWxsXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFZpZGVvVHJhY2tNZXRhIHtcbiAgY29uc3RydWN0b3IgKG1ldGEpIHtcbiAgICBjb25zdCBfZGVmYXVsdCA9IHtcbiAgICAgIGF2Y2M6IG51bGwsXG4gICAgICBzcHM6IG5ldyBVaW50OEFycmF5KDApLFxuICAgICAgcHBzOiBuZXcgVWludDhBcnJheSgwKSxcbiAgICAgIGNocm9tYUZvcm1hdDogNDIwLFxuICAgICAgY29kZWM6ICdhdmMxLjY0MDAyMCcsXG4gICAgICBjb2RlY0hlaWdodDogNzIwLFxuICAgICAgY29kZWNXaWR0aDogMTI4MCxcbiAgICAgIGR1cmF0aW9uOiAwLFxuICAgICAgZnJhbWVSYXRlOiB7XG4gICAgICAgIGZpeGVkOiB0cnVlLFxuICAgICAgICBmcHM6IDI1LFxuICAgICAgICBmcHNfbnVtOiAyNTAwMCxcbiAgICAgICAgZnBzX2RlbjogMTAwMFxuICAgICAgfSxcbiAgICAgIGlkOiAxLFxuICAgICAgbGV2ZWw6ICczLjInLFxuICAgICAgcHJlc2VudEhlaWdodDogNzIwLFxuICAgICAgcHJlc2VudFdpZHRoOiAxMjgwLFxuICAgICAgcHJvZmlsZTogJ0hpZ2gnLFxuICAgICAgcmVmU2FtcGxlRHVyYXRpb246IDQwLFxuICAgICAgcGFyUmF0aW86IHtcbiAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICB3aWR0aDogMVxuICAgICAgfSxcbiAgICAgIHRpbWVzY2FsZTogMTAwMCxcbiAgICAgIHR5cGU6ICd2aWRlbydcbiAgICB9XG5cbiAgICBpZiAobWV0YSkge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIF9kZWZhdWx0LCBtZXRhKVxuICAgIH1cbiAgICByZXR1cm4gX2RlZmF1bHRcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuaW5pdCA9IG51bGxcbiAgICB0aGlzLnNwcyA9IG51bGxcbiAgICB0aGlzLnBwcyA9IG51bGxcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEF1ZGlvVHJhY2tTYW1wbGUge1xuICBjb25zdHJ1Y3RvciAoaW5mbykge1xuICAgIGxldCBfZGVmYXVsdCA9IEF1ZGlvVHJhY2tTYW1wbGUuZ2V0RGVmYXVsdCgpXG4gICAgaWYgKCFpbmZvKSB7XG4gICAgICByZXR1cm4gX2RlZmF1bHRcbiAgICB9XG4gICAgbGV0IHNhbXBsZSA9IE9iamVjdC5hc3NpZ24oe30sIF9kZWZhdWx0LCBpbmZvKVxuXG4gICAgcmV0dXJuIHNhbXBsZVxuICB9XG5cbiAgc3RhdGljIGdldERlZmF1bHQgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkdHM6IG51bGwsXG4gICAgICBwdHM6IG51bGwsXG4gICAgICBkYXRhOiBuZXcgVWludDhBcnJheSgpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWaWRlb1RyYWNrU2FtcGxlIHtcbiAgY29uc3RydWN0b3IgKGluZm8pIHtcbiAgICBsZXQgX2RlZmF1bHQgPSBWaWRlb1RyYWNrU2FtcGxlLmdldERlZmF1bHQoKVxuXG4gICAgaWYgKCFpbmZvKSB7XG4gICAgICByZXR1cm4gX2RlZmF1bHRcbiAgICB9XG4gICAgbGV0IHNhbXBsZSA9IE9iamVjdC5hc3NpZ24oe30sIF9kZWZhdWx0LCBpbmZvKVxuXG4gICAgcmV0dXJuIHNhbXBsZVxuICB9XG5cbiAgc3RhdGljIGdldERlZmF1bHQgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkdHM6IG51bGwsXG4gICAgICBwdHM6IG51bGwsXG4gICAgICBpc0tleWZyYW1lOiBmYWxzZSwgLy8gaXMgUmFuZG9tIGFjY2VzcyBwb2ludFxuICAgICAgb3JpZ2luRHRzOiBudWxsLFxuICAgICAgZGF0YTogbmV3IFVpbnQ4QXJyYXkoKVxuICAgIH1cbiAgfVxufVxuIiwiY2xhc3MgTVNFIHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZ3MpIHtcbiAgICB0aGlzLmNvbmZpZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWdzKTtcbiAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMuY29uZmlncy5jb250YWluZXI7XG4gICAgdGhpcy5tZWRpYVNvdXJjZSA9IG51bGw7XG4gICAgdGhpcy5zb3VyY2VCdWZmZXJzID0ge307XG4gICAgdGhpcy5wcmVsb2FkVGltZSA9IHRoaXMuY29uZmlncy5wcmVsb2FkVGltZSB8fCAxO1xuICAgIHRoaXMub25Tb3VyY2VPcGVuID0gdGhpcy5vblNvdXJjZU9wZW4uYmluZCh0aGlzKVxuICAgIHRoaXMub25UaW1lVXBkYXRlID0gdGhpcy5vblRpbWVVcGRhdGUuYmluZCh0aGlzKVxuICAgIHRoaXMub25VcGRhdGVFbmQgPSB0aGlzLm9uVXBkYXRlRW5kLmJpbmQodGhpcylcbiAgICB0aGlzLm9uV2FpdGluZyA9IHRoaXMub25XYWl0aW5nLmJpbmQodGhpcylcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIHRoaXMubWVkaWFTb3VyY2UgPSBuZXcgc2VsZi5NZWRpYVNvdXJjZSgpO1xuICAgIHRoaXMubWVkaWFTb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcignc291cmNlb3BlbicsIHRoaXMub25Tb3VyY2VPcGVuKTtcbiAgICB0aGlzLmNvbnRhaW5lci5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHRoaXMubWVkaWFTb3VyY2UpO1xuICAgIHRoaXMudXJsID0gdGhpcy5jb250YWluZXIuc3JjO1xuICAgIHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RpbWV1cGRhdGUnLCB0aGlzLm9uVGltZVVwZGF0ZSk7XG4gICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignd2FpdGluZycsIHRoaXMub25XYWl0aW5nKTtcbiAgfVxuXG4gIG9uVGltZVVwZGF0ZSAoKSB7XG4gICAgdGhpcy5lbWl0KCdUSU1FX1VQREFURScsIHRoaXMuY29udGFpbmVyKTtcbiAgfVxuXG4gIG9uV2FpdGluZyAoKSB7XG4gICAgdGhpcy5lbWl0KCdXQUlUSU5HJywgdGhpcy5jb250YWluZXIpO1xuICB9XG5cbiAgb25Tb3VyY2VPcGVuICgpIHtcbiAgICB0aGlzLmFkZFNvdXJjZUJ1ZmZlcnMoKTtcbiAgfVxuXG4gIG9uVXBkYXRlRW5kICgpIHtcbiAgICB0aGlzLmVtaXQoJ1NPVVJDRV9VUERBVEVfRU5EJyk7XG4gICAgdGhpcy5kb0FwcGVuZCgpXG4gIH1cbiAgYWRkU291cmNlQnVmZmVycyAoKSB7XG4gICAgaWYgKHRoaXMubWVkaWFTb3VyY2UucmVhZHlTdGF0ZSAhPT0gJ29wZW4nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBzb3VyY2VzID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnUFJFX1NPVVJDRV9CVUZGRVInKTtcbiAgICBsZXQgdHJhY2tzID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJyk7XG4gICAgbGV0IHRyYWNrO1xuXG4gICAgc291cmNlcyA9IHNvdXJjZXMuc291cmNlcztcbiAgICBsZXQgYWRkID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDAsIGsgPSBPYmplY3Qua2V5cyhzb3VyY2VzKS5sZW5ndGg7IGkgPCBrOyBpKyspIHtcbiAgICAgIGxldCB0eXBlID0gT2JqZWN0LmtleXMoc291cmNlcylbaV07XG4gICAgICBpZiAodHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgICB0cmFjayA9IHRyYWNrcy5hdWRpb1RyYWNrO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAndmlkZW8nKSB7XG4gICAgICAgIHRyYWNrID0gdHJhY2tzLnZpZGVvVHJhY2s7XG4gICAgICAgIC8vIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0cmFjaykge1xuICAgICAgICBsZXQgZHVyID0gdHlwZSA9PT0gJ2F1ZGlvJyA/IDIxIDogNDA7XG4gICAgICAgIGlmICh0cmFjay5tZXRhICYmIHRyYWNrLm1ldGEucmVmU2FtcGxlRHVyYXRpb24pIGR1ciA9IHRyYWNrLm1ldGEucmVmU2FtcGxlRHVyYXRpb247XG4gICAgICAgIGlmIChzb3VyY2VzW3R5cGVdLmRhdGEubGVuZ3RoID49ICh0aGlzLnByZWxvYWRUaW1lIC8gZHVyKSkge1xuICAgICAgICAgIGFkZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYWRkKSB7XG4gICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAwLCBrID0gT2JqZWN0LmtleXMoc291cmNlcykubGVuZ3RoOyBpIDwgazsgaSsrKSB7XG4gICAgICAgIGxldCB0eXBlID0gT2JqZWN0LmtleXMoc291cmNlcylbaV07XG4gICAgICAgIGxldCBzb3VyY2UgPSBzb3VyY2VzW3R5cGVdXG4gICAgICAgIGxldCBtaW1lID0gKHR5cGUgPT09ICd2aWRlbycpID8gJ3ZpZGVvL21wNDtjb2RlY3M9JyArIHNvdXJjZS5taW1ldHlwZSA6ICdhdWRpby9tcDQ7Y29kZWNzPScgKyBzb3VyY2UubWltZXR5cGVcbiAgICAgICAgbGV0IHNvdXJjZUJ1ZmZlciA9IHRoaXMubWVkaWFTb3VyY2UuYWRkU291cmNlQnVmZmVyKG1pbWUpO1xuICAgICAgICB0aGlzLnNvdXJjZUJ1ZmZlcnNbdHlwZV0gPSBzb3VyY2VCdWZmZXI7XG4gICAgICAgIHNvdXJjZUJ1ZmZlci5hZGRFdmVudExpc3RlbmVyKCd1cGRhdGVlbmQnLCB0aGlzLm9uVXBkYXRlRW5kKTtcbiAgICAgICAgdGhpcy5kb0FwcGVuZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRvQXBwZW5kICgpIHtcbiAgICBsZXQgc291cmNlcyA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1BSRV9TT1VSQ0VfQlVGRkVSJyk7XG4gICAgaWYgKHNvdXJjZXMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKS5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdHlwZSA9IE9iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycylbaV1cbiAgICAgICAgbGV0IHNvdXJjZUJ1ZmZlciA9IHRoaXMuc291cmNlQnVmZmVyc1t0eXBlXTtcbiAgICAgICAgaWYgKCFzb3VyY2VCdWZmZXIudXBkYXRpbmcpIHtcbiAgICAgICAgICBsZXQgc291cmNlID0gc291cmNlcy5zb3VyY2VzW3R5cGVdO1xuICAgICAgICAgIGlmIChzb3VyY2UgJiYgIXNvdXJjZS5pbml0ZWQpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdhcHBlbmQgaW5pdGlhbCBzZWdtZW50JylcbiAgICAgICAgICAgIHNvdXJjZUJ1ZmZlci5hcHBlbmRCdWZmZXIoc291cmNlLmluaXQuYnVmZmVyLmJ1ZmZlcik7XG4gICAgICAgICAgICBzb3VyY2UuaW5pdGVkID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNvdXJjZSkge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBzb3VyY2UuZGF0YS5zaGlmdCgpXG4gICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICBzb3VyY2VCdWZmZXIuYXBwZW5kQnVmZmVyKGRhdGEuYnVmZmVyLmJ1ZmZlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZW5kT2ZTdHJlYW0gKCkge1xuICAgIGNvbnN0IHsgcmVhZHlTdGF0ZSwgYWN0aXZlU291cmNlQnVmZmVycyB9ID0gdGhpcy5tZWRpYVNvdXJjZTtcbiAgICBpZiAocmVhZHlTdGF0ZSA9PT0gJ29wZW4nICYmIGFjdGl2ZVNvdXJjZUJ1ZmZlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLm1lZGlhU291cmNlLmVuZE9mU3RyZWFtKClcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gbG9nXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlIChlbmQsIHN0YXJ0ID0gMCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKS5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGJ1ZmZlciA9IHRoaXMuc291cmNlQnVmZmVyc1tPYmplY3Qua2V5cyh0aGlzLnNvdXJjZUJ1ZmZlcnMpW2ldXTtcbiAgICAgIGlmICghYnVmZmVyLnVwZGF0aW5nKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHN0YXJ0LCBlbmQpXG4gICAgICAgIGJ1ZmZlci5yZW1vdmUoc3RhcnQsIGVuZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJlbW92ZUJ1ZmZlcnMgKCkge1xuICAgIGNvbnN0IHRhc2tMaXN0ID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE9iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycykubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBidWZmZXIgPSB0aGlzLnNvdXJjZUJ1ZmZlcnNbT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKVtpXV07XG4gICAgICBidWZmZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndXBkYXRlZW5kJywgdGhpcy5vblVwZGF0ZUVuZCk7XG5cbiAgICAgIGxldCB0YXNrO1xuICAgICAgaWYgKGJ1ZmZlci51cGRhdGluZykge1xuICAgICAgICB0YXNrID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICBjb25zdCBkb0NsZWFuQnVmZmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IHJldHJ5VGltZSA9IDNcblxuICAgICAgICAgICAgY29uc3QgY2xlYW4gPSAoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghYnVmZmVyLnVwZGF0aW5nKSB7XG4gICAgICAgICAgICAgICAgTVNFLmNsZWFyQnVmZmVyKGJ1ZmZlcilcbiAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXRyeVRpbWUgPiAwKXtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNsZWFuLCAyMDApXG4gICAgICAgICAgICAgICAgcmV0cnlUaW1lLS1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGNsZWFuLCAyMDApXG4gICAgICAgICAgICBidWZmZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndXBkYXRlZW5kJywgZG9DbGVhbkJ1ZmZlcilcbiAgICAgICAgICB9XG4gICAgICAgICAgYnVmZmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3VwZGF0ZWVuZCcsIGRvQ2xlYW5CdWZmZXIpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBNU0UuY2xlYXJCdWZmZXIoYnVmZmVyKVxuICAgICAgICB0YXNrID0gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgIH1cblxuICAgICAgdGFza0xpc3QucHVzaCh0YXNrKVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLmFsbCh0YXNrTGlzdClcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHJldHVybiB0aGlzLnJlbW92ZUJ1ZmZlcnMoKS50aGVuKCgpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKS5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgYnVmZmVyID0gdGhpcy5zb3VyY2VCdWZmZXJzW09iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycylbaV1dO1xuICAgICAgICB0aGlzLm1lZGlhU291cmNlLnJlbW92ZVNvdXJjZUJ1ZmZlcihidWZmZXIpO1xuICAgICAgICBkZWxldGUgdGhpcy5zb3VyY2VCdWZmZXJzW09iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycylbaV1dO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgdGhpcy5vblRpbWVVcGRhdGUpO1xuICAgICAgdGhpcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2FpdGluZycsIHRoaXMub25XYWl0aW5nKTtcbiAgICAgIHRoaXMubWVkaWFTb3VyY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcignc291cmNlb3BlbicsIHRoaXMub25Tb3VyY2VPcGVuKTtcblxuICAgICAgdGhpcy5lbmRPZlN0cmVhbSgpXG4gICAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTCh0aGlzLnVybCk7XG5cbiAgICAgIHRoaXMudXJsID0gbnVsbFxuICAgICAgdGhpcy5jb25maWdzID0ge307XG4gICAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gICAgICB0aGlzLm1lZGlhU291cmNlID0gbnVsbDtcbiAgICAgIHRoaXMuc291cmNlQnVmZmVycyA9IHt9O1xuICAgICAgdGhpcy5wcmVsb2FkVGltZSA9IDE7XG4gICAgfSlcbiAgfVxuXG4gIHN0YXRpYyBjbGVhckJ1ZmZlciAoYnVmZmVyKSB7XG4gICAgY29uc3QgYnVmZmVyZWQgPSBidWZmZXIuYnVmZmVyZWQ7XG4gICAgbGV0IGJFbmQgPSAwLjFcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYnVmZmVyZWQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGJFbmQgPSBidWZmZXJlZC5lbmQoaSlcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGJ1ZmZlci5yZW1vdmUoMCwgYkVuZClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBETyBOT1RISU5HXG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBNU0U7XG4iLCJpbXBvcnQgQ29uY2F0IGZyb20gJ2NvbmNhdC10eXBlZC1hcnJheSdcblxuY2xhc3MgQnVmZmVyIHtcbiAgY29uc3RydWN0b3IgKGJ1ZmZlcikge1xuICAgIHRoaXMuYnVmZmVyID0gYnVmZmVyIHx8IG5ldyBVaW50OEFycmF5KDApXG4gIH1cblxuICB3cml0ZSAoLi4uYnVmZmVyKSB7XG4gICAgYnVmZmVyLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICB0aGlzLmJ1ZmZlciA9IENvbmNhdChVaW50OEFycmF5LCB0aGlzLmJ1ZmZlciwgaXRlbSlcbiAgICB9KVxuICB9XG5cbiAgc3RhdGljIHdyaXRlVWludDMyICh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgVWludDhBcnJheShbXG4gICAgICB2YWx1ZSA+PiAyNCxcbiAgICAgICh2YWx1ZSA+PiAxNikgJiAweGZmLFxuICAgICAgKHZhbHVlID4+IDgpICYgMHhmZixcbiAgICAgIHZhbHVlICYgMHhmZlxuICAgIF0pXG4gIH1cblxuICBzdGF0aWMgcmVhZEFzSW50IChhcnIpIHtcbiAgICBsZXQgdGVtcCA9ICcnXG5cbiAgICBmdW5jdGlvbiBwYWRTdGFydDRIZXggKGhleE51bSkge1xuICAgICAgbGV0IGhleFN0ciA9IGhleE51bS50b1N0cmluZygxNilcbiAgICAgIHJldHVybiBoZXhTdHIucGFkU3RhcnQoMiwgJzAnKVxuICAgIH1cblxuICAgIGFyci5mb3JFYWNoKG51bSA9PiB7XG4gICAgICB0ZW1wICs9IHBhZFN0YXJ0NEhleChudW0pXG4gICAgfSlcbiAgICByZXR1cm4gcGFyc2VJbnQodGVtcCwgMTYpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQnVmZmVyXG4iLCJjbGFzcyBTdHJlYW0ge1xuICBjb25zdHJ1Y3RvciAoYnVmZmVyKSB7XG4gICAgaWYgKGJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICB0aGlzLmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgIHRoaXMuZGF0YXZpZXcgPSBuZXcgRGF0YVZpZXcoYnVmZmVyKTtcbiAgICAgIHRoaXMuZGF0YXZpZXcucG9zaXRpb24gPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RhdGEgaXMgaW52YWxpZCcpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBsZW5ndGggKCkge1xuICAgIHJldHVybiB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoO1xuICB9XG5cbiAgc2V0IHBvc2l0aW9uICh2YWx1ZSkge1xuICAgIHRoaXMuZGF0YXZpZXcucG9zaXRpb24gPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBwb3NpdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YXZpZXcucG9zaXRpb247XG4gIH1cblxuICBiYWNrIChjb3VudCkge1xuICAgIHRoaXMucG9zaXRpb24gLT0gY291bnQ7XG4gIH1cblxuICBza2lwIChjb3VudCkge1xuICAgIGxldCBsb29wID0gTWF0aC5mbG9vcihjb3VudCAvIDQpO1xuICAgIGxldCBsYXN0ID0gY291bnQgJSA0O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbG9vcDsgaSsrKSB7XG4gICAgICBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgNCk7XG4gICAgfVxuICAgIGlmIChsYXN0ID4gMCkge1xuICAgICAgU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIGxhc3QpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBbcmVhZEJ5dGUg5LuORGF0YVZpZXfkuK3or7vlj5bmlbDmja5dXG4gICAqIEBwYXJhbSAge0RhdGFWaWV3fSBidWZmZXIgW0RhdGFWaWV35a6e5L6LXVxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHNpemUgICBb6K+75Y+W5a2X6IqC5pWwXVxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9ICAgICAgICBb5pW05pWwXVxuICAgKi9cbiAgc3RhdGljIHJlYWRCeXRlIChidWZmZXIsIHNpemUsIHNpZ24pIHtcbiAgICBsZXQgcmVzO1xuICAgIHN3aXRjaCAoc2l6ZSkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICBpZiAoc2lnbikge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRJbnQ4KGJ1ZmZlci5wb3NpdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzID0gYnVmZmVyLmdldFVpbnQ4KGJ1ZmZlci5wb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGlmIChzaWduKSB7XG4gICAgICAgICAgcmVzID0gYnVmZmVyLmdldEludDE2KGJ1ZmZlci5wb3NpdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzID0gYnVmZmVyLmdldFVpbnQxNihidWZmZXIucG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBpZiAoc2lnbikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IHN1cHBvcnRlZCBmb3IgcmVhZEJ5dGUgMycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRVaW50OChidWZmZXIucG9zaXRpb24pIDw8IDE2O1xuICAgICAgICAgIHJlcyB8PSBidWZmZXIuZ2V0VWludDgoYnVmZmVyLnBvc2l0aW9uICsgMSkgPDwgODtcbiAgICAgICAgICByZXMgfD0gYnVmZmVyLmdldFVpbnQ4KGJ1ZmZlci5wb3NpdGlvbiArIDIpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0OlxuICAgICAgICBpZiAoc2lnbikge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRJbnQzMihidWZmZXIucG9zaXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRVaW50MzIoYnVmZmVyLnBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgODpcbiAgICAgICAgaWYgKHNpZ24pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBzdXBwb3J0ZWQgZm9yIHJlYWRCb2R5IDgnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXMgPSBidWZmZXIuZ2V0VWludDMyKGJ1ZmZlci5wb3NpdGlvbikgPDwgMzI7XG4gICAgICAgICAgcmVzIHw9IGJ1ZmZlci5nZXRVaW50MzIoYnVmZmVyLnBvc2l0aW9uICsgNCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXMgPSAnJztcbiAgICB9XG4gICAgYnVmZmVyLnBvc2l0aW9uICs9IHNpemU7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHJlYWRVaW50OCAoKSB7XG4gICAgcmV0dXJuIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCAxKTtcbiAgfVxuXG4gIHJlYWRVaW50MTYgKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgMik7XG4gIH1cblxuICByZWFkVWludDI0ICgpIHtcbiAgICByZXR1cm4gU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIDMpO1xuICB9XG5cbiAgcmVhZFVpbnQzMiAoKSB7XG4gICAgcmV0dXJuIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCA0KTtcbiAgfVxuXG4gIHJlYWRVaW50NjQgKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgOCk7XG4gIH1cblxuICByZWFkSW50OCAoKSB7XG4gICAgcmV0dXJuIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCAxLCB0cnVlKTtcbiAgfVxuICByZWFkSW50MTYgKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgMiwgdHJ1ZSk7XG4gIH1cblxuICByZWFkSW50MzIgKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgNCwgdHJ1ZSk7XG4gIH1cblxuICB3cml0ZVVpbnQzMiAodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgdmFsdWUgPj4+IDI0ICYgMHhmZixcbiAgICAgIHZhbHVlID4+PiAxNiAmIDB4ZmYsXG4gICAgICB2YWx1ZSA+Pj4gOCAmIDB4ZmYsXG4gICAgICB2YWx1ZSAmIDB4ZmZcbiAgICBdKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdHJlYW07XG4iLCJpbXBvcnQgeyBGZXRjaExvYWRlciB9IGZyb20gJ3hncGxheWVyLWxvYWRlcidcbmltcG9ydCB7IEZsdkRlbXV4ZXIgfSBmcm9tICd4Z3BsYXllci1kZW11eCdcbmltcG9ydCB7IE1wNFJlbXV4ZXIgfSBmcm9tICd4Z3BsYXllci1yZW11eCdcbmltcG9ydCB7IFRyYWNrcywgWGdCdWZmZXIsIFByZVNvdXJjZSB9IGZyb20gJ3hncGxheWVyLWJ1ZmZlcidcbmltcG9ydCB7IEVWRU5UUywgTW9iaWxlVmlkZW8gfSBmcm9tICd4Z3BsYXllci11dGlscydcbmltcG9ydCB7IENvbXBhdGliaWxpdHkgfSBmcm9tICd4Z3BsYXllci1jb2RlYydcbmltcG9ydCBQbGF5ZXIgZnJvbSAneGdwbGF5ZXInXG5cbmNvbnN0IERFTVVYX0VWRU5UUyA9IEVWRU5UUy5ERU1VWF9FVkVOVFM7XG5jb25zdCBMT0FERVJfRVZFTlRTID0gRVZFTlRTLkxPQURFUl9FVkVOVFNcbmNvbnN0IFJFTVVYX0VWRU5UUyA9IEVWRU5UUy5SRU1VWF9FVkVOVFNcblxuY29uc3QgVGFnID0gJ0ZMVkNvbnRyb2xsZXInXG5cbmNsYXNzIExvZ2dlciB7XG4gIHdhcm4gKCkge31cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmx2Q29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yIChwbGF5ZXIpIHtcbiAgICB0aGlzLlRBRyA9IFRhZ1xuICAgIHRoaXMuX3BsYXllciA9IHBsYXllclxuXG4gICAgLy8gVE9ETyDkuLTml7bmjILnmoQg6ZyA6KaB5aSE55CG5YiwUGxheWVy5bGCXG4gICAgLy8gdGhpcy52aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21vYmlsZS12aWRlbycpO1xuICAgIHRoaXMuX3BsYXllci52aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ21vYmlsZS12aWRlbycpO1xuICAgIHRoaXMudmlkZW8gPSB0aGlzLl9wbGF5ZXIudmlkZW87XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGluaXRTZWdtZW50QXJyaXZlZDogZmFsc2VcbiAgICB9XG4gIH1cblxuICBpbml0ICgpIHtcbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdGRVRDSF9MT0FERVInLCBGZXRjaExvYWRlcilcbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdMT0FERVJfQlVGRkVSJywgWGdCdWZmZXIpXG4gICAgdGhpcy5fY29udGV4dC5yZWdpc3RyeSgnUFJFX1NPVVJDRV9CVUZGRVInLCBQcmVTb3VyY2UpXG5cbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdGTFZfREVNVVhFUicsIEZsdkRlbXV4ZXIpXG5cbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdNUDRfUkVNVVhFUicsIE1wNFJlbXV4ZXIpXG4gICAgdGhpcy5fY29udGV4dC5yZWdpc3RyeSgnVFJBQ0tTJywgVHJhY2tzKVxuXG4gICAgdGhpcy5fY29udGV4dC5yZWdpc3RyeSgnQ09NUEFUSUJJTElUWScsIENvbXBhdGliaWxpdHkpXG5cbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdMT0dHRVInLCBMb2dnZXIpXG5cbiAgICB0aGlzLmluaXRMaXN0ZW5lcnMoKVxuICB9XG5cbiAgaW5pdExpc3RlbmVycyAoKSB7XG4gICAgdGhpcy5vbihMT0FERVJfRVZFTlRTLkxPQURFUl9EQVRBTE9BREVELCB0aGlzLl9oYW5kbGVMb2FkZXJEYXRhTG9hZGVkLmJpbmQodGhpcykpXG4gICAgdGhpcy5vbihMT0FERVJfRVZFTlRTLkxPQURFUl9FUlJPUiwgdGhpcy5faGFuZGxlTmV0d29ya0Vycm9yLmJpbmQodGhpcykpXG5cbiAgICB0aGlzLm9uKERFTVVYX0VWRU5UUy5NRURJQV9JTkZPLCB0aGlzLl9oYW5kbGVNZWRpYUluZm8uYmluZCh0aGlzKSlcbiAgICB0aGlzLm9uKERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsIHRoaXMuX2hhbmRsZU1ldGFkYXRhUGFyc2VkLmJpbmQodGhpcykpXG4gICAgdGhpcy5vbihERU1VWF9FVkVOVFMuREVNVVhfQ09NUExFVEUsIHRoaXMuX2hhbmRsZURlbXV4Q29tcGxldGUuYmluZCh0aGlzKSlcbiAgICB0aGlzLm9uKERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgdGhpcy5faGFuZGxlRGVtdXhFcnJvci5iaW5kKHRoaXMpKVxuXG4gIH1cblxuICBfaGFuZGxlTWVkaWFJbmZvICgpIHtcbiAgICBpZiAoIXRoaXMuX2NvbnRleHQubWVkaWFJbmZvKSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCBuZXcgRXJyb3IoJ2ZhaWxlZCB0byBnZXQgbWVkaWFpbmZvJykpXG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZUxvYWRlckRhdGFMb2FkZWQgKCkge1xuICAgIHRoaXMuZW1pdFRvKCdGTFZfREVNVVhFUicsIERFTVVYX0VWRU5UUy5ERU1VWF9TVEFSVClcbiAgfVxuXG4gIF9oYW5kbGVNZXRhZGF0YVBhcnNlZCAodHlwZSkge1xuICAgIGlmICh0eXBlID09PSAnYXVkaW8nKSB7XG4gICAgICAvLyDlsIbpn7PpopFtZXRh5L+h5oGv5Lqk57uZYXVkaW9Db250ZXh077yM5LiN6LWwcmVtdXjlsIHoo4VcbiAgICAgIGNvbnN0IHsgYXVkaW9UcmFjayB9ID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJylcbiAgICAgIGlmIChhdWRpb1RyYWNrICYmIGF1ZGlvVHJhY2subWV0YSkge1xuICAgICAgICB0aGlzLl9zZXRNZXRhVG9BdWRpbyhhdWRpb1RyYWNrLm1ldGEpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHsgdmlkZW9UcmFjayB9ID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJylcbiAgICAgIGlmICh2aWRlb1RyYWNrICYmIHZpZGVvVHJhY2subWV0YSkge1xuICAgICAgICB0aGlzLl9zZXRNZXRhVG9WaWRlbyh2aWRlb1RyYWNrLm1ldGEpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZURlbXV4Q29tcGxldGUgKCkge1xuICAgIGlmKHRoaXMuX3BsYXllci52aWRlbykge1xuICAgICAgY29uc3QgeyB2aWRlb1RyYWNrLCBhdWRpb1RyYWNrIH0gPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKTtcbiAgICAgIHRoaXMuX3BsYXllci52aWRlby5vbkRlbXV4Q29tcGxldGUodmlkZW9UcmFjaywgYXVkaW9UcmFjayk7XG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZUFwcGVuZEluaXRTZWdtZW50ICgpIHtcbiAgICB0aGlzLnN0YXRlLmluaXRTZWdtZW50QXJyaXZlZCA9IHRydWVcbiAgLy8gIHRoaXMubXNlLmFkZFNvdXJjZUJ1ZmZlcnMoKVxuICB9XG5cblxuICBfaGFuZGxlTmV0d29ya0Vycm9yICgpIHtcbiAgICB0aGlzLl9wbGF5ZXIuZW1pdCgnZXJyb3InLCBuZXcgUGxheWVyLkVycm9ycygnbmV0d29yaycsIHRoaXMuX3BsYXllci5jb25maWcudXJsKSlcbiAgfVxuXG4gIF9oYW5kbGVEZW11eEVycm9yICgpIHtcbiAgICB0aGlzLl9wbGF5ZXIuZW1pdCgnZXJyb3InLCBuZXcgUGxheWVyLkVycm9ycygncGFyc2UnLCB0aGlzLl9wbGF5ZXIuY29uZmlnLnVybCkpXG4gIH1cblxuIFxuICBfc2V0TWV0YVRvQXVkaW8gKGF1ZGlvTWV0YSkge1xuICAgIGlmICh0aGlzLl9wbGF5ZXIudmlkZW8pIHtcbiAgICAgIHRoaXMuX3BsYXllci52aWRlby5zZXRBdWRpb01ldGEoYXVkaW9NZXRhKTtcbiAgICB9XG4gIH1cblxuICBfc2V0TWV0YVRvVmlkZW8gKHZpZGVvTWV0YSkge1xuICAgIGlmICh0aGlzLl9wbGF5ZXIudmlkZW8pIHtcbiAgICAgIHRoaXMuX3BsYXllci52aWRlby5zZXRWaWRlb01ldGEodmlkZW9NZXRhKTtcbiAgICB9XG4gIH1cblxuICBzZWVrICgpIHtcbiAgICBpZiAoIXRoaXMuc3RhdGUuaW5pdFNlZ21lbnRBcnJpdmVkKSB7XG4gICAgICB0aGlzLmxvYWREYXRhKClcbiAgICB9XG4gIH1cblxuICBsb2FkRGF0YSAoKSB7XG4gICAgdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTEFERVJfU1RBUlQsIHRoaXMuX3BsYXllci5jb25maWcudXJsKVxuICB9XG5cbiAgcGF1c2UgKCkge1xuICAgIGNvbnN0IGxvYWRlciA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ0ZFVENIX0xPQURFUicpXG5cbiAgICBpZiAobG9hZGVyKSB7XG4gICAgICBsb2FkZXIuY2FuY2VsKClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog5L+d6K+B5b2T5YmN5pKt5pS+55qE6KeG6aKR5LulZ29w5Li65Y2V5L2NXG4gICAqIEBwYXJhbSB2aWRlb1RyYWNrXG4gICAqL1xuICBzdGF0aWMgcmVzb2x2ZVZpZGVvR09QICh2aWRlb1RyYWNrKSB7XG4gICAgY29uc3QgeyBzYW1wbGVzIH0gPSB2aWRlb1RyYWNrO1xuICAgIGlmICghc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgZmlyc3RJZnJhbWVJZHggPSBudWxsXG4gICAgbGV0IGxhc3RJZnJhbWVJZHggPSBudWxsXG5cbiAgICBpZiAodmlkZW9UcmFjay50ZW1wU2FtcGxlcyAmJiB2aWRlb1RyYWNrLnRlbXBTYW1wbGVzLmxlbmd0aCkge1xuICAgICAgLy8g5bCG57yT5a2Y5bin5pS+572u5Yiw6Zif5YiX55qE5aS06YOoXG4gICAgICBzYW1wbGVzLnVuc2hpZnQuYXBwbHkoc2FtcGxlcywgdmlkZW9UcmFjay50ZW1wU2FtcGxlcyk7XG4gICAgfVxuXG4gICAgLy8g5a+75om+56ys5LiA5LiqSeW4p1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzYW1wbGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50ID0gc2FtcGxlc1tpXTtcbiAgICAgIGlmIChjdXJyZW50LmlzS2V5ZnJhbWUpIHtcbiAgICAgICAgZmlyc3RJZnJhbWVJZHggPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDlr7vmib7mnIDlkI7kuIDkuKpJ5binXG4gICAgZm9yIChsZXQgaSA9IHNhbXBsZXMubGVuZ3RoIC0gMTsgaSA+IDA7IGkrKykge1xuICAgICAgY29uc3QgY3VycmVudCA9IHNhbXBsZXNbaV1cblxuICAgICAgaWYgKGN1cnJlbnQuaXNLZXlmcmFtZSkge1xuICAgICAgICBsYXN0SWZyYW1lSWR4ID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGZpcnN0SWZyYW1lSWR4ICE9PSAwKSB7XG4gICAgICBzYW1wbGVzLnNwbGljZSgwLCBmaXJzdElmcmFtZUlkeCAtIDEpXG4gICAgfVxuXG4gICAgdmlkZW9UcmFjay5zYW1wbGVzID0gc2FtcGxlcy5zbGljZSgwLCBsYXN0SWZyYW1lSWR4KVxuICAgIGNvbnN0IHJlc3QgPSBzYW1wbGVzLnNsaWNlKGxhc3RJZnJhbWVJZHgpXG4gICAgaWYgKHZpZGVvVHJhY2sudGVtcFNhbXBsZXMpIHtcbiAgICAgIHZpZGVvVHJhY2sudGVtcFNhbXBsZXMucHVzaC5hcHBseSh2aWRlb1RyYWNrLnRlbXBTYW1wbGVzLCByZXN0KVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyDlsIbliankuIvnmoTluKfnvJPlrZjvvIznrYnlvoXkuIDkuKrlrozmlbTnmoRnb3BcbiAgICAgIHZpZGVvVHJhY2sudGVtcFNhbXBsZXMgPSByZXN0XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gJ3hncGxheWVyJ1xuaW1wb3J0IHsgQ29udGV4dCwgRVZFTlRTIH0gZnJvbSAneGdwbGF5ZXItdXRpbHMnO1xuaW1wb3J0IEZMViBmcm9tICcuL2Zsdi1saXZlLW1vYmlsZSdcbmNvbnN0IGZsdkFsbG93ZWRFdmVudHMgPSBFVkVOVFMuRmx2QWxsb3dlZEV2ZW50cztcblxuY2xhc3MgRmx2UGxheWVyIGV4dGVuZHMgUGxheWVyIHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZykge1xuICAgIHN1cGVyKGNvbmZpZylcbiAgICB0aGlzLmNvbnRleHQgPSBuZXcgQ29udGV4dChmbHZBbGxvd2VkRXZlbnRzKVxuICAgIHRoaXMuaW5pdEV2ZW50cygpXG4gIH1cblxuICBzdGFydCAoKSB7XG4gICAgdGhpcy5pbml0Rmx2KClcbiAgICB0aGlzLmNvbnRleHQuaW5pdCgpXG4gICAgdGhpcy5mbHYuc2VlaygwKTtcbiAgICBzdXBlci5zdGFydCh0aGlzLmNvbmZpZy51cmwpO1xuICAgIHRoaXMucGxheSgpO1xuICB9XG5cbiAgaW5pdEZsdkV2ZW50cyAoZmx2KSB7XG4gICAgY29uc3QgcGxheWVyID0gdGhpcztcbiAgICBmbHYub25jZShFVkVOVFMuUkVNVVhfRVZFTlRTLklOSVRfU0VHTUVOVCwgKCkgPT4ge1xuICAgICAgUGxheWVyLnV0aWwuYWRkQ2xhc3MocGxheWVyLnJvb3QsICd4Z3BsYXllci1pcy1saXZlJylcbiAgICAgIGlmICghUGxheWVyLnV0aWwuZmluZERvbSh0aGlzLnJvb3QsICd4Zy1saXZlJykpIHtcbiAgICAgICAgY29uc3QgbGl2ZSA9IFBsYXllci51dGlsLmNyZWF0ZURvbSgneGctbGl2ZScsICfmraPlnKjnm7Tmkq0nLCB7fSwgJ3hncGxheWVyLWxpdmUnKVxuICAgICAgICBwbGF5ZXIuY29udHJvbHMuYXBwZW5kQ2hpbGQobGl2ZSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgZmx2Lm9uY2UoRVZFTlRTLkxPQURFUl9FVkVOVFMuTE9BREVSX0NPTVBMRVRFLCAoKSA9PiB7XG4gICAgICAvLyDnm7Tmkq3lrozmiJDvvIzlvoXmkq3mlL7lmajmkq3lroznvJPlrZjlkI7lj5HpgIHlhbPpl63kuovku7ZcbiAgICAgIGlmICghcGxheWVyLnBhdXNlZCkge1xuICAgICAgICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICBjb25zdCBlbmQgPSBwbGF5ZXIuZ2V0QnVmZmVyZWRSYW5nZSgpWzFdXG4gICAgICAgICAgaWYgKE1hdGguYWJzKHBsYXllci5jdXJyZW50VGltZSAtIGVuZCkgPCAwLjUpIHtcbiAgICAgICAgICAgIHBsYXllci5lbWl0KCdlbmRlZCcpXG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aW1lcilcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDIwMClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgaW5pdEV2ZW50cyAoKSB7XG4gICAgdGhpcy5vbigndGltZXVwZGF0ZScsICgpID0+IHtcbiAgICAgIHRoaXMubG9hZERhdGEoKVxuICAgIH0pXG5cbiAgICB0aGlzLm9uKCdzZWVraW5nJywgKCkgPT4ge1xuICAgICAgY29uc3QgdGltZSA9IHRoaXMuY3VycmVudFRpbWVcbiAgICAgIGNvbnN0IHJhbmdlID0gdGhpcy5nZXRCdWZmZXJlZFJhbmdlKClcbiAgICAgIGlmICh0aW1lID4gcmFuZ2VbMV0gfHwgdGltZSA8IHJhbmdlWzBdKSB7XG4gICAgICAgIHRoaXMuZmx2LnNlZWsodGhpcy5jdXJyZW50VGltZSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgaW5pdEZsdiAoKSB7XG4gICAgY29uc3QgZmx2ID0gdGhpcy5jb250ZXh0LnJlZ2lzdHJ5KCdGTFZfQ09OVFJPTExFUicsIEZMVikodGhpcylcbiAgICB0aGlzLmluaXRGbHZFdmVudHMoZmx2KVxuICAgIHRoaXMuZmx2ID0gZmx2XG4gIH1cblxuICBwbGF5ICgpIHtcbiAgICBjb25zb2xlLmxvZygncGxheScpO1xuICAgIGlmICh0aGlzLl9oYXNTdGFydCkge1xuICAgICAgdGhpcy5fZGVzdHJveSgpXG4gICAgICB0aGlzLmNvbnRleHQgPSBuZXcgQ29udGV4dChmbHZBbGxvd2VkRXZlbnRzKVxuICAgICAgY29uc3QgZmx2ID0gdGhpcy5jb250ZXh0LnJlZ2lzdHJ5KCdGTFZfQ09OVFJPTExFUicsIEZMVikodGhpcylcbiAgICAgIHRoaXMuaW5pdEZsdkV2ZW50cyhmbHYpXG4gICAgICB0aGlzLmZsdiA9IGZsdlxuICAgICAgdGhpcy5jb250ZXh0LmluaXQoKVxuICAgICAgc3VwZXIuc3RhcnQoZmx2Lm1zZS51cmwpXG4gICAgICBzdXBlci5wbGF5KClcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIucGxheSgpXG4gICAgfVxuICB9XG5cbiAgcGF1c2UgKCkge1xuICAgIHN1cGVyLnBhdXNlKClcbiAgICBpZiAodGhpcy5mbHYpIHtcbiAgICAgIHRoaXMuZmx2LnBhdXNlKClcbiAgICB9XG4gIH1cblxuICBsb2FkRGF0YSAodGltZSA9IHRoaXMuY3VycmVudFRpbWUpIHtcbiAgICBpZiAodGhpcy5mbHYpIHtcbiAgICAgIHRoaXMuZmx2LnNlZWsodGltZSlcbiAgICB9XG4gIH1cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5fZGVzdHJveSgpXG4gICAgc3VwZXIuZGVzdHJveSgpO1xuICB9XG5cbiAgX2Rlc3Ryb3kgKCkge1xuICAgIHRoaXMuY29udGV4dC5kZXN0cm95KClcbiAgICB0aGlzLmZsdiA9IG51bGxcbiAgICB0aGlzLmNvbnRleHQgPSBudWxsXG4gIH1cblxuICBnZXQgc3JjICgpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50U3JjXG4gIH1cblxuICBzZXQgc3JjICh1cmwpIHtcbiAgICB0aGlzLnBsYXllci5jb25maWcudXJsID0gdXJsXG4gICAgaWYgKCF0aGlzLnBhdXNlZCkge1xuICAgICAgdGhpcy5wYXVzZSgpXG4gICAgICB0aGlzLm9uY2UoJ3BhdXNlJywgKCkgPT4ge1xuICAgICAgICB0aGlzLnN0YXJ0KHVybClcbiAgICAgIH0pXG4gICAgICB0aGlzLm9uY2UoJ2NhbnBsYXknLCAoKSA9PiB7XG4gICAgICAgIHRoaXMucGxheSgpXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXJ0KHVybClcbiAgICB9XG4gICAgdGhpcy5vbmNlKCdjYW5wbGF5JywgKCkgPT4ge1xuICAgICAgdGhpcy5jdXJyZW50VGltZSA9IDBcbiAgICB9KVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRmx2UGxheWVyXG4iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gd2luZG93W1wiUGxheWVyXCJdOyB9KCkpOyJdLCJzb3VyY2VSb290IjoiIn0=