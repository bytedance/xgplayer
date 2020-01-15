(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('xgplayer')) :
  typeof define === 'function' && define.amd ? define(['xgplayer'], factory) :
  (global = global || self, global.HlsPlayer = factory(global.Player));
}(this, (function (Player) { 'use strict';

  Player = Player && Player.hasOwnProperty('default') ? Player['default'] : Player;

  var BROWSER_EVENTS = {
    VISIBILITY_CHANGE: 'VISIBILITY_CHANGE'
  };
  var PLAYER_EVENTS = {
    SEEK: 'SEEK'
  };

  var LOADER_EVENTS = {
    LADER_START: 'LOADER_START',
    LOADER_DATALOADED: 'LOADER_DATALOADED',
    LOADER_COMPLETE: 'LOADER_COMPLETE',
    LOADER_ERROR: 'LOADER_ERROR'
  };

  var DEMUX_EVENTS = {
    DEMUX_START: 'DEMUX_START',
    DEMUX_COMPLETE: 'DEMUX_COMPLETE',
    DEMUX_ERROR: 'DEMUX_ERROR',
    METADATA_PARSED: 'METADATA_PARSED',
    SEI_PARSED: 'SEI_PARSED',
    VIDEO_METADATA_CHANGE: 'VIDEO_METADATA_CHANGE',
    AUDIO_METADATA_CHANGE: 'AUDIO_METADATA_CHANGE',
    MEDIA_INFO: 'MEDIA_INFO'
  };

  var REMUX_EVENTS = {
    REMUX_METADATA: 'REMUX_METADATA',
    REMUX_MEDIA: 'REMUX_MEDIA',
    MEDIA_SEGMENT: 'MEDIA_SEGMENT',
    REMUX_ERROR: 'REMUX_ERROR',
    INIT_SEGMENT: 'INIT_SEGMENT',
    DETECT_CHANGE_STREAM: 'DETECT_CHANGE_STREAM',
    DETECT_CHANGE_STREAM_DISCONTINUE: 'DETECT_CHANGE_STREAM_DISCONTINUE',
    RANDOM_ACCESS_POINT: 'RANDOM_ACCESS_POINT'
  };

  var MSE_EVENTS = {
    SOURCE_UPDATE_END: 'SOURCE_UPDATE_END'

    // hls专有events
  };var HLS_EVENTS = {
    RETRY_TIME_EXCEEDED: 'RETRY_TIME_EXCEEDED'
  };

  var CRYTO_EVENTS = {
    START_DECRYPT: 'START_DECRYPT',
    DECRYPTED: 'DECRYPTED'
  };
  var ALLEVENTS = Object.assign({}, LOADER_EVENTS, DEMUX_EVENTS, REMUX_EVENTS, MSE_EVENTS, HLS_EVENTS, PLAYER_EVENTS, BROWSER_EVENTS);

  var FlvAllowedEvents = [];
  var HlsAllowedEvents = [];

  for (var key in ALLEVENTS) {
    if (ALLEVENTS.hasOwnProperty(key)) {
      FlvAllowedEvents.push(ALLEVENTS[key]);
    }
  }

  for (var _key in ALLEVENTS) {
    if (ALLEVENTS.hasOwnProperty(_key)) {
      HlsAllowedEvents.push(ALLEVENTS[_key]);
    }
  }

  var EVENTS = {
    ALLEVENTS: ALLEVENTS,
    HLS_EVENTS: HLS_EVENTS,
    REMUX_EVENTS: REMUX_EVENTS,
    DEMUX_EVENTS: DEMUX_EVENTS,
    MSE_EVENTS: MSE_EVENTS,
    LOADER_EVENTS: LOADER_EVENTS,
    FlvAllowedEvents: FlvAllowedEvents,
    HlsAllowedEvents: HlsAllowedEvents,
    CRYTO_EVENTS: CRYTO_EVENTS,
    PLAYER_EVENTS: PLAYER_EVENTS,
    BROWSER_EVENTS: BROWSER_EVENTS
  };

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var isObjectFilled = function isObjectFilled(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] === null) {
          return false;
        }
      }
    }
    return true;
  };

  var MediaInfo = function () {
    function MediaInfo() {
      _classCallCheck(this, MediaInfo);

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

    _createClass(MediaInfo, [{
      key: "isComplete",
      value: function isComplete() {
        return MediaInfo.isBaseInfoReady(this) && MediaInfo.isVideoReady(this) && MediaInfo.isAudioReady(this);
      }
    }], [{
      key: "isBaseInfoReady",
      value: function isBaseInfoReady(mediaInfo) {
        return isObjectFilled(mediaInfo);
      }
    }, {
      key: "isVideoReady",
      value: function isVideoReady(mediaInfo) {
        if (!mediaInfo.hasVideo) {
          return true;
        }

        return isObjectFilled(mediaInfo.video);
      }
    }, {
      key: "isAudioReady",
      value: function isAudioReady(mediaInfo) {
        if (!mediaInfo.hasAudio) {
          return true;
        }

        return isObjectFilled(mediaInfo.video);
      }
    }]);

    return MediaInfo;
  }();

  var domain;

  // This constructor is used to store event handlers. Instantiating this is
  // faster than explicitly calling `Object.create(null)` to get a "clean" empty
  // object (tested with v8 v4.9).
  function EventHandlers() {}
  EventHandlers.prototype = Object.create(null);

  function EventEmitter() {
    EventEmitter.init.call(this);
  }

  // nodejs oddity
  // require('events') === require('events').EventEmitter
  EventEmitter.EventEmitter = EventEmitter;

  EventEmitter.usingDomains = false;

  EventEmitter.prototype.domain = undefined;
  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._maxListeners = undefined;

  // By default EventEmitters will print a warning if more than 10 listeners are
  // added to it. This is a useful default which helps finding memory leaks.
  EventEmitter.defaultMaxListeners = 10;

  EventEmitter.init = function () {
    this.domain = null;
    if (EventEmitter.usingDomains) {
      // if there is an active domain, then attach to it.
      if (domain.active && !(this instanceof domain.Domain)) ;
    }

    if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
      this._events = new EventHandlers();
      this._eventsCount = 0;
    }

    this._maxListeners = this._maxListeners || undefined;
  };

  // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.
  EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || isNaN(n)) throw new TypeError('"n" argument must be a positive number');
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

  // These standalone emit* functions are used to optimize calling of event
  // handlers for fast cases because emit() itself often has a variable number of
  // arguments and can be deoptimized because of that. These functions always have
  // the same number of arguments and thus do not get deoptimized, so the code
  // inside them can execute faster.
  function emitNone(handler, isFn, self) {
    if (isFn) handler.call(self);else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i) listeners[i].call(self);
    }
  }
  function emitOne(handler, isFn, self, arg1) {
    if (isFn) handler.call(self, arg1);else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i) listeners[i].call(self, arg1);
    }
  }
  function emitTwo(handler, isFn, self, arg1, arg2) {
    if (isFn) handler.call(self, arg1, arg2);else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i) listeners[i].call(self, arg1, arg2);
    }
  }
  function emitThree(handler, isFn, self, arg1, arg2, arg3) {
    if (isFn) handler.call(self, arg1, arg2, arg3);else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i) listeners[i].call(self, arg1, arg2, arg3);
    }
  }

  function emitMany(handler, isFn, self, args) {
    if (isFn) handler.apply(self, args);else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i) listeners[i].apply(self, args);
    }
  }

  EventEmitter.prototype.emit = function emit(type) {
    var er, handler, len, args, i, events, domain;
    var doError = type === 'error';

    events = this._events;
    if (events) doError = doError && events.error == null;else if (!doError) return false;

    domain = this.domain;

    // If there is no 'error' event listener then throw.
    if (doError) {
      er = arguments[1];
      if (domain) {
        if (!er) er = new Error('Uncaught, unspecified "error" event');
        er.domainEmitter = this;
        er.domain = domain;
        er.domainThrown = false;
        domain.emit('error', er);
      } else if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
      return false;
    }

    handler = events[type];

    if (!handler) return false;

    var isFn = typeof handler === 'function';
    len = arguments.length;
    switch (len) {
      // fast cases
      case 1:
        emitNone(handler, isFn, this);
        break;
      case 2:
        emitOne(handler, isFn, this, arguments[1]);
        break;
      case 3:
        emitTwo(handler, isFn, this, arguments[1], arguments[2]);
        break;
      case 4:
        emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
        break;
      // slower
      default:
        args = new Array(len - 1);
        for (i = 1; i < len; i++) args[i - 1] = arguments[i];
        emitMany(handler, isFn, this, args);
    }

    return true;
  };

  function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;

    if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');

    events = target._events;
    if (!events) {
      events = target._events = new EventHandlers();
      target._eventsCount = 0;
    } else {
      // To avoid recursion in the case that type === "newListener"! Before
      // adding it to the listeners, first emit "newListener".
      if (events.newListener) {
        target.emit('newListener', type, listener.listener ? listener.listener : listener);

        // Re-assign `events` because a newListener handler could have caused the
        // this._events to be assigned to a new object
        events = target._events;
      }
      existing = events[type];
    }

    if (!existing) {
      // Optimize the case of one listener. Don't need the extra array object.
      existing = events[type] = listener;
      ++target._eventsCount;
    } else {
      if (typeof existing === 'function') {
        // Adding the second element, need to change to array.
        existing = events[type] = prepend ? [listener, existing] : [existing, listener];
      } else {
        // If we've already got an array, just append.
        if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
      }

      // Check for listener leak
      if (!existing.warned) {
        m = $getMaxListeners(target);
        if (m && m > 0 && existing.length > m) {
          existing.warned = true;
          var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + type + ' listeners added. ' + 'Use emitter.setMaxListeners() to increase limit');
          w.name = 'MaxListenersExceededWarning';
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          emitWarning(w);
        }
      }
    }

    return target;
  }
  function emitWarning(e) {
    typeof console.warn === 'function' ? console.warn(e) : console.log(e);
  }
  EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
  };

  EventEmitter.prototype.on = EventEmitter.prototype.addListener;

  EventEmitter.prototype.prependListener = function prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  };

  function _onceWrap(target, type, listener) {
    var fired = false;
    function g() {
      target.removeListener(type, g);
      if (!fired) {
        fired = true;
        listener.apply(target, arguments);
      }
    }
    g.listener = listener;
    return g;
  }

  EventEmitter.prototype.once = function once(type, listener) {
    if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
    this.on(type, _onceWrap(this, type, listener));
    return this;
  };

  EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
    if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');
    this.prependListener(type, _onceWrap(this, type, listener));
    return this;
  };

  // emits a 'removeListener' event iff the listener was removed
  EventEmitter.prototype.removeListener = function removeListener(type, listener) {
    var list, events, position, i, originalListener;

    if (typeof listener !== 'function') throw new TypeError('"listener" argument must be a function');

    events = this._events;
    if (!events) return this;

    list = events[type];
    if (!list) return this;

    if (list === listener || list.listener && list.listener === listener) {
      if (--this._eventsCount === 0) this._events = new EventHandlers();else {
        delete events[type];
        if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
      }
    } else if (typeof list !== 'function') {
      position = -1;

      for (i = list.length; i-- > 0;) {
        if (list[i] === listener || list[i].listener && list[i].listener === listener) {
          originalListener = list[i].listener;
          position = i;
          break;
        }
      }

      if (position < 0) return this;

      if (list.length === 1) {
        list[0] = undefined;
        if (--this._eventsCount === 0) {
          this._events = new EventHandlers();
          return this;
        } else {
          delete events[type];
        }
      } else {
        spliceOne(list, position);
      }

      if (events.removeListener) this.emit('removeListener', type, originalListener || listener);
    }

    return this;
  };

  EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
    var listeners, events;

    events = this._events;
    if (!events) return this;

    // not listening for removeListener, no need to emit
    if (!events.removeListener) {
      if (arguments.length === 0) {
        this._events = new EventHandlers();
        this._eventsCount = 0;
      } else if (events[type]) {
        if (--this._eventsCount === 0) this._events = new EventHandlers();else delete events[type];
      }
      return this;
    }

    // emit removeListener for all listeners on all events
    if (arguments.length === 0) {
      var keys = Object.keys(events);
      for (var i = 0, key; i < keys.length; ++i) {
        key = keys[i];
        if (key === 'removeListener') continue;
        this.removeAllListeners(key);
      }
      this.removeAllListeners('removeListener');
      this._events = new EventHandlers();
      this._eventsCount = 0;
      return this;
    }

    listeners = events[type];

    if (typeof listeners === 'function') {
      this.removeListener(type, listeners);
    } else if (listeners) {
      // LIFO order
      do {
        this.removeListener(type, listeners[listeners.length - 1]);
      } while (listeners[0]);
    }

    return this;
  };

  EventEmitter.prototype.listeners = function listeners(type) {
    var evlistener;
    var ret;
    var events = this._events;

    if (!events) ret = [];else {
      evlistener = events[type];
      if (!evlistener) ret = [];else if (typeof evlistener === 'function') ret = [evlistener.listener || evlistener];else ret = unwrapListeners(evlistener);
    }

    return ret;
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

    if (events) {
      var evlistener = events[type];

      if (typeof evlistener === 'function') {
        return 1;
      } else if (evlistener) {
        return evlistener.length;
      }
    }

    return 0;
  }

  EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
  };

  // About 1.5x faster than the two-arg version of Array#splice().
  function spliceOne(list, index) {
    for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) list[i] = list[k];
    list.pop();
  }

  function arrayClone(arr, i) {
    var copy = new Array(i);
    while (i--) copy[i] = arr[i];
    return copy;
  }

  function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for (var i = 0; i < ret.length; ++i) {
      ret[i] = arr[i].listener || arr[i];
    }
    return ret;
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;if (getter === undefined) {
        return undefined;
      }return getter.call(receiver);
    }
  };

  var _createClass$1 = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _classCallCheck$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var DIRECT_EMIT_FLAG = '__TO__';

  var Context = function () {
    function Context() {
      var allowedEvents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      _classCallCheck$1(this, Context);

      this._emitter = new EventEmitter();
      if (!this._emitter.off) {
        this._emitter.off = this._emitter.removeListener;
      }

      this.mediaInfo = new MediaInfo();
      this._instanceMap = {}; // 所有的解码流程实例
      this._clsMap = {}; // 构造函数的map
      this._inited = false;
      this.allowedEvents = allowedEvents;
      this._hooks = {}; // 注册在事件前/后的钩子，例如 before('DEMUX_COMPLETE')
    }

    /**
     * 从上下文中获取解码流程实例，如果没有实例，构造一个
     * @param tag
     * @param args
     * @returns {*}
     */

    _createClass$1(Context, [{
      key: 'getInstance',
      value: function getInstance(tag) {
        var instance = this._instanceMap[tag];
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

    }, {
      key: 'initInstance',
      value: function initInstance(tag) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var a = args[0],
            b = args[1],
            c = args[2],
            d = args[3];

        if (this._clsMap[tag]) {
          var newInstance = new this._clsMap[tag](a, b, c, d);
          this._instanceMap[tag] = newInstance;
          if (newInstance.init) {
            newInstance.init(); // TODO: lifecircle
          }
          return newInstance;
        } else {
          throw new Error(tag + "\u672A\u5728context\u4E2D\u6CE8\u518C");
        }
      }

      /**
       * 避免大量的initInstance调用，初始化所有的组件
       * @param config
       */

    }, {
      key: 'init',
      value: function init(config) {
        if (this._inited) {
          return;
        }
        for (var tag in this._clsMap) {
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

    }, {
      key: 'registry',
      value: function registry(tag, cls) {
        var _this2 = this;

        var emitter = this._emitter;
        var checkMessageName = this._isMessageNameValid.bind(this);
        var self = this;
        var enhanced = function (_cls) {
          _inherits(enhanced, _cls);

          function enhanced(a, b, c) {
            _classCallCheck$1(this, enhanced);

            var _this = _possibleConstructorReturn(this, (enhanced.__proto__ || Object.getPrototypeOf(enhanced)).call(this, a, b, c));

            _this.listeners = {};
            _this.onceListeners = {};
            _this.TAG = tag;
            _this._context = self;
            return _this;
          }

          _createClass$1(enhanced, [{
            key: 'on',
            value: function on(messageName, callback) {
              checkMessageName(messageName);

              if (this.listeners[messageName]) {
                this.listeners[messageName].push(callback);
              } else {
                this.listeners[messageName] = [callback];
              }

              emitter.on('' + messageName + DIRECT_EMIT_FLAG + tag, callback); // 建立定向通信监听
              return emitter.on(messageName, callback);
            }

            /**
             * 在某个事件触发前执行
             * @param messageName
             * @param callback
             */

          }, {
            key: 'before',
            value: function before(messageName, callback) {
              checkMessageName(messageName);
              if (self._hooks[messageName]) {
                self._hooks[messageName].push(callback);
              } else {
                self._hooks[messageName] = [callback];
              }
            }
          }, {
            key: 'once',
            value: function once(messageName, callback) {
              checkMessageName(messageName);

              if (this.onceListeners[messageName]) {
                this.onceListeners[messageName].push(callback);
              } else {
                this.onceListeners[messageName] = [callback];
              }

              emitter.once('' + messageName + DIRECT_EMIT_FLAG + tag, callback);
              return emitter.once(messageName, callback);
            }
          }, {
            key: 'emit',
            value: function emit(messageName) {
              checkMessageName(messageName);
              // console.log('emit ', messageName);

              var beforeList = self._hooks ? self._hooks[messageName] : null;

              if (beforeList) {
                for (var i = 0, len = beforeList.length; i < len; i++) {
                  var callback = beforeList[i];
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

          }, {
            key: 'emitTo',
            value: function emitTo(tag, messageName) {
              checkMessageName(messageName);

              for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
                args[_key3 - 2] = arguments[_key3];
              }

              return emitter.emit.apply(emitter, ['' + messageName + DIRECT_EMIT_FLAG + tag].concat(args));
            }
          }, {
            key: 'off',
            value: function off(messageName, callback) {
              checkMessageName(messageName);
              return emitter.off(messageName, callback);
            }
          }, {
            key: 'removeListeners',
            value: function removeListeners() {
              var hasOwn = Object.prototype.hasOwnProperty.bind(this.listeners);

              for (var messageName in this.listeners) {
                if (hasOwn(messageName)) {
                  var callbacks = this.listeners[messageName] || [];
                  for (var i = 0; i < callbacks.length; i++) {
                    var callback = callbacks[i];
                    emitter.off(messageName, callback);
                    emitter.off('' + messageName + DIRECT_EMIT_FLAG + tag, callback);
                  }
                }
              }

              for (var _messageName in this.onceListeners) {
                if (hasOwn(_messageName)) {
                  var _callbacks = this.onceListeners[_messageName] || [];
                  for (var _i = 0; _i < _callbacks.length; _i++) {
                    var _callback = _callbacks[_i];
                    emitter.off(_messageName, _callback);
                    emitter.off('' + _messageName + DIRECT_EMIT_FLAG + tag, _callback);
                  }
                }
              }
            }

            /**
             * 在组件销毁时，默认将它注册的事件全部卸载，确保不会造成内存泄漏
             */

          }, {
            key: 'destroy',
            value: function destroy() {
              // step1 unlisten events
              this.removeListeners();
              this.listeners = {};

              // step2 release from context
              delete self._instanceMap[tag];
              if (_get(enhanced.prototype.__proto__ || Object.getPrototypeOf(enhanced.prototype), 'destroy', this)) {
                return _get(enhanced.prototype.__proto__ || Object.getPrototypeOf(enhanced.prototype), 'destroy', this).call(this);
              }
            }
          }]);

          return enhanced;
        }(cls);
        this._clsMap[tag] = enhanced;

        /**
         * get instance immediately
         * e.g const instance = context.registry(tag, Cls)(config)
         * */
        return function () {
          for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }

          return _this2.initInstance.apply(_this2, [tag].concat(args));
        };
      }

      /**
       * 各个模块处理seek
       * @param time
       */

    }, {
      key: 'seek',
      value: function seek(time) {
        this._emitter.emit(EVENTS.PLAYER_EVENTS.SEEK, time);
      }

      /**
       * 对存在的实例进行
       */

    }, {
      key: 'destroyInstances',
      value: function destroyInstances() {
        var _this3 = this;

        Object.keys(this._instanceMap).forEach(function (tag) {
          if (_this3._instanceMap[tag].destroy) {
            _this3._instanceMap[tag].destroy();
          }
        });
      }

      /**
       * 编解码流程无需关注事件的解绑
       */

    }, {
      key: 'destroy',
      value: function destroy() {
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

    }, {
      key: '_isMessageNameValid',
      value: function _isMessageNameValid(messageName) {
        if (!this.allowedEvents.indexOf(messageName) < 0) {
          throw new Error('unregistered message name: ' + messageName);
        }
      }
    }]);

    return Context;
  }();

  var _createClass$2 = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var MSE = function () {
    function MSE(configs, context) {
      _classCallCheck$2(this, MSE);

      if (context) {
        this._context = context;
        this.emit = context._emitter.emit.bind(context._emitter);
      }

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

    _createClass$2(MSE, [{
      key: 'init',
      value: function init() {
        // eslint-disable-next-line no-undef
        this.mediaSource = new self.MediaSource();
        this.mediaSource.addEventListener('sourceopen', this.onSourceOpen);
        this._url = null;
        this.container.addEventListener('timeupdate', this.onTimeUpdate);
        this.container.addEventListener('waiting', this.onWaiting);
      }
    }, {
      key: 'resetContext',
      value: function resetContext(newCtx) {
        this._context = newCtx;
      }
    }, {
      key: 'onTimeUpdate',
      value: function onTimeUpdate() {
        this.emit('TIME_UPDATE', this.container);
      }
    }, {
      key: 'onWaiting',
      value: function onWaiting() {
        this.emit('WAITING', this.container);
      }
    }, {
      key: 'onSourceOpen',
      value: function onSourceOpen() {
        this.addSourceBuffers();
      }
    }, {
      key: 'onUpdateEnd',
      value: function onUpdateEnd() {
        this.emit('SOURCE_UPDATE_END');
        this.doAppend();
      }
    }, {
      key: 'addSourceBuffers',
      value: function addSourceBuffers() {
        if (this.mediaSource.readyState !== 'open') {
          return;
        }
        var sources = this._context.getInstance('PRE_SOURCE_BUFFER');
        var tracks = this._context.getInstance('TRACKS');
        var track = void 0;

        sources = sources.sources;
        var add = false;
        for (var i = 0, k = Object.keys(sources).length; i < k; i++) {
          var type = Object.keys(sources)[i];
          if (type === 'audio') {
            track = tracks.audioTrack;
          } else if (type === 'video') {
            track = tracks.videoTrack;
            // return;
          }
          if (track) {
            var dur = type === 'audio' ? 21 : 40;
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
          for (var _i = 0, _k = Object.keys(sources).length; _i < _k; _i++) {
            var _type = Object.keys(sources)[_i];
            var source = sources[_type];
            var mime = _type === 'video' ? 'video/mp4;codecs=' + source.mimetype : 'audio/mp4;codecs=' + source.mimetype;
            var sourceBuffer = this.mediaSource.addSourceBuffer(mime);
            this.sourceBuffers[_type] = sourceBuffer;
            sourceBuffer.addEventListener('updateend', this.onUpdateEnd);
            this.doAppend();
          }
        }
      }
    }, {
      key: 'doAppend',
      value: function doAppend() {
        var sources = this._context.getInstance('PRE_SOURCE_BUFFER');
        if (sources) {
          for (var i = 0; i < Object.keys(this.sourceBuffers).length; i++) {
            var type = Object.keys(this.sourceBuffers)[i];
            var sourceBuffer = this.sourceBuffers[type];
            var source = sources.sources[type];
            if (source && !source.inited) {
              try {
                // console.log('append buffser init: ', type, source.init)
                sourceBuffer.appendBuffer(source.init.buffer.buffer);
                source.inited = true;
              } catch (e) {
                // DO NOTHING
              }
            } else if (source) {
              var data = source.data.shift();
              if (data) {
                try {
                  sourceBuffer.appendBuffer(data.buffer.buffer);
                } catch (e) {
                  source.data.unshift(data);
                }
              }
            }
          }
        }
      }
    }, {
      key: 'endOfStream',
      value: function endOfStream() {
        var _mediaSource = this.mediaSource,
            readyState = _mediaSource.readyState,
            activeSourceBuffers = _mediaSource.activeSourceBuffers;

        if (readyState === 'open' && activeSourceBuffers.length === 0) {
          try {
            this.mediaSource.endOfStream();
          } catch (e) {
            // log
          }
        }
      }
    }, {
      key: 'remove',
      value: function remove(end) {
        var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        for (var i = 0; i < Object.keys(this.sourceBuffers).length; i++) {
          var buffer = this.sourceBuffers[Object.keys(this.sourceBuffers)[i]];
          if (!buffer.updating) {
            // console.log('remove', start, end)
            buffer.remove(start, end);
          }
        }
      }
    }, {
      key: 'cleanBuffers',
      value: function cleanBuffers() {
        var _this = this;

        var taskList = [];

        var _loop = function _loop(i) {
          var buffer = _this.sourceBuffers[Object.keys(_this.sourceBuffers)[i]];

          var task = void 0;
          if (buffer.updating) {
            task = new Promise(function (resolve) {
              var doCleanBuffer = function doCleanBuffer() {
                var retryTime = 3;

                var clean = function clean() {
                  if (!buffer.updating) {
                    MSE.clearBuffer(buffer);
                    buffer.addEventListener('updateend', function () {
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
            task = new Promise(function (resolve) {
              MSE.clearBuffer(buffer);
              buffer.addEventListener('updateend', function () {
                resolve();
              });
            });

            // task = Promise.resolve()
          }

          taskList.push(task);
        };

        for (var i = 0; i < Object.keys(this.sourceBuffers).length; i++) {
          _loop(i);
        }

        return Promise.all(taskList);
      }
    }, {
      key: 'removeBuffers',
      value: function removeBuffers() {
        var _this2 = this;

        var taskList = [];

        var _loop2 = function _loop2(i) {
          var buffer = _this2.sourceBuffers[Object.keys(_this2.sourceBuffers)[i]];
          buffer.removeEventListener('updateend', _this2.onUpdateEnd);

          var task = void 0;
          if (buffer.updating) {
            task = new Promise(function (resolve) {
              var doCleanBuffer = function doCleanBuffer() {
                var retryTime = 3;

                var clean = function clean() {
                  if (!buffer.updating) {
                    MSE.clearBuffer(buffer);
                    buffer.addEventListener('updateend', function () {
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
            task = new Promise(function (resolve) {
              MSE.clearBuffer(buffer);
              buffer.addEventListener('updateend', function () {
                resolve();
              });
            });

            // task = Promise.resolve()
          }

          taskList.push(task);
        };

        for (var i = 0; i < Object.keys(this.sourceBuffers).length; i++) {
          _loop2(i);
        }

        return Promise.all(taskList);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        var _this3 = this;

        return this.removeBuffers().then(function () {
          for (var i = 0; i < Object.keys(_this3.sourceBuffers).length; i++) {
            var _buffer = _this3.sourceBuffers[Object.keys(_this3.sourceBuffers)[i]];
            _this3.mediaSource.removeSourceBuffer(_buffer);
            delete _this3.sourceBuffers[Object.keys(_this3.sourceBuffers)[i]];
          }

          _this3.container.removeEventListener('timeupdate', _this3.onTimeUpdate);
          _this3.container.removeEventListener('waiting', _this3.onWaiting);
          _this3.mediaSource.removeEventListener('sourceopen', _this3.onSourceOpen);

          _this3.endOfStream();
          window.URL.revokeObjectURL(_this3.url);

          _this3.url = null;
          _this3.configs = {};
          _this3.container = null;
          _this3.mediaSource = null;
          _this3.sourceBuffers = {};
          _this3.preloadTime = 1;
        });
      }
    }, {
      key: 'url',
      set: function set(val) {
        this._url = val;
      },
      get: function get() {
        if (!this._url) {
          this._url = window.URL.createObjectURL(this.mediaSource);
        }
        return this._url;
      }
    }], [{
      key: 'clearBuffer',
      value: function clearBuffer(buffer) {
        var buffered = buffer.buffered;
        var bEnd = 0.1;
        for (var i = 0, len = buffered.length; i < len; i++) {
          bEnd = buffered.end(i);
        }
        try {
          buffer.remove(0, bEnd);
        } catch (e) {
          // DO NOTHING
        }
      }
    }]);

    return MSE;
  }();

  var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  var _createClass$3 = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _possibleConstructorReturn$1(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof$1(call)) === "object" || typeof call === "function") ? call : self;
  }

  function _inherits$1(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof$1(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _classCallCheck$3(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Track = function () {
    /**
     * The constructor.
     */
    function Track() {
      _classCallCheck$3(this, Track);

      this.id = -1;
      this.sequenceNumber = 0;
      this.samples = [];
      this.droppedSamples = [];
      this.length = 0;
    }

    /**
     * Reset the track.
     */

    _createClass$3(Track, [{
      key: 'reset',
      value: function reset() {
        this.sequenceNumber = 0;
        this.samples = [];
        this.length = 0;
      }
      /**
       * destroy the track.
       */

    }, {
      key: 'distroy',
      value: function distroy() {
        this.reset();
        this.id = -1;
      }
    }]);

    return Track;
  }();

  var AudioTrack = function (_Track) {
    _inherits$1(AudioTrack, _Track);

    /**
     * The constructor for audio track.
     */
    function AudioTrack() {
      _classCallCheck$3(this, AudioTrack);

      var _this = _possibleConstructorReturn$1(this, (AudioTrack.__proto__ || Object.getPrototypeOf(AudioTrack)).call(this));

      _this.TAG = 'AudioTrack';
      _this.type = 'audio';
      return _this;
    }

    return AudioTrack;
  }(Track);

  var VideoTrack = function (_Track2) {
    _inherits$1(VideoTrack, _Track2);

    /**
     * The constructor for video track.
     */
    function VideoTrack() {
      _classCallCheck$3(this, VideoTrack);

      var _this2 = _possibleConstructorReturn$1(this, (VideoTrack.__proto__ || Object.getPrototypeOf(VideoTrack)).call(this));

      _this2.TAG = 'VideoTrack';
      _this2.type = 'video';
      _this2.dropped = 0;
      return _this2;
    }
    /**
     * reset the video track.
     */

    _createClass$3(VideoTrack, [{
      key: 'reset',
      value: function reset() {
        this.sequenceNumber = 0;
        this.samples = [];
        this.length = 0;
        this.dropped = 0;
      }
    }]);

    return VideoTrack;
  }(Track);

  var Tracks = function () {
    function Tracks() {
      _classCallCheck$3(this, Tracks);

      this.audioTrack = null;
      this.videoTrack = null;
    }

    _createClass$3(Tracks, [{
      key: 'destroy',
      value: function destroy() {
        this.audioTrack = null;
        this.videoTrack = null;
      }
    }]);

    return Tracks;
  }();

  var _createClass$4 = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$4(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Source = function Source() {
    _classCallCheck$4(this, Source);

    this.mimetype = '';
    this.init = null;
    this.data = [];
  };

  var PreSource = function () {
    function PreSource() {
      _classCallCheck$4(this, PreSource);

      this.sources = {};
    }

    _createClass$4(PreSource, [{
      key: 'getSource',
      value: function getSource(source) {
        return this.sources[source];
      }
    }, {
      key: 'createSource',
      value: function createSource(name) {
        this.sources[name] = new Source();
        return this.sources[name];
      }
    }, {
      key: 'clear',
      value: function clear() {
        this.sources = {};
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.sources = {};
      }
    }]);

    return PreSource;
  }();

  var _createClass$5 = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$5(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var XgBuffer = function () {
    /**
     * A buffer to store loaded data.
     *
     * @class LoaderBuffer
     * @param {number} length - Optional the buffer size
     */
    function XgBuffer(length) {
      _classCallCheck$5(this, XgBuffer);

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

    _createClass$5(XgBuffer, [{
      key: "push",
      value: function push(data) {
        this.array.push(data);
        this.length += data.byteLength;
        this.historyLen += data.byteLength;
      }

      /**
       * The function to shift data.
       *
       * @param {number} length - The size of shift.
       */

    }, {
      key: "shift",
      value: function shift(length) {
        if (this.array.length < 1) {
          return new Uint8Array(0);
        }

        if (length === undefined) {
          return this._shiftBuffer();
        }
        if (this.offset + length === this.array[0].length) {
          var _ret = this.array[0].slice(this.offset, this.offset + length);
          this.offset = 0;
          this.array.shift();
          this.length -= length;
          return _ret;
        }

        if (this.offset + length < this.array[0].length) {
          var _ret2 = this.array[0].slice(this.offset, this.offset + length);
          this.offset += length;
          this.length -= length;
          return _ret2;
        }

        var ret = new Uint8Array(length);
        var tmpoff = 0;
        while (this.array.length > 0 && length > 0) {
          if (this.offset + length < this.array[0].length) {
            var tmp = this.array[0].slice(this.offset, this.offset + length);
            ret.set(tmp, tmpoff);
            this.offset += length;
            this.length -= length;
            length = 0;
            break;
          } else {
            // console.log('mark1')
            var templength = this.array[0].length - this.offset;
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

    }, {
      key: "clear",
      value: function clear() {
        this.array = [];
        this.length = 0;
        this.offset = 0;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.clear();
        this.historyLen = 0;
      }

      /**
       * Function to shift one unit8Array.
       */

    }, {
      key: "_shiftBuffer",
      value: function _shiftBuffer() {
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

    }, {
      key: "toInt",
      value: function toInt(start, length) {
        var retInt = 0;
        var i = this.offset + start;
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
    }]);

    return XgBuffer;
  }();

  var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  var _typeof$2 = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
  };

  var _createClass$6 = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$6(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var LOADER_EVENTS$1 = EVENTS.LOADER_EVENTS;
  var READ_STREAM = 0;
  var READ_TEXT = 1;
  var READ_JSON = 2;
  var READ_BUFFER = 3;

  var FetchLoader = function () {
    function FetchLoader(configs) {
      _classCallCheck$6(this, FetchLoader);

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

    _createClass$6(FetchLoader, [{
      key: 'init',
      value: function init() {
        this.on(LOADER_EVENTS$1.LADER_START, this.load.bind(this));
      }
    }, {
      key: 'load',
      value: function load(url, opts) {
        var _this2 = this;

        this.url = url;

        this._canceled = false;

        // TODO: Add Ranges
        var params = this.getParams(opts);
        this.loading = true;
        return fetch(this.url, params).then(function (response) {
          if (response.ok) {
            _this2.status = response.status;
            Promise.resolve().then(function () {
              _this2._onFetchResponse(response);
            });

            return Promise.resolve(response);
          }
          _this2.loading = false;
          _this2.emit(LOADER_EVENTS$1.LOADER_ERROR, _this2.TAG, new Error(response.status + ' (' + response.statusText + ')'));
        }).catch(function (error) {
          _this2.loading = false;
          _this2.emit(LOADER_EVENTS$1.LOADER_ERROR, _this2.TAG, error);
          throw error;
        });
      }
    }, {
      key: '_onFetchResponse',
      value: function _onFetchResponse(response) {
        var _this = this;
        var buffer = this._context.getInstance(this.buffer);
        this._loaderTaskNo++;
        var taskno = this._loaderTaskNo;
        if (response.ok === true) {
          switch (this.readtype) {
            case READ_JSON:
              response.json().then(function (data) {
                _this.loading = false;
                if (!_this._canceled && !_this._destroyed) {
                  if (buffer) {
                    buffer.push(data);
                    _this.emit(LOADER_EVENTS$1.LOADER_COMPLETE, buffer);
                  } else {
                    _this.emit(LOADER_EVENTS$1.LOADER_COMPLETE, data);
                  }
                }
              });
              break;
            case READ_TEXT:
              response.text().then(function (data) {
                _this.loading = false;
                if (!_this._canceled && !_this._destroyed) {
                  if (buffer) {
                    buffer.push(data);
                    _this.emit(LOADER_EVENTS$1.LOADER_COMPLETE, buffer);
                  } else {
                    _this.emit(LOADER_EVENTS$1.LOADER_COMPLETE, data);
                  }
                }
              });
              break;
            case READ_BUFFER:
              response.arrayBuffer().then(function (data) {
                _this.loading = false;
                if (!_this._canceled && !_this._destroyed) {
                  if (buffer) {
                    buffer.push(new Uint8Array(data));
                    _this.emit(LOADER_EVENTS$1.LOADER_COMPLETE, buffer);
                  } else {
                    _this.emit(LOADER_EVENTS$1.LOADER_COMPLETE, data);
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
    }, {
      key: '_onReader',
      value: function _onReader(reader, taskno) {
        var _this3 = this;

        var buffer = this._context.getInstance(this.buffer);
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

        // reader read function returns a Promise. get data when callback and has value.done when disconnected.
        // read方法返回一个Promise. 回调中可以获取到数据。当value.done存在时，说明链接断开。
        this._reader && this._reader.read().then(function (val) {
          if (_this3._canceled || _this3._destroyed) {
            if (_this3._reader) {
              try {
                _this3._reader.cancel();
              } catch (e) {
                // DO NOTHING
              }
            }
            return;
          }
          if (val.done) {
            _this3.loading = false;
            _this3.status = 0;
            Promise.resolve().then(function () {
              _this3.emit(LOADER_EVENTS$1.LOADER_COMPLETE, buffer);
            });
            return;
          }

          buffer.push(val.value);
          Promise.resolve().then(function () {
            _this3.emit(LOADER_EVENTS$1.LOADER_DATALOADED, buffer);
          });
          return _this3._onReader(reader, taskno);
        }).catch(function (error) {
          _this3.loading = false;
          _this3.emit(LOADER_EVENTS$1.LOADER_ERROR, _this3.TAG, error);
          throw error;
        });
      }
    }, {
      key: 'getParams',
      value: function getParams(opts) {
        var options = Object.assign({}, opts);
        var headers = new Headers();

        var params = {
          method: 'GET',
          headers: headers,
          mode: 'cors',
          cache: 'default'

          // add custmor headers
          // 添加自定义头
        };if (_typeof$2(this.configs.headers) === 'object') {
          var configHeaders = this.configs.headers;
          for (var key in configHeaders) {
            if (configHeaders.hasOwnProperty(key)) {
              headers.append(key, configHeaders[key]);
            }
          }
        }

        if (_typeof$2(options.headers) === 'object') {
          var optHeaders = options.headers;
          for (var _key in optHeaders) {
            if (optHeaders.hasOwnProperty(_key)) {
              headers.append(_key, optHeaders[_key]);
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
    }, {
      key: 'cancel',
      value: function cancel() {
        if (this._reader) {
          try {
            this._reader.cancel();
          } catch (e) {
            // 防止failed: 200错误被打印到控制台上
          }
          this._reader = null;
          this.loading = false;
        }
        this._canceled = true;
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this._destroyed = true;
        this.cancel();
      }
    }], [{
      key: 'type',
      get: function get() {
        return 'loader';
      }
    }]);

    return FetchLoader;
  }();

  var _createClass$7 = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$7(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ADTS = function () {
    function ADTS() {
      _classCallCheck$7(this, ADTS);
    }

    _createClass$7(ADTS, null, [{
      key: "isHeader",
      value: function isHeader(data, offset) {
        // Look for ADTS header | 1111 1111 | 1111 X00X | where X can be either 0 or 1
        // Layer bits (position 14 and 15) in header should be always 0 for ADTS
        // More info https://wiki.multimedia.cx/index.php?title=ADTS
        if (offset + 1 < data.length && ADTS.isHeaderPattern(data, offset)) {
          return true;
        }

        return false;
      }
    }, {
      key: "getFrameDuration",
      value: function getFrameDuration(samplerate) {
        return 1024 * 90000 / samplerate;
      }
    }, {
      key: "isHeaderPattern",
      value: function isHeaderPattern(data, offset) {
        return data[offset] === 0xff && (data[offset + 1] & 0xf6) === 0xf0;
      }
    }, {
      key: "getHeaderLength",
      value: function getHeaderLength(data, offset) {
        return data[offset + 1] & 0x01 ? 7 : 9;
      }
    }, {
      key: "getFullFrameLength",
      value: function getFullFrameLength(data, offset) {
        return (data[offset + 3] & 0x03) << 11 | data[offset + 4] << 3 | (data[offset + 5] & 0xE0) >>> 5;
      }
    }, {
      key: "parseFrameHeader",
      value: function parseFrameHeader(data, offset, pts, frameIndex, frameDuration) {
        var headerLength = void 0,
            frameLength = void 0,
            stamp = void 0;
        var length = data.length;

        // The protection skip bit tells us if we have 2 bytes of CRC data at the end of the ADTS header
        headerLength = ADTS.getHeaderLength(data, offset);
        // retrieve frame size
        frameLength = ADTS.getFullFrameLength(data, offset);
        frameLength -= headerLength;

        if (frameLength > 0 && offset + headerLength + frameLength <= length) {
          stamp = pts + frameIndex * frameDuration;
          // logger.log(`AAC frame, offset/length/total/pts:${offset+headerLength}/${frameLength}/${data.byteLength}/${(stamp/90).toFixed(0)}`);
          return { headerLength: headerLength, frameLength: frameLength, stamp: stamp };
        }

        return undefined;
      }
    }, {
      key: "appendFrame",
      value: function appendFrame(track, data, offset, pts, frameIndex) {
        var frameDuration = ADTS.getFrameDuration(track.meta.sampleRate);
        var header = ADTS.parseFrameHeader(data, offset, pts, frameIndex, frameDuration);
        if (header) {
          var stamp = header.stamp;
          var headerLength = header.headerLength;
          var frameLength = header.frameLength;

          // logger.log(`AAC frame, offset/length/total/pts:${offset+headerLength}/${frameLength}/${data.byteLength}/${(stamp/90).toFixed(0)}`);
          var aacSample = {
            unit: data.subarray(offset + headerLength, offset + headerLength + frameLength),
            pts: stamp,
            dts: stamp
          };

          return { sample: aacSample, length: frameLength + headerLength };
        }

        return undefined;
      }
    }]);

    return ADTS;
  }();

  var _createClass$8 = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$8(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var AAC = function () {
    function AAC() {
      _classCallCheck$8(this, AAC);
    }

    _createClass$8(AAC, null, [{
      key: 'getSilentFrame',
      value: function getSilentFrame(codec, channelCount) {
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
    }]);

    return AAC;
  }();

  var ADTS$1 = ADTS;

  var _createClass$9 = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$9(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var REMUX_EVENTS$1 = EVENTS.REMUX_EVENTS;

  var Compatibility = function () {
    function Compatibility() {
      _classCallCheck$9(this, Compatibility);

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

    _createClass$9(Compatibility, [{
      key: 'init',
      value: function init() {
        this.before(REMUX_EVENTS$1.REMUX_MEDIA, this.doFix.bind(this));
      }
    }, {
      key: 'reset',
      value: function reset() {
        this.nextAudioDts = null; // 估算下一段音频数据的dts
        this.nextVideoDts = null; // 估算下一段视频数据的dts

        this.lastAudioSamplesLen = 0; // 上一段音频数据的长度
        this.lastVideoSamplesLen = 0; // 上一段视频数据的长度

        this.lastVideoDts = undefined; // 上一段音频数据的dts
        this.lastAudioDts = undefined; // 上一段视频数据的dts

        // this.allAudioSamplesCount = 0 // 音频总数据量(原始帧)
        // this.allVideoSamplesCount = 0 // 视频总数据量(原始帧)

        // this._firstAudioSample = null
        // this._firstVideoSample = null
        // this._firstAudioSample = null
        // this._firstVideoSample = null
        this.videoLastSample = null;
        this.audioLastSample = null;

        this.filledAudioSamples = []; // 补充音频帧（）
        this.filledVideoSamples = []; // 补充视频帧（）
      }
    }, {
      key: 'doFix',
      value: function doFix() {
        var _getFirstSample = this.getFirstSample(),
            isFirstAudioSamples = _getFirstSample.isFirstAudioSamples,
            isFirstVideoSamples = _getFirstSample.isFirstVideoSamples;

        this.recordSamplesCount();

        if (this._firstVideoSample) {
          this.fixRefSampleDuration(this.videoTrack.meta, this.videoTrack.samples);
        }
        if (this._firstAudioSample) {
          this.fixRefSampleDuration(this.audioTrack.meta, this.audioTrack.samples);
        }

        var _Compatibility$detect = Compatibility.detectChangeStream(this.videoTrack.samples, isFirstVideoSamples),
            videoChanged = _Compatibility$detect.changed,
            videoChangedIdxes = _Compatibility$detect.changedIdxes;

        if (videoChanged) {
          var disContinue = false;
          for (var i = 0; i < videoChangedIdxes.length; i++) {
            if (this.fixChangeStreamVideo(videoChangedIdxes[i], isFirstVideoSamples)) {
              disContinue = true;
            }
          }
          if (!disContinue) {
            this.doFixVideo(isFirstVideoSamples);
          }
        } else {
          this.doFixVideo(isFirstVideoSamples);
        }

        var _Compatibility$detect2 = Compatibility.detectChangeStream(this.audioTrack.samples, isFirstAudioSamples),
            audioChanged = _Compatibility$detect2.changed,
            audioChangedIdxes = _Compatibility$detect2.changedIdxes;

        if (audioChanged) {
          var _disContinue = false;
          for (var _i = 0; _i < audioChangedIdxes.length; _i++) {
            if (this.fixChangeStreamAudio(audioChangedIdxes[_i], isFirstAudioSamples)) {
              _disContinue = true;
            }
          }
          if (!_disContinue) {
            this.doFixAudio(isFirstAudioSamples);
          } else {
            return;
          }
        } else {
          this.doFixAudio(isFirstAudioSamples);
        }

        this.removeInvalidSamples();
      }
    }, {
      key: 'doFixVideo',
      value: function doFixVideo(first, streamChangeStart) {
        var _videoTrack = this.videoTrack,
            videoSamples = _videoTrack.samples,
            meta = _videoTrack.meta;

        // console.log('next video', this.nextVideoDts)

        for (var i = 0, len = videoSamples.length; i < len; i++) {
          var sample = videoSamples[i];
          sample.originDts = sample.dts;
        }

        if (meta.frameRate && meta.frameRate.fixed === false) {
          return;
        }

        if (!videoSamples || !videoSamples.length || !this._firstVideoSample) {
          return;
        }

        // console.log(`video lastSample, ${videoSamples[videoSamples.length - 1].dts}`)

        var firstSample = videoSamples[0];

        // step0.修复hls流出现巨大gap，需要强制重定位的问题
        if (this._videoLargeGap !== 0) {
          Compatibility.doFixLargeGap(videoSamples, this._videoLargeGap);
        } else if (firstSample.dts !== this._firstVideoSample.dts && (streamChangeStart || this.videoLastSample && Compatibility.detectLargeGap(this.videoLastSample.dts, firstSample))) {
          if (streamChangeStart) {
            this.nextVideoDts = streamChangeStart; // FIX: Hls中途切codec，在如果直接seek到后面的点会导致largeGap计算失败
          } else {
            this.nextVideoDts = this.videoLastSample.dts;
          }

          this._videoLargeGap = this.nextVideoDts - firstSample.dts;
          Compatibility.doFixLargeGap(videoSamples, this._videoLargeGap);
        }

        // step1. 修复与audio首帧差距太大的问题
        if (first && this._firstAudioSample) {
          var videoFirstDts = this._firstVideoSample.originDts;
          var audioFirstDts = this._firstAudioSample.originDts || this._firstAudioSample.dts;
          var gap = videoFirstDts - audioFirstDts;
          if (gap > 2 * meta.refSampleDuration && gap < 10 * meta.refSampleDuration) {
            var fillCount = Math.floor(gap / meta.refSampleDuration);

            for (var _i2 = 0; _i2 < fillCount; _i2++) {
              var clonedFirstSample = Object.assign({}, firstSample); // 视频头部帧缺失需要复制第一帧
              // 重新计算sample的dts和pts
              clonedFirstSample.dts = videoFirstDts - (_i2 + 1) * meta.refSampleDuration;
              clonedFirstSample.pts = clonedFirstSample.dts + clonedFirstSample.cts;

              videoSamples.unshift(clonedFirstSample);

              this.filledVideoSamples.push({
                dts: clonedFirstSample.dts,
                size: clonedFirstSample.data.byteLength
              });
            }
            this._firstVideoSample = this.filledVideoSamples[0] || this._firstVideoSample;
          } else if (Math.abs(gap) > 2 * meta.refSampleDuration && !this._videoLargeGap) {
            this._videoLargeGap = -1 * gap;
            Compatibility.doFixLargeGap(videoSamples, -1 * gap);
          }
        }

        var curLastSample = videoSamples.pop();
        if (videoSamples.length) {
          videoSamples[videoSamples.length - 1].duration = curLastSample.dts - videoSamples[videoSamples.length - 1].dts;
        }

        if (this.videoLastSample) {
          var videoLastSample = this.videoLastSample;
          videoLastSample.duration = firstSample.dts - videoLastSample.dts;
          videoSamples.unshift(this.videoLastSample);
        }

        this.videoLastSample = curLastSample;

        this.videoTrack.samples = videoSamples;
      }
    }, {
      key: 'doFixAudio',
      value: function doFixAudio(first, streamChangeStart) {
        var _audioTrack = this.audioTrack,
            audioSamples = _audioTrack.samples,
            meta = _audioTrack.meta;

        if (!audioSamples || !audioSamples.length) {
          return;
        }

        // console.log('next audio', this.nextAudioDts)
        for (var i = 0, len = audioSamples.length; i < len; i++) {
          var sample = audioSamples[i];
          sample.originDts = sample.dts;
        }

        // console.log(`audio lastSample, ${audioSamples[audioSamples.length - 1].dts}`)

        var samplesLen = audioSamples.length;
        var silentFrame = AAC.getSilentFrame(meta.codec, meta.channelCount);

        var firstSample = this._firstAudioSample;

        var _firstSample = audioSamples[0];
        // 对audioSamples按照dts做排序
        // audioSamples = Compatibility.sortAudioSamples(audioSamples)
        if (this._audioLargeGap !== 0) {
          Compatibility.doFixLargeGap(audioSamples, this._audioLargeGap);
        } else if (_firstSample.dts !== this._firstAudioSample.dts && (streamChangeStart || Compatibility.detectLargeGap(this.nextAudioDts, _firstSample))) {
          if (streamChangeStart) {
            this.nextAudioDts = streamChangeStart; // FIX: Hls中途切codec，在如果直接seek到后面的点会导致largeGap计算失败
          }
          this._audioLargeGap = this.nextAudioDts - _firstSample.dts;

          Compatibility.doFixLargeGap(audioSamples, this._audioLargeGap);
        }
        // step0. 首帧与video首帧间距大的问题
        if (this._firstVideoSample && first) {
          var videoFirstPts = this._firstVideoSample.originDts || this._firstVideoSample.dts;
          var _gap = firstSample.dts - videoFirstPts;
          if (_gap > meta.refSampleDuration && _gap < 10 * meta.refSampleDuration) {
            var silentSampleCount = Math.floor((firstSample.dts - videoFirstPts) / meta.refSampleDuration);

            for (var _i3 = 0; _i3 < silentSampleCount; _i3++) {
              var silentSample = {
                data: silentFrame,
                datasize: silentFrame.byteLength,
                dts: firstSample.dts - (_i3 + 1) * meta.refSampleDuration,
                filtered: 0
              };

              audioSamples.unshift(silentSample);

              this.filledAudioSamples.push({
                dts: silentSample.dts,
                size: silentSample.data.byteLength
              });
            }
            this._firstAudioSample = this.filledAudioSamples[0] || this._firstAudioSample;
          } else if (_gap < -1 * meta.refSampleDuration) {
            this._audioLargeGap = -1 * _gap;
            Compatibility.doFixLargeGap(audioSamples, -1 * _gap);
          }
        }

        var gap = void 0;
        var firstDts = audioSamples[0].dts;

        if (this.nextAudioDts) {
          // step1. 处理samples段之间的丢帧情况
          // 当发现duration差距大于1帧时进行补帧
          gap = firstDts - this.nextAudioDts;
          var absGap = Math.abs(gap);

          if (absGap > meta.refSampleDuration && samplesLen === 1 && this.lastAudioSamplesLen === 1) {
            meta.refSampleDurationFixed = undefined;
          }

          if (gap > 2 * meta.refSampleDuration && gap < 10 * meta.refSampleDuration) {
            if (samplesLen === 1 && this.lastAudioSamplesLen === 1) {
              // 如果sample的length一直是1，而且一直不符合refSampleDuration，需要动态修改refSampleDuration
              meta.refSampleDurationFixed = meta.refSampleDurationFixed !== undefined ? meta.refSampleDurationFixed + gap : meta.refSampleDuration + gap;
            } else {
              var silentFrameCount = Math.floor(gap / meta.refSampleDuration);

              for (var _i4 = 0; _i4 < silentFrameCount; _i4++) {
                var computed = firstDts - (_i4 + 1) * meta.refSampleDuration;
                var _silentSample = Object.assign({}, audioSamples[0], {
                  dts: computed > this.nextAudioDts ? computed : this.nextAudioDts
                });

                this.filledAudioSamples.push({
                  dts: _silentSample.dts,
                  size: _silentSample.data.byteLength
                });
                this.audioTrack.samples.unshift(_silentSample);
              }
            }
          } else if (absGap <= meta.refSampleDuration && absGap > 0) {
            // 当差距比较小的时候将音频帧重定位
            // console.log('重定位音频帧dts', audioSamples[0].dts, this.nextAudioDts)
            audioSamples[0].dts = this.nextAudioDts;
            audioSamples[0].pts = this.nextAudioDts;
          } else if (gap < 0 && absGap <= meta.refSampleDuration) {
            Compatibility.doFixLargeGap(audioSamples, -1 * gap);
          }
        }
        var lastOriginDts = audioSamples[audioSamples.length - 1].originDts;
        var lastDts = audioSamples[audioSamples.length - 1].dts;
        var lastSampleDuration = audioSamples.length >= 2 ? lastOriginDts - audioSamples[audioSamples.length - 2].originDts : meta.refSampleDuration;

        this.lastAudioSamplesLen = samplesLen;
        this.nextAudioDts = meta.refSampleDurationFixed ? lastDts + meta.refSampleDurationFixed : lastDts + lastSampleDuration;
        this.lastAudioDts = lastDts;

        audioSamples[audioSamples.length - 1].duration = lastSampleDuration;

        this.audioTrack.samples = Compatibility.sortAudioSamples(audioSamples);
      }
    }, {
      key: 'fixChangeStreamVideo',
      value: function fixChangeStreamVideo(changeIdx) {
        var _videoTrack2 = this.videoTrack,
            samples = _videoTrack2.samples,
            meta = _videoTrack2.meta;
        var isFirstVideoSample = this.isFirstVideoSample;

        var prevDts = changeIdx === 0 ? this.videoLastSample ? this.videoLastSample.dts : this.getStreamChangeStart(samples[0]) : samples[changeIdx - 1].dts;
        var curDts = samples[changeIdx].dts;
        var isContinue = Math.abs(prevDts - curDts) <= 2 * 1000;

        if (isContinue) {
          if (!samples[changeIdx].options) {
            samples[changeIdx].options = {
              isContinue: true
            };
          } else {
            samples[changeIdx].options.isContinue = true;
          }
          return false;
        }

        this.emit(REMUX_EVENTS$1.DETECT_CHANGE_STREAM_DISCONTINUE);
        this._videoLargeGap = 0;
        this.videoLastSample = null;
        var firstPartSamples = samples.slice(0, changeIdx);
        var secondPartSamples = samples.slice(changeIdx);
        var changeSample = samples[changeIdx];

        var streamChangeStart = void 0;

        if (changeSample.options && changeSample.options.start) {
          streamChangeStart = changeSample.options.start;
        } else {
          streamChangeStart = prevDts + meta.refSampleDuration;
        }

        this.videoTrack.samples = samples.slice(0, changeIdx);

        this.doFixVideo(false);

        this.videoTrack.samples = samples.slice(changeIdx);

        this.doFixVideo(false, streamChangeStart);

        this.videoTrack.samples = firstPartSamples.concat(secondPartSamples);

        return true;
      }
    }, {
      key: 'fixChangeStreamAudio',
      value: function fixChangeStreamAudio(changeIdx) {
        var _audioTrack2 = this.audioTrack,
            samples = _audioTrack2.samples,
            meta = _audioTrack2.meta;

        var prevDts = changeIdx === 0 ? this.lastAudioDts : samples[changeIdx - 1].dts;
        var curDts = samples[changeIdx].dts;
        var isContinue = Math.abs(prevDts - curDts) <= 2 * 1000;

        if (isContinue) {
          if (!samples[changeIdx].options) {
            samples[changeIdx].options = {
              isContinue: true
            };
          } else {
            samples[changeIdx].options.isContinue = true;
          }
          return false;
        }
        this.emit(REMUX_EVENTS$1.DETECT_CHANGE_STREAM_DISCONTINUE);
        this._audioLargeGap = 0;
        this.nextAudioDts = null;
        var firstPartSamples = samples.slice(0, changeIdx);
        var secondPartSamples = samples.slice(changeIdx);
        var changeSample = samples[changeIdx];

        var streamChangeStart = void 0;
        if (changeSample.options && changeSample.options.start) {
          streamChangeStart = changeSample.options.start;
        } else {
          streamChangeStart = prevDts + meta.refSampleDuration;
          changeSample.options.isContinue = true;
        }

        this.audioTrack.samples = firstPartSamples;

        this.doFixAudio(false);

        this.audioTrack.samples = secondPartSamples;

        this.doFixAudio(false, streamChangeStart);

        this.audioTrack.samples = firstPartSamples.concat(secondPartSamples);

        return true;
      }
    }, {
      key: 'getFirstSample',
      value: function getFirstSample() {
        // 获取video和audio的首帧数据
        var videoSamples = this.videoTrack.samples;
        var audioSamples = this.audioTrack.samples;

        var isFirstVideoSamples = false;
        var isFirstAudioSamples = false;

        if (!this._firstVideoSample && videoSamples.length) {
          this._firstVideoSample = Compatibility.findFirstVideoSample(videoSamples);
          this.removeInvalidSamples();
          isFirstVideoSamples = true;
        }

        if (!this._firstAudioSample && audioSamples.length) {
          this._firstAudioSample = Compatibility.findFirstAudioSample(audioSamples); // 寻找dts最小的帧作为首个音频帧
          this.removeInvalidSamples();
          isFirstAudioSamples = true;
        }

        return {
          isFirstVideoSamples: isFirstVideoSamples,
          isFirstAudioSamples: isFirstAudioSamples
        };
      }

      /**
       * 在没有refSampleDuration的问题流中，
       */

    }, {
      key: 'fixRefSampleDuration',
      value: function fixRefSampleDuration(meta, samples) {
        var isVideo = meta.type === 'video';
        var allSamplesCount = isVideo ? this.allVideoSamplesCount : this.allAudioSamplesCount;
        var firstDts = isVideo ? this._firstVideoSample.dts : this._firstAudioSample.dts;
        var filledSamplesCount = isVideo ? this.filledVideoSamples.length : this.filledAudioSamples.length;

        if (!meta.refSampleDuration || meta.refSampleDuration <= 0 || Number.isNaN(meta.refSampleDuration)) {
          if (samples.length >= 1) {
            var lastDts = samples[samples.length - 1].dts;

            meta.refSampleDuration = Math.floor((lastDts - firstDts) / (allSamplesCount + filledSamplesCount - 1)); // 将refSampleDuration重置为计算后的平均值
          }
        } else if (meta.refSampleDuration) {
          if (samples.length >= 5) {
            var _lastDts = samples[samples.length - 1].dts;
            var _firstDts = samples[0].dts;
            var durationAvg = (_lastDts - _firstDts) / (samples.length - 1);
            if (durationAvg > 0 && durationAvg < 1000) {
              meta.refSampleDuration = Math.floor(Math.abs(meta.refSampleDuration - durationAvg) <= 5 ? meta.refSampleDuration : durationAvg); // 将refSampleDuration重置为计算后的平均值
            }
          }
        }
      }

      /**
       * 记录截止目前一共播放了多少帧
       */

    }, {
      key: 'recordSamplesCount',
      value: function recordSamplesCount() {
        var audioTrack = this.audioTrack,
            videoTrack = this.videoTrack;

        this.allAudioSamplesCount += audioTrack.samples.length;
        this.allVideoSamplesCount += videoTrack.samples.length;
      }

      /**
       * 去除不合法的帧（倒退、重复帧）
       */

    }, {
      key: 'removeInvalidSamples',
      value: function removeInvalidSamples() {
        var firstAudioSample = this.audioTrack.samples[0];
        var firstVideoSample = this.videoTrack.samples[0];
        // const { _firstVideoSample, _firstAudioSample } = this

        if (firstAudioSample) {
          this.audioTrack.samples = this.audioTrack.samples.filter(function (sample, index) {
            if (sample === firstAudioSample) {
              return true;
            }
            return sample.dts > firstAudioSample.dts;
          });
        }

        if (firstVideoSample) {
          this.videoTrack.samples = this.videoTrack.samples.filter(function (sample, index) {
            if (sample === firstVideoSample) {
              return true;
            }
            return sample.dts > firstVideoSample.dts;
          });
        }
      }
    }, {
      key: 'getStreamChangeStart',
      value: function getStreamChangeStart(sample) {
        if (sample.options && sample.options.start) {
          return sample.options.start - this.dtsBase;
        }
        return Infinity;
      }
    }, {
      key: 'tracks',
      get: function get() {
        return this._context.getInstance('TRACKS');
      }
    }, {
      key: 'audioTrack',
      get: function get() {
        if (this.tracks && this.tracks.audioTrack) {
          return this.tracks.audioTrack;
        }
        return {
          samples: [],
          meta: {}
        };
      }
    }, {
      key: 'videoTrack',
      get: function get() {
        if (this.tracks && this.tracks.videoTrack) {
          return this.tracks.videoTrack;
        }
        return {
          samples: [],
          meta: {}
        };
      }
    }, {
      key: 'dtsBase',
      get: function get() {
        var remuxer = this._context.getInstance('MP4_REMUXER');
        if (remuxer) {
          return remuxer._dtsBase;
        }
        return 0;
      }
    }, {
      key: 'audioDtsBase',
      get: function get() {
        var remuxer = this._context.getInstance('MP4_REMUXER');
        if (remuxer && remuxer._audioDtsBase) {
          return remuxer._audioDtsBase;
        }

        return this.dtsBase;
      }
    }, {
      key: 'videoDtsBase',
      get: function get() {
        var remuxer = this._context.getInstance('MP4_REMUXER');
        if (remuxer && remuxer._videoDtsBase) {
          return remuxer._videoDtsBase;
        }

        return this.dtsBase;
      }
    }], [{
      key: 'sortAudioSamples',
      value: function sortAudioSamples(samples) {
        if (samples.length === 1) {
          return samples;
        }

        return samples.sort(function (a, b) {
          return a.dts - b.dts;
        });
      }

      /**
       * 寻找dts最小的sample
       * @param samples
       */

    }, {
      key: 'findFirstAudioSample',
      value: function findFirstAudioSample(samples) {
        if (!samples || samples.length === 0) {
          return null;
        }

        return Compatibility.sortAudioSamples(samples)[0];
      }
    }, {
      key: 'findFirstVideoSample',
      value: function findFirstVideoSample(samples) {
        if (!samples.length) {
          return null;
        }

        var sorted = samples.sort(function (a, b) {
          return a.dts - b.dts;
        });

        for (var i = 0, len = sorted.length; i < len; i++) {
          if (sorted[i].isKeyframe) {
            return sorted[i];
          }
        }
      }
    }, {
      key: 'detectLargeGap',
      value: function detectLargeGap(nextDts, firstSample) {
        if (nextDts === null) {
          return;
        }
        var curDts = firstSample.dts || 0;
        var cond1 = nextDts - curDts >= 1000 || curDts - nextDts >= 1000; // fix hls流出现大量流dts间距问题
        var cond2 = firstSample.options && firstSample.options.discontinue;

        return cond1 || cond2;
      }
    }, {
      key: 'doFixLargeGap',
      value: function doFixLargeGap(samples, gap) {
        // console.log('fix large gap ', gap)
        for (var i = 0, len = samples.length; i < len; i++) {
          var sample = samples[i];
          sample.dts += gap;
          if (sample.pts) {
            sample.pts += gap;
          }
        }
      }

      /**
       * 中途换流
       */

    }, {
      key: 'detectChangeStream',
      value: function detectChangeStream(samples, isFirst) {
        var changed = false;
        var changedIdxes = [];
        for (var i = 0, len = samples.length; i < len; i++) {
          var sample = samples[i];
          if (sample.options && sample.options.meta && !(isFirst && i === 0)) {
            changed = true;
            changedIdxes.push(i);
            // break;
          }
        }

        return {
          changed: changed,
          changedIdxes: changedIdxes
        };
      }
    }]);

    return Compatibility;
  }();

  var _createClass$a = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$a(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var BROWSER_EVENTS$1 = EVENTS.BROWSER_EVENTS;
  var hidden = void 0;
  var visibilityChange = void 0;

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

  var PageVisibility = function () {
    function PageVisibility() {
      _classCallCheck$a(this, PageVisibility);

      this.callbacks = {
        onShow: [],
        onHidden: []
      };
      this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
      this.init();
    }

    _createClass$a(PageVisibility, [{
      key: 'init',
      value: function init() {
        document.addEventListener(visibilityChange, this.handleVisibilityChange, false);
      }
    }, {
      key: 'handleVisibilityChange',
      value: function handleVisibilityChange() {
        this.emit(BROWSER_EVENTS$1.VISIBILITY_CHANGE, document[hidden]);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        document.removeEventListener(visibilityChange, this.handleVisibilityChange);
      }
    }]);

    return PageVisibility;
  }();

  var le = function () {
    var buf = new ArrayBuffer(2);
    new DataView(buf).setInt16(0, 256, true); // little-endian write
    return new Int16Array(buf)[0] === 256; // platform-spec read, if equal then LE
  }();

  var sniffer = {
    get device() {
      var r = sniffer.os;
      return r.isPc ? 'pc' : r.isTablet ? 'tablet' : 'mobile';
    },
    get browser() {
      var ua = navigator.userAgent.toLowerCase();
      var reg = {
        ie: /rv:([\d.]+)\) like gecko/,
        firfox: /firefox\/([\d.]+)/,
        chrome: /chrome\/([\d.]+)/,
        opera: /opera.([\d.]+)/,
        safari: /version\/([\d.]+).*safari/
      };
      return [].concat(Object.keys(reg).filter(function (key) {
        return reg[key].test(ua);
      }))[0];
    },
    get os() {
      var ua = navigator.userAgent;
      var isWindowsPhone = /(?:Windows Phone)/.test(ua);
      var isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
      var isAndroid = /(?:Android)/.test(ua);
      var isFireFox = /(?:Firefox)/.test(ua);
      var isTablet = /(?:iPad|PlayBook)/.test(ua) || isAndroid && !/(?:Mobile)/.test(ua) || isFireFox && /(?:Tablet)/.test(ua);
      var isPhone = /(?:iPhone)/.test(ua) && !isTablet;
      var isPc = !isPhone && !isAndroid && !isSymbian;
      return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc,
        isSymbian: isSymbian,
        isWindowsPhone: isWindowsPhone,
        isFireFox: isFireFox
      };
    },

    get isLe() {
      return le;
    }
  };

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var concat = createCommonjsModule(function (module, exports) {

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
  });

  unwrapExports(concat);

  var lib = createCommonjsModule(function (module) {



  var _concat2 = _interopRequireDefault(concat);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  module.exports = _concat2.default;
  });

  var Concat = unwrapExports(lib);

  var _createClass$b = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$b(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Buffer = function () {
    function Buffer(buffer) {
      _classCallCheck$b(this, Buffer);

      this.buffer = buffer || new Uint8Array(0);
    }

    _createClass$b(Buffer, [{
      key: 'write',
      value: function write() {
        var _this = this;

        for (var _len = arguments.length, buffer = Array(_len), _key = 0; _key < _len; _key++) {
          buffer[_key] = arguments[_key];
        }

        buffer.forEach(function (item) {
          _this.buffer = Concat(Uint8Array, _this.buffer, item);
        });
      }
    }], [{
      key: 'writeUint32',
      value: function writeUint32(value) {
        return new Uint8Array([value >> 24, value >> 16 & 0xff, value >> 8 & 0xff, value & 0xff]);
      }
    }, {
      key: 'readAsInt',
      value: function readAsInt(arr) {
        var temp = '';

        function padStart4Hex(hexNum) {
          var hexStr = hexNum.toString(16);
          return hexStr.padStart(2, '0');
        }

        arr.forEach(function (num) {
          temp += padStart4Hex(num);
        });
        return parseInt(temp, 16);
      }
    }]);

    return Buffer;
  }();

  var _createClass$c = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$c(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  // const UINT32_MAX = Math.pow(2, 32) - 1;

  var Fmp4 = function () {
    function Fmp4() {
      _classCallCheck$c(this, Fmp4);
    }

    _createClass$c(Fmp4, null, [{
      key: 'size',
      value: function size(value) {
        return Buffer.writeUint32(value);
      }
    }, {
      key: 'initBox',
      value: function initBox(size, name) {
        var buffer = new Buffer();

        for (var _len = arguments.length, content = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          content[_key - 2] = arguments[_key];
        }

        buffer.write.apply(buffer, [Fmp4.size(size), Fmp4.type(name)].concat(content));
        return buffer.buffer;
      }
    }, {
      key: 'extension',
      value: function extension(version, flag) {
        return new Uint8Array([version, flag >> 16 & 0xff, flag >> 8 & 0xff, flag & 0xff]);
      }
    }, {
      key: 'ftyp',
      value: function ftyp() {
        return Fmp4.initBox(24, 'ftyp', new Uint8Array([0x69, 0x73, 0x6F, 0x6D, // isom,
        0x0, 0x0, 0x00, 0x01, // minor_version: 0x01
        0x69, 0x73, 0x6F, 0x6D, // isom
        0x61, 0x76, 0x63, 0x31 // avc1
        ]));
      }
    }, {
      key: 'ftypHEVC',
      value: function ftypHEVC() {
        return Fmp4.initBox(24, 'ftyp', new Uint8Array([0x69, 0x73, 0x6F, 0x6D, // isom,
        0x0, 0x0, 0x00, 0x01, // minor_version: 0x01
        0x69, 0x73, 0x6F, 0x6D, // isom
        0x64, 0x61, 0x73, 0x68 // hev1
        ]));
      }
    }, {
      key: 'moov',
      value: function moov(_ref) {
        var type = _ref.type,
            meta = _ref.meta;

        var size = 8;
        var mvhd = Fmp4.mvhd(meta.duration, meta.timescale);
        var trak = void 0;

        if (type === 'video') {
          trak = Fmp4.videoTrak(meta);
        } else {
          trak = Fmp4.audioTrak(meta);
        }

        var mvex = Fmp4.mvex(meta.duration, meta.timescale || 1000, meta.id);
        [mvhd, trak, mvex].forEach(function (item) {
          size += item.byteLength;
        });
        return Fmp4.initBox(size, 'moov', mvhd, trak, mvex);
      }
    }, {
      key: 'mvhd',
      value: function mvhd(duration) {
        var timescale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;

        // duration *= timescale;
        var bytes = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags     1位的box版本+3位flags   box版本，0或1，一般为0。（以下字节数均按version=0）
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
    }, {
      key: 'videoTrak',
      value: function videoTrak(data) {
        var size = 8;

        var tkhd = Fmp4.tkhd({
          id: 1,
          duration: data.duration,
          timescale: data.timescale || 1000,
          width: data.presentWidth,
          height: data.presentHeight,
          type: 'video'
        });
        var mdia = Fmp4.mdia({
          type: 'video',
          timescale: data.timescale || 1000,
          duration: data.duration,
          avcc: data.avcc,
          parRatio: data.parRatio,
          width: data.presentWidth,
          height: data.presentHeight,
          streamType: data.streamType
        });
        [tkhd, mdia].forEach(function (item) {
          size += item.byteLength;
        });
        return Fmp4.initBox(size, 'trak', tkhd, mdia);
      }
    }, {
      key: 'audioTrak',
      value: function audioTrak(data) {
        var size = 8;
        var tkhd = Fmp4.tkhd({
          id: 2,
          duration: data.duration,
          timescale: data.timescale || 1000,
          width: 0,
          height: 0,
          type: 'audio'
        });
        var mdia = Fmp4.mdia({
          type: 'audio',
          timescale: data.timescale || 1000,
          duration: data.duration,
          channelCount: data.channelCount,
          samplerate: data.sampleRate,
          config: data.config
        });
        [tkhd, mdia].forEach(function (item) {
          size += item.byteLength;
        });
        return Fmp4.initBox(size, 'trak', tkhd, mdia);
      }
    }, {
      key: 'tkhd',
      value: function tkhd(data) {
        var id = data.id;
        var duration = data.duration;
        var width = data.width;
        var height = data.height;
        var content = new Uint8Array([0x00, 0x00, 0x00, 0x07, // version(0) + flags 1位版本 box版本，0或1，一般为0。（以下字节数均按version=0）按位或操作结果值，预定义如下：
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
    }, {
      key: 'edts',
      value: function edts(data) {
        var buffer = new Buffer();
        var duration = data.duration;
        var mediaTime = data.mediaTime;
        buffer.write(Fmp4.size(36), Fmp4.type('edts'));
        // elst
        buffer.write(Fmp4.size(28), Fmp4.type('elst'));
        buffer.write(new Uint8Array([0x00, 0x00, 0x00, 0x01, // entry count
        duration >> 24 & 0xff, duration >> 16 & 0xff, duration >> 8 & 0xff, duration & 0xff, mediaTime >> 24 & 0xff, mediaTime >> 16 & 0xff, mediaTime >> 8 & 0xff, mediaTime & 0xff, 0x00, 0x00, 0x00, 0x01 // media rate
        ]));
        return buffer.buffer;
      }
    }, {
      key: 'mdia',
      value: function mdia(data) {
        var size = 8;
        var mdhd = Fmp4.mdhd(data.timescale, data.duration);
        var hdlr = Fmp4.hdlr(data.type);
        var minf = Fmp4.minf(data);
        [mdhd, hdlr, minf].forEach(function (item) {
          size += item.byteLength;
        });
        return Fmp4.initBox(size, 'mdia', mdhd, hdlr, minf);
      }
    }, {
      key: 'mdhd',
      value: function mdhd() {
        var timescale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
        var duration = arguments[1];

        var content = new Uint8Array([0x00, 0x00, 0x00, 0x00, // creation_time    创建时间
        0x00, 0x00, 0x00, 0x00, // modification_time修改时间
        timescale >>> 24 & 0xFF, // timescale: 4 bytes    文件媒体在1秒时间内的刻度值，可以理解为1秒长度
        timescale >>> 16 & 0xFF, timescale >>> 8 & 0xFF, timescale & 0xFF, duration >>> 24 & 0xFF, // duration: 4 bytes  track的时间长度
        duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, 0x55, 0xC4, // language: und (undetermined) 媒体语言码。最高位为0，后面15位为3个字符（见ISO 639-2/T标准中定义）
        0x00, 0x00 // pre_defined = 0
        ]);
        return Fmp4.initBox(12 + content.byteLength, 'mdhd', Fmp4.extension(0, 0), content);
      }
    }, {
      key: 'hdlr',
      value: function hdlr(type) {
        var value = [0x00, // version 0
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
    }, {
      key: 'minf',
      value: function minf(data) {
        var size = 8;
        var vmhd = data.type === 'video' ? Fmp4.vmhd() : Fmp4.smhd();
        var dinf = Fmp4.dinf();
        var stbl = Fmp4.stbl(data);
        [vmhd, dinf, stbl].forEach(function (item) {
          size += item.byteLength;
        });
        return Fmp4.initBox(size, 'minf', vmhd, dinf, stbl);
      }
    }, {
      key: 'vmhd',
      value: function vmhd() {
        return Fmp4.initBox(20, 'vmhd', new Uint8Array([0x00, // version
        0x00, 0x00, 0x01, // flags
        0x00, 0x00, // graphicsmode
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00 // opcolor
        ]));
      }
    }, {
      key: 'smhd',
      value: function smhd() {
        return Fmp4.initBox(16, 'smhd', new Uint8Array([0x00, // version
        0x00, 0x00, 0x00, // flags
        0x00, 0x00, // balance
        0x00, 0x00 // reserved
        ]));
      }
    }, {
      key: 'dinf',
      value: function dinf() {
        var buffer = new Buffer();
        var dref = [0x00, // version 0
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
    }, {
      key: 'stbl',
      value: function stbl(data) {
        var size = 8;
        var stsd = Fmp4.stsd(data);
        var stts = Fmp4.stts();
        var stsc = Fmp4.stsc();
        var stsz = Fmp4.stsz();
        var stco = Fmp4.stco();
        [stsd, stts, stsc, stsz, stco].forEach(function (item) {
          size += item.byteLength;
        });
        return Fmp4.initBox(size, 'stbl', stsd, stts, stsc, stsz, stco);
      }
    }, {
      key: 'stsd',
      value: function stsd(data) {
        var content = void 0;
        if (data.type === 'audio') {
          // if (!data.isAAC && data.codec === 'mp4') {
          //     content = FMP4.mp3(data);
          // } else {
          //
          // }

          // 支持mp4a
          content = Fmp4.mp4a(data);
        } else {
          if (data.streamType === 0x24) {
            content = Fmp4.hvc1(data);
          } else {
            content = Fmp4.avc1(data);
          }
        }
        return Fmp4.initBox(16 + content.byteLength, 'stsd', Fmp4.extension(0, 0), new Uint8Array([0x00, 0x00, 0x00, 0x01]), content);
      }
    }, {
      key: 'mp4a',
      value: function mp4a(data) {
        var content = new Uint8Array([0x00, 0x00, 0x00, // reserved
        0x00, 0x00, 0x00, // reserved
        0x00, 0x01, // data_reference_index
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
        0x00, data.channelCount, // channelcount
        0x00, 0x10, // sampleSize:16bits
        0x00, 0x00, 0x00, 0x00, // reserved2
        data.samplerate >> 8 & 0xff, data.samplerate & 0xff, //
        0x00, 0x00]);
        var esds = Fmp4.esds(data.config);
        return Fmp4.initBox(8 + content.byteLength + esds.byteLength, 'mp4a', content, esds);
      }
    }, {
      key: 'esds',
      value: function esds() {
        var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [43, 146, 8, 0];

        var configlen = config.length;
        var buffer = new Buffer();
        var content = new Uint8Array([0x00, // version 0
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
    }, {
      key: 'avc1',
      value: function avc1(data) {
        var buffer = new Buffer();
        var size = 40; // 8(avc1)+8(avcc)+8(btrt)+16(pasp)
        // let sps = data.sps
        // let pps = data.pps
        var width = data.width;
        var height = data.height;
        var hSpacing = data.parRatio.height;
        var vSpacing = data.parRatio.width;
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

        var avcc = data.avcc;
        var avc1 = new Uint8Array([0x00, 0x00, 0x00, // reserved
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
        var btrt = new Uint8Array([0x00, 0x1c, 0x9c, 0x80, // bufferSizeDB
        0x00, 0x2d, 0xc6, 0xc0, // maxBitrate
        0x00, 0x2d, 0xc6, 0xc0 // avgBitrate
        ]);
        var pasp = new Uint8Array([hSpacing >> 24, // hSpacing
        hSpacing >> 16 & 0xff, hSpacing >> 8 & 0xff, hSpacing & 0xff, vSpacing >> 24, // vSpacing
        vSpacing >> 16 & 0xff, vSpacing >> 8 & 0xff, vSpacing & 0xff]);

        buffer.write(Fmp4.size(size + avc1.byteLength + avcc.byteLength + btrt.byteLength), Fmp4.type('avc1'), avc1, Fmp4.size(8 + avcc.byteLength), Fmp4.type('avcC'), avcc, Fmp4.size(20), Fmp4.type('btrt'), btrt, Fmp4.size(16), Fmp4.type('pasp'), pasp);
        return buffer.buffer;
      }
    }, {
      key: 'hvc1',
      value: function hvc1(track) {
        var buffer = new Buffer();
        var content = new Uint8Array([0x00, 0x00, 0x00, // reserved
        0x00, 0x00, 0x00, // reserved
        0x00, 0x01, // data_reference_index
        0x00, 0x00, // pre_defined
        0x00, 0x00, // reserved
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // pre_defined
        track.width >> 8 & 0xFF, track.width & 0xff, // width
        track.height >> 8 & 0xFF, track.height & 0xff, // height
        0x00, 0x48, 0x00, 0x00, // horizresolution
        0x00, 0x48, 0x00, 0x00, // vertresolution
        0x00, 0x00, 0x00, 0x00, // reserved
        0x00, 0x01, // frame_count
        0x00, 0x00, 0x00, 0x00, 0x00, //dailymotion/hls.js
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // compressorname
        0x00, 0x18, // depth = 24
        0xFF, 0xFF, 0x00, 0x00, 0x00, 0x7A, 0x68, 0x76, 0x63, 0x43, 0x01, //configurationVersion
        0x01, //profile_space + tier_flag + profile_idc
        0x60, 0x00, 0x00, 0x00, //general_profile_compatibility
        0x90, 0x00, 0x00, 0x00, 0x00, 0x00, //constraint_indicator_flags
        0x5D, //level_idc=90
        0xF0, 0x00, 0xFC, 0xFD, //profile_compatibility_indications
        0xF8, //‘11111’b + bitDepthLumaMinus8
        0xF8, //‘11111’b + bitDepthChromaMinus8
        0x00, 0x00, //avgFrameRate
        0x0F, //constantFrameRate + numTemporalLayers + ‘1’b + lengthSizeMinusOne
        0x03, //numOfArrays

        //vps
        0xA0, 0x00, 0x01, //array_completeness + ‘0’b + NAL_unit_type + numNalus
        0x00, 0x18, //nalUnitLength
        0x40, 0x01, 0x0C, 0x01, 0xFF, 0xFF, 0x01, 0x60, 0x00, 0x00, 0x03, 0x00, 0x90, 0x00, 0x00, 0x03, 0x00, 0x00, 0x03, 0x00, 0x5D, 0x99, 0x98, 0x09,

        //sps
        0xA1, 0x00, 0x01, //array_completeness + ‘0’b + NAL_unit_type + numNalus
        0x00, 0x2D, //nalUnitLength
        0x42, 0x01, 0x01, 0x01, 0x60, 0x00, 0x00, 0x03, 0x00, 0x90, 0x00, 0x00, 0x03, 0x00, 0x00, 0x03, 0x00, 0x5D, 0xA0, 0x02, 0x80, 0x80, 0x2D, 0x16, 0x59, 0x99, 0xA4, 0x93, 0x2B, 0x9A, 0x80, 0x80, 0x80, 0x82, 0x00, 0x00, 0x03, 0x00, 0x02, 0x00, 0x00, 0x03, 0x00, 0x32, 0x10,

        //pps
        0xA2, 0x00, 0x01, //array_completeness + ‘0’b + NAL_unit_type + numNalus
        0x00, 0x07, //nalUnitLength
        0x44, 0x01, 0xC1, 0x72, 0xB4, 0x62, 0x40]);
        buffer.write(Fmp4.size(8 + content.byteLength + 10), Fmp4.type('hvc1'), content, Fmp4.size(10), Fmp4.type('fiel'), new Uint8Array([0x01, 0x00]));
        return buffer.buffer;
      }
    }, {
      key: 'stts',
      value: function stts() {
        var content = new Uint8Array([0x00, // version
        0x00, 0x00, 0x00, // flags
        0x00, 0x00, 0x00, 0x00 // entry_count
        ]);
        return Fmp4.initBox(16, 'stts', content);
      }
    }, {
      key: 'stsc',
      value: function stsc() {
        var content = new Uint8Array([0x00, // version
        0x00, 0x00, 0x00, // flags
        0x00, 0x00, 0x00, 0x00 // entry_count
        ]);
        return Fmp4.initBox(16, 'stsc', content);
      }
    }, {
      key: 'stco',
      value: function stco() {
        var content = new Uint8Array([0x00, // version
        0x00, 0x00, 0x00, // flags
        0x00, 0x00, 0x00, 0x00 // entry_count
        ]);
        return Fmp4.initBox(16, 'stco', content);
      }
    }, {
      key: 'stsz',
      value: function stsz() {
        var content = new Uint8Array([0x00, // version
        0x00, 0x00, 0x00, // flags
        0x00, 0x00, 0x00, 0x00, // sample_size
        0x00, 0x00, 0x00, 0x00 // sample_count
        ]);
        return Fmp4.initBox(20, 'stsz', content);
      }
    }, {
      key: 'mvex',
      value: function mvex(duration) {
        var trackID = arguments[2];

        var buffer = new Buffer();
        var mehd = Buffer.writeUint32(duration);
        buffer.write(Fmp4.size(56), Fmp4.type('mvex'), Fmp4.size(16), Fmp4.type('mehd'), Fmp4.extension(0, 0), mehd, Fmp4.trex(trackID));
        return buffer.buffer;
      }
    }, {
      key: 'trex',
      value: function trex(id) {
        var content = new Uint8Array([0x00, // version 0
        0x00, 0x00, 0x00, // flags
        id >> 24, id >> 16 & 0xff, id >> 8 & 0xff, id & 0xff, // track_ID
        0x00, 0x00, 0x00, 0x01, // default_sample_description_index
        0x00, 0x00, 0x00, 0x00, // default_sample_duration
        0x00, 0x00, 0x00, 0x00, // default_sample_size
        0x00, 0x01, 0x00, 0x01 // default_sample_flags
        ]);
        return Fmp4.initBox(8 + content.byteLength, 'trex', content);
      }
    }, {
      key: 'moof',
      value: function moof(data) {
        var size = 8;
        var mfhd = Fmp4.mfhd();
        var traf = Fmp4.traf(data);
        [mfhd, traf].forEach(function (item) {
          size += item.byteLength;
        });
        return Fmp4.initBox(size, 'moof', mfhd, traf);
      }
    }, {
      key: 'mfhd',
      value: function mfhd() {
        var content = Buffer.writeUint32(Fmp4.sequence);
        Fmp4.sequence += 1;
        return Fmp4.initBox(16, 'mfhd', Fmp4.extension(0, 0), content);
      }
    }, {
      key: 'traf',
      value: function traf(data) {
        var size = 8;
        var tfhd = Fmp4.tfhd(data.id);
        var tfdt = Fmp4.tfdt(data.time);
        var sdtp = Fmp4.sdtp(data);
        var trun = Fmp4.trun(data, sdtp.byteLength);

        [tfhd, tfdt, trun, sdtp].forEach(function (item) {
          size += item.byteLength;
        });
        return Fmp4.initBox(size, 'traf', tfhd, tfdt, trun, sdtp);
      }
    }, {
      key: 'tfhd',
      value: function tfhd(id) {
        var content = Buffer.writeUint32(id);
        return Fmp4.initBox(16, 'tfhd', Fmp4.extension(0, 0), content);
      }
    }, {
      key: 'tfdt',
      value: function tfdt(time) {
        // let upper = Math.floor(time / (UINT32_MAX + 1)),
        //     lower = Math.floor(time % (UINT32_MAX + 1));
        return Fmp4.initBox(16, 'tfdt', Fmp4.extension(0, 0), Buffer.writeUint32(time));
      }
    }, {
      key: 'trun',
      value: function trun(data, sdtpLength) {
        // let id = data.id;
        // let ceil = id === 1 ? 16 : 12;
        var buffer = new Buffer();
        var sampleCount = Buffer.writeUint32(data.samples.length);
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
        var offset = Buffer.writeUint32(8 + 8 + 16 + 8 + 16 + 16 + 12 + 4 + 4 + 16 * data.samples.length + sdtpLength);
        buffer.write(Fmp4.size(20 + 16 * data.samples.length), Fmp4.type('trun'), new Uint8Array([0x00, 0x00, 0x0F, 0x01]), sampleCount, offset);

        // let size = buffer.buffer.byteLength
        // let writeOffset = 0
        // data.samples.forEach(() => {
        //   size += 16
        // })
        //
        // let trunBox = new Uint8Array(size)

        // trunBox.set(buffer.buffer, 0)

        data.samples.forEach(function (item) {
          var flags = item.flags;
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
    }, {
      key: 'sdtp',
      value: function sdtp(data) {
        var buffer = new Buffer();
        buffer.write(Fmp4.size(12 + data.samples.length), Fmp4.type('sdtp'), Fmp4.extension(0, 0));
        data.samples.forEach(function (item) {
          var flags = item.flags;
          var num = flags.isLeading << 6 | // is_leading: 2 (bit)
          flags.dependsOn << 4 | // sample_depends_on
          flags.isDependedOn << 2 | // sample_is_depended_on
          flags.hasRedundancy; // sample_has_redundancy

          buffer.write(new Uint8Array([num]));
        });
        return buffer.buffer;
      }
    }, {
      key: 'mdat',
      value: function mdat(data) {
        var buffer = new Buffer();
        var size = 8;
        data.samples.forEach(function (item) {
          size += item.size;
        });
        buffer.write(Fmp4.size(size), Fmp4.type('mdat'));
        var mdatBox = new Uint8Array(size);
        var offset = 0;
        mdatBox.set(buffer.buffer, offset);
        offset += 8;
        data.samples.forEach(function (item) {
          item.buffer.forEach(function (unit) {
            mdatBox.set(unit, offset);
            offset += unit.byteLength;
            // buffer.write(unit.data);
          });
        });
        return mdatBox;
      }
    }]);

    return Fmp4;
  }();

  Fmp4.type = function (name) {
    return new Uint8Array([name.charCodeAt(0), name.charCodeAt(1), name.charCodeAt(2), name.charCodeAt(3)]);
  };
  Fmp4.sequence = 1;

  var _createClass$d = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$d(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var REMUX_EVENTS$2 = EVENTS.REMUX_EVENTS;
  var PLAYER_EVENTS$1 = EVENTS.PLAYER_EVENTS;

  var Mp4Remuxer = function () {
    function Mp4Remuxer() {
      var curTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      _classCallCheck$d(this, Mp4Remuxer);

      this._dtsBase = curTime * 1000;
      this._audioDtsBase = null;
      this._videoDtsBase = null;
      this._isDtsBaseInited = false;
      var browser = sniffer.browser;

      this._fillSilenceFrame = browser === 'ie';

      this.isFirstVideo = true;
      this.isFirstAudio = true;

      this.videoAllDuration = 0;
      this.audioAllDuration = 0;
    }

    _createClass$d(Mp4Remuxer, [{
      key: 'init',
      value: function init() {
        this.on(REMUX_EVENTS$2.REMUX_MEDIA, this.remux.bind(this));
        this.on(REMUX_EVENTS$2.REMUX_METADATA, this.onMetaDataReady.bind(this));
        this.on(REMUX_EVENTS$2.DETECT_CHANGE_STREAM, this.resetDtsBase.bind(this));
        this.on(PLAYER_EVENTS$1.SEEK, this.seek.bind(this));
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this._dtsBase = -1;
        this._isDtsBaseInited = false;
      }
    }, {
      key: 'remux',
      value: function remux() {
        var _context$getInstance = this._context.getInstance('TRACKS'),
            audioTrack = _context$getInstance.audioTrack,
            videoTrack = _context$getInstance.videoTrack;

        !this._isDtsBaseInited && this.calcDtsBase(audioTrack, videoTrack);

        this._remuxVideo(videoTrack);
        this._remuxAudio(audioTrack);
      }
    }, {
      key: 'resetDtsBase',
      value: function resetDtsBase() {
        // for hls 中途切换 meta后seek
        this._dtsBase = 0;
        // this._isDtsBaseInited = false
      }
    }, {
      key: 'seek',
      value: function seek(time) {
        if (!this._isDtsBaseInited) {
          this._dtsBase = time * 1000;
        } else {
          this._isDtsBaseInited = false;
          this._dtsBase = time * 1000;
        }

        this._audioDtsBase = this._videoDtsBase = null;
      }
    }, {
      key: 'onMetaDataReady',
      value: function onMetaDataReady(type) {
        var track = void 0;

        if (type === 'audio') {
          var _context$getInstance2 = this._context.getInstance('TRACKS'),
              audioTrack = _context$getInstance2.audioTrack;

          track = audioTrack;
        } else {
          var _context$getInstance3 = this._context.getInstance('TRACKS'),
              videoTrack = _context$getInstance3.videoTrack;

          track = videoTrack;
        }

        var presourcebuffer = this._context.getInstance('PRE_SOURCE_BUFFER');
        var source = presourcebuffer.getSource(type);
        if (!source) {
          source = presourcebuffer.createSource(type);
        }

        source.mimetype = track.meta.codec;
        source.init = this.remuxInitSegment(type, track.meta);
        // source.inited = false;

        // this.resetDtsBase()
        this.emit(REMUX_EVENTS$2.INIT_SEGMENT, type);
      }
    }, {
      key: 'remuxInitSegment',
      value: function remuxInitSegment(type, meta) {
        var initSegment = new Buffer();
        var ftyp = meta.streamType === 0x24 ? Fmp4.ftypHEVC() : Fmp4.ftyp();
        var moov = Fmp4.moov({ type: type, meta: meta });

        initSegment.write(ftyp, moov);
        return initSegment;
      }
    }, {
      key: 'calcDtsBase',
      value: function calcDtsBase(audioTrack, videoTrack) {
        if (!audioTrack && videoTrack.samples.length) {
          return videoTrack.samples[0].dts;
        }

        if (!audioTrack.samples.length && !videoTrack.samples.length) {
          return;
        }

        var audioBase = Infinity;
        var videoBase = Infinity;

        if (audioTrack.samples && audioTrack.samples.length) {
          audioBase = audioTrack.samples[0].dts;
        }
        if (videoTrack.samples && videoTrack.samples.length) {
          videoBase = videoTrack.samples[0].dts;
        }

        this._dtsBase = Math.min(audioBase, videoBase) - this._dtsBase;
        this._videoDtsBase = this._dtsBase;
        this._audioDtsBase = this._dtsBase;
        this._isDtsBaseInited = true;
      }
    }, {
      key: '_remuxVideo',
      value: function _remuxVideo(videoTrack) {
        var track = videoTrack || {};

        if (!videoTrack.samples || !videoTrack.samples.length) {
          return;
        }

        var samples = track.samples;

        var firstDts = -1;

        var initSegment = null;
        var mp4Samples = [];
        var mdatBox = {
          samples: []
        };

        var maxLoop = 10000;
        while (samples.length && maxLoop-- > 0) {
          var avcSample = samples.shift();

          var isKeyframe = avcSample.isKeyframe,
              options = avcSample.options;

          if (!this.isFirstVideo && options && options.meta) {
            initSegment = this.remuxInitSegment('video', options.meta);
            options.meta = null;
            samples.unshift(avcSample);
            if (!options.isContinue) {
              this._videoDtsBase = 0;
            }
            break;
          }

          var dts = avcSample.dts - this.videoDtsBase;
          if (firstDts === -1) {
            firstDts = dts;
          }

          var cts = void 0;
          var pts = void 0;
          if (avcSample.pts !== undefined) {
            pts = avcSample.pts - this._dtsBase;
            cts = pts - dts;
          }
          if (avcSample.cts !== undefined) {
            pts = avcSample.cts + dts;
            cts = avcSample.cts;
          }

          var mdatSample = {
            buffer: [],
            size: 0
          };

          var sampleDuration = 0;
          if (avcSample.duration) {
            sampleDuration = avcSample.duration;
          } else if (samples.length >= 1) {
            var nextDts = samples[0].dts - this.videoDtsBase;
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
          // console.log(`video dts ${dts}`, `pts ${pts}`, isKeyframe, `duration ${sampleDuration}`)
          if (sampleDuration >= 0) {
            mdatBox.samples.push(mdatSample);
            mdatSample.buffer.push(avcSample.data);
            mdatSample.size += avcSample.data.byteLength;

            mp4Samples.push({
              dts: dts,
              cts: cts,
              pts: pts,
              data: avcSample.data,
              size: avcSample.data.byteLength,
              isKeyframe: isKeyframe,
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

          if (isKeyframe) {
            this.emit(REMUX_EVENTS$2.RANDOM_ACCESS_POINT, pts);
          }
        }

        var moofMdat = new Buffer();
        if (mp4Samples.length) {
          var moof = Fmp4.moof({
            id: track.meta.id,
            time: firstDts,
            samples: mp4Samples
          });
          var mdat = Fmp4.mdat(mdatBox);
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
        this.emit(REMUX_EVENTS$2.MEDIA_SEGMENT, 'video');

        track.samples = [];
        track.length = 0;
      }
    }, {
      key: '_remuxAudio',
      value: function _remuxAudio(track) {
        var _ref = track || {},
            samples = _ref.samples;

        var firstDts = -1;
        var mp4Samples = [];

        var initSegment = null;
        var mdatBox = {
          samples: []
        };
        if (!samples || !samples.length) {
          return;
        }

        var maxLoop = 10000;
        var isFirstDtsInited = false;
        while (samples.length && maxLoop-- > 0) {
          var sample = samples.shift();
          var data = sample.data,
              options = sample.options;

          if (!this.isFirstAudio && options && options.meta) {
            initSegment = this.remuxInitSegment('audio', options.meta);
            options.meta = null;
            samples.unshift(sample);
            if (!options.isContinue) {
              this._audioDtsBase = 0;
            }
            break;
          }

          var dts = sample.dts - this.audioDtsBase;
          var originDts = sample.originDts;
          if (!isFirstDtsInited) {
            firstDts = dts;
            isFirstDtsInited = true;
          }

          var sampleDuration = 0;
          if (sample.duration) {
            sampleDuration = sample.duration;
          } else if (this.audioMeta.refSampleDurationFixed) {
            sampleDuration = this.audioMeta.refSampleDurationFixed;
          } else if (samples.length >= 1) {
            var nextDts = samples[0].dts - this.audioDtsBase;
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
          // console.log(`audio dts ${dts}`, `pts ${dts}`, `originDts ${originDts}`, `duration ${sampleDuration}`)
          this.audioAllDuration += sampleDuration;
          var mp4Sample = {
            dts: dts,
            pts: dts,
            cts: 0,
            size: data.byteLength,
            duration: sample.duration ? sample.duration : sampleDuration,
            flags: {
              isLeading: 0,
              dependsOn: 1,
              isDependedOn: 0,
              hasRedundancy: 0,
              isNonSync: 0
            },
            isKeyframe: true,
            originDts: originDts,
            type: 'audio'
          };

          var mdatSample = {
            buffer: [],
            size: 0
          };

          if (sampleDuration >= 0) {
            mdatSample.buffer.push(data);
            mdatSample.size += data.byteLength;

            mdatBox.samples.push(mdatSample);
            mp4Samples.push(mp4Sample);
          }
        }

        var moofMdat = new Buffer();

        if (mp4Samples.length) {
          var moof = Fmp4.moof({
            id: track.meta.id,
            time: firstDts,
            samples: mp4Samples
          });
          var mdat = Fmp4.mdat(mdatBox);
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
        this.emit(REMUX_EVENTS$2.MEDIA_SEGMENT, 'audio', moofMdat);

        track.samples = [];
        track.length = 0;
      }
    }, {
      key: 'writeToSource',
      value: function writeToSource(type, buffer) {
        var presourcebuffer = this._context.getInstance('PRE_SOURCE_BUFFER');
        var source = presourcebuffer.getSource(type);
        if (!source) {
          source = presourcebuffer.createSource(type);
        }
        source.data.push(buffer);
      }
    }, {
      key: 'initSilentAudio',
      value: function initSilentAudio(dts, duration) {
        var unit = Mp4Remuxer.getSilentFrame(this._audioMeta.channelCount);
        return {
          dts: dts,
          pts: dts,
          cts: 0,
          duration: duration,
          unit: unit,
          size: unit.byteLength,
          originDts: dts,
          type: 'video'
        };
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this._player = null;
      }
    }, {
      key: 'videoMeta',
      get: function get() {
        return this._context.getInstance('TRACKS').videoTrack.meta;
      }
    }, {
      key: 'audioMeta',
      get: function get() {
        return this._context.getInstance('TRACKS').audioTrack.meta;
      }
    }, {
      key: 'videoDtsBase',
      get: function get() {
        if (this._videoDtsBase !== null) {
          return this._videoDtsBase;
        }
        return this._dtsBase;
      }
    }, {
      key: 'audioDtsBase',
      get: function get() {
        if (this._audioDtsBase !== null) {
          return this._audioDtsBase;
        }
        return this._dtsBase;
      }
    }], [{
      key: 'getSilentFrame',
      value: function getSilentFrame(channelCount) {
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
    }]);

    return Mp4Remuxer;
  }();

  var _createClass$e = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$e(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var CRYTO_EVENTS$1 = EVENTS.CRYTO_EVENTS;

  var Crypto = function () {
    function Crypto(config) {
      _classCallCheck$e(this, Crypto);

      this.inputBuffer = config.inputbuffer;
      this.outputBuffer = config.outputbuffer;
      this.key = config.key;
      this.iv = config.iv;
      this.method = config.method;

      this.crypto = window.crypto || window.msCrypto;
    }

    _createClass$e(Crypto, [{
      key: 'init',
      value: function init() {
        this.on(CRYTO_EVENTS$1.START_DECRYPT, this.decript.bind(this));
      }
    }, {
      key: 'decript',
      value: function decript() {
        var _this = this;

        if (!this.aeskey) {
          var sbkey = this.crypto.subtle.importKey('raw', this.key.buffer, { name: 'AES-CBC' }, false, ['encrypt', 'decrypt']);
          sbkey.then(function (key) {
            _this.aeskey = key;
            _this.decriptData();
          });
        } else {
          this.decriptData();
        }
      }
    }, {
      key: 'decriptData',
      value: function decriptData() {
        var _this2 = this;

        var inputbuffer = this._context.getInstance(this.inputBuffer);
        var outputbuffer = this._context.getInstance(this.outputBuffer);
        var data = inputbuffer.shift();
        if (data) {
          this.crypto.subtle.decrypt({ name: 'AES-CBC', iv: this.iv.buffer }, this.aeskey, data).then(function (res) {
            outputbuffer.push(new Uint8Array(res));
            _this2.emit(CRYTO_EVENTS$1.DECRYPTED);
            _this2.decriptData(data);
          });
        }
      }
    }]);

    return Crypto;
  }();

  var _createClass$f = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$f(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  /**
   * Reference: https://tools.ietf.org/html/rfc8216#section-4.3
   */
  var M3U8Parser = function () {
    function M3U8Parser() {
      _classCallCheck$f(this, M3U8Parser);
    }

    _createClass$f(M3U8Parser, null, [{
      key: 'parse',
      value: function parse(text) {
        var baseurl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        var ret = {
          duration: 0
        };
        if (!text || !text.split) {
          return;
        }
        var refs = text.split(/\r|\n/);
        refs = refs.filter(function (ref) {
          return ref;
        });
        var ref = refs.shift();
        if (!ref.match('#EXTM3U')) {
          throw new Error('Invalid m3u8 file: not "#EXTM3U"');
        }
        ref = refs.shift();
        var nextDiscontinue = false;
        while (ref) {
          var refm = ref.match(/#(.[A-Z|-]*):(.*)/);
          var refd = ref.match(/#(.[A-Z|-]*)/);
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
            }
          }if (refd && refd.length > 1) {
            switch (refd[1]) {
              case 'EXT-X-DISCONTINUITY':
                nextDiscontinue = true;
                break;
            }
          }
          ref = refs.shift();
        }
        return ret;
      }
    }, {
      key: 'parseFrag',
      value: function parseFrag(refm, refs, ret, baseurl, discontinue) {
        if (!ret.frags) {
          ret.frags = [];
        }

        var freg = {
          start: ret.duration,
          duration: parseFloat(refm[2]) * 1000
        };

        ret.duration += freg.duration;
        var nextline = refs.shift();
        if (nextline.match(/#(.*):(.*)/) || nextline.match(/^#/)) {
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
    }, {
      key: 'parseURL',
      value: function parseURL(url) {
        var baseurl = '';
        var urls = url.match(/(.*\/).*\.m3u8/);
        if (urls && urls.length > 0) {
          for (var i = 0; i < urls.length; i++) {
            if (urls[i].match(/.*\/$/g) && urls[i].length > baseurl.length) {
              baseurl = urls[i];
            }
          }
        }
        return baseurl;
      }
    }, {
      key: 'parseDecrypt',
      value: function parseDecrypt(refm, ret) {
        ret.encrypt = {};
        var refs = refm.split(',');
        for (var i in refs) {
          var cmd = refs[i];
          if (cmd.match(/METHOD=(.*)/)) {
            ret.encrypt.method = cmd.match(/METHOD=(.*)/)[1];
          }
          if (cmd.match(/URI="(.*)"/)) {
            ret.encrypt.uri = cmd.match(/URI="(.*)"/)[1];
          }

          if (cmd.match(/IV=0x(.*)/)) {
            var iv = cmd.match(/IV=0x(.*)/)[1];
            var length = Math.ceil(iv.length / 2);
            ret.encrypt.ivb = new Uint8Array(length);
            for (var _i = length - 1; _i >= 0; _i--) {
              var im = parseInt(iv.substr(_i * 2, 2), 16);
              ret.encrypt.ivb[_i] = im;
            }
            ret.encrypt.iv = iv;
          }
        }    }
    }]);

    return M3U8Parser;
  }();

  var _createClass$g = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$g(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Stream = function () {
    function Stream(buffer) {
      _classCallCheck$g(this, Stream);

      if (buffer instanceof ArrayBuffer) {
        this.buffer = buffer;
        this.dataview = new DataView(buffer);
        this.dataview.position = 0;
      } else {
        throw new Error('data is invalid');
      }
    }

    _createClass$g(Stream, [{
      key: 'back',
      value: function back(count) {
        this.position -= count;
      }
    }, {
      key: 'skip',
      value: function skip(count) {
        var loop = Math.floor(count / 4);
        var last = count % 4;
        for (var i = 0; i < loop; i++) {
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

    }, {
      key: 'readUint8',
      value: function readUint8() {
        return Stream.readByte(this.dataview, 1);
      }
    }, {
      key: 'readUint16',
      value: function readUint16() {
        return Stream.readByte(this.dataview, 2);
      }
    }, {
      key: 'readUint24',
      value: function readUint24() {
        return Stream.readByte(this.dataview, 3);
      }
    }, {
      key: 'readUint32',
      value: function readUint32() {
        return Stream.readByte(this.dataview, 4);
      }
    }, {
      key: 'readUint64',
      value: function readUint64() {
        return Stream.readByte(this.dataview, 8);
      }
    }, {
      key: 'readInt8',
      value: function readInt8() {
        return Stream.readByte(this.dataview, 1, true);
      }
    }, {
      key: 'readInt16',
      value: function readInt16() {
        return Stream.readByte(this.dataview, 2, true);
      }
    }, {
      key: 'readInt32',
      value: function readInt32() {
        return Stream.readByte(this.dataview, 4, true);
      }
    }, {
      key: 'writeUint32',
      value: function writeUint32(value) {
        return new Uint8Array([value >>> 24 & 0xff, value >>> 16 & 0xff, value >>> 8 & 0xff, value & 0xff]);
      }
    }, {
      key: 'length',
      get: function get() {
        return this.buffer.byteLength;
      }
    }, {
      key: 'position',
      set: function set(value) {
        this.dataview.position = value;
      },
      get: function get() {
        return this.dataview.position;
      }
    }], [{
      key: 'readByte',
      value: function readByte(buffer, size, sign) {
        var res = void 0;
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
    }]);

    return Stream;
  }();

  var _createClass$h = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$h(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Golomb = function () {
    function Golomb(uint8array) {
      _classCallCheck$h(this, Golomb);

      this.TAG = 'Golomb';
      this._buffer = uint8array;
      this._bufferIndex = 0;
      this._totalBytes = uint8array.byteLength;
      this._totalBits = uint8array.byteLength * 8;
      this._currentWord = 0;
      this._currentWordBitsLeft = 0;
    }

    _createClass$h(Golomb, [{
      key: 'destroy',
      value: function destroy() {
        this._buffer = null;
      }
    }, {
      key: '_fillCurrentWord',
      value: function _fillCurrentWord() {
        var bufferBytesLeft = this._totalBytes - this._bufferIndex;

        var bytesRead = Math.min(4, bufferBytesLeft);
        var word = new Uint8Array(4);
        word.set(this._buffer.subarray(this._bufferIndex, this._bufferIndex + bytesRead));
        this._currentWord = new DataView(word.buffer).getUint32(0);

        this._bufferIndex += bytesRead;
        this._currentWordBitsLeft = bytesRead * 8;
      }
    }, {
      key: 'readBits',
      value: function readBits(size) {
        var bits = Math.min(this._currentWordBitsLeft, size); // :uint
        var valu = this._currentWord >>> 32 - bits;
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
    }, {
      key: 'readBool',
      value: function readBool() {
        return this.readBits(1) === 1;
      }
    }, {
      key: 'readByte',
      value: function readByte() {
        return this.readBits(8);
      }
    }, {
      key: '_skipLeadingZero',
      value: function _skipLeadingZero() {
        var zeroCount = void 0;
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
    }, {
      key: 'readUEG',
      value: function readUEG() {
        // unsigned exponential golomb
        var leadingZeros = this._skipLeadingZero();
        return this.readBits(leadingZeros + 1) - 1;
      }
    }, {
      key: 'readSEG',
      value: function readSEG() {
        // signed exponential golomb
        var value = this.readUEG();
        if (value & 0x01) {
          return value + 1 >>> 1;
        } else {
          return -1 * (value >>> 1);
        }
      }
    }]);

    return Golomb;
  }();

  var _createClass$i = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$i(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var SPSParser = function () {
    function SPSParser() {
      _classCallCheck$i(this, SPSParser);
    }

    _createClass$i(SPSParser, null, [{
      key: '_ebsp2rbsp',
      value: function _ebsp2rbsp(uint8array) {
        var src = uint8array;
        var srcLength = src.byteLength;
        var dst = new Uint8Array(srcLength);
        var dstIdx = 0;

        for (var i = 0; i < srcLength; i++) {
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
    }, {
      key: 'parseSPS',
      value: function parseSPS(uint8array) {
        var rbsp = SPSParser._ebsp2rbsp(uint8array);
        var gb = new Golomb(rbsp);

        gb.readByte();
        var profileIdc = gb.readByte();
        gb.readByte();
        var levelIdc = gb.readByte();
        gb.readUEG();

        var profile_string = SPSParser.getProfileString(profileIdc);
        var level_string = SPSParser.getLevelString(levelIdc);
        var chroma_format_idc = 1;
        var chroma_format = 420;
        var chroma_format_table = [0, 420, 422, 444];
        var bit_depth = 8;

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
            var scaling_list_count = chroma_format_idc !== 3 ? 8 : 12;
            for (var i = 0; i < scaling_list_count; i++) {
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
        var pic_order_cnt_type = gb.readUEG();
        if (pic_order_cnt_type === 0) {
          gb.readUEG();
        } else if (pic_order_cnt_type === 1) {
          gb.readBits(1);
          gb.readSEG();
          gb.readSEG();
          var num_ref_frames_in_pic_order_cnt_cycle = gb.readUEG();
          for (var _i = 0; _i < num_ref_frames_in_pic_order_cnt_cycle; _i++) {
            gb.readSEG();
          }
        }
        gb.readUEG();
        gb.readBits(1);

        var pic_width_in_mbs_minus1 = gb.readUEG();
        var pic_height_in_map_units_minus1 = gb.readUEG();

        var frame_mbs_only_flag = gb.readBits(1);
        if (frame_mbs_only_flag === 0) {
          gb.readBits(1);
        }
        gb.readBits(1);

        var frame_crop_left_offset = 0;
        var frame_crop_right_offset = 0;
        var frame_crop_top_offset = 0;
        var frame_crop_bottom_offset = 0;

        var frame_cropping_flag = gb.readBool();
        if (frame_cropping_flag) {
          frame_crop_left_offset = gb.readUEG();
          frame_crop_right_offset = gb.readUEG();
          frame_crop_top_offset = gb.readUEG();
          frame_crop_bottom_offset = gb.readUEG();
        }

        var par_width = 1,
            par_height = 1;
        var fps = 0,
            fps_fixed = true,
            fps_num = 0,
            fps_den = 0;

        var vui_parameters_present_flag = gb.readBool();
        if (vui_parameters_present_flag) {
          if (gb.readBool()) {
            // aspect_ratio_info_present_flag
            var aspect_ratio_idc = gb.readByte();
            var par_w_table = [1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2];
            var par_h_table = [1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1];

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
            var num_units_in_tick = gb.readBits(32);
            var time_scale = gb.readBits(32);
            fps_fixed = gb.readBool();

            fps_num = time_scale;
            fps_den = num_units_in_tick * 2;
            fps = fps_num / fps_den;
          }
        }

        var parScale = 1;
        if (par_width !== 1 || par_height !== 1) {
          parScale = par_width / par_height;
        }

        var crop_unit_x = 0,
            crop_unit_y = 0;
        if (chroma_format_idc === 0) {
          crop_unit_x = 1;
          crop_unit_y = 2 - frame_mbs_only_flag;
        } else {
          var sub_wc = chroma_format_idc === 3 ? 1 : 2;
          var sub_hc = chroma_format_idc === 1 ? 2 : 1;
          crop_unit_x = sub_wc;
          crop_unit_y = sub_hc * (2 - frame_mbs_only_flag);
        }

        var codec_width = (pic_width_in_mbs_minus1 + 1) * 16;
        var codec_height = (2 - frame_mbs_only_flag) * ((pic_height_in_map_units_minus1 + 1) * 16);

        codec_width -= (frame_crop_left_offset + frame_crop_right_offset) * crop_unit_x;
        codec_height -= (frame_crop_top_offset + frame_crop_bottom_offset) * crop_unit_y;

        var present_width = Math.ceil(codec_width * parScale);

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
    }, {
      key: '_skipScalingList',
      value: function _skipScalingList(gb, count) {
        var lastScale = 8;
        var nextScale = 8;
        var deltaScale = 0;
        for (var i = 0; i < count; i++) {
          if (nextScale !== 0) {
            deltaScale = gb.readSEG();
            nextScale = (lastScale + deltaScale + 256) % 256;
          }
          lastScale = nextScale === 0 ? lastScale : nextScale;
        }
      }
    }, {
      key: 'getProfileString',
      value: function getProfileString(profileIdc) {
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
    }, {
      key: 'getLevelString',
      value: function getLevelString(levelIdc) {
        return (levelIdc / 10).toFixed(1);
      }
    }, {
      key: 'getChromaFormatString',
      value: function getChromaFormatString(chroma) {
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
    }, {
      key: 'toVideoMeta',
      value: function toVideoMeta(spsConfig) {
        var meta = {};
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

        var fpsDen = meta.frameRate.fps_den;
        var fpsNum = meta.frameRate.fps_num;
        meta.refSampleDuration = Math.floor(meta.timescale * (fpsDen / fpsNum));
        return meta;
      }
    }]);

    return SPSParser;
  }();

  var _createClass$j = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$j(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var RBSP = function () {
    function RBSP() {
      _classCallCheck$j(this, RBSP);
    }

    _createClass$j(RBSP, null, [{
      key: "EBSP2RBSP",

      /**
       * convert EBSP to RBSP
       * @param data {Uint8Array}
       * @returns {Uint8Array}
       * @constructor
       */
      value: function EBSP2RBSP(data) {
        return data.filter(function (el, idx) {
          if (idx < 2) {
            return true;
          } else {
            return !(data[idx - 2] === 0 && data[idx - 1] === 0 && el === 3);
          }
        });
      }

      /**
       * @param data {Uint8Array}
       * @constructor
       */

    }, {
      key: "EBSP2SODB",
      value: function EBSP2SODB(data) {
        var lastByte = data[data.byteLength - 1];
        if (lastByte && lastByte === 128) {
          return data.slice(0, data.byteLength - 1);
        }

        return data;
      }
    }]);

    return RBSP;
  }();

  var _createClass$k = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$k(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var u8aToString = function u8aToString(data) {
    var result = '';
    for (var i = 0; i < data.byteLength; i++) {
      result += String.fromCharCode(data[i]);
    }
    return result;
  };

  var SEIParser = function () {
    function SEIParser() {
      _classCallCheck$k(this, SEIParser);
    }

    _createClass$k(SEIParser, null, [{
      key: '_resolveNalu',
      value: function _resolveNalu(data) {
        if (data.length >= 1) {
          return RBSP.EBSP2SODB(RBSP.EBSP2RBSP(data.slice(1)));
        }
        return null;
      }
      /**
       *
       * @param data {Uint8Array}
       */

    }, {
      key: 'parse',
      value: function parse(data) {
        var sodb = SEIParser._resolveNalu(data);

        var _SEIParser$switchPayl = SEIParser.switchPayloadType(sodb),
            payloadType = _SEIParser$switchPayl.payloadType,
            offset = _SEIParser$switchPayl.offset;

        var content = sodb.slice(offset);

        switch (payloadType) {
          case 5:
            return SEIParser.user_data_unregistered(content);
          default:
            return {};
        }
      }

      /**
       *
       * @param data
       * @returns {{payloadType: number, offset: number}}
       */

    }, {
      key: 'switchPayloadType',
      value: function switchPayloadType(data) {
        var dv = new DataView(data.buffer);
        var payloadType = 0;
        var offset = 0;
        while (dv.getUint8(offset) === 255) {
          offset++;
          payloadType += 255;
        }
        payloadType += dv.getUint8(offset++);

        return {
          payloadType: payloadType,
          offset: offset
        };
      }

      /**
       *
       * @param data {Uint8Array}
       * @return {{ payloadLength: number, offset: number }}
       */

    }, {
      key: 'getPayloadLength',
      value: function getPayloadLength(data) {
        var dv = new DataView(data.buffer);

        var payloadLength = 0;
        var offset = 0;
        while (dv.getUint8(offset) === 255) {
          offset++;
          payloadLength += 255;
        }
        payloadLength += dv.getUint8(offset++);

        return {
          payloadLength: payloadLength,
          offset: offset
        };
      }

      /**
       * resolve 0x05 user data unregistered
       * @param data {Uint8Array}
       */
      // eslint-disable-next-line camelcase

    }, {
      key: 'user_data_unregistered',
      value: function user_data_unregistered(data) {
        var _SEIParser$getPayload = SEIParser.getPayloadLength(data),
            payloadLength = _SEIParser$getPayload.payloadLength,
            offset = _SEIParser$getPayload.offset;

        if (payloadLength < 16) {
          return {
            uuid: '',
            content: null
          };
        }
        var payload = data.slice(offset);

        var uuid = u8aToString(payload.slice(0, 16));
        var content = u8aToString(payload.slice(16, payloadLength));

        return {
          code: 5, // for user data unregistered
          uuid: uuid,
          content: content
        };
      }
    }]);

    return SEIParser;
  }();

  var _createClass$l = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$l(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Nalunit = function () {
    function Nalunit() {
      _classCallCheck$l(this, Nalunit);
    }

    _createClass$l(Nalunit, null, [{
      key: 'getNalunits',
      value: function getNalunits(buffer) {
        if (buffer.length - buffer.position < 4) {
          return [];
        }

        var buf = buffer.dataview;
        var position = buffer.position;
        if (buf.getInt32(position) === 1 || buf.getInt16(position) === 0 && buf.getInt8(position + 2) === 1) {
          return Nalunit.getAnnexbNals(buffer);
        } else {
          return Nalunit.getAvccNals(buffer);
        }
      }
    }, {
      key: 'getAnnexbNals',
      value: function getAnnexbNals(buffer) {
        var nals = [];
        var position = Nalunit.getHeaderPositionAnnexB(buffer);
        var start = position.pos;
        var end = start;
        while (start < buffer.length - 4) {
          var header = buffer.buffer.slice(start, start + position.headerLength);
          if (position.pos === buffer.position) {
            buffer.skip(position.headerLength);
          }
          position = Nalunit.getHeaderPositionAnnexB(buffer);
          end = position.pos;
          var body = new Uint8Array(buffer.buffer.slice(start + header.byteLength, end));
          var unit = { header: header, body: body };
          Nalunit.analyseNal(unit);
          if (unit.type <= 9 && unit.type !== 0) {
            nals.push(unit);
          }
          buffer.skip(end - buffer.position);
          start = end;
        }
        return nals;
      }
    }, {
      key: 'getAvccNals',
      value: function getAvccNals(buffer) {
        // buffer.buffer = RBSP.EBSP2RBSP(new Uint8Array(buffer.buffer)).buffer;
        // buffer.dataview = new DataView(buffer.buffer)
        // buffer.dataview.position = 0;
        var nals = [];
        while (buffer.position < buffer.length - 4) {
          var length = buffer.dataview.getInt32(buffer.dataview.position);
          if (buffer.length - buffer.position >= length) {
            var header = buffer.buffer.slice(buffer.position, buffer.position + 4);
            buffer.skip(4);
            var body = new Uint8Array(buffer.buffer.slice(buffer.position, buffer.position + length));
            buffer.skip(length);
            var unit = { header: header, body: body };
            Nalunit.analyseNal(unit);
            if (unit.type <= 9 && unit.type !== 0) {
              nals.push(unit);
            }
          } else {
            break;
          }
        }
        return nals;
      }
    }, {
      key: 'analyseNal',
      value: function analyseNal(unit) {
        var type = unit.body[0] & 0x1f;
        unit.type = type;
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
            unit.sei = SEIParser.parse(unit.body);
            break;
          case 7:
            // SPS
            unit.sps = SPSParser.parseSPS(unit.body);
            break;
          case 8:
            // PPS
            unit.pps = true;
            break;
        }
      }
    }, {
      key: 'getHeaderPositionAnnexB',
      value: function getHeaderPositionAnnexB(buffer) {
        // seperate
        var pos = buffer.position;
        var headerLength = 0;
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
        return { pos: pos, headerLength: headerLength };
      }
    }, {
      key: 'getAvcc',
      value: function getAvcc(sps, pps) {
        var ret = new Uint8Array(sps.byteLength + pps.byteLength + 11);
        ret[0] = 0x01;
        ret[1] = sps[1];
        ret[2] = sps[2];
        ret[3] = sps[3];
        ret[4] = 255;
        ret[5] = 225;

        var offset = 6;

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
    }]);

    return Nalunit;
  }();

  var NalUnit = Nalunit;

  var _createClass$m = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$m(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Golomb$1 = function () {
    function Golomb(uint8array) {
      _classCallCheck$m(this, Golomb);

      this.TAG = 'Golomb';
      this._buffer = uint8array;
      this._bufferIndex = 0;
      this._totalBytes = uint8array.byteLength;
      this._totalBits = uint8array.byteLength * 8;
      this._currentWord = 0;
      this._currentWordBitsLeft = 0;
    }

    _createClass$m(Golomb, [{
      key: 'destroy',
      value: function destroy() {
        this._buffer = null;
      }
    }, {
      key: '_fillCurrentWord',
      value: function _fillCurrentWord() {
        var bufferBytesLeft = this._totalBytes - this._bufferIndex;

        var bytesRead = Math.min(4, bufferBytesLeft);
        var word = new Uint8Array(4);
        word.set(this._buffer.subarray(this._bufferIndex, this._bufferIndex + bytesRead));
        this._currentWord = new DataView(word.buffer).getUint32(0);

        this._bufferIndex += bytesRead;
        this._currentWordBitsLeft = bytesRead * 8;
      }
    }, {
      key: 'readBits',
      value: function readBits(size) {
        var bits = Math.min(this._currentWordBitsLeft, size); // :uint
        var valu = this._currentWord >>> 32 - bits;
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
    }, {
      key: 'readBool',
      value: function readBool() {
        return this.readBits(1) === 1;
      }
    }, {
      key: 'readByte',
      value: function readByte() {
        return this.readBits(8);
      }
    }, {
      key: '_skipLeadingZero',
      value: function _skipLeadingZero() {
        var zeroCount = void 0;
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
    }, {
      key: 'readUEG',
      value: function readUEG() {
        // unsigned exponential golomb
        var leadingZeros = this._skipLeadingZero();
        return this.readBits(leadingZeros + 1) - 1;
      }
    }, {
      key: 'readSEG',
      value: function readSEG() {
        // signed exponential golomb
        var value = this.readUEG();
        if (value & 0x01) {
          return value + 1 >>> 1;
        } else {
          return -1 * (value >>> 1);
        }
      }
    }]);

    return Golomb;
  }();

  var _createClass$n = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$n(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var SPSParser$1 = function () {
    function SPSParser() {
      _classCallCheck$n(this, SPSParser);
    }

    _createClass$n(SPSParser, null, [{
      key: '_ebsp2rbsp',
      value: function _ebsp2rbsp(uint8array) {
        var src = uint8array;
        var srcLength = src.byteLength;
        var dst = new Uint8Array(srcLength);
        var dstIdx = 0;

        for (var i = 0; i < srcLength; i++) {
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
    }, {
      key: 'parseSPS',
      value: function parseSPS(uint8array) {
        var rbsp = SPSParser._ebsp2rbsp(uint8array);
        var gb = new Golomb$1(rbsp);

        var vpsId = 0,
            maxSubLayersMinus1 = 0,
            tINf = 0,
            spsId = 0,
            separate_colour_plane_flag = 0,
            chromaFormatIdc = 0,
            width = 0,
            height = 0,
            conf_win_left_offset = 0,
            conf_win_right_offset = 0,
            conf_win_top_offset = 0,
            conf_win_bottom_offset = 0,
            conformanceWindowFlag = 0,
            bitDepthLumaMinus8 = 0,
            bitDepthChromaMinus8 = 0,
            sub_width_c = 0,
            sub_height_c = 0,
            profileTierLevel = {};

        gb.readByte(); // NAL header
        gb.readByte();

        vpsId = gb.readBits(4); // vps_id
        maxSubLayersMinus1 = gb.readBits(3); // max_sub_layers_minus1
        tINf = gb.readBits(1); // temporal_id_nesting_flag

        profileTierLevel = SPSParser._readProfileTierLevel(gb, maxSubLayersMinus1);

        spsId = gb.readUEG(); // sps id
        chromaFormatIdc = gb.readUEG();
        if (chromaFormatIdc === 3) {
          separate_colour_plane_flag = gb.readBits(1); // separate_colour_plane_flag
        }

        width = gb.readUEG(); // pic_width_in_luma_samples
        height = gb.readUEG(); // pic_height_in_luma_samples

        conformanceWindowFlag = gb.readBits(1);
        if (conformanceWindowFlag === 1) {
          conf_win_left_offset = gb.readUEG(); // conf_win_left_offset
          conf_win_right_offset = gb.readUEG(); // conf_win_right_offset
          conf_win_top_offset = gb.readUEG(); // conf_win_top_offset
          conf_win_bottom_offset = gb.readUEG(); // conf_win_bottom_offset
        }

        bitDepthLumaMinus8 = gb.readUEG(); // bit_depth_luma_minus8
        bitDepthChromaMinus8 = gb.readUEG(); // bit_depth_chroma_minus8

        if (conformanceWindowFlag === 1) {
          sub_width_c = (1 === chromaFormatIdc || 2 === chromaFormatIdc) && 0 === separate_colour_plane_flag ? 2 : 1;
          sub_height_c = 1 === chromaFormatIdc && 0 === separate_colour_plane_flag ? 2 : 1;
          width -= sub_width_c * conf_win_right_offset + sub_width_c * conf_win_left_offset;
          height -= sub_height_c * conf_win_bottom_offset + sub_height_c * conf_win_top_offset;
        }

        gb.destroy();
        gb = null;

        return { width: width, height: height,
          general_profile_space: profileTierLevel.general_profile_space,
          general_tier_flag: profileTierLevel.general_tier_flag,
          general_profile_idc: profileTierLevel.general_profile_idc,
          general_level_idc: profileTierLevel.general_level_idc,
          chromaFormatIdc: chromaFormatIdc,
          bitDepthLumaMinus8: bitDepthLumaMinus8,
          bitDepthChromaMinus8: bitDepthChromaMinus8 };
      }

      // static parseSPS (uint8array) {
      //   let rbsp = SPSParser._ebsp2rbsp(uint8array)
      //   let gb = new Golomb(rbsp)
      //
      //   gb.readByte()
      //   let profileIdc = gb.readByte()
      //   gb.readByte()
      //   let levelIdc = gb.readByte()
      //   gb.readUEG()
      //
      //   let profile_string = SPSParser.getProfileString(profileIdc)
      //   let level_string = SPSParser.getLevelString(levelIdc)
      //   let chroma_format_idc = 1
      //   let chroma_format = 420
      //   let chroma_format_table = [0, 420, 422, 444]
      //   let bit_depth = 8
      //
      //   if (profileIdc === 100 || profileIdc === 110 || profileIdc === 122 ||
      //     profileIdc === 244 || profileIdc === 44 || profileIdc === 83 ||
      //     profileIdc === 86 || profileIdc === 118 || profileIdc === 128 ||
      //     profileIdc === 138 || profileIdc === 144) {
      //     chroma_format_idc = gb.readUEG()
      //     if (chroma_format_idc === 3) {
      //       gb.readBits(1)
      //     }
      //     if (chroma_format_idc <= 3) {
      //       chroma_format = chroma_format_table[chroma_format_idc]
      //     }
      //
      //     bit_depth = gb.readUEG() + 8
      //     gb.readUEG()
      //     gb.readBits(1)
      //     if (gb.readBool()) {
      //       let scaling_list_count = (chroma_format_idc !== 3) ? 8 : 12
      //       for (let i = 0; i < scaling_list_count; i++) {
      //         if (gb.readBool()) {
      //           if (i < 6) {
      //             SPSParser._skipScalingList(gb, 16)
      //           } else {
      //             SPSParser._skipScalingList(gb, 64)
      //           }
      //         }
      //       }
      //     }
      //   }
      //   gb.readUEG()
      //   let pic_order_cnt_type = gb.readUEG()
      //   if (pic_order_cnt_type === 0) {
      //     gb.readUEG()
      //   } else if (pic_order_cnt_type === 1) {
      //     gb.readBits(1)
      //     gb.readSEG()
      //     gb.readSEG()
      //     let num_ref_frames_in_pic_order_cnt_cycle = gb.readUEG()
      //     for (let i = 0; i < num_ref_frames_in_pic_order_cnt_cycle; i++) {
      //       gb.readSEG()
      //     }
      //   }
      //   gb.readUEG()
      //   gb.readBits(1)
      //
      //   let pic_width_in_mbs_minus1 = gb.readUEG()
      //   let pic_height_in_map_units_minus1 = gb.readUEG()
      //
      //   let frame_mbs_only_flag = gb.readBits(1)
      //   if (frame_mbs_only_flag === 0) {
      //     gb.readBits(1)
      //   }
      //   gb.readBits(1)
      //
      //   let frame_crop_left_offset = 0
      //   let frame_crop_right_offset = 0
      //   let frame_crop_top_offset = 0
      //   let frame_crop_bottom_offset = 0
      //
      //   let frame_cropping_flag = gb.readBool()
      //   if (frame_cropping_flag) {
      //     frame_crop_left_offset = gb.readUEG()
      //     frame_crop_right_offset = gb.readUEG()
      //     frame_crop_top_offset = gb.readUEG()
      //     frame_crop_bottom_offset = gb.readUEG()
      //   }
      //
      //   let par_width = 1, par_height = 1
      //   let fps = 0, fps_fixed = true, fps_num = 0, fps_den = 0
      //
      //   let vui_parameters_present_flag = gb.readBool()
      //   if (vui_parameters_present_flag) {
      //     if (gb.readBool()) { // aspect_ratio_info_present_flag
      //       let aspect_ratio_idc = gb.readByte()
      //       let par_w_table = [1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2]
      //       let par_h_table = [1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1]
      //
      //       if (aspect_ratio_idc > 0 && aspect_ratio_idc < 16) {
      //         par_width = par_w_table[aspect_ratio_idc - 1]
      //         par_height = par_h_table[aspect_ratio_idc - 1]
      //       } else if (aspect_ratio_idc === 255) {
      //         par_width = gb.readByte() << 8 | gb.readByte()
      //         par_height = gb.readByte() << 8 | gb.readByte()
      //       }
      //     }
      //
      //     if (gb.readBool()) {
      //       gb.readBool()
      //     }
      //     if (gb.readBool()) {
      //       gb.readBits(4)
      //       if (gb.readBool()) {
      //         gb.readBits(24)
      //       }
      //     }
      //     if (gb.readBool()) {
      //       gb.readUEG()
      //       gb.readUEG()
      //     }
      //     if (gb.readBool()) {
      //       let num_units_in_tick = gb.readBits(32)
      //       let time_scale = gb.readBits(32)
      //       fps_fixed = gb.readBool()
      //
      //       fps_num = time_scale
      //       fps_den = num_units_in_tick * 2
      //       fps = fps_num / fps_den
      //     }
      //   }
      //
      //   let parScale = 1
      //   if (par_width !== 1 || par_height !== 1) {
      //     parScale = par_width / par_height
      //   }
      //
      //   let crop_unit_x = 0, crop_unit_y = 0
      //   if (chroma_format_idc === 0) {
      //     crop_unit_x = 1
      //     crop_unit_y = 2 - frame_mbs_only_flag
      //   } else {
      //     let sub_wc = (chroma_format_idc === 3) ? 1 : 2
      //     let sub_hc = (chroma_format_idc === 1) ? 2 : 1
      //     crop_unit_x = sub_wc
      //     crop_unit_y = sub_hc * (2 - frame_mbs_only_flag)
      //   }
      //
      //   let codec_width = (pic_width_in_mbs_minus1 + 1) * 16
      //   let codec_height = (2 - frame_mbs_only_flag) * ((pic_height_in_map_units_minus1 + 1) * 16)
      //
      //   codec_width -= (frame_crop_left_offset + frame_crop_right_offset) * crop_unit_x
      //   codec_height -= (frame_crop_top_offset + frame_crop_bottom_offset) * crop_unit_y
      //
      //   let present_width = Math.ceil(codec_width * parScale)
      //
      //   gb.destroy()
      //   gb = null
      //
      //   return {
      //     profile_string: profile_string,
      //     level_string: level_string,
      //     bit_depth: bit_depth,
      //     chroma_format: chroma_format,
      //     chroma_format_string: SPSParser.getChromaFormatString(chroma_format),
      //
      //     frame_rate: {
      //       fixed: fps_fixed,
      //       fps: fps,
      //       fps_den: fps_den,
      //       fps_num: fps_num
      //     },
      //
      //     par_ratio: {
      //       width: par_width,
      //       height: par_height
      //     },
      //
      //     codec_size: {
      //       width: codec_width,
      //       height: codec_height
      //     },
      //
      //     present_size: {
      //       width: present_width,
      //       height: codec_height
      //     }
      //   }
      // }

    }, {
      key: '_readProfileTierLevel',
      value: function _readProfileTierLevel(gb, maxSubLayersMinus1) {
        var general_profile_space = 0;
        var general_tier_flag = 0;
        var general_profile_idc = 0;
        var general_level_idc = 0;
        general_profile_space = gb.readBits(2) || 0; // profile_space
        general_tier_flag = gb.readBits(1) || 0; // tierFlag
        general_profile_idc = gb.readBits(5) || 0; // profileIdc

        gb.readBits(16); // some 32bits
        gb.readBits(16);

        gb.readBits(1); // progressiveSourceFlag
        gb.readBits(1); // interlacedSourceFlag
        gb.readBits(1); // nonPackedConstraintFlag
        gb.readBits(1); // frameOnlyConstraintFlag


        gb.readBits(16); // reserved zero bits
        gb.readBits(16);
        gb.readBits(12);

        general_level_idc = gb.readBits(8) || 0; // level_idc

        var subLayerProfilePresentFlag = [];
        var subLayerLevelPresentFlag = [];
        for (var j = 0; j < maxSubLayersMinus1; j++) {
          subLayerProfilePresentFlag[j] = gb.readBits(1);
          subLayerLevelPresentFlag[j] = gb.readBits(1);
        }

        if (maxSubLayersMinus1 > 0) {
          gb.readBits((8 - maxSubLayersMinus1) * 2);
        }

        for (var i = 0; i < maxSubLayersMinus1; i++) {
          if (subLayerProfilePresentFlag[i] !== 0) {
            gb.readBits(2);
            gb.readBits(1);
            gb.readBits(5);

            gb.readBits(16);
            gb.readBits(16);

            gb.readBits(4);

            gb.readBits(16);
            gb.readBits(16);
            gb.readBits(12);
          }
          if (subLayerLevelPresentFlag[i] !== 0) {
            gb.readBits(8);
          }
        }

        return {
          general_profile_space: general_profile_space,
          general_tier_flag: general_tier_flag,
          general_profile_idc: general_profile_idc,
          general_level_idc: general_level_idc
        };
      }
    }, {
      key: '_skipScalingList',
      value: function _skipScalingList(gb, count) {
        var lastScale = 8;
        var nextScale = 8;
        var deltaScale = 0;
        for (var i = 0; i < count; i++) {
          if (nextScale !== 0) {
            deltaScale = gb.readSEG();
            nextScale = (lastScale + deltaScale + 256) % 256;
          }
          lastScale = nextScale === 0 ? lastScale : nextScale;
        }
      }
    }, {
      key: 'getProfileString',
      value: function getProfileString(profileIdc) {
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
    }, {
      key: 'getLevelString',
      value: function getLevelString(levelIdc) {
        return (levelIdc / 10).toFixed(1);
      }
    }, {
      key: 'getChromaFormatString',
      value: function getChromaFormatString(chroma) {
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
    }, {
      key: 'toVideoMeta',
      value: function toVideoMeta(spsConfig) {
        var meta = {};
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

        // meta.parRatio = {
        //   width: spsConfig.par_ratio.width,
        //   height: spsConfig.par_ratio.height
        // }

        // meta.frameRate = spsConfig.frame_rate

        // let fpsDen = meta.frameRate.fps_den
        // let fpsNum = meta.frameRate.fps_num
        // meta.refSampleDuration = Math.floor(meta.timescale * (fpsDen / fpsNum))
        return meta;
      }
    }]);

    return SPSParser;
  }();

  var _createClass$o = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$o(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Nalunit$1 = function () {
    function Nalunit() {
      _classCallCheck$o(this, Nalunit);
    }

    _createClass$o(Nalunit, null, [{
      key: 'getNalunits',
      value: function getNalunits(buffer) {
        if (buffer.length - buffer.position < 4) {
          return [];
        }

        var buf = buffer.dataview;
        var position = buffer.position;
        // console.log('getNalunits')
        // console.log('buf: ', buf)
        // console.log(buf.getInt8(position))
        // console.log(buf.getInt8(position+1))
        // console.log(buf.getInt8(position+2))
        // console.log(buf.getInt8(position+3))
        if (buf.getInt32(position) === 1 || buf.getInt16(position) === 0 && buf.getInt8(position + 2) === 1) {
          return Nalunit.getAnnexbNals(buffer);
        } else {
          return Nalunit.getHvccNals(buffer);
        }
      }
    }, {
      key: 'getAnnexbNals',
      value: function getAnnexbNals(buffer) {
        // console.log('getAnnexbNals')
        // console.log('buffer: ', buffer)
        var nals = [];
        var position = Nalunit.getHeaderPositionAnnexB(buffer);
        var start = position.pos;
        var end = start;
        while (start < buffer.length - 4) {
          var header = buffer.buffer.slice(start, start + position.headerLength);
          if (position.pos === buffer.position) {
            buffer.skip(position.headerLength);
          }
          position = Nalunit.getHeaderPositionAnnexB(buffer);
          end = position.pos;
          var body = new Uint8Array(buffer.buffer.slice(start + header.byteLength, end));
          var unit = { header: header, body: body };
          Nalunit.analyseNal(unit);
          if (unit.type <= 40) {
            nals.push(unit);
          }
          buffer.skip(end - buffer.position);
          start = end;
        }
        return nals;
      }
    }, {
      key: 'getHvccNals',
      value: function getHvccNals(buffer) {
        // console.log('getHvccNals')
        var nals = [];
        while (buffer.position < buffer.length - 4) {
          // console.log('buffer')
          // console.log(buffer)
          // console.log(buffer.position)
          // console.log(buffer.length)
          // console.log(buffer.dataview)
          // let length = buffer.dataview.getInt32();
          var lengthArr = new Uint8Array(buffer.buffer.slice(0, 4));
          var length = lengthArr[0] << 24 + lengthArr[1] << 16 + lengthArr[2] << 8 + lengthArr[3];
          if (buffer.length - buffer.position >= length) {
            var header = buffer.buffer.slice(buffer.position, buffer.position + 4);
            buffer.skip(4);
            var body = buffer.buffer.slice(buffer.position, buffer.position + length);
            buffer.skip(length);
            var unit = { header: header, body: body };
            Nalunit.analyseNal(unit);
            if (unit.type <= 40) {
              nals.push(unit);
            }
          } else {
            break;
          }
        }
        return nals;
      }
    }, {
      key: 'analyseNal',
      value: function analyseNal(unit) {
        // console.log('analyseNal')
        // console.log('unit: ', unit)
        // console.log(unit.body[0] >>> 1)
        var type = unit.body[0] >>> 1 & 0x3f;
        // console.log('type: ', type)
        unit.type = type;
        switch (type) {
          case 0:
            // SLICE_TRAIL_N
            unit.slice_trail_n = true;
            break;
          case 1:
            // SLICE_TRAIL_R
            unit.slice_trail_r = true;
            unit.key = true;
            break;
          case 2:
            // SLICE_TSA_N
            unit.slice_tsa_n = true;
            break;
          case 3:
            // SLICE_TSA_R
            unit.slice_tsa_r = true;
            unit.key = true;
            break;
          case 4:
            // SLICE_STSA_N
            unit.slice_stsa_n = true;
            break;
          case 5:
            // SLICE_STSA_R
            unit.slice_stsa_r = true;
            unit.key = true;
            break;
          case 6:
            // SLICE_RADL_N
            unit.slice_radl_n = true;
            break;
          case 7:
            // SLICE_RADL_R
            unit.slice_radl_r = true;
            unit.key = true;
            break;
          case 8:
            // SLICE_RASL_N
            unit.slice_rasl_n = true;
            break;
          case 9:
            // SLICE_RASL_R
            unit.slice_rasl_r = true;
            unit.key = true;
            break;
          case 16:
            // SLICE_BLA_W_LP
            unit.slice_bla_w_lp = true;
            break;
          case 17:
            // SLICE_BLA_W_RADL
            unit.slice_bla_w_radl = true;
            break;
          case 18:
            // SLICE_BLA_N_LP
            unit.slice_bla_n_lp = true;
            break;
          case 19:
            // SLICE_IDR_W_RADL
            unit.slice_idl_w_radl = true;
            unit.key = true;
            break;
          case 20:
            // SLICE_IDR_N_LP
            unit.slice_idr_n_lp = true;
            unit.key = true;
            break;
          case 21:
            // SLICE_CRA_NUT
            unit.slice_cra_nut = true;
            unit.key = true;
            break;
          case 32:
            // VPS
            unit.vps = true;
            break;
          case 33:
            // SPS
            unit.sps = SPSParser$1.parseSPS(unit.body);
            break;
          case 34:
            // PPS
            unit.pps = true;
            break;
          case 35:
            // AUD
            break;
          case 36:
            // EOS
            unit.aud = true;
            break;
          case 37:
            // EOB
            unit.eob = true;
            break;
          case 38:
            // FD
            unit.fd = true;
            break;
          case 39:
            // PREFIX_SEI
            unit.prefix_sei = true;
            break;
          case 40:
            // SUFFIX_SEI
            unit.suffix_sei = true;
            break;
          // case 1:
          //   // NDR
          //   unit.ndr = true;
          //   break;
          // case 5:
          //   // IDR
          //   unit.idr = true;
          //   break;
          // case 6:
          //   // SEI
          //   break;
          // case 7:
          //   // SPS
          //   unit.sps = SpsParser.parseSPS(unit.body);
          //   break;
          // case 8:
          //   // PPS
          //   unit.pps = true;
          //   break;
          // case 9:
          //   // AUD
          //   break;
          // default:
          //   break;
        }
      }
    }, {
      key: 'getHeaderPositionAnnexB',
      value: function getHeaderPositionAnnexB(buffer) {
        // seperate
        var pos = buffer.position;
        var headerLength = 0;
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
        return { pos: pos, headerLength: headerLength };
      }

      // static getAvcc (sps, pps) {
      //   let ret = new Uint8Array(sps.byteLength + pps.byteLength + 11);
      //   ret[0] = 0x01;
      //   ret[1] = sps[1];
      //   ret[2] = sps[2];
      //   ret[3] = sps[3];
      //   ret[4] = 255;
      //   ret[5] = 225;
      //
      //   let offset = 6;
      //
      //   ret.set(new Uint8Array([(sps.byteLength >>> 8) & 0xff, sps.byteLength & 0xff]), offset);
      //   offset += 2;
      //   ret.set(sps, offset);
      //   offset += sps.byteLength;
      //
      //   ret[offset] = 1;
      //   offset++;
      //
      //   ret.set(new Uint8Array([(pps.byteLength >>> 8) & 0xff, pps.byteLength & 0xff]), offset);
      //   offset += 2;
      //   ret.set(pps, offset);
      //   return ret;
      // }

    }]);

    return Nalunit;
  }();

  var NalUnitHEVC = Nalunit$1;

  var _createClass$p = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$p(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var AudioTrackMeta = function () {
    function AudioTrackMeta(meta) {
      _classCallCheck$p(this, AudioTrackMeta);

      var _default = {
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

    _createClass$p(AudioTrackMeta, [{
      key: 'destroy',
      value: function destroy() {
        this.init = null;
      }
    }]);

    return AudioTrackMeta;
  }();

  var VideoTrackMeta = function () {
    function VideoTrackMeta(meta) {
      _classCallCheck$p(this, VideoTrackMeta);

      var _default = {
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

    _createClass$p(VideoTrackMeta, [{
      key: 'destroy',
      value: function destroy() {
        this.init = null;
        this.sps = null;
        this.pps = null;
      }
    }]);

    return VideoTrackMeta;
  }();

  var _createClass$q = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$q(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var AudioTrackSample = function () {
    function AudioTrackSample(info) {
      _classCallCheck$q(this, AudioTrackSample);

      var _default = AudioTrackSample.getDefault();
      if (!info) {
        return _default;
      }
      var sample = Object.assign({}, _default, info);

      return sample;
    }

    _createClass$q(AudioTrackSample, null, [{
      key: "getDefault",
      value: function getDefault() {
        return {
          dts: null,
          pts: null,
          data: new Uint8Array()
        };
      }
    }]);

    return AudioTrackSample;
  }();

  var VideoTrackSample = function () {
    function VideoTrackSample(info) {
      _classCallCheck$q(this, VideoTrackSample);

      var _default = VideoTrackSample.getDefault();

      if (!info) {
        return _default;
      }
      var sample = Object.assign({}, _default, info);

      return sample;
    }

    _createClass$q(VideoTrackSample, null, [{
      key: "getDefault",
      value: function getDefault() {
        return {
          dts: null,
          pts: null,
          isKeyframe: false, // is Random access point
          originDts: null,
          data: new Uint8Array()
        };
      }
    }]);

    return VideoTrackSample;
  }();

  var _typeof2$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  var _typeof$3 = typeof Symbol === "function" && _typeof2$1(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2$1(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2$1(obj);
  };

  var _createClass$r = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$r(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var DEMUX_EVENTS$1 = EVENTS.DEMUX_EVENTS;
  var StreamType = {
    0x01: ['video', 'MPEG-1'],
    0x02: ['video', 'MPEG-2'],
    0x1b: ['video', 'AVC.H264'],
    0x24: ['video', 'HVC.H265'],
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

  var TsDemuxer = function () {
    function TsDemuxer(configs) {
      _classCallCheck$r(this, TsDemuxer);

      this.configs = Object.assign({}, configs);
      this.demuxing = false;
      this.pat = [];
      this.pmt = [];
      this._hasVideoMeta = false;
      this._hasAudioMeta = false;
    }

    _createClass$r(TsDemuxer, [{
      key: 'init',
      value: function init() {
        this.on(DEMUX_EVENTS$1.DEMUX_START, this.demux.bind(this));
      }
    }, {
      key: 'demux',
      value: function demux(frag) {
        if (this.demuxing) {
          return;
        }

        var buffer = this.inputBuffer;
        var frags = { pat: [], pmt: [] };
        var peses = {};

        // Read TS segment
        while (buffer.length >= 188) {
          if (buffer.length >= 1 && buffer.array[0][buffer.offset] !== 71) {
            this.emit(DEMUX_EVENTS$1.DEMUX_ERROR, this.TAG, new Error('Untrust sync code: ' + buffer.array[0][buffer.offset] + ', try to recover;'), false);
          }
          while (buffer.length >= 1 && buffer.array[0][buffer.offset] !== 71) {
            buffer.shift(1);
          }
          if (buffer.length < 188) {
            continue;
          }
          var buf = buffer.shift(188);
          // console.log(buf);
          var tsStream = new Stream(buf.buffer);
          var ts = {};
          TsDemuxer.read(tsStream, ts, frags);
          if (ts.pes) {
            ts.pes.codec = ts.header.codec;
            if (!peses[ts.header.pid]) {
              peses[ts.header.pid] = [];
            }
            peses[ts.header.pid].push(ts.pes);
            ts.pes.ES.buffer = [ts.pes.ES.buffer];
          } else if (peses[ts.header.pid]) {
            peses[ts.header.pid][peses[ts.header.pid].length - 1].ES.buffer.push(ts.payload.stream);
          }
        }

        var AudioOptions = Object.assign({}, frag);
        var VideoOptions = Object.assign({}, frag);

        // Get Frames data
        for (var i = 0; i < Object.keys(peses).length; i++) {
          var epeses = peses[Object.keys(peses)[i]];
          for (var j = 0; j < epeses.length; j++) {
            epeses[j].id = Object.keys(peses)[i];

            if (epeses[j].type === 'audio') {
              epeses[j].ES.buffer = TsDemuxer.mergeAudioES(epeses[j].ES.buffer);
              this.pushAudioSample(epeses[j], AudioOptions);
              AudioOptions = {};
            } else if (epeses[j].type === 'video') {
              epeses[j].ES.buffer = TsDemuxer.mergeVideoES(epeses[j].ES.buffer);
              if (epeses[j].codec === 'HVC.H265') {
                this.pushVideoSampleHEVC(epeses[j], VideoOptions);
              } else {
                this.pushVideoSample(epeses[j], VideoOptions);
              }
              VideoOptions = {};
            }
          }
        }

        if (this._hasAudioMeta) {
          this.emit(DEMUX_EVENTS$1.DEMUX_COMPLETE, 'audio');
        }
        if (this._hasVideoMeta) {
          this.emit(DEMUX_EVENTS$1.DEMUX_COMPLETE, 'video');
        }
      }
    }, {
      key: 'pushAudioSample',
      value: function pushAudioSample(pes, options) {
        var _track$samples;

        var track = void 0;
        if (!this._tracks || !this._tracks.audioTrack) {
          this._tracks.audioTrack = new AudioTrack();
          track = this._tracks.audioTrack;
        } else {
          track = this._tracks.audioTrack;
        }
        var meta = new AudioTrackMeta({
          audioSampleRate: pes.ES.frequence,
          sampleRate: pes.ES.frequence,
          channelCount: pes.ES.channel,
          codec: 'mp4a.40.' + pes.ES.audioObjectType,
          config: pes.ES.audioConfig,
          id: 2,
          sampleRateIndex: pes.ES.frequencyIndex
        });
        meta.refSampleDuration = Math.floor(1024 / meta.audioSampleRate * meta.timescale);

        var metaEqual = TsDemuxer.compaireMeta(track.meta, meta, true);

        if (!this._hasAudioMeta || !metaEqual) {
          track.meta = meta;
          this._hasAudioMeta = true;
          if (options) {
            options.meta = Object.assign({}, meta);
          } else {
            options = {
              meta: Object.assign({}, meta)
            };
          }
          this.emit(DEMUX_EVENTS$1.METADATA_PARSED, 'audio');
        }

        var frameIndex = 0;
        var samples = [];

        pes.ES.buffer.skip(pes.pesHeaderLength + 9);
        var streamChanged = false;
        while (pes.ES.buffer.position < pes.ES.buffer.length) {
          if (ADTS$1.isHeader(new Uint8Array(pes.ES.buffer.buffer), pes.ES.buffer.position) && pes.ES.buffer.position + 5 < pes.ES.buffer.length) {
            var frame = ADTS$1.appendFrame(track, new Uint8Array(pes.ES.buffer.buffer), pes.ES.buffer.position, pes.pts, frameIndex);
            if (frame && frame.sample) {
              // logger.log(`${Math.round(frame.sample.pts)} : AAC`);
              pes.ES.buffer.skip(frame.length);
              var sample = new AudioTrackSample({
                dts: frame.sample.dts,
                pts: frame.sample.pts,
                data: frame.sample.unit,
                options: streamChanged ? {} : options
              });
              if (options.meta) {
                streamChanged = true;
              }
              samples.push(sample);
              frameIndex++;
            } else {
              // logger.log('Unable to parse AAC frame');
              break;
            }
          } else {
            // nothing found, keep looking
            pes.ES.buffer.skip(1);
          }
        }
        for (var i = 0; i < samples.length; i++) {
          var _sample = samples[i];
          _sample.dts = _sample.pts = Math.ceil(_sample.pts / 90);
        }

        // let data = new Uint8Array(pes.ES.buffer.buffer.slice(pes.ES.buffer.position, pes.ES.buffer.length));
        // let sample = new AudioTrackSample({dts, pts, data, options});
        (_track$samples = track.samples).push.apply(_track$samples, samples);
      }
    }, {
      key: 'pushVideoSample',
      value: function pushVideoSample(pes, options) {
        var nals = NalUnit.getNalunits(pes.ES.buffer);
        var track = void 0;
        var meta = new VideoTrackMeta();
        if (!this._tracks || !this._tracks.videoTrack) {
          this._tracks.videoTrack = new VideoTrack();
          track = this._tracks.videoTrack;
        } else {
          track = this._tracks.videoTrack;
        }
        var sampleLength = 0;
        var sps = false;
        var pps = false;
        for (var i = 0; i < nals.length; i++) {
          var nal = nals[i];
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
          } else if (nal.sei) {
            this.emit(DEMUX_EVENTS$1.SEI_PARSED, nal.sei);
          } else if (nal.type < 9) {
            sampleLength += 4 + nal.body.byteLength;
          }
        }

        if (sps && pps) {
          meta.avcc = NalUnit.getAvcc(sps.body, pps.body);
          var metaEqual = TsDemuxer.compaireMeta(track.meta, meta, true);
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
            this.emit(DEMUX_EVENTS$1.METADATA_PARSED, 'video');
          }
        }

        var data = new Uint8Array(sampleLength);
        var offset = 0;
        var isKeyframe = false;
        for (var _i = 0; _i < nals.length; _i++) {
          var _nal = nals[_i];
          if (_nal.type && _nal.type >= 9) {
            continue;
          }
          var length = _nal.body.byteLength;
          if (_nal.idr) {
            isKeyframe = true;
          }
          if (!_nal.pps && !_nal.sps && !_nal.sei) {
            data.set(new Uint8Array([length >>> 24 & 0xff, length >>> 16 & 0xff, length >>> 8 & 0xff, length & 0xff]), offset);
            offset += 4;
            data.set(_nal.body, offset);
            offset += length;
          }
        }
        var sample = new VideoTrackSample({
          dts: parseInt(pes.dts / 90),
          pts: parseInt(pes.pts / 90),
          cts: (pes.pts - pes.dts) / 90,
          originDts: pes.dts,
          isKeyframe: isKeyframe,
          data: data,
          options: options
        });
        track.samples.push(sample);
      }
    }, {
      key: 'pushVideoSampleHEVC',
      value: function pushVideoSampleHEVC(pes, options) {
        var nals = NalUnitHEVC.getNalunits(pes.ES.buffer);
        var track = void 0;
        var meta = new VideoTrackMeta();
        meta.streamType = 0x24;
        if (!this._tracks.videoTrack) {
          this._tracks.videoTrack = new VideoTrack();
          track = this._tracks.videoTrack;
        } else {
          track = this._tracks.videoTrack;
        }

        var sampleLength = 0;
        var vps = false;
        var sps = false;
        var pps = false;
        var hasVPS = false;
        var hasSPS = false;
        var hasPPS = false;
        for (var i = 0; i < nals.length; i++) {
          var nal = nals[i];
          if (nal.vps) {
            if (hasVPS) {
              continue;
            } else {
              hasVPS = true;
            }
          } else if (nal.sps) {
            if (hasSPS) {
              continue;
            } else {
              hasSPS = true;
            }
          } else if (nal.pps) {
            if (hasPPS) {
              continue;
            } else {
              hasPPS = true;
            }
          }
          if (nal.sps) {
            sps = nal;
            track.sps = nal.body;
            // meta.chromaFormat = sps.sps.chroma_format
            // meta.codec = 'hvc1.';
            // for (var j = 1; j < 4; j++) {
            //   var h = sps.body[j].toString(16);
            //   if (h.length < 2) {
            //     h = '0' + h;
            //   }
            //   meta.codec += h;
            // }
            // meta.codecHeight = sps.sps.codec_size.height;
            // meta.codecWidth = sps.sps.codec_size.width;
            // meta.frameRate = sps.sps.frame_rate;
            // meta.id = 1;
            // meta.level = sps.sps.level_string;
            // meta.presentHeight = sps.sps.present_size.height;
            // meta.presentWidth = sps.sps.present_size.width;
            // meta.profile = sps.sps.profile_string;
            // meta.refSampleDuration = Math.floor(meta.timescale * (sps.sps.frame_rate.fps_den / sps.sps.frame_rate.fps_num));
            // meta.sarRatio = sps.sps.sar_ratio ? sps.sps.sar_ratio : sps.sps.par_ratio;

            meta.presentWidth = sps.sps.width;
            meta.presentHeight = sps.sps.height;
            meta.general_profile_space = sps.sps.general_profile_space;
            meta.general_tier_flag = sps.sps.general_tier_flag;
            meta.general_profile_idc = sps.sps.general_profile_idc;
            meta.general_level_idc = sps.sps.general_level_idc;
            // meta.duration = this._duration;
            meta.codec = 'hev1.1.6.L93.B0';
            meta.chromaFormatIdc = sps.sps.chromaFormatIdc;
            meta.bitDepthLumaMinus8 = sps.sps.bitDepthLumaMinus8;
            meta.bitDepthChromaMinus8 = sps.sps.bitDepthChromaMinus8;
          } else if (nal.pps) {
            track.pps = nal.body;
            pps = nal;
          } else if (nal.vps) {
            track.vps = nal.body;
            vps = nal;
          }
          if (nal.type <= 40) {
            sampleLength += 4 + nal.body.byteLength;
          }
        }

        if (sps && pps && vps) {
          // meta.avcc = NalUnitHEVC.getAvcc(sps.body, pps.body);
          var metaEqual = TsDemuxer.compaireMeta(track.meta, meta, true);
          if (!this._hasVideoMeta || !metaEqual) {
            if (options) {
              options.meta = Object.assign({}, meta);
            } else {
              options = {
                meta: Object.assign({}, meta)
              };
            }
            meta.streamType = 0x24;
            this._tracks.videoTrack.meta = meta;
            this._hasVideoMeta = true;
            this.emit(DEMUX_EVENTS$1.METADATA_PARSED, 'video');
          }
        }

        var data = new Uint8Array(sampleLength);
        var offset = 0;
        var isKeyframe = false;
        hasVPS = false;
        hasSPS = false;
        hasPPS = false;
        for (var _i2 = 0; _i2 < nals.length; _i2++) {
          var _nal2 = nals[_i2];
          if (_nal2.type && _nal2.type > 40) {
            continue;
          }
          if (_nal2.vps) {
            if (hasVPS) {
              continue;
            } else {
              hasVPS = true;
            }
          } else if (_nal2.sps) {
            if (hasSPS) {
              continue;
            } else {
              hasSPS = true;
            }
          } else if (_nal2.pps) {
            if (hasPPS) {
              continue;
            } else {
              hasPPS = true;
            }
          }
          var length = _nal2.body.byteLength;
          if (_nal2.key) {
            isKeyframe = true;
          }
          // if (!nal.vps && !nal.pps && !nal.sps) {
          data.set(new Uint8Array([length >>> 24 & 0xff, length >>> 16 & 0xff, length >>> 8 & 0xff, length & 0xff]), offset);
          offset += 4;
          data.set(_nal2.body, offset);
          offset += length;
          // }
        }
        var sample = new VideoTrackSample({
          dts: parseInt(pes.dts / 90),
          pts: parseInt(pes.pts / 90),
          cts: (pes.pts - pes.dts) / 90,
          originDts: pes.dts,
          isKeyframe: isKeyframe,
          data: data,
          options: options
        });
        track.samples.push(sample);
      }
    }, {
      key: 'destory',
      value: function destory() {
        this.off(DEMUX_EVENTS$1.DEMUX_START, this.demux);
        this.configs = {};
        this.demuxing = false;
        this.pat = [];
        this.pmt = [];
        this._hasVideoMeta = false;
        this._hasAudioMeta = false;
      }
    }, {
      key: 'inputBuffer',
      get: function get() {
        return this._context.getInstance(this.configs.inputbuffer);
      }
    }, {
      key: '_tracks',
      get: function get() {
        return this._context.getInstance('TRACKS');
      }
    }], [{
      key: 'compaireArray',
      value: function compaireArray(a, b, type) {
        var al = 0;
        var bl = 0;
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

        for (var i = 0; i < al; i++) {
          if (a[i] !== b[i]) {
            return false;
          }
        }
        return true;
      }
    }, {
      key: 'compaireMeta',
      value: function compaireMeta(a, b, ignoreDuration) {
        if (!a || !b) {
          return false;
        }

        for (var i = 0, k = Object.keys(a).length; i < k; i++) {
          var itema = a[Object.keys(a)[i]];
          var itemb = b[Object.keys(a)[i]];
          if (!itema && !itemb) {
            return true;
          }

          if (!itema && itemb || itema && !itemb) {
            return false;
          }

          if ((typeof itema === 'undefined' ? 'undefined' : _typeof$3(itema)) !== 'object') {
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
    }, {
      key: 'mergeVideoES',
      value: function mergeVideoES(buffers) {
        var data = void 0;
        var length = 0;
        var offset = 0;
        for (var i = 0; i < buffers.length; i++) {
          length += buffers[i].length - buffers[i].position;
        }

        data = new Uint8Array(length);
        for (var _i3 = 0; _i3 < buffers.length; _i3++) {
          var buffer = buffers[_i3];
          data.set(new Uint8Array(buffer.buffer, buffer.position), offset);
          offset += buffer.length - buffer.position;
        }
        return new Stream(data.buffer);
      }
    }, {
      key: 'mergeAudioES',
      value: function mergeAudioES(buffers) {
        var data = void 0;
        var length = 0;
        var offset = 0;
        for (var i = 0; i < buffers.length; i++) {
          length += buffers[i].length;
        }

        data = new Uint8Array(length);
        for (var _i4 = 0; _i4 < buffers.length; _i4++) {
          var buffer = buffers[_i4];
          data.set(new Uint8Array(buffer.buffer), offset);
          offset += buffer.length;
        }

        return new Stream(data.buffer);
      }
    }, {
      key: 'read',
      value: function read(stream, ts, frags) {
        TsDemuxer.readHeader(stream, ts);
        TsDemuxer.readPayload(stream, ts, frags);
        if (ts.header.packet === 'MEDIA' && ts.header.payload === 1 && !ts.unknownPIDs) {
          ts.pes = TsDemuxer.PES(ts);
        }
      }
    }, {
      key: 'readPayload',
      value: function readPayload(stream, ts, frags) {
        var header = ts.header;
        var pid = header.pid;
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
            if (frags.pat.some(function (item) {
              return item.pid === pid;
            })) {
              TsDemuxer.PMT(stream, ts, frags);
            } else {
              var sts = frags.pmt ? frags.pmt.filter(function (item) {
                return item.pid === pid;
              }) : [];
              if (sts.length > 0) {
                TsDemuxer.Media(stream, ts, StreamType[sts[0].streamType][0]);
                ts.header.codec = StreamType[sts[0].streamType][1];
              } else {
                ts.unknownPIDs = true;
              }
            }
        }
      }
    }, {
      key: 'readHeader',
      value: function readHeader(stream, ts) {
        var header = {};
        header.sync = stream.readUint8();
        var next = stream.readUint16();
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
    }, {
      key: 'PAT',
      value: function PAT(stream, ts, frags) {
        var ret = {};
        var next = stream.readUint8();
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
        var N = (ret.sectionLength - 9) / 4;
        var list = [];
        for (var i = 0; i < N; i++) {
          var programNumber = stream.readUint16();
          var pid = stream.readUint16() & 0x1fff;
          list.push({
            program: programNumber,
            pid: pid,
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
    }, {
      key: 'PMT',
      value: function PMT(stream, ts, frags) {
        var ret = {};
        var header = ts.header;
        header.packet = 'PMT';
        var next = stream.readUint8();
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
        var N = (ret.sectionLength - 13) / 5;
        var list = [];
        for (var i = 0; i < N; i++) {
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
        frags.pmt = this.pmt.concat(list.map(function (item) {
          return {
            pid: item.pid,
            es: item.es,
            streamType: item.streamType,
            program: ret.program
          };
        }));
        ts.payload = ret;
      }
    }, {
      key: 'Media',
      value: function Media(stream, ts, type) {
        var header = ts.header;
        var payload = {};
        header.type = type;
        if (header.adaptation === 0x03) {
          payload.adaptationLength = stream.readUint8();
          if (payload.adaptationLength > 0) {
            var next = stream.readUint8();
            payload.discontinue = next >>> 7;
            payload.access = next >>> 6 & 0x01;
            payload.priority = next >>> 5 & 0x01;
            payload.PCR = next >>> 4 & 0x01;
            payload.OPCR = next >>> 3 & 0x01;
            payload.splicePoint = next >>> 2 & 0x01;
            payload.transportPrivate = next >>> 1 & 0x01;
            payload.adaptationField = next & 0x01;
            var _start = stream.position;
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
              var length = stream.readUint8();
              var transportPrivateData = [];
              for (var i = 0; i < length; i++) {
                transportPrivateData.push(stream.readUint8());
              }
            }
            if (payload.adaptationField === 1) {
              var _length = stream.readUint8();
              var _next = stream.readUint8();
              var start = stream.position;
              var ltw = _next >>> 7;
              var piecewise = _next >>> 6 & 0x1;
              var seamless = _next >>> 5 & 0x1;
              if (ltw === 1) {
                _next = stream.readUint16();
                payload.ltwValid = _next >>> 15;
                payload.ltwOffset = _next & 0xefff;
              }
              if (piecewise === 1) {
                _next = stream.readUint24();
                payload.piecewiseRate = _next & 0x3fffff;
              }
              if (seamless === 1) {
                _next = stream.readInt8();
                payload.spliceType = _next >>> 4;
                payload.dtsNextAU1 = _next >>> 1 & 0x7;
                payload.marker1 = _next & 0x1;
                _next = stream.readUint16();
                payload.dtsNextAU2 = _next >>> 1;
                payload.marker2 = _next & 0x1;
                _next = stream.readUint16();
                payload.dtsNextAU3 = _next;
              }
              stream.skip(_length - 1 - (stream.position - start));
            }
            var lastStuffing = payload.adaptationLength - 1 - (stream.position - _start);
            stream.skip(lastStuffing);
          }
        }
        payload.stream = new Stream(stream.buffer.slice(stream.position));
        ts.payload = payload;
      }
    }, {
      key: 'PES',
      value: function PES(ts) {
        var ret = {};
        var buffer = ts.payload.stream;

        var next = buffer.readUint24();
        if (next !== 1) {
          ret.ES = {};
          ret.ES.buffer = buffer;
        } else {
          var streamID = buffer.readUint8();
          if (streamID >= 0xe0 && streamID <= 0xef) {
            ret.type = 'video';
          }
          if (streamID >= 0xc0 && streamID <= 0xdf) {
            ret.type = 'audio';
          }
          var packetLength = buffer.readUint16();
          ret.packetLength = packetLength;
          if (ret.type === 'video' || ret.type === 'audio') {
            var _next2 = buffer.readUint8();
            var first = _next2 >>> 6;
            if (first !== 0x02) {
              throw new Error('error when parse pes header');
            }
            _next2 = buffer.readUint8();
            ret.ptsDTSFlag = _next2 >>> 6;
            ret.escrFlag = _next2 >>> 5 & 0x01;
            ret.esRateFlag = _next2 >>> 4 & 0x01;
            ret.dsmFlag = _next2 >>> 3 & 0x01;
            ret.additionalFlag = _next2 >>> 2 & 0x01;
            ret.crcFlag = _next2 >>> 1 & 0x01;
            ret.extensionFlag = _next2 & 0x01;
            ret.pesHeaderLength = buffer.readUint8();
            var N1 = ret.pesHeaderLength;

            if (ret.ptsDTSFlag === 2) {
              var pts = [];
              _next2 = buffer.readUint8();
              pts.push(_next2 >>> 1 & 0x07);
              _next2 = buffer.readUint16();
              pts.push(_next2 >>> 1);
              _next2 = buffer.readUint16();
              pts.push(_next2 >>> 1);
              ret.pts = pts[0] << 30 | pts[1] << 15 | pts[2];
              N1 -= 5;
              // 视频如果没有dts用pts
              if (ret.type === 'video') {
                ret.dts = ret.pts;
              }
            }
            if (ret.ptsDTSFlag === 3) {
              var _pts = [];
              _next2 = buffer.readUint8();
              _pts.push(_next2 >>> 1 & 0x07);
              _next2 = buffer.readUint16();
              _pts.push(_next2 >>> 1);
              _next2 = buffer.readUint16();
              _pts.push(_next2 >>> 1);
              ret.pts = _pts[0] << 30 | _pts[1] << 15 | _pts[2];
              var dts = [];
              _next2 = buffer.readUint8();
              dts.push(_next2 >>> 1 & 0x07);
              _next2 = buffer.readUint16();
              dts.push(_next2 >>> 1);
              _next2 = buffer.readUint16();
              dts.push(_next2 >>> 1);
              ret.dts = dts[0] << 30 | dts[1] << 15 | dts[2];
              N1 -= 10;
            }
            if (ret.escrFlag === 1) {
              var escr = [];
              var ex = [];
              _next2 = buffer.readUint8();
              escr.push(_next2 >>> 3 & 0x07);
              escr.push(_next2 & 0x03);
              _next2 = buffer.readUint16();
              escr.push(_next2 >>> 13);
              escr.push(_next2 & 0x03);
              _next2 = buffer.readUint16();
              escr.push(_next2 >>> 13);
              ex.push(_next2 & 0x03);
              _next2 = buffer.readUint8();
              ex.push(_next2 >>> 1);
              ret.escr = (escr[0] << 30 | escr[1] << 28 | escr[2] << 15 | escr[3] << 13 | escr[4]) * 300 + (ex[0] << 7 | ex[1]);
              N1 -= 6;
            }
            if (ret.esRateFlag === 1) {
              _next2 = buffer.readUint24();
              ret.esRate = _next2 >>> 1 & 0x3fffff;
              N1 -= 3;
            }
            if (ret.dsmFlag === 1) {
              throw new Error('not support DSM_trick_mode');
            }
            if (ret.additionalFlag === 1) {
              _next2 = buffer.readUint8();
              ret.additionalCopyInfo = _next2 & 0x7f;
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
    }, {
      key: 'ES',
      value: function ES(buffer, type) {
        var next = void 0;
        var ret = {};
        if (type === 'video') {
          // next = buffer.readUint32();
          // if (next !== 1) {
          //   buffer.back(4);
          //   next = buffer.readUint24();
          //   if (next !== 1) {
          //     throw new Error('h264 nal header parse failed');
          //   }
          // }
          // buffer.skip(2);// 09 F0
          // TODO readnalu
          ret.buffer = buffer;
        } else if (type === 'audio') {
          next = buffer.readUint16();
          // adts的同步字节，12位
          if (next >>> 4 !== 0xfff) {
            throw new Error('aac ES parse Error');
          }
          var fq = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];
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
          throw new Error('ES ' + type + ' is not supported');
        }

        return ret;
      }
    }, {
      key: 'TSDT',
      value: function TSDT(stream, ts, frags) {
        // TODO
        ts.payload = {};
      }
    }, {
      key: 'CAT',
      value: function CAT(stream, ts, frags) {
        var ret = {};
        ret.tableID = stream.readUint8();
        var next = stream.readUint16();
        ret.sectionIndicator = next >>> 7;
        ret.sectionLength = next & 0x0fff;
        stream.skip(2);
        next = stream.readUint8();
        ret.version = next >>> 3;
        ret.currentNextIndicator = next & 0x01;
        ret.sectionNumber = stream.readUint8();
        ret.lastSectionNumber = stream.readUint8();
        var N = (this.sectionLength - 9) / 4;
        ret.crc32 = stream.readUint32();
        ts.payload = ret;
      }
    }, {
      key: 'getAudioConfig',
      value: function getAudioConfig(ret) {
        var userAgent = navigator.userAgent.toLowerCase();
        var config = void 0;
        var extensionSampleIndex = void 0;
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
    }]);

    return TsDemuxer;
  }();

  var _createClass$s = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$s(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Playlist = function () {
    function Playlist(configs) {
      _classCallCheck$s(this, Playlist);

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

    _createClass$s(Playlist, [{
      key: 'push',
      value: function push(ts, duration, discontinue) {
        if (!this._ts[ts]) {
          this._ts[ts] = { duration: duration,
            downloaded: false,
            downloading: false,
            start: this.duration,
            discontinue: !!discontinue
          };
          this._list[this.duration] = ts;
          this.duration += duration;
          this.fragLength += 1;
        }
      }
    }, {
      key: 'deleteFrag',
      value: function deleteFrag(url) {
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
    }, {
      key: 'pushM3U8',
      value: function pushM3U8(data, deletepre) {
        // 常规信息替换
        if (!data) {
          throw new Error('No m3u8 data received.');
        }
        this.version = data.version;
        this.targetduration = data.targetduration;
        if (data.encrypt && !this.encrypt) {
          this.encrypt = data.encrypt;
        }
        // 新分片信息
        if (data.sequence > this.sequence) {
          this.sequence = data.sequence;
          var newfraglist = [];
          for (var i = 0; i < data.frags.length; i++) {
            var frag = data.frags[i];
            if (!this._ts[frag.url]) {
              newfraglist.push(frag.url);
              this.push(frag.url, frag.duration, frag.discontinue);
            }
          }

          if (newfraglist.length < 1) {
            throw new Error('Can not read ts file list.');
          }

          if (deletepre) {
            var tslist = this.getTsList();
            for (var _i = 0; _i < tslist.length; _i++) {
              if (newfraglist.indexOf(tslist[_i]) < 0) {
                this.deleteFrag(tslist[_i]);
              }
            }
          }
        } else {
          throw new Error('Old m3u8 file received, ' + data.sequence);
        }
      }
    }, {
      key: 'getTsList',
      value: function getTsList() {
        return Object.keys(this._ts);
      }
    }, {
      key: 'downloaded',
      value: function downloaded(tsname, isloaded) {
        var ts = this._ts[tsname];
        if (ts) {
          ts.downloaded = isloaded;
        }
      }
    }, {
      key: 'downloading',
      value: function downloading(tsname, loading) {
        var ts = this._ts[tsname];
        if (ts) {
          ts.downloading = loading;
        }
      }
    }, {
      key: 'getTsByName',
      value: function getTsByName(name) {
        return this._ts[name];
      }
    }, {
      key: 'getTs',
      value: function getTs(time) {
        var timelist = Object.keys(this._list);
        var ts = void 0;

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
        timelist = timelist.sort(function (a, b) {
          return parseFloat(a) - parseFloat(b);
        });
        for (var i = 0; i < timelist.length; i++) {
          if (time >= parseInt(timelist[i])) {
            var url = this._list[timelist[i]];
            var downloaded = this._ts[url].downloaded;
            var downloading = this._ts[url].downloading;
            ts = { url: url, downloaded: downloaded, downloading: downloading, time: parseInt(timelist[i]), duration: parseInt(this._ts[url].duration) };
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
    }, {
      key: 'getLastDownloadedTs',
      value: function getLastDownloadedTs() {
        var timelist = Object.keys(this._list);
        var found = void 0;
        for (var i = 0; i < timelist.length; i++) {
          var url = this._list[timelist[i]];
          var downloaded = this._ts[url].downloaded;
          var downloading = this._ts[url].downloading;
          if (downloaded) {
            found = { url: url, downloaded: downloaded, downloading: downloading, time: parseInt(timelist[i]), duration: parseInt(this._ts[url].duration) };
          } else {
            break;
          }
        }

        return found;
      }
    }, {
      key: 'clear',
      value: function clear() {
        this._baseURL = '';
        this._list = {};
        this._ts = {};
        this.version = 0;
        this.sequence = -1;
        this.targetduration = 0;
        this.duration = 0;
      }
    }, {
      key: 'clearDownloaded',
      value: function clearDownloaded() {
        for (var i = 0, l = Object.keys(this._ts).length; i < l; i++) {
          var ts = this._ts[Object.keys(this._ts)[i]];
          ts.downloaded = false;
          ts.downloading = false;
        }
      }
    }, {
      key: 'destroy',
      value: function destroy() {
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
    }, {
      key: 'list',
      get: function get() {
        return this._list;
      }
    }, {
      key: 'baseURL',
      set: function set(baseURL) {
        if (this.baseURL !== baseURL) {
          this.clear();
          this._baseURL = baseURL;
        }
      },
      get: function get() {
        return this._baseURL;
      }
    }]);

    return Playlist;
  }();

  var _createClass$t = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$t(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var LOADER_EVENTS$2 = EVENTS.LOADER_EVENTS;
  var REMUX_EVENTS$3 = EVENTS.REMUX_EVENTS;
  var DEMUX_EVENTS$2 = EVENTS.DEMUX_EVENTS;
  var HLS_EVENTS$1 = EVENTS.HLS_EVENTS;
  var CRYTO_EVENTS$2 = EVENTS.CRYTO_EVENTS;
  var HLS_ERROR = 'HLS_ERROR';

  var HlsLiveController = function () {
    function HlsLiveController(configs) {
      _classCallCheck$t(this, HlsLiveController);

      this.configs = Object.assign({}, configs);
      this.url = '';
      this.baseurl = '';
      this.sequence = 0;
      this._playlist = null;
      this.retrytimes = this.configs.retrytimes || 3;
      this.preloadTime = this.configs.preloadTime;
      this.container = this.configs.container;
      this._m3u8lasttime = 0;
      this._timmer = setInterval(this._checkStatus.bind(this), 50);
      this._lastCheck = 0;
      this._player = this.configs.player;
      this.m3u8Text = null;
    }

    _createClass$t(HlsLiveController, [{
      key: 'init',
      value: function init() {
        // 初始化Buffer （M3U8/TS/Playlist);
        this._context.registry('M3U8_BUFFER', XgBuffer);
        this._context.registry('TS_BUFFER', XgBuffer);
        this._context.registry('TRACKS', Track);

        this._playlist = this._context.registry('PLAYLIST', Playlist)({ autoclear: true });
        this._context.registry('PRE_SOURCE_BUFFER', PreSource);

        this._context.registry('COMPATIBILITY', Compatibility);

        // 初始化M3U8Loader;
        this._m3u8loader = this._context.registry('M3U8_LOADER', FetchLoader)({ buffer: 'M3U8_BUFFER', readtype: 1 });
        this._tsloader = this._context.registry('TS_LOADER', FetchLoader)({ buffer: 'TS_BUFFER', readtype: 3 });

        // 初始化TS Demuxer
        this._context.registry('TS_DEMUXER', TsDemuxer)({ inputbuffer: 'TS_BUFFER' });

        // 初始化MP4 Remuxer
        this._context.registry('MP4_REMUXER', Mp4Remuxer);

        // 初始化MSE
        this.mse = this._context.registry('MSE', MSE)({ container: this.container });
        this.initEvents();
      }
    }, {
      key: 'initEvents',
      value: function initEvents() {
        this.on(LOADER_EVENTS$2.LOADER_COMPLETE, this._onLoadComplete.bind(this));

        this.on(REMUX_EVENTS$3.INIT_SEGMENT, this.mse.addSourceBuffers.bind(this.mse));

        this.on(REMUX_EVENTS$3.MEDIA_SEGMENT, this.mse.doAppend.bind(this.mse));

        this.on(DEMUX_EVENTS$2.METADATA_PARSED, this._onMetadataParsed.bind(this));

        this.on(DEMUX_EVENTS$2.SEI_PARSED, this._handleSEIParsed.bind(this));

        this.on(DEMUX_EVENTS$2.DEMUX_COMPLETE, this._onDemuxComplete.bind(this));

        this.on(LOADER_EVENTS$2.LOADER_ERROR, this._onLoadError.bind(this));

        this.on(DEMUX_EVENTS$2.DEMUX_ERROR, this._onDemuxError.bind(this));

        this.on(REMUX_EVENTS$3.REMUX_ERROR, this._onRemuxError.bind(this));
      }
    }, {
      key: '_onError',
      value: function _onError(type, mod, err, fatal) {
        var error = {
          errorType: type,
          errorDetails: '[' + mod + ']: ' + err.message,
          errorFatal: fatal
        };
        this._player.emit(HLS_ERROR, error);
      }
    }, {
      key: '_onDemuxComplete',
      value: function _onDemuxComplete() {
        this.emit(REMUX_EVENTS$3.REMUX_MEDIA);
      }
    }, {
      key: '_onMetadataParsed',
      value: function _onMetadataParsed(type) {
        this.emit(REMUX_EVENTS$3.REMUX_METADATA, type);
      }
    }, {
      key: '_onLoadError',
      value: function _onLoadError(loader, error) {
        if (!this._tsloader.loading && !this._m3u8loader.loading && this.retrytimes > 1) {
          this.retrytimes--;
          this._onError(LOADER_EVENTS$2.LOADER_ERROR, loader, error, false);
        } else if (this.retrytimes <= 1) {
          this._onError(LOADER_EVENTS$2.LOADER_ERROR, loader, error, true);
          this.emit(HLS_EVENTS$1.RETRY_TIME_EXCEEDED);
          this.mse.endOfStream();
        }
      }
    }, {
      key: '_onDemuxError',
      value: function _onDemuxError(mod, error, fatal) {
        if (fatal === undefined) {
          fatal = true;
        }
        this._onError(LOADER_EVENTS$2.LOADER_ERROR, mod, error, fatal);
      }
    }, {
      key: '_onRemuxError',
      value: function _onRemuxError(mod, error, fatal) {
        if (fatal === undefined) {
          fatal = true;
        }
        this._onError(REMUX_EVENTS$3.REMUX_ERROR, mod, error, fatal);
      }
    }, {
      key: '_handleSEIParsed',
      value: function _handleSEIParsed(sei) {
        this._player.emit('SEI_PARSED', sei);
      }
    }, {
      key: '_onLoadComplete',
      value: function _onLoadComplete(buffer) {
        if (buffer.TAG === 'M3U8_BUFFER') {
          var mdata = void 0;
          try {
            this.m3u8Text = buffer.shift();
            mdata = M3U8Parser.parse(this.m3u8Text, this.baseurl);
          } catch (error) {
            this._onError('M3U8_PARSER_ERROR', 'M3U8_PARSER', error, false);
          }

          if (!mdata) {
            if (this.retrytimes > 0) {
              this.retrytimes--;
              this._preload();
            } else {
              this.emit(HLS_EVENTS$1.RETRY_TIME_EXCEEDED);
              this.mse.endOfStream();
            }
            return;
          }

          try {
            this._playlist.pushM3U8(mdata, true);
          } catch (error) {
            this._onError('M3U8_PARSER_ERROR', 'PLAYLIST', error, false);
          }

          if (this._playlist.encrypt && this._playlist.encrypt.uri && !this._playlist.encrypt.key) {
            this._context.registry('DECRYPT_BUFFER', XgBuffer)();
            this._context.registry('KEY_BUFFER', XgBuffer)();
            this._tsloader.buffer = 'DECRYPT_BUFFER';
            this._keyLoader = this._context.registry('KEY_LOADER', FetchLoader)({ buffer: 'KEY_BUFFER', readtype: 3 });
            this.emitTo('KEY_LOADER', LOADER_EVENTS$2.LADER_START, this._playlist.encrypt.uri);
          } else {
            this._m3u8Loaded(mdata);
          }
        } else if (buffer.TAG === 'TS_BUFFER') {
          this.retrytimes = this.configs.retrytimes || 3;
          this._playlist.downloaded(this._tsloader.url, true);
          this.emit(DEMUX_EVENTS$2.DEMUX_START);
        } else if (buffer.TAG === 'DECRYPT_BUFFER') {
          this.retrytimes = this.configs.retrytimes || 3;
          this._playlist.downloaded(this._tsloader.url, true);
          this.emitTo('CRYPTO', CRYTO_EVENTS$2.START_DECRYPT);
        } else if (buffer.TAG === 'KEY_BUFFER') {
          this.retrytimes = this.configs.retrytimes || 3;
          this._playlist.encrypt.key = buffer.shift();
          this._crypto = this._context.registry('CRYPTO', Crypto)({
            key: this._playlist.encrypt.key,
            iv: this._playlist.encrypt.ivb,
            method: this._playlist.encrypt.method,
            inputbuffer: 'DECRYPT_BUFFER',
            outputbuffer: 'TS_BUFFER'
          });
          this._crypto.on(CRYTO_EVENTS$2.DECRYPTED, this._onDcripted.bind(this));
        }
      }
    }, {
      key: '_onDcripted',
      value: function _onDcripted() {
        this.emit(DEMUX_EVENTS$2.DEMUX_START);
      }
    }, {
      key: '_m3u8Loaded',
      value: function _m3u8Loaded(mdata) {
        if (!this.preloadTime) {
          this.preloadTime = this._playlist.targetduration ? this._playlist.targetduration : 5;
        }
        if (this._playlist.fragLength > 0 && this._playlist.sequence < mdata.sequence) {
          this.retrytimes = this.configs.retrytimes || 3;
        } else {
          if (this.retrytimes > 0) {
            this.retrytimes--;
            this._preload();
          } else {
            this.emit(HLS_EVENTS$1.RETRY_TIME_EXCEEDED);
            this.mse.endOfStream();
          }
        }
      }
    }, {
      key: '_checkStatus',
      value: function _checkStatus() {
        if (this.retrytimes < 1 && new Date().getTime() - this._lastCheck < 10000) {
          return;
        }
        this._lastCheck = new Date().getTime();
        if (this.container.buffered.length < 1) {
          this._preload();
        } else {
          // Check for load.
          var currentTime = this.container.currentTime;
          var bufferstart = this.container.buffered.start(this.container.buffered.length - 1);
          if (this.container.readyState <= 2) {
            if (currentTime < bufferstart) {
              this.container.currentTime = bufferstart;
              currentTime = bufferstart;
            } else {
              this._preload();
            }
          }
          var bufferend = this.container.buffered.end(this.container.buffered.length - 1);
          if (currentTime < bufferend - this.preloadTime * 2) {
            this.container.currentTime = bufferend - this.preloadTime * 2;
          }
          if (bufferend > this.preloadTime * 2) {
            this.mse.remove(bufferend - this.preloadTime * 2);
          }
          if (currentTime > bufferend - this.preloadTime) {
            this._preload();
          }
        }
      }
    }, {
      key: '_preload',
      value: function _preload() {
        if (this._tsloader.loading || this._m3u8loader.loading) {
          return;
        }
        var frag = this._playlist.getTs();

        if (frag && !frag.downloaded && !frag.downloading) {
          this._playlist.downloading(frag.url, true);
          this.emitTo('TS_LOADER', LOADER_EVENTS$2.LADER_START, frag.url);
        } else {
          var preloadTime = this.preloadTime ? this.preloadTime : 0;
          var current = new Date().getTime();
          if ((!frag || frag.downloaded) && (current - this._m3u8lasttime) / 1000 > preloadTime) {
            this._m3u8lasttime = current;
            this.emitTo('M3U8_LOADER', LOADER_EVENTS$2.LADER_START, this.url);
          }
        }
      }
    }, {
      key: 'load',
      value: function load(url) {
        this.baseurl = M3U8Parser.parseURL(url);
        this.url = url;
        this._preload();
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        clearInterval(this._timmer);
        this.off(LOADER_EVENTS$2.LOADER_COMPLETE, this._onLoadComplete);
        this.off(REMUX_EVENTS$3.INIT_SEGMENT, this.mse.addSourceBuffers);
        this.off(REMUX_EVENTS$3.MEDIA_SEGMENT, this.mse.doAppend);
        // this.off(REMUX_EVENTS.REMUX_ERROR);
        this.off(DEMUX_EVENTS$2.METADATA_PARSED, this._onMetadataParsed);
        this.off(DEMUX_EVENTS$2.DEMUX_COMPLETE, this._onDemuxComplete);

        this.mse = null;
        this.m3u8Text = null;
      }
    }]);

    return HlsLiveController;
  }();

  var _typeof$4 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  var _createClass$u = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  var _get$1 = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;if (getter === undefined) {
        return undefined;
      }return getter.call(receiver);
    }
  };

  function _classCallCheck$u(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn$2(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof$4(call)) === "object" || typeof call === "function") ? call : self;
  }

  function _inherits$2(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof$4(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  var HlsAllowedEvents$1 = EVENTS.HlsAllowedEvents;
  var REMUX_EVENTS$4 = EVENTS.REMUX_EVENTS;

  var HlsLivePlayer = function (_Player) {
    _inherits$2(HlsLivePlayer, _Player);

    function HlsLivePlayer(options) {
      _classCallCheck$u(this, HlsLivePlayer);

      var _this = _possibleConstructorReturn$2(this, (HlsLivePlayer.__proto__ || Object.getPrototypeOf(HlsLivePlayer)).call(this, options));

      _this.hlsOps = {};
      _this.util = Player.util;
      _this.util.deepCopy(_this.hlsOps, options);
      _this._context = new Context(HlsAllowedEvents$1);
      _this.started = false;
      return _this;
    }

    _createClass$u(HlsLivePlayer, [{
      key: '_initEvents',
      value: function _initEvents() {
        var _this2 = this;

        this.__core__.once(REMUX_EVENTS$4.INIT_SEGMENT, function () {
          var mse = _this2._context.getInstance('MSE');
          if (!_this2.started) {
            var live = _this2.util.createDom('xg-live', '正在直播', {}, 'xgplayer-live');
            _this2.util.addClass(_this2.root, 'xgplayer-is-live');
            _this2.controls.appendChild(live);
          }
          _this2.started = true;
          _get$1(HlsLivePlayer.prototype.__proto__ || Object.getPrototypeOf(HlsLivePlayer.prototype), 'start', _this2).call(_this2, mse.url);
        });

        this.once('canplay', function () {
          _this2.video.play();
        });
      }
    }, {
      key: 'start',
      value: function start() {
        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.config.url;

        if (!url || this.started) {
          return;
        }
        this.__core__ = this._context.registry('HLS_LIVE_CONTROLLER', HlsLiveController)({ player: this, container: this.video, preloadTime: this.config.preloadTime });
        this._context.init();
        this.url = url;
        this.__core__.load(url);
        this._initEvents();
      }
    }, {
      key: 'play',
      value: function play() {
        if (this.started) {
          this._context.destroy();
          this._context = new Context(HlsAllowedEvents$1);
          this.__core__ = this._context.registry('HLS_LIVE_CONTROLLER', HlsLiveController)({ player: this, container: this.video, preloadTime: this.config.preloadTime });
          this._context.init();
          this._initEvents();
          this.__core__.load(this.url);
        }
        _get$1(HlsLivePlayer.prototype.__proto__ || Object.getPrototypeOf(HlsLivePlayer.prototype), 'play', this).call(this);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this._context.destroy();
        _get$1(HlsLivePlayer.prototype.__proto__ || Object.getPrototypeOf(HlsLivePlayer.prototype), 'destroy', this).call(this);
      }
    }, {
      key: 'src',
      set: function set(url) {
        this._context.destroy();
        this._context = new Context(HlsAllowedEvents$1);
        this.__core__ = this._context.registry('HLS_LIVE_CONTROLLER', HlsLiveController)({ player: this, container: this.video, preloadTime: this.config.preloadTime });
        this._context.init();
        this._initEvents();
        this.__core__.load(url);
      }
    }]);

    return HlsLivePlayer;
  }(Player);

  var _createClass$v = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$v(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var isObjectFilled$1 = function isObjectFilled(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] === null) {
          return false;
        }
      }
    }
    return true;
  };

  var MediaInfo$1 = function () {
    function MediaInfo() {
      _classCallCheck$v(this, MediaInfo);

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

    _createClass$v(MediaInfo, [{
      key: "isComplete",
      value: function isComplete() {
        return MediaInfo.isBaseInfoReady(this) && MediaInfo.isVideoReady(this) && MediaInfo.isAudioReady(this);
      }
    }], [{
      key: "isBaseInfoReady",
      value: function isBaseInfoReady(mediaInfo) {
        return isObjectFilled$1(mediaInfo);
      }
    }, {
      key: "isVideoReady",
      value: function isVideoReady(mediaInfo) {
        if (!mediaInfo.hasVideo) {
          return true;
        }

        return isObjectFilled$1(mediaInfo.video);
      }
    }, {
      key: "isAudioReady",
      value: function isAudioReady(mediaInfo) {
        if (!mediaInfo.hasAudio) {
          return true;
        }

        return isObjectFilled$1(mediaInfo.video);
      }
    }]);

    return MediaInfo;
  }();

  var _typeof$5 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  var _get$2 = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;if (getter === undefined) {
        return undefined;
      }return getter.call(receiver);
    }
  };

  var _createClass$w = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _possibleConstructorReturn$3(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof$5(call)) === "object" || typeof call === "function") ? call : self;
  }

  function _inherits$3(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof$5(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _classCallCheck$w(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var DIRECT_EMIT_FLAG$1 = '__TO__';

  var Context$1 = function () {
    function Context() {
      var allowedEvents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      _classCallCheck$w(this, Context);

      this._emitter = new EventEmitter();
      if (!this._emitter.off) {
        this._emitter.off = this._emitter.removeListener;
      }
      this._instanceMap = {}; // 所有的解码流程实例
      this._clsMap = {}; // 构造函数的map
      this._inited = false;
      this.mediaInfo = new MediaInfo$1();
      this.allowedEvents = allowedEvents;
      this._hooks = {}; // 注册在事件前/后的钩子，例如 before('DEMUX_COMPLETE')
    }

    /**
     * 从上下文中获取解码流程实例，如果没有实例，构造一个
     * @param tag
     * @param args
     * @returns {*}
     */

    _createClass$w(Context, [{
      key: 'getInstance',
      value: function getInstance(tag) {
        var instance = this._instanceMap[tag];
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

    }, {
      key: 'initInstance',
      value: function initInstance(tag) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var a = args[0],
            b = args[1],
            c = args[2],
            d = args[3];

        if (this._clsMap[tag]) {
          var newInstance = new this._clsMap[tag](a, b, c, d);
          this._instanceMap[tag] = newInstance;
          if (newInstance.init) {
            newInstance.init(); // TODO: lifecircle
          }
          return newInstance;
        } else {
          throw new Error(tag + "\u672A\u5728context\u4E2D\u6CE8\u518C");
        }
      }

      /**
       * 避免大量的initInstance调用，初始化所有的组件
       * @param config
       */

    }, {
      key: 'init',
      value: function init(config) {
        if (this._inited) {
          return;
        }
        for (var tag in this._clsMap) {
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

    }, {
      key: 'registry',
      value: function registry(tag, cls) {
        var _this2 = this;

        var emitter = this._emitter;
        var checkMessageName = this._isMessageNameValid.bind(this);
        var self = this;
        var enhanced = function (_cls) {
          _inherits$3(enhanced, _cls);

          function enhanced(a, b, c) {
            _classCallCheck$w(this, enhanced);

            var _this = _possibleConstructorReturn$3(this, (enhanced.__proto__ || Object.getPrototypeOf(enhanced)).call(this, a, b, c));

            _this.listeners = {};
            _this.onceListeners = {};
            _this.TAG = tag;
            _this._context = self;
            return _this;
          }

          _createClass$w(enhanced, [{
            key: 'on',
            value: function on(messageName, callback) {
              checkMessageName(messageName);

              if (this.listeners[messageName]) {
                this.listeners[messageName].push(callback);
              } else {
                this.listeners[messageName] = [callback];
              }

              emitter.on('' + messageName + DIRECT_EMIT_FLAG$1 + tag, callback); // 建立定向通信监听
              return emitter.on(messageName, callback);
            }

            /**
             * 在某个事件触发前执行
             * @param messageName
             * @param callback
             */

          }, {
            key: 'before',
            value: function before(messageName, callback) {
              checkMessageName(messageName);
              if (self._hooks[messageName]) {
                self._hooks[messageName].push(callback);
              } else {
                self._hooks[messageName] = [callback];
              }
            }
          }, {
            key: 'once',
            value: function once(messageName, callback) {
              checkMessageName(messageName);

              if (this.onceListeners[messageName]) {
                this.onceListeners[messageName].push(callback);
              } else {
                this.onceListeners[messageName] = [callback];
              }

              emitter.once('' + messageName + DIRECT_EMIT_FLAG$1 + tag, callback);
              return emitter.once(messageName, callback);
            }
          }, {
            key: 'emit',
            value: function emit(messageName) {
              checkMessageName(messageName);
              // console.log('emit ', messageName);

              var beforeList = self._hooks ? self._hooks[messageName] : null;

              if (beforeList) {
                for (var i = 0, len = beforeList.length; i < len; i++) {
                  var callback = beforeList[i];
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

          }, {
            key: 'emitTo',
            value: function emitTo(tag, messageName) {
              checkMessageName(messageName);

              for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
                args[_key3 - 2] = arguments[_key3];
              }

              return emitter.emit.apply(emitter, ['' + messageName + DIRECT_EMIT_FLAG$1 + tag].concat(args));
            }
          }, {
            key: 'off',
            value: function off(messageName, callback) {
              checkMessageName(messageName);
              return emitter.off(messageName, callback);
            }
          }, {
            key: 'removeListeners',
            value: function removeListeners() {
              var hasOwn = Object.prototype.hasOwnProperty.bind(this.listeners);

              for (var messageName in this.listeners) {
                if (hasOwn(messageName)) {
                  var callbacks = this.listeners[messageName] || [];
                  for (var i = 0; i < callbacks.length; i++) {
                    var callback = callbacks[i];
                    emitter.off(messageName, callback);
                    emitter.off('' + messageName + DIRECT_EMIT_FLAG$1 + tag, callback);
                  }
                }
              }

              for (var _messageName in this.onceListeners) {
                if (hasOwn(_messageName)) {
                  var _callbacks = this.onceListeners[_messageName] || [];
                  for (var _i = 0; _i < _callbacks.length; _i++) {
                    var _callback = _callbacks[_i];
                    emitter.off(_messageName, _callback);
                    emitter.off('' + _messageName + DIRECT_EMIT_FLAG$1 + tag, _callback);
                  }
                }
              }
            }

            /**
             * 在组件销毁时，默认将它注册的事件全部卸载，确保不会造成内存泄漏
             */

          }, {
            key: 'destroy',
            value: function destroy() {
              // step1 unlisten events
              this.removeListeners();
              this.listeners = {};

              // step2 release from context
              delete self._instanceMap[tag];
              if (_get$2(enhanced.prototype.__proto__ || Object.getPrototypeOf(enhanced.prototype), 'destroy', this)) {
                return _get$2(enhanced.prototype.__proto__ || Object.getPrototypeOf(enhanced.prototype), 'destroy', this).call(this);
              }
            }
          }]);

          return enhanced;
        }(cls);
        this._clsMap[tag] = enhanced;

        /**
         * get instance immediately
         * e.g const instance = context.registry(tag, Cls)(config)
         * */
        return function () {
          for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }

          return _this2.initInstance.apply(_this2, [tag].concat(args));
        };
      }

      /**
       * 各个模块处理seek
       * @param time
       */

    }, {
      key: 'seek',
      value: function seek(time) {
        this._emitter.emit(EVENTS.PLAYER_EVENTS.SEEK, time);
      }

      /**
       * 对存在的实例进行
       */

    }, {
      key: 'destroyInstances',
      value: function destroyInstances() {
        var _this3 = this;

        Object.keys(this._instanceMap).forEach(function (tag) {
          if (_this3._instanceMap[tag].destroy) {
            _this3._instanceMap[tag].destroy();
          }
        });
      }

      /**
       * 编解码流程无需关注事件的解绑
       */

    }, {
      key: 'destroy',
      value: function destroy() {
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

    }, {
      key: '_isMessageNameValid',
      value: function _isMessageNameValid(messageName) {
        if (!this.allowedEvents.indexOf(messageName) < 0) {
          throw new Error('unregistered message name: ' + messageName);
        }
      }
    }]);

    return Context;
  }();

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;_e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }return _arr;
    }return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var _createClass$x = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$x(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var MediaSample = function () {
    function MediaSample(info) {
      var _this = this;

      _classCallCheck$x(this, MediaSample);

      var _default = MediaSample.getDefaultInf();

      if (!info || Object.prototype.toString.call(info) !== '[object Object]') {
        return _default;
      }
      var sample = Object.assign({}, _default, info);

      Object.entries(sample).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        _this[k] = v;
      });
    }

    _createClass$x(MediaSample, null, [{
      key: 'getDefaultInf',
      value: function getDefaultInf() {
        return {
          dts: null,
          pts: null,
          duration: null,
          position: null,
          isRAP: false, // is Random access point
          originDts: null
        };
      }
    }]);

    return MediaSample;
  }();

  var _createClass$y = function () {
      function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
      }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
      };
  }();

  function _classCallCheck$y(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
      }
  }

  var MediaSegment = function () {
      function MediaSegment() {
          _classCallCheck$y(this, MediaSegment);

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

      _createClass$y(MediaSegment, [{
          key: "addRAP",
          value: function addRAP(sample) {
              sample.isRAP = true;
              this.randomAccessPoints.push(sample);
          }
      }]);

      return MediaSegment;
  }();

  var _createClass$z = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$z(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var MediaSegmentList = function () {
    function MediaSegmentList(type) {
      _classCallCheck$z(this, MediaSegmentList);

      this._type = type;
      this._list = [];
      this._lastAppendLocation = -1; // cached last insert location
    }

    _createClass$z(MediaSegmentList, [{
      key: "isEmpty",
      value: function isEmpty() {
        return this._list.length === 0;
      }
    }, {
      key: "clear",
      value: function clear() {
        this._list = [];
        this._lastAppendLocation = -1;
      }
    }, {
      key: "_searchNearestSegmentBefore",
      value: function _searchNearestSegmentBefore(beginDts) {
        var list = this._list;
        if (list.length === 0) {
          return -2;
        }
        var last = list.length - 1;
        var mid = 0;
        var lbound = 0;
        var ubound = last;

        var idx = 0;

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
    }, {
      key: "_searchNearestSegmentAfter",
      value: function _searchNearestSegmentAfter(beginDts) {
        return this._searchNearestSegmentBefore(beginDts) + 1;
      }
    }, {
      key: "append",
      value: function append(segment) {
        var list = this._list;
        var lastAppendIdx = this._lastAppendLocation;
        var insertIdx = 0;

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
    }, {
      key: "getLastSegmentBefore",
      value: function getLastSegmentBefore(beginDts) {
        var idx = this._searchNearestSegmentBefore(beginDts);
        if (idx >= 0) {
          return this._list[idx];
        } else {
          // -1
          return null;
        }
      }
    }, {
      key: "getLastSampleBefore",
      value: function getLastSampleBefore(beginDts) {
        var segment = this.getLastSegmentBefore(beginDts);
        if (segment !== null) {
          return segment.lastSample;
        } else {
          return null;
        }
      }
    }, {
      key: "getLastRAPBefore",
      value: function getLastRAPBefore(beginDts) {
        var segmentIdx = this._searchNearestSegmentBefore(beginDts);
        var randomAccessPoints = this._list[segmentIdx].randomAccessPoints;
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
    }, {
      key: "type",
      get: function get() {
        return this._type;
      }
    }, {
      key: "length",
      get: function get() {
        return this._list.length;
      }
    }]);

    return MediaSegmentList;
  }();

  var _debounce = (function (fn, wait) {
    var lastTime = Date.now();
    var timer = null;
    var isFirstTime = true;

    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var now = Date.now();
      if (isFirstTime) {
        lastTime = Date.now();
        isFirstTime = false;
        fn.apply(undefined, args);
      }
      if (now - lastTime > wait) {
        lastTime = now;
        fn.apply(undefined, args);
      } else {
        if (timer) {
          window.clearTimeout(timer);
        }
        timer = setTimeout(function () {
          fn.apply(undefined, args);
        }, wait);
      }
    };
  });

  var debounce = _debounce;

  var _createClass$A = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$A(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var LOADER_EVENTS$3 = EVENTS.LOADER_EVENTS;
  var REMUX_EVENTS$5 = EVENTS.REMUX_EVENTS;
  var DEMUX_EVENTS$3 = EVENTS.DEMUX_EVENTS;
  var HLS_EVENTS$2 = EVENTS.HLS_EVENTS;
  var CRYTO_EVENTS$3 = EVENTS.CRYTO_EVENTS;
  var HLS_ERROR$1 = 'HLS_ERROR';

  var HlsVodController = function () {
    function HlsVodController(configs) {
      _classCallCheck$A(this, HlsVodController);

      this.configs = Object.assign({}, configs);
      this.url = '';
      this.baseurl = '';
      this.sequence = 0;
      this._playlist = null;
      this.retrytimes = this.configs.retrytimes || 3;
      this.container = this.configs.container;
      this.preloadTime = this.configs.preloadTime || 5;
      this.mse = this.configs.mse;
      this._lastSeekTime = 0;
      this._player = this.configs.player;
      this.m3u8Text = null;
    }

    _createClass$A(HlsVodController, [{
      key: 'init',
      value: function init() {
        // 初始化Buffer （M3U8/TS/Playlist);
        this._context.registry('M3U8_BUFFER', XgBuffer);
        this._tsBuffer = this._context.registry('TS_BUFFER', XgBuffer)();
        this._tracks = this._context.registry('TRACKS', Track)();

        this._playlist = this._context.registry('PLAYLIST', Playlist)({ autoclear: true });
        this._presource = this._context.registry('PRE_SOURCE_BUFFER', PreSource)();

        this._compat = this._context.registry('COMPATIBILITY', Compatibility)();

        // 初始化M3U8Loader;
        this._context.registry('M3U8_LOADER', FetchLoader)({ buffer: 'M3U8_BUFFER', readtype: 1 });
        this._tsloader = this._context.registry('TS_LOADER', FetchLoader)({ buffer: 'TS_BUFFER', readtype: 3 });

        // 初始化TS Demuxer
        this._context.registry('TS_DEMUXER', TsDemuxer)({ inputbuffer: 'TS_BUFFER' });

        // 初始化MP4 Remuxer
        this._context.registry('MP4_REMUXER', Mp4Remuxer)(this._player.currentTime);

        // 初始化MSE
        if (!this.mse) {
          this.mse = new MSE({ container: this.container, preloadTime: this.preloadTime }, this._context);
          this.mse.init();
        }
        this.initEvents();
      }
    }, {
      key: 'initEvents',
      value: function initEvents() {
        this.on(LOADER_EVENTS$3.LOADER_COMPLETE, this._onLoaderCompete.bind(this));

        this.on(LOADER_EVENTS$3.LOADER_ERROR, this._onLoadError.bind(this));

        this.on(REMUX_EVENTS$5.INIT_SEGMENT, this._onInitSegment.bind(this));

        this.on(DEMUX_EVENTS$3.SEI_PARSED, this._handleSEIParsed.bind(this));

        this.on(REMUX_EVENTS$5.MEDIA_SEGMENT, this._onMediaSegment.bind(this));

        this.on(DEMUX_EVENTS$3.METADATA_PARSED, this._onMetadataParsed.bind(this));

        this.on(DEMUX_EVENTS$3.DEMUX_COMPLETE, this._onDemuxComplete.bind(this));

        this.on(DEMUX_EVENTS$3.DEMUX_ERROR, this._onDemuxError.bind(this));

        this.on(REMUX_EVENTS$5.REMUX_ERROR, this._onRemuxError.bind(this));

        this.on('TIME_UPDATE', this._onTimeUpdate.bind(this));

        this.on('WAITING', this._onWaiting.bind(this));
      }
    }, {
      key: '_onError',
      value: function _onError(type, mod, err, fatal) {
        var error = {
          errorType: type,
          errorDetails: '[' + mod + ']: ' + err.message,
          errorFatal: fatal
        };
        this._player && this._player.emit(HLS_ERROR$1, error);
      }
    }, {
      key: '_onLoadError',
      value: function _onLoadError(mod, error) {
        this._onError(LOADER_EVENTS$3.LOADER_ERROR, mod, error, true);
        this.emit(HLS_EVENTS$2.RETRY_TIME_EXCEEDED);
      }
    }, {
      key: '_onDemuxError',
      value: function _onDemuxError(mod, error, fatal) {
        if (fatal === undefined) {
          fatal = true;
        }
        this._onError(LOADER_EVENTS$3.LOADER_ERROR, mod, error, fatal);
      }
    }, {
      key: '_onRemuxError',
      value: function _onRemuxError(mod, error, fatal) {
        if (fatal === undefined) {
          fatal = true;
        }
        this._onError(REMUX_EVENTS$5.REMUX_ERROR, mod, error, fatal);
      }
    }, {
      key: '_onWaiting',
      value: function _onWaiting(container) {
        var end = true;

        var playListLen = Object.keys(this._playlist.list).length;
        if (!playListLen) {
          return;
        }

        for (var i = 0; i < Object.keys(this._playlist.list).length; i++) {
          if (this.container.currentTime * 1000 < parseInt(Object.keys(this._playlist.list)[i])) {
            end = false;
          }
        }
        if (end) {
          var ts = this._playlist.getTs(this.container.currentTime * 1000);
          if (!ts) {
            this._player.emit('ended');
            this.mse.endOfStream();
          } else {
            if (ts.downloaded) {
              this._player.emit('ended');
              this.mse.endOfStream();
            }
          }
        }
      }
    }, {
      key: '_onTimeUpdate',
      value: function _onTimeUpdate(container) {
        this._preload(container.currentTime);
      }
    }, {
      key: '_onDemuxComplete',
      value: function _onDemuxComplete() {
        this.emit(REMUX_EVENTS$5.REMUX_MEDIA);
      }
    }, {
      key: '_handleSEIParsed',
      value: function _handleSEIParsed(sei) {
        this._player.emit('SEI_PARSED', sei);
      }
    }, {
      key: '_onMetadataParsed',
      value: function _onMetadataParsed(type) {
        var duration = parseInt(this._playlist.duration);
        if (type === 'video') {
          this._tracks.videoTrack.meta.duration = duration;
        } else if (type === 'audio') {
          this._tracks.audioTrack.meta.duration = duration;
        }
        this.emit(REMUX_EVENTS$5.REMUX_METADATA, type);
      }
    }, {
      key: '_onMediaSegment',
      value: function _onMediaSegment() {
        if (Object.keys(this.mse.sourceBuffers).length < 1) {
          this.mse.addSourceBuffers();
        }

        this.mse.doAppend();
      }
    }, {
      key: '_onInitSegment',
      value: function _onInitSegment() {
        this.mse.addSourceBuffers();
      }
    }, {
      key: '_onLoaderCompete',
      value: function _onLoaderCompete(buffer) {
        if (buffer.TAG === 'M3U8_BUFFER') {
          this.m3u8Text = buffer.shift();
          var mdata = M3U8Parser.parse(this.m3u8Text, this.baseurl);
          try {
            this._playlist.pushM3U8(mdata);
          } catch (error) {
            this._onError('M3U8_PARSER_ERROR', 'PLAYLIST', error, true);
          }
          if (this._playlist.encrypt && this._playlist.encrypt.uri && !this._playlist.encrypt.key) {
            this._context.registry('DECRYPT_BUFFER', XgBuffer)();
            this._context.registry('KEY_BUFFER', XgBuffer)();
            this._tsloader.buffer = 'DECRYPT_BUFFER';
            this._keyLoader = this._context.registry('KEY_LOADER', FetchLoader)({ buffer: 'KEY_BUFFER', readtype: 3 });
            this.emitTo('KEY_LOADER', LOADER_EVENTS$3.LADER_START, this._playlist.encrypt.uri);
          } else {
            if (!this.preloadTime) {
              if (this._playlist.targetduration) {
                this.preloadTime = this._playlist.targetduration;
                this.mse.preloadTime = this._playlist.targetduration;
              } else {
                this.preloadTime = 5;
                this.mse.preloadTime = 5;
              }
            }

            var frag = this._playlist.getTs(this._player.currentTime * 1000);
            if (frag) {
              this._playlist.downloading(frag.url, true);
              this.emitTo('TS_LOADER', LOADER_EVENTS$3.LADER_START, frag.url);
            } else {
              if (this.retrytimes > 0) {
                this.retrytimes--;
                this.emitTo('M3U8_LOADER', LOADER_EVENTS$3.LADER_START, this.url);
              }
            }
          }
        } else if (buffer.TAG === 'TS_BUFFER') {
          this._preload(this.mse.container.currentTime);
          this._playlist.downloaded(this._tsloader.url, true);
          this.emit(DEMUX_EVENTS$3.DEMUX_START, Object.assign({ url: this._tsloader.url }, this._playlist._ts[this._tsloader.url]));
        } else if (buffer.TAG === 'DECRYPT_BUFFER') {
          this.retrytimes = this.configs.retrytimes || 3;
          this._playlist.downloaded(this._tsloader.url, true);
          this.emitTo('CRYPTO', CRYTO_EVENTS$3.START_DECRYPT, Object.assign({ url: this._tsloader.url }, this._playlist._ts[this._tsloader.url]));
        } else if (buffer.TAG === 'KEY_BUFFER') {
          this.retrytimes = this.configs.retrytimes || 3;
          this._playlist.encrypt.key = buffer.shift();
          this._crypto = this._context.registry('CRYPTO', Crypto)({
            key: this._playlist.encrypt.key,
            iv: this._playlist.encrypt.ivb,
            method: this._playlist.encrypt.method,
            inputbuffer: 'DECRYPT_BUFFER',
            outputbuffer: 'TS_BUFFER'
          });

          this._crypto.on(CRYTO_EVENTS$3.DECRYPTED, this._onDcripted.bind(this));

          var _frag = this._playlist.getTs();
          if (_frag) {
            this._playlist.downloading(_frag.url, true);
            this.emitTo('TS_LOADER', LOADER_EVENTS$3.LADER_START, _frag.url);
          } else {
            if (this.retrytimes > 0) {
              this.retrytimes--;
              this.emitTo('M3U8_LOADER', LOADER_EVENTS$3.LADER_START, this.url);
            }
          }
        }
      }
    }, {
      key: '_onDcripted',
      value: function _onDcripted() {
        this.emit(DEMUX_EVENTS$3.DEMUX_START);
      }
    }, {
      key: 'seek',
      value: function seek(time) {
        var video = this._player.video;

        for (var i = 0; i < video.buffered.length; i++) {
          if (time >= video.buffered.start(i) && time < video.buffered.end(i)) {
            // this._playlist.clearDownloaded();
            return;
          }
        }

        this._lastSeekTime = time;
        this._tsloader.destroy();
        this._tsloader = this._context.registry('TS_LOADER', FetchLoader)({ buffer: 'TS_BUFFER', readtype: 3 });
        if (this._presource.sources.video) {
          this._presource.sources.video.data = [];
        }
        if (this._presource.sources.audio) {
          this._presource.sources.audio.data = [];
        }
        if (this._tracks.audioTrack) {
          this._tracks.audioTrack.samples = [];
        }
        if (this._tracks.audioTrack) {
          this._tracks.videoTrack.samples = [];
        }

        if (this._compat) {
          this._compat.reset();
        }

        if (this._tsBuffer) {
          this._tsBuffer.array = [];
          this._tsBuffer.length = 0;
          this._tsBuffer.offset = 0;
        }

        this._playlist.clearDownloaded();
        this._context.seek(time);
        this._preload(time);
      }
    }, {
      key: 'load',
      value: function load(url) {
        this.baseurl = M3U8Parser.parseURL(url);
        this.url = url;
        this.emitTo('M3U8_LOADER', LOADER_EVENTS$3.LADER_START, url);
      }
    }, {
      key: '_preload',
      value: function _preload(time) {
        time = Math.floor(time);
        if (this._tsloader.loading) {
          return;
        }
        var video = this.mse.container;
        // Get current time range
        var currentbufferend = -1;
        if (!time && video.buffered.length) {
          time = video.buffered.end(0);
        }

        for (var i = 0; i < video.buffered.length; i++) {
          if (time >= video.buffered.start(i) && time < video.buffered.end(i)) {
            currentbufferend = video.buffered.end(i);
          }
        }

        if (currentbufferend < 0) {
          var frag = this._playlist.getTs((time + 0.5) * 1000); // FIXME: Last frame buffer shortens duration
          if (frag && !frag.downloading && !frag.downloaded) {
            this._playlist.downloading(frag.url, true);
            this.emitTo('TS_LOADER', LOADER_EVENTS$3.LADER_START, frag.url);
          }
        } else if (currentbufferend < time + this.preloadTime) {
          var _frag2 = this._playlist.getLastDownloadedTs() || this._playlist.getTs(currentbufferend * 1000);

          if (!_frag2) {
            return;
          }

          // let fragend = frag ? (frag.time + frag.duration) / 1000 : 0;

          var curTime = _frag2.time + _frag2.duration;
          var curFragTime = _frag2.time;

          if (_frag2.downloaded) {
            var loopMax = 1000;
            while (loopMax-- > 0) {
              curTime += 10;
              _frag2 = this._playlist.getTs(curTime);
              if (!_frag2 || _frag2.time > curFragTime) {
                break;
              }
            }
          }

          if (_frag2 && !_frag2.downloading && !_frag2.downloaded) {
            this._playlist.downloading(_frag2.url, true);
            this.emitTo('TS_LOADER', LOADER_EVENTS$3.LADER_START, _frag2.url);
          }
        }
      }
    }, {
      key: 'destory',
      value: function destory() {
        this.configs = {};
        this.url = '';
        this.baseurl = '';
        this.sequence = 0;
        this._playlist = null;
        this.retrytimes = 3;
        this.container = undefined;
        this.preloadTime = 5;
        this._lastSeekTime = 0;
        this.m3u8Text = null;
        this.mse = null;

        this.off(LOADER_EVENTS$3.LOADER_COMPLETE, this._onLoaderCompete);

        this.off(REMUX_EVENTS$5.INIT_SEGMENT, this._onInitSegment);

        this.off(REMUX_EVENTS$5.MEDIA_SEGMENT, this._onMediaSegment);

        this.off(DEMUX_EVENTS$3.METADATA_PARSED, this._onMetadataParsed);

        this.off(DEMUX_EVENTS$3.DEMUX_COMPLETE, this._onDemuxComplete);

        this.off('TIME_UPDATE', this._onTimeUpdate);

        this.off('WAITING', this._onWaiting);
      }
    }]);

    return HlsVodController;
  }();

  var _typeof$6 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  var _createClass$B = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  var _set = function set(object, property, value, receiver) {
    var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);if (parent !== null) {
        set(parent, property, value, receiver);
      }
    } else if ("value" in desc && desc.writable) {
      desc.value = value;
    } else {
      var setter = desc.set;if (setter !== undefined) {
        setter.call(receiver, value);
      }
    }return value;
  };

  var _get$3 = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;if (getter === undefined) {
        return undefined;
      }return getter.call(receiver);
    }
  };

  function _classCallCheck$B(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn$4(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof$6(call)) === "object" || typeof call === "function") ? call : self;
  }

  function _inherits$4(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof$6(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var HlsAllowedEvents$2 = EVENTS.HlsAllowedEvents;
  var REMUX_EVENTS$6 = EVENTS.REMUX_EVENTS;
  var HLS_EVENTS$3 = EVENTS.HLS_EVENTS;

  var HlsVodPlayer = function (_Player) {
    _inherits$4(HlsVodPlayer, _Player);

    function HlsVodPlayer(options) {
      _classCallCheck$B(this, HlsVodPlayer);

      var _this = _possibleConstructorReturn$4(this, (HlsVodPlayer.__proto__ || Object.getPrototypeOf(HlsVodPlayer)).call(this, options));

      _this.hlsOps = {};
      _this.util = Player.util;
      _this.util.deepCopy(_this.hlsOps, options);
      _this._context = new Context(HlsAllowedEvents$2);
      _this._handleSetCurrentTime = debounce(_this._handleSetCurrentTime.bind(_this), 200);
      _this.onWaiting = _this.onWaiting.bind(_this);
      _this.started = false;
      return _this;
    }

    _createClass$B(HlsVodPlayer, [{
      key: '_handleSetCurrentTime',
      value: function _handleSetCurrentTime(time) {
        time = parseFloat(time);
        _set(HlsVodPlayer.prototype.__proto__ || Object.getPrototypeOf(HlsVodPlayer.prototype), 'currentTime', parseInt(time), this);
        if (this._context) {
          this.__core__.seek(time);
        }
      }
    }, {
      key: 'play',
      value: function play() {
        var _this2 = this;

        return this.video.play().catch(function (e) {
          if (e && e.code === 20) {
            // fix: chrome The play() request was interrupted by a new load request.
            _this2.once('canplay', function () {
              _this2.video.play();
            });
          }
        });
      }
    }, {
      key: '_initEvents',
      value: function _initEvents() {
        var _this3 = this;

        this.__core__.once(REMUX_EVENTS$6.INIT_SEGMENT, function () {
          var mse = _this3.__core__.mse;
          _get$3(HlsVodPlayer.prototype.__proto__ || Object.getPrototypeOf(HlsVodPlayer.prototype), 'start', _this3).call(_this3, mse.url);
        });

        this.__core__.once(HLS_EVENTS$3.RETRY_TIME_EXCEEDED, function () {
          _this3.emit('error', new Player.Errors('network', _this3.config.url));
        });

        this.once('canplay', function () {
          if (_this3.config.autoplay) {
            _this3.play();
          }
        });
      }
    }, {
      key: 'initHlsBackupEvents',
      value: function initHlsBackupEvents(hls, ctx) {
        var _this4 = this;

        hls.once(EVENTS.REMUX_EVENTS.MEDIA_SEGMENT, function () {
          _this4.__core__ = hls;
          _this4.__core__.mse.cleanBuffers().then(function () {
            _this4.__core__.mse.resetContext(ctx);
            _this4.__core__.mse.doAppend();
            _this4._context.destroy();
            _this4._context = ctx;
          });
        });

        hls.once(EVENTS.LOADER_EVENTS.LOADER_ERROR, function () {
          ctx.destroy();
        });
      }
    }, {
      key: 'onWaiting',
      value: function onWaiting() {
        var _this5 = this;

        var _self = this;
        _get$3(HlsVodPlayer.prototype.__proto__ || Object.getPrototypeOf(HlsVodPlayer.prototype), 'onWaiting', this).call(this);
        var retryTime = 10;
        var timer = setInterval(function () {
          if (Player.util.hasClass(_self.root, 'xgplayer-isloading')) {
            var _detectBufferGap = _this5.detectBufferGap(),
                gap = _detectBufferGap.gap,
                start = _detectBufferGap.start,
                method = _detectBufferGap.method;

            if (gap) {
              _this5.currentTime = Math[method](start);
            }
          }
          if (retryTime-- <= 0) {
            clearInterval(timer);
          }
        }, 500);
      }
    }, {
      key: 'start',
      value: function start() {
        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.config.url;

        if (!url || this.started) {
          return;
        }

        this.__core__ = this._context.registry('HLS_VOD_CONTROLLER', HlsVodController)({ player: this, container: this.video, preloadTime: this.config.preloadTime });
        this._context.init();
        this.__core__.load(url);
        this._initEvents();

        this.started = true;
      }
    }, {
      key: 'swithURL',
      value: function swithURL(url) {
        this.config.url = url;
        var context = new Context(HlsAllowedEvents$2);
        var hls = context.registry('HLS_VOD_CONTROLLER', HlsVodController)({
          player: this,
          container: this.video,
          mse: this.__core__.mse,
          preloadTime: this.config.preloadTime
        });
        context.init();
        this.initHlsBackupEvents(hls, context);
        hls.load(url);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        if (this._context) {
          this._context.destroy();
        }
        _get$3(HlsVodPlayer.prototype.__proto__ || Object.getPrototypeOf(HlsVodPlayer.prototype), 'destroy', this).call(this);
      }
    }, {
      key: 'detectBufferGap',
      value: function detectBufferGap() {
        var video = this.video;

        var result = {
          gap: false,
          start: -1
        };
        for (var i = 0; i < video.buffered.length; i++) {
          var bufferStart = video.buffered.start(i);
          var startGap = bufferStart - this.currentTime;
          if (startGap > 0.1 && startGap <= 2) {
            result = {
              gap: true,
              start: bufferStart,
              method: 'ceil'
            };
          }
        }

        return result;
      }
    }, {
      key: 'currentTime',
      get: function get() {
        return _get$3(HlsVodPlayer.prototype.__proto__ || Object.getPrototypeOf(HlsVodPlayer.prototype), 'currentTime', this);
      },
      set: function set(time) {
        this._handleSetCurrentTime(time);
      }
    }, {
      key: 'src',
      get: function get() {
        return this.currentSrc;
      },
      set: function set(url) {
        var _this6 = this;

        this.currentTime = 0;
        this.__core__.destroy();
        this._context = new Context(HlsAllowedEvents$2);
        this.onWaiting = this.onWaiting.bind(this);
        this.started = false;
        this.start(url);
        if (!this.paused) {
          this.pause();
          this.once('canplay', function () {
            _this6.play();
          });
        } else {
          this.play();
        }
        // this.swithURL(url)
      }
    }]);

    return HlsVodPlayer;
  }(Player);

  function _classCallCheck$C(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var HlsPlayer = function HlsPlayer(config) {
    _classCallCheck$C(this, HlsPlayer);

    if (config.isLive) {
      return new HlsLivePlayer(config);
    } else {
      return new HlsVodPlayer(config);
    }
  };

  return HlsPlayer;

})));
//# sourceMappingURL=index.js.map
