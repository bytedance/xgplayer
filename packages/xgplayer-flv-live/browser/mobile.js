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
  PageVisibility: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module './src/env/PageVisibility'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())).default,

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
/***/ (function(module, exports) {

throw new Error("Module build failed (from /Users/jiangyuqing/Desktop/Projects/devspace/xgplayer/node_modules/babel-loader/lib/index.js):\nSyntaxError: Unexpected token (60:0)\n\n\u001b[0m \u001b[90m 58 | \u001b[39m    let _this \u001b[33m=\u001b[39m \u001b[36mthis\u001b[39m\u001b[33m;\u001b[39m\n \u001b[90m 59 | \u001b[39m    let sample \u001b[33m=\u001b[39m data\u001b[33m.\u001b[39mshift()\u001b[33m;\u001b[39m\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 60 | \u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<\u001b[39m \u001b[33mHEAD\u001b[39m\n \u001b[90m    | \u001b[39m\u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 61 | \u001b[39m    let sampleCount \u001b[33m=\u001b[39m \u001b[35m0\u001b[39m\u001b[33m;\u001b[39m\n \u001b[90m 62 | \u001b[39m    \n \u001b[90m 63 | \u001b[39m    \u001b[36mwhile\u001b[39m (sample \u001b[33m&&\u001b[39m sampleCount \u001b[33m<\u001b[39m \u001b[35m40\u001b[39m) {\u001b[0m\n");

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
      this.vCtx.currentTime = this.vCtx.currentTime + Math.abs(gap);
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
  constructor(config) {
    super();
    this._canvas = document.createElement('canvas');
    this.handleAudioSourceEnd = this.handleAudioSourceEnd.bind(this);
    this.init(config);
    this.played = false;
    this._paused = true;
  }

  init(config) {
    this.vCtx = new _videoContext2.default({
      canvas: this._canvas
    });
    this.aCtx = new _audioContext2.default(config);
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

    this.ticker.start(() => {
      if (!this.start) {
        this.start = Date.now();
      }
      this._currentTime = Date.now() - this.start;
      this.vCtx._onTimer(this._currentTime);
    });

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
  }

  setVideoMeta(meta) {
    this.vCtx.setVideoMetaData(meta);
  }

  get width() {
    return this.vCtx.width;
  }

  get height() {
    return this.vCtx.height;
  }

  get videoWidth() {
    return this.vCtx.videoWidth;
  }

  get videoHeight() {
    return this.vCtx.videoHeight;
  }

  get src() {
    return this.getAttribute('src');
  }

  set src(val) {
    // do nothing
  }

  get readyState() {
    return this.vCtx.readyState;
  }

  get seeking() {
    return this.vCtx.seeking;
  }

  get currentTime() {
    return this.aCtx.currentTime;
  }

  get duration() {
    return this.aCtx.duration;
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
    return this.aCtx.ended;
  }

  get autoplay() {
    if (this.hasAttribute('autoplay')) {
      return this.getAttribute('autoplay');
    } else {
      return false;
    }
  }

  play() {
    if (this.played) {
      this.destroy();
      this.init();
    }

    this.aCtx.play();
    this.vCtx.play().then(() => {
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
    if (this.getAttribute('muted')) {
      return this.getAttribute('muted');
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
    return this.vCtx.error;
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

  tick(timestamp) {
    this.onTick();
    this.nextTick();
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

var _TimeRanges = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module '../models/TimeRanges'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

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
  }

  play() {
    this.paused = false;
    return new Promise(resolve => {
      this.playFinish = resolve;
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
          if (this.oncanplay && this.readyStatus < 4) {
            this.oncanplay();
            this.readyStatus = 4;
          }
          this.yuvCanvas.render(frame.buffer, frame.width, frame.height, frame.yLinesize, frame.uvLinesize);

          if (this.playFinish) {
            this.playFinish();
          }
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
      } else {
        this.play();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9GbHZQbGF5ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy9Vc2Vycy9qaWFuZ3l1cWluZy9EZXNrdG9wL1Byb2plY3RzL2RldnNwYWNlL3hncGxheWVyL25vZGVfbW9kdWxlcy9ldmVudHMvZXZlbnRzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWJ1ZmZlci9zcmMvYnVmZmVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1idWZmZXIvc3JjL3ByZXNvdWNlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1idWZmZXIvc3JjL3RyYWNrLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1jb2RlYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItY29kZWMvc3JjL2FhYy9hYWMtaGVscGVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1jb2RlYy9zcmMvY29tcGF0aWJpbGl0eS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItY29kZWMvc3JjL2gyNjQvbmFsdW5pdC9nb2xvbWIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWNvZGVjL3NyYy9oMjY0L25hbHVuaXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWNvZGVjL3NyYy9oMjY0L25hbHVuaXQvc3BzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1kZW11eC9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItZGVtdXgvc3JjL2Zsdi9hbWYtcGFyc2VyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1kZW11eC9zcmMvZmx2L2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1kZW11eC9zcmMvaGxzL2RlbXV4ZXIvbTN1OHBhcnNlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItZGVtdXgvc3JjL2hscy9kZW11eGVyL3RzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1kZW11eC9zcmMvaGxzL3BsYXlsaXN0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1sb2FkZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWxvYWRlci9zcmMvZmV0Y2gtbG9hZGVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1yZW11eC9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItcmVtdXgvc3JjL21wNC9mbXA0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1yZW11eC9zcmMvbXA0L2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvbm9kZV9tb2R1bGVzL2NvbmNhdC10eXBlZC1hcnJheS9saWIvY29uY2F0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9ub2RlX21vZHVsZXMvY29uY2F0LXR5cGVkLWFycmF5L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvbm9kZV9tb2R1bGVzL3dlYndvcmtpZnktd2VicGFjay9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL2NvbnN0YW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9jb25zdGFudHMvd29ya2VyLWNvbW1hbmRzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvY29udGV4dC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL2NyeXB0by9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL2Vudi9pc2xlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvZW52L3NuaWZmZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9lbnYvdXRmOC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vYmlsZS9tb2JpbGUtdmlkZW8uanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2JpbGUvc291cmNlYnVmZmVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9iaWxlL3RpY2tlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vYmlsZS92aWRlby1jb250ZXh0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9iaWxlL3dvcmtlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vYmlsZS95dXYtY2FudmFzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9kZWxzL21lZGlhLWluZm8uanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2RlbHMvbWVkaWEtc2FtcGxlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9kZWxzL21lZGlhLXNlZ21lbnQtbGlzdC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vZGVscy9tZWRpYS1zZWdtZW50LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9kZWxzL3RyYWNrLW1ldGEuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2RlbHMvdHJhY2stc2FtcGxlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbXNlL2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvd3JpdGUvYnVmZmVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvd3JpdGUvc3RyZWFtLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy9mbHYtbGl2ZS1tb2JpbGUuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL21vYmlsZS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvZXh0ZXJuYWwgXCJQbGF5ZXJcIiJdLCJuYW1lcyI6WyJSIiwiUmVmbGVjdCIsIlJlZmxlY3RBcHBseSIsImFwcGx5IiwidGFyZ2V0IiwicmVjZWl2ZXIiLCJhcmdzIiwiRnVuY3Rpb24iLCJwcm90b3R5cGUiLCJjYWxsIiwiUmVmbGVjdE93bktleXMiLCJvd25LZXlzIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImNvbmNhdCIsIlByb2Nlc3NFbWl0V2FybmluZyIsIndhcm5pbmciLCJjb25zb2xlIiwid2FybiIsIk51bWJlcklzTmFOIiwiTnVtYmVyIiwiaXNOYU4iLCJ2YWx1ZSIsIkV2ZW50RW1pdHRlciIsImluaXQiLCJtb2R1bGUiLCJleHBvcnRzIiwiX2V2ZW50cyIsInVuZGVmaW5lZCIsIl9ldmVudHNDb3VudCIsIl9tYXhMaXN0ZW5lcnMiLCJkZWZhdWx0TWF4TGlzdGVuZXJzIiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0Iiwic2V0IiwiYXJnIiwiUmFuZ2VFcnJvciIsImdldFByb3RvdHlwZU9mIiwiY3JlYXRlIiwic2V0TWF4TGlzdGVuZXJzIiwibiIsIiRnZXRNYXhMaXN0ZW5lcnMiLCJ0aGF0IiwiZ2V0TWF4TGlzdGVuZXJzIiwiZW1pdCIsInR5cGUiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwicHVzaCIsImRvRXJyb3IiLCJldmVudHMiLCJlcnJvciIsImVyIiwiRXJyb3IiLCJlcnIiLCJtZXNzYWdlIiwiY29udGV4dCIsImhhbmRsZXIiLCJsZW4iLCJsaXN0ZW5lcnMiLCJhcnJheUNsb25lIiwiX2FkZExpc3RlbmVyIiwibGlzdGVuZXIiLCJwcmVwZW5kIiwibSIsImV4aXN0aW5nIiwiVHlwZUVycm9yIiwibmV3TGlzdGVuZXIiLCJ1bnNoaWZ0Iiwid2FybmVkIiwidyIsIlN0cmluZyIsIm5hbWUiLCJlbWl0dGVyIiwiY291bnQiLCJhZGRMaXN0ZW5lciIsIm9uIiwicHJlcGVuZExpc3RlbmVyIiwib25jZVdyYXBwZXIiLCJmaXJlZCIsInJlbW92ZUxpc3RlbmVyIiwid3JhcEZuIiwiX29uY2VXcmFwIiwic3RhdGUiLCJ3cmFwcGVkIiwiYmluZCIsIm9uY2UiLCJwcmVwZW5kT25jZUxpc3RlbmVyIiwibGlzdCIsInBvc2l0aW9uIiwib3JpZ2luYWxMaXN0ZW5lciIsInNoaWZ0Iiwic3BsaWNlT25lIiwib2ZmIiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwia2V5cyIsImtleSIsIl9saXN0ZW5lcnMiLCJ1bndyYXAiLCJldmxpc3RlbmVyIiwidW53cmFwTGlzdGVuZXJzIiwicmF3TGlzdGVuZXJzIiwibGlzdGVuZXJDb3VudCIsImV2ZW50TmFtZXMiLCJhcnIiLCJjb3B5IiwiQXJyYXkiLCJpbmRleCIsInBvcCIsInJldCIsIlRyYWNrIiwicmVxdWlyZSIsImRlZmF1bHQiLCJUcmFja3MiLCJBdWRpb1RyYWNrIiwiVmlkZW9UcmFjayIsIlhnQnVmZmVyIiwiUmVtdXhCdWZmZXIiLCJQcmVTb3VyY2UiLCJjb25zdHJ1Y3RvciIsImhpc3RvcnlMZW4iLCJhcnJheSIsIm9mZnNldCIsImRhdGEiLCJieXRlTGVuZ3RoIiwiVWludDhBcnJheSIsIl9zaGlmdEJ1ZmZlciIsInNsaWNlIiwidG1wb2ZmIiwidG1wIiwidGVtcGxlbmd0aCIsImNsZWFyIiwiZGVzdHJveSIsInRvSW50Iiwic3RhcnQiLCJyZXRJbnQiLCJ2aWRlbyIsImF1ZGlvIiwiU291cmNlIiwibWltZXR5cGUiLCJzb3VyY2VzIiwiZ2V0U291cmNlIiwic291cmNlIiwiY3JlYXRlU291cmNlIiwiaWQiLCJzZXF1ZW5jZU51bWJlciIsInNhbXBsZXMiLCJkcm9wcGVkU2FtcGxlcyIsInJlc2V0IiwiZGlzdHJveSIsIlRBRyIsImRyb3BwZWQiLCJhdWRpb1RyYWNrIiwidmlkZW9UcmFjayIsIk5hbHVuaXQiLCJTcHNQYXJzZXIiLCJDb21wYXRpYmlsaXR5IiwiQUFDIiwiZ2V0U2lsZW50RnJhbWUiLCJjb2RlYyIsImNoYW5uZWxDb3VudCIsIlJFTVVYX0VWRU5UUyIsIkRFTVVYX0VWRU5UUyIsIkVWRU5UUyIsIm5leHRBdWRpb0R0cyIsIm5leHRWaWRlb0R0cyIsImxhc3RBdWRpb1NhbXBsZXNMZW4iLCJsYXN0VmlkZW9TYW1wbGVzTGVuIiwibGFzdFZpZGVvRHRzIiwibGFzdEF1ZGlvRHRzIiwiYWxsQXVkaW9TYW1wbGVzQ291bnQiLCJhbGxWaWRlb1NhbXBsZXNDb3VudCIsIl9maXJzdEF1ZGlvU2FtcGxlIiwiX2ZpcnN0VmlkZW9TYW1wbGUiLCJmaWxsZWRBdWRpb1NhbXBsZXMiLCJmaWxsZWRWaWRlb1NhbXBsZXMiLCJfdmlkZW9MYXJnZUdhcCIsIl9hdWRpb0xhcmdlR2FwIiwiYmVmb3JlIiwiUkVNVVhfTUVESUEiLCJkb0ZpeCIsImlzRmlyc3RBdWRpb1NhbXBsZXMiLCJpc0ZpcnN0VmlkZW9TYW1wbGVzIiwiZ2V0Rmlyc3RTYW1wbGUiLCJyZWNvcmRTYW1wbGVzQ291bnQiLCJmaXhSZWZTYW1wbGVEdXJhdGlvbiIsIm1ldGEiLCJjaGFuZ2VkIiwidmlkZW9DaGFuZ2VkIiwiY2hhbmdlZElkeCIsInZpZGVvQ2hhbmdlZElkeCIsImRldGFjdENoYW5nZVN0cmVhbSIsImZpeENoYW5nZVN0cmVhbVZpZGVvIiwiZG9GaXhWaWRlbyIsImF1ZGlvQ2hhbmdlZCIsImF1ZGlvQ2hhbmdlZElkeCIsImZpeENoYW5nZVN0cmVhbUF1ZGlvIiwiZG9GaXhBdWRpbyIsImZpcnN0Iiwic3RyZWFtQ2hhbmdlU3RhcnQiLCJ2aWRlb1NhbXBsZXMiLCJmcmFtZVJhdGUiLCJmaXhlZCIsImZpcnN0U2FtcGxlIiwic2FtcGxlc0xlbiIsImRvRml4TGFyZ2VHYXAiLCJkdHMiLCJkZXRlY3RMYXJnZUdhcCIsImZpcnN0RHRzIiwidmlkZW9GaXJzdER0cyIsImF1ZGlvRmlyc3REdHMiLCJnYXAiLCJyZWZTYW1wbGVEdXJhdGlvbiIsImZpbGxDb3VudCIsIk1hdGgiLCJmbG9vciIsImNsb25lZEZpcnN0U2FtcGxlIiwiYXNzaWduIiwicHRzIiwiY3RzIiwic2l6ZSIsImFic0dhcCIsImFicyIsImZpbGxGcmFtZUNvdW50IiwiY2xvbmVkU2FtcGxlIiwiY29tcHV0ZWQiLCJvcmlnaW5EdHMiLCJsYXN0RHRzIiwibGFzdFNhbXBsZUR1cmF0aW9uIiwiY3VycmVudCIsIm5leHQiLCJkdXJhdGlvbiIsImZpbGxGcmFtZUlkeCIsImZpbGxGcmFtZSIsInNwbGljZSIsImF1ZGlvU2FtcGxlcyIsInNpbGVudEZyYW1lIiwiX2ZpcnN0U2FtcGxlIiwidmlkZW9GaXJzdFB0cyIsInNpbGVudFNhbXBsZUNvdW50Iiwic2lsZW50U2FtcGxlIiwiZGF0YXNpemUiLCJmaWx0ZXJlZCIsInJlZlNhbXBsZUR1cmF0aW9uRml4ZWQiLCJzaWxlbnRGcmFtZUNvdW50Iiwic29ydEF1ZGlvU2FtcGxlcyIsImNoYW5nZUlkeCIsInByZXZEdHMiLCJnZXRTdHJlYW1DaGFuZ2VTdGFydCIsImN1ckR0cyIsImlzQ29udGludWUiLCJvcHRpb25zIiwiZmlyc3RQYXJ0U2FtcGxlcyIsInNlY29uZFBhcnRTYW1wbGVzIiwiY2hhbmdlU2FtcGxlIiwiZmlyc3RQYXJ0RHVyYXRpb24iLCJmaW5kRmlyc3RWaWRlb1NhbXBsZSIsImZpbmRGaXJzdEF1ZGlvU2FtcGxlIiwiaXNWaWRlbyIsImFsbFNhbXBsZXNDb3VudCIsImZpbGxlZFNhbXBsZXNDb3VudCIsImR1cmF0aW9uQXZnIiwicmVtb3ZlSW52YWxpZFNhbXBsZXMiLCJmaWx0ZXIiLCJzYW1wbGUiLCJkdHNCYXNlIiwiSW5maW5pdHkiLCJzb3J0IiwiYSIsImIiLCJzb3J0ZWQiLCJpc0tleWZyYW1lIiwibmV4dER0cyIsImNvbmQxIiwiY29uZDIiLCJkaXNjb250aW51ZSIsInRyYWNrcyIsIl9jb250ZXh0IiwiZ2V0SW5zdGFuY2UiLCJyZW11eGVyIiwiX2R0c0Jhc2UiLCJHb2xvbWIiLCJ1aW50OGFycmF5IiwiX2J1ZmZlciIsIl9idWZmZXJJbmRleCIsIl90b3RhbEJ5dGVzIiwiX3RvdGFsQml0cyIsIl9jdXJyZW50V29yZCIsIl9jdXJyZW50V29yZEJpdHNMZWZ0IiwiX2ZpbGxDdXJyZW50V29yZCIsImJ1ZmZlckJ5dGVzTGVmdCIsImJ5dGVzUmVhZCIsIm1pbiIsIndvcmQiLCJzdWJhcnJheSIsIkRhdGFWaWV3IiwiYnVmZmVyIiwiZ2V0VWludDMyIiwicmVhZEJpdHMiLCJiaXRzIiwidmFsdSIsInJlYWRCb29sIiwicmVhZEJ5dGUiLCJfc2tpcExlYWRpbmdaZXJvIiwiemVyb0NvdW50IiwicmVhZFVFRyIsImxlYWRpbmdaZXJvcyIsInJlYWRTRUciLCJnZXROYWx1bml0cyIsImJ1ZiIsImRhdGF2aWV3IiwiZ2V0SW50MzIiLCJnZXRJbnQxNiIsImdldEludDgiLCJnZXRBbm5leGJOYWxzIiwiZ2V0QXZjY05hbHMiLCJuYWxzIiwiZ2V0SGVhZGVyUG9zaXRpb25Bbm5leEIiLCJwb3MiLCJlbmQiLCJoZWFkZXIiLCJoZWFkZXJMZW5ndGgiLCJza2lwIiwiYm9keSIsInVuaXQiLCJhbmFseXNlTmFsIiwibmRyIiwiaWRyIiwic3BzIiwicGFyc2VTUFMiLCJwcHMiLCJnZXRBdmNjIiwiU1BTUGFyc2VyIiwiX2Vic3AycmJzcCIsInNyYyIsInNyY0xlbmd0aCIsImRzdCIsImRzdElkeCIsInJic3AiLCJnYiIsInByb2ZpbGVJZGMiLCJsZXZlbElkYyIsInByb2ZpbGVfc3RyaW5nIiwiZ2V0UHJvZmlsZVN0cmluZyIsImxldmVsX3N0cmluZyIsImdldExldmVsU3RyaW5nIiwiY2hyb21hX2Zvcm1hdF9pZGMiLCJjaHJvbWFfZm9ybWF0IiwiY2hyb21hX2Zvcm1hdF90YWJsZSIsImJpdF9kZXB0aCIsInNjYWxpbmdfbGlzdF9jb3VudCIsIl9za2lwU2NhbGluZ0xpc3QiLCJwaWNfb3JkZXJfY250X3R5cGUiLCJudW1fcmVmX2ZyYW1lc19pbl9waWNfb3JkZXJfY250X2N5Y2xlIiwicGljX3dpZHRoX2luX21ic19taW51czEiLCJwaWNfaGVpZ2h0X2luX21hcF91bml0c19taW51czEiLCJmcmFtZV9tYnNfb25seV9mbGFnIiwiZnJhbWVfY3JvcF9sZWZ0X29mZnNldCIsImZyYW1lX2Nyb3BfcmlnaHRfb2Zmc2V0IiwiZnJhbWVfY3JvcF90b3Bfb2Zmc2V0IiwiZnJhbWVfY3JvcF9ib3R0b21fb2Zmc2V0IiwiZnJhbWVfY3JvcHBpbmdfZmxhZyIsInBhcl93aWR0aCIsInBhcl9oZWlnaHQiLCJmcHMiLCJmcHNfZml4ZWQiLCJmcHNfbnVtIiwiZnBzX2RlbiIsInZ1aV9wYXJhbWV0ZXJzX3ByZXNlbnRfZmxhZyIsImFzcGVjdF9yYXRpb19pZGMiLCJwYXJfd190YWJsZSIsInBhcl9oX3RhYmxlIiwibnVtX3VuaXRzX2luX3RpY2siLCJ0aW1lX3NjYWxlIiwicGFyU2NhbGUiLCJjcm9wX3VuaXRfeCIsImNyb3BfdW5pdF95Iiwic3ViX3djIiwic3ViX2hjIiwiY29kZWNfd2lkdGgiLCJjb2RlY19oZWlnaHQiLCJwcmVzZW50X3dpZHRoIiwiY2VpbCIsImNocm9tYV9mb3JtYXRfc3RyaW5nIiwiZ2V0Q2hyb21hRm9ybWF0U3RyaW5nIiwiZnJhbWVfcmF0ZSIsInBhcl9yYXRpbyIsIndpZHRoIiwiaGVpZ2h0IiwiY29kZWNfc2l6ZSIsInByZXNlbnRfc2l6ZSIsImxhc3Rfc2NhbGUiLCJuZXh0X3NjYWxlIiwiZGVsdGFfc2NhbGUiLCJ0b0ZpeGVkIiwiY2hyb21hIiwidG9WaWRlb01ldGEiLCJzcHNDb25maWciLCJjb2RlY1dpZHRoIiwiY29kZWNIZWlnaHQiLCJwcmVzZW50V2lkdGgiLCJwcmVzZW50SGVpZ2h0IiwicHJvZmlsZSIsImxldmVsIiwiYml0RGVwdGgiLCJjaHJvbWFGb3JtYXQiLCJwYXJSYXRpbyIsImZwc0RlbiIsImZwc051bSIsInRpbWVzY2FsZSIsIk0zVThQYXJzZXIiLCJUc0RlbXV4ZXIiLCJQbGF5bGlzdCIsIkZsdkRlbXV4ZXIiLCJEQVRBX1RZUEVTIiwiTlVNQkVSIiwiQk9PTEVBTiIsIlNUUklORyIsIk9CSkVDVCIsIk1JWF9BUlJBWSIsIk9CSkVDVF9FTkQiLCJTVFJJQ1RfQVJSQVkiLCJEQVRFIiwiTE9ORV9TVFJJTkciLCJBTUZQYXJzZXIiLCJyZWFkT2Zmc2V0IiwicmVzb2x2ZSIsIm1ldGFEYXRhIiwicGFyc2VWYWx1ZSIsImJvZHlTaXplIiwicmVzZXRTdGF0dXMiLCJwYXJzZVN0cmluZyIsImR2Iiwic3RyTGVuIiwiZ2V0VWludDE2IiwiaXNMZSIsInN0ciIsIlVURjgiLCJkZWNvZGUiLCJwYXJzZURhdGUiLCJ0cyIsImdldEZsb2F0NjQiLCJ0aW1lT2Zmc2V0IiwiRGF0ZSIsInBhcnNlT2JqZWN0IiwiaXNPYmpFbmQiLCJwYXJzZUxvbmdTdHJpbmciLCJBcnJheUJ1ZmZlciIsImRhdGFWaWV3IiwiZ2V0VWludDgiLCJib29sTnVtIiwib2JqRW5kU2l6ZSIsImFtZk9iaiIsImlzT2JqZWN0RW5kIiwibWFyayIsImFtZlZhciIsIm1hcmtlciIsImFyckxlbmd0aCIsInNjcmlwdCIsImRhdGUiLCJsb25nU3RyIiwiX2ZpcnN0RnJhZ21lbnRMb2FkZWQiLCJfdHJhY2tOdW0iLCJfaGFzU2NyaXB0IiwiREVNVVhfU1RBUlQiLCJkb1BhcnNlRmx2IiwiaXNGbHZGaWxlIiwiZ2V0UGxheVR5cGUiLCJzdHJlYW1GbGFnIiwicmVzdWx0IiwiaGFzVmlkZW8iLCJoYXNBdWRpbyIsImxvYWRlckJ1ZmZlciIsInBhcnNlRmx2SGVhZGVyIiwiY2h1bmsiLCJsb29wTWF4IiwiX3BhcnNlRmx2VGFnIiwiREVNVVhfQ09NUExFVEUiLCJERU1VWF9FUlJPUiIsInBsYXlUeXBlIiwiaW5pdFZpZGVvVHJhY2siLCJpbml0QXVkaW9UcmFjayIsIlZpZGVvVHJhY2tNZXRhIiwiQXVkaW9UcmFja01ldGEiLCJfcGFyc2VGbHZUYWdIZWFkZXIiLCJfcHJvY2Vzc0NodW5rIiwidGFnVHlwZSIsInRpbWVzdGFtcCIsInRpbWVzdGFtcEV4dCIsIl9wYXJzZVNjcmlwdERhdGEiLCJfcGFyc2VBQUNEYXRhIiwiX3BhcnNlSGV2Y0RhdGEiLCJpbmZvIiwib25NZXRhRGF0YSIsIm1lZGlhSW5mbyIsImhzYUF1ZGlvIiwidmFsaWRhdGUiLCJfZGF0YXNpemVWYWxpZGF0b3IiLCJNRURJQV9JTkZPIiwiaGFzU3BlY2lmaWNDb25maWciLCJhdWRpb3NhbXBsZXJhdGUiLCJzYW1wbGVSYXRlIiwiYXVkaW9jaGFubmVscyIsInNhbXBsZVJhdGVJbmRleCIsImZyYW1lcmF0ZSIsIl9hYWNTZXF1ZW5jZUhlYWRlclBhcnNlciIsIm9iamVjdFR5cGUiLCJvcmlnaW5PYmplY3RUeXBlIiwiX3N3aXRjaEF1ZGlvU2FtcGxlUmF0ZSIsImZyYW1lTGVuZ3RoIiwiZGVwZW5kc09uQ29yZUNvZGVyIiwiZXh0ZW5zaW9uRmxhZ0luZGV4IiwidXNlckFnZW50Iiwid2luZG93IiwibmF2aWdhdG9yIiwidG9Mb3dlckNhc2UiLCJleHRlbnNpb25TYW1wbGluZ0luZGV4IiwiY29uZmlnIiwic2FtcGxpbmdJbmRleCIsImluZGV4T2YiLCJzbmlmZmVyIiwiYnJvd3NlciIsInRyYWNrIiwiZm9ybWF0IiwiX2hhc0F1ZGlvU2VxdWVuY2UiLCJfc3dpdGNoQXVkaW9TYW1wbGluZ0ZyZXF1ZW5jeSIsImZyYW1lTGVudGgiLCJhdWRpb1NhbXBsZVJhdGUiLCJhdWRpb1NhbXBsZVJhdGVJbmRleCIsImFhY0hlYWRlciIsImF1ZGlvTWVkaWEiLCJNRVRBREFUQV9QQVJTRUQiLCJBVURJT19NRVRBREFUQV9DSEFOR0UiLCJfbWV0YUNoYW5nZSIsImZyYW1lVHlwZSIsImNvZGVjSUQiLCJhdmNQYWNrZXRUeXBlIiwicGFyc2VJbnQiLCJuYWx1IiwiciIsInNpemVzIiwiYXZjY2xlbmd0aCIsIl9hdmNTZXF1ZW5jZUhlYWRlclBhcnNlciIsIl9oYXNWaWRlb1NlcXVlbmNlIiwiVklERU9fTUVUQURBVEFfQ0hBTkdFIiwiY29uZmlndXJhdGlvblZlcnNpb24iLCJhdmNQcm9maWxlSW5kaWNhdGlvbiIsInByb2ZpbGVDb21wYXRpYmlsaXR5IiwiYXZjTGV2ZWxJbmRpY2F0aW9uIiwibmFsVW5pdExlbmd0aCIsIm51bU9mU3BzIiwiaiIsImNvZGVjU3RyaW5nIiwiaCIsInRvU3RyaW5nIiwibnVtT2ZQcHMiLCJ2aWRlb01lZGlhIiwiYXZjYyIsInNhbXBsaW5nRnJlcXVlbmN5SW5kZXgiLCJzYW1wbGluZ0ZyZXF1ZW5jeUxpc3QiLCJfc3dpdGNoQXVkaW9DaGFubmVsIiwic2FtcGxlVHJhY2tOdW1JbmRleCIsInNhbXBsZVRyYWNrTnVtTGlzdCIsImRhdGFzaXplQ29uZmlybSIsImxvZ2dlciIsInBhcnNlIiwidGV4dCIsImJhc2V1cmwiLCJzcGxpdCIsInJlZnMiLCJyZWYiLCJtYXRjaCIsInJlZm0iLCJyZWZkIiwidmVyc2lvbiIsInNlcXVlbmNlIiwidGFyZ2V0ZHVyYXRpb24iLCJwYXJzZUZsb2F0IiwicGFyc2VGcmFnIiwicGFyc2VEZWNyeXB0IiwiZnJhZ3MiLCJmcmVnIiwibmV4dGxpbmUiLCJjaGFyQXQiLCJ1cmwiLCJwYXJzZVVSTCIsInVybHMiLCJlbmNyeXB0IiwiY21kIiwibWV0aG9kIiwidXJpIiwiaXYiLCJpdmIiLCJpbSIsInN1YnN0ciIsIlN0cmVhbVR5cGUiLCJjb25maWdzIiwiZGVtdXhpbmciLCJwYXQiLCJwbXQiLCJfaGFzVmlkZW9NZXRhIiwiX2hhc0F1ZGlvTWV0YSIsImRlbXV4IiwiZnJhZyIsImlucHV0QnVmZmVyIiwicGVzZXMiLCJ0c1N0cmVhbSIsIlN0cmVhbSIsInJlYWQiLCJwZXMiLCJwaWQiLCJFUyIsInBheWxvYWQiLCJzdHJlYW0iLCJBdWRpb09wdGlvbnMiLCJWaWRlb09wdGlvbnMiLCJlcGVzZXMiLCJNZXJnZSIsInB1c2hBdWRpb1NhbXBsZSIsInB1c2hWaWRlb1NhbXBsZSIsIl90cmFja3MiLCJmcmVxdWVuY2UiLCJjaGFubmVsIiwiYXVkaW9PYmplY3RUeXBlIiwiYXVkaW9Db25maWciLCJmcmVxdWVuY3lJbmRleCIsIm1ldGFFcXVhbCIsImNvbXBhaXJlTWV0YSIsIkF1ZGlvVHJhY2tTYW1wbGUiLCJzYW1wbGVMZW5ndGgiLCJuYWwiLCJzYXJSYXRpbyIsInNhcl9yYXRpbyIsIlZpZGVvVHJhY2tTYW1wbGUiLCJkZXN0b3J5IiwiY29tcGFpcmVBcnJheSIsImFsIiwiYmwiLCJpZ25vcmVEdXJhdGlvbiIsImsiLCJpdGVtYSIsIml0ZW1iIiwiYnVmZmVycyIsInJlYWRIZWFkZXIiLCJyZWFkUGF5bG9hZCIsInBhY2tldCIsInVua25vd25QSURzIiwiUEVTIiwiUEFUIiwiQ0FUIiwiVFNEVCIsInNvbWUiLCJpdGVtIiwiUE1UIiwic3RzIiwiTWVkaWEiLCJzdHJlYW1UeXBlIiwic3luYyIsInJlYWRVaW50OCIsInJlYWRVaW50MTYiLCJwcmlvcml0eSIsInNjcmFtYmxpbmciLCJhZGFwdGF0aW9uIiwiY29udGludWl0eSIsInRhYmVsSUQiLCJ6ZXJvIiwic2VjdGlvbkxlbmd0aCIsInN0cmVhbUlEIiwic2VjdGlvbk51bWJlciIsImxhc3RTZWN0aW9uTnVtYmVyIiwiTiIsInByb2dyYW1OdW1iZXIiLCJwcm9ncmFtIiwidGFibGVJRCIsIm9yZGVyIiwibGFzdE9yZGVyIiwiUENSX1BJRCIsInByb2dyYW1MZW5ndGgiLCJlcyIsIm1hcCIsImFkYXB0YXRpb25MZW5ndGgiLCJhY2Nlc3MiLCJQQ1IiLCJPUENSIiwic3BsaWNlUG9pbnQiLCJ0cmFuc3BvcnRQcml2YXRlIiwiYWRhcHRhdGlvbkZpZWxkIiwiX3N0YXJ0IiwicHJvZ3JhbUNsb2NrQmFzZSIsInJlYWRVaW50MzIiLCJwcm9ncmFtQ2xvY2tFeHRlbnNpb24iLCJvcmlnaW5Qcm9ncmFtQ2xvY2tCYXNlIiwib3JpZ2luUHJvZ3JhbUNsb2NrRXh0ZW5zaW9uIiwic3BsaWNlQ291bnRkb3duIiwidHJhbnNwb3J0UHJpdmF0ZURhdGEiLCJsdHciLCJwaWVjZXdpc2UiLCJzZWFtbGVzcyIsImx0d1ZhbGlkIiwibHR3T2Zmc2V0IiwicmVhZFVpbnQyNCIsInBpZWNld2lzZVJhdGUiLCJyZWFkSW50OCIsInNwbGljZVR5cGUiLCJkdHNOZXh0QVUxIiwibWFya2VyMSIsImR0c05leHRBVTIiLCJtYXJrZXIyIiwiZHRzTmV4dEFVMyIsImxhc3RTdHVmZmluZyIsInBhY2tldExlbmd0aCIsInB0c0RUU0ZsYWciLCJlc2NyRmxhZyIsImVzUmF0ZUZsYWciLCJkc21GbGFnIiwiYWRkaXRpb25hbEZsYWciLCJjcmNGbGFnIiwiZXh0ZW5zaW9uRmxhZyIsInBlc0hlYWRlckxlbmd0aCIsIk4xIiwiZXNjciIsImV4IiwiZXNSYXRlIiwiYWRkaXRpb25hbENvcHlJbmZvIiwicGVzQ1JDIiwiYmFjayIsImZxIiwibGF5ZXIiLCJhYnNlbnQiLCJnZXRBdWRpb0NvbmZpZyIsInNlY3Rpb25JbmRpY2F0b3IiLCJjdXJyZW50TmV4dEluZGljYXRvciIsImNyYzMyIiwiZXh0ZW5zaW9uU2FtcGxlSW5kZXgiLCJ0ZXN0IiwiaW5wdXRidWZmZXIiLCJfYmFzZVVSTCIsIl9saXN0IiwiX3RzIiwiZnJhZ0xlbmd0aCIsIl9sYXN0Z2V0IiwiX2F1ZG9jbGVhciIsImF1dG9jbGVhciIsImJhc2VVUkwiLCJkb3dubG9hZGVkIiwiZG93bmxvYWRpbmciLCJkZWxldGVGcmFnIiwidGltZSIsInB1c2hNM1U4IiwiZGVsZXRlcHJlIiwibmV3ZnJhZ2xpc3QiLCJ0c2xpc3QiLCJnZXRUc0xpc3QiLCJ0c25hbWUiLCJpc2xvYWRlZCIsImxvYWRpbmciLCJnZXRUc0J5TmFtZSIsImdldFRzIiwidGltZWxpc3QiLCJjbGVhckRvd25sb2FkZWQiLCJsIiwiRmV0Y2hMb2FkZXIiLCJMT0FERVJfRVZFTlRTIiwiUkVBRF9TVFJFQU0iLCJSRUFEX1RFWFQiLCJSRUFEX0pTT04iLCJSRUFEX0JVRkZFUiIsInN0YXR1cyIsIl9yZWFkZXIiLCJfY2FuY2VsZWQiLCJfZGVzdHJveWVkIiwicmVhZHR5cGUiLCJfbG9hZGVyVGFza05vIiwiTEFERVJfU1RBUlQiLCJsb2FkIiwib3B0cyIsIl90aGlzIiwicGFyYW1zIiwiZ2V0UGFyYW1zIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJvayIsIl9vbkZldGNoUmVzcG9uc2UiLCJMT0FERVJfRVJST1IiLCJjYXRjaCIsInRhc2tubyIsImpzb24iLCJMT0FERVJfQ09NUExFVEUiLCJhcnJheUJ1ZmZlciIsIl9vblJlYWRlciIsImdldFJlYWRlciIsInJlYWRlciIsImNhbmNlbCIsImUiLCJ2YWwiLCJkb25lIiwiTE9BREVSX0RBVEFMT0FERUQiLCJoZWFkZXJzIiwiSGVhZGVycyIsIm1vZGUiLCJjYWNoZSIsImNvbmZpZ0hlYWRlcnMiLCJoYXNPd25Qcm9wZXJ0eSIsImFwcGVuZCIsIm9wdEhlYWRlcnMiLCJjb3JzIiwid2l0aENyZWRlbnRpYWxzIiwiY3JlZGVudGlhbHMiLCJNcDRSZW11eGVyIiwiRm1wNCIsIkJ1ZmZlciIsIndyaXRlVWludDMyIiwiaW5pdEJveCIsImNvbnRlbnQiLCJ3cml0ZSIsImV4dGVuc2lvbiIsImZsYWciLCJmdHlwIiwibW9vdiIsIm12aGQiLCJ0cmFrIiwidmlkZW9UcmFrIiwiYXVkaW9UcmFrIiwibXZleCIsImZvckVhY2giLCJieXRlcyIsInRraGQiLCJtZGlhIiwic2FtcGxlcmF0ZSIsImVkdHMiLCJtZWRpYVRpbWUiLCJtZGhkIiwiaGRsciIsIm1pbmYiLCJ2bWhkIiwic21oZCIsImRpbmYiLCJzdGJsIiwiZHJlZiIsInN0c2QiLCJzdHRzIiwic3RzYyIsInN0c3oiLCJzdGNvIiwibXA0YSIsImF2YzEiLCJlc2RzIiwiY29uZmlnbGVuIiwiaFNwYWNpbmciLCJ2U3BhY2luZyIsImJ0cnQiLCJwYXNwIiwidHJhY2tJRCIsIm1laGQiLCJ0cmV4IiwibW9vZiIsIm1maGQiLCJ0cmFmIiwidGZoZCIsInRmZHQiLCJzZHRwIiwidHJ1biIsInNkdHBMZW5ndGgiLCJzYW1wbGVDb3VudCIsImZsYWdzIiwiaXNMZWFkaW5nIiwiZGVwZW5kc09uIiwiaXNEZXBlbmRlZE9uIiwiaGFzUmVkdW5kYW5jeSIsImlzTm9uU3luYyIsIm51bSIsIm1kYXQiLCJtZGF0Qm94IiwiY2hhckNvZGVBdCIsIl9pc0R0c0Jhc2VJbml0ZWQiLCJpc0ZpcnN0VmlkZW8iLCJpc0ZpcnN0QXVkaW8iLCJ2aWRlb0FsbER1cmF0aW9uIiwiYXVkaW9BbGxEdXJhdGlvbiIsInJlbXV4IiwiUkVNVVhfTUVUQURBVEEiLCJvbk1ldGFEYXRhUmVhZHkiLCJERVRFQ1RfQ0hBTkdFX1NUUkVBTSIsInJlc2V0RHRzQmFzZSIsIl9kdHNCYXNlSW5pdGVkIiwiY2FsY0R0c0Jhc2UiLCJfcmVtdXhWaWRlbyIsIl9yZW11eEF1ZGlvIiwic2VlayIsInByZXNvdXJjZWJ1ZmZlciIsInJlbXV4SW5pdFNlZ21lbnQiLCJJTklUX1NFR01FTlQiLCJpbml0U2VnbWVudCIsImF1ZGlvQmFzZSIsInZpZGVvQmFzZSIsIm1wNFNhbXBsZXMiLCJhdmNTYW1wbGUiLCJtZGF0U2FtcGxlIiwic2FtcGxlRHVyYXRpb24iLCJ2aWRlb01ldGEiLCJtb29mTWRhdCIsIndyaXRlVG9Tb3VyY2UiLCJNRURJQV9TRUdNRU5UIiwibGFzdFNhbXBsZSIsIl92aWRlb05leHREdHMiLCJpc0ZpcnN0RHRzSW5pdGVkIiwiYXVkaW9NZXRhIiwibXA0U2FtcGxlIiwiaW5pdFNpbGVudEF1ZGlvIiwiQ29udGV4dCIsIldPUktFUl9DT01NQU5EUyIsIlBhZ2VWaXNpYmlsaXR5IiwiTWVkaWFJbmZvIiwiTWVkaWFTYW1wbGUiLCJNZWRpYVNlZ21lbnQiLCJNZWRpYVNlZ21lbnRMaXN0IiwiTXNlIiwiTW9iaWxlVmlkZW8iLCJDcnlwdG8iLCJSZXN1bHRDb25zdHJ1Y3RvciIsInRvdGFsTGVuZ3RoIiwiX2xlbiIsImFycmF5cyIsIl9rZXkiLCJfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uIiwiX2RpZEl0ZXJhdG9yRXJyb3IiLCJfaXRlcmF0b3JFcnJvciIsIl9pdGVyYXRvciIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiX3N0ZXAiLCJyZXR1cm4iLCJfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiIsIl9kaWRJdGVyYXRvckVycm9yMiIsIl9pdGVyYXRvckVycm9yMiIsIl9pdGVyYXRvcjIiLCJfc3RlcDIiLCJfYXJyIiwiX2NvbmNhdCIsIl9jb25jYXQyIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIm9iaiIsIl9fZXNNb2R1bGUiLCJ3ZWJwYWNrQm9vdHN0cmFwRnVuYyIsIm1vZHVsZXMiLCJpbnN0YWxsZWRNb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiYyIsImQiLCJnZXR0ZXIiLCJvIiwiY29uZmlndXJhYmxlIiwiZ2V0RGVmYXVsdCIsImdldE1vZHVsZUV4cG9ydHMiLCJvYmplY3QiLCJwcm9wZXJ0eSIsInAiLCJvZSIsImYiLCJzIiwiRU5UUllfTU9EVUxFIiwibW9kdWxlTmFtZVJlcUV4cCIsImRlcGVuZGVuY3lSZWdFeHAiLCJxdW90ZVJlZ0V4cCIsInJlcGxhY2UiLCJpc051bWVyaWMiLCJnZXRNb2R1bGVEZXBlbmRlbmNpZXMiLCJxdWV1ZU5hbWUiLCJyZXR2YWwiLCJmblN0cmluZyIsIndyYXBwZXJTaWduYXR1cmUiLCJ3ZWJwYWNrUmVxdWlyZU5hbWUiLCJyZSIsIlJlZ0V4cCIsImV4ZWMiLCJoYXNWYWx1ZXNJblF1ZXVlcyIsInF1ZXVlcyIsInJlZHVjZSIsImhhc1ZhbHVlcyIsImdldFJlcXVpcmVkTW9kdWxlcyIsIm1vZHVsZXNRdWV1ZSIsIm1haW4iLCJyZXF1aXJlZE1vZHVsZXMiLCJzZWVuTW9kdWxlcyIsInF1ZXVlIiwibW9kdWxlVG9DaGVjayIsIm5ld01vZHVsZXMiLCJuZXdNb2R1bGVzS2V5cyIsIl9fd2VicGFja19tb2R1bGVzX18iLCJhbGwiLCJlbnRyeU1vZHVsZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJqb2luIiwiYmxvYiIsIkJsb2IiLCJiYXJlIiwiVVJMIiwid2Via2l0VVJMIiwibW96VVJMIiwibXNVUkwiLCJ3b3JrZXJVcmwiLCJjcmVhdGVPYmplY3RVUkwiLCJ3b3JrZXIiLCJXb3JrZXIiLCJvYmplY3RVUkwiLCJSRU1VWF9FUlJPUiIsIk1TRV9FVkVOVFMiLCJTT1VSQ0VfVVBEQVRFX0VORCIsIkhMU19FVkVOVFMiLCJSRVRSWV9USU1FX0VYQ0VFREVEIiwiQ1JZVE9fRVZFTlRTIiwiU1RBUlRfREVDUllQVCIsIkRFQ1JZUFRFRCIsIkJST1dTRVJfRVZFTlRTIiwiVklTSUJJTElUWV9DSEFOR0UiLCJBTExFVkVOVFMiLCJGbHZBbGxvd2VkRXZlbnRzIiwiSGxzQWxsb3dlZEV2ZW50cyIsIkNPTlRFWFRfQ09NT01BTkRTIiwiT04iLCJPTkNFIiwiT0ZGIiwiRU1JVCIsIkRFU1RST1kiLCJESVJFQ1RfRU1JVF9GTEFHIiwiYWxsb3dlZEV2ZW50cyIsIl9lbWl0dGVyIiwiX2luc3RhbmNlTWFwIiwiX2Nsc01hcCIsIl9pbml0ZWQiLCJfaG9va3MiLCJ0YWciLCJpbnN0YW5jZSIsImluaXRJbnN0YW5jZSIsIm5ld0luc3RhbmNlIiwicmVnaXN0cnkiLCJjbHMiLCJjaGVja01lc3NhZ2VOYW1lIiwiX2lzTWVzc2FnZU5hbWVWYWxpZCIsInNlbGYiLCJlbmhhbmNlZCIsIm9uY2VMaXN0ZW5lcnMiLCJtZXNzYWdlTmFtZSIsImNhbGxiYWNrIiwiYmVmb3JlTGlzdCIsImVtaXRUbyIsInJlbW92ZUxpc3RlbmVycyIsImhhc093biIsImNhbGxiYWNrcyIsImRlc3Ryb3lJbnN0YW5jZXMiLCJvdXRwdXRCdWZmZXIiLCJvdXRwdXRidWZmZXIiLCJjcnlwdG8iLCJtc0NyeXB0byIsImRlY3JpcHQiLCJhZXNrZXkiLCJzYmtleSIsInN1YnRsZSIsImltcG9ydEtleSIsImRlY3JpcHREYXRhIiwiZGVjcnlwdCIsInJlcyIsImxlIiwic2V0SW50MTYiLCJJbnQxNkFycmF5IiwiZGV2aWNlIiwib3MiLCJpc1BjIiwiaXNUYWJsZXQiLCJ1YSIsInJlZyIsImllIiwiZmlyZm94IiwiY2hyb21lIiwib3BlcmEiLCJzYWZhcmkiLCJpc1dpbmRvd3NQaG9uZSIsImlzU3ltYmlhbiIsImlzQW5kcm9pZCIsImlzRmlyZUZveCIsImlzUGhvbmUiLCJvdXQiLCJpbnB1dCIsImZyb21DaGFyQ29kZSIsIl9jaGVja0NvbnRpbnVhdGlvbiIsInVjczQiLCJjaGVja0xlbmd0aCIsIkFWUmVjb25jaWxlciIsInByb3BzIiwiYUN0eCIsInZDdHgiLCJ0aW1lb3V0SWQiLCJkb1JlY29uY2lsZSIsInZDdXJUaW1lIiwiY3VycmVudFRpbWUiLCJhQ3VyVGltZSIsInBhdXNlIiwic2V0VGltZW91dCIsInBsYXkiLCJIVE1MRWxlbWVudCIsIl9jYW52YXMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJoYW5kbGVBdWRpb1NvdXJjZUVuZCIsInBsYXllZCIsIl9wYXVzZWQiLCJWaWRlb0N0eCIsImNhbnZhcyIsIkF1ZGlvQ3R4IiwidGlja2VyIiwicmVjb25jaWxlciIsIm9uY2FucGxheSIsImFwcGVuZENoaWxkIiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50Iiwibm93IiwiX2N1cnJlbnRUaW1lIiwiX29uVGltZXIiLCJjbGVhbkJ1ZmZlciIsIl9jbGVhbkJ1ZmZlciIsInN0b3AiLCJvbkRlbXV4Q29tcGxldGUiLCJkZWNvZGVBdWRpbyIsImRlY29kZVZpZGVvIiwic2V0QXVkaW9NZXRhIiwic2V0QXVkaW9NZXRhRGF0YSIsInNldFZpZGVvTWV0YSIsInNldFZpZGVvTWV0YURhdGEiLCJ2aWRlb1dpZHRoIiwidmlkZW9IZWlnaHQiLCJnZXRBdHRyaWJ1dGUiLCJyZWFkeVN0YXRlIiwic2Vla2luZyIsInBhdXNlZCIsInBsYXliYWNrUmF0ZSIsImhhc0F0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsImVuZGVkIiwiYXV0b3BsYXkiLCJ2b2x1bWUiLCJ2b2wiLCJtdXRlZCIsImJ1ZmZlcmVkIiwiY3VzdG9tRWxlbWVudHMiLCJkZWZpbmUiLCJTb3VyY2VCdWZmZXIiLCJjdXJyZW50R29wIiwiX2xhc3RHZXQiLCJmcmFtZSIsIm5leHRHb3AiLCJfZ2V0TmV4dCIsImdvcCIsInJlbW92ZSIsIlRpY2tlciIsImludGVydmFsIiwib25UaWNrIiwic2V0SW50ZXJ2YWwiLCJSYWZUaWNrZXIiLCJwcmV2IiwidGltZXJJZCIsIl9zdWJUaW1lcklkIiwiX3RpY2tGdW5jIiwiZ2V0VGlja0Z1bmMiLCJ0aWNrIiwibmV4dFRpY2siLCJjYW5jZWxGdW5jIiwiZ2V0Q2FuY2VsRnVuYyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwid2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJpc1N1cHBvcnRlZCIsIlRpbWVvdXRUaWNrZXIiLCJjbGVhckludGVydmFsIiwiZ2V0VGlja2VyIiwiVmlkZW9DYW52YXMiLCJwcmVsb2FkVGltZSIsIm9uRmlyc3RGcmFtZSIsInJlYWR5U3RhdHVzIiwibGFzdFBsYXllZCIsIl9kZWNvZGVySW5pdGVkIiwiX2F2Y2NwdXNoZWQiLCJfZGVjb2RlZEZyYW1lcyIsIl9sYXN0U2FtcGxlRHRzIiwiX2Jhc2VEdHMiLCJfbGFzdFJlbmRlclRpbWUiLCJwbGF5RmluaXNoIiwiaW5pdFdhc21Xb3JrZXIiLCJ3YXNtd29ya2VyIiwicG9zdE1lc3NhZ2UiLCJtc2ciLCJhZGRFdmVudExpc3RlbmVyIiwiX29uRGVjb2RlZCIsInl1dkNhbnZhcyIsIllVVkNhbnZhcyIsIl9wcmVsb2FkIiwiX2FuYWx5c2VOYWwiLCJQcm9taXNlIiwiZnJhbWVUaW1lcyIsImZyYW1lVGltZSIsInJlbmRlciIsInlMaW5lc2l6ZSIsInV2TGluZXNpemUiLCJyYW5nZXMiLCJjdXJyZW50UmFuZ2UiLCJUaW1lUmFuZ2VzIiwiTUFYX1NUUkVBTV9CVUZGRVJfTEVOR1RIIiwiRGVjb2RlciIsImluaXRlZCIsImluZm9saXN0IiwicGFyX2Jyb2Fkd2F5T25Ccm9hZHdheUluaXRlZCIsImJyb2Fkd2F5T25Ccm9hZHdheUluaXRlZCIsInBhcl9icm9hZHdheU9uUGljdHVyZURlY29kZWQiLCJicm9hZHdheU9uUGljdHVyZURlY29kZWQiLCJ0b1U4QXJyYXkiLCJwdHIiLCJIRUFQVTgiLCJNb2R1bGUiLCJfYnJvYWR3YXlJbml0Iiwic3RyZWFtQnVmZmVyIiwiX2Jyb2Fkd2F5Q3JlYXRlU3RyZWFtIiwiaW5mb2lkIiwieVJvd2NvdW50IiwidXZSb3djb3VudCIsImRhdGV0ZW1wIiwiZ2V0VGltZSIsIl9icm9hZHdheVBsYXlTdHJlYW0iLCJkZWNvZGVyIiwib25Qb3N0UnVuIiwiaW1wb3J0U2NyaXB0cyIsImFkZE9uUG9zdFJ1biIsImxvZyIsInN0eWxlIiwiX2luaXRDb250ZXh0R0wiLCJjb250ZXh0R0wiLCJfaW5pdFByb2dyYW0iLCJfaW5pdEJ1ZmZlcnMiLCJfaW5pdFRleHR1cmVzIiwiZ2wiLCJ2YWxpZENvbnRleHROYW1lcyIsIm5hbWVJbmRleCIsImNvbnRleHROYW1lIiwiY29udGV4dE9wdGlvbnMiLCJnZXRDb250ZXh0IiwiZ2V0UGFyYW1ldGVyIiwidmVydGV4U2hhZGVyU2NyaXB0IiwiZnJhZ21lbnRTaGFkZXJTY3JpcHQiLCJZVVYyUkdCIiwidmVydGV4U2hhZGVyIiwiY3JlYXRlU2hhZGVyIiwiVkVSVEVYX1NIQURFUiIsInNoYWRlclNvdXJjZSIsImNvbXBpbGVTaGFkZXIiLCJnZXRTaGFkZXJQYXJhbWV0ZXIiLCJDT01QSUxFX1NUQVRVUyIsImdldFNoYWRlckluZm9Mb2ciLCJmcmFnbWVudFNoYWRlciIsIkZSQUdNRU5UX1NIQURFUiIsImNyZWF0ZVByb2dyYW0iLCJhdHRhY2hTaGFkZXIiLCJsaW5rUHJvZ3JhbSIsImdldFByb2dyYW1QYXJhbWV0ZXIiLCJMSU5LX1NUQVRVUyIsImdldFByb2dyYW1JbmZvTG9nIiwidXNlUHJvZ3JhbSIsIllVVjJSR0JSZWYiLCJnZXRVbmlmb3JtTG9jYXRpb24iLCJ1bmlmb3JtTWF0cml4NGZ2Iiwic2hhZGVyUHJvZ3JhbSIsInZlcnRleFBvc0J1ZmZlciIsImNyZWF0ZUJ1ZmZlciIsImJpbmRCdWZmZXIiLCJBUlJBWV9CVUZGRVIiLCJidWZmZXJEYXRhIiwiRmxvYXQzMkFycmF5IiwiU1RBVElDX0RSQVciLCJ2ZXJ0ZXhQb3NSZWYiLCJnZXRBdHRyaWJMb2NhdGlvbiIsImVuYWJsZVZlcnRleEF0dHJpYkFycmF5IiwidmVydGV4QXR0cmliUG9pbnRlciIsIkZMT0FUIiwidGV4dHVyZVBvc0J1ZmZlciIsInRleHR1cmVQb3NSZWYiLCJ1VGV4dHVyZVBvc0J1ZmZlciIsInVUZXh0dXJlUG9zUmVmIiwidlRleHR1cmVQb3NCdWZmZXIiLCJ2VGV4dHVyZVBvc1JlZiIsInlUZXh0dXJlUmVmIiwiX2luaXRUZXh0dXJlIiwieVNhbXBsZXJSZWYiLCJ1bmlmb3JtMWkiLCJ1VGV4dHVyZVJlZiIsInVTYW1wbGVyUmVmIiwidlRleHR1cmVSZWYiLCJ2U2FtcGxlclJlZiIsInRleHR1cmVSZWYiLCJjcmVhdGVUZXh0dXJlIiwiYmluZFRleHR1cmUiLCJURVhUVVJFXzJEIiwidGV4UGFyYW1ldGVyaSIsIlRFWFRVUkVfTUFHX0ZJTFRFUiIsIk5FQVJFU1QiLCJURVhUVVJFX01JTl9GSUxURVIiLCJURVhUVVJFX1dSQVBfUyIsIkNMQU1QX1RPX0VER0UiLCJURVhUVVJFX1dSQVBfVCIsIl9kcmF3UGljdHVyZUdMIiwieWxlbiIsInV2bGVuIiwicmVuZGVyRGF0YSIsInlEYXRhIiwidURhdGEiLCJ2RGF0YSIsIl9kcmF3UGljdHVyZUdMNDIwIiwieURhdGFQZXJSb3ciLCJ5Um93Q250IiwidURhdGFQZXJSb3ciLCJ1Um93Q250IiwidkRhdGFQZXJSb3ciLCJ2Um93Q250IiwicmF0aW93IiwicmF0aW9oIiwibGVmdCIsInRvcCIsInZpZXdwb3J0IiwidGV4dHVyZVBvc1ZhbHVlcyIsIkRZTkFNSUNfRFJBVyIsInVUZXh0dXJlUG9zVmFsdWVzIiwidlRleHR1cmVQb3NWYWx1ZXMiLCJhY3RpdmVUZXh0dXJlIiwiVEVYVFVSRTAiLCJ0ZXhJbWFnZTJEIiwiTFVNSU5BTkNFIiwiVU5TSUdORURfQllURSIsIlRFWFRVUkUxIiwiVEVYVFVSRTIiLCJkcmF3QXJyYXlzIiwiVFJJQU5HTEVfU1RSSVAiLCJfZHJhd1BpY3R1cmVSR0IiLCJpc09iamVjdEZpbGxlZCIsIm1pbWVUeXBlIiwiaXNDb21wbGV0ZSIsImlzQmFzZUluZm9SZWFkeSIsImlzVmlkZW9SZWFkeSIsImlzQXVkaW9SZWFkeSIsIl9kZWZhdWx0IiwiZ2V0RGVmYXVsdEluZiIsImVudHJpZXMiLCJ2IiwiaXNSQVAiLCJfdHlwZSIsIl9sYXN0QXBwZW5kTG9jYXRpb24iLCJpc0VtcHR5IiwiX3NlYXJjaE5lYXJlc3RTZWdtZW50QmVmb3JlIiwiYmVnaW5EdHMiLCJsYXN0IiwibWlkIiwibGJvdW5kIiwidWJvdW5kIiwiaWR4IiwiX3NlYXJjaE5lYXJlc3RTZWdtZW50QWZ0ZXIiLCJzZWdtZW50IiwibGFzdEFwcGVuZElkeCIsImluc2VydElkeCIsIm9yaWdpblN0YXJ0RHRzIiwiZ2V0TGFzdFNlZ21lbnRCZWZvcmUiLCJnZXRMYXN0U2FtcGxlQmVmb3JlIiwiZ2V0TGFzdFJBUEJlZm9yZSIsInNlZ21lbnRJZHgiLCJyYW5kb21BY2Nlc3NQb2ludHMiLCJzdGFydER0cyIsImVuZER0cyIsInN0YXJ0UHRzIiwiZW5kUHRzIiwib3JpZ2luRW5kRHRzIiwiYWRkUkFQIiwiTVNFIiwiY29udGFpbmVyIiwibWVkaWFTb3VyY2UiLCJzb3VyY2VCdWZmZXJzIiwib25Tb3VyY2VPcGVuIiwib25UaW1lVXBkYXRlIiwib25VcGRhdGVFbmQiLCJvbldhaXRpbmciLCJNZWRpYVNvdXJjZSIsImFkZFNvdXJjZUJ1ZmZlcnMiLCJkb0FwcGVuZCIsImFkZCIsImR1ciIsIm1pbWUiLCJzb3VyY2VCdWZmZXIiLCJhZGRTb3VyY2VCdWZmZXIiLCJ1cGRhdGluZyIsImFwcGVuZEJ1ZmZlciIsImVuZE9mU3RyZWFtIiwiYWN0aXZlU291cmNlQnVmZmVycyIsInJlbW92ZUJ1ZmZlcnMiLCJ0YXNrTGlzdCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJ0YXNrIiwiZG9DbGVhbkJ1ZmZlciIsInJldHJ5VGltZSIsImNsZWFuIiwiY2xlYXJCdWZmZXIiLCJyZW1vdmVTb3VyY2VCdWZmZXIiLCJyZXZva2VPYmplY3RVUkwiLCJiRW5kIiwicmVhZEFzSW50IiwidGVtcCIsInBhZFN0YXJ0NEhleCIsImhleE51bSIsImhleFN0ciIsInBhZFN0YXJ0IiwibG9vcCIsInNpZ24iLCJyZWFkVWludDY0IiwicmVhZEludDE2IiwicmVhZEludDMyIiwiVGFnIiwiTG9nZ2VyIiwiRmx2Q29udHJvbGxlciIsInBsYXllciIsIl9wbGF5ZXIiLCJpbml0U2VnbWVudEFycml2ZWQiLCJpbml0TGlzdGVuZXJzIiwiX2hhbmRsZUxvYWRlckRhdGFMb2FkZWQiLCJfaGFuZGxlTmV0d29ya0Vycm9yIiwiX2hhbmRsZU1lZGlhSW5mbyIsIl9oYW5kbGVNZXRhZGF0YVBhcnNlZCIsIl9oYW5kbGVEZW11eENvbXBsZXRlIiwiX2hhbmRsZURlbXV4RXJyb3IiLCJfc2V0TWV0YVRvQXVkaW8iLCJfc2V0TWV0YVRvVmlkZW8iLCJfaGFuZGxlQXBwZW5kSW5pdFNlZ21lbnQiLCJQbGF5ZXIiLCJFcnJvcnMiLCJsb2FkRGF0YSIsImxvYWRlciIsInJlc29sdmVWaWRlb0dPUCIsImZpcnN0SWZyYW1lSWR4IiwibGFzdElmcmFtZUlkeCIsInRlbXBTYW1wbGVzIiwicmVzdCIsImZsdkFsbG93ZWRFdmVudHMiLCJGbHZQbGF5ZXIiLCJtZWRpYVR5cGUiLCJpbml0RXZlbnRzIiwiaW5pdEZsdiIsImZsdiIsImluaXRGbHZFdmVudHMiLCJ1dGlsIiwiYWRkQ2xhc3MiLCJyb290IiwiZmluZERvbSIsImxpdmUiLCJjcmVhdGVEb20iLCJjb250cm9scyIsInRpbWVyIiwiZ2V0QnVmZmVyZWRSYW5nZSIsImhpZGRlbiIsInJhbmdlIiwiRkxWIiwiX2hhc1N0YXJ0IiwiX2Rlc3Ryb3kiLCJjdXJyZW50U3JjIl0sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLElBQUlBLElBQUksT0FBT0MsT0FBUCxLQUFtQixRQUFuQixHQUE4QkEsT0FBOUIsR0FBd0MsSUFBaEQ7QUFDQSxJQUFJQyxlQUFlRixLQUFLLE9BQU9BLEVBQUVHLEtBQVQsS0FBbUIsVUFBeEIsR0FDZkgs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S0FSRCxNQVFPO0FBQ0wsV0FBS3Y4QixLQUFMLENBQVdrYyxHQUFYO0FBQ0Q7QUFDRCxTQUFLbGYsSUFBTCxDQUFVLFNBQVYsRUFBcUIsTUFBTTtBQUN6QixXQUFLbS9CLFdBQUwsR0FBbUIsQ0FBbkI7QUFDRCxLQUZEO0FBR0Q7QUFoSTRCOztBQW1JL0JsakMsT0FBT0MsT0FBUCxHQUFpQis0QyxTQUFqQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hJQSxhQUFhLG1DQUFtQyxFQUFFLEkiLCJmaWxlIjoibW9iaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFIgPSB0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgPyBSZWZsZWN0IDogbnVsbFxudmFyIFJlZmxlY3RBcHBseSA9IFIgJiYgdHlwZW9mIFIuYXBwbHkgPT09ICdmdW5jdGlvbidcbiAgPyBSLmFwcGx5XG4gIDogZnVuY3Rpb24gUmVmbGVjdEFwcGx5KHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwodGFyZ2V0LCByZWNlaXZlciwgYXJncyk7XG4gIH1cblxudmFyIFJlZmxlY3RPd25LZXlzXG5pZiAoUiAmJiB0eXBlb2YgUi5vd25LZXlzID09PSAnZnVuY3Rpb24nKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gUi5vd25LZXlzXG59IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KVxuICAgICAgLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkpO1xuICB9O1xufSBlbHNlIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gUHJvY2Vzc0VtaXRXYXJuaW5nKHdhcm5pbmcpIHtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSBjb25zb2xlLndhcm4od2FybmluZyk7XG59XG5cbnZhciBOdW1iZXJJc05hTiA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiBOdW1iZXJJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHNDb3VudCA9IDA7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbnZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudEVtaXR0ZXIsICdkZWZhdWx0TWF4TGlzdGVuZXJzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyB8fCBhcmcgPCAwIHx8IE51bWJlcklzTmFOKGFyZykpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIGFyZyArICcuJyk7XG4gICAgfVxuICAgIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBhcmc7XG4gIH1cbn0pO1xuXG5FdmVudEVtaXR0ZXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gIGlmICh0aGlzLl9ldmVudHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgTnVtYmVySXNOYU4obikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBuICsgJy4nKTtcbiAgfVxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uICRnZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuICRnZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICB2YXIgZG9FcnJvciA9ICh0eXBlID09PSAnZXJyb3InKTtcblxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpXG4gICAgZG9FcnJvciA9IChkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PT0gdW5kZWZpbmVkKTtcbiAgZWxzZSBpZiAoIWRvRXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICB2YXIgZXI7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMClcbiAgICAgIGVyID0gYXJnc1swXTtcbiAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgLy8gTm90ZTogVGhlIGNvbW1lbnRzIG9uIHRoZSBgdGhyb3dgIGxpbmVzIGFyZSBpbnRlbnRpb25hbCwgdGhleSBzaG93XG4gICAgICAvLyB1cCBpbiBOb2RlJ3Mgb3V0cHV0IGlmIHRoaXMgcmVzdWx0cyBpbiBhbiB1bmhhbmRsZWQgZXhjZXB0aW9uLlxuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgfVxuICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmhhbmRsZWQgZXJyb3IuJyArIChlciA/ICcgKCcgKyBlci5tZXNzYWdlICsgJyknIDogJycpKTtcbiAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgIHRocm93IGVycjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgfVxuXG4gIHZhciBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIFJlZmxlY3RBcHBseShoYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgUmVmbGVjdEFwcGx5KGxpc3RlbmVyc1tpXSwgdGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldC5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA/IGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gICAgICAvLyBSZS1hc3NpZ24gYGV2ZW50c2AgYmVjYXVzZSBhIG5ld0xpc3RlbmVyIGhhbmRsZXIgY291bGQgaGF2ZSBjYXVzZWQgdGhlXG4gICAgICAvLyB0aGlzLl9ldmVudHMgdG8gYmUgYXNzaWduZWQgdG8gYSBuZXcgb2JqZWN0XG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPVxuICAgICAgICBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOiBbZXhpc3RpbmcsIGxpc3RlbmVyXTtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB9IGVsc2UgaWYgKHByZXBlbmQpIHtcbiAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdGluZy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICAgIG0gPSAkZ2V0TWF4TGlzdGVuZXJzKHRhcmdldCk7XG4gICAgaWYgKG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0gJiYgIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgIC8vIE5vIGVycm9yIGNvZGUgZm9yIHRoaXMgc2luY2UgaXQgaXMgYSBXYXJuaW5nXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIHZhciB3ID0gbmV3IEVycm9yKCdQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5sZW5ndGggKyAnICcgKyBTdHJpbmcodHlwZSkgKyAnIGxpc3RlbmVycyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luY3JlYXNlIGxpbWl0Jyk7XG4gICAgICB3Lm5hbWUgPSAnTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nJztcbiAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgIHcudHlwZSA9IHR5cGU7XG4gICAgICB3LmNvdW50ID0gZXhpc3RpbmcubGVuZ3RoO1xuICAgICAgUHJvY2Vzc0VtaXRXYXJuaW5nKHcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcblxuZnVuY3Rpb24gb25jZVdyYXBwZXIoKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgaWYgKCF0aGlzLmZpcmVkKSB7XG4gICAgdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLCB0aGlzLndyYXBGbik7XG4gICAgdGhpcy5maXJlZCA9IHRydWU7XG4gICAgUmVmbGVjdEFwcGx5KHRoaXMubGlzdGVuZXIsIHRoaXMudGFyZ2V0LCBhcmdzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfb25jZVdyYXAodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgc3RhdGUgPSB7IGZpcmVkOiBmYWxzZSwgd3JhcEZuOiB1bmRlZmluZWQsIHRhcmdldDogdGFyZ2V0LCB0eXBlOiB0eXBlLCBsaXN0ZW5lcjogbGlzdGVuZXIgfTtcbiAgdmFyIHdyYXBwZWQgPSBvbmNlV3JhcHBlci5iaW5kKHN0YXRlKTtcbiAgd3JhcHBlZC5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICBzdGF0ZS53cmFwRm4gPSB3cmFwcGVkO1xuICByZXR1cm4gd3JhcHBlZDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cbiAgdGhpcy5vbih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRPbmNlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGxpc3QgPSBldmVudHNbdHlwZV07XG4gICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8IGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0Lmxpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgICAgIGZvciAoaSA9IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHwgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsTGlzdGVuZXIgPSBsaXN0W2ldLmxpc3RlbmVyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09IDApXG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcGxpY2VPbmUobGlzdCwgcG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKVxuICAgICAgICAgIGV2ZW50c1t0eXBlXSA9IGxpc3RbMF07XG5cbiAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBvcmlnaW5hbExpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cywgaTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRzW3R5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV07XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuZnVuY3Rpb24gX2xpc3RlbmVycyh0YXJnZXQsIHR5cGUsIHVud3JhcCkge1xuICB2YXIgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgaWYgKGV2bGlzdGVuZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiB1bndyYXAgPyBbZXZsaXN0ZW5lci5saXN0ZW5lciB8fCBldmxpc3RlbmVyXSA6IFtldmxpc3RlbmVyXTtcblxuICByZXR1cm4gdW53cmFwID9cbiAgICB1bndyYXBMaXN0ZW5lcnMoZXZsaXN0ZW5lcikgOiBhcnJheUNsb25lKGV2bGlzdGVuZXIsIGV2bGlzdGVuZXIubGVuZ3RoKTtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCB0cnVlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmF3TGlzdGVuZXJzID0gZnVuY3Rpb24gcmF3TGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5saXN0ZW5lckNvdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGlzdGVuZXJDb3VudC5jYWxsKGVtaXR0ZXIsIHR5cGUpO1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBsaXN0ZW5lckNvdW50O1xuZnVuY3Rpb24gbGlzdGVuZXJDb3VudCh0eXBlKSB7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHJldHVybiB0aGlzLl9ldmVudHNDb3VudCA+IDAgPyBSZWZsZWN0T3duS2V5cyh0aGlzLl9ldmVudHMpIDogW107XG59O1xuXG5mdW5jdGlvbiBhcnJheUNsb25lKGFyciwgbikge1xuICB2YXIgY29weSA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpXG4gICAgY29weVtpXSA9IGFycltpXTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKDsgaW5kZXggKyAxIDwgbGlzdC5sZW5ndGg7IGluZGV4KyspXG4gICAgbGlzdFtpbmRleF0gPSBsaXN0W2luZGV4ICsgMV07XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhhcnIpIHtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyArK2kpIHtcbiAgICByZXRbaV0gPSBhcnJbaV0ubGlzdGVuZXIgfHwgYXJyW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgVHJhY2s6IHJlcXVpcmUoJy4vc3JjL3RyYWNrJykuZGVmYXVsdCxcbiAgVHJhY2tzOiByZXF1aXJlKCcuL3NyYy90cmFjaycpLlRyYWNrcyxcbiAgQXVkaW9UcmFjazogcmVxdWlyZSgnLi9zcmMvdHJhY2snKS5BdWRpb1RyYWNrLFxuICBWaWRlb1RyYWNrOiByZXF1aXJlKCcuL3NyYy90cmFjaycpLlZpZGVvVHJhY2ssXG5cbiAgWGdCdWZmZXI6IHJlcXVpcmUoJy4vc3JjL2J1ZmZlcicpLlhnQnVmZmVyLFxuICBSZW11eEJ1ZmZlcjogcmVxdWlyZSgnLi9zcmMvYnVmZmVyJykuUmVtdXhCdWZmZXIsXG5cbiAgUHJlU291cmNlOiByZXF1aXJlKCcuL3NyYy9wcmVzb3VjZScpLmRlZmF1bHRcbn07XG4iLCJleHBvcnQgY2xhc3MgWGdCdWZmZXIge1xuICAvKipcbiAgICogQSBidWZmZXIgdG8gc3RvcmUgbG9hZGVkIGRhdGEuXG4gICAqXG4gICAqIEBjbGFzcyBMb2FkZXJCdWZmZXJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aCAtIE9wdGlvbmFsIHRoZSBidWZmZXIgc2l6ZVxuICAgKi9cbiAgY29uc3RydWN0b3IgKGxlbmd0aCkge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoIHx8IDBcbiAgICB0aGlzLmhpc3RvcnlMZW4gPSBsZW5ndGggfHwgMFxuICAgIHRoaXMuYXJyYXkgPSBbXVxuICAgIHRoaXMub2Zmc2V0ID0gMFxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBmdW5jdGlvbiB0byBwdXNoIGRhdGEuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBkYXRhIC0gVGhlIGRhdGEgdG8gcHVzaCBpbnRvIHRoZSBidWZmZXJcbiAgICovXG4gIHB1c2ggKGRhdGEpIHtcbiAgICB0aGlzLmFycmF5LnB1c2goZGF0YSlcbiAgICB0aGlzLmxlbmd0aCArPSBkYXRhLmJ5dGVMZW5ndGhcbiAgICB0aGlzLmhpc3RvcnlMZW4gKz0gZGF0YS5ieXRlTGVuZ3RoXG4gIH1cblxuICAvKipcbiAgICogVGhlIGZ1bmN0aW9uIHRvIHNoaWZ0IGRhdGEuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSBUaGUgc2l6ZSBvZiBzaGlmdC5cbiAgICovXG4gIHNoaWZ0IChsZW5ndGgpIHtcbiAgICBpZiAodGhpcy5hcnJheS5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoMClcbiAgICB9XG5cbiAgICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zaGlmdEJ1ZmZlcigpXG4gICAgfVxuICAgIGlmICgodGhpcy5vZmZzZXQgKyBsZW5ndGgpID09PSB0aGlzLmFycmF5WzBdLmxlbmd0aCkge1xuICAgICAgbGV0IHJldCA9IHRoaXMuYXJyYXlbMF0uc2xpY2UodGhpcy5vZmZzZXQsIHRoaXMub2Zmc2V0ICsgbGVuZ3RoKVxuICAgICAgdGhpcy5vZmZzZXQgPSAwXG4gICAgICB0aGlzLmFycmF5LnNoaWZ0KClcbiAgICAgIHRoaXMubGVuZ3RoIC09IGxlbmd0aFxuICAgICAgcmV0dXJuIHJldFxuICAgIH1cblxuICAgIGlmICgodGhpcy5vZmZzZXQgKyBsZW5ndGgpIDwgdGhpcy5hcnJheVswXS5sZW5ndGgpIHtcbiAgICAgIGxldCByZXQgPSB0aGlzLmFycmF5WzBdLnNsaWNlKHRoaXMub2Zmc2V0LCB0aGlzLm9mZnNldCArIGxlbmd0aClcbiAgICAgIHRoaXMub2Zmc2V0ICs9IGxlbmd0aFxuICAgICAgdGhpcy5sZW5ndGggLT0gbGVuZ3RoXG4gICAgICByZXR1cm4gcmV0XG4gICAgfVxuXG4gICAgbGV0IHJldCA9IG5ldyBVaW50OEFycmF5KGxlbmd0aClcbiAgICBsZXQgdG1wb2ZmID0gMFxuICAgIHdoaWxlICh0aGlzLmFycmF5Lmxlbmd0aCA+IDAgJiYgbGVuZ3RoID4gMCkge1xuICAgICAgaWYgKCh0aGlzLm9mZnNldCArIGxlbmd0aCkgPCB0aGlzLmFycmF5WzBdLmxlbmd0aCkge1xuICAgICAgICBsZXQgdG1wID0gdGhpcy5hcnJheVswXS5zbGljZSh0aGlzLm9mZnNldCwgdGhpcy5vZmZzZXQgKyBsZW5ndGgpXG4gICAgICAgIHJldC5zZXQodG1wLCB0bXBvZmYpXG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IGxlbmd0aFxuICAgICAgICB0aGlzLmxlbmd0aCAtPSBsZW5ndGhcbiAgICAgICAgbGVuZ3RoID0gMFxuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHRlbXBsZW5ndGggPSB0aGlzLmFycmF5WzBdLmxlbmd0aCAtIHRoaXMub2Zmc2V0XG4gICAgICAgIHJldC5zZXQodGhpcy5hcnJheVswXS5zbGljZSh0aGlzLm9mZnNldCwgdGhpcy5hcnJheVswXS5sZW5ndGgpLCB0bXBvZmYpXG4gICAgICAgIHRoaXMuYXJyYXkuc2hpZnQoKVxuICAgICAgICB0aGlzLm9mZnNldCA9IDBcbiAgICAgICAgdG1wb2ZmICs9IHRlbXBsZW5ndGhcbiAgICAgICAgdGhpcy5sZW5ndGggLT0gdGVtcGxlbmd0aFxuICAgICAgICBsZW5ndGggLT0gdGVtcGxlbmd0aFxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmV0XG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gdG8gY2xlYXIgdGhlIGJ1ZmZlci5cbiAgICovXG4gIGNsZWFyICgpIHtcbiAgICB0aGlzLmFycmF5ID0gW11cbiAgICB0aGlzLmxlbmd0aCA9IDBcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuY2xlYXIoKVxuICAgIHRoaXMuaGlzdG9yeUxlbiA9IDBcbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0byBzaGlmdCBvbmUgdW5pdDhBcnJheS5cbiAgICovXG4gIF9zaGlmdEJ1ZmZlciAoKSB7XG4gICAgdGhpcy5sZW5ndGggLT0gdGhpcy5hcnJheVswXS5sZW5ndGhcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgICByZXR1cm4gdGhpcy5hcnJheS5zaGlmdCgpXG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCB1aW50OCBkYXRhIHRvIG51bWJlci5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IC0gdGhlIHN0YXJ0IHBvc3Rpb24uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGggLSB0aGUgbGVuZ3RoIG9mIGRhdGEuXG4gICAqL1xuICB0b0ludCAoc3RhcnQsIGxlbmd0aCkge1xuICAgIGxldCByZXRJbnQgPSAwXG4gICAgbGV0IGkgPSB0aGlzLm9mZnNldCArIHN0YXJ0XG4gICAgd2hpbGUgKGkgPCB0aGlzLm9mZnNldCArIGxlbmd0aCArIHN0YXJ0KSB7XG4gICAgICBpZiAoaSA8IHRoaXMuYXJyYXlbMF0ubGVuZ3RoKSB7XG4gICAgICAgIHJldEludCA9IHJldEludCAqIDI1NiArIHRoaXMuYXJyYXlbMF1baV1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hcnJheVsxXSkge1xuICAgICAgICByZXRJbnQgPSByZXRJbnQgKiAyNTYgKyB0aGlzLmFycmF5WzFdW2kgLSB0aGlzLmFycmF5WzBdLmxlbmd0aF1cbiAgICAgIH1cblxuICAgICAgaSsrXG4gICAgfVxuICAgIHJldHVybiByZXRJbnRcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVtdXhCdWZmZXIge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy52aWRlbyA9IFtdXG4gICAgdGhpcy5hdWRpbyA9IFtdXG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLnZpZGVvID0gW11cbiAgICB0aGlzLmF1ZGlvID0gW11cbiAgfVxufVxuIiwiY2xhc3MgU291cmNlIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMubWltZXR5cGUgPSAnJztcbiAgICB0aGlzLmluaXQgPSBudWxsO1xuICAgIHRoaXMuZGF0YSA9IFtdO1xuICB9XG59XG5cbmNsYXNzIFByZVNvdXJjZSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLnNvdXJjZXMgPSB7fTtcbiAgfVxuXG4gIGdldFNvdXJjZSAoc291cmNlKSB7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlc1tzb3VyY2VdO1xuICB9XG5cbiAgY3JlYXRlU291cmNlIChuYW1lKSB7XG4gICAgdGhpcy5zb3VyY2VzW25hbWVdID0gbmV3IFNvdXJjZSgpO1xuICAgIHJldHVybiB0aGlzLnNvdXJjZXNbbmFtZV07XG4gIH1cblxuICBjbGVhciAoKSB7XG4gICAgdGhpcy5zb3VyY2VzID0ge307XG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLnNvdXJjZXMgPSB7fTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcmVTb3VyY2U7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUcmFjayB7XG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IuXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5pZCA9IC0xXG4gICAgdGhpcy5zZXF1ZW5jZU51bWJlciA9IDBcbiAgICB0aGlzLnNhbXBsZXMgPSBbXVxuICAgIHRoaXMuZHJvcHBlZFNhbXBsZXMgPSBbXVxuICAgIHRoaXMubGVuZ3RoID0gMFxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0IHRoZSB0cmFjay5cbiAgICovXG4gIHJlc2V0ICgpIHtcbiAgICB0aGlzLnNlcXVlbmNlTnVtYmVyID0gMFxuICAgIHRoaXMuc2FtcGxlcyA9IFtdXG4gICAgdGhpcy5sZW5ndGggPSAwXG4gIH1cbiAgLyoqXG4gICAqIGRlc3Ryb3kgdGhlIHRyYWNrLlxuICAgKi9cbiAgZGlzdHJveSAoKSB7XG4gICAgdGhpcy5yZXNldCgpXG4gICAgdGhpcy5pZCA9IC0xXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEF1ZGlvVHJhY2sgZXh0ZW5kcyBUcmFjayB7XG4gIC8qKlxuICAgKiBUaGUgY29uc3RydWN0b3IgZm9yIGF1ZGlvIHRyYWNrLlxuICAgKi9cbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLlRBRyA9ICdBdWRpb1RyYWNrJ1xuICAgIHRoaXMudHlwZSA9ICdhdWRpbydcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVmlkZW9UcmFjayBleHRlbmRzIFRyYWNrIHtcbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgdmlkZW8gdHJhY2suXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuVEFHID0gJ1ZpZGVvVHJhY2snXG4gICAgdGhpcy50eXBlID0gJ3ZpZGVvJ1xuICAgIHRoaXMuZHJvcHBlZCA9IDBcbiAgfVxuICAvKipcbiAgICogcmVzZXQgdGhlIHZpZGVvIHRyYWNrLlxuICAgKi9cbiAgcmVzZXQgKCkge1xuICAgIHRoaXMuc2VxdWVuY2VOdW1iZXIgPSAwXG4gICAgdGhpcy5zYW1wbGVzID0gW11cbiAgICB0aGlzLmxlbmd0aCA9IDBcbiAgICB0aGlzLmRyb3BwZWQgPSAwXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRyYWNrcyB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLmF1ZGlvVHJhY2sgPSBudWxsXG4gICAgdGhpcy52aWRlb1RyYWNrID0gbnVsbFxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5hdWRpb1RyYWNrID0gbnVsbFxuICAgIHRoaXMudmlkZW9UcmFjayA9IG51bGxcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIE5hbHVuaXQ6IHJlcXVpcmUoJy4vc3JjL2gyNjQvbmFsdW5pdCcpLmRlZmF1bHQsXG4gIFNwc1BhcnNlcjogcmVxdWlyZSgnLi9zcmMvaDI2NC9uYWx1bml0L3NwcycpLmRlZmF1bHQsXG5cbiAgQ29tcGF0aWJpbGl0eTogcmVxdWlyZSgnLi9zcmMvY29tcGF0aWJpbGl0eScpLmRlZmF1bHRcbn07XG4iLCJcbmNsYXNzIEFBQyB7XG5cbiAgc3RhdGljIGdldFNpbGVudEZyYW1lKGNvZGVjLCBjaGFubmVsQ291bnQpIHtcbiAgICBpZiAoY29kZWMgPT09ICdtcDRhLjQwLjInKSB7XG4gICAgICAvLyBoYW5kbGUgTEMtQUFDXG4gICAgICBpZiAoY2hhbm5lbENvdW50ID09PSAxKSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMywgMHg4MF0pO1xuICAgICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDIxLCAweDAwLCAweDQ5LCAweDkwLCAweDAyLCAweDE5LCAweDAwLCAweDIzLCAweDgwXSk7XG4gICAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gMykge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4OGVdKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSA0KSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4MCwgMHgyYywgMHg4MCwgMHgwOCwgMHgwMiwgMHgzOF0pO1xuICAgICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDAwLCAweGM4LCAweDAwLCAweDgwLCAweDIwLCAweDg0LCAweDAxLCAweDI2LCAweDQwLCAweDA4LCAweDY0LCAweDAwLCAweDgyLCAweDMwLCAweDA0LCAweDk5LCAweDAwLCAweDIxLCAweDkwLCAweDAyLCAweDM4XSk7XG4gICAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gNikge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4ODIsIDB4MzAsIDB4MDQsIDB4OTksIDB4MDAsIDB4MjEsIDB4OTAsIDB4MDIsIDB4MDAsIDB4YjIsIDB4MDAsIDB4MjAsIDB4MDgsIDB4ZTBdKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaGFuZGxlIEhFLUFBQyAobXA0YS40MC41IC8gbXA0YS40MC4yOSlcbiAgICAgIGlmIChjaGFubmVsQ291bnQgPT09IDEpIHtcbiAgICAgICAgLy8gZmZtcGVnIC15IC1mIGxhdmZpIC1pIFwiYWV2YWxzcmM9MDpkPTAuMDVcIiAtYzphIGxpYmZka19hYWMgLXByb2ZpbGU6YSBhYWNfaGUgLWI6YSA0ayBvdXRwdXQuYWFjICYmIGhleGR1bXAgLXYgLWUgJzE2LzEgXCIweCV4LFwiIFwiXFxuXCInIC12IG91dHB1dC5hYWNcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDEsIDB4NDAsIDB4MjIsIDB4ODAsIDB4YTMsIDB4NGUsIDB4ZTYsIDB4ODAsIDB4YmEsIDB4OCwgMHgwLCAweDAsIDB4MCwgMHgxYywgMHg2LCAweGYxLCAweGMxLCAweGEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWVdKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSAyKSB7XG4gICAgICAgIC8vIGZmbXBlZyAteSAtZiBsYXZmaSAtaSBcImFldmFsc3JjPTB8MDpkPTAuMDVcIiAtYzphIGxpYmZka19hYWMgLXByb2ZpbGU6YSBhYWNfaGVfdjIgLWI6YSA0ayBvdXRwdXQuYWFjICYmIGhleGR1bXAgLXYgLWUgJzE2LzEgXCIweCV4LFwiIFwiXFxuXCInIC12IG91dHB1dC5hYWNcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDEsIDB4NDAsIDB4MjIsIDB4ODAsIDB4YTMsIDB4NWUsIDB4ZTYsIDB4ODAsIDB4YmEsIDB4OCwgMHgwLCAweDAsIDB4MCwgMHgwLCAweDk1LCAweDAsIDB4NiwgMHhmMSwgMHhhMSwgMHhhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVlXSk7XG4gICAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gMykge1xuICAgICAgICAvLyBmZm1wZWcgLXkgLWYgbGF2ZmkgLWkgXCJhZXZhbHNyYz0wfDB8MDpkPTAuMDVcIiAtYzphIGxpYmZka19hYWMgLXByb2ZpbGU6YSBhYWNfaGVfdjIgLWI6YSA0ayBvdXRwdXQuYWFjICYmIGhleGR1bXAgLXYgLWUgJzE2LzEgXCIweCV4LFwiIFwiXFxuXCInIC12IG91dHB1dC5hYWNcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDEsIDB4NDAsIDB4MjIsIDB4ODAsIDB4YTMsIDB4NWUsIDB4ZTYsIDB4ODAsIDB4YmEsIDB4OCwgMHgwLCAweDAsIDB4MCwgMHgwLCAweDk1LCAweDAsIDB4NiwgMHhmMSwgMHhhMSwgMHhhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVhLCAweDVlXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQUFDO1xuIiwiaW1wb3J0IHtFVkVOVFN9IGZyb20gJ3hncGxheWVyLXV0aWxzJ1xuaW1wb3J0IEFBQyBmcm9tICcuL2FhYy9hYWMtaGVscGVyJ1xuXG5jb25zdCB7UkVNVVhfRVZFTlRTLCBERU1VWF9FVkVOVFN9ID0gRVZFTlRTXG5cbmNsYXNzIENvbXBhdGliaWxpdHkge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5uZXh0QXVkaW9EdHMgPSAwIC8vIOaooeaLn+S4i+S4gOautemfs+mikeaVsOaNrueahGR0c1xuICAgIHRoaXMubmV4dFZpZGVvRHRzID0gMCAvLyDmqKHmi5/kuIvkuIDmrrXop4bpopHmlbDmja7nmoRkdHNcblxuICAgIHRoaXMubGFzdEF1ZGlvU2FtcGxlc0xlbiA9IDAgLy8g5LiK5LiA5q616Z+z6aKR5pWw5o2u55qE6ZW/5bqmXG4gICAgdGhpcy5sYXN0VmlkZW9TYW1wbGVzTGVuID0gMCAvLyDkuIrkuIDmrrXop4bpopHmlbDmja7nmoTplb/luqZcblxuICAgIHRoaXMubGFzdFZpZGVvRHRzID0gdW5kZWZpbmVkIC8vIOS4iuS4gOautemfs+mikeaVsOaNrueahOmVv+W6plxuICAgIHRoaXMubGFzdEF1ZGlvRHRzID0gdW5kZWZpbmVkIC8vIOS4iuS4gOauteinhumikeaVsOaNrueahOmVv+W6plxuXG4gICAgdGhpcy5hbGxBdWRpb1NhbXBsZXNDb3VudCA9IDAgLy8g6Z+z6aKR5oC75pWw5o2u6YePKOWOn+Wni+W4pylcbiAgICB0aGlzLmFsbFZpZGVvU2FtcGxlc0NvdW50ID0gMCAvLyDop4bpopHmgLvmlbDmja7ph48o5Y6f5aeL5binKVxuXG4gICAgdGhpcy5fZmlyc3RBdWRpb1NhbXBsZSA9IG51bGxcbiAgICB0aGlzLl9maXJzdFZpZGVvU2FtcGxlID0gbnVsbFxuXG4gICAgdGhpcy5maWxsZWRBdWRpb1NhbXBsZXMgPSBbXSAvLyDooaXlhYXpn7PpopHluKfvvIjvvIlcbiAgICB0aGlzLmZpbGxlZFZpZGVvU2FtcGxlcyA9IFtdIC8vIOihpeWFheinhumikeW4p++8iO+8iVxuXG4gICAgdGhpcy5fdmlkZW9MYXJnZUdhcCA9IDBcbiAgICB0aGlzLl9hdWRpb0xhcmdlR2FwID0gMFxuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgdGhpcy5iZWZvcmUoUkVNVVhfRVZFTlRTLlJFTVVYX01FRElBLCB0aGlzLmRvRml4LmJpbmQodGhpcykpXG4gIH1cblxuICByZXNldCAoKSB7XG4gICAgdGhpcy5uZXh0QXVkaW9EdHMgPSBudWxsIC8vIOS8sOeul+S4i+S4gOautemfs+mikeaVsOaNrueahGR0c1xuICAgIHRoaXMubmV4dFZpZGVvRHRzID0gbnVsbCAvLyDkvLDnrpfkuIvkuIDmrrXop4bpopHmlbDmja7nmoRkdHNcblxuICAgIHRoaXMubGFzdEF1ZGlvU2FtcGxlc0xlbiA9IDAgLy8g5LiK5LiA5q616Z+z6aKR5pWw5o2u55qE6ZW/5bqmXG4gICAgdGhpcy5sYXN0VmlkZW9TYW1wbGVzTGVuID0gMCAvLyDkuIrkuIDmrrXop4bpopHmlbDmja7nmoTplb/luqZcblxuICAgIHRoaXMubGFzdFZpZGVvRHRzID0gdW5kZWZpbmVkIC8vIOS4iuS4gOautemfs+mikeaVsOaNrueahOmVv+W6plxuICAgIHRoaXMubGFzdEF1ZGlvRHRzID0gdW5kZWZpbmVkIC8vIOS4iuS4gOauteinhumikeaVsOaNrueahOmVv+W6plxuXG4gICAgLy8gdGhpcy5hbGxBdWRpb1NhbXBsZXNDb3VudCA9IDAgLy8g6Z+z6aKR5oC75pWw5o2u6YePKOWOn+Wni+W4pylcbiAgICAvLyB0aGlzLmFsbFZpZGVvU2FtcGxlc0NvdW50ID0gMCAvLyDop4bpopHmgLvmlbDmja7ph48o5Y6f5aeL5binKVxuXG4gICAgLy8gdGhpcy5fZmlyc3RBdWRpb1NhbXBsZSA9IG51bGxcbiAgICAvLyB0aGlzLl9maXJzdFZpZGVvU2FtcGxlID0gbnVsbFxuXG4gICAgdGhpcy5maWxsZWRBdWRpb1NhbXBsZXMgPSBbXSAvLyDooaXlhYXpn7PpopHluKfvvIjvvIlcbiAgICB0aGlzLmZpbGxlZFZpZGVvU2FtcGxlcyA9IFtdIC8vIOihpeWFheinhumikeW4p++8iO+8iVxuICB9XG5cbiAgZG9GaXggKCkge1xuICAgIGNvbnN0IHsgaXNGaXJzdEF1ZGlvU2FtcGxlcywgaXNGaXJzdFZpZGVvU2FtcGxlcyB9ID0gdGhpcy5nZXRGaXJzdFNhbXBsZSgpXG5cbiAgICAvLyB0aGlzLnJlbW92ZUludmFsaWRTYW1wbGVzKClcblxuICAgIHRoaXMucmVjb3JkU2FtcGxlc0NvdW50KClcblxuICAgIGlmICh0aGlzLl9maXJzdFZpZGVvU2FtcGxlKSB7XG4gICAgICB0aGlzLmZpeFJlZlNhbXBsZUR1cmF0aW9uKHRoaXMudmlkZW9UcmFjay5tZXRhLCB0aGlzLnZpZGVvVHJhY2suc2FtcGxlcylcbiAgICB9XG4gICAgaWYgKHRoaXMuX2ZpcnN0QXVkaW9TYW1wbGUpIHtcbiAgICAgIHRoaXMuZml4UmVmU2FtcGxlRHVyYXRpb24odGhpcy5hdWRpb1RyYWNrLm1ldGEsIHRoaXMuYXVkaW9UcmFjay5zYW1wbGVzKVxuICAgIH1cblxuICAgIGNvbnN0IHsgY2hhbmdlZDogdmlkZW9DaGFuZ2VkLCBjaGFuZ2VkSWR4OiB2aWRlb0NoYW5nZWRJZHggfSA9IENvbXBhdGliaWxpdHkuZGV0YWN0Q2hhbmdlU3RyZWFtKHRoaXMudmlkZW9UcmFjay5zYW1wbGVzKVxuICAgIGlmICh2aWRlb0NoYW5nZWQgJiYgIWlzRmlyc3RBdWRpb1NhbXBsZXMpIHtcbiAgICAgIHRoaXMuZml4Q2hhbmdlU3RyZWFtVmlkZW8odmlkZW9DaGFuZ2VkSWR4KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRvRml4VmlkZW8oaXNGaXJzdFZpZGVvU2FtcGxlcylcbiAgICB9XG5cbiAgICBjb25zdCB7IGNoYW5nZWQ6IGF1ZGlvQ2hhbmdlZCwgY2hhbmdlZElkeDogYXVkaW9DaGFuZ2VkSWR4IH0gPSBDb21wYXRpYmlsaXR5LmRldGFjdENoYW5nZVN0cmVhbSh0aGlzLmF1ZGlvVHJhY2suc2FtcGxlcylcbiAgICBpZiAoYXVkaW9DaGFuZ2VkKSB7XG4gICAgICB0aGlzLmZpeENoYW5nZVN0cmVhbUF1ZGlvKGF1ZGlvQ2hhbmdlZElkeClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb0ZpeEF1ZGlvKGlzRmlyc3RBdWRpb1NhbXBsZXMpXG4gICAgfVxuXG4gICAgLy8gdGhpcy5yZW1vdmVJbnZhbGlkU2FtcGxlcygpXG4gIH1cblxuICBkb0ZpeFZpZGVvIChmaXJzdCwgc3RyZWFtQ2hhbmdlU3RhcnQpIHtcbiAgICBsZXQge3NhbXBsZXM6IHZpZGVvU2FtcGxlcywgbWV0YX0gPSB0aGlzLnZpZGVvVHJhY2tcblxuICAgIGlmIChtZXRhLmZyYW1lUmF0ZSAmJiBtZXRhLmZyYW1lUmF0ZS5maXhlZCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXZpZGVvU2FtcGxlcyB8fCAhdmlkZW9TYW1wbGVzLmxlbmd0aCB8fCAhdGhpcy5fZmlyc3RWaWRlb1NhbXBsZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gY29uc29sZS5sb2coYHZpZGVvIGxhc3RTYW1wbGUsICR7dmlkZW9TYW1wbGVzW3ZpZGVvU2FtcGxlcy5sZW5ndGggLSAxXS5kdHN9YClcblxuICAgIGNvbnN0IGZpcnN0U2FtcGxlID0gdmlkZW9TYW1wbGVzWzBdXG5cbiAgICBjb25zdCBzYW1wbGVzTGVuID0gdmlkZW9TYW1wbGVzLmxlbmd0aDtcblxuICAgIC8vIHN0ZXAwLuS/ruWkjWhsc+a1geWHuueOsOW3qOWkp2dhcO+8jOmcgOimgeW8uuWItumHjeWumuS9jeeahOmXrumimFxuICAgIGlmICh0aGlzLl92aWRlb0xhcmdlR2FwID4gMCkge1xuICAgICAgQ29tcGF0aWJpbGl0eS5kb0ZpeExhcmdlR2FwKHZpZGVvU2FtcGxlcywgdGhpcy5fdmlkZW9MYXJnZUdhcClcbiAgICB9XG5cbiAgICBpZiAoZmlyc3RTYW1wbGUuZHRzICE9PSB0aGlzLl9maXJzdFZpZGVvU2FtcGxlLmR0cyAmJiAoc3RyZWFtQ2hhbmdlU3RhcnQgfHwgQ29tcGF0aWJpbGl0eS5kZXRlY3RMYXJnZUdhcCh0aGlzLm5leHRWaWRlb0R0cywgZmlyc3RTYW1wbGUpKSkge1xuICAgICAgaWYgKHN0cmVhbUNoYW5nZVN0YXJ0KSB7XG4gICAgICAgIHRoaXMubmV4dFZpZGVvRHRzID0gc3RyZWFtQ2hhbmdlU3RhcnQgLy8gRklYOiBIbHPkuK3pgJTliIdjb2RlY++8jOWcqOWmguaenOebtOaOpXNlZWvliLDlkI7pnaLnmoTngrnkvJrlr7zoh7RsYXJnZUdhcOiuoeeul+Wksei0pVxuICAgICAgfVxuXG4gICAgICB0aGlzLl92aWRlb0xhcmdlR2FwID0gdGhpcy5uZXh0VmlkZW9EdHMgLSBmaXJzdFNhbXBsZS5kdHNcbiAgICAgIENvbXBhdGliaWxpdHkuZG9GaXhMYXJnZUdhcCh2aWRlb1NhbXBsZXMsIHRoaXMuX3ZpZGVvTGFyZ2VHYXApXG4gICAgfVxuXG4gICAgY29uc3QgZmlyc3REdHMgPSBmaXJzdFNhbXBsZS5kdHNcblxuICAgIC8vIHN0ZXAxLiDkv67lpI3kuI5hdWRpb+mmluW4p+W3rui3neWkquWkp+eahOmXrumimFxuICAgIGlmIChmaXJzdCAmJiB0aGlzLl9maXJzdEF1ZGlvU2FtcGxlKSB7XG4gICAgICBjb25zdCB2aWRlb0ZpcnN0RHRzID0gdGhpcy5fZmlyc3RWaWRlb1NhbXBsZS5kdHNcbiAgICAgIGNvbnN0IGF1ZGlvRmlyc3REdHMgPSB0aGlzLl9maXJzdEF1ZGlvU2FtcGxlLmR0c1xuICAgICAgY29uc3QgZ2FwID0gdmlkZW9GaXJzdER0cyAtIGF1ZGlvRmlyc3REdHNcbiAgICAgIGlmIChnYXAgPiAoMiAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pKSB7XG4gICAgICAgIGNvbnN0IGZpbGxDb3VudCA9IE1hdGguZmxvb3IoZ2FwIC8gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbilcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGxDb3VudDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgY2xvbmVkRmlyc3RTYW1wbGUgPSBPYmplY3QuYXNzaWduKHt9LCBmaXJzdFNhbXBsZSkgLy8g6KeG6aKR5aS06YOo5bin57y65aSx6ZyA6KaB5aSN5Yi256ys5LiA5binXG4gICAgICAgICAgLy8g6YeN5paw6K6h566Xc2FtcGxl55qEZHRz5ZKMcHRzXG4gICAgICAgICAgY2xvbmVkRmlyc3RTYW1wbGUuZHRzID0gdmlkZW9GaXJzdER0cyAtIChpICsgMSkgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG4gICAgICAgICAgY2xvbmVkRmlyc3RTYW1wbGUucHRzID0gY2xvbmVkRmlyc3RTYW1wbGUuZHRzICsgY2xvbmVkRmlyc3RTYW1wbGUuY3RzXG5cbiAgICAgICAgICB2aWRlb1NhbXBsZXMudW5zaGlmdChjbG9uZWRGaXJzdFNhbXBsZSlcblxuICAgICAgICAgIHRoaXMuZmlsbGVkVmlkZW9TYW1wbGVzLnB1c2goe1xuICAgICAgICAgICAgZHRzOiBjbG9uZWRGaXJzdFNhbXBsZS5kdHMsXG4gICAgICAgICAgICBzaXplOiBjbG9uZWRGaXJzdFNhbXBsZS5kYXRhLmJ5dGVMZW5ndGhcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGdhcFxuICAgIC8vIHN0ZXAyLiDkv67lpI1zYW1wbGVz5q615LmL6Ze055qE6Ze06Led6Zeu6aKY44CBXG4gICAgaWYgKHRoaXMubmV4dFZpZGVvRHRzKSB7XG4gICAgICAvLyBzdGVwMS4g5aSE55CGc2FtcGxlc+auteS5i+mXtOeahOS4ouW4p+aDheWGtVxuICAgICAgLy8g5b2T5Y+R546wZHVyYXRpb27lt67ot53lpKfkuo4y5bin5pe26L+b6KGM6KGl5binXG4gICAgICBnYXAgPSBmaXJzdER0cyAtIHRoaXMubmV4dFZpZGVvRHRzXG4gICAgICBjb25zdCBhYnNHYXAgPSBNYXRoLmFicyhnYXApXG4gICAgICBpZiAoZ2FwID4gKDIgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSkge1xuICAgICAgICBjb25zdCBmaWxsRnJhbWVDb3VudCA9IE1hdGguZmxvb3IoZ2FwIC8gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbilcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGxGcmFtZUNvdW50OyBpKyspIHtcbiAgICAgICAgICBjb25zdCBjbG9uZWRTYW1wbGUgPSBPYmplY3QuYXNzaWduKHt9LCB2aWRlb1NhbXBsZXNbMF0pXG4gICAgICAgICAgY29uc3QgY29tcHV0ZWQgPSBmaXJzdER0cyAtIChpICsgMSkgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG5cbiAgICAgICAgICBjbG9uZWRTYW1wbGUuZHRzID0gY29tcHV0ZWQgPiB0aGlzLm5leHRWaWRlb0R0cyA/IGNvbXB1dGVkIDogdGhpcy5uZXh0VmlkZW9EdHMgLy8g6KGl55qE56ys5LiA5bin5LiA5a6a6KaB5pivbmV4dFZpZGVvRHRzXG4gICAgICAgICAgY2xvbmVkU2FtcGxlLnB0cyA9IGNsb25lZFNhbXBsZS5kdHMgKyBjbG9uZWRTYW1wbGUuY3RzXG5cbiAgICAgICAgICB0aGlzLnZpZGVvVHJhY2suc2FtcGxlcy51bnNoaWZ0KGNsb25lZFNhbXBsZSlcblxuICAgICAgICAgIHRoaXMuZmlsbGVkVmlkZW9TYW1wbGVzLnB1c2goe1xuICAgICAgICAgICAgZHRzOiBjbG9uZWRTYW1wbGUuZHRzLFxuICAgICAgICAgICAgc2l6ZTogY2xvbmVkU2FtcGxlLmRhdGEuYnl0ZUxlbmd0aFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoYWJzR2FwIDw9IG1ldGEucmVmU2FtcGxlRHVyYXRpb24gJiYgYWJzR2FwID4gMCkge1xuICAgICAgICAvLyDlvZPlt67ot53lnKgrLeS4gOW4p+S5i+mXtOaXtuWwhuesrOS4gOW4p+eahGR0c+W8uuihjOWumuS9jeWIsOacn+acm+S9jee9rlxuICAgICAgICAvLyBjb25zb2xlLmxvZygn6YeN5a6a5L2N6KeG6aKR5binZHRzJywgdmlkZW9TYW1wbGVzWzBdLmR0cywgdGhpcy5uZXh0VmlkZW9EdHMpXG4gICAgICAgIHZpZGVvU2FtcGxlc1swXS5kdHMgPSB0aGlzLm5leHRWaWRlb0R0c1xuICAgICAgICB2aWRlb1NhbXBsZXNbMF0ub3JpZ2luRHRzID0gdmlkZW9TYW1wbGVzWzBdLmR0c1xuICAgICAgICB2aWRlb1NhbXBsZXNbMF0uY3RzID0gdmlkZW9TYW1wbGVzWzBdLmN0cyAhPT0gdW5kZWZpbmVkID8gdmlkZW9TYW1wbGVzWzBdLmN0cyA6IHZpZGVvU2FtcGxlc1swXS5wdHMgLSB2aWRlb1NhbXBsZXNbMF0uZHRzXG4gICAgICAgIHZpZGVvU2FtcGxlc1swXS5wdHMgPSB2aWRlb1NhbXBsZXNbMF0uZHRzICsgdmlkZW9TYW1wbGVzWzBdLmN0c1xuICAgICAgfSBlbHNlIGlmIChnYXAgPCAwKSB7XG4gICAgICAgIC8vIOWHuueOsOWkp+eahGdhcFxuICAgICAgICBDb21wYXRpYmlsaXR5LmRvRml4TGFyZ2VHYXAodmlkZW9TYW1wbGVzLCAoLTEgKiBnYXApKVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBsYXN0RHRzID0gdmlkZW9TYW1wbGVzW3ZpZGVvU2FtcGxlcy5sZW5ndGggLSAxXS5kdHM7XG5cbiAgICBjb25zdCBsYXN0U2FtcGxlRHVyYXRpb24gPSB2aWRlb1NhbXBsZXMubGVuZ3RoID49IDIgPyBsYXN0RHRzIC0gdmlkZW9TYW1wbGVzW3ZpZGVvU2FtcGxlcy5sZW5ndGggLSAyXS5kdHMgOiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG5cbiAgICB0aGlzLmxhc3RWaWRlb1NhbXBsZXNMZW4gPSBzYW1wbGVzTGVuXG4gICAgdGhpcy5uZXh0VmlkZW9EdHMgPSBsYXN0RHRzICsgbGFzdFNhbXBsZUR1cmF0aW9uXG4gICAgdGhpcy5sYXN0VmlkZW9EdHMgPSBsYXN0RHRzXG5cbiAgICAvLyBzdGVwMi4g5L+u5aSNc2FtcGxl5q615LmL5YaF55qE6Ze06Led6Zeu6aKYXG4gICAgLy8gc3RlcDMuIOS/ruWkjXNhbXBsZXPmrrXlhoXpg6jnmoRkdHPlvILluLjpl67pophcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdmlkZW9TYW1wbGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50ID0gdmlkZW9TYW1wbGVzW2ldXG4gICAgICBjb25zdCBuZXh0ID0gdmlkZW9TYW1wbGVzW2kgKyAxXVxuXG4gICAgICBpZiAoIW5leHQpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGR1cmF0aW9uID0gbmV4dC5kdHMgLSBjdXJyZW50LmR0cztcblxuICAgICAgaWYgKGR1cmF0aW9uID4gKDIgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSkge1xuICAgICAgICAvLyDkuKTluKfkuYvpl7Tpl7TpmpTlpKrlpKfvvIzpnIDopoHooaXnqbrnmb3luKdcbiAgICAgICAgbGV0IGZpbGxGcmFtZUNvdW50ID0gTWF0aC5mbG9vcihkdXJhdGlvbiAvIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pXG5cbiAgICAgICAgbGV0IGZpbGxGcmFtZUlkeCA9IDBcbiAgICAgICAgd2hpbGUgKGZpbGxGcmFtZUlkeCA8IGZpbGxGcmFtZUNvdW50KSB7XG4gICAgICAgICAgY29uc3QgZmlsbEZyYW1lID0gT2JqZWN0LmFzc2lnbih7fSwgbmV4dClcbiAgICAgICAgICBmaWxsRnJhbWUuZHRzID0gY3VycmVudC5kdHMgKyAoZmlsbEZyYW1lSWR4ICsgMSkgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG4gICAgICAgICAgZmlsbEZyYW1lLnB0cyA9IGZpbGxGcmFtZS5kdHMgKyBmaWxsRnJhbWUuY3RzXG4gICAgICAgICAgaWYgKGZpbGxGcmFtZSA8IG5leHQuZHRzKSB7XG4gICAgICAgICAgICB2aWRlb1NhbXBsZXMuc3BsaWNlKGksIDAsIGZpbGxGcmFtZSlcblxuICAgICAgICAgICAgdGhpcy5maWxsZWRWaWRlb1NhbXBsZXMucHVzaCh7XG4gICAgICAgICAgICAgIGR0czogZmlsbEZyYW1lLmR0cyxcbiAgICAgICAgICAgICAgc2l6ZTogZmlsbEZyYW1lLmRhdGEuYnl0ZUxlbmd0aFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmaWxsRnJhbWVJZHgrK1xuICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudmlkZW9UcmFjay5zYW1wbGVzID0gdmlkZW9TYW1wbGVzO1xuICB9XG5cbiAgZG9GaXhBdWRpbyAoZmlyc3QsIHN0cmVhbUNoYW5nZVN0YXJ0KSB7XG4gICAgbGV0IHtzYW1wbGVzOiBhdWRpb1NhbXBsZXMsIG1ldGF9ID0gdGhpcy5hdWRpb1RyYWNrXG5cbiAgICBpZiAoIWF1ZGlvU2FtcGxlcyB8fCAhYXVkaW9TYW1wbGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKGBhdWRpbyBsYXN0U2FtcGxlLCAke2F1ZGlvU2FtcGxlc1thdWRpb1NhbXBsZXMubGVuZ3RoIC0gMV0uZHRzfWApXG5cbiAgICBjb25zdCBzYW1wbGVzTGVuID0gYXVkaW9TYW1wbGVzLmxlbmd0aDtcbiAgICBjb25zdCBzaWxlbnRGcmFtZSA9IEFBQy5nZXRTaWxlbnRGcmFtZShtZXRhLmNvZGVjLCBtZXRhLmNoYW5uZWxDb3VudClcblxuICAgIGNvbnN0IGZpcnN0U2FtcGxlID0gdGhpcy5fZmlyc3RBdWRpb1NhbXBsZVxuXG4gICAgY29uc3QgX2ZpcnN0U2FtcGxlID0gYXVkaW9TYW1wbGVzWzBdXG4gICAgLy8g5a+5YXVkaW9TYW1wbGVz5oyJ54WnZHRz5YGa5o6S5bqPXG4gICAgLy8gYXVkaW9TYW1wbGVzID0gQ29tcGF0aWJpbGl0eS5zb3J0QXVkaW9TYW1wbGVzKGF1ZGlvU2FtcGxlcylcbiAgICBpZiAodGhpcy5fYXVkaW9MYXJnZUdhcCA+IDApIHtcbiAgICAgIENvbXBhdGliaWxpdHkuZG9GaXhMYXJnZUdhcChhdWRpb1NhbXBsZXMsIHRoaXMuX2F1ZGlvTGFyZ2VHYXApXG4gICAgfVxuXG4gICAgaWYgKF9maXJzdFNhbXBsZS5kdHMgIT09IHRoaXMuX2ZpcnN0QXVkaW9TYW1wbGUuZHRzICYmIChzdHJlYW1DaGFuZ2VTdGFydCB8fCBDb21wYXRpYmlsaXR5LmRldGVjdExhcmdlR2FwKHRoaXMubmV4dEF1ZGlvRHRzLCBfZmlyc3RTYW1wbGUpKSkge1xuICAgICAgaWYgKHN0cmVhbUNoYW5nZVN0YXJ0KSB7XG4gICAgICAgIHRoaXMubmV4dEF1ZGlvRHRzID0gc3RyZWFtQ2hhbmdlU3RhcnQgLy8gRklYOiBIbHPkuK3pgJTliIdjb2RlY++8jOWcqOWmguaenOebtOaOpXNlZWvliLDlkI7pnaLnmoTngrnkvJrlr7zoh7RsYXJnZUdhcOiuoeeul+Wksei0pVxuICAgICAgfVxuICAgICAgdGhpcy5fYXVkaW9MYXJnZUdhcCA9IHRoaXMubmV4dEF1ZGlvRHRzIC0gX2ZpcnN0U2FtcGxlLmR0c1xuICAgICAgQ29tcGF0aWJpbGl0eS5kb0ZpeExhcmdlR2FwKGF1ZGlvU2FtcGxlcywgdGhpcy5fYXVkaW9MYXJnZUdhcClcbiAgICB9XG4gICAgLy8gc3RlcDAuIOmmluW4p+S4jnZpZGVv6aaW5bin6Ze06Led5aSn55qE6Zeu6aKYXG4gICAgaWYgKHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUgJiYgZmlyc3QpIHtcbiAgICAgIGNvbnN0IHZpZGVvRmlyc3RQdHMgPSB0aGlzLl9maXJzdFZpZGVvU2FtcGxlLnB0cyA/IHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUucHRzIDogdGhpcy5fZmlyc3RWaWRlb1NhbXBsZS5kdHMgKyB0aGlzLl9maXJzdFZpZGVvU2FtcGxlLmN0c1xuXG4gICAgICBpZiAoZmlyc3RTYW1wbGUuZHRzIC0gdmlkZW9GaXJzdFB0cyA+IG1ldGEucmVmU2FtcGxlRHVyYXRpb24pIHtcbiAgICAgICAgY29uc3Qgc2lsZW50U2FtcGxlQ291bnQgPSBNYXRoLmZsb29yKChmaXJzdFNhbXBsZS5kdHMgLSB2aWRlb0ZpcnN0UHRzKSAvIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pXG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaWxlbnRTYW1wbGVDb3VudDsgaSsrKSB7XG4gICAgICAgICAgY29uc3Qgc2lsZW50U2FtcGxlID0ge1xuICAgICAgICAgICAgZGF0YTogc2lsZW50RnJhbWUsXG4gICAgICAgICAgICBkYXRhc2l6ZTogc2lsZW50RnJhbWUuYnl0ZUxlbmd0aCxcbiAgICAgICAgICAgIGR0czogZmlyc3RTYW1wbGUuZHRzIC0gKGkgKyAxKSAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb24sXG4gICAgICAgICAgICBmaWx0ZXJlZDogMFxuICAgICAgICAgIH1cblxuICAgICAgICAgIGF1ZGlvU2FtcGxlcy51bnNoaWZ0KHNpbGVudFNhbXBsZSlcblxuICAgICAgICAgIHRoaXMuZmlsbGVkQXVkaW9TYW1wbGVzLnB1c2goe1xuICAgICAgICAgICAgZHRzOiBzaWxlbnRTYW1wbGUuZHRzLFxuICAgICAgICAgICAgc2l6ZTogc2lsZW50U2FtcGxlLmRhdGEuYnl0ZUxlbmd0aFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgZ2FwXG4gICAgY29uc3QgZmlyc3REdHMgPSBhdWRpb1NhbXBsZXNbMF0uZHRzXG5cbiAgICBpZiAodGhpcy5uZXh0QXVkaW9EdHMpIHtcbiAgICAgIC8vIHN0ZXAxLiDlpITnkIZzYW1wbGVz5q615LmL6Ze055qE5Lii5bin5oOF5Ya1XG4gICAgICAvLyDlvZPlj5HnjrBkdXJhdGlvbuW3rui3neWkp+S6jjHluKfml7bov5vooYzooaXluKdcbiAgICAgIGdhcCA9IGZpcnN0RHRzIC0gdGhpcy5uZXh0QXVkaW9EdHNcbiAgICAgIGNvbnN0IGFic0dhcCA9IE1hdGguYWJzKGdhcClcblxuICAgICAgaWYgKGFic0dhcCA+IG1ldGEucmVmU2FtcGxlRHVyYXRpb24gJiYgc2FtcGxlc0xlbiA9PT0gMSAmJiB0aGlzLmxhc3RBdWRpb1NhbXBsZXNMZW4gPT09IDEpIHtcbiAgICAgICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbkZpeGVkID0gdW5kZWZpbmVkXG4gICAgICB9XG5cbiAgICAgIGlmIChnYXAgPiAoMiAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pKSB7XG4gICAgICAgIGlmIChzYW1wbGVzTGVuID09PSAxICYmIHRoaXMubGFzdEF1ZGlvU2FtcGxlc0xlbiA9PT0gMSkge1xuICAgICAgICAgIC8vIOWmguaenHNhbXBsZeeahGxlbmd0aOS4gOebtOaYrzHvvIzogIzkuJTkuIDnm7TkuI3nrKblkIhyZWZTYW1wbGVEdXJhdGlvbu+8jOmcgOimgeWKqOaAgeS/ruaUuXJlZlNhbXBsZUR1cmF0aW9uXG4gICAgICAgICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbkZpeGVkID0gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbkZpeGVkICE9PSB1bmRlZmluZWQgPyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uRml4ZWQgKyBnYXAgOiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uICsgZ2FwXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3Qgc2lsZW50RnJhbWVDb3VudCA9IE1hdGguZmxvb3IoZ2FwIC8gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbilcblxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2lsZW50RnJhbWVDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjb21wdXRlZCA9IGZpcnN0RHRzIC0gKGkgKyAxKSAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb25cbiAgICAgICAgICAgIGNvbnN0IHNpbGVudFNhbXBsZSA9IE9iamVjdC5hc3NpZ24oe30sIGF1ZGlvU2FtcGxlc1swXSwge1xuICAgICAgICAgICAgICBkdHM6IGNvbXB1dGVkID4gdGhpcy5uZXh0QXVkaW9EdHMgPyBjb21wdXRlZCA6IHRoaXMubmV4dEF1ZGlvRHRzXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB0aGlzLmZpbGxlZEF1ZGlvU2FtcGxlcy5wdXNoKHtcbiAgICAgICAgICAgICAgZHRzOiBzaWxlbnRTYW1wbGUuZHRzLFxuICAgICAgICAgICAgICBzaXplOiBzaWxlbnRTYW1wbGUuZGF0YS5ieXRlTGVuZ3RoXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMudW5zaGlmdChzaWxlbnRTYW1wbGUpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGFic0dhcCA8PSBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uICYmIGFic0dhcCA+IDApIHtcbiAgICAgICAgLy8g5b2T5beu6Led5q+U6L6D5bCP55qE5pe25YCZ5bCG6Z+z6aKR5bin6YeN5a6a5L2NXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCfph43lrprkvY3pn7PpopHluKdkdHMnLCBhdWRpb1NhbXBsZXNbMF0uZHRzLCB0aGlzLm5leHRBdWRpb0R0cylcbiAgICAgICAgYXVkaW9TYW1wbGVzWzBdLmR0cyA9IHRoaXMubmV4dEF1ZGlvRHRzXG4gICAgICAgIGF1ZGlvU2FtcGxlc1swXS5wdHMgPSB0aGlzLm5leHRBdWRpb0R0c1xuICAgICAgfSBlbHNlIGlmIChnYXAgPCAwKSB7XG4gICAgICAgIENvbXBhdGliaWxpdHkuZG9GaXhMYXJnZUdhcChhdWRpb1NhbXBsZXMsICgtMSAqIGdhcCkpXG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGxhc3REdHMgPSBhdWRpb1NhbXBsZXNbYXVkaW9TYW1wbGVzLmxlbmd0aCAtIDFdLmR0cztcbiAgICBjb25zdCBsYXN0U2FtcGxlRHVyYXRpb24gPSBhdWRpb1NhbXBsZXMubGVuZ3RoID49IDIgPyBsYXN0RHRzIC0gYXVkaW9TYW1wbGVzW2F1ZGlvU2FtcGxlcy5sZW5ndGggLSAyXS5kdHMgOiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG5cbiAgICB0aGlzLmxhc3RBdWRpb1NhbXBsZXNMZW4gPSBzYW1wbGVzTGVuO1xuICAgIHRoaXMubmV4dEF1ZGlvRHRzID0gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbkZpeGVkID8gbGFzdER0cyArIG1ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZCA6IGxhc3REdHMgKyBsYXN0U2FtcGxlRHVyYXRpb25cbiAgICB0aGlzLmxhc3RBdWRpb0R0cyA9IGxhc3REdHNcblxuICAgIC8vIHN0ZXAzLiDkv67lpI1zYW1wbGVz5q615YaF6YOo55qEZHRz5byC5bi46Zeu6aKYXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGF1ZGlvU2FtcGxlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgY3VycmVudCA9IGF1ZGlvU2FtcGxlc1tpXVxuICAgICAgY29uc3QgbmV4dCA9IGF1ZGlvU2FtcGxlc1tpICsgMV1cblxuICAgICAgaWYgKCFuZXh0KSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkdXJhdGlvbiA9IG5leHQuZHRzIC0gY3VycmVudC5kdHM7XG4gICAgICBhdWRpb1NhbXBsZXNbaV0uZHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICAgIC8qXG4gICAgICBpZiAoZHVyYXRpb24gPiAoMiAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pKSB7XG4gICAgICAgIC8vIOS4pOW4p+S5i+mXtOmXtOmalOWkquWkp++8jOmcgOimgeihpeepuueZveW4p1xuICAgICAgICAvKipcbiAgICAgICAgbGV0IHNpbGVudEZyYW1lQ291bnQgPSBNYXRoLmZsb29yKGR1cmF0aW9uIC8gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbilcbiAgICAgICAgbGV0IGZyYW1lSWR4ID0gMFxuXG4gICAgICAgIHdoaWxlIChmcmFtZUlkeCA8IHNpbGVudEZyYW1lQ291bnQpIHtcbiAgICAgICAgICBjb25zdCBzaWxlbnRTYW1wbGUgPSB7XG4gICAgICAgICAgICBkYXRhOiBzaWxlbnRGcmFtZSxcbiAgICAgICAgICAgIGRhdGFzaXplOiBzaWxlbnRGcmFtZS5ieXRlTGVuZ3RoLFxuICAgICAgICAgICAgZHRzOiBjdXJyZW50LmR0cyArIChmcmFtZUlkeCArIDEpICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbixcbiAgICAgICAgICAgIGZpbHRlcmVkOiAwLFxuICAgICAgICAgICAgaXNTaWxlbnQ6IHRydWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhdWRpb1NhbXBsZXMuc3BsaWNlKGksIDAsIHNpbGVudFNhbXBsZSlcblxuICAgICAgICAgIHRoaXMuZmlsbGVkQXVkaW9TYW1wbGVzLnB1c2goe1xuICAgICAgICAgICAgZHRzOiBzaWxlbnRTYW1wbGUuZHRzLFxuICAgICAgICAgICAgc2l6ZTogc2lsZW50U2FtcGxlLmRhdGEuYnl0ZUxlbmd0aFxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICBmcmFtZUlkeCsrXG4gICAgICAgICAgaSsrIC8vIOS4jeWvuemdmemfs+W4p+WBmuavlOi+g1xuICAgICAgICB9XG4gICAgICB9ICovXG4gICAgfVxuXG4gICAgdGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMgPSBDb21wYXRpYmlsaXR5LnNvcnRBdWRpb1NhbXBsZXMoYXVkaW9TYW1wbGVzKVxuICB9XG5cbiAgZml4Q2hhbmdlU3RyZWFtVmlkZW8gKGNoYW5nZUlkeCkge1xuICAgIGNvbnN0IHsgc2FtcGxlcywgbWV0YSB9ID0gdGhpcy52aWRlb1RyYWNrO1xuICAgIGNvbnN0IHByZXZEdHMgPSBjaGFuZ2VJZHggPT09IDAgPyB0aGlzLmdldFN0cmVhbUNoYW5nZVN0YXJ0KHNhbXBsZXNbMF0pIDogc2FtcGxlc1tjaGFuZ2VJZHggLSAxXS5kdHM7XG4gICAgY29uc3QgY3VyRHRzID0gc2FtcGxlc1tjaGFuZ2VJZHhdLmR0cztcbiAgICBjb25zdCBpc0NvbnRpbnVlID0gTWF0aC5hYnMocHJldkR0cyAtIGN1ckR0cykgPD0gMiAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb247XG5cbiAgICBpZiAoaXNDb250aW51ZSkge1xuICAgICAgaWYgKCFzYW1wbGVzW2NoYW5nZUlkeF0ub3B0aW9ucykge1xuICAgICAgICBzYW1wbGVzW2NoYW5nZUlkeF0ub3B0aW9ucyA9IHtcbiAgICAgICAgICBpc0NvbnRpbnVlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNhbXBsZXNbY2hhbmdlSWR4XS5vcHRpb25zLmlzQ29udGludWUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuZG9GaXhWaWRlbyhmYWxzZSlcbiAgICB9XG5cbiAgICBjb25zdCBmaXJzdFBhcnRTYW1wbGVzID0gc2FtcGxlcy5zbGljZSgwLCBjaGFuZ2VJZHgpO1xuICAgIGNvbnN0IHNlY29uZFBhcnRTYW1wbGVzID0gc2FtcGxlcy5zbGljZShjaGFuZ2VJZHgpO1xuICAgIGNvbnN0IGZpcnN0U2FtcGxlID0gc2FtcGxlc1swXVxuXG4gICAgY29uc3QgY2hhbmdlU2FtcGxlID0gc2Vjb25kUGFydFNhbXBsZXNbMF1cbiAgICBjb25zdCBmaXJzdFBhcnREdXJhdGlvbiA9IGNoYW5nZVNhbXBsZS5kdHMgLSBmaXJzdFNhbXBsZS5kdHNcbiAgICBjb25zdCBzdHJlYW1DaGFuZ2VTdGFydCA9IGZpcnN0U2FtcGxlLm9wdGlvbnMgJiYgZmlyc3RTYW1wbGUub3B0aW9ucy5zdGFydCArIGZpcnN0UGFydER1cmF0aW9uID8gZmlyc3RTYW1wbGUub3B0aW9ucy5zdGFydCA6IG51bGxcblxuICAgIHRoaXMudmlkZW9UcmFjay5zYW1wbGVzID0gc2FtcGxlcy5zbGljZSgwLCBjaGFuZ2VJZHgpO1xuXG4gICAgdGhpcy5kb0ZpeFZpZGVvKGZhbHNlKTtcblxuICAgIHRoaXMudmlkZW9UcmFjay5zYW1wbGVzID0gc2FtcGxlcy5zbGljZShjaGFuZ2VJZHgpO1xuXG4gICAgdGhpcy5kb0ZpeFZpZGVvKGZhbHNlLCBzdHJlYW1DaGFuZ2VTdGFydCk7XG5cbiAgICB0aGlzLnZpZGVvVHJhY2suc2FtcGxlcyA9IGZpcnN0UGFydFNhbXBsZXMuY29uY2F0KHNlY29uZFBhcnRTYW1wbGVzKVxuICB9XG5cbiAgZml4Q2hhbmdlU3RyZWFtQXVkaW8gKGNoYW5nZUlkeCkge1xuICAgIGNvbnN0IHsgc2FtcGxlcywgbWV0YSB9ID0gdGhpcy5hdWRpb1RyYWNrO1xuXG4gICAgY29uc3QgcHJldkR0cyA9IGNoYW5nZUlkeCA9PT0gMCA/IHRoaXMuZ2V0U3RyZWFtQ2hhbmdlU3RhcnQoc2FtcGxlc1swXSkgOiBzYW1wbGVzW2NoYW5nZUlkeCAtIDFdLmR0cztcbiAgICBjb25zdCBjdXJEdHMgPSBzYW1wbGVzW2NoYW5nZUlkeF0uZHRzO1xuICAgIGNvbnN0IGlzQ29udGludWUgPSBNYXRoLmFicyhwcmV2RHRzIC0gY3VyRHRzKSA8PSAyICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbjtcblxuICAgIGlmIChpc0NvbnRpbnVlKSB7XG4gICAgICBpZiAoIXNhbXBsZXNbY2hhbmdlSWR4XS5vcHRpb25zKSB7XG4gICAgICAgIHNhbXBsZXNbY2hhbmdlSWR4XS5vcHRpb25zID0ge1xuICAgICAgICAgIGlzQ29udGludWU6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2FtcGxlc1tjaGFuZ2VJZHhdLm9wdGlvbnMuaXNDb250aW51ZSA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5kb0ZpeEF1ZGlvKGZhbHNlKVxuICAgIH1cblxuICAgIGNvbnN0IGZpcnN0UGFydFNhbXBsZXMgPSBzYW1wbGVzLnNsaWNlKDAsIGNoYW5nZUlkeCk7XG4gICAgY29uc3Qgc2Vjb25kUGFydFNhbXBsZXMgPSBzYW1wbGVzLnNsaWNlKGNoYW5nZUlkeCk7XG4gICAgY29uc3QgZmlyc3RTYW1wbGUgPSBzYW1wbGVzWzBdXG5cbiAgICBjb25zdCBjaGFuZ2VTYW1wbGUgPSBzZWNvbmRQYXJ0U2FtcGxlc1swXVxuICAgIGNvbnN0IGZpcnN0UGFydER1cmF0aW9uID0gY2hhbmdlU2FtcGxlLmR0cyAtIGZpcnN0U2FtcGxlLmR0c1xuICAgIGNvbnN0IHN0cmVhbUNoYW5nZVN0YXJ0ID0gZmlyc3RTYW1wbGUub3B0aW9ucyAmJiBmaXJzdFNhbXBsZS5vcHRpb25zLnN0YXJ0ICsgZmlyc3RQYXJ0RHVyYXRpb24gPyBmaXJzdFNhbXBsZS5vcHRpb25zLnN0YXJ0IDogbnVsbFxuXG4gICAgdGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMgPSBmaXJzdFBhcnRTYW1wbGVzO1xuXG4gICAgdGhpcy5kb0ZpeEF1ZGlvKGZhbHNlKTtcblxuICAgIHRoaXMuYXVkaW9UcmFjay5zYW1wbGVzID0gc2Vjb25kUGFydFNhbXBsZXM7XG5cbiAgICB0aGlzLmRvRml4QXVkaW8oZmFsc2UsIHN0cmVhbUNoYW5nZVN0YXJ0KTtcblxuICAgIHRoaXMuYXVkaW9UcmFjay5zYW1wbGVzID0gZmlyc3RQYXJ0U2FtcGxlcy5jb25jYXQoc2Vjb25kUGFydFNhbXBsZXMpXG4gIH1cblxuICBnZXRGaXJzdFNhbXBsZSAoKSB7XG4gICAgLy8g6I635Y+WdmlkZW/lkoxhdWRpb+eahOmmluW4p+aVsOaNrlxuICAgIGxldCB7c2FtcGxlczogdmlkZW9TYW1wbGVzfSA9IHRoaXMudmlkZW9UcmFja1xuICAgIGxldCB7c2FtcGxlczogYXVkaW9TYW1wbGVzfSA9IHRoaXMuYXVkaW9UcmFja1xuXG4gICAgbGV0IGlzRmlyc3RWaWRlb1NhbXBsZXMgPSBmYWxzZTtcbiAgICBsZXQgaXNGaXJzdEF1ZGlvU2FtcGxlcyA9IGZhbHNlO1xuXG4gICAgaWYgKCF0aGlzLl9maXJzdFZpZGVvU2FtcGxlICYmIHZpZGVvU2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUgPSBDb21wYXRpYmlsaXR5LmZpbmRGaXJzdFZpZGVvU2FtcGxlKHZpZGVvU2FtcGxlcylcbiAgICAgIGlzRmlyc3RWaWRlb1NhbXBsZXMgPSB0cnVlXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9maXJzdEF1ZGlvU2FtcGxlICYmIGF1ZGlvU2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX2ZpcnN0QXVkaW9TYW1wbGUgPSBDb21wYXRpYmlsaXR5LmZpbmRGaXJzdEF1ZGlvU2FtcGxlKGF1ZGlvU2FtcGxlcykgLy8g5a+75om+ZHRz5pyA5bCP55qE5bin5L2c5Li66aaW5Liq6Z+z6aKR5binXG4gICAgICBpc0ZpcnN0QXVkaW9TYW1wbGVzID0gdHJ1ZVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBpc0ZpcnN0VmlkZW9TYW1wbGVzLFxuICAgICAgaXNGaXJzdEF1ZGlvU2FtcGxlc1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDlnKjmsqHmnIlyZWZTYW1wbGVEdXJhdGlvbueahOmXrumimOa1geS4re+8jFxuICAgKi9cbiAgZml4UmVmU2FtcGxlRHVyYXRpb24gKG1ldGEsIHNhbXBsZXMpIHtcbiAgICBjb25zdCBpc1ZpZGVvID0gbWV0YS50eXBlID09PSAndmlkZW8nXG4gICAgY29uc3QgYWxsU2FtcGxlc0NvdW50ID0gaXNWaWRlbyA/IHRoaXMuYWxsVmlkZW9TYW1wbGVzQ291bnQgOiB0aGlzLmFsbEF1ZGlvU2FtcGxlc0NvdW50XG4gICAgY29uc3QgZmlyc3REdHMgPSBpc1ZpZGVvID8gdGhpcy5fZmlyc3RWaWRlb1NhbXBsZS5kdHMgOiB0aGlzLl9maXJzdEF1ZGlvU2FtcGxlLmR0c1xuICAgIGNvbnN0IGZpbGxlZFNhbXBsZXNDb3VudCA9IGlzVmlkZW8gPyB0aGlzLmZpbGxlZFZpZGVvU2FtcGxlcy5sZW5ndGggOiB0aGlzLmZpbGxlZEF1ZGlvU2FtcGxlcy5sZW5ndGhcblxuICAgIGlmICghbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiB8fCBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uIDw9IDAgfHwgTnVtYmVyLmlzTmFOKG1ldGEucmVmU2FtcGxlRHVyYXRpb24pKSB7XG4gICAgICBpZiAoc2FtcGxlcy5sZW5ndGggPj0gMSkge1xuICAgICAgICBjb25zdCBsYXN0RHRzID0gc2FtcGxlc1tzYW1wbGVzLmxlbmd0aCAtIDFdLmR0c1xuXG4gICAgICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb24gPSBNYXRoLmZsb29yKChsYXN0RHRzIC0gZmlyc3REdHMpIC8gKChhbGxTYW1wbGVzQ291bnQgKyBmaWxsZWRTYW1wbGVzQ291bnQpIC0gMSkpOyAvLyDlsIZyZWZTYW1wbGVEdXJhdGlvbumHjee9ruS4uuiuoeeul+WQjueahOW5s+Wdh+WAvFxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobWV0YS5yZWZTYW1wbGVEdXJhdGlvbikge1xuICAgICAgaWYgKHNhbXBsZXMubGVuZ3RoID49IDUpIHtcbiAgICAgICAgY29uc3QgbGFzdER0cyA9IHNhbXBsZXNbc2FtcGxlcy5sZW5ndGggLSAxXS5kdHNcbiAgICAgICAgY29uc3QgZmlyc3REdHMgPSBzYW1wbGVzWzBdLmR0c1xuICAgICAgICBjb25zdCBkdXJhdGlvbkF2ZyA9IChsYXN0RHRzIC0gZmlyc3REdHMpIC8gKHNhbXBsZXMubGVuZ3RoIC0gMSlcblxuICAgICAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uID0gTWF0aC5mbG9vcihNYXRoLmFicyhtZXRhLnJlZlNhbXBsZUR1cmF0aW9uIC0gZHVyYXRpb25BdmcpIDw9IDUgPyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uIDogZHVyYXRpb25BdmcpOyAvLyDlsIZyZWZTYW1wbGVEdXJhdGlvbumHjee9ruS4uuiuoeeul+WQjueahOW5s+Wdh+WAvFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDorrDlvZXmiKrmraLnm67liY3kuIDlhbHmkq3mlL7kuoblpJrlsJHluKdcbiAgICovXG4gIHJlY29yZFNhbXBsZXNDb3VudCAoKSB7XG4gICAgY29uc3QgeyBhdWRpb1RyYWNrLCB2aWRlb1RyYWNrIH0gPSB0aGlzXG5cbiAgICB0aGlzLmFsbEF1ZGlvU2FtcGxlc0NvdW50ICs9IGF1ZGlvVHJhY2suc2FtcGxlcy5sZW5ndGhcbiAgICB0aGlzLmFsbFZpZGVvU2FtcGxlc0NvdW50ICs9IHZpZGVvVHJhY2suc2FtcGxlcy5sZW5ndGhcbiAgfVxuXG4gIC8qKlxuICAgKiDljrvpmaTkuI3lkIjms5XnmoTluKfvvIjlgJLpgIDjgIHph43lpI3luKfvvIlcbiAgICovXG4gIHJlbW92ZUludmFsaWRTYW1wbGVzICgpIHtcbiAgICBjb25zdCB7IF9maXJzdFZpZGVvU2FtcGxlLCBfZmlyc3RBdWRpb1NhbXBsZSB9ID0gdGhpc1xuXG4gICAgdGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMgPSB0aGlzLmF1ZGlvVHJhY2suc2FtcGxlcy5maWx0ZXIoKHNhbXBsZSkgPT4ge1xuICAgICAgcmV0dXJuIHNhbXBsZS5kdHMgPj0gX2ZpcnN0QXVkaW9TYW1wbGUuZHRzICYmICh0aGlzLmxhc3RBdWRpb0R0cyA9PT0gdW5kZWZpbmVkIHx8IHNhbXBsZS5kdHMgPiB0aGlzLmxhc3RBdWRpb0R0cylcbiAgICB9KVxuXG4gICAgdGhpcy52aWRlb1RyYWNrLnNhbXBsZXMgPSB0aGlzLnZpZGVvVHJhY2suc2FtcGxlcy5maWx0ZXIoKHNhbXBsZSkgPT4ge1xuICAgICAgcmV0dXJuIHNhbXBsZS5kdHMgPj0gX2ZpcnN0VmlkZW9TYW1wbGUuZHRzICYmICh0aGlzLmxhc3RWaWRlb0R0cyA9PT0gdW5kZWZpbmVkIHx8IHNhbXBsZS5kdHMgPiB0aGlzLmxhc3RWaWRlb0R0cylcbiAgICB9KVxuICB9XG5cbiAgZ2V0U3RyZWFtQ2hhbmdlU3RhcnQgKHNhbXBsZSkge1xuICAgIGlmIChzYW1wbGUub3B0aW9ucyAmJiBzYW1wbGUub3B0aW9ucy5zdGFydCkge1xuICAgICAgcmV0dXJuIHNhbXBsZS5vcHRpb25zLnN0YXJ0IC0gdGhpcy5kdHNCYXNlO1xuICAgIH1cbiAgICByZXR1cm4gSW5maW5pdHlcbiAgfVxuXG4gIHN0YXRpYyBzb3J0QXVkaW9TYW1wbGVzIChzYW1wbGVzKSB7XG4gICAgaWYgKHNhbXBsZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gc2FtcGxlc1xuICAgIH1cblxuICAgIHJldHVybiBzYW1wbGVzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIHJldHVybiBhLmR0cyAtIGIuZHRzXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiDlr7vmib5kdHPmnIDlsI/nmoRzYW1wbGVcbiAgICogQHBhcmFtIHNhbXBsZXNcbiAgICovXG4gIHN0YXRpYyBmaW5kRmlyc3RBdWRpb1NhbXBsZSAoc2FtcGxlcykge1xuICAgIGlmICghc2FtcGxlcyB8fCBzYW1wbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICByZXR1cm4gQ29tcGF0aWJpbGl0eS5zb3J0QXVkaW9TYW1wbGVzKHNhbXBsZXMpWzBdXG4gIH1cblxuICBzdGF0aWMgZmluZEZpcnN0VmlkZW9TYW1wbGUgKHNhbXBsZXMpIHtcbiAgICBpZiAoIXNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIGNvbnN0IHNvcnRlZCA9IHNhbXBsZXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgcmV0dXJuIGEuZHRzIC0gYi5kdHM7XG4gICAgfSlcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzb3J0ZWQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChzb3J0ZWRbaV0uaXNLZXlmcmFtZSkge1xuICAgICAgICByZXR1cm4gc29ydGVkW2ldXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGRldGVjdExhcmdlR2FwIChuZXh0RHRzLCBmaXJzdFNhbXBsZSkge1xuICAgIGlmIChuZXh0RHRzID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGN1ckR0cyA9IGZpcnN0U2FtcGxlLmR0cyB8fCAwXG4gICAgY29uc3QgY29uZDEgPSBuZXh0RHRzIC0gY3VyRHRzID49IDEwMDAgfHwgY3VyRHRzIC0gbmV4dER0cyA+PSAxMDAwIC8vIGZpeCBobHPmtYHlh7rnjrDlpKfph4/mtYFkdHPpl7Tot53pl67pophcbiAgICBjb25zdCBjb25kMiA9IGZpcnN0U2FtcGxlLm9wdGlvbnMgJiYgZmlyc3RTYW1wbGUub3B0aW9ucy5kaXNjb250aW51ZVxuXG4gICAgcmV0dXJuIGNvbmQxIHx8IGNvbmQyXG4gIH1cblxuICBzdGF0aWMgZG9GaXhMYXJnZUdhcCAoc2FtcGxlcywgZ2FwKSB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNhbXBsZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IHNhbXBsZSA9IHNhbXBsZXNbaV07XG4gICAgICBzYW1wbGUuZHRzICs9IGdhcFxuICAgICAgaWYgKHNhbXBsZS5wdHMpIHtcbiAgICAgICAgc2FtcGxlLnB0cyArPSBnYXBcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog5Lit6YCU5o2i5rWBXG4gICAqL1xuICBzdGF0aWMgZGV0YWN0Q2hhbmdlU3RyZWFtIChzYW1wbGVzKSB7XG4gICAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcbiAgICBsZXQgY2hhbmdlZElkeCA9IC0xO1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzYW1wbGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAoc2FtcGxlc1tpXS5vcHRpb25zICYmIHNhbXBsZXNbaV0ub3B0aW9ucy5tZXRhKSB7XG4gICAgICAgIGNoYW5nZWQgPSB0cnVlXG4gICAgICAgIGNoYW5nZWRJZHggPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgY2hhbmdlZCxcbiAgICAgIGNoYW5nZWRJZHhcbiAgICB9XG4gIH1cblxuICBnZXQgdHJhY2tzICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJylcbiAgfVxuXG4gIGdldCBhdWRpb1RyYWNrICgpIHtcbiAgICBpZiAodGhpcy50cmFja3MpIHtcbiAgICAgIHJldHVybiB0aGlzLnRyYWNrcy5hdWRpb1RyYWNrXG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBnZXQgdmlkZW9UcmFjayAoKSB7XG4gICAgaWYgKHRoaXMudHJhY2tzKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmFja3MudmlkZW9UcmFja1xuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgZ2V0IGR0c0Jhc2UgKCkge1xuICAgIGNvbnN0IHJlbXV4ZXIgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdNUDRfUkVNVVhFUicpO1xuICAgIGlmIChyZW11eGVyKSB7XG4gICAgICByZXR1cm4gcmVtdXhlci5fZHRzQmFzZVxuICAgIH1cbiAgICByZXR1cm4gMFxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBDb21wYXRpYmlsaXR5O1xuIiwiY2xhc3MgR29sb21iIHtcbiAgY29uc3RydWN0b3IgKHVpbnQ4YXJyYXkpIHtcbiAgICB0aGlzLlRBRyA9ICdHb2xvbWInXG4gICAgdGhpcy5fYnVmZmVyID0gdWludDhhcnJheVxuICAgIHRoaXMuX2J1ZmZlckluZGV4ID0gMFxuICAgIHRoaXMuX3RvdGFsQnl0ZXMgPSB1aW50OGFycmF5LmJ5dGVMZW5ndGhcbiAgICB0aGlzLl90b3RhbEJpdHMgPSB1aW50OGFycmF5LmJ5dGVMZW5ndGggKiA4XG4gICAgdGhpcy5fY3VycmVudFdvcmQgPSAwXG4gICAgdGhpcy5fY3VycmVudFdvcmRCaXRzTGVmdCA9IDBcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuX2J1ZmZlciA9IG51bGxcbiAgfVxuXG4gIF9maWxsQ3VycmVudFdvcmQgKCkge1xuICAgIGxldCBidWZmZXJCeXRlc0xlZnQgPSB0aGlzLl90b3RhbEJ5dGVzIC0gdGhpcy5fYnVmZmVySW5kZXhcbiAgICBpZiAoYnVmZmVyQnl0ZXNMZWZ0IDw9IDApIHtcbiAgICAgIC8vIFRPRE8g5byC5bi45aSE55CGXG4gICAgfVxuXG4gICAgbGV0IGJ5dGVzUmVhZCA9IE1hdGgubWluKDQsIGJ1ZmZlckJ5dGVzTGVmdClcbiAgICBsZXQgd29yZCA9IG5ldyBVaW50OEFycmF5KDQpXG4gICAgd29yZC5zZXQodGhpcy5fYnVmZmVyLnN1YmFycmF5KHRoaXMuX2J1ZmZlckluZGV4LCB0aGlzLl9idWZmZXJJbmRleCArIGJ5dGVzUmVhZCkpXG4gICAgdGhpcy5fY3VycmVudFdvcmQgPSBuZXcgRGF0YVZpZXcod29yZC5idWZmZXIpLmdldFVpbnQzMigwKVxuXG4gICAgdGhpcy5fYnVmZmVySW5kZXggKz0gYnl0ZXNSZWFkXG4gICAgdGhpcy5fY3VycmVudFdvcmRCaXRzTGVmdCA9IGJ5dGVzUmVhZCAqIDhcbiAgfVxuXG4gIHJlYWRCaXRzIChzaXplKSB7XG4gICAgbGV0IGJpdHMgPSBNYXRoLm1pbih0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0LCBzaXplKTsvLyA6dWludFxuICAgIGxldCB2YWx1ID0gdGhpcy5fY3VycmVudFdvcmQgPj4+ICgzMiAtIGJpdHMpO1xuICAgIGlmIChzaXplID4gMzIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHJlYWQgbW9yZSB0aGFuIDMyIGJpdHMgYXQgYSB0aW1lJyk7XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnRXb3JkQml0c0xlZnQgLT0gYml0cztcbiAgICBpZiAodGhpcy5fY3VycmVudFdvcmRCaXRzTGVmdCA+IDApIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRXb3JkIDw8PSBiaXRzO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fdG90YWxCeXRlcyAtIHRoaXMuX2J1ZmZlckluZGV4ID4gMCkge1xuICAgICAgdGhpcy5fZmlsbEN1cnJlbnRXb3JkKCk7XG4gICAgfVxuXG4gICAgYml0cyA9IHNpemUgLSBiaXRzO1xuICAgIGlmIChiaXRzID4gMCAmJiB0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0KSB7XG4gICAgICByZXR1cm4gdmFsdSA8PCBiaXRzIHwgdGhpcy5yZWFkQml0cyhiaXRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhbHU7XG4gICAgfVxuICB9XG5cbiAgcmVhZEJvb2wgKCkge1xuICAgIHJldHVybiB0aGlzLnJlYWRCaXRzKDEpID09PSAxXG4gIH1cblxuICByZWFkQnl0ZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVhZEJpdHMoOClcbiAgfVxuXG4gIF9za2lwTGVhZGluZ1plcm8gKCkge1xuICAgIGxldCB6ZXJvQ291bnRcbiAgICBmb3IgKHplcm9Db3VudCA9IDA7IHplcm9Db3VudCA8IHRoaXMuX2N1cnJlbnRXb3JkQml0c0xlZnQ7IHplcm9Db3VudCsrKSB7XG4gICAgICBpZiAoKHRoaXMuX2N1cnJlbnRXb3JkICYgKDB4ODAwMDAwMDAgPj4+IHplcm9Db3VudCkpICE9PSAwKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRXb3JkIDw8PSB6ZXJvQ291bnRcbiAgICAgICAgdGhpcy5fY3VycmVudFdvcmRCaXRzTGVmdCAtPSB6ZXJvQ291bnRcbiAgICAgICAgcmV0dXJuIHplcm9Db3VudFxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9maWxsQ3VycmVudFdvcmQoKVxuICAgIHJldHVybiB6ZXJvQ291bnQgKyB0aGlzLl9za2lwTGVhZGluZ1plcm8oKVxuICB9XG5cbiAgcmVhZFVFRyAoKSB7IC8vIHVuc2lnbmVkIGV4cG9uZW50aWFsIGdvbG9tYlxuICAgIGxldCBsZWFkaW5nWmVyb3MgPSB0aGlzLl9za2lwTGVhZGluZ1plcm8oKVxuICAgIHJldHVybiB0aGlzLnJlYWRCaXRzKGxlYWRpbmdaZXJvcyArIDEpIC0gMVxuICB9XG5cbiAgcmVhZFNFRyAoKSB7IC8vIHNpZ25lZCBleHBvbmVudGlhbCBnb2xvbWJcbiAgICBsZXQgdmFsdWUgPSB0aGlzLnJlYWRVRUcoKVxuICAgIGlmICh2YWx1ZSAmIDB4MDEpIHtcbiAgICAgIHJldHVybiAodmFsdWUgKyAxKSA+Pj4gMVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gLTEgKiAodmFsdWUgPj4+IDEpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdvbG9tYlxuIiwiaW1wb3J0IFNwc1BhcnNlciBmcm9tICcuL3Nwcyc7XG5jbGFzcyBOYWx1bml0IHtcbiAgc3RhdGljIGdldE5hbHVuaXRzIChidWZmZXIpIHtcbiAgICBpZiAoYnVmZmVyLmxlbmd0aCAtIGJ1ZmZlci5wb3NpdGlvbiA8IDQpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBsZXQgYnVmID0gYnVmZmVyLmRhdGF2aWV3O1xuICAgIGxldCBwb3NpdGlvbiA9IGJ1ZmZlci5wb3NpdGlvbjtcbiAgICBpZiAoYnVmLmdldEludDMyKHBvc2l0aW9uKSA9PT0gMSB8fFxuICAgIChidWYuZ2V0SW50MTYocG9zaXRpb24pID09PSAwICYmIGJ1Zi5nZXRJbnQ4KHBvc2l0aW9uICsgMikgPT09IDEpKSB7XG4gICAgICByZXR1cm4gTmFsdW5pdC5nZXRBbm5leGJOYWxzKGJ1ZmZlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBOYWx1bml0LmdldEF2Y2NOYWxzKGJ1ZmZlcik7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldEFubmV4Yk5hbHMgKGJ1ZmZlcikge1xuICAgIGxldCBuYWxzID0gW107XG4gICAgbGV0IHBvc2l0aW9uID0gTmFsdW5pdC5nZXRIZWFkZXJQb3NpdGlvbkFubmV4QihidWZmZXIpO1xuICAgIGxldCBzdGFydCA9IHBvc2l0aW9uLnBvcztcbiAgICBsZXQgZW5kID0gc3RhcnQ7XG4gICAgd2hpbGUgKHN0YXJ0IDwgYnVmZmVyLmxlbmd0aCAtIDQpIHtcbiAgICAgIGxldCBoZWFkZXIgPSBidWZmZXIuYnVmZmVyLnNsaWNlKHN0YXJ0LCBzdGFydCArIHBvc2l0aW9uLmhlYWRlckxlbmd0aCk7XG4gICAgICBpZiAocG9zaXRpb24ucG9zID09PSBidWZmZXIucG9zaXRpb24pIHtcbiAgICAgICAgYnVmZmVyLnNraXAocG9zaXRpb24uaGVhZGVyTGVuZ3RoKTtcbiAgICAgIH1cbiAgICAgIHBvc2l0aW9uID0gTmFsdW5pdC5nZXRIZWFkZXJQb3NpdGlvbkFubmV4QihidWZmZXIpO1xuICAgICAgZW5kID0gcG9zaXRpb24ucG9zO1xuICAgICAgbGV0IGJvZHkgPSBuZXcgVWludDhBcnJheShidWZmZXIuYnVmZmVyLnNsaWNlKHN0YXJ0ICsgaGVhZGVyLmJ5dGVMZW5ndGgsIGVuZCkpO1xuICAgICAgbGV0IHVuaXQgPSB7aGVhZGVyLCBib2R5fTtcbiAgICAgIE5hbHVuaXQuYW5hbHlzZU5hbCh1bml0KTtcbiAgICAgIG5hbHMucHVzaCh1bml0KTtcbiAgICAgIGJ1ZmZlci5za2lwKGVuZCAtIGJ1ZmZlci5wb3NpdGlvbik7XG4gICAgICBzdGFydCA9IGVuZDtcbiAgICB9XG4gICAgcmV0dXJuIG5hbHM7XG4gIH1cblxuICBzdGF0aWMgZ2V0QXZjY05hbHMgKGJ1ZmZlcikge1xuICAgIGxldCBuYWxzID0gW107XG4gICAgd2hpbGUgKGJ1ZmZlci5wb3NpdGlvbiA8IGJ1ZmZlci5sZW5ndGggLSA0KSB7XG4gICAgICBsZXQgbGVuZ3RoID0gYnVmZmVyLmRhdGF2aWV3LmdldEludDMyKGJ1ZmZlci5wb3NpdGlvbik7XG4gICAgICBpZiAoYnVmZmVyLmxlbmd0aCAtIGJ1ZmZlci5wb3NpdGlvbiA+PSBsZW5ndGgpIHtcbiAgICAgICAgbGV0IGhlYWRlciA9IGJ1ZmZlci5idWZmZXIuc2xpY2UoYnVmZmVyLnBvc2l0aW9uLCBidWZmZXIucG9zaXRpb24gKyA0KTtcbiAgICAgICAgYnVmZmVyLnNraXAoNClcbiAgICAgICAgbGV0IGJvZHkgPSBidWZmZXIuYnVmZmVyLnNsaWNlKGJ1ZmZlci5wb3NpdGlvbiwgYnVmZmVyLnBvc2l0aW9uICsgbGVuZ3RoKTtcbiAgICAgICAgYnVmZmVyLnNraXAobGVuZ3RoKTtcbiAgICAgICAgbGV0IHVuaXQgPSB7aGVhZGVyLCBib2R5fTtcbiAgICAgICAgTmFsdW5pdC5hbmFseXNlTmFsKHVuaXQpO1xuICAgICAgICBuYWxzLnB1c2godW5pdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5hbHM7XG4gIH1cblxuICBzdGF0aWMgYW5hbHlzZU5hbCAodW5pdCkge1xuICAgIGxldCB0eXBlID0gdW5pdC5ib2R5WzBdICYgMHgxZjtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgLy8gTkRSXG4gICAgICAgIHVuaXQubmRyID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDU6XG4gICAgICAgIC8vIElEUlxuICAgICAgICB1bml0LmlkciA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA2OlxuICAgICAgICAvLyBTRUlcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDc6XG4gICAgICAgIC8vIFNQU1xuICAgICAgICB1bml0LnNwcyA9IFNwc1BhcnNlci5wYXJzZVNQUyh1bml0LmJvZHkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgODpcbiAgICAgICAgLy8gUFBTXG4gICAgICAgIHVuaXQucHBzID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDk6XG4gICAgICAgIC8vIEFVRFxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRIZWFkZXJQb3NpdGlvbkFubmV4QiAoYnVmZmVyKSB7XG4gICAgLy8gc2VwZXJhdGVcbiAgICBsZXQgcG9zID0gYnVmZmVyLnBvc2l0aW9uO1xuICAgIGxldCBoZWFkZXJMZW5ndGggPSAwO1xuICAgIHdoaWxlIChoZWFkZXJMZW5ndGggIT09IDMgJiYgaGVhZGVyTGVuZ3RoICE9PSA0ICYmIHBvcyA8IGJ1ZmZlci5sZW5ndGggLSA0KSB7XG4gICAgICBpZiAoYnVmZmVyLmRhdGF2aWV3LmdldEludDE2KHBvcykgPT09IDApIHtcbiAgICAgICAgaWYgKGJ1ZmZlci5kYXRhdmlldy5nZXRJbnQxNihwb3MgKyAyKSA9PT0gMSkge1xuICAgICAgICAgIC8vIDB4MDAwMDAxXG4gICAgICAgICAgaGVhZGVyTGVuZ3RoID0gNDtcbiAgICAgICAgfSBlbHNlIGlmIChidWZmZXIuZGF0YXZpZXcuZ2V0SW50OChwb3MgKyAyKSA9PT0gMSkge1xuICAgICAgICAgIGhlYWRlckxlbmd0aCA9IDM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcG9zKys7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBvcysrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3MgPT09IGJ1ZmZlci5sZW5ndGggLSA0KSB7XG4gICAgICBpZiAoYnVmZmVyLmRhdGF2aWV3LmdldEludDE2KHBvcykgPT09IDApIHtcbiAgICAgICAgaWYgKGJ1ZmZlci5kYXRhdmlldy5nZXRJbnQxNihwb3MgKyAyKSA9PT0gMSkge1xuICAgICAgICAgIC8vIDB4MDAwMDAxXG4gICAgICAgICAgaGVhZGVyTGVuZ3RoID0gNDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcG9zKys7XG4gICAgICAgIGlmIChidWZmZXIuZGF0YXZpZXcuZ2V0SW50MTYocG9zKSA9PT0gMCAmJiBidWZmZXIuZGF0YXZpZXcuZ2V0SW50OChwb3MpID09PSAxKSB7XG4gICAgICAgICAgLy8gMHgwMDAwMDAxXG4gICAgICAgICAgaGVhZGVyTGVuZ3RoID0gMztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwb3MgPSBidWZmZXIubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7cG9zLCBoZWFkZXJMZW5ndGh9O1xuICB9XG5cbiAgc3RhdGljIGdldEF2Y2MgKHNwcywgcHBzKSB7XG4gICAgbGV0IHJldCA9IG5ldyBVaW50OEFycmF5KHNwcy5ieXRlTGVuZ3RoICsgcHBzLmJ5dGVMZW5ndGggKyAxMSk7XG4gICAgcmV0WzBdID0gMHgwMTtcbiAgICByZXRbMV0gPSBzcHNbMV07XG4gICAgcmV0WzJdID0gc3BzWzJdO1xuICAgIHJldFszXSA9IHNwc1szXTtcbiAgICByZXRbNF0gPSAyNTU7XG4gICAgcmV0WzVdID0gMjI1O1xuXG4gICAgbGV0IG9mZnNldCA9IDY7XG5cbiAgICByZXQuc2V0KG5ldyBVaW50OEFycmF5KFsoc3BzLmJ5dGVMZW5ndGggPj4+IDgpICYgMHhmZiwgc3BzLmJ5dGVMZW5ndGggJiAweGZmXSksIG9mZnNldCk7XG4gICAgb2Zmc2V0ICs9IDI7XG4gICAgcmV0LnNldChzcHMsIG9mZnNldCk7XG4gICAgb2Zmc2V0ICs9IHNwcy5ieXRlTGVuZ3RoO1xuXG4gICAgcmV0W29mZnNldF0gPSAxO1xuICAgIG9mZnNldCsrO1xuXG4gICAgcmV0LnNldChuZXcgVWludDhBcnJheShbKHBwcy5ieXRlTGVuZ3RoID4+PiA4KSAmIDB4ZmYsIHBwcy5ieXRlTGVuZ3RoICYgMHhmZl0pLCBvZmZzZXQpO1xuICAgIG9mZnNldCArPSAyO1xuICAgIHJldC5zZXQocHBzLCBvZmZzZXQpO1xuICAgIHJldHVybiByZXQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTmFsdW5pdDtcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAgKi9cbi8qIGVzbGludC1kaXNhYmxlIG9uZS12YXIgICovXG5pbXBvcnQgR29sb21iIGZyb20gJy4vZ29sb21iJ1xuXG5jbGFzcyBTUFNQYXJzZXIge1xuICBzdGF0aWMgX2Vic3AycmJzcCAodWludDhhcnJheSkge1xuICAgIGxldCBzcmMgPSB1aW50OGFycmF5XG4gICAgbGV0IHNyY0xlbmd0aCA9IHNyYy5ieXRlTGVuZ3RoXG4gICAgbGV0IGRzdCA9IG5ldyBVaW50OEFycmF5KHNyY0xlbmd0aClcbiAgICBsZXQgZHN0SWR4ID0gMFxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcmNMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGkgPj0gMikge1xuICAgICAgICBpZiAoc3JjW2ldID09PSAweDAzICYmIHNyY1tpIC0gMV0gPT09IDB4MDAgJiYgc3JjW2kgLSAyXSA9PT0gMHgwMCkge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGRzdFtkc3RJZHhdID0gc3JjW2ldXG4gICAgICBkc3RJZHgrK1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgVWludDhBcnJheShkc3QuYnVmZmVyLCAwLCBkc3RJZHgpXG4gIH1cblxuICBzdGF0aWMgcGFyc2VTUFMgKHVpbnQ4YXJyYXkpIHtcbiAgICBsZXQgcmJzcCA9IFNQU1BhcnNlci5fZWJzcDJyYnNwKHVpbnQ4YXJyYXkpXG4gICAgbGV0IGdiID0gbmV3IEdvbG9tYihyYnNwKVxuXG4gICAgZ2IucmVhZEJ5dGUoKVxuICAgIGxldCBwcm9maWxlSWRjID0gZ2IucmVhZEJ5dGUoKVxuICAgIGdiLnJlYWRCeXRlKClcbiAgICBsZXQgbGV2ZWxJZGMgPSBnYi5yZWFkQnl0ZSgpXG4gICAgZ2IucmVhZFVFRygpXG5cbiAgICBsZXQgcHJvZmlsZV9zdHJpbmcgPSBTUFNQYXJzZXIuZ2V0UHJvZmlsZVN0cmluZyhwcm9maWxlSWRjKVxuICAgIGxldCBsZXZlbF9zdHJpbmcgPSBTUFNQYXJzZXIuZ2V0TGV2ZWxTdHJpbmcobGV2ZWxJZGMpXG4gICAgbGV0IGNocm9tYV9mb3JtYXRfaWRjID0gMVxuICAgIGxldCBjaHJvbWFfZm9ybWF0ID0gNDIwXG4gICAgbGV0IGNocm9tYV9mb3JtYXRfdGFibGUgPSBbMCwgNDIwLCA0MjIsIDQ0NF1cbiAgICBsZXQgYml0X2RlcHRoID0gOFxuXG4gICAgaWYgKHByb2ZpbGVJZGMgPT09IDEwMCB8fCBwcm9maWxlSWRjID09PSAxMTAgfHwgcHJvZmlsZUlkYyA9PT0gMTIyIHx8XG4gICAgICBwcm9maWxlSWRjID09PSAyNDQgfHwgcHJvZmlsZUlkYyA9PT0gNDQgfHwgcHJvZmlsZUlkYyA9PT0gODMgfHxcbiAgICAgIHByb2ZpbGVJZGMgPT09IDg2IHx8IHByb2ZpbGVJZGMgPT09IDExOCB8fCBwcm9maWxlSWRjID09PSAxMjggfHxcbiAgICAgIHByb2ZpbGVJZGMgPT09IDEzOCB8fCBwcm9maWxlSWRjID09PSAxNDQpIHtcbiAgICAgIGNocm9tYV9mb3JtYXRfaWRjID0gZ2IucmVhZFVFRygpXG4gICAgICBpZiAoY2hyb21hX2Zvcm1hdF9pZGMgPT09IDMpIHtcbiAgICAgICAgZ2IucmVhZEJpdHMoMSlcbiAgICAgIH1cbiAgICAgIGlmIChjaHJvbWFfZm9ybWF0X2lkYyA8PSAzKSB7XG4gICAgICAgIGNocm9tYV9mb3JtYXQgPSBjaHJvbWFfZm9ybWF0X3RhYmxlW2Nocm9tYV9mb3JtYXRfaWRjXVxuICAgICAgfVxuXG4gICAgICBiaXRfZGVwdGggPSBnYi5yZWFkVUVHKCkgKyA4XG4gICAgICBnYi5yZWFkVUVHKClcbiAgICAgIGdiLnJlYWRCaXRzKDEpXG4gICAgICBpZiAoZ2IucmVhZEJvb2woKSkge1xuICAgICAgICBsZXQgc2NhbGluZ19saXN0X2NvdW50ID0gKGNocm9tYV9mb3JtYXRfaWRjICE9PSAzKSA/IDggOiAxMlxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjYWxpbmdfbGlzdF9jb3VudDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGdiLnJlYWRCb29sKCkpIHtcbiAgICAgICAgICAgIGlmIChpIDwgNikge1xuICAgICAgICAgICAgICBTUFNQYXJzZXIuX3NraXBTY2FsaW5nTGlzdChnYiwgMTYpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBTUFNQYXJzZXIuX3NraXBTY2FsaW5nTGlzdChnYiwgNjQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGdiLnJlYWRVRUcoKVxuICAgIGxldCBwaWNfb3JkZXJfY250X3R5cGUgPSBnYi5yZWFkVUVHKClcbiAgICBpZiAocGljX29yZGVyX2NudF90eXBlID09PSAwKSB7XG4gICAgICBnYi5yZWFkVUVHKClcbiAgICB9IGVsc2UgaWYgKHBpY19vcmRlcl9jbnRfdHlwZSA9PT0gMSkge1xuICAgICAgZ2IucmVhZEJpdHMoMSlcbiAgICAgIGdiLnJlYWRTRUcoKVxuICAgICAgZ2IucmVhZFNFRygpXG4gICAgICBsZXQgbnVtX3JlZl9mcmFtZXNfaW5fcGljX29yZGVyX2NudF9jeWNsZSA9IGdiLnJlYWRVRUcoKVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1fcmVmX2ZyYW1lc19pbl9waWNfb3JkZXJfY250X2N5Y2xlOyBpKyspIHtcbiAgICAgICAgZ2IucmVhZFNFRygpXG4gICAgICB9XG4gICAgfVxuICAgIGdiLnJlYWRVRUcoKVxuICAgIGdiLnJlYWRCaXRzKDEpXG5cbiAgICBsZXQgcGljX3dpZHRoX2luX21ic19taW51czEgPSBnYi5yZWFkVUVHKClcbiAgICBsZXQgcGljX2hlaWdodF9pbl9tYXBfdW5pdHNfbWludXMxID0gZ2IucmVhZFVFRygpXG5cbiAgICBsZXQgZnJhbWVfbWJzX29ubHlfZmxhZyA9IGdiLnJlYWRCaXRzKDEpXG4gICAgaWYgKGZyYW1lX21ic19vbmx5X2ZsYWcgPT09IDApIHtcbiAgICAgIGdiLnJlYWRCaXRzKDEpXG4gICAgfVxuICAgIGdiLnJlYWRCaXRzKDEpXG5cbiAgICBsZXQgZnJhbWVfY3JvcF9sZWZ0X29mZnNldCA9IDBcbiAgICBsZXQgZnJhbWVfY3JvcF9yaWdodF9vZmZzZXQgPSAwXG4gICAgbGV0IGZyYW1lX2Nyb3BfdG9wX29mZnNldCA9IDBcbiAgICBsZXQgZnJhbWVfY3JvcF9ib3R0b21fb2Zmc2V0ID0gMFxuXG4gICAgbGV0IGZyYW1lX2Nyb3BwaW5nX2ZsYWcgPSBnYi5yZWFkQm9vbCgpXG4gICAgaWYgKGZyYW1lX2Nyb3BwaW5nX2ZsYWcpIHtcbiAgICAgIGZyYW1lX2Nyb3BfbGVmdF9vZmZzZXQgPSBnYi5yZWFkVUVHKClcbiAgICAgIGZyYW1lX2Nyb3BfcmlnaHRfb2Zmc2V0ID0gZ2IucmVhZFVFRygpXG4gICAgICBmcmFtZV9jcm9wX3RvcF9vZmZzZXQgPSBnYi5yZWFkVUVHKClcbiAgICAgIGZyYW1lX2Nyb3BfYm90dG9tX29mZnNldCA9IGdiLnJlYWRVRUcoKVxuICAgIH1cblxuICAgIGxldCBwYXJfd2lkdGggPSAxLCBwYXJfaGVpZ2h0ID0gMVxuICAgIGxldCBmcHMgPSAwLCBmcHNfZml4ZWQgPSB0cnVlLCBmcHNfbnVtID0gMCwgZnBzX2RlbiA9IDBcblxuICAgIGxldCB2dWlfcGFyYW1ldGVyc19wcmVzZW50X2ZsYWcgPSBnYi5yZWFkQm9vbCgpXG4gICAgaWYgKHZ1aV9wYXJhbWV0ZXJzX3ByZXNlbnRfZmxhZykge1xuICAgICAgaWYgKGdiLnJlYWRCb29sKCkpIHsgLy8gYXNwZWN0X3JhdGlvX2luZm9fcHJlc2VudF9mbGFnXG4gICAgICAgIGxldCBhc3BlY3RfcmF0aW9faWRjID0gZ2IucmVhZEJ5dGUoKVxuICAgICAgICBsZXQgcGFyX3dfdGFibGUgPSBbMSwgMTIsIDEwLCAxNiwgNDAsIDI0LCAyMCwgMzIsIDgwLCAxOCwgMTUsIDY0LCAxNjAsIDQsIDMsIDJdXG4gICAgICAgIGxldCBwYXJfaF90YWJsZSA9IFsxLCAxMSwgMTEsIDExLCAzMywgMTEsIDExLCAxMSwgMzMsIDExLCAxMSwgMzMsIDk5LCAzLCAyLCAxXVxuXG4gICAgICAgIGlmIChhc3BlY3RfcmF0aW9faWRjID4gMCAmJiBhc3BlY3RfcmF0aW9faWRjIDwgMTYpIHtcbiAgICAgICAgICBwYXJfd2lkdGggPSBwYXJfd190YWJsZVthc3BlY3RfcmF0aW9faWRjIC0gMV1cbiAgICAgICAgICBwYXJfaGVpZ2h0ID0gcGFyX2hfdGFibGVbYXNwZWN0X3JhdGlvX2lkYyAtIDFdXG4gICAgICAgIH0gZWxzZSBpZiAoYXNwZWN0X3JhdGlvX2lkYyA9PT0gMjU1KSB7XG4gICAgICAgICAgcGFyX3dpZHRoID0gZ2IucmVhZEJ5dGUoKSA8PCA4IHwgZ2IucmVhZEJ5dGUoKVxuICAgICAgICAgIHBhcl9oZWlnaHQgPSBnYi5yZWFkQnl0ZSgpIDw8IDggfCBnYi5yZWFkQnl0ZSgpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGdiLnJlYWRCb29sKCkpIHtcbiAgICAgICAgZ2IucmVhZEJvb2woKVxuICAgICAgfVxuICAgICAgaWYgKGdiLnJlYWRCb29sKCkpIHtcbiAgICAgICAgZ2IucmVhZEJpdHMoNClcbiAgICAgICAgaWYgKGdiLnJlYWRCb29sKCkpIHtcbiAgICAgICAgICBnYi5yZWFkQml0cygyNClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGdiLnJlYWRCb29sKCkpIHtcbiAgICAgICAgZ2IucmVhZFVFRygpXG4gICAgICAgIGdiLnJlYWRVRUcoKVxuICAgICAgfVxuICAgICAgaWYgKGdiLnJlYWRCb29sKCkpIHtcbiAgICAgICAgbGV0IG51bV91bml0c19pbl90aWNrID0gZ2IucmVhZEJpdHMoMzIpXG4gICAgICAgIGxldCB0aW1lX3NjYWxlID0gZ2IucmVhZEJpdHMoMzIpXG4gICAgICAgIGZwc19maXhlZCA9IGdiLnJlYWRCb29sKClcblxuICAgICAgICBmcHNfbnVtID0gdGltZV9zY2FsZVxuICAgICAgICBmcHNfZGVuID0gbnVtX3VuaXRzX2luX3RpY2sgKiAyXG4gICAgICAgIGZwcyA9IGZwc19udW0gLyBmcHNfZGVuXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHBhclNjYWxlID0gMVxuICAgIGlmIChwYXJfd2lkdGggIT09IDEgfHwgcGFyX2hlaWdodCAhPT0gMSkge1xuICAgICAgcGFyU2NhbGUgPSBwYXJfd2lkdGggLyBwYXJfaGVpZ2h0XG4gICAgfVxuXG4gICAgbGV0IGNyb3BfdW5pdF94ID0gMCwgY3JvcF91bml0X3kgPSAwXG4gICAgaWYgKGNocm9tYV9mb3JtYXRfaWRjID09PSAwKSB7XG4gICAgICBjcm9wX3VuaXRfeCA9IDFcbiAgICAgIGNyb3BfdW5pdF95ID0gMiAtIGZyYW1lX21ic19vbmx5X2ZsYWdcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHN1Yl93YyA9IChjaHJvbWFfZm9ybWF0X2lkYyA9PT0gMykgPyAxIDogMlxuICAgICAgbGV0IHN1Yl9oYyA9IChjaHJvbWFfZm9ybWF0X2lkYyA9PT0gMSkgPyAyIDogMVxuICAgICAgY3JvcF91bml0X3ggPSBzdWJfd2NcbiAgICAgIGNyb3BfdW5pdF95ID0gc3ViX2hjICogKDIgLSBmcmFtZV9tYnNfb25seV9mbGFnKVxuICAgIH1cblxuICAgIGxldCBjb2RlY193aWR0aCA9IChwaWNfd2lkdGhfaW5fbWJzX21pbnVzMSArIDEpICogMTZcbiAgICBsZXQgY29kZWNfaGVpZ2h0ID0gKDIgLSBmcmFtZV9tYnNfb25seV9mbGFnKSAqICgocGljX2hlaWdodF9pbl9tYXBfdW5pdHNfbWludXMxICsgMSkgKiAxNilcblxuICAgIGNvZGVjX3dpZHRoIC09IChmcmFtZV9jcm9wX2xlZnRfb2Zmc2V0ICsgZnJhbWVfY3JvcF9yaWdodF9vZmZzZXQpICogY3JvcF91bml0X3hcbiAgICBjb2RlY19oZWlnaHQgLT0gKGZyYW1lX2Nyb3BfdG9wX29mZnNldCArIGZyYW1lX2Nyb3BfYm90dG9tX29mZnNldCkgKiBjcm9wX3VuaXRfeVxuXG4gICAgbGV0IHByZXNlbnRfd2lkdGggPSBNYXRoLmNlaWwoY29kZWNfd2lkdGggKiBwYXJTY2FsZSlcblxuICAgIGdiLmRlc3Ryb3koKVxuICAgIGdiID0gbnVsbFxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHByb2ZpbGVfc3RyaW5nOiBwcm9maWxlX3N0cmluZyxcbiAgICAgIGxldmVsX3N0cmluZzogbGV2ZWxfc3RyaW5nLFxuICAgICAgYml0X2RlcHRoOiBiaXRfZGVwdGgsXG4gICAgICBjaHJvbWFfZm9ybWF0OiBjaHJvbWFfZm9ybWF0LFxuICAgICAgY2hyb21hX2Zvcm1hdF9zdHJpbmc6IFNQU1BhcnNlci5nZXRDaHJvbWFGb3JtYXRTdHJpbmcoY2hyb21hX2Zvcm1hdCksXG5cbiAgICAgIGZyYW1lX3JhdGU6IHtcbiAgICAgICAgZml4ZWQ6IGZwc19maXhlZCxcbiAgICAgICAgZnBzOiBmcHMsXG4gICAgICAgIGZwc19kZW46IGZwc19kZW4sXG4gICAgICAgIGZwc19udW06IGZwc19udW1cbiAgICAgIH0sXG5cbiAgICAgIHBhcl9yYXRpbzoge1xuICAgICAgICB3aWR0aDogcGFyX3dpZHRoLFxuICAgICAgICBoZWlnaHQ6IHBhcl9oZWlnaHRcbiAgICAgIH0sXG5cbiAgICAgIGNvZGVjX3NpemU6IHtcbiAgICAgICAgd2lkdGg6IGNvZGVjX3dpZHRoLFxuICAgICAgICBoZWlnaHQ6IGNvZGVjX2hlaWdodFxuICAgICAgfSxcblxuICAgICAgcHJlc2VudF9zaXplOiB7XG4gICAgICAgIHdpZHRoOiBwcmVzZW50X3dpZHRoLFxuICAgICAgICBoZWlnaHQ6IGNvZGVjX2hlaWdodFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBfc2tpcFNjYWxpbmdMaXN0IChnYiwgY291bnQpIHtcbiAgICBsZXQgbGFzdF9zY2FsZSA9IDgsIG5leHRfc2NhbGUgPSA4XG4gICAgbGV0IGRlbHRhX3NjYWxlID0gMFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgaWYgKG5leHRfc2NhbGUgIT09IDApIHtcbiAgICAgICAgZGVsdGFfc2NhbGUgPSBnYi5yZWFkU0VHKClcbiAgICAgICAgbmV4dF9zY2FsZSA9IChsYXN0X3NjYWxlICsgZGVsdGFfc2NhbGUgKyAyNTYpICUgMjU2XG4gICAgICB9XG4gICAgICBsYXN0X3NjYWxlID0gKG5leHRfc2NhbGUgPT09IDApID8gbGFzdF9zY2FsZSA6IG5leHRfc2NhbGVcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0UHJvZmlsZVN0cmluZyAocHJvZmlsZUlkYykge1xuICAgIHN3aXRjaCAocHJvZmlsZUlkYykge1xuICAgICAgY2FzZSA2NjpcbiAgICAgICAgcmV0dXJuICdCYXNlbGluZSdcbiAgICAgIGNhc2UgNzc6XG4gICAgICAgIHJldHVybiAnTWFpbidcbiAgICAgIGNhc2UgODg6XG4gICAgICAgIHJldHVybiAnRXh0ZW5kZWQnXG4gICAgICBjYXNlIDEwMDpcbiAgICAgICAgcmV0dXJuICdIaWdoJ1xuICAgICAgY2FzZSAxMTA6XG4gICAgICAgIHJldHVybiAnSGlnaDEwJ1xuICAgICAgY2FzZSAxMjI6XG4gICAgICAgIHJldHVybiAnSGlnaDQyMidcbiAgICAgIGNhc2UgMjQ0OlxuICAgICAgICByZXR1cm4gJ0hpZ2g0NDQnXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ1Vua25vd24nXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldExldmVsU3RyaW5nIChsZXZlbElkYykge1xuICAgIHJldHVybiAobGV2ZWxJZGMgLyAxMCkudG9GaXhlZCgxKVxuICB9XG5cbiAgc3RhdGljIGdldENocm9tYUZvcm1hdFN0cmluZyAoY2hyb21hKSB7XG4gICAgc3dpdGNoIChjaHJvbWEpIHtcbiAgICAgIGNhc2UgNDIwOlxuICAgICAgICByZXR1cm4gJzQ6MjowJ1xuICAgICAgY2FzZSA0MjI6XG4gICAgICAgIHJldHVybiAnNDoyOjInXG4gICAgICBjYXNlIDQ0NDpcbiAgICAgICAgcmV0dXJuICc0OjQ6NCdcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnVW5rbm93bidcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgdG9WaWRlb01ldGEgKHNwc0NvbmZpZykge1xuICAgIGxldCBtZXRhID0ge31cbiAgICBpZiAoc3BzQ29uZmlnICYmIHNwc0NvbmZpZy5jb2RlY19zaXplKSB7XG4gICAgICBtZXRhLmNvZGVjV2lkdGggPSBzcHNDb25maWcuY29kZWNfc2l6ZS53aWR0aFxuICAgICAgbWV0YS5jb2RlY0hlaWdodCA9IHNwc0NvbmZpZy5jb2RlY19zaXplLmhlaWdodFxuICAgICAgbWV0YS5wcmVzZW50V2lkdGggPSBzcHNDb25maWcucHJlc2VudF9zaXplLndpZHRoXG4gICAgICBtZXRhLnByZXNlbnRIZWlnaHQgPSBzcHNDb25maWcucHJlc2VudF9zaXplLmhlaWdodFxuICAgIH1cblxuICAgIG1ldGEucHJvZmlsZSA9IHNwc0NvbmZpZy5wcm9maWxlX3N0cmluZ1xuICAgIG1ldGEubGV2ZWwgPSBzcHNDb25maWcubGV2ZWxfc3RyaW5nXG4gICAgbWV0YS5iaXREZXB0aCA9IHNwc0NvbmZpZy5iaXRfZGVwdGhcbiAgICBtZXRhLmNocm9tYUZvcm1hdCA9IHNwc0NvbmZpZy5jaHJvbWFfZm9ybWF0XG5cbiAgICBtZXRhLnBhclJhdGlvID0ge1xuICAgICAgd2lkdGg6IHNwc0NvbmZpZy5wYXJfcmF0aW8ud2lkdGgsXG4gICAgICBoZWlnaHQ6IHNwc0NvbmZpZy5wYXJfcmF0aW8uaGVpZ2h0XG4gICAgfVxuXG4gICAgbWV0YS5mcmFtZVJhdGUgPSBzcHNDb25maWcuZnJhbWVfcmF0ZVxuXG4gICAgbGV0IGZwc0RlbiA9IG1ldGEuZnJhbWVSYXRlLmZwc19kZW5cbiAgICBsZXQgZnBzTnVtID0gbWV0YS5mcmFtZVJhdGUuZnBzX251bVxuICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb24gPSBNYXRoLmZsb29yKG1ldGEudGltZXNjYWxlICogKGZwc0RlbiAvIGZwc051bSkpXG4gICAgcmV0dXJuIG1ldGE7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU1BTUGFyc2VyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gSExTXG4gIE0zVThQYXJzZXI6IHJlcXVpcmUoJy4vc3JjL2hscy9kZW11eGVyL20zdThwYXJzZXInKS5kZWZhdWx0LFxuICBUc0RlbXV4ZXI6IHJlcXVpcmUoJy4vc3JjL2hscy9kZW11eGVyL3RzJykuZGVmYXVsdCxcbiAgUGxheWxpc3Q6IHJlcXVpcmUoJy4vc3JjL2hscy9wbGF5bGlzdCcpLmRlZmF1bHQsXG4gIEZsdkRlbXV4ZXI6IHJlcXVpcmUoJy4vc3JjL2Zsdi9pbmRleCcpLmRlZmF1bHRcbn07XG4iLCJpbXBvcnQgeyBpc0xlLCBVVEY4IH0gZnJvbSAneGdwbGF5ZXItdXRpbHMnXG5cbmNvbnN0IERBVEFfVFlQRVMgPSB7XG4gIE5VTUJFUjogMCxcbiAgQk9PTEVBTjogMSxcbiAgU1RSSU5HOiAyLFxuICBPQkpFQ1Q6IDMsXG4gIE1JWF9BUlJBWTogOCxcbiAgT0JKRUNUX0VORDogOSxcbiAgU1RSSUNUX0FSUkFZOiAxMCxcbiAgREFURTogMTEsXG4gIExPTkVfU1RSSU5HOiAxMlxufVxuXG4vKipcbiAqIG1ldGHkv6Hmga/op6PmnpBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQU1GUGFyc2VyIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMub2Zmc2V0ID0gMFxuICAgIHRoaXMucmVhZE9mZnNldCA9IHRoaXMub2Zmc2V0XG4gIH1cblxuICByZXNvbHZlIChtZXRhLCBzaXplKSB7XG4gICAgaWYgKHNpemUgPCAzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBlbm91Z2ggZGF0YSBmb3IgbWV0YWluZm8nKVxuICAgIH1cbiAgICBjb25zdCBtZXRhRGF0YSA9IHt9XG4gICAgY29uc3QgbmFtZSA9IHRoaXMucGFyc2VWYWx1ZShtZXRhKVxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5wYXJzZVZhbHVlKG1ldGEsIHNpemUgLSBuYW1lLmJvZHlTaXplKVxuICAgIG1ldGFEYXRhW25hbWUuZGF0YV0gPSB2YWx1ZS5kYXRhXG5cbiAgICB0aGlzLnJlc2V0U3RhdHVzKClcbiAgICByZXR1cm4gbWV0YURhdGFcbiAgfVxuXG4gIHJlc2V0U3RhdHVzICgpIHtcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgICB0aGlzLnJlYWRPZmZzZXQgPSB0aGlzLm9mZnNldFxuICB9XG5cbiAgcGFyc2VTdHJpbmcgKGJ1ZmZlcikge1xuICAgIGNvbnN0IGR2ID0gbmV3IERhdGFWaWV3KGJ1ZmZlciwgdGhpcy5yZWFkT2Zmc2V0KVxuICAgIGNvbnN0IHN0ckxlbiA9IGR2LmdldFVpbnQxNigwLCAhaXNMZSlcbiAgICBsZXQgc3RyID0gJydcbiAgICBpZiAoc3RyTGVuID4gMCkge1xuICAgICAgc3RyID0gVVRGOC5kZWNvZGUobmV3IFVpbnQ4QXJyYXkoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQgKyAyLCBzdHJMZW4pKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSAnJ1xuICAgIH1cbiAgICBsZXQgc2l6ZSA9IHN0ckxlbiArIDJcbiAgICB0aGlzLnJlYWRPZmZzZXQgKz0gc2l6ZVxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBzdHIsXG4gICAgICBib2R5U2l6ZTogc3RyTGVuICsgMlxuICAgIH1cbiAgfVxuXG4gIHBhcnNlRGF0ZSAoYnVmZmVyLCBzaXplKSB7XG4gICAgY29uc3QgZHYgPSBuZXcgRGF0YVZpZXcoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQsIHNpemUpXG4gICAgbGV0IHRzID0gZHYuZ2V0RmxvYXQ2NCgwLCAhaXNMZSlcbiAgICBjb25zdCB0aW1lT2Zmc2V0ID0gZHYuZ2V0SW50MTYoOCwgIWlzTGUpXG4gICAgdHMgKz0gdGltZU9mZnNldCAqIDYwICogMTAwMFxuXG4gICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDEwXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IG5ldyBEYXRlKHRzKSxcbiAgICAgIGJvZHlTaXplOiAxMFxuICAgIH1cbiAgfVxuXG4gIHBhcnNlT2JqZWN0IChidWZmZXIsIHNpemUpIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5wYXJzZVN0cmluZyhidWZmZXIsIHNpemUpXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnBhcnNlVmFsdWUoYnVmZmVyLCBzaXplIC0gbmFtZS5ib2R5U2l6ZSlcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YToge1xuICAgICAgICBuYW1lOiBuYW1lLmRhdGEsXG4gICAgICAgIHZhbHVlOiB2YWx1ZS5kYXRhXG4gICAgICB9LFxuICAgICAgYm9keVNpemU6IG5hbWUuYm9keVNpemUgKyB2YWx1ZS5ib2R5U2l6ZSxcbiAgICAgIGlzT2JqRW5kOiB2YWx1ZS5pc09iakVuZFxuICAgIH1cbiAgfVxuXG4gIHBhcnNlTG9uZ1N0cmluZyAoYnVmZmVyKSB7XG4gICAgY29uc3QgZHYgPSBuZXcgRGF0YVZpZXcoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQpXG4gICAgY29uc3Qgc3RyTGVuID0gZHYuZ2V0VWludDMyKDAsICFpc0xlKVxuICAgIGxldCBzdHIgPSAnJ1xuICAgIGlmIChzdHJMZW4gPiAwKSB7XG4gICAgICBzdHIgPSBVVEY4LmRlY29kZShuZXcgVWludDhBcnJheShidWZmZXIsIHRoaXMucmVhZE9mZnNldCArIDIsIHN0ckxlbikpXG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciA9ICcnXG4gICAgfVxuICAgIC8vIGNvbnN0IHNpemUgPSBzdHJMZW4gKyA0O1xuICAgIHRoaXMucmVhZE9mZnNldCArPSBzdHJMZW4gKyA0XG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IHN0cixcbiAgICAgIGJvZHlTaXplOiBzdHJMZW4gKyA0XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOino+aekG1ldGHkuK3nmoTlj5jph49cbiAgICovXG4gIHBhcnNlVmFsdWUgKGRhdGEsIHNpemUpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKClcbiAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICBidWZmZXIgPSBkYXRhXG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1ZmZlciA9IGRhdGEuYnVmZmVyXG4gICAgfVxuICAgIGNvbnN0IHtcbiAgICAgIE5VTUJFUixcbiAgICAgIEJPT0xFQU4sXG4gICAgICBTVFJJTkcsXG4gICAgICBPQkpFQ1QsXG4gICAgICBNSVhfQVJSQVksXG4gICAgICBPQkpFQ1RfRU5ELFxuICAgICAgU1RSSUNUX0FSUkFZLFxuICAgICAgREFURSxcbiAgICAgIExPTkVfU1RSSU5HXG4gICAgfSA9IERBVEFfVFlQRVNcbiAgICBjb25zdCBkYXRhVmlldyA9IG5ldyBEYXRhVmlldyhidWZmZXIsIHRoaXMucmVhZE9mZnNldCwgc2l6ZSlcbiAgICBsZXQgaXNPYmpFbmQgPSBmYWxzZVxuICAgIGNvbnN0IHR5cGUgPSBkYXRhVmlldy5nZXRVaW50OCgwKVxuICAgIGxldCBvZmZzZXQgPSAxXG4gICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDFcbiAgICBsZXQgdmFsdWUgPSBudWxsXG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgTlVNQkVSOiB7XG4gICAgICAgIHZhbHVlID0gZGF0YVZpZXcuZ2V0RmxvYXQ2NCgxLCAhaXNMZSlcbiAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDhcbiAgICAgICAgb2Zmc2V0ICs9IDhcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGNhc2UgQk9PTEVBTjoge1xuICAgICAgICBjb25zdCBib29sTnVtID0gZGF0YVZpZXcuZ2V0VWludDgoMSlcbiAgICAgICAgdmFsdWUgPSAhIWJvb2xOdW1cbiAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDFcbiAgICAgICAgb2Zmc2V0ICs9IDFcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGNhc2UgU1RSSU5HOiB7XG4gICAgICAgIGNvbnN0IHN0ciA9IHRoaXMucGFyc2VTdHJpbmcoYnVmZmVyKVxuICAgICAgICB2YWx1ZSA9IHN0ci5kYXRhXG4gICAgICAgIG9mZnNldCArPSBzdHIuYm9keVNpemVcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGNhc2UgT0JKRUNUOiB7XG4gICAgICAgIHZhbHVlID0ge31cbiAgICAgICAgbGV0IG9iakVuZFNpemUgPSAwXG4gICAgICAgIGlmIChkYXRhVmlldy5nZXRVaW50MzIoc2l6ZSAtIDQsICFpc0xlKSAmIDB4MDBGRkZGRkYpIHtcbiAgICAgICAgICBvYmpFbmRTaXplID0gM1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMucmVhZE9mZnNldCArPSBvZmZzZXQgLSAxO1xuICAgICAgICB3aGlsZSAob2Zmc2V0IDwgc2l6ZSAtIDQpIHtcbiAgICAgICAgICBjb25zdCBhbWZPYmogPSB0aGlzLnBhcnNlT2JqZWN0KGJ1ZmZlciwgc2l6ZSAtIG9mZnNldCAtIG9iakVuZFNpemUpXG4gICAgICAgICAgaWYgKGFtZk9iai5pc09iamVjdEVuZCkgeyBicmVhayB9XG4gICAgICAgICAgdmFsdWVbYW1mT2JqLmRhdGEubmFtZV0gPSBhbWZPYmouZGF0YS52YWx1ZVxuICAgICAgICAgIG9mZnNldCArPSBhbWZPYmouYm9keVNpemVcbiAgICAgICAgfVxuICAgICAgICBpZiAob2Zmc2V0IDw9IHNpemUgLSAzKSB7XG4gICAgICAgICAgY29uc3QgbWFyayA9IGRhdGFWaWV3LmdldFVpbnQzMihvZmZzZXQgLSAxLCAhaXNMZSkgJiAweDAwRkZGRkZGXG4gICAgICAgICAgaWYgKG1hcmsgPT09IDkpIHtcbiAgICAgICAgICAgIHRoaXMucmVhZE9mZnNldCArPSAzXG4gICAgICAgICAgICBvZmZzZXQgKz0gM1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgY2FzZSBNSVhfQVJSQVk6IHtcbiAgICAgICAgdmFsdWUgPSB7fVxuICAgICAgICBvZmZzZXQgKz0gNFxuICAgICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gNFxuICAgICAgICBsZXQgb2JqRW5kU2l6ZSA9IDBcbiAgICAgICAgaWYgKChkYXRhVmlldy5nZXRVaW50MzIoc2l6ZSAtIDQsICFpc0xlKSAmIDB4MDBGRkZGRkYpID09PSA5KSB7XG4gICAgICAgICAgb2JqRW5kU2l6ZSA9IDNcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChvZmZzZXQgPCBzaXplIC0gOCkge1xuICAgICAgICAgIGNvbnN0IGFtZlZhciA9IHRoaXMucGFyc2VPYmplY3QoYnVmZmVyLCBzaXplIC0gb2Zmc2V0IC0gb2JqRW5kU2l6ZSlcbiAgICAgICAgICBpZiAoYW1mVmFyLmlzT2JqZWN0RW5kKSB7IGJyZWFrIH1cbiAgICAgICAgICB2YWx1ZVthbWZWYXIuZGF0YS5uYW1lXSA9IGFtZlZhci5kYXRhLnZhbHVlXG4gICAgICAgICAgb2Zmc2V0ICs9IGFtZlZhci5ib2R5U2l6ZVxuICAgICAgICB9XG4gICAgICAgIGlmIChvZmZzZXQgPD0gc2l6ZSAtIDMpIHtcbiAgICAgICAgICBjb25zdCBtYXJrZXIgPSBkYXRhVmlldy5nZXRVaW50MzIob2Zmc2V0IC0gMSwgIWlzTGUpICYgMHgwMEZGRkZGRlxuICAgICAgICAgIGlmIChtYXJrZXIgPT09IDkpIHtcbiAgICAgICAgICAgIG9mZnNldCArPSAzXG4gICAgICAgICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gM1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBjYXNlIE9CSkVDVF9FTkQ6IHtcbiAgICAgICAgdmFsdWUgPSBudWxsXG4gICAgICAgIGlzT2JqRW5kID0gdHJ1ZVxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBjYXNlIFNUUklDVF9BUlJBWToge1xuICAgICAgICB2YWx1ZSA9IFtdXG4gICAgICAgIGNvbnN0IGFyckxlbmd0aCA9IGRhdGFWaWV3LmdldFVpbnQzMigxLCAhaXNMZSlcbiAgICAgICAgb2Zmc2V0ICs9IDRcbiAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDRcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IHNjcmlwdCA9IHRoaXMucGFyc2VWYWx1ZShidWZmZXIsIHNpemUgLSBvZmZzZXQpXG4gICAgICAgICAgdmFsdWUucHVzaChzY3JpcHQuZGF0YSlcbiAgICAgICAgICBvZmZzZXQgKz0gc2NyaXB0LmJvZHlTaXplXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgY2FzZSBEQVRFOiB7XG4gICAgICAgIGNvbnN0IGRhdGUgPSB0aGlzLnBhcnNlRGF0ZShidWZmZXIsIHNpemUgLSAxKVxuICAgICAgICB2YWx1ZSA9IGRhdGUuZGF0YVxuICAgICAgICBvZmZzZXQgKz0gZGF0ZS5ib2R5U2l6ZVxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBjYXNlIExPTkVfU1RSSU5HOiB7XG4gICAgICAgIGNvbnN0IGxvbmdTdHIgPSB0aGlzLnBhcnNlTG9uZ1N0cmluZyhidWZmZXIsIHNpemUgLSAxKVxuICAgICAgICB2YWx1ZSA9IGxvbmdTdHIuZGF0YVxuICAgICAgICBvZmZzZXQgKz0gbG9uZ1N0ci5ib2R5U2l6ZVxuICAgICAgICBicmVha1xuICAgICAgfVxuXG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIG9mZnNldCA9IHNpemVcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogdmFsdWUsXG4gICAgICBib2R5U2l6ZTogb2Zmc2V0LFxuICAgICAgaXNPYmpFbmQ6IGlzT2JqRW5kXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBFVkVOVFMsIEF1ZGlvVHJhY2tNZXRhLCBWaWRlb1RyYWNrTWV0YSwgc25pZmZlciB9IGZyb20gJ3hncGxheWVyLXV0aWxzJztcbmltcG9ydCB7IFNwc1BhcnNlciB9IGZyb20gJ3hncGxheWVyLWNvZGVjJztcbmltcG9ydCB7IFZpZGVvVHJhY2ssIEF1ZGlvVHJhY2sgfSBmcm9tICd4Z3BsYXllci1idWZmZXInXG5pbXBvcnQgQU1GUGFyc2VyIGZyb20gJy4vYW1mLXBhcnNlcidcblxuY29uc3QgREVNVVhfRVZFTlRTID0gRVZFTlRTLkRFTVVYX0VWRU5UUztcblxuY2xhc3MgRmx2RGVtdXhlciB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLl9maXJzdEZyYWdtZW50TG9hZGVkID0gZmFsc2VcbiAgICB0aGlzLl90cmFja051bSA9IDBcbiAgICB0aGlzLl9oYXNTY3JpcHQgPSBmYWxzZVxuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgdGhpcy5vbihERU1VWF9FVkVOVFMuREVNVVhfU1RBUlQsIHRoaXMuZG9QYXJzZUZsdi5iaW5kKHRoaXMpKVxuICB9XG5cbiAgLyoqXG4gICAqIGlmIHRoZSBmbHYgaGVhZCBpcyB2YWxpZFxuICAgKiBAcGFyYW0gZGF0YVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHN0YXRpYyBpc0ZsdkZpbGUgKGRhdGEpIHtcbiAgICByZXR1cm4gIShkYXRhWzBdICE9PSAweDQ2IHx8IGRhdGFbMV0gIT09IDB4NEMgfHwgZGF0YVsyXSAhPT0gMHg1NiB8fCBkYXRhWzNdICE9PSAweDAxKVxuICB9XG5cbiAgLyoqXG4gICAqIElmIHRoZSBzdHJlYW0gaGFzIGF1ZGlvIG9yIHZpZGVvLlxuICAgKiBAcGFyYW0ge251bWJlcn0gc3RyZWFtRmxhZyAtIERhdGEgZnJvbSB0aGUgc3RyZWFtIHdoaWNoIGlzIGRlZmluZSB3aGV0aGVyIHRoZSBhdWRpbyAvIHZpZGVvIHRyYWNrIGlzIGV4aXN0LlxuICAgKi9cbiAgc3RhdGljIGdldFBsYXlUeXBlIChzdHJlYW1GbGFnKSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgaGFzVmlkZW86IGZhbHNlLFxuICAgICAgaGFzQXVkaW86IGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKHN0cmVhbUZsYWcgJiAweDAxID4gMCkge1xuICAgICAgcmVzdWx0Lmhhc1ZpZGVvID0gdHJ1ZVxuICAgIH1cblxuICAgIGlmIChzdHJlYW1GbGFnICYgMHgwNCA+IDApIHtcbiAgICAgIHJlc3VsdC5oYXNBdWRpbyA9IHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICBkb1BhcnNlRmx2ICgpIHtcbiAgICBpZiAoIXRoaXMuX2ZpcnN0RnJhZ21lbnRMb2FkZWQpIHtcbiAgICAgIGlmICh0aGlzLmxvYWRlckJ1ZmZlci5sZW5ndGggPCAxMykge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IGhlYWRlciA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDEzKVxuICAgICAgdGhpcy5wYXJzZUZsdkhlYWRlcihoZWFkZXIpXG4gICAgICB0aGlzLmRvUGFyc2VGbHYoKSAvLyDpgJLlvZLosIPnlKjvvIznu6fnu63op6PmnpBmbHbmtYFcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMubG9hZGVyQnVmZmVyLmxlbmd0aCA8IDExKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgbGV0IGNodW5rO1xuXG4gICAgICBsZXQgbG9vcE1heCA9IDEwMDAwMCAvLyDpmLLmraLmrbvlvqrnjq/kuqfnlJ9cbiAgICAgIGRvIHtcbiAgICAgICAgY2h1bmsgPSB0aGlzLl9wYXJzZUZsdlRhZygpXG4gICAgICB9IHdoaWxlIChjaHVuayAmJiBsb29wTWF4LS0gPiAwKVxuXG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0NPTVBMRVRFKVxuICAgIH1cbiAgfVxuXG4gIHBhcnNlRmx2SGVhZGVyIChoZWFkZXIpIHtcbiAgICBpZiAoIUZsdkRlbXV4ZXIuaXNGbHZGaWxlKGhlYWRlcikpIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIG5ldyBFcnJvcignaW52YWxpZCBmbHYgZmlsZScpKVxuICAgICAgdGhpcy5kb1BhcnNlRmx2KClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZmlyc3RGcmFnbWVudExvYWRlZCA9IHRydWVcbiAgICAgIGNvbnN0IHBsYXlUeXBlID0gRmx2RGVtdXhlci5nZXRQbGF5VHlwZShoZWFkZXJbNF0pXG5cbiAgICAgIGlmIChwbGF5VHlwZS5oYXNWaWRlbykge1xuICAgICAgICB0aGlzLmluaXRWaWRlb1RyYWNrKClcbiAgICAgIH1cblxuICAgICAgaWYgKHBsYXlUeXBlLmhhc0F1ZGlvKSB7XG4gICAgICAgIHRoaXMuaW5pdEF1ZGlvVHJhY2soKVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmRvUGFyc2VGbHYoKVxuICB9XG5cbiAgLyoqXG4gICAqIGluaXQgZGVmYXVsdCB2aWRlbyB0cmFjayBjb25maWdzXG4gICAqL1xuICBpbml0VmlkZW9UcmFjayAoKSB7XG4gICAgdGhpcy5fdHJhY2tOdW0rK1xuICAgIGxldCB2aWRlb1RyYWNrID0gbmV3IFZpZGVvVHJhY2soKVxuICAgIHZpZGVvVHJhY2subWV0YSA9IG5ldyBWaWRlb1RyYWNrTWV0YSgpXG4gICAgdmlkZW9UcmFjay5pZCA9IHZpZGVvVHJhY2subWV0YS5pZCA9IHRoaXMuX3RyYWNrTnVtXG5cbiAgICB0aGlzLnRyYWNrcy52aWRlb1RyYWNrID0gdmlkZW9UcmFja1xuICB9XG5cbiAgLyoqXG4gICAqIGluaXQgZGVmYXVsdCBhdWRpbyB0cmFjayBjb25maWdzXG4gICAqL1xuICBpbml0QXVkaW9UcmFjayAoKSB7XG4gICAgdGhpcy5fdHJhY2tOdW0rK1xuICAgIGxldCBhdWRpb1RyYWNrID0gbmV3IEF1ZGlvVHJhY2soKVxuICAgIGF1ZGlvVHJhY2subWV0YSA9IG5ldyBBdWRpb1RyYWNrTWV0YSgpXG4gICAgYXVkaW9UcmFjay5pZCA9IGF1ZGlvVHJhY2subWV0YS5pZCA9IHRoaXMuX3RyYWNrTnVtXG5cbiAgICB0aGlzLnRyYWNrcy5hdWRpb1RyYWNrID0gYXVkaW9UcmFja1xuICB9XG5cbiAgLyoqXG4gICAqIFBhY2thZ2UgdGhlIGRhdGEgYXMgdGhlIGZvbGxvd2luZyBkYXRhIHN0cnVjdHVyZVxuICAgKiB7XG4gICAqICAgIGRhdGE6IFVpbnQ4QXJyYXkuIHRoZSBTdHJlYW0gZGF0YS5cbiAgICogICAgaW5mbzogVGhlIGZpcnN0IGJ5dGUgaW5mbyBvZiB0aGUgVGFnLlxuICAgKiAgICB0YWdUeXBlOiA444CBOeOAgTE4XG4gICAqICAgIHRpbWVTdGFtcDogdGhlIHRpbWVzdGVtcFxuICAgKiB9XG4gICAqL1xuICBfcGFyc2VGbHZUYWcgKCkge1xuICAgIGlmICh0aGlzLmxvYWRlckJ1ZmZlci5sZW5ndGggPCAxMSkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgbGV0IGNodW5rID0gdGhpcy5fcGFyc2VGbHZUYWdIZWFkZXIoKVxuICAgIGlmIChjaHVuaykge1xuICAgICAgdGhpcy5fcHJvY2Vzc0NodW5rKGNodW5rKVxuICAgIH1cbiAgICByZXR1cm4gY2h1bmtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZSB0aGUgMTEgYnl0ZSB0YWcgSGVhZGVyXG4gICAqL1xuICBfcGFyc2VGbHZUYWdIZWFkZXIgKCkge1xuICAgIGxldCBvZmZzZXQgPSAwXG4gICAgbGV0IGNodW5rID0ge31cblxuICAgIGxldCB0YWdUeXBlID0gdGhpcy5sb2FkZXJCdWZmZXIudG9JbnQob2Zmc2V0LCAxKVxuICAgIG9mZnNldCArPSAxXG5cbiAgICAvLyAyIGJpdCBGTVMgcmVzZXJ2ZWQsIDEgYml0IGZpbHRlcmVkLCA1IGJpdCB0YWcgdHlwZVxuICAgIGNodW5rLmZpbHRlcmVkID0gKHRhZ1R5cGUgJiAzMikgPj4+IDVcbiAgICBjaHVuay50YWdUeXBlID0gdGFnVHlwZSAmIDMxXG5cbiAgICAvLyAzIEJ5dGUgZGF0YXNpemVcbiAgICBjaHVuay5kYXRhc2l6ZSA9IHRoaXMubG9hZGVyQnVmZmVyLnRvSW50KG9mZnNldCwgMylcbiAgICBvZmZzZXQgKz0gM1xuXG4gICAgaWYgKChjaHVuay50YWdUeXBlICE9PSA4ICYmIGNodW5rLnRhZ1R5cGUgIT09IDkgJiYgY2h1bmsudGFnVHlwZSAhPT0gMTEgJiYgY2h1bmsudGFnVHlwZSAhPT0gMTgpIHx8XG4gICAgICB0aGlzLmxvYWRlckJ1ZmZlci50b0ludCg4LCAzKSAhPT0gMCkge1xuICAgICAgaWYgKHRoaXMubG9hZGVyQnVmZmVyICYmIHRoaXMubG9hZGVyQnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMSlcbiAgICAgIH1cbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIHRoaXMuVEFHLCBuZXcgRXJyb3IoJ3RhZ1R5cGUgJyArIGNodW5rLnRhZ1R5cGUpLCBmYWxzZSlcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgaWYgKHRoaXMubG9hZGVyQnVmZmVyLmxlbmd0aCA8IGNodW5rLmRhdGFzaXplICsgMTUpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG4gICAgLy8gcmVhZCB0aGUgZGF0YS5cbiAgICB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCg0KVxuXG4gICAgLy8gMyBCeXRlIHRpbWVzdGFtcFxuICAgIGxldCB0aW1lc3RhbXAgPSB0aGlzLmxvYWRlckJ1ZmZlci50b0ludCgwLCAzKVxuICAgIHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDMpXG5cbiAgICAvLyAxIEJ5dGUgdGltZXN0YW1wRXh0XG4gICAgbGV0IHRpbWVzdGFtcEV4dCA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDEpWzBdXG4gICAgaWYgKHRpbWVzdGFtcEV4dCA+IDApIHtcbiAgICAgIHRpbWVzdGFtcCArPSB0aW1lc3RhbXBFeHQgKiAweDEwMDAwMDBcbiAgICB9XG5cbiAgICBjaHVuay5kdHMgPSB0aW1lc3RhbXBcblxuICAgIC8vIHN0cmVhbUlkXG4gICAgdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMylcbiAgICByZXR1cm4gY2h1bmtcbiAgfVxuXG4gIF9wcm9jZXNzQ2h1bmsgKGNodW5rKSB7XG4gICAgc3dpdGNoIChjaHVuay50YWdUeXBlKSB7XG4gICAgICBjYXNlIDE4OlxuICAgICAgICB0aGlzLl9wYXJzZVNjcmlwdERhdGEoY2h1bmspXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDg6XG4gICAgICAgIHRoaXMuX3BhcnNlQUFDRGF0YShjaHVuaylcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgOTpcbiAgICAgICAgdGhpcy5fcGFyc2VIZXZjRGF0YShjaHVuaylcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMTE6XG4gICAgICAgIC8vIGZvciBzb21lIENETiB0aGF0IGRpZCBub3QgcHJvY2VzcyB0aGUgY3VycmVjdCBSVE1QIG1lc3NhZ2VzXG4gICAgICAgIHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDMpXG4gICAgICAgIGJyZWFrXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgxKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBwYXJzZSBmbHYgc2NyaXB0IGRhdGFcbiAgICogQHBhcmFtIGNodW5rXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfcGFyc2VTY3JpcHREYXRhIChjaHVuaykge1xuICAgIGxldCBhdWRpb1RyYWNrID0gdGhpcy50cmFja3MuYXVkaW9UcmFja1xuICAgIGxldCB2aWRlb1RyYWNrID0gdGhpcy50cmFja3MudmlkZW9UcmFja1xuXG4gICAgbGV0IGRhdGEgPSB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdChjaHVuay5kYXRhc2l6ZSlcblxuICAgIGNvbnN0IGluZm8gPSBuZXcgQU1GUGFyc2VyKCkucmVzb2x2ZShkYXRhLCBkYXRhLmxlbmd0aClcblxuICAgIGNvbnN0IG9uTWV0YURhdGEgPSB0aGlzLl9jb250ZXh0Lm9uTWV0YURhdGEgPSBpbmZvID8gaW5mby5vbk1ldGFEYXRhIDogdW5kZWZpbmVkXG5cbiAgICAvLyBmaWxsIG1lZGlhSW5mb1xuICAgIHRoaXMuX2NvbnRleHQubWVkaWFJbmZvLmR1cmF0aW9uID0gb25NZXRhRGF0YS5kdXJhdGlvblxuICAgIHRoaXMuX2NvbnRleHQubWVkaWFJbmZvLmhhc1ZpZGVvID0gb25NZXRhRGF0YS5oYXNWaWRlb1xuICAgIHRoaXMuX2NvbnRleHQubWVkaWFJbmZvLmhzYUF1ZGlvID0gb25NZXRhRGF0YS5oYXNBdWRpb1xuXG4gICAgbGV0IHZhbGlkYXRlID0gdGhpcy5fZGF0YXNpemVWYWxpZGF0b3IoY2h1bmsuZGF0YXNpemUpXG4gICAgaWYgKHZhbGlkYXRlKSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FRElBX0lORk8pXG4gICAgICB0aGlzLl9oYXNTY3JpcHQgPSB0cnVlXG4gICAgfVxuXG4gICAgLy8gRWRpdCBkZWZhdWx0IG1ldGEuXG4gICAgaWYgKGF1ZGlvVHJhY2sgJiYgIWF1ZGlvVHJhY2suaGFzU3BlY2lmaWNDb25maWcpIHtcbiAgICAgIGxldCBtZXRhID0gYXVkaW9UcmFjay5tZXRhXG4gICAgICBpZiAob25NZXRhRGF0YS5hdWRpb3NhbXBsZXJhdGUpIHtcbiAgICAgICAgbWV0YS5zYW1wbGVSYXRlID0gb25NZXRhRGF0YS5hdWRpb3NhbXBsZXJhdGVcbiAgICAgIH1cblxuICAgICAgaWYgKG9uTWV0YURhdGEuYXVkaW9jaGFubmVscykge1xuICAgICAgICBtZXRhLmNoYW5uZWxDb3VudCA9IG9uTWV0YURhdGEuYXVkaW9jaGFubmVsc1xuICAgICAgfVxuXG4gICAgICBzd2l0Y2ggKG9uTWV0YURhdGEuYXVkaW9zYW1wbGVyYXRlKSB7XG4gICAgICAgIGNhc2UgNDQxMDA6XG4gICAgICAgICAgbWV0YS5zYW1wbGVSYXRlSW5kZXggPSA0XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAyMjA1MDpcbiAgICAgICAgICBtZXRhLnNhbXBsZVJhdGVJbmRleCA9IDdcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDExMDI1OlxuICAgICAgICAgIG1ldGEuc2FtcGxlUmF0ZUluZGV4ID0gMTBcbiAgICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodmlkZW9UcmFjayAmJiAhdmlkZW9UcmFjay5oYXNTcGVjaWZpY0NvbmZpZykge1xuICAgICAgbGV0IG1ldGEgPSB2aWRlb1RyYWNrLm1ldGFcbiAgICAgIGlmICh0eXBlb2Ygb25NZXRhRGF0YS5mcmFtZXJhdGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGxldCBmcHNOdW0gPSBNYXRoLmZsb29yKG9uTWV0YURhdGEuZnJhbWVyYXRlICogMTAwMClcbiAgICAgICAgaWYgKGZwc051bSA+IDApIHtcbiAgICAgICAgICBsZXQgZnBzID0gZnBzTnVtIC8gMTAwMFxuICAgICAgICAgIGlmICghbWV0YS5mcmFtZVJhdGUpIHtcbiAgICAgICAgICAgIG1ldGEuZnJhbWVSYXRlID0ge31cbiAgICAgICAgICB9XG4gICAgICAgICAgbWV0YS5mcmFtZVJhdGUuZml4ZWQgPSB0cnVlXG4gICAgICAgICAgbWV0YS5mcmFtZVJhdGUuZnBzID0gZnBzXG4gICAgICAgICAgbWV0YS5mcmFtZVJhdGUuZnBzX251bSA9IGZwc051bVxuICAgICAgICAgIG1ldGEuZnJhbWVSYXRlLmZwc19kZW4gPSAxMDAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfYWFjU2VxdWVuY2VIZWFkZXJQYXJzZXIgKGRhdGEpIHtcbiAgICBsZXQgcmV0ID0ge31cbiAgICByZXQuaGFzU3BlY2lmaWNDb25maWcgPSB0cnVlXG4gICAgcmV0Lm9iamVjdFR5cGUgPSBkYXRhWzFdID4+PiAzXG4gICAgcmV0Lm9yaWdpbk9iamVjdFR5cGUgPSByZXQub2JqZWN0VHlwZVxuICAgIHJldC5zYW1wbGVSYXRlSW5kZXggPSAoKGRhdGFbMV0gJiA3KSA8PCAxKSB8IChkYXRhWzJdID4+PiA3KVxuICAgIHJldC5hdWRpb3NhbXBsZXJhdGUgPSB0aGlzLl9zd2l0Y2hBdWRpb1NhbXBsZVJhdGUocmV0LnNhbXBsZVJhdGVJbmRleClcbiAgICByZXQuY2hhbm5lbENvdW50ID0gKGRhdGFbMl0gJiAxMjApID4+PiAzXG4gICAgcmV0LmZyYW1lTGVuZ3RoID0gKGRhdGFbMl0gJiA0KSA+Pj4gMlxuICAgIHJldC5kZXBlbmRzT25Db3JlQ29kZXIgPSAoZGF0YVsyXSAmIDIpID4+PiAxXG4gICAgcmV0LmV4dGVuc2lvbkZsYWdJbmRleCA9IGRhdGFbMl0gJiAxXG5cbiAgICByZXQuY29kZWMgPSBgbXA0YS40MC4ke3JldC5vYmplY3RUeXBlfWBcbiAgICBsZXQgdXNlckFnZW50ID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbiAgICBsZXQgZXh0ZW5zaW9uU2FtcGxpbmdJbmRleDtcblxuICAgIGxldCBjb25maWc7XG4gICAgbGV0IHNhbXBsaW5nSW5kZXggPSByZXQuc2FtcGxlUmF0ZUluZGV4O1xuXG4gICAgaWYgKHVzZXJBZ2VudC5pbmRleE9mKCdmaXJlZm94JykgIT09IC0xKSB7XG4gICAgICAvLyBmaXJlZm94OiB1c2UgU0JSIChIRS1BQUMpIGlmIGZyZXEgbGVzcyB0aGFuIDI0a0h6XG4gICAgICBpZiAocmV0LnNhbXBsZVJhdGVJbmRleCA+PSA2KSB7XG4gICAgICAgIHJldC5vYmplY3RUeXBlID0gNTtcbiAgICAgICAgY29uZmlnID0gbmV3IEFycmF5KDQpO1xuICAgICAgICBleHRlbnNpb25TYW1wbGluZ0luZGV4ID0gc2FtcGxpbmdJbmRleCAtIDM7XG4gICAgICB9IGVsc2UgeyAvLyB1c2UgTEMtQUFDXG4gICAgICAgIHJldC5vYmplY3RUeXBlID0gMjtcbiAgICAgICAgY29uZmlnID0gbmV3IEFycmF5KDIpO1xuICAgICAgICBleHRlbnNpb25TYW1wbGluZ0luZGV4ID0gc2FtcGxpbmdJbmRleDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHVzZXJBZ2VudC5pbmRleE9mKCdhbmRyb2lkJykgIT09IC0xIHx8IHNuaWZmZXIuYnJvd3NlciA9PT0gJ3NhZmFyaScpIHtcbiAgICAgIC8vIGFuZHJvaWQ6IGFsd2F5cyB1c2UgTEMtQUFDXG4gICAgICByZXQub2JqZWN0VHlwZSA9IDI7XG4gICAgICBjb25maWcgPSBuZXcgQXJyYXkoMik7XG4gICAgICBleHRlbnNpb25TYW1wbGluZ0luZGV4ID0gc2FtcGxpbmdJbmRleDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZm9yIG90aGVyIGJyb3dzZXJzLCBlLmcuIGNocm9tZS4uLlxuICAgICAgLy8gQWx3YXlzIHVzZSBIRS1BQUMgdG8gbWFrZSBpdCBlYXNpZXIgdG8gc3dpdGNoIGFhYyBjb2RlYyBwcm9maWxlXG4gICAgICByZXQub2JqZWN0VHlwZSA9IDU7XG4gICAgICBleHRlbnNpb25TYW1wbGluZ0luZGV4ID0gcmV0LnNhbXBsZVJhdGVJbmRleDtcbiAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSg0KTtcblxuICAgICAgaWYgKHJldC5zYW1wbGVSYXRlSW5kZXggPj0gNikge1xuICAgICAgICBleHRlbnNpb25TYW1wbGluZ0luZGV4ID0gcmV0LnNhbXBsZVJhdGVJbmRleCAtIDM7XG4gICAgICB9IGVsc2UgaWYgKHJldC5jaGFubmVsQ291bnQgPT09IDEpIHsgLy8gTW9ubyBjaGFubmVsXG4gICAgICAgIHJldC5vYmplY3RUeXBlID0gMjtcbiAgICAgICAgY29uZmlnID0gbmV3IEFycmF5KDIpO1xuICAgICAgICBleHRlbnNpb25TYW1wbGluZ0luZGV4ID0gcmV0LnNhbXBsZVJhdGVJbmRleDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25maWdbMF0gPSByZXQub2JqZWN0VHlwZSA8PCAzO1xuICAgIGNvbmZpZ1swXSB8PSAocmV0LnNhbXBsZVJhdGVJbmRleCAmIDB4MEYpID4+PiAxO1xuICAgIGNvbmZpZ1sxXSA9IChyZXQuc2FtcGxlUmF0ZUluZGV4ICYgMHgwRikgPDwgNztcbiAgICBjb25maWdbMV0gfD0gKHJldC5jaGFubmVsQ291bnQgJiAweDBGKSA8PCAzO1xuICAgIGlmIChyZXQub2JqZWN0VHlwZSA9PT0gNSkge1xuICAgICAgY29uZmlnWzFdIHw9ICgoZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCAmIDB4MEYpID4+PiAxKTtcbiAgICAgIGNvbmZpZ1syXSA9IChleHRlbnNpb25TYW1wbGluZ0luZGV4ICYgMHgwMSkgPDwgNztcbiAgICAgIC8vIGV4dGVuZGVkIGF1ZGlvIG9iamVjdCB0eXBlOiBmb3JjZSB0byAyIChMQy1BQUMpXG4gICAgICBjb25maWdbMl0gfD0gKDIgPDwgMik7XG4gICAgICBjb25maWdbM10gPSAwO1xuICAgIH1cbiAgICByZXQuY29uZmlnID0gY29uZmlnXG4gICAgcmV0dXJuIHJldFxuICB9XG5cbiAgX3BhcnNlQUFDRGF0YSAoY2h1bmspIHtcbiAgICBsZXQgdHJhY2sgPSB0aGlzLnRyYWNrcy5hdWRpb1RyYWNrXG4gICAgaWYgKCF0cmFjaykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IG1ldGEgPSB0cmFjay5tZXRhXG5cbiAgICBpZiAoIW1ldGEpIHtcbiAgICAgIHRyYWNrLm1ldGEgPSBuZXcgQXVkaW9UcmFja01ldGEoKVxuICAgICAgbWV0YSA9IHRyYWNrLm1ldGE7XG4gICAgfVxuXG4gICAgbGV0IGluZm8gPSB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgxKVswXVxuXG4gICAgY2h1bmsuZGF0YSA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KGNodW5rLmRhdGFzaXplIC0gMSlcblxuICAgIGxldCBmb3JtYXQgPSAoaW5mbyAmIDI0MCkgPj4+IDRcblxuICAgIHRyYWNrLmZvcm1hdCA9IGZvcm1hdFxuXG4gICAgaWYgKGZvcm1hdCAhPT0gMTApIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIG5ldyBFcnJvcihgaW52YWxpZCBhdWRpbyBmb3JtYXQ6ICR7Zm9ybWF0fWApKVxuICAgIH1cblxuICAgIGlmIChmb3JtYXQgPT09IDEwICYmICF0aGlzLl9oYXNBdWRpb1NlcXVlbmNlKSB7XG4gICAgICBtZXRhLnNhbXBsZVJhdGUgPSB0aGlzLl9zd2l0Y2hBdWRpb1NhbXBsaW5nRnJlcXVlbmN5KGluZm8pXG4gICAgICBtZXRhLnNhbXBsZVJhdGVJbmRleCA9IChpbmZvICYgMTIpID4+PiAyXG4gICAgICBtZXRhLmZyYW1lTGVudGggPSAoaW5mbyAmIDIpID4+PiAxXG4gICAgICBtZXRhLmNoYW5uZWxDb3VudCA9IGluZm8gJiAxXG4gICAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uID0gTWF0aC5mbG9vcigxMDI0IC8gbWV0YS5hdWRpb1NhbXBsZVJhdGUgKiBtZXRhLnRpbWVzY2FsZSlcbiAgICB9XG5cbiAgICBsZXQgYXVkaW9TYW1wbGVSYXRlID0gbWV0YS5hdWRpb1NhbXBsZVJhdGVcbiAgICBsZXQgYXVkaW9TYW1wbGVSYXRlSW5kZXggPSBtZXRhLnNhbXBsZVJhdGVJbmRleFxuICAgIGxldCByZWZTYW1wbGVEdXJhdGlvbiA9IG1ldGEucmVmU2FtcGxlRHVyYXRpb25cblxuICAgIGRlbGV0ZSBjaHVuay50YWdUeXBlXG4gICAgbGV0IHZhbGlkYXRlID0gdGhpcy5fZGF0YXNpemVWYWxpZGF0b3IoY2h1bmsuZGF0YXNpemUpXG5cbiAgICBpZiAoY2h1bmsuZGF0YVswXSA9PT0gMCkgeyAvLyBBQUMgU2VxdWVuY2UgSGVhZGVyXG4gICAgICBsZXQgYWFjSGVhZGVyID0gdGhpcy5fYWFjU2VxdWVuY2VIZWFkZXJQYXJzZXIoY2h1bmsuZGF0YSlcbiAgICAgIGF1ZGlvU2FtcGxlUmF0ZSA9IGFhY0hlYWRlci5hdWRpb3NhbXBsZXJhdGUgfHwgbWV0YS5hdWRpb1NhbXBsZVJhdGVcbiAgICAgIGF1ZGlvU2FtcGxlUmF0ZUluZGV4ID0gYWFjSGVhZGVyLnNhbXBsZVJhdGVJbmRleCB8fCBtZXRhLnNhbXBsZVJhdGVJbmRleFxuICAgICAgcmVmU2FtcGxlRHVyYXRpb24gPSBNYXRoLmZsb29yKDEwMjQgLyBhdWRpb1NhbXBsZVJhdGUgKiBtZXRhLnRpbWVzY2FsZSlcblxuICAgICAgbWV0YS5jaGFubmVsQ291bnQgPSBhYWNIZWFkZXIuY2hhbm5lbENvdW50XG4gICAgICBtZXRhLnNhbXBsZVJhdGUgPSBhdWRpb1NhbXBsZVJhdGVcbiAgICAgIG1ldGEuc2FtcGxlUmF0ZUluZGV4ID0gYXVkaW9TYW1wbGVSYXRlSW5kZXhcbiAgICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb24gPSByZWZTYW1wbGVEdXJhdGlvblxuICAgICAgbWV0YS5kdXJhdGlvbiA9IHRoaXMuX2NvbnRleHQubWVkaWFJbmZvLmR1cmF0aW9uICogbWV0YS50aW1lc2NhbGVcbiAgICAgIG1ldGEuY29uZmlnID0gYWFjSGVhZGVyLmNvbmZpZ1xuICAgICAgbWV0YS5vYmplY3RUeXBlID0gYWFjSGVhZGVyLm9iamVjdFR5cGU7XG4gICAgICBtZXRhLm9yaWdpbk9iamVjdFR5cGUgPSBhYWNIZWFkZXIub3JpZ2luT2JqZWN0VHlwZTtcblxuICAgICAgY29uc3QgYXVkaW9NZWRpYSA9IHRoaXMuX2NvbnRleHQubWVkaWFJbmZvLmF1ZGlvXG5cbiAgICAgIC8vIGZpbGwgYXVkaW8gbWVkaWEgaW5mb1xuICAgICAgYXVkaW9NZWRpYS5jb2RlYyA9IGFhY0hlYWRlci5jb2RlY1xuICAgICAgYXVkaW9NZWRpYS5jaGFubmVsQ291bnQgPSBhYWNIZWFkZXIuY2hhbm5lbENvdW50XG4gICAgICBhdWRpb01lZGlhLnNhbXBsZVJhdGUgPSBhdWRpb1NhbXBsZVJhdGVcbiAgICAgIGF1ZGlvTWVkaWEuc2FtcGxlUmF0ZUluZGV4ID0gYWFjSGVhZGVyLmF1ZGlvU2FtcGxlUmF0ZUluZGV4XG5cbiAgICAgIGlmICh0aGlzLl9oYXNTY3JpcHQgJiYgIXRoaXMuX2hhc0F1ZGlvU2VxdWVuY2UpIHtcbiAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICdhdWRpbycpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2hhc1NjcmlwdCAmJiB0aGlzLl9oYXNBdWRpb1NlcXVlbmNlKSB7XG4gICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAnYXVkaW8nKVxuICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkFVRElPX01FVEFEQVRBX0NIQU5HRSlcbiAgICAgICAgLy8gdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICdhdWRpbycpXG4gICAgICB9XG4gICAgICB0aGlzLl9oYXNBdWRpb1NlcXVlbmNlID0gdHJ1ZVxuXG4gICAgICB0aGlzLl9tZXRhQ2hhbmdlID0gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5fbWV0YUNoYW5nZSkge1xuICAgICAgICBjaHVuay5vcHRpb25zID0ge1xuICAgICAgICAgIG1ldGE6IHRyYWNrLm1ldGFcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fbWV0YUNoYW5nZSA9IGZhbHNlXG4gICAgICB9XG5cbiAgICAgIGNodW5rLmRhdGEgPSBjaHVuay5kYXRhLnNsaWNlKDEsIGNodW5rLmRhdGEubGVuZ3RoKVxuICAgICAgdHJhY2suc2FtcGxlcy5wdXNoKGNodW5rKVxuICAgIH1cbiAgICBpZiAoIXZhbGlkYXRlKSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLlRBRywgbmV3IEVycm9yKCdUQUcgbGVuZ3RoIGVycm9yIGF0ICcgKyBjaHVuay5kYXRhc2l6ZSksIGZhbHNlKVxuICAgICAgLy8gdGhpcy5sb2dnZXIud2Fybih0aGlzLlRBRywgZXJyb3IubWVzc2FnZSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcGFyc2UgaGV2Yy9hdmMgdmlkZW8gZGF0YVxuICAgKiBAcGFyYW0gY2h1bmtcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9wYXJzZUhldmNEYXRhIChjaHVuaykge1xuICAgIC8vIGhlYWRlclxuICAgIGxldCBpbmZvID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMSlbMF1cbiAgICBjaHVuay5mcmFtZVR5cGUgPSAoaW5mbyAmIDB4ZjApID4+PiA0XG4gICAgY2h1bmsuaXNLZXlmcmFtZSA9IGNodW5rLmZyYW1lVHlwZSA9PT0gMVxuICAgIC8vIGxldCB0ZW1wQ29kZWNJRCA9IHRoaXMudHJhY2tzLnZpZGVvVHJhY2suY29kZWNJRFxuICAgIGxldCBjb2RlY0lEID0gaW5mbyAmIDB4MGZcbiAgICB0aGlzLnRyYWNrcy52aWRlb1RyYWNrLmNvZGVjSUQgPSBjb2RlY0lEXG5cbiAgICAvLyBoZXZj5ZKMYXZj55qEaGVhZGVy6Kej5p6Q5pa55byP5LiA5qC3XG4gICAgY2h1bmsuYXZjUGFja2V0VHlwZSA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDEpWzBdXG4gICAgY2h1bmsuY3RzID0gdGhpcy5sb2FkZXJCdWZmZXIudG9JbnQoMCwgMylcbiAgICB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgzKVxuXG4gICAgLy8gMTIgZm9yIGhldmMsIDcgZm9yIGF2Y1xuICAgIGlmIChjb2RlY0lEID09PSAxMikge1xuICAgICAgY29uc3QgZGF0YSA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KGNodW5rLmRhdGFzaXplIC0gNSlcbiAgICAgIGNodW5rLmRhdGEgPSBkYXRhXG5cbiAgICAgIGlmIChOdW1iZXIucGFyc2VJbnQoY2h1bmsuYXZjUGFja2V0VHlwZSkgIT09IDApIHtcbiAgICAgICAgaWYgKCF0aGlzLl9kYXRhc2l6ZVZhbGlkYXRvcihjaHVuay5kYXRhc2l6ZSkpIHtcbiAgICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLlRBRywgbmV3IEVycm9yKGBpbnZhbGlkIHZpZGVvIHRhZyBkYXRhc2l6ZTogJHtjaHVuay5kYXRhc2l6ZX1gKSwgZmFsc2UpXG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5hbHUgPSB7fVxuICAgICAgICBsZXQgciA9IDBcbiAgICAgICAgbmFsdS5jdHMgPSBjaHVuay5jdHNcbiAgICAgICAgbmFsdS5kdHMgPSBjaHVuay5kdHNcbiAgICAgICAgd2hpbGUgKGNodW5rLmRhdGEubGVuZ3RoID4gcikge1xuICAgICAgICAgIGxldCBzaXplcyA9IGNodW5rLmRhdGEuc2xpY2UoTnVtYmVyLnBhcnNlSW50KHIpLCA0ICsgcilcbiAgICAgICAgICBuYWx1LnNpemUgPSBzaXplc1szXVxuICAgICAgICAgIG5hbHUuc2l6ZSArPSBzaXplc1syXSAqIDI1NlxuICAgICAgICAgIG5hbHUuc2l6ZSArPSBzaXplc1sxXSAqIDI1NiAqIDI1NlxuICAgICAgICAgIG5hbHUuc2l6ZSArPSBzaXplc1swXSAqIDI1NiAqIDI1NiAqIDI1NlxuICAgICAgICAgIHIgKz0gNFxuICAgICAgICAgIG5hbHUuZGF0YSA9IGNodW5rLmRhdGEuc2xpY2UoTnVtYmVyLnBhcnNlSW50KHIpLCBuYWx1LnNpemUgKyByKVxuICAgICAgICAgIHIgKz0gbmFsdS5zaXplXG4gICAgICAgICAgdGhpcy50cmFja3MudmlkZW9UcmFjay5zYW1wbGVzLnB1c2gobmFsdSlcbiAgICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgJ3ZpZGVvJylcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChOdW1iZXIucGFyc2VJbnQoY2h1bmsuYXZjUGFja2V0VHlwZSkgPT09IDApIHtcbiAgICAgICAgaWYgKCF0aGlzLl9kYXRhc2l6ZVZhbGlkYXRvcihjaHVuay5kYXRhc2l6ZSkpIHtcbiAgICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLlRBRywgbmV3IEVycm9yKGBpbnZhbGlkIHZpZGVvIHRhZyBkYXRhc2l6ZTogJHtjaHVuay5kYXRhc2l6ZX1gKSwgZmFsc2UpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICd2aWRlbycpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNvZGVjSUQgPT09IDcpIHtcbiAgICAgIGxldCBkYXRhID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoY2h1bmsuZGF0YXNpemUgLSA1KVxuICAgICAgaWYgKGRhdGFbNF0gPT09IDAgJiYgZGF0YVs1XSA9PT0gMCAmJiBkYXRhWzZdID09PSAwICYmIGRhdGFbN10gPT09IDEpIHtcbiAgICAgICAgbGV0IGF2Y2NsZW5ndGggPSAwXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgYXZjY2xlbmd0aCA9IGF2Y2NsZW5ndGggKiAyNTYgKyBkYXRhW2ldXG4gICAgICAgIH1cbiAgICAgICAgYXZjY2xlbmd0aCAtPSA0XG4gICAgICAgIGRhdGEgPSBkYXRhLnNsaWNlKDQsIGRhdGEubGVuZ3RoKVxuICAgICAgICBkYXRhWzNdID0gYXZjY2xlbmd0aCAlIDI1NlxuICAgICAgICBhdmNjbGVuZ3RoID0gKGF2Y2NsZW5ndGggLSBkYXRhWzNdKSAvIDI1NlxuICAgICAgICBkYXRhWzJdID0gYXZjY2xlbmd0aCAlIDI1NlxuICAgICAgICBhdmNjbGVuZ3RoID0gKGF2Y2NsZW5ndGggLSBkYXRhWzJdKSAvIDI1NlxuICAgICAgICBkYXRhWzFdID0gYXZjY2xlbmd0aCAlIDI1NlxuICAgICAgICBkYXRhWzBdID0gKGF2Y2NsZW5ndGggLSBkYXRhWzFdKSAvIDI1NlxuICAgICAgfVxuXG4gICAgICBjaHVuay5kYXRhID0gZGF0YVxuICAgICAgLy8gSWYgaXQgaXMgQVZDIHNlcXVlY2UgSGVhZGVyLlxuICAgICAgaWYgKGNodW5rLmF2Y1BhY2tldFR5cGUgPT09IDApIHtcbiAgICAgICAgdGhpcy5fYXZjU2VxdWVuY2VIZWFkZXJQYXJzZXIoY2h1bmsuZGF0YSlcbiAgICAgICAgbGV0IHZhbGlkYXRlID0gdGhpcy5fZGF0YXNpemVWYWxpZGF0b3IoY2h1bmsuZGF0YXNpemUpXG4gICAgICAgIGlmICh2YWxpZGF0ZSkge1xuICAgICAgICAgIGlmICh0aGlzLl9oYXNTY3JpcHQgJiYgIXRoaXMuX2hhc1ZpZGVvU2VxdWVuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAndmlkZW8nKVxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5faGFzU2NyaXB0ICYmIHRoaXMuX2hhc1ZpZGVvU2VxdWVuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAnYXVkaW8nKVxuICAgICAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5WSURFT19NRVRBREFUQV9DSEFOR0UpXG4gICAgICAgICAgICAvLyB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgJ3ZpZGVvJylcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5faGFzVmlkZW9TZXF1ZW5jZSA9IHRydWVcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tZXRhQ2hhbmdlID0gdHJ1ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCF0aGlzLl9kYXRhc2l6ZVZhbGlkYXRvcihjaHVuay5kYXRhc2l6ZSkpIHtcbiAgICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLlRBRywgbmV3IEVycm9yKGBpbnZhbGlkIHZpZGVvIHRhZyBkYXRhc2l6ZTogJHtjaHVuay5kYXRhc2l6ZX1gKSwgZmFsc2UpXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9tZXRhQ2hhbmdlKSB7XG4gICAgICAgICAgY2h1bmsub3B0aW9ucyA9IHtcbiAgICAgICAgICAgIG1ldGE6IE9iamVjdC5hc3NpZ24oe30sIHRoaXMudHJhY2tzLnZpZGVvVHJhY2subWV0YSlcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fbWV0YUNoYW5nZSA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50cmFja3MudmlkZW9UcmFjay5zYW1wbGVzLnB1c2goY2h1bmspXG4gICAgICAgIC8vIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfQ09NUExFVEUpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIHRoaXMuVEFHLCBuZXcgRXJyb3IoYHZpZGVvIGNvZGVpZCBpcyAke2NvZGVjSUR9YCksIGZhbHNlKVxuICAgICAgY2h1bmsuZGF0YSA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KGNodW5rLmRhdGFzaXplIC0gMSlcbiAgICAgIGlmICghdGhpcy5fZGF0YXNpemVWYWxpZGF0b3IoY2h1bmsuZGF0YXNpemUpKSB7XG4gICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIHRoaXMuVEFHLCBuZXcgRXJyb3IoYGludmFsaWQgdmlkZW8gdGFnIGRhdGFzaXplOiAke2NodW5rLmRhdGFzaXplfWApLCBmYWxzZSlcbiAgICAgIH1cbiAgICAgIHRoaXMudHJhY2tzLnZpZGVvVHJhY2suc2FtcGxlcy5wdXNoKGNodW5rKVxuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9DT01QTEVURSlcbiAgICB9XG4gICAgZGVsZXRlIGNodW5rLnRhZ1R5cGVcbiAgfVxuXG4gIC8qKlxuICAgKiBwYXJzZSBhdmMgbWV0YWRhdGFcbiAgICogQHBhcmFtIGRhdGFcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9hdmNTZXF1ZW5jZUhlYWRlclBhcnNlciAoZGF0YSkge1xuICAgIGxldCB0cmFjayA9IHRoaXMudHJhY2tzLnZpZGVvVHJhY2tcblxuICAgIGlmICghdHJhY2spIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBvZmZzZXQgPSAwXG5cbiAgICBpZiAoIXRyYWNrLm1ldGEpIHtcbiAgICAgIHRyYWNrLm1ldGEgPSBuZXcgVmlkZW9UcmFja01ldGEoKVxuICAgIH1cbiAgICBsZXQgbWV0YSA9IHRyYWNrLm1ldGFcblxuICAgIG1ldGEuY29uZmlndXJhdGlvblZlcnNpb24gPSBkYXRhWzBdXG4gICAgbWV0YS5hdmNQcm9maWxlSW5kaWNhdGlvbiA9IGRhdGFbMV1cbiAgICBtZXRhLnByb2ZpbGVDb21wYXRpYmlsaXR5ID0gZGF0YVsyXVxuICAgIG1ldGEuYXZjTGV2ZWxJbmRpY2F0aW9uID0gZGF0YVszXSAvIDEwXG4gICAgbWV0YS5uYWxVbml0TGVuZ3RoID0gKGRhdGFbNF0gJiAweDAzKSArIDFcblxuICAgIGxldCBudW1PZlNwcyA9IGRhdGFbNV0gJiAweDFmXG4gICAgb2Zmc2V0ID0gNlxuICAgIGxldCBjb25maWcgPSB7fVxuXG4gICAgLy8gcGFyc2UgU1BTXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1PZlNwczsgaSsrKSB7XG4gICAgICBsZXQgc2l6ZSA9IGRhdGFbb2Zmc2V0XSAqIDI1NSArIGRhdGFbb2Zmc2V0ICsgMV1cbiAgICAgIG9mZnNldCArPSAyXG5cbiAgICAgIGxldCBzcHMgPSBuZXcgVWludDhBcnJheShzaXplKVxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaXplOyBqKyspIHtcbiAgICAgICAgc3BzW2pdID0gZGF0YVtvZmZzZXQgKyBqXVxuICAgICAgfVxuXG4gICAgICAvLyBjb2RlYyBzdHJpbmdcbiAgICAgIGxldCBjb2RlY1N0cmluZyA9ICdhdmMxLidcbiAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgNDsgaisrKSB7XG4gICAgICAgIGxldCBoID0gc3BzW2pdLnRvU3RyaW5nKDE2KVxuICAgICAgICBpZiAoaC5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgaCA9ICcwJyArIGhcbiAgICAgICAgfVxuICAgICAgICBjb2RlY1N0cmluZyArPSBoXG4gICAgICB9XG5cbiAgICAgIG1ldGEuY29kZWMgPSBjb2RlY1N0cmluZ1xuXG4gICAgICBvZmZzZXQgKz0gc2l6ZVxuICAgICAgdGhpcy50cmFja3MudmlkZW9UcmFjay5tZXRhLnNwcyA9IHNwc1xuICAgICAgY29uZmlnID0gU3BzUGFyc2VyLnBhcnNlU1BTKHNwcylcbiAgICB9XG5cbiAgICBsZXQgbnVtT2ZQcHMgPSBkYXRhW29mZnNldF1cblxuICAgIG9mZnNldCsrXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bU9mUHBzOyBpKyspIHtcbiAgICAgIGxldCBzaXplID0gZGF0YVtvZmZzZXRdICogMjU1ICsgZGF0YVtvZmZzZXQgKyAxXVxuICAgICAgb2Zmc2V0ICs9IDJcbiAgICAgIGxldCBwcHMgPSBuZXcgVWludDhBcnJheShzaXplKVxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaXplOyBqKyspIHtcbiAgICAgICAgcHBzW2pdID0gZGF0YVtvZmZzZXQgKyBqXVxuICAgICAgfVxuICAgICAgb2Zmc2V0ICs9IHNpemVcbiAgICAgIHRoaXMudHJhY2tzLnZpZGVvVHJhY2subWV0YS5wcHMgPSBwcHNcbiAgICB9XG5cbiAgICBPYmplY3QuYXNzaWduKG1ldGEsIFNwc1BhcnNlci50b1ZpZGVvTWV0YShjb25maWcpKVxuXG4gICAgLy8gZmlsbCB2aWRlbyBtZWRpYSBpbmZvXG4gICAgY29uc3QgdmlkZW9NZWRpYSA9IHRoaXMuX2NvbnRleHQubWVkaWFJbmZvLnZpZGVvXG5cbiAgICB2aWRlb01lZGlhLmNvZGVjID0gbWV0YS5jb2RlY1xuICAgIHZpZGVvTWVkaWEucHJvZmlsZSA9IG1ldGEucHJvZmlsZVxuICAgIHZpZGVvTWVkaWEubGV2ZWwgPSBtZXRhLmxldmVsXG4gICAgdmlkZW9NZWRpYS5jaHJvbWFGb3JtYXQgPSBtZXRhLmNocm9tYUZvcm1hdFxuICAgIHZpZGVvTWVkaWEuZnJhbWVSYXRlID0gbWV0YS5mcmFtZVJhdGVcbiAgICB2aWRlb01lZGlhLnBhclJhdGlvID0gbWV0YS5wYXJSYXRpb1xuICAgIHZpZGVvTWVkaWEud2lkdGggPSB2aWRlb01lZGlhLndpZHRoID09PSBtZXRhLnByZXNlbnRXaWR0aCA/IHZpZGVvTWVkaWEud2lkdGggOiBtZXRhLnByZXNlbnRXaWR0aFxuICAgIHZpZGVvTWVkaWEuaGVpZ2h0ID0gdmlkZW9NZWRpYS5oZWlnaHQgPT09IG1ldGEucHJlc2VudEhlaWdodCA/IHZpZGVvTWVkaWEud2lkdGggOiBtZXRhLnByZXNlbnRIZWlnaHRcblxuICAgIG1ldGEuZHVyYXRpb24gPSB0aGlzLl9jb250ZXh0Lm1lZGlhSW5mby5kdXJhdGlvbiAqIG1ldGEudGltZXNjYWxlXG4gICAgbWV0YS5hdmNjID0gbmV3IFVpbnQ4QXJyYXkoZGF0YS5sZW5ndGgpXG4gICAgbWV0YS5hdmNjLnNldChkYXRhKVxuICAgIHRyYWNrLm1ldGEgPSBtZXRhXG4gIH1cblxuICAvKipcbiAgICogY2hvb3NlIGF1ZGlvIHNhbXBsZSByYXRlXG4gICAqIEBwYXJhbSBzYW1wbGluZ0ZyZXF1ZW5jeUluZGV4XG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc3dpdGNoQXVkaW9TYW1wbGVSYXRlIChzYW1wbGluZ0ZyZXF1ZW5jeUluZGV4KSB7XG4gICAgbGV0IHNhbXBsaW5nRnJlcXVlbmN5TGlzdCA9IFs5NjAwMCwgODgyMDAsIDY0MDAwLCA0ODAwMCwgNDQxMDAsIDMyMDAwLCAyNDAwMCwgMjIwNTAsIDE2MDAwLCAxMjAwMCwgMTEwMjUsIDgwMDAsIDczNTBdXG4gICAgcmV0dXJuIHNhbXBsaW5nRnJlcXVlbmN5TGlzdFtzYW1wbGluZ0ZyZXF1ZW5jeUluZGV4XVxuICB9XG5cbiAgLyoqXG4gICAqIGNob29zZSBhdWRpbyBzYW1wbGluZyBmcmVxdWVuY2VcbiAgICogQHBhcmFtIGluZm9cbiAgICogQHJldHVybnMge251bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9zd2l0Y2hBdWRpb1NhbXBsaW5nRnJlcXVlbmN5IChpbmZvKSB7XG4gICAgbGV0IHNhbXBsaW5nRnJlcXVlbmN5SW5kZXggPSAoaW5mbyAmIDEyKSA+Pj4gMlxuICAgIGxldCBzYW1wbGluZ0ZyZXF1ZW5jeUxpc3QgPSBbNTUwMCwgMTEwMjUsIDIyMDUwLCA0NDEwMCwgNDgwMDBdXG4gICAgcmV0dXJuIHNhbXBsaW5nRnJlcXVlbmN5TGlzdFtzYW1wbGluZ0ZyZXF1ZW5jeUluZGV4XVxuICB9XG5cbiAgLyoqXG4gICAqIGNob29zZSBhdWRpbyBjaGFubmVsIGNvdW50XG4gICAqIEBwYXJhbSBpbmZvXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc3dpdGNoQXVkaW9DaGFubmVsIChpbmZvKSB7XG4gICAgbGV0IHNhbXBsZVRyYWNrTnVtSW5kZXggPSBpbmZvICYgMVxuICAgIGxldCBzYW1wbGVUcmFja051bUxpc3QgPSBbMSwgMl1cbiAgICByZXR1cm4gc2FtcGxlVHJhY2tOdW1MaXN0W3NhbXBsZVRyYWNrTnVtSW5kZXhdXG4gIH1cblxuICAvKipcbiAgICogY2hlY2sgZGF0YXNpemUgaXMgdmFsaWQgdXNlIDQgQnl0ZSBhZnRlciBjdXJyZW50IHRhZ1xuICAgKiBAcGFyYW0gZGF0YXNpemVcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZGF0YXNpemVWYWxpZGF0b3IgKGRhdGFzaXplKSB7XG4gICAgbGV0IGRhdGFzaXplQ29uZmlybSA9IHRoaXMubG9hZGVyQnVmZmVyLnRvSW50KDAsIDQpXG4gICAgdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoNClcbiAgICByZXR1cm4gZGF0YXNpemVDb25maXJtID09PSBkYXRhc2l6ZSArIDExXG4gIH1cblxuICBnZXQgbG9hZGVyQnVmZmVyICgpIHtcbiAgICBjb25zdCBidWZmZXIgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdMT0FERVJfQlVGRkVSJylcbiAgICBpZiAoYnVmZmVyKSB7XG4gICAgICByZXR1cm4gYnVmZmVyXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIG5ldyBFcnJvcign5om+5LiN5YiwIGxvYWRlckJ1ZmZlciDlrp7kvosnKSlcbiAgICB9XG4gIH1cblxuICBnZXQgdHJhY2tzICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJylcbiAgfVxuXG4gIGdldCBsb2dnZXIgKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdMT0dHRVInKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZsdkRlbXV4ZXJcbiIsIi8qKlxuICogUmVmZXJlbmNlOiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjODIxNiNzZWN0aW9uLTQuM1xuICovXG5jbGFzcyBNM1U4UGFyc2VyIHtcbiAgc3RhdGljIHBhcnNlICh0ZXh0LCBiYXNldXJsID0gJycpIHtcbiAgICBsZXQgcmV0ID0ge1xuICAgICAgZHVyYXRpb246IDBcbiAgICB9O1xuICAgIGlmICghdGV4dCB8fCAhdGV4dC5zcGxpdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgcmVmcyA9IHRleHQuc3BsaXQoL1xccnxcXG4vKTtcbiAgICByZWZzID0gcmVmcy5maWx0ZXIoKHJlZikgPT4ge1xuICAgICAgcmV0dXJuIHJlZjtcbiAgICB9KVxuICAgIGxldCByZWYgPSByZWZzLnNoaWZ0KClcbiAgICBpZiAoIXJlZi5tYXRjaCgnI0VYVE0zVScpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgbTN1OCBmaWxlOiBub3QgXCIjRVhUTTNVXCJgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZWYgPSByZWZzLnNoaWZ0KClcbiAgICB3aGlsZSAocmVmKSB7XG4gICAgICBsZXQgcmVmbSA9IHJlZi5tYXRjaCgvIyguW0EtWnwtXSopOiguKikvKTtcbiAgICAgIGxldCByZWZkID0gcmVmLm1hdGNoKC8jKC5bQS1afC1dKikvKTtcbiAgICAgIGlmIChyZWZkICYmIHJlZm0gJiYgcmVmbS5sZW5ndGggPiAyKSB7XG4gICAgICAgIHN3aXRjaCAocmVmbVsxXSkge1xuICAgICAgICAgIGNhc2UgJ0VYVC1YLVZFUlNJT04nOlxuICAgICAgICAgICAgcmV0LnZlcnNpb24gPSBwYXJzZUludChyZWZtWzJdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ0VYVC1YLU1FRElBLVNFUVVFTkNFJzpcbiAgICAgICAgICAgIHJldC5zZXF1ZW5jZSA9IHBhcnNlSW50KHJlZm1bMl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnRVhULVgtVEFSR0VURFVSQVRJT04nOlxuICAgICAgICAgICAgcmV0LnRhcmdldGR1cmF0aW9uID0gcGFyc2VGbG9hdChyZWZtWzJdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ0VYVElORic6XG4gICAgICAgICAgICBNM1U4UGFyc2VyLnBhcnNlRnJhZyhyZWZtLCByZWZzLCByZXQsIGJhc2V1cmwpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnRVhULVgtS0VZJzpcbiAgICAgICAgICAgIE0zVThQYXJzZXIucGFyc2VEZWNyeXB0KHJlZm1bMl0scmV0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSBpZihyZWZkICYmIHJlZmQubGVuZ3RoID4gMSkge1xuICAgICAgICBzd2l0Y2gocmVmZFsxXSkge1xuICAgICAgICAgIGNhc2UgJ0VYVC1YLURJU0NPTlRJTlVJVFknOlxuICAgICAgICAgICAgcmVmID0gcmVmcy5zaGlmdCgpO1xuICAgICAgICAgICAgbGV0IHJlZm0gPSByZWYubWF0Y2goLyMoLltBLVp8LV0qKTooLiopLyk7XG4gICAgICAgICAgICBpZihyZWZtLmxlbmd0aCA+MiAmJiByZWZtWzFdID09PSAnRVhUSU5GJykge1xuICAgICAgICAgICAgICBNM1U4UGFyc2VyLnBhcnNlRnJhZyhyZWZtLCByZWZzLCByZXQsIGJhc2V1cmwsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZWYgPSByZWZzLnNoaWZ0KClcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZUZyYWcgKHJlZm0sIHJlZnMsIHJldCwgYmFzZXVybCwgZGlzY29udGludWUpIHtcbiAgICBpZiAoIXJldC5mcmFncykge1xuICAgICAgcmV0LmZyYWdzID0gW11cbiAgICB9XG5cbiAgICBsZXQgZnJlZyA9IHtcbiAgICAgIHN0YXJ0OiByZXQuZHVyYXRpb24sXG4gICAgICBkdXJhdGlvbjogcGFyc2VGbG9hdChyZWZtWzJdKSAqIDEwMDBcbiAgICB9XG5cbiAgICByZXQuZHVyYXRpb24gKz0gZnJlZy5kdXJhdGlvbjtcbiAgICBsZXQgbmV4dGxpbmUgPSByZWZzLnNoaWZ0KCk7XG4gICAgaWYgKG5leHRsaW5lLm1hdGNoKC8jKC4qKTooLiopLykpIHtcbiAgICAgIG5leHRsaW5lID0gcmVmcy5zaGlmdCgpO1xuICAgIH1cbiAgICBpZiAobmV4dGxpbmUubGVuZ3RoID4gMCAmJiBuZXh0bGluZS5jaGFyQXQoMCkgPT09ICcvJyAmJiBiYXNldXJsLm1hdGNoKC8uKlxcL1xcLy4qXFwuXFx3Ky9nKSkge1xuICAgICAgYmFzZXVybCA9IGJhc2V1cmwubWF0Y2goLy4qXFwvXFwvLipcXC5cXHcrL2cpWzBdO1xuICAgIH1cbiAgICBpZiAobmV4dGxpbmUubWF0Y2goLy4qOlxcL1xcLy4qLykpIHtcbiAgICAgIGZyZWcudXJsID0gbmV4dGxpbmU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZyZWcudXJsID0gYmFzZXVybCArIG5leHRsaW5lO1xuICAgIH1cbiAgICBmcmVnLmRpc2NvbnRpbnVlID0gZGlzY29udGludWU7XG4gICAgcmV0LmZyYWdzLnB1c2goZnJlZyk7XG4gIH1cblxuICBzdGF0aWMgcGFyc2VVUkwgKHVybCkge1xuICAgIGxldCBiYXNldXJsID0gJyc7XG4gICAgbGV0IHVybHMgPSB1cmwubWF0Y2goLyguKlxcLykuKlxcLm0zdTgvKTtcbiAgICBpZiAodXJscyAmJiB1cmxzLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdXJscy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodXJsc1tpXS5tYXRjaCgvLipcXC8kL2cpICYmIHVybHNbaV0ubGVuZ3RoID4gYmFzZXVybC5sZW5ndGgpIHtcbiAgICAgICAgICBiYXNldXJsID0gdXJsc1tpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYmFzZXVybDtcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZURlY3J5cHQocmVmbSwgcmV0KSB7XG4gICAgcmV0LmVuY3J5cHQgPSB7fTtcbiAgICBsZXQgcmVmcyA9IHJlZm0uc3BsaXQoJywnKTtcbiAgICBmb3IgKGxldCBpIGluIHJlZnMpIHsgXG4gICAgICBsZXQgY21kID0gcmVmc1tpXTtcbiAgICAgIGlmKGNtZC5tYXRjaCgvTUVUSE9EPSguKikvKSkge1xuICAgICAgICByZXQuZW5jcnlwdC5tZXRob2QgPSBjbWQubWF0Y2goL01FVEhPRD0oLiopLylbMV07XG4gICAgICB9XG4gICAgICBpZihjbWQubWF0Y2goL1VSST1cIiguKilcIi8pKSB7XG4gICAgICAgIHJldC5lbmNyeXB0LnVyaSA9IGNtZC5tYXRjaCgvVVJJPVwiKC4qKVwiLylbMV07XG4gICAgICB9XG5cbiAgICAgIGlmKGNtZC5tYXRjaCgvSVY9MHgoLiopLykpIHtcbiAgICAgICAgbGV0IGl2ID0gY21kLm1hdGNoKC9JVj0weCguKikvKVsxXTtcbiAgICAgICAgbGV0IGxlbmd0aCA9IE1hdGguY2VpbChpdi5sZW5ndGggLyAyKTtcbiAgICAgICAgcmV0LmVuY3J5cHQuaXZiID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKTtcbiAgICAgICAgZm9yKGxldCBpID0gbGVuZ3RoIC0gMTsgaSA+PTA7IGktLSkge1xuICAgICAgICAgIGxldCBpbSA9IHBhcnNlSW50KGl2LnN1YnN0cihpICogMiwgMiksIDE2KTtcbiAgICAgICAgICByZXQuZW5jcnlwdC5pdmJbaV0gPSBpbTtcbiAgICAgICAgfSBcbiAgICAgICAgcmV0LmVuY3J5cHQuaXYgPSBpdjtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE0zVThQYXJzZXI7XG4iLCJpbXBvcnQgeyBOYWx1bml0IH0gZnJvbSAneGdwbGF5ZXItY29kZWMnO1xuaW1wb3J0IHsgQXVkaW9UcmFjaywgVmlkZW9UcmFjayB9IGZyb20gJ3hncGxheWVyLWJ1ZmZlcic7XG5pbXBvcnQge1xuICBBdWRpb1RyYWNrTWV0YSxcbiAgVmlkZW9UcmFja01ldGEsXG4gIEF1ZGlvVHJhY2tTYW1wbGUsXG4gIFZpZGVvVHJhY2tTYW1wbGUsXG4gIEVWRU5UUyxcbiAgU3RyZWFtXG59IGZyb20gJ3hncGxheWVyLXV0aWxzJztcblxuY29uc3QgREVNVVhfRVZFTlRTID0gRVZFTlRTLkRFTVVYX0VWRU5UUztcbmNvbnN0IFN0cmVhbVR5cGUgPSB7XG4gIDB4MDE6IFsndmlkZW8nLCAnTVBFRy0xJ10sXG4gIDB4MDI6IFsndmlkZW8nLCAnTVBFRy0yJ10sXG4gIDB4MWI6IFsndmlkZW8nLCAnQVZDLkgyNjQnXSxcbiAgMHhlYTogWyd2aWRlbycsICdWQy0xJ10sXG4gIDB4MDM6IFsnYXVkaW8nLCAnTVBFRy0xJ10sXG4gIDB4MDQ6IFsnYXVkaW8nLCAnTVBFRy0yJ10sXG4gIDB4MGY6IFsnYXVkaW8nLCAnTVBFRy0yLkFBQyddLFxuICAweDExOiBbJ2F1ZGlvJywgJ01QRUctNC5BQUMnXSxcbiAgMHg4MDogWydhdWRpbycsICdMUENNJ10sXG4gIDB4ODE6IFsnYXVkaW8nLCAnQUMzJ10sXG4gIDB4MDY6IFsnYXVkaW8nLCAnQUMzJ10sXG4gIDB4ODI6IFsnYXVkaW8nLCAnRFRTJ10sXG4gIDB4ODM6IFsnYXVkaW8nLCAnRG9sYnkgVHJ1ZUhEJ10sXG4gIDB4ODQ6IFsnYXVkaW8nLCAnQUMzLVBsdXMnXSxcbiAgMHg4NTogWydhdWRpbycsICdEVFMtSEQnXSxcbiAgMHg4NjogWydhdWRpbycsICdEVFMtTUEnXSxcbiAgMHhhMTogWydhdWRpbycsICdBQzMtUGx1cy1TRUMnXSxcbiAgMHhhMjogWydhdWRpbycsICdEVFMtSEQtU0VDJ11cbn07XG5cbmNsYXNzIFRzRGVtdXhlciB7XG4gIGNvbnN0cnVjdG9yIChjb25maWdzKSB7XG4gICAgdGhpcy5jb25maWdzID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlncyk7XG4gICAgdGhpcy5kZW11eGluZyA9IGZhbHNlO1xuICAgIHRoaXMucGF0ID0gW107XG4gICAgdGhpcy5wbXQgPSBbXTtcbiAgICB0aGlzLl9oYXNWaWRlb01ldGEgPSBmYWxzZTtcbiAgICB0aGlzLl9oYXNBdWRpb01ldGEgPSBmYWxzZTtcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIHRoaXMub24oREVNVVhfRVZFTlRTLkRFTVVYX1NUQVJULCB0aGlzLmRlbXV4LmJpbmQodGhpcykpXG4gIH1cblxuICBkZW11eCAoZnJhZykge1xuICAgIGlmICh0aGlzLmRlbXV4aW5nKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgYnVmZmVyID0gdGhpcy5pbnB1dEJ1ZmZlcjtcbiAgICBsZXQgZnJhZ3MgPSB7IHBhdDogW10sIHBtdDogW10gfTtcbiAgICBsZXQgcGVzZXMgPSB7fTtcblxuICAgIC8vIFJlYWQgVFMgc2VnbWVudFxuICAgIHdoaWxlIChidWZmZXIubGVuZ3RoID49IDE4OCkge1xuICAgICAgaWYgKGJ1ZmZlci5sZW5ndGggPj0gMSAmJiBidWZmZXIuYXJyYXlbMF1bYnVmZmVyLm9mZnNldF0gIT09IDcxKSB7XG4gICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfRVJST1IsIHRoaXMuVEFHLCBuZXcgRXJyb3IoYFVudHJ1c3Qgc3luYyBjb2RlOiAke2J1ZmZlci5hcnJheVswXVtidWZmZXIub2Zmc2V0XX0sIHRyeSB0byByZWNvdmVyO2ApLCBmYWxzZSk7XG4gICAgICB9XG4gICAgICB3aGlsZSAoYnVmZmVyLmxlbmd0aCA+PSAxICYmIGJ1ZmZlci5hcnJheVswXVtidWZmZXIub2Zmc2V0XSAhPT0gNzEpIHtcbiAgICAgICAgYnVmZmVyLnNoaWZ0KDEpO1xuICAgICAgfVxuICAgICAgbGV0IGJ1ZiA9IGJ1ZmZlci5zaGlmdCgxODgpO1xuICAgICAgLy8gY29uc29sZS5sb2coYnVmKTtcbiAgICAgIGxldCB0c1N0cmVhbSA9IG5ldyBTdHJlYW0oYnVmLmJ1ZmZlcik7XG4gICAgICBsZXQgdHMgPSB7fTtcbiAgICAgIFRzRGVtdXhlci5yZWFkKHRzU3RyZWFtLCB0cywgZnJhZ3MpO1xuICAgICAgaWYgKHRzLnBlcykge1xuICAgICAgICBpZiAoIXBlc2VzW3RzLmhlYWRlci5waWRdKSB7XG4gICAgICAgICAgcGVzZXNbdHMuaGVhZGVyLnBpZF0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBwZXNlc1t0cy5oZWFkZXIucGlkXS5wdXNoKHRzLnBlcyk7XG4gICAgICAgIHRzLnBlcy5FUy5idWZmZXIgPSBbdHMucGVzLkVTLmJ1ZmZlcl07XG4gICAgICB9IGVsc2UgaWYgKHBlc2VzW3RzLmhlYWRlci5waWRdKSB7XG4gICAgICAgIHBlc2VzW3RzLmhlYWRlci5waWRdW3Blc2VzW3RzLmhlYWRlci5waWRdLmxlbmd0aCAtIDFdLkVTLmJ1ZmZlci5wdXNoKHRzLnBheWxvYWQuc3RyZWFtKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgQXVkaW9PcHRpb25zID0gZnJhZztcbiAgICBsZXQgVmlkZW9PcHRpb25zID0gZnJhZztcblxuICAgIC8vIEdldCBGcmFtZXMgZGF0YVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgT2JqZWN0LmtleXMocGVzZXMpLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgZXBlc2VzID0gcGVzZXNbT2JqZWN0LmtleXMocGVzZXMpW2ldXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZXBlc2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGVwZXNlc1tqXS5pZCA9IE9iamVjdC5rZXlzKHBlc2VzKVtpXTtcbiAgICAgICAgZXBlc2VzW2pdLkVTLmJ1ZmZlciA9IFRzRGVtdXhlci5NZXJnZShlcGVzZXNbal0uRVMuYnVmZmVyKTtcbiAgICAgICAgaWYgKGVwZXNlc1tqXS50eXBlID09PSAnYXVkaW8nKSB7XG4gICAgICAgICAgdGhpcy5wdXNoQXVkaW9TYW1wbGUoZXBlc2VzW2pdLCBBdWRpb09wdGlvbnMpO1xuICAgICAgICAgIEF1ZGlvT3B0aW9ucyA9IHt9O1xuICAgICAgICB9IGVsc2UgaWYgKGVwZXNlc1tqXS50eXBlID09PSAndmlkZW8nKSB7XG4gICAgICAgICAgdGhpcy5wdXNoVmlkZW9TYW1wbGUoZXBlc2VzW2pdLCBWaWRlb09wdGlvbnMpO1xuICAgICAgICAgIFZpZGVvT3B0aW9ucyA9IHt9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2hhc0F1ZGlvTWV0YSkge1xuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9DT01QTEVURSwgJ2F1ZGlvJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9oYXNWaWRlb01ldGEpIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfQ09NUExFVEUsICd2aWRlbycpO1xuICAgIH1cbiAgfVxuXG4gIHB1c2hBdWRpb1NhbXBsZSAocGVzLCBvcHRpb25zKSB7XG4gICAgbGV0IHRyYWNrO1xuICAgIGlmICghdGhpcy5fdHJhY2tzLmF1ZGlvVHJhY2spIHtcbiAgICAgIHRoaXMuX3RyYWNrcy5hdWRpb1RyYWNrID0gbmV3IEF1ZGlvVHJhY2soKTtcbiAgICAgIHRyYWNrID0gdGhpcy5fdHJhY2tzLmF1ZGlvVHJhY2s7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYWNrID0gdGhpcy5fdHJhY2tzLmF1ZGlvVHJhY2s7XG4gICAgfVxuICAgIGxldCBtZXRhID0gbmV3IEF1ZGlvVHJhY2tNZXRhKHtcbiAgICAgIGF1ZGlvU2FtcGxlUmF0ZTogcGVzLkVTLmZyZXF1ZW5jZSxcbiAgICAgIHNhbXBsZVJhdGU6IHBlcy5FUy5mcmVxdWVuY2UsXG4gICAgICBjaGFubmVsQ291bnQ6IHBlcy5FUy5jaGFubmVsLFxuICAgICAgY29kZWM6ICdtcDRhLjQwLicgKyBwZXMuRVMuYXVkaW9PYmplY3RUeXBlLFxuICAgICAgY29uZmlnOiBwZXMuRVMuYXVkaW9Db25maWcsXG4gICAgICBpZDogMixcbiAgICAgIHNhbXBsZVJhdGVJbmRleDogcGVzLkVTLmZyZXF1ZW5jeUluZGV4XG4gICAgfSk7XG4gICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA9IE1hdGguZmxvb3IoMTAyNCAvIG1ldGEuYXVkaW9TYW1wbGVSYXRlICogbWV0YS50aW1lc2NhbGUpO1xuXG4gICAgbGV0IG1ldGFFcXVhbCA9IFRzRGVtdXhlci5jb21wYWlyZU1ldGEodHJhY2subWV0YSwgbWV0YSwgdHJ1ZSk7XG5cbiAgICBpZiAoIXRoaXMuX2hhc0F1ZGlvTWV0YSB8fCAhbWV0YUVxdWFsKSB7XG4gICAgICB0cmFjay5tZXRhID0gbWV0YTtcbiAgICAgIHRoaXMuX2hhc0F1ZGlvTWV0YSA9IHRydWVcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAnYXVkaW8nKTtcbiAgICB9XG5cbiAgICBsZXQgZGF0YSA9IG5ldyBVaW50OEFycmF5KHBlcy5FUy5idWZmZXIuYnVmZmVyLnNsaWNlKHBlcy5FUy5idWZmZXIucG9zaXRpb24sIHBlcy5FUy5idWZmZXIubGVuZ3RoKSk7XG4gICAgbGV0IGR0cyA9IHBhcnNlSW50KHBlcy5wdHMgLyA5MCk7XG4gICAgbGV0IHB0cyA9IHBhcnNlSW50KHBlcy5wdHMgLyA5MCk7XG4gICAgbGV0IHNhbXBsZSA9IG5ldyBBdWRpb1RyYWNrU2FtcGxlKHtkdHMsIHB0cywgZGF0YSwgb3B0aW9uc30pO1xuICAgIHRyYWNrLnNhbXBsZXMucHVzaChzYW1wbGUpO1xuICB9XG5cbiAgcHVzaFZpZGVvU2FtcGxlIChwZXMsIG9wdGlvbnMpIHtcbiAgICBsZXQgbmFscyA9IE5hbHVuaXQuZ2V0TmFsdW5pdHMocGVzLkVTLmJ1ZmZlcik7XG4gICAgbGV0IHRyYWNrO1xuICAgIGxldCBtZXRhID0gbmV3IFZpZGVvVHJhY2tNZXRhKCk7XG4gICAgaWYgKCF0aGlzLl90cmFja3MudmlkZW9UcmFjaykge1xuICAgICAgdGhpcy5fdHJhY2tzLnZpZGVvVHJhY2sgPSBuZXcgVmlkZW9UcmFjaygpO1xuICAgICAgdHJhY2sgPSB0aGlzLl90cmFja3MudmlkZW9UcmFjaztcbiAgICB9IGVsc2Uge1xuICAgICAgdHJhY2sgPSB0aGlzLl90cmFja3MudmlkZW9UcmFjaztcbiAgICB9XG4gICAgbGV0IHNhbXBsZUxlbmd0aCA9IDA7XG4gICAgbGV0IHNwcyA9IGZhbHNlO1xuICAgIGxldCBwcHMgPSBmYWxzZTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBuYWwgPSBuYWxzW2ldO1xuICAgICAgaWYgKG5hbC5zcHMpIHtcbiAgICAgICAgc3BzID0gbmFsO1xuICAgICAgICB0cmFjay5zcHMgPSBuYWwuYm9keTtcbiAgICAgICAgbWV0YS5jaHJvbWFGb3JtYXQgPSBzcHMuc3BzLmNocm9tYV9mb3JtYXRcbiAgICAgICAgbWV0YS5jb2RlYyA9ICdhdmMxLic7XG4gICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgNDsgaisrKSB7XG4gICAgICAgICAgdmFyIGggPSBzcHMuYm9keVtqXS50b1N0cmluZygxNik7XG4gICAgICAgICAgaWYgKGgubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgaCA9ICcwJyArIGg7XG4gICAgICAgICAgfVxuICAgICAgICAgIG1ldGEuY29kZWMgKz0gaDtcbiAgICAgICAgfVxuICAgICAgICBtZXRhLmNvZGVjSGVpZ2h0ID0gc3BzLnNwcy5jb2RlY19zaXplLmhlaWdodDtcbiAgICAgICAgbWV0YS5jb2RlY1dpZHRoID0gc3BzLnNwcy5jb2RlY19zaXplLndpZHRoO1xuICAgICAgICBtZXRhLmZyYW1lUmF0ZSA9IHNwcy5zcHMuZnJhbWVfcmF0ZTtcbiAgICAgICAgbWV0YS5pZCA9IDE7XG4gICAgICAgIG1ldGEubGV2ZWwgPSBzcHMuc3BzLmxldmVsX3N0cmluZztcbiAgICAgICAgbWV0YS5wcmVzZW50SGVpZ2h0ID0gc3BzLnNwcy5wcmVzZW50X3NpemUuaGVpZ2h0O1xuICAgICAgICBtZXRhLnByZXNlbnRXaWR0aCA9IHNwcy5zcHMucHJlc2VudF9zaXplLndpZHRoO1xuICAgICAgICBtZXRhLnByb2ZpbGUgPSBzcHMuc3BzLnByb2ZpbGVfc3RyaW5nO1xuICAgICAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uID0gTWF0aC5mbG9vcihtZXRhLnRpbWVzY2FsZSAqIChzcHMuc3BzLmZyYW1lX3JhdGUuZnBzX2RlbiAvIHNwcy5zcHMuZnJhbWVfcmF0ZS5mcHNfbnVtKSk7XG4gICAgICAgIG1ldGEuc2FyUmF0aW8gPSBzcHMuc3BzLnNhcl9yYXRpbyA/IHNwcy5zcHMuc2FyX3JhdGlvIDogc3BzLnNwcy5wYXJfcmF0aW87XG4gICAgICB9IGVsc2UgaWYgKG5hbC5wcHMpIHtcbiAgICAgICAgdHJhY2sucHBzID0gbmFsLmJvZHk7XG4gICAgICAgIHBwcyA9IG5hbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNhbXBsZUxlbmd0aCArPSAoNCArIG5hbC5ib2R5LmJ5dGVMZW5ndGgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzcHMgJiYgcHBzKSB7XG4gICAgICBtZXRhLmF2Y2MgPSBOYWx1bml0LmdldEF2Y2Moc3BzLmJvZHksIHBwcy5ib2R5KTtcbiAgICAgIGxldCBtZXRhRXF1YWwgPSBUc0RlbXV4ZXIuY29tcGFpcmVNZXRhKHRyYWNrLm1ldGEsIG1ldGEsIHRydWUpO1xuICAgICAgaWYgKCF0aGlzLl9oYXNWaWRlb01ldGEgfHwgIW1ldGFFcXVhbCkge1xuICAgICAgICBpZiAob3B0aW9ucykge1xuICAgICAgICAgIG9wdGlvbnMubWV0YSA9IE9iamVjdC5hc3NpZ24oe30sIG1ldGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBtZXRhOiBPYmplY3QuYXNzaWduKHt9LCBtZXRhKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0cmFjay5tZXRhID0gbWV0YTtcbiAgICAgICAgdGhpcy5faGFzVmlkZW9NZXRhID0gdHJ1ZVxuICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgJ3ZpZGVvJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGRhdGEgPSBuZXcgVWludDhBcnJheShzYW1wbGVMZW5ndGgpO1xuICAgIGxldCBvZmZzZXQgPSAwO1xuICAgIGxldCBpc0tleWZyYW1lID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgbmFsID0gbmFsc1tpXTtcbiAgICAgIGxldCBsZW5ndGggPSBuYWwuYm9keS5ieXRlTGVuZ3RoO1xuICAgICAgaWYgKG5hbC5pZHIpIHtcbiAgICAgICAgaXNLZXlmcmFtZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoIW5hbC5wcHMgJiYgIW5hbC5zcHMpIHtcbiAgICAgICAgZGF0YS5zZXQobmV3IFVpbnQ4QXJyYXkoW2xlbmd0aCA+Pj4gMjQgJiAweGZmLFxuICAgICAgICAgIGxlbmd0aCA+Pj4gMTYgJiAweGZmLFxuICAgICAgICAgIGxlbmd0aCA+Pj4gOCAmIDB4ZmYsXG4gICAgICAgICAgbGVuZ3RoICYgMHhmZlxuICAgICAgICBdKSwgb2Zmc2V0KTtcbiAgICAgICAgb2Zmc2V0ICs9IDQ7XG4gICAgICAgIGRhdGEuc2V0KG5hbC5ib2R5LCBvZmZzZXQpO1xuICAgICAgICBvZmZzZXQgKz0gbGVuZ3RoO1xuICAgICAgfVxuICAgIH1cbiAgICBsZXQgc2FtcGxlID0gbmV3IFZpZGVvVHJhY2tTYW1wbGUoe1xuICAgICAgZHRzOiBwYXJzZUludChwZXMuZHRzIC8gOTApLFxuICAgICAgcHRzOiBwYXJzZUludChwZXMucHRzIC8gOTApLFxuICAgICAgY3RzOiAocGVzLnB0cyAtIHBlcy5kdHMpIC8gOTAsXG4gICAgICBvcmlnaW5EdHM6IHBlcy5kdHMsXG4gICAgICBpc0tleWZyYW1lLFxuICAgICAgZGF0YSxcbiAgICAgIG9wdGlvbnNcbiAgICB9KVxuICAgIHRyYWNrLnNhbXBsZXMucHVzaChzYW1wbGUpO1xuICB9XG5cbiAgZGVzdG9yeSAoKSB7XG4gICAgdGhpcy5vZmYoREVNVVhfRVZFTlRTLkRFTVVYX1NUQVJULCB0aGlzLmRlbXV4KTtcbiAgICB0aGlzLmNvbmZpZ3MgPSB7fTtcbiAgICB0aGlzLmRlbXV4aW5nID0gZmFsc2U7XG4gICAgdGhpcy5wYXQgPSBbXTtcbiAgICB0aGlzLnBtdCA9IFtdO1xuICAgIHRoaXMuX2hhc1ZpZGVvTWV0YSA9IGZhbHNlO1xuICAgIHRoaXMuX2hhc0F1ZGlvTWV0YSA9IGZhbHNlO1xuICB9XG5cbiAgc3RhdGljIGNvbXBhaXJlQXJyYXkgKGEsIGIsIHR5cGUpIHtcbiAgICBsZXQgYWwgPSAwO1xuICAgIGxldCBibCA9IDA7XG4gICAgaWYgKHR5cGUgPT09ICdVaW50OEFycmF5Jykge1xuICAgICAgYWwgPSBhLmJ5dGVMZW5ndGg7XG4gICAgICBibCA9IGIuYnl0ZUxlbmd0aDtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdBcnJheScpIHtcbiAgICAgIGFsID0gYS5sZW5ndGg7XG4gICAgICBibCA9IGIubGVuZ3RoO1xuICAgIH1cbiAgICBpZiAoYWwgIT09IGJsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbDsgaSsrKSB7XG4gICAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3RhdGljIGNvbXBhaXJlTWV0YSAoYSwgYiwgaWdub3JlRHVyYXRpb24pIHtcbiAgICBpZiAoIWEgfHwgIWIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMCwgayA9IE9iamVjdC5rZXlzKGEpLmxlbmd0aDsgaSA8IGs7IGkrKykge1xuICAgICAgbGV0IGl0ZW1hID0gYVtPYmplY3Qua2V5cyhhKVtpXV07XG4gICAgICBsZXQgaXRlbWIgPSBiW09iamVjdC5rZXlzKGEpW2ldXTtcbiAgICAgIGlmICh0eXBlb2YgaXRlbWEgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmICgoaWdub3JlRHVyYXRpb24gJiYgT2JqZWN0LmtleXMoYSlbaV0gIT09ICdkdXJhdGlvbicgJiYgT2JqZWN0LmtleXMoYSlbaV0gIT09ICdyZWZTYW1wbGVEdXJhdGlvbicgJiYgT2JqZWN0LmtleXMoYSlbaV0gIT09ICdyZWZTYW1wbGVEdXJhdGlvbkZpeGVkJykgJiYgaXRlbWEgIT09IGl0ZW1iKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGl0ZW1hLmJ5dGVMZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoaXRlbWIuYnl0ZUxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghVHNEZW11eGVyLmNvbXBhaXJlQXJyYXkoaXRlbWEsIGl0ZW1iLCAnVWludDhBcnJheScpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGl0ZW1hLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChpdGVtYi5sZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIVRzRGVtdXhlci5jb21wYWlyZUFycmF5KGl0ZW1hLCBpdGVtYiwgJ0FycmF5JykpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghVHNEZW11eGVyLmNvbXBhaXJlTWV0YShpdGVtYSwgaXRlbWIpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3RhdGljIE1lcmdlIChidWZmZXJzKSB7XG4gICAgbGV0IGRhdGE7XG4gICAgbGV0IGxlbmd0aCA9IDA7XG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBidWZmZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZW5ndGggKz0gKGJ1ZmZlcnNbaV0ubGVuZ3RoIC0gYnVmZmVyc1tpXS5wb3NpdGlvbik7XG4gICAgfVxuXG4gICAgZGF0YSA9IG5ldyBVaW50OEFycmF5KGxlbmd0aCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBidWZmZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYnVmZmVyID0gYnVmZmVyc1tpXTtcbiAgICAgIGRhdGEuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZmZlci5idWZmZXIsIGJ1ZmZlci5wb3NpdGlvbiksIG9mZnNldCk7XG4gICAgICBvZmZzZXQgKz0gYnVmZmVyLmxlbmd0aCAtIGJ1ZmZlci5wb3NpdGlvbjtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBTdHJlYW0oZGF0YS5idWZmZXIpO1xuICB9XG5cbiAgc3RhdGljIHJlYWQgKHN0cmVhbSwgdHMsIGZyYWdzKSB7XG4gICAgVHNEZW11eGVyLnJlYWRIZWFkZXIoc3RyZWFtLCB0cyk7XG4gICAgVHNEZW11eGVyLnJlYWRQYXlsb2FkKHN0cmVhbSwgdHMsIGZyYWdzKTtcbiAgICBpZiAodHMuaGVhZGVyLnBhY2tldCA9PT0gJ01FRElBJyAmJiB0cy5oZWFkZXIucGF5bG9hZCA9PT0gMSAmJiAhdHMudW5rbm93blBJRHMpIHtcbiAgICAgIHRzLnBlcyA9IFRzRGVtdXhlci5QRVModHMpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyByZWFkUGF5bG9hZCAoc3RyZWFtLCB0cywgZnJhZ3MpIHtcbiAgICBsZXQgaGVhZGVyID0gdHMuaGVhZGVyXG4gICAgbGV0IHBpZCA9IGhlYWRlci5waWQ7XG4gICAgc3dpdGNoIChwaWQpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgVHNEZW11eGVyLlBBVChzdHJlYW0sIHRzLCBmcmFncyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxOlxuICAgICAgICBUc0RlbXV4ZXIuQ0FUKHN0cmVhbSwgdHMsIGZyYWdzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIFRzRGVtdXhlci5UU0RUKHN0cmVhbSwgdHMsIGZyYWdzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDB4MWZmZjpcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBUT0RPOiBzb21l55qE5YaZ5rOV5LiN5aSq5aW977yM5b6X5pS5XG4gICAgICAgIGlmIChmcmFncy5wYXQuc29tZSgoaXRlbSkgPT4geyByZXR1cm4gaXRlbS5waWQgPT09IHBpZDsgfSkpIHtcbiAgICAgICAgICBUc0RlbXV4ZXIuUE1UKHN0cmVhbSwgdHMsIGZyYWdzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgc3RzID0gZnJhZ3MucG10ID8gZnJhZ3MucG10LmZpbHRlcigoaXRlbSkgPT4gaXRlbS5waWQgPT09IHBpZCkgOiBbXTtcbiAgICAgICAgICBpZiAoc3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIFRzRGVtdXhlci5NZWRpYShzdHJlYW0sIHRzLCBTdHJlYW1UeXBlW3N0c1swXS5zdHJlYW1UeXBlXVswXSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHMudW5rbm93blBJRHMgPSB0cnVlO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgcmVhZEhlYWRlciAoc3RyZWFtLCB0cykge1xuICAgIGxldCBoZWFkZXIgPSB7fTtcbiAgICBoZWFkZXIuc3luYyA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICBsZXQgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgaGVhZGVyLmVycm9yID0gbmV4dCA+Pj4gMTU7XG4gICAgaGVhZGVyLnBheWxvYWQgPSBuZXh0ID4+PiAxNCAmIDE7XG4gICAgaGVhZGVyLnByaW9yaXR5ID0gbmV4dCA+Pj4gMTMgJiAxO1xuICAgIGhlYWRlci5waWQgPSBuZXh0ICYgMHgxZmZmO1xuXG4gICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDgoKTtcblxuICAgIGhlYWRlci5zY3JhbWJsaW5nID0gbmV4dCA+PiA2ICYgMHgzOyAvLyDmmK/lkKbliqDlr4bvvIwwMOihqOekuuS4jeWKoOWvhlxuXG4gICAgLyoqXG4gICAgICogMDAgSVNPL0lFQ+acquadpeS9v+eUqOS/neeVmVxuICAgICAqIDAxIOayoeacieiwg+aVtOWtl+aute+8jOS7heWQq+aciTE4NELmnInmlYjlh4DojbdcbiAgICAgKiAwMiDmsqHmnInmnInmlYjlh4DojbfvvIzku4XlkKvmnIkxODNC6LCD5pW05a2X5q61XG4gICAgICogMDMgMH4xODJC6LCD5pW05a2X5q615ZCO5Li65pyJ5pWI5YeA6I23XG4gICAgICovXG4gICAgaGVhZGVyLmFkYXB0YXRpb24gPSBuZXh0ID4+IDQgJiAweDM7XG4gICAgaGVhZGVyLmNvbnRpbnVpdHkgPSBuZXh0ICYgMTU7XG4gICAgaGVhZGVyLnBhY2tldCA9IGhlYWRlci5waWQgPT09IDAgPyAnUEFUJyA6ICdNRURJQSc7XG4gICAgdHMuaGVhZGVyID0gaGVhZGVyO1xuICB9XG5cbiAgc3RhdGljIFBBVCAoc3RyZWFtLCB0cywgZnJhZ3MpIHtcbiAgICBsZXQgcmV0ID0ge307XG4gICAgbGV0IG5leHQgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgc3RyZWFtLnNraXAobmV4dCk7XG4gICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICByZXQudGFiZWxJRCA9IG5leHQ7XG4gICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgcmV0LmVycm9yID0gbmV4dCA+Pj4gNztcbiAgICByZXQuemVybyA9IG5leHQgPj4+IDYgJiAxO1xuICAgIHJldC5zZWN0aW9uTGVuZ3RoID0gbmV4dCAmIDB4ZmZmO1xuICAgIHJldC5zdHJlYW1JRCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgcmV0LmN1cnJlbnQgPSBzdHJlYW0ucmVhZFVpbnQ4KCkgJiAxO1xuICAgIHJldC5zZWN0aW9uTnVtYmVyID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHJldC5sYXN0U2VjdGlvbk51bWJlciA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICBsZXQgTiA9IChyZXQuc2VjdGlvbkxlbmd0aCAtIDkpIC8gNDtcbiAgICBsZXQgbGlzdCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTjsgaSsrKSB7XG4gICAgICBsZXQgcHJvZ3JhbU51bWJlciA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgICBsZXQgcGlkID0gc3RyZWFtLnJlYWRVaW50MTYoKSAmIDB4MWZmZjtcbiAgICAgIGxpc3QucHVzaCh7XG4gICAgICAgIHByb2dyYW06IHByb2dyYW1OdW1iZXIsXG4gICAgICAgIHBpZCxcbiAgICAgICAgdHlwZTogcHJvZ3JhbU51bWJlciA9PT0gMCA/ICduZXR3b3JrJyA6ICdtYXBQSUQnXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgZnJhZ3MucGF0ID0gZnJhZ3MucGF0LmNvbmNhdChsaXN0KTtcbiAgICB9XG4gICAgcmV0Lmxpc3QgPSBsaXN0O1xuICAgIHJldC5wcm9ncmFtID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICByZXQucGlkID0gc3RyZWFtLnJlYWRVaW50MTYoKSAmIDB4MWZmZjtcbiAgICB0cy5wYXlsb2FkID0gcmV0O1xuICAgIC8vIFRPRE8gQ1JDXG4gIH1cblxuICBzdGF0aWMgUE1UIChzdHJlYW0sIHRzLCBmcmFncykge1xuICAgIGxldCByZXQgPSB7fTtcbiAgICBsZXQgaGVhZGVyID0gdHMuaGVhZGVyO1xuICAgIGhlYWRlci5wYWNrZXQgPSAnUE1UJztcbiAgICBsZXQgbmV4dCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICBzdHJlYW0uc2tpcChuZXh0KTtcbiAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHJldC50YWJsZUlEID0gbmV4dDtcbiAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICByZXQuc2VjdGlvbkxlbmd0aCA9IG5leHQgJiAweGZmZjtcbiAgICByZXQucHJvZ3JhbSA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgcmV0LmN1cnJlbnQgPSBzdHJlYW0ucmVhZFVpbnQ4KCkgJiAxO1xuICAgIHJldC5vcmRlciA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICByZXQubGFzdE9yZGVyID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHJldC5QQ1JfUElEID0gc3RyZWFtLnJlYWRVaW50MTYoKSAmIDB4MWZmZjtcbiAgICByZXQucHJvZ3JhbUxlbmd0aCA9IHN0cmVhbS5yZWFkVWludDE2KCkgJiAweGZmZjtcbiAgICBsZXQgTiA9IChyZXQuc2VjdGlvbkxlbmd0aCAtIDEzKSAvIDU7XG4gICAgbGV0IGxpc3QgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE47IGkrKykge1xuICAgICAgbGlzdC5wdXNoKHtcbiAgICAgICAgc3RyZWFtVHlwZTogc3RyZWFtLnJlYWRVaW50OCgpLFxuICAgICAgICBwaWQ6IHN0cmVhbS5yZWFkVWludDE2KCkgJiAweDFmZmYsIC8vIDB4MDdlNSDop4bpopHvvIwweDA3ZTZcbiAgICAgICAgZXM6IHN0cmVhbS5yZWFkVWludDE2KCkgJiAweGZmZlxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldC5saXN0ID0gbGlzdDtcbiAgICBpZiAoIXRoaXMucG10KSB7XG4gICAgICB0aGlzLnBtdCA9IFtdO1xuICAgIH1cbiAgICBmcmFncy5wbXQgPSB0aGlzLnBtdC5jb25jYXQobGlzdC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBpZDogaXRlbS5waWQsXG4gICAgICAgIGVzOiBpdGVtLmVzLFxuICAgICAgICBzdHJlYW1UeXBlOiBpdGVtLnN0cmVhbVR5cGUsXG4gICAgICAgIHByb2dyYW06IHJldC5wcm9ncmFtXG4gICAgICB9O1xuICAgIH0pKTtcbiAgICB0cy5wYXlsb2FkID0gcmV0O1xuICB9XG5cbiAgc3RhdGljIE1lZGlhIChzdHJlYW0sIHRzLCB0eXBlKSB7XG4gICAgbGV0IGhlYWRlciA9IHRzLmhlYWRlcjtcbiAgICBsZXQgcGF5bG9hZCA9IHt9O1xuICAgIGhlYWRlci50eXBlID0gdHlwZTtcbiAgICBpZiAoaGVhZGVyLmFkYXB0YXRpb24gPT09IDB4MDMpIHtcbiAgICAgIHBheWxvYWQuYWRhcHRhdGlvbkxlbmd0aCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICAgIGlmIChwYXlsb2FkLmFkYXB0YXRpb25MZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCBuZXh0ID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgICAgICBwYXlsb2FkLmRpc2NvbnRpbnVlID0gbmV4dCA+Pj4gNztcbiAgICAgICAgcGF5bG9hZC5hY2Nlc3MgPSBuZXh0ID4+PiA2ICYgMHgwMTtcbiAgICAgICAgcGF5bG9hZC5wcmlvcml0eSA9IG5leHQgPj4+IDUgJiAweDAxO1xuICAgICAgICBwYXlsb2FkLlBDUiA9IG5leHQgPj4+IDQgJiAweDAxO1xuICAgICAgICBwYXlsb2FkLk9QQ1IgPSBuZXh0ID4+PiAzICYgMHgwMTtcbiAgICAgICAgcGF5bG9hZC5zcGxpY2VQb2ludCA9IG5leHQgPj4+IDIgJiAweDAxO1xuICAgICAgICBwYXlsb2FkLnRyYW5zcG9ydFByaXZhdGUgPSBuZXh0ID4+PiAxICYgMHgwMTtcbiAgICAgICAgcGF5bG9hZC5hZGFwdGF0aW9uRmllbGQgPSBuZXh0ICYgMHgwMTtcbiAgICAgICAgbGV0IF9zdGFydCA9IHN0cmVhbS5wb3NpdGlvbjtcbiAgICAgICAgaWYgKHBheWxvYWQuUENSID09PSAxKSB7XG4gICAgICAgICAgcGF5bG9hZC5wcm9ncmFtQ2xvY2tCYXNlID0gc3RyZWFtLnJlYWRVaW50MzIoKSA8PCAxO1xuICAgICAgICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgICAgICAgIHBheWxvYWQucHJvZ3JhbUNsb2NrQmFzZSB8PSBuZXh0ID4+PiAxNTtcbiAgICAgICAgICBwYXlsb2FkLnByb2dyYW1DbG9ja0V4dGVuc2lvbiA9IG5leHQgJiAweDFmZjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF5bG9hZC5PUENSID09PSAxKSB7XG4gICAgICAgICAgcGF5bG9hZC5vcmlnaW5Qcm9ncmFtQ2xvY2tCYXNlID0gc3RyZWFtLnJlYWRVaW50MzIoKSA8PCAxO1xuICAgICAgICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgICAgICAgIHBheWxvYWQub3JpZ2luUHJvZ3JhbUNsb2NrQmFzZSArPSBuZXh0ID4+PiAxNTtcbiAgICAgICAgICBwYXlsb2FkLm9yaWdpblByb2dyYW1DbG9ja0V4dGVuc2lvbiA9IG5leHQgJiAweDFmZjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF5bG9hZC5zcGxpY2VQb2ludCA9PT0gMSkge1xuICAgICAgICAgIHBheWxvYWQuc3BsaWNlQ291bnRkb3duID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXlsb2FkLnRyYW5zcG9ydFByaXZhdGUgPT09IDEpIHtcbiAgICAgICAgICBsZXQgbGVuZ3RoID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgICAgICAgIGxldCB0cmFuc3BvcnRQcml2YXRlRGF0YSA9IFtdO1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRyYW5zcG9ydFByaXZhdGVEYXRhLnB1c2goc3RyZWFtLnJlYWRVaW50OCgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBheWxvYWQuYWRhcHRhdGlvbkZpZWxkID09PSAxKSB7XG4gICAgICAgICAgbGV0IGxlbmd0aCA9IHN0cmVhbS5yZWFkVWludDgoKVxuICAgICAgICAgIGxldCBuZXh0ID0gc3RyZWFtLnJlYWRVaW50OCgpXG4gICAgICAgICAgbGV0IHN0YXJ0ID0gc3RyZWFtLnBvc2l0aW9uO1xuICAgICAgICAgIGxldCBsdHcgPSBuZXh0ID4+PiA3O1xuICAgICAgICAgIGxldCBwaWVjZXdpc2UgPSBuZXh0ID4+PiA2ICYgMHgxO1xuICAgICAgICAgIGxldCBzZWFtbGVzcyA9IG5leHQgPj4+IDUgJiAweDE7XG4gICAgICAgICAgaWYgKGx0dyA9PT0gMSkge1xuICAgICAgICAgICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgICAgICAgICBwYXlsb2FkLmx0d1ZhbGlkID0gbmV4dCA+Pj4gMTU7XG4gICAgICAgICAgICBwYXlsb2FkLmx0d09mZnNldCA9IG5leHQgJiAweGVmZmY7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwaWVjZXdpc2UgPT09IDEpIHtcbiAgICAgICAgICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQyNCgpO1xuICAgICAgICAgICAgcGF5bG9hZC5waWVjZXdpc2VSYXRlID0gbmV4dCAmIDB4M2ZmZmZmO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2VhbWxlc3MgPT09IDEpIHtcbiAgICAgICAgICAgIG5leHQgPSBzdHJlYW0ucmVhZEludDgoKTtcbiAgICAgICAgICAgIHBheWxvYWQuc3BsaWNlVHlwZSA9IG5leHQgPj4+IDQ7XG4gICAgICAgICAgICBwYXlsb2FkLmR0c05leHRBVTEgPSBuZXh0ID4+PiAxICYgMHg3O1xuICAgICAgICAgICAgcGF5bG9hZC5tYXJrZXIxID0gbmV4dCAmIDB4MTtcbiAgICAgICAgICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgICAgICAgICAgcGF5bG9hZC5kdHNOZXh0QVUyID0gbmV4dCA+Pj4gMTtcbiAgICAgICAgICAgIHBheWxvYWQubWFya2VyMiA9IG5leHQgJiAweDE7XG4gICAgICAgICAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICAgIHBheWxvYWQuZHRzTmV4dEFVMyA9IG5leHQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN0cmVhbS5za2lwKGxlbmd0aCAtIDEgLSAoc3RyZWFtLnBvc2l0aW9uIC0gc3RhcnQpKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbGFzdFN0dWZmaW5nID0gcGF5bG9hZC5hZGFwdGF0aW9uTGVuZ3RoIC0gMSAtIChzdHJlYW0ucG9zaXRpb24gLSBfc3RhcnQpO1xuICAgICAgICBzdHJlYW0uc2tpcChsYXN0U3R1ZmZpbmcpO1xuICAgICAgfVxuICAgIH1cbiAgICBwYXlsb2FkLnN0cmVhbSA9IG5ldyBTdHJlYW0oc3RyZWFtLmJ1ZmZlci5zbGljZShzdHJlYW0ucG9zaXRpb24pKTtcbiAgICB0cy5wYXlsb2FkID0gcGF5bG9hZDtcbiAgfVxuXG4gIHN0YXRpYyBQRVMgKHRzKSB7XG4gICAgbGV0IHJldCA9IHt9O1xuICAgIGxldCBidWZmZXIgPSB0cy5wYXlsb2FkLnN0cmVhbTtcblxuICAgIGxldCBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MjQoKTtcbiAgICBpZiAobmV4dCAhPT0gMSkge1xuICAgICAgcmV0LkVTID0ge307XG4gICAgICByZXQuRVMuYnVmZmVyID0gYnVmZmVyO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgc3RyZWFtSUQgPSBidWZmZXIucmVhZFVpbnQ4KCk7XG4gICAgICBpZiAoc3RyZWFtSUQgPj0gMHhlMCAmJiBzdHJlYW1JRCA8PSAweGVmKSB7XG4gICAgICAgIHJldC50eXBlID0gJ3ZpZGVvJztcbiAgICAgIH1cbiAgICAgIGlmIChzdHJlYW1JRCA+PSAweGMwICYmIHN0cmVhbUlEIDw9IDB4ZGYpIHtcbiAgICAgICAgcmV0LnR5cGUgPSAnYXVkaW8nO1xuICAgICAgfVxuICAgICAgbGV0IHBhY2tldExlbmd0aCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICByZXQucGFja2V0TGVuZ3RoID0gcGFja2V0TGVuZ3RoO1xuICAgICAgaWYgKHJldC50eXBlID09PSAndmlkZW8nIHx8IHJldC50eXBlID09PSAnYXVkaW8nKSB7XG4gICAgICAgIGxldCBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICBsZXQgZmlyc3QgPSBuZXh0ID4+PiA2O1xuICAgICAgICBpZiAoZmlyc3QgIT09IDB4MDIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Vycm9yIHdoZW4gcGFyc2UgcGVzIGhlYWRlcicpO1xuICAgICAgICB9XG4gICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQ4KCk7XG4gICAgICAgIHJldC5wdHNEVFNGbGFnID0gbmV4dCA+Pj4gNjtcbiAgICAgICAgcmV0LmVzY3JGbGFnID0gbmV4dCA+Pj4gNSAmIDB4MDE7XG4gICAgICAgIHJldC5lc1JhdGVGbGFnID0gbmV4dCA+Pj4gNCAmIDB4MDE7XG4gICAgICAgIHJldC5kc21GbGFnID0gbmV4dCA+Pj4gMyAmIDB4MDE7XG4gICAgICAgIHJldC5hZGRpdGlvbmFsRmxhZyA9IG5leHQgPj4+IDIgJiAweDAxO1xuICAgICAgICByZXQuY3JjRmxhZyA9IG5leHQgPj4+IDEgJiAweDAxO1xuICAgICAgICByZXQuZXh0ZW5zaW9uRmxhZyA9IG5leHQgJiAweDAxO1xuICAgICAgICByZXQucGVzSGVhZGVyTGVuZ3RoID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICBsZXQgTjEgPSByZXQucGVzSGVhZGVyTGVuZ3RoO1xuXG4gICAgICAgIGlmIChyZXQucHRzRFRTRmxhZyA9PT0gMikge1xuICAgICAgICAgIGxldCBwdHMgPSBbXTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICAgIHB0cy5wdXNoKG5leHQgPj4+IDEgJiAweDA3KTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBwdHMucHVzaChuZXh0ID4+PiAxKTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBwdHMucHVzaChuZXh0ID4+PiAxKTtcbiAgICAgICAgICByZXQucHRzID0gKHB0c1swXSA8PCAzMCB8IHB0c1sxXSA8PCAxNSB8IHB0c1syXSk7XG4gICAgICAgICAgTjEgLT0gNTtcbiAgICAgICAgICAvLyDop4bpopHlpoLmnpzmsqHmnIlkdHPnlKhwdHNcbiAgICAgICAgICBpZiAocmV0LnR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgICAgICAgIHJldC5kdHMgPSByZXQucHRzO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0LnB0c0RUU0ZsYWcgPT09IDMpIHtcbiAgICAgICAgICBsZXQgcHRzID0gW107XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgICBwdHMucHVzaChuZXh0ID4+PiAxICYgMHgwNyk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgcHRzLnB1c2gobmV4dCA+Pj4gMSk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgcHRzLnB1c2gobmV4dCA+Pj4gMSk7XG4gICAgICAgICAgcmV0LnB0cyA9IChwdHNbMF0gPDwgMzAgfCBwdHNbMV0gPDwgMTUgfCBwdHNbMl0pO1xuICAgICAgICAgIGxldCBkdHMgPSBbXTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICAgIGR0cy5wdXNoKG5leHQgPj4+IDEgJiAweDA3KTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBkdHMucHVzaChuZXh0ID4+PiAxKTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBkdHMucHVzaChuZXh0ID4+PiAxKTtcbiAgICAgICAgICByZXQuZHRzID0gKGR0c1swXSA8PCAzMCB8IGR0c1sxXSA8PCAxNSB8IGR0c1syXSk7XG4gICAgICAgICAgTjEgLT0gMTA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldC5lc2NyRmxhZyA9PT0gMSkge1xuICAgICAgICAgIGxldCBlc2NyID0gW11cbiAgICAgICAgICBsZXQgZXggPSBbXTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICAgIGVzY3IucHVzaChuZXh0ID4+PiAzICYgMHgwNyk7XG4gICAgICAgICAgZXNjci5wdXNoKG5leHQgJiAweDAzKTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBlc2NyLnB1c2gobmV4dCA+Pj4gMTMpO1xuICAgICAgICAgIGVzY3IucHVzaChuZXh0ICYgMHgwMyk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgZXNjci5wdXNoKG5leHQgPj4+IDEzKTtcbiAgICAgICAgICBleC5wdXNoKG5leHQgJiAweDAzKTtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICAgIGV4LnB1c2gobmV4dCA+Pj4gMSk7XG4gICAgICAgICAgcmV0LmVzY3IgPSAoZXNjclswXSA8PCAzMCB8IGVzY3JbMV0gPDwgMjggfCBlc2NyWzJdIDw8IDE1IHwgZXNjclszXSA8PCAxMyB8IGVzY3JbNF0pICogMzAwICsgKGV4WzBdIDw8IDcgfCBleFsxXSk7XG4gICAgICAgICAgTjEgLT0gNjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0LmVzUmF0ZUZsYWcgPT09IDEpIHtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MjQoKTtcbiAgICAgICAgICByZXQuZXNSYXRlID0gbmV4dCA+Pj4gMSAmIDB4M2ZmZmZmO1xuICAgICAgICAgIE4xIC09IDM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldC5kc21GbGFnID09PSAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3Qgc3VwcG9ydCBEU01fdHJpY2tfbW9kZScpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXQuYWRkaXRpb25hbEZsYWcgPT09IDEpIHtcbiAgICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICAgIHJldC5hZGRpdGlvbmFsQ29weUluZm8gPSBuZXh0ICYgMHg3ZjtcbiAgICAgICAgICBOMSAtPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXQuY3JjRmxhZyA9PT0gMSkge1xuICAgICAgICAgIHJldC5wZXNDUkMgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgICAgIE4xIC09IDI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldC5leHRlbnNpb25GbGFnID09PSAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3Qgc3VwcG9ydCBleHRlbnNpb24nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoTjEgPiAwKSB7XG4gICAgICAgICAgYnVmZmVyLnNraXAoTjEpO1xuICAgICAgICB9XG4gICAgICAgIHJldC5FUyA9IFRzRGVtdXhlci5FUyhidWZmZXIsIHJldC50eXBlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZm9ybWF0IGlzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIHN0YXRpYyBFUyAoYnVmZmVyLCB0eXBlKSB7XG4gICAgbGV0IG5leHQ7XG4gICAgbGV0IHJldCA9IHt9O1xuICAgIGlmICh0eXBlID09PSAndmlkZW8nKSB7XG4gICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MzIoKTtcbiAgICAgIGlmIChuZXh0ICE9PSAxKSB7XG4gICAgICAgIGJ1ZmZlci5iYWNrKDQpO1xuICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MjQoKTtcbiAgICAgICAgaWYgKG5leHQgIT09IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2gyNjQgbmFsIGhlYWRlciBwYXJzZSBmYWlsZWQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnVmZmVyLnNraXAoMik7Ly8gMDkgRjBcbiAgICAgIC8vIFRPRE8gcmVhZG5hbHVcbiAgICAgIHJldC5idWZmZXIgPSBidWZmZXI7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnYXVkaW8nKSB7XG4gICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgIC8vIGFkdHPnmoTlkIzmraXlrZfoioLvvIwxMuS9jVxuICAgICAgaWYgKG5leHQgPj4+IDQgIT09IDB4ZmZmKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYWFjIEVTIHBhcnNlIEVycm9yJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBmcSA9IFs5NjAwMCwgODgyMDAsIDY0MDAwLCA0ODAwMCwgNDQxMDAsIDMyMDAwLCAyNDAwMCwgMjIwNTAsIDE2MDAwLCAxMjAwMCwgMTEwMjUsIDgwMDAsIDczNTBdO1xuICAgICAgcmV0LmlkID0gKG5leHQgPj4+IDMgJiAweDAxKSA9PT0gMCA/ICdNUEVHLTQnIDogJ01QRUctMic7XG4gICAgICByZXQubGF5ZXIgPSBuZXh0ID4+PiAxICYgMHgwMztcbiAgICAgIHJldC5hYnNlbnQgPSBuZXh0ICYgMHgwMTtcbiAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgcmV0LmF1ZGlvT2JqZWN0VHlwZSA9IChuZXh0ID4+PiAxNCAmIDB4MDMpICsgMTtcbiAgICAgIHJldC5wcm9maWxlID0gcmV0LmF1ZGlvT2JqZWN0VHlwZSAtIDE7XG4gICAgICByZXQuZnJlcXVlbmN5SW5kZXggPSBuZXh0ID4+PiAxMCAmIDB4MGY7XG4gICAgICByZXQuZnJlcXVlbmNlID0gZnFbcmV0LmZyZXF1ZW5jeUluZGV4XTtcbiAgICAgIHJldC5jaGFubmVsID0gbmV4dCA+Pj4gNiAmIDB4MDc7XG4gICAgICByZXQuZnJhbWVMZW5ndGggPSAobmV4dCAmIDB4MDMpIDw8IDExIHwgKGJ1ZmZlci5yZWFkVWludDE2KCkgPj4+IDUpO1xuICAgICAgVHNEZW11eGVyLmdldEF1ZGlvQ29uZmlnKHJldCk7XG4gICAgICBidWZmZXIuc2tpcCgxKTtcbiAgICAgIHJldC5idWZmZXIgPSBidWZmZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRVMgJHt0eXBlfSBpcyBub3Qgc3VwcG9ydGVkYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIHN0YXRpYyBUU0RUIChzdHJlYW0sIHRzLCBmcmFncykge1xuICAgIC8vIFRPRE9cbiAgICB0cy5wYXlsb2FkID0ge307XG4gIH1cblxuICBzdGF0aWMgQ0FUIChzdHJlYW0sIHRzLCBmcmFncykge1xuICAgIGxldCByZXQgPSB7fVxuICAgIHJldC50YWJsZUlEID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIGxldCBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICByZXQuc2VjdGlvbkluZGljYXRvciA9IG5leHQgPj4+IDc7XG4gICAgcmV0LnNlY3Rpb25MZW5ndGggPSBuZXh0ICYgMHgwZmZmO1xuICAgIHN0cmVhbS5za2lwKDIpO1xuICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgcmV0LnZlcnNpb24gPSBuZXh0ID4+PiAzO1xuICAgIHJldC5jdXJyZW50TmV4dEluZGljYXRvciA9IG5leHQgJiAweDAxO1xuICAgIHJldC5zZWN0aW9uTnVtYmVyID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHJldC5sYXN0U2VjdGlvbk51bWJlciA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICBsZXQgTiA9ICh0aGlzLnNlY3Rpb25MZW5ndGggLSA5KSAvIDQ7XG4gICAgbGV0IGxpc3QgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE47IGkrKykge1xuICAgICAgbGlzdC5wdXNoKHt9KTtcbiAgICB9XG4gICAgcmV0LmNyYzMyID0gc3RyZWFtLnJlYWRVaW50MzIoKTtcbiAgICB0cy5wYXlsb2FkID0gcmV0O1xuICB9XG5cbiAgc3RhdGljIGdldEF1ZGlvQ29uZmlnIChyZXQpIHtcbiAgICBsZXQgdXNlckFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpXG4gICAgbGV0IGNvbmZpZztcbiAgICBsZXQgZXh0ZW5zaW9uU2FtcGxlSW5kZXg7XG4gICAgaWYgKC9maXJlZm94L2kudGVzdCh1c2VyQWdlbnQpKSB7XG4gICAgICBpZiAocmV0LmZyZXF1ZW5jeUluZGV4ID49IDYpIHtcbiAgICAgICAgcmV0LmF1ZGlvT2JqZWN0VHlwZSA9IDU7XG4gICAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSg0KTtcbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxlSW5kZXggPSByZXQuZnJlcXVlbmN5SW5kZXggLSAzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0LmF1ZGlvT2JqZWN0VHlwZSA9IDI7XG4gICAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSgyKTtcbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxlSW5kZXggPSByZXQuZnJlcXVlbmN5SW5kZXg7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh1c2VyQWdlbnQuaW5kZXhPZignYW5kcm9pZCcpICE9PSAtMSkge1xuICAgICAgcmV0LmF1ZGlvT2JqZWN0VHlwZSA9IDI7XG4gICAgICBjb25maWcgPSBuZXcgQXJyYXkoMik7XG4gICAgICBleHRlbnNpb25TYW1wbGVJbmRleCA9IHJldC5mcmVxdWVuY3lJbmRleDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0LmF1ZGlvT2JqZWN0VHlwZSA9IDU7XG4gICAgICBjb25maWcgPSBuZXcgQXJyYXkoNCk7XG4gICAgICBpZiAocmV0LmZyZXF1ZW5jeUluZGV4ID49IDYpIHtcbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxlSW5kZXggPSByZXQuZnJlcXVlbmN5SW5kZXggLSAzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHJldC5jaGFubmVsID09PSAxKSB7XG4gICAgICAgICAgcmV0LmF1ZGlvT2JqZWN0VHlwZSA9IDI7XG4gICAgICAgICAgY29uZmlnID0gbmV3IEFycmF5KDIpO1xuICAgICAgICB9XG4gICAgICAgIGV4dGVuc2lvblNhbXBsZUluZGV4ID0gcmV0LmZyZXF1ZW5jeUluZGV4O1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbmZpZ1swXSA9IHJldC5hdWRpb09iamVjdFR5cGUgPDwgMztcbiAgICBjb25maWdbMF0gfD0gKHJldC5mcmVxdWVuY3lJbmRleCAmIDB4MGUpID4+IDE7XG4gICAgY29uZmlnWzFdID0gKHJldC5mcmVxdWVuY3lJbmRleCAmIDB4MDEpIDw8IDc7XG4gICAgY29uZmlnWzFdIHw9IHJldC5jaGFubmVsIDw8IDM7XG4gICAgaWYgKHJldC5hdWRpb09iamVjdFR5cGUgPT09IDUpIHtcbiAgICAgIGNvbmZpZ1sxXSB8PSAoZXh0ZW5zaW9uU2FtcGxlSW5kZXggJiAweDBlKSA+PiAxO1xuICAgICAgY29uZmlnWzJdID0gKGV4dGVuc2lvblNhbXBsZUluZGV4ICYgMHgwMSkgPDwgNztcbiAgICAgIGNvbmZpZ1syXSB8PSAyIDw8IDI7XG4gICAgICBjb25maWdbM10gPSAwO1xuICAgIH1cbiAgICByZXQuYXVkaW9Db25maWcgPSBjb25maWc7XG4gIH1cblxuICBnZXQgaW5wdXRCdWZmZXIgKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKHRoaXMuY29uZmlncy5pbnB1dGJ1ZmZlcik7XG4gIH1cblxuICBnZXQgX3RyYWNrcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRzRGVtdXhlcjtcbiIsImNsYXNzIFBsYXlsaXN0IHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZ3MpIHtcbiAgICB0aGlzLl9iYXNlVVJMID0gJyc7XG4gICAgdGhpcy5fbGlzdCA9IHt9O1xuICAgIHRoaXMuX3RzID0ge307XG4gICAgdGhpcy52ZXJzaW9uID0gMDtcbiAgICB0aGlzLnNlcXVlbmNlID0gLTE7XG4gICAgdGhpcy50YXJnZXRkdXJhdGlvbiA9IDA7XG4gICAgdGhpcy5kdXJhdGlvbiA9IDA7XG4gICAgdGhpcy5mcmFnTGVuZ3RoID0gMDtcbiAgICB0aGlzLl9sYXN0Z2V0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2F1ZG9jbGVhciA9IGNvbmZpZ3MuYXV0b2NsZWFyIHx8IGZhbHNlO1xuICB9XG5cbiAgZ2V0IGxpc3QgKCkge1xuICAgIHJldHVybiB0aGlzLl9saXN0O1xuICB9XG5cbiAgc2V0IGJhc2VVUkwgKGJhc2VVUkwpIHtcbiAgICBpZiAodGhpcy5iYXNlVVJMICE9PSBiYXNlVVJMKSB7XG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICB0aGlzLl9iYXNlVVJMID0gYmFzZVVSTDtcbiAgICB9XG4gIH1cblxuICBnZXQgYmFzZVVSTCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Jhc2VVUkw7XG4gIH1cblxuICBwdXNoICh0cywgZHVyYXRpb24sIGRpc2NvbnRpbnVlKSB7XG4gICAgaWYgKCF0aGlzLl90c1t0c10pIHtcbiAgICAgIHRoaXMuX3RzW3RzXSA9IHtkdXJhdGlvbjogZHVyYXRpb24sIFxuICAgICAgICBkb3dubG9hZGVkOiBmYWxzZSwgXG4gICAgICAgIGRvd25sb2FkaW5nOiBmYWxzZSwgXG4gICAgICAgIHN0YXJ0OiB0aGlzLmR1cmF0aW9uLCBcbiAgICAgICAgZGlzY29udGludWU6IGRpc2NvbnRpbnVlID8gdHJ1ZTogZmFsc2VcbiAgICAgIH07XG4gICAgICB0aGlzLl9saXN0W3RoaXMuZHVyYXRpb25dID0gdHM7XG4gICAgICB0aGlzLmR1cmF0aW9uICs9IGR1cmF0aW9uO1xuICAgICAgdGhpcy5mcmFnTGVuZ3RoICs9IDE7XG4gICAgfVxuICB9XG5cbiAgZGVsZXRlRnJhZyAodXJsKSB7XG4gICAgaWYgKHRoaXMuX3RzW3VybF0pIHtcbiAgICAgIGlmICh0aGlzLl90c1t1cmxdLnN0YXJ0ID4gdGhpcy5fbGFzdGdldC50aW1lKSB7XG4gICAgICAgIHRoaXMuX2xhc3RnZXQgPSB7XG4gICAgICAgICAgZHVyYXRpb246IHRoaXMuX3RzW3VybF0uZHVyYXRpb24sXG4gICAgICAgICAgdGltZTogdGhpcy5fdHNbdXJsXS5zdGFydCxcbiAgICAgICAgICBkb3dubG9hZGVkOiBmYWxzZSxcbiAgICAgICAgICBkb3dubG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgdXJsOiB1cmxcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZGVsZXRlIHRoaXMuX2xpc3RbdGhpcy5fdHNbdXJsXS5zdGFydF07XG4gICAgICBkZWxldGUgdGhpcy5fdHNbdXJsXTtcbiAgICAgIHRoaXMuZnJhZ0xlbmd0aCAtPSAxO1xuICAgIH1cbiAgfVxuXG4gIHB1c2hNM1U4IChkYXRhLCBkZWxldGVwcmUpIHtcbiAgICAvLyDluLjop4Tkv6Hmga/mm7/mjaJcbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gbTN1OCBkYXRhIHJlY2VpdmVkLmApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnZlcnNpb24gPSBkYXRhLnZlcnNpb247XG4gICAgdGhpcy50YXJnZXRkdXJhdGlvbiA9IGRhdGEudGFyZ2V0ZHVyYXRpb247XG4gICAgaWYoZGF0YS5lbmNyeXB0ICYmICF0aGlzLmVuY3J5cHQpIHtcbiAgICAgIHRoaXMuZW5jcnlwdCA9IGRhdGEuZW5jcnlwdDtcbiAgICB9XG4gICAgLy8g5paw5YiG54mH5L+h5oGvXG4gICAgaWYgKGRhdGEuc2VxdWVuY2UgPiB0aGlzLnNlcXVlbmNlKSB7XG4gICAgICB0aGlzLnNlcXVlbmNlID0gZGF0YS5zZXF1ZW5jZTtcbiAgICAgIGxldCBuZXdmcmFnbGlzdCA9IFtdXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEuZnJhZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGZyYWcgPSBkYXRhLmZyYWdzW2ldO1xuICAgICAgICBpZiAoIXRoaXMuX3RzW2ZyYWcudXJsXSkge1xuICAgICAgICAgIG5ld2ZyYWdsaXN0LnB1c2goZnJhZy51cmwpXG4gICAgICAgICAgdGhpcy5wdXNoKGZyYWcudXJsLCBmcmFnLmR1cmF0aW9uLCBmcmFnLmRpc2NvbnRpbnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZihuZXdmcmFnbGlzdC5sZW5ndGggPCAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2FuIG5vdCByZWFkIHRzIGZpbGUgbGlzdC5gKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKGRlbGV0ZXByZSkge1xuICAgICAgICBsZXQgdHNsaXN0ID0gdGhpcy5nZXRUc0xpc3QoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0c2xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAobmV3ZnJhZ2xpc3QuaW5kZXhPZih0c2xpc3RbaV0pIDwgMCkge1xuICAgICAgICAgICAgdGhpcy5kZWxldGVGcmFnKHRzbGlzdFtpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgT2xkIG0zdTggZmlsZSByZWNlaXZlZCwgJHtkYXRhLnNlcXVlbmNlfWApO1xuICAgIH1cbiAgfVxuXG4gIGdldFRzTGlzdCAoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX3RzKTtcbiAgfVxuXG4gIGRvd25sb2FkZWQgKHRzbmFtZSwgaXNsb2FkZWQpIHtcbiAgICBsZXQgdHMgPSB0aGlzLl90c1t0c25hbWVdO1xuICAgIGlmICh0cykge1xuICAgICAgdHMuZG93bmxvYWRlZCA9IGlzbG9hZGVkXG4gICAgfVxuICB9XG5cbiAgZG93bmxvYWRpbmcgKHRzbmFtZSwgbG9hZGluZykge1xuICAgIGxldCB0cyA9IHRoaXMuX3RzW3RzbmFtZV07XG4gICAgaWYgKHRzKSB7XG4gICAgICB0cy5kb3dubG9hZGluZyA9IGxvYWRpbmdcbiAgICB9XG4gIH1cblxuICBnZXRUc0J5TmFtZSAobmFtZSkge1xuICAgIHJldHVybiB0aGlzLl90c1tuYW1lXTtcbiAgfVxuXG4gIGdldFRzICh0aW1lKSB7XG4gICAgbGV0IHRpbWVsaXN0ID0gT2JqZWN0LmtleXModGhpcy5fbGlzdCk7XG4gICAgbGV0IHRzO1xuXG4gICAgaWYgKHRpbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHRoaXMuX2xhc3RnZXQpIHtcbiAgICAgICAgdGltZSA9IHRoaXMuX2xhc3RnZXQudGltZSArIHRoaXMuX2xhc3RnZXQuZHVyYXRpb247XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aW1lID0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGltZWxpc3QubGVuZ3RoIDwgMSB8fCB0aW1lID49IHRoaXMuZHVyYXRpb24pIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHRpbWVsaXN0LnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KGEpIC0gcGFyc2VGbG9hdChiKVxuICAgIH0pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGltZWxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aW1lID49IHBhcnNlSW50KHRpbWVsaXN0W2ldKSkge1xuICAgICAgICBsZXQgdXJsID0gdGhpcy5fbGlzdFt0aW1lbGlzdFtpXV07XG4gICAgICAgIGxldCBkb3dubG9hZGVkID0gdGhpcy5fdHNbdXJsXS5kb3dubG9hZGVkO1xuICAgICAgICBsZXQgZG93bmxvYWRpbmcgPSB0aGlzLl90c1t1cmxdLmRvd25sb2FkaW5nO1xuICAgICAgICB0cyA9IHt1cmwsIGRvd25sb2FkZWQsIGRvd25sb2FkaW5nLCB0aW1lOiBwYXJzZUludCh0aW1lbGlzdFtpXSksIGR1cmF0aW9uOiBwYXJzZUludCh0aGlzLl90c1t1cmxdLmR1cmF0aW9uKX07XG4gICAgICAgIGlmICh0aGlzLmF1dG9jbGVhcikge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLl90c1t0aGlzLl9sYXN0Z2V0LnVybF07XG4gICAgICAgICAgZGVsZXRlIHRoaXMuX2xpc3RbdGhpcy5fbGFzdGdldC50aW1lXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sYXN0Z2V0ID0gdHM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRzO1xuICB9XG5cbiAgY2xlYXIgKCkge1xuICAgIHRoaXMuX2Jhc2VVUkwgPSAnJztcbiAgICB0aGlzLl9saXN0ID0ge307XG4gICAgdGhpcy5fdHMgPSB7fTtcbiAgICB0aGlzLnZlcnNpb24gPSAwO1xuICAgIHRoaXMuc2VxdWVuY2UgPSAtMTtcbiAgICB0aGlzLnRhcmdldGR1cmF0aW9uID0gMDtcbiAgICB0aGlzLmR1cmF0aW9uID0gMDtcbiAgfVxuXG4gIGNsZWFyRG93bmxvYWRlZCAoKSB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBPYmplY3Qua2V5cyh0aGlzLl90cykubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBsZXQgdHMgPSB0aGlzLl90c1tPYmplY3Qua2V5cyh0aGlzLl90cylbaV1dO1xuICAgICAgdHMuZG93bmxvYWRlZCA9IGZhbHNlO1xuICAgICAgdHMuZG93bmxvYWRpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLl9iYXNlVVJMID0gJyc7XG4gICAgdGhpcy5fbGlzdCA9IHt9O1xuICAgIHRoaXMuX3RzID0ge307XG4gICAgdGhpcy52ZXJzaW9uID0gMDtcbiAgICB0aGlzLnNlcXVlbmNlID0gLTE7XG4gICAgdGhpcy50YXJnZXRkdXJhdGlvbiA9IDA7XG4gICAgdGhpcy5kdXJhdGlvbiA9IDA7XG4gICAgdGhpcy5mcmFnTGVuZ3RoID0gMDtcbiAgICB0aGlzLl9sYXN0Z2V0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2F1ZG9jbGVhciA9IGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXlsaXN0O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIEZldGNoTG9hZGVyOiByZXF1aXJlKCcuL3NyYy9mZXRjaC1sb2FkZXInKS5kZWZhdWx0XG59O1xuIiwiaW1wb3J0IHsgRVZFTlRTIH0gZnJvbSAneGdwbGF5ZXItdXRpbHMnO1xuXG5jb25zdCBMT0FERVJfRVZFTlRTID0gRVZFTlRTLkxPQURFUl9FVkVOVFM7XG5jb25zdCBSRUFEX1NUUkVBTSA9IDA7XG5jb25zdCBSRUFEX1RFWFQgPSAxO1xuY29uc3QgUkVBRF9KU09OID0gMjtcbmNvbnN0IFJFQURfQlVGRkVSID0gMztcbmNsYXNzIEZldGNoTG9hZGVyIHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZ3MpIHtcbiAgICB0aGlzLmNvbmZpZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWdzKTtcbiAgICB0aGlzLnVybCA9IG51bGxcbiAgICB0aGlzLnN0YXR1cyA9IDBcbiAgICB0aGlzLmVycm9yID0gbnVsbFxuICAgIHRoaXMuX3JlYWRlciA9IG51bGw7XG4gICAgdGhpcy5fY2FuY2VsZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9kZXN0cm95ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnJlYWR0eXBlID0gdGhpcy5jb25maWdzLnJlYWR0eXBlO1xuICAgIHRoaXMuYnVmZmVyID0gdGhpcy5jb25maWdzLmJ1ZmZlciB8fCAnTE9BREVSX0JVRkZFUic7XG4gICAgdGhpcy5fbG9hZGVyVGFza05vID0gMDtcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIHRoaXMub24oTE9BREVSX0VWRU5UUy5MQURFUl9TVEFSVCwgdGhpcy5sb2FkLmJpbmQodGhpcykpXG4gIH1cblxuICBzdGF0aWMgZ2V0IHR5cGUgKCkge1xuICAgIHJldHVybiAnbG9hZGVyJ1xuICB9XG5cbiAgbG9hZCAodXJsLCBvcHRzKSB7XG4gICAgbGV0IF90aGlzID0gdGhpcztcbiAgICB0aGlzLnVybCA9IHVybDtcbiAgICB0aGlzLl9jYW5jZWxlZCA9IGZhbHNlO1xuXG4gICAgLy8gVE9ETzogQWRkIFJhbmdlc1xuICAgIGxldCBwYXJhbXMgPSB0aGlzLmdldFBhcmFtcyhvcHRzKVxuICAgIF90aGlzLmxvYWRpbmcgPSB0cnVlXG4gICAgcmV0dXJuIGZldGNoKHRoaXMudXJsLCBwYXJhbXMpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgX3RoaXMuc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzXG4gICAgICAgIHJldHVybiBfdGhpcy5fb25GZXRjaFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICAgIF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfRVJST1IsIF90aGlzLlRBRywgbmV3IEVycm9yKGBpbnZhbGlkIHJlc3BvbnNlLmApKTtcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpICB7XG4gICAgICBfdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0VSUk9SLCBfdGhpcy5UQUcsIGVycm9yKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvci5tZXNzYWdlKVxuICAgIH0pXG4gIH1cblxuICBfb25GZXRjaFJlc3BvbnNlIChyZXNwb25zZSkge1xuICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgbGV0IGJ1ZmZlciA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UodGhpcy5idWZmZXIpO1xuICAgIHRoaXMuX2xvYWRlclRhc2tObysrO1xuICAgIGxldCB0YXNrbm8gPSB0aGlzLl9sb2FkZXJUYXNrTm87XG4gICAgaWYgKHJlc3BvbnNlLm9rID09PSB0cnVlKSB7XG4gICAgICBzd2l0Y2ggKHRoaXMucmVhZHR5cGUpIHtcbiAgICAgICAgY2FzZSBSRUFEX0pTT046XG4gICAgICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIF90aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgICAgICAgaWYgKCFfdGhpcy5fY2FuY2VsZWQgJiYgIV90aGlzLl9kZXN0cm95ZWQpIHtcbiAgICAgICAgICAgICAgaWYgKGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsIGJ1ZmZlcik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9DT01QTEVURSwgZGF0YSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBSRUFEX1RFWFQ6XG4gICAgICAgICAgcmVzcG9uc2UudGV4dCgpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIF90aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgICAgICAgaWYgKCFfdGhpcy5fY2FuY2VsZWQgJiYgIV90aGlzLl9kZXN0cm95ZWQpIHtcbiAgICAgICAgICAgICAgaWYgKGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsIGJ1ZmZlcik7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9DT01QTEVURSwgZGF0YSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBSRUFEX0JVRkZFUjpcbiAgICAgICAgICByZXNwb25zZS5hcnJheUJ1ZmZlcigpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIF90aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgICAgICAgaWYgKCFfdGhpcy5fY2FuY2VsZWQgJiYgIV90aGlzLl9kZXN0cm95ZWQpIHtcbiAgICAgICAgICAgICAgaWYgKGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIGJ1ZmZlci5wdXNoKG5ldyBVaW50OEFycmF5KGRhdGEpKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0NPTVBMRVRFLCBidWZmZXIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsIGRhdGEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgUkVBRF9TVFJFQU06XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX29uUmVhZGVyKHJlc3BvbnNlLmJvZHkuZ2V0UmVhZGVyKCksIHRhc2tubyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX29uUmVhZGVyIChyZWFkZXIsIHRhc2tubykge1xuICAgIGxldCBidWZmZXIgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKHRoaXMuYnVmZmVyKTtcbiAgICBpZiAoKCFidWZmZXIgJiYgdGhpcy5fcmVhZGVyKSB8fCB0aGlzLl9kZXN0cm95ZWQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuX3JlYWRlci5jYW5jZWwoKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBETyBOT1RISU5HXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5fcmVhZGVyID0gcmVhZGVyXG4gICAgaWYgKHRoaXMubG9hZGluZyA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBfdGhpcyA9IHRoaXNcbiAgICAvLyByZWFkZXIgcmVhZCBmdW5jdGlvbiByZXR1cm5zIGEgUHJvbWlzZS4gZ2V0IGRhdGEgd2hlbiBjYWxsYmFjayBhbmQgaGFzIHZhbHVlLmRvbmUgd2hlbiBkaXNjb25uZWN0ZWQuXG4gICAgLy8gcmVhZOaWueazlei/lOWbnuS4gOS4qlByb21pc2UuIOWbnuiwg+S4reWPr+S7peiOt+WPluWIsOaVsOaNruOAguW9k3ZhbHVlLmRvbmXlrZjlnKjml7bvvIzor7TmmI7pk77mjqXmlq3lvIDjgIJcbiAgICB0aGlzLl9yZWFkZXIgJiYgdGhpcy5fcmVhZGVyLnJlYWQoKS50aGVuKGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgIGlmICh2YWwuZG9uZSkge1xuICAgICAgICAvLyBUT0RPOiDlrozmiJDlpITnkIZcbiAgICAgICAgX3RoaXMubG9hZGluZyA9IGZhbHNlXG4gICAgICAgIF90aGlzLnN0YXR1cyA9IDA7XG4gICAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsIGJ1ZmZlcilcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChfdGhpcy5fY2FuY2VsZWQgfHwgX3RoaXMuX2Rlc3Ryb3llZCkge1xuICAgICAgICBpZiAgKF90aGlzLl9yZWFkZXIpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgX3RoaXMuX3JlYWRlci5jYW5jZWwoKVxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIERPIE5PVEhJTkdcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBidWZmZXIucHVzaCh2YWwudmFsdWUpXG4gICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0RBVEFMT0FERUQsIGJ1ZmZlcilcbiAgICAgIHJldHVybiBfdGhpcy5fb25SZWFkZXIocmVhZGVyLCB0YXNrbm8pXG4gICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICBfdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0VSUk9SLCBfdGhpcy5UQUcsIGVycm9yKTtcbiAgICB9KVxuICB9XG5cbiAgZ2V0UGFyYW1zIChvcHRzKSB7XG4gICAgbGV0IG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRzKVxuICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKVxuXG4gICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgbW9kZTogJ2NvcnMnLFxuICAgICAgY2FjaGU6ICdkZWZhdWx0J1xuICAgIH1cblxuICAgIC8vIGFkZCBjdXN0bW9yIGhlYWRlcnNcbiAgICAvLyDmt7vliqDoh6rlrprkuYnlpLRcbiAgICBpZiAodHlwZW9mIHRoaXMuY29uZmlncy5oZWFkZXJzID09PSAnb2JqZWN0Jykge1xuICAgICAgbGV0IGNvbmZpZ0hlYWRlcnMgPSB0aGlzLmNvbmZpZ3MuaGVhZGVyc1xuICAgICAgZm9yIChsZXQga2V5IGluIGNvbmZpZ0hlYWRlcnMpIHtcbiAgICAgICAgaWYgKGNvbmZpZ0hlYWRlcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGhlYWRlcnMuYXBwZW5kKGtleSwgY29uZmlnSGVhZGVyc1trZXldKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmhlYWRlcnMgPT09ICdvYmplY3QnKSB7XG4gICAgICBsZXQgb3B0SGVhZGVycyA9IG9wdGlvbnMuaGVhZGVyc1xuICAgICAgZm9yIChsZXQga2V5IGluIG9wdEhlYWRlcnMpIHtcbiAgICAgICAgaWYgKG9wdEhlYWRlcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIGhlYWRlcnMuYXBwZW5kKGtleSwgb3B0SGVhZGVyc1trZXldKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuY29ycyA9PT0gZmFsc2UpIHtcbiAgICAgIHBhcmFtcy5tb2RlID0gJ3NhbWUtb3JpZ2luJ1xuICAgIH1cblxuICAgIC8vIHdpdGhDcmVkZW50aWFscyBpcyBkaXNhYmxlZCBieSBkZWZhdWx0XG4gICAgLy8gd2l0aENyZWRlbnRpYWxzIOWcqOm7mOiupOaDheWGteS4i+S4jeiiq+S9v+eUqOOAglxuICAgIGlmIChvcHRpb25zLndpdGhDcmVkZW50aWFscykge1xuICAgICAgcGFyYW1zLmNyZWRlbnRpYWxzID0gJ2luY2x1ZGUnXG4gICAgfVxuXG4gICAgLy8gVE9ETzogQWRkIHJhbmdlcztcbiAgICByZXR1cm4gcGFyYW1zO1xuICB9XG5cbiAgY2FuY2VsICgpIHtcbiAgICBpZiAodGhpcy5fcmVhZGVyKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLl9yZWFkZXIuY2FuY2VsKClcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8g6Ziy5q2iZmFpbGVkOiAyMDDplJnor6/ooqvmiZPljbDliLDmjqfliLblj7DkuIpcbiAgICAgIH1cbiAgICAgIHRoaXMuX3JlYWRlciA9IG51bGxcbiAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlXG4gICAgICB0aGlzLl9jYW5jZWxlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5fZGVzdHJveWVkID0gdHJ1ZVxuICAgIHRoaXMuY2FuY2VsKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRmV0Y2hMb2FkZXJcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBNcDRSZW11eGVyOiByZXF1aXJlKCcuL3NyYy9tcDQnKS5kZWZhdWx0XG59O1xuIiwiaW1wb3J0IHsgQnVmZmVyIH0gZnJvbSAneGdwbGF5ZXItdXRpbHMnO1xuXG4vLyBjb25zdCBVSU5UMzJfTUFYID0gTWF0aC5wb3coMiwgMzIpIC0gMTtcbmNsYXNzIEZtcDQge1xuICBzdGF0aWMgc2l6ZSAodmFsdWUpIHtcbiAgICByZXR1cm4gQnVmZmVyLndyaXRlVWludDMyKHZhbHVlKVxuICB9XG4gIHN0YXRpYyBpbml0Qm94IChzaXplLCBuYW1lLCAuLi5jb250ZW50KSB7XG4gICAgY29uc3QgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgYnVmZmVyLndyaXRlKEZtcDQuc2l6ZShzaXplKSwgRm1wNC50eXBlKG5hbWUpLCAuLi5jb250ZW50KVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIGV4dGVuc2lvbiAodmVyc2lvbiwgZmxhZykge1xuICAgIHJldHVybiBuZXcgVWludDhBcnJheShbXG4gICAgICB2ZXJzaW9uLFxuICAgICAgKGZsYWcgPj4gMTYpICYgMHhmZixcbiAgICAgIChmbGFnID4+IDgpICYgMHhmZixcbiAgICAgIGZsYWcgJiAweGZmXG4gICAgXSlcbiAgfVxuICBzdGF0aWMgZnR5cCAoKSB7XG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgyNCwgJ2Z0eXAnLCBuZXcgVWludDhBcnJheShbXG4gICAgICAweDY5LCAweDczLCAweDZGLCAweDZELCAvLyBpc29tLFxuICAgICAgMHgwLCAweDAsIDB4MDAsIDB4MDEsIC8vIG1pbm9yX3ZlcnNpb246IDB4MDFcbiAgICAgIDB4NjksIDB4NzMsIDB4NkYsIDB4NkQsIC8vIGlzb21cbiAgICAgIDB4NjEsIDB4NzYsIDB4NjMsIDB4MzEgLy8gYXZjMVxuICAgIF0pKVxuICB9XG4gIHN0YXRpYyBtb292ICh7IHR5cGUsIG1ldGEgfSkge1xuICAgIGxldCBzaXplID0gOFxuICAgIGxldCBtdmhkID0gRm1wNC5tdmhkKG1ldGEuZHVyYXRpb24sIG1ldGEudGltZXNjYWxlKVxuICAgIGxldCB0cmFrXG5cbiAgICBpZiAodHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgdHJhayA9IEZtcDQudmlkZW9UcmFrKG1ldGEpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYWsgPSBGbXA0LmF1ZGlvVHJhayhtZXRhKVxuICAgIH1cblxuICAgIGxldCBtdmV4ID0gRm1wNC5tdmV4KG1ldGEuZHVyYXRpb24sIG1ldGEudGltZXNjYWxlIHx8IDEwMDAsIG1ldGEuaWQpO1xuICAgIFttdmhkLCB0cmFrLCBtdmV4XS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGhcbiAgICB9KVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goc2l6ZSwgJ21vb3YnLCBtdmhkLCB0cmFrLCBtdmV4KVxuICB9XG4gIHN0YXRpYyBtdmhkIChkdXJhdGlvbiwgdGltZXNjYWxlID0gMTAwMCkge1xuICAgIC8vIGR1cmF0aW9uICo9IHRpbWVzY2FsZTtcbiAgICBsZXQgYnl0ZXMgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyB2ZXJzaW9uKDApICsgZmxhZ3MgICAgIDHkvY3nmoRib3jniYjmnKwrM+S9jWZsYWdzICAgYm9454mI5pys77yMMOaIljHvvIzkuIDoiKzkuLow44CC77yI5Lul5LiL5a2X6IqC5pWw5Z2H5oyJdmVyc2lvbj0w77yJXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBjcmVhdGlvbl90aW1lICAgIOWIm+W7uuaXtumXtCAg77yI55u45a+55LqOVVRD5pe26Ze0MTkwNC0wMS0wMembtueCueeahOenkuaVsO+8iVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gbW9kaWZpY2F0aW9uX3RpbWUgICDkv67mlLnml7bpl7RcblxuICAgICAgLyoqXG4gICAgICAgICAgICAgKiB0aW1lc2NhbGU6IDQgYnl0ZXPmlofku7blqpLkvZPlnKgx56eS5pe26Ze05YaF55qE5Yi75bqm5YC877yM5Y+v5Lul55CG6Kej5Li6MeenkumVv+W6plxuICAgICAgICAgICAgICovXG4gICAgICAodGltZXNjYWxlID4+PiAyNCkgJiAweEZGLFxuICAgICAgKHRpbWVzY2FsZSA+Pj4gMTYpICYgMHhGRixcbiAgICAgICh0aW1lc2NhbGUgPj4+IDgpICYgMHhGRixcbiAgICAgICh0aW1lc2NhbGUpICYgMHhGRixcblxuICAgICAgLyoqXG4gICAgICAgICAgICAgKiBkdXJhdGlvbjogNCBieXRlc+ivpXRyYWNr55qE5pe26Ze06ZW/5bqm77yM55SoZHVyYXRpb27lkox0aW1lIHNjYWxl5YC85Y+v5Lul6K6h566XdHJhY2vml7bplb/vvIzmr5TlpoJhdWRpbyB0cmFja+eahHRpbWUgc2NhbGUgPSA4MDAwLFxuICAgICAgICAgICAgICogZHVyYXRpb24gPSA1NjAxMjjvvIzml7bplb/kuLo3MC4wMTbvvIx2aWRlbyB0cmFja+eahHRpbWUgc2NhbGUgPSA2MDAsIGR1cmF0aW9uID0gNDIwMDDvvIzml7bplb/kuLo3MFxuICAgICAgICAgICAgICovXG4gICAgICAoZHVyYXRpb24gPj4+IDI0KSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24gPj4+IDE2KSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24gPj4+IDgpICYgMHhGRixcbiAgICAgIChkdXJhdGlvbikgJiAweEZGLFxuICAgICAgMHgwMCwgMHgwMSwgMHgwMCwgMHgwMCwgLy8gUHJlZmVycmVkIHJhdGU6IDEuMCAgIOaOqOiNkOaSreaUvumAn+eOh++8jOmrmDE25L2N5ZKM5L2OMTbkvY3liIbliKvkuLrlsI/mlbDngrnmlbTmlbDpg6jliIblkozlsI/mlbDpg6jliIbvvIzljbNbMTYuMTZdIOagvOW8j++8jOivpeWAvOS4ujEuMO+8iDB4MDAwMTAwMDDvvInooajnpLrmraPluLjliY3lkJHmkq3mlL5cbiAgICAgIC8qKlxuICAgICAgICAgICAgICogUHJlZmVycmVkVm9sdW1lKDEuMCwgMmJ5dGVzKSArIHJlc2VydmVkKDJieXRlcylcbiAgICAgICAgICAgICAqIOS4jnJhdGXnsbvkvLzvvIxbOC44XSDmoLzlvI/vvIwxLjDvvIgweDAxMDDvvInooajnpLrmnIDlpKfpn7Pph49cbiAgICAgICAgICAgICAqL1xuICAgICAgMHgwMSwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vICByZXNlcnZlZDogNCArIDQgYnl0ZXPkv53nlZnkvY1cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAxLCAweDAwLCAweDAwLCAvLyAtLS0tYmVnaW4gY29tcG9zaXRpb24gbWF0cml4LS0tLVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIOinhumikeWPmOaNouefqemYtSAgIOe6v+aAp+S7o+aVsFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDEsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDQwLCAweDAwLCAweDAwLCAweDAwLCAvLyAtLS0tZW5kIGNvbXBvc2l0aW9uIG1hdHJpeC0tLS1cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIC0tLS1iZWdpbiBwcmVfZGVmaW5lZCA2ICogNCBieXRlcy0tLS1cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBwcmUtZGVmaW5lZCDkv53nlZnkvY1cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gLS0tLWVuZCBwcmVfZGVmaW5lZCA2ICogNCBieXRlcy0tLS1cbiAgICAgIDB4RkYsIDB4RkYsIDB4RkYsIDB4RkYgLy8gbmV4dF90cmFja19JRCDkuIvkuIDkuKp0cmFja+S9v+eUqOeahGlk5Y+3XG4gICAgXSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDggKyBieXRlcy5sZW5ndGgsICdtdmhkJywgbmV3IFVpbnQ4QXJyYXkoYnl0ZXMpKVxuICB9XG4gIHN0YXRpYyB2aWRlb1RyYWsgKGRhdGEpIHtcbiAgICBsZXQgc2l6ZSA9IDhcblxuICAgIGxldCB0a2hkID0gRm1wNC50a2hkKHtcbiAgICAgIGlkOiAxLFxuICAgICAgZHVyYXRpb246IGRhdGEuZHVyYXRpb24sXG4gICAgICB0aW1lc2NhbGU6IGRhdGEudGltZXNjYWxlIHx8IDEwMDAsXG4gICAgICB3aWR0aDogZGF0YS5wcmVzZW50V2lkdGgsXG4gICAgICBoZWlnaHQ6IGRhdGEucHJlc2VudEhlaWdodCxcbiAgICAgIHR5cGU6ICd2aWRlbydcbiAgICB9KVxuICAgIGxldCBtZGlhID0gRm1wNC5tZGlhKHtcbiAgICAgIHR5cGU6ICd2aWRlbycsXG4gICAgICB0aW1lc2NhbGU6IGRhdGEudGltZXNjYWxlIHx8IDEwMDAsXG4gICAgICBkdXJhdGlvbjogZGF0YS5kdXJhdGlvbixcbiAgICAgIGF2Y2M6IGRhdGEuYXZjYyxcbiAgICAgIHBhclJhdGlvOiBkYXRhLnBhclJhdGlvLFxuICAgICAgd2lkdGg6IGRhdGEucHJlc2VudFdpZHRoLFxuICAgICAgaGVpZ2h0OiBkYXRhLnByZXNlbnRIZWlnaHRcbiAgICB9KTtcbiAgICBbdGtoZCwgbWRpYV0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KHNpemUsICd0cmFrJywgdGtoZCwgbWRpYSlcbiAgfVxuICBzdGF0aWMgYXVkaW9UcmFrIChkYXRhKSB7XG4gICAgbGV0IHNpemUgPSA4XG4gICAgbGV0IHRraGQgPSBGbXA0LnRraGQoe1xuICAgICAgaWQ6IDIsXG4gICAgICBkdXJhdGlvbjogZGF0YS5kdXJhdGlvbixcbiAgICAgIHRpbWVzY2FsZTogZGF0YS50aW1lc2NhbGUgfHwgMTAwMCxcbiAgICAgIHdpZHRoOiAwLFxuICAgICAgaGVpZ2h0OiAwLFxuICAgICAgdHlwZTogJ2F1ZGlvJ1xuICAgIH0pXG4gICAgbGV0IG1kaWEgPSBGbXA0Lm1kaWEoe1xuICAgICAgdHlwZTogJ2F1ZGlvJyxcbiAgICAgIHRpbWVzY2FsZTogZGF0YS50aW1lc2NhbGUgfHwgMTAwMCxcbiAgICAgIGR1cmF0aW9uOiBkYXRhLmR1cmF0aW9uLFxuICAgICAgY2hhbm5lbENvdW50OiBkYXRhLmNoYW5uZWxDb3VudCxcbiAgICAgIHNhbXBsZXJhdGU6IGRhdGEuc2FtcGxlUmF0ZSxcbiAgICAgIGNvbmZpZzogZGF0YS5jb25maWdcbiAgICB9KTtcbiAgICBbdGtoZCwgbWRpYV0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KHNpemUsICd0cmFrJywgdGtoZCwgbWRpYSlcbiAgfVxuICBzdGF0aWMgdGtoZCAoZGF0YSkge1xuICAgIGxldCBpZCA9IGRhdGEuaWRcbiAgICBsZXQgZHVyYXRpb24gPSBkYXRhLmR1cmF0aW9uXG4gICAgbGV0IHdpZHRoID0gZGF0YS53aWR0aFxuICAgIGxldCBoZWlnaHQgPSBkYXRhLmhlaWdodFxuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwNywgLy8gdmVyc2lvbigwKSArIGZsYWdzIDHkvY3niYjmnKwgYm9454mI5pys77yMMOaIljHvvIzkuIDoiKzkuLow44CC77yI5Lul5LiL5a2X6IqC5pWw5Z2H5oyJdmVyc2lvbj0w77yJ5oyJ5L2N5oiW5pON5L2c57uT5p6c5YC877yM6aKE5a6a5LmJ5aaC5LiL77yaXG4gICAgICAvLyAweDAwMDAwMSB0cmFja19lbmFibGVk77yM5ZCm5YiZ6K+ldHJhY2vkuI3ooqvmkq3mlL7vvJtcbiAgICAgIC8vIDB4MDAwMDAyIHRyYWNrX2luX21vdmll77yM6KGo56S66K+ldHJhY2vlnKjmkq3mlL7kuK3ooqvlvJXnlKjvvJtcbiAgICAgIC8vIDB4MDAwMDA0IHRyYWNrX2luX3ByZXZpZXfvvIzooajnpLror6V0cmFja+WcqOmihOiniOaXtuiiq+W8leeUqOOAglxuICAgICAgLy8g5LiA6Iis6K+l5YC85Li6N++8jDErMis0IOWmguaenOS4gOS4quWqkuS9k+aJgOaciXRyYWNr5Z2H5pyq6K6+572udHJhY2tfaW5fbW92aWXlkox0cmFja19pbl9wcmV2aWV377yM5bCG6KKr55CG6Kej5Li65omA5pyJdHJhY2vlnYforr7nva7kuobov5nkuKTpobnvvJvlr7nkuo5oaW50IHRyYWNr77yM6K+l5YC85Li6MFxuICAgICAgLy8gaGludCB0cmFjayDov5nkuKrnibnmrornmoR0cmFja+W5tuS4jeWMheWQq+WqkuS9k+aVsOaNru+8jOiAjOaYr+WMheWQq+S6huS4gOS6m+WwhuWFtuS7luaVsOaNrnRyYWNr5omT5YyF5oiQ5rWB5aqS5L2T55qE5oyH56S65L+h5oGv44CCXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBjcmVhdGlvbl90aW1l5Yib5bu65pe26Ze077yI55u45a+55LqOVVRD5pe26Ze0MTkwNC0wMS0wMembtueCueeahOenkuaVsO+8iVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gbW9kaWZpY2F0aW9uIHRpbWUg5L+u5pS55pe26Ze0XG4gICAgICAoaWQgPj4+IDI0KSAmIDB4RkYsIC8vIHRyYWNrX0lEOiA0IGJ5dGVzIGlk5Y+377yM5LiN6IO96YeN5aSN5LiU5LiN6IO95Li6MFxuICAgICAgKGlkID4+PiAxNikgJiAweEZGLFxuICAgICAgKGlkID4+PiA4KSAmIDB4RkYsXG4gICAgICAoaWQpICYgMHhGRixcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkOiA0IGJ5dGVzICAgIOS/neeVmeS9jVxuICAgICAgKGR1cmF0aW9uID4+PiAyNCkgJiAweEZGLCAvLyBkdXJhdGlvbjogNCBieXRlcyB0cmFja+eahOaXtumXtOmVv+W6plxuICAgICAgKGR1cmF0aW9uID4+PiAxNikgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uID4+PiA4KSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24pICYgMHhGRixcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkOiAyICogNCBieXRlcyAgICDkv53nlZnkvY1cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBsYXllcigyYnl0ZXMpICsgYWx0ZXJuYXRlX2dyb3VwKDJieXRlcykgIOinhumikeWxgu+8jOm7mOiupOS4ujDvvIzlgLzlsI/nmoTlnKjkuIrlsYIudHJhY2vliIbnu4Tkv6Hmga/vvIzpu5jorqTkuLow6KGo56S66K+ldHJhY2vmnKrkuI7lhbbku5Z0cmFja+aciee+pOe7hOWFs+ezu1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gdm9sdW1lKDJieXRlcykgKyByZXNlcnZlZCgyYnl0ZXMpICAgIFs4LjhdIOagvOW8j++8jOWmguaenOS4uumfs+mikXRyYWNr77yMMS4w77yIMHgwMTAw77yJ6KGo56S65pyA5aSn6Z+z6YeP77yb5ZCm5YiZ5Li6MCAgICvkv53nlZnkvY1cbiAgICAgIDB4MDAsIDB4MDEsIDB4MDAsIDB4MDAsIC8vIC0tLS1iZWdpbiBjb21wb3NpdGlvbiBtYXRyaXgtLS0tXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAxLCAweDAwLCAweDAwLCAvLyDop4bpopHlj5jmjaLnn6npmLVcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4NDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIC0tLS1lbmQgY29tcG9zaXRpb24gbWF0cml4LS0tLVxuICAgICAgKHdpZHRoID4+PiA4KSAmIDB4RkYsIC8vIC8v5a695bqmXG4gICAgICAod2lkdGgpICYgMHhGRixcbiAgICAgIDB4MDAsIDB4MDAsXG4gICAgICAoaGVpZ2h0ID4+PiA4KSAmIDB4RkYsIC8vIOmrmOW6plxuICAgICAgKGhlaWdodCkgJiAweEZGLFxuICAgICAgMHgwMCwgMHgwMFxuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCg4ICsgY29udGVudC5ieXRlTGVuZ3RoLCAndGtoZCcsIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIGVkdHMgKGRhdGEpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IGR1cmF0aW9uID0gZGF0YS5kdXJhdGlvblxuICAgIGxldCBtZWRpYVRpbWUgPSBkYXRhLm1lZGlhVGltZVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoMzYpLCBGbXA0LnR5cGUoJ2VkdHMnKSlcbiAgICAvLyBlbHN0XG4gICAgYnVmZmVyLndyaXRlKEZtcDQuc2l6ZSgyOCksIEZtcDQudHlwZSgnZWxzdCcpKVxuICAgIGJ1ZmZlci53cml0ZShuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAxLCAvLyBlbnRyeSBjb3VudFxuICAgICAgKGR1cmF0aW9uID4+IDI0KSAmIDB4ZmYsIChkdXJhdGlvbiA+PiAxNikgJiAweGZmLCAoZHVyYXRpb24gPj4gOCkgJiAweGZmLCBkdXJhdGlvbiAmIDB4ZmYsXG4gICAgICAobWVkaWFUaW1lID4+IDI0KSAmIDB4ZmYsIChtZWRpYVRpbWUgPj4gMTYpICYgMHhmZiwgKG1lZGlhVGltZSA+PiA4KSAmIDB4ZmYsIG1lZGlhVGltZSAmIDB4ZmYsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAxIC8vIG1lZGlhIHJhdGVcbiAgICBdKSlcbiAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlclxuICB9XG4gIHN0YXRpYyBtZGlhIChkYXRhKSB7XG4gICAgbGV0IHNpemUgPSA4XG4gICAgbGV0IG1kaGQgPSBGbXA0Lm1kaGQoZGF0YS50aW1lc2NhbGUsIGRhdGEuZHVyYXRpb24pXG4gICAgbGV0IGhkbHIgPSBGbXA0LmhkbHIoZGF0YS50eXBlKVxuICAgIGxldCBtaW5mID0gRm1wNC5taW5mKGRhdGEpO1xuICAgIFttZGhkLCBoZGxyLCBtaW5mXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGhcbiAgICB9KVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goc2l6ZSwgJ21kaWEnLCBtZGhkLCBoZGxyLCBtaW5mKVxuICB9XG4gIHN0YXRpYyBtZGhkICh0aW1lc2NhbGUgPSAxMDAwLCBkdXJhdGlvbikge1xuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gY3JlYXRpb25fdGltZSAgICDliJvlu7rml7bpl7RcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIG1vZGlmaWNhdGlvbl90aW1l5L+u5pS55pe26Ze0XG4gICAgICAodGltZXNjYWxlID4+PiAyNCkgJiAweEZGLCAvLyB0aW1lc2NhbGU6IDQgYnl0ZXMgICAg5paH5Lu25aqS5L2T5ZyoMeenkuaXtumXtOWGheeahOWIu+W6puWAvO+8jOWPr+S7peeQhuino+S4ujHnp5Lplb/luqZcbiAgICAgICh0aW1lc2NhbGUgPj4+IDE2KSAmIDB4RkYsXG4gICAgICAodGltZXNjYWxlID4+PiA4KSAmIDB4RkYsXG4gICAgICAodGltZXNjYWxlKSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24gPj4+IDI0KSAmIDB4RkYsIC8vIGR1cmF0aW9uOiA0IGJ5dGVzICB0cmFja+eahOaXtumXtOmVv+W6plxuICAgICAgKGR1cmF0aW9uID4+PiAxNikgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uID4+PiA4KSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24pICYgMHhGRixcbiAgICAgIDB4NTUsIDB4QzQsIC8vIGxhbmd1YWdlOiB1bmQgKHVuZGV0ZXJtaW5lZCkg5aqS5L2T6K+t6KiA56CB44CC5pyA6auY5L2N5Li6MO+8jOWQjumdojE15L2N5Li6M+S4quWtl+espu+8iOingUlTTyA2MzktMi9U5qCH5YeG5Lit5a6a5LmJ77yJXG4gICAgICAweDAwLCAweDAwIC8vIHByZV9kZWZpbmVkID0gMFxuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxMiArIGNvbnRlbnQuYnl0ZUxlbmd0aCwgJ21kaGQnLCBGbXA0LmV4dGVuc2lvbigwLCAwKSwgY29udGVudClcbiAgfVxuICBzdGF0aWMgaGRsciAodHlwZSkge1xuICAgIGxldCB2YWx1ZSA9IFsweDAwLCAvLyB2ZXJzaW9uIDBcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBwcmVfZGVmaW5lZFxuICAgICAgMHg3NiwgMHg2OSwgMHg2NCwgMHg2NSwgLy8gaGFuZGxlcl90eXBlOiAndmlkZSdcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4NTYsIDB4NjksIDB4NjQsIDB4NjUsXG4gICAgICAweDZmLCAweDQ4LCAweDYxLCAweDZlLFxuICAgICAgMHg2NCwgMHg2YywgMHg2NSwgMHg3MiwgMHgwMCAvLyBuYW1lOiAnVmlkZW9IYW5kbGVyJ1xuICAgIF1cbiAgICBpZiAodHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgdmFsdWUuc3BsaWNlKDgsIDQsIC4uLlsweDczLCAweDZmLCAweDc1LCAweDZlXSlcbiAgICAgIHZhbHVlLnNwbGljZSgyNCwgMTMsIC4uLlsweDUzLCAweDZmLCAweDc1LCAweDZlLFxuICAgICAgICAweDY0LCAweDQ4LCAweDYxLCAweDZlLFxuICAgICAgICAweDY0LCAweDZjLCAweDY1LCAweDcyLCAweDAwXSlcbiAgICB9XG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCg4ICsgdmFsdWUubGVuZ3RoLCAnaGRscicsIG5ldyBVaW50OEFycmF5KHZhbHVlKSlcbiAgfVxuICBzdGF0aWMgbWluZiAoZGF0YSkge1xuICAgIGxldCBzaXplID0gOFxuICAgIGxldCB2bWhkID0gZGF0YS50eXBlID09PSAndmlkZW8nID8gRm1wNC52bWhkKCkgOiBGbXA0LnNtaGQoKVxuICAgIGxldCBkaW5mID0gRm1wNC5kaW5mKClcbiAgICBsZXQgc3RibCA9IEZtcDQuc3RibChkYXRhKTtcbiAgICBbdm1oZCwgZGluZiwgc3RibF0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KHNpemUsICdtaW5mJywgdm1oZCwgZGluZiwgc3RibClcbiAgfVxuICBzdGF0aWMgdm1oZCAoKSB7XG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgyMCwgJ3ZtaGQnLCBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uXG4gICAgICAweDAwLCAweDAwLCAweDAxLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgLy8gZ3JhcGhpY3Ntb2RlXG4gICAgICAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAgLy8gb3Bjb2xvclxuICAgIF0pKVxuICB9XG4gIHN0YXRpYyBzbWhkICgpIHtcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDE2LCAnc21oZCcsIG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIC8vIHZlcnNpb25cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAweDAwLCAweDAwLCAvLyBiYWxhbmNlXG4gICAgICAweDAwLCAweDAwIC8vIHJlc2VydmVkXG4gICAgXSkpXG4gIH1cbiAgc3RhdGljIGRpbmYgKCkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgZHJlZiA9IFsweDAwLCAvLyB2ZXJzaW9uIDBcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAxLCAvLyBlbnRyeV9jb3VudFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwYywgLy8gZW50cnlfc2l6ZVxuICAgICAgMHg3NSwgMHg3MiwgMHg2YywgMHgyMCwgLy8gJ3VybCcgdHlwZVxuICAgICAgMHgwMCwgLy8gdmVyc2lvbiAwXG4gICAgICAweDAwLCAweDAwLCAweDAxIC8vIGVudHJ5X2ZsYWdzXG4gICAgXVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoMzYpLCBGbXA0LnR5cGUoJ2RpbmYnKSwgRm1wNC5zaXplKDI4KSwgRm1wNC50eXBlKCdkcmVmJyksIG5ldyBVaW50OEFycmF5KGRyZWYpKVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIHN0YmwgKGRhdGEpIHtcbiAgICBsZXQgc2l6ZSA9IDhcbiAgICBsZXQgc3RzZCA9IEZtcDQuc3RzZChkYXRhKVxuICAgIGxldCBzdHRzID0gRm1wNC5zdHRzKClcbiAgICBsZXQgc3RzYyA9IEZtcDQuc3RzYygpXG4gICAgbGV0IHN0c3ogPSBGbXA0LnN0c3ooKVxuICAgIGxldCBzdGNvID0gRm1wNC5zdGNvKCk7XG4gICAgW3N0c2QsIHN0dHMsIHN0c2MsIHN0c3osIHN0Y29dLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aFxuICAgIH0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveChzaXplLCAnc3RibCcsIHN0c2QsIHN0dHMsIHN0c2MsIHN0c3osIHN0Y28pXG4gIH1cbiAgc3RhdGljIHN0c2QgKGRhdGEpIHtcbiAgICBsZXQgY29udGVudFxuICAgIGlmIChkYXRhLnR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgIC8vIGlmICghZGF0YS5pc0FBQyAmJiBkYXRhLmNvZGVjID09PSAnbXA0Jykge1xuICAgICAgLy8gICAgIGNvbnRlbnQgPSBGTVA0Lm1wMyhkYXRhKTtcbiAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAvL1xuICAgICAgLy8gfVxuICAgICAgLy8g5pSv5oyBbXA0YVxuICAgICAgY29udGVudCA9IEZtcDQubXA0YShkYXRhKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb250ZW50ID0gRm1wNC5hdmMxKGRhdGEpXG4gICAgfVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTYgKyBjb250ZW50LmJ5dGVMZW5ndGgsICdzdHNkJywgRm1wNC5leHRlbnNpb24oMCwgMCksIG5ldyBVaW50OEFycmF5KFsweDAwLCAweDAwLCAweDAwLCAweDAxXSksIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIG1wNGEgKGRhdGEpIHtcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMSwgLy8gZGF0YV9yZWZlcmVuY2VfaW5kZXhcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgZGF0YS5jaGFubmVsQ291bnQsIC8vIGNoYW5uZWxjb3VudFxuICAgICAgMHgwMCwgMHgxMCwgLy8gc2FtcGxlU2l6ZToxNmJpdHNcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkMlxuICAgICAgKGRhdGEuc2FtcGxlcmF0ZSA+PiA4KSAmIDB4ZmYsXG4gICAgICBkYXRhLnNhbXBsZXJhdGUgJiAweGZmLCAvL1xuICAgICAgMHgwMCwgMHgwMFxuICAgIF0pXG4gICAgbGV0IGVzZHMgPSBGbXA0LmVzZHMoZGF0YS5jb25maWcpXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCg4ICsgY29udGVudC5ieXRlTGVuZ3RoICsgZXNkcy5ieXRlTGVuZ3RoLCAnbXA0YScsIGNvbnRlbnQsIGVzZHMpXG4gIH1cbiAgc3RhdGljIGVzZHMgKGNvbmZpZyA9IFs0MywgMTQ2LCA4LCAwXSkge1xuICAgIGNvbnN0IGNvbmZpZ2xlbiA9IGNvbmZpZy5sZW5ndGhcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uIDBcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG5cbiAgICAgIDB4MDMsIC8vIGRlc2NyaXB0b3JfdHlwZVxuICAgICAgMHgxNyArIGNvbmZpZ2xlbiwgLy8gbGVuZ3RoXG4gICAgICAweDAwLCAweDAxLCAvLyBlc19pZFxuICAgICAgMHgwMCwgLy8gc3RyZWFtX3ByaW9yaXR5XG5cbiAgICAgIDB4MDQsIC8vIGRlc2NyaXB0b3JfdHlwZVxuICAgICAgMHgwZiArIGNvbmZpZ2xlbiwgLy8gbGVuZ3RoXG4gICAgICAweDQwLCAvLyBjb2RlYyA6IG1wZWc0X2F1ZGlvXG4gICAgICAweDE1LCAvLyBzdHJlYW1fdHlwZVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gYnVmZmVyX3NpemVcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIG1heEJpdHJhdGVcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGF2Z0JpdHJhdGVcblxuICAgICAgMHgwNSAvLyBkZXNjcmlwdG9yX3R5cGVcbiAgICBdLmNvbmNhdChbY29uZmlnbGVuXSkuY29uY2F0KGNvbmZpZykuY29uY2F0KFsweDA2LCAweDAxLCAweDAyXSkpXG4gICAgYnVmZmVyLndyaXRlKEZtcDQuc2l6ZSg4ICsgY29udGVudC5ieXRlTGVuZ3RoKSwgRm1wNC50eXBlKCdlc2RzJyksIGNvbnRlbnQpXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgYXZjMSAoZGF0YSkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgc2l6ZSA9IDQwLy8gOChhdmMxKSs4KGF2Y2MpKzgoYnRydCkrMTYocGFzcClcbiAgICAvLyBsZXQgc3BzID0gZGF0YS5zcHNcbiAgICAvLyBsZXQgcHBzID0gZGF0YS5wcHNcbiAgICBsZXQgd2lkdGggPSBkYXRhLndpZHRoXG4gICAgbGV0IGhlaWdodCA9IGRhdGEuaGVpZ2h0XG4gICAgbGV0IGhTcGFjaW5nID0gZGF0YS5wYXJSYXRpby5oZWlnaHRcbiAgICBsZXQgdlNwYWNpbmcgPSBkYXRhLnBhclJhdGlvLndpZHRoXG4gICAgLy8gbGV0IGF2Y2NCdWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICAvLyBhdmNjQnVmZmVyLndyaXRlKG5ldyBVaW50OEFycmF5KFtcbiAgICAvLyAgIDB4MDEsIC8vIHZlcnNpb25cbiAgICAvLyAgIHNwc1sxXSwgLy8gcHJvZmlsZVxuICAgIC8vICAgc3BzWzJdLCAvLyBwcm9maWxlIGNvbXBhdGlibGVcbiAgICAvLyAgIHNwc1szXSwgLy8gbGV2ZWxcbiAgICAvLyAgIDB4ZmMgfCAzLFxuICAgIC8vICAgMHhFMCB8IDEgLy8g55uu5YmN5Y+q5aSE55CG5LiA5Liqc3BzXG4gICAgLy8gXS5jb25jYXQoW3Nwcy5sZW5ndGggPj4+IDggJiAweGZmLCBzcHMubGVuZ3RoICYgMHhmZl0pKSlcbiAgICAvLyBhdmNjQnVmZmVyLndyaXRlKHNwcywgbmV3IFVpbnQ4QXJyYXkoWzEsIHBwcy5sZW5ndGggPj4+IDggJiAweGZmLCBwcHMubGVuZ3RoICYgMHhmZl0pLCBwcHMpXG5cbiAgICBsZXQgYXZjYyA9IGRhdGEuYXZjY1xuICAgIGxldCBhdmMxID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAxLCAvLyBkYXRhX3JlZmVyZW5jZV9pbmRleFxuICAgICAgMHgwMCwgMHgwMCwgLy8gcHJlX2RlZmluZWRcbiAgICAgIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHByZV9kZWZpbmVkXG4gICAgICAod2lkdGggPj4gOCkgJiAweGZmLFxuICAgICAgd2lkdGggJiAweGZmLCAvLyB3aWR0aFxuICAgICAgKGhlaWdodCA+PiA4KSAmIDB4ZmYsXG4gICAgICBoZWlnaHQgJiAweGZmLCAvLyBoZWlnaHRcbiAgICAgIDB4MDAsIDB4NDgsIDB4MDAsIDB4MDAsIC8vIGhvcml6cmVzb2x1dGlvblxuICAgICAgMHgwMCwgMHg0OCwgMHgwMCwgMHgwMCwgLy8gdmVydHJlc29sdXRpb25cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAxLCAvLyBmcmFtZV9jb3VudFxuICAgICAgMHgxMixcbiAgICAgIDB4NjQsIDB4NjEsIDB4NjksIDB4NkMsIC8vIGRhaWx5bW90aW9uL2hscy5qc1xuICAgICAgMHg3OSwgMHg2RCwgMHg2RiwgMHg3NCxcbiAgICAgIDB4NjksIDB4NkYsIDB4NkUsIDB4MkYsXG4gICAgICAweDY4LCAweDZDLCAweDczLCAweDJFLFxuICAgICAgMHg2QSwgMHg3MywgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gY29tcHJlc3Nvcm5hbWVcbiAgICAgIDB4MDAsIDB4MTgsIC8vIGRlcHRoID0gMjRcbiAgICAgIDB4MTEsIDB4MTFdKSAvLyBwcmVfZGVmaW5lZCA9IC0xXG4gICAgbGV0IGJ0cnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAweDFjLCAweDljLCAweDgwLCAvLyBidWZmZXJTaXplREJcbiAgICAgIDB4MDAsIDB4MmQsIDB4YzYsIDB4YzAsIC8vIG1heEJpdHJhdGVcbiAgICAgIDB4MDAsIDB4MmQsIDB4YzYsIDB4YzAgLy8gYXZnQml0cmF0ZVxuICAgIF0pXG4gICAgbGV0IHBhc3AgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAoaFNwYWNpbmcgPj4gMjQpLCAvLyBoU3BhY2luZ1xuICAgICAgKGhTcGFjaW5nID4+IDE2KSAmIDB4ZmYsXG4gICAgICAoaFNwYWNpbmcgPj4gOCkgJiAweGZmLFxuICAgICAgaFNwYWNpbmcgJiAweGZmLFxuICAgICAgKHZTcGFjaW5nID4+IDI0KSwgLy8gdlNwYWNpbmdcbiAgICAgICh2U3BhY2luZyA+PiAxNikgJiAweGZmLFxuICAgICAgKHZTcGFjaW5nID4+IDgpICYgMHhmZixcbiAgICAgIHZTcGFjaW5nICYgMHhmZlxuICAgIF0pXG5cbiAgICBidWZmZXIud3JpdGUoXG4gICAgICBGbXA0LnNpemUoc2l6ZSArIGF2YzEuYnl0ZUxlbmd0aCArIGF2Y2MuYnl0ZUxlbmd0aCArIGJ0cnQuYnl0ZUxlbmd0aCksIEZtcDQudHlwZSgnYXZjMScpLCBhdmMxLFxuICAgICAgRm1wNC5zaXplKDggKyBhdmNjLmJ5dGVMZW5ndGgpLCBGbXA0LnR5cGUoJ2F2Y0MnKSwgYXZjYyxcbiAgICAgIEZtcDQuc2l6ZSgyMCksIEZtcDQudHlwZSgnYnRydCcpLCBidHJ0LFxuICAgICAgRm1wNC5zaXplKDE2KSwgRm1wNC50eXBlKCdwYXNwJyksIHBhc3BcbiAgICApXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgc3R0cyAoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCAvLyBlbnRyeV9jb3VudFxuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxNiwgJ3N0dHMnLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyBzdHNjICgpIHtcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIC8vIHZlcnNpb25cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwIC8vIGVudHJ5X2NvdW50XG4gICAgXSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDE2LCAnc3RzYycsIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIHN0Y28gKCkge1xuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgLy8gdmVyc2lvblxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAgLy8gZW50cnlfY291bnRcbiAgICBdKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTYsICdzdGNvJywgY29udGVudClcbiAgfVxuICBzdGF0aWMgc3RzeiAoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gc2FtcGxlX3NpemVcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAgLy8gc2FtcGxlX2NvdW50XG4gICAgXSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDIwLCAnc3RzeicsIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIG12ZXggKGR1cmF0aW9uLCB0aW1lc2NhbGUgPSAxMDAwLCB0cmFja0lEKSB7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGxldCBtZWhkID0gQnVmZmVyLndyaXRlVWludDMyKGR1cmF0aW9uKVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoNTYpLCBGbXA0LnR5cGUoJ212ZXgnKSwgRm1wNC5zaXplKDE2KSwgRm1wNC50eXBlKCdtZWhkJyksIEZtcDQuZXh0ZW5zaW9uKDAsIDApLCBtZWhkLCBGbXA0LnRyZXgodHJhY2tJRCkpXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgdHJleCAoaWQpIHtcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIC8vIHZlcnNpb24gMFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgIChpZCA+PiAyNCksXG4gICAgICAoaWQgPj4gMTYpICYgMHhmZixcbiAgICAgIChpZCA+PiA4KSAmIDB4ZmYsXG4gICAgICAoaWQgJiAweGZmKSwgLy8gdHJhY2tfSURcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDEsIC8vIGRlZmF1bHRfc2FtcGxlX2Rlc2NyaXB0aW9uX2luZGV4XG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBkZWZhdWx0X3NhbXBsZV9kdXJhdGlvblxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZGVmYXVsdF9zYW1wbGVfc2l6ZVxuICAgICAgMHgwMCwgMHgwMSwgMHgwMCwgMHgwMSAvLyBkZWZhdWx0X3NhbXBsZV9mbGFnc1xuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCg4ICsgY29udGVudC5ieXRlTGVuZ3RoLCAndHJleCcsIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIG1vb2YgKGRhdGEpIHtcbiAgICBsZXQgc2l6ZSA9IDhcbiAgICBsZXQgbWZoZCA9IEZtcDQubWZoZCgpXG4gICAgbGV0IHRyYWYgPSBGbXA0LnRyYWYoZGF0YSk7XG4gICAgW21maGQsIHRyYWZdLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aFxuICAgIH0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveChzaXplLCAnbW9vZicsIG1maGQsIHRyYWYpXG4gIH1cbiAgc3RhdGljIG1maGQgKCkge1xuICAgIGxldCBjb250ZW50ID0gQnVmZmVyLndyaXRlVWludDMyKEZtcDQuc2VxdWVuY2UpXG4gICAgRm1wNC5zZXF1ZW5jZSArPSAxXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxNiwgJ21maGQnLCBGbXA0LmV4dGVuc2lvbigwLCAwKSwgY29udGVudClcbiAgfVxuICBzdGF0aWMgdHJhZiAoZGF0YSkge1xuICAgIGxldCBzaXplID0gOFxuICAgIGxldCB0ZmhkID0gRm1wNC50ZmhkKGRhdGEuaWQpXG4gICAgbGV0IHRmZHQgPSBGbXA0LnRmZHQoZGF0YS50aW1lKVxuICAgIGxldCBzZHRwID0gRm1wNC5zZHRwKGRhdGEpXG4gICAgbGV0IHRydW4gPSBGbXA0LnRydW4oZGF0YSwgc2R0cC5ieXRlTGVuZ3RoKTtcblxuICAgIFt0ZmhkLCB0ZmR0LCB0cnVuLCBzZHRwXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGhcbiAgICB9KVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goc2l6ZSwgJ3RyYWYnLCB0ZmhkLCB0ZmR0LCB0cnVuLCBzZHRwKVxuICB9XG4gIHN0YXRpYyB0ZmhkIChpZCkge1xuICAgIGxldCBjb250ZW50ID0gQnVmZmVyLndyaXRlVWludDMyKGlkKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTYsICd0ZmhkJywgRm1wNC5leHRlbnNpb24oMCwgMCksIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIHRmZHQgKHRpbWUpIHtcbiAgICAvLyBsZXQgdXBwZXIgPSBNYXRoLmZsb29yKHRpbWUgLyAoVUlOVDMyX01BWCArIDEpKSxcbiAgICAvLyAgICAgbG93ZXIgPSBNYXRoLmZsb29yKHRpbWUgJSAoVUlOVDMyX01BWCArIDEpKTtcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDE2LCAndGZkdCcsIEZtcDQuZXh0ZW5zaW9uKDAsIDApLCBCdWZmZXIud3JpdGVVaW50MzIodGltZSkpXG4gIH1cbiAgc3RhdGljIHRydW4gKGRhdGEsIHNkdHBMZW5ndGgpIHtcbiAgICAvLyBsZXQgaWQgPSBkYXRhLmlkO1xuICAgIC8vIGxldCBjZWlsID0gaWQgPT09IDEgPyAxNiA6IDEyO1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgc2FtcGxlQ291bnQgPSBCdWZmZXIud3JpdGVVaW50MzIoZGF0YS5zYW1wbGVzLmxlbmd0aClcbiAgICAvLyBtZGF0LWhlYWRlciA4XG4gICAgLy8gbW9vZi1oZWFkZXIgOFxuICAgIC8vIG1maGQgMTZcbiAgICAvLyB0cmFmLWhlYWRlciA4XG4gICAgLy8gdGhoZCAxNlxuICAgIC8vIHRmZHQgMjBcbiAgICAvLyB0cnVuLWhlYWRlciAxMlxuICAgIC8vIHNhbXBsZUNvdW50IDRcbiAgICAvLyBkYXRhLW9mZnNldCA0XG4gICAgLy8gc2FtcGxlcy5sZW5ndGhcbiAgICBsZXQgb2Zmc2V0ID0gQnVmZmVyLndyaXRlVWludDMyKDggKyA4ICsgMTYgKyA4ICsgMTYgKyAxNiArIDEyICsgNCArIDQgKyAxNiAqIGRhdGEuc2FtcGxlcy5sZW5ndGggKyBzZHRwTGVuZ3RoKVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoMjAgKyAxNiAqIGRhdGEuc2FtcGxlcy5sZW5ndGgpLCBGbXA0LnR5cGUoJ3RydW4nKSwgbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4MDAsIDB4MEYsIDB4MDFdKSwgc2FtcGxlQ291bnQsIG9mZnNldClcblxuICAgIC8vIGxldCBzaXplID0gYnVmZmVyLmJ1ZmZlci5ieXRlTGVuZ3RoXG4gICAgLy8gbGV0IHdyaXRlT2Zmc2V0ID0gMFxuICAgIC8vIGRhdGEuc2FtcGxlcy5mb3JFYWNoKCgpID0+IHtcbiAgICAvLyAgIHNpemUgKz0gMTZcbiAgICAvLyB9KVxuICAgIC8vXG4gICAgLy8gbGV0IHRydW5Cb3ggPSBuZXcgVWludDhBcnJheShzaXplKVxuXG4gICAgLy8gdHJ1bkJveC5zZXQoYnVmZmVyLmJ1ZmZlciwgMClcblxuICAgIGRhdGEuc2FtcGxlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCBmbGFncyA9IGl0ZW0uZmxhZ3NcbiAgICAgIC8vIGNvbnNvbGUubG9nKGl0ZW0udHlwZSwgaXRlbS5kdHMsIGl0ZW0uZHVyYXRpb24pXG5cbiAgICAgIGJ1ZmZlci53cml0ZShuZXcgVWludDhBcnJheShbXG4gICAgICAgIChpdGVtLmR1cmF0aW9uID4+PiAyNCkgJiAweEZGLCAvLyBzYW1wbGVfZHVyYXRpb25cbiAgICAgICAgKGl0ZW0uZHVyYXRpb24gPj4+IDE2KSAmIDB4RkYsXG4gICAgICAgIChpdGVtLmR1cmF0aW9uID4+PiA4KSAmIDB4RkYsXG4gICAgICAgIChpdGVtLmR1cmF0aW9uKSAmIDB4RkYsXG4gICAgICAgIChpdGVtLnNpemUgPj4+IDI0KSAmIDB4RkYsIC8vIHNhbXBsZV9zaXplXG4gICAgICAgIChpdGVtLnNpemUgPj4+IDE2KSAmIDB4RkYsXG4gICAgICAgIChpdGVtLnNpemUgPj4+IDgpICYgMHhGRixcbiAgICAgICAgKGl0ZW0uc2l6ZSkgJiAweEZGLFxuICAgICAgICAoZmxhZ3MuaXNMZWFkaW5nIDw8IDIpIHwgZmxhZ3MuZGVwZW5kc09uLCAvLyBzYW1wbGVfZmxhZ3NcbiAgICAgICAgKGZsYWdzLmlzRGVwZW5kZWRPbiA8PCA2KSB8IChmbGFncy5oYXNSZWR1bmRhbmN5IDw8IDQpIHwgZmxhZ3MuaXNOb25TeW5jLFxuICAgICAgICAweDAwLCAweDAwLCAvLyBzYW1wbGVfZGVncmFkYXRpb25fcHJpb3JpdHlcbiAgICAgICAgKGl0ZW0uY3RzID4+PiAyNCkgJiAweEZGLCAvLyBzYW1wbGVfY29tcG9zaXRpb25fdGltZV9vZmZzZXRcbiAgICAgICAgKGl0ZW0uY3RzID4+PiAxNikgJiAweEZGLFxuICAgICAgICAoaXRlbS5jdHMgPj4+IDgpICYgMHhGRixcbiAgICAgICAgKGl0ZW0uY3RzKSAmIDB4RkZcbiAgICAgIF0pKVxuICAgICAgLy8gd3JpdGVPZmZzZXQgKz0gMTZcbiAgICAgIC8vIGJ1ZmZlci53cml0ZShCdWZmZXIud3JpdGVVaW50MzIoMCkpO1xuICAgIH0pXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgc2R0cCAoZGF0YSkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKDEyICsgZGF0YS5zYW1wbGVzLmxlbmd0aCksIEZtcDQudHlwZSgnc2R0cCcpLCBGbXA0LmV4dGVuc2lvbigwLCAwKSlcbiAgICBkYXRhLnNhbXBsZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGNvbnN0IGZsYWdzID0gaXRlbS5mbGFnc1xuICAgICAgY29uc3QgbnVtID0gKGZsYWdzLmlzTGVhZGluZyA8PCA2KSB8IC8vIGlzX2xlYWRpbmc6IDIgKGJpdClcbiAgICAgICAgKGZsYWdzLmRlcGVuZHNPbiA8PCA0KSB8IC8vIHNhbXBsZV9kZXBlbmRzX29uXG4gICAgICAgIChmbGFncy5pc0RlcGVuZGVkT24gPDwgMikgfCAvLyBzYW1wbGVfaXNfZGVwZW5kZWRfb25cbiAgICAgICAgKGZsYWdzLmhhc1JlZHVuZGFuY3kpLy8gc2FtcGxlX2hhc19yZWR1bmRhbmN5XG5cbiAgICAgIGJ1ZmZlci53cml0ZShuZXcgVWludDhBcnJheShbbnVtXSkpXG4gICAgfSlcbiAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlclxuICB9XG4gIHN0YXRpYyBtZGF0IChkYXRhKSB7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGxldCBzaXplID0gOFxuICAgIGRhdGEuc2FtcGxlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLnNpemVcbiAgICB9KVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoc2l6ZSksIEZtcDQudHlwZSgnbWRhdCcpKVxuICAgIGxldCBtZGF0Qm94ID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSlcbiAgICBsZXQgb2Zmc2V0ID0gMFxuICAgIG1kYXRCb3guc2V0KGJ1ZmZlci5idWZmZXIsIG9mZnNldClcbiAgICBvZmZzZXQgKz0gOFxuICAgIGRhdGEuc2FtcGxlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaXRlbS5idWZmZXIuZm9yRWFjaCgodW5pdCkgPT4ge1xuICAgICAgICBtZGF0Qm94LnNldCh1bml0LCBvZmZzZXQpXG4gICAgICAgIG9mZnNldCArPSB1bml0LmJ5dGVMZW5ndGhcbiAgICAgICAgLy8gYnVmZmVyLndyaXRlKHVuaXQuZGF0YSk7XG4gICAgICB9KVxuICAgIH0pXG4gICAgcmV0dXJuIG1kYXRCb3hcbiAgfVxufVxuRm1wNC50eXBlID0gKG5hbWUpID0+IHtcbiAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFtuYW1lLmNoYXJDb2RlQXQoMCksIG5hbWUuY2hhckNvZGVBdCgxKSwgbmFtZS5jaGFyQ29kZUF0KDIpLCBuYW1lLmNoYXJDb2RlQXQoMyldKVxufVxuRm1wNC5zZXF1ZW5jZSA9IDFcblxuZXhwb3J0IGRlZmF1bHQgRm1wNFxuIiwiaW1wb3J0IHtcbiAgRVZFTlRTLFxuICBzbmlmZmVyLFxuICBNZWRpYVNlZ21lbnRMaXN0LFxuICBCdWZmZXJcbn0gZnJvbSAneGdwbGF5ZXItdXRpbHMnO1xuaW1wb3J0IEZtcDQgZnJvbSAnLi9mbXA0J1xuXG5jb25zdCBSRU1VWF9FVkVOVFMgPSBFVkVOVFMuUkVNVVhfRVZFTlRTXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1wNFJlbXV4ZXIge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5fZHRzQmFzZSA9IDBcbiAgICB0aGlzLl9pc0R0c0Jhc2VJbml0ZWQgPSBmYWxzZVxuXG4gICAgdGhpcy5pc0ZpcnN0VmlkZW8gPSB0cnVlXG4gICAgdGhpcy5pc0ZpcnN0QXVkaW8gPSB0cnVlXG5cbiAgICB0aGlzLnZpZGVvQWxsRHVyYXRpb24gPSAwXG4gICAgdGhpcy5hdWRpb0FsbER1cmF0aW9uID0gMFxuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgdGhpcy5vbihSRU1VWF9FVkVOVFMuUkVNVVhfTUVESUEsIHRoaXMucmVtdXguYmluZCh0aGlzKSlcbiAgICB0aGlzLm9uKFJFTVVYX0VWRU5UUy5SRU1VWF9NRVRBREFUQSwgdGhpcy5vbk1ldGFEYXRhUmVhZHkuYmluZCh0aGlzKSlcbiAgICB0aGlzLm9uKFJFTVVYX0VWRU5UUy5ERVRFQ1RfQ0hBTkdFX1NUUkVBTSwgdGhpcy5yZXNldER0c0Jhc2UuYmluZCh0aGlzKSlcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuX2R0c0Jhc2UgPSAtMVxuICAgIHRoaXMuX2R0c0Jhc2VJbml0ZWQgPSBmYWxzZVxuICB9XG5cbiAgcmVzZXQgKCkge1xuICAgIHRoaXMuX2R0c0Jhc2UgPSAwXG4gICAgdGhpcy5faXNEdHNCYXNlSW5pdGVkID0gZmFsc2VcbiAgfVxuXG4gIHJlbXV4ICgpIHtcbiAgICBjb25zdCB7IGF1ZGlvVHJhY2ssIHZpZGVvVHJhY2sgfSA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpXG4gICAgIXRoaXMuX2lzRHRzQmFzZUluaXRlZCAmJiB0aGlzLmNhbGNEdHNCYXNlKGF1ZGlvVHJhY2ssIHZpZGVvVHJhY2spXG5cbiAgICB0aGlzLl9yZW11eFZpZGVvKHZpZGVvVHJhY2spXG4gICAgdGhpcy5fcmVtdXhBdWRpbyhhdWRpb1RyYWNrKVxuICB9XG5cbiAgcmVzZXREdHNCYXNlICgpIHtcbiAgICAvLyBmb3IgaGxzIOS4remAlOWIh+aNoiBtZXRh5ZCOc2Vla1xuICAgIHRoaXMuX2R0c0Jhc2UgPSAwXG4gICAgdGhpcy5fZHRzQmFzZUluaXRlZCA9IGZhbHNlXG4gIH1cblxuICBzZWVrICgpIHtcblxuICB9XG5cbiAgb25NZXRhRGF0YVJlYWR5ICh0eXBlKSB7XG4gICAgbGV0IHRyYWNrXG5cbiAgICBpZiAodHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgY29uc3QgeyBhdWRpb1RyYWNrIH0gPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKVxuICAgICAgdHJhY2sgPSBhdWRpb1RyYWNrO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB7IHZpZGVvVHJhY2sgfSA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpXG4gICAgICB0cmFjayA9IHZpZGVvVHJhY2s7XG4gICAgfVxuXG4gICAgbGV0IHByZXNvdXJjZWJ1ZmZlciA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1BSRV9TT1VSQ0VfQlVGRkVSJyk7XG4gICAgbGV0IHNvdXJjZSA9IHByZXNvdXJjZWJ1ZmZlci5nZXRTb3VyY2UodHlwZSk7XG4gICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgIHNvdXJjZSA9IHByZXNvdXJjZWJ1ZmZlci5jcmVhdGVTb3VyY2UodHlwZSk7XG4gICAgfVxuXG4gICAgc291cmNlLm1pbWV0eXBlID0gdHJhY2subWV0YS5jb2RlYztcbiAgICBzb3VyY2UuaW5pdCA9IHRoaXMucmVtdXhJbml0U2VnbWVudCh0eXBlLCB0cmFjay5tZXRhKTtcbiAgICAvLyBzb3VyY2UuaW5pdGVkID0gZmFsc2U7XG5cbiAgICAvLyB0aGlzLnJlc2V0RHRzQmFzZSgpXG4gICAgdGhpcy5lbWl0KFJFTVVYX0VWRU5UUy5JTklUX1NFR01FTlQsIHR5cGUpXG4gIH1cblxuICByZW11eEluaXRTZWdtZW50ICh0eXBlLCBtZXRhKSB7XG4gICAgbGV0IGluaXRTZWdtZW50ID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IGZ0eXAgPSBGbXA0LmZ0eXAoKVxuICAgIGxldCBtb292ID0gRm1wNC5tb292KHsgdHlwZSwgbWV0YTogbWV0YSB9KVxuXG4gICAgaW5pdFNlZ21lbnQud3JpdGUoZnR5cCwgbW9vdilcbiAgICByZXR1cm4gaW5pdFNlZ21lbnQ7XG4gIH1cblxuICBjYWxjRHRzQmFzZSAoYXVkaW9UcmFjaywgdmlkZW9UcmFjaykge1xuICAgIGlmICghYXVkaW9UcmFjay5zYW1wbGVzLmxlbmd0aCAmJiAhdmlkZW9UcmFjay5zYW1wbGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBhdWRpb0Jhc2UgPSBJbmZpbml0eVxuICAgIGxldCB2aWRlb0Jhc2UgPSBJbmZpbml0eVxuXG4gICAgaWYgKGF1ZGlvVHJhY2suc2FtcGxlcyAmJiBhdWRpb1RyYWNrLnNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICBhdWRpb0Jhc2UgPSBhdWRpb1RyYWNrLnNhbXBsZXNbMF0uZHRzXG4gICAgfVxuICAgIGlmICh2aWRlb1RyYWNrLnNhbXBsZXMgJiYgdmlkZW9UcmFjay5zYW1wbGVzLmxlbmd0aCkge1xuICAgICAgdmlkZW9CYXNlID0gdmlkZW9UcmFjay5zYW1wbGVzWzBdLmR0c1xuICAgIH1cblxuICAgIHRoaXMuX2R0c0Jhc2UgPSBNYXRoLm1pbihhdWRpb0Jhc2UsIHZpZGVvQmFzZSlcbiAgICB0aGlzLl9pc0R0c0Jhc2VJbml0ZWQgPSB0cnVlXG4gIH1cblxuICBfcmVtdXhWaWRlbyAodmlkZW9UcmFjaykge1xuICAgIGNvbnN0IHRyYWNrID0gdmlkZW9UcmFja1xuXG4gICAgaWYgKCF2aWRlb1RyYWNrLnNhbXBsZXMgfHwgIXZpZGVvVHJhY2suc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCB7c2FtcGxlc30gPSB0cmFja1xuICAgIGxldCBmaXJzdER0cyA9IC0xXG5cbiAgICBsZXQgaW5pdFNlZ21lbnQgPSBudWxsXG4gICAgY29uc3QgbXA0U2FtcGxlcyA9IFtdXG4gICAgY29uc3QgbWRhdEJveCA9IHtcbiAgICAgIHNhbXBsZXM6IFtdXG4gICAgfVxuXG4gICAgd2hpbGUgKHNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBhdmNTYW1wbGUgPSBzYW1wbGVzLnNoaWZ0KClcblxuICAgICAgY29uc3QgeyBpc0tleWZyYW1lLCBvcHRpb25zIH0gPSBhdmNTYW1wbGVcbiAgICAgIGlmICghdGhpcy5pc0ZpcnN0QXVkaW8gJiYgb3B0aW9ucyAmJiBvcHRpb25zLm1ldGEpIHtcbiAgICAgICAgaW5pdFNlZ21lbnQgPSB0aGlzLnJlbXV4SW5pdFNlZ21lbnQoJ3ZpZGVvJywgb3B0aW9ucy5tZXRhKVxuICAgICAgICBvcHRpb25zLm1ldGEgPSBudWxsXG4gICAgICAgIHNhbXBsZXMudW5zaGlmdChhdmNTYW1wbGUpXG4gICAgICAgIGlmICghb3B0aW9ucy5pc0NvbnRpbnVlKSB7XG4gICAgICAgICAgdGhpcy5yZXNldER0c0Jhc2UoKVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBsZXQgZHRzID0gYXZjU2FtcGxlLmR0cyAtIHRoaXMuX2R0c0Jhc2VcblxuICAgICAgaWYgKGZpcnN0RHRzID09PSAtMSkge1xuICAgICAgICBmaXJzdER0cyA9IGR0c1xuICAgICAgfVxuXG4gICAgICBsZXQgY3RzXG4gICAgICBsZXQgcHRzXG4gICAgICBpZiAoYXZjU2FtcGxlLnB0cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHB0cyA9IGF2Y1NhbXBsZS5wdHMgLSB0aGlzLl9kdHNCYXNlXG4gICAgICAgIGN0cyA9IHB0cyAtIGR0c1xuICAgICAgfVxuICAgICAgaWYgKGF2Y1NhbXBsZS5jdHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwdHMgPSBhdmNTYW1wbGUuY3RzICsgZHRzXG4gICAgICAgIGN0cyA9IGF2Y1NhbXBsZS5jdHNcbiAgICAgIH1cblxuICAgICAgbGV0IG1kYXRTYW1wbGUgPSB7XG4gICAgICAgIGJ1ZmZlcjogW10sXG4gICAgICAgIHNpemU6IDBcbiAgICAgIH1cbiAgICAgIG1kYXRCb3guc2FtcGxlcy5wdXNoKG1kYXRTYW1wbGUpXG4gICAgICBtZGF0U2FtcGxlLmJ1ZmZlci5wdXNoKGF2Y1NhbXBsZS5kYXRhKVxuICAgICAgbWRhdFNhbXBsZS5zaXplICs9IGF2Y1NhbXBsZS5kYXRhLmJ5dGVMZW5ndGhcblxuICAgICAgbGV0IHNhbXBsZUR1cmF0aW9uID0gMFxuICAgICAgaWYgKHNhbXBsZXMubGVuZ3RoID49IDEpIHtcbiAgICAgICAgY29uc3QgbmV4dER0cyA9IHNhbXBsZXNbMF0uZHRzIC0gdGhpcy5fZHRzQmFzZVxuICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IG5leHREdHMgLSBkdHNcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChtcDRTYW1wbGVzLmxlbmd0aCA+PSAxKSB7IC8vIGxhc3Rlc3Qgc2FtcGxlLCB1c2Ugc2Vjb25kIGxhc3QgZHVyYXRpb25cbiAgICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IG1wNFNhbXBsZXNbbXA0U2FtcGxlcy5sZW5ndGggLSAxXS5kdXJhdGlvblxuICAgICAgICB9IGVsc2UgeyAvLyB0aGUgb25seSBvbmUgc2FtcGxlLCB1c2UgcmVmZXJlbmNlIGR1cmF0aW9uXG4gICAgICAgICAgc2FtcGxlRHVyYXRpb24gPSB0aGlzLnZpZGVvTWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLnZpZGVvQWxsRHVyYXRpb24gKz0gc2FtcGxlRHVyYXRpb25cbiAgICAgIC8vIGNvbnNvbGUubG9nKGBkdHMgJHtkdHN9YCwgYHB0cyAke3B0c31gLCBgY3RzOiAke2N0c31gLCBgZHVyYXRpb246ICR7c2FtcGxlRHVyYXRpb259YCwgYXZjU2FtcGxlKVxuICAgICAgbXA0U2FtcGxlcy5wdXNoKHtcbiAgICAgICAgZHRzLFxuICAgICAgICBjdHMsXG4gICAgICAgIHB0cyxcbiAgICAgICAgZGF0YTogYXZjU2FtcGxlLmRhdGEsXG4gICAgICAgIHNpemU6IGF2Y1NhbXBsZS5kYXRhLmJ5dGVMZW5ndGgsXG4gICAgICAgIGlzS2V5ZnJhbWUsXG4gICAgICAgIGR1cmF0aW9uOiBzYW1wbGVEdXJhdGlvbixcbiAgICAgICAgZmxhZ3M6IHtcbiAgICAgICAgICBpc0xlYWRpbmc6IDAsXG4gICAgICAgICAgZGVwZW5kc09uOiBpc0tleWZyYW1lID8gMiA6IDEsXG4gICAgICAgICAgaXNEZXBlbmRlZE9uOiBpc0tleWZyYW1lID8gMSA6IDAsXG4gICAgICAgICAgaGFzUmVkdW5kYW5jeTogMCxcbiAgICAgICAgICBpc05vblN5bmM6IGlzS2V5ZnJhbWUgPyAwIDogMVxuICAgICAgICB9LFxuICAgICAgICBvcmlnaW5EdHM6IGR0cyxcbiAgICAgICAgdHlwZTogJ3ZpZGVvJ1xuICAgICAgfSlcbiAgICB9XG5cbiAgICBsZXQgbW9vZk1kYXQgPSBuZXcgQnVmZmVyKClcbiAgICBpZiAobXA0U2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IG1vb2YgPSBGbXA0Lm1vb2Yoe1xuICAgICAgICBpZDogdHJhY2subWV0YS5pZCxcbiAgICAgICAgdGltZTogZmlyc3REdHMsXG4gICAgICAgIHNhbXBsZXM6IG1wNFNhbXBsZXNcbiAgICAgIH0pXG4gICAgICBjb25zdCBtZGF0ID0gRm1wNC5tZGF0KG1kYXRCb3gpXG4gICAgICBtb29mTWRhdC53cml0ZShtb29mLCBtZGF0KVxuXG4gICAgICB0aGlzLndyaXRlVG9Tb3VyY2UoJ3ZpZGVvJywgbW9vZk1kYXQpXG4gICAgfVxuXG4gICAgaWYgKGluaXRTZWdtZW50KSB7XG4gICAgICB0aGlzLndyaXRlVG9Tb3VyY2UoJ3ZpZGVvJywgaW5pdFNlZ21lbnQpXG5cbiAgICAgIGlmIChzYW1wbGVzLmxlbmd0aCkge1xuICAgICAgICAvLyBzZWNvbmQgcGFydCBvZiBzdHJlYW0gY2hhbmdlXG4gICAgICAgIHRyYWNrLnNhbXBsZXMgPSBzYW1wbGVzO1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVtdXhWaWRlbyh0cmFjaylcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmlzRmlyc3RWaWRlbyA9IGZhbHNlXG4gICAgdGhpcy5lbWl0KFJFTVVYX0VWRU5UUy5NRURJQV9TRUdNRU5ULCAndmlkZW8nKVxuXG4gICAgY29uc3QgbGFzdFNhbXBsZSA9IG1wNFNhbXBsZXNbbXA0U2FtcGxlcy5sZW5ndGggLSAxXVxuICAgIHRoaXMuX3ZpZGVvTmV4dER0cyA9IGxhc3RTYW1wbGUuZHRzICsgbGFzdFNhbXBsZS5kdXJhdGlvbjtcbiAgICB0cmFjay5zYW1wbGVzID0gW11cbiAgICB0cmFjay5sZW5ndGggPSAwXG4gIH1cblxuICBfcmVtdXhBdWRpbyAodHJhY2spIHtcbiAgICBjb25zdCB7c2FtcGxlc30gPSB0cmFja1xuICAgIGxldCBmaXJzdER0cyA9IC0xXG4gICAgbGV0IG1wNFNhbXBsZXMgPSBbXVxuXG4gICAgbGV0IGluaXRTZWdtZW50ID0gbnVsbFxuICAgIGNvbnN0IG1kYXRCb3ggPSB7XG4gICAgICBzYW1wbGVzOiBbXVxuICAgIH1cbiAgICBpZiAoIXNhbXBsZXMgfHwgIXNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgbGV0IGlzRmlyc3REdHNJbml0ZWQgPSBmYWxzZVxuICAgIHdoaWxlIChzYW1wbGVzLmxlbmd0aCkge1xuICAgICAgbGV0IHNhbXBsZSA9IHNhbXBsZXMuc2hpZnQoKVxuICAgICAgY29uc3QgeyBkYXRhLCBvcHRpb25zIH0gPSBzYW1wbGVcbiAgICAgIGlmICghdGhpcy5pc0ZpcnN0QXVkaW8gJiYgb3B0aW9ucyAmJiBvcHRpb25zLm1ldGEpIHtcbiAgICAgICAgaW5pdFNlZ21lbnQgPSB0aGlzLnJlbXV4SW5pdFNlZ21lbnQoJ2F1ZGlvJywgb3B0aW9ucy5tZXRhKVxuICAgICAgICBvcHRpb25zLm1ldGEgPSBudWxsO1xuICAgICAgICBzYW1wbGVzLnVuc2hpZnQoc2FtcGxlKVxuICAgICAgICBpZiAoIW9wdGlvbnMuaXNDb250aW51ZSkge1xuICAgICAgICAgIHRoaXMucmVzZXREdHNCYXNlKClcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgbGV0IGR0cyA9IHNhbXBsZS5kdHMgLSB0aGlzLl9kdHNCYXNlXG4gICAgICBjb25zdCBvcmlnaW5EdHMgPSBkdHNcbiAgICAgIGlmICghaXNGaXJzdER0c0luaXRlZCkge1xuICAgICAgICBmaXJzdER0cyA9IGR0c1xuICAgICAgICBpc0ZpcnN0RHRzSW5pdGVkID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBsZXQgc2FtcGxlRHVyYXRpb24gPSAwXG5cbiAgICAgIGlmICh0aGlzLmF1ZGlvTWV0YS5yZWZTYW1wbGVEdXJhdGlvbkZpeGVkKSB7XG4gICAgICAgIHNhbXBsZUR1cmF0aW9uID0gdGhpcy5hdWRpb01ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZFxuICAgICAgfSBlbHNlIGlmIChzYW1wbGVzLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgIGNvbnN0IG5leHREdHMgPSBzYW1wbGVzWzBdLmR0cyAtIHRoaXMuX2R0c0Jhc2U7XG4gICAgICAgIHNhbXBsZUR1cmF0aW9uID0gbmV4dER0cyAtIGR0c1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG1wNFNhbXBsZXMubGVuZ3RoID49IDEpIHsgLy8gdXNlIHNlY29uZCBsYXN0IHNhbXBsZSBkdXJhdGlvblxuICAgICAgICAgIHNhbXBsZUR1cmF0aW9uID0gbXA0U2FtcGxlc1ttcDRTYW1wbGVzLmxlbmd0aCAtIDFdLmR1cmF0aW9uXG4gICAgICAgIH0gZWxzZSB7IC8vIHRoZSBvbmx5IG9uZSBzYW1wbGUsIHVzZSByZWZlcmVuY2Ugc2FtcGxlIGR1cmF0aW9uXG4gICAgICAgICAgc2FtcGxlRHVyYXRpb24gPSB0aGlzLmF1ZGlvTWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKCdyZW11eCBhdWRpbyAnLCBkdHMpXG4gICAgICB0aGlzLmF1ZGlvQWxsRHVyYXRpb24gKz0gc2FtcGxlRHVyYXRpb25cbiAgICAgIGNvbnN0IG1wNFNhbXBsZSA9IHtcbiAgICAgICAgZHRzLFxuICAgICAgICBwdHM6IGR0cyxcbiAgICAgICAgY3RzOiAwLFxuICAgICAgICBzaXplOiBkYXRhLmJ5dGVMZW5ndGgsXG4gICAgICAgIGR1cmF0aW9uOiBzYW1wbGUuZHVyYXRpb24gPyBzYW1wbGUuZHVyYXRpb24gOiBzYW1wbGVEdXJhdGlvbixcbiAgICAgICAgZmxhZ3M6IHtcbiAgICAgICAgICBpc0xlYWRpbmc6IDAsXG4gICAgICAgICAgZGVwZW5kc09uOiAyLFxuICAgICAgICAgIGlzRGVwZW5kZWRPbjogMSxcbiAgICAgICAgICBoYXNSZWR1bmRhbmN5OiAwLFxuICAgICAgICAgIGlzTm9uU3luYzogMFxuICAgICAgICB9LFxuICAgICAgICBpc0tleWZyYW1lOiB0cnVlLFxuICAgICAgICBvcmlnaW5EdHMsXG4gICAgICAgIHR5cGU6ICdhdWRpbydcbiAgICAgIH1cblxuICAgICAgbGV0IG1kYXRTYW1wbGUgPSB7XG4gICAgICAgIGJ1ZmZlcjogW10sXG4gICAgICAgIHNpemU6IDBcbiAgICAgIH1cbiAgICAgIG1kYXRTYW1wbGUuYnVmZmVyLnB1c2goZGF0YSlcbiAgICAgIG1kYXRTYW1wbGUuc2l6ZSArPSBkYXRhLmJ5dGVMZW5ndGhcblxuICAgICAgbWRhdEJveC5zYW1wbGVzLnB1c2gobWRhdFNhbXBsZSlcblxuICAgICAgbXA0U2FtcGxlcy5wdXNoKG1wNFNhbXBsZSlcbiAgICB9XG5cbiAgICBjb25zdCBtb29mTWRhdCA9IG5ldyBCdWZmZXIoKVxuXG4gICAgaWYgKG1wNFNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBtb29mID0gRm1wNC5tb29mKHtcbiAgICAgICAgaWQ6IHRyYWNrLm1ldGEuaWQsXG4gICAgICAgIHRpbWU6IGZpcnN0RHRzLFxuICAgICAgICBzYW1wbGVzOiBtcDRTYW1wbGVzXG4gICAgICB9KVxuICAgICAgY29uc3QgbWRhdCA9IEZtcDQubWRhdChtZGF0Qm94KVxuICAgICAgbW9vZk1kYXQud3JpdGUobW9vZiwgbWRhdClcblxuICAgICAgdGhpcy53cml0ZVRvU291cmNlKCdhdWRpbycsIG1vb2ZNZGF0KVxuICAgIH1cblxuICAgIGlmIChpbml0U2VnbWVudCkge1xuICAgICAgdGhpcy53cml0ZVRvU291cmNlKCdhdWRpbycsIGluaXRTZWdtZW50KVxuICAgICAgaWYgKHNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICAgIC8vIHNlY29uZCBwYXJ0IG9mIHN0cmVhbSBjaGFuZ2VcbiAgICAgICAgdHJhY2suc2FtcGxlcyA9IHNhbXBsZXM7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZW11eEF1ZGlvKHRyYWNrKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaXNGaXJzdEF1ZGlvID0gZmFsc2VcbiAgICB0aGlzLmVtaXQoUkVNVVhfRVZFTlRTLk1FRElBX1NFR01FTlQsICdhdWRpbycsIG1vb2ZNZGF0KVxuXG4gICAgY29uc3QgbGFzdFNhbXBsZSA9IG1wNFNhbXBsZXNbbXA0U2FtcGxlcy5sZW5ndGggLSAxXVxuICAgIHRoaXMuX3ZpZGVvTmV4dER0cyA9IGxhc3RTYW1wbGUuZHRzICsgbGFzdFNhbXBsZS5kdXJhdGlvbjtcbiAgICB0cmFjay5zYW1wbGVzID0gW11cbiAgICB0cmFjay5sZW5ndGggPSAwXG4gIH1cblxuICB3cml0ZVRvU291cmNlICh0eXBlLCBidWZmZXIpIHtcbiAgICBsZXQgcHJlc291cmNlYnVmZmVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnUFJFX1NPVVJDRV9CVUZGRVInKTtcbiAgICBsZXQgc291cmNlID0gcHJlc291cmNlYnVmZmVyLmdldFNvdXJjZSh0eXBlKTtcbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgc291cmNlID0gcHJlc291cmNlYnVmZmVyLmNyZWF0ZVNvdXJjZSh0eXBlKTtcbiAgICB9XG5cbiAgICBzb3VyY2UuZGF0YS5wdXNoKGJ1ZmZlcilcbiAgfVxuXG4gIGluaXRTaWxlbnRBdWRpbyAoZHRzLCBkdXJhdGlvbikge1xuICAgIGNvbnN0IHVuaXQgPSBNcDRSZW11eGVyLmdldFNpbGVudEZyYW1lKHRoaXMuYXVkaW9NZXRhLmNoYW5uZWxDb3VudClcbiAgICByZXR1cm4ge1xuICAgICAgZHRzLFxuICAgICAgcHRzOiBkdHMsXG4gICAgICBjdHM6IDAsXG4gICAgICBkdXJhdGlvbixcbiAgICAgIHVuaXQsXG4gICAgICBzaXplOiB1bml0LmJ5dGVMZW5ndGgsXG4gICAgICBvcmlnaW5EdHM6IGR0cyxcbiAgICAgIHR5cGU6ICd2aWRlbydcbiAgICB9XG4gIH1cblxuICBnZXQgdmlkZW9NZXRhICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJykudmlkZW9UcmFjay5tZXRhXG4gIH1cbiAgZ2V0IGF1ZGlvTWV0YSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpLmF1ZGlvVHJhY2subWV0YVxuICB9XG5cbiAgc3RhdGljIGdldFNpbGVudEZyYW1lIChjaGFubmVsQ291bnQpIHtcbiAgICBpZiAoY2hhbm5lbENvdW50ID09PSAxKSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjMsIDB4ODBdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSAyKSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MjEsIDB4MDAsIDB4NDksIDB4OTAsIDB4MDIsIDB4MTksIDB4MDAsIDB4MjMsIDB4ODBdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSAzKSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4OGVdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSA0KSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4ODAsIDB4MmMsIDB4ODAsIDB4MDgsIDB4MDIsIDB4MzhdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSA1KSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4ODIsIDB4MzAsIDB4MDQsIDB4OTksIDB4MDAsIDB4MjEsIDB4OTAsIDB4MDIsIDB4MzhdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSA2KSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4ODIsIDB4MzAsIDB4MDQsIDB4OTksIDB4MDAsIDB4MjEsIDB4OTAsIDB4MDIsIDB4MDAsIDB4YjIsIDB4MDAsIDB4MjAsIDB4MDgsIDB4ZTBdKVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgQ29udGV4dDogcmVxdWlyZSgnLi9zcmMvY29udGV4dCcpLmRlZmF1bHQsXG5cbiAgLy8gTW9kdWxlcyBmcm9tIGNvbnN0YW50c1xuICBFVkVOVFM6IHJlcXVpcmUoJy4vc3JjL2NvbnN0YW50cy9ldmVudHMnKS5kZWZhdWx0LFxuICBXT1JLRVJfQ09NTUFORFM6IHJlcXVpcmUoJy4vc3JjL2NvbnN0YW50cy93b3JrZXItY29tbWFuZHMnKS5kZWZhdWx0LFxuXG4gIC8vIE1vZHVsZXMgZnJvbSBlbnZcbiAgc25pZmZlcjogcmVxdWlyZSgnLi9zcmMvZW52L3NuaWZmZXInKS5kZWZhdWx0LFxuICBpc0xlOiByZXF1aXJlKCcuL3NyYy9lbnYvaXNsZScpLmRlZmF1bHQsXG4gIFVURjg6IHJlcXVpcmUoJy4vc3JjL2Vudi91dGY4JykuZGVmYXVsdCxcbiAgUGFnZVZpc2liaWxpdHk6IHJlcXVpcmUoJy4vc3JjL2Vudi9QYWdlVmlzaWJpbGl0eScpLmRlZmF1bHQsXG5cbiAgLy8gTW9kZWxzXG4gIE1lZGlhSW5mbzogcmVxdWlyZSgnLi9zcmMvbW9kZWxzL21lZGlhLWluZm8nKS5kZWZhdWx0LFxuICBNZWRpYVNhbXBsZTogcmVxdWlyZSgnLi9zcmMvbW9kZWxzL21lZGlhLXNhbXBsZScpLmRlZmF1bHQsXG4gIE1lZGlhU2VnbWVudDogcmVxdWlyZSgnLi9zcmMvbW9kZWxzL21lZGlhLXNlZ21lbnQnKS5kZWZhdWx0LFxuICBNZWRpYVNlZ21lbnRMaXN0OiByZXF1aXJlKCcuL3NyYy9tb2RlbHMvbWVkaWEtc2VnbWVudC1saXN0JykuZGVmYXVsdCxcbiAgQXVkaW9UcmFja01ldGE6IHJlcXVpcmUoJy4vc3JjL21vZGVscy90cmFjay1tZXRhJykuQXVkaW9UcmFja01ldGEsXG4gIFZpZGVvVHJhY2tNZXRhOiByZXF1aXJlKCcuL3NyYy9tb2RlbHMvdHJhY2stbWV0YScpLlZpZGVvVHJhY2tNZXRhLFxuICBBdWRpb1RyYWNrU2FtcGxlOiByZXF1aXJlKCcuL3NyYy9tb2RlbHMvdHJhY2stc2FtcGxlJykuQXVkaW9UcmFja1NhbXBsZSxcbiAgVmlkZW9UcmFja1NhbXBsZTogcmVxdWlyZSgnLi9zcmMvbW9kZWxzL3RyYWNrLXNhbXBsZScpLlZpZGVvVHJhY2tTYW1wbGUsXG5cbiAgLy8gTW9kdWxlcyBmcm9tIG1zZVxuICBNc2U6IHJlcXVpcmUoJy4vc3JjL21zZS9pbmRleCcpLmRlZmF1bHQsXG5cbiAgLy8gTW9kdWxlcyBmcm9tIHdyaXRlXG4gIFN0cmVhbTogcmVxdWlyZSgnLi9zcmMvd3JpdGUvc3RyZWFtJykuZGVmYXVsdCxcbiAgQnVmZmVyOiByZXF1aXJlKCcuL3NyYy93cml0ZS9idWZmZXInKS5kZWZhdWx0LFxuXG4gIE1vYmlsZVZpZGVvOiByZXF1aXJlKCcuL3NyYy9tb2JpbGUvbW9iaWxlLXZpZGVvJyksXG4gIC8vIENyeXB0b1xuICBDcnlwdG86IHJlcXVpcmUoJy4vc3JjL2NyeXB0bycpLmRlZmF1bHRcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKFJlc3VsdENvbnN0cnVjdG9yKSB7XG4gIHZhciB0b3RhbExlbmd0aCA9IDA7XG5cbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFycmF5cyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBhcnJheXNbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gYXJyYXlzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgdmFyIGFyciA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICB0b3RhbExlbmd0aCArPSBhcnIubGVuZ3RoO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybikge1xuICAgICAgICBfaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgcmVzdWx0ID0gbmV3IFJlc3VsdENvbnN0cnVjdG9yKHRvdGFsTGVuZ3RoKTtcbiAgdmFyIG9mZnNldCA9IDA7XG4gIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gIHZhciBfZGlkSXRlcmF0b3JFcnJvcjIgPSBmYWxzZTtcbiAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSBhcnJheXNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgIHZhciBfYXJyID0gX3N0ZXAyLnZhbHVlO1xuXG4gICAgICByZXN1bHQuc2V0KF9hcnIsIG9mZnNldCk7XG4gICAgICBvZmZzZXQgKz0gX2Fyci5sZW5ndGg7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyLnJldHVybikge1xuICAgICAgICBfaXRlcmF0b3IyLnJldHVybigpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfY29uY2F0ID0gcmVxdWlyZSgnLi9jb25jYXQnKTtcblxudmFyIF9jb25jYXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uY2F0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxubW9kdWxlLmV4cG9ydHMgPSBfY29uY2F0Mi5kZWZhdWx0OyIsImZ1bmN0aW9uIHdlYnBhY2tCb290c3RyYXBGdW5jIChtb2R1bGVzKSB7XG4vKioqKioqLyAgLy8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gIHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbi8qKioqKiovICAvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gIGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuLyoqKioqKi8gICAgLy8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyAgICBpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbi8qKioqKiovICAgICAgcmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbi8qKioqKiovICAgIC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyAgICB2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyAgICAgIGk6IG1vZHVsZUlkLFxuLyoqKioqKi8gICAgICBsOiBmYWxzZSxcbi8qKioqKiovICAgICAgZXhwb3J0czoge31cbi8qKioqKiovICAgIH07XG5cbi8qKioqKiovICAgIC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gICAgbW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbi8qKioqKiovICAgIC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbi8qKioqKiovICAgIG1vZHVsZS5sID0gdHJ1ZTtcblxuLyoqKioqKi8gICAgLy8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovICAgIHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovICB9XG5cbi8qKioqKiovICAvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbi8qKioqKiovICAvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gIF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbi8qKioqKiovICAvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4vKioqKioqLyAgX193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4vKioqKioqLyAgLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyAgX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4vKioqKioqLyAgICBpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4vKioqKioqLyAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4vKioqKioqLyAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbi8qKioqKiovICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuLyoqKioqKi8gICAgICAgIGdldDogZ2V0dGVyXG4vKioqKioqLyAgICAgIH0pO1xuLyoqKioqKi8gICAgfVxuLyoqKioqKi8gIH07XG5cbi8qKioqKiovICAvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4vKioqKioqLyAgX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuLyoqKioqKi8gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKioqKiovICB9O1xuXG4vKioqKioqLyAgLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbi8qKioqKiovICBfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbi8qKioqKiovICAgIHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuLyoqKioqKi8gICAgICBmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuLyoqKioqKi8gICAgICBmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuLyoqKioqKi8gICAgX193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuLyoqKioqKi8gICAgcmV0dXJuIGdldHRlcjtcbi8qKioqKiovICB9O1xuXG4vKioqKioqLyAgLy8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4vKioqKioqLyAgX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4vKioqKioqLyAgLy8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovICBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuLyoqKioqKi8gIC8vIG9uIGVycm9yIGZ1bmN0aW9uIGZvciBhc3luYyBsb2FkaW5nXG4vKioqKioqLyAgX193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuICB2YXIgZiA9IF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gRU5UUllfTU9EVUxFKVxuICByZXR1cm4gZi5kZWZhdWx0IHx8IGYgLy8gdHJ5IHRvIGNhbGwgZGVmYXVsdCBpZiBkZWZpbmVkIHRvIGFsc28gc3VwcG9ydCBiYWJlbCBlc21vZHVsZSBleHBvcnRzXG59XG5cbnZhciBtb2R1bGVOYW1lUmVxRXhwID0gJ1tcXFxcLnxcXFxcLXxcXFxcK3xcXFxcd3xcXC98QF0rJ1xudmFyIGRlcGVuZGVuY3lSZWdFeHAgPSAnXFxcXChcXFxccyooXFwvXFxcXCouKj9cXFxcKlxcLyk/XFxcXHMqLio/KCcgKyBtb2R1bGVOYW1lUmVxRXhwICsgJykuKj9cXFxcKScgLy8gYWRkaXRpb25hbCBjaGFycyB3aGVuIG91dHB1dC5wYXRoaW5mbyBpcyB0cnVlXG5cbi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI1OTM2NjEvMTMwNDQyXG5mdW5jdGlvbiBxdW90ZVJlZ0V4cCAoc3RyKSB7XG4gIHJldHVybiAoc3RyICsgJycpLnJlcGxhY2UoL1suPyorXiRbXFxdXFxcXCgpe318LV0vZywgJ1xcXFwkJicpXG59XG5cbmZ1bmN0aW9uIGlzTnVtZXJpYyhuKSB7XG4gIHJldHVybiAhaXNOYU4oMSAqIG4pOyAvLyAxICogbiBjb252ZXJ0cyBpbnRlZ2VycywgaW50ZWdlcnMgYXMgc3RyaW5nIChcIjEyM1wiKSwgMWUzIGFuZCBcIjFlM1wiIHRvIGludGVnZXJzIGFuZCBzdHJpbmdzIHRvIE5hTlxufVxuXG5mdW5jdGlvbiBnZXRNb2R1bGVEZXBlbmRlbmNpZXMgKHNvdXJjZXMsIG1vZHVsZSwgcXVldWVOYW1lKSB7XG4gIHZhciByZXR2YWwgPSB7fVxuICByZXR2YWxbcXVldWVOYW1lXSA9IFtdXG5cbiAgdmFyIGZuU3RyaW5nID0gbW9kdWxlLnRvU3RyaW5nKClcbiAgdmFyIHdyYXBwZXJTaWduYXR1cmUgPSBmblN0cmluZy5tYXRjaCgvXmZ1bmN0aW9uXFxzP1xcdypcXChcXHcrLFxccypcXHcrLFxccyooXFx3KylcXCkvKVxuICBpZiAoIXdyYXBwZXJTaWduYXR1cmUpIHJldHVybiByZXR2YWxcbiAgdmFyIHdlYnBhY2tSZXF1aXJlTmFtZSA9IHdyYXBwZXJTaWduYXR1cmVbMV1cblxuICAvLyBtYWluIGJ1bmRsZSBkZXBzXG4gIHZhciByZSA9IG5ldyBSZWdFeHAoJyhcXFxcXFxcXG58XFxcXFcpJyArIHF1b3RlUmVnRXhwKHdlYnBhY2tSZXF1aXJlTmFtZSkgKyBkZXBlbmRlbmN5UmVnRXhwLCAnZycpXG4gIHZhciBtYXRjaFxuICB3aGlsZSAoKG1hdGNoID0gcmUuZXhlYyhmblN0cmluZykpKSB7XG4gICAgaWYgKG1hdGNoWzNdID09PSAnZGxsLXJlZmVyZW5jZScpIGNvbnRpbnVlXG4gICAgcmV0dmFsW3F1ZXVlTmFtZV0ucHVzaChtYXRjaFszXSlcbiAgfVxuXG4gIC8vIGRsbCBkZXBzXG4gIHJlID0gbmV3IFJlZ0V4cCgnXFxcXCgnICsgcXVvdGVSZWdFeHAod2VicGFja1JlcXVpcmVOYW1lKSArICdcXFxcKFwiKGRsbC1yZWZlcmVuY2VcXFxccygnICsgbW9kdWxlTmFtZVJlcUV4cCArICcpKVwiXFxcXClcXFxcKScgKyBkZXBlbmRlbmN5UmVnRXhwLCAnZycpXG4gIHdoaWxlICgobWF0Y2ggPSByZS5leGVjKGZuU3RyaW5nKSkpIHtcbiAgICBpZiAoIXNvdXJjZXNbbWF0Y2hbMl1dKSB7XG4gICAgICByZXR2YWxbcXVldWVOYW1lXS5wdXNoKG1hdGNoWzFdKVxuICAgICAgc291cmNlc1ttYXRjaFsyXV0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKG1hdGNoWzFdKS5tXG4gICAgfVxuICAgIHJldHZhbFttYXRjaFsyXV0gPSByZXR2YWxbbWF0Y2hbMl1dIHx8IFtdXG4gICAgcmV0dmFsW21hdGNoWzJdXS5wdXNoKG1hdGNoWzRdKVxuICB9XG5cbiAgLy8gY29udmVydCAxZTMgYmFjayB0byAxMDAwIC0gdGhpcyBjYW4gYmUgaW1wb3J0YW50IGFmdGVyIHVnbGlmeS1qcyBjb252ZXJ0ZWQgMTAwMCB0byAxZTNcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhyZXR2YWwpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJldHZhbFtrZXlzW2ldXS5sZW5ndGg7IGorKykge1xuICAgICAgaWYgKGlzTnVtZXJpYyhyZXR2YWxba2V5c1tpXV1bal0pKSB7XG4gICAgICAgIHJldHZhbFtrZXlzW2ldXVtqXSA9IDEgKiByZXR2YWxba2V5c1tpXV1bal07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJldHZhbFxufVxuXG5mdW5jdGlvbiBoYXNWYWx1ZXNJblF1ZXVlcyAocXVldWVzKSB7XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMocXVldWVzKVxuICByZXR1cm4ga2V5cy5yZWR1Y2UoZnVuY3Rpb24gKGhhc1ZhbHVlcywga2V5KSB7XG4gICAgcmV0dXJuIGhhc1ZhbHVlcyB8fCBxdWV1ZXNba2V5XS5sZW5ndGggPiAwXG4gIH0sIGZhbHNlKVxufVxuXG5mdW5jdGlvbiBnZXRSZXF1aXJlZE1vZHVsZXMgKHNvdXJjZXMsIG1vZHVsZUlkKSB7XG4gIHZhciBtb2R1bGVzUXVldWUgPSB7XG4gICAgbWFpbjogW21vZHVsZUlkXVxuICB9XG4gIHZhciByZXF1aXJlZE1vZHVsZXMgPSB7XG4gICAgbWFpbjogW11cbiAgfVxuICB2YXIgc2Vlbk1vZHVsZXMgPSB7XG4gICAgbWFpbjoge31cbiAgfVxuXG4gIHdoaWxlIChoYXNWYWx1ZXNJblF1ZXVlcyhtb2R1bGVzUXVldWUpKSB7XG4gICAgdmFyIHF1ZXVlcyA9IE9iamVjdC5rZXlzKG1vZHVsZXNRdWV1ZSlcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHF1ZXVlTmFtZSA9IHF1ZXVlc1tpXVxuICAgICAgdmFyIHF1ZXVlID0gbW9kdWxlc1F1ZXVlW3F1ZXVlTmFtZV1cbiAgICAgIHZhciBtb2R1bGVUb0NoZWNrID0gcXVldWUucG9wKClcbiAgICAgIHNlZW5Nb2R1bGVzW3F1ZXVlTmFtZV0gPSBzZWVuTW9kdWxlc1txdWV1ZU5hbWVdIHx8IHt9XG4gICAgICBpZiAoc2Vlbk1vZHVsZXNbcXVldWVOYW1lXVttb2R1bGVUb0NoZWNrXSB8fCAhc291cmNlc1txdWV1ZU5hbWVdW21vZHVsZVRvQ2hlY2tdKSBjb250aW51ZVxuICAgICAgc2Vlbk1vZHVsZXNbcXVldWVOYW1lXVttb2R1bGVUb0NoZWNrXSA9IHRydWVcbiAgICAgIHJlcXVpcmVkTW9kdWxlc1txdWV1ZU5hbWVdID0gcmVxdWlyZWRNb2R1bGVzW3F1ZXVlTmFtZV0gfHwgW11cbiAgICAgIHJlcXVpcmVkTW9kdWxlc1txdWV1ZU5hbWVdLnB1c2gobW9kdWxlVG9DaGVjaylcbiAgICAgIHZhciBuZXdNb2R1bGVzID0gZ2V0TW9kdWxlRGVwZW5kZW5jaWVzKHNvdXJjZXMsIHNvdXJjZXNbcXVldWVOYW1lXVttb2R1bGVUb0NoZWNrXSwgcXVldWVOYW1lKVxuICAgICAgdmFyIG5ld01vZHVsZXNLZXlzID0gT2JqZWN0LmtleXMobmV3TW9kdWxlcylcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbmV3TW9kdWxlc0tleXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgbW9kdWxlc1F1ZXVlW25ld01vZHVsZXNLZXlzW2pdXSA9IG1vZHVsZXNRdWV1ZVtuZXdNb2R1bGVzS2V5c1tqXV0gfHwgW11cbiAgICAgICAgbW9kdWxlc1F1ZXVlW25ld01vZHVsZXNLZXlzW2pdXSA9IG1vZHVsZXNRdWV1ZVtuZXdNb2R1bGVzS2V5c1tqXV0uY29uY2F0KG5ld01vZHVsZXNbbmV3TW9kdWxlc0tleXNbal1dKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXF1aXJlZE1vZHVsZXNcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobW9kdWxlSWQsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgdmFyIHNvdXJjZXMgPSB7XG4gICAgbWFpbjogX193ZWJwYWNrX21vZHVsZXNfX1xuICB9XG5cbiAgdmFyIHJlcXVpcmVkTW9kdWxlcyA9IG9wdGlvbnMuYWxsID8geyBtYWluOiBPYmplY3Qua2V5cyhzb3VyY2VzLm1haW4pIH0gOiBnZXRSZXF1aXJlZE1vZHVsZXMoc291cmNlcywgbW9kdWxlSWQpXG5cbiAgdmFyIHNyYyA9ICcnXG5cbiAgT2JqZWN0LmtleXMocmVxdWlyZWRNb2R1bGVzKS5maWx0ZXIoZnVuY3Rpb24gKG0pIHsgcmV0dXJuIG0gIT09ICdtYWluJyB9KS5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGUpIHtcbiAgICB2YXIgZW50cnlNb2R1bGUgPSAwXG4gICAgd2hpbGUgKHJlcXVpcmVkTW9kdWxlc1ttb2R1bGVdW2VudHJ5TW9kdWxlXSkge1xuICAgICAgZW50cnlNb2R1bGUrK1xuICAgIH1cbiAgICByZXF1aXJlZE1vZHVsZXNbbW9kdWxlXS5wdXNoKGVudHJ5TW9kdWxlKVxuICAgIHNvdXJjZXNbbW9kdWxlXVtlbnRyeU1vZHVsZV0gPSAnKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykgeyBtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19yZXF1aXJlX187IH0pJ1xuICAgIHNyYyA9IHNyYyArICd2YXIgJyArIG1vZHVsZSArICcgPSAoJyArIHdlYnBhY2tCb290c3RyYXBGdW5jLnRvU3RyaW5nKCkucmVwbGFjZSgnRU5UUllfTU9EVUxFJywgSlNPTi5zdHJpbmdpZnkoZW50cnlNb2R1bGUpKSArICcpKHsnICsgcmVxdWlyZWRNb2R1bGVzW21vZHVsZV0ubWFwKGZ1bmN0aW9uIChpZCkgeyByZXR1cm4gJycgKyBKU09OLnN0cmluZ2lmeShpZCkgKyAnOiAnICsgc291cmNlc1ttb2R1bGVdW2lkXS50b1N0cmluZygpIH0pLmpvaW4oJywnKSArICd9KTtcXG4nXG4gIH0pXG5cbiAgc3JjID0gc3JjICsgJ25ldyAoKCcgKyB3ZWJwYWNrQm9vdHN0cmFwRnVuYy50b1N0cmluZygpLnJlcGxhY2UoJ0VOVFJZX01PRFVMRScsIEpTT04uc3RyaW5naWZ5KG1vZHVsZUlkKSkgKyAnKSh7JyArIHJlcXVpcmVkTW9kdWxlcy5tYWluLm1hcChmdW5jdGlvbiAoaWQpIHsgcmV0dXJuICcnICsgSlNPTi5zdHJpbmdpZnkoaWQpICsgJzogJyArIHNvdXJjZXMubWFpbltpZF0udG9TdHJpbmcoKSB9KS5qb2luKCcsJykgKyAnfSkpKHNlbGYpOydcblxuICB2YXIgYmxvYiA9IG5ldyB3aW5kb3cuQmxvYihbc3JjXSwgeyB0eXBlOiAndGV4dC9qYXZhc2NyaXB0JyB9KVxuICBpZiAob3B0aW9ucy5iYXJlKSB7IHJldHVybiBibG9iIH1cblxuICB2YXIgVVJMID0gd2luZG93LlVSTCB8fCB3aW5kb3cud2Via2l0VVJMIHx8IHdpbmRvdy5tb3pVUkwgfHwgd2luZG93Lm1zVVJMXG5cbiAgdmFyIHdvcmtlclVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYilcbiAgdmFyIHdvcmtlciA9IG5ldyB3aW5kb3cuV29ya2VyKHdvcmtlclVybClcbiAgd29ya2VyLm9iamVjdFVSTCA9IHdvcmtlclVybFxuXG4gIHJldHVybiB3b3JrZXJcbn1cbiIsImNvbnN0IExPQURFUl9FVkVOVFMgPSB7XG4gIExBREVSX1NUQVJUOiAnTE9BREVSX1NUQVJUJyxcbiAgTE9BREVSX0RBVEFMT0FERUQ6ICdMT0FERVJfREFUQUxPQURFRCcsXG4gIExPQURFUl9DT01QTEVURTogJ0xPQURFUl9DT01QTEVURScsXG4gIExPQURFUl9FUlJPUjogJ0xPQURFUl9FUlJPUidcbn1cblxuY29uc3QgREVNVVhfRVZFTlRTID0ge1xuICBERU1VWF9TVEFSVDogJ0RFTVVYX1NUQVJUJyxcbiAgREVNVVhfQ09NUExFVEU6ICdERU1VWF9DT01QTEVURScsXG4gIERFTVVYX0VSUk9SOiAnREVNVVhfRVJST1InLFxuICBNRVRBREFUQV9QQVJTRUQ6ICdNRVRBREFUQV9QQVJTRUQnLFxuICBWSURFT19NRVRBREFUQV9DSEFOR0U6ICdWSURFT19NRVRBREFUQV9DSEFOR0UnLFxuICBBVURJT19NRVRBREFUQV9DSEFOR0U6ICdBVURJT19NRVRBREFUQV9DSEFOR0UnLFxuICBNRURJQV9JTkZPOiAnTUVESUFfSU5GTydcbn1cblxuY29uc3QgUkVNVVhfRVZFTlRTID0ge1xuICBSRU1VWF9NRVRBREFUQTogJ1JFTVVYX01FVEFEQVRBJyxcbiAgUkVNVVhfTUVESUE6ICdSRU1VWF9NRURJQScsXG4gIE1FRElBX1NFR01FTlQ6ICdNRURJQV9TRUdNRU5UJyxcbiAgUkVNVVhfRVJST1I6ICdSRU1VWF9FUlJPUicsXG4gIElOSVRfU0VHTUVOVDogJ0lOSVRfU0VHTUVOVCcsXG4gIERFVEVDVF9DSEFOR0VfU1RSRUFNOiAnREVURUNUX0NIQU5HRV9TVFJFQU0nXG59XG5cbmNvbnN0IE1TRV9FVkVOVFMgPSB7XG4gIFNPVVJDRV9VUERBVEVfRU5EOiAnU09VUkNFX1VQREFURV9FTkQnXG59XG5cbi8vIGhsc+S4k+aciWV2ZW50c1xuY29uc3QgSExTX0VWRU5UUyA9IHtcbiAgUkVUUllfVElNRV9FWENFRURFRDogJ1JFVFJZX1RJTUVfRVhDRUVERUQnXG59XG5cbmNvbnN0IENSWVRPX0VWRU5UUyA9IHtcbiAgU1RBUlRfREVDUllQVDogJ1NUQVJUX0RFQ1JZUFQnLFxuICBERUNSWVBURUQ6ICdERUNSWVBURUQnXG59XG5cbmNvbnN0IEJST1dTRVJfRVZFTlRTID0ge1xuICBWSVNJQklMSVRZX0NIQU5HRTogJ1ZJU0lCSUxJVFlfQ0hBTkdFJ1xufVxuXG5jb25zdCBBTExFVkVOVFMgPSBPYmplY3QuYXNzaWduKHt9LCBMT0FERVJfRVZFTlRTLCBERU1VWF9FVkVOVFMsIFJFTVVYX0VWRU5UUywgTVNFX0VWRU5UUywgSExTX0VWRU5UUywgQlJPV1NFUl9FVkVOVFMpXG5cbmNvbnN0IEZsdkFsbG93ZWRFdmVudHMgPSBbXVxuY29uc3QgSGxzQWxsb3dlZEV2ZW50cyA9IFtdXG5cbmZvciAobGV0IGtleSBpbiBBTExFVkVOVFMpIHtcbiAgaWYgKEFMTEVWRU5UUy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgRmx2QWxsb3dlZEV2ZW50cy5wdXNoKEFMTEVWRU5UU1trZXldKVxuICB9XG59XG5cbmZvciAobGV0IGtleSBpbiBBTExFVkVOVFMpIHtcbiAgaWYgKEFMTEVWRU5UUy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgSGxzQWxsb3dlZEV2ZW50cy5wdXNoKEFMTEVWRU5UU1trZXldKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgQUxMRVZFTlRTLFxuICBITFNfRVZFTlRTLFxuICBSRU1VWF9FVkVOVFMsXG4gIERFTVVYX0VWRU5UUyxcbiAgTVNFX0VWRU5UUyxcbiAgTE9BREVSX0VWRU5UUyxcbiAgRmx2QWxsb3dlZEV2ZW50cyxcbiAgSGxzQWxsb3dlZEV2ZW50cyxcbiAgQ1JZVE9fRVZFTlRTLFxuICBCUk9XU0VSX0VWRU5UU1xufTtcbiIsImV4cG9ydCBjb25zdCBDT05URVhUX0NPTU9NQU5EUyA9IHtcbiAgT046ICdvbicsXG4gIE9OQ0U6ICdvbmNlJyxcbiAgT0ZGOiAnb2ZmJyxcbiAgRU1JVDogJ2VtaXQnLFxuICBERVNUUk9ZOiAnZGVzdHJveSdcbn1cbiIsImltcG9ydCBNZWRpYUluZm8gZnJvbSAnLi9tb2RlbHMvbWVkaWEtaW5mbydcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2V2ZW50cydcblxuY29uc3QgRElSRUNUX0VNSVRfRkxBRyA9ICdfX1RPX18nXG5cbmNsYXNzIENvbnRleHQge1xuICBjb25zdHJ1Y3RvciAoYWxsb3dlZEV2ZW50cyA9IFtdKSB7XG4gICAgdGhpcy5fZW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKVxuICAgIHRoaXMuX2luc3RhbmNlTWFwID0ge30gLy8g5omA5pyJ55qE6Kej56CB5rWB56iL5a6e5L6LXG4gICAgdGhpcy5fY2xzTWFwID0ge30gLy8g5p6E6YCg5Ye95pWw55qEbWFwXG4gICAgdGhpcy5faW5pdGVkID0gZmFsc2VcbiAgICB0aGlzLm1lZGlhSW5mbyA9IG5ldyBNZWRpYUluZm8oKVxuICAgIHRoaXMuYWxsb3dlZEV2ZW50cyA9IGFsbG93ZWRFdmVudHNcbiAgICB0aGlzLl9ob29rcyA9IHt9IC8vIOazqOWGjOWcqOS6i+S7tuWJjS/lkI7nmoTpkqnlrZDvvIzkvovlpoIgYmVmb3JlKCdERU1VWF9DT01QTEVURScpXG4gIH1cblxuICAvKipcbiAgICog5LuO5LiK5LiL5paH5Lit6I635Y+W6Kej56CB5rWB56iL5a6e5L6L77yM5aaC5p6c5rKh5pyJ5a6e5L6L77yM5p6E6YCg5LiA5LiqXG4gICAqIEBwYXJhbSB0YWdcbiAgICogQHBhcmFtIGFyZ3NcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBnZXRJbnN0YW5jZSAodGFnKSB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSB0aGlzLl9pbnN0YW5jZU1hcFt0YWddXG4gICAgaWYgKGluc3RhbmNlKSB7XG4gICAgICByZXR1cm4gaW5zdGFuY2VcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdGhyb3cgbmV3IEVycm9yKGAke3RhZ33lrp7kvovlsJrmnKrliJ3lp4vljJZgKVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog5Yid5aeL5YyW5YW35L2T5a6e5L6LXG4gICAqIEBwYXJhbSB0YWdcbiAgICogQHBhcmFtIGFyZ3NcbiAgICovXG4gIGluaXRJbnN0YW5jZSAodGFnLCAuLi5hcmdzKSB7XG4gICAgaWYgKHRoaXMuX2Nsc01hcFt0YWddKSB7XG4gICAgICBjb25zdCBuZXdJbnN0YW5jZSA9IG5ldyB0aGlzLl9jbHNNYXBbdGFnXSguLi5hcmdzKVxuICAgICAgdGhpcy5faW5zdGFuY2VNYXBbdGFnXSA9IG5ld0luc3RhbmNlXG4gICAgICBpZiAobmV3SW5zdGFuY2UuaW5pdCkge1xuICAgICAgICBuZXdJbnN0YW5jZS5pbml0KCkgLy8gVE9ETzogbGlmZWNpcmNsZVxuICAgICAgfVxuICAgICAgcmV0dXJuIG5ld0luc3RhbmNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHt0YWd95pyq5ZyoY29udGV4dOS4reazqOWGjGApXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOmBv+WFjeWkp+mHj+eahGluaXRJbnN0YW5jZeiwg+eUqO+8jOWIneWni+WMluaJgOacieeahOe7hOS7tlxuICAgKiBAcGFyYW0gY29uZmlnXG4gICAqL1xuICBpbml0IChjb25maWcpIHtcbiAgICBpZiAodGhpcy5faW5pdGVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgZm9yIChsZXQgdGFnIGluIHRoaXMuX2Nsc01hcCkge1xuICAgICAgLy8gaWYgbm90IGluaXRlZCwgaW5pdCBhbiBpbnN0YW5jZVxuICAgICAgaWYgKHRoaXMuX2Nsc01hcC5oYXNPd25Qcm9wZXJ0eSh0YWcpICYmICF0aGlzLl9pbnN0YW5jZU1hcFt0YWddKSB7XG4gICAgICAgIHRoaXMuaW5pdEluc3RhbmNlKHRhZywgY29uZmlnKVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9pbml0ZWQgPSB0cnVlXG4gIH1cblxuICAvKipcbiAgICog5rOo5YaM5LiA5Liq5LiK5LiL5paH5rWB56iL77yM5o+Q5L6b5a6J5YWo55qE5LqL5Lu25Y+R6YCB5py65Yi2XG4gICAqIEBwYXJhbSB0YWdcbiAgICogQHBhcmFtIGNsc1xuICAgKi9cbiAgcmVnaXN0cnkgKHRhZywgY2xzKSB7XG4gICAgY29uc3QgZW1pdHRlciA9IHRoaXMuX2VtaXR0ZXJcbiAgICBjb25zdCBjaGVja01lc3NhZ2VOYW1lID0gdGhpcy5faXNNZXNzYWdlTmFtZVZhbGlkLmJpbmQodGhpcylcbiAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgIGNvbnN0IGVuaGFuY2VkID0gY2xhc3MgZXh0ZW5kcyBjbHMge1xuICAgICAgY29uc3RydWN0b3IgKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncylcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSB7fVxuICAgICAgICB0aGlzLm9uY2VMaXN0ZW5lcnMgPSB7fVxuICAgICAgICB0aGlzLlRBRyA9IHRhZ1xuICAgICAgICB0aGlzLl9jb250ZXh0ID0gc2VsZlxuICAgICAgfVxuXG4gICAgICBvbiAobWVzc2FnZU5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNoZWNrTWVzc2FnZU5hbWUobWVzc2FnZU5hbWUpXG5cbiAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJzW21lc3NhZ2VOYW1lXSkge1xuICAgICAgICAgIHRoaXMubGlzdGVuZXJzW21lc3NhZ2VOYW1lXS5wdXNoKGNhbGxiYWNrKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubGlzdGVuZXJzW21lc3NhZ2VOYW1lXSA9IFtjYWxsYmFja11cbiAgICAgICAgfVxuXG4gICAgICAgIGVtaXR0ZXIub24oYCR7bWVzc2FnZU5hbWV9JHtESVJFQ1RfRU1JVF9GTEFHfSR7dGFnfWAsIGNhbGxiYWNrKSAvLyDlu7rnq4vlrprlkJHpgJrkv6Hnm5HlkKxcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXIub24obWVzc2FnZU5hbWUsIGNhbGxiYWNrKVxuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIOWcqOafkOS4quS6i+S7tuinpuWPkeWJjeaJp+ihjFxuICAgICAgICogQHBhcmFtIG1lc3NhZ2VOYW1lXG4gICAgICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICAgICAqL1xuICAgICAgYmVmb3JlIChtZXNzYWdlTmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgY2hlY2tNZXNzYWdlTmFtZShtZXNzYWdlTmFtZSlcbiAgICAgICAgaWYgKHNlbGYuX2hvb2tzW21lc3NhZ2VOYW1lXSkge1xuICAgICAgICAgIHNlbGYuX2hvb2tzW21lc3NhZ2VOYW1lXS5wdXNoKGNhbGxiYWNrKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGYuX2hvb2tzW21lc3NhZ2VOYW1lXSA9IFtjYWxsYmFja11cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBvbmNlIChtZXNzYWdlTmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgY2hlY2tNZXNzYWdlTmFtZShtZXNzYWdlTmFtZSlcblxuICAgICAgICBpZiAodGhpcy5vbmNlTGlzdGVuZXJzW21lc3NhZ2VOYW1lXSkge1xuICAgICAgICAgIHRoaXMub25jZUxpc3RlbmVyc1ttZXNzYWdlTmFtZV0ucHVzaChjYWxsYmFjaylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm9uY2VMaXN0ZW5lcnNbbWVzc2FnZU5hbWVdID0gW2NhbGxiYWNrXVxuICAgICAgICB9XG5cbiAgICAgICAgZW1pdHRlci5vbmNlKGAke21lc3NhZ2VOYW1lfSR7RElSRUNUX0VNSVRfRkxBR30ke3RhZ31gLCBjYWxsYmFjaylcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXIub25jZShtZXNzYWdlTmFtZSwgY2FsbGJhY2spXG4gICAgICB9XG5cbiAgICAgIGVtaXQgKG1lc3NhZ2VOYW1lLCAuLi5hcmdzKSB7XG4gICAgICAgIGNoZWNrTWVzc2FnZU5hbWUobWVzc2FnZU5hbWUpXG5cbiAgICAgICAgY29uc3QgYmVmb3JlTGlzdCA9IHNlbGYuX2hvb2tzID8gc2VsZi5faG9va3NbbWVzc2FnZU5hbWVdIDogbnVsbFxuXG4gICAgICAgIGlmIChiZWZvcmVMaXN0KSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGJlZm9yZUxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrID0gYmVmb3JlTGlzdFtpXVxuICAgICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZW1pdHRlci5lbWl0KG1lc3NhZ2VOYW1lLCAuLi5hcmdzKVxuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIOWumuWQkeWPkemAgee7meafkOS4que7hOS7tuWNleS+i+eahOa2iOaBr1xuICAgICAgICogQHBhcmFtIG1lc3NhZ2VOYW1lXG4gICAgICAgKiBAcGFyYW0gYXJnc1xuICAgICAgICovXG4gICAgICBlbWl0VG8gKHRhZywgbWVzc2FnZU5hbWUsIC4uLmFyZ3MpIHtcbiAgICAgICAgY2hlY2tNZXNzYWdlTmFtZShtZXNzYWdlTmFtZSlcblxuICAgICAgICByZXR1cm4gZW1pdHRlci5lbWl0KGAke21lc3NhZ2VOYW1lfSR7RElSRUNUX0VNSVRfRkxBR30ke3RhZ31gLCAuLi5hcmdzKVxuICAgICAgfVxuXG4gICAgICBvZmYgKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaykge1xuICAgICAgICBjaGVja01lc3NhZ2VOYW1lKG1lc3NhZ2VOYW1lKVxuICAgICAgICByZXR1cm4gZW1pdHRlci5vZmYobWVzc2FnZU5hbWUsIGNhbGxiYWNrKVxuICAgICAgfVxuXG4gICAgICByZW1vdmVMaXN0ZW5lcnMgKCkge1xuICAgICAgICBjb25zdCBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmJpbmQodGhpcy5saXN0ZW5lcnMpXG5cbiAgICAgICAgZm9yIChsZXQgbWVzc2FnZU5hbWUgaW4gdGhpcy5saXN0ZW5lcnMpIHtcbiAgICAgICAgICBpZiAoaGFzT3duKG1lc3NhZ2VOYW1lKSkge1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5saXN0ZW5lcnNbbWVzc2FnZU5hbWVdIHx8IFtdXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IGNhbGxiYWNrc1tpXVxuICAgICAgICAgICAgICBlbWl0dGVyLm9mZihtZXNzYWdlTmFtZSwgY2FsbGJhY2spXG4gICAgICAgICAgICAgIGVtaXR0ZXIub2ZmKGAke21lc3NhZ2VOYW1lfSR7RElSRUNUX0VNSVRfRkxBR30ke3RhZ31gLCBjYWxsYmFjaylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBtZXNzYWdlTmFtZSBpbiB0aGlzLm9uY2VMaXN0ZW5lcnMpIHtcbiAgICAgICAgICBpZiAoaGFzT3duKG1lc3NhZ2VOYW1lKSkge1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gdGhpcy5vbmNlTGlzdGVuZXJzW21lc3NhZ2VOYW1lXSB8fCBbXVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSBjYWxsYmFja3NbaV1cbiAgICAgICAgICAgICAgZW1pdHRlci5vZmYobWVzc2FnZU5hbWUsIGNhbGxiYWNrKVxuICAgICAgICAgICAgICBlbWl0dGVyLm9mZihgJHttZXNzYWdlTmFtZX0ke0RJUkVDVF9FTUlUX0ZMQUd9JHt0YWd9YCwgY2FsbGJhY2spXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICog5Zyo57uE5Lu26ZSA5q+B5pe277yM6buY6K6k5bCG5a6D5rOo5YaM55qE5LqL5Lu25YWo6YOo5Y246L2977yM56Gu5L+d5LiN5Lya6YCg5oiQ5YaF5a2Y5rOE5ryPXG4gICAgICAgKi9cbiAgICAgIGRlc3Ryb3kgKCkge1xuICAgICAgICAvLyBzdGVwMSB1bmxpc3RlbiBldmVudHNcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcnMoKVxuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHt9XG5cbiAgICAgICAgLy8gc3RlcDIgcmVsZWFzZSBmcm9tIGNvbnRleHRcbiAgICAgICAgZGVsZXRlIHNlbGYuX2luc3RhbmNlTWFwW3RhZ11cbiAgICAgICAgaWYgKHN1cGVyLmRlc3Ryb3kpIHtcbiAgICAgICAgICByZXR1cm4gc3VwZXIuZGVzdHJveSgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fY2xzTWFwW3RhZ10gPSBlbmhhbmNlZFxuXG4gICAgLyoqXG4gICAgICogZ2V0IGluc3RhbmNlIGltbWVkaWF0ZWx5XG4gICAgICogZS5nIGNvbnN0IGluc3RhbmNlID0gY29udGV4dC5yZWdpc3RyeSh0YWcsIENscykoY29uZmlnKVxuICAgICAqICovXG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5pbml0SW5zdGFuY2UodGFnLCAuLi5hcmdzKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDlr7nlrZjlnKjnmoTlrp7kvovov5vooYxcbiAgICovXG4gIGRlc3Ryb3lJbnN0YW5jZXMgKCkge1xuICAgIE9iamVjdC5rZXlzKHRoaXMuX2luc3RhbmNlTWFwKS5mb3JFYWNoKCh0YWcpID0+IHtcbiAgICAgIGlmICh0aGlzLl9pbnN0YW5jZU1hcFt0YWddLmRlc3Ryb3kpIHtcbiAgICAgICAgdGhpcy5faW5zdGFuY2VNYXBbdGFnXS5kZXN0cm95KClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIOe8luino+eggea1geeoi+aXoOmcgOWFs+azqOS6i+S7tueahOino+e7kVxuICAgKi9cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5fZW1pdHRlciA9IG51bGxcbiAgICB0aGlzLmFsbG93ZWRFdmVudHMgPSBbXVxuICAgIHRoaXMuX2Nsc01hcCA9IG51bGxcbiAgICB0aGlzLl9jb250ZXh0ID0gbnVsbFxuICAgIHRoaXMuX2hvb2tzID0gbnVsbFxuICAgIHRoaXMuZGVzdHJveUluc3RhbmNlcygpXG4gIH1cblxuICAvKipcbiAgICog5a+55L+h6YGT6L+b6KGM5pS25ouiXG4gICAqIEBwYXJhbSBtZXNzYWdlTmFtZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2lzTWVzc2FnZU5hbWVWYWxpZCAobWVzc2FnZU5hbWUpIHtcbiAgICBpZiAoIXRoaXMuYWxsb3dlZEV2ZW50cy5pbmRleE9mKG1lc3NhZ2VOYW1lKSA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5yZWdpc3RlcmVkIG1lc3NhZ2UgbmFtZTogJHttZXNzYWdlTmFtZX1gKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb250ZXh0XG4iLCJpbXBvcnQgRVZFTlRTIGZyb20gJy4uL2NvbnN0YW50cy9ldmVudHMnO1xuY29uc3QgQ1JZVE9fRVZFTlRTID0gRVZFTlRTLkNSWVRPX0VWRU5UU1xuY2xhc3MgQ3J5cHRvIHtcbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgdGhpcy5pbnB1dEJ1ZmZlciA9IGNvbmZpZy5pbnB1dGJ1ZmZlcjtcbiAgICAgICAgdGhpcy5vdXRwdXRCdWZmZXIgPSBjb25maWcub3V0cHV0YnVmZmVyO1xuICAgICAgICB0aGlzLmtleSA9IGNvbmZpZy5rZXk7XG4gICAgICAgIHRoaXMuaXYgPSBjb25maWcuaXY7XG4gICAgICAgIHRoaXMubWV0aG9kID0gY29uZmlnLm1ldGhvZDtcblxuICAgICAgICB0aGlzLmNyeXB0byA9ICB3aW5kb3cuY3J5cHRvIHx8IHdpbmRvdy5tc0NyeXB0b1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMub24oQ1JZVE9fRVZFTlRTLlNUQVJUX0RFQ1JZUFQsIHRoaXMuZGVjcmlwdC5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgXG4gICAgZGVjcmlwdCgpIHtcbiAgICAgICAgaWYoIXRoaXMuYWVza2V5KSB7XG4gICAgICAgICAgICBsZXQgc2JrZXkgPSB0aGlzLmNyeXB0by5zdWJ0bGUuaW1wb3J0S2V5KCdyYXcnLCB0aGlzLmtleS5idWZmZXIsIHsgbmFtZTogJ0FFUy1DQkMnIH0sIGZhbHNlLCBbJ2VuY3J5cHQnLCAnZGVjcnlwdCddKTtcbiAgICAgICAgICAgIHNia2V5LnRoZW4oa2V5ID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmFlc2tleSA9IGtleTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlY3JpcHREYXRhKCk7XG4gICAgICAgICAgICB9KSBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGVjcmlwdERhdGEoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlY3JpcHREYXRhKCkge1xuICAgICAgICBsZXQgaW5wdXRidWZmZXIgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKHRoaXMuaW5wdXRCdWZmZXIpO1xuICAgICAgICBsZXQgb3V0cHV0YnVmZmVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSh0aGlzLm91dHB1dEJ1ZmZlcik7XG4gICAgICAgIGxldCBkYXRhID0gaW5wdXRidWZmZXIuc2hpZnQoKTtcbiAgICAgICAgaWYoZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5jcnlwdG8uc3VidGxlLmRlY3J5cHQoeyBuYW1lOiAnQUVTLUNCQycsIGl2OiB0aGlzLml2LmJ1ZmZlciB9LCB0aGlzLmFlc2tleSwgZGF0YSkudGhlbihyZXM9PntcbiAgICAgICAgICAgICAgICBvdXRwdXRidWZmZXIucHVzaChuZXcgVWludDhBcnJheShyZXMpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoQ1JZVE9fRVZFTlRTLkRFQ1JZUFRFRCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWNyaXB0RGF0YShkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQ3J5cHRvOyIsImNvbnN0IGxlID0gKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgYnVmID0gbmV3IEFycmF5QnVmZmVyKDIpO1xuICAobmV3IERhdGFWaWV3KGJ1ZikpLnNldEludDE2KDAsIDI1NiwgdHJ1ZSkgLy8gbGl0dGxlLWVuZGlhbiB3cml0ZVxuICByZXR1cm4gKG5ldyBJbnQxNkFycmF5KGJ1ZikpWzBdID09PSAyNTYgLy8gcGxhdGZvcm0tc3BlYyByZWFkLCBpZiBlcXVhbCB0aGVuIExFXG59KSgpXG5cbmV4cG9ydCBkZWZhdWx0IGxlXG4iLCJjb25zdCBsZSA9IChmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcigyKTtcbiAgKG5ldyBEYXRhVmlldyhidWYpKS5zZXRJbnQxNigwLCAyNTYsIHRydWUpIC8vIGxpdHRsZS1lbmRpYW4gd3JpdGVcbiAgcmV0dXJuIChuZXcgSW50MTZBcnJheShidWYpKVswXSA9PT0gMjU2IC8vIHBsYXRmb3JtLXNwZWMgcmVhZCwgaWYgZXF1YWwgdGhlbiBMRVxufSkoKVxuXG5jb25zdCBzbmlmZmVyID0ge1xuICBnZXQgZGV2aWNlICgpIHtcbiAgICBsZXQgciA9IHNuaWZmZXIub3M7XG4gICAgcmV0dXJuIHIuaXNQYyA/ICdwYycgOiByLmlzVGFibGV0ID8gJ3RhYmxldCcgOiAnbW9iaWxlJztcbiAgfSxcbiAgZ2V0IGJyb3dzZXIgKCkge1xuICAgIGxldCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbiAgICBsZXQgcmVnID0ge1xuICAgICAgaWU6IC9ydjooW1xcZC5dKylcXCkgbGlrZSBnZWNrby8sXG4gICAgICBmaXJmb3g6IC9maXJlZm94XFwvKFtcXGQuXSspLyxcbiAgICAgIGNocm9tZTogL2Nocm9tZVxcLyhbXFxkLl0rKS8sXG4gICAgICBvcGVyYTogL29wZXJhLihbXFxkLl0rKS8sXG4gICAgICBzYWZhcmk6IC92ZXJzaW9uXFwvKFtcXGQuXSspLipzYWZhcmkvXG4gICAgfTtcbiAgICByZXR1cm4gW10uY29uY2F0KE9iamVjdC5rZXlzKHJlZykuZmlsdGVyKGtleSA9PiByZWdba2V5XS50ZXN0KHVhKSkpWzBdO1xuICB9LFxuICBnZXQgb3MgKCkge1xuICAgIGxldCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnRcbiAgICBsZXQgaXNXaW5kb3dzUGhvbmUgPSAvKD86V2luZG93cyBQaG9uZSkvLnRlc3QodWEpXG4gICAgbGV0IGlzU3ltYmlhbiA9IC8oPzpTeW1iaWFuT1MpLy50ZXN0KHVhKSB8fCBpc1dpbmRvd3NQaG9uZTtcbiAgICBsZXQgaXNBbmRyb2lkID0gLyg/OkFuZHJvaWQpLy50ZXN0KHVhKTtcbiAgICBsZXQgaXNGaXJlRm94ID0gLyg/OkZpcmVmb3gpLy50ZXN0KHVhKTtcbiAgICBsZXQgaXNUYWJsZXQgPSAvKD86aVBhZHxQbGF5Qm9vaykvLnRlc3QodWEpIHx8IChpc0FuZHJvaWQgJiYgIS8oPzpNb2JpbGUpLy50ZXN0KHVhKSkgfHwgKGlzRmlyZUZveCAmJiAvKD86VGFibGV0KS8udGVzdCh1YSkpO1xuICAgIGxldCBpc1Bob25lID0gLyg/OmlQaG9uZSkvLnRlc3QodWEpICYmICFpc1RhYmxldDtcbiAgICBsZXQgaXNQYyA9ICFpc1Bob25lICYmICFpc0FuZHJvaWQgJiYgIWlzU3ltYmlhbjtcbiAgICByZXR1cm4ge1xuICAgICAgaXNUYWJsZXQsXG4gICAgICBpc1Bob25lLFxuICAgICAgaXNBbmRyb2lkLFxuICAgICAgaXNQYyxcbiAgICAgIGlzU3ltYmlhbixcbiAgICAgIGlzV2luZG93c1Bob25lLFxuICAgICAgaXNGaXJlRm94XG4gICAgfTtcbiAgfSxcblxuICBnZXQgaXNMZSAoKSB7XG4gICAgcmV0dXJuIGxlXG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNuaWZmZXI7XG4iLCJjbGFzcyBVVEY4IHtcbiAgc3RhdGljIGRlY29kZSAodWludDhhcnJheSkge1xuICAgIGNvbnN0IG91dCA9IFtdO1xuICAgIGNvbnN0IGlucHV0ID0gdWludDhhcnJheTtcbiAgICBsZXQgaSA9IDA7XG4gICAgY29uc3QgbGVuZ3RoID0gdWludDhhcnJheS5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaSA8IGxlbmd0aCkge1xuICAgICAgaWYgKGlucHV0W2ldIDwgMHg4MCkge1xuICAgICAgICBvdXQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGlucHV0W2ldKSk7XG4gICAgICAgICsraTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9IGVsc2UgaWYgKGlucHV0W2ldIDwgMHhDMCkge1xuICAgICAgICAvLyBmYWxsdGhyb3VnaFxuICAgICAgfSBlbHNlIGlmIChpbnB1dFtpXSA8IDB4RTApIHtcbiAgICAgICAgaWYgKFVURjguX2NoZWNrQ29udGludWF0aW9uKGlucHV0LCBpLCAxKSkge1xuICAgICAgICAgIGNvbnN0IHVjczQgPSAoaW5wdXRbaV0gJiAweDFGKSA8PCA2IHwgKGlucHV0W2kgKyAxXSAmIDB4M0YpO1xuICAgICAgICAgIGlmICh1Y3M0ID49IDB4ODApIHtcbiAgICAgICAgICAgIG91dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUodWNzNCAmIDB4RkZGRikpO1xuICAgICAgICAgICAgaSArPSAyO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGlucHV0W2ldIDwgMHhGMCkge1xuICAgICAgICBpZiAoVVRGOC5fY2hlY2tDb250aW51YXRpb24oaW5wdXQsIGksIDIpKSB7XG4gICAgICAgICAgY29uc3QgdWNzNCA9IChpbnB1dFtpXSAmIDB4RikgPDwgMTIgfCAoaW5wdXRbaSArIDFdICYgMHgzRikgPDwgNiB8IGlucHV0W2kgKyAyXSAmIDB4M0Y7XG4gICAgICAgICAgaWYgKHVjczQgPj0gMHg4MDAgJiYgKHVjczQgJiAweEY4MDApICE9PSAweEQ4MDApIHtcbiAgICAgICAgICAgIG91dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUodWNzNCAmIDB4RkZGRikpO1xuICAgICAgICAgICAgaSArPSAzO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGlucHV0W2ldIDwgMHhGOCkge1xuICAgICAgICBpZiAoVVRGOC5fY2hlY2tDb250aW51YXRpb24oaW5wdXQsIGksIDMpKSB7XG4gICAgICAgICAgbGV0IHVjczQgPSAoaW5wdXRbaV0gJiAweDcpIDw8IDE4IHwgKGlucHV0W2kgKyAxXSAmIDB4M0YpIDw8IDEyIHxcbiAgICAgICAgICAgICAgICAgICAgKGlucHV0W2kgKyAyXSAmIDB4M0YpIDw8IDYgfCAoaW5wdXRbaSArIDNdICYgMHgzRik7XG4gICAgICAgICAgaWYgKHVjczQgPiAweDEwMDAwICYmIHVjczQgPCAweDExMDAwMCkge1xuICAgICAgICAgICAgdWNzNCAtPSAweDEwMDAwO1xuICAgICAgICAgICAgb3V0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgodWNzNCA+Pj4gMTApIHwgMHhEODAwKSk7XG4gICAgICAgICAgICBvdXQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKCh1Y3M0ICYgMHgzRkYpIHwgMHhEQzAwKSk7XG4gICAgICAgICAgICBpICs9IDQ7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG91dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoMHhGRkZEKSk7XG4gICAgICArK2k7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dC5qb2luKCcnKTtcbiAgfVxuXG4gIHN0YXRpYyBfY2hlY2tDb250aW51YXRpb24gKHVpbnQ4YXJyYXksIHN0YXJ0LCBjaGVja0xlbmd0aCkge1xuICAgIGxldCBhcnJheSA9IHVpbnQ4YXJyYXk7XG4gICAgaWYgKHN0YXJ0ICsgY2hlY2tMZW5ndGggPCBhcnJheS5sZW5ndGgpIHtcbiAgICAgIHdoaWxlIChjaGVja0xlbmd0aC0tKSB7XG4gICAgICAgIGlmICgoYXJyYXlbKytzdGFydF0gJiAweEMwKSAhPT0gMHg4MCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVVRGODtcbiIsImltcG9ydCBWaWRlb0N0eCBmcm9tICcuL3ZpZGVvLWNvbnRleHQnO1xuaW1wb3J0IEF1ZGlvQ3R4IGZyb20gJy4vYXVkaW8tY29udGV4dCc7XG5pbXBvcnQgeyBnZXRUaWNrZXIgfSBmcm9tICcuL3RpY2tlcic7XG4vKipcbiAqIOmfs+eUu+WQjOatpeiwg+WSjOWZqFxuICovXG5jbGFzcyBBVlJlY29uY2lsZXIge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICB0aGlzLmFDdHggPSBwcm9wcy5hQ3R4O1xuICAgIHRoaXMudkN0eCA9IHByb3BzLnZDdHg7XG4gICAgdGhpcy52aWRlbyA9IHByb3BzLnZpZGVvXG4gICAgdGhpcy50aW1lb3V0SWQgPSBudWxsXG4gICAgdGhpcy5zdGFydCA9IG51bGxcbiAgfVxuXG4gIGRvUmVjb25jaWxlICgpIHtcbiAgICBjb25zdCB2Q3VyVGltZSA9ICh0aGlzLnZDdHguY3VycmVudFRpbWUgfHwgMCk7XG4gICAgY29uc3QgYUN1clRpbWUgPSAodGhpcy5hQ3R4LmN1cnJlbnRUaW1lIHx8IDApICogMTAwMDtcblxuICAgIGNvbnN0IGdhcCA9IHZDdXJUaW1lIC0gYUN1clRpbWU7XG4gICAgaWYgKHRoaXMudGltZW91dElkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChnYXAgPiAyMDApIHsgLy8gYXVkaW8gZGVsYXllZCBmb3IgbW9yZSB0aGFuIDEwMG1zXG4gICAgICB0aGlzLnZpZGVvLnN0YXJ0ICs9IGdhcFxuICAgICAgdGhpcy52Q3R4LnBhdXNlKClcbiAgICAgIHRoaXMudGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMudkN0eC5wbGF5KClcbiAgICAgICAgdGhpcy50aW1lb3V0SWQgPSBudWxsXG4gICAgICB9LCBnYXApXG4gICAgfSBlbHNlIGlmIChnYXAgPCAtMTIwKSB7XG4gICAgICB0aGlzLnZDdHguY3VycmVudFRpbWUgPSB0aGlzLnZDdHguY3VycmVudFRpbWUgKyBNYXRoLmFicyhnYXApO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuc3RhcnQgPSBudWxsXG4gICAgdGhpcy5hQ3R4ID0gbnVsbFxuICAgIHRoaXMudkN0eCA9IG51bGxcbiAgfVxufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbmNsYXNzIE1vYmlsZVZpZGVvIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvciAoY29uZmlnKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgIHRoaXMuaGFuZGxlQXVkaW9Tb3VyY2VFbmQgPSB0aGlzLmhhbmRsZUF1ZGlvU291cmNlRW5kLmJpbmQodGhpcylcbiAgICB0aGlzLmluaXQoY29uZmlnKVxuICAgIHRoaXMucGxheWVkID0gZmFsc2U7XG4gICAgdGhpcy5fcGF1c2VkID0gdHJ1ZTtcbiAgfVxuXG4gIGluaXQgKGNvbmZpZykge1xuICAgIHRoaXMudkN0eCA9IG5ldyBWaWRlb0N0eCh7XG4gICAgICBjYW52YXM6IHRoaXMuX2NhbnZhc1xuICAgIH0pO1xuICAgIHRoaXMuYUN0eCA9IG5ldyBBdWRpb0N0eChjb25maWcpO1xuICAgIHRoaXMudGlja2VyID0gbmV3IChnZXRUaWNrZXIoKSkoKVxuICAgIHRoaXMucmVjb25jaWxlciA9IG5ldyBBVlJlY29uY2lsZXIoe1xuICAgICAgdkN0eDogdGhpcy52Q3R4LFxuICAgICAgYUN0eDogdGhpcy5hQ3R4LFxuICAgICAgdmlkZW86IHRoaXNcbiAgICB9KVxuICAgIHRoaXMudkN0eC5vbmNhbnBsYXkgPSAoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMucGxheWVkKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy5fY2FudmFzKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NhbnBsYXknKSk7XG4gICAgfVxuXG4gICAgdGhpcy50aWNrZXIuc3RhcnQoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLnN0YXJ0KSB7XG4gICAgICAgIHRoaXMuc3RhcnQgPSBEYXRlLm5vdygpXG4gICAgICB9XG4gICAgICB0aGlzLl9jdXJyZW50VGltZSA9IERhdGUubm93KCkgLSB0aGlzLnN0YXJ0XG4gICAgICB0aGlzLnZDdHguX29uVGltZXIodGhpcy5fY3VycmVudFRpbWUpXG4gICAgfSlcblxuICAgIHRoaXMuYUN0eC5vbignQVVESU9fU09VUkNFX0VORCcsIHRoaXMuaGFuZGxlQXVkaW9Tb3VyY2VFbmQpXG4gIH1cblxuICBoYW5kbGVBdWRpb1NvdXJjZUVuZCAoKSB7XG4gICAgdGhpcy5yZWNvbmNpbGVyLmRvUmVjb25jaWxlKClcbiAgICB0aGlzLnZDdHguY2xlYW5CdWZmZXIoKTtcbiAgfVxuXG4gIF9jbGVhbkJ1ZmZlciAoKSB7XG4gICAgdGhpcy52Q3R4LmNsZWFuQnVmZmVyKClcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuYUN0eC5kZXN0cm95KClcbiAgICB0aGlzLnZDdHguZGVzdHJveSgpXG4gICAgdGhpcy50aWNrZXIuc3RvcCgpXG4gICAgdGhpcy5zdGFydCA9IG51bGw7XG4gICAgdGhpcy5yZWNvbmNpbGVyLmRlc3Ryb3koKVxuICAgIHRoaXMuYUN0eCA9IG51bGw7XG4gICAgdGhpcy52Q3R4ID0gbnVsbDtcbiAgICB0aGlzLnRpY2tlciA9IG51bGw7XG4gIH1cblxuICBvbkRlbXV4Q29tcGxldGUgKHZpZGVvVHJhY2ssIGF1ZGlvVHJhY2spIHtcbiAgICB0aGlzLmFDdHguZGVjb2RlQXVkaW8oYXVkaW9UcmFjayk7XG4gICAgdGhpcy52Q3R4LmRlY29kZVZpZGVvKHZpZGVvVHJhY2spO1xuICB9XG5cbiAgc2V0QXVkaW9NZXRhIChtZXRhKSB7XG4gICAgdGhpcy5hQ3R4LnNldEF1ZGlvTWV0YURhdGEobWV0YSk7XG4gIH1cblxuICBzZXRWaWRlb01ldGEgKG1ldGEpIHtcbiAgICB0aGlzLnZDdHguc2V0VmlkZW9NZXRhRGF0YShtZXRhKTtcbiAgfVxuXG4gIGdldCB3aWR0aCAoKSB7XG4gICAgcmV0dXJuIHRoaXMudkN0eC53aWR0aFxuICB9XG5cbiAgZ2V0IGhlaWdodCAoKSB7XG4gICAgcmV0dXJuIHRoaXMudkN0eC5oZWlnaHRcbiAgfVxuXG4gIGdldCB2aWRlb1dpZHRoICgpIHtcbiAgICByZXR1cm4gdGhpcy52Q3R4LnZpZGVvV2lkdGhcbiAgfVxuXG4gIGdldCB2aWRlb0hlaWdodCAoKSB7XG4gICAgcmV0dXJuIHRoaXMudkN0eC52aWRlb0hlaWdodFxuICB9XG5cbiAgZ2V0IHNyYyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdzcmMnKTtcbiAgfVxuXG4gIHNldCBzcmMgKHZhbCkge1xuICAgIC8vIGRvIG5vdGhpbmdcbiAgfVxuXG4gIGdldCByZWFkeVN0YXRlICgpIHtcbiAgICByZXR1cm4gdGhpcy52Q3R4LnJlYWR5U3RhdGVcbiAgfVxuXG4gIGdldCBzZWVraW5nICgpIHtcbiAgICByZXR1cm4gdGhpcy52Q3R4LnNlZWtpbmdcbiAgfVxuXG4gIGdldCBjdXJyZW50VGltZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuYUN0eC5jdXJyZW50VGltZVxuICB9XG5cbiAgZ2V0IGR1cmF0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5hQ3R4LmR1cmF0aW9uXG4gIH1cblxuICBnZXQgcGF1c2VkICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcGF1c2VkXG4gIH1cblxuICBnZXQgcGxheWJhY2tSYXRlICgpIHtcbiAgICBpZiAodGhpcy5oYXNBdHRyaWJ1dGUoJ3BsYXliYWNrUmF0ZScpKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3BsYXliYWNrUmF0ZScpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAxLjBcbiAgICB9XG4gIH1cblxuICBzZXQgcGxheWJhY2tSYXRlICh2YWwpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZSgncGxheWJhY2tyYXRlJywgdmFsKTtcbiAgICB0aGlzLmFDdHgucGxheWJhY2tSYXRlID0gdmFsO1xuICAgIHRoaXMudkN0eC5wbGF5YmFja1JhdGUgPSB2YWw7XG5cbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdyYXRlY2hhbmdlJykpXG4gIH1cblxuICBnZXQgZW5kZWQgKCkge1xuICAgIHJldHVybiB0aGlzLmFDdHguZW5kZWQ7XG4gIH1cblxuICBnZXQgYXV0b3BsYXkgKCkge1xuICAgIGlmICh0aGlzLmhhc0F0dHJpYnV0ZSgnYXV0b3BsYXknKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdhdXRvcGxheScpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHBsYXkgKCkge1xuICAgIGlmICh0aGlzLnBsYXllZCkge1xuICAgICAgdGhpcy5kZXN0cm95KClcbiAgICAgIHRoaXMuaW5pdCgpXG4gICAgfVxuXG4gICAgdGhpcy5hQ3R4LnBsYXkoKVxuICAgIHRoaXMudkN0eC5wbGF5KCkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLnBsYXllZCA9IHRydWU7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdwbGF5JykpXG4gICAgICB0aGlzLl9wYXVzZWQgPSBmYWxzZVxuICAgIH0pXG4gIH1cblxuICBwYXVzZSAoKSB7XG4gICAgdGhpcy5fcGF1c2VkID0gdHJ1ZTtcbiAgICB0aGlzLmFDdHgucGF1c2UoKVxuICAgIHRoaXMudkN0eC5wYXVzZSgpXG5cbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdwYXVzZScpKVxuICB9XG5cbiAgZ2V0IHZvbHVtZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuYUN0eC52b2x1bWVcbiAgfVxuXG4gIHNldCB2b2x1bWUgKHZvbCkge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKCd2b2x1bWUnLCB2b2wpO1xuICAgIHRoaXMuYUN0eC52b2x1bWUgPSB2b2xcbiAgfVxuXG4gIGdldCBtdXRlZCAoKSB7XG4gICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKCdtdXRlZCcpKSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ211dGVkJylcbiAgICB9IGVsc2UgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKCd2b2x1bWUnKSkge1xuICAgICAgcmV0dXJuIE51bWJlci5wYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgndm9sdW1lJykpID09PSAwXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHNldCBtdXRlZCAodmFsKSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ211dGVkJywgdmFsKTtcbiAgICBpZiAoIXZhbCkge1xuICAgICAgdGhpcy5hQ3R4Lm11dGVkID0gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hQ3R4Lm11dGVkID0gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGdldCBlcnJvciAoKSB7XG4gICAgcmV0dXJuIHRoaXMudkN0eC5lcnJvcjtcbiAgfVxuXG4gIGdldCBidWZmZXJlZCAoKSB7XG4gICAgcmV0dXJuIHRoaXMudkN0eC5idWZmZXJlZFxuICB9XG59XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbW9iaWxlLXZpZGVvJywgTW9iaWxlVmlkZW8pO1xuIiwiY2xhc3MgU291cmNlQnVmZmVyIHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZykge1xuICAgIHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnKTtcbiAgICB0aGlzLnR5cGUgPSB0aGlzLmNvbmZpZy50eXBlO1xuICAgIHRoaXMuYnVmZmVyID0gW107XG4gICAgdGhpcy5jdXJyZW50R29wID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2xhc3RHZXQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBwdXNoIChmcmFtZSkge1xuICAgIGlmICh0aGlzLnR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgIGlmIChmcmFtZS5pc0tleWZyYW1lKSB7XG4gICAgICAgIGxldCBjdXJyZW50R29wID0ge1xuICAgICAgICAgIHNhbXBsZXM6IFtdLFxuICAgICAgICAgIHN0YXJ0OiBmcmFtZS5kdHMsXG4gICAgICAgICAgZW5kOiBmcmFtZS5kdHMsXG4gICAgICAgICAgbmV4dEdvcDogdW5kZWZpbmVkXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRHb3ApIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRHb3AubmV4dEdvcCA9IGN1cnJlbnRHb3A7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50R29wID0gY3VycmVudEdvcDtcbiAgICAgICAgdGhpcy5idWZmZXIucHVzaCh0aGlzLmN1cnJlbnRHb3ApO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jdXJyZW50R29wKSB7XG4gICAgICAgIHRoaXMuY3VycmVudEdvcC5zYW1wbGVzLnB1c2goZnJhbWUpO1xuXG4gICAgICAgIGlmIChmcmFtZS5kdHMgPCB0aGlzLmN1cnJlbnRHb3Auc3RhcnQpIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRHb3Auc3RhcnQgPSBmcmFtZS5kdHM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZnJhbWUuZHRzID4gdGhpcy5jdXJyZW50R29wLmVuZCkge1xuICAgICAgICAgIHRoaXMuY3VycmVudEdvcC5lbmQgPSBmcmFtZS5kdHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQgKHRpbWUpIHtcbiAgICBpZiAodGhpcy50eXBlID09PSAndmlkZW8nKSB7XG4gICAgICBpZiAodGhpcy5idWZmZXIubGVuZ3RoIDwgMSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0aW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbGV0IHNhbXBsZSA9IHRoaXMuX2dldE5leHQoKTtcbiAgICAgICAgcmV0dXJuIHNhbXBsZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfZ2V0TmV4dCAoKSB7XG4gICAgaWYgKCF0aGlzLl9sYXN0R2V0KSB7XG4gICAgICBsZXQgZ29wID0gdGhpcy5idWZmZXJbMF07XG4gICAgICBpZiAoZ29wLnNhbXBsZXMubGVuZ3RoIDwgMSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgdGhpcy5fbGFzdEdldCA9IHtcbiAgICAgICAgZ29wLFxuICAgICAgICBpbmRleDogMFxuICAgICAgfVxuICAgICAgcmV0dXJuIGdvcC5zYW1wbGVzWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZ29wID0gdGhpcy5fbGFzdEdldC5nb3A7XG4gICAgICBsZXQgc2FtcGxlID0gZ29wLnNhbXBsZXNbdGhpcy5fbGFzdEdldC5pbmRleCArIDFdO1xuICAgICAgaWYgKHNhbXBsZSkge1xuICAgICAgICB0aGlzLl9sYXN0R2V0LmluZGV4ID0gdGhpcy5fbGFzdEdldC5pbmRleCArIDE7XG4gICAgICAgIHJldHVybiBzYW1wbGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnb3AgPSBnb3AubmV4dEdvcDtcbiAgICAgICAgaWYgKCFnb3AgfHwgZ29wLnNhbXBsZXMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzYW1wbGUgPSBnb3Auc2FtcGxlc1swXTtcbiAgICAgICAgdGhpcy5fbGFzdEdldCA9IHtcbiAgICAgICAgICBnb3AsXG4gICAgICAgICAgaW5kZXg6IDBcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2FtcGxlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZSAoc3RhcnQsIGVuZCkge1xuICAgIGlmICh0aGlzLmJ1ZmZlci5sZW5ndGggPCAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCBnb3AgPSB0aGlzLmJ1ZmZlclswXTtcbiAgICB3aGlsZSAoZ29wKSB7XG4gICAgICBpZiAoZ29wLmVuZCA8IGVuZCAmJiBnb3Auc3RhcnQgPj0gc3RhcnQpIHtcbiAgICAgICAgdGhpcy5idWZmZXIuc3BsaWNlKGksIDEpXG4gICAgICAgIGdvcCA9IHRoaXMuYnVmZmVyW2ldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaSArPSAxO1xuICAgICAgICBnb3AgPSB0aGlzLmJ1ZmZlcltpXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU291cmNlQnVmZmVyO1xuIiwiLyoqXG4gKiBAYXV0aG9yIGZ1eXVoYW9AYnl0ZWRhbmNlLmNvbVxuICovXG5cbmNsYXNzIFRpY2tlciB7XG4gIGNvbnN0cnVjdG9yIChvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyB8fCB7fSwge1xuICAgICAgaW50ZXJ2YWw6IDE2XG4gICAgfSlcblxuICAgIHRoaXMuY2FsbGJhY2tzID0gW11cbiAgfVxuXG4gIHN0YXJ0KC4uLmNhbGxiYWNrcykge1xuICAgIHRoaXMuY2FsbGJhY2tzID0gY2FsbGJhY2tzXG4gIH1cblxuICBvblRpY2sgKCkge1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLmNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgY2FsbGJhY2sgPSB0aGlzLmNhbGxiYWNrc1tpXVxuICAgICAgY2FsbGJhY2soKVxuICAgIH1cbiAgfVxuXG4gIHNldEludGVydmFsIChpbnRlcnZhbCkge1xuICAgIHRoaXMub3B0aW9ucy5pbnRlcnZhbCA9IGludGVydmFsXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuLyoqXG4gKiB0aWNrZXIgdXNlIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuICovXG5jbGFzcyBSYWZUaWNrZXIgZXh0ZW5kcyBUaWNrZXIge1xuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5wcmV2ID0gbnVsbDtcbiAgICB0aGlzLnRpbWVySWQgPSBudWxsXG4gICAgdGhpcy5fc3ViVGltZXJJZCA9IG51bGxcblxuICAgIHRoaXMuX3RpY2tGdW5jID0gUmFmVGlja2VyLmdldFRpY2tGdW5jKClcbiAgICB0aGlzLnRpY2sgPSB0aGlzLnRpY2suYmluZCh0aGlzKVxuICB9XG5cbiAgc3RhcnQgKC4uLmNhbGxiYWNrcykge1xuICAgIHN1cGVyLnN0YXJ0KC4uLmNhbGxiYWNrcylcbiAgICB0aGlzLnRpY2soKVxuICB9XG5cbiAgdGljayAodGltZXN0YW1wKSB7XG4gICAgdGhpcy5vblRpY2soKVxuICAgIHRoaXMubmV4dFRpY2soKTtcbiAgfVxuXG4gIG5leHRUaWNrICgpIHtcbiAgICBjb25zdCB7IF90aWNrRnVuYyB9ID0gdGhpcztcbiAgICB0aGlzLnRpbWVySWQgPSBfdGlja0Z1bmModGhpcy50aWNrKVxuICB9XG5cbiAgc3RvcCAoKSB7XG4gICAgaWYgKHRoaXMudGltZXJJZCkge1xuICAgICAgY29uc3QgY2FuY2VsRnVuYyA9IFJhZlRpY2tlci5nZXRDYW5jZWxGdW5jKClcblxuICAgICAgY2FuY2VsRnVuYyh0aGlzLnRpbWVySWQpXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldFRpY2tGdW5jICgpIHtcbiAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gIH1cblxuICBzdGF0aWMgZ2V0Q2FuY2VsRnVuYyAoKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWVcbiAgfVxuXG4gIHN0YXRpYyBpc1N1cHBvcnRlZCAoKSB7XG4gICAgcmV0dXJuIFJhZlRpY2tlci5nZXRUaWNrRnVuYygpICE9PSB1bmRlZmluZWRcbiAgfVxufVxuXG4vKipcbiAqIHVzZSBzZXRUaW1lb3V0IGZvciBicm93c2VycyB3aXRob3V0IHJhZiBzdXBwb3J0XG4gKi9cbmNsYXNzIFRpbWVvdXRUaWNrZXIgZXh0ZW5kcyBUaWNrZXIge1xuICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICBzdXBlcihjb25maWcpXG4gICAgdGhpcy50aW1lb3V0SWQgPSBudWxsXG5cbiAgfVxuXG4gIHN0YXJ0ICguLi5jYWxsYmFja3MpIHtcbiAgICBzdXBlci5uZXh0VGljayguLi5jYWxsYmFja3MpXG4gICAgdGhpcy50aW1lb3V0SWQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgdGhpcy5vblRpY2soKTtcbiAgICB9LCB0aGlzLm9wdGlvbnMuaW50ZXJ2YWwgfHwgMTYpXG4gIH1cblxuICBzdG9wICgpIHtcbiAgICBpZiAodGhpcy50aW1lb3V0SWQpIHtcbiAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMudGltZW91dElkKVxuICAgIH1cbiAgfVxuXG59XG5cbi8qKlxuICog6L+U5ZueVGlja2Vy5p6E6YCg5Ye95pWwXG4gKiBAcmV0dXJucyB7VGlja2VyfVxuICovXG5leHBvcnQgY29uc3QgZ2V0VGlja2VyID0gKCkgPT4ge1xuICBpZiAoUmFmVGlja2VyLmlzU3VwcG9ydGVkKCkpIHtcbiAgICByZXR1cm4gUmFmVGlja2VyXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFRpbWVvdXRUaWNrZXJcbiAgfVxufVxuIiwiaW1wb3J0IFdvcmtlcmlmeSBmcm9tICd3ZWJ3b3JraWZ5LXdlYnBhY2snXG5pbXBvcnQgU3RyZWFtIGZyb20gJy4uL3dyaXRlL3N0cmVhbSc7XG5pbXBvcnQgTmFsdW5pdCBmcm9tICcuLi8uLi8uLi94Z3BsYXllci1jb2RlYy9zcmMvaDI2NC9uYWx1bml0JztcbmltcG9ydCBZVVZDYW52YXMgZnJvbSAnLi95dXYtY2FudmFzJztcbmltcG9ydCBTb3VyY2VCdWZmZXIgZnJvbSAnLi9zb3VyY2VidWZmZXInO1xuaW1wb3J0IFRpbWVSYW5nZXMgZnJvbSAnLi4vbW9kZWxzL1RpbWVSYW5nZXMnO1xuXG5jbGFzcyBWaWRlb0NhbnZhcyB7XG4gIGNvbnN0cnVjdG9yIChjb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZyk7XG4gICAgdGhpcy5jYW52YXMgPSB0aGlzLmNvbmZpZy5jYW52YXMgPyB0aGlzLmNvbmZpZy5jYW52YXMgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICB0aGlzLnNvdXJjZSA9IG5ldyBTb3VyY2VCdWZmZXIoe3R5cGU6ICd2aWRlbyd9KTtcbiAgICB0aGlzLnByZWxvYWRUaW1lID0gdGhpcy5jb25maWcucHJlbG9hZFRpbWUgfHwgMztcbiAgICB0aGlzLm9uY2FucGxheSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm9uRmlyc3RGcmFtZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm1ldGEgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5yZWFkeVN0YXR1cyA9IDA7XG4gICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgIHRoaXMuY291bnQgPSAwO1xuICAgIHRoaXMuY3VycmVudFRpbWUgPSAwO1xuICAgIHRoaXMubGFzdFBsYXllZCA9IDA7XG5cbiAgICB0aGlzLl9kZWNvZGVySW5pdGVkID0gZmFsc2U7XG4gICAgdGhpcy5fYXZjY3B1c2hlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2RlY29kZWRGcmFtZXMgPSB7fTtcbiAgICB0aGlzLl9sYXN0U2FtcGxlRHRzID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2Jhc2VEdHMgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fbGFzdFJlbmRlclRpbWUgPSBudWxsXG4gICAgdGhpcy5wbGF5RmluaXNoID0gbnVsbFxuICB9XG5cbiAgcGF1c2UgKCkge1xuICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcbiAgfVxuXG4gIGluaXRXYXNtV29ya2VyICgpIHtcbiAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgIHRoaXMud2FzbXdvcmtlciA9IFdvcmtlcmlmeShyZXF1aXJlLnJlc29sdmUoJy4vd29ya2VyLmpzJykpO1xuICAgIHRoaXMud2FzbXdvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICBtc2c6ICdpbml0JyxcbiAgICAgIG1ldGE6IHRoaXMubWV0YVxuICAgIH0pXG4gICAgdGhpcy53YXNtd29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBtc2cgPT4ge1xuICAgICAgc3dpdGNoIChtc2cuZGF0YS5tc2cpIHtcbiAgICAgICAgY2FzZSAnREVDT0RFUl9SRUFEWSc6XG4gICAgICAgICAgX3RoaXMuX2RlY29kZXJJbml0ZWQgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdERUNPREVEJzpcbiAgICAgICAgICB0aGlzLl9vbkRlY29kZWQobXNnLmRhdGEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2V0VmlkZW9NZXRhRGF0YSAobWV0YSkge1xuICAgIHRoaXMubWV0YSA9IG1ldGE7XG4gICAgaWYgKCF0aGlzLl9kZWNvZGVySW5pdGVkKSB7XG4gICAgICB0aGlzLmluaXRXYXNtV29ya2VyKCk7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGhpcy5fYXZjY3B1c2hlZCA9IHRydWU7XG4gICAgbGV0IGRhdGEgPSBuZXcgVWludDhBcnJheShtZXRhLnNwcy5ieXRlTGVuZ3RoICsgNCk7XG4gICAgZGF0YS5zZXQoWzAsIDAsIDAsIDFdKVxuICAgIGRhdGEuc2V0KG1ldGEuc3BzLCA0KTtcbiAgICB0aGlzLndhc213b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgbXNnOiAnZGVjb2RlJyxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KVxuXG4gICAgZGF0YSA9IG5ldyBVaW50OEFycmF5KG1ldGEucHBzLmJ5dGVMZW5ndGggKyA0KTtcbiAgICBkYXRhLnNldChbMCwgMCwgMCwgMV0pXG4gICAgZGF0YS5zZXQobWV0YS5wcHMsIDQpO1xuICAgIHRoaXMud2FzbXdvcmtlci5wb3N0TWVzc2FnZSh7XG4gICAgICBtc2c6ICdkZWNvZGUnLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pXG5cbiAgICBpZiAoIXRoaXMueXV2Q2FudmFzKSB7XG4gICAgICBsZXQgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7bWV0YSwgY2FudmFzOiB0aGlzLmNhbnZhc30sIHRoaXMuY29uZmlnKTtcbiAgICAgIHRoaXMueXV2Q2FudmFzID0gbmV3IFlVVkNhbnZhcyhjb25maWcpO1xuICAgIH1cbiAgICB0aGlzLnJlYWR5U3RhdHVzID0gMTtcbiAgfVxuXG4gIGRlY29kZVZpZGVvICh2aWRlb1RyYWNrKSB7XG4gICAgaWYgKCF0aGlzLl9kZWNvZGVySW5pdGVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2F2Y2NwdXNoZWQpIHtcbiAgICAgIHRoaXMuc2V0VmlkZW9NZXRhRGF0YSh0aGlzLm1ldGEpO1xuICAgIH1cbiAgICBsZXQgeyBzYW1wbGVzIH0gPSB2aWRlb1RyYWNrO1xuICAgIGxldCBzYW1wbGUgPSBzYW1wbGVzLnNoaWZ0KCk7XG5cbiAgICB3aGlsZSAoc2FtcGxlKSB7XG4gICAgICBpZiAoIXRoaXMuX2Jhc2VEdHMpIHtcbiAgICAgICAgdGhpcy5fYmFzZUR0cyA9IHNhbXBsZS5kdHM7XG4gICAgICB9XG4gICAgICB0aGlzLnNvdXJjZS5wdXNoKHNhbXBsZSk7XG4gICAgICBzYW1wbGUgPSBzYW1wbGVzLnNoaWZ0KCk7XG4gICAgfVxuXG4gICAgdGhpcy5fcHJlbG9hZCgpO1xuICB9XG5cbiAgX3ByZWxvYWQgKCkge1xuICAgIGlmICghdGhpcy5fbGFzdFNhbXBsZUR0cyB8fCB0aGlzLl9sYXN0U2FtcGxlRHRzIC0gdGhpcy5fYmFzZUR0cyA8IHRoaXMuY3VycmVudFRpbWUgKyB0aGlzLnByZWxvYWRUaW1lICogMTAwMCkge1xuICAgICAgbGV0IHNhbXBsZSA9IHRoaXMuc291cmNlLmdldCgpO1xuICAgICAgaWYgKHNhbXBsZSkge1xuICAgICAgICB0aGlzLl9sYXN0U2FtcGxlRHRzID0gc2FtcGxlLmR0cztcbiAgICAgICAgdGhpcy5fYW5hbHlzZU5hbChzYW1wbGUpO1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAoc2FtcGxlICYmIHRoaXMuX2xhc3RTYW1wbGVEdHMgLSB0aGlzLl9iYXNlRHRzIDwgdGhpcy5jdXJyZW50VGltZSArIHRoaXMucHJlbG9hZFRpbWUgKiAxMDAwKSB7XG4gICAgICAgIHNhbXBsZSA9IHRoaXMuc291cmNlLmdldCgpO1xuICAgICAgICBpZiAoc2FtcGxlKSB7XG4gICAgICAgICAgdGhpcy5fYW5hbHlzZU5hbChzYW1wbGUpO1xuICAgICAgICAgIHRoaXMuX2xhc3RTYW1wbGVEdHMgPSBzYW1wbGUuZHRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2FuYWx5c2VOYWwgKHNhbXBsZSkge1xuICAgIGxldCBuYWxzID0gTmFsdW5pdC5nZXRBdmNjTmFscyhuZXcgU3RyZWFtKHNhbXBsZS5kYXRhLmJ1ZmZlcikpO1xuXG4gICAgbGV0IGxlbmd0aCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgbmFsID0gbmFsc1tpXTtcbiAgICAgIGxlbmd0aCArPSBuYWwuYm9keS5ieXRlTGVuZ3RoICsgNDtcbiAgICB9XG4gICAgbGV0IG9mZnNldCA9IDA7XG4gICAgbGV0IGRhdGEgPSBuZXcgVWludDhBcnJheShsZW5ndGgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmFscy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IG5hbCA9IG5hbHNbaV07XG4gICAgICBkYXRhLnNldChbMCwgMCwgMCwgMV0sIG9mZnNldCk7XG4gICAgICBvZmZzZXQgKz0gNDtcbiAgICAgIGRhdGEuc2V0KG5ldyBVaW50OEFycmF5KG5hbC5ib2R5KSwgb2Zmc2V0KTtcbiAgICAgIG9mZnNldCArPSBuYWwuYm9keS5ieXRlTGVuZ3RoO1xuICAgIH1cbiAgICB0aGlzLndhc213b3JrZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgbXNnOiAnZGVjb2RlJyxcbiAgICAgIGRhdGE6IGRhdGEsXG4gICAgICBpbmZvOiB7XG4gICAgICAgIGR0czogc2FtcGxlLmR0cyxcbiAgICAgICAgcHRzOiBzYW1wbGUucHRzID8gc2FtcGxlLnB0cyA6IHNhbXBsZS5kdHMgKyBzYW1wbGUuY3RzLFxuICAgICAgICBrZXk6IHNhbXBsZS5pc0tleWZyYW1lXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIF9vbkRlY29kZWQgKGRhdGEpIHtcbiAgICBsZXQge2R0c30gPSBkYXRhLmluZm9cbiAgICB0aGlzLl9kZWNvZGVkRnJhbWVzW2R0c10gPSBkYXRhO1xuICB9XG5cbiAgcGxheSAoKSB7XG4gICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMucGxheUZpbmlzaCA9IHJlc29sdmVcbiAgICB9KVxuICB9XG5cbiAgX29uVGltZXIgKGN1cnJlbnRUaW1lKSB7XG4gICAgaWYgKHRoaXMucGF1c2VkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLm1ldGEpIHtcbiAgICAgIGlmICh0aGlzLm1ldGEuZnJhbWVSYXRlICYmIHRoaXMubWV0YS5mcmFtZVJhdGUuZml4ZWQgJiYgdGhpcy5tZXRhLmZyYW1lUmF0ZS5mcHMpIHtcbiAgICAgIH1cbiAgICAgIGxldCBmcmFtZVRpbWVzID0gT2JqZWN0LmtleXModGhpcy5fZGVjb2RlZEZyYW1lcyk7XG4gICAgICBpZiAoZnJhbWVUaW1lcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFRpbWUgPSBjdXJyZW50VGltZTtcbiAgICAgICAgbGV0IGZyYW1lVGltZSA9IC0xO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZyYW1lVGltZXMubGVuZ3RoICYmIE51bWJlci5wYXJzZUludChmcmFtZVRpbWVzW2ldKSAtIHRoaXMuX2Jhc2VEdHMgPD0gdGhpcy5jdXJyZW50VGltZTsgaSsrKSB7XG4gICAgICAgICAgZnJhbWVUaW1lID0gTnVtYmVyLnBhcnNlSW50KGZyYW1lVGltZXNbaSAtIDFdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBmcmFtZSA9IHRoaXMuX2RlY29kZWRGcmFtZXNbZnJhbWVUaW1lXTtcbiAgICAgICAgaWYgKGZyYW1lKSB7XG4gICAgICAgICAgaWYgKHRoaXMub25jYW5wbGF5ICYmIHRoaXMucmVhZHlTdGF0dXMgPCA0KSB7XG4gICAgICAgICAgICB0aGlzLm9uY2FucGxheSgpO1xuICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXR1cyA9IDQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMueXV2Q2FudmFzLnJlbmRlcihmcmFtZS5idWZmZXIsIGZyYW1lLndpZHRoLCBmcmFtZS5oZWlnaHQsIGZyYW1lLnlMaW5lc2l6ZSwgZnJhbWUudXZMaW5lc2l6ZSk7XG5cbiAgICAgICAgICBpZiAodGhpcy5wbGF5RmluaXNoKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXlGaW5pc2goKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZyYW1lVGltZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoTnVtYmVyLnBhcnNlSW50KGZyYW1lVGltZXNbaV0pIDwgZnJhbWVUaW1lKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fZGVjb2RlZEZyYW1lc1tmcmFtZVRpbWVzW2ldXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fbGFzdFJlbmRlclRpbWUgPSBEYXRlLm5vdygpXG4gIH1cblxuICBjbGVhbkJ1ZmZlciAoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFRpbWUgPiAxKSB7XG4gICAgICB0aGlzLnNvdXJjZS5yZW1vdmUoMCwgdGhpcy5jdXJyZW50VGltZSAtIDEpO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMud2FzbXdvcmtlciA9IG51bGw7XG4gICAgdGhpcy5jYW52YXMgPSBudWxsXG4gICAgdGhpcy5zb3VyY2UgPSBudWxsXG4gICAgdGhpcy5fZGVjb2RlckluaXRlZCA9IGZhbHNlO1xuICB9XG5cbiAgZ2V0IGJ1ZmZlcmVkICgpIHtcbiAgICBjb25zdCByYW5nZXMgPSBbXVxuICAgIGxldCBjdXJyZW50UmFuZ2UgPSB7XG4gICAgICBzdGFydDogbnVsbCxcbiAgICAgIGVuZDogbnVsbFxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc291cmNlLmJ1ZmZlci5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgeyBzdGFydCwgZW5kIH0gPSB0aGlzLnNvdXJjZS5idWZmZXJbaV07XG4gICAgICBpZiAoIWN1cnJlbnRSYW5nZS5zdGFydCkge1xuICAgICAgICBjdXJyZW50UmFuZ2Uuc3RhcnQgPSBzdGFydDtcbiAgICAgIH1cbiAgICAgIGlmICghY3VycmVudFJhbmdlLmVuZCkge1xuICAgICAgICBjdXJyZW50UmFuZ2UuZW5kID0gZW5kO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhcnQgLSBjdXJyZW50UmFuZ2UuZW5kID4gMTAwMCkge1xuICAgICAgICBjdXJyZW50UmFuZ2Uuc3RhcnQgPSBjdXJyZW50UmFuZ2Uuc3RhcnQgLyAxMDAwXG4gICAgICAgIGN1cnJlbnRSYW5nZS5lbmQgPSBjdXJyZW50UmFuZ2UuZW5kIC8gMTAwMFxuICAgICAgICBjdXJyZW50UmFuZ2UgPSB7XG4gICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgZW5kXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnRSYW5nZS5lbmQgPSBlbmRcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY3VycmVudFJhbmdlLnN0YXJ0ICE9PSBudWxsICYmIGN1cnJlbnRSYW5nZS5lbmQgIT09IG51bGwpIHtcbiAgICAgIGN1cnJlbnRSYW5nZS5zdGFydCA9IGN1cnJlbnRSYW5nZS5zdGFydCAvIDEwMDBcbiAgICAgIGN1cnJlbnRSYW5nZS5lbmQgPSBjdXJyZW50UmFuZ2UuZW5kIC8gMTAwMFxuICAgICAgcmFuZ2VzLnB1c2goY3VycmVudFJhbmdlKVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgVGltZVJhbmdlcyhyYW5nZXMpXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFZpZGVvQ2FudmFzO1xuIiwiY29uc3QgTUFYX1NUUkVBTV9CVUZGRVJfTEVOR1RIID0gMTAyNCAqIDEwMjQ7XG52YXIgRGVjb2RlciA9IGZ1bmN0aW9uIChzZWxmKSB7XG4gIHRoaXMuaW5pdGVkID0gZmFsc2U7XG4gIHRoaXMuc2VsZiA9IHNlbGY7XG4gIHRoaXMubWV0YSA9IHRoaXMuc2VsZi5tZXRhO1xuICB0aGlzLmluZm9saXN0ID0ge307XG4gIHNlbGYucGFyX2Jyb2Fkd2F5T25Ccm9hZHdheUluaXRlZCA9IHRoaXMuYnJvYWR3YXlPbkJyb2Fkd2F5SW5pdGVkLmJpbmQodGhpcyk7XG4gIHNlbGYucGFyX2Jyb2Fkd2F5T25QaWN0dXJlRGVjb2RlZCA9IHRoaXMuYnJvYWR3YXlPblBpY3R1cmVEZWNvZGVkLmJpbmQodGhpcyk7XG59XG5cbkRlY29kZXIucHJvdG90eXBlLnRvVThBcnJheSA9IGZ1bmN0aW9uIChwdHIsIGxlbmd0aCkge1xuICByZXR1cm4gdGhpcy5zZWxmLkhFQVBVOC5zdWJhcnJheShwdHIsIHB0ciArIGxlbmd0aCk7XG59XG5cbkRlY29kZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIE1vZHVsZS5fYnJvYWR3YXlJbml0KCk7XG4gIHRoaXMuc3RyZWFtQnVmZmVyID0gdGhpcy50b1U4QXJyYXkoTW9kdWxlLl9icm9hZHdheUNyZWF0ZVN0cmVhbShNQVhfU1RSRUFNX0JVRkZFUl9MRU5HVEgpLCBNQVhfU1RSRUFNX0JVRkZFUl9MRU5HVEgpO1xufVxuXG5EZWNvZGVyLnByb3RvdHlwZS5icm9hZHdheU9uUGljdHVyZURlY29kZWQgPSBmdW5jdGlvbiAob2Zmc2V0LCB3aWR0aCwgaGVpZ2h0LCB5TGluZXNpemUsIHV2TGluZXNpemUsIGluZm9pZCkge1xuICBsZXQgaW5mbyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuaW5mb2xpc3RbaW5mb2lkXSk7XG4gIGxldCB5Um93Y291bnQgPSBoZWlnaHQ7XG4gIGxldCB1dlJvd2NvdW50ID0gaGVpZ2h0IC8gMjtcbiAgaWYgKHRoaXMubWV0YS5jaHJvbWFGb3JtYXQgPT09IDQ0NCB8fCB0aGlzLm1ldGEuY2hyb21hRm9ybWF0ID09PSA0MjIpIHtcbiAgICB1dlJvd2NvdW50ID0gaGVpZ2h0O1xuICB9XG4gIGxldCBkYXRhID0gdGhpcy50b1U4QXJyYXkob2Zmc2V0LCAoeUxpbmVzaXplICogeVJvd2NvdW50KSArIDIgKiAodXZMaW5lc2l6ZSAqIHV2Um93Y291bnQpKTtcbiAgdGhpcy5pbmZvbGlzdFtpbmZvaWRdID0gbnVsbDtcbiAgbGV0IGRhdGV0ZW1wID0gbmV3IFVpbnQ4QXJyYXkoZGF0YS5sZW5ndGgpO1xuICBkYXRldGVtcC5zZXQoZGF0YSk7XG4gIGxldCBidWZmZXIgPSBkYXRldGVtcC5idWZmZXI7XG4gIHRoaXMuc2VsZi5wb3N0TWVzc2FnZSh7XG4gICAgbXNnOiAnREVDT0RFRCcsXG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIHlMaW5lc2l6ZSxcbiAgICB1dkxpbmVzaXplLFxuICAgIGluZm8sXG4gICAgYnVmZmVyXG4gIH0sIFtidWZmZXJdKTtcbn1cblxuRGVjb2Rlci5wcm90b3R5cGUuYnJvYWR3YXlPbkJyb2Fkd2F5SW5pdGVkID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmluaXRlZCA9IHRydWU7XG4gIHRoaXMuc2VsZi5wb3N0TWVzc2FnZSh7bXNnOiAnREVDT0RFUl9SRUFEWSd9KTtcbn1cblxuRGVjb2Rlci5wcm90b3R5cGUuZGVjb2RlID0gZnVuY3Rpb24gKGRhdGEsIGluZm8pIHtcbiAgbGV0IHRpbWUgPSBwYXJzZUludChuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG4gIGxldCBpbmZvaWQgPSB0aW1lIC0gKE1hdGguZmxvb3IodGltZSAvIDEwZTgpICogMTBlOCk7XG4gIHRoaXMuaW5mb2xpc3RbaW5mb2lkXSA9IGluZm87XG4gIHRoaXMuc3RyZWFtQnVmZmVyLnNldChkYXRhKTtcbiAgTW9kdWxlLl9icm9hZHdheVBsYXlTdHJlYW0oZGF0YS5sZW5ndGgsIGluZm9pZCk7XG59XG5cbnZhciBkZWNvZGVyO1xuXG5mdW5jdGlvbiBvblBvc3RSdW4gKCkge1xuICBkZWNvZGVyID0gbmV3IERlY29kZXIodGhpcyk7XG4gIGRlY29kZXIuaW5pdCgpO1xufVxuXG5mdW5jdGlvbiBpbml0IChtZXRhKSB7XG4gIHNlbGYuaW1wb3J0U2NyaXB0cygnaHR0cHM6Ly9zZjEtdmNsb3VkY2RuLnBzdGF0cC5jb20vb2JqL3R0ZmUvbWVkaWEvZGVjb2Rlci9oMjY0L2RlY29kZXIuanMnKTtcbiAgYWRkT25Qb3N0UnVuKG9uUG9zdFJ1bi5iaW5kKHNlbGYpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2VsZikge1xuICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBkYXRhID0gZS5kYXRhO1xuICAgIGlmICghZGF0YS5tc2cpIHtcbiAgICAgIHNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBtc2c6ICdFUlJPUjppbnZhbGlkIG1lc3NhZ2UnXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKGRhdGEubXNnKSB7XG4gICAgICAgIGNhc2UgJ2luaXQnOlxuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgIHNlbGYubWV0YSA9IGRhdGEubWV0YTtcbiAgICAgICAgICBpbml0KClcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZGVjb2RlJzpcbiAgICAgICAgICBkZWNvZGVyLmRlY29kZShkYXRhLmRhdGEsIGRhdGEuaW5mbyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9LCBmYWxzZSk7XG59XG4iLCJjbGFzcyBZVVZDYW52YXMge1xuICBjb25zdHJ1Y3RvciAoY29uZmlncykge1xuICAgIHRoaXMuY29uZmlncyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZ3MpO1xuICAgIHRoaXMuY2FudmFzID0gdGhpcy5jb25maWdzLmNhbnZhcztcbiAgICB0aGlzLm1ldGEgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmNvbmZpZ3MubWV0YSk7XG4gICAgdGhpcy5jaHJvbWEgPSB0aGlzLm1ldGEuY2hyb21hRm9ybWF0O1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5tZXRhLnByZXNlbnRIZWlnaHQ7XG4gICAgdGhpcy53aWR0aCA9IHRoaXMubWV0YS5wcmVzZW50V2lkdGg7XG4gICAgdGhpcy5jYW52YXMud2lkdGggPSAxMjgwO1xuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IDcyMDtcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgdGhpcy5faW5pdENvbnRleHRHTCgpO1xuICAgIGlmICh0aGlzLmNvbnRleHRHTCkge1xuICAgICAgdGhpcy5faW5pdFByb2dyYW0oKTtcbiAgICAgIHRoaXMuX2luaXRCdWZmZXJzKCk7XG4gICAgICB0aGlzLl9pbml0VGV4dHVyZXMoKTtcbiAgICB9O1xuICB9XG5cbiAgX2luaXRDb250ZXh0R0wgKCkge1xuICAgIHZhciBjYW52YXMgPSB0aGlzLmNhbnZhcztcbiAgICB2YXIgZ2wgPSBudWxsO1xuXG4gICAgdmFyIHZhbGlkQ29udGV4dE5hbWVzID0gWyd3ZWJnbCcsICdleHBlcmltZW50YWwtd2ViZ2wnLCAnbW96LXdlYmdsJywgJ3dlYmtpdC0zZCddO1xuICAgIHZhciBuYW1lSW5kZXggPSAwO1xuXG4gICAgd2hpbGUgKCFnbCAmJiBuYW1lSW5kZXggPCB2YWxpZENvbnRleHROYW1lcy5sZW5ndGgpIHtcbiAgICAgIHZhciBjb250ZXh0TmFtZSA9IHZhbGlkQ29udGV4dE5hbWVzW25hbWVJbmRleF07XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnRleHRPcHRpb25zKSB7XG4gICAgICAgICAgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dChjb250ZXh0TmFtZSwgdGhpcy5jb250ZXh0T3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dChjb250ZXh0TmFtZSk7XG4gICAgICAgIH07XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGdsID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFnbCB8fCB0eXBlb2YgZ2wuZ2V0UGFyYW1ldGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGdsID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgKytuYW1lSW5kZXg7XG4gICAgfTtcblxuICAgIHRoaXMuY29udGV4dEdMID0gZ2w7XG4gIH07XG5cbiAgX2luaXRQcm9ncmFtICgpIHtcbiAgICB2YXIgZ2wgPSB0aGlzLmNvbnRleHRHTDtcblxuICAgIC8vIHZlcnRleCBzaGFkZXIgaXMgdGhlIHNhbWUgZm9yIGFsbCB0eXBlc1xuICAgIHZhciB2ZXJ0ZXhTaGFkZXJTY3JpcHQ7XG4gICAgdmFyIGZyYWdtZW50U2hhZGVyU2NyaXB0O1xuICAgIHZlcnRleFNoYWRlclNjcmlwdCA9IFtcbiAgICAgICdhdHRyaWJ1dGUgdmVjNCB2ZXJ0ZXhQb3M7JyxcbiAgICAgICdhdHRyaWJ1dGUgdmVjNCB0ZXh0dXJlUG9zOycsXG4gICAgICAnYXR0cmlidXRlIHZlYzQgdVRleHR1cmVQb3M7JyxcbiAgICAgICdhdHRyaWJ1dGUgdmVjNCB2VGV4dHVyZVBvczsnLFxuICAgICAgJ3ZhcnlpbmcgdmVjMiB0ZXh0dXJlQ29vcmQ7JyxcbiAgICAgICd2YXJ5aW5nIHZlYzIgdVRleHR1cmVDb29yZDsnLFxuICAgICAgJ3ZhcnlpbmcgdmVjMiB2VGV4dHVyZUNvb3JkOycsXG5cbiAgICAgICd2b2lkIG1haW4oKScsXG4gICAgICAneycsXG4gICAgICAnICBnbF9Qb3NpdGlvbiA9IHZlcnRleFBvczsnLFxuICAgICAgJyAgdGV4dHVyZUNvb3JkID0gdGV4dHVyZVBvcy54eTsnLFxuICAgICAgJyAgdVRleHR1cmVDb29yZCA9IHVUZXh0dXJlUG9zLnh5OycsXG4gICAgICAnICB2VGV4dHVyZUNvb3JkID0gdlRleHR1cmVQb3MueHk7JyxcbiAgICAgICd9J1xuICAgIF0uam9pbignXFxuJyk7XG5cbiAgICBmcmFnbWVudFNoYWRlclNjcmlwdCA9IFtcbiAgICAgICdwcmVjaXNpb24gaGlnaHAgZmxvYXQ7JyxcbiAgICAgICd2YXJ5aW5nIGhpZ2hwIHZlYzIgdGV4dHVyZUNvb3JkOycsXG4gICAgICAndmFyeWluZyBoaWdocCB2ZWMyIHVUZXh0dXJlQ29vcmQ7JyxcbiAgICAgICd2YXJ5aW5nIGhpZ2hwIHZlYzIgdlRleHR1cmVDb29yZDsnLFxuICAgICAgJ3VuaWZvcm0gc2FtcGxlcjJEIHlTYW1wbGVyOycsXG4gICAgICAndW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7JyxcbiAgICAgICd1bmlmb3JtIHNhbXBsZXIyRCB2U2FtcGxlcjsnLFxuICAgICAgJ3VuaWZvcm0gbWF0NCBZVVYyUkdCOycsXG5cbiAgICAgICd2b2lkIG1haW4odm9pZCkgeycsXG4gICAgICAnICBoaWdocCBmbG9hdCB5ID0gdGV4dHVyZTJEKHlTYW1wbGVyLCAgdGV4dHVyZUNvb3JkKS5yOycsXG4gICAgICAnICBoaWdocCBmbG9hdCB1ID0gdGV4dHVyZTJEKHVTYW1wbGVyLCAgdVRleHR1cmVDb29yZCkucjsnLFxuICAgICAgJyAgaGlnaHAgZmxvYXQgdiA9IHRleHR1cmUyRCh2U2FtcGxlciwgIHZUZXh0dXJlQ29vcmQpLnI7JyxcbiAgICAgICcgIGdsX0ZyYWdDb2xvciA9IHZlYzQoeSwgdSwgdiwgMSkgKiBZVVYyUkdCOycsXG4gICAgICAnfSdcbiAgICBdLmpvaW4oJ1xcbicpO1xuXG4gICAgdmFyIFlVVjJSR0IgPSBbXG4gICAgICAxLjE2NDM4LCAwLjAwMDAwLCAxLjU5NjAzLCAtMC44NzA3OSxcbiAgICAgIDEuMTY0MzgsIC0wLjM5MTc2LCAtMC44MTI5NywgMC41Mjk1OSxcbiAgICAgIDEuMTY0MzgsIDIuMDE3MjMsIDAuMDAwMDAsIC0xLjA4MTM5LFxuICAgICAgMCwgMCwgMCwgMVxuICAgIF07XG4gICAgdmFyIHZlcnRleFNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcbiAgICBnbC5zaGFkZXJTb3VyY2UodmVydGV4U2hhZGVyLCB2ZXJ0ZXhTaGFkZXJTY3JpcHQpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIodmVydGV4U2hhZGVyKTtcbiAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcih2ZXJ0ZXhTaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgY29uc29sZS5sb2coJ1ZlcnRleCBzaGFkZXIgZmFpbGVkIHRvIGNvbXBpbGU6ICcgKyBnbC5nZXRTaGFkZXJJbmZvTG9nKHZlcnRleFNoYWRlcikpO1xuICAgIH1cblxuICAgIHZhciBmcmFnbWVudFNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihnbC5GUkFHTUVOVF9TSEFERVIpO1xuICAgIGdsLnNoYWRlclNvdXJjZShmcmFnbWVudFNoYWRlciwgZnJhZ21lbnRTaGFkZXJTY3JpcHQpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIoZnJhZ21lbnRTaGFkZXIpO1xuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKGZyYWdtZW50U2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdGcmFnbWVudCBzaGFkZXIgZmFpbGVkIHRvIGNvbXBpbGU6ICcgKyBnbC5nZXRTaGFkZXJJbmZvTG9nKGZyYWdtZW50U2hhZGVyKSk7XG4gICAgfVxuXG4gICAgdmFyIHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHZlcnRleFNoYWRlcik7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcbiAgICBnbC5saW5rUHJvZ3JhbShwcm9ncmFtKTtcbiAgICBpZiAoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpKSB7XG4gICAgICBjb25zb2xlLmxvZygnUHJvZ3JhbSBmYWlsZWQgdG8gY29tcGlsZTogJyArIGdsLmdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pKTtcbiAgICB9XG5cbiAgICBnbC51c2VQcm9ncmFtKHByb2dyYW0pO1xuXG4gICAgdmFyIFlVVjJSR0JSZWYgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgJ1lVVjJSR0InKTtcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KFlVVjJSR0JSZWYsIGZhbHNlLCBZVVYyUkdCKTtcblxuICAgIHRoaXMuc2hhZGVyUHJvZ3JhbSA9IHByb2dyYW07XG4gIH1cblxuICBfaW5pdEJ1ZmZlcnMgKCkge1xuICAgIHZhciBnbCA9IHRoaXMuY29udGV4dEdMO1xuICAgIHZhciBwcm9ncmFtID0gdGhpcy5zaGFkZXJQcm9ncmFtO1xuXG4gICAgdmFyIHZlcnRleFBvc0J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2ZXJ0ZXhQb3NCdWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KFsxLCAxLCAtMSwgMSwgMSwgLTEsIC0xLCAtMV0pLCBnbC5TVEFUSUNfRFJBVyk7XG5cbiAgICB2YXIgdmVydGV4UG9zUmVmID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgJ3ZlcnRleFBvcycpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHZlcnRleFBvc1JlZik7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcih2ZXJ0ZXhQb3NSZWYsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG5cbiAgICB2YXIgdGV4dHVyZVBvc0J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0ZXh0dXJlUG9zQnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShbMSwgMCwgMCwgMCwgMSwgMSwgMCwgMV0pLCBnbC5TVEFUSUNfRFJBVyk7XG5cbiAgICB2YXIgdGV4dHVyZVBvc1JlZiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sICd0ZXh0dXJlUG9zJyk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGV4dHVyZVBvc1JlZik7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcih0ZXh0dXJlUG9zUmVmLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuXG4gICAgdGhpcy50ZXh0dXJlUG9zQnVmZmVyID0gdGV4dHVyZVBvc0J1ZmZlcjtcblxuICAgIHZhciB1VGV4dHVyZVBvc0J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB1VGV4dHVyZVBvc0J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDAsIDEsIDEsIDAsIDFdKSwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgdmFyIHVUZXh0dXJlUG9zUmVmID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgJ3VUZXh0dXJlUG9zJyk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodVRleHR1cmVQb3NSZWYpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodVRleHR1cmVQb3NSZWYsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG5cbiAgICB0aGlzLnVUZXh0dXJlUG9zQnVmZmVyID0gdVRleHR1cmVQb3NCdWZmZXI7XG5cbiAgICB2YXIgdlRleHR1cmVQb3NCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdlRleHR1cmVQb3NCdWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KFsxLCAwLCAwLCAwLCAxLCAxLCAwLCAxXSksIGdsLlNUQVRJQ19EUkFXKTtcblxuICAgIHZhciB2VGV4dHVyZVBvc1JlZiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sICd2VGV4dHVyZVBvcycpO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHZUZXh0dXJlUG9zUmVmKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHZUZXh0dXJlUG9zUmVmLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuXG4gICAgdGhpcy52VGV4dHVyZVBvc0J1ZmZlciA9IHZUZXh0dXJlUG9zQnVmZmVyO1xuICB9O1xuXG4gIF9pbml0VGV4dHVyZXMgKCkge1xuICAgIHZhciBnbCA9IHRoaXMuY29udGV4dEdMO1xuICAgIHZhciBwcm9ncmFtID0gdGhpcy5zaGFkZXJQcm9ncmFtO1xuICAgIHZhciB5VGV4dHVyZVJlZiA9IHRoaXMuX2luaXRUZXh0dXJlKCk7XG4gICAgdmFyIHlTYW1wbGVyUmVmID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sICd5U2FtcGxlcicpO1xuICAgIGdsLnVuaWZvcm0xaSh5U2FtcGxlclJlZiwgMCk7XG4gICAgdGhpcy55VGV4dHVyZVJlZiA9IHlUZXh0dXJlUmVmO1xuXG4gICAgdmFyIHVUZXh0dXJlUmVmID0gdGhpcy5faW5pdFRleHR1cmUoKTtcbiAgICB2YXIgdVNhbXBsZXJSZWYgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgJ3VTYW1wbGVyJyk7XG4gICAgZ2wudW5pZm9ybTFpKHVTYW1wbGVyUmVmLCAxKTtcbiAgICB0aGlzLnVUZXh0dXJlUmVmID0gdVRleHR1cmVSZWY7XG5cbiAgICB2YXIgdlRleHR1cmVSZWYgPSB0aGlzLl9pbml0VGV4dHVyZSgpO1xuICAgIHZhciB2U2FtcGxlclJlZiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCAndlNhbXBsZXInKTtcbiAgICBnbC51bmlmb3JtMWkodlNhbXBsZXJSZWYsIDIpO1xuICAgIHRoaXMudlRleHR1cmVSZWYgPSB2VGV4dHVyZVJlZjtcbiAgfVxuXG4gIF9pbml0VGV4dHVyZSAoKSB7XG4gICAgdmFyIGdsID0gdGhpcy5jb250ZXh0R0w7XG5cbiAgICB2YXIgdGV4dHVyZVJlZiA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlUmVmKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTkVBUkVTVCk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLk5FQVJFU1QpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpO1xuXG4gICAgcmV0dXJuIHRleHR1cmVSZWY7XG4gIH1cblxuICBfZHJhd1BpY3R1cmVHTCAoZGF0YSwgd2lkdGgsIGhlaWdodCwgeUxpbmVzaXplLCB1dkxpbmVzaXplKSB7XG4gICAgdmFyIHlsZW4gPSB5TGluZXNpemUgKiBoZWlnaHQ7XG4gICAgdmFyIHV2bGVuID0gdXZMaW5lc2l6ZSAqIGhlaWdodCAvIDI7XG4gICAgaWYgKHRoaXMuY2hyb21hID09PSA0NDQgfHwgdGhpcy5jaHJvbWEgPT09IDQyMikge1xuICAgICAgdXZsZW4gKj0gMjtcbiAgICB9XG4gICAgZGF0YSA9IG5ldyBVaW50OEFycmF5KGRhdGEpO1xuICAgIGxldCByZW5kZXJEYXRhID0ge1xuICAgICAgeURhdGE6IGRhdGEuc3ViYXJyYXkoMCwgeWxlbiksXG4gICAgICB1RGF0YTogZGF0YS5zdWJhcnJheSh5bGVuLCB5bGVuICsgdXZsZW4pLFxuICAgICAgdkRhdGE6IGRhdGEuc3ViYXJyYXkoeWxlbiArIHV2bGVuLCB5bGVuICsgdXZsZW4gKyB1dmxlbilcbiAgICB9XG4gICAgdGhpcy5fZHJhd1BpY3R1cmVHTDQyMChyZW5kZXJEYXRhLCB3aWR0aCwgaGVpZ2h0LCB5TGluZXNpemUsIHV2TGluZXNpemUpO1xuICB9XG5cbiAgX2RyYXdQaWN0dXJlR0w0MjAgKGRhdGEsIHdpZHRoLCBoZWlnaHQsIHlMaW5lc2l6ZSwgdXZMaW5lc2l6ZSkge1xuICAgIHZhciBnbCA9IHRoaXMuY29udGV4dEdMO1xuICAgIHZhciB0ZXh0dXJlUG9zQnVmZmVyID0gdGhpcy50ZXh0dXJlUG9zQnVmZmVyO1xuICAgIHZhciB1VGV4dHVyZVBvc0J1ZmZlciA9IHRoaXMudVRleHR1cmVQb3NCdWZmZXI7XG4gICAgdmFyIHZUZXh0dXJlUG9zQnVmZmVyID0gdGhpcy52VGV4dHVyZVBvc0J1ZmZlcjtcblxuICAgIHZhciB5VGV4dHVyZVJlZiA9IHRoaXMueVRleHR1cmVSZWY7XG4gICAgdmFyIHVUZXh0dXJlUmVmID0gdGhpcy51VGV4dHVyZVJlZjtcbiAgICB2YXIgdlRleHR1cmVSZWYgPSB0aGlzLnZUZXh0dXJlUmVmO1xuXG4gICAgdmFyIHlEYXRhID0gZGF0YS55RGF0YTtcbiAgICB2YXIgdURhdGEgPSBkYXRhLnVEYXRhO1xuICAgIHZhciB2RGF0YSA9IGRhdGEudkRhdGE7XG5cbiAgICB2YXIgeURhdGFQZXJSb3cgPSB5TGluZXNpemU7XG4gICAgdmFyIHlSb3dDbnQgPSBoZWlnaHQ7XG5cbiAgICB2YXIgdURhdGFQZXJSb3cgPSB3aWR0aCAvIDI7XG4gICAgdmFyIHVSb3dDbnQgPSBoZWlnaHQgLyAyO1xuXG4gICAgaWYgKHRoaXMuY2hyb21hID09PSA0MjIgfHwgdGhpcy5jaHJvbWEgPT09IDQ0NCkge1xuICAgICAgdVJvd0NudCA9IGhlaWdodDtcbiAgICB9XG5cbiAgICB2YXIgdkRhdGFQZXJSb3cgPSB1dkxpbmVzaXplO1xuICAgIHZhciB2Um93Q250ID0gdVJvd0NudDtcbiAgICBcbiAgICBsZXQgcmF0aW93ID0gdGhpcy5jYW52YXMud2lkdGggLyB0aGlzLndpZHRoO1xuICAgIGxldCByYXRpb2ggPSB0aGlzLmNhbnZhcy5oZWlnaHQgLyB0aGlzLmhlaWdodDtcbiAgICBsZXQgbGVmdCA9IDA7XG4gICAgbGV0IHRvcCA9IDA7XG4gICAgbGV0IHcgPSB0aGlzLmNhbnZhcy53aWR0aDtcbiAgICBsZXQgaCA9IHRoaXMuY2FudmFzLmhlaWdodDtcbiAgICBpZiAocmF0aW93IDwgcmF0aW9oKSB7XG4gICAgICBoID0gKHRoaXMuaGVpZ2h0ICogdGhpcy5jYW52YXMud2lkdGggLyB0aGlzLndpZHRoKTtcbiAgICAgIHRvcCA9IHBhcnNlSW50KCh0aGlzLmNhbnZhcy5oZWlnaHQgLSAodGhpcy5oZWlnaHQgKiB0aGlzLmNhbnZhcy53aWR0aCAvIHRoaXMud2lkdGgpKSAvIDIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3ID0gKHRoaXMud2lkdGggKiB0aGlzLmNhbnZhcy5oZWlnaHQgLyB0aGlzLmhlaWdodCk7XG4gICAgICBsZWZ0ID0gcGFyc2VJbnQoKHRoaXMuY2FudmFzLndpZHRoIC0gKHRoaXMud2lkdGggKiB0aGlzLmNhbnZhcy5oZWlnaHQgLyB0aGlzLmhlaWdodCkpIC8gMik7XG4gICAgfVxuICAgIGdsLnZpZXdwb3J0KGxlZnQsIHRvcCwgdywgaCk7XG5cbiAgICB2YXIgdGV4dHVyZVBvc1ZhbHVlcyA9IG5ldyBGbG9hdDMyQXJyYXkoWzEsIDAsIDAsIDAsIDEsIDEsIDAsIDFdKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGV4dHVyZVBvc0J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHRleHR1cmVQb3NWYWx1ZXMsIGdsLkRZTkFNSUNfRFJBVyk7XG5cbiAgICB2YXIgdVRleHR1cmVQb3NWYWx1ZXMgPSBuZXcgRmxvYXQzMkFycmF5KFsxLCAwLCAwLCAwLCAxLCAxLCAwLCAxXSk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHVUZXh0dXJlUG9zQnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdVRleHR1cmVQb3NWYWx1ZXMsIGdsLkRZTkFNSUNfRFJBVyk7XG5cbiAgICB2YXIgdlRleHR1cmVQb3NWYWx1ZXMgPSBuZXcgRmxvYXQzMkFycmF5KFsxLCAwLCAwLCAwLCAxLCAxLCAwLCAxXSk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHZUZXh0dXJlUG9zQnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdlRleHR1cmVQb3NWYWx1ZXMsIGdsLkRZTkFNSUNfRFJBVyk7XG4gICAgXG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgeVRleHR1cmVSZWYpO1xuICAgIGdsLnRleEltYWdlMkQoZ2wuVEVYVFVSRV8yRCwgMCwgZ2wuTFVNSU5BTkNFLCB5RGF0YVBlclJvdywgeVJvd0NudCwgMCwgZ2wuTFVNSU5BTkNFLCBnbC5VTlNJR05FRF9CWVRFLCB5RGF0YSk7XG5cbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUxKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB1VGV4dHVyZVJlZik7XG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5MVU1JTkFOQ0UsIHVEYXRhUGVyUm93LCB1Um93Q250LCAwLCBnbC5MVU1JTkFOQ0UsIGdsLlVOU0lHTkVEX0JZVEUsIHVEYXRhKTtcbiAgICBcbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUyKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB2VGV4dHVyZVJlZik7XG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5MVU1JTkFOQ0UsIHZEYXRhUGVyUm93LCB2Um93Q250LCAwLCBnbC5MVU1JTkFOQ0UsIGdsLlVOU0lHTkVEX0JZVEUsIHZEYXRhKTtcblxuICAgIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVfU1RSSVAsIDAsIDQpO1xuICB9XG5cbiAgX2RyYXdQaWN0dXJlUkdCIChkYXRhKSB7XG5cbiAgfVxuXG4gIHJlbmRlciAoZGF0YSwgd2lkdGgsIGhlaWdodCwgeUxpbmVzaXplLCB1dkxpbmVzaXplKSB7XG4gICAgdmFyIGdsID0gdGhpcy5jb250ZXh0R0w7XG4gICAgaWYgKGdsKSB7XG4gICAgICB0aGlzLl9kcmF3UGljdHVyZUdMKGRhdGEsIHdpZHRoLCBoZWlnaHQsIHlMaW5lc2l6ZSwgdXZMaW5lc2l6ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RyYXdQaWN0dXJlUkdCKGRhdGEpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBZVVZDYW52YXM7XG4iLCJjb25zdCBpc09iamVjdEZpbGxlZCA9IChvYmopID0+IHtcbiAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgaWYgKG9ialtrZXldID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZWRpYUluZm8ge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5taW1lVHlwZSA9IG51bGxcbiAgICB0aGlzLmR1cmF0aW9uID0gbnVsbFxuXG4gICAgdGhpcy5oYXNWaWRlbyA9IG51bGxcbiAgICB0aGlzLnZpZGVvID0ge1xuICAgICAgY29kZWM6IG51bGwsXG4gICAgICB3aWR0aDogbnVsbCxcbiAgICAgIGhlaWdodDogbnVsbCxcbiAgICAgIHByb2ZpbGU6IG51bGwsXG4gICAgICBsZXZlbDogbnVsbCxcbiAgICAgIGZyYW1lUmF0ZToge1xuICAgICAgICBmaXhlZDogdHJ1ZSxcbiAgICAgICAgZnBzOiAyNSxcbiAgICAgICAgZnBzX251bTogMjUwMDAsXG4gICAgICAgIGZwc19kZW46IDEwMDBcbiAgICAgIH0sXG4gICAgICBjaHJvbWFGb3JtYXQ6IG51bGwsXG4gICAgICBwYXJSYXRpbzoge1xuICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgaGVpZ2h0OiAxXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5oYXNBdWRpbyA9IG51bGxcblxuICAgIHRoaXMuYXVkaW8gPSB7XG4gICAgICBjb2RlYzogbnVsbCxcbiAgICAgIHNhbXBsZVJhdGU6IG51bGwsXG4gICAgICBzYW1wbGVSYXRlSW5kZXg6IG51bGwsXG4gICAgICBjaGFubmVsQ291bnQ6IG51bGxcbiAgICB9XG4gIH1cblxuICBpc0NvbXBsZXRlICgpIHtcbiAgICByZXR1cm4gTWVkaWFJbmZvLmlzQmFzZUluZm9SZWFkeSh0aGlzKSAmJiBNZWRpYUluZm8uaXNWaWRlb1JlYWR5KHRoaXMpICYmIE1lZGlhSW5mby5pc0F1ZGlvUmVhZHkodGhpcylcbiAgfVxuXG4gIHN0YXRpYyBpc0Jhc2VJbmZvUmVhZHkgKG1lZGlhSW5mbykge1xuICAgIHJldHVybiBpc09iamVjdEZpbGxlZChtZWRpYUluZm8pXG4gIH1cblxuICBzdGF0aWMgaXNWaWRlb1JlYWR5IChtZWRpYUluZm8pIHtcbiAgICBpZiAoIW1lZGlhSW5mby5oYXNWaWRlbykge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4gaXNPYmplY3RGaWxsZWQobWVkaWFJbmZvLnZpZGVvKVxuICB9XG5cbiAgc3RhdGljIGlzQXVkaW9SZWFkeSAobWVkaWFJbmZvKSB7XG4gICAgaWYgKCFtZWRpYUluZm8uaGFzQXVkaW8pIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgcmV0dXJuIGlzT2JqZWN0RmlsbGVkKG1lZGlhSW5mby52aWRlbylcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVkaWFTYW1wbGUge1xuICBjb25zdHJ1Y3RvciAoaW5mbykge1xuICAgIGxldCBfZGVmYXVsdCA9IE1lZGlhU2FtcGxlLmdldERlZmF1bHRJbmYoKVxuXG4gICAgaWYgKCFpbmZvIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbmZvKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICAgIHJldHVybiBfZGVmYXVsdFxuICAgIH1cbiAgICBsZXQgc2FtcGxlID0gT2JqZWN0LmFzc2lnbih7fSwgX2RlZmF1bHQsIGluZm8pXG5cbiAgICBPYmplY3QuZW50cmllcyhzYW1wbGUpLmZvckVhY2goKFtrLCB2XSkgPT4ge1xuICAgICAgdGhpc1trXSA9IHZcbiAgICB9KVxuICB9XG5cbiAgc3RhdGljIGdldERlZmF1bHRJbmYgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkdHM6IG51bGwsXG4gICAgICBwdHM6IG51bGwsXG4gICAgICBkdXJhdGlvbjogbnVsbCxcbiAgICAgIHBvc2l0aW9uOiBudWxsLFxuICAgICAgaXNSQVA6IGZhbHNlLCAvLyBpcyBSYW5kb20gYWNjZXNzIHBvaW50XG4gICAgICBvcmlnaW5EdHM6IG51bGxcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lZGlhU2VnbWVudExpc3Qge1xuXG4gICAgY29uc3RydWN0b3IgKHR5cGUpIHtcbiAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuX2xpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5fbGFzdEFwcGVuZExvY2F0aW9uID0gLTE7IC8vIGNhY2hlZCBsYXN0IGluc2VydCBsb2NhdGlvblxuICAgIH1cblxuICAgIGdldCB0eXBlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gICAgfVxuXG4gICAgZ2V0IGxlbmd0aCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0Lmxlbmd0aDtcbiAgICB9XG5cbiAgICBpc0VtcHR5ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3QubGVuZ3RoID09PSAwO1xuICAgIH1cblxuICAgIGNsZWFyICgpIHtcbiAgICAgICAgdGhpcy5fbGlzdCA9IFtdO1xuICAgICAgICB0aGlzLl9sYXN0QXBwZW5kTG9jYXRpb24gPSAtMTtcbiAgICB9XG5cbiAgICBfc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUgKGJlZ2luRHRzKSB7XG4gICAgICAgIGxldCBsaXN0ID0gdGhpcy5fbGlzdDtcbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gLTI7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxhc3QgPSBsaXN0Lmxlbmd0aCAtIDE7XG4gICAgICAgIGxldCBtaWQgPSAwO1xuICAgICAgICBsZXQgbGJvdW5kID0gMDtcbiAgICAgICAgbGV0IHVib3VuZCA9IGxhc3Q7XG5cbiAgICAgICAgbGV0IGlkeCA9IDA7XG5cbiAgICAgICAgaWYgKGJlZ2luRHRzIDwgbGlzdFswXS5vcmlnaW5EdHMpIHtcbiAgICAgICAgICAgIGlkeCA9IC0xO1xuICAgICAgICAgICAgcmV0dXJuIGlkeDtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChsYm91bmQgPD0gdWJvdW5kKSB7XG4gICAgICAgICAgICBtaWQgPSBsYm91bmQgKyBNYXRoLmZsb29yKCh1Ym91bmQgLSBsYm91bmQpIC8gMik7XG4gICAgICAgICAgICBpZiAobWlkID09PSBsYXN0IHx8IChiZWdpbkR0cyA+IGxpc3RbbWlkXS5sYXN0U2FtcGxlLm9yaWdpbkR0c1xuICAgICAgICAgICAgICAgICAgICAmJiAoYmVnaW5EdHMgPCBsaXN0W21pZCArIDFdLm9yaWdpbkR0cykpKSB7XG4gICAgICAgICAgICAgICAgaWR4ID0gbWlkO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsaXN0W21pZF0ub3JpZ2luRHRzIDwgYmVnaW5EdHMpIHtcbiAgICAgICAgICAgICAgICBsYm91bmQgPSBtaWQgKyAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB1Ym91bmQgPSBtaWQgLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpZHg7XG4gICAgfVxuXG4gICAgX3NlYXJjaE5lYXJlc3RTZWdtZW50QWZ0ZXIgKGJlZ2luRHRzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWFyY2hOZWFyZXN0U2VnbWVudEJlZm9yZShiZWdpbkR0cykgKyAxO1xuICAgIH1cblxuICAgIGFwcGVuZCAoc2VnbWVudCkge1xuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuX2xpc3Q7XG4gICAgICAgIGxldCBsYXN0QXBwZW5kSWR4ID0gdGhpcy5fbGFzdEFwcGVuZExvY2F0aW9uO1xuICAgICAgICBsZXQgaW5zZXJ0SWR4ID0gMDtcblxuICAgICAgICBpZiAobGFzdEFwcGVuZElkeCAhPT0gLTEgJiYgbGFzdEFwcGVuZElkeCA8IGxpc3QubGVuZ3RoXG4gICAgICAgICAgICAmJiBzZWdtZW50Lm9yaWdpblN0YXJ0RHRzID49IGxpc3RbbGFzdEFwcGVuZElkeF0ubGFzdFNhbXBsZS5vcmlnaW5EdHNcbiAgICAgICAgICAgICYmICgobGFzdEFwcGVuZElkeCA9PT0gbGlzdC5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICAgIHx8IChsYXN0QXBwZW5kSWR4IDwgbGlzdC5sZW5ndGggLSAxXG4gICAgICAgICAgICAgICAgICAgICYmIHNlZ21lbnQub3JpZ2luU3RhcnREdHMgPCBsaXN0W2xhc3RBcHBlbmRJZHggKyAxXS5vcmlnaW5TdGFydER0cykpKSB7XG4gICAgICAgICAgICBpbnNlcnRJZHggPSBsYXN0QXBwZW5kSWR4ICsgMTsgLy8gdXNlIGNhY2hlZCBsb2NhdGlvbiBpZHhcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChsaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBpbnNlcnRJZHggPSB0aGlzLl9zZWFyY2hOZWFyZXN0U2VnbWVudEJlZm9yZShzZWdtZW50Lm9yaWdpblN0YXJ0RHRzKSArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9sYXN0QXBwZW5kTG9jYXRpb24gPSBpbnNlcnRJZHg7XG4gICAgICAgIHRoaXMuX2xpc3Quc3BsaWNlKGluc2VydElkeCwgMCwgc2VnbWVudCk7XG4gICAgfVxuXG4gICAgZ2V0TGFzdFNlZ21lbnRCZWZvcmUgKGJlZ2luRHRzKSB7XG4gICAgICAgIGxldCBpZHggPSB0aGlzLl9zZWFyY2hOZWFyZXN0U2VnbWVudEJlZm9yZShiZWdpbkR0cyk7XG4gICAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RbaWR4XTtcbiAgICAgICAgfSBlbHNlIHsgLy8gLTFcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TGFzdFNhbXBsZUJlZm9yZSAoYmVnaW5EdHMpIHtcbiAgICAgICAgbGV0IHNlZ21lbnQgPSB0aGlzLmdldExhc3RTZWdtZW50QmVmb3JlKGJlZ2luRHRzKTtcbiAgICAgICAgaWYgKHNlZ21lbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWdtZW50Lmxhc3RTYW1wbGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldExhc3RSQVBCZWZvcmUgKGJlZ2luRHRzKSB7XG4gICAgICAgIGxldCBzZWdtZW50SWR4ID0gdGhpcy5fc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUoYmVnaW5EdHMpO1xuICAgICAgICBsZXQgcmFuZG9tQWNjZXNzUG9pbnRzID0gdGhpcy5fbGlzdFtzZWdtZW50SWR4XS5yYW5kb21BY2Nlc3NQb2ludHM7XG4gICAgICAgIHdoaWxlIChyYW5kb21BY2Nlc3NQb2ludHMubGVuZ3RoID09PSAwICYmIHNlZ21lbnRJZHggPiAwKSB7XG4gICAgICAgICAgICBzZWdtZW50SWR4LS07XG4gICAgICAgICAgICByYW5kb21BY2Nlc3NQb2ludHMgPSB0aGlzLl9saXN0W3NlZ21lbnRJZHhdLnJhbmRvbUFjY2Vzc1BvaW50cztcbiAgICAgICAgfVxuICAgICAgICBpZiAocmFuZG9tQWNjZXNzUG9pbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiByYW5kb21BY2Nlc3NQb2ludHNbcmFuZG9tQWNjZXNzUG9pbnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNZWRpYVNlZ21lbnQge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgdGhpcy5zdGFydER0cyA9IC0xO1xuICAgICAgICB0aGlzLmVuZER0cyA9IC0xO1xuICAgICAgICB0aGlzLnN0YXJ0UHRzID0gLTE7XG4gICAgICAgIHRoaXMuZW5kUHRzID0gLTE7XG4gICAgICAgIHRoaXMub3JpZ2luU3RhcnREdHMgPSAtMTtcbiAgICAgICAgdGhpcy5vcmlnaW5FbmREdHMgPSAtMTtcbiAgICAgICAgdGhpcy5yYW5kb21BY2Nlc3NQb2ludHMgPSBbXTtcbiAgICAgICAgdGhpcy5maXJzdFNhbXBsZSA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdFNhbXBsZSA9IG51bGw7XG4gICAgfVxuXG4gICAgYWRkUkFQIChzYW1wbGUpIHtcbiAgICAgICAgc2FtcGxlLmlzUkFQID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yYW5kb21BY2Nlc3NQb2ludHMucHVzaChzYW1wbGUpO1xuICAgIH1cbn0iLCJleHBvcnQgY2xhc3MgQXVkaW9UcmFja01ldGEge1xuICBjb25zdHJ1Y3RvciAobWV0YSkge1xuICAgIGNvbnN0IF9kZWZhdWx0ID0ge1xuICAgICAgc2FtcGxlUmF0ZTogNDgwMDAsXG4gICAgICBjaGFubmVsQ291bnQ6IDIsXG4gICAgICBjb2RlYzogJ21wNGEuNDAuMicsXG4gICAgICBjb25maWc6IFs0MSwgNDAxLCAxMzYsIDBdLFxuICAgICAgZHVyYXRpb246IDAsXG4gICAgICBpZDogMixcbiAgICAgIHJlZlNhbXBsZUR1cmF0aW9uOiAyMSxcbiAgICAgIHNhbXBsZVJhdGVJbmRleDogMyxcbiAgICAgIHRpbWVzY2FsZTogMTAwMCxcbiAgICAgIHR5cGU6ICdhdWRpbydcbiAgICB9XG4gICAgaWYgKG1ldGEpIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBfZGVmYXVsdCwgbWV0YSlcbiAgICB9XG4gICAgcmV0dXJuIF9kZWZhdWx0XG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmluaXQgPSBudWxsXG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFZpZGVvVHJhY2tNZXRhIHtcbiAgY29uc3RydWN0b3IgKG1ldGEpIHtcbiAgICBjb25zdCBfZGVmYXVsdCA9IHtcbiAgICAgIGF2Y2M6IG51bGwsXG4gICAgICBzcHM6IG5ldyBVaW50OEFycmF5KDApLFxuICAgICAgcHBzOiBuZXcgVWludDhBcnJheSgwKSxcbiAgICAgIGNocm9tYUZvcm1hdDogNDIwLFxuICAgICAgY29kZWM6ICdhdmMxLjY0MDAyMCcsXG4gICAgICBjb2RlY0hlaWdodDogNzIwLFxuICAgICAgY29kZWNXaWR0aDogMTI4MCxcbiAgICAgIGR1cmF0aW9uOiAwLFxuICAgICAgZnJhbWVSYXRlOiB7XG4gICAgICAgIGZpeGVkOiB0cnVlLFxuICAgICAgICBmcHM6IDI1LFxuICAgICAgICBmcHNfbnVtOiAyNTAwMCxcbiAgICAgICAgZnBzX2RlbjogMTAwMFxuICAgICAgfSxcbiAgICAgIGlkOiAxLFxuICAgICAgbGV2ZWw6ICczLjInLFxuICAgICAgcHJlc2VudEhlaWdodDogNzIwLFxuICAgICAgcHJlc2VudFdpZHRoOiAxMjgwLFxuICAgICAgcHJvZmlsZTogJ0hpZ2gnLFxuICAgICAgcmVmU2FtcGxlRHVyYXRpb246IDQwLFxuICAgICAgcGFyUmF0aW86IHtcbiAgICAgICAgaGVpZ2h0OiAxLFxuICAgICAgICB3aWR0aDogMVxuICAgICAgfSxcbiAgICAgIHRpbWVzY2FsZTogMTAwMCxcbiAgICAgIHR5cGU6ICd2aWRlbydcbiAgICB9XG5cbiAgICBpZiAobWV0YSkge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIF9kZWZhdWx0LCBtZXRhKVxuICAgIH1cbiAgICByZXR1cm4gX2RlZmF1bHRcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuaW5pdCA9IG51bGxcbiAgICB0aGlzLnNwcyA9IG51bGxcbiAgICB0aGlzLnBwcyA9IG51bGxcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEF1ZGlvVHJhY2tTYW1wbGUge1xuICBjb25zdHJ1Y3RvciAoaW5mbykge1xuICAgIGxldCBfZGVmYXVsdCA9IEF1ZGlvVHJhY2tTYW1wbGUuZ2V0RGVmYXVsdCgpXG4gICAgaWYgKCFpbmZvKSB7XG4gICAgICByZXR1cm4gX2RlZmF1bHRcbiAgICB9XG4gICAgbGV0IHNhbXBsZSA9IE9iamVjdC5hc3NpZ24oe30sIF9kZWZhdWx0LCBpbmZvKVxuXG4gICAgcmV0dXJuIHNhbXBsZVxuICB9XG5cbiAgc3RhdGljIGdldERlZmF1bHQgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkdHM6IG51bGwsXG4gICAgICBwdHM6IG51bGwsXG4gICAgICBkYXRhOiBuZXcgVWludDhBcnJheSgpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWaWRlb1RyYWNrU2FtcGxlIHtcbiAgY29uc3RydWN0b3IgKGluZm8pIHtcbiAgICBsZXQgX2RlZmF1bHQgPSBWaWRlb1RyYWNrU2FtcGxlLmdldERlZmF1bHQoKVxuXG4gICAgaWYgKCFpbmZvKSB7XG4gICAgICByZXR1cm4gX2RlZmF1bHRcbiAgICB9XG4gICAgbGV0IHNhbXBsZSA9IE9iamVjdC5hc3NpZ24oe30sIF9kZWZhdWx0LCBpbmZvKVxuXG4gICAgcmV0dXJuIHNhbXBsZVxuICB9XG5cbiAgc3RhdGljIGdldERlZmF1bHQgKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkdHM6IG51bGwsXG4gICAgICBwdHM6IG51bGwsXG4gICAgICBpc0tleWZyYW1lOiBmYWxzZSwgLy8gaXMgUmFuZG9tIGFjY2VzcyBwb2ludFxuICAgICAgb3JpZ2luRHRzOiBudWxsLFxuICAgICAgZGF0YTogbmV3IFVpbnQ4QXJyYXkoKVxuICAgIH1cbiAgfVxufVxuIiwiY2xhc3MgTVNFIHtcbiAgY29uc3RydWN0b3IgKGNvbmZpZ3MpIHtcbiAgICB0aGlzLmNvbmZpZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWdzKTtcbiAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXMuY29uZmlncy5jb250YWluZXI7XG4gICAgdGhpcy5tZWRpYVNvdXJjZSA9IG51bGw7XG4gICAgdGhpcy5zb3VyY2VCdWZmZXJzID0ge307XG4gICAgdGhpcy5wcmVsb2FkVGltZSA9IHRoaXMuY29uZmlncy5wcmVsb2FkVGltZSB8fCAxO1xuICAgIHRoaXMub25Tb3VyY2VPcGVuID0gdGhpcy5vblNvdXJjZU9wZW4uYmluZCh0aGlzKVxuICAgIHRoaXMub25UaW1lVXBkYXRlID0gdGhpcy5vblRpbWVVcGRhdGUuYmluZCh0aGlzKVxuICAgIHRoaXMub25VcGRhdGVFbmQgPSB0aGlzLm9uVXBkYXRlRW5kLmJpbmQodGhpcylcbiAgICB0aGlzLm9uV2FpdGluZyA9IHRoaXMub25XYWl0aW5nLmJpbmQodGhpcylcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIHRoaXMubWVkaWFTb3VyY2UgPSBuZXcgc2VsZi5NZWRpYVNvdXJjZSgpO1xuICAgIHRoaXMubWVkaWFTb3VyY2UuYWRkRXZlbnRMaXN0ZW5lcignc291cmNlb3BlbicsIHRoaXMub25Tb3VyY2VPcGVuKTtcbiAgICB0aGlzLmNvbnRhaW5lci5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHRoaXMubWVkaWFTb3VyY2UpO1xuICAgIHRoaXMudXJsID0gdGhpcy5jb250YWluZXIuc3JjO1xuICAgIHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RpbWV1cGRhdGUnLCB0aGlzLm9uVGltZVVwZGF0ZSk7XG4gICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignd2FpdGluZycsIHRoaXMub25XYWl0aW5nKTtcbiAgfVxuXG4gIG9uVGltZVVwZGF0ZSAoKSB7XG4gICAgdGhpcy5lbWl0KCdUSU1FX1VQREFURScsIHRoaXMuY29udGFpbmVyKTtcbiAgfVxuXG4gIG9uV2FpdGluZyAoKSB7XG4gICAgdGhpcy5lbWl0KCdXQUlUSU5HJywgdGhpcy5jb250YWluZXIpO1xuICB9XG5cbiAgb25Tb3VyY2VPcGVuICgpIHtcbiAgICB0aGlzLmFkZFNvdXJjZUJ1ZmZlcnMoKTtcbiAgfVxuXG4gIG9uVXBkYXRlRW5kICgpIHtcbiAgICB0aGlzLmVtaXQoJ1NPVVJDRV9VUERBVEVfRU5EJyk7XG4gICAgdGhpcy5kb0FwcGVuZCgpXG4gIH1cbiAgYWRkU291cmNlQnVmZmVycyAoKSB7XG4gICAgaWYgKHRoaXMubWVkaWFTb3VyY2UucmVhZHlTdGF0ZSAhPT0gJ29wZW4nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBzb3VyY2VzID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnUFJFX1NPVVJDRV9CVUZGRVInKTtcbiAgICBsZXQgdHJhY2tzID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJyk7XG4gICAgbGV0IHRyYWNrO1xuXG4gICAgc291cmNlcyA9IHNvdXJjZXMuc291cmNlcztcbiAgICBsZXQgYWRkID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDAsIGsgPSBPYmplY3Qua2V5cyhzb3VyY2VzKS5sZW5ndGg7IGkgPCBrOyBpKyspIHtcbiAgICAgIGxldCB0eXBlID0gT2JqZWN0LmtleXMoc291cmNlcylbaV07XG4gICAgICBpZiAodHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgICB0cmFjayA9IHRyYWNrcy5hdWRpb1RyYWNrO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAndmlkZW8nKSB7XG4gICAgICAgIHRyYWNrID0gdHJhY2tzLnZpZGVvVHJhY2s7XG4gICAgICAgIC8vIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0cmFjaykge1xuICAgICAgICBsZXQgZHVyID0gdHlwZSA9PT0gJ2F1ZGlvJyA/IDIxIDogNDA7XG4gICAgICAgIGlmICh0cmFjay5tZXRhICYmIHRyYWNrLm1ldGEucmVmU2FtcGxlRHVyYXRpb24pIGR1ciA9IHRyYWNrLm1ldGEucmVmU2FtcGxlRHVyYXRpb247XG4gICAgICAgIGlmIChzb3VyY2VzW3R5cGVdLmRhdGEubGVuZ3RoID49ICh0aGlzLnByZWxvYWRUaW1lIC8gZHVyKSkge1xuICAgICAgICAgIGFkZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYWRkKSB7XG4gICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAwLCBrID0gT2JqZWN0LmtleXMoc291cmNlcykubGVuZ3RoOyBpIDwgazsgaSsrKSB7XG4gICAgICAgIGxldCB0eXBlID0gT2JqZWN0LmtleXMoc291cmNlcylbaV07XG4gICAgICAgIGxldCBzb3VyY2UgPSBzb3VyY2VzW3R5cGVdXG4gICAgICAgIGxldCBtaW1lID0gKHR5cGUgPT09ICd2aWRlbycpID8gJ3ZpZGVvL21wNDtjb2RlY3M9JyArIHNvdXJjZS5taW1ldHlwZSA6ICdhdWRpby9tcDQ7Y29kZWNzPScgKyBzb3VyY2UubWltZXR5cGVcbiAgICAgICAgbGV0IHNvdXJjZUJ1ZmZlciA9IHRoaXMubWVkaWFTb3VyY2UuYWRkU291cmNlQnVmZmVyKG1pbWUpO1xuICAgICAgICB0aGlzLnNvdXJjZUJ1ZmZlcnNbdHlwZV0gPSBzb3VyY2VCdWZmZXI7XG4gICAgICAgIHNvdXJjZUJ1ZmZlci5hZGRFdmVudExpc3RlbmVyKCd1cGRhdGVlbmQnLCB0aGlzLm9uVXBkYXRlRW5kKTtcbiAgICAgICAgdGhpcy5kb0FwcGVuZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRvQXBwZW5kICgpIHtcbiAgICBsZXQgc291cmNlcyA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1BSRV9TT1VSQ0VfQlVGRkVSJyk7XG4gICAgaWYgKHNvdXJjZXMpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKS5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgdHlwZSA9IE9iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycylbaV1cbiAgICAgICAgbGV0IHNvdXJjZUJ1ZmZlciA9IHRoaXMuc291cmNlQnVmZmVyc1t0eXBlXTtcbiAgICAgICAgaWYgKCFzb3VyY2VCdWZmZXIudXBkYXRpbmcpIHtcbiAgICAgICAgICBsZXQgc291cmNlID0gc291cmNlcy5zb3VyY2VzW3R5cGVdO1xuICAgICAgICAgIGlmIChzb3VyY2UgJiYgIXNvdXJjZS5pbml0ZWQpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdhcHBlbmQgaW5pdGlhbCBzZWdtZW50JylcbiAgICAgICAgICAgIHNvdXJjZUJ1ZmZlci5hcHBlbmRCdWZmZXIoc291cmNlLmluaXQuYnVmZmVyLmJ1ZmZlcik7XG4gICAgICAgICAgICBzb3VyY2UuaW5pdGVkID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNvdXJjZSkge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSBzb3VyY2UuZGF0YS5zaGlmdCgpXG4gICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICBzb3VyY2VCdWZmZXIuYXBwZW5kQnVmZmVyKGRhdGEuYnVmZmVyLmJ1ZmZlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZW5kT2ZTdHJlYW0gKCkge1xuICAgIGNvbnN0IHsgcmVhZHlTdGF0ZSwgYWN0aXZlU291cmNlQnVmZmVycyB9ID0gdGhpcy5tZWRpYVNvdXJjZTtcbiAgICBpZiAocmVhZHlTdGF0ZSA9PT0gJ29wZW4nICYmIGFjdGl2ZVNvdXJjZUJ1ZmZlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLm1lZGlhU291cmNlLmVuZE9mU3RyZWFtKClcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gbG9nXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlIChlbmQsIHN0YXJ0ID0gMCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKS5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGJ1ZmZlciA9IHRoaXMuc291cmNlQnVmZmVyc1tPYmplY3Qua2V5cyh0aGlzLnNvdXJjZUJ1ZmZlcnMpW2ldXTtcbiAgICAgIGlmICghYnVmZmVyLnVwZGF0aW5nKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHN0YXJ0LCBlbmQpXG4gICAgICAgIGJ1ZmZlci5yZW1vdmUoc3RhcnQsIGVuZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJlbW92ZUJ1ZmZlcnMgKCkge1xuICAgIGNvbnN0IHRhc2tMaXN0ID0gW11cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE9iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycykubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBidWZmZXIgPSB0aGlzLnNvdXJjZUJ1ZmZlcnNbT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKVtpXV07XG4gICAgICBidWZmZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndXBkYXRlZW5kJywgdGhpcy5vblVwZGF0ZUVuZCk7XG5cbiAgICAgIGxldCB0YXNrO1xuICAgICAgaWYgKGJ1ZmZlci51cGRhdGluZykge1xuICAgICAgICB0YXNrID0gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICBjb25zdCBkb0NsZWFuQnVmZmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IHJldHJ5VGltZSA9IDNcblxuICAgICAgICAgICAgY29uc3QgY2xlYW4gPSAoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghYnVmZmVyLnVwZGF0aW5nKSB7XG4gICAgICAgICAgICAgICAgTVNFLmNsZWFyQnVmZmVyKGJ1ZmZlcilcbiAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXRyeVRpbWUgPiAwKXtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGNsZWFuLCAyMDApXG4gICAgICAgICAgICAgICAgcmV0cnlUaW1lLS1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGNsZWFuLCAyMDApXG4gICAgICAgICAgICBidWZmZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndXBkYXRlZW5kJywgZG9DbGVhbkJ1ZmZlcilcbiAgICAgICAgICB9XG4gICAgICAgICAgYnVmZmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3VwZGF0ZWVuZCcsIGRvQ2xlYW5CdWZmZXIpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBNU0UuY2xlYXJCdWZmZXIoYnVmZmVyKVxuICAgICAgICB0YXNrID0gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgIH1cblxuICAgICAgdGFza0xpc3QucHVzaCh0YXNrKVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLmFsbCh0YXNrTGlzdClcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHJldHVybiB0aGlzLnJlbW92ZUJ1ZmZlcnMoKS50aGVuKCgpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKS5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgYnVmZmVyID0gdGhpcy5zb3VyY2VCdWZmZXJzW09iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycylbaV1dO1xuICAgICAgICB0aGlzLm1lZGlhU291cmNlLnJlbW92ZVNvdXJjZUJ1ZmZlcihidWZmZXIpO1xuICAgICAgICBkZWxldGUgdGhpcy5zb3VyY2VCdWZmZXJzW09iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycylbaV1dO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgdGhpcy5vblRpbWVVcGRhdGUpO1xuICAgICAgdGhpcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2FpdGluZycsIHRoaXMub25XYWl0aW5nKTtcbiAgICAgIHRoaXMubWVkaWFTb3VyY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcignc291cmNlb3BlbicsIHRoaXMub25Tb3VyY2VPcGVuKTtcblxuICAgICAgdGhpcy5lbmRPZlN0cmVhbSgpXG4gICAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTCh0aGlzLnVybCk7XG5cbiAgICAgIHRoaXMudXJsID0gbnVsbFxuICAgICAgdGhpcy5jb25maWdzID0ge307XG4gICAgICB0aGlzLmNvbnRhaW5lciA9IG51bGw7XG4gICAgICB0aGlzLm1lZGlhU291cmNlID0gbnVsbDtcbiAgICAgIHRoaXMuc291cmNlQnVmZmVycyA9IHt9O1xuICAgICAgdGhpcy5wcmVsb2FkVGltZSA9IDE7XG4gICAgfSlcbiAgfVxuXG4gIHN0YXRpYyBjbGVhckJ1ZmZlciAoYnVmZmVyKSB7XG4gICAgY29uc3QgYnVmZmVyZWQgPSBidWZmZXIuYnVmZmVyZWQ7XG4gICAgbGV0IGJFbmQgPSAwLjFcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYnVmZmVyZWQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGJFbmQgPSBidWZmZXJlZC5lbmQoaSlcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGJ1ZmZlci5yZW1vdmUoMCwgYkVuZClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBETyBOT1RISU5HXG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBNU0U7XG4iLCJpbXBvcnQgQ29uY2F0IGZyb20gJ2NvbmNhdC10eXBlZC1hcnJheSdcblxuY2xhc3MgQnVmZmVyIHtcbiAgY29uc3RydWN0b3IgKGJ1ZmZlcikge1xuICAgIHRoaXMuYnVmZmVyID0gYnVmZmVyIHx8IG5ldyBVaW50OEFycmF5KDApXG4gIH1cblxuICB3cml0ZSAoLi4uYnVmZmVyKSB7XG4gICAgYnVmZmVyLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICB0aGlzLmJ1ZmZlciA9IENvbmNhdChVaW50OEFycmF5LCB0aGlzLmJ1ZmZlciwgaXRlbSlcbiAgICB9KVxuICB9XG5cbiAgc3RhdGljIHdyaXRlVWludDMyICh2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgVWludDhBcnJheShbXG4gICAgICB2YWx1ZSA+PiAyNCxcbiAgICAgICh2YWx1ZSA+PiAxNikgJiAweGZmLFxuICAgICAgKHZhbHVlID4+IDgpICYgMHhmZixcbiAgICAgIHZhbHVlICYgMHhmZlxuICAgIF0pXG4gIH1cblxuICBzdGF0aWMgcmVhZEFzSW50IChhcnIpIHtcbiAgICBsZXQgdGVtcCA9ICcnXG5cbiAgICBmdW5jdGlvbiBwYWRTdGFydDRIZXggKGhleE51bSkge1xuICAgICAgbGV0IGhleFN0ciA9IGhleE51bS50b1N0cmluZygxNilcbiAgICAgIHJldHVybiBoZXhTdHIucGFkU3RhcnQoMiwgJzAnKVxuICAgIH1cblxuICAgIGFyci5mb3JFYWNoKG51bSA9PiB7XG4gICAgICB0ZW1wICs9IHBhZFN0YXJ0NEhleChudW0pXG4gICAgfSlcbiAgICByZXR1cm4gcGFyc2VJbnQodGVtcCwgMTYpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQnVmZmVyXG4iLCJjbGFzcyBTdHJlYW0ge1xuICBjb25zdHJ1Y3RvciAoYnVmZmVyKSB7XG4gICAgaWYgKGJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICB0aGlzLmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgIHRoaXMuZGF0YXZpZXcgPSBuZXcgRGF0YVZpZXcoYnVmZmVyKTtcbiAgICAgIHRoaXMuZGF0YXZpZXcucG9zaXRpb24gPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RhdGEgaXMgaW52YWxpZCcpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBsZW5ndGggKCkge1xuICAgIHJldHVybiB0aGlzLmJ1ZmZlci5ieXRlTGVuZ3RoO1xuICB9XG5cbiAgc2V0IHBvc2l0aW9uICh2YWx1ZSkge1xuICAgIHRoaXMuZGF0YXZpZXcucG9zaXRpb24gPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBwb3NpdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YXZpZXcucG9zaXRpb247XG4gIH1cblxuICBiYWNrIChjb3VudCkge1xuICAgIHRoaXMucG9zaXRpb24gLT0gY291bnQ7XG4gIH1cblxuICBza2lwIChjb3VudCkge1xuICAgIGxldCBsb29wID0gTWF0aC5mbG9vcihjb3VudCAvIDQpO1xuICAgIGxldCBsYXN0ID0gY291bnQgJSA0O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbG9vcDsgaSsrKSB7XG4gICAgICBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgNCk7XG4gICAgfVxuICAgIGlmIChsYXN0ID4gMCkge1xuICAgICAgU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIGxhc3QpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBbcmVhZEJ5dGUg5LuORGF0YVZpZXfkuK3or7vlj5bmlbDmja5dXG4gICAqIEBwYXJhbSAge0RhdGFWaWV3fSBidWZmZXIgW0RhdGFWaWV35a6e5L6LXVxuICAgKiBAcGFyYW0gIHtOdW1iZXJ9IHNpemUgICBb6K+75Y+W5a2X6IqC5pWwXVxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9ICAgICAgICBb5pW05pWwXVxuICAgKi9cbiAgc3RhdGljIHJlYWRCeXRlIChidWZmZXIsIHNpemUsIHNpZ24pIHtcbiAgICBsZXQgcmVzO1xuICAgIHN3aXRjaCAoc2l6ZSkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICBpZiAoc2lnbikge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRJbnQ4KGJ1ZmZlci5wb3NpdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzID0gYnVmZmVyLmdldFVpbnQ4KGJ1ZmZlci5wb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGlmIChzaWduKSB7XG4gICAgICAgICAgcmVzID0gYnVmZmVyLmdldEludDE2KGJ1ZmZlci5wb3NpdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzID0gYnVmZmVyLmdldFVpbnQxNihidWZmZXIucG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBpZiAoc2lnbikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IHN1cHBvcnRlZCBmb3IgcmVhZEJ5dGUgMycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRVaW50OChidWZmZXIucG9zaXRpb24pIDw8IDE2O1xuICAgICAgICAgIHJlcyB8PSBidWZmZXIuZ2V0VWludDgoYnVmZmVyLnBvc2l0aW9uICsgMSkgPDwgODtcbiAgICAgICAgICByZXMgfD0gYnVmZmVyLmdldFVpbnQ4KGJ1ZmZlci5wb3NpdGlvbiArIDIpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0OlxuICAgICAgICBpZiAoc2lnbikge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRJbnQzMihidWZmZXIucG9zaXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRVaW50MzIoYnVmZmVyLnBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgODpcbiAgICAgICAgaWYgKHNpZ24pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBzdXBwb3J0ZWQgZm9yIHJlYWRCb2R5IDgnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXMgPSBidWZmZXIuZ2V0VWludDMyKGJ1ZmZlci5wb3NpdGlvbikgPDwgMzI7XG4gICAgICAgICAgcmVzIHw9IGJ1ZmZlci5nZXRVaW50MzIoYnVmZmVyLnBvc2l0aW9uICsgNCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXMgPSAnJztcbiAgICB9XG4gICAgYnVmZmVyLnBvc2l0aW9uICs9IHNpemU7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIHJlYWRVaW50OCAoKSB7XG4gICAgcmV0dXJuIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCAxKTtcbiAgfVxuXG4gIHJlYWRVaW50MTYgKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgMik7XG4gIH1cblxuICByZWFkVWludDI0ICgpIHtcbiAgICByZXR1cm4gU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIDMpO1xuICB9XG5cbiAgcmVhZFVpbnQzMiAoKSB7XG4gICAgcmV0dXJuIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCA0KTtcbiAgfVxuXG4gIHJlYWRVaW50NjQgKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgOCk7XG4gIH1cblxuICByZWFkSW50OCAoKSB7XG4gICAgcmV0dXJuIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCAxLCB0cnVlKTtcbiAgfVxuICByZWFkSW50MTYgKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgMiwgdHJ1ZSk7XG4gIH1cblxuICByZWFkSW50MzIgKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgNCwgdHJ1ZSk7XG4gIH1cblxuICB3cml0ZVVpbnQzMiAodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgdmFsdWUgPj4+IDI0ICYgMHhmZixcbiAgICAgIHZhbHVlID4+PiAxNiAmIDB4ZmYsXG4gICAgICB2YWx1ZSA+Pj4gOCAmIDB4ZmYsXG4gICAgICB2YWx1ZSAmIDB4ZmZcbiAgICBdKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdHJlYW07XG4iLCJpbXBvcnQgeyBGZXRjaExvYWRlciB9IGZyb20gJ3hncGxheWVyLWxvYWRlcidcbmltcG9ydCB7IEZsdkRlbXV4ZXIgfSBmcm9tICd4Z3BsYXllci1kZW11eCdcbmltcG9ydCB7IE1wNFJlbXV4ZXIgfSBmcm9tICd4Z3BsYXllci1yZW11eCdcbmltcG9ydCB7IFRyYWNrcywgWGdCdWZmZXIsIFByZVNvdXJjZSB9IGZyb20gJ3hncGxheWVyLWJ1ZmZlcidcbmltcG9ydCB7IEVWRU5UUywgUGFnZVZpc2liaWxpdHkgfSBmcm9tICd4Z3BsYXllci11dGlscydcbmltcG9ydCB7IENvbXBhdGliaWxpdHkgfSBmcm9tICd4Z3BsYXllci1jb2RlYydcbmltcG9ydCBQbGF5ZXIgZnJvbSAneGdwbGF5ZXInXG5cbmNvbnN0IERFTVVYX0VWRU5UUyA9IEVWRU5UUy5ERU1VWF9FVkVOVFM7XG5jb25zdCBMT0FERVJfRVZFTlRTID0gRVZFTlRTLkxPQURFUl9FVkVOVFNcbmNvbnN0IEJST1dTRVJfRVZFTlRTID0gRVZFTlRTLkJST1dTRVJfRVZFTlRTXG5cbmNvbnN0IFRhZyA9ICdGTFZDb250cm9sbGVyJ1xuXG5jbGFzcyBMb2dnZXIge1xuICB3YXJuICgpIHt9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZsdkNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvciAocGxheWVyKSB7XG4gICAgdGhpcy5UQUcgPSBUYWdcbiAgICB0aGlzLl9wbGF5ZXIgPSBwbGF5ZXJcblxuICAgIHRoaXMudmlkZW8gPSB0aGlzLl9wbGF5ZXIudmlkZW87XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGluaXRTZWdtZW50QXJyaXZlZDogZmFsc2VcbiAgICB9XG4gIH1cblxuICBpbml0ICgpIHtcbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdGRVRDSF9MT0FERVInLCBGZXRjaExvYWRlcilcbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdMT0FERVJfQlVGRkVSJywgWGdCdWZmZXIpXG4gICAgdGhpcy5fY29udGV4dC5yZWdpc3RyeSgnUFJFX1NPVVJDRV9CVUZGRVInLCBQcmVTb3VyY2UpXG5cbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdGTFZfREVNVVhFUicsIEZsdkRlbXV4ZXIpXG5cbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdNUDRfUkVNVVhFUicsIE1wNFJlbXV4ZXIpXG4gICAgdGhpcy5fY29udGV4dC5yZWdpc3RyeSgnVFJBQ0tTJywgVHJhY2tzKVxuXG4gICAgdGhpcy5fY29udGV4dC5yZWdpc3RyeSgnQ09NUEFUSUJJTElUWScsIENvbXBhdGliaWxpdHkpXG4gICAgdGhpcy5fY29udGV4dC5yZWdpc3RyeSgnUEFHRV9WSVNJQklMSVRZJywgUGFnZVZpc2liaWxpdHkpXG5cbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdMT0dHRVInLCBMb2dnZXIpXG5cbiAgICB0aGlzLmluaXRMaXN0ZW5lcnMoKVxuICB9XG5cbiAgaW5pdExpc3RlbmVycyAoKSB7XG4gICAgdGhpcy5vbihMT0FERVJfRVZFTlRTLkxPQURFUl9EQVRBTE9BREVELCB0aGlzLl9oYW5kbGVMb2FkZXJEYXRhTG9hZGVkLmJpbmQodGhpcykpXG4gICAgdGhpcy5vbihMT0FERVJfRVZFTlRTLkxPQURFUl9FUlJPUiwgdGhpcy5faGFuZGxlTmV0d29ya0Vycm9yLmJpbmQodGhpcykpXG5cbiAgICB0aGlzLm9uKERFTVVYX0VWRU5UUy5NRURJQV9JTkZPLCB0aGlzLl9oYW5kbGVNZWRpYUluZm8uYmluZCh0aGlzKSlcbiAgICB0aGlzLm9uKERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsIHRoaXMuX2hhbmRsZU1ldGFkYXRhUGFyc2VkLmJpbmQodGhpcykpXG4gICAgdGhpcy5vbihERU1VWF9FVkVOVFMuREVNVVhfQ09NUExFVEUsIHRoaXMuX2hhbmRsZURlbXV4Q29tcGxldGUuYmluZCh0aGlzKSlcbiAgICB0aGlzLm9uKERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgdGhpcy5faGFuZGxlRGVtdXhFcnJvci5iaW5kKHRoaXMpKVxuXG4gIH1cblxuICBfaGFuZGxlTWVkaWFJbmZvICgpIHtcbiAgICBpZiAoIXRoaXMuX2NvbnRleHQubWVkaWFJbmZvKSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCBuZXcgRXJyb3IoJ2ZhaWxlZCB0byBnZXQgbWVkaWFpbmZvJykpXG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZUxvYWRlckRhdGFMb2FkZWQgKCkge1xuICAgIHRoaXMuZW1pdFRvKCdGTFZfREVNVVhFUicsIERFTVVYX0VWRU5UUy5ERU1VWF9TVEFSVClcbiAgfVxuXG4gIF9oYW5kbGVNZXRhZGF0YVBhcnNlZCAodHlwZSkge1xuICAgIGlmICh0eXBlID09PSAnYXVkaW8nKSB7XG4gICAgICAvLyDlsIbpn7PpopFtZXRh5L+h5oGv5Lqk57uZYXVkaW9Db250ZXh077yM5LiN6LWwcmVtdXjlsIHoo4VcbiAgICAgIGNvbnN0IHsgYXVkaW9UcmFjayB9ID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJylcbiAgICAgIGlmIChhdWRpb1RyYWNrICYmIGF1ZGlvVHJhY2subWV0YSkge1xuICAgICAgICB0aGlzLl9zZXRNZXRhVG9BdWRpbyhhdWRpb1RyYWNrLm1ldGEpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHsgdmlkZW9UcmFjayB9ID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJylcbiAgICAgIGlmICh2aWRlb1RyYWNrICYmIHZpZGVvVHJhY2subWV0YSkge1xuICAgICAgICB0aGlzLl9zZXRNZXRhVG9WaWRlbyh2aWRlb1RyYWNrLm1ldGEpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZURlbXV4Q29tcGxldGUgKCkge1xuICAgIGlmKHRoaXMuX3BsYXllci52aWRlbykge1xuICAgICAgY29uc3QgeyB2aWRlb1RyYWNrLCBhdWRpb1RyYWNrIH0gPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKTtcbiAgICAgIHRoaXMuX3BsYXllci52aWRlby5vbkRlbXV4Q29tcGxldGUodmlkZW9UcmFjaywgYXVkaW9UcmFjayk7XG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZUFwcGVuZEluaXRTZWdtZW50ICgpIHtcbiAgICB0aGlzLnN0YXRlLmluaXRTZWdtZW50QXJyaXZlZCA9IHRydWVcbiAgLy8gIHRoaXMubXNlLmFkZFNvdXJjZUJ1ZmZlcnMoKVxuICB9XG5cblxuICBfaGFuZGxlTmV0d29ya0Vycm9yICgpIHtcbiAgICB0aGlzLl9wbGF5ZXIuZW1pdCgnZXJyb3InLCBuZXcgUGxheWVyLkVycm9ycygnbmV0d29yaycsIHRoaXMuX3BsYXllci5jb25maWcudXJsKSlcbiAgfVxuXG4gIF9oYW5kbGVEZW11eEVycm9yICgpIHtcbiAgICB0aGlzLl9wbGF5ZXIuZW1pdCgnZXJyb3InLCBuZXcgUGxheWVyLkVycm9ycygncGFyc2UnLCB0aGlzLl9wbGF5ZXIuY29uZmlnLnVybCkpXG4gIH1cblxuXG4gIF9zZXRNZXRhVG9BdWRpbyAoYXVkaW9NZXRhKSB7XG4gICAgaWYgKHRoaXMuX3BsYXllci52aWRlbykge1xuICAgICAgdGhpcy5fcGxheWVyLnZpZGVvLnNldEF1ZGlvTWV0YShhdWRpb01ldGEpO1xuICAgIH1cbiAgfVxuXG4gIF9zZXRNZXRhVG9WaWRlbyAodmlkZW9NZXRhKSB7XG4gICAgaWYgKHRoaXMuX3BsYXllci52aWRlbykge1xuICAgICAgdGhpcy5fcGxheWVyLnZpZGVvLnNldFZpZGVvTWV0YSh2aWRlb01ldGEpO1xuICAgIH1cbiAgfVxuXG4gIHNlZWsgKCkge1xuICAgIGlmICghdGhpcy5zdGF0ZS5pbml0U2VnbWVudEFycml2ZWQpIHtcbiAgICAgIHRoaXMubG9hZERhdGEoKVxuICAgIH1cbiAgfVxuXG4gIGxvYWREYXRhICgpIHtcbiAgICB0aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MQURFUl9TVEFSVCwgdGhpcy5fcGxheWVyLmNvbmZpZy51cmwpXG4gIH1cblxuICBwYXVzZSAoKSB7XG4gICAgY29uc3QgbG9hZGVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnRkVUQ0hfTE9BREVSJylcblxuICAgIGlmIChsb2FkZXIpIHtcbiAgICAgIGxvYWRlci5jYW5jZWwoKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDkv53or4HlvZPliY3mkq3mlL7nmoTop4bpopHku6Vnb3DkuLrljZXkvY1cbiAgICogQHBhcmFtIHZpZGVvVHJhY2tcbiAgICovXG4gIHN0YXRpYyByZXNvbHZlVmlkZW9HT1AgKHZpZGVvVHJhY2spIHtcbiAgICBjb25zdCB7IHNhbXBsZXMgfSA9IHZpZGVvVHJhY2s7XG4gICAgaWYgKCFzYW1wbGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBmaXJzdElmcmFtZUlkeCA9IG51bGxcbiAgICBsZXQgbGFzdElmcmFtZUlkeCA9IG51bGxcblxuICAgIGlmICh2aWRlb1RyYWNrLnRlbXBTYW1wbGVzICYmIHZpZGVvVHJhY2sudGVtcFNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICAvLyDlsIbnvJPlrZjluKfmlL7nva7liLDpmJ/liJfnmoTlpLTpg6hcbiAgICAgIHNhbXBsZXMudW5zaGlmdC5hcHBseShzYW1wbGVzLCB2aWRlb1RyYWNrLnRlbXBTYW1wbGVzKTtcbiAgICB9XG5cbiAgICAvLyDlr7vmib7nrKzkuIDkuKpJ5binXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNhbXBsZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSBzYW1wbGVzW2ldO1xuICAgICAgaWYgKGN1cnJlbnQuaXNLZXlmcmFtZSkge1xuICAgICAgICBmaXJzdElmcmFtZUlkeCA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIOWvu+aJvuacgOWQjuS4gOS4qknluKdcbiAgICBmb3IgKGxldCBpID0gc2FtcGxlcy5sZW5ndGggLSAxOyBpID4gMDsgaSsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50ID0gc2FtcGxlc1tpXVxuXG4gICAgICBpZiAoY3VycmVudC5pc0tleWZyYW1lKSB7XG4gICAgICAgIGxhc3RJZnJhbWVJZHggPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZmlyc3RJZnJhbWVJZHggIT09IDApIHtcbiAgICAgIHNhbXBsZXMuc3BsaWNlKDAsIGZpcnN0SWZyYW1lSWR4IC0gMSlcbiAgICB9XG5cbiAgICB2aWRlb1RyYWNrLnNhbXBsZXMgPSBzYW1wbGVzLnNsaWNlKDAsIGxhc3RJZnJhbWVJZHgpXG4gICAgY29uc3QgcmVzdCA9IHNhbXBsZXMuc2xpY2UobGFzdElmcmFtZUlkeClcbiAgICBpZiAodmlkZW9UcmFjay50ZW1wU2FtcGxlcykge1xuICAgICAgdmlkZW9UcmFjay50ZW1wU2FtcGxlcy5wdXNoLmFwcGx5KHZpZGVvVHJhY2sudGVtcFNhbXBsZXMsIHJlc3QpXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIOWwhuWJqeS4i+eahOW4p+e8k+WtmO+8jOetieW+heS4gOS4quWujOaVtOeahGdvcFxuICAgICAgdmlkZW9UcmFjay50ZW1wU2FtcGxlcyA9IHJlc3RcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBQbGF5ZXIgZnJvbSAneGdwbGF5ZXInXG5pbXBvcnQgeyBDb250ZXh0LCBFVkVOVFMgfSBmcm9tICd4Z3BsYXllci11dGlscyc7XG5pbXBvcnQgRkxWIGZyb20gJy4vZmx2LWxpdmUtbW9iaWxlJ1xuY29uc3QgZmx2QWxsb3dlZEV2ZW50cyA9IEVWRU5UUy5GbHZBbGxvd2VkRXZlbnRzO1xuXG5jbGFzcyBGbHZQbGF5ZXIgZXh0ZW5kcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvciAoY29uZmlnKSB7XG4gICAgaWYgKCFjb25maWcubWVkaWFUeXBlKSB7XG4gICAgICBjb25maWcubWVkaWFUeXBlID0gJ21vYmlsZS12aWRlbydcbiAgICB9XG4gICAgc3VwZXIoY29uZmlnKVxuICAgIHRoaXMuY29udGV4dCA9IG5ldyBDb250ZXh0KGZsdkFsbG93ZWRFdmVudHMpXG4gICAgdGhpcy5pbml0RXZlbnRzKClcbiAgfVxuXG4gIHN0YXJ0ICgpIHtcbiAgICB0aGlzLmluaXRGbHYoKVxuICAgIHRoaXMuY29udGV4dC5pbml0KClcbiAgICB0aGlzLmZsdi5zZWVrKDApO1xuICAgIHN1cGVyLnN0YXJ0KHRoaXMuY29uZmlnLnVybCk7XG4gICAgdGhpcy5wbGF5KCk7XG4gIH1cblxuICBpbml0Rmx2RXZlbnRzIChmbHYpIHtcbiAgICBjb25zdCBwbGF5ZXIgPSB0aGlzO1xuICAgIGZsdi5vbmNlKEVWRU5UUy5SRU1VWF9FVkVOVFMuSU5JVF9TRUdNRU5ULCAoKSA9PiB7XG4gICAgICBQbGF5ZXIudXRpbC5hZGRDbGFzcyhwbGF5ZXIucm9vdCwgJ3hncGxheWVyLWlzLWxpdmUnKVxuICAgICAgaWYgKCFQbGF5ZXIudXRpbC5maW5kRG9tKHRoaXMucm9vdCwgJ3hnLWxpdmUnKSkge1xuICAgICAgICBjb25zdCBsaXZlID0gUGxheWVyLnV0aWwuY3JlYXRlRG9tKCd4Zy1saXZlJywgJ+ato+WcqOebtOaSrScsIHt9LCAneGdwbGF5ZXItbGl2ZScpXG4gICAgICAgIHBsYXllci5jb250cm9scy5hcHBlbmRDaGlsZChsaXZlKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBmbHYub25jZShFVkVOVFMuTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsICgpID0+IHtcbiAgICAgIC8vIOebtOaSreWujOaIkO+8jOW+heaSreaUvuWZqOaSreWujOe8k+WtmOWQjuWPkemAgeWFs+mXreS6i+S7tlxuICAgICAgaWYgKCFwbGF5ZXIucGF1c2VkKSB7XG4gICAgICAgIGNvbnN0IHRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGVuZCA9IHBsYXllci5nZXRCdWZmZXJlZFJhbmdlKClbMV1cbiAgICAgICAgICBpZiAoTWF0aC5hYnMocGxheWVyLmN1cnJlbnRUaW1lIC0gZW5kKSA8IDAuNSkge1xuICAgICAgICAgICAgcGxheWVyLmVtaXQoJ2VuZGVkJylcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgICAgIH1cbiAgICAgICAgfSwgMjAwKVxuICAgICAgfVxuICAgIH0pXG4gICAgZmx2Lm9uKEVWRU5UUy5CUk9XU0VSX0VWRU5UUy5WSVNJQklMSVRZX0NIQU5HRSwgKGhpZGRlbikgPT4ge1xuICAgICAgaWYgKGhpZGRlbikge1xuICAgICAgICB0aGlzLnBhdXNlKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGxheSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGluaXRFdmVudHMgKCkge1xuICAgIHRoaXMub24oJ3RpbWV1cGRhdGUnLCAoKSA9PiB7XG4gICAgICB0aGlzLmxvYWREYXRhKClcbiAgICB9KVxuXG4gICAgdGhpcy5vbignc2Vla2luZycsICgpID0+IHtcbiAgICAgIGNvbnN0IHRpbWUgPSB0aGlzLmN1cnJlbnRUaW1lXG4gICAgICBjb25zdCByYW5nZSA9IHRoaXMuZ2V0QnVmZmVyZWRSYW5nZSgpXG4gICAgICBpZiAodGltZSA+IHJhbmdlWzFdIHx8IHRpbWUgPCByYW5nZVswXSkge1xuICAgICAgICB0aGlzLmZsdi5zZWVrKHRoaXMuY3VycmVudFRpbWUpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGluaXRGbHYgKCkge1xuICAgIGNvbnN0IGZsdiA9IHRoaXMuY29udGV4dC5yZWdpc3RyeSgnRkxWX0NPTlRST0xMRVInLCBGTFYpKHRoaXMpXG4gICAgdGhpcy5pbml0Rmx2RXZlbnRzKGZsdilcbiAgICB0aGlzLmZsdiA9IGZsdlxuICB9XG5cbiAgcGxheSAoKSB7XG4gICAgaWYgKHRoaXMuX2hhc1N0YXJ0ICYmIHRoaXMucGF1c2VkKSB7XG4gICAgICB0aGlzLl9kZXN0cm95KClcbiAgICAgIHRoaXMuY29udGV4dCA9IG5ldyBDb250ZXh0KGZsdkFsbG93ZWRFdmVudHMpXG4gICAgICBjb25zdCBmbHYgPSB0aGlzLmNvbnRleHQucmVnaXN0cnkoJ0ZMVl9DT05UUk9MTEVSJywgRkxWKSh0aGlzKVxuICAgICAgdGhpcy5pbml0Rmx2RXZlbnRzKGZsdilcbiAgICAgIHRoaXMuZmx2ID0gZmx2XG4gICAgICB0aGlzLmNvbnRleHQuaW5pdCgpXG4gICAgICB0aGlzLmxvYWREYXRhKClcbiAgICAgIHN1cGVyLnN0YXJ0KClcbiAgICAgIHN1cGVyLnBsYXkoKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5wbGF5KClcbiAgICB9XG4gIH1cblxuICBwYXVzZSAoKSB7XG4gICAgc3VwZXIucGF1c2UoKVxuICAgIGlmICh0aGlzLmZsdikge1xuICAgICAgdGhpcy5mbHYucGF1c2UoKVxuICAgIH1cbiAgfVxuXG4gIGxvYWREYXRhICh0aW1lID0gdGhpcy5jdXJyZW50VGltZSkge1xuICAgIGlmICh0aGlzLmZsdikge1xuICAgICAgdGhpcy5mbHYuc2Vlayh0aW1lKVxuICAgIH1cbiAgfVxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLl9kZXN0cm95KClcbiAgICBzdXBlci5kZXN0cm95KCk7XG4gIH1cblxuICBfZGVzdHJveSAoKSB7XG4gICAgdGhpcy5jb250ZXh0LmRlc3Ryb3koKVxuICAgIHRoaXMuZmx2ID0gbnVsbFxuICAgIHRoaXMuY29udGV4dCA9IG51bGxcbiAgfVxuXG4gIGdldCBzcmMgKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRTcmNcbiAgfVxuXG4gIHNldCBzcmMgKHVybCkge1xuICAgIHRoaXMucGxheWVyLmNvbmZpZy51cmwgPSB1cmxcbiAgICBpZiAoIXRoaXMucGF1c2VkKSB7XG4gICAgICB0aGlzLnBhdXNlKClcbiAgICAgIHRoaXMub25jZSgncGF1c2UnLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3RhcnQodXJsKVxuICAgICAgfSlcbiAgICAgIHRoaXMub25jZSgnY2FucGxheScsICgpID0+IHtcbiAgICAgICAgdGhpcy5wbGF5KClcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhcnQodXJsKVxuICAgIH1cbiAgICB0aGlzLm9uY2UoJ2NhbnBsYXknLCAoKSA9PiB7XG4gICAgICB0aGlzLmN1cnJlbnRUaW1lID0gMFxuICAgIH0pXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGbHZQbGF5ZXJcbiIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJQbGF5ZXJcIl07IH0oKSk7Il0sInNvdXJjZVJvb3QiOiIifQ==