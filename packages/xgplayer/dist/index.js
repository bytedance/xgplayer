(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.Player = factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	// ES3 safe
	var _undefined = void 0;

	var is = function (value) { return value !== _undefined && value !== null; };

	// prettier-ignore
	var possibleTypes = { "object": true, "function": true, "undefined": true /* document.all */ };

	var is$1 = function (value) {
		if (!is(value)) return false;
		return hasOwnProperty.call(possibleTypes, typeof value);
	};

	var is$2 = function (value) {
		if (!is$1(value)) return false;
		try {
			if (!value.constructor) return false;
			return value.constructor.prototype === value;
		} catch (error) {
			return false;
		}
	};

	var is$3 = function (value) {
		if (typeof value !== "function") return false;

		if (!hasOwnProperty.call(value, "length")) return false;

		try {
			if (typeof value.length !== "number") return false;
			if (typeof value.call !== "function") return false;
			if (typeof value.apply !== "function") return false;
		} catch (error) {
			return false;
		}

		return !is$2(value);
	};

	var classRe = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;

	var is$4 = function (value) {
		if (!is$3(value)) return false;
		if (classRe.test(functionToString.call(value))) return false;
		return true;
	};

	var isImplemented = function () {
		var assign = Object.assign, obj;
		if (typeof assign !== "function") return false;
		obj = { foo: "raz" };
		assign(obj, { bar: "dwa" }, { trzy: "trzy" });
		return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
	};

	var isImplemented$1 = function () {
		try {
			Object.keys("primitive");
			return true;
		} catch (e) {
			return false;
		}
	};

	// eslint-disable-next-line no-empty-function
	var noop = function () {};

	var _undefined$1 = noop(); // Support ES3 engines

	var isValue = function (val) { return val !== _undefined$1 && val !== null; };

	var keys = Object.keys;

	var shim = function (object) { return keys(isValue(object) ? Object(object) : object); };

	var keys$1 = isImplemented$1() ? Object.keys : shim;

	var validValue = function (value) {
		if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
		return value;
	};

	var max   = Math.max;

	var shim$1 = function (dest, src/*, …srcn*/) {
		var error, i, length = max(arguments.length, 2), assign;
		dest = Object(validValue(dest));
		assign = function (key) {
			try {
				dest[key] = src[key];
			} catch (e) {
				if (!error) error = e;
			}
		};
		for (i = 1; i < length; ++i) {
			src = arguments[i];
			keys$1(src).forEach(assign);
		}
		if (error !== undefined) throw error;
		return dest;
	};

	var assign = isImplemented() ? Object.assign : shim$1;

	var forEach = Array.prototype.forEach, create = Object.create;

	var process = function (src, obj) {
		var key;
		for (key in src) obj[key] = src[key];
	};

	// eslint-disable-next-line no-unused-vars
	var normalizeOptions = function (opts1/*, …options*/) {
		var result = create(null);
		forEach.call(arguments, function (options) {
			if (!isValue(options)) return;
			process(Object(options), result);
		});
		return result;
	};

	var str = "razdwatrzy";

	var isImplemented$2 = function () {
		if (typeof str.contains !== "function") return false;
		return str.contains("dwa") === true && str.contains("foo") === false;
	};

	var indexOf = String.prototype.indexOf;

	var shim$2 = function (searchString/*, position*/) {
		return indexOf.call(this, searchString, arguments[1]) > -1;
	};

	var contains = isImplemented$2() ? String.prototype.contains : shim$2;

	var d_1 = createCommonjsModule(function (module) {



	var d = (module.exports = function (dscr, value/*, options*/) {
		var c, e, w, options, desc;
		if (arguments.length < 2 || typeof dscr !== "string") {
			options = value;
			value = dscr;
			dscr = null;
		} else {
			options = arguments[2];
		}
		if (is(dscr)) {
			c = contains.call(dscr, "c");
			e = contains.call(dscr, "e");
			w = contains.call(dscr, "w");
		} else {
			c = w = true;
			e = false;
		}

		desc = { value: value, configurable: c, enumerable: e, writable: w };
		return !options ? desc : assign(normalizeOptions(options), desc);
	});

	d.gs = function (dscr, get, set/*, options*/) {
		var c, e, options, desc;
		if (typeof dscr !== "string") {
			options = set;
			set = get;
			get = dscr;
			dscr = null;
		} else {
			options = arguments[3];
		}
		if (!is(get)) {
			get = undefined;
		} else if (!is$4(get)) {
			options = get;
			get = set = undefined;
		} else if (!is(set)) {
			set = undefined;
		} else if (!is$4(set)) {
			options = set;
			set = undefined;
		}
		if (is(dscr)) {
			c = contains.call(dscr, "c");
			e = contains.call(dscr, "e");
		} else {
			c = true;
			e = false;
		}

		desc = { get: get, set: set, configurable: c, enumerable: e };
		return !options ? desc : assign(normalizeOptions(options), desc);
	};
	});

	var validCallable = function (fn) {
		if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
		return fn;
	};

	var eventEmitter = createCommonjsModule(function (module, exports) {

	var apply = Function.prototype.apply, call = Function.prototype.call
	  , create = Object.create, defineProperty = Object.defineProperty
	  , defineProperties = Object.defineProperties
	  , hasOwnProperty = Object.prototype.hasOwnProperty
	  , descriptor = { configurable: true, enumerable: false, writable: true }

	  , on, once, off, emit, methods, descriptors, base;

	on = function (type, listener) {
		var data;

		validCallable(listener);

		if (!hasOwnProperty.call(this, '__ee__')) {
			data = descriptor.value = create(null);
			defineProperty(this, '__ee__', descriptor);
			descriptor.value = null;
		} else {
			data = this.__ee__;
		}
		if (!data[type]) data[type] = listener;
		else if (typeof data[type] === 'object') data[type].push(listener);
		else data[type] = [data[type], listener];

		return this;
	};

	once = function (type, listener) {
		var once, self;

		validCallable(listener);
		self = this;
		on.call(this, type, once = function () {
			off.call(self, type, once);
			apply.call(listener, this, arguments);
		});

		once.__eeOnceListener__ = listener;
		return this;
	};

	off = function (type, listener) {
		var data, listeners, candidate, i;

		validCallable(listener);

		if (!hasOwnProperty.call(this, '__ee__')) return this;
		data = this.__ee__;
		if (!data[type]) return this;
		listeners = data[type];

		if (typeof listeners === 'object') {
			for (i = 0; (candidate = listeners[i]); ++i) {
				if ((candidate === listener) ||
						(candidate.__eeOnceListener__ === listener)) {
					if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
					else listeners.splice(i, 1);
				}
			}
		} else {
			if ((listeners === listener) ||
					(listeners.__eeOnceListener__ === listener)) {
				delete data[type];
			}
		}

		return this;
	};

	emit = function (type) {
		var i, l, listener, listeners, args;

		if (!hasOwnProperty.call(this, '__ee__')) return;
		listeners = this.__ee__[type];
		if (!listeners) return;

		if (typeof listeners === 'object') {
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

			listeners = listeners.slice();
			for (i = 0; (listener = listeners[i]); ++i) {
				apply.call(listener, this, args);
			}
		} else {
			switch (arguments.length) {
			case 1:
				call.call(listeners, this);
				break;
			case 2:
				call.call(listeners, this, arguments[1]);
				break;
			case 3:
				call.call(listeners, this, arguments[1], arguments[2]);
				break;
			default:
				l = arguments.length;
				args = new Array(l - 1);
				for (i = 1; i < l; ++i) {
					args[i - 1] = arguments[i];
				}
				apply.call(listeners, this, args);
			}
		}
	};

	methods = {
		on: on,
		once: once,
		off: off,
		emit: emit
	};

	descriptors = {
		on: d_1(on),
		once: d_1(once),
		off: d_1(off),
		emit: d_1(emit)
	};

	base = defineProperties({}, descriptors);

	module.exports = exports = function (o) {
		return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
	};
	exports.methods = methods;
	});
	var eventEmitter_1 = eventEmitter.methods;

	var map = { function: true, object: true };

	var isObject = function (value) { return (isValue(value) && map[typeof value]) || false; };

	var validObject = function (value) {
		if (!isObject(value)) throw new TypeError(value + " is not an Object");
		return value;
	};

	var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

	var allOff = function (emitter/*, type*/) {
		var type = arguments[1], data;

		validObject(emitter);

		if (type !== undefined) {
			data = hasOwnProperty$1.call(emitter, '__ee__') && emitter.__ee__;
			if (!data) return;
			if (data[type]) delete data[type];
			return;
		}
		if (hasOwnProperty$1.call(emitter, '__ee__')) delete emitter.__ee__;
	};

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var util = {};

	util.createDom = function () {
	  var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
	  var tpl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	  var attrs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  var cname = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

	  var dom = document.createElement(el);
	  dom.className = cname;
	  dom.innerHTML = tpl;
	  Object.keys(attrs).forEach(function (item) {
	    var key = item;
	    var value = attrs[item];
	    if (el === 'video' || el === 'audio' || el === 'mobile-video') {
	      if (value) {
	        dom.setAttribute(key, value);
	      }
	    } else {
	      dom.setAttribute(key, value);
	    }
	  });
	  return dom;
	};

	util.hasClass = function (el, className) {
	  if (!el) {
	    return false;
	  }

	  if (el.classList) {
	    return Array.prototype.some.call(el.classList, function (item) {
	      return item === className;
	    });
	  } else {
	    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	  }
	};

	util.addClass = function (el, className) {
	  if (!el) {
	    return;
	  }

	  if (el.classList) {
	    className.replace(/(^\s+|\s+$)/g, '').split(/\s+/g).forEach(function (item) {
	      item && el.classList.add(item);
	    });
	  } else if (!util.hasClass(el, className)) {
	    el.className += ' ' + className;
	  }
	};

	util.removeClass = function (el, className) {
	  if (!el) {
	    return;
	  }

	  if (el.classList) {
	    className.split(/\s+/g).forEach(function (item) {
	      el.classList.remove(item);
	    });
	  } else if (util.hasClass(el, className)) {
	    className.split(/\s+/g).forEach(function (item) {
	      var reg = new RegExp('(\\s|^)' + item + '(\\s|$)');
	      el.className = el.className.replace(reg, ' ');
	    });
	  }
	};

	util.toggleClass = function (el, className) {
	  if (!el) {
	    return;
	  }

	  className.split(/\s+/g).forEach(function (item) {
	    if (util.hasClass(el, item)) {
	      util.removeClass(el, item);
	    } else {
	      util.addClass(el, item);
	    }
	  });
	};

	util.findDom = function () {
	  var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
	  var sel = arguments[1];

	  var dom = void 0;
	  // fix querySelector IDs that start with a digit
	  // https://stackoverflow.com/questions/37270787/uncaught-syntaxerror-failed-to-execute-queryselector-on-document
	  try {
	    dom = el.querySelector(sel);
	  } catch (e) {
	    if (sel.indexOf('#') === 0) {
	      dom = el.getElementById(sel.slice(1));
	    }
	  }
	  return dom;
	};

	util.padStart = function (str, length, pad) {
	  var charstr = String(pad);
	  var len = length >> 0;
	  var maxlen = Math.ceil(len / charstr.length);
	  var chars = [];
	  var r = String(str);
	  while (maxlen--) {
	    chars.push(charstr);
	  }
	  return chars.join('').substring(0, len - r.length) + r;
	};

	util.format = function (time) {
	  if (window.isNaN(time)) {
	    return '';
	  }
	  var hour = util.padStart(Math.floor(time / 3600), 2, 0);
	  var minute = util.padStart(Math.floor((time - hour * 3600) / 60), 2, 0);
	  var second = util.padStart(Math.floor(time - hour * 3600 - minute * 60), 2, 0);
	  return (hour === '00' ? [minute, second] : [hour, minute, second]).join(':');
	};

	util.event = function (e) {
	  if (e.touches) {
	    var touch = e.touches[0] || e.changedTouches[0];
	    e.clientX = touch.clientX || 0;
	    e.clientY = touch.clientY || 0;
	    e.offsetX = touch.pageX - touch.target.offsetLeft;
	    e.offsetY = touch.pageY - touch.target.offsetTop;
	  }
	  e._target = e.target || e.srcElement;
	};

	util.typeOf = function (obj) {
	  return Object.prototype.toString.call(obj).match(/([^\s.*]+)(?=]$)/g)[0];
	};

	util.deepCopy = function (dst, src) {
	  if (util.typeOf(src) === 'Object' && util.typeOf(dst) === 'Object') {
	    Object.keys(src).forEach(function (key) {
	      // eslint-disable-next-line no-undef
	      if (util.typeOf(src[key]) === 'Object' && !(src[key] instanceof Node)) {
	        if (dst[key] === undefined) {
	          dst[key] = src[key];
	        } else {
	          util.deepCopy(dst[key], src[key]);
	        }
	      } else if (util.typeOf(src[key]) === 'Array') {
	        dst[key] = util.typeOf(dst[key]) === 'Array' ? dst[key].concat(src[key]) : src[key];
	      } else {
	        dst[key] = src[key];
	      }
	    });
	    return dst;
	  }
	};
	util.getBgImage = function (el) {
	  // fix: return current page url when url is none
	  var url = (el.currentStyle || window.getComputedStyle(el, null)).backgroundImage;
	  if (!url || url === 'none') {
	    return '';
	  }
	  var a = document.createElement('a');
	  a.href = url.replace(/url\("|"\)/g, '');
	  return a.href;
	};

	util.copyDom = function (dom) {
	  if (dom && dom.nodeType === 1) {
	    var back = document.createElement(dom.tagName);
	    Array.prototype.forEach.call(dom.attributes, function (node) {
	      back.setAttribute(node.name, node.value);
	    });
	    if (dom.innerHTML) {
	      back.innerHTML = dom.innerHTML;
	    }
	    return back;
	  } else {
	    return '';
	  }
	};

	util.setInterval = function (context, eventName, intervalFunc, frequency) {
	  if (!context._interval[eventName]) {
	    context._interval[eventName] = setInterval(intervalFunc.bind(context), frequency);
	  }
	};

	util.clearInterval = function (context, eventName) {
	  clearInterval(context._interval[eventName]);
	  context._interval[eventName] = null;
	};

	util.createImgBtn = function (name, imgUrl, width, height) {
	  var btn = util.createDom('xg-' + name, '', {}, 'xgplayer-' + name + '-img');
	  btn.style.backgroundImage = 'url("' + imgUrl + '")';
	  if (width && height) {
	    var w = void 0,
	        h = void 0,
	        unit = void 0;
	    ['px', 'rem', 'em', 'pt', 'dp', 'vw', 'vh', 'vm', '%'].every(function (item) {
	      if (width.indexOf(item) > -1 && height.indexOf(item) > -1) {
	        w = parseFloat(width.slice(0, width.indexOf(item)).trim());
	        h = parseFloat(height.slice(0, height.indexOf(item)).trim());
	        unit = item;
	        return false;
	      } else {
	        return true;
	      }
	    });
	    btn.style.width = '' + w + unit;
	    btn.style.height = '' + h + unit;
	    btn.style.backgroundSize = '' + w + unit + ' ' + h + unit;
	    if (name === 'start') {
	      btn.style.margin = '-' + h / 2 + unit + ' auto auto -' + w / 2 + unit;
	    } else {
	      btn.style.margin = 'auto 5px auto 5px';
	    }
	  }
	  return btn;
	};

	util.Hex2RGBA = function (hex, alpha) {
	  var rgb = []; // 定义rgb数组
	  // eslint-disable-next-line no-useless-escape
	  if (/^\#[0-9A-F]{3}$/i.test(hex)) {
	    var sixHex = '#';
	    hex.replace(/[0-9A-F]/ig, function (kw) {
	      sixHex += kw + kw;
	    });
	    hex = sixHex;
	  }
	  if (/^#[0-9A-F]{6}$/i.test(hex)) {
	    hex.replace(/[0-9A-F]{2}/ig, function (kw) {
	      // eslint-disable-next-line no-eval
	      rgb.push(eval('0x' + kw));
	    });
	    return 'rgba(' + rgb.join(',') + ', ' + alpha + ')';
	  } else {
	    return 'rgba(255, 255, 255, 0.1)';
	  }
	};

	util.getFullScreenEl = function () {
	  return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
	};

	util.checkIsFunction = function (fun) {
	  return typeof fun === 'function';
	};

	util.checkIsObject = function (obj) {
	  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
	};

	var version = "2.3.5";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	var ErrorTypes = {
	  network: {
	    code: 1,
	    msg: '视频下载错误',
	    remark: '只要视频下载错误就使用此类型，无论是video本身的超时还是xhr的分段请求超时或者资源不存在'
	  },
	  mse: {
	    code: 2,
	    msg: '流追加错误',
	    remark: '追加流的时候如果类型不对、无法被正确解码则会触发此类错误'
	  },
	  parse: {
	    code: 3,
	    msg: '解析错误',
	    remark: 'mp4、hls、flv我们都是使用js进行格式解析，如果解析失败则会触发此类错误'
	  },
	  format: {
	    code: 4,
	    msg: '格式错误',
	    remark: '如果浏览器不支持的格式导致播放错误'
	  },
	  decoder: {
	    code: 5,
	    msg: '解码错误',
	    remark: '浏览器解码异常会抛出此类型错误'
	  },
	  runtime: {
	    code: 6,
	    msg: '语法错误',
	    remark: '播放器语法错误'
	  },
	  timeout: {
	    code: 7,
	    msg: '播放超时',
	    remark: '播放过程中无法正常请求下一个分段导致播放中断'
	  },
	  other: {
	    code: 8,
	    msg: '其他错误',
	    remark: '不可知的错误或被忽略的错误类型'
	  }
	};

	var Errors = function Errors(type, currentTime, duration, networkState, readyState, src, currentSrc, ended) {
	  var errd = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : { line: '', handle: '', msg: '', version: '' };
	  var errorCode = arguments[9];
	  var mediaError = arguments[10];

	  _classCallCheck(this, Errors);

	  var r = {};
	  if (arguments.length > 1) {
	    r.playerVersion = version; // 播放器版本
	    r.errorType = type;
	    r.domain = document.domain; // domain
	    r.duration = duration; // 视频时长
	    r.currentTime = currentTime;
	    r.networkState = networkState;
	    r.readyState = readyState;
	    r.currentSrc = currentSrc;
	    r.src = src;
	    r.ended = ended;
	    r.errd = errd; // 错误详情
	    r.ex = (ErrorTypes[type] || {}).msg; // 补充信息
	    r.errorCode = errorCode;
	    r.mediaError = mediaError;
	  } else {
	    var arg = arguments[0];
	    Object.keys(arg).map(function (key) {
	      r[key] = arg[key];
	    });
	    r.ex = (arg.type && ErrorTypes[arg.type] || {}).msg;
	  }
	  return r;
	};

	var PLAY = 'play';
	var PLAYING = 'playing';
	var ENDED = 'ended';
	var PAUSE = 'pause';
	var ERROR = 'error';
	var SEEKING = 'seeking';
	var SEEKED = 'seeked';
	var TIME_UPDATE = 'timeupdate';
	var WAITING = 'waiting';
	var CANPLAY = 'canplay';
	var CANPLAY_THROUGH = 'canplaythrough';
	var DURATION_CHANGE = 'durationchange';
	var VOLUME_CHANGE = 'volumechange';
	var LOADED_DATA = 'loadeddata';

	// player events
	var BUFFER_CHANGE = 'bufferedChange';
	var PLAYER_FOCUS = 'focus';
	var PLAYER_BLUR = 'blur';
	var READY = 'ready';
	var URL_NULL = 'urlNull';
	var AUTOPLAY_STARTED = 'autoplay_started';
	var AUTOPLAY_PREVENTED = 'autoplay_was_prevented';
	var COMPLETE = 'complete';
	var REPLAY = 'replay';
	var DESTROY = 'destroy';
	var URL_CHANGE = 'urlchange';

	// screen change evnets
	var FULLSCREEN_CHANGE = 'fullscreen_change';
	var CSS_FULLSCREEN_CHANGE = 'cssFullscreen_change';

	var Events = /*#__PURE__*/Object.freeze({
		__proto__: null,
		PLAY: PLAY,
		PLAYING: PLAYING,
		ENDED: ENDED,
		PAUSE: PAUSE,
		ERROR: ERROR,
		SEEKING: SEEKING,
		SEEKED: SEEKED,
		TIME_UPDATE: TIME_UPDATE,
		WAITING: WAITING,
		CANPLAY: CANPLAY,
		CANPLAY_THROUGH: CANPLAY_THROUGH,
		DURATION_CHANGE: DURATION_CHANGE,
		VOLUME_CHANGE: VOLUME_CHANGE,
		LOADED_DATA: LOADED_DATA,
		BUFFER_CHANGE: BUFFER_CHANGE,
		PLAYER_FOCUS: PLAYER_FOCUS,
		PLAYER_BLUR: PLAYER_BLUR,
		READY: READY,
		URL_NULL: URL_NULL,
		AUTOPLAY_STARTED: AUTOPLAY_STARTED,
		AUTOPLAY_PREVENTED: AUTOPLAY_PREVENTED,
		COMPLETE: COMPLETE,
		REPLAY: REPLAY,
		DESTROY: DESTROY,
		URL_CHANGE: URL_CHANGE,
		FULLSCREEN_CHANGE: FULLSCREEN_CHANGE,
		CSS_FULLSCREEN_CHANGE: CSS_FULLSCREEN_CHANGE
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Proxy = function () {
	  function Proxy(options) {
	    var _this = this;

	    _classCallCheck$1(this, Proxy);

	    this._hasStart = false;
	    this._currentTime = 0;
	    this._duration = 0;
	    this.videoConfig = {
	      controls: false,
	      autoplay: options.autoplay,
	      playsinline: options.playsinline,
	      'webkit-playsinline': options.playsinline,
	      'x5-playsinline': options.playsinline,
	      'x5-video-player-type': options['x5-video-player-type'] || options['x5VideoPlayerType'],
	      'x5-video-player-fullscreen': options['x5-video-player-fullscreen'] || options['x5VideoPlayerFullscreen'],
	      'x5-video-orientation': options['x5-video-orientation'] || options['x5VideoOrientation'],
	      airplay: options['airplay'],
	      'webkit-airplay': options['airplay'],
	      tabindex: 2,
	      mediaType: options.mediaType || 'video'
	    };
	    if (options.videoAttrbutes) {
	      Object.keys(options.videoAttrbutes).map(function (key) {
	        _this.videoConfig[key] = options.videoAttrbutes[key];
	      });
	    }
	    if (options.loop) {
	      this.videoConfig.loop = 'loop';
	    }

	    if (options.defaultPlaybackRate) {
	      this.videoConfig.defaultPlaybackRate = options.defaultPlaybackRate;
	    }

	    this.video = util.createDom(this.videoConfig.mediaType, '', this.videoConfig, '');
	    if (options.autoplay) {
	      this.video.autoplay = true;
	      if (options.autoplayMuted) {
	        this.video.muted = true;
	      }
	    }

	    eventEmitter(this);
	    this._interval = {};
	    this._initEvents();
	  }

	  _createClass(Proxy, [{
	    key: '_initEvents',
	    value: function _initEvents() {
	      var _this2 = this;

	      var lastBuffer = '0,0';
	      this.ev = ['play', 'playing', 'pause', 'ended', 'error', 'seeking', 'seeked', 'timeupdate', 'waiting', 'canplay', 'canplaythrough', 'durationchange', 'volumechange', 'loadeddata'].map(function (item) {
	        return _defineProperty({}, item, 'on' + item.charAt(0).toUpperCase() + item.slice(1));
	      });
	      /**
	       * 和video事件对应的on[EventKey]接口的触发
	       * @param {String} funName
	       */
	      function _emitEvent(funName, player) {
	        player[funName] && typeof player[funName] === 'function' && player[funName](player);
	      }
	      this.ev.forEach(function (item) {
	        _this2.evItem = Object.keys(item)[0];
	        var name = Object.keys(item)[0];
	        var funName = item[name];
	        _this2.video.addEventListener(Object.keys(item)[0], function () {
	          if (name === 'error') {
	            _this2.errorHandler(name);
	            _emitEvent(funName, _this2);
	          } else {
	            _this2.emit(name, _this2);
	            _emitEvent(funName, _this2);
	          }

	          if (name === 'timeupdate') {
	            _this2._currentTime = _this2.video.currentTime;
	          }

	          if (name === 'durationchange') {
	            _this2._duration = _this2.video.duration;
	          }

	          if (_this2.hasOwnProperty('_interval')) {
	            if (['ended', 'error', 'timeupdate'].indexOf(name) < 0) {
	              clearInterval(_this2._interval['bufferedChange']);
	              util.setInterval(_this2, 'bufferedChange', function () {
	                var curBuffer = [];
	                for (var i = 0, len = this.video.buffered.length; i < len; i++) {
	                  curBuffer.push([this.video.buffered.start(i), this.video.buffered.end(i)]);
	                }
	                if (curBuffer.toString() !== lastBuffer) {
	                  lastBuffer = curBuffer.toString();
	                  this.emit(BUFFER_CHANGE, curBuffer);
	                }
	              }, 200);
	            } else {
	              if (name !== 'timeupdate') {
	                util.clearInterval(_this2, 'bufferedChange');
	              }
	            }
	          }
	        }, false);
	      });
	    }

	    /**
	     * 错误监听处理逻辑抽离
	     */

	  }, {
	    key: 'errorHandler',
	    value: function errorHandler(name) {
	      if (this.video && this.video.error) {
	        this.emit(name, new Errors('other', this.currentTime, this.duration, this.networkState, this.readyState, this.currentSrc, this.src, this.ended, {
	          line: 162,
	          msg: this.error,
	          handle: 'Constructor'
	        }, this.video.error.code, this.video.error));
	      }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var _this3 = this;

	      this.pause();
	      this.video.removeAttribute('src'); // empty source
	      this.video.load();
	      this._currentTime = 0;
	      this._duration = 0;
	      for (var k in this._interval) {
	        clearInterval(this._interval[k]);
	        this._interval[k] = null;
	      }
	      this.emit(DESTROY);
	      this.ev.forEach(function (item) {
	        var evName = Object.keys(item)[0];
	        var evFunc = _this3[item[evName]];
	        if (evFunc) {
	          _this3.off(evName, evFunc);
	        }
	      });
	      allOff(this);
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      return this.video.play();
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      this.video.pause();
	    }
	  }, {
	    key: 'canPlayType',
	    value: function canPlayType(type) {
	      return this.video.canPlayType(type);
	    }
	  }, {
	    key: 'getBufferedRange',
	    value: function getBufferedRange() {
	      var range = [0, 0];
	      var video = this.video;
	      var buffered = video.buffered;
	      var currentTime = video.currentTime;
	      if (buffered) {
	        for (var i = 0, len = buffered.length; i < len; i++) {
	          range[0] = buffered.start(i);
	          range[1] = buffered.end(i);
	          if (range[0] <= currentTime && currentTime <= range[1]) {
	            break;
	          }
	        }
	      }
	      if (range[0] - currentTime <= 0 && currentTime - range[1] <= 0) {
	        return range;
	      } else {
	        return [0, 0];
	      }
	    }
	  }, {
	    key: 'hasStart',
	    get: function get() {
	      return this._hasStart;
	    },
	    set: function set(bool) {
	      if (typeof bool === 'boolean') {
	        this._hasStart = bool;
	        this.emit('hasstart');
	      }
	    }
	  }, {
	    key: 'autoplay',
	    set: function set(isTrue) {
	      this.video.autoplay = isTrue;
	    },
	    get: function get() {
	      return this.video.autoplay;
	    }
	  }, {
	    key: 'buffered',
	    get: function get() {
	      return this.video.buffered;
	    }
	  }, {
	    key: 'crossOrigin',
	    get: function get() {
	      return this.video.crossOrigin;
	    },
	    set: function set(isTrue) {
	      this.video.crossOrigin = isTrue;
	    }
	  }, {
	    key: 'currentSrc',
	    get: function get() {
	      return this.video.currentSrc;
	    },
	    set: function set(src) {
	      this.video.currentSrc = src;
	    }
	  }, {
	    key: 'currentTime',
	    get: function get() {
	      return this._currentTime;
	    },
	    set: function set(time) {
	      this.video.currentTime = time;
	    }
	  }, {
	    key: 'defaultMuted',
	    get: function get() {
	      return this.video.defaultMuted;
	    },
	    set: function set(isTrue) {
	      this.video.defaultMuted = isTrue;
	    }
	  }, {
	    key: 'duration',
	    get: function get() {
	      return this._duration;
	    }
	  }, {
	    key: 'ended',
	    get: function get() {
	      return this.video.ended;
	    }
	  }, {
	    key: 'error',
	    get: function get() {
	      var err = this.video.error;
	      if (!err) {
	        return null;
	      }
	      var status = [{
	        en: 'MEDIA_ERR_ABORTED',
	        cn: '取回过程被用户中止'
	      }, {
	        en: 'MEDIA_ERR_NETWORK',
	        cn: '当下载时发生错误'
	      }, {
	        en: 'MEDIA_ERR_DECODE',
	        cn: '当解码时发生错误'
	      }, {
	        en: 'MEDIA_ERR_SRC_NOT_SUPPORTED',
	        cn: '不支持音频/视频'
	      }];
	      return this.lang ? this.lang[status[err.code - 1].en] : status[err.code - 1].en;
	    }
	  }, {
	    key: 'loop',
	    get: function get() {
	      return this.video.loop;
	    },
	    set: function set(isTrue) {
	      this.video.loop = isTrue;
	    }
	  }, {
	    key: 'muted',
	    get: function get() {
	      return this.video.muted;
	    },
	    set: function set(isTrue) {
	      this.video.muted = isTrue;
	    }
	  }, {
	    key: 'networkState',
	    get: function get() {
	      var status = [{
	        en: 'NETWORK_EMPTY',
	        cn: '音频/视频尚未初始化'
	      }, {
	        en: 'NETWORK_IDLE',
	        cn: '音频/视频是活动的且已选取资源，但并未使用网络'
	      }, {
	        en: 'NETWORK_LOADING',
	        cn: '浏览器正在下载数据'
	      }, {
	        en: 'NETWORK_NO_SOURCE',
	        cn: '未找到音频/视频来源'
	      }];
	      return this.lang ? this.lang[status[this.video.networkState].en] : status[this.video.networkState].en;
	    }
	  }, {
	    key: 'paused',
	    get: function get() {
	      return this.video.paused;
	    }
	  }, {
	    key: 'playbackRate',
	    get: function get() {
	      return this.video.playbackRate;
	    },
	    set: function set(rate) {
	      this.video.playbackRate = rate;
	    }
	  }, {
	    key: 'played',
	    get: function get() {
	      return this.video.played;
	    }
	  }, {
	    key: 'preload',
	    get: function get() {
	      return this.video.preload;
	    },
	    set: function set(isTrue) {
	      this.video.preload = isTrue;
	    }
	  }, {
	    key: 'readyState',
	    get: function get() {
	      var status = [{
	        en: 'HAVE_NOTHING',
	        cn: '没有关于音频/视频是否就绪的信息'
	      }, {
	        en: 'HAVE_METADATA',
	        cn: '关于音频/视频就绪的元数据'
	      }, {
	        en: 'HAVE_CURRENT_DATA',
	        cn: '关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒'
	      }, {
	        en: 'HAVE_FUTURE_DATA',
	        cn: '当前及至少下一帧的数据是可用的'
	      }, {
	        en: 'HAVE_ENOUGH_DATA',
	        cn: '可用数据足以开始播放'
	      }];
	      return this.lang ? this.lang[status[this.video.readyState].en] : status[this.video.readyState];
	    }
	  }, {
	    key: 'seekable',
	    get: function get() {
	      return this.video.seekable;
	    }
	  }, {
	    key: 'seeking',
	    get: function get() {
	      return this.video.seeking;
	    }
	  }, {
	    key: 'src',
	    get: function get() {
	      return this.video.src;
	    },
	    set: function set(url) {
	      if (!this.ended) {
	        this.emit(URL_CHANGE, url);
	      }
	      this.video.pause();
	      this._currentTime = 0;
	      this._duration = 0;
	      this.video.src = url;
	    }
	  }, {
	    key: 'volume',
	    get: function get() {
	      return this.video.volume;
	    },
	    set: function set(vol) {
	      this.video.volume = vol;
	    }
	  }]);

	  return Proxy;
	}();

	var sniffer = {
	  get device() {
	    var r = sniffer.os;
	    return r.isPc ? 'pc' : 'mobile';
	    // return r.isPc ? 'pc' : r.isTablet ? 'tablet' : 'mobile'
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
	    var isPc = !isPhone && !isAndroid && !isSymbian && !isTablet;
	    return {
	      isTablet: isTablet,
	      isPhone: isPhone,
	      isAndroid: isAndroid,
	      isPc: isPc,
	      isSymbian: isSymbian,
	      isWindowsPhone: isWindowsPhone,
	      isFireFox: isFireFox
	    };
	  }
	};

	var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BasePlugin = function () {
	  _createClass$1(BasePlugin, null, [{
	    key: 'defineGetterOrSetter',
	    value: function defineGetterOrSetter(Obj, map) {
	      for (var key in map) {
	        Object.defineProperty(Obj, key, map[key]);
	      }
	    }
	  }]);

	  function BasePlugin(args) {
	    _classCallCheck$2(this, BasePlugin);

	    this.__args = args;
	    this.__events = {}; // 对player的事件监听缓存
	    this.config = args.config || {};
	    if (util.checkIsFunction(this.beforeCreate)) {
	      this.beforeCreate();
	    }
	    this.__init(args);
	    if (util.checkIsFunction(this.afterCreate)) {
	      this.afterCreate();
	    }
	  }

	  _createClass$1(BasePlugin, [{
	    key: '__init',
	    value: function __init(args) {
	      var _this = this;

	      BasePlugin.defineGetterOrSetter(this, {
	        'player': {
	          get: function get() {
	            return args.player;
	          }
	        },
	        'playerConfig': {
	          get: function get() {
	            return args.player && args.player.config;
	          }
	        },
	        'pluginName': {
	          get: function get() {
	            if (args.pluginName) {
	              return args.pluginName;
	            } else {
	              return _this.constructor.pluginName;
	            }
	          }
	        },
	        'root': {
	          get: function get() {
	            return args.player.root;
	          }
	        },
	        'logger': {
	          get: function get() {
	            return args.player.logger;
	          }
	        }
	      });
	    }
	  }, {
	    key: 'on',
	    value: function on(event, callback) {
	      var _this2 = this;

	      if (typeof event === 'string') {
	        this.__events[event] = callback;
	        this.player.on(event, callback);
	      } else if (Array.isArray(event)) {
	        event.forEach(function (item) {
	          _this2.__events[item] = callback;
	          _this2.player.on(item, callback);
	        });
	      }
	    }
	  }, {
	    key: 'once',
	    value: function once(event, callback) {
	      this.player.once(event, callback);
	    }
	  }, {
	    key: 'off',
	    value: function off(event, callback) {
	      var _this3 = this;

	      if (typeof event === 'string') {
	        this.__events[event] = undefined;
	        this.player.off(event, callback);
	      } else if (Array.isArray(event)) {
	        event.forEach(function (item) {
	          _this3.__events[item] = undefined;
	          _this3.player.off(item, callback);
	        });
	      }
	    }
	  }, {
	    key: 'offAll',
	    value: function offAll() {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = Object.keys(this.__events)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var item = _step.value;

	          this.off(item, this.__events[item]);
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
	    }
	  }, {
	    key: 'emit',
	    value: function emit(event, res) {
	      this.player.emit(event, res);
	    }
	  }, {
	    key: '_destroy',
	    value: function _destroy() {
	      this.offAll();
	      if (util.checkIsFunction(this.destroy)) {
	        this.destroy();
	      }
	    }
	  }]);

	  return BasePlugin;
	}();

	BasePlugin.Util = util;
	BasePlugin.Sniffer = sniffer;
	BasePlugin.Errors = Errors;
	BasePlugin.Events = Events;

	/**
	* a plugins manager to register and search
	**/
	var pluginsManager = {
	  init: function init(player) {
	    // 标记每一个播放器实例
	    var cgid = player._pluginInfoId;
	    if (!cgid) {
	      cgid = new Date().getTime();
	      player._pluginInfoId = cgid;
	    }
	    if (!this.pluginGroup) {
	      this.pluginGroup = {};
	    }
	    this.pluginGroup[cgid] = {
	      '_player': player,
	      '_originalOptions': player.config || {}
	    };
	  },

	  /**
	  * register a Plugin
	  * @param { object } player the plugins install
	  * @param { function } plugin the plugin contructor
	  * @param { object } options the plugin configuration
	  * @return { object } Plugin the plugin instance
	  **/
	  register: function register(player, plugin) {
	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    if (!player || !plugin || typeof plugin !== 'function' || plugin.prototype === undefined) {
	      return;
	    }
	    var cgid = player._pluginInfoId;
	    if (!cgid || !this.pluginGroup || !this.pluginGroup[cgid]) {
	      this.init(player);
	      cgid = player._pluginInfoId;
	    }
	    if (!this.pluginGroup[cgid]._plugins) {
	      this.pluginGroup[cgid]._plugins = [];
	    }
	    var plugins = this.pluginGroup[cgid]._plugins;
	    var originalOptions = this.pluginGroup[cgid]._originalOptions;
	    options.player = this.pluginGroup[cgid]._player;
	    console.log('plugin.pluginName', plugin.pluginName);
	    var pluginName = options.pluginName || plugin.pluginName;
	    if (!pluginName) {
	      throw new Error('The property pluginName is necessary');
	    }
	    if (!options.config) {
	      options.config = {};
	    }
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = Object.keys(originalOptions)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var item = _step.value;

	        if (pluginName.toLowerCase() === item.toLowerCase()) {
	          options.config = Object.assign({}, options.config, originalOptions[item]);
	          break;
	        }
	      }
	      // 获取插件添加的父节点
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

	    if (!options.root) {
	      options.root = player.root;
	    } else if (typeof options.root === 'string') {
	      options.root = player[options.root];
	    }

	    // 复制插件的默认配置项
	    if (plugin.defaultConfig) {
	      Object.keys(plugin.defaultConfig).map(function (key) {
	        if (typeof options.config[key] === 'undefined') {
	          options.config[key] = plugin.defaultConfig[key];
	        }
	      });
	    }
	    try {
	      // eslint-disable-next-line new-cap
	      var _instance = new plugin(options);
	      plugins[pluginName.toLowerCase()] = _instance;
	      plugins[pluginName.toLowerCase()].func = plugin;
	      return _instance;
	    } catch (err) {
	      console.error(err);
	      throw err;
	    }
	  },
	  unRegister: function unRegister(cgid, name) {
	    try {
	      this.pluginGroup[cgid]._plugins[name]._destroy();
	      this.pluginGroup[cgid]._plugins[name] = null;
	    } catch (e) {
	      this.pluginGroup[cgid]._plugins[name] = null;
	    }
	  },


	  /**
	   * get all plugin instance of player
	   * @param {*} player
	   */
	  getPlugins: function getPlugins(player) {
	    var cgid = player._pluginInfoId;
	    return cgid ? this.pluginGroup[cgid]._plugins : {};
	  },
	  findPlugin: function findPlugin(player, name) {
	    if (!this.pluginGroup) {
	      return null;
	    }
	    var cgid = player._pluginInfoId;
	    var cName = name.toLowerCase();
	    return this.pluginGroup[cgid]._plugins[cName];
	  },
	  beforeInit: function beforeInit(player) {
	    var _this = this;

	    function retPromise(fun) {
	      if (!fun || !fun.then) {
	        return new Promise(function (resolve) {
	          resolve();
	        });
	      } else {
	        return fun;
	      }
	    }
	    return new Promise(function (resolve) {
	      if (!_this.pluginGroup) {
	        return;
	      }
	      var cgid = player._pluginInfoId;
	      var plugins = _this.pluginGroup[cgid]._plugins;
	      var pluginsRet = [];
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = Object.keys(plugins)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var item = _step2.value;

	          if (plugins[item] && plugins[item].beforePlayerInit) {
	            try {
	              var ret = plugins[item].beforePlayerInit();
	              pluginsRet.push(retPromise(ret));
	            } catch (e) {
	              pluginsRet.push(retPromise(null));
	              throw e;
	            }
	          }
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

	      Promise.all(pluginsRet).then(function () {
	        resolve();
	      }).catch(function (e) {
	        console.error(e);
	        resolve();
	      });
	    });
	  },
	  afterInit: function afterInit(player) {
	    if (!this.pluginGroup) {
	      return;
	    }
	    var cgid = player._pluginInfoId;
	    var plugins = this.pluginGroup[cgid]._plugins;
	    var _iteratorNormalCompletion3 = true;
	    var _didIteratorError3 = false;
	    var _iteratorError3 = undefined;

	    try {
	      for (var _iterator3 = Object.keys(plugins)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	        var item = _step3.value;

	        if (plugins[item] && plugins[item].afterPlayerInit) {
	          plugins[item].afterPlayerInit();
	        }
	      }
	    } catch (err) {
	      _didIteratorError3 = true;
	      _iteratorError3 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion3 && _iterator3.return) {
	          _iterator3.return();
	        }
	      } finally {
	        if (_didIteratorError3) {
	          throw _iteratorError3;
	        }
	      }
	    }
	  },
	  reRender: function reRender(player) {
	    var cgid = player._pluginInfoId;
	    var pluginsMap = {};
	    var plugins = this.pluginGroup[cgid]._plugins;
	    var _iteratorNormalCompletion4 = true;
	    var _didIteratorError4 = false;
	    var _iteratorError4 = undefined;

	    try {
	      for (var _iterator4 = Object.keys(plugins)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	        var item = _step4.value;

	        pluginsMap[item] = {
	          plugin: plugins[item].func,
	          options: plugins[item]._args
	        };
	        this.unRegister(cgid, item);
	      }
	    } catch (err) {
	      _didIteratorError4 = true;
	      _iteratorError4 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion4 && _iterator4.return) {
	          _iterator4.return();
	        }
	      } finally {
	        if (_didIteratorError4) {
	          throw _iteratorError4;
	        }
	      }
	    }

	    var _iteratorNormalCompletion5 = true;
	    var _didIteratorError5 = false;
	    var _iteratorError5 = undefined;

	    try {
	      for (var _iterator5 = Object.keys(pluginsMap)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	        var _item = _step5.value;

	        this.register(cgid, _item, pluginsMap[_item].plugin, pluginsMap[_item].options);
	      }
	    } catch (err) {
	      _didIteratorError5 = true;
	      _iteratorError5 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion5 && _iterator5.return) {
	          _iterator5.return();
	        }
	      } finally {
	        if (_didIteratorError5) {
	          throw _iteratorError5;
	        }
	      }
	    }
	  },
	  destroy: function destroy(player) {
	    var cgid = player._pluginInfoId;
	    var plugins = this.pluginGroup[cgid]._plugins;
	    var _iteratorNormalCompletion6 = true;
	    var _didIteratorError6 = false;
	    var _iteratorError6 = undefined;

	    try {
	      for (var _iterator6 = Object.keys(plugins)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	        var item = _step6.value;

	        this.unRegister(cgid, item);
	      }
	    } catch (err) {
	      _didIteratorError6 = true;
	      _iteratorError6 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion6 && _iterator6.return) {
	          _iterator6.return();
	        }
	      } finally {
	        if (_didIteratorError6) {
	          throw _iteratorError6;
	        }
	      }
	    }

	    delete this.pluginGroup[cgid];
	  }
	};

	/**
	 * Element prototype.
	 */

	var proto = Element.prototype;

	/**
	 * Vendor function.
	 */

	var vendor = proto.matchesSelector
	  || proto.webkitMatchesSelector
	  || proto.mozMatchesSelector
	  || proto.msMatchesSelector
	  || proto.oMatchesSelector;

	/**
	 * Expose `match()`.
	 */

	var matchesSelector = match;

	/**
	 * Match `el` to `selector`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @return {Boolean}
	 * @api public
	 */

	function match(el, selector) {
	  if (vendor) return vendor.call(el, selector);
	  var nodes = el.parentNode.querySelectorAll(selector);
	  for (var i = 0; i < nodes.length; ++i) {
	    if (nodes[i] == el) return true;
	  }
	  return false;
	}

	var closest = function (element, selector, checkYoSelf) {
	  var parent = checkYoSelf ? element : element.parentNode;

	  while (parent && parent !== document) {
	    if (matchesSelector(parent, selector)) return parent;
	    parent = parent.parentNode;
	  }
	};

	var bind, unbind, prefix;

	function detect () {
	  bind = window.addEventListener ? 'addEventListener' : 'attachEvent';
	  unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent';
	  prefix = bind !== 'addEventListener' ? 'on' : '';
	}

	/**
	 * Bind `el` event `type` to `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */

	var bind_1 = function(el, type, fn, capture){
	  if (!bind) detect();
	  el[bind](prefix + type, fn, capture || false);
	  return fn;
	};

	/**
	 * Unbind `el` event `type`'s callback `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */

	var unbind_1 = function(el, type, fn, capture){
	  if (!unbind) detect();
	  el[unbind](prefix + type, fn, capture || false);
	  return fn;
	};

	var componentEvent = {
		bind: bind_1,
		unbind: unbind_1
	};

	/**
	 * Module dependencies.
	 */



	/**
	 * Delegate event `type` to `selector`
	 * and invoke `fn(e)`. A callback function
	 * is returned which may be passed to `.unbind()`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */

	// Some events don't bubble, so we want to bind to the capture phase instead
	// when delegating.
	var forceCaptureEvents = ['focus', 'blur'];

	var bind$1 = function(el, selector, type, fn, capture){
	  if (forceCaptureEvents.indexOf(type) !== -1) capture = true;

	  return componentEvent.bind(el, type, function(e){
	    var target = e.target || e.srcElement;
	    e.delegateTarget = closest(target, selector, true);
	    if (e.delegateTarget) fn.call(el, e);
	  }, capture);
	};

	/**
	 * Unbind event `type`'s callback `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @api public
	 */

	var unbind$1 = function(el, type, fn, capture){
	  if (forceCaptureEvents.indexOf(type) !== -1) capture = true;

	  componentEvent.unbind(el, type, fn, capture);
	};

	var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _createElement(tag, name) {
	  var dom = document.createElement(tag);
	  dom.name = name;
	  return dom;
	}
	/**
	 * 插入dom结构
	 * @param {String} html html字符串
	 * @param {DocumentElemebt } parent
	 * @param {*} index
	 */
	function insert(html, parent, index) {
	  var len = parent.children.length;
	  var insertIdx = parseInt(index);
	  if (typeof index === 'undefined' || len <= insertIdx) {
	    parent.insertAdjacentHTML('beforeend', html);
	    return parent.children[parent.children.length - 1];
	  } else if (insertIdx === 0) {
	    parent.insertAdjacentHTML('afterbegin', html);
	    return parent.children[0];
	  }
	  var el = parent.children[insertIdx];
	  if (el && el.insertAdjacentHTML) {
	    el.insertAdjacentHTML('beforebegin', html);
	    return parent.children[insertIdx];
	  }
	}

	function registerIconsObj(iconsConfig, plugin) {
	  Object.keys(iconsConfig).map(function (iconKey) {
	    Object.defineProperty(plugin.icons, iconKey, {
	      get: function get() {
	        var _icons = plugin.config.icons || plugin.playerConfig.icons;
	        if (_icons && _icons[iconKey]) {
	          return _icons[iconKey];
	        } else {
	          return iconsConfig[iconKey];
	        }
	      }
	    });
	  });
	}

	function registerTextObj(textConfig, plugin) {
	  Object.keys(textConfig).map(function (key) {
	    Object.defineProperty(plugin.text, key, {
	      get: function get() {
	        var lang = plugin.playerConfig.lang || 'zh';
	        return textConfig[key][lang];
	      }
	    });
	  });
	}

	var Plugin = function (_BasePlugin) {
	  _inherits(Plugin, _BasePlugin);

	  function Plugin() {
	    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck$3(this, Plugin);

	    return _possibleConstructorReturn(this, (Plugin.__proto__ || Object.getPrototypeOf(Plugin)).call(this, args));
	  }

	  _createClass$2(Plugin, [{
	    key: '__init',
	    value: function __init(args) {
	      _get(Plugin.prototype.__proto__ || Object.getPrototypeOf(Plugin.prototype), '__init', this).call(this, args);
	      var _parent = args.root;
	      var _el = null;
	      this.icons = {};
	      var defaultIcons = this.registerIcons() || {};
	      registerIconsObj(defaultIcons, this);

	      this.text = {};
	      var defaultTexConfig = this.registerLangauageTexts() || {};
	      registerTextObj(defaultTexConfig, this);
	      var renderStr = '';
	      try {
	        renderStr = this.render();
	      } catch (e) {
	        throw new Error('Plugin:' + this.pluginName + ':render:' + e.message);
	      }

	      if (renderStr) {
	        _el = insert(renderStr, _parent, args.index);
	      } else if (args.tag) {
	        _el = _createElement(args.tag, args.name);
	        _parent.appendChild(_el);
	      }

	      Plugin.defineGetterOrSetter(this, {
	        'el': {
	          get: function get() {
	            return _el;
	          }
	        },
	        'parent': {
	          get: function get() {
	            return _parent;
	          }
	        }
	      });

	      var attr = this.config.attr || {};
	      var style = this.config.style || {};

	      this.setAttr(attr);
	      this.setStyle(style);
	      this.__registeChildren();
	    }
	  }, {
	    key: '__registeChildren',
	    value: function __registeChildren() {
	      var children = this.children();
	      if (children && (typeof children === 'undefined' ? 'undefined' : _typeof$1(children)) === 'object') {
	        if (!this._children) {
	          this._children = [];
	        }
	        if (Object.keys(children).length > 0) {
	          var _iteratorNormalCompletion = true;
	          var _didIteratorError = false;
	          var _iteratorError = undefined;

	          try {
	            for (var _iterator = Object.keys(children)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	              var item = _step.value;

	              var name = item;
	              var _plugin = children[name];
	              if (typeof _plugin === 'function') {
	                var c = this._registerPlugin(name, _plugin, this.config[name]);
	                this._children.push(c);
	              } else if ((typeof _plugin === 'undefined' ? 'undefined' : _typeof$1(_plugin)) === 'object' && typeof _plugin.plugin === 'function') {
	                var config = _plugin.options ? BasePlugin.Util.deepCopy(this.config[name] || {}, _plugin.options) : this.config[name] || {};
	                var _c = this._registerPlugin(name, _plugin.plugin, config);
	                this._children.push(_c);
	              }
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
	        }
	      }
	    }
	  }, {
	    key: 'plugins',
	    value: function plugins() {
	      return this._children;
	    }
	  }, {
	    key: 'children',
	    value: function children() {
	      return {};
	    }
	  }, {
	    key: '_registerPlugin',
	    value: function _registerPlugin(name, item, options) {
	      var opts = (typeof options === 'undefined' ? 'undefined' : _typeof$1(options)) === 'object' ? options : {};
	      opts.root = options.root || this.el;
	      opts.pluginName = name;
	      return pluginsManager.register(this.player, item, opts);
	    }
	  }, {
	    key: 'registerIcons',
	    value: function registerIcons() {
	      return {};
	    }
	  }, {
	    key: 'registerLangauageTexts',
	    value: function registerLangauageTexts() {
	      return {};
	    }
	  }, {
	    key: 'getPlugin',
	    value: function getPlugin(name) {
	      return pluginsManager.findPlugin(this.player, name);
	    }
	  }, {
	    key: 'find',
	    value: function find(qs) {
	      return this.el.querySelector(qs);
	    }
	  }, {
	    key: 'bind',
	    value: function bind(querySelector, eventType, callback) {
	      var _this2 = this;

	      // if no querySelector passed to the method
	      if (arguments.length < 3 && typeof eventType === 'function') {
	        if (Array.isArray(querySelector)) {
	          querySelector.forEach(function (item) {
	            _this2.bindEL(item, eventType);
	          });
	        } else {
	          this.bindEL(querySelector, eventType);
	        }
	      } else if (arguments.length === 3 && typeof callback === 'function') {
	        if (Array.isArray(eventType)) {
	          eventType.forEach(function (item) {
	            bind$1(_this2.el, querySelector, item, callback, false);
	          });
	        } else {
	          bind$1(this.el, querySelector, eventType, callback, false);
	        }
	      }
	    }
	  }, {
	    key: 'unbind',
	    value: function unbind(querySelector, eventType, callback) {
	      // if no querySelector passed to the method
	      if (arguments.length < 3 && typeof eventType === 'function') {
	        this.unbindEL(querySelector, eventType);
	      } else if (typeof callback === 'function') {
	        unbind$1(this.el, querySelector, eventType, callback);
	      }
	    }
	  }, {
	    key: 'setStyle',
	    value: function setStyle(name, value) {
	      if (typeof name === 'string') {
	        this.style[name] = value;
	        return this.el.style[name] = value;
	      } else if ((typeof name === 'undefined' ? 'undefined' : _typeof$1(name)) === 'object') {
	        var obj = name;
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;

	        try {
	          for (var _iterator2 = Object.keys(obj)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var item = _step2.value;

	            this.el.style[item] = obj[item];
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
	      }
	    }
	  }, {
	    key: 'setAttr',
	    value: function setAttr(name, value) {
	      if (typeof name === 'string') {
	        return this.el.setAttribute(name, value);
	      } else if ((typeof name === 'undefined' ? 'undefined' : _typeof$1(name)) === 'object') {
	        var obj = name;
	        var _iteratorNormalCompletion3 = true;
	        var _didIteratorError3 = false;
	        var _iteratorError3 = undefined;

	        try {
	          for (var _iterator3 = Object.keys(obj)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	            var item = _step3.value;

	            this.el.setAttribute(item, obj[item]);
	          }
	        } catch (err) {
	          _didIteratorError3 = true;
	          _iteratorError3 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion3 && _iterator3.return) {
	              _iterator3.return();
	            }
	          } finally {
	            if (_didIteratorError3) {
	              throw _iteratorError3;
	            }
	          }
	        }
	      }
	    }
	  }, {
	    key: 'setHtml',
	    value: function setHtml(htmlStr, callback) {
	      this.el.innerHtml = htmlStr;
	      if (typeof callback === 'function') {
	        callback();
	      }
	    }
	  }, {
	    key: 'bindEL',
	    value: function bindEL(event, eventHandle) {
	      var isBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	      if ('on' + event in this.el && typeof eventHandle === 'function') {
	        this.el.addEventListener(event, eventHandle, isBubble);
	      }
	    }
	  }, {
	    key: 'unbindEL',
	    value: function unbindEL(event, eventHandle) {
	      var isBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	      if ('on' + event in this.el && typeof eventHandle === 'function') {
	        this.el.removeEventListener(event, eventHandle, isBubble);
	      }
	    }
	  }, {
	    key: 'show',
	    value: function show(value) {
	      this.el.style.display = value !== undefined ? value : 'block';
	      var cs = window.getComputedStyle(this.el, null);
	      var cssDisplayValue = cs.getPropertyValue('display');
	      if (cssDisplayValue === 'none') {
	        return this.el.style.display = 'block';
	      }
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      this.el.style.display = 'none';
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return '';
	    }
	  }, {
	    key: '_destroy',
	    value: function _destroy() {
	      this.offAll();
	      if (BasePlugin.Util.checkIsFunction(this.destroy)) {
	        this.destroy();
	      }
	      if (this.el) {
	        if (this.el.hasOwnProperty('remove')) {
	          this.el.remove();
	        } else if (this.el.parentNode) {
	          this.el.parentNode.removeChild(this.el);
	        }
	      }
	    }
	  }]);

	  return Plugin;
	}(BasePlugin);


	Plugin.Util = BasePlugin.Util;
	Plugin.Sniffer = BasePlugin.Sniffer;
	Plugin.Errors = BasePlugin.Errors;
	Plugin.Event = BasePlugin.Event;

	var STATE_CLASS = {
	  DEFAULT: 'xgplayer',
	  DEFAULT_SKIN: 'xgplayer-skin-default',
	  ENTER: 'xgplayer-is-enter',
	  PAUSED: 'xgplayer-pause',
	  PLAYING: 'xgplayer-playing',
	  ENDED: 'xgplayer-ended',
	  CANPLAY: 'xgplayer-canplay',
	  LOADING: 'xgplayer-isloading',
	  ERROR: 'xgplayer-error',
	  REPLAY: 'xgplayer-replay',
	  NO_START: 'xgplayer-nostart',
	  ACTIVE: 'xgplayer-inactive',
	  FULLSCREEN: 'xgplayer-is-fullscreen',
	  CSS_FULLSCREEN: 'xgplayer-is-cssfullscreen',
	  NO_CONTROLS: 'no-controls',
	  AUTOPLAY: 'xgplayer-is-autoplay',
	  PC: 'xgplayer-pc',
	  MOBILE: 'xgplayer-mobile'
	};

	var ReplayIcon = "<svg class=\"xgplayer-replay-svg\" xmlns=\"http://www.w3.org/2000/svg\" width=\"78\" height=\"78\" viewbox=\"0 0 78 78\">\n  <path d=\"M8.22708362,13.8757234 L11.2677371,12.6472196 C11.7798067,12.4403301 12.3626381,12.6877273 12.5695276,13.1997969 L12.9441342,14.1269807 C13.1510237,14.6390502 12.9036264,15.2218816 12.3915569,15.4287712 L6.8284538,17.6764107 L5.90126995,18.0510173 C5.38920044,18.2579068 4.80636901,18.0105096 4.5994795,17.49844 L1.97723335,11.0081531 C1.77034384,10.4960836 2.0177411,9.91325213 2.52981061,9.70636262 L3.45699446,9.33175602 C3.96906396,9.12486652 4.5518954,9.37226378 4.75878491,9.88433329 L5.67885163,12.1615783 C7.99551726,6.6766934 13.3983951,3 19.5,3 C27.7842712,3 34.5,9.71572875 34.5,18 C34.5,26.2842712 27.7842712,33 19.5,33 C15.4573596,33 11.6658607,31.3912946 8.87004692,28.5831991 C8.28554571,27.9961303 8.28762719,27.0463851 8.87469603,26.4618839 C9.46176488,25.8773827 10.4115101,25.8794641 10.9960113,26.466533 C13.2344327,28.7147875 16.263503,30 19.5,30 C26.127417,30 31.5,24.627417 31.5,18 C31.5,11.372583 26.127417,6 19.5,6 C14.4183772,6 9.94214483,9.18783811 8.22708362,13.8757234 Z\"></path>\n</svg>\n";

	function styleInject(css, ref) {
	  if (ref === void 0) ref = {};
	  var insertAt = ref.insertAt;

	  if (!css || typeof document === 'undefined') {
	    return;
	  }

	  var head = document.head || document.getElementsByTagName('head')[0];
	  var style = document.createElement('style');
	  style.type = 'text/css';

	  if (insertAt === 'top') {
	    if (head.firstChild) {
	      head.insertBefore(style, head.firstChild);
	    } else {
	      head.appendChild(style);
	    }
	  } else {
	    head.appendChild(style);
	  }

	  if (style.styleSheet) {
	    style.styleSheet.cssText = css;
	  } else {
	    style.appendChild(document.createTextNode(css));
	  }
	}

	var css = ".xgplayer-replay {\n  display: none; }\n\n.xgplayer .xgplayer-replay {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 105;\n  display: none;\n  -webkit-justify-content: center;\n     -moz-box-pack: center;\n          justify-content: center;\n  -webkit-align-items: center;\n     -moz-box-align: center;\n          align-items: center;\n  background: rgba(0, 0, 0, .54);\n  -webkit-flex-direction: column;\n     -moz-box-orient: vertical;\n     -moz-box-direction: normal;\n          flex-direction: column; }\n  .xgplayer .xgplayer-replay svg {\n    background: rgba(0, 0, 0, .58);\n    border-radius: 100%;\n    cursor: pointer; }\n    .xgplayer .xgplayer-replay svg path {\n      -webkit-transform: translate(20px, 21px);\n          -ms-transform: translate(20px, 21px);\n              transform: translate(20px, 21px);\n      fill: #ddd; }\n    .xgplayer .xgplayer-replay svg:hover {\n      background: rgba(0, 0, 0, .38); }\n      .xgplayer .xgplayer-replay svg:hover path {\n        fill: #fff; }\n  .xgplayer .xgplayer-replay .xgplayer-replay-txt {\n    display: inline-block;\n    font-family: PingFangSC-Regular;\n    font-size: 14px;\n    color: #fff;\n    line-height: 34px; }\n\n.xgplayer.xgplayer-ended .xgplayer-controls {\n  display: none; }\n\n.xgplayer.xgplayer-ended .xgplayer-replay {\n  display: -webkit-flex;\n  display: -moz-box;\n  display: flex; }\n";
	styleInject(css);

	var _createClass$3 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Replay = function (_Plugin) {
	  _inherits$1(Replay, _Plugin);

	  function Replay() {
	    _classCallCheck$4(this, Replay);

	    return _possibleConstructorReturn$1(this, (Replay.__proto__ || Object.getPrototypeOf(Replay)).apply(this, arguments));
	  }

	  _createClass$3(Replay, [{
	    key: 'registerIcons',
	    value: function registerIcons() {
	      return {
	        'replay': ReplayIcon
	      };
	    }

	    // 扩展语言

	  }, {
	    key: 'registerLangauageTexts',
	    value: function registerLangauageTexts() {
	      return {
	        'replay': {
	          jp: '日文text',
	          en: 'rePlay',
	          zh: '重播'
	        }
	      };
	    }
	  }, {
	    key: 'afterCreate',
	    value: function afterCreate() {
	      var _this2 = this;

	      this.bind('svg', 'click', function (e) {
	        e.preventDefault();
	        _this2.player.replay();
	        Plugin.Util.removeClass(_this2.player.root, 'replay');
	      });

	      this.on(Plugin.Events.ENDED, function () {
	        if (!_this2.playerConfig.loop) {
	          Plugin.Util.addClass(_this2.player.root, 'replay');
	        }
	        var path = _this2.el.querySelector('path');
	        if (path) {
	          var transform = window.getComputedStyle(path).getPropertyValue('transform');
	          if (typeof transform === 'string' && transform.indexOf('none') > -1) {
	            return null;
	          } else {
	            path.setAttribute('transform', transform);
	          }
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return '<xg-replay class="xgplayer-replay">\n      ' + this.icons.replay + '\n      <xg-replay-txt class="xgplayer-replay-txt">' + this.text.replay + '</xg-replay-txt>\n    </xg-replay>';
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'Replay';
	    }
	  }]);

	  return Replay;
	}(Plugin);

	var css$1 = ".xgplayer .xgplayer-poster {\n  display: none;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 100;\n  background-size: cover;\n  background-position: center center; }\n\n.xgplayer.xgplayer-nostart .xgplayer-poster {\n  display: block; }\n";
	styleInject(css$1);

	var _createClass$4 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$2(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Poster = function (_Plugin) {
	  _inherits$2(Poster, _Plugin);

	  function Poster() {
	    _classCallCheck$5(this, Poster);

	    return _possibleConstructorReturn$2(this, (Poster.__proto__ || Object.getPrototypeOf(Poster)).apply(this, arguments));
	  }

	  _createClass$4(Poster, [{
	    key: 'render',
	    value: function render() {
	      var poster = this.config.poster || this.playerConfig.poster;
	      if (!poster) {
	        return '';
	      }
	      return '<xg-poster class="xgplayer-poster" style="background-image:url(' + poster + ')">\n    </xg-poster>';
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'Poster';
	    }
	  }]);

	  return Poster;
	}(Plugin);

	var pasition = createCommonjsModule(function (module, exports) {
	/**
	 * pasition v1.0.2 By dntzhang
	 * Github: https://github.com/AlloyTeam/pasition
	 * MIT Licensed.
	 */

	(function (global, factory) {
	   module.exports = factory() ;
	}(commonjsGlobal, (function () {
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

	//https://github.com/colinmeinke/svg-arc-to-cubic-bezier

	var TAU = Math.PI * 2;

	var mapToEllipse = function mapToEllipse(_ref, rx, ry, cosphi, sinphi, centerx, centery) {
	    var x = _ref.x,
	        y = _ref.y;

	    x *= rx;
	    y *= ry;

	    var xp = cosphi * x - sinphi * y;
	    var yp = sinphi * x + cosphi * y;

	    return {
	        x: xp + centerx,
	        y: yp + centery
	    };
	};

	var approxUnitArc = function approxUnitArc(ang1, ang2) {
	    var a = 4 / 3 * Math.tan(ang2 / 4);

	    var x1 = Math.cos(ang1);
	    var y1 = Math.sin(ang1);
	    var x2 = Math.cos(ang1 + ang2);
	    var y2 = Math.sin(ang1 + ang2);

	    return [{
	        x: x1 - y1 * a,
	        y: y1 + x1 * a
	    }, {
	        x: x2 + y2 * a,
	        y: y2 - x2 * a
	    }, {
	        x: x2,
	        y: y2
	    }];
	};

	var vectorAngle = function vectorAngle(ux, uy, vx, vy) {
	    var sign = ux * vy - uy * vx < 0 ? -1 : 1;
	    var umag = Math.sqrt(ux * ux + uy * uy);
	    var vmag = Math.sqrt(ux * ux + uy * uy);
	    var dot = ux * vx + uy * vy;

	    var div = dot / (umag * vmag);

	    if (div > 1) {
	        div = 1;
	    }

	    if (div < -1) {
	        div = -1;
	    }

	    return sign * Math.acos(div);
	};

	var getArcCenter = function getArcCenter(px, py, cx, cy, rx, ry, largeArcFlag, sweepFlag, sinphi, cosphi, pxp, pyp) {
	    var rxsq = Math.pow(rx, 2);
	    var rysq = Math.pow(ry, 2);
	    var pxpsq = Math.pow(pxp, 2);
	    var pypsq = Math.pow(pyp, 2);

	    var radicant = rxsq * rysq - rxsq * pypsq - rysq * pxpsq;

	    if (radicant < 0) {
	        radicant = 0;
	    }

	    radicant /= rxsq * pypsq + rysq * pxpsq;
	    radicant = Math.sqrt(radicant) * (largeArcFlag === sweepFlag ? -1 : 1);

	    var centerxp = radicant * rx / ry * pyp;
	    var centeryp = radicant * -ry / rx * pxp;

	    var centerx = cosphi * centerxp - sinphi * centeryp + (px + cx) / 2;
	    var centery = sinphi * centerxp + cosphi * centeryp + (py + cy) / 2;

	    var vx1 = (pxp - centerxp) / rx;
	    var vy1 = (pyp - centeryp) / ry;
	    var vx2 = (-pxp - centerxp) / rx;
	    var vy2 = (-pyp - centeryp) / ry;

	    var ang1 = vectorAngle(1, 0, vx1, vy1);
	    var ang2 = vectorAngle(vx1, vy1, vx2, vy2);

	    if (sweepFlag === 0 && ang2 > 0) {
	        ang2 -= TAU;
	    }

	    if (sweepFlag === 1 && ang2 < 0) {
	        ang2 += TAU;
	    }

	    return [centerx, centery, ang1, ang2];
	};

	var arcToBezier = function arcToBezier(_ref2) {
	    var px = _ref2.px,
	        py = _ref2.py,
	        cx = _ref2.cx,
	        cy = _ref2.cy,
	        rx = _ref2.rx,
	        ry = _ref2.ry,
	        _ref2$xAxisRotation = _ref2.xAxisRotation,
	        xAxisRotation = _ref2$xAxisRotation === undefined ? 0 : _ref2$xAxisRotation,
	        _ref2$largeArcFlag = _ref2.largeArcFlag,
	        largeArcFlag = _ref2$largeArcFlag === undefined ? 0 : _ref2$largeArcFlag,
	        _ref2$sweepFlag = _ref2.sweepFlag,
	        sweepFlag = _ref2$sweepFlag === undefined ? 0 : _ref2$sweepFlag;

	    var curves = [];

	    if (rx === 0 || ry === 0) {
	        return [];
	    }

	    var sinphi = Math.sin(xAxisRotation * TAU / 360);
	    var cosphi = Math.cos(xAxisRotation * TAU / 360);

	    var pxp = cosphi * (px - cx) / 2 + sinphi * (py - cy) / 2;
	    var pyp = -sinphi * (px - cx) / 2 + cosphi * (py - cy) / 2;

	    if (pxp === 0 && pyp === 0) {
	        return [];
	    }

	    rx = Math.abs(rx);
	    ry = Math.abs(ry);

	    var lambda = Math.pow(pxp, 2) / Math.pow(rx, 2) + Math.pow(pyp, 2) / Math.pow(ry, 2);

	    if (lambda > 1) {
	        rx *= Math.sqrt(lambda);
	        ry *= Math.sqrt(lambda);
	    }

	    var _getArcCenter = getArcCenter(px, py, cx, cy, rx, ry, largeArcFlag, sweepFlag, sinphi, cosphi, pxp, pyp),
	        _getArcCenter2 = slicedToArray(_getArcCenter, 4),
	        centerx = _getArcCenter2[0],
	        centery = _getArcCenter2[1],
	        ang1 = _getArcCenter2[2],
	        ang2 = _getArcCenter2[3];

	    var segments = Math.max(Math.ceil(Math.abs(ang2) / (TAU / 4)), 1);

	    ang2 /= segments;

	    for (var i = 0; i < segments; i++) {
	        curves.push(approxUnitArc(ang1, ang2));
	        ang1 += ang2;
	    }

	    return curves.map(function (curve) {
	        var _mapToEllipse = mapToEllipse(curve[0], rx, ry, cosphi, sinphi, centerx, centery),
	            x1 = _mapToEllipse.x,
	            y1 = _mapToEllipse.y;

	        var _mapToEllipse2 = mapToEllipse(curve[1], rx, ry, cosphi, sinphi, centerx, centery),
	            x2 = _mapToEllipse2.x,
	            y2 = _mapToEllipse2.y;

	        var _mapToEllipse3 = mapToEllipse(curve[2], rx, ry, cosphi, sinphi, centerx, centery),
	            x = _mapToEllipse3.x,
	            y = _mapToEllipse3.y;

	        return { x1: x1, y1: y1, x2: x2, y2: y2, x: x, y: y };
	    });
	};

	//https://github.com/jkroso/parse-svg-path/blob/master/index.js
	/**
	 * expected argument lengths
	 * @type {Object}
	 */

	var length = { a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0

	    /**
	     * segment pattern
	     * @type {RegExp}
	     */

	};var segment = /([astvzqmhlc])([^astvzqmhlc]*)/ig;

	/**
	 * parse an svg path data string. Generates an Array
	 * of commands where each command is an Array of the
	 * form `[command, arg1, arg2, ...]`
	 *
	 * @param {String} path
	 * @return {Array}
	 */

	function parse(path) {
	    var data = [];
	    path.replace(segment, function (_, command, args) {
	        var type = command.toLowerCase();
	        args = parseValues(args);

	        // overloaded moveTo
	        if (type == 'm' && args.length > 2) {
	            data.push([command].concat(args.splice(0, 2)));
	            type = 'l';
	            command = command == 'm' ? 'l' : 'L';
	        }

	        while (true) {
	            if (args.length == length[type]) {
	                args.unshift(command);
	                return data.push(args);
	            }
	            if (args.length < length[type]) throw new Error('malformed path data');
	            data.push([command].concat(args.splice(0, length[type])));
	        }
	    });
	    return data;
	}

	var number = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/ig;

	function parseValues(args) {
	    var numbers = args.match(number);
	    return numbers ? numbers.map(Number) : [];
	}

	function shapeBox(shape) {
	    var minX = shape[0][0],
	        minY = shape[0][1],
	        maxX = minX,
	        maxY = minY;
	    shape.forEach(function (curve) {
	        var x1 = curve[0],
	            x2 = curve[2],
	            x3 = curve[4],
	            x4 = curve[6],
	            y1 = curve[1],
	            y2 = curve[3],
	            y3 = curve[5],
	            y4 = curve[7];

	        minX = Math.min(minX, x1, x2, x3, x4);
	        minY = Math.min(minY, y1, y2, y3, y4);
	        maxX = Math.max(maxX, x1, x2, x3, x4);
	        maxY = Math.max(maxY, y1, y2, y3, y4);
	    });

	    return [minX, minY, maxX, maxY];
	}

	function boxDistance(boxA, boxB) {
	    return Math.sqrt(Math.pow(boxA[0] - boxB[0], 2) + Math.pow(boxA[1] - boxB[1], 2)) + Math.sqrt(Math.pow(boxA[2] - boxB[2], 2) + Math.pow(boxA[3] - boxB[3], 2));
	}

	function curveDistance(curveA, curveB) {
	    var x1 = curveA[0],
	        x2 = curveA[2],
	        x3 = curveA[4],
	        x4 = curveA[6],
	        y1 = curveA[1],
	        y2 = curveA[3],
	        y3 = curveA[5],
	        y4 = curveA[7],
	        xb1 = curveB[0],
	        xb2 = curveB[2],
	        xb3 = curveB[4],
	        xb4 = curveB[6],
	        yb1 = curveB[1],
	        yb2 = curveB[3],
	        yb3 = curveB[5],
	        yb4 = curveB[7];

	    return Math.sqrt(Math.pow(xb1 - x1, 2) + Math.pow(yb1 - y1, 2)) + Math.sqrt(Math.pow(xb2 - x2, 2) + Math.pow(yb2 - y2, 2)) + Math.sqrt(Math.pow(xb3 - x3, 2) + Math.pow(yb3 - y3, 2)) + Math.sqrt(Math.pow(xb4 - x4, 2) + Math.pow(yb4 - y4, 2));
	}

	function sortCurves(curvesA, curvesB) {

	    var arrList = permuteCurveNum(curvesA.length);

	    var list = [];
	    arrList.forEach(function (arr) {
	        var distance = 0;
	        var i = 0;
	        arr.forEach(function (index) {
	            distance += curveDistance(curvesA[index], curvesB[i++]);
	        });
	        list.push({ index: arr, distance: distance });
	    });

	    list.sort(function (a, b) {
	        return a.distance - b.distance;
	    });

	    var result = [];

	    list[0].index.forEach(function (index) {
	        result.push(curvesA[index]);
	    });

	    return result;
	}

	function sort(pathA, pathB) {

	    var arrList = permuteNum(pathA.length);

	    var list = [];
	    arrList.forEach(function (arr) {
	        var distance = 0;
	        arr.forEach(function (index) {
	            distance += boxDistance(shapeBox(pathA[index]), shapeBox(pathB[index]));
	        });
	        list.push({ index: arr, distance: distance });
	    });

	    list.sort(function (a, b) {
	        return a.distance - b.distance;
	    });

	    var result = [];

	    list[0].index.forEach(function (index) {
	        result.push(pathA[index]);
	    });

	    return result;
	}

	function permuteCurveNum(num) {
	    var arr = [];

	    for (var i = 0; i < num; i++) {
	        var indexArr = [];
	        for (var j = 0; j < num; j++) {
	            var index = j + i;
	            if (index > num - 1) index -= num;
	            indexArr[index] = j;
	        }

	        arr.push(indexArr);
	    }

	    return arr;
	}

	function permuteNum(num) {
	    var arr = [];
	    for (var i = 0; i < num; i++) {
	        arr.push(i);
	    }

	    return permute(arr);
	}

	function permute(input) {
	    var permArr = [],
	        usedChars = [];
	    function main(input) {
	        var i, ch;
	        for (i = 0; i < input.length; i++) {
	            ch = input.splice(i, 1)[0];
	            usedChars.push(ch);
	            if (input.length == 0) {
	                permArr.push(usedChars.slice());
	            }
	            main(input);
	            input.splice(i, 0, ch);
	            usedChars.pop();
	        }
	        return permArr;
	    }
	    return main(input);
	}

	var pasition = {};
	pasition.parser = parse;

	pasition.lerpCurve = function (pathA, pathB, t) {

	    return pasition.lerpPoints(pathA[0], pathA[1], pathB[0], pathB[1], t).concat(pasition.lerpPoints(pathA[2], pathA[3], pathB[2], pathB[3], t)).concat(pasition.lerpPoints(pathA[4], pathA[5], pathB[4], pathB[5], t)).concat(pasition.lerpPoints(pathA[6], pathA[7], pathB[6], pathB[7], t));
	};

	pasition.lerpPoints = function (x1, y1, x2, y2, t) {
	    return [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t];
	};

	pasition.q2b = function (x1, y1, x2, y2, x3, y3) {
	    return [x1, y1, (x1 + 2 * x2) / 3, (y1 + 2 * y2) / 3, (x3 + 2 * x2) / 3, (y3 + 2 * y2) / 3, x3, y3];
	};

	pasition.path2shapes = function (path) {
	    //https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths
	    //M = moveto
	    //L = lineto
	    //H = horizontal lineto
	    //V = vertical lineto
	    //C = curveto
	    //S = smooth curveto
	    //Q = quadratic Belzier curve
	    //T = smooth quadratic Belzier curveto
	    //A = elliptical Arc
	    //Z = closepath
	    //以上所有命令均允许小写字母。大写表示绝对定位，小写表示相对定位(从上一个点开始)。
	    var cmds = pasition.parser(path),
	        preX = 0,
	        preY = 0,
	        j = 0,
	        len = cmds.length,
	        shapes = [],
	        current = null,
	        closeX = void 0,
	        closeY = void 0,
	        preCX = void 0,
	        preCY = void 0,
	        sLen = void 0,
	        curves = void 0,
	        lastCurve = void 0;

	    for (; j < len; j++) {
	        var item = cmds[j];
	        var action = item[0];
	        var preItem = cmds[j - 1];

	        switch (action) {
	            case 'm':
	                sLen = shapes.length;
	                shapes[sLen] = [];
	                current = shapes[sLen];
	                preX = preX + item[1];
	                preY = preY + item[2];
	                break;
	            case 'M':

	                sLen = shapes.length;
	                shapes[sLen] = [];
	                current = shapes[sLen];
	                preX = item[1];
	                preY = item[2];
	                break;

	            case 'l':
	                current.push([preX, preY, preX, preY, preX, preY, preX + item[1], preY + item[2]]);
	                preX += item[1];
	                preY += item[2];
	                break;

	            case 'L':

	                current.push([preX, preY, item[1], item[2], item[1], item[2], item[1], item[2]]);
	                preX = item[1];
	                preY = item[2];

	                break;

	            case 'h':

	                current.push([preX, preY, preX, preY, preX, preY, preX + item[1], preY]);
	                preX += item[1];
	                break;

	            case 'H':
	                current.push([preX, preY, item[1], preY, item[1], preY, item[1], preY]);
	                preX = item[1];
	                break;

	            case 'v':
	                current.push([preX, preY, preX, preY, preX, preY, preX, preY + item[1]]);
	                preY += item[1];
	                break;

	            case 'V':
	                current.push([preX, preY, preX, item[1], preX, item[1], preX, item[1]]);
	                preY = item[1];
	                break;

	            case 'C':

	                current.push([preX, preY, item[1], item[2], item[3], item[4], item[5], item[6]]);
	                preX = item[5];
	                preY = item[6];
	                break;
	            case 'S':
	                if (preItem[0] === 'C' || preItem[0] === 'c') {
	                    current.push([preX, preY, preX + preItem[5] - preItem[3], preY + preItem[6] - preItem[4], item[1], item[2], item[3], item[4]]);
	                } else if (preItem[0] === 'S' || preItem[0] === 's') {
	                    current.push([preX, preY, preX + preItem[3] - preItem[1], preY + preItem[4] - preItem[2], item[1], item[2], item[3], item[4]]);
	                }
	                preX = item[3];
	                preY = item[4];
	                break;

	            case 'c':
	                current.push([preX, preY, preX + item[1], preY + item[2], preX + item[3], preY + item[4], preX + item[5], preY + item[6]]);
	                preX = preX + item[5];
	                preY = preY + item[6];
	                break;
	            case 's':
	                if (preItem[0] === 'C' || preItem[0] === 'c') {

	                    current.push([preX, preY, preX + preItem[5] - preItem[3], preY + preItem[6] - preItem[4], preX + item[1], preY + item[2], preX + item[3], preY + item[4]]);
	                } else if (preItem[0] === 'S' || preItem[0] === 's') {
	                    current.push([preX, preY, preX + preItem[3] - preItem[1], preY + preItem[4] - preItem[2], preX + item[1], preY + item[2], preX + item[3], preY + item[4]]);
	                }

	                preX = preX + item[3];
	                preY = preY + item[4];

	                break;
	            case 'a':
	                curves = arcToBezier({
	                    rx: item[1],
	                    ry: item[2],
	                    px: preX,
	                    py: preY,
	                    xAxisRotation: item[3],
	                    largeArcFlag: item[4],
	                    sweepFlag: item[5],
	                    cx: preX + item[6],
	                    cy: preY + item[7]
	                });
	                lastCurve = curves[curves.length - 1];

	                curves.forEach(function (curve, index) {
	                    if (index === 0) {
	                        current.push([preX, preY, curve.x1, curve.y1, curve.x2, curve.y2, curve.x, curve.y]);
	                    } else {
	                        current.push([curves[index - 1].x, curves[index - 1].y, curve.x1, curve.y1, curve.x2, curve.y2, curve.x, curve.y]);
	                    }
	                });

	                preX = lastCurve.x;
	                preY = lastCurve.y;

	                break;

	            case 'A':

	                curves = arcToBezier({
	                    rx: item[1],
	                    ry: item[2],
	                    px: preX,
	                    py: preY,
	                    xAxisRotation: item[3],
	                    largeArcFlag: item[4],
	                    sweepFlag: item[5],
	                    cx: item[6],
	                    cy: item[7]
	                });
	                lastCurve = curves[curves.length - 1];

	                curves.forEach(function (curve, index) {
	                    if (index === 0) {
	                        current.push([preX, preY, curve.x1, curve.y1, curve.x2, curve.y2, curve.x, curve.y]);
	                    } else {
	                        current.push([curves[index - 1].x, curves[index - 1].y, curve.x1, curve.y1, curve.x2, curve.y2, curve.x, curve.y]);
	                    }
	                });

	                preX = lastCurve.x;
	                preY = lastCurve.y;

	                break;
	            case 'Q':
	                current.push(pasition.q2b(preX, preY, item[1], item[2], item[3], item[4]));
	                preX = item[3];
	                preY = item[4];

	                break;
	            case 'q':
	                current.push(pasition.q2b(preX, preY, preX + item[1], preY + item[2], item[3] + preX, item[4] + preY));
	                preX += item[3];
	                preY += item[4];
	                break;

	            case 'T':

	                if (preItem[0] === 'Q' || preItem[0] === 'q') {
	                    preCX = preX + preItem[3] - preItem[1];
	                    preCY = preY + preItem[4] - preItem[2];
	                    current.push(pasition.q2b(preX, preY, preCX, preCY, item[1], item[2]));
	                } else if (preItem[0] === 'T' || preItem[0] === 't') {
	                    current.push(pasition.q2b(preX, preY, preX + preX - preCX, preY + preY - preCY, item[1], item[2]));
	                    preCX = preX + preX - preCX;
	                    preCY = preY + preY - preCY;
	                }

	                preX = item[1];
	                preY = item[2];
	                break;

	            case 't':
	                if (preItem[0] === 'Q' || preItem[0] === 'q') {
	                    preCX = preX + preItem[3] - preItem[1];
	                    preCY = preY + preItem[4] - preItem[2];
	                    current.push(pasition.q2b(preX, preY, preCX, preCY, preX + item[1], preY + item[2]));
	                } else if (preItem[0] === 'T' || preItem[0] === 't') {
	                    current.push(pasition.q2b(preX, preY, preX + preX - preCX, preY + preY - preCY, preX + item[1], preY + item[2]));
	                    preCX = preX + preX - preCX;
	                    preCY = preY + preY - preCY;
	                }

	                preX += item[1];
	                preY += item[2];
	                break;

	            case 'Z':
	                closeX = current[0][0];
	                closeY = current[0][1];
	                current.push([preX, preY, closeX, closeY, closeX, closeY, closeX, closeY]);
	                break;
	            case 'z':
	                closeX = current[0][0];
	                closeY = current[0][1];
	                current.push([preX, preY, closeX, closeY, closeX, closeY, closeX, closeY]);
	                break;
	        }
	    }

	    return shapes;
	};

	pasition._upCurves = function (curves, count) {
	    var i = 0,
	        index = 0,
	        len = curves.length;
	    for (; i < count; i++) {
	        curves.push(curves[index].slice(0));
	        index++;
	        if (index > len - 1) {
	            index -= len;
	        }
	    }
	};

	function split(x1, y1, x2, y2, x3, y3, x4, y4, t) {
	    return {
	        left: _split(x1, y1, x2, y2, x3, y3, x4, y4, t),
	        right: _split(x4, y4, x3, y3, x2, y2, x1, y1, 1 - t, true)
	    };
	}

	function _split(x1, y1, x2, y2, x3, y3, x4, y4, t, reverse) {

	    var x12 = (x2 - x1) * t + x1;
	    var y12 = (y2 - y1) * t + y1;

	    var x23 = (x3 - x2) * t + x2;
	    var y23 = (y3 - y2) * t + y2;

	    var x34 = (x4 - x3) * t + x3;
	    var y34 = (y4 - y3) * t + y3;

	    var x123 = (x23 - x12) * t + x12;
	    var y123 = (y23 - y12) * t + y12;

	    var x234 = (x34 - x23) * t + x23;
	    var y234 = (y34 - y23) * t + y23;

	    var x1234 = (x234 - x123) * t + x123;
	    var y1234 = (y234 - y123) * t + y123;

	    if (reverse) {
	        return [x1234, y1234, x123, y123, x12, y12, x1, y1];
	    }
	    return [x1, y1, x12, y12, x123, y123, x1234, y1234];
	}

	pasition._splitCurves = function (curves, count) {
	    var i = 0,
	        index = 0;

	    for (; i < count; i++) {
	        var curve = curves[index];
	        var cs = split(curve[0], curve[1], curve[2], curve[3], curve[4], curve[5], curve[6], curve[7], 0.5);
	        curves.splice(index, 1);
	        curves.splice(index, 0, cs.left, cs.right);

	        index += 2;
	        if (index >= curves.length - 1) {
	            index = 0;
	        }
	    }
	};

	function sync(shapes, count) {
	    var _loop = function _loop(i) {
	        var shape = shapes[shapes.length - 1];
	        var newShape = [];

	        shape.forEach(function (curve) {
	            newShape.push(curve.slice(0));
	        });
	        shapes.push(newShape);
	    };

	    for (var i = 0; i < count; i++) {
	        _loop();
	    }
	}

	pasition.lerp = function (pathA, pathB, t) {
	    return pasition._lerp(pasition.path2shapes(pathA), pasition.path2shapes(pathB), t);
	};

	pasition.MIM_CURVES_COUNT = 100;

	pasition._preprocessing = function (pathA, pathB) {

	    var lenA = pathA.length,
	        lenB = pathB.length,
	        clonePathA = JSON.parse(JSON.stringify(pathA)),
	        clonePathB = JSON.parse(JSON.stringify(pathB));

	    if (lenA > lenB) {
	        sync(clonePathB, lenA - lenB);
	    } else if (lenA < lenB) {
	        sync(clonePathA, lenB - lenA);
	    }

	    clonePathA = sort(clonePathA, clonePathB);

	    clonePathA.forEach(function (curves, index) {

	        var lenA = curves.length,
	            lenB = clonePathB[index].length;

	        if (lenA > lenB) {
	            if (lenA < pasition.MIM_CURVES_COUNT) {
	                pasition._splitCurves(curves, pasition.MIM_CURVES_COUNT - lenA);
	                pasition._splitCurves(clonePathB[index], pasition.MIM_CURVES_COUNT - lenB);
	            } else {
	                pasition._splitCurves(clonePathB[index], lenA - lenB);
	            }
	        } else if (lenA < lenB) {
	            if (lenB < pasition.MIM_CURVES_COUNT) {
	                pasition._splitCurves(curves, pasition.MIM_CURVES_COUNT - lenA);
	                pasition._splitCurves(clonePathB[index], pasition.MIM_CURVES_COUNT - lenB);
	            } else {
	                pasition._splitCurves(curves, lenB - lenA);
	            }
	        }
	    });

	    clonePathA.forEach(function (curves, index) {
	        clonePathA[index] = sortCurves(curves, clonePathB[index]);
	    });

	    return [clonePathA, clonePathB];
	};

	pasition._lerp = function (pathA, pathB, t) {

	    var shapes = [];
	    pathA.forEach(function (curves, index) {
	        var newCurves = [];
	        curves.forEach(function (curve, curveIndex) {
	            newCurves.push(pasition.lerpCurve(curve, pathB[index][curveIndex], t));
	        });
	        shapes.push(newCurves);
	    });
	    return shapes;
	};

	pasition.animate = function (option) {
	    var pathA = pasition.path2shapes(option.from);
	    var pathB = pasition.path2shapes(option.to);
	    var pathArr = pasition._preprocessing(pathA, pathB);

	    var beginTime = new Date(),
	        end = option.end || function () {},
	        progress = option.progress || function () {},
	        begin = option.begin || function () {},
	        easing = option.easing || function (v) {
	        return v;
	    },
	        tickId = null,
	        outShape = null,
	        time = option.time;

	    begin(pathA);

	    var tick = function tick() {
	        var dt = new Date() - beginTime;
	        if (dt >= time) {
	            outShape = pathB;
	            progress(outShape, 1);
	            end(outShape);
	            cancelAnimationFrame(tickId);
	            return;
	        }
	        var percent = easing(dt / time);
	        outShape = pasition._lerp(pathArr[0], pathArr[1], percent);
	        progress(outShape, percent);
	        tickId = requestAnimationFrame(tick);
	    };
	    tick();
	};

	return pasition;

	})));
	});

	var StartIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"70\" height=\"70\" viewBox=\"0 0 70 70\">\n<defs>\n  <path class=\"path_play\" transform=\"scale(0.04,0.04)\" d=\"M576,363L810,512L576,661zM342,214L576,363L576,661L342,810z\"></path>\n  <path class=\"path_pause\" transform=\"scale(0.04 0.04)\" d=\"M598,214h170v596h-170v-596zM256 810v-596h170v596h-170z\"></path>\n</defs>\n<path class=\"path\" transform=\"scale(0.04 0.04)\" d=\"M576,363L810,512L576,661zM342,214L576,363L576,661L342,810z\"></path>\n</svg>\n";

	var css$2 = "@-webkit-keyframes playPause {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; }\n  99% {\n    -webkit-transform: scale(1.3);\n            transform: scale(1.3);\n    opacity: 0; }\n  to {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n    opacity: 1; } }\n\n@keyframes playPause {\n  0% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 1; }\n  99% {\n    -webkit-transform: scale(1.3);\n            transform: scale(1.3);\n    opacity: 0; }\n  to {\n    -webkit-transform: scale(0);\n            transform: scale(0);\n    opacity: 1; } }\n\n.xgplayer .xgplayer-start {\n  border-radius: 50%;\n  display: none;\n  width: 70px;\n  height: 70px;\n  background: rgba(0, 0, 0, .38);\n  overflow: hidden;\n  text-align: center;\n  line-height: 70px;\n  vertical-align: middle;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  z-index: 115;\n  margin: -35px auto auto -35px;\n  cursor: pointer; }\n  .xgplayer .xgplayer-start svg {\n    fill: rgba(255, 255, 255, .7);\n    margin: 14px; }\n  .xgplayer .xgplayer-start:hover {\n    opacity: 0.85; }\n  .xgplayer .xgplayer-start.interact {\n    -webkit-animation: playPause .4s ease-out forwards;\n            animation: playPause .4s ease-out forwards; }\n";
	styleInject(css$2);

	var _createClass$5 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$6(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$3(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$3(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Util = Plugin.Util,
	    Events$1 = Plugin.Events;

	var Start = function (_Plugin) {
	  _inherits$3(Start, _Plugin);

	  function Start() {
	    _classCallCheck$6(this, Start);

	    return _possibleConstructorReturn$3(this, (Start.__proto__ || Object.getPrototypeOf(Start)).apply(this, arguments));
	  }

	  _createClass$5(Start, [{
	    key: 'afterCreate',
	    value: function afterCreate() {
	      var _this2 = this;

	      var player = this.player,
	          root = this.root,
	          playerConfig = this.playerConfig;

	      this.once(Events$1.READY, function () {
	        if (playerConfig) {
	          if (playerConfig.lang && playerConfig.lang === 'en') {
	            Util.addClass(root, 'lang-is-en');
	          } else if (playerConfig.lang === 'jp') {
	            Util.addClass(root, 'lang-is-jp');
	          }
	        }
	      });

	      if (!player.config.autoplay) {
	        this.show();
	      }

	      this.bind('click', function (e) {
	        e.preventDefault();
	        e.stopPropagation();
	        if (!player.isReady) {
	          return;
	        }
	        var paused = _this2.player.paused;
	        if (!_this2.player.hasStart) {
	          _this2.player.start();
	          _this2.player.once('complete', function () {
	            _this2.player.play();
	          });
	        } else {
	          if (!paused) {
	            _this2.player.pause();
	          } else {
	            _this2.player.play();
	          }
	        }
	      });
	      this.on([Events$1.PLAY, Events$1.PAUSE], function () {
	        // this.setInterval()
	        _this2.animate();
	      });
	      this.on(Events$1.AUTOPLAY_PREVENTED, function () {
	        _this2.show('inline-block');
	        // this.clearInterval()
	        _this2.animate(true);
	      });
	    }
	  }, {
	    key: 'registerIcons',
	    value: function registerIcons() {
	      return {
	        'start': StartIcon
	      };
	    }
	  }, {
	    key: 'animate',
	    value: function animate(isShowEnded) {
	      var _this3 = this;

	      var path = this.find('.path');
	      var pathPlay = this.find('.path_play').getAttribute('d');
	      var pathPause = this.find('.path_pause').getAttribute('d');
	      var paused = this.player.paused;
	      pasition.animate({
	        from: path.getAttribute('d'),
	        to: paused ? pathPause : pathPlay,
	        time: 400,
	        begin: function begin(shapes) {
	          _this3.show();
	          Util.addClass(_this3.el, 'interact');
	        },
	        end: function end(shapes) {
	          Util.removeClass(_this3.el, 'interact');
	          if (!_this3.player.paused) {
	            _this3.hide();
	            path.setAttribute('d', pathPause);
	          } else {
	            !_this3.config.isShowPause && !isShowEnded && _this3.hide();
	            path.setAttribute('d', pathPlay);
	          }
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return '\n    <xg-start class="xgplayer-start" >\n      ' + this.icons.start + '\n    </xg-start>';
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'startplugin';
	    }
	  }]);

	  return Start;
	}(Plugin);

	var _createClass$6 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$7(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$4(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$4(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PCPlugin = function (_BasePlugin) {
	  _inherits$4(PCPlugin, _BasePlugin);

	  function PCPlugin() {
	    _classCallCheck$7(this, PCPlugin);

	    return _possibleConstructorReturn$4(this, (PCPlugin.__proto__ || Object.getPrototypeOf(PCPlugin)).apply(this, arguments));
	  }

	  _createClass$6(PCPlugin, [{
	    key: 'afterCreate',
	    value: function afterCreate() {
	      this.onVideoClick = this.onVideoClick.bind(this);
	      this.onVideoDblClick = this.onVideoDblClick.bind(this);
	      this.onMouseEnter = this.onMouseEnter.bind(this);
	      this.onMouseLeave = this.onMouseLeave.bind(this);
	      this.onControlMouseEnter = this.onControlMouseEnter.bind(this);
	      this.onControlMouseLeave = this.onControlMouseLeave.bind(this);
	      this.onReady = this.onReady.bind(this);
	      this.onDestroy = this.onDestroy.bind(this);
	      this.initEvents();
	    }
	  }, {
	    key: 'initEvents',
	    value: function initEvents() {
	      var player = this.player;


	      player.video.addEventListener('click', this.onVideoClick, false);

	      player.video.addEventListener('dblclick', this.onVideoDblClick, false);

	      player.root.addEventListener('mouseenter', this.onMouseEnter);

	      player.root.addEventListener('mouseleave', this.onMouseLeave);

	      player.controls.addEventListener('mouseenter', this.onControlMouseEnter, false);

	      player.controls.addEventListener('mouseleave', this.onControlMouseLeave, false);
	    }
	  }, {
	    key: 'onVideoClick',
	    value: function onVideoClick(e) {
	      e.preventDefault();
	      e.stopPropagation();
	      var player = this.player;

	      var clk = 0;var timer = void 0;
	      if (!player.config.closeVideoClick) {
	        clk++;
	        if (timer) {
	          clearTimeout(timer);
	        }
	        if (clk === 1) {
	          timer = setTimeout(function () {
	            if (BasePlugin.Util.hasClass(player.root, 'xgplayer-nostart')) {
	              return false;
	            } else if (!player.ended) {
	              if (player.paused) {
	                var playPromise = player.play();
	                if (playPromise !== undefined && playPromise) {
	                  playPromise.catch(function (err) {});
	                }
	              } else {
	                player.pause();
	              }
	            }
	            clk = 0;
	          }, 200);
	        } else {
	          clk = 0;
	        }
	      }
	    }
	  }, {
	    key: 'onVideoDblClick',
	    value: function onVideoDblClick(e) {
	      e.preventDefault();
	      e.stopPropagation();
	      var player = this.player;

	      if (!player.config.closeVideoDblclick) {
	        var fullscreen = player.controls.querySelector('.xgplayer-fullscreen');
	        if (fullscreen) {
	          var clk = void 0;
	          if (document.createEvent) {
	            clk = document.createEvent('Event');
	            clk.initEvent('click', true, true);
	          } else {
	            // eslint-disable-next-line no-undef
	            clk = new Event('click');
	          }
	          fullscreen.dispatchEvent(clk);
	        }
	      }
	    }
	  }, {
	    key: 'onMouseEnter',
	    value: function onMouseEnter() {
	      var player = this.player;

	      clearTimeout(player.leavePlayerTimer);
	      player.emit('focus', player);
	    }
	  }, {
	    key: 'onMouseLeave',
	    value: function onMouseLeave() {
	      var player = this.player;

	      if (!player.config.closePlayerBlur) {
	        player.leavePlayerTimer = setTimeout(function () {
	          player.emit('blur', player);
	        }, player.config.leavePlayerTime || 1500);
	      }
	    }
	  }, {
	    key: 'onControlMouseEnter',
	    value: function onControlMouseEnter() {
	      var player = this.player;

	      if (player.userTimer) {
	        clearTimeout(player.userTimer);
	      }
	    }
	  }, {
	    key: 'onControlMouseLeave',
	    value: function onControlMouseLeave() {
	      var player = this.player;

	      if (!player.config.closeControlsBlur) {
	        player.emit('focus', player);
	      }
	    }
	  }, {
	    key: 'onReady',
	    value: function onReady() {
	      var player = this.player;

	      if (player.config.autoplay) {
	        player.start();
	      }
	    }
	  }, {
	    key: 'onDestroy',
	    value: function onDestroy() {
	      var player = this.player;

	      player.root.removeEventListener('mouseenter', this.onMouseEnter);
	      player.root.removeEventListener('mouseleave', this.onMouseLeave);
	      player.off('ready', this.onReady);
	      player.off('destroy', this.onDestroy);
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'pc';
	    }
	  }]);

	  return PCPlugin;
	}(BasePlugin);

	var _createClass$7 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get$1 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck$8(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$5(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$5(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Keyboard = function (_BasePlugin) {
	  _inherits$5(Keyboard, _BasePlugin);

	  function Keyboard() {
	    _classCallCheck$8(this, Keyboard);

	    return _possibleConstructorReturn$5(this, (Keyboard.__proto__ || Object.getPrototypeOf(Keyboard)).apply(this, arguments));
	  }

	  _createClass$7(Keyboard, [{
	    key: 'afterCreate',
	    value: function afterCreate() {
	      this.onKeydown = this.onKeydown.bind(this);
	      this.player.root.addEventListener('keydown', this.onKeydown);
	    }
	  }, {
	    key: 'onKeydown',
	    value: function onKeydown(event) {
	      var player = this.player;

	      var util = BasePlugin.Util;
	      // let player = this
	      var e = event || window.event;
	      if (e && (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 32)) {
	        player.emit('focus');
	      }
	      if (e && (e.keyCode === 40 || e.keyCode === 38)) {
	        if (player.controls) {
	          var volumeSlider = player.controls.querySelector('.xgplayer-slider');
	          if (volumeSlider) {
	            if (util.hasClass(volumeSlider, 'xgplayer-none')) {
	              util.removeClass(volumeSlider, 'xgplayer-none');
	            }
	            if (player.sliderTimer) {
	              clearTimeout(player.sliderTimer);
	            }
	            player.sliderTimer = setTimeout(function () {
	              util.addClass(volumeSlider, 'xgplayer-none');
	            }, player.config.inactive);
	          }
	        }
	        if (e && e.keyCode === 40) {
	          // 按 down
	          if (player.volume - 0.1 >= 0) {
	            player.volume = parseFloat((player.volume - 0.1).toFixed(1));
	          } else {
	            player.volume = 0;
	          }
	        } else if (e && e.keyCode === 38) {
	          // 按 up
	          if (player.volume + 0.1 <= 1) {
	            player.volume = parseFloat((player.volume + 0.1).toFixed(1));
	          } else {
	            player.volume = 1;
	          }
	        }
	      } else if (e && e.keyCode === 39) {
	        // 按 right
	        if (player.currentTime + 10 <= player.duration) {
	          player.currentTime += 10;
	        } else {
	          player.currentTime = player.duration - 1;
	        }
	      } else if (e && e.keyCode === 37) {
	        // 按 left
	        if (player.currentTime - 10 >= 0) {
	          player.currentTime -= 10;
	        } else {
	          player.currentTime = 0;
	        }
	      } else if (e && e.keyCode === 32) {
	        // 按 spacebar
	        if (player.paused) {
	          // eslint-disable-next-line handle-callback-err
	          player.play().catch(function (err) {});
	        } else {
	          player.pause();
	        }
	      }
	    }
	  }, {
	    key: '_destroy',
	    value: function _destroy() {
	      _get$1(Keyboard.prototype.__proto__ || Object.getPrototypeOf(Keyboard.prototype), '_destroy', this).call(this);
	      this.player.root.removeEventListener('keydown', this.onKeydown);
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'Keyboard';
	    }
	  }]);

	  return Keyboard;
	}(BasePlugin);

	var loadingIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewbox=\"0 0 100 100\">\n  <path d=\"M100,50A50,50,0,1,1,50,0\"></path>\n</svg>\n";

	var _createClass$8 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$9(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$6(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$6(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Loading = function (_Plugin) {
	  _inherits$6(Loading, _Plugin);

	  function Loading() {
	    _classCallCheck$9(this, Loading);

	    return _possibleConstructorReturn$6(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).apply(this, arguments));
	  }

	  _createClass$8(Loading, [{
	    key: 'registerIcons',
	    value: function registerIcons() {
	      return {
	        'loadingIcon': loadingIcon
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return '\n    <xg-loading class="xgplayer-loading">\n      ' + this.icons.loadingIcon + '\n    </xg-loading>';
	    }
	  }]);

	  return Loading;
	}(Plugin);

	function _classCallCheck$a(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DefaultPreset = function DefaultPreset() {
	  var _plugins, _plugins2;

	  _classCallCheck$a(this, DefaultPreset);

	  this.plugins = [Replay, Poster, Start, Loading];
	  // this.plugins.push({
	  //   plugin: Miniscreen,
	  //   options: {
	  //     root: 'controls'
	  //   }
	  // });
	  // this.plugins.push({
	  //   plugin: Rotate,
	  //   options: {
	  //     root: 'controls'
	  //   }
	  // })

	  switch (sniffer.device) {
	    case 'pc':
	      (_plugins = this.plugins).push.apply(_plugins, [Keyboard, PCPlugin]);
	      break;
	    default:
	      (_plugins2 = this.plugins).push.apply(_plugins2, [Keyboard, PCPlugin]);
	  }
	  this.ignores = [];
	};

	function getDefaultConfig() {
	  return {
	    id: '', // 播放器容器id
	    el: null, // 播放器容器dom
	    url: '', // 播放url
	    width: 600, // 播放器宽度,单位px
	    height: 337.5, // 播放器高度,单位px
	    fluid: false, // 是否启用流式布局
	    fitVideoSize: 'auto', // fixWidth/fixHeight/auto
	    volume: 0.6, // 默认音量
	    autoplay: false, // 是否自动播放
	    autoplayMuted: false, // 是否自动静音
	    loop: false, // 是否循环播放
	    videoInit: false, // 是否优先显示视频首帧， mobile模式下无效
	    poster: '', // 封面图地址
	    defaultPlaybackRate: 0, // 默认播放倍数
	    playbackRate: [], // 倍速调控档位，参考[0.5, 0.75, 1, 1.5, 2]
	    execBeforePluginsCall: null, // 默认插件组装前回调
	    closeVideoClick: false, // 是否通过video的click/touchend行为切换播放暂停
	    closeVideoDblclick: false, // 是否通过双击行为触发全屏切换
	    closePlayerBlur: false, // 是个否启用鼠标移动激活行为
	    leavePlayerTime: 0, // 延迟触发时间
	    closePlayVideoFocus: false, // 是否关闭play时触发focus
	    closeFocusVideoFocus: false, // 是否支持播放器移动鼠标时触发focus
	    closeControlsBlur: false, // 鼠标移出播放器控制条范围时触发focus事件
	    videoAttrbutes: {}, // video扩展属性
	    // 是否删除
	    ignores: [],
	    whitelist: [],
	    inactive: 3000,
	    lang: (document.documentElement.getAttribute('lang') || navigator.language || 'zh-cn').toLocaleLowerCase(),
	    controls: true,
	    controlsList: []
	  };
	}

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var usePreset = function usePreset(player, Preset) {
	  var _player$config$plugin, _player$config$ignore;

	  var presetInst = void 0;
	  if (Preset.preset && Preset.options) {
	    // eslint-disable-next-line new-cap
	    presetInst = new Preset.preset(Preset.options);
	  } else {
	    presetInst = new Preset();
	  }
	  var _presetInst = presetInst,
	      plugins = _presetInst.plugins,
	      ignores = _presetInst.ignores;


	  if (!player.config.plugins) {
	    player.config.plugins = [];
	  }

	  if (!player.config.ignores) {
	    player.config.ignores = [];
	  }

	  (_player$config$plugin = player.config.plugins).push.apply(_player$config$plugin, _toConsumableArray(plugins));
	  (_player$config$ignore = player.config.ignores).push.apply(_player$config$ignore, _toConsumableArray(ignores));
	};

	var css$3 = ".xgplayer .xgplayer-progress {\n  display: block;\n  position: absolute;\n  height: 20px;\n  line-height: 20px;\n  left: 12px;\n  right: 12px;\n  outline: none;\n  z-index: 35; }\n\n.xgplayer .xgplayer-progress-outer {\n  background: rgba(133, 133, 133, .3);\n  opacity: .85;\n  transition: height 0.2s ease-in, opacity 0.2s ease-out;\n  display: block;\n  height: 3px;\n  line-height: 3px;\n  margin-top: 8.5px;\n  width: 100%;\n  position: relative;\n  cursor: pointer; }\n\n.xgplayer .xgplayer-progress-cache, .xgplayer .xgplayer-progress-played {\n  display: block;\n  height: 100%;\n  line-height: 1;\n  position: absolute;\n  left: 0;\n  top: 0; }\n\n.xgplayer .xgplayer-progress-cache {\n  width: 0;\n  background: rgba(255, 255, 255, .5); }\n\n.xgplayer .xgplayer-progress-played {\n  display: block;\n  width: 0;\n  background-image: linear-gradient(-90deg, #FA1F41 0%, #E31106 100%);\n  border-radius: 0 1.5px 1.5px 0; }\n\n.xgplayer .xgplayer-progress-btn {\n  display: none;\n  position: absolute;\n  left: 0px;\n  top: -5px;\n  width: 13px;\n  height: 13px;\n  border-radius: 30px;\n  background: #FFFFFF;\n  box-shadow: 0 0 2px 0 rgba(0, 0, 0, .26);\n  left: 100%;\n  -webkit-transform: translate(-50%, 0);\n      -ms-transform: translate(-50%, 0);\n          transform: translate(-50%, 0); }\n\n.xgplayer .xgplayer-progress-point {\n  position: absolute; }\n  .xgplayer .xgplayer-progress-point.xgplayer-tips {\n    margin-left: 0;\n    top: -25px;\n    display: none;\n    z-index: 100; }\n\n.xgplayer .xgplayer-progress-dot {\n  display: inline-block;\n  position: absolute;\n  height: 3px;\n  width: 5px;\n  top: 0px;\n  background: white;\n  border-radius: 6px;\n  z-index: 16; }\n  .xgplayer .xgplayer-progress-dot .xgplayer-progress-tip {\n    position: absolute;\n    left: 0;\n    top: -40px;\n    height: auto;\n    line-height: 30px;\n    width: auto;\n    -webkit-transform: scale(0.8);\n        -ms-transform: scale(0.8);\n            transform: scale(0.8);\n    background: rgba(0, 0, 0, .3);\n    border-radius: 6px;\n    border: 1px solid rgba(0, 0, 0, .8);\n    cursor: default;\n    white-space: nowrap;\n    display: none; }\n\n.xgplayer .xgplayer-progress-dot-show .xgplayer-progress-tip {\n  display: block; }\n\n.xgplayer .xgplayer-progress-thumbnail {\n  position: absolute;\n  -moz-box-sizing: border-box;\n       box-sizing: border-box; }\n  .xgplayer .xgplayer-progress-thumbnail.xgplayer-tips {\n    margin-left: 0;\n    display: none;\n    z-index: 99; }\n\n.xgplayer .xgplayer-progress:hover .xgplayer-progress-outer, .xgplayer .xgplayer-progress:focus .xgplayer-progress-outer {\n  height: 6px;\n  margin-top: 7px; }\n\n.xgplayer .xgplayer-progress:hover .xgplayer-progress-dot, .xgplayer .xgplayer-progress:focus .xgplayer-progress-dot {\n  height: 6px; }\n\n.xgplayer .xgplayer-progress:hover .xgplayer-progress-btn, .xgplayer .xgplayer-progress:focus .xgplayer-progress-btn {\n  display: block;\n  top: -3px; }\n";
	styleInject(css$3);

	var _createClass$9 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$b(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$7(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$7(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Events$2 = Plugin.Events;
	/**
	 * 进度条组件
	 */

	var Progress = function (_Plugin) {
	  _inherits$7(Progress, _Plugin);

	  _createClass$9(Progress, null, [{
	    key: 'pluginName',
	    get: function get() {
	      return 'Progress';
	    }
	  }, {
	    key: 'defaultConfig',
	    get: function get() {
	      return {
	        progressDot: []
	      };
	    }
	  }]);

	  function Progress(args) {
	    _classCallCheck$b(this, Progress);

	    var _this = _possibleConstructorReturn$7(this, (Progress.__proto__ || Object.getPrototypeOf(Progress)).call(this, args));

	    _this.useable = false;
	    return _this;
	  }

	  _createClass$9(Progress, [{
	    key: 'changeState',
	    value: function changeState() {
	      var useable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	      this.useable = useable;
	    }
	  }, {
	    key: 'afterCreate',
	    value: function afterCreate() {
	      var _this2 = this;

	      this.playedBar = this.find('.xgplayer-progress-played');
	      this.cachedBar = this.find('.xgplayer-progress-cache');
	      this.pointTip = this.find('.xgplayer-progress-cache');
	      this.progressBtn = this.find('.xgplayer-progress-btn');
	      this.on(Events$2.TIME_UPDATE, function () {
	        _this2.onTimeupdate();
	      });
	      this.on([Events$2.BUFFER_CHANGE, Events$2.ENDED], this.onCacheUpdate);
	    }
	  }, {
	    key: 'onTimeupdate',
	    value: function onTimeupdate() {}
	  }, {
	    key: 'onCacheUpdate',
	    value: function onCacheUpdate() {}
	  }, {
	    key: 'render',
	    value: function render() {
	      return '\n      <xg-progress class="xgplayer-progress">\n        <xg-outer class="xgplayer-progress-outer">\n          <xg-cache class="xgplayer-progress-cache" style="width:0">\n          </xg-cache>\n          <xg-played class="xgplayer-progress-played" style="width:0">\n            <xg-progress-btn class="xgplayer-progress-btn"></xg-progress-btn>\n            <xg-point class="xgplayer-progress-point xgplayer-tips">01:22</xg-point>\n            <xg-thumbnail class="xgplayer-progress-thumbnail xgplayer-tips"></xg-thumbnail>\n          </xg-played>\n        </xg-outer>\n      </xg-progress>\n    ';
	    }
	  }]);

	  return Progress;
	}(Plugin);

	var PlayPauseSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\">\n  <defs>\n  <path class=\"path_play\" transform=\"scale(0.0320625 0.0320625)\" d=\"M576,363L810,512L576,661zM342,214L576,363L576,661L342,810z\"></path>\n  <path class=\"path_pause\" transform=\"scale(0.0320625 0.0320625)\" d=\"M598,214h170v596h-170v-596zM256 810v-596h170v596h-170z\"></path>\n  </defs>\n  <path class=\"path\" transform=\"scale(0.0320625 0.0320625)\" d=\"M576,363L810,512L576,661zM342,214L576,363L576,661L342,810z\"></path>\n</svg>\n";

	var css$4 = "";
	styleInject(css$4);

	var _createClass$a = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$c(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$8(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$8(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Events$3 = Plugin.Events;

	var PlayIcon = function (_Plugin) {
	  _inherits$8(PlayIcon, _Plugin);

	  function PlayIcon() {
	    _classCallCheck$c(this, PlayIcon);

	    return _possibleConstructorReturn$8(this, (PlayIcon.__proto__ || Object.getPrototypeOf(PlayIcon)).apply(this, arguments));
	  }

	  _createClass$a(PlayIcon, [{
	    key: 'afterCreate',
	    value: function afterCreate() {
	      var _this2 = this;

	      var player = this.player;

	      ['click', 'touchend'].forEach(function (event) {
	        _this2.bind(event, function (e) {
	          if (player.paused) {
	            player.play();
	          } else {
	            player.pause();
	          }
	        });
	      });

	      this.on(Events$3.PAUSE, function () {
	        _this2.find('.xg-tips').innerHTML = _this2.text.play;
	        _this2.animate(player.paused);
	      });
	      this.on(Events$3.PLAY, function () {
	        _this2.find('.xg-tips').innerHTML = _this2.text.pause;
	        _this2.animate(player.paused);
	      });
	    }

	    // 扩展语言

	  }, {
	    key: 'registerLangauageTexts',
	    value: function registerLangauageTexts() {
	      return {
	        'play': {
	          jp: 'play',
	          en: 'play',
	          zh: '播放'
	        },
	        'pause': {
	          jp: 'pause',
	          en: 'pause',
	          zh: '暂停'
	        }
	      };
	    }
	  }, {
	    key: 'registerIcons',
	    value: function registerIcons() {
	      return {
	        playIcon: PlayPauseSvg
	      };
	    }
	  }, {
	    key: 'animate',
	    value: function animate(paused) {
	      var path = this.find('.path');
	      var pathPlay = this.find('.path_play').getAttribute('d');
	      var pathPause = this.find('.path_pause').getAttribute('d');
	      !paused ? path.setAttribute('d', pathPause) : path.setAttribute('d', pathPlay);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return '<xg-icon class="xgplayer-play">\n    <div class="xgplayer-icon">\n    ' + this.icons.playIcon + '\n    </div>\n    <div class="xg-tips">' + (this.player.paused ? this.text.play : this.text.pause) + '</div>\n    </xg-icon>';
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'PlayIcon';
	    }
	  }]);

	  return PlayIcon;
	}(Plugin);

	var FullScreenChangeSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\">\n  <defs>\n  <path class=\"path_full\" transform=\"scale(0.0320625 0.0320625)\" d=\"M598 214h212v212h-84v-128h-128v-84zM726 726v-128h84v212h-212v-84h128zM214 426v-212h212v84h-128v128h-84zM298 598v128h128v84h-212v-212h84z\"></path>\n  <path class=\"path_exitfull\" transform=\"scale(0.0320625 0.0320625)\" d=\"M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z\"></path>\n  </defs>\n  <path class=\"path\" transform=\"scale(0.0320625 0.0320625)\" d=\"M598 214h212v212h-84v-128h-128v-84zM726 726v-128h84v212h-212v-84h128zM214 426v-212h212v84h-128v128h-84zM298 598v128h128v84h-212v-212h84z\"></path>\n</svg>\n";

	var css$5 = ".xgplayer .xgplayer-fullscreen .xg-tips {\n  margin-left: -80%; }\n";
	styleInject(css$5);

	var _createClass$b = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$d(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$9(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$9(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Events$4 = Plugin.Events;

	var Fullscreen = function (_Plugin) {
	  _inherits$9(Fullscreen, _Plugin);

	  function Fullscreen() {
	    _classCallCheck$d(this, Fullscreen);

	    return _possibleConstructorReturn$9(this, (Fullscreen.__proto__ || Object.getPrototypeOf(Fullscreen)).apply(this, arguments));
	  }

	  _createClass$b(Fullscreen, [{
	    key: 'afterCreate',
	    value: function afterCreate() {
	      var _this2 = this;

	      var player = this.player;

	      ['click', 'touchend'].forEach(function (event) {
	        _this2.bind(event, function () {
	          if (player.fullscreen) {
	            player.exitFullscreen();
	          } else {
	            player.getFullscreen();
	          }
	        });
	      });

	      this.on(Events$4.FULLSCREEN_CHANGE, function (isFullScreen) {
	        _this2.find('.xg-tips').innerHTML = isFullScreen ? _this2.text.exitFullscreen : _this2.text.fullscreen;
	        _this2.animate(isFullScreen);
	      });
	    }
	  }, {
	    key: 'animate',
	    value: function animate(isFullScreen) {
	      var path = this.find('.path');
	      var full = this.find('.path_full').getAttribute('d');
	      var exit = this.find('.path_exitfull').getAttribute('d');
	      isFullScreen ? path.setAttribute('d', exit) : path.setAttribute('d', full);
	    }
	  }, {
	    key: 'registerLangauageTexts',
	    value: function registerLangauageTexts() {
	      return {
	        fullscreen: {
	          jp: 'フルスクリーン',
	          en: 'Fullscreen',
	          zh: '进入全屏'
	        },
	        exitFullscreen: {
	          jp: 'フルスクリーン',
	          en: 'Exit fullscreen',
	          zh: '退出全屏'
	        }
	      };
	    }
	  }, {
	    key: 'registerIcons',
	    value: function registerIcons() {
	      return {
	        fullscreenChange: FullScreenChangeSvg
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return '<xg-icon class="xgplayer-fullscreen">\n    <div class="xgplayer-icon">\n    ' + this.icons.fullscreenChange + '\n    </div>\n    <div class="xg-tips">' + (this.player.isFullScreen ? this.text.exitFullscreen : this.text.fullscreen) + '</div>\n    </xg-icon>';
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'fullscreen';
	    }
	  }]);

	  return Fullscreen;
	}(Plugin);

	var css$6 = ".xgplayer .xgplayer-controls .xgplayer-time {\n  padding-top: 0;\n  width: auto;\n  font-family: ArialMT;\n  font-size: 13px;\n  color: #fff;\n  line-height: 40px;\n  text-align: center;\n  display: inline-block; }\n  .xgplayer .xgplayer-controls .xgplayer-time span::after {\n    content: \"/\";\n    display: inline-block;\n    padding: 0 3px; }\n  .xgplayer .xgplayer-controls .xgplayer-time em {\n    color: rgba(255, 255, 255, .5); }\n";
	styleInject(css$6);

	var _createClass$c = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$e(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$a(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$a(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	var Util$1 = Plugin.Util,
	    Events$5 = Plugin.Events;

	var TimeIcon = function (_Plugin) {
	  _inherits$a(TimeIcon, _Plugin);

	  function TimeIcon() {
	    _classCallCheck$e(this, TimeIcon);

	    return _possibleConstructorReturn$a(this, (TimeIcon.__proto__ || Object.getPrototypeOf(TimeIcon)).apply(this, arguments));
	  }

	  _createClass$c(TimeIcon, [{
	    key: 'updateTime',
	    value: function updateTime() {
	      var player = this.player;

	      var current = player.currentTime;
	      this.timeDom.innerHTML = Util$1.format(current);
	      if (player.duration !== Infinity) {
	        this.durationDom.innerHTML = Util$1.format(player.duration);
	      }
	    }
	  }, {
	    key: 'afterCreate',
	    value: function afterCreate() {
	      var _this2 = this;

	      var player = this.player;

	      this.durationDom = this.find('.duration');
	      this.timeDom = this.find('.current');
	      this.once(Events$5.READY, function () {
	        player.duration !== Infinity && _this2.show();
	      });
	      this.on(Events$5.DURATION_CHANGE, function () {
	        _this2.updateTime();
	      });
	      this.on(Events$5.TIME_UPDATE, function () {
	        _this2.updateTime();
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return '<xg-icon class="xgplayer-time" style="display:none">\n    <span class="current">00:00</span>\n    <em class="duration">00:00</em>\n    </xg-icon>';
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'TimeIcon';
	    }
	  }]);

	  return TimeIcon;
	}(Plugin);

	var volumeChange = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"28\" viewBox=\"0 0 28 28\">\n  <path transform=\"scale(0.0220625 0.0220625)\" d=\"M358.4 358.4h-204.8v307.2h204.8l256 256v-819.2l-256 256z\"></path>\n  <defs>\n  <path class=\"path_large\" transform=\"scale(0.0220625 0.0220625)\" d=\"M940.632 837.632l-72.192-72.192c65.114-64.745 105.412-154.386 105.412-253.44s-40.299-188.695-105.396-253.424l-0.016-0.016 72.192-72.192c83.639 83.197 135.401 198.37 135.401 325.632s-51.762 242.434-135.381 325.612l-0.020 0.020zM795.648 693.248l-72.704-72.704c27.756-27.789 44.921-66.162 44.921-108.544s-17.165-80.755-44.922-108.546l0.002 0.002 72.704-72.704c46.713 46.235 75.639 110.363 75.639 181.248s-28.926 135.013-75.617 181.227l-0.021 0.021z\"></path>\n  <!--muted-->\n  <path class=\"path_muted\" transform=\"scale(0.0220625 0.0220625)\" d=\"M920.4 439.808l-108.544-109.056-72.704 72.704 109.568 108.544-109.056 108.544 72.704 72.704 108.032-109.568 108.544 109.056 72.704-72.704-109.568-108.032 109.056-108.544-72.704-72.704-108.032 109.568z\"></path>\n  <!--small-->\n  <path class=\"path_small\" transform=\"scale(0.0220625 0.0220625)\" d=\"M795.648 693.248l-72.704-72.704c27.756-27.789 44.921-66.162 44.921-108.544s-17.165-80.755-44.922-108.546l0.002 0.002 72.704-72.704c46.713 46.235 75.639 110.363 75.639 181.248s-28.926 135.013-75.617 181.227l-0.021 0.021zM795.648 693.248l-72.704-72.704c27.756-27.789 44.921-66.162 44.921-108.544s-17.165-80.755-44.922-108.546l0.002 0.002 72.704-72.704c46.713 46.235 75.639 110.363 75.639 181.248s-28.926 135.013-75.617 181.227l-0.021 0.021z\"></path>\n  </defs>\n  <path class=\"path\" transform=\"scale(0.0220625 0.0220625)\" d=\"M940.632 837.632l-72.192-72.192c65.114-64.745 105.412-154.386 105.412-253.44s-40.299-188.695-105.396-253.424l-0.016-0.016 72.192-72.192c83.639 83.197 135.401 198.37 135.401 325.632s-51.762 242.434-135.381 325.612l-0.020 0.020zM795.648 693.248l-72.704-72.704c27.756-27.789 44.921-66.162 44.921-108.544s-17.165-80.755-44.922-108.546l0.002 0.002 72.704-72.704c46.713 46.235 75.639 110.363 75.639 181.248s-28.926 135.013-75.617 181.227l-0.021 0.021z\"></path>\n</svg>\n";

	var css$7 = ".xgplayer .xgplayer-volume .xgplayer-icon {\n  padding: 10px 0 0 5px; }\n\n.xgplayer .xgplayer-volume.slide-show .xgplayer-slider {\n  display: block; }\n\n.xgplayer .xgplayer-slider {\n  display: none;\n  position: absolute;\n  width: 28px;\n  height: 92px;\n  background: rgba(0, 0, 0, .54);\n  border-radius: 1px;\n  bottom: 34px;\n  outline: none; }\n  .xgplayer .xgplayer-slider:after {\n    content: \" \";\n    display: block;\n    height: 15px;\n    width: 28px;\n    position: absolute;\n    bottom: -15px;\n    left: 0;\n    z-index: 20; }\n\n.xgplayer .xgplayer-bar, .xgplayer .xgplayer-drag {\n  display: block;\n  position: absolute;\n  bottom: 6px;\n  left: 12px;\n  background: rgba(255, 255, 255, .3);\n  border-radius: 100px;\n  width: 4px;\n  height: 76px;\n  outline: none;\n  cursor: pointer; }\n\n.xgplayer .xgplayer-drag {\n  bottom: 0;\n  left: 0;\n  background: #FA1F41;\n  max-height: 76px; }\n  .xgplayer .xgplayer-drag:after {\n    content: \" \";\n    display: inline-block;\n    width: 8px;\n    height: 8px;\n    background: #fff;\n    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .26);\n    position: absolute;\n    border-radius: 50%;\n    left: -2px;\n    top: -6px; }\n\n.xgplayer.xgplayer-mobile .xgplayer-volume .xgplayer-slider {\n  display: none; }\n";
	styleInject(css$7);

	var _createClass$d = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$f(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$b(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$b(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Util$2 = Plugin.Util,
	    Events$6 = Plugin.Events;

	var VolumeIcon = function (_Plugin) {
	  _inherits$b(VolumeIcon, _Plugin);

	  function VolumeIcon() {
	    _classCallCheck$f(this, VolumeIcon);

	    return _possibleConstructorReturn$b(this, (VolumeIcon.__proto__ || Object.getPrototypeOf(VolumeIcon)).apply(this, arguments));
	  }

	  _createClass$d(VolumeIcon, [{
	    key: 'registerIcons',
	    value: function registerIcons() {
	      return {
	        volumeChange: volumeChange
	      };
	    }
	  }, {
	    key: 'afterCreate',
	    value: function afterCreate() {
	      var _this2 = this;

	      this.find('.xgplayer-icon').addEventListener('mouseenter', function () {
	        console.log('mouseenter');
	        Util$2.addClass(_this2.el, 'slide-show');
	      });
	      this.el.addEventListener('mouseleave', function (e) {
	        e.preventDefault();
	        e.stopPropagation();
	        console.log('mouseleave');
	        Util$2.removeClass(_this2.el, 'slide-show');
	      });

	      this.changeMuted = this.changeMuted.bind(this);
	      this.bind('click', this.changeMuted);

	      this.on(Events$6.VOLUME_CHANGE, this.onVolumeChange.bind(this));
	    }
	  }, {
	    key: 'changeMuted',
	    value: function changeMuted() {
	      var player = this.player;

	      player.muted = !player.muted;
	    }
	  }, {
	    key: 'changeVolume',
	    value: function changeVolume() {}
	  }, {
	    key: 'onVolumeChange',
	    value: function onVolumeChange() {
	      var _player = this.player,
	          muted = _player.muted,
	          volume = _player.volume;

	      console.log('muted: ' + muted + ' volume: ' + volume);
	      this.find('.xgplayer-drag').style.height = muted || volume === 0 ? '0px' : volume * 100 + '%';
	      this.animate(muted, volume);
	    }
	  }, {
	    key: 'animate',
	    value: function animate(muted, volume) {
	      var path = this.find('.path');
	      var pathLarge = this.find('.path_large').getAttribute('d');
	      var pathSmall = this.find('.path_small').getAttribute('d');
	      var pathMuted = this.find('.path_muted').getAttribute('d');
	      if (muted || volume === 0) {
	        path.setAttribute('d', pathMuted);
	      } else {
	        volume >= 0.5 ? path.setAttribute('d', pathLarge) : path.setAttribute('d', pathSmall);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var volume = this.player.volume;

	      return '\n    <xg-icon class="xgplayer-volume">\n      <div class="xgplayer-icon">\n      ' + this.icons.volumeChange + '\n      </div>\n      <xg-slider class="xgplayer-slider">\n        <xg-bar class="xgplayer-bar">\n          <xg-drag class="xgplayer-drag" style="height: ' + volume * 100 + '%"></xg-drag>\n        </xg-bar>\n      </xg-slider>\n    </xg-icon>';
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'VolumeIcon';
	    }
	  }]);

	  return VolumeIcon;
	}(Plugin);

	var RotateIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 40 40\" fill=\"none\">\n  <g clip-path=\"url(#clip0)\">\n    <path transform=\"scale(1.5 1.5)\" d=\"M11.6665 9.16663H4.1665C2.78579 9.16663 1.6665 10.2859 1.6665 11.6666V15.8333C1.6665 17.214 2.78579 18.3333 4.1665 18.3333H11.6665C13.0472 18.3333 14.1665 17.214 14.1665 15.8333V11.6666C14.1665 10.2859 13.0472 9.16663 11.6665 9.16663Z\" fill=\"white\"/>\n    <path transform=\"scale(1.5 1.5)\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.88148 4.06298C3.75371 4.21005 3.67667 4.40231 3.67749 4.61242C3.67847 4.87253 3.79852 5.10435 3.98581 5.25646L6.99111 8.05895C7.32771 8.37283 7.85502 8.35443 8.16891 8.01782C8.48279 7.68122 8.46437 7.15391 8.12778 6.84003L6.62061 5.43457L9.8198 5.4224C9.82848 5.42239 9.8372 5.42221 9.84591 5.4219C10.9714 5.38233 12.0885 5.6285 13.0931 6.13744C14.0976 6.64635 14.957 7.40148 15.5908 8.33234C16.2246 9.2632 16.6122 10.3394 16.7177 11.4606C16.823 12.5819 16.6427 13.7115 16.1934 14.7442C16.0098 15.1661 16.203 15.6571 16.6251 15.8408C17.0471 16.0243 17.5381 15.8311 17.7216 15.4091C18.2833 14.1183 18.5087 12.7063 18.3771 11.3047C18.2453 9.90318 17.7607 8.55792 16.9684 7.39433C16.1761 6.23073 15.1021 5.28683 13.8463 4.65065C12.5946 4.01651 11.203 3.70872 9.80072 3.75583L6.43415 3.76862L7.96326 2.12885C8.27715 1.79225 8.25872 1.26494 7.92213 0.951061C7.58553 0.63718 7.05822 0.655585 6.74433 0.99219L3.90268 4.0395C3.89545 4.04724 3.88841 4.05509 3.88154 4.06303L3.88148 4.06298Z\" fill=\"white\"/>\n  </g>\n  <defs>\n    <clipPath id=\"clip0\">\n      <rect width=\"40\" height=\"40\" fill=\"white\"/>\n    </clipPath>\n  </defs>\n</svg>\n";

	var css$8 = ".xgplayer .xgplayer-rotate .xgplayer-icon {\n  padding: 8px 0 0 5px; }\n";
	styleInject(css$8);

	var _createClass$e = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get$2 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck$g(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$c(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$c(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Rotate = function (_Plugin) {
	  _inherits$c(Rotate, _Plugin);

	  function Rotate() {
	    _classCallCheck$g(this, Rotate);

	    return _possibleConstructorReturn$c(this, (Rotate.__proto__ || Object.getPrototypeOf(Rotate)).apply(this, arguments));
	  }

	  _createClass$e(Rotate, [{
	    key: 'afterCreate',
	    value: function afterCreate() {
	      var _this2 = this;

	      this.updateRotateDeg = this.updateRotateDeg.bind(this);
	      this.rotate = this.rotate.bind(this);
	      ['click', 'touchend'].forEach(function (event) {
	        _this2.bind('.xgplayer-icon', event, _this2.rotate);
	      });
	      // this.bind('.xgplayer-icon', 'click', this.rotate)
	      // this.bind('.xgplayer-icon', 'touchend', this.rotate)
	    }
	  }, {
	    key: '_destroy',
	    value: function _destroy() {
	      var _this3 = this;

	      ['click', 'touchend'].forEach(function (event) {
	        _this3.unbind('.xgplayer-icon', event, _this3.rotate);
	      });
	      // this.unbind('.xgplayer-icon', 'click', this.rotate)
	      // this.unbind('.xgplayer-icon', 'touchend', this.rotate)
	      _get$2(Rotate.prototype.__proto__ || Object.getPrototypeOf(Rotate.prototype), '_destroy', this).call(this);
	    }
	  }, {
	    key: 'updateRotateDeg',
	    value: function updateRotateDeg() {
	      var player = this.player;
	      if (!player.rotateDeg) {
	        player.rotateDeg = 0;
	      }

	      var width = player.root.offsetWidth;
	      var height = player.root.offsetHeight;
	      var targetWidth = player.video.videoWidth;
	      var targetHeight = player.video.videoHeight;

	      if (!this.config.innerRotate) ;

	      var scale = void 0;
	      if (player.rotateDeg === 0.25 || player.rotateDeg === 0.75) {
	        if (this.config.innerRotate) {
	          if (targetWidth / targetHeight > height / width) {
	            // 旋转后纵向撑满
	            var videoWidth = 0;
	            if (targetHeight / targetWidth > height / width) {
	              // 旋转前是纵向撑满
	              videoWidth = height * targetWidth / targetHeight;
	            } else {
	              // 旋转前是横向撑满
	              videoWidth = width;
	            }
	            scale = height / videoWidth;
	          } else {
	            // 旋转后横向撑满
	            var videoHeight = 0;
	            if (targetHeight / targetWidth > height / width) {
	              // 旋转前是纵向撑满
	              videoHeight = height;
	            } else {
	              // 旋转前是横向撑满
	              videoHeight = width * targetHeight / targetWidth;
	            }
	            scale = width / videoHeight;
	          }
	        } else {
	          if (width >= height) {
	            scale = width / height;
	          } else {
	            scale = height / width;
	          }
	        }
	        scale = parseFloat(scale.toFixed(5));
	      } else {
	        scale = 1;
	      }

	      if (this.config.innerRotate) {
	        player.video.style.transformOrigin = 'center center';
	        player.video.style.transform = 'rotate(' + player.rotateDeg + 'turn) scale(' + scale + ')';
	        player.video.style.webKitTransform = 'rotate(' + player.rotateDeg + 'turn) scale(' + scale + ')';
	      } else {
	        player.root.style.transformOrigin = 'center center';
	        player.root.style.transform = 'rotate(' + player.rotateDeg + 'turn) scale(' + 1 + ')';
	        player.root.style.webKitTransform = 'rotate(' + player.rotateDeg + 'turn) scale(' + 1 + ')';
	      }
	    }
	  }, {
	    key: 'rotate',
	    value: function rotate() {
	      var clockwise = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	      var times = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

	      var player = this.player;
	      if (!player.rotateDeg) {
	        player.rotateDeg = 0;
	      }
	      var factor = clockwise ? 1 : -1;

	      player.rotateDeg = (player.rotateDeg + 1 + factor * 0.25 * times) % 1;
	      this.updateRotateDeg();

	      player.emit('rotate', player.rotateDeg * 360);
	    }
	  }, {
	    key: 'registerIcons',
	    value: function registerIcons() {
	      return {
	        'rotate': RotateIcon
	      };
	    }

	    // 扩展语言

	  }, {
	    key: 'registerLangauageTexts',
	    value: function registerLangauageTexts() {
	      return {
	        'rotate': {
	          jp: '日文text',
	          en: 'rotate',
	          zh: '旋转屏幕'
	        }
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return '\n    <xg-icon class="xgplayer-rotate">\n      <div class="xgplayer-icon">\n        ' + RotateIcon + '\n      </div>\n      <div class="xg-tips">\n      ' + this.text.rotate + '\n      </div>\n    </xg-icon>';
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'rotate';
	    }
	  }]);

	  return Rotate;
	}(Plugin);

	var css$9 = ".xgplayer .xgplayer-mini {\n  position: relative;\n  outline: none;\n  display: block; }\n  .xgplayer .xgplayer-mini .name {\n    text-align: center;\n    font-family: PingFangSC-Regular;\n    font-size: 13px;\n    line-height: 20px;\n    height: 20px;\n    color: white;\n    line-height: 40px; }\n    .xgplayer .xgplayer-mini .name span {\n      font-family: PingFangSC-Regular;\n      font-size: 13px;\n      width: 60px;\n      height: 20px;\n      line-height: 20px;\n      background: rgba(0, 0, 0, .38);\n      border-radius: 10px;\n      display: inline-block;\n      vertical-align: middle; }\n\n.xgplayer .xgplayer-pip-lay {\n  position: absolute;\n  top: 26px;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 130;\n  cursor: pointer;\n  background-color: transparent;\n  display: none; }\n  .xgplayer .xgplayer-pip-lay div {\n    width: 100%;\n    height: 100%; }\n\n.xgplayer .xgplayer-pip-drag {\n  cursor: move;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 26px;\n  line-height: 26px;\n  background-image: linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, 0));\n  z-index: 130;\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-pip-active {\n  position: fixed;\n  right: 0;\n  bottom: 200px;\n  width: 320px !important;\n  height: 180px !important;\n  z-index: 110 !important; }\n  .xgplayer-skin-default.xgplayer-pip-active .xgplayer-controls {\n    display: none; }\n  .xgplayer-skin-default.xgplayer-pip-active .xgplayer-danmu {\n    display: none; }\n  .xgplayer-skin-default.xgplayer-pip-active .xgplayer-pip-lay {\n    display: block; }\n\n.xgplayer-skin-default.xgplayer-pip-active .xgplayer-pip-drag {\n  display: -webkit-flex;\n  display: -moz-box;\n  display: flex; }\n\n.xgplayer-skin-default.xgplayer-inactive .xgplayer-pip-drag {\n  display: none; }\n\n.lang-is-jp .xgplayer-pip .name span {\n  width: 70px;\n  height: 20px; }\n";
	styleInject(css$9);

	var _createClass$f = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get$3 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck$h(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$d(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$d(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Util$3 = Plugin.Util;

	var MiniScreen = function (_Plugin) {
	  _inherits$d(MiniScreen, _Plugin);

	  function MiniScreen() {
	    _classCallCheck$h(this, MiniScreen);

	    return _possibleConstructorReturn$d(this, (MiniScreen.__proto__ || Object.getPrototypeOf(MiniScreen)).apply(this, arguments));
	  }

	  _createClass$f(MiniScreen, [{
	    key: 'afterCreate',
	    value: function afterCreate() {
	      this.getMini = this.getMini.bind(this);
	      this.exitMini = this.exitMini.bind(this);
	      this.bind('click', this.getMini);
	      this.bind('touchend', this.getMini);
	    }
	  }, {
	    key: 'getMini',
	    value: function getMini() {
	      var _this2 = this;

	      var _player = this.player;
	      // let ro = this.root.getBoundingClientRect()
	      // let Top = ro.top
	      // let Left = ro.left
	      var dragLay = Util$3.createDom('xg-pip-lay', '<div></div>', {}, 'xgplayer-pip-lay');
	      _player.root.appendChild(dragLay);
	      var dragHandle = Util$3.createDom('xg-pip-drag', '<div class="drag-handle"><span>点击按住可拖动视频</span></div>', { tabindex: 9 }, 'xgplayer-pip-drag');
	      _player.root.appendChild(dragHandle);
	      Util$3.addClass(this.root, 'xgplayer-pip-active');
	      _player.root.style.right = 0;
	      _player.root.style.bottom = '200px';
	      _player.root.style.top = '';
	      _player.root.style.left = '';
	      _player.root.style.width = '320px';
	      _player.root.style.height = '180px';
	      if (_player.config.pipConfig) {
	        if (_player.config.pipConfig.top !== undefined) {
	          _player.root.style.top = _player.config.pipConfig.top + 'px';
	          _player.root.style.bottom = '';
	        }
	        if (_player.config.pipConfig.bottom !== undefined) {
	          _player.root.style.bottom = _player.config.pipConfig.bottom + 'px';
	        }
	        if (_player.config.pipConfig.left !== undefined) {
	          _player.root.style.left = _player.config.pipConfig.left + 'px';
	          _player.root.style.right = '';
	        }
	        if (_player.config.pipConfig.right !== undefined) {
	          _player.root.style.right = _player.config.pipConfig.right + 'px';
	        }
	        if (_player.config.pipConfig.width !== undefined) {
	          _player.root.style.width = _player.config.pipConfig.width + 'px';
	        }
	        if (_player.config.pipConfig.height !== undefined) {
	          _player.root.style.height = _player.config.pipConfig.height + 'px';
	        }
	      }
	      if (_player.config.fluid) {
	        _player.root.style['padding-top'] = '';
	      }
	      ['click', 'touchend'].forEach(function (item) {
	        dragLay.addEventListener(item, function (e) {
	          e.preventDefault();
	          e.stopPropagation();
	          _this2.exitMini();
	          // player.root.style.top = `${Top}px`
	          // player.root.style.left = `${Left}px`
	        });
	      });
	    }
	  }, {
	    key: 'exitMini',
	    value: function exitMini() {
	      var player = this.player;
	      Util$3.removeClass(this.root, 'xgplayer-pip-active');
	      player.root.style.right = '';
	      player.root.style.bottom = '';
	      player.root.style.top = '';
	      player.root.style.left = '';
	      if (player.config.fluid) {
	        player.root.style['width'] = '100%';
	        player.root.style['height'] = '0';
	        player.root.style['padding-top'] = this.config.height * 100 / this.config.width + '%';
	      } else {
	        if (player.config.width) {
	          if (typeof this.config.width !== 'number') {
	            player.root.style.width = player.config.width;
	          } else {
	            player.root.style.width = player.config.width + 'px';
	          }
	        }
	        if (player.config.height) {
	          if (typeof player.config.height !== 'number') {
	            player.root.style.height = player.config.height;
	          } else {
	            player.root.style.height = player.config.height + 'px';
	          }
	        }
	      }

	      var dragLay = Util$3.findDom(player.root, '.xgplayer-pip-lay');
	      if (dragLay && dragLay.parentNode) {
	        dragLay.parentNode.removeChild(dragLay);
	      }
	      var dragHandle = Util$3.findDom(player.root, '.xgplayer-pip-drag');
	      if (dragHandle && dragHandle.parentNode) {
	        dragHandle.parentNode.removeChild(dragHandle);
	      }
	    }
	  }, {
	    key: '_destroy',
	    value: function _destroy() {
	      this.unbind('click', this.getMini);
	      this.unbind('touchend', this.getMini);
	      _get$3(MiniScreen.prototype.__proto__ || Object.getPrototypeOf(MiniScreen.prototype), '_destroy', this).call(this);
	    }

	    // 扩展语言

	  }, {
	    key: 'registerLangauageTexts',
	    value: function registerLangauageTexts() {
	      return {
	        'miniscreen': {
	          jp: '日文text',
	          en: 'miniscreen',
	          zh: '小屏幕'
	        }
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var text = this.text.miniscreen;
	      return '\n      <xg-icon class="xgplayer-mini">\n       <p class="name"><span>' + text + '</span></p>\n      </xg-icon>';
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'miniscreen';
	    }
	  }]);

	  return MiniScreen;
	}(Plugin);

	var css$a = ".xgplayer .xgplayer-pip {\n  display: none; }\n";
	styleInject(css$a);

	var _createClass$g = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$i(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$e(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$e(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	var Events$7 = Plugin.Events;

	var PIPIcon = function (_Plugin) {
	  _inherits$e(PIPIcon, _Plugin);

	  function PIPIcon() {
	    _classCallCheck$i(this, PIPIcon);

	    return _possibleConstructorReturn$e(this, (PIPIcon.__proto__ || Object.getPrototypeOf(PIPIcon)).apply(this, arguments));
	  }

	  _createClass$g(PIPIcon, [{
	    key: 'afterCreate',
	    value: function afterCreate() {
	      var _this2 = this;

	      // video初始化之后再做判断是否显示
	      this.once(Events$7.COMPLETE, function () {
	        if (_this2.isPIPAvailable()) {
	          _this2.show();
	          _this2.switchPIP = _this2.switchPIP.bind(_this2);
	          _this2.bind('click', _this2.switchPIP);
	        }
	        _this2.initPipEvents();
	      });
	    }
	  }, {
	    key: 'initPipEvents',
	    value: function initPipEvents() {
	      var player = this.player;

	      this.leavePIPCallback = function () {
	        // 处理点击x关闭画中画的时候暂停问题
	        var paused = player.paused;
	        setTimeout(function () {
	          !paused && player.play();
	        }, 0);
	        player.emit('pip_change', false);
	      };

	      this.enterPIPCallback = function () {
	        player.emit('pip_change', true);
	      };

	      if (player.video) {
	        player.video.addEventListener('enterpictureinpicture', this.enterPIPCallback);
	        // Video left Picture-in-Picture mode.
	        player.video.addEventListener('leavepictureinpicture', this.leavePIPCallback);
	      }
	    }
	  }, {
	    key: 'switchPIP',
	    value: function switchPIP() {
	      var player = this.player;

	      try {
	        if (!document.pictureInPictureElement) {
	          player.video && player.video.requestPictureInPicture();
	        } else {
	          document.exitPictureInPicture();
	        }
	      } catch (reason) {
	        console.error('switchPIP', reason);
	      }
	    }
	  }, {
	    key: 'isPIPAvailable',
	    value: function isPIPAvailable() {
	      var player = this.player;

	      return document.pictureInPictureEnabled || !(player.video && player.video.disablePictureInPicture);
	    }
	  }, {
	    key: 'registerLangauageTexts',
	    value: function registerLangauageTexts() {
	      return {
	        'pipicon': {
	          jp: 'picture-in-picture',
	          en: 'picture-in-picture',
	          zh: '画中画'
	        }
	      };
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var player = this.player;

	      player.video.removeEventListener('enterpictureinpicture', this.enterPIPCallback);
	      player.video.removeEventListener('leavepictureinpicture', this.leavePIPCallback);
	      this.unbind('click', this.switchPIP);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return '<xg-icon class="xgplayer-pip">\n      <div class="xgplayer-icon btn-definition">\n      ' + (this.icons.pipicon ? this.icons.pipicon : '<span>' + this.text.pipicon + '</span>') + '\n      </div>\n      ' + (this.icons.pipicon ? '<div class="xg-tips">' + this.text.pipicon + '</div>' : '') + '\n    </xg-icon>';
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'PipIcon';
	    }
	  }]);

	  return PIPIcon;
	}(Plugin);

	var Next = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\">\n  <path transform=\"scale(0.038 0.028)\" d=\"M800 380v768h-128v-352l-320 320v-704l320 320v-352z\"></path>\n</svg>\n";

	var css$b = ".xgplayer .xgplayer-playnext {\n  display: none; }\n  .xgplayer .xgplayer-playnext .xgplayer-icon {\n    padding-top: 0;\n    margin-top: -1px; }\n";
	styleInject(css$b);

	var _createClass$h = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$j(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$f(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$f(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// const { Events } = Plugin

	var PlayNextIcon = function (_Plugin) {
	  _inherits$f(PlayNextIcon, _Plugin);

	  function PlayNextIcon() {
	    _classCallCheck$j(this, PlayNextIcon);

	    return _possibleConstructorReturn$f(this, (PlayNextIcon.__proto__ || Object.getPrototypeOf(PlayNextIcon)).apply(this, arguments));
	  }

	  _createClass$h(PlayNextIcon, [{
	    key: 'afterCreate',
	    value: function afterCreate() {
	      var playerConfig = this.playerConfig;

	      console.log('playerConfig', playerConfig);
	      if (this.config.url) {
	        this.initEvents();
	      }
	    }
	  }, {
	    key: 'initEvents',
	    value: function initEvents() {
	      this.playNext = this.playNext.bind(this);
	      this.bind(['touchend', 'click'], this.playNext);
	      this.show();
	    }
	  }, {
	    key: 'playNext',
	    value: function playNext() {
	      // TODO 根据配置信息进行下一个视频的切换 或者 根据参数中的回调函数进行调用
	      this.emit('playNext');
	    }
	  }, {
	    key: 'registerIcons',
	    value: function registerIcons() {
	      return {
	        playNext: Next
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return '\n     <xg-icon class="xgplayer-playnext">\n      <div class="xgplayer-icon">\n        ' + this.icons.playNext + '\n      </div>\n     </xg-icon>\n    ';
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'PlayNextIcon';
	    }
	  }]);

	  return PlayNextIcon;
	}(Plugin);

	var download = createCommonjsModule(function (module, exports) {
	//download.js v4.2, by dandavis; 2008-2016. [MIT] see http://danml.com/download.html for tests/usage
	// v1 landed a FF+Chrome compat way of downloading strings to local un-named files, upgraded to use a hidden frame and optional mime
	// v2 added named files via a[download], msSaveBlob, IE (10+) support, and window.URL support for larger+faster saves than dataURLs
	// v3 added dataURL and Blob Input, bind-toggle arity, and legacy dataURL fallback was improved with force-download mime and base64 support. 3.1 improved safari handling.
	// v4 adds AMD/UMD, commonJS, and plain browser support
	// v4.1 adds url download capability via solo URL argument (same domain/CORS only)
	// v4.2 adds semantic variable names, long (over 2MB) dataURL support, and hidden by default temp anchors
	// https://github.com/rndme/download

	(function (root, factory) {
		{
			// Node. Does not work with strict CommonJS, but
			// only CommonJS-like environments that support module.exports,
			// like Node.
			module.exports = factory();
		}
	}(commonjsGlobal, function () {

		return function download(data, strFileName, strMimeType) {

			var self = window, // this script is only for browsers anyway...
				defaultMime = "application/octet-stream", // this default mime also triggers iframe downloads
				mimeType = strMimeType || defaultMime,
				payload = data,
				url = !strFileName && !strMimeType && payload,
				anchor = document.createElement("a"),
				toString = function(a){return String(a);},
				myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
				fileName = strFileName || "download",
				blob,
				reader;
				myBlob= myBlob.call ? myBlob.bind(self) : Blob ;
		  
			if(String(this)==="true"){ //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
				payload=[payload, mimeType];
				mimeType=payload[0];
				payload=payload[1];
			}


			if(url && url.length< 2048){ // if no filename and no mime, assume a url was passed as the only argument
				fileName = url.split("/").pop().split("?")[0];
				anchor.href = url; // assign href prop to temp anchor
			  	if(anchor.href.indexOf(url) !== -1){ // if the browser determines that it's a potentially valid url path:
	        		var ajax=new XMLHttpRequest();
	        		ajax.open( "GET", url, true);
	        		ajax.responseType = 'blob';
	        		ajax.onload= function(e){ 
					  download(e.target.response, fileName, defaultMime);
					};
	        		setTimeout(function(){ ajax.send();}, 0); // allows setting custom ajax headers using the return:
				    return ajax;
				} // end if valid url?
			} // end if url?


			//go ahead and download dataURLs right away
			if(/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(payload)){
			
				if(payload.length > (1024*1024*1.999) && myBlob !== toString ){
					payload=dataUrlToBlob(payload);
					mimeType=payload.type || defaultMime;
				}else{			
					return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
						navigator.msSaveBlob(dataUrlToBlob(payload), fileName) :
						saver(payload) ; // everyone else can save dataURLs un-processed
				}
				
			}else{//not data url, is it a string with special needs?
				if(/([\x80-\xff])/.test(payload)){			  
					var i=0, tempUiArr= new Uint8Array(payload.length), mx=tempUiArr.length;
					for(i;i<mx;++i) tempUiArr[i]= payload.charCodeAt(i);
				 	payload=new myBlob([tempUiArr], {type: mimeType});
				}		  
			}
			blob = payload instanceof myBlob ?
				payload :
				new myBlob([payload], {type: mimeType}) ;


			function dataUrlToBlob(strUrl) {
				var parts= strUrl.split(/[:;,]/),
				type= parts[1],
				decoder= parts[2] == "base64" ? atob : decodeURIComponent,
				binData= decoder( parts.pop() ),
				mx= binData.length,
				i= 0,
				uiArr= new Uint8Array(mx);

				for(i;i<mx;++i) uiArr[i]= binData.charCodeAt(i);

				return new myBlob([uiArr], {type: type});
			 }

			function saver(url, winMode){

				if ('download' in anchor) { //html5 A[download]
					anchor.href = url;
					anchor.setAttribute("download", fileName);
					anchor.className = "download-js-link";
					anchor.innerHTML = "downloading...";
					anchor.style.display = "none";
					document.body.appendChild(anchor);
					setTimeout(function() {
						anchor.click();
						document.body.removeChild(anchor);
						if(winMode===true){setTimeout(function(){ self.URL.revokeObjectURL(anchor.href);}, 250 );}
					}, 66);
					return true;
				}

				// handle non-a[download] safari as best we can:
				if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
					if(/^data:/.test(url))	url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
					if(!window.open(url)){ // popup blocked, offer direct download:
						if(confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")){ location.href=url; }
					}
					return true;
				}

				//do iframe dataURL download (old ch+FF):
				var f = document.createElement("iframe");
				document.body.appendChild(f);

				if(!winMode && /^data:/.test(url)){ // force a mime that will download:
					url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
				}
				f.src=url;
				setTimeout(function(){ document.body.removeChild(f); }, 333);

			}//end saver




			if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
				return navigator.msSaveBlob(blob, fileName);
			}

			if(self.URL){ // simple fast and modern way using Blob and URL:
				saver(self.URL.createObjectURL(blob), true);
			}else{
				// handle non-Blob()+non-URL browsers:
				if(typeof blob === "string" || blob.constructor===toString ){
					try{
						return saver( "data:" +  mimeType   + ";base64,"  +  self.btoa(blob)  );
					}catch(y){
						return saver( "data:" +  mimeType   + "," + encodeURIComponent(blob)  );
					}
				}

				// Blob but not URL support:
				reader=new FileReader();
				reader.onload=function(e){
					saver(this.result);
				};
				reader.readAsDataURL(blob);
			}
			return true;
		}; /* end download() */
	}));
	});

	var css$c = "";
	styleInject(css$c);

	var _createClass$i = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$k(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$g(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$g(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DownloadIcon = function (_Plugin) {
	  _inherits$g(DownloadIcon, _Plugin);

	  _createClass$i(DownloadIcon, null, [{
	    key: 'pluginName',
	    get: function get() {
	      return 'DownloadIcon';
	    }
	  }]);

	  function DownloadIcon(args) {
	    _classCallCheck$k(this, DownloadIcon);

	    var _this = _possibleConstructorReturn$g(this, (DownloadIcon.__proto__ || Object.getPrototypeOf(DownloadIcon)).call(this, args));

	    _this.timer = null;
	    _this.isLock = false;
	    return _this;
	  }

	  _createClass$i(DownloadIcon, [{
	    key: 'afterCreate',
	    value: function afterCreate() {
	      var _this2 = this;

	      this.download = this.download.bind(this);
	      ['click', 'touchend'].forEach(function (event) {
	        _this2.bind(event, _this2.download);
	      });
	    }
	  }, {
	    key: 'download',
	    value: function download$1() {
	      var _this3 = this;

	      if (!this.isLock) {
	        return;
	      }
	      var url = this.getAbsoluteURL(this.player.src);
	      download(url);
	      this.isLock = true;
	      this.timer = window.setTimeout(function () {
	        _this3.isLock = false;
	        window.clearTimeout(_this3.timer);
	        _this3.timer = null;
	      }, 300);
	    }
	  }, {
	    key: 'getAbsoluteURL',
	    value: function getAbsoluteURL(url) {
	      // Check if absolute URL
	      if (!url.match(/^https?:\/\//)) {
	        var div = document.createElement('div');
	        div.innerHTML = '<a href="' + url + '">x</a>';
	        url = div.firstChild.href;
	      }
	      return url;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var _this4 = this;

	      ['click', 'touchend'].forEach(function (event) {
	        _this4.unbind(event, _this4.download);
	      });
	      window.clearTimeout(this.timer);
	      this.timer = null;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return '<xg-icon class="xgplayer-download">\n      <div class="xgplayer-icon btn-definition"><span>\u4E0B\u8F7D</span></div>\n    </xg-icon>';
	    }
	  }]);

	  return DownloadIcon;
	}(Plugin);

	var css$d = ".xgplayer .xgplayer-shot {\n  display: none; }\n";
	styleInject(css$d);

	var _createClass$j = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$l(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$h(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$h(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	var Events$8 = Plugin.Events;

	var ScreenShotIcon = function (_Plugin) {
	  _inherits$h(ScreenShotIcon, _Plugin);

	  function ScreenShotIcon() {
	    _classCallCheck$l(this, ScreenShotIcon);

	    return _possibleConstructorReturn$h(this, (ScreenShotIcon.__proto__ || Object.getPrototypeOf(ScreenShotIcon)).apply(this, arguments));
	  }

	  _createClass$j(ScreenShotIcon, [{
	    key: 'afterCreate',
	    value: function afterCreate() {
	      var _this2 = this;

	      this.once(Events$8.READY, function () {
	        _this2.show();
	        _this2.onClickBtn = _this2.onClickBtn.bind(_this2);
	        ['click', 'touchend'].forEach(function (event) {
	          _this2.bind(event, _this2.onClickBtn);
	        });
	      });
	    }
	  }, {
	    key: 'saveScreenShot',
	    value: function saveScreenShot(data, filename) {
	      var saveLink = document.createElement('a');
	      saveLink.href = data;
	      saveLink.download = filename;
	      var event = document.createEvent('MouseEvents');
	      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	      saveLink.dispatchEvent(event);
	    }
	  }, {
	    key: 'createCanvans',
	    value: function createCanvans() {
	      var canvas = document.createElement('canvas');
	      this.canvasCtx = canvas.getContext('2d');
	      this.canvas = canvas;
	      canvas.width = this.config.width || 600;
	      canvas.height = this.config.height || 337.5;
	    }
	  }, {
	    key: 'onClickBtn',
	    value: function onClickBtn(e) {
	      e.preventDefault();
	      e.stopPropagation();
	      console.log('onClickBtn');
	      if (!this.canvas) {
	        this.createCanvans();
	      }
	      var img = new window.Image();
	      this.canvasCtx.drawImage(this.player.video, 0, 0, this.canvas.width, this.canvas.height);
	      var encoderOptions = this.config.quality;
	      var type = this.config.type;
	      var format = this.config.format;
	      img.setAttribute('crossOrigin', 'anonymous');
	      img.src = this.canvas.toDataURL(type, encoderOptions).replace(type, 'image/octet-stream');
	      var screenShotImg = img.src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
	      this.emit('screenShot', screenShotImg);
	      this.saveScreenShot(screenShotImg, '截图' + format);
	      img.onload = function () {
	        console.log('img.onload');
	        img = null;
	      };
	    }
	  }, {
	    key: 'registerLangauageTexts',
	    value: function registerLangauageTexts() {
	      return {
	        'screenshot': {
	          jp: 'play',
	          en: 'play',
	          zh: '截图'
	        }
	      };
	    }
	  }, {
	    key: 'registerIcons',
	    value: function registerIcons() {
	      return {
	        'screenshotIcon': null
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var className = this.icons.screenshotIcon ? 'xgplayer-icon' : 'xgplayer-icon btn-definition';
	      return '\n      <xg-icon class="xgplayer-shot">\n      <div class="' + className + '">\n      ' + (this.icons.screenshotIcon ? '' + this.icons.screenshotIcon : '<span>' + this.text.screenshot + '</span>') + ' \n      </div>\n    </xg-icon>';
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'ScreenShotIcon';
	    }
	  }, {
	    key: 'defaultConfig',
	    get: function get() {
	      return {
	        quality: 0.92,
	        type: 'image/png',
	        format: '.png',
	        width: 600,
	        height: 337
	      };
	    }
	  }]);

	  return ScreenShotIcon;
	}(Plugin);

	var CssFullscreenChange = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\">\n  <defs>\n  <path class='path_full' transform=\"scale(0.028 0.028)\" d=\"M843.617212 67.898413 175.411567 67.898413c-61.502749 0-111.367437 49.856501-111.367437 111.367437l0 668.205645c0 61.510936 49.864688 111.367437 111.367437 111.367437L843.617212 958.838931c61.510936 0 111.367437-49.856501 111.367437-111.367437L954.984648 179.26585C954.984648 117.754914 905.12917 67.898413 843.617212 67.898413zM398.146441 736.104057c15.380292 0 27.842115 12.461823 27.842115 27.842115 0 15.379269-12.461823 27.841092-27.842115 27.841092L259.725858 791.787264c-7.785314 0-14.781658-3.217275-19.838837-8.365528-5.383614-4.577249-8.791224-11.228739-8.791224-19.475564L231.095797 624.736621c0-15.371082 12.471033-27.842115 27.842115-27.842115 15.380292 0 27.842115 12.471033 27.842115 27.842115l-0.61603 71.426773 133.036969-133.037992 39.378869 39.378869L324.962651 736.113267 398.146441 736.104057zM419.199942 463.611943 286.162974 330.565764l0.61603 71.435982c0 15.380292-12.461823 27.842115-27.842115 27.842115-15.371082 0-27.842115-12.461823-27.842115-27.842115L231.094774 262.791172c0-8.256034 3.40761-14.908548 8.791224-19.476587 5.057179-5.148253 12.053524-8.374738 19.838837-8.374738l138.420583 0.00921c15.380292 0 27.842115 12.461823 27.842115 27.842115s-12.461823 27.842115-27.842115 27.842115l-73.175603-0.00921 133.607974 133.607974L419.199942 463.611943zM787.932981 763.946172c0 8.247848-3.40761 14.899338-8.791224 19.475564-5.057179 5.148253-12.053524 8.365528-19.839861 8.365528L620.881314 791.787264c-15.379269 0-27.841092-12.461823-27.841092-27.841092 0-15.380292 12.461823-27.842115 27.841092-27.842115l73.185836 0.00921L560.449967 602.50427l39.378869-39.378869L732.875015 696.163393l-0.62524-71.426773c0-15.371082 12.462846-27.842115 27.842115-27.842115 15.380292 0 27.842115 12.471033 27.842115 27.842115L787.934005 763.946172zM787.932981 402.000724c0 15.380292-12.461823 27.842115-27.842115 27.842115-15.379269 0-27.842115-12.461823-27.842115-27.842115l0.62524-71.435982L599.828836 463.611943l-39.378869-39.378869 133.617184-133.607974-73.185836 0.00921c-15.379269 0-27.841092-12.461823-27.841092-27.842115s12.461823-27.842115 27.841092-27.842115l138.421606-0.00921c7.785314 0 14.781658 3.226484 19.839861 8.374738 5.383614 4.568039 8.791224 11.219529 8.791224 19.476587L787.934005 402.000724z\"></path>\n  <path class='path_exitfull'transform=\"scale(0.028 0.028)\" d=\"M834.56 81.92H189.44c-59.392 0-107.52 48.128-107.52 107.52v645.12c0 59.392 48.128 107.52 107.52 107.52h645.12c59.392 0 107.52-48.128 107.52-107.52V189.44c0-59.392-48.128-107.52-107.52-107.52zM458.24 727.04c0 14.848-12.288 26.624-26.624 26.624S404.48 741.888 404.48 727.04v-69.632L289.28 773.12c-10.752 10.24-27.648 10.24-37.888 0-10.24-10.752-10.24-27.648 0-37.888L366.592 619.52H296.96c-14.848 0-26.624-12.288-26.624-26.624s12.288-26.624 26.624-26.624h134.144c14.848 0 26.624 12.288 26.624 26.624V727.04z m0-295.936c0 14.848-12.288 26.624-26.624 26.624H296.96c-14.848 0-26.624-12.288-26.624-26.624S282.112 404.48 296.96 404.48h69.632L251.392 289.28c-10.24-10.752-10.24-27.648 0-37.888 5.12-5.12 12.288-7.68 18.944-7.68 6.656 0 13.824 2.56 18.944 7.68L404.48 366.592V296.96c0-14.848 12.288-26.624 26.624-26.624s26.624 12.288 26.624 26.624v134.144zM773.12 773.12c-10.752 10.24-27.648 10.24-37.888 0L619.52 657.408V727.04c0 14.848-12.288 26.624-26.624 26.624s-26.624-11.776-26.624-26.624v-134.144c0-14.848 12.288-26.624 26.624-26.624H727.04c14.848 0 26.624 12.288 26.624 26.624s-12.288 26.624-26.624 26.624h-69.632l115.2 115.2c10.752 10.752 10.752 27.648 0.512 38.4z m0-483.84L657.408 404.48H727.04c14.848 0 26.624 12.288 26.624 26.624 0 14.848-12.288 26.624-26.624 26.624h-134.144c-14.848 0-26.624-12.288-26.624-26.624V296.96c0-14.848 12.288-26.624 26.624-26.624s26.624 12.288 26.624 26.624v69.632L734.72 250.88c5.12-5.12 12.288-7.68 18.944-7.68s13.824 2.56 18.944 7.68c10.752 10.752 10.752 27.648 0.512 38.4z\"></path>\n  </defs>\n  <path class=\"path\" transform=\"scale(0.028 0.028)\" d=\"M843.617212 67.898413 175.411567 67.898413c-61.502749 0-111.367437 49.856501-111.367437 111.367437l0 668.205645c0 61.510936 49.864688 111.367437 111.367437 111.367437L843.617212 958.838931c61.510936 0 111.367437-49.856501 111.367437-111.367437L954.984648 179.26585C954.984648 117.754914 905.12917 67.898413 843.617212 67.898413zM398.146441 736.104057c15.380292 0 27.842115 12.461823 27.842115 27.842115 0 15.379269-12.461823 27.841092-27.842115 27.841092L259.725858 791.787264c-7.785314 0-14.781658-3.217275-19.838837-8.365528-5.383614-4.577249-8.791224-11.228739-8.791224-19.475564L231.095797 624.736621c0-15.371082 12.471033-27.842115 27.842115-27.842115 15.380292 0 27.842115 12.471033 27.842115 27.842115l-0.61603 71.426773 133.036969-133.037992 39.378869 39.378869L324.962651 736.113267 398.146441 736.104057zM419.199942 463.611943 286.162974 330.565764l0.61603 71.435982c0 15.380292-12.461823 27.842115-27.842115 27.842115-15.371082 0-27.842115-12.461823-27.842115-27.842115L231.094774 262.791172c0-8.256034 3.40761-14.908548 8.791224-19.476587 5.057179-5.148253 12.053524-8.374738 19.838837-8.374738l138.420583 0.00921c15.380292 0 27.842115 12.461823 27.842115 27.842115s-12.461823 27.842115-27.842115 27.842115l-73.175603-0.00921 133.607974 133.607974L419.199942 463.611943zM787.932981 763.946172c0 8.247848-3.40761 14.899338-8.791224 19.475564-5.057179 5.148253-12.053524 8.365528-19.839861 8.365528L620.881314 791.787264c-15.379269 0-27.841092-12.461823-27.841092-27.841092 0-15.380292 12.461823-27.842115 27.841092-27.842115l73.185836 0.00921L560.449967 602.50427l39.378869-39.378869L732.875015 696.163393l-0.62524-71.426773c0-15.371082 12.462846-27.842115 27.842115-27.842115 15.380292 0 27.842115 12.471033 27.842115 27.842115L787.934005 763.946172zM787.932981 402.000724c0 15.380292-12.461823 27.842115-27.842115 27.842115-15.379269 0-27.842115-12.461823-27.842115-27.842115l0.62524-71.435982L599.828836 463.611943l-39.378869-39.378869 133.617184-133.607974-73.185836 0.00921c-15.379269 0-27.841092-12.461823-27.841092-27.842115s12.461823-27.842115 27.841092-27.842115l138.421606-0.00921c7.785314 0 14.781658 3.226484 19.839861 8.374738 5.383614 4.568039 8.791224 11.219529 8.791224 19.476587L787.934005 402.000724z\"></path>\n</svg>\n";

	var css$e = ".xgplayer.xgplayer-is-cssfullscreen {\n  position: fixed !important;\n  left: 0 !important;\n  top: 0 !important;\n  width: 100% !important;\n  height: 100% !important;\n  z-index: 99999 !important; }\n\n.xgplayer .xgplayer-cssfullscreen .xgplayer-icon {\n  position: relative;\n  left: 8px;\n  top: 4px; }\n";
	styleInject(css$e);

	var _createClass$k = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$m(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$i(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$i(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Events$9 = Plugin.Events,
	    Util$4 = Plugin.Util;

	var CssFullScreen = function (_Plugin) {
	  _inherits$i(CssFullScreen, _Plugin);

	  _createClass$k(CssFullScreen, null, [{
	    key: 'pluginName',
	    get: function get() {
	      return 'cssFullscreen';
	    }
	  }]);

	  function CssFullScreen(args) {
	    _classCallCheck$m(this, CssFullScreen);

	    var _this = _possibleConstructorReturn$i(this, (CssFullScreen.__proto__ || Object.getPrototypeOf(CssFullScreen)).call(this, args));

	    _this.isCssfullScreen = false;
	    return _this;
	  }

	  _createClass$k(CssFullScreen, [{
	    key: 'afterCreate',
	    value: function afterCreate() {
	      var _this2 = this;

	      this.on(Events$9.READY, function () {
	        _this2.btnClick = _this2.btnClick.bind(_this2);
	        ['click', 'touchend'].forEach(function (event) {
	          _this2.bind(event, _this2.btnClick);
	        });
	      });
	    }
	  }, {
	    key: 'btnClick',
	    value: function btnClick(e) {
	      e.preventDefault();
	      e.stopPropagation();
	      if (!this.isCssfullScreen) {
	        this.getCssFullscreen();
	      } else {
	        this.exitCssFullscreen();
	      }
	      this.animate(this.isCssfullScreen);
	      this.emit(Events$9.CSS_FULLSCREEN_CHANGE, this.isCssfullScreen);
	    }
	  }, {
	    key: 'animate',
	    value: function animate(isFullScreen) {
	      var path = this.find('.path');
	      var full = this.find('.path_full').getAttribute('d');
	      var exit = this.find('.path_exitfull').getAttribute('d');
	      isFullScreen ? path.setAttribute('d', exit) : path.setAttribute('d', full);
	    }
	  }, {
	    key: 'getCssFullscreen',
	    value: function getCssFullscreen() {
	      var player = this.player;

	      if (player.config.fluid) {
	        player.root.style['padding-top'] = '';
	      }
	      Util$4.addClass(player.root, 'xgplayer-is-cssfullscreen');
	      this.isCssfullScreen = true;
	      player.emit('cssFullscreen_change', this.isCssfullScreen);
	    }
	  }, {
	    key: 'exitCssFullscreen',
	    value: function exitCssFullscreen() {
	      var player = this.player;

	      if (player.config.fluid) {
	        player.root.style['width'] = '100%';
	        player.root.style['height'] = '0';
	        player.root.style['padding-top'] = player.config.height * 100 / player.config.width + '%';
	      }
	      Util$4.removeClass(player.root, 'xgplayer-is-cssfullscreen');
	      this.isCssfullScreen = false;
	      player.emit('cssFullscreen_change', this.isCssfullScreen);
	    }
	  }, {
	    key: 'registerIcons',
	    value: function registerIcons() {
	      return {
	        cssFullscreen: CssFullscreenChange
	      };
	    }
	  }, {
	    key: 'registerLangauageTexts',
	    value: function registerLangauageTexts() {
	      return {
	        'cssFullscreen': {
	          jp: 'Cssfullscreen',
	          en: 'Cssfullscreen',
	          zh: '进入样式全屏'
	        },
	        exitCssFullscreen: {
	          jp: 'Exit cssfullscreen',
	          en: 'Exit cssfullscreen',
	          zh: '退出样式全屏'
	        }
	      };
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var _this3 = this;

	      ['click', 'touchend'].forEach(function (event) {
	        _this3.unbind(event, _this3.btnClick);
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return '<xg-icon class=\'xgplayer-cssfullscreen\'>\n    <div class="xgplayer-icon">\n    ' + this.icons.cssFullscreen + '\n    </div>\n    <div class="xg-tips">' + (this.isCssfullScreen ? this.text.exitCssFullscreen : this.text.cssFullscreen) + '</div>\n    </xg-icon>';
	    }
	  }]);

	  return CssFullScreen;
	}(Plugin);

	var css$f = ".xgplayer.xgplayer-inactive .xgplayer-controls {\n  display: inline-block; }\n  .xgplayer.xgplayer-inactive .xgplayer-controls.flex {\n    display: -webkit-flex;\n    display: -moz-box;\n    display: flex; }\n\n.xgplayer xg-icon {\n  position: relative;\n  height: 100%;\n  margin-right: 10px;\n  cursor: pointer;\n  -moz-box-sizing: border-box;\n       box-sizing: border-box; }\n  .xgplayer xg-icon .xg-tips {\n    background: rgba(0, 0, 0, .54);\n    border-radius: 1px;\n    display: none;\n    position: absolute;\n    font-family: PingFangSC-Regular;\n    font-size: 11px;\n    color: #fff;\n    padding: 4px 4px;\n    text-align: center;\n    top: -30px;\n    left: 50%;\n    margin-left: -16px;\n    width: auto;\n    white-space: nowrap; }\n  .xgplayer xg-icon:hover .xg-tips {\n    display: block; }\n  .xgplayer xg-icon .xgplayer-icon {\n    fill: #fff;\n    padding-top: 4px; }\n  .xgplayer xg-icon .btn-definition {\n    text-align: center;\n    font-family: PingFangSC-Regular;\n    font-size: 13px;\n    line-height: 20px;\n    height: 20px;\n    color: white;\n    line-height: 40px; }\n    .xgplayer xg-icon .btn-definition span {\n      font-family: PingFangSC-Regular;\n      font-size: 13px;\n      width: 60px;\n      height: 20px;\n      line-height: 20px;\n      background: rgba(0, 0, 0, .38);\n      border-radius: 10px;\n      display: inline-block;\n      vertical-align: middle;\n      margin-bottom: 8px; }\n\n.xgplayer .xgplayer-controls {\n  position: absolute;\n  display: none;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 40px;\n  z-index: 10;\n  background-image: linear-gradient(180deg, transparent, rgba(0, 0, 0, .37), rgba(0, 0, 0, .75), rgba(0, 0, 0, .75));\n  z-index: 10; }\n  .xgplayer .xgplayer-controls .left-grid, .xgplayer .xgplayer-controls .right-grid {\n    position: relative;\n    float: left;\n    display: -webkit-flex;\n    display: -moz-box;\n    display: flex;\n    height: 100%; }\n  .xgplayer .xgplayer-controls .right-grid {\n    float: right;\n    -webkit-flex-direction: row-reverse;\n       -moz-box-orient: horizontal;\n       -moz-box-direction: reverse;\n            flex-direction: row-reverse; }\n  .xgplayer .xgplayer-controls .center {\n    display: block;\n    position: absolute;\n    height: 20px;\n    line-height: 20px;\n    left: 0;\n    right: 0;\n    outline: none;\n    top: -15px;\n    z-index: 35; }\n  .xgplayer .xgplayer-controls.flex {\n    -webkit-justify-content: space-around;\n            justify-content: space-around;\n    display: -webkit-flex;\n    display: -moz-box;\n    display: flex; }\n    .xgplayer .xgplayer-controls.flex .center {\n      -webkit-flex: 1;\n         -moz-box-flex: 1;\n              flex: 1;\n      position: relative;\n      top: 0;\n      left: 0;\n      right: 0;\n      height: 100%; }\n\n.xgplayer .right-grid xg-icon {\n  margin-right: 0;\n  margin-left: 10px; }\n";
	styleInject(css$f);

	var _createClass$l = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$n(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$j(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$j(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Controls = function (_Plugin) {
	  _inherits$j(Controls, _Plugin);

	  function Controls() {
	    _classCallCheck$n(this, Controls);

	    return _possibleConstructorReturn$j(this, (Controls.__proto__ || Object.getPrototypeOf(Controls)).apply(this, arguments));
	  }

	  _createClass$l(Controls, [{
	    key: 'afterCreate',
	    value: function afterCreate() {
	      console.log('afterCreate');
	    }
	  }, {
	    key: 'children',
	    value: function children() {
	      this.left = this.find('left-grid');
	      this.center = this.find('center');
	      this.right = this.find('right-grid');
	      console.log('center', this.center);
	      return {
	        TimeIcon: {
	          plugin: TimeIcon,
	          options: {
	            index: 1,
	            root: this.left
	          }
	        },
	        PlayIcon: {
	          plugin: PlayIcon,
	          options: {
	            index: 0,
	            root: this.left
	          }
	        },
	        playNextIcon: {
	          plugin: PlayNextIcon,
	          options: {
	            index: 2,
	            root: this.left
	          }
	        },
	        DownLoadIcon: {
	          plugin: DownloadIcon,
	          options: {
	            index: 3,
	            root: this.right
	          }
	        },
	        ScreenShotIcon: {
	          plugin: ScreenShotIcon,
	          options: {
	            index: 4,
	            root: this.right
	          }
	        },
	        FullScreen: {
	          plugin: Fullscreen,
	          options: {
	            index: 0,
	            root: this.right
	          }
	        },
	        VolumeIcon: {
	          plugin: VolumeIcon,
	          options: {
	            index: 1,
	            root: this.right
	          }
	        },
	        RotateIcon: {
	          plugin: Rotate,
	          options: {
	            index: 1,
	            root: this.right
	          }
	        },
	        MiniScreen: {
	          plugin: MiniScreen,
	          options: {
	            index: 1,
	            root: this.right
	          }
	        },
	        PIPIcon: {
	          plugin: PIPIcon,
	          options: {
	            index: 1,
	            root: this.right
	          }
	        },
	        CssFullScreen: {
	          plugin: CssFullScreen,
	          options: {
	            index: 1,
	            root: this.right
	          }
	        },
	        Progress: {
	          plugin: Progress,
	          options: {
	            root: this.center
	          }
	        }
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return '<xg-controls class="xgplayer-controls" unselectable="on" onselectstart="return false">\n    <left-grid class="left-grid">\n    </Left-grid>\n    <center class="center"></center>\n    <right-grid class="right-grid">\n    </right-grid>\n    </xg-controls>';
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'Controls';
	    }
	  }]);

	  return Controls;
	}(Plugin);

	var _createClass$m = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get$4 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck$o(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$k(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$k(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FULLSCREEN_EVENTS = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'];

	var Player = function (_Proxy) {
	  _inherits$k(Player, _Proxy);

	  function Player(options) {
	    _classCallCheck$o(this, Player);

	    var _this = _possibleConstructorReturn$k(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, options));

	    _this.config = util.deepCopy(getDefaultConfig(), options);
	    _this.config.plugins = [Controls].concat(_this.config.plugins);
	    console.log('this.config.plugins', _this.config.plugins);
	    _this.config.presets = [DefaultPreset];
	    // timer and flags
	    _this.userTimer = null;
	    _this.waitTimer = null;
	    _this.isProgressMoving = false;
	    _this.isReady = false;
	    _this.isPlaying = false;
	    _this.isActive = true;

	    _this._initDOM();

	    _this._bindEvents();

	    _this._registerPresets();
	    _this._registerPlugins();

	    setTimeout(function () {
	      _this.emit(READY);
	      _this.isReady = true;
	    }, 0);

	    if (_this.config.videoInit || _this.config.autoplay) {
	      if (!_this.hasStart) {
	        _this.start();
	      }
	    }
	    return _this;
	  }

	  /**
	   * init control bar
	   * @private
	   */


	  _createClass$m(Player, [{
	    key: '_initDOM',
	    value: function _initDOM() {
	      this.root = util.findDom(document, '#' + this.config.id);
	      this.controls = util.createDom('xg-controls', '', {
	        unselectable: 'on',
	        onselectstart: 'return false'
	      }, 'xgplayer-controls');
	      if (!this.root) {
	        var el = this.config.el;
	        if (el && el.nodeType === 1) {
	          this.root = el;
	        } else {
	          this.emit(ERROR, new Errors('use', this.config.vid, {
	            line: 32,
	            handle: 'Constructor',
	            msg: 'container id can\'t be empty'
	          }));
	          return false;
	        }
	      }

	      this.addClass(STATE_CLASS.DEFAULT + ' xgplayer-' + sniffer.device + ' ' + STATE_CLASS.NO_START + ' ' + (this.config.controls ? '' : STATE_CLASS.NO_CONTROLS));
	      this.root.appendChild(this.controls);
	      if (this.config.fluid) {
	        this.root.style['max-width'] = '100%';
	        this.root.style['width'] = '100%';
	        this.root.style['height'] = '0';
	        this.root.style['padding-top'] = this.config.height * 100 / this.config.width + '%';

	        this.video.style['position'] = 'absolute';
	        this.video.style['top'] = '0';
	        this.video.style['left'] = '0';
	      } else {
	        // this.root.style.width = `${this.config.width}px`
	        // this.root.style.height = `${this.config.height}px`
	        if (this.config.width) {
	          if (typeof this.config.width !== 'number') {
	            this.root.style.width = this.config.width;
	          } else {
	            this.root.style.width = this.config.width + 'px';
	          }
	        }
	        if (this.config.height) {
	          if (typeof this.config.height !== 'number') {
	            this.root.style.height = this.config.height;
	          } else {
	            this.root.style.height = this.config.height + 'px';
	          }
	        }
	      }
	    }
	  }, {
	    key: '_bindEvents',
	    value: function _bindEvents() {
	      var _this2 = this;

	      ['focus', 'blur'].forEach(function (item) {
	        _this2.on(item, _this2['on' + item.charAt(0).toUpperCase() + item.slice(1)]);
	      });

	      // deal with the fullscreen state change callback
	      this.onFullscreenChange = function () {
	        var fullEl = util.getFullScreenEl();
	        if (fullEl && (fullEl === _this2._fullscreenEl || fullEl.tagName === 'VIDEO')) {
	          _this2.fullscreen = true;
	          _this2.addClass(STATE_CLASS.FULLSCREEN);
	          _this2.emit(FULLSCREEN_CHANGE, true);
	        } else {
	          _this2.fullscreen = false;
	          _this2._fullscreenEl = null;
	          _this2.removeClass(STATE_CLASS.FULLSCREEN);
	          _this2.emit(FULLSCREEN_CHANGE, false);
	        }
	      };

	      FULLSCREEN_EVENTS.forEach(function (item) {
	        document.addEventListener(item, _this2.onFullscreenChange);
	      });

	      this.once('loadeddata', this.getVideoSize);

	      this.mousemoveFunc = function () {
	        _this2.emit(PLAYER_FOCUS);
	        if (!_this2.config.closeFocusVideoFocus) {
	          _this2.video.focus();
	        }
	      };
	      this.root.addEventListener('mousemove', this.mousemoveFunc);

	      this.playFunc = function () {
	        _this2.emit(PLAYER_FOCUS);
	        if (!_this2.config.closePlayVideoFocus) {
	          _this2.video.focus();
	        }
	      };
	      this.once('play', this.playFunc);
	      // if (!this.config.closeVideoClick) {
	      //   ['touched', 'click'].map((key) => {
	      //     this.video.addEventListener(key, () => {
	      //       console.log('this.video.addEventListener')
	      //       if (this.paused) {
	      //         this.play()
	      //       } else {
	      //         this.pause()
	      //       }
	      //     })
	      //   })
	      // }
	      var player = this;
	      function onDestroy() {
	        var _this3 = this;

	        player.root.removeEventListener('mousemove', player.mousemoveFunc);
	        FULLSCREEN_EVENTS.forEach(function (item) {
	          document.removeEventListener(item, _this3.onFullscreenChange);
	        });
	        player.off('destroy', onDestroy);
	      }
	      player.once('destroy', onDestroy);
	    }
	  }, {
	    key: '_startInit',
	    value: function _startInit(url) {
	      var _this4 = this;

	      var root = this.root;
	      var player = this;
	      if (!url || url === '') {
	        this.emit(URL_NULL);
	      }
	      this.canPlayFunc = function () {
	        this.volume = this.config.volume;
	        this.play();
	        player.off(CANPLAY, this.canPlayFunc);
	      };

	      if (util.typeOf(url) === 'String') {
	        this.video.src = url;
	      } else {
	        url.forEach(function (item) {
	          _this4.video.appendChild(util.createDom('source', '', {
	            src: '' + item.src,
	            type: '' + (item.type || '')
	          }));
	        });
	      }

	      this.loadeddataFunc && this.once('loadeddata', this.loadeddataFunc);

	      if (this.config.autoplay) {
	        this.once(CANPLAY, this.canPlayFunc);
	      }
	      root.insertBefore(this.video, root.firstChild);
	      setTimeout(function () {
	        _this4.emit(COMPLETE);
	      }, 1);
	      this.hasStart = true;
	      pluginsManager.afterInit(this);
	    }
	    /**
	     * 注册组件 组件列表config.plugins
	     */

	  }, {
	    key: '_registerPlugins',
	    value: function _registerPlugins() {
	      var _this5 = this;

	      var ignores = this.config.ignores || [];
	      var plugins = this.config.plugins || [];
	      var ignoresStr = ignores.join('||');
	      plugins.map(function (plugin) {
	        try {
	          // 在ignores中的不做组装
	          if (plugin.pluginName && ignoresStr.indexOf(plugin.pluginName.toLowerCase()) > -1) {
	            return null;
	          }
	          if (plugin.options) {
	            return pluginsManager.register(_this5, plugin.plugin, plugin.options);
	          }
	          return pluginsManager.register(_this5, plugin);
	        } catch (err) {
	          return null;
	        }
	      });
	    }
	  }, {
	    key: '_registerPresets',
	    value: function _registerPresets() {
	      var _this6 = this;

	      this.config.presets.forEach(function (preset) {
	        usePreset(_this6, preset);
	      });
	    }
	  }, {
	    key: 'registerPlugin',
	    value: function registerPlugin() {}
	  }, {
	    key: 'unRegistePlugin',
	    value: function unRegistePlugin() {}

	    /**
	     * 当前播放器挂在的插件实例代码
	     */

	  }, {
	    key: 'getPlugin',
	    value: function getPlugin(pluginName) {
	      return pluginsManager.findPlugin(this, pluginName);
	    }
	  }, {
	    key: 'addClass',
	    value: function addClass(className) {
	      if (!this.root) {
	        return;
	      }
	      if (!util.hasClass(this.root, className)) {
	        util.addClass(this.root, className);
	      }
	    }
	  }, {
	    key: 'removeClass',
	    value: function removeClass(className) {
	      if (!this.root) {
	        return;
	      }
	      util.removeClass(this.root, className);
	    }
	  }, {
	    key: 'start',
	    value: function start(url) {
	      var _this7 = this;

	      // 已经开始初始化播放了 则直接调用play
	      if (this.hasStart) {
	        return this.play();
	      } else {
	        return pluginsManager.beforeInit(this).then(function () {
	          if (!url) {
	            url = _this7.url || _this7.config.url;
	          }
	          return _this7._startInit(url);
	        }).catch(function (e) {
	          e.fileName = 'player';
	          e.lineNumber = '236';
	          throw e;
	        });
	      }
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      var _this8 = this;

	      if (!this.hasStart) {
	        this.start();
	        return;
	      }
	      var playPromise = _get$4(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'play', this).call(this);
	      if (playPromise !== undefined && playPromise && playPromise.then) {
	        playPromise.then(function () {
	          _this8.removeClass(STATE_CLASS.AUTOPLAY);
	          _this8.removeClass(STATE_CLASS.NO_START);
	          _this8.addClass(STATE_CLASS.PLAYING);
	        }).catch(function (e) {
	          // 避免AUTOPLAY_PREVENTED先于playing和play触发
	          setTimeout(function () {
	            _this8.emit(AUTOPLAY_PREVENTED);
	            _this8.addClass(STATE_CLASS.AUTOPLAY);
	          }, 0);
	          throw e;
	        });
	      }
	      return playPromise;
	    }
	  }, {
	    key: 'reload',
	    value: function reload() {
	      this.video.load();
	      this.reloadFunc = function () {
	        this.play().catch(function (err) {
	          console.log(err);
	        });
	      };
	      this.once('loadeddata', this.reloadFunc);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var isDelDom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	      pluginsManager.destroy(this);
	      _get$4(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'destroy', this).call(this);
	      if (isDelDom) {
	        // parentNode.removeChild(this.root)
	        this.root.innerHTML = '';
	        var classNameList = this.root.className.split(' ');
	        if (classNameList.length > 0) {
	          this.root.className = classNameList.filter(function (name) {
	            return name.indexOf('xgplayer') < 0;
	          }).join(' ');
	        } else {
	          this.root.className = '';
	        }
	      }
	      for (var k in this) {
	        // if (k !== 'config') {
	        delete this[k];
	        // }
	      }
	    }
	  }, {
	    key: 'replay',
	    value: function replay() {
	      var _this9 = this;

	      this.removeClass(STATE_CLASS.ENDED);
	      this.once(CANPLAY, function () {
	        var playPromise = _this9.play();
	        if (playPromise && playPromise.catch) {
	          playPromise.catch(function (err) {
	            console.log(err);
	          });
	        }
	      });
	      this.emit(REPLAY);
	      this.currentTime = 0;
	    }
	  }, {
	    key: 'getFullscreen',
	    value: function getFullscreen(el) {
	      var player = this;
	      if (!el) {
	        el = this.root;
	      }
	      this._fullscreenEl = el;
	      if (el.requestFullscreen) {
	        el.requestFullscreen();
	      } else if (el.mozRequestFullScreen) {
	        el.mozRequestFullScreen();
	      } else if (el.webkitRequestFullscreen) {
	        el.webkitRequestFullscreen(window.Element.ALLOW_KEYBOARD_INPUT);
	      } else if (player.video.webkitSupportsFullscreen) {
	        player.video.webkitEnterFullscreen();
	      } else if (el.msRequestFullscreen) {
	        el.msRequestFullscreen();
	      } else {
	        this.addClass(STATE_CLASS.CSS_FULLSCREEN);
	      }
	    }
	  }, {
	    key: 'exitFullscreen',
	    value: function exitFullscreen(el) {
	      if (el) {
	        el = this.root;
	      }
	      if (document.exitFullscreen) {
	        document.exitFullscreen();
	      } else if (document.webkitExitFullscreen) {
	        document.webkitExitFullscreen();
	      } else if (document.mozCancelFullScreen) {
	        document.mozCancelFullScreen();
	      } else if (document.msExitFullscreen) {
	        document.msExitFullscreen();
	      }
	      this.removeClass(STATE_CLASS.CSS_FULLSCREEN);
	    }
	  }, {
	    key: 'getCssFullscreen',
	    value: function getCssFullscreen() {
	      var player = this;
	      this.addClass(STATE_CLASS.CSS_FULLSCREEN);
	      player.emit('requestCssFullscreen');
	    }
	  }, {
	    key: 'exitCssFullscreen',
	    value: function exitCssFullscreen() {
	      var player = this;
	      this.removeClass(STATE_CLASS.CSS_FULLSCREEN);
	      player.emit('exitCssFullscreen');
	    }
	  }, {
	    key: 'onFocus',
	    value: function onFocus() {
	      this.isActive = true;
	      var player = this;
	      this.addClass(STATE_CLASS.ACTIVE);
	      if (player.userTimer) {
	        clearTimeout(player.userTimer);
	      }
	      player.userTimer = setTimeout(function () {
	        this.isActive = false;
	        player.emit(PLAYER_BLUR);
	      }, player.config.inactive);
	    }
	  }, {
	    key: 'onBlur',
	    value: function onBlur() {
	      if (!this.paused && !this.ended) {
	        this.removeClass(STATE_CLASS.ACTIVE);
	      }
	    }
	  }, {
	    key: 'onPlay',
	    value: function onPlay() {
	      this.addClass(STATE_CLASS.PLAYING);
	      this.removeClass(STATE_CLASS.PAUSED);
	      this.ended && this.removeClass(STATE_CLASS.ENDED);
	      this.emit(PLAYER_FOCUS);
	    }
	  }, {
	    key: 'onPause',
	    value: function onPause() {
	      this.addClass(STATE_CLASS.PAUSED);
	      if (this.userTimer) {
	        clearTimeout(this.userTimer);
	      }
	      this.emit(PLAYER_FOCUS);
	    }
	  }, {
	    key: 'onEnded',
	    value: function onEnded() {
	      this.addClass(STATE_CLASS.ENDED);
	      this.removeClass(STATE_CLASS.PLAYING);
	    }
	  }, {
	    key: 'onSeeking',
	    value: function onSeeking() {
	      // util.addClass(this.root, 'seeking');
	    }
	  }, {
	    key: 'onSeeked',
	    value: function onSeeked() {
	      // for ie,playing fired before waiting
	      if (this.waitTimer) {
	        clearTimeout(this.waitTimer);
	      }
	      this.removeClass(STATE_CLASS.LOADING);
	    }
	  }, {
	    key: 'onWaiting',
	    value: function onWaiting() {
	      var _this10 = this;

	      var self = this;
	      if (self.waitTimer) {
	        clearTimeout(self.waitTimer);
	      }
	      self.waitTimer = setTimeout(function () {
	        _this10.addClass(STATE_CLASS.LOADING);
	      }, 500);
	    }
	  }, {
	    key: 'onPlaying',
	    value: function onPlaying() {
	      var _this11 = this;

	      if (this.waitTimer) {
	        clearTimeout(this.waitTimer);
	      }
	      var NO_START = STATE_CLASS.NO_START,
	          PAUSED = STATE_CLASS.PAUSED,
	          ENDED = STATE_CLASS.ENDED,
	          ERROR = STATE_CLASS.ERROR,
	          REPLAY = STATE_CLASS.REPLAY,
	          LOADING = STATE_CLASS.LOADING;

	      var clsList = [NO_START, PAUSED, ENDED, ERROR, REPLAY, LOADING];
	      clsList.forEach(function (cls) {
	        _this11.removeClass(cls);
	      });
	      this.addClass(STATE_CLASS.PLAYING);
	    }
	  }, {
	    key: 'getVideoSize',
	    value: function getVideoSize() {
	      if (this.video.videoWidth && this.video.videoHeight) {
	        var containerSize = this.root.getBoundingClientRect();
	        if (this.config.fitVideoSize === 'auto') {
	          if (containerSize.width / containerSize.height > this.video.videoWidth / this.video.videoHeight) {
	            this.root.style.height = this.video.videoHeight / this.video.videoWidth * containerSize.width + 'px';
	          } else {
	            this.root.style.width = this.video.videoWidth / this.video.videoHeight * containerSize.height + 'px';
	          }
	        } else if (this.config.fitVideoSize === 'fixWidth') {
	          this.root.style.height = this.video.videoHeight / this.video.videoWidth * containerSize.width + 'px';
	        } else if (this.config.fitVideoSize === 'fixHeight') {
	          this.root.style.width = this.video.videoWidth / this.video.videoHeight * containerSize.height + 'px';
	        }
	      }
	    }
	  }, {
	    key: 'plugins',
	    get: function get() {
	      return pluginsManager.getPlugins(this);
	    }
	  }, {
	    key: 'version',
	    get: function get() {
	      return version;
	    }
	  }, {
	    key: 'url',
	    set: function set(url) {
	      this.__url = url;
	    },
	    get: function get() {
	      return this.__url || this.config.url;
	    }
	  }, {
	    key: 'poster',
	    set: function set(posterUrl) {
	      var poster = util.findDom(this.root, '.xgplayer-poster');
	      if (poster) {
	        poster.style.backgroundImage = 'url(' + posterUrl + ')';
	      }
	    }
	  }, {
	    key: 'fullscreen',
	    get: function get() {
	      return this._isFullScreen;
	    },
	    set: function set(val) {
	      this._isFullScreen = val;
	    }
	  }, {
	    key: 'bullet',
	    get: function get() {
	      return util.findDom(this.root, 'xg-bullet') ? util.hasClass(util.findDom(this.root, 'xg-bullet'), 'xgplayer-has-bullet') : false;
	    }
	  }, {
	    key: 'textTrack',
	    get: function get() {
	      return util.hasClass(this.root, 'xgplayer-is-textTrack');
	    }
	  }, {
	    key: 'pip',
	    get: function get() {
	      return util.hasClass(this.root, 'xgplayer-pip-active');
	    }

	    /***
	     * TODO
	     * 插件全部迁移完成再做删除
	     */

	  }], [{
	    key: 'install',
	    value: function install(name, descriptor) {
	      if (!Player.plugins) {
	        Player.plugins = {};
	      }
	      if (!Player.plugins[name]) {
	        Player.plugins[name] = descriptor;
	      }
	    }

	    /***
	     * TODO
	     * 插件全部迁移完成再做删除
	     */

	  }, {
	    key: 'use',
	    value: function use(name, descriptor) {
	      if (!Player.plugins) {
	        Player.plugins = {};
	      }
	      Player.plugins[name] = descriptor;
	    }
	  }]);

	  return Player;
	}(Proxy);

	Player.util = util;
	Player.sniffer = sniffer;
	Player.Errors = Errors;
	Player.Events = Events;
	Player.Plugin = Plugin;
	Player.BasePlugin = BasePlugin;

	var css$g = ".xgplayer {\n  background: #000;\n  width: 100%;\n  height: 100%;\n  position: relative;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n  -ms-user-select: none; }\n  .xgplayer * {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    font: inherit;\n    vertical-align: baseline; }\n  .xgplayer .xgplayer-none {\n    display: none; }\n  .xgplayer.xgplayer-is-fullscreen {\n    width: 100% !important;\n    height: 100% !important;\n    padding-top: 0 !important;\n    z-index: 9999; }\n  .xgplayer.xgplayer-is-fullscreen.xgplayer-inactive {\n    cursor: none; }\n  .xgplayer video {\n    width: 100%;\n    height: 100%;\n    outline: none; }\n\n.xgplayer .xgplayer-none {\n  display: none; }\n";
	styleInject(css$g);

	Player.BasePlugin = BasePlugin;
	Player.Plugin = Plugin;
	Player.pluginsManager = pluginsManager;

	return Player;

})));
//# sourceMappingURL=index.js.map
