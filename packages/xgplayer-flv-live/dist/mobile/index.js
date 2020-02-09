(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('xgplayer')) :
  typeof define === 'function' && define.amd ? define(['xgplayer'], factory) :
  (global = global || self, global.FlvLiveMobilePlayer = factory(global.Player));
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

  var AudioTrackMeta = function () {
    function AudioTrackMeta(meta) {
      _classCallCheck$2(this, AudioTrackMeta);

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

    _createClass$2(AudioTrackMeta, [{
      key: 'destroy',
      value: function destroy() {
        this.init = null;
      }
    }]);

    return AudioTrackMeta;
  }();

  var VideoTrackMeta = function () {
    function VideoTrackMeta(meta) {
      _classCallCheck$2(this, VideoTrackMeta);

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

    _createClass$2(VideoTrackMeta, [{
      key: 'destroy',
      value: function destroy() {
        this.init = null;
        this.sps = null;
        this.pps = null;
      }
    }]);

    return VideoTrackMeta;
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

  var Golomb = function () {
    function Golomb(uint8array) {
      _classCallCheck$3(this, Golomb);

      this.TAG = 'Golomb';
      this._buffer = uint8array;
      this._bufferIndex = 0;
      this._totalBytes = uint8array.byteLength;
      this._totalBits = uint8array.byteLength * 8;
      this._currentWord = 0;
      this._currentWordBitsLeft = 0;
    }

    _createClass$3(Golomb, [{
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

  var SPSParser = function () {
    function SPSParser() {
      _classCallCheck$4(this, SPSParser);
    }

    _createClass$4(SPSParser, null, [{
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

  var RBSP = function () {
    function RBSP() {
      _classCallCheck$5(this, RBSP);
    }

    _createClass$5(RBSP, null, [{
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

  var u8aToString = function u8aToString(data) {
    var result = '';
    for (var i = 0; i < data.byteLength; i++) {
      result += String.fromCharCode(data[i]);
    }
    return result;
  };

  var SEIParser = function () {
    function SEIParser() {
      _classCallCheck$6(this, SEIParser);
    }

    _createClass$6(SEIParser, null, [{
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

  var Nalunit = function () {
    function Nalunit() {
      _classCallCheck$7(this, Nalunit);
    }

    _createClass$7(Nalunit, null, [{
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

  var SpsParser = SPSParser;
  var NalUnit = Nalunit;

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

  var Golomb$1 = function () {
    function Golomb(uint8array) {
      _classCallCheck$8(this, Golomb);

      this.TAG = 'Golomb';
      this._buffer = uint8array;
      this._bufferIndex = 0;
      this._totalBytes = uint8array.byteLength;
      this._totalBits = uint8array.byteLength * 8;
      this._currentWord = 0;
      this._currentWordBitsLeft = 0;
    }

    _createClass$8(Golomb, [{
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

  var SPSParser$1 = function () {
    function SPSParser() {
      _classCallCheck$9(this, SPSParser);
    }

    _createClass$9(SPSParser, null, [{
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

  var Nalunit$1 = function () {
    function Nalunit() {
      _classCallCheck$a(this, Nalunit);
    }

    _createClass$a(Nalunit, null, [{
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

  var SpsParserHEVC = SPSParser$1;
  var NalUnitHEVC = Nalunit$1;

  var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  var _createClass$b = function () {
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

  function _classCallCheck$b(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Track = function () {
    /**
     * The constructor.
     */
    function Track() {
      _classCallCheck$b(this, Track);

      this.id = -1;
      this.sequenceNumber = 0;
      this.samples = [];
      this.droppedSamples = [];
      this.length = 0;
    }

    /**
     * Reset the track.
     */

    _createClass$b(Track, [{
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
      _classCallCheck$b(this, AudioTrack);

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
      _classCallCheck$b(this, VideoTrack);

      var _this2 = _possibleConstructorReturn$1(this, (VideoTrack.__proto__ || Object.getPrototypeOf(VideoTrack)).call(this));

      _this2.TAG = 'VideoTrack';
      _this2.type = 'video';
      _this2.dropped = 0;
      return _this2;
    }
    /**
     * reset the video track.
     */

    _createClass$b(VideoTrack, [{
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
      _classCallCheck$b(this, Tracks);

      this.audioTrack = null;
      this.videoTrack = null;
    }

    _createClass$b(Tracks, [{
      key: 'destroy',
      value: function destroy() {
        this.audioTrack = null;
        this.videoTrack = null;
      }
    }]);

    return Tracks;
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
      _classCallCheck$c(this, PageVisibility);

      this.callbacks = {
        onShow: [],
        onHidden: []
      };
      this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
      this.init();
    }

    _createClass$c(PageVisibility, [{
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

  var PageVisibility$1 = PageVisibility;

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

  var UTF8 = function () {
    function UTF8() {
      _classCallCheck$d(this, UTF8);
    }

    _createClass$d(UTF8, null, [{
      key: 'decode',
      value: function decode(uint8array) {
        var out = [];
        var input = uint8array;
        var i = 0;
        var length = uint8array.length;

        while (i < length) {
          if (input[i] < 0x80) {
            out.push(String.fromCharCode(input[i]));
            ++i;
            continue;
          } else if (input[i] < 0xC0) ; else if (input[i] < 0xE0) {
            if (UTF8._checkContinuation(input, i, 1)) {
              var ucs4 = (input[i] & 0x1F) << 6 | input[i + 1] & 0x3F;
              if (ucs4 >= 0x80) {
                out.push(String.fromCharCode(ucs4 & 0xFFFF));
                i += 2;
                continue;
              }
            }
          } else if (input[i] < 0xF0) {
            if (UTF8._checkContinuation(input, i, 2)) {
              var _ucs = (input[i] & 0xF) << 12 | (input[i + 1] & 0x3F) << 6 | input[i + 2] & 0x3F;
              if (_ucs >= 0x800 && (_ucs & 0xF800) !== 0xD800) {
                out.push(String.fromCharCode(_ucs & 0xFFFF));
                i += 3;
                continue;
              }
            }
          } else if (input[i] < 0xF8) {
            if (UTF8._checkContinuation(input, i, 3)) {
              var _ucs2 = (input[i] & 0x7) << 18 | (input[i + 1] & 0x3F) << 12 | (input[i + 2] & 0x3F) << 6 | input[i + 3] & 0x3F;
              if (_ucs2 > 0x10000 && _ucs2 < 0x110000) {
                _ucs2 -= 0x10000;
                out.push(String.fromCharCode(_ucs2 >>> 10 | 0xD800));
                out.push(String.fromCharCode(_ucs2 & 0x3FF | 0xDC00));
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
    }, {
      key: '_checkContinuation',
      value: function _checkContinuation(uint8array, start, checkLength) {
        var array = uint8array;
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
    }]);

    return UTF8;
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

  var isLe = sniffer.isLe;

  var DATA_TYPES = {
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
  };
  var AMFParser = function () {
    function AMFParser() {
      _classCallCheck$e(this, AMFParser);

      this.offset = 0;
      this.readOffset = this.offset;
    }

    _createClass$e(AMFParser, [{
      key: 'resolve',
      value: function resolve(meta, size) {
        if (size < 3) {
          throw new Error('not enough data for metainfo');
        }
        var metaData = {};
        var name = this.parseValue(meta);
        var value = this.parseValue(meta, size - name.bodySize);
        metaData[name.data] = value.data;

        this.resetStatus();
        return metaData;
      }
    }, {
      key: 'resetStatus',
      value: function resetStatus() {
        this.offset = 0;
        this.readOffset = this.offset;
      }
    }, {
      key: 'parseString',
      value: function parseString(buffer) {
        var dv = new DataView(buffer, this.readOffset);
        var strLen = dv.getUint16(0, !isLe);
        var str = '';
        if (strLen > 0) {
          str = UTF8.decode(new Uint8Array(buffer, this.readOffset + 2, strLen));
        } else {
          str = '';
        }
        var size = strLen + 2;
        this.readOffset += size;
        return {
          data: str,
          bodySize: strLen + 2
        };
      }
    }, {
      key: 'parseDate',
      value: function parseDate(buffer, size) {
        var dv = new DataView(buffer, this.readOffset, size);
        var ts = dv.getFloat64(0, !isLe);
        var timeOffset = dv.getInt16(8, !isLe);
        ts += timeOffset * 60 * 1000;

        this.readOffset += 10;
        return {
          data: new Date(ts),
          bodySize: 10
        };
      }
    }, {
      key: 'parseObject',
      value: function parseObject(buffer, size) {
        var name = this.parseString(buffer, size);
        var value = this.parseValue(buffer, size - name.bodySize);
        return {
          data: {
            name: name.data,
            value: value.data
          },
          bodySize: name.bodySize + value.bodySize,
          isObjEnd: value.isObjEnd
        };
      }
    }, {
      key: 'parseLongString',
      value: function parseLongString(buffer) {
        var dv = new DataView(buffer, this.readOffset);
        var strLen = dv.getUint32(0, !isLe);
        var str = '';
        if (strLen > 0) {
          str = UTF8.decode(new Uint8Array(buffer, this.readOffset + 2, strLen));
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

    }, {
      key: 'parseValue',
      value: function parseValue(data, size) {
        var buffer = new ArrayBuffer();
        if (data instanceof ArrayBuffer) {
          buffer = data;
        } else {
          buffer = data.buffer;
        }
        var NUMBER = DATA_TYPES.NUMBER,
            BOOLEAN = DATA_TYPES.BOOLEAN,
            STRING = DATA_TYPES.STRING,
            OBJECT = DATA_TYPES.OBJECT,
            MIX_ARRAY = DATA_TYPES.MIX_ARRAY,
            OBJECT_END = DATA_TYPES.OBJECT_END,
            STRICT_ARRAY = DATA_TYPES.STRICT_ARRAY,
            DATE = DATA_TYPES.DATE,
            LONE_STRING = DATA_TYPES.LONE_STRING;

        var dataView = new DataView(buffer, this.readOffset, size);
        var isObjEnd = false;
        var type = dataView.getUint8(0);
        var offset = 1;
        this.readOffset += 1;
        var value = null;

        switch (type) {
          case NUMBER:
            {
              value = dataView.getFloat64(1, !isLe);
              this.readOffset += 8;
              offset += 8;
              break;
            }
          case BOOLEAN:
            {
              var boolNum = dataView.getUint8(1);
              value = !!boolNum;
              this.readOffset += 1;
              offset += 1;
              break;
            }
          case STRING:
            {
              var str = this.parseString(buffer);
              value = str.data;
              offset += str.bodySize;
              break;
            }
          case OBJECT:
            {
              value = {};
              var objEndSize = 0;
              if (dataView.getUint32(size - 4, !isLe) & 0x00FFFFFF) {
                objEndSize = 3;
              }
              // this.readOffset += offset - 1;
              while (offset < size - 4) {
                var amfObj = this.parseObject(buffer, size - offset - objEndSize);
                if (amfObj.isObjectEnd) {
                  break;
                }
                value[amfObj.data.name] = amfObj.data.value;
                offset += amfObj.bodySize;
              }
              if (offset <= size - 3) {
                var mark = dataView.getUint32(offset - 1, !isLe) & 0x00FFFFFF;
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
              var _objEndSize = 0;
              if ((dataView.getUint32(size - 4, !isLe) & 0x00FFFFFF) === 9) {
                _objEndSize = 3;
              }

              while (offset < size - 8) {
                var amfVar = this.parseObject(buffer, size - offset - _objEndSize);
                if (amfVar.isObjectEnd) {
                  break;
                }
                value[amfVar.data.name] = amfVar.data.value;
                offset += amfVar.bodySize;
              }
              if (offset <= size - 3) {
                var marker = dataView.getUint32(offset - 1, !isLe) & 0x00FFFFFF;
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
              var arrLength = dataView.getUint32(1, !isLe);
              offset += 4;
              this.readOffset += 4;
              for (var i = 0; i < arrLength; i++) {
                var script = this.parseValue(buffer, size - offset);
                value.push(script.data);
                offset += script.bodySize;
              }
              break;
            }

          case DATE:
            {
              var date = this.parseDate(buffer, size - 1);
              value = date.data;
              offset += date.bodySize;
              break;
            }

          case LONE_STRING:
            {
              var longStr = this.parseLongString(buffer, size - 1);
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
    }]);

    return AMFParser;
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

  var Stream = function () {
    function Stream(buffer) {
      _classCallCheck$f(this, Stream);

      if (buffer instanceof ArrayBuffer) {
        this.buffer = buffer;
        this.dataview = new DataView(buffer);
        this.dataview.position = 0;
      } else {
        throw new Error('data is invalid');
      }
    }

    _createClass$f(Stream, [{
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

  var DEMUX_EVENTS$1 = EVENTS.DEMUX_EVENTS;

  var FlvDemuxer = function () {
    function FlvDemuxer() {
      _classCallCheck$g(this, FlvDemuxer);

      this._firstFragmentLoaded = false;
      this._trackNum = 0;
      this._hasScript = false;
    }

    _createClass$g(FlvDemuxer, [{
      key: 'init',
      value: function init() {
        this.on(DEMUX_EVENTS$1.DEMUX_START, this.doParseFlv.bind(this));
      }

      /**
       * if the flv head is valid
       * @param data
       * @returns {boolean}
       */

    }, {
      key: 'doParseFlv',
      value: function doParseFlv() {
        if (!this._firstFragmentLoaded) {
          if (this.loaderBuffer.length < 13) {
            return;
          }
          var header = this.loaderBuffer.shift(13);
          this.parseFlvHeader(header);
          this.doParseFlv(); // 递归调用，继续解析flv流
        } else {
          if (this.loaderBuffer.length < 11) {
            return;
          }
          var chunk = void 0;

          var loopMax = 10000; // 防止死循环产生
          do {
            // console.log('mark4')
            chunk = this._parseFlvTag();
          } while (chunk && loopMax-- > 0);

          this.emit(DEMUX_EVENTS$1.DEMUX_COMPLETE);
        }
      }
    }, {
      key: 'parseFlvHeader',
      value: function parseFlvHeader(header) {
        if (!FlvDemuxer.isFlvFile(header)) {
          this.emit(DEMUX_EVENTS$1.DEMUX_ERROR, new Error('invalid flv file'));
          this.doParseFlv();
        } else {
          this._firstFragmentLoaded = true;
          // const playType = FlvDemuxer.getPlayType(header[4])

          this.initVideoTrack();
          this.initAudioTrack();
        }
        this.doParseFlv();
      }

      /**
       * init default video track configs
       */

    }, {
      key: 'initVideoTrack',
      value: function initVideoTrack() {
        this._trackNum++;
        var videoTrack = new VideoTrack();
        videoTrack.meta = new VideoTrackMeta();
        videoTrack.id = videoTrack.meta.id = this._trackNum;

        this.tracks.videoTrack = videoTrack;
      }

      /**
       * init default audio track configs
       */

    }, {
      key: 'initAudioTrack',
      value: function initAudioTrack() {
        this._trackNum++;
        var audioTrack = new AudioTrack();
        audioTrack.meta = new AudioTrackMeta();
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

    }, {
      key: '_parseFlvTag',
      value: function _parseFlvTag() {
        if (this.loaderBuffer.length < 11) {
          return null;
        }
        var chunk = this._parseFlvTagHeader();
        if (chunk) {
          this._processChunk(chunk);
        }
        return chunk;
      }

      /**
       * Parse the 11 byte tag Header
       */

    }, {
      key: '_parseFlvTagHeader',
      value: function _parseFlvTagHeader() {
        var offset = 0;
        var chunk = {};

        var tagType = this.loaderBuffer.toInt(offset, 1);
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
          this.emit(DEMUX_EVENTS$1.DEMUX_ERROR, this.TAG, new Error('tagType ' + chunk.tagType), false);
          return null;
        }

        if (this.loaderBuffer.length < chunk.datasize + 15) {
          return null;
        }

        // read the data.
        this.loaderBuffer.shift(4);

        // 3 Byte timestamp
        var timestamp = this.loaderBuffer.toInt(0, 3);
        this.loaderBuffer.shift(3);

        // 1 Byte timestampExt
        var timestampExt = this.loaderBuffer.shift(1)[0];
        if (timestampExt > 0) {
          timestamp += timestampExt * 0x1000000;
        }

        chunk.dts = timestamp;

        // streamId
        this.loaderBuffer.shift(3);
        return chunk;
      }
    }, {
      key: '_processChunk',
      value: function _processChunk(chunk) {
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

    }, {
      key: '_parseScriptData',
      value: function _parseScriptData(chunk) {
        var audioTrack = this.tracks.audioTrack;
        var videoTrack = this.tracks.videoTrack;

        var data = this.loaderBuffer.shift(chunk.datasize);

        var info = new AMFParser().resolve(data, data.length);

        var onMetaData = this._context.onMetaData = info ? info.onMetaData : undefined;

        // fill mediaInfo
        this._context.mediaInfo.duration = onMetaData.duration;
        this._context.mediaInfo.hasVideo = onMetaData.hasVideo;
        this._context.mediaInfo.hsaAudio = onMetaData.hasAudio;

        var validate = this._datasizeValidator(chunk.datasize);
        if (validate) {
          this.emit(DEMUX_EVENTS$1.MEDIA_INFO);
          this._hasScript = true;
        }

        // Edit default meta.
        if (audioTrack && !audioTrack.hasSpecificConfig) {
          var meta = audioTrack.meta;
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
          var _meta = videoTrack.meta;
          if (typeof onMetaData.framerate === 'number') {
            var fpsNum = Math.floor(onMetaData.framerate * 1000);
            if (fpsNum > 0) {
              var fps = fpsNum / 1000;
              if (!_meta.frameRate) {
                _meta.frameRate = {};
              }
              _meta.frameRate.fixed = true;
              _meta.frameRate.fps = fps;
              _meta.frameRate.fps_num = fpsNum;
              _meta.frameRate.fps_den = 1000;
            }
          }
        }
      }
    }, {
      key: '_aacSequenceHeaderParser',
      value: function _aacSequenceHeaderParser(data) {
        var ret = {};
        ret.hasSpecificConfig = true;
        ret.objectType = data[1] >>> 3;
        ret.sampleRateIndex = (data[1] & 7) << 1 | data[2] >>> 7;
        ret.audiosamplerate = this._switchAudioSampleRate(ret.sampleRateIndex);
        ret.channelCount = (data[2] & 120) >>> 3;
        ret.frameLength = (data[2] & 4) >>> 2;
        ret.dependsOnCoreCoder = (data[2] & 2) >>> 1;
        ret.extensionFlagIndex = data[2] & 1;

        var userAgent = window.navigator.userAgent.toLowerCase();
        var extensionSamplingIndex = void 0;

        var config = void 0;
        var samplingIndex = ret.sampleRateIndex;

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
        } else if (userAgent.indexOf('android') !== -1 || userAgent.indexOf('safari') !== -1) {
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
        ret.codec = 'mp4a.40.' + ret.objectType;
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
    }, {
      key: '_parseAACData',
      value: function _parseAACData(chunk) {
        var track = this.tracks.audioTrack;
        if (!track) {
          return;
        }

        var meta = track.meta;

        if (!meta) {
          track.meta = new AudioTrackMeta();
          meta = track.meta;
        }

        var info = this.loaderBuffer.shift(1)[0];

        chunk.data = this.loaderBuffer.shift(chunk.datasize - 1);

        var format = (info & 240) >>> 4;

        track.format = format;

        if (format !== 10) {
          this.emit(DEMUX_EVENTS$1.DEMUX_ERROR, new Error('invalid audio format: ' + format));
        }

        if (format === 10 && !this._hasAudioSequence) {
          meta.sampleRate = this._switchAudioSamplingFrequency(info);
          meta.sampleRateIndex = (info & 12) >>> 2;
          meta.frameLenth = (info & 2) >>> 1;
          meta.channelCount = info & 1;
          meta.refSampleDuration = Math.floor(1024 / meta.audioSampleRate * meta.timescale);
        }

        var audioSampleRate = meta.audioSampleRate;
        var audioSampleRateIndex = meta.sampleRateIndex;
        var refSampleDuration = meta.refSampleDuration;

        delete chunk.tagType;
        var validate = this._datasizeValidator(chunk.datasize);

        if (chunk.data[0] === 0) {
          // AAC Sequence Header
          var aacHeader = this._aacSequenceHeaderParser(chunk.data);
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

          var audioMedia = this._context.mediaInfo.audio;

          // fill audio media info
          audioMedia.codec = aacHeader.codec;
          audioMedia.channelCount = aacHeader.channelCount;
          audioMedia.sampleRate = audioSampleRate;
          audioMedia.sampleRateIndex = aacHeader.audioSampleRateIndex;

          if (!this._hasAudioSequence) {
            this.emit(DEMUX_EVENTS$1.METADATA_PARSED, 'audio');
          } else {
            this.emit(DEMUX_EVENTS$1.AUDIO_METADATA_CHANGE);
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
          this.emit(DEMUX_EVENTS$1.DEMUX_ERROR, this.TAG, new Error('TAG length error at ' + chunk.datasize), false);
          // this.logger.warn(this.TAG, error.message)
        }
      }

      /**
       * parse hevc/avc video data
       * @param chunk
       * @private
       */

    }, {
      key: '_parseHevcData',
      value: function _parseHevcData(chunk) {
        // header
        var info = this.loaderBuffer.shift(1)[0];
        chunk.frameType = (info & 0xf0) >>> 4;
        chunk.isKeyframe = chunk.frameType === 1;
        // let tempCodecID = this.tracks.videoTrack.codecID
        var codecID = info & 0x0f;
        this.tracks.videoTrack.codecID = codecID;

        // hevc和avc的header解析方式一样
        chunk.avcPacketType = this.loaderBuffer.shift(1)[0];
        chunk.cts = this.loaderBuffer.toInt(0, 3);
        this.loaderBuffer.shift(3);

        // 12 for hevc, 7 for avc
        if (codecID === 7 || codecID === 12) {
          var data = this.loaderBuffer.shift(chunk.datasize - 5);
          if (data[4] === 0 && data[5] === 0 && data[6] === 0 && data[7] === 1) {
            var avcclength = 0;
            for (var i = 0; i < 4; i++) {
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
            if (codecID === 12) {
              this._hevcSequenceHeaderParser(chunk.data);
            } else {
              this._avcSequenceHeaderParser(chunk.data);
            }
            var validate = this._datasizeValidator(chunk.datasize);
            if (validate) {
              if (!this._hasVideoSequence) {
                this.emit(DEMUX_EVENTS$1.METADATA_PARSED, 'video');
              } else {
                this.emit(DEMUX_EVENTS$1.VIDEO_METADATA_CHANGE);
                // this.emit(DEMUX_EVENTS.METADATA_PARSED, 'video')
              }
              this._hasVideoSequence = true;
            }
            this._metaChange = true;
          } else {
            if (!this._datasizeValidator(chunk.datasize)) {
              this.emit(DEMUX_EVENTS$1.DEMUX_ERROR, this.TAG, new Error('invalid video tag datasize: ' + chunk.datasize), false);
              return;
            }
            var nals = codecID === 12 ? NalUnitHEVC.getHvccNals(new Stream(chunk.data.buffer)) : NalUnit.getAvccNals(new Stream(chunk.data.buffer));
            for (var _i = 0; _i < nals.length; _i++) {
              var unit = nals[_i];
              codecID === 12 ? NalUnitHEVC.analyseNal(unit) : NalUnit.analyseNal(unit);
              if (unit.sei) {
                this.emit(DEMUX_EVENTS$1.SEI_PARSED, unit.sei);
              }
            }
            codecID === 12 ? this.tracks.videoTrack.meta.streamType = 0x24 : this.tracks.videoTrack.meta.streamType = 0x1b;
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
          this.emit(DEMUX_EVENTS$1.DEMUX_ERROR, this.TAG, new Error('video codeid is ' + codecID), false);
          chunk.data = this.loaderBuffer.shift(chunk.datasize - 1);
          if (!this._datasizeValidator(chunk.datasize)) {
            this.emit(DEMUX_EVENTS$1.DEMUX_ERROR, this.TAG, new Error('invalid video tag datasize: ' + chunk.datasize), false);
          }

          this.tracks.videoTrack.samples.push(chunk);
          this.emit(DEMUX_EVENTS$1.DEMUX_COMPLETE);
        }
        delete chunk.tagType;
      }

      /**
       * parse avc metadata
       * @param data
       * @private
       */

    }, {
      key: '_avcSequenceHeaderParser',
      value: function _avcSequenceHeaderParser(data) {
        var track = this.tracks.videoTrack;

        if (!track) {
          return;
        }

        var offset = 0;

        if (!track.meta) {
          track.meta = new VideoTrackMeta();
        }
        var meta = track.meta;

        meta.configurationVersion = data[0];
        meta.avcProfileIndication = data[1];
        meta.profileCompatibility = data[2];
        meta.avcLevelIndication = data[3] / 10;
        meta.nalUnitLength = (data[4] & 0x03) + 1;

        var numOfSps = data[5] & 0x1f;
        offset = 6;
        var config = {};

        // parse SPS
        for (var i = 0; i < numOfSps; i++) {
          var size = data[offset] * 255 + data[offset + 1];
          offset += 2;

          var sps = new Uint8Array(size);
          for (var j = 0; j < size; j++) {
            sps[j] = data[offset + j];
          }

          // codec string
          var codecString = 'avc1.';
          for (var _j = 1; _j < 4; _j++) {
            var h = sps[_j].toString(16);
            if (h.length < 2) {
              h = '0' + h;
            }
            codecString += h;
          }

          meta.codec = codecString;

          offset += size;
          this.tracks.videoTrack.meta.sps = sps;
          config = SpsParser.parseSPS(sps);
        }

        var numOfPps = data[offset];

        offset++;

        for (var _i2 = 0; _i2 < numOfPps; _i2++) {
          var _size = data[offset] * 255 + data[offset + 1];
          offset += 2;
          var pps = new Uint8Array(_size);
          for (var _j2 = 0; _j2 < _size; _j2++) {
            pps[_j2] = data[offset + _j2];
          }
          offset += _size;
          this.tracks.videoTrack.meta.pps = pps;
        }

        Object.assign(meta, SpsParser.toVideoMeta(config));

        // fill video media info
        var videoMedia = this._context.mediaInfo.video;

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
        meta.streamType = 0x1b;

        track.meta = meta;
      }

      /**
       * parse hevc metadata
       * @param data
       * @private
       */

    }, {
      key: '_hevcSequenceHeaderParser',
      value: function _hevcSequenceHeaderParser(data) {
        var track = this.tracks.videoTrack;

        if (!track) {
          return;
        }

        var offset = 0;

        if (!track.meta) {
          track.meta = new VideoTrackMeta();
        }
        var meta = track.meta;

        meta.configurationVersion = data[0];
        meta.hevcProfileSpace = (data[1] & 0xc0) >>> 6;
        meta.hevcTierFlag = (data[1] & 0x20) >>> 5;
        meta.hevcProfileIdc = data[1] & 0x1f;
        meta.hevcProfileCompatibilityFlags = [data[2], data[3], data[4], data[5]];
        meta.hevcConstraintIndicatorFlags = [data[6], data[7], data[8], data[9], data[10], data[11]];
        meta.hevcLevelIdc = data[12];
        meta.minSpatialSegmentationIdc = data[13] & 0x0f + data[14] << 4;
        meta.parallelismType = data[15] & 0x03;
        meta.chromaFormat = data[16] & 0x03;
        meta.bitDepthLumaMinus8 = data[17] & 0x07;
        meta.bitDepthChromaMinus8 = data[18] & 0x07;
        meta.avgFrameRate = data[19] * 256 + data[20];
        meta.constantFrameRate = (data[21] & 0xc0) >>> 6;
        meta.numTemporalLayers = (data[21] & 0x38) >>> 3;
        meta.temporalIdNested = (data[21] & 0x04) >>> 2;
        meta.lengthSizeMinusOne = data[21] & 0x03;
        var numOfArrays = data[22];

        offset = 23;
        var config = {};
        var nalUnitType = 0;
        var numNalus = 0;
        var nalUnitSize = 0;
        var hasVPS = false;
        var hasSPS = false;
        var hasPPS = false;
        var vps = void 0,
            sps = void 0,
            pps = void 0;
        for (var i = 0; i < numOfArrays; i++) {
          nalUnitType = data[offset] & 0x3f;
          numNalus = data[offset + 1] * 256 + data[offset + 2];
          offset += 3;
          for (var j = 0; j < numNalus; j++) {
            nalUnitSize = data[offset] * 256 + data[offset + 1];
            switch (nalUnitType) {
              case 32:
                if (!hasVPS) {
                  hasVPS = true;
                  vps = data.slice(offset + 2, offset + 2 + nalUnitSize);
                  this.tracks.videoTrack.meta.vps = SpsParserHEVC._ebsp2rbsp(vps);
                }
                break;
              case 33:
                if (!hasSPS) {
                  hasSPS = true;
                  sps = data.slice(offset + 2, offset + 2 + nalUnitSize);
                  this.tracks.videoTrack.meta.sps = SpsParserHEVC._ebsp2rbsp(sps);
                  meta.codec = 'hev1.1.6.L93.B0';
                  config = SpsParserHEVC.parseSPS(sps);
                }
                break;
              case 34:
                if (!hasPPS) {
                  hasPPS = true;
                  pps = data.slice(offset + 2, offset + 2 + nalUnitSize);
                  this.tracks.videoTrack.meta.pps = SpsParserHEVC._ebsp2rbsp(pps);
                }
                break;
            }
            offset += 2 + nalUnitSize;
          }
        }

        Object.assign(meta, SpsParserHEVC.toVideoMeta(config));

        // fill video media info
        var videoMedia = this._context.mediaInfo.video;

        videoMedia.codec = meta.codec;
        videoMedia.profile = meta.profile;
        videoMedia.level = meta.level;
        videoMedia.chromaFormat = meta.chromaFormat;
        videoMedia.frameRate = meta.frameRate;
        videoMedia.parRatio = meta.parRatio;
        videoMedia.width = videoMedia.width === meta.presentWidth ? videoMedia.width : meta.presentWidth;
        videoMedia.height = videoMedia.height === meta.presentHeight ? videoMedia.width : meta.presentHeight;

        meta.duration = this._context.mediaInfo.duration * meta.timescale;

        meta.streamType = 0x24;

        track.meta = meta;
      }

      /**
       * choose audio sample rate
       * @param samplingFrequencyIndex
       * @returns {number}
       * @private
       */

    }, {
      key: '_switchAudioSampleRate',
      value: function _switchAudioSampleRate(samplingFrequencyIndex) {
        var samplingFrequencyList = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];
        return samplingFrequencyList[samplingFrequencyIndex];
      }

      /**
       * choose audio sampling frequence
       * @param info
       * @returns {number}
       * @private
       */

    }, {
      key: '_switchAudioSamplingFrequency',
      value: function _switchAudioSamplingFrequency(info) {
        var samplingFrequencyIndex = (info & 12) >>> 2;
        var samplingFrequencyList = [5500, 11025, 22050, 44100, 48000];
        return samplingFrequencyList[samplingFrequencyIndex];
      }

      /**
       * choose audio channel count
       * @param info
       * @returns {number}
       * @private
       */

    }, {
      key: '_switchAudioChannel',
      value: function _switchAudioChannel(info) {
        var sampleTrackNumIndex = info & 1;
        var sampleTrackNumList = [1, 2];
        return sampleTrackNumList[sampleTrackNumIndex];
      }

      /**
       * check datasize is valid use 4 Byte after current tag
       * @param datasize
       * @returns {boolean}
       * @private
       */

    }, {
      key: '_datasizeValidator',
      value: function _datasizeValidator(datasize) {
        var datasizeConfirm = this.loaderBuffer.toInt(0, 4);
        this.loaderBuffer.shift(4);
        return datasizeConfirm === datasize + 11;
      }
    }, {
      key: 'loaderBuffer',
      get: function get() {
        var buffer = this._context.getInstance('LOADER_BUFFER');
        if (buffer) {
          return buffer;
        } else {
          this.emit(DEMUX_EVENTS$1.DEMUX_ERROR, new Error('找不到 loaderBuffer 实例'));
        }
      }
    }, {
      key: 'tracks',
      get: function get() {
        return this._context.getInstance('TRACKS');
      }
    }, {
      key: 'logger',
      get: function get() {
        return this._context.getInstance('LOGGER');
      }
    }], [{
      key: 'isFlvFile',
      value: function isFlvFile(data) {
        return !(data[0] !== 0x46 || data[1] !== 0x4C || data[2] !== 0x56 || data[3] !== 0x01);
      }

      /**
       * If the stream has audio or video.
       * @param {number} streamFlag - Data from the stream which is define whether the audio / video track is exist.
       */

    }, {
      key: 'getPlayType',
      value: function getPlayType(streamFlag) {
        var result = {
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
    }]);

    return FlvDemuxer;
  }();

  var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

  var _typeof$2 = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
  };

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

  var LOADER_EVENTS$1 = EVENTS.LOADER_EVENTS;
  var READ_STREAM = 0;
  var READ_TEXT = 1;
  var READ_JSON = 2;
  var READ_BUFFER = 3;

  var FetchLoader = function () {
    function FetchLoader(configs) {
      _classCallCheck$h(this, FetchLoader);

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

    _createClass$h(FetchLoader, [{
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

  var XgBuffer = function () {
    /**
     * A buffer to store loaded data.
     *
     * @class LoaderBuffer
     * @param {number} length - Optional the buffer size
     */
    function XgBuffer(length) {
      _classCallCheck$i(this, XgBuffer);

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

    _createClass$i(XgBuffer, [{
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

  var _createClass$j = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$j(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var DEMUX_EVENTS$2 = EVENTS.DEMUX_EVENTS;
  var LOADER_EVENTS$2 = EVENTS.LOADER_EVENTS;
  var BROWSER_EVENTS$2 = EVENTS.BROWSER_EVENTS;

  var Tag = 'FLVController';

  var Logger = function () {
    function Logger() {
      _classCallCheck$j(this, Logger);
    }

    _createClass$j(Logger, [{
      key: 'warn',
      value: function warn() {}
    }]);

    return Logger;
  }();

  var FLV_ERROR = 'FLV_ERROR';

  var FlvController = function () {
    function FlvController(player) {
      _classCallCheck$j(this, FlvController);

      this.TAG = Tag;
      this._player = player;
      this.state = {
        initSegmentArrived: false,
        randomAccessPoints: []
      };

      this.bufferClearTimer = null;
    }

    _createClass$j(FlvController, [{
      key: 'init',
      value: function init() {

        this.initComponents();
        this.initListeners();
      }
    }, {
      key: 'initComponents',
      value: function initComponents() {
        this._context.registry('FETCH_LOADER', FetchLoader);
        this._context.registry('LOADER_BUFFER', XgBuffer);

        this._context.registry('FLV_DEMUXER', FlvDemuxer);
        this._context.registry('TRACKS', Track);

        this._context.registry('LOGGER', Logger);
        this._context.registry('PAGE_VISIBILITY', PageVisibility$1);
      }
    }, {
      key: 'initListeners',
      value: function initListeners() {
        this.on(LOADER_EVENTS$2.LOADER_DATALOADED, this._handleLoaderDataLoaded.bind(this));
        this.on(LOADER_EVENTS$2.LOADER_ERROR, this._handleNetworkError.bind(this));

        this.on(DEMUX_EVENTS$2.MEDIA_INFO, this._handleMediaInfo.bind(this));
        this.on(DEMUX_EVENTS$2.METADATA_PARSED, this._handleMetadataParsed.bind(this));
        this.on(DEMUX_EVENTS$2.DEMUX_COMPLETE, this._handleDemuxComplete.bind(this));
        this.on(DEMUX_EVENTS$2.DEMUX_ERROR, this._handleDemuxError.bind(this));
        this.on(DEMUX_EVENTS$2.SEI_PARSED, this._handleSEIParsed.bind(this));
        this.on(BROWSER_EVENTS$2.VISIBILITY_CHANGE, this._handleVisibilityChange.bind(this));
      }
    }, {
      key: '_handleMediaInfo',
      value: function _handleMediaInfo() {
        if (!this._context.mediaInfo) {
          this.emit(DEMUX_EVENTS$2.DEMUX_ERROR, new Error('failed to get mediainfo'));
        }
      }
    }, {
      key: '_handleLoaderDataLoaded',
      value: function _handleLoaderDataLoaded() {
        this.emitTo('FLV_DEMUXER', DEMUX_EVENTS$2.DEMUX_START);
      }
    }, {
      key: '_handleSEIParsed',
      value: function _handleSEIParsed(sei) {
        this._player.emit('SEI_PARSED', sei);
      }
    }, {
      key: '_handleDemuxComplete',
      value: function _handleDemuxComplete() {
        if (this._player.video) {
          var _context$getInstance = this._context.getInstance('TRACKS'),
              videoTrack = _context$getInstance.videoTrack,
              audioTrack = _context$getInstance.audioTrack;

          this._player.video.onDemuxComplete(videoTrack, audioTrack);
        }
      }
    }, {
      key: '_handleVisibilityChange',
      value: function _handleVisibilityChange(visible) {
        if (!visible && !this._player.paused) {
          this._player.pause();
        }
      }
    }, {
      key: '_handleMetadataParsed',
      value: function _handleMetadataParsed(type) {
        if (type === 'audio') {
          // 将音频meta信息交给audioContext，不走remux封装
          var _context$getInstance2 = this._context.getInstance('TRACKS'),
              audioTrack = _context$getInstance2.audioTrack;

          if (audioTrack && audioTrack.meta) {
            this._setMetaToAudio(audioTrack.meta);
          }
        } else {
          var _context$getInstance3 = this._context.getInstance('TRACKS'),
              videoTrack = _context$getInstance3.videoTrack;

          if (videoTrack && videoTrack.meta) {
            this._setMetaToVideo(videoTrack.meta);
          }
        }
      }
    }, {
      key: '_setMetaToAudio',
      value: function _setMetaToAudio(audioMeta) {
        if (this._player.video) {
          this._player.video.setAudioMeta(audioMeta);
        }
      }
    }, {
      key: '_setMetaToVideo',
      value: function _setMetaToVideo(videoMeta) {
        if (this._player.video) {
          this._player.video.setVideoMeta(videoMeta);
        }
      }
    }, {
      key: '_handleAppendInitSegment',
      value: function _handleAppendInitSegment() {
        this.state.initSegmentArrived = true;
      }
    }, {
      key: '_handleNetworkError',
      value: function _handleNetworkError(tag, err) {
        this._player.emit('error', new Player.Errors('network', this._player.config.url));
        this._onError(LOADER_EVENTS$2.LOADER_ERROR, tag, err, true);
      }
    }, {
      key: '_handleDemuxError',
      value: function _handleDemuxError(tag, err, fatal) {
        if (fatal === undefined) {
          fatal = false;
        }
        this._player.emit('error', new Player.Errors('parse', this._player.config.url));
        this._onError(DEMUX_EVENTS$2.DEMUX_ERROR, tag, err, fatal);
      }
    }, {
      key: '_handleAddRAP',
      value: function _handleAddRAP(rap) {
        if (this.state.randomAccessPoints) {
          this.state.randomAccessPoints.push(rap);
        }
      }
    }, {
      key: '_onError',
      value: function _onError(type, mod, err, fatal) {
        var error = {
          errorType: type,
          errorDetails: '[' + mod + ']: ' + err.message,
          errorFatal: fatal || false
        };
        this._player.emit(FLV_ERROR, error);
      }
    }, {
      key: 'seek',
      value: function seek() {
        if (!this.state.initSegmentArrived) {
          this.loadData();
        }
      }
    }, {
      key: 'loadData',
      value: function loadData() {
        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._player.config.url;

        this.emit(LOADER_EVENTS$2.LADER_START, url);
      }
    }, {
      key: 'pause',
      value: function pause() {
        var loader = this._context.getInstance('FETCH_LOADER');

        if (loader) {
          loader.cancel();
        }
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this._player = null;
        this.state.randomAccessPoints = [];
      }
    }]);

    return FlvController;
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

  var _typeof$3 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

  var _createClass$k = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
      }
    }return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
  }();

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

  function _classCallCheck$k(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  /**
   * @author fuyuhao@bytedance.com
   */

  var Ticker = function () {
    function Ticker(options) {
      _classCallCheck$k(this, Ticker);

      this.options = Object.assign({}, options || {}, {
        interval: 16
      });

      this.callbacks = [];
    }

    _createClass$k(Ticker, [{
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
        this.options.interval = interval;
        return this;
      }
    }]);

    return Ticker;
  }();

  /**
   * ticker use requestAnimationFrame
   */

  var RafTicker = function (_Ticker) {
    _inherits$2(RafTicker, _Ticker);

    function RafTicker(props) {
      _classCallCheck$k(this, RafTicker);

      var _this = _possibleConstructorReturn$2(this, (RafTicker.__proto__ || Object.getPrototypeOf(RafTicker)).call(this, props));

      _this.prev = null;
      _this.timerId = null;
      _this._subTimerId = null;

      _this._tickFunc = RafTicker.getTickFunc();
      _this.tick = _this.tick.bind(_this);
      return _this;
    }

    _createClass$k(RafTicker, [{
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
    _inherits$2(TimeoutTicker, _Ticker2);

    function TimeoutTicker(config) {
      _classCallCheck$k(this, TimeoutTicker);

      var _this2 = _possibleConstructorReturn$2(this, (TimeoutTicker.__proto__ || Object.getPrototypeOf(TimeoutTicker)).call(this, config));

      _this2.timeoutId = null;
      return _this2;
    }

    _createClass$k(TimeoutTicker, [{
      key: "start",
      value: function start() {
        var _get3,
            _this3 = this;

        for (var _len3 = arguments.length, callbacks = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          callbacks[_key3] = arguments[_key3];
        }

        (_get3 = _get$1(TimeoutTicker.prototype.__proto__ || Object.getPrototypeOf(TimeoutTicker.prototype), "nextTick", this)).call.apply(_get3, [this].concat(callbacks));
        this.timeoutId = window.setInterval(function () {
          _this3.onTick();
        }, this.options.interval || 16);
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.timeoutId) {
          window.clearInterval(this.timeoutId);
        }
      }
    }]);

    return TimeoutTicker;
  }(Ticker);

  /**
   * 返回Ticker构造函数
   * @returns {Ticker}
   */

  var getTicker = function getTicker() {
    if (RafTicker.isSupported()) {
      return RafTicker;
    } else {
      return TimeoutTicker;
    }
  };

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
    var MAX_STREAM_BUFFER_LENGTH = 1024 * 1024;
    var Decoder = function Decoder(self) {
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
      var info = Object.assign({}, this.infolist[infoid]);
      var yRowcount = height;
      var uvRowcount = height / 2;
      if (this.meta.chromaFormat === 444 || this.meta.chromaFormat === 422) {
        uvRowcount = height;
      }
      var data = this.toU8Array(offset, yLinesize * yRowcount + 2 * (uvLinesize * uvRowcount));
      this.infolist[infoid] = null;
      var datetemp = new Uint8Array(data.length);
      datetemp.set(data);
      var buffer = datetemp.buffer;
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

    var decoder;

    function onPostRun() {
      decoder = new Decoder(this);
      decoder.init();
    }

    function init(meta) {
      if (!decoder) {
        self.importScripts('https://sf1-vcloudcdn.pstatp.com/obj/ttfe/media/decoder/h264/decoder.js');
      }
      addOnPostRun(onPostRun.bind(self));
    }

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
        }
      }
    }, false);
  });

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

  var YUVCanvas = function () {
    function YUVCanvas(configs) {
      _classCallCheck$l(this, YUVCanvas);

      this.configs = Object.assign({}, configs);
      this.canvas = this.configs.canvas;
      this.meta = Object.assign({}, this.configs.meta);
      this.chroma = this.meta.chromaFormat;
      this.height = this.meta.presentHeight;
      this.width = this.meta.presentWidth;
      this.canvas.width = this.meta.presentWidth;
      this.canvas.height = this.meta.presentHeight;
      // this.canvas.style.width = configs.style.width;
      // this.canvas.style.height = configs.style.height;
      this._initContextGL();
      if (this.contextGL) {
        this._initProgram();
        this._initBuffers();
        this._initTextures();
      }  }

    _createClass$l(YUVCanvas, [{
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

        var uDataPerRow = width / 2;
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
        if (gl) {
          this._drawPictureGL(data, width, height, yLinesize, uvLinesize);
        } else {
          this._drawPictureRGB(data);
        }
      }
    }]);

    return YUVCanvas;
  }();

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

  var SourceBuffer = function () {
    function SourceBuffer(config) {
      _classCallCheck$m(this, SourceBuffer);

      this.config = Object.assign({}, config);
      this.type = this.config.type;
      this.buffer = [];
      this.currentGop = undefined;
      this._lastGet = undefined;
    }

    _createClass$m(SourceBuffer, [{
      key: 'push',
      value: function push(frame) {
        if (this.type === 'video') {
          if (frame.isKeyframe) {
            var currentGop = {
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
    }, {
      key: 'get',
      value: function get(time) {
        if (this.type === 'video') {
          if (this.buffer.length < 1) {
            return;
          }

          if (time === undefined) {
            var sample = this._getNext();
            return sample;
          }
        }
      }
    }, {
      key: '_getNext',
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
      key: 'remove',
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

  var TimeRanges = function () {
    function TimeRanges(ranges) {
      _classCallCheck$n(this, TimeRanges);

      this.ranges = ranges || [];
    }

    _createClass$n(TimeRanges, [{
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

  var VideoCanvas = function () {
    function VideoCanvas(config) {
      _classCallCheck$o(this, VideoCanvas);

      this.config = Object.assign({}, config);
      this.canvas = this.config.canvas ? this.config.canvas : document.createElement('canvas');
      this.source = new SourceBuffer({ type: 'video' });
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

      this.canvas.style.maxWidth = '100%';
      this.canvas.style.maxHeight = '100%';
      this.canvas.style.top = 0;
      this.canvas.style.bottom = 0;
      this.canvas.style.left = 0;
      this.canvas.style.right = 0;
      this.canvas.style.margin = 'auto';
      this.canvas.style.position = 'absolute';
    }

    _createClass$o(VideoCanvas, [{
      key: 'pause',
      value: function pause() {
        this.paused = true;
      }
    }, {
      key: 'initWasmWorker',
      value: function initWasmWorker() {
        var _this2 = this;

        var _this = this;
        // eslint-disable-next-line no-undef
        this.wasmworker = new VideoWorker();
        this.wasmworker.postMessage({
          msg: 'init',
          meta: this.meta
        });
        this.wasmworker.addEventListener('message', function (msg) {
          switch (msg.data.msg) {
            case 'DECODER_READY':
              _this._decoderInited = true;
              break;
            case 'DECODED':
              _this2._onDecoded(msg.data);
              break;
          }
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
        }
        this.readyStatus = 1;
      }
    }, {
      key: 'decodeVideo',
      value: function decodeVideo(videoTrack) {
        if (!this._decoderInited) {
          return;
        }

        if (!this._avccpushed) {
          this.setVideoMetaData(this.meta);
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

        this._preload();
      }
    }, {
      key: '_preload',
      value: function _preload() {
        if (!this._lastSampleDts || this._lastSampleDts - this._baseDts < this.currentTime + this.preloadTime * 1000) {
          var sample = this.source.get();
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
    }, {
      key: '_analyseNal',
      value: function _analyseNal(sample) {
        var nals = NalUnit.getAvccNals(new Stream(sample.data.buffer));

        var length = 0;
        for (var i = 0; i < nals.length; i++) {
          var nal = nals[i];
          length += nal.body.byteLength + 4;
        }
        var offset = 0;
        var data = new Uint8Array(length);
        for (var _i = 0; _i < nals.length; _i++) {
          var _nal = nals[_i];
          data.set([0, 0, 0, 1], offset);
          offset += 4;
          data.set(new Uint8Array(_nal.body), offset);
          offset += _nal.body.byteLength;
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
    }, {
      key: '_onDecoded',
      value: function _onDecoded(data) {
        var dts = data.info.dts;

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
    }, {
      key: 'play',
      value: function play() {
        var _this3 = this;

        this.paused = false;
        return new Promise(function (resolve) {
          _this3.playFinish = resolve;
        }).then(function () {
          _this3.playFinish = null;
        });
      }
    }, {
      key: '_onTimer',
      value: function _onTimer(currentTime) {
        if (this.paused) {
          return;
        }

        if (this.meta) {
          if (this.meta.frameRate && this.meta.frameRate.fixed && this.meta.frameRate.fps) ;
          var frameTimes = Object.keys(this._decodedFrames);
          if (frameTimes.length > 0) {
            this.currentTime = currentTime;
            var frameTime = -1;
            for (var i = 0; i < frameTimes.length && Number.parseInt(frameTimes[i]) - this._baseDts <= this.currentTime; i++) {
              frameTime = Number.parseInt(frameTimes[i - 1]);
            }

            var frame = this._decodedFrames[frameTime];
            if (frame) {
              // let buf = []
              // if (this.meta.chromaFormat === 420) {
              //
              //   let buf0 = frame.buffer.slice(0, frame.yLinesize * frame.height);
              //   let buf1 = frame.buffer.slice(frame.yLinesize * frame.height, frame.yLinesize * frame.height * 1.25);
              //   let buf2 = frame.buffer.slice(frame.yLinesize * frame.height * 1.25, frame.yLinesize * frame.height * 1.5);
              //   buf = [new Uint8Array(buf0), new Uint8Array(buf1), new Uint8Array(buf2)];
              // }
              this.yuvCanvas.render(frame.buffer, frame.width, frame.height, frame.yLinesize, frame.uvLinesize);
            }
            for (var _i2 = 0; _i2 < frameTimes.length; _i2++) {
              if (Number.parseInt(frameTimes[_i2]) < frameTime) {
                delete this._decodedFrames[frameTimes[_i2]];
              }
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
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.wasmworker.postMessage({ msg: 'destroy' });
        this.wasmworker = null;
        this.canvas = null;
        this.source = null;
        this._decoderInited = false;
      }
    }, {
      key: 'buffered',
      get: function get() {
        var ranges = [];
        var currentRange = {
          start: null,
          end: null
        };
        for (var i = 0; i < this.source.buffer.length; i++) {
          var _source$buffer$i = this.source.buffer[i],
              start = _source$buffer$i.start,
              end = _source$buffer$i.end;

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
              start: start,
              end: end
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

        return new TimeRanges(ranges);
      }
    }]);

    return VideoCanvas;
  }();

  var _typeof$4 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
      _classCallCheck$p(this, AudioCtx);

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
      _this2._volume = _this2.config.volume || 0.6;

      // 记录外部传输的状态
      _this2._played = false;
      _this2.paused = true;
      _this2.playFinish = null; // pending play task
      _this2.waitNextID = null; // audio source end and next source not loaded
      return _this2;
    }

    _createClass$p(AudioCtx, [{
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

            if (_this.playFinish) {
              _this.playFinish();
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

        if (this.paused) {
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
        this.waitNextID = setTimeout(function () {
          _this.onSourceEnded.call(_this3);
        }, audioSource.buffer.duration * 1000 - 10);
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

        if (this.playFinish) {
          return;
        }
        this._played = true;
        if (this.context.state === 'suspended') {
          this.context.resume();
        }
        var _this = this;
        var playStart = function playStart() {
          var audioSource = _this4._currentBuffer.data;
          audioSource.start();
          audioSource.connect(_this4.gainNode);
          _this4.paused = false;
          setTimeout(function () {
            _this.onSourceEnded.call(_this4);
          }, audioSource.buffer.duration * 1000 - 20);
        };

        if (!this._currentBuffer) {
          return new Promise(function (resolve) {
            _this4.playFinish = resolve;
          }).then(function () {
            _this4.playFinish = null;
            playStart();
          });
        } else {
          playStart();
          return Promise.resolve();
        }
      }
    }, {
      key: 'pause',
      value: function pause() {
        var audioCtx = this.context;
        if (audioCtx.state === 'running') {
          audioCtx.suspend();
        }
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
        this.paused = true;
        this.context.close();
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
        if (this.context.state === 'suspended' || this.paused) {
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

  /**
   * 音画同步调和器
   */
  var AVReconciler = function () {
    function AVReconciler(props) {
      _classCallCheck$q(this, AVReconciler);

      this.aCtx = props.aCtx;
      this.vCtx = props.vCtx;
      this.video = props.video;
      this.timeoutId = null;
      this.start = null;
    }

    _createClass$q(AVReconciler, [{
      key: "doReconcile",
      value: function doReconcile() {
        var _this = this;

        var vCurTime = this.vCtx.currentTime || 0;
        var aCurTime = (this.aCtx.currentTime || 0) * 1000;

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
      }
    }]);

    return AVReconciler;
  }();

  var _typeof$5 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

  // eslint-disable-next-line no-undef

  var MobileVideo = function (_HTMLElement) {
    _inherits$4(MobileVideo, _HTMLElement);

    _createClass$r(MobileVideo, null, [{
      key: 'resolveVideoGOP',

      /**
       * 保证当前播放的视频以gop为单位
       * @param videoTrack
       */
      value: function resolveVideoGOP(videoTrack) {
        var samples = videoTrack.samples;

        if (!samples.length) {
          return;
        }

        var firstIframeIdx = null;
        var lastIframeIdx = null;

        if (videoTrack.tempSamples && videoTrack.tempSamples.length) {
          // 将缓存帧放置到队列的头部
          samples.unshift.apply(samples, videoTrack.tempSamples);
        }

        // 寻找第一个I帧
        for (var i = 0, len = samples.length; i < len; i++) {
          var current = samples[i];
          if (current.isKeyframe) {
            firstIframeIdx = i;
            break;
          }
        }

        // 寻找最后一个I帧
        for (var _i = samples.length - 1; _i > 0; _i++) {
          var _current = samples[_i];

          if (_current.isKeyframe) {
            lastIframeIdx = _i;
            break;
          }
        }

        if (firstIframeIdx !== 0) {
          samples.splice(0, firstIframeIdx - 1);
        }

        videoTrack.samples = samples.slice(0, lastIframeIdx);
        var rest = samples.slice(lastIframeIdx);
        if (videoTrack.tempSamples) {
          videoTrack.tempSamples.push.apply(videoTrack.tempSamples, rest);
        } else {
          // 将剩下的帧缓存，等待一个完整的gop
          videoTrack.tempSamples = rest;
        }
      }
    }]);

    function MobileVideo() {
      _classCallCheck$r(this, MobileVideo);

      var _this = _possibleConstructorReturn$4(this, (MobileVideo.__proto__ || Object.getPrototypeOf(MobileVideo)).call(this));

      _this._canvas = document.createElement('canvas');
      _this.handleAudioSourceEnd = _this.handleAudioSourceEnd.bind(_this);
      _this.played = false;
      _this.pendingPlayTask = null;
      _this._paused = true;
      _this.videoMetaInited = false;
      _this.audioMetaInited = false;
      _this.init();
      return _this;
    }

    _createClass$r(MobileVideo, [{
      key: 'init',
      value: function init() {
        var _this2 = this;

        this.vCtx = new VideoCanvas(Object.assign({
          canvas: this._canvas
        }, { style: { width: this.width, height: this.height } }));
        this.aCtx = new AudioCtx({});
        this.ticker = new (getTicker())();
        this.reconciler = new AVReconciler({
          vCtx: this.vCtx,
          aCtx: this.aCtx,
          video: this
        });

        this.dispatchEvent(new Event('waiting'));
        this.vCtx.oncanplay = function () {
          if (!_this2.played) {
            _this2.appendChild(_this2._canvas);
          }
          _this2.dispatchEvent(new Event('canplay'));
        };

        this.aCtx.on('AUDIO_SOURCE_END', this.handleAudioSourceEnd);
      }
    }, {
      key: 'handleAudioSourceEnd',
      value: function handleAudioSourceEnd() {
        this.reconciler.doReconcile();
        this.vCtx.cleanBuffer();
      }
    }, {
      key: '_cleanBuffer',
      value: function _cleanBuffer() {
        this.vCtx.cleanBuffer();
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.videoMetaInited = false;
        this.audioMetaInited = false;

        this.aCtx.on('AUDIO_SOURCE_END', this.handleAudioSourceEnd);
        this.aCtx.destroy();
        this.vCtx.destroy();
        this.ticker.stop();
        this.start = null;
        this.reconciler.destroy();
        this.aCtx = null;
        this.vCtx = null;
        this.ticker = null;
      }
    }, {
      key: 'onDemuxComplete',
      value: function onDemuxComplete(videoTrack, audioTrack) {
        // MobileVideo.resolveVideoGOP(videoTrack)
        this.aCtx.decodeAudio(audioTrack);
        this.vCtx.decodeVideo(videoTrack);
      }
    }, {
      key: 'setAudioMeta',
      value: function setAudioMeta(meta) {
        if (this.audioMetaInited) {
          this.aCtx.destroy();
          this.aCtx = new AudioCtx({});
        }
        this.aCtx.setAudioMetaData(meta);
        this.audioMetaInited = true;
      }
    }, {
      key: 'setVideoMeta',
      value: function setVideoMeta(meta) {
        if (this.videoMetaInited) {
          this.vCtx.destroy();
          this.vCtx = new VideoCanvas(Object.assign({
            canvas: this._canvas
          }, { style: { width: this.width, height: this.height } }));
        }
        this.vCtx.setVideoMetaData(meta);
        this.videoMetaInited = true;
      }
    }, {
      key: 'play',
      value: function play() {
        var _this3 = this;

        if (this.pendingPlayTask) {
          return;
        }

        if (this.played) {
          this.destroy();
          this.init();
        }
        this.dispatchEvent(new Event('play'));
        this.pendingPlayTask = Promise.all([this.vCtx.play(), this.aCtx.play().then(function () {
          // this.aCtx.muted = true
        })]).then(function () {
          // this.aCtx.muted = false
          _this3.ticker.start(function () {
            if (!_this3.start) {
              _this3.start = Date.now();
            }
            _this3._currentTime = Date.now() - _this3.start;
            _this3.vCtx._onTimer(_this3._currentTime);
          });

          _this3.pendingPlayTask = null;
          _this3.played = true;
          _this3.dispatchEvent(new Event('playing'));
          _this3._paused = false;
        });
      }
    }, {
      key: 'pause',
      value: function pause() {
        this._paused = true;
        this.aCtx.pause();
        this.vCtx.pause();

        this.dispatchEvent(new Event('pause'));
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
        this.aCtx.playbackRate = val;
        this.vCtx.playbackRate = val;

        this.dispatchEvent(new Event('ratechange'));
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
          return this.getAttribute('autoplay');
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
        return this.aCtx.volume;
      },
      set: function set(vol) {
        this.setAttribute('volume', vol);
        this.aCtx.volume = vol;
        this.dispatchEvent(new Event('volumechange'));
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
        this.setAttribute('muted', val);
        if (!val) {
          this.aCtx.muted = false;
        } else {
          this.aCtx.muted = true;
        }
        this.dispatchEvent(new Event('volumechange'));
      }
    }, {
      key: 'error',
      get: function get() {
        return this.vCtx.error || this.aCtx.error;
      }
    }, {
      key: 'buffered',
      get: function get() {
        return this.vCtx.buffered;
      }
    }]);

    return MobileVideo;
  }(HTMLElement);
  // eslint-disable-next-line no-undef


  customElements.define('mobile-video', MobileVideo);

  var _createClass$s = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck$s(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn$5(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits$5(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  var flvAllowedEvents = EVENTS.FlvAllowedEvents;
  var BasePlugin = Player.BasePlugin;

  var FlvPlayer = function (_BasePlugin) {
    _inherits$5(FlvPlayer, _BasePlugin);

    function FlvPlayer() {
      _classCallCheck$s(this, FlvPlayer);

      return _possibleConstructorReturn$5(this, (FlvPlayer.__proto__ || Object.getPrototypeOf(FlvPlayer)).apply(this, arguments));
    }

    _createClass$s(FlvPlayer, [{
      key: 'beforePlayerInit',
      value: function beforePlayerInit() {
        this.context = new Context(flvAllowedEvents);
        this.initFlv();
        this.context.init();
        this.loadData();
        this.initEvents();
      }
    }, {
      key: 'afterCreate',
      value: function afterCreate() {
        var _player = this.player,
            video = _player.video,
            config = _player.config;

        video.width = Number.parseInt(config.width || 600);
        video.height = Number.parseInt(config.height || 337.5);
        video.style.outline = 'none';
      }
    }, {
      key: 'initFlvEvents',
      value: function initFlvEvents(flv) {
        var player = this.player;


        flv.once(EVENTS.LOADER_EVENTS.LOADER_COMPLETE, function () {
          // 直播完成，待播放器播完缓存后发送关闭事件
          if (!player.paused) {
            var timer = setInterval(function () {
              var end = player.getBufferedRange()[1];
              if (Math.abs(player.currentTime - end) < 0.5) {
                player.emit('ended');
                window.clearInterval(timer);
              }
            }, 200);
          }
        });
      }
    }, {
      key: 'initEvents',
      value: function initEvents() {
        var _this2 = this;

        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);

        var player = this.player;

        player.on('timeupdate', function () {
          _this2.loadData();
        });

        player.on('seeking', function () {
          var time = _this2.currentTime;
          var range = _this2.getBufferedRange();
          if (time > range[1] || time < range[0]) {
            _this2.flv.seek(_this2.currentTime);
          }
        });

        player.on('play', this.play);
        player.on('pause', this.pause);
      }
    }, {
      key: 'initFlv',
      value: function initFlv() {
        var player = this.player;

        var flv = this.context.registry('FLV_CONTROLLER', FlvController)(player);
        this.initFlvEvents(flv);
        this.flv = flv;
      }
    }, {
      key: 'play',
      value: function play() {
        var player = this.player;

        if (this.played && this.player.paused) {
          this._destroy();
          player.hasStart = false;
          player.start();
        } else {
          this.addLiveFlag();
        }
        this.played = true;
      }
    }, {
      key: 'pause',
      value: function pause() {
        var player = this.player;

        if (this.flv) {
          this.flv.pause();
        }
      }
    }, {
      key: 'loadData',
      value: function loadData() {
        var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.player.currentTime;
        var player = this.player;

        if (this.flv) {
          this.flv.seek(time);
        }
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this._destroy();
      }
    }, {
      key: 'addLiveFlag',
      value: function addLiveFlag() {
        var player = this.player;

        Player.util.addClass(player.root, 'xgplayer-is-live');
      }
    }, {
      key: '_destroy',
      value: function _destroy() {
        this.context.destroy();
        this.flv = null;
        this.context = null;
      }
    }, {
      key: 'switchURL',
      value: function switchURL(url) {
        var context = new Context(flvAllowedEvents);
        var flv = context.registry('FLV_CONTROLLER', FlvController)(this.player);
        context.init();
        this.this.flv = flv;
        this.initFlvBackupEvents(flv, context);
        flv.loadData(url);
      }
    }, {
      key: 'src',
      get: function get() {
        return this.player.currentSrc;
      },
      set: function set(url) {
        this.switchURL(url);
      }
    }], [{
      key: 'pluginName',
      get: function get() {
        return 'flvLiveMobile';
      }
    }]);

    return FlvPlayer;
  }(BasePlugin);

  return FlvPlayer;

})));
//# sourceMappingURL=index.js.map
