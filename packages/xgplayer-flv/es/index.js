import Player from 'xgplayer';

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

function _classCallCheck(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function EventHandlers() {}function EventEmitter() {
  EventEmitter.init.call(this);
}function $getMaxListeners(e) {
  return void 0 === e._maxListeners ? EventEmitter.defaultMaxListeners : e._maxListeners;
}function emitNone(e, t, i) {
  if (t) e.call(i);else for (var r = e.length, n = arrayClone(e, r), a = 0; a < r; ++a) {
    n[a].call(i);
  }
}function emitOne(e, t, i, r) {
  if (t) e.call(i, r);else for (var n = e.length, a = arrayClone(e, n), s = 0; s < n; ++s) {
    a[s].call(i, r);
  }
}function emitTwo(e, t, i, r, n) {
  if (t) e.call(i, r, n);else for (var a = e.length, s = arrayClone(e, a), o = 0; o < a; ++o) {
    s[o].call(i, r, n);
  }
}function emitThree(e, t, i, r, n, a) {
  if (t) e.call(i, r, n, a);else for (var s = e.length, o = arrayClone(e, s), u = 0; u < s; ++u) {
    o[u].call(i, r, n, a);
  }
}function emitMany(e, t, i, r) {
  if (t) e.apply(i, r);else for (var n = e.length, a = arrayClone(e, n), s = 0; s < n; ++s) {
    a[s].apply(i, r);
  }
}function _addListener(e, t, i, r) {
  var n, a, s;if ("function" != typeof i) throw new TypeError('"listener" argument must be a function');if (a = e._events, a ? (a.newListener && (e.emit("newListener", t, i.listener ? i.listener : i), a = e._events), s = a[t]) : (a = e._events = new EventHandlers(), e._eventsCount = 0), s) {
    if ("function" == typeof s ? s = a[t] = r ? [i, s] : [s, i] : r ? s.unshift(i) : s.push(i), !s.warned && (n = $getMaxListeners(e)) && n > 0 && s.length > n) {
      s.warned = !0;var o = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + t + " listeners added. Use emitter.setMaxListeners() to increase limit");o.name = "MaxListenersExceededWarning", o.emitter = e, o.type = t, o.count = s.length, emitWarning(o);
    }
  } else s = a[t] = i, ++e._eventsCount;return e;
}function emitWarning(e) {
  "function" == typeof console.warn ? console.warn(e) : console.log(e);
}function _onceWrap(e, t, i) {
  function r() {
    e.removeListener(t, r), n || (n = !0, i.apply(e, arguments));
  }var n = !1;return r.listener = i, r;
}function listenerCount(e) {
  var t = this._events;if (t) {
    var i = t[e];if ("function" == typeof i) return 1;if (i) return i.length;
  }return 0;
}function spliceOne(e, t) {
  for (var i = t, r = i + 1, n = e.length; r < n; i += 1, r += 1) {
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
}function _possibleConstructorReturn(e, t) {
  if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" !== (void 0 === t ? "undefined" : _typeof$1(t)) && "function" != typeof t ? e : t;
}function _inherits(e, t) {
  if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : _typeof$1(t)));e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}function _classCallCheck$1(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$2(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$3(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$4(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$5(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$6(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$7(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$8(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$9(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function unwrapExports(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}function createCommonjsModule(e, t) {
  return t = { exports: {} }, e(t, t.exports), t.exports;
}function _classCallCheck$a(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$b(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$c(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$d(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$e(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$f(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$g(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$h(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$i(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$j(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _possibleConstructorReturn$1(e, t) {
  if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" !== (void 0 === t ? "undefined" : _typeof$1(t)) && "function" != typeof t ? e : t;
}function _inherits$1(e, t) {
  if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : _typeof$1(t)));e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}function _classCallCheck$k(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$l(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$m(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$n(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$o(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$p(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$q(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$r(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}var _createClass = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }return function (t, i, r) {
    return i && e(t.prototype, i), r && e(t, r), t;
  };
}(),
    isObjectFilled = function isObjectFilled(e) {
  for (var t in e) {
    if (e.hasOwnProperty(t) && null === e[t]) return !1;
  }return !0;
},
    MediaInfo = function () {
  function e() {
    _classCallCheck(this, e), this.mimeType = null, this.duration = null, this.hasVideo = null, this.video = { codec: null, width: null, height: null, profile: null, level: null, frameRate: { fixed: !0, fps: 25, fps_num: 25e3, fps_den: 1e3 }, chromaFormat: null, parRatio: { width: 1, height: 1 } }, this.hasAudio = null, this.audio = { codec: null, sampleRate: null, sampleRateIndex: null, channelCount: null };
  }return _createClass(e, [{ key: "isComplete", value: function value() {
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
      n,
      a,
      s,
      o,
      u = "error" === e;if (s = this._events) u = u && null == s.error;else if (!u) return !1;if (o = this.domain, u) {
    if (t = arguments[1], !o) {
      if (t instanceof Error) throw t;var l = new Error('Uncaught, unspecified "error" event. (' + t + ")");throw l.context = t, l;
    }return t || (t = new Error('Uncaught, unspecified "error" event')), t.domainEmitter = this, t.domain = o, t.domainThrown = !1, o.emit("error", t), !1;
  }if (!(i = s[e])) return !1;var c = "function" == typeof i;switch (r = arguments.length) {case 1:
      emitNone(i, c, this);break;case 2:
      emitOne(i, c, this, arguments[1]);break;case 3:
      emitTwo(i, c, this, arguments[1], arguments[2]);break;case 4:
      emitThree(i, c, this, arguments[1], arguments[2], arguments[3]);break;default:
      for (n = new Array(r - 1), a = 1; a < r; a++) {
        n[a - 1] = arguments[a];
      }emitMany(i, c, this, n);}return !0;
}, EventEmitter.prototype.addListener = function (e, t) {
  return _addListener(this, e, t, !1);
}, EventEmitter.prototype.on = EventEmitter.prototype.addListener, EventEmitter.prototype.prependListener = function (e, t) {
  return _addListener(this, e, t, !0);
}, EventEmitter.prototype.once = function (e, t) {
  if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');return this.on(e, _onceWrap(this, e, t)), this;
}, EventEmitter.prototype.prependOnceListener = function (e, t) {
  if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');return this.prependListener(e, _onceWrap(this, e, t)), this;
}, EventEmitter.prototype.removeListener = function (e, t) {
  var i, r, n, a, s;if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');if (!(r = this._events)) return this;if (!(i = r[e])) return this;if (i === t || i.listener && i.listener === t) 0 == --this._eventsCount ? this._events = new EventHandlers() : (delete r[e], r.removeListener && this.emit("removeListener", e, i.listener || t));else if ("function" != typeof i) {
    for (n = -1, a = i.length; a-- > 0;) {
      if (i[a] === t || i[a].listener && i[a].listener === t) {
        s = i[a].listener, n = a;break;
      }
    }if (n < 0) return this;if (1 === i.length) {
      if (i[0] = void 0, 0 == --this._eventsCount) return this._events = new EventHandlers(), this;delete r[e];
    } else spliceOne(i, n);r.removeListener && this.emit("removeListener", e, s || t);
  }return this;
}, EventEmitter.prototype.removeAllListeners = function (e) {
  var t, i;if (!(i = this._events)) return this;if (!i.removeListener) return 0 === arguments.length ? (this._events = new EventHandlers(), this._eventsCount = 0) : i[e] && (0 == --this._eventsCount ? this._events = new EventHandlers() : delete i[e]), this;if (0 === arguments.length) {
    for (var r, n = Object.keys(i), a = 0; a < n.length; ++a) {
      "removeListener" !== (r = n[a]) && this.removeAllListeners(r);
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
};var _typeof$1 = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
  return typeof e === "undefined" ? "undefined" : _typeof(e);
} : function (e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
},
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
    get = function e(t, i, r) {
  null === t && (t = Function.prototype);var n = Object.getOwnPropertyDescriptor(t, i);if (void 0 === n) {
    var a = Object.getPrototypeOf(t);return null === a ? void 0 : e(a, i, r);
  }if ("value" in n) return n.value;var s = n.get;if (void 0 !== s) return s.call(r);
},
    inherits = function inherits(e, t) {
  if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : _typeof(t)));e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
},
    possibleConstructorReturn = function possibleConstructorReturn(e, t) {
  if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && "function" != typeof t ? e : t;
},
    _get = function e(t, i, r) {
  null === t && (t = Function.prototype);var n = Object.getOwnPropertyDescriptor(t, i);if (void 0 === n) {
    var a = Object.getPrototypeOf(t);return null === a ? void 0 : e(a, i, r);
  }if ("value" in n) return n.value;var s = n.get;if (void 0 !== s) return s.call(r);
},
    _createClass$1 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }return function (t, i, r) {
    return i && e(t.prototype, i), r && e(t, r), t;
  };
}(),
    DIRECT_EMIT_FLAG = "__TO__",
    Context = function () {
  function e() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];_classCallCheck$1(this, e), this._emitter = new EventEmitter(), this._instanceMap = {}, this._clsMap = {}, this._inited = !1, this.mediaInfo = new MediaInfo(), this.allowedEvents = t, this._hooks = {}, this._emitCounter = {};
  }return _createClass$1(e, [{ key: "getInstance", value: function value(e) {
      var t = this._instanceMap[e];return t || null;
    } }, { key: "initInstance", value: function value(e) {
      if (this._clsMap[e]) {
        for (var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) {
          i[r - 1] = arguments[r];
        }var n = new (Function.prototype.bind.apply(this._clsMap[e], [null].concat(i)))();return this._instanceMap[e] = n, n.init && n.init(), n;
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
          n = this._isMessageNameValid.bind(this),
          a = this,
          s = function (t) {
        function i(t, r, n) {
          _classCallCheck$1(this, i);var s = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, t, r, n));return s.listeners = {}, s.onceListeners = {}, s.TAG = e, s._context = a, s;
        }return _inherits(i, t), _createClass$1(i, [{ key: "on", value: function value(t, i) {
            return n(t), this.listeners[t] ? this.listeners[t].push(i) : this.listeners[t] = [i], r.on("" + t + DIRECT_EMIT_FLAG + e, i), r.on(t, i);
          } }, { key: "before", value: function value(e, t) {
            n(e), a._hooks[e] ? a._hooks[e].push(t) : a._hooks[e] = [t];
          } }, { key: "once", value: function value(t, i) {
            return n(t), this.onceListeners[t] ? this.onceListeners[t].push(i) : this.onceListeners[t] = [i], r.once("" + t + DIRECT_EMIT_FLAG + e, i), r.once(t, i);
          } }, { key: "emit", value: function value(e) {
            if (n(e), a._emitCounter[e]) {
              if (a._emitCounter[e] += 1, a._emitCounter[e] % 1e3 == 0) {
                window.console && (window.console.warn("invoke: ", e), window.localStorage.setItem("xgplayer_invoke_" + e, a._emitCounter[e]));
              }
            } else a._emitCounter[e] = 1;var t = a._hooks ? a._hooks[e] : null;if (t) for (var i = 0, s = t.length; i < s; i++) {
              (0, t[i])();
            }for (var o = arguments.length, u = Array(o > 1 ? o - 1 : 0), l = 1; l < o; l++) {
              u[l - 1] = arguments[l];
            }return r.emit.apply(r, [e].concat(u));
          } }, { key: "emitTo", value: function value(e, t) {
            n(t);for (var i = arguments.length, a = Array(i > 2 ? i - 2 : 0), s = 2; s < i; s++) {
              a[s - 2] = arguments[s];
            }return r.emit.apply(r, ["" + t + DIRECT_EMIT_FLAG + e].concat(a));
          } }, { key: "off", value: function value(e, t) {
            return n(e), r.off(e, t);
          } }, { key: "removeListeners", value: function value() {
            var t = Object.prototype.hasOwnProperty.bind(this.listeners);for (var i in this.listeners) {
              if (t(i)) for (var n = this.listeners[i] || [], a = 0; a < n.length; a++) {
                var s = n[a];r.off(i, s), r.off("" + i + DIRECT_EMIT_FLAG + e, s);
              }
            }for (var o in this.onceListeners) {
              if (t(o)) for (var u = this.onceListeners[o] || [], l = 0; l < u.length; l++) {
                var c = u[l];r.off(o, c), r.off("" + o + DIRECT_EMIT_FLAG + e, c);
              }
            }
          } }, { key: "destroy", value: function value() {
            if (this.removeListeners(), this.listeners = {}, delete a._instanceMap[e], _get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "destroy", this)) return _get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "destroy", this).call(this);
          } }]), i;
      }(t);return this._clsMap[e] = s, function () {
        for (var t = arguments.length, r = Array(t), n = 0; n < t; n++) {
          r[n] = arguments[n];
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
        n = /(?:Firefox)/.test(e),
        a = /(?:iPad|PlayBook)/.test(e) || r && !/(?:Mobile)/.test(e) || n && /(?:Tablet)/.test(e),
        s = /(?:iPhone)/.test(e) && !a;return { isTablet: a, isPhone: s, isAndroid: r, isPc: !s && !r && !i, isSymbian: i, isWindowsPhone: t, isFireFox: n };
  }, get isLe() {
    return le;
  } },
    le$1 = function () {
  var e = new ArrayBuffer(2);return new DataView(e).setInt16(0, 256, !0), 256 === new Int16Array(e)[0];
}(),
    _createClass$2 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }return function (t, i, r) {
    return i && e(t.prototype, i), r && e(t, r), t;
  };
}(),
    UTF8 = function () {
  function e() {
    _classCallCheck$2(this, e);
  }return _createClass$2(e, null, [{ key: "decode", value: function value(t) {
      for (var i = [], r = t, n = 0, a = t.length; n < a;) {
        if (r[n] < 128) i.push(String.fromCharCode(r[n])), ++n;else {
          if (r[n] < 192) ;else if (r[n] < 224) {
            if (e._checkContinuation(r, n, 1)) {
              var s = (31 & r[n]) << 6 | 63 & r[n + 1];if (s >= 128) {
                i.push(String.fromCharCode(65535 & s)), n += 2;continue;
              }
            }
          } else if (r[n] < 240) {
            if (e._checkContinuation(r, n, 2)) {
              var o = (15 & r[n]) << 12 | (63 & r[n + 1]) << 6 | 63 & r[n + 2];if (o >= 2048 && 55296 != (63488 & o)) {
                i.push(String.fromCharCode(65535 & o)), n += 3;continue;
              }
            }
          } else if (r[n] < 248 && e._checkContinuation(r, n, 3)) {
            var u = (7 & r[n]) << 18 | (63 & r[n + 1]) << 12 | (63 & r[n + 2]) << 6 | 63 & r[n + 3];if (u > 65536 && u < 1114112) {
              u -= 65536, i.push(String.fromCharCode(u >>> 10 | 55296)), i.push(String.fromCharCode(1023 & u | 56320)), n += 4;continue;
            }
          }i.push(String.fromCharCode(65533)), ++n;
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
    _slicedToArray = function () {
  function e(e, t) {
    var i = [],
        r = !0,
        n = !1,
        a = void 0;try {
      for (var s, o = e[Symbol.iterator](); !(r = (s = o.next()).done) && (i.push(s.value), !t || i.length !== t); r = !0) {}
    } catch (e) {
      n = !0, a = e;
    } finally {
      try {
        !r && o.return && o.return();
      } finally {
        if (n) throw a;
      }
    }return i;
  }return function (t, i) {
    if (Array.isArray(t)) return t;if (Symbol.iterator in Object(t)) return e(t, i);throw new TypeError("Invalid attempt to destructure non-iterable instance");
  };
}(),
    _createClass$3 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }return function (t, i, r) {
    return i && e(t.prototype, i), r && e(t, r), t;
  };
}(),
    MediaSample = function () {
  function e(t) {
    var i = this;_classCallCheck$3(this, e);var r = e.getDefaultInf();if (!t || "[object Object]" !== Object.prototype.toString.call(t)) return r;var n = Object.assign({}, r, t);Object.entries(n).forEach(function (e) {
      var t = _slicedToArray(e, 2),
          r = t[0],
          n = t[1];i[r] = n;
    });
  }return _createClass$3(e, null, [{ key: "getDefaultInf", value: function value() {
      return { dts: null, pts: null, duration: null, position: null, isRAP: !1, originDts: null };
    } }]), e;
}(),
    _createClass$4 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }return function (t, i, r) {
    return i && e(t.prototype, i), r && e(t, r), t;
  };
}(),
    MediaSegment = function () {
  function e() {
    _classCallCheck$4(this, e), this.startDts = -1, this.endDts = -1, this.startPts = -1, this.endPts = -1, this.originStartDts = -1, this.originEndDts = -1, this.randomAccessPoints = [], this.firstSample = null, this.lastSample = null;
  }return _createClass$4(e, [{ key: "addRAP", value: function value(e) {
      e.isRAP = !0, this.randomAccessPoints.push(e);
    } }]), e;
}(),
    _createClass$5 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }return function (t, i, r) {
    return i && e(t.prototype, i), r && e(t, r), t;
  };
}(),
    MediaSegmentList = function () {
  function e(t) {
    _classCallCheck$5(this, e), this._type = t, this._list = [], this._lastAppendLocation = -1;
  }return _createClass$5(e, [{ key: "isEmpty", value: function value() {
      return 0 === this._list.length;
    } }, { key: "clear", value: function value() {
      this._list = [], this._lastAppendLocation = -1;
    } }, { key: "_searchNearestSegmentBefore", value: function value(e) {
      var t = this._list;if (0 === t.length) return -2;var i = t.length - 1,
          r = 0,
          n = 0,
          a = i,
          s = 0;if (e < t[0].originDts) return s = -1;for (; n <= a;) {
        if ((r = n + Math.floor((a - n) / 2)) === i || e > t[r].lastSample.originDts && e < t[r + 1].originDts) {
          s = r;break;
        }t[r].originDts < e ? n = r + 1 : a = r - 1;
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
    _createClass$6 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }return function (t, i, r) {
    return i && e(t.prototype, i), r && e(t, r), t;
  };
}(),
    AudioTrackMeta = function () {
  function e(t) {
    _classCallCheck$6(this, e);var i = { sampleRate: 48e3, channelCount: 2, codec: "mp4a.40.2", config: [41, 401, 136, 0], duration: 0, id: 2, refSampleDuration: 21, sampleRateIndex: 3, timescale: 1e3, type: "audio" };return t ? Object.assign({}, i, t) : i;
  }return _createClass$6(e, [{ key: "destroy", value: function value() {
      this.init = null;
    } }]), e;
}(),
    VideoTrackMeta = function () {
  function e(t) {
    _classCallCheck$6(this, e);var i = { avcc: null, sps: new Uint8Array(0), pps: new Uint8Array(0), chromaFormat: 420, codec: "avc1.640020", codecHeight: 720, codecWidth: 1280, duration: 0, frameRate: { fixed: !0, fps: 25, fps_num: 25e3, fps_den: 1e3 }, id: 1, level: "3.2", presentHeight: 720, presentWidth: 1280, profile: "High", refSampleDuration: 40, parRatio: { height: 1, width: 1 }, timescale: 1e3, type: "video" };return t ? Object.assign({}, i, t) : i;
  }return _createClass$6(e, [{ key: "destroy", value: function value() {
      this.init = null, this.sps = null, this.pps = null;
    } }]), e;
}(),
    _createClass$7 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }return function (t, i, r) {
    return i && e(t.prototype, i), r && e(t, r), t;
  };
}(),
    AudioTrackSample = function () {
  function e(t) {
    _classCallCheck$7(this, e);var i = e.getDefault();return t ? Object.assign({}, i, t) : i;
  }return _createClass$7(e, null, [{ key: "getDefault", value: function value() {
      return { dts: null, pts: null, data: new Uint8Array() };
    } }]), e;
}(),
    VideoTrackSample = function () {
  function e(t) {
    _classCallCheck$7(this, e);var i = e.getDefault();return t ? Object.assign({}, i, t) : i;
  }return _createClass$7(e, null, [{ key: "getDefault", value: function value() {
      return { dts: null, pts: null, isKeyframe: !1, originDts: null, data: new Uint8Array() };
    } }]), e;
}(),
    _createClass$8 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }return function (t, i, r) {
    return i && e(t.prototype, i), r && e(t, r), t;
  };
}(),
    MSE = function () {
  function e(t) {
    _classCallCheck$8(this, e), this.configs = Object.assign({}, t), this.container = this.configs.container, this.mediaSource = null, this.sourceBuffers = {}, this.preloadTime = this.configs.preloadTime || 1, this.onSourceOpen = this.onSourceOpen.bind(this), this.onTimeUpdate = this.onTimeUpdate.bind(this), this.onUpdateEnd = this.onUpdateEnd.bind(this), this.onWaiting = this.onWaiting.bind(this);
  }return _createClass$8(e, [{ key: "init", value: function value() {
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
            i = void 0;e = e.sources;for (var r = !1, n = 0, a = Object.keys(e).length; n < a; n++) {
          var s = Object.keys(e)[n];if ("audio" === s ? i = t.audioTrack : "video" === s && (i = t.videoTrack), i) {
            var o = "audio" === s ? 21 : 40;i.meta && i.meta.refSampleDuration && (o = i.meta.refSampleDuration), e[s].data.length >= this.preloadTime / o && (r = !0);
          }
        }if (r) {
          if (Object.keys(this.sourceBuffers).length > 0) return;for (var u = 0, l = Object.keys(e).length; u < l; u++) {
            var c = Object.keys(e)[u],
                f = e[c],
                h = "video" === c ? "video/mp4;codecs=" + f.mimetype : "audio/mp4;codecs=" + f.mimetype,
                d = this.mediaSource.addSourceBuffer(h);this.sourceBuffers[c] = d, d.addEventListener("updateend", this.onUpdateEnd), this.doAppend();
          }
        }
      }
    } }, { key: "doAppend", value: function value() {
      var e = this._context.getInstance("PRE_SOURCE_BUFFER");if (e) for (var t = 0; t < Object.keys(this.sourceBuffers).length; t++) {
        var i = Object.keys(this.sourceBuffers)[t],
            r = this.sourceBuffers[i];if (!r.updating) {
          var n = e.sources[i];if (n && !n.inited) r.appendBuffer(n.init.buffer.buffer), n.inited = !0;else if (n) {
            var a = n.data.shift();a && r.appendBuffer(a.buffer.buffer);
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
          var n = t.sourceBuffers[Object.keys(t.sourceBuffers)[r]];n.removeEventListener("updateend", t.onUpdateEnd);var a = void 0;a = n.updating ? new Promise(function (t) {
            var i = function i() {
              var r = 3,
                  a = function i() {
                n.updating ? r > 0 ? (setTimeout(i, 200), r--) : t() : (e.clearBuffer(n), n.addEventListener("updateend", function () {
                  t();
                }));
              };setTimeout(a, 200), n.removeEventListener("updateend", i);
            };n.addEventListener("updateend", i);
          }) : new Promise(function (t) {
            e.clearBuffer(n), n.addEventListener("updateend", function () {
              t();
            });
          }), i.push(a);
        }(r);
      }return Promise.all(i);
    } }, { key: "destroy", value: function value() {
      var e = this;return this.removeBuffers().then(function () {
        for (var t = 0; t < Object.keys(e.sourceBuffers).length; t++) {
          var i = e.sourceBuffers[Object.keys(e.sourceBuffers)[t]];e.mediaSource.removeSourceBuffer(i), delete e.sourceBuffers[Object.keys(e.sourceBuffers)[t]];
        }e.container.removeEventListener("timeupdate", e.onTimeUpdate), e.container.removeEventListener("waiting", e.onWaiting), e.mediaSource.removeEventListener("sourceopen", e.onSourceOpen), e.endOfStream(), window.URL.revokeObjectURL(e.url), e.url = null, e.configs = {}, e.container = null, e.mediaSource = null, e.sourceBuffers = {}, e.preloadTime = 1;
      });
    } }], [{ key: "clearBuffer", value: function value(e) {
      for (var t = e.buffered, i = .1, r = 0, n = t.length; r < n; r++) {
        i = t.end(r);
      }try {
        e.remove(0, i);
      } catch (e) {}
    } }]), e;
}(),
    _createClass$9 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }return function (t, i, r) {
    return i && e(t.prototype, i), r && e(t, r), t;
  };
}(),
    Stream = function () {
  function e(t) {
    if (_classCallCheck$9(this, e), !(t instanceof ArrayBuffer)) throw new Error("data is invalid");this.buffer = t, this.dataview = new DataView(t), this.dataview.position = 0;
  }return _createClass$9(e, [{ key: "back", value: function value(e) {
      this.position -= e;
    } }, { key: "skip", value: function value(t) {
      for (var i = Math.floor(t / 4), r = t % 4, n = 0; n < i; n++) {
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
    for (var t = 0, i = arguments.length, r = Array(i > 1 ? i - 1 : 0), n = 1; n < i; n++) {
      r[n - 1] = arguments[n];
    }var a = !0,
        s = !1,
        o = void 0;try {
      for (var u, l = r[Symbol.iterator](); !(a = (u = l.next()).done); a = !0) {
        t += u.value.length;
      }
    } catch (e) {
      s = !0, o = e;
    } finally {
      try {
        !a && l.return && l.return();
      } finally {
        if (s) throw o;
      }
    }var c = new e(t),
        f = 0,
        h = !0,
        d = !1,
        p = void 0;try {
      for (var v, y = r[Symbol.iterator](); !(h = (v = y.next()).done); h = !0) {
        var m = v.value;c.set(m, f), f += m.length;
      }
    } catch (e) {
      d = !0, p = e;
    } finally {
      try {
        !h && y.return && y.return();
      } finally {
        if (d) throw p;
      }
    }return c;
  };
});unwrapExports(concat);var lib = createCommonjsModule(function (e) {
  var t = function (e) {
    return e && e.__esModule ? e : { default: e };
  }(concat);e.exports = t.default;
}),
    Concat = unwrapExports(lib),
    _createClass$a = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }return function (t, i, r) {
    return i && e(t.prototype, i), r && e(t, r), t;
  };
}(),
    Buffer = function () {
  function e(t) {
    _classCallCheck$a(this, e), this.buffer = t || new Uint8Array(0);
  }return _createClass$a(e, [{ key: "write", value: function value() {
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
    _createClass$b = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }return function (t, i, r) {
    return i && e(t.prototype, i), r && e(t, r), t;
  };
}(),
    CRYTO_EVENTS$1 = _EVENTS.CRYTO_EVENTS,
    Crypto = function () {
  function e(t) {
    _classCallCheck$b(this, e), this.inputBuffer = t.inputbuffer, this.outputBuffer = t.outputbuffer, this.key = t.key, this.iv = t.iv, this.method = t.method, this.crypto = window.crypto || window.msCrypto;
  }return _createClass$b(e, [{ key: "init", value: function value() {
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
    _createClass$c = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }return function (t, i, r) {
    return i && e(t.prototype, i), r && e(t, r), t;
  };
}(),
    Fmp4 = function () {
  function e() {
    _classCallCheck$c(this, e);
  }return _createClass$c(e, null, [{ key: "size", value: function value(e) {
      return Buffer$1.writeUint32(e);
    } }, { key: "initBox", value: function value(t, i) {
      for (var r = new Buffer$1(), n = arguments.length, a = Array(n > 2 ? n - 2 : 0), s = 2; s < n; s++) {
        a[s - 2] = arguments[s];
      }return r.write.apply(r, [e.size(t), e.type(i)].concat(a)), r.buffer;
    } }, { key: "extension", value: function value(e, t) {
      return new Uint8Array([e, t >> 16 & 255, t >> 8 & 255, 255 & t]);
    } }, { key: "ftyp", value: function value() {
      return e.initBox(24, "ftyp", new Uint8Array([105, 115, 111, 109, 0, 0, 0, 1, 105, 115, 111, 109, 97, 118, 99, 49]));
    } }, { key: "moov", value: function value(t) {
      var i = t.type,
          r = t.meta,
          n = 8,
          a = e.mvhd(r.duration, r.timescale),
          s = void 0;s = "video" === i ? e.videoTrak(r) : e.audioTrak(r);var o = e.mvex(r.duration, r.timescale || 1e3, r.id);return [a, s, o].forEach(function (e) {
        n += e.byteLength;
      }), e.initBox(n, "moov", a, s, o);
    } }, { key: "mvhd", value: function value(t) {
      var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e3,
          r = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255]);return e.initBox(8 + r.length, "mvhd", new Uint8Array(r));
    } }, { key: "videoTrak", value: function value(t) {
      var i = 8,
          r = e.tkhd({ id: 1, duration: t.duration, timescale: t.timescale || 1e3, width: t.presentWidth, height: t.presentHeight, type: "video" }),
          n = e.mdia({ type: "video", timescale: t.timescale || 1e3, duration: t.duration, avcc: t.avcc, parRatio: t.parRatio, width: t.presentWidth, height: t.presentHeight });return [r, n].forEach(function (e) {
        i += e.byteLength;
      }), e.initBox(i, "trak", r, n);
    } }, { key: "audioTrak", value: function value(t) {
      var i = 8,
          r = e.tkhd({ id: 2, duration: t.duration, timescale: t.timescale || 1e3, width: 0, height: 0, type: "audio" }),
          n = e.mdia({ type: "audio", timescale: t.timescale || 1e3, duration: t.duration, channelCount: t.channelCount, samplerate: t.sampleRate, config: t.config });return [r, n].forEach(function (e) {
        i += e.byteLength;
      }), e.initBox(i, "trak", r, n);
    } }, { key: "tkhd", value: function value(t) {
      var i = t.id,
          r = t.duration,
          n = t.width,
          a = t.height,
          s = new Uint8Array([0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, 0, 0, 0, 0, r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, 255 & r, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, n >>> 8 & 255, 255 & n, 0, 0, a >>> 8 & 255, 255 & a, 0, 0]);return e.initBox(8 + s.byteLength, "tkhd", s);
    } }, { key: "edts", value: function value(t) {
      var i = new Buffer$1(),
          r = t.duration,
          n = t.mediaTime;return i.write(e.size(36), e.type("edts")), i.write(e.size(28), e.type("elst")), i.write(new Uint8Array([0, 0, 0, 1, r >> 24 & 255, r >> 16 & 255, r >> 8 & 255, 255 & r, n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, 255 & n, 0, 0, 0, 1])), i.buffer;
    } }, { key: "mdia", value: function value(t) {
      var i = 8,
          r = e.mdhd(t.timescale, t.duration),
          n = e.hdlr(t.type),
          a = e.minf(t);return [r, n, a].forEach(function (e) {
        i += e.byteLength;
      }), e.initBox(i, "mdia", r, n, a);
    } }, { key: "mdhd", value: function value() {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1e3,
          i = arguments[1],
          r = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, 85, 196, 0, 0]);return e.initBox(12 + r.byteLength, "mdhd", e.extension(0, 0), r);
    } }, { key: "hdlr", value: function value(t) {
      var i = [0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0];return "audio" === t && (i.splice.apply(i, [8, 4].concat([115, 111, 117, 110])), i.splice.apply(i, [24, 13].concat([83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0]))), e.initBox(8 + i.length, "hdlr", new Uint8Array(i));
    } }, { key: "minf", value: function value(t) {
      var i = 8,
          r = "video" === t.type ? e.vmhd() : e.smhd(),
          n = e.dinf(),
          a = e.stbl(t);return [r, n, a].forEach(function (e) {
        i += e.byteLength;
      }), e.initBox(i, "minf", r, n, a);
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
          n = e.stts(),
          a = e.stsc(),
          s = e.stsz(),
          o = e.stco();return [r, n, a, s, o].forEach(function (e) {
        i += e.byteLength;
      }), e.initBox(i, "stbl", r, n, a, s, o);
    } }, { key: "stsd", value: function value(t) {
      var i = void 0;return i = "audio" === t.type ? e.mp4a(t) : e.avc1(t), e.initBox(16 + i.byteLength, "stsd", e.extension(0, 0), new Uint8Array([0, 0, 0, 1]), i);
    } }, { key: "mp4a", value: function value(t) {
      var i = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, t.channelCount, 0, 16, 0, 0, 0, 0, t.samplerate >> 8 & 255, 255 & t.samplerate, 0, 0]),
          r = e.esds(t.config);return e.initBox(8 + i.byteLength + r.byteLength, "mp4a", i, r);
    } }, { key: "esds", value: function value() {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [43, 146, 8, 0],
          i = t.length,
          r = new Buffer$1(),
          n = new Uint8Array([0, 0, 0, 0, 3, 23 + i, 0, 1, 0, 4, 15 + i, 64, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5].concat([i]).concat(t).concat([6, 1, 2]));return r.write(e.size(8 + n.byteLength), e.type("esds"), n), r.buffer;
    } }, { key: "avc1", value: function value(t) {
      var i = new Buffer$1(),
          r = t.width,
          n = t.height,
          a = t.parRatio.height,
          s = t.parRatio.width,
          o = t.avcc,
          u = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, r >> 8 & 255, 255 & r, n >> 8 & 255, 255 & n, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 18, 100, 97, 105, 108, 121, 109, 111, 116, 105, 111, 110, 47, 104, 108, 115, 46, 106, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 17, 17]),
          l = new Uint8Array([0, 28, 156, 128, 0, 45, 198, 192, 0, 45, 198, 192]),
          c = new Uint8Array([a >> 24, a >> 16 & 255, a >> 8 & 255, 255 & a, s >> 24, s >> 16 & 255, s >> 8 & 255, 255 & s]);return i.write(e.size(40 + u.byteLength + o.byteLength + l.byteLength), e.type("avc1"), u, e.size(8 + o.byteLength), e.type("avcC"), o, e.size(20), e.type("btrt"), l, e.size(16), e.type("pasp"), c), i.buffer;
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
          n = Buffer$1.writeUint32(t);return r.write(e.size(56), e.type("mvex"), e.size(16), e.type("mehd"), e.extension(0, 0), n, e.trex(i)), r.buffer;
    } }, { key: "trex", value: function value(t) {
      var i = new Uint8Array([0, 0, 0, 0, t >> 24, t >> 16 & 255, t >> 8 & 255, 255 & t, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]);return e.initBox(8 + i.byteLength, "trex", i);
    } }, { key: "moof", value: function value(t) {
      var i = 8,
          r = e.mfhd(),
          n = e.traf(t);return [r, n].forEach(function (e) {
        i += e.byteLength;
      }), e.initBox(i, "moof", r, n);
    } }, { key: "mfhd", value: function value() {
      var t = Buffer$1.writeUint32(e.sequence);return e.sequence += 1, e.initBox(16, "mfhd", e.extension(0, 0), t);
    } }, { key: "traf", value: function value(t) {
      var i = 8,
          r = e.tfhd(t.id),
          n = e.tfdt(t.time),
          a = e.sdtp(t),
          s = e.trun(t, a.byteLength);return [r, n, s, a].forEach(function (e) {
        i += e.byteLength;
      }), e.initBox(i, "traf", r, n, s, a);
    } }, { key: "tfhd", value: function value(t) {
      var i = Buffer$1.writeUint32(t);return e.initBox(16, "tfhd", e.extension(0, 0), i);
    } }, { key: "tfdt", value: function value(t) {
      return e.initBox(16, "tfdt", e.extension(0, 0), Buffer$1.writeUint32(t));
    } }, { key: "trun", value: function value(t, i) {
      var r = new Buffer$1(),
          n = Buffer$1.writeUint32(t.samples.length),
          a = Buffer$1.writeUint32(92 + 16 * t.samples.length + i);return r.write(e.size(20 + 16 * t.samples.length), e.type("trun"), new Uint8Array([0, 0, 15, 1]), n, a), t.samples.forEach(function (e) {
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
      }), i.write(e.size(r), e.type("mdat"));var n = new Uint8Array(r),
          a = 0;return n.set(i.buffer, a), a += 8, t.samples.forEach(function (e) {
        e.buffer.forEach(function (e) {
          n.set(e, a), a += e.byteLength;
        });
      }), n;
    } }]), e;
}();Fmp4.type = function (e) {
  return new Uint8Array([e.charCodeAt(0), e.charCodeAt(1), e.charCodeAt(2), e.charCodeAt(3)]);
}, Fmp4.sequence = 1;var _createClass$d = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }return function (t, i, r) {
    return i && e(t.prototype, i), r && e(t, r), t;
  };
}(),
    REMUX_EVENTS$1 = EVENTS.REMUX_EVENTS,
    Mp4Remuxer = function () {
  function e() {
    _classCallCheck$d(this, e), this._dtsBase = 0, this._isDtsBaseInited = !1, this._audioNextDts = null, this._videoNextDts = null, this._videoSegmentList = new MediaSegmentList$1("video"), this._audioSegmentList = new MediaSegmentList$1("audio");var t = sniffer$1.browser;this._fillSilenceFrame = "ie" === t, this.isFirstVideo = !0, this.isFirstAudio = !0, this.videoAllDuration = 0, this.audioAllDuration = 0;
  }return _createClass$d(e, [{ key: "init", value: function value() {
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
          n = Fmp4.moov({ type: e, meta: t });return i.write(r, n), i;
    } }, { key: "calcDtsBase", value: function value(e, t) {
      if (!e && t.samples.length) return t.samples[0].dts;if (e.samples.length || t.samples.length) {
        var i = 1 / 0,
            r = 1 / 0;e.samples && e.samples.length && (i = e.samples[0].dts), t.samples && t.samples.length && (r = t.samples[0].dts), this._dtsBase = Math.min(i, r), this._isDtsBaseInited = !0;
      }
    } }, { key: "_remuxVideo", value: function value(e) {
      var t = e || {};if (e.samples && e.samples.length) {
        for (var i = t.samples, r = -1, n = null, a = [], s = { samples: [] }, o = 1e4; i.length && o-- > 0;) {
          var u = i.shift(),
              l = u.isKeyframe,
              c = u.options;if (!this.isFirstAudio && c && c.meta) {
            n = this.remuxInitSegment("video", c.meta), c.meta = null, i.unshift(u), c.isContinue || this.resetDtsBase();break;
          }var f = u.dts - this._dtsBase;-1 === r && (r = f);var h = void 0,
              d = void 0;void 0 !== u.pts && (h = (d = u.pts - this._dtsBase) - f), void 0 !== u.cts && (d = u.cts + f, h = u.cts);var p = { buffer: [], size: 0 };s.samples.push(p), p.buffer.push(u.data), p.size += u.data.byteLength;var v = 0;v = u.duration ? u.duration : i.length >= 1 ? i[0].dts - this._dtsBase - f : a.length >= 1 ? a[a.length - 1].duration : this.videoMeta.refSampleDuration, this.videoAllDuration += v, a.push({ dts: f, cts: h, pts: d, data: u.data, size: u.data.byteLength, isKeyframe: l, duration: v, flags: { isLeading: 0, dependsOn: l ? 2 : 1, isDependedOn: l ? 1 : 0, hasRedundancy: 0, isNonSync: l ? 0 : 1 }, originDts: f, type: "video" }), l && this.emit(REMUX_EVENTS$1.RANDOM_ACCESS_POINT, d);
        }var y = new Buffer$1();if (a.length) {
          var m = Fmp4.moof({ id: t.meta.id, time: r, samples: a }),
              _ = Fmp4.mdat(s);y.write(m, _), this.writeToSource("video", y);
        }if (n && (this.writeToSource("video", n), i.length)) return t.samples = i, this._remuxVideo(t);this.isFirstVideo = !1, this.emit(REMUX_EVENTS$1.MEDIA_SEGMENT, "video");var E = a[a.length - 1];this._videoNextDts = E.dts + E.duration, t.samples = [], t.length = 0;
      }
    } }, { key: "_remuxAudio", value: function value(e) {
      var t = (e || {}).samples,
          i = -1,
          r = [],
          n = null,
          a = { samples: [] };if (t && t.length) {
        for (var s = 1e4, o = !1; t.length && s-- > 0;) {
          var u = t.shift(),
              l = u.data,
              c = u.options;if (!this.isFirstAudio && c && c.meta) {
            n = this.remuxInitSegment("audio", c.meta), c.meta = null, t.unshift(u), c.isContinue || this.resetDtsBase();break;
          }var f = u.dts - this._dtsBase,
              h = f;o || (i = f, o = !0);var d = 0;d = u.duration ? u.duration : this.audioMeta.refSampleDurationFixed ? this.audioMeta.refSampleDurationFixed : t.length >= 1 ? t[0].dts - this._dtsBase - f : r.length >= 1 ? r[r.length - 1].duration : this.audioMeta.refSampleDuration, this.audioAllDuration += d;var p = { dts: f, pts: f, cts: 0, size: l.byteLength, duration: u.duration ? u.duration : d, flags: { isLeading: 0, dependsOn: 2, isDependedOn: 1, hasRedundancy: 0, isNonSync: 0 }, isKeyframe: !0, originDts: h, type: "audio" },
              v = { buffer: [], size: 0 };v.buffer.push(l), v.size += l.byteLength, a.samples.push(v), r.push(p);
        }var y = new Buffer$1();if (r.length) {
          var m = Fmp4.moof({ id: e.meta.id, time: i, samples: r }),
              _ = Fmp4.mdat(a);y.write(m, _), this.writeToSource("audio", y);
        }if (n && (this.writeToSource("audio", n), t.length)) return e.samples = t, this._remuxAudio(e);this.isFirstAudio = !1, this.emit(REMUX_EVENTS$1.MEDIA_SEGMENT, "audio", y);var E = r[r.length - 1];this._videoNextDts = E.dts + E.duration, e.samples = [], e.length = 0;
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
    Remuxer = { Mp4Remuxer: Mp4Remuxer },
    _createClass$e = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }return function (t, i, r) {
    return i && e(t.prototype, i), r && e(t, r), t;
  };
}(),
    M3U8Parser = function () {
  function e() {
    _classCallCheck$e(this, e);
  }return _createClass$e(e, null, [{ key: "parse", value: function value(t) {
      var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
          r = { duration: 0 };if (t && t.split) {
        var n = t.split(/\r|\n/),
            a = (n = n.filter(function (e) {
          return e;
        })).shift();if (!a.match("#EXTM3U")) throw new Error('Invalid m3u8 file: not "#EXTM3U"');a = n.shift();for (var s = !1; a;) {
          var o = a.match(/#(.[A-Z|-]*):(.*)/),
              u = a.match(/#(.[A-Z|-]*)/);if (u && o && o.length > 2) switch (o[1]) {case "EXT-X-VERSION":
              r.version = parseInt(o[2]);break;case "EXT-X-MEDIA-SEQUENCE":
              r.sequence = parseInt(o[2]);break;case "EXT-X-TARGETDURATION":
              r.targetduration = parseFloat(o[2]);break;case "EXTINF":
              e.parseFrag(o, n, r, i, s), s = !1;break;case "EXT-X-KEY":
              e.parseDecrypt(o[2], r);}if (u && u.length > 1) switch (u[1]) {case "EXT-X-DISCONTINUITY":
              s = !0;}a = n.shift();
        }return r;
      }
    } }, { key: "parseFrag", value: function value(e, t, i, r, n) {
      i.frags || (i.frags = []);var a = { start: i.duration, duration: 1e3 * parseFloat(e[2]) };i.duration += a.duration;var s = t.shift();s.match(/#(.*):(.*)/) && (s = t.shift()), s.length > 0 && "/" === s.charAt(0) && r.match(/.*\/\/.*\.\w+/g) && (r = r.match(/.*\/\/.*\.\w+/g)[0]), s.match(/.*:\/\/.*/) ? a.url = s : a.url = r + s, a.discontinue = n, i.frags.push(a);
    } }, { key: "parseURL", value: function value(e) {
      var t = "",
          i = e.match(/(.*\/).*\.m3u8/);if (i && i.length > 0) for (var r = 0; r < i.length; r++) {
        i[r].match(/.*\/$/g) && i[r].length > t.length && (t = i[r]);
      }return t;
    } }, { key: "parseDecrypt", value: function value(e, t) {
      t.encrypt = {};var i = e.split(",");for (var r in i) {
        var n = i[r];if (n.match(/METHOD=(.*)/) && (t.encrypt.method = n.match(/METHOD=(.*)/)[1]), n.match(/URI="(.*)"/) && (t.encrypt.uri = n.match(/URI="(.*)"/)[1]), n.match(/IV=0x(.*)/)) {
          var a = n.match(/IV=0x(.*)/)[1],
              s = Math.ceil(a.length / 2);t.encrypt.ivb = new Uint8Array(s);for (var o = s - 1; o >= 0; o--) {
            var u = parseInt(a.substr(2 * o, 2), 16);t.encrypt.ivb[o] = u;
          }t.encrypt.iv = a;
        }
      }
    } }]), e;
}(),
    _createClass$f = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }return function (t, i, r) {
    return i && e(t.prototype, i), r && e(t, r), t;
  };
}(),
    Golomb = function () {
  function e(t) {
    _classCallCheck$f(this, e), this.TAG = "Golomb", this._buffer = t, this._bufferIndex = 0, this._totalBytes = t.byteLength, this._totalBits = 8 * t.byteLength, this._currentWord = 0, this._currentWordBitsLeft = 0;
  }return _createClass$f(e, [{ key: "destroy", value: function value() {
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
    _createClass$g = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }return function (t, i, r) {
    return i && e(t.prototype, i), r && e(t, r), t;
  };
}(),
    SPSParser = function () {
  function e() {
    _classCallCheck$g(this, e);
  }return _createClass$g(e, null, [{ key: "_ebsp2rbsp", value: function value(e) {
      for (var t = e, i = t.byteLength, r = new Uint8Array(i), n = 0, a = 0; a < i; a++) {
        a >= 2 && 3 === t[a] && 0 === t[a - 1] && 0 === t[a - 2] || (r[n] = t[a], n++);
      }return new Uint8Array(r.buffer, 0, n);
    } }, { key: "parseSPS", value: function value(t) {
      var i = e._ebsp2rbsp(t),
          r = new Golomb(i);r.readByte();var n = r.readByte();r.readByte();var a = r.readByte();r.readUEG();var s = e.getProfileString(n),
          o = e.getLevelString(a),
          u = 1,
          l = 420,
          c = [0, 420, 422, 444],
          f = 8;if ((100 === n || 110 === n || 122 === n || 244 === n || 44 === n || 83 === n || 86 === n || 118 === n || 128 === n || 138 === n || 144 === n) && (3 === (u = r.readUEG()) && r.readBits(1), u <= 3 && (l = c[u]), f = r.readUEG() + 8, r.readUEG(), r.readBits(1), r.readBool())) for (var h = 3 !== u ? 8 : 12, d = 0; d < h; d++) {
        r.readBool() && (d < 6 ? e._skipScalingList(r, 16) : e._skipScalingList(r, 64));
      }r.readUEG();var p = r.readUEG();if (0 === p) r.readUEG();else if (1 === p) {
        r.readBits(1), r.readSEG(), r.readSEG();for (var v = r.readUEG(), y = 0; y < v; y++) {
          r.readSEG();
        }
      }r.readUEG(), r.readBits(1);var m = r.readUEG(),
          _ = r.readUEG(),
          E = r.readBits(1);0 === E && r.readBits(1), r.readBits(1);var g = 0,
          k = 0,
          S = 0,
          T = 0;r.readBool() && (g = r.readUEG(), k = r.readUEG(), S = r.readUEG(), T = r.readUEG());var b = 1,
          A = 1,
          w = 0,
          C = !0,
          D = 0,
          R = 0;if (r.readBool()) {
        if (r.readBool()) {
          var L = r.readByte(),
              U = [1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2],
              O = [1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1];L > 0 && L < 16 ? (b = U[L - 1], A = O[L - 1]) : 255 === L && (b = r.readByte() << 8 | r.readByte(), A = r.readByte() << 8 | r.readByte());
        }if (r.readBool() && r.readBool(), r.readBool() && (r.readBits(4), r.readBool() && r.readBits(24)), r.readBool() && (r.readUEG(), r.readUEG()), r.readBool()) {
          var M = r.readBits(32),
              x = r.readBits(32);C = r.readBool(), w = (D = x) / (R = 2 * M);
        }
      }var $ = 1;1 === b && 1 === A || ($ = b / A);var N = 0,
          V = 0;0 === u ? (N = 1, V = 2 - E) : (N = 3 === u ? 1 : 2, V = (1 === u ? 2 : 1) * (2 - E));var B = 16 * (m + 1),
          I = 16 * (_ + 1) * (2 - E);B -= (g + k) * N, I -= (S + T) * V;var P = Math.ceil(B * $);return r.destroy(), r = null, { profile_string: s, level_string: o, bit_depth: f, chroma_format: l, chroma_format_string: e.getChromaFormatString(l), frame_rate: { fixed: C, fps: w, fps_den: R, fps_num: D }, par_ratio: { width: b, height: A }, codec_size: { width: B, height: I }, present_size: { width: P, height: I } };
    } }, { key: "_skipScalingList", value: function value(e, t) {
      for (var i = 8, r = 8, n = 0; n < t; n++) {
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
    _createClass$h = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }return function (t, i, r) {
    return i && e(t.prototype, i), r && e(t, r), t;
  };
}(),
    Nalunit = function () {
  function e() {
    _classCallCheck$h(this, e);
  }return _createClass$h(e, null, [{ key: "getNalunits", value: function value(t) {
      if (t.length - t.position < 4) return [];var i = t.dataview,
          r = t.position;return 1 === i.getInt32(r) || 0 === i.getInt16(r) && 1 === i.getInt8(r + 2) ? e.getAnnexbNals(t) : e.getAvccNals(t);
    } }, { key: "getAnnexbNals", value: function value(t) {
      for (var i = [], r = e.getHeaderPositionAnnexB(t), n = r.pos, a = n; n < t.length - 4;) {
        var s = t.buffer.slice(n, n + r.headerLength);r.pos === t.position && t.skip(r.headerLength), a = (r = e.getHeaderPositionAnnexB(t)).pos;var o = { header: s, body: new Uint8Array(t.buffer.slice(n + s.byteLength, a)) };e.analyseNal(o), i.push(o), t.skip(a - t.position), n = a;
      }return i;
    } }, { key: "getAvccNals", value: function value(t) {
      for (var i = []; t.position < t.length - 4;) {
        var r = t.dataview.getInt32();if (!(t.length - t.position >= r)) break;var n = t.buffer.slice(t.position, t.position + 4);t.skip(4);var a = t.buffer.slice(t.position, t.position + r);t.skip(r);var s = { header: n, body: a };e.analyseNal(s), i.push(s);
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
    _createClass$i = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }return function (t, i, r) {
    return i && e(t.prototype, i), r && e(t, r), t;
  };
}(),
    AAC = function () {
  function e() {
    _classCallCheck$i(this, e);
  }return _createClass$i(e, null, [{ key: "getSilentFrame", value: function value(e, t) {
      if ("mp4a.40.2" === e) {
        if (1 === t) return new Uint8Array([0, 200, 0, 128, 35, 128]);if (2 === t) return new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128]);if (3 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142]);if (4 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56]);if (5 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56]);if (6 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224]);
      } else {
        if (1 === t) return new Uint8Array([1, 64, 34, 128, 163, 78, 230, 128, 186, 8, 0, 0, 0, 28, 6, 241, 193, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);if (2 === t) return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);if (3 === t) return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
      }return null;
    } }]), e;
}(),
    _createClass$j = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }return function (t, i, r) {
    return i && e(t.prototype, i), r && e(t, r), t;
  };
}(),
    REMUX_EVENTS$2 = EVENTS.REMUX_EVENTS,
    LOADER_EVENTS$1 = EVENTS.LOADER_EVENTS,
    Compatibility = function () {
  function e() {
    _classCallCheck$j(this, e), this.nextAudioDts = 0, this.nextVideoDts = 0, this.lastAudioSamplesLen = 0, this.lastVideoSamplesLen = 0, this.lastVideoDts = void 0, this.lastAudioDts = void 0, this.allAudioSamplesCount = 0, this.allVideoSamplesCount = 0, this._firstAudioSample = null, this._firstVideoSample = null, this.filledAudioSamples = [], this.filledVideoSamples = [], this.videoLastSample = null, this.audioLastSample = null, this._videoLargeGap = 0, this._audioLargeGap = 0;
  }return _createClass$j(e, [{ key: "init", value: function value() {
      var e = this;this.before(REMUX_EVENTS$2.REMUX_MEDIA, this.doFix.bind(this)), this.on(LOADER_EVENTS$1.LOADER_COMPLETE, function () {
        e.videoLastSample && e.videoTrack.samples.unshift(e.videoLastSample);
      });
    } }, { key: "reset", value: function value() {
      this.nextAudioDts = null, this.nextVideoDts = null, this.lastAudioSamplesLen = 0, this.lastVideoSamplesLen = 0, this.lastVideoDts = void 0, this.lastAudioDts = void 0, this.videoLastSample = null, this.audioLastSample = null, this.filledAudioSamples = [], this.filledVideoSamples = [];
    } }, { key: "doFix", value: function value() {
      var t = this.getFirstSample(),
          i = t.isFirstAudioSamples,
          r = t.isFirstVideoSamples;this.recordSamplesCount(), this._firstVideoSample && this.fixRefSampleDuration(this.videoTrack.meta, this.videoTrack.samples), this._firstAudioSample && this.fixRefSampleDuration(this.audioTrack.meta, this.audioTrack.samples);var n = e.detactChangeStream(this.videoTrack.samples),
          a = n.changed,
          s = n.changedIdx;a && !i ? this.fixChangeStreamVideo(s) : this.doFixVideo(r);var o = e.detactChangeStream(this.audioTrack.samples),
          u = o.changed,
          l = o.changedIdx;u ? this.fixChangeStreamAudio(l) : this.doFixAudio(i), this.removeInvalidSamples();
    } }, { key: "doFixVideo", value: function value(t, i) {
      for (var r = this.videoTrack, n = r.samples, a = r.meta, s = 0, o = n.length; s < o; s++) {
        var u = n[s];u.originDts = u.dts;
      }if ((!a.frameRate || !1 !== a.frameRate.fixed) && n && n.length && this._firstVideoSample) {
        var l = n[0];if (this._videoLargeGap > 0 && e.doFixLargeGap(n, this._videoLargeGap), l.dts !== this._firstVideoSample.dts && i && (i && (this.nextVideoDts = i), this._videoLargeGap = this.nextVideoDts - l.dts, e.doFixLargeGap(n, this._videoLargeGap)), t && this._firstAudioSample) {
          var c = this._firstVideoSample.originDts,
              f = c - (this._firstAudioSample.originDts || this._firstAudioSample.dts);if (f > 2 * a.refSampleDuration && f < 10 * a.refSampleDuration) {
            for (var h = Math.floor(f / a.refSampleDuration), d = 0; d < h; d++) {
              var p = Object.assign({}, l);p.dts = c - (d + 1) * a.refSampleDuration, p.pts = p.dts + p.cts, n.unshift(p), this.filledVideoSamples.push({ dts: p.dts, size: p.data.byteLength });
            }this._firstVideoSample = this.filledVideoSamples[0] || this._firstVideoSample;
          } else f < -2 * a.refSampleDuration && (this._videoLargeGap = -1 * f, e.doFixLargeGap(n, -1 * f));
        }var v = n.pop();if (n.length && (n[n.length - 1].duration = v.dts - n[n.length - 1].dts), this.videoLastSample) {
          var y = this.videoLastSample;y.duration = l.dts - y.dts, n.unshift(this.videoLastSample);
        }this.videoLastSample = v, this.videoTrack.samples = n;
      }
    } }, { key: "doFixAudio", value: function value(t, i) {
      var r = this.audioTrack,
          n = r.samples,
          a = r.meta;if (n && n.length) {
        for (var s = 0, o = n.length; s < o; s++) {
          var u = n[s];u.originDts = u.dts;
        }var l = n.length,
            c = AAC.getSilentFrame(a.codec, a.channelCount),
            f = this._firstAudioSample,
            h = n[0];if (this._audioLargeGap > 0 && e.doFixLargeGap(n, this._audioLargeGap), h.dts !== this._firstAudioSample.dts && (i || e.detectLargeGap(this.nextAudioDts, h)) && (i && (this.nextAudioDts = i), this._audioLargeGap = this.nextAudioDts - h.dts, e.doFixLargeGap(n, this._audioLargeGap)), this._firstVideoSample && t) {
          var d = this._firstVideoSample.originDts || this._firstVideoSample.dts,
              p = f.dts - d;if (p > a.refSampleDuration && p < 10 * a.refSampleDuration) {
            for (var v = Math.floor((f.dts - d) / a.refSampleDuration), y = 0; y < v; y++) {
              var m = { data: c, datasize: c.byteLength, dts: f.dts - (y + 1) * a.refSampleDuration, filtered: 0 };n.unshift(m), this.filledAudioSamples.push({ dts: m.dts, size: m.data.byteLength });
            }this._firstAudioSample = this.filledAudioSamples[0] || this._firstAudioSample;
          } else p < -1 * a.refSampleDuration && (this._audioLargeGap = -1 * p, e.doFixLargeGap(n, -1 * p));
        }var _ = void 0,
            E = n[0].dts;if (this.nextAudioDts) {
          _ = E - this.nextAudioDts;var g = Math.abs(_);if (g > a.refSampleDuration && 1 === l && 1 === this.lastAudioSamplesLen && (a.refSampleDurationFixed = void 0), _ > 2 * a.refSampleDuration && _ < 10 * a.refSampleDuration) {
            if (1 === l && 1 === this.lastAudioSamplesLen) a.refSampleDurationFixed = void 0 !== a.refSampleDurationFixed ? a.refSampleDurationFixed + _ : a.refSampleDuration + _;else for (var k = Math.floor(_ / a.refSampleDuration), S = 0; S < k; S++) {
              var T = E - (S + 1) * a.refSampleDuration,
                  b = Object.assign({}, n[0], { dts: T > this.nextAudioDts ? T : this.nextAudioDts });this.filledAudioSamples.push({ dts: b.dts, size: b.data.byteLength }), this.audioTrack.samples.unshift(b);
            }
          } else g <= a.refSampleDuration && g > 0 ? (n[0].dts = this.nextAudioDts, n[0].pts = this.nextAudioDts) : _ < 0 && e.doFixLargeGap(n, -1 * _);
        }var A = n[n.length - 1].originDts,
            w = n[n.length - 1].dts,
            C = n.length >= 2 ? A - n[n.length - 2].originDts : a.refSampleDuration;this.lastAudioSamplesLen = l, this.nextAudioDts = a.refSampleDurationFixed ? w + a.refSampleDurationFixed : w + C, this.lastAudioDts = w, n[n.length - 1].duration = C;for (var D = 0, R = n.length; D < R; D++) {
          var L = n[D],
              U = n[D + 1];if (!U) break;var O = U.dts - L.dts;n[D].duration = O;
        }this.audioTrack.samples = e.sortAudioSamples(n);
      }
    } }, { key: "fixChangeStreamVideo", value: function value(e) {
      var t = this.videoTrack,
          i = t.samples,
          r = t.meta,
          n = 0 === e ? this.getStreamChangeStart(i[0]) : i[e - 1].dts,
          a = i[e].dts;if (Math.abs(n - a) <= 2 * r.refSampleDuration) return i[e].options ? i[e].options.isContinue = !0 : i[e].options = { isContinue: !0 }, this.doFixVideo(!1);var s = i.slice(0, e),
          o = i.slice(e),
          u = i[0],
          l = o[0].dts - u.dts,
          c = u.options && u.options.start + l ? u.options.start : null;this.videoTrack.samples = i.slice(0, e), this.doFixVideo(!1), this.videoTrack.samples = i.slice(e), this.doFixVideo(!1, c), this.videoTrack.samples = s.concat(o);
    } }, { key: "fixChangeStreamAudio", value: function value(e) {
      var t = this.audioTrack,
          i = t.samples,
          r = t.meta,
          n = 0 === e ? this.getStreamChangeStart(i[0]) : i[e - 1].dts,
          a = i[e].dts;if (Math.abs(n - a) <= 2 * r.refSampleDuration) return i[e].options ? i[e].options.isContinue = !0 : i[e].options = { isContinue: !0 }, this.doFixAudio(!1);var s = i.slice(0, e),
          o = i.slice(e),
          u = i[0],
          l = o[0].dts - u.dts,
          c = u.options && u.options.start + l ? u.options.start : null;this.audioTrack.samples = s, this.doFixAudio(!1), this.audioTrack.samples = o, this.doFixAudio(!1, c), this.audioTrack.samples = s.concat(o);
    } }, { key: "getFirstSample", value: function value() {
      var t = this.videoTrack.samples,
          i = this.audioTrack.samples,
          r = !1,
          n = !1;return !this._firstVideoSample && t.length && (this._firstVideoSample = e.findFirstVideoSample(t), this.removeInvalidSamples(), r = !0), !this._firstAudioSample && i.length && (this._firstAudioSample = e.findFirstAudioSample(i), this.removeInvalidSamples(), n = !0), { isFirstVideoSamples: r, isFirstAudioSamples: n };
    } }, { key: "fixRefSampleDuration", value: function value(e, t) {
      var i = "video" === e.type,
          r = i ? this.allVideoSamplesCount : this.allAudioSamplesCount,
          n = i ? this._firstVideoSample.dts : this._firstAudioSample.dts,
          a = i ? this.filledVideoSamples.length : this.filledAudioSamples.length;if (!e.refSampleDuration || e.refSampleDuration <= 0 || Number.isNaN(e.refSampleDuration)) {
        if (t.length >= 1) {
          var s = t[t.length - 1].dts;e.refSampleDuration = Math.floor((s - n) / (r + a - 1));
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
            n = t.options && t.options.discontinue;return r || n;
      }
    } }, { key: "doFixLargeGap", value: function value(e, t) {
      for (var i = 0, r = e.length; i < r; i++) {
        var n = e[i];n.dts += t, n.pts && (n.pts += t);
      }
    } }, { key: "detactChangeStream", value: function value(e) {
      for (var t = !1, i = -1, r = 0, n = e.length; r < n; r++) {
        if (e[r].options && e[r].options.meta) {
          t = !0, i = r;break;
        }
      }return { changed: t, changedIdx: i };
    } }]), e;
}(),
    Nalunit$1 = Nalunit,
    SpsParser = SPSParser,
    Compatibility$1 = Compatibility,
    _createClass$k = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }return function (t, i, r) {
    return i && e(t.prototype, i), r && e(t, r), t;
  };
}(),
    Track = function () {
  function e() {
    _classCallCheck$k(this, e), this.id = -1, this.sequenceNumber = 0, this.samples = [], this.droppedSamples = [], this.length = 0;
  }return _createClass$k(e, [{ key: "reset", value: function value() {
      this.sequenceNumber = 0, this.samples = [], this.length = 0;
    } }, { key: "distroy", value: function value() {
      this.reset(), this.id = -1;
    } }]), e;
}(),
    AudioTrack = function (e) {
  function t() {
    _classCallCheck$k(this, t);var e = _possibleConstructorReturn$1(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));return e.TAG = "AudioTrack", e.type = "audio", e;
  }return _inherits$1(t, e), t;
}(Track),
    VideoTrack = function (e) {
  function t() {
    _classCallCheck$k(this, t);var e = _possibleConstructorReturn$1(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));return e.TAG = "VideoTrack", e.type = "video", e.dropped = 0, e;
  }return _inherits$1(t, e), _createClass$k(t, [{ key: "reset", value: function value() {
      this.sequenceNumber = 0, this.samples = [], this.length = 0, this.dropped = 0;
    } }]), t;
}(Track),
    Tracks = function () {
  function e() {
    _classCallCheck$k(this, e), this.audioTrack = null, this.videoTrack = null;
  }return _createClass$k(e, [{ key: "destroy", value: function value() {
      this.audioTrack = null, this.videoTrack = null;
    } }]), e;
}(),
    _createClass$l = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }return function (t, i, r) {
    return i && e(t.prototype, i), r && e(t, r), t;
  };
}(),
    XgBuffer = function () {
  function e(t) {
    _classCallCheck$l(this, e), this.length = t || 0, this.historyLen = t || 0, this.array = [], this.offset = 0;
  }return _createClass$l(e, [{ key: "push", value: function value(e) {
      this.array.push(e), this.length += e.byteLength, this.historyLen += e.byteLength;
    } }, { key: "shift", value: function value(e) {
      if (this.array.length < 1) return new Uint8Array(0);if (void 0 === e) return this._shiftBuffer();if (this.offset + e === this.array[0].length) {
        var t = this.array[0].slice(this.offset, this.offset + e);return this.offset = 0, this.array.shift(), this.length -= e, t;
      }if (this.offset + e < this.array[0].length) {
        var i = this.array[0].slice(this.offset, this.offset + e);return this.offset += e, this.length -= e, i;
      }for (var r = new Uint8Array(e), n = 0; this.array.length > 0 && e > 0;) {
        if (this.offset + e < this.array[0].length) {
          var a = this.array[0].slice(this.offset, this.offset + e);r.set(a, n), this.offset += e, this.length -= e, e = 0;break;
        }var s = this.array[0].length - this.offset;r.set(this.array[0].slice(this.offset, this.array[0].length), n), this.array.shift(), this.offset = 0, n += s, this.length -= s, e -= s;
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
    _classCallCheck$l(this, e), this.video = [], this.audio = [];
  }return _createClass$l(e, [{ key: "destroy", value: function value() {
      this.video = [], this.audio = [];
    } }]), e;
}(),
    _createClass$m = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }return function (t, i, r) {
    return i && e(t.prototype, i), r && e(t, r), t;
  };
}(),
    Source = function e() {
  _classCallCheck$m(this, e), this.mimetype = "", this.init = null, this.data = [];
},
    PreSource = function () {
  function e() {
    _classCallCheck$m(this, e), this.sources = {};
  }return _createClass$m(e, [{ key: "getSource", value: function value(e) {
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
    _typeof$1$1 = "function" == typeof Symbol && "symbol" === _typeof$1(Symbol.iterator) ? function (e) {
  return void 0 === e ? "undefined" : _typeof$1(e);
} : function (e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : _typeof$1(e);
},
    _createClass$n = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }return function (t, i, r) {
    return i && e(t.prototype, i), r && e(t, r), t;
  };
}(),
    DEMUX_EVENTS$1 = EVENTS.DEMUX_EVENTS,
    StreamType = { 1: ["video", "MPEG-1"], 2: ["video", "MPEG-2"], 27: ["video", "AVC.H264"], 234: ["video", "VC-1"], 3: ["audio", "MPEG-1"], 4: ["audio", "MPEG-2"], 15: ["audio", "MPEG-2.AAC"], 17: ["audio", "MPEG-4.AAC"], 128: ["audio", "LPCM"], 129: ["audio", "AC3"], 6: ["audio", "AC3"], 130: ["audio", "DTS"], 131: ["audio", "Dolby TrueHD"], 132: ["audio", "AC3-Plus"], 133: ["audio", "DTS-HD"], 134: ["audio", "DTS-MA"], 161: ["audio", "AC3-Plus-SEC"], 162: ["audio", "DTS-HD-SEC"] },
    TsDemuxer = function () {
  function e(t) {
    _classCallCheck$n(this, e), this.configs = Object.assign({}, t), this.demuxing = !1, this.pat = [], this.pmt = [], this._hasVideoMeta = !1, this._hasAudioMeta = !1;
  }return _createClass$n(e, [{ key: "init", value: function value() {
      this.on(DEMUX_EVENTS$1.DEMUX_START, this.demux.bind(this));
    } }, { key: "demux", value: function value(t) {
      if (!this.demuxing) {
        for (var i = this.inputBuffer, r = { pat: [], pmt: [] }, n = {}; i.length >= 188;) {
          for (i.length >= 1 && 71 !== i.array[0][i.offset] && this.emit(DEMUX_EVENTS$1.DEMUX_ERROR, this.TAG, new Error("Untrust sync code: " + i.array[0][i.offset] + ", try to recover;"), !1); i.length >= 1 && 71 !== i.array[0][i.offset];) {
            i.shift(1);
          }var a = i.shift(188),
              s = new Stream$1(a.buffer),
              o = {};e.read(s, o, r), o.pes ? (n[o.header.pid] || (n[o.header.pid] = []), n[o.header.pid].push(o.pes), o.pes.ES.buffer = [o.pes.ES.buffer]) : n[o.header.pid] && n[o.header.pid][n[o.header.pid].length - 1].ES.buffer.push(o.payload.stream);
        }for (var u = t, l = t, c = 0; c < Object.keys(n).length; c++) {
          for (var f = n[Object.keys(n)[c]], h = 0; h < f.length; h++) {
            f[h].id = Object.keys(n)[c], f[h].ES.buffer = e.Merge(f[h].ES.buffer), "audio" === f[h].type ? (this.pushAudioSample(f[h], u), u = {}) : "video" === f[h].type && (this.pushVideoSample(f[h], l), l = {});
          }
        }this._hasAudioMeta && this.emit(DEMUX_EVENTS$1.DEMUX_COMPLETE, "audio"), this._hasVideoMeta && this.emit(DEMUX_EVENTS$1.DEMUX_COMPLETE, "video");
      }
    } }, { key: "pushAudioSample", value: function value(t, i) {
      var r = void 0;this._tracks.audioTrack ? r = this._tracks.audioTrack : (this._tracks.audioTrack = new AudioTrack$1(), r = this._tracks.audioTrack);var n = new AudioTrackMeta$1({ audioSampleRate: t.ES.frequence, sampleRate: t.ES.frequence, channelCount: t.ES.channel, codec: "mp4a.40." + t.ES.audioObjectType, config: t.ES.audioConfig, id: 2, sampleRateIndex: t.ES.frequencyIndex });n.refSampleDuration = Math.floor(1024 / n.audioSampleRate * n.timescale);var a = e.compaireMeta(r.meta, n, !0);this._hasAudioMeta && a || (r.meta = n, this._hasAudioMeta = !0, this.emit(DEMUX_EVENTS$1.METADATA_PARSED, "audio"));var s = new Uint8Array(t.ES.buffer.buffer.slice(t.ES.buffer.position, t.ES.buffer.length)),
          o = parseInt(t.pts / 90),
          u = parseInt(t.pts / 90),
          l = new AudioTrackSample$1({ dts: o, pts: u, data: s, options: i });r.samples.push(l);
    } }, { key: "pushVideoSample", value: function value(t, i) {
      var r = Nalunit$1.getNalunits(t.ES.buffer),
          n = void 0,
          a = new VideoTrackMeta$1();this._tracks.videoTrack ? n = this._tracks.videoTrack : (this._tracks.videoTrack = new VideoTrack$1(), n = this._tracks.videoTrack);for (var s = 0, o = !1, u = !1, l = 0; l < r.length; l++) {
        var c = r[l];if (c.sps) {
          o = c, n.sps = c.body, a.chromaFormat = o.sps.chroma_format, a.codec = "avc1.";for (var f = 1; f < 4; f++) {
            var h = o.body[f].toString(16);h.length < 2 && (h = "0" + h), a.codec += h;
          }a.codecHeight = o.sps.codec_size.height, a.codecWidth = o.sps.codec_size.width, a.frameRate = o.sps.frame_rate, a.id = 1, a.level = o.sps.level_string, a.presentHeight = o.sps.present_size.height, a.presentWidth = o.sps.present_size.width, a.profile = o.sps.profile_string, a.refSampleDuration = Math.floor(a.timescale * (o.sps.frame_rate.fps_den / o.sps.frame_rate.fps_num)), a.sarRatio = o.sps.sar_ratio ? o.sps.sar_ratio : o.sps.par_ratio;
        } else c.pps ? (n.pps = c.body, u = c) : s += 4 + c.body.byteLength;
      }if (o && u) {
        a.avcc = Nalunit$1.getAvcc(o.body, u.body);var d = e.compaireMeta(n.meta, a, !0);this._hasVideoMeta && d || (i ? i.meta = Object.assign({}, a) : i = { meta: Object.assign({}, a) }, n.meta = a, this._hasVideoMeta = !0, this.emit(DEMUX_EVENTS$1.METADATA_PARSED, "video"));
      }for (var p = new Uint8Array(s), v = 0, y = !1, m = 0; m < r.length; m++) {
        var _ = r[m],
            E = _.body.byteLength;_.idr && (y = !0), _.pps || _.sps || (p.set(new Uint8Array([E >>> 24 & 255, E >>> 16 & 255, E >>> 8 & 255, 255 & E]), v), v += 4, p.set(_.body, v), v += E);
      }var g = new VideoTrackSample$1({ dts: parseInt(t.dts / 90), pts: parseInt(t.pts / 90), cts: (t.pts - t.dts) / 90, originDts: t.dts, isKeyframe: y, data: p, options: i });n.samples.push(g);
    } }, { key: "destory", value: function value() {
      this.off(DEMUX_EVENTS$1.DEMUX_START, this.demux), this.configs = {}, this.demuxing = !1, this.pat = [], this.pmt = [], this._hasVideoMeta = !1, this._hasAudioMeta = !1;
    } }, { key: "inputBuffer", get: function get() {
      return this._context.getInstance(this.configs.inputbuffer);
    } }, { key: "_tracks", get: function get() {
      return this._context.getInstance("TRACKS");
    } }], [{ key: "compaireArray", value: function value(e, t, i) {
      var r = 0,
          n = 0;if ("Uint8Array" === i ? (r = e.byteLength, n = t.byteLength) : "Array" === i && (r = e.length, n = t.length), r !== n) return !1;for (var a = 0; a < r; a++) {
        if (e[a] !== t[a]) return !1;
      }return !0;
    } }, { key: "compaireMeta", value: function value(t, i, r) {
      if (!t || !i) return !1;for (var n = 0, a = Object.keys(t).length; n < a; n++) {
        var s = t[Object.keys(t)[n]],
            o = i[Object.keys(t)[n]];if ("object" !== (void 0 === s ? "undefined" : _typeof$1$1(s))) {
          if (r && "duration" !== Object.keys(t)[n] && "refSampleDuration" !== Object.keys(t)[n] && "refSampleDurationFixed" !== Object.keys(t)[n] && s !== o) return !1;
        } else if (void 0 !== s.byteLength) {
          if (void 0 === o.byteLength) return !1;if (!e.compaireArray(s, o, "Uint8Array")) return !1;
        } else if (void 0 !== s.length) {
          if (void 0 === o.length) return !1;if (!e.compaireArray(s, o, "Array")) return !1;
        } else if (!e.compaireMeta(s, o)) return !1;
      }return !0;
    } }, { key: "Merge", value: function value(e) {
      for (var t = void 0, i = 0, r = 0, n = 0; n < e.length; n++) {
        i += e[n].length - e[n].position;
      }t = new Uint8Array(i);for (var a = 0; a < e.length; a++) {
        var s = e[a];t.set(new Uint8Array(s.buffer, s.position), r), r += s.length - s.position;
      }return new Stream$1(t.buffer);
    } }, { key: "read", value: function value(t, i, r) {
      e.readHeader(t, i), e.readPayload(t, i, r), "MEDIA" !== i.header.packet || 1 !== i.header.payload || i.unknownPIDs || (i.pes = e.PES(i));
    } }, { key: "readPayload", value: function value(t, i, r) {
      var n = i.header.pid;switch (n) {case 0:
          e.PAT(t, i, r);break;case 1:
          e.CAT(t, i, r);break;case 2:
          e.TSDT(t, i, r);break;case 8191:
          break;default:
          if (r.pat.some(function (e) {
            return e.pid === n;
          })) e.PMT(t, i, r);else {
            var a = r.pmt ? r.pmt.filter(function (e) {
              return e.pid === n;
            }) : [];a.length > 0 ? e.Media(t, i, StreamType[a[0].streamType][0]) : i.unknownPIDs = !0;
          }}
    } }, { key: "readHeader", value: function value(e, t) {
      var i = {};i.sync = e.readUint8();var r = e.readUint16();i.error = r >>> 15, i.payload = r >>> 14 & 1, i.priority = r >>> 13 & 1, i.pid = 8191 & r, r = e.readUint8(), i.scrambling = r >> 6 & 3, i.adaptation = r >> 4 & 3, i.continuity = 15 & r, i.packet = 0 === i.pid ? "PAT" : "MEDIA", t.header = i;
    } }, { key: "PAT", value: function value(e, t, i) {
      var r = {},
          n = e.readUint8();e.skip(n), n = e.readUint8(), r.tabelID = n, n = e.readUint16(), r.error = n >>> 7, r.zero = n >>> 6 & 1, r.sectionLength = 4095 & n, r.streamID = e.readUint16(), r.current = 1 & e.readUint8(), r.sectionNumber = e.readUint8(), r.lastSectionNumber = e.readUint8();for (var a = (r.sectionLength - 9) / 4, s = [], o = 0; o < a; o++) {
        var u = e.readUint16(),
            l = 8191 & e.readUint16();s.push({ program: u, pid: l, type: 0 === u ? "network" : "mapPID" });
      }s.length > 0 && (i.pat = i.pat.concat(s)), r.list = s, r.program = e.readUint16(), r.pid = 8191 & e.readUint16(), t.payload = r;
    } }, { key: "PMT", value: function value(e, t, i) {
      var r = {};t.header.packet = "PMT";var n = e.readUint8();e.skip(n), n = e.readUint8(), r.tableID = n, n = e.readUint16(), r.sectionLength = 4095 & n, r.program = e.readUint16(), r.current = 1 & e.readUint8(), r.order = e.readUint8(), r.lastOrder = e.readUint8(), r.PCR_PID = 8191 & e.readUint16(), r.programLength = 4095 & e.readUint16();for (var a = (r.sectionLength - 13) / 5, s = [], o = 0; o < a; o++) {
        s.push({ streamType: e.readUint8(), pid: 8191 & e.readUint16(), es: 4095 & e.readUint16() });
      }r.list = s, this.pmt || (this.pmt = []), i.pmt = this.pmt.concat(s.map(function (e) {
        return { pid: e.pid, es: e.es, streamType: e.streamType, program: r.program };
      })), t.payload = r;
    } }, { key: "Media", value: function value(e, t, i) {
      var r = t.header,
          n = {};if (r.type = i, 3 === r.adaptation && (n.adaptationLength = e.readUint8(), n.adaptationLength > 0)) {
        var a = e.readUint8();n.discontinue = a >>> 7, n.access = a >>> 6 & 1, n.priority = a >>> 5 & 1, n.PCR = a >>> 4 & 1, n.OPCR = a >>> 3 & 1, n.splicePoint = a >>> 2 & 1, n.transportPrivate = a >>> 1 & 1, n.adaptationField = 1 & a;var s = e.position;if (1 === n.PCR && (n.programClockBase = e.readUint32() << 1, a = e.readUint16(), n.programClockBase |= a >>> 15, n.programClockExtension = 511 & a), 1 === n.OPCR && (n.originProgramClockBase = e.readUint32() << 1, a = e.readUint16(), n.originProgramClockBase += a >>> 15, n.originProgramClockExtension = 511 & a), 1 === n.splicePoint && (n.spliceCountdown = e.readUint8()), 1 === n.transportPrivate) for (var o = e.readUint8(), u = [], l = 0; l < o; l++) {
          u.push(e.readUint8());
        }if (1 === n.adaptationField) {
          var c = e.readUint8(),
              f = e.readUint8(),
              h = e.position,
              d = f >>> 6 & 1,
              p = f >>> 5 & 1;1 === f >>> 7 && (f = e.readUint16(), n.ltwValid = f >>> 15, n.ltwOffset = 61439 & f), 1 === d && (f = e.readUint24(), n.piecewiseRate = 4194303 & f), 1 === p && (f = e.readInt8(), n.spliceType = f >>> 4, n.dtsNextAU1 = f >>> 1 & 7, n.marker1 = 1 & f, f = e.readUint16(), n.dtsNextAU2 = f >>> 1, n.marker2 = 1 & f, f = e.readUint16(), n.dtsNextAU3 = f), e.skip(c - 1 - (e.position - h));
        }var v = n.adaptationLength - 1 - (e.position - s);e.skip(v);
      }n.stream = new Stream$1(e.buffer.slice(e.position)), t.payload = n;
    } }, { key: "PES", value: function value(t) {
      var i = {},
          r = t.payload.stream;if (1 !== r.readUint24()) i.ES = {}, i.ES.buffer = r;else {
        var n = r.readUint8();n >= 224 && n <= 239 && (i.type = "video"), n >= 192 && n <= 223 && (i.type = "audio");var a = r.readUint16();if (i.packetLength = a, "video" !== i.type && "audio" !== i.type) throw new Error("format is not supported");var s = r.readUint8();if (2 !== s >>> 6) throw new Error("error when parse pes header");s = r.readUint8(), i.ptsDTSFlag = s >>> 6, i.escrFlag = s >>> 5 & 1, i.esRateFlag = s >>> 4 & 1, i.dsmFlag = s >>> 3 & 1, i.additionalFlag = s >>> 2 & 1, i.crcFlag = s >>> 1 & 1, i.extensionFlag = 1 & s, i.pesHeaderLength = r.readUint8();var o = i.pesHeaderLength;if (2 === i.ptsDTSFlag) {
          var u = [];s = r.readUint8(), u.push(s >>> 1 & 7), s = r.readUint16(), u.push(s >>> 1), s = r.readUint16(), u.push(s >>> 1), i.pts = u[0] << 30 | u[1] << 15 | u[2], o -= 5, "video" === i.type && (i.dts = i.pts);
        }if (3 === i.ptsDTSFlag) {
          var l = [];s = r.readUint8(), l.push(s >>> 1 & 7), s = r.readUint16(), l.push(s >>> 1), s = r.readUint16(), l.push(s >>> 1), i.pts = l[0] << 30 | l[1] << 15 | l[2];var c = [];s = r.readUint8(), c.push(s >>> 1 & 7), s = r.readUint16(), c.push(s >>> 1), s = r.readUint16(), c.push(s >>> 1), i.dts = c[0] << 30 | c[1] << 15 | c[2], o -= 10;
        }if (1 === i.escrFlag) {
          var f = [],
              h = [];s = r.readUint8(), f.push(s >>> 3 & 7), f.push(3 & s), s = r.readUint16(), f.push(s >>> 13), f.push(3 & s), s = r.readUint16(), f.push(s >>> 13), h.push(3 & s), s = r.readUint8(), h.push(s >>> 1), i.escr = 300 * (f[0] << 30 | f[1] << 28 | f[2] << 15 | f[3] << 13 | f[4]) + (h[0] << 7 | h[1]), o -= 6;
        }if (1 === i.esRateFlag && (s = r.readUint24(), i.esRate = s >>> 1 & 4194303, o -= 3), 1 === i.dsmFlag) throw new Error("not support DSM_trick_mode");if (1 === i.additionalFlag && (s = r.readUint8(), i.additionalCopyInfo = 127 & s, o -= 1), 1 === i.crcFlag && (i.pesCRC = r.readUint16(), o -= 2), 1 === i.extensionFlag) throw new Error("not support extension");o > 0 && r.skip(o), i.ES = e.ES(r, i.type);
      }return i;
    } }, { key: "ES", value: function value(t, i) {
      var r = void 0,
          n = {};if ("video" === i) {
        if (1 !== (r = t.readUint32()) && (t.back(4), 1 !== (r = t.readUint24()))) throw new Error("h264 nal header parse failed");t.skip(2), n.buffer = t;
      } else {
        if ("audio" !== i) throw new Error("ES " + i + " is not supported");if ((r = t.readUint16()) >>> 4 != 4095) throw new Error("aac ES parse Error");var a = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350];n.id = 0 == (r >>> 3 & 1) ? "MPEG-4" : "MPEG-2", n.layer = r >>> 1 & 3, n.absent = 1 & r, r = t.readUint16(), n.audioObjectType = 1 + (r >>> 14 & 3), n.profile = n.audioObjectType - 1, n.frequencyIndex = r >>> 10 & 15, n.frequence = a[n.frequencyIndex], n.channel = r >>> 6 & 7, n.frameLength = (3 & r) << 11 | t.readUint16() >>> 5, e.getAudioConfig(n), t.skip(1), n.buffer = t;
      }return n;
    } }, { key: "TSDT", value: function value(e, t, i) {
      t.payload = {};
    } }, { key: "CAT", value: function value(e, t, i) {
      var r = {};r.tableID = e.readUint8();var n = e.readUint16();r.sectionIndicator = n >>> 7, r.sectionLength = 4095 & n, e.skip(2), n = e.readUint8(), r.version = n >>> 3, r.currentNextIndicator = 1 & n, r.sectionNumber = e.readUint8(), r.lastSectionNumber = e.readUint8();this.sectionLength;r.crc32 = e.readUint32(), t.payload = r;
    } }, { key: "getAudioConfig", value: function value(e) {
      var t = navigator.userAgent.toLowerCase(),
          i = void 0,
          r = void 0;/firefox/i.test(t) ? e.frequencyIndex >= 6 ? (e.audioObjectType = 5, i = new Array(4), r = e.frequencyIndex - 3) : (e.audioObjectType = 2, i = new Array(2), r = e.frequencyIndex) : -1 !== t.indexOf("android") ? (e.audioObjectType = 2, i = new Array(2), r = e.frequencyIndex) : (e.audioObjectType = 5, i = new Array(4), e.frequencyIndex >= 6 ? r = e.frequencyIndex - 3 : (1 === e.channel && (e.audioObjectType = 2, i = new Array(2)), r = e.frequencyIndex)), i[0] = e.audioObjectType << 3, i[0] |= (14 & e.frequencyIndex) >> 1, i[1] = (1 & e.frequencyIndex) << 7, i[1] |= e.channel << 3, 5 === e.audioObjectType && (i[1] |= (14 & r) >> 1, i[2] = (1 & r) << 7, i[2] |= 8, i[3] = 0), e.audioConfig = i;
    } }]), e;
}(),
    _createClass$o = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }return function (t, i, r) {
    return i && e(t.prototype, i), r && e(t, r), t;
  };
}(),
    Playlist = function () {
  function e(t) {
    _classCallCheck$o(this, e), this._baseURL = "", this._list = {}, this._ts = {}, this.version = 0, this.sequence = -1, this.targetduration = 0, this.duration = 0, this.fragLength = 0, this._lastget = void 0, this._audoclear = t.autoclear || !1;
  }return _createClass$o(e, [{ key: "push", value: function value(e, t, i) {
      this._ts[e] || (this._ts[e] = { duration: t, downloaded: !1, downloading: !1, start: this.duration, discontinue: !!i }, this._list[this.duration] = e, this.duration += t, this.fragLength += 1);
    } }, { key: "deleteFrag", value: function value(e) {
      this._ts[e] && (this._ts[e].start > this._lastget.time && (this._lastget = { duration: this._ts[e].duration, time: this._ts[e].start, downloaded: !1, downloading: !1, url: e }), delete this._list[this._ts[e].start], delete this._ts[e], this.fragLength -= 1);
    } }, { key: "pushM3U8", value: function value(e, t) {
      if (!e) throw new Error("No m3u8 data received.");if (this.version = e.version, this.targetduration = e.targetduration, e.encrypt && !this.encrypt && (this.encrypt = e.encrypt), !(e.sequence > this.sequence)) throw new Error("Old m3u8 file received, " + e.sequence);this.sequence = e.sequence;for (var i = [], r = 0; r < e.frags.length; r++) {
        var n = e.frags[r];this._ts[n.url] || (i.push(n.url), this.push(n.url, n.duration, n.discontinue));
      }if (i.length < 1) throw new Error("Can not read ts file list.");if (t) for (var a = this.getTsList(), s = 0; s < a.length; s++) {
        i.indexOf(a[s]) < 0 && this.deleteFrag(a[s]);
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
          var n = this._list[t[r]];i = { url: n, downloaded: this._ts[n].downloaded, downloading: this._ts[n].downloading, time: parseInt(t[r]), duration: parseInt(this._ts[n].duration) }, this.autoclear && (delete this._ts[this._lastget.url], delete this._list[this._lastget.time]), this._lastget = i;
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
    _createClass$p = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }return function (t, i, r) {
    return i && e(t.prototype, i), r && e(t, r), t;
  };
}(),
    DATA_TYPES = { NUMBER: 0, BOOLEAN: 1, STRING: 2, OBJECT: 3, MIX_ARRAY: 8, OBJECT_END: 9, STRICT_ARRAY: 10, DATE: 11, LONE_STRING: 12 },
    AMFParser = function () {
  function e() {
    _classCallCheck$p(this, e), this.offset = 0, this.readOffset = this.offset;
  }return _createClass$p(e, [{ key: "resolve", value: function value(e, t) {
      if (t < 3) throw new Error("not enough data for metainfo");var i = {},
          r = this.parseValue(e),
          n = this.parseValue(e, t - r.bodySize);return i[r.data] = n.data, this.resetStatus(), i;
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
          n = DATA_TYPES.BOOLEAN,
          a = DATA_TYPES.STRING,
          s = DATA_TYPES.OBJECT,
          o = DATA_TYPES.MIX_ARRAY,
          u = DATA_TYPES.OBJECT_END,
          l = DATA_TYPES.STRICT_ARRAY,
          c = DATA_TYPES.DATE,
          f = DATA_TYPES.LONE_STRING,
          h = new DataView(i, this.readOffset, t),
          d = !1,
          p = h.getUint8(0),
          v = 1;this.readOffset += 1;var y = null;switch (p) {case r:
          y = h.getFloat64(1, !isLe), this.readOffset += 8, v += 8;break;case n:
          y = !!h.getUint8(1), this.readOffset += 1, v += 1;break;case a:
          var m = this.parseString(i);y = m.data, v += m.bodySize;break;case s:
          y = {};var _ = 0;for (16777215 & h.getUint32(t - 4, !isLe) && (_ = 3); v < t - 4;) {
            var E = this.parseObject(i, t - v - _);if (E.isObjectEnd) break;y[E.data.name] = E.data.value, v += E.bodySize;
          }v <= t - 3 && 9 === (16777215 & h.getUint32(v - 1, !isLe)) && (this.readOffset += 3, v += 3);break;case o:
          y = {}, v += 4, this.readOffset += 4;var g = 0;for (9 == (16777215 & h.getUint32(t - 4, !isLe)) && (g = 3); v < t - 8;) {
            var k = this.parseObject(i, t - v - g);if (k.isObjectEnd) break;y[k.data.name] = k.data.value, v += k.bodySize;
          }v <= t - 3 && 9 === (16777215 & h.getUint32(v - 1, !isLe)) && (v += 3, this.readOffset += 3);break;case u:
          y = null, d = !0;break;case l:
          y = [];var S = h.getUint32(1, !isLe);v += 4, this.readOffset += 4;for (var T = 0; T < S; T++) {
            var b = this.parseValue(i, t - v);y.push(b.data), v += b.bodySize;
          }break;case c:
          var A = this.parseDate(i, t - 1);y = A.data, v += A.bodySize;break;case f:
          var w = this.parseLongString(i, t - 1);y = w.data, v += w.bodySize;break;default:
          v = t;}return { data: y, bodySize: v, isObjEnd: d };
    } }]), e;
}(),
    _createClass$q = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }return function (t, i, r) {
    return i && e(t.prototype, i), r && e(t, r), t;
  };
}(),
    DEMUX_EVENTS$2 = EVENTS.DEMUX_EVENTS,
    FlvDemuxer = function () {
  function e() {
    _classCallCheck$q(this, e), this._firstFragmentLoaded = !1, this._trackNum = 0, this._hasScript = !1;
  }return _createClass$q(e, [{ key: "init", value: function value() {
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
          i = this.loaderBuffer.toInt(e, 1);if (e += 1, t.filtered = (32 & i) >>> 5, t.tagType = 31 & i, t.datasize = this.loaderBuffer.toInt(e, 3), e += 3, 8 !== t.tagType && 9 !== t.tagType && 11 !== t.tagType && 18 !== t.tagType || 0 !== this.loaderBuffer.toInt(8, 3)) return this.loaderBuffer && this.loaderBuffer.length > 0 && this.loaderBuffer.shift(1), this.emit(DEMUX_EVENTS$2.DEMUX_ERROR, this.TAG, new Error("tagType " + t.tagType), !1), null;if (this.loaderBuffer.length < t.datasize + 15) return null;this.loaderBuffer.shift(4);var r = this.loaderBuffer.toInt(0, 3);this.loaderBuffer.shift(3);var n = this.loaderBuffer.shift(1)[0];return n > 0 && (r += 16777216 * n), t.dts = r, this.loaderBuffer.shift(3), t;
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
          n = new AMFParser().resolve(r, r.length),
          a = this._context.onMetaData = n ? n.onMetaData : void 0;if (this._context.mediaInfo.duration = a.duration, this._context.mediaInfo.hasVideo = a.hasVideo, this._context.mediaInfo.hsaAudio = a.hasAudio, this._datasizeValidator(e.datasize) && (this.emit(DEMUX_EVENTS$2.MEDIA_INFO), this._hasScript = !0), t && !t.hasSpecificConfig) {
        var s = t.meta;switch (a.audiosamplerate && (s.sampleRate = a.audiosamplerate), a.audiochannels && (s.channelCount = a.audiochannels), a.audiosamplerate) {case 44100:
            s.sampleRateIndex = 4;break;case 22050:
            s.sampleRateIndex = 7;break;case 11025:
            s.sampleRateIndex = 10;}
      }if (i && !i.hasSpecificConfig) {
        var o = i.meta;if ("number" == typeof a.framerate) {
          var u = Math.floor(1e3 * a.framerate);if (u > 0) {
            var l = u / 1e3;o.frameRate || (o.frameRate = {}), o.frameRate.fixed = !0, o.frameRate.fps = l, o.frameRate.fps_num = u, o.frameRate.fps_den = 1e3;
          }
        }
      }
    } }, { key: "_aacSequenceHeaderParser", value: function value(e) {
      var t = {};t.hasSpecificConfig = !0, t.objectType = e[1] >>> 3, t.sampleRateIndex = (7 & e[1]) << 1 | e[2] >>> 7, t.audiosamplerate = this._switchAudioSampleRate(t.sampleRateIndex), t.channelCount = (120 & e[2]) >>> 3, t.frameLength = (4 & e[2]) >>> 2, t.dependsOnCoreCoder = (2 & e[2]) >>> 1, t.extensionFlagIndex = 1 & e[2], t.codec = "mp4a.40." + t.objectType;var i = window.navigator.userAgent.toLowerCase(),
          r = void 0,
          n = void 0,
          a = t.sampleRateIndex;return -1 !== i.indexOf("firefox") ? t.sampleRateIndex >= 6 ? (t.objectType = 5, n = new Array(4), r = a - 3) : (t.objectType = 2, n = new Array(2), r = a) : -1 !== i.indexOf("android") ? (t.objectType = 2, n = new Array(2), r = a) : (t.objectType = 5, r = t.sampleRateIndex, n = new Array(4), t.sampleRateIndex >= 6 ? r = t.sampleRateIndex - 3 : 1 === t.channelCount && (t.objectType = 2, n = new Array(2), r = t.sampleRateIndex)), n[0] = t.objectType << 3, n[0] |= (15 & t.sampleRateIndex) >>> 1, n[1] = (15 & t.sampleRateIndex) << 7, n[1] |= (15 & t.channelCount) << 3, 5 === t.objectType && (n[1] |= (15 & r) >>> 1, n[2] = (1 & r) << 7, n[2] |= 8, n[3] = 0), t.config = n, t;
    } }, { key: "_parseAACData", value: function value(e) {
      var t = this.tracks.audioTrack;if (t) {
        var i = t.meta;i || (t.meta = new AudioTrackMeta$1(), i = t.meta);var r = this.loaderBuffer.shift(1)[0];e.data = this.loaderBuffer.shift(e.datasize - 1);var n = (240 & r) >>> 4;t.format = n, 10 !== n && this.emit(DEMUX_EVENTS$2.DEMUX_ERROR, new Error("invalid audio format: " + n)), 10 !== n || this._hasAudioSequence || (i.sampleRate = this._switchAudioSamplingFrequency(r), i.sampleRateIndex = (12 & r) >>> 2, i.frameLenth = (2 & r) >>> 1, i.channelCount = 1 & r, i.refSampleDuration = Math.floor(1024 / i.audioSampleRate * i.timescale));var a = i.audioSampleRate,
            s = i.sampleRateIndex,
            o = i.refSampleDuration;delete e.tagType;var u = this._datasizeValidator(e.datasize);if (0 === e.data[0]) {
          var l = this._aacSequenceHeaderParser(e.data);a = l.audiosamplerate || i.audioSampleRate, s = l.sampleRateIndex || i.sampleRateIndex, o = Math.floor(1024 / a * i.timescale), i.channelCount = l.channelCount, i.sampleRate = a, i.sampleRateIndex = s, i.refSampleDuration = o, i.duration = this._context.mediaInfo.duration * i.timescale, i.config = l.config;var c = this._context.mediaInfo.audio;c.codec = l.codec, c.channelCount = l.channelCount, c.sampleRate = a, c.sampleRateIndex = l.audioSampleRateIndex, this._hasScript && !this._hasAudioSequence ? this.emit(DEMUX_EVENTS$2.METADATA_PARSED, "audio") : this._hasScript && this._hasAudioSequence && this.emit(DEMUX_EVENTS$2.AUDIO_METADATA_CHANGE), this._hasAudioSequence = !0, this._metaChange = !0;
        } else this._metaChange && (e.options = { meta: t.meta }, this._metaChange = !1), e.data = e.data.slice(1, e.data.length), t.samples.push(e);u || this.emit(DEMUX_EVENTS$2.DEMUX_ERROR, this.TAG, new Error("TAG length error at " + e.datasize), !1);
      }
    } }, { key: "_parseHevcData", value: function value(e) {
      var t = this.loaderBuffer.shift(1)[0];e.frameType = (240 & t) >>> 4, e.isKeyframe = 1 === e.frameType;var i = 15 & t;if (this.tracks.videoTrack.codecID = i, e.avcPacketType = this.loaderBuffer.shift(1)[0], e.cts = this.loaderBuffer.toInt(0, 3), this.loaderBuffer.shift(3), 12 === i) {
        var r = this.loaderBuffer.shift(e.datasize - 5);if (e.data = r, 0 !== Number.parseInt(e.avcPacketType)) {
          this._datasizeValidator(e.datasize) || this.emit(DEMUX_EVENTS$2.DEMUX_ERROR, this.TAG, new Error("invalid video tag datasize: " + e.datasize), !1);var n = {},
              a = 0;for (n.cts = e.cts, n.dts = e.dts; e.data.length > a;) {
            var s = e.data.slice(Number.parseInt(a), 4 + a);n.size = s[3], n.size += 256 * s[2], n.size += 256 * s[1] * 256, n.size += 256 * s[0] * 256 * 256, a += 4, n.data = e.data.slice(Number.parseInt(a), n.size + a), a += n.size, this.tracks.videoTrack.samples.push(n), this.emit(DEMUX_EVENTS$2.METADATA_PARSED, "video");
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
        var i = 0;t.meta || (t.meta = new VideoTrackMeta$1());var r = t.meta;r.configurationVersion = e[0], r.avcProfileIndication = e[1], r.profileCompatibility = e[2], r.avcLevelIndication = e[3] / 10, r.nalUnitLength = 1 + (3 & e[4]);var n = 31 & e[5];i = 6;for (var a = {}, s = 0; s < n; s++) {
          var o = 255 * e[i] + e[i + 1];i += 2;for (var u = new Uint8Array(o), l = 0; l < o; l++) {
            u[l] = e[i + l];
          }for (var c = "avc1.", f = 1; f < 4; f++) {
            var h = u[f].toString(16);h.length < 2 && (h = "0" + h), c += h;
          }r.codec = c, i += o, this.tracks.videoTrack.meta.sps = u, a = SpsParser.parseSPS(u);
        }var d = e[i];i++;for (var p = 0; p < d; p++) {
          var v = 255 * e[i] + e[i + 1];i += 2;for (var y = new Uint8Array(v), m = 0; m < v; m++) {
            y[m] = e[i + m];
          }i += v, this.tracks.videoTrack.meta.pps = y;
        }Object.assign(r, SpsParser.toVideoMeta(a));var _ = this._context.mediaInfo.video;_.codec = r.codec, _.profile = r.profile, _.level = r.level, _.chromaFormat = r.chromaFormat, _.frameRate = r.frameRate, _.parRatio = r.parRatio, _.width = _.width === r.presentWidth ? _.width : r.presentWidth, _.height = _.height === r.presentHeight ? _.width : r.presentHeight, r.duration = this._context.mediaInfo.duration * r.timescale, r.avcc = new Uint8Array(e.length), r.avcc.set(e), t.meta = r;
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
    _typeof$2 = "function" == typeof Symbol && "symbol" === _typeof$1(Symbol.iterator) ? function (e) {
  return void 0 === e ? "undefined" : _typeof$1(e);
} : function (e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : _typeof$1(e);
},
    _createClass$r = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var r = t[i];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }return function (t, i, r) {
    return i && e(t.prototype, i), r && e(t, r), t;
  };
}(),
    LOADER_EVENTS$2 = EVENTS.LOADER_EVENTS,
    READ_STREAM = 0,
    READ_TEXT = 1,
    READ_JSON = 2,
    READ_BUFFER = 3,
    FetchLoader = function () {
  function e(t) {
    _classCallCheck$r(this, e), this.configs = Object.assign({}, t), this.url = null, this.status = 0, this.error = null, this._reader = null, this._canceled = !1, this._destroyed = !1, this.readtype = this.configs.readtype, this.buffer = this.configs.buffer || "LOADER_BUFFER", this._loaderTaskNo = 0;
  }return _createClass$r(e, [{ key: "init", value: function value() {
      this.on(LOADER_EVENTS$2.LADER_START, this.load.bind(this));
    } }, { key: "load", value: function value(e, t) {
      var i = this;this.url = e, this._canceled = !1;var r = this.getParams(t);return i.loading = !0, fetch(this.url, r).then(function (e) {
        if (e.ok) return i.status = e.status, i._onFetchResponse(e);i.loading = !1, i.emit(LOADER_EVENTS$2.LOADER_ERROR, i.TAG, new Error("invalid response."));
      }).catch(function (e) {
        throw i.loading = !1, i.emit(LOADER_EVENTS$2.LOADER_ERROR, i.TAG, e), new Error(e.message);
      });
    } }, { key: "_onFetchResponse", value: function value(e) {
      var t = this,
          i = this._context.getInstance(this.buffer),
          r = ++this._loaderTaskNo;if (!0 === e.ok) switch (this.readtype) {case READ_JSON:
          e.json().then(function (e) {
            t.loading = !1, t._canceled || t._destroyed || (i ? (i.push(e), t.emit(LOADER_EVENTS$2.LOADER_COMPLETE, i)) : t.emit(LOADER_EVENTS$2.LOADER_COMPLETE, e));
          });break;case READ_TEXT:
          e.text().then(function (e) {
            t.loading = !1, t._canceled || t._destroyed || (i ? (i.push(e), t.emit(LOADER_EVENTS$2.LOADER_COMPLETE, i)) : t.emit(LOADER_EVENTS$2.LOADER_COMPLETE, e));
          });break;case READ_BUFFER:
          e.arrayBuffer().then(function (e) {
            t.loading = !1, t._canceled || t._destroyed || (i ? (i.push(new Uint8Array(e)), t.emit(LOADER_EVENTS$2.LOADER_COMPLETE, i)) : t.emit(LOADER_EVENTS$2.LOADER_COMPLETE, e));
          });break;case READ_STREAM:default:
          return this._onReader(e.body.getReader(), r);}
    } }, { key: "_onReader", value: function value(e, t) {
      var i = this._context.getInstance(this.buffer);if (!i && this._reader || this._destroyed) try {
        this._reader.cancel();
      } catch (e) {}if (this._reader = e, !1 !== this.loading) {
        var r = this;this._reader && this._reader.read().then(function (n) {
          if (!r._canceled && !r._destroyed) return n.done ? (r.loading = !1, r.status = 0, void r.emit(LOADER_EVENTS$2.LOADER_COMPLETE, i)) : (i.push(n.value), r.emit(LOADER_EVENTS$2.LOADER_DATALOADED, i), r._onReader(e, t));if (r._reader) try {
            r._reader.cancel();
          } catch (e) {}
        }).catch(function (e) {
          r.loading = !1, r.emit(LOADER_EVENTS$2.LOADER_ERROR, r.TAG, e);
        });
      }
    } }, { key: "getParams", value: function value(e) {
      var t = Object.assign({}, e),
          i = new Headers(),
          r = { method: "GET", headers: i, mode: "cors", cache: "default" };if ("object" === _typeof$2(this.configs.headers)) {
        var n = this.configs.headers;for (var a in n) {
          n.hasOwnProperty(a) && i.append(a, n[a]);
        }
      }if ("object" === _typeof$2(t.headers)) {
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
      this._context.registry("FETCH_LOADER", FetchLoader$1), this._context.registry("LOADER_BUFFER", XgBuffer$1), this._context.registry("FLV_DEMUXER", FlvDemuxer$1), this._context.registry("TRACKS", Tracks$1), this._context.registry("MP4_REMUXER", Remuxer.Mp4Remuxer), this._context.registry("PRE_SOURCE_BUFFER", PreSource$1), !1 !== this._player.config.compatibility && this._context.registry("COMPATIBILITY", Compatibility$1), this._context.registry("LOGGER", Logger), this.mse = this._context.registry("MSE", Mse)({ container: this._player.video }), this._handleTimeUpdate = this._handleTimeUpdate.bind(this), this.initListeners();
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
        var n = t.buffered.end(r - 1);n - e > 2 * i && (this._player.currentTime = n - i), this.mse.doAppend();
      }
    } }, { key: "_handleTimeUpdate", value: function value() {
      var e = this,
          t = this._player.currentTime,
          i = this._player.video,
          r = i.buffered;if (r && r.length) {
        var n = [0, 0],
            a = i.currentTime;if (r) for (var s = 0, o = r.length; s < o && (n[0] = r.start(s), n[1] = r.end(s), !(n[0] <= a && a <= n[1])); s++) {}var u = n[0],
            l = n[1];if (a > l || a < u) return void (i.currentTime = u);if (t - u > 10 || r.length > 1) {
          if (this.bufferClearTimer || !this.state.randomAccessPoints.length) return;for (var c = 1 / 0, f = 0; f < this.state.randomAccessPoints.length; f++) {
            var h = Math.ceil(this.state.randomAccessPoints[f] / 1e3);if (h > t - 10) break;c = h;
          }this.mse.remove(Math.max(Math.min(c, t - 10, l - 10), .1), 0), this.bufferClearTimer = setTimeout(function () {
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
      var n = { errorType: e, errorDetails: "[" + t + "]: " + i.message, errorFatal: r || !1 };this._player.emit(FLV_ERROR, n);
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
    classCallCheck$1(this, t);var i = possibleConstructorReturn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));return i.context = new Context$1(flvAllowedEvents), i.initEvents(), i.loaderCompleteTimer = null, i;
  }return inherits(t, e), createClass$1(t, [{ key: "start", value: function value() {
      this.initFlv(), this.context.init(), get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "start", this).call(this, this.flv.mse.url);
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
        e.context = new Context$1(flvAllowedEvents);var i = e.context.registry("FLV_CONTROLLER", FlvController)(e);return e.initFlvEvents(i), e.flv = i, e.context.init(), get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "start", e).call(e, i.mse.url), get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "play", e).call(e);
      }) : get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "play", this).call(this);
    } }, { key: "pause", value: function value() {
      get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "pause", this).call(this), this.flv && this.flv.pause();
    } }, { key: "loadData", value: function value() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.currentTime;this.flv && this.flv.seek(e);
    } }, { key: "destroy", value: function value() {
      var e = this;this._destroy().then(function () {
        get(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", e).call(e);
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
    } }], [{ key: "isSupported", value: function value() {
      return window.MediaSource && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
    } }]), t;
}(Player);

function _classCallCheck$s(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function EventHandlers$1() {}function EventEmitter$1() {
  EventEmitter$1.init.call(this);
}function $getMaxListeners$1(e) {
  return void 0 === e._maxListeners ? EventEmitter$1.defaultMaxListeners : e._maxListeners;
}function emitNone$1(e, t, i) {
  if (t) e.call(i);else for (var n = e.length, r = arrayClone$1(e, n), a = 0; a < n; ++a) {
    r[a].call(i);
  }
}function emitOne$1(e, t, i, n) {
  if (t) e.call(i, n);else for (var r = e.length, a = arrayClone$1(e, r), s = 0; s < r; ++s) {
    a[s].call(i, n);
  }
}function emitTwo$1(e, t, i, n, r) {
  if (t) e.call(i, n, r);else for (var a = e.length, s = arrayClone$1(e, a), o = 0; o < a; ++o) {
    s[o].call(i, n, r);
  }
}function emitThree$1(e, t, i, n, r, a) {
  if (t) e.call(i, n, r, a);else for (var s = e.length, o = arrayClone$1(e, s), u = 0; u < s; ++u) {
    o[u].call(i, n, r, a);
  }
}function emitMany$1(e, t, i, n) {
  if (t) e.apply(i, n);else for (var r = e.length, a = arrayClone$1(e, r), s = 0; s < r; ++s) {
    a[s].apply(i, n);
  }
}function _addListener$1(e, t, i, n) {
  var r, a, s;if ("function" != typeof i) throw new TypeError('"listener" argument must be a function');if (a = e._events, a ? (a.newListener && (e.emit("newListener", t, i.listener ? i.listener : i), a = e._events), s = a[t]) : (a = e._events = new EventHandlers$1(), e._eventsCount = 0), s) {
    if ("function" == typeof s ? s = a[t] = n ? [i, s] : [s, i] : n ? s.unshift(i) : s.push(i), !s.warned && (r = $getMaxListeners$1(e)) && r > 0 && s.length > r) {
      s.warned = !0;var o = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + t + " listeners added. Use emitter.setMaxListeners() to increase limit");o.name = "MaxListenersExceededWarning", o.emitter = e, o.type = t, o.count = s.length, emitWarning$1(o);
    }
  } else s = a[t] = i, ++e._eventsCount;return e;
}function emitWarning$1(e) {
  "function" == typeof console.warn ? console.warn(e) : console.log(e);
}function _onceWrap$1(e, t, i) {
  function n() {
    e.removeListener(t, n), r || (r = !0, i.apply(e, arguments));
  }var r = !1;return n.listener = i, n;
}function listenerCount$1(e) {
  var t = this._events;if (t) {
    var i = t[e];if ("function" == typeof i) return 1;if (i) return i.length;
  }return 0;
}function spliceOne$1(e, t) {
  for (var i = t, n = i + 1, r = e.length; n < r; i += 1, n += 1) {
    e[i] = e[n];
  }e.pop();
}function arrayClone$1(e, t) {
  for (var i = new Array(t); t--;) {
    i[t] = e[t];
  }return i;
}function unwrapListeners$1(e) {
  for (var t = new Array(e.length), i = 0; i < t.length; ++i) {
    t[i] = e[i].listener || e[i];
  }return t;
}function _possibleConstructorReturn$2(e, t) {
  if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" !== (void 0 === t ? "undefined" : _typeof$3(t)) && "function" != typeof t ? e : t;
}function _inherits$2(e, t) {
  if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : _typeof$3(t)));e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}function _classCallCheck$1$1(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$2$1(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$3$1(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$4$1(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$5$1(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$6$1(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$7$1(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$8$1(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$9$1(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function unwrapExports$1(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}function createCommonjsModule$1(e, t) {
  return t = { exports: {} }, e(t, t.exports), t.exports;
}function _classCallCheck$a$1(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$b$1(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$c$1(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$d$1(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$e$1(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$f$1(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$g$1(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _possibleConstructorReturn$1$1(e, t) {
  if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" !== (void 0 === t ? "undefined" : _typeof$3(t)) && "function" != typeof t ? e : t;
}function _inherits$1$1(e, t) {
  if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t ? "undefined" : _typeof$3(t)));e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}function _classCallCheck$h$1(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$i$1(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$j$1(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$k$1(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$l$1(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}function _classCallCheck$m$1(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}var _createClass$s = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }return function (t, i, n) {
    return i && e(t.prototype, i), n && e(t, n), t;
  };
}(),
    isObjectFilled$1 = function isObjectFilled(e) {
  for (var t in e) {
    if (e.hasOwnProperty(t) && null === e[t]) return !1;
  }return !0;
},
    MediaInfo$1 = function () {
  function e() {
    _classCallCheck$s(this, e), this.mimeType = null, this.duration = null, this.hasVideo = null, this.video = { codec: null, width: null, height: null, profile: null, level: null, frameRate: { fixed: !0, fps: 25, fps_num: 25e3, fps_den: 1e3 }, chromaFormat: null, parRatio: { width: 1, height: 1 } }, this.hasAudio = null, this.audio = { codec: null, sampleRate: null, sampleRateIndex: null, channelCount: null };
  }return _createClass$s(e, [{ key: "isComplete", value: function value() {
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
      n,
      r,
      a,
      s,
      o,
      u = "error" === e;if (s = this._events) u = u && null == s.error;else if (!u) return !1;if (o = this.domain, u) {
    if (t = arguments[1], !o) {
      if (t instanceof Error) throw t;var l = new Error('Uncaught, unspecified "error" event. (' + t + ")");throw l.context = t, l;
    }return t || (t = new Error('Uncaught, unspecified "error" event')), t.domainEmitter = this, t.domain = o, t.domainThrown = !1, o.emit("error", t), !1;
  }if (!(i = s[e])) return !1;var c = "function" == typeof i;switch (n = arguments.length) {case 1:
      emitNone$1(i, c, this);break;case 2:
      emitOne$1(i, c, this, arguments[1]);break;case 3:
      emitTwo$1(i, c, this, arguments[1], arguments[2]);break;case 4:
      emitThree$1(i, c, this, arguments[1], arguments[2], arguments[3]);break;default:
      for (r = new Array(n - 1), a = 1; a < n; a++) {
        r[a - 1] = arguments[a];
      }emitMany$1(i, c, this, r);}return !0;
}, EventEmitter$1.prototype.addListener = function (e, t) {
  return _addListener$1(this, e, t, !1);
}, EventEmitter$1.prototype.on = EventEmitter$1.prototype.addListener, EventEmitter$1.prototype.prependListener = function (e, t) {
  return _addListener$1(this, e, t, !0);
}, EventEmitter$1.prototype.once = function (e, t) {
  if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');return this.on(e, _onceWrap$1(this, e, t)), this;
}, EventEmitter$1.prototype.prependOnceListener = function (e, t) {
  if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');return this.prependListener(e, _onceWrap$1(this, e, t)), this;
}, EventEmitter$1.prototype.removeListener = function (e, t) {
  var i, n, r, a, s;if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');if (!(n = this._events)) return this;if (!(i = n[e])) return this;if (i === t || i.listener && i.listener === t) 0 == --this._eventsCount ? this._events = new EventHandlers$1() : (delete n[e], n.removeListener && this.emit("removeListener", e, i.listener || t));else if ("function" != typeof i) {
    for (r = -1, a = i.length; a-- > 0;) {
      if (i[a] === t || i[a].listener && i[a].listener === t) {
        s = i[a].listener, r = a;break;
      }
    }if (r < 0) return this;if (1 === i.length) {
      if (i[0] = void 0, 0 == --this._eventsCount) return this._events = new EventHandlers$1(), this;delete n[e];
    } else spliceOne$1(i, r);n.removeListener && this.emit("removeListener", e, s || t);
  }return this;
}, EventEmitter$1.prototype.removeAllListeners = function (e) {
  var t, i;if (!(i = this._events)) return this;if (!i.removeListener) return 0 === arguments.length ? (this._events = new EventHandlers$1(), this._eventsCount = 0) : i[e] && (0 == --this._eventsCount ? this._events = new EventHandlers$1() : delete i[e]), this;if (0 === arguments.length) {
    for (var n, r = Object.keys(i), a = 0; a < r.length; ++a) {
      "removeListener" !== (n = r[a]) && this.removeAllListeners(n);
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
};var _typeof$3 = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
  return typeof e === "undefined" ? "undefined" : _typeof(e);
} : function (e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
},
    classCallCheck$2 = function classCallCheck(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
},
    createClass$2 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }return function (t, i, n) {
    return i && e(t.prototype, i), n && e(t, n), t;
  };
}(),
    get$1 = function e(t, i, n) {
  null === t && (t = Function.prototype);var r = Object.getOwnPropertyDescriptor(t, i);if (void 0 === r) {
    var a = Object.getPrototypeOf(t);return null === a ? void 0 : e(a, i, n);
  }if ("value" in r) return r.value;var s = r.get;if (void 0 !== s) return s.call(n);
},
    inherits$1 = function inherits(e, t) {
  if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : _typeof(t)));e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
},
    possibleConstructorReturn$1 = function possibleConstructorReturn(e, t) {
  if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && "function" != typeof t ? e : t;
},
    _get$1 = function e(t, i, n) {
  null === t && (t = Function.prototype);var r = Object.getOwnPropertyDescriptor(t, i);if (void 0 === r) {
    var a = Object.getPrototypeOf(t);return null === a ? void 0 : e(a, i, n);
  }if ("value" in r) return r.value;var s = r.get;if (void 0 !== s) return s.call(n);
},
    _createClass$1$1 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }return function (t, i, n) {
    return i && e(t.prototype, i), n && e(t, n), t;
  };
}(),
    DIRECT_EMIT_FLAG$1 = "__TO__",
    Context$2 = function () {
  function e() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];_classCallCheck$1$1(this, e), this._emitter = new EventEmitter$1(), this._instanceMap = {}, this._clsMap = {}, this._inited = !1, this.mediaInfo = new MediaInfo$1(), this.allowedEvents = t, this._hooks = {}, this._emitCounter = {};
  }return _createClass$1$1(e, [{ key: "getInstance", value: function value(e) {
      var t = this._instanceMap[e];return t || null;
    } }, { key: "initInstance", value: function value(e) {
      if (this._clsMap[e]) {
        for (var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) {
          i[n - 1] = arguments[n];
        }var r = new (Function.prototype.bind.apply(this._clsMap[e], [null].concat(i)))();return this._instanceMap[e] = r, r.init && r.init(), r;
      }throw new Error(e + "未在context中注册");
    } }, { key: "init", value: function value(e) {
      if (!this._inited) {
        for (var t in this._clsMap) {
          this._clsMap.hasOwnProperty(t) && !this._instanceMap[t] && this.initInstance(t, e);
        }this._inited = !0;
      }
    } }, { key: "registry", value: function value(e, t) {
      var i = this,
          n = this._emitter,
          r = this._isMessageNameValid.bind(this),
          a = this,
          s = function (t) {
        function i(t, n, r) {
          _classCallCheck$1$1(this, i);var s = _possibleConstructorReturn$2(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, t, n, r));return s.listeners = {}, s.onceListeners = {}, s.TAG = e, s._context = a, s;
        }return _inherits$2(i, t), _createClass$1$1(i, [{ key: "on", value: function value(t, i) {
            return r(t), this.listeners[t] ? this.listeners[t].push(i) : this.listeners[t] = [i], n.on("" + t + DIRECT_EMIT_FLAG$1 + e, i), n.on(t, i);
          } }, { key: "before", value: function value(e, t) {
            r(e), a._hooks[e] ? a._hooks[e].push(t) : a._hooks[e] = [t];
          } }, { key: "once", value: function value(t, i) {
            return r(t), this.onceListeners[t] ? this.onceListeners[t].push(i) : this.onceListeners[t] = [i], n.once("" + t + DIRECT_EMIT_FLAG$1 + e, i), n.once(t, i);
          } }, { key: "emit", value: function value(e) {
            if (r(e), a._emitCounter[e]) {
              if (a._emitCounter[e] += 1, a._emitCounter[e] % 1e3 == 0) {
                window.console && (window.console.warn("invoke: ", e), window.localStorage.setItem("xgplayer_invoke_" + e, a._emitCounter[e]));
              }
            } else a._emitCounter[e] = 1;var t = a._hooks ? a._hooks[e] : null;if (t) for (var i = 0, s = t.length; i < s; i++) {
              (0, t[i])();
            }for (var o = arguments.length, u = Array(o > 1 ? o - 1 : 0), l = 1; l < o; l++) {
              u[l - 1] = arguments[l];
            }return n.emit.apply(n, [e].concat(u));
          } }, { key: "emitTo", value: function value(e, t) {
            r(t);for (var i = arguments.length, a = Array(i > 2 ? i - 2 : 0), s = 2; s < i; s++) {
              a[s - 2] = arguments[s];
            }return n.emit.apply(n, ["" + t + DIRECT_EMIT_FLAG$1 + e].concat(a));
          } }, { key: "off", value: function value(e, t) {
            return r(e), n.off(e, t);
          } }, { key: "removeListeners", value: function value() {
            var t = Object.prototype.hasOwnProperty.bind(this.listeners);for (var i in this.listeners) {
              if (t(i)) for (var r = this.listeners[i] || [], a = 0; a < r.length; a++) {
                var s = r[a];n.off(i, s), n.off("" + i + DIRECT_EMIT_FLAG$1 + e, s);
              }
            }for (var o in this.onceListeners) {
              if (t(o)) for (var u = this.onceListeners[o] || [], l = 0; l < u.length; l++) {
                var c = u[l];n.off(o, c), n.off("" + o + DIRECT_EMIT_FLAG$1 + e, c);
              }
            }
          } }, { key: "destroy", value: function value() {
            if (this.removeListeners(), this.listeners = {}, delete a._instanceMap[e], _get$1(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "destroy", this)) return _get$1(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "destroy", this).call(this);
          } }]), i;
      }(t);return this._clsMap[e] = s, function () {
        for (var t = arguments.length, n = Array(t), r = 0; r < t; r++) {
          n[r] = arguments[r];
        }return i.initInstance.apply(i, [e].concat(n));
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
        n = /(?:Android)/.test(e),
        r = /(?:Firefox)/.test(e),
        a = /(?:iPad|PlayBook)/.test(e) || n && !/(?:Mobile)/.test(e) || r && /(?:Tablet)/.test(e),
        s = /(?:iPhone)/.test(e) && !a;return { isTablet: a, isPhone: s, isAndroid: n, isPc: !s && !n && !i, isSymbian: i, isWindowsPhone: t, isFireFox: r };
  }, get isLe() {
    return le$2;
  } },
    le$1$1 = function () {
  var e = new ArrayBuffer(2);return new DataView(e).setInt16(0, 256, !0), 256 === new Int16Array(e)[0];
}(),
    _createClass$2$1 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }return function (t, i, n) {
    return i && e(t.prototype, i), n && e(t, n), t;
  };
}(),
    UTF8$2 = function () {
  function e() {
    _classCallCheck$2$1(this, e);
  }return _createClass$2$1(e, null, [{ key: "decode", value: function value(t) {
      for (var i = [], n = t, r = 0, a = t.length; r < a;) {
        if (n[r] < 128) i.push(String.fromCharCode(n[r])), ++r;else {
          if (n[r] < 192) ;else if (n[r] < 224) {
            if (e._checkContinuation(n, r, 1)) {
              var s = (31 & n[r]) << 6 | 63 & n[r + 1];if (s >= 128) {
                i.push(String.fromCharCode(65535 & s)), r += 2;continue;
              }
            }
          } else if (n[r] < 240) {
            if (e._checkContinuation(n, r, 2)) {
              var o = (15 & n[r]) << 12 | (63 & n[r + 1]) << 6 | 63 & n[r + 2];if (o >= 2048 && 55296 != (63488 & o)) {
                i.push(String.fromCharCode(65535 & o)), r += 3;continue;
              }
            }
          } else if (n[r] < 248 && e._checkContinuation(n, r, 3)) {
            var u = (7 & n[r]) << 18 | (63 & n[r + 1]) << 12 | (63 & n[r + 2]) << 6 | 63 & n[r + 3];if (u > 65536 && u < 1114112) {
              u -= 65536, i.push(String.fromCharCode(u >>> 10 | 55296)), i.push(String.fromCharCode(1023 & u | 56320)), r += 4;continue;
            }
          }i.push(String.fromCharCode(65533)), ++r;
        }
      }return i.join("");
    } }, { key: "_checkContinuation", value: function value(e, t, i) {
      var n = e;if (t + i < n.length) {
        for (; i--;) {
          if (128 != (192 & n[++t])) return !1;
        }return !0;
      }return !1;
    } }]), e;
}(),
    _slicedToArray$1 = function () {
  function e(e, t) {
    var i = [],
        n = !0,
        r = !1,
        a = void 0;try {
      for (var s, o = e[Symbol.iterator](); !(n = (s = o.next()).done) && (i.push(s.value), !t || i.length !== t); n = !0) {}
    } catch (e) {
      r = !0, a = e;
    } finally {
      try {
        !n && o.return && o.return();
      } finally {
        if (r) throw a;
      }
    }return i;
  }return function (t, i) {
    if (Array.isArray(t)) return t;if (Symbol.iterator in Object(t)) return e(t, i);throw new TypeError("Invalid attempt to destructure non-iterable instance");
  };
}(),
    _createClass$3$1 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }return function (t, i, n) {
    return i && e(t.prototype, i), n && e(t, n), t;
  };
}(),
    MediaSample$1 = function () {
  function e(t) {
    var i = this;_classCallCheck$3$1(this, e);var n = e.getDefaultInf();if (!t || "[object Object]" !== Object.prototype.toString.call(t)) return n;var r = Object.assign({}, n, t);Object.entries(r).forEach(function (e) {
      var t = _slicedToArray$1(e, 2),
          n = t[0],
          r = t[1];i[n] = r;
    });
  }return _createClass$3$1(e, null, [{ key: "getDefaultInf", value: function value() {
      return { dts: null, pts: null, duration: null, position: null, isRAP: !1, originDts: null };
    } }]), e;
}(),
    _createClass$4$1 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }return function (t, i, n) {
    return i && e(t.prototype, i), n && e(t, n), t;
  };
}(),
    MediaSegment$1 = function () {
  function e() {
    _classCallCheck$4$1(this, e), this.startDts = -1, this.endDts = -1, this.startPts = -1, this.endPts = -1, this.originStartDts = -1, this.originEndDts = -1, this.randomAccessPoints = [], this.firstSample = null, this.lastSample = null;
  }return _createClass$4$1(e, [{ key: "addRAP", value: function value(e) {
      e.isRAP = !0, this.randomAccessPoints.push(e);
    } }]), e;
}(),
    _createClass$5$1 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }return function (t, i, n) {
    return i && e(t.prototype, i), n && e(t, n), t;
  };
}(),
    MediaSegmentList$2 = function () {
  function e(t) {
    _classCallCheck$5$1(this, e), this._type = t, this._list = [], this._lastAppendLocation = -1;
  }return _createClass$5$1(e, [{ key: "isEmpty", value: function value() {
      return 0 === this._list.length;
    } }, { key: "clear", value: function value() {
      this._list = [], this._lastAppendLocation = -1;
    } }, { key: "_searchNearestSegmentBefore", value: function value(e) {
      var t = this._list;if (0 === t.length) return -2;var i = t.length - 1,
          n = 0,
          r = 0,
          a = i,
          s = 0;if (e < t[0].originDts) return s = -1;for (; r <= a;) {
        if ((n = r + Math.floor((a - r) / 2)) === i || e > t[n].lastSample.originDts && e < t[n + 1].originDts) {
          s = n;break;
        }t[n].originDts < e ? r = n + 1 : a = n - 1;
      }return s;
    } }, { key: "_searchNearestSegmentAfter", value: function value(e) {
      return this._searchNearestSegmentBefore(e) + 1;
    } }, { key: "append", value: function value(e) {
      var t = this._list,
          i = this._lastAppendLocation,
          n = 0;-1 !== i && i < t.length && e.originStartDts >= t[i].lastSample.originDts && (i === t.length - 1 || i < t.length - 1 && e.originStartDts < t[i + 1].originStartDts) ? n = i + 1 : t.length > 0 && (n = this._searchNearestSegmentBefore(e.originStartDts) + 1), this._lastAppendLocation = n, this._list.splice(n, 0, e);
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
    _createClass$6$1 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }return function (t, i, n) {
    return i && e(t.prototype, i), n && e(t, n), t;
  };
}(),
    AudioTrackMeta$2 = function () {
  function e(t) {
    _classCallCheck$6$1(this, e);var i = { sampleRate: 48e3, channelCount: 2, codec: "mp4a.40.2", config: [41, 401, 136, 0], duration: 0, id: 2, refSampleDuration: 21, sampleRateIndex: 3, timescale: 1e3, type: "audio" };return t ? Object.assign({}, i, t) : i;
  }return _createClass$6$1(e, [{ key: "destroy", value: function value() {
      this.init = null;
    } }]), e;
}(),
    VideoTrackMeta$2 = function () {
  function e(t) {
    _classCallCheck$6$1(this, e);var i = { avcc: null, sps: new Uint8Array(0), pps: new Uint8Array(0), chromaFormat: 420, codec: "avc1.640020", codecHeight: 720, codecWidth: 1280, duration: 0, frameRate: { fixed: !0, fps: 25, fps_num: 25e3, fps_den: 1e3 }, id: 1, level: "3.2", presentHeight: 720, presentWidth: 1280, profile: "High", refSampleDuration: 40, parRatio: { height: 1, width: 1 }, timescale: 1e3, type: "video" };return t ? Object.assign({}, i, t) : i;
  }return _createClass$6$1(e, [{ key: "destroy", value: function value() {
      this.init = null, this.sps = null, this.pps = null;
    } }]), e;
}(),
    _createClass$7$1 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }return function (t, i, n) {
    return i && e(t.prototype, i), n && e(t, n), t;
  };
}(),
    AudioTrackSample$2 = function () {
  function e(t) {
    _classCallCheck$7$1(this, e);var i = e.getDefault();return t ? Object.assign({}, i, t) : i;
  }return _createClass$7$1(e, null, [{ key: "getDefault", value: function value() {
      return { dts: null, pts: null, data: new Uint8Array() };
    } }]), e;
}(),
    VideoTrackSample$2 = function () {
  function e(t) {
    _classCallCheck$7$1(this, e);var i = e.getDefault();return t ? Object.assign({}, i, t) : i;
  }return _createClass$7$1(e, null, [{ key: "getDefault", value: function value() {
      return { dts: null, pts: null, isKeyframe: !1, originDts: null, data: new Uint8Array() };
    } }]), e;
}(),
    _createClass$8$1 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }return function (t, i, n) {
    return i && e(t.prototype, i), n && e(t, n), t;
  };
}(),
    MSE$1 = function () {
  function e(t) {
    _classCallCheck$8$1(this, e), this.configs = Object.assign({}, t), this.container = this.configs.container, this.mediaSource = null, this.sourceBuffers = {}, this.preloadTime = this.configs.preloadTime || 1, this.onSourceOpen = this.onSourceOpen.bind(this), this.onTimeUpdate = this.onTimeUpdate.bind(this), this.onUpdateEnd = this.onUpdateEnd.bind(this), this.onWaiting = this.onWaiting.bind(this);
  }return _createClass$8$1(e, [{ key: "init", value: function value() {
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
            i = void 0;e = e.sources;for (var n = !1, r = 0, a = Object.keys(e).length; r < a; r++) {
          var s = Object.keys(e)[r];if ("audio" === s ? i = t.audioTrack : "video" === s && (i = t.videoTrack), i) {
            var o = "audio" === s ? 21 : 40;i.meta && i.meta.refSampleDuration && (o = i.meta.refSampleDuration), e[s].data.length >= this.preloadTime / o && (n = !0);
          }
        }if (n) {
          if (Object.keys(this.sourceBuffers).length > 0) return;for (var u = 0, l = Object.keys(e).length; u < l; u++) {
            var c = Object.keys(e)[u],
                f = e[c],
                h = "video" === c ? "video/mp4;codecs=" + f.mimetype : "audio/mp4;codecs=" + f.mimetype,
                d = this.mediaSource.addSourceBuffer(h);this.sourceBuffers[c] = d, d.addEventListener("updateend", this.onUpdateEnd), this.doAppend();
          }
        }
      }
    } }, { key: "doAppend", value: function value() {
      var e = this._context.getInstance("PRE_SOURCE_BUFFER");if (e) for (var t = 0; t < Object.keys(this.sourceBuffers).length; t++) {
        var i = Object.keys(this.sourceBuffers)[t],
            n = this.sourceBuffers[i];if (!n.updating) {
          var r = e.sources[i];if (r && !r.inited) n.appendBuffer(r.init.buffer.buffer), r.inited = !0;else if (r) {
            var a = r.data.shift();a && n.appendBuffer(a.buffer.buffer);
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
        var n = this.sourceBuffers[Object.keys(this.sourceBuffers)[i]];n.updating || n.remove(t, e);
      }
    } }, { key: "removeBuffers", value: function value() {
      for (var t = this, i = [], n = 0; n < Object.keys(this.sourceBuffers).length; n++) {
        !function (n) {
          var r = t.sourceBuffers[Object.keys(t.sourceBuffers)[n]];r.removeEventListener("updateend", t.onUpdateEnd);var a = void 0;a = r.updating ? new Promise(function (t) {
            var i = function i() {
              var n = 3,
                  a = function i() {
                r.updating ? n > 0 ? (setTimeout(i, 200), n--) : t() : (e.clearBuffer(r), r.addEventListener("updateend", function () {
                  t();
                }));
              };setTimeout(a, 200), r.removeEventListener("updateend", i);
            };r.addEventListener("updateend", i);
          }) : new Promise(function (t) {
            e.clearBuffer(r), r.addEventListener("updateend", function () {
              t();
            });
          }), i.push(a);
        }(n);
      }return Promise.all(i);
    } }, { key: "destroy", value: function value() {
      var e = this;return this.removeBuffers().then(function () {
        for (var t = 0; t < Object.keys(e.sourceBuffers).length; t++) {
          var i = e.sourceBuffers[Object.keys(e.sourceBuffers)[t]];e.mediaSource.removeSourceBuffer(i), delete e.sourceBuffers[Object.keys(e.sourceBuffers)[t]];
        }e.container.removeEventListener("timeupdate", e.onTimeUpdate), e.container.removeEventListener("waiting", e.onWaiting), e.mediaSource.removeEventListener("sourceopen", e.onSourceOpen), e.endOfStream(), window.URL.revokeObjectURL(e.url), e.url = null, e.configs = {}, e.container = null, e.mediaSource = null, e.sourceBuffers = {}, e.preloadTime = 1;
      });
    } }], [{ key: "clearBuffer", value: function value(e) {
      for (var t = e.buffered, i = .1, n = 0, r = t.length; n < r; n++) {
        i = t.end(n);
      }try {
        e.remove(0, i);
      } catch (e) {}
    } }]), e;
}(),
    _createClass$9$1 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }return function (t, i, n) {
    return i && e(t.prototype, i), n && e(t, n), t;
  };
}(),
    Stream$2 = function () {
  function e(t) {
    if (_classCallCheck$9$1(this, e), !(t instanceof ArrayBuffer)) throw new Error("data is invalid");this.buffer = t, this.dataview = new DataView(t), this.dataview.position = 0;
  }return _createClass$9$1(e, [{ key: "back", value: function value(e) {
      this.position -= e;
    } }, { key: "skip", value: function value(t) {
      for (var i = Math.floor(t / 4), n = t % 4, r = 0; r < i; r++) {
        e.readByte(this.dataview, 4);
      }n > 0 && e.readByte(this.dataview, n);
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
      var n = void 0;switch (t) {case 1:
          n = i ? e.getInt8(e.position) : e.getUint8(e.position);break;case 2:
          n = i ? e.getInt16(e.position) : e.getUint16(e.position);break;case 3:
          if (i) throw new Error("not supported for readByte 3");n = e.getUint8(e.position) << 16, n |= e.getUint8(e.position + 1) << 8, n |= e.getUint8(e.position + 2);break;case 4:
          n = i ? e.getInt32(e.position) : e.getUint32(e.position);break;case 8:
          if (i) throw new Error("not supported for readBody 8");n = e.getUint32(e.position) << 32, n |= e.getUint32(e.position + 4);break;default:
          n = "";}return e.position += t, n;
    } }]), e;
}(),
    concat$1 = createCommonjsModule$1(function (e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.default = function (e) {
    for (var t = 0, i = arguments.length, n = Array(i > 1 ? i - 1 : 0), r = 1; r < i; r++) {
      n[r - 1] = arguments[r];
    }var a = !0,
        s = !1,
        o = void 0;try {
      for (var u, l = n[Symbol.iterator](); !(a = (u = l.next()).done); a = !0) {
        t += u.value.length;
      }
    } catch (e) {
      s = !0, o = e;
    } finally {
      try {
        !a && l.return && l.return();
      } finally {
        if (s) throw o;
      }
    }var c = new e(t),
        f = 0,
        h = !0,
        d = !1,
        p = void 0;try {
      for (var v, y = n[Symbol.iterator](); !(h = (v = y.next()).done); h = !0) {
        var m = v.value;c.set(m, f), f += m.length;
      }
    } catch (e) {
      d = !0, p = e;
    } finally {
      try {
        !h && y.return && y.return();
      } finally {
        if (d) throw p;
      }
    }return c;
  };
});unwrapExports$1(concat$1);var lib$1 = createCommonjsModule$1(function (e) {
  var t = function (e) {
    return e && e.__esModule ? e : { default: e };
  }(concat$1);e.exports = t.default;
}),
    Concat$1 = unwrapExports$1(lib$1),
    _createClass$a$1 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }return function (t, i, n) {
    return i && e(t.prototype, i), n && e(t, n), t;
  };
}(),
    Buffer$2 = function () {
  function e(t) {
    _classCallCheck$a$1(this, e), this.buffer = t || new Uint8Array(0);
  }return _createClass$a$1(e, [{ key: "write", value: function value() {
      for (var e = this, t = arguments.length, i = Array(t), n = 0; n < t; n++) {
        i[n] = arguments[n];
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
    _createClass$b$1 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }return function (t, i, n) {
    return i && e(t.prototype, i), n && e(t, n), t;
  };
}(),
    CRYTO_EVENTS$1$1 = _EVENTS$1.CRYTO_EVENTS,
    Crypto$1 = function () {
  function e(t) {
    _classCallCheck$b$1(this, e), this.inputBuffer = t.inputbuffer, this.outputBuffer = t.outputbuffer, this.key = t.key, this.iv = t.iv, this.method = t.method, this.crypto = window.crypto || window.msCrypto;
  }return _createClass$b$1(e, [{ key: "init", value: function value() {
      this.on(CRYTO_EVENTS$1$1.START_DECRYPT, this.decript.bind(this));
    } }, { key: "decript", value: function value() {
      var e = this;this.aeskey ? this.decriptData() : this.crypto.subtle.importKey("raw", this.key.buffer, { name: "AES-CBC" }, !1, ["encrypt", "decrypt"]).then(function (t) {
        e.aeskey = t, e.decriptData();
      });
    } }, { key: "decriptData", value: function value() {
      var e = this,
          t = this._context.getInstance(this.inputBuffer),
          i = this._context.getInstance(this.outputBuffer),
          n = t.shift();n && this.crypto.subtle.decrypt({ name: "AES-CBC", iv: this.iv.buffer }, this.aeskey, n).then(function (t) {
        i.push(new Uint8Array(t)), e.emit(CRYTO_EVENTS$1$1.DECRYPTED), e.decriptData(n);
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
    _createClass$c$1 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }return function (t, i, n) {
    return i && e(t.prototype, i), n && e(t, n), t;
  };
}(),
    Golomb$1 = function () {
  function e(t) {
    _classCallCheck$c$1(this, e), this.TAG = "Golomb", this._buffer = t, this._bufferIndex = 0, this._totalBytes = t.byteLength, this._totalBits = 8 * t.byteLength, this._currentWord = 0, this._currentWordBitsLeft = 0;
  }return _createClass$c$1(e, [{ key: "destroy", value: function value() {
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
    _createClass$d$1 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }return function (t, i, n) {
    return i && e(t.prototype, i), n && e(t, n), t;
  };
}(),
    SPSParser$1 = function () {
  function e() {
    _classCallCheck$d$1(this, e);
  }return _createClass$d$1(e, null, [{ key: "_ebsp2rbsp", value: function value(e) {
      for (var t = e, i = t.byteLength, n = new Uint8Array(i), r = 0, a = 0; a < i; a++) {
        a >= 2 && 3 === t[a] && 0 === t[a - 1] && 0 === t[a - 2] || (n[r] = t[a], r++);
      }return new Uint8Array(n.buffer, 0, r);
    } }, { key: "parseSPS", value: function value(t) {
      var i = e._ebsp2rbsp(t),
          n = new Golomb$1(i);n.readByte();var r = n.readByte();n.readByte();var a = n.readByte();n.readUEG();var s = e.getProfileString(r),
          o = e.getLevelString(a),
          u = 1,
          l = 420,
          c = [0, 420, 422, 444],
          f = 8;if ((100 === r || 110 === r || 122 === r || 244 === r || 44 === r || 83 === r || 86 === r || 118 === r || 128 === r || 138 === r || 144 === r) && (3 === (u = n.readUEG()) && n.readBits(1), u <= 3 && (l = c[u]), f = n.readUEG() + 8, n.readUEG(), n.readBits(1), n.readBool())) for (var h = 3 !== u ? 8 : 12, d = 0; d < h; d++) {
        n.readBool() && (d < 6 ? e._skipScalingList(n, 16) : e._skipScalingList(n, 64));
      }n.readUEG();var p = n.readUEG();if (0 === p) n.readUEG();else if (1 === p) {
        n.readBits(1), n.readSEG(), n.readSEG();for (var v = n.readUEG(), y = 0; y < v; y++) {
          n.readSEG();
        }
      }n.readUEG(), n.readBits(1);var m = n.readUEG(),
          _ = n.readUEG(),
          E = n.readBits(1);0 === E && n.readBits(1), n.readBits(1);var g = 0,
          k = 0,
          S = 0,
          T = 0;n.readBool() && (g = n.readUEG(), k = n.readUEG(), S = n.readUEG(), T = n.readUEG());var A = 1,
          b = 1,
          C = 0,
          w = !0,
          R = 0,
          D = 0;if (n.readBool()) {
        if (n.readBool()) {
          var L = n.readByte(),
              O = [1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2],
              M = [1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1];L > 0 && L < 16 ? (A = O[L - 1], b = M[L - 1]) : 255 === L && (A = n.readByte() << 8 | n.readByte(), b = n.readByte() << 8 | n.readByte());
        }if (n.readBool() && n.readBool(), n.readBool() && (n.readBits(4), n.readBool() && n.readBits(24)), n.readBool() && (n.readUEG(), n.readUEG()), n.readBool()) {
          var x = n.readBits(32),
              U = n.readBits(32);w = n.readBool(), C = (R = U) / (D = 2 * x);
        }
      }var B = 1;1 === A && 1 === b || (B = A / b);var $ = 0,
          N = 0;0 === u ? ($ = 1, N = 2 - E) : ($ = 3 === u ? 1 : 2, N = (1 === u ? 2 : 1) * (2 - E));var V = 16 * (m + 1),
          I = 16 * (_ + 1) * (2 - E);V -= (g + k) * $, I -= (S + T) * N;var P = Math.ceil(V * B);return n.destroy(), n = null, { profile_string: s, level_string: o, bit_depth: f, chroma_format: l, chroma_format_string: e.getChromaFormatString(l), frame_rate: { fixed: w, fps: C, fps_den: D, fps_num: R }, par_ratio: { width: A, height: b }, codec_size: { width: V, height: I }, present_size: { width: P, height: I } };
    } }, { key: "_skipScalingList", value: function value(e, t) {
      for (var i = 8, n = 8, r = 0; r < t; r++) {
        0 !== n && (n = (i + e.readSEG() + 256) % 256), i = 0 === n ? i : n;
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
          n = t.frameRate.fps_num;t.refSampleDuration = Math.floor(t.timescale * (i / n));
    } }]), e;
}(),
    _createClass$e$1 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }return function (t, i, n) {
    return i && e(t.prototype, i), n && e(t, n), t;
  };
}(),
    Nalunit$2 = function () {
  function e() {
    _classCallCheck$e$1(this, e);
  }return _createClass$e$1(e, null, [{ key: "getNalunits", value: function value(t) {
      if (t.length - t.position < 4) return [];var i = t.dataview,
          n = t.position;return 1 === i.getInt32(n) || 0 === i.getInt16(n) && 1 === i.getInt8(n + 2) ? e.getAnnexbNals(t) : e.getAvccNals(t);
    } }, { key: "getAnnexbNals", value: function value(t) {
      for (var i = [], n = e.getHeaderPositionAnnexB(t), r = n.pos, a = r; r < t.length - 4;) {
        var s = t.buffer.slice(r, r + n.headerLength);n.pos === t.position && t.skip(n.headerLength), a = (n = e.getHeaderPositionAnnexB(t)).pos;var o = { header: s, body: new Uint8Array(t.buffer.slice(r + s.byteLength, a)) };e.analyseNal(o), i.push(o), t.skip(a - t.position), r = a;
      }return i;
    } }, { key: "getAvccNals", value: function value(t) {
      for (var i = []; t.position < t.length - 4;) {
        var n = t.dataview.getInt32();if (!(t.length - t.position >= n)) break;var r = t.buffer.slice(t.position, t.position + 4);t.skip(4);var a = t.buffer.slice(t.position, t.position + n);t.skip(n);var s = { header: r, body: a };e.analyseNal(s), i.push(s);
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
      var i = new Uint8Array(e.byteLength + t.byteLength + 11);i[0] = 1, i[1] = e[1], i[2] = e[2], i[3] = e[3], i[4] = 255, i[5] = 225;var n = 6;return i.set(new Uint8Array([e.byteLength >>> 8 & 255, 255 & e.byteLength]), n), n += 2, i.set(e, n), n += e.byteLength, i[n] = 1, n++, i.set(new Uint8Array([t.byteLength >>> 8 & 255, 255 & t.byteLength]), n), n += 2, i.set(t, n), i;
    } }]), e;
}(),
    _createClass$f$1 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }return function (t, i, n) {
    return i && e(t.prototype, i), n && e(t, n), t;
  };
}(),
    AAC$1 = function () {
  function e() {
    _classCallCheck$f$1(this, e);
  }return _createClass$f$1(e, null, [{ key: "getSilentFrame", value: function value(e, t) {
      if ("mp4a.40.2" === e) {
        if (1 === t) return new Uint8Array([0, 200, 0, 128, 35, 128]);if (2 === t) return new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128]);if (3 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142]);if (4 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56]);if (5 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56]);if (6 === t) return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224]);
      } else {
        if (1 === t) return new Uint8Array([1, 64, 34, 128, 163, 78, 230, 128, 186, 8, 0, 0, 0, 28, 6, 241, 193, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);if (2 === t) return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);if (3 === t) return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
      }return null;
    } }]), e;
}(),
    _createClass$g$1 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }return function (t, i, n) {
    return i && e(t.prototype, i), n && e(t, n), t;
  };
}(),
    REMUX_EVENTS$1$1 = EVENTS$1.REMUX_EVENTS,
    LOADER_EVENTS$1$1 = EVENTS$1.LOADER_EVENTS,
    Compatibility$2 = function () {
  function e() {
    _classCallCheck$g$1(this, e), this.nextAudioDts = 0, this.nextVideoDts = 0, this.lastAudioSamplesLen = 0, this.lastVideoSamplesLen = 0, this.lastVideoDts = void 0, this.lastAudioDts = void 0, this.allAudioSamplesCount = 0, this.allVideoSamplesCount = 0, this._firstAudioSample = null, this._firstVideoSample = null, this.filledAudioSamples = [], this.filledVideoSamples = [], this.videoLastSample = null, this.audioLastSample = null, this._videoLargeGap = 0, this._audioLargeGap = 0;
  }return _createClass$g$1(e, [{ key: "init", value: function value() {
      var e = this;this.before(REMUX_EVENTS$1$1.REMUX_MEDIA, this.doFix.bind(this)), this.on(LOADER_EVENTS$1$1.LOADER_COMPLETE, function () {
        e.videoLastSample && e.videoTrack.samples.unshift(e.videoLastSample);
      });
    } }, { key: "reset", value: function value() {
      this.nextAudioDts = null, this.nextVideoDts = null, this.lastAudioSamplesLen = 0, this.lastVideoSamplesLen = 0, this.lastVideoDts = void 0, this.lastAudioDts = void 0, this.videoLastSample = null, this.audioLastSample = null, this.filledAudioSamples = [], this.filledVideoSamples = [];
    } }, { key: "doFix", value: function value() {
      var t = this.getFirstSample(),
          i = t.isFirstAudioSamples,
          n = t.isFirstVideoSamples;this.recordSamplesCount(), this._firstVideoSample && this.fixRefSampleDuration(this.videoTrack.meta, this.videoTrack.samples), this._firstAudioSample && this.fixRefSampleDuration(this.audioTrack.meta, this.audioTrack.samples);var r = e.detactChangeStream(this.videoTrack.samples),
          a = r.changed,
          s = r.changedIdx;a && !i ? this.fixChangeStreamVideo(s) : this.doFixVideo(n);var o = e.detactChangeStream(this.audioTrack.samples),
          u = o.changed,
          l = o.changedIdx;u ? this.fixChangeStreamAudio(l) : this.doFixAudio(i), this.removeInvalidSamples();
    } }, { key: "doFixVideo", value: function value(t, i) {
      for (var n = this.videoTrack, r = n.samples, a = n.meta, s = 0, o = r.length; s < o; s++) {
        var u = r[s];u.originDts = u.dts;
      }if ((!a.frameRate || !1 !== a.frameRate.fixed) && r && r.length && this._firstVideoSample) {
        var l = r[0];if (this._videoLargeGap > 0 && e.doFixLargeGap(r, this._videoLargeGap), l.dts !== this._firstVideoSample.dts && i && (i && (this.nextVideoDts = i), this._videoLargeGap = this.nextVideoDts - l.dts, e.doFixLargeGap(r, this._videoLargeGap)), t && this._firstAudioSample) {
          var c = this._firstVideoSample.originDts,
              f = c - (this._firstAudioSample.originDts || this._firstAudioSample.dts);if (f > 2 * a.refSampleDuration && f < 10 * a.refSampleDuration) {
            for (var h = Math.floor(f / a.refSampleDuration), d = 0; d < h; d++) {
              var p = Object.assign({}, l);p.dts = c - (d + 1) * a.refSampleDuration, p.pts = p.dts + p.cts, r.unshift(p), this.filledVideoSamples.push({ dts: p.dts, size: p.data.byteLength });
            }this._firstVideoSample = this.filledVideoSamples[0] || this._firstVideoSample;
          } else f < -2 * a.refSampleDuration && (this._videoLargeGap = -1 * f, e.doFixLargeGap(r, -1 * f));
        }var v = r.pop();if (r.length && (r[r.length - 1].duration = v.dts - r[r.length - 1].dts), this.videoLastSample) {
          var y = this.videoLastSample;y.duration = l.dts - y.dts, r.unshift(this.videoLastSample);
        }this.videoLastSample = v, this.videoTrack.samples = r;
      }
    } }, { key: "doFixAudio", value: function value(t, i) {
      var n = this.audioTrack,
          r = n.samples,
          a = n.meta;if (r && r.length) {
        for (var s = 0, o = r.length; s < o; s++) {
          var u = r[s];u.originDts = u.dts;
        }var l = r.length,
            c = AAC$1.getSilentFrame(a.codec, a.channelCount),
            f = this._firstAudioSample,
            h = r[0];if (this._audioLargeGap > 0 && e.doFixLargeGap(r, this._audioLargeGap), h.dts !== this._firstAudioSample.dts && (i || e.detectLargeGap(this.nextAudioDts, h)) && (i && (this.nextAudioDts = i), this._audioLargeGap = this.nextAudioDts - h.dts, e.doFixLargeGap(r, this._audioLargeGap)), this._firstVideoSample && t) {
          var d = this._firstVideoSample.originDts || this._firstVideoSample.dts,
              p = f.dts - d;if (p > a.refSampleDuration && p < 10 * a.refSampleDuration) {
            for (var v = Math.floor((f.dts - d) / a.refSampleDuration), y = 0; y < v; y++) {
              var m = { data: c, datasize: c.byteLength, dts: f.dts - (y + 1) * a.refSampleDuration, filtered: 0 };r.unshift(m), this.filledAudioSamples.push({ dts: m.dts, size: m.data.byteLength });
            }this._firstAudioSample = this.filledAudioSamples[0] || this._firstAudioSample;
          } else p < -1 * a.refSampleDuration && (this._audioLargeGap = -1 * p, e.doFixLargeGap(r, -1 * p));
        }var _ = void 0,
            E = r[0].dts;if (this.nextAudioDts) {
          _ = E - this.nextAudioDts;var g = Math.abs(_);if (g > a.refSampleDuration && 1 === l && 1 === this.lastAudioSamplesLen && (a.refSampleDurationFixed = void 0), _ > 2 * a.refSampleDuration && _ < 10 * a.refSampleDuration) {
            if (1 === l && 1 === this.lastAudioSamplesLen) a.refSampleDurationFixed = void 0 !== a.refSampleDurationFixed ? a.refSampleDurationFixed + _ : a.refSampleDuration + _;else for (var k = Math.floor(_ / a.refSampleDuration), S = 0; S < k; S++) {
              var T = E - (S + 1) * a.refSampleDuration,
                  A = Object.assign({}, r[0], { dts: T > this.nextAudioDts ? T : this.nextAudioDts });this.filledAudioSamples.push({ dts: A.dts, size: A.data.byteLength }), this.audioTrack.samples.unshift(A);
            }
          } else g <= a.refSampleDuration && g > 0 ? (r[0].dts = this.nextAudioDts, r[0].pts = this.nextAudioDts) : _ < 0 && e.doFixLargeGap(r, -1 * _);
        }var b = r[r.length - 1].originDts,
            C = r[r.length - 1].dts,
            w = r.length >= 2 ? b - r[r.length - 2].originDts : a.refSampleDuration;this.lastAudioSamplesLen = l, this.nextAudioDts = a.refSampleDurationFixed ? C + a.refSampleDurationFixed : C + w, this.lastAudioDts = C, r[r.length - 1].duration = w;for (var R = 0, D = r.length; R < D; R++) {
          var L = r[R],
              O = r[R + 1];if (!O) break;var M = O.dts - L.dts;r[R].duration = M;
        }this.audioTrack.samples = e.sortAudioSamples(r);
      }
    } }, { key: "fixChangeStreamVideo", value: function value(e) {
      var t = this.videoTrack,
          i = t.samples,
          n = t.meta,
          r = 0 === e ? this.getStreamChangeStart(i[0]) : i[e - 1].dts,
          a = i[e].dts;if (Math.abs(r - a) <= 2 * n.refSampleDuration) return i[e].options ? i[e].options.isContinue = !0 : i[e].options = { isContinue: !0 }, this.doFixVideo(!1);var s = i.slice(0, e),
          o = i.slice(e),
          u = i[0],
          l = o[0].dts - u.dts,
          c = u.options && u.options.start + l ? u.options.start : null;this.videoTrack.samples = i.slice(0, e), this.doFixVideo(!1), this.videoTrack.samples = i.slice(e), this.doFixVideo(!1, c), this.videoTrack.samples = s.concat(o);
    } }, { key: "fixChangeStreamAudio", value: function value(e) {
      var t = this.audioTrack,
          i = t.samples,
          n = t.meta,
          r = 0 === e ? this.getStreamChangeStart(i[0]) : i[e - 1].dts,
          a = i[e].dts;if (Math.abs(r - a) <= 2 * n.refSampleDuration) return i[e].options ? i[e].options.isContinue = !0 : i[e].options = { isContinue: !0 }, this.doFixAudio(!1);var s = i.slice(0, e),
          o = i.slice(e),
          u = i[0],
          l = o[0].dts - u.dts,
          c = u.options && u.options.start + l ? u.options.start : null;this.audioTrack.samples = s, this.doFixAudio(!1), this.audioTrack.samples = o, this.doFixAudio(!1, c), this.audioTrack.samples = s.concat(o);
    } }, { key: "getFirstSample", value: function value() {
      var t = this.videoTrack.samples,
          i = this.audioTrack.samples,
          n = !1,
          r = !1;return !this._firstVideoSample && t.length && (this._firstVideoSample = e.findFirstVideoSample(t), this.removeInvalidSamples(), n = !0), !this._firstAudioSample && i.length && (this._firstAudioSample = e.findFirstAudioSample(i), this.removeInvalidSamples(), r = !0), { isFirstVideoSamples: n, isFirstAudioSamples: r };
    } }, { key: "fixRefSampleDuration", value: function value(e, t) {
      var i = "video" === e.type,
          n = i ? this.allVideoSamplesCount : this.allAudioSamplesCount,
          r = i ? this._firstVideoSample.dts : this._firstAudioSample.dts,
          a = i ? this.filledVideoSamples.length : this.filledAudioSamples.length;if (!e.refSampleDuration || e.refSampleDuration <= 0 || Number.isNaN(e.refSampleDuration)) {
        if (t.length >= 1) {
          var s = t[t.length - 1].dts;e.refSampleDuration = Math.floor((s - r) / (n + a - 1));
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
      }), i = 0, n = t.length; i < n; i++) {
        if (t[i].isKeyframe) return t[i];
      }
    } }, { key: "detectLargeGap", value: function value(e, t) {
      if (null !== e) {
        var i = t.dts || 0,
            n = e - i >= 1e3 || i - e >= 1e3,
            r = t.options && t.options.discontinue;return n || r;
      }
    } }, { key: "doFixLargeGap", value: function value(e, t) {
      for (var i = 0, n = e.length; i < n; i++) {
        var r = e[i];r.dts += t, r.pts && (r.pts += t);
      }
    } }, { key: "detactChangeStream", value: function value(e) {
      for (var t = !1, i = -1, n = 0, r = e.length; n < r; n++) {
        if (e[n].options && e[n].options.meta) {
          t = !0, i = n;break;
        }
      }return { changed: t, changedIdx: i };
    } }]), e;
}(),
    SpsParser$1 = SPSParser$1,
    Compatibility$1$1 = Compatibility$2,
    _createClass$h$1 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }return function (t, i, n) {
    return i && e(t.prototype, i), n && e(t, n), t;
  };
}(),
    Track$1 = function () {
  function e() {
    _classCallCheck$h$1(this, e), this.id = -1, this.sequenceNumber = 0, this.samples = [], this.droppedSamples = [], this.length = 0;
  }return _createClass$h$1(e, [{ key: "reset", value: function value() {
      this.sequenceNumber = 0, this.samples = [], this.length = 0;
    } }, { key: "distroy", value: function value() {
      this.reset(), this.id = -1;
    } }]), e;
}(),
    AudioTrack$2 = function (e) {
  function t() {
    _classCallCheck$h$1(this, t);var e = _possibleConstructorReturn$1$1(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));return e.TAG = "AudioTrack", e.type = "audio", e;
  }return _inherits$1$1(t, e), t;
}(Track$1),
    VideoTrack$2 = function (e) {
  function t() {
    _classCallCheck$h$1(this, t);var e = _possibleConstructorReturn$1$1(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));return e.TAG = "VideoTrack", e.type = "video", e.dropped = 0, e;
  }return _inherits$1$1(t, e), _createClass$h$1(t, [{ key: "reset", value: function value() {
      this.sequenceNumber = 0, this.samples = [], this.length = 0, this.dropped = 0;
    } }]), t;
}(Track$1),
    Tracks$2 = function () {
  function e() {
    _classCallCheck$h$1(this, e), this.audioTrack = null, this.videoTrack = null;
  }return _createClass$h$1(e, [{ key: "destroy", value: function value() {
      this.audioTrack = null, this.videoTrack = null;
    } }]), e;
}(),
    _createClass$i$1 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }return function (t, i, n) {
    return i && e(t.prototype, i), n && e(t, n), t;
  };
}(),
    XgBuffer$2 = function () {
  function e(t) {
    _classCallCheck$i$1(this, e), this.length = t || 0, this.historyLen = t || 0, this.array = [], this.offset = 0;
  }return _createClass$i$1(e, [{ key: "push", value: function value(e) {
      this.array.push(e), this.length += e.byteLength, this.historyLen += e.byteLength;
    } }, { key: "shift", value: function value(e) {
      if (this.array.length < 1) return new Uint8Array(0);if (void 0 === e) return this._shiftBuffer();if (this.offset + e === this.array[0].length) {
        var t = this.array[0].slice(this.offset, this.offset + e);return this.offset = 0, this.array.shift(), this.length -= e, t;
      }if (this.offset + e < this.array[0].length) {
        var i = this.array[0].slice(this.offset, this.offset + e);return this.offset += e, this.length -= e, i;
      }for (var n = new Uint8Array(e), r = 0; this.array.length > 0 && e > 0;) {
        if (this.offset + e < this.array[0].length) {
          var a = this.array[0].slice(this.offset, this.offset + e);n.set(a, r), this.offset += e, this.length -= e, e = 0;break;
        }var s = this.array[0].length - this.offset;n.set(this.array[0].slice(this.offset, this.array[0].length), r), this.array.shift(), this.offset = 0, r += s, this.length -= s, e -= s;
      }return n;
    } }, { key: "clear", value: function value() {
      this.array = [], this.length = 0, this.offset = 0;
    } }, { key: "destroy", value: function value() {
      this.clear(), this.historyLen = 0;
    } }, { key: "_shiftBuffer", value: function value() {
      return this.length -= this.array[0].length, this.offset = 0, this.array.shift();
    } }, { key: "toInt", value: function value(e, t) {
      for (var i = 0, n = this.offset + e; n < this.offset + t + e;) {
        n < this.array[0].length ? i = 256 * i + this.array[0][n] : this.array[1] && (i = 256 * i + this.array[1][n - this.array[0].length]), n++;
      }return i;
    } }]), e;
}(),
    RemuxBuffer$1 = function () {
  function e() {
    _classCallCheck$i$1(this, e), this.video = [], this.audio = [];
  }return _createClass$i$1(e, [{ key: "destroy", value: function value() {
      this.video = [], this.audio = [];
    } }]), e;
}(),
    _createClass$j$1 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }return function (t, i, n) {
    return i && e(t.prototype, i), n && e(t, n), t;
  };
}(),
    Source$1 = function e() {
  _classCallCheck$j$1(this, e), this.mimetype = "", this.init = null, this.data = [];
},
    PreSource$2 = function () {
  function e() {
    _classCallCheck$j$1(this, e), this.sources = {};
  }return _createClass$j$1(e, [{ key: "getSource", value: function value(e) {
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
    DATA_TYPES$1 = { NUMBER: 0, BOOLEAN: 1, STRING: 2, OBJECT: 3, MIX_ARRAY: 8, OBJECT_END: 9, STRICT_ARRAY: 10, DATE: 11, LONE_STRING: 12 },
    AMFParser$1 = function () {
  function e() {
    classCallCheck$2(this, e), this.offset = 0, this.readOffset = this.offset;
  }return createClass$2(e, [{ key: "resolve", value: function value(e, t) {
      if (t < 3) throw new Error("not enough data for metainfo");var i = {},
          n = this.parseValue(e),
          r = this.parseValue(e, t - n.bodySize);return i[n.data] = r.data, this.resetStatus(), i;
    } }, { key: "resetStatus", value: function value() {
      this.offset = 0, this.readOffset = this.offset;
    } }, { key: "parseString", value: function value(e) {
      var t = new DataView(e, this.readOffset).getUint16(0, !isLe$1),
          i = "";i = t > 0 ? UTF8$1$1.decode(new Uint8Array(e, this.readOffset + 2, t)) : "";var n = t + 2;return this.readOffset += n, { data: i, bodySize: t + 2 };
    } }, { key: "parseDate", value: function value(e, t) {
      var i = new DataView(e, this.readOffset, t),
          n = i.getFloat64(0, !isLe$1);return n += 60 * i.getInt16(8, !isLe$1) * 1e3, this.readOffset += 10, { data: new Date(n), bodySize: 10 };
    } }, { key: "parseObject", value: function value(e, t) {
      var i = this.parseString(e, t),
          n = this.parseValue(e, t - i.bodySize);return { data: { name: i.data, value: n.data }, bodySize: i.bodySize + n.bodySize, isObjEnd: n.isObjEnd };
    } }, { key: "parseLongString", value: function value(e) {
      var t = new DataView(e, this.readOffset).getUint32(0, !isLe$1),
          i = "";return i = t > 0 ? UTF8$1$1.decode(new Uint8Array(e, this.readOffset + 2, t)) : "", this.readOffset += t + 4, { data: i, bodySize: t + 4 };
    } }, { key: "parseValue", value: function value(e, t) {
      var i = new ArrayBuffer();i = e instanceof ArrayBuffer ? e : e.buffer;var n = DATA_TYPES$1.NUMBER,
          r = DATA_TYPES$1.BOOLEAN,
          a = DATA_TYPES$1.STRING,
          s = DATA_TYPES$1.OBJECT,
          o = DATA_TYPES$1.MIX_ARRAY,
          u = DATA_TYPES$1.OBJECT_END,
          l = DATA_TYPES$1.STRICT_ARRAY,
          c = DATA_TYPES$1.DATE,
          f = DATA_TYPES$1.LONE_STRING,
          h = new DataView(i, this.readOffset, t),
          d = !1,
          p = h.getUint8(0),
          v = 1;this.readOffset += 1;var y = null;switch (p) {case n:
          y = h.getFloat64(1, !isLe$1), this.readOffset += 8, v += 8;break;case r:
          y = !!h.getUint8(1), this.readOffset += 1, v += 1;break;case a:
          var m = this.parseString(i);y = m.data, v += m.bodySize;break;case s:
          y = {};var _ = 0;for (16777215 & h.getUint32(t - 4, !isLe$1) && (_ = 3); v < t - 4;) {
            var E = this.parseObject(i, t - v - _);if (E.isObjectEnd) break;y[E.data.name] = E.data.value, v += E.bodySize;
          }v <= t - 3 && 9 === (16777215 & h.getUint32(v - 1, !isLe$1)) && (this.readOffset += 3, v += 3);break;case o:
          y = {}, v += 4, this.readOffset += 4;var g = 0;for (9 == (16777215 & h.getUint32(t - 4, !isLe$1)) && (g = 3); v < t - 8;) {
            var k = this.parseObject(i, t - v - g);if (k.isObjectEnd) break;y[k.data.name] = k.data.value, v += k.bodySize;
          }v <= t - 3 && 9 === (16777215 & h.getUint32(v - 1, !isLe$1)) && (v += 3, this.readOffset += 3);break;case u:
          y = null, d = !0;break;case l:
          y = [];var S = h.getUint32(1, !isLe$1);v += 4, this.readOffset += 4;for (var T = 0; T < S; T++) {
            var A = this.parseValue(i, t - v);y.push(A.data), v += A.bodySize;
          }break;case c:
          var b = this.parseDate(i, t - 1);y = b.data, v += b.bodySize;break;case f:
          var C = this.parseLongString(i, t - 1);y = C.data, v += C.bodySize;break;default:
          v = t;}return { data: y, bodySize: v, isObjEnd: d };
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
          i = this.loaderBuffer.toInt(e, 1);if (e += 1, t.filtered = (32 & i) >>> 5, t.tagType = 31 & i, t.datasize = this.loaderBuffer.toInt(e, 3), e += 3, 8 !== t.tagType && 9 !== t.tagType && 11 !== t.tagType && 18 !== t.tagType || 0 !== this.loaderBuffer.toInt(8, 3)) return this.loaderBuffer && this.loaderBuffer.length > 0 && this.loaderBuffer.shift(1), this.emit(DEMUX_EVENTS$1$1.DEMUX_ERROR, this.TAG, new Error("tagType " + t.tagType), !1), null;if (this.loaderBuffer.length < t.datasize + 15) return null;this.loaderBuffer.shift(4);var n = this.loaderBuffer.toInt(0, 3);this.loaderBuffer.shift(3);var r = this.loaderBuffer.shift(1)[0];return r > 0 && (n += 16777216 * r), t.dts = n, this.loaderBuffer.shift(3), t;
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
          n = this.loaderBuffer.shift(e.datasize),
          r = new AMFParser$1().resolve(n, n.length),
          a = this._context.onMetaData = r ? r.onMetaData : void 0;if (this._context.mediaInfo.duration = a.duration, this._context.mediaInfo.hasVideo = a.hasVideo, this._context.mediaInfo.hsaAudio = a.hasAudio, this._datasizeValidator(e.datasize) && (this.emit(DEMUX_EVENTS$1$1.MEDIA_INFO), this._hasScript = !0), t && !t.hasSpecificConfig) {
        var s = t.meta;switch (a.audiosamplerate && (s.sampleRate = a.audiosamplerate), a.audiochannels && (s.channelCount = a.audiochannels), a.audiosamplerate) {case 44100:
            s.sampleRateIndex = 4;break;case 22050:
            s.sampleRateIndex = 7;break;case 11025:
            s.sampleRateIndex = 10;}
      }if (i && !i.hasSpecificConfig) {
        var o = i.meta;if ("number" == typeof a.framerate) {
          var u = Math.floor(1e3 * a.framerate);if (u > 0) {
            var l = u / 1e3;o.frameRate || (o.frameRate = {}), o.frameRate.fixed = !0, o.frameRate.fps = l, o.frameRate.fps_num = u, o.frameRate.fps_den = 1e3;
          }
        }
      }
    } }, { key: "_aacSequenceHeaderParser", value: function value(e) {
      var t = {};t.hasSpecificConfig = !0, t.objectType = e[1] >>> 3, t.sampleRateIndex = (7 & e[1]) << 1 | e[2] >>> 7, t.audiosamplerate = this._switchAudioSampleRate(t.sampleRateIndex), t.channelCount = (120 & e[2]) >>> 3, t.frameLength = (4 & e[2]) >>> 2, t.dependsOnCoreCoder = (2 & e[2]) >>> 1, t.extensionFlagIndex = 1 & e[2], t.codec = "mp4a.40." + t.objectType;var i = window.navigator.userAgent.toLowerCase(),
          n = void 0,
          r = void 0,
          a = t.sampleRateIndex;return -1 !== i.indexOf("firefox") ? t.sampleRateIndex >= 6 ? (t.objectType = 5, r = new Array(4), n = a - 3) : (t.objectType = 2, r = new Array(2), n = a) : -1 !== i.indexOf("android") ? (t.objectType = 2, r = new Array(2), n = a) : (t.objectType = 5, n = t.sampleRateIndex, r = new Array(4), t.sampleRateIndex >= 6 ? n = t.sampleRateIndex - 3 : 1 === t.channelCount && (t.objectType = 2, r = new Array(2), n = t.sampleRateIndex)), r[0] = t.objectType << 3, r[0] |= (15 & t.sampleRateIndex) >>> 1, r[1] = (15 & t.sampleRateIndex) << 7, r[1] |= (15 & t.channelCount) << 3, 5 === t.objectType && (r[1] |= (15 & n) >>> 1, r[2] = (1 & n) << 7, r[2] |= 8, r[3] = 0), t.config = r, t;
    } }, { key: "_parseAACData", value: function value(e) {
      var t = this.tracks.audioTrack;if (t) {
        var i = t.meta;i || (t.meta = new AudioTrackMeta$1$1(), i = t.meta);var n = this.loaderBuffer.shift(1)[0];e.data = this.loaderBuffer.shift(e.datasize - 1);var r = (240 & n) >>> 4;t.format = r, 10 !== r && this.emit(DEMUX_EVENTS$1$1.DEMUX_ERROR, new Error("invalid audio format: " + r)), 10 !== r || this._hasAudioSequence || (i.sampleRate = this._switchAudioSamplingFrequency(n), i.sampleRateIndex = (12 & n) >>> 2, i.frameLenth = (2 & n) >>> 1, i.channelCount = 1 & n, i.refSampleDuration = Math.floor(1024 / i.audioSampleRate * i.timescale));var a = i.audioSampleRate,
            s = i.sampleRateIndex,
            o = i.refSampleDuration;delete e.tagType;var u = this._datasizeValidator(e.datasize);if (0 === e.data[0]) {
          var l = this._aacSequenceHeaderParser(e.data);a = l.audiosamplerate || i.audioSampleRate, s = l.sampleRateIndex || i.sampleRateIndex, o = Math.floor(1024 / a * i.timescale), i.channelCount = l.channelCount, i.sampleRate = a, i.sampleRateIndex = s, i.refSampleDuration = o, i.duration = this._context.mediaInfo.duration * i.timescale, i.config = l.config;var c = this._context.mediaInfo.audio;c.codec = l.codec, c.channelCount = l.channelCount, c.sampleRate = a, c.sampleRateIndex = l.audioSampleRateIndex, this._hasScript && !this._hasAudioSequence ? this.emit(DEMUX_EVENTS$1$1.METADATA_PARSED, "audio") : this._hasScript && this._hasAudioSequence && this.emit(DEMUX_EVENTS$1$1.AUDIO_METADATA_CHANGE), this._hasAudioSequence = !0, this._metaChange = !0;
        } else this._metaChange && (e.options = { meta: t.meta }, this._metaChange = !1), e.data = e.data.slice(1, e.data.length), t.samples.push(e);u || this.emit(DEMUX_EVENTS$1$1.DEMUX_ERROR, this.TAG, new Error("TAG length error at " + e.datasize), !1);
      }
    } }, { key: "_parseHevcData", value: function value(e) {
      var t = this.loaderBuffer.shift(1)[0];e.frameType = (240 & t) >>> 4, e.isKeyframe = 1 === e.frameType;var i = 15 & t;if (this.tracks.videoTrack.codecID = i, e.avcPacketType = this.loaderBuffer.shift(1)[0], e.cts = this.loaderBuffer.toInt(0, 3), this.loaderBuffer.shift(3), 12 === i) {
        var n = this.loaderBuffer.shift(e.datasize - 5);if (e.data = n, 0 !== Number.parseInt(e.avcPacketType)) {
          this._datasizeValidator(e.datasize) || this.emit(DEMUX_EVENTS$1$1.DEMUX_ERROR, this.TAG, new Error("invalid video tag datasize: " + e.datasize), !1);var r = {},
              a = 0;for (r.cts = e.cts, r.dts = e.dts; e.data.length > a;) {
            var s = e.data.slice(Number.parseInt(a), 4 + a);r.size = s[3], r.size += 256 * s[2], r.size += 256 * s[1] * 256, r.size += 256 * s[0] * 256 * 256, a += 4, r.data = e.data.slice(Number.parseInt(a), r.size + a), a += r.size, this.tracks.videoTrack.samples.push(r), this.emit(DEMUX_EVENTS$1$1.METADATA_PARSED, "video");
          }
        } else 0 === Number.parseInt(e.avcPacketType) && (this._datasizeValidator(e.datasize) ? this.emit(DEMUX_EVENTS$1$1.METADATA_PARSED, "video") : this.emit(DEMUX_EVENTS$1$1.DEMUX_ERROR, this.TAG, new Error("invalid video tag datasize: " + e.datasize), !1));
      } else if (7 === i) {
        var o = this.loaderBuffer.shift(e.datasize - 5);if (0 === o[4] && 0 === o[5] && 0 === o[6] && 1 === o[7]) {
          for (var u = 0, l = 0; l < 4; l++) {
            u = 256 * u + o[l];
          }u -= 4, (o = o.slice(4, o.length))[3] = u % 256, u = (u - o[3]) / 256, o[2] = u % 256, u = (u - o[2]) / 256, o[1] = u % 256, o[0] = (u - o[1]) / 256;
        }if (e.data = o, 0 === e.avcPacketType) this._avcSequenceHeaderParser(e.data), this._datasizeValidator(e.datasize) && (this._hasScript && !this._hasVideoSequence ? this.emit(DEMUX_EVENTS$1$1.METADATA_PARSED, "video") : this._hasScript && this._hasVideoSequence && this.emit(DEMUX_EVENTS$1$1.VIDEO_METADATA_CHANGE), this._hasVideoSequence = !0), this._metaChange = !0;else {
          if (!this._datasizeValidator(e.datasize)) return void this.emit(DEMUX_EVENTS$1$1.DEMUX_ERROR, this.TAG, new Error("invalid video tag datasize: " + e.datasize), !1);this._metaChange && (e.options = { meta: Object.assign({}, this.tracks.videoTrack.meta) }, this._metaChange = !1), this.tracks.videoTrack.samples.push(e);
        }
      } else this.emit(DEMUX_EVENTS$1$1.DEMUX_ERROR, this.TAG, new Error("video codeid is " + i), !1), e.data = this.loaderBuffer.shift(e.datasize - 1), this._datasizeValidator(e.datasize) || this.emit(DEMUX_EVENTS$1$1.DEMUX_ERROR, this.TAG, new Error("invalid video tag datasize: " + e.datasize), !1), this.tracks.videoTrack.samples.push(e), this.emit(DEMUX_EVENTS$1$1.DEMUX_COMPLETE);delete e.tagType;
    } }, { key: "_avcSequenceHeaderParser", value: function value(e) {
      var t = this.tracks.videoTrack;if (t) {
        var i = 0;t.meta || (t.meta = new VideoTrackMeta$1$1());var n = t.meta;n.configurationVersion = e[0], n.avcProfileIndication = e[1], n.profileCompatibility = e[2], n.avcLevelIndication = e[3] / 10, n.nalUnitLength = 1 + (3 & e[4]);var r = 31 & e[5];i = 6;for (var a = {}, s = 0; s < r; s++) {
          var o = 255 * e[i] + e[i + 1];i += 2;for (var u = new Uint8Array(o), l = 0; l < o; l++) {
            u[l] = e[i + l];
          }for (var c = "avc1.", f = 1; f < 4; f++) {
            var h = u[f].toString(16);h.length < 2 && (h = "0" + h), c += h;
          }n.codec = c, i += o, this.tracks.videoTrack.meta.sps = u, a = SpsParser$1.parseSPS(u);
        }var d = e[i];i++;for (var p = 0; p < d; p++) {
          var v = 255 * e[i] + e[i + 1];i += 2;for (var y = new Uint8Array(v), m = 0; m < v; m++) {
            y[m] = e[i + m];
          }i += v, this.tracks.videoTrack.meta.pps = y;
        }Object.assign(n, SpsParser$1.toVideoMeta(a));var _ = this._context.mediaInfo.video;_.codec = n.codec, _.profile = n.profile, _.level = n.level, _.chromaFormat = n.chromaFormat, _.frameRate = n.frameRate, _.parRatio = n.parRatio, _.width = _.width === n.presentWidth ? _.width : n.presentWidth, _.height = _.height === n.presentHeight ? _.width : n.presentHeight, n.duration = this._context.mediaInfo.duration * n.timescale, n.avcc = new Uint8Array(e.length), n.avcc.set(e), t.meta = n;
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
    _createClass$k$1 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }return function (t, i, n) {
    return i && e(t.prototype, i), n && e(t, n), t;
  };
}(),
    Fmp4$1 = function () {
  function e() {
    _classCallCheck$k$1(this, e);
  }return _createClass$k$1(e, null, [{ key: "size", value: function value(e) {
      return Buffer$1$1.writeUint32(e);
    } }, { key: "initBox", value: function value(t, i) {
      for (var n = new Buffer$1$1(), r = arguments.length, a = Array(r > 2 ? r - 2 : 0), s = 2; s < r; s++) {
        a[s - 2] = arguments[s];
      }return n.write.apply(n, [e.size(t), e.type(i)].concat(a)), n.buffer;
    } }, { key: "extension", value: function value(e, t) {
      return new Uint8Array([e, t >> 16 & 255, t >> 8 & 255, 255 & t]);
    } }, { key: "ftyp", value: function value() {
      return e.initBox(24, "ftyp", new Uint8Array([105, 115, 111, 109, 0, 0, 0, 1, 105, 115, 111, 109, 97, 118, 99, 49]));
    } }, { key: "moov", value: function value(t) {
      var i = t.type,
          n = t.meta,
          r = 8,
          a = e.mvhd(n.duration, n.timescale),
          s = void 0;s = "video" === i ? e.videoTrak(n) : e.audioTrak(n);var o = e.mvex(n.duration, n.timescale || 1e3, n.id);return [a, s, o].forEach(function (e) {
        r += e.byteLength;
      }), e.initBox(r, "moov", a, s, o);
    } }, { key: "mvhd", value: function value(t) {
      var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e3,
          n = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255]);return e.initBox(8 + n.length, "mvhd", new Uint8Array(n));
    } }, { key: "videoTrak", value: function value(t) {
      var i = 8,
          n = e.tkhd({ id: 1, duration: t.duration, timescale: t.timescale || 1e3, width: t.presentWidth, height: t.presentHeight, type: "video" }),
          r = e.mdia({ type: "video", timescale: t.timescale || 1e3, duration: t.duration, avcc: t.avcc, parRatio: t.parRatio, width: t.presentWidth, height: t.presentHeight });return [n, r].forEach(function (e) {
        i += e.byteLength;
      }), e.initBox(i, "trak", n, r);
    } }, { key: "audioTrak", value: function value(t) {
      var i = 8,
          n = e.tkhd({ id: 2, duration: t.duration, timescale: t.timescale || 1e3, width: 0, height: 0, type: "audio" }),
          r = e.mdia({ type: "audio", timescale: t.timescale || 1e3, duration: t.duration, channelCount: t.channelCount, samplerate: t.sampleRate, config: t.config });return [n, r].forEach(function (e) {
        i += e.byteLength;
      }), e.initBox(i, "trak", n, r);
    } }, { key: "tkhd", value: function value(t) {
      var i = t.id,
          n = t.duration,
          r = t.width,
          a = t.height,
          s = new Uint8Array([0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, 0, 0, 0, 0, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, 255 & n, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, r >>> 8 & 255, 255 & r, 0, 0, a >>> 8 & 255, 255 & a, 0, 0]);return e.initBox(8 + s.byteLength, "tkhd", s);
    } }, { key: "edts", value: function value(t) {
      var i = new Buffer$1$1(),
          n = t.duration,
          r = t.mediaTime;return i.write(e.size(36), e.type("edts")), i.write(e.size(28), e.type("elst")), i.write(new Uint8Array([0, 0, 0, 1, n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, 255 & n, r >> 24 & 255, r >> 16 & 255, r >> 8 & 255, 255 & r, 0, 0, 0, 1])), i.buffer;
    } }, { key: "mdia", value: function value(t) {
      var i = 8,
          n = e.mdhd(t.timescale, t.duration),
          r = e.hdlr(t.type),
          a = e.minf(t);return [n, r, a].forEach(function (e) {
        i += e.byteLength;
      }), e.initBox(i, "mdia", n, r, a);
    } }, { key: "mdhd", value: function value() {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1e3,
          i = arguments[1],
          n = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, 255 & i, 85, 196, 0, 0]);return e.initBox(12 + n.byteLength, "mdhd", e.extension(0, 0), n);
    } }, { key: "hdlr", value: function value(t) {
      var i = [0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0];return "audio" === t && (i.splice.apply(i, [8, 4].concat([115, 111, 117, 110])), i.splice.apply(i, [24, 13].concat([83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0]))), e.initBox(8 + i.length, "hdlr", new Uint8Array(i));
    } }, { key: "minf", value: function value(t) {
      var i = 8,
          n = "video" === t.type ? e.vmhd() : e.smhd(),
          r = e.dinf(),
          a = e.stbl(t);return [n, r, a].forEach(function (e) {
        i += e.byteLength;
      }), e.initBox(i, "minf", n, r, a);
    } }, { key: "vmhd", value: function value() {
      return e.initBox(20, "vmhd", new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]));
    } }, { key: "smhd", value: function value() {
      return e.initBox(16, "smhd", new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]));
    } }, { key: "dinf", value: function value() {
      var t = new Buffer$1$1(),
          i = [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1];return t.write(e.size(36), e.type("dinf"), e.size(28), e.type("dref"), new Uint8Array(i)), t.buffer;
    } }, { key: "stbl", value: function value(t) {
      var i = 8,
          n = e.stsd(t),
          r = e.stts(),
          a = e.stsc(),
          s = e.stsz(),
          o = e.stco();return [n, r, a, s, o].forEach(function (e) {
        i += e.byteLength;
      }), e.initBox(i, "stbl", n, r, a, s, o);
    } }, { key: "stsd", value: function value(t) {
      var i = void 0;return i = "audio" === t.type ? e.mp4a(t) : e.avc1(t), e.initBox(16 + i.byteLength, "stsd", e.extension(0, 0), new Uint8Array([0, 0, 0, 1]), i);
    } }, { key: "mp4a", value: function value(t) {
      var i = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, t.channelCount, 0, 16, 0, 0, 0, 0, t.samplerate >> 8 & 255, 255 & t.samplerate, 0, 0]),
          n = e.esds(t.config);return e.initBox(8 + i.byteLength + n.byteLength, "mp4a", i, n);
    } }, { key: "esds", value: function value() {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [43, 146, 8, 0],
          i = t.length,
          n = new Buffer$1$1(),
          r = new Uint8Array([0, 0, 0, 0, 3, 23 + i, 0, 1, 0, 4, 15 + i, 64, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5].concat([i]).concat(t).concat([6, 1, 2]));return n.write(e.size(8 + r.byteLength), e.type("esds"), r), n.buffer;
    } }, { key: "avc1", value: function value(t) {
      var i = new Buffer$1$1(),
          n = t.width,
          r = t.height,
          a = t.parRatio.height,
          s = t.parRatio.width,
          o = t.avcc,
          u = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, n >> 8 & 255, 255 & n, r >> 8 & 255, 255 & r, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 18, 100, 97, 105, 108, 121, 109, 111, 116, 105, 111, 110, 47, 104, 108, 115, 46, 106, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 17, 17]),
          l = new Uint8Array([0, 28, 156, 128, 0, 45, 198, 192, 0, 45, 198, 192]),
          c = new Uint8Array([a >> 24, a >> 16 & 255, a >> 8 & 255, 255 & a, s >> 24, s >> 16 & 255, s >> 8 & 255, 255 & s]);return i.write(e.size(40 + u.byteLength + o.byteLength + l.byteLength), e.type("avc1"), u, e.size(8 + o.byteLength), e.type("avcC"), o, e.size(20), e.type("btrt"), l, e.size(16), e.type("pasp"), c), i.buffer;
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
          n = new Buffer$1$1(),
          r = Buffer$1$1.writeUint32(t);return n.write(e.size(56), e.type("mvex"), e.size(16), e.type("mehd"), e.extension(0, 0), r, e.trex(i)), n.buffer;
    } }, { key: "trex", value: function value(t) {
      var i = new Uint8Array([0, 0, 0, 0, t >> 24, t >> 16 & 255, t >> 8 & 255, 255 & t, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]);return e.initBox(8 + i.byteLength, "trex", i);
    } }, { key: "moof", value: function value(t) {
      var i = 8,
          n = e.mfhd(),
          r = e.traf(t);return [n, r].forEach(function (e) {
        i += e.byteLength;
      }), e.initBox(i, "moof", n, r);
    } }, { key: "mfhd", value: function value() {
      var t = Buffer$1$1.writeUint32(e.sequence);return e.sequence += 1, e.initBox(16, "mfhd", e.extension(0, 0), t);
    } }, { key: "traf", value: function value(t) {
      var i = 8,
          n = e.tfhd(t.id),
          r = e.tfdt(t.time),
          a = e.sdtp(t),
          s = e.trun(t, a.byteLength);return [n, r, s, a].forEach(function (e) {
        i += e.byteLength;
      }), e.initBox(i, "traf", n, r, s, a);
    } }, { key: "tfhd", value: function value(t) {
      var i = Buffer$1$1.writeUint32(t);return e.initBox(16, "tfhd", e.extension(0, 0), i);
    } }, { key: "tfdt", value: function value(t) {
      return e.initBox(16, "tfdt", e.extension(0, 0), Buffer$1$1.writeUint32(t));
    } }, { key: "trun", value: function value(t, i) {
      var n = new Buffer$1$1(),
          r = Buffer$1$1.writeUint32(t.samples.length),
          a = Buffer$1$1.writeUint32(92 + 16 * t.samples.length + i);return n.write(e.size(20 + 16 * t.samples.length), e.type("trun"), new Uint8Array([0, 0, 15, 1]), r, a), t.samples.forEach(function (e) {
        var t = e.flags;n.write(new Uint8Array([e.duration >>> 24 & 255, e.duration >>> 16 & 255, e.duration >>> 8 & 255, 255 & e.duration, e.size >>> 24 & 255, e.size >>> 16 & 255, e.size >>> 8 & 255, 255 & e.size, t.isLeading << 2 | t.dependsOn, t.isDependedOn << 6 | t.hasRedundancy << 4 | t.isNonSync, 0, 0, e.cts >>> 24 & 255, e.cts >>> 16 & 255, e.cts >>> 8 & 255, 255 & e.cts]));
      }), n.buffer;
    } }, { key: "sdtp", value: function value(t) {
      var i = new Buffer$1$1();return i.write(e.size(12 + t.samples.length), e.type("sdtp"), e.extension(0, 0)), t.samples.forEach(function (e) {
        var t = e.flags,
            n = t.isLeading << 6 | t.dependsOn << 4 | t.isDependedOn << 2 | t.hasRedundancy;i.write(new Uint8Array([n]));
      }), i.buffer;
    } }, { key: "mdat", value: function value(t) {
      var i = new Buffer$1$1(),
          n = 8;t.samples.forEach(function (e) {
        n += e.size;
      }), i.write(e.size(n), e.type("mdat"));var r = new Uint8Array(n),
          a = 0;return r.set(i.buffer, a), a += 8, t.samples.forEach(function (e) {
        e.buffer.forEach(function (e) {
          r.set(e, a), a += e.byteLength;
        });
      }), r;
    } }]), e;
}();Fmp4$1.type = function (e) {
  return new Uint8Array([e.charCodeAt(0), e.charCodeAt(1), e.charCodeAt(2), e.charCodeAt(3)]);
}, Fmp4$1.sequence = 1;var _createClass$l$1 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }return function (t, i, n) {
    return i && e(t.prototype, i), n && e(t, n), t;
  };
}(),
    REMUX_EVENTS$2$1 = EVENTS$1.REMUX_EVENTS,
    Mp4Remuxer$1 = function () {
  function e() {
    _classCallCheck$l$1(this, e), this._dtsBase = 0, this._isDtsBaseInited = !1, this._audioNextDts = null, this._videoNextDts = null, this._videoSegmentList = new MediaSegmentList$1$1("video"), this._audioSegmentList = new MediaSegmentList$1$1("audio");var t = sniffer$1$1.browser;this._fillSilenceFrame = "ie" === t, this.isFirstVideo = !0, this.isFirstAudio = !0, this.videoAllDuration = 0, this.audioAllDuration = 0;
  }return _createClass$l$1(e, [{ key: "init", value: function value() {
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
          n = i.getSource(e);n || (n = i.createSource(e)), n.mimetype = t.meta.codec, n.init = this.remuxInitSegment(e, t.meta), this.emit(REMUX_EVENTS$2$1.INIT_SEGMENT, e);
    } }, { key: "remuxInitSegment", value: function value(e, t) {
      var i = new Buffer$1$1(),
          n = Fmp4$1.ftyp(),
          r = Fmp4$1.moov({ type: e, meta: t });return i.write(n, r), i;
    } }, { key: "calcDtsBase", value: function value(e, t) {
      if (!e && t.samples.length) return t.samples[0].dts;if (e.samples.length || t.samples.length) {
        var i = 1 / 0,
            n = 1 / 0;e.samples && e.samples.length && (i = e.samples[0].dts), t.samples && t.samples.length && (n = t.samples[0].dts), this._dtsBase = Math.min(i, n), this._isDtsBaseInited = !0;
      }
    } }, { key: "_remuxVideo", value: function value(e) {
      var t = e || {};if (e.samples && e.samples.length) {
        for (var i = t.samples, n = -1, r = null, a = [], s = { samples: [] }, o = 1e4; i.length && o-- > 0;) {
          var u = i.shift(),
              l = u.isKeyframe,
              c = u.options;if (!this.isFirstAudio && c && c.meta) {
            r = this.remuxInitSegment("video", c.meta), c.meta = null, i.unshift(u), c.isContinue || this.resetDtsBase();break;
          }var f = u.dts - this._dtsBase;-1 === n && (n = f);var h = void 0,
              d = void 0;void 0 !== u.pts && (h = (d = u.pts - this._dtsBase) - f), void 0 !== u.cts && (d = u.cts + f, h = u.cts);var p = { buffer: [], size: 0 };s.samples.push(p), p.buffer.push(u.data), p.size += u.data.byteLength;var v = 0;v = u.duration ? u.duration : i.length >= 1 ? i[0].dts - this._dtsBase - f : a.length >= 1 ? a[a.length - 1].duration : this.videoMeta.refSampleDuration, this.videoAllDuration += v, a.push({ dts: f, cts: h, pts: d, data: u.data, size: u.data.byteLength, isKeyframe: l, duration: v, flags: { isLeading: 0, dependsOn: l ? 2 : 1, isDependedOn: l ? 1 : 0, hasRedundancy: 0, isNonSync: l ? 0 : 1 }, originDts: f, type: "video" }), l && this.emit(REMUX_EVENTS$2$1.RANDOM_ACCESS_POINT, d);
        }var y = new Buffer$1$1();if (a.length) {
          var m = Fmp4$1.moof({ id: t.meta.id, time: n, samples: a }),
              _ = Fmp4$1.mdat(s);y.write(m, _), this.writeToSource("video", y);
        }if (r && (this.writeToSource("video", r), i.length)) return t.samples = i, this._remuxVideo(t);this.isFirstVideo = !1, this.emit(REMUX_EVENTS$2$1.MEDIA_SEGMENT, "video");var E = a[a.length - 1];this._videoNextDts = E.dts + E.duration, t.samples = [], t.length = 0;
      }
    } }, { key: "_remuxAudio", value: function value(e) {
      var t = (e || {}).samples,
          i = -1,
          n = [],
          r = null,
          a = { samples: [] };if (t && t.length) {
        for (var s = 1e4, o = !1; t.length && s-- > 0;) {
          var u = t.shift(),
              l = u.data,
              c = u.options;if (!this.isFirstAudio && c && c.meta) {
            r = this.remuxInitSegment("audio", c.meta), c.meta = null, t.unshift(u), c.isContinue || this.resetDtsBase();break;
          }var f = u.dts - this._dtsBase,
              h = f;o || (i = f, o = !0);var d = 0;d = u.duration ? u.duration : this.audioMeta.refSampleDurationFixed ? this.audioMeta.refSampleDurationFixed : t.length >= 1 ? t[0].dts - this._dtsBase - f : n.length >= 1 ? n[n.length - 1].duration : this.audioMeta.refSampleDuration, this.audioAllDuration += d;var p = { dts: f, pts: f, cts: 0, size: l.byteLength, duration: u.duration ? u.duration : d, flags: { isLeading: 0, dependsOn: 2, isDependedOn: 1, hasRedundancy: 0, isNonSync: 0 }, isKeyframe: !0, originDts: h, type: "audio" },
              v = { buffer: [], size: 0 };v.buffer.push(l), v.size += l.byteLength, a.samples.push(v), n.push(p);
        }var y = new Buffer$1$1();if (n.length) {
          var m = Fmp4$1.moof({ id: e.meta.id, time: i, samples: n }),
              _ = Fmp4$1.mdat(a);y.write(m, _), this.writeToSource("audio", y);
        }if (r && (this.writeToSource("audio", r), t.length)) return e.samples = t, this._remuxAudio(e);this.isFirstAudio = !1, this.emit(REMUX_EVENTS$2$1.MEDIA_SEGMENT, "audio", y);var E = n[n.length - 1];this._videoNextDts = E.dts + E.duration, e.samples = [], e.length = 0;
      }
    } }, { key: "writeToSource", value: function value(e, t) {
      var i = this._context.getInstance("PRE_SOURCE_BUFFER"),
          n = i.getSource(e);n || (n = i.createSource(e)), n.data.push(t);
    } }, { key: "initSilentAudio", value: function value(t, i) {
      var n = e.getSilentFrame(this._audioMeta.channelCount);return { dts: t, pts: t, cts: 0, duration: i, unit: n, size: n.byteLength, originDts: t, type: "video" };
    } }, { key: "videoMeta", get: function get() {
      return this._context.getInstance("TRACKS").videoTrack.meta;
    } }, { key: "audioMeta", get: function get() {
      return this._context.getInstance("TRACKS").audioTrack.meta;
    } }], [{ key: "getSilentFrame", value: function value(e) {
      return 1 === e ? new Uint8Array([0, 200, 0, 128, 35, 128]) : 2 === e ? new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128]) : 3 === e ? new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142]) : 4 === e ? new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56]) : 5 === e ? new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56]) : 6 === e ? new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224]) : null;
    } }]), e;
}(),
    Remuxer$1 = { Mp4Remuxer: Mp4Remuxer$1 },
    _typeof$1$2 = "function" == typeof Symbol && "symbol" === _typeof$3(Symbol.iterator) ? function (e) {
  return void 0 === e ? "undefined" : _typeof$3(e);
} : function (e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : _typeof$3(e);
},
    _createClass$m$1 = function () {
  function e(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }return function (t, i, n) {
    return i && e(t.prototype, i), n && e(t, n), t;
  };
}(),
    LOADER_EVENTS$2$1 = EVENTS$1.LOADER_EVENTS,
    READ_STREAM$1 = 0,
    READ_TEXT$1 = 1,
    READ_JSON$1 = 2,
    READ_BUFFER$1 = 3,
    FetchLoader$2 = function () {
  function e(t) {
    _classCallCheck$m$1(this, e), this.configs = Object.assign({}, t), this.url = null, this.status = 0, this.error = null, this._reader = null, this._canceled = !1, this._destroyed = !1, this.readtype = this.configs.readtype, this.buffer = this.configs.buffer || "LOADER_BUFFER", this._loaderTaskNo = 0;
  }return _createClass$m$1(e, [{ key: "init", value: function value() {
      this.on(LOADER_EVENTS$2$1.LADER_START, this.load.bind(this));
    } }, { key: "load", value: function value(e, t) {
      var i = this;this.url = e, this._canceled = !1;var n = this.getParams(t);return i.loading = !0, fetch(this.url, n).then(function (e) {
        if (e.ok) return i.status = e.status, i._onFetchResponse(e);i.loading = !1, i.emit(LOADER_EVENTS$2$1.LOADER_ERROR, i.TAG, new Error("invalid response."));
      }).catch(function (e) {
        throw i.loading = !1, i.emit(LOADER_EVENTS$2$1.LOADER_ERROR, i.TAG, e), new Error(e.message);
      });
    } }, { key: "_onFetchResponse", value: function value(e) {
      var t = this,
          i = this._context.getInstance(this.buffer),
          n = ++this._loaderTaskNo;if (!0 === e.ok) switch (this.readtype) {case READ_JSON$1:
          e.json().then(function (e) {
            t.loading = !1, t._canceled || t._destroyed || (i ? (i.push(e), t.emit(LOADER_EVENTS$2$1.LOADER_COMPLETE, i)) : t.emit(LOADER_EVENTS$2$1.LOADER_COMPLETE, e));
          });break;case READ_TEXT$1:
          e.text().then(function (e) {
            t.loading = !1, t._canceled || t._destroyed || (i ? (i.push(e), t.emit(LOADER_EVENTS$2$1.LOADER_COMPLETE, i)) : t.emit(LOADER_EVENTS$2$1.LOADER_COMPLETE, e));
          });break;case READ_BUFFER$1:
          e.arrayBuffer().then(function (e) {
            t.loading = !1, t._canceled || t._destroyed || (i ? (i.push(new Uint8Array(e)), t.emit(LOADER_EVENTS$2$1.LOADER_COMPLETE, i)) : t.emit(LOADER_EVENTS$2$1.LOADER_COMPLETE, e));
          });break;case READ_STREAM$1:default:
          return this._onReader(e.body.getReader(), n);}
    } }, { key: "_onReader", value: function value(e, t) {
      var i = this._context.getInstance(this.buffer);if (!i && this._reader || this._destroyed) try {
        this._reader.cancel();
      } catch (e) {}if (this._reader = e, !1 !== this.loading) {
        var n = this;this._reader && this._reader.read().then(function (r) {
          if (!n._canceled && !n._destroyed) return r.done ? (n.loading = !1, n.status = 0, void n.emit(LOADER_EVENTS$2$1.LOADER_COMPLETE, i)) : (i.push(r.value), n.emit(LOADER_EVENTS$2$1.LOADER_DATALOADED, i), n._onReader(e, t));if (n._reader) try {
            n._reader.cancel();
          } catch (e) {}
        }).catch(function (e) {
          n.loading = !1, n.emit(LOADER_EVENTS$2$1.LOADER_ERROR, n.TAG, e);
        });
      }
    } }, { key: "getParams", value: function value(e) {
      var t = Object.assign({}, e),
          i = new Headers(),
          n = { method: "GET", headers: i, mode: "cors", cache: "default" };if ("object" === _typeof$1$2(this.configs.headers)) {
        var r = this.configs.headers;for (var a in r) {
          r.hasOwnProperty(a) && i.append(a, r[a]);
        }
      }if ("object" === _typeof$1$2(t.headers)) {
        var s = t.headers;for (var o in s) {
          s.hasOwnProperty(o) && i.append(o, s[o]);
        }
      }return !1 === t.cors && (n.mode = "same-origin"), t.withCredentials && (n.credentials = "include"), n;
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
      var e = this;this._context.registry("FETCH_LOADER", FetchLoader$1$1), this._context.registry("LOADER_BUFFER", XgBuffer$1$1), this._context.registry("FLV_DEMUXER", FlvDemuxer$2), this._context.registry("TRACKS", Tracks$1$1), this._context.registry("MP4_REMUXER", Remuxer$1.Mp4Remuxer), this._context.registry("PRE_SOURCE_BUFFER", PreSource$1$1), this._context.registry("COMPATIBILITY", Compatibility$1$1), this._context.registry("LOGGER", Logger$1), this.mse = this._context.registry("MSE", Mse$1)({ container: this._player.video }), this.initListeners(), setTimeout(function () {
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
    } }, { key: "_onError", value: function value(e, t, i, n) {
      var r = { errorType: e, errorDetails: "[" + t + "]: " + i.message, errorFatal: n || !1 };this._player.emit(FLV_ERROR$1, r);
    } }, { key: "seek", value: function value(e) {
      if (!this._context.onMetaData) return void this.loadMeta();if (this.isSeekable) {
        this._context.getInstance("LOADER_BUFFER").clear();var t = this._player.config.preloadTime,
            i = void 0 === t ? 15 : t,
            n = this.getSeekRange(e, i);this.state.range = n, this.compat && this.compat.reset(), this.loadData();
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
      var n = this._context.onMetaData.keyframes,
          r = this._context.mediaInfo.duration,
          a = t,
          s = t + i,
          o = e.findFilePosition(a, n);return s >= r || a >= r ? { start: o, end: "" } : { start: o, end: e.findFilePosition(s, n) };
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
      for (var i = 0, n = t.times.length; i < n; i++) {
        var r = t.times[i],
            a = i + 1 < n ? t.times[i + 1] : Number.MAX_SAFE_INTEGER;if (r <= e && e <= a) return t.filepositions[i];
      }return "";
    } }]), e;
}();console.log(Context$1$1);var flvAllowedEvents$1 = EVENTS$1.FlvAllowedEvents,
    isEnded = function isEnded(e, t) {
  if (!e.config.isLive && e.duration - e.currentTime < 2) {
    var i = e.getBufferedRange();e.currentTime - i[1] < .1 && (e.emit("ended"), t.mse.endOfStream());
  }
},
    FlvVodPlayer = function (e) {
  function t(e) {
    classCallCheck$2(this, t);var i = possibleConstructorReturn$1(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));return i.context = new Context$1$1(flvAllowedEvents$1), i.initEvents(), i;
  }return inherits$1(t, e), createClass$2(t, [{ key: "start", value: function value() {
      var e = this.context.registry("FLV_CONTROLLER", FlvController$1)(this);this.flv = e, this.context.init(), get$1(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "start", this).call(this, e.mse.url);
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
    } }], [{ key: "isSupported", value: function value() {
      return window.MediaSource && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
    } }]), t;
}(Player);

var FlvPlayer$1 = function () {
  function FlvPlayer$1(config) {
    classCallCheck(this, FlvPlayer$1);

    if (config.isLive) {
      return new FlvPlayer(config);
    } else {
      return new FlvVodPlayer(config);
    }
  }

  createClass(FlvPlayer$1, null, [{
    key: 'isSupported',
    value: function isSupported() {
      return window.MediaSource && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
    }
  }]);
  return FlvPlayer$1;
}();

export default FlvPlayer$1;
//# sourceMappingURL=index.js.map
