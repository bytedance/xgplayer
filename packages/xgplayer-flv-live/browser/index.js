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
        // console.log('mark1')
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

const { REMUX_EVENTS, LOADER_EVENTS } = _xgplayerUtils.EVENTS;

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

    this.videoLastSample = null;
    this.audioLastSample = null; // stash last sample for duration compat

    this._videoLargeGap = 0;
    this._audioLargeGap = 0;
  }

  init() {
    this.before(REMUX_EVENTS.REMUX_MEDIA, this.doFix.bind(this));
    // this.on(LOADER_EVENTS.LOADER_COMPLETE, () => {
    //   if (this.videoLastSample) {
    //     this.videoTrack.samples.unshift(this.videoLastSample)
    //   }
    // })
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

    this.removeInvalidSamples();
  }

  doFixVideo(first, streamChangeStart) {
    let { samples: videoSamples, meta } = this.videoTrack;

    // console.log('next video', this.nextVideoDts)
    for (let i = 0, len = videoSamples.length; i < len; i++) {
      const sample = videoSamples[i];
      sample.originDts = sample.dts;
    }

    if (meta.frameRate && meta.frameRate.fixed === false) {
      return;
    }

    if (!videoSamples || !videoSamples.length || !this._firstVideoSample) {
      return;
    }

    // console.log(`video lastSample, ${videoSamples[videoSamples.length - 1].dts}`)

    const firstSample = videoSamples[0];

    // step0.修复hls流出现巨大gap，需要强制重定位的问题
    if (this._videoLargeGap > 0) {
      Compatibility.doFixLargeGap(videoSamples, this._videoLargeGap);
    }

    if (firstSample.dts !== this._firstVideoSample.dts && streamChangeStart) {
      if (streamChangeStart) {
        this.nextVideoDts = streamChangeStart; // FIX: Hls中途切codec，在如果直接seek到后面的点会导致largeGap计算失败
      }

      this._videoLargeGap = this.nextVideoDts - firstSample.dts;
      Compatibility.doFixLargeGap(videoSamples, this._videoLargeGap);
    }

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
      } else if (gap < -2 * meta.refSampleDuration) {
        this._videoLargeGap = -1 * gap;
        Compatibility.doFixLargeGap(videoSamples, -1 * gap);
      }
    }

    const curLastSample = videoSamples.pop();
    if (videoSamples.length) {
      videoSamples[videoSamples.length - 1].duration = curLastSample.dts - videoSamples[videoSamples.length - 1].dts;
    }

    if (this.videoLastSample) {
      const videoLastSample = this.videoLastSample;
      videoLastSample.duration = firstSample.dts - videoLastSample.dts;
      videoSamples.unshift(this.videoLastSample);
    }

    this.videoLastSample = curLastSample;

    this.videoTrack.samples = videoSamples;
  }

  doFixAudio(first, streamChangeStart) {
    let { samples: audioSamples, meta } = this.audioTrack;

    if (!audioSamples || !audioSamples.length) {
      return;
    }

    // console.log('next audio', this.nextAudioDts)
    for (let i = 0, len = audioSamples.length; i < len; i++) {
      const sample = audioSamples[i];
      sample.originDts = sample.dts;
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
      const gap = firstSample.dts - videoFirstPts;
      if (gap > meta.refSampleDuration) {
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
      } else if (gap < -1 * meta.refSampleDuration) {
        this._audioLargeGap = -1 * gap;
        Compatibility.doFixLargeGap(audioSamples, -1 * gap);
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
    const lastOriginDts = audioSamples[audioSamples.length - 1].originDts;
    const lastDts = audioSamples[audioSamples.length - 1].originDts;
    const lastSampleDuration = audioSamples.length >= 2 ? lastOriginDts - audioSamples[audioSamples.length - 2].originDts : meta.refSampleDuration;

    this.lastAudioSamplesLen = samplesLen;
    this.nextAudioDts = meta.refSampleDurationFixed ? lastDts + meta.refSampleDurationFixed : lastDts + lastSampleDuration;
    this.lastAudioDts = lastDts;

    audioSamples[audioSamples.length - 1].duration = lastSampleDuration;

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

    this.audioTrack.samples = this.audioTrack.samples.filter((sample, index) => {
      if (sample === _firstAudioSample) {
        return true;
      }
      return sample.dts > _firstAudioSample.dts;
    });

    this.videoTrack.samples = this.videoTrack.samples.filter((sample, index) => {
      if (sample === _firstVideoSample) {
        return true;
      }
      return sample.dts > _firstVideoSample.dts;
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
    // console.log('fix large gap ', gap)
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
      let length = buffer.dataview.getInt32();
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

      let loopMax = 10000; // 防止死循环产生
      do {
        // console.log('mark4')
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
  static parse(text) {
    let baseurl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

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
    let nextDiscontinue = false;
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
            M3U8Parser.parseFrag(refm, refs, ret, baseurl, nextDiscontinue);
            nextDiscontinue = false;
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
            nextDiscontinue = true;
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
  static initBox(size, name) {
    const buffer = new _xgplayerUtils.Buffer();

    for (var _len = arguments.length, content = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      content[_key - 2] = arguments[_key];
    }

    buffer.write.apply(buffer, [Fmp4.size(size), Fmp4.type(name)].concat(content));
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
  static moov(_ref) {
    let { type, meta } = _ref;

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
  static mvhd(duration) {
    let timescale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;

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
  static mdhd() {
    let timescale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
    let duration = arguments[1];

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
      value.splice.apply(value, [8, 4].concat([0x73, 0x6f, 0x75, 0x6e]));
      value.splice.apply(value, [24, 13].concat([0x53, 0x6f, 0x75, 0x6e, 0x64, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00]));
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
  static esds() {
    let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [43, 146, 8, 0];

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
  static mvex(duration) {
    let timescale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
    let trackID = arguments[2];

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
    this._audioNextDts = null;
    this._videoNextDts = null;
    this._videoSegmentList = new _xgplayerUtils.MediaSegmentList('video');
    this._audioSegmentList = new _xgplayerUtils.MediaSegmentList('audio');
    const { browser } = _xgplayerUtils.sniffer;
    this._fillSilenceFrame = browser === 'ie';

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
    this._videoNextDts = null;
    this._audioNextDts = null;
    this._videoSegmentList.clear();
    this._audioSegmentList.clear();
    this._videoSegmentList = null;
    this._audioSegmentList = null;
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

  seek() {
    this._videoNextDts = null;
    this._audioNextDts = null;
    this._videoSegmentList.clear();
    this._audioSegmentList.clear();
  }

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

    let maxLoop = 10000;
    while (samples.length && maxLoop-- > 0) {
      // console.log('mark2')
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
      if (avcSample.duration) {
        sampleDuration = avcSample.duration;
      } else if (samples.length >= 1) {
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
      // console.log(`dts ${dts}`, `pts ${pts}`, isKeyframe, `duration ${sampleDuration}`)
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

      if (isKeyframe) {
        this.emit(REMUX_EVENTS.RANDOM_ACCESS_POINT, pts);
      }
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

    let maxLoop = 10000;
    let isFirstDtsInited = false;
    while (samples.length && maxLoop-- > 0) {
      // console.log('mark3')
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
      if (sample.duration) {
        sampleDuration = sample.duration;
      } else if (this.audioMeta.refSampleDurationFixed) {
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

      // console.log(`audio dts ${dts}`, `pts ${dts}`, `duration ${sampleDuration}`)
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
    const unit = Mp4Remuxer.getSilentFrame(this._audioMeta.channelCount);
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
  DETECT_CHANGE_STREAM: 'DETECT_CHANGE_STREAM',
  RANDOM_ACCESS_POINT: 'RANDOM_ACCESS_POINT'
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
  constructor() {
    let allowedEvents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    this._emitter = new _events.EventEmitter();
    this._instanceMap = {}; // 所有的解码流程实例
    this._clsMap = {}; // 构造函数的map
    this._inited = false;
    this.mediaInfo = new _mediaInfo2.default();
    this.allowedEvents = allowedEvents;
    this._hooks = {}; // 注册在事件前/后的钩子，例如 before('DEMUX_COMPLETE')
    this._emitCounter = {};
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
  initInstance(tag) {
    if (this._clsMap[tag]) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      const newInstance = new (Function.prototype.bind.apply(this._clsMap[tag], [null].concat(args)))();
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
    var _this = this;

    const emitter = this._emitter;
    const checkMessageName = this._isMessageNameValid.bind(this);
    const self = this;
    const enhanced = class extends cls {
      constructor(a, b, c) {
        super(a, b, c);
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

      emit(messageName) {
        checkMessageName(messageName);
        if (self._emitCounter[messageName]) {
          self._emitCounter[messageName] += 1;
          if (self._emitCounter[messageName] > 10000) {
            let a = 'con';
            let b = 'sole';
            if (window.console) {
              window[a + b].warn(`invoke: `, messageName);
            }
          }
        } else {
          self._emitCounter[messageName] = 1;
        }

        const beforeList = self._hooks ? self._hooks[messageName] : null;

        if (beforeList) {
          for (let i = 0, len = beforeList.length; i < len; i++) {
            const callback = beforeList[i];
            callback();
          }
        }

        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        return emitter.emit.apply(emitter, [messageName].concat(args));
      }

      /**
       * 定向发送给某个组件单例的消息
       * @param messageName
       * @param args
       */
      emitTo(tag, messageName) {
        checkMessageName(messageName);

        for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
          args[_key3 - 2] = arguments[_key3];
        }

        return emitter.emit.apply(emitter, [`${messageName}${DIRECT_EMIT_FLAG}${tag}`].concat(args));
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
    return function () {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return _this.initInstance.apply(_this, [tag].concat(args));
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
    this._emitCounter = {};
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

    Object.entries(sample).forEach((_ref) => {
      let [k, v] = _ref;

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

  remove(end) {
    let start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    for (let i = 0; i < Object.keys(this.sourceBuffers).length; i++) {
      let buffer = this.sourceBuffers[Object.keys(this.sourceBuffers)[i]];
      if (!buffer.updating) {

        // console.log('remove', start, end)
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
                buffer.addEventListener('updateend', () => {
                  resolve();
                });
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
        task = new Promise(resolve => {
          MSE.clearBuffer(buffer);
          buffer.addEventListener('updateend', () => {
            resolve();
          });
        });

        // task = Promise.resolve()
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

  write() {
    for (var _len = arguments.length, buffer = Array(_len), _key = 0; _key < _len; _key++) {
      buffer[_key] = arguments[_key];
    }

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
      initSegmentArrived: false,
      randomAccessPoints: []
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
    this.on(REMUX_EVENTS.RANDOM_ACCESS_POINT, this._handleAddRAP.bind(this));

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

    let range = [0, 0];
    let currentTime = video.currentTime;
    if (buffered) {
      for (let i = 0, len = buffered.length; i < len; i++) {
        range[0] = buffered.start(i);
        range[1] = buffered.end(i);
        if (range[0] <= currentTime && currentTime <= range[1]) {
          break;
        }
      }
    }

    const bufferStart = range[0];
    const bufferEnd = range[1];

    if (currentTime > bufferEnd || currentTime < bufferStart) {
      video.currentTime = bufferStart;
      return;
    }

    if (time - bufferStart > 10 || buffered.length > 1) {
      // 在直播时及时清空buffer，降低直播内存占用
      if (this.bufferClearTimer || !this.state.randomAccessPoints.length) {
        return;
      }
      let rap = Infinity;
      for (let i = 0; i < this.state.randomAccessPoints.length; i++) {
        const temp = Math.ceil(this.state.randomAccessPoints[i] / 1000);
        if (temp > time - 10) {
          break;
        } else {
          rap = temp;
        }
      }

      // console.log('rap', rap, `time ${time}`, `bufferEnd ${bufferEnd}`,`clean ${Math.min(rap, time - 10, bufferEnd - 10)}`)
      this.mse.remove(Math.min(rap, time - 10, bufferEnd - 10), 0);

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

  _handleAddRAP(rap) {
    if (this.state.randomAccessPoints) {
      this.state.randomAccessPoints.push(rap);
    }
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
    this.state.randomAccessPoints = [];
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
      } else {
        player.emit('ended');
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
      return this._destroy().then(() => {
        this.context = new _xgplayerUtils.Context(flvAllowedEvents);
        const flv = this.context.registry('FLV_CONTROLLER', _flvLive2.default)(this);
        this.initFlvEvents(flv);
        this.flv = flv;
        this.context.init();
        super.start(flv.mse.url);
        return super.play();
      });
    } else {
      return super.play();
    }
  }

  pause() {
    super.pause();
    if (this.flv) {
      this.flv.pause();
    }
  }

  loadData() {
    let time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentTime;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9GbHZQbGF5ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy9Vc2Vycy9sZW9uYXJkby9Eb2N1bWVudHMvZnJvbnQtZW5kL3BsYXllci94Z3BsYXllci9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1idWZmZXIvc3JjL2J1ZmZlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItYnVmZmVyL3NyYy9wcmVzb3VjZS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItYnVmZmVyL3NyYy90cmFjay5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItY29kZWMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWNvZGVjL3NyYy9hYWMvYWFjLWhlbHBlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItY29kZWMvc3JjL2NvbXBhdGliaWxpdHkuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWNvZGVjL3NyYy9oMjY0L25hbHVuaXQvZ29sb21iLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1jb2RlYy9zcmMvaDI2NC9uYWx1bml0L2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1jb2RlYy9zcmMvaDI2NC9uYWx1bml0L3Nwcy5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItZGVtdXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWRlbXV4L3NyYy9mbHYvYW1mLXBhcnNlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItZGVtdXgvc3JjL2Zsdi9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItZGVtdXgvc3JjL2hscy9kZW11eGVyL20zdThwYXJzZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLWRlbXV4L3NyYy9obHMvZGVtdXhlci90cy5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItZGVtdXgvc3JjL2hscy9wbGF5bGlzdC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItbG9hZGVyL2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci1sb2FkZXIvc3JjL2ZldGNoLWxvYWRlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItcmVtdXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXJlbXV4L3NyYy9tcDQvZm1wNC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItcmVtdXgvc3JjL21wNC9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL25vZGVfbW9kdWxlcy9jb25jYXQtdHlwZWQtYXJyYXkvbGliL2NvbmNhdC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvbm9kZV9tb2R1bGVzL2NvbmNhdC10eXBlZC1hcnJheS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9jb25zdGFudHMvZXZlbnRzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvY29uc3RhbnRzL3dvcmtlci1jb21tYW5kcy5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL2NvbnRleHQuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9jcnlwdG8vaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9lbnYvaXNsZS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL2Vudi9zbmlmZmVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvZW52L3V0ZjguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2RlbHMvbWVkaWEtaW5mby5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vZGVscy9tZWRpYS1zYW1wbGUuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2RlbHMvbWVkaWEtc2VnbWVudC1saXN0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uLi94Z3BsYXllci11dGlscy9zcmMvbW9kZWxzL21lZGlhLXNlZ21lbnQuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tb2RlbHMvdHJhY2stbWV0YS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi4veGdwbGF5ZXItdXRpbHMvc3JjL21vZGVscy90cmFjay1zYW1wbGUuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy9tc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy93cml0ZS9idWZmZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4uL3hncGxheWVyLXV0aWxzL3NyYy93cml0ZS9zdHJlYW0uanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL2Zsdi1saXZlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvZXh0ZXJuYWwgXCJQbGF5ZXJcIiJdLCJuYW1lcyI6WyJSIiwiUmVmbGVjdCIsIlJlZmxlY3RBcHBseSIsImFwcGx5IiwidGFyZ2V0IiwicmVjZWl2ZXIiLCJhcmdzIiwiRnVuY3Rpb24iLCJwcm90b3R5cGUiLCJjYWxsIiwiUmVmbGVjdE93bktleXMiLCJvd25LZXlzIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImNvbmNhdCIsIlByb2Nlc3NFbWl0V2FybmluZyIsIndhcm5pbmciLCJjb25zb2xlIiwid2FybiIsIk51bWJlcklzTmFOIiwiTnVtYmVyIiwiaXNOYU4iLCJ2YWx1ZSIsIkV2ZW50RW1pdHRlciIsImluaXQiLCJtb2R1bGUiLCJleHBvcnRzIiwiX2V2ZW50cyIsInVuZGVmaW5lZCIsIl9ldmVudHNDb3VudCIsIl9tYXhMaXN0ZW5lcnMiLCJkZWZhdWx0TWF4TGlzdGVuZXJzIiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0Iiwic2V0IiwiYXJnIiwiUmFuZ2VFcnJvciIsImdldFByb3RvdHlwZU9mIiwiY3JlYXRlIiwic2V0TWF4TGlzdGVuZXJzIiwibiIsIiRnZXRNYXhMaXN0ZW5lcnMiLCJ0aGF0IiwiZ2V0TWF4TGlzdGVuZXJzIiwiZW1pdCIsInR5cGUiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwicHVzaCIsImRvRXJyb3IiLCJldmVudHMiLCJlcnJvciIsImVyIiwiRXJyb3IiLCJlcnIiLCJtZXNzYWdlIiwiY29udGV4dCIsImhhbmRsZXIiLCJsZW4iLCJsaXN0ZW5lcnMiLCJhcnJheUNsb25lIiwiX2FkZExpc3RlbmVyIiwibGlzdGVuZXIiLCJwcmVwZW5kIiwibSIsImV4aXN0aW5nIiwiVHlwZUVycm9yIiwibmV3TGlzdGVuZXIiLCJ1bnNoaWZ0Iiwid2FybmVkIiwidyIsIlN0cmluZyIsIm5hbWUiLCJlbWl0dGVyIiwiY291bnQiLCJhZGRMaXN0ZW5lciIsIm9uIiwicHJlcGVuZExpc3RlbmVyIiwib25jZVdyYXBwZXIiLCJmaXJlZCIsInJlbW92ZUxpc3RlbmVyIiwid3JhcEZuIiwiX29uY2VXcmFwIiwic3RhdGUiLCJ3cmFwcGVkIiwiYmluZCIsIm9uY2UiLCJwcmVwZW5kT25jZUxpc3RlbmVyIiwibGlzdCIsInBvc2l0aW9uIiwib3JpZ2luYWxMaXN0ZW5lciIsInNoaWZ0Iiwic3BsaWNlT25lIiwib2ZmIiwicmVtb3ZlQWxsTGlzdGVuZXJzIiwia2V5cyIsImtleSIsIl9saXN0ZW5lcnMiLCJ1bndyYXAiLCJldmxpc3RlbmVyIiwidW53cmFwTGlzdGVuZXJzIiwicmF3TGlzdGVuZXJzIiwibGlzdGVuZXJDb3VudCIsImV2ZW50TmFtZXMiLCJhcnIiLCJjb3B5IiwiQXJyYXkiLCJpbmRleCIsInBvcCIsInJldCIsIlRyYWNrIiwicmVxdWlyZSIsImRlZmF1bHQiLCJUcmFja3MiLCJBdWRpb1RyYWNrIiwiVmlkZW9UcmFjayIsIlhnQnVmZmVyIiwiUmVtdXhCdWZmZXIiLCJQcmVTb3VyY2UiLCJjb25zdHJ1Y3RvciIsImhpc3RvcnlMZW4iLCJhcnJheSIsIm9mZnNldCIsImRhdGEiLCJieXRlTGVuZ3RoIiwiVWludDhBcnJheSIsIl9zaGlmdEJ1ZmZlciIsInNsaWNlIiwidG1wb2ZmIiwidG1wIiwidGVtcGxlbmd0aCIsImNsZWFyIiwiZGVzdHJveSIsInRvSW50Iiwic3RhcnQiLCJyZXRJbnQiLCJ2aWRlbyIsImF1ZGlvIiwiU291cmNlIiwibWltZXR5cGUiLCJzb3VyY2VzIiwiZ2V0U291cmNlIiwic291cmNlIiwiY3JlYXRlU291cmNlIiwiaWQiLCJzZXF1ZW5jZU51bWJlciIsInNhbXBsZXMiLCJkcm9wcGVkU2FtcGxlcyIsInJlc2V0IiwiZGlzdHJveSIsIlRBRyIsImRyb3BwZWQiLCJhdWRpb1RyYWNrIiwidmlkZW9UcmFjayIsIk5hbHVuaXQiLCJTcHNQYXJzZXIiLCJDb21wYXRpYmlsaXR5IiwiQUFDIiwiZ2V0U2lsZW50RnJhbWUiLCJjb2RlYyIsImNoYW5uZWxDb3VudCIsIlJFTVVYX0VWRU5UUyIsIkxPQURFUl9FVkVOVFMiLCJFVkVOVFMiLCJuZXh0QXVkaW9EdHMiLCJuZXh0VmlkZW9EdHMiLCJsYXN0QXVkaW9TYW1wbGVzTGVuIiwibGFzdFZpZGVvU2FtcGxlc0xlbiIsImxhc3RWaWRlb0R0cyIsImxhc3RBdWRpb0R0cyIsImFsbEF1ZGlvU2FtcGxlc0NvdW50IiwiYWxsVmlkZW9TYW1wbGVzQ291bnQiLCJfZmlyc3RBdWRpb1NhbXBsZSIsIl9maXJzdFZpZGVvU2FtcGxlIiwiZmlsbGVkQXVkaW9TYW1wbGVzIiwiZmlsbGVkVmlkZW9TYW1wbGVzIiwidmlkZW9MYXN0U2FtcGxlIiwiYXVkaW9MYXN0U2FtcGxlIiwiX3ZpZGVvTGFyZ2VHYXAiLCJfYXVkaW9MYXJnZUdhcCIsImJlZm9yZSIsIlJFTVVYX01FRElBIiwiZG9GaXgiLCJpc0ZpcnN0QXVkaW9TYW1wbGVzIiwiaXNGaXJzdFZpZGVvU2FtcGxlcyIsImdldEZpcnN0U2FtcGxlIiwicmVjb3JkU2FtcGxlc0NvdW50IiwiZml4UmVmU2FtcGxlRHVyYXRpb24iLCJtZXRhIiwiY2hhbmdlZCIsInZpZGVvQ2hhbmdlZCIsImNoYW5nZWRJZHgiLCJ2aWRlb0NoYW5nZWRJZHgiLCJkZXRhY3RDaGFuZ2VTdHJlYW0iLCJmaXhDaGFuZ2VTdHJlYW1WaWRlbyIsImRvRml4VmlkZW8iLCJhdWRpb0NoYW5nZWQiLCJhdWRpb0NoYW5nZWRJZHgiLCJmaXhDaGFuZ2VTdHJlYW1BdWRpbyIsImRvRml4QXVkaW8iLCJyZW1vdmVJbnZhbGlkU2FtcGxlcyIsImZpcnN0Iiwic3RyZWFtQ2hhbmdlU3RhcnQiLCJ2aWRlb1NhbXBsZXMiLCJzYW1wbGUiLCJvcmlnaW5EdHMiLCJkdHMiLCJmcmFtZVJhdGUiLCJmaXhlZCIsImZpcnN0U2FtcGxlIiwiZG9GaXhMYXJnZUdhcCIsInZpZGVvRmlyc3REdHMiLCJhdWRpb0ZpcnN0RHRzIiwiZ2FwIiwicmVmU2FtcGxlRHVyYXRpb24iLCJmaWxsQ291bnQiLCJNYXRoIiwiZmxvb3IiLCJjbG9uZWRGaXJzdFNhbXBsZSIsImFzc2lnbiIsInB0cyIsImN0cyIsInNpemUiLCJjdXJMYXN0U2FtcGxlIiwiZHVyYXRpb24iLCJhdWRpb1NhbXBsZXMiLCJzYW1wbGVzTGVuIiwic2lsZW50RnJhbWUiLCJfZmlyc3RTYW1wbGUiLCJkZXRlY3RMYXJnZUdhcCIsInZpZGVvRmlyc3RQdHMiLCJzaWxlbnRTYW1wbGVDb3VudCIsInNpbGVudFNhbXBsZSIsImRhdGFzaXplIiwiZmlsdGVyZWQiLCJmaXJzdER0cyIsImFic0dhcCIsImFicyIsInJlZlNhbXBsZUR1cmF0aW9uRml4ZWQiLCJzaWxlbnRGcmFtZUNvdW50IiwiY29tcHV0ZWQiLCJsYXN0T3JpZ2luRHRzIiwibGFzdER0cyIsImxhc3RTYW1wbGVEdXJhdGlvbiIsImN1cnJlbnQiLCJuZXh0Iiwic29ydEF1ZGlvU2FtcGxlcyIsImNoYW5nZUlkeCIsInByZXZEdHMiLCJnZXRTdHJlYW1DaGFuZ2VTdGFydCIsImN1ckR0cyIsImlzQ29udGludWUiLCJvcHRpb25zIiwiZmlyc3RQYXJ0U2FtcGxlcyIsInNlY29uZFBhcnRTYW1wbGVzIiwiY2hhbmdlU2FtcGxlIiwiZmlyc3RQYXJ0RHVyYXRpb24iLCJmaW5kRmlyc3RWaWRlb1NhbXBsZSIsImZpbmRGaXJzdEF1ZGlvU2FtcGxlIiwiaXNWaWRlbyIsImFsbFNhbXBsZXNDb3VudCIsImZpbGxlZFNhbXBsZXNDb3VudCIsImR1cmF0aW9uQXZnIiwiZmlsdGVyIiwiZHRzQmFzZSIsIkluZmluaXR5Iiwic29ydCIsImEiLCJiIiwic29ydGVkIiwiaXNLZXlmcmFtZSIsIm5leHREdHMiLCJjb25kMSIsImNvbmQyIiwiZGlzY29udGludWUiLCJ0cmFja3MiLCJfY29udGV4dCIsImdldEluc3RhbmNlIiwicmVtdXhlciIsIl9kdHNCYXNlIiwiR29sb21iIiwidWludDhhcnJheSIsIl9idWZmZXIiLCJfYnVmZmVySW5kZXgiLCJfdG90YWxCeXRlcyIsIl90b3RhbEJpdHMiLCJfY3VycmVudFdvcmQiLCJfY3VycmVudFdvcmRCaXRzTGVmdCIsIl9maWxsQ3VycmVudFdvcmQiLCJidWZmZXJCeXRlc0xlZnQiLCJieXRlc1JlYWQiLCJtaW4iLCJ3b3JkIiwic3ViYXJyYXkiLCJEYXRhVmlldyIsImJ1ZmZlciIsImdldFVpbnQzMiIsInJlYWRCaXRzIiwiYml0cyIsInZhbHUiLCJyZWFkQm9vbCIsInJlYWRCeXRlIiwiX3NraXBMZWFkaW5nWmVybyIsInplcm9Db3VudCIsInJlYWRVRUciLCJsZWFkaW5nWmVyb3MiLCJyZWFkU0VHIiwiZ2V0TmFsdW5pdHMiLCJidWYiLCJkYXRhdmlldyIsImdldEludDMyIiwiZ2V0SW50MTYiLCJnZXRJbnQ4IiwiZ2V0QW5uZXhiTmFscyIsImdldEF2Y2NOYWxzIiwibmFscyIsImdldEhlYWRlclBvc2l0aW9uQW5uZXhCIiwicG9zIiwiZW5kIiwiaGVhZGVyIiwiaGVhZGVyTGVuZ3RoIiwic2tpcCIsImJvZHkiLCJ1bml0IiwiYW5hbHlzZU5hbCIsIm5kciIsImlkciIsInNwcyIsInBhcnNlU1BTIiwicHBzIiwiZ2V0QXZjYyIsIlNQU1BhcnNlciIsIl9lYnNwMnJic3AiLCJzcmMiLCJzcmNMZW5ndGgiLCJkc3QiLCJkc3RJZHgiLCJyYnNwIiwiZ2IiLCJwcm9maWxlSWRjIiwibGV2ZWxJZGMiLCJwcm9maWxlX3N0cmluZyIsImdldFByb2ZpbGVTdHJpbmciLCJsZXZlbF9zdHJpbmciLCJnZXRMZXZlbFN0cmluZyIsImNocm9tYV9mb3JtYXRfaWRjIiwiY2hyb21hX2Zvcm1hdCIsImNocm9tYV9mb3JtYXRfdGFibGUiLCJiaXRfZGVwdGgiLCJzY2FsaW5nX2xpc3RfY291bnQiLCJfc2tpcFNjYWxpbmdMaXN0IiwicGljX29yZGVyX2NudF90eXBlIiwibnVtX3JlZl9mcmFtZXNfaW5fcGljX29yZGVyX2NudF9jeWNsZSIsInBpY193aWR0aF9pbl9tYnNfbWludXMxIiwicGljX2hlaWdodF9pbl9tYXBfdW5pdHNfbWludXMxIiwiZnJhbWVfbWJzX29ubHlfZmxhZyIsImZyYW1lX2Nyb3BfbGVmdF9vZmZzZXQiLCJmcmFtZV9jcm9wX3JpZ2h0X29mZnNldCIsImZyYW1lX2Nyb3BfdG9wX29mZnNldCIsImZyYW1lX2Nyb3BfYm90dG9tX29mZnNldCIsImZyYW1lX2Nyb3BwaW5nX2ZsYWciLCJwYXJfd2lkdGgiLCJwYXJfaGVpZ2h0IiwiZnBzIiwiZnBzX2ZpeGVkIiwiZnBzX251bSIsImZwc19kZW4iLCJ2dWlfcGFyYW1ldGVyc19wcmVzZW50X2ZsYWciLCJhc3BlY3RfcmF0aW9faWRjIiwicGFyX3dfdGFibGUiLCJwYXJfaF90YWJsZSIsIm51bV91bml0c19pbl90aWNrIiwidGltZV9zY2FsZSIsInBhclNjYWxlIiwiY3JvcF91bml0X3giLCJjcm9wX3VuaXRfeSIsInN1Yl93YyIsInN1Yl9oYyIsImNvZGVjX3dpZHRoIiwiY29kZWNfaGVpZ2h0IiwicHJlc2VudF93aWR0aCIsImNlaWwiLCJjaHJvbWFfZm9ybWF0X3N0cmluZyIsImdldENocm9tYUZvcm1hdFN0cmluZyIsImZyYW1lX3JhdGUiLCJwYXJfcmF0aW8iLCJ3aWR0aCIsImhlaWdodCIsImNvZGVjX3NpemUiLCJwcmVzZW50X3NpemUiLCJsYXN0X3NjYWxlIiwibmV4dF9zY2FsZSIsImRlbHRhX3NjYWxlIiwidG9GaXhlZCIsImNocm9tYSIsInRvVmlkZW9NZXRhIiwic3BzQ29uZmlnIiwiY29kZWNXaWR0aCIsImNvZGVjSGVpZ2h0IiwicHJlc2VudFdpZHRoIiwicHJlc2VudEhlaWdodCIsInByb2ZpbGUiLCJsZXZlbCIsImJpdERlcHRoIiwiY2hyb21hRm9ybWF0IiwicGFyUmF0aW8iLCJmcHNEZW4iLCJmcHNOdW0iLCJ0aW1lc2NhbGUiLCJNM1U4UGFyc2VyIiwiVHNEZW11eGVyIiwiUGxheWxpc3QiLCJGbHZEZW11eGVyIiwiREFUQV9UWVBFUyIsIk5VTUJFUiIsIkJPT0xFQU4iLCJTVFJJTkciLCJPQkpFQ1QiLCJNSVhfQVJSQVkiLCJPQkpFQ1RfRU5EIiwiU1RSSUNUX0FSUkFZIiwiREFURSIsIkxPTkVfU1RSSU5HIiwiQU1GUGFyc2VyIiwicmVhZE9mZnNldCIsInJlc29sdmUiLCJtZXRhRGF0YSIsInBhcnNlVmFsdWUiLCJib2R5U2l6ZSIsInJlc2V0U3RhdHVzIiwicGFyc2VTdHJpbmciLCJkdiIsInN0ckxlbiIsImdldFVpbnQxNiIsImlzTGUiLCJzdHIiLCJVVEY4IiwiZGVjb2RlIiwicGFyc2VEYXRlIiwidHMiLCJnZXRGbG9hdDY0IiwidGltZU9mZnNldCIsIkRhdGUiLCJwYXJzZU9iamVjdCIsImlzT2JqRW5kIiwicGFyc2VMb25nU3RyaW5nIiwiQXJyYXlCdWZmZXIiLCJkYXRhVmlldyIsImdldFVpbnQ4IiwiYm9vbE51bSIsIm9iakVuZFNpemUiLCJhbWZPYmoiLCJpc09iamVjdEVuZCIsIm1hcmsiLCJhbWZWYXIiLCJtYXJrZXIiLCJhcnJMZW5ndGgiLCJzY3JpcHQiLCJkYXRlIiwibG9uZ1N0ciIsIkRFTVVYX0VWRU5UUyIsIl9maXJzdEZyYWdtZW50TG9hZGVkIiwiX3RyYWNrTnVtIiwiX2hhc1NjcmlwdCIsIkRFTVVYX1NUQVJUIiwiZG9QYXJzZUZsdiIsImlzRmx2RmlsZSIsImdldFBsYXlUeXBlIiwic3RyZWFtRmxhZyIsInJlc3VsdCIsImhhc1ZpZGVvIiwiaGFzQXVkaW8iLCJsb2FkZXJCdWZmZXIiLCJwYXJzZUZsdkhlYWRlciIsImNodW5rIiwibG9vcE1heCIsIl9wYXJzZUZsdlRhZyIsIkRFTVVYX0NPTVBMRVRFIiwiREVNVVhfRVJST1IiLCJwbGF5VHlwZSIsImluaXRWaWRlb1RyYWNrIiwiaW5pdEF1ZGlvVHJhY2siLCJWaWRlb1RyYWNrTWV0YSIsIkF1ZGlvVHJhY2tNZXRhIiwiX3BhcnNlRmx2VGFnSGVhZGVyIiwiX3Byb2Nlc3NDaHVuayIsInRhZ1R5cGUiLCJ0aW1lc3RhbXAiLCJ0aW1lc3RhbXBFeHQiLCJfcGFyc2VTY3JpcHREYXRhIiwiX3BhcnNlQUFDRGF0YSIsIl9wYXJzZUhldmNEYXRhIiwiaW5mbyIsIm9uTWV0YURhdGEiLCJtZWRpYUluZm8iLCJoc2FBdWRpbyIsInZhbGlkYXRlIiwiX2RhdGFzaXplVmFsaWRhdG9yIiwiTUVESUFfSU5GTyIsImhhc1NwZWNpZmljQ29uZmlnIiwiYXVkaW9zYW1wbGVyYXRlIiwic2FtcGxlUmF0ZSIsImF1ZGlvY2hhbm5lbHMiLCJzYW1wbGVSYXRlSW5kZXgiLCJmcmFtZXJhdGUiLCJfYWFjU2VxdWVuY2VIZWFkZXJQYXJzZXIiLCJvYmplY3RUeXBlIiwiX3N3aXRjaEF1ZGlvU2FtcGxlUmF0ZSIsImZyYW1lTGVuZ3RoIiwiZGVwZW5kc09uQ29yZUNvZGVyIiwiZXh0ZW5zaW9uRmxhZ0luZGV4IiwidXNlckFnZW50Iiwid2luZG93IiwibmF2aWdhdG9yIiwidG9Mb3dlckNhc2UiLCJleHRlbnNpb25TYW1wbGluZ0luZGV4IiwiY29uZmlnIiwic2FtcGxpbmdJbmRleCIsImluZGV4T2YiLCJ0cmFjayIsImZvcm1hdCIsIl9oYXNBdWRpb1NlcXVlbmNlIiwiX3N3aXRjaEF1ZGlvU2FtcGxpbmdGcmVxdWVuY3kiLCJmcmFtZUxlbnRoIiwiYXVkaW9TYW1wbGVSYXRlIiwiYXVkaW9TYW1wbGVSYXRlSW5kZXgiLCJhYWNIZWFkZXIiLCJhdWRpb01lZGlhIiwiTUVUQURBVEFfUEFSU0VEIiwiQVVESU9fTUVUQURBVEFfQ0hBTkdFIiwiX21ldGFDaGFuZ2UiLCJmcmFtZVR5cGUiLCJjb2RlY0lEIiwiYXZjUGFja2V0VHlwZSIsInBhcnNlSW50IiwibmFsdSIsInIiLCJzaXplcyIsImF2Y2NsZW5ndGgiLCJfYXZjU2VxdWVuY2VIZWFkZXJQYXJzZXIiLCJfaGFzVmlkZW9TZXF1ZW5jZSIsIlZJREVPX01FVEFEQVRBX0NIQU5HRSIsImNvbmZpZ3VyYXRpb25WZXJzaW9uIiwiYXZjUHJvZmlsZUluZGljYXRpb24iLCJwcm9maWxlQ29tcGF0aWJpbGl0eSIsImF2Y0xldmVsSW5kaWNhdGlvbiIsIm5hbFVuaXRMZW5ndGgiLCJudW1PZlNwcyIsImoiLCJjb2RlY1N0cmluZyIsImgiLCJ0b1N0cmluZyIsIm51bU9mUHBzIiwidmlkZW9NZWRpYSIsImF2Y2MiLCJzYW1wbGluZ0ZyZXF1ZW5jeUluZGV4Iiwic2FtcGxpbmdGcmVxdWVuY3lMaXN0IiwiX3N3aXRjaEF1ZGlvQ2hhbm5lbCIsInNhbXBsZVRyYWNrTnVtSW5kZXgiLCJzYW1wbGVUcmFja051bUxpc3QiLCJkYXRhc2l6ZUNvbmZpcm0iLCJsb2dnZXIiLCJwYXJzZSIsInRleHQiLCJiYXNldXJsIiwic3BsaXQiLCJyZWZzIiwicmVmIiwibWF0Y2giLCJuZXh0RGlzY29udGludWUiLCJyZWZtIiwicmVmZCIsInZlcnNpb24iLCJzZXF1ZW5jZSIsInRhcmdldGR1cmF0aW9uIiwicGFyc2VGbG9hdCIsInBhcnNlRnJhZyIsInBhcnNlRGVjcnlwdCIsImZyYWdzIiwiZnJlZyIsIm5leHRsaW5lIiwiY2hhckF0IiwidXJsIiwicGFyc2VVUkwiLCJ1cmxzIiwiZW5jcnlwdCIsImNtZCIsIm1ldGhvZCIsInVyaSIsIml2IiwiaXZiIiwiaW0iLCJzdWJzdHIiLCJTdHJlYW1UeXBlIiwiY29uZmlncyIsImRlbXV4aW5nIiwicGF0IiwicG10IiwiX2hhc1ZpZGVvTWV0YSIsIl9oYXNBdWRpb01ldGEiLCJkZW11eCIsImZyYWciLCJpbnB1dEJ1ZmZlciIsInBlc2VzIiwidHNTdHJlYW0iLCJTdHJlYW0iLCJyZWFkIiwicGVzIiwicGlkIiwiRVMiLCJwYXlsb2FkIiwic3RyZWFtIiwiQXVkaW9PcHRpb25zIiwiVmlkZW9PcHRpb25zIiwiZXBlc2VzIiwiTWVyZ2UiLCJwdXNoQXVkaW9TYW1wbGUiLCJwdXNoVmlkZW9TYW1wbGUiLCJfdHJhY2tzIiwiZnJlcXVlbmNlIiwiY2hhbm5lbCIsImF1ZGlvT2JqZWN0VHlwZSIsImF1ZGlvQ29uZmlnIiwiZnJlcXVlbmN5SW5kZXgiLCJtZXRhRXF1YWwiLCJjb21wYWlyZU1ldGEiLCJBdWRpb1RyYWNrU2FtcGxlIiwic2FtcGxlTGVuZ3RoIiwibmFsIiwic2FyUmF0aW8iLCJzYXJfcmF0aW8iLCJWaWRlb1RyYWNrU2FtcGxlIiwiZGVzdG9yeSIsImNvbXBhaXJlQXJyYXkiLCJhbCIsImJsIiwiaWdub3JlRHVyYXRpb24iLCJrIiwiaXRlbWEiLCJpdGVtYiIsImJ1ZmZlcnMiLCJyZWFkSGVhZGVyIiwicmVhZFBheWxvYWQiLCJwYWNrZXQiLCJ1bmtub3duUElEcyIsIlBFUyIsIlBBVCIsIkNBVCIsIlRTRFQiLCJzb21lIiwiaXRlbSIsIlBNVCIsInN0cyIsIk1lZGlhIiwic3RyZWFtVHlwZSIsInN5bmMiLCJyZWFkVWludDgiLCJyZWFkVWludDE2IiwicHJpb3JpdHkiLCJzY3JhbWJsaW5nIiwiYWRhcHRhdGlvbiIsImNvbnRpbnVpdHkiLCJ0YWJlbElEIiwiemVybyIsInNlY3Rpb25MZW5ndGgiLCJzdHJlYW1JRCIsInNlY3Rpb25OdW1iZXIiLCJsYXN0U2VjdGlvbk51bWJlciIsIk4iLCJwcm9ncmFtTnVtYmVyIiwicHJvZ3JhbSIsInRhYmxlSUQiLCJvcmRlciIsImxhc3RPcmRlciIsIlBDUl9QSUQiLCJwcm9ncmFtTGVuZ3RoIiwiZXMiLCJtYXAiLCJhZGFwdGF0aW9uTGVuZ3RoIiwiYWNjZXNzIiwiUENSIiwiT1BDUiIsInNwbGljZVBvaW50IiwidHJhbnNwb3J0UHJpdmF0ZSIsImFkYXB0YXRpb25GaWVsZCIsIl9zdGFydCIsInByb2dyYW1DbG9ja0Jhc2UiLCJyZWFkVWludDMyIiwicHJvZ3JhbUNsb2NrRXh0ZW5zaW9uIiwib3JpZ2luUHJvZ3JhbUNsb2NrQmFzZSIsIm9yaWdpblByb2dyYW1DbG9ja0V4dGVuc2lvbiIsInNwbGljZUNvdW50ZG93biIsInRyYW5zcG9ydFByaXZhdGVEYXRhIiwibHR3IiwicGllY2V3aXNlIiwic2VhbWxlc3MiLCJsdHdWYWxpZCIsImx0d09mZnNldCIsInJlYWRVaW50MjQiLCJwaWVjZXdpc2VSYXRlIiwicmVhZEludDgiLCJzcGxpY2VUeXBlIiwiZHRzTmV4dEFVMSIsIm1hcmtlcjEiLCJkdHNOZXh0QVUyIiwibWFya2VyMiIsImR0c05leHRBVTMiLCJsYXN0U3R1ZmZpbmciLCJwYWNrZXRMZW5ndGgiLCJwdHNEVFNGbGFnIiwiZXNjckZsYWciLCJlc1JhdGVGbGFnIiwiZHNtRmxhZyIsImFkZGl0aW9uYWxGbGFnIiwiY3JjRmxhZyIsImV4dGVuc2lvbkZsYWciLCJwZXNIZWFkZXJMZW5ndGgiLCJOMSIsImVzY3IiLCJleCIsImVzUmF0ZSIsImFkZGl0aW9uYWxDb3B5SW5mbyIsInBlc0NSQyIsImJhY2siLCJmcSIsImxheWVyIiwiYWJzZW50IiwiZ2V0QXVkaW9Db25maWciLCJzZWN0aW9uSW5kaWNhdG9yIiwiY3VycmVudE5leHRJbmRpY2F0b3IiLCJjcmMzMiIsImV4dGVuc2lvblNhbXBsZUluZGV4IiwidGVzdCIsImlucHV0YnVmZmVyIiwiX2Jhc2VVUkwiLCJfbGlzdCIsIl90cyIsImZyYWdMZW5ndGgiLCJfbGFzdGdldCIsIl9hdWRvY2xlYXIiLCJhdXRvY2xlYXIiLCJiYXNlVVJMIiwiZG93bmxvYWRlZCIsImRvd25sb2FkaW5nIiwiZGVsZXRlRnJhZyIsInRpbWUiLCJwdXNoTTNVOCIsImRlbGV0ZXByZSIsIm5ld2ZyYWdsaXN0IiwidHNsaXN0IiwiZ2V0VHNMaXN0IiwidHNuYW1lIiwiaXNsb2FkZWQiLCJsb2FkaW5nIiwiZ2V0VHNCeU5hbWUiLCJnZXRUcyIsInRpbWVsaXN0IiwiY2xlYXJEb3dubG9hZGVkIiwibCIsIkZldGNoTG9hZGVyIiwiUkVBRF9TVFJFQU0iLCJSRUFEX1RFWFQiLCJSRUFEX0pTT04iLCJSRUFEX0JVRkZFUiIsInN0YXR1cyIsIl9yZWFkZXIiLCJfY2FuY2VsZWQiLCJfZGVzdHJveWVkIiwicmVhZHR5cGUiLCJfbG9hZGVyVGFza05vIiwiTEFERVJfU1RBUlQiLCJsb2FkIiwib3B0cyIsIl90aGlzIiwicGFyYW1zIiwiZ2V0UGFyYW1zIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJvayIsIl9vbkZldGNoUmVzcG9uc2UiLCJMT0FERVJfRVJST1IiLCJjYXRjaCIsInRhc2tubyIsImpzb24iLCJMT0FERVJfQ09NUExFVEUiLCJhcnJheUJ1ZmZlciIsIl9vblJlYWRlciIsImdldFJlYWRlciIsInJlYWRlciIsImNhbmNlbCIsImUiLCJ2YWwiLCJkb25lIiwiTE9BREVSX0RBVEFMT0FERUQiLCJoZWFkZXJzIiwiSGVhZGVycyIsIm1vZGUiLCJjYWNoZSIsImNvbmZpZ0hlYWRlcnMiLCJoYXNPd25Qcm9wZXJ0eSIsImFwcGVuZCIsIm9wdEhlYWRlcnMiLCJjb3JzIiwid2l0aENyZWRlbnRpYWxzIiwiY3JlZGVudGlhbHMiLCJNcDRSZW11eGVyIiwiRm1wNCIsIkJ1ZmZlciIsIndyaXRlVWludDMyIiwiaW5pdEJveCIsImNvbnRlbnQiLCJ3cml0ZSIsImV4dGVuc2lvbiIsImZsYWciLCJmdHlwIiwibW9vdiIsIm12aGQiLCJ0cmFrIiwidmlkZW9UcmFrIiwiYXVkaW9UcmFrIiwibXZleCIsImZvckVhY2giLCJieXRlcyIsInRraGQiLCJtZGlhIiwic2FtcGxlcmF0ZSIsImVkdHMiLCJtZWRpYVRpbWUiLCJtZGhkIiwiaGRsciIsIm1pbmYiLCJzcGxpY2UiLCJ2bWhkIiwic21oZCIsImRpbmYiLCJzdGJsIiwiZHJlZiIsInN0c2QiLCJzdHRzIiwic3RzYyIsInN0c3oiLCJzdGNvIiwibXA0YSIsImF2YzEiLCJlc2RzIiwiY29uZmlnbGVuIiwiaFNwYWNpbmciLCJ2U3BhY2luZyIsImJ0cnQiLCJwYXNwIiwidHJhY2tJRCIsIm1laGQiLCJ0cmV4IiwibW9vZiIsIm1maGQiLCJ0cmFmIiwidGZoZCIsInRmZHQiLCJzZHRwIiwidHJ1biIsInNkdHBMZW5ndGgiLCJzYW1wbGVDb3VudCIsImZsYWdzIiwiaXNMZWFkaW5nIiwiZGVwZW5kc09uIiwiaXNEZXBlbmRlZE9uIiwiaGFzUmVkdW5kYW5jeSIsImlzTm9uU3luYyIsIm51bSIsIm1kYXQiLCJtZGF0Qm94IiwiY2hhckNvZGVBdCIsIl9pc0R0c0Jhc2VJbml0ZWQiLCJfYXVkaW9OZXh0RHRzIiwiX3ZpZGVvTmV4dER0cyIsIl92aWRlb1NlZ21lbnRMaXN0IiwiTWVkaWFTZWdtZW50TGlzdCIsIl9hdWRpb1NlZ21lbnRMaXN0IiwiYnJvd3NlciIsInNuaWZmZXIiLCJfZmlsbFNpbGVuY2VGcmFtZSIsImlzRmlyc3RWaWRlbyIsImlzRmlyc3RBdWRpbyIsInZpZGVvQWxsRHVyYXRpb24iLCJhdWRpb0FsbER1cmF0aW9uIiwicmVtdXgiLCJSRU1VWF9NRVRBREFUQSIsIm9uTWV0YURhdGFSZWFkeSIsIkRFVEVDVF9DSEFOR0VfU1RSRUFNIiwicmVzZXREdHNCYXNlIiwiX2R0c0Jhc2VJbml0ZWQiLCJjYWxjRHRzQmFzZSIsIl9yZW11eFZpZGVvIiwiX3JlbXV4QXVkaW8iLCJzZWVrIiwicHJlc291cmNlYnVmZmVyIiwicmVtdXhJbml0U2VnbWVudCIsIklOSVRfU0VHTUVOVCIsImluaXRTZWdtZW50IiwiYXVkaW9CYXNlIiwidmlkZW9CYXNlIiwibXA0U2FtcGxlcyIsIm1heExvb3AiLCJhdmNTYW1wbGUiLCJtZGF0U2FtcGxlIiwic2FtcGxlRHVyYXRpb24iLCJ2aWRlb01ldGEiLCJSQU5ET01fQUNDRVNTX1BPSU5UIiwibW9vZk1kYXQiLCJ3cml0ZVRvU291cmNlIiwiTUVESUFfU0VHTUVOVCIsImxhc3RTYW1wbGUiLCJpc0ZpcnN0RHRzSW5pdGVkIiwiYXVkaW9NZXRhIiwibXA0U2FtcGxlIiwiaW5pdFNpbGVudEF1ZGlvIiwiX2F1ZGlvTWV0YSIsIkNvbnRleHQiLCJXT1JLRVJfQ09NTUFORFMiLCJNZWRpYUluZm8iLCJNZWRpYVNhbXBsZSIsIk1lZGlhU2VnbWVudCIsIk1zZSIsIkNyeXB0byIsIlJlc3VsdENvbnN0cnVjdG9yIiwidG90YWxMZW5ndGgiLCJfbGVuIiwiYXJyYXlzIiwiX2tleSIsIl9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24iLCJfZGlkSXRlcmF0b3JFcnJvciIsIl9pdGVyYXRvckVycm9yIiwiX2l0ZXJhdG9yIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJfc3RlcCIsInJldHVybiIsIl9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yIiwiX2RpZEl0ZXJhdG9yRXJyb3IyIiwiX2l0ZXJhdG9yRXJyb3IyIiwiX2l0ZXJhdG9yMiIsIl9zdGVwMiIsIl9hcnIiLCJfY29uY2F0IiwiX2NvbmNhdDIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib2JqIiwiX19lc01vZHVsZSIsIlJFTVVYX0VSUk9SIiwiTVNFX0VWRU5UUyIsIlNPVVJDRV9VUERBVEVfRU5EIiwiSExTX0VWRU5UUyIsIlJFVFJZX1RJTUVfRVhDRUVERUQiLCJDUllUT19FVkVOVFMiLCJTVEFSVF9ERUNSWVBUIiwiREVDUllQVEVEIiwiQUxMRVZFTlRTIiwiRmx2QWxsb3dlZEV2ZW50cyIsIkhsc0FsbG93ZWRFdmVudHMiLCJDT05URVhUX0NPTU9NQU5EUyIsIk9OIiwiT05DRSIsIk9GRiIsIkVNSVQiLCJERVNUUk9ZIiwiRElSRUNUX0VNSVRfRkxBRyIsImFsbG93ZWRFdmVudHMiLCJfZW1pdHRlciIsIl9pbnN0YW5jZU1hcCIsIl9jbHNNYXAiLCJfaW5pdGVkIiwiX2hvb2tzIiwiX2VtaXRDb3VudGVyIiwidGFnIiwiaW5zdGFuY2UiLCJpbml0SW5zdGFuY2UiLCJuZXdJbnN0YW5jZSIsInJlZ2lzdHJ5IiwiY2xzIiwiY2hlY2tNZXNzYWdlTmFtZSIsIl9pc01lc3NhZ2VOYW1lVmFsaWQiLCJzZWxmIiwiZW5oYW5jZWQiLCJjIiwib25jZUxpc3RlbmVycyIsIm1lc3NhZ2VOYW1lIiwiY2FsbGJhY2siLCJiZWZvcmVMaXN0IiwiZW1pdFRvIiwicmVtb3ZlTGlzdGVuZXJzIiwiaGFzT3duIiwiY2FsbGJhY2tzIiwiZGVzdHJveUluc3RhbmNlcyIsIm91dHB1dEJ1ZmZlciIsIm91dHB1dGJ1ZmZlciIsImNyeXB0byIsIm1zQ3J5cHRvIiwiZGVjcmlwdCIsImFlc2tleSIsInNia2V5Iiwic3VidGxlIiwiaW1wb3J0S2V5IiwiZGVjcmlwdERhdGEiLCJkZWNyeXB0IiwicmVzIiwibGUiLCJzZXRJbnQxNiIsIkludDE2QXJyYXkiLCJkZXZpY2UiLCJvcyIsImlzUGMiLCJpc1RhYmxldCIsInVhIiwicmVnIiwiaWUiLCJmaXJmb3giLCJjaHJvbWUiLCJvcGVyYSIsInNhZmFyaSIsImlzV2luZG93c1Bob25lIiwiaXNTeW1iaWFuIiwiaXNBbmRyb2lkIiwiaXNGaXJlRm94IiwiaXNQaG9uZSIsIm91dCIsImlucHV0IiwiZnJvbUNoYXJDb2RlIiwiX2NoZWNrQ29udGludWF0aW9uIiwidWNzNCIsImpvaW4iLCJjaGVja0xlbmd0aCIsImlzT2JqZWN0RmlsbGVkIiwibWltZVR5cGUiLCJpc0NvbXBsZXRlIiwiaXNCYXNlSW5mb1JlYWR5IiwiaXNWaWRlb1JlYWR5IiwiaXNBdWRpb1JlYWR5IiwiX2RlZmF1bHQiLCJnZXREZWZhdWx0SW5mIiwiZW50cmllcyIsInYiLCJpc1JBUCIsIl90eXBlIiwiX2xhc3RBcHBlbmRMb2NhdGlvbiIsImlzRW1wdHkiLCJfc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUiLCJiZWdpbkR0cyIsImxhc3QiLCJtaWQiLCJsYm91bmQiLCJ1Ym91bmQiLCJpZHgiLCJfc2VhcmNoTmVhcmVzdFNlZ21lbnRBZnRlciIsInNlZ21lbnQiLCJsYXN0QXBwZW5kSWR4IiwiaW5zZXJ0SWR4Iiwib3JpZ2luU3RhcnREdHMiLCJnZXRMYXN0U2VnbWVudEJlZm9yZSIsImdldExhc3RTYW1wbGVCZWZvcmUiLCJnZXRMYXN0UkFQQmVmb3JlIiwic2VnbWVudElkeCIsInJhbmRvbUFjY2Vzc1BvaW50cyIsInN0YXJ0RHRzIiwiZW5kRHRzIiwic3RhcnRQdHMiLCJlbmRQdHMiLCJvcmlnaW5FbmREdHMiLCJhZGRSQVAiLCJnZXREZWZhdWx0IiwiTVNFIiwiY29udGFpbmVyIiwibWVkaWFTb3VyY2UiLCJzb3VyY2VCdWZmZXJzIiwicHJlbG9hZFRpbWUiLCJvblNvdXJjZU9wZW4iLCJvblRpbWVVcGRhdGUiLCJvblVwZGF0ZUVuZCIsIm9uV2FpdGluZyIsIk1lZGlhU291cmNlIiwiYWRkRXZlbnRMaXN0ZW5lciIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsImFkZFNvdXJjZUJ1ZmZlcnMiLCJkb0FwcGVuZCIsInJlYWR5U3RhdGUiLCJhZGQiLCJkdXIiLCJtaW1lIiwic291cmNlQnVmZmVyIiwiYWRkU291cmNlQnVmZmVyIiwidXBkYXRpbmciLCJpbml0ZWQiLCJhcHBlbmRCdWZmZXIiLCJlbmRPZlN0cmVhbSIsImFjdGl2ZVNvdXJjZUJ1ZmZlcnMiLCJyZW1vdmUiLCJyZW1vdmVCdWZmZXJzIiwidGFza0xpc3QiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwidGFzayIsIlByb21pc2UiLCJkb0NsZWFuQnVmZmVyIiwicmV0cnlUaW1lIiwiY2xlYW4iLCJjbGVhckJ1ZmZlciIsInNldFRpbWVvdXQiLCJhbGwiLCJyZW1vdmVTb3VyY2VCdWZmZXIiLCJyZXZva2VPYmplY3RVUkwiLCJidWZmZXJlZCIsImJFbmQiLCJyZWFkQXNJbnQiLCJ0ZW1wIiwicGFkU3RhcnQ0SGV4IiwiaGV4TnVtIiwiaGV4U3RyIiwicGFkU3RhcnQiLCJsb29wIiwic2lnbiIsInJlYWRVaW50NjQiLCJyZWFkSW50MTYiLCJyZWFkSW50MzIiLCJUYWciLCJMb2dnZXIiLCJGTFZfRVJST1IiLCJGbHZDb250cm9sbGVyIiwicGxheWVyIiwiX3BsYXllciIsImluaXRTZWdtZW50QXJyaXZlZCIsImJ1ZmZlckNsZWFyVGltZXIiLCJSZW11eGVyIiwiY29tcGF0aWJpbGl0eSIsIm1zZSIsIl9oYW5kbGVUaW1lVXBkYXRlIiwiaW5pdExpc3RlbmVycyIsIl9oYW5kbGVMb2FkZXJEYXRhTG9hZGVkIiwiX2hhbmRsZU5ldHdvcmtFcnJvciIsIl9oYW5kbGVNZWRpYUluZm8iLCJfaGFuZGxlTWV0YWRhdGFQYXJzZWQiLCJfaGFuZGxlRGVtdXhDb21wbGV0ZSIsIl9oYW5kbGVEZW11eEVycm9yIiwiX2hhbmRsZUFwcGVuZEluaXRTZWdtZW50IiwiX2hhbmRsZU1lZGlhU2VnbWVudCIsIl9oYW5kbGVBZGRSQVAiLCJfaGFuZGxlU291cmNlVXBkYXRlRW5kIiwiY3VycmVudFRpbWUiLCJidWZmZXJFbmQiLCJyYW5nZSIsImJ1ZmZlclN0YXJ0IiwicmFwIiwiUGxheWVyIiwiRXJyb3JzIiwiX29uRXJyb3IiLCJmYXRhbCIsIm1vZCIsImVycm9yVHlwZSIsImVycm9yRGV0YWlscyIsImVycm9yRmF0YWwiLCJsb2FkRGF0YSIsInBhdXNlIiwibG9hZGVyIiwiZmx2QWxsb3dlZEV2ZW50cyIsIkZsdlBsYXllciIsImluaXRFdmVudHMiLCJsb2FkZXJDb21wbGV0ZVRpbWVyIiwiaW5pdEZsdiIsImZsdiIsImluaXRGbHZFdmVudHMiLCJ1dGlsIiwiYWRkQ2xhc3MiLCJyb290IiwiZmluZERvbSIsImxpdmUiLCJjcmVhdGVEb20iLCJjb250cm9scyIsImFwcGVuZENoaWxkIiwicGF1c2VkIiwic2V0SW50ZXJ2YWwiLCJnZXRCdWZmZXJlZFJhbmdlIiwiY2xlYXJJbnRlcnZhbCIsIkZMViIsInBsYXkiLCJfaGFzU3RhcnQiLCJfZGVzdHJveSIsImN1cnJlbnRTcmMiXSwibWFwcGluZ3MiOiI7O1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O0FBQ0EsV0FBS3ZsQyxPQUFMLEdBQWUsSUFBZjtBQUNBLFVBQUksS0FBS3FsQyxtQkFBVCxFQUE4QjtBQUM1QjdvQixlQUFPNHBCLGFBQVAsQ0FBcUIsS0FBS2YsbUJBQTFCO0FBQ0Q7QUFDRixLQVBNLENBQVA7QUFRRDs7QUFFRCxNQUFJaDBCLEdBQUosR0FBVztBQUNULFdBQU8sS0FBS28xQixVQUFaO0FBQ0Q7O0FBRUQsTUFBSXAxQixHQUFKLENBQVN5UCxHQUFULEVBQWM7QUFDWixTQUFLaWlCLE1BQUwsQ0FBWW5tQixNQUFaLENBQW1Ca0UsR0FBbkIsR0FBeUJBLEdBQXpCO0FBQ0EsUUFBSSxDQUFDLEtBQUttbEIsTUFBVixFQUFrQjtBQUNoQixXQUFLakIsS0FBTDtBQUNBLFdBQUtsakMsSUFBTCxDQUFVLE9BQVYsRUFBbUIsTUFBTTtBQUN2QixhQUFLZ0QsS0FBTCxDQUFXZ2MsR0FBWDtBQUNELE9BRkQ7QUFHQSxXQUFLaGYsSUFBTCxDQUFVLFNBQVYsRUFBcUIsTUFBTTtBQUN6QixhQUFLd2tDLElBQUw7QUFDRCxPQUZEO0FBR0QsS0FSRCxNQVFPO0FBQ0wsV0FBS3hoQyxLQUFMLENBQVdnYyxHQUFYO0FBQ0Q7QUFDRCxTQUFLaGYsSUFBTCxDQUFVLFNBQVYsRUFBcUIsTUFBTTtBQUN6QixXQUFLb2lDLFdBQUwsR0FBbUIsQ0FBbkI7QUFDRCxLQUZEO0FBR0Q7QUFqSTRCOztBQW9JL0JubUMsT0FBT0MsT0FBUCxHQUFpQm1uQyxTQUFqQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pJQSxhQUFhLG1DQUFtQyxFQUFFLEkiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUiA9IHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyA/IFJlZmxlY3QgOiBudWxsXG52YXIgUmVmbGVjdEFwcGx5ID0gUiAmJiB0eXBlb2YgUi5hcHBseSA9PT0gJ2Z1bmN0aW9uJ1xuICA/IFIuYXBwbHlcbiAgOiBmdW5jdGlvbiBSZWZsZWN0QXBwbHkodGFyZ2V0LCByZWNlaXZlciwgYXJncykge1xuICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbCh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKTtcbiAgfVxuXG52YXIgUmVmbGVjdE93bktleXNcbmlmIChSICYmIHR5cGVvZiBSLm93bktleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgUmVmbGVjdE93bktleXMgPSBSLm93bktleXNcbn0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpXG4gICAgICAuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSk7XG4gIH07XG59IGVsc2Uge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBQcm9jZXNzRW1pdFdhcm5pbmcod2FybmluZykge1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbn1cblxudmFyIE51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uIE51bWJlcklzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgRXZlbnRFbWl0dGVyLmluaXQuY2FsbCh0aGlzKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50c0NvdW50ID0gMDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxudmFyIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50RW1pdHRlciwgJ2RlZmF1bHRNYXhMaXN0ZW5lcnMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oYXJnKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcgIT09ICdudW1iZXInIHx8IGFyZyA8IDAgfHwgTnVtYmVySXNOYU4oYXJnKSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgYXJnICsgJy4nKTtcbiAgICB9XG4gICAgZGVmYXVsdE1heExpc3RlbmVycyA9IGFyZztcbiAgfVxufSk7XG5cbkV2ZW50RW1pdHRlci5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgaWYgKHRoaXMuX2V2ZW50cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICB0aGlzLl9ldmVudHMgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzKSB7XG4gICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufTtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBuIDwgMCB8fCBOdW1iZXJJc05hTihuKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJuXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIG4gKyAnLicpO1xuICB9XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gJGdldE1heExpc3RlbmVycyh0aGF0KSB7XG4gIGlmICh0aGF0Ll9tYXhMaXN0ZW5lcnMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIHJldHVybiB0aGF0Ll9tYXhMaXN0ZW5lcnM7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gJGdldE1heExpc3RlbmVycyh0aGlzKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICB2YXIgYXJncyA9IFtdO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIHZhciBkb0Vycm9yID0gKHR5cGUgPT09ICdlcnJvcicpO1xuXG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZClcbiAgICBkb0Vycm9yID0gKGRvRXJyb3IgJiYgZXZlbnRzLmVycm9yID09PSB1bmRlZmluZWQpO1xuICBlbHNlIGlmICghZG9FcnJvcilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAoZG9FcnJvcikge1xuICAgIHZhciBlcjtcbiAgICBpZiAoYXJncy5sZW5ndGggPiAwKVxuICAgICAgZXIgPSBhcmdzWzBdO1xuICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAvLyBOb3RlOiBUaGUgY29tbWVudHMgb24gdGhlIGB0aHJvd2AgbGluZXMgYXJlIGludGVudGlvbmFsLCB0aGV5IHNob3dcbiAgICAgIC8vIHVwIGluIE5vZGUncyBvdXRwdXQgaWYgdGhpcyByZXN1bHRzIGluIGFuIHVuaGFuZGxlZCBleGNlcHRpb24uXG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICB9XG4gICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuaGFuZGxlZCBlcnJvci4nICsgKGVyID8gJyAoJyArIGVyLm1lc3NhZ2UgKyAnKScgOiAnJykpO1xuICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgdGhyb3cgZXJyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICB9XG5cbiAgdmFyIGhhbmRsZXIgPSBldmVudHNbdHlwZV07XG5cbiAgaWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgUmVmbGVjdEFwcGx5KGhhbmRsZXIsIHRoaXMsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBSZWZsZWN0QXBwbHkobGlzdGVuZXJzW2ldLCB0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuZnVuY3Rpb24gX2FkZExpc3RlbmVyKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIsIHByZXBlbmQpIHtcbiAgdmFyIG07XG4gIHZhciBldmVudHM7XG4gIHZhciBleGlzdGluZztcblxuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cblxuICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRhcmdldC5fZXZlbnRzQ291bnQgPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICAgIGlmIChldmVudHMubmV3TGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0LmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyID8gbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgICAgIC8vIFJlLWFzc2lnbiBgZXZlbnRzYCBiZWNhdXNlIGEgbmV3TGlzdGVuZXIgaGFuZGxlciBjb3VsZCBoYXZlIGNhdXNlZCB0aGVcbiAgICAgIC8vIHRoaXMuX2V2ZW50cyB0byBiZSBhc3NpZ25lZCB0byBhIG5ldyBvYmplY3RcbiAgICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICAgIH1cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXTtcbiAgfVxuXG4gIGlmIChleGlzdGluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICArK3RhcmdldC5fZXZlbnRzQ291bnQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBleGlzdGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9XG4gICAgICAgIHByZXBlbmQgPyBbbGlzdGVuZXIsIGV4aXN0aW5nXSA6IFtleGlzdGluZywgbGlzdGVuZXJdO1xuICAgICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIH0gZWxzZSBpZiAocHJlcGVuZCkge1xuICAgICAgZXhpc3RpbmcudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4aXN0aW5nLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gICAgbSA9ICRnZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICBpZiAobSA+IDAgJiYgZXhpc3RpbmcubGVuZ3RoID4gbSAmJiAhZXhpc3Rpbmcud2FybmVkKSB7XG4gICAgICBleGlzdGluZy53YXJuZWQgPSB0cnVlO1xuICAgICAgLy8gTm8gZXJyb3IgY29kZSBmb3IgdGhpcyBzaW5jZSBpdCBpcyBhIFdhcm5pbmdcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nLmxlbmd0aCArICcgJyArIFN0cmluZyh0eXBlKSArICcgbGlzdGVuZXJzICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnaW5jcmVhc2UgbGltaXQnKTtcbiAgICAgIHcubmFtZSA9ICdNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmcnO1xuICAgICAgdy5lbWl0dGVyID0gdGFyZ2V0O1xuICAgICAgdy50eXBlID0gdHlwZTtcbiAgICAgIHcuY291bnQgPSBleGlzdGluZy5sZW5ndGg7XG4gICAgICBQcm9jZXNzRW1pdFdhcm5pbmcodyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuXG5mdW5jdGlvbiBvbmNlV3JhcHBlcigpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBSZWZsZWN0QXBwbHkodGhpcy5saXN0ZW5lciwgdGhpcy50YXJnZXQsIGFyZ3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJlcGVuZExpc3RlbmVyKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuLy8gRW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmIGFuZCBvbmx5IGlmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgbGlzdCwgZXZlbnRzLCBwb3NpdGlvbiwgaSwgb3JpZ2luYWxMaXN0ZW5lcjtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgbGlzdCA9IGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHwgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3QubGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yIChpID0gbGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fCBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgb3JpZ2luYWxMaXN0ZW5lciA9IGxpc3RbaV0ubGlzdGVuZXI7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMClcbiAgICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNwbGljZU9uZShsaXN0LCBwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgZXZlbnRzW3R5cGVdID0gbGlzdFswXTtcblxuICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIG9yaWdpbmFsTGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbiAgICBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnModHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycywgZXZlbnRzLCBpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudHNbdHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBMSUZPIG9yZGVyXG4gICAgICAgIGZvciAoaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5mdW5jdGlvbiBfbGlzdGVuZXJzKHRhcmdldCwgdHlwZSwgdW53cmFwKSB7XG4gIHZhciBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuICBpZiAoZXZsaXN0ZW5lciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIHVud3JhcCA/IFtldmxpc3RlbmVyLmxpc3RlbmVyIHx8IGV2bGlzdGVuZXJdIDogW2V2bGlzdGVuZXJdO1xuXG4gIHJldHVybiB1bndyYXAgP1xuICAgIHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKSA6IGFycmF5Q2xvbmUoZXZsaXN0ZW5lciwgZXZsaXN0ZW5lci5sZW5ndGgpO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIHRydWUpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yYXdMaXN0ZW5lcnMgPSBmdW5jdGlvbiByYXdMaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcblxuICAgIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChldmxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgcmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50ID4gMCA/IFJlZmxlY3RPd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBuKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KG4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSlcbiAgICBjb3B5W2ldID0gYXJyW2ldO1xuICByZXR1cm4gY29weTtcbn1cblxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAoOyBpbmRleCArIDEgPCBsaXN0Lmxlbmd0aDsgaW5kZXgrKylcbiAgICBsaXN0W2luZGV4XSA9IGxpc3RbaW5kZXggKyAxXTtcbiAgbGlzdC5wb3AoKTtcbn1cblxuZnVuY3Rpb24gdW53cmFwTGlzdGVuZXJzKGFycikge1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGFyci5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5sZW5ndGg7ICsraSkge1xuICAgIHJldFtpXSA9IGFycltpXS5saXN0ZW5lciB8fCBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBUcmFjazogcmVxdWlyZSgnLi9zcmMvdHJhY2snKS5kZWZhdWx0LFxuICBUcmFja3M6IHJlcXVpcmUoJy4vc3JjL3RyYWNrJykuVHJhY2tzLFxuICBBdWRpb1RyYWNrOiByZXF1aXJlKCcuL3NyYy90cmFjaycpLkF1ZGlvVHJhY2ssXG4gIFZpZGVvVHJhY2s6IHJlcXVpcmUoJy4vc3JjL3RyYWNrJykuVmlkZW9UcmFjayxcblxuICBYZ0J1ZmZlcjogcmVxdWlyZSgnLi9zcmMvYnVmZmVyJykuWGdCdWZmZXIsXG4gIFJlbXV4QnVmZmVyOiByZXF1aXJlKCcuL3NyYy9idWZmZXInKS5SZW11eEJ1ZmZlcixcblxuICBQcmVTb3VyY2U6IHJlcXVpcmUoJy4vc3JjL3ByZXNvdWNlJykuZGVmYXVsdFxufTtcbiIsImV4cG9ydCBjbGFzcyBYZ0J1ZmZlciB7XG4gIC8qKlxuICAgKiBBIGJ1ZmZlciB0byBzdG9yZSBsb2FkZWQgZGF0YS5cbiAgICpcbiAgICogQGNsYXNzIExvYWRlckJ1ZmZlclxuICAgKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoIC0gT3B0aW9uYWwgdGhlIGJ1ZmZlciBzaXplXG4gICAqL1xuICBjb25zdHJ1Y3RvciAobGVuZ3RoKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGggfHwgMFxuICAgIHRoaXMuaGlzdG9yeUxlbiA9IGxlbmd0aCB8fCAwXG4gICAgdGhpcy5hcnJheSA9IFtdXG4gICAgdGhpcy5vZmZzZXQgPSAwXG4gIH1cblxuICAvKipcbiAgICogVGhlIGZ1bmN0aW9uIHRvIHB1c2ggZGF0YS5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IGRhdGEgLSBUaGUgZGF0YSB0byBwdXNoIGludG8gdGhlIGJ1ZmZlclxuICAgKi9cbiAgcHVzaCAoZGF0YSkge1xuICAgIHRoaXMuYXJyYXkucHVzaChkYXRhKVxuICAgIHRoaXMubGVuZ3RoICs9IGRhdGEuYnl0ZUxlbmd0aFxuICAgIHRoaXMuaGlzdG9yeUxlbiArPSBkYXRhLmJ5dGVMZW5ndGhcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgZnVuY3Rpb24gdG8gc2hpZnQgZGF0YS5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aCAtIFRoZSBzaXplIG9mIHNoaWZ0LlxuICAgKi9cbiAgc2hpZnQgKGxlbmd0aCkge1xuICAgIGlmICh0aGlzLmFycmF5Lmxlbmd0aCA8IDEpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheSgwKVxuICAgIH1cblxuICAgIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NoaWZ0QnVmZmVyKClcbiAgICB9XG4gICAgaWYgKCh0aGlzLm9mZnNldCArIGxlbmd0aCkgPT09IHRoaXMuYXJyYXlbMF0ubGVuZ3RoKSB7XG4gICAgICBsZXQgcmV0ID0gdGhpcy5hcnJheVswXS5zbGljZSh0aGlzLm9mZnNldCwgdGhpcy5vZmZzZXQgKyBsZW5ndGgpXG4gICAgICB0aGlzLm9mZnNldCA9IDBcbiAgICAgIHRoaXMuYXJyYXkuc2hpZnQoKVxuICAgICAgdGhpcy5sZW5ndGggLT0gbGVuZ3RoXG4gICAgICByZXR1cm4gcmV0XG4gICAgfVxuXG4gICAgaWYgKCh0aGlzLm9mZnNldCArIGxlbmd0aCkgPCB0aGlzLmFycmF5WzBdLmxlbmd0aCkge1xuICAgICAgbGV0IHJldCA9IHRoaXMuYXJyYXlbMF0uc2xpY2UodGhpcy5vZmZzZXQsIHRoaXMub2Zmc2V0ICsgbGVuZ3RoKVxuICAgICAgdGhpcy5vZmZzZXQgKz0gbGVuZ3RoXG4gICAgICB0aGlzLmxlbmd0aCAtPSBsZW5ndGhcbiAgICAgIHJldHVybiByZXRcbiAgICB9XG5cbiAgICBsZXQgcmV0ID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKVxuICAgIGxldCB0bXBvZmYgPSAwXG4gICAgd2hpbGUgKHRoaXMuYXJyYXkubGVuZ3RoID4gMCAmJiBsZW5ndGggPiAwKSB7XG4gICAgICBpZiAoKHRoaXMub2Zmc2V0ICsgbGVuZ3RoKSA8IHRoaXMuYXJyYXlbMF0ubGVuZ3RoKSB7XG4gICAgICAgIGxldCB0bXAgPSB0aGlzLmFycmF5WzBdLnNsaWNlKHRoaXMub2Zmc2V0LCB0aGlzLm9mZnNldCArIGxlbmd0aClcbiAgICAgICAgcmV0LnNldCh0bXAsIHRtcG9mZilcbiAgICAgICAgdGhpcy5vZmZzZXQgKz0gbGVuZ3RoXG4gICAgICAgIHRoaXMubGVuZ3RoIC09IGxlbmd0aFxuICAgICAgICBsZW5ndGggPSAwXG4gICAgICAgIGJyZWFrXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnbWFyazEnKVxuICAgICAgICBsZXQgdGVtcGxlbmd0aCA9IHRoaXMuYXJyYXlbMF0ubGVuZ3RoIC0gdGhpcy5vZmZzZXRcbiAgICAgICAgcmV0LnNldCh0aGlzLmFycmF5WzBdLnNsaWNlKHRoaXMub2Zmc2V0LCB0aGlzLmFycmF5WzBdLmxlbmd0aCksIHRtcG9mZilcbiAgICAgICAgdGhpcy5hcnJheS5zaGlmdCgpXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gMFxuICAgICAgICB0bXBvZmYgKz0gdGVtcGxlbmd0aFxuICAgICAgICB0aGlzLmxlbmd0aCAtPSB0ZW1wbGVuZ3RoXG4gICAgICAgIGxlbmd0aCAtPSB0ZW1wbGVuZ3RoXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXRcbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0byBjbGVhciB0aGUgYnVmZmVyLlxuICAgKi9cbiAgY2xlYXIgKCkge1xuICAgIHRoaXMuYXJyYXkgPSBbXVxuICAgIHRoaXMubGVuZ3RoID0gMFxuICAgIHRoaXMub2Zmc2V0ID0gMFxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5jbGVhcigpXG4gICAgdGhpcy5oaXN0b3J5TGVuID0gMFxuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRvIHNoaWZ0IG9uZSB1bml0OEFycmF5LlxuICAgKi9cbiAgX3NoaWZ0QnVmZmVyICgpIHtcbiAgICB0aGlzLmxlbmd0aCAtPSB0aGlzLmFycmF5WzBdLmxlbmd0aFxuICAgIHRoaXMub2Zmc2V0ID0gMFxuICAgIHJldHVybiB0aGlzLmFycmF5LnNoaWZ0KClcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IHVpbnQ4IGRhdGEgdG8gbnVtYmVyLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgLSB0aGUgc3RhcnQgcG9zdGlvbi5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aCAtIHRoZSBsZW5ndGggb2YgZGF0YS5cbiAgICovXG4gIHRvSW50IChzdGFydCwgbGVuZ3RoKSB7XG4gICAgbGV0IHJldEludCA9IDBcbiAgICBsZXQgaSA9IHRoaXMub2Zmc2V0ICsgc3RhcnRcbiAgICB3aGlsZSAoaSA8IHRoaXMub2Zmc2V0ICsgbGVuZ3RoICsgc3RhcnQpIHtcbiAgICAgIGlmIChpIDwgdGhpcy5hcnJheVswXS5sZW5ndGgpIHtcbiAgICAgICAgcmV0SW50ID0gcmV0SW50ICogMjU2ICsgdGhpcy5hcnJheVswXVtpXVxuICAgICAgfSBlbHNlIGlmICh0aGlzLmFycmF5WzFdKSB7XG4gICAgICAgIHJldEludCA9IHJldEludCAqIDI1NiArIHRoaXMuYXJyYXlbMV1baSAtIHRoaXMuYXJyYXlbMF0ubGVuZ3RoXVxuICAgICAgfVxuXG4gICAgICBpKytcbiAgICB9XG4gICAgcmV0dXJuIHJldEludFxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZW11eEJ1ZmZlciB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLnZpZGVvID0gW11cbiAgICB0aGlzLmF1ZGlvID0gW11cbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMudmlkZW8gPSBbXVxuICAgIHRoaXMuYXVkaW8gPSBbXVxuICB9XG59XG4iLCJjbGFzcyBTb3VyY2Uge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5taW1ldHlwZSA9ICcnO1xuICAgIHRoaXMuaW5pdCA9IG51bGw7XG4gICAgdGhpcy5kYXRhID0gW107XG4gIH1cbn1cblxuY2xhc3MgUHJlU291cmNlIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuc291cmNlcyA9IHt9O1xuICB9XG5cbiAgZ2V0U291cmNlIChzb3VyY2UpIHtcbiAgICByZXR1cm4gdGhpcy5zb3VyY2VzW3NvdXJjZV07XG4gIH1cblxuICBjcmVhdGVTb3VyY2UgKG5hbWUpIHtcbiAgICB0aGlzLnNvdXJjZXNbbmFtZV0gPSBuZXcgU291cmNlKCk7XG4gICAgcmV0dXJuIHRoaXMuc291cmNlc1tuYW1lXTtcbiAgfVxuXG4gIGNsZWFyICgpIHtcbiAgICB0aGlzLnNvdXJjZXMgPSB7fTtcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuc291cmNlcyA9IHt9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByZVNvdXJjZTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyYWNrIHtcbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3Rvci5cbiAgICovXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLmlkID0gLTFcbiAgICB0aGlzLnNlcXVlbmNlTnVtYmVyID0gMFxuICAgIHRoaXMuc2FtcGxlcyA9IFtdXG4gICAgdGhpcy5kcm9wcGVkU2FtcGxlcyA9IFtdXG4gICAgdGhpcy5sZW5ndGggPSAwXG4gIH1cblxuICAvKipcbiAgICogUmVzZXQgdGhlIHRyYWNrLlxuICAgKi9cbiAgcmVzZXQgKCkge1xuICAgIHRoaXMuc2VxdWVuY2VOdW1iZXIgPSAwXG4gICAgdGhpcy5zYW1wbGVzID0gW11cbiAgICB0aGlzLmxlbmd0aCA9IDBcbiAgfVxuICAvKipcbiAgICogZGVzdHJveSB0aGUgdHJhY2suXG4gICAqL1xuICBkaXN0cm95ICgpIHtcbiAgICB0aGlzLnJlc2V0KClcbiAgICB0aGlzLmlkID0gLTFcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQXVkaW9UcmFjayBleHRlbmRzIFRyYWNrIHtcbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciBmb3IgYXVkaW8gdHJhY2suXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuVEFHID0gJ0F1ZGlvVHJhY2snXG4gICAgdGhpcy50eXBlID0gJ2F1ZGlvJ1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWaWRlb1RyYWNrIGV4dGVuZHMgVHJhY2sge1xuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZvciB2aWRlbyB0cmFjay5cbiAgICovXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5UQUcgPSAnVmlkZW9UcmFjaydcbiAgICB0aGlzLnR5cGUgPSAndmlkZW8nXG4gICAgdGhpcy5kcm9wcGVkID0gMFxuICB9XG4gIC8qKlxuICAgKiByZXNldCB0aGUgdmlkZW8gdHJhY2suXG4gICAqL1xuICByZXNldCAoKSB7XG4gICAgdGhpcy5zZXF1ZW5jZU51bWJlciA9IDBcbiAgICB0aGlzLnNhbXBsZXMgPSBbXVxuICAgIHRoaXMubGVuZ3RoID0gMFxuICAgIHRoaXMuZHJvcHBlZCA9IDBcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVHJhY2tzIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuYXVkaW9UcmFjayA9IG51bGxcbiAgICB0aGlzLnZpZGVvVHJhY2sgPSBudWxsXG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmF1ZGlvVHJhY2sgPSBudWxsXG4gICAgdGhpcy52aWRlb1RyYWNrID0gbnVsbFxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgTmFsdW5pdDogcmVxdWlyZSgnLi9zcmMvaDI2NC9uYWx1bml0JykuZGVmYXVsdCxcbiAgU3BzUGFyc2VyOiByZXF1aXJlKCcuL3NyYy9oMjY0L25hbHVuaXQvc3BzJykuZGVmYXVsdCxcblxuICBDb21wYXRpYmlsaXR5OiByZXF1aXJlKCcuL3NyYy9jb21wYXRpYmlsaXR5JykuZGVmYXVsdFxufTtcbiIsIlxuY2xhc3MgQUFDIHtcblxuICBzdGF0aWMgZ2V0U2lsZW50RnJhbWUoY29kZWMsIGNoYW5uZWxDb3VudCkge1xuICAgIGlmIChjb2RlYyA9PT0gJ21wNGEuNDAuMicpIHtcbiAgICAgIC8vIGhhbmRsZSBMQy1BQUNcbiAgICAgIGlmIChjaGFubmVsQ291bnQgPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDAwLCAweGM4LCAweDAwLCAweDgwLCAweDIzLCAweDgwXSk7XG4gICAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gMikge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MjEsIDB4MDAsIDB4NDksIDB4OTAsIDB4MDIsIDB4MTksIDB4MDAsIDB4MjMsIDB4ODBdKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSAzKSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4ZV0pO1xuICAgICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFsweDAwLCAweGM4LCAweDAwLCAweDgwLCAweDIwLCAweDg0LCAweDAxLCAweDI2LCAweDQwLCAweDA4LCAweDY0LCAweDAwLCAweDgwLCAweDJjLCAweDgwLCAweDA4LCAweDAyLCAweDM4XSk7XG4gICAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gNSkge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4ODIsIDB4MzAsIDB4MDQsIDB4OTksIDB4MDAsIDB4MjEsIDB4OTAsIDB4MDIsIDB4MzhdKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSA2KSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4MiwgMHgzMCwgMHgwNCwgMHg5OSwgMHgwMCwgMHgyMSwgMHg5MCwgMHgwMiwgMHgwMCwgMHhiMiwgMHgwMCwgMHgyMCwgMHgwOCwgMHhlMF0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBoYW5kbGUgSEUtQUFDIChtcDRhLjQwLjUgLyBtcDRhLjQwLjI5KVxuICAgICAgaWYgKGNoYW5uZWxDb3VudCA9PT0gMSkge1xuICAgICAgICAvLyBmZm1wZWcgLXkgLWYgbGF2ZmkgLWkgXCJhZXZhbHNyYz0wOmQ9MC4wNVwiIC1jOmEgbGliZmRrX2FhYyAtcHJvZmlsZTphIGFhY19oZSAtYjphIDRrIG91dHB1dC5hYWMgJiYgaGV4ZHVtcCAtdiAtZSAnMTYvMSBcIjB4JXgsXCIgXCJcXG5cIicgLXYgb3V0cHV0LmFhY1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MSwgMHg0MCwgMHgyMiwgMHg4MCwgMHhhMywgMHg0ZSwgMHhlNiwgMHg4MCwgMHhiYSwgMHg4LCAweDAsIDB4MCwgMHgwLCAweDFjLCAweDYsIDB4ZjEsIDB4YzEsIDB4YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1YSwgMHg1ZV0pO1xuICAgICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDIpIHtcbiAgICAgICAgLy8gZmZtcGVnIC15IC1mIGxhdmZpIC1pIFwiYWV2YWxzcmM9MHwwOmQ9MC4wNVwiIC1jOmEgbGliZmRrX2FhYyAtcHJvZmlsZTphIGFhY19oZV92MiAtYjphIDRrIG91dHB1dC5hYWMgJiYgaGV4ZHVtcCAtdiAtZSAnMTYvMSBcIjB4JXgsXCIgXCJcXG5cIicgLXYgb3V0cHV0LmFhY1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MSwgMHg0MCwgMHgyMiwgMHg4MCwgMHhhMywgMHg1ZSwgMHhlNiwgMHg4MCwgMHhiYSwgMHg4LCAweDAsIDB4MCwgMHgwLCAweDAsIDB4OTUsIDB4MCwgMHg2LCAweGYxLCAweGExLCAweGEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWVdKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSAzKSB7XG4gICAgICAgIC8vIGZmbXBlZyAteSAtZiBsYXZmaSAtaSBcImFldmFsc3JjPTB8MHwwOmQ9MC4wNVwiIC1jOmEgbGliZmRrX2FhYyAtcHJvZmlsZTphIGFhY19oZV92MiAtYjphIDRrIG91dHB1dC5hYWMgJiYgaGV4ZHVtcCAtdiAtZSAnMTYvMSBcIjB4JXgsXCIgXCJcXG5cIicgLXYgb3V0cHV0LmFhY1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MSwgMHg0MCwgMHgyMiwgMHg4MCwgMHhhMywgMHg1ZSwgMHhlNiwgMHg4MCwgMHhiYSwgMHg4LCAweDAsIDB4MCwgMHgwLCAweDAsIDB4OTUsIDB4MCwgMHg2LCAweGYxLCAweGExLCAweGEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWEsIDB4NWVdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBQUM7XG4iLCJpbXBvcnQge0VWRU5UU30gZnJvbSAneGdwbGF5ZXItdXRpbHMnXG5pbXBvcnQgQUFDIGZyb20gJy4vYWFjL2FhYy1oZWxwZXInXG5cbmNvbnN0IHtSRU1VWF9FVkVOVFMsIExPQURFUl9FVkVOVFN9ID0gRVZFTlRTXG5cbmNsYXNzIENvbXBhdGliaWxpdHkge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5uZXh0QXVkaW9EdHMgPSAwIC8vIOaooeaLn+S4i+S4gOautemfs+mikeaVsOaNrueahGR0c1xuICAgIHRoaXMubmV4dFZpZGVvRHRzID0gMCAvLyDmqKHmi5/kuIvkuIDmrrXop4bpopHmlbDmja7nmoRkdHNcblxuICAgIHRoaXMubGFzdEF1ZGlvU2FtcGxlc0xlbiA9IDAgLy8g5LiK5LiA5q616Z+z6aKR5pWw5o2u55qE6ZW/5bqmXG4gICAgdGhpcy5sYXN0VmlkZW9TYW1wbGVzTGVuID0gMCAvLyDkuIrkuIDmrrXop4bpopHmlbDmja7nmoTplb/luqZcblxuICAgIHRoaXMubGFzdFZpZGVvRHRzID0gdW5kZWZpbmVkIC8vIOS4iuS4gOautemfs+mikeaVsOaNrueahOmVv+W6plxuICAgIHRoaXMubGFzdEF1ZGlvRHRzID0gdW5kZWZpbmVkIC8vIOS4iuS4gOauteinhumikeaVsOaNrueahOmVv+W6plxuXG4gICAgdGhpcy5hbGxBdWRpb1NhbXBsZXNDb3VudCA9IDAgLy8g6Z+z6aKR5oC75pWw5o2u6YePKOWOn+Wni+W4pylcbiAgICB0aGlzLmFsbFZpZGVvU2FtcGxlc0NvdW50ID0gMCAvLyDop4bpopHmgLvmlbDmja7ph48o5Y6f5aeL5binKVxuXG4gICAgdGhpcy5fZmlyc3RBdWRpb1NhbXBsZSA9IG51bGxcbiAgICB0aGlzLl9maXJzdFZpZGVvU2FtcGxlID0gbnVsbFxuXG4gICAgdGhpcy5maWxsZWRBdWRpb1NhbXBsZXMgPSBbXSAvLyDooaXlhYXpn7PpopHluKfvvIjvvIlcbiAgICB0aGlzLmZpbGxlZFZpZGVvU2FtcGxlcyA9IFtdIC8vIOihpeWFheinhumikeW4p++8iO+8iVxuXG4gICAgdGhpcy52aWRlb0xhc3RTYW1wbGUgPSBudWxsXG4gICAgdGhpcy5hdWRpb0xhc3RTYW1wbGUgPSBudWxsIC8vIHN0YXNoIGxhc3Qgc2FtcGxlIGZvciBkdXJhdGlvbiBjb21wYXRcblxuICAgIHRoaXMuX3ZpZGVvTGFyZ2VHYXAgPSAwXG4gICAgdGhpcy5fYXVkaW9MYXJnZUdhcCA9IDBcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIHRoaXMuYmVmb3JlKFJFTVVYX0VWRU5UUy5SRU1VWF9NRURJQSwgdGhpcy5kb0ZpeC5iaW5kKHRoaXMpKVxuICAgIC8vIHRoaXMub24oTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsICgpID0+IHtcbiAgICAvLyAgIGlmICh0aGlzLnZpZGVvTGFzdFNhbXBsZSkge1xuICAgIC8vICAgICB0aGlzLnZpZGVvVHJhY2suc2FtcGxlcy51bnNoaWZ0KHRoaXMudmlkZW9MYXN0U2FtcGxlKVxuICAgIC8vICAgfVxuICAgIC8vIH0pXG4gIH1cblxuICByZXNldCAoKSB7XG4gICAgdGhpcy5uZXh0QXVkaW9EdHMgPSBudWxsIC8vIOS8sOeul+S4i+S4gOautemfs+mikeaVsOaNrueahGR0c1xuICAgIHRoaXMubmV4dFZpZGVvRHRzID0gbnVsbCAvLyDkvLDnrpfkuIvkuIDmrrXop4bpopHmlbDmja7nmoRkdHNcblxuICAgIHRoaXMubGFzdEF1ZGlvU2FtcGxlc0xlbiA9IDAgLy8g5LiK5LiA5q616Z+z6aKR5pWw5o2u55qE6ZW/5bqmXG4gICAgdGhpcy5sYXN0VmlkZW9TYW1wbGVzTGVuID0gMCAvLyDkuIrkuIDmrrXop4bpopHmlbDmja7nmoTplb/luqZcblxuICAgIHRoaXMubGFzdFZpZGVvRHRzID0gdW5kZWZpbmVkIC8vIOS4iuS4gOautemfs+mikeaVsOaNrueahOmVv+W6plxuICAgIHRoaXMubGFzdEF1ZGlvRHRzID0gdW5kZWZpbmVkIC8vIOS4iuS4gOauteinhumikeaVsOaNrueahOmVv+W6plxuXG4gICAgLy8gdGhpcy5hbGxBdWRpb1NhbXBsZXNDb3VudCA9IDAgLy8g6Z+z6aKR5oC75pWw5o2u6YePKOWOn+Wni+W4pylcbiAgICAvLyB0aGlzLmFsbFZpZGVvU2FtcGxlc0NvdW50ID0gMCAvLyDop4bpopHmgLvmlbDmja7ph48o5Y6f5aeL5binKVxuXG4gICAgLy8gdGhpcy5fZmlyc3RBdWRpb1NhbXBsZSA9IG51bGxcbiAgICAvLyB0aGlzLl9maXJzdFZpZGVvU2FtcGxlID0gbnVsbFxuXG4gICAgdGhpcy5maWxsZWRBdWRpb1NhbXBsZXMgPSBbXSAvLyDooaXlhYXpn7PpopHluKfvvIjvvIlcbiAgICB0aGlzLmZpbGxlZFZpZGVvU2FtcGxlcyA9IFtdIC8vIOihpeWFheinhumikeW4p++8iO+8iVxuICB9XG5cbiAgZG9GaXggKCkge1xuICAgIGNvbnN0IHsgaXNGaXJzdEF1ZGlvU2FtcGxlcywgaXNGaXJzdFZpZGVvU2FtcGxlcyB9ID0gdGhpcy5nZXRGaXJzdFNhbXBsZSgpXG5cbiAgICB0aGlzLnJlY29yZFNhbXBsZXNDb3VudCgpXG5cbiAgICBpZiAodGhpcy5fZmlyc3RWaWRlb1NhbXBsZSkge1xuICAgICAgdGhpcy5maXhSZWZTYW1wbGVEdXJhdGlvbih0aGlzLnZpZGVvVHJhY2subWV0YSwgdGhpcy52aWRlb1RyYWNrLnNhbXBsZXMpXG4gICAgfVxuICAgIGlmICh0aGlzLl9maXJzdEF1ZGlvU2FtcGxlKSB7XG4gICAgICB0aGlzLmZpeFJlZlNhbXBsZUR1cmF0aW9uKHRoaXMuYXVkaW9UcmFjay5tZXRhLCB0aGlzLmF1ZGlvVHJhY2suc2FtcGxlcylcbiAgICB9XG5cbiAgICBjb25zdCB7IGNoYW5nZWQ6IHZpZGVvQ2hhbmdlZCwgY2hhbmdlZElkeDogdmlkZW9DaGFuZ2VkSWR4IH0gPSBDb21wYXRpYmlsaXR5LmRldGFjdENoYW5nZVN0cmVhbSh0aGlzLnZpZGVvVHJhY2suc2FtcGxlcylcbiAgICBpZiAodmlkZW9DaGFuZ2VkICYmICFpc0ZpcnN0QXVkaW9TYW1wbGVzKSB7XG4gICAgICB0aGlzLmZpeENoYW5nZVN0cmVhbVZpZGVvKHZpZGVvQ2hhbmdlZElkeClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb0ZpeFZpZGVvKGlzRmlyc3RWaWRlb1NhbXBsZXMpXG4gICAgfVxuXG4gICAgY29uc3QgeyBjaGFuZ2VkOiBhdWRpb0NoYW5nZWQsIGNoYW5nZWRJZHg6IGF1ZGlvQ2hhbmdlZElkeCB9ID0gQ29tcGF0aWJpbGl0eS5kZXRhY3RDaGFuZ2VTdHJlYW0odGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMpXG4gICAgaWYgKGF1ZGlvQ2hhbmdlZCkge1xuICAgICAgdGhpcy5maXhDaGFuZ2VTdHJlYW1BdWRpbyhhdWRpb0NoYW5nZWRJZHgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZG9GaXhBdWRpbyhpc0ZpcnN0QXVkaW9TYW1wbGVzKVxuICAgIH1cblxuICAgIHRoaXMucmVtb3ZlSW52YWxpZFNhbXBsZXMoKVxuICB9XG5cbiAgZG9GaXhWaWRlbyAoZmlyc3QsIHN0cmVhbUNoYW5nZVN0YXJ0KSB7XG4gICAgbGV0IHtzYW1wbGVzOiB2aWRlb1NhbXBsZXMsIG1ldGF9ID0gdGhpcy52aWRlb1RyYWNrXG5cbiAgICAvLyBjb25zb2xlLmxvZygnbmV4dCB2aWRlbycsIHRoaXMubmV4dFZpZGVvRHRzKVxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB2aWRlb1NhbXBsZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IHNhbXBsZSA9IHZpZGVvU2FtcGxlc1tpXVxuICAgICAgc2FtcGxlLm9yaWdpbkR0cyA9IHNhbXBsZS5kdHNcbiAgICB9XG5cbiAgICBpZiAobWV0YS5mcmFtZVJhdGUgJiYgbWV0YS5mcmFtZVJhdGUuZml4ZWQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF2aWRlb1NhbXBsZXMgfHwgIXZpZGVvU2FtcGxlcy5sZW5ndGggfHwgIXRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIGNvbnNvbGUubG9nKGB2aWRlbyBsYXN0U2FtcGxlLCAke3ZpZGVvU2FtcGxlc1t2aWRlb1NhbXBsZXMubGVuZ3RoIC0gMV0uZHRzfWApXG5cbiAgICBjb25zdCBmaXJzdFNhbXBsZSA9IHZpZGVvU2FtcGxlc1swXVxuXG4gICAgLy8gc3RlcDAu5L+u5aSNaGxz5rWB5Ye6546w5beo5aSnZ2Fw77yM6ZyA6KaB5by65Yi26YeN5a6a5L2N55qE6Zeu6aKYXG4gICAgaWYgKHRoaXMuX3ZpZGVvTGFyZ2VHYXAgPiAwKSB7XG4gICAgICBDb21wYXRpYmlsaXR5LmRvRml4TGFyZ2VHYXAodmlkZW9TYW1wbGVzLCB0aGlzLl92aWRlb0xhcmdlR2FwKVxuICAgIH1cblxuICAgIGlmIChmaXJzdFNhbXBsZS5kdHMgIT09IHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUuZHRzICYmIHN0cmVhbUNoYW5nZVN0YXJ0KSB7XG4gICAgICBpZiAoc3RyZWFtQ2hhbmdlU3RhcnQpIHtcbiAgICAgICAgdGhpcy5uZXh0VmlkZW9EdHMgPSBzdHJlYW1DaGFuZ2VTdGFydCAvLyBGSVg6IEhsc+S4remAlOWIh2NvZGVj77yM5Zyo5aaC5p6c55u05o6lc2Vla+WIsOWQjumdoueahOeCueS8muWvvOiHtGxhcmdlR2Fw6K6h566X5aSx6LSlXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3ZpZGVvTGFyZ2VHYXAgPSB0aGlzLm5leHRWaWRlb0R0cyAtIGZpcnN0U2FtcGxlLmR0c1xuICAgICAgQ29tcGF0aWJpbGl0eS5kb0ZpeExhcmdlR2FwKHZpZGVvU2FtcGxlcywgdGhpcy5fdmlkZW9MYXJnZUdhcClcbiAgICB9XG5cbiAgICAvLyBzdGVwMS4g5L+u5aSN5LiOYXVkaW/pppbluKflt67ot53lpKrlpKfnmoTpl67pophcbiAgICBpZiAoZmlyc3QgJiYgdGhpcy5fZmlyc3RBdWRpb1NhbXBsZSkge1xuICAgICAgY29uc3QgdmlkZW9GaXJzdER0cyA9IHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUuZHRzXG4gICAgICBjb25zdCBhdWRpb0ZpcnN0RHRzID0gdGhpcy5fZmlyc3RBdWRpb1NhbXBsZS5kdHNcbiAgICAgIGNvbnN0IGdhcCA9IHZpZGVvRmlyc3REdHMgLSBhdWRpb0ZpcnN0RHRzXG4gICAgICBpZiAoZ2FwID4gKDIgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSkge1xuICAgICAgICBjb25zdCBmaWxsQ291bnQgPSBNYXRoLmZsb29yKGdhcCAvIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pXG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxsQ291bnQ7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGNsb25lZEZpcnN0U2FtcGxlID0gT2JqZWN0LmFzc2lnbih7fSwgZmlyc3RTYW1wbGUpIC8vIOinhumikeWktOmDqOW4p+e8uuWksemcgOimgeWkjeWItuesrOS4gOW4p1xuICAgICAgICAgIC8vIOmHjeaWsOiuoeeul3NhbXBsZeeahGR0c+WSjHB0c1xuICAgICAgICAgIGNsb25lZEZpcnN0U2FtcGxlLmR0cyA9IHZpZGVvRmlyc3REdHMgLSAoaSArIDEpICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuICAgICAgICAgIGNsb25lZEZpcnN0U2FtcGxlLnB0cyA9IGNsb25lZEZpcnN0U2FtcGxlLmR0cyArIGNsb25lZEZpcnN0U2FtcGxlLmN0c1xuXG4gICAgICAgICAgdmlkZW9TYW1wbGVzLnVuc2hpZnQoY2xvbmVkRmlyc3RTYW1wbGUpXG5cbiAgICAgICAgICB0aGlzLmZpbGxlZFZpZGVvU2FtcGxlcy5wdXNoKHtcbiAgICAgICAgICAgIGR0czogY2xvbmVkRmlyc3RTYW1wbGUuZHRzLFxuICAgICAgICAgICAgc2l6ZTogY2xvbmVkRmlyc3RTYW1wbGUuZGF0YS5ieXRlTGVuZ3RoXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChnYXAgPCAoLTIgKiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSkge1xuICAgICAgICB0aGlzLl92aWRlb0xhcmdlR2FwID0gLTEgKiBnYXBcbiAgICAgICAgQ29tcGF0aWJpbGl0eS5kb0ZpeExhcmdlR2FwKHZpZGVvU2FtcGxlcywgLTEgKiBnYXApXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY3VyTGFzdFNhbXBsZSA9IHZpZGVvU2FtcGxlcy5wb3AoKTtcbiAgICBpZiAodmlkZW9TYW1wbGVzLmxlbmd0aCkge1xuICAgICAgdmlkZW9TYW1wbGVzW3ZpZGVvU2FtcGxlcy5sZW5ndGggLSAxXS5kdXJhdGlvbiA9IGN1ckxhc3RTYW1wbGUuZHRzIC0gdmlkZW9TYW1wbGVzW3ZpZGVvU2FtcGxlcy5sZW5ndGggLSAxXS5kdHNcbiAgICB9XG5cbiAgICBpZiAodGhpcy52aWRlb0xhc3RTYW1wbGUpIHtcbiAgICAgIGNvbnN0IHZpZGVvTGFzdFNhbXBsZSA9IHRoaXMudmlkZW9MYXN0U2FtcGxlO1xuICAgICAgdmlkZW9MYXN0U2FtcGxlLmR1cmF0aW9uID0gZmlyc3RTYW1wbGUuZHRzIC0gdmlkZW9MYXN0U2FtcGxlLmR0cztcbiAgICAgIHZpZGVvU2FtcGxlcy51bnNoaWZ0KHRoaXMudmlkZW9MYXN0U2FtcGxlKVxuICAgIH1cblxuICAgIHRoaXMudmlkZW9MYXN0U2FtcGxlID0gY3VyTGFzdFNhbXBsZTtcblxuICAgIHRoaXMudmlkZW9UcmFjay5zYW1wbGVzID0gdmlkZW9TYW1wbGVzO1xuICB9XG5cbiAgZG9GaXhBdWRpbyAoZmlyc3QsIHN0cmVhbUNoYW5nZVN0YXJ0KSB7XG4gICAgbGV0IHtzYW1wbGVzOiBhdWRpb1NhbXBsZXMsIG1ldGF9ID0gdGhpcy5hdWRpb1RyYWNrXG5cbiAgICBpZiAoIWF1ZGlvU2FtcGxlcyB8fCAhYXVkaW9TYW1wbGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gY29uc29sZS5sb2coJ25leHQgYXVkaW8nLCB0aGlzLm5leHRBdWRpb0R0cylcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXVkaW9TYW1wbGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb25zdCBzYW1wbGUgPSBhdWRpb1NhbXBsZXNbaV1cbiAgICAgIHNhbXBsZS5vcmlnaW5EdHMgPSBzYW1wbGUuZHRzXG4gICAgfVxuXG4gICAgLy8gY29uc29sZS5sb2coYGF1ZGlvIGxhc3RTYW1wbGUsICR7YXVkaW9TYW1wbGVzW2F1ZGlvU2FtcGxlcy5sZW5ndGggLSAxXS5kdHN9YClcblxuICAgIGNvbnN0IHNhbXBsZXNMZW4gPSBhdWRpb1NhbXBsZXMubGVuZ3RoO1xuICAgIGNvbnN0IHNpbGVudEZyYW1lID0gQUFDLmdldFNpbGVudEZyYW1lKG1ldGEuY29kZWMsIG1ldGEuY2hhbm5lbENvdW50KVxuXG4gICAgY29uc3QgZmlyc3RTYW1wbGUgPSB0aGlzLl9maXJzdEF1ZGlvU2FtcGxlXG5cbiAgICBjb25zdCBfZmlyc3RTYW1wbGUgPSBhdWRpb1NhbXBsZXNbMF1cbiAgICAvLyDlr7lhdWRpb1NhbXBsZXPmjInnhadkdHPlgZrmjpLluo9cbiAgICAvLyBhdWRpb1NhbXBsZXMgPSBDb21wYXRpYmlsaXR5LnNvcnRBdWRpb1NhbXBsZXMoYXVkaW9TYW1wbGVzKVxuICAgIGlmICh0aGlzLl9hdWRpb0xhcmdlR2FwID4gMCkge1xuICAgICAgQ29tcGF0aWJpbGl0eS5kb0ZpeExhcmdlR2FwKGF1ZGlvU2FtcGxlcywgdGhpcy5fYXVkaW9MYXJnZUdhcClcbiAgICB9XG5cbiAgICBpZiAoX2ZpcnN0U2FtcGxlLmR0cyAhPT0gdGhpcy5fZmlyc3RBdWRpb1NhbXBsZS5kdHMgJiYgKHN0cmVhbUNoYW5nZVN0YXJ0IHx8IENvbXBhdGliaWxpdHkuZGV0ZWN0TGFyZ2VHYXAodGhpcy5uZXh0QXVkaW9EdHMsIF9maXJzdFNhbXBsZSkpKSB7XG4gICAgICBpZiAoc3RyZWFtQ2hhbmdlU3RhcnQpIHtcbiAgICAgICAgdGhpcy5uZXh0QXVkaW9EdHMgPSBzdHJlYW1DaGFuZ2VTdGFydCAvLyBGSVg6IEhsc+S4remAlOWIh2NvZGVj77yM5Zyo5aaC5p6c55u05o6lc2Vla+WIsOWQjumdoueahOeCueS8muWvvOiHtGxhcmdlR2Fw6K6h566X5aSx6LSlXG4gICAgICB9XG4gICAgICB0aGlzLl9hdWRpb0xhcmdlR2FwID0gdGhpcy5uZXh0QXVkaW9EdHMgLSBfZmlyc3RTYW1wbGUuZHRzXG4gICAgICBDb21wYXRpYmlsaXR5LmRvRml4TGFyZ2VHYXAoYXVkaW9TYW1wbGVzLCB0aGlzLl9hdWRpb0xhcmdlR2FwKVxuICAgIH1cbiAgICAvLyBzdGVwMC4g6aaW5bin5LiOdmlkZW/pppbluKfpl7Tot53lpKfnmoTpl67pophcbiAgICBpZiAodGhpcy5fZmlyc3RWaWRlb1NhbXBsZSAmJiBmaXJzdCkge1xuICAgICAgY29uc3QgdmlkZW9GaXJzdFB0cyA9IHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUucHRzID8gdGhpcy5fZmlyc3RWaWRlb1NhbXBsZS5wdHMgOiB0aGlzLl9maXJzdFZpZGVvU2FtcGxlLmR0cyArIHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUuY3RzXG4gICAgICBjb25zdCBnYXAgPSBmaXJzdFNhbXBsZS5kdHMgLSB2aWRlb0ZpcnN0UHRzXG4gICAgICBpZiAoZ2FwID4gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbikge1xuICAgICAgICBjb25zdCBzaWxlbnRTYW1wbGVDb3VudCA9IE1hdGguZmxvb3IoKGZpcnN0U2FtcGxlLmR0cyAtIHZpZGVvRmlyc3RQdHMpIC8gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbilcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpbGVudFNhbXBsZUNvdW50OyBpKyspIHtcbiAgICAgICAgICBjb25zdCBzaWxlbnRTYW1wbGUgPSB7XG4gICAgICAgICAgICBkYXRhOiBzaWxlbnRGcmFtZSxcbiAgICAgICAgICAgIGRhdGFzaXplOiBzaWxlbnRGcmFtZS5ieXRlTGVuZ3RoLFxuICAgICAgICAgICAgZHRzOiBmaXJzdFNhbXBsZS5kdHMgLSAoaSArIDEpICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbixcbiAgICAgICAgICAgIGZpbHRlcmVkOiAwXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYXVkaW9TYW1wbGVzLnVuc2hpZnQoc2lsZW50U2FtcGxlKVxuXG4gICAgICAgICAgdGhpcy5maWxsZWRBdWRpb1NhbXBsZXMucHVzaCh7XG4gICAgICAgICAgICBkdHM6IHNpbGVudFNhbXBsZS5kdHMsXG4gICAgICAgICAgICBzaXplOiBzaWxlbnRTYW1wbGUuZGF0YS5ieXRlTGVuZ3RoXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChnYXAgPCAtMSAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pIHtcbiAgICAgICAgdGhpcy5fYXVkaW9MYXJnZUdhcCA9IC0xICogZ2FwXG4gICAgICAgIENvbXBhdGliaWxpdHkuZG9GaXhMYXJnZUdhcChhdWRpb1NhbXBsZXMsIC0xICogZ2FwKVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBnYXBcbiAgICBjb25zdCBmaXJzdER0cyA9IGF1ZGlvU2FtcGxlc1swXS5kdHNcblxuICAgIGlmICh0aGlzLm5leHRBdWRpb0R0cykge1xuICAgICAgLy8gc3RlcDEuIOWkhOeQhnNhbXBsZXPmrrXkuYvpl7TnmoTkuKLluKfmg4XlhrVcbiAgICAgIC8vIOW9k+WPkeeOsGR1cmF0aW9u5beu6Led5aSn5LqOMeW4p+aXtui/m+ihjOihpeW4p1xuICAgICAgZ2FwID0gZmlyc3REdHMgLSB0aGlzLm5leHRBdWRpb0R0c1xuICAgICAgY29uc3QgYWJzR2FwID0gTWF0aC5hYnMoZ2FwKVxuXG4gICAgICBpZiAoYWJzR2FwID4gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiAmJiBzYW1wbGVzTGVuID09PSAxICYmIHRoaXMubGFzdEF1ZGlvU2FtcGxlc0xlbiA9PT0gMSkge1xuICAgICAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uRml4ZWQgPSB1bmRlZmluZWRcbiAgICAgIH1cblxuICAgICAgaWYgKGdhcCA+ICgyICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbikpIHtcbiAgICAgICAgaWYgKHNhbXBsZXNMZW4gPT09IDEgJiYgdGhpcy5sYXN0QXVkaW9TYW1wbGVzTGVuID09PSAxKSB7XG4gICAgICAgICAgLy8g5aaC5p6cc2FtcGxl55qEbGVuZ3Ro5LiA55u05pivMe+8jOiAjOS4lOS4gOebtOS4jeespuWQiHJlZlNhbXBsZUR1cmF0aW9u77yM6ZyA6KaB5Yqo5oCB5L+u5pS5cmVmU2FtcGxlRHVyYXRpb25cbiAgICAgICAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uRml4ZWQgPSBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uRml4ZWQgIT09IHVuZGVmaW5lZCA/IG1ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZCArIGdhcCA6IG1ldGEucmVmU2FtcGxlRHVyYXRpb24gKyBnYXBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBzaWxlbnRGcmFtZUNvdW50ID0gTWF0aC5mbG9vcihnYXAgLyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uKVxuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaWxlbnRGcmFtZUNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbXB1dGVkID0gZmlyc3REdHMgLSAoaSArIDEpICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuICAgICAgICAgICAgY29uc3Qgc2lsZW50U2FtcGxlID0gT2JqZWN0LmFzc2lnbih7fSwgYXVkaW9TYW1wbGVzWzBdLCB7XG4gICAgICAgICAgICAgIGR0czogY29tcHV0ZWQgPiB0aGlzLm5leHRBdWRpb0R0cyA/IGNvbXB1dGVkIDogdGhpcy5uZXh0QXVkaW9EdHNcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHRoaXMuZmlsbGVkQXVkaW9TYW1wbGVzLnB1c2goe1xuICAgICAgICAgICAgICBkdHM6IHNpbGVudFNhbXBsZS5kdHMsXG4gICAgICAgICAgICAgIHNpemU6IHNpbGVudFNhbXBsZS5kYXRhLmJ5dGVMZW5ndGhcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLmF1ZGlvVHJhY2suc2FtcGxlcy51bnNoaWZ0KHNpbGVudFNhbXBsZSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoYWJzR2FwIDw9IG1ldGEucmVmU2FtcGxlRHVyYXRpb24gJiYgYWJzR2FwID4gMCkge1xuICAgICAgICAvLyDlvZPlt67ot53mr5TovoPlsI/nmoTml7blgJnlsIbpn7PpopHluKfph43lrprkvY1cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ+mHjeWumuS9jemfs+mikeW4p2R0cycsIGF1ZGlvU2FtcGxlc1swXS5kdHMsIHRoaXMubmV4dEF1ZGlvRHRzKVxuICAgICAgICBhdWRpb1NhbXBsZXNbMF0uZHRzID0gdGhpcy5uZXh0QXVkaW9EdHNcbiAgICAgICAgYXVkaW9TYW1wbGVzWzBdLnB0cyA9IHRoaXMubmV4dEF1ZGlvRHRzXG4gICAgICB9IGVsc2UgaWYgKGdhcCA8IDApIHtcbiAgICAgICAgQ29tcGF0aWJpbGl0eS5kb0ZpeExhcmdlR2FwKGF1ZGlvU2FtcGxlcywgKC0xICogZ2FwKSlcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgbGFzdE9yaWdpbkR0cyA9IGF1ZGlvU2FtcGxlc1thdWRpb1NhbXBsZXMubGVuZ3RoIC0gMV0ub3JpZ2luRHRzO1xuICAgIGNvbnN0IGxhc3REdHMgPSBhdWRpb1NhbXBsZXNbYXVkaW9TYW1wbGVzLmxlbmd0aCAtIDFdLm9yaWdpbkR0cztcbiAgICBjb25zdCBsYXN0U2FtcGxlRHVyYXRpb24gPSBhdWRpb1NhbXBsZXMubGVuZ3RoID49IDIgPyBsYXN0T3JpZ2luRHRzIC0gYXVkaW9TYW1wbGVzW2F1ZGlvU2FtcGxlcy5sZW5ndGggLSAyXS5vcmlnaW5EdHMgOiBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG5cbiAgICB0aGlzLmxhc3RBdWRpb1NhbXBsZXNMZW4gPSBzYW1wbGVzTGVuO1xuICAgIHRoaXMubmV4dEF1ZGlvRHRzID0gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbkZpeGVkID8gbGFzdER0cyArIG1ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZCA6IGxhc3REdHMgKyBsYXN0U2FtcGxlRHVyYXRpb25cbiAgICB0aGlzLmxhc3RBdWRpb0R0cyA9IGxhc3REdHNcblxuICAgIGF1ZGlvU2FtcGxlc1thdWRpb1NhbXBsZXMubGVuZ3RoIC0gMV0uZHVyYXRpb24gPSBsYXN0U2FtcGxlRHVyYXRpb25cblxuICAgIC8vIHN0ZXAzLiDkv67lpI1zYW1wbGVz5q615YaF6YOo55qEZHRz5byC5bi46Zeu6aKYXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGF1ZGlvU2FtcGxlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgY3VycmVudCA9IGF1ZGlvU2FtcGxlc1tpXVxuICAgICAgY29uc3QgbmV4dCA9IGF1ZGlvU2FtcGxlc1tpICsgMV1cblxuICAgICAgaWYgKCFuZXh0KSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkdXJhdGlvbiA9IG5leHQuZHRzIC0gY3VycmVudC5kdHM7XG4gICAgICBhdWRpb1NhbXBsZXNbaV0uZHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICAgIC8qXG4gICAgICBpZiAoZHVyYXRpb24gPiAoMiAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb24pKSB7XG4gICAgICAgIC8vIOS4pOW4p+S5i+mXtOmXtOmalOWkquWkp++8jOmcgOimgeihpeepuueZveW4p1xuICAgICAgICAvKipcbiAgICAgICAgbGV0IHNpbGVudEZyYW1lQ291bnQgPSBNYXRoLmZsb29yKGR1cmF0aW9uIC8gbWV0YS5yZWZTYW1wbGVEdXJhdGlvbilcbiAgICAgICAgbGV0IGZyYW1lSWR4ID0gMFxuXG4gICAgICAgIHdoaWxlIChmcmFtZUlkeCA8IHNpbGVudEZyYW1lQ291bnQpIHtcbiAgICAgICAgICBjb25zdCBzaWxlbnRTYW1wbGUgPSB7XG4gICAgICAgICAgICBkYXRhOiBzaWxlbnRGcmFtZSxcbiAgICAgICAgICAgIGRhdGFzaXplOiBzaWxlbnRGcmFtZS5ieXRlTGVuZ3RoLFxuICAgICAgICAgICAgZHRzOiBjdXJyZW50LmR0cyArIChmcmFtZUlkeCArIDEpICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbixcbiAgICAgICAgICAgIGZpbHRlcmVkOiAwLFxuICAgICAgICAgICAgaXNTaWxlbnQ6IHRydWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhdWRpb1NhbXBsZXMuc3BsaWNlKGksIDAsIHNpbGVudFNhbXBsZSlcblxuICAgICAgICAgIHRoaXMuZmlsbGVkQXVkaW9TYW1wbGVzLnB1c2goe1xuICAgICAgICAgICAgZHRzOiBzaWxlbnRTYW1wbGUuZHRzLFxuICAgICAgICAgICAgc2l6ZTogc2lsZW50U2FtcGxlLmRhdGEuYnl0ZUxlbmd0aFxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICBmcmFtZUlkeCsrXG4gICAgICAgICAgaSsrIC8vIOS4jeWvuemdmemfs+W4p+WBmuavlOi+g1xuICAgICAgICB9XG4gICAgICB9ICovXG4gICAgfVxuXG4gICAgdGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMgPSBDb21wYXRpYmlsaXR5LnNvcnRBdWRpb1NhbXBsZXMoYXVkaW9TYW1wbGVzKVxuICB9XG5cbiAgZml4Q2hhbmdlU3RyZWFtVmlkZW8gKGNoYW5nZUlkeCkge1xuICAgIGNvbnN0IHsgc2FtcGxlcywgbWV0YSB9ID0gdGhpcy52aWRlb1RyYWNrO1xuICAgIGNvbnN0IHByZXZEdHMgPSBjaGFuZ2VJZHggPT09IDAgPyB0aGlzLmdldFN0cmVhbUNoYW5nZVN0YXJ0KHNhbXBsZXNbMF0pIDogc2FtcGxlc1tjaGFuZ2VJZHggLSAxXS5kdHM7XG4gICAgY29uc3QgY3VyRHRzID0gc2FtcGxlc1tjaGFuZ2VJZHhdLmR0cztcbiAgICBjb25zdCBpc0NvbnRpbnVlID0gTWF0aC5hYnMocHJldkR0cyAtIGN1ckR0cykgPD0gMiAqIG1ldGEucmVmU2FtcGxlRHVyYXRpb247XG5cbiAgICBpZiAoaXNDb250aW51ZSkge1xuICAgICAgaWYgKCFzYW1wbGVzW2NoYW5nZUlkeF0ub3B0aW9ucykge1xuICAgICAgICBzYW1wbGVzW2NoYW5nZUlkeF0ub3B0aW9ucyA9IHtcbiAgICAgICAgICBpc0NvbnRpbnVlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNhbXBsZXNbY2hhbmdlSWR4XS5vcHRpb25zLmlzQ29udGludWUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuZG9GaXhWaWRlbyhmYWxzZSlcbiAgICB9XG5cbiAgICBjb25zdCBmaXJzdFBhcnRTYW1wbGVzID0gc2FtcGxlcy5zbGljZSgwLCBjaGFuZ2VJZHgpO1xuICAgIGNvbnN0IHNlY29uZFBhcnRTYW1wbGVzID0gc2FtcGxlcy5zbGljZShjaGFuZ2VJZHgpO1xuICAgIGNvbnN0IGZpcnN0U2FtcGxlID0gc2FtcGxlc1swXVxuXG4gICAgY29uc3QgY2hhbmdlU2FtcGxlID0gc2Vjb25kUGFydFNhbXBsZXNbMF1cbiAgICBjb25zdCBmaXJzdFBhcnREdXJhdGlvbiA9IGNoYW5nZVNhbXBsZS5kdHMgLSBmaXJzdFNhbXBsZS5kdHNcbiAgICBjb25zdCBzdHJlYW1DaGFuZ2VTdGFydCA9IGZpcnN0U2FtcGxlLm9wdGlvbnMgJiYgZmlyc3RTYW1wbGUub3B0aW9ucy5zdGFydCArIGZpcnN0UGFydER1cmF0aW9uID8gZmlyc3RTYW1wbGUub3B0aW9ucy5zdGFydCA6IG51bGxcblxuICAgIHRoaXMudmlkZW9UcmFjay5zYW1wbGVzID0gc2FtcGxlcy5zbGljZSgwLCBjaGFuZ2VJZHgpO1xuXG4gICAgdGhpcy5kb0ZpeFZpZGVvKGZhbHNlKTtcblxuICAgIHRoaXMudmlkZW9UcmFjay5zYW1wbGVzID0gc2FtcGxlcy5zbGljZShjaGFuZ2VJZHgpO1xuXG4gICAgdGhpcy5kb0ZpeFZpZGVvKGZhbHNlLCBzdHJlYW1DaGFuZ2VTdGFydCk7XG5cbiAgICB0aGlzLnZpZGVvVHJhY2suc2FtcGxlcyA9IGZpcnN0UGFydFNhbXBsZXMuY29uY2F0KHNlY29uZFBhcnRTYW1wbGVzKVxuICB9XG5cbiAgZml4Q2hhbmdlU3RyZWFtQXVkaW8gKGNoYW5nZUlkeCkge1xuICAgIGNvbnN0IHsgc2FtcGxlcywgbWV0YSB9ID0gdGhpcy5hdWRpb1RyYWNrO1xuXG4gICAgY29uc3QgcHJldkR0cyA9IGNoYW5nZUlkeCA9PT0gMCA/IHRoaXMuZ2V0U3RyZWFtQ2hhbmdlU3RhcnQoc2FtcGxlc1swXSkgOiBzYW1wbGVzW2NoYW5nZUlkeCAtIDFdLmR0cztcbiAgICBjb25zdCBjdXJEdHMgPSBzYW1wbGVzW2NoYW5nZUlkeF0uZHRzO1xuICAgIGNvbnN0IGlzQ29udGludWUgPSBNYXRoLmFicyhwcmV2RHRzIC0gY3VyRHRzKSA8PSAyICogbWV0YS5yZWZTYW1wbGVEdXJhdGlvbjtcblxuICAgIGlmIChpc0NvbnRpbnVlKSB7XG4gICAgICBpZiAoIXNhbXBsZXNbY2hhbmdlSWR4XS5vcHRpb25zKSB7XG4gICAgICAgIHNhbXBsZXNbY2hhbmdlSWR4XS5vcHRpb25zID0ge1xuICAgICAgICAgIGlzQ29udGludWU6IHRydWVcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2FtcGxlc1tjaGFuZ2VJZHhdLm9wdGlvbnMuaXNDb250aW51ZSA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5kb0ZpeEF1ZGlvKGZhbHNlKVxuICAgIH1cblxuICAgIGNvbnN0IGZpcnN0UGFydFNhbXBsZXMgPSBzYW1wbGVzLnNsaWNlKDAsIGNoYW5nZUlkeCk7XG4gICAgY29uc3Qgc2Vjb25kUGFydFNhbXBsZXMgPSBzYW1wbGVzLnNsaWNlKGNoYW5nZUlkeCk7XG4gICAgY29uc3QgZmlyc3RTYW1wbGUgPSBzYW1wbGVzWzBdXG5cbiAgICBjb25zdCBjaGFuZ2VTYW1wbGUgPSBzZWNvbmRQYXJ0U2FtcGxlc1swXVxuICAgIGNvbnN0IGZpcnN0UGFydER1cmF0aW9uID0gY2hhbmdlU2FtcGxlLmR0cyAtIGZpcnN0U2FtcGxlLmR0c1xuICAgIGNvbnN0IHN0cmVhbUNoYW5nZVN0YXJ0ID0gZmlyc3RTYW1wbGUub3B0aW9ucyAmJiBmaXJzdFNhbXBsZS5vcHRpb25zLnN0YXJ0ICsgZmlyc3RQYXJ0RHVyYXRpb24gPyBmaXJzdFNhbXBsZS5vcHRpb25zLnN0YXJ0IDogbnVsbFxuXG4gICAgdGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMgPSBmaXJzdFBhcnRTYW1wbGVzO1xuXG4gICAgdGhpcy5kb0ZpeEF1ZGlvKGZhbHNlKTtcblxuICAgIHRoaXMuYXVkaW9UcmFjay5zYW1wbGVzID0gc2Vjb25kUGFydFNhbXBsZXM7XG5cbiAgICB0aGlzLmRvRml4QXVkaW8oZmFsc2UsIHN0cmVhbUNoYW5nZVN0YXJ0KTtcblxuICAgIHRoaXMuYXVkaW9UcmFjay5zYW1wbGVzID0gZmlyc3RQYXJ0U2FtcGxlcy5jb25jYXQoc2Vjb25kUGFydFNhbXBsZXMpXG4gIH1cblxuICBnZXRGaXJzdFNhbXBsZSAoKSB7XG4gICAgLy8g6I635Y+WdmlkZW/lkoxhdWRpb+eahOmmluW4p+aVsOaNrlxuICAgIGxldCB7c2FtcGxlczogdmlkZW9TYW1wbGVzfSA9IHRoaXMudmlkZW9UcmFja1xuICAgIGxldCB7c2FtcGxlczogYXVkaW9TYW1wbGVzfSA9IHRoaXMuYXVkaW9UcmFja1xuXG4gICAgbGV0IGlzRmlyc3RWaWRlb1NhbXBsZXMgPSBmYWxzZTtcbiAgICBsZXQgaXNGaXJzdEF1ZGlvU2FtcGxlcyA9IGZhbHNlO1xuXG4gICAgaWYgKCF0aGlzLl9maXJzdFZpZGVvU2FtcGxlICYmIHZpZGVvU2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX2ZpcnN0VmlkZW9TYW1wbGUgPSBDb21wYXRpYmlsaXR5LmZpbmRGaXJzdFZpZGVvU2FtcGxlKHZpZGVvU2FtcGxlcylcbiAgICAgIGlzRmlyc3RWaWRlb1NhbXBsZXMgPSB0cnVlXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9maXJzdEF1ZGlvU2FtcGxlICYmIGF1ZGlvU2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX2ZpcnN0QXVkaW9TYW1wbGUgPSBDb21wYXRpYmlsaXR5LmZpbmRGaXJzdEF1ZGlvU2FtcGxlKGF1ZGlvU2FtcGxlcykgLy8g5a+75om+ZHRz5pyA5bCP55qE5bin5L2c5Li66aaW5Liq6Z+z6aKR5binXG4gICAgICBpc0ZpcnN0QXVkaW9TYW1wbGVzID0gdHJ1ZVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBpc0ZpcnN0VmlkZW9TYW1wbGVzLFxuICAgICAgaXNGaXJzdEF1ZGlvU2FtcGxlc1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDlnKjmsqHmnIlyZWZTYW1wbGVEdXJhdGlvbueahOmXrumimOa1geS4re+8jFxuICAgKi9cbiAgZml4UmVmU2FtcGxlRHVyYXRpb24gKG1ldGEsIHNhbXBsZXMpIHtcbiAgICBjb25zdCBpc1ZpZGVvID0gbWV0YS50eXBlID09PSAndmlkZW8nXG4gICAgY29uc3QgYWxsU2FtcGxlc0NvdW50ID0gaXNWaWRlbyA/IHRoaXMuYWxsVmlkZW9TYW1wbGVzQ291bnQgOiB0aGlzLmFsbEF1ZGlvU2FtcGxlc0NvdW50XG4gICAgY29uc3QgZmlyc3REdHMgPSBpc1ZpZGVvID8gdGhpcy5fZmlyc3RWaWRlb1NhbXBsZS5kdHMgOiB0aGlzLl9maXJzdEF1ZGlvU2FtcGxlLmR0c1xuICAgIGNvbnN0IGZpbGxlZFNhbXBsZXNDb3VudCA9IGlzVmlkZW8gPyB0aGlzLmZpbGxlZFZpZGVvU2FtcGxlcy5sZW5ndGggOiB0aGlzLmZpbGxlZEF1ZGlvU2FtcGxlcy5sZW5ndGhcblxuICAgIGlmICghbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiB8fCBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uIDw9IDAgfHwgTnVtYmVyLmlzTmFOKG1ldGEucmVmU2FtcGxlRHVyYXRpb24pKSB7XG4gICAgICBpZiAoc2FtcGxlcy5sZW5ndGggPj0gMSkge1xuICAgICAgICBjb25zdCBsYXN0RHRzID0gc2FtcGxlc1tzYW1wbGVzLmxlbmd0aCAtIDFdLmR0c1xuXG4gICAgICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb24gPSBNYXRoLmZsb29yKChsYXN0RHRzIC0gZmlyc3REdHMpIC8gKChhbGxTYW1wbGVzQ291bnQgKyBmaWxsZWRTYW1wbGVzQ291bnQpIC0gMSkpOyAvLyDlsIZyZWZTYW1wbGVEdXJhdGlvbumHjee9ruS4uuiuoeeul+WQjueahOW5s+Wdh+WAvFxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobWV0YS5yZWZTYW1wbGVEdXJhdGlvbikge1xuICAgICAgaWYgKHNhbXBsZXMubGVuZ3RoID49IDUpIHtcbiAgICAgICAgY29uc3QgbGFzdER0cyA9IHNhbXBsZXNbc2FtcGxlcy5sZW5ndGggLSAxXS5kdHNcbiAgICAgICAgY29uc3QgZmlyc3REdHMgPSBzYW1wbGVzWzBdLmR0c1xuICAgICAgICBjb25zdCBkdXJhdGlvbkF2ZyA9IChsYXN0RHRzIC0gZmlyc3REdHMpIC8gKHNhbXBsZXMubGVuZ3RoIC0gMSlcblxuICAgICAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uID0gTWF0aC5mbG9vcihNYXRoLmFicyhtZXRhLnJlZlNhbXBsZUR1cmF0aW9uIC0gZHVyYXRpb25BdmcpIDw9IDUgPyBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uIDogZHVyYXRpb25BdmcpOyAvLyDlsIZyZWZTYW1wbGVEdXJhdGlvbumHjee9ruS4uuiuoeeul+WQjueahOW5s+Wdh+WAvFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDorrDlvZXmiKrmraLnm67liY3kuIDlhbHmkq3mlL7kuoblpJrlsJHluKdcbiAgICovXG4gIHJlY29yZFNhbXBsZXNDb3VudCAoKSB7XG4gICAgY29uc3QgeyBhdWRpb1RyYWNrLCB2aWRlb1RyYWNrIH0gPSB0aGlzXG5cbiAgICB0aGlzLmFsbEF1ZGlvU2FtcGxlc0NvdW50ICs9IGF1ZGlvVHJhY2suc2FtcGxlcy5sZW5ndGhcbiAgICB0aGlzLmFsbFZpZGVvU2FtcGxlc0NvdW50ICs9IHZpZGVvVHJhY2suc2FtcGxlcy5sZW5ndGhcbiAgfVxuXG4gIC8qKlxuICAgKiDljrvpmaTkuI3lkIjms5XnmoTluKfvvIjlgJLpgIDjgIHph43lpI3luKfvvIlcbiAgICovXG4gIHJlbW92ZUludmFsaWRTYW1wbGVzICgpIHtcbiAgICBjb25zdCB7IF9maXJzdFZpZGVvU2FtcGxlLCBfZmlyc3RBdWRpb1NhbXBsZSB9ID0gdGhpc1xuXG4gICAgdGhpcy5hdWRpb1RyYWNrLnNhbXBsZXMgPSB0aGlzLmF1ZGlvVHJhY2suc2FtcGxlcy5maWx0ZXIoKHNhbXBsZSwgaW5kZXgpID0+IHtcbiAgICAgIGlmIChzYW1wbGUgPT09IF9maXJzdEF1ZGlvU2FtcGxlKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNhbXBsZS5kdHMgPiBfZmlyc3RBdWRpb1NhbXBsZS5kdHNcbiAgICB9KVxuXG4gICAgdGhpcy52aWRlb1RyYWNrLnNhbXBsZXMgPSB0aGlzLnZpZGVvVHJhY2suc2FtcGxlcy5maWx0ZXIoKHNhbXBsZSwgaW5kZXgpID0+IHtcbiAgICAgIGlmIChzYW1wbGUgPT09IF9maXJzdFZpZGVvU2FtcGxlKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNhbXBsZS5kdHMgPiBfZmlyc3RWaWRlb1NhbXBsZS5kdHNcbiAgICB9KVxuICB9XG5cbiAgZ2V0U3RyZWFtQ2hhbmdlU3RhcnQgKHNhbXBsZSkge1xuICAgIGlmIChzYW1wbGUub3B0aW9ucyAmJiBzYW1wbGUub3B0aW9ucy5zdGFydCkge1xuICAgICAgcmV0dXJuIHNhbXBsZS5vcHRpb25zLnN0YXJ0IC0gdGhpcy5kdHNCYXNlO1xuICAgIH1cbiAgICByZXR1cm4gSW5maW5pdHlcbiAgfVxuXG4gIHN0YXRpYyBzb3J0QXVkaW9TYW1wbGVzIChzYW1wbGVzKSB7XG4gICAgaWYgKHNhbXBsZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gc2FtcGxlc1xuICAgIH1cblxuICAgIHJldHVybiBzYW1wbGVzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIHJldHVybiBhLmR0cyAtIGIuZHRzXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiDlr7vmib5kdHPmnIDlsI/nmoRzYW1wbGVcbiAgICogQHBhcmFtIHNhbXBsZXNcbiAgICovXG4gIHN0YXRpYyBmaW5kRmlyc3RBdWRpb1NhbXBsZSAoc2FtcGxlcykge1xuICAgIGlmICghc2FtcGxlcyB8fCBzYW1wbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICByZXR1cm4gQ29tcGF0aWJpbGl0eS5zb3J0QXVkaW9TYW1wbGVzKHNhbXBsZXMpWzBdXG4gIH1cblxuICBzdGF0aWMgZmluZEZpcnN0VmlkZW9TYW1wbGUgKHNhbXBsZXMpIHtcbiAgICBpZiAoIXNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIGNvbnN0IHNvcnRlZCA9IHNhbXBsZXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgcmV0dXJuIGEuZHRzIC0gYi5kdHM7XG4gICAgfSlcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzb3J0ZWQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChzb3J0ZWRbaV0uaXNLZXlmcmFtZSkge1xuICAgICAgICByZXR1cm4gc29ydGVkW2ldXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGRldGVjdExhcmdlR2FwIChuZXh0RHRzLCBmaXJzdFNhbXBsZSkge1xuICAgIGlmIChuZXh0RHRzID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGN1ckR0cyA9IGZpcnN0U2FtcGxlLmR0cyB8fCAwXG4gICAgY29uc3QgY29uZDEgPSBuZXh0RHRzIC0gY3VyRHRzID49IDEwMDAgfHwgY3VyRHRzIC0gbmV4dER0cyA+PSAxMDAwIC8vIGZpeCBobHPmtYHlh7rnjrDlpKfph4/mtYFkdHPpl7Tot53pl67pophcbiAgICBjb25zdCBjb25kMiA9IGZpcnN0U2FtcGxlLm9wdGlvbnMgJiYgZmlyc3RTYW1wbGUub3B0aW9ucy5kaXNjb250aW51ZVxuXG4gICAgcmV0dXJuIGNvbmQxIHx8IGNvbmQyXG4gIH1cblxuICBzdGF0aWMgZG9GaXhMYXJnZUdhcCAoc2FtcGxlcywgZ2FwKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ2ZpeCBsYXJnZSBnYXAgJywgZ2FwKVxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzYW1wbGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb25zdCBzYW1wbGUgPSBzYW1wbGVzW2ldO1xuICAgICAgc2FtcGxlLmR0cyArPSBnYXBcbiAgICAgIGlmIChzYW1wbGUucHRzKSB7XG4gICAgICAgIHNhbXBsZS5wdHMgKz0gZ2FwXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOS4remAlOaNoua1gVxuICAgKi9cbiAgc3RhdGljIGRldGFjdENoYW5nZVN0cmVhbSAoc2FtcGxlcykge1xuICAgIGxldCBjaGFuZ2VkID0gZmFsc2U7XG4gICAgbGV0IGNoYW5nZWRJZHggPSAtMTtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc2FtcGxlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKHNhbXBsZXNbaV0ub3B0aW9ucyAmJiBzYW1wbGVzW2ldLm9wdGlvbnMubWV0YSkge1xuICAgICAgICBjaGFuZ2VkID0gdHJ1ZVxuICAgICAgICBjaGFuZ2VkSWR4ID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNoYW5nZWQsXG4gICAgICBjaGFuZ2VkSWR4XG4gICAgfVxuICB9XG5cbiAgZ2V0IHRyYWNrcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpXG4gIH1cblxuICBnZXQgYXVkaW9UcmFjayAoKSB7XG4gICAgaWYgKHRoaXMudHJhY2tzKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmFja3MuYXVkaW9UcmFja1xuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgZ2V0IHZpZGVvVHJhY2sgKCkge1xuICAgIGlmICh0aGlzLnRyYWNrcykge1xuICAgICAgcmV0dXJuIHRoaXMudHJhY2tzLnZpZGVvVHJhY2tcbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIGdldCBkdHNCYXNlICgpIHtcbiAgICBjb25zdCByZW11eGVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnTVA0X1JFTVVYRVInKTtcbiAgICBpZiAocmVtdXhlcikge1xuICAgICAgcmV0dXJuIHJlbXV4ZXIuX2R0c0Jhc2VcbiAgICB9XG4gICAgcmV0dXJuIDBcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQ29tcGF0aWJpbGl0eTtcbiIsImNsYXNzIEdvbG9tYiB7XG4gIGNvbnN0cnVjdG9yICh1aW50OGFycmF5KSB7XG4gICAgdGhpcy5UQUcgPSAnR29sb21iJ1xuICAgIHRoaXMuX2J1ZmZlciA9IHVpbnQ4YXJyYXlcbiAgICB0aGlzLl9idWZmZXJJbmRleCA9IDBcbiAgICB0aGlzLl90b3RhbEJ5dGVzID0gdWludDhhcnJheS5ieXRlTGVuZ3RoXG4gICAgdGhpcy5fdG90YWxCaXRzID0gdWludDhhcnJheS5ieXRlTGVuZ3RoICogOFxuICAgIHRoaXMuX2N1cnJlbnRXb3JkID0gMFxuICAgIHRoaXMuX2N1cnJlbnRXb3JkQml0c0xlZnQgPSAwXG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLl9idWZmZXIgPSBudWxsXG4gIH1cblxuICBfZmlsbEN1cnJlbnRXb3JkICgpIHtcbiAgICBsZXQgYnVmZmVyQnl0ZXNMZWZ0ID0gdGhpcy5fdG90YWxCeXRlcyAtIHRoaXMuX2J1ZmZlckluZGV4XG4gICAgaWYgKGJ1ZmZlckJ5dGVzTGVmdCA8PSAwKSB7XG4gICAgICAvLyBUT0RPIOW8guW4uOWkhOeQhlxuICAgIH1cblxuICAgIGxldCBieXRlc1JlYWQgPSBNYXRoLm1pbig0LCBidWZmZXJCeXRlc0xlZnQpXG4gICAgbGV0IHdvcmQgPSBuZXcgVWludDhBcnJheSg0KVxuICAgIHdvcmQuc2V0KHRoaXMuX2J1ZmZlci5zdWJhcnJheSh0aGlzLl9idWZmZXJJbmRleCwgdGhpcy5fYnVmZmVySW5kZXggKyBieXRlc1JlYWQpKVxuICAgIHRoaXMuX2N1cnJlbnRXb3JkID0gbmV3IERhdGFWaWV3KHdvcmQuYnVmZmVyKS5nZXRVaW50MzIoMClcblxuICAgIHRoaXMuX2J1ZmZlckluZGV4ICs9IGJ5dGVzUmVhZFxuICAgIHRoaXMuX2N1cnJlbnRXb3JkQml0c0xlZnQgPSBieXRlc1JlYWQgKiA4XG4gIH1cblxuICByZWFkQml0cyAoc2l6ZSkge1xuICAgIGxldCBiaXRzID0gTWF0aC5taW4odGhpcy5fY3VycmVudFdvcmRCaXRzTGVmdCwgc2l6ZSk7Ly8gOnVpbnRcbiAgICBsZXQgdmFsdSA9IHRoaXMuX2N1cnJlbnRXb3JkID4+PiAoMzIgLSBiaXRzKTtcbiAgICBpZiAoc2l6ZSA+IDMyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCByZWFkIG1vcmUgdGhhbiAzMiBiaXRzIGF0IGEgdGltZScpO1xuICAgIH1cbiAgICB0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0IC09IGJpdHM7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRXb3JkQml0c0xlZnQgPiAwKSB7XG4gICAgICB0aGlzLl9jdXJyZW50V29yZCA8PD0gYml0cztcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3RvdGFsQnl0ZXMgLSB0aGlzLl9idWZmZXJJbmRleCA+IDApIHtcbiAgICAgIHRoaXMuX2ZpbGxDdXJyZW50V29yZCgpO1xuICAgIH1cblxuICAgIGJpdHMgPSBzaXplIC0gYml0cztcbiAgICBpZiAoYml0cyA+IDAgJiYgdGhpcy5fY3VycmVudFdvcmRCaXRzTGVmdCkge1xuICAgICAgcmV0dXJuIHZhbHUgPDwgYml0cyB8IHRoaXMucmVhZEJpdHMoYml0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWx1O1xuICAgIH1cbiAgfVxuXG4gIHJlYWRCb29sICgpIHtcbiAgICByZXR1cm4gdGhpcy5yZWFkQml0cygxKSA9PT0gMVxuICB9XG5cbiAgcmVhZEJ5dGUgKCkge1xuICAgIHJldHVybiB0aGlzLnJlYWRCaXRzKDgpXG4gIH1cblxuICBfc2tpcExlYWRpbmdaZXJvICgpIHtcbiAgICBsZXQgemVyb0NvdW50XG4gICAgZm9yICh6ZXJvQ291bnQgPSAwOyB6ZXJvQ291bnQgPCB0aGlzLl9jdXJyZW50V29yZEJpdHNMZWZ0OyB6ZXJvQ291bnQrKykge1xuICAgICAgaWYgKCh0aGlzLl9jdXJyZW50V29yZCAmICgweDgwMDAwMDAwID4+PiB6ZXJvQ291bnQpKSAhPT0gMCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50V29yZCA8PD0gemVyb0NvdW50XG4gICAgICAgIHRoaXMuX2N1cnJlbnRXb3JkQml0c0xlZnQgLT0gemVyb0NvdW50XG4gICAgICAgIHJldHVybiB6ZXJvQ291bnRcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fZmlsbEN1cnJlbnRXb3JkKClcbiAgICByZXR1cm4gemVyb0NvdW50ICsgdGhpcy5fc2tpcExlYWRpbmdaZXJvKClcbiAgfVxuXG4gIHJlYWRVRUcgKCkgeyAvLyB1bnNpZ25lZCBleHBvbmVudGlhbCBnb2xvbWJcbiAgICBsZXQgbGVhZGluZ1plcm9zID0gdGhpcy5fc2tpcExlYWRpbmdaZXJvKClcbiAgICByZXR1cm4gdGhpcy5yZWFkQml0cyhsZWFkaW5nWmVyb3MgKyAxKSAtIDFcbiAgfVxuXG4gIHJlYWRTRUcgKCkgeyAvLyBzaWduZWQgZXhwb25lbnRpYWwgZ29sb21iXG4gICAgbGV0IHZhbHVlID0gdGhpcy5yZWFkVUVHKClcbiAgICBpZiAodmFsdWUgJiAweDAxKSB7XG4gICAgICByZXR1cm4gKHZhbHVlICsgMSkgPj4+IDFcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIC0xICogKHZhbHVlID4+PiAxKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHb2xvbWJcbiIsImltcG9ydCBTcHNQYXJzZXIgZnJvbSAnLi9zcHMnO1xuY2xhc3MgTmFsdW5pdCB7XG4gIHN0YXRpYyBnZXROYWx1bml0cyAoYnVmZmVyKSB7XG4gICAgaWYgKGJ1ZmZlci5sZW5ndGggLSBidWZmZXIucG9zaXRpb24gPCA0KSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgbGV0IGJ1ZiA9IGJ1ZmZlci5kYXRhdmlldztcbiAgICBsZXQgcG9zaXRpb24gPSBidWZmZXIucG9zaXRpb247XG4gICAgaWYgKGJ1Zi5nZXRJbnQzMihwb3NpdGlvbikgPT09IDEgfHxcbiAgICAoYnVmLmdldEludDE2KHBvc2l0aW9uKSA9PT0gMCAmJiBidWYuZ2V0SW50OChwb3NpdGlvbiArIDIpID09PSAxKSkge1xuICAgICAgcmV0dXJuIE5hbHVuaXQuZ2V0QW5uZXhiTmFscyhidWZmZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTmFsdW5pdC5nZXRBdmNjTmFscyhidWZmZXIpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRBbm5leGJOYWxzIChidWZmZXIpIHtcbiAgICBsZXQgbmFscyA9IFtdO1xuICAgIGxldCBwb3NpdGlvbiA9IE5hbHVuaXQuZ2V0SGVhZGVyUG9zaXRpb25Bbm5leEIoYnVmZmVyKTtcbiAgICBsZXQgc3RhcnQgPSBwb3NpdGlvbi5wb3M7XG4gICAgbGV0IGVuZCA9IHN0YXJ0O1xuICAgIHdoaWxlIChzdGFydCA8IGJ1ZmZlci5sZW5ndGggLSA0KSB7XG4gICAgICBsZXQgaGVhZGVyID0gYnVmZmVyLmJ1ZmZlci5zbGljZShzdGFydCwgc3RhcnQgKyBwb3NpdGlvbi5oZWFkZXJMZW5ndGgpO1xuICAgICAgaWYgKHBvc2l0aW9uLnBvcyA9PT0gYnVmZmVyLnBvc2l0aW9uKSB7XG4gICAgICAgIGJ1ZmZlci5za2lwKHBvc2l0aW9uLmhlYWRlckxlbmd0aCk7XG4gICAgICB9XG4gICAgICBwb3NpdGlvbiA9IE5hbHVuaXQuZ2V0SGVhZGVyUG9zaXRpb25Bbm5leEIoYnVmZmVyKTtcbiAgICAgIGVuZCA9IHBvc2l0aW9uLnBvcztcbiAgICAgIGxldCBib2R5ID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyLmJ1ZmZlci5zbGljZShzdGFydCArIGhlYWRlci5ieXRlTGVuZ3RoLCBlbmQpKTtcbiAgICAgIGxldCB1bml0ID0ge2hlYWRlciwgYm9keX07XG4gICAgICBOYWx1bml0LmFuYWx5c2VOYWwodW5pdCk7XG4gICAgICBuYWxzLnB1c2godW5pdCk7XG4gICAgICBidWZmZXIuc2tpcChlbmQgLSBidWZmZXIucG9zaXRpb24pO1xuICAgICAgc3RhcnQgPSBlbmQ7XG4gICAgfVxuICAgIHJldHVybiBuYWxzO1xuICB9XG5cbiAgc3RhdGljIGdldEF2Y2NOYWxzIChidWZmZXIpIHtcbiAgICBsZXQgbmFscyA9IFtdO1xuICAgIHdoaWxlIChidWZmZXIucG9zaXRpb24gPCBidWZmZXIubGVuZ3RoIC0gNCkge1xuICAgICAgbGV0IGxlbmd0aCA9IGJ1ZmZlci5kYXRhdmlldy5nZXRJbnQzMigpO1xuICAgICAgaWYgKGJ1ZmZlci5sZW5ndGggLSBidWZmZXIucG9zaXRpb24gPj0gbGVuZ3RoKSB7XG4gICAgICAgIGxldCBoZWFkZXIgPSBidWZmZXIuYnVmZmVyLnNsaWNlKGJ1ZmZlci5wb3NpdGlvbiwgYnVmZmVyLnBvc2l0aW9uICsgNCk7XG4gICAgICAgIGJ1ZmZlci5za2lwKDQpXG4gICAgICAgIGxldCBib2R5ID0gYnVmZmVyLmJ1ZmZlci5zbGljZShidWZmZXIucG9zaXRpb24sIGJ1ZmZlci5wb3NpdGlvbiArIGxlbmd0aCk7XG4gICAgICAgIGJ1ZmZlci5za2lwKGxlbmd0aCk7XG4gICAgICAgIGxldCB1bml0ID0ge2hlYWRlciwgYm9keX07XG4gICAgICAgIE5hbHVuaXQuYW5hbHlzZU5hbCh1bml0KTtcbiAgICAgICAgbmFscy5wdXNoKHVuaXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuYWxzO1xuICB9XG5cbiAgc3RhdGljIGFuYWx5c2VOYWwgKHVuaXQpIHtcbiAgICBsZXQgdHlwZSA9IHVuaXQuYm9keVswXSAmIDB4MWY7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIC8vIE5EUlxuICAgICAgICB1bml0Lm5kciA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA1OlxuICAgICAgICAvLyBJRFJcbiAgICAgICAgdW5pdC5pZHIgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNjpcbiAgICAgICAgLy8gU0VJXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA3OlxuICAgICAgICAvLyBTUFNcbiAgICAgICAgdW5pdC5zcHMgPSBTcHNQYXJzZXIucGFyc2VTUFModW5pdC5ib2R5KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDg6XG4gICAgICAgIC8vIFBQU1xuICAgICAgICB1bml0LnBwcyA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA5OlxuICAgICAgICAvLyBBVURcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0SGVhZGVyUG9zaXRpb25Bbm5leEIgKGJ1ZmZlcikge1xuICAgIC8vIHNlcGVyYXRlXG4gICAgbGV0IHBvcyA9IGJ1ZmZlci5wb3NpdGlvbjtcbiAgICBsZXQgaGVhZGVyTGVuZ3RoID0gMDtcbiAgICB3aGlsZSAoaGVhZGVyTGVuZ3RoICE9PSAzICYmIGhlYWRlckxlbmd0aCAhPT0gNCAmJiBwb3MgPCBidWZmZXIubGVuZ3RoIC0gNCkge1xuICAgICAgaWYgKGJ1ZmZlci5kYXRhdmlldy5nZXRJbnQxNihwb3MpID09PSAwKSB7XG4gICAgICAgIGlmIChidWZmZXIuZGF0YXZpZXcuZ2V0SW50MTYocG9zICsgMikgPT09IDEpIHtcbiAgICAgICAgICAvLyAweDAwMDAwMVxuICAgICAgICAgIGhlYWRlckxlbmd0aCA9IDQ7XG4gICAgICAgIH0gZWxzZSBpZiAoYnVmZmVyLmRhdGF2aWV3LmdldEludDgocG9zICsgMikgPT09IDEpIHtcbiAgICAgICAgICBoZWFkZXJMZW5ndGggPSAzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBvcysrO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwb3MrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zID09PSBidWZmZXIubGVuZ3RoIC0gNCkge1xuICAgICAgaWYgKGJ1ZmZlci5kYXRhdmlldy5nZXRJbnQxNihwb3MpID09PSAwKSB7XG4gICAgICAgIGlmIChidWZmZXIuZGF0YXZpZXcuZ2V0SW50MTYocG9zICsgMikgPT09IDEpIHtcbiAgICAgICAgICAvLyAweDAwMDAwMVxuICAgICAgICAgIGhlYWRlckxlbmd0aCA9IDQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBvcysrO1xuICAgICAgICBpZiAoYnVmZmVyLmRhdGF2aWV3LmdldEludDE2KHBvcykgPT09IDAgJiYgYnVmZmVyLmRhdGF2aWV3LmdldEludDgocG9zKSA9PT0gMSkge1xuICAgICAgICAgIC8vIDB4MDAwMDAwMVxuICAgICAgICAgIGhlYWRlckxlbmd0aCA9IDM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcG9zID0gYnVmZmVyLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge3BvcywgaGVhZGVyTGVuZ3RofTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRBdmNjIChzcHMsIHBwcykge1xuICAgIGxldCByZXQgPSBuZXcgVWludDhBcnJheShzcHMuYnl0ZUxlbmd0aCArIHBwcy5ieXRlTGVuZ3RoICsgMTEpO1xuICAgIHJldFswXSA9IDB4MDE7XG4gICAgcmV0WzFdID0gc3BzWzFdO1xuICAgIHJldFsyXSA9IHNwc1syXTtcbiAgICByZXRbM10gPSBzcHNbM107XG4gICAgcmV0WzRdID0gMjU1O1xuICAgIHJldFs1XSA9IDIyNTtcblxuICAgIGxldCBvZmZzZXQgPSA2O1xuXG4gICAgcmV0LnNldChuZXcgVWludDhBcnJheShbKHNwcy5ieXRlTGVuZ3RoID4+PiA4KSAmIDB4ZmYsIHNwcy5ieXRlTGVuZ3RoICYgMHhmZl0pLCBvZmZzZXQpO1xuICAgIG9mZnNldCArPSAyO1xuICAgIHJldC5zZXQoc3BzLCBvZmZzZXQpO1xuICAgIG9mZnNldCArPSBzcHMuYnl0ZUxlbmd0aDtcblxuICAgIHJldFtvZmZzZXRdID0gMTtcbiAgICBvZmZzZXQrKztcblxuICAgIHJldC5zZXQobmV3IFVpbnQ4QXJyYXkoWyhwcHMuYnl0ZUxlbmd0aCA+Pj4gOCkgJiAweGZmLCBwcHMuYnl0ZUxlbmd0aCAmIDB4ZmZdKSwgb2Zmc2V0KTtcbiAgICBvZmZzZXQgKz0gMjtcbiAgICByZXQuc2V0KHBwcywgb2Zmc2V0KTtcbiAgICByZXR1cm4gcmV0O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5hbHVuaXQ7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgICovXG4vKiBlc2xpbnQtZGlzYWJsZSBvbmUtdmFyICAqL1xuaW1wb3J0IEdvbG9tYiBmcm9tICcuL2dvbG9tYidcblxuY2xhc3MgU1BTUGFyc2VyIHtcbiAgc3RhdGljIF9lYnNwMnJic3AgKHVpbnQ4YXJyYXkpIHtcbiAgICBsZXQgc3JjID0gdWludDhhcnJheVxuICAgIGxldCBzcmNMZW5ndGggPSBzcmMuYnl0ZUxlbmd0aFxuICAgIGxldCBkc3QgPSBuZXcgVWludDhBcnJheShzcmNMZW5ndGgpXG4gICAgbGV0IGRzdElkeCA9IDBcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3JjTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpID49IDIpIHtcbiAgICAgICAgaWYgKHNyY1tpXSA9PT0gMHgwMyAmJiBzcmNbaSAtIDFdID09PSAweDAwICYmIHNyY1tpIC0gMl0gPT09IDB4MDApIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBkc3RbZHN0SWR4XSA9IHNyY1tpXVxuICAgICAgZHN0SWR4KytcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZHN0LmJ1ZmZlciwgMCwgZHN0SWR4KVxuICB9XG5cbiAgc3RhdGljIHBhcnNlU1BTICh1aW50OGFycmF5KSB7XG4gICAgbGV0IHJic3AgPSBTUFNQYXJzZXIuX2Vic3AycmJzcCh1aW50OGFycmF5KVxuICAgIGxldCBnYiA9IG5ldyBHb2xvbWIocmJzcClcblxuICAgIGdiLnJlYWRCeXRlKClcbiAgICBsZXQgcHJvZmlsZUlkYyA9IGdiLnJlYWRCeXRlKClcbiAgICBnYi5yZWFkQnl0ZSgpXG4gICAgbGV0IGxldmVsSWRjID0gZ2IucmVhZEJ5dGUoKVxuICAgIGdiLnJlYWRVRUcoKVxuXG4gICAgbGV0IHByb2ZpbGVfc3RyaW5nID0gU1BTUGFyc2VyLmdldFByb2ZpbGVTdHJpbmcocHJvZmlsZUlkYylcbiAgICBsZXQgbGV2ZWxfc3RyaW5nID0gU1BTUGFyc2VyLmdldExldmVsU3RyaW5nKGxldmVsSWRjKVxuICAgIGxldCBjaHJvbWFfZm9ybWF0X2lkYyA9IDFcbiAgICBsZXQgY2hyb21hX2Zvcm1hdCA9IDQyMFxuICAgIGxldCBjaHJvbWFfZm9ybWF0X3RhYmxlID0gWzAsIDQyMCwgNDIyLCA0NDRdXG4gICAgbGV0IGJpdF9kZXB0aCA9IDhcblxuICAgIGlmIChwcm9maWxlSWRjID09PSAxMDAgfHwgcHJvZmlsZUlkYyA9PT0gMTEwIHx8IHByb2ZpbGVJZGMgPT09IDEyMiB8fFxuICAgICAgcHJvZmlsZUlkYyA9PT0gMjQ0IHx8IHByb2ZpbGVJZGMgPT09IDQ0IHx8IHByb2ZpbGVJZGMgPT09IDgzIHx8XG4gICAgICBwcm9maWxlSWRjID09PSA4NiB8fCBwcm9maWxlSWRjID09PSAxMTggfHwgcHJvZmlsZUlkYyA9PT0gMTI4IHx8XG4gICAgICBwcm9maWxlSWRjID09PSAxMzggfHwgcHJvZmlsZUlkYyA9PT0gMTQ0KSB7XG4gICAgICBjaHJvbWFfZm9ybWF0X2lkYyA9IGdiLnJlYWRVRUcoKVxuICAgICAgaWYgKGNocm9tYV9mb3JtYXRfaWRjID09PSAzKSB7XG4gICAgICAgIGdiLnJlYWRCaXRzKDEpXG4gICAgICB9XG4gICAgICBpZiAoY2hyb21hX2Zvcm1hdF9pZGMgPD0gMykge1xuICAgICAgICBjaHJvbWFfZm9ybWF0ID0gY2hyb21hX2Zvcm1hdF90YWJsZVtjaHJvbWFfZm9ybWF0X2lkY11cbiAgICAgIH1cblxuICAgICAgYml0X2RlcHRoID0gZ2IucmVhZFVFRygpICsgOFxuICAgICAgZ2IucmVhZFVFRygpXG4gICAgICBnYi5yZWFkQml0cygxKVxuICAgICAgaWYgKGdiLnJlYWRCb29sKCkpIHtcbiAgICAgICAgbGV0IHNjYWxpbmdfbGlzdF9jb3VudCA9IChjaHJvbWFfZm9ybWF0X2lkYyAhPT0gMykgPyA4IDogMTJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzY2FsaW5nX2xpc3RfY291bnQ7IGkrKykge1xuICAgICAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgICAgICBpZiAoaSA8IDYpIHtcbiAgICAgICAgICAgICAgU1BTUGFyc2VyLl9za2lwU2NhbGluZ0xpc3QoZ2IsIDE2KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgU1BTUGFyc2VyLl9za2lwU2NhbGluZ0xpc3QoZ2IsIDY0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBnYi5yZWFkVUVHKClcbiAgICBsZXQgcGljX29yZGVyX2NudF90eXBlID0gZ2IucmVhZFVFRygpXG4gICAgaWYgKHBpY19vcmRlcl9jbnRfdHlwZSA9PT0gMCkge1xuICAgICAgZ2IucmVhZFVFRygpXG4gICAgfSBlbHNlIGlmIChwaWNfb3JkZXJfY250X3R5cGUgPT09IDEpIHtcbiAgICAgIGdiLnJlYWRCaXRzKDEpXG4gICAgICBnYi5yZWFkU0VHKClcbiAgICAgIGdiLnJlYWRTRUcoKVxuICAgICAgbGV0IG51bV9yZWZfZnJhbWVzX2luX3BpY19vcmRlcl9jbnRfY3ljbGUgPSBnYi5yZWFkVUVHKClcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtX3JlZl9mcmFtZXNfaW5fcGljX29yZGVyX2NudF9jeWNsZTsgaSsrKSB7XG4gICAgICAgIGdiLnJlYWRTRUcoKVxuICAgICAgfVxuICAgIH1cbiAgICBnYi5yZWFkVUVHKClcbiAgICBnYi5yZWFkQml0cygxKVxuXG4gICAgbGV0IHBpY193aWR0aF9pbl9tYnNfbWludXMxID0gZ2IucmVhZFVFRygpXG4gICAgbGV0IHBpY19oZWlnaHRfaW5fbWFwX3VuaXRzX21pbnVzMSA9IGdiLnJlYWRVRUcoKVxuXG4gICAgbGV0IGZyYW1lX21ic19vbmx5X2ZsYWcgPSBnYi5yZWFkQml0cygxKVxuICAgIGlmIChmcmFtZV9tYnNfb25seV9mbGFnID09PSAwKSB7XG4gICAgICBnYi5yZWFkQml0cygxKVxuICAgIH1cbiAgICBnYi5yZWFkQml0cygxKVxuXG4gICAgbGV0IGZyYW1lX2Nyb3BfbGVmdF9vZmZzZXQgPSAwXG4gICAgbGV0IGZyYW1lX2Nyb3BfcmlnaHRfb2Zmc2V0ID0gMFxuICAgIGxldCBmcmFtZV9jcm9wX3RvcF9vZmZzZXQgPSAwXG4gICAgbGV0IGZyYW1lX2Nyb3BfYm90dG9tX29mZnNldCA9IDBcblxuICAgIGxldCBmcmFtZV9jcm9wcGluZ19mbGFnID0gZ2IucmVhZEJvb2woKVxuICAgIGlmIChmcmFtZV9jcm9wcGluZ19mbGFnKSB7XG4gICAgICBmcmFtZV9jcm9wX2xlZnRfb2Zmc2V0ID0gZ2IucmVhZFVFRygpXG4gICAgICBmcmFtZV9jcm9wX3JpZ2h0X29mZnNldCA9IGdiLnJlYWRVRUcoKVxuICAgICAgZnJhbWVfY3JvcF90b3Bfb2Zmc2V0ID0gZ2IucmVhZFVFRygpXG4gICAgICBmcmFtZV9jcm9wX2JvdHRvbV9vZmZzZXQgPSBnYi5yZWFkVUVHKClcbiAgICB9XG5cbiAgICBsZXQgcGFyX3dpZHRoID0gMSwgcGFyX2hlaWdodCA9IDFcbiAgICBsZXQgZnBzID0gMCwgZnBzX2ZpeGVkID0gdHJ1ZSwgZnBzX251bSA9IDAsIGZwc19kZW4gPSAwXG5cbiAgICBsZXQgdnVpX3BhcmFtZXRlcnNfcHJlc2VudF9mbGFnID0gZ2IucmVhZEJvb2woKVxuICAgIGlmICh2dWlfcGFyYW1ldGVyc19wcmVzZW50X2ZsYWcpIHtcbiAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7IC8vIGFzcGVjdF9yYXRpb19pbmZvX3ByZXNlbnRfZmxhZ1xuICAgICAgICBsZXQgYXNwZWN0X3JhdGlvX2lkYyA9IGdiLnJlYWRCeXRlKClcbiAgICAgICAgbGV0IHBhcl93X3RhYmxlID0gWzEsIDEyLCAxMCwgMTYsIDQwLCAyNCwgMjAsIDMyLCA4MCwgMTgsIDE1LCA2NCwgMTYwLCA0LCAzLCAyXVxuICAgICAgICBsZXQgcGFyX2hfdGFibGUgPSBbMSwgMTEsIDExLCAxMSwgMzMsIDExLCAxMSwgMTEsIDMzLCAxMSwgMTEsIDMzLCA5OSwgMywgMiwgMV1cblxuICAgICAgICBpZiAoYXNwZWN0X3JhdGlvX2lkYyA+IDAgJiYgYXNwZWN0X3JhdGlvX2lkYyA8IDE2KSB7XG4gICAgICAgICAgcGFyX3dpZHRoID0gcGFyX3dfdGFibGVbYXNwZWN0X3JhdGlvX2lkYyAtIDFdXG4gICAgICAgICAgcGFyX2hlaWdodCA9IHBhcl9oX3RhYmxlW2FzcGVjdF9yYXRpb19pZGMgLSAxXVxuICAgICAgICB9IGVsc2UgaWYgKGFzcGVjdF9yYXRpb19pZGMgPT09IDI1NSkge1xuICAgICAgICAgIHBhcl93aWR0aCA9IGdiLnJlYWRCeXRlKCkgPDwgOCB8IGdiLnJlYWRCeXRlKClcbiAgICAgICAgICBwYXJfaGVpZ2h0ID0gZ2IucmVhZEJ5dGUoKSA8PCA4IHwgZ2IucmVhZEJ5dGUoKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgIGdiLnJlYWRCb29sKClcbiAgICAgIH1cbiAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgIGdiLnJlYWRCaXRzKDQpXG4gICAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgICAgZ2IucmVhZEJpdHMoMjQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgIGdiLnJlYWRVRUcoKVxuICAgICAgICBnYi5yZWFkVUVHKClcbiAgICAgIH1cbiAgICAgIGlmIChnYi5yZWFkQm9vbCgpKSB7XG4gICAgICAgIGxldCBudW1fdW5pdHNfaW5fdGljayA9IGdiLnJlYWRCaXRzKDMyKVxuICAgICAgICBsZXQgdGltZV9zY2FsZSA9IGdiLnJlYWRCaXRzKDMyKVxuICAgICAgICBmcHNfZml4ZWQgPSBnYi5yZWFkQm9vbCgpXG5cbiAgICAgICAgZnBzX251bSA9IHRpbWVfc2NhbGVcbiAgICAgICAgZnBzX2RlbiA9IG51bV91bml0c19pbl90aWNrICogMlxuICAgICAgICBmcHMgPSBmcHNfbnVtIC8gZnBzX2RlblxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBwYXJTY2FsZSA9IDFcbiAgICBpZiAocGFyX3dpZHRoICE9PSAxIHx8IHBhcl9oZWlnaHQgIT09IDEpIHtcbiAgICAgIHBhclNjYWxlID0gcGFyX3dpZHRoIC8gcGFyX2hlaWdodFxuICAgIH1cblxuICAgIGxldCBjcm9wX3VuaXRfeCA9IDAsIGNyb3BfdW5pdF95ID0gMFxuICAgIGlmIChjaHJvbWFfZm9ybWF0X2lkYyA9PT0gMCkge1xuICAgICAgY3JvcF91bml0X3ggPSAxXG4gICAgICBjcm9wX3VuaXRfeSA9IDIgLSBmcmFtZV9tYnNfb25seV9mbGFnXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBzdWJfd2MgPSAoY2hyb21hX2Zvcm1hdF9pZGMgPT09IDMpID8gMSA6IDJcbiAgICAgIGxldCBzdWJfaGMgPSAoY2hyb21hX2Zvcm1hdF9pZGMgPT09IDEpID8gMiA6IDFcbiAgICAgIGNyb3BfdW5pdF94ID0gc3ViX3djXG4gICAgICBjcm9wX3VuaXRfeSA9IHN1Yl9oYyAqICgyIC0gZnJhbWVfbWJzX29ubHlfZmxhZylcbiAgICB9XG5cbiAgICBsZXQgY29kZWNfd2lkdGggPSAocGljX3dpZHRoX2luX21ic19taW51czEgKyAxKSAqIDE2XG4gICAgbGV0IGNvZGVjX2hlaWdodCA9ICgyIC0gZnJhbWVfbWJzX29ubHlfZmxhZykgKiAoKHBpY19oZWlnaHRfaW5fbWFwX3VuaXRzX21pbnVzMSArIDEpICogMTYpXG5cbiAgICBjb2RlY193aWR0aCAtPSAoZnJhbWVfY3JvcF9sZWZ0X29mZnNldCArIGZyYW1lX2Nyb3BfcmlnaHRfb2Zmc2V0KSAqIGNyb3BfdW5pdF94XG4gICAgY29kZWNfaGVpZ2h0IC09IChmcmFtZV9jcm9wX3RvcF9vZmZzZXQgKyBmcmFtZV9jcm9wX2JvdHRvbV9vZmZzZXQpICogY3JvcF91bml0X3lcblxuICAgIGxldCBwcmVzZW50X3dpZHRoID0gTWF0aC5jZWlsKGNvZGVjX3dpZHRoICogcGFyU2NhbGUpXG5cbiAgICBnYi5kZXN0cm95KClcbiAgICBnYiA9IG51bGxcblxuICAgIHJldHVybiB7XG4gICAgICBwcm9maWxlX3N0cmluZzogcHJvZmlsZV9zdHJpbmcsXG4gICAgICBsZXZlbF9zdHJpbmc6IGxldmVsX3N0cmluZyxcbiAgICAgIGJpdF9kZXB0aDogYml0X2RlcHRoLFxuICAgICAgY2hyb21hX2Zvcm1hdDogY2hyb21hX2Zvcm1hdCxcbiAgICAgIGNocm9tYV9mb3JtYXRfc3RyaW5nOiBTUFNQYXJzZXIuZ2V0Q2hyb21hRm9ybWF0U3RyaW5nKGNocm9tYV9mb3JtYXQpLFxuXG4gICAgICBmcmFtZV9yYXRlOiB7XG4gICAgICAgIGZpeGVkOiBmcHNfZml4ZWQsXG4gICAgICAgIGZwczogZnBzLFxuICAgICAgICBmcHNfZGVuOiBmcHNfZGVuLFxuICAgICAgICBmcHNfbnVtOiBmcHNfbnVtXG4gICAgICB9LFxuXG4gICAgICBwYXJfcmF0aW86IHtcbiAgICAgICAgd2lkdGg6IHBhcl93aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBwYXJfaGVpZ2h0XG4gICAgICB9LFxuXG4gICAgICBjb2RlY19zaXplOiB7XG4gICAgICAgIHdpZHRoOiBjb2RlY193aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBjb2RlY19oZWlnaHRcbiAgICAgIH0sXG5cbiAgICAgIHByZXNlbnRfc2l6ZToge1xuICAgICAgICB3aWR0aDogcHJlc2VudF93aWR0aCxcbiAgICAgICAgaGVpZ2h0OiBjb2RlY19oZWlnaHRcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgX3NraXBTY2FsaW5nTGlzdCAoZ2IsIGNvdW50KSB7XG4gICAgbGV0IGxhc3Rfc2NhbGUgPSA4LCBuZXh0X3NjYWxlID0gOFxuICAgIGxldCBkZWx0YV9zY2FsZSA9IDBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgIGlmIChuZXh0X3NjYWxlICE9PSAwKSB7XG4gICAgICAgIGRlbHRhX3NjYWxlID0gZ2IucmVhZFNFRygpXG4gICAgICAgIG5leHRfc2NhbGUgPSAobGFzdF9zY2FsZSArIGRlbHRhX3NjYWxlICsgMjU2KSAlIDI1NlxuICAgICAgfVxuICAgICAgbGFzdF9zY2FsZSA9IChuZXh0X3NjYWxlID09PSAwKSA/IGxhc3Rfc2NhbGUgOiBuZXh0X3NjYWxlXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldFByb2ZpbGVTdHJpbmcgKHByb2ZpbGVJZGMpIHtcbiAgICBzd2l0Y2ggKHByb2ZpbGVJZGMpIHtcbiAgICAgIGNhc2UgNjY6XG4gICAgICAgIHJldHVybiAnQmFzZWxpbmUnXG4gICAgICBjYXNlIDc3OlxuICAgICAgICByZXR1cm4gJ01haW4nXG4gICAgICBjYXNlIDg4OlxuICAgICAgICByZXR1cm4gJ0V4dGVuZGVkJ1xuICAgICAgY2FzZSAxMDA6XG4gICAgICAgIHJldHVybiAnSGlnaCdcbiAgICAgIGNhc2UgMTEwOlxuICAgICAgICByZXR1cm4gJ0hpZ2gxMCdcbiAgICAgIGNhc2UgMTIyOlxuICAgICAgICByZXR1cm4gJ0hpZ2g0MjInXG4gICAgICBjYXNlIDI0NDpcbiAgICAgICAgcmV0dXJuICdIaWdoNDQ0J1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICdVbmtub3duJ1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRMZXZlbFN0cmluZyAobGV2ZWxJZGMpIHtcbiAgICByZXR1cm4gKGxldmVsSWRjIC8gMTApLnRvRml4ZWQoMSlcbiAgfVxuXG4gIHN0YXRpYyBnZXRDaHJvbWFGb3JtYXRTdHJpbmcgKGNocm9tYSkge1xuICAgIHN3aXRjaCAoY2hyb21hKSB7XG4gICAgICBjYXNlIDQyMDpcbiAgICAgICAgcmV0dXJuICc0OjI6MCdcbiAgICAgIGNhc2UgNDIyOlxuICAgICAgICByZXR1cm4gJzQ6MjoyJ1xuICAgICAgY2FzZSA0NDQ6XG4gICAgICAgIHJldHVybiAnNDo0OjQnXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ1Vua25vd24nXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHRvVmlkZW9NZXRhIChzcHNDb25maWcpIHtcbiAgICBsZXQgbWV0YSA9IHt9XG4gICAgaWYgKHNwc0NvbmZpZyAmJiBzcHNDb25maWcuY29kZWNfc2l6ZSkge1xuICAgICAgbWV0YS5jb2RlY1dpZHRoID0gc3BzQ29uZmlnLmNvZGVjX3NpemUud2lkdGhcbiAgICAgIG1ldGEuY29kZWNIZWlnaHQgPSBzcHNDb25maWcuY29kZWNfc2l6ZS5oZWlnaHRcbiAgICAgIG1ldGEucHJlc2VudFdpZHRoID0gc3BzQ29uZmlnLnByZXNlbnRfc2l6ZS53aWR0aFxuICAgICAgbWV0YS5wcmVzZW50SGVpZ2h0ID0gc3BzQ29uZmlnLnByZXNlbnRfc2l6ZS5oZWlnaHRcbiAgICB9XG5cbiAgICBtZXRhLnByb2ZpbGUgPSBzcHNDb25maWcucHJvZmlsZV9zdHJpbmdcbiAgICBtZXRhLmxldmVsID0gc3BzQ29uZmlnLmxldmVsX3N0cmluZ1xuICAgIG1ldGEuYml0RGVwdGggPSBzcHNDb25maWcuYml0X2RlcHRoXG4gICAgbWV0YS5jaHJvbWFGb3JtYXQgPSBzcHNDb25maWcuY2hyb21hX2Zvcm1hdFxuXG4gICAgbWV0YS5wYXJSYXRpbyA9IHtcbiAgICAgIHdpZHRoOiBzcHNDb25maWcucGFyX3JhdGlvLndpZHRoLFxuICAgICAgaGVpZ2h0OiBzcHNDb25maWcucGFyX3JhdGlvLmhlaWdodFxuICAgIH1cblxuICAgIG1ldGEuZnJhbWVSYXRlID0gc3BzQ29uZmlnLmZyYW1lX3JhdGVcblxuICAgIGxldCBmcHNEZW4gPSBtZXRhLmZyYW1lUmF0ZS5mcHNfZGVuXG4gICAgbGV0IGZwc051bSA9IG1ldGEuZnJhbWVSYXRlLmZwc19udW1cbiAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uID0gTWF0aC5mbG9vcihtZXRhLnRpbWVzY2FsZSAqIChmcHNEZW4gLyBmcHNOdW0pKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNQU1BhcnNlclxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIEhMU1xuICBNM1U4UGFyc2VyOiByZXF1aXJlKCcuL3NyYy9obHMvZGVtdXhlci9tM3U4cGFyc2VyJykuZGVmYXVsdCxcbiAgVHNEZW11eGVyOiByZXF1aXJlKCcuL3NyYy9obHMvZGVtdXhlci90cycpLmRlZmF1bHQsXG4gIFBsYXlsaXN0OiByZXF1aXJlKCcuL3NyYy9obHMvcGxheWxpc3QnKS5kZWZhdWx0LFxuICBGbHZEZW11eGVyOiByZXF1aXJlKCcuL3NyYy9mbHYvaW5kZXgnKS5kZWZhdWx0XG59O1xuIiwiaW1wb3J0IHsgaXNMZSwgVVRGOCB9IGZyb20gJ3hncGxheWVyLXV0aWxzJ1xuXG5jb25zdCBEQVRBX1RZUEVTID0ge1xuICBOVU1CRVI6IDAsXG4gIEJPT0xFQU46IDEsXG4gIFNUUklORzogMixcbiAgT0JKRUNUOiAzLFxuICBNSVhfQVJSQVk6IDgsXG4gIE9CSkVDVF9FTkQ6IDksXG4gIFNUUklDVF9BUlJBWTogMTAsXG4gIERBVEU6IDExLFxuICBMT05FX1NUUklORzogMTJcbn1cblxuLyoqXG4gKiBtZXRh5L+h5oGv6Kej5p6QXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFNRlBhcnNlciB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgICB0aGlzLnJlYWRPZmZzZXQgPSB0aGlzLm9mZnNldFxuICB9XG5cbiAgcmVzb2x2ZSAobWV0YSwgc2l6ZSkge1xuICAgIGlmIChzaXplIDwgMykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3QgZW5vdWdoIGRhdGEgZm9yIG1ldGFpbmZvJylcbiAgICB9XG4gICAgY29uc3QgbWV0YURhdGEgPSB7fVxuICAgIGNvbnN0IG5hbWUgPSB0aGlzLnBhcnNlVmFsdWUobWV0YSlcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMucGFyc2VWYWx1ZShtZXRhLCBzaXplIC0gbmFtZS5ib2R5U2l6ZSlcbiAgICBtZXRhRGF0YVtuYW1lLmRhdGFdID0gdmFsdWUuZGF0YVxuXG4gICAgdGhpcy5yZXNldFN0YXR1cygpXG4gICAgcmV0dXJuIG1ldGFEYXRhXG4gIH1cblxuICByZXNldFN0YXR1cyAoKSB7XG4gICAgdGhpcy5vZmZzZXQgPSAwXG4gICAgdGhpcy5yZWFkT2Zmc2V0ID0gdGhpcy5vZmZzZXRcbiAgfVxuXG4gIHBhcnNlU3RyaW5nIChidWZmZXIpIHtcbiAgICBjb25zdCBkdiA9IG5ldyBEYXRhVmlldyhidWZmZXIsIHRoaXMucmVhZE9mZnNldClcbiAgICBjb25zdCBzdHJMZW4gPSBkdi5nZXRVaW50MTYoMCwgIWlzTGUpXG4gICAgbGV0IHN0ciA9ICcnXG4gICAgaWYgKHN0ckxlbiA+IDApIHtcbiAgICAgIHN0ciA9IFVURjguZGVjb2RlKG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgdGhpcy5yZWFkT2Zmc2V0ICsgMiwgc3RyTGVuKSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gJydcbiAgICB9XG4gICAgbGV0IHNpemUgPSBzdHJMZW4gKyAyXG4gICAgdGhpcy5yZWFkT2Zmc2V0ICs9IHNpemVcbiAgICByZXR1cm4ge1xuICAgICAgZGF0YTogc3RyLFxuICAgICAgYm9keVNpemU6IHN0ckxlbiArIDJcbiAgICB9XG4gIH1cblxuICBwYXJzZURhdGUgKGJ1ZmZlciwgc2l6ZSkge1xuICAgIGNvbnN0IGR2ID0gbmV3IERhdGFWaWV3KGJ1ZmZlciwgdGhpcy5yZWFkT2Zmc2V0LCBzaXplKVxuICAgIGxldCB0cyA9IGR2LmdldEZsb2F0NjQoMCwgIWlzTGUpXG4gICAgY29uc3QgdGltZU9mZnNldCA9IGR2LmdldEludDE2KDgsICFpc0xlKVxuICAgIHRzICs9IHRpbWVPZmZzZXQgKiA2MCAqIDEwMDBcblxuICAgIHRoaXMucmVhZE9mZnNldCArPSAxMFxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBuZXcgRGF0ZSh0cyksXG4gICAgICBib2R5U2l6ZTogMTBcbiAgICB9XG4gIH1cblxuICBwYXJzZU9iamVjdCAoYnVmZmVyLCBzaXplKSB7XG4gICAgY29uc3QgbmFtZSA9IHRoaXMucGFyc2VTdHJpbmcoYnVmZmVyLCBzaXplKVxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5wYXJzZVZhbHVlKGJ1ZmZlciwgc2l6ZSAtIG5hbWUuYm9keVNpemUpXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgbmFtZTogbmFtZS5kYXRhLFxuICAgICAgICB2YWx1ZTogdmFsdWUuZGF0YVxuICAgICAgfSxcbiAgICAgIGJvZHlTaXplOiBuYW1lLmJvZHlTaXplICsgdmFsdWUuYm9keVNpemUsXG4gICAgICBpc09iakVuZDogdmFsdWUuaXNPYmpFbmRcbiAgICB9XG4gIH1cblxuICBwYXJzZUxvbmdTdHJpbmcgKGJ1ZmZlcikge1xuICAgIGNvbnN0IGR2ID0gbmV3IERhdGFWaWV3KGJ1ZmZlciwgdGhpcy5yZWFkT2Zmc2V0KVxuICAgIGNvbnN0IHN0ckxlbiA9IGR2LmdldFVpbnQzMigwLCAhaXNMZSlcbiAgICBsZXQgc3RyID0gJydcbiAgICBpZiAoc3RyTGVuID4gMCkge1xuICAgICAgc3RyID0gVVRGOC5kZWNvZGUobmV3IFVpbnQ4QXJyYXkoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQgKyAyLCBzdHJMZW4pKVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSAnJ1xuICAgIH1cbiAgICAvLyBjb25zdCBzaXplID0gc3RyTGVuICsgNDtcbiAgICB0aGlzLnJlYWRPZmZzZXQgKz0gc3RyTGVuICsgNFxuICAgIHJldHVybiB7XG4gICAgICBkYXRhOiBzdHIsXG4gICAgICBib2R5U2l6ZTogc3RyTGVuICsgNFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDop6PmnpBtZXRh5Lit55qE5Y+Y6YePXG4gICAqL1xuICBwYXJzZVZhbHVlIChkYXRhLCBzaXplKSB7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcigpXG4gICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgYnVmZmVyID0gZGF0YVxuICAgIH0gZWxzZSB7XG4gICAgICBidWZmZXIgPSBkYXRhLmJ1ZmZlclxuICAgIH1cbiAgICBjb25zdCB7XG4gICAgICBOVU1CRVIsXG4gICAgICBCT09MRUFOLFxuICAgICAgU1RSSU5HLFxuICAgICAgT0JKRUNULFxuICAgICAgTUlYX0FSUkFZLFxuICAgICAgT0JKRUNUX0VORCxcbiAgICAgIFNUUklDVF9BUlJBWSxcbiAgICAgIERBVEUsXG4gICAgICBMT05FX1NUUklOR1xuICAgIH0gPSBEQVRBX1RZUEVTXG4gICAgY29uc3QgZGF0YVZpZXcgPSBuZXcgRGF0YVZpZXcoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQsIHNpemUpXG4gICAgbGV0IGlzT2JqRW5kID0gZmFsc2VcbiAgICBjb25zdCB0eXBlID0gZGF0YVZpZXcuZ2V0VWludDgoMClcbiAgICBsZXQgb2Zmc2V0ID0gMVxuICAgIHRoaXMucmVhZE9mZnNldCArPSAxXG4gICAgbGV0IHZhbHVlID0gbnVsbFxuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIE5VTUJFUjoge1xuICAgICAgICB2YWx1ZSA9IGRhdGFWaWV3LmdldEZsb2F0NjQoMSwgIWlzTGUpXG4gICAgICAgIHRoaXMucmVhZE9mZnNldCArPSA4XG4gICAgICAgIG9mZnNldCArPSA4XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjYXNlIEJPT0xFQU46IHtcbiAgICAgICAgY29uc3QgYm9vbE51bSA9IGRhdGFWaWV3LmdldFVpbnQ4KDEpXG4gICAgICAgIHZhbHVlID0gISFib29sTnVtXG4gICAgICAgIHRoaXMucmVhZE9mZnNldCArPSAxXG4gICAgICAgIG9mZnNldCArPSAxXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjYXNlIFNUUklORzoge1xuICAgICAgICBjb25zdCBzdHIgPSB0aGlzLnBhcnNlU3RyaW5nKGJ1ZmZlcilcbiAgICAgICAgdmFsdWUgPSBzdHIuZGF0YVxuICAgICAgICBvZmZzZXQgKz0gc3RyLmJvZHlTaXplXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjYXNlIE9CSkVDVDoge1xuICAgICAgICB2YWx1ZSA9IHt9XG4gICAgICAgIGxldCBvYmpFbmRTaXplID0gMFxuICAgICAgICBpZiAoZGF0YVZpZXcuZ2V0VWludDMyKHNpemUgLSA0LCAhaXNMZSkgJiAweDAwRkZGRkZGKSB7XG4gICAgICAgICAgb2JqRW5kU2l6ZSA9IDNcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGlzLnJlYWRPZmZzZXQgKz0gb2Zmc2V0IC0gMTtcbiAgICAgICAgd2hpbGUgKG9mZnNldCA8IHNpemUgLSA0KSB7XG4gICAgICAgICAgY29uc3QgYW1mT2JqID0gdGhpcy5wYXJzZU9iamVjdChidWZmZXIsIHNpemUgLSBvZmZzZXQgLSBvYmpFbmRTaXplKVxuICAgICAgICAgIGlmIChhbWZPYmouaXNPYmplY3RFbmQpIHsgYnJlYWsgfVxuICAgICAgICAgIHZhbHVlW2FtZk9iai5kYXRhLm5hbWVdID0gYW1mT2JqLmRhdGEudmFsdWVcbiAgICAgICAgICBvZmZzZXQgKz0gYW1mT2JqLmJvZHlTaXplXG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9mZnNldCA8PSBzaXplIC0gMykge1xuICAgICAgICAgIGNvbnN0IG1hcmsgPSBkYXRhVmlldy5nZXRVaW50MzIob2Zmc2V0IC0gMSwgIWlzTGUpICYgMHgwMEZGRkZGRlxuICAgICAgICAgIGlmIChtYXJrID09PSA5KSB7XG4gICAgICAgICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gM1xuICAgICAgICAgICAgb2Zmc2V0ICs9IDNcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGNhc2UgTUlYX0FSUkFZOiB7XG4gICAgICAgIHZhbHVlID0ge31cbiAgICAgICAgb2Zmc2V0ICs9IDRcbiAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDRcbiAgICAgICAgbGV0IG9iakVuZFNpemUgPSAwXG4gICAgICAgIGlmICgoZGF0YVZpZXcuZ2V0VWludDMyKHNpemUgLSA0LCAhaXNMZSkgJiAweDAwRkZGRkZGKSA9PT0gOSkge1xuICAgICAgICAgIG9iakVuZFNpemUgPSAzXG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAob2Zmc2V0IDwgc2l6ZSAtIDgpIHtcbiAgICAgICAgICBjb25zdCBhbWZWYXIgPSB0aGlzLnBhcnNlT2JqZWN0KGJ1ZmZlciwgc2l6ZSAtIG9mZnNldCAtIG9iakVuZFNpemUpXG4gICAgICAgICAgaWYgKGFtZlZhci5pc09iamVjdEVuZCkgeyBicmVhayB9XG4gICAgICAgICAgdmFsdWVbYW1mVmFyLmRhdGEubmFtZV0gPSBhbWZWYXIuZGF0YS52YWx1ZVxuICAgICAgICAgIG9mZnNldCArPSBhbWZWYXIuYm9keVNpemVcbiAgICAgICAgfVxuICAgICAgICBpZiAob2Zmc2V0IDw9IHNpemUgLSAzKSB7XG4gICAgICAgICAgY29uc3QgbWFya2VyID0gZGF0YVZpZXcuZ2V0VWludDMyKG9mZnNldCAtIDEsICFpc0xlKSAmIDB4MDBGRkZGRkZcbiAgICAgICAgICBpZiAobWFya2VyID09PSA5KSB7XG4gICAgICAgICAgICBvZmZzZXQgKz0gM1xuICAgICAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDNcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgY2FzZSBPQkpFQ1RfRU5EOiB7XG4gICAgICAgIHZhbHVlID0gbnVsbFxuICAgICAgICBpc09iakVuZCA9IHRydWVcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgY2FzZSBTVFJJQ1RfQVJSQVk6IHtcbiAgICAgICAgdmFsdWUgPSBbXVxuICAgICAgICBjb25zdCBhcnJMZW5ndGggPSBkYXRhVmlldy5nZXRVaW50MzIoMSwgIWlzTGUpXG4gICAgICAgIG9mZnNldCArPSA0XG4gICAgICAgIHRoaXMucmVhZE9mZnNldCArPSA0XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBzY3JpcHQgPSB0aGlzLnBhcnNlVmFsdWUoYnVmZmVyLCBzaXplIC0gb2Zmc2V0KVxuICAgICAgICAgIHZhbHVlLnB1c2goc2NyaXB0LmRhdGEpXG4gICAgICAgICAgb2Zmc2V0ICs9IHNjcmlwdC5ib2R5U2l6ZVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGNhc2UgREFURToge1xuICAgICAgICBjb25zdCBkYXRlID0gdGhpcy5wYXJzZURhdGUoYnVmZmVyLCBzaXplIC0gMSlcbiAgICAgICAgdmFsdWUgPSBkYXRlLmRhdGFcbiAgICAgICAgb2Zmc2V0ICs9IGRhdGUuYm9keVNpemVcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgY2FzZSBMT05FX1NUUklORzoge1xuICAgICAgICBjb25zdCBsb25nU3RyID0gdGhpcy5wYXJzZUxvbmdTdHJpbmcoYnVmZmVyLCBzaXplIC0gMSlcbiAgICAgICAgdmFsdWUgPSBsb25nU3RyLmRhdGFcbiAgICAgICAgb2Zmc2V0ICs9IGxvbmdTdHIuYm9keVNpemVcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cblxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBvZmZzZXQgPSBzaXplXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IHZhbHVlLFxuICAgICAgYm9keVNpemU6IG9mZnNldCxcbiAgICAgIGlzT2JqRW5kOiBpc09iakVuZFxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgRVZFTlRTLCBBdWRpb1RyYWNrTWV0YSwgVmlkZW9UcmFja01ldGEgfSBmcm9tICd4Z3BsYXllci11dGlscyc7XG5pbXBvcnQgeyBTcHNQYXJzZXIgfSBmcm9tICd4Z3BsYXllci1jb2RlYyc7XG5pbXBvcnQgeyBWaWRlb1RyYWNrLCBBdWRpb1RyYWNrIH0gZnJvbSAneGdwbGF5ZXItYnVmZmVyJ1xuXG5pbXBvcnQgQU1GUGFyc2VyIGZyb20gJy4vYW1mLXBhcnNlcidcblxuY29uc3QgREVNVVhfRVZFTlRTID0gRVZFTlRTLkRFTVVYX0VWRU5UUztcblxuY2xhc3MgRmx2RGVtdXhlciB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLl9maXJzdEZyYWdtZW50TG9hZGVkID0gZmFsc2VcbiAgICB0aGlzLl90cmFja051bSA9IDBcbiAgICB0aGlzLl9oYXNTY3JpcHQgPSBmYWxzZVxuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgdGhpcy5vbihERU1VWF9FVkVOVFMuREVNVVhfU1RBUlQsIHRoaXMuZG9QYXJzZUZsdi5iaW5kKHRoaXMpKVxuICB9XG5cbiAgLyoqXG4gICAqIGlmIHRoZSBmbHYgaGVhZCBpcyB2YWxpZFxuICAgKiBAcGFyYW0gZGF0YVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIHN0YXRpYyBpc0ZsdkZpbGUgKGRhdGEpIHtcbiAgICByZXR1cm4gIShkYXRhWzBdICE9PSAweDQ2IHx8IGRhdGFbMV0gIT09IDB4NEMgfHwgZGF0YVsyXSAhPT0gMHg1NiB8fCBkYXRhWzNdICE9PSAweDAxKVxuICB9XG5cbiAgLyoqXG4gICAqIElmIHRoZSBzdHJlYW0gaGFzIGF1ZGlvIG9yIHZpZGVvLlxuICAgKiBAcGFyYW0ge251bWJlcn0gc3RyZWFtRmxhZyAtIERhdGEgZnJvbSB0aGUgc3RyZWFtIHdoaWNoIGlzIGRlZmluZSB3aGV0aGVyIHRoZSBhdWRpbyAvIHZpZGVvIHRyYWNrIGlzIGV4aXN0LlxuICAgKi9cbiAgc3RhdGljIGdldFBsYXlUeXBlIChzdHJlYW1GbGFnKSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgaGFzVmlkZW86IGZhbHNlLFxuICAgICAgaGFzQXVkaW86IGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKHN0cmVhbUZsYWcgJiAweDAxID4gMCkge1xuICAgICAgcmVzdWx0Lmhhc1ZpZGVvID0gdHJ1ZVxuICAgIH1cblxuICAgIGlmIChzdHJlYW1GbGFnICYgMHgwNCA+IDApIHtcbiAgICAgIHJlc3VsdC5oYXNBdWRpbyA9IHRydWVcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICBkb1BhcnNlRmx2ICgpIHtcbiAgICBpZiAoIXRoaXMuX2ZpcnN0RnJhZ21lbnRMb2FkZWQpIHtcbiAgICAgIGlmICh0aGlzLmxvYWRlckJ1ZmZlci5sZW5ndGggPCAxMykge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IGhlYWRlciA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDEzKVxuICAgICAgdGhpcy5wYXJzZUZsdkhlYWRlcihoZWFkZXIpXG4gICAgICB0aGlzLmRvUGFyc2VGbHYoKSAvLyDpgJLlvZLosIPnlKjvvIznu6fnu63op6PmnpBmbHbmtYFcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMubG9hZGVyQnVmZmVyLmxlbmd0aCA8IDExKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgbGV0IGNodW5rO1xuXG4gICAgICBsZXQgbG9vcE1heCA9IDEwMDAwIC8vIOmYsuatouatu+W+queOr+S6p+eUn1xuICAgICAgZG8ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnbWFyazQnKVxuICAgICAgICBjaHVuayA9IHRoaXMuX3BhcnNlRmx2VGFnKClcbiAgICAgIH0gd2hpbGUgKGNodW5rICYmIGxvb3BNYXgtLSA+IDApXG5cbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfQ09NUExFVEUpXG4gICAgfVxuICB9XG5cbiAgcGFyc2VGbHZIZWFkZXIgKGhlYWRlcikge1xuICAgIGlmICghRmx2RGVtdXhlci5pc0ZsdkZpbGUoaGVhZGVyKSkge1xuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgbmV3IEVycm9yKCdpbnZhbGlkIGZsdiBmaWxlJykpXG4gICAgICB0aGlzLmRvUGFyc2VGbHYoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9maXJzdEZyYWdtZW50TG9hZGVkID0gdHJ1ZVxuICAgICAgY29uc3QgcGxheVR5cGUgPSBGbHZEZW11eGVyLmdldFBsYXlUeXBlKGhlYWRlcls0XSlcblxuICAgICAgaWYgKHBsYXlUeXBlLmhhc1ZpZGVvKSB7XG4gICAgICAgIHRoaXMuaW5pdFZpZGVvVHJhY2soKVxuICAgICAgfVxuXG4gICAgICBpZiAocGxheVR5cGUuaGFzQXVkaW8pIHtcbiAgICAgICAgdGhpcy5pbml0QXVkaW9UcmFjaygpXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuZG9QYXJzZUZsdigpXG4gIH1cblxuICAvKipcbiAgICogaW5pdCBkZWZhdWx0IHZpZGVvIHRyYWNrIGNvbmZpZ3NcbiAgICovXG4gIGluaXRWaWRlb1RyYWNrICgpIHtcbiAgICB0aGlzLl90cmFja051bSsrXG4gICAgbGV0IHZpZGVvVHJhY2sgPSBuZXcgVmlkZW9UcmFjaygpXG4gICAgdmlkZW9UcmFjay5tZXRhID0gbmV3IFZpZGVvVHJhY2tNZXRhKClcbiAgICB2aWRlb1RyYWNrLmlkID0gdmlkZW9UcmFjay5tZXRhLmlkID0gdGhpcy5fdHJhY2tOdW1cblxuICAgIHRoaXMudHJhY2tzLnZpZGVvVHJhY2sgPSB2aWRlb1RyYWNrXG4gIH1cblxuICAvKipcbiAgICogaW5pdCBkZWZhdWx0IGF1ZGlvIHRyYWNrIGNvbmZpZ3NcbiAgICovXG4gIGluaXRBdWRpb1RyYWNrICgpIHtcbiAgICB0aGlzLl90cmFja051bSsrXG4gICAgbGV0IGF1ZGlvVHJhY2sgPSBuZXcgQXVkaW9UcmFjaygpXG4gICAgYXVkaW9UcmFjay5tZXRhID0gbmV3IEF1ZGlvVHJhY2tNZXRhKClcbiAgICBhdWRpb1RyYWNrLmlkID0gYXVkaW9UcmFjay5tZXRhLmlkID0gdGhpcy5fdHJhY2tOdW1cblxuICAgIHRoaXMudHJhY2tzLmF1ZGlvVHJhY2sgPSBhdWRpb1RyYWNrXG4gIH1cblxuICAvKipcbiAgICogUGFja2FnZSB0aGUgZGF0YSBhcyB0aGUgZm9sbG93aW5nIGRhdGEgc3RydWN0dXJlXG4gICAqIHtcbiAgICogICAgZGF0YTogVWludDhBcnJheS4gdGhlIFN0cmVhbSBkYXRhLlxuICAgKiAgICBpbmZvOiBUaGUgZmlyc3QgYnl0ZSBpbmZvIG9mIHRoZSBUYWcuXG4gICAqICAgIHRhZ1R5cGU6IDjjgIE544CBMThcbiAgICogICAgdGltZVN0YW1wOiB0aGUgdGltZXN0ZW1wXG4gICAqIH1cbiAgICovXG4gIF9wYXJzZUZsdlRhZyAoKSB7XG4gICAgaWYgKHRoaXMubG9hZGVyQnVmZmVyLmxlbmd0aCA8IDExKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBsZXQgY2h1bmsgPSB0aGlzLl9wYXJzZUZsdlRhZ0hlYWRlcigpXG4gICAgaWYgKGNodW5rKSB7XG4gICAgICB0aGlzLl9wcm9jZXNzQ2h1bmsoY2h1bmspXG4gICAgfVxuICAgIHJldHVybiBjaHVua1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIHRoZSAxMSBieXRlIHRhZyBIZWFkZXJcbiAgICovXG4gIF9wYXJzZUZsdlRhZ0hlYWRlciAoKSB7XG4gICAgbGV0IG9mZnNldCA9IDBcbiAgICBsZXQgY2h1bmsgPSB7fVxuXG4gICAgbGV0IHRhZ1R5cGUgPSB0aGlzLmxvYWRlckJ1ZmZlci50b0ludChvZmZzZXQsIDEpXG4gICAgb2Zmc2V0ICs9IDFcblxuICAgIC8vIDIgYml0IEZNUyByZXNlcnZlZCwgMSBiaXQgZmlsdGVyZWQsIDUgYml0IHRhZyB0eXBlXG4gICAgY2h1bmsuZmlsdGVyZWQgPSAodGFnVHlwZSAmIDMyKSA+Pj4gNVxuICAgIGNodW5rLnRhZ1R5cGUgPSB0YWdUeXBlICYgMzFcblxuICAgIC8vIDMgQnl0ZSBkYXRhc2l6ZVxuICAgIGNodW5rLmRhdGFzaXplID0gdGhpcy5sb2FkZXJCdWZmZXIudG9JbnQob2Zmc2V0LCAzKVxuICAgIG9mZnNldCArPSAzXG5cbiAgICBpZiAoKGNodW5rLnRhZ1R5cGUgIT09IDggJiYgY2h1bmsudGFnVHlwZSAhPT0gOSAmJiBjaHVuay50YWdUeXBlICE9PSAxMSAmJiBjaHVuay50YWdUeXBlICE9PSAxOCkgfHxcbiAgICAgIHRoaXMubG9hZGVyQnVmZmVyLnRvSW50KDgsIDMpICE9PSAwKSB7XG4gICAgICBpZiAodGhpcy5sb2FkZXJCdWZmZXIgJiYgdGhpcy5sb2FkZXJCdWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgxKVxuICAgICAgfVxuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgdGhpcy5UQUcsIG5ldyBFcnJvcigndGFnVHlwZSAnICsgY2h1bmsudGFnVHlwZSksIGZhbHNlKVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sb2FkZXJCdWZmZXIubGVuZ3RoIDwgY2h1bmsuZGF0YXNpemUgKyAxNSkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICAvLyByZWFkIHRoZSBkYXRhLlxuICAgIHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDQpXG5cbiAgICAvLyAzIEJ5dGUgdGltZXN0YW1wXG4gICAgbGV0IHRpbWVzdGFtcCA9IHRoaXMubG9hZGVyQnVmZmVyLnRvSW50KDAsIDMpXG4gICAgdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMylcblxuICAgIC8vIDEgQnl0ZSB0aW1lc3RhbXBFeHRcbiAgICBsZXQgdGltZXN0YW1wRXh0ID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMSlbMF1cbiAgICBpZiAodGltZXN0YW1wRXh0ID4gMCkge1xuICAgICAgdGltZXN0YW1wICs9IHRpbWVzdGFtcEV4dCAqIDB4MTAwMDAwMFxuICAgIH1cblxuICAgIGNodW5rLmR0cyA9IHRpbWVzdGFtcFxuXG4gICAgLy8gc3RyZWFtSWRcbiAgICB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgzKVxuICAgIHJldHVybiBjaHVua1xuICB9XG5cbiAgX3Byb2Nlc3NDaHVuayAoY2h1bmspIHtcbiAgICBzd2l0Y2ggKGNodW5rLnRhZ1R5cGUpIHtcbiAgICAgIGNhc2UgMTg6XG4gICAgICAgIHRoaXMuX3BhcnNlU2NyaXB0RGF0YShjaHVuaylcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgODpcbiAgICAgICAgdGhpcy5fcGFyc2VBQUNEYXRhKGNodW5rKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSA5OlxuICAgICAgICB0aGlzLl9wYXJzZUhldmNEYXRhKGNodW5rKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAxMTpcbiAgICAgICAgLy8gZm9yIHNvbWUgQ0ROIHRoYXQgZGlkIG5vdCBwcm9jZXNzIHRoZSBjdXJyZWN0IFJUTVAgbWVzc2FnZXNcbiAgICAgICAgdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMylcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDEpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHBhcnNlIGZsdiBzY3JpcHQgZGF0YVxuICAgKiBAcGFyYW0gY2h1bmtcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9wYXJzZVNjcmlwdERhdGEgKGNodW5rKSB7XG4gICAgbGV0IGF1ZGlvVHJhY2sgPSB0aGlzLnRyYWNrcy5hdWRpb1RyYWNrXG4gICAgbGV0IHZpZGVvVHJhY2sgPSB0aGlzLnRyYWNrcy52aWRlb1RyYWNrXG5cbiAgICBsZXQgZGF0YSA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KGNodW5rLmRhdGFzaXplKVxuXG4gICAgY29uc3QgaW5mbyA9IG5ldyBBTUZQYXJzZXIoKS5yZXNvbHZlKGRhdGEsIGRhdGEubGVuZ3RoKVxuXG4gICAgY29uc3Qgb25NZXRhRGF0YSA9IHRoaXMuX2NvbnRleHQub25NZXRhRGF0YSA9IGluZm8gPyBpbmZvLm9uTWV0YURhdGEgOiB1bmRlZmluZWRcblxuICAgIC8vIGZpbGwgbWVkaWFJbmZvXG4gICAgdGhpcy5fY29udGV4dC5tZWRpYUluZm8uZHVyYXRpb24gPSBvbk1ldGFEYXRhLmR1cmF0aW9uXG4gICAgdGhpcy5fY29udGV4dC5tZWRpYUluZm8uaGFzVmlkZW8gPSBvbk1ldGFEYXRhLmhhc1ZpZGVvXG4gICAgdGhpcy5fY29udGV4dC5tZWRpYUluZm8uaHNhQXVkaW8gPSBvbk1ldGFEYXRhLmhhc0F1ZGlvXG5cbiAgICBsZXQgdmFsaWRhdGUgPSB0aGlzLl9kYXRhc2l6ZVZhbGlkYXRvcihjaHVuay5kYXRhc2l6ZSlcbiAgICBpZiAodmFsaWRhdGUpIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVESUFfSU5GTylcbiAgICAgIHRoaXMuX2hhc1NjcmlwdCA9IHRydWVcbiAgICB9XG5cbiAgICAvLyBFZGl0IGRlZmF1bHQgbWV0YS5cbiAgICBpZiAoYXVkaW9UcmFjayAmJiAhYXVkaW9UcmFjay5oYXNTcGVjaWZpY0NvbmZpZykge1xuICAgICAgbGV0IG1ldGEgPSBhdWRpb1RyYWNrLm1ldGFcbiAgICAgIGlmIChvbk1ldGFEYXRhLmF1ZGlvc2FtcGxlcmF0ZSkge1xuICAgICAgICBtZXRhLnNhbXBsZVJhdGUgPSBvbk1ldGFEYXRhLmF1ZGlvc2FtcGxlcmF0ZVxuICAgICAgfVxuXG4gICAgICBpZiAob25NZXRhRGF0YS5hdWRpb2NoYW5uZWxzKSB7XG4gICAgICAgIG1ldGEuY2hhbm5lbENvdW50ID0gb25NZXRhRGF0YS5hdWRpb2NoYW5uZWxzXG4gICAgICB9XG5cbiAgICAgIHN3aXRjaCAob25NZXRhRGF0YS5hdWRpb3NhbXBsZXJhdGUpIHtcbiAgICAgICAgY2FzZSA0NDEwMDpcbiAgICAgICAgICBtZXRhLnNhbXBsZVJhdGVJbmRleCA9IDRcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDIyMDUwOlxuICAgICAgICAgIG1ldGEuc2FtcGxlUmF0ZUluZGV4ID0gN1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMTEwMjU6XG4gICAgICAgICAgbWV0YS5zYW1wbGVSYXRlSW5kZXggPSAxMFxuICAgICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICAgIGlmICh2aWRlb1RyYWNrICYmICF2aWRlb1RyYWNrLmhhc1NwZWNpZmljQ29uZmlnKSB7XG4gICAgICBsZXQgbWV0YSA9IHZpZGVvVHJhY2subWV0YVxuICAgICAgaWYgKHR5cGVvZiBvbk1ldGFEYXRhLmZyYW1lcmF0ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgbGV0IGZwc051bSA9IE1hdGguZmxvb3Iob25NZXRhRGF0YS5mcmFtZXJhdGUgKiAxMDAwKVxuICAgICAgICBpZiAoZnBzTnVtID4gMCkge1xuICAgICAgICAgIGxldCBmcHMgPSBmcHNOdW0gLyAxMDAwXG4gICAgICAgICAgaWYgKCFtZXRhLmZyYW1lUmF0ZSkge1xuICAgICAgICAgICAgbWV0YS5mcmFtZVJhdGUgPSB7fVxuICAgICAgICAgIH1cbiAgICAgICAgICBtZXRhLmZyYW1lUmF0ZS5maXhlZCA9IHRydWVcbiAgICAgICAgICBtZXRhLmZyYW1lUmF0ZS5mcHMgPSBmcHNcbiAgICAgICAgICBtZXRhLmZyYW1lUmF0ZS5mcHNfbnVtID0gZnBzTnVtXG4gICAgICAgICAgbWV0YS5mcmFtZVJhdGUuZnBzX2RlbiA9IDEwMDBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9hYWNTZXF1ZW5jZUhlYWRlclBhcnNlciAoZGF0YSkge1xuICAgIGxldCByZXQgPSB7fVxuICAgIHJldC5oYXNTcGVjaWZpY0NvbmZpZyA9IHRydWVcbiAgICByZXQub2JqZWN0VHlwZSA9IGRhdGFbMV0gPj4+IDNcbiAgICByZXQuc2FtcGxlUmF0ZUluZGV4ID0gKChkYXRhWzFdICYgNykgPDwgMSkgfCAoZGF0YVsyXSA+Pj4gNylcbiAgICByZXQuYXVkaW9zYW1wbGVyYXRlID0gdGhpcy5fc3dpdGNoQXVkaW9TYW1wbGVSYXRlKHJldC5zYW1wbGVSYXRlSW5kZXgpXG4gICAgcmV0LmNoYW5uZWxDb3VudCA9IChkYXRhWzJdICYgMTIwKSA+Pj4gM1xuICAgIHJldC5mcmFtZUxlbmd0aCA9IChkYXRhWzJdICYgNCkgPj4+IDJcbiAgICByZXQuZGVwZW5kc09uQ29yZUNvZGVyID0gKGRhdGFbMl0gJiAyKSA+Pj4gMVxuICAgIHJldC5leHRlbnNpb25GbGFnSW5kZXggPSBkYXRhWzJdICYgMVxuXG4gICAgcmV0LmNvZGVjID0gYG1wNGEuNDAuJHtyZXQub2JqZWN0VHlwZX1gXG4gICAgbGV0IHVzZXJBZ2VudCA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgbGV0IGV4dGVuc2lvblNhbXBsaW5nSW5kZXg7XG5cbiAgICBsZXQgY29uZmlnO1xuICAgIGxldCBzYW1wbGluZ0luZGV4ID0gcmV0LnNhbXBsZVJhdGVJbmRleDtcblxuICAgIGlmICh1c2VyQWdlbnQuaW5kZXhPZignZmlyZWZveCcpICE9PSAtMSkge1xuICAgICAgLy8gZmlyZWZveDogdXNlIFNCUiAoSEUtQUFDKSBpZiBmcmVxIGxlc3MgdGhhbiAyNGtIelxuICAgICAgaWYgKHJldC5zYW1wbGVSYXRlSW5kZXggPj0gNikge1xuICAgICAgICByZXQub2JqZWN0VHlwZSA9IDU7XG4gICAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSg0KTtcbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCA9IHNhbXBsaW5nSW5kZXggLSAzO1xuICAgICAgfSBlbHNlIHsgLy8gdXNlIExDLUFBQ1xuICAgICAgICByZXQub2JqZWN0VHlwZSA9IDI7XG4gICAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSgyKTtcbiAgICAgICAgZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCA9IHNhbXBsaW5nSW5kZXg7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh1c2VyQWdlbnQuaW5kZXhPZignYW5kcm9pZCcpICE9PSAtMSkge1xuICAgICAgLy8gYW5kcm9pZDogYWx3YXlzIHVzZSBMQy1BQUNcbiAgICAgIHJldC5vYmplY3RUeXBlID0gMjtcbiAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSgyKTtcbiAgICAgIGV4dGVuc2lvblNhbXBsaW5nSW5kZXggPSBzYW1wbGluZ0luZGV4O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBmb3Igb3RoZXIgYnJvd3NlcnMsIGUuZy4gY2hyb21lLi4uXG4gICAgICAvLyBBbHdheXMgdXNlIEhFLUFBQyB0byBtYWtlIGl0IGVhc2llciB0byBzd2l0Y2ggYWFjIGNvZGVjIHByb2ZpbGVcbiAgICAgIHJldC5vYmplY3RUeXBlID0gNTtcbiAgICAgIGV4dGVuc2lvblNhbXBsaW5nSW5kZXggPSByZXQuc2FtcGxlUmF0ZUluZGV4O1xuICAgICAgY29uZmlnID0gbmV3IEFycmF5KDQpO1xuXG4gICAgICBpZiAocmV0LnNhbXBsZVJhdGVJbmRleCA+PSA2KSB7XG4gICAgICAgIGV4dGVuc2lvblNhbXBsaW5nSW5kZXggPSByZXQuc2FtcGxlUmF0ZUluZGV4IC0gMztcbiAgICAgIH0gZWxzZSBpZiAocmV0LmNoYW5uZWxDb3VudCA9PT0gMSkgeyAvLyBNb25vIGNoYW5uZWxcbiAgICAgICAgcmV0Lm9iamVjdFR5cGUgPSAyO1xuICAgICAgICBjb25maWcgPSBuZXcgQXJyYXkoMik7XG4gICAgICAgIGV4dGVuc2lvblNhbXBsaW5nSW5kZXggPSByZXQuc2FtcGxlUmF0ZUluZGV4O1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbmZpZ1swXSA9IHJldC5vYmplY3RUeXBlIDw8IDM7XG4gICAgY29uZmlnWzBdIHw9IChyZXQuc2FtcGxlUmF0ZUluZGV4ICYgMHgwRikgPj4+IDE7XG4gICAgY29uZmlnWzFdID0gKHJldC5zYW1wbGVSYXRlSW5kZXggJiAweDBGKSA8PCA3O1xuICAgIGNvbmZpZ1sxXSB8PSAocmV0LmNoYW5uZWxDb3VudCAmIDB4MEYpIDw8IDM7XG4gICAgaWYgKHJldC5vYmplY3RUeXBlID09PSA1KSB7XG4gICAgICBjb25maWdbMV0gfD0gKChleHRlbnNpb25TYW1wbGluZ0luZGV4ICYgMHgwRikgPj4+IDEpO1xuICAgICAgY29uZmlnWzJdID0gKGV4dGVuc2lvblNhbXBsaW5nSW5kZXggJiAweDAxKSA8PCA3O1xuICAgICAgLy8gZXh0ZW5kZWQgYXVkaW8gb2JqZWN0IHR5cGU6IGZvcmNlIHRvIDIgKExDLUFBQylcbiAgICAgIGNvbmZpZ1syXSB8PSAoMiA8PCAyKTtcbiAgICAgIGNvbmZpZ1szXSA9IDA7XG4gICAgfVxuICAgIHJldC5jb25maWcgPSBjb25maWdcbiAgICByZXR1cm4gcmV0XG4gIH1cblxuICBfcGFyc2VBQUNEYXRhIChjaHVuaykge1xuICAgIGxldCB0cmFjayA9IHRoaXMudHJhY2tzLmF1ZGlvVHJhY2tcbiAgICBpZiAoIXRyYWNrKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgbWV0YSA9IHRyYWNrLm1ldGFcblxuICAgIGlmICghbWV0YSkge1xuICAgICAgdHJhY2subWV0YSA9IG5ldyBBdWRpb1RyYWNrTWV0YSgpXG4gICAgICBtZXRhID0gdHJhY2subWV0YTtcbiAgICB9XG5cbiAgICBsZXQgaW5mbyA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDEpWzBdXG5cbiAgICBjaHVuay5kYXRhID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoY2h1bmsuZGF0YXNpemUgLSAxKVxuXG4gICAgbGV0IGZvcm1hdCA9IChpbmZvICYgMjQwKSA+Pj4gNFxuXG4gICAgdHJhY2suZm9ybWF0ID0gZm9ybWF0XG5cbiAgICBpZiAoZm9ybWF0ICE9PSAxMCkge1xuICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgbmV3IEVycm9yKGBpbnZhbGlkIGF1ZGlvIGZvcm1hdDogJHtmb3JtYXR9YCkpXG4gICAgfVxuXG4gICAgaWYgKGZvcm1hdCA9PT0gMTAgJiYgIXRoaXMuX2hhc0F1ZGlvU2VxdWVuY2UpIHtcbiAgICAgIG1ldGEuc2FtcGxlUmF0ZSA9IHRoaXMuX3N3aXRjaEF1ZGlvU2FtcGxpbmdGcmVxdWVuY3koaW5mbylcbiAgICAgIG1ldGEuc2FtcGxlUmF0ZUluZGV4ID0gKGluZm8gJiAxMikgPj4+IDJcbiAgICAgIG1ldGEuZnJhbWVMZW50aCA9IChpbmZvICYgMikgPj4+IDFcbiAgICAgIG1ldGEuY2hhbm5lbENvdW50ID0gaW5mbyAmIDFcbiAgICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb24gPSBNYXRoLmZsb29yKDEwMjQgLyBtZXRhLmF1ZGlvU2FtcGxlUmF0ZSAqIG1ldGEudGltZXNjYWxlKVxuICAgIH1cblxuICAgIGxldCBhdWRpb1NhbXBsZVJhdGUgPSBtZXRhLmF1ZGlvU2FtcGxlUmF0ZVxuICAgIGxldCBhdWRpb1NhbXBsZVJhdGVJbmRleCA9IG1ldGEuc2FtcGxlUmF0ZUluZGV4XG4gICAgbGV0IHJlZlNhbXBsZUR1cmF0aW9uID0gbWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuXG4gICAgZGVsZXRlIGNodW5rLnRhZ1R5cGVcbiAgICBsZXQgdmFsaWRhdGUgPSB0aGlzLl9kYXRhc2l6ZVZhbGlkYXRvcihjaHVuay5kYXRhc2l6ZSlcblxuICAgIGlmIChjaHVuay5kYXRhWzBdID09PSAwKSB7IC8vIEFBQyBTZXF1ZW5jZSBIZWFkZXJcbiAgICAgIGxldCBhYWNIZWFkZXIgPSB0aGlzLl9hYWNTZXF1ZW5jZUhlYWRlclBhcnNlcihjaHVuay5kYXRhKVxuICAgICAgYXVkaW9TYW1wbGVSYXRlID0gYWFjSGVhZGVyLmF1ZGlvc2FtcGxlcmF0ZSB8fCBtZXRhLmF1ZGlvU2FtcGxlUmF0ZVxuICAgICAgYXVkaW9TYW1wbGVSYXRlSW5kZXggPSBhYWNIZWFkZXIuc2FtcGxlUmF0ZUluZGV4IHx8IG1ldGEuc2FtcGxlUmF0ZUluZGV4XG4gICAgICByZWZTYW1wbGVEdXJhdGlvbiA9IE1hdGguZmxvb3IoMTAyNCAvIGF1ZGlvU2FtcGxlUmF0ZSAqIG1ldGEudGltZXNjYWxlKVxuXG4gICAgICBtZXRhLmNoYW5uZWxDb3VudCA9IGFhY0hlYWRlci5jaGFubmVsQ291bnRcbiAgICAgIG1ldGEuc2FtcGxlUmF0ZSA9IGF1ZGlvU2FtcGxlUmF0ZVxuICAgICAgbWV0YS5zYW1wbGVSYXRlSW5kZXggPSBhdWRpb1NhbXBsZVJhdGVJbmRleFxuICAgICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA9IHJlZlNhbXBsZUR1cmF0aW9uXG4gICAgICBtZXRhLmR1cmF0aW9uID0gdGhpcy5fY29udGV4dC5tZWRpYUluZm8uZHVyYXRpb24gKiBtZXRhLnRpbWVzY2FsZVxuICAgICAgbWV0YS5jb25maWcgPSBhYWNIZWFkZXIuY29uZmlnXG5cbiAgICAgIGNvbnN0IGF1ZGlvTWVkaWEgPSB0aGlzLl9jb250ZXh0Lm1lZGlhSW5mby5hdWRpb1xuXG4gICAgICAvLyBmaWxsIGF1ZGlvIG1lZGlhIGluZm9cbiAgICAgIGF1ZGlvTWVkaWEuY29kZWMgPSBhYWNIZWFkZXIuY29kZWNcbiAgICAgIGF1ZGlvTWVkaWEuY2hhbm5lbENvdW50ID0gYWFjSGVhZGVyLmNoYW5uZWxDb3VudFxuICAgICAgYXVkaW9NZWRpYS5zYW1wbGVSYXRlID0gYXVkaW9TYW1wbGVSYXRlXG4gICAgICBhdWRpb01lZGlhLnNhbXBsZVJhdGVJbmRleCA9IGFhY0hlYWRlci5hdWRpb1NhbXBsZVJhdGVJbmRleFxuXG4gICAgICBpZiAodGhpcy5faGFzU2NyaXB0ICYmICF0aGlzLl9oYXNBdWRpb1NlcXVlbmNlKSB7XG4gICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAnYXVkaW8nKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9oYXNTY3JpcHQgJiYgdGhpcy5faGFzQXVkaW9TZXF1ZW5jZSkge1xuICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkFVRElPX01FVEFEQVRBX0NIQU5HRSlcbiAgICAgICAgLy8gdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICdhdWRpbycpXG4gICAgICB9XG4gICAgICB0aGlzLl9oYXNBdWRpb1NlcXVlbmNlID0gdHJ1ZVxuXG4gICAgICB0aGlzLl9tZXRhQ2hhbmdlID0gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5fbWV0YUNoYW5nZSkge1xuICAgICAgICBjaHVuay5vcHRpb25zID0ge1xuICAgICAgICAgIG1ldGE6IHRyYWNrLm1ldGFcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fbWV0YUNoYW5nZSA9IGZhbHNlXG4gICAgICB9XG5cbiAgICAgIGNodW5rLmRhdGEgPSBjaHVuay5kYXRhLnNsaWNlKDEsIGNodW5rLmRhdGEubGVuZ3RoKVxuICAgICAgdHJhY2suc2FtcGxlcy5wdXNoKGNodW5rKVxuICAgIH1cbiAgICBpZiAoIXZhbGlkYXRlKSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLlRBRywgbmV3IEVycm9yKCdUQUcgbGVuZ3RoIGVycm9yIGF0ICcgKyBjaHVuay5kYXRhc2l6ZSksIGZhbHNlKVxuICAgICAgLy8gdGhpcy5sb2dnZXIud2Fybih0aGlzLlRBRywgZXJyb3IubWVzc2FnZSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcGFyc2UgaGV2Yy9hdmMgdmlkZW8gZGF0YVxuICAgKiBAcGFyYW0gY2h1bmtcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9wYXJzZUhldmNEYXRhIChjaHVuaykge1xuICAgIC8vIGhlYWRlclxuICAgIGxldCBpbmZvID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoMSlbMF1cbiAgICBjaHVuay5mcmFtZVR5cGUgPSAoaW5mbyAmIDB4ZjApID4+PiA0XG4gICAgY2h1bmsuaXNLZXlmcmFtZSA9IGNodW5rLmZyYW1lVHlwZSA9PT0gMVxuICAgIC8vIGxldCB0ZW1wQ29kZWNJRCA9IHRoaXMudHJhY2tzLnZpZGVvVHJhY2suY29kZWNJRFxuICAgIGxldCBjb2RlY0lEID0gaW5mbyAmIDB4MGZcbiAgICB0aGlzLnRyYWNrcy52aWRlb1RyYWNrLmNvZGVjSUQgPSBjb2RlY0lEXG5cbiAgICAvLyBoZXZj5ZKMYXZj55qEaGVhZGVy6Kej5p6Q5pa55byP5LiA5qC3XG4gICAgY2h1bmsuYXZjUGFja2V0VHlwZSA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDEpWzBdXG4gICAgY2h1bmsuY3RzID0gdGhpcy5sb2FkZXJCdWZmZXIudG9JbnQoMCwgMylcbiAgICB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdCgzKVxuXG4gICAgLy8gMTIgZm9yIGhldmMsIDcgZm9yIGF2Y1xuICAgIGlmIChjb2RlY0lEID09PSAxMikge1xuICAgICAgY29uc3QgZGF0YSA9IHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KGNodW5rLmRhdGFzaXplIC0gNSlcbiAgICAgIGNodW5rLmRhdGEgPSBkYXRhXG5cbiAgICAgIGlmIChOdW1iZXIucGFyc2VJbnQoY2h1bmsuYXZjUGFja2V0VHlwZSkgIT09IDApIHtcbiAgICAgICAgaWYgKCF0aGlzLl9kYXRhc2l6ZVZhbGlkYXRvcihjaHVuay5kYXRhc2l6ZSkpIHtcbiAgICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLlRBRywgbmV3IEVycm9yKGBpbnZhbGlkIHZpZGVvIHRhZyBkYXRhc2l6ZTogJHtjaHVuay5kYXRhc2l6ZX1gKSwgZmFsc2UpXG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5hbHUgPSB7fVxuICAgICAgICBsZXQgciA9IDBcbiAgICAgICAgbmFsdS5jdHMgPSBjaHVuay5jdHNcbiAgICAgICAgbmFsdS5kdHMgPSBjaHVuay5kdHNcbiAgICAgICAgd2hpbGUgKGNodW5rLmRhdGEubGVuZ3RoID4gcikge1xuICAgICAgICAgIGxldCBzaXplcyA9IGNodW5rLmRhdGEuc2xpY2UoTnVtYmVyLnBhcnNlSW50KHIpLCA0ICsgcilcbiAgICAgICAgICBuYWx1LnNpemUgPSBzaXplc1szXVxuICAgICAgICAgIG5hbHUuc2l6ZSArPSBzaXplc1syXSAqIDI1NlxuICAgICAgICAgIG5hbHUuc2l6ZSArPSBzaXplc1sxXSAqIDI1NiAqIDI1NlxuICAgICAgICAgIG5hbHUuc2l6ZSArPSBzaXplc1swXSAqIDI1NiAqIDI1NiAqIDI1NlxuICAgICAgICAgIHIgKz0gNFxuICAgICAgICAgIG5hbHUuZGF0YSA9IGNodW5rLmRhdGEuc2xpY2UoTnVtYmVyLnBhcnNlSW50KHIpLCBuYWx1LnNpemUgKyByKVxuICAgICAgICAgIHIgKz0gbmFsdS5zaXplXG4gICAgICAgICAgdGhpcy50cmFja3MudmlkZW9UcmFjay5zYW1wbGVzLnB1c2gobmFsdSlcbiAgICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgJ3ZpZGVvJylcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChOdW1iZXIucGFyc2VJbnQoY2h1bmsuYXZjUGFja2V0VHlwZSkgPT09IDApIHtcbiAgICAgICAgaWYgKCF0aGlzLl9kYXRhc2l6ZVZhbGlkYXRvcihjaHVuay5kYXRhc2l6ZSkpIHtcbiAgICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLlRBRywgbmV3IEVycm9yKGBpbnZhbGlkIHZpZGVvIHRhZyBkYXRhc2l6ZTogJHtjaHVuay5kYXRhc2l6ZX1gKSwgZmFsc2UpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICd2aWRlbycpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNvZGVjSUQgPT09IDcpIHtcbiAgICAgIGxldCBkYXRhID0gdGhpcy5sb2FkZXJCdWZmZXIuc2hpZnQoY2h1bmsuZGF0YXNpemUgLSA1KVxuICAgICAgaWYgKGRhdGFbNF0gPT09IDAgJiYgZGF0YVs1XSA9PT0gMCAmJiBkYXRhWzZdID09PSAwICYmIGRhdGFbN10gPT09IDEpIHtcbiAgICAgICAgbGV0IGF2Y2NsZW5ndGggPSAwXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgYXZjY2xlbmd0aCA9IGF2Y2NsZW5ndGggKiAyNTYgKyBkYXRhW2ldXG4gICAgICAgIH1cbiAgICAgICAgYXZjY2xlbmd0aCAtPSA0XG4gICAgICAgIGRhdGEgPSBkYXRhLnNsaWNlKDQsIGRhdGEubGVuZ3RoKVxuICAgICAgICBkYXRhWzNdID0gYXZjY2xlbmd0aCAlIDI1NlxuICAgICAgICBhdmNjbGVuZ3RoID0gKGF2Y2NsZW5ndGggLSBkYXRhWzNdKSAvIDI1NlxuICAgICAgICBkYXRhWzJdID0gYXZjY2xlbmd0aCAlIDI1NlxuICAgICAgICBhdmNjbGVuZ3RoID0gKGF2Y2NsZW5ndGggLSBkYXRhWzJdKSAvIDI1NlxuICAgICAgICBkYXRhWzFdID0gYXZjY2xlbmd0aCAlIDI1NlxuICAgICAgICBkYXRhWzBdID0gKGF2Y2NsZW5ndGggLSBkYXRhWzFdKSAvIDI1NlxuICAgICAgfVxuXG4gICAgICBjaHVuay5kYXRhID0gZGF0YVxuICAgICAgLy8gSWYgaXQgaXMgQVZDIHNlcXVlY2UgSGVhZGVyLlxuICAgICAgaWYgKGNodW5rLmF2Y1BhY2tldFR5cGUgPT09IDApIHtcbiAgICAgICAgdGhpcy5fYXZjU2VxdWVuY2VIZWFkZXJQYXJzZXIoY2h1bmsuZGF0YSlcbiAgICAgICAgbGV0IHZhbGlkYXRlID0gdGhpcy5fZGF0YXNpemVWYWxpZGF0b3IoY2h1bmsuZGF0YXNpemUpXG4gICAgICAgIGlmICh2YWxpZGF0ZSkge1xuICAgICAgICAgIGlmICh0aGlzLl9oYXNTY3JpcHQgJiYgIXRoaXMuX2hhc1ZpZGVvU2VxdWVuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuTUVUQURBVEFfUEFSU0VELCAndmlkZW8nKVxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5faGFzU2NyaXB0ICYmIHRoaXMuX2hhc1ZpZGVvU2VxdWVuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuVklERU9fTUVUQURBVEFfQ0hBTkdFKVxuICAgICAgICAgICAgLy8gdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICd2aWRlbycpXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX2hhc1ZpZGVvU2VxdWVuY2UgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWV0YUNoYW5nZSA9IHRydWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghdGhpcy5fZGF0YXNpemVWYWxpZGF0b3IoY2h1bmsuZGF0YXNpemUpKSB7XG4gICAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgdGhpcy5UQUcsIG5ldyBFcnJvcihgaW52YWxpZCB2aWRlbyB0YWcgZGF0YXNpemU6ICR7Y2h1bmsuZGF0YXNpemV9YCksIGZhbHNlKVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fbWV0YUNoYW5nZSkge1xuICAgICAgICAgIGNodW5rLm9wdGlvbnMgPSB7XG4gICAgICAgICAgICBtZXRhOiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnRyYWNrcy52aWRlb1RyYWNrLm1ldGEpXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX21ldGFDaGFuZ2UgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIHRoaXMudHJhY2tzLnZpZGVvVHJhY2suc2FtcGxlcy5wdXNoKGNodW5rKVxuICAgICAgICAvLyB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0NPTVBMRVRFKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLlRBRywgbmV3IEVycm9yKGB2aWRlbyBjb2RlaWQgaXMgJHtjb2RlY0lEfWApLCBmYWxzZSlcbiAgICAgIGNodW5rLmRhdGEgPSB0aGlzLmxvYWRlckJ1ZmZlci5zaGlmdChjaHVuay5kYXRhc2l6ZSAtIDEpXG4gICAgICBpZiAoIXRoaXMuX2RhdGFzaXplVmFsaWRhdG9yKGNodW5rLmRhdGFzaXplKSkge1xuICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLlRBRywgbmV3IEVycm9yKGBpbnZhbGlkIHZpZGVvIHRhZyBkYXRhc2l6ZTogJHtjaHVuay5kYXRhc2l6ZX1gKSwgZmFsc2UpXG4gICAgICB9XG4gICAgICB0aGlzLnRyYWNrcy52aWRlb1RyYWNrLnNhbXBsZXMucHVzaChjaHVuaylcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfQ09NUExFVEUpXG4gICAgfVxuICAgIGRlbGV0ZSBjaHVuay50YWdUeXBlXG4gIH1cblxuICAvKipcbiAgICogcGFyc2UgYXZjIG1ldGFkYXRhXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfYXZjU2VxdWVuY2VIZWFkZXJQYXJzZXIgKGRhdGEpIHtcbiAgICBsZXQgdHJhY2sgPSB0aGlzLnRyYWNrcy52aWRlb1RyYWNrXG5cbiAgICBpZiAoIXRyYWNrKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgb2Zmc2V0ID0gMFxuXG4gICAgaWYgKCF0cmFjay5tZXRhKSB7XG4gICAgICB0cmFjay5tZXRhID0gbmV3IFZpZGVvVHJhY2tNZXRhKClcbiAgICB9XG4gICAgbGV0IG1ldGEgPSB0cmFjay5tZXRhXG5cbiAgICBtZXRhLmNvbmZpZ3VyYXRpb25WZXJzaW9uID0gZGF0YVswXVxuICAgIG1ldGEuYXZjUHJvZmlsZUluZGljYXRpb24gPSBkYXRhWzFdXG4gICAgbWV0YS5wcm9maWxlQ29tcGF0aWJpbGl0eSA9IGRhdGFbMl1cbiAgICBtZXRhLmF2Y0xldmVsSW5kaWNhdGlvbiA9IGRhdGFbM10gLyAxMFxuICAgIG1ldGEubmFsVW5pdExlbmd0aCA9IChkYXRhWzRdICYgMHgwMykgKyAxXG5cbiAgICBsZXQgbnVtT2ZTcHMgPSBkYXRhWzVdICYgMHgxZlxuICAgIG9mZnNldCA9IDZcbiAgICBsZXQgY29uZmlnID0ge31cblxuICAgIC8vIHBhcnNlIFNQU1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtT2ZTcHM7IGkrKykge1xuICAgICAgbGV0IHNpemUgPSBkYXRhW29mZnNldF0gKiAyNTUgKyBkYXRhW29mZnNldCArIDFdXG4gICAgICBvZmZzZXQgKz0gMlxuXG4gICAgICBsZXQgc3BzID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSlcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgICAgIHNwc1tqXSA9IGRhdGFbb2Zmc2V0ICsgal1cbiAgICAgIH1cblxuICAgICAgLy8gY29kZWMgc3RyaW5nXG4gICAgICBsZXQgY29kZWNTdHJpbmcgPSAnYXZjMS4nXG4gICAgICBmb3IgKGxldCBqID0gMTsgaiA8IDQ7IGorKykge1xuICAgICAgICBsZXQgaCA9IHNwc1tqXS50b1N0cmluZygxNilcbiAgICAgICAgaWYgKGgubGVuZ3RoIDwgMikge1xuICAgICAgICAgIGggPSAnMCcgKyBoXG4gICAgICAgIH1cbiAgICAgICAgY29kZWNTdHJpbmcgKz0gaFxuICAgICAgfVxuXG4gICAgICBtZXRhLmNvZGVjID0gY29kZWNTdHJpbmdcblxuICAgICAgb2Zmc2V0ICs9IHNpemVcbiAgICAgIHRoaXMudHJhY2tzLnZpZGVvVHJhY2subWV0YS5zcHMgPSBzcHNcbiAgICAgIGNvbmZpZyA9IFNwc1BhcnNlci5wYXJzZVNQUyhzcHMpXG4gICAgfVxuXG4gICAgbGV0IG51bU9mUHBzID0gZGF0YVtvZmZzZXRdXG5cbiAgICBvZmZzZXQrK1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1PZlBwczsgaSsrKSB7XG4gICAgICBsZXQgc2l6ZSA9IGRhdGFbb2Zmc2V0XSAqIDI1NSArIGRhdGFbb2Zmc2V0ICsgMV1cbiAgICAgIG9mZnNldCArPSAyXG4gICAgICBsZXQgcHBzID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSlcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgICAgIHBwc1tqXSA9IGRhdGFbb2Zmc2V0ICsgal1cbiAgICAgIH1cbiAgICAgIG9mZnNldCArPSBzaXplXG4gICAgICB0aGlzLnRyYWNrcy52aWRlb1RyYWNrLm1ldGEucHBzID0gcHBzXG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbihtZXRhLCBTcHNQYXJzZXIudG9WaWRlb01ldGEoY29uZmlnKSlcblxuICAgIC8vIGZpbGwgdmlkZW8gbWVkaWEgaW5mb1xuICAgIGNvbnN0IHZpZGVvTWVkaWEgPSB0aGlzLl9jb250ZXh0Lm1lZGlhSW5mby52aWRlb1xuXG4gICAgdmlkZW9NZWRpYS5jb2RlYyA9IG1ldGEuY29kZWNcbiAgICB2aWRlb01lZGlhLnByb2ZpbGUgPSBtZXRhLnByb2ZpbGVcbiAgICB2aWRlb01lZGlhLmxldmVsID0gbWV0YS5sZXZlbFxuICAgIHZpZGVvTWVkaWEuY2hyb21hRm9ybWF0ID0gbWV0YS5jaHJvbWFGb3JtYXRcbiAgICB2aWRlb01lZGlhLmZyYW1lUmF0ZSA9IG1ldGEuZnJhbWVSYXRlXG4gICAgdmlkZW9NZWRpYS5wYXJSYXRpbyA9IG1ldGEucGFyUmF0aW9cbiAgICB2aWRlb01lZGlhLndpZHRoID0gdmlkZW9NZWRpYS53aWR0aCA9PT0gbWV0YS5wcmVzZW50V2lkdGggPyB2aWRlb01lZGlhLndpZHRoIDogbWV0YS5wcmVzZW50V2lkdGhcbiAgICB2aWRlb01lZGlhLmhlaWdodCA9IHZpZGVvTWVkaWEuaGVpZ2h0ID09PSBtZXRhLnByZXNlbnRIZWlnaHQgPyB2aWRlb01lZGlhLndpZHRoIDogbWV0YS5wcmVzZW50SGVpZ2h0XG5cbiAgICBtZXRhLmR1cmF0aW9uID0gdGhpcy5fY29udGV4dC5tZWRpYUluZm8uZHVyYXRpb24gKiBtZXRhLnRpbWVzY2FsZVxuICAgIG1ldGEuYXZjYyA9IG5ldyBVaW50OEFycmF5KGRhdGEubGVuZ3RoKVxuICAgIG1ldGEuYXZjYy5zZXQoZGF0YSlcbiAgICB0cmFjay5tZXRhID0gbWV0YVxuICB9XG5cbiAgLyoqXG4gICAqIGNob29zZSBhdWRpbyBzYW1wbGUgcmF0ZVxuICAgKiBAcGFyYW0gc2FtcGxpbmdGcmVxdWVuY3lJbmRleFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3N3aXRjaEF1ZGlvU2FtcGxlUmF0ZSAoc2FtcGxpbmdGcmVxdWVuY3lJbmRleCkge1xuICAgIGxldCBzYW1wbGluZ0ZyZXF1ZW5jeUxpc3QgPSBbOTYwMDAsIDg4MjAwLCA2NDAwMCwgNDgwMDAsIDQ0MTAwLCAzMjAwMCwgMjQwMDAsIDIyMDUwLCAxNjAwMCwgMTIwMDAsIDExMDI1LCA4MDAwLCA3MzUwXVxuICAgIHJldHVybiBzYW1wbGluZ0ZyZXF1ZW5jeUxpc3Rbc2FtcGxpbmdGcmVxdWVuY3lJbmRleF1cbiAgfVxuXG4gIC8qKlxuICAgKiBjaG9vc2UgYXVkaW8gc2FtcGxpbmcgZnJlcXVlbmNlXG4gICAqIEBwYXJhbSBpbmZvXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfc3dpdGNoQXVkaW9TYW1wbGluZ0ZyZXF1ZW5jeSAoaW5mbykge1xuICAgIGxldCBzYW1wbGluZ0ZyZXF1ZW5jeUluZGV4ID0gKGluZm8gJiAxMikgPj4+IDJcbiAgICBsZXQgc2FtcGxpbmdGcmVxdWVuY3lMaXN0ID0gWzU1MDAsIDExMDI1LCAyMjA1MCwgNDQxMDAsIDQ4MDAwXVxuICAgIHJldHVybiBzYW1wbGluZ0ZyZXF1ZW5jeUxpc3Rbc2FtcGxpbmdGcmVxdWVuY3lJbmRleF1cbiAgfVxuXG4gIC8qKlxuICAgKiBjaG9vc2UgYXVkaW8gY2hhbm5lbCBjb3VudFxuICAgKiBAcGFyYW0gaW5mb1xuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX3N3aXRjaEF1ZGlvQ2hhbm5lbCAoaW5mbykge1xuICAgIGxldCBzYW1wbGVUcmFja051bUluZGV4ID0gaW5mbyAmIDFcbiAgICBsZXQgc2FtcGxlVHJhY2tOdW1MaXN0ID0gWzEsIDJdXG4gICAgcmV0dXJuIHNhbXBsZVRyYWNrTnVtTGlzdFtzYW1wbGVUcmFja051bUluZGV4XVxuICB9XG5cbiAgLyoqXG4gICAqIGNoZWNrIGRhdGFzaXplIGlzIHZhbGlkIHVzZSA0IEJ5dGUgYWZ0ZXIgY3VycmVudCB0YWdcbiAgICogQHBhcmFtIGRhdGFzaXplXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2RhdGFzaXplVmFsaWRhdG9yIChkYXRhc2l6ZSkge1xuICAgIGxldCBkYXRhc2l6ZUNvbmZpcm0gPSB0aGlzLmxvYWRlckJ1ZmZlci50b0ludCgwLCA0KVxuICAgIHRoaXMubG9hZGVyQnVmZmVyLnNoaWZ0KDQpXG4gICAgcmV0dXJuIGRhdGFzaXplQ29uZmlybSA9PT0gZGF0YXNpemUgKyAxMVxuICB9XG5cbiAgZ2V0IGxvYWRlckJ1ZmZlciAoKSB7XG4gICAgY29uc3QgYnVmZmVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnTE9BREVSX0JVRkZFUicpXG4gICAgaWYgKGJ1ZmZlcikge1xuICAgICAgcmV0dXJuIGJ1ZmZlclxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCBuZXcgRXJyb3IoJ+aJvuS4jeWIsCBsb2FkZXJCdWZmZXIg5a6e5L6LJykpXG4gICAgfVxuICB9XG5cbiAgZ2V0IHRyYWNrcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpXG4gIH1cblxuICBnZXQgbG9nZ2VyICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnTE9HR0VSJylcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBGbHZEZW11eGVyXG4iLCIvKipcbiAqIFJlZmVyZW5jZTogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzgyMTYjc2VjdGlvbi00LjNcbiAqL1xuY2xhc3MgTTNVOFBhcnNlciB7XG4gIHN0YXRpYyBwYXJzZSAodGV4dCwgYmFzZXVybCA9ICcnKSB7XG4gICAgbGV0IHJldCA9IHtcbiAgICAgIGR1cmF0aW9uOiAwXG4gICAgfTtcbiAgICBpZiAoIXRleHQgfHwgIXRleHQuc3BsaXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHJlZnMgPSB0ZXh0LnNwbGl0KC9cXHJ8XFxuLyk7XG4gICAgcmVmcyA9IHJlZnMuZmlsdGVyKChyZWYpID0+IHtcbiAgICAgIHJldHVybiByZWY7XG4gICAgfSlcbiAgICBsZXQgcmVmID0gcmVmcy5zaGlmdCgpXG4gICAgaWYgKCFyZWYubWF0Y2goJyNFWFRNM1UnKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIG0zdTggZmlsZTogbm90IFwiI0VYVE0zVVwiYCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmVmID0gcmVmcy5zaGlmdCgpO1xuICAgIGxldCBuZXh0RGlzY29udGludWUgPSBmYWxzZTtcbiAgICB3aGlsZSAocmVmKSB7XG4gICAgICBsZXQgcmVmbSA9IHJlZi5tYXRjaCgvIyguW0EtWnwtXSopOiguKikvKTtcbiAgICAgIGxldCByZWZkID0gcmVmLm1hdGNoKC8jKC5bQS1afC1dKikvKTtcbiAgICAgIGlmIChyZWZkICYmIHJlZm0gJiYgcmVmbS5sZW5ndGggPiAyKSB7XG4gICAgICAgIHN3aXRjaCAocmVmbVsxXSkge1xuICAgICAgICAgIGNhc2UgJ0VYVC1YLVZFUlNJT04nOlxuICAgICAgICAgICAgcmV0LnZlcnNpb24gPSBwYXJzZUludChyZWZtWzJdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ0VYVC1YLU1FRElBLVNFUVVFTkNFJzpcbiAgICAgICAgICAgIHJldC5zZXF1ZW5jZSA9IHBhcnNlSW50KHJlZm1bMl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnRVhULVgtVEFSR0VURFVSQVRJT04nOlxuICAgICAgICAgICAgcmV0LnRhcmdldGR1cmF0aW9uID0gcGFyc2VGbG9hdChyZWZtWzJdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ0VYVElORic6XG4gICAgICAgICAgICBNM1U4UGFyc2VyLnBhcnNlRnJhZyhyZWZtLCByZWZzLCByZXQsIGJhc2V1cmwsIG5leHREaXNjb250aW51ZSk7XG4gICAgICAgICAgICBuZXh0RGlzY29udGludWUgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ0VYVC1YLUtFWSc6XG4gICAgICAgICAgICBNM1U4UGFyc2VyLnBhcnNlRGVjcnlwdChyZWZtWzJdLHJldCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0gaWYgKHJlZmQgJiYgcmVmZC5sZW5ndGggPiAxKSB7XG4gICAgICAgIHN3aXRjaCAocmVmZFsxXSkge1xuICAgICAgICAgIGNhc2UgJ0VYVC1YLURJU0NPTlRJTlVJVFknOlxuICAgICAgICAgICAgbmV4dERpc2NvbnRpbnVlID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmVmID0gcmVmcy5zaGlmdCgpXG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBzdGF0aWMgcGFyc2VGcmFnIChyZWZtLCByZWZzLCByZXQsIGJhc2V1cmwsIGRpc2NvbnRpbnVlKSB7XG4gICAgaWYgKCFyZXQuZnJhZ3MpIHtcbiAgICAgIHJldC5mcmFncyA9IFtdXG4gICAgfVxuXG4gICAgbGV0IGZyZWcgPSB7XG4gICAgICBzdGFydDogcmV0LmR1cmF0aW9uLFxuICAgICAgZHVyYXRpb246IHBhcnNlRmxvYXQocmVmbVsyXSkgKiAxMDAwXG4gICAgfVxuXG4gICAgcmV0LmR1cmF0aW9uICs9IGZyZWcuZHVyYXRpb247XG4gICAgbGV0IG5leHRsaW5lID0gcmVmcy5zaGlmdCgpO1xuICAgIGlmIChuZXh0bGluZS5tYXRjaCgvIyguKik6KC4qKS8pKSB7XG4gICAgICBuZXh0bGluZSA9IHJlZnMuc2hpZnQoKTtcbiAgICB9XG4gICAgaWYgKG5leHRsaW5lLmxlbmd0aCA+IDAgJiYgbmV4dGxpbmUuY2hhckF0KDApID09PSAnLycgJiYgYmFzZXVybC5tYXRjaCgvLipcXC9cXC8uKlxcLlxcdysvZykpIHtcbiAgICAgIGJhc2V1cmwgPSBiYXNldXJsLm1hdGNoKC8uKlxcL1xcLy4qXFwuXFx3Ky9nKVswXTtcbiAgICB9XG4gICAgaWYgKG5leHRsaW5lLm1hdGNoKC8uKjpcXC9cXC8uKi8pKSB7XG4gICAgICBmcmVnLnVybCA9IG5leHRsaW5lO1xuICAgIH0gZWxzZSB7XG4gICAgICBmcmVnLnVybCA9IGJhc2V1cmwgKyBuZXh0bGluZTtcbiAgICB9XG4gICAgZnJlZy5kaXNjb250aW51ZSA9IGRpc2NvbnRpbnVlO1xuICAgIHJldC5mcmFncy5wdXNoKGZyZWcpO1xuICB9XG5cbiAgc3RhdGljIHBhcnNlVVJMICh1cmwpIHtcbiAgICBsZXQgYmFzZXVybCA9ICcnO1xuICAgIGxldCB1cmxzID0gdXJsLm1hdGNoKC8oLipcXC8pLipcXC5tM3U4Lyk7XG4gICAgaWYgKHVybHMgJiYgdXJscy5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHVybHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHVybHNbaV0ubWF0Y2goLy4qXFwvJC9nKSAmJiB1cmxzW2ldLmxlbmd0aCA+IGJhc2V1cmwubGVuZ3RoKSB7XG4gICAgICAgICAgYmFzZXVybCA9IHVybHNbaV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGJhc2V1cmw7XG4gIH1cblxuICBzdGF0aWMgcGFyc2VEZWNyeXB0KHJlZm0sIHJldCkge1xuICAgIHJldC5lbmNyeXB0ID0ge307XG4gICAgbGV0IHJlZnMgPSByZWZtLnNwbGl0KCcsJyk7XG4gICAgZm9yIChsZXQgaSBpbiByZWZzKSB7IFxuICAgICAgbGV0IGNtZCA9IHJlZnNbaV07XG4gICAgICBpZihjbWQubWF0Y2goL01FVEhPRD0oLiopLykpIHtcbiAgICAgICAgcmV0LmVuY3J5cHQubWV0aG9kID0gY21kLm1hdGNoKC9NRVRIT0Q9KC4qKS8pWzFdO1xuICAgICAgfVxuICAgICAgaWYoY21kLm1hdGNoKC9VUkk9XCIoLiopXCIvKSkge1xuICAgICAgICByZXQuZW5jcnlwdC51cmkgPSBjbWQubWF0Y2goL1VSST1cIiguKilcIi8pWzFdO1xuICAgICAgfVxuXG4gICAgICBpZihjbWQubWF0Y2goL0lWPTB4KC4qKS8pKSB7XG4gICAgICAgIGxldCBpdiA9IGNtZC5tYXRjaCgvSVY9MHgoLiopLylbMV07XG4gICAgICAgIGxldCBsZW5ndGggPSBNYXRoLmNlaWwoaXYubGVuZ3RoIC8gMik7XG4gICAgICAgIHJldC5lbmNyeXB0Lml2YiA9IG5ldyBVaW50OEFycmF5KGxlbmd0aCk7XG4gICAgICAgIGZvcihsZXQgaSA9IGxlbmd0aCAtIDE7IGkgPj0wOyBpLS0pIHtcbiAgICAgICAgICBsZXQgaW0gPSBwYXJzZUludChpdi5zdWJzdHIoaSAqIDIsIDIpLCAxNik7XG4gICAgICAgICAgcmV0LmVuY3J5cHQuaXZiW2ldID0gaW07XG4gICAgICAgIH0gXG4gICAgICAgIHJldC5lbmNyeXB0Lml2ID0gaXY7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNM1U4UGFyc2VyO1xuIiwiaW1wb3J0IHsgTmFsdW5pdCB9IGZyb20gJ3hncGxheWVyLWNvZGVjJztcbmltcG9ydCB7IEF1ZGlvVHJhY2ssIFZpZGVvVHJhY2sgfSBmcm9tICd4Z3BsYXllci1idWZmZXInO1xuaW1wb3J0IHtcbiAgQXVkaW9UcmFja01ldGEsXG4gIFZpZGVvVHJhY2tNZXRhLFxuICBBdWRpb1RyYWNrU2FtcGxlLFxuICBWaWRlb1RyYWNrU2FtcGxlLFxuICBFVkVOVFMsXG4gIFN0cmVhbVxufSBmcm9tICd4Z3BsYXllci11dGlscyc7XG5cbmNvbnN0IERFTVVYX0VWRU5UUyA9IEVWRU5UUy5ERU1VWF9FVkVOVFM7XG5jb25zdCBTdHJlYW1UeXBlID0ge1xuICAweDAxOiBbJ3ZpZGVvJywgJ01QRUctMSddLFxuICAweDAyOiBbJ3ZpZGVvJywgJ01QRUctMiddLFxuICAweDFiOiBbJ3ZpZGVvJywgJ0FWQy5IMjY0J10sXG4gIDB4ZWE6IFsndmlkZW8nLCAnVkMtMSddLFxuICAweDAzOiBbJ2F1ZGlvJywgJ01QRUctMSddLFxuICAweDA0OiBbJ2F1ZGlvJywgJ01QRUctMiddLFxuICAweDBmOiBbJ2F1ZGlvJywgJ01QRUctMi5BQUMnXSxcbiAgMHgxMTogWydhdWRpbycsICdNUEVHLTQuQUFDJ10sXG4gIDB4ODA6IFsnYXVkaW8nLCAnTFBDTSddLFxuICAweDgxOiBbJ2F1ZGlvJywgJ0FDMyddLFxuICAweDA2OiBbJ2F1ZGlvJywgJ0FDMyddLFxuICAweDgyOiBbJ2F1ZGlvJywgJ0RUUyddLFxuICAweDgzOiBbJ2F1ZGlvJywgJ0RvbGJ5IFRydWVIRCddLFxuICAweDg0OiBbJ2F1ZGlvJywgJ0FDMy1QbHVzJ10sXG4gIDB4ODU6IFsnYXVkaW8nLCAnRFRTLUhEJ10sXG4gIDB4ODY6IFsnYXVkaW8nLCAnRFRTLU1BJ10sXG4gIDB4YTE6IFsnYXVkaW8nLCAnQUMzLVBsdXMtU0VDJ10sXG4gIDB4YTI6IFsnYXVkaW8nLCAnRFRTLUhELVNFQyddXG59O1xuXG5jbGFzcyBUc0RlbXV4ZXIge1xuICBjb25zdHJ1Y3RvciAoY29uZmlncykge1xuICAgIHRoaXMuY29uZmlncyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZ3MpO1xuICAgIHRoaXMuZGVtdXhpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnBhdCA9IFtdO1xuICAgIHRoaXMucG10ID0gW107XG4gICAgdGhpcy5faGFzVmlkZW9NZXRhID0gZmFsc2U7XG4gICAgdGhpcy5faGFzQXVkaW9NZXRhID0gZmFsc2U7XG4gIH1cblxuICBpbml0ICgpIHtcbiAgICB0aGlzLm9uKERFTVVYX0VWRU5UUy5ERU1VWF9TVEFSVCwgdGhpcy5kZW11eC5iaW5kKHRoaXMpKVxuICB9XG5cbiAgZGVtdXggKGZyYWcpIHtcbiAgICBpZiAodGhpcy5kZW11eGluZykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IGJ1ZmZlciA9IHRoaXMuaW5wdXRCdWZmZXI7XG4gICAgbGV0IGZyYWdzID0geyBwYXQ6IFtdLCBwbXQ6IFtdIH07XG4gICAgbGV0IHBlc2VzID0ge307XG5cbiAgICAvLyBSZWFkIFRTIHNlZ21lbnRcbiAgICB3aGlsZSAoYnVmZmVyLmxlbmd0aCA+PSAxODgpIHtcbiAgICAgIGlmIChidWZmZXIubGVuZ3RoID49IDEgJiYgYnVmZmVyLmFycmF5WzBdW2J1ZmZlci5vZmZzZXRdICE9PSA3MSkge1xuICAgICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCB0aGlzLlRBRywgbmV3IEVycm9yKGBVbnRydXN0IHN5bmMgY29kZTogJHtidWZmZXIuYXJyYXlbMF1bYnVmZmVyLm9mZnNldF19LCB0cnkgdG8gcmVjb3ZlcjtgKSwgZmFsc2UpO1xuICAgICAgfVxuICAgICAgd2hpbGUgKGJ1ZmZlci5sZW5ndGggPj0gMSAmJiBidWZmZXIuYXJyYXlbMF1bYnVmZmVyLm9mZnNldF0gIT09IDcxKSB7XG4gICAgICAgIGJ1ZmZlci5zaGlmdCgxKTtcbiAgICAgIH1cbiAgICAgIGxldCBidWYgPSBidWZmZXIuc2hpZnQoMTg4KTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGJ1Zik7XG4gICAgICBsZXQgdHNTdHJlYW0gPSBuZXcgU3RyZWFtKGJ1Zi5idWZmZXIpO1xuICAgICAgbGV0IHRzID0ge307XG4gICAgICBUc0RlbXV4ZXIucmVhZCh0c1N0cmVhbSwgdHMsIGZyYWdzKTtcbiAgICAgIGlmICh0cy5wZXMpIHtcbiAgICAgICAgaWYgKCFwZXNlc1t0cy5oZWFkZXIucGlkXSkge1xuICAgICAgICAgIHBlc2VzW3RzLmhlYWRlci5waWRdID0gW107XG4gICAgICAgIH1cbiAgICAgICAgcGVzZXNbdHMuaGVhZGVyLnBpZF0ucHVzaCh0cy5wZXMpO1xuICAgICAgICB0cy5wZXMuRVMuYnVmZmVyID0gW3RzLnBlcy5FUy5idWZmZXJdO1xuICAgICAgfSBlbHNlIGlmIChwZXNlc1t0cy5oZWFkZXIucGlkXSkge1xuICAgICAgICBwZXNlc1t0cy5oZWFkZXIucGlkXVtwZXNlc1t0cy5oZWFkZXIucGlkXS5sZW5ndGggLSAxXS5FUy5idWZmZXIucHVzaCh0cy5wYXlsb2FkLnN0cmVhbSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IEF1ZGlvT3B0aW9ucyA9IGZyYWc7XG4gICAgbGV0IFZpZGVvT3B0aW9ucyA9IGZyYWc7XG5cbiAgICAvLyBHZXQgRnJhbWVzIGRhdGFcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE9iamVjdC5rZXlzKHBlc2VzKS5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGVwZXNlcyA9IHBlc2VzW09iamVjdC5rZXlzKHBlc2VzKVtpXV07XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGVwZXNlcy5sZW5ndGg7IGorKykge1xuICAgICAgICBlcGVzZXNbal0uaWQgPSBPYmplY3Qua2V5cyhwZXNlcylbaV07XG4gICAgICAgIGVwZXNlc1tqXS5FUy5idWZmZXIgPSBUc0RlbXV4ZXIuTWVyZ2UoZXBlc2VzW2pdLkVTLmJ1ZmZlcik7XG4gICAgICAgIGlmIChlcGVzZXNbal0udHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgICAgIHRoaXMucHVzaEF1ZGlvU2FtcGxlKGVwZXNlc1tqXSwgQXVkaW9PcHRpb25zKTtcbiAgICAgICAgICBBdWRpb09wdGlvbnMgPSB7fTtcbiAgICAgICAgfSBlbHNlIGlmIChlcGVzZXNbal0udHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgIHRoaXMucHVzaFZpZGVvU2FtcGxlKGVwZXNlc1tqXSwgVmlkZW9PcHRpb25zKTtcbiAgICAgICAgICBWaWRlb09wdGlvbnMgPSB7fTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9oYXNBdWRpb01ldGEpIHtcbiAgICAgIHRoaXMuZW1pdChERU1VWF9FVkVOVFMuREVNVVhfQ09NUExFVEUsICdhdWRpbycpO1xuICAgIH1cbiAgICBpZiAodGhpcy5faGFzVmlkZW9NZXRhKSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0NPTVBMRVRFLCAndmlkZW8nKTtcbiAgICB9XG4gIH1cblxuICBwdXNoQXVkaW9TYW1wbGUgKHBlcywgb3B0aW9ucykge1xuICAgIGxldCB0cmFjaztcbiAgICBpZiAoIXRoaXMuX3RyYWNrcy5hdWRpb1RyYWNrKSB7XG4gICAgICB0aGlzLl90cmFja3MuYXVkaW9UcmFjayA9IG5ldyBBdWRpb1RyYWNrKCk7XG4gICAgICB0cmFjayA9IHRoaXMuX3RyYWNrcy5hdWRpb1RyYWNrO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cmFjayA9IHRoaXMuX3RyYWNrcy5hdWRpb1RyYWNrO1xuICAgIH1cbiAgICBsZXQgbWV0YSA9IG5ldyBBdWRpb1RyYWNrTWV0YSh7XG4gICAgICBhdWRpb1NhbXBsZVJhdGU6IHBlcy5FUy5mcmVxdWVuY2UsXG4gICAgICBzYW1wbGVSYXRlOiBwZXMuRVMuZnJlcXVlbmNlLFxuICAgICAgY2hhbm5lbENvdW50OiBwZXMuRVMuY2hhbm5lbCxcbiAgICAgIGNvZGVjOiAnbXA0YS40MC4nICsgcGVzLkVTLmF1ZGlvT2JqZWN0VHlwZSxcbiAgICAgIGNvbmZpZzogcGVzLkVTLmF1ZGlvQ29uZmlnLFxuICAgICAgaWQ6IDIsXG4gICAgICBzYW1wbGVSYXRlSW5kZXg6IHBlcy5FUy5mcmVxdWVuY3lJbmRleFxuICAgIH0pO1xuICAgIG1ldGEucmVmU2FtcGxlRHVyYXRpb24gPSBNYXRoLmZsb29yKDEwMjQgLyBtZXRhLmF1ZGlvU2FtcGxlUmF0ZSAqIG1ldGEudGltZXNjYWxlKTtcblxuICAgIGxldCBtZXRhRXF1YWwgPSBUc0RlbXV4ZXIuY29tcGFpcmVNZXRhKHRyYWNrLm1ldGEsIG1ldGEsIHRydWUpO1xuXG4gICAgaWYgKCF0aGlzLl9oYXNBdWRpb01ldGEgfHwgIW1ldGFFcXVhbCkge1xuICAgICAgdHJhY2subWV0YSA9IG1ldGE7XG4gICAgICB0aGlzLl9oYXNBdWRpb01ldGEgPSB0cnVlXG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLk1FVEFEQVRBX1BBUlNFRCwgJ2F1ZGlvJyk7XG4gICAgfVxuXG4gICAgbGV0IGRhdGEgPSBuZXcgVWludDhBcnJheShwZXMuRVMuYnVmZmVyLmJ1ZmZlci5zbGljZShwZXMuRVMuYnVmZmVyLnBvc2l0aW9uLCBwZXMuRVMuYnVmZmVyLmxlbmd0aCkpO1xuICAgIGxldCBkdHMgPSBwYXJzZUludChwZXMucHRzIC8gOTApO1xuICAgIGxldCBwdHMgPSBwYXJzZUludChwZXMucHRzIC8gOTApO1xuICAgIGxldCBzYW1wbGUgPSBuZXcgQXVkaW9UcmFja1NhbXBsZSh7ZHRzLCBwdHMsIGRhdGEsIG9wdGlvbnN9KTtcbiAgICB0cmFjay5zYW1wbGVzLnB1c2goc2FtcGxlKTtcbiAgfVxuXG4gIHB1c2hWaWRlb1NhbXBsZSAocGVzLCBvcHRpb25zKSB7XG4gICAgbGV0IG5hbHMgPSBOYWx1bml0LmdldE5hbHVuaXRzKHBlcy5FUy5idWZmZXIpO1xuICAgIGxldCB0cmFjaztcbiAgICBsZXQgbWV0YSA9IG5ldyBWaWRlb1RyYWNrTWV0YSgpO1xuICAgIGlmICghdGhpcy5fdHJhY2tzLnZpZGVvVHJhY2spIHtcbiAgICAgIHRoaXMuX3RyYWNrcy52aWRlb1RyYWNrID0gbmV3IFZpZGVvVHJhY2soKTtcbiAgICAgIHRyYWNrID0gdGhpcy5fdHJhY2tzLnZpZGVvVHJhY2s7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYWNrID0gdGhpcy5fdHJhY2tzLnZpZGVvVHJhY2s7XG4gICAgfVxuICAgIGxldCBzYW1wbGVMZW5ndGggPSAwO1xuICAgIGxldCBzcHMgPSBmYWxzZTtcbiAgICBsZXQgcHBzID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuYWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgbmFsID0gbmFsc1tpXTtcbiAgICAgIGlmIChuYWwuc3BzKSB7XG4gICAgICAgIHNwcyA9IG5hbDtcbiAgICAgICAgdHJhY2suc3BzID0gbmFsLmJvZHk7XG4gICAgICAgIG1ldGEuY2hyb21hRm9ybWF0ID0gc3BzLnNwcy5jaHJvbWFfZm9ybWF0XG4gICAgICAgIG1ldGEuY29kZWMgPSAnYXZjMS4nO1xuICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IDQ7IGorKykge1xuICAgICAgICAgIHZhciBoID0gc3BzLmJvZHlbal0udG9TdHJpbmcoMTYpO1xuICAgICAgICAgIGlmIChoLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIGggPSAnMCcgKyBoO1xuICAgICAgICAgIH1cbiAgICAgICAgICBtZXRhLmNvZGVjICs9IGg7XG4gICAgICAgIH1cbiAgICAgICAgbWV0YS5jb2RlY0hlaWdodCA9IHNwcy5zcHMuY29kZWNfc2l6ZS5oZWlnaHQ7XG4gICAgICAgIG1ldGEuY29kZWNXaWR0aCA9IHNwcy5zcHMuY29kZWNfc2l6ZS53aWR0aDtcbiAgICAgICAgbWV0YS5mcmFtZVJhdGUgPSBzcHMuc3BzLmZyYW1lX3JhdGU7XG4gICAgICAgIG1ldGEuaWQgPSAxO1xuICAgICAgICBtZXRhLmxldmVsID0gc3BzLnNwcy5sZXZlbF9zdHJpbmc7XG4gICAgICAgIG1ldGEucHJlc2VudEhlaWdodCA9IHNwcy5zcHMucHJlc2VudF9zaXplLmhlaWdodDtcbiAgICAgICAgbWV0YS5wcmVzZW50V2lkdGggPSBzcHMuc3BzLnByZXNlbnRfc2l6ZS53aWR0aDtcbiAgICAgICAgbWV0YS5wcm9maWxlID0gc3BzLnNwcy5wcm9maWxlX3N0cmluZztcbiAgICAgICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA9IE1hdGguZmxvb3IobWV0YS50aW1lc2NhbGUgKiAoc3BzLnNwcy5mcmFtZV9yYXRlLmZwc19kZW4gLyBzcHMuc3BzLmZyYW1lX3JhdGUuZnBzX251bSkpO1xuICAgICAgICBtZXRhLnNhclJhdGlvID0gc3BzLnNwcy5zYXJfcmF0aW8gPyBzcHMuc3BzLnNhcl9yYXRpbyA6IHNwcy5zcHMucGFyX3JhdGlvO1xuICAgICAgfSBlbHNlIGlmIChuYWwucHBzKSB7XG4gICAgICAgIHRyYWNrLnBwcyA9IG5hbC5ib2R5O1xuICAgICAgICBwcHMgPSBuYWw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzYW1wbGVMZW5ndGggKz0gKDQgKyBuYWwuYm9keS5ieXRlTGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3BzICYmIHBwcykge1xuICAgICAgbWV0YS5hdmNjID0gTmFsdW5pdC5nZXRBdmNjKHNwcy5ib2R5LCBwcHMuYm9keSk7XG4gICAgICBsZXQgbWV0YUVxdWFsID0gVHNEZW11eGVyLmNvbXBhaXJlTWV0YSh0cmFjay5tZXRhLCBtZXRhLCB0cnVlKTtcbiAgICAgIGlmICghdGhpcy5faGFzVmlkZW9NZXRhIHx8ICFtZXRhRXF1YWwpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMpIHtcbiAgICAgICAgICBvcHRpb25zLm1ldGEgPSBPYmplY3QuYXNzaWduKHt9LCBtZXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgbWV0YTogT2JqZWN0LmFzc2lnbih7fSwgbWV0YSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdHJhY2subWV0YSA9IG1ldGE7XG4gICAgICAgIHRoaXMuX2hhc1ZpZGVvTWV0YSA9IHRydWVcbiAgICAgICAgdGhpcy5lbWl0KERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsICd2aWRlbycpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBkYXRhID0gbmV3IFVpbnQ4QXJyYXkoc2FtcGxlTGVuZ3RoKTtcbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICBsZXQgaXNLZXlmcmFtZSA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmFscy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IG5hbCA9IG5hbHNbaV07XG4gICAgICBsZXQgbGVuZ3RoID0gbmFsLmJvZHkuYnl0ZUxlbmd0aDtcbiAgICAgIGlmIChuYWwuaWRyKSB7XG4gICAgICAgIGlzS2V5ZnJhbWUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKCFuYWwucHBzICYmICFuYWwuc3BzKSB7XG4gICAgICAgIGRhdGEuc2V0KG5ldyBVaW50OEFycmF5KFtsZW5ndGggPj4+IDI0ICYgMHhmZixcbiAgICAgICAgICBsZW5ndGggPj4+IDE2ICYgMHhmZixcbiAgICAgICAgICBsZW5ndGggPj4+IDggJiAweGZmLFxuICAgICAgICAgIGxlbmd0aCAmIDB4ZmZcbiAgICAgICAgXSksIG9mZnNldCk7XG4gICAgICAgIG9mZnNldCArPSA0O1xuICAgICAgICBkYXRhLnNldChuYWwuYm9keSwgb2Zmc2V0KTtcbiAgICAgICAgb2Zmc2V0ICs9IGxlbmd0aDtcbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IHNhbXBsZSA9IG5ldyBWaWRlb1RyYWNrU2FtcGxlKHtcbiAgICAgIGR0czogcGFyc2VJbnQocGVzLmR0cyAvIDkwKSxcbiAgICAgIHB0czogcGFyc2VJbnQocGVzLnB0cyAvIDkwKSxcbiAgICAgIGN0czogKHBlcy5wdHMgLSBwZXMuZHRzKSAvIDkwLFxuICAgICAgb3JpZ2luRHRzOiBwZXMuZHRzLFxuICAgICAgaXNLZXlmcmFtZSxcbiAgICAgIGRhdGEsXG4gICAgICBvcHRpb25zXG4gICAgfSlcbiAgICB0cmFjay5zYW1wbGVzLnB1c2goc2FtcGxlKTtcbiAgfVxuXG4gIGRlc3RvcnkgKCkge1xuICAgIHRoaXMub2ZmKERFTVVYX0VWRU5UUy5ERU1VWF9TVEFSVCwgdGhpcy5kZW11eCk7XG4gICAgdGhpcy5jb25maWdzID0ge307XG4gICAgdGhpcy5kZW11eGluZyA9IGZhbHNlO1xuICAgIHRoaXMucGF0ID0gW107XG4gICAgdGhpcy5wbXQgPSBbXTtcbiAgICB0aGlzLl9oYXNWaWRlb01ldGEgPSBmYWxzZTtcbiAgICB0aGlzLl9oYXNBdWRpb01ldGEgPSBmYWxzZTtcbiAgfVxuXG4gIHN0YXRpYyBjb21wYWlyZUFycmF5IChhLCBiLCB0eXBlKSB7XG4gICAgbGV0IGFsID0gMDtcbiAgICBsZXQgYmwgPSAwO1xuICAgIGlmICh0eXBlID09PSAnVWludDhBcnJheScpIHtcbiAgICAgIGFsID0gYS5ieXRlTGVuZ3RoO1xuICAgICAgYmwgPSBiLmJ5dGVMZW5ndGg7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnQXJyYXknKSB7XG4gICAgICBhbCA9IGEubGVuZ3RoO1xuICAgICAgYmwgPSBiLmxlbmd0aDtcbiAgICB9XG4gICAgaWYgKGFsICE9PSBibCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWw7IGkrKykge1xuICAgICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN0YXRpYyBjb21wYWlyZU1ldGEgKGEsIGIsIGlnbm9yZUR1cmF0aW9uKSB7XG4gICAgaWYgKCFhIHx8ICFiKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDAsIGsgPSBPYmplY3Qua2V5cyhhKS5sZW5ndGg7IGkgPCBrOyBpKyspIHtcbiAgICAgIGxldCBpdGVtYSA9IGFbT2JqZWN0LmtleXMoYSlbaV1dO1xuICAgICAgbGV0IGl0ZW1iID0gYltPYmplY3Qua2V5cyhhKVtpXV07XG4gICAgICBpZiAodHlwZW9mIGl0ZW1hICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAoKGlnbm9yZUR1cmF0aW9uICYmIE9iamVjdC5rZXlzKGEpW2ldICE9PSAnZHVyYXRpb24nICYmIE9iamVjdC5rZXlzKGEpW2ldICE9PSAncmVmU2FtcGxlRHVyYXRpb24nICYmIE9iamVjdC5rZXlzKGEpW2ldICE9PSAncmVmU2FtcGxlRHVyYXRpb25GaXhlZCcpICYmIGl0ZW1hICE9PSBpdGVtYikge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpdGVtYS5ieXRlTGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGl0ZW1iLmJ5dGVMZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIVRzRGVtdXhlci5jb21wYWlyZUFycmF5KGl0ZW1hLCBpdGVtYiwgJ1VpbnQ4QXJyYXknKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpdGVtYS5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoaXRlbWIubGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFUc0RlbXV4ZXIuY29tcGFpcmVBcnJheShpdGVtYSwgaXRlbWIsICdBcnJheScpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIVRzRGVtdXhlci5jb21wYWlyZU1ldGEoaXRlbWEsIGl0ZW1iKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHN0YXRpYyBNZXJnZSAoYnVmZmVycykge1xuICAgIGxldCBkYXRhO1xuICAgIGxldCBsZW5ndGggPSAwO1xuICAgIGxldCBvZmZzZXQgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnVmZmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgbGVuZ3RoICs9IChidWZmZXJzW2ldLmxlbmd0aCAtIGJ1ZmZlcnNbaV0ucG9zaXRpb24pO1xuICAgIH1cblxuICAgIGRhdGEgPSBuZXcgVWludDhBcnJheShsZW5ndGgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnVmZmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGJ1ZmZlciA9IGJ1ZmZlcnNbaV07XG4gICAgICBkYXRhLnNldChuZXcgVWludDhBcnJheShidWZmZXIuYnVmZmVyLCBidWZmZXIucG9zaXRpb24pLCBvZmZzZXQpO1xuICAgICAgb2Zmc2V0ICs9IGJ1ZmZlci5sZW5ndGggLSBidWZmZXIucG9zaXRpb247XG4gICAgfVxuICAgIHJldHVybiBuZXcgU3RyZWFtKGRhdGEuYnVmZmVyKTtcbiAgfVxuXG4gIHN0YXRpYyByZWFkIChzdHJlYW0sIHRzLCBmcmFncykge1xuICAgIFRzRGVtdXhlci5yZWFkSGVhZGVyKHN0cmVhbSwgdHMpO1xuICAgIFRzRGVtdXhlci5yZWFkUGF5bG9hZChzdHJlYW0sIHRzLCBmcmFncyk7XG4gICAgaWYgKHRzLmhlYWRlci5wYWNrZXQgPT09ICdNRURJQScgJiYgdHMuaGVhZGVyLnBheWxvYWQgPT09IDEgJiYgIXRzLnVua25vd25QSURzKSB7XG4gICAgICB0cy5wZXMgPSBUc0RlbXV4ZXIuUEVTKHRzKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgcmVhZFBheWxvYWQgKHN0cmVhbSwgdHMsIGZyYWdzKSB7XG4gICAgbGV0IGhlYWRlciA9IHRzLmhlYWRlclxuICAgIGxldCBwaWQgPSBoZWFkZXIucGlkO1xuICAgIHN3aXRjaCAocGlkKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIFRzRGVtdXhlci5QQVQoc3RyZWFtLCB0cywgZnJhZ3MpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgVHNEZW11eGVyLkNBVChzdHJlYW0sIHRzLCBmcmFncyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBUc0RlbXV4ZXIuVFNEVChzdHJlYW0sIHRzLCBmcmFncyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAweDFmZmY6XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gVE9ETzogc29tZeeahOWGmeazleS4jeWkquWlve+8jOW+l+aUuVxuICAgICAgICBpZiAoZnJhZ3MucGF0LnNvbWUoKGl0ZW0pID0+IHsgcmV0dXJuIGl0ZW0ucGlkID09PSBwaWQ7IH0pKSB7XG4gICAgICAgICAgVHNEZW11eGVyLlBNVChzdHJlYW0sIHRzLCBmcmFncyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IHN0cyA9IGZyYWdzLnBtdCA/IGZyYWdzLnBtdC5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ucGlkID09PSBwaWQpIDogW107XG4gICAgICAgICAgaWYgKHN0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBUc0RlbXV4ZXIuTWVkaWEoc3RyZWFtLCB0cywgU3RyZWFtVHlwZVtzdHNbMF0uc3RyZWFtVHlwZV1bMF0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRzLnVua25vd25QSURzID0gdHJ1ZTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHJlYWRIZWFkZXIgKHN0cmVhbSwgdHMpIHtcbiAgICBsZXQgaGVhZGVyID0ge307XG4gICAgaGVhZGVyLnN5bmMgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgbGV0IG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgIGhlYWRlci5lcnJvciA9IG5leHQgPj4+IDE1O1xuICAgIGhlYWRlci5wYXlsb2FkID0gbmV4dCA+Pj4gMTQgJiAxO1xuICAgIGhlYWRlci5wcmlvcml0eSA9IG5leHQgPj4+IDEzICYgMTtcbiAgICBoZWFkZXIucGlkID0gbmV4dCAmIDB4MWZmZjtcblxuICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG5cbiAgICBoZWFkZXIuc2NyYW1ibGluZyA9IG5leHQgPj4gNiAmIDB4MzsgLy8g5piv5ZCm5Yqg5a+G77yMMDDooajnpLrkuI3liqDlr4ZcblxuICAgIC8qKlxuICAgICAqIDAwIElTTy9JRUPmnKrmnaXkvb/nlKjkv53nlZlcbiAgICAgKiAwMSDmsqHmnInosIPmlbTlrZfmrrXvvIzku4XlkKvmnIkxODRC5pyJ5pWI5YeA6I23XG4gICAgICogMDIg5rKh5pyJ5pyJ5pWI5YeA6I2377yM5LuF5ZCr5pyJMTgzQuiwg+aVtOWtl+autVxuICAgICAqIDAzIDB+MTgyQuiwg+aVtOWtl+auteWQjuS4uuacieaViOWHgOiNt1xuICAgICAqL1xuICAgIGhlYWRlci5hZGFwdGF0aW9uID0gbmV4dCA+PiA0ICYgMHgzO1xuICAgIGhlYWRlci5jb250aW51aXR5ID0gbmV4dCAmIDE1O1xuICAgIGhlYWRlci5wYWNrZXQgPSBoZWFkZXIucGlkID09PSAwID8gJ1BBVCcgOiAnTUVESUEnO1xuICAgIHRzLmhlYWRlciA9IGhlYWRlcjtcbiAgfVxuXG4gIHN0YXRpYyBQQVQgKHN0cmVhbSwgdHMsIGZyYWdzKSB7XG4gICAgbGV0IHJldCA9IHt9O1xuICAgIGxldCBuZXh0ID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHN0cmVhbS5za2lwKG5leHQpO1xuICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgcmV0LnRhYmVsSUQgPSBuZXh0O1xuICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgIHJldC5lcnJvciA9IG5leHQgPj4+IDc7XG4gICAgcmV0Lnplcm8gPSBuZXh0ID4+PiA2ICYgMTtcbiAgICByZXQuc2VjdGlvbkxlbmd0aCA9IG5leHQgJiAweGZmZjtcbiAgICByZXQuc3RyZWFtSUQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgIHJldC5jdXJyZW50ID0gc3RyZWFtLnJlYWRVaW50OCgpICYgMTtcbiAgICByZXQuc2VjdGlvbk51bWJlciA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICByZXQubGFzdFNlY3Rpb25OdW1iZXIgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgbGV0IE4gPSAocmV0LnNlY3Rpb25MZW5ndGggLSA5KSAvIDQ7XG4gICAgbGV0IGxpc3QgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE47IGkrKykge1xuICAgICAgbGV0IHByb2dyYW1OdW1iZXIgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgICAgbGV0IHBpZCA9IHN0cmVhbS5yZWFkVWludDE2KCkgJiAweDFmZmY7XG4gICAgICBsaXN0LnB1c2goe1xuICAgICAgICBwcm9ncmFtOiBwcm9ncmFtTnVtYmVyLFxuICAgICAgICBwaWQsXG4gICAgICAgIHR5cGU6IHByb2dyYW1OdW1iZXIgPT09IDAgPyAnbmV0d29yaycgOiAnbWFwUElEJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChsaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgIGZyYWdzLnBhdCA9IGZyYWdzLnBhdC5jb25jYXQobGlzdCk7XG4gICAgfVxuICAgIHJldC5saXN0ID0gbGlzdDtcbiAgICByZXQucHJvZ3JhbSA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgcmV0LnBpZCA9IHN0cmVhbS5yZWFkVWludDE2KCkgJiAweDFmZmY7XG4gICAgdHMucGF5bG9hZCA9IHJldDtcbiAgICAvLyBUT0RPIENSQ1xuICB9XG5cbiAgc3RhdGljIFBNVCAoc3RyZWFtLCB0cywgZnJhZ3MpIHtcbiAgICBsZXQgcmV0ID0ge307XG4gICAgbGV0IGhlYWRlciA9IHRzLmhlYWRlcjtcbiAgICBoZWFkZXIucGFja2V0ID0gJ1BNVCc7XG4gICAgbGV0IG5leHQgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgc3RyZWFtLnNraXAobmV4dCk7XG4gICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICByZXQudGFibGVJRCA9IG5leHQ7XG4gICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgcmV0LnNlY3Rpb25MZW5ndGggPSBuZXh0ICYgMHhmZmY7XG4gICAgcmV0LnByb2dyYW0gPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgIHJldC5jdXJyZW50ID0gc3RyZWFtLnJlYWRVaW50OCgpICYgMTtcbiAgICByZXQub3JkZXIgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgcmV0Lmxhc3RPcmRlciA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICByZXQuUENSX1BJRCA9IHN0cmVhbS5yZWFkVWludDE2KCkgJiAweDFmZmY7XG4gICAgcmV0LnByb2dyYW1MZW5ndGggPSBzdHJlYW0ucmVhZFVpbnQxNigpICYgMHhmZmY7XG4gICAgbGV0IE4gPSAocmV0LnNlY3Rpb25MZW5ndGggLSAxMykgLyA1O1xuICAgIGxldCBsaXN0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOOyBpKyspIHtcbiAgICAgIGxpc3QucHVzaCh7XG4gICAgICAgIHN0cmVhbVR5cGU6IHN0cmVhbS5yZWFkVWludDgoKSxcbiAgICAgICAgcGlkOiBzdHJlYW0ucmVhZFVpbnQxNigpICYgMHgxZmZmLCAvLyAweDA3ZTUg6KeG6aKR77yMMHgwN2U2XG4gICAgICAgIGVzOiBzdHJlYW0ucmVhZFVpbnQxNigpICYgMHhmZmZcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXQubGlzdCA9IGxpc3Q7XG4gICAgaWYgKCF0aGlzLnBtdCkge1xuICAgICAgdGhpcy5wbXQgPSBbXTtcbiAgICB9XG4gICAgZnJhZ3MucG10ID0gdGhpcy5wbXQuY29uY2F0KGxpc3QubWFwKChpdGVtKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwaWQ6IGl0ZW0ucGlkLFxuICAgICAgICBlczogaXRlbS5lcyxcbiAgICAgICAgc3RyZWFtVHlwZTogaXRlbS5zdHJlYW1UeXBlLFxuICAgICAgICBwcm9ncmFtOiByZXQucHJvZ3JhbVxuICAgICAgfTtcbiAgICB9KSk7XG4gICAgdHMucGF5bG9hZCA9IHJldDtcbiAgfVxuXG4gIHN0YXRpYyBNZWRpYSAoc3RyZWFtLCB0cywgdHlwZSkge1xuICAgIGxldCBoZWFkZXIgPSB0cy5oZWFkZXI7XG4gICAgbGV0IHBheWxvYWQgPSB7fTtcbiAgICBoZWFkZXIudHlwZSA9IHR5cGU7XG4gICAgaWYgKGhlYWRlci5hZGFwdGF0aW9uID09PSAweDAzKSB7XG4gICAgICBwYXlsb2FkLmFkYXB0YXRpb25MZW5ndGggPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgICBpZiAocGF5bG9hZC5hZGFwdGF0aW9uTGVuZ3RoID4gMCkge1xuICAgICAgICBsZXQgbmV4dCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICAgICAgcGF5bG9hZC5kaXNjb250aW51ZSA9IG5leHQgPj4+IDc7XG4gICAgICAgIHBheWxvYWQuYWNjZXNzID0gbmV4dCA+Pj4gNiAmIDB4MDE7XG4gICAgICAgIHBheWxvYWQucHJpb3JpdHkgPSBuZXh0ID4+PiA1ICYgMHgwMTtcbiAgICAgICAgcGF5bG9hZC5QQ1IgPSBuZXh0ID4+PiA0ICYgMHgwMTtcbiAgICAgICAgcGF5bG9hZC5PUENSID0gbmV4dCA+Pj4gMyAmIDB4MDE7XG4gICAgICAgIHBheWxvYWQuc3BsaWNlUG9pbnQgPSBuZXh0ID4+PiAyICYgMHgwMTtcbiAgICAgICAgcGF5bG9hZC50cmFuc3BvcnRQcml2YXRlID0gbmV4dCA+Pj4gMSAmIDB4MDE7XG4gICAgICAgIHBheWxvYWQuYWRhcHRhdGlvbkZpZWxkID0gbmV4dCAmIDB4MDE7XG4gICAgICAgIGxldCBfc3RhcnQgPSBzdHJlYW0ucG9zaXRpb247XG4gICAgICAgIGlmIChwYXlsb2FkLlBDUiA9PT0gMSkge1xuICAgICAgICAgIHBheWxvYWQucHJvZ3JhbUNsb2NrQmFzZSA9IHN0cmVhbS5yZWFkVWludDMyKCkgPDwgMTtcbiAgICAgICAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBwYXlsb2FkLnByb2dyYW1DbG9ja0Jhc2UgfD0gbmV4dCA+Pj4gMTU7XG4gICAgICAgICAgcGF5bG9hZC5wcm9ncmFtQ2xvY2tFeHRlbnNpb24gPSBuZXh0ICYgMHgxZmY7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBheWxvYWQuT1BDUiA9PT0gMSkge1xuICAgICAgICAgIHBheWxvYWQub3JpZ2luUHJvZ3JhbUNsb2NrQmFzZSA9IHN0cmVhbS5yZWFkVWludDMyKCkgPDwgMTtcbiAgICAgICAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBwYXlsb2FkLm9yaWdpblByb2dyYW1DbG9ja0Jhc2UgKz0gbmV4dCA+Pj4gMTU7XG4gICAgICAgICAgcGF5bG9hZC5vcmlnaW5Qcm9ncmFtQ2xvY2tFeHRlbnNpb24gPSBuZXh0ICYgMHgxZmY7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBheWxvYWQuc3BsaWNlUG9pbnQgPT09IDEpIHtcbiAgICAgICAgICBwYXlsb2FkLnNwbGljZUNvdW50ZG93biA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF5bG9hZC50cmFuc3BvcnRQcml2YXRlID09PSAxKSB7XG4gICAgICAgICAgbGV0IGxlbmd0aCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICAgICAgICBsZXQgdHJhbnNwb3J0UHJpdmF0ZURhdGEgPSBbXTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0cmFuc3BvcnRQcml2YXRlRGF0YS5wdXNoKHN0cmVhbS5yZWFkVWludDgoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChwYXlsb2FkLmFkYXB0YXRpb25GaWVsZCA9PT0gMSkge1xuICAgICAgICAgIGxldCBsZW5ndGggPSBzdHJlYW0ucmVhZFVpbnQ4KClcbiAgICAgICAgICBsZXQgbmV4dCA9IHN0cmVhbS5yZWFkVWludDgoKVxuICAgICAgICAgIGxldCBzdGFydCA9IHN0cmVhbS5wb3NpdGlvbjtcbiAgICAgICAgICBsZXQgbHR3ID0gbmV4dCA+Pj4gNztcbiAgICAgICAgICBsZXQgcGllY2V3aXNlID0gbmV4dCA+Pj4gNiAmIDB4MTtcbiAgICAgICAgICBsZXQgc2VhbWxlc3MgPSBuZXh0ID4+PiA1ICYgMHgxO1xuICAgICAgICAgIGlmIChsdHcgPT09IDEpIHtcbiAgICAgICAgICAgIG5leHQgPSBzdHJlYW0ucmVhZFVpbnQxNigpO1xuICAgICAgICAgICAgcGF5bG9hZC5sdHdWYWxpZCA9IG5leHQgPj4+IDE1O1xuICAgICAgICAgICAgcGF5bG9hZC5sdHdPZmZzZXQgPSBuZXh0ICYgMHhlZmZmO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocGllY2V3aXNlID09PSAxKSB7XG4gICAgICAgICAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MjQoKTtcbiAgICAgICAgICAgIHBheWxvYWQucGllY2V3aXNlUmF0ZSA9IG5leHQgJiAweDNmZmZmZjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNlYW1sZXNzID09PSAxKSB7XG4gICAgICAgICAgICBuZXh0ID0gc3RyZWFtLnJlYWRJbnQ4KCk7XG4gICAgICAgICAgICBwYXlsb2FkLnNwbGljZVR5cGUgPSBuZXh0ID4+PiA0O1xuICAgICAgICAgICAgcGF5bG9hZC5kdHNOZXh0QVUxID0gbmV4dCA+Pj4gMSAmIDB4NztcbiAgICAgICAgICAgIHBheWxvYWQubWFya2VyMSA9IG5leHQgJiAweDE7XG4gICAgICAgICAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICAgIHBheWxvYWQuZHRzTmV4dEFVMiA9IG5leHQgPj4+IDE7XG4gICAgICAgICAgICBwYXlsb2FkLm1hcmtlcjIgPSBuZXh0ICYgMHgxO1xuICAgICAgICAgICAgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgICAgICAgICBwYXlsb2FkLmR0c05leHRBVTMgPSBuZXh0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdHJlYW0uc2tpcChsZW5ndGggLSAxIC0gKHN0cmVhbS5wb3NpdGlvbiAtIHN0YXJ0KSk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxhc3RTdHVmZmluZyA9IHBheWxvYWQuYWRhcHRhdGlvbkxlbmd0aCAtIDEgLSAoc3RyZWFtLnBvc2l0aW9uIC0gX3N0YXJ0KTtcbiAgICAgICAgc3RyZWFtLnNraXAobGFzdFN0dWZmaW5nKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcGF5bG9hZC5zdHJlYW0gPSBuZXcgU3RyZWFtKHN0cmVhbS5idWZmZXIuc2xpY2Uoc3RyZWFtLnBvc2l0aW9uKSk7XG4gICAgdHMucGF5bG9hZCA9IHBheWxvYWQ7XG4gIH1cblxuICBzdGF0aWMgUEVTICh0cykge1xuICAgIGxldCByZXQgPSB7fTtcbiAgICBsZXQgYnVmZmVyID0gdHMucGF5bG9hZC5zdHJlYW07XG5cbiAgICBsZXQgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDI0KCk7XG4gICAgaWYgKG5leHQgIT09IDEpIHtcbiAgICAgIHJldC5FUyA9IHt9O1xuICAgICAgcmV0LkVTLmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHN0cmVhbUlEID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgaWYgKHN0cmVhbUlEID49IDB4ZTAgJiYgc3RyZWFtSUQgPD0gMHhlZikge1xuICAgICAgICByZXQudHlwZSA9ICd2aWRlbyc7XG4gICAgICB9XG4gICAgICBpZiAoc3RyZWFtSUQgPj0gMHhjMCAmJiBzdHJlYW1JRCA8PSAweGRmKSB7XG4gICAgICAgIHJldC50eXBlID0gJ2F1ZGlvJztcbiAgICAgIH1cbiAgICAgIGxldCBwYWNrZXRMZW5ndGggPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgcmV0LnBhY2tldExlbmd0aCA9IHBhY2tldExlbmd0aDtcbiAgICAgIGlmIChyZXQudHlwZSA9PT0gJ3ZpZGVvJyB8fCByZXQudHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgICBsZXQgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgbGV0IGZpcnN0ID0gbmV4dCA+Pj4gNjtcbiAgICAgICAgaWYgKGZpcnN0ICE9PSAweDAyKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdlcnJvciB3aGVuIHBhcnNlIHBlcyBoZWFkZXInKTtcbiAgICAgICAgfVxuICAgICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50OCgpO1xuICAgICAgICByZXQucHRzRFRTRmxhZyA9IG5leHQgPj4+IDY7XG4gICAgICAgIHJldC5lc2NyRmxhZyA9IG5leHQgPj4+IDUgJiAweDAxO1xuICAgICAgICByZXQuZXNSYXRlRmxhZyA9IG5leHQgPj4+IDQgJiAweDAxO1xuICAgICAgICByZXQuZHNtRmxhZyA9IG5leHQgPj4+IDMgJiAweDAxO1xuICAgICAgICByZXQuYWRkaXRpb25hbEZsYWcgPSBuZXh0ID4+PiAyICYgMHgwMTtcbiAgICAgICAgcmV0LmNyY0ZsYWcgPSBuZXh0ID4+PiAxICYgMHgwMTtcbiAgICAgICAgcmV0LmV4dGVuc2lvbkZsYWcgPSBuZXh0ICYgMHgwMTtcbiAgICAgICAgcmV0LnBlc0hlYWRlckxlbmd0aCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgbGV0IE4xID0gcmV0LnBlc0hlYWRlckxlbmd0aDtcblxuICAgICAgICBpZiAocmV0LnB0c0RUU0ZsYWcgPT09IDIpIHtcbiAgICAgICAgICBsZXQgcHRzID0gW107XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgICBwdHMucHVzaChuZXh0ID4+PiAxICYgMHgwNyk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgcHRzLnB1c2gobmV4dCA+Pj4gMSk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgcHRzLnB1c2gobmV4dCA+Pj4gMSk7XG4gICAgICAgICAgcmV0LnB0cyA9IChwdHNbMF0gPDwgMzAgfCBwdHNbMV0gPDwgMTUgfCBwdHNbMl0pO1xuICAgICAgICAgIE4xIC09IDU7XG4gICAgICAgICAgLy8g6KeG6aKR5aaC5p6c5rKh5pyJZHRz55SocHRzXG4gICAgICAgICAgaWYgKHJldC50eXBlID09PSAndmlkZW8nKSB7XG4gICAgICAgICAgICByZXQuZHRzID0gcmV0LnB0cztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldC5wdHNEVFNGbGFnID09PSAzKSB7XG4gICAgICAgICAgbGV0IHB0cyA9IFtdO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQ4KCk7XG4gICAgICAgICAgcHRzLnB1c2gobmV4dCA+Pj4gMSAmIDB4MDcpO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgICAgIHB0cy5wdXNoKG5leHQgPj4+IDEpO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgICAgIHB0cy5wdXNoKG5leHQgPj4+IDEpO1xuICAgICAgICAgIHJldC5wdHMgPSAocHRzWzBdIDw8IDMwIHwgcHRzWzFdIDw8IDE1IHwgcHRzWzJdKTtcbiAgICAgICAgICBsZXQgZHRzID0gW107XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgICBkdHMucHVzaChuZXh0ID4+PiAxICYgMHgwNyk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgZHRzLnB1c2gobmV4dCA+Pj4gMSk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgZHRzLnB1c2gobmV4dCA+Pj4gMSk7XG4gICAgICAgICAgcmV0LmR0cyA9IChkdHNbMF0gPDwgMzAgfCBkdHNbMV0gPDwgMTUgfCBkdHNbMl0pO1xuICAgICAgICAgIE4xIC09IDEwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXQuZXNjckZsYWcgPT09IDEpIHtcbiAgICAgICAgICBsZXQgZXNjciA9IFtdXG4gICAgICAgICAgbGV0IGV4ID0gW107XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgICBlc2NyLnB1c2gobmV4dCA+Pj4gMyAmIDB4MDcpO1xuICAgICAgICAgIGVzY3IucHVzaChuZXh0ICYgMHgwMyk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAgICAgZXNjci5wdXNoKG5leHQgPj4+IDEzKTtcbiAgICAgICAgICBlc2NyLnB1c2gobmV4dCAmIDB4MDMpO1xuICAgICAgICAgIG5leHQgPSBidWZmZXIucmVhZFVpbnQxNigpO1xuICAgICAgICAgIGVzY3IucHVzaChuZXh0ID4+PiAxMyk7XG4gICAgICAgICAgZXgucHVzaChuZXh0ICYgMHgwMyk7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgICBleC5wdXNoKG5leHQgPj4+IDEpO1xuICAgICAgICAgIHJldC5lc2NyID0gKGVzY3JbMF0gPDwgMzAgfCBlc2NyWzFdIDw8IDI4IHwgZXNjclsyXSA8PCAxNSB8IGVzY3JbM10gPDwgMTMgfCBlc2NyWzRdKSAqIDMwMCArIChleFswXSA8PCA3IHwgZXhbMV0pO1xuICAgICAgICAgIE4xIC09IDY7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldC5lc1JhdGVGbGFnID09PSAxKSB7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDI0KCk7XG4gICAgICAgICAgcmV0LmVzUmF0ZSA9IG5leHQgPj4+IDEgJiAweDNmZmZmZjtcbiAgICAgICAgICBOMSAtPSAzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXQuZHNtRmxhZyA9PT0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IHN1cHBvcnQgRFNNX3RyaWNrX21vZGUnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0LmFkZGl0aW9uYWxGbGFnID09PSAxKSB7XG4gICAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDgoKTtcbiAgICAgICAgICByZXQuYWRkaXRpb25hbENvcHlJbmZvID0gbmV4dCAmIDB4N2Y7XG4gICAgICAgICAgTjEgLT0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0LmNyY0ZsYWcgPT09IDEpIHtcbiAgICAgICAgICByZXQucGVzQ1JDID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgICAgICBOMSAtPSAyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXQuZXh0ZW5zaW9uRmxhZyA9PT0gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IHN1cHBvcnQgZXh0ZW5zaW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE4xID4gMCkge1xuICAgICAgICAgIGJ1ZmZlci5za2lwKE4xKTtcbiAgICAgICAgfVxuICAgICAgICByZXQuRVMgPSBUc0RlbXV4ZXIuRVMoYnVmZmVyLCByZXQudHlwZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Zvcm1hdCBpcyBub3Qgc3VwcG9ydGVkJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBzdGF0aWMgRVMgKGJ1ZmZlciwgdHlwZSkge1xuICAgIGxldCBuZXh0O1xuICAgIGxldCByZXQgPSB7fTtcbiAgICBpZiAodHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDMyKCk7XG4gICAgICBpZiAobmV4dCAhPT0gMSkge1xuICAgICAgICBidWZmZXIuYmFjayg0KTtcbiAgICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDI0KCk7XG4gICAgICAgIGlmIChuZXh0ICE9PSAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdoMjY0IG5hbCBoZWFkZXIgcGFyc2UgZmFpbGVkJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJ1ZmZlci5za2lwKDIpOy8vIDA5IEYwXG4gICAgICAvLyBUT0RPIHJlYWRuYWx1XG4gICAgICByZXQuYnVmZmVyID0gYnVmZmVyO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgbmV4dCA9IGJ1ZmZlci5yZWFkVWludDE2KCk7XG4gICAgICAvLyBhZHRz55qE5ZCM5q2l5a2X6IqC77yMMTLkvY1cbiAgICAgIGlmIChuZXh0ID4+PiA0ICE9PSAweGZmZikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FhYyBFUyBwYXJzZSBFcnJvcicpO1xuICAgICAgfVxuICAgICAgY29uc3QgZnEgPSBbOTYwMDAsIDg4MjAwLCA2NDAwMCwgNDgwMDAsIDQ0MTAwLCAzMjAwMCwgMjQwMDAsIDIyMDUwLCAxNjAwMCwgMTIwMDAsIDExMDI1LCA4MDAwLCA3MzUwXTtcbiAgICAgIHJldC5pZCA9IChuZXh0ID4+PiAzICYgMHgwMSkgPT09IDAgPyAnTVBFRy00JyA6ICdNUEVHLTInO1xuICAgICAgcmV0LmxheWVyID0gbmV4dCA+Pj4gMSAmIDB4MDM7XG4gICAgICByZXQuYWJzZW50ID0gbmV4dCAmIDB4MDE7XG4gICAgICBuZXh0ID0gYnVmZmVyLnJlYWRVaW50MTYoKTtcbiAgICAgIHJldC5hdWRpb09iamVjdFR5cGUgPSAobmV4dCA+Pj4gMTQgJiAweDAzKSArIDE7XG4gICAgICByZXQucHJvZmlsZSA9IHJldC5hdWRpb09iamVjdFR5cGUgLSAxO1xuICAgICAgcmV0LmZyZXF1ZW5jeUluZGV4ID0gbmV4dCA+Pj4gMTAgJiAweDBmO1xuICAgICAgcmV0LmZyZXF1ZW5jZSA9IGZxW3JldC5mcmVxdWVuY3lJbmRleF07XG4gICAgICByZXQuY2hhbm5lbCA9IG5leHQgPj4+IDYgJiAweDA3O1xuICAgICAgcmV0LmZyYW1lTGVuZ3RoID0gKG5leHQgJiAweDAzKSA8PCAxMSB8IChidWZmZXIucmVhZFVpbnQxNigpID4+PiA1KTtcbiAgICAgIFRzRGVtdXhlci5nZXRBdWRpb0NvbmZpZyhyZXQpO1xuICAgICAgYnVmZmVyLnNraXAoMSk7XG4gICAgICByZXQuYnVmZmVyID0gYnVmZmVyO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEVTICR7dHlwZX0gaXMgbm90IHN1cHBvcnRlZGApO1xuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG4gIH1cblxuICBzdGF0aWMgVFNEVCAoc3RyZWFtLCB0cywgZnJhZ3MpIHtcbiAgICAvLyBUT0RPXG4gICAgdHMucGF5bG9hZCA9IHt9O1xuICB9XG5cbiAgc3RhdGljIENBVCAoc3RyZWFtLCB0cywgZnJhZ3MpIHtcbiAgICBsZXQgcmV0ID0ge31cbiAgICByZXQudGFibGVJRCA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICBsZXQgbmV4dCA9IHN0cmVhbS5yZWFkVWludDE2KCk7XG4gICAgcmV0LnNlY3Rpb25JbmRpY2F0b3IgPSBuZXh0ID4+PiA3O1xuICAgIHJldC5zZWN0aW9uTGVuZ3RoID0gbmV4dCAmIDB4MGZmZjtcbiAgICBzdHJlYW0uc2tpcCgyKTtcbiAgICBuZXh0ID0gc3RyZWFtLnJlYWRVaW50OCgpO1xuICAgIHJldC52ZXJzaW9uID0gbmV4dCA+Pj4gMztcbiAgICByZXQuY3VycmVudE5leHRJbmRpY2F0b3IgPSBuZXh0ICYgMHgwMTtcbiAgICByZXQuc2VjdGlvbk51bWJlciA9IHN0cmVhbS5yZWFkVWludDgoKTtcbiAgICByZXQubGFzdFNlY3Rpb25OdW1iZXIgPSBzdHJlYW0ucmVhZFVpbnQ4KCk7XG4gICAgbGV0IE4gPSAodGhpcy5zZWN0aW9uTGVuZ3RoIC0gOSkgLyA0O1xuICAgIGxldCBsaXN0ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOOyBpKyspIHtcbiAgICAgIGxpc3QucHVzaCh7fSk7XG4gICAgfVxuICAgIHJldC5jcmMzMiA9IHN0cmVhbS5yZWFkVWludDMyKCk7XG4gICAgdHMucGF5bG9hZCA9IHJldDtcbiAgfVxuXG4gIHN0YXRpYyBnZXRBdWRpb0NvbmZpZyAocmV0KSB7XG4gICAgbGV0IHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKVxuICAgIGxldCBjb25maWc7XG4gICAgbGV0IGV4dGVuc2lvblNhbXBsZUluZGV4O1xuICAgIGlmICgvZmlyZWZveC9pLnRlc3QodXNlckFnZW50KSkge1xuICAgICAgaWYgKHJldC5mcmVxdWVuY3lJbmRleCA+PSA2KSB7XG4gICAgICAgIHJldC5hdWRpb09iamVjdFR5cGUgPSA1O1xuICAgICAgICBjb25maWcgPSBuZXcgQXJyYXkoNCk7XG4gICAgICAgIGV4dGVuc2lvblNhbXBsZUluZGV4ID0gcmV0LmZyZXF1ZW5jeUluZGV4IC0gMztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldC5hdWRpb09iamVjdFR5cGUgPSAyO1xuICAgICAgICBjb25maWcgPSBuZXcgQXJyYXkoMik7XG4gICAgICAgIGV4dGVuc2lvblNhbXBsZUluZGV4ID0gcmV0LmZyZXF1ZW5jeUluZGV4O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodXNlckFnZW50LmluZGV4T2YoJ2FuZHJvaWQnKSAhPT0gLTEpIHtcbiAgICAgIHJldC5hdWRpb09iamVjdFR5cGUgPSAyO1xuICAgICAgY29uZmlnID0gbmV3IEFycmF5KDIpO1xuICAgICAgZXh0ZW5zaW9uU2FtcGxlSW5kZXggPSByZXQuZnJlcXVlbmN5SW5kZXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldC5hdWRpb09iamVjdFR5cGUgPSA1O1xuICAgICAgY29uZmlnID0gbmV3IEFycmF5KDQpO1xuICAgICAgaWYgKHJldC5mcmVxdWVuY3lJbmRleCA+PSA2KSB7XG4gICAgICAgIGV4dGVuc2lvblNhbXBsZUluZGV4ID0gcmV0LmZyZXF1ZW5jeUluZGV4IC0gMztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChyZXQuY2hhbm5lbCA9PT0gMSkge1xuICAgICAgICAgIHJldC5hdWRpb09iamVjdFR5cGUgPSAyO1xuICAgICAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSgyKTtcbiAgICAgICAgfVxuICAgICAgICBleHRlbnNpb25TYW1wbGVJbmRleCA9IHJldC5mcmVxdWVuY3lJbmRleDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25maWdbMF0gPSByZXQuYXVkaW9PYmplY3RUeXBlIDw8IDM7XG4gICAgY29uZmlnWzBdIHw9IChyZXQuZnJlcXVlbmN5SW5kZXggJiAweDBlKSA+PiAxO1xuICAgIGNvbmZpZ1sxXSA9IChyZXQuZnJlcXVlbmN5SW5kZXggJiAweDAxKSA8PCA3O1xuICAgIGNvbmZpZ1sxXSB8PSByZXQuY2hhbm5lbCA8PCAzO1xuICAgIGlmIChyZXQuYXVkaW9PYmplY3RUeXBlID09PSA1KSB7XG4gICAgICBjb25maWdbMV0gfD0gKGV4dGVuc2lvblNhbXBsZUluZGV4ICYgMHgwZSkgPj4gMTtcbiAgICAgIGNvbmZpZ1syXSA9IChleHRlbnNpb25TYW1wbGVJbmRleCAmIDB4MDEpIDw8IDc7XG4gICAgICBjb25maWdbMl0gfD0gMiA8PCAyO1xuICAgICAgY29uZmlnWzNdID0gMDtcbiAgICB9XG4gICAgcmV0LmF1ZGlvQ29uZmlnID0gY29uZmlnO1xuICB9XG5cbiAgZ2V0IGlucHV0QnVmZmVyICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSh0aGlzLmNvbmZpZ3MuaW5wdXRidWZmZXIpO1xuICB9XG5cbiAgZ2V0IF90cmFja3MgKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUc0RlbXV4ZXI7XG4iLCJjbGFzcyBQbGF5bGlzdCB7XG4gIGNvbnN0cnVjdG9yIChjb25maWdzKSB7XG4gICAgdGhpcy5fYmFzZVVSTCA9ICcnO1xuICAgIHRoaXMuX2xpc3QgPSB7fTtcbiAgICB0aGlzLl90cyA9IHt9O1xuICAgIHRoaXMudmVyc2lvbiA9IDA7XG4gICAgdGhpcy5zZXF1ZW5jZSA9IC0xO1xuICAgIHRoaXMudGFyZ2V0ZHVyYXRpb24gPSAwO1xuICAgIHRoaXMuZHVyYXRpb24gPSAwO1xuICAgIHRoaXMuZnJhZ0xlbmd0aCA9IDA7XG4gICAgdGhpcy5fbGFzdGdldCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9hdWRvY2xlYXIgPSBjb25maWdzLmF1dG9jbGVhciB8fCBmYWxzZTtcbiAgfVxuXG4gIGdldCBsaXN0ICgpIHtcbiAgICByZXR1cm4gdGhpcy5fbGlzdDtcbiAgfVxuXG4gIHNldCBiYXNlVVJMIChiYXNlVVJMKSB7XG4gICAgaWYgKHRoaXMuYmFzZVVSTCAhPT0gYmFzZVVSTCkge1xuICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgdGhpcy5fYmFzZVVSTCA9IGJhc2VVUkw7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGJhc2VVUkwgKCkge1xuICAgIHJldHVybiB0aGlzLl9iYXNlVVJMO1xuICB9XG5cbiAgcHVzaCAodHMsIGR1cmF0aW9uLCBkaXNjb250aW51ZSkge1xuICAgIGlmICghdGhpcy5fdHNbdHNdKSB7XG4gICAgICB0aGlzLl90c1t0c10gPSB7ZHVyYXRpb246IGR1cmF0aW9uLCBcbiAgICAgICAgZG93bmxvYWRlZDogZmFsc2UsIFxuICAgICAgICBkb3dubG9hZGluZzogZmFsc2UsIFxuICAgICAgICBzdGFydDogdGhpcy5kdXJhdGlvbiwgXG4gICAgICAgIGRpc2NvbnRpbnVlOiBkaXNjb250aW51ZSA/IHRydWU6IGZhbHNlXG4gICAgICB9O1xuICAgICAgdGhpcy5fbGlzdFt0aGlzLmR1cmF0aW9uXSA9IHRzO1xuICAgICAgdGhpcy5kdXJhdGlvbiArPSBkdXJhdGlvbjtcbiAgICAgIHRoaXMuZnJhZ0xlbmd0aCArPSAxO1xuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZUZyYWcgKHVybCkge1xuICAgIGlmICh0aGlzLl90c1t1cmxdKSB7XG4gICAgICBpZiAodGhpcy5fdHNbdXJsXS5zdGFydCA+IHRoaXMuX2xhc3RnZXQudGltZSkge1xuICAgICAgICB0aGlzLl9sYXN0Z2V0ID0ge1xuICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLl90c1t1cmxdLmR1cmF0aW9uLFxuICAgICAgICAgIHRpbWU6IHRoaXMuX3RzW3VybF0uc3RhcnQsXG4gICAgICAgICAgZG93bmxvYWRlZDogZmFsc2UsXG4gICAgICAgICAgZG93bmxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgIHVybDogdXJsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGRlbGV0ZSB0aGlzLl9saXN0W3RoaXMuX3RzW3VybF0uc3RhcnRdO1xuICAgICAgZGVsZXRlIHRoaXMuX3RzW3VybF07XG4gICAgICB0aGlzLmZyYWdMZW5ndGggLT0gMTtcbiAgICB9XG4gIH1cblxuICBwdXNoTTNVOCAoZGF0YSwgZGVsZXRlcHJlKSB7XG4gICAgLy8g5bi46KeE5L+h5oGv5pu/5o2iXG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE5vIG0zdTggZGF0YSByZWNlaXZlZC5gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy52ZXJzaW9uID0gZGF0YS52ZXJzaW9uO1xuICAgIHRoaXMudGFyZ2V0ZHVyYXRpb24gPSBkYXRhLnRhcmdldGR1cmF0aW9uO1xuICAgIGlmKGRhdGEuZW5jcnlwdCAmJiAhdGhpcy5lbmNyeXB0KSB7XG4gICAgICB0aGlzLmVuY3J5cHQgPSBkYXRhLmVuY3J5cHQ7XG4gICAgfVxuICAgIC8vIOaWsOWIhueJh+S/oeaBr1xuICAgIGlmIChkYXRhLnNlcXVlbmNlID4gdGhpcy5zZXF1ZW5jZSkge1xuICAgICAgdGhpcy5zZXF1ZW5jZSA9IGRhdGEuc2VxdWVuY2U7XG4gICAgICBsZXQgbmV3ZnJhZ2xpc3QgPSBbXVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmZyYWdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBmcmFnID0gZGF0YS5mcmFnc1tpXTtcbiAgICAgICAgaWYgKCF0aGlzLl90c1tmcmFnLnVybF0pIHtcbiAgICAgICAgICBuZXdmcmFnbGlzdC5wdXNoKGZyYWcudXJsKVxuICAgICAgICAgIHRoaXMucHVzaChmcmFnLnVybCwgZnJhZy5kdXJhdGlvbiwgZnJhZy5kaXNjb250aW51ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYobmV3ZnJhZ2xpc3QubGVuZ3RoIDwgMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbiBub3QgcmVhZCB0cyBmaWxlIGxpc3QuYCk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGlmIChkZWxldGVwcmUpIHtcbiAgICAgICAgbGV0IHRzbGlzdCA9IHRoaXMuZ2V0VHNMaXN0KCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHNsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKG5ld2ZyYWdsaXN0LmluZGV4T2YodHNsaXN0W2ldKSA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlRnJhZyh0c2xpc3RbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYE9sZCBtM3U4IGZpbGUgcmVjZWl2ZWQsICR7ZGF0YS5zZXF1ZW5jZX1gKTtcbiAgICB9XG4gIH1cblxuICBnZXRUc0xpc3QgKCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl90cyk7XG4gIH1cblxuICBkb3dubG9hZGVkICh0c25hbWUsIGlzbG9hZGVkKSB7XG4gICAgbGV0IHRzID0gdGhpcy5fdHNbdHNuYW1lXTtcbiAgICBpZiAodHMpIHtcbiAgICAgIHRzLmRvd25sb2FkZWQgPSBpc2xvYWRlZFxuICAgIH1cbiAgfVxuXG4gIGRvd25sb2FkaW5nICh0c25hbWUsIGxvYWRpbmcpIHtcbiAgICBsZXQgdHMgPSB0aGlzLl90c1t0c25hbWVdO1xuICAgIGlmICh0cykge1xuICAgICAgdHMuZG93bmxvYWRpbmcgPSBsb2FkaW5nXG4gICAgfVxuICB9XG5cbiAgZ2V0VHNCeU5hbWUgKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fdHNbbmFtZV07XG4gIH1cblxuICBnZXRUcyAodGltZSkge1xuICAgIGxldCB0aW1lbGlzdCA9IE9iamVjdC5rZXlzKHRoaXMuX2xpc3QpO1xuICAgIGxldCB0cztcblxuICAgIGlmICh0aW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0aGlzLl9sYXN0Z2V0KSB7XG4gICAgICAgIHRpbWUgPSB0aGlzLl9sYXN0Z2V0LnRpbWUgKyB0aGlzLl9sYXN0Z2V0LmR1cmF0aW9uO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGltZSA9IDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRpbWVsaXN0Lmxlbmd0aCA8IDEgfHwgdGltZSA+PSB0aGlzLmR1cmF0aW9uKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB0aW1lbGlzdC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICByZXR1cm4gcGFyc2VGbG9hdChhKSAtIHBhcnNlRmxvYXQoYilcbiAgICB9KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbWVsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGltZSA+PSBwYXJzZUludCh0aW1lbGlzdFtpXSkpIHtcbiAgICAgICAgbGV0IHVybCA9IHRoaXMuX2xpc3RbdGltZWxpc3RbaV1dO1xuICAgICAgICBsZXQgZG93bmxvYWRlZCA9IHRoaXMuX3RzW3VybF0uZG93bmxvYWRlZDtcbiAgICAgICAgbGV0IGRvd25sb2FkaW5nID0gdGhpcy5fdHNbdXJsXS5kb3dubG9hZGluZztcbiAgICAgICAgdHMgPSB7dXJsLCBkb3dubG9hZGVkLCBkb3dubG9hZGluZywgdGltZTogcGFyc2VJbnQodGltZWxpc3RbaV0pLCBkdXJhdGlvbjogcGFyc2VJbnQodGhpcy5fdHNbdXJsXS5kdXJhdGlvbil9O1xuICAgICAgICBpZiAodGhpcy5hdXRvY2xlYXIpIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5fdHNbdGhpcy5fbGFzdGdldC51cmxdO1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLl9saXN0W3RoaXMuX2xhc3RnZXQudGltZV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGFzdGdldCA9IHRzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cztcbiAgfVxuXG4gIGNsZWFyICgpIHtcbiAgICB0aGlzLl9iYXNlVVJMID0gJyc7XG4gICAgdGhpcy5fbGlzdCA9IHt9O1xuICAgIHRoaXMuX3RzID0ge307XG4gICAgdGhpcy52ZXJzaW9uID0gMDtcbiAgICB0aGlzLnNlcXVlbmNlID0gLTE7XG4gICAgdGhpcy50YXJnZXRkdXJhdGlvbiA9IDA7XG4gICAgdGhpcy5kdXJhdGlvbiA9IDA7XG4gIH1cblxuICBjbGVhckRvd25sb2FkZWQgKCkge1xuICAgIGZvciAobGV0IGkgPSAwLCBsID0gT2JqZWN0LmtleXModGhpcy5fdHMpLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgbGV0IHRzID0gdGhpcy5fdHNbT2JqZWN0LmtleXModGhpcy5fdHMpW2ldXTtcbiAgICAgIHRzLmRvd25sb2FkZWQgPSBmYWxzZTtcbiAgICAgIHRzLmRvd25sb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5fYmFzZVVSTCA9ICcnO1xuICAgIHRoaXMuX2xpc3QgPSB7fTtcbiAgICB0aGlzLl90cyA9IHt9O1xuICAgIHRoaXMudmVyc2lvbiA9IDA7XG4gICAgdGhpcy5zZXF1ZW5jZSA9IC0xO1xuICAgIHRoaXMudGFyZ2V0ZHVyYXRpb24gPSAwO1xuICAgIHRoaXMuZHVyYXRpb24gPSAwO1xuICAgIHRoaXMuZnJhZ0xlbmd0aCA9IDA7XG4gICAgdGhpcy5fbGFzdGdldCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9hdWRvY2xlYXIgPSBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5bGlzdDtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBGZXRjaExvYWRlcjogcmVxdWlyZSgnLi9zcmMvZmV0Y2gtbG9hZGVyJykuZGVmYXVsdFxufTtcbiIsImltcG9ydCB7IEVWRU5UUyB9IGZyb20gJ3hncGxheWVyLXV0aWxzJztcblxuY29uc3QgTE9BREVSX0VWRU5UUyA9IEVWRU5UUy5MT0FERVJfRVZFTlRTO1xuY29uc3QgUkVBRF9TVFJFQU0gPSAwO1xuY29uc3QgUkVBRF9URVhUID0gMTtcbmNvbnN0IFJFQURfSlNPTiA9IDI7XG5jb25zdCBSRUFEX0JVRkZFUiA9IDM7XG5jbGFzcyBGZXRjaExvYWRlciB7XG4gIGNvbnN0cnVjdG9yIChjb25maWdzKSB7XG4gICAgdGhpcy5jb25maWdzID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlncyk7XG4gICAgdGhpcy51cmwgPSBudWxsXG4gICAgdGhpcy5zdGF0dXMgPSAwXG4gICAgdGhpcy5lcnJvciA9IG51bGxcbiAgICB0aGlzLl9yZWFkZXIgPSBudWxsO1xuICAgIHRoaXMuX2NhbmNlbGVkID0gZmFsc2U7XG4gICAgdGhpcy5fZGVzdHJveWVkID0gZmFsc2U7XG4gICAgdGhpcy5yZWFkdHlwZSA9IHRoaXMuY29uZmlncy5yZWFkdHlwZTtcbiAgICB0aGlzLmJ1ZmZlciA9IHRoaXMuY29uZmlncy5idWZmZXIgfHwgJ0xPQURFUl9CVUZGRVInO1xuICAgIHRoaXMuX2xvYWRlclRhc2tObyA9IDA7XG4gIH1cblxuICBpbml0ICgpIHtcbiAgICB0aGlzLm9uKExPQURFUl9FVkVOVFMuTEFERVJfU1RBUlQsIHRoaXMubG9hZC5iaW5kKHRoaXMpKVxuICB9XG5cbiAgc3RhdGljIGdldCB0eXBlICgpIHtcbiAgICByZXR1cm4gJ2xvYWRlcidcbiAgfVxuXG4gIGxvYWQgKHVybCwgb3B0cykge1xuICAgIGxldCBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy51cmwgPSB1cmw7XG4gICAgdGhpcy5fY2FuY2VsZWQgPSBmYWxzZTtcblxuICAgIC8vIFRPRE86IEFkZCBSYW5nZXNcbiAgICBsZXQgcGFyYW1zID0gdGhpcy5nZXRQYXJhbXMob3B0cylcbiAgICBfdGhpcy5sb2FkaW5nID0gdHJ1ZVxuICAgIHJldHVybiBmZXRjaCh0aGlzLnVybCwgcGFyYW1zKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgIF90aGlzLnN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1c1xuICAgICAgICByZXR1cm4gX3RoaXMuX29uRmV0Y2hSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICB9XG4gICAgICBfdGhpcy5sb2FkaW5nID0gZmFsc2U7XG4gICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0VSUk9SLCBfdGhpcy5UQUcsIG5ldyBFcnJvcihgaW52YWxpZCByZXNwb25zZS5gKSk7XG4gICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSAge1xuICAgICAgX3RoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9FUlJPUiwgX3RoaXMuVEFHLCBlcnJvcik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubWVzc2FnZSlcbiAgICB9KVxuICB9XG5cbiAgX29uRmV0Y2hSZXNwb25zZSAocmVzcG9uc2UpIHtcbiAgICBsZXQgX3RoaXMgPSB0aGlzO1xuICAgIGxldCBidWZmZXIgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKHRoaXMuYnVmZmVyKTtcbiAgICB0aGlzLl9sb2FkZXJUYXNrTm8rKztcbiAgICBsZXQgdGFza25vID0gdGhpcy5fbG9hZGVyVGFza05vO1xuICAgIGlmIChyZXNwb25zZS5vayA9PT0gdHJ1ZSkge1xuICAgICAgc3dpdGNoICh0aGlzLnJlYWR0eXBlKSB7XG4gICAgICAgIGNhc2UgUkVBRF9KU09OOlxuICAgICAgICAgIHJlc3BvbnNlLmpzb24oKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBfdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgICAgICAgIGlmICghX3RoaXMuX2NhbmNlbGVkICYmICFfdGhpcy5fZGVzdHJveWVkKSB7XG4gICAgICAgICAgICAgIGlmIChidWZmZXIpIHtcbiAgICAgICAgICAgICAgICBidWZmZXIucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0NPTVBMRVRFLCBidWZmZXIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsIGRhdGEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgUkVBRF9URVhUOlxuICAgICAgICAgIHJlc3BvbnNlLnRleHQoKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBfdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgICAgICAgIGlmICghX3RoaXMuX2NhbmNlbGVkICYmICFfdGhpcy5fZGVzdHJveWVkKSB7XG4gICAgICAgICAgICAgIGlmIChidWZmZXIpIHtcbiAgICAgICAgICAgICAgICBidWZmZXIucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0NPTVBMRVRFLCBidWZmZXIpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF90aGlzLmVtaXQoTE9BREVSX0VWRU5UUy5MT0FERVJfQ09NUExFVEUsIGRhdGEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgUkVBRF9CVUZGRVI6XG4gICAgICAgICAgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBfdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgICAgICAgIGlmICghX3RoaXMuX2NhbmNlbGVkICYmICFfdGhpcy5fZGVzdHJveWVkKSB7XG4gICAgICAgICAgICAgIGlmIChidWZmZXIpIHtcbiAgICAgICAgICAgICAgICBidWZmZXIucHVzaChuZXcgVWludDhBcnJheShkYXRhKSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9DT01QTEVURSwgYnVmZmVyKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0NPTVBMRVRFLCBkYXRhKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFJFQURfU1RSRUFNOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiB0aGlzLl9vblJlYWRlcihyZXNwb25zZS5ib2R5LmdldFJlYWRlcigpLCB0YXNrbm8pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9vblJlYWRlciAocmVhZGVyLCB0YXNrbm8pIHtcbiAgICBsZXQgYnVmZmVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSh0aGlzLmJ1ZmZlcik7XG4gICAgaWYgKCghYnVmZmVyICYmIHRoaXMuX3JlYWRlcikgfHwgdGhpcy5fZGVzdHJveWVkKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLl9yZWFkZXIuY2FuY2VsKClcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRE8gTk9USElOR1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX3JlYWRlciA9IHJlYWRlclxuICAgIGlmICh0aGlzLmxvYWRpbmcgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgX3RoaXMgPSB0aGlzXG4gICAgLy8gcmVhZGVyIHJlYWQgZnVuY3Rpb24gcmV0dXJucyBhIFByb21pc2UuIGdldCBkYXRhIHdoZW4gY2FsbGJhY2sgYW5kIGhhcyB2YWx1ZS5kb25lIHdoZW4gZGlzY29ubmVjdGVkLlxuICAgIC8vIHJlYWTmlrnms5Xov5Tlm57kuIDkuKpQcm9taXNlLiDlm57osIPkuK3lj6/ku6Xojrflj5bliLDmlbDmja7jgILlvZN2YWx1ZS5kb25l5a2Y5Zyo5pe277yM6K+05piO6ZO+5o6l5pat5byA44CCXG4gICAgdGhpcy5fcmVhZGVyICYmIHRoaXMuX3JlYWRlci5yZWFkKCkudGhlbihmdW5jdGlvbiAodmFsKSB7XG4gICAgICBpZiAodmFsLmRvbmUpIHtcbiAgICAgICAgLy8gVE9ETzog5a6M5oiQ5aSE55CGXG4gICAgICAgIF90aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgICBfdGhpcy5zdGF0dXMgPSAwO1xuICAgICAgICBfdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTE9BREVSX0NPTVBMRVRFLCBidWZmZXIpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoX3RoaXMuX2NhbmNlbGVkIHx8IF90aGlzLl9kZXN0cm95ZWQpIHtcbiAgICAgICAgaWYgIChfdGhpcy5fcmVhZGVyKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIF90aGlzLl9yZWFkZXIuY2FuY2VsKClcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBETyBOT1RISU5HXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYnVmZmVyLnB1c2godmFsLnZhbHVlKVxuICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9EQVRBTE9BREVELCBidWZmZXIpXG4gICAgICByZXR1cm4gX3RoaXMuX29uUmVhZGVyKHJlYWRlciwgdGFza25vKVxuICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgX3RoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgX3RoaXMuZW1pdChMT0FERVJfRVZFTlRTLkxPQURFUl9FUlJPUiwgX3RoaXMuVEFHLCBlcnJvcik7XG4gICAgfSlcbiAgfVxuXG4gIGdldFBhcmFtcyAob3B0cykge1xuICAgIGxldCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0cylcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKClcblxuICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgIG1vZGU6ICdjb3JzJyxcbiAgICAgIGNhY2hlOiAnZGVmYXVsdCdcbiAgICB9XG5cbiAgICAvLyBhZGQgY3VzdG1vciBoZWFkZXJzXG4gICAgLy8g5re75Yqg6Ieq5a6a5LmJ5aS0XG4gICAgaWYgKHR5cGVvZiB0aGlzLmNvbmZpZ3MuaGVhZGVycyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGxldCBjb25maWdIZWFkZXJzID0gdGhpcy5jb25maWdzLmhlYWRlcnNcbiAgICAgIGZvciAobGV0IGtleSBpbiBjb25maWdIZWFkZXJzKSB7XG4gICAgICAgIGlmIChjb25maWdIZWFkZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBoZWFkZXJzLmFwcGVuZChrZXksIGNvbmZpZ0hlYWRlcnNba2V5XSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5oZWFkZXJzID09PSAnb2JqZWN0Jykge1xuICAgICAgbGV0IG9wdEhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnNcbiAgICAgIGZvciAobGV0IGtleSBpbiBvcHRIZWFkZXJzKSB7XG4gICAgICAgIGlmIChvcHRIZWFkZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBoZWFkZXJzLmFwcGVuZChrZXksIG9wdEhlYWRlcnNba2V5XSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmNvcnMgPT09IGZhbHNlKSB7XG4gICAgICBwYXJhbXMubW9kZSA9ICdzYW1lLW9yaWdpbidcbiAgICB9XG5cbiAgICAvLyB3aXRoQ3JlZGVudGlhbHMgaXMgZGlzYWJsZWQgYnkgZGVmYXVsdFxuICAgIC8vIHdpdGhDcmVkZW50aWFscyDlnKjpu5jorqTmg4XlhrXkuIvkuI3ooqvkvb/nlKjjgIJcbiAgICBpZiAob3B0aW9ucy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgIHBhcmFtcy5jcmVkZW50aWFscyA9ICdpbmNsdWRlJ1xuICAgIH1cblxuICAgIC8vIFRPRE86IEFkZCByYW5nZXM7XG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxuXG4gIGNhbmNlbCAoKSB7XG4gICAgaWYgKHRoaXMuX3JlYWRlcikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5fcmVhZGVyLmNhbmNlbCgpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIOmYsuatomZhaWxlZDogMjAw6ZSZ6K+v6KKr5omT5Y2w5Yiw5o6n5Yi25Y+w5LiKXG4gICAgICB9XG4gICAgICB0aGlzLl9yZWFkZXIgPSBudWxsXG4gICAgICB0aGlzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgdGhpcy5fY2FuY2VsZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuX2Rlc3Ryb3llZCA9IHRydWVcbiAgICB0aGlzLmNhbmNlbCgpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZldGNoTG9hZGVyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgTXA0UmVtdXhlcjogcmVxdWlyZSgnLi9zcmMvbXA0JykuZGVmYXVsdFxufTtcbiIsImltcG9ydCB7IEJ1ZmZlciB9IGZyb20gJ3hncGxheWVyLXV0aWxzJztcblxuLy8gY29uc3QgVUlOVDMyX01BWCA9IE1hdGgucG93KDIsIDMyKSAtIDE7XG5jbGFzcyBGbXA0IHtcbiAgc3RhdGljIHNpemUgKHZhbHVlKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci53cml0ZVVpbnQzMih2YWx1ZSlcbiAgfVxuICBzdGF0aWMgaW5pdEJveCAoc2l6ZSwgbmFtZSwgLi4uY29udGVudCkge1xuICAgIGNvbnN0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoc2l6ZSksIEZtcDQudHlwZShuYW1lKSwgLi4uY29udGVudClcbiAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlclxuICB9XG4gIHN0YXRpYyBleHRlbnNpb24gKHZlcnNpb24sIGZsYWcpIHtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgdmVyc2lvbixcbiAgICAgIChmbGFnID4+IDE2KSAmIDB4ZmYsXG4gICAgICAoZmxhZyA+PiA4KSAmIDB4ZmYsXG4gICAgICBmbGFnICYgMHhmZlxuICAgIF0pXG4gIH1cbiAgc3RhdGljIGZ0eXAgKCkge1xuICAgIHJldHVybiBGbXA0LmluaXRCb3goMjQsICdmdHlwJywgbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHg2OSwgMHg3MywgMHg2RiwgMHg2RCwgLy8gaXNvbSxcbiAgICAgIDB4MCwgMHgwLCAweDAwLCAweDAxLCAvLyBtaW5vcl92ZXJzaW9uOiAweDAxXG4gICAgICAweDY5LCAweDczLCAweDZGLCAweDZELCAvLyBpc29tXG4gICAgICAweDYxLCAweDc2LCAweDYzLCAweDMxIC8vIGF2YzFcbiAgICBdKSlcbiAgfVxuICBzdGF0aWMgbW9vdiAoeyB0eXBlLCBtZXRhIH0pIHtcbiAgICBsZXQgc2l6ZSA9IDhcbiAgICBsZXQgbXZoZCA9IEZtcDQubXZoZChtZXRhLmR1cmF0aW9uLCBtZXRhLnRpbWVzY2FsZSlcbiAgICBsZXQgdHJha1xuXG4gICAgaWYgKHR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgIHRyYWsgPSBGbXA0LnZpZGVvVHJhayhtZXRhKVxuICAgIH0gZWxzZSB7XG4gICAgICB0cmFrID0gRm1wNC5hdWRpb1RyYWsobWV0YSlcbiAgICB9XG5cbiAgICBsZXQgbXZleCA9IEZtcDQubXZleChtZXRhLmR1cmF0aW9uLCBtZXRhLnRpbWVzY2FsZSB8fCAxMDAwLCBtZXRhLmlkKTtcbiAgICBbbXZoZCwgdHJhaywgbXZleF0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KHNpemUsICdtb292JywgbXZoZCwgdHJhaywgbXZleClcbiAgfVxuICBzdGF0aWMgbXZoZCAoZHVyYXRpb24sIHRpbWVzY2FsZSA9IDEwMDApIHtcbiAgICAvLyBkdXJhdGlvbiAqPSB0aW1lc2NhbGU7XG4gICAgbGV0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gdmVyc2lvbigwKSArIGZsYWdzICAgICAx5L2N55qEYm9454mI5pysKzPkvY1mbGFncyAgIGJveOeJiOacrO+8jDDmiJYx77yM5LiA6Iis5Li6MOOAgu+8iOS7peS4i+Wtl+iKguaVsOWdh+aMiXZlcnNpb249MO+8iVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gY3JlYXRpb25fdGltZSAgICDliJvlu7rml7bpl7QgIO+8iOebuOWvueS6jlVUQ+aXtumXtDE5MDQtMDEtMDHpm7bngrnnmoTnp5LmlbDvvIlcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIG1vZGlmaWNhdGlvbl90aW1lICAg5L+u5pS55pe26Ze0XG5cbiAgICAgIC8qKlxuICAgICAgICAgICAgICogdGltZXNjYWxlOiA0IGJ5dGVz5paH5Lu25aqS5L2T5ZyoMeenkuaXtumXtOWGheeahOWIu+W6puWAvO+8jOWPr+S7peeQhuino+S4ujHnp5Lplb/luqZcbiAgICAgICAgICAgICAqL1xuICAgICAgKHRpbWVzY2FsZSA+Pj4gMjQpICYgMHhGRixcbiAgICAgICh0aW1lc2NhbGUgPj4+IDE2KSAmIDB4RkYsXG4gICAgICAodGltZXNjYWxlID4+PiA4KSAmIDB4RkYsXG4gICAgICAodGltZXNjYWxlKSAmIDB4RkYsXG5cbiAgICAgIC8qKlxuICAgICAgICAgICAgICogZHVyYXRpb246IDQgYnl0ZXPor6V0cmFja+eahOaXtumXtOmVv+W6pu+8jOeUqGR1cmF0aW9u5ZKMdGltZSBzY2FsZeWAvOWPr+S7peiuoeeul3RyYWNr5pe26ZW/77yM5q+U5aaCYXVkaW8gdHJhY2vnmoR0aW1lIHNjYWxlID0gODAwMCxcbiAgICAgICAgICAgICAqIGR1cmF0aW9uID0gNTYwMTI477yM5pe26ZW/5Li6NzAuMDE277yMdmlkZW8gdHJhY2vnmoR0aW1lIHNjYWxlID0gNjAwLCBkdXJhdGlvbiA9IDQyMDAw77yM5pe26ZW/5Li6NzBcbiAgICAgICAgICAgICAqL1xuICAgICAgKGR1cmF0aW9uID4+PiAyNCkgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uID4+PiAxNikgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uID4+PiA4KSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24pICYgMHhGRixcbiAgICAgIDB4MDAsIDB4MDEsIDB4MDAsIDB4MDAsIC8vIFByZWZlcnJlZCByYXRlOiAxLjAgICDmjqjojZDmkq3mlL7pgJ/njofvvIzpq5gxNuS9jeWSjOS9jjE25L2N5YiG5Yir5Li65bCP5pWw54K55pW05pWw6YOo5YiG5ZKM5bCP5pWw6YOo5YiG77yM5Y2zWzE2LjE2XSDmoLzlvI/vvIzor6XlgLzkuLoxLjDvvIgweDAwMDEwMDAw77yJ6KGo56S65q2j5bi45YmN5ZCR5pKt5pS+XG4gICAgICAvKipcbiAgICAgICAgICAgICAqIFByZWZlcnJlZFZvbHVtZSgxLjAsIDJieXRlcykgKyByZXNlcnZlZCgyYnl0ZXMpXG4gICAgICAgICAgICAgKiDkuI5yYXRl57G75Ly877yMWzguOF0g5qC85byP77yMMS4w77yIMHgwMTAw77yJ6KGo56S65pyA5aSn6Z+z6YePXG4gICAgICAgICAgICAgKi9cbiAgICAgIDB4MDEsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyAgcmVzZXJ2ZWQ6IDQgKyA0IGJ5dGVz5L+d55WZ5L2NXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMSwgMHgwMCwgMHgwMCwgLy8gLS0tLWJlZ2luIGNvbXBvc2l0aW9uIG1hdHJpeC0tLS1cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyDop4bpopHlj5jmjaLnn6npmLUgICDnur/mgKfku6PmlbBcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAxLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHg0MCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gLS0tLWVuZCBjb21wb3NpdGlvbiBtYXRyaXgtLS0tXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyAtLS0tYmVnaW4gcHJlX2RlZmluZWQgNiAqIDQgYnl0ZXMtLS0tXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcHJlLWRlZmluZWQg5L+d55WZ5L2NXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIC0tLS1lbmQgcHJlX2RlZmluZWQgNiAqIDQgYnl0ZXMtLS0tXG4gICAgICAweEZGLCAweEZGLCAweEZGLCAweEZGIC8vIG5leHRfdHJhY2tfSUQg5LiL5LiA5LiqdHJhY2vkvb/nlKjnmoRpZOWPt1xuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCg4ICsgYnl0ZXMubGVuZ3RoLCAnbXZoZCcsIG5ldyBVaW50OEFycmF5KGJ5dGVzKSlcbiAgfVxuICBzdGF0aWMgdmlkZW9UcmFrIChkYXRhKSB7XG4gICAgbGV0IHNpemUgPSA4XG5cbiAgICBsZXQgdGtoZCA9IEZtcDQudGtoZCh7XG4gICAgICBpZDogMSxcbiAgICAgIGR1cmF0aW9uOiBkYXRhLmR1cmF0aW9uLFxuICAgICAgdGltZXNjYWxlOiBkYXRhLnRpbWVzY2FsZSB8fCAxMDAwLFxuICAgICAgd2lkdGg6IGRhdGEucHJlc2VudFdpZHRoLFxuICAgICAgaGVpZ2h0OiBkYXRhLnByZXNlbnRIZWlnaHQsXG4gICAgICB0eXBlOiAndmlkZW8nXG4gICAgfSlcbiAgICBsZXQgbWRpYSA9IEZtcDQubWRpYSh7XG4gICAgICB0eXBlOiAndmlkZW8nLFxuICAgICAgdGltZXNjYWxlOiBkYXRhLnRpbWVzY2FsZSB8fCAxMDAwLFxuICAgICAgZHVyYXRpb246IGRhdGEuZHVyYXRpb24sXG4gICAgICBhdmNjOiBkYXRhLmF2Y2MsXG4gICAgICBwYXJSYXRpbzogZGF0YS5wYXJSYXRpbyxcbiAgICAgIHdpZHRoOiBkYXRhLnByZXNlbnRXaWR0aCxcbiAgICAgIGhlaWdodDogZGF0YS5wcmVzZW50SGVpZ2h0XG4gICAgfSk7XG4gICAgW3RraGQsIG1kaWFdLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aFxuICAgIH0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveChzaXplLCAndHJhaycsIHRraGQsIG1kaWEpXG4gIH1cbiAgc3RhdGljIGF1ZGlvVHJhayAoZGF0YSkge1xuICAgIGxldCBzaXplID0gOFxuICAgIGxldCB0a2hkID0gRm1wNC50a2hkKHtcbiAgICAgIGlkOiAyLFxuICAgICAgZHVyYXRpb246IGRhdGEuZHVyYXRpb24sXG4gICAgICB0aW1lc2NhbGU6IGRhdGEudGltZXNjYWxlIHx8IDEwMDAsXG4gICAgICB3aWR0aDogMCxcbiAgICAgIGhlaWdodDogMCxcbiAgICAgIHR5cGU6ICdhdWRpbydcbiAgICB9KVxuICAgIGxldCBtZGlhID0gRm1wNC5tZGlhKHtcbiAgICAgIHR5cGU6ICdhdWRpbycsXG4gICAgICB0aW1lc2NhbGU6IGRhdGEudGltZXNjYWxlIHx8IDEwMDAsXG4gICAgICBkdXJhdGlvbjogZGF0YS5kdXJhdGlvbixcbiAgICAgIGNoYW5uZWxDb3VudDogZGF0YS5jaGFubmVsQ291bnQsXG4gICAgICBzYW1wbGVyYXRlOiBkYXRhLnNhbXBsZVJhdGUsXG4gICAgICBjb25maWc6IGRhdGEuY29uZmlnXG4gICAgfSk7XG4gICAgW3RraGQsIG1kaWFdLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aFxuICAgIH0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveChzaXplLCAndHJhaycsIHRraGQsIG1kaWEpXG4gIH1cbiAgc3RhdGljIHRraGQgKGRhdGEpIHtcbiAgICBsZXQgaWQgPSBkYXRhLmlkXG4gICAgbGV0IGR1cmF0aW9uID0gZGF0YS5kdXJhdGlvblxuICAgIGxldCB3aWR0aCA9IGRhdGEud2lkdGhcbiAgICBsZXQgaGVpZ2h0ID0gZGF0YS5oZWlnaHRcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDcsIC8vIHZlcnNpb24oMCkgKyBmbGFncyAx5L2N54mI5pysIGJveOeJiOacrO+8jDDmiJYx77yM5LiA6Iis5Li6MOOAgu+8iOS7peS4i+Wtl+iKguaVsOWdh+aMiXZlcnNpb249MO+8ieaMieS9jeaIluaTjeS9nOe7k+aenOWAvO+8jOmihOWumuS5ieWmguS4i++8mlxuICAgICAgLy8gMHgwMDAwMDEgdHJhY2tfZW5hYmxlZO+8jOWQpuWImeivpXRyYWNr5LiN6KKr5pKt5pS+77ybXG4gICAgICAvLyAweDAwMDAwMiB0cmFja19pbl9tb3ZpZe+8jOihqOekuuivpXRyYWNr5Zyo5pKt5pS+5Lit6KKr5byV55So77ybXG4gICAgICAvLyAweDAwMDAwNCB0cmFja19pbl9wcmV2aWV377yM6KGo56S66K+ldHJhY2vlnKjpooTop4jml7booqvlvJXnlKjjgIJcbiAgICAgIC8vIOS4gOiIrOivpeWAvOS4ujfvvIwxKzIrNCDlpoLmnpzkuIDkuKrlqpLkvZPmiYDmnIl0cmFja+Wdh+acquiuvue9rnRyYWNrX2luX21vdmll5ZKMdHJhY2tfaW5fcHJldmlld++8jOWwhuiiq+eQhuino+S4uuaJgOaciXRyYWNr5Z2H6K6+572u5LqG6L+Z5Lik6aG577yb5a+55LqOaGludCB0cmFja++8jOivpeWAvOS4ujBcbiAgICAgIC8vIGhpbnQgdHJhY2sg6L+Z5Liq54m55q6K55qEdHJhY2vlubbkuI3ljIXlkKvlqpLkvZPmlbDmja7vvIzogIzmmK/ljIXlkKvkuobkuIDkupvlsIblhbbku5bmlbDmja50cmFja+aJk+WMheaIkOa1geWqkuS9k+eahOaMh+ekuuS/oeaBr+OAglxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gY3JlYXRpb25fdGltZeWIm+W7uuaXtumXtO+8iOebuOWvueS6jlVUQ+aXtumXtDE5MDQtMDEtMDHpm7bngrnnmoTnp5LmlbDvvIlcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIG1vZGlmaWNhdGlvbiB0aW1lIOS/ruaUueaXtumXtFxuICAgICAgKGlkID4+PiAyNCkgJiAweEZGLCAvLyB0cmFja19JRDogNCBieXRlcyBpZOWPt++8jOS4jeiDvemHjeWkjeS4lOS4jeiDveS4ujBcbiAgICAgIChpZCA+Pj4gMTYpICYgMHhGRixcbiAgICAgIChpZCA+Pj4gOCkgJiAweEZGLFxuICAgICAgKGlkKSAmIDB4RkYsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZDogNCBieXRlcyAgICDkv53nlZnkvY1cbiAgICAgIChkdXJhdGlvbiA+Pj4gMjQpICYgMHhGRiwgLy8gZHVyYXRpb246IDQgYnl0ZXMgdHJhY2vnmoTml7bpl7Tplb/luqZcbiAgICAgIChkdXJhdGlvbiA+Pj4gMTYpICYgMHhGRixcbiAgICAgIChkdXJhdGlvbiA+Pj4gOCkgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uKSAmIDB4RkYsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZDogMiAqIDQgYnl0ZXMgICAg5L+d55WZ5L2NXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gbGF5ZXIoMmJ5dGVzKSArIGFsdGVybmF0ZV9ncm91cCgyYnl0ZXMpICDop4bpopHlsYLvvIzpu5jorqTkuLow77yM5YC85bCP55qE5Zyo5LiK5bGCLnRyYWNr5YiG57uE5L+h5oGv77yM6buY6K6k5Li6MOihqOekuuivpXRyYWNr5pyq5LiO5YW25LuWdHJhY2vmnInnvqTnu4TlhbPns7tcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHZvbHVtZSgyYnl0ZXMpICsgcmVzZXJ2ZWQoMmJ5dGVzKSAgICBbOC44XSDmoLzlvI/vvIzlpoLmnpzkuLrpn7PpopF0cmFja++8jDEuMO+8iDB4MDEwMO+8ieihqOekuuacgOWkp+mfs+mHj++8m+WQpuWImeS4ujAgICAr5L+d55WZ5L2NXG4gICAgICAweDAwLCAweDAxLCAweDAwLCAweDAwLCAvLyAtLS0tYmVnaW4gY29tcG9zaXRpb24gbWF0cml4LS0tLVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMSwgMHgwMCwgMHgwMCwgLy8g6KeG6aKR5Y+Y5o2i55+p6Zi1XG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDQwLCAweDAwLCAweDAwLCAweDAwLCAvLyAtLS0tZW5kIGNvbXBvc2l0aW9uIG1hdHJpeC0tLS1cbiAgICAgICh3aWR0aCA+Pj4gOCkgJiAweEZGLCAvLyAvL+WuveW6plxuICAgICAgKHdpZHRoKSAmIDB4RkYsXG4gICAgICAweDAwLCAweDAwLFxuICAgICAgKGhlaWdodCA+Pj4gOCkgJiAweEZGLCAvLyDpq5jluqZcbiAgICAgIChoZWlnaHQpICYgMHhGRixcbiAgICAgIDB4MDAsIDB4MDBcbiAgICBdKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goOCArIGNvbnRlbnQuYnl0ZUxlbmd0aCwgJ3RraGQnLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyBlZHRzIChkYXRhKSB7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGxldCBkdXJhdGlvbiA9IGRhdGEuZHVyYXRpb25cbiAgICBsZXQgbWVkaWFUaW1lID0gZGF0YS5tZWRpYVRpbWVcbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKDM2KSwgRm1wNC50eXBlKCdlZHRzJykpXG4gICAgLy8gZWxzdFxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoMjgpLCBGbXA0LnR5cGUoJ2Vsc3QnKSlcbiAgICBidWZmZXIud3JpdGUobmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMSwgLy8gZW50cnkgY291bnRcbiAgICAgIChkdXJhdGlvbiA+PiAyNCkgJiAweGZmLCAoZHVyYXRpb24gPj4gMTYpICYgMHhmZiwgKGR1cmF0aW9uID4+IDgpICYgMHhmZiwgZHVyYXRpb24gJiAweGZmLFxuICAgICAgKG1lZGlhVGltZSA+PiAyNCkgJiAweGZmLCAobWVkaWFUaW1lID4+IDE2KSAmIDB4ZmYsIChtZWRpYVRpbWUgPj4gOCkgJiAweGZmLCBtZWRpYVRpbWUgJiAweGZmLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMSAvLyBtZWRpYSByYXRlXG4gICAgXSkpXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgbWRpYSAoZGF0YSkge1xuICAgIGxldCBzaXplID0gOFxuICAgIGxldCBtZGhkID0gRm1wNC5tZGhkKGRhdGEudGltZXNjYWxlLCBkYXRhLmR1cmF0aW9uKVxuICAgIGxldCBoZGxyID0gRm1wNC5oZGxyKGRhdGEudHlwZSlcbiAgICBsZXQgbWluZiA9IEZtcDQubWluZihkYXRhKTtcbiAgICBbbWRoZCwgaGRsciwgbWluZl0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KHNpemUsICdtZGlhJywgbWRoZCwgaGRsciwgbWluZilcbiAgfVxuICBzdGF0aWMgbWRoZCAodGltZXNjYWxlID0gMTAwMCwgZHVyYXRpb24pIHtcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGNyZWF0aW9uX3RpbWUgICAg5Yib5bu65pe26Ze0XG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBtb2RpZmljYXRpb25fdGltZeS/ruaUueaXtumXtFxuICAgICAgKHRpbWVzY2FsZSA+Pj4gMjQpICYgMHhGRiwgLy8gdGltZXNjYWxlOiA0IGJ5dGVzICAgIOaWh+S7tuWqkuS9k+WcqDHnp5Lml7bpl7TlhoXnmoTliLvluqblgLzvvIzlj6/ku6XnkIbop6PkuLox56eS6ZW/5bqmXG4gICAgICAodGltZXNjYWxlID4+PiAxNikgJiAweEZGLFxuICAgICAgKHRpbWVzY2FsZSA+Pj4gOCkgJiAweEZGLFxuICAgICAgKHRpbWVzY2FsZSkgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uID4+PiAyNCkgJiAweEZGLCAvLyBkdXJhdGlvbjogNCBieXRlcyAgdHJhY2vnmoTml7bpl7Tplb/luqZcbiAgICAgIChkdXJhdGlvbiA+Pj4gMTYpICYgMHhGRixcbiAgICAgIChkdXJhdGlvbiA+Pj4gOCkgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uKSAmIDB4RkYsXG4gICAgICAweDU1LCAweEM0LCAvLyBsYW5ndWFnZTogdW5kICh1bmRldGVybWluZWQpIOWqkuS9k+ivreiogOeggeOAguacgOmrmOS9jeS4ujDvvIzlkI7pnaIxNeS9jeS4ujPkuKrlrZfnrKbvvIjop4FJU08gNjM5LTIvVOagh+WHhuS4reWumuS5ie+8iVxuICAgICAgMHgwMCwgMHgwMCAvLyBwcmVfZGVmaW5lZCA9IDBcbiAgICBdKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTIgKyBjb250ZW50LmJ5dGVMZW5ndGgsICdtZGhkJywgRm1wNC5leHRlbnNpb24oMCwgMCksIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIGhkbHIgKHR5cGUpIHtcbiAgICBsZXQgdmFsdWUgPSBbMHgwMCwgLy8gdmVyc2lvbiAwXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcHJlX2RlZmluZWRcbiAgICAgIDB4NzYsIDB4NjksIDB4NjQsIDB4NjUsIC8vIGhhbmRsZXJfdHlwZTogJ3ZpZGUnXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDU2LCAweDY5LCAweDY0LCAweDY1LFxuICAgICAgMHg2ZiwgMHg0OCwgMHg2MSwgMHg2ZSxcbiAgICAgIDB4NjQsIDB4NmMsIDB4NjUsIDB4NzIsIDB4MDAgLy8gbmFtZTogJ1ZpZGVvSGFuZGxlcidcbiAgICBdXG4gICAgaWYgKHR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgIHZhbHVlLnNwbGljZSg4LCA0LCAuLi5bMHg3MywgMHg2ZiwgMHg3NSwgMHg2ZV0pXG4gICAgICB2YWx1ZS5zcGxpY2UoMjQsIDEzLCAuLi5bMHg1MywgMHg2ZiwgMHg3NSwgMHg2ZSxcbiAgICAgICAgMHg2NCwgMHg0OCwgMHg2MSwgMHg2ZSxcbiAgICAgICAgMHg2NCwgMHg2YywgMHg2NSwgMHg3MiwgMHgwMF0pXG4gICAgfVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goOCArIHZhbHVlLmxlbmd0aCwgJ2hkbHInLCBuZXcgVWludDhBcnJheSh2YWx1ZSkpXG4gIH1cbiAgc3RhdGljIG1pbmYgKGRhdGEpIHtcbiAgICBsZXQgc2l6ZSA9IDhcbiAgICBsZXQgdm1oZCA9IGRhdGEudHlwZSA9PT0gJ3ZpZGVvJyA/IEZtcDQudm1oZCgpIDogRm1wNC5zbWhkKClcbiAgICBsZXQgZGluZiA9IEZtcDQuZGluZigpXG4gICAgbGV0IHN0YmwgPSBGbXA0LnN0YmwoZGF0YSk7XG4gICAgW3ZtaGQsIGRpbmYsIHN0YmxdLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aFxuICAgIH0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveChzaXplLCAnbWluZicsIHZtaGQsIGRpbmYsIHN0YmwpXG4gIH1cbiAgc3RhdGljIHZtaGQgKCkge1xuICAgIHJldHVybiBGbXA0LmluaXRCb3goMjAsICd2bWhkJywgbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgLy8gdmVyc2lvblxuICAgICAgMHgwMCwgMHgwMCwgMHgwMSwgLy8gZmxhZ3NcbiAgICAgIDB4MDAsIDB4MDAsIC8vIGdyYXBoaWNzbW9kZVxuICAgICAgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwIC8vIG9wY29sb3JcbiAgICBdKSlcbiAgfVxuICBzdGF0aWMgc21oZCAoKSB7XG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxNiwgJ3NtaGQnLCBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgLy8gYmFsYW5jZVxuICAgICAgMHgwMCwgMHgwMCAvLyByZXNlcnZlZFxuICAgIF0pKVxuICB9XG4gIHN0YXRpYyBkaW5mICgpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IGRyZWYgPSBbMHgwMCwgLy8gdmVyc2lvbiAwXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMSwgLy8gZW50cnlfY291bnRcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MGMsIC8vIGVudHJ5X3NpemVcbiAgICAgIDB4NzUsIDB4NzIsIDB4NmMsIDB4MjAsIC8vICd1cmwnIHR5cGVcbiAgICAgIDB4MDAsIC8vIHZlcnNpb24gMFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMSAvLyBlbnRyeV9mbGFnc1xuICAgIF1cbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKDM2KSwgRm1wNC50eXBlKCdkaW5mJyksIEZtcDQuc2l6ZSgyOCksIEZtcDQudHlwZSgnZHJlZicpLCBuZXcgVWludDhBcnJheShkcmVmKSlcbiAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlclxuICB9XG4gIHN0YXRpYyBzdGJsIChkYXRhKSB7XG4gICAgbGV0IHNpemUgPSA4XG4gICAgbGV0IHN0c2QgPSBGbXA0LnN0c2QoZGF0YSlcbiAgICBsZXQgc3R0cyA9IEZtcDQuc3R0cygpXG4gICAgbGV0IHN0c2MgPSBGbXA0LnN0c2MoKVxuICAgIGxldCBzdHN6ID0gRm1wNC5zdHN6KClcbiAgICBsZXQgc3RjbyA9IEZtcDQuc3RjbygpO1xuICAgIFtzdHNkLCBzdHRzLCBzdHNjLCBzdHN6LCBzdGNvXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGhcbiAgICB9KVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goc2l6ZSwgJ3N0YmwnLCBzdHNkLCBzdHRzLCBzdHNjLCBzdHN6LCBzdGNvKVxuICB9XG4gIHN0YXRpYyBzdHNkIChkYXRhKSB7XG4gICAgbGV0IGNvbnRlbnRcbiAgICBpZiAoZGF0YS50eXBlID09PSAnYXVkaW8nKSB7XG4gICAgICAvLyBpZiAoIWRhdGEuaXNBQUMgJiYgZGF0YS5jb2RlYyA9PT0gJ21wNCcpIHtcbiAgICAgIC8vICAgICBjb250ZW50ID0gRk1QNC5tcDMoZGF0YSk7XG4gICAgICAvLyB9IGVsc2Uge1xuICAgICAgLy9cbiAgICAgIC8vIH1cbiAgICAgIC8vIOaUr+aMgW1wNGFcbiAgICAgIGNvbnRlbnQgPSBGbXA0Lm1wNGEoZGF0YSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29udGVudCA9IEZtcDQuYXZjMShkYXRhKVxuICAgIH1cbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDE2ICsgY29udGVudC5ieXRlTGVuZ3RoLCAnc3RzZCcsIEZtcDQuZXh0ZW5zaW9uKDAsIDApLCBuZXcgVWludDhBcnJheShbMHgwMCwgMHgwMCwgMHgwMCwgMHgwMV0pLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyBtcDRhIChkYXRhKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIDB4MDEsIC8vIGRhdGFfcmVmZXJlbmNlX2luZGV4XG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIGRhdGEuY2hhbm5lbENvdW50LCAvLyBjaGFubmVsY291bnRcbiAgICAgIDB4MDAsIDB4MTAsIC8vIHNhbXBsZVNpemU6MTZiaXRzXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZDJcbiAgICAgIChkYXRhLnNhbXBsZXJhdGUgPj4gOCkgJiAweGZmLFxuICAgICAgZGF0YS5zYW1wbGVyYXRlICYgMHhmZiwgLy9cbiAgICAgIDB4MDAsIDB4MDBcbiAgICBdKVxuICAgIGxldCBlc2RzID0gRm1wNC5lc2RzKGRhdGEuY29uZmlnKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goOCArIGNvbnRlbnQuYnl0ZUxlbmd0aCArIGVzZHMuYnl0ZUxlbmd0aCwgJ21wNGEnLCBjb250ZW50LCBlc2RzKVxuICB9XG4gIHN0YXRpYyBlc2RzIChjb25maWcgPSBbNDMsIDE0NiwgOCwgMF0pIHtcbiAgICBjb25zdCBjb25maWdsZW4gPSBjb25maWcubGVuZ3RoXG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgLy8gdmVyc2lvbiAwXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuXG4gICAgICAweDAzLCAvLyBkZXNjcmlwdG9yX3R5cGVcbiAgICAgIDB4MTcgKyBjb25maWdsZW4sIC8vIGxlbmd0aFxuICAgICAgMHgwMCwgMHgwMSwgLy8gZXNfaWRcbiAgICAgIDB4MDAsIC8vIHN0cmVhbV9wcmlvcml0eVxuXG4gICAgICAweDA0LCAvLyBkZXNjcmlwdG9yX3R5cGVcbiAgICAgIDB4MGYgKyBjb25maWdsZW4sIC8vIGxlbmd0aFxuICAgICAgMHg0MCwgLy8gY29kZWMgOiBtcGVnNF9hdWRpb1xuICAgICAgMHgxNSwgLy8gc3RyZWFtX3R5cGVcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGJ1ZmZlcl9zaXplXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBtYXhCaXRyYXRlXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBhdmdCaXRyYXRlXG5cbiAgICAgIDB4MDUgLy8gZGVzY3JpcHRvcl90eXBlXG4gICAgXS5jb25jYXQoW2NvbmZpZ2xlbl0pLmNvbmNhdChjb25maWcpLmNvbmNhdChbMHgwNiwgMHgwMSwgMHgwMl0pKVxuICAgIGJ1ZmZlci53cml0ZShGbXA0LnNpemUoOCArIGNvbnRlbnQuYnl0ZUxlbmd0aCksIEZtcDQudHlwZSgnZXNkcycpLCBjb250ZW50KVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIGF2YzEgKGRhdGEpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IHNpemUgPSA0MC8vIDgoYXZjMSkrOChhdmNjKSs4KGJ0cnQpKzE2KHBhc3ApXG4gICAgLy8gbGV0IHNwcyA9IGRhdGEuc3BzXG4gICAgLy8gbGV0IHBwcyA9IGRhdGEucHBzXG4gICAgbGV0IHdpZHRoID0gZGF0YS53aWR0aFxuICAgIGxldCBoZWlnaHQgPSBkYXRhLmhlaWdodFxuICAgIGxldCBoU3BhY2luZyA9IGRhdGEucGFyUmF0aW8uaGVpZ2h0XG4gICAgbGV0IHZTcGFjaW5nID0gZGF0YS5wYXJSYXRpby53aWR0aFxuICAgIC8vIGxldCBhdmNjQnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgLy8gYXZjY0J1ZmZlci53cml0ZShuZXcgVWludDhBcnJheShbXG4gICAgLy8gICAweDAxLCAvLyB2ZXJzaW9uXG4gICAgLy8gICBzcHNbMV0sIC8vIHByb2ZpbGVcbiAgICAvLyAgIHNwc1syXSwgLy8gcHJvZmlsZSBjb21wYXRpYmxlXG4gICAgLy8gICBzcHNbM10sIC8vIGxldmVsXG4gICAgLy8gICAweGZjIHwgMyxcbiAgICAvLyAgIDB4RTAgfCAxIC8vIOebruWJjeWPquWkhOeQhuS4gOS4qnNwc1xuICAgIC8vIF0uY29uY2F0KFtzcHMubGVuZ3RoID4+PiA4ICYgMHhmZiwgc3BzLmxlbmd0aCAmIDB4ZmZdKSkpXG4gICAgLy8gYXZjY0J1ZmZlci53cml0ZShzcHMsIG5ldyBVaW50OEFycmF5KFsxLCBwcHMubGVuZ3RoID4+PiA4ICYgMHhmZiwgcHBzLmxlbmd0aCAmIDB4ZmZdKSwgcHBzKVxuXG4gICAgbGV0IGF2Y2MgPSBkYXRhLmF2Y2NcbiAgICBsZXQgYXZjMSA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMSwgLy8gZGF0YV9yZWZlcmVuY2VfaW5kZXhcbiAgICAgIDB4MDAsIDB4MDAsIC8vIHByZV9kZWZpbmVkXG4gICAgICAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBwcmVfZGVmaW5lZFxuICAgICAgKHdpZHRoID4+IDgpICYgMHhmZixcbiAgICAgIHdpZHRoICYgMHhmZiwgLy8gd2lkdGhcbiAgICAgIChoZWlnaHQgPj4gOCkgJiAweGZmLFxuICAgICAgaGVpZ2h0ICYgMHhmZiwgLy8gaGVpZ2h0XG4gICAgICAweDAwLCAweDQ4LCAweDAwLCAweDAwLCAvLyBob3JpenJlc29sdXRpb25cbiAgICAgIDB4MDAsIDB4NDgsIDB4MDAsIDB4MDAsIC8vIHZlcnRyZXNvbHV0aW9uXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMSwgLy8gZnJhbWVfY291bnRcbiAgICAgIDB4MTIsXG4gICAgICAweDY0LCAweDYxLCAweDY5LCAweDZDLCAvLyBkYWlseW1vdGlvbi9obHMuanNcbiAgICAgIDB4NzksIDB4NkQsIDB4NkYsIDB4NzQsXG4gICAgICAweDY5LCAweDZGLCAweDZFLCAweDJGLFxuICAgICAgMHg2OCwgMHg2QywgMHg3MywgMHgyRSxcbiAgICAgIDB4NkEsIDB4NzMsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGNvbXByZXNzb3JuYW1lXG4gICAgICAweDAwLCAweDE4LCAvLyBkZXB0aCA9IDI0XG4gICAgICAweDExLCAweDExXSkgLy8gcHJlX2RlZmluZWQgPSAtMVxuICAgIGxldCBidHJ0ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgxYywgMHg5YywgMHg4MCwgLy8gYnVmZmVyU2l6ZURCXG4gICAgICAweDAwLCAweDJkLCAweGM2LCAweGMwLCAvLyBtYXhCaXRyYXRlXG4gICAgICAweDAwLCAweDJkLCAweGM2LCAweGMwIC8vIGF2Z0JpdHJhdGVcbiAgICBdKVxuICAgIGxldCBwYXNwID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgKGhTcGFjaW5nID4+IDI0KSwgLy8gaFNwYWNpbmdcbiAgICAgIChoU3BhY2luZyA+PiAxNikgJiAweGZmLFxuICAgICAgKGhTcGFjaW5nID4+IDgpICYgMHhmZixcbiAgICAgIGhTcGFjaW5nICYgMHhmZixcbiAgICAgICh2U3BhY2luZyA+PiAyNCksIC8vIHZTcGFjaW5nXG4gICAgICAodlNwYWNpbmcgPj4gMTYpICYgMHhmZixcbiAgICAgICh2U3BhY2luZyA+PiA4KSAmIDB4ZmYsXG4gICAgICB2U3BhY2luZyAmIDB4ZmZcbiAgICBdKVxuXG4gICAgYnVmZmVyLndyaXRlKFxuICAgICAgRm1wNC5zaXplKHNpemUgKyBhdmMxLmJ5dGVMZW5ndGggKyBhdmNjLmJ5dGVMZW5ndGggKyBidHJ0LmJ5dGVMZW5ndGgpLCBGbXA0LnR5cGUoJ2F2YzEnKSwgYXZjMSxcbiAgICAgIEZtcDQuc2l6ZSg4ICsgYXZjYy5ieXRlTGVuZ3RoKSwgRm1wNC50eXBlKCdhdmNDJyksIGF2Y2MsXG4gICAgICBGbXA0LnNpemUoMjApLCBGbXA0LnR5cGUoJ2J0cnQnKSwgYnRydCxcbiAgICAgIEZtcDQuc2l6ZSgxNiksIEZtcDQudHlwZSgncGFzcCcpLCBwYXNwXG4gICAgKVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIHN0dHMgKCkge1xuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgLy8gdmVyc2lvblxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAgLy8gZW50cnlfY291bnRcbiAgICBdKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTYsICdzdHRzJywgY29udGVudClcbiAgfVxuICBzdGF0aWMgc3RzYyAoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCAvLyBlbnRyeV9jb3VudFxuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxNiwgJ3N0c2MnLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyBzdGNvICgpIHtcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIC8vIHZlcnNpb25cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwIC8vIGVudHJ5X2NvdW50XG4gICAgXSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDE2LCAnc3RjbycsIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIHN0c3ogKCkge1xuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgLy8gdmVyc2lvblxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHNhbXBsZV9zaXplXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwIC8vIHNhbXBsZV9jb3VudFxuICAgIF0pXG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgyMCwgJ3N0c3onLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyBtdmV4IChkdXJhdGlvbiwgdGltZXNjYWxlID0gMTAwMCwgdHJhY2tJRCkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgbWVoZCA9IEJ1ZmZlci53cml0ZVVpbnQzMihkdXJhdGlvbilcbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKDU2KSwgRm1wNC50eXBlKCdtdmV4JyksIEZtcDQuc2l6ZSgxNiksIEZtcDQudHlwZSgnbWVoZCcpLCBGbXA0LmV4dGVuc2lvbigwLCAwKSwgbWVoZCwgRm1wNC50cmV4KHRyYWNrSUQpKVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIHRyZXggKGlkKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uIDBcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAoaWQgPj4gMjQpLFxuICAgICAgKGlkID4+IDE2KSAmIDB4ZmYsXG4gICAgICAoaWQgPj4gOCkgJiAweGZmLFxuICAgICAgKGlkICYgMHhmZiksIC8vIHRyYWNrX0lEXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAxLCAvLyBkZWZhdWx0X3NhbXBsZV9kZXNjcmlwdGlvbl9pbmRleFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZGVmYXVsdF9zYW1wbGVfZHVyYXRpb25cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGRlZmF1bHRfc2FtcGxlX3NpemVcbiAgICAgIDB4MDAsIDB4MDEsIDB4MDAsIDB4MDEgLy8gZGVmYXVsdF9zYW1wbGVfZmxhZ3NcbiAgICBdKVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goOCArIGNvbnRlbnQuYnl0ZUxlbmd0aCwgJ3RyZXgnLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyBtb29mIChkYXRhKSB7XG4gICAgbGV0IHNpemUgPSA4XG4gICAgbGV0IG1maGQgPSBGbXA0Lm1maGQoKVxuICAgIGxldCB0cmFmID0gRm1wNC50cmFmKGRhdGEpO1xuICAgIFttZmhkLCB0cmFmXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGhcbiAgICB9KVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goc2l6ZSwgJ21vb2YnLCBtZmhkLCB0cmFmKVxuICB9XG4gIHN0YXRpYyBtZmhkICgpIHtcbiAgICBsZXQgY29udGVudCA9IEJ1ZmZlci53cml0ZVVpbnQzMihGbXA0LnNlcXVlbmNlKVxuICAgIEZtcDQuc2VxdWVuY2UgKz0gMVxuICAgIHJldHVybiBGbXA0LmluaXRCb3goMTYsICdtZmhkJywgRm1wNC5leHRlbnNpb24oMCwgMCksIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIHRyYWYgKGRhdGEpIHtcbiAgICBsZXQgc2l6ZSA9IDhcbiAgICBsZXQgdGZoZCA9IEZtcDQudGZoZChkYXRhLmlkKVxuICAgIGxldCB0ZmR0ID0gRm1wNC50ZmR0KGRhdGEudGltZSlcbiAgICBsZXQgc2R0cCA9IEZtcDQuc2R0cChkYXRhKVxuICAgIGxldCB0cnVuID0gRm1wNC50cnVuKGRhdGEsIHNkdHAuYnl0ZUxlbmd0aCk7XG5cbiAgICBbdGZoZCwgdGZkdCwgdHJ1biwgc2R0cF0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KHNpemUsICd0cmFmJywgdGZoZCwgdGZkdCwgdHJ1biwgc2R0cClcbiAgfVxuICBzdGF0aWMgdGZoZCAoaWQpIHtcbiAgICBsZXQgY29udGVudCA9IEJ1ZmZlci53cml0ZVVpbnQzMihpZClcbiAgICByZXR1cm4gRm1wNC5pbml0Qm94KDE2LCAndGZoZCcsIEZtcDQuZXh0ZW5zaW9uKDAsIDApLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyB0ZmR0ICh0aW1lKSB7XG4gICAgLy8gbGV0IHVwcGVyID0gTWF0aC5mbG9vcih0aW1lIC8gKFVJTlQzMl9NQVggKyAxKSksXG4gICAgLy8gICAgIGxvd2VyID0gTWF0aC5mbG9vcih0aW1lICUgKFVJTlQzMl9NQVggKyAxKSk7XG4gICAgcmV0dXJuIEZtcDQuaW5pdEJveCgxNiwgJ3RmZHQnLCBGbXA0LmV4dGVuc2lvbigwLCAwKSwgQnVmZmVyLndyaXRlVWludDMyKHRpbWUpKVxuICB9XG4gIHN0YXRpYyB0cnVuIChkYXRhLCBzZHRwTGVuZ3RoKSB7XG4gICAgLy8gbGV0IGlkID0gZGF0YS5pZDtcbiAgICAvLyBsZXQgY2VpbCA9IGlkID09PSAxID8gMTYgOiAxMjtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IHNhbXBsZUNvdW50ID0gQnVmZmVyLndyaXRlVWludDMyKGRhdGEuc2FtcGxlcy5sZW5ndGgpXG4gICAgLy8gbWRhdC1oZWFkZXIgOFxuICAgIC8vIG1vb2YtaGVhZGVyIDhcbiAgICAvLyBtZmhkIDE2XG4gICAgLy8gdHJhZi1oZWFkZXIgOFxuICAgIC8vIHRoaGQgMTZcbiAgICAvLyB0ZmR0IDIwXG4gICAgLy8gdHJ1bi1oZWFkZXIgMTJcbiAgICAvLyBzYW1wbGVDb3VudCA0XG4gICAgLy8gZGF0YS1vZmZzZXQgNFxuICAgIC8vIHNhbXBsZXMubGVuZ3RoXG4gICAgbGV0IG9mZnNldCA9IEJ1ZmZlci53cml0ZVVpbnQzMig4ICsgOCArIDE2ICsgOCArIDE2ICsgMTYgKyAxMiArIDQgKyA0ICsgMTYgKiBkYXRhLnNhbXBsZXMubGVuZ3RoICsgc2R0cExlbmd0aClcbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKDIwICsgMTYgKiBkYXRhLnNhbXBsZXMubGVuZ3RoKSwgRm1wNC50eXBlKCd0cnVuJyksIG5ldyBVaW50OEFycmF5KFsweDAwLCAweDAwLCAweDBGLCAweDAxXSksIHNhbXBsZUNvdW50LCBvZmZzZXQpXG5cbiAgICAvLyBsZXQgc2l6ZSA9IGJ1ZmZlci5idWZmZXIuYnl0ZUxlbmd0aFxuICAgIC8vIGxldCB3cml0ZU9mZnNldCA9IDBcbiAgICAvLyBkYXRhLnNhbXBsZXMuZm9yRWFjaCgoKSA9PiB7XG4gICAgLy8gICBzaXplICs9IDE2XG4gICAgLy8gfSlcbiAgICAvL1xuICAgIC8vIGxldCB0cnVuQm94ID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSlcblxuICAgIC8vIHRydW5Cb3guc2V0KGJ1ZmZlci5idWZmZXIsIDApXG5cbiAgICBkYXRhLnNhbXBsZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgZmxhZ3MgPSBpdGVtLmZsYWdzXG4gICAgICAvLyBjb25zb2xlLmxvZyhpdGVtLnR5cGUsIGl0ZW0uZHRzLCBpdGVtLmR1cmF0aW9uKVxuXG4gICAgICBidWZmZXIud3JpdGUobmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAoaXRlbS5kdXJhdGlvbiA+Pj4gMjQpICYgMHhGRiwgLy8gc2FtcGxlX2R1cmF0aW9uXG4gICAgICAgIChpdGVtLmR1cmF0aW9uID4+PiAxNikgJiAweEZGLFxuICAgICAgICAoaXRlbS5kdXJhdGlvbiA+Pj4gOCkgJiAweEZGLFxuICAgICAgICAoaXRlbS5kdXJhdGlvbikgJiAweEZGLFxuICAgICAgICAoaXRlbS5zaXplID4+PiAyNCkgJiAweEZGLCAvLyBzYW1wbGVfc2l6ZVxuICAgICAgICAoaXRlbS5zaXplID4+PiAxNikgJiAweEZGLFxuICAgICAgICAoaXRlbS5zaXplID4+PiA4KSAmIDB4RkYsXG4gICAgICAgIChpdGVtLnNpemUpICYgMHhGRixcbiAgICAgICAgKGZsYWdzLmlzTGVhZGluZyA8PCAyKSB8IGZsYWdzLmRlcGVuZHNPbiwgLy8gc2FtcGxlX2ZsYWdzXG4gICAgICAgIChmbGFncy5pc0RlcGVuZGVkT24gPDwgNikgfCAoZmxhZ3MuaGFzUmVkdW5kYW5jeSA8PCA0KSB8IGZsYWdzLmlzTm9uU3luYyxcbiAgICAgICAgMHgwMCwgMHgwMCwgLy8gc2FtcGxlX2RlZ3JhZGF0aW9uX3ByaW9yaXR5XG4gICAgICAgIChpdGVtLmN0cyA+Pj4gMjQpICYgMHhGRiwgLy8gc2FtcGxlX2NvbXBvc2l0aW9uX3RpbWVfb2Zmc2V0XG4gICAgICAgIChpdGVtLmN0cyA+Pj4gMTYpICYgMHhGRixcbiAgICAgICAgKGl0ZW0uY3RzID4+PiA4KSAmIDB4RkYsXG4gICAgICAgIChpdGVtLmN0cykgJiAweEZGXG4gICAgICBdKSlcbiAgICAgIC8vIHdyaXRlT2Zmc2V0ICs9IDE2XG4gICAgICAvLyBidWZmZXIud3JpdGUoQnVmZmVyLndyaXRlVWludDMyKDApKTtcbiAgICB9KVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIHNkdHAgKGRhdGEpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgYnVmZmVyLndyaXRlKEZtcDQuc2l6ZSgxMiArIGRhdGEuc2FtcGxlcy5sZW5ndGgpLCBGbXA0LnR5cGUoJ3NkdHAnKSwgRm1wNC5leHRlbnNpb24oMCwgMCkpXG4gICAgZGF0YS5zYW1wbGVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBjb25zdCBmbGFncyA9IGl0ZW0uZmxhZ3NcbiAgICAgIGNvbnN0IG51bSA9IChmbGFncy5pc0xlYWRpbmcgPDwgNikgfCAvLyBpc19sZWFkaW5nOiAyIChiaXQpXG4gICAgICAgIChmbGFncy5kZXBlbmRzT24gPDwgNCkgfCAvLyBzYW1wbGVfZGVwZW5kc19vblxuICAgICAgICAoZmxhZ3MuaXNEZXBlbmRlZE9uIDw8IDIpIHwgLy8gc2FtcGxlX2lzX2RlcGVuZGVkX29uXG4gICAgICAgIChmbGFncy5oYXNSZWR1bmRhbmN5KS8vIHNhbXBsZV9oYXNfcmVkdW5kYW5jeVxuXG4gICAgICBidWZmZXIud3JpdGUobmV3IFVpbnQ4QXJyYXkoW251bV0pKVxuICAgIH0pXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgbWRhdCAoZGF0YSkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgc2l6ZSA9IDhcbiAgICBkYXRhLnNhbXBsZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5zaXplXG4gICAgfSlcbiAgICBidWZmZXIud3JpdGUoRm1wNC5zaXplKHNpemUpLCBGbXA0LnR5cGUoJ21kYXQnKSlcbiAgICBsZXQgbWRhdEJveCA9IG5ldyBVaW50OEFycmF5KHNpemUpXG4gICAgbGV0IG9mZnNldCA9IDBcbiAgICBtZGF0Qm94LnNldChidWZmZXIuYnVmZmVyLCBvZmZzZXQpXG4gICAgb2Zmc2V0ICs9IDhcbiAgICBkYXRhLnNhbXBsZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGl0ZW0uYnVmZmVyLmZvckVhY2goKHVuaXQpID0+IHtcbiAgICAgICAgbWRhdEJveC5zZXQodW5pdCwgb2Zmc2V0KVxuICAgICAgICBvZmZzZXQgKz0gdW5pdC5ieXRlTGVuZ3RoXG4gICAgICAgIC8vIGJ1ZmZlci53cml0ZSh1bml0LmRhdGEpO1xuICAgICAgfSlcbiAgICB9KVxuICAgIHJldHVybiBtZGF0Qm94XG4gIH1cbn1cbkZtcDQudHlwZSA9IChuYW1lKSA9PiB7XG4gIHJldHVybiBuZXcgVWludDhBcnJheShbbmFtZS5jaGFyQ29kZUF0KDApLCBuYW1lLmNoYXJDb2RlQXQoMSksIG5hbWUuY2hhckNvZGVBdCgyKSwgbmFtZS5jaGFyQ29kZUF0KDMpXSlcbn1cbkZtcDQuc2VxdWVuY2UgPSAxXG5cbmV4cG9ydCBkZWZhdWx0IEZtcDRcbiIsImltcG9ydCB7XG4gIEVWRU5UUyxcbiAgc25pZmZlcixcbiAgTWVkaWFTZWdtZW50TGlzdCxcbiAgQnVmZmVyXG59IGZyb20gJ3hncGxheWVyLXV0aWxzJztcbmltcG9ydCBGbXA0IGZyb20gJy4vZm1wNCdcblxuY29uc3QgUkVNVVhfRVZFTlRTID0gRVZFTlRTLlJFTVVYX0VWRU5UU1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNcDRSZW11eGVyIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuX2R0c0Jhc2UgPSAwXG4gICAgdGhpcy5faXNEdHNCYXNlSW5pdGVkID0gZmFsc2VcbiAgICB0aGlzLl9hdWRpb05leHREdHMgPSBudWxsXG4gICAgdGhpcy5fdmlkZW9OZXh0RHRzID0gbnVsbFxuICAgIHRoaXMuX3ZpZGVvU2VnbWVudExpc3QgPSBuZXcgTWVkaWFTZWdtZW50TGlzdCgndmlkZW8nKVxuICAgIHRoaXMuX2F1ZGlvU2VnbWVudExpc3QgPSBuZXcgTWVkaWFTZWdtZW50TGlzdCgnYXVkaW8nKVxuICAgIGNvbnN0IHticm93c2VyfSA9IHNuaWZmZXJcbiAgICB0aGlzLl9maWxsU2lsZW5jZUZyYW1lID0gYnJvd3NlciA9PT0gJ2llJ1xuXG4gICAgdGhpcy5pc0ZpcnN0VmlkZW8gPSB0cnVlXG4gICAgdGhpcy5pc0ZpcnN0QXVkaW8gPSB0cnVlXG5cbiAgICB0aGlzLnZpZGVvQWxsRHVyYXRpb24gPSAwXG4gICAgdGhpcy5hdWRpb0FsbER1cmF0aW9uID0gMFxuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgdGhpcy5vbihSRU1VWF9FVkVOVFMuUkVNVVhfTUVESUEsIHRoaXMucmVtdXguYmluZCh0aGlzKSlcbiAgICB0aGlzLm9uKFJFTVVYX0VWRU5UUy5SRU1VWF9NRVRBREFUQSwgdGhpcy5vbk1ldGFEYXRhUmVhZHkuYmluZCh0aGlzKSlcbiAgICB0aGlzLm9uKFJFTVVYX0VWRU5UUy5ERVRFQ1RfQ0hBTkdFX1NUUkVBTSwgdGhpcy5yZXNldER0c0Jhc2UuYmluZCh0aGlzKSlcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuX2R0c0Jhc2UgPSAtMVxuICAgIHRoaXMuX2R0c0Jhc2VJbml0ZWQgPSBmYWxzZVxuICAgIHRoaXMuX3ZpZGVvTmV4dER0cyA9IG51bGxcbiAgICB0aGlzLl9hdWRpb05leHREdHMgPSBudWxsXG4gICAgdGhpcy5fdmlkZW9TZWdtZW50TGlzdC5jbGVhcigpXG4gICAgdGhpcy5fYXVkaW9TZWdtZW50TGlzdC5jbGVhcigpXG4gICAgdGhpcy5fdmlkZW9TZWdtZW50TGlzdCA9IG51bGxcbiAgICB0aGlzLl9hdWRpb1NlZ21lbnRMaXN0ID0gbnVsbFxuICB9XG5cbiAgcmVtdXggKCkge1xuICAgIGNvbnN0IHsgYXVkaW9UcmFjaywgdmlkZW9UcmFjayB9ID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJylcbiAgICAhdGhpcy5faXNEdHNCYXNlSW5pdGVkICYmIHRoaXMuY2FsY0R0c0Jhc2UoYXVkaW9UcmFjaywgdmlkZW9UcmFjaylcblxuICAgIHRoaXMuX3JlbXV4VmlkZW8odmlkZW9UcmFjaylcbiAgICB0aGlzLl9yZW11eEF1ZGlvKGF1ZGlvVHJhY2spXG4gIH1cblxuICByZXNldER0c0Jhc2UgKCkge1xuICAgIC8vIGZvciBobHMg5Lit6YCU5YiH5o2iIG1ldGHlkI5zZWVrXG4gICAgdGhpcy5fZHRzQmFzZSA9IDBcbiAgICB0aGlzLl9kdHNCYXNlSW5pdGVkID0gZmFsc2VcbiAgfVxuXG4gIHNlZWsgKCkge1xuICAgIHRoaXMuX3ZpZGVvTmV4dER0cyA9IG51bGxcbiAgICB0aGlzLl9hdWRpb05leHREdHMgPSBudWxsXG4gICAgdGhpcy5fdmlkZW9TZWdtZW50TGlzdC5jbGVhcigpXG4gICAgdGhpcy5fYXVkaW9TZWdtZW50TGlzdC5jbGVhcigpXG4gIH1cblxuICBvbk1ldGFEYXRhUmVhZHkgKHR5cGUpIHtcbiAgICBsZXQgdHJhY2tcblxuICAgIGlmICh0eXBlID09PSAnYXVkaW8nKSB7XG4gICAgICBjb25zdCB7IGF1ZGlvVHJhY2sgfSA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpXG4gICAgICB0cmFjayA9IGF1ZGlvVHJhY2s7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHsgdmlkZW9UcmFjayB9ID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJylcbiAgICAgIHRyYWNrID0gdmlkZW9UcmFjaztcbiAgICB9XG5cbiAgICBsZXQgcHJlc291cmNlYnVmZmVyID0gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnUFJFX1NPVVJDRV9CVUZGRVInKTtcbiAgICBsZXQgc291cmNlID0gcHJlc291cmNlYnVmZmVyLmdldFNvdXJjZSh0eXBlKTtcbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgc291cmNlID0gcHJlc291cmNlYnVmZmVyLmNyZWF0ZVNvdXJjZSh0eXBlKTtcbiAgICB9XG5cbiAgICBzb3VyY2UubWltZXR5cGUgPSB0cmFjay5tZXRhLmNvZGVjO1xuICAgIHNvdXJjZS5pbml0ID0gdGhpcy5yZW11eEluaXRTZWdtZW50KHR5cGUsIHRyYWNrLm1ldGEpO1xuICAgIC8vIHNvdXJjZS5pbml0ZWQgPSBmYWxzZTtcblxuICAgIC8vIHRoaXMucmVzZXREdHNCYXNlKClcbiAgICB0aGlzLmVtaXQoUkVNVVhfRVZFTlRTLklOSVRfU0VHTUVOVCwgdHlwZSlcbiAgfVxuXG4gIHJlbXV4SW5pdFNlZ21lbnQgKHR5cGUsIG1ldGEpIHtcbiAgICBsZXQgaW5pdFNlZ21lbnQgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgZnR5cCA9IEZtcDQuZnR5cCgpXG4gICAgbGV0IG1vb3YgPSBGbXA0Lm1vb3YoeyB0eXBlLCBtZXRhOiBtZXRhIH0pXG5cbiAgICBpbml0U2VnbWVudC53cml0ZShmdHlwLCBtb292KVxuICAgIHJldHVybiBpbml0U2VnbWVudDtcbiAgfVxuXG4gIGNhbGNEdHNCYXNlIChhdWRpb1RyYWNrLCB2aWRlb1RyYWNrKSB7XG4gICAgaWYgKCFhdWRpb1RyYWNrLnNhbXBsZXMubGVuZ3RoICYmICF2aWRlb1RyYWNrLnNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGF1ZGlvQmFzZSA9IEluZmluaXR5XG4gICAgbGV0IHZpZGVvQmFzZSA9IEluZmluaXR5XG5cbiAgICBpZiAoYXVkaW9UcmFjay5zYW1wbGVzICYmIGF1ZGlvVHJhY2suc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIGF1ZGlvQmFzZSA9IGF1ZGlvVHJhY2suc2FtcGxlc1swXS5kdHNcbiAgICB9XG4gICAgaWYgKHZpZGVvVHJhY2suc2FtcGxlcyAmJiB2aWRlb1RyYWNrLnNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICB2aWRlb0Jhc2UgPSB2aWRlb1RyYWNrLnNhbXBsZXNbMF0uZHRzXG4gICAgfVxuXG4gICAgdGhpcy5fZHRzQmFzZSA9IE1hdGgubWluKGF1ZGlvQmFzZSwgdmlkZW9CYXNlKVxuICAgIHRoaXMuX2lzRHRzQmFzZUluaXRlZCA9IHRydWVcbiAgfVxuXG4gIF9yZW11eFZpZGVvICh2aWRlb1RyYWNrKSB7XG4gICAgY29uc3QgdHJhY2sgPSB2aWRlb1RyYWNrXG5cbiAgICBpZiAoIXZpZGVvVHJhY2suc2FtcGxlcyB8fCAhdmlkZW9UcmFjay5zYW1wbGVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IHtzYW1wbGVzfSA9IHRyYWNrXG4gICAgbGV0IGZpcnN0RHRzID0gLTFcblxuICAgIGxldCBpbml0U2VnbWVudCA9IG51bGxcbiAgICBjb25zdCBtcDRTYW1wbGVzID0gW11cbiAgICBjb25zdCBtZGF0Qm94ID0ge1xuICAgICAgc2FtcGxlczogW11cbiAgICB9XG5cbiAgICBsZXQgbWF4TG9vcCA9IDEwMDAwXG4gICAgd2hpbGUgKHNhbXBsZXMubGVuZ3RoICYmIG1heExvb3AtLSA+IDApIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdtYXJrMicpXG4gICAgICBjb25zdCBhdmNTYW1wbGUgPSBzYW1wbGVzLnNoaWZ0KClcblxuICAgICAgY29uc3QgeyBpc0tleWZyYW1lLCBvcHRpb25zIH0gPSBhdmNTYW1wbGVcbiAgICAgIGlmICghdGhpcy5pc0ZpcnN0QXVkaW8gJiYgb3B0aW9ucyAmJiBvcHRpb25zLm1ldGEpIHtcbiAgICAgICAgaW5pdFNlZ21lbnQgPSB0aGlzLnJlbXV4SW5pdFNlZ21lbnQoJ3ZpZGVvJywgb3B0aW9ucy5tZXRhKVxuICAgICAgICBvcHRpb25zLm1ldGEgPSBudWxsXG4gICAgICAgIHNhbXBsZXMudW5zaGlmdChhdmNTYW1wbGUpXG4gICAgICAgIGlmICghb3B0aW9ucy5pc0NvbnRpbnVlKSB7XG4gICAgICAgICAgdGhpcy5yZXNldER0c0Jhc2UoKVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBsZXQgZHRzID0gYXZjU2FtcGxlLmR0cyAtIHRoaXMuX2R0c0Jhc2VcblxuICAgICAgaWYgKGZpcnN0RHRzID09PSAtMSkge1xuICAgICAgICBmaXJzdER0cyA9IGR0c1xuICAgICAgfVxuXG4gICAgICBsZXQgY3RzXG4gICAgICBsZXQgcHRzXG4gICAgICBpZiAoYXZjU2FtcGxlLnB0cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHB0cyA9IGF2Y1NhbXBsZS5wdHMgLSB0aGlzLl9kdHNCYXNlXG4gICAgICAgIGN0cyA9IHB0cyAtIGR0c1xuICAgICAgfVxuICAgICAgaWYgKGF2Y1NhbXBsZS5jdHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwdHMgPSBhdmNTYW1wbGUuY3RzICsgZHRzXG4gICAgICAgIGN0cyA9IGF2Y1NhbXBsZS5jdHNcbiAgICAgIH1cblxuICAgICAgbGV0IG1kYXRTYW1wbGUgPSB7XG4gICAgICAgIGJ1ZmZlcjogW10sXG4gICAgICAgIHNpemU6IDBcbiAgICAgIH1cbiAgICAgIG1kYXRCb3guc2FtcGxlcy5wdXNoKG1kYXRTYW1wbGUpXG4gICAgICBtZGF0U2FtcGxlLmJ1ZmZlci5wdXNoKGF2Y1NhbXBsZS5kYXRhKVxuICAgICAgbWRhdFNhbXBsZS5zaXplICs9IGF2Y1NhbXBsZS5kYXRhLmJ5dGVMZW5ndGhcblxuICAgICAgbGV0IHNhbXBsZUR1cmF0aW9uID0gMFxuICAgICAgaWYgKGF2Y1NhbXBsZS5kdXJhdGlvbikge1xuICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IGF2Y1NhbXBsZS5kdXJhdGlvbjtcbiAgICAgIH0gZWxzZSBpZiAoc2FtcGxlcy5sZW5ndGggPj0gMSkge1xuICAgICAgICBjb25zdCBuZXh0RHRzID0gc2FtcGxlc1swXS5kdHMgLSB0aGlzLl9kdHNCYXNlXG4gICAgICAgIHNhbXBsZUR1cmF0aW9uID0gbmV4dER0cyAtIGR0c1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG1wNFNhbXBsZXMubGVuZ3RoID49IDEpIHsgLy8gbGFzdGVzdCBzYW1wbGUsIHVzZSBzZWNvbmQgbGFzdCBkdXJhdGlvblxuICAgICAgICAgIHNhbXBsZUR1cmF0aW9uID0gbXA0U2FtcGxlc1ttcDRTYW1wbGVzLmxlbmd0aCAtIDFdLmR1cmF0aW9uXG4gICAgICAgIH0gZWxzZSB7IC8vIHRoZSBvbmx5IG9uZSBzYW1wbGUsIHVzZSByZWZlcmVuY2UgZHVyYXRpb25cbiAgICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IHRoaXMudmlkZW9NZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMudmlkZW9BbGxEdXJhdGlvbiArPSBzYW1wbGVEdXJhdGlvblxuICAgICAgLy8gY29uc29sZS5sb2coYGR0cyAke2R0c31gLCBgcHRzICR7cHRzfWAsIGlzS2V5ZnJhbWUsIGBkdXJhdGlvbiAke3NhbXBsZUR1cmF0aW9ufWApXG4gICAgICBtcDRTYW1wbGVzLnB1c2goe1xuICAgICAgICBkdHMsXG4gICAgICAgIGN0cyxcbiAgICAgICAgcHRzLFxuICAgICAgICBkYXRhOiBhdmNTYW1wbGUuZGF0YSxcbiAgICAgICAgc2l6ZTogYXZjU2FtcGxlLmRhdGEuYnl0ZUxlbmd0aCxcbiAgICAgICAgaXNLZXlmcmFtZSxcbiAgICAgICAgZHVyYXRpb246IHNhbXBsZUR1cmF0aW9uLFxuICAgICAgICBmbGFnczoge1xuICAgICAgICAgIGlzTGVhZGluZzogMCxcbiAgICAgICAgICBkZXBlbmRzT246IGlzS2V5ZnJhbWUgPyAyIDogMSxcbiAgICAgICAgICBpc0RlcGVuZGVkT246IGlzS2V5ZnJhbWUgPyAxIDogMCxcbiAgICAgICAgICBoYXNSZWR1bmRhbmN5OiAwLFxuICAgICAgICAgIGlzTm9uU3luYzogaXNLZXlmcmFtZSA/IDAgOiAxXG4gICAgICAgIH0sXG4gICAgICAgIG9yaWdpbkR0czogZHRzLFxuICAgICAgICB0eXBlOiAndmlkZW8nXG4gICAgICB9KVxuXG4gICAgICBpZiAoaXNLZXlmcmFtZSkge1xuICAgICAgICB0aGlzLmVtaXQoUkVNVVhfRVZFTlRTLlJBTkRPTV9BQ0NFU1NfUE9JTlQsIHB0cylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgbW9vZk1kYXQgPSBuZXcgQnVmZmVyKClcbiAgICBpZiAobXA0U2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IG1vb2YgPSBGbXA0Lm1vb2Yoe1xuICAgICAgICBpZDogdHJhY2subWV0YS5pZCxcbiAgICAgICAgdGltZTogZmlyc3REdHMsXG4gICAgICAgIHNhbXBsZXM6IG1wNFNhbXBsZXNcbiAgICAgIH0pXG4gICAgICBjb25zdCBtZGF0ID0gRm1wNC5tZGF0KG1kYXRCb3gpXG4gICAgICBtb29mTWRhdC53cml0ZShtb29mLCBtZGF0KVxuXG4gICAgICB0aGlzLndyaXRlVG9Tb3VyY2UoJ3ZpZGVvJywgbW9vZk1kYXQpXG4gICAgfVxuXG4gICAgaWYgKGluaXRTZWdtZW50KSB7XG4gICAgICB0aGlzLndyaXRlVG9Tb3VyY2UoJ3ZpZGVvJywgaW5pdFNlZ21lbnQpXG5cbiAgICAgIGlmIChzYW1wbGVzLmxlbmd0aCkge1xuICAgICAgICAvLyBzZWNvbmQgcGFydCBvZiBzdHJlYW0gY2hhbmdlXG4gICAgICAgIHRyYWNrLnNhbXBsZXMgPSBzYW1wbGVzO1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVtdXhWaWRlbyh0cmFjaylcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmlzRmlyc3RWaWRlbyA9IGZhbHNlXG4gICAgdGhpcy5lbWl0KFJFTVVYX0VWRU5UUy5NRURJQV9TRUdNRU5ULCAndmlkZW8nKVxuXG4gICAgY29uc3QgbGFzdFNhbXBsZSA9IG1wNFNhbXBsZXNbbXA0U2FtcGxlcy5sZW5ndGggLSAxXVxuICAgIHRoaXMuX3ZpZGVvTmV4dER0cyA9IGxhc3RTYW1wbGUuZHRzICsgbGFzdFNhbXBsZS5kdXJhdGlvbjtcbiAgICB0cmFjay5zYW1wbGVzID0gW11cbiAgICB0cmFjay5sZW5ndGggPSAwXG4gIH1cblxuICBfcmVtdXhBdWRpbyAodHJhY2spIHtcbiAgICBjb25zdCB7c2FtcGxlc30gPSB0cmFja1xuICAgIGxldCBmaXJzdER0cyA9IC0xXG4gICAgbGV0IG1wNFNhbXBsZXMgPSBbXVxuXG4gICAgbGV0IGluaXRTZWdtZW50ID0gbnVsbFxuICAgIGNvbnN0IG1kYXRCb3ggPSB7XG4gICAgICBzYW1wbGVzOiBbXVxuICAgIH1cbiAgICBpZiAoIXNhbXBsZXMgfHwgIXNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgbWF4TG9vcCA9IDEwMDAwXG4gICAgbGV0IGlzRmlyc3REdHNJbml0ZWQgPSBmYWxzZVxuICAgIHdoaWxlIChzYW1wbGVzLmxlbmd0aCAmJiBtYXhMb29wLS0gPiAwKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnbWFyazMnKVxuICAgICAgbGV0IHNhbXBsZSA9IHNhbXBsZXMuc2hpZnQoKVxuICAgICAgY29uc3QgeyBkYXRhLCBvcHRpb25zIH0gPSBzYW1wbGVcbiAgICAgIGlmICghdGhpcy5pc0ZpcnN0QXVkaW8gJiYgb3B0aW9ucyAmJiBvcHRpb25zLm1ldGEpIHtcbiAgICAgICAgaW5pdFNlZ21lbnQgPSB0aGlzLnJlbXV4SW5pdFNlZ21lbnQoJ2F1ZGlvJywgb3B0aW9ucy5tZXRhKVxuICAgICAgICBvcHRpb25zLm1ldGEgPSBudWxsO1xuICAgICAgICBzYW1wbGVzLnVuc2hpZnQoc2FtcGxlKVxuICAgICAgICBpZiAoIW9wdGlvbnMuaXNDb250aW51ZSkge1xuICAgICAgICAgIHRoaXMucmVzZXREdHNCYXNlKClcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgbGV0IGR0cyA9IHNhbXBsZS5kdHMgLSB0aGlzLl9kdHNCYXNlXG4gICAgICBjb25zdCBvcmlnaW5EdHMgPSBkdHNcbiAgICAgIGlmICghaXNGaXJzdER0c0luaXRlZCkge1xuICAgICAgICBmaXJzdER0cyA9IGR0c1xuICAgICAgICBpc0ZpcnN0RHRzSW5pdGVkID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBsZXQgc2FtcGxlRHVyYXRpb24gPSAwXG4gICAgICBpZiAoc2FtcGxlLmR1cmF0aW9uKSB7XG4gICAgICAgIHNhbXBsZUR1cmF0aW9uID0gc2FtcGxlLmR1cmF0aW9uO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmF1ZGlvTWV0YS5yZWZTYW1wbGVEdXJhdGlvbkZpeGVkKSB7XG4gICAgICAgIHNhbXBsZUR1cmF0aW9uID0gdGhpcy5hdWRpb01ldGEucmVmU2FtcGxlRHVyYXRpb25GaXhlZFxuICAgICAgfSBlbHNlIGlmIChzYW1wbGVzLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgIGNvbnN0IG5leHREdHMgPSBzYW1wbGVzWzBdLmR0cyAtIHRoaXMuX2R0c0Jhc2U7XG4gICAgICAgIHNhbXBsZUR1cmF0aW9uID0gbmV4dER0cyAtIGR0c1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG1wNFNhbXBsZXMubGVuZ3RoID49IDEpIHsgLy8gdXNlIHNlY29uZCBsYXN0IHNhbXBsZSBkdXJhdGlvblxuICAgICAgICAgIHNhbXBsZUR1cmF0aW9uID0gbXA0U2FtcGxlc1ttcDRTYW1wbGVzLmxlbmd0aCAtIDFdLmR1cmF0aW9uXG4gICAgICAgIH0gZWxzZSB7IC8vIHRoZSBvbmx5IG9uZSBzYW1wbGUsIHVzZSByZWZlcmVuY2Ugc2FtcGxlIGR1cmF0aW9uXG4gICAgICAgICAgc2FtcGxlRHVyYXRpb24gPSB0aGlzLmF1ZGlvTWV0YS5yZWZTYW1wbGVEdXJhdGlvblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKGBhdWRpbyBkdHMgJHtkdHN9YCwgYHB0cyAke2R0c31gLCBgZHVyYXRpb24gJHtzYW1wbGVEdXJhdGlvbn1gKVxuICAgICAgdGhpcy5hdWRpb0FsbER1cmF0aW9uICs9IHNhbXBsZUR1cmF0aW9uXG4gICAgICBjb25zdCBtcDRTYW1wbGUgPSB7XG4gICAgICAgIGR0cyxcbiAgICAgICAgcHRzOiBkdHMsXG4gICAgICAgIGN0czogMCxcbiAgICAgICAgc2l6ZTogZGF0YS5ieXRlTGVuZ3RoLFxuICAgICAgICBkdXJhdGlvbjogc2FtcGxlLmR1cmF0aW9uID8gc2FtcGxlLmR1cmF0aW9uIDogc2FtcGxlRHVyYXRpb24sXG4gICAgICAgIGZsYWdzOiB7XG4gICAgICAgICAgaXNMZWFkaW5nOiAwLFxuICAgICAgICAgIGRlcGVuZHNPbjogMixcbiAgICAgICAgICBpc0RlcGVuZGVkT246IDEsXG4gICAgICAgICAgaGFzUmVkdW5kYW5jeTogMCxcbiAgICAgICAgICBpc05vblN5bmM6IDBcbiAgICAgICAgfSxcbiAgICAgICAgaXNLZXlmcmFtZTogdHJ1ZSxcbiAgICAgICAgb3JpZ2luRHRzLFxuICAgICAgICB0eXBlOiAnYXVkaW8nXG4gICAgICB9XG5cbiAgICAgIGxldCBtZGF0U2FtcGxlID0ge1xuICAgICAgICBidWZmZXI6IFtdLFxuICAgICAgICBzaXplOiAwXG4gICAgICB9XG4gICAgICBtZGF0U2FtcGxlLmJ1ZmZlci5wdXNoKGRhdGEpXG4gICAgICBtZGF0U2FtcGxlLnNpemUgKz0gZGF0YS5ieXRlTGVuZ3RoXG5cbiAgICAgIG1kYXRCb3guc2FtcGxlcy5wdXNoKG1kYXRTYW1wbGUpXG5cbiAgICAgIG1wNFNhbXBsZXMucHVzaChtcDRTYW1wbGUpXG4gICAgfVxuXG4gICAgY29uc3QgbW9vZk1kYXQgPSBuZXcgQnVmZmVyKClcblxuICAgIGlmIChtcDRTYW1wbGVzLmxlbmd0aCkge1xuICAgICAgY29uc3QgbW9vZiA9IEZtcDQubW9vZih7XG4gICAgICAgIGlkOiB0cmFjay5tZXRhLmlkLFxuICAgICAgICB0aW1lOiBmaXJzdER0cyxcbiAgICAgICAgc2FtcGxlczogbXA0U2FtcGxlc1xuICAgICAgfSlcbiAgICAgIGNvbnN0IG1kYXQgPSBGbXA0Lm1kYXQobWRhdEJveClcbiAgICAgIG1vb2ZNZGF0LndyaXRlKG1vb2YsIG1kYXQpXG5cbiAgICAgIHRoaXMud3JpdGVUb1NvdXJjZSgnYXVkaW8nLCBtb29mTWRhdClcbiAgICB9XG5cbiAgICBpZiAoaW5pdFNlZ21lbnQpIHtcbiAgICAgIHRoaXMud3JpdGVUb1NvdXJjZSgnYXVkaW8nLCBpbml0U2VnbWVudClcbiAgICAgIGlmIChzYW1wbGVzLmxlbmd0aCkge1xuICAgICAgICAvLyBzZWNvbmQgcGFydCBvZiBzdHJlYW0gY2hhbmdlXG4gICAgICAgIHRyYWNrLnNhbXBsZXMgPSBzYW1wbGVzO1xuICAgICAgICByZXR1cm4gdGhpcy5fcmVtdXhBdWRpbyh0cmFjaylcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmlzRmlyc3RBdWRpbyA9IGZhbHNlXG4gICAgdGhpcy5lbWl0KFJFTVVYX0VWRU5UUy5NRURJQV9TRUdNRU5ULCAnYXVkaW8nLCBtb29mTWRhdClcblxuICAgIGNvbnN0IGxhc3RTYW1wbGUgPSBtcDRTYW1wbGVzW21wNFNhbXBsZXMubGVuZ3RoIC0gMV1cbiAgICB0aGlzLl92aWRlb05leHREdHMgPSBsYXN0U2FtcGxlLmR0cyArIGxhc3RTYW1wbGUuZHVyYXRpb247XG4gICAgdHJhY2suc2FtcGxlcyA9IFtdXG4gICAgdHJhY2subGVuZ3RoID0gMFxuICB9XG5cbiAgd3JpdGVUb1NvdXJjZSAodHlwZSwgYnVmZmVyKSB7XG4gICAgbGV0IHByZXNvdXJjZWJ1ZmZlciA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1BSRV9TT1VSQ0VfQlVGRkVSJyk7XG4gICAgbGV0IHNvdXJjZSA9IHByZXNvdXJjZWJ1ZmZlci5nZXRTb3VyY2UodHlwZSk7XG4gICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgIHNvdXJjZSA9IHByZXNvdXJjZWJ1ZmZlci5jcmVhdGVTb3VyY2UodHlwZSk7XG4gICAgfVxuXG4gICAgc291cmNlLmRhdGEucHVzaChidWZmZXIpXG4gIH1cblxuICBpbml0U2lsZW50QXVkaW8gKGR0cywgZHVyYXRpb24pIHtcbiAgICBjb25zdCB1bml0ID0gTXA0UmVtdXhlci5nZXRTaWxlbnRGcmFtZSh0aGlzLl9hdWRpb01ldGEuY2hhbm5lbENvdW50KVxuICAgIHJldHVybiB7XG4gICAgICBkdHMsXG4gICAgICBwdHM6IGR0cyxcbiAgICAgIGN0czogMCxcbiAgICAgIGR1cmF0aW9uLFxuICAgICAgdW5pdCxcbiAgICAgIHNpemU6IHVuaXQuYnl0ZUxlbmd0aCxcbiAgICAgIG9yaWdpbkR0czogZHRzLFxuICAgICAgdHlwZTogJ3ZpZGVvJ1xuICAgIH1cbiAgfVxuXG4gIGdldCB2aWRlb01ldGEgKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdUUkFDS1MnKS52aWRlb1RyYWNrLm1ldGFcbiAgfVxuICBnZXQgYXVkaW9NZXRhICgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dC5nZXRJbnN0YW5jZSgnVFJBQ0tTJykuYXVkaW9UcmFjay5tZXRhXG4gIH1cblxuICBzdGF0aWMgZ2V0U2lsZW50RnJhbWUgKGNoYW5uZWxDb3VudCkge1xuICAgIGlmIChjaGFubmVsQ291bnQgPT09IDEpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMywgMHg4MF0pXG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDIpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgyMSwgMHgwMCwgMHg0OSwgMHg5MCwgMHgwMiwgMHgxOSwgMHgwMCwgMHgyMywgMHg4MF0pXG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDMpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4ZV0pXG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDQpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4MCwgMHgyYywgMHg4MCwgMHgwOCwgMHgwMiwgMHgzOF0pXG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDUpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4MiwgMHgzMCwgMHgwNCwgMHg5OSwgMHgwMCwgMHgyMSwgMHg5MCwgMHgwMiwgMHgzOF0pXG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDYpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4MiwgMHgzMCwgMHgwNCwgMHg5OSwgMHgwMCwgMHgyMSwgMHg5MCwgMHgwMiwgMHgwMCwgMHhiMiwgMHgwMCwgMHgyMCwgMHgwOCwgMHhlMF0pXG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBDb250ZXh0OiByZXF1aXJlKCcuL3NyYy9jb250ZXh0JykuZGVmYXVsdCxcblxuICAvLyBNb2R1bGVzIGZyb20gY29uc3RhbnRzXG4gIEVWRU5UUzogcmVxdWlyZSgnLi9zcmMvY29uc3RhbnRzL2V2ZW50cycpLmRlZmF1bHQsXG4gIFdPUktFUl9DT01NQU5EUzogcmVxdWlyZSgnLi9zcmMvY29uc3RhbnRzL3dvcmtlci1jb21tYW5kcycpLmRlZmF1bHQsXG5cbiAgLy8gTW9kdWxlcyBmcm9tIGVudlxuICBzbmlmZmVyOiByZXF1aXJlKCcuL3NyYy9lbnYvc25pZmZlcicpLmRlZmF1bHQsXG4gIGlzTGU6IHJlcXVpcmUoJy4vc3JjL2Vudi9pc2xlJykuZGVmYXVsdCxcbiAgVVRGODogcmVxdWlyZSgnLi9zcmMvZW52L3V0ZjgnKS5kZWZhdWx0LFxuXG4gIC8vIE1vZGVsc1xuICBNZWRpYUluZm86IHJlcXVpcmUoJy4vc3JjL21vZGVscy9tZWRpYS1pbmZvJykuZGVmYXVsdCxcbiAgTWVkaWFTYW1wbGU6IHJlcXVpcmUoJy4vc3JjL21vZGVscy9tZWRpYS1zYW1wbGUnKS5kZWZhdWx0LFxuICBNZWRpYVNlZ21lbnQ6IHJlcXVpcmUoJy4vc3JjL21vZGVscy9tZWRpYS1zZWdtZW50JykuZGVmYXVsdCxcbiAgTWVkaWFTZWdtZW50TGlzdDogcmVxdWlyZSgnLi9zcmMvbW9kZWxzL21lZGlhLXNlZ21lbnQtbGlzdCcpLmRlZmF1bHQsXG4gIEF1ZGlvVHJhY2tNZXRhOiByZXF1aXJlKCcuL3NyYy9tb2RlbHMvdHJhY2stbWV0YScpLkF1ZGlvVHJhY2tNZXRhLFxuICBWaWRlb1RyYWNrTWV0YTogcmVxdWlyZSgnLi9zcmMvbW9kZWxzL3RyYWNrLW1ldGEnKS5WaWRlb1RyYWNrTWV0YSxcbiAgQXVkaW9UcmFja1NhbXBsZTogcmVxdWlyZSgnLi9zcmMvbW9kZWxzL3RyYWNrLXNhbXBsZScpLkF1ZGlvVHJhY2tTYW1wbGUsXG4gIFZpZGVvVHJhY2tTYW1wbGU6IHJlcXVpcmUoJy4vc3JjL21vZGVscy90cmFjay1zYW1wbGUnKS5WaWRlb1RyYWNrU2FtcGxlLFxuXG4gIC8vIE1vZHVsZXMgZnJvbSBtc2VcbiAgTXNlOiByZXF1aXJlKCcuL3NyYy9tc2UvaW5kZXgnKS5kZWZhdWx0LFxuXG4gIC8vIE1vZHVsZXMgZnJvbSB3cml0ZVxuICBTdHJlYW06IHJlcXVpcmUoJy4vc3JjL3dyaXRlL3N0cmVhbScpLmRlZmF1bHQsXG4gIEJ1ZmZlcjogcmVxdWlyZSgnLi9zcmMvd3JpdGUvYnVmZmVyJykuZGVmYXVsdCxcblxuICAvLyBDcnlwdG9cbiAgQ3J5cHRvOiByZXF1aXJlKCcuL3NyYy9jcnlwdG8nKS5kZWZhdWx0XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChSZXN1bHRDb25zdHJ1Y3Rvcikge1xuICB2YXIgdG90YWxMZW5ndGggPSAwO1xuXG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcnJheXMgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJyYXlzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGFycmF5c1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgIHZhciBhcnIgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgdG90YWxMZW5ndGggKz0gYXJyLmxlbmd0aDtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICBfaXRlcmF0b3JFcnJvciA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uICYmIF9pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgX2l0ZXJhdG9yLnJldHVybigpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIHJlc3VsdCA9IG5ldyBSZXN1bHRDb25zdHJ1Y3Rvcih0b3RhbExlbmd0aCk7XG4gIHZhciBvZmZzZXQgPSAwO1xuICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlO1xuICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyID0gZmFsc2U7XG4gIHZhciBfaXRlcmF0b3JFcnJvcjIgPSB1bmRlZmluZWQ7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gYXJyYXlzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAyOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gKF9zdGVwMiA9IF9pdGVyYXRvcjIubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlKSB7XG4gICAgICB2YXIgX2FyciA9IF9zdGVwMi52YWx1ZTtcblxuICAgICAgcmVzdWx0LnNldChfYXJyLCBvZmZzZXQpO1xuICAgICAgb2Zmc2V0ICs9IF9hcnIubGVuZ3RoO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICBfaXRlcmF0b3JFcnJvcjIgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgJiYgX2l0ZXJhdG9yMi5yZXR1cm4pIHtcbiAgICAgICAgX2l0ZXJhdG9yMi5yZXR1cm4oKTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NvbmNhdCA9IHJlcXVpcmUoJy4vY29uY2F0Jyk7XG5cbnZhciBfY29uY2F0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbmNhdCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbm1vZHVsZS5leHBvcnRzID0gX2NvbmNhdDIuZGVmYXVsdDsiLCJjb25zdCBMT0FERVJfRVZFTlRTID0ge1xuICBMQURFUl9TVEFSVDogJ0xPQURFUl9TVEFSVCcsXG4gIExPQURFUl9EQVRBTE9BREVEOiAnTE9BREVSX0RBVEFMT0FERUQnLFxuICBMT0FERVJfQ09NUExFVEU6ICdMT0FERVJfQ09NUExFVEUnLFxuICBMT0FERVJfRVJST1I6ICdMT0FERVJfRVJST1InXG59XG5cbmNvbnN0IERFTVVYX0VWRU5UUyA9IHtcbiAgREVNVVhfU1RBUlQ6ICdERU1VWF9TVEFSVCcsXG4gIERFTVVYX0NPTVBMRVRFOiAnREVNVVhfQ09NUExFVEUnLFxuICBERU1VWF9FUlJPUjogJ0RFTVVYX0VSUk9SJyxcbiAgTUVUQURBVEFfUEFSU0VEOiAnTUVUQURBVEFfUEFSU0VEJyxcbiAgVklERU9fTUVUQURBVEFfQ0hBTkdFOiAnVklERU9fTUVUQURBVEFfQ0hBTkdFJyxcbiAgQVVESU9fTUVUQURBVEFfQ0hBTkdFOiAnQVVESU9fTUVUQURBVEFfQ0hBTkdFJyxcbiAgTUVESUFfSU5GTzogJ01FRElBX0lORk8nXG59XG5cbmNvbnN0IFJFTVVYX0VWRU5UUyA9IHtcbiAgUkVNVVhfTUVUQURBVEE6ICdSRU1VWF9NRVRBREFUQScsXG4gIFJFTVVYX01FRElBOiAnUkVNVVhfTUVESUEnLFxuICBNRURJQV9TRUdNRU5UOiAnTUVESUFfU0VHTUVOVCcsXG4gIFJFTVVYX0VSUk9SOiAnUkVNVVhfRVJST1InLFxuICBJTklUX1NFR01FTlQ6ICdJTklUX1NFR01FTlQnLFxuICBERVRFQ1RfQ0hBTkdFX1NUUkVBTTogJ0RFVEVDVF9DSEFOR0VfU1RSRUFNJyxcbiAgUkFORE9NX0FDQ0VTU19QT0lOVDogJ1JBTkRPTV9BQ0NFU1NfUE9JTlQnXG59XG5cbmNvbnN0IE1TRV9FVkVOVFMgPSB7XG4gIFNPVVJDRV9VUERBVEVfRU5EOiAnU09VUkNFX1VQREFURV9FTkQnXG59XG5cbi8vIGhsc+S4k+aciWV2ZW50c1xuY29uc3QgSExTX0VWRU5UUyA9IHtcbiAgUkVUUllfVElNRV9FWENFRURFRDogJ1JFVFJZX1RJTUVfRVhDRUVERUQnXG59XG5cbmNvbnN0IENSWVRPX0VWRU5UUyA9IHtcbiAgU1RBUlRfREVDUllQVDogJ1NUQVJUX0RFQ1JZUFQnLFxuICBERUNSWVBURUQ6ICdERUNSWVBURUQnXG59XG5jb25zdCBBTExFVkVOVFMgPSBPYmplY3QuYXNzaWduKHt9LCBMT0FERVJfRVZFTlRTLCBERU1VWF9FVkVOVFMsIFJFTVVYX0VWRU5UUywgTVNFX0VWRU5UUywgSExTX0VWRU5UUylcblxuY29uc3QgRmx2QWxsb3dlZEV2ZW50cyA9IFtdXG5jb25zdCBIbHNBbGxvd2VkRXZlbnRzID0gW11cblxuZm9yIChsZXQga2V5IGluIEFMTEVWRU5UUykge1xuICBpZiAoQUxMRVZFTlRTLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICBGbHZBbGxvd2VkRXZlbnRzLnB1c2goQUxMRVZFTlRTW2tleV0pXG4gIH1cbn1cblxuZm9yIChsZXQga2V5IGluIEFMTEVWRU5UUykge1xuICBpZiAoQUxMRVZFTlRTLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICBIbHNBbGxvd2VkRXZlbnRzLnB1c2goQUxMRVZFTlRTW2tleV0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBBTExFVkVOVFMsXG4gIEhMU19FVkVOVFMsXG4gIFJFTVVYX0VWRU5UUyxcbiAgREVNVVhfRVZFTlRTLFxuICBNU0VfRVZFTlRTLFxuICBMT0FERVJfRVZFTlRTLFxuICBGbHZBbGxvd2VkRXZlbnRzLFxuICBIbHNBbGxvd2VkRXZlbnRzLFxuICBDUllUT19FVkVOVFNcbn07XG4iLCJleHBvcnQgY29uc3QgQ09OVEVYVF9DT01PTUFORFMgPSB7XG4gIE9OOiAnb24nLFxuICBPTkNFOiAnb25jZScsXG4gIE9GRjogJ29mZicsXG4gIEVNSVQ6ICdlbWl0JyxcbiAgREVTVFJPWTogJ2Rlc3Ryb3knXG59XG4iLCJpbXBvcnQgTWVkaWFJbmZvIGZyb20gJy4vbW9kZWxzL21lZGlhLWluZm8nXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnXG5cbmNvbnN0IERJUkVDVF9FTUlUX0ZMQUcgPSAnX19UT19fJ1xuXG5jbGFzcyBDb250ZXh0IHtcbiAgY29uc3RydWN0b3IgKGFsbG93ZWRFdmVudHMgPSBbXSkge1xuICAgIHRoaXMuX2VtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKClcbiAgICB0aGlzLl9pbnN0YW5jZU1hcCA9IHt9IC8vIOaJgOacieeahOino+eggea1geeoi+WunuS+i1xuICAgIHRoaXMuX2Nsc01hcCA9IHt9IC8vIOaehOmAoOWHveaVsOeahG1hcFxuICAgIHRoaXMuX2luaXRlZCA9IGZhbHNlXG4gICAgdGhpcy5tZWRpYUluZm8gPSBuZXcgTWVkaWFJbmZvKClcbiAgICB0aGlzLmFsbG93ZWRFdmVudHMgPSBhbGxvd2VkRXZlbnRzXG4gICAgdGhpcy5faG9va3MgPSB7fSAvLyDms6jlhozlnKjkuovku7bliY0v5ZCO55qE6ZKp5a2Q77yM5L6L5aaCIGJlZm9yZSgnREVNVVhfQ09NUExFVEUnKVxuICAgIHRoaXMuX2VtaXRDb3VudGVyID0ge31cbiAgfVxuXG4gIC8qKlxuICAgKiDku47kuIrkuIvmlofkuK3ojrflj5bop6PnoIHmtYHnqIvlrp7kvovvvIzlpoLmnpzmsqHmnInlrp7kvovvvIzmnoTpgKDkuIDkuKpcbiAgICogQHBhcmFtIHRhZ1xuICAgKiBAcGFyYW0gYXJnc1xuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIGdldEluc3RhbmNlICh0YWcpIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IHRoaXMuX2luc3RhbmNlTWFwW3RhZ11cbiAgICBpZiAoaW5zdGFuY2UpIHtcbiAgICAgIHJldHVybiBpbnN0YW5jZVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0aHJvdyBuZXcgRXJyb3IoYCR7dGFnfeWunuS+i+WwmuacquWIneWni+WMlmApXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDliJ3lp4vljJblhbfkvZPlrp7kvotcbiAgICogQHBhcmFtIHRhZ1xuICAgKiBAcGFyYW0gYXJnc1xuICAgKi9cbiAgaW5pdEluc3RhbmNlICh0YWcsIC4uLmFyZ3MpIHtcbiAgICBpZiAodGhpcy5fY2xzTWFwW3RhZ10pIHtcbiAgICAgIGNvbnN0IG5ld0luc3RhbmNlID0gbmV3IHRoaXMuX2Nsc01hcFt0YWddKC4uLmFyZ3MpXG4gICAgICB0aGlzLl9pbnN0YW5jZU1hcFt0YWddID0gbmV3SW5zdGFuY2VcbiAgICAgIGlmIChuZXdJbnN0YW5jZS5pbml0KSB7XG4gICAgICAgIG5ld0luc3RhbmNlLmluaXQoKSAvLyBUT0RPOiBsaWZlY2lyY2xlXG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3SW5zdGFuY2VcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3RhZ33mnKrlnKhjb250ZXh05Lit5rOo5YaMYClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog6YG/5YWN5aSn6YeP55qEaW5pdEluc3RhbmNl6LCD55So77yM5Yid5aeL5YyW5omA5pyJ55qE57uE5Lu2XG4gICAqIEBwYXJhbSBjb25maWdcbiAgICovXG4gIGluaXQgKGNvbmZpZykge1xuICAgIGlmICh0aGlzLl9pbml0ZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBmb3IgKGxldCB0YWcgaW4gdGhpcy5fY2xzTWFwKSB7XG4gICAgICAvLyBpZiBub3QgaW5pdGVkLCBpbml0IGFuIGluc3RhbmNlXG4gICAgICBpZiAodGhpcy5fY2xzTWFwLmhhc093blByb3BlcnR5KHRhZykgJiYgIXRoaXMuX2luc3RhbmNlTWFwW3RhZ10pIHtcbiAgICAgICAgdGhpcy5pbml0SW5zdGFuY2UodGFnLCBjb25maWcpXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2luaXRlZCA9IHRydWVcbiAgfVxuXG4gIC8qKlxuICAgKiDms6jlhozkuIDkuKrkuIrkuIvmlofmtYHnqIvvvIzmj5DkvpvlronlhajnmoTkuovku7blj5HpgIHmnLrliLZcbiAgICogQHBhcmFtIHRhZ1xuICAgKiBAcGFyYW0gY2xzXG4gICAqL1xuICByZWdpc3RyeSAodGFnLCBjbHMpIHtcbiAgICBjb25zdCBlbWl0dGVyID0gdGhpcy5fZW1pdHRlclxuICAgIGNvbnN0IGNoZWNrTWVzc2FnZU5hbWUgPSB0aGlzLl9pc01lc3NhZ2VOYW1lVmFsaWQuYmluZCh0aGlzKVxuICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgY29uc3QgZW5oYW5jZWQgPSBjbGFzcyBleHRlbmRzIGNscyB7XG4gICAgICBjb25zdHJ1Y3RvciAoYSwgYiwgYykge1xuICAgICAgICBzdXBlcihhLCBiLCBjKVxuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHt9XG4gICAgICAgIHRoaXMub25jZUxpc3RlbmVycyA9IHt9XG4gICAgICAgIHRoaXMuVEFHID0gdGFnXG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBzZWxmXG4gICAgICB9XG5cbiAgICAgIG9uIChtZXNzYWdlTmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgY2hlY2tNZXNzYWdlTmFtZShtZXNzYWdlTmFtZSlcblxuICAgICAgICBpZiAodGhpcy5saXN0ZW5lcnNbbWVzc2FnZU5hbWVdKSB7XG4gICAgICAgICAgdGhpcy5saXN0ZW5lcnNbbWVzc2FnZU5hbWVdLnB1c2goY2FsbGJhY2spXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5saXN0ZW5lcnNbbWVzc2FnZU5hbWVdID0gW2NhbGxiYWNrXVxuICAgICAgICB9XG5cbiAgICAgICAgZW1pdHRlci5vbihgJHttZXNzYWdlTmFtZX0ke0RJUkVDVF9FTUlUX0ZMQUd9JHt0YWd9YCwgY2FsbGJhY2spIC8vIOW7uueri+WumuWQkemAmuS/oeebkeWQrFxuICAgICAgICByZXR1cm4gZW1pdHRlci5vbihtZXNzYWdlTmFtZSwgY2FsbGJhY2spXG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICog5Zyo5p+Q5Liq5LqL5Lu26Kem5Y+R5YmN5omn6KGMXG4gICAgICAgKiBAcGFyYW0gbWVzc2FnZU5hbWVcbiAgICAgICAqIEBwYXJhbSBjYWxsYmFja1xuICAgICAgICovXG4gICAgICBiZWZvcmUgKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaykge1xuICAgICAgICBjaGVja01lc3NhZ2VOYW1lKG1lc3NhZ2VOYW1lKVxuICAgICAgICBpZiAoc2VsZi5faG9va3NbbWVzc2FnZU5hbWVdKSB7XG4gICAgICAgICAgc2VsZi5faG9va3NbbWVzc2FnZU5hbWVdLnB1c2goY2FsbGJhY2spXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VsZi5faG9va3NbbWVzc2FnZU5hbWVdID0gW2NhbGxiYWNrXVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG9uY2UgKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaykge1xuICAgICAgICBjaGVja01lc3NhZ2VOYW1lKG1lc3NhZ2VOYW1lKVxuXG4gICAgICAgIGlmICh0aGlzLm9uY2VMaXN0ZW5lcnNbbWVzc2FnZU5hbWVdKSB7XG4gICAgICAgICAgdGhpcy5vbmNlTGlzdGVuZXJzW21lc3NhZ2VOYW1lXS5wdXNoKGNhbGxiYWNrKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMub25jZUxpc3RlbmVyc1ttZXNzYWdlTmFtZV0gPSBbY2FsbGJhY2tdXG4gICAgICAgIH1cblxuICAgICAgICBlbWl0dGVyLm9uY2UoYCR7bWVzc2FnZU5hbWV9JHtESVJFQ1RfRU1JVF9GTEFHfSR7dGFnfWAsIGNhbGxiYWNrKVxuICAgICAgICByZXR1cm4gZW1pdHRlci5vbmNlKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaylcbiAgICAgIH1cblxuICAgICAgZW1pdCAobWVzc2FnZU5hbWUsIC4uLmFyZ3MpIHtcbiAgICAgICAgY2hlY2tNZXNzYWdlTmFtZShtZXNzYWdlTmFtZSlcbiAgICAgICAgaWYgKHNlbGYuX2VtaXRDb3VudGVyW21lc3NhZ2VOYW1lXSkge1xuICAgICAgICAgIHNlbGYuX2VtaXRDb3VudGVyW21lc3NhZ2VOYW1lXSArPSAxO1xuICAgICAgICAgIGlmIChzZWxmLl9lbWl0Q291bnRlclttZXNzYWdlTmFtZV0gPiAxMDAwMCkge1xuICAgICAgICAgICAgbGV0IGEgPSAnY29uJztcbiAgICAgICAgICAgIGxldCBiID0gJ3NvbGUnO1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5jb25zb2xlKSB7XG4gICAgICAgICAgICAgIHdpbmRvd1thICsgYl0ud2FybihgaW52b2tlOiBgLCBtZXNzYWdlTmFtZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VsZi5fZW1pdENvdW50ZXJbbWVzc2FnZU5hbWVdID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJlZm9yZUxpc3QgPSBzZWxmLl9ob29rcyA/IHNlbGYuX2hvb2tzW21lc3NhZ2VOYW1lXSA6IG51bGxcblxuICAgICAgICBpZiAoYmVmb3JlTGlzdCkge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBiZWZvcmVMaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IGJlZm9yZUxpc3RbaV1cbiAgICAgICAgICAgIGNhbGxiYWNrKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVtaXR0ZXIuZW1pdChtZXNzYWdlTmFtZSwgLi4uYXJncylcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiDlrprlkJHlj5HpgIHnu5nmn5DkuKrnu4Tku7bljZXkvovnmoTmtojmga9cbiAgICAgICAqIEBwYXJhbSBtZXNzYWdlTmFtZVxuICAgICAgICogQHBhcmFtIGFyZ3NcbiAgICAgICAqL1xuICAgICAgZW1pdFRvICh0YWcsIG1lc3NhZ2VOYW1lLCAuLi5hcmdzKSB7XG4gICAgICAgIGNoZWNrTWVzc2FnZU5hbWUobWVzc2FnZU5hbWUpXG5cbiAgICAgICAgcmV0dXJuIGVtaXR0ZXIuZW1pdChgJHttZXNzYWdlTmFtZX0ke0RJUkVDVF9FTUlUX0ZMQUd9JHt0YWd9YCwgLi4uYXJncylcbiAgICAgIH1cblxuICAgICAgb2ZmIChtZXNzYWdlTmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgY2hlY2tNZXNzYWdlTmFtZShtZXNzYWdlTmFtZSlcbiAgICAgICAgcmV0dXJuIGVtaXR0ZXIub2ZmKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaylcbiAgICAgIH1cblxuICAgICAgcmVtb3ZlTGlzdGVuZXJzICgpIHtcbiAgICAgICAgY29uc3QgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5iaW5kKHRoaXMubGlzdGVuZXJzKVxuXG4gICAgICAgIGZvciAobGV0IG1lc3NhZ2VOYW1lIGluIHRoaXMubGlzdGVuZXJzKSB7XG4gICAgICAgICAgaWYgKGhhc093bihtZXNzYWdlTmFtZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMubGlzdGVuZXJzW21lc3NhZ2VOYW1lXSB8fCBbXVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSBjYWxsYmFja3NbaV1cbiAgICAgICAgICAgICAgZW1pdHRlci5vZmYobWVzc2FnZU5hbWUsIGNhbGxiYWNrKVxuICAgICAgICAgICAgICBlbWl0dGVyLm9mZihgJHttZXNzYWdlTmFtZX0ke0RJUkVDVF9FTUlUX0ZMQUd9JHt0YWd9YCwgY2FsbGJhY2spXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgbWVzc2FnZU5hbWUgaW4gdGhpcy5vbmNlTGlzdGVuZXJzKSB7XG4gICAgICAgICAgaWYgKGhhc093bihtZXNzYWdlTmFtZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMub25jZUxpc3RlbmVyc1ttZXNzYWdlTmFtZV0gfHwgW11cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrID0gY2FsbGJhY2tzW2ldXG4gICAgICAgICAgICAgIGVtaXR0ZXIub2ZmKG1lc3NhZ2VOYW1lLCBjYWxsYmFjaylcbiAgICAgICAgICAgICAgZW1pdHRlci5vZmYoYCR7bWVzc2FnZU5hbWV9JHtESVJFQ1RfRU1JVF9GTEFHfSR7dGFnfWAsIGNhbGxiYWNrKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIOWcqOe7hOS7tumUgOavgeaXtu+8jOm7mOiupOWwhuWug+azqOWGjOeahOS6i+S7tuWFqOmDqOWNuOi9ve+8jOehruS/neS4jeS8mumAoOaIkOWGheWtmOazhOa8j1xuICAgICAgICovXG4gICAgICBkZXN0cm95ICgpIHtcbiAgICAgICAgLy8gc3RlcDEgdW5saXN0ZW4gZXZlbnRzXG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXJzKClcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSB7fVxuXG4gICAgICAgIC8vIHN0ZXAyIHJlbGVhc2UgZnJvbSBjb250ZXh0XG4gICAgICAgIGRlbGV0ZSBzZWxmLl9pbnN0YW5jZU1hcFt0YWddXG4gICAgICAgIGlmIChzdXBlci5kZXN0cm95KSB7XG4gICAgICAgICAgcmV0dXJuIHN1cGVyLmRlc3Ryb3koKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2Nsc01hcFt0YWddID0gZW5oYW5jZWRcblxuICAgIC8qKlxuICAgICAqIGdldCBpbnN0YW5jZSBpbW1lZGlhdGVseVxuICAgICAqIGUuZyBjb25zdCBpbnN0YW5jZSA9IGNvbnRleHQucmVnaXN0cnkodGFnLCBDbHMpKGNvbmZpZylcbiAgICAgKiAqL1xuICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaW5pdEluc3RhbmNlKHRhZywgLi4uYXJncylcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog5a+55a2Y5Zyo55qE5a6e5L6L6L+b6KGMXG4gICAqL1xuICBkZXN0cm95SW5zdGFuY2VzICgpIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLl9pbnN0YW5jZU1hcCkuZm9yRWFjaCgodGFnKSA9PiB7XG4gICAgICBpZiAodGhpcy5faW5zdGFuY2VNYXBbdGFnXS5kZXN0cm95KSB7XG4gICAgICAgIHRoaXMuX2luc3RhbmNlTWFwW3RhZ10uZGVzdHJveSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiDnvJbop6PnoIHmtYHnqIvml6DpnIDlhbPms6jkuovku7bnmoTop6Pnu5FcbiAgICovXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuX2VtaXR0ZXIgPSBudWxsXG4gICAgdGhpcy5hbGxvd2VkRXZlbnRzID0gW11cbiAgICB0aGlzLl9jbHNNYXAgPSBudWxsXG4gICAgdGhpcy5fY29udGV4dCA9IG51bGxcbiAgICB0aGlzLl9ob29rcyA9IG51bGxcbiAgICB0aGlzLl9lbWl0Q291bnRlciA9IHt9XG4gICAgdGhpcy5kZXN0cm95SW5zdGFuY2VzKClcbiAgfVxuXG4gIC8qKlxuICAgKiDlr7nkv6HpgZPov5vooYzmlLbmi6JcbiAgICogQHBhcmFtIG1lc3NhZ2VOYW1lXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaXNNZXNzYWdlTmFtZVZhbGlkIChtZXNzYWdlTmFtZSkge1xuICAgIGlmICghdGhpcy5hbGxvd2VkRXZlbnRzLmluZGV4T2YobWVzc2FnZU5hbWUpIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnJlZ2lzdGVyZWQgbWVzc2FnZSBuYW1lOiAke21lc3NhZ2VOYW1lfWApXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRleHRcbiIsImltcG9ydCBFVkVOVFMgZnJvbSAnLi4vY29uc3RhbnRzL2V2ZW50cyc7XG5jb25zdCBDUllUT19FVkVOVFMgPSBFVkVOVFMuQ1JZVE9fRVZFTlRTXG5jbGFzcyBDcnlwdG8ge1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZykge1xuICAgICAgICB0aGlzLmlucHV0QnVmZmVyID0gY29uZmlnLmlucHV0YnVmZmVyO1xuICAgICAgICB0aGlzLm91dHB1dEJ1ZmZlciA9IGNvbmZpZy5vdXRwdXRidWZmZXI7XG4gICAgICAgIHRoaXMua2V5ID0gY29uZmlnLmtleTtcbiAgICAgICAgdGhpcy5pdiA9IGNvbmZpZy5pdjtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBjb25maWcubWV0aG9kO1xuXG4gICAgICAgIHRoaXMuY3J5cHRvID0gIHdpbmRvdy5jcnlwdG8gfHwgd2luZG93Lm1zQ3J5cHRvXG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5vbihDUllUT19FVkVOVFMuU1RBUlRfREVDUllQVCwgdGhpcy5kZWNyaXB0LmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBcbiAgICBkZWNyaXB0KCkge1xuICAgICAgICBpZighdGhpcy5hZXNrZXkpIHtcbiAgICAgICAgICAgIGxldCBzYmtleSA9IHRoaXMuY3J5cHRvLnN1YnRsZS5pbXBvcnRLZXkoJ3JhdycsIHRoaXMua2V5LmJ1ZmZlciwgeyBuYW1lOiAnQUVTLUNCQycgfSwgZmFsc2UsIFsnZW5jcnlwdCcsICdkZWNyeXB0J10pO1xuICAgICAgICAgICAgc2JrZXkudGhlbihrZXkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWVza2V5ID0ga2V5O1xuICAgICAgICAgICAgICAgIHRoaXMuZGVjcmlwdERhdGEoKTtcbiAgICAgICAgICAgIH0pIFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kZWNyaXB0RGF0YSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVjcmlwdERhdGEoKSB7XG4gICAgICAgIGxldCBpbnB1dGJ1ZmZlciA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UodGhpcy5pbnB1dEJ1ZmZlcik7XG4gICAgICAgIGxldCBvdXRwdXRidWZmZXIgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKHRoaXMub3V0cHV0QnVmZmVyKTtcbiAgICAgICAgbGV0IGRhdGEgPSBpbnB1dGJ1ZmZlci5zaGlmdCgpO1xuICAgICAgICBpZihkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmNyeXB0by5zdWJ0bGUuZGVjcnlwdCh7IG5hbWU6ICdBRVMtQ0JDJywgaXY6IHRoaXMuaXYuYnVmZmVyIH0sIHRoaXMuYWVza2V5LCBkYXRhKS50aGVuKHJlcz0+e1xuICAgICAgICAgICAgICAgIG91dHB1dGJ1ZmZlci5wdXNoKG5ldyBVaW50OEFycmF5KHJlcykpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChDUllUT19FVkVOVFMuREVDUllQVEVEKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlY3JpcHREYXRhKGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBDcnlwdG87IiwiY29uc3QgbGUgPSAoZnVuY3Rpb24gKCkge1xuICBjb25zdCBidWYgPSBuZXcgQXJyYXlCdWZmZXIoMik7XG4gIChuZXcgRGF0YVZpZXcoYnVmKSkuc2V0SW50MTYoMCwgMjU2LCB0cnVlKSAvLyBsaXR0bGUtZW5kaWFuIHdyaXRlXG4gIHJldHVybiAobmV3IEludDE2QXJyYXkoYnVmKSlbMF0gPT09IDI1NiAvLyBwbGF0Zm9ybS1zcGVjIHJlYWQsIGlmIGVxdWFsIHRoZW4gTEVcbn0pKClcblxuZXhwb3J0IGRlZmF1bHQgbGVcbiIsImNvbnN0IGxlID0gKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgYnVmID0gbmV3IEFycmF5QnVmZmVyKDIpO1xuICAobmV3IERhdGFWaWV3KGJ1ZikpLnNldEludDE2KDAsIDI1NiwgdHJ1ZSkgLy8gbGl0dGxlLWVuZGlhbiB3cml0ZVxuICByZXR1cm4gKG5ldyBJbnQxNkFycmF5KGJ1ZikpWzBdID09PSAyNTYgLy8gcGxhdGZvcm0tc3BlYyByZWFkLCBpZiBlcXVhbCB0aGVuIExFXG59KSgpXG5cbmNvbnN0IHNuaWZmZXIgPSB7XG4gIGdldCBkZXZpY2UgKCkge1xuICAgIGxldCByID0gc25pZmZlci5vcztcbiAgICByZXR1cm4gci5pc1BjID8gJ3BjJyA6IHIuaXNUYWJsZXQgPyAndGFibGV0JyA6ICdtb2JpbGUnO1xuICB9LFxuICBnZXQgYnJvd3NlciAoKSB7XG4gICAgbGV0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xuICAgIGxldCByZWcgPSB7XG4gICAgICBpZTogL3J2OihbXFxkLl0rKVxcKSBsaWtlIGdlY2tvLyxcbiAgICAgIGZpcmZveDogL2ZpcmVmb3hcXC8oW1xcZC5dKykvLFxuICAgICAgY2hyb21lOiAvY2hyb21lXFwvKFtcXGQuXSspLyxcbiAgICAgIG9wZXJhOiAvb3BlcmEuKFtcXGQuXSspLyxcbiAgICAgIHNhZmFyaTogL3ZlcnNpb25cXC8oW1xcZC5dKykuKnNhZmFyaS9cbiAgICB9O1xuICAgIHJldHVybiBbXS5jb25jYXQoT2JqZWN0LmtleXMocmVnKS5maWx0ZXIoa2V5ID0+IHJlZ1trZXldLnRlc3QodWEpKSlbMF07XG4gIH0sXG4gIGdldCBvcyAoKSB7XG4gICAgbGV0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudFxuICAgIGxldCBpc1dpbmRvd3NQaG9uZSA9IC8oPzpXaW5kb3dzIFBob25lKS8udGVzdCh1YSlcbiAgICBsZXQgaXNTeW1iaWFuID0gLyg/OlN5bWJpYW5PUykvLnRlc3QodWEpIHx8IGlzV2luZG93c1Bob25lO1xuICAgIGxldCBpc0FuZHJvaWQgPSAvKD86QW5kcm9pZCkvLnRlc3QodWEpO1xuICAgIGxldCBpc0ZpcmVGb3ggPSAvKD86RmlyZWZveCkvLnRlc3QodWEpO1xuICAgIGxldCBpc1RhYmxldCA9IC8oPzppUGFkfFBsYXlCb29rKS8udGVzdCh1YSkgfHwgKGlzQW5kcm9pZCAmJiAhLyg/Ok1vYmlsZSkvLnRlc3QodWEpKSB8fCAoaXNGaXJlRm94ICYmIC8oPzpUYWJsZXQpLy50ZXN0KHVhKSk7XG4gICAgbGV0IGlzUGhvbmUgPSAvKD86aVBob25lKS8udGVzdCh1YSkgJiYgIWlzVGFibGV0O1xuICAgIGxldCBpc1BjID0gIWlzUGhvbmUgJiYgIWlzQW5kcm9pZCAmJiAhaXNTeW1iaWFuO1xuICAgIHJldHVybiB7XG4gICAgICBpc1RhYmxldCxcbiAgICAgIGlzUGhvbmUsXG4gICAgICBpc0FuZHJvaWQsXG4gICAgICBpc1BjLFxuICAgICAgaXNTeW1iaWFuLFxuICAgICAgaXNXaW5kb3dzUGhvbmUsXG4gICAgICBpc0ZpcmVGb3hcbiAgICB9O1xuICB9LFxuXG4gIGdldCBpc0xlICgpIHtcbiAgICByZXR1cm4gbGVcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgc25pZmZlcjtcbiIsImNsYXNzIFVURjgge1xuICBzdGF0aWMgZGVjb2RlICh1aW50OGFycmF5KSB7XG4gICAgY29uc3Qgb3V0ID0gW107XG4gICAgY29uc3QgaW5wdXQgPSB1aW50OGFycmF5O1xuICAgIGxldCBpID0gMDtcbiAgICBjb25zdCBsZW5ndGggPSB1aW50OGFycmF5Lmxlbmd0aDtcblxuICAgIHdoaWxlIChpIDwgbGVuZ3RoKSB7XG4gICAgICBpZiAoaW5wdXRbaV0gPCAweDgwKSB7XG4gICAgICAgIG91dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoaW5wdXRbaV0pKTtcbiAgICAgICAgKytpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH0gZWxzZSBpZiAoaW5wdXRbaV0gPCAweEMwKSB7XG4gICAgICAgIC8vIGZhbGx0aHJvdWdoXG4gICAgICB9IGVsc2UgaWYgKGlucHV0W2ldIDwgMHhFMCkge1xuICAgICAgICBpZiAoVVRGOC5fY2hlY2tDb250aW51YXRpb24oaW5wdXQsIGksIDEpKSB7XG4gICAgICAgICAgY29uc3QgdWNzNCA9IChpbnB1dFtpXSAmIDB4MUYpIDw8IDYgfCAoaW5wdXRbaSArIDFdICYgMHgzRik7XG4gICAgICAgICAgaWYgKHVjczQgPj0gMHg4MCkge1xuICAgICAgICAgICAgb3V0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSh1Y3M0ICYgMHhGRkZGKSk7XG4gICAgICAgICAgICBpICs9IDI7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaW5wdXRbaV0gPCAweEYwKSB7XG4gICAgICAgIGlmIChVVEY4Ll9jaGVja0NvbnRpbnVhdGlvbihpbnB1dCwgaSwgMikpIHtcbiAgICAgICAgICBjb25zdCB1Y3M0ID0gKGlucHV0W2ldICYgMHhGKSA8PCAxMiB8IChpbnB1dFtpICsgMV0gJiAweDNGKSA8PCA2IHwgaW5wdXRbaSArIDJdICYgMHgzRjtcbiAgICAgICAgICBpZiAodWNzNCA+PSAweDgwMCAmJiAodWNzNCAmIDB4RjgwMCkgIT09IDB4RDgwMCkge1xuICAgICAgICAgICAgb3V0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSh1Y3M0ICYgMHhGRkZGKSk7XG4gICAgICAgICAgICBpICs9IDM7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaW5wdXRbaV0gPCAweEY4KSB7XG4gICAgICAgIGlmIChVVEY4Ll9jaGVja0NvbnRpbnVhdGlvbihpbnB1dCwgaSwgMykpIHtcbiAgICAgICAgICBsZXQgdWNzNCA9IChpbnB1dFtpXSAmIDB4NykgPDwgMTggfCAoaW5wdXRbaSArIDFdICYgMHgzRikgPDwgMTIgfFxuICAgICAgICAgICAgICAgICAgICAoaW5wdXRbaSArIDJdICYgMHgzRikgPDwgNiB8IChpbnB1dFtpICsgM10gJiAweDNGKTtcbiAgICAgICAgICBpZiAodWNzNCA+IDB4MTAwMDAgJiYgdWNzNCA8IDB4MTEwMDAwKSB7XG4gICAgICAgICAgICB1Y3M0IC09IDB4MTAwMDA7XG4gICAgICAgICAgICBvdXQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKCh1Y3M0ID4+PiAxMCkgfCAweEQ4MDApKTtcbiAgICAgICAgICAgIG91dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoKHVjczQgJiAweDNGRikgfCAweERDMDApKTtcbiAgICAgICAgICAgIGkgKz0gNDtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgb3V0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgweEZGRkQpKTtcbiAgICAgICsraTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0LmpvaW4oJycpO1xuICB9XG5cbiAgc3RhdGljIF9jaGVja0NvbnRpbnVhdGlvbiAodWludDhhcnJheSwgc3RhcnQsIGNoZWNrTGVuZ3RoKSB7XG4gICAgbGV0IGFycmF5ID0gdWludDhhcnJheTtcbiAgICBpZiAoc3RhcnQgKyBjaGVja0xlbmd0aCA8IGFycmF5Lmxlbmd0aCkge1xuICAgICAgd2hpbGUgKGNoZWNrTGVuZ3RoLS0pIHtcbiAgICAgICAgaWYgKChhcnJheVsrK3N0YXJ0XSAmIDB4QzApICE9PSAweDgwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVVEY4O1xuIiwiY29uc3QgaXNPYmplY3RGaWxsZWQgPSAob2JqKSA9PiB7XG4gIGZvciAobGV0IGtleSBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGlmIChvYmpba2V5XSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVkaWFJbmZvIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMubWltZVR5cGUgPSBudWxsXG4gICAgdGhpcy5kdXJhdGlvbiA9IG51bGxcblxuICAgIHRoaXMuaGFzVmlkZW8gPSBudWxsXG4gICAgdGhpcy52aWRlbyA9IHtcbiAgICAgIGNvZGVjOiBudWxsLFxuICAgICAgd2lkdGg6IG51bGwsXG4gICAgICBoZWlnaHQ6IG51bGwsXG4gICAgICBwcm9maWxlOiBudWxsLFxuICAgICAgbGV2ZWw6IG51bGwsXG4gICAgICBmcmFtZVJhdGU6IHtcbiAgICAgICAgZml4ZWQ6IHRydWUsXG4gICAgICAgIGZwczogMjUsXG4gICAgICAgIGZwc19udW06IDI1MDAwLFxuICAgICAgICBmcHNfZGVuOiAxMDAwXG4gICAgICB9LFxuICAgICAgY2hyb21hRm9ybWF0OiBudWxsLFxuICAgICAgcGFyUmF0aW86IHtcbiAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgIGhlaWdodDogMVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaGFzQXVkaW8gPSBudWxsXG5cbiAgICB0aGlzLmF1ZGlvID0ge1xuICAgICAgY29kZWM6IG51bGwsXG4gICAgICBzYW1wbGVSYXRlOiBudWxsLFxuICAgICAgc2FtcGxlUmF0ZUluZGV4OiBudWxsLFxuICAgICAgY2hhbm5lbENvdW50OiBudWxsXG4gICAgfVxuICB9XG5cbiAgaXNDb21wbGV0ZSAoKSB7XG4gICAgcmV0dXJuIE1lZGlhSW5mby5pc0Jhc2VJbmZvUmVhZHkodGhpcykgJiYgTWVkaWFJbmZvLmlzVmlkZW9SZWFkeSh0aGlzKSAmJiBNZWRpYUluZm8uaXNBdWRpb1JlYWR5KHRoaXMpXG4gIH1cblxuICBzdGF0aWMgaXNCYXNlSW5mb1JlYWR5IChtZWRpYUluZm8pIHtcbiAgICByZXR1cm4gaXNPYmplY3RGaWxsZWQobWVkaWFJbmZvKVxuICB9XG5cbiAgc3RhdGljIGlzVmlkZW9SZWFkeSAobWVkaWFJbmZvKSB7XG4gICAgaWYgKCFtZWRpYUluZm8uaGFzVmlkZW8pIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgcmV0dXJuIGlzT2JqZWN0RmlsbGVkKG1lZGlhSW5mby52aWRlbylcbiAgfVxuXG4gIHN0YXRpYyBpc0F1ZGlvUmVhZHkgKG1lZGlhSW5mbykge1xuICAgIGlmICghbWVkaWFJbmZvLmhhc0F1ZGlvKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHJldHVybiBpc09iamVjdEZpbGxlZChtZWRpYUluZm8udmlkZW8pXG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lZGlhU2FtcGxlIHtcbiAgY29uc3RydWN0b3IgKGluZm8pIHtcbiAgICBsZXQgX2RlZmF1bHQgPSBNZWRpYVNhbXBsZS5nZXREZWZhdWx0SW5mKClcblxuICAgIGlmICghaW5mbyB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5mbykgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICByZXR1cm4gX2RlZmF1bHRcbiAgICB9XG4gICAgbGV0IHNhbXBsZSA9IE9iamVjdC5hc3NpZ24oe30sIF9kZWZhdWx0LCBpbmZvKVxuXG4gICAgT2JqZWN0LmVudHJpZXMoc2FtcGxlKS5mb3JFYWNoKChbaywgdl0pID0+IHtcbiAgICAgIHRoaXNba10gPSB2XG4gICAgfSlcbiAgfVxuXG4gIHN0YXRpYyBnZXREZWZhdWx0SW5mICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZHRzOiBudWxsLFxuICAgICAgcHRzOiBudWxsLFxuICAgICAgZHVyYXRpb246IG51bGwsXG4gICAgICBwb3NpdGlvbjogbnVsbCxcbiAgICAgIGlzUkFQOiBmYWxzZSwgLy8gaXMgUmFuZG9tIGFjY2VzcyBwb2ludFxuICAgICAgb3JpZ2luRHRzOiBudWxsXG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNZWRpYVNlZ21lbnRMaXN0IHtcblxuICAgIGNvbnN0cnVjdG9yICh0eXBlKSB7XG4gICAgICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLl9saXN0ID0gW107XG4gICAgICAgIHRoaXMuX2xhc3RBcHBlbmRMb2NhdGlvbiA9IC0xOyAvLyBjYWNoZWQgbGFzdCBpbnNlcnQgbG9jYXRpb25cbiAgICB9XG5cbiAgICBnZXQgdHlwZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90eXBlO1xuICAgIH1cblxuICAgIGdldCBsZW5ndGggKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGlzdC5sZW5ndGg7XG4gICAgfVxuXG4gICAgaXNFbXB0eSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0Lmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICBjbGVhciAoKSB7XG4gICAgICAgIHRoaXMuX2xpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5fbGFzdEFwcGVuZExvY2F0aW9uID0gLTE7XG4gICAgfVxuXG4gICAgX3NlYXJjaE5lYXJlc3RTZWdtZW50QmVmb3JlIChiZWdpbkR0cykge1xuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuX2xpc3Q7XG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIC0yO1xuICAgICAgICB9XG4gICAgICAgIGxldCBsYXN0ID0gbGlzdC5sZW5ndGggLSAxO1xuICAgICAgICBsZXQgbWlkID0gMDtcbiAgICAgICAgbGV0IGxib3VuZCA9IDA7XG4gICAgICAgIGxldCB1Ym91bmQgPSBsYXN0O1xuXG4gICAgICAgIGxldCBpZHggPSAwO1xuXG4gICAgICAgIGlmIChiZWdpbkR0cyA8IGxpc3RbMF0ub3JpZ2luRHRzKSB7XG4gICAgICAgICAgICBpZHggPSAtMTtcbiAgICAgICAgICAgIHJldHVybiBpZHg7XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAobGJvdW5kIDw9IHVib3VuZCkge1xuICAgICAgICAgICAgbWlkID0gbGJvdW5kICsgTWF0aC5mbG9vcigodWJvdW5kIC0gbGJvdW5kKSAvIDIpO1xuICAgICAgICAgICAgaWYgKG1pZCA9PT0gbGFzdCB8fCAoYmVnaW5EdHMgPiBsaXN0W21pZF0ubGFzdFNhbXBsZS5vcmlnaW5EdHNcbiAgICAgICAgICAgICAgICAgICAgJiYgKGJlZ2luRHRzIDwgbGlzdFttaWQgKyAxXS5vcmlnaW5EdHMpKSkge1xuICAgICAgICAgICAgICAgIGlkeCA9IG1pZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGlzdFttaWRdLm9yaWdpbkR0cyA8IGJlZ2luRHRzKSB7XG4gICAgICAgICAgICAgICAgbGJvdW5kID0gbWlkICsgMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdWJvdW5kID0gbWlkIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaWR4O1xuICAgIH1cblxuICAgIF9zZWFyY2hOZWFyZXN0U2VnbWVudEFmdGVyIChiZWdpbkR0cykge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUoYmVnaW5EdHMpICsgMTtcbiAgICB9XG5cbiAgICBhcHBlbmQgKHNlZ21lbnQpIHtcbiAgICAgICAgbGV0IGxpc3QgPSB0aGlzLl9saXN0O1xuICAgICAgICBsZXQgbGFzdEFwcGVuZElkeCA9IHRoaXMuX2xhc3RBcHBlbmRMb2NhdGlvbjtcbiAgICAgICAgbGV0IGluc2VydElkeCA9IDA7XG5cbiAgICAgICAgaWYgKGxhc3RBcHBlbmRJZHggIT09IC0xICYmIGxhc3RBcHBlbmRJZHggPCBsaXN0Lmxlbmd0aFxuICAgICAgICAgICAgJiYgc2VnbWVudC5vcmlnaW5TdGFydER0cyA+PSBsaXN0W2xhc3RBcHBlbmRJZHhdLmxhc3RTYW1wbGUub3JpZ2luRHRzXG4gICAgICAgICAgICAmJiAoKGxhc3RBcHBlbmRJZHggPT09IGxpc3QubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgICAgICB8fCAobGFzdEFwcGVuZElkeCA8IGxpc3QubGVuZ3RoIC0gMVxuICAgICAgICAgICAgICAgICAgICAmJiBzZWdtZW50Lm9yaWdpblN0YXJ0RHRzIDwgbGlzdFtsYXN0QXBwZW5kSWR4ICsgMV0ub3JpZ2luU3RhcnREdHMpKSkge1xuICAgICAgICAgICAgaW5zZXJ0SWR4ID0gbGFzdEFwcGVuZElkeCArIDE7IC8vIHVzZSBjYWNoZWQgbG9jYXRpb24gaWR4XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAobGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaW5zZXJ0SWR4ID0gdGhpcy5fc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUoc2VnbWVudC5vcmlnaW5TdGFydER0cykgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbGFzdEFwcGVuZExvY2F0aW9uID0gaW5zZXJ0SWR4O1xuICAgICAgICB0aGlzLl9saXN0LnNwbGljZShpbnNlcnRJZHgsIDAsIHNlZ21lbnQpO1xuICAgIH1cblxuICAgIGdldExhc3RTZWdtZW50QmVmb3JlIChiZWdpbkR0cykge1xuICAgICAgICBsZXQgaWR4ID0gdGhpcy5fc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUoYmVnaW5EdHMpO1xuICAgICAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0W2lkeF07XG4gICAgICAgIH0gZWxzZSB7IC8vIC0xXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldExhc3RTYW1wbGVCZWZvcmUgKGJlZ2luRHRzKSB7XG4gICAgICAgIGxldCBzZWdtZW50ID0gdGhpcy5nZXRMYXN0U2VnbWVudEJlZm9yZShiZWdpbkR0cyk7XG4gICAgICAgIGlmIChzZWdtZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VnbWVudC5sYXN0U2FtcGxlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRMYXN0UkFQQmVmb3JlIChiZWdpbkR0cykge1xuICAgICAgICBsZXQgc2VnbWVudElkeCA9IHRoaXMuX3NlYXJjaE5lYXJlc3RTZWdtZW50QmVmb3JlKGJlZ2luRHRzKTtcbiAgICAgICAgbGV0IHJhbmRvbUFjY2Vzc1BvaW50cyA9IHRoaXMuX2xpc3Rbc2VnbWVudElkeF0ucmFuZG9tQWNjZXNzUG9pbnRzO1xuICAgICAgICB3aGlsZSAocmFuZG9tQWNjZXNzUG9pbnRzLmxlbmd0aCA9PT0gMCAmJiBzZWdtZW50SWR4ID4gMCkge1xuICAgICAgICAgICAgc2VnbWVudElkeC0tO1xuICAgICAgICAgICAgcmFuZG9tQWNjZXNzUG9pbnRzID0gdGhpcy5fbGlzdFtzZWdtZW50SWR4XS5yYW5kb21BY2Nlc3NQb2ludHM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhbmRvbUFjY2Vzc1BvaW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gcmFuZG9tQWNjZXNzUG9pbnRzW3JhbmRvbUFjY2Vzc1BvaW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWVkaWFTZWdtZW50IHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHRoaXMuc3RhcnREdHMgPSAtMTtcbiAgICAgICAgdGhpcy5lbmREdHMgPSAtMTtcbiAgICAgICAgdGhpcy5zdGFydFB0cyA9IC0xO1xuICAgICAgICB0aGlzLmVuZFB0cyA9IC0xO1xuICAgICAgICB0aGlzLm9yaWdpblN0YXJ0RHRzID0gLTE7XG4gICAgICAgIHRoaXMub3JpZ2luRW5kRHRzID0gLTE7XG4gICAgICAgIHRoaXMucmFuZG9tQWNjZXNzUG9pbnRzID0gW107XG4gICAgICAgIHRoaXMuZmlyc3RTYW1wbGUgPSBudWxsO1xuICAgICAgICB0aGlzLmxhc3RTYW1wbGUgPSBudWxsO1xuICAgIH1cblxuICAgIGFkZFJBUCAoc2FtcGxlKSB7XG4gICAgICAgIHNhbXBsZS5pc1JBUCA9IHRydWU7XG4gICAgICAgIHRoaXMucmFuZG9tQWNjZXNzUG9pbnRzLnB1c2goc2FtcGxlKTtcbiAgICB9XG59IiwiZXhwb3J0IGNsYXNzIEF1ZGlvVHJhY2tNZXRhIHtcbiAgY29uc3RydWN0b3IgKG1ldGEpIHtcbiAgICBjb25zdCBfZGVmYXVsdCA9IHtcbiAgICAgIHNhbXBsZVJhdGU6IDQ4MDAwLFxuICAgICAgY2hhbm5lbENvdW50OiAyLFxuICAgICAgY29kZWM6ICdtcDRhLjQwLjInLFxuICAgICAgY29uZmlnOiBbNDEsIDQwMSwgMTM2LCAwXSxcbiAgICAgIGR1cmF0aW9uOiAwLFxuICAgICAgaWQ6IDIsXG4gICAgICByZWZTYW1wbGVEdXJhdGlvbjogMjEsXG4gICAgICBzYW1wbGVSYXRlSW5kZXg6IDMsXG4gICAgICB0aW1lc2NhbGU6IDEwMDAsXG4gICAgICB0eXBlOiAnYXVkaW8nXG4gICAgfVxuICAgIGlmIChtZXRhKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgX2RlZmF1bHQsIG1ldGEpXG4gICAgfVxuICAgIHJldHVybiBfZGVmYXVsdFxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5pbml0ID0gbnVsbFxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBWaWRlb1RyYWNrTWV0YSB7XG4gIGNvbnN0cnVjdG9yIChtZXRhKSB7XG4gICAgY29uc3QgX2RlZmF1bHQgPSB7XG4gICAgICBhdmNjOiBudWxsLFxuICAgICAgc3BzOiBuZXcgVWludDhBcnJheSgwKSxcbiAgICAgIHBwczogbmV3IFVpbnQ4QXJyYXkoMCksXG4gICAgICBjaHJvbWFGb3JtYXQ6IDQyMCxcbiAgICAgIGNvZGVjOiAnYXZjMS42NDAwMjAnLFxuICAgICAgY29kZWNIZWlnaHQ6IDcyMCxcbiAgICAgIGNvZGVjV2lkdGg6IDEyODAsXG4gICAgICBkdXJhdGlvbjogMCxcbiAgICAgIGZyYW1lUmF0ZToge1xuICAgICAgICBmaXhlZDogdHJ1ZSxcbiAgICAgICAgZnBzOiAyNSxcbiAgICAgICAgZnBzX251bTogMjUwMDAsXG4gICAgICAgIGZwc19kZW46IDEwMDBcbiAgICAgIH0sXG4gICAgICBpZDogMSxcbiAgICAgIGxldmVsOiAnMy4yJyxcbiAgICAgIHByZXNlbnRIZWlnaHQ6IDcyMCxcbiAgICAgIHByZXNlbnRXaWR0aDogMTI4MCxcbiAgICAgIHByb2ZpbGU6ICdIaWdoJyxcbiAgICAgIHJlZlNhbXBsZUR1cmF0aW9uOiA0MCxcbiAgICAgIHBhclJhdGlvOiB7XG4gICAgICAgIGhlaWdodDogMSxcbiAgICAgICAgd2lkdGg6IDFcbiAgICAgIH0sXG4gICAgICB0aW1lc2NhbGU6IDEwMDAsXG4gICAgICB0eXBlOiAndmlkZW8nXG4gICAgfVxuXG4gICAgaWYgKG1ldGEpIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBfZGVmYXVsdCwgbWV0YSlcbiAgICB9XG4gICAgcmV0dXJuIF9kZWZhdWx0XG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLmluaXQgPSBudWxsXG4gICAgdGhpcy5zcHMgPSBudWxsXG4gICAgdGhpcy5wcHMgPSBudWxsXG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBBdWRpb1RyYWNrU2FtcGxlIHtcbiAgY29uc3RydWN0b3IgKGluZm8pIHtcbiAgICBsZXQgX2RlZmF1bHQgPSBBdWRpb1RyYWNrU2FtcGxlLmdldERlZmF1bHQoKVxuICAgIGlmICghaW5mbykge1xuICAgICAgcmV0dXJuIF9kZWZhdWx0XG4gICAgfVxuICAgIGxldCBzYW1wbGUgPSBPYmplY3QuYXNzaWduKHt9LCBfZGVmYXVsdCwgaW5mbylcblxuICAgIHJldHVybiBzYW1wbGVcbiAgfVxuXG4gIHN0YXRpYyBnZXREZWZhdWx0ICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZHRzOiBudWxsLFxuICAgICAgcHRzOiBudWxsLFxuICAgICAgZGF0YTogbmV3IFVpbnQ4QXJyYXkoKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVmlkZW9UcmFja1NhbXBsZSB7XG4gIGNvbnN0cnVjdG9yIChpbmZvKSB7XG4gICAgbGV0IF9kZWZhdWx0ID0gVmlkZW9UcmFja1NhbXBsZS5nZXREZWZhdWx0KClcblxuICAgIGlmICghaW5mbykge1xuICAgICAgcmV0dXJuIF9kZWZhdWx0XG4gICAgfVxuICAgIGxldCBzYW1wbGUgPSBPYmplY3QuYXNzaWduKHt9LCBfZGVmYXVsdCwgaW5mbylcblxuICAgIHJldHVybiBzYW1wbGVcbiAgfVxuXG4gIHN0YXRpYyBnZXREZWZhdWx0ICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZHRzOiBudWxsLFxuICAgICAgcHRzOiBudWxsLFxuICAgICAgaXNLZXlmcmFtZTogZmFsc2UsIC8vIGlzIFJhbmRvbSBhY2Nlc3MgcG9pbnRcbiAgICAgIG9yaWdpbkR0czogbnVsbCxcbiAgICAgIGRhdGE6IG5ldyBVaW50OEFycmF5KClcbiAgICB9XG4gIH1cbn1cbiIsImNsYXNzIE1TRSB7XG4gIGNvbnN0cnVjdG9yIChjb25maWdzKSB7XG4gICAgdGhpcy5jb25maWdzID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlncyk7XG4gICAgdGhpcy5jb250YWluZXIgPSB0aGlzLmNvbmZpZ3MuY29udGFpbmVyO1xuICAgIHRoaXMubWVkaWFTb3VyY2UgPSBudWxsO1xuICAgIHRoaXMuc291cmNlQnVmZmVycyA9IHt9O1xuICAgIHRoaXMucHJlbG9hZFRpbWUgPSB0aGlzLmNvbmZpZ3MucHJlbG9hZFRpbWUgfHwgMTtcbiAgICB0aGlzLm9uU291cmNlT3BlbiA9IHRoaXMub25Tb3VyY2VPcGVuLmJpbmQodGhpcylcbiAgICB0aGlzLm9uVGltZVVwZGF0ZSA9IHRoaXMub25UaW1lVXBkYXRlLmJpbmQodGhpcylcbiAgICB0aGlzLm9uVXBkYXRlRW5kID0gdGhpcy5vblVwZGF0ZUVuZC5iaW5kKHRoaXMpXG4gICAgdGhpcy5vbldhaXRpbmcgPSB0aGlzLm9uV2FpdGluZy5iaW5kKHRoaXMpXG4gIH1cblxuICBpbml0ICgpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICB0aGlzLm1lZGlhU291cmNlID0gbmV3IHNlbGYuTWVkaWFTb3VyY2UoKTtcbiAgICB0aGlzLm1lZGlhU291cmNlLmFkZEV2ZW50TGlzdGVuZXIoJ3NvdXJjZW9wZW4nLCB0aGlzLm9uU291cmNlT3Blbik7XG4gICAgdGhpcy5jb250YWluZXIuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTCh0aGlzLm1lZGlhU291cmNlKTtcbiAgICB0aGlzLnVybCA9IHRoaXMuY29udGFpbmVyLnNyYztcbiAgICB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgdGhpcy5vblRpbWVVcGRhdGUpO1xuICAgIHRoaXMuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3dhaXRpbmcnLCB0aGlzLm9uV2FpdGluZyk7XG4gIH1cblxuICBvblRpbWVVcGRhdGUgKCkge1xuICAgIHRoaXMuZW1pdCgnVElNRV9VUERBVEUnLCB0aGlzLmNvbnRhaW5lcik7XG4gIH1cblxuICBvbldhaXRpbmcgKCkge1xuICAgIHRoaXMuZW1pdCgnV0FJVElORycsIHRoaXMuY29udGFpbmVyKTtcbiAgfVxuXG4gIG9uU291cmNlT3BlbiAoKSB7XG4gICAgdGhpcy5hZGRTb3VyY2VCdWZmZXJzKCk7XG4gIH1cblxuICBvblVwZGF0ZUVuZCAoKSB7XG4gICAgdGhpcy5lbWl0KCdTT1VSQ0VfVVBEQVRFX0VORCcpO1xuICAgIHRoaXMuZG9BcHBlbmQoKVxuICB9XG4gIGFkZFNvdXJjZUJ1ZmZlcnMgKCkge1xuICAgIGlmICh0aGlzLm1lZGlhU291cmNlLnJlYWR5U3RhdGUgIT09ICdvcGVuJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgc291cmNlcyA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1BSRV9TT1VSQ0VfQlVGRkVSJyk7XG4gICAgbGV0IHRyYWNrcyA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ1RSQUNLUycpO1xuICAgIGxldCB0cmFjaztcblxuICAgIHNvdXJjZXMgPSBzb3VyY2VzLnNvdXJjZXM7XG4gICAgbGV0IGFkZCA9IGZhbHNlO1xuICAgIGZvciAobGV0IGkgPSAwLCBrID0gT2JqZWN0LmtleXMoc291cmNlcykubGVuZ3RoOyBpIDwgazsgaSsrKSB7XG4gICAgICBsZXQgdHlwZSA9IE9iamVjdC5rZXlzKHNvdXJjZXMpW2ldO1xuICAgICAgaWYgKHR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgICAgdHJhY2sgPSB0cmFja3MuYXVkaW9UcmFjaztcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICB0cmFjayA9IHRyYWNrcy52aWRlb1RyYWNrO1xuICAgICAgICAvLyByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodHJhY2spIHtcbiAgICAgICAgbGV0IGR1ciA9IHR5cGUgPT09ICdhdWRpbycgPyAyMSA6IDQwO1xuICAgICAgICBpZiAodHJhY2subWV0YSAmJiB0cmFjay5tZXRhLnJlZlNhbXBsZUR1cmF0aW9uKSBkdXIgPSB0cmFjay5tZXRhLnJlZlNhbXBsZUR1cmF0aW9uO1xuICAgICAgICBpZiAoc291cmNlc1t0eXBlXS5kYXRhLmxlbmd0aCA+PSAodGhpcy5wcmVsb2FkVGltZSAvIGR1cikpIHtcbiAgICAgICAgICBhZGQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGFkZCkge1xuICAgICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycykubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gMCwgayA9IE9iamVjdC5rZXlzKHNvdXJjZXMpLmxlbmd0aDsgaSA8IGs7IGkrKykge1xuICAgICAgICBsZXQgdHlwZSA9IE9iamVjdC5rZXlzKHNvdXJjZXMpW2ldO1xuICAgICAgICBsZXQgc291cmNlID0gc291cmNlc1t0eXBlXVxuICAgICAgICBsZXQgbWltZSA9ICh0eXBlID09PSAndmlkZW8nKSA/ICd2aWRlby9tcDQ7Y29kZWNzPScgKyBzb3VyY2UubWltZXR5cGUgOiAnYXVkaW8vbXA0O2NvZGVjcz0nICsgc291cmNlLm1pbWV0eXBlXG4gICAgICAgIGxldCBzb3VyY2VCdWZmZXIgPSB0aGlzLm1lZGlhU291cmNlLmFkZFNvdXJjZUJ1ZmZlcihtaW1lKTtcbiAgICAgICAgdGhpcy5zb3VyY2VCdWZmZXJzW3R5cGVdID0gc291cmNlQnVmZmVyO1xuICAgICAgICBzb3VyY2VCdWZmZXIuYWRkRXZlbnRMaXN0ZW5lcigndXBkYXRlZW5kJywgdGhpcy5vblVwZGF0ZUVuZCk7XG4gICAgICAgIHRoaXMuZG9BcHBlbmQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkb0FwcGVuZCAoKSB7XG4gICAgbGV0IHNvdXJjZXMgPSB0aGlzLl9jb250ZXh0LmdldEluc3RhbmNlKCdQUkVfU09VUkNFX0JVRkZFUicpO1xuICAgIGlmIChzb3VyY2VzKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE9iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycykubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHR5cGUgPSBPYmplY3Qua2V5cyh0aGlzLnNvdXJjZUJ1ZmZlcnMpW2ldXG4gICAgICAgIGxldCBzb3VyY2VCdWZmZXIgPSB0aGlzLnNvdXJjZUJ1ZmZlcnNbdHlwZV07XG4gICAgICAgIGlmICghc291cmNlQnVmZmVyLnVwZGF0aW5nKSB7XG4gICAgICAgICAgbGV0IHNvdXJjZSA9IHNvdXJjZXMuc291cmNlc1t0eXBlXTtcbiAgICAgICAgICBpZiAoc291cmNlICYmICFzb3VyY2UuaW5pdGVkKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnYXBwZW5kIGluaXRpYWwgc2VnbWVudCcpXG4gICAgICAgICAgICBzb3VyY2VCdWZmZXIuYXBwZW5kQnVmZmVyKHNvdXJjZS5pbml0LmJ1ZmZlci5idWZmZXIpO1xuICAgICAgICAgICAgc291cmNlLmluaXRlZCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIGlmIChzb3VyY2UpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gc291cmNlLmRhdGEuc2hpZnQoKVxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgc291cmNlQnVmZmVyLmFwcGVuZEJ1ZmZlcihkYXRhLmJ1ZmZlci5idWZmZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGVuZE9mU3RyZWFtICgpIHtcbiAgICBjb25zdCB7IHJlYWR5U3RhdGUsIGFjdGl2ZVNvdXJjZUJ1ZmZlcnMgfSA9IHRoaXMubWVkaWFTb3VyY2U7XG4gICAgaWYgKHJlYWR5U3RhdGUgPT09ICdvcGVuJyAmJiBhY3RpdmVTb3VyY2VCdWZmZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5tZWRpYVNvdXJjZS5lbmRPZlN0cmVhbSgpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGxvZ1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZSAoZW5kLCBzdGFydCA9IDApIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE9iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycykubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBidWZmZXIgPSB0aGlzLnNvdXJjZUJ1ZmZlcnNbT2JqZWN0LmtleXModGhpcy5zb3VyY2VCdWZmZXJzKVtpXV07XG4gICAgICBpZiAoIWJ1ZmZlci51cGRhdGluZykge1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdyZW1vdmUnLCBzdGFydCwgZW5kKVxuICAgICAgICBidWZmZXIucmVtb3ZlKHN0YXJ0LCBlbmQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZW1vdmVCdWZmZXJzICgpIHtcbiAgICBjb25zdCB0YXNrTGlzdCA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBPYmplY3Qua2V5cyh0aGlzLnNvdXJjZUJ1ZmZlcnMpLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYnVmZmVyID0gdGhpcy5zb3VyY2VCdWZmZXJzW09iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycylbaV1dO1xuICAgICAgYnVmZmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3VwZGF0ZWVuZCcsIHRoaXMub25VcGRhdGVFbmQpO1xuXG4gICAgICBsZXQgdGFzaztcbiAgICAgIGlmIChidWZmZXIudXBkYXRpbmcpIHtcbiAgICAgICAgdGFzayA9IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgY29uc3QgZG9DbGVhbkJ1ZmZlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCByZXRyeVRpbWUgPSAzXG5cbiAgICAgICAgICAgIGNvbnN0IGNsZWFuID0gKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWJ1ZmZlci51cGRhdGluZykge1xuICAgICAgICAgICAgICAgIE1TRS5jbGVhckJ1ZmZlcihidWZmZXIpXG4gICAgICAgICAgICAgICAgYnVmZmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3VwZGF0ZWVuZCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJldHJ5VGltZSA+IDApe1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoY2xlYW4sIDIwMClcbiAgICAgICAgICAgICAgICByZXRyeVRpbWUtLVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoY2xlYW4sIDIwMClcbiAgICAgICAgICAgIGJ1ZmZlci5yZW1vdmVFdmVudExpc3RlbmVyKCd1cGRhdGVlbmQnLCBkb0NsZWFuQnVmZmVyKVxuICAgICAgICAgIH1cbiAgICAgICAgICBidWZmZXIuYWRkRXZlbnRMaXN0ZW5lcigndXBkYXRlZW5kJywgZG9DbGVhbkJ1ZmZlcilcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhc2sgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgIE1TRS5jbGVhckJ1ZmZlcihidWZmZXIpXG4gICAgICAgICAgYnVmZmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3VwZGF0ZWVuZCcsICgpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gdGFzayA9IFByb21pc2UucmVzb2x2ZSgpXG4gICAgICB9XG5cbiAgICAgIHRhc2tMaXN0LnB1c2godGFzaylcbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5hbGwodGFza0xpc3QpXG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICByZXR1cm4gdGhpcy5yZW1vdmVCdWZmZXJzKCkudGhlbigoKSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE9iamVjdC5rZXlzKHRoaXMuc291cmNlQnVmZmVycykubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IHRoaXMuc291cmNlQnVmZmVyc1tPYmplY3Qua2V5cyh0aGlzLnNvdXJjZUJ1ZmZlcnMpW2ldXTtcbiAgICAgICAgdGhpcy5tZWRpYVNvdXJjZS5yZW1vdmVTb3VyY2VCdWZmZXIoYnVmZmVyKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuc291cmNlQnVmZmVyc1tPYmplY3Qua2V5cyh0aGlzLnNvdXJjZUJ1ZmZlcnMpW2ldXTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndGltZXVwZGF0ZScsIHRoaXMub25UaW1lVXBkYXRlKTtcbiAgICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3dhaXRpbmcnLCB0aGlzLm9uV2FpdGluZyk7XG4gICAgICB0aGlzLm1lZGlhU291cmNlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3NvdXJjZW9wZW4nLCB0aGlzLm9uU291cmNlT3Blbik7XG5cbiAgICAgIHRoaXMuZW5kT2ZTdHJlYW0oKVxuICAgICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwodGhpcy51cmwpO1xuXG4gICAgICB0aGlzLnVybCA9IG51bGxcbiAgICAgIHRoaXMuY29uZmlncyA9IHt9O1xuICAgICAgdGhpcy5jb250YWluZXIgPSBudWxsO1xuICAgICAgdGhpcy5tZWRpYVNvdXJjZSA9IG51bGw7XG4gICAgICB0aGlzLnNvdXJjZUJ1ZmZlcnMgPSB7fTtcbiAgICAgIHRoaXMucHJlbG9hZFRpbWUgPSAxO1xuICAgIH0pXG4gIH1cblxuICBzdGF0aWMgY2xlYXJCdWZmZXIgKGJ1ZmZlcikge1xuICAgIGNvbnN0IGJ1ZmZlcmVkID0gYnVmZmVyLmJ1ZmZlcmVkO1xuICAgIGxldCBiRW5kID0gMC4xXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGJ1ZmZlcmVkLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBiRW5kID0gYnVmZmVyZWQuZW5kKGkpXG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBidWZmZXIucmVtb3ZlKDAsIGJFbmQpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gRE8gTk9USElOR1xuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgTVNFO1xuIiwiaW1wb3J0IENvbmNhdCBmcm9tICdjb25jYXQtdHlwZWQtYXJyYXknXG5cbmNsYXNzIEJ1ZmZlciB7XG4gIGNvbnN0cnVjdG9yIChidWZmZXIpIHtcbiAgICB0aGlzLmJ1ZmZlciA9IGJ1ZmZlciB8fCBuZXcgVWludDhBcnJheSgwKVxuICB9XG5cbiAgd3JpdGUgKC4uLmJ1ZmZlcikge1xuICAgIGJ1ZmZlci5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgdGhpcy5idWZmZXIgPSBDb25jYXQoVWludDhBcnJheSwgdGhpcy5idWZmZXIsIGl0ZW0pXG4gICAgfSlcbiAgfVxuXG4gIHN0YXRpYyB3cml0ZVVpbnQzMiAodmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgdmFsdWUgPj4gMjQsXG4gICAgICAodmFsdWUgPj4gMTYpICYgMHhmZixcbiAgICAgICh2YWx1ZSA+PiA4KSAmIDB4ZmYsXG4gICAgICB2YWx1ZSAmIDB4ZmZcbiAgICBdKVxuICB9XG5cbiAgc3RhdGljIHJlYWRBc0ludCAoYXJyKSB7XG4gICAgbGV0IHRlbXAgPSAnJ1xuXG4gICAgZnVuY3Rpb24gcGFkU3RhcnQ0SGV4IChoZXhOdW0pIHtcbiAgICAgIGxldCBoZXhTdHIgPSBoZXhOdW0udG9TdHJpbmcoMTYpXG4gICAgICByZXR1cm4gaGV4U3RyLnBhZFN0YXJ0KDIsICcwJylcbiAgICB9XG5cbiAgICBhcnIuZm9yRWFjaChudW0gPT4ge1xuICAgICAgdGVtcCArPSBwYWRTdGFydDRIZXgobnVtKVxuICAgIH0pXG4gICAgcmV0dXJuIHBhcnNlSW50KHRlbXAsIDE2KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJ1ZmZlclxuIiwiY2xhc3MgU3RyZWFtIHtcbiAgY29uc3RydWN0b3IgKGJ1ZmZlcikge1xuICAgIGlmIChidWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgdGhpcy5idWZmZXIgPSBidWZmZXI7XG4gICAgICB0aGlzLmRhdGF2aWV3ID0gbmV3IERhdGFWaWV3KGJ1ZmZlcik7XG4gICAgICB0aGlzLmRhdGF2aWV3LnBvc2l0aW9uID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdkYXRhIGlzIGludmFsaWQnKTtcbiAgICB9XG4gIH1cblxuICBnZXQgbGVuZ3RoICgpIHtcbiAgICByZXR1cm4gdGhpcy5idWZmZXIuYnl0ZUxlbmd0aDtcbiAgfVxuXG4gIHNldCBwb3NpdGlvbiAodmFsdWUpIHtcbiAgICB0aGlzLmRhdGF2aWV3LnBvc2l0aW9uID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcG9zaXRpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGF2aWV3LnBvc2l0aW9uO1xuICB9XG5cbiAgYmFjayAoY291bnQpIHtcbiAgICB0aGlzLnBvc2l0aW9uIC09IGNvdW50O1xuICB9XG5cbiAgc2tpcCAoY291bnQpIHtcbiAgICBsZXQgbG9vcCA9IE1hdGguZmxvb3IoY291bnQgLyA0KTtcbiAgICBsZXQgbGFzdCA9IGNvdW50ICUgNDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxvb3A7IGkrKykge1xuICAgICAgU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIDQpO1xuICAgIH1cbiAgICBpZiAobGFzdCA+IDApIHtcbiAgICAgIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCBsYXN0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogW3JlYWRCeXRlIOS7jkRhdGFWaWV35Lit6K+75Y+W5pWw5o2uXVxuICAgKiBAcGFyYW0gIHtEYXRhVmlld30gYnVmZmVyIFtEYXRhVmlld+WunuS+i11cbiAgICogQHBhcmFtICB7TnVtYmVyfSBzaXplICAgW+ivu+WPluWtl+iKguaVsF1cbiAgICogQHJldHVybiB7TnVtYmVyfSAgICAgICAgW+aVtOaVsF1cbiAgICovXG4gIHN0YXRpYyByZWFkQnl0ZSAoYnVmZmVyLCBzaXplLCBzaWduKSB7XG4gICAgbGV0IHJlcztcbiAgICBzd2l0Y2ggKHNpemUpIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaWYgKHNpZ24pIHtcbiAgICAgICAgICByZXMgPSBidWZmZXIuZ2V0SW50OChidWZmZXIucG9zaXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRVaW50OChidWZmZXIucG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBpZiAoc2lnbikge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRJbnQxNihidWZmZXIucG9zaXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcyA9IGJ1ZmZlci5nZXRVaW50MTYoYnVmZmVyLnBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaWYgKHNpZ24pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBzdXBwb3J0ZWQgZm9yIHJlYWRCeXRlIDMnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXMgPSBidWZmZXIuZ2V0VWludDgoYnVmZmVyLnBvc2l0aW9uKSA8PCAxNjtcbiAgICAgICAgICByZXMgfD0gYnVmZmVyLmdldFVpbnQ4KGJ1ZmZlci5wb3NpdGlvbiArIDEpIDw8IDg7XG4gICAgICAgICAgcmVzIHw9IGJ1ZmZlci5nZXRVaW50OChidWZmZXIucG9zaXRpb24gKyAyKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDpcbiAgICAgICAgaWYgKHNpZ24pIHtcbiAgICAgICAgICByZXMgPSBidWZmZXIuZ2V0SW50MzIoYnVmZmVyLnBvc2l0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXMgPSBidWZmZXIuZ2V0VWludDMyKGJ1ZmZlci5wb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDg6XG4gICAgICAgIGlmIChzaWduKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3Qgc3VwcG9ydGVkIGZvciByZWFkQm9keSA4Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzID0gYnVmZmVyLmdldFVpbnQzMihidWZmZXIucG9zaXRpb24pIDw8IDMyO1xuICAgICAgICAgIHJlcyB8PSBidWZmZXIuZ2V0VWludDMyKGJ1ZmZlci5wb3NpdGlvbiArIDQpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmVzID0gJyc7XG4gICAgfVxuICAgIGJ1ZmZlci5wb3NpdGlvbiArPSBzaXplO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICByZWFkVWludDggKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgMSk7XG4gIH1cblxuICByZWFkVWludDE2ICgpIHtcbiAgICByZXR1cm4gU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIDIpO1xuICB9XG5cbiAgcmVhZFVpbnQyNCAoKSB7XG4gICAgcmV0dXJuIFN0cmVhbS5yZWFkQnl0ZSh0aGlzLmRhdGF2aWV3LCAzKTtcbiAgfVxuXG4gIHJlYWRVaW50MzIgKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgNCk7XG4gIH1cblxuICByZWFkVWludDY0ICgpIHtcbiAgICByZXR1cm4gU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIDgpO1xuICB9XG5cbiAgcmVhZEludDggKCkge1xuICAgIHJldHVybiBTdHJlYW0ucmVhZEJ5dGUodGhpcy5kYXRhdmlldywgMSwgdHJ1ZSk7XG4gIH1cbiAgcmVhZEludDE2ICgpIHtcbiAgICByZXR1cm4gU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIDIsIHRydWUpO1xuICB9XG5cbiAgcmVhZEludDMyICgpIHtcbiAgICByZXR1cm4gU3RyZWFtLnJlYWRCeXRlKHRoaXMuZGF0YXZpZXcsIDQsIHRydWUpO1xuICB9XG5cbiAgd3JpdGVVaW50MzIgKHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFtcbiAgICAgIHZhbHVlID4+PiAyNCAmIDB4ZmYsXG4gICAgICB2YWx1ZSA+Pj4gMTYgJiAweGZmLFxuICAgICAgdmFsdWUgPj4+IDggJiAweGZmLFxuICAgICAgdmFsdWUgJiAweGZmXG4gICAgXSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RyZWFtO1xuIiwiaW1wb3J0IFJlbXV4ZXIgZnJvbSAneGdwbGF5ZXItcmVtdXgnXG5pbXBvcnQgeyBGZXRjaExvYWRlciB9IGZyb20gJ3hncGxheWVyLWxvYWRlcidcbmltcG9ydCB7IEZsdkRlbXV4ZXIgfSBmcm9tICd4Z3BsYXllci1kZW11eCdcbmltcG9ydCB7IFRyYWNrcywgWGdCdWZmZXIsIFByZVNvdXJjZSB9IGZyb20gJ3hncGxheWVyLWJ1ZmZlcidcbmltcG9ydCB7IE1zZSwgRVZFTlRTIH0gZnJvbSAneGdwbGF5ZXItdXRpbHMnXG5pbXBvcnQgeyBDb21wYXRpYmlsaXR5IH0gZnJvbSAneGdwbGF5ZXItY29kZWMnXG5pbXBvcnQgUGxheWVyIGZyb20gJ3hncGxheWVyJ1xuXG5jb25zdCBSRU1VWF9FVkVOVFMgPSBFVkVOVFMuUkVNVVhfRVZFTlRTO1xuY29uc3QgREVNVVhfRVZFTlRTID0gRVZFTlRTLkRFTVVYX0VWRU5UUztcbmNvbnN0IExPQURFUl9FVkVOVFMgPSBFVkVOVFMuTE9BREVSX0VWRU5UU1xuY29uc3QgTVNFX0VWRU5UUyA9IEVWRU5UUy5NU0VfRVZFTlRTXG5cbmNvbnN0IFRhZyA9ICdGTFZDb250cm9sbGVyJ1xuXG5jbGFzcyBMb2dnZXIge1xuICB3YXJuICgpIHt9XG59XG5cbmNvbnN0IEZMVl9FUlJPUiA9ICdGTFZfRVJST1InXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZsdkNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvciAocGxheWVyKSB7XG4gICAgdGhpcy5UQUcgPSBUYWdcbiAgICB0aGlzLl9wbGF5ZXIgPSBwbGF5ZXJcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpbml0U2VnbWVudEFycml2ZWQ6IGZhbHNlLFxuICAgICAgcmFuZG9tQWNjZXNzUG9pbnRzOiBbXVxuICAgIH1cblxuICAgIHRoaXMuYnVmZmVyQ2xlYXJUaW1lciA9IG51bGw7XG4gIH1cblxuICBpbml0ICgpIHtcbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdGRVRDSF9MT0FERVInLCBGZXRjaExvYWRlcilcbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdMT0FERVJfQlVGRkVSJywgWGdCdWZmZXIpXG5cbiAgICB0aGlzLl9jb250ZXh0LnJlZ2lzdHJ5KCdGTFZfREVNVVhFUicsIEZsdkRlbXV4ZXIpXG4gICAgdGhpcy5fY29udGV4dC5yZWdpc3RyeSgnVFJBQ0tTJywgVHJhY2tzKVxuXG4gICAgdGhpcy5fY29udGV4dC5yZWdpc3RyeSgnTVA0X1JFTVVYRVInLCBSZW11eGVyLk1wNFJlbXV4ZXIpXG4gICAgdGhpcy5fY29udGV4dC5yZWdpc3RyeSgnUFJFX1NPVVJDRV9CVUZGRVInLCBQcmVTb3VyY2UpXG5cbiAgICBpZiAodGhpcy5fcGxheWVyLmNvbmZpZy5jb21wYXRpYmlsaXR5ICE9PSBmYWxzZSkge1xuICAgICAgdGhpcy5fY29udGV4dC5yZWdpc3RyeSgnQ09NUEFUSUJJTElUWScsIENvbXBhdGliaWxpdHkpXG4gICAgfVxuXG4gICAgdGhpcy5fY29udGV4dC5yZWdpc3RyeSgnTE9HR0VSJywgTG9nZ2VyKVxuICAgIHRoaXMubXNlID0gdGhpcy5fY29udGV4dC5yZWdpc3RyeSgnTVNFJywgTXNlKSh7IGNvbnRhaW5lcjogdGhpcy5fcGxheWVyLnZpZGVvIH0pXG5cbiAgICB0aGlzLl9oYW5kbGVUaW1lVXBkYXRlID0gdGhpcy5faGFuZGxlVGltZVVwZGF0ZS5iaW5kKHRoaXMpXG5cbiAgICB0aGlzLmluaXRMaXN0ZW5lcnMoKVxuICB9XG5cbiAgaW5pdExpc3RlbmVycyAoKSB7XG4gICAgdGhpcy5vbihMT0FERVJfRVZFTlRTLkxPQURFUl9EQVRBTE9BREVELCB0aGlzLl9oYW5kbGVMb2FkZXJEYXRhTG9hZGVkLmJpbmQodGhpcykpXG4gICAgdGhpcy5vbihMT0FERVJfRVZFTlRTLkxPQURFUl9FUlJPUiwgdGhpcy5faGFuZGxlTmV0d29ya0Vycm9yLmJpbmQodGhpcykpXG5cbiAgICB0aGlzLm9uKERFTVVYX0VWRU5UUy5NRURJQV9JTkZPLCB0aGlzLl9oYW5kbGVNZWRpYUluZm8uYmluZCh0aGlzKSlcbiAgICB0aGlzLm9uKERFTVVYX0VWRU5UUy5NRVRBREFUQV9QQVJTRUQsIHRoaXMuX2hhbmRsZU1ldGFkYXRhUGFyc2VkLmJpbmQodGhpcykpXG4gICAgdGhpcy5vbihERU1VWF9FVkVOVFMuREVNVVhfQ09NUExFVEUsIHRoaXMuX2hhbmRsZURlbXV4Q29tcGxldGUuYmluZCh0aGlzKSlcbiAgICB0aGlzLm9uKERFTVVYX0VWRU5UUy5ERU1VWF9FUlJPUiwgdGhpcy5faGFuZGxlRGVtdXhFcnJvci5iaW5kKHRoaXMpKVxuXG4gICAgdGhpcy5vbihSRU1VWF9FVkVOVFMuSU5JVF9TRUdNRU5ULCB0aGlzLl9oYW5kbGVBcHBlbmRJbml0U2VnbWVudC5iaW5kKHRoaXMpKVxuICAgIHRoaXMub24oUkVNVVhfRVZFTlRTLk1FRElBX1NFR01FTlQsIHRoaXMuX2hhbmRsZU1lZGlhU2VnbWVudC5iaW5kKHRoaXMpKVxuICAgIHRoaXMub24oUkVNVVhfRVZFTlRTLlJBTkRPTV9BQ0NFU1NfUE9JTlQsIHRoaXMuX2hhbmRsZUFkZFJBUC5iaW5kKHRoaXMpKVxuXG4gICAgdGhpcy5vbihNU0VfRVZFTlRTLlNPVVJDRV9VUERBVEVfRU5ELCB0aGlzLl9oYW5kbGVTb3VyY2VVcGRhdGVFbmQuYmluZCh0aGlzKSlcblxuICAgIHRoaXMuX3BsYXllci5vbigndGltZXVwZGF0ZScsIHRoaXMuX2hhbmRsZVRpbWVVcGRhdGUpXG4gIH1cblxuICBfaGFuZGxlTWVkaWFJbmZvICgpIHtcbiAgICBpZiAoIXRoaXMuX2NvbnRleHQubWVkaWFJbmZvKSB7XG4gICAgICB0aGlzLmVtaXQoREVNVVhfRVZFTlRTLkRFTVVYX0VSUk9SLCBuZXcgRXJyb3IoJ2ZhaWxlZCB0byBnZXQgbWVkaWFpbmZvJykpXG4gICAgfVxuICB9XG5cbiAgX2hhbmRsZUxvYWRlckRhdGFMb2FkZWQgKCkge1xuICAgIHRoaXMuZW1pdFRvKCdGTFZfREVNVVhFUicsIERFTVVYX0VWRU5UUy5ERU1VWF9TVEFSVClcbiAgfVxuXG4gIF9oYW5kbGVNZXRhZGF0YVBhcnNlZCAodHlwZSkge1xuICAgIHRoaXMuZW1pdChSRU1VWF9FVkVOVFMuUkVNVVhfTUVUQURBVEEsIHR5cGUpXG4gIH1cbiAgX2hhbmRsZURlbXV4Q29tcGxldGUgKCkge1xuICAgIHRoaXMuZW1pdChSRU1VWF9FVkVOVFMuUkVNVVhfTUVESUEpXG4gIH1cblxuICBfaGFuZGxlQXBwZW5kSW5pdFNlZ21lbnQgKCkge1xuICAgIHRoaXMuc3RhdGUuaW5pdFNlZ21lbnRBcnJpdmVkID0gdHJ1ZVxuICAgIHRoaXMubXNlLmFkZFNvdXJjZUJ1ZmZlcnMoKVxuICB9XG5cbiAgX2hhbmRsZU1lZGlhU2VnbWVudCAoKSB7XG4gICAgdGhpcy5tc2UuYWRkU291cmNlQnVmZmVycygpXG4gICAgdGhpcy5tc2UuZG9BcHBlbmQoKTtcbiAgfVxuXG4gIF9oYW5kbGVTb3VyY2VVcGRhdGVFbmQgKCkge1xuICAgIGNvbnN0IHRpbWUgPSB0aGlzLl9wbGF5ZXIuY3VycmVudFRpbWU7XG4gICAgY29uc3QgdmlkZW8gPSB0aGlzLl9wbGF5ZXIudmlkZW87XG4gICAgY29uc3QgcHJlbG9hZFRpbWUgPSB0aGlzLl9wbGF5ZXIuY29uZmlnLnByZWxvYWRUaW1lIHx8IDVcblxuICAgIGNvbnN0IHsgbGVuZ3RoIH0gPSB2aWRlby5idWZmZXJlZDtcblxuICAgIGlmIChsZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBidWZmZXJFbmQgPSB2aWRlby5idWZmZXJlZC5lbmQobGVuZ3RoIC0gMSk7XG4gICAgaWYgKGJ1ZmZlckVuZCAtIHRpbWUgPiBwcmVsb2FkVGltZSAqIDIpIHtcbiAgICAgIHRoaXMuX3BsYXllci5jdXJyZW50VGltZSA9IGJ1ZmZlckVuZCAtIHByZWxvYWRUaW1lXG4gICAgfVxuICAgIHRoaXMubXNlLmRvQXBwZW5kKCk7XG4gIH1cblxuICBfaGFuZGxlVGltZVVwZGF0ZSAoKSB7XG4gICAgY29uc3QgdGltZSA9IHRoaXMuX3BsYXllci5jdXJyZW50VGltZVxuXG4gICAgY29uc3QgdmlkZW8gPSB0aGlzLl9wbGF5ZXIudmlkZW87XG4gICAgbGV0IGJ1ZmZlcmVkID0gdmlkZW8uYnVmZmVyZWRcblxuICAgIGlmICghYnVmZmVyZWQgfHwgIWJ1ZmZlcmVkLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCByYW5nZSA9IFswLCAwXVxuICAgIGxldCBjdXJyZW50VGltZSA9IHZpZGVvLmN1cnJlbnRUaW1lXG4gICAgaWYgKGJ1ZmZlcmVkKSB7XG4gICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYnVmZmVyZWQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgcmFuZ2VbMF0gPSBidWZmZXJlZC5zdGFydChpKVxuICAgICAgICByYW5nZVsxXSA9IGJ1ZmZlcmVkLmVuZChpKVxuICAgICAgICBpZiAocmFuZ2VbMF0gPD0gY3VycmVudFRpbWUgJiYgY3VycmVudFRpbWUgPD0gcmFuZ2VbMV0pIHtcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgYnVmZmVyU3RhcnQgPSByYW5nZVswXVxuICAgIGNvbnN0IGJ1ZmZlckVuZCA9IHJhbmdlWzFdXG5cbiAgICBpZiAoY3VycmVudFRpbWUgPiBidWZmZXJFbmQgfHwgY3VycmVudFRpbWUgPCBidWZmZXJTdGFydCkge1xuICAgICAgdmlkZW8uY3VycmVudFRpbWUgPSBidWZmZXJTdGFydDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGltZSAtIGJ1ZmZlclN0YXJ0ID4gMTAgfHwgYnVmZmVyZWQubGVuZ3RoID4gMSkge1xuICAgICAgLy8g5Zyo55u05pKt5pe25Y+K5pe25riF56m6YnVmZmVy77yM6ZmN5L2O55u05pKt5YaF5a2Y5Y2g55SoXG4gICAgICBpZiAodGhpcy5idWZmZXJDbGVhclRpbWVyIHx8ICF0aGlzLnN0YXRlLnJhbmRvbUFjY2Vzc1BvaW50cy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgbGV0IHJhcCA9IEluZmluaXR5O1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN0YXRlLnJhbmRvbUFjY2Vzc1BvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCB0ZW1wID0gTWF0aC5jZWlsKHRoaXMuc3RhdGUucmFuZG9tQWNjZXNzUG9pbnRzW2ldIC8gMTAwMClcbiAgICAgICAgaWYgKHRlbXAgPiB0aW1lIC0gMTApIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByYXAgPSB0ZW1wO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGNvbnNvbGUubG9nKCdyYXAnLCByYXAsIGB0aW1lICR7dGltZX1gLCBgYnVmZmVyRW5kICR7YnVmZmVyRW5kfWAsYGNsZWFuICR7TWF0aC5taW4ocmFwLCB0aW1lIC0gMTAsIGJ1ZmZlckVuZCAtIDEwKX1gKVxuICAgICAgdGhpcy5tc2UucmVtb3ZlKE1hdGgubWluKHJhcCwgdGltZSAtIDEwLCBidWZmZXJFbmQgLSAxMCksIDApXG5cbiAgICAgIHRoaXMuYnVmZmVyQ2xlYXJUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmJ1ZmZlckNsZWFyVGltZXIgPSBudWxsXG4gICAgICB9LCA1MDAwKVxuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVOZXR3b3JrRXJyb3IgKHRhZywgZXJyKSB7XG4gICAgdGhpcy5fcGxheWVyLmVtaXQoJ2Vycm9yJywgbmV3IFBsYXllci5FcnJvcnMoJ25ldHdvcmsnLCB0aGlzLl9wbGF5ZXIuY29uZmlnLnVybCkpXG4gICAgdGhpcy5fb25FcnJvcihMT0FERVJfRVZFTlRTLkxPQURFUl9FUlJPUiwgdGFnLCBlcnIsIHRydWUpXG4gIH1cblxuICBfaGFuZGxlRGVtdXhFcnJvciAodGFnLCBlcnIsIGZhdGFsKSB7XG4gICAgaWYgKGZhdGFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGZhdGFsID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuX3BsYXllci5lbWl0KCdlcnJvcicsIG5ldyBQbGF5ZXIuRXJyb3JzKCdwYXJzZScsIHRoaXMuX3BsYXllci5jb25maWcudXJsKSlcbiAgICB0aGlzLl9vbkVycm9yKExPQURFUl9FVkVOVFMuTE9BREVSX0VSUk9SLCB0YWcsIGVyciwgZmF0YWwpXG4gIH1cblxuICBfaGFuZGxlQWRkUkFQIChyYXApIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5yYW5kb21BY2Nlc3NQb2ludHMpIHtcbiAgICAgIHRoaXMuc3RhdGUucmFuZG9tQWNjZXNzUG9pbnRzLnB1c2gocmFwKVxuICAgIH1cbiAgfVxuXG4gIF9vbkVycm9yICh0eXBlLCBtb2QsIGVyciwgZmF0YWwpIHtcbiAgICBsZXQgZXJyb3IgPSB7XG4gICAgICBlcnJvclR5cGU6IHR5cGUsXG4gICAgICBlcnJvckRldGFpbHM6IGBbJHttb2R9XTogJHtlcnIubWVzc2FnZX1gLFxuICAgICAgZXJyb3JGYXRhbDogZmF0YWwgfHwgZmFsc2VcbiAgICB9XG4gICAgdGhpcy5fcGxheWVyLmVtaXQoRkxWX0VSUk9SLCBlcnJvcik7XG4gIH1cblxuICBzZWVrICgpIHtcbiAgICBpZiAoIXRoaXMuc3RhdGUuaW5pdFNlZ21lbnRBcnJpdmVkKSB7XG4gICAgICB0aGlzLmxvYWREYXRhKClcbiAgICB9XG4gIH1cblxuICBsb2FkRGF0YSAoKSB7XG4gICAgdGhpcy5lbWl0KExPQURFUl9FVkVOVFMuTEFERVJfU1RBUlQsIHRoaXMuX3BsYXllci5jb25maWcudXJsKVxuICB9XG5cbiAgcGF1c2UgKCkge1xuICAgIGNvbnN0IGxvYWRlciA9IHRoaXMuX2NvbnRleHQuZ2V0SW5zdGFuY2UoJ0ZFVENIX0xPQURFUicpXG5cbiAgICBpZiAobG9hZGVyKSB7XG4gICAgICBsb2FkZXIuY2FuY2VsKClcbiAgICB9XG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLl9wbGF5ZXIub2ZmKCd0aW1ldXBkYXRlJywgdGhpcy5faGFuZGxlVGltZVVwZGF0ZSlcbiAgICB0aGlzLl9wbGF5ZXIgPSBudWxsXG4gICAgdGhpcy5tc2UgPSBudWxsXG4gICAgdGhpcy5zdGF0ZS5yYW5kb21BY2Nlc3NQb2ludHMgPSBbXVxuICB9XG59XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gJ3hncGxheWVyJ1xuaW1wb3J0IHsgQ29udGV4dCwgRVZFTlRTIH0gZnJvbSAneGdwbGF5ZXItdXRpbHMnO1xuaW1wb3J0IEZMViBmcm9tICcuL2Zsdi1saXZlJ1xuY29uc3QgZmx2QWxsb3dlZEV2ZW50cyA9IEVWRU5UUy5GbHZBbGxvd2VkRXZlbnRzO1xuXG5jbGFzcyBGbHZQbGF5ZXIgZXh0ZW5kcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvciAoY29uZmlnKSB7XG4gICAgc3VwZXIoY29uZmlnKVxuICAgIHRoaXMuY29udGV4dCA9IG5ldyBDb250ZXh0KGZsdkFsbG93ZWRFdmVudHMpXG4gICAgdGhpcy5pbml0RXZlbnRzKClcbiAgICB0aGlzLmxvYWRlckNvbXBsZXRlVGltZXIgPSBudWxsXG4gICAgLy8gY29uc3QgcHJlbG9hZFRpbWUgPSBwbGF5ZXIuY29uZmlnLnByZWxvYWRUaW1lIHx8IDE1XG4gIH1cblxuICBzdGFydCAoKSB7XG4gICAgdGhpcy5pbml0Rmx2KClcbiAgICB0aGlzLmNvbnRleHQuaW5pdCgpXG4gICAgc3VwZXIuc3RhcnQodGhpcy5mbHYubXNlLnVybClcbiAgfVxuXG4gIGluaXRGbHZFdmVudHMgKGZsdikge1xuICAgIGNvbnN0IHBsYXllciA9IHRoaXM7XG4gICAgZmx2Lm9uY2UoRVZFTlRTLlJFTVVYX0VWRU5UUy5JTklUX1NFR01FTlQsICgpID0+IHtcbiAgICAgIFBsYXllci51dGlsLmFkZENsYXNzKHBsYXllci5yb290LCAneGdwbGF5ZXItaXMtbGl2ZScpXG4gICAgICBpZiAoIVBsYXllci51dGlsLmZpbmREb20odGhpcy5yb290LCAneGctbGl2ZScpKSB7XG4gICAgICAgIGNvbnN0IGxpdmUgPSBQbGF5ZXIudXRpbC5jcmVhdGVEb20oJ3hnLWxpdmUnLCAn5q2j5Zyo55u05pKtJywge30sICd4Z3BsYXllci1saXZlJylcbiAgICAgICAgcGxheWVyLmNvbnRyb2xzLmFwcGVuZENoaWxkKGxpdmUpXG4gICAgICB9XG4gICAgfSlcblxuICAgIGZsdi5vbmNlKEVWRU5UUy5MT0FERVJfRVZFTlRTLkxPQURFUl9DT01QTEVURSwgKCkgPT4ge1xuICAgICAgLy8g55u05pKt5a6M5oiQ77yM5b6F5pKt5pS+5Zmo5pKt5a6M57yT5a2Y5ZCO5Y+R6YCB5YWz6Zet5LqL5Lu2XG4gICAgICBpZiAoIXBsYXllci5wYXVzZWQpIHtcbiAgICAgICAgdGhpcy5sb2FkZXJDb21wbGV0ZVRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGVuZCA9IHBsYXllci5nZXRCdWZmZXJlZFJhbmdlKClbMV1cbiAgICAgICAgICBpZiAoTWF0aC5hYnMocGxheWVyLmN1cnJlbnRUaW1lIC0gZW5kKSA8IDAuNSkge1xuICAgICAgICAgICAgcGxheWVyLmVtaXQoJ2VuZGVkJylcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMubG9hZGVyQ29tcGxldGVUaW1lcilcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDIwMClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBsYXllci5lbWl0KCdlbmRlZCcpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGluaXRFdmVudHMgKCkge1xuICAgIHRoaXMub24oJ3RpbWV1cGRhdGUnLCAoKSA9PiB7XG4gICAgICB0aGlzLmxvYWREYXRhKClcbiAgICB9KVxuXG4gICAgdGhpcy5vbignc2Vla2luZycsICgpID0+IHtcbiAgICAgIGNvbnN0IHRpbWUgPSB0aGlzLmN1cnJlbnRUaW1lXG4gICAgICBjb25zdCByYW5nZSA9IHRoaXMuZ2V0QnVmZmVyZWRSYW5nZSgpXG4gICAgICBpZiAodGltZSA+IHJhbmdlWzFdIHx8IHRpbWUgPCByYW5nZVswXSkge1xuICAgICAgICB0aGlzLmZsdi5zZWVrKHRoaXMuY3VycmVudFRpbWUpXG4gICAgICB9XG4gICAgfSlcblxuICB9XG5cbiAgaW5pdEZsdiAoKSB7XG4gICAgY29uc3QgZmx2ID0gdGhpcy5jb250ZXh0LnJlZ2lzdHJ5KCdGTFZfQ09OVFJPTExFUicsIEZMVikodGhpcylcbiAgICB0aGlzLmluaXRGbHZFdmVudHMoZmx2KVxuICAgIHRoaXMuZmx2ID0gZmx2XG4gIH1cblxuICBwbGF5ICgpIHtcbiAgICBpZiAodGhpcy5faGFzU3RhcnQpIHtcbiAgICAgIHJldHVybiB0aGlzLl9kZXN0cm95KCkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuY29udGV4dCA9IG5ldyBDb250ZXh0KGZsdkFsbG93ZWRFdmVudHMpXG4gICAgICAgIGNvbnN0IGZsdiA9IHRoaXMuY29udGV4dC5yZWdpc3RyeSgnRkxWX0NPTlRST0xMRVInLCBGTFYpKHRoaXMpXG4gICAgICAgIHRoaXMuaW5pdEZsdkV2ZW50cyhmbHYpXG4gICAgICAgIHRoaXMuZmx2ID0gZmx2XG4gICAgICAgIHRoaXMuY29udGV4dC5pbml0KClcbiAgICAgICAgc3VwZXIuc3RhcnQoZmx2Lm1zZS51cmwpXG4gICAgICAgIHJldHVybiBzdXBlci5wbGF5KClcbiAgICAgIH0pXG5cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN1cGVyLnBsYXkoKVxuICAgIH1cbiAgfVxuXG4gIHBhdXNlICgpIHtcbiAgICBzdXBlci5wYXVzZSgpXG4gICAgaWYgKHRoaXMuZmx2KSB7XG4gICAgICB0aGlzLmZsdi5wYXVzZSgpXG4gICAgfVxuICB9XG5cbiAgbG9hZERhdGEgKHRpbWUgPSB0aGlzLmN1cnJlbnRUaW1lKSB7XG4gICAgaWYgKHRoaXMuZmx2KSB7XG4gICAgICB0aGlzLmZsdi5zZWVrKHRpbWUpXG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5fZGVzdHJveSgpLnRoZW4oKCkgPT4ge1xuICAgICAgc3VwZXIuZGVzdHJveSgpO1xuICAgIH0pXG4gIH1cblxuICBfZGVzdHJveSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZmx2Lm1zZS5kZXN0cm95KCkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLmNvbnRleHQuZGVzdHJveSgpXG4gICAgICB0aGlzLmZsdiA9IG51bGxcbiAgICAgIHRoaXMuY29udGV4dCA9IG51bGxcbiAgICAgIGlmICh0aGlzLmxvYWRlckNvbXBsZXRlVGltZXIpIHtcbiAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5sb2FkZXJDb21wbGV0ZVRpbWVyKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBnZXQgc3JjICgpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50U3JjXG4gIH1cblxuICBzZXQgc3JjICh1cmwpIHtcbiAgICB0aGlzLnBsYXllci5jb25maWcudXJsID0gdXJsXG4gICAgaWYgKCF0aGlzLnBhdXNlZCkge1xuICAgICAgdGhpcy5wYXVzZSgpXG4gICAgICB0aGlzLm9uY2UoJ3BhdXNlJywgKCkgPT4ge1xuICAgICAgICB0aGlzLnN0YXJ0KHVybClcbiAgICAgIH0pXG4gICAgICB0aGlzLm9uY2UoJ2NhbnBsYXknLCAoKSA9PiB7XG4gICAgICAgIHRoaXMucGxheSgpXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXJ0KHVybClcbiAgICB9XG4gICAgdGhpcy5vbmNlKCdjYW5wbGF5JywgKCkgPT4ge1xuICAgICAgdGhpcy5jdXJyZW50VGltZSA9IDBcbiAgICB9KVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRmx2UGxheWVyXG4iLCIoZnVuY3Rpb24oKSB7IG1vZHVsZS5leHBvcnRzID0gd2luZG93W1wiUGxheWVyXCJdOyB9KCkpOyJdLCJzb3VyY2VSb290IjoiIn0=