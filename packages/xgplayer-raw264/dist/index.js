(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('xgplayer')) :
  typeof define === 'function' && define.amd ? define(['xgplayer'], factory) :
  (global = global || self, global.H264Player = factory(global.Player));
}(this, (function (Player) { 'use strict';

  Player = Player && Object.prototype.hasOwnProperty.call(Player, 'default') ? Player['default'] : Player;

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
    LOADER_RESPONSE_HEADERS: 'LOADER_RESPONSE_HEADERS',
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
    SOURCE_UPDATE_END: 'SOURCE_UPDATE_END',
    MSE_ERROR: 'MSE_ERROR'

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

  var Events = {
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
      if (domain.active ) ;
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
        this._emitter.emit(Events.PLAYER_EVENTS.SEEK, time);
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

  var Golomb = function () {
    function Golomb(uint8array) {
      _classCallCheck$2(this, Golomb);

      this.TAG = 'Golomb';
      this._buffer = uint8array;
      this._bufferIndex = 0;
      this._totalBytes = uint8array.byteLength;
      this._totalBits = uint8array.byteLength * 8;
      this._currentWord = 0;
      this._currentWordBitsLeft = 0;
    }

    _createClass$2(Golomb, [{
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

  var _createClass$3 = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

  function _classCallCheck$3(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var SPSParser = function () {
    function SPSParser() {
      _classCallCheck$3(this, SPSParser);
    }

    _createClass$3(SPSParser, null, [{
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

  var RBSP = function () {
    function RBSP() {
      _classCallCheck$4(this, RBSP);
    }

    _createClass$4(RBSP, null, [{
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

  var u8aToString = function u8aToString(data) {
    var result = '';
    for (var i = 0; i < data.byteLength; i++) {
      result += String.fromCharCode(data[i]);
    }
    return result;
  };

  var SEIParser = function () {
    function SEIParser() {
      _classCallCheck$5(this, SEIParser);
    }

    _createClass$5(SEIParser, null, [{
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
            return {
              code: payloadType,
              content: content
            };
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

  var Nalunit = function () {
    function Nalunit() {
      _classCallCheck$6(this, Nalunit);
    }

    _createClass$6(Nalunit, null, [{
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
        var bufferLen = buffer.length;
        while (headerLength !== 3 && headerLength !== 4 && pos < bufferLen - 4) {
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

        if (pos === bufferLen - 4) {
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
              pos = bufferLen;
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
  var Golomb$1 = Golomb;

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

  var Stream = function () {
    function Stream(buffer) {
      _classCallCheck$7(this, Stream);

      if (buffer instanceof ArrayBuffer) {
        this.buffer = buffer;
        this.dataview = new DataView(buffer);
        this.dataview.position = 0;
      } else {
        throw new Error('data is invalid');
      }
    }

    _createClass$7(Stream, [{
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

  var AudioTrackMeta = function () {
    function AudioTrackMeta(meta) {
      _classCallCheck$8(this, AudioTrackMeta);

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

    _createClass$8(AudioTrackMeta, [{
      key: 'destroy',
      value: function destroy() {
        this.init = null;
      }
    }]);

    return AudioTrackMeta;
  }();

  var VideoTrackMeta = function () {
    function VideoTrackMeta(meta) {
      _classCallCheck$8(this, VideoTrackMeta);

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

    _createClass$8(VideoTrackMeta, [{
      key: 'destroy',
      value: function destroy() {
        this.init = null;
        this.sps = null;
        this.pps = null;
      }
    }]);

    return VideoTrackMeta;
  }();

  var _createClass$9 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$9(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var H264Demuxer = function () {
    function H264Demuxer() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck$9(this, H264Demuxer);

      this._player = options.player;

      this.videoMeta = new VideoTrackMeta();
      this.videoTrack = {
        samples: []
      };
      this.unusedUnits = [];
      this.fps = options.fps || 30;
      this.currentSampleIdx = 0;
      this.duration = 0;
      this.sps = null;
      this.pps = null;

      this.dataLoadedTimer = null;
    }

    _createClass$9(H264Demuxer, [{
      key: 'init',
      value: function init() {
        this.initEvents();
      }
    }, {
      key: 'initEvents',
      value: function initEvents() {
        this.on(Events.LOADER_EVENTS.LOADER_DATALOADED, this.handleDataLoaded.bind(this));
        this.on(Events.LOADER_EVENTS.LOADER_COMPLETE, this.handleDataLoaded.bind(this));
      }
    }, {
      key: 'load',
      value: function load(url) {
        this.emit(Events.LOADER_EVENTS.LADER_START, url);
      }
    }, {
      key: 'handleDataLoaded',
      value: function handleDataLoaded() {
        var _this = this;

        var buffer = this.buffer;

        if (!buffer) {
          return;
        }
        if (this.dataLoadedTimer) {
          clearTimeout(this.dataLoadedTimer);
          this.dataLoadedTimer = null;
        }

        var data = buffer.shift(buffer.length);
        buffer.clear();
        var stream = new Stream(data.buffer);

        var units = this.unusedUnits.concat(NalUnit.getNalunits(stream));

        if (!this._player.config.isLive) {
          if (units.length > 1) {
            var lastUnit = units.pop();
            var pushBackData = new Uint8Array(lastUnit.body.byteLength + 4);
            pushBackData.set(new Uint8Array(lastUnit.header), 0);
            pushBackData.set(lastUnit.body, 4);
            buffer.push(pushBackData);

            this.pushToMobileVideo(units);
            if (this.buffer.length) {
              this.dataLoadedTimer = setTimeout(function () {
                _this.handleDataLoaded();
              }, 500);
            }
          } else if (units.length === 1) {
            buffer.push(new Uint8Array(data));
            this.dataLoadedTimer = setTimeout(function () {
              _this.handleDataLoaded();
            }, 500);
          }
        } else {
          this.pushToMobileVideo(units);
        }
      }
    }, {
      key: 'pushToMobileVideo',
      value: function pushToMobileVideo(units) {
        var _this2 = this;

        var _H264Demuxer$unitsToS = H264Demuxer.unitsToSamples(units),
            samples = _H264Demuxer$unitsToS.samples,
            unused = _H264Demuxer$unitsToS.unused;

        this.unusedUnits = unused;

        samples.forEach(function (sample) {
          var ts = Math.floor(1000 * _this2.currentSampleIdx++ / _this2.fps);
          sample.dts = sample.pts = ts;
          if (sample.sps) {
            _this2.sps = true;
            _this2.videoMeta.sps = sample.data.slice(4);
            _this2.videoMeta.presentHeight = sample.sps.present_size.height;
            _this2.videoMeta.presentWidth = sample.sps.present_size.width;
          } else if (sample.pps) {
            _this2.pps = true;
            _this2.videoMeta.pps = sample.data.slice(4);
          } else {
            _this2.videoTrack.samples.push(sample);
          }
        });

        if (this.sps && this.pps) {
          this._player.video.setVideoMeta(this.videoMeta);
          this.sps = null;
          this.pps = null;
        }
        if (!this.intervalId && !this._player.config.isLive) {
          this.intervalId = setInterval(function () {
            _this2.handleDataLoaded();
          }, 500);
        } else {
          this._player.video.onDemuxComplete(this.videoTrack);
        }
        this.duration = Math.round(Math.floor(this.currentSampleIdx / this.fps));
        this._player.emit('durationchange');
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this._player = null;
        this.videoMeta = null;
        this.videoTrack = {
          samples: []
        };
        this.fps = null;
        this.currentSampleIdx = null;
        if (this.intervalId) {
          window.clearInterval(this.intervalId);
          this.intervalId = null;
        }
      }
    }, {
      key: 'buffer',
      get: function get() {
        return this._context.getInstance('LOADER_BUFFER');
      }
    }], [{
      key: 'unitsToSamples',
      value: function unitsToSamples(units) {
        var temp = [];
        var samples = [];
        units.forEach(function (unit) {
          var golomb = new Golomb$1(new Uint8Array(unit.body));
          golomb.readByte();
          if (!golomb.readUEG() || unit.sps || unit.pps) {
            // first_mb_slice
            if (temp.length) {
              samples.push(H264Demuxer.combineUnits(temp));
            }
            temp = [unit];
          } else {
            temp.push(unit);
          }
        });

        return {
          samples: samples,
          unused: temp
        };
      }
    }, {
      key: 'combineUnits',
      value: function combineUnits(units) {
        var sps = void 0,
            pps = void 0;
        var dataSize = units.reduce(function (result, unit) {
          if (unit.sps) {
            sps = unit.sps;
          } else if (unit.pps) {
            pps = unit.pps;
          }
          return result + unit.header.byteLength + unit.body.byteLength;
        }, 0);

        var data = new Uint8Array(dataSize);
        var offset = 0;
        var isKeyframe = void 0;
        units.forEach(function (unit) {
          data.set(new Uint8Array(unit.header), offset);
          offset += unit.header.byteLength;
          data.set(unit.body, offset);
          offset += unit.body.byteLength;
          if (unit.idr) {
            isKeyframe = true;
          }
        });

        return {
          data: data,
          sps: sps,
          pps: pps,
          isKeyframe: isKeyframe
        };
      }
    }]);

    return H264Demuxer;
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

  var XgBuffer = function () {
    /**
     * A buffer to store loaded data.
     *
     * @class LoaderBuffer
     * @param {number} length - Optional the buffer size
     */
    function XgBuffer(length) {
      _classCallCheck$a(this, XgBuffer);

      this.length = length || 0;
      this.historyLen = length || 0;
      this.array = [];
      this.offset = 0;
    }

    /**
     * The function to push data.
     *
     * @param {Uint8Array} data - The data to push into the buffer
     */

    _createClass$a(XgBuffer, [{
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

  var _typeof$1 = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
  };

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

  var LOADER_EVENTS$1 = Events.LOADER_EVENTS;
  var READ_STREAM = 0;
  var READ_TEXT = 1;
  var READ_JSON = 2;
  var READ_BUFFER = 3;

  var FetchLoader = function () {
    function FetchLoader(configs) {
      _classCallCheck$b(this, FetchLoader);

      this.configs = Object.assign({}, configs);
      this.url = null;
      this.status = 0;
      this.error = null;
      this._reader = null;
      this._canceled = false;
      this._destroyed = false;
      this.readtype = this.configs.readtype;
      this.retryTime = this.configs.retryTime === undefined ? 3 : this.configs.retryTime;
      this.buffer = this.configs.buffer || 'LOADER_BUFFER';
      this._loaderTaskNo = 0;
    }

    _createClass$b(FetchLoader, [{
      key: 'init',
      value: function init() {
        this.on(LOADER_EVENTS$1.LADER_START, this.load.bind(this));
      }
    }, {
      key: 'fetch',
      value: function (_fetch) {
        function fetch(_x, _x2) {
          return _fetch.apply(this, arguments);
        }

        fetch.toString = function () {
          return _fetch.toString();
        };

        return fetch;
      }(function (url, params) {
        var timer = null;
        return Promise.race([fetch(url, params), new Promise(function (resolve, reject) {
          timer = setTimeout(function () {
            reject(new Error('fetch timeout'));
          }, 1e4); // 10s
        })]).then(function (response) {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
          return response;
        });
      })
    }, {
      key: 'internalLoad',
      value: function internalLoad(url, params, retryTime) {
        var _this2 = this;

        return this.fetch(this.url, params).then(function (response) {
          if (response.ok) {
            _this2.emit(LOADER_EVENTS$1.LOADER_RESPONSE_HEADERS, _this2.TAG, response.headers);
            _this2.status = response.status;
            Promise.resolve().then(function () {
              _this2._onFetchResponse(response);
            });

            return Promise.resolve(response);
          }
          _this2.loading = false;
          if (retryTime-- > 0) {
            _this2.internalLoad(url, params, retryTime);
          } else {
            _this2.emit(LOADER_EVENTS$1.LOADER_ERROR, _this2.TAG, new Error(response.status + ' (' + response.statusText + ')'));
          }
        }).catch(function (error) {
          _this2.loading = false;
          if (retryTime-- > 0) {
            _this2.internalLoad(url, params, retryTime);
          } else {
            _this2.emit(LOADER_EVENTS$1.LOADER_ERROR, _this2.TAG, error);
            throw error;
          }
        });
      }
    }, {
      key: 'load',
      value: function load(url, opts) {
        this.url = url;

        this._canceled = false;

        // TODO: Add Ranges
        var params = this.getParams(opts);
        this.loading = true;
        return this.internalLoad(url, params, this.retryTime);
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
        };if (_typeof$1(this.configs.headers) === 'object') {
          var configHeaders = this.configs.headers;
          for (var key in configHeaders) {
            if (configHeaders.hasOwnProperty(key)) {
              headers.append(key, configHeaders[key]);
            }
          }
        }

        if (_typeof$1(options.headers) === 'object') {
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

  (function () {

    var n = window.Document.prototype.createElement,
        p = window.Document.prototype.createElementNS,
        aa = window.Document.prototype.importNode,
        ba = window.Document.prototype.prepend,
        ca = window.Document.prototype.append,
        da = window.DocumentFragment.prototype.prepend,
        ea = window.DocumentFragment.prototype.append,
        q = window.Node.prototype.cloneNode,
        r = window.Node.prototype.appendChild,
        t = window.Node.prototype.insertBefore,
        u = window.Node.prototype.removeChild,
        v = window.Node.prototype.replaceChild,
        x = Object.getOwnPropertyDescriptor(window.Node.prototype, "textContent"),
        y = window.Element.prototype.attachShadow,
        z = Object.getOwnPropertyDescriptor(window.Element.prototype, "innerHTML"),
        A = window.Element.prototype.getAttribute,
        B = window.Element.prototype.setAttribute,
        C = window.Element.prototype.removeAttribute,
        D = window.Element.prototype.getAttributeNS,
        E = window.Element.prototype.setAttributeNS,
        F = window.Element.prototype.removeAttributeNS,
        G = window.Element.prototype.insertAdjacentElement,
        fa = window.Element.prototype.insertAdjacentHTML,
        ha = window.Element.prototype.prepend,
        ia = window.Element.prototype.append,
        ja = window.Element.prototype.before,
        ka = window.Element.prototype.after,
        la = window.Element.prototype.replaceWith,
        ma = window.Element.prototype.remove,
        na = window.HTMLElement,
        H = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, "innerHTML"),
        oa = window.HTMLElement.prototype.insertAdjacentElement,
        pa = window.HTMLElement.prototype.insertAdjacentHTML;var qa = new Set();"annotation-xml color-profile font-face font-face-src font-face-uri font-face-format font-face-name missing-glyph".split(" ").forEach(function (a) {
      return qa.add(a);
    });function ra(a) {
      var b = qa.has(a);a = /^[a-z][.0-9_a-z]*-[\-.0-9_a-z]*$/.test(a);return !b && a;
    }var sa = document.contains ? document.contains.bind(document) : document.documentElement.contains.bind(document.documentElement);
    function I(a) {
      var b = a.isConnected;if (void 0 !== b) return b;if (sa(a)) return !0;for (; a && !(a.__CE_isImportDocument || a instanceof Document);) {
        a = a.parentNode || (window.ShadowRoot && a instanceof ShadowRoot ? a.host : void 0);
      }return !(!a || !(a.__CE_isImportDocument || a instanceof Document));
    }function J(a) {
      var b = a.children;if (b) return Array.prototype.slice.call(b);b = [];for (a = a.firstChild; a; a = a.nextSibling) {
        a.nodeType === Node.ELEMENT_NODE && b.push(a);
      }return b;
    }
    function K(a, b) {
      for (; b && b !== a && !b.nextSibling;) {
        b = b.parentNode;
      }return b && b !== a ? b.nextSibling : null;
    }
    function L(a, b, c) {
      for (var f = a; f;) {
        if (f.nodeType === Node.ELEMENT_NODE) {
          var d = f;b(d);var e = d.localName;if ("link" === e && "import" === d.getAttribute("rel")) {
            f = d.import;void 0 === c && (c = new Set());if (f instanceof Node && !c.has(f)) for (c.add(f), f = f.firstChild; f; f = f.nextSibling) {
              L(f, b, c);
            }f = K(a, d);continue;
          } else if ("template" === e) {
            f = K(a, d);continue;
          }if (d = d.__CE_shadowRoot) for (d = d.firstChild; d; d = d.nextSibling) {
            L(d, b, c);
          }
        }f = f.firstChild ? f.firstChild : K(a, f);
      }
    }function M(a, b, c) {
      a[b] = c;
    }function ta(a) {
      var b = document;this.c = a;this.a = b;this.b = void 0;N(this.c, this.a);"loading" === this.a.readyState && (this.b = new MutationObserver(this.f.bind(this)), this.b.observe(this.a, { childList: !0, subtree: !0 }));
    }function ua(a) {
      a.b && a.b.disconnect();
    }ta.prototype.f = function (a) {
      var b = this.a.readyState;"interactive" !== b && "complete" !== b || ua(this);for (b = 0; b < a.length; b++) {
        for (var c = a[b].addedNodes, f = 0; f < c.length; f++) {
          N(this.c, c[f]);
        }
      }
    };function va() {
      var a = this;this.b = this.a = void 0;this.c = new Promise(function (b) {
        a.b = b;a.a && b(a.a);
      });
    }function wa(a) {
      if (a.a) throw Error("Already resolved.");a.a = void 0;a.b && a.b(void 0);
    }function O(a) {
      this.f = new Map();this.g = new Map();this.l = new Map();this.i = !1;this.b = a;this.j = new Map();this.c = function (b) {
        return b();
      };this.a = !1;this.h = [];this.m = a.f ? new ta(a) : void 0;
    }O.prototype.o = function (a, b) {
      var c = this;if (!(b instanceof Function)) throw new TypeError("Custom element constructor getters must be functions.");xa(this, a);this.f.set(a, b);this.h.push(a);this.a || (this.a = !0, this.c(function () {
        return ya(c);
      }));
    };
    O.prototype.define = function (a, b) {
      var c = this;if (!(b instanceof Function)) throw new TypeError("Custom element constructors must be functions.");xa(this, a);za(this, a, b);this.h.push(a);this.a || (this.a = !0, this.c(function () {
        return ya(c);
      }));
    };function xa(a, b) {
      if (!ra(b)) throw new SyntaxError("The element name '" + b + "' is not valid.");if (P(a, b)) throw Error("A custom element with name '" + b + "' has already been defined.");if (a.i) throw Error("A custom element is already being defined.");
    }
    function za(a, b, c) {
      a.i = !0;var f;try {
        var d = function d(m) {
          var w = e[m];if (void 0 !== w && !(w instanceof Function)) throw Error("The '" + m + "' callback must be a function.");return w;
        },
            e = c.prototype;if (!(e instanceof Object)) throw new TypeError("The custom element constructor's prototype is not an object.");var g = d("connectedCallback");var h = d("disconnectedCallback");var k = d("adoptedCallback");var l = (f = d("attributeChangedCallback")) && c.observedAttributes || [];
      } catch (m) {
        throw m;
      } finally {
        a.i = !1;
      }c = { localName: b, constructorFunction: c,
        connectedCallback: g, disconnectedCallback: h, adoptedCallback: k, attributeChangedCallback: f, observedAttributes: l, constructionStack: [] };a.g.set(b, c);a.l.set(c.constructorFunction, c);return c;
    }O.prototype.upgrade = function (a) {
      N(this.b, a);
    };
    function ya(a) {
      if (!1 !== a.a) {
        a.a = !1;for (var b = [], c = a.h, f = new Map(), d = 0; d < c.length; d++) {
          f.set(c[d], []);
        }N(a.b, document, { upgrade: function upgrade(k) {
            if (void 0 === k.__CE_state) {
              var l = k.localName,
                  m = f.get(l);m ? m.push(k) : a.g.has(l) && b.push(k);
            }
          } });for (d = 0; d < b.length; d++) {
          Q(a.b, b[d]);
        }for (d = 0; d < c.length; d++) {
          for (var e = c[d], g = f.get(e), h = 0; h < g.length; h++) {
            Q(a.b, g[h]);
          }(e = a.j.get(e)) && wa(e);
        }c.length = 0;
      }
    }O.prototype.get = function (a) {
      if (a = P(this, a)) return a.constructorFunction;
    };
    O.prototype.whenDefined = function (a) {
      if (!ra(a)) return Promise.reject(new SyntaxError("'" + a + "' is not a valid custom element name."));var b = this.j.get(a);if (b) return b.c;b = new va();this.j.set(a, b);var c = this.g.has(a) || this.f.has(a);a = -1 === this.h.indexOf(a);c && a && wa(b);return b.c;
    };O.prototype.polyfillWrapFlushCallback = function (a) {
      this.m && ua(this.m);var b = this.c;this.c = function (c) {
        return a(function () {
          return b(c);
        });
      };
    };
    function P(a, b) {
      var c = a.g.get(b);if (c) return c;if (c = a.f.get(b)) {
        a.f.delete(b);try {
          return za(a, b, c());
        } catch (f) {
          R(f);
        }
      }
    }window.CustomElementRegistry = O;O.prototype.define = O.prototype.define;O.prototype.upgrade = O.prototype.upgrade;O.prototype.get = O.prototype.get;O.prototype.whenDefined = O.prototype.whenDefined;O.prototype.polyfillDefineLazy = O.prototype.o;O.prototype.polyfillWrapFlushCallback = O.prototype.polyfillWrapFlushCallback;function S() {
      var a = T && T.noDocumentConstructionObserver,
          b = T && T.shadyDomFastWalk;this.b = [];this.c = [];this.a = !1;this.shadyDomFastWalk = b;this.f = !a;
    }function U(a, b, c, f) {
      var d = window.ShadyDOM;if (a.shadyDomFastWalk && d && d.inUse) {
        if (b.nodeType === Node.ELEMENT_NODE && c(b), b.querySelectorAll) for (a = d.nativeMethods.querySelectorAll.call(b, "*"), b = 0; b < a.length; b++) {
          c(a[b]);
        }
      } else L(b, c, f);
    }function Aa(a, b) {
      a.a = !0;a.b.push(b);
    }function Ba(a, b) {
      a.a = !0;a.c.push(b);
    }function V(a, b) {
      a.a && U(a, b, function (c) {
        return W(a, c);
      });
    }
    function W(a, b) {
      if (a.a && !b.__CE_patched) {
        b.__CE_patched = !0;for (var c = 0; c < a.b.length; c++) {
          a.b[c](b);
        }for (c = 0; c < a.c.length; c++) {
          a.c[c](b);
        }
      }
    }function X(a, b) {
      var c = [];U(a, b, function (d) {
        return c.push(d);
      });for (b = 0; b < c.length; b++) {
        var f = c[b];1 === f.__CE_state ? a.connectedCallback(f) : Q(a, f);
      }
    }function Y(a, b) {
      var c = [];U(a, b, function (d) {
        return c.push(d);
      });for (b = 0; b < c.length; b++) {
        var f = c[b];1 === f.__CE_state && a.disconnectedCallback(f);
      }
    }
    function N(a, b, c) {
      c = void 0 === c ? {} : c;var f = c.s,
          d = c.upgrade || function (g) {
        return Q(a, g);
      },
          e = [];U(a, b, function (g) {
        a.a && W(a, g);if ("link" === g.localName && "import" === g.getAttribute("rel")) {
          var h = g.import;h instanceof Node && (h.__CE_isImportDocument = !0, h.__CE_registry = document.__CE_registry);h && "complete" === h.readyState ? h.__CE_documentLoadHandled = !0 : g.addEventListener("load", function () {
            var k = g.import;if (!k.__CE_documentLoadHandled) {
              k.__CE_documentLoadHandled = !0;var l = new Set();f && (f.forEach(function (m) {
                return l.add(m);
              }), l.delete(k));N(a, k, { s: l, upgrade: d });
            }
          });
        } else e.push(g);
      }, f);for (b = 0; b < e.length; b++) {
        d(e[b]);
      }
    }
    function Q(a, b) {
      try {
        var c = b.ownerDocument,
            f = c.__CE_registry;var d = f && (c.defaultView || c.__CE_isImportDocument) ? P(f, b.localName) : void 0;if (d && void 0 === b.__CE_state) {
          d.constructionStack.push(b);try {
            try {
              if (new d.constructorFunction() !== b) throw Error("The custom element constructor did not produce the element being upgraded.");
            } finally {
              d.constructionStack.pop();
            }
          } catch (k) {
            throw b.__CE_state = 2, k;
          }b.__CE_state = 1;b.__CE_definition = d;if (d.attributeChangedCallback && b.hasAttributes()) {
            var e = d.observedAttributes;
            for (d = 0; d < e.length; d++) {
              var g = e[d],
                  h = b.getAttribute(g);null !== h && a.attributeChangedCallback(b, g, null, h, null);
            }
          }I(b) && a.connectedCallback(b);
        }
      } catch (k) {
        R(k);
      }
    }S.prototype.connectedCallback = function (a) {
      var b = a.__CE_definition;if (b.connectedCallback) try {
        b.connectedCallback.call(a);
      } catch (c) {
        R(c);
      }
    };S.prototype.disconnectedCallback = function (a) {
      var b = a.__CE_definition;if (b.disconnectedCallback) try {
        b.disconnectedCallback.call(a);
      } catch (c) {
        R(c);
      }
    };
    S.prototype.attributeChangedCallback = function (a, b, c, f, d) {
      var e = a.__CE_definition;if (e.attributeChangedCallback && -1 < e.observedAttributes.indexOf(b)) try {
        e.attributeChangedCallback.call(a, b, c, f, d);
      } catch (g) {
        R(g);
      }
    };
    function Ca(a, b, c, f) {
      var d = b.__CE_registry;if (d && (null === f || "http://www.w3.org/1999/xhtml" === f) && (d = P(d, c))) try {
        var e = new d.constructorFunction();if (void 0 === e.__CE_state || void 0 === e.__CE_definition) throw Error("Failed to construct '" + c + "': The returned value was not constructed with the HTMLElement constructor.");if ("http://www.w3.org/1999/xhtml" !== e.namespaceURI) throw Error("Failed to construct '" + c + "': The constructed element's namespace must be the HTML namespace.");if (e.hasAttributes()) throw Error("Failed to construct '" + c + "': The constructed element must not have any attributes.");if (null !== e.firstChild) throw Error("Failed to construct '" + c + "': The constructed element must not have any children.");if (null !== e.parentNode) throw Error("Failed to construct '" + c + "': The constructed element must not have a parent node.");if (e.ownerDocument !== b) throw Error("Failed to construct '" + c + "': The constructed element's owner document is incorrect.");if (e.localName !== c) throw Error("Failed to construct '" + c + "': The constructed element's local name is incorrect.");
        return e;
      } catch (g) {
        return R(g), b = null === f ? n.call(b, c) : p.call(b, f, c), Object.setPrototypeOf(b, HTMLUnknownElement.prototype), b.__CE_state = 2, b.__CE_definition = void 0, W(a, b), b;
      }b = null === f ? n.call(b, c) : p.call(b, f, c);W(a, b);return b;
    }
    function R(a) {
      var b = a.message,
          c = a.sourceURL || a.fileName || "",
          f = a.line || a.lineNumber || 0,
          d = a.column || a.columnNumber || 0,
          e = void 0;void 0 === ErrorEvent.prototype.initErrorEvent ? e = new ErrorEvent("error", { cancelable: !0, message: b, filename: c, lineno: f, colno: d, error: a }) : (e = document.createEvent("ErrorEvent"), e.initErrorEvent("error", !1, !0, b, c, f), e.preventDefault = function () {
        Object.defineProperty(this, "defaultPrevented", { configurable: !0, get: function get() {
            return !0;
          } });
      });void 0 === e.error && Object.defineProperty(e, "error", { configurable: !0, enumerable: !0, get: function get() {
          return a;
        } });window.dispatchEvent(e);e.defaultPrevented || console.error(a);
    }var Da = new function () {}();function Ea(a) {
      window.HTMLElement = function () {
        function b() {
          var c = this.constructor;var f = document.__CE_registry.l.get(c);if (!f) throw Error("Failed to construct a custom element: The constructor was not registered with `customElements`.");var d = f.constructionStack;if (0 === d.length) return d = n.call(document, f.localName), Object.setPrototypeOf(d, c.prototype), d.__CE_state = 1, d.__CE_definition = f, W(a, d), d;var e = d.length - 1,
              g = d[e];if (g === Da) throw Error("Failed to construct '" + f.localName + "': This element was already constructed.");
          d[e] = Da;Object.setPrototypeOf(g, c.prototype);W(a, g);return g;
        }b.prototype = na.prototype;Object.defineProperty(b.prototype, "constructor", { writable: !0, configurable: !0, enumerable: !1, value: b });return b;
      }();
    }function Z(a, b, c) {
      function f(d) {
        return function (e) {
          for (var g = [], h = 0; h < arguments.length; ++h) {
            g[h] = arguments[h];
          }h = [];for (var k = [], l = 0; l < g.length; l++) {
            var m = g[l];m instanceof Element && I(m) && k.push(m);if (m instanceof DocumentFragment) for (m = m.firstChild; m; m = m.nextSibling) {
              h.push(m);
            } else h.push(m);
          }d.apply(this, g);for (g = 0; g < k.length; g++) {
            Y(a, k[g]);
          }if (I(this)) for (g = 0; g < h.length; g++) {
            k = h[g], k instanceof Element && X(a, k);
          }
        };
      }void 0 !== c.prepend && M(b, "prepend", f(c.prepend));void 0 !== c.append && M(b, "append", f(c.append));
    }
  function Fa(a) {
      M(Document.prototype, "createElement", function (b) {
        return Ca(a, this, b, null);
      });M(Document.prototype, "importNode", function (b, c) {
        b = aa.call(this, b, !!c);this.__CE_registry ? N(a, b) : V(a, b);return b;
      });M(Document.prototype, "createElementNS", function (b, c) {
        return Ca(a, this, c, b);
      });Z(a, Document.prototype, { prepend: ba, append: ca });
    }function Ga(a) {
      function b(c, f) {
        Object.defineProperty(c, "textContent", { enumerable: f.enumerable, configurable: !0, get: f.get, set: function set(d) {
            if (this.nodeType === Node.TEXT_NODE) f.set.call(this, d);else {
              var e = void 0;if (this.firstChild) {
                var g = this.childNodes,
                    h = g.length;if (0 < h && I(this)) {
                  e = Array(h);for (var k = 0; k < h; k++) {
                    e[k] = g[k];
                  }
                }
              }f.set.call(this, d);if (e) for (d = 0; d < e.length; d++) {
                Y(a, e[d]);
              }
            }
          } });
      }M(Node.prototype, "insertBefore", function (c, f) {
        if (c instanceof DocumentFragment) {
          var d = J(c);c = t.call(this, c, f);if (I(this)) for (f = 0; f < d.length; f++) {
            X(a, d[f]);
          }return c;
        }d = c instanceof Element && I(c);f = t.call(this, c, f);d && Y(a, c);I(this) && X(a, c);return f;
      });M(Node.prototype, "appendChild", function (c) {
        if (c instanceof DocumentFragment) {
          var f = J(c);c = r.call(this, c);if (I(this)) for (var d = 0; d < f.length; d++) {
            X(a, f[d]);
          }return c;
        }f = c instanceof Element && I(c);d = r.call(this, c);f && Y(a, c);I(this) && X(a, c);return d;
      });M(Node.prototype, "cloneNode", function (c) {
        c = q.call(this, !!c);this.ownerDocument.__CE_registry ? N(a, c) : V(a, c);return c;
      });M(Node.prototype, "removeChild", function (c) {
        var f = c instanceof Element && I(c),
            d = u.call(this, c);f && Y(a, c);return d;
      });M(Node.prototype, "replaceChild", function (c, f) {
        if (c instanceof DocumentFragment) {
          var d = J(c);c = v.call(this, c, f);if (I(this)) for (Y(a, f), f = 0; f < d.length; f++) {
            X(a, d[f]);
          }return c;
        }d = c instanceof Element && I(c);var e = v.call(this, c, f),
            g = I(this);g && Y(a, f);d && Y(a, c);g && X(a, c);return e;
      });x && x.get ? b(Node.prototype, x) : Aa(a, function (c) {
        b(c, { enumerable: !0, configurable: !0, get: function get() {
            for (var f = [], d = this.firstChild; d; d = d.nextSibling) {
              d.nodeType !== Node.COMMENT_NODE && f.push(d.textContent);
            }return f.join("");
          }, set: function set(f) {
            for (; this.firstChild;) {
              u.call(this, this.firstChild);
            }null != f && "" !== f && r.call(this, document.createTextNode(f));
          } });
      });
    }function Ha(a) {
      function b(f) {
        return function (d) {
          for (var e = [], g = 0; g < arguments.length; ++g) {
            e[g] = arguments[g];
          }g = [];for (var h = [], k = 0; k < e.length; k++) {
            var l = e[k];l instanceof Element && I(l) && h.push(l);if (l instanceof DocumentFragment) for (l = l.firstChild; l; l = l.nextSibling) {
              g.push(l);
            } else g.push(l);
          }f.apply(this, e);for (e = 0; e < h.length; e++) {
            Y(a, h[e]);
          }if (I(this)) for (e = 0; e < g.length; e++) {
            h = g[e], h instanceof Element && X(a, h);
          }
        };
      }var c = Element.prototype;void 0 !== ja && M(c, "before", b(ja));void 0 !== ka && M(c, "after", b(ka));void 0 !== la && M(c, "replaceWith", function (f) {
        for (var d = [], e = 0; e < arguments.length; ++e) {
          d[e] = arguments[e];
        }e = [];for (var g = [], h = 0; h < d.length; h++) {
          var k = d[h];k instanceof Element && I(k) && g.push(k);if (k instanceof DocumentFragment) for (k = k.firstChild; k; k = k.nextSibling) {
            e.push(k);
          } else e.push(k);
        }h = I(this);la.apply(this, d);for (d = 0; d < g.length; d++) {
          Y(a, g[d]);
        }if (h) for (Y(a, this), d = 0; d < e.length; d++) {
          g = e[d], g instanceof Element && X(a, g);
        }
      });void 0 !== ma && M(c, "remove", function () {
        var f = I(this);ma.call(this);f && Y(a, this);
      });
    }function Ia(a) {
      function b(d, e) {
        Object.defineProperty(d, "innerHTML", { enumerable: e.enumerable, configurable: !0, get: e.get, set: function set(g) {
            var h = this,
                k = void 0;I(this) && (k = [], U(a, this, function (w) {
              w !== h && k.push(w);
            }));e.set.call(this, g);if (k) for (var l = 0; l < k.length; l++) {
              var m = k[l];1 === m.__CE_state && a.disconnectedCallback(m);
            }this.ownerDocument.__CE_registry ? N(a, this) : V(a, this);return g;
          } });
      }function c(d, e) {
        M(d, "insertAdjacentElement", function (g, h) {
          var k = I(h);g = e.call(this, g, h);k && Y(a, h);I(g) && X(a, h);return g;
        });
      }
      function f(d, e) {
        function g(h, k) {
          for (var l = []; h !== k; h = h.nextSibling) {
            l.push(h);
          }for (k = 0; k < l.length; k++) {
            N(a, l[k]);
          }
        }M(d, "insertAdjacentHTML", function (h, k) {
          h = h.toLowerCase();if ("beforebegin" === h) {
            var l = this.previousSibling;e.call(this, h, k);g(l || this.parentNode.firstChild, this);
          } else if ("afterbegin" === h) l = this.firstChild, e.call(this, h, k), g(this.firstChild, l);else if ("beforeend" === h) l = this.lastChild, e.call(this, h, k), g(l || this.firstChild, null);else if ("afterend" === h) l = this.nextSibling, e.call(this, h, k), g(this.nextSibling, l);else throw new SyntaxError("The value provided (" + String(h) + ") is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'.");
        });
      }y && M(Element.prototype, "attachShadow", function (d) {
        d = y.call(this, d);if (a.a && !d.__CE_patched) {
          d.__CE_patched = !0;for (var e = 0; e < a.b.length; e++) {
            a.b[e](d);
          }
        }return this.__CE_shadowRoot = d;
      });z && z.get ? b(Element.prototype, z) : H && H.get ? b(HTMLElement.prototype, H) : Ba(a, function (d) {
        b(d, { enumerable: !0, configurable: !0, get: function get() {
            return q.call(this, !0).innerHTML;
          }, set: function set(e) {
            var g = "template" === this.localName,
                h = g ? this.content : this,
                k = p.call(document, this.namespaceURI, this.localName);for (k.innerHTML = e; 0 < h.childNodes.length;) {
              u.call(h, h.childNodes[0]);
            }for (e = g ? k.content : k; 0 < e.childNodes.length;) {
              r.call(h, e.childNodes[0]);
            }
          } });
      });M(Element.prototype, "setAttribute", function (d, e) {
        if (1 !== this.__CE_state) return B.call(this, d, e);var g = A.call(this, d);B.call(this, d, e);e = A.call(this, d);a.attributeChangedCallback(this, d, g, e, null);
      });M(Element.prototype, "setAttributeNS", function (d, e, g) {
        if (1 !== this.__CE_state) return E.call(this, d, e, g);var h = D.call(this, d, e);E.call(this, d, e, g);g = D.call(this, d, e);a.attributeChangedCallback(this, e, h, g, d);
      });M(Element.prototype, "removeAttribute", function (d) {
        if (1 !== this.__CE_state) return C.call(this, d);var e = A.call(this, d);C.call(this, d);null !== e && a.attributeChangedCallback(this, d, e, null, null);
      });M(Element.prototype, "removeAttributeNS", function (d, e) {
        if (1 !== this.__CE_state) return F.call(this, d, e);var g = D.call(this, d, e);F.call(this, d, e);var h = D.call(this, d, e);g !== h && a.attributeChangedCallback(this, e, g, h, d);
      });oa ? c(HTMLElement.prototype, oa) : G && c(Element.prototype, G);pa ? f(HTMLElement.prototype, pa) : fa && f(Element.prototype, fa);Z(a, Element.prototype, { prepend: ha, append: ia });Ha(a);
    }var T = window.customElements;function Ja() {
      var a = new S();Ea(a);Fa(a);Z(a, DocumentFragment.prototype, { prepend: da, append: ea });Ga(a);Ia(a);a = new O(a);document.__CE_registry = a;Object.defineProperty(window, "customElements", { configurable: !0, enumerable: !0, value: a });
    }T && !T.forcePolyfill && "function" == typeof T.define && "function" == typeof T.get || Ja();window.__CE_installPolyfill = Ja;
  }).call(self);

  //# sourceMappingURL=custom-elements.min.js.map

  /**
   * @license
   * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
   */

  /**
   * This shim allows elements written in, or compiled to, ES5 to work on native
   * implementations of Custom Elements v1. It sets new.target to the value of
   * this.constructor so that the native HTMLElement constructor can access the
   * current under-construction element's definition.
   */
  (function () {
    if (
    // No Reflect, no classes, no need for shim because native custom elements
    // require ES2015 classes or Reflect.
    window.Reflect === undefined || window.customElements === undefined ||
    // The webcomponentsjs custom elements polyfill doesn't require
    // ES2015-compatible construction (`super()` or `Reflect.construct`).
    window.customElements.polyfillWrapFlushCallback) {
      return;
    }
    var BuiltInHTMLElement = HTMLElement;
    /**
     * With jscompiler's RECOMMENDED_FLAGS the function name will be optimized away.
     * However, if we declare the function as a property on an object literal, and
     * use quotes for the property name, then closure will leave that much intact,
     * which is enough for the JS VM to correctly set Function.prototype.name.
     */
    var wrapperForTheName = {
      'HTMLElement': /** @this {!Object} */function HTMLElement() {
        return Reflect.construct(BuiltInHTMLElement, [], /** @type {!Function} */this.constructor);
      }
    };
    window.HTMLElement = wrapperForTheName['HTMLElement'];
    HTMLElement.prototype = BuiltInHTMLElement.prototype;
    HTMLElement.prototype.constructor = HTMLElement;
    Object.setPrototypeOf(HTMLElement, BuiltInHTMLElement);
  })();

  var _typeof$2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

  var _createClass$c = function () {
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
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof$2(call)) === "object" || typeof call === "function") ? call : self;
  }

  function _inherits$1(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof$2(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _classCallCheck$c(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  /**
   * @author fuyuhao@bytedance.com
   */

  var DEFAULT_FPS = 30;

  function validateFPS(fps) {
    if (fps < 20 || fps > 80) {
      return false;
    }
    return true;
  }

  var Ticker = function () {
    function Ticker(options) {
      _classCallCheck$c(this, Ticker);

      this.options = Object.assign({}, options || {});
      if (!this.options.interval || !validateFPS(1000 / this.options.interval)) {
        this.options.interval = 1000 / 30;
      }
      this.callbacks = [];
    }

    _createClass$c(Ticker, [{
      key: "start",
      value: function start() {
        for (var _len = arguments.length, callbacks = Array(_len), _key = 0; _key < _len; _key++) {
          callbacks[_key] = arguments[_key];
        }

        this.callbacks = callbacks;
      }
    }, {
      key: "onTick",
      value: function onTick() {
        for (var i = 0, len = this.callbacks.length; i < len; i++) {
          var callback = this.callbacks[i];
          callback();
        }
      }
    }, {
      key: "setInterval",
      value: function setInterval(interval) {
        if (!validateFPS(1000 / interval)) {
          interval = 1000 / 30;
        }
        this.options.interval = interval;
        return this;
      }
    }]);

    return Ticker;
  }();
  var RafTicker = function (_Ticker) {
    _inherits$1(RafTicker, _Ticker);

    function RafTicker(props) {
      _classCallCheck$c(this, RafTicker);

      var _this = _possibleConstructorReturn$1(this, (RafTicker.__proto__ || Object.getPrototypeOf(RafTicker)).call(this, props));

      _this.prev = null;
      _this.timerId = null;
      _this._subTimerId = null;

      _this._tickFunc = RafTicker.getTickFunc();
      _this.tick = _this.tick.bind(_this);
      return _this;
    }

    _createClass$c(RafTicker, [{
      key: "start",
      value: function start() {
        var _get2;

        for (var _len2 = arguments.length, callbacks = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          callbacks[_key2] = arguments[_key2];
        }

        (_get2 = _get$1(RafTicker.prototype.__proto__ || Object.getPrototypeOf(RafTicker.prototype), "start", this)).call.apply(_get2, [this].concat(callbacks));
        this.tick();
      }
    }, {
      key: "tick",
      value: function tick() {
        this.nextTick();
        this.onTick();
      }
    }, {
      key: "nextTick",
      value: function nextTick() {
        var _tickFunc = this._tickFunc;

        this.timerId = _tickFunc(this.tick);
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.timerId) {
          var cancelFunc = RafTicker.getCancelFunc();

          cancelFunc(this.timerId);
        }
      }
    }, {
      key: "resume",
      value: function resume() {
        this.nextTick();
      }
    }], [{
      key: "getTickFunc",
      value: function getTickFunc() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame;
      }
    }, {
      key: "getCancelFunc",
      value: function getCancelFunc() {
        return window.cancelAnimationFrame || window.webkitCancelAnimationFrame;
      }
    }, {
      key: "isSupported",
      value: function isSupported() {
        return RafTicker.getTickFunc() !== undefined;
      }
    }]);

    return RafTicker;
  }(Ticker);

  /**
   * use setTimeout for browsers without raf support
   */
  var TimeoutTicker = function (_Ticker2) {
    _inherits$1(TimeoutTicker, _Ticker2);

    function TimeoutTicker(config) {
      _classCallCheck$c(this, TimeoutTicker);

      var _this2 = _possibleConstructorReturn$1(this, (TimeoutTicker.__proto__ || Object.getPrototypeOf(TimeoutTicker)).call(this, config));

      _this2.timeoutId = null;
      return _this2;
    }

    _createClass$c(TimeoutTicker, [{
      key: "start",
      value: function start() {
        var _get3;

        for (var _len3 = arguments.length, callbacks = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          callbacks[_key3] = arguments[_key3];
        }

        (_get3 = _get$1(TimeoutTicker.prototype.__proto__ || Object.getPrototypeOf(TimeoutTicker.prototype), "start", this)).call.apply(_get3, [this].concat(callbacks));
        this.tick();
      }
    }, {
      key: "tick",
      value: function tick() {
        this.nextTick();
        this.onTick();
      }
    }, {
      key: "nextTick",
      value: function nextTick() {
        var _this3 = this;

        this.timeoutId = window.setTimeout(function () {
          _this3.stop();
          _this3.tick();
        }, this.options.interval);
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.timeoutId) {
          window.clearTimeout(this.timeoutId);
        }
      }
    }]);

    return TimeoutTicker;
  }(Ticker);

  var TARGET = typeof Symbol === 'undefined' ? '__target' : Symbol(),
      SCRIPT_TYPE = 'application/javascript',
      BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder,
      URL = window.URL || window.webkitURL,
      Worker = window.Worker;

  /**
   * Returns a wrapper around Web Worker code that is constructible.
   *
   * @function shimWorker
   *
   * @param { String }    filename    The name of the file
   * @param { Function }  fn          Function wrapping the code of the worker
   */
  function shimWorker(filename, fn) {
      return function ShimWorker(forceFallback) {
          var o = this;

          if (!fn) {
              return new Worker(filename);
          } else if (Worker && !forceFallback) {
              // Convert the function's inner code to a string to construct the worker
              var source = `${fn}`.replace(/^function.+?{/, '').slice(0, -1),
                  objURL = createSourceObject(source);

              this[TARGET] = new Worker(objURL);
              URL.revokeObjectURL(objURL);
              return this[TARGET];
          } else {
              var selfShim = {
                  postMessage: m => {
                      if (o.onmessage) {
                          setTimeout(() => o.onmessage({ data: m, target: selfShim }));
                      }
                  }
              };

              fn.call(selfShim);
              this.postMessage = m => {
                  setTimeout(() => selfShim.onmessage({ data: m, target: o }));
              };
              this.isThisThread = true;
          }
      };
  }
  // Test Worker capabilities
  if (Worker) {
      var testWorker,
          objURL = createSourceObject('self.onmessage = function () {}'),
          testArray = new Uint8Array(1);

      try {
          // No workers via blobs in Edge 12 and IE 11 and lower :(
          if (/(?:Trident|Edge)\/(?:[567]|12)/i.test(navigator.userAgent)) {
              throw new Error('Not available');
          }
          testWorker = new Worker(objURL);

          // Native browser on some Samsung devices throws for transferables, let's detect it
          testWorker.postMessage(testArray, [testArray.buffer]);
      } catch (e) {
          Worker = null;
      } finally {
          URL.revokeObjectURL(objURL);
          if (testWorker) {
              testWorker.terminate();
          }
      }
  }

  function createSourceObject(str) {
      try {
          return URL.createObjectURL(new Blob([str], { type: SCRIPT_TYPE }));
      } catch (e) {
          var blob = new BlobBuilder();
          blob.append(str);
          return URL.createObjectURL(blob.getBlob(type));
      }
  }

  var VideoWorker = new shimWorker("./worker.js", function (window, document) {
    var self = this;
    function shimImportScripts(src) {
      return new Promise(function (resolve, reject) {
        var s;
        s = _shimWorkerDocument.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        _shimWorkerDocument.head.appendChild(s);
      });
    }

    var MAX_STREAM_BUFFER_LENGTH = 1024 * 1024;
    var Decoder = function Decoder(self) {
      this.inited = false;
      this.self = self;
      this.meta = this.self.meta;
      this.infolist = {};
      if (self.importScripts) {
        self.par_broadwayOnBroadwayInited = this.broadwayOnBroadwayInited.bind(this);
        self.par_broadwayOnPictureDecoded = this.broadwayOnPictureDecoded.bind(this);
      } else {
        _shimWorkerWindow.par_broadwayOnBroadwayInited = this.broadwayOnBroadwayInited.bind(this);
        _shimWorkerWindow.par_broadwayOnPictureDecoded = this.broadwayOnPictureDecoded.bind(this);
      }
    };

    Decoder.prototype.toU8Array = function (ptr, length) {
      return Module.HEAPU8.subarray(ptr, ptr + length);
    };

    Decoder.prototype.init = function () {
      Module._broadwayInit();
      this.broadwayOnBroadwayInited();
      this.streamBuffer = this.toU8Array(Module._broadwayCreateStream(MAX_STREAM_BUFFER_LENGTH), MAX_STREAM_BUFFER_LENGTH);
    };

    Decoder.prototype.broadwayOnPictureDecoded = function (offset, width, height, yLinesize, uvLinesize, infoid) {
      var info = Object.assign({}, this.infolist[infoid]);
      var yRowcount = height;
      var uvRowcount = height / 2;
      if (this.meta && (this.meta.chromaFormat === 444 || this.meta.chromaFormat === 422)) {
        uvRowcount = height;
      }
      var data = this.toU8Array(offset, yLinesize * yRowcount + 2 * (uvLinesize * uvRowcount));
      this.infolist[infoid] = null;
      var datetemp = new Uint8Array(data.length);
      datetemp.set(data);
      var buffer = datetemp.buffer;
      if (info) {
        this.self.postMessage({
          msg: 'LOG',
          log: 'sample ' + info.dts + ' decoded startAt' + info.decodeTime + ' cost: ' + (Date.now() - info.decodeTime)
        });
      }

      this.self.postMessage({
        msg: 'DECODED',
        width: width,
        height: height,
        yLinesize: yLinesize,
        uvLinesize: uvLinesize,
        info: info,
        buffer: buffer
      }, [buffer]);
    };

    Decoder.prototype.broadwayOnBroadwayInited = function () {
      this.inited = true;
      this.self.postMessage({
        msg: 'LOG',
        log: 'decoder inited'
      });
      this.self.postMessage({ msg: 'DECODER_READY' });
    };

    Decoder.prototype.decode = function (data, info) {
      var time = parseInt(new Date().getTime());
      var infoid = time - Math.floor(time / 10e8) * 10e8;
      this.infolist[infoid] = info;
      this.streamBuffer.set(data);
      Module._broadwayPlayStream(data.length, infoid);
    };

    Decoder.prototype.destroy = function () {
      Module._broadwayExit();
    };

    Decoder.prototype.updateMeta = function (meta) {
      this.meta = meta;
    };

    var decoder;

    function onPostRun() {
      self.postMessage({
        msg: 'LOG',
        log: 'do post run'
      });
      decoder = new Decoder(this);
      decoder.init();
    }

    function init(meta) {
      var _this = this;

      if (!decoder) {
        if (!self.importScripts) {
          shimImportScripts('https://sf1-vcloudcdn.pstatp.com/obj/ttfe/media/decoder/h264/decoder_1583333072684.js').then(function () {
            console.log(Module);
            self.postMessage({
              msg: 'LOG',
              log: addOnPostRun
            });
            addOnPostRun(onPostRun.bind(self));
          });
        } else {
          self.postMessage({
            msg: 'LOG',
            log: 'do import script '
          });
          if (!self.console) {
            self.console = {
              log: function log() {},
              warn: function warn() {},
              info: function info() {},
              error: function error() {}
            };
          }
          try {
            self.importScripts('https://sf1-vcloudcdn.pstatp.com/obj/ttfe/media/decoder/h264/decoder_1583333072684.js');
          } catch (e) {
            self.postMessage({
              msg: 'INIT_FAILED'
            });
            self.postMessage({
              msg: 'LOG',
              log: e.message
            });
            return;
          }
          addOnPostRun(onPostRun.bind(self));
          self.postMessage({
            msg: 'LOG',
            log: 'import script done' + Module.toString()
          });
          setTimeout(function () {
            if (!decoder) {
              onPostRun.call(_this);
            }
          }, 5000);
        }
      }
    }

    self.onmessage = function (e) {
      var data = e.data;
      if (!data.msg) {
        self.postMessage({
          msg: 'ERROR:invalid message'
        });
      } else {
        switch (data.msg) {
          case 'init':
            self.meta = data.meta;
            self.postMessage({
              msg: 'LOG',
              log: 'worker inited'
            });
            init();
            break;
          case 'updatemeta':
            self.meta = data.meta;
            decoder.updateMeta(data.meta);
            break;
          case 'decode':
            decoder.decode(data.data, data.info);
            break;
          case 'destory':
            decoder.destroy();
            break;
        }
      }
    };
  });

  var BackupVideoWorker = new shimWorker("./backupWorker.js", function (window, document) {
    var self = this;
    function shimImportScripts(src) {
      return new Promise(function (resolve, reject) {
        var s;
        s = _shimWorkerDocument.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        _shimWorkerDocument.head.appendChild(s);
      });
    }

    var MAX_STREAM_BUFFER_LENGTH = 1024 * 1024;
    var Decoder = function Decoder(self) {
      this.inited = false;
      this.self = self;
      this.meta = this.self.meta;
      this.infolist = {};
      if (self.importScripts) {
        self.par_broadwayOnBroadwayInited = this.broadwayOnBroadwayInited.bind(this);
        self.par_broadwayOnPictureDecoded = this.broadwayOnPictureDecoded.bind(this);
      } else {
        _shimWorkerWindow.par_broadwayOnBroadwayInited = this.broadwayOnBroadwayInited.bind(this);
        _shimWorkerWindow.par_broadwayOnPictureDecoded = this.broadwayOnPictureDecoded.bind(this);
      }
    };

    Decoder.prototype.toU8Array = function (ptr, length) {
      return Module.HEAPU8.subarray(ptr, ptr + length);
    };

    Decoder.prototype.init = function () {
      Module._broadwayInit();
      this.streamBuffer = this.toU8Array(Module._broadwayCreateStream(MAX_STREAM_BUFFER_LENGTH), MAX_STREAM_BUFFER_LENGTH);
    };

    Decoder.prototype.broadwayOnPictureDecoded = function (offset, width, height, yLinesize, uvLinesize, infoid) {
      var info = Object.assign({}, this.infolist[infoid]);
      var yRowcount = height;
      var uvRowcount = height / 2;
      if (!uvLinesize) {
        uvLinesize = yLinesize / 2;
      }
      if (this.meta && (this.meta.chromaFormat === 444 || this.meta.chromaFormat === 422)) {
        uvRowcount = height;
      }
      var data = this.toU8Array(offset, yLinesize * yRowcount + 2 * (uvLinesize * uvRowcount));
      this.infolist[infoid] = null;
      var datetemp = new Uint8Array(data.length);
      datetemp.set(data);
      var buffer = datetemp.buffer;
      if (info) {
        this.self.postMessage({
          msg: 'LOG',
          log: 'sample ' + info.dts + ' decoded startAt' + info.decodeTime + ' cost: ' + (Date.now() - info.decodeTime)
        });
      }

      this.self.postMessage({
        msg: 'DECODED',
        width: width,
        height: height,
        yLinesize: yLinesize,
        uvLinesize: uvLinesize,
        info: info,
        buffer: buffer
      }, [buffer]);
    };

    Decoder.prototype.broadwayOnBroadwayInited = function () {
      this.inited = true;
      this.self.postMessage({
        msg: 'LOG',
        log: 'backup decoder inited'
      });
      this.self.postMessage({ msg: 'DECODER_READY' });
    };

    Decoder.prototype.decode = function (data, info) {
      var time = parseInt(new Date().getTime());
      var infoid = time - Math.floor(time / 10e8) * 10e8;
      this.infolist[infoid] = info;
      this.streamBuffer.set(data);
      Module._broadwayPlayStream(data.length, infoid);
    };

    Decoder.prototype.destroy = function () {
      Module._broadwayExit();
    };

    Decoder.prototype.updateMeta = function (meta) {
      this.meta = meta;
    };

    var decoder;

    function onPostRun() {
      decoder = new Decoder(this);
      decoder.init();
      self.postMessage({
        msg: 'LOG',
        log: 'decoder inited'
      });
      decoder.broadwayOnBroadwayInited();
    }

    function init(meta) {
      if (!decoder) {
        if (!self.importScripts) {
          shimImportScripts('https://sf1-vcloudcdn.pstatp.com/obj/media-fe/decoder/h264/decoder_asm_1589261792455.js').then(function () {
            self.postMessage({
              msg: 'LOG',
              log: Module
            });
            onPostRun.call(self);
          });
        } else {
          try {
            if (!self.console) {
              self.console = {
                log: function log() {},
                warn: function warn() {},
                info: function info() {},
                error: function error() {}
              };
            }
            self.importScripts('https://sf1-vcloudcdn.pstatp.com/obj/media-fe/decoder/h264/decoder_asm_1589261792455.js');
          } catch (e) {
            self.postMessage({
              msg: 'INIT_FAILED'
            });
            self.postMessage({
              msg: 'LOG',
              log: e.message
            });
            return;
          }
          self.postMessage({
            msg: 'LOG',
            log: 'backup script import done' + Module
          });
          onPostRun.call(self);
        }
      }
    }

    self.onmessage = function (e) {
      var data = e.data;
      if (!data.msg) {
        self.postMessage({
          msg: 'ERROR:invalid message'
        });
      } else {
        switch (data.msg) {
          case 'init':
            self.meta = data.meta;
            self.postMessage({
              msg: 'LOG',
              log: 'backup worker inited'
            });
            init();
            break;
          case 'updatemeta':
            self.meta = data.meta;
            decoder.updateMeta(data.meta);
            break;
          case 'decode':
            decoder.decode(data.data, data.info);
            break;
          case 'destory':
            decoder.destroy();
            break;
        }
      }
    };
  });

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

  var YUVCanvas = function () {
    function YUVCanvas(configs) {
      _classCallCheck$d(this, YUVCanvas);

      this.configs = Object.assign({}, configs);
      this.canvas = this.configs.canvas;
      this.meta = Object.assign({}, this.configs.meta);
      this._initMeta();
      // this.canvas.style.width = configs.style.width;
      // this.canvas.style.height = configs.style.height;
      this._initContextGL();
      if (this.contextGL) {
        this._initProgram();
        this._initBuffers();
        this._initTextures();
      }  }

    _createClass$d(YUVCanvas, [{
      key: '_initMeta',
      value: function _initMeta() {
        this.chroma = this.meta.chromaFormat;
        this.height = this.meta.presentHeight;
        this.width = this.meta.presentWidth;
        this.canvas.width = this.meta.presentWidth;
        this.canvas.height = this.meta.presentHeight;
      }
    }, {
      key: '_initContextGL',
      value: function _initContextGL() {
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
        }
        this.contextGL = gl;
      }
    }, {
      key: '_initProgram',
      value: function _initProgram() {
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
    }, {
      key: '_initBuffers',
      value: function _initBuffers() {
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
    }, {
      key: '_initTextures',
      value: function _initTextures() {
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
    }, {
      key: '_initTexture',
      value: function _initTexture() {
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
    }, {
      key: '_drawPictureGL',
      value: function _drawPictureGL(data, width, height, yLinesize, uvLinesize) {
        var ylen = yLinesize * height;
        var uvlen = uvLinesize * height / 2;
        if (this.chroma === 444 || this.chroma === 422) {
          uvlen *= 2;
        }
        data = new Uint8Array(data);
        var renderData = {
          yData: data.subarray(0, ylen),
          uData: data.subarray(ylen, ylen + uvlen),
          vData: data.subarray(ylen + uvlen, ylen + uvlen + uvlen)
        };
        this._drawPictureGL420(renderData, width, height, yLinesize, uvLinesize);
      }
    }, {
      key: '_drawPictureGL420',
      value: function _drawPictureGL420(data, width, height, yLinesize, uvLinesize) {
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

        var uDataPerRow = uvLinesize;
        var uRowCnt = height / 2;

        if (this.chroma === 422 || this.chroma === 444) {
          uRowCnt = height;
        }

        var vDataPerRow = uvLinesize;
        var vRowCnt = uRowCnt;

        var ratiow = this.canvas.width / this.width;
        var ratioh = this.canvas.height / this.height;
        var left = 0;
        var top = 0;
        var w = this.canvas.width;
        var h = this.canvas.height;
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
    }, {
      key: '_drawPictureRGB',
      value: function _drawPictureRGB(data) {}
    }, {
      key: 'render',
      value: function render(data, width, height, yLinesize, uvLinesize) {
        var gl = this.contextGL;
        // console.log(data, width, height, yLinesize, uvLinesize)
        if (gl) {
          this._drawPictureGL(data, width, height, yLinesize, uvLinesize);
        } else {
          this._drawPictureRGB(data);
        }
      }
    }, {
      key: 'resetMeta',
      value: function resetMeta(meta) {
        this.meta = Object.assign({}, meta);
        this._initMeta();
      }
    }]);

    return YUVCanvas;
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

  var SourceBuffer = function () {
    function SourceBuffer(config) {
      _classCallCheck$e(this, SourceBuffer);

      this.config = Object.assign({}, config);
      this.type = this.config.type;
      this.reset();
    }

    _createClass$e(SourceBuffer, [{
      key: "reset",
      value: function reset() {
        this.buffer = [];
        this.currentGop = undefined;
        this._lastGet = undefined;
      }
    }, {
      key: "push",
      value: function push(frame) {
        // if (this.type === 'video') {
        //   if (frame.isKeyframe) {
        //     let currentGop = {
        //       samples: [],
        //       start: frame.dts,
        //       end: frame.dts,
        //       nextGop: undefined
        //     };
        //     if (this.currentGop) {
        //       this.currentGop.nextGop = currentGop;
        //     }
        //     this.currentGop = currentGop;
        //     this.buffer.push(this.currentGop);
        //   }
        //
        //   if (this.currentGop) {
        //     this.currentGop.samples.push(frame);
        //
        //     if (frame.dts < this.currentGop.start) {
        //       this.currentGop.start = frame.dts;
        //     }
        //
        //     if (frame.dts > this.currentGop.end) {
        //       this.currentGop.end = frame.dts;
        //     }
        //   }
        // }
        this.buffer.push(frame);
      }
    }, {
      key: "get",
      value: function get(time) {
        return this.buffer.shift();
      }
    }, {
      key: "_getNext",
      value: function _getNext() {
        if (!this._lastGet) {
          var gop = this.buffer[0];
          if (gop.samples.length < 1) {
            return;
          }

          this._lastGet = {
            gop: gop,
            index: 0
          };
          return gop.samples[0];
        } else {
          var _gop = this._lastGet.gop;
          var sample = _gop.samples[this._lastGet.index + 1];
          if (sample) {
            this._lastGet.index = this._lastGet.index + 1;
            return sample;
          } else {
            _gop = _gop.nextGop;
            if (!_gop || _gop.samples.length < 1) {
              return;
            }
            sample = _gop.samples[0];
            this._lastGet = {
              gop: _gop,
              index: 0
            };
            return sample;
          }
        }
      }
    }, {
      key: "remove",
      value: function remove(start, end) {
        if (this.buffer.length < 0) {
          return;
        }

        var i = 0;
        var gop = this.buffer[0];
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
    }]);

    return SourceBuffer;
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

  var TimeRanges = function () {
    function TimeRanges(ranges) {
      _classCallCheck$f(this, TimeRanges);

      this.ranges = ranges || [];
    }

    _createClass$f(TimeRanges, [{
      key: "start",
      value: function start(idx) {
        return this.ranges[idx] ? this.ranges[idx].start : 0;
      }
    }, {
      key: "end",
      value: function end(idx) {
        return this.ranges[idx] ? this.ranges[idx].end : 0;
      }
    }, {
      key: "add",
      value: function add(range) {
        this.ranges.push(range);
      }
    }, {
      key: "length",
      get: function get() {
        return this.ranges.length;
      }
    }]);

    return TimeRanges;
  }();

  var _typeof$3 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

  function _possibleConstructorReturn$2(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof$3(call)) === "object" || typeof call === "function") ? call : self;
  }

  function _inherits$2(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof$3(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var HAVE_NOTHING = 0;
  var HAVE_METADATA = 1;
  var HAVE_CURRENT_DATA = 2;
  var HAVE_FUTURE_DATA = 3;
  var HAVE_ENOUGH_DATA = 4;

  var NOT_SEEK = 1;
  var SEEKING = 2;
  var SEEKED = 4;

  var VIDEO_CANVAS_EVENTS = {
    VIDEO_EVENTS: 'VIDEO_EVENTS'
  };

  var VideoCanvas = function (_EventEmitter) {
    _inherits$2(VideoCanvas, _EventEmitter);

    function VideoCanvas(config) {
      _classCallCheck$g(this, VideoCanvas);

      var _this = _possibleConstructorReturn$2(this, (VideoCanvas.__proto__ || Object.getPrototypeOf(VideoCanvas)).call(this));

      _this.config = Object.assign({}, config);
      _this.canvas = _this.config.canvas ? _this.config.canvas : document.createElement('canvas');
      _this.source = new SourceBuffer({ type: 'video' });
      _this.onFirstFrame = undefined;
      _this.oncanplay = undefined;
      _this.initParameters();
      _this.canvas.style.maxWidth = '100%';
      _this.canvas.style.maxHeight = '100%';
      _this.canvas.style.top = 0;
      _this.canvas.style.bottom = 0;
      _this.canvas.style.left = 0;
      _this.canvas.style.right = 0;
      _this.canvas.style.margin = 'auto';
      _this.canvas.style.position = 'absolute';
      _this.handleMessage = _this.handleMessage.bind(_this);
      _this.useBackupTimer = null;
      return _this;
    }

    _createClass$g(VideoCanvas, [{
      key: 'initParameters',
      value: function initParameters() {
        this.meta = undefined;
        this.readyStatus = HAVE_NOTHING;
        this.paused = true;
        this.currentTime = 0;
        this._seekState = NOT_SEEK;
        this._avccpushed = false;
        this._decodedFrames = {};
        this._lastSampleDts = undefined;
        this._baseDts = undefined;
        this._lastRenderTime = null;
        this.playFinish = null;
        this._seekState = NOT_SEEK;
      }
    }, {
      key: 'reset',
      value: function reset() {
        this.initParameters();
        this.source.reset();
      }
    }, {
      key: 'pause',
      value: function pause() {
        this.paused = true;
      }
    }, {
      key: 'initWasmWorker',
      value: function initWasmWorker() {
        // eslint-disable-next-line no-undef
        window._shimWorkerDocument = document;
        window._shimWorkerWindow = window;
        this.initWorker(false);
      }
    }, {
      key: 'initWorker',
      value: function initWorker(isBackup) {
        var _this2 = this;

        if (this.wasmworker) {
          this.destroyWorker();
        }
        var VideoWorkerCls = isBackup ? BackupVideoWorker : VideoWorker;
        this.wasmworker = new VideoWorkerCls(false);
        this.wasmworker.onmessage = isBackup ? function (msg) {
          if (msg.data.msg === 'INIT_FAILED') {
            _this2.emit('error', new Error('backup worker init failed'));
          } else {
            _this2.handleMessage(msg);
          }
        } : this.handleMessage;

        this.wasmworker.postMessage({
          msg: 'init',
          meta: this.meta
        });
      }
    }, {
      key: 'setVideoMetaData',
      value: function setVideoMetaData(meta) {
        this.meta = meta;
        if (!this._decoderInited) {
          this.initWasmWorker();
          return;
        }
        this.wasmworker.postMessage({
          msg: 'updatemeta',
          meta: this.meta
        });
        this.pushAvcc(meta);
      }
    }, {
      key: 'pushAvcc',
      value: function pushAvcc(meta) {
        this._avccpushed = true;
        var data = new Uint8Array(meta.sps.byteLength + 4);
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
          var config = Object.assign({ meta: meta, canvas: this.canvas }, this.config);
          this.yuvCanvas = new YUVCanvas(config);
        } else {
          this.yuvCanvas.resetMeta(meta);
        }
        this.readyStatus = HAVE_METADATA;
      }
    }, {
      key: 'decodeVideo',
      value: function decodeVideo(videoTrack) {
        if (!this._decoderInited) {
          return;
        }
        if (!this._avccpushed) {
          this.pushAvcc(this.meta);
        }
        var samples = videoTrack.samples;

        var sample = samples.shift();

        while (sample) {
          if (!this._baseDts) {
            this._baseDts = sample.dts;
          }
          this.source.push(sample);
          sample = samples.shift();
        }

        this.preload();
      }
    }, {
      key: 'preload',
      value: function preload() {
        var bufferedEnd = this.buffered.end(0);
        if (!this._lastSampleDts || bufferedEnd - this.currentTime / 1000 < this.config.preloadTime) {
          var sample = this.source.get();
          if (sample) {
            this._lastSampleDts = sample.dts;
            this._analyseNal(sample);
          }

          while (sample && this._lastSampleDts - this._baseDts < this.currentTime + this.config.preloadTime * 2000) {
            sample = this.source.get();
            // console.log(sample)
            if (sample) {
              this._analyseNal(sample);
              this._lastSampleDts = sample.dts;
            }
          }
        }
      }
    }, {
      key: '_analyseNal',
      value: function _analyseNal(sample) {
        // console.log('送入解码', sample.dts,data)
        this.wasmworker.postMessage({
          msg: 'decode',
          data: sample.data,
          info: {
            decodeTime: Date.now(),
            dts: sample.dts,
            pts: sample.pts ? sample.pts : sample.dts + sample.cts,
            key: sample.isKeyframe
          }
        });
      }
    }, {
      key: 'decodeVideoBuffer',
      value: function decodeVideoBuffer(buffer) {
        if (!this._decoderInited) {
          this.initWasmWorker();
          return;
        }
        this.wasmworker.postMessage({
          msg: 'decode',
          data: buffer
        });
      }
    }, {
      key: '_onDecoded',
      value: function _onDecoded(data) {
        if (!data.info) {
          return;
        }
        var dts = data.info.dts;

        this._decodedFrames[dts - this._baseDts] = data;
        var decodedFrameLen = Object.keys(this._decodedFrames).length;
        if (this.readyStatus == HAVE_METADATA && decodedFrameLen > 0) {
          this.readyStatus = HAVE_CURRENT_DATA;
          this.emit(VIDEO_CANVAS_EVENTS.VIDEO_EVENTS, 'loadeddata');
        }
        if (this._seekState == SEEKED) {
          this.readyStatus = HAVE_CURRENT_DATA;
          this._seekState = NOT_SEEK;
        }
        if (decodedFrameLen > 1) {
          if (this.playFinish) {
            this.playFinish();
          }
          if (this.readyStatus == HAVE_CURRENT_DATA) {
            this.readyStatus = HAVE_FUTURE_DATA;
            this.emit(VIDEO_CANVAS_EVENTS.VIDEO_EVENTS, 'canplay');
          }
          if (this.oncanplay) {
            this.oncanplay();
          }
          // 2s的时间
          if (this.readyStatus == HAVE_FUTURE_DATA && decodedFrameLen > 2 * (this.meta.frameRate.fps || 60)) {
            this.readyStatus = HAVE_ENOUGH_DATA;
            this.emit(VIDEO_CANVAS_EVENTS.VIDEO_EVENTS, 'canplaythrough');
          }
        } else {
          this.readyStatus = HAVE_CURRENT_DATA;
        }
      }
    }, {
      key: 'play',
      value: function play() {
        var _this3 = this;

        this.paused = false;
        if (!this.paused) {
          return Promise.resolve();
        }
        return new Promise(function (resolve) {
          _this3.playFinish = resolve;
        }).then(function () {
          _this3.playFinish = null;
        });
      }
    }, {
      key: '_onTimer',
      value: function _onTimer(currentTime) {
        var _this4 = this;

        // console.log(currentTime)
        if (this.paused) {
          return false;
        }

        if (this.meta) {
          var frameTimes = Object.keys(this._decodedFrames);
          // console.log(frameTimes)
          if (frameTimes.length > 0) {
            this.currentTime = currentTime;
            var frameTime = -1;
            for (var i = 0; i < frameTimes.length && Number.parseInt(frameTimes[i]) <= this.currentTime; i++) {
              frameTime = Number.parseInt(frameTimes[Math.max(i - 1, 0)]);
            }
            var frame = this._decodedFrames[frameTime];
            // console.log('source', this.source)
            // console.log('frametime,', frameTime)
            if (frame) {
              // console.log('render frame ', frameTime, Date.now())
              // let buf = []
              // if (this.meta.chromaFormat === 420) {
              //
              //   let buf0 = frame.buffer.slice(0, frame.yLinesize * frame.height);
              //   let buf1 = frame.buffer.slice(frame.yLinesize * frame.height, frame.yLinesize * frame.height * 1.25);
              //   let buf2 = frame.buffer.slice(frame.yLinesize * frame.height * 1.25, frame.yLinesize * frame.height * 1.5);
              //   buf = [new Uint8Array(buf0), new Uint8Array(buf1), new Uint8Array(buf2)];
              // }
              if (this._seekState == SEEKING) {
                this._seekState = SEEKED;
                this.emit(VIDEO_CANVAS_EVENTS.VIDEO_EVENTS, 'seeked');
              }
              frameTimes.forEach(function (time) {
                if (Number.parseInt(time) <= frameTime) {
                  delete _this4._decodedFrames[time];
                }
              });
              this.yuvCanvas.render(frame.buffer, frame.width, frame.height, frame.yLinesize, frame.uvLinesize);

              return true;
            } else {
              if (frameTimes.length && Number(frameTimes[0]) > currentTime) {
                return true;
              }
              return false;
            }
          }
        }
        this._lastRenderTime = Date.now();
      }
    }, {
      key: 'cleanBuffer',
      value: function cleanBuffer() {
        if (this.currentTime > 1) {
          this.source.remove(0, this.currentTime - 1);
        }
        var frameTimes = Object.keys(this._decodedFrames);

        for (var i = 0; i < frameTimes.length; i++) {
          if (Number.parseInt(frameTimes[i]) < this.currentTime) {
            delete this._decodedFrames[frameTimes[i]];
          }
        }
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.destroyWorker();
        this.canvas = null;
        this._decodedFrames = {};
        this.source = null;
        this._decoderInited = false;
        this._isSeeking = false;
      }
    }, {
      key: 'destroyWorker',
      value: function destroyWorker() {
        if (this.wasmworker) {
          this.wasmworker.removeEventListener('message', this.handleMessage);
          this.wasmworker.postMessage({ msg: 'destroy' });
        }
        this.wasmworker = null;
      }
    }, {
      key: 'handleMessage',
      value: function handleMessage(msg) {
        switch (msg.data.msg) {
          case 'DECODER_READY':
            console.log('wasm worker ready');
            this._decoderInited = true;
            this.pushAvcc(this.meta);
            break;
          case 'DECODED':
            this._onDecoded(msg.data);
            break;
          case 'LOG':
            // console.log(msg.data.log);
            break;
          case 'INIT_FAILED':
            this.destroyWorker();
            this.initWorker(true);
            break;
          default:
            console.error('invalid messaeg', msg);
        }
      }
    }, {
      key: 'setVideoSeeking',
      value: function setVideoSeeking() {
        this._seekState = SEEKING;
        this.emit(VIDEO_CANVAS_EVENTS.VIDEO_EVENTS, 'seeking');
      }
    }, {
      key: 'buffered',
      get: function get() {
        var ranges = [];
        var currentRange = {
          start: null,
          end: null
        };
        var decodedTimes = Object.keys(this._decodedFrames);
        if (decodedTimes.length) {
          currentRange.start = Number.parseInt(decodedTimes[0]);
          currentRange.end = Number.parseInt(decodedTimes[decodedTimes.length - 1]);
        }

        if (currentRange.start !== null && currentRange.end !== null) {
          currentRange.start = currentRange.start / 1000;
          currentRange.end = currentRange.end / 1000;
          ranges.push(currentRange);
        }

        return new TimeRanges(ranges);
      }
    }, {
      key: 'videoWidth',
      get: function get() {
        return this.canvas.width;
      }
    }, {
      key: 'videoHeight',
      get: function get() {
        return this.canvas.height;
      }
    }, {
      key: 'seeking',
      get: function get() {
        return this._seekState == SEEKING;
      }
    }, {
      key: 'readyState',
      get: function get() {
        return this.readyStatus;
      }
    }]);

    return VideoCanvas;
  }(EventEmitter);

  var _typeof$4 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

  function _possibleConstructorReturn$3(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof$4(call)) === "object" || typeof call === "function") ? call : self;
  }

  function _inherits$3(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof$4(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var AudioCtx = function (_EventEmitter) {
    _inherits$3(AudioCtx, _EventEmitter);

    function AudioCtx(config) {
      _classCallCheck$h(this, AudioCtx);

      var _this2 = _possibleConstructorReturn$3(this, (AudioCtx.__proto__ || Object.getPrototypeOf(AudioCtx)).call(this));

      _this2.config = Object.assign({}, config);
      var AudioContext = window.AudioContext || window.webkitAudioContext;
      _this2.context = new AudioContext();
      _this2.gainNode = _this2.context.createGain();
      _this2.gainNode.connect(_this2.context.destination);
      _this2.meta = undefined;
      _this2.samples = [];
      _this2.preloadTime = _this2.config.preloadTime || 3;
      _this2.duration = 0;

      _this2._currentBuffer = undefined;
      _this2._nextBuffer = undefined;
      _this2._lastpts = undefined;
      _this2._preDecode = [];
      _this2._currentTime = 0;
      _this2._decoding = false;
      _this2._volume = Number.parseFloat(_this2.config.volume) === _this2.config.volume ? _this2.config.volume : 0.6;
      _this2.gainNode.gain.value = _this2._volume;
      // 记录外部传输的状态
      _this2._played = false;
      _this2.paused = true;
      _this2.loadFinish = null; // pending play task
      _this2.waitNextID = null; // audio source end and next source not loaded
      _this2.destroyed = false;
      return _this2;
    }

    _createClass$h(AudioCtx, [{
      key: 'decodeAudio',
      value: function decodeAudio(audioTrack) {
        var samples = audioTrack.samples,
            meta = audioTrack.meta;

        var data = samples;
        audioTrack.samples = [];
        if (meta) {
          this.setAudioData(data);
        }
      }
    }, {
      key: 'setAudioData',
      value: function setAudioData(data) {
        for (var i = 0; i < data.length; i++) {
          data[i].pts = data[i].pts === undefined ? data[i].dts : data[i].pts;
          this._preDecode.push(data[i]);
        }
        this.preload();
      }
    }, {
      key: 'preload',
      value: function preload() {
        if (this._preDecode.length > 0) {
          if (this._lastpts === undefined) {
            this._lastpts = this._preDecode[0].pts;
          }
          if ((this._preDecode[this._preDecode.length - 1].pts - this._lastpts) / 1000 > this.preloadTime) {
            this.decodeAAC();
          }
        }
      }
    }, {
      key: 'decodeAAC',
      value: function decodeAAC() {
        if (this._decoding) {
          return;
        }
        this._decoding = true;
        var data = this._preDecode;
        var samples = [];
        var _this = this;
        var sample = data.shift();
        while (sample) {
          var sampleData = AudioCtx.getAACData(this.meta, sample);
          samples.push(sampleData);
          this._lastpts = sample.pts;
          sample = data.shift();
        }
        var buffer = AudioCtx.combileData(samples);
        try {
          this.context.decodeAudioData(buffer.buffer, function (buffer) {
            var audioSource = _this.context.createBufferSource();
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

            if (_this.loadFinish) {
              _this.loadFinish();
              _this.loadFinish = null;
            }
          }, function (e) {
            console.error(e);
          });
        } catch (err) {
          console.error(err);
        }
      }
    }, {
      key: 'onSourceEnded',
      value: function onSourceEnded() {
        var _this3 = this;

        if (this.destroyed) {
          return;
        }
        if (!this._nextBuffer || !this._played) {
          this.waitNextID = setTimeout(function () {
            _this3.onSourceEnded();
          }, 200);
          return;
        }
        var audioSource = this._nextBuffer.data;
        audioSource.start();
        audioSource.connect(this.gainNode);
        var _this = this;
        setTimeout(function () {
          _this.onSourceEnded.call(_this3);
        }, audioSource.buffer.duration * 1000 - 3);
        this._currentBuffer = this._nextBuffer;
        this._currentTime = this._currentBuffer.time;
        this._nextBuffer = this.getTimeBuffer(this.currentTime);
        if (this._currentBuffer) {
          this._nextBuffer = this.getTimeBuffer(this.currentTime + this._currentBuffer.duration);
        }
        this.emit('AUDIO_SOURCE_END');
      }
    }, {
      key: 'play',
      value: function play() {
        var _this4 = this;

        if (this.loadFinish) {
          return;
        }

        this._played = true;

        var _this = this;
        var playStart = function playStart() {
          var audioSource = _this4._currentBuffer.data;
          try {
            audioSource.start();
          } catch (e) {
            // NOTHING
          }
          audioSource.connect(_this4.gainNode);
          _this4.paused = false;
          if (_this4.context.state !== 'running' && _this4.playFailed) {
            _this4.context.resume().then(function () {
              if (_this4.context.state === 'running' && _this4.playFinish) {
                _this4.playFinish();
              }
            });
            setTimeout(function () {
              _this4.playFailed(new Error('audio context suspended'));
            });
          } else if (_this4.playFinish) {
            _this4.playFinish();
          }
          setTimeout(function () {
            _this.onSourceEnded.call(_this4);
          }, audioSource.buffer.duration * 1000 - 10);
        };

        if (!this._currentBuffer) {
          return new Promise(function (resolve, reject) {
            _this4.loadFinish = playStart;
            _this4.playFinish = resolve;
            _this4.playFailed = reject;
          }).then(function () {
            _this4.loadFinish = null;
            _this4.playFinish = null;
            _this4.playFailed = null;
          });
        } else {
          return new Promise(function (resolve, reject) {
            _this4.playFinish = resolve;
            _this4.playFailed = reject;
            playStart();
          });
        }
      }
    }, {
      key: 'pause',
      value: function pause() {
        var audioCtx = this.context;
        if (audioCtx.state === 'running') {
          audioCtx.suspend();
        }
        this._currentBuffer = undefined;
        this._nextBuffer = undefined;
        this._lastpts = undefined;
        // this.duration = 0;
        this.samples = [];
        this.paused = true;
      }
    }, {
      key: 'getTimeBuffer',
      value: function getTimeBuffer(time) {
        var ret = void 0;
        for (var i = 0; i < this.samples.length; i++) {
          var sample = this.samples[i];
          if (sample.time <= time && sample.time + sample.duration > time) {
            ret = sample;
            break;
          }
        }
        return ret;
      }
    }, {
      key: 'setAudioMetaData',
      value: function setAudioMetaData(meta) {
        this.meta = meta;
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        if (this.waitNextID) {
          window.clearTimeout(this.waitNextID);
        }
        this._preDecode = [];
        this.paused = true;
        this.context.close();
        this.destroyed = true;
      }
    }, {
      key: 'mute',
      value: function mute() {
        this.gainNode.gain.value = 0;
      }
    }, {
      key: 'currentTime',
      get: function get() {
        return this._currentTime;
      }
    }, {
      key: 'muted',
      set: function set(val) {
        if (val) {
          this.gainNode.gain.value = 0;
        } else {
          this.gainNode.gain.value = this._volume;
        }
        if (this.context.state === 'suspended' && !this.paused) {
          this.context.resume();
        }
      }
    }, {
      key: 'volume',
      get: function get() {
        if (this.context.state === 'suspended' || this.muted) {
          return 0;
        }
        return this._volume;
      },
      set: function set(val) {
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
    }], [{
      key: 'getAACData',
      value: function getAACData(meta, sample) {
        var buffer = new Uint8Array(sample.data.byteLength + 7);
        var adts = AudioCtx.getAdts(meta, sample.data);
        buffer.set(adts);
        buffer.set(sample.data, 7);
        return buffer;
      }
    }, {
      key: 'combileData',
      value: function combileData(samples) {
        // get length
        var length = 0;
        for (var i = 0, k = samples.length; i < k; i++) {
          length += samples[i].byteLength;
        }

        var ret = new Uint8Array(length);
        var offset = 0;
        // combile data;
        for (var _i = 0, _k = samples.length; _i < _k; _i++) {
          ret.set(samples[_i], offset);
          offset += samples[_i].byteLength;
        }
        return ret;
      }
    }, {
      key: 'getAdts',
      value: function getAdts(meta, data) {
        var adts = new Uint8Array(7);

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
        var aacframelength = data.byteLength + 7;

        adts[3] = adts[3] | 0x03 & aacframelength >> 11;
        adts[4] = 0xff & aacframelength >> 3;
        adts[5] = 0xe0 & aacframelength << 5;

        // adts_buffer_fullness 0x7ff 11bit
        adts[5] = adts[5] | 0x1f;
        adts[6] = 0xfc;

        // number_of_raw_data_blocks_in_frame 0 2bit;
        return adts;
      }
    }]);

    return AudioCtx;
  }(EventEmitter);

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

  /**
   * 音画同步调和器
   */
  var AVReconciler = function () {
    function AVReconciler(props) {
      _classCallCheck$i(this, AVReconciler);

      this.aCtx = props.aCtx;
      this.vCtx = props.vCtx;
      this.video = props.video;
      this.timeoutId = null;
      this.start = null;
    }

    _createClass$i(AVReconciler, [{
      key: "doReconcile",
      value: function doReconcile() {
        var _this = this;

        var vCurTime = this.vCtx.currentTime || 0;
        var aCurTime = void 0;
        if (this.video.noAudio) {
          aCurTime = vCurTime;
        } else {
          aCurTime = this.aCtx.currentTime * 1000 || 0;
        }

        var gap = vCurTime - aCurTime;
        if (this.timeoutId) {
          return;
        }
        if (gap > 200) {
          // audio delayed for more than 100ms
          this.video.start += gap;
          this.vCtx.pause();
          this.timeoutId = setTimeout(function () {
            _this.vCtx.play();
            _this.timeoutId = null;
          }, gap);
        } else if (gap < -120) {
          this.video.start += gap;
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.start = null;
        this.aCtx = null;
        this.vCtx = null;
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
        }
      }
    }]);

    return AVReconciler;
  }();

  var Worker$1 = new shimWorker("./tickworker.js", function (window, document) {
      var self = this;

      var interval;
      self.addEventListener('message', function (e) {
          var msg = e.data.msg;
          switch (msg) {
              case 'start':
                  clearInterval(interval);
                  interval = setInterval(function () {
                      self.postMessage('tick');
                  }, e.data.interval);
                  break;
              case 'stop':
                  clearInterval(interval);
                  break;
          }    }, false);
  });

  var _typeof$5 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  var _createClass$j = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

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

  function _classCallCheck$j(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn$4(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof$5(call)) === "object" || typeof call === "function") ? call : self;
  }

  function _inherits$4(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof$5(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var WorkerTicker = function (_Ticker) {
    _inherits$4(WorkerTicker, _Ticker);

    function WorkerTicker(config) {
      _classCallCheck$j(this, WorkerTicker);

      var _this = _possibleConstructorReturn$4(this, (WorkerTicker.__proto__ || Object.getPrototypeOf(WorkerTicker)).call(this, config));

      _this.timeoutId = null;
      _this.worker = new Worker$1();
      _this.handleMessage = _this.handleMessage.bind(_this);
      _this.worker.addEventListener('message', _this.handleMessage);
      return _this;
    }

    _createClass$j(WorkerTicker, [{
      key: 'handleMessage',
      value: function handleMessage() {
        this.onTick();
      }
    }, {
      key: 'start',
      value: function start() {
        var _get2;

        for (var _len = arguments.length, callbacks = Array(_len), _key = 0; _key < _len; _key++) {
          callbacks[_key] = arguments[_key];
        }

        (_get2 = _get$2(WorkerTicker.prototype.__proto__ || Object.getPrototypeOf(WorkerTicker.prototype), 'start', this)).call.apply(_get2, [this].concat(callbacks));
        this.onTick();
        this.worker.postMessage({
          msg: 'start',
          interval: this.options.interval
        });
      }
    }, {
      key: 'stop',
      value: function stop() {
        this.worker.postMessage({
          msg: 'stop'
        });
        this.worker.removeEventListener('message', this.handleMessage);
        this.worker = null;
        this.handleMessage = function () {};
        this.callbacks = [];
      }
    }, {
      key: 'setInterval',
      value: function setInterval(interval) {
        _get$2(WorkerTicker.prototype.__proto__ || Object.getPrototypeOf(WorkerTicker.prototype), 'setInterval', this).call(this, interval);
        this.onTick();
        this.worker.postMessage({
          msg: 'start',
          interval: this.config.interval
        });
      }
    }]);

    return WorkerTicker;
  }(Ticker);

  var _typeof$6 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

  function _possibleConstructorReturn$5(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof$6(call)) === "object" || typeof call === "function") ? call : self;
  }

  function _inherits$5(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof$6(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  // eslint-disable-next-line no-undef

  var MobileVideo = function (_HTMLElement) {
    _inherits$5(MobileVideo, _HTMLElement);

    function MobileVideo() {
      _classCallCheck$k(this, MobileVideo);

      var _this = _possibleConstructorReturn$5(this, (MobileVideo.__proto__ || Object.getPrototypeOf(MobileVideo)).call(this));

      _this._canvas = document.createElement('canvas');
      _this.handleAudioSourceEnd = _this.handleAudioSourceEnd.bind(_this);
      _this.played = false;
      _this.pendingPlayTask = null;
      _this._waiting = false;
      _this._paused = true;
      _this.videoMetaInited = false;
      _this.audioMetaInited = false;
      _this.handleVCtxInnerEvent = _this.handleVCtxInnerEvent.bind(_this);
      _this._err = null;
      _this._lastTimeupdateStamp = 0;
      _this._volumeEventStamp = 0;
      _this._hasDispatch = false;
      _this._fps = DEFAULT_FPS;
      return _this;
    }

    _createClass$k(MobileVideo, [{
      key: 'init',
      value: function init() {
        var _this2 = this;

        this._destroyed = false;
        if (this.vCtx) {
          this.vCtx.destroy();
        }
        this.vCtx = new VideoCanvas(Object.assign({
          canvas: this._canvas,
          preloadTime: this.preloadTime
        }, { style: { width: this.width, height: this.height } }));

        // this._innerDispatchEvent('waiting')
        this.vCtx.oncanplay = function () {
          if (!_this2.contains(_this2._canvas)) {
            _this2.appendChild(_this2._canvas);
            // if (this.autoplay) {
            //   this._innerDispatchEvent('play')
            // }
          }
        };
        this.vCtx.on(VIDEO_CANVAS_EVENTS.VIDEO_EVENTS, this.handleVCtxInnerEvent);
      }
    }, {
      key: '_initAudio',
      value: function _initAudio() {
        var attrVolume = this.getAttribute('volume');
        var volume = this.muted ? 0 : Number.parseFloat(attrVolume);
        if (!this.noAudio) {
          this.aCtx = new AudioCtx({
            volume: volume
          });
        }
        this.ticker = new WorkerTicker({ interval: 1000 / this._fps });
        // this.ticker = new (getTicker({interval: 1000 / this._fps}))()
        this.reconciler = new AVReconciler({
          vCtx: this.vCtx,
          aCtx: this.aCtx,
          video: this
        });
        if (!this.noAudio) {
          this.aCtx.on('AUDIO_SOURCE_END', this.handleAudioSourceEnd);
        }
      }
    }, {
      key: 'handleVCtxInnerEvent',
      value: function handleVCtxInnerEvent(eventName) {
        this._innerDispatchEvent(eventName);
      }
    }, {
      key: 'handleAudioSourceEnd',
      value: function handleAudioSourceEnd() {
        this.reconciler.doReconcile();
        this.vCtx.cleanBuffer();
        this.aCtx.preload();
        this.vCtx.preload();
      }
    }, {
      key: '_cleanBuffer',
      value: function _cleanBuffer() {
        this.vCtx.cleanBuffer();
      }
    }, {
      key: '_destroyAudio',
      value: function _destroyAudio() {
        this.audioMetaInited = false;
        if (!this.noAudio && this.aCtx) {
          this.aCtx.removeListener('AUDIO_SOURCE_END', this.handleAudioSourceEnd);
          this.aCtx.destroy();
        }
        this.start = null;
        this.aCtx = null;
        this.ticker.stop();
        this.ticker = null;
        this.pendingPlayTask = null;
        this.played = false;
        this._hasDispatch = false;
      }
    }, {
      key: '_destroyVideo',
      value: function _destroyVideo() {
        this.videoMetaInited = false;
        this.vCtx.removeAllListeners();
        this.vCtx.destroy();
        this.vCtx = null;
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        if (this._destroyed) {
          return;
        }

        this.reconciler.destroy();
        this._destroyed = true;
        this._destroyVideo();
        this._destroyAudio();
      }
    }, {
      key: 'onDemuxComplete',
      value: function onDemuxComplete(videoTrack, audioTrack) {
        if (!this.noAudio) {
          this.aCtx.decodeAudio(audioTrack);
        }
        this.vCtx.decodeVideo(videoTrack);
      }
    }, {
      key: 'decodeVideoBuffer',
      value: function decodeVideoBuffer(buffer) {
        this.vCtx.decodeVideoBuffer(buffer);
      }
    }, {
      key: 'setAudioMeta',
      value: function setAudioMeta(meta) {
        if (this.noAudio) {
          return;
        }
        this.aCtx.setAudioMetaData(meta);
        this.audioMetaInited = true;
      }
    }, {
      key: 'setVideoMeta',
      value: function setVideoMeta(meta) {
        this.vCtx.setVideoMetaData(meta);
        this.videoMetaInited = true;
      }
    }, {
      key: 'handleMediaInfo',
      value: function handleMediaInfo() {
        this._innerDispatchEvent('durationchange');
        this._innerDispatchEvent('loadedmetadata');
        this._innerDispatchEvent('seeking');
        this._innerDispatchEvent('seeked');
      }
    }, {
      key: 'handleEnded',
      value: function handleEnded() {
        this._innerDispatchEvent('ended');
      }
    }, {
      key: 'handleErr',
      value: function handleErr(code, message) {
        this._err = {};
        this._err.code = code;
        this._err.message = message;
        this._innerDispatchEvent('error');
      }
    }, {
      key: '_innerDispatchEvent',
      value: function _innerDispatchEvent(type) {
        this.dispatchEvent(new Event(type));
      }
    }, {
      key: 'disconnectedCallback',
      value: function disconnectedCallback() {
        this.destroy();
      }
    }, {
      key: 'connectedCallback',
      value: function connectedCallback() {
        // console.log('connected callback', this.noAudio)
        this._currentTime = 0;
        this.start = undefined;
        this.init();
        this._initAudio();
        this.vCtx.reset();
      }
    }, {
      key: 'play',
      value: function play() {
        var _this3 = this;

        if (this.pendingPlayTask) {
          return;
        }

        if (this.played) {
          this.connectedCallback();
        }

        if (!this.autoplay && !this._hasDispatch) {
          this._innerDispatchEvent('waiting');
          this._hasDispatch = true;
          this._waiting = true;
        }

        this._paused = false;
        this._innerDispatchEvent('play');
        var audioPlayTask = null;

        if (this.noAudio) {
          audioPlayTask = Promise.resolve();
        } else {
          audioPlayTask = this.aCtx.play();
        }
        this.pendingPlayTask = Promise.all([this.vCtx.play(), audioPlayTask.then(function () {
          if (_this3.aCtx) {
            _this3.aCtx.muted = true;
          }
        })]).then(function () {
          if (_this3.aCtx) {
            _this3.aCtx.muted = false;
          }
          _this3.ticker.start(function () {
            _this3.vCtx.preload();
            if (!_this3.start) {
              _this3.start = Date.now();
              _this3._lastTimeupdateStamp = _this3.start;
            }
            var prevTime = _this3._currentTime;

            _this3._currentTime = Date.now() - _this3.start;

            // console.log(this._currentTime, ' ', this.start)
            var rendered = _this3.vCtx._onTimer(_this3._currentTime);
            if (rendered) {
              if (_this3._waiting) {
                _this3._innerDispatchEvent('playing');
                _this3._waiting = false;
              }
              var now = Date.now();
              if (now - _this3._lastTimeupdateStamp >= 250) {
                // debounce
                _this3._lastTimeupdateStamp = now;
                _this3._innerDispatchEvent('timeupdate');
              }
            } else {
              _this3._currentTime = prevTime;
              _this3.start += Date.now() - _this3.start - prevTime;
              if (!_this3._waiting && !_this3.paused) {
                _this3._waiting = true;
                _this3._innerDispatchEvent('waiting');
              }
            }
          });
          _this3.pendingPlayTask = null;
          _this3.played = true;
          // this._innerDispatchEvent('playing')
        }).catch(function (e) {
          _this3.pendingPlayTask = null;
          _this3._paused = true;
          console.error(e);
          throw e;
        });
        return this.pendingPlayTask;
      }
    }, {
      key: 'pause',
      value: function pause() {
        var _this4 = this;

        this._paused = true;
        if (!this.noAudio) {
          this.aCtx.pause();
          this.aCtx.destroy();
        }

        this.vCtx.pause();

        this.ticker.stop();

        Promise.resolve().then(function () {
          _this4._innerDispatchEvent('pause');
        });
      }
    }, {
      key: 'load',
      value: function load() {
        // no-op for now
      }
    }, {
      key: 'onValueChange',
      value: function onValueChange() {
        var now = Date.now();
        if (now - this._volumeEventStamp < 200) {
          return;
        }
        this._volumeEventStamp = now;
        this._innerDispatchEvent('volumechange');
      }
    }, {
      key: 'width',
      get: function get() {
        return this.getAttribute('width') || this.videoWidth;
      },
      set: function set(val) {
        this.style.display = 'inline-block';
        var pxVal = typeof val === 'number' ? val + 'px' : val;
        this.setAttribute('width', pxVal);
        this.style.width = pxVal;
        this._canvas.width = val;
      }
    }, {
      key: 'height',
      get: function get() {
        return this.getAttribute('height');
      },
      set: function set(val) {
        this.style.display = 'inline-block';
        var pxVal = typeof val === 'number' ? val + 'px' : val;
        this.setAttribute('height', pxVal);
        this.style.height = pxVal;
        this._canvas.height = val;
      }
    }, {
      key: 'videoWidth',
      get: function get() {
        if (this.vCtx && this.vCtx.videoWidth) {
          return this.vCtx.videoWidth;
        }
        return 0;
      }
    }, {
      key: 'videoHeight',
      get: function get() {
        if (this.vCtx && this.vCtx.videoHeight) {
          return this.vCtx.videoHeight;
        }
        return 0;
      }
    }, {
      key: 'src',
      get: function get() {
        return this.getAttribute('src');
      },
      set: function set(val) {
        this.setAttribute('src', val);
      }
    }, {
      key: 'readyState',
      get: function get() {
        return this.videoMetaInited ? this.vCtx.readyState : 0;
      }
    }, {
      key: 'seeking',
      get: function get() {
        return this.videoMetaInited ? this.vCtx.seeking : false;
      }
    }, {
      key: 'currentTime',
      get: function get() {
        return this.videoMetaInited ? this.vCtx.currentTime / 1000 : 0;
      },
      set: function set(val) {
        var nVal = Number.parseFloat(val);
        if (!isNaN(nVal)) {
          if (this.start && this.currentTime) {
            this.vCtx.setVideoSeeking();
            var gap = this.currentTime - nVal;
            this.start += gap * 1000;
          }
        }
        return nVal;
      }
    }, {
      key: 'duration',
      get: function get() {
        return this.audioMetaInited ? this.aCtx.duration : 0;
      }
    }, {
      key: 'paused',
      get: function get() {
        return this._paused;
      }
    }, {
      key: 'playbackRate',
      get: function get() {
        if (this.hasAttribute('playbackRate')) {
          return this.getAttribute('playbackRate');
        } else {
          return 1.0;
        }
      },
      set: function set(val) {
        this.setAttribute('playbackrate', val);
        if (!this.noAudio) {
          this.aCtx.playbackRate = val;
        }
        this.vCtx.playbackRate = val;

        this._innerDispatchEvent('ratechange');
      }
    }, {
      key: 'ended',
      get: function get() {
        if (this.audioMetaInited) {
          return this.aCtx.ended;
        }
        return false;
      }
    }, {
      key: 'autoplay',
      get: function get() {
        if (this.hasAttribute('autoplay')) {
          return this.getAttribute('autoplay') == 'true';
        } else {
          return false;
        }
      },
      set: function set(value) {
        this.setAttribute('autoplay', value);
      }
    }, {
      key: 'volume',
      get: function get() {
        if (this.noAudio) {
          return 0;
        }
        return this.aCtx ? this.aCtx.volume : 0;
      },
      set: function set(vol) {
        if (this.noAudio) {
          return;
        }
        this.setAttribute('volume', vol);
        this.aCtx.volume = vol;
        if (vol > 0 && this.muted) {
          this.aCtx.mute();
        }
        this.onValueChange();
      }
    }, {
      key: 'muted',
      get: function get() {
        var attrMuted = this.getAttribute('muted') === 'true';
        if (attrMuted !== undefined) {
          return attrMuted;
        } else if (this.getAttribute('volume')) {
          return Number.parseInt(this.getAttribute('volume')) === 0;
        } else {
          return false;
        }
      },
      set: function set(val) {
        if (this.noAudio) {
          return;
        }
        this.setAttribute('muted', val);
        if (!val) {
          this.aCtx.muted = false;
        } else {
          this.aCtx.muted = true;
        }
        this.onValueChange();
      }
    }, {
      key: 'error',
      get: function get() {
        return this._err || this.vCtx.error || (this.noAudio ? null : this.aCtx.error);
      }
    }, {
      key: 'buffered',
      get: function get() {
        return this.vCtx.buffered;
      }
    }, {
      key: 'noAudio',
      get: function get() {
        return this.getAttribute('noaudio') === 'true';
      }
    }, {
      key: 'networkState',
      get: function get() {
        return 0;
      }
    }, {
      key: 'fps',
      get: function get() {
        return this._fps;
      },
      set: function set(val) {
        if (!validateFPS(val)) {
          val = DEFAULT_FPS;
        }
        this._fps = val;
        if (this.ticker) {
          this.ticker.setInterval(1000 / val);
        }
      }
    }, {
      key: 'preloadTime',
      get: function get() {
        var attrPreloadTime = this.getAttribute('preloadtime');
        if (attrPreloadTime) {
          var preloadTime = Number.parseFloat(attrPreloadTime);
          if (preloadTime > 0 && !Number.isNaN(preloadTime)) {
            return preloadTime;
          }
        }
        return Infinity;
      },
      set: function set(val) {
        if (val && Number(val) > 0) {
          this.setAttribute('preloadtime', val);
          this.vCtx.config.preloadTime = this.preloadTime;
        }
      }
    }]);

    return MobileVideo;
  }(HTMLElement);
  // eslint-disable-next-line no-undef


  customElements.define('mobile-video', MobileVideo);

  var _get$3 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

  var _createClass$l = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$l(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn$6(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits$6(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var asmSupported = function asmSupported() {
    try {
      (function MyAsmModule() {
        'use asm';
      })();
      return true;
    } catch (err) {
      // will never show...
      return false;
    }
  };

  var Raw264Player = function (_Player) {
    _inherits$6(Raw264Player, _Player);

    _createClass$l(Raw264Player, null, [{
      key: 'isSupported',
      value: function isSupported() {
        var wasmSupported = 'WebAssembly' in window;

        var WebComponentSupported = 'customElements' in window && window.customElements.define;
        var isComponentDefined = void 0;
        if (WebComponentSupported) {
          isComponentDefined = window.customElements.get('mobile-video');
        }
        return (wasmSupported || asmSupported) && isComponentDefined;
      }
    }]);

    function Raw264Player(props) {
      _classCallCheck$l(this, Raw264Player);

      if (!props.mediaType) {
        props.mediaType = 'mobile-video';
        if (props.videoConfig) {
          props.videoConfig.preloadtime = props.preloadTime || 5;
        } else {
          props.videoConfig = {
            preloadtime: props.preloadTime || 5
          };
        }
      }

      var _this = _possibleConstructorReturn$6(this, (Raw264Player.__proto__ || Object.getPrototypeOf(Raw264Player)).call(this, props));

      _this.video.setAttribute('noaudio', true);
      _this.handleTimeupdate = _this.handleTimeupdate.bind(_this);
      _this.hasPlayed = false;
      _this.hasStart = false;
      return _this;
    }

    _createClass$l(Raw264Player, [{
      key: 'start',
      value: function start() {
        if (this.hasStart) {
          return;
        } else {
          this.hasStart = true;
        }
        this.context = new Context(Events.HlsAllowedEvents);
        this.context.registry('LOADER_BUFFER', XgBuffer);
        this.core = this.context.registry('RAW_264_CONTROLLER', H264Demuxer)({ player: this, fps: this.config.fps });
        this.context.registry('FETCH_LOADER', FetchLoader);
        this.context.init();
        if (!this.config.isLive) {
          this.core.load(this.config.url);
        }

        _get$3(Raw264Player.prototype.__proto__ || Object.getPrototypeOf(Raw264Player.prototype), 'start', this).call(this);
        this.video.preloadTime = this.config.preloadTime;
        this.video.addEventListener('timeupdate', this.handleTimeupdate, false);
      }
    }, {
      key: 'replay',
      value: function replay() {
        this.video._cleanBuffer();
        this.currentTime = 0;
        this.start();
        this.play();
      }
    }, {
      key: 'handleTimeupdate',
      value: function handleTimeupdate() {
        if (!this.config.isLive && this.currentTime >= this.duration) {
          this.video._cleanBuffer();
          this.pause();
          this.emit('ended');
        } else if (this.config.isLive && this.buffered.end(0) - this.currentTime > 0.1) {
          this.currentTime = this.buffered.end(0) - 0.1;
        }
      }
    }, {
      key: 'destroy',
      value: function destroy(isDelDom) {
        _get$3(Raw264Player.prototype.__proto__ || Object.getPrototypeOf(Raw264Player.prototype), 'destroy', this).call(this, isDelDom);
        this.core.destroy();
        this.context.destroy();
        this.core = null;
        this.context = null;
      }
    }, {
      key: 'pushBuffer',
      value: function pushBuffer(arr) {
        if (!this.hasStart) {
          return this.start();
        }
        if (this.buffer) {
          this.buffer.push(arr);
          this.core.handleDataLoaded();
        }
      }
    }, {
      key: 'buffer',
      get: function get() {
        return this.context.getInstance('LOADER_BUFFER');
      }
    }, {
      key: 'currentTime',
      set: function set(time) {
        var oldTime = _get$3(Raw264Player.prototype.__proto__ || Object.getPrototypeOf(Raw264Player.prototype), 'currentTime', this);
        var buffered = this.getBufferedRange();
        if (buffered[0] <= time && buffered[1] >= time) {
          this.video.currentTime = time;
        } else {
          this.video.currentTime = oldTime;
        }
      },
      get: function get() {
        return _get$3(Raw264Player.prototype.__proto__ || Object.getPrototypeOf(Raw264Player.prototype), 'currentTime', this);
      }
    }, {
      key: 'duration',
      get: function get() {
        if (this.core && this.core.duration) {
          return this.core.duration;
        }
        return this.video.duration;
      }
    }]);

    return Raw264Player;
  }(Player);

  return Raw264Player;

})));
//# sourceMappingURL=index.js.map
