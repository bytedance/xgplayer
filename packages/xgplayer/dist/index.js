(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.Player = factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

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

	var util$1 = {};

	util$1.createDom = function () {
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
	    if (el === 'video' || el === 'audio') {
	      if (value) {
	        dom.setAttribute(key, value);
	      }
	    } else {
	      dom.setAttribute(key, value);
	    }
	  });
	  return dom;
	};

	util$1.hasClass = function (el, className) {
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

	util$1.addClass = function (el, className) {
	  if (!el) {
	    return;
	  }

	  if (el.classList) {
	    className.replace(/(^\s+|\s+$)/g, '').split(/\s+/g).forEach(function (item) {
	      item && el.classList.add(item);
	    });
	  } else if (!util$1.hasClass(el, className)) {
	    el.className += ' ' + className;
	  }
	};

	util$1.removeClass = function (el, className) {
	  if (!el) {
	    return;
	  }

	  if (el.classList) {
	    className.split(/\s+/g).forEach(function (item) {
	      el.classList.remove(item);
	    });
	  } else if (util$1.hasClass(el, className)) {
	    className.split(/\s+/g).forEach(function (item) {
	      var reg = new RegExp('(\\s|^)' + item + '(\\s|$)');
	      el.className = el.className.replace(reg, ' ');
	    });
	  }
	};

	util$1.toggleClass = function (el, className) {
	  if (!el) {
	    return;
	  }

	  className.split(/\s+/g).forEach(function (item) {
	    if (util$1.hasClass(el, item)) {
	      util$1.removeClass(el, item);
	    } else {
	      util$1.addClass(el, item);
	    }
	  });
	};

	util$1.findDom = function () {
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

	util$1.padStart = function (str, length, pad) {
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

	util$1.format = function (time) {
	  if (window.isNaN(time)) {
	    return '';
	  }
	  var hour = util$1.padStart(Math.floor(time / 3600), 2, 0);
	  var minute = util$1.padStart(Math.floor((time - hour * 3600) / 60), 2, 0);
	  var second = util$1.padStart(Math.floor(time - hour * 3600 - minute * 60), 2, 0);
	  return (hour === '00' ? [minute, second] : [hour, minute, second]).join(':');
	};

	util$1.event = function (e) {
	  if (e.touches) {
	    var touch = e.touches[0] || e.changedTouches[0];
	    e.clientX = touch.clientX || 0;
	    e.clientY = touch.clientY || 0;
	    e.offsetX = touch.pageX - touch.target.offsetLeft;
	    e.offsetY = touch.pageY - touch.target.offsetTop;
	  }
	  e._target = e.target || e.srcElement;
	};

	util$1.typeOf = function (obj) {
	  return Object.prototype.toString.call(obj).match(/([^\s.*]+)(?=]$)/g)[0];
	};

	util$1.deepCopy = function (dst, src) {
	  if (util$1.typeOf(src) === 'Object' && util$1.typeOf(dst) === 'Object') {
	    Object.keys(src).forEach(function (key) {
	      if (util$1.typeOf(src[key]) === 'Object' && !(src[key] instanceof Node)) {
	        if (!dst[key]) {
	          dst[key] = src[key];
	        } else {
	          util$1.deepCopy(dst[key], src[key]);
	        }
	      } else if (util$1.typeOf(src[key]) === 'Array') {
	        dst[key] = util$1.typeOf(dst[key]) === 'Array' ? dst[key].concat(src[key]) : src[key];
	      } else {
	        dst[key] = src[key];
	      }
	    });
	    return dst;
	  }
	};
	util$1.getBgImage = function (el) {
	  // fix: return current page url when url is none
	  var url = (el.currentStyle || window.getComputedStyle(el, null)).backgroundImage;
	  if (!url || url === 'none') {
	    return '';
	  }
	  var a = document.createElement('a');
	  a.href = url.replace(/url\("|"\)/g, '');
	  return a.href;
	};

	util$1.copyDom = function (dom) {
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

	util$1.setInterval = function (context, eventName, intervalFunc, frequency) {
	  if (!context._interval[eventName]) {
	    context._interval[eventName] = setInterval(intervalFunc.bind(context), frequency);
	  }
	};

	util$1.clearInterval = function (context, eventName) {
	  clearInterval(context._interval[eventName]);
	  context._interval[eventName] = null;
	};

	util$1.createImgBtn = function (name, imgUrl, width, height) {
	  var btn = util$1.createDom('xg-' + name, '', {}, 'xgplayer-' + name + '-img');
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

	util$1.Hex2RGBA = function (hex, alpha) {
	  var rgb = []; // 定义rgb数组
	  if (/^\#[0-9A-F]{3}$/i.test(hex)) {
	    var sixHex = '#';
	    hex.replace(/[0-9A-F]/ig, function (kw) {
	      sixHex += kw + kw;
	    });
	    hex = sixHex;
	  }
	  if (/^#[0-9A-F]{6}$/i.test(hex)) {
	    hex.replace(/[0-9A-F]{2}/ig, function (kw) {
	      rgb.push(eval('0x' + kw));
	    });
	    return 'rgba(' + rgb.join(',') + ', ' + alpha + ')';
	  } else {
	    return 'rgba(255, 255, 255, 0.1)';
	  }
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

	  _classCallCheck(this, Errors);

	  var r = {};
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
	  return r;
	};

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Proxy = function () {
	  function Proxy(options) {
	    _classCallCheck$1(this, Proxy);

	    this.logParams = {
	      bc: 0,
	      bu_acu_t: 0,
	      played: []
	    };
	    this._hasStart = false;
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
	    if (options.loop) {
	      this.videoConfig.loop = 'loop';
	    }
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
	    this.video = util$1.createDom(this.videoConfig.mediaType, textTrackDom, this.videoConfig, '');
	    if (options.autoplay) {
	      this.video.autoplay = true;
	      if (options.autoplayMuted) {
	        this.video.muted = true;
	      }
	    }
	    this.ev = ['play', 'playing', 'pause', 'ended', 'error', 'seeking', 'seeked', 'timeupdate', 'waiting', 'canplay', 'canplaythrough', 'durationchange', 'volumechange', 'loadeddata'].map(function (item) {
	      return _defineProperty({}, item, 'on' + item.charAt(0).toUpperCase() + item.slice(1));
	    });
	    eventEmitter(this);

	    this._interval = {};
	    var lastBuffer = '0,0';
	    var self = this;

	    this.ev.forEach(function (item) {
	      self.evItem = Object.keys(item)[0];
	      var name = Object.keys(item)[0];
	      self.video.addEventListener(Object.keys(item)[0], function () {
	        // fix when video destroy called and video reload
	        if (!self.logParams) {
	          return;
	        }
	        if (name === 'play') {
	          self.hasStart = true;
	        } else if (name === 'waiting') {
	          self.logParams.bc++;
	          self.inWaitingStart = new Date().getTime();
	        } else if (name === 'playing') {
	          if (self.inWaitingStart) {
	            self.logParams.bu_acu_t += new Date().getTime() - self.inWaitingStart;
	            self.inWaitingStart = undefined;
	          }
	        } else if (name === 'loadeddata') {
	          self.logParams.played.push({
	            begin: 0,
	            end: -1
	          });
	        } else if (name === 'seeking') {
	          self.logParams.played.push({
	            begin: self.video.currentTime,
	            end: -1
	          });
	        } else if (self && self.logParams && self.logParams.played && name === 'timeupdate') {
	          if (self.logParams.played.length < 1) {
	            self.logParams.played.push({
	              begin: self.video.currentTime,
	              end: -1
	            });
	          }
	          self.logParams.played[self.logParams.played.length - 1].end = self.video.currentTime;
	        }
	        if (name === 'error') {
	          if (self.video.error) {
	            self.emit(name, new Errors('other', self.currentTime, self.duration, self.networkState, self.readyState, self.currentSrc, self.src, self.ended, {
	              line: 41,
	              msg: self.error,
	              handle: 'Constructor'
	            }));
	          }
	        } else {
	          self.emit(name, self);
	        }

	        if (self.hasOwnProperty('_interval')) {
	          if (['ended', 'error', 'timeupdate'].indexOf(name) < 0) {
	            clearInterval(self._interval['bufferedChange']);
	            util$1.setInterval(self, 'bufferedChange', function () {
	              var curBuffer = [];
	              for (var i = 0, len = self.video.buffered.length; i < len; i++) {
	                curBuffer.push([self.video.buffered.start(i), self.video.buffered.end(i)]);
	              }
	              if (curBuffer.toString() !== lastBuffer) {
	                lastBuffer = curBuffer.toString();
	                self.emit('bufferedChange', curBuffer);
	              }
	            }, 200);
	          } else {
	            if (name !== 'timeupdate') {
	              util$1.clearInterval(self, 'bufferedChange');
	            }
	          }
	        }
	      }, false);
	    });
	  }

	  _createClass(Proxy, [{
	    key: 'destroy',
	    value: function destroy() {
	      if (this.textTrackStyle) {
	        this.textTrackStyle.parentNode.removeChild(this.textTrackStyle);
	      }
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
	      return this.video.currentTime;
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
	      return this.video.duration;
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
	      var self = this;
	      if (!util$1.hasClass(this.root, 'xgplayer-ended')) {
	        this.emit('urlchange', JSON.parse(JSON.stringify(self.logParams)));
	      }
	      this.logParams = {
	        bc: 0,
	        bu_acu_t: 0,
	        played: [],
	        pt: new Date().getTime(),
	        vt: new Date().getTime(),
	        vd: 0
	      };
	      this.video.pause();
	      this.video.src = url;
	      this.logParams.playSrc = url;
	      this.logParams.pt = new Date().getTime();
	      this.logParams.vt = this.logParams.pt;
	      function ldFunc() {
	        self.logParams.vt = new Date().getTime();
	        if (self.logParams.pt > self.logParams.vt) {
	          self.logParams.pt = self.logParams.vt;
	        }
	        self.logParams.vd = self.video.duration;
	        self.off('loadeddata', ldFunc);
	      }
	      this.once('loadeddata', ldFunc);
	    }
	  }, {
	    key: 'poster',
	    set: function set(posterUrl) {
	      var poster = util$1.findDom(this.root, '.xgplayer-poster');
	      if (poster) {
	        poster.style.backgroundImage = 'url(' + posterUrl + ')';
	      }
	    }
	  }, {
	    key: 'volume',
	    get: function get() {
	      return this.video.volume;
	    },
	    set: function set(vol) {
	      this.video.volume = vol;
	    }
	  }, {
	    key: 'fullscreen',
	    get: function get() {
	      return util$1.hasClass(this.root, 'xgplayer-is-fullscreen') || util$1.hasClass(this.root, 'xgplayer-fullscreen-active');
	    }
	  }, {
	    key: 'bullet',
	    get: function get() {
	      return util$1.findDom(this.root, 'xg-bullet') ? util$1.hasClass(util$1.findDom(this.root, 'xg-bullet'), 'xgplayer-has-bullet') : false;
	    }
	  }, {
	    key: 'textTrack',
	    get: function get() {
	      return util$1.hasClass(this.root, 'xgplayer-is-textTrack');
	    }
	  }, {
	    key: 'pip',
	    get: function get() {
	      return util$1.hasClass(this.root, 'xgplayer-pip-active');
	    }
	  }]);

	  return Proxy;
	}();

	var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var INDEXDB = function () {
	  function INDEXDB() {
	    var mydb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { name: 'xgplayer', version: 1, db: null, ojstore: { name: 'xg-m4a', keypath: 'vid' } };

	    _classCallCheck$2(this, INDEXDB);

	    this.indexedDB = window.indexedDB || window.webkitindexedDB;
	    this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange; // 键范围
	    this.myDB = mydb;
	  }

	  _createClass$1(INDEXDB, [{
	    key: 'openDB',
	    value: function openDB(callback) {
	      var _this = this;

	      // 建立或打开数据库，建立对象存储空间(ObjectStore)
	      var self = this;
	      var version = this.myDB.version || 1;
	      var request = self.indexedDB.open(self.myDB.name, version);
	      request.onerror = function (e) {
	        // console.log('e.currentTarget.error.message')
	      };
	      request.onsuccess = function (e) {
	        _this.myDB.db = e.target.result;
	        // console.log('成功建立并打开数据库:' + this.myDB.name + ' version' + this.myDB.version)
	        callback.call(self);
	      };
	      request.onupgradeneeded = function (e) {
	        var db = e.target.result;
	        var transaction = e.target.transaction;
	        var store = void 0;
	        if (!db.objectStoreNames.contains(self.myDB.ojstore.name)) {
	          // 没有该对象空间时创建该对象空间
	          store = db.createObjectStore(self.myDB.ojstore.name, { keyPath: self.myDB.ojstore.keypath });
	          // console.log('成功建立对象存储空间：' + this.myDB.ojstore.name)
	        }
	      };
	    }
	  }, {
	    key: 'deletedb',
	    value: function deletedb() {
	      // 删除数据库
	      var self = this;
	      self.indexedDB.deleteDatabase(this.myDB.name);
	      // console.log(this.myDB.name + '数据库已删除')
	    }
	  }, {
	    key: 'closeDB',
	    value: function closeDB() {
	      // 关闭数据库
	      this.myDB.db.close();
	      // console.log('数据库已关闭')
	    }
	  }, {
	    key: 'addData',
	    value: function addData(storename, data) {
	      // 添加数据，重复添加会报错
	      var store = this.myDB.db.transaction(storename, 'readwrite').objectStore(storename);
	      var request = void 0;
	      for (var i = 0; i < data.length; i++) {
	        request = store.add(data[i]);
	        request.onerror = function () {
	          // console.error('add添加数据库中已有该数据')
	        };
	        request.onsuccess = function () {
	          // console.log('add添加数据已存入数据库')
	        };
	      }
	    }
	  }, {
	    key: 'putData',
	    value: function putData(storename, data) {
	      // 添加数据，重复添加会更新原有数据
	      var store = this.myDB.db.transaction(storename, 'readwrite').objectStore(storename);
	      var request = void 0;
	      for (var i = 0; i < data.length; i++) {
	        request = store.put(data[i]);
	        request.onerror = function () {
	          // console.error('put添加数据库中已有该数据')
	        };
	        request.onsuccess = function () {
	          // console.log('put添加数据已存入数据库')
	        };
	      }
	    }
	  }, {
	    key: 'getDataByKey',
	    value: function getDataByKey(storename, key, callback) {
	      var self = this;
	      // 根据存储空间的键找到对应数据
	      var store = this.myDB.db.transaction(storename, 'readwrite').objectStore(storename);
	      var request = store.get(key);
	      request.onerror = function () {
	        // console.error('getDataByKey error')
	        callback.call(self, null);
	      };
	      request.onsuccess = function (e) {
	        var result = e.target.result;
	        // console.log('查找数据成功')
	        callback.call(self, result);
	      };
	    }
	  }, {
	    key: 'deleteData',
	    value: function deleteData(storename, key) {
	      // 删除某一条记录
	      var store = this.myDB.db.transaction(storename, 'readwrite').objectStore(storename);
	      store.delete(key);
	      // console.log('已删除存储空间' + storename + '中' + key + '记录')
	    }
	  }, {
	    key: 'clearData',
	    value: function clearData(storename) {
	      // 删除存储空间全部记录
	      var store = this.myDB.db.transaction(storename, 'readwrite').objectStore(storename);
	      store.clear();
	      // console.log('已删除存储空间' + storename + '全部记录')
	    }
	  }]);

	  return INDEXDB;
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

	var getSize = createCommonjsModule(function (module) {
	/*!
	 * getSize v2.0.3
	 * measure size of elements
	 * MIT license
	 */

	/* jshint browser: true, strict: true, undef: true, unused: true */
	/* globals console: false */

	( function( window, factory ) {
	  /* jshint strict: false */ /* globals define, module */
	  if (  module.exports ) {
	    // CommonJS
	    module.exports = factory();
	  } else {
	    // browser global
	    window.getSize = factory();
	  }

	})( window, function factory() {

	// -------------------------- helpers -------------------------- //

	// get a number from a string, not a percentage
	function getStyleSize( value ) {
	  var num = parseFloat( value );
	  // not a percent like '100%', and a number
	  var isValid = value.indexOf('%') == -1 && !isNaN( num );
	  return isValid && num;
	}

	function noop() {}

	var logError = typeof console == 'undefined' ? noop :
	  function( message ) {
	    console.error( message );
	  };

	// -------------------------- measurements -------------------------- //

	var measurements = [
	  'paddingLeft',
	  'paddingRight',
	  'paddingTop',
	  'paddingBottom',
	  'marginLeft',
	  'marginRight',
	  'marginTop',
	  'marginBottom',
	  'borderLeftWidth',
	  'borderRightWidth',
	  'borderTopWidth',
	  'borderBottomWidth'
	];

	var measurementsLength = measurements.length;

	function getZeroSize() {
	  var size = {
	    width: 0,
	    height: 0,
	    innerWidth: 0,
	    innerHeight: 0,
	    outerWidth: 0,
	    outerHeight: 0
	  };
	  for ( var i=0; i < measurementsLength; i++ ) {
	    var measurement = measurements[i];
	    size[ measurement ] = 0;
	  }
	  return size;
	}

	// -------------------------- getStyle -------------------------- //

	/**
	 * getStyle, get style of element, check for Firefox bug
	 * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
	 */
	function getStyle( elem ) {
	  var style = getComputedStyle( elem );
	  if ( !style ) {
	    logError( 'Style returned ' + style +
	      '. Are you running this code in a hidden iframe on Firefox? ' +
	      'See https://bit.ly/getsizebug1' );
	  }
	  return style;
	}

	// -------------------------- setup -------------------------- //

	var isSetup = false;

	var isBoxSizeOuter;

	/**
	 * setup
	 * check isBoxSizerOuter
	 * do on first getSize() rather than on page load for Firefox bug
	 */
	function setup() {
	  // setup once
	  if ( isSetup ) {
	    return;
	  }
	  isSetup = true;

	  // -------------------------- box sizing -------------------------- //

	  /**
	   * Chrome & Safari measure the outer-width on style.width on border-box elems
	   * IE11 & Firefox<29 measures the inner-width
	   */
	  var div = document.createElement('div');
	  div.style.width = '200px';
	  div.style.padding = '1px 2px 3px 4px';
	  div.style.borderStyle = 'solid';
	  div.style.borderWidth = '1px 2px 3px 4px';
	  div.style.boxSizing = 'border-box';

	  var body = document.body || document.documentElement;
	  body.appendChild( div );
	  var style = getStyle( div );
	  // round value for browser zoom. desandro/masonry#928
	  isBoxSizeOuter = Math.round( getStyleSize( style.width ) ) == 200;
	  getSize.isBoxSizeOuter = isBoxSizeOuter;

	  body.removeChild( div );
	}

	// -------------------------- getSize -------------------------- //

	function getSize( elem ) {
	  setup();

	  // use querySeletor if elem is string
	  if ( typeof elem == 'string' ) {
	    elem = document.querySelector( elem );
	  }

	  // do not proceed on non-objects
	  if ( !elem || typeof elem != 'object' || !elem.nodeType ) {
	    return;
	  }

	  var style = getStyle( elem );

	  // if hidden, everything is 0
	  if ( style.display == 'none' ) {
	    return getZeroSize();
	  }

	  var size = {};
	  size.width = elem.offsetWidth;
	  size.height = elem.offsetHeight;

	  var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

	  // get all measurements
	  for ( var i=0; i < measurementsLength; i++ ) {
	    var measurement = measurements[i];
	    var value = style[ measurement ];
	    var num = parseFloat( value );
	    // any 'auto', 'medium' value will be 0
	    size[ measurement ] = !isNaN( num ) ? num : 0;
	  }

	  var paddingWidth = size.paddingLeft + size.paddingRight;
	  var paddingHeight = size.paddingTop + size.paddingBottom;
	  var marginWidth = size.marginLeft + size.marginRight;
	  var marginHeight = size.marginTop + size.marginBottom;
	  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
	  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

	  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

	  // overwrite width and height if we can get it from style
	  var styleWidth = getStyleSize( style.width );
	  if ( styleWidth !== false ) {
	    size.width = styleWidth +
	      // add padding and border unless it's already including it
	      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
	  }

	  var styleHeight = getStyleSize( style.height );
	  if ( styleHeight !== false ) {
	    size.height = styleHeight +
	      // add padding and border unless it's already including it
	      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
	  }

	  size.innerWidth = size.width - ( paddingWidth + borderWidth );
	  size.innerHeight = size.height - ( paddingHeight + borderHeight );

	  size.outerWidth = size.width + marginWidth;
	  size.outerHeight = size.height + marginHeight;

	  return size;
	}

	return getSize;

	});
	});

	var evEmitter = createCommonjsModule(function (module) {
	/**
	 * EvEmitter v1.1.0
	 * Lil' event emitter
	 * MIT License
	 */

	/* jshint unused: true, undef: true, strict: true */

	( function( global, factory ) {
	  // universal module definition
	  /* jshint strict: false */ /* globals define, module, window */
	  if (  module.exports ) {
	    // CommonJS - Browserify, Webpack
	    module.exports = factory();
	  } else {
	    // Browser globals
	    global.EvEmitter = factory();
	  }

	}( typeof window != 'undefined' ? window : commonjsGlobal, function() {

	function EvEmitter() {}

	var proto = EvEmitter.prototype;

	proto.on = function( eventName, listener ) {
	  if ( !eventName || !listener ) {
	    return;
	  }
	  // set events hash
	  var events = this._events = this._events || {};
	  // set listeners array
	  var listeners = events[ eventName ] = events[ eventName ] || [];
	  // only add once
	  if ( listeners.indexOf( listener ) == -1 ) {
	    listeners.push( listener );
	  }

	  return this;
	};

	proto.once = function( eventName, listener ) {
	  if ( !eventName || !listener ) {
	    return;
	  }
	  // add event
	  this.on( eventName, listener );
	  // set once flag
	  // set onceEvents hash
	  var onceEvents = this._onceEvents = this._onceEvents || {};
	  // set onceListeners object
	  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
	  // set flag
	  onceListeners[ listener ] = true;

	  return this;
	};

	proto.off = function( eventName, listener ) {
	  var listeners = this._events && this._events[ eventName ];
	  if ( !listeners || !listeners.length ) {
	    return;
	  }
	  var index = listeners.indexOf( listener );
	  if ( index != -1 ) {
	    listeners.splice( index, 1 );
	  }

	  return this;
	};

	proto.emitEvent = function( eventName, args ) {
	  var listeners = this._events && this._events[ eventName ];
	  if ( !listeners || !listeners.length ) {
	    return;
	  }
	  // copy over to avoid interference if .off() in listener
	  listeners = listeners.slice(0);
	  args = args || [];
	  // once stuff
	  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

	  for ( var i=0; i < listeners.length; i++ ) {
	    var listener = listeners[i];
	    var isOnce = onceListeners && onceListeners[ listener ];
	    if ( isOnce ) {
	      // remove listener
	      // remove before trigger to prevent recursion
	      this.off( eventName, listener );
	      // unset once flag
	      delete onceListeners[ listener ];
	    }
	    // trigger listener
	    listener.apply( this, args );
	  }

	  return this;
	};

	proto.allOff = function() {
	  delete this._events;
	  delete this._onceEvents;
	};

	return EvEmitter;

	}));
	});

	var unipointer = createCommonjsModule(function (module) {
	/*!
	 * Unipointer v2.3.0
	 * base class for doing one thing with pointer event
	 * MIT license
	 */

	/*jshint browser: true, undef: true, unused: true, strict: true */

	( function( window, factory ) {
	  // universal module definition
	  /* jshint strict: false */ /*global define, module, require */
	  if (  module.exports ) {
	    // CommonJS
	    module.exports = factory(
	      window,
	      evEmitter
	    );
	  } else {
	    // browser global
	    window.Unipointer = factory(
	      window,
	      window.EvEmitter
	    );
	  }

	}( window, function factory( window, EvEmitter ) {

	function noop() {}

	function Unipointer() {}

	// inherit EvEmitter
	var proto = Unipointer.prototype = Object.create( EvEmitter.prototype );

	proto.bindStartEvent = function( elem ) {
	  this._bindStartEvent( elem, true );
	};

	proto.unbindStartEvent = function( elem ) {
	  this._bindStartEvent( elem, false );
	};

	/**
	 * Add or remove start event
	 * @param {Boolean} isAdd - remove if falsey
	 */
	proto._bindStartEvent = function( elem, isAdd ) {
	  // munge isAdd, default to true
	  isAdd = isAdd === undefined ? true : isAdd;
	  var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';

	  // default to mouse events
	  var startEvent = 'mousedown';
	  if ( window.PointerEvent ) {
	    // Pointer Events
	    startEvent = 'pointerdown';
	  } else if ( 'ontouchstart' in window ) {
	    // Touch Events. iOS Safari
	    startEvent = 'touchstart';
	  }
	  elem[ bindMethod ]( startEvent, this );
	};

	// trigger handler methods for events
	proto.handleEvent = function( event ) {
	  var method = 'on' + event.type;
	  if ( this[ method ] ) {
	    this[ method ]( event );
	  }
	};

	// returns the touch that we're keeping track of
	proto.getTouch = function( touches ) {
	  for ( var i=0; i < touches.length; i++ ) {
	    var touch = touches[i];
	    if ( touch.identifier == this.pointerIdentifier ) {
	      return touch;
	    }
	  }
	};

	// ----- start event ----- //

	proto.onmousedown = function( event ) {
	  // dismiss clicks from right or middle buttons
	  var button = event.button;
	  if ( button && ( button !== 0 && button !== 1 ) ) {
	    return;
	  }
	  this._pointerDown( event, event );
	};

	proto.ontouchstart = function( event ) {
	  this._pointerDown( event, event.changedTouches[0] );
	};

	proto.onpointerdown = function( event ) {
	  this._pointerDown( event, event );
	};

	/**
	 * pointer start
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto._pointerDown = function( event, pointer ) {
	  // dismiss right click and other pointers
	  // button = 0 is okay, 1-4 not
	  if ( event.button || this.isPointerDown ) {
	    return;
	  }

	  this.isPointerDown = true;
	  // save pointer identifier to match up touch events
	  this.pointerIdentifier = pointer.pointerId !== undefined ?
	    // pointerId for pointer events, touch.indentifier for touch events
	    pointer.pointerId : pointer.identifier;

	  this.pointerDown( event, pointer );
	};

	proto.pointerDown = function( event, pointer ) {
	  this._bindPostStartEvents( event );
	  this.emitEvent( 'pointerDown', [ event, pointer ] );
	};

	// hash of events to be bound after start event
	var postStartEvents = {
	  mousedown: [ 'mousemove', 'mouseup' ],
	  touchstart: [ 'touchmove', 'touchend', 'touchcancel' ],
	  pointerdown: [ 'pointermove', 'pointerup', 'pointercancel' ],
	};

	proto._bindPostStartEvents = function( event ) {
	  if ( !event ) {
	    return;
	  }
	  // get proper events to match start event
	  var events = postStartEvents[ event.type ];
	  // bind events to node
	  events.forEach( function( eventName ) {
	    window.addEventListener( eventName, this );
	  }, this );
	  // save these arguments
	  this._boundPointerEvents = events;
	};

	proto._unbindPostStartEvents = function() {
	  // check for _boundEvents, in case dragEnd triggered twice (old IE8 bug)
	  if ( !this._boundPointerEvents ) {
	    return;
	  }
	  this._boundPointerEvents.forEach( function( eventName ) {
	    window.removeEventListener( eventName, this );
	  }, this );

	  delete this._boundPointerEvents;
	};

	// ----- move event ----- //

	proto.onmousemove = function( event ) {
	  this._pointerMove( event, event );
	};

	proto.onpointermove = function( event ) {
	  if ( event.pointerId == this.pointerIdentifier ) {
	    this._pointerMove( event, event );
	  }
	};

	proto.ontouchmove = function( event ) {
	  var touch = this.getTouch( event.changedTouches );
	  if ( touch ) {
	    this._pointerMove( event, touch );
	  }
	};

	/**
	 * pointer move
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 * @private
	 */
	proto._pointerMove = function( event, pointer ) {
	  this.pointerMove( event, pointer );
	};

	// public
	proto.pointerMove = function( event, pointer ) {
	  this.emitEvent( 'pointerMove', [ event, pointer ] );
	};

	// ----- end event ----- //


	proto.onmouseup = function( event ) {
	  this._pointerUp( event, event );
	};

	proto.onpointerup = function( event ) {
	  if ( event.pointerId == this.pointerIdentifier ) {
	    this._pointerUp( event, event );
	  }
	};

	proto.ontouchend = function( event ) {
	  var touch = this.getTouch( event.changedTouches );
	  if ( touch ) {
	    this._pointerUp( event, touch );
	  }
	};

	/**
	 * pointer up
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 * @private
	 */
	proto._pointerUp = function( event, pointer ) {
	  this._pointerDone();
	  this.pointerUp( event, pointer );
	};

	// public
	proto.pointerUp = function( event, pointer ) {
	  this.emitEvent( 'pointerUp', [ event, pointer ] );
	};

	// ----- pointer done ----- //

	// triggered on pointer up & pointer cancel
	proto._pointerDone = function() {
	  this._pointerReset();
	  this._unbindPostStartEvents();
	  this.pointerDone();
	};

	proto._pointerReset = function() {
	  // reset properties
	  this.isPointerDown = false;
	  delete this.pointerIdentifier;
	};

	proto.pointerDone = noop;

	// ----- pointer cancel ----- //

	proto.onpointercancel = function( event ) {
	  if ( event.pointerId == this.pointerIdentifier ) {
	    this._pointerCancel( event, event );
	  }
	};

	proto.ontouchcancel = function( event ) {
	  var touch = this.getTouch( event.changedTouches );
	  if ( touch ) {
	    this._pointerCancel( event, touch );
	  }
	};

	/**
	 * pointer cancel
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 * @private
	 */
	proto._pointerCancel = function( event, pointer ) {
	  this._pointerDone();
	  this.pointerCancel( event, pointer );
	};

	// public
	proto.pointerCancel = function( event, pointer ) {
	  this.emitEvent( 'pointerCancel', [ event, pointer ] );
	};

	// -----  ----- //

	// utility function for getting x/y coords from event
	Unipointer.getPointerPoint = function( pointer ) {
	  return {
	    x: pointer.pageX,
	    y: pointer.pageY
	  };
	};

	// -----  ----- //

	return Unipointer;

	}));
	});

	var unidragger = createCommonjsModule(function (module) {
	/*!
	 * Unidragger v2.3.0
	 * Draggable base class
	 * MIT license
	 */

	/*jshint browser: true, unused: true, undef: true, strict: true */

	( function( window, factory ) {
	  // universal module definition
	  /*jshint strict: false */ /*globals define, module, require */

	  if (  module.exports ) {
	    // CommonJS
	    module.exports = factory(
	      window,
	      unipointer
	    );
	  } else {
	    // browser global
	    window.Unidragger = factory(
	      window,
	      window.Unipointer
	    );
	  }

	}( window, function factory( window, Unipointer ) {

	// -------------------------- Unidragger -------------------------- //

	function Unidragger() {}

	// inherit Unipointer & EvEmitter
	var proto = Unidragger.prototype = Object.create( Unipointer.prototype );

	// ----- bind start ----- //

	proto.bindHandles = function() {
	  this._bindHandles( true );
	};

	proto.unbindHandles = function() {
	  this._bindHandles( false );
	};

	/**
	 * Add or remove start event
	 * @param {Boolean} isAdd
	 */
	proto._bindHandles = function( isAdd ) {
	  // munge isAdd, default to true
	  isAdd = isAdd === undefined ? true : isAdd;
	  // bind each handle
	  var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';
	  var touchAction = isAdd ? this._touchActionValue : '';
	  for ( var i=0; i < this.handles.length; i++ ) {
	    var handle = this.handles[i];
	    this._bindStartEvent( handle, isAdd );
	    handle[ bindMethod ]( 'click', this );
	    // touch-action: none to override browser touch gestures. metafizzy/flickity#540
	    if ( window.PointerEvent ) {
	      handle.style.touchAction = touchAction;
	    }
	  }
	};

	// prototype so it can be overwriteable by Flickity
	proto._touchActionValue = 'none';

	// ----- start event ----- //

	/**
	 * pointer start
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto.pointerDown = function( event, pointer ) {
	  var isOkay = this.okayPointerDown( event );
	  if ( !isOkay ) {
	    return;
	  }
	  // track start event position
	  this.pointerDownPointer = pointer;

	  event.preventDefault();
	  this.pointerDownBlur();
	  // bind move and end events
	  this._bindPostStartEvents( event );
	  this.emitEvent( 'pointerDown', [ event, pointer ] );
	};

	// nodes that have text fields
	var cursorNodes = {
	  TEXTAREA: true,
	  INPUT: true,
	  SELECT: true,
	  OPTION: true,
	};

	// input types that do not have text fields
	var clickTypes = {
	  radio: true,
	  checkbox: true,
	  button: true,
	  submit: true,
	  image: true,
	  file: true,
	};

	// dismiss inputs with text fields. flickity#403, flickity#404
	proto.okayPointerDown = function( event ) {
	  var isCursorNode = cursorNodes[ event.target.nodeName ];
	  var isClickType = clickTypes[ event.target.type ];
	  var isOkay = !isCursorNode || isClickType;
	  if ( !isOkay ) {
	    this._pointerReset();
	  }
	  return isOkay;
	};

	// kludge to blur previously focused input
	proto.pointerDownBlur = function() {
	  var focused = document.activeElement;
	  // do not blur body for IE10, metafizzy/flickity#117
	  var canBlur = focused && focused.blur && focused != document.body;
	  if ( canBlur ) {
	    focused.blur();
	  }
	};

	// ----- move event ----- //

	/**
	 * drag move
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto.pointerMove = function( event, pointer ) {
	  var moveVector = this._dragPointerMove( event, pointer );
	  this.emitEvent( 'pointerMove', [ event, pointer, moveVector ] );
	  this._dragMove( event, pointer, moveVector );
	};

	// base pointer move logic
	proto._dragPointerMove = function( event, pointer ) {
	  var moveVector = {
	    x: pointer.pageX - this.pointerDownPointer.pageX,
	    y: pointer.pageY - this.pointerDownPointer.pageY
	  };
	  // start drag if pointer has moved far enough to start drag
	  if ( !this.isDragging && this.hasDragStarted( moveVector ) ) {
	    this._dragStart( event, pointer );
	  }
	  return moveVector;
	};

	// condition if pointer has moved far enough to start drag
	proto.hasDragStarted = function( moveVector ) {
	  return Math.abs( moveVector.x ) > 3 || Math.abs( moveVector.y ) > 3;
	};

	// ----- end event ----- //

	/**
	 * pointer up
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto.pointerUp = function( event, pointer ) {
	  this.emitEvent( 'pointerUp', [ event, pointer ] );
	  this._dragPointerUp( event, pointer );
	};

	proto._dragPointerUp = function( event, pointer ) {
	  if ( this.isDragging ) {
	    this._dragEnd( event, pointer );
	  } else {
	    // pointer didn't move enough for drag to start
	    this._staticClick( event, pointer );
	  }
	};

	// -------------------------- drag -------------------------- //

	// dragStart
	proto._dragStart = function( event, pointer ) {
	  this.isDragging = true;
	  // prevent clicks
	  this.isPreventingClicks = true;
	  this.dragStart( event, pointer );
	};

	proto.dragStart = function( event, pointer ) {
	  this.emitEvent( 'dragStart', [ event, pointer ] );
	};

	// dragMove
	proto._dragMove = function( event, pointer, moveVector ) {
	  // do not drag if not dragging yet
	  if ( !this.isDragging ) {
	    return;
	  }

	  this.dragMove( event, pointer, moveVector );
	};

	proto.dragMove = function( event, pointer, moveVector ) {
	  event.preventDefault();
	  this.emitEvent( 'dragMove', [ event, pointer, moveVector ] );
	};

	// dragEnd
	proto._dragEnd = function( event, pointer ) {
	  // set flags
	  this.isDragging = false;
	  // re-enable clicking async
	  setTimeout( function() {
	    delete this.isPreventingClicks;
	  }.bind( this ) );

	  this.dragEnd( event, pointer );
	};

	proto.dragEnd = function( event, pointer ) {
	  this.emitEvent( 'dragEnd', [ event, pointer ] );
	};

	// ----- onclick ----- //

	// handle all clicks and prevent clicks when dragging
	proto.onclick = function( event ) {
	  if ( this.isPreventingClicks ) {
	    event.preventDefault();
	  }
	};

	// ----- staticClick ----- //

	// triggered after pointer down & up with no/tiny movement
	proto._staticClick = function( event, pointer ) {
	  // ignore emulated mouse up clicks
	  if ( this.isIgnoringMouseUp && event.type == 'mouseup' ) {
	    return;
	  }

	  this.staticClick( event, pointer );

	  // set flag for emulated clicks 300ms after touchend
	  if ( event.type != 'mouseup' ) {
	    this.isIgnoringMouseUp = true;
	    // reset flag after 300ms
	    setTimeout( function() {
	      delete this.isIgnoringMouseUp;
	    }.bind( this ), 400 );
	  }
	};

	proto.staticClick = function( event, pointer ) {
	  this.emitEvent( 'staticClick', [ event, pointer ] );
	};

	// ----- utils ----- //

	Unidragger.getPointerPoint = Unipointer.getPointerPoint;

	// -----  ----- //

	return Unidragger;

	}));
	});

	var draggabilly = createCommonjsModule(function (module) {
	/*!
	 * Draggabilly v2.2.0
	 * Make that shiz draggable
	 * https://draggabilly.desandro.com
	 * MIT license
	 */

	/*jshint browser: true, strict: true, undef: true, unused: true */

	( function( window, factory ) {
	  // universal module definition
	  /* jshint strict: false */ /*globals define, module, require */
	  if (  module.exports ) {
	    // CommonJS
	    module.exports = factory(
	      window,
	      getSize,
	      unidragger
	    );
	  } else {
	    // browser global
	    window.Draggabilly = factory(
	      window,
	      window.getSize,
	      window.Unidragger
	    );
	  }

	}( window, function factory( window, getSize, Unidragger ) {

	// -------------------------- helpers & variables -------------------------- //

	// extend objects
	function extend( a, b ) {
	  for ( var prop in b ) {
	    a[ prop ] = b[ prop ];
	  }
	  return a;
	}

	function noop() {}

	var jQuery = window.jQuery;

	// --------------------------  -------------------------- //

	function Draggabilly( element, options ) {
	  // querySelector if string
	  this.element = typeof element == 'string' ?
	    document.querySelector( element ) : element;

	  if ( jQuery ) {
	    this.$element = jQuery( this.element );
	  }

	  // options
	  this.options = extend( {}, this.constructor.defaults );
	  this.option( options );

	  this._create();
	}

	// inherit Unidragger methods
	var proto = Draggabilly.prototype = Object.create( Unidragger.prototype );

	Draggabilly.defaults = {
	};

	/**
	 * set options
	 * @param {Object} opts
	 */
	proto.option = function( opts ) {
	  extend( this.options, opts );
	};

	// css position values that don't need to be set
	var positionValues = {
	  relative: true,
	  absolute: true,
	  fixed: true
	};

	proto._create = function() {
	  // properties
	  this.position = {};
	  this._getPosition();

	  this.startPoint = { x: 0, y: 0 };
	  this.dragPoint = { x: 0, y: 0 };

	  this.startPosition = extend( {}, this.position );

	  // set relative positioning
	  var style = getComputedStyle( this.element );
	  if ( !positionValues[ style.position ] ) {
	    this.element.style.position = 'relative';
	  }

	  // events, bridge jQuery events from vanilla
	  this.on( 'pointerDown', this.onPointerDown );
	  this.on( 'pointerMove', this.onPointerMove );
	  this.on( 'pointerUp', this.onPointerUp );

	  this.enable();
	  this.setHandles();
	};

	/**
	 * set this.handles and bind start events to 'em
	 */
	proto.setHandles = function() {
	  this.handles = this.options.handle ?
	    this.element.querySelectorAll( this.options.handle ) : [ this.element ];

	  this.bindHandles();
	};

	/**
	 * emits events via EvEmitter and jQuery events
	 * @param {String} type - name of event
	 * @param {Event} event - original event
	 * @param {Array} args - extra arguments
	 */
	proto.dispatchEvent = function( type, event, args ) {
	  var emitArgs = [ event ].concat( args );
	  this.emitEvent( type, emitArgs );
	  this.dispatchJQueryEvent( type, event, args );
	};

	proto.dispatchJQueryEvent = function( type, event, args ) {
	  var jQuery = window.jQuery;
	  // trigger jQuery event
	  if ( !jQuery || !this.$element ) {
	    return;
	  }
	  // create jQuery event
	  var $event = jQuery.Event( event );
	  $event.type = type;
	  this.$element.trigger( $event, args );
	};

	// -------------------------- position -------------------------- //

	// get x/y position from style
	proto._getPosition = function() {
	  var style = getComputedStyle( this.element );
	  var x = this._getPositionCoord( style.left, 'width' );
	  var y = this._getPositionCoord( style.top, 'height' );
	  // clean up 'auto' or other non-integer values
	  this.position.x = isNaN( x ) ? 0 : x;
	  this.position.y = isNaN( y ) ? 0 : y;

	  this._addTransformPosition( style );
	};

	proto._getPositionCoord = function( styleSide, measure ) {
	  if ( styleSide.indexOf('%') != -1 ) {
	    // convert percent into pixel for Safari, #75
	    var parentSize = getSize( this.element.parentNode );
	    // prevent not-in-DOM element throwing bug, #131
	    return !parentSize ? 0 :
	      ( parseFloat( styleSide ) / 100 ) * parentSize[ measure ];
	  }
	  return parseInt( styleSide, 10 );
	};

	// add transform: translate( x, y ) to position
	proto._addTransformPosition = function( style ) {
	  var transform = style.transform;
	  // bail out if value is 'none'
	  if ( transform.indexOf('matrix') !== 0 ) {
	    return;
	  }
	  // split matrix(1, 0, 0, 1, x, y)
	  var matrixValues = transform.split(',');
	  // translate X value is in 12th or 4th position
	  var xIndex = transform.indexOf('matrix3d') === 0 ? 12 : 4;
	  var translateX = parseInt( matrixValues[ xIndex ], 10 );
	  // translate Y value is in 13th or 5th position
	  var translateY = parseInt( matrixValues[ xIndex + 1 ], 10 );
	  this.position.x += translateX;
	  this.position.y += translateY;
	};

	// -------------------------- events -------------------------- //

	proto.onPointerDown = function( event, pointer ) {
	  this.element.classList.add('is-pointer-down');
	  this.dispatchJQueryEvent( 'pointerDown', event, [ pointer ] );
	};

	/**
	 * drag start
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto.dragStart = function( event, pointer ) {
	  if ( !this.isEnabled ) {
	    return;
	  }
	  this._getPosition();
	  this.measureContainment();
	  // position _when_ drag began
	  this.startPosition.x = this.position.x;
	  this.startPosition.y = this.position.y;
	  // reset left/top style
	  this.setLeftTop();

	  this.dragPoint.x = 0;
	  this.dragPoint.y = 0;

	  this.element.classList.add('is-dragging');
	  this.dispatchEvent( 'dragStart', event, [ pointer ] );
	  // start animation
	  this.animate();
	};

	proto.measureContainment = function() {
	  var container = this.getContainer();
	  if ( !container ) {
	    return;
	  }

	  var elemSize = getSize( this.element );
	  var containerSize = getSize( container );
	  var elemRect = this.element.getBoundingClientRect();
	  var containerRect = container.getBoundingClientRect();

	  var borderSizeX = containerSize.borderLeftWidth + containerSize.borderRightWidth;
	  var borderSizeY = containerSize.borderTopWidth + containerSize.borderBottomWidth;

	  var position = this.relativeStartPosition = {
	    x: elemRect.left - ( containerRect.left + containerSize.borderLeftWidth ),
	    y: elemRect.top - ( containerRect.top + containerSize.borderTopWidth )
	  };

	  this.containSize = {
	    width: ( containerSize.width - borderSizeX ) - position.x - elemSize.width,
	    height: ( containerSize.height - borderSizeY ) - position.y - elemSize.height
	  };
	};

	proto.getContainer = function() {
	  var containment = this.options.containment;
	  if ( !containment ) {
	    return;
	  }
	  var isElement = containment instanceof HTMLElement;
	  // use as element
	  if ( isElement ) {
	    return containment;
	  }
	  // querySelector if string
	  if ( typeof containment == 'string' ) {
	    return document.querySelector( containment );
	  }
	  // fallback to parent element
	  return this.element.parentNode;
	};

	// ----- move event ----- //

	proto.onPointerMove = function( event, pointer, moveVector ) {
	  this.dispatchJQueryEvent( 'pointerMove', event, [ pointer, moveVector ] );
	};

	/**
	 * drag move
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto.dragMove = function( event, pointer, moveVector ) {
	  if ( !this.isEnabled ) {
	    return;
	  }
	  var dragX = moveVector.x;
	  var dragY = moveVector.y;

	  var grid = this.options.grid;
	  var gridX = grid && grid[0];
	  var gridY = grid && grid[1];

	  dragX = applyGrid( dragX, gridX );
	  dragY = applyGrid( dragY, gridY );

	  dragX = this.containDrag( 'x', dragX, gridX );
	  dragY = this.containDrag( 'y', dragY, gridY );

	  // constrain to axis
	  dragX = this.options.axis == 'y' ? 0 : dragX;
	  dragY = this.options.axis == 'x' ? 0 : dragY;

	  this.position.x = this.startPosition.x + dragX;
	  this.position.y = this.startPosition.y + dragY;
	  // set dragPoint properties
	  this.dragPoint.x = dragX;
	  this.dragPoint.y = dragY;

	  this.dispatchEvent( 'dragMove', event, [ pointer, moveVector ] );
	};

	function applyGrid( value, grid, method ) {
	  method = method || 'round';
	  return grid ? Math[ method ]( value / grid ) * grid : value;
	}

	proto.containDrag = function( axis, drag, grid ) {
	  if ( !this.options.containment ) {
	    return drag;
	  }
	  var measure = axis == 'x' ? 'width' : 'height';

	  var rel = this.relativeStartPosition[ axis ];
	  var min = applyGrid( -rel, grid, 'ceil' );
	  var max = this.containSize[ measure ];
	  max = applyGrid( max, grid, 'floor' );
	  return  Math.max( min, Math.min( max, drag ) );
	};

	// ----- end event ----- //

	/**
	 * pointer up
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto.onPointerUp = function( event, pointer ) {
	  this.element.classList.remove('is-pointer-down');
	  this.dispatchJQueryEvent( 'pointerUp', event, [ pointer ] );
	};

	/**
	 * drag end
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto.dragEnd = function( event, pointer ) {
	  if ( !this.isEnabled ) {
	    return;
	  }
	  // use top left position when complete
	  this.element.style.transform = '';
	  this.setLeftTop();
	  this.element.classList.remove('is-dragging');
	  this.dispatchEvent( 'dragEnd', event, [ pointer ] );
	};

	// -------------------------- animation -------------------------- //

	proto.animate = function() {
	  // only render and animate if dragging
	  if ( !this.isDragging ) {
	    return;
	  }

	  this.positionDrag();

	  var _this = this;
	  requestAnimationFrame( function animateFrame() {
	    _this.animate();
	  });

	};

	// left/top positioning
	proto.setLeftTop = function() {
	  this.element.style.left = this.position.x + 'px';
	  this.element.style.top  = this.position.y + 'px';
	};

	proto.positionDrag = function() {
	  this.element.style.transform = 'translate3d( ' + this.dragPoint.x +
	    'px, ' + this.dragPoint.y + 'px, 0)';
	};

	// ----- staticClick ----- //

	proto.staticClick = function( event, pointer ) {
	  this.dispatchEvent( 'staticClick', event, [ pointer ] );
	};

	// ----- methods ----- //

	/**
	 * @param {Number} x
	 * @param {Number} y
	 */
	proto.setPosition = function( x, y ) {
	  this.position.x = x;
	  this.position.y = y;
	  this.setLeftTop();
	};

	proto.enable = function() {
	  this.isEnabled = true;
	};

	proto.disable = function() {
	  this.isEnabled = false;
	  if ( this.isDragging ) {
	    this.dragEnd();
	  }
	};

	proto.destroy = function() {
	  this.disable();
	  // reset styles
	  this.element.style.transform = '';
	  this.element.style.left = '';
	  this.element.style.top = '';
	  this.element.style.position = '';
	  // unbind handles
	  this.unbindHandles();
	  // remove jQuery data
	  if ( this.$element ) {
	    this.$element.removeData('draggabilly');
	  }
	};

	// ----- jQuery bridget ----- //

	// required for jQuery bridget
	proto._init = noop;

	if ( jQuery && jQuery.bridget ) {
	  jQuery.bridget( 'draggabilly', Draggabilly );
	}

	// -----  ----- //

	return Draggabilly;

	}));
	});

	var getAbsoluteURL = function getAbsoluteURL(url) {
	  // Check if absolute URL
	  if (!url.match(/^https?:\/\//)) {
	    var div = document.createElement('div');
	    div.innerHTML = '<a href="' + url + '">x</a>';
	    url = div.firstChild.href;
	  }
	  return url;
	};

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

	var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Player = function (_Proxy) {
	  _inherits(Player, _Proxy);

	  function Player(options) {
	    _classCallCheck$3(this, Player);

	    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, options));

	    _this.config = util$1.deepCopy({
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
	    _this.version = version;
	    _this.userTimer = null;
	    _this.waitTimer = null;
	    _this.database = new INDEXDB();
	    _this.history = [];
	    _this.isProgressMoving = false;
	    _this.root = util$1.findDom(document, '#' + _this.config.id);
	    _this.controls = util$1.createDom('xg-controls', '', {
	      unselectable: 'on',
	      onselectstart: 'return false'
	    }, 'xgplayer-controls');
	    if (!_this.root) {
	      var el = _this.config.el;
	      if (el && el.nodeType === 1) {
	        _this.root = el;
	      } else {
	        var _ret;

	        _this.emit('error', new Errors('use', _this.config.vid, {
	          line: 32,
	          handle: 'Constructor',
	          msg: 'container id can\'t be empty'
	        }));
	        return _ret = false, _possibleConstructorReturn(_this, _ret);
	      }
	    }
	    // this.rootBackup = util.copyDom(this.root)
	    util$1.addClass(_this.root, 'xgplayer xgplayer-' + sniffer.device + ' xgplayer-nostart ' + (_this.config.controls ? '' : 'no-controls'));
	    _this.root.appendChild(_this.controls);
	    if (_this.config.fluid) {
	      _this.root.style['max-width'] = '100%';
	      _this.root.style['width'] = '100%';
	      _this.root.style['height'] = '0';
	      _this.root.style['padding-top'] = _this.config.height * 100 / _this.config.width + '%';

	      _this.video.style['position'] = 'absolute';
	      _this.video.style['top'] = '0';
	      _this.video.style['left'] = '0';
	    } else {
	      // this.root.style.width = `${this.config.width}px`
	      // this.root.style.height = `${this.config.height}px`
	      if (_this.config.width) {
	        if (typeof _this.config.width !== 'number') {
	          _this.root.style.width = _this.config.width;
	        } else {
	          _this.root.style.width = _this.config.width + 'px';
	        }
	      }
	      if (_this.config.height) {
	        if (typeof _this.config.height !== 'number') {
	          _this.root.style.height = _this.config.height;
	        } else {
	          _this.root.style.height = _this.config.height + 'px';
	        }
	      }
	    }
	    if (_this.config.execBeforePluginsCall) {
	      _this.config.execBeforePluginsCall.forEach(function (item) {
	        item.call(_this, _this);
	      });
	    }
	    if (_this.config.controlStyle && util$1.typeOf(_this.config.controlStyle) === 'String') {
	      var self = _this;
	      fetch(self.config.controlStyle, {
	        method: 'GET',
	        headers: {
	          Accept: 'application/json'
	        }
	      }).then(function (res) {
	        if (res.ok) {
	          res.json().then(function (obj) {
	            for (var prop in obj) {
	              if (obj.hasOwnProperty(prop)) {
	                self.config[prop] = obj[prop];
	              }
	            }
	            self.pluginsCall();
	          });
	        }
	      }).catch(function (err) {
	        console.log('Fetch错误:' + err);
	      });
	    } else {
	      _this.pluginsCall();
	    }
	    _this.ev.forEach(function (item) {
	      var evName = Object.keys(item)[0];
	      var evFunc = _this[item[evName]];
	      if (evFunc) {
	        _this.on(evName, evFunc);
	      }
	    });

	    ['focus', 'blur'].forEach(function (item) {
	      _this.on(item, _this['on' + item.charAt(0).toUpperCase() + item.slice(1)]);
	    });
	    var player = _this;
	    _this.mousemoveFunc = function () {
	      player.emit('focus');
	      if (!player.config.closeFocusVideoFocus) {
	        player.video.focus();
	      }
	    };
	    _this.root.addEventListener('mousemove', _this.mousemoveFunc);
	    _this.playFunc = function () {
	      player.emit('focus');
	      if (!player.config.closePlayVideoFocus) {
	        player.video.focus();
	      }
	    };
	    player.once('play', _this.playFunc);

	    _this.getVideoSize = function () {
	      if (this.video.videoWidth && this.video.videoHeight) {
	        var containerSize = player.root.getBoundingClientRect();
	        if (player.config.fitVideoSize === 'auto') {
	          if (containerSize.width / containerSize.height > this.video.videoWidth / this.video.videoHeight) {
	            player.root.style.height = this.video.videoHeight / this.video.videoWidth * containerSize.width + 'px';
	          } else {
	            player.root.style.width = this.video.videoWidth / this.video.videoHeight * containerSize.height + 'px';
	          }
	        } else if (player.config.fitVideoSize === 'fixWidth') {
	          player.root.style.height = this.video.videoHeight / this.video.videoWidth * containerSize.width + 'px';
	        } else if (player.config.fitVideoSize === 'fixHeight') {
	          player.root.style.width = this.video.videoWidth / this.video.videoHeight * containerSize.height + 'px';
	        }
	      }
	    };
	    player.once('loadeddata', _this.getVideoSize);

	    setTimeout(function () {
	      _this.emit('ready');
	      _this.isReady = true;
	    }, 0);

	    if (!_this.config.keyShortcut || _this.config.keyShortcut === 'on') {
	      ['video', 'controls'].forEach(function (item) {
	        player[item].addEventListener('keydown', function (e) {
	          player.onKeydown(e, player);
	        });
	      });
	    }
	    if (_this.config.videoInit) {
	      if (util$1.hasClass(_this.root, 'xgplayer-nostart')) {
	        _this.start();
	      }
	    }
	    if (player.config.rotate) {
	      player.on('requestFullscreen', _this.updateRotateDeg);
	      player.on('exitFullscreen', _this.updateRotateDeg);
	    }

	    function onDestroy() {
	      player.root.removeEventListener('mousemove', player.mousemoveFunc);
	      player.off('destroy', onDestroy);
	    }
	    player.once('destroy', onDestroy);
	    return _this;
	  }

	  _createClass$2(Player, [{
	    key: 'start',
	    value: function start() {
	      var _this2 = this;

	      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.config.url;

	      var root = this.root;
	      var player = this;
	      if (!url || url === '') {
	        this.emit('urlNull');
	      }
	      this.logParams.playSrc = url;
	      this.canPlayFunc = function () {
	        var playPromise = player.video.play();
	        if (playPromise !== undefined && playPromise) {
	          playPromise.then(function () {
	            player.emit('autoplay started');
	          }).catch(function () {
	            player.emit('autoplay was prevented');
	            Player.util.addClass(player.root, 'xgplayer-is-autoplay');
	          });
	        }
	        player.off('canplay', player.canPlayFunc);
	      };
	      if (util$1.typeOf(url) === 'String') {
	        this.video.src = url;
	      } else {
	        url.forEach(function (item) {
	          _this2.video.appendChild(util$1.createDom('source', '', {
	            src: '' + item.src,
	            type: '' + (item.type || '')
	          }));
	        });
	      }
	      this.logParams.pt = new Date().getTime();
	      this.logParams.vt = this.logParams.pt;
	      this.loadeddataFunc = function () {
	        player.logParams.vt = new Date().getTime();
	        if (player.logParams.pt > player.logParams.vt) {
	          player.logParams.pt = player.logParams.vt;
	        }
	        player.logParams.vd = player.video.duration;
	      };
	      this.once('loadeddata', this.loadeddataFunc);
	      if (this.config.autoplay) {
	        this.on('canplay', this.canPlayFunc);
	      }
	      root.insertBefore(this.video, root.firstChild);
	      setTimeout(function () {
	        _this2.emit('complete');
	      }, 1);
	    }
	  }, {
	    key: 'reload',
	    value: function reload() {
	      this.video.load();
	      this.reloadFunc = function () {
	        // eslint-disable-next-line handle-callback-err
	        var playPromise = this.play();
	        if (playPromise !== undefined && playPromise) {
	          playPromise.catch(function (err) {});
	        }
	      };
	      this.once('loadeddata', this.reloadFunc);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var _this3 = this;

	      var isDelDom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	      var player = this;
	      clearInterval(this.bulletResizeTimer);
	      for (var k in this._interval) {
	        clearInterval(this._interval[k]);
	        this._interval[k] = null;
	      }
	      this.ev.forEach(function (item) {
	        var evName = Object.keys(item)[0];
	        var evFunc = _this3[item[evName]];
	        if (evFunc) {
	          _this3.off(evName, evFunc);
	        }
	      });
	      if (this.loadeddataFunc) {
	        this.off('loadeddata', this.loadeddataFunc);
	      }
	      if (this.reloadFunc) {
	        this.off('loadeddata', this.reloadFunc);
	      }
	      if (this.replayFunc) {
	        this.off('play', this.replayFunc);
	      }
	      if (this.playFunc) {
	        this.off('play', this.playFunc);
	      }
	      if (this.getVideoSize) {
	        this.off('loadeddata', this.getVideoSize);
	      }      ['focus', 'blur'].forEach(function (item) {
	        _this3.off(item, _this3['on' + item.charAt(0).toUpperCase() + item.slice(1)]);
	      });
	      if (!this.config.keyShortcut || this.config.keyShortcut === 'on') {
	        ['video', 'controls'].forEach(function (item) {
	          if (_this3[item]) {
	            _this3[item].removeEventListener('keydown', function (e) {
	              player.onKeydown(e, player);
	            });
	          }
	        });
	      }

	      function destroyFunc() {
	        this.emit('destroy');
	        // this.root.id = this.root.id + '_del'
	        // parentNode.insertBefore(this.rootBackup, this.root)

	        // fix video destroy https://stackoverflow.com/questions/3258587/how-to-properly-unload-destroy-a-video-element
	        this.video.removeAttribute('src'); // empty source
	        this.video.load();
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
	        for (var _k in this) {
	          // if (k !== 'config') {
	          delete this[_k];
	          // }
	        }
	        this.off('pause', destroyFunc);
	      }

	      if (!this.paused) {
	        this.pause();
	        this.once('pause', destroyFunc);
	      } else {
	        destroyFunc.call(this);
	      }
	      _get(Player.prototype.__proto__ || Object.getPrototypeOf(Player.prototype), 'destroy', this).call(this);
	    }
	  }, {
	    key: 'replay',
	    value: function replay() {
	      var self = this;
	      var _replay = this._replay;
	      // ie9 bugfix
	      util$1.removeClass(this.root, 'xgplayer-ended');
	      this.logParams = {
	        bc: 0,
	        bu_acu_t: 0,
	        played: [],
	        pt: new Date().getTime(),
	        vt: new Date().getTime(),
	        vd: 0
	      };
	      this.logParams.pt = new Date().getTime();
	      this.logParams.vt = this.logParams.pt;
	      this.replayFunc = function () {
	        self.logParams.vt = new Date().getTime();
	        if (self.logParams.pt > self.logParams.vt) {
	          self.logParams.pt = self.logParams.vt;
	        }
	        self.logParams.vd = self.video.duration;
	      };
	      this.once('play', this.replayFunc);
	      this.logParams.playSrc = this.video.currentSrc;
	      if (_replay && _replay instanceof Function) {
	        _replay();
	      } else {
	        this.currentTime = 0;
	        // eslint-disable-next-line handle-callback-err
	        var playPromise = this.play();
	        if (playPromise !== undefined && playPromise) {
	          playPromise.catch(function (err) {});
	        }
	      }
	    }
	  }, {
	    key: 'getFullscreen',
	    value: function getFullscreen(el) {
	      var player = this;
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
	        util$1.addClass(el, 'xgplayer-is-cssfullscreen');
	      }
	    }
	  }, {
	    key: 'exitFullscreen',
	    value: function exitFullscreen(el) {
	      if (document.exitFullscreen) {
	        document.exitFullscreen();
	      } else if (document.webkitExitFullscreen) {
	        document.webkitExitFullscreen();
	      } else if (document.mozCancelFullScreen) {
	        document.mozCancelFullScreen();
	      } else if (document.msExitFullscreen) {
	        document.msExitFullscreen();
	      }
	      util$1.removeClass(el, 'xgplayer-is-cssfullscreen');
	    }
	  }, {
	    key: 'getCssFullscreen',
	    value: function getCssFullscreen() {
	      var player = this;
	      if (player.config.fluid) {
	        player.root.style['padding-top'] = '';
	      }
	      util$1.addClass(player.root, 'xgplayer-is-cssfullscreen');
	      player.emit('requestCssFullscreen');
	    }
	  }, {
	    key: 'exitCssFullscreen',
	    value: function exitCssFullscreen() {
	      var player = this;
	      if (player.config.fluid) {
	        player.root.style['width'] = '100%';
	        player.root.style['height'] = '0';
	        player.root.style['padding-top'] = player.config.height * 100 / player.config.width + '%';
	      }
	      util$1.removeClass(player.root, 'xgplayer-is-cssfullscreen');
	      player.emit('exitCssFullscreen');
	    }
	  }, {
	    key: 'download',
	    value: function download$1() {
	      var url = getAbsoluteURL(this.config.url);
	      download(url);
	    }
	  }, {
	    key: 'pluginsCall',
	    value: function pluginsCall() {
	      var _this4 = this;

	      var self = this;
	      if (Player.plugins) {
	        var ignores = this.config.ignores;
	        Object.keys(Player.plugins).forEach(function (name) {
	          var descriptor = Player.plugins[name];
	          if (!ignores.some(function (item) {
	            return name === item || name === 's_' + item;
	          })) {
	            if (['pc', 'tablet', 'mobile'].some(function (type) {
	              return type === name;
	            })) {
	              if (name === sniffer.device) {
	                setTimeout(function () {
	                  descriptor.call(self, self);
	                }, 0);
	              }
	            } else {
	              descriptor.call(_this4, _this4);
	            }
	          }
	        });
	      }
	    }
	  }, {
	    key: 'getPIP',
	    value: function getPIP() {
	      // let ro = this.root.getBoundingClientRect()
	      // let Top = ro.top
	      // let Left = ro.left
	      var dragLay = util$1.createDom('xg-pip-lay', '<div></div>', {}, 'xgplayer-pip-lay');
	      this.root.appendChild(dragLay);
	      var dragHandle = util$1.createDom('xg-pip-drag', '<div class="drag-handle"><span>点击按住可拖动视频</span></div>', { tabindex: 9 }, 'xgplayer-pip-drag');
	      this.root.appendChild(dragHandle);
	      // eslint-disable-next-line no-unused-vars
	      var draggie = new draggabilly('.xgplayer', {
	        handle: '.drag-handle'
	      });
	      util$1.addClass(this.root, 'xgplayer-pip-active');
	      this.root.style.right = 0;
	      this.root.style.bottom = '200px';
	      this.root.style.top = '';
	      this.root.style.left = '';
	      this.root.style.width = '320px';
	      this.root.style.height = '180px';
	      if (this.config.pipConfig) {
	        if (this.config.pipConfig.top !== undefined) {
	          this.root.style.top = this.config.pipConfig.top + 'px';
	          this.root.style.bottom = '';
	        }
	        if (this.config.pipConfig.bottom !== undefined) {
	          this.root.style.bottom = this.config.pipConfig.bottom + 'px';
	        }
	        if (this.config.pipConfig.left !== undefined) {
	          this.root.style.left = this.config.pipConfig.left + 'px';
	          this.root.style.right = '';
	        }
	        if (this.config.pipConfig.right !== undefined) {
	          this.root.style.right = this.config.pipConfig.right + 'px';
	        }
	        if (this.config.pipConfig.width !== undefined) {
	          this.root.style.width = this.config.pipConfig.width + 'px';
	        }
	        if (this.config.pipConfig.height !== undefined) {
	          this.root.style.height = this.config.pipConfig.height + 'px';
	        }
	      }
	      if (this.config.fluid) {
	        this.root.style['padding-top'] = '';
	      }
	      var player = this;
	      ['click', 'touchend'].forEach(function (item) {
	        dragLay.addEventListener(item, function (e) {
	          e.preventDefault();
	          e.stopPropagation();
	          player.exitPIP();
	          // player.root.style.top = `${Top}px`
	          // player.root.style.left = `${Left}px`
	        });
	      });
	    }
	  }, {
	    key: 'exitPIP',
	    value: function exitPIP() {
	      util$1.removeClass(this.root, 'xgplayer-pip-active');
	      this.root.style.right = '';
	      this.root.style.bottom = '';
	      this.root.style.top = '';
	      this.root.style.left = '';
	      if (this.config.fluid) {
	        this.root.style['width'] = '100%';
	        this.root.style['height'] = '0';
	        this.root.style['padding-top'] = this.config.height * 100 / this.config.width + '%';
	      } else {
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

	      var dragLay = util$1.findDom(this.root, '.xgplayer-pip-lay');
	      if (dragLay && dragLay.parentNode) {
	        dragLay.parentNode.removeChild(dragLay);
	      }
	      var dragHandle = util$1.findDom(this.root, '.xgplayer-pip-drag');
	      if (dragHandle && dragHandle.parentNode) {
	        dragHandle.parentNode.removeChild(dragHandle);
	      }
	    }
	  }, {
	    key: 'updateRotateDeg',
	    value: function updateRotateDeg() {
	      var player = this;
	      if (!player.rotateDeg) {
	        player.rotateDeg = 0;
	      }

	      var width = player.root.offsetWidth;
	      var height = player.root.offsetHeight;
	      var targetWidth = player.video.videoWidth;
	      var targetHeight = player.video.videoHeight;

	      if (!player.config.rotate.innerRotate) ;

	      var scale = void 0;
	      if (player.rotateDeg === 0.25 || player.rotateDeg === 0.75) {
	        if (player.config.rotate.innerRotate) {
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

	      if (player.config.rotate.innerRotate) {
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

	      var player = this;
	      if (!player.rotateDeg) {
	        player.rotateDeg = 0;
	      }
	      var factor = clockwise ? 1 : -1;

	      player.rotateDeg = (player.rotateDeg + 1 + factor * 0.25 * times) % 1;
	      this.updateRotateDeg();

	      player.emit('rotate', player.rotateDeg * 360);
	    }
	  }, {
	    key: 'onFocus',
	    value: function onFocus() {
	      var player = this;
	      util$1.removeClass(this.root, 'xgplayer-inactive');
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
	        util$1.addClass(this.root, 'xgplayer-inactive');
	      }
	    }
	  }, {
	    key: 'onPlay',
	    value: function onPlay() {
	      util$1.addClass(this.root, 'xgplayer-playing');
	      util$1.removeClass(this.root, 'xgplayer-pause');
	    }
	  }, {
	    key: 'onPause',
	    value: function onPause() {
	      util$1.addClass(this.root, 'xgplayer-pause');
	      if (this.userTimer) {
	        clearTimeout(this.userTimer);
	      }
	      this.emit('focus');
	    }
	  }, {
	    key: 'onEnded',
	    value: function onEnded() {
	      util$1.addClass(this.root, 'xgplayer-ended');
	      util$1.removeClass(this.root, 'xgplayer-playing');
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
	      util$1.removeClass(this.root, 'xgplayer-isloading');
	    }
	  }, {
	    key: 'onWaiting',
	    value: function onWaiting() {
	      var self = this;
	      if (self.waitTimer) {
	        clearTimeout(self.waitTimer);
	      }
	      self.waitTimer = setTimeout(function () {
	        util$1.addClass(self.root, 'xgplayer-isloading');
	      }, 500);
	    }
	  }, {
	    key: 'onPlaying',
	    value: function onPlaying() {
	      if (this.waitTimer) {
	        clearTimeout(this.waitTimer);
	      }
	      util$1.removeClass(this.root, 'xgplayer-isloading xgplayer-nostart xgplayer-pause xgplayer-ended xgplayer-is-error xgplayer-replay');
	      util$1.addClass(this.root, 'xgplayer-playing');
	    }
	  }, {
	    key: 'onKeydown',
	    value: function onKeydown(event, player) {
	      // let player = this
	      var e = event || window.event;
	      if (e && (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 32)) {
	        player.emit('focus');
	      }
	      if (e && (e.keyCode === 40 || e.keyCode === 38)) {
	        if (player.controls) {
	          var volumeSlider = player.controls.querySelector('.xgplayer-slider');
	          if (volumeSlider) {
	            if (util$1.hasClass(volumeSlider, 'xgplayer-none')) {
	              util$1.removeClass(volumeSlider, 'xgplayer-none');
	            }
	            if (player.sliderTimer) {
	              clearTimeout(player.sliderTimer);
	            }
	            player.sliderTimer = setTimeout(function () {
	              util$1.addClass(volumeSlider, 'xgplayer-none');
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
	          var playPromise = player.play();
	          if (playPromise !== undefined && playPromise) {
	            playPromise.catch(function (err) {});
	          }
	        } else {
	          player.pause();
	        }
	      }
	    }
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

	Player.util = util$1;
	Player.sniffer = sniffer;
	Player.Errors = Errors;

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/* eslint-disable */
	var _extends = Object.assign || function (e) {
	  for (var r = 1; r < arguments.length; r++) {
	    var n = arguments[r];for (var t in n) {
	      if (Object.prototype.hasOwnProperty.call(n, t)) {
	        e[t] = n[t];
	      }
	    }
	  }return e;
	};function _classCallCheck$4(e, r) {
	  if (!(e instanceof r)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}var undef = undefined;var Env = function e() {
	  var A = this;_classCallCheck$4(this, e);this.set = function (e, r) {
	    var n = e;var t = r;if (t === null) {
	      return false;
	    }var i = "";if (n.indexOf(".") > -1) {
	      var s = n.split(".");i = s[0];n = s[1];
	    }if (n === "os_version") {
	      t = "" + t;
	    }if (i) {
	      if (i === "user" || i === "header") {
	        A.envInfo[i][n] = t;
	      } else if (i === "headers") {
	        A.envInfo.header.headers[n] = t;
	      } else {
	        A.envInfo.header.headers.custom[n] = t;
	      }
	    } else if (A.envInfo.user.hasOwnProperty(n)) {
	      if (["user_type", "device_id", "ip_addr_id"].indexOf(n) > -1) {
	        A.envInfo.user[n] = Number(t);
	      } else if (["user_id", "web_id", "user_unique_id", "ssid"].indexOf(n) > -1) {
	        A.envInfo.user[n] = String(t);
	      } else if (["user_is_auth", "user_is_login"].indexOf(n) > -1) {
	        A.envInfo.user[n] = Boolean(t);
	      }
	    } else if (A.envInfo.header.hasOwnProperty(n)) {
	      A.envInfo.header[n] = t;
	    } else if (A.envInfo.header.headers.hasOwnProperty(n)) {
	      A.envInfo.header.headers[n] = t;
	    } else {
	      A.envInfo.header.headers.custom[n] = t;
	    }
	  };this.get = function () {
	    var e = { user: {}, header: { headers: { custom: {} } } };var r = A.envInfo;var n = r.user;var t = Object.keys(n);for (var i = t, s = Array.isArray(i), o = 0, i = s ? i : i[Symbol.iterator]();;) {
	      var a;if (s) {
	        if (o >= i.length) break;a = i[o++];
	      } else {
	        o = i.next();if (o.done) break;a = o.value;
	      }var u = a;if (n[u] !== undef) {
	        e.user[u] = n[u];
	      }
	    }var f = r.header;var c = Object.keys(f);for (var d = c, l = Array.isArray(d), _ = 0, d = l ? d : d[Symbol.iterator]();;) {
	      var v;if (l) {
	        if (_ >= d.length) break;v = d[_++];
	      } else {
	        _ = d.next();if (_.done) break;v = _.value;
	      }var h = v;if (f[h] !== undef && h !== "headers") {
	        e.header[h] = f[h];
	      }
	    }var p = r.header.headers;var g = Object.keys(p);for (var b = g, y = Array.isArray(b), m = 0, b = y ? b : b[Symbol.iterator]();;) {
	      var w;if (y) {
	        if (m >= b.length) break;w = b[m++];
	      } else {
	        m = b.next();if (m.done) break;w = m.value;
	      }var O = w;if (O !== "custom" && p[O] !== undef) {
	        e.header.headers[O] = p[O];
	      }
	    }var k = r.header.headers.custom;var C = Object.keys(k);if (C.length) {
	      for (var S = C, E = Array.isArray(S), R = 0, S = E ? S : S[Symbol.iterator]();;) {
	        var x;if (E) {
	          if (R >= S.length) break;x = S[R++];
	        } else {
	          R = S.next();if (R.done) break;x = R.value;
	        }var z = x;e.header.headers.custom[z] = k[z];
	      }
	    }var T = { user: e.user, header: _extends({}, e.header, { headers: e.header.headers }) };return T;
	  };this.envInfo = { user: { user_unique_id: undef, user_type: undef, user_id: undef, user_is_auth: undef, user_is_login: undef, device_id: undef, web_id: undef, ip_addr_id: undef, ssid: undef }, header: { app_id: undef, app_name: undef, app_install_id: undef, app_package: undef, app_channel: undef, app_version: undef, os_name: undef, os_version: undef, device_model: undef, ab_client: undef, ab_version: undef, traffic_type: undef, utm_source: undef, utm_medium: undef, utm_campaign: undef, client_ip: undef, device_brand: undef, os_api: undef, access: undef, language: undef, region: undef, app_language: undef, app_region: undef, creative_id: undef, ad_id: undef, campaign_id: undef, log_type: undef, rnd: undef, platform: undef, sdk_version: undef, province: undef, city: undef, timezone: undef, tz_offset: undef, tz_name: undef, sim_region: undef, carrier: undef, resolution: undef, browser: undef, browser_version: undef, referrer: undef, referrer_host: undef, headers: { utm_term: undef, utm_content: undef, custom: {} } } };
	};var parseURL = function e(r) {
	  var n = document.createElement("a");n.href = r;return n;
	};var parseUrlQuery = function e(r) {
	  var n = parseURL(r).search;n = n.slice(1);var i = {};n.split("&").forEach(function (e) {
	    var r = e.split("="),
	        n = r[0],
	        t = r[1];i[n] = decodeURIComponent(typeof t === "undefined" ? "" : t);
	  });return i;
	};var undef$1 = "";var screen_width = screen.width || 0;var screen_height = screen.height || 0;var screen_size = screen_width + " x " + screen_height;var appVersion = navigator.appVersion;var userAgent = navigator.userAgent;var language = navigator.language;var referrer = document.referrer;var referrer_host = parseURL(referrer).hostname;var urlQueryObj = parseUrlQuery(location.href);var os_name = undef$1;var os_version = undef$1;var browser = "";var browser_version = "" + parseFloat(appVersion);var versionOffset = void 0;var semiIndex = void 0;if ((versionOffset = userAgent.indexOf("Opera")) !== -1) {
	  browser = "Opera";browser_version = userAgent.substring(versionOffset + 6);if ((versionOffset = userAgent.indexOf("Version")) !== -1) {
	    browser_version = userAgent.substring(versionOffset + 8);
	  }
	}if ((versionOffset = userAgent.indexOf("Edge")) !== -1) {
	  browser = "Microsoft Edge";browser_version = userAgent.substring(versionOffset + 5);
	} else if ((versionOffset = userAgent.indexOf("MSIE")) !== -1) {
	  browser = "Microsoft Internet Explorer";browser_version = userAgent.substring(versionOffset + 5);
	} else if ((versionOffset = userAgent.indexOf("Chrome")) !== -1) {
	  browser = "Chrome";browser_version = userAgent.substring(versionOffset + 7);
	} else if ((versionOffset = userAgent.indexOf("Safari")) !== -1) {
	  browser = "Safari";browser_version = userAgent.substring(versionOffset + 7);if ((versionOffset = userAgent.indexOf("Version")) !== -1) {
	    browser_version = userAgent.substring(versionOffset + 8);
	  }
	} else if ((versionOffset = userAgent.indexOf("Firefox")) !== -1) {
	  browser = "Firefox";browser_version = userAgent.substring(versionOffset + 8);
	}if ((semiIndex = browser_version.indexOf(";")) !== -1) {
	  browser_version = browser_version.substring(0, semiIndex);
	}if ((semiIndex = browser_version.indexOf(" ")) !== -1) {
	  browser_version = browser_version.substring(0, semiIndex);
	}if ((semiIndex = browser_version.indexOf(")")) !== -1) {
	  browser_version = browser_version.substring(0, semiIndex);
	}var platform = /Mobile|htc|mini|Android|iP(ad|od|hone)/.test(appVersion) ? "wap" : "web";var clientOpts = [{ s: "Windows 10", r: /(Windows 10.0|Windows NT 10.0)/ }, { s: "Windows 8.1", r: /(Windows 8.1|Windows NT 6.3)/ }, { s: "Windows 8", r: /(Windows 8|Windows NT 6.2)/ }, { s: "Windows 7", r: /(Windows 7|Windows NT 6.1)/ }, { s: "Android", r: /Android/ }, { s: "Sun OS", r: /SunOS/ }, { s: "Linux", r: /(Linux|X11)/ }, { s: "iOS", r: /(iPhone|iPad|iPod)/ }, { s: "Mac OS X", r: /Mac OS X/ }, { s: "Mac OS", r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ }];for (var i = 0; i < clientOpts.length; i++) {
	  var cs = clientOpts[i];if (cs.r.test(userAgent)) {
	    os_name = cs.s;break;
	  }
	}function getVersion(e, r) {
	  var n = e.exec(r);if (n && n[1]) {
	    return n[1];
	  }return "";
	}if (/Windows/.test(os_name)) {
	  os_version = getVersion(/Windows (.*)/, os_name);os_name = "windows";
	}function getAndroidVersion(e) {
	  var r = getVersion(/Android ([\.\_\d]+)/, e);if (!r) {
	    r = getVersion(/Android\/([\.\_\d]+)/, e);
	  }return r;
	}switch (os_name) {case "Mac OS X":
	    os_version = getVersion(/Mac OS X (10[\.\_\d]+)/, userAgent);os_name = "mac";break;case "Android":
	    os_version = getAndroidVersion(userAgent);os_name = "android";break;case "iOS":
	    os_version = /OS (\d+)_(\d+)_?(\d+)?/.exec(appVersion);if (!os_version) {
	      os_version = "";
	    } else {
	      os_version = os_version[1] + "." + os_version[2] + "." + (os_version[3] | 0);
	    }os_name = "ios";break;}var browser$1 = { screen_size: screen_size, browser: browser, browser_version: browser_version, platform: platform, os_name: os_name, os_version: os_version, userAgent: userAgent, screen_width: screen_width, screen_height: screen_height, device_model: os_name, language: language, referrer: referrer, referrer_host: referrer_host, utm_source: urlQueryObj.utm_source, utm_medium: urlQueryObj.utm_medium, utm_campaign: urlQueryObj.utm_campaign, utm_term: urlQueryObj.utm_term, utm_content: urlQueryObj.utm_content };var StorageCache = { get: function e(r) {
	    var n = 'no localStorage';if (localStorage && localStorage.getItem) {
	      n = localStorage.getItem(r);
	    }var t = n;try {
	      if (n && typeof n === "string") {
	        t = JSON.parse(n);
	      }
	    } catch (e) {}return t;
	  }, set: function e(r, n) {
	    try {
	      var t = typeof n === "string" ? n : JSON.stringify(n);if (localStorage && localStorage.setItem) {
	        localStorage.setItem(r, t);
	      }
	    } catch (e) {}
	  } };var TEA_CACHE_PREFIX = "__tea_cache_";var TEA_LOGGER_PREFIX = "[tea-sdk]";var ERROR_CODE = { NO_URL_PREFIX: 4001, IMG_ON_ERROR: 4e3, IMG_CATCH_ERROR: 4002, BEACON_STATUS_FALSE: 4003, XHR_ON_ERROR: 500, RESPONSE_DATA_ERROR: 5001 };var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (e) {
	  return typeof e === "undefined" ? "undefined" : _typeof2(e);
	} : function (e) {
	  return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof2(e);
	};function _classCallCheck$1$1(e, r) {
	  if (!(e instanceof r)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}var Logger = function e() {
	  var s = this;var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";_classCallCheck$1$1(this, e);this.init = function (e) {
	    s.isLog = e;
	  };this.info = function (e) {
	    for (var r = arguments.length, n = Array(r > 1 ? r - 1 : 0), t = 1; t < r; t++) {
	      n[t - 1] = arguments[t];
	    }if (s.isLog) {
	      var i;(i = console).log.apply(i, [s.prefix + e].concat(n));
	    }
	  };this.warn = function (e) {
	    for (var r = arguments.length, n = Array(r > 1 ? r - 1 : 0), t = 1; t < r; t++) {
	      n[t - 1] = arguments[t];
	    }if (s.isLog) {
	      var i;(i = console).warn.apply(i, [s.prefix + e].concat(n));
	    }
	  };this.error = function (e) {
	    for (var r = arguments.length, n = Array(r > 1 ? r - 1 : 0), t = 1; t < r; t++) {
	      n[t - 1] = arguments[t];
	    }if (s.isLog) {
	      var i;(i = console).error.apply(i, [s.prefix + e].concat(n));
	    }
	  };this.dir = function () {
	    if (s.isLog) {
	      var e;(e = console).dir.apply(e, arguments);
	    }
	  };this.table = function (e) {
	    if (s.isLog) {
	      console.table(e);
	    }
	  };this.logJSON = function (e) {
	    if ((typeof e === "undefined" ? "undefined" : _typeof(e)) === "object" && s.isLog) {
	      s.info("", JSON.stringify(e, null, 2));
	    }
	  };this.deprecated = function (e) {
	    for (var r = arguments.length, n = Array(r > 1 ? r - 1 : 0), t = 1; t < r; t++) {
	      n[t - 1] = arguments[t];
	    }s.warn.apply(s, ["[DEPRECATED]" + e].concat(n));
	  };this.throw = function (e) {
	    s.error(s.prefix);throw new Error(e);
	  };var n = r ? "[" + r + "]" : "";this.prefix = TEA_LOGGER_PREFIX + n;
	};var logger = new Logger();var fetchTokens = function e(r, n, t, i) {
	  var s = new XMLHttpRequest();s.open("POST", r, true);s.setRequestHeader("Content-Type", "application/json; charset=utf-8");s.onload = function () {
	    try {
	      var e = JSON.parse(s.responseText);if (t) {
	        t(e);
	      }
	    } catch (e) {
	      if (i) {
	        i();
	      }
	    }
	  };s.onerror = function () {
	    if (i) {
	      i();
	    }
	  };s.send(JSON.stringify(n));
	};function _classCallCheck$2$1(e, r) {
	  if (!(e instanceof r)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}function _possibleConstructorReturn$1(e, r) {
	  if (!e) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return r && ((typeof r === "undefined" ? "undefined" : _typeof2(r)) === "object" || typeof r === "function") ? r : e;
	}function _inherits$1(e, r) {
	  if (typeof r !== "function" && r !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof r === "undefined" ? "undefined" : _typeof2(r)));
	  }e.prototype = Object.create(r && r.prototype, { constructor: { value: e, enumerable: false, writable: true, configurable: true } });if (r) Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : e.__proto__ = r;
	}var date = new Date();var timeZoneMin = date.getTimezoneOffset();var timezone = parseInt(-timeZoneMin / 60, 10);var tz_offset = timeZoneMin * 60;var sdk_version = void 0;try {
	  sdk_version = "3.2.7";
	} catch (e) {
	  sdk_version = "2.x";
	}var ClientEnv = function (r) {
	  _inherits$1(n, r);function n() {
	    _classCallCheck$2$1(this, n);var e = _possibleConstructorReturn$1(this, r.call(this));e.initClientEnv = function () {
	      e.set("os_name", browser$1.os_name);e.set("os_version", browser$1.os_version);e.set("device_model", browser$1.device_model);e.set("platform", browser$1.platform);e.set("sdk_version", sdk_version);e.set("browser", browser$1.browser);e.set("browser_version", browser$1.browser_version);e.set("language", browser$1.language);e.set("timezone", timezone);e.set("tz_offset", tz_offset);e.set("resolution", browser$1.screen_width + "x" + browser$1.screen_height);e.set("screen_width", browser$1.screen_width);e.set("screen_height", browser$1.screen_height);e.set("referrer", browser$1.referrer);e.set("referrer_host", browser$1.referrer_host);e.set("utm_source", browser$1.utm_source);e.set("utm_medium", browser$1.utm_medium);e.set("utm_campaign", browser$1.utm_campaign);e.set("utm_term", browser$1.utm_term);e.set("utm_content", browser$1.utm_content);
	    };e.initClientEnv();return e;
	  }return n;
	}(Env);var clientEnvManager = new ClientEnv();function _classCallCheck$3$1(e, r) {
	  if (!(e instanceof r)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}var Type = function () {
	  function e() {
	    _classCallCheck$3$1(this, e);
	  }e.prototype.isString = function e(r) {
	    return Object.prototype.toString.call(r).slice(8, -1) === "String";
	  };e.prototype.isNumber = function e(r) {
	    return Object.prototype.toString.call(r).slice(8, -1) === "Number";
	  };e.prototype.isBoolean = function e(r) {
	    return Object.prototype.toString.call(r).slice(8, -1) === "Boolean";
	  };e.prototype.isFunction = function e(r) {
	    return Object.prototype.toString.call(r).slice(8, -1) === "Function";
	  };e.prototype.isNull = function e(r) {
	    return Object.prototype.toString.call(r).slice(8, -1) === "Null";
	  };e.prototype.isUndefined = function e(r) {
	    return Object.prototype.toString.call(r).slice(8, -1) === "Undefined";
	  };e.prototype.isObj = function e(r) {
	    return Object.prototype.toString.call(r).slice(8, -1) === "Object";
	  };e.prototype.isArray = function e(r) {
	    return Object.prototype.toString.call(r).slice(8, -1) === "Array";
	  };e.prototype.isFalse = function e(r) {
	    if (r === "" || r === undefined || r === null || r === "null" || r === "undefined" || r === 0 || r === false || r === NaN) return true;return false;
	  };e.prototype.isTrue = function e(r) {
	    return !this.isFalse(r);
	  };e.prototype.isLowIE = function e() {
	    return window.XDomainRequest;
	  };return e;
	}();var types = new Type();function decrypto(e, r, n) {
	  if (typeof e !== "string" || typeof r !== "number" || typeof n !== "number") {
	    return;
	  }var t = [];var i = [];n = n <= 25 ? n : n % 25;var s = String.fromCharCode(n + 97);t = e.split(s);for (var o = 0; o < t.length; o++) {
	    var a = parseInt(t[o], n);a = a * 1 ^ r;var u = String.fromCharCode(a);i.push(u);
	  }var f = i.join("");return f;
	}var decodeXXX = function e(r) {
	  return decrypto(r, 64, 25);
	};function b(e) {
	  return e ? (e ^ Math.random() * 16 >> e / 4).toString(10) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
	}var webid = function e() {
	  return b().replace(/-/g, "").slice(0, 19);
	};var _extends$1 = Object.assign || function (e) {
	  for (var r = 1; r < arguments.length; r++) {
	    var n = arguments[r];for (var t in n) {
	      if (Object.prototype.hasOwnProperty.call(n, t)) {
	        e[t] = n[t];
	      }
	    }
	  }return e;
	};function _classCallCheck$4$1(e, r) {
	  if (!(e instanceof r)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}function _possibleConstructorReturn$1$1(e, r) {
	  if (!e) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return r && ((typeof r === "undefined" ? "undefined" : _typeof2(r)) === "object" || typeof r === "function") ? r : e;
	}function _inherits$1$1(e, r) {
	  if (typeof r !== "function" && r !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof r === "undefined" ? "undefined" : _typeof2(r)));
	  }e.prototype = Object.create(r && r.prototype, { constructor: { value: e, enumerable: false, writable: true, configurable: true } });if (r) Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : e.__proto__ = r;
	}var urlPrefix = { cn: "1fz22z22z1nz21z4mz4bz4bz1kz1az21z4az21z1lz21z21z1bz1iz4az1az1mz1k", sg: "1fz22z22z1nz21z4mz4bz4bz21z1ez18z1jz1gz49z1kz1az21z4az19z27z22z1cz1mz24z1cz20z21z1cz18z4az1az1mz1k", va: "1fz22z22z1nz21z4mz4bz4bz1kz18z1jz1gz24z18z49z1kz1az21z4az19z27z22z1cz1mz24z1cz20z21z1cz18z4az1az1mz1k" };var getCookie = function e(r) {
	  try {
	    var n = document.cookie.match(new RegExp("(?:^|;)\\s*" + r + "=([^;]+)"));return decodeURIComponent(n ? n[1] : "");
	  } catch (e) {
	    return "";
	  }
	};var AppChannelEnv = function (e) {
	  _inherits$1$1(r, e);function r() {
	    _classCallCheck$4$1(this, r);var f = _possibleConstructorReturn$1$1(this, e.call(this));f.init = function (e) {
	      var r = e.app_id,
	          n = e.channel,
	          t = e.log,
	          i = e.channel_domain,
	          s = e.name;if (typeof r !== "number") {
	        throw new Error("app_id 必须是一个数字，注意检查是否是以`string`的方式传入的？");
	      }f.logger = new Logger(s);f.logger.init(t);f.initConfigs(e);f.initUrls(n, i);f.setEnv("app_id", r);
	    };f.initConfigs = function (e) {
	      var r = e.app_id,
	          n = e.disable_ssid,
	          t = e.disable_webid,
	          i = e.disable_sdk_monitor;f.app_id = r;f.evtDataCacheKey = TEA_CACHE_PREFIX + "events_" + r;if (n) {
	        f.logger.info("ssid已禁用，设置user_unique_id不会请求ssid接口。");f.isSsidDisabled = true;
	      }if (t) {
	        f.logger.info("webid服务已禁用，ssid同时被禁用。将本地生成webid。");f.isWebidDisabled = true;f.isSsidDisabled = true;
	      }if (i) {
	        f.logger.info("SDK监控已禁用。");f.isSdkMonitorDisabled = true;
	      }
	    };f.initUrls = function (e, r) {
	      if (e === "internal") {
	        f.logger.warn("channel 的值 internal 已被废弃，已自动改为 cn。");e = "cn";
	      }if (!r && !urlPrefix[e]) {
	        throw new Error("channel 变量只能是 `cn`, `sg`,`va`");
	      }var n = r || decodeXXX(urlPrefix[e]);n = n.replace(/\/+$/, "");f.reportUrl = n + "/v1/list";f.userTokensPrefix = "" + n;
	    };f.setEnv = function (e, r) {
	      if (e === "app_id") {
	        f.checkUserToken(r);
	      }if (e === "user_unique_id") {
	        if (f.blackUuid.some(function (e) {
	          return e === String(r);
	        })) {
	          f.logger.warn('设置了无效的值 {user_unique_id："%s"}。该操作已忽略。', r);return;
	        }f.verifyTokens(r);
	      }if (e === "web_id") {
	        if (!r) {
	          return;
	        }if (!f.envInfo.user.user_unique_id || f.envInfo.user.user_unique_id && f.envInfo.user.user_unique_id === f.envInfo.user.web_id) {
	          f.set("user_unique_id", r);
	        }
	      }f.set(e, r);
	    };f.transferFromCookie = function () {
	      var e = f.tokensCacheKey;var r = "tt_webid";var n = "__tea_sdk__ssid";var t = "__tea_sdk__user_unique_id";var i = getCookie(r);var s = getCookie(n);var o = getCookie(t);if (types.isLowIE()) {
	        if (i) {
	          var a = { web_id: i, ssid: i, user_unique_id: i };StorageCache.set(e, JSON.stringify(a));
	        }return false;
	      }if (i && s && o) {
	        var u = { web_id: i, ssid: s, user_unique_id: o };StorageCache.set(e, JSON.stringify(u));
	      }
	    };f.purifyBlackUuid = function () {
	      var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};if (f.blackUuid.some(function (e) {
	        return e === r.user_unique_id;
	      })) {
	        var e = {};f.setUserTokens(e);f.logger.warn('检测到无效的用户标识，已重置用户状态。{user_unique_id: "%s"}', r.user_unique_id);return e;
	      }return r;
	    };f.getUserTokens = function () {
	      return StorageCache.get(f.tokensCacheKey) || {};
	    };f.setUserTokens = function () {
	      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return StorageCache.set(f.tokensCacheKey, e);
	    };f.checkUserToken = function (e) {
	      var r = TEA_CACHE_PREFIX + "tokens_" + e;f.tokensCacheKey = r;f.transferFromCookie();var n = f.purifyBlackUuid(f.getUserTokens());if (n.user_unique_id && n.web_id) {
	        f.envInfo.user.user_unique_id = n.user_unique_id;f.envInfo.user.web_id = n.web_id;f.envInfo.user.ssid = n.ssid || "";f.logger.info("初始化已经检测到了 webid user_unique_id，一般情况下不需要再次验证 id 了");f.unlock();
	      } else {
	        f.requestWebId(e);
	      }
	    };f.saveTokenToStorage = function (e) {
	      var r = e.web_id,
	          n = e.ssid,
	          t = e.user_unique_id;f.setUserTokens({ web_id: r, ssid: n, user_unique_id: t });
	    };f.requestWebId = function () {
	      f.isRequestWebId = true;var n = function e(r) {
	        var n = f.envInfo.user.web_id || r.web_id;var t = r.ssid;f.isRequestWebId = false;f.envInfo.user.ssid = t;f.envInfo.user.web_id = n;f.envInfo.user.user_unique_id = n;f.saveTokenToStorage({ web_id: n, ssid: t, user_unique_id: n });if (f.waitForVerifyTokens) {
	          f.lock();f.verifyTokens(f.realUuid);
	        } else {
	          f.unlock();if (f.callback) {
	            f.callback();
	          }
	        }
	      };var e = function e() {
	        n({ web_id: webid(), ssid: "" });
	      };var r = function e() {
	        var r = f.userTokensPrefix + "/v1/user/webid";fetchTokens(r, { app_id: f.app_id, url: location.href, user_agent: browser$1.userAgent, referer: browser$1.referrer, user_unique_id: "" }, function (e) {
	          if (e.e !== 0) {
	            f.logger.error("请求 webid 失败。请联系管理员。");
	          } else {
	            n(e);
	          }
	        }, function () {
	          f.isRequestWebId = false;f.logger.error("获取 webid 失败，数据将不会被上报");
	        });
	      };if (f.isWebidDisabled) {
	        e();
	      } else {
	        r();
	      }
	    };f.verifyTokens = function (e) {
	      var r = f.tokensCacheKey;f.waitForVerifyTokens = false;f.realUuid = "" + e;if (f.isRequestWebId) {
	        f.waitForVerifyTokens = true;f.logger.info("正在请求 webid，requestSsid 将会在前者请求完毕之后被调用");return false;
	      }var n = f.getUserTokens();if (n.user_unique_id === f.realUuid && n.ssid && n.web_id) {
	        f.logger.info("传入的 user_id/user_unique_id 与 缓存中的完全一致，无需再次请求");f.unlock();
	      } else {
	        f.lock();f.envInfo.user.user_unique_id = f.realUuid;var t = _extends$1({}, f.getUserTokens(), { user_unique_id: f.realUuid });StorageCache.set(r, JSON.stringify(t));if (types.isLowIE()) {
	          f.unlock();return false;
	        }if (f.isSsidDisabled) {
	          f.unlock();if (f.callback) {
	            f.callback();
	          }
	        } else {
	          f.requestSsid();
	        }
	      }
	    };f.requestSsid = function () {
	      var n = f.getUserTokens();var e = f.userTokensPrefix + "/v1/user/ssid";fetchTokens(e, { app_id: f.app_id, web_id: n.web_id, user_unique_id: "" + n.user_unique_id }, function (e) {
	        f.unlock();if (e.e !== 0) {
	          f.logger.error("请求 ssid 失败~");
	        } else {
	          f.envInfo.user.ssid = e.ssid;var r = _extends$1({}, n, { ssid: e.ssid });f.setUserTokens(r);f.logger.info("根据 user_unique_id 更新 ssid 成功！注意：在这之前不应该有数据被发出去");if (f.callback) {
	            f.callback();
	          }
	        }
	      }, function () {
	        f.unlock();f.logger.error("根据 user_unique_id 获取新 ssid 失败");
	      });
	    };f.setEvtParams = function (e) {
	      var r = _extends$1({}, e);Object.keys(r).forEach(function (e) {
	        f.evtParams[e] = r[e];
	      });
	    };f.mergeEnvToEvents = function (e) {
	      var r = f.mergeEnv();var n = [];var t = 0;var i = void 0;e.forEach(function (e) {
	        var r = !!e.params.__disable_storage__;if (typeof i === "undefined") {
	          i = r;
	        } else if (r !== i || n[t].length >= 5) {
	          t += 1;i = !i;
	        }n[t] = n[t] || [];n[t].push(e);
	      });var s = n.map(function (e) {
	        return { events: e.map(function (e) {
	            var r = _extends$1({}, f.evtParams, e.params);delete r.__disable_storage__;return _extends$1({}, e, { params: JSON.stringify(r) });
	          }), user: r.user, header: r.header, verbose: f.debugMode ? 1 : undefined, __disable_storage__: e[0].params.__disable_storage__ };
	      });return s;
	    };f.mergeEnv = function () {
	      var e = f.get();var r = clientEnvManager.get();var n = _extends$1({}, e.user);var t = _extends$1({}, r.header.headers.custom, e.header.headers.custom);var i = _extends$1({}, r.header.headers, e.header.headers, { custom: t });var s = _extends$1({}, r.header, e.header);var o = { user: n, header: _extends$1({}, s, { headers: JSON.stringify(i) }) };return o;
	    };f.evtParams = {};f.reportUrl = "";f.userTokensPrefix = "";f.isSsidDisabled = false;f.isWebidDisabled = false;f.isSdkMonitorDisabled = false;f.debugMode = false;f.blackUuid = ["null", "undefined", "0", "", "None"];f.logger = function () {};return f;
	  }r.prototype.lock = function e() {
	    this.isUserTokensReady = false;
	  };r.prototype.unlock = function e() {
	    this.isUserTokensReady = true;
	  };r.prototype.enableDebugMode = function e(r) {
	    this.debugMode = r;
	  };return r;
	}(Env);function _classCallCheck$5(e, r) {
	  if (!(e instanceof r)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}var MemoryCache = function e() {
	  var n = this;_classCallCheck$5(this, e);this.set = function (e, r) {
	    n.cache[e] = r;
	  };this.get = function (e) {
	    return n.cache[e];
	  };this.clean = function (e) {
	    n.cache[e] = undefined;
	  };this.cache = {};
	};var memoryCacheManager = new MemoryCache();function _classCallCheck$6(e, r) {
	  if (!(e instanceof r)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}var EventStorageManager = function () {
	  function t(e) {
	    var r = e.disable_storage,
	        n = r === undefined ? false : r;_classCallCheck$6(this, t);this._isPersistent = !n;this._storage = this._isPersistent ? StorageCache : new MemoryCache();this._storageKey = "";this._data = undefined;
	  }t.prototype.setStorageKey = function e(r) {
	    this._storageKey = r;
	  };t.prototype.getAllEvents = function e() {
	    var n = this.getData();Object.keys(n).reduce(function (e, r) {
	      return e.concat(n[r] || []);
	    }, []);
	  };t.prototype.getData = function e() {
	    this._checkIsDataInit();return this._data;
	  };t.prototype.add = function e(r) {
	    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];this._checkIsDataInit();if (n.length !== 0) {
	      this._data[r] = n;this._save();
	    }
	  };t.prototype.delete = function e(r) {
	    this._checkIsDataInit();if (this._data[r]) {
	      delete this._data[r];this._save();
	    }
	  };t.prototype._checkIsDataInit = function e() {
	    if (typeof this._data === "undefined") {
	      try {
	        var r = this._getDataFromStorage();if (types.isArray(r)) {
	          var n;this._data = (n = {}, n[webid()] = r, n);this._save();
	        } else {
	          this._data = r;
	        }
	      } catch (e) {
	        this._data = {};
	      }
	    }
	  };t.prototype._checkStorageKey = function e() {
	    if (!this._storageKey) {
	      throw new Error("must call setStorageKey('xxx') first");
	    }
	  };t.prototype._getDataFromStorage = function e() {
	    this._checkStorageKey();return this._storage.get(this._storageKey) || {};
	  };t.prototype._save = function e() {
	    this._checkStorageKey();this._storage.set(this._storageKey, this._data);
	  };return t;
	}();var encodePayload = function e(r) {
	  var n = "";for (var t in r) {
	    if (r.hasOwnProperty(t)) {
	      n += "&" + t + "=" + encodeURIComponent(JSON.stringify(r[t]));
	    }
	  }n = n[0] === "&" ? n.slice(1) : n;return n;
	};var sendByImg = function e(r, n) {
	  try {
	    var t = r.split("v1")[0];n.forEach(function (e) {
	      var r = encodePayload(e);var n = new Image(1, 1);n.onload = function () {
	        n = null;
	      };n.onerror = function () {
	        n = null;
	      };n.src = t + "/v1/gif?" + r;
	    });
	  } catch (e) {}
	};var postSdkLog = function e(r, n) {
	  if (window.XDomainRequest) {
	    return sendByImg(r, n);
	  }var t = new XMLHttpRequest();t.open("POST", r + "?rdn=" + Math.random(), true);t.onload = function () {};t.onerror = function () {
	    t.abort();
	  };t.send(JSON.stringify(n));
	};var encodePayload$1 = function e(r) {
	  var n = "";for (var t in r) {
	    if (r.hasOwnProperty(t)) {
	      n += "&" + t + "=" + encodeURIComponent(JSON.stringify(r[t]));
	    }
	  }n = n[0] === "&" ? n.slice(1) : n;return n;
	};var sendByImg$1 = function e(t, i, s, o) {
	  try {
	    var a = t.split("v1")[0];if (!a) {
	      o(t, i, ERROR_CODE.NO_URL_PREFIX);return;
	    }i.forEach(function (e) {
	      var r = encodePayload$1(e);var n = new Image(1, 1);n.onload = function () {
	        n = null;s();
	      };n.onerror = function () {
	        n = null;o(t, i, ERROR_CODE.IMG_ON_ERROR);
	      };n.src = a + "/v1/gif?" + r;
	    });
	  } catch (e) {
	    o(t, i, ERROR_CODE.IMG_CATCH_ERROR, e.message);
	  }
	};var request = function e(r) {
	  var n = r.url,
	      t = r.data,
	      i = r.success,
	      s = r.fail,
	      o = r.notSure,
	      a = r.isUnload;var u = t;if (window.XDomainRequest) {
	    sendByImg$1(n, u, i, s);return;
	  }if (a) {
	    if (window.navigator && window.navigator.sendBeacon) {
	      o();var f = window.navigator.sendBeacon(n, JSON.stringify(u));if (f) {
	        i();
	      } else {
	        s(n, t, ERROR_CODE.BEACON_STATUS_FALSE);
	      }return;
	    }sendByImg$1(n, u, i, s);return;
	  }var c = new XMLHttpRequest();c.open("POST", n + "?rdn=" + Math.random(), true);c.onload = function () {
	    i(n, u, c.responseText);
	  };c.onerror = function () {
	    c.abort();s(n, u, ERROR_CODE.XHR_ON_ERROR);
	  };c.send(JSON.stringify(u));
	};function _classCallCheck$7(e, r) {
	  if (!(e instanceof r)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}var EventSender = function e(r) {
	  var c = this;_classCallCheck$7(this, e);this.send = function (e) {
	    var r = e.url,
	        n = e.data,
	        a = e.success,
	        i = e.fail,
	        u = e.eventError,
	        t = e.notSure,
	        s = e.isUnload;request({ url: r, data: n, success: function e(r, n, t) {
	        a();try {
	          var i = JSON.parse(t);var s = i.e;if (s !== 0) {
	            var o = "未知错误";if (s === -2) {
	              o = "事件格式错误！请检查字段类型是否正确。";
	            }c.logger.error("数据上报失败！", "错误码：" + s + "。错误信息：" + o);u(n, s);sdkMonitorOnError(r, n, s);
	          }
	        } catch (e) {
	          sdkMonitorOnError(r, n, ERROR_CODE.RESPONSE_DATA_ERROR);
	        }
	      }, fail: function e(r, n, t) {
	        c.logger.error("数据上报失败！", "错误码：" + t);i(n, t);sdkMonitorOnError(r, n, t);
	      }, notSure: t, isUnload: s });if (!c.isSdkMonitorDisabled && !c.isSdkOnLoadEventReady) {
	      c.isSdkOnLoadEventReady = true;try {
	        var o = n[0].header;var f = n[0].user;sdkMonitorOnload(r, { app_id: o.app_id, app_name: o.app_name, sdk_version: o.sdk_version, web_id: f.web_id });
	      } catch (e) {}
	    }
	  };this.logger = r.logger || logger;this.isSdkOnLoadEventReady = false;this.isSdkMonitorDisabled = false;
	};var sdkMonitorOnload = function e(r, n) {
	  try {
	    var t = { event: "onload", params: JSON.stringify({ app_id: n.app_id, app_name: n.app_name || "", sdk_version: n.sdk_version }), local_time_ms: Date.now() };var i = { events: [t], user: { user_unique_id: n.web_id }, header: { app_id: 1338 } };setTimeout(function () {
	      postSdkLog(r, [i]);
	    }, 16);
	  } catch (e) {}
	};var sdkMonitorOnError = function e(r, n, t) {
	  try {
	    var i = n[0].user;var s = n[0].header;var o = [];n.forEach(function (e) {
	      e.events.forEach(function (e) {
	        o.push(e);
	      });
	    });var a = o.map(function (e) {
	      return { event: "on_error", params: JSON.stringify({ error_code: t, app_id: s.app_id, app_name: s.app_name || "", error_event: e.event, local_time_ms: e.local_time_ms, tea_event_index: Date.now(), params: e.params, header: JSON.stringify(s), user: JSON.stringify(i) }), local_time_ms: Date.now() };
	    });var u = { events: a, user: { user_unique_id: i.user_unique_id }, header: { app_id: 1338 } };setTimeout(function () {
	      postSdkLog(r, [u]);
	    }, 16);
	  } catch (e) {}
	};function _classCallCheck$8(e, r) {
	  if (!(e instanceof r)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}function _possibleConstructorReturn$2(e, r) {
	  if (!e) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return r && ((typeof r === "undefined" ? "undefined" : _typeof2(r)) === "object" || typeof r === "function") ? r : e;
	}function _inherits$2(e, r) {
	  if (typeof r !== "function" && r !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof r === "undefined" ? "undefined" : _typeof2(r)));
	  }e.prototype = Object.create(r && r.prototype, { constructor: { value: e, enumerable: false, writable: true, configurable: true } });if (r) Object.setPrototypeOf ? Object.setPrototypeOf(e, r) : e.__proto__ = r;
	}var AppChannel = function (u) {
	  _inherits$2(f, u);function f(e) {
	    _classCallCheck$8(this, f);var o = _possibleConstructorReturn$2(this, u.call(this));o.addListener = function () {
	      window.addEventListener("unload", function () {
	        o.report(true);
	      }, false);window.addEventListener("beforeunload", function () {
	        o.report(true);
	      }, false);document.addEventListener("visibilitychange", function () {
	        if (document.visibilityState === "hidden") {
	          o.report(true);
	        }
	      }, false);
	    };o.setReady = function (e) {
	      o.isReady = e;o.eventSender.isSdkMonitorDisabled = o.isSdkMonitorDisabled;o.checkAndSendCachedStorageEvents();o.report();
	    };o.eventReportTimer = null;o.event = function () {
	      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var n = memoryCacheManager.get(o.evtDataCacheKey) || [];var t = r ? [].concat(e, n) : [].concat(n, e);memoryCacheManager.set(o.evtDataCacheKey, t);if (t.length >= 5) {
	        o.report();
	      } else {
	        if (o.eventReportTimer) {
	          clearTimeout(o.eventReportTimer);
	        }o.eventReportTimer = setTimeout(function () {
	          o.report();o.eventReportTimer = null;
	        }, o.waitForBatchTime);
	      }
	    };o.report = function () {
	      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;if (!o.isUserTokensReady) {
	        return false;
	      }if (!o.isReady) {
	        return false;
	      }var r = memoryCacheManager.get(o.evtDataCacheKey) || [];memoryCacheManager.clean(o.evtDataCacheKey);var n = o.mergeEnvToEvents(r);o.sendData(n, e);
	    };o.sendData = function (e, n) {
	      var t = [];var i = 0;var s = void 0;e.forEach(function (e) {
	        var r = !!e.__disable_storage__;if (typeof s === "undefined") {
	          s = r;
	        } else if (r !== s || t[i].length >= 5) {
	          i += 1;s = !s;
	        }t[i] = t[i] || [];t[i].push(e);
	      });t.forEach(function (e) {
	        var r = webid();if (!e[0].__disable_storage__) {
	          o.eventStorage.add(r, e);
	        }o._sendData(r, e, n);
	      });
	    };o.checkAndSendCachedStorageEvents = function () {
	      var r = o.eventStorage.getData();var e = Object.keys(r);if (e.length > 0) {
	        e.forEach(function (e) {
	          o._sendData(e, r[e]);
	        });
	      }
	    };o._sendData = function (r, e, n) {
	      o.isReporting = true;var t = function e() {
	        o.isReporting = false;
	      };o.eventSender.send({ url: o.reportUrl, data: e, success: function e() {
	          t();o.sendDataSuccess(r);
	        }, fail: function e(r, n) {
	          t();o.reportErrorCallback(r, n);setTimeout(function () {
	            o.report();
	          }, 3e3);
	        }, eventError: function e(r, n) {
	          o.reportErrorCallback(r, n);
	        }, notSure: t, isUnload: n });
	    };o.sendDataSuccess = function (e) {
	      o.eventStorage.delete(e);o.report();
	    };var r = e.log,
	        n = e.disable_storage,
	        t = e.max_batch_num,
	        i = t === undefined ? 5 : t,
	        s = e.batch_time,
	        a = s === undefined ? 30 : s;o.init(e);o.maxBatchNum = i;o.waitForBatchTime = a;o.isReady = false;o.addListener();o.enableDebugMode(!!r);o.eventStorage = new EventStorageManager({ disable_storage: n });o.eventStorage.setStorageKey(o.evtDataCacheKey);o.eventSender = new EventSender({ logger: o.logger });o.reportErrorCallback = function () {};return o;
	  }return f;
	}(AppChannelEnv);var _extends$2 = Object.assign || function (e) {
	  for (var r = 1; r < arguments.length; r++) {
	    var n = arguments[r];for (var t in n) {
	      if (Object.prototype.hasOwnProperty.call(n, t)) {
	        e[t] = n[t];
	      }
	    }
	  }return e;
	};function _classCallCheck$9(e, r) {
	  if (!(e instanceof r)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}var getEventIndex = function () {
	  var e = +Date.now() + Number(("" + Math.random()).slice(2, 8));return function () {
	    e += 1;return e;
	  };
	}();var preprocessEvent = function e(r, n) {
	  var t = /^event\./;var i = r;if (t.test(r)) {
	    i = r.slice(6);
	  }var s = n;if (!types.isObj(s)) {
	    s = {};
	  }s.event_index = getEventIndex();var o = { event: i, params: s, local_time_ms: +new Date() };return o;
	};var Collector = function e(r) {
	  var u = this;_classCallCheck$9(this, e);this.init = function (e) {
	    if (!types.isObj(e)) {
	      throw new Error("init 的参数必须是Object类型");
	    }u.logger.init(e.log);u.channel = new AppChannel(_extends$2({}, e, { name: u.name }));u.channel.callback = function () {
	      if (u.callbackSend) {
	        u.start();
	      }
	    };
	  };this.config = function (e) {
	    if (!types.isObj(e)) {
	      u.logger.throw("config 参数必须是 {} 的格式");
	    }if (e.log) {
	      u.logger.init(true);u.channel.enableDebugMode(true);e.log = null;
	    }var r = Object.keys(e);if (!r.length) {
	      return false;
	    }for (var n = r, t = Array.isArray(n), i = 0, n = t ? n : n[Symbol.iterator]();;) {
	      var s;if (t) {
	        if (i >= n.length) break;s = n[i++];
	      } else {
	        i = n.next();if (i.done) break;s = i.value;
	      }var o = s;var a = e[o];switch (o) {case "evtParams":
	          u.channel.setEvtParams(a);break;case "disable_ssid":
	          u.logger.deprecated("(disable_ssid)请通过init函数来设置。");if (a) {
	            u.logger.info("ssid已禁用，设置user_unique_id不会请求ssid接口。");u.channel.isSsidDisabled = a;
	          }break;case "disable_auto_pv":
	          if (a) {
	            u.logger.info("已禁止默认上报predefine_pageview事件，需手动上报。");u._autoSendPV = false;
	          }break;case "_staging_flag":
	          if ("" + a === "1") {
	            u.logger.info("根据_staging_flag设置，数据将会上报到stag 表。");
	          }u.channel.setEvtParams({ _staging_flag: Number(a) });break;case "reportErrorCallback":
	          if (typeof a === "function") {
	            u.channel.reportErrorCallback = a;
	          }break;default:
	          u.channel.setEnv(o, a);}
	    }
	  };this.send = function () {
	    u.start();
	  };this.start = function () {
	    if (u.channel.isUserTokensReady) {
	      if (u._isSendFuncCalled) {
	        return;
	      }u._isSendFuncCalled = true;u.logger.info("看到本提示，意味着用户信息已完全就绪，上报通道打开。用户标识如下：");u.logger.logJSON(u.channel.get().user);if (u._autoSendPV) {
	        u.predefinePageView();
	      }u.channel.setReady(true);
	    } else {
	      u.callbackSend = true;
	    }
	  };this.predefinePageView = function () {
	    var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var r = { title: document.title || location.pathname, url: location.href, url_path: location.pathname };var n = _extends$2({}, r, e);u.event("predefine_pageview", n, true);
	  };this.event = function () {
	    for (var e = arguments.length, r = Array(e), n = 0; n < e; n++) {
	      r[n] = arguments[n];
	    }var t = types.isBoolean(r[r.length - 1]);var i = t ? r[r.length - 1] : false;var s = t ? r.slice(0, r.length - 1) : r;var o = s[0];var a = [];if (!types.isArray(o)) {
	      a[0] = s;
	    } else {
	      a = s;
	    }a = a.map(function (e) {
	      return preprocessEvent.apply(undefined, e);
	    });u.channel.event(a, i);
	  };this._isSendFuncCalled = false;this._autoSendPV = true;this.name = r;this.logger = new Logger(r);
	};Collector.exportMethods = ["init", "config", "send", "start", "predefinePageView"];function _classCallCheck$a(e, r) {
	  if (!(e instanceof r)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}var CollectorAsync = function e(r) {
	  var o = this;_classCallCheck$a(this, e);this._exportCollect = function () {
	    for (var e = arguments.length, r = Array(e), n = 0; n < e; n++) {
	      r[n] = arguments[n];
	    }if (o._isQueueProcessed) {
	      o._executeCmd.apply(o, r);return;
	    }o.cmdQueue.push(r);o._processCmdQueue();
	  };this._processCmdQueue = function () {
	    if (o.cmdQueue.length === 0) {
	      return;
	    }var e = function e(r, t, i) {
	      var s = -1;r.forEach(function (e, r) {
	        var n = typeof i !== "undefined" ? e[i] : e;if (n === t) {
	          s = r;
	        }
	      });return s;
	    };var n = e(o.cmdQueue, "init", "0");if (n !== -1) {
	      o._isQueueProcessed = true;o._executeCmd.apply(o, o.cmdQueue[n]);o.cmdQueue.forEach(function (e, r) {
	        if (r !== n) {
	          o._executeCmd.apply(o, e);
	        }
	      });o.cmdQueue = [];
	    }
	  };this._executeCmd = function () {
	    for (var e = arguments.length, r = Array(e), n = 0; n < e; n++) {
	      r[n] = arguments[n];
	    }var t = r[0];if (Collector.exportMethods.indexOf(t) > -1) {
	      var i;(i = o.colloctor)[t].apply(i, r.slice(1));
	    } else {
	      var s;(s = o.colloctor).event.apply(s, r);
	    }
	  };this.name = r || "Collector" + +new Date();this.cmdQueue = [];this.colloctor = new Collector(this.name);this._isQueueProcessed = false;this._processCmdQueue();this._exportCollect.init = this._exportCollect.bind(this, "init");this._exportCollect.config = this._exportCollect.bind(this, "config");this._exportCollect.send = this._exportCollect.bind(this, "send");this._exportCollect.start = this._exportCollect.bind(this, "start");this._exportCollect.predefinePageView = this._exportCollect.bind(this, "predefinePageView");return this._exportCollect;
	};

	var cssFullscreen = function cssFullscreen() {
	  var player = this;
	  var root = player.root;
	  var util = Player.util;

	  function onCssFullscreenBtnClick() {
	    if (util.hasClass(root, 'xgplayer-is-cssfullscreen')) {
	      player.exitCssFullscreen();
	    } else {
	      player.getCssFullscreen();
	    }
	  }
	  player.on('cssFullscreenBtnClick', onCssFullscreenBtnClick);
	  player.on('exitFullscreen', function () {
	    util.removeClass(root, 'xgplayer-is-cssfullscreen');
	  });

	  function onDestroy() {
	    player.off('cssFullscreenBtnClick', onCssFullscreenBtnClick);
	    player.off('destroy', onDestroy);
	  }
	  player.once('destroy', onDestroy);
	};

	Player.install('cssFullscreen', cssFullscreen);

	var danmu = function danmu() {
	  var player = this;
	  var root = player.root;
	  var util = Player.util;

	  function onInitDanmu(danmujs) {
	    var container = player.root.querySelector('xg-danmu');
	    util.addClass(container, 'xgplayer-has-danmu');
	    if (!player.config.danmu.closeDefaultBtn) {
	      var onTimeupdate = function onTimeupdate() {
	        danmujs.start();
	      };

	      var onPause = function onPause() {
	        if (util.hasClass(player.danmuBtn, 'danmu-switch-active')) {
	          danmujs.pause();
	        }
	      };

	      var onPlay = function onPlay() {
	        if (util.hasClass(player.danmuBtn, 'danmu-switch-active')) {
	          danmujs.play();
	        }
	      };

	      var onSeeked = function onSeeked() {
	        if (util.hasClass(player.danmuBtn, 'danmu-switch-active')) {
	          danmujs.stop();
	          danmujs.start();
	        }
	      };

	      var onDestroy = function onDestroy() {
	        player.off('timeupdate', onTimeupdate);
	        player.off('pause', onPause);
	        player.off('play', onPlay);
	        player.off('seeked', onSeeked);
	        player.off('destroy', onDestroy);
	      };

	      player.danmuBtn = util.copyDom(danmujs.bulletBtn.createSwitch(true));
	      player.controls.appendChild(player.danmuBtn);

	      ['click', 'touchend'].forEach(function (item) {
	        player.danmuBtn.addEventListener(item, function (e) {
	          e.preventDefault();
	          e.stopPropagation();
	          util.toggleClass(player.danmuBtn, 'danmu-switch-active');
	          if (util.hasClass(player.danmuBtn, 'danmu-switch-active')) {
	            util.addClass(container, 'xgplayer-has-danmu');
	            player.once('timeupdate', onTimeupdate);
	          } else {
	            util.removeClass(container, 'xgplayer-has-danmu');
	            danmujs.stop();
	          }
	        });
	      });

	      player.onElementClick && container.addEventListener('click', function (e) {
	        player.onElementClick(e, container);
	      }, false);
	      player.onElementDblclick && container.addEventListener('dblclick', function (e) {
	        player.onElementDblclick(e, container);
	      }, false);

	      player.on('pause', onPause);

	      player.on('play', onPlay);

	      player.on('seeked', onSeeked);

	      player.once('destroy', onDestroy);
	    }
	  }
	  player.on('initDefaultDanmu', onInitDanmu);
	};

	Player.install('danmu', danmu);

	var definition = function definition() {
	  var player = this;
	  var root = player.root;

	  function onDestroy() {
	    player.off('destroy', onDestroy);
	  }
	  player.once('destroy', onDestroy);
	};

	Player.install('definition', definition);

	var download$1 = function download() {
	  var player = this;

	  function onDownloadBtnClick() {
	    // must pass an absolute url for download
	    player.download();
	  }
	  player.on('downloadBtnClick', onDownloadBtnClick);

	  function onDestroy() {
	    player.off('downloadBtnClick', onDownloadBtnClick);
	    player.off('destroy', onDestroy);
	  }
	  player.once('destroy', onDestroy);
	};

	Player.install('download', download$1);

	var fullscreen = function fullscreen() {
	  var player = this;
	  var root = player.root;
	  var util = Player.util;

	  function onFullscreenBtnClick() {
	    if (util.hasClass(root, 'xgplayer-is-fullscreen')) {
	      player.exitFullscreen(root);
	    } else {
	      player.getFullscreen(root);
	    }
	  }
	  player.on('fullscreenBtnClick', onFullscreenBtnClick);

	  function onFullscreenChange() {
	    var fullscreenEl = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
	    if (fullscreenEl && fullscreenEl === root) {
	      util.addClass(root, 'xgplayer-is-fullscreen');
	      player.emit('requestFullscreen');
	    } else {
	      util.removeClass(root, 'xgplayer-is-fullscreen');
	      player.emit('exitFullscreen');
	    }
	  }  ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(function (item) {
	    document.addEventListener(item, onFullscreenChange);
	  });

	  function onDestroy() {
	    player.off('fullscreenBtnClick', onFullscreenBtnClick);
	    ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(function (item) {
	      document.removeEventListener(item, onFullscreenChange);
	    });
	    player.off('destroy', onDestroy);
	  }
	  player.once('destroy', onDestroy);
	};

	Player.install('fullscreen', fullscreen);

	var i18n = function i18n() {
	  var player = this;var lang = {};var util = player.constructor.util;
	  lang.en = {
	    HAVE_NOTHING: 'There is no information on whether audio/video is ready',
	    HAVE_METADATA: 'Audio/video metadata is ready ',
	    HAVE_CURRENT_DATA: 'Data about the current play location is available, but there is not enough data to play the next frame/millisecond',
	    HAVE_FUTURE_DATA: 'Current and at least one frame of data is available',
	    HAVE_ENOUGH_DATA: 'The available data is sufficient to start playing',
	    NETWORK_EMPTY: 'Audio/video has not been initialized',
	    NETWORK_IDLE: 'Audio/video is active and has been selected for resources, but no network is used',
	    NETWORK_LOADING: 'The browser is downloading the data',
	    NETWORK_NO_SOURCE: 'No audio/video source was found',
	    MEDIA_ERR_ABORTED: 'The fetch process is aborted by the user',
	    MEDIA_ERR_NETWORK: 'An error occurred while downloading',
	    MEDIA_ERR_DECODE: 'An error occurred while decoding',
	    MEDIA_ERR_SRC_NOT_SUPPORTED: 'Audio/video is not supported',
	    REPLAY: 'Replay',
	    ERROR: 'Network is offline',
	    PLAY_TIPS: 'Play',
	    PAUSE_TIPS: 'Pause',
	    PLAYNEXT_TIPS: 'Play next',
	    DOWNLOAD_TIPS: 'Download',
	    ROTATE_TIPS: 'Rotate',
	    FULLSCREEN_TIPS: "Fullscreen",
	    EXITFULLSCREEN_TIPS: 'Exit fullscreen',
	    CSSFULLSCREEN_TIPS: 'Cssfullscreen',
	    EXITCSSFULLSCREEN_TIPS: 'Exit cssfullscreen',
	    TEXTTRACK: 'Caption',
	    PIP: 'Pip',
	    SCREENSHOT: 'Screenshot'
	  };
	  lang['zh-cn'] = {
	    HAVE_NOTHING: '没有关于音频/视频是否就绪的信息',
	    HAVE_METADATA: '音频/视频的元数据已就绪',
	    HAVE_CURRENT_DATA: '关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒',
	    HAVE_FUTURE_DATA: '当前及至少下一帧的数据是可用的',
	    HAVE_ENOUGH_DATA: '可用数据足以开始播放',
	    NETWORK_EMPTY: '音频/视频尚未初始化',
	    NETWORK_IDLE: '音频/视频是活动的且已选取资源，但并未使用网络',
	    NETWORK_LOADING: '浏览器正在下载数据',
	    NETWORK_NO_SOURCE: '未找到音频/视频来源',
	    MEDIA_ERR_ABORTED: '取回过程被用户中止',
	    MEDIA_ERR_NETWORK: '当下载时发生错误',
	    MEDIA_ERR_DECODE: '当解码时发生错误',
	    MEDIA_ERR_SRC_NOT_SUPPORTED: '不支持的音频/视频格式',
	    REPLAY: '重播',
	    ERROR: '网络连接似乎出现了问题',
	    PLAY_TIPS: '播放',
	    PAUSE_TIPS: '暂停',
	    PLAYNEXT_TIPS: '下一集',
	    DOWNLOAD_TIPS: '下载',
	    ROTATE_TIPS: '旋转',
	    FULLSCREEN_TIPS: "进入全屏",
	    EXITFULLSCREEN_TIPS: '退出全屏',
	    CSSFULLSCREEN_TIPS: '进入样式全屏',
	    EXITCSSFULLSCREEN_TIPS: '退出样式全屏',
	    TEXTTRACK: '字幕',
	    PIP: '画中画',
	    SCREENSHOT: '截图'
	  };
	  lang['jp'] = {
	    HAVE_NOTHING: 'オーディオ/ビデオが準備できているか情報がありません',
	    HAVE_METADATA: 'オーディオ/ビデオのメタデータは準備できています',
	    HAVE_CURRENT_DATA: '現在の再生位置に関するデータは利用可能ですが、次のフレーム/ミリ秒を再生するのに十分なデータがありません',
	    HAVE_FUTURE_DATA: '現在、少なくとも次のフレームのデータが利用可能です',
	    HAVE_ENOUGH_DATA: '利用可能なデータは再生を開始するのに十分です',
	    NETWORK_EMPTY: 'オーディオ/ビデオが初期化されていません',
	    NETWORK_IDLE: 'オーディオ/ビデオはアクティブでリソースが選択されていますが、ネットワークが使用されていません',
	    NETWORK_LOADING: 'ブラウザーはデータをダウンロードしています',
	    NETWORK_NO_SOURCE: 'オーディオ/ビデオ のソースが見つかりません',
	    MEDIA_ERR_ABORTED: 'ユーザーによってフェッチプロセスが中止されました',
	    MEDIA_ERR_NETWORK: 'ダウンロード中にエラーが発生しました',
	    MEDIA_ERR_DECODE: 'デコード中にエラーが発生しました',
	    MEDIA_ERR_SRC_NOT_SUPPORTED: 'オーディオ/ビデオ の形式がサポートされていません',
	    REPLAY: 'リプレイ',
	    ERROR: 'ネットワークの接続に問題が発生しました',
	    PLAY_TIPS: 'プレイ',
	    PAUSE_TIPS: '一時停止',
	    PLAYNEXT_TIPS: '次をプレイ',
	    DOWNLOAD_TIPS: 'ダウンロード',
	    ROTATE_TIPS: '回転',
	    FULLSCREEN_TIPS: "フルスクリーン",
	    EXITFULLSCREEN_TIPS: 'フルスクリーンを終了',
	    CSSFULLSCREEN_TIPS: 'シアターモード',
	    EXITCSSFULLSCREEN_TIPS: 'シアターモードを終了',
	    TEXTTRACK: '字幕',
	    PIP: 'ミニプレーヤー',
	    SCREENSHOT: 'スクリーンショット'
	  };

	  Object.defineProperty(player, 'lang', {
	    get: function get() {
	      if (player.config) {
	        return lang[player.config.lang] || lang['en'];
	      } else {
	        return lang['en'];
	      }
	    },
	    set: function set(value) {
	      if (util.typeOf(value) === 'Object') {
	        Object.keys(value).forEach(function (key) {
	          lang[key] = value[key];
	        });
	      }
	    }
	  });
	};

	Player.install('i18n', i18n);

	var localPreview = function localPreview() {
	  var player = this;
	  var root = player.root;
	  function onUpload(upload) {
	    player.uploadFile = upload.files[0];
	    var url = URL.createObjectURL(player.uploadFile);
	    if (util.hasClass(root, 'xgplayer-nostart')) {
	      player.config.url = url;
	      player.start();
	    } else {
	      player.src = url;
	      var playPromise = player.play();
	      if (playPromise !== undefined && playPromise) {
	        playPromise.catch(function (err) {});
	      }
	    }
	  }
	  player.on('upload', onUpload);

	  function onDestroy() {
	    player.off('upload', onUpload);
	    player.off('destroy', onDestroy);
	  }
	  player.once('destroy', onDestroy);
	};

	Player.install('localPreview', localPreview);

	/* eslint-disable */

	var logger$1 = function logger() {
	  var player = this;
	  var util = Player.util;
	  if (player.config.noLog !== true) {
	    var endedFunc = function endedFunc() {
	      var played = player.video.played;
	      var watch_dur = computeWatchDur(player.logParams.played);
	      var et = new Date().getTime();
	      judgePtVt();
	      var obj = {
	        url: player.logParams.pluginSrc ? player.logParams.pluginSrc : player.logParams.playSrc,
	        vid: player.config.vid,
	        bc: player.logParams.bc - 1 > 0 ? player.logParams.bc - 1 : 0,
	        bb: player.logParams.bc - 1 > 0 ? 1 : 0,
	        bu_acu_t: player.logParams.bu_acu_t,
	        pt: player.logParams.pt,
	        vt: player.logParams.vt,
	        vd: player.logParams.vd * 1000,
	        watch_dur: parseFloat((watch_dur * 1000).toFixed(3)),
	        cur_play_pos: parseFloat((player.currentTime * 1000).toFixed(3)),
	        et: et
	      };
	      window.__xigua_log_sdk__('c', obj);
	    };

	    var urlchangeFunc = function urlchangeFunc() {
	      var played = player.video.played;
	      var watch_dur = computeWatchDur(player.logParams.played);
	      var lt = new Date().getTime();
	      judgePtVt();
	      var obj = {
	        url: player.logParams.pluginSrc ? player.logParams.pluginSrc : player.logParams.playSrc,
	        vid: player.config.vid,
	        bc: player.logParams.bc - 1 > 0 ? player.logParams.bc - 1 : 0,
	        bb: player.logParams.bc - 1 > 0 ? 1 : 0,
	        bu_acu_t: player.logParams.bu_acu_t,
	        pt: player.logParams.pt,
	        vt: player.logParams.vt,
	        vd: player.logParams.vd * 1000,
	        watch_dur: parseFloat((watch_dur * 1000).toFixed(3)),
	        cur_play_pos: parseFloat((player.currentTime * 1000).toFixed(3)),
	        lt: lt
	      };
	      window.__xigua_log_sdk__('d', obj);
	    };

	    var errorFunc = function errorFunc(err) {
	      var played = player.video.played;
	      var watch_dur = computeWatchDur(player.logParams.played);
	      judgePtVt();
	      var et = new Date().getTime();
	      if (player.logParams.lastErrLog && et - player.logParams.lastErrLog <= 1000 * 3) {
	        return;
	      }
	      player.logParams.lastErrLog = et;
	      var obj = {
	        url: player.logParams.pluginSrc ? player.logParams.pluginSrc : player.logParams.playSrc,
	        vid: player.config.vid,
	        bc: player.logParams.bc - 1 > 0 ? player.logParams.bc - 1 : 0,
	        bb: player.logParams.bc - 1 > 0 ? 1 : 0,
	        bu_acu_t: player.logParams.bu_acu_t,
	        pt: player.logParams.pt,
	        vt: player.logParams.vt,
	        vd: player.logParams.vd * 1000,
	        watch_dur: parseFloat((watch_dur * 1000).toFixed(3)),
	        err_msg: err.errd.msg,
	        line: err.errd.line,
	        et: et,
	        cur_play_pos: parseFloat((player.currentTime * 1000).toFixed(3))
	      };
	      if (player.logParams.nologFunc && player.logParams.nologFunc(player)) {
	        return true;
	      } else {
	        window.__xigua_log_sdk__('e', obj);
	      }
	    };

	    var destroyFunc = function destroyFunc() {
	      if (sniffer.device === 'pc') {
	        window.removeEventListener('beforeunload', userLeave);
	      } else if (sniffer.device === 'mobile') {
	        window.removeEventListener('pagehide', userLeave);
	      }
	      player.off('routechange', userLeave);
	      player.off('ended', endedFunc);
	      player.off('urlchange', urlchangeFunc);
	      player.off('error', errorFunc);
	      player.off('destroy', destroyFunc);
	    };

	    if (!window.__xigua_log_sdk__) {
	      window.__xigua_log_sdk__ = new CollectorAsync('tracker');
	      window.__xigua_log_sdk__.init({
	        app_id: 1300,
	        channel: 'cn',
	        log: false,
	        disable_sdk_monitor: true
	      });

	      window.__xigua_log_sdk__('config', {
	        evtParams: {
	          log_type: 'logger',
	          page_url: document.URL,
	          domain: window.location.host,
	          pver: player.version,
	          ua: navigator.userAgent.toLowerCase()
	        },
	        disable_auto_pv: true
	      });
	      window.__xigua_log_sdk__.start();
	    }

	    if (player.config.uid) {
	      window.__xigua_log_sdk__('config', {
	        user_unique_id: player.config.uid
	      });
	    }

	    var computeWatchDur = function computeWatchDur() {
	      var played = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	      var arr = [];
	      for (var i = 0; i < played.length; i++) {
	        if (!played[i].end || played[i].begin < 0 || played[i].end < 0 || played[i].end < played[i].begin) {
	          continue;
	        }
	        if (arr.length < 1) {
	          arr.push({ begin: played[i].begin, end: played[i].end });
	        } else {
	          for (var j = 0; j < arr.length; j++) {
	            var begin = played[i].begin;
	            var _end = played[i].end;
	            if (_end < arr[j].begin) {
	              arr.splice(j, 0, { begin: begin, end: _end });
	              break;
	            } else if (begin > arr[j].end) {
	              if (j > arr.length - 2) {
	                arr.push({ begin: begin, end: _end });
	                break;
	              }
	            } else {
	              var b = arr[j].begin;
	              var e = arr[j].end;
	              arr[j].begin = Math.min(begin, b);
	              arr[j].end = Math.max(_end, e);
	              break;
	            }
	          }
	        }
	      }
	      var watch_dur = 0;
	      for (var _i = 0; _i < arr.length; _i++) {
	        watch_dur += arr[_i].end - arr[_i].begin;
	      }
	      return watch_dur;
	    };

	    var judgePtVt = function judgePtVt() {
	      if (!player.logParams.pt || !player.logParams.vt) {
	        player.logParams.pt = new Date().getTime();
	        player.logParams.vt = player.logParams.pt;
	      }
	      if (player.logParams.pt > player.logParams.vt) {
	        player.logParams.pt = player.logParams.vt;
	      }
	    };

	    var userLeave = function userLeave(event) {
	      if (util.hasClass(player.root, 'xgplayer-is-enter')) {
	        var lt = new Date().getTime();
	        var obj = {
	          url: player.logParams.pluginSrc ? player.logParams.pluginSrc : player.logParams.playSrc,
	          vid: player.config.vid,
	          pt: player.logParams.pt,
	          lt: lt
	        };
	        window.__xigua_log_sdk__('b', obj);
	      } else if (util.hasClass(player.root, 'xgplayer-playing')) {
	        var watch_dur = computeWatchDur(player.logParams.played);
	        var _lt = new Date().getTime();
	        judgePtVt();
	        var _obj = {
	          url: player.logParams.pluginSrc ? player.logParams.pluginSrc : player.logParams.playSrc,
	          vid: player.config.vid,
	          bc: player.logParams.bc - 1 > 0 ? player.logParams.bc - 1 : 0,
	          bb: player.logParams.bc - 1 > 0 ? 1 : 0,
	          bu_acu_t: player.logParams.bu_acu_t,
	          pt: player.logParams.pt,
	          vt: player.logParams.vt,
	          vd: player.logParams.vd * 1000,
	          watch_dur: parseFloat((watch_dur * 1000).toFixed(3)),
	          cur_play_pos: parseFloat((player.currentTime * 1000).toFixed(3)),
	          lt: _lt
	        };
	        window.__xigua_log_sdk__('d', _obj);
	      }
	    };
	    if (sniffer.device === 'pc') {
	      window.addEventListener('beforeunload', userLeave, false);
	    } else if (sniffer.device === 'mobile') {
	      window.addEventListener('pagehide', userLeave, false);
	    }
	    player.on('routechange', userLeave);

	    player.on('ended', endedFunc);

	    player.on('urlchange', urlchangeFunc);

	    player.on('error', errorFunc);

	    player.once('destroy', destroyFunc);
	  }
	};

	Player.install('logger', logger$1);

	var memoryPlay = function memoryPlay() {
	  var player = this;
	  player.on('memoryPlayStart', function (lastPlayTime) {
	    player.currentTime = lastPlayTime;
	  });
	};

	Player.install('memoryPlay', memoryPlay);

	var mobile = function mobile() {
	  var player = this;
	  var util = Player.util;var controls = player.controls;var root = player.root;

	  player.onElementTouchend = function (e, element) {
	    e.preventDefault();
	    e.stopPropagation();
	    var player = this;
	    if (util.hasClass(root, 'xgplayer-inactive')) {
	      player.emit('focus');
	    } else {
	      player.emit('blur');
	    }
	    if (!player.config.closeVideoTouch && !player.isTouchMove) {
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
	  };
	  player.video.addEventListener('touchend', function (e) {
	    player.onElementTouchend(e, player.video);
	  }, false);

	  player.video.addEventListener('touchstart', function () {
	    player.isTouchMove = false;
	  });

	  player.video.addEventListener('touchmove', function () {
	    player.isTouchMove = true;
	  });

	  function onReady(e) {
	    if (player.config.autoplay) {
	      player.start();
	    }
	  }
	  player.once('ready', onReady);

	  function onDestroy() {
	    player.off('ready', onReady);
	    player.off('destroy', onDestroy);
	  }
	  player.once('destroy', onDestroy);
	};

	Player.install('mobile', mobile);

	var pc = function pc() {
	  var player = this;
	  var util = Player.util;var controls = player.controls;var root = player.root;
	  var clk = 0;var _click_ = void 0;

	  player.onElementClick = function (e, element) {
	    e.preventDefault();
	    e.stopPropagation();
	    var player = this;
	    if (!player.config.closeVideoClick) {
	      clk++;
	      if (_click_) {
	        clearTimeout(_click_);
	      }
	      if (clk === 1) {
	        _click_ = setTimeout(function () {
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
	          clk = 0;
	        }, 200);
	      } else {
	        clk = 0;
	      }
	    }
	  };
	  player.video.addEventListener('click', function (e) {
	    player.onElementClick(e, player.video);
	  }, false);

	  player.onElementDblclick = function (e, element) {
	    e.preventDefault();
	    e.stopPropagation();
	    var player = this;
	    if (!player.config.closeVideoDblclick) {
	      var fullscreen = controls.querySelector('.xgplayer-fullscreen');
	      if (fullscreen) {
	        var _clk = void 0;
	        if (document.createEvent) {
	          _clk = document.createEvent('Event');
	          _clk.initEvent('click', true, true);
	        } else {
	          _clk = new Event('click');
	        }
	        fullscreen.dispatchEvent(_clk);
	      }
	    }
	  };
	  player.video.addEventListener('dblclick', function (e) {
	    player.onElementDblclick(e, player.video);
	  }, false);

	  function onMouseEnter() {
	    clearTimeout(player.leavePlayerTimer);
	    player.emit('focus', player);
	  }
	  root.addEventListener('mouseenter', onMouseEnter);

	  function onMouseLeave() {
	    if (!player.config.closePlayerBlur) {
	      player.leavePlayerTimer = setTimeout(function () {
	        player.emit('blur', player);
	      }, player.config.leavePlayerTime || 0);
	    }
	  }
	  root.addEventListener('mouseleave', onMouseLeave);

	  function onControlMouseEnter(e) {
	    if (player.userTimer) {
	      clearTimeout(player.userTimer);
	    }
	  }
	  controls.addEventListener('mouseenter', onControlMouseEnter, false);

	  function onControlMouseLeave(e) {
	    if (!player.config.closeControlsBlur) {
	      player.emit('focus', player);
	    }
	  }
	  controls.addEventListener('mouseleave', onControlMouseLeave, false);

	  function onReady(e) {
	    if (player.config.autoplay) {
	      player.start();
	    }
	  }
	  player.once('ready', onReady);

	  function onDestroy() {
	    root.removeEventListener('mouseenter', onMouseEnter);
	    root.removeEventListener('mouseleave', onMouseLeave);
	    player.off('ready', onReady);
	    player.off('destroy', onDestroy);
	  }
	  player.once('destroy', onDestroy);
	};

	Player.install('pc', pc);

	var pip = function pip() {
	  var player = this;
	  var util = Player.util;
	  var root = player.root;
	  function onPipBtnClick() {
	    if (util.hasClass(root, 'xgplayer-pip-active')) {
	      player.exitPIP();
	    } else {
	      player.getPIP();
	    }
	  }
	  player.on('pipBtnClick', onPipBtnClick);

	  function onDestroy() {
	    player.off('pipBtnClick', onPipBtnClick);
	    player.off('destroy', onDestroy);
	  }
	  player.once('destroy', onDestroy);
	};

	Player.install('pip', pip);

	var play = function play() {
	  var player = this;

	  function onPlayBtnClick() {
	    if (player.ended) {
	      return;
	    }
	    if (player.paused) {
	      var playPromise = player.play();
	      if (playPromise !== undefined && playPromise) {
	        playPromise.catch(function (err) {});
	      }
	    } else {
	      player.pause();
	    }
	  }
	  player.on('playBtnClick', onPlayBtnClick);

	  function onDestroy() {
	    player.off('playBtnClick', onPlayBtnClick);
	    player.off('destroy', onDestroy);
	  }
	  player.once('destroy', onDestroy);
	};

	Player.install('play', play);

	var playNext = function playNext() {
	  var player = this;
	  var root = player.root;
	  var nextBtn = player.config.playNext;
	  player.currentVideoIndex = -1;

	  function onPlayNextBtnClick() {
	    if (player.currentVideoIndex + 1 < nextBtn.urlList.length) {
	      player.currentVideoIndex++;
	      player.video.autoplay = true;
	      player.src = nextBtn.urlList[player.currentVideoIndex];
	      player.emit('playerNext', player.currentVideoIndex + 1);
	    } else {
	      player.emit('urlList last');
	    }
	  }
	  player.on('playNextBtnClick', onPlayNextBtnClick);

	  function onDestroy() {
	    player.off('playNextBtnClick', onPlayNextBtnClick);
	    player.off('destroy', onDestroy);
	  }
	  player.once('destroy', onDestroy);
	};

	Player.install('playNext', playNext);

	var replay = function replay() {
	  var player = this;
	  var util = Player.util;
	  var root = player.root;

	  function onReplayBtnClick() {
	    util.removeClass(root, 'replay');
	    player.replay();
	  }
	  player.on('replayBtnClick', onReplayBtnClick);

	  function onEnded() {
	    if (!player.config.loop) {
	      util.addClass(root, 'replay');
	    }
	  }
	  player.on('ended', onEnded);

	  function onDestroy() {
	    player.off('replayBtnClick', onReplayBtnClick);
	    player.off('destroy', onDestroy);
	  }
	  player.once('destroy', onDestroy);
	};

	Player.install('replay', replay);

	var rotate = function rotate() {
	  var player = this;
	  var rotateConfig = player.config.rotate;
	  if (!rotateConfig) {
	    return;
	  }

	  function onRotateBtnClick() {
	    player.rotate(rotateConfig.clockwise, rotateConfig.innerRotate);
	  }
	  player.on('rotateBtnClick', onRotateBtnClick);

	  function onDestroy() {
	    player.off('rotateBtnClick', onRotateBtnClick);
	    player.off('destroy', onDestroy);
	  }
	  player.once('destroy', onDestroy);
	};

	Player.install('rotate', rotate);

	var screenShot = function screenShot() {
	  var player = this;
	  var root = player.root;
	  if (!player.config.screenShot) {
	    return;
	  }

	  var canvas = document.createElement('canvas');
	  var canvasCtx = canvas.getContext('2d');
	  var img = new Image();
	  canvas.width = this.config.width || 600;
	  canvas.height = this.config.height || 337.5;

	  var saveScreenShot = function saveScreenShot(data, filename) {
	    var saveLink = document.createElement('a');
	    saveLink.href = data;
	    saveLink.download = filename;
	    var event = document.createEvent('MouseEvents');
	    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	    saveLink.dispatchEvent(event);
	  };

	  function onScreenShotBtnClick() {
	    img.onload = function () {
	      canvasCtx.drawImage(player.video, 0, 0, canvas.width, canvas.height);
	      img.setAttribute('crossOrigin', 'anonymous');
	      img.src = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
	      var screenShotImg = img.src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
	      saveScreenShot(screenShotImg, '截图.png');
	    }();
	  }
	  player.on('screenShotBtnClick', onScreenShotBtnClick);

	  function onDestroy() {
	    player.off('screenShotBtnClick', onScreenShotBtnClick);
	    player.off('destroy', onDestroy);
	  }
	  player.once('destroy', onDestroy);
	};

	Player.install('screenShot', screenShot);

	var start = function start() {
	  var player = this;
	  var root = player.root;
	  var util = Player.util;

	  function onCanplay() {
	    util.removeClass(root, 'xgplayer-is-enter');
	  }

	  function onPlaying() {
	    util.removeClass(root, 'xgplayer-is-enter');
	  }

	  function onStartBtnClick() {
	    if (util.hasClass(root, 'xgplayer-nostart')) {
	      util.removeClass(root, 'xgplayer-nostart'); // for ie quick switch
	      util.addClass(root, 'xgplayer-is-enter');
	      player.on('canplay', onCanplay);
	      player.once('playing', onPlaying);
	      if (!root.querySelector('video')) {
	        player.start();
	      }
	      var playPromise = player.play();
	      if (playPromise !== undefined && playPromise) {
	        playPromise.catch(function (err) {});
	      }
	    } else {
	      if (player.paused) {
	        util.removeClass(root, 'xgplayer-nostart xgplayer-isloading');
	        setTimeout(function () {
	          var playPromise = player.play();
	          if (playPromise !== undefined && playPromise) {
	            playPromise.catch(function (err) {});
	          }
	        }, 10);
	      }
	    }
	  }
	  player.on('startBtnClick', onStartBtnClick);

	  function onDestroy() {
	    player.off('canplay', onCanplay);
	    player.off('playing', onPlaying);
	    player.off('startBtnClick', onStartBtnClick);
	    player.off('destroy', onDestroy);
	  }
	  player.once('destroy', onDestroy);
	};

	Player.install('start', start);

	var volume = function volume() {
	  var player = this;
	  var root = player.root;
	  var util = Player.util;
	  var container = void 0,
	      slider = void 0,
	      bar = void 0,
	      selected = void 0,
	      icon = void 0;
	  function onCanplay() {
	    player.volume = Player.sniffer.device === 'mobile' ? 1 : player.config.volume;
	    container = player.controls.querySelector('.xgplayer-volume');
	    slider = container.querySelector('.xgplayer-slider');
	    bar = container.querySelector('.xgplayer-bar');
	    selected = container.querySelector('.xgplayer-drag');
	    icon = container.querySelector('.xgplayer-icon');
	  }
	  player.once('canplay', onCanplay);

	  function onVolumeBarClick(e) {
	    player.video.muted = false;
	    slider.focus();
	    util.event(e);

	    var barRect = bar.getBoundingClientRect();
	    var pos = { x: e.clientX, y: e.clientY };
	    var height = selected.getBoundingClientRect().height;
	    var isMove = false;
	    var onMove = function onMove(e) {
	      e.preventDefault();
	      e.stopPropagation();
	      util.event(e);
	      isMove = true;
	      var w = height - e.clientY + pos.y;
	      var now = w / barRect.height;
	      selected.style.height = w + 'px';
	      player.volume = Math.max(Math.min(now, 1), 0);
	    };
	    var onUp = function onUp(e) {
	      e.preventDefault();
	      e.stopPropagation();
	      util.event(e);
	      window.removeEventListener('mousemove', onMove);
	      window.removeEventListener('touchmove', onMove);
	      window.removeEventListener('mouseup', onUp);
	      window.removeEventListener('touchend', onUp);

	      if (!isMove) {
	        var w = barRect.height - (e.clientY - barRect.top);
	        var now = w / barRect.height;
	        selected.style.height = w + 'px';
	        if (now <= 0) {
	          if (player.volume > 0) {
	            selected.volume = player.video.volume;
	          } else {
	            now = selected.volume;
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
	  player.on('volumeBarClick', onVolumeBarClick);

	  function onVolumeIconClick() {
	    if (Player.sniffer.device === 'mobile') {
	      // util.removeClass(root, 'xgplayer-volume-muted')
	      // util.removeClass(root, 'xgplayer-volume-large')
	      if (player.video.muted) {
	        player.video.muted = false;
	        // util.addClass(root, 'xgplayer-volume-large')
	      } else {
	        player.video.muted = true;
	        // util.addClass(root, 'xgplayer-volume-muted')
	      }
	    } else {
	      player.video.muted = false;
	      if (player.volume < 0.1) {
	        player.volume = slider.volume;
	      } else {
	        player.volume = 0;
	      }
	    }
	    // onVolumeChange ()
	  }
	  player.on('volumeIconClick', onVolumeIconClick);

	  function onVolumeIconEnter() {
	    util.addClass(root, 'xgplayer-volume-active');
	    if (container) {
	      container.focus();
	    }
	  }
	  player.on('volumeIconEnter', onVolumeIconEnter);

	  function onVolumeIconLeave() {
	    util.removeClass(root, 'xgplayer-volume-active');
	  }
	  player.on('volumeIconLeave', onVolumeIconLeave);

	  var _changeTimer = null;
	  function onVolumeChange() {
	    if (_changeTimer) {
	      clearTimeout(_changeTimer);
	    }
	    _changeTimer = setTimeout(function () {
	      if (Player.sniffer.device === 'mobile') {
	        util.removeClass(root, 'xgplayer-volume-muted');
	        util.removeClass(root, 'xgplayer-volume-large');
	        if (player.video.muted) {
	          util.addClass(root, 'xgplayer-volume-muted');
	        } else {
	          util.addClass(root, 'xgplayer-volume-large');
	        }
	      } else {
	        util.removeClass(root, 'xgplayer-volume-muted');
	        util.removeClass(root, 'xgplayer-volume-small');
	        util.removeClass(root, 'xgplayer-volume-large');
	        if (player.volume === 0) {
	          util.addClass(root, 'xgplayer-volume-muted');
	        } else if (player.volume < 0.5) {
	          util.addClass(root, 'xgplayer-volume-small');
	        } else {
	          util.addClass(root, 'xgplayer-volume-large');
	        }
	        var containerHeight = bar.getBoundingClientRect().height || 76;
	        selected.style.height = player.volume * containerHeight + 'px';
	      }
	    }, 50);
	  }
	  player.on('volumechange', onVolumeChange);

	  function onDestroy() {
	    player.off('canplay', onCanplay);
	    player.off('volumeBarClick', onVolumeBarClick);
	    player.off('volumeIconClick', onVolumeIconClick);
	    player.off('volumeIconEnter', onVolumeIconEnter);
	    player.off('volumeIconLeave', onVolumeIconLeave);
	    player.off('volumechange', onVolumeChange);
	    player.off('destroy', onDestroy);
	  }
	  player.once('destroy', onDestroy);
	};

	Player.install('volume', volume);

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

	var css = ".xgplayer-skin-default {\n  background: #000;\n  width: 100%;\n  height: 100%;\n  position: relative;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n  -ms-user-select: none; }\n  .xgplayer-skin-default * {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    font: inherit;\n    vertical-align: baseline; }\n  .xgplayer-skin-default .xgplayer-none {\n    display: none; }\n  .xgplayer-skin-default.xgplayer-is-fullscreen {\n    width: 100% !important;\n    height: 100% !important;\n    padding-top: 0 !important;\n    z-index: 9999; }\n  .xgplayer-skin-default.xgplayer-is-fullscreen.xgplayer-inactive {\n    cursor: none; }\n  .xgplayer-skin-default video {\n    width: 100%;\n    height: 100%;\n    outline: none; }\n\n.xgplayer-skin-default .xgplayer-none {\n  display: none; }\n\n@-webkit-keyframes loadingRotate {\n  0% {\n    -webkit-transform: rotate(0);\n            transform: rotate(0); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n@keyframes loadingRotate {\n  0% {\n    -webkit-transform: rotate(0);\n            transform: rotate(0); }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n@-webkit-keyframes loadingDashOffset {\n  0% {\n    stroke-dashoffset: 236; }\n  100% {\n    stroke-dashoffset: 0; } }\n\n@keyframes loadingDashOffset {\n  0% {\n    stroke-dashoffset: 236; }\n  100% {\n    stroke-dashoffset: 0; } }\n\n.xgplayer-skin-default .xgplayer-play, .xgplayer-skin-default .xgplayer-play-img {\n  position: relative;\n  -webkit-order: 0;\n     -moz-box-ordinal-group: 1;\n          order: 0;\n  display: block;\n  cursor: pointer; }\n  .xgplayer-skin-default .xgplayer-play .xgplayer-icon, .xgplayer-skin-default .xgplayer-play-img .xgplayer-icon {\n    margin-top: 3px;\n    width: 32px; }\n    .xgplayer-skin-default .xgplayer-play .xgplayer-icon div, .xgplayer-skin-default .xgplayer-play-img .xgplayer-icon div {\n      position: absolute; }\n    .xgplayer-skin-default .xgplayer-play .xgplayer-icon .xgplayer-icon-play, .xgplayer-skin-default .xgplayer-play-img .xgplayer-icon .xgplayer-icon-play {\n      display: block; }\n    .xgplayer-skin-default .xgplayer-play .xgplayer-icon .xgplayer-icon-pause, .xgplayer-skin-default .xgplayer-play-img .xgplayer-icon .xgplayer-icon-pause {\n      display: none; }\n  .xgplayer-skin-default .xgplayer-play .xgplayer-tips .xgplayer-tip-play, .xgplayer-skin-default .xgplayer-play-img .xgplayer-tips .xgplayer-tip-play {\n    display: block; }\n  .xgplayer-skin-default .xgplayer-play .xgplayer-tips .xgplayer-tip-pause, .xgplayer-skin-default .xgplayer-play-img .xgplayer-tips .xgplayer-tip-pause {\n    display: none; }\n  .xgplayer-skin-default .xgplayer-play:hover, .xgplayer-skin-default .xgplayer-play-img:hover {\n    opacity: 0.85; }\n    .xgplayer-skin-default .xgplayer-play:hover .xgplayer-tips, .xgplayer-skin-default .xgplayer-play-img:hover .xgplayer-tips {\n      display: block; }\n\n.xgplayer-skin-default.xgplayer-playing .xgplayer-play .xgplayer-icon .xgplayer-icon-play, .xgplayer-skin-default.xgplayer-playing .xgplayer-play-img .xgplayer-icon .xgplayer-icon-play {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-playing .xgplayer-play .xgplayer-icon .xgplayer-icon-pause, .xgplayer-skin-default.xgplayer-playing .xgplayer-play-img .xgplayer-icon .xgplayer-icon-pause {\n  display: block; }\n\n.xgplayer-skin-default.xgplayer-playing .xgplayer-play .xgplayer-tips .xgplayer-tip-play, .xgplayer-skin-default.xgplayer-playing .xgplayer-play-img .xgplayer-tips .xgplayer-tip-play {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-playing .xgplayer-play .xgplayer-tips .xgplayer-tip-pause, .xgplayer-skin-default.xgplayer-playing .xgplayer-play-img .xgplayer-tips .xgplayer-tip-pause {\n  display: block; }\n\n.xgplayer-skin-default.xgplayer-pause .xgplayer-play .xgplayer-icon .xgplayer-icon-play, .xgplayer-skin-default.xgplayer-pause .xgplayer-play-img .xgplayer-icon .xgplayer-icon-play {\n  display: block; }\n\n.xgplayer-skin-default.xgplayer-pause .xgplayer-play .xgplayer-icon .xgplayer-icon-pause, .xgplayer-skin-default.xgplayer-pause .xgplayer-play-img .xgplayer-icon .xgplayer-icon-pause {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-pause .xgplayer-play .xgplayer-tips .xgplayer-tip-play, .xgplayer-skin-default.xgplayer-pause .xgplayer-play-img .xgplayer-tips .xgplayer-tip-play {\n  display: block; }\n\n.xgplayer-skin-default.xgplayer-pause .xgplayer-play .xgplayer-tips .xgplayer-tip-pause, .xgplayer-skin-default.xgplayer-pause .xgplayer-play-img .xgplayer-tips .xgplayer-tip-pause {\n  display: none; }\n\n.xgplayer-skin-default .xgplayer-start {\n  border-radius: 50%;\n  display: inline-block;\n  width: 70px;\n  height: 70px;\n  background: rgba(0, 0, 0, .38);\n  overflow: hidden;\n  text-align: center;\n  line-height: 70px;\n  vertical-align: middle;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  z-index: 115;\n  margin: -35px auto auto -35px;\n  cursor: pointer; }\n  .xgplayer-skin-default .xgplayer-start div {\n    position: absolute; }\n    .xgplayer-skin-default .xgplayer-start div svg {\n      fill: rgba(255, 255, 255, .7);\n      margin: 14px; }\n  .xgplayer-skin-default .xgplayer-start .xgplayer-icon-play {\n    display: block; }\n  .xgplayer-skin-default .xgplayer-start .xgplayer-icon-pause {\n    display: none; }\n  .xgplayer-skin-default .xgplayer-start:hover {\n    opacity: 0.85; }\n\n.xgplayer-skin-default.xgplayer-playing .xgplayer-start {\n  display: none; }\n  .xgplayer-skin-default.xgplayer-playing .xgplayer-start .xgplayer-icon-play {\n    display: none; }\n  .xgplayer-skin-default.xgplayer-playing .xgplayer-start .xgplayer-icon-pause {\n    display: block; }\n\n.xgplayer-skin-default.xgplayer-pause .xgplayer-start {\n  display: inline-block; }\n  .xgplayer-skin-default.xgplayer-pause .xgplayer-start .xgplayer-icon-play {\n    display: block; }\n  .xgplayer-skin-default.xgplayer-pause .xgplayer-start .xgplayer-icon-pause {\n    display: none; }\n\n.xgplayer-skin-default.replay .xgplayer-start {\n  display: none; }\n  .xgplayer-skin-default.replay .xgplayer-start .xgplayer-icon-play {\n    display: block; }\n  .xgplayer-skin-default.replay .xgplayer-start .xgplayer-icon-pause {\n    display: none; }\n\n.xgplayer-skin-default .xgplayer-enter {\n  display: none;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background: black;\n  z-index: 120; }\n  .xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner {\n    display: block;\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    height: 100px;\n    width: 100px;\n    position: relative;\n    -webkit-transform: translate(-50%, -50%);\n        -ms-transform: translate(-50%, -50%);\n            transform: translate(-50%, -50%); }\n  .xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div {\n    width: 12%;\n    height: 26%;\n    background-color: rgba(255, 255, 255, .7);\n    position: absolute;\n    left: 44%;\n    top: 37%;\n    opacity: 0;\n    border-radius: 30px;\n    -webkit-animation: fade 1s linear infinite;\n            animation: fade 1s linear infinite; }\n  .xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar1 {\n    -webkit-transform: rotate(0deg) translate(0, -142%);\n        -ms-transform: rotate(0deg) translate(0, -142%);\n            transform: rotate(0deg) translate(0, -142%);\n    -webkit-animation-delay: -0s;\n            animation-delay: -0s; }\n  .xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar2 {\n    -webkit-transform: rotate(30deg) translate(0, -142%);\n        -ms-transform: rotate(30deg) translate(0, -142%);\n            transform: rotate(30deg) translate(0, -142%);\n    -webkit-animation-delay: -0.9163s;\n            animation-delay: -0.9163s; }\n  .xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar3 {\n    -webkit-transform: rotate(60deg) translate(0, -142%);\n        -ms-transform: rotate(60deg) translate(0, -142%);\n            transform: rotate(60deg) translate(0, -142%);\n    -webkit-animation-delay: -0.833s;\n            animation-delay: -0.833s; }\n  .xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar4 {\n    -webkit-transform: rotate(90deg) translate(0, -142%);\n        -ms-transform: rotate(90deg) translate(0, -142%);\n            transform: rotate(90deg) translate(0, -142%);\n    -webkit-animation-delay: -0.7497s;\n            animation-delay: -0.7497s; }\n  .xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar5 {\n    -webkit-transform: rotate(120deg) translate(0, -142%);\n        -ms-transform: rotate(120deg) translate(0, -142%);\n            transform: rotate(120deg) translate(0, -142%);\n    -webkit-animation-delay: -0.6664s;\n            animation-delay: -0.6664s; }\n  .xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar6 {\n    -webkit-transform: rotate(150deg) translate(0, -142%);\n        -ms-transform: rotate(150deg) translate(0, -142%);\n            transform: rotate(150deg) translate(0, -142%);\n    -webkit-animation-delay: -0.5831s;\n            animation-delay: -0.5831s; }\n  .xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar7 {\n    -webkit-transform: rotate(180deg) translate(0, -142%);\n        -ms-transform: rotate(180deg) translate(0, -142%);\n            transform: rotate(180deg) translate(0, -142%);\n    -webkit-animation-delay: -0.4998s;\n            animation-delay: -0.4998s; }\n  .xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar8 {\n    -webkit-transform: rotate(210deg) translate(0, -142%);\n        -ms-transform: rotate(210deg) translate(0, -142%);\n            transform: rotate(210deg) translate(0, -142%);\n    -webkit-animation-delay: -0.4165s;\n            animation-delay: -0.4165s; }\n  .xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar9 {\n    -webkit-transform: rotate(240deg) translate(0, -142%);\n        -ms-transform: rotate(240deg) translate(0, -142%);\n            transform: rotate(240deg) translate(0, -142%);\n    -webkit-animation-delay: -0.3332s;\n            animation-delay: -0.3332s; }\n  .xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar10 {\n    -webkit-transform: rotate(270deg) translate(0, -142%);\n        -ms-transform: rotate(270deg) translate(0, -142%);\n            transform: rotate(270deg) translate(0, -142%);\n    -webkit-animation-delay: -0.2499s;\n            animation-delay: -0.2499s; }\n  .xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar11 {\n    -webkit-transform: rotate(300deg) translate(0, -142%);\n        -ms-transform: rotate(300deg) translate(0, -142%);\n            transform: rotate(300deg) translate(0, -142%);\n    -webkit-animation-delay: -0.1666s;\n            animation-delay: -0.1666s; }\n  .xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar12 {\n    -webkit-transform: rotate(330deg) translate(0, -142%);\n        -ms-transform: rotate(330deg) translate(0, -142%);\n            transform: rotate(330deg) translate(0, -142%);\n    -webkit-animation-delay: -0.0833s;\n            animation-delay: -0.0833s; }\n\n@-webkit-keyframes fade {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0.25; } }\n\n.xgplayer-skin-default.xgplayer-is-enter .xgplayer-enter {\n  display: block; }\n\n.xgplayer-skin-default .xgplayer-poster {\n  display: none;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 100;\n  background-size: cover;\n  background-position: center center; }\n\n.xgplayer-skin-default.xgplayer-nostart .xgplayer-poster {\n  display: block; }\n\n.xgplayer-skin-default .xgplayer-placeholder {\n  -webkit-flex: 1;\n     -moz-box-flex: 1;\n          flex: 1;\n  -webkit-order: 3;\n     -moz-box-ordinal-group: 4;\n          order: 3;\n  display: block; }\n\n.xgplayer-skin-default .xgplayer-fullscreen, .xgplayer-skin-default .xgplayer-fullscreen-img {\n  position: relative;\n  -webkit-order: 13;\n     -moz-box-ordinal-group: 14;\n          order: 13;\n  display: block;\n  cursor: pointer; }\n  .xgplayer-skin-default .xgplayer-fullscreen .xgplayer-icon, .xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-icon {\n    margin-top: 3px; }\n    .xgplayer-skin-default .xgplayer-fullscreen .xgplayer-icon div, .xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-icon div {\n      position: absolute; }\n    .xgplayer-skin-default .xgplayer-fullscreen .xgplayer-icon .xgplayer-icon-requestfull, .xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-icon .xgplayer-icon-requestfull {\n      display: block; }\n    .xgplayer-skin-default .xgplayer-fullscreen .xgplayer-icon .xgplayer-icon-exitfull, .xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-icon .xgplayer-icon-exitfull {\n      display: none; }\n  .xgplayer-skin-default .xgplayer-fullscreen .xgplayer-tips, .xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-tips {\n    position: absolute;\n    right: 0;\n    left: auto; }\n    .xgplayer-skin-default .xgplayer-fullscreen .xgplayer-tips .xgplayer-tip-requestfull, .xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-tips .xgplayer-tip-requestfull {\n      display: block; }\n    .xgplayer-skin-default .xgplayer-fullscreen .xgplayer-tips .xgplayer-tip-exitfull, .xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-tips .xgplayer-tip-exitfull {\n      display: none; }\n  .xgplayer-skin-default .xgplayer-fullscreen:hover, .xgplayer-skin-default .xgplayer-fullscreen-img:hover {\n    opacity: 0.85; }\n    .xgplayer-skin-default .xgplayer-fullscreen:hover .xgplayer-tips, .xgplayer-skin-default .xgplayer-fullscreen-img:hover .xgplayer-tips {\n      display: block; }\n\n.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen .xgplayer-icon .xgplayer-icon-requestfull, .xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen-img .xgplayer-icon .xgplayer-icon-requestfull {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen .xgplayer-icon .xgplayer-icon-exitfull, .xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen-img .xgplayer-icon .xgplayer-icon-exitfull {\n  display: block; }\n\n.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen .xgplayer-tips .xgplayer-tip-requestfull, .xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen-img .xgplayer-tips .xgplayer-tip-requestfull {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen .xgplayer-tips .xgplayer-tip-exitfull, .xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen-img .xgplayer-tips .xgplayer-tip-exitfull {\n  display: block; }\n\n.xgplayer-skin-default .xgplayer-cssfullscreen, .xgplayer-skin-default .xgplayer-cssfullscreen-img {\n  position: relative;\n  -webkit-order: 12;\n     -moz-box-ordinal-group: 13;\n          order: 12;\n  display: block;\n  cursor: pointer; }\n  .xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-icon, .xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-icon {\n    width: 32px;\n    margin-top: 5px; }\n    .xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-icon div, .xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-icon div {\n      position: absolute; }\n    .xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-icon .xgplayer-icon-requestfull, .xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-icon .xgplayer-icon-requestfull {\n      display: block; }\n    .xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-icon .xgplayer-icon-exitfull, .xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-icon .xgplayer-icon-exitfull {\n      display: none; }\n  .xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-tips, .xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-tips {\n    margin-left: -40px; }\n    .xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-tips .xgplayer-tip-requestfull, .xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-tips .xgplayer-tip-requestfull {\n      display: block; }\n    .xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-tips .xgplayer-tip-exitfull, .xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-tips .xgplayer-tip-exitfull {\n      display: none; }\n  .xgplayer-skin-default .xgplayer-cssfullscreen:hover, .xgplayer-skin-default .xgplayer-cssfullscreen-img:hover {\n    opacity: 0.85; }\n    .xgplayer-skin-default .xgplayer-cssfullscreen:hover .xgplayer-tips, .xgplayer-skin-default .xgplayer-cssfullscreen-img:hover .xgplayer-tips {\n      display: block; }\n\n.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-icon .xgplayer-icon-requestfull, .xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-icon .xgplayer-icon-requestfull {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-icon .xgplayer-icon-exitfull, .xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-icon .xgplayer-icon-exitfull {\n  display: block; }\n\n.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-tips, .xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-tips {\n  margin-left: -47px; }\n  .xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-tips .xgplayer-tip-requestfull, .xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-tips .xgplayer-tip-requestfull {\n    display: none; }\n  .xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-tips .xgplayer-tip-exitfull, .xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-tips .xgplayer-tip-exitfull {\n    display: block; }\n\n.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-cssfullscreen, .xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-cssfullscreen-img {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-is-cssfullscreen {\n  position: fixed !important;\n  left: 0 !important;\n  top: 0 !important;\n  width: 100% !important;\n  height: 100% !important;\n  z-index: 99999 !important; }\n\n.lang-is-en .xgplayer-cssfullscreen .xgplayer-tips, .lang-is-en .xgplayer-cssfullscreen-img .xgplayer-tips {\n  margin-left: -46px; }\n\n.lang-is-en.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-tips, .lang-is-en.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-tips {\n  margin-left: -46px; }\n\n.lang-is-jp .xgplayer-cssfullscreen .xgplayer-tips, .lang-is-jp .xgplayer-cssfullscreen-img .xgplayer-tips {\n  margin-left: -120px; }\n\n.lang-is-jp.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-tips, .lang-is-jp.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-tips {\n  margin-left: -60px; }\n\n.xgplayer-skin-default .xgplayer-volume {\n  outline: none;\n  -webkit-order: 4;\n     -moz-box-ordinal-group: 5;\n          order: 4;\n  width: 28px;\n  height: 140px;\n  display: block;\n  position: relative;\n  margin-top: -100px;\n  overflow: hidden;\n  z-index: 18; }\n  .xgplayer-skin-default .xgplayer-volume .xgplayer-icon {\n    margin-top: 8px;\n    cursor: pointer;\n    position: absolute;\n    bottom: -9px; }\n    .xgplayer-skin-default .xgplayer-volume .xgplayer-icon div {\n      position: absolute; }\n    .xgplayer-skin-default .xgplayer-volume .xgplayer-icon .xgplayer-icon-large {\n      display: block; }\n    .xgplayer-skin-default .xgplayer-volume .xgplayer-icon .xgplayer-icon-small {\n      display: none; }\n    .xgplayer-skin-default .xgplayer-volume .xgplayer-icon .xgplayer-icon-muted {\n      display: none; }\n\n.xgplayer-skin-default .xgplayer-slider {\n  display: none;\n  position: absolute;\n  width: 28px;\n  height: 92px;\n  background: rgba(0, 0, 0, .54);\n  border-radius: 1px;\n  bottom: 42px;\n  outline: none; }\n  .xgplayer-skin-default .xgplayer-slider:after {\n    content: \" \";\n    display: block;\n    height: 15px;\n    width: 28px;\n    position: absolute;\n    bottom: -15px;\n    left: 0;\n    z-index: 20; }\n\n.xgplayer-skin-default .xgplayer-bar, .xgplayer-skin-default .xgplayer-drag {\n  display: block;\n  position: absolute;\n  bottom: 6px;\n  left: 12px;\n  background: rgba(255, 255, 255, .3);\n  border-radius: 100px;\n  width: 4px;\n  height: 76px;\n  outline: none;\n  cursor: pointer; }\n\n.xgplayer-skin-default .xgplayer-drag {\n  bottom: 0;\n  left: 0;\n  background: #FA1F41;\n  max-height: 76px; }\n  .xgplayer-skin-default .xgplayer-drag:after {\n    content: \" \";\n    display: inline-block;\n    width: 8px;\n    height: 8px;\n    background: #fff;\n    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .26);\n    position: absolute;\n    border-radius: 50%;\n    left: -2px;\n    top: -6px; }\n\n.xgplayer-skin-default.xgplayer-volume-active .xgplayer-slider {\n  display: block; }\n\n.xgplayer-skin-default.xgplayer-volume-large .xgplayer-volume .xgplayer-icon .xgplayer-icon-large {\n  display: block; }\n\n.xgplayer-skin-default.xgplayer-volume-large .xgplayer-volume .xgplayer-icon .xgplayer-icon-small {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-volume-large .xgplayer-volume .xgplayer-icon .xgplayer-icon-muted {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-volume-small .xgplayer-volume .xgplayer-icon .xgplayer-icon-large {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-volume-small .xgplayer-volume .xgplayer-icon .xgplayer-icon-small {\n  display: block; }\n\n.xgplayer-skin-default.xgplayer-volume-small .xgplayer-volume .xgplayer-icon .xgplayer-icon-muted {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-volume-muted .xgplayer-volume .xgplayer-icon .xgplayer-icon-large {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-volume-muted .xgplayer-volume .xgplayer-icon .xgplayer-icon-small {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-volume-muted .xgplayer-volume .xgplayer-icon .xgplayer-icon-muted {\n  display: block; }\n\n.xgplayer-skin-default.xgplayer-mobile .xgplayer-volume .xgplayer-slider {\n  display: none; }\n\n.xgplayer-skin-default .xgplayer-definition {\n  -webkit-order: 5;\n     -moz-box-ordinal-group: 6;\n          order: 5;\n  width: 60px;\n  height: 150px;\n  z-index: 18;\n  position: relative;\n  outline: none;\n  display: none;\n  cursor: default;\n  margin-left: 10px;\n  margin-top: -119px; }\n  .xgplayer-skin-default .xgplayer-definition ul {\n    display: none;\n    list-style: none;\n    width: 78px;\n    background: rgba(0, 0, 0, .54);\n    border-radius: 1px;\n    position: absolute;\n    bottom: 30px;\n    left: 0;\n    text-align: center;\n    white-space: nowrap;\n    margin-left: -10px;\n    z-index: 26;\n    cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-definition ul li {\n      opacity: 0.7;\n      font-family: PingFangSC-Regular;\n      font-size: 11px;\n      color: rgba(255, 255, 255, .8);\n      padding: 6px 13px; }\n      .xgplayer-skin-default .xgplayer-definition ul li.selected {\n        color: #fff;\n        opacity: 1; }\n      .xgplayer-skin-default .xgplayer-definition ul li:hover {\n        color: #fff;\n        opacity: 1; }\n  .xgplayer-skin-default .xgplayer-definition .name {\n    text-align: center;\n    font-family: PingFangSC-Regular;\n    font-size: 13px;\n    line-height: 20px;\n    height: 20px;\n    cursor: pointer;\n    color: rgba(255, 255, 255, .8);\n    position: absolute;\n    bottom: 0;\n    width: 60px;\n    height: 20px;\n    line-height: 20px;\n    background: rgba(0, 0, 0, .38);\n    border-radius: 10px;\n    display: inline-block;\n    vertical-align: middle; }\n\n.xgplayer-skin-default.xgplayer-definition-active .xgplayer-definition ul {\n  display: block; }\n\n.xgplayer-skin-default.xgplayer-is-definition .xgplayer-definition {\n  display: block; }\n\n.xgplayer-skin-default .xgplayer-time {\n  -webkit-order: 2;\n     -moz-box-ordinal-group: 3;\n          order: 2;\n  font-family: ArialMT;\n  font-size: 13px;\n  color: #fff;\n  line-height: 40px;\n  text-align: center;\n  display: inline-block; }\n  .xgplayer-skin-default .xgplayer-time span::after {\n    content: \"/\";\n    display: inline-block;\n    padding: 0 3px; }\n  .xgplayer-skin-default .xgplayer-time em {\n    color: rgba(255, 255, 255, .5); }\n\n.xgplayer-skin-default .xgplayer-controls {\n  display: -webkit-flex;\n  display: -moz-box;\n  display: flex;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 40px;\n  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .37), rgba(0, 0, 0, .75), rgba(0, 0, 0, .75));\n  z-index: 10; }\n\n.xgplayer-skin-default.xgplayer-nostart .xgplayer-controls {\n  display: none; }\n\n.xgplayer-skin-default.no-controls .xgplayer-controls {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-inactive .xgplayer-controls {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-is-live .xgplayer-controls > * {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-is-live .xgplayer-controls .xgplayer-play,\n.xgplayer-skin-default.xgplayer-is-live .xgplayer-controls .xgplayer-play-img,\n.xgplayer-skin-default.xgplayer-is-live .xgplayer-controls .xgplayer-placeholder,\n.xgplayer-skin-default.xgplayer-is-live .xgplayer-controls .xgplayer-volume,\n.xgplayer-skin-default.xgplayer-is-live .xgplayer-controls .xgplayer-live,\n.xgplayer-skin-default.xgplayer-is-live .xgplayer-controls .xgplayer-definition,\n.xgplayer-skin-default.xgplayer-is-live .xgplayer-controls .xgplayer-cssfullscreen,\n.xgplayer-skin-default.xgplayer-is-live .xgplayer-controls .xgplayer-fullscreen {\n  display: block; }\n\n.xgplayer-skin-default .xgplayer-live {\n  display: block;\n  font-size: 12px;\n  color: #fff;\n  line-height: 40px;\n  -webkit-order: 1;\n     -moz-box-ordinal-group: 2;\n          order: 1; }\n\n.xgplayer-skin-default .xgplayer-loading {\n  display: none;\n  width: 100px;\n  height: 100px;\n  overflow: hidden;\n  -webkit-transform: scale(0.7);\n      -ms-transform: scale(0.7);\n          transform: scale(0.7);\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  margin: -70px auto auto -50px; }\n  .xgplayer-skin-default .xgplayer-loading svg {\n    border-radius: 50%;\n    -webkit-transform-origin: center;\n        -ms-transform-origin: center;\n            transform-origin: center;\n    -webkit-animation: loadingRotate 1s linear infinite;\n            animation: loadingRotate 1s linear infinite; }\n    .xgplayer-skin-default .xgplayer-loading svg path {\n      stroke: #ddd;\n      stroke-dasharray: 236;\n      -webkit-animation: loadingDashOffset 2s linear infinite;\n              animation: loadingDashOffset 2s linear infinite;\n      animation-direction: alternate-reverse;\n      fill: none;\n      stroke-width: 12px; }\n\n.xgplayer-skin-default.xgplayer-nostart .xgplayer-loading {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-isloading .xgplayer-loading {\n  display: block; }\n\n.xgplayer-skin-default.xgplayer-ended .xgplayer-loading {\n  display: none; }\n\n.xgplayer-skin-default .xgplayer-progress {\n  display: block;\n  position: absolute;\n  height: 20px;\n  line-height: 20px;\n  left: 12px;\n  right: 12px;\n  outline: none;\n  top: -10px;\n  z-index: 35; }\n\n.xgplayer-skin-default .xgplayer-progress-outer {\n  background: rgba(255, 255, 255, .3);\n  display: block;\n  height: 3px;\n  line-height: 3px;\n  margin-top: 8.5px;\n  width: 100%;\n  position: relative;\n  cursor: pointer; }\n\n.xgplayer-skin-default .xgplayer-progress-cache, .xgplayer-skin-default .xgplayer-progress-played {\n  display: block;\n  height: 100%;\n  line-height: 1;\n  position: absolute;\n  left: 0;\n  top: 0; }\n\n.xgplayer-skin-default .xgplayer-progress-cache {\n  width: 0;\n  background: rgba(255, 255, 255, .5); }\n\n.xgplayer-skin-default .xgplayer-progress-played {\n  display: block;\n  width: 0;\n  background-image: linear-gradient(-90deg, #FA1F41 0%, #E31106 100%);\n  border-radius: 0 1.5px 1.5px 0; }\n\n.xgplayer-skin-default .xgplayer-progress-btn {\n  display: none;\n  position: absolute;\n  left: 0px;\n  top: -5px;\n  width: 13px;\n  height: 13px;\n  border-radius: 30px;\n  background: #FFFFFF;\n  box-shadow: 0 0 2px 0 rgba(0, 0, 0, .26);\n  left: 100%;\n  -webkit-transform: translate(-50%, 0);\n      -ms-transform: translate(-50%, 0);\n          transform: translate(-50%, 0); }\n\n.xgplayer-skin-default .xgplayer-progress-point {\n  position: absolute; }\n  .xgplayer-skin-default .xgplayer-progress-point.xgplayer-tips {\n    margin-left: 0;\n    top: -25px;\n    display: none;\n    z-index: 100; }\n\n.xgplayer-skin-default .xgplayer-progress-dot {\n  display: inline-block;\n  position: absolute;\n  height: 3px;\n  width: 5px;\n  top: 0px;\n  background: white;\n  border-radius: 6px;\n  z-index: 16; }\n  .xgplayer-skin-default .xgplayer-progress-dot .xgplayer-progress-tip {\n    position: absolute;\n    left: 0;\n    top: -40px;\n    height: auto;\n    line-height: 30px;\n    width: auto;\n    -webkit-transform: scale(0.8);\n        -ms-transform: scale(0.8);\n            transform: scale(0.8);\n    background: rgba(0, 0, 0, .3);\n    border-radius: 6px;\n    border: 1px solid rgba(0, 0, 0, .8);\n    cursor: default;\n    white-space: nowrap;\n    display: none; }\n\n.xgplayer-skin-default .xgplayer-progress-dot-show .xgplayer-progress-tip {\n  display: block; }\n\n.xgplayer-skin-default .xgplayer-progress-thumbnail {\n  position: absolute;\n  -moz-box-sizing: border-box;\n       box-sizing: border-box; }\n  .xgplayer-skin-default .xgplayer-progress-thumbnail.xgplayer-tips {\n    margin-left: 0;\n    display: none;\n    z-index: 99; }\n\n.xgplayer-skin-default .xgplayer-progress:hover .xgplayer-progress-outer, .xgplayer-skin-default .xgplayer-progress:focus .xgplayer-progress-outer {\n  height: 6px;\n  margin-top: 7px; }\n\n.xgplayer-skin-default .xgplayer-progress:hover .xgplayer-progress-dot, .xgplayer-skin-default .xgplayer-progress:focus .xgplayer-progress-dot {\n  height: 6px; }\n\n.xgplayer-skin-default .xgplayer-progress:hover .xgplayer-progress-btn, .xgplayer-skin-default .xgplayer-progress:focus .xgplayer-progress-btn {\n  display: block;\n  top: -3px; }\n\n.xgplayer-skin-default.xgplayer-volume-active .xgplayer-progress {\n  z-index: 15; }\n\n.xgplayer-skin-default.xgplayer-definition-active .xgplayer-progress {\n  z-index: 15; }\n\n.xgplayer-skin-default.xgplayer-texttrack-active .xgplayer-progress {\n  z-index: 15; }\n\n.xgplayer-skin-default.xgplayer-playbackrate-active .xgplayer-progress {\n  z-index: 15; }\n\n.xgplayer-skin-default.xgplayer-mobile .xgplayer-progress-btn {\n  display: block !important; }\n\n.xgplayer-skin-default.xgplayer-mobile .xgplayer-progress:hover .xgplayer-progress-outer, .xgplayer-skin-default.xgplayer-mobile .xgplayer-progress:focus .xgplayer-progress-outer {\n  height: 3px !important;\n  margin-top: 8.5px !important; }\n\n.xgplayer-skin-default.xgplayer-mobile .xgplayer-progress:hover .xgplayer-progress-btn, .xgplayer-skin-default.xgplayer-mobile .xgplayer-progress:focus .xgplayer-progress-btn {\n  display: block !important;\n  top: -5px !important; }\n\n.xgplayer-skin-default .xgplayer-replay {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 105;\n  display: none;\n  -webkit-justify-content: center;\n     -moz-box-pack: center;\n          justify-content: center;\n  -webkit-align-items: center;\n     -moz-box-align: center;\n          align-items: center;\n  background: rgba(0, 0, 0, .54);\n  -webkit-flex-direction: column;\n     -moz-box-orient: vertical;\n     -moz-box-direction: normal;\n          flex-direction: column; }\n  .xgplayer-skin-default .xgplayer-replay svg {\n    background: rgba(0, 0, 0, .58);\n    border-radius: 100%;\n    cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-replay svg path {\n      -webkit-transform: translate(20px, 21px);\n          -ms-transform: translate(20px, 21px);\n              transform: translate(20px, 21px);\n      fill: #ddd; }\n    .xgplayer-skin-default .xgplayer-replay svg:hover {\n      background: rgba(0, 0, 0, .38); }\n      .xgplayer-skin-default .xgplayer-replay svg:hover path {\n        fill: #fff; }\n  .xgplayer-skin-default .xgplayer-replay .xgplayer-replay-txt {\n    display: inline-block;\n    font-family: PingFangSC-Regular;\n    font-size: 14px;\n    color: #fff;\n    line-height: 34px; }\n\n.xgplayer-skin-default.xgplayer.xgplayer-ended .xgplayer-controls {\n  display: none; }\n\n.xgplayer-skin-default.xgplayer.xgplayer-ended .xgplayer-replay {\n  display: -webkit-flex;\n  display: -moz-box;\n  display: flex; }\n\n.xgplayer-skin-default .xgplayer-playbackrate {\n  -webkit-order: 8;\n     -moz-box-ordinal-group: 9;\n          order: 8;\n  width: 60px;\n  height: 20px;\n  z-index: 18;\n  position: relative;\n  display: inline-block;\n  cursor: default; }\n  .xgplayer-skin-default .xgplayer-playbackrate ul {\n    display: none;\n    list-style: none;\n    width: 78px;\n    background: rgba(0, 0, 0, .54);\n    border-radius: 1px;\n    position: absolute;\n    bottom: 20px;\n    left: 0px;\n    text-align: left;\n    white-space: nowrap;\n    z-index: 26;\n    cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-playbackrate ul li {\n      opacity: 0.7;\n      font-family: PingFangSC-Regular;\n      font-size: 11px;\n      color: rgba(255, 255, 255, .8);\n      position: relative;\n      padding: 4px 0 4px 0px;\n      text-align: center; }\n      .xgplayer-skin-default .xgplayer-playbackrate ul li.selected {\n        color: #fff;\n        opacity: 1; }\n      .xgplayer-skin-default .xgplayer-playbackrate ul li:hover {\n        color: #fff;\n        opacity: 1; }\n    .xgplayer-skin-default .xgplayer-playbackrate ul li:nth-child(1) {\n      position: relative;\n      margin-top: 12px; }\n    .xgplayer-skin-default .xgplayer-playbackrate ul li:last-child {\n      position: relative;\n      margin-bottom: 12px; }\n  .xgplayer-skin-default .xgplayer-playbackrate .name {\n    height: 20px;\n    position: relative;\n    top: 11px;\n    text-align: center;\n    background: rgba(0, 0, 0, .38);\n    color: rgba(255, 255, 255, .8);\n    border-radius: 10px;\n    line-height: 20px; }\n  .xgplayer-skin-default .xgplayer-playbackrate span {\n    position: relative;\n    top: 19px;\n    font-weight: bold;\n    text-shadow: 0 0 4px rgba(0, 0, 0, .6); }\n  .xgplayer-skin-default .xgplayer-playbackrate:hover {\n    opacity: 1; }\n\n.xgplayer-skin-default.xgplayer-playbackrate-active .xgplayer-playbackrate ul {\n  display: block; }\n\n.xgplayer-skin-default .xgplayer-download {\n  position: relative;\n  -webkit-order: 9;\n     -moz-box-ordinal-group: 10;\n          order: 9;\n  display: block;\n  cursor: pointer; }\n  .xgplayer-skin-default .xgplayer-download .xgplayer-icon {\n    margin-top: 3px; }\n    .xgplayer-skin-default .xgplayer-download .xgplayer-icon div {\n      position: absolute; }\n    .xgplayer-skin-default .xgplayer-download .xgplayer-icon svg {\n      position: relative;\n      top: 5px;\n      left: 5px; }\n  .xgplayer-skin-default .xgplayer-download .xgplayer-tips {\n    margin-left: -20px; }\n    .xgplayer-skin-default .xgplayer-download .xgplayer-tips .xgplayer-tip-download {\n      display: block; }\n  .xgplayer-skin-default .xgplayer-download:hover {\n    opacity: 0.85; }\n    .xgplayer-skin-default .xgplayer-download:hover .xgplayer-tips {\n      display: block; }\n\n.lang-is-en .xgplayer-download .xgplayer-tips {\n  margin-left: -32px; }\n\n.lang-is-jp .xgplayer-download .xgplayer-tips {\n  margin-left: -40px; }\n\n.xgplayer-skin-default .danmu-switch {\n  -webkit-order: 6;\n     -moz-box-ordinal-group: 7;\n          order: 6;\n  z-index: 26; }\n\n.xgplayer-skin-default .xgplayer-danmu {\n  display: none;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 100%;\n  overflow: hidden;\n  z-index: 9;\n  outline: none; }\n  .xgplayer-skin-default .xgplayer-danmu > * {\n    position: absolute;\n    white-space: nowrap;\n    z-index: 9; }\n\n.xgplayer-skin-default .xgplayer-danmu.xgplayer-has-danmu {\n  display: block; }\n\n.xgplayer-skin-default .xgplayer-panel {\n  outline: none;\n  -webkit-order: 7;\n     -moz-box-ordinal-group: 8;\n          order: 7;\n  width: 40px;\n  height: 40px;\n  display: inline-block;\n  position: relative;\n  font-family: PingFangSC-Regular;\n  font-size: 13px;\n  color: rgba(255, 255, 255, .8);\n  z-index: 36; }\n  .xgplayer-skin-default .xgplayer-panel .xgplayer-panel-icon {\n    cursor: pointer;\n    position: absolute;\n    margin-left: 5px;\n    top: 10px; }\n\n.xgplayer-skin-default .xgplayer-panel-active {\n  display: block !important;\n  bottom: 30px; }\n\n.xgplayer-skin-default .xgplayer-panel-slider {\n  z-index: 36;\n  display: none;\n  position: absolute;\n  width: 230px;\n  height: 230px;\n  background: rgba(0, 0, 0, .54);\n  border-radius: 1px;\n  padding: 10px 20px;\n  outline: none;\n  left: -115px;\n  bottom: 40px; }\n  .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-hidemode {\n    padding-bottom: 10px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-hidemode-radio li {\n      display: inline;\n      list-style: none;\n      cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-hidemode ul {\n      display: -webkit-flex;\n      display: -moz-box;\n      display: flex;\n      -webkit-justify-content: space-around;\n              justify-content: space-around; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-hidemode li {\n      margin: 0 12px;\n      font-size: 11px;\n      color: #aaa; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-hidemode-font {\n      margin-bottom: 10px; }\n  .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency {\n    display: block;\n    margin-top: 10px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-line {\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      cursor: pointer;\n      outline: none;\n      width: 150px;\n      height: 4px;\n      background: #aaa;\n      border-radius: 4px;\n      border-style: none;\n      margin-left: 10px;\n      margin-top: -2px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-line::-moz-focus-outer {\n      border: 0 !important; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-color::-webkit-slider-runnable-track {\n      outline: none;\n      width: 150px;\n      height: 4px;\n      border-radius: 4px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-color::-moz-range-track {\n      outline: none;\n      background-color: #aaa;\n      border-color: transparent;\n      cursor: pointer;\n      width: 150px;\n      height: 4px;\n      border-radius: 4px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-color::-ms-track {\n      outline: none;\n      background-color: #aaa;\n      color: transparent;\n      border-color: transparent;\n      width: 150px;\n      height: 4px;\n      border-radius: 4px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-bar::-webkit-slider-thumb {\n      outline: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      border: 6px solid #f85959;\n      height: 6px;\n      width: 6px;\n      margin-top: -4px;\n      border-radius: 6px;\n      cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-bar::-moz-range-thumb {\n      outline: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      border: 6px solid #f85959;\n      height: 0;\n      width: 0;\n      border-radius: 6px;\n      cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-bar::-ms-thumb {\n      outline: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      border: 6px solid #f85959;\n      height: 6px;\n      width: 6px;\n      border-radius: 6px;\n      cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-bar::-moz-range-progress {\n      outline: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      height: 4px;\n      border-radius: 4px;\n      background: linear-gradient(to right, #f85959, #f85959 100%, #aaa); }\n  .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea {\n    display: block;\n    margin-top: 8px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-name {\n      display: inline-block;\n      position: relative;\n      top: -10px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-control {\n      display: inline-block; }\n      .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-control-up {\n        width: 150px;\n        margin-left: 10px;\n        display: -moz-box;\n        display: -webkit-flex;\n        display: flex;\n        -webkit-justify-content: space-between;\n           -moz-box-pack: justify;\n                justify-content: space-between;\n        color: #aaa; }\n      .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-control-down {\n        position: relative;\n        top: -10px; }\n      .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-control-down-dots {\n        display: -webkit-flex;\n        display: -moz-box;\n        display: flex;\n        width: 150px;\n        margin-left: 10px;\n        -webkit-justify-content: space-between;\n           -moz-box-pack: justify;\n                justify-content: space-between; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-twoquarters {\n      margin-left: -6px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-threequarters {\n      margin-left: -6px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-full {\n      margin-right: 3px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-line {\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      cursor: pointer;\n      outline: none;\n      width: 150px;\n      height: 4px;\n      background: #aaa;\n      border-radius: 4px;\n      border-style: none;\n      margin-left: 10px;\n      margin-top: -2px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-line::-moz-focus-outer {\n      border: 0 !important; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-color::-webkit-slider-runnable-track {\n      outline: none;\n      width: 150px;\n      height: 4px;\n      border-radius: 4px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-color::-moz-range-track {\n      outline: none;\n      background-color: #aaa;\n      border-color: transparent;\n      cursor: pointer;\n      width: 150px;\n      height: 4px;\n      border-radius: 4px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-color::-ms-track {\n      outline: none;\n      background-color: #aaa;\n      color: transparent;\n      border-color: transparent;\n      width: 150px;\n      height: 4px;\n      border-radius: 4px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-bar::-webkit-slider-thumb {\n      outline: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      border: 6px solid #f85959;\n      height: 6px;\n      width: 6px;\n      margin-top: -4px;\n      border-radius: 6px;\n      cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-bar::-moz-range-thumb {\n      outline: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      border: 6px solid #f85959;\n      height: 0;\n      width: 0;\n      border-radius: 6px;\n      cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-bar::-ms-thumb {\n      outline: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      border: 6px solid #f85959;\n      height: 6px;\n      width: 6px;\n      border-radius: 6px;\n      cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-zero-dot {\n      width: 3px;\n      height: 3px;\n      border: 3px solid #aaa;\n      border-radius: 50%;\n      background-color: #aaa;\n      position: relative;\n      top: 16px;\n      z-index: -1; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-onequarters-dot {\n      width: 3px;\n      height: 3px;\n      border: 3px solid #aaa;\n      border-radius: 50%;\n      background-color: #aaa;\n      position: relative;\n      top: 16px;\n      z-index: -1; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-twoquarters-dot {\n      width: 3px;\n      height: 3px;\n      border: 3px solid #aaa;\n      border-radius: 50%;\n      background-color: #aaa;\n      position: relative;\n      top: 16px;\n      z-index: -1; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-threequarters-dot {\n      width: 3px;\n      height: 3px;\n      border: 3px solid #aaa;\n      border-radius: 50%;\n      background-color: #aaa;\n      position: relative;\n      top: 16px;\n      z-index: -1; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-full-dot {\n      width: 3px;\n      height: 3px;\n      border: 3px solid #aaa;\n      border-radius: 50%;\n      background-color: #aaa;\n      position: relative;\n      top: 16px;\n      z-index: -1; }\n  .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed {\n    display: block; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed-name {\n      display: inline-block;\n      position: relative;\n      top: -10px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed-control {\n      display: inline-block; }\n      .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed-control-up {\n        width: 150px;\n        margin-left: 10px;\n        display: -moz-box;\n        display: -webkit-flex;\n        display: flex;\n        -webkit-justify-content: space-between;\n           -moz-box-pack: justify;\n                justify-content: space-between;\n        color: #aaa; }\n      .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed-control-down {\n        position: relative;\n        top: -10px; }\n      .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed-control-down-dots {\n        display: -webkit-flex;\n        display: -moz-box;\n        display: flex;\n        width: 150px;\n        margin-left: 10px;\n        -webkit-justify-content: space-between;\n           -moz-box-pack: justify;\n                justify-content: space-between; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-line {\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      cursor: pointer;\n      outline: none;\n      width: 150px;\n      height: 4px;\n      background: #aaa;\n      border-radius: 4px;\n      border-style: none;\n      margin-left: 10px;\n      margin-top: -2px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-line::-moz-focus-outer {\n      border: 0 !important; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-color::-webkit-slider-runnable-track {\n      outline: none;\n      width: 150px;\n      height: 4px;\n      border-radius: 4px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-color::-moz-range-track {\n      outline: none;\n      background-color: #aaa;\n      border-color: transparent;\n      cursor: pointer;\n      width: 150px;\n      height: 4px;\n      border-radius: 4px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-color::-ms-track {\n      outline: none;\n      background-color: #aaa;\n      color: transparent;\n      border-color: transparent;\n      width: 150px;\n      height: 4px;\n      border-radius: 4px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-bar::-webkit-slider-thumb {\n      outline: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      border: 6px solid #f85959;\n      height: 6px;\n      width: 6px;\n      margin-top: -4px;\n      border-radius: 6px;\n      cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-bar::-moz-range-thumb {\n      outline: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      border: 6px solid #f85959;\n      height: 0;\n      width: 0;\n      border-radius: 6px;\n      cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-bar::-ms-thumb {\n      outline: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      border: 6px solid #f85959;\n      height: 6px;\n      width: 6px;\n      border-radius: 6px;\n      cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-small-dot {\n      width: 3px;\n      height: 3px;\n      border: 3px solid #aaa;\n      border-radius: 50%;\n      background-color: #aaa;\n      position: relative;\n      top: 16px;\n      z-index: -1; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-middle-dot {\n      width: 3px;\n      height: 3px;\n      border: 3px solid #aaa;\n      border-radius: 50%;\n      background-color: #aaa;\n      position: relative;\n      top: 16px;\n      z-index: -1; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-large-dot {\n      width: 3px;\n      height: 3px;\n      border: 3px solid #aaa;\n      border-radius: 50%;\n      background-color: #aaa;\n      position: relative;\n      top: 16px;\n      z-index: -1; }\n  .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont {\n    display: block; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont-name {\n      display: inline-block;\n      position: relative;\n      top: -10px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont-control {\n      display: inline-block; }\n      .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont-control-up {\n        width: 150px;\n        margin-left: 10px;\n        display: -moz-box;\n        display: -webkit-flex;\n        display: flex;\n        -webkit-justify-content: space-between;\n           -moz-box-pack: justify;\n                justify-content: space-between;\n        color: #aaa; }\n      .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont-control-down {\n        position: relative;\n        top: -10px; }\n      .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont-control-down-dots {\n        display: -webkit-flex;\n        display: -moz-box;\n        display: flex;\n        width: 150px;\n        margin-left: 10px;\n        -webkit-justify-content: space-between;\n           -moz-box-pack: justify;\n                justify-content: space-between; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-line {\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      cursor: pointer;\n      outline: none;\n      width: 150px;\n      height: 4px;\n      background: #aaa;\n      border-radius: 4px;\n      border-style: none;\n      margin-left: 10px;\n      margin-top: -2px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-line::-moz-focus-outer {\n      border: 0 !important; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-color::-webkit-slider-runnable-track {\n      outline: none;\n      width: 150px;\n      height: 4px;\n      border-radius: 4px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-color::-moz-range-track {\n      outline: none;\n      background-color: #aaa;\n      border-color: transparent;\n      cursor: pointer;\n      width: 150px;\n      height: 4px;\n      border-radius: 4px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-color::-ms-track {\n      outline: none;\n      background-color: #aaa;\n      color: transparent;\n      border-color: transparent;\n      width: 150px;\n      height: 4px;\n      border-radius: 4px; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-bar::-webkit-slider-thumb {\n      outline: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      border: 6px solid #f85959;\n      height: 6px;\n      width: 6px;\n      margin-top: -4px;\n      border-radius: 6px;\n      cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-bar::-moz-range-thumb {\n      outline: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      border: 6px solid #f85959;\n      height: 0;\n      width: 0;\n      border-radius: 6px;\n      cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-bar::-ms-thumb {\n      outline: none;\n      -webkit-appearance: none;\n      -moz-appearance: none;\n      appearance: none;\n      border: 6px solid #f85959;\n      height: 6px;\n      width: 6px;\n      border-radius: 6px;\n      cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-small-dot {\n      width: 3px;\n      height: 3px;\n      border: 3px solid #aaa;\n      border-radius: 50%;\n      background-color: #aaa;\n      position: relative;\n      top: 16px;\n      z-index: -1; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-middle-dot {\n      width: 3px;\n      height: 3px;\n      border: 3px solid #aaa;\n      border-radius: 50%;\n      background-color: #aaa;\n      position: relative;\n      top: 16px;\n      z-index: -1; }\n    .xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-large-dot {\n      width: 3px;\n      height: 3px;\n      border: 3px solid #aaa;\n      border-radius: 50%;\n      background-color: #aaa;\n      position: relative;\n      top: 16px;\n      z-index: -1; }\n\n.xgplayer-skin-default .xgplayer-playnext {\n  position: relative;\n  -webkit-order: 1;\n     -moz-box-ordinal-group: 2;\n          order: 1;\n  display: block;\n  cursor: pointer;\n  top: -2px; }\n  .xgplayer-skin-default .xgplayer-playnext .xgplayer-icon div {\n    position: absolute; }\n  .xgplayer-skin-default .xgplayer-playnext .xgplayer-tips .xgplayer-tip-playnext {\n    display: block; }\n  .xgplayer-skin-default .xgplayer-playnext:hover {\n    opacity: 0.85; }\n    .xgplayer-skin-default .xgplayer-playnext:hover .xgplayer-tips {\n      display: block; }\n\n.lang-is-en .xgplayer-playnext .xgplayer-tips {\n  margin-left: -25px; }\n\n.lang-is-jp .xgplayer-playnext .xgplayer-tips {\n  margin-left: -38px; }\n\n.xgplayer-skin-default .xgplayer-pip {\n  -webkit-order: 9;\n     -moz-box-ordinal-group: 10;\n          order: 9;\n  position: relative;\n  outline: none;\n  display: block;\n  cursor: pointer;\n  height: 20px;\n  top: 8px; }\n  .xgplayer-skin-default .xgplayer-pip .name {\n    text-align: center;\n    font-family: PingFangSC-Regular;\n    font-size: 13px;\n    line-height: 20px;\n    height: 20px;\n    color: rgba(255, 255, 255, .8); }\n    .xgplayer-skin-default .xgplayer-pip .name span {\n      width: 60px;\n      height: 20px;\n      line-height: 20px;\n      background: rgba(0, 0, 0, .38);\n      border-radius: 10px;\n      display: inline-block;\n      vertical-align: middle; }\n\n.xgplayer-skin-default .xgplayer-pip-lay {\n  position: absolute;\n  top: 26px;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 130;\n  cursor: pointer;\n  background-color: transparent;\n  display: none; }\n  .xgplayer-skin-default .xgplayer-pip-lay div {\n    width: 100%;\n    height: 100%; }\n\n.xgplayer-skin-default .xgplayer-pip-drag {\n  cursor: move;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 26px;\n  line-height: 26px;\n  background-image: linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, 0));\n  z-index: 130;\n  display: none; }\n\n.xgplayer-skin-default.xgplayer-pip-active {\n  position: fixed;\n  right: 0;\n  bottom: 200px;\n  width: 320px !important;\n  height: 180px !important;\n  z-index: 110 !important; }\n  .xgplayer-skin-default.xgplayer-pip-active .xgplayer-controls {\n    display: none; }\n  .xgplayer-skin-default.xgplayer-pip-active .xgplayer-danmu {\n    display: none; }\n  .xgplayer-skin-default.xgplayer-pip-active .xgplayer-pip-lay {\n    display: block; }\n\n.xgplayer-skin-default.xgplayer-pip-active .xgplayer-pip-drag {\n  display: -webkit-flex;\n  display: -moz-box;\n  display: flex; }\n\n.xgplayer-skin-default.xgplayer-inactive .xgplayer-pip-drag {\n  display: none; }\n\n.lang-is-jp .xgplayer-pip .name span {\n  width: 70px;\n  height: 20px; }\n\n.xgplayer-skin-default .xgplayer-rotate {\n  position: relative;\n  -webkit-order: 10;\n     -moz-box-ordinal-group: 11;\n          order: 10;\n  display: block;\n  cursor: pointer; }\n  .xgplayer-skin-default .xgplayer-rotate .xgplayer-icon {\n    margin-top: 7px;\n    width: 26px; }\n    .xgplayer-skin-default .xgplayer-rotate .xgplayer-icon div {\n      position: absolute; }\n  .xgplayer-skin-default .xgplayer-rotate .xgplayer-tips {\n    margin-left: -22px; }\n    .xgplayer-skin-default .xgplayer-rotate .xgplayer-tips .xgplayer-tip-rotate {\n      display: block; }\n  .xgplayer-skin-default .xgplayer-rotate:hover {\n    opacity: 0.85; }\n    .xgplayer-skin-default .xgplayer-rotate:hover .xgplayer-tips {\n      display: block; }\n\n.lang-is-en .xgplayer-rotate .xgplayer-tips {\n  margin-left: -26px; }\n\n.lang-is-jp .xgplayer-rotate .xgplayer-tips {\n  margin-left: -38px; }\n\n.xgplayer-skin-default .xgplayer-screenshot {\n  -webkit-order: 11;\n     -moz-box-ordinal-group: 12;\n          order: 11;\n  position: relative;\n  outline: none;\n  display: block;\n  cursor: pointer;\n  height: 20px;\n  top: 8px; }\n  .xgplayer-skin-default .xgplayer-screenshot .name {\n    text-align: center;\n    font-family: PingFangSC-Regular;\n    font-size: 13px;\n    line-height: 20px;\n    height: 20px;\n    color: rgba(255, 255, 255, .8); }\n    .xgplayer-skin-default .xgplayer-screenshot .name span {\n      width: 60px;\n      height: 20px;\n      line-height: 20px;\n      background: rgba(0, 0, 0, .38);\n      border-radius: 10px;\n      display: inline-block;\n      vertical-align: middle; }\n\n.lang-is-en .xgplayer-screenshot .name span, .lang-is-jp .xgplayer-screenshot .name span {\n  width: 75px;\n  height: 20px; }\n\n.xgplayer-skin-default .xgplayer-texttrack {\n  -webkit-order: 7;\n     -moz-box-ordinal-group: 8;\n          order: 7;\n  width: 60px;\n  height: 150px;\n  z-index: 18;\n  position: relative;\n  outline: none;\n  display: none;\n  cursor: default;\n  margin-top: -119px; }\n  .xgplayer-skin-default .xgplayer-texttrack ul {\n    display: none;\n    list-style: none;\n    width: 78px;\n    background: rgba(0, 0, 0, .54);\n    border-radius: 1px;\n    position: absolute;\n    bottom: 30px;\n    left: 0;\n    text-align: center;\n    white-space: nowrap;\n    margin-left: -10px;\n    z-index: 26;\n    cursor: pointer; }\n    .xgplayer-skin-default .xgplayer-texttrack ul li {\n      opacity: 0.7;\n      font-family: PingFangSC-Regular;\n      font-size: 11px;\n      color: rgba(255, 255, 255, .8);\n      padding: 6px 13px; }\n      .xgplayer-skin-default .xgplayer-texttrack ul li.selected {\n        color: #fff;\n        opacity: 1; }\n      .xgplayer-skin-default .xgplayer-texttrack ul li:hover {\n        color: #fff;\n        opacity: 1; }\n  .xgplayer-skin-default .xgplayer-texttrack .name {\n    text-align: center;\n    font-family: PingFangSC-Regular;\n    font-size: 13px;\n    line-height: 20px;\n    height: 20px;\n    cursor: pointer;\n    color: rgba(255, 255, 255, .8);\n    position: absolute;\n    bottom: 0;\n    width: 60px;\n    height: 20px;\n    line-height: 20px;\n    background: rgba(0, 0, 0, .38);\n    border-radius: 10px;\n    display: inline-block;\n    vertical-align: middle; }\n\n.xgplayer-skin-default.xgplayer-texttrack-active .xgplayer-texttrack ul {\n  display: block; }\n\n.xgplayer-skin-default.xgplayer-is-texttrack .xgplayer-texttrack {\n  display: block; }\n\n.xgplayer-skin-default .xgplayer-icon {\n  display: block;\n  width: 40px;\n  height: 40px;\n  overflow: hidden;\n  fill: #fff; }\n\n.xgplayer-skin-default .xgplayer-tips {\n  background: rgba(0, 0, 0, .54);\n  border-radius: 1px;\n  display: none;\n  position: absolute;\n  font-family: PingFangSC-Regular;\n  font-size: 11px;\n  color: #fff;\n  padding: 2px 4px;\n  text-align: center;\n  top: -30px;\n  left: 50%;\n  margin-left: -16px;\n  width: auto;\n  white-space: nowrap; }\n\n.xgplayer-skin-default.xgplayer-mobile .xgplayer-tips {\n  display: none !important; }\n\n.xgplayer-skin-default .xgplayer-error {\n  background: #000;\n  display: none;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 125;\n  font-family: PingFangSC-Regular;\n  font-size: 14px;\n  color: #fff;\n  text-align: center;\n  line-height: 100%;\n  -webkit-justify-content: center;\n     -moz-box-pack: center;\n          justify-content: center;\n  -webkit-align-items: center;\n     -moz-box-align: center;\n          align-items: center; }\n  .xgplayer-skin-default .xgplayer-error .xgplayer-error-refresh {\n    color: #FA1F41;\n    padding: 0 3px;\n    cursor: pointer; }\n  .xgplayer-skin-default .xgplayer-error .xgplayer-error-text {\n    line-height: 18px;\n    margin: auto 6px; }\n\n.xgplayer-skin-default.xgplayer-is-error .xgplayer-error {\n  display: -webkit-flex;\n  display: -moz-box;\n  display: flex; }\n\n.xgplayer-skin-default .xgplayer-memoryplay-spot {\n  position: absolute;\n  height: 32px;\n  left: 10px;\n  bottom: 46px;\n  background: rgba(0, 0, 0, .5);\n  border-radius: 32px;\n  line-height: 32px;\n  color: #ddd;\n  z-index: 15;\n  padding: 0 32px 0 16px; }\n  .xgplayer-skin-default .xgplayer-memoryplay-spot .xgplayer-lasttime {\n    color: red;\n    font-weight: bold; }\n  .xgplayer-skin-default .xgplayer-memoryplay-spot .btn-close {\n    position: absolute;\n    width: 16px;\n    height: 16px;\n    right: 10px;\n    top: 2px;\n    cursor: pointer;\n    color: #fff;\n    font-size: 16px; }\n";
	styleInject(css);

	var s_enter = function s_enter() {
	  var player = this;
	  var root = player.root;
	  var util = Player.util;

	  var barStr = '';
	  for (var i = 1; i <= 12; i++) {
	    barStr += '<div class="xgplayer-enter-bar' + i + '"></div>';
	  }
	  var enter = util.createDom('xg-enter', '<div class="xgplayer-enter-spinner">\n                                                  ' + barStr + '\n                                                </div>', {}, 'xgplayer-enter');
	  root.appendChild(enter);
	};

	Player.install('s_enter', s_enter);

	var PlayIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\">\n  <path transform=\"scale(0.0320625 0.0320625)\" d=\"M576,363L810,512L576,661zM342,214L576,363L576,661L342,810z\"></path>\n</svg>\n";

	var PauseIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\">\n  <path transform=\"scale(0.0320625 0.0320625)\" d=\"M598,214h170v596h-170v-596zM256 810v-596h170v596h-170z\"></path>\n</svg>\n";

	var s_play = function s_play() {
	  var player = this;
	  var util = Player.util;
	  var playBtn = player.config.playBtn ? player.config.playBtn : {};
	  var btn = void 0;
	  if (playBtn.type === 'img') {
	    btn = util.createImgBtn('play', playBtn.url.play, playBtn.width, playBtn.height);
	  } else {
	    btn = util.createDom('xg-play', '<xg-icon class="xgplayer-icon">\n                                      <div class="xgplayer-icon-play">' + PlayIcon + '</div>\n                                      <div class="xgplayer-icon-pause">' + PauseIcon + '</div>\n                                     </xg-icon>', {}, 'xgplayer-play');
	  }

	  var tipsText = {};
	  tipsText.play = player.lang.PLAY_TIPS;
	  tipsText.pause = player.lang.PAUSE_TIPS;
	  var tips = util.createDom('xg-tips', '<span class="xgplayer-tip-play">' + tipsText.play + '</span>\n                                        <span class="xgplayer-tip-pause">' + tipsText.pause + '</span>', {}, 'xgplayer-tips');
	  btn.appendChild(tips);
	  player.once('ready', function () {
	    player.controls.appendChild(btn);
	  });

	  ['click', 'touchend'].forEach(function (item) {
	    btn.addEventListener(item, function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      player.emit('playBtnClick');
	    });
	  });
	};

	Player.install('s_play', s_play);

	var StartPlayIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"70\" height=\"70\" viewBox=\"0 0 70 70\">\n  <path transform=\"scale(0.04,0.04)\" d=\"M576,363L810,512L576,661zM342,214L576,363L576,661L342,810z\"></path>\n</svg>\n";

	var StartPauseIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"70\" height=\"70\" viewBox=\"0 0 70 70\">\n  <path transform=\"scale(0.04 0.04)\" d=\"M598,214h170v596h-170v-596zM256 810v-596h170v596h-170z\"></path>\n</svg>\n";

	var s_start = function s_start() {
	  var player = this;
	  var root = player.root;
	  var util = Player.util;
	  var btn = util.createDom('xg-start', '<div class="xgplayer-icon-play">' + StartPlayIcon + '</div>\n                                      <div class="xgplayer-icon-pause">' + StartPauseIcon + '</div>', {}, 'xgplayer-start');
	  function onPlayerReady(player) {
	    util.addClass(player.root, 'xgplayer-skin-default');
	    if (player.config) {
	      if (player.config.lang && player.config.lang === 'en') {
	        util.addClass(player.root, 'lang-is-en');
	      } else if (player.config.lang === 'jp') {
	        util.addClass(player.root, 'lang-is-jp');
	      }
	    }
	  }

	  if (player.isReady) {
	    root.appendChild(btn);
	    onPlayerReady(player);
	  } else {
	    player.once('ready', function () {
	      root.appendChild(btn);
	      onPlayerReady(player);
	    });
	  }

	  btn.onclick = function (e) {
	    e.preventDefault();
	    e.stopPropagation();
	    player.emit('startBtnClick');
	  };
	};

	Player.install('s_start', s_start);

	var s_poster = function s_poster() {
	  var player = this;
	  var root = player.root;
	  var util = Player.util;
	  if (!player.config.poster) {
	    return;
	  }
	  var poster = util.createDom('xg-poster', '', {}, 'xgplayer-poster');
	  poster.style.backgroundImage = 'url(' + player.config.poster + ')';
	  root.appendChild(poster);
	};

	Player.install('s_poster', s_poster);

	var s_flex = function s_flex() {
	  var player = this;
	  var root = player.root;
	  var util = Player.util;
	  var playceholder = util.createDom('xg-placeholder', '', {}, 'xgplayer-placeholder');
	  player.controls.appendChild(playceholder);
	};

	Player.install('s_flex', s_flex);

	var RequestFullIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\">\n  <path transform=\"scale(0.0320625 0.0320625)\" d=\"M598 214h212v212h-84v-128h-128v-84zM726 726v-128h84v212h-212v-84h128zM214 426v-212h212v84h-128v128h-84zM298 598v128h128v84h-212v-212h84z\"></path>\n</svg>\n";

	var ExitFullIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\">\n  <path transform=\"scale(0.0320625 0.0320625)\" d=\"M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z\"></path>\n</svg>\n";

	var s_fullscreen = function s_fullscreen() {
	  var player = this;
	  var util = Player.util;
	  var fullscreenBtn = player.config.fullscreenBtn ? player.config.fullscreenBtn : {};
	  var btn = void 0;
	  if (fullscreenBtn.type === 'img') {
	    btn = util.createImgBtn('fullscreen', fullscreenBtn.url.request, fullscreenBtn.width, fullscreenBtn.height);
	  } else {
	    btn = util.createDom('xg-fullscreen', '<xg-icon class="xgplayer-icon">\n                                             <div class="xgplayer-icon-requestfull">' + RequestFullIcon + '</div>\n                                             <div class="xgplayer-icon-exitfull">' + ExitFullIcon + '</div>\n                                           </xg-icon>', {}, 'xgplayer-fullscreen');
	  }

	  var tipsText = {};
	  tipsText.requestfull = player.lang.FULLSCREEN_TIPS;
	  tipsText.exitfull = player.lang.EXITFULLSCREEN_TIPS;
	  var tips = util.createDom('xg-tips', '<span class="xgplayer-tip-requestfull">' + tipsText.requestfull + '</span>\n                                        <span class="xgplayer-tip-exitfull">' + tipsText.exitfull + '</span>', {}, 'xgplayer-tips');
	  btn.appendChild(tips);
	  player.once('ready', function () {
	    player.controls.appendChild(btn);
	  });

	  ['click', 'touchend'].forEach(function (item) {
	    btn.addEventListener(item, function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      player.emit('fullscreenBtnClick');
	    });
	  });
	};

	Player.install('s_fullscreen', s_fullscreen);

	var RequestCssFullIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\">\n  <path transform=\"scale(0.028 0.028)\" d=\"M843.617212 67.898413 175.411567 67.898413c-61.502749 0-111.367437 49.856501-111.367437 111.367437l0 668.205645c0 61.510936 49.864688 111.367437 111.367437 111.367437L843.617212 958.838931c61.510936 0 111.367437-49.856501 111.367437-111.367437L954.984648 179.26585C954.984648 117.754914 905.12917 67.898413 843.617212 67.898413zM398.146441 736.104057c15.380292 0 27.842115 12.461823 27.842115 27.842115 0 15.379269-12.461823 27.841092-27.842115 27.841092L259.725858 791.787264c-7.785314 0-14.781658-3.217275-19.838837-8.365528-5.383614-4.577249-8.791224-11.228739-8.791224-19.475564L231.095797 624.736621c0-15.371082 12.471033-27.842115 27.842115-27.842115 15.380292 0 27.842115 12.471033 27.842115 27.842115l-0.61603 71.426773 133.036969-133.037992 39.378869 39.378869L324.962651 736.113267 398.146441 736.104057zM419.199942 463.611943 286.162974 330.565764l0.61603 71.435982c0 15.380292-12.461823 27.842115-27.842115 27.842115-15.371082 0-27.842115-12.461823-27.842115-27.842115L231.094774 262.791172c0-8.256034 3.40761-14.908548 8.791224-19.476587 5.057179-5.148253 12.053524-8.374738 19.838837-8.374738l138.420583 0.00921c15.380292 0 27.842115 12.461823 27.842115 27.842115s-12.461823 27.842115-27.842115 27.842115l-73.175603-0.00921 133.607974 133.607974L419.199942 463.611943zM787.932981 763.946172c0 8.247848-3.40761 14.899338-8.791224 19.475564-5.057179 5.148253-12.053524 8.365528-19.839861 8.365528L620.881314 791.787264c-15.379269 0-27.841092-12.461823-27.841092-27.841092 0-15.380292 12.461823-27.842115 27.841092-27.842115l73.185836 0.00921L560.449967 602.50427l39.378869-39.378869L732.875015 696.163393l-0.62524-71.426773c0-15.371082 12.462846-27.842115 27.842115-27.842115 15.380292 0 27.842115 12.471033 27.842115 27.842115L787.934005 763.946172zM787.932981 402.000724c0 15.380292-12.461823 27.842115-27.842115 27.842115-15.379269 0-27.842115-12.461823-27.842115-27.842115l0.62524-71.435982L599.828836 463.611943l-39.378869-39.378869 133.617184-133.607974-73.185836 0.00921c-15.379269 0-27.841092-12.461823-27.841092-27.842115s12.461823-27.842115 27.841092-27.842115l138.421606-0.00921c7.785314 0 14.781658 3.226484 19.839861 8.374738 5.383614 4.568039 8.791224 11.219529 8.791224 19.476587L787.934005 402.000724z\"></path>\n</svg>\n";

	var ExitCssFullIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\">\n  <path transform=\"scale(0.028 0.028)\" d=\"M834.56 81.92H189.44c-59.392 0-107.52 48.128-107.52 107.52v645.12c0 59.392 48.128 107.52 107.52 107.52h645.12c59.392 0 107.52-48.128 107.52-107.52V189.44c0-59.392-48.128-107.52-107.52-107.52zM458.24 727.04c0 14.848-12.288 26.624-26.624 26.624S404.48 741.888 404.48 727.04v-69.632L289.28 773.12c-10.752 10.24-27.648 10.24-37.888 0-10.24-10.752-10.24-27.648 0-37.888L366.592 619.52H296.96c-14.848 0-26.624-12.288-26.624-26.624s12.288-26.624 26.624-26.624h134.144c14.848 0 26.624 12.288 26.624 26.624V727.04z m0-295.936c0 14.848-12.288 26.624-26.624 26.624H296.96c-14.848 0-26.624-12.288-26.624-26.624S282.112 404.48 296.96 404.48h69.632L251.392 289.28c-10.24-10.752-10.24-27.648 0-37.888 5.12-5.12 12.288-7.68 18.944-7.68 6.656 0 13.824 2.56 18.944 7.68L404.48 366.592V296.96c0-14.848 12.288-26.624 26.624-26.624s26.624 12.288 26.624 26.624v134.144zM773.12 773.12c-10.752 10.24-27.648 10.24-37.888 0L619.52 657.408V727.04c0 14.848-12.288 26.624-26.624 26.624s-26.624-11.776-26.624-26.624v-134.144c0-14.848 12.288-26.624 26.624-26.624H727.04c14.848 0 26.624 12.288 26.624 26.624s-12.288 26.624-26.624 26.624h-69.632l115.2 115.2c10.752 10.752 10.752 27.648 0.512 38.4z m0-483.84L657.408 404.48H727.04c14.848 0 26.624 12.288 26.624 26.624 0 14.848-12.288 26.624-26.624 26.624h-134.144c-14.848 0-26.624-12.288-26.624-26.624V296.96c0-14.848 12.288-26.624 26.624-26.624s26.624 12.288 26.624 26.624v69.632L734.72 250.88c5.12-5.12 12.288-7.68 18.944-7.68s13.824 2.56 18.944 7.68c10.752 10.752 10.752 27.648 0.512 38.4z\"></path>\n</svg>\n";

	var s_cssFullscreen = function s_cssFullscreen() {
	  var player = this;
	  var util = Player.util;
	  if (!player.config.cssFullscreen) {
	    return;
	  }
	  var btn = util.createDom('xg-cssfullscreen', '<xg-icon class="xgplayer-icon">\n                                             <div class="xgplayer-icon-requestfull">' + RequestCssFullIcon + '</div>\n                                             <div class="xgplayer-icon-exitfull">' + ExitCssFullIcon + '</div>\n                                           </xg-icon>', {}, 'xgplayer-cssfullscreen');

	  var tipsText = {};
	  tipsText.requestfull = player.lang.CSSFULLSCREEN_TIPS;
	  tipsText.exitfull = player.lang.EXITCSSFULLSCREEN_TIPS;
	  var tips = util.createDom('xg-tips', '<span class="xgplayer-tip-requestfull">' + tipsText.requestfull + '</span>\n                                        <span class="xgplayer-tip-exitfull">' + tipsText.exitfull + '</span>', {}, 'xgplayer-tips');
	  btn.appendChild(tips);
	  player.once('ready', function () {
	    player.controls.appendChild(btn);
	  });

	  ['click', 'touchend'].forEach(function (item) {
	    btn.addEventListener(item, function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      player.emit('cssFullscreenBtnClick');
	    });
	  });
	};

	Player.install('s_cssFullscreen', s_cssFullscreen);

	var MutedIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"28\" viewBox=\"0 0 28 28\">\n  <path transform=\"scale(0.0220625 0.0220625)\" d=\"M358.4 358.4h-204.8v307.2h204.8l256 256v-819.2l-256 256z\"></path>\n  <path transform=\"scale(0.0220625 0.0220625)\" d=\"M920.4 439.808l-108.544-109.056-72.704 72.704 109.568 108.544-109.056 108.544 72.704 72.704 108.032-109.568 108.544 109.056 72.704-72.704-109.568-108.032 109.056-108.544-72.704-72.704-108.032 109.568z\"></path>\n</svg>\n";

	var SmallIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"28\" viewBox=\"0 0 28 28\">\n  <path transform=\"scale(0.0220625 0.0220625)\" d=\"M358.4 358.4h-204.8v307.2h204.8l256 256v-819.2l-256 256z\"></path>\n  <path transform=\"scale(0.0220625 0.0220625)\" d=\"M795.648 693.248l-72.704-72.704c27.756-27.789 44.921-66.162 44.921-108.544s-17.165-80.755-44.922-108.546l0.002 0.002 72.704-72.704c46.713 46.235 75.639 110.363 75.639 181.248s-28.926 135.013-75.617 181.227l-0.021 0.021zM795.648 693.248l-72.704-72.704c27.756-27.789 44.921-66.162 44.921-108.544s-17.165-80.755-44.922-108.546l0.002 0.002 72.704-72.704c46.713 46.235 75.639 110.363 75.639 181.248s-28.926 135.013-75.617 181.227l-0.021 0.021z\"></path>\n</svg>\n";

	var LargeIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"28\" viewBox=\"0 0 28 28\">\n  <path transform=\"scale(0.0220625 0.0220625)\" d=\"M358.4 358.4h-204.8v307.2h204.8l256 256v-819.2l-256 256z\"></path>\n  <path transform=\"scale(0.0220625 0.0220625)\" d=\"M940.632 837.632l-72.192-72.192c65.114-64.745 105.412-154.386 105.412-253.44s-40.299-188.695-105.396-253.424l-0.016-0.016 72.192-72.192c83.639 83.197 135.401 198.37 135.401 325.632s-51.762 242.434-135.381 325.612l-0.020 0.020zM795.648 693.248l-72.704-72.704c27.756-27.789 44.921-66.162 44.921-108.544s-17.165-80.755-44.922-108.546l0.002 0.002 72.704-72.704c46.713 46.235 75.639 110.363 75.639 181.248s-28.926 135.013-75.617 181.227l-0.021 0.021z\"></path>\n</svg>\n";

	var s_volume = function s_volume() {
	  var player = this;
	  var util = Player.util;
	  var container = util.createDom('xg-volume', '<xg-icon class="xgplayer-icon">\n                                         <div class="xgplayer-icon-large">' + LargeIcon + '</div>\n                                         <div class="xgplayer-icon-small">' + SmallIcon + '</div>\n                                         <div class="xgplayer-icon-muted">' + MutedIcon + '</div>\n                                       </xg-icon>\n                                       <xg-slider class="xgplayer-slider" tabindex="2">\n                                         <xg-bar class="xgplayer-bar">\n                                           <xg-drag class="xgplayer-drag"></xg-drag>\n                                         </xg-bar>\n                                       </xg-slider>', {}, 'xgplayer-volume');
	  player.once('ready', function () {
	    player.controls.appendChild(container);
	  });
	  var slider = container.querySelector('.xgplayer-slider');
	  var bar = container.querySelector('.xgplayer-bar');
	  var selected = container.querySelector('.xgplayer-drag');
	  var icon = container.querySelector('.xgplayer-icon');
	  selected.style.height = player.config.volume * 100 + '%';
	  slider.volume = player.config.volume;

	  bar.addEventListener('mousedown', function (e) {
	    e.preventDefault();
	    e.stopPropagation();
	    player.emit('volumeBarClick', e);
	  });

	  ['click', 'touchend'].forEach(function (item) {
	    icon.addEventListener(item, function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      player.emit('volumeIconClick');
	    });
	  });

	  icon.addEventListener('mouseenter', function (e) {
	    e.preventDefault();
	    e.stopPropagation();
	    player.emit('volumeIconEnter');
	  });

	  ['blur', 'mouseleave'].forEach(function (item) {
	    container.addEventListener(item, function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      player.emit('volumeIconLeave');
	    });
	  });
	};

	Player.install('s_volume', s_volume);

	var s_definition = function s_definition() {
	  var player = this;
	  var root = player.root;
	  var util = Player.util;
	  var sniffer = Player.sniffer;
	  var paused = void 0;
	  var container = util.createDom('xg-definition', '', { tabindex: 3 }, 'xgplayer-definition');
	  if (sniffer.device === 'mobile') {
	    player.config.definitionActive = 'click';
	  }

	  function onCanplayResourceReady() {
	    var list = player.definitionList;
	    var tmp = ['<ul>'],
	        src = player.config.url,
	        a = document.createElement('a');
	    if (player.switchURL) {
	      ['mp4', 'hls', '__flv__', 'dash'].every(function (item) {
	        if (player[item]) {
	          if (player[item].url) {
	            a.href = player[item].url;
	          }
	          if (item === '__flv__') {
	            if (player[item]._options) {
	              a.href = player[item]._options.url;
	            } else {
	              a.href = player[item]._mediaDataSource.url;
	            }
	          }
	          src = a.href;
	          return false;
	        } else {
	          return true;
	        }
	      });
	    } else {
	      src = player.currentSrc || player.src;
	    }
	    if (player['hls']) {
	      a.href = player['hls'].url;
	      src = a.href;
	    }
	    list.forEach(function (item) {
	      a.href = item.url;
	      if (player.dash) {
	        tmp.push('<li url=\'' + item.url + '\' cname=\'' + item.name + '\' class=\'' + (item.selected ? 'selected' : '') + '\'>' + item.name + '</li>');
	      } else {
	        tmp.push('<li url=\'' + item.url + '\' cname=\'' + item.name + '\' class=\'' + (a.href === src ? 'selected' : '') + '\'>' + item.name + '</li>');
	      }
	    });
	    var cursrc = list.filter(function (item) {
	      a.href = item.url;
	      if (player.dash) {
	        return item.selected === true;
	      } else {
	        return a.href === src;
	      }
	    });
	    tmp.push('</ul><p class=\'name\'>' + (cursrc[0] || { name: '' }).name + '</p>');
	    var urlInRoot = root.querySelector('.xgplayer-definition');
	    if (urlInRoot) {
	      urlInRoot.innerHTML = tmp.join('');
	      var cur = urlInRoot.querySelector('.name');
	      if (!player.config.definitionActive || player.config.definitionActive === 'hover') {
	        cur.addEventListener('mouseenter', function (e) {
	          e.preventDefault();
	          e.stopPropagation();
	          util.addClass(player.root, 'xgplayer-definition-active');
	          urlInRoot.focus();
	        });
	      }
	    } else {
	      container.innerHTML = tmp.join('');
	      var _cur = container.querySelector('.name');
	      if (!player.config.definitionActive || player.config.definitionActive === 'hover') {
	        _cur.addEventListener('mouseenter', function (e) {
	          e.preventDefault();
	          e.stopPropagation();
	          util.addClass(player.root, 'xgplayer-definition-active');
	          container.focus();
	        });
	      }
	      player.controls.appendChild(container);
	    }
	  }
	  function onResourceReady(list) {
	    player.definitionList = list;
	    if (list && list instanceof Array && list.length > 1) {
	      util.addClass(root, 'xgplayer-is-definition');
	      player.on('canplay', onCanplayResourceReady);
	    }
	  }
	  player.on('resourceReady', onResourceReady);

	  function onCanplayChangeDefinition() {
	    player.currentTime = player.curTime;
	    if (!paused) {
	      var playPromise = player.play();
	      if (playPromise !== undefined && playPromise) {
	        playPromise.catch(function (err) {});
	      }
	    }
	  }  ['touchend', 'click'].forEach(function (item) {
	    container.addEventListener(item, function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      var list = player.definitionList;
	      var li = e.target || e.srcElement,
	          a = document.createElement('a');
	      if (li && li.tagName.toLocaleLowerCase() === 'li') {
	        player.emit('beforeDefinitionChange', a.href);
	        var from = void 0,
	            to = void 0;
	        Array.prototype.forEach.call(li.parentNode.childNodes, function (item) {
	          if (util.hasClass(item, 'selected')) {
	            from = item.getAttribute('cname');
	            util.removeClass(item, 'selected');
	          }
	        });
	        if (player.dash) {
	          list.forEach(function (item) {
	            item.selected = false;
	            if (item.name === li.innerHTML) {
	              item.selected = true;
	            }
	          });
	        }

	        util.addClass(li, 'selected');
	        to = li.getAttribute('cname');
	        li.parentNode.nextSibling.innerHTML = '' + li.getAttribute('cname');
	        a.href = li.getAttribute('url');
	        if (player.switchURL) {
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
	          if (curRUL.href !== a.href && !player.ended) {
	            player.switchURL(a.href);
	          }
	        } else {
	          if (player['hls']) {
	            var _curRUL = document.createElement('a');
	            _curRUL = player['hls'].url;
	          }
	          if (a.href !== player.currentSrc) {
	            player.curTime = player.currentTime, paused = player.paused;
	            if (!player.ended) {
	              player.src = a.href;
	              player.once('canplay', onCanplayChangeDefinition);
	            }
	          }
	        }
	        player.emit('definitionChange', { from: from, to: to });
	        if (sniffer.device === 'mobile') {
	          util.removeClass(player.root, 'xgplayer-definition-active');
	        }
	      } else if (player.config.definitionActive === 'click' && li && (li.tagName.toLocaleLowerCase() === 'p' || li.tagName.toLocaleLowerCase() === 'em')) {
	        util.addClass(player.root, 'xgplayer-definition-active');
	        container.focus();
	      }
	      player.emit('focus');
	    }, false);
	  });

	  container.addEventListener('mouseleave', function (e) {
	    e.preventDefault();
	    e.stopPropagation();
	    util.removeClass(root, 'xgplayer-definition-active');
	  });

	  function onDestroy() {
	    player.off('resourceReady', onResourceReady);
	    player.off('canplay', onCanplayResourceReady);
	    player.off('canplay', onCanplayChangeDefinition);
	    player.off('destroy', onDestroy);
	  }
	  player.once('destroy', onDestroy);
	};

	Player.install('s_definition', s_definition);

	var Loading = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewbox=\"0 0 100 100\">\n  <path d=\"M100,50A50,50,0,1,1,50,0\"></path>\n</svg>\n";

	var s_loading = function s_loading() {
	  var player = this;
	  var root = player.root;
	  var util = Player.util;
	  var container = util.createDom('xg-loading', '' + Loading, {}, 'xgplayer-loading');
	  player.once('ready', function () {
	    root.appendChild(container);
	  });
	};

	Player.install('s_loading', s_loading);

	var s_progress = function s_progress() {
	  var player = this;
	  var util = Player.util;
	  var container = util.createDom('xg-progress', '<xg-outer class="xgplayer-progress-outer">\n                                                   <xg-cache class="xgplayer-progress-cache"></xg-cache>\n                                                   <xg-played class="xgplayer-progress-played">\n                                                     <xg-progress-btn class="xgplayer-progress-btn"></xg-progress-btn>\n                                                     <xg-point class="xgplayer-progress-point xgplayer-tips"></xg-point>\n                                                     <xg-thumbnail class="xgplayer-progress-thumbnail xgplayer-tips"></xg-thumbnail>\n                                                   </xgplayer-played>\n                                                 </xg-outer>', { tabindex: 1 }, 'xgplayer-progress');
	  var containerWidth = void 0;
	  player.controls.appendChild(container);
	  var progress = container.querySelector('.xgplayer-progress-played');
	  var btn = container.querySelector('.xgplayer-progress-btn');
	  var outer = container.querySelector('.xgplayer-progress-outer');
	  var cache = container.querySelector('.xgplayer-progress-cache');
	  var point = container.querySelector('.xgplayer-progress-point');
	  var thumbnail = container.querySelector('.xgplayer-progress-thumbnail');
	  player.dotArr = {};
	  function dotEvent(dotItem, text) {
	    dotItem.addEventListener('mouseenter', function (e) {
	      if (text) {
	        util.addClass(dotItem, 'xgplayer-progress-dot-show');
	        util.addClass(container, 'xgplayer-progress-dot-active');
	      }
	    });
	    dotItem.addEventListener('mouseleave', function (e) {
	      if (text) {
	        util.removeClass(dotItem, 'xgplayer-progress-dot-show');
	        util.removeClass(container, 'xgplayer-progress-dot-active');
	      }
	    });
	    dotItem.addEventListener('touchend', function (e) {
	      // e.preventDefault()
	      e.stopPropagation();
	      if (text) {
	        if (!util.hasClass(dotItem, 'xgplayer-progress-dot-show')) {
	          Object.keys(player.dotArr).forEach(function (key) {
	            if (player.dotArr[key]) {
	              util.removeClass(player.dotArr[key], 'xgplayer-progress-dot-show');
	            }
	          });
	        }
	        util.toggleClass(dotItem, 'xgplayer-progress-dot-show');
	        util.toggleClass(container, 'xgplayer-progress-dot-active');
	      }
	    });
	  }
	  function onCanplay() {
	    if (player.config.progressDot && util.typeOf(player.config.progressDot) === 'Array') {
	      player.config.progressDot.forEach(function (item) {
	        if (item.time >= 0 && item.time <= player.duration) {
	          var dot = util.createDom('xg-progress-dot', item.text ? '<span class="xgplayer-progress-tip">' + item.text + '</span>' : '', {}, 'xgplayer-progress-dot');
	          dot.style.left = item.time / player.duration * 100 + '%';
	          if (item.duration >= 0) {
	            dot.style.width = Math.min(item.duration, player.duration - item.time) / player.duration * 100 + '%';
	          }
	          outer.appendChild(dot);
	          player.dotArr[item.time] = dot;
	          dotEvent(dot, item.text);
	        }
	      });
	    }
	  }
	  player.once('canplay', onCanplay);
	  player.addProgressDot = function (time, text, duration) {
	    if (player.dotArr[time]) {
	      return;
	    }
	    if (time >= 0 && time <= player.duration) {
	      var dot = util.createDom('xg-progress-dot', '', {}, 'xgplayer-progress-dot');
	      dot.style.left = time / player.duration * 100 + '%';
	      if (duration >= 0) {
	        dot.style.width = Math.min(duration, player.duration - time) / player.duration * 100 + '%';
	      }
	      outer.appendChild(dot);
	      player.dotArr[time] = dot;
	      dotEvent(dot, text);
	    }
	  };
	  player.removeProgressDot = function (time) {
	    if (time >= 0 && time <= player.duration && player.dotArr[time]) {
	      var dot = player.dotArr[time];
	      dot.parentNode.removeChild(dot);
	      dot = null;
	      player.dotArr[time] = null;
	    }
	  };
	  player.removeAllProgressDot = function () {
	    Object.keys(player.dotArr).forEach(function (key) {
	      if (player.dotArr[key]) {
	        var dot = player.dotArr[key];
	        dot.parentNode.removeChild(dot);
	        dot = null;
	        player.dotArr[key] = null;
	      }
	    });
	  };
	  var tnailPicNum = 0;
	  var tnailWidth = 0;
	  var tnailHeight = 0;
	  var tnailCol = 0;
	  var tnailRow = 0;
	  var interval = 0;
	  var tnailUrls = [];
	  if (player.config.thumbnail) {
	    tnailPicNum = player.config.thumbnail.pic_num;
	    tnailWidth = player.config.thumbnail.width;
	    tnailHeight = player.config.thumbnail.height;
	    tnailCol = player.config.thumbnail.col;
	    tnailRow = player.config.thumbnail.row;
	    tnailUrls = player.config.thumbnail.urls;
	    thumbnail.style.width = tnailWidth + 'px';
	    thumbnail.style.height = tnailHeight + 'px';
	  }  ['touchstart', 'mousedown'].forEach(function (item) {
	    container.addEventListener(item, function (e) {
	      // e.preventDefault()
	      e.stopPropagation();
	      util.event(e);
	      if (e._target === point || !player.config.allowSeekAfterEnded && player.ended) {
	        return true;
	      }
	      container.focus();
	      containerWidth = container.getBoundingClientRect().width;

	      var _progress$getBounding = progress.getBoundingClientRect(),
	          left = _progress$getBounding.left;

	      var move = function move(e) {
	        // e.preventDefault()
	        e.stopPropagation();
	        util.event(e);
	        player.isProgressMoving = true;
	        var w = e.clientX - left;
	        if (w > containerWidth) {
	          w = containerWidth;
	        }
	        var now = w / containerWidth * player.duration;
	        progress.style.width = w * 100 / containerWidth + '%';

	        if (player.videoConfig.mediaType === 'video' && !player.dash && !player.config.closeMoveSeek) {
	          player.currentTime = Number(now).toFixed(1);
	        } else {
	          var time = util.findDom(player.controls, '.xgplayer-time');
	          if (time) {
	            time.innerHTML = '<span>' + util.format(now || 0) + '</span><em>' + util.format(player.duration);
	          }
	        }
	        player.emit('focus');
	      };
	      var up = function up(e) {
	        // e.preventDefault()
	        e.stopPropagation();
	        util.event(e);
	        window.removeEventListener('mousemove', move);
	        window.removeEventListener('touchmove', move, { passive: false });
	        window.removeEventListener('mouseup', up);
	        window.removeEventListener('touchend', up);
	        container.blur();
	        if (!player.isProgressMoving || player.videoConfig.mediaType === 'audio' || player.dash || player.config.closeMoveSeek) {
	          var w = e.clientX - left;
	          if (w > containerWidth) {
	            w = containerWidth;
	          }
	          var now = w / containerWidth * player.duration;
	          progress.style.width = w * 100 / containerWidth + '%';
	          player.currentTime = Number(now).toFixed(1);
	        }
	        player.emit('focus');
	        player.isProgressMoving = false;
	      };
	      window.addEventListener('mousemove', move);
	      window.addEventListener('touchmove', move, { passive: false });
	      window.addEventListener('mouseup', up);
	      window.addEventListener('touchend', up);
	      return true;
	    });
	  });

	  container.addEventListener('mouseenter', function (e) {
	    if (!player.config.allowSeekAfterEnded && player.ended) {
	      return true;
	    }
	    var containerLeft = container.getBoundingClientRect().left;
	    var containerWidth = container.getBoundingClientRect().width;
	    var compute = function compute(e) {
	      var now = (e.clientX - containerLeft) / containerWidth * player.duration;
	      now = now < 0 ? 0 : now;
	      point.textContent = util.format(now);
	      var pointWidth = point.getBoundingClientRect().width;
	      if (player.config.thumbnail) {
	        interval = player.duration / tnailPicNum;
	        var index = Math.floor(now / interval);
	        thumbnail.style.backgroundImage = 'url(' + tnailUrls[Math.ceil((index + 1) / (tnailCol * tnailRow)) - 1] + ')';
	        var indexInPage = index + 1 - tnailCol * tnailRow * (Math.ceil((index + 1) / (tnailCol * tnailRow)) - 1);
	        var tnaiRowIndex = Math.ceil(indexInPage / tnailRow) - 1;
	        var tnaiColIndex = indexInPage - tnaiRowIndex * tnailRow - 1;
	        thumbnail.style['background-position'] = '-' + tnaiColIndex * tnailWidth + 'px -' + tnaiRowIndex * tnailHeight + 'px';
	        var left = e.clientX - containerLeft - tnailWidth / 2;
	        left = left > 0 ? left : 0;
	        left = left < containerWidth - tnailWidth ? left : containerWidth - tnailWidth;
	        thumbnail.style.left = left + 'px';
	        thumbnail.style.top = -10 - tnailHeight + 'px';
	        thumbnail.style.display = 'block';
	        point.style.left = left + tnailWidth / 2 - pointWidth / 2 + 'px';
	      } else {
	        var _left = e.clientX - containerLeft - pointWidth / 2;
	        _left = _left > 0 ? _left : 0;
	        _left = _left > containerWidth - pointWidth ? containerWidth - pointWidth : _left;
	        point.style.left = _left + 'px';
	      }
	      if (util.hasClass(container, 'xgplayer-progress-dot-active')) {
	        point.style.display = 'none';
	      } else {
	        point.style.display = 'block';
	      }
	    };
	    var move = function move(e) {
	      compute(e);
	    };
	    var leave = function leave(e) {
	      container.removeEventListener('mousemove', move, false);
	      container.removeEventListener('mouseleave', leave, false);
	      compute(e);
	      point.style.display = 'none';
	      thumbnail.style.display = 'none';
	    };
	    container.addEventListener('mousemove', move, false);
	    container.addEventListener('mouseleave', leave, false);
	    compute(e);
	  }, false);

	  // let lastBtnLeft = false
	  var onTimeupdate = function onTimeupdate() {
	    if (!containerWidth && container) {
	      containerWidth = container.getBoundingClientRect().width;
	    }
	    if (player.videoConfig.mediaType !== 'audio' || !player.isProgressMoving || !player.dash) {
	      progress.style.width = player.currentTime * 100 / player.duration + '%';
	    }
	  };
	  player.on('timeupdate', onTimeupdate);

	  var onCacheUpdate = function onCacheUpdate() {
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
	      cache.style.width = end / player.duration * 100 + '%';
	    }
	  };
	  var cacheUpdateEvents = ['bufferedChange', 'cacheupdate', 'ended', 'timeupdate'];
	  cacheUpdateEvents.forEach(function (item) {
	    player.on(item, onCacheUpdate);
	  });

	  function destroyFunc() {
	    player.removeAllProgressDot();
	    player.off('canplay', onCanplay);
	    player.off('timeupdate', onTimeupdate);
	    cacheUpdateEvents.forEach(function (item) {
	      player.off(item, onCacheUpdate);
	    });
	    player.off('destroy', destroyFunc);
	  }
	  player.once('destroy', destroyFunc);
	};

	Player.install('s_progress', s_progress);

	var s_time = function s_time() {
	  var player = this;
	  var root = player.root;
	  var util = Player.util;
	  var container = util.createDom('xg-time', '<span>' + (player.currentTime || util.format(0)) + '</span>\n                                           <em>' + (player.duration || util.format(0)) + '</em>', {}, 'xgplayer-time');
	  player.once('ready', function () {
	    player.controls.appendChild(container);
	  });
	  var onTimeChange = function onTimeChange() {
	    if (player.duration === Infinity) {
	      util.addClass(player.root, 'xgplayer-is-live');
	      if (!util.findDom(player.root, '.xgplayer-live')) {
	        var live = util.createDom('xg-live', '正在直播', {}, 'xgplayer-live');
	        player.controls.appendChild(live);
	      }
	    }
	    if (player.videoConfig.mediaType !== 'audio' || !player.isProgressMoving || !player.dash) {
	      container.innerHTML = '<span>' + util.format(player.currentTime || 0) + '</span>' + ('<em>' + util.format(player.duration) + '</em>');
	    }
	  };
	  player.on('durationchange', onTimeChange);
	  player.on('timeupdate', onTimeChange);

	  function onDestroy() {
	    player.off('durationchange', onTimeChange);
	    player.off('timeupdate', onTimeChange);
	    player.off('destroy', onDestroy);
	  }
	  player.once('destroy', onDestroy);
	};

	Player.install('s_time', s_time);

	var ReplayIcon = "<svg class=\"xgplayer-replay-svg\" xmlns=\"http://www.w3.org/2000/svg\" width=\"78\" height=\"78\" viewbox=\"0 0 78 78\">\n  <path d=\"M8.22708362,13.8757234 L11.2677371,12.6472196 C11.7798067,12.4403301 12.3626381,12.6877273 12.5695276,13.1997969 L12.9441342,14.1269807 C13.1510237,14.6390502 12.9036264,15.2218816 12.3915569,15.4287712 L6.8284538,17.6764107 L5.90126995,18.0510173 C5.38920044,18.2579068 4.80636901,18.0105096 4.5994795,17.49844 L1.97723335,11.0081531 C1.77034384,10.4960836 2.0177411,9.91325213 2.52981061,9.70636262 L3.45699446,9.33175602 C3.96906396,9.12486652 4.5518954,9.37226378 4.75878491,9.88433329 L5.67885163,12.1615783 C7.99551726,6.6766934 13.3983951,3 19.5,3 C27.7842712,3 34.5,9.71572875 34.5,18 C34.5,26.2842712 27.7842712,33 19.5,33 C15.4573596,33 11.6658607,31.3912946 8.87004692,28.5831991 C8.28554571,27.9961303 8.28762719,27.0463851 8.87469603,26.4618839 C9.46176488,25.8773827 10.4115101,25.8794641 10.9960113,26.466533 C13.2344327,28.7147875 16.263503,30 19.5,30 C26.127417,30 31.5,24.627417 31.5,18 C31.5,11.372583 26.127417,6 19.5,6 C14.4183772,6 9.94214483,9.18783811 8.22708362,13.8757234 Z\"></path>\n</svg>\n";

	var s_replay = function s_replay() {
	  var player = this;
	  var util = Player.util;
	  var root = player.root;

	  var replayText = player.lang.REPLAY;
	  var btn = util.createDom('xg-replay', ReplayIcon + '\n                                         <xg-replay-txt class="xgplayer-replay-txt">' + replayText + '</xg-replay-txt>\n                                        ', {}, 'xgplayer-replay');
	  player.once('ready', function () {
	    root.appendChild(btn);
	  });

	  function onEnded() {
	    var path = btn.querySelector('path');
	    if (path) {
	      var transform = window.getComputedStyle(path).getPropertyValue('transform');
	      if (typeof transform === 'string' && transform.indexOf('none') > -1) {
	        return;
	      } else {
	        path.setAttribute('transform', transform);
	      }
	    }
	  }
	  player.on('ended', onEnded);

	  var svg = btn.querySelector('svg');

	  ['click', 'touchend'].forEach(function (item) {
	    svg.addEventListener(item, function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      player.emit('replayBtnClick');
	    });
	  });

	  function destroyFunc() {
	    player.off('ended', onEnded);
	    player.off('destroy', destroyFunc);
	  }
	  player.once('destroy', destroyFunc);
	};

	Player.install('s_replay', s_replay);

	var s_playbackRate = function s_playbackRate() {
	  var player = this;
	  var util = Player.util;
	  if (player.config.playbackRate) {
	    player.config.playbackRate.sort(function (a, b) {
	      return b - a;
	    });
	  } else {
	    return false;
	  }
	  var ul = util.createDom('xg-playbackrate', " ", {}, 'xgplayer-playbackrate');
	  var list = [];
	  player.config.playbackRate.forEach(function (item) {
	    list.push({ name: '' + item, rate: item + 'x', selected: false });
	  });
	  var selectedSpeed = 1;
	  var tmp = ['<ul>'];
	  list.forEach(function (item) {
	    if (player.config.defaultPlaybackRate && player.config.defaultPlaybackRate.toString() === item.name) {
	      item.selected = true;
	      selectedSpeed = player.config.defaultPlaybackRate;
	      player.once('playing', function () {
	        player.video.playbackRate = player.config.defaultPlaybackRate;
	      });
	    } else if (item.name === '1.0' || item.name === '1') {
	      if (!player.config.defaultPlaybackRate || player.config.defaultPlaybackRate === 1) {
	        item.selected = true;
	      }
	    }
	    tmp.push('<li cname=\'' + item.name + '\' class=\'' + (item.selected ? 'selected' : '') + '\'>' + item.rate + '</li>');
	  });
	  tmp.push('</ul><p class=\'name\'>' + selectedSpeed + 'x</p>');
	  var playbackDom = player.root.querySelector('.xgplayer-playbackrate');
	  if (playbackDom) {
	    playbackDom.innerHTML = tmp.join('');
	    var cur = void 0;
	    if (playbackDom) {
	      cur = playbackDom.querySelector('.name');
	    } else return;
	    cur.addEventListener('mouseenter', function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      util.addClass(player.root, 'xgplayer-playbackrate-active');
	      playbackDom.focus();
	    });
	  } else {
	    ul.innerHTML = tmp.join('');
	    var _cur = void 0;
	    if (ul) {
	      _cur = ul.querySelector('.name');
	    } else return;
	    _cur.addEventListener('mouseenter', function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      util.addClass(player.root, 'xgplayer-playbackrate-active');
	      ul.focus();
	    });
	    player.once('ready', function () {
	      player.controls.appendChild(ul);
	    });
	  }

	  var ev = ['touchend', 'click'];
	  ev.forEach(function (item) {
	    ul.addEventListener(item, function (e) {
	      e.stopPropagation();
	      e.preventDefault();
	      var li = e.target;
	      if (li && li.tagName.toLocaleLowerCase() === 'li') {
	        var from = void 0,
	            to = void 0;
	        list.forEach(function (item) {
	          item.selected = false;
	          if (li.textContent.replace(/\s+/g, "") === item.rate) {
	            Array.prototype.forEach.call(li.parentNode.childNodes, function (item) {
	              if (util.hasClass(item, 'selected')) {
	                from = parseFloat(item.getAttribute('cname'));
	                util.removeClass(item, 'selected');
	              }
	            });
	            item.selected = true;
	            player.video.playbackRate = item.name * 1;
	            selectedSpeed = item.name * 1;
	          }
	        });
	        util.addClass(li, 'selected');
	        to = parseFloat(li.getAttribute('cname'));
	        li.parentNode.nextSibling.innerHTML = li.getAttribute('cname') + 'x';
	        player.emit('playbackrateChange', { from: from, to: to });
	      } else if (li && (li.tagName.toLocaleLowerCase() === 'p' || li.tagName.toLocaleLowerCase() === 'span')) {
	        util.addClass(player.root, 'xgplayer-playbackrate-active');
	        ul.focus();
	      }
	      player.emit('focus');
	    }, false);
	  });
	  ul.addEventListener('mouseleave', function (e) {
	    e.preventDefault();
	    e.stopPropagation();
	    util.removeClass(player.root, 'xgplayer-playbackrate-active');
	  });
	  player.on('play', function () {
	    if (player.video.playbackRate.toFixed(1) !== selectedSpeed.toFixed(1)) {
	      player.video.playbackRate = selectedSpeed;
	    }
	  });
	};

	Player.install('s_playbackRate', s_playbackRate);

	var s_localPreview = function s_localPreview() {
	  var player = this;
	  var root = player.root;
	  var util = Player.util;
	  if (player.config.preview && player.config.preview.uploadEl) {
	    var preview = util.createDom('xg-preview', '<input type="file">', {}, 'xgplayer-preview');
	    var upload = preview.querySelector('input');
	    player.config.preview.uploadEl.appendChild(preview);
	    upload.onchange = function () {
	      player.emit('upload', upload);
	    };
	  }
	};

	Player.install('s_localPreview', s_localPreview);

	var DownloadIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\">\n  <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n    <g transform=\"translate(-488.000000, -340.000000)\" fill=\"#FFFFFF\">\n      <g id=\"Group-2\">\n        <g id=\"volme_big-copy\" transform=\"translate(488.000000, 340.000000)\">\n          <rect id=\"Rectangle-18\" x=\"11\" y=\"4\" width=\"2\" height=\"12\" rx=\"1\"></rect>\n          <rect id=\"Rectangle-2\" x=\"3\" y=\"18\" width=\"18\" height=\"2\" rx=\"1\"></rect>\n          <rect id=\"Rectangle-2\" transform=\"translate(4.000000, 17.500000) rotate(90.000000) translate(-4.000000, -17.500000) \" x=\"1.5\" y=\"16.5\" width=\"5\" height=\"2\" rx=\"1\"></rect><rect id=\"Rectangle-2-Copy-3\" transform=\"translate(20.000000, 17.500000) rotate(90.000000) translate(-20.000000, -17.500000) \" x=\"17.5\" y=\"16.5\" width=\"5\" height=\"2\" rx=\"1\"></rect>\n          <path d=\"M9.48791171,8.26502656 L9.48791171,14.2650266 C9.48791171,14.8173113 9.04019646,15.2650266 8.48791171,15.2650266 C7.93562696,15.2650266 7.48791171,14.8173113 7.48791171,14.2650266 L7.48791171,7.26502656 C7.48791171,6.71274181 7.93562696,6.26502656 8.48791171,6.26502656 L15.4879117,6.26502656 C16.0401965,6.26502656 16.4879117,6.71274181 16.4879117,7.26502656 C16.4879117,7.81731131 16.0401965,8.26502656 15.4879117,8.26502656 L9.48791171,8.26502656 Z\" id=\"Combined-Shape\" transform=\"translate(11.987912, 10.765027) scale(1, -1) rotate(45.000000) translate(-11.987912, -10.765027) \"></path>\n        </g>\n      </g>\n    </g>\n  </g>\n</svg>\n";

	var s_download = function s_download() {
	  var player = this;
	  var util = Player.util;
	  if (!player.config.download) {
	    return;
	  }
	  var btn = util.createDom('xg-download', '<xg-icon class="xgplayer-icon">' + DownloadIcon + '</xg-icon>', {}, 'xgplayer-download');

	  var tipsText = player.lang.DOWNLOAD_TIPS;
	  var tips = util.createDom('xg-tips', '<span class="xgplayer-tip-download">' + tipsText + '</span>', {}, 'xgplayer-tips');
	  btn.appendChild(tips);
	  player.once('ready', function () {
	    player.controls.appendChild(btn);
	  });

	  ['click', 'touchend'].forEach(function (item) {
	    btn.addEventListener(item, function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      player.emit('downloadBtnClick');
	    });
	  });
	};

	Player.install('s_download', s_download);

	var dist = createCommonjsModule(function (module, exports) {
	!function(t,e){module.exports=e();}(window,function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i});},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0});},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var i,o=n(22),r=(i=o)&&i.__esModule?i:{default:i};var a={};a.domObj=new r.default,a.createDom=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"div",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",o=document.createElement(t);return o.className=i,o.innerHTML=e,Object.keys(n).forEach(function(e){var i=e,r=n[e];"video"===t||"audio"===t?r&&o.setAttribute(i,r):o.setAttribute(i,r);}),o},a.hasClass=function(t,e){return t.classList?Array.prototype.some.call(t.classList,function(t){return t===e}):!!t.className.match(new RegExp("(\\s|^)"+e+"(\\s|$)"))},a.addClass=function(t,e){t.classList?e.replace(/(^\s+|\s+$)/g,"").split(/\s+/g).forEach(function(e){e&&t.classList.add(e);}):a.hasClass(t,e)||(t.className+=" "+e);},a.removeClass=function(t,e){t.classList?e.split(/\s+/g).forEach(function(e){t.classList.remove(e);}):a.hasClass(t,e)&&e.split(/\s+/g).forEach(function(e){var n=new RegExp("(\\s|^)"+e+"(\\s|$)");t.className=t.className.replace(n," ");});},a.toggleClass=function(t,e){e.split(/\s+/g).forEach(function(e){a.hasClass(t,e)?a.removeClass(t,e):a.addClass(t,e);});},a.findDom=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:document,e=arguments[1],n=void 0;try{n=t.querySelector(e);}catch(i){e.startsWith("#")&&(n=t.getElementById(e.slice(1)));}return n},a.deepCopy=function(t,e){if("Object"===a.typeOf(e)&&"Object"===a.typeOf(t))return Object.keys(e).forEach(function(n){"Object"!==a.typeOf(e[n])||e[n]instanceof Node?"Array"===a.typeOf(e[n])?t[n]="Array"===a.typeOf(t[n])?t[n].concat(e[n]):e[n]:t[n]=e[n]:t[n]?a.deepCopy(t[n],e[n]):t[n]=e[n];}),t},a.typeOf=function(t){return Object.prototype.toString.call(t).match(/([^\s.*]+)(?=]$)/g)[0]},a.copyDom=function(t){if(t&&1===t.nodeType){var e=document.createElement(t.tagName);return Array.prototype.forEach.call(t.attributes,function(t){e.setAttribute(t.name,t.value);}),t.innerHTML&&(e.innerHTML=t.innerHTML),e}return ""},a.formatTime=function(t){var e=Math.floor(t);return 1e3*e+(t-e)},e.default=a,t.exports=e.default;},function(t,e,n){var i=n(13)();t.exports=function(t){return t!==i&&null!==t};},function(t,e,n){t.exports=n(3);},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var i,o=n(4),r=(i=o)&&i.__esModule?i:{default:i};n(26),e.default=r.default,t.exports=e.default;},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i);}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=s(n(5)),r=s(n(21)),a=s(n(0));function s(t){return t&&t.__esModule?t:{default:t}}var c=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.config=a.default.deepCopy({overlap:!1,area:{start:0,end:1},live:!1,comments:[],direction:"r2l"},e),this.hideArr=[],(0, o.default)(this);var n=this;if(this.config.comments.forEach(function(t){t.duration=t.duration<5e3?5e3:t.duration,t.mode||(t.mode="scroll");}),!this.config.container||1!==this.config.container.nodeType)return this.emit("error","container id can't be empty"),!1;if(this.container=this.config.container,this.config.containerStyle){var i=this.config.containerStyle;Object.keys(i).forEach(function(t){n.container.style[t]=i[t];});}this.live=this.config.live,this.player=this.config.player,this.direction=this.config.direction,a.default.addClass(this.container,"danmu"),this.bulletBtn=new r.default(this),this.emit("ready");}return i(t,[{key:"start",value:function(){this.bulletBtn.main.start();}},{key:"pause",value:function(){this.bulletBtn.main.pause();}},{key:"play",value:function(){this.bulletBtn.main.play();}},{key:"stop",value:function(){this.bulletBtn.main.stop();}},{key:"sendComment",value:function(t){t&&t.id&&t.duration&&(t.el||t.txt)&&(t.duration=t.duration<5e3?5e3:t.duration,this.bulletBtn.main.data.push(t));}},{key:"setCommentID",value:function(t,e){var n=this.container.getBoundingClientRect();t&&e&&(this.bulletBtn.main.data.some(function(n){return n.id===t&&(n.id=e,!0)}),this.bulletBtn.main.queue.some(function(i){return i.id===t&&(i.id=e,i.pauseMove(n),i.startMove(n),!0)}));}},{key:"setCommentDuration",value:function(t,e){var n=this.container.getBoundingClientRect();t&&e&&(e=e<5e3?5e3:e,this.bulletBtn.main.data.some(function(n){return n.id===t&&(n.duration=e,!0)}),this.bulletBtn.main.queue.some(function(i){return i.id===t&&(i.duration=e,i.pauseMove(n),i.startMove(n),!0)}));}},{key:"setAllDuration",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"scroll",e=arguments[1],n=this.container.getBoundingClientRect();e&&(e=e<5e3?5e3:e,this.bulletBtn.main.data.forEach(function(n){t===n.mode&&(n.duration=e);}),this.bulletBtn.main.queue.forEach(function(i){t===i.mode&&(i.duration=e,i.pauseMove(n),i.startMove(n));}));}},{key:"hide",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"scroll";this.hideArr.indexOf(t)<0&&this.hideArr.push(t),this.bulletBtn.main.queue.filter(function(e){return t===e.mode||"color"===t&&e.color}).forEach(function(t){return t.remove()});}},{key:"show",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"scroll",e=this.hideArr.indexOf(t);e>-1&&this.hideArr.splice(e,1);}},{key:"setDirection",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"r2l";this.emit("changeDirection",t);}}]),t}();e.default=c,t.exports=e.default;},function(t,e,n){var i,o,r,a,s,c,u,l=n(6),h=n(20),f=Function.prototype.apply,d=Function.prototype.call,p=Object.create,m=Object.defineProperty,g=Object.defineProperties,v=Object.prototype.hasOwnProperty,b={configurable:!0,enumerable:!1,writable:!0};o=function(t,e){var n,o;return h(e),o=this,i.call(this,t,n=function(){r.call(o,t,n),f.call(e,this,arguments);}),n.__eeOnceListener__=e,this},s={on:i=function(t,e){var n;return h(e),v.call(this,"__ee__")?n=this.__ee__:(n=b.value=p(null),m(this,"__ee__",b),b.value=null),n[t]?"object"==typeof n[t]?n[t].push(e):n[t]=[n[t],e]:n[t]=e,this},once:o,off:r=function(t,e){var n,i,o,r;if(h(e),!v.call(this,"__ee__"))return this;if(!(n=this.__ee__)[t])return this;if("object"==typeof(i=n[t]))for(r=0;o=i[r];++r)o!==e&&o.__eeOnceListener__!==e||(2===i.length?n[t]=i[r?0:1]:i.splice(r,1));else i!==e&&i.__eeOnceListener__!==e||delete n[t];return this},emit:a=function(t){var e,n,i,o,r;if(v.call(this,"__ee__")&&(o=this.__ee__[t]))if("object"==typeof o){for(n=arguments.length,r=new Array(n-1),e=1;e<n;++e)r[e-1]=arguments[e];for(o=o.slice(),e=0;i=o[e];++e)f.call(i,this,r);}else switch(arguments.length){case 1:d.call(o,this);break;case 2:d.call(o,this,arguments[1]);break;case 3:d.call(o,this,arguments[1],arguments[2]);break;default:for(n=arguments.length,r=new Array(n-1),e=1;e<n;++e)r[e-1]=arguments[e];f.call(o,this,r);}}},c={on:l(i),once:l(o),off:l(r),emit:l(a)},u=g({},c),t.exports=e=function(t){return null==t?p(u):g(Object(t),c)},e.methods=s;},function(t,e,n){var i=n(7),o=n(15),r=n(16),a=n(17);(t.exports=function(t,e){var n,r,s,c,u;return arguments.length<2||"string"!=typeof t?(c=e,e=t,t=null):c=arguments[2],null==t?(n=s=!0,r=!1):(n=a.call(t,"c"),r=a.call(t,"e"),s=a.call(t,"w")),u={value:e,configurable:n,enumerable:r,writable:s},c?i(o(c),u):u}).gs=function(t,e,n){var s,c,u,l;return "string"!=typeof t?(u=n,n=e,e=t,t=null):u=arguments[3],null==e?e=void 0:r(e)?null==n?n=void 0:r(n)||(u=n,n=void 0):(u=e,e=n=void 0),null==t?(s=!0,c=!1):(s=a.call(t,"c"),c=a.call(t,"e")),l={get:e,set:n,configurable:s,enumerable:c},u?i(o(u),l):l};},function(t,e,n){t.exports=n(8)()?Object.assign:n(9);},function(t,e,n){t.exports=function(){var t,e=Object.assign;return "function"==typeof e&&(e(t={foo:"raz"},{bar:"dwa"},{trzy:"trzy"}),t.foo+t.bar+t.trzy==="razdwatrzy")};},function(t,e,n){var i=n(10),o=n(14),r=Math.max;t.exports=function(t,e){var n,a,s,c=r(arguments.length,2);for(t=Object(o(t)),s=function(i){try{t[i]=e[i];}catch(t){n||(n=t);}},a=1;a<c;++a)e=arguments[a],i(e).forEach(s);if(void 0!==n)throw n;return t};},function(t,e,n){t.exports=n(11)()?Object.keys:n(12);},function(t,e,n){t.exports=function(){try{return Object.keys("primitive"),!0}catch(t){return !1}};},function(t,e,n){var i=n(1),o=Object.keys;t.exports=function(t){return o(i(t)?Object(t):t)};},function(t,e,n){t.exports=function(){};},function(t,e,n){var i=n(1);t.exports=function(t){if(!i(t))throw new TypeError("Cannot use null or undefined");return t};},function(t,e,n){var i=n(1),o=Array.prototype.forEach,r=Object.create;t.exports=function(t){var e=r(null);return o.call(arguments,function(t){i(t)&&function(t,e){var n;for(n in t)e[n]=t[n];}(Object(t),e);}),e};},function(t,e,n){t.exports=function(t){return "function"==typeof t};},function(t,e,n){t.exports=n(18)()?String.prototype.contains:n(19);},function(t,e,n){var i="razdwatrzy";t.exports=function(){return "function"==typeof i.contains&&(!0===i.contains("dwa")&&!1===i.contains("foo"))};},function(t,e,n){var i=String.prototype.indexOf;t.exports=function(t){return i.call(this,t,arguments[1])>-1};},function(t,e,n){t.exports=function(t){if("function"!=typeof t)throw new TypeError(t+" is not a function");return t};},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i);}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=a(n(0)),r=a(n(23));function a(t){return t&&t.__esModule?t:{default:t}}var s=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.danmu=e,this.main=new r.default(e),e.config.defaultOff||this.main.start();}return i(t,[{key:"createSwitch",value:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return this.switchBtn=o.default.createDom("dk-switch",'<span class="txt">弹</span>',{},"danmu-switch "+(t?"danmu-switch-active":"")),this.switchBtn}}]),t}();e.default=s,t.exports=e.default;},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i);}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();var o=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),e={initDOM:function(){return document.createElement("div")},initSize:10},this.init(e);}return i(t,[{key:"init",value:function(t){this.idleList=[],this.usingList=[],this._id=0,this.options=t,this._expand(t.initSize);}},{key:"use",value:function(){this.idleList.length||this._expand(1);var t=this.idleList.shift();return this.usingList.push(t),t}},{key:"unuse",value:function(t){var e=this.usingList.indexOf(t);e<0||(this.usingList.splice(e,1),t.innerHTML="",t.textcontent="",t.style="",this.idleList.push(t));}},{key:"_expand",value:function(t){for(var e=0;e<t;e++)this.idleList.push(this.options.initDOM(this._id++));}}]),t}();e.default=o,t.exports=e.default;},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i);}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=s(n(24)),r=s(n(25)),a=s(n(0));function s(t){return t&&t.__esModule?t:{default:t}}var c=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.danmu=e,this.container=e.container,this.channel=new o.default(e),this.data=[].concat(e.config.comments),this.queue=[],this.timer=null,this.retryTimer=null,this.interval=2e3,this.status="idle",e.on("bullet_remove",this.updateQueue.bind(this));var n=this;this.danmu.on("changeDirection",function(t){n.danmu.direction=t;});}return i(t,[{key:"updateQueue",value:function(t){var e=this;e.queue.some(function(n,i){return n.id===t.bullet.id&&(e.queue.splice(i,1),!0)});}},{key:"init",value:function(t,e){e||(e=this),e.data.sort(function(t,e){return t.start-e.start}),e.retryTimer||(e.retryTimer=setInterval(function(){e.readData(),e.dataHandle();},e.interval-1e3));}},{key:"start",value:function(){this.status="playing",this.queue=[],this.container.innerHTML="",this.channel.resetWithCb(this.init,this);}},{key:"stop",value:function(){this.status="closed",clearInterval(this.retryTimer),this.retryTimer=null,this.channel.reset(),this.queue=[],this.container.innerHTML="";}},{key:"play",value:function(){this.status="playing";var t=this.channel.channels,e=this.danmu.container.getBoundingClientRect();t&&t.length>0&&["scroll","top","bottom"].forEach(function(n){for(var i=0;i<t.length;i++)t[i].queue[n].forEach(function(t){t.resized||(t.startMove(e),t.resized=!0);});for(var o=0;o<t.length;o++)t[o].queue[n].forEach(function(t){t.resized=!1;});});}},{key:"pause",value:function(){this.status="paused";var t=this.channel.channels,e=this.danmu.container.getBoundingClientRect();t&&t.length>0&&["scroll","top","bottom"].forEach(function(n){for(var i=0;i<t.length;i++)t[i].queue[n].forEach(function(t){t.pauseMove(e);});});}},{key:"dataHandle",value:function(){var t=this;"paused"!==this.status&&"closed"!==this.status&&t.queue.length&&t.queue.forEach(function(e){"waiting"!==e.status&&"paused"!==e.status||e.startMove(t.channel.containerPos);});}},{key:"readData",value:function(){var t=this,e=this.danmu,n=0;e.player&&e.player.currentTime&&(n=a.default.formatTime(e.player.currentTime));var i=void 0,o=t.interval,s=t.channel,c=void 0;e.player?(c=t.data.filter(function(e){return !e.start&&t.danmu.hideArr.indexOf(e.mode)<0&&(!e.color||t.danmu.hideArr.indexOf("color")<0)&&(e.start=n),t.danmu.hideArr.indexOf(e.mode)<0&&(!e.color||t.danmu.hideArr.indexOf("color")<0)&&e.start-o<=n&&n<=e.start+o}),e.live&&(t.data=t.data.filter(function(t){return t.start||(t.start=n),t.start>n-3*o}))):c=t.data.filter(function(e){return t.danmu.hideArr.indexOf(e.mode)<0&&(!e.color||t.danmu.hideArr.indexOf("color")<0)}),c.length>0&&c.forEach(function(n){(i=new r.default(e,n)).attach(),s.addBullet(i).result?(t.queue.push(i),i.topInit()):i.detach();});}}]),t}();e.default=c,t.exports=e.default;},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i);}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();var o=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.danmu=e,this.reset();var n=this;this.danmu.on("bullet_remove",function(t){n.removeBullet(t.bullet);}),this.direction=e.direction,this.danmu.on("changeDirection",function(t){n.direction=t;}),this.containerPos=this.danmu.container.getBoundingClientRect(),this.containerWidth=this.containerPos.width,this.containerHeight=this.containerPos.height,this.containerLeft=this.containerPos.left,this.containerRight=this.containerPos.right,this.danmu.bulletResizeTimer=setInterval(function(){n.containerPos=n.danmu.container.getBoundingClientRect(),(Math.abs(n.containerPos.width-n.containerWidth)>=2||Math.abs(n.containerPos.height-n.containerHeight)>=2||Math.abs(n.containerPos.left-n.containerLeft)>=2||Math.abs(n.containerPos.right-n.containerRight)>=2)&&(n.containerWidth=n.containerPos.width,n.containerHeight=n.containerPos.height,n.containerLeft=n.containerPos.left,n.containerRight=n.containerPos.right,n.resize(!0));},50);}return i(t,[{key:"resize",value:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=this.danmu.container,n=this;setTimeout(function(){n.danmu.bulletBtn.main.data&&n.danmu.bulletBtn.main.data.forEach(function(t){t.bookChannelId&&delete t.bookChannelId;});var i=e.getBoundingClientRect();n.width=i.width,n.height=i.height,n.danmu.config.area&&n.danmu.config.area.start>=0&&n.danmu.config.area.end>=n.danmu.config.area.start&&("b2t"===n.direction?n.width=n.width*(n.danmu.config.area.end-n.danmu.config.area.start):n.height=n.height*(n.danmu.config.area.end-n.danmu.config.area.start)),n.container=e;var o=/mobile/gi.test(navigator.userAgent)?10:12,r=void 0;r="b2t"===n.direction?Math.floor(n.width/o):Math.floor(n.height/o);for(var a=[],s=0;s<r;s++)a[s]={id:s,queue:{scroll:[],top:[],bottom:[]},operating:{scroll:!1,top:!1,bottom:!1},bookId:{}};if(n.channels&&n.channels.length<=a.length){for(var c=function(e){a[e]={id:e,queue:{scroll:[],top:[],bottom:[]},operating:{scroll:!1,top:!1,bottom:!1},bookId:{}},["scroll","top"].forEach(function(i){n.channels[e].queue[i].forEach(function(o){o.el&&(a[e].queue[i].push(o),o.resized||(o.pauseMove(n.containerPos,t),o.startMove(n.containerPos),o.resized=!0));});}),n.channels[e].queue.bottom.forEach(function(i){if(i.el){if(a[e+a.length-n.channels.length].queue.bottom.push(i),i.channel_id[0]+i.channel_id[1]-1===e){var r=[].concat(i.channel_id);i.channel_id=[r[0]-n.channels.length+a.length,r[1]],i.top=i.channel_id[0]*o,n.danmu.config.area&&n.danmu.config.area.start&&(i.top+=n.containerHeight*n.danmu.config.area.start),i.topInit();}i.resized||(i.pauseMove(n.containerPos,t),i.startMove(n.containerPos),i.resized=!0);}});},u=0;u<n.channels.length;u++)c(u);for(var l=function(t){["scroll","top","bottom"].forEach(function(e){a[t].queue[e].forEach(function(t){t.resized=!1;});});},h=0;h<a.length;h++)l(h);n.channels=a,"b2t"===n.direction?n.channelWidth=o:n.channelHeight=o;}else if(n.channels&&n.channels.length>a.length){for(var f=function(e){a[e]={id:e,queue:{scroll:[],top:[],bottom:[]},operating:{scroll:!1,top:!1,bottom:!1},bookId:{}},["scroll","top","bottom"].forEach(function(i){if("top"===i&&e>Math.floor(a.length/2));else if("bottom"===i&&e<=Math.floor(a.length/2));else{var r="bottom"===i?e-a.length+n.channels.length:e;n.channels[r].queue[i].forEach(function(s,c){if(s.el){if(a[e].queue[i].push(s),"bottom"===i&&s.channel_id[0]+s.channel_id[1]-1===r){var u=[].concat(s.channel_id);s.channel_id=[u[0]-n.channels.length+a.length,u[1]],s.top=s.channel_id[0]*o,n.danmu.config.area&&n.danmu.config.area.start&&(s.top+=n.containerHeight*n.danmu.config.area.start),s.topInit();}s.resized||(s.pauseMove(n.containerPos,t),s.startMove(n.containerPos),s.resized=!0);}n.channels[r].queue[i].splice(c,1);});}});},d=0;d<a.length;d++)f(d);for(var p=function(t){["scroll","top","bottom"].forEach(function(e){n.channels[t].queue[e].forEach(function(t){t.pauseMove(n.containerPos),t.remove();});});},m=a.length;m<n.channels.length;m++)p(m);for(var g=function(t){["scroll","top","bottom"].forEach(function(e){a[t].queue[e].forEach(function(t){t.resized=!1;});});},v=0;v<a.length;v++)g(v);n.channels=a,"b2t"===n.direction?n.channelWidth=o:n.channelHeight=o;}},10);}},{key:"addBullet",value:function(t){var e=this.danmu,n=this.channels,i=void 0,o=void 0,r=void 0;if("b2t"===this.direction?(o=this.channelWidth,r=Math.ceil(t.width/o)):(i=this.channelHeight,r=Math.ceil(t.height/i)),r>n.length)return {result:!1,message:"exceed channels.length, occupy="+r+",channelsSize="+n.length};for(var a=!0,s=void 0,c=-1,u=0,l=n.length;u<l;u++)if(n[u].queue[t.mode].some(function(e){return e.id===t.id}))return {result:!1,message:"exsited, channelOrder="+u+",danmu_id="+t.id};if("scroll"===t.mode)for(var h=0,f=n.length-r;h<=f;h++){a=!0;for(var d=h;d<h+r;d++){if((s=n[d]).operating.scroll){a=!1;break}if((s.bookId.scroll||t.prior)&&s.bookId.scroll!==t.id){a=!1;break}s.operating.scroll=!0;var p=s.queue.scroll[0];if(p){var m=p.el.getBoundingClientRect();if("b2t"===this.direction){if(m.bottom>this.containerPos.bottom){a=!1,s.operating.scroll=!1;break}}else if(m.right>this.containerPos.right){a=!1,s.operating.scroll=!1;break}var g,v=void 0,b=void 0,y=void 0,w=void 0;if("b2t"===this.direction?(b=(m.top-this.containerPos.top+m.height)/(v=(this.containerPos.height+m.height)/p.duration),y=this.containerPos.height,w=(this.containerPos.height+t.height)/t.duration):(b=(m.left-this.containerPos.left+m.width)/(v=(this.containerPos.width+m.width)/p.duration),y=this.containerPos.width,w=(this.containerPos.width+t.width)/t.duration),g=y/w,e.config.bOffset||(e.config.bOffset=0),v<w&&b+e.config.bOffset>g){a=!1,s.operating.scroll=!1;break}}s.operating.scroll=!1;}if(a){c=h;break}}else if("top"===t.mode)for(var x=0,k=n.length-r;x<=k;x++){a=!0;for(var _=x;_<x+r;_++){if(_>Math.floor(n.length/2)){a=!1;break}if((s=n[_]).operating[t.mode]){a=!1;break}if((s.bookId[t.mode]||t.prior)&&s.bookId[t.mode]!==t.id){a=!1;break}if(s.operating[t.mode]=!0,s.queue[t.mode].length>0){a=!1,s.operating[t.mode]=!1;break}s.operating[t.mode]=!1;}if(a){c=x;break}}else if("bottom"===t.mode)for(var M=n.length-r;M>=0;M--){a=!0;for(var O=M;O<M+r;O++){if(O<=Math.floor(n.length/2)){a=!1;break}if((s=n[O]).operating[t.mode]){a=!1;break}if((s.bookId[t.mode]||t.prior)&&s.bookId[t.mode]!==t.id){a=!1;break}if(s.operating[t.mode]=!0,s.queue[t.mode].length>0){a=!1,s.operating[t.mode]=!1;break}s.operating[t.mode]=!1;}if(a){c=M;break}}if(-1!==c){for(var C=c,j=c+r;C<j;C++)(s=n[C]).operating[t.mode]=!0,s.queue[t.mode].unshift(t),t.prior&&delete s.bookId[t.mode],s.operating[t.mode]=!1;if(t.prior)delete t.bookChannelId,e.bulletBtn.main.data.some(function(e){return e.id===t.id&&(delete e.bookChannelId,!0)});return t.channel_id=[c,r],"b2t"===this.direction?(t.top=c*o,this.danmu.config.area&&this.danmu.config.area.start&&(t.top+=this.containerWidth*this.danmu.config.area.start)):(t.top=c*i,this.danmu.config.area&&this.danmu.config.area.start&&(t.top+=this.containerHeight*this.danmu.config.area.start)),{result:t,message:"success"}}if(t.prior)if(t.bookChannelId){e.bulletBtn.main.data.some(function(e){return e.id===t.id&&(e.start+=2e3,!0)});}else{c=-1;for(var E=0,P=n.length-r;E<=P;E++){a=!0;for(var T=E;T<E+r;T++)if(n[T].bookId[t.mode]){a=!1;break}if(a){c=E;break}}if(-1!==c){for(var B=c;B<c+r;B++)n[B].bookId[t.mode]=t.id;e.bulletBtn.main.data.some(function(e){return e.id===t.id&&(e.start+=2e3,e.bookChannelId=[c,r],!0)});}}return {result:!1,message:"no surplus will right"}}},{key:"removeBullet",value:function(t){for(var e=this.channels,n=t.channel_id,i=void 0,o=n[0],r=n[0]+n[1];o<r;o++)if(i=e[o]){i.operating[t.mode]=!0;var a=-1;i.queue[t.mode].some(function(e,n){return e.id===t.id&&(a=n,!0)}),a>-1&&i.queue[t.mode].splice(a,1),i.operating[t.mode]=!1;}}},{key:"resetArea",value:function(){var t=this.danmu.container,e=this,n=t.getBoundingClientRect();e.width=n.width,e.height=n.height,e.danmu.config.area&&e.danmu.config.area.start>=0&&e.danmu.config.area.end>=e.danmu.config.area.start&&("b2t"===e.direction?e.width=e.width*(e.danmu.config.area.end-e.danmu.config.area.start):e.height=e.height*(e.danmu.config.area.end-e.danmu.config.area.start)),e.container=t;var i=/mobile/gi.test(navigator.userAgent)?10:12,o=void 0;o="b2t"===e.direction?Math.floor(e.width/i):Math.floor(e.height/i);for(var r=[],a=0;a<o;a++)r[a]={id:a,queue:{scroll:[],top:[],bottom:[]},operating:{scroll:!1,top:!1,bottom:!1},bookId:{}};if(e.channels&&e.channels.length<=r.length){for(var s=function(t){r[t]={id:t,queue:{scroll:[],top:[],bottom:[]},operating:{scroll:!1,top:!1,bottom:!1},bookId:{}},["scroll","top"].forEach(function(n){e.channels[t].queue[n].forEach(function(i){i.el&&(r[t].queue[n].push(i),i.resized||(i.pauseMove(e.containerPos,!1),i.startMove(e.containerPos),i.resized=!0));});}),e.channels[t].queue.bottom.forEach(function(n){if(n.el){if(r[t+r.length-e.channels.length].queue.bottom.push(n),n.channel_id[0]+n.channel_id[1]-1===t){var o=[].concat(n.channel_id);n.channel_id=[o[0]-e.channels.length+r.length,o[1]],n.top=n.channel_id[0]*i,e.danmu.config.area&&e.danmu.config.area.start&&(n.top+=e.containerHeight*e.danmu.config.area.start),n.topInit();}n.resized||(n.pauseMove(e.containerPos,!1),n.startMove(e.containerPos),n.resized=!0);}});},c=0;c<e.channels.length;c++)s(c);for(var u=function(t){["scroll","top","bottom"].forEach(function(e){r[t].queue[e].forEach(function(t){t.resized=!1;});});},l=0;l<r.length;l++)u(l);e.channels=r,"b2t"===e.direction?e.channelWidth=i:e.channelHeight=i;}else if(e.channels&&e.channels.length>r.length){for(var h=function(t){r[t]={id:t,queue:{scroll:[],top:[],bottom:[]},operating:{scroll:!1,top:!1,bottom:!1},bookId:{}},["scroll","top","bottom"].forEach(function(n){if("top"===n&&t>Math.floor(r.length/2));else if("bottom"===n&&t<=Math.floor(r.length/2));else{var o="bottom"===n?t-r.length+e.channels.length:t;e.channels[o].queue[n].forEach(function(a,s){if(a.el){if(r[t].queue[n].push(a),"bottom"===n&&a.channel_id[0]+a.channel_id[1]-1===o){var c=[].concat(a.channel_id);a.channel_id=[c[0]-e.channels.length+r.length,c[1]],a.top=a.channel_id[0]*i,e.danmu.config.area&&e.danmu.config.area.start&&(a.top+=e.containerHeight*e.danmu.config.area.start),a.topInit();}a.resized||(a.pauseMove(e.containerPos,!1),a.startMove(e.containerPos),a.resized=!0);}e.channels[o].queue[n].splice(s,1);});}});},f=0;f<r.length;f++)h(f);for(var d=function(t){["scroll","top","bottom"].forEach(function(e){r[t].queue[e].forEach(function(t){t.resized=!1;});});},p=0;p<r.length;p++)d(p);e.channels=r,"b2t"===e.direction?e.channelWidth=i:e.channelHeight=i;}}},{key:"reset",value:function(){var t=this.danmu.container,e=this;e.channels&&e.channels.length>0&&["scroll","top","bottom"].forEach(function(t){for(var n=0;n<e.channels.length;n++)e.channels[n].queue[t].forEach(function(t){t.pauseMove(e.containerPos),t.remove();});}),setTimeout(function(){var n=t.getBoundingClientRect();e.width=n.width,e.height=n.height,e.danmu.config.area&&e.danmu.config.area.start>=0&&e.danmu.config.area.end>=e.danmu.config.area.start&&("b2t"===e.direction?e.width=e.width*(e.danmu.config.area.end-e.danmu.config.area.start):e.height=e.height*(e.danmu.config.area.end-e.danmu.config.area.start)),e.container=t;var i=/mobile/gi.test(navigator.userAgent)?10:12,o=void 0;o="b2t"===e.direction?Math.floor(e.width/i):Math.floor(e.height/i);for(var r=[],a=0;a<o;a++)r[a]={id:a,queue:{scroll:[],top:[],bottom:[]},operating:{scroll:!1,top:!1,bottom:!1},bookId:{}};e.channels=r,"b2t"===e.direction?e.channelWidth=i:e.channelHeight=i;},200);}},{key:"resetWithCb",value:function(t,e){var n=this.danmu.container,i=this;i.channels&&i.channels.length>0&&["scroll","top","bottom"].forEach(function(t){for(var e=0;e<i.channels.length;e++)i.channels[e].queue[t].forEach(function(t){t.pauseMove(i.containerPos),t.remove();});});var o=n.getBoundingClientRect();i.width=o.width,i.height=o.height,i.danmu.config.area&&i.danmu.config.area.start>=0&&i.danmu.config.area.end>=i.danmu.config.area.start&&("b2t"===i.direction?i.width=i.width*(i.danmu.config.area.end-i.danmu.config.area.start):i.height=i.height*(i.danmu.config.area.end-i.danmu.config.area.start)),i.container=n;var r=/mobile/gi.test(navigator.userAgent)?10:12,a=void 0;a="b2t"===i.direction?Math.floor(i.width/r):Math.floor(i.height/r);for(var s=[],c=0;c<a;c++)s[c]={id:c,queue:{scroll:[],top:[],bottom:[]},operating:{scroll:!1,top:!1,bottom:!1},bookId:{}};i.channels=s,i.channelHeight=r,t&&t(!0,e);}}]),t}();e.default=o,t.exports=e.default;},function(t,e,n){Object.defineProperty(e,"__esModule",{value:!0});var i,o=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i);}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=n(0),a=(i=r)&&i.__esModule?i:{default:i};var s=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.danmu=e,this.duration=n.duration,this.id=n.id,this.container=e.container,this.start=n.start,this.prior=n.prior,this.color=n.color,this.bookChannelId=n.bookChannelId,this.direction=e.direction;var i=this;this.danmu.on("changeDirection",function(t){i.direction=t;});var o=void 0;if(this.domObj=a.default.domObj,n.el&&1===n.el.nodeType)(o=this.domObj.use()).appendChild(a.default.copyDom(n.el));else if((o=this.domObj.use()).textContent=n.txt,n.style){var r=n.style;Object.keys(r).forEach(function(t){o.style[t]=r[t];});}"top"===n.mode||"bottom"===n.mode?this.mode=n.mode:this.mode="scroll",this.el=o,this.status="waiting";var s=this.container.getBoundingClientRect();this.el.style.left=s.width+"px";}return o(t,[{key:"attach",value:function(){this.container.appendChild(this.el),this.elPos=this.el.getBoundingClientRect(),"b2t"===this.direction?(this.width=this.elPos.height,this.height=this.elPos.width):(this.width=this.elPos.width,this.height=this.elPos.height);}},{key:"detach",value:function(){this.container&&this.el&&(this.domObj.unuse(this.el),this.container.removeChild(this.el));var t=this;this.danmu.off("changeDirection",function(e){t.direction=e;}),this.el=null;}},{key:"topInit",value:function(){if("b2t"===this.direction){var t=this.container.getBoundingClientRect();this.el.style.transformOrigin="left top",this.el.style.transform="translateX(-"+this.top+"px) translateY("+t.height+"px) translateZ(0px) rotate(90deg)",this.el.style.transition="transform 0s linear 0s";}else this.el.style.top=this.top+"px";}},{key:"pauseMove",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if("paused"!==this.status&&(this.status="paused",clearTimeout(this.removeTimer),this.el))if(this.el.style.willChange="auto","scroll"===this.mode){if(e){var n=((new Date).getTime()-this.moveTime)/1e3*this.moveV,i=0;i=this.moveMoreS-n>=0?"b2t"===this.direction?(this.moveMoreS-n)/this.moveContainerHeight*t.height:(this.moveMoreS-n)/this.moveContainerWidth*t.width:this.moveMoreS-n,"b2t"===this.direction?this.el.style.transform="translateX(-"+this.top+"px) translateY("+i+"px) translateZ(0px) rotate(90deg)":this.el.style.left=i+"px";}else"b2t"===this.direction?this.el.style.transform="translateX(-"+this.top+"px) translateY("+(this.el.getBoundingClientRect().top-t.top)+"px) translateZ(0px) rotate(90deg)":this.el.style.left=this.el.getBoundingClientRect().left-t.left+"px";"b2t"===this.direction?this.el.style.transition="transform 0s linear 0s":(this.el.style.transform="translateX(0px) translateY(0px) translateZ(0px)",this.el.style.transition="transform 0s linear 0s");}else this.pastDuration&&this.startTime?this.pastDuration=this.pastDuration+(new Date).getTime()-this.startTime:this.pastDuration=1;}},{key:"startMove",value:function(t){var e=this;if(this.el&&"start"!==this.status)if(this.status="start",this.el.style.willChange="transform","scroll"===this.mode)if("b2t"===this.direction){this.moveV=(t.height+this.height)/this.duration*1e3;var n=(e.el.getBoundingClientRect().bottom-t.top)/this.moveV;this.el.style.transition="transform "+n+"s linear 0s",setTimeout(function(){e.el&&(e.el.style.transform="translateX(-"+e.top+"px) translateY(-"+e.height+"px) translateZ(0px) rotate(90deg)",e.moveTime=(new Date).getTime(),e.moveMoreS=e.el.getBoundingClientRect().top-t.top,e.moveContainerHeight=t.height,e.removeTimer=setTimeout(r,1e3*n));},20);}else{this.moveV=(t.width+this.width)/this.duration*1e3;var i=(e.el.getBoundingClientRect().right-t.left)/this.moveV;this.el.style.transition="transform "+i+"s linear 0s",setTimeout(function(){e.el&&(e.el.style.transform="translateX(-"+(e.el.getBoundingClientRect().right-t.left)+"px) translateY(0px) translateZ(0px)",e.moveTime=(new Date).getTime(),e.moveMoreS=e.el.getBoundingClientRect().left-t.left,e.moveContainerWidth=t.width,e.removeTimer=setTimeout(r,1e3*i));},20);}else{this.el.style.left="50%",this.el.style.margin="0 0 0 -"+this.width/2+"px",this.pastDuration||(this.pastDuration=1);var o=this.duration>=this.pastDuration?this.duration-this.pastDuration:0;this.removeTimer=setTimeout(r,o),this.startTime=(new Date).getTime();}function r(){if(e.el)if("scroll"===e.mode){var t=e.danmu.container.getBoundingClientRect(),n=e.el.getBoundingClientRect();"b2t"===e.direction?n&&n.bottom<=t.top+100?(e.status="end",e.remove()):(e.pauseMove(t),e.startMove(t)):n&&n.right<=t.left+100?(e.status="end",e.remove()):(e.pauseMove(t),e.startMove(t));}else e.status="end",e.remove();}}},{key:"remove",value:function(){var t=this;(this.removeTimer&&clearTimeout(this.removeTimer),t.el&&t.el.parentNode)&&(t.el.style.willChange="auto",this.danmu.off("changeDirection",function(e){t.direction=e;}),this.domObj.unuse(t.el),t.el.parentNode.removeChild(t.el),t.el=null,t.danmu.emit("bullet_remove",{bullet:t}));}}]),t}();e.default=s,t.exports=e.default;},function(t,e,n){var i=n(27);"string"==typeof i&&(i=[[t.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(29)(i,o);i.locals&&(t.exports=i.locals);},function(t,e,n){(t.exports=n(28)(!1)).push([t.i,".danmu{overflow:hidden;-webkit-user-select:none;-moz-user-select:none;user-select:none;-ms-user-select:none}.danmu>*{position:absolute;white-space:nowrap}.danmu-switch{width:32px;height:20px;border-radius:100px;background-color:#ccc;-webkit-box-sizing:border-box;box-sizing:border-box;outline:none;cursor:pointer;position:relative;text-align:center;margin:10px auto}.danmu-switch.danmu-switch-active{padding-left:12px;background-color:#f85959}.danmu-switch span.txt{width:20px;height:20px;line-height:20px;text-align:center;display:block;border-radius:100px;background-color:#ffffff;-webkit-box-shadow:-2px 0 0 0 rgba(0, 0, 0, .04);box-shadow:-2px 0 0 0 rgba(0, 0, 0, .04);font-family:PingFangSC;font-size:10px;font-weight:500;color:#f44336}\n",""]);},function(t,e){t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=function(t,e){var n=t[1]||"",i=t[3];if(!i)return n;if(e&&"function"==typeof btoa){var o=(a=i,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),r=i.sources.map(function(t){return "/*# sourceURL="+i.sourceRoot+t+" */"});return [n].concat(r).concat([o]).join("\n")}var a;return [n].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var i={},o=0;o<this.length;o++){var r=this[o][0];"number"==typeof r&&(i[r]=!0);}for(o=0;o<t.length;o++){var a=t[o];"number"==typeof a[0]&&i[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a));}},e};},function(t,e,n){var i,o,r={},a=(i=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=i.apply(this,arguments)),o}),s=function(t){var e={};return function(t){if("function"==typeof t)return t();if(void 0===e[t]){var n=function(t){return document.querySelector(t)}.call(this,t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head;}catch(t){n=null;}e[t]=n;}return e[t]}}(),c=null,u=0,l=[],h=n(30);function f(t,e){for(var n=0;n<t.length;n++){var i=t[n],o=r[i.id];if(o){o.refs++;for(var a=0;a<o.parts.length;a++)o.parts[a](i.parts[a]);for(;a<i.parts.length;a++)o.parts.push(b(i.parts[a],e));}else{var s=[];for(a=0;a<i.parts.length;a++)s.push(b(i.parts[a],e));r[i.id]={id:i.id,refs:1,parts:s};}}}function d(t,e){for(var n=[],i={},o=0;o<t.length;o++){var r=t[o],a=e.base?r[0]+e.base:r[0],s={css:r[1],media:r[2],sourceMap:r[3]};i[a]?i[a].parts.push(s):n.push(i[a]={id:a,parts:[s]});}return n}function p(t,e){var n=s(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var i=l[l.length-1];if("top"===t.insertAt)i?i.nextSibling?n.insertBefore(e,i.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),l.push(e);else if("bottom"===t.insertAt)n.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=s(t.insertInto+" "+t.insertAt.before);n.insertBefore(e,o);}}function m(t){if(null===t.parentNode)return !1;t.parentNode.removeChild(t);var e=l.indexOf(t);e>=0&&l.splice(e,1);}function g(t){var e=document.createElement("style");return void 0===t.attrs.type&&(t.attrs.type="text/css"),v(e,t.attrs),p(t,e),e}function v(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n]);});}function b(t,e){var n,i,o,r;if(e.transform&&t.css){if(!(r=e.transform(t.css)))return function(){};t.css=r;}if(e.singleton){var a=u++;n=c||(c=g(e)),i=x.bind(null,n,a,!1),o=x.bind(null,n,a,!0);}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(t){var e=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",v(e,t.attrs),p(t,e),e}(e),i=function(t,e,n){var i=n.css,o=n.sourceMap,r=void 0===e.convertToAbsoluteUrls&&o;(e.convertToAbsoluteUrls||r)&&(i=h(i));o&&(i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var a=new Blob([i],{type:"text/css"}),s=t.href;t.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s);}.bind(null,n,e),o=function(){m(n),n.href&&URL.revokeObjectURL(n.href);}):(n=g(e),i=function(t,e){var n=e.css,i=e.media;i&&t.setAttribute("media",i);if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n));}}.bind(null,n),o=function(){m(n);});return i(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;i(t=e);}else o();}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=a()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=d(t,e);return f(n,e),function(t){for(var i=[],o=0;o<n.length;o++){var a=n[o];(s=r[a.id]).refs--,i.push(s);}t&&f(d(t,e),e);for(o=0;o<i.length;o++){var s;if(0===(s=i[o]).refs){for(var c=0;c<s.parts.length;c++)s.parts[c]();delete r[s.id];}}}};var y,w=(y=[],function(t,e){return y[t]=e,y.filter(Boolean).join("\n")});function x(t,e,n,i){var o=n?"":i.css;if(t.styleSheet)t.styleSheet.cssText=w(e,o);else{var r=document.createTextNode(o),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(r,a[e]):t.appendChild(r);}}},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,i=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var o,r=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(r)?t:(o=0===r.indexOf("//")?r:0===r.indexOf("/")?n+r:i+r.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})};}])});

	});

	var DanmuJs = unwrapExports(dist);

	var PanelIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 40 40\" width=\"40\" height=\"40\">\n  <path fill=\"#f85959\" transform=\"scale(0.8 0.8)\" d=\"M36.5,18.73a1.19,1.19,0,0,0,1-1.14V16.33a1.2,1.2,0,0,0-1-1.13l-.61-.08a1.75,1.75,0,0,1-1.3-.86l-.21-.36-.2-.36A1.72,1.72,0,0,1,34,12l.23-.58a1.18,1.18,0,0,0-.5-1.42l-1.1-.62a1.18,1.18,0,0,0-1.47.3l-.39.51a1.82,1.82,0,0,1-1.41.72c-.44,0-1.88-.27-2.22-.7l-.39-.49a1.18,1.18,0,0,0-1.48-.28l-1.09.64a1.19,1.19,0,0,0-.47,1.43l.25.59a1.87,1.87,0,0,1-.08,1.58c-.26.37-1.17,1.5-1.71,1.58l-.63.09a1.19,1.19,0,0,0-1,1.14l0,1.27a1.17,1.17,0,0,0,1,1.12l.61.08a1.74,1.74,0,0,1,1.3.87l.21.36.2.35A1.69,1.69,0,0,1,24,22.08l-.23.59a1.19,1.19,0,0,0,.5,1.42l1.1.62a1.19,1.19,0,0,0,1.48-.31l.38-.5a1.83,1.83,0,0,1,1.41-.72c.44,0,1.88.25,2.22.69l.39.49a1.18,1.18,0,0,0,1.48.28L33.86,24a1.19,1.19,0,0,0,.47-1.43L34.09,22a1.84,1.84,0,0,1,.07-1.58c.26-.37,1.17-1.5,1.72-1.58ZM31,18.94a2.76,2.76,0,0,1-4.65-1.2A2.71,2.71,0,0,1,27,15.13a2.76,2.76,0,0,1,4.64,1.2A2.7,2.7,0,0,1,31,18.94Z\"/>\n  <path fill=\"#f85959\" transform=\"scale(0.8 0.8)\" d=\"M32,0H3.59A3.59,3.59,0,0,0,0,3.59v17A3.59,3.59,0,0,0,3.59,24.2H19.72a12.59,12.59,0,0,1-.81-1.2A11.73,11.73,0,0,1,35.54,7.28V3.59A3.59,3.59,0,0,0,32,0ZM13,14.18H4.29a1.52,1.52,0,0,1,0-3H13a1.52,1.52,0,0,1,0,3ZM16.45,8H4.29a1.51,1.51,0,0,1,0-3H16.45a1.51,1.51,0,1,1,0,3Z\"/>\n</svg>\n";

	var s_danmu = function s_danmu() {
	  var player = this;
	  var root = player.root;
	  var util = Player.util;
	  if (!player.config.danmu) {
	    return;
	  }
	  var container = util.createDom('xg-danmu', '', {}, 'xgplayer-danmu');
	  player.once('ready', function () {
	    root.appendChild(container);
	  });
	  var config = util.deepCopy({
	    container: container,
	    player: player.video,
	    comments: [],
	    area: {
	      start: 0,
	      end: 1
	    }
	  }, player.config.danmu);
	  var panelBtn = void 0;
	  if (player.config.danmu.panel) {
	    panelBtn = Player.util.createDom('xg-panel', '<xg-panel-icon class="xgplayer-panel-icon">\n                                                ' + PanelIcon + '\n                                              </xg-panel-icon>\n                                              <xg-panel-slider class="xgplayer-panel-slider">\n                                                <xg-hidemode class="xgplayer-hidemode">\n                                                  <p class="xgplayer-hidemode-font">\u5C4F\u853D\u7C7B\u578B</p>\n                                                  <ul class="xgplayer-hidemode-radio">\n                                                    <li class="xgplayer-hidemode-scroll" id="false">\u6EDA\u52A8</li><li class="xgplayer-hidemode-top" id="false">\u9876\u90E8</li><li class="xgplayer-hidemode-bottom" id="false">\u5E95\u90E8</li><li class="xgplayer-hidemode-color" id="false">\u8272\u5F69</li>\n                                                  </ul>\n                                                </xg-hidemode>\n                                                <xg-transparency class="xgplayer-transparency">\n                                                  <span>\u4E0D\u900F\u660E\u5EA6</span>\n                                                  <input class="xgplayer-transparency-line xgplayer-transparency-color xgplayer-transparency-bar xgplayer-transparency-gradient" type="range" min="0" max="100" step="0.1" value="50"></input>\n                                                </xg-transparency>\n                                                <xg-showarea class="xgplayer-showarea">\n                                                  <div class="xgplayer-showarea-name">\u663E\u793A\u533A\u57DF</div>\n                                                  <div class="xgplayer-showarea-control">\n                                                    <div class="xgplayer-showarea-control-up">\n                                                      <span class="xgplayer-showarea-control-up-item xgplayer-showarea-onequarters">1/4</span>\n                                                      <span class="xgplayer-showarea-control-up-item xgplayer-showarea-twoquarters selected-color">1/2</span>\n                                                      <span class="xgplayer-showarea-control-up-item xgplayer-showarea-threequarters">3/4</span>\n                                                      <span class="xgplayer-showarea-control-up-item xgplayer-showarea-full">1</span>\n                                                    </div>\n                                                    <div class="xgplayer-showarea-control-down">\n                                                      <div class="xgplayer-showarea-control-down-dots">\n                                                        <span class="xgplayer-showarea-onequarters-dot"></span>\n                                                        <span class="xgplayer-showarea-twoquarters-dot"></span>\n                                                        <span class="xgplayer-showarea-threequarters-dot"></span>\n                                                        <span class="xgplayer-showarea-full-dot"></span>\n                                                      </div>\n                                                      <input class="xgplayer-showarea-line xgplayer-showarea-color xgplayer-showarea-bar xgplayer-gradient" type="range" min="1" max="4" step="1" value="1">\n                                                    </div>\n                                                  </div>\n                                                </xg-showarea>\n                                                <xg-danmuspeed class="xgplayer-danmuspeed">\n                                                  <div class="xgplayer-danmuspeed-name">\u5F39\u5E55\u901F\u5EA6</div>\n                                                  <div class="xgplayer-danmuspeed-control">\n                                                    <div class="xgplayer-danmuspeed-control-up">\n                                                      <span class="xgplayer-danmuspeed-control-up-item xgplayer-danmuspeed-small">\u6162</span>\n                                                      <span class="xgplayer-danmuspeed-control-up-item xgplayer-danmuspeed-middle selected-color">\u4E2D</span>\n                                                      <span class="xgplayer-danmuspeed-control-up-item xgplayer-danmuspeed-large">\u5FEB</span>\n                                                    </div>\n                                                    <div class="xgplayer-danmuspeed-control-down">\n                                                      <div class="xgplayer-danmuspeed-control-down-dots">\n                                                        <span class="xgplayer-danmuspeed-small-dot"></span>\n                                                        <span class="xgplayer-danmuspeed-middle-dot"></span>\n                                                        <span class="xgplayer-danmuspeed-large-dot"></span>\n                                                      </div>\n                                                      <input class="xgplayer-danmuspeed-line xgplayer-danmuspeed-color xgplayer-danmuspeed-bar xgplayer-gradient" type="range" min="50" max="150" step="50" value="100">\n                                                    </div>\n                                                  </div>\n                                                </xg-danmuspeed>\n                                                <xg-danmufont class="xgplayer-danmufont">\n                                                  <div class="xgplayer-danmufont-name">\u5B57\u4F53\u5927\u5C0F</div>\n                                                  <div class="xgplayer-danmufont-control">\n                                                    <div class="xgplayer-danmufont-control-up">\n                                                      <span class="xgplayer-danmufont-control-up-item xgplayer-danmufont-small">\u5C0F</span>\n                                                      <span class="xgplayer-danmufont-control-up-item xgplayer-danmufont-middle">\u4E2D</span>\n                                                      <span class="xgplayer-danmufont-control-up-item xgplayer-danmufont-large selected-color">\u5927</span>\n                                                    </div>\n                                                    <div class="xgplayer-danmufont-control-down">\n                                                      <div class="xgplayer-danmufont-control-down-dots">\n                                                        <span class="xgplayer-danmufont-small-dot"></span>\n                                                        <span class="xgplayer-danmufont-middle-dot"></span>\n                                                        <span class="xgplayer-danmufont-large-dot"></span>\n                                                      </div>\n                                                      <input class="xgplayer-danmufont-line xgplayer-danmufont-color xgplayer-danmufont-bar xgplayer-gradient" type="range" min="20" max="30" step="5" value="25">\n                                                    </div>\n                                                  </div>\n                                                </xg-danmufont>\n                                              </xg-panel-slider>', { tabindex: 7 }, 'xgplayer-panel');
	    player.once('ready', function () {
	      player.controls.appendChild(panelBtn);
	    });
	  }
	  player.once('complete', function () {
	    var danmujs = new DanmuJs(config);
	    player.emit('initDefaultDanmu', danmujs);
	    player.danmu = danmujs;

	    if (!player.config.danmu.panel) {
	      return;
	    }

	    var slider = panelBtn.querySelector('.xgplayer-panel-slider');
	    var focusStatus = void 0;
	    var focusarray = ['mouseenter', 'touchend', 'click'];
	    focusarray.forEach(function (item) {
	      panelBtn.addEventListener(item, function (e) {
	        e.preventDefault();
	        e.stopPropagation();
	        Player.util.addClass(slider, 'xgplayer-panel-active');
	        panelBtn.focus();
	        focusStatus = true;
	      });
	    });
	    panelBtn.addEventListener('mouseleave', function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      Player.util.removeClass(slider, 'xgplayer-panel-active');
	      focusStatus = false;
	    });
	    slider.addEventListener('mouseleave', function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      if (focusStatus === false) {
	        Player.util.removeClass(slider, 'xgplayer-panel-active');
	      }
	    });

	    var danmuConfig = player.config.danmu;
	    var hidemodeScroll = panelBtn.querySelector('.xgplayer-hidemode-scroll');
	    var hidemodeTop = panelBtn.querySelector('.xgplayer-hidemode-top');
	    var hidemodeBottom = panelBtn.querySelector('.xgplayer-hidemode-bottom');
	    var hidemodeColor = panelBtn.querySelector('.xgplayer-hidemode-color');
	    var hidemodeArray = {
	      'scroll': hidemodeScroll,
	      'top': hidemodeTop,
	      'bottom': hidemodeBottom,
	      'color': hidemodeColor
	    };

	    var _loop = function _loop(key) {
	      var keys = key;
	      var ev = ['touchend', 'click'];
	      ev.forEach(function (item) {
	        hidemodeArray[keys].addEventListener(item, function (e) {
	          if (hidemodeArray[keys].getAttribute('id') !== 'true') {
	            hidemodeArray[keys].style.color = '#f85959';
	            hidemodeArray[keys].setAttribute('id', 'true');
	            player.danmu.hide(keys);
	          } else {
	            hidemodeArray[keys].style.color = '#aaa';
	            hidemodeArray[keys].setAttribute('id', 'false');
	            player.danmu.show(keys);
	          }
	        });
	      });
	    };

	    for (var key in hidemodeArray) {
	      _loop(key);
	    }
	    var transparency = panelBtn.querySelector('.xgplayer-transparency-line');
	    var transparencyGradient = panelBtn.querySelector('.xgplayer-transparency-gradient');
	    var transparencyValue = 50;
	    transparencyGradient.style.background = 'linear-gradient(to right, #f85959 0%, #f85959 ' + transparencyValue + '%, #aaa ' + transparencyValue + '%, #aaa)';
	    transparency.addEventListener('input', function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      transparencyValue = e.target.value;
	      transparencyGradient.style.background = 'linear-gradient(to right, #f85959 0%, #f85959 ' + transparencyValue + '%, #aaa ' + transparencyValue + '%, #aaa)';
	      danmuConfig.comments.forEach(function (item) {
	        item.style.opacity = transparencyValue / 100;
	      });
	    });
	    var showarea = panelBtn.querySelector('.xgplayer-showarea-line');
	    showarea.addEventListener('input', function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      var showareaValue = e.target.value;
	      player.danmu.config.area.end = showareaValue / 100;
	      player.config.danmu.area.end = showareaValue / 100;
	      player.danmu.bulletBtn.main.channel.resize();
	    });
	    var danmuspeed = panelBtn.querySelector('.xgplayer-danmuspeed-line');
	    danmuspeed.addEventListener('input', function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      var danmuspeedValue = e.target.value;
	      danmuConfig.comments.forEach(function (item) {
	        item.duration = (200 - danmuspeedValue) * 100;
	      });
	    });
	    var danmufont = panelBtn.querySelector('.xgplayer-danmufont-line');
	    danmufont.addEventListener('input', function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      var danmufontValue = e.target.value;
	      danmuConfig.comments.forEach(function (item) {
	        item.style.fontSize = danmufontValue + 'px';
	      });
	    });
	    if (navigator.userAgent.indexOf("Firefox") > -1) {
	      for (var i = 0; i < slider.querySelectorAll('input').length; i++) {
	        slider.querySelectorAll('input')[i].style.marginTop = '10px';
	      }
	    }
	  });
	};

	Player.install('s_danmu', s_danmu);

	var s_pip = function s_pip() {
	  var player = this;
	  var util = Player.util;
	  if (!player.config.pip) {
	    return;
	  }
	  var pip = player.lang.PIP;
	  var btn = util.createDom('xg-pip', '<p class="name"><span>' + pip + '</span></p>', { tabindex: 9 }, 'xgplayer-pip');

	  player.once('ready', function () {
	    player.controls.appendChild(btn);
	  });

	  ['click', 'touchend'].forEach(function (item) {
	    btn.addEventListener(item, function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      player.emit('pipBtnClick');
	    });
	  });
	};

	Player.install('s_pip', s_pip);

	var PlayNextIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\">\n  <path transform=\"scale(0.038 0.028)\" d=\"M800 380v768h-128v-352l-320 320v-704l320 320v-352z\"></path>\n</svg>\n";

	var s_playNext = function s_playNext() {
	  var player = this;
	  var util = Player.util;
	  var nextBtn = player.config.playNext;
	  if (!nextBtn || !nextBtn.urlList) {
	    return;
	  }
	  var btn = util.createDom('xg-playnext', '<xg-icon class="xgplayer-icon">' + PlayNextIcon + '</xg-icon>', {}, 'xgplayer-playnext');
	  var tipsText = player.lang.PLAYNEXT_TIPS;
	  var tips = util.createDom('xg-tips', '<span class="xgplayer-tip-playnext">' + tipsText + '</span>', {}, 'xgplayer-tips');
	  btn.appendChild(tips);
	  player.once('ready', function () {
	    player.controls.appendChild(btn);
	  });

	  ['click', 'touchend'].forEach(function (item) {
	    btn.addEventListener(item, function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      player.emit('playNextBtnClick');
	    });
	  });
	};

	Player.install('s_playNext', s_playNext);

	var RotateIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 40 40\" fill=\"none\">\n  <g clip-path=\"url(#clip0)\">\n    <path transform=\"scale(1.5 1.5)\" d=\"M11.6665 9.16663H4.1665C2.78579 9.16663 1.6665 10.2859 1.6665 11.6666V15.8333C1.6665 17.214 2.78579 18.3333 4.1665 18.3333H11.6665C13.0472 18.3333 14.1665 17.214 14.1665 15.8333V11.6666C14.1665 10.2859 13.0472 9.16663 11.6665 9.16663Z\" fill=\"white\"/>\n    <path transform=\"scale(1.5 1.5)\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.88148 4.06298C3.75371 4.21005 3.67667 4.40231 3.67749 4.61242C3.67847 4.87253 3.79852 5.10435 3.98581 5.25646L6.99111 8.05895C7.32771 8.37283 7.85502 8.35443 8.16891 8.01782C8.48279 7.68122 8.46437 7.15391 8.12778 6.84003L6.62061 5.43457L9.8198 5.4224C9.82848 5.42239 9.8372 5.42221 9.84591 5.4219C10.9714 5.38233 12.0885 5.6285 13.0931 6.13744C14.0976 6.64635 14.957 7.40148 15.5908 8.33234C16.2246 9.2632 16.6122 10.3394 16.7177 11.4606C16.823 12.5819 16.6427 13.7115 16.1934 14.7442C16.0098 15.1661 16.203 15.6571 16.6251 15.8408C17.0471 16.0243 17.5381 15.8311 17.7216 15.4091C18.2833 14.1183 18.5087 12.7063 18.3771 11.3047C18.2453 9.90318 17.7607 8.55792 16.9684 7.39433C16.1761 6.23073 15.1021 5.28683 13.8463 4.65065C12.5946 4.01651 11.203 3.70872 9.80072 3.75583L6.43415 3.76862L7.96326 2.12885C8.27715 1.79225 8.25872 1.26494 7.92213 0.951061C7.58553 0.63718 7.05822 0.655585 6.74433 0.99219L3.90268 4.0395C3.89545 4.04724 3.88841 4.05509 3.88154 4.06303L3.88148 4.06298Z\" fill=\"white\"/>\n  </g>\n  <defs>\n    <clipPath id=\"clip0\">\n      <rect width=\"40\" height=\"40\" fill=\"white\"/>\n    </clipPath>\n  </defs>\n</svg>\n";

	var s_rotate = function s_rotate() {
	  var player = this;
	  var util = Player.util;
	  if (!player.config.rotate) {
	    return;
	  }
	  var btn = util.createDom('xg-rotate', '<xg-icon class="xgplayer-icon">' + RotateIcon + '</xg-icon>', {}, 'xgplayer-rotate');

	  var tipsText = player.lang.ROTATE_TIPS;
	  var tips = util.createDom('xg-tips', '<span class="xgplayer-tip-rotate">' + tipsText + '</span>', {}, 'xgplayer-tips');
	  btn.appendChild(tips);
	  player.once('ready', function () {
	    player.controls.appendChild(btn);
	  });

	  ['click', 'touchend'].forEach(function (item) {
	    btn.addEventListener(item, function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      player.emit('rotateBtnClick');
	    });
	  });
	};

	Player.install('s_rotate', s_rotate);

	var s_screenShot = function s_screenShot() {
	  var player = this;
	  var util = Player.util;
	  if (!player.config.screenShot) {
	    return;
	  }
	  var screenShotText = player.lang.SCREENSHOT;
	  var btn = util.createDom('xg-screenshot', '<p class="name"><span>' + screenShotText + '</span></p>', { tabindex: 11 }, 'xgplayer-screenshot');
	  player.once('ready', function () {
	    player.controls.appendChild(btn);
	  });

	  ['click', 'touchend'].forEach(function (item) {
	    btn.addEventListener(item, function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      player.emit('screenShotBtnClick');
	    });
	  });
	};

	Player.install('s_screenShot', s_screenShot);

	var s_textTrack = function s_textTrack() {
	  if (navigator.userAgent.indexOf('Chrome') < 0) {
	    return;
	  }
	  var player = this;
	  var root = player.root;
	  var util = Player.util;
	  var controls = player.controls;
	  var container = util.createDom('xg-texttrack', '', { tabindex: 7 }, 'xgplayer-texttrack');
	  var list = player.config.textTrack;
	  if (list && Array.isArray(list) && list.length > 1) {
	    util.addClass(player.root, 'xgplayer-is-texttrack');
	    player.on('canplay', function () {
	      var tmp = ['<ul>'];
	      tmp.push('<li class=\'\'}\'>\u5173\u95ED</li>');
	      list.forEach(function (item) {
	        tmp.push('<li class=\'' + (item.default ? 'selected' : '') + '\'>' + item.label + '</li>');
	      });
	      var controlText = player.lang.TEXTTRACK;
	      tmp.push('</ul><p class="name"><em>' + controlText + '</em></p>');

	      var urlInRoot = root.querySelector('.xgplayer-texttrack');
	      if (urlInRoot) {
	        urlInRoot.innerHTML = tmp.join('');
	        var cur = urlInRoot.querySelector('.name');
	        if (!player.config.textTrackActive || player.config.textTrackActive === 'hover') {
	          cur.addEventListener('mouseenter', function (e) {
	            e.preventDefault();
	            e.stopPropagation();
	            util.addClass(root, 'xgplayer-texttrack-active');
	            urlInRoot.focus();
	          });
	        }
	      } else {
	        container.innerHTML = tmp.join('');
	        var _cur = container.querySelector('.name');
	        if (!player.config.textTrackActive || player.config.textTrackActive === 'hover') {
	          _cur.addEventListener('mouseenter', function (e) {
	            e.preventDefault();
	            e.stopPropagation();
	            util.addClass(player.root, 'xgplayer-texttrack-active');
	            container.focus();
	          });
	        }
	        player.controls.appendChild(container);
	      }
	    });
	  }
	  ['touchend', 'click'].forEach(function (item) {
	    container.addEventListener(item, function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      var li = e.target || e.srcElement;
	      if (li && li.tagName.toLocaleLowerCase() === 'li') {
	        Array.prototype.forEach.call(li.parentNode.childNodes, function (item) {
	          util.removeClass(item, 'selected');
	        });
	        util.addClass(li, 'selected');
	        var trackDoms = player.root.getElementsByTagName('Track');
	        if (li.innerHTML === '关闭') {
	          trackDoms[0].track.mode = 'hidden';
	          util.removeClass(player.root, 'xgplayer-texttrack-active');
	        } else {
	          if (!util.hasClass(player.root, 'xgplayer-texttrack-active')) {
	            util.addClass(player.root, 'xgplayer-texttrack-active');
	          }
	          trackDoms[0].track.mode = 'showing';

	          list.some(function (item) {
	            if (item.label === li.innerHTML) {
	              trackDoms[0].src = item.src;
	              if (item.kind) {
	                trackDoms[0].kind = item.kind;
	              }
	              trackDoms[0].label = item.label;
	              if (item.srclang) {
	                trackDoms[0].srclang = item.srclang;
	              }
	              return true;
	            }
	          });
	          player.emit('textTrackChange', li.innerHTML);
	        }
	      } else if (player.config.textTrackActive === 'click' && li && (li.tagName.toLocaleLowerCase() === 'p' || li.tagName.toLocaleLowerCase() === 'em')) {
	        util.addClass(player.root, 'xgplayer-texttrack-active');
	        container.focus();
	      }
	    }, false);
	  });

	  container.addEventListener('mouseleave', function (e) {
	    e.preventDefault();
	    e.stopPropagation();
	    util.removeClass(player.root, 'xgplayer-texttrack-active');
	  });
	};

	Player.install('s_textTrack', s_textTrack);

	var s_error = function s_error() {
	  var player = this;
	  var root = player.root;
	  var util = Player.util;

	  var error = util.createDom('xg-error', '<em class="xgplayer-error-text">请<span class="xgplayer-error-refresh">刷新</span>试试</em>', {}, 'xgplayer-error');
	  player.once('ready', function () {
	    root.appendChild(error);
	  });

	  var text = error.querySelector('.xgplayer-error-text');
	  var refresh = null;

	  function onError() {
	    // player.controls.style.display = 'none'
	    if (player.error) {
	      text.innerHTML = player.error;
	    } else {
	      if (player.config.lang && player.config.lang === 'zh-cn') {
	        text.innerHTML = player.lang.ERROR + '\uFF0C\u8BF7<span class="xgplayer-error-refresh">\u5237\u65B0</span>\u8BD5\u8BD5';
	      } else {
	        text.innerHTML = player.lang.ERROR + '\uFF0Cplease try to <span class="xgplayer-error-refresh">refresh</span>';
	      }
	    }
	    util.addClass(player.root, 'xgplayer-is-error');
	    refresh = error.querySelector('.xgplayer-error-refresh');
	    if (refresh) {
	      ['touchend', 'click'].forEach(function (item) {
	        refresh.addEventListener(item, function (e) {
	          e.preventDefault();
	          e.stopPropagation();
	          var p = e.target || e.srcElement;
	          if (p && p.tagName.toLocaleLowerCase() === 'span') {
	            player.controls.style.display = 'flex';
	            player.reload();
	          }
	        });
	      });
	    }
	  }
	  player.on('error', onError);
	  function onDestroy() {
	    player.off('error', onError);
	    player.off('destroy', onDestroy);
	  }
	  player.once('destroy', onDestroy);
	};

	Player.install('s_error', s_error);

	var smemoryPlay = function smemoryPlay() {
	  var player = this;
	  var util = Player.util;
	  var lastPlayTime = player.config.lastPlayTime || 0;
	  var lastPlayTimeHideDelay = player.config.lastPlayTimeHideDelay || 3;
	  var dom = null;
	  if (lastPlayTime <= 0) {
	    return;
	  }
	  dom = util.createDom('xg-memoryplay', '<div class="xgplayer-memoryplay-spot"><div class="xgplayer-progress-tip">\u60A8\u4E0A\u6B21\u89C2\u770B\u5230 <span class="xgplayer-lasttime">' + util.format(lastPlayTime) + '</span> \uFF0C\u4E3A\u60A8\u81EA\u52A8\u7EED\u64AD <span class="btn-close"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg></span></div></div>', {}, 'xgplayer-memoryplay');
	  dom.addEventListener('mouseover', function (e) {
	    e.stopPropagation();
	  });
	  var removeFunc = function removeFunc() {
	    dom && dom.parentNode.removeChild(dom);
	    dom = null;
	  };
	  dom.querySelector('.xgplayer-progress-tip .btn-close').addEventListener('click', removeFunc);
	  var handlePlay = function handlePlay() {
	    player.root.appendChild(dom);
	    player.emit('memoryPlayStart', lastPlayTime);
	    if (lastPlayTimeHideDelay > 0) {
	      setTimeout(function () {
	        removeFunc();
	      }, lastPlayTimeHideDelay * 1000);
	    }
	  };
	  player.once('play', handlePlay);
	  player.once('ended', removeFunc);
	};

	Player.install('s_memoryPlay', smemoryPlay);

	return Player;

})));
//# sourceMappingURL=index.js.map
