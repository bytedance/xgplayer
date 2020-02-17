(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('delegate-events')) :
	typeof define === 'function' && define.amd ? define(['exports', 'delegate-events'], factory) :
	(global = global || self, factory(global.Player = {}, global.delegate));
}(this, (function (exports, delegate) { 'use strict';

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

	let util = {};

	util.createDom = function () {
	  let el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
	  let tpl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	  let attrs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  let cname = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

	  let dom = document.createElement(el);
	  dom.className = cname;
	  dom.innerHTML = tpl;
	  Object.keys(attrs).forEach(item => {
	    let key = item;
	    let value = attrs[item];
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
	    return Array.prototype.some.call(el.classList, item => item === className);
	  } else {
	    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	  }
	};

	util.addClass = function (el, className) {
	  if (!el) {
	    return;
	  }

	  if (el.classList) {
	    className.replace(/(^\s+|\s+$)/g, '').split(/\s+/g).forEach(item => {
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
	    className.split(/\s+/g).forEach(item => {
	      el.classList.remove(item);
	    });
	  } else if (util.hasClass(el, className)) {
	    className.split(/\s+/g).forEach(item => {
	      let reg = new RegExp('(\\s|^)' + item + '(\\s|$)');
	      el.className = el.className.replace(reg, ' ');
	    });
	  }
	};

	util.toggleClass = function (el, className) {
	  if (!el) {
	    return;
	  }

	  className.split(/\s+/g).forEach(item => {
	    if (util.hasClass(el, item)) {
	      util.removeClass(el, item);
	    } else {
	      util.addClass(el, item);
	    }
	  });
	};

	util.findDom = function () {
	  let el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
	  let sel = arguments[1];

	  let dom;
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
	  let charstr = String(pad);
	  let len = length >> 0;
	  let maxlen = Math.ceil(len / charstr.length);
	  let chars = [];
	  let r = String(str);
	  while (maxlen--) {
	    chars.push(charstr);
	  }
	  return chars.join('').substring(0, len - r.length) + r;
	};

	util.format = function (time) {
	  if (window.isNaN(time)) {
	    return '';
	  }
	  let hour = util.padStart(Math.floor(time / 3600), 2, 0);
	  let minute = util.padStart(Math.floor((time - hour * 3600) / 60), 2, 0);
	  let second = util.padStart(Math.floor(time - hour * 3600 - minute * 60), 2, 0);
	  return (hour === '00' ? [minute, second] : [hour, minute, second]).join(':');
	};

	util.event = function (e) {
	  if (e.touches) {
	    let touch = e.touches[0] || e.changedTouches[0];
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
	    Object.keys(src).forEach(key => {
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
	  let url = (el.currentStyle || window.getComputedStyle(el, null)).backgroundImage;
	  if (!url || url === 'none') {
	    return '';
	  }
	  let a = document.createElement('a');
	  a.href = url.replace(/url\("|"\)/g, '');
	  return a.href;
	};

	util.copyDom = function (dom) {
	  if (dom && dom.nodeType === 1) {
	    let back = document.createElement(dom.tagName);
	    Array.prototype.forEach.call(dom.attributes, node => {
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
	  let btn = util.createDom(`xg-${name}`, '', {}, `xgplayer-${name}-img`);
	  btn.style.backgroundImage = `url("${imgUrl}")`;
	  if (width && height) {
	    let w, h, unit;
	    ['px', 'rem', 'em', 'pt', 'dp', 'vw', 'vh', 'vm', '%'].every(item => {
	      if (width.indexOf(item) > -1 && height.indexOf(item) > -1) {
	        w = parseFloat(width.slice(0, width.indexOf(item)).trim());
	        h = parseFloat(height.slice(0, height.indexOf(item)).trim());
	        unit = item;
	        return false;
	      } else {
	        return true;
	      }
	    });
	    btn.style.width = `${w}${unit}`;
	    btn.style.height = `${h}${unit}`;
	    btn.style.backgroundSize = `${w}${unit} ${h}${unit}`;
	    if (name === 'start') {
	      btn.style.margin = `-${h / 2}${unit} auto auto -${w / 2}${unit}`;
	    } else {
	      btn.style.margin = 'auto 5px auto 5px';
	    }
	  }
	  return btn;
	};

	util.Hex2RGBA = function (hex, alpha) {
	  let rgb = []; // 定义rgb数组
	  if (/^\#[0-9A-F]{3}$/i.test(hex)) {
	    let sixHex = '#';
	    hex.replace(/[0-9A-F]/ig, function (kw) {
	      sixHex += kw + kw;
	    });
	    hex = sixHex;
	  }
	  if (/^#[0-9A-F]{6}$/i.test(hex)) {
	    hex.replace(/[0-9A-F]{2}/ig, function (kw) {
	      rgb.push(eval('0x' + kw));
	    });
	    return `rgba(${rgb.join(',')}, ${alpha})`;
	  } else {
	    return 'rgba(255, 255, 255, 0.1)';
	  }
	};

	var version = "3.0.0-rc.0";

	const ErrorTypes = {
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

	class Errors {
	  constructor(type, currentTime, duration, networkState, readyState, src, currentSrc, ended) {
	    let errd = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : { line: '', handle: '', msg: '', version: '' };

	    let r = {};
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
	  }
	}

	class Proxy {
	  constructor(options) {
	    this._hasStart = false;
	    this.videoConfig = {
	      controls: false,
	      autoplay: options.autoplay,
	      playsinline: options.playsinline,
	      'webkit-playsinline': options.playsinline,
	      'x5-playsinline': options.playsinline,
	      'x5-video-player-type': options['x5-video-player-type'],
	      'x5-video-player-fullscreen': options['x5-video-player-fullscreen'],
	      'x5-video-orientation': options['x5-video-orientation'],
	      airplay: options['airplay'],
	      'webkit-airplay': options['airplay'],
	      tabindex: 2,
	      mediaType: options.mediaType || 'video'
	    };
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
	  }

	  _initEvents() {
	    let lastBuffer = '0,0';
	    this.ev = ['play', 'playing', 'pause', 'ended', 'error', 'seeking', 'seeked', 'timeupdate', 'waiting', 'canplay', 'canplaythrough', 'durationchange', 'volumechange', 'loadeddata'].map(item => {
	      return {
	        [item]: `on${item.charAt(0).toUpperCase()}${item.slice(1)}`
	      };
	    });
	    this._interval = {};
	    this.ev.forEach(item => {
	      this.evItem = Object.keys(item)[0];
	      let name = Object.keys(item)[0];
	      this.video.addEventListener(Object.keys(item)[0], () => {
	        if (name === 'error') {
	          if (this.video.error) {
	            this.emit(name, new Errors('other', this.currentTime, this.duration, this.networkState, this.readyState, this.currentSrc, this.src, this.ended, {
	              line: 55,
	              msg: this.error,
	              handle: '_initEvents'
	            }));
	          }
	        } else {
	          this.emit(name, this);
	        }

	        if (this.hasOwnProperty('_interval')) {
	          if (['ended', 'error', 'timeupdate'].indexOf(name) < 0) {
	            clearInterval(this._interval['bufferedChange']);
	            util.setInterval(this, 'bufferedChange', function () {
	              let curBuffer = [];
	              for (let i = 0, len = this.video.buffered.length; i < len; i++) {
	                curBuffer.push([this.video.buffered.start(i), this.video.buffered.end(i)]);
	              }
	              if (curBuffer.toString() !== lastBuffer) {
	                lastBuffer = curBuffer.toString();
	                this.emit('bufferedChange', curBuffer);
	              }
	            }, 200);
	          } else {
	            if (name !== 'timeupdate') {
	              util.clearInterval(this, 'bufferedChange');
	            }
	          }
	        }
	      }, false);
	    });
	  }

	  get hasStart() {
	    return this._hasStart;
	  }
	  set hasStart(bool) {
	    if (typeof bool === 'boolean' && bool === true && !this._hasStart) {
	      this._hasStart = true;
	      this.emit('hasstart');
	    }
	  }
	  destroy() {}
	  play() {
	    return this.video.play();
	  }
	  pause() {
	    this.video.pause();
	  }
	  canPlayType() {
	    this.video.canPlayType();
	  }
	  getBufferedRange() {
	    let range = [0, 0];
	    let video = this.video;
	    let buffered = video.buffered;
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
	    if (range[0] - currentTime <= 0 && currentTime - range[1] <= 0) {
	      return range;
	    } else {
	      return [0, 0];
	    }
	  }
	  set autoplay(isTrue) {
	    this.video.autoplay = isTrue;
	  }
	  get autoplay() {
	    return this.video.autoplay;
	  }
	  get buffered() {
	    return this.video.buffered;
	  }
	  get crossOrigin() {
	    return this.video.crossOrigin;
	  }
	  set crossOrigin(isTrue) {
	    this.video.crossOrigin = isTrue;
	  }
	  get currentSrc() {
	    return this.video.currentSrc;
	  }
	  set currentSrc(src) {
	    this.video.currentSrc = src;
	  }
	  get currentTime() {
	    return this.video.currentTime;
	  }
	  set currentTime(time) {
	    this.video.currentTime = time;
	  }
	  get defaultMuted() {
	    return this.video.defaultMuted;
	  }
	  set defaultMuted(isTrue) {
	    this.video.defaultMuted = isTrue;
	  }
	  get duration() {
	    return this.video.duration;
	  }
	  get ended() {
	    return this.video.ended;
	  }
	  get error() {
	    let err = this.video.error;
	    if (!err) {
	      return null;
	    }
	    let status = [{
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
	  get loop() {
	    return this.video.loop;
	  }
	  set loop(isTrue) {
	    this.video.loop = isTrue;
	  }
	  get muted() {
	    return this.video.muted;
	  }
	  set muted(isTrue) {
	    this.video.muted = isTrue;
	  }
	  get networkState() {
	    let status = [{
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
	  get paused() {
	    return this.video.paused;
	  }
	  get playbackRate() {
	    return this.video.playbackRate;
	  }
	  set playbackRate(rate) {
	    this.video.playbackRate = rate;
	  }
	  get played() {
	    return this.video.played;
	  }
	  get preload() {
	    return this.video.preload;
	  }
	  set preload(isTrue) {
	    this.video.preload = isTrue;
	  }
	  get readyState() {
	    let status = [{
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
	  get seekable() {
	    return this.video.seekable;
	  }
	  get seeking() {
	    return this.video.seeking;
	  }
	  get src() {
	    return this.video.src;
	  }
	  set src(url) {
	    if (!util.hasClass(this.root, 'xgplayer-ended')) {
	      this.emit('urlchange', url);
	    }
	    this.video.pause();
	    this.video.src = url;
	  }
	  get volume() {
	    return this.video.volume;
	  }
	  set volume(vol) {
	    this.video.volume = vol;
	  }
	}

	let sniffer = {
	  get device() {
	    let r = sniffer.os;
	    return r.isPc ? 'pc' : 'mobile';
	    // return r.isPc ? 'pc' : r.isTablet ? 'tablet' : 'mobile'
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
	    let isPc = !isPhone && !isAndroid && !isSymbian && !isTablet;
	    return {
	      isTablet,
	      isPhone,
	      isAndroid,
	      isPc,
	      isSymbian,
	      isWindowsPhone,
	      isFireFox
	    };
	  }
	};

	const PLAY = 'play';
	const PLAYING = 'playing';
	const ENDED = 'ended';
	const PAUSE = 'pause';
	const ERROR = 'error';
	const SEEKING = 'seeking';
	const SEEKED = 'seeked';
	const TIME_UPDATE = 'timeupdate';
	const WAITING = 'waiting';
	const CANPLAY = 'canplay';
	const CANPLAY_THROUGH = 'canplaythrough';
	const DURATION_CHANGE = 'durationchange';
	const VOLUME_CHANGE = 'volumechange';
	const LOADED_DATA = 'loadeddata';

	// player events
	const BUFFER_CHANGE = 'bufferedChange';
	const PLAYER_FOCUS = 'focus';
	const PLAYER_BLUR = 'blur';
	const READY = 'ready';
	const URL_NULL = 'urlNull';
	const AUTOPLAY_STARTED = 'autoplay_started';
	const AUTOPLAY_PREVENTED = 'autoplay_was_prevented';
	const COMPLETE = 'complete';
	const DESTROY = 'destroy';

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
		DESTROY: DESTROY
	});

	class BasePlugin {
	  static defineGetterOrSetter(Obj, map) {
	    for (const key in map) {
	      Object.defineProperty(Obj, key, map[key]);
	    }
	  }

	  constructor(args) {
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

	  __init(args) {
	    BasePlugin.defineGetterOrSetter(this, {
	      'player': {
	        get: () => {
	          return args.player;
	        }
	      },
	      'playerConfig': {
	        get: () => {
	          return args.player && args.player.config;
	        }
	      },
	      'pluginName': {
	        get: () => {
	          if (args.pluginName) {
	            return args.pluginName;
	          } else {
	            return this.constructor.pluginName;
	          }
	        }
	      },
	      'root': {
	        get: () => {
	          return args.player.root;
	        }
	      }
	    });
	  }

	  on(event, callback) {
	    if (typeof event === 'string') {
	      this.__events[event] = callback;
	      this.player.on(event, callback);
	    } else if (Array.isArray(event)) {
	      event.forEach(item => {
	        this.__events[item] = callback;
	        this.player.on(item, callback);
	      });
	    }
	  }

	  once(event, callback) {
	    this.player.once(event, callback);
	  }

	  off(event, callback) {
	    if (typeof event === 'string') {
	      this.__events[event] = undefined;
	      this.player.off(event, callback);
	    } else if (Array.isArray(event)) {
	      event.forEach(item => {
	        this.__events[item] = undefined;
	        this.player.off(item, callback);
	      });
	    }
	  }

	  offAll() {
	    for (const item of Object.keys(this.__events)) {
	      this.off(item, this.__events[item]);
	    }
	  }

	  emit(event, res) {
	    this.player.emit(event, res);
	  }

	  _destroy() {
	    this.offAll();
	    if (util.checkIsFunction(this.destroy)) {
	      this.destroy();
	    }
	  }
	}

	BasePlugin.Util = util;
	BasePlugin.Sniffer = sniffer;
	BasePlugin.Errors = Errors;
	BasePlugin.Event = event;

	/**
	* a plugins manager to register and search
	**/
	const pluginsManager = {
	  init(player) {
	    // 标记每一个播放器实例
	    let cgid = player._pluginInfoId;
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
	  register(player, plugin) {
	    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    if (!player || !plugin || typeof plugin !== 'function' || plugin.prototype === undefined) {
	      return;
	    }
	    let cgid = player._pluginInfoId;
	    if (!cgid || !this.pluginGroup || !this.pluginGroup[cgid]) {
	      this.init(player);
	      cgid = player._pluginInfoId;
	    }
	    if (!this.pluginGroup[cgid]._plugins) {
	      this.pluginGroup[cgid]._plugins = [];
	    }
	    const plugins = this.pluginGroup[cgid]._plugins;
	    const originalOptions = this.pluginGroup[cgid]._originalOptions;
	    options.player = this.pluginGroup[cgid]._player;
	    console.log('plugin.pluginName', plugin.pluginName);
	    const pluginName = options.pluginName || plugin.pluginName;
	    if (!pluginName) {
	      throw new Error('The property pluginName is necessary');
	    }
	    for (const item of Object.keys(originalOptions)) {
	      if (pluginName.toLowerCase() === item.toLowerCase()) {
	        options.config = originalOptions[item];
	      } else {
	        options.config = {};
	      }
	    }
	    if (!options.root) {
	      options.root = player.root;
	    }
	    try {
	      // eslint-disable-next-line new-cap
	      const _instance = new plugin(options);
	      plugins[pluginName.toLowerCase()] = _instance;
	      plugins[pluginName.toLowerCase()].func = plugin;
	      return _instance;
	    } catch (err) {
	      console.error(err);
	      throw err;
	    }
	  },

	  unRegister(cgid, name) {
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
	  getPlugins(player) {
	    const cgid = player._pluginInfoId;
	    return cgid ? this.pluginGroup[cgid]._plugins : {};
	  },

	  findPlugin(player, name) {
	    if (!this.pluginGroup) {
	      return null;
	    }
	    const cgid = player._pluginInfoId;
	    const cName = name.toLowerCase();
	    return this.pluginGroup[cgid]._plugins[cName];
	  },

	  beforeInit(player) {
	    if (!this.pluginGroup) {
	      return;
	    }
	    const cgid = player._pluginInfoId;
	    const plugins = this.pluginGroup[cgid]._plugins;
	    for (const item of Object.keys(plugins)) {
	      if (plugins[item] && plugins[item].beforePlayerInit) {
	        plugins[item].beforePlayerInit();
	      }
	    }
	  },

	  afterInit(player) {
	    if (!this.pluginGroup) {
	      return;
	    }
	    const cgid = player._pluginInfoId;
	    const plugins = this.pluginGroup[cgid]._plugins;
	    for (const item of Object.keys(plugins)) {
	      if (plugins[item] && plugins[item].afterPlayerInit) {
	        plugins[item].afterPlayerInit();
	      }
	    }
	  },

	  reRender(player) {
	    const cgid = player._pluginInfoId;
	    const pluginsMap = {};
	    const plugins = this.pluginGroup[cgid]._plugins;
	    for (const item of Object.keys(plugins)) {
	      pluginsMap[item] = {
	        plugin: plugins[item].func,
	        options: plugins[item]._args
	      };
	      this.unRegister(cgid, item);
	    }
	    for (const item of Object.keys(pluginsMap)) {
	      this.register(cgid, item, pluginsMap[item].plugin, pluginsMap[item].options);
	    }
	  },

	  destroy(player) {
	    const cgid = player._pluginInfoId;
	    const plugins = this.pluginGroup[cgid]._plugins;
	    for (const item of Object.keys(plugins)) {
	      this.unRegister(cgid, item);
	    }
	    delete this.pluginGroup[cgid];
	  }
	};

	window.pluginsManager = pluginsManager;

	/**
	* an ui Plugin class
	*
	**/

	function _createElement(tag, name) {
	  const dom = document.createElement(tag);
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
	  const len = parent.children.length;
	  const insertIdx = parseInt(index);
	  if (typeof index === 'undefined' || len <= insertIdx) {
	    parent.insertAdjacentHTML('beforeend', html);
	    return parent.children[parent.children.length - 1];
	  } else if (insertIdx === 0) {
	    parent.insertAdjacentHTML('afterbegin', html);
	    return parent.children[0];
	  }
	  const el = parent.children[insertIdx];
	  if (el && el.insertAdjacentHTML) {
	    el.insertAdjacentHTML('beforebegin', html);
	    return parent.children[insertIdx];
	  }
	}

	function registerIconsObj(iconsConfig, plugin) {
	  Object.keys(iconsConfig).map(iconKey => {
	    Object.defineProperty(plugin.icons, iconKey, {
	      get: () => {
	        const _icons = plugin.config.icons || plugin.playerConfig.icons;
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
	  Object.keys(textConfig).map(key => {
	    Object.defineProperty(plugin.text, key, {
	      get: () => {
	        const lang = plugin.playerConfig.lang || 'zh';
	        console.log(textConfig[key][lang]);
	        return textConfig[key][lang];
	      }
	    });
	  });
	}

	class Plugin extends BasePlugin {
	  constructor() {
	    let args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    super(args);
	  }

	  __init(args) {
	    super.__init(args);
	    let _parent = args.root;
	    let _el = null;
	    this.icons = {};
	    const defaultIcons = this.registerIcons() || {};
	    registerIconsObj(defaultIcons, this);

	    this.text = {};
	    const defaultTexConfig = this.registerLangauageTexts() || {};
	    console.log('registerLangauageTexts', defaultTexConfig);
	    registerTextObj(defaultTexConfig, this);
	    let renderStr = '';
	    try {
	      renderStr = this.render();
	    } catch (e) {
	      throw new Error(`Plugin:${this.pluginName}:render:${e.message}`);
	    }

	    if (renderStr) {
	      _el = insert(renderStr, _parent, args.index);
	    } else if (args.tag) {
	      _el = _createElement(args.tag, args.name);
	      _parent.appendChild(_el);
	    }

	    Plugin.defineGetterOrSetter(this, {
	      'el': {
	        get: () => {
	          return _el;
	        }
	      },
	      'parent': {
	        get: () => {
	          return _parent;
	        }
	      }
	    });

	    const attr = this.config.attr || {};
	    const style = this.config.style || {};

	    this.setAttr(attr);
	    this.setStyle(style);
	    this.__registeChildren();
	  }

	  __registeChildren() {
	    const children = this.children();
	    if (children && typeof children === 'object') {
	      if (!this._children) {
	        this._children = [];
	      }
	      if (Object.keys(children).length > 0) {
	        for (const item of Object.keys(children)) {
	          const name = item;
	          const c = this._registerPlugin(name, children[item], this.config[name]);
	          this._children.push(c);
	        }
	      }
	    }
	  }

	  plugins() {
	    return this._children;
	  }

	  children() {
	    return {};
	  }

	  _registerPlugin(name, item, options) {
	    const opts = typeof options === 'object' ? options : {};
	    opts.root = this.el;
	    opts.pluginName = name;
	    return pluginsManager.register(this.player, item, opts);
	  }

	  registerIcons() {
	    return {};
	  }

	  registerLangauageTexts() {
	    return {};
	  }

	  getPlugin(name) {
	    return pluginsManager.findPlugin(this.player, name);
	  }

	  find(qs) {
	    return this.el.querySelector(qs);
	  }

	  bind(querySelector, eventType, callback) {
	    // if no querySelector passed to the method
	    if (arguments.length < 3 && typeof eventType === 'function') {
	      this.bindEL(querySelector, eventType);
	    } else if (arguments.length === 3 && typeof callback === 'function') {
	      delegate.bind(this.el, querySelector, eventType, callback, false);
	    }
	  }

	  unbind(querySelector, eventType, callback) {
	    // if no querySelector passed to the method
	    if (arguments.length < 3 && typeof eventType === 'function') {
	      this.unbindEL(querySelector, eventType);
	    } else if (typeof callback === 'function') {
	      delegate.ubind(this.el, querySelector, eventType, callback, false);
	    }
	  }

	  setStyle(name, value) {
	    if (typeof name === 'string') {
	      this.style[name] = value;
	      return this.el.style[name] = value;
	    } else if (typeof name === 'object') {
	      const obj = name;
	      for (const item of Object.keys(obj)) {
	        this.el.style[item] = obj[item];
	      }
	    }
	  }

	  setAttr(name, value) {
	    if (typeof name === 'string') {
	      return this.el.setAttribute(name, value);
	    } else if (typeof name === 'object') {
	      const obj = name;
	      for (const item of Object.keys(obj)) {
	        this.el.setAttribute(item, obj[item]);
	      }
	    }
	  }

	  setHtml(htmlStr, callback) {
	    this.el.innerHtml = htmlStr;
	    if (typeof callback === 'function') {
	      callback();
	    }
	  }

	  bindEL(event, eventHandle) {
	    let isBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	    if (`on${event}` in this.el && typeof eventHandle === 'function') {
	      this.el.addEventListener(event, eventHandle, isBubble);
	    }
	  }

	  unbindEL(event, eventHandle) {
	    let isBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	    if (`on${event}` in this.el && typeof eventHandle === 'function') {
	      this.el.removeEventListener(event, eventHandle, isBubble);
	    }
	  }

	  show() {
	    this.el.style.display = '';
	    const cs = window.getComputedStyle(this.el, null);
	    const cssDisplayValue = cs.getPropertyValue('display');
	    if (cssDisplayValue === 'none') {
	      return this.el.style.display = 'block';
	    }
	  }

	  hide() {
	    this.el.style.display = 'none';
	  }

	  render() {
	    return '';
	  }

	  _destroy() {
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
	}

	class Player extends Proxy {
	  constructor(options) {
	    super(options);
	    this.config = util.deepCopy({
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
	    this.userTimer = null;
	    this.waitTimer = null;
	    this.isProgressMoving = false;

	    this._initDOM();

	    this.pluginsCall();
	    this._registerPlugins();

	    setTimeout(() => {
	      this.emit('ready');
	      this.isReady = true;
	    }, 0);

	    pluginsManager.beforeInit(this);
	    if (this.config.videoInit) {
	      if (util.hasClass(this.root, 'xgplayer-nostart')) {
	        this.start();
	      }
	    }
	  }

	  /**
	   * 注册组件 组件列表config.plugins
	   */
	  _registerPlugins() {
	    const ignores = this.config.ignores || [];
	    const plugins = this.config.plugins || [];
	    const ignoresStr = ignores.join('||');
	    plugins.map(plugin => {
	      try {
	        // 在ignores中的不做组装
	        if (plugin.pluginName && ignoresStr.indexOf(plugin.pluginName.toLowerCase()) > -1) {
	          return null;
	        }
	        return pluginsManager.register(this, plugin);
	      } catch (err) {
	        return null;
	      }
	    });
	  }

	  register() {}

	  unRegister() {}

	  /**
	   * init control bar
	   * @private
	   */
	  _initDOM() {
	    this.root = util.findDom(document, `#${this.config.id}`);
	    this.controls = util.createDom('xg-controls', '', {
	      unselectable: 'on',
	      onselectstart: 'return false'
	    }, 'xgplayer-controls');
	    if (!this.root) {
	      let el = this.config.el;
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
	    util.addClass(this.root, `xgplayer xgplayer-${sniffer.device} xgplayer-nostart ${this.config.controls ? '' : 'no-controls'}`);
	    this.root.appendChild(this.controls);
	    if (this.config.fluid) {
	      this.root.style['max-width'] = '100%';
	      this.root.style['width'] = '100%';
	      this.root.style['height'] = '0';
	      this.root.style['padding-top'] = `${this.config.height * 100 / this.config.width}%`;

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
	          this.root.style.width = `${this.config.width}px`;
	        }
	      }
	      if (this.config.height) {
	        if (typeof this.config.height !== 'number') {
	          this.root.style.height = this.config.height;
	        } else {
	          this.root.style.height = `${this.config.height}px`;
	        }
	      }
	    }
	  }

	  _initEvents() {
	    super._initEvents();
	    this.ev.forEach(item => {
	      let evName = Object.keys(item)[0];
	      let evFunc = this[item[evName]];
	      if (evFunc) {
	        this.on(evName, evFunc);
	      }
	    });

	    ['focus', 'blur'].forEach(item => {
	      this.on(item, this['on' + item.charAt(0).toUpperCase() + item.slice(1)]);
	    });

	    let player = this;
	    player.once('loadeddata', this.getVideoSize);
	    this.mousemoveFunc = function () {
	      player.emit('focus');
	      if (!player.config.closeFocusVideoFocus) {
	        player.video.focus();
	      }
	    };
	    this.root.addEventListener('mousemove', this.mousemoveFunc);
	    this.playFunc = function () {
	      player.emit('focus');
	      if (!player.config.closePlayVideoFocus) {
	        player.video.focus();
	      }
	    };
	    player.once('play', this.playFunc);

	    function onDestroy() {
	      player.root.removeEventListener('mousemove', player.mousemoveFunc);
	      player.off('destroy', onDestroy);
	    }

	    player.once('destroy', onDestroy);
	  }

	  /**
	   * 当前播放器挂在的插件实例代码
	   */
	  get plugins() {
	    return pluginsManager.getPlugins(this);
	  }

	  getPlugin(pluginName) {
	    return pluginsManager.findPlugin(this, pluginName);
	  }

	  start() {
	    let url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.config.url;

	    let root = this.root;
	    let player = this;
	    if (!url || url === '') {
	      this.emit('urlNull');
	    }
	    this.canPlayFunc = function () {
	      let playPromise = player.video.play();
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
	    if (util.typeOf(url) === 'String') {
	      this.video.src = url;
	    } else {
	      url.forEach(item => {
	        this.video.appendChild(util.createDom('source', '', {
	          src: `${item.src}`,
	          type: `${item.type || ''}`
	        }));
	      });
	    }
	    this.once('loadeddata', this.loadeddataFunc);
	    if (this.config.autoplay) {
	      this.once('canplay', this.canPlayFunc);
	    }
	    root.insertBefore(this.video, root.firstChild);
	    setTimeout(() => {
	      this.emit('complete');
	    }, 1);
	    pluginsManager.afterInit(this);
	  }

	  reload() {
	    this.video.load();
	    this.reloadFunc = function () {
	      this.play().catch(err => {
	        console.log(err);
	      });
	    };
	    this.once('loadeddata', this.reloadFunc);
	  }

	  destroy() {
	    let isDelDom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	    let player = this;
	    for (let k in this._interval) {
	      clearInterval(this._interval[k]);
	      this._interval[k] = null;
	    }
	    this.ev.forEach(item => {
	      let evName = Object.keys(item)[0];
	      let evFunc = this[item[evName]];
	      if (evFunc) {
	        this.off(evName, evFunc);
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
	    }    ['focus', 'blur'].forEach(item => {
	      this.off(item, this['on' + item.charAt(0).toUpperCase() + item.slice(1)]);
	    });
	    if (!this.config.keyShortcut || this.config.keyShortcut === 'on') {
	      ['video', 'controls'].forEach(item => {
	        if (this[item]) {
	          this[item].removeEventListener('keydown', e => {
	            player.onKeydown(e, player);
	          });
	        }
	      });
	    }

	    function destroyFunc() {
	      this.emit('destroy');

	      // fix video destroy https://stackoverflow.com/questions/3258587/how-to-properly-unload-destroy-a-video-element
	      this.video.removeAttribute('src'); // empty source
	      this.video.load();
	      if (isDelDom) {
	        // parentNode.removeChild(this.root)
	        this.root.innerHTML = '';
	        let classNameList = this.root.className.split(' ');
	        if (classNameList.length > 0) {
	          this.root.className = classNameList.filter(name => name.indexOf('xgplayer') < 0).join(' ');
	        } else {
	          this.root.className = '';
	        }
	      }
	      for (let k in this) {
	        // if (k !== 'config') {
	        delete this[k];
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
	    pluginsManager.destroy(this);
	    super.destroy();
	  }

	  replay() {
	    util.removeClass(this.root, 'xgplayer-ended');
	    this.currentTime = 0;
	    this.play().catch(err => {
	      console.log(err);
	    });
	  }

	  getFullscreen(el) {
	    let player = this;
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
	      util.addClass(el, 'xgplayer-is-cssfullscreen');
	    }
	  }

	  exitFullscreen(el) {
	    if (document.exitFullscreen) {
	      document.exitFullscreen();
	    } else if (document.webkitExitFullscreen) {
	      document.webkitExitFullscreen();
	    } else if (document.mozCancelFullScreen) {
	      document.mozCancelFullScreen();
	    } else if (document.msExitFullscreen) {
	      document.msExitFullscreen();
	    }
	    util.removeClass(el, 'xgplayer-is-cssfullscreen');
	  }

	  getCssFullscreen() {
	    let player = this;
	    util.addClass(player.root, 'xgplayer-is-cssfullscreen');
	    player.emit('requestCssFullscreen');
	  }

	  exitCssFullscreen() {
	    let player = this;
	    util.removeClass(player.root, 'xgplayer-is-cssfullscreen');
	    player.emit('exitCssFullscreen');
	  }

	  pluginsCall() {
	    let self = this;
	    if (Player.plugins) {
	      let ignores = this.config.ignores;
	      Object.keys(Player.plugins).forEach(name => {
	        let descriptor = Player.plugins[name];
	        if (!ignores.some(item => name === item || name === 's_' + item)) {
	          if (['pc', 'tablet', 'mobile'].some(type => type === name)) {
	            if (name === sniffer.device) {
	              setTimeout(() => {
	                descriptor.call(self, self);
	              }, 0);
	            }
	          } else {
	            descriptor.call(this, this);
	          }
	        }
	      });
	    }
	  }

	  onFocus() {
	    let player = this;
	    util.removeClass(this.root, 'xgplayer-inactive');
	    if (player.userTimer) {
	      clearTimeout(player.userTimer);
	    }
	    player.userTimer = setTimeout(function () {
	      player.emit('blur');
	    }, player.config.inactive);
	  }

	  onBlur() {
	    // this.video.blur()
	    if (!this.paused && !this.ended) {
	      util.addClass(this.root, 'xgplayer-inactive');
	    }
	  }

	  onPlay() {
	    util.addClass(this.root, 'xgplayer-playing');
	    util.removeClass(this.root, 'xgplayer-pause');
	  }

	  onPause() {
	    util.addClass(this.root, 'xgplayer-pause');
	    if (this.userTimer) {
	      clearTimeout(this.userTimer);
	    }
	    this.emit('focus');
	  }

	  onEnded() {
	    util.addClass(this.root, 'xgplayer-ended');
	    util.removeClass(this.root, 'xgplayer-playing');
	  }

	  onSeeking() {
	    // util.addClass(this.root, 'seeking');
	  }

	  onSeeked() {
	    // for ie,playing fired before waiting
	    if (this.waitTimer) {
	      clearTimeout(this.waitTimer);
	    }
	    util.removeClass(this.root, 'xgplayer-isloading');
	  }

	  onWaiting() {
	    let self = this;
	    if (self.waitTimer) {
	      clearTimeout(self.waitTimer);
	    }
	    self.waitTimer = setTimeout(function () {
	      util.addClass(self.root, 'xgplayer-isloading');
	    }, 500);
	  }

	  onPlaying() {
	    if (this.waitTimer) {
	      clearTimeout(this.waitTimer);
	    }
	    util.removeClass(this.root, 'xgplayer-isloading xgplayer-nostart xgplayer-pause xgplayer-ended xgplayer-is-error xgplayer-replay');
	    util.addClass(this.root, 'xgplayer-playing');
	  }

	  getVideoSize() {
	    if (this.video.videoWidth && this.video.videoHeight) {
	      let containerSize = this.root.getBoundingClientRect();
	      if (this.config.fitVideoSize === 'auto') {
	        if (containerSize.width / containerSize.height > this.video.videoWidth / this.video.videoHeight) {
	          this.root.style.height = `${this.video.videoHeight / this.video.videoWidth * containerSize.width}px`;
	        } else {
	          this.root.style.width = `${this.video.videoWidth / this.video.videoHeight * containerSize.height}px`;
	        }
	      } else if (this.config.fitVideoSize === 'fixWidth') {
	        this.root.style.height = `${this.video.videoHeight / this.video.videoWidth * containerSize.width}px`;
	      } else if (this.config.fitVideoSize === 'fixHeight') {
	        this.root.style.width = `${this.video.videoWidth / this.video.videoHeight * containerSize.height}px`;
	      }
	    }
	  }

	  get version() {
	    return version;
	  }
	}

	Player.util = util;
	Player.sniffer = sniffer;
	Player.Errors = Errors;
	Player.Plugin = Plugin;
	Player.BasePlugin = BasePlugin;

	const BasePlugin$1 = BasePlugin;
	const Plugin$1 = Plugin;

	exports.BasePlugin = BasePlugin$1;
	exports.Plugin = Plugin$1;
	exports.default = Player;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
