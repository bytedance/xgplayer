(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('delegate-events')) :
	typeof define === 'function' && define.amd ? define(['delegate-events'], factory) :
	(global = global || self, global.Player = factory(global.delegate));
}(this, (function (delegate) { 'use strict';

	delegate = delegate && delegate.hasOwnProperty('default') ? delegate['default'] : delegate;

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	// ES3 safe

	var _undefined = void 0;

	var is = function (value) {
	  return value !== _undefined && value !== null;
	};

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

	var classRe = /^\s*class[\s{/}]/,
	    functionToString = Function.prototype.toString;

	var is$4 = function (value) {
		if (!is$3(value)) return false;
		if (classRe.test(functionToString.call(value))) return false;
		return true;
	};

	var isImplemented = function () {
		var assign = Object.assign,
		    obj;
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

	var isValue = function (val) {
	  return val !== _undefined$1 && val !== null;
	};

	var keys = Object.keys;

	var shim = function (object) {
	  return keys(isValue(object) ? Object(object) : object);
	};

	var keys$1 = isImplemented$1() ? Object.keys : shim;

	var validValue = function (value) {
		if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
		return value;
	};

	var max = Math.max;

	var shim$1 = function (dest, src /*, …srcn*/) {
		var error,
		    i,
		    length = max(arguments.length, 2),
		    assign;
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

	var forEach = Array.prototype.forEach,
	    create = Object.create;

	var process = function (src, obj) {
		var key;
		for (key in src) obj[key] = src[key];
	};

	// eslint-disable-next-line no-unused-vars
	var normalizeOptions = function (opts1 /*, …options*/) {
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

	var shim$2 = function (searchString /*, position*/) {
		return indexOf.call(this, searchString, arguments[1]) > -1;
	};

	var contains = isImplemented$2() ? String.prototype.contains : shim$2;

	var d_1 = createCommonjsModule(function (module) {



	var d = module.exports = function (dscr, value /*, options*/) {
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
	};

	d.gs = function (dscr, get, set /*, options*/) {
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

	var apply = Function.prototype.apply,
	    call = Function.prototype.call,
	    create = Object.create,
	    defineProperty = Object.defineProperty,
	    defineProperties = Object.defineProperties,
	    hasOwnProperty = Object.prototype.hasOwnProperty,
	    descriptor = { configurable: true, enumerable: false, writable: true },
	    on,
	    once,
	    off,
	    emit,
	    methods,
	    descriptors,
	    base;

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
		if (!data[type]) data[type] = listener;else if (typeof data[type] === 'object') data[type].push(listener);else data[type] = [data[type], listener];

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
			for (i = 0; candidate = listeners[i]; ++i) {
				if (candidate === listener || candidate.__eeOnceListener__ === listener) {
					if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];else listeners.splice(i, 1);
				}
			}
		} else {
			if (listeners === listener || listeners.__eeOnceListener__ === listener) {
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
			for (i = 0; listener = listeners[i]; ++i) {
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
		return o == null ? create(base) : defineProperties(Object(o), descriptors);
	};
	exports.methods = methods;
	});
	var eventEmitter_1 = eventEmitter.methods;

	var map = { function: true, object: true };

	var isObject = function (value) {
	  return isValue(value) && map[typeof value] || false;
	};

	var validObject = function (value) {
		if (!isObject(value)) throw new TypeError(value + " is not an Object");
		return value;
	};

	var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

	var allOff = function (emitter /*, type*/) {
		var type = arguments[1],
		    data;

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
	        if (!dst[key]) {
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
	var DESTROY = 'destroy';
	var URL_CHANGE = 'urlchange';

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
		BUFFER_CHANGE: BUFFER_CHANGE,
		PLAYER_FOCUS: PLAYER_FOCUS,
		PLAYER_BLUR: PLAYER_BLUR,
		READY: READY,
		URL_NULL: URL_NULL,
		AUTOPLAY_STARTED: AUTOPLAY_STARTED,
		AUTOPLAY_PREVENTED: AUTOPLAY_PREVENTED,
		COMPLETE: COMPLETE,
		DESTROY: DESTROY,
		URL_CHANGE: URL_CHANGE
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
	      if (typeof bool === 'boolean' && bool === true && !this._hasStart) {
	        this._hasStart = true;
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
	        this.emit(URL_CHANGE);
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
	BasePlugin.Event = event;

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
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = Object.keys(originalOptions)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var item = _step.value;

	        if (pluginName.toLowerCase() === item.toLowerCase()) {
	          options.config = originalOptions[item];
	        } else {
	          options.config = {};
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

	    if (!options.root) {
	      options.root = player.root;
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
	        console.log(textConfig[key][lang]);
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
	      console.log('registerLangauageTexts', defaultTexConfig);
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
	              var c = this._registerPlugin(name, children[item], this.config[name]);
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
	    key: '_registerPlugin',
	    value: function _registerPlugin(name, item, options) {
	      var opts = (typeof options === 'undefined' ? 'undefined' : _typeof$1(options)) === 'object' ? options : {};
	      opts.root = this.el;
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
	      // if no querySelector passed to the method
	      if (arguments.length < 3 && typeof eventType === 'function') {
	        this.bindEL(querySelector, eventType);
	      } else if (arguments.length === 3 && typeof callback === 'function') {
	        delegate.bind(this.el, querySelector, eventType, callback, false);
	      }
	    }
	  }, {
	    key: 'unbind',
	    value: function unbind(querySelector, eventType, callback) {
	      // if no querySelector passed to the method
	      if (arguments.length < 3 && typeof eventType === 'function') {
	        this.unbindEL(querySelector, eventType);
	      } else if (typeof callback === 'function') {
	        delegate.ubind(this.el, querySelector, eventType, callback, false);
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
	    value: function show() {
	      this.el.style.display = '';
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

	var css = "";
	styleInject(css);

	var css$1 = ".xgplayer .xgplayer-poster {\n  display: none;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 100;\n  background-size: cover;\n  background-position: center center; }\n\n.xgplayer.xgplayer-nostart .xgplayer-poster {\n  display: block; }\n";
	styleInject(css$1);

	var _createClass$3 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Poster = function (_Plugin) {
	  _inherits$1(Poster, _Plugin);

	  function Poster() {
	    _classCallCheck$4(this, Poster);

	    return _possibleConstructorReturn$1(this, (Poster.__proto__ || Object.getPrototypeOf(Poster)).apply(this, arguments));
	  }

	  _createClass$3(Poster, [{
	    key: 'render',
	    value: function render() {
	      var poster = this.config.poster || this.playerConfig.poster;
	      if (!poster) {
	        return '';
	      }
	      return '<xg-poster class="xgplayer-poster" style="background-image:url(' + poster + ')">\n    </xg-poster>';
	    }
	  }, {
	    key: 'beforePlayerInit',
	    value: function beforePlayerInit() {
	      console.log('beforePlayerInit');
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'Poster';
	    }
	  }]);

	  return Poster;
	}(Plugin);

	var ReplayIcon = "<svg class=\"xgplayer-replay-svg\" xmlns=\"http://www.w3.org/2000/svg\" width=\"78\" height=\"78\" viewbox=\"0 0 78 78\">\n  <path d=\"M8.22708362,13.8757234 L11.2677371,12.6472196 C11.7798067,12.4403301 12.3626381,12.6877273 12.5695276,13.1997969 L12.9441342,14.1269807 C13.1510237,14.6390502 12.9036264,15.2218816 12.3915569,15.4287712 L6.8284538,17.6764107 L5.90126995,18.0510173 C5.38920044,18.2579068 4.80636901,18.0105096 4.5994795,17.49844 L1.97723335,11.0081531 C1.77034384,10.4960836 2.0177411,9.91325213 2.52981061,9.70636262 L3.45699446,9.33175602 C3.96906396,9.12486652 4.5518954,9.37226378 4.75878491,9.88433329 L5.67885163,12.1615783 C7.99551726,6.6766934 13.3983951,3 19.5,3 C27.7842712,3 34.5,9.71572875 34.5,18 C34.5,26.2842712 27.7842712,33 19.5,33 C15.4573596,33 11.6658607,31.3912946 8.87004692,28.5831991 C8.28554571,27.9961303 8.28762719,27.0463851 8.87469603,26.4618839 C9.46176488,25.8773827 10.4115101,25.8794641 10.9960113,26.466533 C13.2344327,28.7147875 16.263503,30 19.5,30 C26.127417,30 31.5,24.627417 31.5,18 C31.5,11.372583 26.127417,6 19.5,6 C14.4183772,6 9.94214483,9.18783811 8.22708362,13.8757234 Z\"></path>\n</svg>\n";

	var css$2 = ".xgplayer-replay {\n  display: none; }\n\n.xgplayer-skin-default .xgplayer-replay {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 105;\n  display: none;\n  -webkit-justify-content: center;\n     -moz-box-pack: center;\n          justify-content: center;\n  -webkit-align-items: center;\n     -moz-box-align: center;\n          align-items: center;\n  background: rgba(0, 0, 0, .54);\n  -webkit-flex-direction: column;\n     -moz-box-orient: vertical;\n     -moz-box-direction: normal;\n          flex-direction: column; }\n  .xgplayer-skin-default .xgplayer-replay svg {\n    background: rgba(0, 0, 0, .58);\n    border-radius: 100%;\n    cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-replay svg path {\n      -webkit-transform: translate(20px, 21px);\n          -ms-transform: translate(20px, 21px);\n              transform: translate(20px, 21px);\n      fill: #ddd; }\n    .xgplayer-skin-default .xgplayer-replay svg:hover {\n      background: rgba(0, 0, 0, .38); }\n      .xgplayer-skin-default .xgplayer-replay svg:hover path {\n        fill: #fff; }\n  .xgplayer-skin-default .xgplayer-replay .xgplayer-replay-txt {\n    display: inline-block;\n    font-family: PingFangSC-Regular;\n    font-size: 14px;\n    color: #fff;\n    line-height: 34px; }\n\n.xgplayer-skin-default.xgplayer.xgplayer-ended .xgplayer-controls {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer.xgplayer-ended .xgplayer-replay {\n  display: -webkit-flex;\n  display: -moz-box;\n  display: flex; }\n";
	styleInject(css$2);

	var _createClass$4 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$2(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Replay = function (_Plugin) {
	  _inherits$2(Replay, _Plugin);

	  function Replay() {
	    _classCallCheck$5(this, Replay);

	    return _possibleConstructorReturn$2(this, (Replay.__proto__ || Object.getPrototypeOf(Replay)).apply(this, arguments));
	  }

	  _createClass$4(Replay, [{
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

	      this.on(Plugin.Event.ENDED, function () {
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

	var StartPlayIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"70\" height=\"70\" viewBox=\"0 0 70 70\">\n  <path transform=\"scale(0.04,0.04)\" d=\"M576,363L810,512L576,661zM342,214L576,363L576,661L342,810z\"></path>\n</svg>\n";

	var StartPauseIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"70\" height=\"70\" viewBox=\"0 0 70 70\">\n  <path transform=\"scale(0.04 0.04)\" d=\"M598,214h170v596h-170v-596zM256 810v-596h170v596h-170z\"></path>\n</svg>\n";

	var css$3 = ".xgplayer .xgplayer-start {\n  display: none;\n  border-radius: 50%;\n  display: inline-block;\n  width: 70px;\n  height: 70px;\n  background: rgba(0, 0, 0, .38);\n  overflow: hidden;\n  text-align: center;\n  line-height: 70px;\n  vertical-align: middle;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  z-index: 115;\n  margin: -35px auto auto -35px;\n  cursor: pointer; }\n  .xgplayer .xgplayer-start div {\n    position: absolute; }\n    .xgplayer .xgplayer-start div svg {\n      fill: rgba(255, 255, 255, .7);\n      margin: 14px; }\n  .xgplayer .xgplayer-start .xgplayer-icon-play {\n    display: block; }\n  .xgplayer .xgplayer-start .xgplayer-icon-pause {\n    display: none; }\n  .xgplayer .xgplayer-start:hover {\n    opacity: 0.85; }\n\n.xgplayer.xgplayer-playing .xgplayer-start {\n  display: none; }\n  .xgplayer.xgplayer-playing .xgplayer-start .xgplayer-icon-play {\n    display: none; }\n  .xgplayer.xgplayer-playing .xgplayer-start .xgplayer-icon-pause {\n    display: block; }\n\n.xgplayer.xgplayer-pause .xgplayer-start {\n  display: inline-block; }\n  .xgplayer.xgplayer-pause .xgplayer-start .xgplayer-icon-play {\n    display: block; }\n  .xgplayer.xgplayer-pause .xgplayer-start .xgplayer-icon-pause {\n    display: none; }\n\n.xgplayer.replay .xgplayer-start {\n  display: none; }\n  .xgplayer.replay .xgplayer-start .xgplayer-icon-play {\n    display: block; }\n  .xgplayer.replay .xgplayer-start .xgplayer-icon-pause {\n    display: none; }\n";
	styleInject(css$3);

	var _createClass$5 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$6(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$3(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$3(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

	      var Util = Plugin.Util;
	      var player = this.player,
	          root = this.root,
	          playerConfig = this.playerConfig;

	      Util.addClass(root, 'xgplayer-skin-default');
	      this.once('ready', function () {
	        // Util.addClass(root, 'xgplayer-skin-default')
	        if (playerConfig) {
	          if (playerConfig.lang && playerConfig.lang === 'en') {
	            Util.addClass(root, 'lang-is-en');
	          } else if (playerConfig.lang === 'jp') {
	            Util.addClass(root, 'lang-is-jp');
	          }
	        }
	      });

	      this.bind('click', function (e) {
	        if (!player.isReady) {
	          return;
	        }
	        e.preventDefault();
	        e.stopPropagation();
	        var paused = _this2.player.paused;
	        if (!paused) {
	          _this2.player.pause();
	        } else {
	          _this2.player.play();
	        }
	      });
	    }
	  }, {
	    key: 'registerIcons',
	    value: function registerIcons() {
	      return {
	        'startPlayIcon': StartPlayIcon,
	        'startPauseIcon': StartPauseIcon
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return '\n    <xg-start class="xgplayer-start">\n      <div class="xgplayer-icon-play">\n      ' + this.icons.startPlayIcon + '\n      </div>\n      <div class="xgplayer-icon-pause">\n      ' + this.icons.startPauseIcon + '\n      </div>\n    </xg-start>';
	    }
	  }], [{
	    key: 'pluginName',
	    get: function get() {
	      return 'start';
	    }
	  }]);

	  return Start;
	}(Plugin);

	/**
	 * 根据入参的播放器配置进行默认plugin列表的配置
	 * @param {object} playerConfig
	 */
	function getDefaultPlugins(playerConfig, Player) {
	  var defaultPlugins = [];
	  defaultPlugins.push(Replay);
	  defaultPlugins.push(Poster);
	  defaultPlugins.push(Start);
	  var plugins = playerConfig.plugins || [];
	  var retPlugins = defaultPlugins.concat(plugins);
	  return retPlugins;
	}

	var _createClass$6 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get$1 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck$7(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn$4(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits$4(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FULLSCREEN_EVENTS = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'];

	var Player = function (_Proxy) {
	  _inherits$4(Player, _Proxy);

	  function Player(options) {
	    _classCallCheck$7(this, Player);

	    options.plugins = getDefaultPlugins(options);

	    var _this = _possibleConstructorReturn$4(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, options));

	    _this.config = util.deepCopy({
	      width: 600,
	      height: 337.5,
	      ignores: [],
	      whitelist: [],
	      lang: (document.documentElement.getAttribute('lang') || navigator.language || 'zh-cn').toLocaleLowerCase(),
	      inactive: 3000,
	      volume: 0.6,
	      controls: true,
	      controlsList: ['nodownload']
	    }, options);
	    // timer and flags
	    _this.userTimer = null;
	    _this.waitTimer = null;
	    _this.isProgressMoving = false;
	    _this.isReady = false;
	    _this.isPlaying = false;

	    _this._initDOM();

	    _this._bindEvents();

	    _this._registerPlugins();

	    setTimeout(function () {
	      _this.emit('ready');
	      _this.isReady = true;
	    }, 0);

	    if (_this.config.videoInit) {
	      if (util.hasClass(_this.root, STATE_CLASS.NO_START)) {
	        _this.start();
	      }
	    }
	    return _this;
	  }

	  /**
	   * init control bar
	   * @private
	   */


	  _createClass$6(Player, [{
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
	          this.emit('error', new Errors('use', this.config.vid, {
	            line: 32,
	            handle: 'Constructor',
	            msg: 'container id can\'t be empty'
	          }));
	          return false;
	        }
	      }
	      // this.rootBackup = util.copyDom(this.root)
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
	        } else {
	          _this2.fullscreen = false;
	          _this2._fullscreenEl = null;
	          _this2.removeClass(STATE_CLASS.FULLSCREEN);
	        }
	      };
	      FULLSCREEN_EVENTS.forEach(function (item) {
	        document.addEventListener(item, _this2.onFullscreenChange);
	      });

	      this.once('loadeddata', this.getVideoSize);

	      this.mousemoveFunc = function () {
	        _this2.emit('focus');
	        if (!_this2.config.closeFocusVideoFocus) {
	          _this2.video.focus();
	        }
	      };
	      this.root.addEventListener('mousemove', this.mousemoveFunc);
	      this.playFunc = function () {
	        _this2.emit('focus');
	        if (!_this2.config.closePlayVideoFocus) {
	          _this2.video.focus();
	        }
	      };
	      this.once('play', this.playFunc);

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
	        this.emit('urlNull');
	      }
	      this.canPlayFunc = function () {
	        this.play();
	        player.off('canplay', this.canPlayFunc);
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
	        this.on('canplay', this.canPlayFunc);
	      }
	      root.insertBefore(this.video, root.firstChild);
	      setTimeout(function () {
	        _this4.emit('complete');
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
	          return pluginsManager.register(_this5, plugin);
	        } catch (err) {
	          return null;
	        }
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
	      if (util.hasClass(this.root, className)) {
	        util.removeClass(this.root, className);
	      }
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      var _this6 = this;

	      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.url;

	      // 已经开始初始化播放了 则直接调用play
	      if (this.hasStart) {
	        this.play();
	      } else {
	        pluginsManager.beforeInit(this).then(function () {
	          if (!url) {
	            url = _this6.url;
	          }
	          _this6._startInit(url);
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
	      var _this7 = this;

	      if (!this.hasStart) {
	        this.start();
	        return;
	      }
	      var playPromise = _get$1(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'play', this).call(this);
	      if (playPromise !== undefined && playPromise && playPromise.then) {
	        playPromise.then(function () {
	          _this7.removeClass(STATE_CLASS.NO_START);
	          _this7.addClass(STATE_CLASS.PLAYING);
	        }).catch(function (e) {
	          _this7.emit(AUTOPLAY_PREVENTED);
	          _this7.addClass(STATE_CLASS.AUTOPLAY);
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
	      _get$1(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'destroy', this).call(this);
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
	      this.removeClass(STATE_CLASS.ENDED);
	      this.currentTime = 0;
	      this.play().catch(function (err) {
	        console.log(err);
	      });
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
	      var player = this;
	      this.removeClass(STATE_CLASS.ACTIVE);
	      if (player.userTimer) {
	        clearTimeout(player.userTimer);
	      }
	      player.userTimer = setTimeout(function () {
	        player.emit('blur');
	      }, player.config.inactive);
	    }
	  }, {
	    key: 'onBlur',
	    value: function onBlur() {
	      // this.video.blur()
	      if (!this.paused && !this.ended) {
	        this.addClass(STATE_CLASS.ACTIVE);
	      }
	    }
	  }, {
	    key: 'onPlay',
	    value: function onPlay() {
	      this.addClass(STATE_CLASS.PLAYING);
	      this.removeClass(STATE_CLASS.PAUSED);
	    }
	  }, {
	    key: 'onPause',
	    value: function onPause() {
	      this.addClass(STATE_CLASS.PAUSED);
	      if (this.userTimer) {
	        clearTimeout(this.userTimer);
	      }
	      this.emit('focus');
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
	      var _this8 = this;

	      var self = this;
	      if (self.waitTimer) {
	        clearTimeout(self.waitTimer);
	      }
	      self.waitTimer = setTimeout(function () {
	        _this8.addClass(STATE_CLASS.LOADING);
	      }, 500);
	    }
	  }, {
	    key: 'onPlaying',
	    value: function onPlaying() {
	      if (this.waitTimer) {
	        clearTimeout(this.waitTimer);
	      }
	      this.removeClass(STATE_CLASS.NO_START + ' ' + STATE_CLASS.PAUSED + ' ' + STATE_CLASS.ENDED + ' ' + STATE_CLASS.ERROR + ' ' + STATE_CLASS.REPLAY);
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
	  }]);

	  return Player;
	}(Proxy);

	Player.util = util;
	Player.sniffer = sniffer;
	Player.Errors = Errors;
	Player.Plugin = Plugin;
	Player.BasePlugin = BasePlugin;

	var css$4 = ".xgplayer-skin-default {\n  background: #000;\n  width: 100%;\n  height: 100%;\n  position: relative;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n  -ms-user-select: none; }\n  .xgplayer-skin-default * {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    font: inherit;\n    vertical-align: baseline; }\n  .xgplayer-skin-default .xgplayer-none {\n    display: none; }\n  .xgplayer-skin-default.xgplayer-is-fullscreen {\n    width: 100% !important;\n    height: 100% !important;\n    padding-top: 0 !important;\n    z-index: 9999; }\n  .xgplayer-skin-default.xgplayer-is-fullscreen.xgplayer-inactive {\n    cursor: none; }\n  .xgplayer-skin-default video {\n    width: 100%;\n    height: 100%;\n    outline: none; }\n\n.xgplayer-skin-default .xgplayer-none {\n  display: none; }\n\n@-webkit-keyframes loadingRotate {\n  0% {\n    -webkit-transform: rotate(0);\n            transform: rotate(0); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n@keyframes loadingRotate {\n  0% {\n    -webkit-transform: rotate(0);\n            transform: rotate(0); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n@-webkit-keyframes loadingDashOffset {\n  0% {\n    stroke-dashoffset: 236; }\n  100% {\n    stroke-dashoffset: 0; } }\n\n@keyframes loadingDashOffset {\n  0% {\n    stroke-dashoffset: 236; }\n  100% {\n    stroke-dashoffset: 0; } }\n\n.xgplayer-skin-default .xgplayer-play, .xgplayer-skin-default .xgplayer-play-img {\n  position: relative;\n  -webkit-order: 0;\n     -moz-box-ordinal-group: 1;\n          order: 0;\n  display: block;\n  cursor: pointer; }\n  .xgplayer-skin-default .xgplayer-play .xgplayer-icon, .xgplayer-skin-default .xgplayer-play-img .xgplayer-icon {\n    margin-top: 3px;\n    width: 32px; }\n    .xgplayer-skin-default .xgplayer-play .xgplayer-icon div, .xgplayer-skin-default .xgplayer-play-img .xgplayer-icon div {\n      position: absolute; }\n    .xgplayer-skin-default .xgplayer-play .xgplayer-icon .xgplayer-icon-play, .xgplayer-skin-default .xgplayer-play-img .xgplayer-icon .xgplayer-icon-play {\n      display: block; }\n    .xgplayer-skin-default .xgplayer-play .xgplayer-icon .xgplayer-icon-pause, .xgplayer-skin-default .xgplayer-play-img .xgplayer-icon .xgplayer-icon-pause {\n      display: none; }\n  .xgplayer-skin-default .xgplayer-play .xgplayer-tips .xgplayer-tip-play, .xgplayer-skin-default .xgplayer-play-img .xgplayer-tips .xgplayer-tip-play {\n    display: block; }\n  .xgplayer-skin-default .xgplayer-play .xgplayer-tips .xgplayer-tip-pause, .xgplayer-skin-default .xgplayer-play-img .xgplayer-tips .xgplayer-tip-pause {\n    display: none; }\n  .xgplayer-skin-default .xgplayer-play:hover, .xgplayer-skin-default .xgplayer-play-img:hover {\n    opacity: 0.85; }\n    .xgplayer-skin-default .xgplayer-play:hover .xgplayer-tips, .xgplayer-skin-default .xgplayer-play-img:hover .xgplayer-tips {\n      display: block; }\n\n.xgplayer-skin-default.xgplayer-playing .xgplayer-play .xgplayer-icon .xgplayer-icon-play, .xgplayer-skin-default.xgplayer-playing .xgplayer-play-img .xgplayer-icon .xgplayer-icon-play {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-playing .xgplayer-play .xgplayer-icon .xgplayer-icon-pause, .xgplayer-skin-default.xgplayer-playing .xgplayer-play-img .xgplayer-icon .xgplayer-icon-pause {\n  display: block; }\n\n.xgplayer-skin-default.xgplayer-playing .xgplayer-play .xgplayer-tips .xgplayer-tip-play, .xgplayer-skin-default.xgplayer-playing .xgplayer-play-img .xgplayer-tips .xgplayer-tip-play {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-playing .xgplayer-play .xgplayer-tips .xgplayer-tip-pause, .xgplayer-skin-default.xgplayer-playing .xgplayer-play-img .xgplayer-tips .xgplayer-tip-pause {\n  display: block; }\n\n.xgplayer-skin-default.xgplayer-pause .xgplayer-play .xgplayer-icon .xgplayer-icon-play, .xgplayer-skin-default.xgplayer-pause .xgplayer-play-img .xgplayer-icon .xgplayer-icon-play {\n  display: block; }\n\n.xgplayer-skin-default.xgplayer-pause .xgplayer-play .xgplayer-icon .xgplayer-icon-pause, .xgplayer-skin-default.xgplayer-pause .xgplayer-play-img .xgplayer-icon .xgplayer-icon-pause {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-pause .xgplayer-play .xgplayer-tips .xgplayer-tip-play, .xgplayer-skin-default.xgplayer-pause .xgplayer-play-img .xgplayer-tips .xgplayer-tip-play {\n  display: block; }\n\n.xgplayer-skin-default.xgplayer-pause .xgplayer-play .xgplayer-tips .xgplayer-tip-pause, .xgplayer-skin-default.xgplayer-pause .xgplayer-play-img .xgplayer-tips .xgplayer-tip-pause {\n  display: none; }\n\n.xgplayer-skin-default .xgplayer-enter {\n  display: none;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background: black;\n  z-index: 120; }\n  .xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner {\n    display: block;\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    height: 100px;\n    width: 100px;\n    position: relative;\n    -webkit-transform: translate(-50%, -50%);\n        -ms-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%); }\n  .xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div {\n    width: 12%;\n    height: 26%;\n    background-color: rgba(255, 255, 255, .7);\n    position: absolute;\n    left: 44%;\n    top: 37%;\n    opacity: 0;\n    border-radius: 30px;\n    -webkit-animation: fade 1s linear infinite;\n            animation: fade 1s linear infinite; }\n  .xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar1 {\n    -webkit-transform: rotate(0deg) translate(0, -142%);\n        -ms-transform: rotate(0deg) translate(0, -142%);\n            transform: rotate(0deg) translate(0, -142%);\n    -webkit-animation-delay: -0s;\n            animation-delay: -0s; }\n  .xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar2 {\n    -webkit-transform: rotate(30deg) translate(0, -142%);\n        -ms-transform: rotate(30deg) translate(0, -142%);\n            transform: rotate(30deg) translate(0, -142%);\n    -webkit-animation-delay: -0.9163s;\n            animation-delay: -0.9163s; }\n  .xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar3 {\n    -webkit-transform: rotate(60deg) translate(0, -142%);\n        -ms-transform: rotate(60deg) translate(0, -142%);\n            transform: rotate(60deg) translate(0, -142%);\n    -webkit-animation-delay: -0.833s;\n            animation-delay: -0.833s; }\n  .xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar4 {\n    -webkit-transform: rotate(90deg) translate(0, -142%);\n        -ms-transform: rotate(90deg) translate(0, -142%);\n            transform: rotate(90deg) translate(0, -142%);\n    -webkit-animation-delay: -0.7497s;\n            animation-delay: -0.7497s; }\n  .xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar5 {\n    -webkit-transform: rotate(120deg) translate(0, -142%);\n        -ms-transform: rotate(120deg) translate(0, -142%);\n            transform: rotate(120deg) translate(0, -142%);\n    -webkit-animation-delay: -0.6664s;\n            animation-delay: -0.6664s; }\n  .xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar6 {\n    -webkit-transform: rotate(150deg) translate(0, -142%);\n        -ms-transform: rotate(150deg) translate(0, -142%);\n            transform: rotate(150deg) translate(0, -142%);\n    -webkit-animation-delay: -0.5831s;\n            animation-delay: -0.5831s; }\n  .xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar7 {\n    -webkit-transform: rotate(180deg) translate(0, -142%);\n        -ms-transform: rotate(180deg) translate(0, -142%);\n            transform: rotate(180deg) translate(0, -142%);\n    -webkit-animation-delay: -0.4998s;\n            animation-delay: -0.4998s; }\n  .xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar8 {\n    -webkit-transform: rotate(210deg) translate(0, -142%);\n        -ms-transform: rotate(210deg) translate(0, -142%);\n            transform: rotate(210deg) translate(0, -142%);\n    -webkit-animation-delay: -0.4165s;\n            animation-delay: -0.4165s; }\n  .xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar9 {\n    -webkit-transform: rotate(240deg) translate(0, -142%);\n        -ms-transform: rotate(240deg) translate(0, -142%);\n            transform: rotate(240deg) translate(0, -142%);\n    -webkit-animation-delay: -0.3332s;\n            animation-delay: -0.3332s; }\n  .xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar10 {\n    -webkit-transform: rotate(270deg) translate(0, -142%);\n        -ms-transform: rotate(270deg) translate(0, -142%);\n            transform: rotate(270deg) translate(0, -142%);\n    -webkit-animation-delay: -0.2499s;\n            animation-delay: -0.2499s; }\n  .xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar11 {\n    -webkit-transform: rotate(300deg) translate(0, -142%);\n        -ms-transform: rotate(300deg) translate(0, -142%);\n            transform: rotate(300deg) translate(0, -142%);\n    -webkit-animation-delay: -0.1666s;\n            animation-delay: -0.1666s; }\n  .xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar12 {\n    -webkit-transform: rotate(330deg) translate(0, -142%);\n        -ms-transform: rotate(330deg) translate(0, -142%);\n            transform: rotate(330deg) translate(0, -142%);\n    -webkit-animation-delay: -0.0833s;\n            animation-delay: -0.0833s; }\n\n@-webkit-keyframes fade {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0.25; } }\n\n.xgplayer-skin-default.xgplayer-is-enter .xgplayer-enter {\n  display: block; }\n\n.xgplayer-skin-default .xgplayer-placeholder {\n  -webkit-flex: 1;\n     -moz-box-flex: 1;\n          flex: 1;\n  -webkit-order: 3;\n     -moz-box-ordinal-group: 4;\n          order: 3;\n  display: block; }\n\n.xgplayer-skin-default .xgplayer-fullscreen, .xgplayer-skin-default .xgplayer-fullscreen-img {\n  position: relative;\n  -webkit-order: 13;\n     -moz-box-ordinal-group: 14;\n          order: 13;\n  display: block;\n  cursor: pointer; }\n  .xgplayer-skin-default .xgplayer-fullscreen .xgplayer-icon, .xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-icon {\n    margin-top: 3px; }\n    .xgplayer-skin-default .xgplayer-fullscreen .xgplayer-icon div, .xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-icon div {\n      position: absolute; }\n    .xgplayer-skin-default .xgplayer-fullscreen .xgplayer-icon .xgplayer-icon-requestfull, .xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-icon .xgplayer-icon-requestfull {\n      display: block; }\n    .xgplayer-skin-default .xgplayer-fullscreen .xgplayer-icon .xgplayer-icon-exitfull, .xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-icon .xgplayer-icon-exitfull {\n      display: none; }\n  .xgplayer-skin-default .xgplayer-fullscreen .xgplayer-tips, .xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-tips {\n    position: absolute;\n    right: 0;\n    left: auto; }\n    .xgplayer-skin-default .xgplayer-fullscreen .xgplayer-tips .xgplayer-tip-requestfull, .xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-tips .xgplayer-tip-requestfull {\n      display: block; }\n    .xgplayer-skin-default .xgplayer-fullscreen .xgplayer-tips .xgplayer-tip-exitfull, .xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-tips .xgplayer-tip-exitfull {\n      display: none; }\n  .xgplayer-skin-default .xgplayer-fullscreen:hover, .xgplayer-skin-default .xgplayer-fullscreen-img:hover {\n    opacity: 0.85; }\n    .xgplayer-skin-default .xgplayer-fullscreen:hover .xgplayer-tips, .xgplayer-skin-default .xgplayer-fullscreen-img:hover .xgplayer-tips {\n      display: block; }\n\n.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen .xgplayer-icon .xgplayer-icon-requestfull, .xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen-img .xgplayer-icon .xgplayer-icon-requestfull {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen .xgplayer-icon .xgplayer-icon-exitfull, .xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen-img .xgplayer-icon .xgplayer-icon-exitfull {\n  display: block; }\n\n.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen .xgplayer-tips .xgplayer-tip-requestfull, .xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen-img .xgplayer-tips .xgplayer-tip-requestfull {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen .xgplayer-tips .xgplayer-tip-exitfull, .xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen-img .xgplayer-tips .xgplayer-tip-exitfull {\n  display: block; }\n\n.xgplayer-skin-default .xgplayer-cssfullscreen, .xgplayer-skin-default .xgplayer-cssfullscreen-img {\n  position: relative;\n  -webkit-order: 12;\n     -moz-box-ordinal-group: 13;\n          order: 12;\n  display: block;\n  cursor: pointer; }\n  .xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-icon, .xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-icon {\n    width: 32px;\n    margin-top: 5px; }\n    .xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-icon div, .xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-icon div {\n      position: absolute; }\n    .xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-icon .xgplayer-icon-requestfull, .xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-icon .xgplayer-icon-requestfull {\n      display: block; }\n    .xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-icon .xgplayer-icon-exitfull, .xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-icon .xgplayer-icon-exitfull {\n      display: none; }\n  .xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-tips, .xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-tips {\n    margin-left: -40px; }\n    .xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-tips .xgplayer-tip-requestfull, .xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-tips .xgplayer-tip-requestfull {\n      display: block; }\n    .xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-tips .xgplayer-tip-exitfull, .xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-tips .xgplayer-tip-exitfull {\n      display: none; }\n  .xgplayer-skin-default .xgplayer-cssfullscreen:hover, .xgplayer-skin-default .xgplayer-cssfullscreen-img:hover {\n    opacity: 0.85; }\n    .xgplayer-skin-default .xgplayer-cssfullscreen:hover .xgplayer-tips, .xgplayer-skin-default .xgplayer-cssfullscreen-img:hover .xgplayer-tips {\n      display: block; }\n\n.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-icon .xgplayer-icon-requestfull, .xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-icon .xgplayer-icon-requestfull {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-icon .xgplayer-icon-exitfull, .xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-icon .xgplayer-icon-exitfull {\n  display: block; }\n\n.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-tips, .xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-tips {\n  margin-left: -47px; }\n  .xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-tips .xgplayer-tip-requestfull, .xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-tips .xgplayer-tip-requestfull {\n    display: none; }\n  .xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-tips .xgplayer-tip-exitfull, .xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-tips .xgplayer-tip-exitfull {\n    display: block; }\n\n.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-cssfullscreen, .xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-cssfullscreen-img {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-is-cssfullscreen {\n  position: fixed !important;\n  left: 0 !important;\n  top: 0 !important;\n  width: 100% !important;\n  height: 100% !important;\n  z-index: 99999 !important; }\n\n.lang-is-en .xgplayer-cssfullscreen .xgplayer-tips, .lang-is-en .xgplayer-cssfullscreen-img .xgplayer-tips {\n  margin-left: -46px; }\n\n.lang-is-en.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-tips, .lang-is-en.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-tips {\n  margin-left: -46px; }\n\n.lang-is-jp .xgplayer-cssfullscreen .xgplayer-tips, .lang-is-jp .xgplayer-cssfullscreen-img .xgplayer-tips {\n  margin-left: -120px; }\n\n.lang-is-jp.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-tips, .lang-is-jp.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-tips {\n  margin-left: -60px; }\n\n.xgplayer-skin-default .xgplayer-volume {\n  outline: none;\n  -webkit-order: 4;\n     -moz-box-ordinal-group: 5;\n          order: 4;\n  width: 28px;\n  height: 140px;\n  display: block;\n  position: relative;\n  margin-top: -100px;\n  overflow: hidden;\n  z-index: 18; }\n  .xgplayer-skin-default .xgplayer-volume .xgplayer-icon {\n    margin-top: 8px;\n    cursor: pointer;\n    position: absolute;\n    bottom: -9px; }\n    .xgplayer-skin-default .xgplayer-volume .xgplayer-icon div {\n      position: absolute; }\n    .xgplayer-skin-default .xgplayer-volume .xgplayer-icon .xgplayer-icon-large {\n      display: block; }\n    .xgplayer-skin-default .xgplayer-volume .xgplayer-icon .xgplayer-icon-small {\n      display: none; }\n    .xgplayer-skin-default .xgplayer-volume .xgplayer-icon .xgplayer-icon-muted {\n      display: none; }\n\n.xgplayer-skin-default .xgplayer-slider {\n  display: none;\n  position: absolute;\n  width: 28px;\n  height: 92px;\n  background: rgba(0, 0, 0, .54);\n  border-radius: 1px;\n  bottom: 42px;\n  outline: none; }\n  .xgplayer-skin-default .xgplayer-slider:after {\n    content: \" \";\n    display: block;\n    height: 15px;\n    width: 28px;\n    position: absolute;\n    bottom: -15px;\n    left: 0;\n    z-index: 20; }\n\n.xgplayer-skin-default .xgplayer-bar, .xgplayer-skin-default .xgplayer-drag {\n  display: block;\n  position: absolute;\n  bottom: 6px;\n  left: 12px;\n  background: rgba(255, 255, 255, .3);\n  border-radius: 100px;\n  width: 4px;\n  height: 76px;\n  outline: none;\n  cursor: pointer; }\n\n.xgplayer-skin-default .xgplayer-drag {\n  bottom: 0;\n  left: 0;\n  background: #FA1F41;\n  max-height: 76px; }\n  .xgplayer-skin-default .xgplayer-drag:after {\n    content: \" \";\n    display: inline-block;\n    width: 8px;\n    height: 8px;\n    background: #fff;\n    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .26);\n    position: absolute;\n    border-radius: 50%;\n    left: -2px;\n    top: -6px; }\n\n.xgplayer-skin-default.xgplayer-volume-active .xgplayer-slider {\n  display: block; }\n\n.xgplayer-skin-default.xgplayer-volume-large .xgplayer-volume .xgplayer-icon .xgplayer-icon-large {\n  display: block; }\n\n.xgplayer-skin-default.xgplayer-volume-large .xgplayer-volume .xgplayer-icon .xgplayer-icon-small {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-volume-large .xgplayer-volume .xgplayer-icon .xgplayer-icon-muted {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-volume-small .xgplayer-volume .xgplayer-icon .xgplayer-icon-large {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-volume-small .xgplayer-volume .xgplayer-icon .xgplayer-icon-small {\n  display: block; }\n\n.xgplayer-skin-default.xgplayer-volume-small .xgplayer-volume .xgplayer-icon .xgplayer-icon-muted {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-volume-muted .xgplayer-volume .xgplayer-icon .xgplayer-icon-large {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-volume-muted .xgplayer-volume .xgplayer-icon .xgplayer-icon-small {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-volume-muted .xgplayer-volume .xgplayer-icon .xgplayer-icon-muted {\n  display: block; }\n\n.xgplayer-skin-default.xgplayer-mobile .xgplayer-volume .xgplayer-slider {\n  display: none; }\n\n.xgplayer-skin-default .xgplayer-definition {\n  -webkit-order: 5;\n     -moz-box-ordinal-group: 6;\n          order: 5;\n  width: 60px;\n  height: 150px;\n  z-index: 18;\n  position: relative;\n  outline: none;\n  display: none;\n  cursor: default;\n  margin-left: 10px;\n  margin-top: -119px; }\n  .xgplayer-skin-default .xgplayer-definition ul {\n    display: none;\n    list-style: none;\n    width: 78px;\n    background: rgba(0, 0, 0, .54);\n    border-radius: 1px;\n    position: absolute;\n    bottom: 30px;\n    left: 0;\n    text-align: center;\n    white-space: nowrap;\n    margin-left: -10px;\n    z-index: 26;\n    cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-definition ul li {\n      opacity: 0.7;\n      font-family: PingFangSC-Regular;\n      font-size: 11px;\n      color: rgba(255, 255, 255, .8);\n      padding: 6px 13px; }\n      .xgplayer-skin-default .xgplayer-definition ul li.selected {\n        color: #fff;\n        opacity: 1; }\n      .xgplayer-skin-default .xgplayer-definition ul li:hover {\n        color: #fff;\n        opacity: 1; }\n  .xgplayer-skin-default .xgplayer-definition .name {\n    text-align: center;\n    font-family: PingFangSC-Regular;\n    font-size: 13px;\n    line-height: 20px;\n    height: 20px;\n    cursor: pointer;\n    color: rgba(255, 255, 255, .8);\n    position: absolute;\n    bottom: 0;\n    width: 60px;\n    height: 20px;\n    line-height: 20px;\n    background: rgba(0, 0, 0, .38);\n    border-radius: 10px;\n    display: inline-block;\n    vertical-align: middle; }\n\n.xgplayer-skin-default.xgplayer-definition-active .xgplayer-definition ul {\n  display: block; }\n\n.xgplayer-skin-default.xgplayer-is-definition .xgplayer-definition {\n  display: block; }\n\n.xgplayer-skin-default .xgplayer-time {\n  -webkit-order: 2;\n     -moz-box-ordinal-group: 3;\n          order: 2;\n  font-family: ArialMT;\n  font-size: 13px;\n  color: #fff;\n  line-height: 40px;\n  text-align: center;\n  display: inline-block; }\n  .xgplayer-skin-default .xgplayer-time span::after {\n    content: \"/\";\n    display: inline-block;\n    padding: 0 3px; }\n  .xgplayer-skin-default .xgplayer-time em {\n    color: rgba(255, 255, 255, .5); }\n\n.xgplayer-skin-default .xgplayer-controls {\n  display: -webkit-flex;\n  display: -moz-box;\n  display: flex;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 40px;\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .37), rgba(0, 0, 0, .75), rgba(0, 0, 0, .75));\n  z-index: 10; }\n\n.xgplayer-skin-default.xgplayer-nostart .xgplayer-controls {\n  display: none; }\n\n.xgplayer-skin-default.no-controls .xgplayer-controls {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-inactive .xgplayer-controls {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-is-live .xgplayer-controls > * {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-is-live .xgplayer-controls .xgplayer-play,\n.xgplayer-skin-default.xgplayer-is-live .xgplayer-controls .xgplayer-play-img,\n.xgplayer-skin-default.xgplayer-is-live .xgplayer-controls .xgplayer-placeholder,\n.xgplayer-skin-default.xgplayer-is-live .xgplayer-controls .xgplayer-volume,\n.xgplayer-skin-default.xgplayer-is-live .xgplayer-controls .xgplayer-live,\n.xgplayer-skin-default.xgplayer-is-live .xgplayer-controls .xgplayer-definition,\n.xgplayer-skin-default.xgplayer-is-live .xgplayer-controls .xgplayer-cssfullscreen,\n.xgplayer-skin-default.xgplayer-is-live .xgplayer-controls .xgplayer-fullscreen {\n  display: block; }\n\n.xgplayer-skin-default .xgplayer-live {\n  display: block;\n  font-size: 12px;\n  color: #fff;\n  line-height: 40px;\n  -webkit-order: 1;\n     -moz-box-ordinal-group: 2;\n          order: 1; }\n\n.xgplayer-skin-default .xgplayer-loading {\n  display: none;\n  width: 100px;\n  height: 100px;\n  overflow: hidden;\n  -webkit-transform: scale(0.7);\n      -ms-transform: scale(0.7);\n          transform: scale(0.7);\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  margin: -70px auto auto -50px; }\n  .xgplayer-skin-default .xgplayer-loading svg {\n    border-radius: 50%;\n    -webkit-transform-origin: center;\n        -ms-transform-origin: center;\n            transform-origin: center;\n    -webkit-animation: loadingRotate 1s linear infinite;\n            animation: loadingRotate 1s linear infinite; }\n    .xgplayer-skin-default .xgplayer-loading svg path {\n      stroke: #ddd;\n      stroke-dasharray: 236;\n      -webkit-animation: loadingDashOffset 2s linear infinite;\n              animation: loadingDashOffset 2s linear infinite;\n      animation-direction: alternate-reverse;\n      fill: none;\n      stroke-width: 12px; }\n\n.xgplayer-skin-default.xgplayer-nostart .xgplayer-loading {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-isloading .xgplayer-loading {\n  display: block; }\n\n.xgplayer-skin-default.xgplayer-ended .xgplayer-loading {\n  display: none; }\n\n.xgplayer-skin-default .xgplayer-progress {\n  display: block;\n  position: absolute;\n  height: 20px;\n  line-height: 20px;\n  left: 12px;\n  right: 12px;\n  outline: none;\n  top: -10px;\n  z-index: 35; }\n\n.xgplayer-skin-default .xgplayer-progress-outer {\n  background: rgba(255, 255, 255, .3);\n  display: block;\n  height: 3px;\n  line-height: 3px;\n  margin-top: 8.5px;\n  width: 100%;\n  position: relative;\n  cursor: pointer; }\n\n.xgplayer-skin-default .xgplayer-progress-cache, .xgplayer-skin-default .xgplayer-progress-played {\n  display: block;\n  height: 100%;\n  line-height: 1;\n  position: absolute;\n  left: 0;\n  top: 0; }\n\n.xgplayer-skin-default .xgplayer-progress-cache {\n  width: 0;\n  background: rgba(255, 255, 255, .5); }\n\n.xgplayer-skin-default .xgplayer-progress-played {\n  display: block;\n  width: 0;\n  background-image: linear-gradient(-90deg, #FA1F41 0%, #E31106 100%);\n  border-radius: 0 1.5px 1.5px 0; }\n\n.xgplayer-skin-default .xgplayer-progress-btn {\n  display: none;\n  position: absolute;\n  left: 0px;\n  top: -5px;\n  width: 13px;\n  height: 13px;\n  border-radius: 30px;\n  background: #FFFFFF;\n  box-shadow: 0 0 2px 0 rgba(0, 0, 0, .26);\n  left: 100%;\n  -webkit-transform: translate(-50%, 0);\n      -ms-transform: translate(-50%, 0);\n          transform: translate(-50%, 0); }\n\n.xgplayer-skin-default .xgplayer-progress-point {\n  position: absolute; }\n  .xgplayer-skin-default .xgplayer-progress-point.xgplayer-tips {\n    margin-left: 0;\n    top: -25px;\n    display: none;\n    z-index: 100; }\n\n.xgplayer-skin-default .xgplayer-progress-dot {\n  display: inline-block;\n  position: absolute;\n  height: 3px;\n  width: 5px;\n  top: 0px;\n  background: white;\n  border-radius: 6px;\n  z-index: 16; }\n  .xgplayer-skin-default .xgplayer-progress-dot .xgplayer-progress-tip {\n    position: absolute;\n    left: 0;\n    top: -40px;\n    height: auto;\n    line-height: 30px;\n    width: auto;\n    -webkit-transform: scale(0.8);\n        -ms-transform: scale(0.8);\n            transform: scale(0.8);\n    background: rgba(0, 0, 0, .3);\n    border-radius: 6px;\n    border: 1px solid rgba(0, 0, 0, .8);\n    cursor: default;\n    white-space: nowrap;\n    display: none; }\n\n.xgplayer-skin-default .xgplayer-progress-dot-show .xgplayer-progress-tip {\n  display: block; }\n\n.xgplayer-skin-default .xgplayer-progress-thumbnail {\n  position: absolute;\n  -moz-box-sizing: border-box;\n       box-sizing: border-box; }\n  .xgplayer-skin-default .xgplayer-progress-thumbnail.xgplayer-tips {\n    margin-left: 0;\n    display: none;\n    z-index: 99; }\n\n.xgplayer-skin-default .xgplayer-progress:hover .xgplayer-progress-outer, .xgplayer-skin-default .xgplayer-progress:focus .xgplayer-progress-outer {\n  height: 6px;\n  margin-top: 7px; }\n\n.xgplayer-skin-default .xgplayer-progress:hover .xgplayer-progress-dot, .xgplayer-skin-default .xgplayer-progress:focus .xgplayer-progress-dot {\n  height: 6px; }\n\n.xgplayer-skin-default .xgplayer-progress:hover .xgplayer-progress-btn, .xgplayer-skin-default .xgplayer-progress:focus .xgplayer-progress-btn {\n  display: block;\n  top: -3px; }\n\n.xgplayer-skin-default.xgplayer-volume-active .xgplayer-progress {\n  z-index: 15; }\n\n.xgplayer-skin-default.xgplayer-definition-active .xgplayer-progress {\n  z-index: 15; }\n\n.xgplayer-skin-default.xgplayer-texttrack-active .xgplayer-progress {\n  z-index: 15; }\n\n.xgplayer-skin-default.xgplayer-playbackrate-active .xgplayer-progress {\n  z-index: 15; }\n\n.xgplayer-skin-default.xgplayer-mobile .xgplayer-progress-btn {\n  display: block !important; }\n\n.xgplayer-skin-default.xgplayer-mobile .xgplayer-progress:hover .xgplayer-progress-outer, .xgplayer-skin-default.xgplayer-mobile .xgplayer-progress:focus .xgplayer-progress-outer {\n  height: 3px !important;\n  margin-top: 8.5px !important; }\n\n.xgplayer-skin-default.xgplayer-mobile .xgplayer-progress:hover .xgplayer-progress-btn, .xgplayer-skin-default.xgplayer-mobile .xgplayer-progress:focus .xgplayer-progress-btn {\n  display: block !important;\n  top: -5px !important; }\n\n.xgplayer-skin-default .xgplayer-playbackrate {\n  -webkit-order: 8;\n     -moz-box-ordinal-group: 9;\n          order: 8;\n  width: 60px;\n  height: 20px;\n  z-index: 18;\n  position: relative;\n  display: inline-block;\n  cursor: default; }\n  .xgplayer-skin-default .xgplayer-playbackrate ul {\n    display: none;\n    list-style: none;\n    width: 78px;\n    background: rgba(0, 0, 0, .54);\n    border-radius: 1px;\n    position: absolute;\n    bottom: 20px;\n    left: 0px;\n    text-align: left;\n    white-space: nowrap;\n    z-index: 26;\n    cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-playbackrate ul li {\n      opacity: 0.7;\n      font-family: PingFangSC-Regular;\n      font-size: 11px;\n      color: rgba(255, 255, 255, .8);\n      position: relative;\n      padding: 4px 0 4px 0px;\n      text-align: center; }\n      .xgplayer-skin-default .xgplayer-playbackrate ul li.selected {\n        color: #fff;\n        opacity: 1; }\n      .xgplayer-skin-default .xgplayer-playbackrate ul li:hover {\n        color: #fff;\n        opacity: 1; }\n    .xgplayer-skin-default .xgplayer-playbackrate ul li:nth-child(1) {\n      position: relative;\n      margin-top: 12px; }\n    .xgplayer-skin-default .xgplayer-playbackrate ul li:last-child {\n      position: relative;\n      margin-bottom: 12px; }\n  .xgplayer-skin-default .xgplayer-playbackrate .name {\n    height: 20px;\n    position: relative;\n    top: 11px;\n    text-align: center;\n    background: rgba(0, 0, 0, .38);\n    color: rgba(255, 255, 255, .8);\n    border-radius: 10px;\n    line-height: 20px; }\n  .xgplayer-skin-default .xgplayer-playbackrate span {\n    position: relative;\n    top: 19px;\n    font-weight: bold;\n    text-shadow: 0 0 4px rgba(0, 0, 0, .6); }\n  .xgplayer-skin-default .xgplayer-playbackrate:hover {\n    opacity: 1; }\n\n.xgplayer-skin-default.xgplayer-playbackrate-active .xgplayer-playbackrate ul {\n  display: block; }\n\n.xgplayer-skin-default .xgplayer-download {\n  position: relative;\n  -webkit-order: 9;\n     -moz-box-ordinal-group: 10;\n          order: 9;\n  display: block;\n  cursor: pointer; }\n  .xgplayer-skin-default .xgplayer-download .xgplayer-icon {\n    margin-top: 3px; }\n    .xgplayer-skin-default .xgplayer-download .xgplayer-icon div {\n      position: absolute; }\n    .xgplayer-skin-default .xgplayer-download .xgplayer-icon svg {\n      position: relative;\n      top: 5px;\n      left: 5px; }\n  .xgplayer-skin-default .xgplayer-download .xgplayer-tips {\n    margin-left: -20px; }\n    .xgplayer-skin-default .xgplayer-download .xgplayer-tips .xgplayer-tip-download {\n      display: block; }\n  .xgplayer-skin-default .xgplayer-download:hover {\n    opacity: 0.85; }\n    .xgplayer-skin-default .xgplayer-download:hover .xgplayer-tips {\n      display: block; }\n\n.lang-is-en .xgplayer-download .xgplayer-tips {\n  margin-left: -32px; }\n\n.lang-is-jp .xgplayer-download .xgplayer-tips {\n  margin-left: -40px; }\n\n.xgplayer-skin-default .danmu-switch {\n  -webkit-order: 6;\n     -moz-box-ordinal-group: 7;\n          order: 6;\n  z-index: 26; }\n\n.xgplayer-skin-default .xgplayer-danmu {\n  display: none;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 100%;\n  overflow: hidden;\n  z-index: 9;\n  outline: none; }\n  .xgplayer-skin-default .xgplayer-danmu > * {\n    position: absolute;\n    white-space: nowrap;\n    z-index: 9; }\n\n.xgplayer-skin-default .xgplayer-danmu.xgplayer-has-danmu {\n  display: block; }\n\n.xgplayer-skin-default .xgplayer-panel {\n  outline: none;\n  -webkit-order: 7;\n     -moz-box-ordinal-group: 8;\n          order: 7;\n  width: 40px;\n  height: 40px;\n  display: inline-block;\n  position: relative;\n  font-family: PingFangSC-Regular;\n  font-size: 13px;\n  color: rgba(255, 255, 255, .8);\n  z-index: 36; }\n  .xgplayer-skin-default .xgplayer-panel .xgplayer-panel-icon {\n    cursor: pointer;\n    position: absolute;\n    margin-left: 5px;\n    top: 10px; }\n\n.xgplayer-skin-default .xgplayer-panel-active {\n  display: block !important;\n  bottom: 30px; }\n\n.xgplayer-skin-default .xgplayer-panel-slider {\n  z-index: 36;\n  display: none;\n  position: absolute;\n  width: 230px;\n  height: 230px;\n  background: rgba(0, 0, 0, .54);\n  border-radius: 1px;\n  padding: 10px 20px;\n  outline: none;\n  left: -115px;\n  bottom: 40px; }\n  .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-hidemode {\n    padding-bottom: 10px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-hidemode-radio li {\n      display: inline;\n      list-style: none;\n      cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-hidemode ul {\n      display: -webkit-flex;\n      display: -moz-box;\n      display: flex;\n      -webkit-justify-content: space-around;\n              justify-content: space-around; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-hidemode li {\n      margin: 0 12px;\n      font-size: 11px;\n      color: #aaa; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-hidemode-font {\n      margin-bottom: 10px; }\n  .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency {\n    display: block;\n    margin-top: 10px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-line {\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      cursor: pointer;\n      outline: none;\n      width: 150px;\n      height: 4px;\n      background: #aaa;\n      border-radius: 4px;\n      border-style: none;\n      margin-left: 10px;\n      margin-top: -2px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-line::-moz-focus-outer {\n      border: 0 !important; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-color::-webkit-slider-runnable-track {\n      outline: none;\n      width: 150px;\n      height: 4px;\n      border-radius: 4px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-color::-moz-range-track {\n      outline: none;\n      background-color: #aaa;\n      border-color: transparent;\n      cursor: pointer;\n      width: 150px;\n      height: 4px;\n      border-radius: 4px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-color::-ms-track {\n      outline: none;\n      background-color: #aaa;\n      color: transparent;\n      border-color: transparent;\n      width: 150px;\n      height: 4px;\n      border-radius: 4px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-bar::-webkit-slider-thumb {\n      outline: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      border: 6px solid #f85959;\n      height: 6px;\n      width: 6px;\n      margin-top: -4px;\n      border-radius: 6px;\n      cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-bar::-moz-range-thumb {\n      outline: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      border: 6px solid #f85959;\n      height: 0;\n      width: 0;\n      border-radius: 6px;\n      cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-bar::-ms-thumb {\n      outline: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      border: 6px solid #f85959;\n      height: 6px;\n      width: 6px;\n      border-radius: 6px;\n      cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-bar::-moz-range-progress {\n      outline: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      height: 4px;\n      border-radius: 4px;\n      background: linear-gradient(to right, #f85959, #f85959 100%, #aaa); }\n  .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea {\n    display: block;\n    margin-top: 8px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-name {\n      display: inline-block;\n      position: relative;\n      top: -10px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-control {\n      display: inline-block; }\n      .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-control-up {\n        width: 150px;\n        margin-left: 10px;\n        display: -moz-box;\n        display: -webkit-flex;\n        display: flex;\n        -webkit-justify-content: space-between;\n           -moz-box-pack: justify;\n                justify-content: space-between;\n        color: #aaa; }\n      .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-control-down {\n        position: relative;\n        top: -10px; }\n      .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-control-down-dots {\n        display: -webkit-flex;\n        display: -moz-box;\n        display: flex;\n        width: 150px;\n        margin-left: 10px;\n        -webkit-justify-content: space-between;\n           -moz-box-pack: justify;\n                justify-content: space-between; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-twoquarters {\n      margin-left: -6px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-threequarters {\n      margin-left: -6px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-full {\n      margin-right: 3px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-line {\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      cursor: pointer;\n      outline: none;\n      width: 150px;\n      height: 4px;\n      background: #aaa;\n      border-radius: 4px;\n      border-style: none;\n      margin-left: 10px;\n      margin-top: -2px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-line::-moz-focus-outer {\n      border: 0 !important; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-color::-webkit-slider-runnable-track {\n      outline: none;\n      width: 150px;\n      height: 4px;\n      border-radius: 4px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-color::-moz-range-track {\n      outline: none;\n      background-color: #aaa;\n      border-color: transparent;\n      cursor: pointer;\n      width: 150px;\n      height: 4px;\n      border-radius: 4px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-color::-ms-track {\n      outline: none;\n      background-color: #aaa;\n      color: transparent;\n      border-color: transparent;\n      width: 150px;\n      height: 4px;\n      border-radius: 4px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-bar::-webkit-slider-thumb {\n      outline: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      border: 6px solid #f85959;\n      height: 6px;\n      width: 6px;\n      margin-top: -4px;\n      border-radius: 6px;\n      cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-bar::-moz-range-thumb {\n      outline: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      border: 6px solid #f85959;\n      height: 0;\n      width: 0;\n      border-radius: 6px;\n      cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-bar::-ms-thumb {\n      outline: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      border: 6px solid #f85959;\n      height: 6px;\n      width: 6px;\n      border-radius: 6px;\n      cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-zero-dot {\n      width: 3px;\n      height: 3px;\n      border: 3px solid #aaa;\n      border-radius: 50%;\n      background-color: #aaa;\n      position: relative;\n      top: 16px;\n      z-index: -1; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-onequarters-dot {\n      width: 3px;\n      height: 3px;\n      border: 3px solid #aaa;\n      border-radius: 50%;\n      background-color: #aaa;\n      position: relative;\n      top: 16px;\n      z-index: -1; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-twoquarters-dot {\n      width: 3px;\n      height: 3px;\n      border: 3px solid #aaa;\n      border-radius: 50%;\n      background-color: #aaa;\n      position: relative;\n      top: 16px;\n      z-index: -1; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-threequarters-dot {\n      width: 3px;\n      height: 3px;\n      border: 3px solid #aaa;\n      border-radius: 50%;\n      background-color: #aaa;\n      position: relative;\n      top: 16px;\n      z-index: -1; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-full-dot {\n      width: 3px;\n      height: 3px;\n      border: 3px solid #aaa;\n      border-radius: 50%;\n      background-color: #aaa;\n      position: relative;\n      top: 16px;\n      z-index: -1; }\n  .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed {\n    display: block; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed-name {\n      display: inline-block;\n      position: relative;\n      top: -10px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed-control {\n      display: inline-block; }\n      .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed-control-up {\n        width: 150px;\n        margin-left: 10px;\n        display: -moz-box;\n        display: -webkit-flex;\n        display: flex;\n        -webkit-justify-content: space-between;\n           -moz-box-pack: justify;\n                justify-content: space-between;\n        color: #aaa; }\n      .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed-control-down {\n        position: relative;\n        top: -10px; }\n      .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed-control-down-dots {\n        display: -webkit-flex;\n        display: -moz-box;\n        display: flex;\n        width: 150px;\n        margin-left: 10px;\n        -webkit-justify-content: space-between;\n           -moz-box-pack: justify;\n                justify-content: space-between; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-line {\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      cursor: pointer;\n      outline: none;\n      width: 150px;\n      height: 4px;\n      background: #aaa;\n      border-radius: 4px;\n      border-style: none;\n      margin-left: 10px;\n      margin-top: -2px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-line::-moz-focus-outer {\n      border: 0 !important; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-color::-webkit-slider-runnable-track {\n      outline: none;\n      width: 150px;\n      height: 4px;\n      border-radius: 4px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-color::-moz-range-track {\n      outline: none;\n      background-color: #aaa;\n      border-color: transparent;\n      cursor: pointer;\n      width: 150px;\n      height: 4px;\n      border-radius: 4px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-color::-ms-track {\n      outline: none;\n      background-color: #aaa;\n      color: transparent;\n      border-color: transparent;\n      width: 150px;\n      height: 4px;\n      border-radius: 4px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-bar::-webkit-slider-thumb {\n      outline: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      border: 6px solid #f85959;\n      height: 6px;\n      width: 6px;\n      margin-top: -4px;\n      border-radius: 6px;\n      cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-bar::-moz-range-thumb {\n      outline: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      border: 6px solid #f85959;\n      height: 0;\n      width: 0;\n      border-radius: 6px;\n      cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-bar::-ms-thumb {\n      outline: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      border: 6px solid #f85959;\n      height: 6px;\n      width: 6px;\n      border-radius: 6px;\n      cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-small-dot {\n      width: 3px;\n      height: 3px;\n      border: 3px solid #aaa;\n      border-radius: 50%;\n      background-color: #aaa;\n      position: relative;\n      top: 16px;\n      z-index: -1; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-middle-dot {\n      width: 3px;\n      height: 3px;\n      border: 3px solid #aaa;\n      border-radius: 50%;\n      background-color: #aaa;\n      position: relative;\n      top: 16px;\n      z-index: -1; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-large-dot {\n      width: 3px;\n      height: 3px;\n      border: 3px solid #aaa;\n      border-radius: 50%;\n      background-color: #aaa;\n      position: relative;\n      top: 16px;\n      z-index: -1; }\n  .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont {\n    display: block; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont-name {\n      display: inline-block;\n      position: relative;\n      top: -10px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont-control {\n      display: inline-block; }\n      .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont-control-up {\n        width: 150px;\n        margin-left: 10px;\n        display: -moz-box;\n        display: -webkit-flex;\n        display: flex;\n        -webkit-justify-content: space-between;\n           -moz-box-pack: justify;\n                justify-content: space-between;\n        color: #aaa; }\n      .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont-control-down {\n        position: relative;\n        top: -10px; }\n      .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont-control-down-dots {\n        display: -webkit-flex;\n        display: -moz-box;\n        display: flex;\n        width: 150px;\n        margin-left: 10px;\n        -webkit-justify-content: space-between;\n           -moz-box-pack: justify;\n                justify-content: space-between; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-line {\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      cursor: pointer;\n      outline: none;\n      width: 150px;\n      height: 4px;\n      background: #aaa;\n      border-radius: 4px;\n      border-style: none;\n      margin-left: 10px;\n      margin-top: -2px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-line::-moz-focus-outer {\n      border: 0 !important; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-color::-webkit-slider-runnable-track {\n      outline: none;\n      width: 150px;\n      height: 4px;\n      border-radius: 4px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-color::-moz-range-track {\n      outline: none;\n      background-color: #aaa;\n      border-color: transparent;\n      cursor: pointer;\n      width: 150px;\n      height: 4px;\n      border-radius: 4px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-color::-ms-track {\n      outline: none;\n      background-color: #aaa;\n      color: transparent;\n      border-color: transparent;\n      width: 150px;\n      height: 4px;\n      border-radius: 4px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-bar::-webkit-slider-thumb {\n      outline: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      border: 6px solid #f85959;\n      height: 6px;\n      width: 6px;\n      margin-top: -4px;\n      border-radius: 6px;\n      cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-bar::-moz-range-thumb {\n      outline: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      border: 6px solid #f85959;\n      height: 0;\n      width: 0;\n      border-radius: 6px;\n      cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-bar::-ms-thumb {\n      outline: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      border: 6px solid #f85959;\n      height: 6px;\n      width: 6px;\n      border-radius: 6px;\n      cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-small-dot {\n      width: 3px;\n      height: 3px;\n      border: 3px solid #aaa;\n      border-radius: 50%;\n      background-color: #aaa;\n      position: relative;\n      top: 16px;\n      z-index: -1; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-middle-dot {\n      width: 3px;\n      height: 3px;\n      border: 3px solid #aaa;\n      border-radius: 50%;\n      background-color: #aaa;\n      position: relative;\n      top: 16px;\n      z-index: -1; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-large-dot {\n      width: 3px;\n      height: 3px;\n      border: 3px solid #aaa;\n      border-radius: 50%;\n      background-color: #aaa;\n      position: relative;\n      top: 16px;\n      z-index: -1; }\n\n.xgplayer-skin-default .xgplayer-playnext {\n  position: relative;\n  -webkit-order: 1;\n     -moz-box-ordinal-group: 2;\n          order: 1;\n  display: block;\n  cursor: pointer;\n  top: -2px; }\n  .xgplayer-skin-default .xgplayer-playnext .xgplayer-icon div {\n    position: absolute; }\n  .xgplayer-skin-default .xgplayer-playnext .xgplayer-tips .xgplayer-tip-playnext {\n    display: block; }\n  .xgplayer-skin-default .xgplayer-playnext:hover {\n    opacity: 0.85; }\n    .xgplayer-skin-default .xgplayer-playnext:hover .xgplayer-tips {\n      display: block; }\n\n.lang-is-en .xgplayer-playnext .xgplayer-tips {\n  margin-left: -25px; }\n\n.lang-is-jp .xgplayer-playnext .xgplayer-tips {\n  margin-left: -38px; }\n\n.xgplayer-skin-default .xgplayer-pip {\n  -webkit-order: 9;\n     -moz-box-ordinal-group: 10;\n          order: 9;\n  position: relative;\n  outline: none;\n  display: block;\n  cursor: pointer;\n  height: 20px;\n  top: 8px; }\n  .xgplayer-skin-default .xgplayer-pip .name {\n    text-align: center;\n    font-family: PingFangSC-Regular;\n    font-size: 13px;\n    line-height: 20px;\n    height: 20px;\n    color: rgba(255, 255, 255, .8); }\n    .xgplayer-skin-default .xgplayer-pip .name span {\n      width: 60px;\n      height: 20px;\n      line-height: 20px;\n      background: rgba(0, 0, 0, .38);\n      border-radius: 10px;\n      display: inline-block;\n      vertical-align: middle; }\n\n.xgplayer-skin-default .xgplayer-pip-lay {\n  position: absolute;\n  top: 26px;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 130;\n  cursor: pointer;\n  background-color: transparent;\n  display: none; }\n  .xgplayer-skin-default .xgplayer-pip-lay div {\n    width: 100%;\n    height: 100%; }\n\n.xgplayer-skin-default .xgplayer-pip-drag {\n  cursor: move;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 26px;\n  line-height: 26px;\n  background-image: linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, 0));\n  z-index: 130;\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-pip-active {\n  position: fixed;\n  right: 0;\n  bottom: 200px;\n  width: 320px !important;\n  height: 180px !important;\n  z-index: 110 !important; }\n  .xgplayer-skin-default.xgplayer-pip-active .xgplayer-controls {\n    display: none; }\n  .xgplayer-skin-default.xgplayer-pip-active .xgplayer-danmu {\n    display: none; }\n  .xgplayer-skin-default.xgplayer-pip-active .xgplayer-pip-lay {\n    display: block; }\n\n.xgplayer-skin-default.xgplayer-pip-active .xgplayer-pip-drag {\n  display: -webkit-flex;\n  display: -moz-box;\n  display: flex; }\n\n.xgplayer-skin-default.xgplayer-inactive .xgplayer-pip-drag {\n  display: none; }\n\n.lang-is-jp .xgplayer-pip .name span {\n  width: 70px;\n  height: 20px; }\n\n.xgplayer-skin-default .xgplayer-rotate {\n  position: relative;\n  -webkit-order: 10;\n     -moz-box-ordinal-group: 11;\n          order: 10;\n  display: block;\n  cursor: pointer; }\n  .xgplayer-skin-default .xgplayer-rotate .xgplayer-icon {\n    margin-top: 7px;\n    width: 26px; }\n    .xgplayer-skin-default .xgplayer-rotate .xgplayer-icon div {\n      position: absolute; }\n  .xgplayer-skin-default .xgplayer-rotate .xgplayer-tips {\n    margin-left: -22px; }\n    .xgplayer-skin-default .xgplayer-rotate .xgplayer-tips .xgplayer-tip-rotate {\n      display: block; }\n  .xgplayer-skin-default .xgplayer-rotate:hover {\n    opacity: 0.85; }\n    .xgplayer-skin-default .xgplayer-rotate:hover .xgplayer-tips {\n      display: block; }\n\n.lang-is-en .xgplayer-rotate .xgplayer-tips {\n  margin-left: -26px; }\n\n.lang-is-jp .xgplayer-rotate .xgplayer-tips {\n  margin-left: -38px; }\n\n.xgplayer-skin-default .xgplayer-screenshot {\n  -webkit-order: 11;\n     -moz-box-ordinal-group: 12;\n          order: 11;\n  position: relative;\n  outline: none;\n  display: block;\n  cursor: pointer;\n  height: 20px;\n  top: 8px; }\n  .xgplayer-skin-default .xgplayer-screenshot .name {\n    text-align: center;\n    font-family: PingFangSC-Regular;\n    font-size: 13px;\n    line-height: 20px;\n    height: 20px;\n    color: rgba(255, 255, 255, .8); }\n    .xgplayer-skin-default .xgplayer-screenshot .name span {\n      width: 60px;\n      height: 20px;\n      line-height: 20px;\n      background: rgba(0, 0, 0, .38);\n      border-radius: 10px;\n      display: inline-block;\n      vertical-align: middle; }\n\n.lang-is-en .xgplayer-screenshot .name span, .lang-is-jp .xgplayer-screenshot .name span {\n  width: 75px;\n  height: 20px; }\n\n.xgplayer-skin-default .xgplayer-texttrack {\n  -webkit-order: 7;\n     -moz-box-ordinal-group: 8;\n          order: 7;\n  width: 60px;\n  height: 150px;\n  z-index: 18;\n  position: relative;\n  outline: none;\n  display: none;\n  cursor: default;\n  margin-top: -119px; }\n  .xgplayer-skin-default .xgplayer-texttrack ul {\n    display: none;\n    list-style: none;\n    width: 78px;\n    background: rgba(0, 0, 0, .54);\n    border-radius: 1px;\n    position: absolute;\n    bottom: 30px;\n    left: 0;\n    text-align: center;\n    white-space: nowrap;\n    margin-left: -10px;\n    z-index: 26;\n    cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-texttrack ul li {\n      opacity: 0.7;\n      font-family: PingFangSC-Regular;\n      font-size: 11px;\n      color: rgba(255, 255, 255, .8);\n      padding: 6px 13px; }\n      .xgplayer-skin-default .xgplayer-texttrack ul li.selected {\n        color: #fff;\n        opacity: 1; }\n      .xgplayer-skin-default .xgplayer-texttrack ul li:hover {\n        color: #fff;\n        opacity: 1; }\n  .xgplayer-skin-default .xgplayer-texttrack .name {\n    text-align: center;\n    font-family: PingFangSC-Regular;\n    font-size: 13px;\n    line-height: 20px;\n    height: 20px;\n    cursor: pointer;\n    color: rgba(255, 255, 255, .8);\n    position: absolute;\n    bottom: 0;\n    width: 60px;\n    height: 20px;\n    line-height: 20px;\n    background: rgba(0, 0, 0, .38);\n    border-radius: 10px;\n    display: inline-block;\n    vertical-align: middle; }\n\n.xgplayer-skin-default.xgplayer-texttrack-active .xgplayer-texttrack ul {\n  display: block; }\n\n.xgplayer-skin-default.xgplayer-is-texttrack .xgplayer-texttrack {\n  display: block; }\n\n.xgplayer-skin-default .xgplayer-icon {\n  display: block;\n  width: 40px;\n  height: 40px;\n  overflow: hidden;\n  fill: #fff; }\n\n.xgplayer-skin-default .xgplayer-tips {\n  background: rgba(0, 0, 0, .54);\n  border-radius: 1px;\n  display: none;\n  position: absolute;\n  font-family: PingFangSC-Regular;\n  font-size: 11px;\n  color: #fff;\n  padding: 2px 4px;\n  text-align: center;\n  top: -30px;\n  left: 50%;\n  margin-left: -16px;\n  width: auto;\n  white-space: nowrap; }\n\n.xgplayer-skin-default.xgplayer-mobile .xgplayer-tips {\n  display: none !important; }\n\n.xgplayer-skin-default .xgplayer-error {\n  background: #000;\n  display: none;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 125;\n  font-family: PingFangSC-Regular;\n  font-size: 14px;\n  color: #fff;\n  text-align: center;\n  line-height: 100%;\n  -webkit-justify-content: center;\n     -moz-box-pack: center;\n          justify-content: center;\n  -webkit-align-items: center;\n     -moz-box-align: center;\n          align-items: center; }\n  .xgplayer-skin-default .xgplayer-error .xgplayer-error-refresh {\n    color: #FA1F41;\n    padding: 0 3px;\n    cursor: pointer; }\n  .xgplayer-skin-default .xgplayer-error .xgplayer-error-text {\n    line-height: 18px;\n    margin: auto 6px; }\n\n.xgplayer-skin-default.xgplayer-is-error .xgplayer-error {\n  display: -webkit-flex;\n  display: -moz-box;\n  display: flex; }\n\n.xgplayer-skin-default .xgplayer-memoryplay-spot {\n  position: absolute;\n  height: 32px;\n  left: 10px;\n  bottom: 46px;\n  background: rgba(0, 0, 0, .5);\n  border-radius: 32px;\n  line-height: 32px;\n  color: #ddd;\n  z-index: 15;\n  padding: 0 32px 0 16px; }\n  .xgplayer-skin-default .xgplayer-memoryplay-spot .xgplayer-lasttime {\n    color: red;\n    font-weight: bold; }\n  .xgplayer-skin-default .xgplayer-memoryplay-spot .btn-close {\n    position: absolute;\n    width: 16px;\n    height: 16px;\n    right: 10px;\n    top: 2px;\n    cursor: pointer;\n    color: #fff;\n    font-size: 16px; }\n";
	styleInject(css$4);

	return Player;

})));
//# sourceMappingURL=index.js.map
