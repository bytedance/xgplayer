(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('xgplayer')) :
  typeof define === 'function' && define.amd ? define(['xgplayer'], factory) :
  (global = global || self, global.FlvPlayer = factory(global.Player));
}(this, (function (Player) { 'use strict';

  Player = Player && Player.hasOwnProperty('default') ? Player['default'] : Player;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function EventHandlers() {}function EventEmitter() {
    EventEmitter.init.call(this);
  }function $getMaxListeners(e) {
    return void 0 === e._maxListeners ? EventEmitter.defaultMaxListeners : e._maxListeners;
  }function emitNone(e, t, i) {
    if (t) e.call(i);else for (var r = e.length, a = arrayClone(e, r), n = 0; n < r; ++n) {
      a[n].call(i);
    }
  }function emitOne(e, t, i, r) {
    if (t) e.call(i, r);else for (var a = e.length, n = arrayClone(e, a), s = 0; s < a; ++s) {
      n[s].call(i, r);
    }
  }function emitTwo(e, t, i, r, a) {
    if (t) e.call(i, r, a);else for (var n = e.length, s = arrayClone(e, n), o = 0; o < n; ++o) {
      s[o].call(i, r, a);
    }
  }function emitThree(e, t, i, r, a, n) {
    if (t) e.call(i, r, a, n);else for (var s = e.length, o = arrayClone(e, s), u = 0; u < s; ++u) {
      o[u].call(i, r, a, n);
    }
  }function emitMany(e, t, i, r) {
    if (t) e.apply(i, r);else for (var a = e.length, n = arrayClone(e, a), s = 0; s < a; ++s) {
      n[s].apply(i, r);
    }
  }function _addListener(e, t, i, r) {
    var a, n, s;if ("function" != typeof i) throw new TypeError('"listener" argument must be a function');if (n = e._events, n ? (n.newListener && (e.emit("newListener", t, i.listener ? i.listener : i), n = e._events), s = n[t]) : (n = e._events = new EventHandlers(), e._eventsCount = 0), s) {
      if ("function" == typeof s ? s = n[t] = r ? [i, s] : [s, i] : r ? s.unshift(i) : s.push(i), !s.warned && (a = $getMaxListeners(e)) && a > 0 && s.length > a) {
        s.warned = !0;var o = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + t + " listeners added. Use emitter.setMaxListeners() to increase limit");o.name = "MaxListenersExceededWarning", o.emitter = e, o.type = t, o.count = s.length, emitWarning(o);
      }
    } else s = n[t] = i, ++e._eventsCount;return e;
  }function emitWarning(e) {
    "function" == typeof console.warn ? console.warn(e) : console.log(e);
  }function _onceWrap(e, t, i) {
    function r() {
      e.removeListener(t, r), a || (a = !0, i.apply(e, arguments));
    }var a = !1;return r.listener = i, r;
  }function listenerCount(e) {
    var t = this._events;if (t) {
      var i = t[e];if ("function" == typeof i) return 1;if (i) return i.length;
    }return 0;
  }function spliceOne(e, t) {
    for (var i = t, r = i + 1, a = e.length; r < a; i += 1, r += 1) {
      e[i] = e[r];
    }e.pop();
  }function arrayClone(e, t) {
    for (var i = new Array(t); t--;) {
      i[t] = e[t];
    }return i;
  }function unwrapListeners(e) {
    for (var t = new Array(e.length), i = 0; i < t.length; ++i) {
      t[i] = e[i].listener || e[i];
    }return t;
  }function unwrapExports(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
  }function createCommonjsModule(e, t) {
    return t = { exports: {} }, e(t, t.exports), t.exports;
  }var isObjectFilled = function isObjectFilled(e) {
    for (var t in e) {
      if (e.hasOwnProperty(t) && null === e[t]) return !1;
    }return !0;
  },
      MediaInfo = function () {
    function e() {
      classCallCheck(this, e), this.mimeType = null, this.duration = null, this.hasVideo = null, this.video = { codec: null, width: null, height: null, profile: null, level: null, frameRate: { fixed: !0, fps: 25, fps_num: 25e3, fps_den: 1e3 }, chromaFormat: null, parRatio: { width: 1, height: 1 } }, this.hasAudio = null, this.audio = { codec: null, sampleRate: null, sampleRateIndex: null, channelCount: null };
    }return createClass(e, [{ key: "isComplete", value: function value() {
        return e.isBaseInfoReady(this) && e.isVideoReady(this) && e.isAudioReady(this);
      } }], [{ key: "isBaseInfoReady", value: function value(e) {
        return isObjectFilled(e);
      } }, { key: "isVideoReady", value: function value(e) {
        return !e.hasVideo || isObjectFilled(e.video);
      } }, { key: "isAudioReady", value: function value(e) {
        return !e.hasAudio || isObjectFilled(e.video);
      } }]), e;
  }(),
      domain;EventHandlers.prototype = Object.create(null), EventEmitter.EventEmitter = EventEmitter, EventEmitter.usingDomains = !1, EventEmitter.prototype.domain = void 0, EventEmitter.prototype._events = void 0, EventEmitter.prototype._maxListeners = void 0, EventEmitter.defaultMaxListeners = 10, EventEmitter.init = function () {
    this.domain = null, EventEmitter.usingDomains && domain.active && domain.Domain, this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = new EventHandlers(), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, EventEmitter.prototype.setMaxListeners = function (e) {
    if ("number" != typeof e || e < 0 || isNaN(e)) throw new TypeError('"n" argument must be a positive number');return this._maxListeners = e, this;
  }, EventEmitter.prototype.getMaxListeners = function () {
    return $getMaxListeners(this);
  }, EventEmitter.prototype.emit = function (e) {
    var t,
        i,
        r,
        a,
        n,
        s,
        o,
        u = "error" === e;if (s = this._events) u = u && null == s.error;else if (!u) return !1;if (o = this.domain, u) {
      if (t = arguments[1], !o) {
        if (t instanceof Error) throw t;var l = new Error('Uncaught, unspecified "error" event. (' + t + ")");throw l.context = t, l;
      }return t || (t = new Error('Uncaught, unspecified "error" event')), t.domainEmitter = this, t.domain = o, t.domainThrown = !1, o.emit("error", t), !1;
    }if (!(i = s[e])) return !1;var d = "function" == typeof i;switch (r = arguments.length) {case 1:
        emitNone(i, d, this);break;case 2:
        emitOne(i, d, this, arguments[1]);break;case 3:
        emitTwo(i, d, this, arguments[1], arguments[2]);break;case 4:
        emitThree(i, d, this, arguments[1], arguments[2], arguments[3]);break;default:
        for (a = new Array(r - 1), n = 1; n < r; n++) {
          a[n - 1] = arguments[n];
        }emitMany(i, d, this, a);}return !0;
  }, EventEmitter.prototype.addListener = function (e, t) {
    return _addListener(this, e, t, !1);
  }, EventEmitter.prototype.on = EventEmitter.prototype.addListener, EventEmitter.prototype.prependListener = function (e, t) {
    return _addListener(this, e, t, !0);
  }, EventEmitter.prototype.once = function (e, t) {
    if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');return this.on(e, _onceWrap(this, e, t)), this;
  }, EventEmitter.prototype.prependOnceListener = function (e, t) {
    if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');return this.prependListener(e, _onceWrap(this, e, t)), this;
  }, EventEmitter.prototype.removeListener = function (e, t) {
    var i, r, a, n, s;if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');if (!(r = this._events)) return this;if (!(i = r[e])) return this;if (i === t || i.listener && i.listener === t) 0 == --this._eventsCount ? this._events = new EventHandlers() : (delete r[e], r.removeListener && this.emit("removeListener", e, i.listener || t));else if ("function" != typeof i) {
      for (a = -1, n = i.length; n-- > 0;) {
        if (i[n] === t || i[n].listener && i[n].listener === t) {
          s = i[n].listener, a = n;break;
        }
      }if (a < 0) return this;if (1 === i.length) {
        if (i[0] = void 0, 0 == --this._eventsCount) return this._events = new EventHandlers(), this;delete r[e];
      } else spliceOne(i, a);r.removeListener && this.emit("removeListener", e, s || t);
    }return this;
  }, EventEmitter.prototype.removeAllListeners = function (e) {
    var t, i;if (!(i = this._events)) return this;if (!i.removeListener) return 0 === arguments.length ? (this._events = new EventHandlers(), this._eventsCount = 0) : i[e] && (0 == --this._eventsCount ? this._events = new EventHandlers() : delete i[e]), this;if (0 === arguments.length) {
      for (var r, a = Object.keys(i), n = 0; n < a.length; ++n) {
        "removeListener" !== (r = a[n]) && this.removeAllListeners(r);
      }return this.removeAllListeners("removeListener"), this._events = new EventHandlers(), this._eventsCount = 0, this;
    }if ("function" == typeof (t = i[e])) this.removeListener(e, t);else if (t) do {
      this.removeListener(e, t[t.length - 1]);
    } while (t[0]);return this;
  }, EventEmitter.prototype.listeners = function (e) {
    var t,
        i = this._events;return i && (t = i[e]) ? "function" == typeof t ? [t.listener || t] : unwrapListeners(t) : [];
  }, EventEmitter.listenerCount = function (e, t) {
    return "function" == typeof e.listenerCount ? e.listenerCount(t) : listenerCount.call(e, t);
  }, EventEmitter.prototype.listenerCount = listenerCount, EventEmitter.prototype.eventNames = function () {
    return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
  };var DIRECT_EMIT_FLAG = "__TO__",
      Context = function () {
    function e() {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];classCallCheck(this, e), this._emitter = new EventEmitter(), this._instanceMap = {}, this._clsMap = {}, this._inited = !1, this.mediaInfo = new MediaInfo(), this.allowedEvents = t, this._hooks = {}, this._emitCounter = {};
    }return createClass(e, [{ key: "getInstance", value: function value(e) {
        var t = this._instanceMap[e];return t || null;
      } }, { key: "initInstance", value: function value(e) {
        if (this._clsMap[e]) {
          for (var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) {
            i[r - 1] = arguments[r];
          }var a = new (Function.prototype.bind.apply(this._clsMap[e], [null].concat(i)))();return this._instanceMap[e] = a, a.init && a.init(), a;
        }throw new Error(e + "未在context中注册");
      } }, { key: "init", value: function value(e) {
        if (!this._inited) {
          for (var t in this._clsMap) {
            this._clsMap.hasOwnProperty(t) && !this._instanceMap[t] && this.initInstance(t, e);
          }this._inited = !0;
        }
      } }, { key: "registry", value: function value(e, t) {
        var i = this,
            r = this._emitter,
            a = this._isMessageNameValid.bind(this),
            n = this,
            s = function (t) {
          function i(t, r, a) {
            classCallCheck(this, i);var s = possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, t, r, a));return s.listeners = {}, s.onceListeners = {}, s.TAG = e, s._context = n, s;
          }return inherits(i, t), createClass(i, [{ key: "on", value: function value(t, i) {
              return a(t), this.listeners[t] ? this.listeners[t].push(i) : this.listeners[t] = [i], r.on("" + t + DIRECT_EMIT_FLAG + e, i), r.on(t, i);
            } }, { key: "before", value: function value(e, t) {
              a(e), n._hooks[e] ? n._hooks[e].push(t) : n._hooks[e] = [t];
            } }, { key: "once", value: function value(t, i) {
              return a(t), this.onceListeners[t] ? this.onceListeners[t].push(i) : this.onceListeners[t] = [i], r.once("" + t + DIRECT_EMIT_FLAG + e, i), r.once(t, i);
            } }, { key: "emit", value: function value(e) {
              if (a(e), n._emitCounter[e]) {
                if (n._emitCounter[e] += 1, n._emitCounter[e] % 1e3 == 0) {
                  window.console && (window.console.warn("invoke: ", e), window.localStorage.setItem("xgplayer_invoke_" + e, n._emitCounter[e]));
                }
              } else n._emitCounter[e] = 1;var t = n._hooks ? n._hooks[e] : null;if (t) for (var i = 0, s = t.length; i < s; i++) {
                (0, t[i])();
              }for (var o = arguments.length, u = Array(o > 1 ? o - 1 : 0), l = 1; l < o; l++) {
                u[l - 1] = arguments[l];
              }return r.emit.apply(r, [e].concat(u));
            } }, { key: "emitTo", value: function value(e, t) {
              a(t);for (var i = arguments.length, n = Array(i > 2 ? i - 2 : 0), s = 2; s < i; s++) {
                n[s - 2] = arguments[s];
              }return r.emit.apply(r, ["" + t + DIRECT_EMIT_FLAG + e].concat(n));
            } }, { key: "off", value: function value(e, t) {
              return a(e), r.off(e, t);
            } }, { key: "removeListeners", value: function value() {
              var t = Object.prototype.hasOwnProperty.bind(this.listeners);for (var i in this.listeners) {
                if (t(i)) for (var a = this.listeners[i] || [], n = 0; n < a.length; n++) {
                  var s = a[n];r.off(i, s), r.off("" + i + DIRECT_EMIT_FLAG + e, s);
                }
              }for (var o in this.onceListeners) {
                if (t(o)) for (var u = this.onceListeners[o] || [], l = 0; l < u.length; l++) {
                  var d = u[l];r.off(o, d), r.off("" + o + DIRECT_EMIT_FLAG + e, d);
                }
              }
            } }, { key: "destroy", value: function value() {
              if (this.removeListeners(), this.listeners = {}, delete n._instanceMap[e], get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "destroy", this)) return get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "destroy", this).call(this);
            } }]), i;
        }(t);return this._clsMap[e] = s, function () {
          for (var t = arguments.length, r = Array(t), a = 0; a < t; a++) {
            r[a] = arguments[a];
          }return i.initInstance.apply(i, [e].concat(r));
        };
      } }, { key: "destroyInstances", value: function value() {
        var e = this;Object.keys(this._instanceMap).forEach(function (t) {
          e._instanceMap[t].destroy && e._instanceMap[t].destroy();
        });
      } }, { key: "destroy", value: function value() {
        this._emitter = null, this.allowedEvents = [], this._clsMap = null, this._context = null, this._hooks = null, this._emitCounter = {}, this.destroyInstances();
      } }, { key: "_isMessageNameValid", value: function value(e) {
        if (!this.allowedEvents.indexOf(e) < 0) throw new Error("unregistered message name: " + e);
      } }]), e;
  }(),
      LOADER_EVENTS = { LADER_START: "LOADER_START", LOADER_DATALOADED: "LOADER_DATALOADED", LOADER_COMPLETE: "LOADER_COMPLETE", LOADER_ERROR: "LOADER_ERROR" },
      DEMUX_EVENTS = { DEMUX_START: "DEMUX_START", DEMUX_COMPLETE: "DEMUX_COMPLETE", DEMUX_ERROR: "DEMUX_ERROR", METADATA_PARSED: "METADATA_PARSED", VIDEO_METADATA_CHANGE: "VIDEO_METADATA_CHANGE", AUDIO_METADATA_CHANGE: "AUDIO_METADATA_CHANGE", MEDIA_INFO: "MEDIA_INFO" },
      REMUX_EVENTS = { REMUX_METADATA: "REMUX_METADATA", REMUX_MEDIA: "REMUX_MEDIA", MEDIA_SEGMENT: "MEDIA_SEGMENT", REMUX_ERROR: "REMUX_ERROR", INIT_SEGMENT: "INIT_SEGMENT", DETECT_CHANGE_STREAM: "DETECT_CHANGE_STREAM", RANDOM_ACCESS_POINT: "RANDOM_ACCESS_POINT" },
      MSE_EVENTS = { SOURCE_UPDATE_END: "SOURCE_UPDATE_END" },
      HLS_EVENTS = { RETRY_TIME_EXCEEDED: "RETRY_TIME_EXCEEDED" },
      CRYTO_EVENTS = { START_DECRYPT: "START_DECRYPT", DECRYPTED: "DECRYPTED" },
      ALLEVENTS = Object.assign({}, LOADER_EVENTS, DEMUX_EVENTS, REMUX_EVENTS, MSE_EVENTS, HLS_EVENTS),
      FlvAllowedEvents = [],
      HlsAllowedEvents = [];for (var key in ALLEVENTS) {
    ALLEVENTS.hasOwnProperty(key) && FlvAllowedEvents.push(ALLEVENTS[key]);
  }for (var _key in ALLEVENTS) {
    ALLEVENTS.hasOwnProperty(_key) && HlsAllowedEvents.push(ALLEVENTS[_key]);
  }var _EVENTS = { ALLEVENTS: ALLEVENTS, HLS_EVENTS: HLS_EVENTS, REMUX_EVENTS: REMUX_EVENTS, DEMUX_EVENTS: DEMUX_EVENTS, MSE_EVENTS: MSE_EVENTS, LOADER_EVENTS: LOADER_EVENTS, FlvAllowedEvents: FlvAllowedEvents, HlsAllowedEvents: HlsAllowedEvents, CRYTO_EVENTS: CRYTO_EVENTS },
      le = function () {
    var e = new ArrayBuffer(2);return new DataView(e).setInt16(0, 256, !0), 256 === new Int16Array(e)[0];
  }(),
      sniffer = { get device() {
      var e = sniffer.os;return e.isPc ? "pc" : e.isTablet ? "tablet" : "mobile";
    }, get browser() {
      var e = navigator.userAgent.toLowerCase(),
          t = { ie: /rv:([\d.]+)\) like gecko/, firfox: /firefox\/([\d.]+)/, chrome: /chrome\/([\d.]+)/, opera: /opera.([\d.]+)/, safari: /version\/([\d.]+).*safari/ };return [].concat(Object.keys(t).filter(function (i) {
        return t[i].test(e);
      }))[0];
    }, get os() {
      var e = navigator.userAgent,
          t = /(?:Windows Phone)/.test(e),
          i = /(?:SymbianOS)/.test(e) || t,
          r = /(?:Android)/.test(e),
          a = /(?:Firefox)/.test(e),
          n = /(?:iPad|PlayBook)/.test(e) || r && !/(?:Mobile)/.test(e) || a && /(?:Tablet)/.test(e),
          s = /(?:iPhone)/.test(e) && !n;return { isTablet: n, isPhone: s, isAndroid: r, isPc: !s && !r && !i, isSymbian: i, isWindowsPhone: t, isFireFox: a };
    }, get isLe() {
      return le;
    } },
      le$1 = function () {
    var e = new ArrayBuffer(2);return new DataView(e).setInt16(0, 256, !0), 256 === new Int16Array(e)[0];
  }(),
      UTF8 = function () {
    function e() {
      classCallCheck(this, e);
    }return createClass(e, null, [{ key: "decode", value: function value(t) {
        for (var i = [], r = t, a = 0, n = t.length; a < n;) {
          if (r[a] < 128) i.push(String.fromCharCode(r[a])), ++a;else {
            if (r[a] < 192) ;else if (r[a] < 224) {
              if (e._checkContinuation(r, a, 1)) {
                var s = (31 & r[a]) << 6 | 63 & r[a + 1];if (s >= 128) {
                  i.push(String.fromCharCode(65535 & s)), a += 2;continue;
                }
              }
            } else if (r[a] < 240) {
              if (e._checkContinuation(r, a, 2)) {
                var o = (15 & r[a]) << 12 | (63 & r[a + 1]) << 6 | 63 & r[a + 2];if (o >= 2048 && 55296 != (63488 & o)) {
                  i.push(String.fromCharCode(65535 & o)), a += 3;continue;
                }
              }
            } else if (r[a] < 248 && e._checkContinuation(r, a, 3)) {
              var u = (7 & r[a]) << 18 | (63 & r[a + 1]) << 12 | (63 & r[a + 2]) << 6 | 63 & r[a + 3];if (u > 65536 && u < 1114112) {
                u -= 65536, i.push(String.fromCharCode(u >>> 10 | 55296)), i.push(String.fromCharCode(1023 & u | 56320)), a += 4;continue;
              }
            }i.push(String.fromCharCode(65533)), ++a;
          }
        }return i.join("");
      } }, { key: "_checkContinuation", value: function value(e, t, i) {
        var r = e;if (t + i < r.length) {
          for (; i--;) {
            if (128 != (192 & r[++t])) return !1;
          }return !0;
        }return !1;
      } }]), e;
  }(),
      MediaSample = function () {
    function e(t) {
      var i = this;classCallCheck(this, e);var r = e.getDefaultInf();if (!t || "[object Object]" !== Object.prototype.toString.call(t)) return r;var a = Object.assign({}, r, t);Object.entries(a).forEach(function (e) {
        var t = slicedToArray(e, 2),
            r = t[0],
            a = t[1];i[r] = a;
      });
    }return createClass(e, null, [{ key: "getDefaultInf", value: function value() {
        return { dts: null, pts: null, duration: null, position: null, isRAP: !1, originDts: null };
      } }]), e;
  }(),
      MediaSegment = function () {
    function e() {
      classCallCheck(this, e), this.startDts = -1, this.endDts = -1, this.startPts = -1, this.endPts = -1, this.originStartDts = -1, this.originEndDts = -1, this.randomAccessPoints = [], this.firstSample = null, this.lastSample = null;
    }return createClass(e, [{ key: "addRAP", value: function value(e) {
        e.isRAP = !0, this.randomAccessPoints.push(e);
      } }]), e;
  }(),
      MediaSegmentList = function () {
    function e(t) {
      classCallCheck(this, e), this._type = t, this._list = [], this._lastAppendLocation = -1;
    }return createClass(e, [{ key: "isEmpty", value: function value() {
        return 0 === this._list.length;
      } }, { key: "clear", value: function value() {
        this._list = [], this._lastAppendLocation = -1;
      } }, { key: "_searchNearestSegmentBefore", value: function value(e) {
        var t = this._list;if (0 === t.length) return -2;var i = t.length - 1,
            r = 0,
            a = 0,
            n = i,
            s = 0;if (e < t[0].originDts) return s = -1;for (; a <= n;) {
          if ((r = a + Math.floor((n - a) / 2)) === i || e > t[r].lastSample.originDts && e < t[r + 1].originDts) {
            s = r;break;
          }t[r].originDts < e ? a = r + 1 : n = r - 1;
        }return s;
      } }, { key: "_searchNearestSegmentAfter", value: function value(e) {
        return this._searchNearestSegmentBefore(e) + 1;
      } }, { key: "append", value: function value(e) {
        var t = this._list,
            i = this._lastAppendLocation,
            r = 0;-1 !== i && i < t.length && e.originStartDts >= t[i].lastSample.originDts && (i === t.length - 1 || i < t.length - 1 && e.originStartDts < t[i + 1].originStartDts) ? r = i + 1 : t.length > 0 && (r = this._searchNearestSegmentBefore(e.originStartDts) + 1), this._lastAppendLocation = r, this._list.splice(r, 0, e);
      } }, { key: "getLastSegmentBefore", value: function value(e) {
        var t = this._searchNearestSegmentBefore(e);return t >= 0 ? this._list[t] : null;
      } }, { key: "getLastSampleBefore", value: function value(e) {
        var t = this.getLastSegmentBefore(e);return null !== t ? t.lastSample : null;
      } }, { key: "getLastRAPBefore", value: function value(e) {
        for (var t = this._searchNearestSegmentBefore(e), i = this._list[t].randomAccessPoints; 0 === i.length && t > 0;) {
          t--, i = this._list[t].randomAccessPoints;
        }return i.length > 0 ? i[i.length - 1] : null;
      } }, { key: "type", get: function get() {
        return this._type;
      } }, { key: "length", get: function get() {
        return this._list.length;
      } }]), e;
  }(),
      AudioTrackMeta = function () {
    function e(t) {
      classCallCheck(this, e);var i = { sampleRate: 48e3, channelCount: 2, codec: "mp4a.40.2", config: [41, 401, 136, 0], duration: 0, id: 2, refSampleDuration: 21, sampleRateIndex: 3, timescale: 1e3, type: "audio" };return t ? Object.assign({}, i, t) : i;
    }return createClass(e, [{ key: "destroy", value: function value() {
        this.init = null;
      } }]), e;
  }(),
      VideoTrackMeta = function () {
    function e(t) {
      classCallCheck(this, e);var i = { avcc: null, sps: new Uint8Array(0), pps: new Uint8Array(0), chromaFormat: 420, codec: "avc1.640020", codecHeight: 720, codecWidth: 1280, duration: 0, frameRate: { fixed: !0, fps: 25, fps_num: 25e3, fps_den: 1e3 }, id: 1, level: "3.2", presentHeight: 720, presentWidth: 1280, profile: "High", refSampleDuration: 40, parRatio: { height: 1, width: 1 }, timescale: 1e3, type: "video" };return t ? Object.assign({}, i, t) : i;
    }return createClass(e, [{ key: "destroy", value: function value() {
        this.init = null, this.sps = null, this.pps = null;
      } }]), e;
  }(),
      AudioTrackSample = function () {
    function e(t) {
      classCallCheck(this, e);var i = e.getDefault();return t ? Object.assign({}, i, t) : i;
    }return createClass(e, null, [{ key: "getDefault", value: function value() {
        return { dts: null, pts: null, data: new Uint8Array() };
      } }]), e;
  }(),
      VideoTrackSample = function () {
    function e(t) {
      classCallCheck(this, e);var i = e.getDefault();return t ? Object.assign({}, i, t) : i;
    }return createClass(e, null, [{ key: "getDefault", value: function value() {
        return { dts: null, pts: null, isKeyframe: !1, originDts: null, data: new Uint8Array() };
      } }]), e;
  }(),
      MSE = function () {
    function e(t) {
      classCallCheck(this, e), this.configs = Object.assign({}, t), this.container = this.configs.container, this.mediaSource = null, this.sourceBuffers = {}, this.preloadTime = this.configs.preloadTime || 1, this.onSourceOpen = this.onSourceOpen.bind(this), this.onTimeUpdate = this.onTimeUpdate.bind(this), this.onUpdateEnd = this.onUpdateEnd.bind(this), this.onWaiting = this.onWaiting.bind(this);
    }return createClass(e, [{ key: "init", value: function value() {
        this.mediaSource = new self.MediaSource(), this.mediaSource.addEventListener("sourceopen", this.onSourceOpen), this.container.src = URL.createObjectURL(this.mediaSource), this.url = this.container.src, this.container.addEventListener("timeupdate", this.onTimeUpdate), this.container.addEventListener("waiting", this.onWaiting);
      } }, { key: "onTimeUpdate", value: function value() {
        this.emit("TIME_UPDATE", this.container);
      } }, { key: "onWaiting", value: function value() {
        this.emit("WAITING", this.container);
      } }, { key: "onSourceOpen", value: function value() {
        this.addSourceBuffers();
      } }, { key: "onUpdateEnd", value: function value() {
        this.emit("SOURCE_UPDATE_END"), this.doAppend();
      } }, { key: "addSourceBuffers", value: function value() {
        if ("open" === this.mediaSource.readyState) {
          var e = this._context.getInstance("PRE_SOURCE_BUFFER"),
              t = this._context.getInstance("TRACKS"),
              i = void 0;e = e.sources;for (var r = !1, a = 0, n = Object.keys(e).length; a < n; a++) {
            var s = Object.keys(e)[a];if ("audio" === s ? i = t.audioTrack : "video" === s && (i = t.videoTrack), i) {
              var o = "audio" === s ? 21 : 40;i.meta && i.meta.refSampleDuration && (o = i.meta.refSampleDuration), e[s].data.length >= this.preloadTime / o && (r = !0);
            }
          }if (r) {
            if (Object.keys(this.sourceBuffers).length > 0) return;for (var u = 0, l = Object.keys(e).length; u < l; u++) {
              var d = Object.keys(e)[u],
                  h = e[d],
                  c = "video" === d ? "video/mp4;codecs=" + h.mimetype : "audio/mp4;codecs=" + h.mimetype,
                  f = this.mediaSource.addSourceBuffer(c);this.sourceBuffers[d] = f, f.addEventListener("updateend", this.onUpdateEnd), this.doAppend();
            }
          }
        }
      } }, { key: "doAppend", value: function value() {
        var e = this._context.getInstance("PRE_SOURCE_BUFFER");if (e) for (var t = 0; t < Object.keys(this.sourceBuffers).length; t++) {
          var i = Object.keys(this.sourceBuffers)[t],
              r = this.sourceBuffers[i];if (!r.updating) {
            var a = e.sources[i];if (a && !a.inited) r.appendBuffer(a.init.buffer.buffer), a.inited = !0;else if (a) {
              var n = a.data.shift();n && r.appendBuffer(n.buffer.buffer);
            }
          }
        }
      } }, { key: "endOfStream", value: function value() {
        var e = this.mediaSource,
            t = e.readyState,
            i = e.activeSourceBuffers;if ("open" === t && 0 === i.length) try {
          this.mediaSource.endOfStream();
        } catch (e) {}
      } }, { key: "remove", value: function value(e) {
        for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, i = 0; i < Object.keys(this.sourceBuffers).length; i++) {
          var r = this.sourceBuffers[Object.keys(this.sourceBuffers)[i]];r.updating || r.remove(t, e);
        }
      } }, { key: "removeBuffers", value: function value() {
        for (var t = this, i = [], r = 0; r < Object.keys(this.sourceBuffers).length; r++) {
          !function (r) {
            var a = t.sourceBuffers[Object.keys(t.sourceBuffers)[r]];a.removeEventListener("updateend", t.onUpdateEnd);var n = void 0;n = a.updating ? new Promise(function (t) {
              var i = function i() {
                var r = 3,
                    n = function i() {
                  a.updating ? r > 0 ? (setTimeout(i, 200), r--) : t() : (e.clearBuffer(a), a.addEventListener("updateend", function () {
                    t();
                  }));
                };setTimeout(n, 200), a.removeEventListener("updateend", i);
              };a.addEventListener("updateend", i);
            }) : new Promise(function (t) {
              e.clearBuffer(a), a.addEventListener("updateend", function () {
                t();
              });
            }), i.push(n);
          }(r);
        }return Promise.all(i);
      } }, { key: "destroy", value: function value() {
        var e = this;return this.removeBuffers().then(function () {
          for (var t = 0; t < Object.keys(e.sourceBuffers).length; t++) {
            var i = e.sourceBuffers[Object.keys(e.sourceBuffers)[t]];e.mediaSource.removeSourceBuffer(i), delete e.sourceBuffers[Object.keys(e.sourceBuffers)[t]];
          }e.container.removeEventListener("timeupdate", e.onTimeUpdate), e.container.removeEventListener("waiting", e.onWaiting), e.mediaSource.removeEventListener("sourceopen", e.onSourceOpen), e.endOfStream(), window.URL.revokeObjectURL(e.url), e.url = null, e.configs = {}, e.container = null, e.mediaSource = null, e.sourceBuffers = {}, e.preloadTime = 1;
        });
      } }], [{ key: "clearBuffer", value: function value(e) {
        for (var t = e.buffered, i = .1, r = 0, a = t.length; r < a; r++) {
          i = t.end(r);
        }try {
          e.remove(0, i);
        } catch (e) {}
      } }]), e;
  }(),
      Stream = function () {
    function e(t) {
      if (classCallCheck(this, e), !(t instanceof ArrayBuffer)) throw new Error("data is invalid");this.buffer = t, this.dataview = new DataView(t), this.dataview.position = 0;
    }return createClass(e, [{ key: "back", value: function value(e) {
        this.position -= e;
      } }, { key: "skip", value: function value(t) {
        for (var i = Math.floor(t / 4), r = t % 4, a = 0; a < i; a++) {
          e.readByte(this.dataview, 4);
        }r > 0 && e.readByte(this.dataview, r);
      } }, { key: "readUint8", value: function value() {
        return e.readByte(this.dataview, 1);
      } }, { key: "readUint16", value: function value() {
        return e.readByte(this.dataview, 2);
      } }, { key: "readUint24", value: function value() {
        return e.readByte(this.dataview, 3);
      } }, { key: "readUint32", value: function value() {
        return e.readByte(this.dataview, 4);
      } }, { key: "readUint64", value: function value() {
        return e.readByte(this.dataview, 8);
      } }, { key: "readInt8", value: function value() {
        return e.readByte(this.dataview, 1, !0);
      } }, { key: "readInt16", value: function value() {
        return e.readByte(this.dataview, 2, !0);
      } }, { key: "readInt32", value: function value() {
        return e.readByte(this.dataview, 4, !0);
      } }, { key: "writeUint32", value: function value(e) {
        return new Uint8Array([e >>> 24 & 255, e >>> 16 & 255, e >>> 8 & 255, 255 & e]);
      } }, { key: "length", get: function get() {
        return this.buffer.byteLength;
      } }, { key: "position", set: function set(e) {
        this.dataview.position = e;
      }, get: function get() {
        return this.dataview.position;
      } }], [{ key: "readByte", value: function value(e, t, i) {
        var r = void 0;switch (t) {case 1:
            r = i ? e.getInt8(e.position) : e.getUint8(e.position);break;case 2:
            r = i ? e.getInt16(e.position) : e.getUint16(e.position);break;case 3:
            if (i) throw new Error("not supported for readByte 3");r = e.getUint8(e.position) << 16, r |= e.getUint8(e.position + 1) << 8, r |= e.getUint8(e.position + 2);break;case 4:
            r = i ? e.getInt32(e.position) : e.getUint32(e.position);break;case 8:
            if (i) throw new Error("not supported for readBody 8");r = e.getUint32(e.position) << 32, r |= e.getUint32(e.position + 4);break;default:
            r = "";}return e.position += t, r;
      } }]), e;
  }(),
      concat = createCommonjsModule(function (e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.default = function (e) {
      for (var t = 0, i = arguments.length, r = Array(i > 1 ? i - 1 : 0), a = 1; a < i; a++) {
        r[a - 1] = arguments[a];
      }var n = !0,
          s = !1,
          o = void 0;try {
        for (var u, l = r[Symbol.iterator](); !(n = (u = l.next()).done); n = !0) {
          t += u.value.length;
        }
      } catch (e) {
        s = !0, o = e;
      } finally {
        try {
          !n && l.return && l.return();
        } finally {
          if (s) throw o;
        }
      }var d = new e(t),
          h = 0,
          c = !0,
          f = !1,
          p = void 0;try {
        for (var v, m = r[Symbol.iterator](); !(c = (v = m.next()).done); c = !0) {
          var E = v.value;d.set(E, h), h += E.length;
        }
      } catch (e) {
        f = !0, p = e;
      } finally {
        try {
          !c && m.return && m.return();
        } finally {
          if (f) throw p;
        }
      }return d;
    };
  });unwrapExports(concat);var lib = createCommonjsModule(function (e) {
    var t = function (e) {
      return e && e.__esModule ? e : { default: e };
    }(concat);e.exports = t.default;
  }),
      Concat = unwrapExports(lib),
      Buffer = function () {
    function e(t) {
      classCallCheck(this, e), this.buffer = t || new Uint8Array(0);
    }return createClass(e, [{ key: "write", value: function value() {
        for (var e = this, t = arguments.length, i = Array(t), r = 0; r < t; r++) {
          i[r] = arguments[r];
        }i.forEach(function (t) {
          e.buffer = Concat(Uint8Array, e.buffer, t);
        });
      } }], [{ key: "writeUint32", value: function value(e) {
        return new Uint8Array([e >> 24, e >> 16 & 255, e >> 8 & 255, 255 & e]);
      } }, { key: "readAsInt", value: function value(e) {
        function t(e) {
          return e.toString(16).padStart(2, "0");
        }var i = "";return e.forEach(function (e) {
          i += t(e);
        }), parseInt(i, 16);
      } }]), e;
  }(),
      CRYTO_EVENTS$1 = _EVENTS.CRYTO_EVENTS,
      Crypto = function () {
    function e(t) {
      classCallCheck(this, e), this.inputBuffer = t.inputbuffer, this.outputBuffer = t.outputbuffer, this.key = t.key, this.iv = t.iv, this.method = t.method, this.crypto = window.crypto || window.msCrypto;
    }return createClass(e, [{ key: "init", value: function value() {
        this.on(CRYTO_EVENTS$1.START_DECRYPT, this.decript.bind(this));
      } }, { key: "decript", value: function value() {
        var e = this;this.aeskey ? this.decriptData() : this.crypto.subtle.importKey("raw", this.key.buffer, { name: "AES-CBC" }, !1, ["encrypt", "decrypt"]).then(function (t) {
          e.aeskey = t, e.decriptData();
        });
      } }, { key: "decriptData", value: function value() {
        var e = this,
            t = this._context.getInstance(this.inputBuffer),
            i = this._context.getInstance(this.outputBuffer),
            r = t.shift();r && this.crypto.subtle.decrypt({ name: "AES-CBC", iv: this.iv.buffer }, this.aeskey, r).then(function (t) {
          i.push(new Uint8Array(t)), e.emit(CRYTO_EVENTS$1.DECRYPTED), e.decriptData(r);
        });
      } }]), e;
  }(),
      Context$1 = Context,
      EVENTS = _EVENTS,
      sniffer$1 = sniffer,
      isLe = le$1,
      UTF8$1 = UTF8,
      MediaSegmentList$1 = MediaSegmentList,
      AudioTrackMeta$1 = AudioTrackMeta,
      VideoTrackMeta$1 = VideoTrackMeta,
      AudioTrackSample$1 = AudioTrackSample,
      VideoTrackSample$1 = VideoTrackSample,
      Mse = MSE,
      Stream$1 = Stream,
      Buffer$1 = Buffer,
      Fmp4 = function () {
    function e() {
      classCallCheck(this, e);
    }return createClass(e, null, [{ key: "size", value: function value(e) {
        return Buffer$1.writeUint32(e);
      } }, { key: "initBox", value: function value(t, i) {
        for (var r = new Buffer$1(), a = arguments.length, n = Array(a > 2 ? a - 2 : 0), s = 2; s < a; s++) {
          n[s - 2] = arguments[s];
        }return r.write.apply(r, [e.size(t), e.type(i)].concat(n)), r.buffer;
      } }, { key: "extension", value: function value(e, t) {
        return new Uint8Array([e, t >> 16 & 255, t >> 8 & 255, 255 & t]);
      } }, { key: "ftyp", value: function value() {
        return e.initBox(24, "ftyp", new Uint8Array([105, 115, 111, 109, 0, 0, 0, 1, 105, 115, 111, 109, 97, 118, 99, 49]));
      } }, { key: "moov", value: function value(t) {
        var i = t.type,
            r = t.meta,
            a = 8,
            n = e.mvhd(r.duration, r.timescale),
            s = void 0;s = "video" === i ? e.videoTrak(r) : e.audioTrak(r);var o = e.mvex(r.duration, r.timescale || 1e3, r.id);return [n, s, o].forEach(function (e) {
          a += e.byteLength;
        }), e.initBox(a, "moov", n, s, o);
      } }, { key: "mvhd", value: function value(t) {
        var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e3,
            r = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255]);return e.initBox(8 + r.length, "mvhd", new Uint8Array(r));
      } }, { key: "videoTrak", value: function value(t) {
        var i = 8,
            r = e.tkhd({ id: 1, duration: t.duration, timescale: t.timescale || 1e3, width: t.presentWidth, height: t.presentHeight, type: "video" }),
            a = e.mdia({ type: "video", timescale: t.timescale || 1e3, duration: t.duration, avcc: t.avcc, parRatio: t.parRatio, width: t.presentWidth, height: t.presentHeight });return [r, a].forEach(function (e) {
          i += e.byteLength;
        }), e.initBox(i, "trak", r, a);
      } }, { key: "audioTrak", value: function value(t) {
        var i = 8,
            r = e.tkhd({ id: 2, duration: t.duration, timescale: t.timescale || 1e3, width: 0, height: 0, type: "audio" }),
            a = e.mdia({ type: "audio", timescale: t.timescale || 1e3, duration: t.duration, channelCount: t.channelCount, samplerate: t.sampleRate, config: t.config });return [r, a].forEach(function (e) {
          i += e.byteLength;
        }), e.initBox(i, "trak", r, a);
      } }, { key: "tkhd", value: function value(t) {
        var i = t.id,
            r = t.duration,
            a = t.width,
            n = t.height,
            s = new Uint8Array([0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, 0, 0, 0, 0, r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, 255 & r, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, a >>> 8 & 255, 255 & a, 0, 0, n >>> 8 & 255, 255 & n, 0, 0]);return e.initBox(8 + s.byteLength, "tkhd", s);
      } }, { key: "edts", value: function value(t) {
        var i = new Buffer$1(),
            r = t.duration,
            a = t.mediaTime;return i.write(e.size(36), e.type("edts")), i.write(e.size(28), e.type("elst")), i.write(new Uint8Array([0, 0, 0, 1, r >> 24 & 255, r >> 16 & 255, r >> 8 & 255, 255 & r, a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, 255 & a, 0, 0, 0, 1])), i.buffer;
      } }, { key: "mdia", value: function value(t) {
        var i = 8,
            r = e.mdhd(t.timescale, t.duration),
            a = e.hdlr(t.type),
            n = e.minf(t);return [r, a, n].forEach(function (e) {
          i += e.byteLength;
        }), e.initBox(i, "mdia", r, a, n);
      } }, { key: "mdhd", value: function value() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1e3,
            i = arguments[1],
            r = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, 85, 196, 0, 0]);return e.initBox(12 + r.byteLength, "mdhd", e.extension(0, 0), r);
      } }, { key: "hdlr", value: function value(t) {
        var i = [0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0];return "audio" === t && (i.splice.apply(i, [8, 4].concat([115, 111, 117, 110])), i.splice.apply(i, [24, 13].concat([83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0]))), e.initBox(8 + i.length, "hdlr", new Uint8Array(i));
      } }, { key: "minf", value: function value(t) {
        var i = 8,
            r = "video" === t.type ? e.vmhd() : e.smhd(),
            a = e.dinf(),
            n = e.stbl(t);return [r, a, n].forEach(function (e) {
          i += e.byteLength;
        }), e.initBox(i, "minf", r, a, n);
      } }, { key: "vmhd", value: function value() {
        return e.initBox(20, "vmhd", new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]));
      } }, { key: "smhd", value: function value() {
        return e.initBox(16, "smhd", new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]));
      } }, { key: "dinf", value: function value() {
        var t = new Buffer$1(),
            i = [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1];return t.write(e.size(36), e.type("dinf"), e.size(28), e.type("dref"), new Uint8Array(i)), t.buffer;
      } }, { key: "stbl", value: function value(t) {
        var i = 8,
            r = e.stsd(t),
            a = e.stts(),
            n = e.stsc(),
            s = e.stsz(),
            o = e.stco();return [r, a, n, s, o].forEach(function (e) {
          i += e.byteLength;
        }), e.initBox(i, "stbl", r, a, n, s, o);
      } }, { key: "stsd", value: function value(t) {
        var i = void 0;return i = "audio" === t.type ? e.mp4a(t) : e.avc1(t), e.initBox(16 + i.byteLength, "stsd", e.extension(0, 0), new Uint8Array([0, 0, 0, 1]), i);
      } }, { key: "mp4a", value: function value(t) {
        var i = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, t.channelCount, 0, 16, 0, 0, 0, 0, t.samplerate >> 8 & 255, 255 & t.samplerate, 0, 0]),
            r = e.esds(t.config);return e.initBox(8 + i.byteLength + r.byteLength, "mp4a", i, r);
      } }, { key: "esds", value: function value() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [43, 146, 8, 0],
            i = t.length,
            r = new Buffer$1(),
            a = new Uint8Array([0, 0, 0, 0, 3, 23 + i, 0, 1, 0, 4, 15 + i, 64, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5].concat([i]).concat(t).concat([6, 1, 2]));return r.write(e.size(8 + a.byteLength), e.type("esds"), a), r.buffer;
      } }, { key: "avc1", value: function value(t) {
        var i = new Buffer$1(),
            r = t.width,
            a = t.height,
            n = t.parRatio.height,
            s = t.parRatio.width,
            o = t.avcc,
            u = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, r >> 8 & 255, 255 & r, a >> 8 & 255, 255 & a, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 18, 100, 97, 105, 108, 121, 109, 111, 116, 105, 111, 110, 47, 104, 108, 115, 46, 106, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 17, 17]),
            l = new Uint8Array([0, 28, 156, 128, 0, 45, 198, 192, 0, 45, 198, 192]),
            d = new Uint8Array([n >> 24, n >> 16 & 255, n >> 8 & 255, 255 & n, s >> 24, s >> 16 & 255, s >> 8 & 255, 255 & s]);return i.write(e.size(40 + u.byteLength + o.byteLength + l.byteLength), e.type("avc1"), u, e.size(8 + o.byteLength), e.type("avcC"), o, e.size(20), e.type("btrt"), l, e.size(16), e.type("pasp"), d), i.buffer;
      } }, { key: "stts", value: function value() {
        var t = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);return e.initBox(16, "stts", t);
      } }, { key: "stsc", value: function value() {
        var t = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);return e.initBox(16, "stsc", t);
      } }, { key: "stco", value: function value() {
        var t = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);return e.initBox(16, "stco", t);
      } }, { key: "stsz", value: function value() {
        var t = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);return e.initBox(20, "stsz", t);
      } }, { key: "mvex", value: function value(t) {
        var i = arguments[2],
            r = new Buffer$1(),
            a = Buffer$1.writeUint32(t);return r.write(e.size(56), e.type("mvex"), e.size(16), e.type("mehd"), e.extension(0, 0), a, e.trex(i)), r.buffer;
      } }, { key: "trex", value: function value(t) {
        var i = new Uint8Array([0, 0, 0, 0, t >> 24, t >> 16 & 255, t >> 8 & 255, 255 & t, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]);return e.initBox(8 + i.byteLength, "trex", i);
      } }, { key: "moof", value: function value(t) {
        var i = 8,
            r = e.mfhd(),
            a = e.traf(t);return [r, a].forEach(function (e) {
          i += e.byteLength;
        }), e.initBox(i, "moof", r, a);
      } }, { key: "mfhd", value: function value() {
        var t = Buffer$1.writeUint32(e.sequence);return e.sequence += 1, e.initBox(16, "mfhd", e.extension(0, 0), t);
      } }, { key: "traf", value: function value(t) {
        var i = 8,
            r = e.tfhd(t.id),
            a = e.tfdt(t.time),
            n = e.sdtp(t),
            s = e.trun(t, n.byteLength);return [r, a, s, n].forEach(function (e) {
          i += e.byteLength;
        }), e.initBox(i, "traf", r, a, s, n);
      } }, { key: "tfhd", value: function value(t) {
        var i = Buffer$1.writeUint32(t);return e.initBox(16, "tfhd", e.extension(0, 0), i);
      } }, { key: "tfdt", value: function value(t) {
        return e.initBox(16, "tfdt", e.extension(0, 0), Buffer$1.writeUint32(t));
      } }, { key: "trun", value: function value(t, i) {
        var r = new Buffer$1(),
            a = Buffer$1.writeUint32(t.samples.length),
            n = Buffer$1.writeUint32(92 + 16 * t.samples.length + i);return r.write(e.size(20 + 16 * t.samples.length), e.type("trun"), new Uint8Array([0, 0, 15, 1]), a, n), t.samples.forEach(function (e) {
          var t = e.flags;r.write(new Uint8Array([e.duration >>> 24 & 255, e.duration >>> 16 & 255, e.duration >>> 8 & 255, 255 & e.duration, e.size >>> 24 & 255, e.size >>> 16 & 255, e.size >>> 8 & 255, 255 & e.size, t.isLeading << 2 | t.dependsOn, t.isDependedOn << 6 | t.hasRedundancy << 4 | t.isNonSync, 0, 0, e.cts >>> 24 & 255, e.cts >>> 16 & 255, e.cts >>> 8 & 255, 255 & e.cts]));
        }), r.buffer;
      } }, { key: "sdtp", value: function value(t) {
        var i = new Buffer$1();return i.write(e.size(12 + t.samples.length), e.type("sdtp"), e.extension(0, 0)), t.samples.forEach(function (e) {
          var t = e.flags,
              r = t.isLeading << 6 | t.dependsOn << 4 | t.isDependedOn << 2 | t.hasRedundancy;i.write(new Uint8Array([r]));
        }), i.buffer;
      } }, { key: "mdat", value: function value(t) {
        var i = new Buffer$1(),
            r = 8;t.samples.forEach(function (e) {
          r += e.size;
        }), i.write(e.size(r), e.type("mdat"));var a = new Uint8Array(r),
            n = 0;return a.set(i.buffer, n), n += 8, t.samples.forEach(function (e) {
          e.buffer.forEach(function (e) {
            a.set(e, n), n += e.byteLength;
          });
        }), a;
      } }]), e;
  }();Fmp4.type = function (e) {
    return new Uint8Array([e.charCodeAt(0), e.charCodeAt(1), e.charCodeAt(2), e.charCodeAt(3)]);
  }, Fmp4.sequence = 1;var REMUX_EVENTS$1 = EVENTS.REMUX_EVENTS,
      Mp4Remuxer = function () {
    function e() {
      classCallCheck(this, e), this._dtsBase = 0, this._isDtsBaseInited = !1, this._audioNextDts = null, this._videoNextDts = null, this._videoSegmentList = new MediaSegmentList$1("video"), this._audioSegmentList = new MediaSegmentList$1("audio");var t = sniffer$1.browser;this._fillSilenceFrame = "ie" === t, this.isFirstVideo = !0, this.isFirstAudio = !0, this.videoAllDuration = 0, this.audioAllDuration = 0;
    }return createClass(e, [{ key: "init", value: function value() {
        this.on(REMUX_EVENTS$1.REMUX_MEDIA, this.remux.bind(this)), this.on(REMUX_EVENTS$1.REMUX_METADATA, this.onMetaDataReady.bind(this)), this.on(REMUX_EVENTS$1.DETECT_CHANGE_STREAM, this.resetDtsBase.bind(this));
      } }, { key: "destroy", value: function value() {
        this._dtsBase = -1, this._dtsBaseInited = !1, this._videoNextDts = null, this._audioNextDts = null, this._videoSegmentList.clear(), this._audioSegmentList.clear(), this._videoSegmentList = null, this._audioSegmentList = null;
      } }, { key: "remux", value: function value() {
        var e = this._context.getInstance("TRACKS"),
            t = e.audioTrack,
            i = e.videoTrack;!this._isDtsBaseInited && this.calcDtsBase(t, i), this._remuxVideo(i), this._remuxAudio(t);
      } }, { key: "resetDtsBase", value: function value() {
        this._dtsBase = 0, this._dtsBaseInited = !1;
      } }, { key: "seek", value: function value() {
        this._videoNextDts = null, this._audioNextDts = null, this._videoSegmentList.clear(), this._audioSegmentList.clear();
      } }, { key: "onMetaDataReady", value: function value(e) {
        var t = void 0;t = "audio" === e ? this._context.getInstance("TRACKS").audioTrack : this._context.getInstance("TRACKS").videoTrack;var i = this._context.getInstance("PRE_SOURCE_BUFFER"),
            r = i.getSource(e);r || (r = i.createSource(e)), r.mimetype = t.meta.codec, r.init = this.remuxInitSegment(e, t.meta), this.emit(REMUX_EVENTS$1.INIT_SEGMENT, e);
      } }, { key: "remuxInitSegment", value: function value(e, t) {
        var i = new Buffer$1(),
            r = Fmp4.ftyp(),
            a = Fmp4.moov({ type: e, meta: t });return i.write(r, a), i;
      } }, { key: "calcDtsBase", value: function value(e, t) {
        if (!e && t.samples.length) return t.samples[0].dts;if (e.samples.length || t.samples.length) {
          var i = 1 / 0,
              r = 1 / 0;e.samples && e.samples.length && (i = e.samples[0].dts), t.samples && t.samples.length && (r = t.samples[0].dts), this._dtsBase = Math.min(i, r), this._isDtsBaseInited = !0;
        }
      } }, { key: "_remuxVideo", value: function value(e) {
        var t = e || {};if (e.samples && e.samples.length) {
          for (var i = t.samples, r = -1, a = null, n = [], s = { samples: [] }, o = 1e4; i.length && o-- > 0;) {
            var u = i.shift(),
                l = u.isKeyframe,
                d = u.options;if (!this.isFirstAudio && d && d.meta) {
              a = this.remuxInitSegment("video", d.meta), d.meta = null, i.unshift(u), d.isContinue || this.resetDtsBase();break;
            }var h = u.dts - this._dtsBase;-1 === r && (r = h);var c = void 0,
                f = void 0;void 0 !== u.pts && (c = (f = u.pts - this._dtsBase) - h), void 0 !== u.cts && (f = u.cts + h, c = u.cts);var p = { buffer: [], size: 0 };s.samples.push(p), p.buffer.push(u.data), p.size += u.data.byteLength;var v = 0;v = u.duration ? u.duration : i.length >= 1 ? i[0].dts - this._dtsBase - h : n.length >= 1 ? n[n.length - 1].duration : this.videoMeta.refSampleDuration, this.videoAllDuration += v, n.push({ dts: h, cts: c, pts: f, data: u.data, size: u.data.byteLength, isKeyframe: l, duration: v, flags: { isLeading: 0, dependsOn: l ? 2 : 1, isDependedOn: l ? 1 : 0, hasRedundancy: 0, isNonSync: l ? 0 : 1 }, originDts: h, type: "video" }), l && this.emit(REMUX_EVENTS$1.RANDOM_ACCESS_POINT, f);
          }var m = new Buffer$1();if (n.length) {
            var E = Fmp4.moof({ id: t.meta.id, time: r, samples: n }),
                y = Fmp4.mdat(s);m.write(E, y), this.writeToSource("video", m);
          }if (a && (this.writeToSource("video", a), i.length)) return t.samples = i, this._remuxVideo(t);this.isFirstVideo = !1, this.emit(REMUX_EVENTS$1.MEDIA_SEGMENT, "video");var _ = n[n.length - 1];this._videoNextDts = _.dts + _.duration, t.samples = [], t.length = 0;
        }
      } }, { key: "_remuxAudio", value: function value(e) {
        var t = (e || {}).samples,
            i = -1,
            r = [],
            a = null,
            n = { samples: [] };if (t && t.length) {
          for (var s = 1e4, o = !1; t.length && s-- > 0;) {
            var u = t.shift(),
                l = u.data,
                d = u.options;if (!this.isFirstAudio && d && d.meta) {
              a = this.remuxInitSegment("audio", d.meta), d.meta = null, t.unshift(u), d.isContinue || this.resetDtsBase();break;
            }var h = u.dts - this._dtsBase,
                c = h;o || (i = h, o = !0);var f = 0;f = u.duration ? u.duration : this.audioMeta.refSampleDurationFixed ? this.audioMeta.refSampleDurationFixed : t.length >= 1 ? t[0].dts - this._dtsBase - h : r.length >= 1 ? r[r.length - 1].duration : this.audioMeta.refSampleDuration, this.audioAllDuration += f;var p = { dts: h, pts: h, cts: 0, size: l.byteLength, duration: u.duration ? u.duration : f, flags: { isLeading: 0, dependsOn: 2, isDependedOn: 1, hasRedundancy: 0, isNonSync: 0 }, isKeyframe: !0, originDts: c, type: "audio" },
                v = { buffer: [], size: 0 };v.buffer.push(l), v.size += l.byteLength, n.samples.push(v), r.push(p);
          }var m = new Buffer$1();if (r.length) {
            var E = Fmp4.moof({ id: e.meta.id, time: i, samples: r }),
                y = Fmp4.mdat(n);m.write(E, y), this.writeToSource("audio", m);
          }if (a && (this.writeToSource("audio", a), t.length)) return e.samples = t, this._remuxAudio(e);this.isFirstAudio = !1, this.emit(REMUX_EVENTS$1.MEDIA_SEGMENT, "audio", m);var _ = r[r.length - 1];this._videoNextDts = _.dts + _.duration, e.samples = [], e.length = 0;
        }
      } }, { key: "writeToSource", value: function value(e, t) {
        var i = this._context.getInstance("PRE_SOURCE_BUFFER"),
            r = i.getSource(e);r || (r = i.createSource(e)), r.data.push(t);
      } }, { key: "initSilentAudio", value: function value(t, i) {
        var r = e.getSilentFrame(this._audioMeta.channelCount);return { dts: t, pts: t, cts: 0, duration: i, unit: r, size: r.byteLength, originDts: t, type: "video" };
      } }, { key: "videoMeta", get: function get() {
        return this._context.getInstance("TRACKS").videoTrack.meta;
      } }, { key: "audioMeta", get: function get() {
        return this._context.getInstance("TRACKS").audioTrack.meta;
      } }], [{ key: "getSilentFrame", value: function value(e) {
        return 1 === e ? new Uint8Array([0, 200, 0, 128, 35, 128]) : 2 === e ? new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128]) : 3 === e ? new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142]) : 4 === e ? new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56]) : 5 === e ? new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56]) : 6 === e ? new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224]) : null;
      } }]), e;
  }(),
      LOADER_EVENTS$1 = EVENTS.LOADER_EVENTS,
      READ_STREAM = 0,
      READ_TEXT = 1,
      READ_JSON = 2,
      READ_BUFFER = 3,
      FetchLoader = function () {
    function e(t) {
      classCallCheck(this, e), this.configs = Object.assign({}, t), this.url = null, this.status = 0, this.error = null, this._reader = null, this._canceled = !1, this._destroyed = !1, this.readtype = this.configs.readtype, this.buffer = this.configs.buffer || "LOADER_BUFFER", this._loaderTaskNo = 0;
    }return createClass(e, [{ key: "init", value: function value() {
        this.on(LOADER_EVENTS$1.LADER_START, this.load.bind(this));
      } }, { key: "load", value: function value(e, t) {
        var i = this;this.url = e, this._canceled = !1;var r = this.getParams(t);return i.loading = !0, fetch(this.url, r).then(function (e) {
          if (e.ok) return i.status = e.status, i._onFetchResponse(e);i.loading = !1, i.emit(LOADER_EVENTS$1.LOADER_ERROR, i.TAG, new Error("invalid response."));
        }).catch(function (e) {
          throw i.loading = !1, i.emit(LOADER_EVENTS$1.LOADER_ERROR, i.TAG, e), new Error(e.message);
        });
      } }, { key: "_onFetchResponse", value: function value(e) {
        var t = this,
            i = this._context.getInstance(this.buffer),
            r = ++this._loaderTaskNo;if (!0 === e.ok) switch (this.readtype) {case READ_JSON:
            e.json().then(function (e) {
              t.loading = !1, t._canceled || t._destroyed || (i ? (i.push(e), t.emit(LOADER_EVENTS$1.LOADER_COMPLETE, i)) : t.emit(LOADER_EVENTS$1.LOADER_COMPLETE, e));
            });break;case READ_TEXT:
            e.text().then(function (e) {
              t.loading = !1, t._canceled || t._destroyed || (i ? (i.push(e), t.emit(LOADER_EVENTS$1.LOADER_COMPLETE, i)) : t.emit(LOADER_EVENTS$1.LOADER_COMPLETE, e));
            });break;case READ_BUFFER:
            e.arrayBuffer().then(function (e) {
              t.loading = !1, t._canceled || t._destroyed || (i ? (i.push(new Uint8Array(e)), t.emit(LOADER_EVENTS$1.LOADER_COMPLETE, i)) : t.emit(LOADER_EVENTS$1.LOADER_COMPLETE, e));
            });break;case READ_STREAM:default:
            return this._onReader(e.body.getReader(), r);}
      } }, { key: "_onReader", value: function value(e, t) {
        var i = this._context.getInstance(this.buffer);if (!i && this._reader || this._destroyed) try {
          this._reader.cancel();
        } catch (e) {}if (this._reader = e, !1 !== this.loading) {
          var r = this;this._reader && this._reader.read().then(function (a) {
            if (!r._canceled && !r._destroyed) return a.done ? (r.loading = !1, r.status = 0, void r.emit(LOADER_EVENTS$1.LOADER_COMPLETE, i)) : (i.push(a.value), r.emit(LOADER_EVENTS$1.LOADER_DATALOADED, i), r._onReader(e, t));if (r._reader) try {
              r._reader.cancel();
            } catch (e) {}
          }).catch(function (e) {
            r.loading = !1, r.emit(LOADER_EVENTS$1.LOADER_ERROR, r.TAG, e);
          });
        }
      } }, { key: "getParams", value: function value(e) {
        var t = Object.assign({}, e),
            i = new Headers(),
            r = { method: "GET", headers: i, mode: "cors", cache: "default" };if ("object" === _typeof(this.configs.headers)) {
          var a = this.configs.headers;for (var n in a) {
            a.hasOwnProperty(n) && i.append(n, a[n]);
          }
        }if ("object" === _typeof(t.headers)) {
          var s = t.headers;for (var o in s) {
            s.hasOwnProperty(o) && i.append(o, s[o]);
          }
        }return !1 === t.cors && (r.mode = "same-origin"), t.withCredentials && (r.credentials = "include"), r;
      } }, { key: "cancel", value: function value() {
        if (this._reader) {
          try {
            this._reader.cancel();
          } catch (e) {}this._reader = null, this.loading = !1;
        }this._canceled = !0;
      } }, { key: "destroy", value: function value() {
        this._destroyed = !0, this.cancel();
      } }], [{ key: "type", get: function get() {
        return "loader";
      } }]), e;
  }(),
      FetchLoader$1 = FetchLoader,
      M3U8Parser = function () {
    function e() {
      classCallCheck(this, e);
    }return createClass(e, null, [{ key: "parse", value: function value(t) {
        var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
            r = { duration: 0 };if (t && t.split) {
          var a = t.split(/\r|\n/),
              n = (a = a.filter(function (e) {
            return e;
          })).shift();if (!n.match("#EXTM3U")) throw new Error('Invalid m3u8 file: not "#EXTM3U"');n = a.shift();for (var s = !1; n;) {
            var o = n.match(/#(.[A-Z|-]*):(.*)/),
                u = n.match(/#(.[A-Z|-]*)/);if (u && o && o.length > 2) switch (o[1]) {case "EXT-X-VERSION":
                r.version = parseInt(o[2]);break;case "EXT-X-MEDIA-SEQUENCE":
                r.sequence = parseInt(o[2]);break;case "EXT-X-TARGETDURATION":
                r.targetduration = parseFloat(o[2]);break;case "EXTINF":
                e.parseFrag(o, a, r, i, s), s = !1;break;case "EXT-X-KEY":
                e.parseDecrypt(o[2], r);}if (u && u.length > 1) switch (u[1]) {case "EXT-X-DISCONTINUITY":
                s = !0;}n = a.shift();
          }return r;
        }
      } }, { key: "parseFrag", value: function value(e, t, i, r, a) {
        i.frags || (i.frags = []);var n = { start: i.duration, duration: 1e3 * parseFloat(e[2]) };i.duration += n.duration;var s = t.shift();s.match(/#(.*):(.*)/) && (s = t.shift()), s.length > 0 && "/" === s.charAt(0) && r.match(/.*\/\/.*\.\w+/g) && (r = r.match(/.*\/\/.*\.\w+/g)[0]), s.match(/.*:\/\/.*/) ? n.url = s : n.url = r + s, n.discontinue = a, i.frags.push(n);
      } }, { key: "parseURL", value: function value(e) {
        var t = "",
            i = e.match(/(.*\/).*\.m3u8/);if (i && i.length > 0) for (var r = 0; r < i.length; r++) {
          i[r].match(/.*\/$/g) && i[r].length > t.length && (t = i[r]);
        }return t;
      } }, { key: "parseDecrypt", value: function value(e, t) {
        t.encrypt = {};var i = e.split(",");for (var r in i) {
          var a = i[r];if (a.match(/METHOD=(.*)/) && (t.encrypt.method = a.match(/METHOD=(.*)/)[1]), a.match(/URI="(.*)"/) && (t.encrypt.uri = a.match(/URI="(.*)"/)[1]), a.match(/IV=0x(.*)/)) {
            var n = a.match(/IV=0x(.*)/)[1],
                s = Math.ceil(n.length / 2);t.encrypt.ivb = new Uint8Array(s);for (var o = s - 1; o >= 0; o--) {
              var u = parseInt(n.substr(2 * o, 2), 16);t.encrypt.ivb[o] = u;
            }t.encrypt.iv = n;
          }
        }
      } }]), e;
  }(),
      Golomb = function () {
    function e(t) {
      classCallCheck(this, e), this.TAG = "Golomb", this._buffer = t, this._bufferIndex = 0, this._totalBytes = t.byteLength, this._totalBits = 8 * t.byteLength, this._currentWord = 0, this._currentWordBitsLeft = 0;
    }return createClass(e, [{ key: "destroy", value: function value() {
        this._buffer = null;
      } }, { key: "_fillCurrentWord", value: function value() {
        var e = this._totalBytes - this._bufferIndex,
            t = Math.min(4, e),
            i = new Uint8Array(4);i.set(this._buffer.subarray(this._bufferIndex, this._bufferIndex + t)), this._currentWord = new DataView(i.buffer).getUint32(0), this._bufferIndex += t, this._currentWordBitsLeft = 8 * t;
      } }, { key: "readBits", value: function value(e) {
        var t = Math.min(this._currentWordBitsLeft, e),
            i = this._currentWord >>> 32 - t;if (e > 32) throw new Error("Cannot read more than 32 bits at a time");return this._currentWordBitsLeft -= t, this._currentWordBitsLeft > 0 ? this._currentWord <<= t : this._totalBytes - this._bufferIndex > 0 && this._fillCurrentWord(), t = e - t, t > 0 && this._currentWordBitsLeft ? i << t | this.readBits(t) : i;
      } }, { key: "readBool", value: function value() {
        return 1 === this.readBits(1);
      } }, { key: "readByte", value: function value() {
        return this.readBits(8);
      } }, { key: "_skipLeadingZero", value: function value() {
        var e = void 0;for (e = 0; e < this._currentWordBitsLeft; e++) {
          if (0 != (this._currentWord & 2147483648 >>> e)) return this._currentWord <<= e, this._currentWordBitsLeft -= e, e;
        }return this._fillCurrentWord(), e + this._skipLeadingZero();
      } }, { key: "readUEG", value: function value() {
        var e = this._skipLeadingZero();return this.readBits(e + 1) - 1;
      } }, { key: "readSEG", value: function value() {
        var e = this.readUEG();return 1 & e ? e + 1 >>> 1 : -1 * (e >>> 1);
      } }]), e;
  }(),
      SPSParser = function () {
    function e() {
      classCallCheck(this, e);
    }return createClass(e, null, [{ key: "_ebsp2rbsp", value: function value(e) {
        for (var t = e, i = t.byteLength, r = new Uint8Array(i), a = 0, n = 0; n < i; n++) {
          n >= 2 && 3 === t[n] && 0 === t[n - 1] && 0 === t[n - 2] || (r[a] = t[n], a++);
        }return new Uint8Array(r.buffer, 0, a);
      } }, { key: "parseSPS", value: function value(t) {
        var i = e._ebsp2rbsp(t),
            r = new Golomb(i);r.readByte();var a = r.readByte();r.readByte();var n = r.readByte();r.readUEG();var s = e.getProfileString(a),
            o = e.getLevelString(n),
            u = 1,
            l = 420,
            d = [0, 420, 422, 444],
            h = 8;if ((100 === a || 110 === a || 122 === a || 244 === a || 44 === a || 83 === a || 86 === a || 118 === a || 128 === a || 138 === a || 144 === a) && (3 === (u = r.readUEG()) && r.readBits(1), u <= 3 && (l = d[u]), h = r.readUEG() + 8, r.readUEG(), r.readBits(1), r.readBool())) for (var c = 3 !== u ? 8 : 12, f = 0; f < c; f++) {
          r.readBool() && (f < 6 ? e._skipScalingList(r, 16) : e._skipScalingList(r, 64));
        }r.readUEG();var p = r.readUEG();if (0 === p) r.readUEG();else if (1 === p) {
          r.readBits(1), r.readSEG(), r.readSEG();for (var v = r.readUEG(), m = 0; m < v; m++) {
            r.readSEG();
          }
        }r.readUEG(), r.readBits(1);var E = r.readUEG(),
            y = r.readUEG(),
            _ = r.readBits(1);0 === _ && r.readBits(1), r.readBits(1);var g = 0,
            S = 0,
            k = 0,
            T = 0;r.readBool() && (g = r.readUEG(), S = r.readUEG(), k = r.readUEG(), T = r.readUEG());var A = 1,
            b = 1,
            D = 0,
            R = !0,
            w = 0,
            C = 0;if (r.readBool()) {
          if (r.readBool()) {
            var L = r.readByte(),
                U = [1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2],
                M = [1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1];L > 0 && L < 16 ? (A = U[L - 1], b = M[L - 1]) : 255 === L && (A = r.readByte() << 8 | r.readByte(), b = r.readByte() << 8 | r.readByte());
          }if (r.readBool() && r.readBool(), r.readBool() && (r.readBits(4), r.readBool() && r.readBits(24)), r.readBool() && (r.readUEG(), r.readUEG()), r.readBool()) {
            var O = r.readBits(32),
                x = r.readBits(32);R = r.readBool(), D = (w = x) / (C = 2 * O);
          }
        }var N = 1;1 === A && 1 === b || (N = A / b);var V = 0,
            B = 0;0 === u ? (V = 1, B = 2 - _) : (V = 3 === u ? 1 : 2, B = (1 === u ? 2 : 1) * (2 - _));var I = 16 * (E + 1),
            P = 16 * (y + 1) * (2 - _);I -= (g + S) * V, P -= (k + T) * B;var F = Math.ceil(I * N);return r.destroy(), r = null, { profile_string: s, level_string: o, bit_depth: h, chroma_format: l, chroma_format_string: e.getChromaFormatString(l), frame_rate: { fixed: R, fps: D, fps_den: C, fps_num: w }, par_ratio: { width: A, height: b }, codec_size: { width: I, height: P }, present_size: { width: F, height: P } };
      } }, { key: "_skipScalingList", value: function value(e, t) {
        for (var i = 8, r = 8, a = 0; a < t; a++) {
          0 !== r && (r = (i + e.readSEG() + 256) % 256), i = 0 === r ? i : r;
        }
      } }, { key: "getProfileString", value: function value(e) {
        switch (e) {case 66:
            return "Baseline";case 77:
            return "Main";case 88:
            return "Extended";case 100:
            return "High";case 110:
            return "High10";case 122:
            return "High422";case 244:
            return "High444";default:
            return "Unknown";}
      } }, { key: "getLevelString", value: function value(e) {
        return (e / 10).toFixed(1);
      } }, { key: "getChromaFormatString", value: function value(e) {
        switch (e) {case 420:
            return "4:2:0";case 422:
            return "4:2:2";case 444:
            return "4:4:4";default:
            return "Unknown";}
      } }, { key: "toVideoMeta", value: function value(e) {
        var t = {};e && e.codec_size && (t.codecWidth = e.codec_size.width, t.codecHeight = e.codec_size.height, t.presentWidth = e.present_size.width, t.presentHeight = e.present_size.height), t.profile = e.profile_string, t.level = e.level_string, t.bitDepth = e.bit_depth, t.chromaFormat = e.chroma_format, t.parRatio = { width: e.par_ratio.width, height: e.par_ratio.height }, t.frameRate = e.frame_rate;var i = t.frameRate.fps_den,
            r = t.frameRate.fps_num;t.refSampleDuration = Math.floor(t.timescale * (i / r));
      } }]), e;
  }(),
      Nalunit = function () {
    function e() {
      classCallCheck(this, e);
    }return createClass(e, null, [{ key: "getNalunits", value: function value(t) {
        if (t.length - t.position < 4) return [];var i = t.dataview,
            r = t.position;return 1 === i.getInt32(r) || 0 === i.getInt16(r) && 1 === i.getInt8(r + 2) ? e.getAnnexbNals(t) : e.getAvccNals(t);
      } }, { key: "getAnnexbNals", value: function value(t) {
        for (var i = [], r = e.getHeaderPositionAnnexB(t), a = r.pos, n = a; a < t.length - 4;) {
          var s = t.buffer.slice(a, a + r.headerLength);r.pos === t.position && t.skip(r.headerLength), n = (r = e.getHeaderPositionAnnexB(t)).pos;var o = { header: s, body: new Uint8Array(t.buffer.slice(a + s.byteLength, n)) };e.analyseNal(o), i.push(o), t.skip(n - t.position), a = n;
        }return i;
      } }, { key: "getAvccNals", value: function value(t) {
        for (var i = []; t.position < t.length - 4;) {
          var r = t.dataview.getInt32();if (!(t.length - t.position >= r)) break;var a = t.buffer.slice(t.position, t.position + 4);t.skip(4);var n = t.buffer.slice(t.position, t.position + r);t.skip(r);var s = { header: a, body: n };e.analyseNal(s), i.push(s);
        }return i;
      } }, { key: "analyseNal", value: function value(e) {
        switch (31 & e.body[0]) {case 1:
            e.ndr = !0;break;case 5:
            e.idr = !0;break;case 6:
            break;case 7:
            e.sps = SPSParser.parseSPS(e.body);break;case 8:
            e.pps = !0;}
      } }, { key: "getHeaderPositionAnnexB", value: function value(e) {
        for (var t = e.position, i = 0; 3 !== i && 4 !== i && t < e.length - 4;) {
          0 === e.dataview.getInt16(t) ? 1 === e.dataview.getInt16(t + 2) ? i = 4 : 1 === e.dataview.getInt8(t + 2) ? i = 3 : t++ : t++;
        }return t === e.length - 4 && (0 === e.dataview.getInt16(t) ? 1 === e.dataview.getInt16(t + 2) && (i = 4) : (t++, 0 === e.dataview.getInt16(t) && 1 === e.dataview.getInt8(t) ? i = 3 : t = e.length)), { pos: t, headerLength: i };
      } }, { key: "getAvcc", value: function value(e, t) {
        var i = new Uint8Array(e.byteLength + t.byteLength + 11);i[0] = 1, i[1] = e[1], i[2] = e[2], i[3] = e[3], i[4] = 255, i[5] = 225;var r = 6;return i.set(new Uint8Array([e.byteLength >>> 8 & 255, 255 & e.byteLength]), r), r += 2, i.set(e, r), r += e.byteLength, i[r] = 1, r++, i.set(new Uint8Array([t.byteLength >>> 8 & 255, 255 & t.byteLength]), r), r += 2, i.set(t, r), i;
      } }]), e;
  }(),
      AAC = function () {
    function e() {
      classCallCheck(this, e);
    }return createClass(e, null, [{ key: "getSilentFrame", value: function value(e, t) {
        if ("mp4a.40.2" === e) {
          if (1 === t) return new Uint8Array([0, 200, 0, 128, 35, 128]);if (2 === t) return new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128]);if (3 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142]);if (4 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56]);if (5 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56]);if (6 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224]);
        } else {
          if (1 === t) return new Uint8Array([1, 64, 34, 128, 163, 78, 230, 128, 186, 8, 0, 0, 0, 28, 6, 241, 193, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);if (2 === t) return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);if (3 === t) return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
        }return null;
      } }]), e;
  }(),
      REMUX_EVENTS$2 = EVENTS.REMUX_EVENTS,
      LOADER_EVENTS$2 = EVENTS.LOADER_EVENTS,
      Compatibility = function () {
    function e() {
      classCallCheck(this, e), this.nextAudioDts = 0, this.nextVideoDts = 0, this.lastAudioSamplesLen = 0, this.lastVideoSamplesLen = 0, this.lastVideoDts = void 0, this.lastAudioDts = void 0, this.allAudioSamplesCount = 0, this.allVideoSamplesCount = 0, this._firstAudioSample = null, this._firstVideoSample = null, this.filledAudioSamples = [], this.filledVideoSamples = [], this.videoLastSample = null, this.audioLastSample = null, this._videoLargeGap = 0, this._audioLargeGap = 0;
    }return createClass(e, [{ key: "init", value: function value() {
        var e = this;this.before(REMUX_EVENTS$2.REMUX_MEDIA, this.doFix.bind(this)), this.on(LOADER_EVENTS$2.LOADER_COMPLETE, function () {
          e.videoLastSample && e.videoTrack.samples.unshift(e.videoLastSample);
        });
      } }, { key: "reset", value: function value() {
        this.nextAudioDts = null, this.nextVideoDts = null, this.lastAudioSamplesLen = 0, this.lastVideoSamplesLen = 0, this.lastVideoDts = void 0, this.lastAudioDts = void 0, this.videoLastSample = null, this.audioLastSample = null, this.filledAudioSamples = [], this.filledVideoSamples = [];
      } }, { key: "doFix", value: function value() {
        var t = this.getFirstSample(),
            i = t.isFirstAudioSamples,
            r = t.isFirstVideoSamples;this.recordSamplesCount(), this._firstVideoSample && this.fixRefSampleDuration(this.videoTrack.meta, this.videoTrack.samples), this._firstAudioSample && this.fixRefSampleDuration(this.audioTrack.meta, this.audioTrack.samples);var a = e.detactChangeStream(this.videoTrack.samples),
            n = a.changed,
            s = a.changedIdx;n && !i ? this.fixChangeStreamVideo(s) : this.doFixVideo(r);var o = e.detactChangeStream(this.audioTrack.samples),
            u = o.changed,
            l = o.changedIdx;u ? this.fixChangeStreamAudio(l) : this.doFixAudio(i), this.removeInvalidSamples();
      } }, { key: "doFixVideo", value: function value(t, i) {
        for (var r = this.videoTrack, a = r.samples, n = r.meta, s = 0, o = a.length; s < o; s++) {
          var u = a[s];u.originDts = u.dts;
        }if ((!n.frameRate || !1 !== n.frameRate.fixed) && a && a.length && this._firstVideoSample) {
          var l = a[0];if (this._videoLargeGap > 0 && e.doFixLargeGap(a, this._videoLargeGap), l.dts !== this._firstVideoSample.dts && i && (i && (this.nextVideoDts = i), this._videoLargeGap = this.nextVideoDts - l.dts, e.doFixLargeGap(a, this._videoLargeGap)), t && this._firstAudioSample) {
            var d = this._firstVideoSample.originDts,
                h = d - (this._firstAudioSample.originDts || this._firstAudioSample.dts);if (h > 2 * n.refSampleDuration && h < 10 * n.refSampleDuration) {
              for (var c = Math.floor(h / n.refSampleDuration), f = 0; f < c; f++) {
                var p = Object.assign({}, l);p.dts = d - (f + 1) * n.refSampleDuration, p.pts = p.dts + p.cts, a.unshift(p), this.filledVideoSamples.push({ dts: p.dts, size: p.data.byteLength });
              }this._firstVideoSample = this.filledVideoSamples[0] || this._firstVideoSample;
            } else h < -2 * n.refSampleDuration && (this._videoLargeGap = -1 * h, e.doFixLargeGap(a, -1 * h));
          }var v = a.pop();if (a.length && (a[a.length - 1].duration = v.dts - a[a.length - 1].dts), this.videoLastSample) {
            var m = this.videoLastSample;m.duration = l.dts - m.dts, a.unshift(this.videoLastSample);
          }this.videoLastSample = v, this.videoTrack.samples = a;
        }
      } }, { key: "doFixAudio", value: function value(t, i) {
        var r = this.audioTrack,
            a = r.samples,
            n = r.meta;if (a && a.length) {
          for (var s = 0, o = a.length; s < o; s++) {
            var u = a[s];u.originDts = u.dts;
          }var l = a.length,
              d = AAC.getSilentFrame(n.codec, n.channelCount),
              h = this._firstAudioSample,
              c = a[0];if (this._audioLargeGap > 0 && e.doFixLargeGap(a, this._audioLargeGap), c.dts !== this._firstAudioSample.dts && (i || e.detectLargeGap(this.nextAudioDts, c)) && (i && (this.nextAudioDts = i), this._audioLargeGap = this.nextAudioDts - c.dts, e.doFixLargeGap(a, this._audioLargeGap)), this._firstVideoSample && t) {
            var f = this._firstVideoSample.originDts || this._firstVideoSample.dts,
                p = h.dts - f;if (p > n.refSampleDuration && p < 10 * n.refSampleDuration) {
              for (var v = Math.floor((h.dts - f) / n.refSampleDuration), m = 0; m < v; m++) {
                var E = { data: d, datasize: d.byteLength, dts: h.dts - (m + 1) * n.refSampleDuration, filtered: 0 };a.unshift(E), this.filledAudioSamples.push({ dts: E.dts, size: E.data.byteLength });
              }this._firstAudioSample = this.filledAudioSamples[0] || this._firstAudioSample;
            } else p < -1 * n.refSampleDuration && (this._audioLargeGap = -1 * p, e.doFixLargeGap(a, -1 * p));
          }var y = void 0,
              _ = a[0].dts;if (this.nextAudioDts) {
            y = _ - this.nextAudioDts;var g = Math.abs(y);if (g > n.refSampleDuration && 1 === l && 1 === this.lastAudioSamplesLen && (n.refSampleDurationFixed = void 0), y > 2 * n.refSampleDuration && y < 10 * n.refSampleDuration) {
              if (1 === l && 1 === this.lastAudioSamplesLen) n.refSampleDurationFixed = void 0 !== n.refSampleDurationFixed ? n.refSampleDurationFixed + y : n.refSampleDuration + y;else for (var S = Math.floor(y / n.refSampleDuration), k = 0; k < S; k++) {
                var T = _ - (k + 1) * n.refSampleDuration,
                    A = Object.assign({}, a[0], { dts: T > this.nextAudioDts ? T : this.nextAudioDts });this.filledAudioSamples.push({ dts: A.dts, size: A.data.byteLength }), this.audioTrack.samples.unshift(A);
              }
            } else g <= n.refSampleDuration && g > 0 ? (a[0].dts = this.nextAudioDts, a[0].pts = this.nextAudioDts) : y < 0 && e.doFixLargeGap(a, -1 * y);
          }var b = a[a.length - 1].originDts,
              D = a[a.length - 1].dts,
              R = a.length >= 2 ? b - a[a.length - 2].originDts : n.refSampleDuration;this.lastAudioSamplesLen = l, this.nextAudioDts = n.refSampleDurationFixed ? D + n.refSampleDurationFixed : D + R, this.lastAudioDts = D, a[a.length - 1].duration = R;for (var w = 0, C = a.length; w < C; w++) {
            var L = a[w],
                U = a[w + 1];if (!U) break;var M = U.dts - L.dts;a[w].duration = M;
          }this.audioTrack.samples = e.sortAudioSamples(a);
        }
      } }, { key: "fixChangeStreamVideo", value: function value(e) {
        var t = this.videoTrack,
            i = t.samples,
            r = t.meta,
            a = 0 === e ? this.getStreamChangeStart(i[0]) : i[e - 1].dts,
            n = i[e].dts;if (Math.abs(a - n) <= 2 * r.refSampleDuration) return i[e].options ? i[e].options.isContinue = !0 : i[e].options = { isContinue: !0 }, this.doFixVideo(!1);var s = i.slice(0, e),
            o = i.slice(e),
            u = i[0],
            l = o[0].dts - u.dts,
            d = u.options && u.options.start + l ? u.options.start : null;this.videoTrack.samples = i.slice(0, e), this.doFixVideo(!1), this.videoTrack.samples = i.slice(e), this.doFixVideo(!1, d), this.videoTrack.samples = s.concat(o);
      } }, { key: "fixChangeStreamAudio", value: function value(e) {
        var t = this.audioTrack,
            i = t.samples,
            r = t.meta,
            a = 0 === e ? this.getStreamChangeStart(i[0]) : i[e - 1].dts,
            n = i[e].dts;if (Math.abs(a - n) <= 2 * r.refSampleDuration) return i[e].options ? i[e].options.isContinue = !0 : i[e].options = { isContinue: !0 }, this.doFixAudio(!1);var s = i.slice(0, e),
            o = i.slice(e),
            u = i[0],
            l = o[0].dts - u.dts,
            d = u.options && u.options.start + l ? u.options.start : null;this.audioTrack.samples = s, this.doFixAudio(!1), this.audioTrack.samples = o, this.doFixAudio(!1, d), this.audioTrack.samples = s.concat(o);
      } }, { key: "getFirstSample", value: function value() {
        var t = this.videoTrack.samples,
            i = this.audioTrack.samples,
            r = !1,
            a = !1;return !this._firstVideoSample && t.length && (this._firstVideoSample = e.findFirstVideoSample(t), this.removeInvalidSamples(), r = !0), !this._firstAudioSample && i.length && (this._firstAudioSample = e.findFirstAudioSample(i), this.removeInvalidSamples(), a = !0), { isFirstVideoSamples: r, isFirstAudioSamples: a };
      } }, { key: "fixRefSampleDuration", value: function value(e, t) {
        var i = "video" === e.type,
            r = i ? this.allVideoSamplesCount : this.allAudioSamplesCount,
            a = i ? this._firstVideoSample.dts : this._firstAudioSample.dts,
            n = i ? this.filledVideoSamples.length : this.filledAudioSamples.length;if (!e.refSampleDuration || e.refSampleDuration <= 0 || Number.isNaN(e.refSampleDuration)) {
          if (t.length >= 1) {
            var s = t[t.length - 1].dts;e.refSampleDuration = Math.floor((s - a) / (r + n - 1));
          }
        } else if (e.refSampleDuration && t.length >= 5) {
          var o = (t[t.length - 1].dts - t[0].dts) / (t.length - 1);e.refSampleDuration = Math.floor(Math.abs(e.refSampleDuration - o) <= 5 ? e.refSampleDuration : o);
        }
      } }, { key: "recordSamplesCount", value: function value() {
        var e = this.audioTrack,
            t = this.videoTrack;this.allAudioSamplesCount += e.samples.length, this.allVideoSamplesCount += t.samples.length;
      } }, { key: "removeInvalidSamples", value: function value() {
        var e = this._firstVideoSample,
            t = this._firstAudioSample;t && (this.audioTrack.samples = this.audioTrack.samples.filter(function (e, i) {
          return e === t || e.dts > t.dts;
        })), e && (this.videoTrack.samples = this.videoTrack.samples.filter(function (t, i) {
          return t === e || t.dts > e.dts;
        }));
      } }, { key: "getStreamChangeStart", value: function value(e) {
        return e.options && e.options.start ? e.options.start - this.dtsBase : 1 / 0;
      } }, { key: "tracks", get: function get() {
        return this._context.getInstance("TRACKS");
      } }, { key: "audioTrack", get: function get() {
        return this.tracks && this.tracks.audioTrack ? this.tracks.audioTrack : { samples: [], meta: {} };
      } }, { key: "videoTrack", get: function get() {
        return this.tracks && this.tracks.videoTrack ? this.tracks.videoTrack : { samples: [], meta: {} };
      } }, { key: "dtsBase", get: function get() {
        var e = this._context.getInstance("MP4_REMUXER");return e ? e._dtsBase : 0;
      } }], [{ key: "sortAudioSamples", value: function value(e) {
        return 1 === e.length ? e : e.sort(function (e, t) {
          return e.dts - t.dts;
        });
      } }, { key: "findFirstAudioSample", value: function value(t) {
        return t && 0 !== t.length ? e.sortAudioSamples(t)[0] : null;
      } }, { key: "findFirstVideoSample", value: function value(e) {
        if (!e.length) return null;for (var t = e.sort(function (e, t) {
          return e.dts - t.dts;
        }), i = 0, r = t.length; i < r; i++) {
          if (t[i].isKeyframe) return t[i];
        }
      } }, { key: "detectLargeGap", value: function value(e, t) {
        if (null !== e) {
          var i = t.dts || 0,
              r = e - i >= 1e3 || i - e >= 1e3,
              a = t.options && t.options.discontinue;return r || a;
        }
      } }, { key: "doFixLargeGap", value: function value(e, t) {
        for (var i = 0, r = e.length; i < r; i++) {
          var a = e[i];a.dts += t, a.pts && (a.pts += t);
        }
      } }, { key: "detactChangeStream", value: function value(e) {
        for (var t = !1, i = -1, r = 0, a = e.length; r < a; r++) {
          if (e[r].options && e[r].options.meta) {
            t = !0, i = r;break;
          }
        }return { changed: t, changedIdx: i };
      } }]), e;
  }(),
      Nalunit$1 = Nalunit,
      SpsParser = SPSParser,
      Compatibility$1 = Compatibility,
      Track = function () {
    function e() {
      classCallCheck(this, e), this.id = -1, this.sequenceNumber = 0, this.samples = [], this.droppedSamples = [], this.length = 0;
    }return createClass(e, [{ key: "reset", value: function value() {
        this.sequenceNumber = 0, this.samples = [], this.length = 0;
      } }, { key: "distroy", value: function value() {
        this.reset(), this.id = -1;
      } }]), e;
  }(),
      AudioTrack = function (e) {
    function t() {
      classCallCheck(this, t);var e = possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));return e.TAG = "AudioTrack", e.type = "audio", e;
    }return inherits(t, e), t;
  }(Track),
      VideoTrack = function (e) {
    function t() {
      classCallCheck(this, t);var e = possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));return e.TAG = "VideoTrack", e.type = "video", e.dropped = 0, e;
    }return inherits(t, e), createClass(t, [{ key: "reset", value: function value() {
        this.sequenceNumber = 0, this.samples = [], this.length = 0, this.dropped = 0;
      } }]), t;
  }(Track),
      Tracks = function () {
    function e() {
      classCallCheck(this, e), this.audioTrack = null, this.videoTrack = null;
    }return createClass(e, [{ key: "destroy", value: function value() {
        this.audioTrack = null, this.videoTrack = null;
      } }]), e;
  }(),
      XgBuffer = function () {
    function e(t) {
      classCallCheck(this, e), this.length = t || 0, this.historyLen = t || 0, this.array = [], this.offset = 0;
    }return createClass(e, [{ key: "push", value: function value(e) {
        this.array.push(e), this.length += e.byteLength, this.historyLen += e.byteLength;
      } }, { key: "shift", value: function value(e) {
        if (this.array.length < 1) return new Uint8Array(0);if (void 0 === e) return this._shiftBuffer();if (this.offset + e === this.array[0].length) {
          var t = this.array[0].slice(this.offset, this.offset + e);return this.offset = 0, this.array.shift(), this.length -= e, t;
        }if (this.offset + e < this.array[0].length) {
          var i = this.array[0].slice(this.offset, this.offset + e);return this.offset += e, this.length -= e, i;
        }for (var r = new Uint8Array(e), a = 0; this.array.length > 0 && e > 0;) {
          if (this.offset + e < this.array[0].length) {
            var n = this.array[0].slice(this.offset, this.offset + e);r.set(n, a), this.offset += e, this.length -= e, e = 0;break;
          }var s = this.array[0].length - this.offset;r.set(this.array[0].slice(this.offset, this.array[0].length), a), this.array.shift(), this.offset = 0, a += s, this.length -= s, e -= s;
        }return r;
      } }, { key: "clear", value: function value() {
        this.array = [], this.length = 0, this.offset = 0;
      } }, { key: "destroy", value: function value() {
        this.clear(), this.historyLen = 0;
      } }, { key: "_shiftBuffer", value: function value() {
        return this.length -= this.array[0].length, this.offset = 0, this.array.shift();
      } }, { key: "toInt", value: function value(e, t) {
        for (var i = 0, r = this.offset + e; r < this.offset + t + e;) {
          r < this.array[0].length ? i = 256 * i + this.array[0][r] : this.array[1] && (i = 256 * i + this.array[1][r - this.array[0].length]), r++;
        }return i;
      } }]), e;
  }(),
      RemuxBuffer = function () {
    function e() {
      classCallCheck(this, e), this.video = [], this.audio = [];
    }return createClass(e, [{ key: "destroy", value: function value() {
        this.video = [], this.audio = [];
      } }]), e;
  }(),
      Source = function e() {
    classCallCheck(this, e), this.mimetype = "", this.init = null, this.data = [];
  },
      PreSource = function () {
    function e() {
      classCallCheck(this, e), this.sources = {};
    }return createClass(e, [{ key: "getSource", value: function value(e) {
        return this.sources[e];
      } }, { key: "createSource", value: function value(e) {
        return this.sources[e] = new Source(), this.sources[e];
      } }, { key: "clear", value: function value() {
        this.sources = {};
      } }, { key: "destroy", value: function value() {
        this.sources = {};
      } }]), e;
  }(),
      Tracks$1 = Tracks,
      AudioTrack$1 = AudioTrack,
      VideoTrack$1 = VideoTrack,
      XgBuffer$1 = XgBuffer,
      PreSource$1 = PreSource,
      DEMUX_EVENTS$1 = EVENTS.DEMUX_EVENTS,
      StreamType = { 1: ["video", "MPEG-1"], 2: ["video", "MPEG-2"], 27: ["video", "AVC.H264"], 234: ["video", "VC-1"], 3: ["audio", "MPEG-1"], 4: ["audio", "MPEG-2"], 15: ["audio", "MPEG-2.AAC"], 17: ["audio", "MPEG-4.AAC"], 128: ["audio", "LPCM"], 129: ["audio", "AC3"], 6: ["audio", "AC3"], 130: ["audio", "DTS"], 131: ["audio", "Dolby TrueHD"], 132: ["audio", "AC3-Plus"], 133: ["audio", "DTS-HD"], 134: ["audio", "DTS-MA"], 161: ["audio", "AC3-Plus-SEC"], 162: ["audio", "DTS-HD-SEC"] },
      TsDemuxer = function () {
    function e(t) {
      classCallCheck(this, e), this.configs = Object.assign({}, t), this.demuxing = !1, this.pat = [], this.pmt = [], this._hasVideoMeta = !1, this._hasAudioMeta = !1;
    }return createClass(e, [{ key: "init", value: function value() {
        this.on(DEMUX_EVENTS$1.DEMUX_START, this.demux.bind(this));
      } }, { key: "demux", value: function value(t) {
        if (!this.demuxing) {
          for (var i = this.inputBuffer, r = { pat: [], pmt: [] }, a = {}; i.length >= 188;) {
            for (i.length >= 1 && 71 !== i.array[0][i.offset] && this.emit(DEMUX_EVENTS$1.DEMUX_ERROR, this.TAG, new Error("Untrust sync code: " + i.array[0][i.offset] + ", try to recover;"), !1); i.length >= 1 && 71 !== i.array[0][i.offset];) {
              i.shift(1);
            }var n = i.shift(188),
                s = new Stream$1(n.buffer),
                o = {};e.read(s, o, r), o.pes ? (a[o.header.pid] || (a[o.header.pid] = []), a[o.header.pid].push(o.pes), o.pes.ES.buffer = [o.pes.ES.buffer]) : a[o.header.pid] && a[o.header.pid][a[o.header.pid].length - 1].ES.buffer.push(o.payload.stream);
          }for (var u = t, l = t, d = 0; d < Object.keys(a).length; d++) {
            for (var h = a[Object.keys(a)[d]], c = 0; c < h.length; c++) {
              h[c].id = Object.keys(a)[d], h[c].ES.buffer = e.Merge(h[c].ES.buffer), "audio" === h[c].type ? (this.pushAudioSample(h[c], u), u = {}) : "video" === h[c].type && (this.pushVideoSample(h[c], l), l = {});
            }
          }this._hasAudioMeta && this.emit(DEMUX_EVENTS$1.DEMUX_COMPLETE, "audio"), this._hasVideoMeta && this.emit(DEMUX_EVENTS$1.DEMUX_COMPLETE, "video");
        }
      } }, { key: "pushAudioSample", value: function value(t, i) {
        var r = void 0;this._tracks.audioTrack ? r = this._tracks.audioTrack : (this._tracks.audioTrack = new AudioTrack$1(), r = this._tracks.audioTrack);var a = new AudioTrackMeta$1({ audioSampleRate: t.ES.frequence, sampleRate: t.ES.frequence, channelCount: t.ES.channel, codec: "mp4a.40." + t.ES.audioObjectType, config: t.ES.audioConfig, id: 2, sampleRateIndex: t.ES.frequencyIndex });a.refSampleDuration = Math.floor(1024 / a.audioSampleRate * a.timescale);var n = e.compaireMeta(r.meta, a, !0);this._hasAudioMeta && n || (r.meta = a, this._hasAudioMeta = !0, this.emit(DEMUX_EVENTS$1.METADATA_PARSED, "audio"));var s = new Uint8Array(t.ES.buffer.buffer.slice(t.ES.buffer.position, t.ES.buffer.length)),
            o = parseInt(t.pts / 90),
            u = parseInt(t.pts / 90),
            l = new AudioTrackSample$1({ dts: o, pts: u, data: s, options: i });r.samples.push(l);
      } }, { key: "pushVideoSample", value: function value(t, i) {
        var r = Nalunit$1.getNalunits(t.ES.buffer),
            a = void 0,
            n = new VideoTrackMeta$1();this._tracks.videoTrack ? a = this._tracks.videoTrack : (this._tracks.videoTrack = new VideoTrack$1(), a = this._tracks.videoTrack);for (var s = 0, o = !1, u = !1, l = 0; l < r.length; l++) {
          var d = r[l];if (d.sps) {
            o = d, a.sps = d.body, n.chromaFormat = o.sps.chroma_format, n.codec = "avc1.";for (var h = 1; h < 4; h++) {
              var c = o.body[h].toString(16);c.length < 2 && (c = "0" + c), n.codec += c;
            }n.codecHeight = o.sps.codec_size.height, n.codecWidth = o.sps.codec_size.width, n.frameRate = o.sps.frame_rate, n.id = 1, n.level = o.sps.level_string, n.presentHeight = o.sps.present_size.height, n.presentWidth = o.sps.present_size.width, n.profile = o.sps.profile_string, n.refSampleDuration = Math.floor(n.timescale * (o.sps.frame_rate.fps_den / o.sps.frame_rate.fps_num)), n.sarRatio = o.sps.sar_ratio ? o.sps.sar_ratio : o.sps.par_ratio;
          } else d.pps ? (a.pps = d.body, u = d) : s += 4 + d.body.byteLength;
        }if (o && u) {
          n.avcc = Nalunit$1.getAvcc(o.body, u.body);var f = e.compaireMeta(a.meta, n, !0);this._hasVideoMeta && f || (i ? i.meta = Object.assign({}, n) : i = { meta: Object.assign({}, n) }, a.meta = n, this._hasVideoMeta = !0, this.emit(DEMUX_EVENTS$1.METADATA_PARSED, "video"));
        }for (var p = new Uint8Array(s), v = 0, m = !1, E = 0; E < r.length; E++) {
          var y = r[E],
              _ = y.body.byteLength;y.idr && (m = !0), y.pps || y.sps || (p.set(new Uint8Array([_ >>> 24 & 255, _ >>> 16 & 255, _ >>> 8 & 255, 255 & _]), v), v += 4, p.set(y.body, v), v += _);
        }var g = new VideoTrackSample$1({ dts: parseInt(t.dts / 90), pts: parseInt(t.pts / 90), cts: (t.pts - t.dts) / 90, originDts: t.dts, isKeyframe: m, data: p, options: i });a.samples.push(g);
      } }, { key: "destory", value: function value() {
        this.off(DEMUX_EVENTS$1.DEMUX_START, this.demux), this.configs = {}, this.demuxing = !1, this.pat = [], this.pmt = [], this._hasVideoMeta = !1, this._hasAudioMeta = !1;
      } }, { key: "inputBuffer", get: function get() {
        return this._context.getInstance(this.configs.inputbuffer);
      } }, { key: "_tracks", get: function get() {
        return this._context.getInstance("TRACKS");
      } }], [{ key: "compaireArray", value: function value(e, t, i) {
        var r = 0,
            a = 0;if ("Uint8Array" === i ? (r = e.byteLength, a = t.byteLength) : "Array" === i && (r = e.length, a = t.length), r !== a) return !1;for (var n = 0; n < r; n++) {
          if (e[n] !== t[n]) return !1;
        }return !0;
      } }, { key: "compaireMeta", value: function value(t, i, r) {
        if (!t || !i) return !1;for (var a = 0, n = Object.keys(t).length; a < n; a++) {
          var s = t[Object.keys(t)[a]],
              o = i[Object.keys(t)[a]];if ("object" !== (void 0 === s ? "undefined" : _typeof(s))) {
            if (r && "duration" !== Object.keys(t)[a] && "refSampleDuration" !== Object.keys(t)[a] && "refSampleDurationFixed" !== Object.keys(t)[a] && s !== o) return !1;
          } else if (void 0 !== s.byteLength) {
            if (void 0 === o.byteLength) return !1;if (!e.compaireArray(s, o, "Uint8Array")) return !1;
          } else if (void 0 !== s.length) {
            if (void 0 === o.length) return !1;if (!e.compaireArray(s, o, "Array")) return !1;
          } else if (!e.compaireMeta(s, o)) return !1;
        }return !0;
      } }, { key: "Merge", value: function value(e) {
        for (var t = void 0, i = 0, r = 0, a = 0; a < e.length; a++) {
          i += e[a].length - e[a].position;
        }t = new Uint8Array(i);for (var n = 0; n < e.length; n++) {
          var s = e[n];t.set(new Uint8Array(s.buffer, s.position), r), r += s.length - s.position;
        }return new Stream$1(t.buffer);
      } }, { key: "read", value: function value(t, i, r) {
        e.readHeader(t, i), e.readPayload(t, i, r), "MEDIA" !== i.header.packet || 1 !== i.header.payload || i.unknownPIDs || (i.pes = e.PES(i));
      } }, { key: "readPayload", value: function value(t, i, r) {
        var a = i.header.pid;switch (a) {case 0:
            e.PAT(t, i, r);break;case 1:
            e.CAT(t, i, r);break;case 2:
            e.TSDT(t, i, r);break;case 8191:
            break;default:
            if (r.pat.some(function (e) {
              return e.pid === a;
            })) e.PMT(t, i, r);else {
              var n = r.pmt ? r.pmt.filter(function (e) {
                return e.pid === a;
              }) : [];n.length > 0 ? e.Media(t, i, StreamType[n[0].streamType][0]) : i.unknownPIDs = !0;
            }}
      } }, { key: "readHeader", value: function value(e, t) {
        var i = {};i.sync = e.readUint8();var r = e.readUint16();i.error = r >>> 15, i.payload = r >>> 14 & 1, i.priority = r >>> 13 & 1, i.pid = 8191 & r, r = e.readUint8(), i.scrambling = r >> 6 & 3, i.adaptation = r >> 4 & 3, i.continuity = 15 & r, i.packet = 0 === i.pid ? "PAT" : "MEDIA", t.header = i;
      } }, { key: "PAT", value: function value(e, t, i) {
        var r = {},
            a = e.readUint8();e.skip(a), a = e.readUint8(), r.tabelID = a, a = e.readUint16(), r.error = a >>> 7, r.zero = a >>> 6 & 1, r.sectionLength = 4095 & a, r.streamID = e.readUint16(), r.current = 1 & e.readUint8(), r.sectionNumber = e.readUint8(), r.lastSectionNumber = e.readUint8();for (var n = (r.sectionLength - 9) / 4, s = [], o = 0; o < n; o++) {
          var u = e.readUint16(),
              l = 8191 & e.readUint16();s.push({ program: u, pid: l, type: 0 === u ? "network" : "mapPID" });
        }s.length > 0 && (i.pat = i.pat.concat(s)), r.list = s, r.program = e.readUint16(), r.pid = 8191 & e.readUint16(), t.payload = r;
      } }, { key: "PMT", value: function value(e, t, i) {
        var r = {};t.header.packet = "PMT";var a = e.readUint8();e.skip(a), a = e.readUint8(), r.tableID = a, a = e.readUint16(), r.sectionLength = 4095 & a, r.program = e.readUint16(), r.current = 1 & e.readUint8(), r.order = e.readUint8(), r.lastOrder = e.readUint8(), r.PCR_PID = 8191 & e.readUint16(), r.programLength = 4095 & e.readUint16();for (var n = (r.sectionLength - 13) / 5, s = [], o = 0; o < n; o++) {
          s.push({ streamType: e.readUint8(), pid: 8191 & e.readUint16(), es: 4095 & e.readUint16() });
        }r.list = s, this.pmt || (this.pmt = []), i.pmt = this.pmt.concat(s.map(function (e) {
          return { pid: e.pid, es: e.es, streamType: e.streamType, program: r.program };
        })), t.payload = r;
      } }, { key: "Media", value: function value(e, t, i) {
        var r = t.header,
            a = {};if (r.type = i, 3 === r.adaptation && (a.adaptationLength = e.readUint8(), a.adaptationLength > 0)) {
          var n = e.readUint8();a.discontinue = n >>> 7, a.access = n >>> 6 & 1, a.priority = n >>> 5 & 1, a.PCR = n >>> 4 & 1, a.OPCR = n >>> 3 & 1, a.splicePoint = n >>> 2 & 1, a.transportPrivate = n >>> 1 & 1, a.adaptationField = 1 & n;var s = e.position;if (1 === a.PCR && (a.programClockBase = e.readUint32() << 1, n = e.readUint16(), a.programClockBase |= n >>> 15, a.programClockExtension = 511 & n), 1 === a.OPCR && (a.originProgramClockBase = e.readUint32() << 1, n = e.readUint16(), a.originProgramClockBase += n >>> 15, a.originProgramClockExtension = 511 & n), 1 === a.splicePoint && (a.spliceCountdown = e.readUint8()), 1 === a.transportPrivate) for (var o = e.readUint8(), u = [], l = 0; l < o; l++) {
            u.push(e.readUint8());
          }if (1 === a.adaptationField) {
            var d = e.readUint8(),
                h = e.readUint8(),
                c = e.position,
                f = h >>> 6 & 1,
                p = h >>> 5 & 1;1 === h >>> 7 && (h = e.readUint16(), a.ltwValid = h >>> 15, a.ltwOffset = 61439 & h), 1 === f && (h = e.readUint24(), a.piecewiseRate = 4194303 & h), 1 === p && (h = e.readInt8(), a.spliceType = h >>> 4, a.dtsNextAU1 = h >>> 1 & 7, a.marker1 = 1 & h, h = e.readUint16(), a.dtsNextAU2 = h >>> 1, a.marker2 = 1 & h, h = e.readUint16(), a.dtsNextAU3 = h), e.skip(d - 1 - (e.position - c));
          }var v = a.adaptationLength - 1 - (e.position - s);e.skip(v);
        }a.stream = new Stream$1(e.buffer.slice(e.position)), t.payload = a;
      } }, { key: "PES", value: function value(t) {
        var i = {},
            r = t.payload.stream;if (1 !== r.readUint24()) i.ES = {}, i.ES.buffer = r;else {
          var a = r.readUint8();a >= 224 && a <= 239 && (i.type = "video"), a >= 192 && a <= 223 && (i.type = "audio");var n = r.readUint16();if (i.packetLength = n, "video" !== i.type && "audio" !== i.type) throw new Error("format is not supported");var s = r.readUint8();if (2 !== s >>> 6) throw new Error("error when parse pes header");s = r.readUint8(), i.ptsDTSFlag = s >>> 6, i.escrFlag = s >>> 5 & 1, i.esRateFlag = s >>> 4 & 1, i.dsmFlag = s >>> 3 & 1, i.additionalFlag = s >>> 2 & 1, i.crcFlag = s >>> 1 & 1, i.extensionFlag = 1 & s, i.pesHeaderLength = r.readUint8();var o = i.pesHeaderLength;if (2 === i.ptsDTSFlag) {
            var u = [];s = r.readUint8(), u.push(s >>> 1 & 7), s = r.readUint16(), u.push(s >>> 1), s = r.readUint16(), u.push(s >>> 1), i.pts = u[0] << 30 | u[1] << 15 | u[2], o -= 5, "video" === i.type && (i.dts = i.pts);
          }if (3 === i.ptsDTSFlag) {
            var l = [];s = r.readUint8(), l.push(s >>> 1 & 7), s = r.readUint16(), l.push(s >>> 1), s = r.readUint16(), l.push(s >>> 1), i.pts = l[0] << 30 | l[1] << 15 | l[2];var d = [];s = r.readUint8(), d.push(s >>> 1 & 7), s = r.readUint16(), d.push(s >>> 1), s = r.readUint16(), d.push(s >>> 1), i.dts = d[0] << 30 | d[1] << 15 | d[2], o -= 10;
          }if (1 === i.escrFlag) {
            var h = [],
                c = [];s = r.readUint8(), h.push(s >>> 3 & 7), h.push(3 & s), s = r.readUint16(), h.push(s >>> 13), h.push(3 & s), s = r.readUint16(), h.push(s >>> 13), c.push(3 & s), s = r.readUint8(), c.push(s >>> 1), i.escr = 300 * (h[0] << 30 | h[1] << 28 | h[2] << 15 | h[3] << 13 | h[4]) + (c[0] << 7 | c[1]), o -= 6;
          }if (1 === i.esRateFlag && (s = r.readUint24(), i.esRate = s >>> 1 & 4194303, o -= 3), 1 === i.dsmFlag) throw new Error("not support DSM_trick_mode");if (1 === i.additionalFlag && (s = r.readUint8(), i.additionalCopyInfo = 127 & s, o -= 1), 1 === i.crcFlag && (i.pesCRC = r.readUint16(), o -= 2), 1 === i.extensionFlag) throw new Error("not support extension");o > 0 && r.skip(o), i.ES = e.ES(r, i.type);
        }return i;
      } }, { key: "ES", value: function value(t, i) {
        var r = void 0,
            a = {};if ("video" === i) {
          if (1 !== (r = t.readUint32()) && (t.back(4), 1 !== (r = t.readUint24()))) throw new Error("h264 nal header parse failed");t.skip(2), a.buffer = t;
        } else {
          if ("audio" !== i) throw new Error("ES " + i + " is not supported");if ((r = t.readUint16()) >>> 4 != 4095) throw new Error("aac ES parse Error");var n = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350];a.id = 0 == (r >>> 3 & 1) ? "MPEG-4" : "MPEG-2", a.layer = r >>> 1 & 3, a.absent = 1 & r, r = t.readUint16(), a.audioObjectType = 1 + (r >>> 14 & 3), a.profile = a.audioObjectType - 1, a.frequencyIndex = r >>> 10 & 15, a.frequence = n[a.frequencyIndex], a.channel = r >>> 6 & 7, a.frameLength = (3 & r) << 11 | t.readUint16() >>> 5, e.getAudioConfig(a), t.skip(1), a.buffer = t;
        }return a;
      } }, { key: "TSDT", value: function value(e, t, i) {
        t.payload = {};
      } }, { key: "CAT", value: function value(e, t, i) {
        var r = {};r.tableID = e.readUint8();var a = e.readUint16();r.sectionIndicator = a >>> 7, r.sectionLength = 4095 & a, e.skip(2), a = e.readUint8(), r.version = a >>> 3, r.currentNextIndicator = 1 & a, r.sectionNumber = e.readUint8(), r.lastSectionNumber = e.readUint8();this.sectionLength;r.crc32 = e.readUint32(), t.payload = r;
      } }, { key: "getAudioConfig", value: function value(e) {
        var t = navigator.userAgent.toLowerCase(),
            i = void 0,
            r = void 0;/firefox/i.test(t) ? e.frequencyIndex >= 6 ? (e.audioObjectType = 5, i = new Array(4), r = e.frequencyIndex - 3) : (e.audioObjectType = 2, i = new Array(2), r = e.frequencyIndex) : -1 !== t.indexOf("android") ? (e.audioObjectType = 2, i = new Array(2), r = e.frequencyIndex) : (e.audioObjectType = 5, i = new Array(4), e.frequencyIndex >= 6 ? r = e.frequencyIndex - 3 : (1 === e.channel && (e.audioObjectType = 2, i = new Array(2)), r = e.frequencyIndex)), i[0] = e.audioObjectType << 3, i[0] |= (14 & e.frequencyIndex) >> 1, i[1] = (1 & e.frequencyIndex) << 7, i[1] |= e.channel << 3, 5 === e.audioObjectType && (i[1] |= (14 & r) >> 1, i[2] = (1 & r) << 7, i[2] |= 8, i[3] = 0), e.audioConfig = i;
      } }]), e;
  }(),
      Playlist = function () {
    function e(t) {
      classCallCheck(this, e), this._baseURL = "", this._list = {}, this._ts = {}, this.version = 0, this.sequence = -1, this.targetduration = 0, this.duration = 0, this.fragLength = 0, this._lastget = void 0, this._audoclear = t.autoclear || !1;
    }return createClass(e, [{ key: "push", value: function value(e, t, i) {
        this._ts[e] || (this._ts[e] = { duration: t, downloaded: !1, downloading: !1, start: this.duration, discontinue: !!i }, this._list[this.duration] = e, this.duration += t, this.fragLength += 1);
      } }, { key: "deleteFrag", value: function value(e) {
        this._ts[e] && (this._ts[e].start > this._lastget.time && (this._lastget = { duration: this._ts[e].duration, time: this._ts[e].start, downloaded: !1, downloading: !1, url: e }), delete this._list[this._ts[e].start], delete this._ts[e], this.fragLength -= 1);
      } }, { key: "pushM3U8", value: function value(e, t) {
        if (!e) throw new Error("No m3u8 data received.");if (this.version = e.version, this.targetduration = e.targetduration, e.encrypt && !this.encrypt && (this.encrypt = e.encrypt), !(e.sequence > this.sequence)) throw new Error("Old m3u8 file received, " + e.sequence);this.sequence = e.sequence;for (var i = [], r = 0; r < e.frags.length; r++) {
          var a = e.frags[r];this._ts[a.url] || (i.push(a.url), this.push(a.url, a.duration, a.discontinue));
        }if (i.length < 1) throw new Error("Can not read ts file list.");if (t) for (var n = this.getTsList(), s = 0; s < n.length; s++) {
          i.indexOf(n[s]) < 0 && this.deleteFrag(n[s]);
        }
      } }, { key: "getTsList", value: function value() {
        return Object.keys(this._ts);
      } }, { key: "downloaded", value: function value(e, t) {
        var i = this._ts[e];i && (i.downloaded = t);
      } }, { key: "downloading", value: function value(e, t) {
        var i = this._ts[e];i && (i.downloading = t);
      } }, { key: "getTsByName", value: function value(e) {
        return this._ts[e];
      } }, { key: "getTs", value: function value(e) {
        var t = Object.keys(this._list),
            i = void 0;if (void 0 === e && (e = this._lastget ? this._lastget.time + this._lastget.duration : 0), !(t.length < 1 || e >= this.duration)) {
          t.sort(function (e, t) {
            return parseFloat(e) - parseFloat(t);
          });for (var r = 0; r < t.length && e >= parseInt(t[r]); r++) {
            var a = this._list[t[r]];i = { url: a, downloaded: this._ts[a].downloaded, downloading: this._ts[a].downloading, time: parseInt(t[r]), duration: parseInt(this._ts[a].duration) }, this.autoclear && (delete this._ts[this._lastget.url], delete this._list[this._lastget.time]), this._lastget = i;
          }return i;
        }
      } }, { key: "clear", value: function value() {
        this._baseURL = "", this._list = {}, this._ts = {}, this.version = 0, this.sequence = -1, this.targetduration = 0, this.duration = 0;
      } }, { key: "clearDownloaded", value: function value() {
        for (var e = 0, t = Object.keys(this._ts).length; e < t; e++) {
          var i = this._ts[Object.keys(this._ts)[e]];i.downloaded = !1, i.downloading = !1;
        }
      } }, { key: "destroy", value: function value() {
        this._baseURL = "", this._list = {}, this._ts = {}, this.version = 0, this.sequence = -1, this.targetduration = 0, this.duration = 0, this.fragLength = 0, this._lastget = void 0, this._audoclear = !1;
      } }, { key: "list", get: function get() {
        return this._list;
      } }, { key: "baseURL", set: function set(e) {
        this.baseURL !== e && (this.clear(), this._baseURL = e);
      }, get: function get() {
        return this._baseURL;
      } }]), e;
  }(),
      DATA_TYPES = { NUMBER: 0, BOOLEAN: 1, STRING: 2, OBJECT: 3, MIX_ARRAY: 8, OBJECT_END: 9, STRICT_ARRAY: 10, DATE: 11, LONE_STRING: 12 },
      AMFParser = function () {
    function e() {
      classCallCheck(this, e), this.offset = 0, this.readOffset = this.offset;
    }return createClass(e, [{ key: "resolve", value: function value(e, t) {
        if (t < 3) throw new Error("not enough data for metainfo");var i = {},
            r = this.parseValue(e),
            a = this.parseValue(e, t - r.bodySize);return i[r.data] = a.data, this.resetStatus(), i;
      } }, { key: "resetStatus", value: function value() {
        this.offset = 0, this.readOffset = this.offset;
      } }, { key: "parseString", value: function value(e) {
        var t = new DataView(e, this.readOffset).getUint16(0, !isLe),
            i = "";i = t > 0 ? UTF8$1.decode(new Uint8Array(e, this.readOffset + 2, t)) : "";var r = t + 2;return this.readOffset += r, { data: i, bodySize: t + 2 };
      } }, { key: "parseDate", value: function value(e, t) {
        var i = new DataView(e, this.readOffset, t),
            r = i.getFloat64(0, !isLe);return r += 60 * i.getInt16(8, !isLe) * 1e3, this.readOffset += 10, { data: new Date(r), bodySize: 10 };
      } }, { key: "parseObject", value: function value(e, t) {
        var i = this.parseString(e, t),
            r = this.parseValue(e, t - i.bodySize);return { data: { name: i.data, value: r.data }, bodySize: i.bodySize + r.bodySize, isObjEnd: r.isObjEnd };
      } }, { key: "parseLongString", value: function value(e) {
        var t = new DataView(e, this.readOffset).getUint32(0, !isLe),
            i = "";return i = t > 0 ? UTF8$1.decode(new Uint8Array(e, this.readOffset + 2, t)) : "", this.readOffset += t + 4, { data: i, bodySize: t + 4 };
      } }, { key: "parseValue", value: function value(e, t) {
        var i = new ArrayBuffer();i = e instanceof ArrayBuffer ? e : e.buffer;var r = DATA_TYPES.NUMBER,
            a = DATA_TYPES.BOOLEAN,
            n = DATA_TYPES.STRING,
            s = DATA_TYPES.OBJECT,
            o = DATA_TYPES.MIX_ARRAY,
            u = DATA_TYPES.OBJECT_END,
            l = DATA_TYPES.STRICT_ARRAY,
            d = DATA_TYPES.DATE,
            h = DATA_TYPES.LONE_STRING,
            c = new DataView(i, this.readOffset, t),
            f = !1,
            p = c.getUint8(0),
            v = 1;this.readOffset += 1;var m = null;switch (p) {case r:
            m = c.getFloat64(1, !isLe), this.readOffset += 8, v += 8;break;case a:
            m = !!c.getUint8(1), this.readOffset += 1, v += 1;break;case n:
            var E = this.parseString(i);m = E.data, v += E.bodySize;break;case s:
            m = {};var y = 0;for (16777215 & c.getUint32(t - 4, !isLe) && (y = 3); v < t - 4;) {
              var _ = this.parseObject(i, t - v - y);if (_.isObjectEnd) break;m[_.data.name] = _.data.value, v += _.bodySize;
            }v <= t - 3 && 9 === (16777215 & c.getUint32(v - 1, !isLe)) && (this.readOffset += 3, v += 3);break;case o:
            m = {}, v += 4, this.readOffset += 4;var g = 0;for (9 == (16777215 & c.getUint32(t - 4, !isLe)) && (g = 3); v < t - 8;) {
              var S = this.parseObject(i, t - v - g);if (S.isObjectEnd) break;m[S.data.name] = S.data.value, v += S.bodySize;
            }v <= t - 3 && 9 === (16777215 & c.getUint32(v - 1, !isLe)) && (v += 3, this.readOffset += 3);break;case u:
            m = null, f = !0;break;case l:
            m = [];var k = c.getUint32(1, !isLe);v += 4, this.readOffset += 4;for (var T = 0; T < k; T++) {
              var A = this.parseValue(i, t - v);m.push(A.data), v += A.bodySize;
            }break;case d:
            var b = this.parseDate(i, t - 1);m = b.data, v += b.bodySize;break;case h:
            var D = this.parseLongString(i, t - 1);m = D.data, v += D.bodySize;break;default:
            v = t;}return { data: m, bodySize: v, isObjEnd: f };
      } }]), e;
  }(),
      DEMUX_EVENTS$2 = EVENTS.DEMUX_EVENTS,
      FlvDemuxer = function () {
    function e() {
      classCallCheck(this, e), this._firstFragmentLoaded = !1, this._trackNum = 0, this._hasScript = !1;
    }return createClass(e, [{ key: "init", value: function value() {
        this.on(DEMUX_EVENTS$2.DEMUX_START, this.doParseFlv.bind(this));
      } }, { key: "doParseFlv", value: function value() {
        if (this._firstFragmentLoaded) {
          if (this.loaderBuffer.length < 11) return;var e = void 0,
              t = 1e4;do {
            e = this._parseFlvTag();
          } while (e && t-- > 0);this.emit(DEMUX_EVENTS$2.DEMUX_COMPLETE);
        } else {
          if (this.loaderBuffer.length < 13) return;var i = this.loaderBuffer.shift(13);this.parseFlvHeader(i), this.doParseFlv();
        }
      } }, { key: "parseFlvHeader", value: function value(t) {
        if (e.isFlvFile(t)) {
          this._firstFragmentLoaded = !0;var i = e.getPlayType(t[4]);i.hasVideo && this.initVideoTrack(), i.hasAudio && this.initAudioTrack();
        } else this.emit(DEMUX_EVENTS$2.DEMUX_ERROR, new Error("invalid flv file")), this.doParseFlv();this.doParseFlv();
      } }, { key: "initVideoTrack", value: function value() {
        this._trackNum++;var e = new VideoTrack$1();e.meta = new VideoTrackMeta$1(), e.id = e.meta.id = this._trackNum, this.tracks.videoTrack = e;
      } }, { key: "initAudioTrack", value: function value() {
        this._trackNum++;var e = new AudioTrack$1();e.meta = new AudioTrackMeta$1(), e.id = e.meta.id = this._trackNum, this.tracks.audioTrack = e;
      } }, { key: "_parseFlvTag", value: function value() {
        if (this.loaderBuffer.length < 11) return null;var e = this._parseFlvTagHeader();return e && this._processChunk(e), e;
      } }, { key: "_parseFlvTagHeader", value: function value() {
        var e = 0,
            t = {},
            i = this.loaderBuffer.toInt(e, 1);if (e += 1, t.filtered = (32 & i) >>> 5, t.tagType = 31 & i, t.datasize = this.loaderBuffer.toInt(e, 3), e += 3, 8 !== t.tagType && 9 !== t.tagType && 11 !== t.tagType && 18 !== t.tagType || 0 !== this.loaderBuffer.toInt(8, 3)) return this.loaderBuffer && this.loaderBuffer.length > 0 && this.loaderBuffer.shift(1), this.emit(DEMUX_EVENTS$2.DEMUX_ERROR, this.TAG, new Error("tagType " + t.tagType), !1), null;if (this.loaderBuffer.length < t.datasize + 15) return null;this.loaderBuffer.shift(4);var r = this.loaderBuffer.toInt(0, 3);this.loaderBuffer.shift(3);var a = this.loaderBuffer.shift(1)[0];return a > 0 && (r += 16777216 * a), t.dts = r, this.loaderBuffer.shift(3), t;
      } }, { key: "_processChunk", value: function value(e) {
        switch (e.tagType) {case 18:
            this._parseScriptData(e);break;case 8:
            this._parseAACData(e);break;case 9:
            this._parseHevcData(e);break;case 11:
            this.loaderBuffer.shift(3);break;default:
            this.loaderBuffer.shift(1);}
      } }, { key: "_parseScriptData", value: function value(e) {
        var t = this.tracks.audioTrack,
            i = this.tracks.videoTrack,
            r = this.loaderBuffer.shift(e.datasize),
            a = new AMFParser().resolve(r, r.length),
            n = this._context.onMetaData = a ? a.onMetaData : void 0;if (this._context.mediaInfo.duration = n.duration, this._context.mediaInfo.hasVideo = n.hasVideo, this._context.mediaInfo.hsaAudio = n.hasAudio, this._datasizeValidator(e.datasize) && (this.emit(DEMUX_EVENTS$2.MEDIA_INFO), this._hasScript = !0), t && !t.hasSpecificConfig) {
          var s = t.meta;switch (n.audiosamplerate && (s.sampleRate = n.audiosamplerate), n.audiochannels && (s.channelCount = n.audiochannels), n.audiosamplerate) {case 44100:
              s.sampleRateIndex = 4;break;case 22050:
              s.sampleRateIndex = 7;break;case 11025:
              s.sampleRateIndex = 10;}
        }if (i && !i.hasSpecificConfig) {
          var o = i.meta;if ("number" == typeof n.framerate) {
            var u = Math.floor(1e3 * n.framerate);if (u > 0) {
              var l = u / 1e3;o.frameRate || (o.frameRate = {}), o.frameRate.fixed = !0, o.frameRate.fps = l, o.frameRate.fps_num = u, o.frameRate.fps_den = 1e3;
            }
          }
        }
      } }, { key: "_aacSequenceHeaderParser", value: function value(e) {
        var t = {};t.hasSpecificConfig = !0, t.objectType = e[1] >>> 3, t.sampleRateIndex = (7 & e[1]) << 1 | e[2] >>> 7, t.audiosamplerate = this._switchAudioSampleRate(t.sampleRateIndex), t.channelCount = (120 & e[2]) >>> 3, t.frameLength = (4 & e[2]) >>> 2, t.dependsOnCoreCoder = (2 & e[2]) >>> 1, t.extensionFlagIndex = 1 & e[2], t.codec = "mp4a.40." + t.objectType;var i = window.navigator.userAgent.toLowerCase(),
            r = void 0,
            a = void 0,
            n = t.sampleRateIndex;return -1 !== i.indexOf("firefox") ? t.sampleRateIndex >= 6 ? (t.objectType = 5, a = new Array(4), r = n - 3) : (t.objectType = 2, a = new Array(2), r = n) : -1 !== i.indexOf("android") ? (t.objectType = 2, a = new Array(2), r = n) : (t.objectType = 5, r = t.sampleRateIndex, a = new Array(4), t.sampleRateIndex >= 6 ? r = t.sampleRateIndex - 3 : 1 === t.channelCount && (t.objectType = 2, a = new Array(2), r = t.sampleRateIndex)), a[0] = t.objectType << 3, a[0] |= (15 & t.sampleRateIndex) >>> 1, a[1] = (15 & t.sampleRateIndex) << 7, a[1] |= (15 & t.channelCount) << 3, 5 === t.objectType && (a[1] |= (15 & r) >>> 1, a[2] = (1 & r) << 7, a[2] |= 8, a[3] = 0), t.config = a, t;
      } }, { key: "_parseAACData", value: function value(e) {
        var t = this.tracks.audioTrack;if (t) {
          var i = t.meta;i || (t.meta = new AudioTrackMeta$1(), i = t.meta);var r = this.loaderBuffer.shift(1)[0];e.data = this.loaderBuffer.shift(e.datasize - 1);var a = (240 & r) >>> 4;t.format = a, 10 !== a && this.emit(DEMUX_EVENTS$2.DEMUX_ERROR, new Error("invalid audio format: " + a)), 10 !== a || this._hasAudioSequence || (i.sampleRate = this._switchAudioSamplingFrequency(r), i.sampleRateIndex = (12 & r) >>> 2, i.frameLenth = (2 & r) >>> 1, i.channelCount = 1 & r, i.refSampleDuration = Math.floor(1024 / i.audioSampleRate * i.timescale));var n = i.audioSampleRate,
              s = i.sampleRateIndex,
              o = i.refSampleDuration;delete e.tagType;var u = this._datasizeValidator(e.datasize);if (0 === e.data[0]) {
            var l = this._aacSequenceHeaderParser(e.data);n = l.audiosamplerate || i.audioSampleRate, s = l.sampleRateIndex || i.sampleRateIndex, o = Math.floor(1024 / n * i.timescale), i.channelCount = l.channelCount, i.sampleRate = n, i.sampleRateIndex = s, i.refSampleDuration = o, i.duration = this._context.mediaInfo.duration * i.timescale, i.config = l.config;var d = this._context.mediaInfo.audio;d.codec = l.codec, d.channelCount = l.channelCount, d.sampleRate = n, d.sampleRateIndex = l.audioSampleRateIndex, this._hasScript && !this._hasAudioSequence ? this.emit(DEMUX_EVENTS$2.METADATA_PARSED, "audio") : this._hasScript && this._hasAudioSequence && this.emit(DEMUX_EVENTS$2.AUDIO_METADATA_CHANGE), this._hasAudioSequence = !0, this._metaChange = !0;
          } else this._metaChange && (e.options = { meta: t.meta }, this._metaChange = !1), e.data = e.data.slice(1, e.data.length), t.samples.push(e);u || this.emit(DEMUX_EVENTS$2.DEMUX_ERROR, this.TAG, new Error("TAG length error at " + e.datasize), !1);
        }
      } }, { key: "_parseHevcData", value: function value(e) {
        var t = this.loaderBuffer.shift(1)[0];e.frameType = (240 & t) >>> 4, e.isKeyframe = 1 === e.frameType;var i = 15 & t;if (this.tracks.videoTrack.codecID = i, e.avcPacketType = this.loaderBuffer.shift(1)[0], e.cts = this.loaderBuffer.toInt(0, 3), this.loaderBuffer.shift(3), 12 === i) {
          var r = this.loaderBuffer.shift(e.datasize - 5);if (e.data = r, 0 !== Number.parseInt(e.avcPacketType)) {
            this._datasizeValidator(e.datasize) || this.emit(DEMUX_EVENTS$2.DEMUX_ERROR, this.TAG, new Error("invalid video tag datasize: " + e.datasize), !1);var a = {},
                n = 0;for (a.cts = e.cts, a.dts = e.dts; e.data.length > n;) {
              var s = e.data.slice(Number.parseInt(n), 4 + n);a.size = s[3], a.size += 256 * s[2], a.size += 256 * s[1] * 256, a.size += 256 * s[0] * 256 * 256, n += 4, a.data = e.data.slice(Number.parseInt(n), a.size + n), n += a.size, this.tracks.videoTrack.samples.push(a), this.emit(DEMUX_EVENTS$2.METADATA_PARSED, "video");
            }
          } else 0 === Number.parseInt(e.avcPacketType) && (this._datasizeValidator(e.datasize) ? this.emit(DEMUX_EVENTS$2.METADATA_PARSED, "video") : this.emit(DEMUX_EVENTS$2.DEMUX_ERROR, this.TAG, new Error("invalid video tag datasize: " + e.datasize), !1));
        } else if (7 === i) {
          var o = this.loaderBuffer.shift(e.datasize - 5);if (0 === o[4] && 0 === o[5] && 0 === o[6] && 1 === o[7]) {
            for (var u = 0, l = 0; l < 4; l++) {
              u = 256 * u + o[l];
            }u -= 4, (o = o.slice(4, o.length))[3] = u % 256, u = (u - o[3]) / 256, o[2] = u % 256, u = (u - o[2]) / 256, o[1] = u % 256, o[0] = (u - o[1]) / 256;
          }if (e.data = o, 0 === e.avcPacketType) this._avcSequenceHeaderParser(e.data), this._datasizeValidator(e.datasize) && (this._hasScript && !this._hasVideoSequence ? this.emit(DEMUX_EVENTS$2.METADATA_PARSED, "video") : this._hasScript && this._hasVideoSequence && this.emit(DEMUX_EVENTS$2.VIDEO_METADATA_CHANGE), this._hasVideoSequence = !0), this._metaChange = !0;else {
            if (!this._datasizeValidator(e.datasize)) return void this.emit(DEMUX_EVENTS$2.DEMUX_ERROR, this.TAG, new Error("invalid video tag datasize: " + e.datasize), !1);this._metaChange && (e.options = { meta: Object.assign({}, this.tracks.videoTrack.meta) }, this._metaChange = !1), this.tracks.videoTrack.samples.push(e);
          }
        } else this.emit(DEMUX_EVENTS$2.DEMUX_ERROR, this.TAG, new Error("video codeid is " + i), !1), e.data = this.loaderBuffer.shift(e.datasize - 1), this._datasizeValidator(e.datasize) || this.emit(DEMUX_EVENTS$2.DEMUX_ERROR, this.TAG, new Error("invalid video tag datasize: " + e.datasize), !1), this.tracks.videoTrack.samples.push(e), this.emit(DEMUX_EVENTS$2.DEMUX_COMPLETE);delete e.tagType;
      } }, { key: "_avcSequenceHeaderParser", value: function value(e) {
        var t = this.tracks.videoTrack;if (t) {
          var i = 0;t.meta || (t.meta = new VideoTrackMeta$1());var r = t.meta;r.configurationVersion = e[0], r.avcProfileIndication = e[1], r.profileCompatibility = e[2], r.avcLevelIndication = e[3] / 10, r.nalUnitLength = 1 + (3 & e[4]);var a = 31 & e[5];i = 6;for (var n = {}, s = 0; s < a; s++) {
            var o = 255 * e[i] + e[i + 1];i += 2;for (var u = new Uint8Array(o), l = 0; l < o; l++) {
              u[l] = e[i + l];
            }for (var d = "avc1.", h = 1; h < 4; h++) {
              var c = u[h].toString(16);c.length < 2 && (c = "0" + c), d += c;
            }r.codec = d, i += o, this.tracks.videoTrack.meta.sps = u, n = SpsParser.parseSPS(u);
          }var f = e[i];i++;for (var p = 0; p < f; p++) {
            var v = 255 * e[i] + e[i + 1];i += 2;for (var m = new Uint8Array(v), E = 0; E < v; E++) {
              m[E] = e[i + E];
            }i += v, this.tracks.videoTrack.meta.pps = m;
          }Object.assign(r, SpsParser.toVideoMeta(n));var y = this._context.mediaInfo.video;y.codec = r.codec, y.profile = r.profile, y.level = r.level, y.chromaFormat = r.chromaFormat, y.frameRate = r.frameRate, y.parRatio = r.parRatio, y.width = y.width === r.presentWidth ? y.width : r.presentWidth, y.height = y.height === r.presentHeight ? y.width : r.presentHeight, r.duration = this._context.mediaInfo.duration * r.timescale, r.avcc = new Uint8Array(e.length), r.avcc.set(e), t.meta = r;
        }
      } }, { key: "_switchAudioSampleRate", value: function value(e) {
        return [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350][e];
      } }, { key: "_switchAudioSamplingFrequency", value: function value(e) {
        return [5500, 11025, 22050, 44100, 48e3][(12 & e) >>> 2];
      } }, { key: "_switchAudioChannel", value: function value(e) {
        return [1, 2][1 & e];
      } }, { key: "_datasizeValidator", value: function value(e) {
        var t = this.loaderBuffer.toInt(0, 4);return this.loaderBuffer.shift(4), t === e + 11;
      } }, { key: "loaderBuffer", get: function get() {
        var e = this._context.getInstance("LOADER_BUFFER");if (e) return e;this.emit(DEMUX_EVENTS$2.DEMUX_ERROR, new Error("找不到 loaderBuffer 实例"));
      } }, { key: "tracks", get: function get() {
        return this._context.getInstance("TRACKS");
      } }, { key: "logger", get: function get() {
        return this._context.getInstance("LOGGER");
      } }], [{ key: "isFlvFile", value: function value(e) {
        return !(70 !== e[0] || 76 !== e[1] || 86 !== e[2] || 1 !== e[3]);
      } }, { key: "getPlayType", value: function value(e) {
        var t = { hasVideo: !1, hasAudio: !1 };return !0 & e && (t.hasVideo = !0), !0 & e && (t.hasAudio = !0), t;
      } }]), e;
  }(),
      FlvDemuxer$1 = FlvDemuxer,
      classCallCheck$1 = function classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
  },
      createClass$1 = function () {
    function e(e, t) {
      for (var i = 0; i < t.length; i++) {
        var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }return function (t, i, r) {
      return i && e(t.prototype, i), r && e(t, r), t;
    };
  }(),
      get$1 = function e(t, i, r) {
    null === t && (t = Function.prototype);var a = Object.getOwnPropertyDescriptor(t, i);if (void 0 === a) {
      var n = Object.getPrototypeOf(t);return null === n ? void 0 : e(n, i, r);
    }if ("value" in a) return a.value;var s = a.get;if (void 0 !== s) return s.call(r);
  },
      inherits$1 = function inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : _typeof(t)));e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
  },
      possibleConstructorReturn$1 = function possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && "function" != typeof t ? e : t;
  },
      REMUX_EVENTS$3 = EVENTS.REMUX_EVENTS,
      DEMUX_EVENTS$3 = EVENTS.DEMUX_EVENTS,
      LOADER_EVENTS$3 = EVENTS.LOADER_EVENTS,
      MSE_EVENTS$1 = EVENTS.MSE_EVENTS,
      Tag = "FLVController",
      Logger = function () {
    function e() {
      classCallCheck$1(this, e);
    }return createClass$1(e, [{ key: "warn", value: function value() {} }]), e;
  }(),
      FLV_ERROR = "FLV_ERROR",
      FlvController = function () {
    function e(t) {
      classCallCheck$1(this, e), this.TAG = Tag, this._player = t, this.state = { initSegmentArrived: !1, randomAccessPoints: [] }, this.bufferClearTimer = null;
    }return createClass$1(e, [{ key: "init", value: function value() {
        this._context.registry("FETCH_LOADER", FetchLoader$1), this._context.registry("LOADER_BUFFER", XgBuffer$1), this._context.registry("FLV_DEMUXER", FlvDemuxer$1), this._context.registry("TRACKS", Tracks$1), this._context.registry("MP4_REMUXER", Mp4Remuxer.Mp4Remuxer), this._context.registry("PRE_SOURCE_BUFFER", PreSource$1), !1 !== this._player.config.compatibility && this._context.registry("COMPATIBILITY", Compatibility$1), this._context.registry("LOGGER", Logger), this.mse = this._context.registry("MSE", Mse)({ container: this._player.video }), this._handleTimeUpdate = this._handleTimeUpdate.bind(this), this.initListeners();
      } }, { key: "initListeners", value: function value() {
        this.on(LOADER_EVENTS$3.LOADER_DATALOADED, this._handleLoaderDataLoaded.bind(this)), this.on(LOADER_EVENTS$3.LOADER_ERROR, this._handleNetworkError.bind(this)), this.on(DEMUX_EVENTS$3.MEDIA_INFO, this._handleMediaInfo.bind(this)), this.on(DEMUX_EVENTS$3.METADATA_PARSED, this._handleMetadataParsed.bind(this)), this.on(DEMUX_EVENTS$3.DEMUX_COMPLETE, this._handleDemuxComplete.bind(this)), this.on(DEMUX_EVENTS$3.DEMUX_ERROR, this._handleDemuxError.bind(this)), this.on(REMUX_EVENTS$3.INIT_SEGMENT, this._handleAppendInitSegment.bind(this)), this.on(REMUX_EVENTS$3.MEDIA_SEGMENT, this._handleMediaSegment.bind(this)), this.on(REMUX_EVENTS$3.RANDOM_ACCESS_POINT, this._handleAddRAP.bind(this)), this.on(MSE_EVENTS$1.SOURCE_UPDATE_END, this._handleSourceUpdateEnd.bind(this)), this._player.on("timeupdate", this._handleTimeUpdate);
      } }, { key: "_handleMediaInfo", value: function value() {
        this._context.mediaInfo || this.emit(DEMUX_EVENTS$3.DEMUX_ERROR, new Error("failed to get mediainfo"));
      } }, { key: "_handleLoaderDataLoaded", value: function value() {
        this.emitTo("FLV_DEMUXER", DEMUX_EVENTS$3.DEMUX_START);
      } }, { key: "_handleMetadataParsed", value: function value(e) {
        this.emit(REMUX_EVENTS$3.REMUX_METADATA, e);
      } }, { key: "_handleDemuxComplete", value: function value() {
        this.emit(REMUX_EVENTS$3.REMUX_MEDIA);
      } }, { key: "_handleAppendInitSegment", value: function value() {
        this.state.initSegmentArrived = !0, this.mse.addSourceBuffers();
      } }, { key: "_handleMediaSegment", value: function value() {
        this.mse.addSourceBuffers(), this.mse.doAppend();
      } }, { key: "_handleSourceUpdateEnd", value: function value() {
        var e = this._player.currentTime,
            t = this._player.video,
            i = this._player.config.preloadTime || 5,
            r = t.buffered.length;if (0 !== r) {
          var a = t.buffered.end(r - 1);a - e > 2 * i && (this._player.currentTime = a - i), this.mse.doAppend();
        }
      } }, { key: "_handleTimeUpdate", value: function value() {
        var e = this,
            t = this._player.currentTime,
            i = this._player.video,
            r = i.buffered;if (r && r.length) {
          var a = [0, 0],
              n = i.currentTime;if (r) for (var s = 0, o = r.length; s < o && (a[0] = r.start(s), a[1] = r.end(s), !(a[0] <= n && n <= a[1])); s++) {}var u = a[0],
              l = a[1];if (n > l || n < u) return void (i.currentTime = u);if (t - u > 10 || r.length > 1) {
            if (this.bufferClearTimer || !this.state.randomAccessPoints.length) return;for (var d = 1 / 0, h = 0; h < this.state.randomAccessPoints.length; h++) {
              var c = Math.ceil(this.state.randomAccessPoints[h] / 1e3);if (c > t - 10) break;d = c;
            }this.mse.remove(Math.max(Math.min(d, t - 10, l - 10), .1), 0), this.bufferClearTimer = setTimeout(function () {
              e.bufferClearTimer = null;
            }, 5e3);
          }
        }
      } }, { key: "_handleNetworkError", value: function value(e, t) {
        this._player.emit("error", new Player.Errors("network", this._player.config.url)), this._onError(LOADER_EVENTS$3.LOADER_ERROR, e, t, !0);
      } }, { key: "_handleDemuxError", value: function value(e, t, i) {
        void 0 === i && (i = !1), this._player.emit("error", new Player.Errors("parse", this._player.config.url)), this._onError(DEMUX_EVENTS$3.DEMUX_ERROR, e, t, i);
      } }, { key: "_handleAddRAP", value: function value(e) {
        this.state.randomAccessPoints && this.state.randomAccessPoints.push(e);
      } }, { key: "_onError", value: function value(e, t, i, r) {
        var a = { errorType: e, errorDetails: "[" + t + "]: " + i.message, errorFatal: r || !1 };this._player.emit(FLV_ERROR, a);
      } }, { key: "seek", value: function value() {
        this.state.initSegmentArrived || this.loadData();
      } }, { key: "loadData", value: function value() {
        this.emit(LOADER_EVENTS$3.LADER_START, this._player.config.url);
      } }, { key: "pause", value: function value() {
        var e = this._context.getInstance("FETCH_LOADER");e && e.cancel();
      } }, { key: "destroy", value: function value() {
        this._player.off("timeupdate", this._handleTimeUpdate), this._player = null, this.mse = null, this.state.randomAccessPoints = [];
      } }]), e;
  }(),
      flvAllowedEvents = EVENTS.FlvAllowedEvents,
      FlvPlayer = function (e) {
    function t(e) {
      classCallCheck$1(this, t);var i = possibleConstructorReturn$1(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));return i.context = new Context$1(flvAllowedEvents), i.initEvents(), i.loaderCompleteTimer = null, i;
    }return inherits$1(t, e), createClass$1(t, [{ key: "start", value: function value() {
        this.initFlv(), this.context.init(), get$1(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "start", this).call(this, this.flv.mse.url);
      } }, { key: "initFlvEvents", value: function value(e) {
        var t = this,
            i = this;e.once(EVENTS.REMUX_EVENTS.INIT_SEGMENT, function () {
          if (Player.util.addClass(i.root, "xgplayer-is-live"), !Player.util.findDom(t.root, "xg-live")) {
            var e = Player.util.createDom("xg-live", "正在直播", {}, "xgplayer-live");i.controls.appendChild(e);
          }
        }), e.once(EVENTS.LOADER_EVENTS.LOADER_COMPLETE, function () {
          i.paused ? i.emit("ended") : t.loaderCompleteTimer = setInterval(function () {
            var e = i.getBufferedRange()[1];Math.abs(i.currentTime - e) < .5 && (i.emit("ended"), window.clearInterval(t.loaderCompleteTimer));
          }, 200);
        });
      } }, { key: "initEvents", value: function value() {
        var e = this;this.on("timeupdate", function () {
          e.loadData();
        }), this.on("seeking", function () {
          var t = e.currentTime,
              i = e.getBufferedRange();(t > i[1] || t < i[0]) && e.flv.seek(e.currentTime);
        });
      } }, { key: "initFlv", value: function value() {
        var e = this.context.registry("FLV_CONTROLLER", FlvController)(this);this.initFlvEvents(e), this.flv = e;
      } }, { key: "play", value: function value() {
        var e = this;return this._hasStart ? this._destroy().then(function () {
          e.context = new Context$1(flvAllowedEvents);var i = e.context.registry("FLV_CONTROLLER", FlvController)(e);return e.initFlvEvents(i), e.flv = i, e.context.init(), get$1(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "start", e).call(e, i.mse.url), get$1(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "play", e).call(e);
        }) : get$1(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "play", this).call(this);
      } }, { key: "pause", value: function value() {
        get$1(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "pause", this).call(this), this.flv && this.flv.pause();
      } }, { key: "loadData", value: function value() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.currentTime;this.flv && this.flv.seek(e);
      } }, { key: "destroy", value: function value() {
        var e = this;this._destroy().then(function () {
          get$1(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", e).call(e);
        });
      } }, { key: "_destroy", value: function value() {
        var e = this;return this.flv.mse.destroy().then(function () {
          e.context.destroy(), e.flv = null, e.context = null, e.loaderCompleteTimer && window.clearInterval(e.loaderCompleteTimer);
        });
      } }, { key: "src", get: function get() {
        return this.currentSrc;
      }, set: function set(e) {
        var t = this;this.player.config.url = e, this.paused ? this.start(e) : (this.pause(), this.once("pause", function () {
          t.start(e);
        }), this.once("canplay", function () {
          t.play();
        })), this.once("canplay", function () {
          t.currentTime = 0;
        });
      } }]), t;
  }(Player);

  function EventHandlers$1() {}function EventEmitter$1() {
    EventEmitter$1.init.call(this);
  }function $getMaxListeners$1(e) {
    return void 0 === e._maxListeners ? EventEmitter$1.defaultMaxListeners : e._maxListeners;
  }function emitNone$1(e, t, i) {
    if (t) e.call(i);else for (var r = e.length, a = arrayClone$1(e, r), n = 0; n < r; ++n) {
      a[n].call(i);
    }
  }function emitOne$1(e, t, i, r) {
    if (t) e.call(i, r);else for (var a = e.length, n = arrayClone$1(e, a), s = 0; s < a; ++s) {
      n[s].call(i, r);
    }
  }function emitTwo$1(e, t, i, r, a) {
    if (t) e.call(i, r, a);else for (var n = e.length, s = arrayClone$1(e, n), o = 0; o < n; ++o) {
      s[o].call(i, r, a);
    }
  }function emitThree$1(e, t, i, r, a, n) {
    if (t) e.call(i, r, a, n);else for (var s = e.length, o = arrayClone$1(e, s), l = 0; l < s; ++l) {
      o[l].call(i, r, a, n);
    }
  }function emitMany$1(e, t, i, r) {
    if (t) e.apply(i, r);else for (var a = e.length, n = arrayClone$1(e, a), s = 0; s < a; ++s) {
      n[s].apply(i, r);
    }
  }function _addListener$1(e, t, i, r) {
    var a, n, s;if ("function" != typeof i) throw new TypeError('"listener" argument must be a function');if (n = e._events, n ? (n.newListener && (e.emit("newListener", t, i.listener ? i.listener : i), n = e._events), s = n[t]) : (n = e._events = new EventHandlers$1(), e._eventsCount = 0), s) {
      if ("function" == typeof s ? s = n[t] = r ? [i, s] : [s, i] : r ? s.unshift(i) : s.push(i), !s.warned && (a = $getMaxListeners$1(e)) && a > 0 && s.length > a) {
        s.warned = !0;var o = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + t + " listeners added. Use emitter.setMaxListeners() to increase limit");o.name = "MaxListenersExceededWarning", o.emitter = e, o.type = t, o.count = s.length, emitWarning$1(o);
      }
    } else s = n[t] = i, ++e._eventsCount;return e;
  }function emitWarning$1(e) {
    "function" == typeof console.warn ? console.warn(e) : console.log(e);
  }function _onceWrap$1(e, t, i) {
    function r() {
      e.removeListener(t, r), a || (a = !0, i.apply(e, arguments));
    }var a = !1;return r.listener = i, r;
  }function listenerCount$1(e) {
    var t = this._events;if (t) {
      var i = t[e];if ("function" == typeof i) return 1;if (i) return i.length;
    }return 0;
  }function spliceOne$1(e, t) {
    for (var i = t, r = i + 1, a = e.length; r < a; i += 1, r += 1) {
      e[i] = e[r];
    }e.pop();
  }function arrayClone$1(e, t) {
    for (var i = new Array(t); t--;) {
      i[t] = e[t];
    }return i;
  }function unwrapListeners$1(e) {
    for (var t = new Array(e.length), i = 0; i < t.length; ++i) {
      t[i] = e[i].listener || e[i];
    }return t;
  }function unwrapExports$1(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
  }function createCommonjsModule$1(e, t) {
    return t = { exports: {} }, e(t, t.exports), t.exports;
  }var isObjectFilled$1 = function isObjectFilled(e) {
    for (var t in e) {
      if (e.hasOwnProperty(t) && null === e[t]) return !1;
    }return !0;
  },
      MediaInfo$1 = function () {
    function e() {
      classCallCheck(this, e), this.mimeType = null, this.duration = null, this.hasVideo = null, this.video = { codec: null, width: null, height: null, profile: null, level: null, frameRate: { fixed: !0, fps: 25, fps_num: 25e3, fps_den: 1e3 }, chromaFormat: null, parRatio: { width: 1, height: 1 } }, this.hasAudio = null, this.audio = { codec: null, sampleRate: null, sampleRateIndex: null, channelCount: null };
    }return createClass(e, [{ key: "isComplete", value: function value() {
        return e.isBaseInfoReady(this) && e.isVideoReady(this) && e.isAudioReady(this);
      } }], [{ key: "isBaseInfoReady", value: function value(e) {
        return isObjectFilled$1(e);
      } }, { key: "isVideoReady", value: function value(e) {
        return !e.hasVideo || isObjectFilled$1(e.video);
      } }, { key: "isAudioReady", value: function value(e) {
        return !e.hasAudio || isObjectFilled$1(e.video);
      } }]), e;
  }(),
      domain$1;EventHandlers$1.prototype = Object.create(null), EventEmitter$1.EventEmitter = EventEmitter$1, EventEmitter$1.usingDomains = !1, EventEmitter$1.prototype.domain = void 0, EventEmitter$1.prototype._events = void 0, EventEmitter$1.prototype._maxListeners = void 0, EventEmitter$1.defaultMaxListeners = 10, EventEmitter$1.init = function () {
    this.domain = null, EventEmitter$1.usingDomains && domain$1.active && domain$1.Domain, this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = new EventHandlers$1(), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, EventEmitter$1.prototype.setMaxListeners = function (e) {
    if ("number" != typeof e || e < 0 || isNaN(e)) throw new TypeError('"n" argument must be a positive number');return this._maxListeners = e, this;
  }, EventEmitter$1.prototype.getMaxListeners = function () {
    return $getMaxListeners$1(this);
  }, EventEmitter$1.prototype.emit = function (e) {
    var t,
        i,
        r,
        a,
        n,
        s,
        o,
        l = "error" === e;if (s = this._events) l = l && null == s.error;else if (!l) return !1;if (o = this.domain, l) {
      if (t = arguments[1], !o) {
        if (t instanceof Error) throw t;var u = new Error('Uncaught, unspecified "error" event. (' + t + ")");throw u.context = t, u;
      }return t || (t = new Error('Uncaught, unspecified "error" event')), t.domainEmitter = this, t.domain = o, t.domainThrown = !1, o.emit("error", t), !1;
    }if (!(i = s[e])) return !1;var h = "function" == typeof i;switch (r = arguments.length) {case 1:
        emitNone$1(i, h, this);break;case 2:
        emitOne$1(i, h, this, arguments[1]);break;case 3:
        emitTwo$1(i, h, this, arguments[1], arguments[2]);break;case 4:
        emitThree$1(i, h, this, arguments[1], arguments[2], arguments[3]);break;default:
        for (a = new Array(r - 1), n = 1; n < r; n++) {
          a[n - 1] = arguments[n];
        }emitMany$1(i, h, this, a);}return !0;
  }, EventEmitter$1.prototype.addListener = function (e, t) {
    return _addListener$1(this, e, t, !1);
  }, EventEmitter$1.prototype.on = EventEmitter$1.prototype.addListener, EventEmitter$1.prototype.prependListener = function (e, t) {
    return _addListener$1(this, e, t, !0);
  }, EventEmitter$1.prototype.once = function (e, t) {
    if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');return this.on(e, _onceWrap$1(this, e, t)), this;
  }, EventEmitter$1.prototype.prependOnceListener = function (e, t) {
    if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');return this.prependListener(e, _onceWrap$1(this, e, t)), this;
  }, EventEmitter$1.prototype.removeListener = function (e, t) {
    var i, r, a, n, s;if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');if (!(r = this._events)) return this;if (!(i = r[e])) return this;if (i === t || i.listener && i.listener === t) 0 == --this._eventsCount ? this._events = new EventHandlers$1() : (delete r[e], r.removeListener && this.emit("removeListener", e, i.listener || t));else if ("function" != typeof i) {
      for (a = -1, n = i.length; n-- > 0;) {
        if (i[n] === t || i[n].listener && i[n].listener === t) {
          s = i[n].listener, a = n;break;
        }
      }if (a < 0) return this;if (1 === i.length) {
        if (i[0] = void 0, 0 == --this._eventsCount) return this._events = new EventHandlers$1(), this;delete r[e];
      } else spliceOne$1(i, a);r.removeListener && this.emit("removeListener", e, s || t);
    }return this;
  }, EventEmitter$1.prototype.removeAllListeners = function (e) {
    var t, i;if (!(i = this._events)) return this;if (!i.removeListener) return 0 === arguments.length ? (this._events = new EventHandlers$1(), this._eventsCount = 0) : i[e] && (0 == --this._eventsCount ? this._events = new EventHandlers$1() : delete i[e]), this;if (0 === arguments.length) {
      for (var r, a = Object.keys(i), n = 0; n < a.length; ++n) {
        "removeListener" !== (r = a[n]) && this.removeAllListeners(r);
      }return this.removeAllListeners("removeListener"), this._events = new EventHandlers$1(), this._eventsCount = 0, this;
    }if ("function" == typeof (t = i[e])) this.removeListener(e, t);else if (t) do {
      this.removeListener(e, t[t.length - 1]);
    } while (t[0]);return this;
  }, EventEmitter$1.prototype.listeners = function (e) {
    var t,
        i = this._events;return i && (t = i[e]) ? "function" == typeof t ? [t.listener || t] : unwrapListeners$1(t) : [];
  }, EventEmitter$1.listenerCount = function (e, t) {
    return "function" == typeof e.listenerCount ? e.listenerCount(t) : listenerCount$1.call(e, t);
  }, EventEmitter$1.prototype.listenerCount = listenerCount$1, EventEmitter$1.prototype.eventNames = function () {
    return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
  };var DIRECT_EMIT_FLAG$1 = "__TO__",
      Context$2 = function () {
    function e() {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];classCallCheck(this, e), this._emitter = new EventEmitter$1(), this._instanceMap = {}, this._clsMap = {}, this._inited = !1, this.mediaInfo = new MediaInfo$1(), this.allowedEvents = t, this._hooks = {}, this._emitCounter = {};
    }return createClass(e, [{ key: "getInstance", value: function value(e) {
        var t = this._instanceMap[e];return t || null;
      } }, { key: "initInstance", value: function value(e) {
        if (this._clsMap[e]) {
          for (var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) {
            i[r - 1] = arguments[r];
          }var a = new (Function.prototype.bind.apply(this._clsMap[e], [null].concat(i)))();return this._instanceMap[e] = a, a.init && a.init(), a;
        }throw new Error(e + "未在context中注册");
      } }, { key: "init", value: function value(e) {
        if (!this._inited) {
          for (var t in this._clsMap) {
            this._clsMap.hasOwnProperty(t) && !this._instanceMap[t] && this.initInstance(t, e);
          }this._inited = !0;
        }
      } }, { key: "registry", value: function value(e, t) {
        var i = this,
            r = this._emitter,
            a = this._isMessageNameValid.bind(this),
            n = this,
            s = function (t) {
          function i(t, r, a) {
            classCallCheck(this, i);var s = possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, t, r, a));return s.listeners = {}, s.onceListeners = {}, s.TAG = e, s._context = n, s;
          }return inherits(i, t), createClass(i, [{ key: "on", value: function value(t, i) {
              return a(t), this.listeners[t] ? this.listeners[t].push(i) : this.listeners[t] = [i], r.on("" + t + DIRECT_EMIT_FLAG$1 + e, i), r.on(t, i);
            } }, { key: "before", value: function value(e, t) {
              a(e), n._hooks[e] ? n._hooks[e].push(t) : n._hooks[e] = [t];
            } }, { key: "once", value: function value(t, i) {
              return a(t), this.onceListeners[t] ? this.onceListeners[t].push(i) : this.onceListeners[t] = [i], r.once("" + t + DIRECT_EMIT_FLAG$1 + e, i), r.once(t, i);
            } }, { key: "emit", value: function value(e) {
              if (a(e), n._emitCounter[e]) {
                if (n._emitCounter[e] += 1, n._emitCounter[e] % 1e3 == 0) {
                  window.console && (window.console.warn("invoke: ", e), window.localStorage.setItem("xgplayer_invoke_" + e, n._emitCounter[e]));
                }
              } else n._emitCounter[e] = 1;var t = n._hooks ? n._hooks[e] : null;if (t) for (var i = 0, s = t.length; i < s; i++) {
                (0, t[i])();
              }for (var o = arguments.length, l = Array(o > 1 ? o - 1 : 0), u = 1; u < o; u++) {
                l[u - 1] = arguments[u];
              }return r.emit.apply(r, [e].concat(l));
            } }, { key: "emitTo", value: function value(e, t) {
              a(t);for (var i = arguments.length, n = Array(i > 2 ? i - 2 : 0), s = 2; s < i; s++) {
                n[s - 2] = arguments[s];
              }return r.emit.apply(r, ["" + t + DIRECT_EMIT_FLAG$1 + e].concat(n));
            } }, { key: "off", value: function value(e, t) {
              return a(e), r.off(e, t);
            } }, { key: "removeListeners", value: function value() {
              var t = Object.prototype.hasOwnProperty.bind(this.listeners);for (var i in this.listeners) {
                if (t(i)) for (var a = this.listeners[i] || [], n = 0; n < a.length; n++) {
                  var s = a[n];r.off(i, s), r.off("" + i + DIRECT_EMIT_FLAG$1 + e, s);
                }
              }for (var o in this.onceListeners) {
                if (t(o)) for (var l = this.onceListeners[o] || [], u = 0; u < l.length; u++) {
                  var h = l[u];r.off(o, h), r.off("" + o + DIRECT_EMIT_FLAG$1 + e, h);
                }
              }
            } }, { key: "destroy", value: function value() {
              if (this.removeListeners(), this.listeners = {}, delete n._instanceMap[e], get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "destroy", this)) return get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "destroy", this).call(this);
            } }]), i;
        }(t);return this._clsMap[e] = s, function () {
          for (var t = arguments.length, r = Array(t), a = 0; a < t; a++) {
            r[a] = arguments[a];
          }return i.initInstance.apply(i, [e].concat(r));
        };
      } }, { key: "destroyInstances", value: function value() {
        var e = this;Object.keys(this._instanceMap).forEach(function (t) {
          e._instanceMap[t].destroy && e._instanceMap[t].destroy();
        });
      } }, { key: "destroy", value: function value() {
        this._emitter = null, this.allowedEvents = [], this._clsMap = null, this._context = null, this._hooks = null, this._emitCounter = {}, this.destroyInstances();
      } }, { key: "_isMessageNameValid", value: function value(e) {
        if (!this.allowedEvents.indexOf(e) < 0) throw new Error("unregistered message name: " + e);
      } }]), e;
  }(),
      LOADER_EVENTS$4 = { LADER_START: "LOADER_START", LOADER_DATALOADED: "LOADER_DATALOADED", LOADER_COMPLETE: "LOADER_COMPLETE", LOADER_ERROR: "LOADER_ERROR" },
      DEMUX_EVENTS$4 = { DEMUX_START: "DEMUX_START", DEMUX_COMPLETE: "DEMUX_COMPLETE", DEMUX_ERROR: "DEMUX_ERROR", METADATA_PARSED: "METADATA_PARSED", VIDEO_METADATA_CHANGE: "VIDEO_METADATA_CHANGE", AUDIO_METADATA_CHANGE: "AUDIO_METADATA_CHANGE", MEDIA_INFO: "MEDIA_INFO" },
      REMUX_EVENTS$4 = { REMUX_METADATA: "REMUX_METADATA", REMUX_MEDIA: "REMUX_MEDIA", MEDIA_SEGMENT: "MEDIA_SEGMENT", REMUX_ERROR: "REMUX_ERROR", INIT_SEGMENT: "INIT_SEGMENT", DETECT_CHANGE_STREAM: "DETECT_CHANGE_STREAM", RANDOM_ACCESS_POINT: "RANDOM_ACCESS_POINT" },
      MSE_EVENTS$2 = { SOURCE_UPDATE_END: "SOURCE_UPDATE_END" },
      HLS_EVENTS$1 = { RETRY_TIME_EXCEEDED: "RETRY_TIME_EXCEEDED" },
      CRYTO_EVENTS$2 = { START_DECRYPT: "START_DECRYPT", DECRYPTED: "DECRYPTED" },
      ALLEVENTS$1 = Object.assign({}, LOADER_EVENTS$4, DEMUX_EVENTS$4, REMUX_EVENTS$4, MSE_EVENTS$2, HLS_EVENTS$1),
      FlvAllowedEvents$1 = [],
      HlsAllowedEvents$1 = [];for (var key$1 in ALLEVENTS$1) {
    ALLEVENTS$1.hasOwnProperty(key$1) && FlvAllowedEvents$1.push(ALLEVENTS$1[key$1]);
  }for (var _key$1 in ALLEVENTS$1) {
    ALLEVENTS$1.hasOwnProperty(_key$1) && HlsAllowedEvents$1.push(ALLEVENTS$1[_key$1]);
  }var _EVENTS$1 = { ALLEVENTS: ALLEVENTS$1, HLS_EVENTS: HLS_EVENTS$1, REMUX_EVENTS: REMUX_EVENTS$4, DEMUX_EVENTS: DEMUX_EVENTS$4, MSE_EVENTS: MSE_EVENTS$2, LOADER_EVENTS: LOADER_EVENTS$4, FlvAllowedEvents: FlvAllowedEvents$1, HlsAllowedEvents: HlsAllowedEvents$1, CRYTO_EVENTS: CRYTO_EVENTS$2 },
      le$2 = function () {
    var e = new ArrayBuffer(2);return new DataView(e).setInt16(0, 256, !0), 256 === new Int16Array(e)[0];
  }(),
      sniffer$2 = { get device() {
      var e = sniffer$2.os;return e.isPc ? "pc" : e.isTablet ? "tablet" : "mobile";
    }, get browser() {
      var e = navigator.userAgent.toLowerCase(),
          t = { ie: /rv:([\d.]+)\) like gecko/, firfox: /firefox\/([\d.]+)/, chrome: /chrome\/([\d.]+)/, opera: /opera.([\d.]+)/, safari: /version\/([\d.]+).*safari/ };return [].concat(Object.keys(t).filter(function (i) {
        return t[i].test(e);
      }))[0];
    }, get os() {
      var e = navigator.userAgent,
          t = /(?:Windows Phone)/.test(e),
          i = /(?:SymbianOS)/.test(e) || t,
          r = /(?:Android)/.test(e),
          a = /(?:Firefox)/.test(e),
          n = /(?:iPad|PlayBook)/.test(e) || r && !/(?:Mobile)/.test(e) || a && /(?:Tablet)/.test(e),
          s = /(?:iPhone)/.test(e) && !n;return { isTablet: n, isPhone: s, isAndroid: r, isPc: !s && !r && !i, isSymbian: i, isWindowsPhone: t, isFireFox: a };
    }, get isLe() {
      return le$2;
    } },
      le$1$1 = function () {
    var e = new ArrayBuffer(2);return new DataView(e).setInt16(0, 256, !0), 256 === new Int16Array(e)[0];
  }(),
      UTF8$2 = function () {
    function e() {
      classCallCheck(this, e);
    }return createClass(e, null, [{ key: "decode", value: function value(t) {
        for (var i = [], r = t, a = 0, n = t.length; a < n;) {
          if (r[a] < 128) i.push(String.fromCharCode(r[a])), ++a;else {
            if (r[a] < 192) ;else if (r[a] < 224) {
              if (e._checkContinuation(r, a, 1)) {
                var s = (31 & r[a]) << 6 | 63 & r[a + 1];if (s >= 128) {
                  i.push(String.fromCharCode(65535 & s)), a += 2;continue;
                }
              }
            } else if (r[a] < 240) {
              if (e._checkContinuation(r, a, 2)) {
                var o = (15 & r[a]) << 12 | (63 & r[a + 1]) << 6 | 63 & r[a + 2];if (o >= 2048 && 55296 != (63488 & o)) {
                  i.push(String.fromCharCode(65535 & o)), a += 3;continue;
                }
              }
            } else if (r[a] < 248 && e._checkContinuation(r, a, 3)) {
              var l = (7 & r[a]) << 18 | (63 & r[a + 1]) << 12 | (63 & r[a + 2]) << 6 | 63 & r[a + 3];if (l > 65536 && l < 1114112) {
                l -= 65536, i.push(String.fromCharCode(l >>> 10 | 55296)), i.push(String.fromCharCode(1023 & l | 56320)), a += 4;continue;
              }
            }i.push(String.fromCharCode(65533)), ++a;
          }
        }return i.join("");
      } }, { key: "_checkContinuation", value: function value(e, t, i) {
        var r = e;if (t + i < r.length) {
          for (; i--;) {
            if (128 != (192 & r[++t])) return !1;
          }return !0;
        }return !1;
      } }]), e;
  }(),
      MediaSample$1 = function () {
    function e(t) {
      var i = this;classCallCheck(this, e);var r = e.getDefaultInf();if (!t || "[object Object]" !== Object.prototype.toString.call(t)) return r;var a = Object.assign({}, r, t);Object.entries(a).forEach(function (e) {
        var t = slicedToArray(e, 2),
            r = t[0],
            a = t[1];i[r] = a;
      });
    }return createClass(e, null, [{ key: "getDefaultInf", value: function value() {
        return { dts: null, pts: null, duration: null, position: null, isRAP: !1, originDts: null };
      } }]), e;
  }(),
      MediaSegment$1 = function () {
    function e() {
      classCallCheck(this, e), this.startDts = -1, this.endDts = -1, this.startPts = -1, this.endPts = -1, this.originStartDts = -1, this.originEndDts = -1, this.randomAccessPoints = [], this.firstSample = null, this.lastSample = null;
    }return createClass(e, [{ key: "addRAP", value: function value(e) {
        e.isRAP = !0, this.randomAccessPoints.push(e);
      } }]), e;
  }(),
      MediaSegmentList$2 = function () {
    function e(t) {
      classCallCheck(this, e), this._type = t, this._list = [], this._lastAppendLocation = -1;
    }return createClass(e, [{ key: "isEmpty", value: function value() {
        return 0 === this._list.length;
      } }, { key: "clear", value: function value() {
        this._list = [], this._lastAppendLocation = -1;
      } }, { key: "_searchNearestSegmentBefore", value: function value(e) {
        var t = this._list;if (0 === t.length) return -2;var i = t.length - 1,
            r = 0,
            a = 0,
            n = i,
            s = 0;if (e < t[0].originDts) return s = -1;for (; a <= n;) {
          if ((r = a + Math.floor((n - a) / 2)) === i || e > t[r].lastSample.originDts && e < t[r + 1].originDts) {
            s = r;break;
          }t[r].originDts < e ? a = r + 1 : n = r - 1;
        }return s;
      } }, { key: "_searchNearestSegmentAfter", value: function value(e) {
        return this._searchNearestSegmentBefore(e) + 1;
      } }, { key: "append", value: function value(e) {
        var t = this._list,
            i = this._lastAppendLocation,
            r = 0;-1 !== i && i < t.length && e.originStartDts >= t[i].lastSample.originDts && (i === t.length - 1 || i < t.length - 1 && e.originStartDts < t[i + 1].originStartDts) ? r = i + 1 : t.length > 0 && (r = this._searchNearestSegmentBefore(e.originStartDts) + 1), this._lastAppendLocation = r, this._list.splice(r, 0, e);
      } }, { key: "getLastSegmentBefore", value: function value(e) {
        var t = this._searchNearestSegmentBefore(e);return t >= 0 ? this._list[t] : null;
      } }, { key: "getLastSampleBefore", value: function value(e) {
        var t = this.getLastSegmentBefore(e);return null !== t ? t.lastSample : null;
      } }, { key: "getLastRAPBefore", value: function value(e) {
        for (var t = this._searchNearestSegmentBefore(e), i = this._list[t].randomAccessPoints; 0 === i.length && t > 0;) {
          t--, i = this._list[t].randomAccessPoints;
        }return i.length > 0 ? i[i.length - 1] : null;
      } }, { key: "type", get: function get() {
        return this._type;
      } }, { key: "length", get: function get() {
        return this._list.length;
      } }]), e;
  }(),
      AudioTrackMeta$2 = function () {
    function e(t) {
      classCallCheck(this, e);var i = { sampleRate: 48e3, channelCount: 2, codec: "mp4a.40.2", config: [41, 401, 136, 0], duration: 0, id: 2, refSampleDuration: 21, sampleRateIndex: 3, timescale: 1e3, type: "audio" };return t ? Object.assign({}, i, t) : i;
    }return createClass(e, [{ key: "destroy", value: function value() {
        this.init = null;
      } }]), e;
  }(),
      VideoTrackMeta$2 = function () {
    function e(t) {
      classCallCheck(this, e);var i = { avcc: null, sps: new Uint8Array(0), pps: new Uint8Array(0), chromaFormat: 420, codec: "avc1.640020", codecHeight: 720, codecWidth: 1280, duration: 0, frameRate: { fixed: !0, fps: 25, fps_num: 25e3, fps_den: 1e3 }, id: 1, level: "3.2", presentHeight: 720, presentWidth: 1280, profile: "High", refSampleDuration: 40, parRatio: { height: 1, width: 1 }, timescale: 1e3, type: "video" };return t ? Object.assign({}, i, t) : i;
    }return createClass(e, [{ key: "destroy", value: function value() {
        this.init = null, this.sps = null, this.pps = null;
      } }]), e;
  }(),
      AudioTrackSample$2 = function () {
    function e(t) {
      classCallCheck(this, e);var i = e.getDefault();return t ? Object.assign({}, i, t) : i;
    }return createClass(e, null, [{ key: "getDefault", value: function value() {
        return { dts: null, pts: null, data: new Uint8Array() };
      } }]), e;
  }(),
      VideoTrackSample$2 = function () {
    function e(t) {
      classCallCheck(this, e);var i = e.getDefault();return t ? Object.assign({}, i, t) : i;
    }return createClass(e, null, [{ key: "getDefault", value: function value() {
        return { dts: null, pts: null, isKeyframe: !1, originDts: null, data: new Uint8Array() };
      } }]), e;
  }(),
      MSE$1 = function () {
    function e(t) {
      classCallCheck(this, e), this.configs = Object.assign({}, t), this.container = this.configs.container, this.mediaSource = null, this.sourceBuffers = {}, this.preloadTime = this.configs.preloadTime || 1, this.onSourceOpen = this.onSourceOpen.bind(this), this.onTimeUpdate = this.onTimeUpdate.bind(this), this.onUpdateEnd = this.onUpdateEnd.bind(this), this.onWaiting = this.onWaiting.bind(this);
    }return createClass(e, [{ key: "init", value: function value() {
        this.mediaSource = new self.MediaSource(), this.mediaSource.addEventListener("sourceopen", this.onSourceOpen), this.container.src = URL.createObjectURL(this.mediaSource), this.url = this.container.src, this.container.addEventListener("timeupdate", this.onTimeUpdate), this.container.addEventListener("waiting", this.onWaiting);
      } }, { key: "onTimeUpdate", value: function value() {
        this.emit("TIME_UPDATE", this.container);
      } }, { key: "onWaiting", value: function value() {
        this.emit("WAITING", this.container);
      } }, { key: "onSourceOpen", value: function value() {
        this.addSourceBuffers();
      } }, { key: "onUpdateEnd", value: function value() {
        this.emit("SOURCE_UPDATE_END"), this.doAppend();
      } }, { key: "addSourceBuffers", value: function value() {
        if ("open" === this.mediaSource.readyState) {
          var e = this._context.getInstance("PRE_SOURCE_BUFFER"),
              t = this._context.getInstance("TRACKS"),
              i = void 0;e = e.sources;for (var r = !1, a = 0, n = Object.keys(e).length; a < n; a++) {
            var s = Object.keys(e)[a];if ("audio" === s ? i = t.audioTrack : "video" === s && (i = t.videoTrack), i) {
              var o = "audio" === s ? 21 : 40;i.meta && i.meta.refSampleDuration && (o = i.meta.refSampleDuration), e[s].data.length >= this.preloadTime / o && (r = !0);
            }
          }if (r) {
            if (Object.keys(this.sourceBuffers).length > 0) return;for (var l = 0, u = Object.keys(e).length; l < u; l++) {
              var h = Object.keys(e)[l],
                  d = e[h],
                  f = "video" === h ? "video/mp4;codecs=" + d.mimetype : "audio/mp4;codecs=" + d.mimetype,
                  c = this.mediaSource.addSourceBuffer(f);this.sourceBuffers[h] = c, c.addEventListener("updateend", this.onUpdateEnd), this.doAppend();
            }
          }
        }
      } }, { key: "doAppend", value: function value() {
        var e = this._context.getInstance("PRE_SOURCE_BUFFER");if (e) for (var t = 0; t < Object.keys(this.sourceBuffers).length; t++) {
          var i = Object.keys(this.sourceBuffers)[t],
              r = this.sourceBuffers[i];if (!r.updating) {
            var a = e.sources[i];if (a && !a.inited) r.appendBuffer(a.init.buffer.buffer), a.inited = !0;else if (a) {
              var n = a.data.shift();n && r.appendBuffer(n.buffer.buffer);
            }
          }
        }
      } }, { key: "endOfStream", value: function value() {
        var e = this.mediaSource,
            t = e.readyState,
            i = e.activeSourceBuffers;if ("open" === t && 0 === i.length) try {
          this.mediaSource.endOfStream();
        } catch (e) {}
      } }, { key: "remove", value: function value(e) {
        for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, i = 0; i < Object.keys(this.sourceBuffers).length; i++) {
          var r = this.sourceBuffers[Object.keys(this.sourceBuffers)[i]];r.updating || r.remove(t, e);
        }
      } }, { key: "removeBuffers", value: function value() {
        for (var t = this, i = [], r = 0; r < Object.keys(this.sourceBuffers).length; r++) {
          !function (r) {
            var a = t.sourceBuffers[Object.keys(t.sourceBuffers)[r]];a.removeEventListener("updateend", t.onUpdateEnd);var n = void 0;n = a.updating ? new Promise(function (t) {
              var i = function i() {
                var r = 3,
                    n = function i() {
                  a.updating ? r > 0 ? (setTimeout(i, 200), r--) : t() : (e.clearBuffer(a), a.addEventListener("updateend", function () {
                    t();
                  }));
                };setTimeout(n, 200), a.removeEventListener("updateend", i);
              };a.addEventListener("updateend", i);
            }) : new Promise(function (t) {
              e.clearBuffer(a), a.addEventListener("updateend", function () {
                t();
              });
            }), i.push(n);
          }(r);
        }return Promise.all(i);
      } }, { key: "destroy", value: function value() {
        var e = this;return this.removeBuffers().then(function () {
          for (var t = 0; t < Object.keys(e.sourceBuffers).length; t++) {
            var i = e.sourceBuffers[Object.keys(e.sourceBuffers)[t]];e.mediaSource.removeSourceBuffer(i), delete e.sourceBuffers[Object.keys(e.sourceBuffers)[t]];
          }e.container.removeEventListener("timeupdate", e.onTimeUpdate), e.container.removeEventListener("waiting", e.onWaiting), e.mediaSource.removeEventListener("sourceopen", e.onSourceOpen), e.endOfStream(), window.URL.revokeObjectURL(e.url), e.url = null, e.configs = {}, e.container = null, e.mediaSource = null, e.sourceBuffers = {}, e.preloadTime = 1;
        });
      } }], [{ key: "clearBuffer", value: function value(e) {
        for (var t = e.buffered, i = .1, r = 0, a = t.length; r < a; r++) {
          i = t.end(r);
        }try {
          e.remove(0, i);
        } catch (e) {}
      } }]), e;
  }(),
      Stream$2 = function () {
    function e(t) {
      if (classCallCheck(this, e), !(t instanceof ArrayBuffer)) throw new Error("data is invalid");this.buffer = t, this.dataview = new DataView(t), this.dataview.position = 0;
    }return createClass(e, [{ key: "back", value: function value(e) {
        this.position -= e;
      } }, { key: "skip", value: function value(t) {
        for (var i = Math.floor(t / 4), r = t % 4, a = 0; a < i; a++) {
          e.readByte(this.dataview, 4);
        }r > 0 && e.readByte(this.dataview, r);
      } }, { key: "readUint8", value: function value() {
        return e.readByte(this.dataview, 1);
      } }, { key: "readUint16", value: function value() {
        return e.readByte(this.dataview, 2);
      } }, { key: "readUint24", value: function value() {
        return e.readByte(this.dataview, 3);
      } }, { key: "readUint32", value: function value() {
        return e.readByte(this.dataview, 4);
      } }, { key: "readUint64", value: function value() {
        return e.readByte(this.dataview, 8);
      } }, { key: "readInt8", value: function value() {
        return e.readByte(this.dataview, 1, !0);
      } }, { key: "readInt16", value: function value() {
        return e.readByte(this.dataview, 2, !0);
      } }, { key: "readInt32", value: function value() {
        return e.readByte(this.dataview, 4, !0);
      } }, { key: "writeUint32", value: function value(e) {
        return new Uint8Array([e >>> 24 & 255, e >>> 16 & 255, e >>> 8 & 255, 255 & e]);
      } }, { key: "length", get: function get() {
        return this.buffer.byteLength;
      } }, { key: "position", set: function set(e) {
        this.dataview.position = e;
      }, get: function get() {
        return this.dataview.position;
      } }], [{ key: "readByte", value: function value(e, t, i) {
        var r = void 0;switch (t) {case 1:
            r = i ? e.getInt8(e.position) : e.getUint8(e.position);break;case 2:
            r = i ? e.getInt16(e.position) : e.getUint16(e.position);break;case 3:
            if (i) throw new Error("not supported for readByte 3");r = e.getUint8(e.position) << 16, r |= e.getUint8(e.position + 1) << 8, r |= e.getUint8(e.position + 2);break;case 4:
            r = i ? e.getInt32(e.position) : e.getUint32(e.position);break;case 8:
            if (i) throw new Error("not supported for readBody 8");r = e.getUint32(e.position) << 32, r |= e.getUint32(e.position + 4);break;default:
            r = "";}return e.position += t, r;
      } }]), e;
  }(),
      concat$1 = createCommonjsModule$1(function (e, t) {
    Object.defineProperty(t, "__esModule", { value: !0 }), t.default = function (e) {
      for (var t = 0, i = arguments.length, r = Array(i > 1 ? i - 1 : 0), a = 1; a < i; a++) {
        r[a - 1] = arguments[a];
      }var n = !0,
          s = !1,
          o = void 0;try {
        for (var l, u = r[Symbol.iterator](); !(n = (l = u.next()).done); n = !0) {
          t += l.value.length;
        }
      } catch (e) {
        s = !0, o = e;
      } finally {
        try {
          !n && u.return && u.return();
        } finally {
          if (s) throw o;
        }
      }var h = new e(t),
          d = 0,
          f = !0,
          c = !1,
          p = void 0;try {
        for (var v, E = r[Symbol.iterator](); !(f = (v = E.next()).done); f = !0) {
          var m = v.value;h.set(m, d), d += m.length;
        }
      } catch (e) {
        c = !0, p = e;
      } finally {
        try {
          !f && E.return && E.return();
        } finally {
          if (c) throw p;
        }
      }return h;
    };
  });unwrapExports$1(concat$1);var lib$1 = createCommonjsModule$1(function (e) {
    var t = function (e) {
      return e && e.__esModule ? e : { default: e };
    }(concat$1);e.exports = t.default;
  }),
      Concat$1 = unwrapExports$1(lib$1),
      Buffer$2 = function () {
    function e(t) {
      classCallCheck(this, e), this.buffer = t || new Uint8Array(0);
    }return createClass(e, [{ key: "write", value: function value() {
        for (var e = this, t = arguments.length, i = Array(t), r = 0; r < t; r++) {
          i[r] = arguments[r];
        }i.forEach(function (t) {
          e.buffer = Concat$1(Uint8Array, e.buffer, t);
        });
      } }], [{ key: "writeUint32", value: function value(e) {
        return new Uint8Array([e >> 24, e >> 16 & 255, e >> 8 & 255, 255 & e]);
      } }, { key: "readAsInt", value: function value(e) {
        function t(e) {
          return e.toString(16).padStart(2, "0");
        }var i = "";return e.forEach(function (e) {
          i += t(e);
        }), parseInt(i, 16);
      } }]), e;
  }(),
      CRYTO_EVENTS$1$1 = _EVENTS$1.CRYTO_EVENTS,
      Crypto$1 = function () {
    function e(t) {
      classCallCheck(this, e), this.inputBuffer = t.inputbuffer, this.outputBuffer = t.outputbuffer, this.key = t.key, this.iv = t.iv, this.method = t.method, this.crypto = window.crypto || window.msCrypto;
    }return createClass(e, [{ key: "init", value: function value() {
        this.on(CRYTO_EVENTS$1$1.START_DECRYPT, this.decript.bind(this));
      } }, { key: "decript", value: function value() {
        var e = this;this.aeskey ? this.decriptData() : this.crypto.subtle.importKey("raw", this.key.buffer, { name: "AES-CBC" }, !1, ["encrypt", "decrypt"]).then(function (t) {
          e.aeskey = t, e.decriptData();
        });
      } }, { key: "decriptData", value: function value() {
        var e = this,
            t = this._context.getInstance(this.inputBuffer),
            i = this._context.getInstance(this.outputBuffer),
            r = t.shift();r && this.crypto.subtle.decrypt({ name: "AES-CBC", iv: this.iv.buffer }, this.aeskey, r).then(function (t) {
          i.push(new Uint8Array(t)), e.emit(CRYTO_EVENTS$1$1.DECRYPTED), e.decriptData(r);
        });
      } }]), e;
  }(),
      Context$1$1 = Context$2,
      EVENTS$1 = _EVENTS$1,
      sniffer$1$1 = sniffer$2,
      isLe$1 = le$1$1,
      UTF8$1$1 = UTF8$2,
      MediaSegmentList$1$1 = MediaSegmentList$2,
      AudioTrackMeta$1$1 = AudioTrackMeta$2,
      VideoTrackMeta$1$1 = VideoTrackMeta$2,
      Mse$1 = MSE$1,
      Buffer$1$1 = Buffer$2,
      Golomb$1 = function () {
    function e(t) {
      classCallCheck(this, e), this.TAG = "Golomb", this._buffer = t, this._bufferIndex = 0, this._totalBytes = t.byteLength, this._totalBits = 8 * t.byteLength, this._currentWord = 0, this._currentWordBitsLeft = 0;
    }return createClass(e, [{ key: "destroy", value: function value() {
        this._buffer = null;
      } }, { key: "_fillCurrentWord", value: function value() {
        var e = this._totalBytes - this._bufferIndex,
            t = Math.min(4, e),
            i = new Uint8Array(4);i.set(this._buffer.subarray(this._bufferIndex, this._bufferIndex + t)), this._currentWord = new DataView(i.buffer).getUint32(0), this._bufferIndex += t, this._currentWordBitsLeft = 8 * t;
      } }, { key: "readBits", value: function value(e) {
        var t = Math.min(this._currentWordBitsLeft, e),
            i = this._currentWord >>> 32 - t;if (e > 32) throw new Error("Cannot read more than 32 bits at a time");return this._currentWordBitsLeft -= t, this._currentWordBitsLeft > 0 ? this._currentWord <<= t : this._totalBytes - this._bufferIndex > 0 && this._fillCurrentWord(), t = e - t, t > 0 && this._currentWordBitsLeft ? i << t | this.readBits(t) : i;
      } }, { key: "readBool", value: function value() {
        return 1 === this.readBits(1);
      } }, { key: "readByte", value: function value() {
        return this.readBits(8);
      } }, { key: "_skipLeadingZero", value: function value() {
        var e = void 0;for (e = 0; e < this._currentWordBitsLeft; e++) {
          if (0 != (this._currentWord & 2147483648 >>> e)) return this._currentWord <<= e, this._currentWordBitsLeft -= e, e;
        }return this._fillCurrentWord(), e + this._skipLeadingZero();
      } }, { key: "readUEG", value: function value() {
        var e = this._skipLeadingZero();return this.readBits(e + 1) - 1;
      } }, { key: "readSEG", value: function value() {
        var e = this.readUEG();return 1 & e ? e + 1 >>> 1 : -1 * (e >>> 1);
      } }]), e;
  }(),
      SPSParser$1 = function () {
    function e() {
      classCallCheck(this, e);
    }return createClass(e, null, [{ key: "_ebsp2rbsp", value: function value(e) {
        for (var t = e, i = t.byteLength, r = new Uint8Array(i), a = 0, n = 0; n < i; n++) {
          n >= 2 && 3 === t[n] && 0 === t[n - 1] && 0 === t[n - 2] || (r[a] = t[n], a++);
        }return new Uint8Array(r.buffer, 0, a);
      } }, { key: "parseSPS", value: function value(t) {
        var i = e._ebsp2rbsp(t),
            r = new Golomb$1(i);r.readByte();var a = r.readByte();r.readByte();var n = r.readByte();r.readUEG();var s = e.getProfileString(a),
            o = e.getLevelString(n),
            l = 1,
            u = 420,
            h = [0, 420, 422, 444],
            d = 8;if ((100 === a || 110 === a || 122 === a || 244 === a || 44 === a || 83 === a || 86 === a || 118 === a || 128 === a || 138 === a || 144 === a) && (3 === (l = r.readUEG()) && r.readBits(1), l <= 3 && (u = h[l]), d = r.readUEG() + 8, r.readUEG(), r.readBits(1), r.readBool())) for (var f = 3 !== l ? 8 : 12, c = 0; c < f; c++) {
          r.readBool() && (c < 6 ? e._skipScalingList(r, 16) : e._skipScalingList(r, 64));
        }r.readUEG();var p = r.readUEG();if (0 === p) r.readUEG();else if (1 === p) {
          r.readBits(1), r.readSEG(), r.readSEG();for (var v = r.readUEG(), E = 0; E < v; E++) {
            r.readSEG();
          }
        }r.readUEG(), r.readBits(1);var m = r.readUEG(),
            y = r.readUEG(),
            _ = r.readBits(1);0 === _ && r.readBits(1), r.readBits(1);var g = 0,
            S = 0,
            k = 0,
            A = 0;r.readBool() && (g = r.readUEG(), S = r.readUEG(), k = r.readUEG(), A = r.readUEG());var T = 1,
            b = 1,
            D = 0,
            R = !0,
            L = 0,
            w = 0;if (r.readBool()) {
          if (r.readBool()) {
            var C = r.readByte(),
                M = [1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2],
                O = [1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1];C > 0 && C < 16 ? (T = M[C - 1], b = O[C - 1]) : 255 === C && (T = r.readByte() << 8 | r.readByte(), b = r.readByte() << 8 | r.readByte());
          }if (r.readBool() && r.readBool(), r.readBool() && (r.readBits(4), r.readBool() && r.readBits(24)), r.readBool() && (r.readUEG(), r.readUEG()), r.readBool()) {
            var x = r.readBits(32),
                U = r.readBits(32);R = r.readBool(), D = (L = U) / (w = 2 * x);
          }
        }var B = 1;1 === T && 1 === b || (B = T / b);var N = 0,
            V = 0;0 === l ? (N = 1, V = 2 - _) : (N = 3 === l ? 1 : 2, V = (1 === l ? 2 : 1) * (2 - _));var I = 16 * (m + 1),
            F = 16 * (y + 1) * (2 - _);I -= (g + S) * N, F -= (k + A) * V;var P = Math.ceil(I * B);return r.destroy(), r = null, { profile_string: s, level_string: o, bit_depth: d, chroma_format: u, chroma_format_string: e.getChromaFormatString(u), frame_rate: { fixed: R, fps: D, fps_den: w, fps_num: L }, par_ratio: { width: T, height: b }, codec_size: { width: I, height: F }, present_size: { width: P, height: F } };
      } }, { key: "_skipScalingList", value: function value(e, t) {
        for (var i = 8, r = 8, a = 0; a < t; a++) {
          0 !== r && (r = (i + e.readSEG() + 256) % 256), i = 0 === r ? i : r;
        }
      } }, { key: "getProfileString", value: function value(e) {
        switch (e) {case 66:
            return "Baseline";case 77:
            return "Main";case 88:
            return "Extended";case 100:
            return "High";case 110:
            return "High10";case 122:
            return "High422";case 244:
            return "High444";default:
            return "Unknown";}
      } }, { key: "getLevelString", value: function value(e) {
        return (e / 10).toFixed(1);
      } }, { key: "getChromaFormatString", value: function value(e) {
        switch (e) {case 420:
            return "4:2:0";case 422:
            return "4:2:2";case 444:
            return "4:4:4";default:
            return "Unknown";}
      } }, { key: "toVideoMeta", value: function value(e) {
        var t = {};e && e.codec_size && (t.codecWidth = e.codec_size.width, t.codecHeight = e.codec_size.height, t.presentWidth = e.present_size.width, t.presentHeight = e.present_size.height), t.profile = e.profile_string, t.level = e.level_string, t.bitDepth = e.bit_depth, t.chromaFormat = e.chroma_format, t.parRatio = { width: e.par_ratio.width, height: e.par_ratio.height }, t.frameRate = e.frame_rate;var i = t.frameRate.fps_den,
            r = t.frameRate.fps_num;t.refSampleDuration = Math.floor(t.timescale * (i / r));
      } }]), e;
  }(),
      Nalunit$2 = function () {
    function e() {
      classCallCheck(this, e);
    }return createClass(e, null, [{ key: "getNalunits", value: function value(t) {
        if (t.length - t.position < 4) return [];var i = t.dataview,
            r = t.position;return 1 === i.getInt32(r) || 0 === i.getInt16(r) && 1 === i.getInt8(r + 2) ? e.getAnnexbNals(t) : e.getAvccNals(t);
      } }, { key: "getAnnexbNals", value: function value(t) {
        for (var i = [], r = e.getHeaderPositionAnnexB(t), a = r.pos, n = a; a < t.length - 4;) {
          var s = t.buffer.slice(a, a + r.headerLength);r.pos === t.position && t.skip(r.headerLength), n = (r = e.getHeaderPositionAnnexB(t)).pos;var o = { header: s, body: new Uint8Array(t.buffer.slice(a + s.byteLength, n)) };e.analyseNal(o), i.push(o), t.skip(n - t.position), a = n;
        }return i;
      } }, { key: "getAvccNals", value: function value(t) {
        for (var i = []; t.position < t.length - 4;) {
          var r = t.dataview.getInt32();if (!(t.length - t.position >= r)) break;var a = t.buffer.slice(t.position, t.position + 4);t.skip(4);var n = t.buffer.slice(t.position, t.position + r);t.skip(r);var s = { header: a, body: n };e.analyseNal(s), i.push(s);
        }return i;
      } }, { key: "analyseNal", value: function value(e) {
        switch (31 & e.body[0]) {case 1:
            e.ndr = !0;break;case 5:
            e.idr = !0;break;case 6:
            break;case 7:
            e.sps = SPSParser$1.parseSPS(e.body);break;case 8:
            e.pps = !0;}
      } }, { key: "getHeaderPositionAnnexB", value: function value(e) {
        for (var t = e.position, i = 0; 3 !== i && 4 !== i && t < e.length - 4;) {
          0 === e.dataview.getInt16(t) ? 1 === e.dataview.getInt16(t + 2) ? i = 4 : 1 === e.dataview.getInt8(t + 2) ? i = 3 : t++ : t++;
        }return t === e.length - 4 && (0 === e.dataview.getInt16(t) ? 1 === e.dataview.getInt16(t + 2) && (i = 4) : (t++, 0 === e.dataview.getInt16(t) && 1 === e.dataview.getInt8(t) ? i = 3 : t = e.length)), { pos: t, headerLength: i };
      } }, { key: "getAvcc", value: function value(e, t) {
        var i = new Uint8Array(e.byteLength + t.byteLength + 11);i[0] = 1, i[1] = e[1], i[2] = e[2], i[3] = e[3], i[4] = 255, i[5] = 225;var r = 6;return i.set(new Uint8Array([e.byteLength >>> 8 & 255, 255 & e.byteLength]), r), r += 2, i.set(e, r), r += e.byteLength, i[r] = 1, r++, i.set(new Uint8Array([t.byteLength >>> 8 & 255, 255 & t.byteLength]), r), r += 2, i.set(t, r), i;
      } }]), e;
  }(),
      AAC$1 = function () {
    function e() {
      classCallCheck(this, e);
    }return createClass(e, null, [{ key: "getSilentFrame", value: function value(e, t) {
        if ("mp4a.40.2" === e) {
          if (1 === t) return new Uint8Array([0, 200, 0, 128, 35, 128]);if (2 === t) return new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128]);if (3 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142]);if (4 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56]);if (5 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56]);if (6 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224]);
        } else {
          if (1 === t) return new Uint8Array([1, 64, 34, 128, 163, 78, 230, 128, 186, 8, 0, 0, 0, 28, 6, 241, 193, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);if (2 === t) return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);if (3 === t) return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
        }return null;
      } }]), e;
  }(),
      REMUX_EVENTS$1$1 = EVENTS$1.REMUX_EVENTS,
      LOADER_EVENTS$1$1 = EVENTS$1.LOADER_EVENTS,
      Compatibility$2 = function () {
    function e() {
      classCallCheck(this, e), this.nextAudioDts = 0, this.nextVideoDts = 0, this.lastAudioSamplesLen = 0, this.lastVideoSamplesLen = 0, this.lastVideoDts = void 0, this.lastAudioDts = void 0, this.allAudioSamplesCount = 0, this.allVideoSamplesCount = 0, this._firstAudioSample = null, this._firstVideoSample = null, this.filledAudioSamples = [], this.filledVideoSamples = [], this.videoLastSample = null, this.audioLastSample = null, this._videoLargeGap = 0, this._audioLargeGap = 0;
    }return createClass(e, [{ key: "init", value: function value() {
        var e = this;this.before(REMUX_EVENTS$1$1.REMUX_MEDIA, this.doFix.bind(this)), this.on(LOADER_EVENTS$1$1.LOADER_COMPLETE, function () {
          e.videoLastSample && e.videoTrack.samples.unshift(e.videoLastSample);
        });
      } }, { key: "reset", value: function value() {
        this.nextAudioDts = null, this.nextVideoDts = null, this.lastAudioSamplesLen = 0, this.lastVideoSamplesLen = 0, this.lastVideoDts = void 0, this.lastAudioDts = void 0, this.videoLastSample = null, this.audioLastSample = null, this.filledAudioSamples = [], this.filledVideoSamples = [];
      } }, { key: "doFix", value: function value() {
        var t = this.getFirstSample(),
            i = t.isFirstAudioSamples,
            r = t.isFirstVideoSamples;this.recordSamplesCount(), this._firstVideoSample && this.fixRefSampleDuration(this.videoTrack.meta, this.videoTrack.samples), this._firstAudioSample && this.fixRefSampleDuration(this.audioTrack.meta, this.audioTrack.samples);var a = e.detactChangeStream(this.videoTrack.samples),
            n = a.changed,
            s = a.changedIdx;n && !i ? this.fixChangeStreamVideo(s) : this.doFixVideo(r);var o = e.detactChangeStream(this.audioTrack.samples),
            l = o.changed,
            u = o.changedIdx;l ? this.fixChangeStreamAudio(u) : this.doFixAudio(i), this.removeInvalidSamples();
      } }, { key: "doFixVideo", value: function value(t, i) {
        for (var r = this.videoTrack, a = r.samples, n = r.meta, s = 0, o = a.length; s < o; s++) {
          var l = a[s];l.originDts = l.dts;
        }if ((!n.frameRate || !1 !== n.frameRate.fixed) && a && a.length && this._firstVideoSample) {
          var u = a[0];if (this._videoLargeGap > 0 && e.doFixLargeGap(a, this._videoLargeGap), u.dts !== this._firstVideoSample.dts && i && (i && (this.nextVideoDts = i), this._videoLargeGap = this.nextVideoDts - u.dts, e.doFixLargeGap(a, this._videoLargeGap)), t && this._firstAudioSample) {
            var h = this._firstVideoSample.originDts,
                d = h - (this._firstAudioSample.originDts || this._firstAudioSample.dts);if (d > 2 * n.refSampleDuration && d < 10 * n.refSampleDuration) {
              for (var f = Math.floor(d / n.refSampleDuration), c = 0; c < f; c++) {
                var p = Object.assign({}, u);p.dts = h - (c + 1) * n.refSampleDuration, p.pts = p.dts + p.cts, a.unshift(p), this.filledVideoSamples.push({ dts: p.dts, size: p.data.byteLength });
              }this._firstVideoSample = this.filledVideoSamples[0] || this._firstVideoSample;
            } else d < -2 * n.refSampleDuration && (this._videoLargeGap = -1 * d, e.doFixLargeGap(a, -1 * d));
          }var v = a.pop();if (a.length && (a[a.length - 1].duration = v.dts - a[a.length - 1].dts), this.videoLastSample) {
            var E = this.videoLastSample;E.duration = u.dts - E.dts, a.unshift(this.videoLastSample);
          }this.videoLastSample = v, this.videoTrack.samples = a;
        }
      } }, { key: "doFixAudio", value: function value(t, i) {
        var r = this.audioTrack,
            a = r.samples,
            n = r.meta;if (a && a.length) {
          for (var s = 0, o = a.length; s < o; s++) {
            var l = a[s];l.originDts = l.dts;
          }var u = a.length,
              h = AAC$1.getSilentFrame(n.codec, n.channelCount),
              d = this._firstAudioSample,
              f = a[0];if (this._audioLargeGap > 0 && e.doFixLargeGap(a, this._audioLargeGap), f.dts !== this._firstAudioSample.dts && (i || e.detectLargeGap(this.nextAudioDts, f)) && (i && (this.nextAudioDts = i), this._audioLargeGap = this.nextAudioDts - f.dts, e.doFixLargeGap(a, this._audioLargeGap)), this._firstVideoSample && t) {
            var c = this._firstVideoSample.originDts || this._firstVideoSample.dts,
                p = d.dts - c;if (p > n.refSampleDuration && p < 10 * n.refSampleDuration) {
              for (var v = Math.floor((d.dts - c) / n.refSampleDuration), E = 0; E < v; E++) {
                var m = { data: h, datasize: h.byteLength, dts: d.dts - (E + 1) * n.refSampleDuration, filtered: 0 };a.unshift(m), this.filledAudioSamples.push({ dts: m.dts, size: m.data.byteLength });
              }this._firstAudioSample = this.filledAudioSamples[0] || this._firstAudioSample;
            } else p < -1 * n.refSampleDuration && (this._audioLargeGap = -1 * p, e.doFixLargeGap(a, -1 * p));
          }var y = void 0,
              _ = a[0].dts;if (this.nextAudioDts) {
            y = _ - this.nextAudioDts;var g = Math.abs(y);if (g > n.refSampleDuration && 1 === u && 1 === this.lastAudioSamplesLen && (n.refSampleDurationFixed = void 0), y > 2 * n.refSampleDuration && y < 10 * n.refSampleDuration) {
              if (1 === u && 1 === this.lastAudioSamplesLen) n.refSampleDurationFixed = void 0 !== n.refSampleDurationFixed ? n.refSampleDurationFixed + y : n.refSampleDuration + y;else for (var S = Math.floor(y / n.refSampleDuration), k = 0; k < S; k++) {
                var A = _ - (k + 1) * n.refSampleDuration,
                    T = Object.assign({}, a[0], { dts: A > this.nextAudioDts ? A : this.nextAudioDts });this.filledAudioSamples.push({ dts: T.dts, size: T.data.byteLength }), this.audioTrack.samples.unshift(T);
              }
            } else g <= n.refSampleDuration && g > 0 ? (a[0].dts = this.nextAudioDts, a[0].pts = this.nextAudioDts) : y < 0 && e.doFixLargeGap(a, -1 * y);
          }var b = a[a.length - 1].originDts,
              D = a[a.length - 1].dts,
              R = a.length >= 2 ? b - a[a.length - 2].originDts : n.refSampleDuration;this.lastAudioSamplesLen = u, this.nextAudioDts = n.refSampleDurationFixed ? D + n.refSampleDurationFixed : D + R, this.lastAudioDts = D, a[a.length - 1].duration = R;for (var L = 0, w = a.length; L < w; L++) {
            var C = a[L],
                M = a[L + 1];if (!M) break;var O = M.dts - C.dts;a[L].duration = O;
          }this.audioTrack.samples = e.sortAudioSamples(a);
        }
      } }, { key: "fixChangeStreamVideo", value: function value(e) {
        var t = this.videoTrack,
            i = t.samples,
            r = t.meta,
            a = 0 === e ? this.getStreamChangeStart(i[0]) : i[e - 1].dts,
            n = i[e].dts;if (Math.abs(a - n) <= 2 * r.refSampleDuration) return i[e].options ? i[e].options.isContinue = !0 : i[e].options = { isContinue: !0 }, this.doFixVideo(!1);var s = i.slice(0, e),
            o = i.slice(e),
            l = i[0],
            u = o[0].dts - l.dts,
            h = l.options && l.options.start + u ? l.options.start : null;this.videoTrack.samples = i.slice(0, e), this.doFixVideo(!1), this.videoTrack.samples = i.slice(e), this.doFixVideo(!1, h), this.videoTrack.samples = s.concat(o);
      } }, { key: "fixChangeStreamAudio", value: function value(e) {
        var t = this.audioTrack,
            i = t.samples,
            r = t.meta,
            a = 0 === e ? this.getStreamChangeStart(i[0]) : i[e - 1].dts,
            n = i[e].dts;if (Math.abs(a - n) <= 2 * r.refSampleDuration) return i[e].options ? i[e].options.isContinue = !0 : i[e].options = { isContinue: !0 }, this.doFixAudio(!1);var s = i.slice(0, e),
            o = i.slice(e),
            l = i[0],
            u = o[0].dts - l.dts,
            h = l.options && l.options.start + u ? l.options.start : null;this.audioTrack.samples = s, this.doFixAudio(!1), this.audioTrack.samples = o, this.doFixAudio(!1, h), this.audioTrack.samples = s.concat(o);
      } }, { key: "getFirstSample", value: function value() {
        var t = this.videoTrack.samples,
            i = this.audioTrack.samples,
            r = !1,
            a = !1;return !this._firstVideoSample && t.length && (this._firstVideoSample = e.findFirstVideoSample(t), this.removeInvalidSamples(), r = !0), !this._firstAudioSample && i.length && (this._firstAudioSample = e.findFirstAudioSample(i), this.removeInvalidSamples(), a = !0), { isFirstVideoSamples: r, isFirstAudioSamples: a };
      } }, { key: "fixRefSampleDuration", value: function value(e, t) {
        var i = "video" === e.type,
            r = i ? this.allVideoSamplesCount : this.allAudioSamplesCount,
            a = i ? this._firstVideoSample.dts : this._firstAudioSample.dts,
            n = i ? this.filledVideoSamples.length : this.filledAudioSamples.length;if (!e.refSampleDuration || e.refSampleDuration <= 0 || Number.isNaN(e.refSampleDuration)) {
          if (t.length >= 1) {
            var s = t[t.length - 1].dts;e.refSampleDuration = Math.floor((s - a) / (r + n - 1));
          }
        } else if (e.refSampleDuration && t.length >= 5) {
          var o = (t[t.length - 1].dts - t[0].dts) / (t.length - 1);e.refSampleDuration = Math.floor(Math.abs(e.refSampleDuration - o) <= 5 ? e.refSampleDuration : o);
        }
      } }, { key: "recordSamplesCount", value: function value() {
        var e = this.audioTrack,
            t = this.videoTrack;this.allAudioSamplesCount += e.samples.length, this.allVideoSamplesCount += t.samples.length;
      } }, { key: "removeInvalidSamples", value: function value() {
        var e = this._firstVideoSample,
            t = this._firstAudioSample;t && (this.audioTrack.samples = this.audioTrack.samples.filter(function (e, i) {
          return e === t || e.dts > t.dts;
        })), e && (this.videoTrack.samples = this.videoTrack.samples.filter(function (t, i) {
          return t === e || t.dts > e.dts;
        }));
      } }, { key: "getStreamChangeStart", value: function value(e) {
        return e.options && e.options.start ? e.options.start - this.dtsBase : 1 / 0;
      } }, { key: "tracks", get: function get() {
        return this._context.getInstance("TRACKS");
      } }, { key: "audioTrack", get: function get() {
        return this.tracks && this.tracks.audioTrack ? this.tracks.audioTrack : { samples: [], meta: {} };
      } }, { key: "videoTrack", get: function get() {
        return this.tracks && this.tracks.videoTrack ? this.tracks.videoTrack : { samples: [], meta: {} };
      } }, { key: "dtsBase", get: function get() {
        var e = this._context.getInstance("MP4_REMUXER");return e ? e._dtsBase : 0;
      } }], [{ key: "sortAudioSamples", value: function value(e) {
        return 1 === e.length ? e : e.sort(function (e, t) {
          return e.dts - t.dts;
        });
      } }, { key: "findFirstAudioSample", value: function value(t) {
        return t && 0 !== t.length ? e.sortAudioSamples(t)[0] : null;
      } }, { key: "findFirstVideoSample", value: function value(e) {
        if (!e.length) return null;for (var t = e.sort(function (e, t) {
          return e.dts - t.dts;
        }), i = 0, r = t.length; i < r; i++) {
          if (t[i].isKeyframe) return t[i];
        }
      } }, { key: "detectLargeGap", value: function value(e, t) {
        if (null !== e) {
          var i = t.dts || 0,
              r = e - i >= 1e3 || i - e >= 1e3,
              a = t.options && t.options.discontinue;return r || a;
        }
      } }, { key: "doFixLargeGap", value: function value(e, t) {
        for (var i = 0, r = e.length; i < r; i++) {
          var a = e[i];a.dts += t, a.pts && (a.pts += t);
        }
      } }, { key: "detactChangeStream", value: function value(e) {
        for (var t = !1, i = -1, r = 0, a = e.length; r < a; r++) {
          if (e[r].options && e[r].options.meta) {
            t = !0, i = r;break;
          }
        }return { changed: t, changedIdx: i };
      } }]), e;
  }(),
      SpsParser$1 = SPSParser$1,
      Compatibility$1$1 = Compatibility$2,
      Track$1 = function () {
    function e() {
      classCallCheck(this, e), this.id = -1, this.sequenceNumber = 0, this.samples = [], this.droppedSamples = [], this.length = 0;
    }return createClass(e, [{ key: "reset", value: function value() {
        this.sequenceNumber = 0, this.samples = [], this.length = 0;
      } }, { key: "distroy", value: function value() {
        this.reset(), this.id = -1;
      } }]), e;
  }(),
      AudioTrack$2 = function (e) {
    function t() {
      classCallCheck(this, t);var e = possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));return e.TAG = "AudioTrack", e.type = "audio", e;
    }return inherits(t, e), t;
  }(Track$1),
      VideoTrack$2 = function (e) {
    function t() {
      classCallCheck(this, t);var e = possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));return e.TAG = "VideoTrack", e.type = "video", e.dropped = 0, e;
    }return inherits(t, e), createClass(t, [{ key: "reset", value: function value() {
        this.sequenceNumber = 0, this.samples = [], this.length = 0, this.dropped = 0;
      } }]), t;
  }(Track$1),
      Tracks$2 = function () {
    function e() {
      classCallCheck(this, e), this.audioTrack = null, this.videoTrack = null;
    }return createClass(e, [{ key: "destroy", value: function value() {
        this.audioTrack = null, this.videoTrack = null;
      } }]), e;
  }(),
      XgBuffer$2 = function () {
    function e(t) {
      classCallCheck(this, e), this.length = t || 0, this.historyLen = t || 0, this.array = [], this.offset = 0;
    }return createClass(e, [{ key: "push", value: function value(e) {
        this.array.push(e), this.length += e.byteLength, this.historyLen += e.byteLength;
      } }, { key: "shift", value: function value(e) {
        if (this.array.length < 1) return new Uint8Array(0);if (void 0 === e) return this._shiftBuffer();if (this.offset + e === this.array[0].length) {
          var t = this.array[0].slice(this.offset, this.offset + e);return this.offset = 0, this.array.shift(), this.length -= e, t;
        }if (this.offset + e < this.array[0].length) {
          var i = this.array[0].slice(this.offset, this.offset + e);return this.offset += e, this.length -= e, i;
        }for (var r = new Uint8Array(e), a = 0; this.array.length > 0 && e > 0;) {
          if (this.offset + e < this.array[0].length) {
            var n = this.array[0].slice(this.offset, this.offset + e);r.set(n, a), this.offset += e, this.length -= e, e = 0;break;
          }var s = this.array[0].length - this.offset;r.set(this.array[0].slice(this.offset, this.array[0].length), a), this.array.shift(), this.offset = 0, a += s, this.length -= s, e -= s;
        }return r;
      } }, { key: "clear", value: function value() {
        this.array = [], this.length = 0, this.offset = 0;
      } }, { key: "destroy", value: function value() {
        this.clear(), this.historyLen = 0;
      } }, { key: "_shiftBuffer", value: function value() {
        return this.length -= this.array[0].length, this.offset = 0, this.array.shift();
      } }, { key: "toInt", value: function value(e, t) {
        for (var i = 0, r = this.offset + e; r < this.offset + t + e;) {
          r < this.array[0].length ? i = 256 * i + this.array[0][r] : this.array[1] && (i = 256 * i + this.array[1][r - this.array[0].length]), r++;
        }return i;
      } }]), e;
  }(),
      RemuxBuffer$1 = function () {
    function e() {
      classCallCheck(this, e), this.video = [], this.audio = [];
    }return createClass(e, [{ key: "destroy", value: function value() {
        this.video = [], this.audio = [];
      } }]), e;
  }(),
      Source$1 = function e() {
    classCallCheck(this, e), this.mimetype = "", this.init = null, this.data = [];
  },
      PreSource$2 = function () {
    function e() {
      classCallCheck(this, e), this.sources = {};
    }return createClass(e, [{ key: "getSource", value: function value(e) {
        return this.sources[e];
      } }, { key: "createSource", value: function value(e) {
        return this.sources[e] = new Source$1(), this.sources[e];
      } }, { key: "clear", value: function value() {
        this.sources = {};
      } }, { key: "destroy", value: function value() {
        this.sources = {};
      } }]), e;
  }(),
      Tracks$1$1 = Tracks$2,
      AudioTrack$1$1 = AudioTrack$2,
      VideoTrack$1$1 = VideoTrack$2,
      XgBuffer$1$1 = XgBuffer$2,
      PreSource$1$1 = PreSource$2,
      classCallCheck$2 = function classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
  },
      createClass$2 = function () {
    function e(e, t) {
      for (var i = 0; i < t.length; i++) {
        var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }return function (t, i, r) {
      return i && e(t.prototype, i), r && e(t, r), t;
    };
  }(),
      get$2 = function e(t, i, r) {
    null === t && (t = Function.prototype);var a = Object.getOwnPropertyDescriptor(t, i);if (void 0 === a) {
      var n = Object.getPrototypeOf(t);return null === n ? void 0 : e(n, i, r);
    }if ("value" in a) return a.value;var s = a.get;if (void 0 !== s) return s.call(r);
  },
      inherits$2 = function inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : _typeof(t)));e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
  },
      possibleConstructorReturn$2 = function possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && "function" != typeof t ? e : t;
  },
      DATA_TYPES$1 = { NUMBER: 0, BOOLEAN: 1, STRING: 2, OBJECT: 3, MIX_ARRAY: 8, OBJECT_END: 9, STRICT_ARRAY: 10, DATE: 11, LONE_STRING: 12 },
      AMFParser$1 = function () {
    function e() {
      classCallCheck$2(this, e), this.offset = 0, this.readOffset = this.offset;
    }return createClass$2(e, [{ key: "resolve", value: function value(e, t) {
        if (t < 3) throw new Error("not enough data for metainfo");var i = {},
            r = this.parseValue(e),
            a = this.parseValue(e, t - r.bodySize);return i[r.data] = a.data, this.resetStatus(), i;
      } }, { key: "resetStatus", value: function value() {
        this.offset = 0, this.readOffset = this.offset;
      } }, { key: "parseString", value: function value(e) {
        var t = new DataView(e, this.readOffset).getUint16(0, !isLe$1),
            i = "";i = t > 0 ? UTF8$1$1.decode(new Uint8Array(e, this.readOffset + 2, t)) : "";var r = t + 2;return this.readOffset += r, { data: i, bodySize: t + 2 };
      } }, { key: "parseDate", value: function value(e, t) {
        var i = new DataView(e, this.readOffset, t),
            r = i.getFloat64(0, !isLe$1);return r += 60 * i.getInt16(8, !isLe$1) * 1e3, this.readOffset += 10, { data: new Date(r), bodySize: 10 };
      } }, { key: "parseObject", value: function value(e, t) {
        var i = this.parseString(e, t),
            r = this.parseValue(e, t - i.bodySize);return { data: { name: i.data, value: r.data }, bodySize: i.bodySize + r.bodySize, isObjEnd: r.isObjEnd };
      } }, { key: "parseLongString", value: function value(e) {
        var t = new DataView(e, this.readOffset).getUint32(0, !isLe$1),
            i = "";return i = t > 0 ? UTF8$1$1.decode(new Uint8Array(e, this.readOffset + 2, t)) : "", this.readOffset += t + 4, { data: i, bodySize: t + 4 };
      } }, { key: "parseValue", value: function value(e, t) {
        var i = new ArrayBuffer();i = e instanceof ArrayBuffer ? e : e.buffer;var r = DATA_TYPES$1.NUMBER,
            a = DATA_TYPES$1.BOOLEAN,
            n = DATA_TYPES$1.STRING,
            s = DATA_TYPES$1.OBJECT,
            o = DATA_TYPES$1.MIX_ARRAY,
            l = DATA_TYPES$1.OBJECT_END,
            u = DATA_TYPES$1.STRICT_ARRAY,
            h = DATA_TYPES$1.DATE,
            d = DATA_TYPES$1.LONE_STRING,
            f = new DataView(i, this.readOffset, t),
            c = !1,
            p = f.getUint8(0),
            v = 1;this.readOffset += 1;var E = null;switch (p) {case r:
            E = f.getFloat64(1, !isLe$1), this.readOffset += 8, v += 8;break;case a:
            E = !!f.getUint8(1), this.readOffset += 1, v += 1;break;case n:
            var m = this.parseString(i);E = m.data, v += m.bodySize;break;case s:
            E = {};var y = 0;for (16777215 & f.getUint32(t - 4, !isLe$1) && (y = 3); v < t - 4;) {
              var _ = this.parseObject(i, t - v - y);if (_.isObjectEnd) break;E[_.data.name] = _.data.value, v += _.bodySize;
            }v <= t - 3 && 9 === (16777215 & f.getUint32(v - 1, !isLe$1)) && (this.readOffset += 3, v += 3);break;case o:
            E = {}, v += 4, this.readOffset += 4;var g = 0;for (9 == (16777215 & f.getUint32(t - 4, !isLe$1)) && (g = 3); v < t - 8;) {
              var S = this.parseObject(i, t - v - g);if (S.isObjectEnd) break;E[S.data.name] = S.data.value, v += S.bodySize;
            }v <= t - 3 && 9 === (16777215 & f.getUint32(v - 1, !isLe$1)) && (v += 3, this.readOffset += 3);break;case l:
            E = null, c = !0;break;case u:
            E = [];var k = f.getUint32(1, !isLe$1);v += 4, this.readOffset += 4;for (var A = 0; A < k; A++) {
              var T = this.parseValue(i, t - v);E.push(T.data), v += T.bodySize;
            }break;case h:
            var b = this.parseDate(i, t - 1);E = b.data, v += b.bodySize;break;case d:
            var D = this.parseLongString(i, t - 1);E = D.data, v += D.bodySize;break;default:
            v = t;}return { data: E, bodySize: v, isObjEnd: c };
      } }]), e;
  }(),
      DEMUX_EVENTS$1$1 = EVENTS$1.DEMUX_EVENTS,
      FlvDemuxer$2 = function () {
    function e() {
      classCallCheck$2(this, e), this._firstFragmentLoaded = !1, this._trackNum = 0, this._hasScript = !1;
    }return createClass$2(e, [{ key: "init", value: function value() {
        this.on(DEMUX_EVENTS$1$1.DEMUX_START, this.doParseFlv.bind(this));
      } }, { key: "doParseFlv", value: function value() {
        if (this._firstFragmentLoaded) {
          if (this.loaderBuffer.length < 11) return;var e = void 0,
              t = 1e4;do {
            e = this._parseFlvTag();
          } while (e && t-- > 0);this.emit(DEMUX_EVENTS$1$1.DEMUX_COMPLETE);
        } else {
          if (this.loaderBuffer.length < 13) return;var i = this.loaderBuffer.shift(13);this.parseFlvHeader(i), this.doParseFlv();
        }
      } }, { key: "parseFlvHeader", value: function value(t) {
        if (e.isFlvFile(t)) {
          this._firstFragmentLoaded = !0;var i = e.getPlayType(t[4]);i.hasVideo && this.initVideoTrack(), i.hasAudio && this.initAudioTrack();
        } else this.emit(DEMUX_EVENTS$1$1.DEMUX_ERROR, new Error("invalid flv file")), this.doParseFlv();this.doParseFlv();
      } }, { key: "initVideoTrack", value: function value() {
        this._trackNum++;var e = new VideoTrack$1$1();e.meta = new VideoTrackMeta$1$1(), e.id = e.meta.id = this._trackNum, this.tracks.videoTrack = e;
      } }, { key: "initAudioTrack", value: function value() {
        this._trackNum++;var e = new AudioTrack$1$1();e.meta = new AudioTrackMeta$1$1(), e.id = e.meta.id = this._trackNum, this.tracks.audioTrack = e;
      } }, { key: "_parseFlvTag", value: function value() {
        if (this.loaderBuffer.length < 11) return null;var e = this._parseFlvTagHeader();return e && this._processChunk(e), e;
      } }, { key: "_parseFlvTagHeader", value: function value() {
        var e = 0,
            t = {},
            i = this.loaderBuffer.toInt(e, 1);if (e += 1, t.filtered = (32 & i) >>> 5, t.tagType = 31 & i, t.datasize = this.loaderBuffer.toInt(e, 3), e += 3, 8 !== t.tagType && 9 !== t.tagType && 11 !== t.tagType && 18 !== t.tagType || 0 !== this.loaderBuffer.toInt(8, 3)) return this.loaderBuffer && this.loaderBuffer.length > 0 && this.loaderBuffer.shift(1), this.emit(DEMUX_EVENTS$1$1.DEMUX_ERROR, this.TAG, new Error("tagType " + t.tagType), !1), null;if (this.loaderBuffer.length < t.datasize + 15) return null;this.loaderBuffer.shift(4);var r = this.loaderBuffer.toInt(0, 3);this.loaderBuffer.shift(3);var a = this.loaderBuffer.shift(1)[0];return a > 0 && (r += 16777216 * a), t.dts = r, this.loaderBuffer.shift(3), t;
      } }, { key: "_processChunk", value: function value(e) {
        switch (e.tagType) {case 18:
            this._parseScriptData(e);break;case 8:
            this._parseAACData(e);break;case 9:
            this._parseHevcData(e);break;case 11:
            this.loaderBuffer.shift(3);break;default:
            this.loaderBuffer.shift(1);}
      } }, { key: "_parseScriptData", value: function value(e) {
        var t = this.tracks.audioTrack,
            i = this.tracks.videoTrack,
            r = this.loaderBuffer.shift(e.datasize),
            a = new AMFParser$1().resolve(r, r.length),
            n = this._context.onMetaData = a ? a.onMetaData : void 0;if (this._context.mediaInfo.duration = n.duration, this._context.mediaInfo.hasVideo = n.hasVideo, this._context.mediaInfo.hsaAudio = n.hasAudio, this._datasizeValidator(e.datasize) && (this.emit(DEMUX_EVENTS$1$1.MEDIA_INFO), this._hasScript = !0), t && !t.hasSpecificConfig) {
          var s = t.meta;switch (n.audiosamplerate && (s.sampleRate = n.audiosamplerate), n.audiochannels && (s.channelCount = n.audiochannels), n.audiosamplerate) {case 44100:
              s.sampleRateIndex = 4;break;case 22050:
              s.sampleRateIndex = 7;break;case 11025:
              s.sampleRateIndex = 10;}
        }if (i && !i.hasSpecificConfig) {
          var o = i.meta;if ("number" == typeof n.framerate) {
            var l = Math.floor(1e3 * n.framerate);if (l > 0) {
              var u = l / 1e3;o.frameRate || (o.frameRate = {}), o.frameRate.fixed = !0, o.frameRate.fps = u, o.frameRate.fps_num = l, o.frameRate.fps_den = 1e3;
            }
          }
        }
      } }, { key: "_aacSequenceHeaderParser", value: function value(e) {
        var t = {};t.hasSpecificConfig = !0, t.objectType = e[1] >>> 3, t.sampleRateIndex = (7 & e[1]) << 1 | e[2] >>> 7, t.audiosamplerate = this._switchAudioSampleRate(t.sampleRateIndex), t.channelCount = (120 & e[2]) >>> 3, t.frameLength = (4 & e[2]) >>> 2, t.dependsOnCoreCoder = (2 & e[2]) >>> 1, t.extensionFlagIndex = 1 & e[2], t.codec = "mp4a.40." + t.objectType;var i = window.navigator.userAgent.toLowerCase(),
            r = void 0,
            a = void 0,
            n = t.sampleRateIndex;return -1 !== i.indexOf("firefox") ? t.sampleRateIndex >= 6 ? (t.objectType = 5, a = new Array(4), r = n - 3) : (t.objectType = 2, a = new Array(2), r = n) : -1 !== i.indexOf("android") ? (t.objectType = 2, a = new Array(2), r = n) : (t.objectType = 5, r = t.sampleRateIndex, a = new Array(4), t.sampleRateIndex >= 6 ? r = t.sampleRateIndex - 3 : 1 === t.channelCount && (t.objectType = 2, a = new Array(2), r = t.sampleRateIndex)), a[0] = t.objectType << 3, a[0] |= (15 & t.sampleRateIndex) >>> 1, a[1] = (15 & t.sampleRateIndex) << 7, a[1] |= (15 & t.channelCount) << 3, 5 === t.objectType && (a[1] |= (15 & r) >>> 1, a[2] = (1 & r) << 7, a[2] |= 8, a[3] = 0), t.config = a, t;
      } }, { key: "_parseAACData", value: function value(e) {
        var t = this.tracks.audioTrack;if (t) {
          var i = t.meta;i || (t.meta = new AudioTrackMeta$1$1(), i = t.meta);var r = this.loaderBuffer.shift(1)[0];e.data = this.loaderBuffer.shift(e.datasize - 1);var a = (240 & r) >>> 4;t.format = a, 10 !== a && this.emit(DEMUX_EVENTS$1$1.DEMUX_ERROR, new Error("invalid audio format: " + a)), 10 !== a || this._hasAudioSequence || (i.sampleRate = this._switchAudioSamplingFrequency(r), i.sampleRateIndex = (12 & r) >>> 2, i.frameLenth = (2 & r) >>> 1, i.channelCount = 1 & r, i.refSampleDuration = Math.floor(1024 / i.audioSampleRate * i.timescale));var n = i.audioSampleRate,
              s = i.sampleRateIndex,
              o = i.refSampleDuration;delete e.tagType;var l = this._datasizeValidator(e.datasize);if (0 === e.data[0]) {
            var u = this._aacSequenceHeaderParser(e.data);n = u.audiosamplerate || i.audioSampleRate, s = u.sampleRateIndex || i.sampleRateIndex, o = Math.floor(1024 / n * i.timescale), i.channelCount = u.channelCount, i.sampleRate = n, i.sampleRateIndex = s, i.refSampleDuration = o, i.duration = this._context.mediaInfo.duration * i.timescale, i.config = u.config;var h = this._context.mediaInfo.audio;h.codec = u.codec, h.channelCount = u.channelCount, h.sampleRate = n, h.sampleRateIndex = u.audioSampleRateIndex, this._hasScript && !this._hasAudioSequence ? this.emit(DEMUX_EVENTS$1$1.METADATA_PARSED, "audio") : this._hasScript && this._hasAudioSequence && this.emit(DEMUX_EVENTS$1$1.AUDIO_METADATA_CHANGE), this._hasAudioSequence = !0, this._metaChange = !0;
          } else this._metaChange && (e.options = { meta: t.meta }, this._metaChange = !1), e.data = e.data.slice(1, e.data.length), t.samples.push(e);l || this.emit(DEMUX_EVENTS$1$1.DEMUX_ERROR, this.TAG, new Error("TAG length error at " + e.datasize), !1);
        }
      } }, { key: "_parseHevcData", value: function value(e) {
        var t = this.loaderBuffer.shift(1)[0];e.frameType = (240 & t) >>> 4, e.isKeyframe = 1 === e.frameType;var i = 15 & t;if (this.tracks.videoTrack.codecID = i, e.avcPacketType = this.loaderBuffer.shift(1)[0], e.cts = this.loaderBuffer.toInt(0, 3), this.loaderBuffer.shift(3), 12 === i) {
          var r = this.loaderBuffer.shift(e.datasize - 5);if (e.data = r, 0 !== Number.parseInt(e.avcPacketType)) {
            this._datasizeValidator(e.datasize) || this.emit(DEMUX_EVENTS$1$1.DEMUX_ERROR, this.TAG, new Error("invalid video tag datasize: " + e.datasize), !1);var a = {},
                n = 0;for (a.cts = e.cts, a.dts = e.dts; e.data.length > n;) {
              var s = e.data.slice(Number.parseInt(n), 4 + n);a.size = s[3], a.size += 256 * s[2], a.size += 256 * s[1] * 256, a.size += 256 * s[0] * 256 * 256, n += 4, a.data = e.data.slice(Number.parseInt(n), a.size + n), n += a.size, this.tracks.videoTrack.samples.push(a), this.emit(DEMUX_EVENTS$1$1.METADATA_PARSED, "video");
            }
          } else 0 === Number.parseInt(e.avcPacketType) && (this._datasizeValidator(e.datasize) ? this.emit(DEMUX_EVENTS$1$1.METADATA_PARSED, "video") : this.emit(DEMUX_EVENTS$1$1.DEMUX_ERROR, this.TAG, new Error("invalid video tag datasize: " + e.datasize), !1));
        } else if (7 === i) {
          var o = this.loaderBuffer.shift(e.datasize - 5);if (0 === o[4] && 0 === o[5] && 0 === o[6] && 1 === o[7]) {
            for (var l = 0, u = 0; u < 4; u++) {
              l = 256 * l + o[u];
            }l -= 4, (o = o.slice(4, o.length))[3] = l % 256, l = (l - o[3]) / 256, o[2] = l % 256, l = (l - o[2]) / 256, o[1] = l % 256, o[0] = (l - o[1]) / 256;
          }if (e.data = o, 0 === e.avcPacketType) this._avcSequenceHeaderParser(e.data), this._datasizeValidator(e.datasize) && (this._hasScript && !this._hasVideoSequence ? this.emit(DEMUX_EVENTS$1$1.METADATA_PARSED, "video") : this._hasScript && this._hasVideoSequence && this.emit(DEMUX_EVENTS$1$1.VIDEO_METADATA_CHANGE), this._hasVideoSequence = !0), this._metaChange = !0;else {
            if (!this._datasizeValidator(e.datasize)) return void this.emit(DEMUX_EVENTS$1$1.DEMUX_ERROR, this.TAG, new Error("invalid video tag datasize: " + e.datasize), !1);this._metaChange && (e.options = { meta: Object.assign({}, this.tracks.videoTrack.meta) }, this._metaChange = !1), this.tracks.videoTrack.samples.push(e);
          }
        } else this.emit(DEMUX_EVENTS$1$1.DEMUX_ERROR, this.TAG, new Error("video codeid is " + i), !1), e.data = this.loaderBuffer.shift(e.datasize - 1), this._datasizeValidator(e.datasize) || this.emit(DEMUX_EVENTS$1$1.DEMUX_ERROR, this.TAG, new Error("invalid video tag datasize: " + e.datasize), !1), this.tracks.videoTrack.samples.push(e), this.emit(DEMUX_EVENTS$1$1.DEMUX_COMPLETE);delete e.tagType;
      } }, { key: "_avcSequenceHeaderParser", value: function value(e) {
        var t = this.tracks.videoTrack;if (t) {
          var i = 0;t.meta || (t.meta = new VideoTrackMeta$1$1());var r = t.meta;r.configurationVersion = e[0], r.avcProfileIndication = e[1], r.profileCompatibility = e[2], r.avcLevelIndication = e[3] / 10, r.nalUnitLength = 1 + (3 & e[4]);var a = 31 & e[5];i = 6;for (var n = {}, s = 0; s < a; s++) {
            var o = 255 * e[i] + e[i + 1];i += 2;for (var l = new Uint8Array(o), u = 0; u < o; u++) {
              l[u] = e[i + u];
            }for (var h = "avc1.", d = 1; d < 4; d++) {
              var f = l[d].toString(16);f.length < 2 && (f = "0" + f), h += f;
            }r.codec = h, i += o, this.tracks.videoTrack.meta.sps = l, n = SpsParser$1.parseSPS(l);
          }var c = e[i];i++;for (var p = 0; p < c; p++) {
            var v = 255 * e[i] + e[i + 1];i += 2;for (var E = new Uint8Array(v), m = 0; m < v; m++) {
              E[m] = e[i + m];
            }i += v, this.tracks.videoTrack.meta.pps = E;
          }Object.assign(r, SpsParser$1.toVideoMeta(n));var y = this._context.mediaInfo.video;y.codec = r.codec, y.profile = r.profile, y.level = r.level, y.chromaFormat = r.chromaFormat, y.frameRate = r.frameRate, y.parRatio = r.parRatio, y.width = y.width === r.presentWidth ? y.width : r.presentWidth, y.height = y.height === r.presentHeight ? y.width : r.presentHeight, r.duration = this._context.mediaInfo.duration * r.timescale, r.avcc = new Uint8Array(e.length), r.avcc.set(e), t.meta = r;
        }
      } }, { key: "_switchAudioSampleRate", value: function value(e) {
        return [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350][e];
      } }, { key: "_switchAudioSamplingFrequency", value: function value(e) {
        return [5500, 11025, 22050, 44100, 48e3][(12 & e) >>> 2];
      } }, { key: "_switchAudioChannel", value: function value(e) {
        return [1, 2][1 & e];
      } }, { key: "_datasizeValidator", value: function value(e) {
        var t = this.loaderBuffer.toInt(0, 4);return this.loaderBuffer.shift(4), t === e + 11;
      } }, { key: "loaderBuffer", get: function get() {
        var e = this._context.getInstance("LOADER_BUFFER");if (e) return e;this.emit(DEMUX_EVENTS$1$1.DEMUX_ERROR, new Error("找不到 loaderBuffer 实例"));
      } }, { key: "tracks", get: function get() {
        return this._context.getInstance("TRACKS");
      } }, { key: "logger", get: function get() {
        return this._context.getInstance("LOGGER");
      } }], [{ key: "isFlvFile", value: function value(e) {
        return !(70 !== e[0] || 76 !== e[1] || 86 !== e[2] || 1 !== e[3]);
      } }, { key: "getPlayType", value: function value(e) {
        var t = { hasVideo: !1, hasAudio: !1 };return !0 & e && (t.hasVideo = !0), !0 & e && (t.hasAudio = !0), t;
      } }]), e;
  }(),
      Fmp4$1 = function () {
    function e() {
      classCallCheck(this, e);
    }return createClass(e, null, [{ key: "size", value: function value(e) {
        return Buffer$1$1.writeUint32(e);
      } }, { key: "initBox", value: function value(t, i) {
        for (var r = new Buffer$1$1(), a = arguments.length, n = Array(a > 2 ? a - 2 : 0), s = 2; s < a; s++) {
          n[s - 2] = arguments[s];
        }return r.write.apply(r, [e.size(t), e.type(i)].concat(n)), r.buffer;
      } }, { key: "extension", value: function value(e, t) {
        return new Uint8Array([e, t >> 16 & 255, t >> 8 & 255, 255 & t]);
      } }, { key: "ftyp", value: function value() {
        return e.initBox(24, "ftyp", new Uint8Array([105, 115, 111, 109, 0, 0, 0, 1, 105, 115, 111, 109, 97, 118, 99, 49]));
      } }, { key: "moov", value: function value(t) {
        var i = t.type,
            r = t.meta,
            a = 8,
            n = e.mvhd(r.duration, r.timescale),
            s = void 0;s = "video" === i ? e.videoTrak(r) : e.audioTrak(r);var o = e.mvex(r.duration, r.timescale || 1e3, r.id);return [n, s, o].forEach(function (e) {
          a += e.byteLength;
        }), e.initBox(a, "moov", n, s, o);
      } }, { key: "mvhd", value: function value(t) {
        var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e3,
            r = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255]);return e.initBox(8 + r.length, "mvhd", new Uint8Array(r));
      } }, { key: "videoTrak", value: function value(t) {
        var i = 8,
            r = e.tkhd({ id: 1, duration: t.duration, timescale: t.timescale || 1e3, width: t.presentWidth, height: t.presentHeight, type: "video" }),
            a = e.mdia({ type: "video", timescale: t.timescale || 1e3, duration: t.duration, avcc: t.avcc, parRatio: t.parRatio, width: t.presentWidth, height: t.presentHeight });return [r, a].forEach(function (e) {
          i += e.byteLength;
        }), e.initBox(i, "trak", r, a);
      } }, { key: "audioTrak", value: function value(t) {
        var i = 8,
            r = e.tkhd({ id: 2, duration: t.duration, timescale: t.timescale || 1e3, width: 0, height: 0, type: "audio" }),
            a = e.mdia({ type: "audio", timescale: t.timescale || 1e3, duration: t.duration, channelCount: t.channelCount, samplerate: t.sampleRate, config: t.config });return [r, a].forEach(function (e) {
          i += e.byteLength;
        }), e.initBox(i, "trak", r, a);
      } }, { key: "tkhd", value: function value(t) {
        var i = t.id,
            r = t.duration,
            a = t.width,
            n = t.height,
            s = new Uint8Array([0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, 0, 0, 0, 0, r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, 255 & r, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, a >>> 8 & 255, 255 & a, 0, 0, n >>> 8 & 255, 255 & n, 0, 0]);return e.initBox(8 + s.byteLength, "tkhd", s);
      } }, { key: "edts", value: function value(t) {
        var i = new Buffer$1$1(),
            r = t.duration,
            a = t.mediaTime;return i.write(e.size(36), e.type("edts")), i.write(e.size(28), e.type("elst")), i.write(new Uint8Array([0, 0, 0, 1, r >> 24 & 255, r >> 16 & 255, r >> 8 & 255, 255 & r, a >> 24 & 255, a >> 16 & 255, a >> 8 & 255, 255 & a, 0, 0, 0, 1])), i.buffer;
      } }, { key: "mdia", value: function value(t) {
        var i = 8,
            r = e.mdhd(t.timescale, t.duration),
            a = e.hdlr(t.type),
            n = e.minf(t);return [r, a, n].forEach(function (e) {
          i += e.byteLength;
        }), e.initBox(i, "mdia", r, a, n);
      } }, { key: "mdhd", value: function value() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1e3,
            i = arguments[1],
            r = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, 85, 196, 0, 0]);return e.initBox(12 + r.byteLength, "mdhd", e.extension(0, 0), r);
      } }, { key: "hdlr", value: function value(t) {
        var i = [0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0];return "audio" === t && (i.splice.apply(i, [8, 4].concat([115, 111, 117, 110])), i.splice.apply(i, [24, 13].concat([83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0]))), e.initBox(8 + i.length, "hdlr", new Uint8Array(i));
      } }, { key: "minf", value: function value(t) {
        var i = 8,
            r = "video" === t.type ? e.vmhd() : e.smhd(),
            a = e.dinf(),
            n = e.stbl(t);return [r, a, n].forEach(function (e) {
          i += e.byteLength;
        }), e.initBox(i, "minf", r, a, n);
      } }, { key: "vmhd", value: function value() {
        return e.initBox(20, "vmhd", new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]));
      } }, { key: "smhd", value: function value() {
        return e.initBox(16, "smhd", new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]));
      } }, { key: "dinf", value: function value() {
        var t = new Buffer$1$1(),
            i = [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1];return t.write(e.size(36), e.type("dinf"), e.size(28), e.type("dref"), new Uint8Array(i)), t.buffer;
      } }, { key: "stbl", value: function value(t) {
        var i = 8,
            r = e.stsd(t),
            a = e.stts(),
            n = e.stsc(),
            s = e.stsz(),
            o = e.stco();return [r, a, n, s, o].forEach(function (e) {
          i += e.byteLength;
        }), e.initBox(i, "stbl", r, a, n, s, o);
      } }, { key: "stsd", value: function value(t) {
        var i = void 0;return i = "audio" === t.type ? e.mp4a(t) : e.avc1(t), e.initBox(16 + i.byteLength, "stsd", e.extension(0, 0), new Uint8Array([0, 0, 0, 1]), i);
      } }, { key: "mp4a", value: function value(t) {
        var i = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, t.channelCount, 0, 16, 0, 0, 0, 0, t.samplerate >> 8 & 255, 255 & t.samplerate, 0, 0]),
            r = e.esds(t.config);return e.initBox(8 + i.byteLength + r.byteLength, "mp4a", i, r);
      } }, { key: "esds", value: function value() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [43, 146, 8, 0],
            i = t.length,
            r = new Buffer$1$1(),
            a = new Uint8Array([0, 0, 0, 0, 3, 23 + i, 0, 1, 0, 4, 15 + i, 64, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5].concat([i]).concat(t).concat([6, 1, 2]));return r.write(e.size(8 + a.byteLength), e.type("esds"), a), r.buffer;
      } }, { key: "avc1", value: function value(t) {
        var i = new Buffer$1$1(),
            r = t.width,
            a = t.height,
            n = t.parRatio.height,
            s = t.parRatio.width,
            o = t.avcc,
            l = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, r >> 8 & 255, 255 & r, a >> 8 & 255, 255 & a, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 18, 100, 97, 105, 108, 121, 109, 111, 116, 105, 111, 110, 47, 104, 108, 115, 46, 106, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 17, 17]),
            u = new Uint8Array([0, 28, 156, 128, 0, 45, 198, 192, 0, 45, 198, 192]),
            h = new Uint8Array([n >> 24, n >> 16 & 255, n >> 8 & 255, 255 & n, s >> 24, s >> 16 & 255, s >> 8 & 255, 255 & s]);return i.write(e.size(40 + l.byteLength + o.byteLength + u.byteLength), e.type("avc1"), l, e.size(8 + o.byteLength), e.type("avcC"), o, e.size(20), e.type("btrt"), u, e.size(16), e.type("pasp"), h), i.buffer;
      } }, { key: "stts", value: function value() {
        var t = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);return e.initBox(16, "stts", t);
      } }, { key: "stsc", value: function value() {
        var t = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);return e.initBox(16, "stsc", t);
      } }, { key: "stco", value: function value() {
        var t = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);return e.initBox(16, "stco", t);
      } }, { key: "stsz", value: function value() {
        var t = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);return e.initBox(20, "stsz", t);
      } }, { key: "mvex", value: function value(t) {
        var i = arguments[2],
            r = new Buffer$1$1(),
            a = Buffer$1$1.writeUint32(t);return r.write(e.size(56), e.type("mvex"), e.size(16), e.type("mehd"), e.extension(0, 0), a, e.trex(i)), r.buffer;
      } }, { key: "trex", value: function value(t) {
        var i = new Uint8Array([0, 0, 0, 0, t >> 24, t >> 16 & 255, t >> 8 & 255, 255 & t, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]);return e.initBox(8 + i.byteLength, "trex", i);
      } }, { key: "moof", value: function value(t) {
        var i = 8,
            r = e.mfhd(),
            a = e.traf(t);return [r, a].forEach(function (e) {
          i += e.byteLength;
        }), e.initBox(i, "moof", r, a);
      } }, { key: "mfhd", value: function value() {
        var t = Buffer$1$1.writeUint32(e.sequence);return e.sequence += 1, e.initBox(16, "mfhd", e.extension(0, 0), t);
      } }, { key: "traf", value: function value(t) {
        var i = 8,
            r = e.tfhd(t.id),
            a = e.tfdt(t.time),
            n = e.sdtp(t),
            s = e.trun(t, n.byteLength);return [r, a, s, n].forEach(function (e) {
          i += e.byteLength;
        }), e.initBox(i, "traf", r, a, s, n);
      } }, { key: "tfhd", value: function value(t) {
        var i = Buffer$1$1.writeUint32(t);return e.initBox(16, "tfhd", e.extension(0, 0), i);
      } }, { key: "tfdt", value: function value(t) {
        return e.initBox(16, "tfdt", e.extension(0, 0), Buffer$1$1.writeUint32(t));
      } }, { key: "trun", value: function value(t, i) {
        var r = new Buffer$1$1(),
            a = Buffer$1$1.writeUint32(t.samples.length),
            n = Buffer$1$1.writeUint32(92 + 16 * t.samples.length + i);return r.write(e.size(20 + 16 * t.samples.length), e.type("trun"), new Uint8Array([0, 0, 15, 1]), a, n), t.samples.forEach(function (e) {
          var t = e.flags;r.write(new Uint8Array([e.duration >>> 24 & 255, e.duration >>> 16 & 255, e.duration >>> 8 & 255, 255 & e.duration, e.size >>> 24 & 255, e.size >>> 16 & 255, e.size >>> 8 & 255, 255 & e.size, t.isLeading << 2 | t.dependsOn, t.isDependedOn << 6 | t.hasRedundancy << 4 | t.isNonSync, 0, 0, e.cts >>> 24 & 255, e.cts >>> 16 & 255, e.cts >>> 8 & 255, 255 & e.cts]));
        }), r.buffer;
      } }, { key: "sdtp", value: function value(t) {
        var i = new Buffer$1$1();return i.write(e.size(12 + t.samples.length), e.type("sdtp"), e.extension(0, 0)), t.samples.forEach(function (e) {
          var t = e.flags,
              r = t.isLeading << 6 | t.dependsOn << 4 | t.isDependedOn << 2 | t.hasRedundancy;i.write(new Uint8Array([r]));
        }), i.buffer;
      } }, { key: "mdat", value: function value(t) {
        var i = new Buffer$1$1(),
            r = 8;t.samples.forEach(function (e) {
          r += e.size;
        }), i.write(e.size(r), e.type("mdat"));var a = new Uint8Array(r),
            n = 0;return a.set(i.buffer, n), n += 8, t.samples.forEach(function (e) {
          e.buffer.forEach(function (e) {
            a.set(e, n), n += e.byteLength;
          });
        }), a;
      } }]), e;
  }();Fmp4$1.type = function (e) {
    return new Uint8Array([e.charCodeAt(0), e.charCodeAt(1), e.charCodeAt(2), e.charCodeAt(3)]);
  }, Fmp4$1.sequence = 1;var REMUX_EVENTS$2$1 = EVENTS$1.REMUX_EVENTS,
      Mp4Remuxer$1 = function () {
    function e() {
      classCallCheck(this, e), this._dtsBase = 0, this._isDtsBaseInited = !1, this._audioNextDts = null, this._videoNextDts = null, this._videoSegmentList = new MediaSegmentList$1$1("video"), this._audioSegmentList = new MediaSegmentList$1$1("audio");var t = sniffer$1$1.browser;this._fillSilenceFrame = "ie" === t, this.isFirstVideo = !0, this.isFirstAudio = !0, this.videoAllDuration = 0, this.audioAllDuration = 0;
    }return createClass(e, [{ key: "init", value: function value() {
        this.on(REMUX_EVENTS$2$1.REMUX_MEDIA, this.remux.bind(this)), this.on(REMUX_EVENTS$2$1.REMUX_METADATA, this.onMetaDataReady.bind(this)), this.on(REMUX_EVENTS$2$1.DETECT_CHANGE_STREAM, this.resetDtsBase.bind(this));
      } }, { key: "destroy", value: function value() {
        this._dtsBase = -1, this._dtsBaseInited = !1, this._videoNextDts = null, this._audioNextDts = null, this._videoSegmentList.clear(), this._audioSegmentList.clear(), this._videoSegmentList = null, this._audioSegmentList = null;
      } }, { key: "remux", value: function value() {
        var e = this._context.getInstance("TRACKS"),
            t = e.audioTrack,
            i = e.videoTrack;!this._isDtsBaseInited && this.calcDtsBase(t, i), this._remuxVideo(i), this._remuxAudio(t);
      } }, { key: "resetDtsBase", value: function value() {
        this._dtsBase = 0, this._dtsBaseInited = !1;
      } }, { key: "seek", value: function value() {
        this._videoNextDts = null, this._audioNextDts = null, this._videoSegmentList.clear(), this._audioSegmentList.clear();
      } }, { key: "onMetaDataReady", value: function value(e) {
        var t = void 0;t = "audio" === e ? this._context.getInstance("TRACKS").audioTrack : this._context.getInstance("TRACKS").videoTrack;var i = this._context.getInstance("PRE_SOURCE_BUFFER"),
            r = i.getSource(e);r || (r = i.createSource(e)), r.mimetype = t.meta.codec, r.init = this.remuxInitSegment(e, t.meta), this.emit(REMUX_EVENTS$2$1.INIT_SEGMENT, e);
      } }, { key: "remuxInitSegment", value: function value(e, t) {
        var i = new Buffer$1$1(),
            r = Fmp4$1.ftyp(),
            a = Fmp4$1.moov({ type: e, meta: t });return i.write(r, a), i;
      } }, { key: "calcDtsBase", value: function value(e, t) {
        if (!e && t.samples.length) return t.samples[0].dts;if (e.samples.length || t.samples.length) {
          var i = 1 / 0,
              r = 1 / 0;e.samples && e.samples.length && (i = e.samples[0].dts), t.samples && t.samples.length && (r = t.samples[0].dts), this._dtsBase = Math.min(i, r), this._isDtsBaseInited = !0;
        }
      } }, { key: "_remuxVideo", value: function value(e) {
        var t = e || {};if (e.samples && e.samples.length) {
          for (var i = t.samples, r = -1, a = null, n = [], s = { samples: [] }, o = 1e4; i.length && o-- > 0;) {
            var l = i.shift(),
                u = l.isKeyframe,
                h = l.options;if (!this.isFirstAudio && h && h.meta) {
              a = this.remuxInitSegment("video", h.meta), h.meta = null, i.unshift(l), h.isContinue || this.resetDtsBase();break;
            }var d = l.dts - this._dtsBase;-1 === r && (r = d);var f = void 0,
                c = void 0;void 0 !== l.pts && (f = (c = l.pts - this._dtsBase) - d), void 0 !== l.cts && (c = l.cts + d, f = l.cts);var p = { buffer: [], size: 0 };s.samples.push(p), p.buffer.push(l.data), p.size += l.data.byteLength;var v = 0;v = l.duration ? l.duration : i.length >= 1 ? i[0].dts - this._dtsBase - d : n.length >= 1 ? n[n.length - 1].duration : this.videoMeta.refSampleDuration, this.videoAllDuration += v, n.push({ dts: d, cts: f, pts: c, data: l.data, size: l.data.byteLength, isKeyframe: u, duration: v, flags: { isLeading: 0, dependsOn: u ? 2 : 1, isDependedOn: u ? 1 : 0, hasRedundancy: 0, isNonSync: u ? 0 : 1 }, originDts: d, type: "video" }), u && this.emit(REMUX_EVENTS$2$1.RANDOM_ACCESS_POINT, c);
          }var E = new Buffer$1$1();if (n.length) {
            var m = Fmp4$1.moof({ id: t.meta.id, time: r, samples: n }),
                y = Fmp4$1.mdat(s);E.write(m, y), this.writeToSource("video", E);
          }if (a && (this.writeToSource("video", a), i.length)) return t.samples = i, this._remuxVideo(t);this.isFirstVideo = !1, this.emit(REMUX_EVENTS$2$1.MEDIA_SEGMENT, "video");var _ = n[n.length - 1];this._videoNextDts = _.dts + _.duration, t.samples = [], t.length = 0;
        }
      } }, { key: "_remuxAudio", value: function value(e) {
        var t = (e || {}).samples,
            i = -1,
            r = [],
            a = null,
            n = { samples: [] };if (t && t.length) {
          for (var s = 1e4, o = !1; t.length && s-- > 0;) {
            var l = t.shift(),
                u = l.data,
                h = l.options;if (!this.isFirstAudio && h && h.meta) {
              a = this.remuxInitSegment("audio", h.meta), h.meta = null, t.unshift(l), h.isContinue || this.resetDtsBase();break;
            }var d = l.dts - this._dtsBase,
                f = d;o || (i = d, o = !0);var c = 0;c = l.duration ? l.duration : this.audioMeta.refSampleDurationFixed ? this.audioMeta.refSampleDurationFixed : t.length >= 1 ? t[0].dts - this._dtsBase - d : r.length >= 1 ? r[r.length - 1].duration : this.audioMeta.refSampleDuration, this.audioAllDuration += c;var p = { dts: d, pts: d, cts: 0, size: u.byteLength, duration: l.duration ? l.duration : c, flags: { isLeading: 0, dependsOn: 2, isDependedOn: 1, hasRedundancy: 0, isNonSync: 0 }, isKeyframe: !0, originDts: f, type: "audio" },
                v = { buffer: [], size: 0 };v.buffer.push(u), v.size += u.byteLength, n.samples.push(v), r.push(p);
          }var E = new Buffer$1$1();if (r.length) {
            var m = Fmp4$1.moof({ id: e.meta.id, time: i, samples: r }),
                y = Fmp4$1.mdat(n);E.write(m, y), this.writeToSource("audio", E);
          }if (a && (this.writeToSource("audio", a), t.length)) return e.samples = t, this._remuxAudio(e);this.isFirstAudio = !1, this.emit(REMUX_EVENTS$2$1.MEDIA_SEGMENT, "audio", E);var _ = r[r.length - 1];this._videoNextDts = _.dts + _.duration, e.samples = [], e.length = 0;
        }
      } }, { key: "writeToSource", value: function value(e, t) {
        var i = this._context.getInstance("PRE_SOURCE_BUFFER"),
            r = i.getSource(e);r || (r = i.createSource(e)), r.data.push(t);
      } }, { key: "initSilentAudio", value: function value(t, i) {
        var r = e.getSilentFrame(this._audioMeta.channelCount);return { dts: t, pts: t, cts: 0, duration: i, unit: r, size: r.byteLength, originDts: t, type: "video" };
      } }, { key: "videoMeta", get: function get() {
        return this._context.getInstance("TRACKS").videoTrack.meta;
      } }, { key: "audioMeta", get: function get() {
        return this._context.getInstance("TRACKS").audioTrack.meta;
      } }], [{ key: "getSilentFrame", value: function value(e) {
        return 1 === e ? new Uint8Array([0, 200, 0, 128, 35, 128]) : 2 === e ? new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128]) : 3 === e ? new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142]) : 4 === e ? new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56]) : 5 === e ? new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56]) : 6 === e ? new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224]) : null;
      } }]), e;
  }(),
      LOADER_EVENTS$2$1 = EVENTS$1.LOADER_EVENTS,
      READ_STREAM$1 = 0,
      READ_TEXT$1 = 1,
      READ_JSON$1 = 2,
      READ_BUFFER$1 = 3,
      FetchLoader$2 = function () {
    function e(t) {
      classCallCheck(this, e), this.configs = Object.assign({}, t), this.url = null, this.status = 0, this.error = null, this._reader = null, this._canceled = !1, this._destroyed = !1, this.readtype = this.configs.readtype, this.buffer = this.configs.buffer || "LOADER_BUFFER", this._loaderTaskNo = 0;
    }return createClass(e, [{ key: "init", value: function value() {
        this.on(LOADER_EVENTS$2$1.LADER_START, this.load.bind(this));
      } }, { key: "load", value: function value(e, t) {
        var i = this;this.url = e, this._canceled = !1;var r = this.getParams(t);return i.loading = !0, fetch(this.url, r).then(function (e) {
          if (e.ok) return i.status = e.status, i._onFetchResponse(e);i.loading = !1, i.emit(LOADER_EVENTS$2$1.LOADER_ERROR, i.TAG, new Error("invalid response."));
        }).catch(function (e) {
          throw i.loading = !1, i.emit(LOADER_EVENTS$2$1.LOADER_ERROR, i.TAG, e), new Error(e.message);
        });
      } }, { key: "_onFetchResponse", value: function value(e) {
        var t = this,
            i = this._context.getInstance(this.buffer),
            r = ++this._loaderTaskNo;if (!0 === e.ok) switch (this.readtype) {case READ_JSON$1:
            e.json().then(function (e) {
              t.loading = !1, t._canceled || t._destroyed || (i ? (i.push(e), t.emit(LOADER_EVENTS$2$1.LOADER_COMPLETE, i)) : t.emit(LOADER_EVENTS$2$1.LOADER_COMPLETE, e));
            });break;case READ_TEXT$1:
            e.text().then(function (e) {
              t.loading = !1, t._canceled || t._destroyed || (i ? (i.push(e), t.emit(LOADER_EVENTS$2$1.LOADER_COMPLETE, i)) : t.emit(LOADER_EVENTS$2$1.LOADER_COMPLETE, e));
            });break;case READ_BUFFER$1:
            e.arrayBuffer().then(function (e) {
              t.loading = !1, t._canceled || t._destroyed || (i ? (i.push(new Uint8Array(e)), t.emit(LOADER_EVENTS$2$1.LOADER_COMPLETE, i)) : t.emit(LOADER_EVENTS$2$1.LOADER_COMPLETE, e));
            });break;case READ_STREAM$1:default:
            return this._onReader(e.body.getReader(), r);}
      } }, { key: "_onReader", value: function value(e, t) {
        var i = this._context.getInstance(this.buffer);if (!i && this._reader || this._destroyed) try {
          this._reader.cancel();
        } catch (e) {}if (this._reader = e, !1 !== this.loading) {
          var r = this;this._reader && this._reader.read().then(function (a) {
            if (!r._canceled && !r._destroyed) return a.done ? (r.loading = !1, r.status = 0, void r.emit(LOADER_EVENTS$2$1.LOADER_COMPLETE, i)) : (i.push(a.value), r.emit(LOADER_EVENTS$2$1.LOADER_DATALOADED, i), r._onReader(e, t));if (r._reader) try {
              r._reader.cancel();
            } catch (e) {}
          }).catch(function (e) {
            r.loading = !1, r.emit(LOADER_EVENTS$2$1.LOADER_ERROR, r.TAG, e);
          });
        }
      } }, { key: "getParams", value: function value(e) {
        var t = Object.assign({}, e),
            i = new Headers(),
            r = { method: "GET", headers: i, mode: "cors", cache: "default" };if ("object" === _typeof(this.configs.headers)) {
          var a = this.configs.headers;for (var n in a) {
            a.hasOwnProperty(n) && i.append(n, a[n]);
          }
        }if ("object" === _typeof(t.headers)) {
          var s = t.headers;for (var o in s) {
            s.hasOwnProperty(o) && i.append(o, s[o]);
          }
        }return !1 === t.cors && (r.mode = "same-origin"), t.withCredentials && (r.credentials = "include"), r;
      } }, { key: "cancel", value: function value() {
        if (this._reader) {
          try {
            this._reader.cancel();
          } catch (e) {}this._reader = null, this.loading = !1;
        }this._canceled = !0;
      } }, { key: "destroy", value: function value() {
        this._destroyed = !0, this.cancel();
      } }], [{ key: "type", get: function get() {
        return "loader";
      } }]), e;
  }(),
      FetchLoader$1$1 = FetchLoader$2,
      REMUX_EVENTS$3$1 = EVENTS$1.REMUX_EVENTS,
      DEMUX_EVENTS$2$1 = EVENTS$1.DEMUX_EVENTS,
      LOADER_EVENTS$3$1 = EVENTS$1.LOADER_EVENTS,
      Tag$1 = "FLVController",
      Logger$1 = function () {
    function e() {
      classCallCheck$2(this, e);
    }return createClass$2(e, [{ key: "warn", value: function value() {} }]), e;
  }(),
      FLV_ERROR$1 = "FLV_ERROR",
      FlvController$1 = function () {
    function e(t) {
      classCallCheck$2(this, e), this.TAG = Tag$1, this._player = t, this.state = { initSegmentArrived: !1, range: { start: 0, end: "" }, rangeSupport: !0 };
    }return createClass$2(e, [{ key: "init", value: function value() {
        var e = this;this._context.registry("FETCH_LOADER", FetchLoader$1$1), this._context.registry("LOADER_BUFFER", XgBuffer$1$1), this._context.registry("FLV_DEMUXER", FlvDemuxer$2), this._context.registry("TRACKS", Tracks$1$1), this._context.registry("MP4_REMUXER", Mp4Remuxer$1.Mp4Remuxer), this._context.registry("PRE_SOURCE_BUFFER", PreSource$1$1), this._context.registry("COMPATIBILITY", Compatibility$1$1), this._context.registry("LOGGER", Logger$1), this.mse = this._context.registry("MSE", Mse$1)({ container: this._player.video }), this.initListeners(), setTimeout(function () {
          e.loadMeta();
        }, 0);
      } }, { key: "initListeners", value: function value() {
        this.on(LOADER_EVENTS$3$1.LOADER_DATALOADED, this._handleLoaderDataLoaded.bind(this)), this.on(LOADER_EVENTS$3$1.LOADER_ERROR, this._handleNetworkError.bind(this)), this.on(DEMUX_EVENTS$2$1.MEDIA_INFO, this._handleMediaInfo.bind(this)), this.on(DEMUX_EVENTS$2$1.METADATA_PARSED, this._handleMetadataParsed.bind(this)), this.on(DEMUX_EVENTS$2$1.DEMUX_COMPLETE, this._handleDemuxComplete.bind(this)), this.on(DEMUX_EVENTS$2$1.DEMUX_ERROR, this._handleDemuxError.bind(this)), this.on(REMUX_EVENTS$3$1.INIT_SEGMENT, this._handleAppendInitSegment.bind(this)), this.on(REMUX_EVENTS$3$1.MEDIA_SEGMENT, this._handleMediaSegment.bind(this));
      } }, { key: "_handleMediaInfo", value: function value() {
        var e = this;this._context.onMetaData || this.emit(DEMUX_EVENTS$2$1.DEMUX_ERROR, new Error("failed to get mediainfo"));var t = this._context.getInstance("LOADER_BUFFER"),
            i = this._context.getInstance("FETCH_LOADER");this.isSeekable && (i.cancel(), this.state.range = { start: 0, end: t.historyLen - 1 }, setTimeout(function () {
          e.loadNext(0);
        }));
      } }, { key: "_handleLoaderDataLoaded", value: function value() {
        this.emitTo("FLV_DEMUXER", DEMUX_EVENTS$2$1.DEMUX_START);
      } }, { key: "_handleMetadataParsed", value: function value(e) {
        this.emit(REMUX_EVENTS$3$1.REMUX_METADATA, e);
      } }, { key: "_handleDemuxComplete", value: function value() {
        this.emit(REMUX_EVENTS$3$1.REMUX_MEDIA);
      } }, { key: "_handleAppendInitSegment", value: function value() {
        this.state.initSegmentArrived = !0, this.mse.addSourceBuffers();
      } }, { key: "_handleMediaSegment", value: function value() {
        this.mse.addSourceBuffers(), this.mse.doAppend();
      } }, { key: "_handleNetworkError", value: function value(e, t) {
        this._player.emit("error", new Player.Errors("network", this._player.config.url)), this._onError(LOADER_EVENTS$3$1.LOADER_ERROR, e, t, !0);
      } }, { key: "_handleDemuxError", value: function value(e, t, i) {
        void 0 === i && (i = !1), this._player.emit("error", new Player.Errors("parse", this._player.config.url)), this._onError(LOADER_EVENTS$3$1.LOADER_ERROR, e, t, i);
      } }, { key: "_onError", value: function value(e, t, i, r) {
        var a = { errorType: e, errorDetails: "[" + t + "]: " + i.message, errorFatal: r || !1 };this._player.emit(FLV_ERROR$1, a);
      } }, { key: "seek", value: function value(e) {
        if (!this._context.onMetaData) return void this.loadMeta();if (this.isSeekable) {
          this._context.getInstance("LOADER_BUFFER").clear();var t = this._player.config.preloadTime,
              i = void 0 === t ? 15 : t,
              r = this.getSeekRange(e, i);this.state.range = r, this.compat && this.compat.reset(), this.loadData();
        }
      } }, { key: "loadNext", value: function value(e) {
        this._context.onMetaData && (this.loader.loading || this.getNextRange(e) && this.loadData());
      } }, { key: "loadData", value: function value() {
        var e = this.state.range,
            t = e.start,
            i = e.end;this.emit(LOADER_EVENTS$3$1.LADER_START, this._player.config.url, { headers: { method: "get", Range: "bytes=" + t + "-" + i } });
      } }, { key: "loadMeta", value: function value() {
        var e = this;this.loader.load(this._player.config.url, { headers: { Range: "bytes=0-" } }).catch(function () {
          e.state.rangeSupport = !1, e.loadFallback();
        });
      } }, { key: "loadFallback", value: function value() {
        var e = this;this.loader.load(this._player.config.url).catch(function () {
          e._player.emit("error", new Player.Errors("network", e._player.config.url));
        });
      } }, { key: "getSeekRange", value: function value(t, i) {
        var r = this._context.onMetaData.keyframes,
            a = this._context.mediaInfo.duration,
            n = t,
            s = t + i,
            o = e.findFilePosition(n, r);return s >= a || n >= a ? { start: o, end: "" } : { start: o, end: e.findFilePosition(s, r) };
      } }, { key: "getNextRange", value: function value(e) {
        if ("" !== this.state.range.end) {
          var t = this.getSeekRange(e, this.config.preloadTime || 15).end;if (!(t <= this.state.range.end && "" !== t)) return this.state.range = { start: this.state.range.end + 1, end: t }, !0;
        }
      } }, { key: "destroy", value: function value() {
        this._player = null, this.mse = null, this.state = { initSegmentArrived: !1, range: { start: 0, end: "" }, rangeSupport: !0 };
      } }, { key: "isSeekable", get: function get() {
        return !!this.state.rangeSupport && (!this._context || !this._context.mediaInfo.isComplete() || null !== this._context.mediaInfo.keyframes && void 0 !== this._context.mediaInfo.keyframes);
      } }, { key: "config", get: function get() {
        return this._player.config;
      } }, { key: "loader", get: function get() {
        return this._context.getInstance("FETCH_LOADER");
      } }, { key: "compat", get: function get() {
        return this._context.getInstance("COMPATIBILITY");
      } }], [{ key: "findFilePosition", value: function value(e, t) {
        for (var i = 0, r = t.times.length; i < r; i++) {
          var a = t.times[i],
              n = i + 1 < r ? t.times[i + 1] : Number.MAX_SAFE_INTEGER;if (a <= e && e <= n) return t.filepositions[i];
        }return "";
      } }]), e;
  }(),
      flvAllowedEvents$1 = EVENTS$1.FlvAllowedEvents,
      isEnded = function isEnded(e, t) {
    if (!e.config.isLive && e.duration - e.currentTime < 2) {
      var i = e.getBufferedRange();e.currentTime - i[1] < .1 && (e.emit("ended"), t.mse.endOfStream());
    }
  },
      FlvVodPlayer = function (e) {
    function t(e) {
      classCallCheck$2(this, t);var i = possibleConstructorReturn$2(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));return i.context = new Context$1$1(flvAllowedEvents$1), i.initEvents(), i;
    }return inherits$2(t, e), createClass$2(t, [{ key: "start", value: function value() {
        var e = this.context.registry("FLV_CONTROLLER", FlvController$1)(this);this.flv = e, this.context.init(), get$2(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "start", this).call(this, e.mse.url);
      } }, { key: "initEvents", value: function value() {
        this.on("timeupdate", this.handleTimeUpdate.bind(this)), this.on("seeking", this.handleSeek.bind(this)), this.once("destroy", this._destroy.bind(this));
      } }, { key: "handleTimeUpdate", value: function value() {
        this.loadData(), isEnded(this, this.flv);
      } }, { key: "handleSeek", value: function value() {
        var e = this.currentTime,
            t = this.getBufferedRange();(e > t[1] || e < t[0]) && this.flv.seek(this.currentTime);
      } }, { key: "_destroy", value: function value() {
        this.context.destroy(), this.context = null, this.flv = null;
      } }, { key: "loadData", value: function value() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.currentTime,
            t = this.getBufferedRange();t[1] - e < (this.config.preloadTime || 15) - 5 && this.flv.loadNext(t[1] + 1);
      } }, { key: "src", get: function get() {
        return this.currentSrc;
      }, set: function set(e) {
        var t = this;this.player.config.url = e, this.paused ? this.start(e) : (this.pause(), this.once("pause", function () {
          t.start(e);
        }), this.once("canplay", function () {
          t.play();
        })), this.once("canplay", function () {
          t.currentTime = 0;
        });
      } }]), t;
  }(Player);

  var FlvPlayer$1 = function FlvPlayer$1(config) {
    classCallCheck(this, FlvPlayer$1);

    if (config.isLive) {
      return new FlvPlayer(config);
    } else {
      return new FlvVodPlayer(config);
    }
  };

  return FlvPlayer$1;

})));
//# sourceMappingURL=index.js.map
