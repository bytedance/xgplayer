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
	        if (dst[key] === undefined || dst[key] === undefined) {
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

	util.deepMerge = function (dst, src) {
	  Object.keys(src).map(function (key) {
	    if (_typeof(dst[key]) === _typeof(src[key]) && dst[key] !== null && _typeof(dst[key]) === 'object' && !(src[key] instanceof Node)) {
	      util.deepMerge(dst[key], src[key]);
	    } else {
	      dst[key] = src[key];
	    }
	  });
	  return dst;
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

	util.hide = function (dom) {
	  dom.style.display = 'none';
	};

	util.show = function (dom, display) {
	  dom.style.display = display || 'block';
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
	var RATE_CHANGE = 'rateChange';

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
	var MINI_STATE_CHANGE = 'mini_state_change';

	// transmuxer events
	var SEI_PARSED = 'SEI_PARSED';

	var event = /*#__PURE__*/Object.freeze({
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
		RATE_CHANGE: RATE_CHANGE,
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
		CSS_FULLSCREEN_CHANGE: CSS_FULLSCREEN_CHANGE,
		MINI_STATE_CHANGE: MINI_STATE_CHANGE,
		SEI_PARSED: SEI_PARSED
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
	    this.videoConfig = Object.assign({}, {
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
	    }, options.videoConfig);
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
	    if (options.autoplayMuted) {
	      this.video.muted = true;
	    }
	    if (options.autoplay) {
	      this.video.autoplay = true;
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
	      this.ev = ['play', 'playing', 'pause', 'ended', 'error', 'seeking', 'seeked', 'timeupdate', 'waiting', 'canplay', 'canplaythrough', 'durationchange', 'volumechange', 'loadeddata', 'ratechange'].map(function (item) {
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

	        _this2.videoEventHandler = function () {
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
	        };
	        _this2.video.addEventListener(Object.keys(item)[0], _this2.videoEventHandler, false);
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

	        _this3.video.removeEventListener(evName, _this3.videoEventHandler, false);
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

	    if (util.checkIsFunction(this.beforeCreate)) {
	      this.beforeCreate(args);
	    }
	    this.__args = args;
	    this.__events = {}; // 对player的事件监听缓存
	    this.config = args.config || {};
	    this.__init(args);
	  }

	  _createClass$1(BasePlugin, [{
	    key: 'onPluginsReady',
	    value: function onPluginsReady() {}
	  }, {
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
	BasePlugin.Events = event;

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
	   * register a lazy plugin
	   * @param { object } player instance
	   * @param { object } lazyPlugin config
	   *
	   */
	  lazyRegister: function lazyRegister(player, lazyPlugin) {
	    var _this = this;

	    var timeout = lazyPlugin.timeout || 1500;
	    return Promise.race([lazyPlugin.loader().then(function (plugin) {
	      var result = void 0;
	      if (plugin && plugin.__esModule) {
	        result = plugin.default;
	      } else {
	        result = plugin;
	      }
	      _this.register(player, result, plugin.options);
	    }), new Promise(function (resolve, reject) {
	      setTimeout(function () {
	        reject(new Error('timeout'));
	      }, timeout);
	    })]);
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

	    var pluginName = options.pluginName || plugin.pluginName;
	    if (!pluginName) {
	      throw new Error('The property pluginName is necessary');
	    }

	    if (plugin.isSupported && !plugin.isSupported()) {
	      console.warn('not supported plugin [' + pluginName + ']');
	      return;
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

	      // 复制插件的默认配置项
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

	    if (plugin.defaultConfig) {
	      Object.keys(plugin.defaultConfig).map(function (key) {
	        if (typeof options.config[key] === 'undefined') {
	          options.config[key] = plugin.defaultConfig[key];
	        }
	      });
	    }

	    // 获取插件添加的父节点
	    if (!options.root) {
	      options.root = player.root;
	    } else if (typeof options.root === 'string') {
	      options.root = player[options.root];
	    }

	    options.index = options.config.index || 0;
	    try {
	      // eslint-disable-next-line new-cap
	      var _instance = new plugin(options);
	      plugins[pluginName.toLowerCase()] = _instance;
	      plugins[pluginName.toLowerCase()].func = plugin;
	      if (_instance && typeof _instance.afterCreate === 'function') {
	        _instance.afterCreate();
	      }
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
	    var _this2 = this;

	    console.log('beforeInit');
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
	      if (!_this2.pluginGroup) {
	        return;
	      }

	      var prevTask = void 0;
	      if (player._loadingPlugins && player._loadingPlugins.length) {
	        prevTask = Promise.all(player._loadingPlugins);
	      } else {
	        prevTask = Promise.resolve();
	      }

	      return prevTask.then(function () {
	        var cgid = player._pluginInfoId;
	        var plugins = _this2.pluginGroup[cgid]._plugins;
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

	        Promise.all([].concat(pluginsRet)).then(function () {
	          resolve();
	        }).catch(function (e) {
	          console.error(e);
	          resolve();
	        });
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
	  onPluginsReady: function onPluginsReady(player) {
	    var cgid = player._pluginInfoId;
	    var plugins = this.pluginGroup[cgid]._plugins;
	    if (!cgid || !plugins) {
	      return;
	    }
	    Object.keys(plugins).map(function (key) {
	      if (plugins[key].onPluginsReady && typeof plugins[key].onPluginsReady === 'function') {
	        plugins[key].onPluginsReady();
	      }
	    });
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

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _createElement(tag, name) {
	  var dom = document.createElement(tag);
	  dom.className = name;
	  return dom;
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
	        if (lang.indexOf('-') > 0) {
	          lang = lang.split('-')[0];
	        }
	        return textConfig[key][lang];
	      }
	    });
	  });
	}

	var Plugin = function (_BasePlugin) {
	  _inherits(Plugin, _BasePlugin);

	  _createClass$2(Plugin, null, [{
	    key: 'insert',

	    /**
	      * 插入dom结构
	      * @param {String} html html字符串或者dom
	      * @param {DocumentElemebt } parent
	      * @param {*} index
	      */
	    value: function insert(html, parent, index) {
	      var len = parent.children.length;
	      var insertIdx = parseInt(index);
	      var isDomElement = html instanceof window.HTMLElement;
	      if (typeof index === 'undefined' || len <= insertIdx) {
	        isDomElement ? parent.appendChild(html) : parent.insertAdjacentHTML('beforeend', html);
	        return parent.children[parent.children.length - 1];
	      } else if (insertIdx === 0) {
	        isDomElement ? parent.insertBefore(html, parent.children.length > 0 ? parent.children[0] : null) : parent.insertAdjacentHTML('afterbegin', html);
	        return parent.children[0];
	      }
	      var el = parent.children[insertIdx];
	      if (el && el.insertAdjacentHTML) {
	        isDomElement ? parent.insertBefore(html, el) : el.insertAdjacentHTML('beforebegin', html);
	        return parent.children[insertIdx];
	      }
	    }
	  }, {
	    key: 'defaultConfig',
	    get: function get() {
	      return {};
	    }
	  }]);

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
	        _el = Plugin.insert(renderStr, _parent, args.index);
	      } else if (args.tag) {
	        _el = _createElement(args.tag, args.name);
	        _parent.appendChild(_el);
	      } else {
	        return;
	      }

	      Plugin.defineGetterOrSetter(this, {
	        'root': {
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
	      if (this.config.index) {
	        this.root.setAttribute('data-index', this.config.index);
	      }
	      this.__registeChildren();
	    }
	  }, {
	    key: '__registeChildren',
	    value: function __registeChildren() {
	      if (!this.root) {
	        return;
	      }
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
	              var options = {
	                root: this.root
	                // eslint-disable-next-line no-unused-vars
	              };var config = void 0,
	                  _Plugin = void 0;
	              if (typeof _plugin === 'function') {
	                config = this.config[name] || {};
	                _Plugin = _plugin;
	              } else if ((typeof _plugin === 'undefined' ? 'undefined' : _typeof$1(_plugin)) === 'object' && typeof _plugin.plugin === 'function') {
	                config = _plugin.options ? BasePlugin.Util.deepCopy(this.config[name] || {}, _plugin.options) : this.config[name] || {};
	                _Plugin = _plugin.plugin;
	              }
	              options.config = config;
	              config.index !== undefined && (options.index = config.index);
	              config.root && (options.root = config.root);
	              var c = this.registerPlugin(_Plugin, options, name);
	              this._children.push(c);
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
	    key: 'registerPlugin',
	    value: function registerPlugin(plugin) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

	      options.root = options.root || this.root;
	      name && (options.pluginName = name);
	      var _c = pluginsManager.register(this.player, plugin, options);
	      this._children.push(_c);
	      return _c;
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
	      if (!this.root) {
	        return;
	      }
	      return this.root.querySelector(qs);
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
	        if (!this.root) {
	          return;
	        }
	        if (Array.isArray(eventType)) {
	          eventType.forEach(function (item) {
	            bind$1(_this2.root, querySelector, item, callback, false);
	          });
	        } else {
	          bind$1(this.root, querySelector, eventType, callback, false);
	        }
	      }
	    }
	  }, {
	    key: 'unbind',
	    value: function unbind(querySelector, eventType, callback) {
	      var _this3 = this;

	      // if no querySelector passed to the method
	      if (arguments.length < 3 && typeof eventType === 'function') {
	        if (Array.isArray(querySelector)) {
	          querySelector.forEach(function (item) {
	            _this3.unbindEL(item, eventType);
	          });
	        } else {
	          this.unbindEL(querySelector, eventType);
	        }
	      } else if (typeof callback === 'function') {
	        if (Array.isArray(eventType)) {
	          eventType.forEach(function (item) {
	            unbind$1(_this3.root, querySelector, item, callback);
	          });
	        } else {
	          unbind$1(this.root, querySelector, eventType, callback);
	        }
	      }
	    }
	  }, {
	    key: 'setStyle',
	    value: function setStyle(name, value) {
	      if (!this.root) {
	        return;
	      }
	      if (typeof name === 'string') {
	        return this.root.style[name] = value;
	      } else if ((typeof name === 'undefined' ? 'undefined' : _typeof$1(name)) === 'object') {
	        var obj = name;
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;

	        try {
	          for (var _iterator2 = Object.keys(obj)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var item = _step2.value;

	            this.root.style[item] = obj[item];
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
	      if (!this.root) {
	        return;
	      }
	      if (typeof name === 'string') {
	        return this.root.setAttribute(name, value);
	      } else if ((typeof name === 'undefined' ? 'undefined' : _typeof$1(name)) === 'object') {
	        var obj = name;
	        var _iteratorNormalCompletion3 = true;
	        var _didIteratorError3 = false;
	        var _iteratorError3 = undefined;

	        try {
	          for (var _iterator3 = Object.keys(obj)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	            var item = _step3.value;

	            this.root.setAttribute(item, obj[item]);
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
	      if (!this.root) {
	        return;
	      }
	      this.root.innerHtml = htmlStr;
	      if (typeof callback === 'function') {
	        callback();
	      }
	    }
	  }, {
	    key: 'bindEL',
	    value: function bindEL(event, eventHandle) {
	      var isBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	      if (!this.root) {
	        return;
	      }
	      if ('on' + event in this.root && typeof eventHandle === 'function') {
	        this.root.addEventListener(event, eventHandle, isBubble);
	      }
	    }
	  }, {
	    key: 'unbindEL',
	    value: function unbindEL(event, eventHandle) {
	      var isBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	      if (!this.root) {
	        return;
	      }
	      if ('on' + event in this.root && typeof eventHandle === 'function') {
	        this.root.removeEventListener(event, eventHandle, isBubble);
	      }
	    }
	  }, {
	    key: 'show',
	    value: function show(value) {
	      if (!this.root) {
	        return;
	      }
	      this.root.style.display = value !== undefined ? value : 'block';
	      var cs = window.getComputedStyle(this.root, null);
	      var cssDisplayValue = cs.getPropertyValue('display');
	      if (cssDisplayValue === 'none') {
	        return this.root.style.display = 'block';
	      }
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      this.root && (this.root.style.display = 'none');
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
	      if (this.root) {
	        if (this.root.hasOwnProperty('remove')) {
	          this.root.remove();
	        } else if (this.root.parentNode) {
	          this.root.parentNode.removeChild(this.root);
	        }
	      }
	    }
	  }]);

	  return Plugin;
	}(BasePlugin);


	Plugin.ROOT_TYPES = {
	  CONTROLS: 'controls',
	  ROOT: 'root'
	};

	Plugin.POSITIONS = {
	  ROOT: 'root',
	  ROOT_LEFT: 'rootLeft',
	  ROOT_RIGHT: 'rootRight',
	  ROOT_TOP: 'rootTop',
	  CONTROLS_LEFT: 'controlsLeft',
	  CONTROLS_RIGTH: 'controlsRight',
	  CONTROLS_CENTER: 'controlsCenter'
	};

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
	  MOBILE: 'xgplayer-mobile',
	  MINI: 'xgplayer-mini'
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
	    defaultPlaybackRate: 1, // 默认播放倍数
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
	    controlsList: [],
	    // 内置插件相关配置
	    screenShot: false, // 截图插件
	    rotate: false, // 旋转插件
	    pip: false, // pip插件
	    mini: false, // 迷你小窗插件
	    cssFullscreen: true, // 页面全屏
	    keyShortcut: true, // 是否开启快捷键
	    presets: []
	  };
	}

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var usePreset = function usePreset(player, Preset) {
	  var _player$config$plugin, _player$config$ignore;

	  var presetInst = void 0;
	  if (Preset.preset && Preset.options) {
	    // eslint-disable-next-line new-cap
	    presetInst = new Preset.preset(Preset.options, player.config);
	  } else {
	    presetInst = new Preset({}, player.config);
	  }
	  var _presetInst = presetInst,
	      _presetInst$plugins = _presetInst.plugins,
	      plugins = _presetInst$plugins === undefined ? [] : _presetInst$plugins,
	      _presetInst$ignores = _presetInst.ignores,
	      ignores = _presetInst$ignores === undefined ? [] : _presetInst$ignores,
	      icons = _presetInst.icons;

	  if (!player.config.plugins) {
	    player.config.plugins = [];
	  }

	  if (!player.config.ignores) {
	    player.config.ignores = [];
	  }

	  (_player$config$plugin = player.config.plugins).push.apply(_player$config$plugin, _toConsumableArray(plugins));
	  (_player$config$ignore = player.config.ignores).push.apply(_player$config$ignore, _toConsumableArray(ignores));
	  player.config.icons = icons;
	};

	var _createClass$3 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get$1 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	var Events = Plugin.Events,
	    Util = Plugin.Util,
	    POSITIONS = Plugin.POSITIONS;

	var Controls = function (_Plugin) {
	  _inherits$1(Controls, _Plugin);

	  function Controls() {
	    _classCallCheck$4(this, Controls);

	    return _possibleConstructorReturn$1(this, (Controls.__proto__ || Object.getPrototypeOf(Controls)).apply(this, arguments));
	  }

	  _createClass$3(Controls, [{
	    key: 'beforeCreate',
	    value: function beforeCreate(args) {
	      if (typeof args.player.config.controls === 'boolean') {
	        args.config.disable = !args.player.config.controls;
	      }
	    }
	  }, {
	    key: 'afterCreate',
	    value: function afterCreate() {
	      var _this2 = this;

	      if (this.config.disable) {
	        return;
	      }
	      var height = this.config.height;

	      var style = {
	        height: height + 'px'
	      };
	      Object.keys(style).map(function (key) {
	        _this2.root.style[key] = style[key];
	      });
	      this.left = this.find('left-grid');
	      this.center = this.find('center');
	      this.right = this.find('right-grid');
	      this.on(Events.MINI_STATE_CHANGE, function (isMini) {
	        isMini ? Util.addClass(_this2.root, 'mini') : Util.removeClass(_this2.root, 'mini');
	      });
	      this.bind('mouseenter', function (e) {
	        _this2.mouseEnter(e);
	      });
	      this.bind('mouseou', function (e) {
	        _this2.mouseOut(e);
	      });
	    }
	  }, {
	    key: 'mouseEnter',
	    value: function mouseEnter() {
	      console.log('mouseenter');
	    }
	  }, {
	    key: 'mouseOut',
	    value: function mouseOut() {
	      console.log('mouseout');
	    }
	  }, {
	    key: 'showTips',
	    value: function showTips() {}
	  }, {
	    key: 'registerPlugin',
	    value: function registerPlugin(plugin) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var name = arguments[2];

	      if (!this.root) {
	        return;
	      }
	      if (!options.root) {
	        var position = options.config && options.config.position ? options.config.position : plugin.defaultConfig.position;
	        switch (position) {
	          case POSITIONS.CONTROLS_LEFT:
	            options.root = this.left;
	            break;
	          case POSITIONS.CONTROLS_RIGTH:
	            options.root = this.right;
	            break;
	          case POSITIONS.CONTROLS_CENTER:
	            options.root = this.center;
	            break;
	          default:
	            options.root = this.left;
	        }
	        return _get$1(Controls.prototype.__proto__ || Object.getPrototypeOf(Controls.prototype), 'registerPlugin', this).call(this, plugin, options, name);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.config.disable) {
	        return;
	      }
	      return '<xg-controls class="xgplayer-controls" unselectable="on" onselectstart="return false">\n    <left-grid class="left-grid">\n    </Left-grid>\n    <center class="center"></center>\n    <right-grid class="right-grid">\n    </right-grid>\n    </xg-controls>';
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'Controls';
	    }
	  }, {
	    key: 'defaultConfig',
	    get: function get() {
	      return {
	        disable: false
	      };
	    }
	  }]);

	  return Controls;
	}(Plugin);

	var _createClass$4 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get$2 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$2(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FULLSCREEN_EVENTS = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'];

	var Player = function (_Proxy) {
	  _inherits$2(Player, _Proxy);

	  function Player(options) {
	    _classCallCheck$5(this, Player);

	    var _this = _possibleConstructorReturn$2(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, options));

	    _this.config = util.deepMerge(getDefaultConfig(), options);
	    console.log('this.config', _this.config);

	    // resolve default preset
	    if (_this.config.presets.length) {
	      var defaultIdx = _this.config.presets.indexOf('default');
	      if (defaultIdx >= 0 && Player.defaultPreset) {
	        _this.config.presets.push(Player.defaultPreset);
	        _this.config.presets.splice(defaultIdx, 1);
	      }
	    } else if (Player.defaultPreset) {
	      _this.config.presets.push(Player.defaultPreset);
	    }

	    // timer and flags
	    _this.userTimer = null;
	    _this.waitTimer = null;
	    _this.isProgressMoving = false;
	    _this.isReady = false;
	    _this.isPlaying = false;
	    _this.isSeeking = false;
	    _this.isActive = true;
	    _this.isCssfullScreen = false;

	    _this._initDOM();

	    _this._bindEvents();
	    _this._registerPresets();
	    _this._registerPlugins();
	    pluginsManager.onPluginsReady(_this);

	    setTimeout(function () {
	      _this.emit(READY);
	      _this.onReady && _this.onReady();
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


	  _createClass$4(Player, [{
	    key: '_initDOM',
	    value: function _initDOM() {
	      var _this2 = this;

	      this.root = util.findDom(document, '#' + this.config.id);
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
	      this.topBar = util.createDom('xg-bar', '', '', 'xg-top-bar');
	      this.leftBar = util.createDom('xg-bar', '', '', 'xg-left-bar');
	      this.rightBar = util.createDom('xg-bar', '', '', 'xg-right-bar');
	      this.root.appendChild(this.topBar);
	      this.root.appendChild(this.leftBar);
	      this.root.appendChild(this.rightBar);
	      // const baseBar = pluginsManager.register(this, BaseBar)
	      // this.baseBar = baseBar
	      var controls = pluginsManager.register(this, Controls);
	      this.controls = controls;
	      this.addClass(STATE_CLASS.DEFAULT + ' xgplayer-' + sniffer.device + ' ' + STATE_CLASS.NO_START + ' ' + (this.config.controls ? '' : STATE_CLASS.NO_CONTROLS));
	      if (this.config.fluid) {
	        var style = {
	          'max-width': '100%',
	          'width': '100%',
	          'height': '0',
	          'padding-top': this.config.height * 100 / this.config.width + '%',
	          'position': 'position',
	          'top': '0',
	          'left': '0'
	        };
	        Object.keys(style).map(function (key) {
	          _this2.root.style[key] = style[key];
	        });
	      } else {
	        ['width', 'height'].map(function (key) {
	          if (_this2.config[key]) {
	            if (typeof _this2.config[key] !== 'number') {
	              _this2.root.style[key] = _this2.config[key];
	            } else {
	              _this2.root.style[key] = _this2.config[key] + 'px';
	            }
	          }
	        });
	      }
	    }
	  }, {
	    key: '_bindEvents',
	    value: function _bindEvents() {
	      var _this3 = this;

	      ['focus', 'blur'].forEach(function (item) {
	        _this3.on(item, _this3['on' + item.charAt(0).toUpperCase() + item.slice(1)]);
	      });

	      // deal with the fullscreen state change callback
	      this.onFullscreenChange = function () {
	        var fullEl = util.getFullScreenEl();
	        if (fullEl && (fullEl === _this3._fullscreenEl || fullEl.tagName === 'VIDEO')) {
	          _this3.fullscreen = true;
	          _this3.addClass(STATE_CLASS.FULLSCREEN);
	          _this3.emit(FULLSCREEN_CHANGE, true);
	        } else {
	          _this3.fullscreen = false;
	          _this3._fullscreenEl = null;
	          _this3.removeClass(STATE_CLASS.FULLSCREEN);
	          _this3.emit(FULLSCREEN_CHANGE, false);
	        }
	      };

	      FULLSCREEN_EVENTS.forEach(function (item) {
	        document.addEventListener(item, _this3.onFullscreenChange);
	      });

	      this.once('loadeddata', this.getVideoSize);

	      this.mousemoveFunc = function () {
	        // 加上判断减少触发次数
	        if (_this3.isActive) {
	          return;
	        }
	        _this3.emit(PLAYER_FOCUS);
	        if (!_this3.config.closeFocusVideoFocus) {
	          _this3.video.focus();
	        }
	      };
	      this.root.addEventListener('mousemove', this.mousemoveFunc);

	      this.playFunc = function () {
	        _this3.emit(PLAYER_FOCUS);
	        if (!_this3.config.closePlayVideoFocus) {
	          _this3.video.focus();
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
	        var _this4 = this;

	        player.root.removeEventListener('mousemove', player.mousemoveFunc);
	        FULLSCREEN_EVENTS.forEach(function (item) {
	          document.removeEventListener(item, _this4.onFullscreenChange);
	        });
	        player.off('destroy', onDestroy);
	      }
	      player.once('destroy', onDestroy);
	    }
	  }, {
	    key: '_startInit',
	    value: function _startInit(url) {
	      var _this5 = this;

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
	          _this5.video.appendChild(util.createDom('source', '', {
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
	        _this5.emit(COMPLETE);
	      }, 1);
	      if (!this.hasStart) {
	        pluginsManager.afterInit(this);
	      }
	      this.hasStart = true;
	    }
	    /**
	     * 注册组件 组件列表config.plugins
	     */

	  }, {
	    key: '_registerPlugins',
	    value: function _registerPlugins() {
	      var _this6 = this;

	      this._loadingPlugins = [];
	      var ignores = this.config.ignores || [];
	      var plugins = this.config.plugins || [];
	      var ignoresStr = ignores.join('||');
	      plugins.map(function (plugin) {
	        try {
	          // 在ignores中的不做组装
	          if (plugin.pluginName && ignoresStr.indexOf(plugin.pluginName.toLowerCase()) > -1) {
	            return null;
	          }
	          if (plugin.lazy && plugin.loader) {
	            var loadingPlugin = pluginsManager.lazyRegister(_this6, plugin);
	            if (plugin.forceBeforeInit) {
	              loadingPlugin.then(function () {
	                _this6._loadingPlugins.splice(_this6._loadingPlugins.indexOf(loadingPlugin), 1);
	              }).catch(function () {
	                _this6._loadingPlugins.splice(_this6._loadingPlugins.indexOf(loadingPlugin), 1);
	              });
	              _this6._loadingPlugins.push(loadingPlugin);
	            }

	            return;
	          }
	          return _this6.registerPlugin(plugin);
	        } catch (err) {
	          console.error(err);
	          return null;
	        }
	      });
	    }
	  }, {
	    key: '_registerPresets',
	    value: function _registerPresets() {
	      var _this7 = this;

	      this.config.presets.forEach(function (preset) {
	        usePreset(_this7, preset);
	      });
	    }
	  }, {
	    key: 'registerPlugin',
	    value: function registerPlugin(plugin) {
	      var PLUFGIN = null;
	      var options = null;
	      if (plugin.plugin && typeof plugin.plugin === 'function') {
	        PLUFGIN = plugin.plugin;
	        options = plugin.options;
	      } else {
	        PLUFGIN = plugin;
	        options = {};
	      }

	      var position = options.position ? options.position : PLUFGIN.defaultConfig && PLUFGIN.defaultConfig.position;
	      var POSITIONS = Plugin.POSITIONS;

	      if (!options.root && typeof position === 'string' && position.indexOf('controls') > -1) {
	        return this.controls.registerPlugin(PLUFGIN, options, PLUFGIN.pluginName);
	      }
	      switch (position) {
	        case POSITIONS.ROOT_RIGHT:
	          options.root = this.rightBar;
	          break;
	        case POSITIONS.ROOT_LEFT:
	          options.root = this.leftBar;
	          break;
	        case POSITIONS.ROOT_TOP:
	          options.root = this.topBar;
	          break;
	        default:
	          options.root = this.root;
	          break;
	      }
	      return pluginsManager.register(this, PLUFGIN, options);
	    }
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
	      var _this8 = this;

	      // 已经开始初始化播放了 则直接调用play
	      if (this.hasStart) {
	        return this.play();
	      } else {
	        return pluginsManager.beforeInit(this).then(function () {
	          if (!url) {
	            url = _this8.url || _this8.config.url;
	          }
	          return _this8._startInit(url);
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
	      var _this9 = this;

	      if (!this.hasStart) {
	        this.start();
	        return;
	      }
	      var playPromise = _get$2(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'play', this).call(this);
	      if (playPromise !== undefined && playPromise && playPromise.then) {
	        playPromise.then(function () {
	          _this9.removeClass(STATE_CLASS.AUTOPLAY);
	          _this9.removeClass(STATE_CLASS.NO_START);
	          _this9.addClass(STATE_CLASS.PLAYING);
	        }).catch(function (e) {
	          // 避免AUTOPLAY_PREVENTED先于playing和play触发
	          setTimeout(function () {
	            _this9.emit(AUTOPLAY_PREVENTED);
	            _this9.addClass(STATE_CLASS.AUTOPLAY);
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
	      _get$2(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'destroy', this).call(this);
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
	      var _this10 = this;

	      this.removeClass(STATE_CLASS.ENDED);
	      this.once(CANPLAY, function () {
	        var playPromise = _this10.play();
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
	      this.addClass(STATE_CLASS.CSS_FULLSCREEN);
	      if (this.config.fluid) {
	        this.root.style['padding-top'] = '';
	      }
	      this.isCssfullScreen = true;
	      this.emit(CSS_FULLSCREEN_CHANGE, true);
	    }
	  }, {
	    key: 'exitCssFullscreen',
	    value: function exitCssFullscreen() {
	      if (this.config.fluid) {
	        this.root.style['width'] = '100%';
	        this.root.style['height'] = '0';
	        this.root.style['padding-top'] = this.config.height * 100 / this.config.width + '%';
	      }
	      this.removeClass(STATE_CLASS.CSS_FULLSCREEN);
	      this.isCssfullScreen = false;
	      this.emit(CSS_FULLSCREEN_CHANGE, false);
	    }
	  }, {
	    key: 'onFocus',
	    value: function onFocus() {
	      this.isActive = true;
	      var player = this;
	      this.removeClass(STATE_CLASS.ACTIVE);
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
	      this.isActive = false;
	      if (!this.paused && !this.ended) {
	        this.addClass(STATE_CLASS.ACTIVE);
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
	      this.isSeeking = true;
	      // util.addClass(this.root, 'seeking');
	    }
	  }, {
	    key: 'onSeeked',
	    value: function onSeeked() {
	      this.isSeeking = false;
	      // for ie,playing fired before waiting
	      if (this.waitTimer) {
	        clearTimeout(this.waitTimer);
	      }
	      this.removeClass(STATE_CLASS.LOADING);
	    }
	  }, {
	    key: 'onWaiting',
	    value: function onWaiting() {
	      var _this11 = this;

	      var self = this;
	      if (self.waitTimer) {
	        clearTimeout(self.waitTimer);
	      }
	      self.waitTimer = setTimeout(function () {
	        _this11.addClass(STATE_CLASS.LOADING);
	      }, 500);
	    }
	  }, {
	    key: 'onPlaying',
	    value: function onPlaying() {
	      var _this12 = this;

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
	        _this12.removeClass(cls);
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

	Player.Util = util;
	Player.Sniffer = sniffer;
	Player.Errors = Errors;
	Player.Events = event;
	Player.Plugin = Plugin;
	Player.BasePlugin = BasePlugin;

	var _createClass$5 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$6(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$3(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$3(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Poster = function (_Plugin) {
	  _inherits$3(Poster, _Plugin);

	  function Poster() {
	    _classCallCheck$6(this, Poster);

	    return _possibleConstructorReturn$3(this, (Poster.__proto__ || Object.getPrototypeOf(Poster)).apply(this, arguments));
	  }

	  _createClass$5(Poster, [{
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

	var ReplaySvg = "<svg class=\"xgplayer-replay-svg\" xmlns=\"http://www.w3.org/2000/svg\" width=\"78\" height=\"78\" viewbox=\"0 0 78 78\">\n  <path d=\"M8.22708362,13.8757234 L11.2677371,12.6472196 C11.7798067,12.4403301 12.3626381,12.6877273 12.5695276,13.1997969 L12.9441342,14.1269807 C13.1510237,14.6390502 12.9036264,15.2218816 12.3915569,15.4287712 L6.8284538,17.6764107 L5.90126995,18.0510173 C5.38920044,18.2579068 4.80636901,18.0105096 4.5994795,17.49844 L1.97723335,11.0081531 C1.77034384,10.4960836 2.0177411,9.91325213 2.52981061,9.70636262 L3.45699446,9.33175602 C3.96906396,9.12486652 4.5518954,9.37226378 4.75878491,9.88433329 L5.67885163,12.1615783 C7.99551726,6.6766934 13.3983951,3 19.5,3 C27.7842712,3 34.5,9.71572875 34.5,18 C34.5,26.2842712 27.7842712,33 19.5,33 C15.4573596,33 11.6658607,31.3912946 8.87004692,28.5831991 C8.28554571,27.9961303 8.28762719,27.0463851 8.87469603,26.4618839 C9.46176488,25.8773827 10.4115101,25.8794641 10.9960113,26.466533 C13.2344327,28.7147875 16.263503,30 19.5,30 C26.127417,30 31.5,24.627417 31.5,18 C31.5,11.372583 26.127417,6 19.5,6 C14.4183772,6 9.94214483,9.18783811 8.22708362,13.8757234 Z\"></path>\n</svg>\n";

	var _createClass$6 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$7(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$4(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$4(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Replay = function (_Plugin) {
	  _inherits$4(Replay, _Plugin);

	  function Replay() {
	    _classCallCheck$7(this, Replay);

	    return _possibleConstructorReturn$4(this, (Replay.__proto__ || Object.getPrototypeOf(Replay)).apply(this, arguments));
	  }

	  _createClass$6(Replay, [{
	    key: 'registerIcons',
	    value: function registerIcons() {
	      return {
	        'replay': ReplaySvg
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
	        var path = _this2.root.querySelector('path');
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

	var PlaySvg = "<svg class=\"play\" xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\">\n  <path transform=\"scale(0.0320625 0.0320625)\" d=\"M576,363L810,512L576,661zM342,214L576,363L576,661L342,810z\"></path>\n</svg>\n";

	var PauseSvg = "<svg class=\"pause\" xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\">\n  <path transform=\"scale(0.0320625 0.0320625)\" d=\"M598,214h170v596h-170v-596zM256 810v-596h170v596h-170z\"></path>\n</svg>\n";

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

	var css = ".xgplayer.xgplayer-mini {\n  position: fixed;\n  width: 320px;\n  height: 180px;\n  z-index: 110; }\n  .xgplayer.xgplayer-mini:hover {\n    cursor: move; }\n    .xgplayer.xgplayer-mini:hover .xg-mini-layer {\n      display: block; }\n\n.xgplayer.xgplayer-ended .xg-mini-layer {\n  display: none; }\n\n.xgplayer .xg-mini-layer {\n  display: none;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%; }\n  .xgplayer .xg-mini-layer .mask {\n    pointer-events: none;\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 100%;\n    width: 100%;\n    background-color: rgba(0, 0, 0, .4); }\n  .xgplayer .xg-mini-layer xg-mini-header {\n    display: -webkit-flex;\n    display: -moz-box;\n    display: flex;\n    cursor: pointer;\n    top: 0;\n    left: 0;\n    right: 40px;\n    -moz-box-sizing: border-box;\n         box-sizing: border-box;\n    padding: 10px 3px 0 8px;\n    -webkit-justify-content: space-between;\n       -moz-box-pack: justify;\n            justify-content: space-between;\n    color: #ffffff;\n    font-size: 14px;\n    position: absolute;\n    z-index: 22; }\n    .xgplayer .xg-mini-layer xg-mini-header .xgplayer-pip-disableBtn {\n      pointer-events: all; }\n    .xgplayer .xg-mini-layer xg-mini-header #disabledMini {\n      display: none;\n      position: relative; }\n    .xgplayer .xg-mini-layer xg-mini-header #disabledMini + label {\n      cursor: pointer;\n      position: relative;\n      display: -webkit-flex;\n      display: -moz-box;\n      display: flex;\n      -webkit-align-items: center;\n         -moz-box-align: center;\n              align-items: center; }\n    .xgplayer .xg-mini-layer xg-mini-header #disabledMini + label::before {\n      content: \"\";\n      color: #ff142b;\n      background-color: transparent;\n      border-radius: 2px;\n      border: solid 1px #cdcdcd;\n      width: 16px;\n      height: 16px;\n      display: inline-block;\n      text-align: center;\n      vertical-align: middle;\n      line-height: 16px;\n      margin-right: 7px; }\n    .xgplayer .xg-mini-layer xg-mini-header #disabledMini:checked + label {\n      color: #ff142b; }\n    .xgplayer .xg-mini-layer xg-mini-header #disabledMini:checked + label::before {\n      border-color: #ff142b; }\n    .xgplayer .xg-mini-layer xg-mini-header #disabledMini:checked + label:after {\n      content: \"\";\n      position: absolute;\n      width: 4px;\n      height: 8px;\n      border-color: #ff142b;\n      border-style: solid;\n      border-width: 0px 2px 2px 0px;\n      -webkit-transform: rotate(45deg);\n          -ms-transform: rotate(45deg);\n              transform: rotate(45deg);\n      left: 6px;\n      top: 5px; }\n    .xgplayer .xg-mini-layer xg-mini-header .xgplayer-mini-disableBtn xg-tips {\n      position: absolute;\n      padding: 4px 6px;\n      white-space: nowrap;\n      bottom: -30px;\n      right: 15px;\n      border-radius: 4px;\n      background-color: rgba(0, 0, 0, .54);\n      display: none; }\n    .xgplayer .xg-mini-layer xg-mini-header .xgplayer-mini-disableBtn:hover #disabledMini + label::before {\n      border-color: #ff142b; }\n    .xgplayer .xg-mini-layer xg-mini-header .xgplayer-mini-disableBtn:hover #disabledMini + label {\n      color: #ff142b; }\n    .xgplayer .xg-mini-layer xg-mini-header .xgplayer-mini-disableBtn:hover xg-tips {\n      display: block; }\n  .xgplayer .xg-mini-layer .mini-cancel-btn {\n    cursor: pointer;\n    display: block;\n    color: #fff;\n    width: 40px;\n    height: 38px;\n    position: absolute;\n    right: 0;\n    top: 0;\n    text-align: center;\n    line-height: 38px; }\n  .xgplayer .xg-mini-layer .play-icon {\n    cursor: pointer;\n    height: 48px;\n    width: 48px;\n    position: absolute;\n    background: rgba(0, 0, 0, .54);\n    border-radius: 24px;\n    top: 50%;\n    left: 50%;\n    margin: -24px 0 0 -24px; }\n    .xgplayer .xg-mini-layer .play-icon svg {\n      width: 40px;\n      height: 40px;\n      fill: #faf7f7;\n      -webkit-transform: translate(7px, 7px);\n          -ms-transform: translate(7px, 7px);\n              transform: translate(7px, 7px); }\n    .xgplayer .xg-mini-layer .play-icon.play .play {\n      display: none; }\n    .xgplayer .xg-mini-layer .play-icon.play .pause {\n      display: block; }\n    .xgplayer .xg-mini-layer .play-icon.pause .play {\n      display: block; }\n    .xgplayer .xg-mini-layer .play-icon.pause .pause {\n      display: none; }\n\n.xgplayer .xgplayer-miniicon {\n  position: relative;\n  outline: none;\n  display: block; }\n  .xgplayer .xgplayer-miniicon .name {\n    text-align: center;\n    font-family: PingFangSC-Regular;\n    font-size: 13px;\n    line-height: 20px;\n    height: 20px;\n    color: rgba(255, 255, 255, .8);\n    line-height: 40px; }\n    .xgplayer .xgplayer-miniicon .name span {\n      font-family: PingFangSC-Regular;\n      font-size: 13px;\n      width: 60px;\n      height: 20px;\n      line-height: 20px;\n      background: rgba(0, 0, 0, .38);\n      border-radius: 10px;\n      display: inline-block;\n      vertical-align: middle; }\n";
	styleInject(css);

	var _createClass$7 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$8(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$5(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$5(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var POSITIONS$1 = Plugin.POSITIONS;

	var MiniScreenIcon = function (_Plugin) {
	  _inherits$5(MiniScreenIcon, _Plugin);

	  function MiniScreenIcon() {
	    _classCallCheck$8(this, MiniScreenIcon);

	    return _possibleConstructorReturn$5(this, (MiniScreenIcon.__proto__ || Object.getPrototypeOf(MiniScreenIcon)).apply(this, arguments));
	  }

	  _createClass$7(MiniScreenIcon, [{
	    key: 'afterCreate',
	    value: function afterCreate() {
	      this.getMini = this.getMini.bind(this);
	      this.exitMini = this.exitMini.bind(this);
	      this.bind(['click', 'touchend'], this.getMini);
	    }
	  }, {
	    key: 'getMini',
	    value: function getMini() {
	      this.config.onClick && this.config.onClick();
	    }
	  }, {
	    key: 'exitMini',
	    value: function exitMini() {
	      this.config.onClick && this.config.onClick();
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.unbind(['click', 'touchend'], this.getMini);
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
	      return '\n      <xg-icon class="xgplayer-miniicon">\n      <div class="xgplayer-icon btn-definition"><span class="icon-text">' + text + '</span></div>\n      </xg-icon>';
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'miniscreenIcon';
	    }
	  }, {
	    key: 'defaultConfig',
	    get: function get() {
	      return {
	        position: POSITIONS$1.CONTROLS_RIGTH,
	        index: 10
	      };
	    }
	  }]);

	  return MiniScreenIcon;
	}(Plugin);

	var _createClass$8 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$9(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$6(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$6(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Util$1 = Plugin.Util,
	    Events$1 = Plugin.Events;

	var MiniScreen = function (_Plugin) {
	  _inherits$6(MiniScreen, _Plugin);

	  _createClass$8(MiniScreen, null, [{
	    key: 'pluginName',
	    get: function get() {
	      return 'miniscreen';
	    }
	  }, {
	    key: 'defaultConfig',
	    get: function get() {
	      return {
	        disable: false,
	        width: 320,
	        height: 180,
	        left: -1, // 默认左下角
	        top: -1, // 默认左下角
	        isShowIcon: false, // 是否显示icon
	        isScrollSwitch: false, // 滚动自动切换自动切换
	        scrollTop: 0, // 触发滚动的高度
	        disableDrag: false // 禁用拖拽
	      };
	    }
	  }]);

	  function MiniScreen(args) {
	    _classCallCheck$9(this, MiniScreen);

	    var _this = _possibleConstructorReturn$6(this, (MiniScreen.__proto__ || Object.getPrototypeOf(MiniScreen)).call(this, args));

	    _this.isMini = false;
	    var config = _this.config;

	    _this.pos = {
	      left: config.left < 0 ? window.innerWidth - config.width - 20 : config.left,
	      top: config.top < 0 ? window.innerHeight - config.height - 20 : config.top,
	      height: _this.config.height,
	      width: _this.config.width
	    };
	    _this.coordinate = {
	      currentX: 0,
	      currentY: 0,
	      scrollY: window.scrollY || 0
	    };
	    _this.lastStyle = null;
	    _this.isMoveing = false;
	    return _this;
	  }

	  _createClass$8(MiniScreen, [{
	    key: 'beforeCreate',
	    value: function beforeCreate(args) {
	      if (typeof args.player.config.mini === 'boolean') {
	        args.config.isShowIcon = args.player.config.mini;
	      }
	    }
	  }, {
	    key: 'afterCreate',
	    value: function afterCreate() {
	      var _this2 = this;

	      var bindFunKeys = ['onMousemove', 'onMousedown', 'onMouseup', 'onCancelClick', 'onCenterClick', 'onScroll'];
	      bindFunKeys.map(function (key) {
	        _this2[key] = _this2[key].bind(_this2);
	      });
	      this.on(Events$1.PAUSE, function () {
	        var btn = _this2.find('.play-icon');
	        Util$1.addClass(btn, 'pause');
	        Util$1.removeClass(btn, 'play');
	      });
	      this.on(Events$1.PLAY, function () {
	        var btn = _this2.find('.play-icon');
	        Util$1.addClass(btn, 'play');
	        Util$1.removeClass(btn, 'pause');
	      });
	    }
	  }, {
	    key: 'onPluginsReady',
	    value: function onPluginsReady() {
	      var _this3 = this;

	      var player = this.player,
	          config = this.config;

	      if (config.disable) {
	        return;
	      }
	      if (this.config.isShowIcon) {
	        var options = {
	          config: {
	            onClick: function onClick() {
	              _this3.getMini();
	            }
	          }
	        };
	        this.miniIcon = player.controls.registerPlugin(MiniScreenIcon, options, MiniScreenIcon.pluginName);
	      }
	      this.bind('.mini-cancel-btn', 'click', this.onCancelClick);
	      this.bind('.play-icon', 'click', this.onCenterClick);
	      if (!this.config.disableDrag) {
	        this.bind('mousedown', this.onMousedown);
	      }
	      if (this.config.isScrollSwitch) {
	        window.addEventListener('scroll', this.onScroll);
	      }
	    }
	  }, {
	    key: 'onCancelClick',
	    value: function onCancelClick(e) {
	      this.exitMini();
	    }
	  }, {
	    key: 'onCenterClick',
	    value: function onCenterClick(e) {
	      var player = this.player;

	      player.paused ? player.play() : player.pause();
	    }
	  }, {
	    key: 'getCss',
	    value: function getCss(o, key) {
	      return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
	    }
	  }, {
	    key: 'onScroll',
	    value: function onScroll(e) {
	      if (!window.scrollY && window.scrollY !== 0 || Math.abs(window.scrollY - this.coordinate.scrollY) < 50) {
	        return;
	      }
	      var scrollHeight = parseInt(this.getCss(this.player.root, 'height'));
	      scrollHeight += this.config.scrollTop;
	      this.coordinate.scrollY = window.scrollY;
	      if (window.scrollY > scrollHeight + 5 && !this.isMini) {
	        this.getMini();
	      } else if (window.scrollY <= scrollHeight && this.isMini) {
	        this.exitMini();
	      }
	    }
	  }, {
	    key: 'onMousedown',
	    value: function onMousedown(e) {
	      if (e.target !== this.root || this.isMoveing) {
	        return;
	      }
	      this.isMoveing = true;
	      this.coordinate.currentX = e.clientX;
	      this.coordinate.currentY = e.clientY;
	      this.bind('mouseup', this.onMouseup);
	      this.bind('mousemove', this.onMousemove);
	    }
	  }, {
	    key: 'onMouseup',
	    value: function onMouseup(e) {
	      if (e.target !== this.root || !this.isMoveing) {
	        return;
	      }
	      this.isMoveing = false;
	      var target = this.config.target || this.player.root;
	      this.pos.top = parseInt(this.getCss(target, 'top'));
	      this.pos.left = parseInt(this.getCss(target, 'left'));
	      this.unbind('mousemove', this.onMousemove);
	      this.unbind('mouseup', this.onMouseup);
	    }
	  }, {
	    key: 'onMousemove',
	    value: function onMousemove(e, callback) {
	      e = e || window.event;
	      var target = this.config.target || this.player.root;
	      var maxTop = window.innerHeight - parseInt(this.getCss(target, 'height'));
	      var maxLeft = window.innerWidth - parseInt(this.getCss(target, 'width'));
	      if (this.isMoveing) {
	        var nowX = e.clientX;
	        var nowY = e.clientY;
	        var disX = nowX - this.coordinate.currentX;
	        var disY = nowY - this.coordinate.currentY;
	        var top = parseInt(this.pos.top) + disY;
	        var left = parseInt(this.pos.left) + disX;
	        if (left < 0) {
	          left = 0;
	        } else if (left > maxLeft) {
	          left = maxLeft;
	        }

	        if (top < 0) {
	          top = 0;
	        } else if (top > maxTop) {
	          top = maxTop;
	        }
	        target.style.left = left + 'px';
	        target.style.top = top + 'px';
	        if (typeof callback === 'function') {
	          callback(left, top);
	        }

	        if (e.preventDefault) {
	          e.preventDefault();
	        }
	        return false;
	      }
	    }
	  }, {
	    key: 'getMini',
	    value: function getMini() {
	      var _this4 = this;

	      if (this.isMini) {
	        return;
	      }
	      var player = this.player,
	          playerConfig = this.playerConfig;

	      var target = this.config.target || this.player.root;
	      // this.draggie.enable()
	      this.lastStyle = {};
	      Util$1.addClass(player.root, 'xgplayer-mini');
	      Object.keys(this.pos).map(function (key) {
	        _this4.lastStyle[key] = target.style[key];
	        target.style[key] = _this4.pos[key] + 'px';
	      });
	      if (playerConfig.fluid) {
	        target.style['padding-top'] = '';
	      }
	      this.emit(Events$1.MINI_STATE_CHANGE, true);
	      player.isMini = this.isMini = true;
	    }
	  }, {
	    key: 'exitMini',
	    value: function exitMini() {
	      var _this5 = this;

	      if (!this.isMini) {
	        return false;
	      }
	      var player = this.player,
	          playerConfig = this.playerConfig;

	      var target = this.config.target || this.player.root;
	      Util$1.removeClass(player.root, 'xgplayer-mini');
	      if (this.lastStyle) {
	        Object.keys(this.lastStyle).map(function (key) {
	          target.style[key] = _this5.lastStyle[key];
	        });
	      }
	      this.lastStyle = null;
	      if (playerConfig.fluid) {
	        player.root.style['width'] = '100%';
	        player.root.style['height'] = '0';
	        player.root.style['padding-top'] = playerConfig.height * 100 / playerConfig.width + '%';
	      }
	      this.emit(Events$1.MINI_STATE_CHANGE, false);
	      this.isMini = player.isMini = false;
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.unbind('mousedown', this.onMousedown);
	      window.removeEventListener('scroll', this.onScroll);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.config.disable) {
	        return;
	      }
	      return '\n      <xg-mini-layer class="xg-mini-layer">\n      <div class="mask"></div>\n      <xg-mini-header class="xgplayer-mini-header">\n        <div>\u6309\u4F4F\u753B\u9762\u53EF\u79FB\u52A8\u5C0F\u7A97</div>\n      </xg-mini-header>\n      <div class="mini-cancel-btn">X</div>\n      <div class="play-icon play">\n        ' + PauseSvg + '\n        ' + PlaySvg + '\n      </div>\n      </xg-mini-layer>';
	    }
	  }]);

	  return MiniScreen;
	}(Plugin);

	var _createClass$9 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get$3 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck$a(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$7(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$7(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	var Events$2 = Plugin.Events,
	    Util$2 = Plugin.Util,
	    POSITIONS$2 = Plugin.POSITIONS;

	var Controls$1 = function (_Plugin) {
	  _inherits$7(Controls, _Plugin);

	  function Controls() {
	    _classCallCheck$a(this, Controls);

	    return _possibleConstructorReturn$7(this, (Controls.__proto__ || Object.getPrototypeOf(Controls)).apply(this, arguments));
	  }

	  _createClass$9(Controls, [{
	    key: 'beforeCreate',
	    value: function beforeCreate(args) {
	      if (typeof args.player.config.controls === 'boolean') {
	        args.config.disable = !args.player.config.controls;
	      }
	    }
	  }, {
	    key: 'afterCreate',
	    value: function afterCreate() {
	      var _this2 = this;

	      if (this.config.disable) {
	        return;
	      }
	      var height = this.config.height;

	      var style = {
	        height: height + 'px'
	      };
	      Object.keys(style).map(function (key) {
	        _this2.root.style[key] = style[key];
	      });
	      this.left = this.find('left-grid');
	      this.center = this.find('center');
	      this.right = this.find('right-grid');
	      this.on(Events$2.MINI_STATE_CHANGE, function (isMini) {
	        isMini ? Util$2.addClass(_this2.root, 'mini') : Util$2.removeClass(_this2.root, 'mini');
	      });
	      this.bind('mouseenter', function (e) {
	        _this2.mouseEnter(e);
	      });
	      this.bind('mouseou', function (e) {
	        _this2.mouseOut(e);
	      });
	    }
	  }, {
	    key: 'mouseEnter',
	    value: function mouseEnter() {
	      console.log('mouseenter');
	    }
	  }, {
	    key: 'mouseOut',
	    value: function mouseOut() {
	      console.log('mouseout');
	    }
	  }, {
	    key: 'showTips',
	    value: function showTips() {}
	  }, {
	    key: 'registerPlugin',
	    value: function registerPlugin(plugin) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var name = arguments[2];

	      if (!this.root) {
	        return;
	      }
	      if (!options.root) {
	        var position = options.config && options.config.position ? options.config.position : plugin.defaultConfig.position;
	        switch (position) {
	          case POSITIONS$2.CONTROLS_LEFT:
	            options.root = this.left;
	            break;
	          case POSITIONS$2.CONTROLS_RIGTH:
	            options.root = this.right;
	            break;
	          case POSITIONS$2.CONTROLS_CENTER:
	            options.root = this.center;
	            break;
	          default:
	            options.root = this.left;
	        }
	        return _get$3(Controls.prototype.__proto__ || Object.getPrototypeOf(Controls.prototype), 'registerPlugin', this).call(this, plugin, options, name);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.config.disable) {
	        return;
	      }
	      return '<xg-controls class="xgplayer-controls" unselectable="on" onselectstart="return false">\n    <left-grid class="left-grid">\n    </Left-grid>\n    <center class="center"></center>\n    <right-grid class="right-grid">\n    </right-grid>\n    </xg-controls>';
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'Controls';
	    }
	  }, {
	    key: 'defaultConfig',
	    get: function get() {
	      return {
	        disable: false
	      };
	    }
	  }]);

	  return Controls;
	}(Plugin);

	var Next = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\">\n  <path transform=\"scale(0.038 0.028)\" d=\"M800 380v768h-128v-352l-320 320v-704l320 320v-352z\"></path>\n</svg>\n";

	var _createClass$a = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$b(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$8(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$8(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	// import Next from '../assets/mPlayNext.svg';
	// console.log(MPlayNext)
	var POSITIONS$3 = Plugin.POSITIONS,
	    Sniffer = Plugin.Sniffer;

	var PlayNextIcon = function (_Plugin) {
	  _inherits$8(PlayNextIcon, _Plugin);

	  _createClass$a(PlayNextIcon, null, [{
	    key: 'pluginName',
	    get: function get() {
	      return 'PlayNext';
	    }
	  }, {
	    key: 'defaultConfig',
	    get: function get() {
	      return {
	        position: POSITIONS$3.CONTROLS_LEFT,
	        index: 1,
	        url: null,
	        urlList: []
	      };
	    }
	  }]);

	  function PlayNextIcon(options) {
	    _classCallCheck$b(this, PlayNextIcon);

	    var _this = _possibleConstructorReturn$8(this, (PlayNextIcon.__proto__ || Object.getPrototypeOf(PlayNextIcon)).call(this, options));

	    _this.idx = -1;
	    return _this;
	  }

	  _createClass$a(PlayNextIcon, [{
	    key: 'afterCreate',
	    value: function afterCreate() {
	      if (!this.config.urlList || this.config.urlList.length === 0) {
	        return;
	      }
	      this.initEvents();
	    }
	  }, {
	    key: 'initEvents',
	    value: function initEvents() {
	      this.playNext = this.playNext.bind(this);
	      var event = Sniffer.device === 'mobile' ? 'touchend' : 'click';
	      this.bind(event, this.playNext);
	      this.show();
	    }
	  }, {
	    key: 'playNext',
	    value: function playNext() {
	      var player = this.player;

	      if (this.idx + 1 < this.config.urlList.length) {
	        this.idx++;
	        player.video.pause();
	        player.currentTime = 0;
	        player.video.autoplay = true;
	        player.src = this.config.urlList[this.idx];
	        player.emit('playerNext', this.idx + 1);
	      } else {
	        player.emit('urlList last');
	      }
	    }
	  }, {
	    key: 'registerIcons',
	    value: function registerIcons() {
	      return {
	        playNext: Next
	      };
	    }
	  }, {
	    key: 'registerLangauageTexts',
	    value: function registerLangauageTexts() {
	      return {
	        'playNext': {
	          jp: 'play',
	          en: 'play',
	          zh: '播放'
	        }
	      };
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.unbind(['touchend', 'click'], this.playNext);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (!this.config.urlList || this.config.urlList.length === 0) {
	        return;
	      }
	      return '\n     <xg-icon class="xgplayer-playnext">\n      <div class="xgplayer-icon">\n        ' + this.icons.playNext + '\n      </div>\n      <div class="xg-tips">' + this.text.playNext + '</div>\n     </xg-icon>\n    ';
	    }
	  }]);

	  return PlayNextIcon;
	}(Plugin);

	var _createClass$b = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$c(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$9(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$9(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	var Events$3 = BasePlugin.Events,
	    Util$3 = BasePlugin.Util;

	var PCPlugin = function (_BasePlugin) {
	  _inherits$9(PCPlugin, _BasePlugin);

	  function PCPlugin() {
	    _classCallCheck$c(this, PCPlugin);

	    return _possibleConstructorReturn$9(this, (PCPlugin.__proto__ || Object.getPrototypeOf(PCPlugin)).apply(this, arguments));
	  }

	  _createClass$b(PCPlugin, [{
	    key: 'afterCreate',
	    value: function afterCreate() {
	      var _this2 = this;

	      var eventHandlers = ['onVideoClick', 'onVideoDblClick', 'onMouseEnter', 'onMouseLeave', 'onControlMouseEnter', 'onControlMouseLeave', 'onContextmenu'];
	      eventHandlers.map(function (key) {
	        if (_this2[key]) {
	          _this2[key] = _this2[key].bind(_this2);
	        }
	      });
	      // this.onVideoClick = this.onVideoClick.bind(this)
	      // this.onVideoDblClick = this.onVideoDblClick.bind(this)
	      // this.onMouseEnter = this.onMouseEnter.bind(this)
	      // this.onMouseLeave = this.onMouseLeave.bind(this)
	      // this.onControlMouseEnter = this.onControlMouseEnter.bind(this)
	      // this.onControlMouseLeave = this.onControlMouseLeave.bind(this)
	      this.initEvents();
	      var playerConfig = this.playerConfig;

	      if (playerConfig.autoplay) {
	        this.onEnter();
	      }
	    }
	  }, {
	    key: 'initEvents',
	    value: function initEvents() {
	      var _this3 = this;

	      var player = this.player;


	      player.video.addEventListener('click', this.onVideoClick, false);

	      player.video.addEventListener('dblclick', this.onVideoDblClick, false);
	      player.root.addEventListener('contextmenu', this.onContextmenu, false);
	      this.once(Events$3.CANPLAY, this.onEntered.bind(this));
	      this.once(Events$3.AUTOPLAY_PREVENTED, function () {
	        _this3.onAutoPlayPrevented();
	      });

	      player.root.addEventListener('mouseenter', this.onMouseEnter);

	      player.root.addEventListener('mouseleave', this.onMouseLeave);

	      // player.controls.addEventListener('mouseenter', this.onControlMouseEnter, false)

	      // player.controls.addEventListener('mouseleave', this.onControlMouseLeave, false)
	    }
	  }, {
	    key: 'onContextmenu',
	    value: function onContextmenu(e) {
	      e = e || window.event;
	      if (e.preventDefault) {
	        e.preventDefault();
	      }
	      if (e.stopPropagation) {
	        e.stopPropagation();
	      } else {
	        e.returnValue = false; // 解决IE8右键弹出
	        e.cancelBubble = true;
	      }
	    }
	  }, {
	    key: 'onEnter',
	    value: function onEnter() {
	      var player = this.player;

	      Util$3.addClass(player.root, 'xgplayer-is-enter');
	    }
	  }, {
	    key: 'onEntered',
	    value: function onEntered() {
	      var player = this.player;

	      Util$3.removeClass(player.root, 'xgplayer-is-enter');
	    }
	  }, {
	    key: 'onAutoPlayPrevented',
	    value: function onAutoPlayPrevented() {
	      var _this4 = this;

	      var player = this.player;

	      Util$3.removeClass(player.root, 'xgplayer-is-enter');
	      this.once(Events$3.PLAY, function () {
	        Util$3.addClass(player.root, 'xgplayer-is-enter');
	        _this4.once(Events$3.TIME_UPDATE, function () {
	          Util$3.removeClass(player.root, 'xgplayer-is-enter');
	        });
	      });
	    }
	  }, {
	    key: 'onVideoClick',
	    value: function onVideoClick(e) {
	      e.preventDefault();
	      // e.stopPropagation()
	      if (!this.config.closeVideoStopPropagation) {
	        e.stopPropagation();
	      }
	      var player = this.player;

	      var clk = 0;var timer = void 0;
	      if (!player.config.closeVideoClick) {
	        clk++;
	        if (timer) {
	          clearTimeout(timer);
	        }
	        if (clk === 1) {
	          timer = setTimeout(function () {
	            if (Util$3.hasClass(player.root, 'xgplayer-nostart')) {
	              return false;
	            } else if (!player.ended) {
	              if (player.paused) {
	                player.play();
	                // let playPromise = player.play()
	                // if (playPromise !== undefined && playPromise) {
	                //   playPromise.catch(err => {})
	                // }
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
	        player.fullscreen ? player.exitFullscreen() : player.getFullscreen();
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
	    key: 'destroy',
	    value: function destroy() {
	      var player = this.player;

	      player.root.removeEventListener('mouseenter', this.onMouseEnter);
	      player.root.removeEventListener('mouseleave', this.onMouseLeave);
	      player.off('ready', this.onReady);
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'pc';
	    }
	  }]);

	  return PCPlugin;
	}(BasePlugin);

	var _createClass$c = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$d(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$a(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$a(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MobilePlugin = function (_Plugin) {
	  _inherits$a(MobilePlugin, _Plugin);

	  _createClass$c(MobilePlugin, null, [{
	    key: 'pluginName',
	    get: function get() {
	      return 'mobile';
	    }
	  }, {
	    key: 'defaultConfig',
	    get: function get() {
	      return {
	        index: 0
	      };
	    }
	  }]);

	  function MobilePlugin(options) {
	    _classCallCheck$d(this, MobilePlugin);

	    var _this = _possibleConstructorReturn$a(this, (MobilePlugin.__proto__ || Object.getPrototypeOf(MobilePlugin)).call(this, options));

	    _this.isTouchMove = false;
	    return _this;
	  }

	  _createClass$c(MobilePlugin, [{
	    key: 'afterCreate',
	    value: function afterCreate() {
	      var _this2 = this;

	      var player = this.player;

	      player.video.addEventListener('touchend', function (e) {
	        _this2.onTouchEnd(e);
	      }, false);

	      player.video.addEventListener('touchstart', function () {
	        _this2.isTouchMove = false;
	      });

	      player.video.addEventListener('touchmove', function () {
	        _this2.isTouchMove = true;
	      });
	    }
	  }, {
	    key: 'onTouchEnd',
	    value: function onTouchEnd(e) {
	      e.preventDefault();
	      var util = Plugin.Util;
	      e.stopPropagation();
	      var player = this.player,
	          playerConfig = this.playerConfig;

	      if (util.hasClass(player.root, 'xgplayer-inactive')) {
	        player.emit('focus');
	      } else {
	        player.emit('blur');
	      }
	      if (!playerConfig.closeVideoTouch && !player.isTouchMove) {
	        if (util.hasClass(player.root, 'xgplayer-nostart')) {
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
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return '\n     <xg-trigger></xg-trigger>\n    ';
	    }
	  }]);

	  return MobilePlugin;
	}(Plugin);

	var _createClass$d = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$e(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$b(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$b(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PlaceHolderPlugin = function (_BasePlugin) {
	  _inherits$b(PlaceHolderPlugin, _BasePlugin);

	  function PlaceHolderPlugin() {
	    _classCallCheck$e(this, PlaceHolderPlugin);

	    return _possibleConstructorReturn$b(this, (PlaceHolderPlugin.__proto__ || Object.getPrototypeOf(PlaceHolderPlugin)).apply(this, arguments));
	  }

	  _createClass$d(PlaceHolderPlugin, [{
	    key: 'render',
	    value: function render() {
	      return '<xg-placeholder class="xgplayer-placeholder">\n    </xg-placeholder>';
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'placeholder';
	    }
	  }]);

	  return PlaceHolderPlugin;
	}(BasePlugin);

	var _createClass$e = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$f(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$c(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$c(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AnimateMap = {};
	function addAnimate(key, seconds) {
	  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { start: null, end: null };

	  if (AnimateMap[key]) {
	    window.clearTimeout(AnimateMap[key].id);
	  }
	  AnimateMap[key] = {};
	  callback.start && callback.start();
	  AnimateMap[key].id = window.setTimeout(function () {
	    callback.end && callback.end();
	    window.clearTimeout(AnimateMap[key].id);
	    delete AnimateMap[key];
	  }, seconds);
	}

	var Util$4 = Plugin.Util,
	    Events$4 = Plugin.Events;

	var Start = function (_Plugin) {
	  _inherits$c(Start, _Plugin);

	  function Start() {
	    _classCallCheck$f(this, Start);

	    return _possibleConstructorReturn$c(this, (Start.__proto__ || Object.getPrototypeOf(Start)).apply(this, arguments));
	  }

	  _createClass$e(Start, [{
	    key: 'afterCreate',
	    value: function afterCreate() {
	      var _this2 = this;

	      var player = this.player,
	          root = this.root,
	          playerConfig = this.playerConfig;

	      this.once(Events$4.READY, function () {
	        if (playerConfig) {
	          if (playerConfig.lang && playerConfig.lang === 'en') {
	            Util$4.addClass(root, 'lang-is-en');
	          } else if (playerConfig.lang === 'jp') {
	            Util$4.addClass(root, 'lang-is-jp');
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
	      this.on([Events$4.PLAY, Events$4.PAUSE], function () {
	        _this2.animate();
	      });
	      this.on(Events$4.AUTOPLAY_PREVENTED, function () {
	        _this2.show('inline-block');
	        _this2.animate(true);
	      });
	    }
	  }, {
	    key: 'registerIcons',
	    value: function registerIcons() {
	      return {
	        play: PlaySvg,
	        pause: PauseSvg
	      };
	    }
	  }, {
	    key: 'animate',
	    value: function animate(isShowEnded) {
	      var _this3 = this;

	      if (this.config.isShowPause && (isShowEnded || this.player.paused)) {
	        this.show();
	        this.root.innerHTML = this.icons.play;
	        return;
	      }
	      addAnimate('pauseplay', 400, {
	        start: function start() {
	          Util$4.addClass(_this3.root, 'interact');
	          _this3.show();
	          _this3.root.innerHTML = _this3.player.paused ? _this3.icons.pause : _this3.icons.play;
	        },
	        end: function end() {
	          Util$4.removeClass(_this3.root, 'interact');
	          if (_this3.config.isShowPause && (_this3.player.paused || isShowEnded)) {
	            return;
	          }
	          _this3.hide();
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return '\n    <xg-start class="xgplayer-start" >\n      <div class="play">\n      ' + this.icons.play + '\n      </div>\n    </xg-start>';
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'start';
	    }
	  }, {
	    key: 'defaultConfig',
	    get: function get() {
	      return {
	        isShowPause: false
	      };
	    }
	  }]);

	  return Start;
	}(Plugin);

	var _createClass$f = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$g(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$d(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$d(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TextTrackPlugin = function (_BasePlugin) {
	  _inherits$d(TextTrackPlugin, _BasePlugin);

	  function TextTrackPlugin() {
	    _classCallCheck$g(this, TextTrackPlugin);

	    return _possibleConstructorReturn$d(this, (TextTrackPlugin.__proto__ || Object.getPrototypeOf(TextTrackPlugin)).apply(this, arguments));
	  }

	  _createClass$f(TextTrackPlugin, [{
	    key: 'afterCreate',
	    value: function afterCreate() {
	      var config = this.config,
	          player = this.player;

	      var options = config;
	      var textTrackDom = '';
	      if (options.textTrack && Array.isArray(options.textTrack) && (navigator.userAgent.indexOf('Chrome') > -1 || navigator.userAgent.indexOf('Firefox') > -1)) {
	        options.textTrack.some(function (track) {
	          if (track.src && track.label && track.default) {
	            textTrackDom += '<track src="' + track.src + '" ';
	            if (track.kind) {
	              textTrackDom += 'kind="' + track.kind + '" ';
	            }
	            textTrackDom += 'label="' + track.label + '" ';
	            if (track.srclang) {
	              textTrackDom += 'srclang="' + track.srclang + '" ';
	            }
	            textTrackDom += (track.default ? 'default' : '') + '>';
	            return true;
	          }
	        });
	        this.videoConfig.crossorigin = 'anonymous';
	      }
	      if (options.textTrackStyle) {
	        var style = document.createElement('style');
	        this.textTrackStyle = style;
	        document.head.appendChild(style);
	        var styleStr = '';
	        for (var index in options.textTrackStyle) {
	          styleStr += index + ': ' + options.textTrackStyle[index] + ';';
	        }
	        var wrap = options.id ? '#' + options.id : options.el.id ? '#' + options.el.id : '.' + options.el.className;
	        if (style.sheet.insertRule) {
	          style.sheet.insertRule(wrap + ' video::cue { ' + styleStr + ' }', 0);
	        } else if (style.sheet.addRule) {
	          style.sheet.addRule(wrap + ' video::cue', styleStr);
	        }
	      }
	      if (player.video) {
	        player.video.insertAdjacentHTML('afterbegin', textTrackDom);
	      }
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'textTrack';
	    }
	  }]);

	  return TextTrackPlugin;
	}(BasePlugin);

	var _createClass$g = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$h(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BasePlugin$1 = function () {
	  _createClass$g(BasePlugin, null, [{
	    key: 'defineGetterOrSetter',
	    value: function defineGetterOrSetter(Obj, map) {
	      for (var key in map) {
	        Object.defineProperty(Obj, key, map[key]);
	      }
	    }
	  }]);

	  function BasePlugin(args) {
	    _classCallCheck$h(this, BasePlugin);

	    if (util.checkIsFunction(this.beforeCreate)) {
	      this.beforeCreate(args);
	    }
	    this.__args = args;
	    this.__events = {}; // 对player的事件监听缓存
	    this.config = args.config || {};
	    this.__init(args);
	  }

	  _createClass$g(BasePlugin, [{
	    key: 'onPluginsReady',
	    value: function onPluginsReady() {}
	  }, {
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

	BasePlugin$1.Util = util;
	BasePlugin$1.Sniffer = sniffer;
	BasePlugin$1.Errors = Errors;
	BasePlugin$1.Events = event;

	/**
	* a plugins manager to register and search
	**/
	var pluginsManager$1 = {
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
	   * register a lazy plugin
	   * @param { object } player instance
	   * @param { object } lazyPlugin config
	   *
	   */
	  lazyRegister: function lazyRegister(player, lazyPlugin) {
	    var _this = this;

	    var timeout = lazyPlugin.timeout || 1500;
	    return Promise.race([lazyPlugin.loader().then(function (plugin) {
	      var result = void 0;
	      if (plugin && plugin.__esModule) {
	        result = plugin.default;
	      } else {
	        result = plugin;
	      }
	      _this.register(player, result, plugin.options);
	    }), new Promise(function (resolve, reject) {
	      setTimeout(function () {
	        reject(new Error('timeout'));
	      }, timeout);
	    })]);
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

	    var pluginName = options.pluginName || plugin.pluginName;
	    if (!pluginName) {
	      throw new Error('The property pluginName is necessary');
	    }

	    if (plugin.isSupported && !plugin.isSupported()) {
	      console.warn('not supported plugin [' + pluginName + ']');
	      return;
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

	      // 复制插件的默认配置项
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

	    if (plugin.defaultConfig) {
	      Object.keys(plugin.defaultConfig).map(function (key) {
	        if (typeof options.config[key] === 'undefined') {
	          options.config[key] = plugin.defaultConfig[key];
	        }
	      });
	    }

	    // 获取插件添加的父节点
	    if (!options.root) {
	      options.root = player.root;
	    } else if (typeof options.root === 'string') {
	      options.root = player[options.root];
	    }

	    options.index = options.config.index || 0;
	    try {
	      // eslint-disable-next-line new-cap
	      var _instance = new plugin(options);
	      plugins[pluginName.toLowerCase()] = _instance;
	      plugins[pluginName.toLowerCase()].func = plugin;
	      if (_instance && typeof _instance.afterCreate === 'function') {
	        _instance.afterCreate();
	      }
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
	    var _this2 = this;

	    console.log('beforeInit');
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
	      if (!_this2.pluginGroup) {
	        return;
	      }

	      var prevTask = void 0;
	      if (player._loadingPlugins && player._loadingPlugins.length) {
	        prevTask = Promise.all(player._loadingPlugins);
	      } else {
	        prevTask = Promise.resolve();
	      }

	      return prevTask.then(function () {
	        var cgid = player._pluginInfoId;
	        var plugins = _this2.pluginGroup[cgid]._plugins;
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

	        Promise.all([].concat(pluginsRet)).then(function () {
	          resolve();
	        }).catch(function (e) {
	          console.error(e);
	          resolve();
	        });
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
	  onPluginsReady: function onPluginsReady(player) {
	    var cgid = player._pluginInfoId;
	    var plugins = this.pluginGroup[cgid]._plugins;
	    if (!cgid || !plugins) {
	      return;
	    }
	    Object.keys(plugins).map(function (key) {
	      if (plugins[key].onPluginsReady && typeof plugins[key].onPluginsReady === 'function') {
	        plugins[key].onPluginsReady();
	      }
	    });
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

	var _typeof$2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _get$4 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass$h = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$i(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$e(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$e(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _createElement$1(tag, name) {
	  var dom = document.createElement(tag);
	  dom.className = name;
	  return dom;
	}

	function registerIconsObj$1(iconsConfig, plugin) {
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

	function registerTextObj$1(textConfig, plugin) {
	  Object.keys(textConfig).map(function (key) {
	    Object.defineProperty(plugin.text, key, {
	      get: function get() {
	        var lang = plugin.playerConfig.lang || 'zh';
	        if (lang.indexOf('-') > 0) {
	          lang = lang.split('-')[0];
	        }
	        return textConfig[key][lang];
	      }
	    });
	  });
	}

	var Plugin$1 = function (_BasePlugin) {
	  _inherits$e(Plugin, _BasePlugin);

	  _createClass$h(Plugin, null, [{
	    key: 'insert',

	    /**
	      * 插入dom结构
	      * @param {String} html html字符串或者dom
	      * @param {DocumentElemebt } parent
	      * @param {*} index
	      */
	    value: function insert(html, parent, index) {
	      var len = parent.children.length;
	      var insertIdx = parseInt(index);
	      var isDomElement = html instanceof window.HTMLElement;
	      if (typeof index === 'undefined' || len <= insertIdx) {
	        isDomElement ? parent.appendChild(html) : parent.insertAdjacentHTML('beforeend', html);
	        return parent.children[parent.children.length - 1];
	      } else if (insertIdx === 0) {
	        isDomElement ? parent.insertBefore(html, parent.children.length > 0 ? parent.children[0] : null) : parent.insertAdjacentHTML('afterbegin', html);
	        return parent.children[0];
	      }
	      var el = parent.children[insertIdx];
	      if (el && el.insertAdjacentHTML) {
	        isDomElement ? parent.insertBefore(html, el) : el.insertAdjacentHTML('beforebegin', html);
	        return parent.children[insertIdx];
	      }
	    }
	  }, {
	    key: 'defaultConfig',
	    get: function get() {
	      return {};
	    }
	  }]);

	  function Plugin() {
	    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck$i(this, Plugin);

	    return _possibleConstructorReturn$e(this, (Plugin.__proto__ || Object.getPrototypeOf(Plugin)).call(this, args));
	  }

	  _createClass$h(Plugin, [{
	    key: '__init',
	    value: function __init(args) {
	      _get$4(Plugin.prototype.__proto__ || Object.getPrototypeOf(Plugin.prototype), '__init', this).call(this, args);
	      var _parent = args.root;
	      var _el = null;
	      this.icons = {};
	      var defaultIcons = this.registerIcons() || {};
	      registerIconsObj$1(defaultIcons, this);

	      this.text = {};
	      var defaultTexConfig = this.registerLangauageTexts() || {};
	      registerTextObj$1(defaultTexConfig, this);
	      var renderStr = '';
	      try {
	        renderStr = this.render();
	      } catch (e) {
	        throw new Error('Plugin:' + this.pluginName + ':render:' + e.message);
	      }
	      if (renderStr) {
	        _el = Plugin.insert(renderStr, _parent, args.index);
	      } else if (args.tag) {
	        _el = _createElement$1(args.tag, args.name);
	        _parent.appendChild(_el);
	      } else {
	        return;
	      }

	      Plugin.defineGetterOrSetter(this, {
	        'root': {
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
	      if (this.config.index) {
	        this.root.setAttribute('data-index', this.config.index);
	      }
	      this.__registeChildren();
	    }
	  }, {
	    key: '__registeChildren',
	    value: function __registeChildren() {
	      if (!this.root) {
	        return;
	      }
	      var children = this.children();
	      if (children && (typeof children === 'undefined' ? 'undefined' : _typeof$2(children)) === 'object') {
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
	              var options = {
	                root: this.root
	                // eslint-disable-next-line no-unused-vars
	              };var config = void 0,
	                  _Plugin = void 0;
	              if (typeof _plugin === 'function') {
	                config = this.config[name] || {};
	                _Plugin = _plugin;
	              } else if ((typeof _plugin === 'undefined' ? 'undefined' : _typeof$2(_plugin)) === 'object' && typeof _plugin.plugin === 'function') {
	                config = _plugin.options ? BasePlugin$1.Util.deepCopy(this.config[name] || {}, _plugin.options) : this.config[name] || {};
	                _Plugin = _plugin.plugin;
	              }
	              options.config = config;
	              config.index !== undefined && (options.index = config.index);
	              config.root && (options.root = config.root);
	              var c = this.registerPlugin(_Plugin, options, name);
	              this._children.push(c);
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
	    key: 'registerPlugin',
	    value: function registerPlugin(plugin) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

	      options.root = options.root || this.root;
	      name && (options.pluginName = name);
	      var _c = pluginsManager$1.register(this.player, plugin, options);
	      this._children.push(_c);
	      return _c;
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
	      return pluginsManager$1.findPlugin(this.player, name);
	    }
	  }, {
	    key: 'find',
	    value: function find(qs) {
	      if (!this.root) {
	        return;
	      }
	      return this.root.querySelector(qs);
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
	        if (!this.root) {
	          return;
	        }
	        if (Array.isArray(eventType)) {
	          eventType.forEach(function (item) {
	            bind$1(_this2.root, querySelector, item, callback, false);
	          });
	        } else {
	          bind$1(this.root, querySelector, eventType, callback, false);
	        }
	      }
	    }
	  }, {
	    key: 'unbind',
	    value: function unbind(querySelector, eventType, callback) {
	      var _this3 = this;

	      // if no querySelector passed to the method
	      if (arguments.length < 3 && typeof eventType === 'function') {
	        if (Array.isArray(querySelector)) {
	          querySelector.forEach(function (item) {
	            _this3.unbindEL(item, eventType);
	          });
	        } else {
	          this.unbindEL(querySelector, eventType);
	        }
	      } else if (typeof callback === 'function') {
	        if (Array.isArray(eventType)) {
	          eventType.forEach(function (item) {
	            unbind$1(_this3.root, querySelector, item, callback);
	          });
	        } else {
	          unbind$1(this.root, querySelector, eventType, callback);
	        }
	      }
	    }
	  }, {
	    key: 'setStyle',
	    value: function setStyle(name, value) {
	      if (!this.root) {
	        return;
	      }
	      if (typeof name === 'string') {
	        return this.root.style[name] = value;
	      } else if ((typeof name === 'undefined' ? 'undefined' : _typeof$2(name)) === 'object') {
	        var obj = name;
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;

	        try {
	          for (var _iterator2 = Object.keys(obj)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var item = _step2.value;

	            this.root.style[item] = obj[item];
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
	      if (!this.root) {
	        return;
	      }
	      if (typeof name === 'string') {
	        return this.root.setAttribute(name, value);
	      } else if ((typeof name === 'undefined' ? 'undefined' : _typeof$2(name)) === 'object') {
	        var obj = name;
	        var _iteratorNormalCompletion3 = true;
	        var _didIteratorError3 = false;
	        var _iteratorError3 = undefined;

	        try {
	          for (var _iterator3 = Object.keys(obj)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	            var item = _step3.value;

	            this.root.setAttribute(item, obj[item]);
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
	      if (!this.root) {
	        return;
	      }
	      this.root.innerHtml = htmlStr;
	      if (typeof callback === 'function') {
	        callback();
	      }
	    }
	  }, {
	    key: 'bindEL',
	    value: function bindEL(event, eventHandle) {
	      var isBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	      if (!this.root) {
	        return;
	      }
	      if ('on' + event in this.root && typeof eventHandle === 'function') {
	        this.root.addEventListener(event, eventHandle, isBubble);
	      }
	    }
	  }, {
	    key: 'unbindEL',
	    value: function unbindEL(event, eventHandle) {
	      var isBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	      if (!this.root) {
	        return;
	      }
	      if ('on' + event in this.root && typeof eventHandle === 'function') {
	        this.root.removeEventListener(event, eventHandle, isBubble);
	      }
	    }
	  }, {
	    key: 'show',
	    value: function show(value) {
	      if (!this.root) {
	        return;
	      }
	      this.root.style.display = value !== undefined ? value : 'block';
	      var cs = window.getComputedStyle(this.root, null);
	      var cssDisplayValue = cs.getPropertyValue('display');
	      if (cssDisplayValue === 'none') {
	        return this.root.style.display = 'block';
	      }
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      this.root && (this.root.style.display = 'none');
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
	      if (BasePlugin$1.Util.checkIsFunction(this.destroy)) {
	        this.destroy();
	      }
	      if (this.root) {
	        if (this.root.hasOwnProperty('remove')) {
	          this.root.remove();
	        } else if (this.root.parentNode) {
	          this.root.parentNode.removeChild(this.root);
	        }
	      }
	    }
	  }]);

	  return Plugin;
	}(BasePlugin$1);


	Plugin$1.ROOT_TYPES = {
	  CONTROLS: 'controls',
	  ROOT: 'root'
	};

	Plugin$1.POSITIONS = {
	  ROOT: 'root',
	  ROOT_LEFT: 'rootLeft',
	  ROOT_RIGHT: 'rootRight',
	  ROOT_TOP: 'rootTop',
	  CONTROLS_LEFT: 'controlsLeft',
	  CONTROLS_RIGTH: 'controlsRight',
	  CONTROLS_CENTER: 'controlsCenter'
	};

	var _createClass$i = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$j(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$f(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$f(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ErrorPlugin = function (_Plugin) {
	  _inherits$f(ErrorPlugin, _Plugin);

	  function ErrorPlugin() {
	    _classCallCheck$j(this, ErrorPlugin);

	    return _possibleConstructorReturn$f(this, (ErrorPlugin.__proto__ || Object.getPrototypeOf(ErrorPlugin)).apply(this, arguments));
	  }

	  _createClass$i(ErrorPlugin, [{
	    key: 'afterCreate',
	    value: function afterCreate() {
	      var _this2 = this;

	      this.bind('.xgplayer-error-refresh', 'click', function (e) {
	        e.preventDefault();
	        _this2.player.replay();
	        Plugin$1.Util.removeClass(_this2.player.root, 'replay');
	      });
	      this.on(Player.Events.CANPLAY, this.handleCanPlay.bind(this));
	      this.on(Player.Events.ERROR, this.handleError.bind(this));
	    }
	  }, {
	    key: 'handleCanPlay',
	    value: function handleCanPlay() {
	      Plugin$1.Util.removeClass(this.player.root, 'xgplayer-is-error');
	    }
	  }, {
	    key: 'handleError',
	    value: function handleError() {
	      var player = this.player;

	      var textDOM = this.find('.xgplayer-error-text');
	      if (player.error) {
	        textDOM.innerHTML = player.error;
	      } else {
	        if (player.config.lang && player.config.lang === 'zh-cn') {
	          textDOM.innerHTML = player.lang.ERROR;
	        } else {
	          this.root.innerHTML = player.lang.ERROR + '\uFF0Cplease try to <span class="xgplayer-error-refresh">refresh</span>';
	        }
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return '<xg-error class="xgplayer-error">\n      <em class="xgplayer-error-text"></em>\u8BF7<span class="xgplayer-error-refresh">\u5237\u65B0</span>\u8BD5\u8BD5\n    </xg-error>';
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'error';
	    }
	  }]);

	  return ErrorPlugin;
	}(Plugin$1);

	var _createClass$j = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$k(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$g(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$g(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var EnterPlugin = function (_Plugin) {
	  _inherits$g(EnterPlugin, _Plugin);

	  function EnterPlugin() {
	    _classCallCheck$k(this, EnterPlugin);

	    return _possibleConstructorReturn$g(this, (EnterPlugin.__proto__ || Object.getPrototypeOf(EnterPlugin)).apply(this, arguments));
	  }

	  _createClass$j(EnterPlugin, [{
	    key: 'render',
	    value: function render() {
	      var barStr = '';
	      for (var i = 1; i <= 12; i++) {
	        barStr += '<div class="xgplayer-enter-bar' + i + '"></div>';
	      }

	      return '<xg-enter class="xgplayer-enter"><div class="xgplayer-enter-spinner">\n      ' + barStr + '\n    </div></xg-enter>';
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'index.scss';
	    }
	  }]);

	  return EnterPlugin;
	}(Plugin);

	var _createClass$k = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$l(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$h(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$h(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Keyboard = function (_BasePlugin) {
	  _inherits$h(Keyboard, _BasePlugin);

	  function Keyboard() {
	    _classCallCheck$l(this, Keyboard);

	    return _possibleConstructorReturn$h(this, (Keyboard.__proto__ || Object.getPrototypeOf(Keyboard)).apply(this, arguments));
	  }

	  _createClass$k(Keyboard, [{
	    key: 'mergekeyCodeMap',
	    value: function mergekeyCodeMap() {
	      var _this2 = this;

	      var extendkeyCodeMap = this.config.keyCodeMap;
	      if (extendkeyCodeMap) {
	        Object.keys(extendkeyCodeMap).map(function (key) {
	          if (!_this2.keyCodeMap[key]) {
	            _this2.keyCodeMap[key] = extendkeyCodeMap[key];
	          } else {
	            ['keyCode', 'action', 'disable', 'isBodyTarget'].map(function (key1) {
	              extendkeyCodeMap[key][key1] && (_this2.keyCodeMap[key][key1] = extendkeyCodeMap[key][key1]);
	            });
	          }
	        });
	      }
	    }
	  }, {
	    key: 'afterCreate',
	    value: function afterCreate() {
	      this.config.disable = !this.playerConfig.keyShortcut;
	      this.seekStep = 10;
	      this.keyCodeMap = {
	        'space': {
	          keyCode: 32,
	          action: 'playPause',
	          disable: false,
	          noBodyTarget: false // 默认在body上触发
	        },
	        'up': {
	          keyCode: 38,
	          action: 'upVolume',
	          disable: false
	        },
	        'down': {
	          keyCode: 40,
	          action: 'downVolume',
	          disable: false
	        },
	        'left': {
	          keyCode: 37,
	          action: 'seekBack',
	          disable: false
	        },
	        'right': {
	          keyCode: 39,
	          action: 'seek',
	          disable: false
	        },
	        'esc': {
	          keyCode: 27,
	          action: 'exitFullscreen',
	          disable: false
	        }
	      };
	      this.mergekeyCodeMap();
	      this.onKeydown = this.onKeydown.bind(this);
	      this.onBodyKeyDown = this.onBodyKeyDown.bind(this);
	      this.player.root.addEventListener('keydown', this.onKeydown);
	      document.addEventListener('keydown', this.onBodyKeyDown);
	    }
	  }, {
	    key: 'afterPlayerInit',
	    value: function afterPlayerInit() {
	      var seekStep = typeof this.config.seekStep === 'function' ? this.config.seekStep(this.player) : this.config.seekStep;
	      if (!seekStep || typeof seekStep !== 'number') {
	        this.seekStep = seekStep;
	      }
	    }
	  }, {
	    key: 'checkCode',
	    value: function checkCode(code, isBodyTarget) {
	      var _this3 = this;

	      var flag = false;
	      Object.keys(this.keyCodeMap).map(function (key) {
	        if (_this3.keyCodeMap[key] && code === _this3.keyCodeMap[key].keyCode) {
	          flag = !isBodyTarget || isBodyTarget && !_this3.keyCodeMap[key].noBodyTarget;
	        }
	      });
	      return flag;
	    }
	  }, {
	    key: 'downVolume',
	    value: function downVolume() {
	      var player = this.player;

	      if (player.volume - 0.1 >= 0) {
	        player.volume = parseFloat((player.volume - 0.1).toFixed(1));
	      } else {
	        player.volume = 0;
	      }
	    }
	  }, {
	    key: 'upVolume',
	    value: function upVolume() {
	      var player = this.player;

	      if (player.volume + 0.1 <= 1) {
	        player.volume = parseFloat((player.volume + 0.1).toFixed(1));
	      } else {
	        player.volume = 1;
	      }
	    }
	  }, {
	    key: 'seek',
	    value: function seek() {
	      var player = this.player;

	      if (player.currentTime + this.seekStep <= player.duration) {
	        player.currentTime += this.seekStep;
	      } else {
	        player.currentTime = player.duration - 1;
	      }
	    }
	  }, {
	    key: 'seekBack',
	    value: function seekBack() {
	      var player = this.player;

	      if (player.currentTime - this.seekStep >= 0) {
	        player.currentTime -= this.seekStep;
	      } else {
	        player.currentTime = 0;
	      }
	    }
	  }, {
	    key: 'playPause',
	    value: function playPause() {
	      var player = this.player;

	      if (player.paused) {
	        // eslint-disable-next-line handle-callback-err
	        player.play().catch(function (err) {});
	      } else {
	        player.pause();
	      }
	    }
	  }, {
	    key: 'exitFullscreen',
	    value: function exitFullscreen() {
	      var player = this.player;

	      if (player.fullscreen) {
	        player.exitFullscreen();
	      }
	      if (player.isCssfullScreen) {
	        player.exitCssFullscreen();
	      }
	    }

	    // TODO: 多播放器实例存在的情况下，body下的快捷键会触发所有实例的逻辑，需改进

	  }, {
	    key: 'onBodyKeyDown',
	    value: function onBodyKeyDown(event) {
	      if (this.config.disable) {
	        return;
	      }
	      var e = event || window.event;
	      var keyCode = e.keyCode;
	      if (e.target === document.body && this.checkCode(keyCode, true)) {
	        e.preventDefault();
	        e.cancelBubble = true;
	        e.returnValue = false;
	        this.handleKeyCode(keyCode);
	        return false;
	      }
	      return false;
	    }
	  }, {
	    key: 'onKeydown',
	    value: function onKeydown(event) {
	      if (this.config.disable) {
	        return;
	      }
	      var player = this.player;
	      var e = event || window.event;
	      if (e && (e.keyCode === 37 || this.checkCode(e.keyCode)) && (e.target === this.player.root || e.target === this.player.video || e.target === this.player.controls.el)) {
	        player.emit('focus');
	        e.preventDefault();
	        e.cancelBubble = true;
	        e.returnValue = false;
	      } else {
	        return true;
	      }
	      this.handleKeyCode(e.keyCode);
	    }
	  }, {
	    key: 'handleKeyCode',
	    value: function handleKeyCode(keyCode) {
	      var _this4 = this;

	      var player = this.player;

	      if (keyCode === 40 || keyCode === 38) {
	        if (player.controls) ;
	      }
	      Object.keys(this.keyCodeMap).map(function (key) {
	        if (_this4.keyCodeMap[key].keyCode === keyCode && !_this4.keyCodeMap[key].disable) {
	          if (typeof _this4.keyCodeMap[key].action === 'function') {
	            _this4.keyCodeMap[key].action();
	          } else if (typeof _this4.keyCodeMap[key].action === 'string') {
	            var funKey = _this4.keyCodeMap[key].action;
	            if (typeof _this4[funKey] === 'function') {
	              _this4[funKey]();
	            }
	          }
	        }
	      });
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.player.root.removeEventListener('keydown', this.onKeydown);
	      document.removeEventListener('keydown', this.onBodyKeyDown);
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'Keyboard';
	    }
	  }, {
	    key: 'defaultConfig',
	    get: function get() {
	      return {
	        seekStep: 10,
	        keyCodeMap: {},
	        disable: false
	      };
	    }
	  }]);

	  return Keyboard;
	}(BasePlugin);



	var Plugins = /*#__PURE__*/Object.freeze({
		__proto__: null,
		Poster: Poster,
		Replay: Replay,
		Miniscreen: MiniScreen,
		Keyboard: Keyboard,
		Rotate: Controls$1,
		PlayNext: PlayNextIcon,
		PC: PCPlugin,
		Mobile: MobilePlugin,
		PlaceHolder: PlaceHolderPlugin,
		Start: Start,
		track: TextTrackPlugin,
		Error: ErrorPlugin,
		Enter: EnterPlugin
	});

	var loadingIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewbox=\"0 0 100 100\">\n  <path d=\"M100,50A50,50,0,1,1,50,0\"></path>\n</svg>\n";

	var _createClass$l = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$m(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$i(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$i(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Loading = function (_Plugin) {
	  _inherits$i(Loading, _Plugin);

	  function Loading() {
	    _classCallCheck$m(this, Loading);

	    return _possibleConstructorReturn$i(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).apply(this, arguments));
	  }

	  _createClass$l(Loading, [{
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
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'loading';
	    }
	  }]);

	  return Loading;
	}(Plugin);

	var _typeof$3 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass$m = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$n(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$j(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$j(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	var defaultDot = {
	  time: 10, // 出现的时间点
	  text: '', // hover显示的文案
	  duration: 1, // 显示时长
	  style: {}, // 指定样式
	  color: '#fff' // 颜色
	};

	var Util$5 = Plugin.Util,
	    Events$5 = Plugin.Events;

	var ProgressDot = function (_Plugin) {
	  _inherits$j(ProgressDot, _Plugin);

	  _createClass$m(ProgressDot, null, [{
	    key: 'pluginName',
	    get: function get() {
	      return 'ProgressDots';
	    }
	  }, {
	    key: 'defaultConfig',
	    get: function get() {
	      return {
	        dots: []
	      };
	    }
	  }]);

	  function ProgressDot(args) {
	    _classCallCheck$n(this, ProgressDot);

	    var _this = _possibleConstructorReturn$j(this, (ProgressDot.__proto__ || Object.getPrototypeOf(ProgressDot)).call(this, args));

	    _this.dotsList = {};
	    return _this;
	  }

	  _createClass$m(ProgressDot, [{
	    key: 'afterCreate',
	    value: function afterCreate() {
	      var _this2 = this;

	      this.once(Events$5.CANPLAY, function () {
	        var dots = _this2.config.dots;

	        if (!dots || !Array.isArray(dots)) {
	          return;
	        }
	        dots.map(function (dot) {
	          _this2.createDotDom(dot);
	        });
	        _this2.initEvents();
	      });
	    }
	  }, {
	    key: 'initEvents',
	    value: function initEvents() {
	      // this.bind('.xgplayer-progress-dot', 'mouseenter', (e) => {
	      //   console.log('mouseenter', e.target)
	      // })
	      // this.bind('.xgplayer-progress-dot', 'mouseleave', (e) => {
	      //   console.log('mouseleave', e.target)
	      // })
	    }
	  }, {
	    key: 'addDot',
	    value: function addDot(time, text, duration) {
	      var newDots = null;
	      if (arguments.length === 1 && (typeof time === 'undefined' ? 'undefined' : _typeof$3(time)) === 'object') {
	        newDots = arguments[0];
	      } else {
	        newDots = {
	          time: time,
	          text: text,
	          duration: duration
	        };
	      }
	      newDots = Util$5.deepCopy(arguments[0], defaultDot);
	      this.createDotDom(newDots);
	    }
	  }, {
	    key: 'removeDot',
	    value: function removeDot(time) {
	      var player = this.player;

	      if (time >= 0 && time <= player.duration && this.dotsList[time]) {
	        var dot = this.dotsList[time];
	        dot.parentNode.removeChild(dot);
	        dot = null;
	        this.dotsList[time] = null;
	      }
	    }
	  }, {
	    key: 'removeAllProgressDots',
	    value: function removeAllProgressDots() {
	      var _this3 = this;

	      Object.keys(this.dotsList).forEach(function (key) {
	        if (_this3.dotsList[key]) {
	          var dot = _this3.dotsList[key];
	          dot.parentNode.removeChild(dot);
	          dot = null;
	          _this3.dotsList[key] = null;
	        }
	      });
	    }
	  }, {
	    key: 'createDotDom',
	    value: function createDotDom(dot) {
	      var player = this.player;

	      var dom = Util$5.createDom('xg-progress-dot', '' + (dot.text ? '<span class="xgplayer-progress-tip">' + dot.text + '</span>' : ''), {}, 'xgplayer-progress-dot');
	      var style = dot.style || {};
	      style.left = dot.time / player.duration * 100 + '%';
	      style.width = Math.min(dot.duration, player.duration - dot.time) / player.duration * 100 + '%';
	      Object.keys(style).map(function (item) {
	        dom.style[item] = style[item];
	      });
	      this.dotsList[dot.time] = dom;
	      this.root.appendChild(dom);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return '<xg-dots></xg-dots>';
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {}
	  }]);

	  return ProgressDot;
	}(Plugin);

	var _createClass$n = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$o(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$k(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$k(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Events$6 = Plugin.Events,
	    Util$6 = Plugin.Util,
	    POSITIONS$4 = Plugin.POSITIONS,
	    Sniffer$1 = Plugin.Sniffer;


	var defaultThumbnailConfig = {
	  isShow: false,
	  urls: [],
	  pic_num: 0,
	  row: 0,
	  col: 0,
	  height: 160,
	  width: 90,
	  scale: 1

	  /**
	   * 进度条组件
	   */
	};
	var Progress = function (_Plugin) {
	  _inherits$k(Progress, _Plugin);

	  _createClass$n(Progress, null, [{
	    key: 'pluginName',
	    get: function get() {
	      return 'Progress';
	    }
	  }, {
	    key: 'defaultConfig',
	    get: function get() {
	      return {
	        position: POSITIONS$4.CONTROLS_CENTER,
	        index: 0,
	        progressDot: [],
	        thumbnail: null
	      };
	    }
	  }]);

	  function Progress(args) {
	    _classCallCheck$o(this, Progress);

	    var _this = _possibleConstructorReturn$k(this, (Progress.__proto__ || Object.getPrototypeOf(Progress)).call(this, args));

	    _this.useable = false;
	    _this.isProgressMoving = false;

	    if (_this.playerConfig.thumbnail && Sniffer$1.device !== 'mobile') {
	      _this.config.thumbnail = _this.playerConfig.thumbnail;
	    }
	    return _this;
	  }

	  _createClass$n(Progress, [{
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
	      this.pointTip = this.find('.xgplayer-progress-point');
	      this.progressBtn = this.find('.xgplayer-progress-btn');
	      this.thumbnailDom = this.find('xg-thumbnail');
	      this.initThumbnail();
	      this.on(Events$6.TIME_UPDATE, function () {
	        _this2.onTimeupdate();
	        _this2.onCacheUpdate();
	      });
	      this.on(Events$6.SEEKING, function () {
	        _this2.onTimeupdate();
	        _this2.onCacheUpdate();
	      });
	      this.on([Events$6.BUFFER_CHANGE, Events$6.ENDED], function () {
	        _this2.onCacheUpdate();
	      });
	      this.bindDomEvents();
	    }
	  }, {
	    key: 'children',
	    value: function children() {
	      return {
	        ProgressDots: {
	          plugin: ProgressDot,
	          options: {
	            root: this.find('xg-outer'),
	            dots: this.playerConfig.progressDot
	          }
	        }
	      };
	    }
	  }, {
	    key: 'initThumbnail',
	    value: function initThumbnail() {
	      var _this3 = this;

	      if (this.config.thumbnail) {
	        var thumbnail = this.config.thumbnail;

	        this.thumbnailConfig = {};
	        Object.keys(defaultThumbnailConfig).map(function (key) {
	          if (typeof thumbnail[key] === 'undefined') {
	            _this3.thumbnailConfig[key] = defaultThumbnailConfig[key];
	          } else {
	            _this3.thumbnailConfig[key] = thumbnail[key];
	          }
	        });
	        var _thumbnailConfig = this.thumbnailConfig,
	            width = _thumbnailConfig.width,
	            height = _thumbnailConfig.height,
	            scale = _thumbnailConfig.scale;

	        this.thumbnailDom.style.width = width * scale + 'px';
	        this.thumbnailDom.style.height = height * scale + 'px';
	      }
	    }
	  }, {
	    key: 'bindDomEvents',
	    value: function bindDomEvents() {
	      var _this4 = this;

	      this.mouseDown = this.mouseDown.bind(this);
	      this.mouseMove = this.mouseMove.bind(this);
	      this.mouseEnter = this.mouseEnter.bind(this);
	      this.mouseLeave = this.mouseLeave.bind(this);
	      ['touchstart', 'mousedown'].forEach(function (event) {
	        _this4.root.addEventListener(event, _this4.mouseDown);
	      });
	      this.root.addEventListener('mouseenter', this.mouseEnter, false);
	    }
	  }, {
	    key: 'mouseDown',
	    value: function mouseDown(e) {
	      var player = this.player;

	      if (player.isMini) {
	        return;
	      }
	      var self = this;
	      e.stopPropagation();
	      Util$6.event(e);
	      // this.pointTip为tip信息 不做seek操作
	      if (e.target === this.pointTip || !player.config.allowSeekAfterEnded && player.ended) {
	        return true;
	      }
	      this.root.focus();
	      var containerWidth = this.root.getBoundingClientRect().width;

	      var _playedBar$getBoundin = this.playedBar.getBoundingClientRect(),
	          left = _playedBar$getBoundin.left;

	      var move = function move(e) {
	        e.preventDefault();
	        e.stopPropagation();
	        Util$6.event(e);
	        self.isProgressMoving = true;
	        var w = e.clientX - left;
	        if (w > containerWidth) {
	          w = containerWidth;
	        }
	        var now = w / containerWidth * player.duration;
	        self.playedBar.style.width = w * 100 / containerWidth + '%';

	        if (player.videoConfig.mediaType === 'video' && !player.dash && !player.config.closeMoveSeek) {
	          player.currentTime = Number(now).toFixed(1);
	        } else {
	          self.updateTime(now);
	        }
	        player.emit('focus');
	      };
	      var up = function up(e) {
	        // e.preventDefault()
	        e.stopPropagation();
	        Util$6.event(e);
	        window.removeEventListener('mousemove', move);
	        window.removeEventListener('touchmove', move, { passive: false });
	        window.removeEventListener('mouseup', up);
	        window.removeEventListener('touchend', up);
	        self.root.blur();
	        if (!self.isProgressMoving || player.videoConfig.mediaType === 'audio' || player.dash || player.config.closeMoveSeek) {
	          var w = e.clientX - left;
	          if (w > containerWidth) {
	            w = containerWidth;
	          }
	          var now = w / containerWidth * player.duration;
	          self.playedBar.style.width = w * 100 / containerWidth + '%';
	          player.currentTime = Number(now).toFixed(1);
	        }
	        player.emit('focus');
	        self.isProgressMoving = false;
	      };
	      window.addEventListener('mousemove', move);
	      window.addEventListener('touchmove', move, { passive: false });
	      window.addEventListener('mouseup', up);
	      window.addEventListener('touchend', up);
	      return true;
	    }
	  }, {
	    key: 'mouseEnter',
	    value: function mouseEnter(e) {
	      var player = this.player;

	      if (player.isMini) {
	        return;
	      }
	      if (!player.config.allowSeekAfterEnded && player.ended) {
	        return true;
	      }
	      this.root.addEventListener('mousemove', this.mouseMove, false);
	      this.root.addEventListener('mouseleave', this.mouseLeave, false);
	    }
	  }, {
	    key: 'mouseLeave',
	    value: function mouseLeave(e) {
	      var player = this.player;

	      if (player.isMini) {
	        return;
	      }
	      this.pointTip.style.display = 'none';
	      this.thumbnailDom.style.display = 'none';
	      this.root.removeEventListener('mousemove', this.mouseMove, false);
	      this.root.removeEventListener('mouseleave', this.mouseLeave, false);
	    }
	  }, {
	    key: 'mouseMove',
	    value: function mouseMove(e) {
	      var player = this.player;

	      var left = this.root.getBoundingClientRect().left;
	      var width = this.root.getBoundingClientRect().width;
	      var now = (e.clientX - left) / width * player.duration;
	      now = now < 0 ? 0 : now;
	      this.pointTip.textContent = Util$6.format(now);
	      var pointWidth = this.pointTip.getBoundingClientRect().width;
	      var pleft = e.clientX - left - pointWidth / 2;
	      pleft = pleft > 0 ? pleft : 0;
	      pleft = pleft > width - pointWidth ? width - pointWidth : pleft;
	      this.pointTip.style.left = pleft + 'px';
	      if (e.target && e.target.className === 'xgplayer-progress-dot') {
	        this.pointTip.style.display = 'none';
	      } else {
	        this.pointTip.style.display = 'block';
	      }
	      this.updateThumbnailPosition(e, now, width);
	    }
	  }, {
	    key: 'updateThumbnailPosition',
	    value: function updateThumbnailPosition(e, now, containerWidth) {
	      var _this5 = this;

	      if (!this.config.thumbnail) {
	        return;
	      }
	      var thumbnail = this.thumbnailConfig;
	      if (!thumbnail || !thumbnail.pic_num === 0 || thumbnail.urls.length === 0) {
	        return;
	      }
	      this.interval = this.player.duration / thumbnail.pic_num;
	      var index = Math.floor(now / this.interval);
	      var urls = thumbnail.urls,
	          row = thumbnail.row,
	          col = thumbnail.col,
	          height = thumbnail.height,
	          width = thumbnail.width,
	          scale = thumbnail.scale;

	      var indexInPage = index + 1 - col * row * (Math.ceil((index + 1) / (col * row)) - 1);
	      var rowIndex = Math.ceil(indexInPage / row) - 1;
	      var colIndex = indexInPage - rowIndex * row - 1;
	      var left = e.clientX - width * scale / 2;
	      left = left > 0 ? left : 0;
	      left = left < containerWidth - width * scale ? left : containerWidth - width * scale;
	      var style = {
	        backgroundImage: 'url(' + urls[Math.ceil((index + 1) / (col * row)) - 1] + ')',
	        'background-position': '-' + colIndex * width + 'px -' + rowIndex * height + 'px',
	        left: left + 'px',
	        top: -10 - height * scale + 'px',
	        display: 'block'
	      };
	      Object.keys(style).map(function (key) {
	        _this5.thumbnailDom.style[key] = style[key];
	      });
	    }
	  }, {
	    key: 'updateTime',
	    value: function updateTime(time) {
	      var player = this.player;

	      var timeIcon = player.plugins.time;
	      if (time) {
	        timeIcon.updateTime(time);
	      }
	    }
	  }, {
	    key: 'compute',
	    value: function compute(e) {
	      var containerLeft = this.root.getBoundingClientRect().left;
	      var containerWidth = this.root.getBoundingClientRect().width;
	      var pointWidth = this.pointTip.getBoundingClientRect().width;
	      var left = e.clientX - containerLeft - pointWidth / 2;
	      left = left > 0 ? left : 0;
	      left = left > containerWidth - pointWidth ? containerWidth - pointWidth : left;
	      this.pointTip.style.left = left + 'px';
	    }
	  }, {
	    key: 'onTimeupdate',
	    value: function onTimeupdate() {
	      var player = this.player;

	      if (player.isSeeking) {
	        return;
	      }
	      if (player.videoConfig.mediaType !== 'audio' || !this.isProgressMoving || !player.dash) {
	        this.playedBar.style.width = player.currentTime * 100 / player.duration + '%';
	      }
	    }
	  }, {
	    key: 'onCacheUpdate',
	    value: function onCacheUpdate() {
	      var player = this.player;

	      var buffered = player.buffered;
	      if (buffered && buffered.length > 0) {
	        var end = buffered.end(buffered.length - 1);
	        for (var i = 0, len = buffered.length; i < len; i++) {
	          if (player.currentTime >= buffered.start(i) && player.currentTime <= buffered.end(i)) {
	            end = buffered.end(i);
	            for (var j = i + 1; j < buffered.length; j++) {
	              if (buffered.start(j) - buffered.end(j - 1) >= 2) {
	                end = buffered.end(j - 1);
	                break;
	              }
	            }
	            break;
	          }
	        }
	        this.cachedBar.style.width = end / player.duration * 100 + '%';
	      }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var _this6 = this;

	      ['touchstart', 'mousedown'].forEach(function (event) {
	        _this6.root.removeEventListener(event, _this6.mouseDown);
	      });
	      this.root.removeEventListener('mouseenter', this.mouseEnter, false);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return '\n      <xg-progress class="xgplayer-progress">\n        <xg-outer class="xgplayer-progress-outer">\n          <xg-cache class="xgplayer-progress-cache" style="width:0">\n          </xg-cache>\n          <xg-played class="xgplayer-progress-played" style="width:0">\n            <xg-progress-btn class="xgplayer-progress-btn"></xg-progress-btn>\n            <xg-point class="xgplayer-progress-point xg-tips">00:00</xg-point>\n            <xg-thumbnail class="xgplayer-progress-thumbnail xg-tips"></xg-thumbnail>\n          </xg-played>\n        </xg-outer>\n      </xg-progress>\n    ';
	    }
	  }]);

	  return Progress;
	}(Plugin);

	var _createClass$o = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$p(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$l(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$l(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Events$7 = Plugin.Events,
	    POSITIONS$5 = Plugin.POSITIONS,
	    Sniffer$2 = Plugin.Sniffer;

	var Play = function (_Plugin) {
	  _inherits$l(Play, _Plugin);

	  function Play() {
	    _classCallCheck$p(this, Play);

	    return _possibleConstructorReturn$l(this, (Play.__proto__ || Object.getPrototypeOf(Play)).apply(this, arguments));
	  }

	  _createClass$o(Play, [{
	    key: 'afterCreate',
	    value: function afterCreate() {
	      var _this2 = this;

	      var player = this.player,
	          config = this.config;

	      if (config.disable) {
	        return;
	      }
	      this.btnClick = this.btnClick.bind(this);
	      var event = Sniffer$2.device === 'mobile' ? 'touchend' : 'click';
	      this.bind(event, this.btnClick);

	      this.on(Events$7.PAUSE, function () {
	        _this2.animate(player.paused);
	      });
	      this.on(Events$7.PLAY, function () {
	        _this2.animate(player.paused);
	      });
	    }
	  }, {
	    key: 'btnClick',
	    value: function btnClick(e) {
	      var player = this.player;

	      if (player.paused) {
	        player.play();
	      } else {
	        player.pause();
	      }
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
	        play: PlaySvg,
	        pause: PauseSvg
	      };
	    }
	  }, {
	    key: 'animate',
	    value: function animate(paused) {
	      if (paused) {
	        this.find('.xgplayer-icon').innerHTML = this.icons.play;
	        this.find('.xg-tips').innerHTML = this.text.play;
	      } else {
	        this.find('.xgplayer-icon').innerHTML = this.icons.pause;
	        this.find('.xg-tips').innerHTML = this.text.pause;
	      }
	      // const path = this.find('.path')
	      // const pathPlay = this.find('.path_play').getAttribute('d')
	      // const pathPause = this.find('.path_pause').getAttribute('d')
	      // !paused ? path.setAttribute('d', pathPause) : path.setAttribute('d', pathPlay)
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.unbind(['touchend', 'click'], this.btnClick);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.config.disable) {
	        return;
	      }
	      return '<xg-icon class="xgplayer-play">\n    <div class="xgplayer-icon">\n    ' + this.icons.play + '\n    </div>\n    <div class="xg-tips">' + (this.player.paused ? this.text.play : this.text.pause) + '</div>\n    </xg-icon>';
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'Play';
	    }
	  }, {
	    key: 'defaultConfig',
	    get: function get() {
	      return {
	        position: POSITIONS$5.CONTROLS_LEFT,
	        index: 0,
	        disable: false
	      };
	    }
	  }]);

	  return Play;
	}(Plugin);

	var FullScreenChangeSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\">\n  <defs>\n  <path class=\"path_full\" transform=\"scale(0.0320625 0.0320625)\" d=\"M598 214h212v212h-84v-128h-128v-84zM726 726v-128h84v212h-212v-84h128zM214 426v-212h212v84h-128v128h-84zM298 598v128h128v84h-212v-212h84z\"></path>\n  <path class=\"path_exitfull\" transform=\"scale(0.0320625 0.0320625)\" d=\"M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z\"></path>\n  </defs>\n  <path class=\"path\" transform=\"scale(0.0320625 0.0320625)\" d=\"M598 214h212v212h-84v-128h-128v-84zM726 726v-128h84v212h-212v-84h128zM214 426v-212h212v84h-128v128h-84zM298 598v128h128v84h-212v-212h84z\"></path>\n</svg>";

	var _createClass$p = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$q(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$m(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$m(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Events$8 = Plugin.Events,
	    POSITIONS$6 = Plugin.POSITIONS;

	var Fullscreen = function (_Plugin) {
	  _inherits$m(Fullscreen, _Plugin);

	  function Fullscreen() {
	    _classCallCheck$q(this, Fullscreen);

	    return _possibleConstructorReturn$m(this, (Fullscreen.__proto__ || Object.getPrototypeOf(Fullscreen)).apply(this, arguments));
	  }

	  _createClass$p(Fullscreen, [{
	    key: 'afterCreate',
	    value: function afterCreate() {
	      var _this2 = this;

	      this.isFullScreen = this.player.isFullScreen;
	      this.btnClick = this.btnClick.bind(this);
	      this.bind(['click', 'touchend'], this.btnClick);
	      this.on(Events$8.FULLSCREEN_CHANGE, function (isFullScreen) {
	        _this2.find('.xg-tips').innerHTML = isFullScreen ? _this2.text.exitFullscreen : _this2.text.fullscreen;
	        _this2.animate(isFullScreen);
	      });
	    }
	  }, {
	    key: 'btnClick',
	    value: function btnClick(e) {
	      var player = this.player,
	          config = this.config;

	      var useCssFullscreen = false;
	      if (config.useCssFullscreen === true || typeof config.useCssFullscreen === 'function' && config.useCssFullscreen()) {
	        useCssFullscreen = true;
	      }
	      if (useCssFullscreen) {
	        if (player.fullscreen) {
	          player.getCssFullscreen();
	          player.fullscreen = true;
	          this.emit(Events$8.FULLSCREEN_CHANGE, true);
	        } else {
	          player.exitCssFullscreen();
	          player.fullscreen = false;
	          this.emit(Events$8.FULLSCREEN_CHANGE, false);
	        }
	      } else {
	        if (config.switchCallback && typeof config.switchCallback === 'function') {
	          config.switchFullScreen(this.isFullScreen);
	          this.isFullScreen = !this.isFullScreen;
	          return;
	        }
	        if (player.fullscreen) {
	          player.exitFullscreen(config.target);
	        } else {
	          player.getFullscreen(config.target);
	        }
	      }
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
	    key: 'destroy',
	    value: function destroy() {
	      this.unbind(['click', 'touchend'], this.btnClick);
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
	  }, {
	    key: 'defaultConfig',
	    get: function get() {
	      return {
	        position: POSITIONS$6.CONTROLS_RIGTH,
	        index: 0,
	        useCssFullscreen: false,
	        switchCallback: null,
	        target: null
	      };
	    }
	  }]);

	  return Fullscreen;
	}(Plugin);

	var _createClass$q = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$r(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$n(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$n(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Util$7 = Plugin.Util,
	    Events$9 = Plugin.Events,
	    POSITIONS$7 = Plugin.POSITIONS;

	var Time = function (_Plugin) {
	  _inherits$n(Time, _Plugin);

	  function Time() {
	    _classCallCheck$r(this, Time);

	    return _possibleConstructorReturn$n(this, (Time.__proto__ || Object.getPrototypeOf(Time)).apply(this, arguments));
	  }

	  _createClass$q(Time, [{
	    key: 'afterCreate',
	    value: function afterCreate() {
	      var _this2 = this;

	      if (this.config.disable) {
	        return;
	      }
	      this.durationDom = this.find('.time-duration');
	      this.timeDom = this.find('.time-current');
	      this.on(Events$9.DURATION_CHANGE, function () {
	        _this2.onTimeUpdate();
	      });
	      this.on(Events$9.TIME_UPDATE, function () {
	        _this2.onTimeUpdate();
	      });
	    }
	  }, {
	    key: 'onTimeUpdate',
	    value: function onTimeUpdate() {
	      var player = this.player,
	          config = this.config;

	      if (config.disable) {
	        return;
	      }
	      var current = player.currentTime;
	      this.timeDom.innerHTML = Util$7.format(current);
	      if (player.duration !== Infinity) {
	        this.durationDom.innerHTML = Util$7.format(player.duration);
	      }
	    }
	  }, {
	    key: 'afterPlayerInit',
	    value: function afterPlayerInit() {
	      var player = this.player,
	          config = this.config;

	      if (player.duration === Infinity || this.playerConfig.isLive) {
	        Util$7.hide(this.durationDom);
	        Util$7.hide(this.timeDom);
	        Util$7.hide(this.find('.time-separator'));
	        Util$7.show(this.find('.time-live-tag'));
	      } else {
	        Util$7.hide(this.find('.time-live-tag'));
	      }
	      if (config.hide) {
	        this.hide();
	        return;
	      }
	      this.show();
	    }
	  }, {
	    key: 'changeLiveState',
	    value: function changeLiveState(isLive) {
	      if (isLive) {
	        Util$7.hide(this.durationDom);
	        Util$7.hide(this.timeDom);
	        Util$7.hide(this.find('.time-separator'));
	        Util$7.show(this.find('.time-live-tag'));
	      } else {
	        Util$7.hide(this.find('.time-live-tag'));
	        Util$7.show(this.find('.time-separator'));
	        Util$7.show(this.durationDom);
	        Util$7.show(this.timeDom);
	      }
	    }
	  }, {
	    key: 'updateTime',
	    value: function updateTime(time) {
	      var player = this.player;

	      if (!time && time !== 0 || time > player.duration) {
	        return;
	      }
	      this.timeDom.innerHTML = Util$7.format(time);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.config.disable) {
	        return;
	      }
	      return '<xg-icon class="xgplayer-time" style="display:none">\n    <span class="time-current">00:00</span>\n    <span class="time-separator">/</span>\n    <span class="time-duration">00:00</span>\n    <span class="time-live-tag">\u76F4\u64AD</span>\n    </xg-icon>';
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'time';
	    }
	  }, {
	    key: 'defaultConfig',
	    get: function get() {
	      return {
	        position: POSITIONS$7.CONTROLS_LEFT,
	        index: 2,
	        disable: false
	      };
	    }
	  }]);

	  return Time;
	}(Plugin);

	var volumeChange = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"28\" viewBox=\"0 0 28 28\">\n  <path transform=\"scale(0.0220625 0.0220625)\" d=\"M358.4 358.4h-204.8v307.2h204.8l256 256v-819.2l-256 256z\"></path>\n  <defs>\n  <path class=\"path_large\" transform=\"scale(0.0220625 0.0220625)\" d=\"M940.632 837.632l-72.192-72.192c65.114-64.745 105.412-154.386 105.412-253.44s-40.299-188.695-105.396-253.424l-0.016-0.016 72.192-72.192c83.639 83.197 135.401 198.37 135.401 325.632s-51.762 242.434-135.381 325.612l-0.020 0.020zM795.648 693.248l-72.704-72.704c27.756-27.789 44.921-66.162 44.921-108.544s-17.165-80.755-44.922-108.546l0.002 0.002 72.704-72.704c46.713 46.235 75.639 110.363 75.639 181.248s-28.926 135.013-75.617 181.227l-0.021 0.021z\"></path>\n  <!--muted-->\n  <path class=\"path_muted\" transform=\"scale(0.0220625 0.0220625)\" d=\"M920.4 439.808l-108.544-109.056-72.704 72.704 109.568 108.544-109.056 108.544 72.704 72.704 108.032-109.568 108.544 109.056 72.704-72.704-109.568-108.032 109.056-108.544-72.704-72.704-108.032 109.568z\"></path>\n  <!--small-->\n  <path class=\"path_small\" transform=\"scale(0.0220625 0.0220625)\" d=\"M795.648 693.248l-72.704-72.704c27.756-27.789 44.921-66.162 44.921-108.544s-17.165-80.755-44.922-108.546l0.002 0.002 72.704-72.704c46.713 46.235 75.639 110.363 75.639 181.248s-28.926 135.013-75.617 181.227l-0.021 0.021zM795.648 693.248l-72.704-72.704c27.756-27.789 44.921-66.162 44.921-108.544s-17.165-80.755-44.922-108.546l0.002 0.002 72.704-72.704c46.713 46.235 75.639 110.363 75.639 181.248s-28.926 135.013-75.617 181.227l-0.021 0.021z\"></path>\n  </defs>\n  <path class=\"path\" transform=\"scale(0.0220625 0.0220625)\" d=\"M940.632 837.632l-72.192-72.192c65.114-64.745 105.412-154.386 105.412-253.44s-40.299-188.695-105.396-253.424l-0.016-0.016 72.192-72.192c83.639 83.197 135.401 198.37 135.401 325.632s-51.762 242.434-135.381 325.612l-0.020 0.020zM795.648 693.248l-72.704-72.704c27.756-27.789 44.921-66.162 44.921-108.544s-17.165-80.755-44.922-108.546l0.002 0.002 72.704-72.704c46.713 46.235 75.639 110.363 75.639 181.248s-28.926 135.013-75.617 181.227l-0.021 0.021z\"></path>\n</svg>";

	var _createClass$r = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$s(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$o(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$o(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Util$8 = Plugin.Util,
	    Events$a = Plugin.Events,
	    POSITIONS$8 = Plugin.POSITIONS;

	var Volume = function (_Plugin) {
	  _inherits$o(Volume, _Plugin);

	  function Volume() {
	    _classCallCheck$s(this, Volume);

	    return _possibleConstructorReturn$o(this, (Volume.__proto__ || Object.getPrototypeOf(Volume)).apply(this, arguments));
	  }

	  _createClass$r(Volume, [{
	    key: 'registerIcons',
	    value: function registerIcons() {
	      return {
	        volumeChange: volumeChange
	      };
	    }
	  }, {
	    key: 'afterCreate',
	    value: function afterCreate() {
	      if (this.config.disable) {
	        return;
	      }
	      this.bar = this.find('.xgplayer-bar');
	      this.drag = this.find('.xgplayer-drag');
	      this.changeMuted = this.changeMuted.bind(this);

	      this.onBarMousedown = this.onBarMousedown.bind(this);

	      this.onMouseenter = this.onMouseenter.bind(this);
	      this.onMouseleave = this.onMouseleave.bind(this);
	      this.bind('mouseenter', this.onMouseenter);

	      this.bind(['blur', 'mouseleave'], this.onMouseleave);

	      this.bind('.xgplayer-bar', 'mousedown', this.onBarMousedown);
	      this.bind('.xgplayer-icon', ['click', 'touched'], this.changeMuted);

	      this.on(Events$a.VOLUME_CHANGE, this.onVolumeChange.bind(this));
	    }
	  }, {
	    key: 'onBarMousedown',
	    value: function onBarMousedown(e) {
	      var player = this.player;

	      player.video.muted = false;
	      var drag = this.drag;
	      var slider = this.find('.xgplayer-slider');
	      slider.focus();
	      Util$8.event(e);

	      var barRect = this.bar.getBoundingClientRect();
	      var pos = { x: e.clientX, y: e.clientY };
	      var height = drag.getBoundingClientRect().height;
	      var isMove = false;
	      var onMove = function onMove(e) {
	        e.preventDefault();
	        e.stopPropagation();
	        Util$8.event(e);
	        isMove = true;
	        var w = height - e.clientY + pos.y;
	        var now = w / barRect.height;
	        drag.style.height = w + 'px';
	        player.volume = Math.max(Math.min(now, 1), 0);
	      };

	      var onUp = function onUp(e) {
	        e.preventDefault();
	        e.stopPropagation();
	        Util$8.event(e);
	        window.removeEventListener('mousemove', onMove);
	        window.removeEventListener('touchmove', onMove);
	        window.removeEventListener('mouseup', onUp);
	        window.removeEventListener('touchend', onUp);

	        if (!isMove) {
	          var w = barRect.height - (e.clientY - barRect.top);
	          var now = w / barRect.height;
	          drag.style.height = w + 'px';
	          if (now <= 0) {
	            if (player.volume > 0) {
	              drag.volume = player.video.volume;
	            } else {
	              now = drag.volume;
	            }
	          }
	          player.volume = Math.max(Math.min(now, 1), 0);
	        }
	        slider.volume = player.volume;
	        isMove = false;
	      };
	      window.addEventListener('mousemove', onMove);
	      window.addEventListener('touchmove', onMove);
	      window.addEventListener('mouseup', onUp);
	      window.addEventListener('touchend', onUp);
	      return false;
	    }
	  }, {
	    key: 'onMouseenter',
	    value: function onMouseenter(e) {
	      e.preventDefault();
	      e.stopPropagation();
	      Util$8.addClass(this.root, 'slide-show');
	    }
	  }, {
	    key: 'onMouseleave',
	    value: function onMouseleave(e) {
	      console.log('mouseleave');
	      e.preventDefault();
	      e.stopPropagation();
	      Util$8.removeClass(this.root, 'slide-show');
	    }
	  }, {
	    key: 'changeMuted',
	    value: function changeMuted() {
	      var player = this.player;

	      player.muted = !player.muted;
	    }
	  }, {
	    key: 'onVolumeChange',
	    value: function onVolumeChange() {
	      var _player = this.player,
	          muted = _player.muted,
	          volume = _player.volume;

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
	      if (this.config.disable) {
	        return;
	      }
	      var volume = this.player.volume;

	      return '\n    <xg-icon class="xgplayer-volume">\n      <div class="xgplayer-icon">\n      ' + this.icons.volumeChange + '\n      </div>\n      <xg-slider class="xgplayer-slider">\n        <xg-bar class="xgplayer-bar">\n          <xg-drag class="xgplayer-drag" style="height: ' + volume * 100 + '%"></xg-drag>\n        </xg-bar>\n      </xg-slider>\n    </xg-icon>';
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'Volume';
	    }
	  }, {
	    key: 'defaultConfig',
	    get: function get() {
	      return {
	        position: POSITIONS$8.CONTROLS_RIGTH,
	        index: 1,
	        disable: false
	      };
	    }
	  }]);

	  return Volume;
	}(Plugin);

	var RotateSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 40 40\" fill=\"none\">\n  <g clip-path=\"url(#clip0)\">\n    <path transform=\"scale(1.5 1.5)\" d=\"M11.6665 9.16663H4.1665C2.78579 9.16663 1.6665 10.2859 1.6665 11.6666V15.8333C1.6665 17.214 2.78579 18.3333 4.1665 18.3333H11.6665C13.0472 18.3333 14.1665 17.214 14.1665 15.8333V11.6666C14.1665 10.2859 13.0472 9.16663 11.6665 9.16663Z\" fill=\"white\"/>\n    <path transform=\"scale(1.5 1.5)\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.88148 4.06298C3.75371 4.21005 3.67667 4.40231 3.67749 4.61242C3.67847 4.87253 3.79852 5.10435 3.98581 5.25646L6.99111 8.05895C7.32771 8.37283 7.85502 8.35443 8.16891 8.01782C8.48279 7.68122 8.46437 7.15391 8.12778 6.84003L6.62061 5.43457L9.8198 5.4224C9.82848 5.42239 9.8372 5.42221 9.84591 5.4219C10.9714 5.38233 12.0885 5.6285 13.0931 6.13744C14.0976 6.64635 14.957 7.40148 15.5908 8.33234C16.2246 9.2632 16.6122 10.3394 16.7177 11.4606C16.823 12.5819 16.6427 13.7115 16.1934 14.7442C16.0098 15.1661 16.203 15.6571 16.6251 15.8408C17.0471 16.0243 17.5381 15.8311 17.7216 15.4091C18.2833 14.1183 18.5087 12.7063 18.3771 11.3047C18.2453 9.90318 17.7607 8.55792 16.9684 7.39433C16.1761 6.23073 15.1021 5.28683 13.8463 4.65065C12.5946 4.01651 11.203 3.70872 9.80072 3.75583L6.43415 3.76862L7.96326 2.12885C8.27715 1.79225 8.25872 1.26494 7.92213 0.951061C7.58553 0.63718 7.05822 0.655585 6.74433 0.99219L3.90268 4.0395C3.89545 4.04724 3.88841 4.05509 3.88154 4.06303L3.88148 4.06298Z\" fill=\"white\"/>\n  </g>\n  <defs>\n    <clipPath id=\"clip0\">\n      <rect width=\"40\" height=\"40\" fill=\"white\"/>\n    </clipPath>\n  </defs>\n</svg>\n";

	var _createClass$s = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$t(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$p(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$p(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var POSITIONS$9 = Plugin.POSITIONS;

	var Rotate = function (_Plugin) {
	  _inherits$p(Rotate, _Plugin);

	  _createClass$s(Rotate, null, [{
	    key: 'pluginName',
	    get: function get() {
	      return 'rotate';
	    }
	  }, {
	    key: 'defaultConfig',
	    get: function get() {
	      return {
	        position: POSITIONS$9.CONTROLS_RIGTH,
	        index: 6,
	        innerRotate: false, // true为只有画面旋转，false为整个播放器旋转
	        clockwise: false,
	        rotateDeg: 0, // 初始旋转角度
	        disable: false
	      };
	    }
	  }]);

	  function Rotate(args) {
	    _classCallCheck$t(this, Rotate);

	    var _this = _possibleConstructorReturn$p(this, (Rotate.__proto__ || Object.getPrototypeOf(Rotate)).call(this, args));

	    _this.rotateDeg = _this.config.rotateDeg || 0;
	    return _this;
	  }

	  _createClass$s(Rotate, [{
	    key: 'beforeCreate',
	    value: function beforeCreate(args) {
	      if (typeof args.player.config.rotate === 'boolean') {
	        args.config.disable = !args.player.config.rotate;
	      }
	    }
	  }, {
	    key: 'afterCreate',
	    value: function afterCreate() {
	      if (this.config.disable) {
	        return;
	      }
	      this.onBtnClick = this.onBtnClick.bind(this);
	      this.bind('.xgplayer-icon', ['click', 'touchend'], this.onBtnClick);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.unbind('.xgplayer-icon', ['click', 'touchend'], this.onBtnClick);
	    }
	  }, {
	    key: 'onBtnClick',
	    value: function onBtnClick(e) {
	      this.rotate(this.config.clockwise, this.config.innerRotate, 1);
	    }
	  }, {
	    key: 'updateRotateDeg',
	    value: function updateRotateDeg() {
	      var player = this.player;
	      if (!this.rotateDeg) {
	        this.rotateDeg = 0;
	      }

	      var width = player.root.offsetWidth;
	      var height = player.root.offsetHeight;
	      var targetWidth = player.video.videoWidth;
	      var targetHeight = player.video.videoHeight;

	      if (!this.config.innerRotate) ;

	      var scale = void 0;
	      if (this.rotateDeg === 0.25 || this.rotateDeg === 0.75) {
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
	        player.video.style.transform = 'rotate(' + this.rotateDeg + 'turn) scale(' + scale + ')';
	        player.video.style.webKitTransform = 'rotate(' + this.rotateDeg + 'turn) scale(' + scale + ')';
	      } else {
	        player.root.style.transformOrigin = 'center center';
	        player.root.style.transform = 'rotate(' + this.rotateDeg + 'turn) scale(' + 1 + ')';
	        player.root.style.webKitTransform = 'rotate(' + this.rotateDeg + 'turn) scale(' + 1 + ')';
	      }
	    }
	  }, {
	    key: 'rotate',
	    value: function rotate() {
	      var clockwise = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	      var times = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

	      var player = this.player;
	      if (!this.rotateDeg) {
	        this.rotateDeg = 0;
	      }
	      var factor = clockwise ? 1 : -1;

	      this.rotateDeg = (this.rotateDeg + 1 + factor * 0.25 * times) % 1;
	      this.updateRotateDeg();
	      player.emit('rotate', this.rotateDeg * 360);
	    }
	  }, {
	    key: 'registerIcons',
	    value: function registerIcons() {
	      return {
	        'rotate': RotateSvg
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
	      if (this.config.disable) {
	        return;
	      }
	      return '\n    <xg-icon class="xgplayer-rotate">\n      <div class="xgplayer-icon">\n        ' + this.icons.rotate + '\n      </div>\n      <div class="xg-tips">\n      ' + this.text.rotate + '\n      </div>\n    </xg-icon>';
	    }
	  }]);

	  return Rotate;
	}(Plugin);

	var _createClass$t = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$u(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$q(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$q(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Events$b = Plugin.Events,
	    POSITIONS$a = Plugin.POSITIONS;

	var PIP = function (_Plugin) {
	  _inherits$q(PIP, _Plugin);

	  function PIP() {
	    _classCallCheck$u(this, PIP);

	    return _possibleConstructorReturn$q(this, (PIP.__proto__ || Object.getPrototypeOf(PIP)).apply(this, arguments));
	  }

	  _createClass$t(PIP, [{
	    key: 'beforeCreate',
	    value: function beforeCreate(args) {
	      if (typeof args.player.config.pip === 'boolean') {
	        args.config.showIcon = args.player.config.pip;
	      }
	    }
	  }, {
	    key: 'afterCreate',
	    value: function afterCreate() {
	      var _this2 = this;

	      // video初始化之后再做判断是否显示
	      this.once(Events$b.COMPLETE, function () {
	        if (_this2.config.showIcon && _this2.isPIPAvailable()) {
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
	      var player = this.player,
	          playerConfig = this.playerConfig;

	      if (this.isPIPAvailable()) {
	        return false;
	      }
	      try {
	        if (document.pictureInPictureElement && document.pictureInPictureElement === player.video) {
	          document.exitPictureInPicture();
	        } else {
	          if (playerConfig.poster) {
	            player.video.poster = playerConfig.poster;
	          }
	          player.video && player.video.requestPictureInPicture();
	        }
	        return true;
	      } catch (reason) {
	        console.error('switchPIP', reason);
	        return false;
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
	  }, {
	    key: 'isPip',
	    get: function get() {
	      var player = this.player;

	      return document.pictureInPictureElement === player.video;
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'Pip';
	    }
	  }, {
	    key: 'defaultConfig',
	    get: function get() {
	      return {
	        position: POSITIONS$a.CONTROLS_RIGTH,
	        index: 6,
	        showIcon: false
	      };
	    }
	  }]);

	  return PIP;
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

	var DownloadSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\">\n  <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n    <g transform=\"translate(-488.000000, -340.000000)\" fill=\"#FFFFFF\">\n      <g id=\"Group-2\">\n        <g id=\"volme_big-copy\" transform=\"translate(488.000000, 340.000000)\">\n          <rect id=\"Rectangle-18\" x=\"11\" y=\"4\" width=\"2\" height=\"12\" rx=\"1\"></rect>\n          <rect id=\"Rectangle-2\" x=\"3\" y=\"18\" width=\"18\" height=\"2\" rx=\"1\"></rect>\n          <rect id=\"Rectangle-2\" transform=\"translate(4.000000, 17.500000) rotate(90.000000) translate(-4.000000, -17.500000) \" x=\"1.5\" y=\"16.5\" width=\"5\" height=\"2\" rx=\"1\"></rect><rect id=\"Rectangle-2-Copy-3\" transform=\"translate(20.000000, 17.500000) rotate(90.000000) translate(-20.000000, -17.500000) \" x=\"17.5\" y=\"16.5\" width=\"5\" height=\"2\" rx=\"1\"></rect>\n          <path d=\"M9.48791171,8.26502656 L9.48791171,14.2650266 C9.48791171,14.8173113 9.04019646,15.2650266 8.48791171,15.2650266 C7.93562696,15.2650266 7.48791171,14.8173113 7.48791171,14.2650266 L7.48791171,7.26502656 C7.48791171,6.71274181 7.93562696,6.26502656 8.48791171,6.26502656 L15.4879117,6.26502656 C16.0401965,6.26502656 16.4879117,6.71274181 16.4879117,7.26502656 C16.4879117,7.81731131 16.0401965,8.26502656 15.4879117,8.26502656 L9.48791171,8.26502656 Z\" id=\"Combined-Shape\" transform=\"translate(11.987912, 10.765027) scale(1, -1) rotate(45.000000) translate(-11.987912, -10.765027) \"></path>\n        </g>\n      </g>\n    </g>\n  </g>\n</svg>\n";

	var _createClass$u = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$v(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$r(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$r(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	var POSITIONS$b = Plugin.POSITIONS;

	var Download = function (_Plugin) {
	  _inherits$r(Download, _Plugin);

	  _createClass$u(Download, null, [{
	    key: 'pluginName',
	    get: function get() {
	      return 'DownloadIcon';
	    }
	  }, {
	    key: 'defaultConfig',
	    get: function get() {
	      return {
	        position: POSITIONS$b.CONTROLS_RIGTH,
	        index: 3,
	        disable: false
	      };
	    }
	  }]);

	  function Download(args) {
	    _classCallCheck$v(this, Download);

	    var _this = _possibleConstructorReturn$r(this, (Download.__proto__ || Object.getPrototypeOf(Download)).call(this, args));

	    _this.timer = null;
	    _this.isLock = false;
	    return _this;
	  }

	  _createClass$u(Download, [{
	    key: 'beforeCreate',
	    value: function beforeCreate(args) {
	      if (typeof args.player.config.download === 'boolean') {
	        args.config.disable = !args.player.config.download;
	      }
	    }
	  }, {
	    key: 'afterCreate',
	    value: function afterCreate() {
	      if (!this.config.download) {
	        return;
	      }
	      this.download = this.download.bind(this);
	      this.bind(['click', 'touchend'], this.download);
	    }
	  }, {
	    key: 'registerLangauageTexts',
	    value: function registerLangauageTexts() {
	      return {
	        download: {
	          jp: 'フルスクリーン',
	          en: 'download',
	          zh: '下载'
	        }
	      };
	    }
	  }, {
	    key: 'registerIcons',
	    value: function registerIcons() {
	      return {
	        download: DownloadSvg
	      };
	    }
	  }, {
	    key: 'download',
	    value: function download$1() {
	      var _this2 = this;

	      if (!this.isLock) {
	        return;
	      }
	      var url = this.getAbsoluteURL(this.player.src);
	      download(url);
	      this.isLock = true;
	      this.timer = window.setTimeout(function () {
	        _this2.isLock = false;
	        window.clearTimeout(_this2.timer);
	        _this2.timer = null;
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
	      this.unbind(['click', 'touchend'], this.download);
	      window.clearTimeout(this.timer);
	      this.timer = null;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (!this.config.download) {
	        return;
	      }
	      return '<xg-icon class="xgplayer-download">\n      <div class="xgplayer-icon">\n      ' + this.icons.download + '\n      </div>\n      <div class="xg-tips">' + this.text.download + '</div>\n    </xg-icon>';
	    }
	  }]);

	  return Download;
	}(Plugin);

	var _createClass$v = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$w(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$s(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$s(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var POSITIONS$c = Plugin.POSITIONS;

	var ScreenShot = function (_Plugin) {
	  _inherits$s(ScreenShot, _Plugin);

	  function ScreenShot() {
	    _classCallCheck$w(this, ScreenShot);

	    return _possibleConstructorReturn$s(this, (ScreenShot.__proto__ || Object.getPrototypeOf(ScreenShot)).apply(this, arguments));
	  }

	  _createClass$v(ScreenShot, [{
	    key: 'beforeCreate',
	    value: function beforeCreate(args) {
	      if (typeof args.player.config.screenShot === 'boolean') {
	        args.config.disable = !args.player.config.screenShot;
	      }
	    }
	  }, {
	    key: 'onPluginsReady',
	    value: function onPluginsReady() {
	      this.show();
	      this.onClickBtn = this.onClickBtn.bind(this);
	      this.bind(['click', 'touchend'], this.onClickBtn);
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
	    key: 'destroy',
	    value: function destroy() {
	      this.bind(['click', 'touchend'], this.onClickBtn);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.config.disable) {
	        return;
	      }
	      var className = this.icons.screenshotIcon ? 'xgplayer-icon' : 'xgplayer-icon btn-definition';
	      return '\n      <xg-icon class="xgplayer-shot">\n      <div class="' + className + '">\n      ' + (this.icons.screenshotIcon ? '' + this.icons.screenshotIcon : '<span>' + this.text.screenshot + '</span>') + ' \n      </div>\n    </xg-icon>';
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'screenShot';
	    }
	  }, {
	    key: 'defaultConfig',
	    get: function get() {
	      return {
	        position: POSITIONS$c.CONTROLS_RIGTH,
	        index: 5,
	        quality: 0.92,
	        type: 'image/png',
	        format: '.png',
	        width: 600,
	        height: 337,
	        disable: false
	      };
	    }
	  }]);

	  return ScreenShot;
	}(Plugin);

	var _createClass$w = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$x(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$t(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$t(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Events$c = Plugin.Events,
	    Util$9 = Plugin.Util,
	    Sniffer$3 = Plugin.Sniffer,
	    POSITIONS$d = Plugin.POSITIONS;

	var DefinitionIcon = function (_Plugin) {
	  _inherits$t(DefinitionIcon, _Plugin);

	  _createClass$w(DefinitionIcon, null, [{
	    key: 'pluginName',
	    get: function get() {
	      return 'Definition';
	    }

	    // 默认配置信息

	  }, {
	    key: 'defaultConfig',
	    get: function get() {
	      return {
	        position: POSITIONS$d.CONTROLS_RIGTH,
	        index: 3,
	        list: null,
	        disable: false
	      };
	    }
	  }]);

	  function DefinitionIcon(args) {
	    _classCallCheck$x(this, DefinitionIcon);

	    // 记录切换的时候的播放器状态
	    var _this = _possibleConstructorReturn$t(this, (DefinitionIcon.__proto__ || Object.getPrototypeOf(DefinitionIcon)).call(this, args));

	    _this.curTime = 0;
	    _this.isPaused = true;
	    return _this;
	  }

	  _createClass$w(DefinitionIcon, [{
	    key: 'afterCreate',
	    value: function afterCreate() {
	      var _this2 = this;

	      this.once(Events$c.CANPLAY, function () {
	        if (_this2.config.list && _this2.config.list.length > 0) {
	          _this2.renderItemList();
	          _this2.show();
	        }
	      });
	      this.once('resourceReady', function (list) {
	        _this2.changeDefinitionList(list);
	      });
	      if (Sniffer$3.device === 'mobile') {
	        this.activeEvent = 'click';
	      } else {
	        this.activeEvent = 'mouseenter';
	      }
	      this.onToggle = this.onToggle.bind(this);
	      this.onItemClick = this.onItemClick.bind(this);
	      this.bind(this.activeEvent, this.onToggle);
	      this.bind('mouseleave', this.onToggle);
	      this.bind('.icon-list li', ['touched', 'click'], this.onItemClick);
	    }
	  }, {
	    key: 'renderItemList',
	    value: function renderItemList() {
	      var player = this.player;
	      var list = this.config.list;

	      var src = player.config.url;
	      var a = document.createElement('a');
	      if (player.switchURL) {
	        this.switchUrl();
	      } else {
	        src = player.currentSrc || player.src;
	      }
	      if (player['hls']) {
	        a.href = player['hls'].url;
	        src = a.href;
	      }

	      var liList = list.map(function (item) {
	        a.href = item.url;
	        var className = player.dash ? item.selected ? 'selected' : '' : a.href === src ? 'selected' : '';
	        return '<li class="' + className + '" cname="' + item.name + '" url="' + item.url + '">' + item.name + '</li>';
	      });
	      var cursrc = list.filter(function (item) {
	        a.href = item.url;
	        if (player.dash) {
	          return item.selected === true;
	        } else {
	          return a.href === src;
	        }
	      });
	      this.find('.icon-text').innerHTML = (cursrc[0] || { name: '清晰度' }).name;
	      this.find('.icon-list').innerHTML = liList.join('');
	    }
	  }, {
	    key: 'onCanplayChangeDefinition',
	    value: function onCanplayChangeDefinition() {
	      var player = this.player;

	      player.currentTime = this.curTime;
	      if (!this.isPaused) {
	        var playPromise = player.play();
	        if (playPromise !== undefined && playPromise) {
	          // eslint-disable-next-line handle-callback-err
	          playPromise.catch(function (err) {});
	        }
	      }
	      player.emit('afterdefinitionChange');
	    }
	  }, {
	    key: 'onToggle',
	    value: function onToggle(e) {
	      e.preventDefault();
	      e.stopPropagation();
	      Util$9.hasClass(this.root, 'list-show') ? Util$9.removeClass(this.root, 'list-show') : Util$9.addClass(this.root, 'list-show');
	    }
	  }, {
	    key: 'switchUrl',
	    value: function switchUrl(lastATag) {
	      var player = this.player;

	      var curRUL = document.createElement('a');
	      ['mp4', 'hls', '__flv__', 'dash'].every(function (item) {
	        if (player[item]) {
	          if (player[item].url) {
	            curRUL.href = player[item].url;
	          }
	          if (item === '__flv__') {
	            if (player[item]._options) {
	              curRUL.href = player[item]._options.url;
	            } else {
	              curRUL.href = player[item]._mediaDataSource.url;
	            }
	          }
	          return false;
	        } else {
	          return true;
	        }
	      });
	      if (lastATag && curRUL.href !== lastATag.href && !player.ended) {
	        player.switchURL(lastATag.href);
	      }
	    }

	    // 对外暴露 切换清晰度

	  }, {
	    key: 'changeDefinitionList',
	    value: function changeDefinitionList(list) {
	      this.config.list = list;
	      this.renderItemList();
	      this.show();
	    }
	  }, {
	    key: 'onItemClick',
	    value: function onItemClick(e) {
	      var _this3 = this;

	      var player = this.player;
	      var list = this.config.list;

	      e.preventDefault();
	      e.stopPropagation();
	      if (e.target && e.target.className === 'selected') {
	        return false;
	      }
	      var a = document.createElement('a');
	      player.emit('beforeDefinitionChange', a.href);
	      if (player.dash) {
	        list.forEach(function (item) {
	          item.selected = false;
	          if (item.name === e.target.innerHTML) {
	            item.selected = true;
	          }
	        });
	      }
	      var curlSelected = this.find('.selected');
	      Util$9.addClass(e.target, 'selected');
	      curlSelected && Util$9.removeClass(curlSelected, 'selected');
	      var from = curlSelected ? curlSelected.getAttribute('cname') : '';
	      var to = e.target.getAttribute('cname');
	      a.href = e.target.getAttribute('url');
	      this.curTime = player.currentTime;
	      this.isPaused = player.paused;
	      if (player.switchURL) {
	        this.switchUrl(a);
	      } else {
	        // if (player['hls']) {
	        //   let curRUL = document.createElement('a')
	        //   curRUL = player['hls'].url
	        // }
	        if (a.href !== player.currentSrc) {
	          if (!player.ended) {
	            player.src = a.href;
	            this.once('canplay', function () {
	              _this3.onCanplayChangeDefinition();
	            });
	          }
	        }
	      }
	      this.find('.icon-text').innerHTML = to;
	      player.emit('definitionChange', { from: from, to: to });
	      if (Sniffer$3.device === 'mobile') {
	        Util$9.removeClass(this.root, 'list-show');
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var text = '清晰度';
	      return '<xg-icon class="xgplayer-playbackrate" style="display: none;">\n    <div class="xgplayer-icon btn-definition"><span class="icon-text">' + text + '</span></div>\n    <ul class="icon-list">\n    </ul>\n   </xg-icon>';
	    }
	  }]);

	  return DefinitionIcon;
	}(Plugin);

	var _typeof$4 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _get$5 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass$x = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$y(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$u(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$u(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Events$d = Plugin.Events,
	    Util$a = Plugin.Util,
	    Sniffer$4 = Plugin.Sniffer,
	    POSITIONS$e = Plugin.POSITIONS;

	var PlaybackRate = function (_Plugin) {
	  _inherits$u(PlaybackRate, _Plugin);

	  _createClass$x(PlaybackRate, null, [{
	    key: 'pluginName',
	    get: function get() {
	      return 'PlaybackRate';
	    }
	    // 默认配置信息

	  }, {
	    key: 'defaultConfig',
	    get: function get() {
	      return {
	        position: POSITIONS$e.CONTROLS_RIGTH,
	        index: 4,
	        list: [0.5, 0.75, { rate: 1, iconText: '倍速' }, 1.5, 2]
	      };
	    }
	  }]);

	  function PlaybackRate(args) {
	    _classCallCheck$y(this, PlaybackRate);

	    var _this = _possibleConstructorReturn$u(this, (PlaybackRate.__proto__ || Object.getPrototypeOf(PlaybackRate)).call(this, args));

	    _this.curRate = 1;
	    return _this;
	  }

	  _createClass$x(PlaybackRate, [{
	    key: 'afterCreate',
	    value: function afterCreate() {
	      var _this2 = this;

	      var playerConfig = this.playerConfig,
	          config = this.config;

	      if (Array.isArray(playerConfig.playbackRate)) {
	        config.list = playerConfig.playbackRate;
	      }
	      this.once(Events$d.CANPLAY, function () {
	        _this2.show();
	      });
	      if (Sniffer$4.device === 'mobile') {
	        this.activeEvent = 'click';
	      } else {
	        this.activeEvent = 'mouseenter';
	      }
	      this.renderItemList();
	      this.onMouseenter = this.onMouseenter.bind(this);
	      this.onItemClick = this.onItemClick.bind(this);
	      this.bind(this.activeEvent, this.onMouseenter);
	      this.bind('mouseleave', this.onMouseenter);
	      this.bind('.icon-list li', ['touched', 'click'], this.onItemClick);
	    }
	  }, {
	    key: 'show',
	    value: function show() {
	      if (!this.config.list || this.config.list.length === 0) {
	        return;
	      }
	      _get$5(PlaybackRate.prototype.__proto__ || Object.getPrototypeOf(PlaybackRate.prototype), 'show', this).call(this);
	    }
	  }, {
	    key: 'onMouseenter',
	    value: function onMouseenter(e) {
	      e.preventDefault();
	      e.stopPropagation();
	      Util$a.hasClass(this.root, 'list-show') ? Util$a.removeClass(this.root, 'list-show') : Util$a.addClass(this.root, 'list-show');
	    }
	  }, {
	    key: 'onItemClick',
	    value: function onItemClick(e) {
	      var target = e.target;
	      var cname = target.getAttribute('cname');
	      if (Number(cname) === this.curRate) {
	        return false;
	      }
	      Util$a.removeClass(this.find('.selected'), 'selected');
	      Util$a.addClass(target, 'selected');
	      this.curRate = Number(cname);
	      this.player.playbackRate = Number(cname);
	      this.find('.icon-text').innerHTML = target.getAttribute('ctext');
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.unbind(this.activeEvent, this.onMouseenter);
	      this.unbind('mouseleave', this.onMouseenter);
	      this.unbind('.icon-list li', ['touched', 'click'], this.onItemClick);
	    }
	  }, {
	    key: 'renderItemList',
	    value: function renderItemList() {
	      var playbackRate = this.player.playbackRate || 1;
	      this.curRate = playbackRate;
	      var currentText = '';
	      var items = this.config.list.map(function (item) {
	        var itemInfo = (typeof item === 'undefined' ? 'undefined' : _typeof$4(item)) === 'object' ? item : { rate: item };
	        !itemInfo.text && (itemInfo.text = itemInfo.rate + 'x');
	        if (itemInfo.rate === playbackRate) {
	          itemInfo.isCurrent = true;
	          currentText = item.iconText || itemInfo.text;
	        }
	        return '<li cname="' + itemInfo.rate + '" ctext="' + (item.iconText || itemInfo.text) + '" class="' + (itemInfo.isCurrent ? 'selected' : '') + '">' + itemInfo.text + '</li>';
	      });
	      this.find('.icon-list').innerHTML = items.join('');
	      this.find('.icon-text').innerHTML = currentText;
	      this.show();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return '<xg-icon class="xgplayer-playbackrate">\n    <div class="xgplayer-icon btn-definition">\n    <span class="icon-text"></span>\n    </div>\n    <ul class="icon-list">\n    </ul>\n   </xg-icon>';
	    }
	  }]);

	  return PlaybackRate;
	}(Plugin);

	var CssFullscreenChange = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" transform=\"scale(1.3)\">\n  <defs>\n  <path class='path_exitfull' d=\"M9,10V9a.9.9,0,0,1,1-1,.9.9,0,0,1,1,1v2a.9.9,0,0,1-1,1H8a.9.9,0,0,1-1-1,.9.9,0,0,1,1-1Zm6,4v1a1,1,0,0,1-2,0V13a.9.9,0,0,1,1-1h2a1,1,0,0,1,0,2Zm3-7H6V17H18Zm2,0V17a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2V7A2,2,0,0,1,6,5H18A2,2,0,0,1,20,7Z\"></path>\n  <path class='path_full' d=\"M9,10v1a.9.9,0,0,1-1,1,.9.9,0,0,1-1-1V9A.9.9,0,0,1,8,8h2a.9.9,0,0,1,1,1,.9.9,0,0,1-1,1Zm6,4V13a1,1,0,0,1,2,0v2a.9.9,0,0,1-1,1H14a1,1,0,0,1,0-2Zm3-7H6V17H18Zm2,0V17a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2V7A2,2,0,0,1,6,5H18A2,2,0,0,1,20,7Z\"></path>\n </defs>\n  <path class=\"path\" d=\"M9,10v1a.9.9,0,0,1-1,1,.9.9,0,0,1-1-1V9A.9.9,0,0,1,8,8h2a.9.9,0,0,1,1,1,.9.9,0,0,1-1,1Zm6,4V13a1,1,0,0,1,2,0v2a.9.9,0,0,1-1,1H14a1,1,0,0,1,0-2Zm3-7H6V17H18Zm2,0V17a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2V7A2,2,0,0,1,6,5H18A2,2,0,0,1,20,7Z\"></path>\n</svg>\n";

	var _createClass$y = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$z(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$v(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$v(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Events$e = Plugin.Events,
	    POSITIONS$f = Plugin.POSITIONS;

	var CssFullScreen = function (_Plugin) {
	  _inherits$v(CssFullScreen, _Plugin);

	  function CssFullScreen() {
	    _classCallCheck$z(this, CssFullScreen);

	    return _possibleConstructorReturn$v(this, (CssFullScreen.__proto__ || Object.getPrototypeOf(CssFullScreen)).apply(this, arguments));
	  }

	  _createClass$y(CssFullScreen, [{
	    key: 'beforeCreate',
	    value: function beforeCreate(args) {
	      if (typeof args.player.config.cssFullscreen === 'boolean') {
	        args.config.disable = !args.player.config.cssFullscreen;
	      }
	    }
	  }, {
	    key: 'afterCreate',
	    value: function afterCreate() {
	      var _this2 = this;

	      this.on(Events$e.CSS_FULLSCREEN_CHANGE, function (isCssfullScreen) {
	        _this2.animate(isCssfullScreen);
	      });
	      // 退出全屏的时候会同时退出网页全屏
	      this.on(Events$e.FULLSCREEN_CHANGE, function (isFullScreen) {
	        !isFullScreen && _this2.animate(isFullScreen);
	      });
	    }
	  }, {
	    key: 'afterPlayerInit',
	    value: function afterPlayerInit() {
	      this.btnClick = this.btnClick.bind(this);
	      this.bind(['click', 'touchend'], this.btnClick);
	    }
	  }, {
	    key: 'btnClick',
	    value: function btnClick(e) {
	      e.preventDefault();
	      e.stopPropagation();
	      if (!this.player.isCssfullScreen) {
	        this.player.getCssFullscreen();
	      } else {
	        this.player.exitCssFullscreen();
	      }
	    }
	  }, {
	    key: 'animate',
	    value: function animate(isFullScreen) {
	      if (!this.root) {
	        return;
	      }
	      var path = this.find('.path');
	      var full = this.find('.path_full').getAttribute('d');
	      var exit = this.find('.path_exitfull').getAttribute('d');
	      isFullScreen ? path.setAttribute('d', exit) : path.setAttribute('d', full);
	    }
	  }, {
	    key: 'switchTips',
	    value: function switchTips() {
	      this.find('.xg-tips').innerHTML = this.isCssfullScreen ? this.text.exitCssFullscreen : this.text.cssFullscreen;
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
	      this.unbind(['click', 'touchend'], this.btnClick);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (!this.playerConfig.cssFullscreen) {
	        return;
	      }
	      return '<xg-icon class=\'xgplayer-cssfullscreen\'>\n    <div class="xgplayer-icon">\n    ' + this.icons.cssFullscreen + '\n    </div>\n    <div class="xg-tips">' + (this.isCssfullScreen ? this.text.exitCssFullscreen : this.text.cssFullscreen) + '</div>\n    </xg-icon>';
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'cssFullscreen';
	    }
	  }, {
	    key: 'defaultConfig',
	    get: function get() {
	      return {
	        position: POSITIONS$f.CONTROLS_RIGTH,
	        index: 1,
	        disable: false
	      };
	    }
	  }]);

	  return CssFullScreen;
	}(Plugin);

	function _classCallCheck$A(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DefaultPreset = function DefaultPreset() {
	  var _plugins, _plugins2;

	  _classCallCheck$A(this, DefaultPreset);

	  var contolsIcons = [Progress, Play, Fullscreen, Time, Volume, Rotate, PlayNextIcon, DefinitionIcon, PlaybackRate, CssFullScreen, Download, ScreenShot];

	  var barIcons = [{
	    plugin: PIP,
	    options: {
	      index: 0,
	      position: PIP.POSITIONS.ROOT_RIGHT
	    } }];

	  var layers = [Replay, Poster, Start, Loading, EnterPlugin, MiniScreen];

	  this.plugins = [].concat(contolsIcons, layers, barIcons);
	  switch (sniffer.device) {
	    case 'pc':
	      (_plugins = this.plugins).push.apply(_plugins, [Keyboard, PCPlugin]);
	      break;
	    case 'mobile':
	      this.plugins.push(MobilePlugin);
	      break;
	    default:
	      (_plugins2 = this.plugins).push.apply(_plugins2, [Keyboard, PCPlugin]);
	  }
	  this.ignores = [];
	};

	Player.defaultPreset = DefaultPreset;
	Player.defaultPlugins = Plugins;

	return Player;

})));
//# sourceMappingURL=index.js.map
