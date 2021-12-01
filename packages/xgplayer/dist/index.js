(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["xgplayer"] = factory();
	else
		root["xgplayer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 79);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.util = exports.PresentationMode = undefined;
exports.createDom = createDom;
exports.hasClass = hasClass;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.toggleClass = toggleClass;
exports.findDom = findDom;
exports.padStart = padStart;
exports.format = format;
exports.event = event;
exports.typeOf = typeOf;
exports.deepCopy = deepCopy;
exports.getBgImage = getBgImage;
exports.copyDom = copyDom;
exports._setInterval = _setInterval;
exports._clearInterval = _clearInterval;
exports.createImgBtn = createImgBtn;
exports.isWeiXin = isWeiXin;
exports.isUc = isUc;
exports.computeWatchDur = computeWatchDur;
exports.offInDestroy = offInDestroy;
exports.on = on;
exports.once = once;
exports.getBuffered2 = getBuffered2;
exports.checkIsBrowser = checkIsBrowser;
exports.setStyle = setStyle;
exports.checkWebkitSetPresentationMode = checkWebkitSetPresentationMode;

var _xgplayerTimeRange = __webpack_require__(7);

var _xgplayerTimeRange2 = _interopRequireDefault(_xgplayerTimeRange);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function createDom() {
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
}

function hasClass(el, className) {
  if (!el) {
    return false;
  }

  if (el.classList) {
    return Array.prototype.some.call(el.classList, function (item) {
      return item === className;
    });
  } else if (el.className) {
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
  } else {
    return false;
  }
}

function addClass(el, className) {
  if (!el) {
    return;
  }

  if (el.classList) {
    className.replace(/(^\s+|\s+$)/g, '').split(/\s+/g).forEach(function (item) {
      item && el.classList.add(item);
    });
  } else if (!hasClass(el, className)) {
    el.className += ' ' + className;
  }
}

function removeClass(el, className) {
  if (!el) {
    return;
  }

  if (el.classList) {
    className.split(/\s+/g).forEach(function (item) {
      el.classList.remove(item);
    });
  } else if (hasClass(el, className)) {
    className.split(/\s+/g).forEach(function (item) {
      var reg = new RegExp('(\\s|^)' + item + '(\\s|$)');
      el.className = el.className.replace(reg, ' ');
    });
  }
}

function toggleClass(el, className) {
  if (!el) {
    return;
  }

  className.split(/\s+/g).forEach(function (item) {
    if (hasClass(el, item)) {
      removeClass(el, item);
    } else {
      addClass(el, item);
    }
  });
}

function findDom() {
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
}

function padStart(str, length, pad) {
  var charstr = String(pad);
  var len = length >> 0;
  var maxlen = Math.ceil(len / charstr.length);
  var chars = [];
  var r = String(str);
  while (maxlen--) {
    chars.push(charstr);
  }
  return chars.join('').substring(0, len - r.length) + r;
}

function format(time) {
  if (window.isNaN(time)) {
    return '';
  }
  var hour = padStart(Math.floor(time / 3600), 2, 0);
  var minute = padStart(Math.floor((time - hour * 3600) / 60), 2, 0);
  var second = padStart(Math.floor(time - hour * 3600 - minute * 60), 2, 0);
  return (hour === '00' ? [minute, second] : [hour, minute, second]).join(':');
}

function event(e) {
  if (e.touches) {
    var touch = e.touches[0] || e.changedTouches[0];
    e.clientX = touch.clientX || 0;
    e.clientY = touch.clientY || 0;
    e.offsetX = touch.pageX - touch.target.offsetLeft;
    e.offsetY = touch.pageY - touch.target.offsetTop;
  }
  e._target = e.target || e.srcElement;
}

function typeOf(obj) {
  return Object.prototype.toString.call(obj).match(/([^\s.*]+)(?=]$)/g)[0];
}

function deepCopy(dst, src) {
  if (typeOf(src) === 'Object' && typeOf(dst) === 'Object') {
    Object.keys(src).forEach(function (key) {
      if (typeOf(src[key]) === 'Object' && !(src[key] instanceof Node)) {
        if (!dst[key]) {
          dst[key] = src[key];
        } else {
          deepCopy(dst[key], src[key]);
        }
      } else if (typeOf(src[key]) === 'Array') {
        dst[key] = typeOf(dst[key]) === 'Array' ? dst[key].concat(src[key]) : src[key];
      } else {
        dst[key] = src[key];
      }
    });
    return dst;
  }
}
function getBgImage(el) {
  // fix: return current page url when url is none
  var url = (el.currentStyle || window.getComputedStyle(el, null)).backgroundImage;
  if (!url || url === 'none') {
    return '';
  }
  var a = document.createElement('a');
  a.href = url.replace(/url\("|"\)/g, '');
  return a.href;
}

function copyDom(dom) {
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
}

function _setInterval(context, eventName, intervalFunc, frequency) {
  if (!context._interval[eventName]) {
    context._interval[eventName] = setInterval(intervalFunc.bind(context), frequency);
  }
}

function _clearInterval(context, eventName) {
  clearInterval(context._interval[eventName]);
  context._interval[eventName] = null;
}

function createImgBtn(name, imgUrl, width, height) {
  var btn = createDom('xg-' + name, '', {}, 'xgplayer-' + name + '-img');
  btn.style.backgroundImage = 'url("' + imgUrl + '")';
  if (width && height) {
    var w = void 0,
        h = void 0,
        unit = void 0;
    ['px', 'rem', 'em', 'pt', 'dp', 'vw', 'vh', 'vm', '%'].every(function (item) {
      if (width.indexOf(item) > -1 && height.indexOf(item) > -1) {
        w = Number(width.slice(0, width.indexOf(item)).trim());
        h = Number(height.slice(0, height.indexOf(item)).trim());
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
}

function isWeiXin() {
  var ua = window.navigator.userAgent.toLowerCase();
  return ua.indexOf('micromessenger') > -1;
}

function isUc() {
  var ua = window.navigator.userAgent.toLowerCase();
  return ua.indexOf('ucbrowser') > -1;
}

function computeWatchDur() {
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
        var end = played[i].end;
        if (end < arr[j].begin) {
          arr.splice(j, 0, { begin: begin, end: end });
          break;
        } else if (begin > arr[j].end) {
          if (j > arr.length - 2) {
            arr.push({ begin: begin, end: end });
            break;
          }
        } else {
          var b = arr[j].begin;
          var e = arr[j].end;
          arr[j].begin = Math.min(begin, b);
          arr[j].end = Math.max(end, e);
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
}

function offInDestroy(object, event, fn, offEvent) {
  function onDestroy() {
    object.off(event, fn);
    object.off(offEvent, onDestroy);
  }
  object.once(offEvent, onDestroy);
}

function on(object, event, fn, offEvent) {
  if (offEvent) {
    object.on(event, fn);
    offInDestroy(object, event, fn, offEvent);
  } else {
    var _fn = function _fn(data) {
      fn(data);
      object.off(event, _fn);
    };
    object.on(event, _fn);
  }
}

function once(object, event, fn, offEvent) {
  if (offEvent) {
    object.once(event, fn);
    offInDestroy(object, event, fn, offEvent);
  } else {
    var _fn = function _fn(data) {
      fn(data);
      object.off(event, _fn);
    };
    object.once(event, _fn);
  }
}

function getBuffered2(vbuffered) {
  var maxHoleDuration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
  //ref: hls.js
  var buffered = [];
  for (var i = 0; i < vbuffered.length; i++) {
    buffered.push({ start: vbuffered.start(i) < 0.5 ? 0 : vbuffered.start(i), end: vbuffered.end(i) });
  }
  buffered.sort(function (a, b) {
    var diff = a.start - b.start;
    if (diff) {
      return diff;
    } else {
      return b.end - a.end;
    }
  });
  var buffered_2 = [];
  if (maxHoleDuration) {
    for (var _i2 = 0; _i2 < buffered.length; _i2++) {
      var buf2len = buffered_2.length;
      if (buf2len) {
        var buf2end = buffered_2[buf2len - 1].end;
        if (buffered[_i2].start - buf2end < maxHoleDuration) {
          if (buffered[_i2].end > buf2end) {
            buffered_2[buf2len - 1].end = buffered[_i2].end;
          }
        } else {
          buffered_2.push(buffered[_i2]);
        }
      } else {
        buffered_2.push(buffered[_i2]);
      }
    }
  } else {
    buffered_2 = buffered;
  }
  return new _xgplayerTimeRange2.default(buffered_2);
}

function checkIsBrowser() {
  return !(typeof window === 'undefined' || typeof window.document === 'undefined' || typeof window.document.createElement === 'undefined');
}

function setStyle(elem, name, value) {
  var style = elem.style;
  try {
    style[name] = value;
  } catch (error) {
    style.setProperty(name, value);
  }
}

var PresentationMode = exports.PresentationMode = {
  PIP: 'picture-in-picture',
  INLINE: 'inline',
  FULLSCREEN: 'fullscreen'
};

function checkWebkitSetPresentationMode(video) {
  return typeof video.webkitSetPresentationMode === 'function';
}

var util = exports.util = {
  createDom: createDom, hasClass: hasClass, addClass: addClass, removeClass: removeClass, toggleClass: toggleClass, findDom: findDom, padStart: padStart, format: format, event: event, typeOf: typeOf,
  deepCopy: deepCopy, getBgImage: getBgImage, copyDom: copyDom, setInterval: _setInterval, clearInterval: _clearInterval, createImgBtn: createImgBtn, isWeiXin: isWeiXin, isUc: isUc, computeWatchDur: computeWatchDur,
  offInDestroy: offInDestroy, on: on, once: once, getBuffered2: getBuffered2, checkIsBrowser: checkIsBrowser, setStyle: setStyle
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(36);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _undefined = __webpack_require__(24)(); // Support ES3 engines

module.exports = function (val) {
  return val !== _undefined && val !== null;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _version = __webpack_require__(8);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

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
    r.playerVersion = _version.version; // 播放器版本
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

exports.default = Errors;
module.exports = exports['default'];

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var sniffer = {};

Object.defineProperty(sniffer, 'device', {
  get: function get() {
    var r = sniffer.os;
    return r.isPc ? 'pc' : 'mobile';
    // return r.isPc ? 'pc' : r.isTablet ? 'tablet' : 'mobile'
  }
});

Object.defineProperty(sniffer, 'browser', {
  get: function get() {
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
    }))[0] || '';
  }
});

Object.defineProperty(sniffer, 'os', {
  get: function get() {
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
});

exports.default = sniffer;
module.exports = exports['default'];

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// ES3 safe

var _undefined = void 0;

module.exports = function (value) {
  return value !== _undefined && value !== null;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var XgplayerTimeRange = function () {
    function XgplayerTimeRange(bufferedList) {
        _classCallCheck(this, XgplayerTimeRange);

        this.bufferedList = bufferedList;
    }

    _createClass(XgplayerTimeRange, [{
        key: "start",
        value: function start(index) {
            return this.bufferedList[index].start;
        }
    }, {
        key: "end",
        value: function end(index) {
            return this.bufferedList[index].end;
        }
    }, {
        key: "length",
        get: function get() {
            return this.bufferedList.length;
        }
    }]);

    return XgplayerTimeRange;
}();

exports.default = XgplayerTimeRange;
module.exports = exports["default"];

/***/ }),
/* 8 */
/***/ (function(module) {

module.exports = JSON.parse("{\"version\":\"2.31.4\"}");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

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

var _proxy = __webpack_require__(11);

var _proxy2 = _interopRequireDefault(_proxy);

var _util = __webpack_require__(0);

var _sniffer = __webpack_require__(5);

var _sniffer2 = _interopRequireDefault(_sniffer);

var _xgplayerTimeRange = __webpack_require__(7);

var _xgplayerTimeRange2 = _interopRequireDefault(_xgplayerTimeRange);

var _error = __webpack_require__(4);

var _error2 = _interopRequireDefault(_error);

var _allOff = __webpack_require__(31);

var _allOff2 = _interopRequireDefault(_allOff);

var _i18n = __webpack_require__(10);

var _i18n2 = _interopRequireDefault(_i18n);

__webpack_require__(34);

var _version = __webpack_require__(8);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Player = function (_Proxy) {
  _inherits(Player, _Proxy);

  function Player(options) {
    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, options));

    _this.config = (0, _util.deepCopy)({
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
    _this.version = _version.version;
    _this.userTimer = null;
    _this.waitTimer = null;
    _this.history = [];
    _this.isProgressMoving = false;
    _this.root = (0, _util.findDom)(document, '#' + _this.config.id);
    _this.controls = (0, _util.createDom)('xg-controls', '', {
      unselectable: 'on',
      onselectstart: 'return false'
    }, 'xgplayer-controls');
    if (_this.config.isShowControl) {
      _this.controls.style.display = 'none';
    }
    if (!_this.root) {
      var el = _this.config.el;
      if (el && el.nodeType === 1) {
        _this.root = el;
      } else {
        var _ret;

        _this.emit('error', new _error2.default({
          type: 'use',
          errd: {
            line: 45,
            handle: 'Constructor',
            msg: 'container id can\'t be empty'
          },
          vid: _this.config.vid
        }));
        console.error('container id can\'t be empty');
        return _ret = false, _possibleConstructorReturn(_this, _ret);
      }
    }
    // this.rootBackup = copyDom(this.root)
    (0, _util.addClass)(_this.root, 'xgplayer xgplayer-' + _sniffer2.default.device + ' xgplayer-nostart xgplayer-pause ' + (_this.config.controls ? '' : 'xgplayer-no-controls'));
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
    if (!_this.config.closeI18n) {
      Player.install(_i18n2.default.name, _i18n2.default.method);
    }
    if (_this.config.controlStyle && (0, _util.typeOf)(_this.config.controlStyle) === 'String') {
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
    if (_this.config.controlPlugins) {
      Player.controlsRun(_this.config.controlPlugins, _this);
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

    if (_this.config.videoInit) {
      if ((0, _util.hasClass)(_this.root, 'xgplayer-nostart')) {
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

  _createClass(Player, [{
    key: 'attachVideo',
    value: function attachVideo() {
      var _this2 = this;

      if (this.video && this.video.nodeType === 1) {
        this.root.insertBefore(this.video, this.root.firstChild);
      }
      setTimeout(function () {
        _this2.emit('complete');
        if (_this2.danmu && typeof _this2.danmu.resize === 'function') {
          _this2.danmu.resize();
        }
      }, 1);
    }
  }, {
    key: 'start',
    value: function start() {
      var _this3 = this;

      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.config.url;

      if (!this.video) return;
      var player = this;
      if (!url || url === '') {
        this.emit('urlNull');
        return;
      }
      this.canPlayFunc = function () {
        player.off('canplay', player.canPlayFunc);
        var playPromise = player.video.play();
        if (playPromise !== undefined && playPromise) {
          playPromise.then(function () {
            player.emit('autoplay started');
          }).catch(function () {
            player.emit('autoplay was prevented');
            (0, _util.addClass)(player.root, 'xgplayer-is-autoplay');
          });
        }
      };
      if ((0, _util.typeOf)(url) !== 'Array') {
        if ((0, _util.typeOf)(url) === 'String' && url.indexOf('blob:') > -1 && url === this.video.src) {
          // 在Chromium环境下用mse url给video二次赋值会导致错误
        } else {
          this.video.src = url;
        }
      } else {
        url.forEach(function (item) {
          _this3.video.appendChild((0, _util.createDom)('source', '', {
            src: '' + item.src,
            type: '' + (item.type || '')
          }));
        });
      }
      if (this.config.autoplay) {
        if (_sniffer2.default.os.isPhone) {
          this.canPlayFunc();
        } else {
          this.on('canplay', this.canPlayFunc);
        }
      }
      if (!this.config.disableStartLoad) {
        this.video.load();
      }
      this.attachVideo();
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
      var _this4 = this;

      var isDelDom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var player = this;
      clearInterval(this.bulletResizeTimer);
      for (var k in this._interval) {
        clearInterval(this._interval[k]);
        this._interval[k] = null;
      }
      if (this.checkTimer) {
        clearInterval(this.checkTimer);
      }
      if (this.waitTimer) {
        clearTimeout(this.waitTimer);
      }
      this.ev.forEach(function (item) {
        var evName = Object.keys(item)[0];
        var evFunc = _this4[item[evName]];
        if (evFunc) {
          _this4.off(evName, evFunc);
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
      };
      ['focus', 'blur'].forEach(function (item) {
        _this4.off(item, _this4['on' + item.charAt(0).toUpperCase() + item.slice(1)]);
      });
      if (!this.config.keyShortcut || this.config.keyShortcut === 'on') {
        ['video', 'controls'].forEach(function (item) {
          if (_this4[item]) {
            _this4[item].removeEventListener('keydown', function (e) {
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
        (0, _allOff2.default)(this);
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
      (0, _util.removeClass)(this.root, 'xgplayer-ended');
      if (_sniffer2.default.browser.indexOf('ie') > -1) {
        this.emit('play');
        this.emit('playing');
      }

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
    key: 'userGestureTrigEvent',
    value: function userGestureTrigEvent(name, param) {
      var _this5 = this;

      var defaultUserGestureEventHandler = function defaultUserGestureEventHandler(name, param) {
        _this5.emit(name, param);
      };
      if (this.config.userGestureEventMiddleware && typeof this.config.userGestureEventMiddleware[name] === 'function') {
        this.config.userGestureEventMiddleware[name].call(this, this, name, param, defaultUserGestureEventHandler);
      } else {
        defaultUserGestureEventHandler.call(this, name, param);
      }
    }
  }, {
    key: 'pluginsCall',
    value: function pluginsCall() {
      var _this6 = this;

      if (Player.plugins['s_i18n']) {
        Player.plugins['s_i18n'].call(this, this);
      }
      var self = this;
      if (Player.plugins) {
        var ignores = this.config.ignores;
        Object.keys(Player.plugins).forEach(function (name) {
          var descriptor = Player.plugins[name];
          if (!descriptor || typeof descriptor !== 'function') {
            console.warn('plugin name', name, 'is invalid');
          } else {
            if (!ignores.some(function (item) {
              return name === item || name === 's_' + item;
            }) && name !== 's_i18n') {
              if (['pc', 'tablet', 'mobile'].some(function (type) {
                return type === name;
              })) {
                if (name === _sniffer2.default.device) {
                  setTimeout(function () {
                    // if destroyed, skip
                    if (!self.video) return;
                    descriptor.call(self, self);
                  }, 0);
                }
              } else {
                descriptor.call(_this6, _this6);
              }
            }
          }
        });
      }
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      var player = this;
      if ((0, _util.hasClass)(this.root, 'xgplayer-inactive')) {
        player.emit('controlShow');
      }
      (0, _util.removeClass)(this.root, 'xgplayer-inactive');
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
      if ((this.config.enablePausedInactive || !this.paused) && !this.ended && !this.config.closeInactive) {
        if (!(0, _util.hasClass)(this.root, 'xgplayer-inactive')) {
          this.emit('controlHide');
        }
        (0, _util.addClass)(this.root, 'xgplayer-inactive');
      }
    }
  }, {
    key: 'onPlay',
    value: function onPlay() {
      (0, _util.addClass)(this.root, 'xgplayer-isloading');
      (0, _util.addClass)(this.root, 'xgplayer-playing');
      (0, _util.removeClass)(this.root, 'xgplayer-pause');
    }
  }, {
    key: 'onPause',
    value: function onPause() {
      (0, _util.addClass)(this.root, 'xgplayer-pause');
      if (this.userTimer) {
        clearTimeout(this.userTimer);
      }
      this.emit('focus');
    }
  }, {
    key: 'onEnded',
    value: function onEnded() {
      (0, _util.addClass)(this.root, 'xgplayer-ended');
      (0, _util.removeClass)(this.root, 'xgplayer-playing');
    }
  }, {
    key: 'onSeeking',
    value: function onSeeking() {
      this.isSeeking = true;
      // 兼容IE下无法触发waiting事件的问题 seeking的时候直接出发waiting
      this.onWaiting();
      // addClass(this.root, 'seeking');
    }

    // onTimeupdate () {
    //   // for ie,playing fired before waiting
    //   if (this.waitTimer) {
    //     clearTimeout(this.waitTimer)
    //   }
    //   removeClass(this.root, 'xgplayer-isloading')

    // }

  }, {
    key: 'onSeeked',
    value: function onSeeked() {
      var _this7 = this;

      // for ie,playing fired before waiting
      this.once('timeupdate', function () {
        _this7.isSeeking = false;
      });
      if (this.waitTimer) {
        clearTimeout(this.waitTimer);
      }
      (0, _util.removeClass)(this.root, 'xgplayer-isloading');
    }
  }, {
    key: 'onWaiting',
    value: function onWaiting() {
      var self = this;
      if (self.waitTimer) {
        clearTimeout(self.waitTimer);
      }
      if (self.checkTimer) {
        clearInterval(self.checkTimer);
        self.checkTimer = null;
      }
      var time = self.currentTime;
      self.waitTimer = setTimeout(function () {
        (0, _util.addClass)(self.root, 'xgplayer-isloading');
        self.checkTimer = setInterval(function () {
          if (self.currentTime !== time) {
            (0, _util.removeClass)(self.root, 'xgplayer-isloading');
            clearInterval(self.checkTimer);
            self.checkTimer = null;
          }
        }, 1000);
      }, 500);
    }
  }, {
    key: 'onPlaying',
    value: function onPlaying() {
      // 兼容safari下无法自动播放会触发该事件的场景
      if (this.paused) {
        return;
      }
      this.isSeeking = false;
      if (this.waitTimer) {
        clearTimeout(this.waitTimer);
      }
      (0, _util.removeClass)(this.root, 'xgplayer-isloading xgplayer-nostart xgplayer-pause xgplayer-ended xgplayer-is-error xgplayer-replay');
      (0, _util.addClass)(this.root, 'xgplayer-playing');
    }
  }], [{
    key: 'install',
    value: function install(name, descriptor) {
      if (!(0, _util.checkIsBrowser)()) {
        return;
      }
      if (!Player.plugins) {
        Player.plugins = {};
      }
      if (!Player.plugins[name]) {
        Player.plugins[name] = descriptor;
      }
    }
  }, {
    key: 'installAll',
    value: function installAll(list) {
      for (var k = 0; k < list.length; k++) {
        Player.install(list[k].name, list[k].method);
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
  }, {
    key: 'useAll',
    value: function useAll(list) {
      for (var k in list) {
        Player.use(list[k].name, list[k].method);
      }
    }
  }, {
    key: 'controlsRun',
    value: function controlsRun(controlLst, context) {
      controlLst.forEach(function (control) {
        control.method.call(context);
      });
    }
  }]);

  return Player;
}(_proxy2.default);

Player.util = _util.util;
Player.sniffer = _sniffer2.default;
Player.Errors = _error2.default;
Player.XgplayerTimeRange = _xgplayerTimeRange2.default;

exports.default = Player;
module.exports = exports['default'];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var s_i18n = function s_i18n() {
  var player = this;var lang = {};
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
    RELOAD_TIPS: 'Reload',
    FULLSCREEN_TIPS: "Fullscreen",
    EXITFULLSCREEN_TIPS: 'Exit fullscreen',
    CSSFULLSCREEN_TIPS: 'Cssfullscreen',
    EXITCSSFULLSCREEN_TIPS: 'Exit cssfullscreen',
    TEXTTRACK: 'Caption',
    PIP: 'Pip',
    MINIPLAYER: 'Miniplayer',
    SCREENSHOT: 'Screenshot',
    LIVE: 'LIVE',
    OFF: 'Off',
    MINIPLAYER_DRAG: 'Click and hold to drag',
    AIRPLAY_TIPS: 'Airplay'
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
    RELOAD_TIPS: '重新载入',
    FULLSCREEN_TIPS: "进入全屏",
    EXITFULLSCREEN_TIPS: '退出全屏',
    CSSFULLSCREEN_TIPS: '进入样式全屏',
    EXITCSSFULLSCREEN_TIPS: '退出样式全屏',
    TEXTTRACK: '字幕',
    PIP: '画中画',
    MINIPLAYER: '迷你播放器',
    SCREENSHOT: '截图',
    LIVE: '正在直播',
    OFF: '关闭',
    MINIPLAYER_DRAG: '点击按住可拖动视频',
    AIRPLAY_TIPS: '隔空播放'
  };
  lang['zh-hk'] = {
    HAVE_NOTHING: '沒有關於音頻/視頻是否就緒的信息',
    HAVE_METADATA: '音頻/視頻的元數據已就緒',
    HAVE_CURRENT_DATA: '關於當前播放位置的數據是可用的，但沒有足夠的數據來播放下壹幀/毫秒',
    HAVE_FUTURE_DATA: '當前及至少下壹幀的數據是可用的',
    HAVE_ENOUGH_DATA: '可用數據足以開始播放',
    NETWORK_EMPTY: '音頻/視頻尚未初始化',
    NETWORK_IDLE: '音頻/視頻是活動的且已選取資源，但並未使用網絡',
    NETWORK_LOADING: '瀏覽器正在下載數據',
    NETWORK_NO_SOURCE: '未找到音頻/視頻來源',
    MEDIA_ERR_ABORTED: '取回過程被用戶中止',
    MEDIA_ERR_NETWORK: '當下載時發生錯誤',
    MEDIA_ERR_DECODE: '當解碼時發生錯誤',
    MEDIA_ERR_SRC_NOT_SUPPORTED: '不支持的音頻/視頻格式',
    REPLAY: '重播',
    ERROR: '網絡連接似乎出現了問題',
    PLAY_TIPS: '播放',
    PAUSE_TIPS: '暫停',
    PLAYNEXT_TIPS: '下壹集',
    DOWNLOAD_TIPS: '下載',
    ROTATE_TIPS: '旋轉',
    RELOAD_TIPS: '重新載入',
    FULLSCREEN_TIPS: "進入全屏",
    EXITFULLSCREEN_TIPS: '退出全屏',
    CSSFULLSCREEN_TIPS: '進入樣式全屏',
    EXITCSSFULLSCREEN_TIPS: '退出樣式全屏',
    TEXTTRACK: '字幕',
    PIP: '畫中畫',
    MINIPLAYER: '迷妳播放器',
    SCREENSHOT: '截圖',
    LIVE: '正在直播',
    OFF: '關閉',
    MINIPLAYER_DRAG: '點擊按住可拖動視頻',
    AIRPLAY_TIPS: '隔空播放'
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
    RELOAD_TIPS: '再読み込み',
    FULLSCREEN_TIPS: "フルスクリーン",
    EXITFULLSCREEN_TIPS: 'フルスクリーンを終了',
    CSSFULLSCREEN_TIPS: 'シアターモード',
    EXITCSSFULLSCREEN_TIPS: 'シアターモードを終了',
    TEXTTRACK: '字幕',
    PIP: 'ミニプレーヤー',
    MINIPLAYER: 'ミニプレーヤー',
    SCREENSHOT: 'スクリーンショット',
    LIVE: '生放送',
    OFF: 'オフ',
    MINIPLAYER_DRAG: 'ボタンを押して働画をドラッグする',
    AIRPLAY_TIPS: '隔空放送'
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
      if ((0, _util.typeOf)(value) === 'Object') {
        Object.keys(value).forEach(function (key) {
          lang[key] = value[key];
        });
      }
    }
  });
};

exports.default = {
  name: 's_i18n',
  method: s_i18n
};
module.exports = exports['default'];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _eventEmitter = __webpack_require__(12);

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

var _util = __webpack_require__(0);

var _error = __webpack_require__(4);

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Proxy = function () {
  function Proxy(options) {
    var _this = this;

    _classCallCheck(this, Proxy);

    this._hasStart = false;
    this.videoConfig = {
      controls: !!options.isShowControl,
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
    if (options.muted) {
      this.videoConfig.muted = 'muted';
    }
    if (options.loop) {
      this.videoConfig.loop = 'loop';
    }
    var textTrackDom = '';
    this.textTrackShowDefault = true;
    if (options.nativeTextTrack && Array.isArray(options.nativeTextTrack)) {
      if (options.nativeTextTrack.length > 0 && !options.nativeTextTrack.some(function (track) {
        return track.default;
      })) {
        options.nativeTextTrack[0].default = true;
        this.textTrackShowDefault = false;
      }
      options.nativeTextTrack.some(function (track) {
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
    var el = options.el ? options.el : (0, _util.findDom)(document, '#' + options.id);
    var XgVideoProxy = this.constructor.XgVideoProxy;
    if (XgVideoProxy && this.videoConfig.mediaType === XgVideoProxy.mediaType) {
      this.video = new XgVideoProxy(el, options);
    } else {
      this.video = (0, _util.createDom)(this.videoConfig.mediaType, textTrackDom, this.videoConfig, '');
    }
    if (options.videoStyle) {
      Object.keys(options.videoStyle).forEach(function (key) {
        (0, _util.setStyle)(_this.video, key, options.videoStyle[key]);
      });
    }
    if (!this.textTrackShowDefault && textTrackDom) {
      var trackDoms = this.video.getElementsByTagName('Track');
      trackDoms[0].track.mode = 'hidden';
    }
    if (options.autoplay) {
      this.video.autoplay = true;
      if (options.autoplayMuted) {
        this.video.muted = true;
      }
    }

    this.ev = ['play', 'playing', 'pause', 'ended', 'error', 'seeking', 'seeked', 'progress', 'timeupdate', 'waiting', 'canplay', 'canplaythrough', 'durationchange', 'volumechange', 'ratechange', 'loadedmetadata', 'loadeddata', 'loadstart'].map(function (item) {
      return _defineProperty({}, item, 'on' + item.charAt(0).toUpperCase() + item.slice(1));
    });
    (0, _eventEmitter2.default)(this);

    this._interval = {};
    var lastBuffer = '0,0';
    var self = this;

    var defaultVideoEventHandler = function defaultVideoEventHandler(name) {
      // fix when video destroy called and video reload
      if (!_this) {
        return;
      }
      if (name === 'play') {
        _this.hasStart = true;
      } else if (name === 'canplay') {
        (0, _util.removeClass)(_this.root, 'xgplayer-is-enter');
      } else if (name === 'waiting') {
        _this.inWaitingStart = new Date().getTime();
      } else if (name === 'playing') {
        (0, _util.removeClass)(_this.root, 'xgplayer-is-enter');
        if (_this.inWaitingStart) {
          _this.inWaitingStart = undefined;
        }
      }
      if (name === 'error') {
        // process the error
        _this._onError(name);
      } else {
        _this.emit(name, _this);
      }

      if (_this.hasOwnProperty('_interval')) {
        if (['ended', 'error', 'timeupdate'].indexOf(name) < 0) {
          (0, _util._clearInterval)(_this, 'bufferedChange');
          (0, _util._setInterval)(_this, 'bufferedChange', function () {
            if (this.video && this.video.buffered) {
              var curBuffer = [];
              for (var i = 0, len = this.video.buffered.length; i < len; i++) {
                curBuffer.push([this.video.buffered.start(i), this.video.buffered.end(i)]);
              }
              if (curBuffer.toString() !== lastBuffer) {
                lastBuffer = curBuffer.toString();
                this.emit('bufferedChange', curBuffer);
              }
            }
          }, 200);
        } else {
          if (name !== 'timeupdate') {
            (0, _util._clearInterval)(_this, 'bufferedChange');
          }
        }
      }
    };

    var videoEventHandler = function videoEventHandler(name) {
      if (options.videoEventMiddleware && typeof options.videoEventMiddleware[name] === 'function') {
        options.videoEventMiddleware[name].call(_this, _this, name, defaultVideoEventHandler);
      } else {
        defaultVideoEventHandler.call(_this, name);
      }
    };

    this.ev.forEach(function (item) {
      self.evItem = Object.keys(item)[0];
      var name = Object.keys(item)[0];
      self.video.addEventListener(Object.keys(item)[0], videoEventHandler.bind(self, name));
    });
  }
  /**
   * 错误监听处理逻辑抽离
   */

  _createClass(Proxy, [{
    key: '_onError',
    value: function _onError(name) {
      if (this.video && this.video.error) {
        this.emit(name, new _error2.default('other', this.currentTime, this.duration, this.networkState, this.readyState, this.currentSrc, this.src, this.ended, {
          line: 162,
          msg: this.error,
          handle: 'Constructor'
        }, this.video.error.code, this.video.error));
      }
    }
  }, {
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
    value: function getBufferedRange(buffered) {
      var range = [0, 0];
      var video = this.video;
      if (!buffered) buffered = video.buffered;
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
    key: 'proxyOn',
    value: function proxyOn(event, fn) {
      (0, _util.on)(this, event, fn, 'destroy');
    }
  }, {
    key: 'proxyOnce',
    value: function proxyOnce(event, fn) {
      (0, _util.once)(this, event, fn, 'destroy');
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
      if (this.video) {
        this.video.autoplay = isTrue;
      }
    },
    get: function get() {
      if (this.video) {
        return this.video.autoplay;
      } else {
        return false;
      }
    }
  }, {
    key: 'buffered',
    get: function get() {
      if (this.video) {
        return this.video.buffered;
      } else {
        return undefined;
      }
    }
  }, {
    key: 'buffered2',
    get: function get() {
      return (0, _util.getBuffered2)(this.video.buffered);
    }
  }, {
    key: 'crossOrigin',
    get: function get() {
      if (this.video) {
        return this.video.crossOrigin;
      } else {
        return false;
      }
    },
    set: function set(isTrue) {
      if (this.video) {
        this.video.crossOrigin = isTrue;
      }
    }
  }, {
    key: 'currentSrc',
    get: function get() {
      if (this.video) {
        return this.video.currentSrc;
      } else {
        return undefined;
      }
    }
  }, {
    key: 'currentTime',
    get: function get() {
      if (this.video) {
        return this.video.currentTime || 0;
      } else {
        return 0;
      }
    },
    set: function set(time) {
      var _this2 = this;

      if (typeof isFinite === 'function' && !isFinite(time)) return;
      if ((0, _util.hasClass)(this.root, 'xgplayer-ended')) {
        this.once('playing', function () {
          _this2.video.currentTime = time;
        });
        this.replay();
      } else {
        this.video.currentTime = time;
      }
      this.emit('currentTimeChange', time);
    }
  }, {
    key: 'defaultMuted',
    get: function get() {
      if (this.video) {
        return this.video.defaultMuted;
      } else {
        return false;
      }
    },
    set: function set(isTrue) {
      if (this.video) {
        this.video.defaultMuted = isTrue;
      }
    }
  }, {
    key: 'duration',
    get: function get() {
      if (this.config.duration) {
        if (this.video) return Math.min(this.config.duration, this.video.duration);else return this.config.duration;
      }
      if (!this.video) return null;
      return this.video.duration;
    }
  }, {
    key: 'ended',
    get: function get() {
      if (this.video) {
        return this.video.ended || false;
      } else {
        return true;
      }
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
      if (this.video) {
        return this.video.loop;
      } else {
        return false;
      }
    },
    set: function set(isTrue) {
      if (this.video) {
        this.video.loop = isTrue;
      }
    }
  }, {
    key: 'muted',
    get: function get() {
      if (this.video) {
        return this.video.muted;
      } else {
        return false;
      }
    },
    set: function set(isTrue) {
      if (this.video) {
        this.video.muted = isTrue;
      }
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
      // if(this.video) {
      //   return this.video.paused
      // } else {
      //   return false
      // }
      return (0, _util.hasClass)(this.root, 'xgplayer-pause');
    }
  }, {
    key: 'playbackRate',
    get: function get() {
      if (this.video) {
        return this.video.playbackRate;
      } else {
        return 1;
      }
    },
    set: function set(rate) {
      if (this.video) {
        this.video.playbackRate = rate;
      }
    }
  }, {
    key: 'played',
    get: function get() {
      if (this.video) {
        return this.video.played;
      } else {
        return undefined;
      }
    }
  }, {
    key: 'preload',
    get: function get() {
      if (this.video) {
        return this.video.preload;
      } else {
        return false;
      }
    },
    set: function set(isTrue) {
      if (this.video) {
        this.video.preload = isTrue;
      }
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
      if (this.video) {
        return this.video.seekable;
      } else {
        return false;
      }
    }
  }, {
    key: 'seeking',
    get: function get() {
      if (this.video) {
        return this.video.seeking;
      } else {
        return false;
      }
    }
  }, {
    key: 'src',
    get: function get() {
      if (this.video) {
        return this.video.src;
      } else {
        return undefined;
      }
    },
    set: function set(url) {
      if (!(0, _util.hasClass)(this.root, 'xgplayer-ended')) {
        this.emit('urlchange', this.video.src);
      }
      (0, _util.removeClass)(this.root, 'xgplayer-ended xgplayer-is-replay xgplayer-is-error');
      this.video.pause();
      this.emit('pause');
      this.video.src = url;
      this.emit('srcChange');
    }
  }, {
    key: 'poster',
    set: function set(posterUrl) {
      var poster = (0, _util.findDom)(this.root, '.xgplayer-poster');
      if (poster) {
        poster.style.backgroundImage = 'url(' + posterUrl + ')';
      }
    }
  }, {
    key: 'volume',
    get: function get() {
      if (this.video) {
        return this.video.volume;
      } else {
        return 1;
      }
    },
    set: function set(vol) {
      if (this.video) {
        this.video.volume = vol;
      }
    }
  }, {
    key: 'fullscreen',
    get: function get() {
      return (0, _util.hasClass)(this.root, 'xgplayer-is-fullscreen') || (0, _util.hasClass)(this.root, 'xgplayer-fullscreen-active');
    }
  }, {
    key: 'bullet',
    get: function get() {
      return (0, _util.findDom)(this.root, 'xg-danmu') ? (0, _util.hasClass)((0, _util.findDom)(this.root, 'xg-danmu'), 'xgplayer-has-danmu') : false;
    }
  }, {
    key: 'textTrack',
    get: function get() {
      return (0, _util.hasClass)(this.root, 'xgplayer-is-textTrack');
    }
  }, {
    key: 'pip',
    get: function get() {
      return (0, _util.hasClass)(this.root, 'xgplayer-pip-active');
    }
  }]);

  return Proxy;
}();

exports.default = Proxy;
module.exports = exports['default'];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var d = __webpack_require__(13),
    callable = __webpack_require__(30),
    apply = Function.prototype.apply,
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

	callable(listener);

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

	callable(listener);
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

	callable(listener);

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
	on: d(on),
	once: d(once),
	off: d(off),
	emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function (o) {
	return o == null ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(6),
    isPlainFunction = __webpack_require__(14),
    assign = __webpack_require__(18),
    normalizeOpts = __webpack_require__(26),
    contains = __webpack_require__(27);

var d = module.exports = function (dscr, value /*, options*/) {
	var c, e, w, options, desc;
	if (arguments.length < 2 || typeof dscr !== "string") {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
		w = contains.call(dscr, "w");
	} else {
		c = w = true;
		e = false;
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
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
	if (!isValue(get)) {
		get = undefined;
	} else if (!isPlainFunction(get)) {
		options = get;
		get = set = undefined;
	} else if (!isValue(set)) {
		set = undefined;
	} else if (!isPlainFunction(set)) {
		options = set;
		set = undefined;
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
	} else {
		c = true;
		e = false;
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isFunction = __webpack_require__(15);

var classRe = /^\s*class[\s{/}]/,
    functionToString = Function.prototype.toString;

module.exports = function (value) {
	if (!isFunction(value)) return false;
	if (classRe.test(functionToString.call(value))) return false;
	return true;
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isPrototype = __webpack_require__(16);

module.exports = function (value) {
	if (typeof value !== "function") return false;

	if (!hasOwnProperty.call(value, "length")) return false;

	try {
		if (typeof value.length !== "number") return false;
		if (typeof value.call !== "function") return false;
		if (typeof value.apply !== "function") return false;
	} catch (error) {
		return false;
	}

	return !isPrototype(value);
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(17);

module.exports = function (value) {
	if (!isObject(value)) return false;
	try {
		if (!value.constructor) return false;
		return value.constructor.prototype === value;
	} catch (error) {
		return false;
	}
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(6);

// prettier-ignore
var possibleTypes = { "object": true, "function": true, "undefined": true /* document.all */ };

module.exports = function (value) {
	if (!isValue(value)) return false;
	return hasOwnProperty.call(possibleTypes, typeof value);
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(19)() ? Object.assign : __webpack_require__(20);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var assign = Object.assign,
	    obj;
	if (typeof assign !== "function") return false;
	obj = { foo: "raz" };
	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
	return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = __webpack_require__(21),
    value = __webpack_require__(25),
    max = Math.max;

module.exports = function (dest, src /*, …srcn*/) {
	var error,
	    i,
	    length = max(arguments.length, 2),
	    assign;
	dest = Object(value(dest));
	assign = function (key) {
		try {
			dest[key] = src[key];
		} catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < length; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(22)() ? Object.keys : __webpack_require__(23);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	try {
		Object.keys("primitive");
		return true;
	} catch (e) {
		return false;
	}
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(3);

var keys = Object.keys;

module.exports = function (object) {
  return keys(isValue(object) ? Object(object) : object);
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// eslint-disable-next-line no-empty-function

module.exports = function () {};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(3);

module.exports = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(3);

var forEach = Array.prototype.forEach,
    create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

// eslint-disable-next-line no-unused-vars
module.exports = function (opts1 /*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (!isValue(options)) return;
		process(Object(options), result);
	});
	return result;
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(28)() ? String.prototype.contains : __webpack_require__(29);

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.contains !== "function") return false;
	return str.contains("dwa") === true && str.contains("foo") === false;
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var indexOf = String.prototype.indexOf;

module.exports = function (searchString /*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (fn) {
	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
	return fn;
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var value = __webpack_require__(32),
    hasOwnProperty = Object.prototype.hasOwnProperty;

module.exports = function (emitter /*, type*/) {
	var type = arguments[1],
	    data;

	value(emitter);

	if (type !== undefined) {
		data = hasOwnProperty.call(emitter, '__ee__') && emitter.__ee__;
		if (!data) return;
		if (data[type]) delete data[type];
		return;
	}
	if (hasOwnProperty.call(emitter, '__ee__')) delete emitter.__ee__;
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(33);

module.exports = function (value) {
	if (!isObject(value)) throw new TypeError(value + " is not an Object");
	return value;
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(3);

var map = { function: true, object: true };

module.exports = function (value) {
  return isValue(value) && map[typeof value] || false;
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(35);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".xgplayer-skin-default{background:#000;width:100%;height:100%;position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none;-ms-user-select:none}.xgplayer-skin-default *{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}.xgplayer-skin-default.xgplayer-rotate-fullscreen{position:absolute;top:0;left:100%;bottom:0;right:0;height:100vw!important;width:100vh!important;-webkit-transform-origin:top left;-ms-transform-origin:top left;transform-origin:top left;-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}.xgplayer-skin-default.xgplayer-is-fullscreen{width:100%!important;height:100%!important;padding-top:0!important;z-index:9999}.xgplayer-skin-default.xgplayer-is-fullscreen.xgplayer-inactive{cursor:none}.xgplayer-skin-default video{width:100%;height:100%;outline:none}.xgplayer-skin-default .xgplayer-none{display:none}@-webkit-keyframes loadingRotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes loadingRotate{0%{-webkit-transform:rotate(0);transform:rotate(0)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@-webkit-keyframes loadingDashOffset{0%{stroke-dashoffset:236}to{stroke-dashoffset:0}}@keyframes loadingDashOffset{0%{stroke-dashoffset:236}to{stroke-dashoffset:0}}.xgplayer-skin-default .xgplayer-controls{display:-webkit-flex;display:-moz-box;display:flex;position:absolute;bottom:0;left:0;right:0;height:40px;background-image:linear-gradient(180deg,transparent,rgba(0,0,0,.37),rgba(0,0,0,.75),rgba(0,0,0,.75));z-index:10}.xgplayer-skin-default.xgplayer-inactive .xgplayer-controls,.xgplayer-skin-default.xgplayer-is-live .xgplayer-controls .xgplayer-progress,.xgplayer-skin-default.xgplayer-is-live .xgplayer-controls .xgplayer-time,.xgplayer-skin-default.xgplayer-no-controls .xgplayer-controls,.xgplayer-skin-default.xgplayer-nostart .xgplayer-controls{display:none}.xgplayer-skin-default.xgplayer-is-live .xgplayer-controls .xgplayer-live{display:block}.xgplayer-skin-default .xgplayer-live{display:block;font-size:12px;color:#fff;line-height:40px;-webkit-order:1;-moz-box-ordinal-group:2;order:1}.xgplayer-skin-default .xgplayer-icon{display:block;width:40px;height:40px;overflow:hidden;fill:#fff}.xgplayer-skin-default .xgplayer-icon svg{position:absolute}.xgplayer-skin-default .xgplayer-tips{background:rgba(0,0,0,.54);border-radius:1px;display:none;position:absolute;font-family:PingFangSC-Regular;font-size:11px;color:#fff;padding:2px 4px;text-align:center;top:-30px;left:50%;margin-left:-16px;width:auto;white-space:nowrap}.xgplayer-skin-default.xgplayer-mobile .xgplayer-tips{display:none!important}.xgplayer-skin-default .xgplayer-screen-container{display:block;width:100%}", ""]);

// exports


/***/ }),
/* 36 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var mobile = function mobile() {
  var player = this;
  var root = player.root;
  var clk = 0;var _click_ = void 0;
  var clickedTime = {
    first: '',
    second: ''
  };

  player.onElementTouchend = function (e, element) {
    if (!this.config.closeVideoPreventDefault) {
      e.preventDefault();
    }
    if (!this.config.closeVideoStopPropagation) {
      e.stopPropagation();
    }
    var player = this;
    if ((0, _util.hasClass)(root, 'xgplayer-inactive')) {
      player.emit('focus');
    } else {
      player.emit('blur');
    }
    if (!player.config.closeVideoTouch && !player.isTouchMove) {
      var onTouch = function onTouch() {
        _click_ = setTimeout(function () {
          if ((0, _util.hasClass)(player.root, 'xgplayer-nostart')) {
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
      };

      if (!player.config.closeVideoClick) {
        clk++;
        if (_click_) {
          clearTimeout(_click_);
        }
        if (clk === 1) {
          if (player.config.enableVideoDbltouch) {
            clickedTime.first = new Date();
          } else {
            onTouch();
          }
        } else if (clk === 2) {
          if (player.config.enableVideoDbltouch) {
            clickedTime.second = new Date();
            if (Math.abs(clickedTime.first - clickedTime.second) < 400) {
              // 双击
              onTouch();
            } else {
              clickedTime.first = new Date();
              clk = 1;
            }
          } else {
            clk = 0;
          }
        } else {
          clk = 0;
        }
      }
    }
  };

  function onReady(e) {
    player.video.addEventListener('touchend', function (e) {
      player.onElementTouchend(e, player.video);
    });
    player.video.addEventListener('touchstart', function () {
      player.isTouchMove = false;
    });
    player.video.addEventListener('touchmove', function () {
      player.isTouchMove = true;
    });
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

exports.default = {
  name: 'mobile',
  method: mobile
};
module.exports = exports['default'];

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var pc = function pc() {
  var player = this;
  if (!player.controls || !player.video) return;
  var controls = player.controls;var root = player.root;
  var clk = 0;var _click_ = void 0;

  player.onElementClick = function (e, element) {
    if (!this.config.closeVideoPreventDefault) {
      e.preventDefault();
    }
    if (!this.config.closeVideoStopPropagation) {
      e.stopPropagation();
    }
    var player = this;
    if (!player.config.closeVideoClick) {
      clk++;
      if (_click_) {
        clearTimeout(_click_);
      }
      if (clk === 1) {
        _click_ = setTimeout(function () {
          if ((0, _util.hasClass)(player.root, 'xgplayer-nostart')) {
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
    if (!this.config.closeVideoPreventDefault) {
      e.preventDefault();
    }
    if (!this.config.closeVideoStopPropagation) {
      e.stopPropagation();
    }
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
  controls.addEventListener('mouseenter', onControlMouseEnter);

  function onControlMouseLeave(e) {
    if (!player.config.closeControlsBlur) {
      player.emit('focus', player);
    }
  }
  controls.addEventListener('mouseleave', onControlMouseLeave);

  function onControlClick(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  controls.addEventListener('click', onControlClick);

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

exports.default = {
  name: 'pc',
  method: pc
};
module.exports = exports['default'];

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var start = function start() {
  var player = this;
  var root = player.root;

  function onCanPlay() {
    player.off('canplay', onCanPlay);
    var playPromise = player.play();
    if (playPromise !== undefined && playPromise) {
      playPromise.catch(function (err) {});
    }
  }

  function onStartBtnClick() {
    if ((0, _util.hasClass)(root, 'xgplayer-nostart')) {
      (0, _util.removeClass)(root, 'xgplayer-nostart'); // for ie quick switch
      (0, _util.addClass)(root, 'xgplayer-is-enter');

      if (typeof root.contains === 'function') {
        if (player.video && player.video.nodeType === 1 && !root.contains(player.video) || player.video && player.video.nodeType !== 1 && player.video.mediaSource === undefined) {
          player.once('canplay', onCanPlay);
          player.start();
        } else {
          onCanPlay();
        }
      } else {
        if (player.video && player.video.nodeType === 1 && !root.querySelector(this.videoConfig.mediaType) || player.video && player.video.nodeType !== 1 && player.video.mediaSource === undefined) {
          player.once('canplay', onCanPlay);
          player.start();
        } else {
          onCanPlay();
        }
      }
    } else {
      if (player.paused) {
        (0, _util.removeClass)(root, 'xgplayer-nostart xgplayer-isloading');
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
    player.off('startBtnClick', onStartBtnClick);
    player.off('canplay', onCanPlay);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

exports.default = {
  name: 'start',
  method: start
};
module.exports = exports['default'];

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var _startPlay = __webpack_require__(41);

var _startPlay2 = _interopRequireDefault(_startPlay);

var _startPause = __webpack_require__(42);

var _startPause2 = _interopRequireDefault(_startPause);

__webpack_require__(43);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var s_start = function s_start() {
  var player = this;
  var root = player.root;
  var btn = (0, _util.createDom)('xg-start', '<div class="xgplayer-icon-play">' + _startPlay2.default + '</div>\n                                      <div class="xgplayer-icon-pause">' + _startPause2.default + '</div>', {}, 'xgplayer-start');
  function onPlayerReady(player) {
    (0, _util.addClass)(player.root, 'xgplayer-skin-default');
    if (player.config) {
      player.config.autoplay && !(0, _util.isWeiXin)() && !(0, _util.isUc)() && (0, _util.addClass)(player.root, 'xgplayer-is-enter');
      if (player.config.lang && player.config.lang === 'en') {
        (0, _util.addClass)(player.root, 'xgplayer-lang-is-en');
      } else if (player.config.lang === 'jp') {
        (0, _util.addClass)(player.root, 'xgplayer-lang-is-jp');
      }
      if (!player.config.enableContextmenu) {
        player.video.addEventListener('contextmenu', function (e) {
          e.preventDefault();
          e.stopPropagation();
        });
      }
    }
  }

  if (player.config && player.config.hideStartBtn) {
    (0, _util.addClass)(root, 'xgplayer-start-hide');
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

  player.once('autoplay was prevented', function () {
    (0, _util.removeClass)(player.root, 'xgplayer-is-enter');
    (0, _util.addClass)(player.root, 'xgplayer-nostart');
  });

  player.once('canplay', function () {
    (0, _util.removeClass)(player.root, 'xgplayer-is-enter');
  });

  btn.onclick = function (e) {
    e.preventDefault();
    e.stopPropagation();
    player.userGestureTrigEvent('startBtnClick');
  };
};

exports.default = {
  name: 's_start',
  method: s_start
};
module.exports = exports['default'];

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"70\" height=\"70\" viewBox=\"0 0 70 70\">\n  <path transform=\"translate(15,15) scale(0.04,0.04)\" d=\"M576,363L810,512L576,661zM342,214L576,363L576,661L342,810z\"></path>\n</svg>\n");

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"70\" height=\"70\" viewBox=\"0 0 70 70\">\n  <path transform=\"translate(15,15) scale(0.04 0.04)\" d=\"M598,214h170v596h-170v-596zM256 810v-596h170v596h-170z\"></path>\n</svg>\n");

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(44);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".xgplayer-skin-default .xgplayer-start{border-radius:50%;display:inline-block;width:70px;height:70px;background:rgba(0,0,0,.38);overflow:hidden;text-align:center;line-height:70px;vertical-align:middle;position:absolute;left:50%;top:50%;z-index:115;margin:-35px auto auto -35px;cursor:pointer}.xgplayer-skin-default .xgplayer-start div{position:absolute}.xgplayer-skin-default .xgplayer-start div svg{fill:hsla(0,0%,100%,.7)}.xgplayer-skin-default .xgplayer-start .xgplayer-icon-play{display:block}.xgplayer-skin-default .xgplayer-start .xgplayer-icon-pause{display:none}.xgplayer-skin-default .xgplayer-start:hover{opacity:.85}.xgplayer-skin-default.xgplayer-pause.xgplayer-start-hide .xgplayer-start,.xgplayer-skin-default.xgplayer-playing .xgplayer-start,.xgplayer-skin-default.xgplayer-playing .xgplayer-start .xgplayer-icon-play,.xgplayer-skin-default.xgplayer-start-hide .xgplayer-start{display:none}.xgplayer-skin-default.xgplayer-playing .xgplayer-start .xgplayer-icon-pause{display:block}.xgplayer-skin-default.xgplayer-pause .xgplayer-start{display:inline-block}.xgplayer-skin-default.xgplayer-pause .xgplayer-start .xgplayer-icon-play{display:block}.xgplayer-skin-default.xgplayer-is-replay .xgplayer-start,.xgplayer-skin-default.xgplayer-pause .xgplayer-start .xgplayer-icon-pause{display:none}.xgplayer-skin-default.xgplayer-is-replay .xgplayer-start .xgplayer-icon-play{display:block}.xgplayer-skin-default.xgplayer-is-replay .xgplayer-start .xgplayer-icon-pause{display:none}", ""]);

// exports


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var fullscreen = function fullscreen() {
  var player = this;
  var root = player.root;

  function onFullscreenBtnClick() {
    if (player.config.rotateFullscreen) {
      if ((0, _util.hasClass)(root, 'xgplayer-rotate-fullscreen')) {
        player.exitRotateFullscreen();
      } else {
        player.getRotateFullscreen();
      }
    } else {
      if ((0, _util.hasClass)(root, 'xgplayer-is-fullscreen')) {
        player.exitFullscreen(root);
      } else {
        player.getFullscreen(root);
      }
    }
  }
  player.on('fullscreenBtnClick', onFullscreenBtnClick);

  function onFullscreenChange() {
    var fullscreenEl = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    if (fullscreenEl && fullscreenEl === root) {
      (0, _util.addClass)(root, 'xgplayer-is-fullscreen');
      player.emit('requestFullscreen');
    } else if ((0, _util.hasClass)(root, 'xgplayer-is-fullscreen')) {
      (0, _util.removeClass)(root, 'xgplayer-is-fullscreen');
      player.emit('exitFullscreen');
    }
    if (player.danmu && typeof player.danmu.resize === 'function') {
      player.danmu.resize();
    }
  };
  ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(function (item) {
    document.addEventListener(item, onFullscreenChange);
  });

  player.video.addEventListener('webkitbeginfullscreen', function () {
    (0, _util.addClass)(root, 'xgplayer-is-fullscreen');
    player.emit('requestFullscreen');
  });

  player.video.addEventListener('webkitendfullscreen', function () {
    (0, _util.removeClass)(root, 'xgplayer-is-fullscreen');
    player.emit('exitFullscreen');
  });

  function onWebkitpresentationmodechanged(e) {
    var mode = player.video.webkitPresentationMode;
    // 非全屏模式 退出全屏
    if (mode !== _util.PresentationMode.FULLSCREEN) {
      (0, _util.removeClass)(root, 'xgplayer-is-fullscreen');
      player.emit('exitFullscreen');
    }
  }

  (0, _util.checkWebkitSetPresentationMode)(player.video) && player.video.addEventListener('webkitpresentationmodechanged', onWebkitpresentationmodechanged);

  function onDestroy() {
    player.off('fullscreenBtnClick', onFullscreenBtnClick);
    ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(function (item) {
      document.removeEventListener(item, onFullscreenChange);
    });

    (0, _util.checkWebkitSetPresentationMode)(player.video) && player.video.removeEventListener('webkitpresentationmodechanged', onWebkitpresentationmodechanged);

    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);

  player.getFullscreen = function (el) {
    var player = this;
    if (el.requestFullscreen) {
      var fullscreenPromise = el.requestFullscreen();
      if (fullscreenPromise) {
        fullscreenPromise.catch(function () {
          player.emit('fullscreen error');
        });
      }
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen(window.Element.ALLOW_KEYBOARD_INPUT);
    } else if (player.video.webkitSupportsFullscreen) {
      player.video.webkitEnterFullscreen();
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen();
    } else {
      (0, _util.addClass)(el, 'xgplayer-is-cssfullscreen');
    }
  };

  player.exitFullscreen = function (el) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    (0, _util.removeClass)(el, 'xgplayer-is-cssfullscreen');
  };

  player.getRotateFullscreen = function () {
    var player = this;
    document.documentElement.style.width = '100%';
    document.documentElement.style.height = '100%';
    if (player.config.fluid) {
      player.root.style['padding-top'] = '';
      player.root.style['max-width'] = 'unset';
    }
    if (player.root && !(0, _util.hasClass)(player.root, 'xgplayer-rotate-fullscreen')) {
      (0, _util.addClass)(player.root, 'xgplayer-rotate-fullscreen');
    }
    player.emit('getRotateFullscreen');
  };

  player.exitRotateFullscreen = function () {
    var player = this;
    document.documentElement.style.width = 'unset';
    document.documentElement.style.height = 'unset';
    if (player.config.fluid) {
      player.root.style['width'] = '100%';
      player.root.style['height'] = '0';
      player.root.style['padding-top'] = player.config.height * 100 / player.config.width + '%';
      player.root.style['max-width'] = '100%';
    }
    if (player.root && (0, _util.hasClass)(player.root, 'xgplayer-rotate-fullscreen')) {
      (0, _util.removeClass)(player.root, 'xgplayer-rotate-fullscreen');
    }
    player.emit('exitRotateFullscreen');
  };
};

exports.default = {
  name: 'fullscreen',
  method: fullscreen
};
module.exports = exports['default'];

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var play = function play() {
  var player = this;

  function onPlayBtnClick() {
    if (!player.config.allowPlayAfterEnded && player.ended) {
      return;
    }
    if ((0, _util.hasClass)(player.root, 'xgplayer-nostart')) {
      player.start();
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

exports.default = {
  name: 'play',
  method: play
};
module.exports = exports['default'];

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var replay = function replay() {
  var player = this;
  var root = player.root;

  function onReplayBtnClick() {
    (0, _util.removeClass)(root, 'xgplayer-is-replay');
    player.replay();
  }
  player.on('replayBtnClick', onReplayBtnClick);

  function onEnded() {
    if (!player.config.loop) {
      (0, _util.addClass)(root, 'xgplayer-is-replay');
    }
  }
  player.on('ended', onEnded);

  function onDestroy() {
    player.off('replayBtnClick', onReplayBtnClick);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

exports.default = {
  name: 'replay',
  method: replay
};
module.exports = exports['default'];

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var _play = __webpack_require__(49);

var _play2 = _interopRequireDefault(_play);

var _pause = __webpack_require__(50);

var _pause2 = _interopRequireDefault(_pause);

__webpack_require__(51);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var s_play = function s_play() {
  var player = this;
  var playBtn = player.config.playBtn ? player.config.playBtn : {};
  var btn = void 0;
  if (playBtn.type === 'img') {
    btn = (0, _util.createImgBtn)('play', playBtn.url.play, playBtn.width, playBtn.height);
  } else {
    btn = (0, _util.createDom)('xg-play', '<xg-icon class="xgplayer-icon">\n                                      <div class="xgplayer-icon-play">' + _play2.default + '</div>\n                                      <div class="xgplayer-icon-pause">' + _pause2.default + '</div>\n                                     </xg-icon>', {}, 'xgplayer-play');
  }

  var tipsText = {};
  tipsText.play = player.lang.PLAY_TIPS;
  tipsText.pause = player.lang.PAUSE_TIPS;
  var tips = (0, _util.createDom)('xg-tips', '<span class="xgplayer-tip-play">' + tipsText.play + '</span>\n                                        <span class="xgplayer-tip-pause">' + tipsText.pause + '</span>', {}, 'xgplayer-tips');
  btn.appendChild(tips);
  player.once('ready', function () {
    if (player.controls) {
      player.controls.appendChild(btn);
    }
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.userGestureTrigEvent('playBtnClick');
    });
  });
};

exports.default = {
  name: 's_play',
  method: s_play
};
module.exports = exports['default'];

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\">\n  <path transform=\"translate(2,2) scale(0.0320625 0.0320625)\" d=\"M576,363L810,512L576,661zM342,214L576,363L576,661L342,810z\"></path>\n</svg>\n");

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\">\n  <path transform=\"translate(2,2) scale(0.0320625 0.0320625)\" d=\"M598,214h170v596h-170v-596zM256 810v-596h170v596h-170z\"></path>\n</svg>\n");

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(52);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".xgplayer-skin-default .xgplayer-play,.xgplayer-skin-default .xgplayer-play-img{width:40px;position:relative;-webkit-order:0;-moz-box-ordinal-group:1;order:0;display:block;cursor:pointer;margin-left:3px}.xgplayer-skin-default .xgplayer-play-img .xgplayer-icon,.xgplayer-skin-default .xgplayer-play .xgplayer-icon{margin-top:3px;width:32px}.xgplayer-skin-default .xgplayer-play-img .xgplayer-icon div,.xgplayer-skin-default .xgplayer-play .xgplayer-icon div{position:absolute}.xgplayer-skin-default .xgplayer-play-img .xgplayer-icon .xgplayer-icon-play,.xgplayer-skin-default .xgplayer-play .xgplayer-icon .xgplayer-icon-play{display:block}.xgplayer-skin-default .xgplayer-play-img .xgplayer-icon .xgplayer-icon-pause,.xgplayer-skin-default .xgplayer-play .xgplayer-icon .xgplayer-icon-pause{display:none}.xgplayer-skin-default .xgplayer-play-img .xgplayer-tips .xgplayer-tip-play,.xgplayer-skin-default .xgplayer-play .xgplayer-tips .xgplayer-tip-play{display:block}.xgplayer-skin-default .xgplayer-play-img .xgplayer-tips .xgplayer-tip-pause,.xgplayer-skin-default .xgplayer-play .xgplayer-tips .xgplayer-tip-pause{display:none}.xgplayer-skin-default .xgplayer-play-img:hover,.xgplayer-skin-default .xgplayer-play:hover{opacity:.85}.xgplayer-skin-default .xgplayer-play-img:hover .xgplayer-tips,.xgplayer-skin-default .xgplayer-play:hover .xgplayer-tips{display:block}.xgplayer-skin-default.xgplayer-playing .xgplayer-play-img .xgplayer-icon .xgplayer-icon-play,.xgplayer-skin-default.xgplayer-playing .xgplayer-play .xgplayer-icon .xgplayer-icon-play{display:none}.xgplayer-skin-default.xgplayer-playing .xgplayer-play-img .xgplayer-icon .xgplayer-icon-pause,.xgplayer-skin-default.xgplayer-playing .xgplayer-play .xgplayer-icon .xgplayer-icon-pause{display:block}.xgplayer-skin-default.xgplayer-playing .xgplayer-play-img .xgplayer-tips .xgplayer-tip-play,.xgplayer-skin-default.xgplayer-playing .xgplayer-play .xgplayer-tips .xgplayer-tip-play{display:none}.xgplayer-skin-default.xgplayer-pause .xgplayer-play-img .xgplayer-icon .xgplayer-icon-play,.xgplayer-skin-default.xgplayer-pause .xgplayer-play .xgplayer-icon .xgplayer-icon-play,.xgplayer-skin-default.xgplayer-playing .xgplayer-play-img .xgplayer-tips .xgplayer-tip-pause,.xgplayer-skin-default.xgplayer-playing .xgplayer-play .xgplayer-tips .xgplayer-tip-pause{display:block}.xgplayer-skin-default.xgplayer-pause .xgplayer-play-img .xgplayer-icon .xgplayer-icon-pause,.xgplayer-skin-default.xgplayer-pause .xgplayer-play .xgplayer-icon .xgplayer-icon-pause{display:none}.xgplayer-skin-default.xgplayer-pause .xgplayer-play-img .xgplayer-tips .xgplayer-tip-play,.xgplayer-skin-default.xgplayer-pause .xgplayer-play .xgplayer-tips .xgplayer-tip-play{display:block}.xgplayer-skin-default.xgplayer-pause .xgplayer-play-img .xgplayer-tips .xgplayer-tip-pause,.xgplayer-skin-default.xgplayer-pause .xgplayer-play .xgplayer-tips .xgplayer-tip-pause{display:none}", ""]);

// exports


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

__webpack_require__(54);

var s_poster = function s_poster() {
  var player = this;
  var root = player.root;
  if (!player.config.poster) {
    return;
  }
  var poster = (0, _util.createDom)('xg-poster', '', {}, 'xgplayer-poster');
  poster.style.backgroundImage = 'url(' + player.config.poster + ')';
  root.appendChild(poster);
};

exports.default = {
  name: 's_poster',
  method: s_poster
};
module.exports = exports['default'];

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(55);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".xgplayer-skin-default .xgplayer-poster{display:none;position:absolute;left:0;top:0;width:100%;height:100%;z-index:100;background-size:cover;background-position:50%}.xgplayer-skin-default.xgplayer-nostart .xgplayer-poster{display:block}", ""]);

// exports


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

__webpack_require__(57);

var s_flex = function s_flex() {
  var player = this;
  var playceholder = (0, _util.createDom)('xg-placeholder', '', {}, 'xgplayer-placeholder');
  player.controls.appendChild(playceholder);
};

exports.default = {
  name: 's_flex',
  method: s_flex
};
module.exports = exports['default'];

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(58);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".xgplayer-skin-default .xgplayer-placeholder{-webkit-flex:1;-moz-box-flex:1;flex:1;-webkit-order:3;-moz-box-ordinal-group:4;order:3;display:block}", ""]);

// exports


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var _requestFull = __webpack_require__(60);

var _requestFull2 = _interopRequireDefault(_requestFull);

var _exitFull = __webpack_require__(61);

var _exitFull2 = _interopRequireDefault(_exitFull);

__webpack_require__(62);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var s_fullscreen = function s_fullscreen() {
  var player = this;
  var fullscreenBtn = player.config.fullscreenBtn ? player.config.fullscreenBtn : {};
  var btn = void 0;
  if (fullscreenBtn.type === 'img') {
    btn = (0, _util.createImgBtn)('fullscreen', fullscreenBtn.url.request, fullscreenBtn.width, fullscreenBtn.height);
  } else {
    btn = (0, _util.createDom)('xg-fullscreen', '<xg-icon class="xgplayer-icon">\n                                             <div class="xgplayer-icon-requestfull">' + _requestFull2.default + '</div>\n                                             <div class="xgplayer-icon-exitfull">' + _exitFull2.default + '</div>\n                                           </xg-icon>', {}, 'xgplayer-fullscreen');
  }

  var tipsText = {};
  tipsText.requestfull = player.lang.FULLSCREEN_TIPS;
  tipsText.exitfull = player.lang.EXITFULLSCREEN_TIPS;
  var tips = (0, _util.createDom)('xg-tips', '<span class="xgplayer-tip-requestfull">' + tipsText.requestfull + '</span>\n                                        <span class="xgplayer-tip-exitfull">' + tipsText.exitfull + '</span>', {}, 'xgplayer-tips');
  btn.appendChild(tips);
  player.once('ready', function () {
    if (player.controls) {
      player.controls.appendChild(btn);
    }
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.userGestureTrigEvent('fullscreenBtnClick');
    });
  });
};

exports.default = {
  name: 's_fullscreen',
  method: s_fullscreen
};
module.exports = exports['default'];

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\">\n  <path transform=\"scale(0.0320625 0.0320625)\" d=\"M598 214h212v212h-84v-128h-128v-84zM726 726v-128h84v212h-212v-84h128zM214 426v-212h212v84h-128v128h-84zM298 598v128h128v84h-212v-212h84z\"></path>\n</svg>\n");

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\">\n  <path transform=\"scale(0.0320625 0.0320625)\" d=\"M682 342h128v84h-212v-212h84v128zM598 810v-212h212v84h-128v128h-84zM342 342v-128h84v212h-212v-84h128zM214 682v-84h212v212h-84v-128h-128z\"></path>\n</svg>\n");

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(63);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".xgplayer-skin-default .xgplayer-fullscreen,.xgplayer-skin-default .xgplayer-fullscreen-img{position:relative;-webkit-order:13;-moz-box-ordinal-group:14;order:13;display:block;cursor:pointer;margin-left:5px;margin-right:3px}.xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-icon,.xgplayer-skin-default .xgplayer-fullscreen .xgplayer-icon{margin-top:3px}.xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-icon div,.xgplayer-skin-default .xgplayer-fullscreen .xgplayer-icon div{position:absolute}.xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-icon .xgplayer-icon-requestfull,.xgplayer-skin-default .xgplayer-fullscreen .xgplayer-icon .xgplayer-icon-requestfull{display:block}.xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-icon .xgplayer-icon-exitfull,.xgplayer-skin-default .xgplayer-fullscreen .xgplayer-icon .xgplayer-icon-exitfull{display:none}.xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-tips,.xgplayer-skin-default .xgplayer-fullscreen .xgplayer-tips{position:absolute;right:0;left:auto}.xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-tips .xgplayer-tip-requestfull,.xgplayer-skin-default .xgplayer-fullscreen .xgplayer-tips .xgplayer-tip-requestfull{display:block}.xgplayer-skin-default .xgplayer-fullscreen-img .xgplayer-tips .xgplayer-tip-exitfull,.xgplayer-skin-default .xgplayer-fullscreen .xgplayer-tips .xgplayer-tip-exitfull{display:none}.xgplayer-skin-default .xgplayer-fullscreen-img:hover,.xgplayer-skin-default .xgplayer-fullscreen:hover{opacity:.85}.xgplayer-skin-default .xgplayer-fullscreen-img:hover .xgplayer-tips,.xgplayer-skin-default .xgplayer-fullscreen:hover .xgplayer-tips{display:block}.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen-img .xgplayer-icon .xgplayer-icon-requestfull,.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen .xgplayer-icon .xgplayer-icon-requestfull,.xgplayer-skin-default.xgplayer-rotate-fullscreen .xgplayer-fullscreen-img .xgplayer-icon .xgplayer-icon-requestfull,.xgplayer-skin-default.xgplayer-rotate-fullscreen .xgplayer-fullscreen .xgplayer-icon .xgplayer-icon-requestfull{display:none}.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen-img .xgplayer-icon .xgplayer-icon-exitfull,.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen .xgplayer-icon .xgplayer-icon-exitfull,.xgplayer-skin-default.xgplayer-rotate-fullscreen .xgplayer-fullscreen-img .xgplayer-icon .xgplayer-icon-exitfull,.xgplayer-skin-default.xgplayer-rotate-fullscreen .xgplayer-fullscreen .xgplayer-icon .xgplayer-icon-exitfull{display:block}.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen-img .xgplayer-tips .xgplayer-tip-requestfull,.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen .xgplayer-tips .xgplayer-tip-requestfull,.xgplayer-skin-default.xgplayer-rotate-fullscreen .xgplayer-fullscreen-img .xgplayer-tips .xgplayer-tip-requestfull,.xgplayer-skin-default.xgplayer-rotate-fullscreen .xgplayer-fullscreen .xgplayer-tips .xgplayer-tip-requestfull{display:none}.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen-img .xgplayer-tips .xgplayer-tip-exitfull,.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-fullscreen .xgplayer-tips .xgplayer-tip-exitfull,.xgplayer-skin-default.xgplayer-rotate-fullscreen .xgplayer-fullscreen-img .xgplayer-tips .xgplayer-tip-exitfull,.xgplayer-skin-default.xgplayer-rotate-fullscreen .xgplayer-fullscreen .xgplayer-tips .xgplayer-tip-exitfull{display:block}", ""]);

// exports


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var _loading = __webpack_require__(65);

var _loading2 = _interopRequireDefault(_loading);

__webpack_require__(66);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var s_loading = function s_loading() {
  var player = this;
  var root = player.root;
  var container = (0, _util.createDom)('xg-loading', '' + _loading2.default, {}, 'xgplayer-loading');
  player.once('ready', function () {
    root.appendChild(container);
  });
};

exports.default = {
  name: 's_loading',
  method: s_loading
};
module.exports = exports['default'];

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewbox=\"0 0 100 100\">\n  <path d=\"M100,50A50,50,0,1,1,50,0\"></path>\n</svg>\n");

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(67);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".xgplayer-skin-default .xgplayer-loading{display:none;width:100px;height:100px;overflow:hidden;-webkit-transform:scale(.7);-ms-transform:scale(.7);transform:scale(.7);position:absolute;left:50%;top:50%;margin:-50px auto auto -50px}.xgplayer-skin-default .xgplayer-loading svg{border-radius:50%;-webkit-transform-origin:center;-ms-transform-origin:center;transform-origin:center;-webkit-animation:loadingRotate 1s linear infinite;animation:loadingRotate 1s linear infinite}.xgplayer-skin-default .xgplayer-loading svg path{stroke:#ddd;stroke-dasharray:236;-webkit-animation:loadingDashOffset 2s linear infinite;animation:loadingDashOffset 2s linear infinite;animation-direction:alternate-reverse;fill:none;stroke-width:12px}.xgplayer-skin-default.xgplayer-nostart .xgplayer-loading{display:none}.xgplayer-skin-default.xgplayer-pause .xgplayer-loading{display:none!important}.xgplayer-skin-default.xgplayer-isloading .xgplayer-loading{display:block}", ""]);

// exports


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var _sniffer = __webpack_require__(5);

var _sniffer2 = _interopRequireDefault(_sniffer);

__webpack_require__(69);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var isRotateFullscreen = function isRotateFullscreen(player) {
  return (0, _util.hasClass)(player.root, 'xgplayer-rotate-fullscreen');
};

var s_progress = function s_progress() {
  var player = this;
  var container = (0, _util.createDom)('xg-progress', '<xg-outer class="xgplayer-progress-outer">\n                                                   <xg-cache class="xgplayer-progress-cache"></xg-cache>\n                                                   <xg-played class="xgplayer-progress-played">\n                                                     <xg-progress-btn class="xgplayer-progress-btn"></xg-progress-btn>\n                                                     <xg-point class="xgplayer-progress-point xgplayer-tips"></xg-point>\n                                                     <xg-thumbnail class="xgplayer-progress-thumbnail xgplayer-tips"></xg-thumbnail>\n                                                   </xg-played>\n                                                 </xg-outer>', { tabindex: 1 }, 'xgplayer-progress');
  var containerWidth = void 0;
  player.controls.appendChild(container);
  var progress = container.querySelector('.xgplayer-progress-played');
  var outer = container.querySelector('.xgplayer-progress-outer');
  var cache = container.querySelector('.xgplayer-progress-cache');
  var point = container.querySelector('.xgplayer-progress-point');
  var thumbnail = container.querySelector('.xgplayer-progress-thumbnail');
  player.dotArr = {};
  function dotEvent(dotItem, text) {
    dotItem.addEventListener('mouseenter', function (e) {
      if (text) {
        (0, _util.addClass)(dotItem, 'xgplayer-progress-dot-show');
        (0, _util.addClass)(container, 'xgplayer-progress-dot-active');
      }
    });
    dotItem.addEventListener('mouseleave', function (e) {
      if (text) {
        (0, _util.removeClass)(dotItem, 'xgplayer-progress-dot-show');
        (0, _util.removeClass)(container, 'xgplayer-progress-dot-active');
      }
    });
    dotItem.addEventListener('touchend', function (e) {
      // e.preventDefault()
      e.stopPropagation();
      if (text) {
        if (!(0, _util.hasClass)(dotItem, 'xgplayer-progress-dot-show')) {
          Object.keys(player.dotArr).forEach(function (key) {
            if (player.dotArr[key]) {
              (0, _util.removeClass)(player.dotArr[key], 'xgplayer-progress-dot-show');
            }
          });
        }
        (0, _util.toggleClass)(dotItem, 'xgplayer-progress-dot-show');
        (0, _util.toggleClass)(container, 'xgplayer-progress-dot-active');
      }
    });
  }
  function onCanplay() {
    if (player.config.progressDot && (0, _util.typeOf)(player.config.progressDot) === 'Array') {
      player.config.progressDot.forEach(function (item) {
        if (item.time >= 0 && item.time <= player.duration) {
          var dot = (0, _util.createDom)('xg-progress-dot', item.text ? '<span class="xgplayer-progress-tip">' + item.text + '</span>' : '', {}, 'xgplayer-progress-dot');
          dot.style.left = item.time / player.duration * 100 + '%';
          if (item.duration >= 0) {
            dot.style.width = Math.min(item.duration, player.duration - item.time) / player.duration * 100 + '%';
          }
          if (item.style) {
            for (var k in item.style) {
              dot.style[k] = item.style[k];
            }
          }
          outer.appendChild(dot);
          player.dotArr[item.time] = dot;
          dotEvent(dot, item.text);
        }
      });
    }
  }
  player.once('canplay', onCanplay);
  player.addProgressDot = function (time, text, duration, style) {
    if (player.dotArr[time]) {
      return;
    }
    if (time >= 0 && time <= player.duration) {
      var dot = (0, _util.createDom)('xg-progress-dot', text ? '<span class="xgplayer-progress-tip">' + text + '</span>' : '', {}, 'xgplayer-progress-dot');
      dot.style.left = time / player.duration * 100 + '%';
      if (duration >= 0) {
        dot.style.width = Math.min(duration, player.duration - time) / player.duration * 100 + '%';
      }
      if (style) {
        for (var k in style) {
          dot.style[k] = style[k];
        }
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
  var coverPreviewContainer = void 0,
      coverPreviewPoint = void 0,
      coverPreviewOuter = void 0;
  var onLoadedmetadata = function onLoadedmetadata() {
    if (player.config.thumbnail) {
      if (player.config.thumbnail.isShowCoverPreview && !coverPreviewContainer) {
        progress.removeChild(thumbnail);
        coverPreviewContainer = (0, _util.createDom)('xg-coverpreview', '<xg-outer class="xgplayer-coverpreview-outer">\n            <xg-thumbnail class="xgplayer-coverpreview-thumbnail"></xg-thumbnail>\n            <xg-point class="xgplayer-coverpreview-point"></xg-point>\n          </xg-outer>', { tabindex: 1 }, 'xgplayer-coverpreview');
        coverPreviewOuter = coverPreviewContainer.querySelector('.xgplayer-coverpreview-outer');
        coverPreviewPoint = coverPreviewContainer.querySelector('.xgplayer-coverpreview-point');
        thumbnail = coverPreviewContainer.querySelector('.xgplayer-coverpreview-thumbnail');
        player.root.appendChild(coverPreviewContainer);
      }
      tnailPicNum = player.config.thumbnail.pic_num;
      tnailWidth = player.config.thumbnail.width;
      tnailHeight = player.config.thumbnail.height;
      tnailCol = player.config.thumbnail.col;
      tnailRow = player.config.thumbnail.row;
      tnailUrls = player.config.thumbnail.urls;
      thumbnail.style.width = tnailWidth + 'px';
      thumbnail.style.height = tnailHeight + 'px';
    };
  };
  player.on('loadedmetadata', onLoadedmetadata);

  if (typeof player.config.disableSwipeHandler === 'function' && typeof player.config.enableSwipeHandler === 'function') {
    player.root.addEventListener('touchmove', function (e) {
      e.preventDefault();
      // e.stopPropagation();
      if (!player.disableSwipe) {
        player.disableSwipe = true;
        player.config.disableSwipeHandler.call(player);
      }
    });
    player.root.addEventListener('touchstart', function (e) {
      // e.preventDefault();
      player.disableSwipe = true;
      player.config.disableSwipeHandler.call(player);
    });
    player.root.addEventListener('touchend', function (e) {
      // e.preventDefault();
      player.disableSwipe = false;
      player.config.enableSwipeHandler.call(player);
    });
  };

  ['touchstart', 'mousedown'].forEach(function (item) {
    container.addEventListener(item, function (e) {
      if (player.config.disableProgress) return;
      // e.preventDefault()
      e.stopPropagation();
      (0, _util.event)(e);
      if (e._target === point || !player.config.allowSeekAfterEnded && player.ended) {
        return true;
      }

      container.focus();

      var _progress$getBounding = progress.getBoundingClientRect(),
          left = _progress$getBounding.left;

      var isRotate = isRotateFullscreen(player);
      if (isRotate) {
        left = progress.getBoundingClientRect().top;
        containerWidth = container.getBoundingClientRect().height;
      } else {
        containerWidth = container.getBoundingClientRect().width;
        left = progress.getBoundingClientRect().left;
      }

      var move = function move(e) {
        // e.preventDefault()
        e.stopPropagation();
        (0, _util.event)(e);
        player.isProgressMoving = true;
        var w = (isRotate ? e.clientY : e.clientX) - left;
        if (w > containerWidth) {
          w = containerWidth;
        }
        var now = w / containerWidth * player.duration;
        if (now < 0) now = 0;
        if (player.config.allowSeekPlayed && Number(now).toFixed(1) > player.maxPlayedTime) {} else {
          progress.style.width = w * 100 / containerWidth + '%';

          if (player.videoConfig.mediaType === 'video' && !player.dash && !player.config.closeMoveSeek) {
            player.currentTime = Number(now).toFixed(1);
          } else {
            var time = (0, _util.findDom)(player.controls, '.xgplayer-time');
            if (time) {
              time.innerHTML = '<span class="xgplayer-time-current">' + (0, _util.format)(now || 0) + '</span><span>' + (0, _util.format)(player.duration) + '</span>';
            }
          }
        }

        if (player.config.thumbnail && player.config.thumbnail.isShowCoverPreview) {
          coverPreviewPoint.innerHTML = '<span>' + (0, _util.format)(now) + '</span> / ' + (0, _util.format)(player.duration || 0);

          interval = player.duration / tnailPicNum;
          var index = Math.floor(now / interval);
          thumbnail.style.backgroundImage = 'url(' + tnailUrls[Math.ceil((index + 1) / (tnailCol * tnailRow)) - 1] + ')';
          var indexInPage = index + 1 - tnailCol * tnailRow * (Math.ceil((index + 1) / (tnailCol * tnailRow)) - 1);
          var tnaiRowIndex = Math.ceil(indexInPage / tnailRow) - 1;
          var tnaiColIndex = indexInPage - tnaiRowIndex * tnailRow - 1;
          thumbnail.style['background-position'] = '-' + tnaiColIndex * tnailWidth + 'px -' + tnaiRowIndex * tnailHeight + 'px';
          coverPreviewContainer.style.display = 'block';
        }

        player.emit('focus');
      };
      var up = function up(e) {
        // e.preventDefault()
        e.stopPropagation();
        (0, _util.event)(e);
        window.removeEventListener('mousemove', move);
        window.removeEventListener('touchmove', move, { passive: false });
        window.removeEventListener('mouseup', up);
        window.removeEventListener('touchend', up);
        if (_sniffer2.default.browser.indexOf('ie') < 0) {
          container.blur();
        }
        if (!player.isProgressMoving || player.videoConfig && player.videoConfig.mediaType === 'audio' || player.dash || player.config.closeMoveSeek) {
          var w = (isRotate ? e.clientY : e.clientX) - left;
          if (w > containerWidth) {
            w = containerWidth;
          }
          var now = w / containerWidth * player.duration;
          if (now < 0) now = 0;
          if (player.config.allowSeekPlayed && Number(now).toFixed(1) > player.maxPlayedTime) {} else {
            progress.style.width = w * 100 / containerWidth + '%';
            player.currentTime = Number(now).toFixed(1);
          }
        }
        if (player.config.thumbnail && player.config.thumbnail.isShowCoverPreview) {
          coverPreviewContainer.style.display = 'none';
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
    var isRotate = isRotateFullscreen(player);
    var containerLeft = isRotate ? container.getBoundingClientRect().top : container.getBoundingClientRect().left;
    var containerWidth = isRotate ? container.getBoundingClientRect().height : container.getBoundingClientRect().width;

    var compute = function compute(e) {
      var now = ((isRotate ? e.clientY : e.clientX) - containerLeft) / containerWidth * player.duration;
      now = now < 0 ? 0 : now;
      point.textContent = (0, _util.format)(now);
      var pointWidth = point.getBoundingClientRect().width;
      if (player.config.thumbnail && !player.config.thumbnail.isShowCoverPreview) {
        interval = player.duration / tnailPicNum;
        var index = Math.floor(now / interval);
        thumbnail.style.backgroundImage = 'url(' + tnailUrls[Math.ceil((index + 1) / (tnailCol * tnailRow)) - 1] + ')';
        var indexInPage = index + 1 - tnailCol * tnailRow * (Math.ceil((index + 1) / (tnailCol * tnailRow)) - 1);
        var tnaiRowIndex = Math.ceil(indexInPage / tnailRow) - 1;
        var tnaiColIndex = indexInPage - tnaiRowIndex * tnailRow - 1;
        thumbnail.style['background-position'] = '-' + tnaiColIndex * tnailWidth + 'px -' + tnaiRowIndex * tnailHeight + 'px';
        var left = (isRotate ? e.clientY : e.clientX) - containerLeft - tnailWidth / 2;
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
      if ((0, _util.hasClass)(container, 'xgplayer-progress-dot-active')) {
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
      if (player.config.thumbnail && !player.config.thumbnail.isShowCoverPreview) {
        thumbnail.style.display = 'none';
      }
    };
    container.addEventListener('mousemove', move, false);
    container.addEventListener('mouseleave', leave, false);
    compute(e);
  }, false);

  // let lastBtnLeft = false
  var onTimeupdate = function onTimeupdate() {
    if (player.maxPlayedTime === undefined) player.maxPlayedTime = 0;
    if (player.maxPlayedTime < player.currentTime) player.maxPlayedTime = player.currentTime;
    if (!containerWidth && container) {
      containerWidth = container.getBoundingClientRect().width;
    }
    if (!player.isProgressMoving && !player.isSeeking && !player.seeking) {
      var precent = player.currentTime / player.duration;
      var prevPrecent = Number(progress.style.width.replace('%', '') || '0') / Number(container.style.width || '100');
      if (Math.abs(precent - prevPrecent) <= 1) {
        progress.style.width = player.currentTime * 100 / player.duration + '%';
      }
    }
  };
  player.on('timeupdate', onTimeupdate);

  var onCurrentTimeChange = function onCurrentTimeChange(time) {
    progress.style.width = time * 100 / player.duration + '%';
  };
  player.on('currentTimeChange', onCurrentTimeChange);

  var onSrcChange = function onSrcChange() {
    progress.style.width = '0%';
  };
  player.on('srcChange', onSrcChange);

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
    player.off('currentTimeChange', onCurrentTimeChange);
    player.off('srcChange', onSrcChange);
    player.off('loadedmetadata', onLoadedmetadata);
    cacheUpdateEvents.forEach(function (item) {
      player.off(item, onCacheUpdate);
    });
    player.off('destroy', destroyFunc);
  }
  player.once('destroy', destroyFunc);
};

exports.default = {
  name: 's_progress',
  method: s_progress
};
module.exports = exports['default'];

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(70);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".xgplayer-skin-default .xgplayer-progress{display:block;position:absolute;height:20px;line-height:20px;left:12px;right:12px;outline:none;top:-15px;z-index:35}.xgplayer-skin-default .xgplayer-progress-outer{background:hsla(0,0%,100%,.3);display:block;height:3px;line-height:3px;margin-top:8.5px;width:100%;position:relative;cursor:pointer}.xgplayer-skin-default .xgplayer-progress-cache,.xgplayer-skin-default .xgplayer-progress-played{display:block;height:100%;line-height:1;position:absolute;left:0;top:0}.xgplayer-skin-default .xgplayer-progress-cache{width:0;background:hsla(0,0%,100%,.5)}.xgplayer-skin-default .xgplayer-progress-played{display:block;width:0;background-image:linear-gradient(-90deg,#fa1f41,#e31106);border-radius:0 1.5px 1.5px 0}.xgplayer-skin-default .xgplayer-progress-btn{display:none;position:absolute;left:0;top:-5px;width:13px;height:13px;border-radius:30px;background:#fff;box-shadow:0 0 2px 0 rgba(0,0,0,.26);left:100%;-webkit-transform:translate(-50%);-ms-transform:translate(-50%);transform:translate(-50%);z-index:36}.xgplayer-skin-default .xgplayer-progress-point{position:absolute}.xgplayer-skin-default .xgplayer-progress-point.xgplayer-tips{margin-left:0;top:-25px;display:none;z-index:100}.xgplayer-skin-default .xgplayer-progress-dot{display:inline-block;position:absolute;height:3px;width:5px;top:0;background:#fff;border-radius:6px;z-index:16}.xgplayer-skin-default .xgplayer-progress-dot .xgplayer-progress-tip{position:absolute;bottom:200%;right:50%;-webkit-transform:translateX(50%);-ms-transform:translateX(50%);transform:translateX(50%);height:auto;line-height:30px;width:auto;background:rgba(0,0,0,.3);border-radius:6px;border:1px solid rgba(0,0,0,.8);cursor:default;white-space:nowrap;display:none}.xgplayer-skin-default .xgplayer-progress-dot-show .xgplayer-progress-tip{display:block}.xgplayer-skin-default .xgplayer-progress-thumbnail{position:absolute;-moz-box-sizing:border-box;box-sizing:border-box}.xgplayer-skin-default .xgplayer-progress-thumbnail.xgplayer-tips{margin-left:0;display:none;z-index:99}.xgplayer-skin-default .xgplayer-coverpreview{position:absolute;width:100%;height:100%;top:0;left:0;display:none}.xgplayer-skin-default .xgplayer-coverpreview .xgplayer-coverpreview-outer{position:absolute;display:block;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.xgplayer-skin-default .xgplayer-coverpreview .xgplayer-coverpreview-outer .xgplayer-coverpreview-thumbnail{display:block}.xgplayer-skin-default .xgplayer-coverpreview .xgplayer-coverpreview-outer .xgplayer-coverpreview-point{display:block;text-align:center;font-family:PingFangSC-Regular;font-size:11px;color:#ccc;padding:2px 4px}.xgplayer-skin-default .xgplayer-coverpreview .xgplayer-coverpreview-outer .xgplayer-coverpreview-point span{color:#fff}.xgplayer-skin-default .xgplayer-progress:focus .xgplayer-progress-outer,.xgplayer-skin-default .xgplayer-progress:hover .xgplayer-progress-outer{height:6px;margin-top:7px}.xgplayer-skin-default .xgplayer-progress:focus .xgplayer-progress-dot,.xgplayer-skin-default .xgplayer-progress:hover .xgplayer-progress-dot{height:6px}.xgplayer-skin-default .xgplayer-progress:focus .xgplayer-progress-btn,.xgplayer-skin-default .xgplayer-progress:hover .xgplayer-progress-btn{display:block;top:-3px}.xgplayer-skin-default.xgplayer-definition-active .xgplayer-progress,.xgplayer-skin-default.xgplayer-playbackrate-active .xgplayer-progress,.xgplayer-skin-default.xgplayer-texttrack-active .xgplayer-progress,.xgplayer-skin-default.xgplayer-volume-active .xgplayer-progress{z-index:15}.xgplayer-skin-default.xgplayer-mobile .xgplayer-progress-btn{display:block!important}.xgplayer-skin-default.xgplayer-mobile .xgplayer-progress:focus .xgplayer-progress-outer,.xgplayer-skin-default.xgplayer-mobile .xgplayer-progress:hover .xgplayer-progress-outer{height:3px!important;margin-top:8.5px!important}.xgplayer-skin-default.xgplayer-mobile .xgplayer-progress:focus .xgplayer-progress-btn,.xgplayer-skin-default.xgplayer-mobile .xgplayer-progress:hover .xgplayer-progress-btn{display:block!important;top:-5px!important}", ""]);

// exports


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

__webpack_require__(72);

var s_time = function s_time() {
  var player = this;
  var container = (0, _util.createDom)('xg-time', '<span class="xgplayer-time-current">' + (player.currentTime || (0, _util.format)(0)) + '</span>\n                                           <span>' + (player.duration || (0, _util.format)(0)) + '</span>', {}, 'xgplayer-time');
  player.once('ready', function () {
    if (player.controls) {
      player.controls.appendChild(container);
    }
  });
  var onTimeChange = function onTimeChange() {
    // let liveText = player.lang.LIVE
    // if(player.duration === Infinity) {
    //   addClass(player.root, 'xgplayer-is-live')
    //   if(!findDom(player.root, '.xgplayer-live')) {
    //     const live = createDom('xg-live', liveText, {}, 'xgplayer-live')
    //     player.controls.appendChild(live)
    //   }
    // }
    if (player.videoConfig.mediaType !== 'audio' || !player.isProgressMoving || !player.dash) {
      container.innerHTML = '<span class="xgplayer-time-current">' + (0, _util.format)(player.currentTime || 0) + '</span>' + ('<span>' + (0, _util.format)(player.duration) + '</span>');
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

exports.default = {
  name: 's_time',
  method: s_time
};
module.exports = exports['default'];

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(73);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".xgplayer-skin-default .xgplayer-time{-webkit-order:2;-moz-box-ordinal-group:3;order:2;font-family:ArialMT;font-size:13px;color:#fff;line-height:40px;height:40px;text-align:center;display:inline-block;margin:auto 8px}.xgplayer-skin-default .xgplayer-time span{color:hsla(0,0%,100%,.5)}.xgplayer-skin-default .xgplayer-time .xgplayer-time-current{color:#fff}.xgplayer-skin-default .xgplayer-time .xgplayer-time-current:after{content:\"/\";display:inline-block;padding:0 3px}", ""]);

// exports


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var _replay = __webpack_require__(75);

var _replay2 = _interopRequireDefault(_replay);

__webpack_require__(76);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var s_replay = function s_replay() {
  var player = this;
  var root = player.root;

  var replayText = player.lang.REPLAY;
  var btn = (0, _util.createDom)('xg-replay', _replay2.default + '\n                                         <xg-replay-txt class="xgplayer-replay-txt">' + replayText + '</xg-replay-txt>\n                                        ', {}, 'xgplayer-replay');
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

  function onBtnClick(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  btn.addEventListener('click', onBtnClick);

  var svg = btn.querySelector('svg');

  ['click', 'touchend'].forEach(function (item) {
    svg.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.userGestureTrigEvent('replayBtnClick');
    });
  });

  function destroyFunc() {
    player.off('ended', onEnded);
    player.off('destroy', destroyFunc);
  }
  player.once('destroy', destroyFunc);
};

exports.default = {
  name: 's_replay',
  method: s_replay
};
module.exports = exports['default'];

/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg class=\"xgplayer-replay-svg\" xmlns=\"http://www.w3.org/2000/svg\" width=\"78\" height=\"78\" viewbox=\"0 0 78 78\">\n  <path d=\"M8.22708362,13.8757234 L11.2677371,12.6472196 C11.7798067,12.4403301 12.3626381,12.6877273 12.5695276,13.1997969 L12.9441342,14.1269807 C13.1510237,14.6390502 12.9036264,15.2218816 12.3915569,15.4287712 L6.8284538,17.6764107 L5.90126995,18.0510173 C5.38920044,18.2579068 4.80636901,18.0105096 4.5994795,17.49844 L1.97723335,11.0081531 C1.77034384,10.4960836 2.0177411,9.91325213 2.52981061,9.70636262 L3.45699446,9.33175602 C3.96906396,9.12486652 4.5518954,9.37226378 4.75878491,9.88433329 L5.67885163,12.1615783 C7.99551726,6.6766934 13.3983951,3 19.5,3 C27.7842712,3 34.5,9.71572875 34.5,18 C34.5,26.2842712 27.7842712,33 19.5,33 C15.4573596,33 11.6658607,31.3912946 8.87004692,28.5831991 C8.28554571,27.9961303 8.28762719,27.0463851 8.87469603,26.4618839 C9.46176488,25.8773827 10.4115101,25.8794641 10.9960113,26.466533 C13.2344327,28.7147875 16.263503,30 19.5,30 C26.127417,30 31.5,24.627417 31.5,18 C31.5,11.372583 26.127417,6 19.5,6 C14.4183772,6 9.94214483,9.18783811 8.22708362,13.8757234 Z\"></path>\n</svg>\n");

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(77);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".xgplayer-skin-default .xgplayer-replay{position:absolute;left:0;top:0;width:100%;height:100%;z-index:105;display:none;-webkit-justify-content:center;-moz-box-pack:center;justify-content:center;-webkit-align-items:center;-moz-box-align:center;align-items:center;background:rgba(0,0,0,.54);-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;flex-direction:column}.xgplayer-skin-default .xgplayer-replay svg{background:rgba(0,0,0,.58);border-radius:100%;cursor:pointer}.xgplayer-skin-default .xgplayer-replay svg path{-webkit-transform:translate(20px,21px);-ms-transform:translate(20px,21px);transform:translate(20px,21px);fill:#ddd}.xgplayer-skin-default .xgplayer-replay svg:hover{background:rgba(0,0,0,.38)}.xgplayer-skin-default .xgplayer-replay svg:hover path{fill:#fff}.xgplayer-skin-default .xgplayer-replay .xgplayer-replay-txt{display:inline-block;font-family:PingFangSC-Regular;font-size:14px;color:#fff;line-height:34px}.xgplayer-skin-default.xgplayer.xgplayer-ended .xgplayer-controls{display:none}.xgplayer-skin-default.xgplayer.xgplayer-ended .xgplayer-replay{display:-webkit-flex;display:-moz-box;display:flex}", ""]);

// exports


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(161);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(80);


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _player = __webpack_require__(9);

var _player2 = _interopRequireDefault(_player);

var _airplay = __webpack_require__(81);

var _airplay2 = _interopRequireDefault(_airplay);

var _cssFullscreen = __webpack_require__(82);

var _cssFullscreen2 = _interopRequireDefault(_cssFullscreen);

var _danmu = __webpack_require__(83);

var _danmu2 = _interopRequireDefault(_danmu);

var _definition = __webpack_require__(84);

var _definition2 = _interopRequireDefault(_definition);

var _download = __webpack_require__(85);

var _download2 = _interopRequireDefault(_download);

var _errorRetry = __webpack_require__(88);

var _errorRetry2 = _interopRequireDefault(_errorRetry);

var _fullscreen = __webpack_require__(45);

var _fullscreen2 = _interopRequireDefault(_fullscreen);

var _keyboard = __webpack_require__(89);

var _keyboard2 = _interopRequireDefault(_keyboard);

var _localPreview = __webpack_require__(90);

var _localPreview2 = _interopRequireDefault(_localPreview);

var _memoryPlay = __webpack_require__(91);

var _memoryPlay2 = _interopRequireDefault(_memoryPlay);

var _miniplayer = __webpack_require__(92);

var _miniplayer2 = _interopRequireDefault(_miniplayer);

var _mobile = __webpack_require__(37);

var _mobile2 = _interopRequireDefault(_mobile);

var _pc = __webpack_require__(38);

var _pc2 = _interopRequireDefault(_pc);

var _pip = __webpack_require__(98);

var _pip2 = _interopRequireDefault(_pip);

var _play = __webpack_require__(46);

var _play2 = _interopRequireDefault(_play);

var _playNext = __webpack_require__(99);

var _playNext2 = _interopRequireDefault(_playNext);

var _reload = __webpack_require__(100);

var _reload2 = _interopRequireDefault(_reload);

var _replay = __webpack_require__(47);

var _replay2 = _interopRequireDefault(_replay);

var _rotate = __webpack_require__(101);

var _rotate2 = _interopRequireDefault(_rotate);

var _screenShot = __webpack_require__(102);

var _screenShot2 = _interopRequireDefault(_screenShot);

var _stallCheck = __webpack_require__(103);

var _stallCheck2 = _interopRequireDefault(_stallCheck);

var _start = __webpack_require__(39);

var _start2 = _interopRequireDefault(_start);

var _volume = __webpack_require__(104);

var _volume2 = _interopRequireDefault(_volume);

var _textTrack = __webpack_require__(105);

var _textTrack2 = _interopRequireDefault(_textTrack);

__webpack_require__(107);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

_player2.default.installAll([_airplay2.default, _cssFullscreen2.default, _danmu2.default, _definition2.default, _download2.default, _errorRetry2.default, _fullscreen2.default, _keyboard2.default, _localPreview2.default, _memoryPlay2.default, _miniplayer2.default, _mobile2.default, _pc2.default, _pip2.default, _play2.default, _playNext2.default, _reload2.default, _replay2.default, _rotate2.default, _screenShot2.default, _stallCheck2.default, _start2.default, _volume2.default, _textTrack2.default]);

exports.default = _player2.default;
module.exports = exports['default'];

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var airplay = function airplay() {
  var player = this;
  if (!player.config.airplay || !window.WebKitPlaybackTargetAvailabilityEvent) return;

  function onAirplayBtnClick() {
    player.video.webkitShowPlaybackTargetPicker();
  }
  player.on('airplayBtnClick', onAirplayBtnClick);

  function onDestroy() {
    player.off('airplayBtnClick', onAirplayBtnClick);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

exports.default = {
  name: 'airplay',
  method: airplay
};
module.exports = exports['default'];

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var cssFullscreen = function cssFullscreen() {
  var player = this;
  var root = player.root;

  function onCssFullscreenBtnClick() {
    if ((0, _util.hasClass)(root, 'xgplayer-is-cssfullscreen')) {
      player.exitCssFullscreen();
    } else {
      player.getCssFullscreen();
    }
  }
  player.on('cssFullscreenBtnClick', onCssFullscreenBtnClick);
  player.on('exitFullscreen', function () {
    (0, _util.removeClass)(root, 'xgplayer-is-cssfullscreen');
  });

  function onDestroy() {
    player.off('cssFullscreenBtnClick', onCssFullscreenBtnClick);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);

  player.getCssFullscreen = function () {
    var player = this;
    if (player.config.fluid) {
      player.root.style['padding-top'] = '';
    }
    (0, _util.addClass)(player.root, 'xgplayer-is-cssfullscreen');
    player.emit('requestCssFullscreen');
  };

  player.exitCssFullscreen = function () {
    var player = this;
    if (player.config.fluid) {
      player.root.style['width'] = '100%';
      player.root.style['height'] = '0';
      player.root.style['padding-top'] = player.config.height * 100 / player.config.width + '%';
    }
    (0, _util.removeClass)(player.root, 'xgplayer-is-cssfullscreen');
    player.emit('exitCssFullscreen');
  };
};

exports.default = {
  name: 'cssFullscreen',
  method: cssFullscreen
};
module.exports = exports['default'];

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var danmu = function danmu() {
  var player = this;

  function onInitDanmu(danmujs) {
    var container = player.root.querySelector('xg-danmu');
    (0, _util.addClass)(container, 'xgplayer-has-danmu');
    if (!player.config.danmu.closeDefaultBtn) {
      var onTimeupdate = function onTimeupdate() {
        danmujs.start();
      };

      var onPause = function onPause() {
        if ((0, _util.hasClass)(player.danmuBtn, 'danmu-switch-active')) {
          danmujs.pause();
        }
      };

      var onPlay = function onPlay() {
        if ((0, _util.hasClass)(player.danmuBtn, 'danmu-switch-active')) {
          danmujs.play();
        }
      };

      var onSeeked = function onSeeked() {
        if ((0, _util.hasClass)(player.danmuBtn, 'danmu-switch-active')) {
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

      player.danmuBtn = (0, _util.copyDom)(danmujs.bulletBtn.createSwitch(true));
      player.controls.appendChild(player.danmuBtn);

      ['click', 'touchend'].forEach(function (item) {
        player.danmuBtn.addEventListener(item, function (e) {
          e.preventDefault();
          e.stopPropagation();
          (0, _util.toggleClass)(player.danmuBtn, 'danmu-switch-active');
          if ((0, _util.hasClass)(player.danmuBtn, 'danmu-switch-active')) {
            player.emit('danmuBtnOn');
            (0, _util.addClass)(container, 'xgplayer-has-danmu');
            player.once('timeupdate', onTimeupdate);
          } else {
            player.emit('danmuBtnOff');
            (0, _util.removeClass)(container, 'xgplayer-has-danmu');
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

exports.default = {
  name: 'danmu',
  method: danmu
};
module.exports = exports['default'];

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var definition = function definition() {
  var player = this;

  function onDestroy() {
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

exports.default = {
  name: 'definition',
  method: definition
};
module.exports = exports['default'];

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _downloadjs = __webpack_require__(86);

var _downloadjs2 = _interopRequireDefault(_downloadjs);

var _url = __webpack_require__(87);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var download = function download() {
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

  player.download = function () {
    var url = (0, _url.getAbsoluteURL)(this.config.url);
    (0, _downloadjs2.default)(url);
  };
};

exports.default = {
  name: 'download',
  method: download
};
module.exports = exports['default'];

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//download.js v4.2, by dandavis; 2008-2016. [MIT] see http://danml.com/download.html for tests/usage
// v1 landed a FF+Chrome compat way of downloading strings to local un-named files, upgraded to use a hidden frame and optional mime
// v2 added named files via a[download], msSaveBlob, IE (10+) support, and window.URL support for larger+faster saves than dataURLs
// v3 added dataURL and Blob Input, bind-toggle arity, and legacy dataURL fallback was improved with force-download mime and base64 support. 3.1 improved safari handling.
// v4 adds AMD/UMD, commonJS, and plain browser support
// v4.1 adds url download capability via solo URL argument (same domain/CORS only)
// v4.2 adds semantic variable names, long (over 2MB) dataURL support, and hidden by default temp anchors
// https://github.com/rndme/download

(function (root, factory) {
	if (true) {
		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
})(this, function () {

	return function download(data, strFileName, strMimeType) {

		var self = window,
		    // this script is only for browsers anyway...
		defaultMime = "application/octet-stream",
		    // this default mime also triggers iframe downloads
		mimeType = strMimeType || defaultMime,
		    payload = data,
		    url = !strFileName && !strMimeType && payload,
		    anchor = document.createElement("a"),
		    toString = function (a) {
			return String(a);
		},
		    myBlob = self.Blob || self.MozBlob || self.WebKitBlob || toString,
		    fileName = strFileName || "download",
		    blob,
		    reader;
		myBlob = myBlob.call ? myBlob.bind(self) : Blob;

		if (String(this) === "true") {
			//reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
			payload = [payload, mimeType];
			mimeType = payload[0];
			payload = payload[1];
		}

		if (url && url.length < 2048) {
			// if no filename and no mime, assume a url was passed as the only argument
			fileName = url.split("/").pop().split("?")[0];
			anchor.href = url; // assign href prop to temp anchor
			if (anchor.href.indexOf(url) !== -1) {
				// if the browser determines that it's a potentially valid url path:
				var ajax = new XMLHttpRequest();
				ajax.open("GET", url, true);
				ajax.responseType = 'blob';
				ajax.onload = function (e) {
					download(e.target.response, fileName, defaultMime);
				};
				setTimeout(function () {
					ajax.send();
				}, 0); // allows setting custom ajax headers using the return:
				return ajax;
			} // end if valid url?
		} // end if url?


		//go ahead and download dataURLs right away
		if (/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(payload)) {

			if (payload.length > 1024 * 1024 * 1.999 && myBlob !== toString) {
				payload = dataUrlToBlob(payload);
				mimeType = payload.type || defaultMime;
			} else {
				return navigator.msSaveBlob ? // IE10 can't do a[download], only Blobs:
				navigator.msSaveBlob(dataUrlToBlob(payload), fileName) : saver(payload); // everyone else can save dataURLs un-processed
			}
		} else {
			//not data url, is it a string with special needs?
			if (/([\x80-\xff])/.test(payload)) {
				var i = 0,
				    tempUiArr = new Uint8Array(payload.length),
				    mx = tempUiArr.length;
				for (i; i < mx; ++i) tempUiArr[i] = payload.charCodeAt(i);
				payload = new myBlob([tempUiArr], { type: mimeType });
			}
		}
		blob = payload instanceof myBlob ? payload : new myBlob([payload], { type: mimeType });

		function dataUrlToBlob(strUrl) {
			var parts = strUrl.split(/[:;,]/),
			    type = parts[1],
			    decoder = parts[2] == "base64" ? atob : decodeURIComponent,
			    binData = decoder(parts.pop()),
			    mx = binData.length,
			    i = 0,
			    uiArr = new Uint8Array(mx);

			for (i; i < mx; ++i) uiArr[i] = binData.charCodeAt(i);

			return new myBlob([uiArr], { type: type });
		}

		function saver(url, winMode) {

			if ('download' in anchor) {
				//html5 A[download]
				anchor.href = url;
				anchor.setAttribute("download", fileName);
				anchor.className = "download-js-link";
				anchor.innerHTML = "downloading...";
				anchor.style.display = "none";
				document.body.appendChild(anchor);
				setTimeout(function () {
					anchor.click();
					document.body.removeChild(anchor);
					if (winMode === true) {
						setTimeout(function () {
							self.URL.revokeObjectURL(anchor.href);
						}, 250);
					}
				}, 66);
				return true;
			}

			// handle non-a[download] safari as best we can:
			if (/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
				if (/^data:/.test(url)) url = "data:" + url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
				if (!window.open(url)) {
					// popup blocked, offer direct download:
					if (confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")) {
						location.href = url;
					}
				}
				return true;
			}

			//do iframe dataURL download (old ch+FF):
			var f = document.createElement("iframe");
			document.body.appendChild(f);

			if (!winMode && /^data:/.test(url)) {
				// force a mime that will download:
				url = "data:" + url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
			}
			f.src = url;
			setTimeout(function () {
				document.body.removeChild(f);
			}, 333);
		} //end saver


		if (navigator.msSaveBlob) {
			// IE10+ : (has Blob, but not a[download] or URL)
			return navigator.msSaveBlob(blob, fileName);
		}

		if (self.URL) {
			// simple fast and modern way using Blob and URL:
			saver(self.URL.createObjectURL(blob), true);
		} else {
			// handle non-Blob()+non-URL browsers:
			if (typeof blob === "string" || blob.constructor === toString) {
				try {
					return saver("data:" + mimeType + ";base64," + self.btoa(blob));
				} catch (y) {
					return saver("data:" + mimeType + "," + encodeURIComponent(blob));
				}
			}

			// Blob but not URL support:
			reader = new FileReader();
			reader.onload = function (e) {
				saver(this.result);
			};
			reader.readAsDataURL(blob);
		}
		return true;
	}; /* end download() */
});

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getAbsoluteURL = exports.getAbsoluteURL = function getAbsoluteURL(url) {
  // Check if absolute URL
  if (!url.match(/^https?:\/\//)) {
    var div = document.createElement('div');
    div.innerHTML = '<a href="' + url + '">x</a>';
    url = div.firstChild.href;
  }
  return url;
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _error = __webpack_require__(4);

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Error retry plugin
 * get config from player.config.errorConfig
 * The Plugin is just deal with the situation that play with video.src,
 * and get the http status of current video.src
 */

var defaultConfig = {
  maxCount: 3, // max number of retries
  backupUrl: '', // the backup url for retry
  isFetch: true, //  is need to check the cdn url statud
  fetchTimeout: 100 // timeout time for get cdn status
};

function errorRetry() {
  var _this = this;

  var player = this;
  // 无设置参数或者是通过扩展播放的不做处理
  if (!player.config.errorConfig || player.src.indexOf('blob:') > -1) {
    return;
  }
  var errorConfig = {};
  var _inConfig = player.config.errorConfig;
  for (var key in defaultConfig) {
    if (_inConfig[key] === undefined) {
      errorConfig[key] = defaultConfig[key];
    } else {
      errorConfig[key] = _inConfig[key];
    }
  }
  player.retryData = {
    count: 0, // 重试次数
    errfTimer: null, // 超时设置定时器
    isFetchReturn: false, // fetch请求是否已经返回
    currentTime: 0 // 出错的时候时间
  };

  function errorfetch(player, url, timeout) {
    var resolveFun = function resolveFun(resolve, data) {
      if (!player.retryData.isFetchReturn) {
        player.retryData.isFetchReturn = true;
        resolve(data);
      }
    };
    return new Promise(function (resolve, reject) {
      try {
        var xhr = new window.XMLHttpRequest();
        xhr.open('get', url);
        xhr.onload = function () {
          resolveFun(resolve, { status: xhr.status, statusText: xhr.statusText, xhr: xhr });
        };
        xhr.onerror = function () {
          resolveFun(resolve, { status: xhr.status, statusText: xhr.statusText || 'The network environment is disconnected or the address is invalid', xhr: xhr });
        };
        xhr.onabort = function () {
          // console.log('task onerror', xhr)
        };
        player.retryData.errfTimer = window.setTimeout(function () {
          var errfTimer = player.retryData.errfTimer;
          window.clearTimeout(errfTimer);
          player.retryData.errfTimer = null;
          resolveFun(resolve, { status: -1, statusText: 'request timeout' });
        }, timeout);
        xhr.send();
      } catch (err) {
        player.retryData.isFetchReturn = true;
        resolveFun(resolve, { status: -2, statusText: 'request error' });
      }
    });
  }

  function retryCanPlay() {
    // console.log(`retryCanPlay this.retryData.currentTime:${this.retryData.currentTime}`)
    this.currentTime = this.retryData.currentTime;
    this.play();
    this.retryData.retryCode = 0;
    this.retryData.isFetchReturn = false;
    this.retryData.currentTime = 0;
  }

  var _originErrorEmit = player._onError;
  player._onError = function (data) {
    var errorCount = _this.retryData.count;
    // console.log(`originErrorEmit:errorCount:${errorCount}`, data)
    if (errorCount > errorConfig.maxCount) {
      if (errorConfig.isFetch) {
        errorfetch(_this, _this.currentSrc, errorConfig.fetchTimeout).then(function (data) {
          _this.emit('error', new _error2.default({
            type: 'network',
            currentTime: _this.currentTime,
            duration: _this.duration || 0,
            networkState: _this.networkState,
            readyState: _this.readyState,
            currentSrc: _this.currentSrc,
            src: _this.src,
            ended: _this.ended,
            httpCode: data.status,
            httpMsg: data.statusText,
            errd: {
              line: 101,
              msg: _this.error,
              handle: 'plugin errorRetry'
            },
            errorCode: _this.video && _this.video.error.code,
            mediaError: _this.video && _this.video.error
          }));
          _originErrorEmit.call(_this, data);
        });
      } else {
        _originErrorEmit.call(_this, data);
      }
      return;
    }
    if (errorCount === 0) {
      _this.retryData.currentTime = _this.currentTime;
      _this.once('canplay', retryCanPlay.bind(_this));
    }
    var src = '';
    if (errorConfig.count < 2) {
      src = errorConfig.backupUrl ? errorConfig.backupUrl : player.currentSrc;
    } else {
      src = errorConfig.backupUrl && errorCount > 1 ? errorConfig.backupUrl : player.currentSrc;
    }
    _this.retryData.count++;
    _this.src = src;
  };
}

exports.default = {
  name: 'errorretry',
  method: errorRetry
};
module.exports = exports['default'];

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _util = __webpack_require__(0);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Keyboard = function () {
  function Keyboard(player) {
    _classCallCheck(this, Keyboard);

    this.player = player;
    this.state = {
      playbackRate: 0,
      isRepeat: false,
      keyCode: 0,
      repeat: 0,
      isBody: false
    };
    this.timer = null;
    this.initEvents();
  }

  _createClass(Keyboard, [{
    key: 'initEvents',
    value: function initEvents() {
      var _this = this;

      var _player = this.player,
          root = _player.root,
          config = _player.config;

      this.player.onBodyKeydown = this.onBodyKeydown.bind(this);
      this.player.onKeydown = this.onKeydown.bind(this);
      this.player.onKeyup = this.onKeyup.bind(this);
      if (!config.keyShortcut || config.keyShortcut === 'on') {
        document.addEventListener('keydown', this.player.onBodyKeydown);
        root.addEventListener('keydown', this.player.onKeydown);
        var destroyFunc = function destroyFunc() {
          document.removeEventListener('keydown', _this.player.onBodyKeydown);
          root.removeEventListener('keydown', _this.player.onKeydown);
          clearTimeout(_this.timer);
          _this.timer = null;
        };
        (0, _util.on)(this.player, 'destroy', destroyFunc);
      }
    }
  }, {
    key: 'checkTarget',
    value: function checkTarget(e) {
      var player = this.player;

      return e.target === player.root || e.target === player.video || e.target === player.controls;
    }
  }, {
    key: 'onBodyKeydown',
    value: function onBodyKeydown(event) {
      var e = event || window.event;
      var keyCode = e.keyCode;
      if (e.target === document.body && (keyCode === 37 || keyCode === 39 || keyCode === 32)) {
        e.preventDefault();
        e.cancelBubble = true;
        e.returnValue = false;
        if (!e.repeat) {
          document.addEventListener('keyup', this.player.onKeyup);
        }
        this.handler(e);
        return false;
      }
    }
  }, {
    key: 'onKeydown',
    value: function onKeydown(event) {
      var e = event || window.event;
      var keyCode = e.keyCode;
      if (this.checkTarget(e) && (keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40 || keyCode === 32 || keyCode === 27)) {
        e.preventDefault();
        e.cancelBubble = true;
        e.returnValue = false;
        this.player.emit('focus');
        if (!e.repeat) {
          this.player.root.addEventListener('keyup', this.player.onKeyup);
        }
        this.handler(e);
        return false;
      }
    }
  }, {
    key: 'onKeyup',
    value: function onKeyup() {
      var state = this.state,
          player = this.player;

      document.removeEventListener('keyup', this.player.onKeyup);
      player.root.removeEventListener('keyup', this.player.onKeyup);
      if (!state.keyCode) {
        return;
      }
      if (state.playbackRate !== 0) {
        player.playbackRate = state.playbackRate;
      }

      if (!state.isRepeat) {
        this.handlerKeyCode(state.keyCode, false);
      }
      state.playbackRate = 0;
      state.isRepeat = false;
      state.keyCode = 0;
      state.repeat = 0;
      this.changeVolumeSlide();
    }
  }, {
    key: 'handler',
    value: function handler(e) {
      var state = this.state,
          player = this.player;

      state.keyCode = e.keyCode;
      state.isRepeat = e.repeat;
      if (e.repeat) {
        if (player.config.disableLongPress) {
          this.handlerKeyCode(state.keyCode, false);
        } else if (state.repeat % 2 === 0) {
          this.handlerKeyCode(state.keyCode, true);
        }
        state.repeat++;
      }
    }
  }, {
    key: 'handlerKeyCode',
    value: function handlerKeyCode(keyCode, isLonePress) {
      var player = this.player,
          state = this.state;

      switch (keyCode) {
        case 39:
          // 快进
          if (isLonePress) {
            state.repeat === 0 && this.changeRate();
          } else {
            this.seek(false, isLonePress);
          }
          break;
        case 37:
          // 快退
          this.seek(true, isLonePress);
          break;
        case 38:
          this.changeVolume(true);
          // 上
          break;
        case 40:
          this.changeVolume(false);
          // 下
          break;
        case 32:
          if (!isLonePress) {
            player.paused ? player.play() : player.pause();
          }
          break;
        case 27:
          if ((0, _util.hasClass)(player.root, 'xgplayer-is-cssfullscreen')) {
            player.exitCssFullscreen();
          }
          break;
        default:
        //
      }
    }
  }, {
    key: 'seek',
    value: function seek(isBack, isLongPress) {
      var player = this.player;

      var keyShortcutStep = player.config.keyShortcutStep || {};
      var currentTimeStep = keyShortcutStep.currentTime || 10;
      if (player.isLoading || player.isSeeking || isLongPress && this.state.repeat % 8 > 0) {
        return;
      }
      if (isBack) {
        if (player.currentTime - currentTimeStep >= 0) {
          player.currentTime -= currentTimeStep;
        } else {
          player.currentTime = 0;
        }
      } else {
        if (player.maxPlayedTime && player.config.allowSeekPlayed && player.currentTime + currentTimeStep > player.maxPlayedTime) {
          player.currentTime = player.maxPlayedTime;
        } else {
          if (player.currentTime + currentTimeStep <= player.duration) {
            player.currentTime += currentTimeStep;
          } else {
            player.currentTime = player.duration + 1;
          }
        }
      }
    }
  }, {
    key: 'changeRate',
    value: function changeRate() {
      this.state.playbackRate = this.player.playbackRate;
      this.player.playbackRate = this.player.config.keyboardRate || 5;
    }
  }, {
    key: 'changeVolumeSlide',
    value: function changeVolumeSlide(show) {
      var player = this.player;

      if (!player.controls) {
        return;
      }
      if (show) {
        player.emit('focus');
        if (!(0, _util.hasClass)(player.root, 'xgplayer-volume-active')) {
          (0, _util.addClass)(player.root, 'xgplayer-volume-active');
        }
      } else {
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
          (0, _util.removeClass)(player.root, 'xgplayer-volume-active');
        }, 1000);
      }
    }
  }, {
    key: 'changeVolume',
    value: function changeVolume(isup) {
      var player = this.player;

      var keyShortcutStep = player.config.keyShortcutStep || {};
      var volumeStep = keyShortcutStep.volume || 0.1;
      this.changeVolumeSlide(true);
      var volume = player.volume;
      if (isup && volume + volumeStep <= 1) {
        player.volume = volume + volumeStep;
      } else if (!isup && volume - volumeStep >= 0) {
        player.volume = volume - volumeStep;
      }
    }
  }]);

  return Keyboard;
}();

var keyboard = function keyboard() {
  var player = this;
  player.keyboard = new Keyboard(player);
};

exports.default = {
  name: 'keyboard',
  method: keyboard
};
module.exports = exports['default'];

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var localPreview = function localPreview() {
  var player = this;
  var root = player.root;
  function onUpload(upload) {
    player.uploadFile = upload.files[0];
    var url = URL.createObjectURL(player.uploadFile);
    if ((0, _util.hasClass)(root, 'xgplayer-nostart')) {
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

exports.default = {
  name: 'localPreview',
  method: localPreview
};
module.exports = exports['default'];

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var memoryPlay = function memoryPlay() {
  var player = this;
  player.on('memoryPlayStart', function (lastPlayTime) {
    player.currentTime = lastPlayTime;
  });
};

exports.default = {
  name: 'memoryPlay',
  method: memoryPlay
};
module.exports = exports['default'];

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var _draggabilly = __webpack_require__(93);

var _draggabilly2 = _interopRequireDefault(_draggabilly);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var miniplayer = function miniplayer() {
  var player = this;
  var root = player.root;
  function onMiniplayerBtnClick() {
    if ((0, _util.hasClass)(root, 'xgplayer-miniplayer-active')) {
      player.exitMiniplayer();
    } else {
      player.getMiniplayer();
    }
  }
  player.on('miniplayerBtnClick', onMiniplayerBtnClick);

  function onDestroy() {
    player.off('miniplayerBtnClick', onMiniplayerBtnClick);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);

  player.getMiniplayer = function () {
    if ((0, _util.hasClass)(root, 'xgplayer-is-fullscreen')) {
      this.exitFullscreen(root);
    }
    if ((0, _util.hasClass)(root, 'xgplayer-is-cssfullscreen')) {
      this.exitCssFullscreen();
    }
    if ((0, _util.hasClass)(root, 'xgplayer-rotate-fullscreen')) {
      this.exitRotateFullscreen();
    }
    // let ro = this.root.getBoundingClientRect()
    // let Top = ro.top
    // let Left = ro.left
    var dragLay = (0, _util.createDom)('xg-miniplayer-lay', '<div></div>', {}, 'xgplayer-miniplayer-lay');
    this.root.appendChild(dragLay);
    var dragHandle = (0, _util.createDom)('xg-miniplayer-drag', '<div class="drag-handle"><span>' + this.lang.MINIPLAYER_DRAG + '</span></div>', { tabindex: 9 }, 'xgplayer-miniplayer-drag');
    this.root.appendChild(dragHandle);
    // eslint-disable-next-line no-unused-vars
    var draggie = new _draggabilly2.default('.xgplayer', {
      handle: '.drag-handle'
    });
    (0, _util.addClass)(this.root, 'xgplayer-miniplayer-active');
    this.root.style.right = 0;
    this.root.style.bottom = '200px';
    this.root.style.top = '';
    this.root.style.left = '';
    this.root.style.width = '320px';
    this.root.style.height = '180px';
    if (this.config.miniplayerConfig) {
      if (this.config.miniplayerConfig.top !== undefined) {
        this.root.style.top = this.config.miniplayerConfig.top + 'px';
        this.root.style.bottom = '';
      }
      if (this.config.miniplayerConfig.bottom !== undefined) {
        this.root.style.bottom = this.config.miniplayerConfig.bottom + 'px';
      }
      if (this.config.miniplayerConfig.left !== undefined) {
        this.root.style.left = this.config.miniplayerConfig.left + 'px';
        this.root.style.right = '';
      }
      if (this.config.miniplayerConfig.right !== undefined) {
        this.root.style.right = this.config.miniplayerConfig.right + 'px';
      }
      if (this.config.miniplayerConfig.width !== undefined) {
        this.root.style.width = this.config.miniplayerConfig.width + 'px';
      }
      if (this.config.miniplayerConfig.height !== undefined) {
        this.root.style.height = this.config.miniplayerConfig.height + 'px';
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
        player.exitMiniplayer();
        // player.root.style.top = `${Top}px`
        // player.root.style.left = `${Left}px`
      });
    });
  };

  player.exitMiniplayer = function () {
    (0, _util.removeClass)(this.root, 'xgplayer-miniplayer-active');
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

    var dragLay = (0, _util.findDom)(this.root, '.xgplayer-miniplayer-lay');
    if (dragLay && dragLay.parentNode) {
      dragLay.parentNode.removeChild(dragLay);
    }
    var dragHandle = (0, _util.findDom)(this.root, '.xgplayer-miniplayer-drag');
    if (dragHandle && dragHandle.parentNode) {
      dragHandle.parentNode.removeChild(dragHandle);
    }
  };
};

exports.default = {
  name: 'miniplayer',
  method: miniplayer
};
module.exports = exports['default'];

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Draggabilly v2.3.0
 * Make that shiz draggable
 * https://draggabilly.desandro.com
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */

(function (window, factory) {
  // universal module definition
  /* jshint strict: false */ /* globals define */
  if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(94), __webpack_require__(95)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (getSize, Unidragger) {
      return factory(window, getSize, Unidragger);
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(window, function factory(window, getSize, Unidragger) {

  // -------------------------- helpers & variables -------------------------- //

  // extend objects
  function extend(a, b) {
    for (var prop in b) {
      a[prop] = b[prop];
    }
    return a;
  }

  function noop() {}

  var jQuery = window.jQuery;

  // --------------------------  -------------------------- //

  function Draggabilly(element, options) {
    // querySelector if string
    this.element = typeof element == 'string' ? document.querySelector(element) : element;

    if (jQuery) {
      this.$element = jQuery(this.element);
    }

    // options
    this.options = extend({}, this.constructor.defaults);
    this.option(options);

    this._create();
  }

  // inherit Unidragger methods
  var proto = Draggabilly.prototype = Object.create(Unidragger.prototype);

  Draggabilly.defaults = {};

  /**
   * set options
   * @param {Object} opts
   */
  proto.option = function (opts) {
    extend(this.options, opts);
  };

  // css position values that don't need to be set
  var positionValues = {
    relative: true,
    absolute: true,
    fixed: true
  };

  proto._create = function () {
    // properties
    this.position = {};
    this._getPosition();

    this.startPoint = { x: 0, y: 0 };
    this.dragPoint = { x: 0, y: 0 };

    this.startPosition = extend({}, this.position);

    // set relative positioning
    var style = getComputedStyle(this.element);
    if (!positionValues[style.position]) {
      this.element.style.position = 'relative';
    }

    // events, bridge jQuery events from vanilla
    this.on('pointerMove', this.onPointerMove);
    this.on('pointerUp', this.onPointerUp);

    this.enable();
    this.setHandles();
  };

  /**
   * set this.handles and bind start events to 'em
   */
  proto.setHandles = function () {
    this.handles = this.options.handle ? this.element.querySelectorAll(this.options.handle) : [this.element];

    this.bindHandles();
  };

  /**
   * emits events via EvEmitter and jQuery events
   * @param {String} type - name of event
   * @param {Event} event - original event
   * @param {Array} args - extra arguments
   */
  proto.dispatchEvent = function (type, event, args) {
    var emitArgs = [event].concat(args);
    this.emitEvent(type, emitArgs);
    this.dispatchJQueryEvent(type, event, args);
  };

  proto.dispatchJQueryEvent = function (type, event, args) {
    var jquery = window.jQuery;
    // trigger jQuery event
    if (!jquery || !this.$element) {
      return;
    }
    // create jQuery event
    /* eslint-disable-next-line new-cap */
    var $event = jquery.Event(event);
    $event.type = type;
    this.$element.trigger($event, args);
  };

  // -------------------------- position -------------------------- //

  // get x/y position from style
  proto._getPosition = function () {
    var style = getComputedStyle(this.element);
    var x = this._getPositionCoord(style.left, 'width');
    var y = this._getPositionCoord(style.top, 'height');
    // clean up 'auto' or other non-integer values
    this.position.x = isNaN(x) ? 0 : x;
    this.position.y = isNaN(y) ? 0 : y;

    this._addTransformPosition(style);
  };

  proto._getPositionCoord = function (styleSide, measure) {
    if (styleSide.indexOf('%') != -1) {
      // convert percent into pixel for Safari, #75
      var parentSize = getSize(this.element.parentNode);
      // prevent not-in-DOM element throwing bug, #131
      return !parentSize ? 0 : parseFloat(styleSide) / 100 * parentSize[measure];
    }
    return parseInt(styleSide, 10);
  };

  // add transform: translate( x, y ) to position
  proto._addTransformPosition = function (style) {
    var transform = style.transform;
    // bail out if value is 'none'
    if (transform.indexOf('matrix') !== 0) {
      return;
    }
    // split matrix(1, 0, 0, 1, x, y)
    var matrixValues = transform.split(',');
    // translate X value is in 12th or 4th position
    var xIndex = transform.indexOf('matrix3d') === 0 ? 12 : 4;
    var translateX = parseInt(matrixValues[xIndex], 10);
    // translate Y value is in 13th or 5th position
    var translateY = parseInt(matrixValues[xIndex + 1], 10);
    this.position.x += translateX;
    this.position.y += translateY;
  };

  // -------------------------- events -------------------------- //

  proto.onPointerDown = function (event, pointer) {
    this.element.classList.add('is-pointer-down');
    this.dispatchJQueryEvent('pointerDown', event, [pointer]);
  };

  proto.pointerDown = function (event, pointer) {
    var isOkay = this.okayPointerDown(event);
    if (!isOkay || !this.isEnabled) {
      this._pointerReset();
      return;
    }
    // track start event position
    // Safari 9 overrides pageX and pageY. These values needs to be copied. flickity#842
    this.pointerDownPointer = {
      pageX: pointer.pageX,
      pageY: pointer.pageY
    };

    event.preventDefault();
    this.pointerDownBlur();
    // bind move and end events
    this._bindPostStartEvents(event);
    this.element.classList.add('is-pointer-down');
    this.dispatchEvent('pointerDown', event, [pointer]);
  };

  /**
   * drag start
   * @param {Event} event
   * @param {[Event, Touch]} pointer
   */
  proto.dragStart = function (event, pointer) {
    if (!this.isEnabled) {
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
    this.dispatchEvent('dragStart', event, [pointer]);
    // start animation
    this.animate();
  };

  proto.measureContainment = function () {
    var container = this.getContainer();
    if (!container) {
      return;
    }

    var elemSize = getSize(this.element);
    var containerSize = getSize(container);
    var elemRect = this.element.getBoundingClientRect();
    var containerRect = container.getBoundingClientRect();

    var borderSizeX = containerSize.borderLeftWidth + containerSize.borderRightWidth;
    var borderSizeY = containerSize.borderTopWidth + containerSize.borderBottomWidth;

    var position = this.relativeStartPosition = {
      x: elemRect.left - (containerRect.left + containerSize.borderLeftWidth),
      y: elemRect.top - (containerRect.top + containerSize.borderTopWidth)
    };

    this.containSize = {
      width: containerSize.width - borderSizeX - position.x - elemSize.width,
      height: containerSize.height - borderSizeY - position.y - elemSize.height
    };
  };

  proto.getContainer = function () {
    var containment = this.options.containment;
    if (!containment) {
      return;
    }
    var isElement = containment instanceof HTMLElement;
    // use as element
    if (isElement) {
      return containment;
    }
    // querySelector if string
    if (typeof containment == 'string') {
      return document.querySelector(containment);
    }
    // fallback to parent element
    return this.element.parentNode;
  };

  // ----- move event ----- //

  proto.onPointerMove = function (event, pointer, moveVector) {
    this.dispatchJQueryEvent('pointerMove', event, [pointer, moveVector]);
  };

  /**
   * drag move
   * @param {Event} event
   * @param {[Event, Touch]} pointer
   * @param {Object} moveVector - x and y coordinates
   */
  proto.dragMove = function (event, pointer, moveVector) {
    if (!this.isEnabled) {
      return;
    }
    var dragX = moveVector.x;
    var dragY = moveVector.y;

    var grid = this.options.grid;
    var gridX = grid && grid[0];
    var gridY = grid && grid[1];

    dragX = applyGrid(dragX, gridX);
    dragY = applyGrid(dragY, gridY);

    dragX = this.containDrag('x', dragX, gridX);
    dragY = this.containDrag('y', dragY, gridY);

    // constrain to axis
    dragX = this.options.axis == 'y' ? 0 : dragX;
    dragY = this.options.axis == 'x' ? 0 : dragY;

    this.position.x = this.startPosition.x + dragX;
    this.position.y = this.startPosition.y + dragY;
    // set dragPoint properties
    this.dragPoint.x = dragX;
    this.dragPoint.y = dragY;

    this.dispatchEvent('dragMove', event, [pointer, moveVector]);
  };

  function applyGrid(value, grid, method) {
    method = method || 'round';
    return grid ? Math[method](value / grid) * grid : value;
  }

  proto.containDrag = function (axis, drag, grid) {
    if (!this.options.containment) {
      return drag;
    }
    var measure = axis == 'x' ? 'width' : 'height';

    var rel = this.relativeStartPosition[axis];
    var min = applyGrid(-rel, grid, 'ceil');
    var max = this.containSize[measure];
    max = applyGrid(max, grid, 'floor');
    return Math.max(min, Math.min(max, drag));
  };

  // ----- end event ----- //

  /**
   * pointer up
   * @param {Event} event
   * @param {[Event, Touch]} pointer
   */
  proto.onPointerUp = function (event, pointer) {
    this.element.classList.remove('is-pointer-down');
    this.dispatchJQueryEvent('pointerUp', event, [pointer]);
  };

  /**
   * drag end
   * @param {Event} event
   * @param {[Event, Touch]} pointer
   */
  proto.dragEnd = function (event, pointer) {
    if (!this.isEnabled) {
      return;
    }
    // use top left position when complete
    this.element.style.transform = '';
    this.setLeftTop();
    this.element.classList.remove('is-dragging');
    this.dispatchEvent('dragEnd', event, [pointer]);
  };

  // -------------------------- animation -------------------------- //

  proto.animate = function () {
    // only render and animate if dragging
    if (!this.isDragging) {
      return;
    }

    this.positionDrag();

    var _this = this;
    requestAnimationFrame(function animateFrame() {
      _this.animate();
    });
  };

  // left/top positioning
  proto.setLeftTop = function () {
    this.element.style.left = this.position.x + 'px';
    this.element.style.top = this.position.y + 'px';
  };

  proto.positionDrag = function () {
    this.element.style.transform = 'translate3d( ' + this.dragPoint.x + 'px, ' + this.dragPoint.y + 'px, 0)';
  };

  // ----- staticClick ----- //

  proto.staticClick = function (event, pointer) {
    this.dispatchEvent('staticClick', event, [pointer]);
  };

  // ----- methods ----- //

  /**
   * @param {Number} x
   * @param {Number} y
   */
  proto.setPosition = function (x, y) {
    this.position.x = x;
    this.position.y = y;
    this.setLeftTop();
  };

  proto.enable = function () {
    this.isEnabled = true;
  };

  proto.disable = function () {
    this.isEnabled = false;
    if (this.isDragging) {
      this.dragEnd();
    }
  };

  proto.destroy = function () {
    this.disable();
    // reset styles
    this.element.style.transform = '';
    this.element.style.left = '';
    this.element.style.top = '';
    this.element.style.position = '';
    // unbind handles
    this.unbindHandles();
    // remove jQuery data
    if (this.$element) {
      this.$element.removeData('draggabilly');
    }
  };

  // ----- jQuery bridget ----- //

  // required for jQuery bridget
  proto._init = noop;

  if (jQuery && jQuery.bridget) {
    jQuery.bridget('draggabilly', Draggabilly);
  }

  // -----  ----- //

  return Draggabilly;
});

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */
/* globals console: false */

(function (window, factory) {
  /* jshint strict: false */ /* globals define, module */
  if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(window, function factory() {
  'use strict';

  // -------------------------- helpers -------------------------- //

  // get a number from a string, not a percentage

  function getStyleSize(value) {
    var num = parseFloat(value);
    // not a percent like '100%', and a number
    var isValid = value.indexOf('%') == -1 && !isNaN(num);
    return isValid && num;
  }

  function noop() {}

  var logError = typeof console == 'undefined' ? noop : function (message) {
    console.error(message);
  };

  // -------------------------- measurements -------------------------- //

  var measurements = ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'marginLeft', 'marginRight', 'marginTop', 'marginBottom', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderBottomWidth'];

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
    for (var i = 0; i < measurementsLength; i++) {
      var measurement = measurements[i];
      size[measurement] = 0;
    }
    return size;
  }

  // -------------------------- getStyle -------------------------- //

  /**
   * getStyle, get style of element, check for Firefox bug
   * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
   */
  function getStyle(elem) {
    var style = getComputedStyle(elem);
    if (!style) {
      logError('Style returned ' + style + '. Are you running this code in a hidden iframe on Firefox? ' + 'See https://bit.ly/getsizebug1');
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
    if (isSetup) {
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
    body.appendChild(div);
    var style = getStyle(div);
    // round value for browser zoom. desandro/masonry#928
    isBoxSizeOuter = Math.round(getStyleSize(style.width)) == 200;
    getSize.isBoxSizeOuter = isBoxSizeOuter;

    body.removeChild(div);
  }

  // -------------------------- getSize -------------------------- //

  function getSize(elem) {
    setup();

    // use querySeletor if elem is string
    if (typeof elem == 'string') {
      elem = document.querySelector(elem);
    }

    // do not proceed on non-objects
    if (!elem || typeof elem != 'object' || !elem.nodeType) {
      return;
    }

    var style = getStyle(elem);

    // if hidden, everything is 0
    if (style.display == 'none') {
      return getZeroSize();
    }

    var size = {};
    size.width = elem.offsetWidth;
    size.height = elem.offsetHeight;

    var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

    // get all measurements
    for (var i = 0; i < measurementsLength; i++) {
      var measurement = measurements[i];
      var value = style[measurement];
      var num = parseFloat(value);
      // any 'auto', 'medium' value will be 0
      size[measurement] = !isNaN(num) ? num : 0;
    }

    var paddingWidth = size.paddingLeft + size.paddingRight;
    var paddingHeight = size.paddingTop + size.paddingBottom;
    var marginWidth = size.marginLeft + size.marginRight;
    var marginHeight = size.marginTop + size.marginBottom;
    var borderWidth = size.borderLeftWidth + size.borderRightWidth;
    var borderHeight = size.borderTopWidth + size.borderBottomWidth;

    var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

    // overwrite width and height if we can get it from style
    var styleWidth = getStyleSize(style.width);
    if (styleWidth !== false) {
      size.width = styleWidth + (
      // add padding and border unless it's already including it
      isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth);
    }

    var styleHeight = getStyleSize(style.height);
    if (styleHeight !== false) {
      size.height = styleHeight + (
      // add padding and border unless it's already including it
      isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight);
    }

    size.innerWidth = size.width - (paddingWidth + borderWidth);
    size.innerHeight = size.height - (paddingHeight + borderHeight);

    size.outerWidth = size.width + marginWidth;
    size.outerHeight = size.height + marginHeight;

    return size;
  }

  return getSize;
});

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Unidragger v2.3.1
 * Draggable base class
 * MIT license
 */

/*jshint browser: true, unused: true, undef: true, strict: true */

(function (window, factory) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(96)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Unipointer) {
      return factory(window, Unipointer);
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(window, function factory(window, Unipointer) {

  'use strict';

  // -------------------------- Unidragger -------------------------- //

  function Unidragger() {}

  // inherit Unipointer & EvEmitter
  var proto = Unidragger.prototype = Object.create(Unipointer.prototype);

  // ----- bind start ----- //

  proto.bindHandles = function () {
    this._bindHandles(true);
  };

  proto.unbindHandles = function () {
    this._bindHandles(false);
  };

  /**
   * Add or remove start event
   * @param {Boolean} isAdd
   */
  proto._bindHandles = function (isAdd) {
    // munge isAdd, default to true
    isAdd = isAdd === undefined ? true : isAdd;
    // bind each handle
    var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';
    var touchAction = isAdd ? this._touchActionValue : '';
    for (var i = 0; i < this.handles.length; i++) {
      var handle = this.handles[i];
      this._bindStartEvent(handle, isAdd);
      handle[bindMethod]('click', this);
      // touch-action: none to override browser touch gestures. metafizzy/flickity#540
      if (window.PointerEvent) {
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
  proto.pointerDown = function (event, pointer) {
    var isOkay = this.okayPointerDown(event);
    if (!isOkay) {
      return;
    }
    // track start event position
    // Safari 9 overrides pageX and pageY. These values needs to be copied. flickity#842
    this.pointerDownPointer = {
      pageX: pointer.pageX,
      pageY: pointer.pageY
    };

    event.preventDefault();
    this.pointerDownBlur();
    // bind move and end events
    this._bindPostStartEvents(event);
    this.emitEvent('pointerDown', [event, pointer]);
  };

  // nodes that have text fields
  var cursorNodes = {
    TEXTAREA: true,
    INPUT: true,
    SELECT: true,
    OPTION: true
  };

  // input types that do not have text fields
  var clickTypes = {
    radio: true,
    checkbox: true,
    button: true,
    submit: true,
    image: true,
    file: true
  };

  // dismiss inputs with text fields. flickity#403, flickity#404
  proto.okayPointerDown = function (event) {
    var isCursorNode = cursorNodes[event.target.nodeName];
    var isClickType = clickTypes[event.target.type];
    var isOkay = !isCursorNode || isClickType;
    if (!isOkay) {
      this._pointerReset();
    }
    return isOkay;
  };

  // kludge to blur previously focused input
  proto.pointerDownBlur = function () {
    var focused = document.activeElement;
    // do not blur body for IE10, metafizzy/flickity#117
    var canBlur = focused && focused.blur && focused != document.body;
    if (canBlur) {
      focused.blur();
    }
  };

  // ----- move event ----- //

  /**
   * drag move
   * @param {Event} event
   * @param {Event or Touch} pointer
   */
  proto.pointerMove = function (event, pointer) {
    var moveVector = this._dragPointerMove(event, pointer);
    this.emitEvent('pointerMove', [event, pointer, moveVector]);
    this._dragMove(event, pointer, moveVector);
  };

  // base pointer move logic
  proto._dragPointerMove = function (event, pointer) {
    var moveVector = {
      x: pointer.pageX - this.pointerDownPointer.pageX,
      y: pointer.pageY - this.pointerDownPointer.pageY
    };
    // start drag if pointer has moved far enough to start drag
    if (!this.isDragging && this.hasDragStarted(moveVector)) {
      this._dragStart(event, pointer);
    }
    return moveVector;
  };

  // condition if pointer has moved far enough to start drag
  proto.hasDragStarted = function (moveVector) {
    return Math.abs(moveVector.x) > 3 || Math.abs(moveVector.y) > 3;
  };

  // ----- end event ----- //

  /**
   * pointer up
   * @param {Event} event
   * @param {Event or Touch} pointer
   */
  proto.pointerUp = function (event, pointer) {
    this.emitEvent('pointerUp', [event, pointer]);
    this._dragPointerUp(event, pointer);
  };

  proto._dragPointerUp = function (event, pointer) {
    if (this.isDragging) {
      this._dragEnd(event, pointer);
    } else {
      // pointer didn't move enough for drag to start
      this._staticClick(event, pointer);
    }
  };

  // -------------------------- drag -------------------------- //

  // dragStart
  proto._dragStart = function (event, pointer) {
    this.isDragging = true;
    // prevent clicks
    this.isPreventingClicks = true;
    this.dragStart(event, pointer);
  };

  proto.dragStart = function (event, pointer) {
    this.emitEvent('dragStart', [event, pointer]);
  };

  // dragMove
  proto._dragMove = function (event, pointer, moveVector) {
    // do not drag if not dragging yet
    if (!this.isDragging) {
      return;
    }

    this.dragMove(event, pointer, moveVector);
  };

  proto.dragMove = function (event, pointer, moveVector) {
    event.preventDefault();
    this.emitEvent('dragMove', [event, pointer, moveVector]);
  };

  // dragEnd
  proto._dragEnd = function (event, pointer) {
    // set flags
    this.isDragging = false;
    // re-enable clicking async
    setTimeout(function () {
      delete this.isPreventingClicks;
    }.bind(this));

    this.dragEnd(event, pointer);
  };

  proto.dragEnd = function (event, pointer) {
    this.emitEvent('dragEnd', [event, pointer]);
  };

  // ----- onclick ----- //

  // handle all clicks and prevent clicks when dragging
  proto.onclick = function (event) {
    if (this.isPreventingClicks) {
      event.preventDefault();
    }
  };

  // ----- staticClick ----- //

  // triggered after pointer down & up with no/tiny movement
  proto._staticClick = function (event, pointer) {
    // ignore emulated mouse up clicks
    if (this.isIgnoringMouseUp && event.type == 'mouseup') {
      return;
    }

    this.staticClick(event, pointer);

    // set flag for emulated clicks 300ms after touchend
    if (event.type != 'mouseup') {
      this.isIgnoringMouseUp = true;
      // reset flag after 300ms
      setTimeout(function () {
        delete this.isIgnoringMouseUp;
      }.bind(this), 400);
    }
  };

  proto.staticClick = function (event, pointer) {
    this.emitEvent('staticClick', [event, pointer]);
  };

  // ----- utils ----- //

  Unidragger.getPointerPoint = Unipointer.getPointerPoint;

  // -----  ----- //

  return Unidragger;
});

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Unipointer v2.3.0
 * base class for doing one thing with pointer event
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

(function (window, factory) {
  // universal module definition
  /* jshint strict: false */ /*global define, module, require */
  if (true) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(97)], __WEBPACK_AMD_DEFINE_RESULT__ = (function (EvEmitter) {
      return factory(window, EvEmitter);
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(window, function factory(window, EvEmitter) {

  'use strict';

  function noop() {}

  function Unipointer() {}

  // inherit EvEmitter
  var proto = Unipointer.prototype = Object.create(EvEmitter.prototype);

  proto.bindStartEvent = function (elem) {
    this._bindStartEvent(elem, true);
  };

  proto.unbindStartEvent = function (elem) {
    this._bindStartEvent(elem, false);
  };

  /**
   * Add or remove start event
   * @param {Boolean} isAdd - remove if falsey
   */
  proto._bindStartEvent = function (elem, isAdd) {
    // munge isAdd, default to true
    isAdd = isAdd === undefined ? true : isAdd;
    var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';

    // default to mouse events
    var startEvent = 'mousedown';
    if (window.PointerEvent) {
      // Pointer Events
      startEvent = 'pointerdown';
    } else if ('ontouchstart' in window) {
      // Touch Events. iOS Safari
      startEvent = 'touchstart';
    }
    elem[bindMethod](startEvent, this);
  };

  // trigger handler methods for events
  proto.handleEvent = function (event) {
    var method = 'on' + event.type;
    if (this[method]) {
      this[method](event);
    }
  };

  // returns the touch that we're keeping track of
  proto.getTouch = function (touches) {
    for (var i = 0; i < touches.length; i++) {
      var touch = touches[i];
      if (touch.identifier == this.pointerIdentifier) {
        return touch;
      }
    }
  };

  // ----- start event ----- //

  proto.onmousedown = function (event) {
    // dismiss clicks from right or middle buttons
    var button = event.button;
    if (button && button !== 0 && button !== 1) {
      return;
    }
    this._pointerDown(event, event);
  };

  proto.ontouchstart = function (event) {
    this._pointerDown(event, event.changedTouches[0]);
  };

  proto.onpointerdown = function (event) {
    this._pointerDown(event, event);
  };

  /**
   * pointer start
   * @param {Event} event
   * @param {Event or Touch} pointer
   */
  proto._pointerDown = function (event, pointer) {
    // dismiss right click and other pointers
    // button = 0 is okay, 1-4 not
    if (event.button || this.isPointerDown) {
      return;
    }

    this.isPointerDown = true;
    // save pointer identifier to match up touch events
    this.pointerIdentifier = pointer.pointerId !== undefined ?
    // pointerId for pointer events, touch.indentifier for touch events
    pointer.pointerId : pointer.identifier;

    this.pointerDown(event, pointer);
  };

  proto.pointerDown = function (event, pointer) {
    this._bindPostStartEvents(event);
    this.emitEvent('pointerDown', [event, pointer]);
  };

  // hash of events to be bound after start event
  var postStartEvents = {
    mousedown: ['mousemove', 'mouseup'],
    touchstart: ['touchmove', 'touchend', 'touchcancel'],
    pointerdown: ['pointermove', 'pointerup', 'pointercancel']
  };

  proto._bindPostStartEvents = function (event) {
    if (!event) {
      return;
    }
    // get proper events to match start event
    var events = postStartEvents[event.type];
    // bind events to node
    events.forEach(function (eventName) {
      window.addEventListener(eventName, this);
    }, this);
    // save these arguments
    this._boundPointerEvents = events;
  };

  proto._unbindPostStartEvents = function () {
    // check for _boundEvents, in case dragEnd triggered twice (old IE8 bug)
    if (!this._boundPointerEvents) {
      return;
    }
    this._boundPointerEvents.forEach(function (eventName) {
      window.removeEventListener(eventName, this);
    }, this);

    delete this._boundPointerEvents;
  };

  // ----- move event ----- //

  proto.onmousemove = function (event) {
    this._pointerMove(event, event);
  };

  proto.onpointermove = function (event) {
    if (event.pointerId == this.pointerIdentifier) {
      this._pointerMove(event, event);
    }
  };

  proto.ontouchmove = function (event) {
    var touch = this.getTouch(event.changedTouches);
    if (touch) {
      this._pointerMove(event, touch);
    }
  };

  /**
   * pointer move
   * @param {Event} event
   * @param {Event or Touch} pointer
   * @private
   */
  proto._pointerMove = function (event, pointer) {
    this.pointerMove(event, pointer);
  };

  // public
  proto.pointerMove = function (event, pointer) {
    this.emitEvent('pointerMove', [event, pointer]);
  };

  // ----- end event ----- //


  proto.onmouseup = function (event) {
    this._pointerUp(event, event);
  };

  proto.onpointerup = function (event) {
    if (event.pointerId == this.pointerIdentifier) {
      this._pointerUp(event, event);
    }
  };

  proto.ontouchend = function (event) {
    var touch = this.getTouch(event.changedTouches);
    if (touch) {
      this._pointerUp(event, touch);
    }
  };

  /**
   * pointer up
   * @param {Event} event
   * @param {Event or Touch} pointer
   * @private
   */
  proto._pointerUp = function (event, pointer) {
    this._pointerDone();
    this.pointerUp(event, pointer);
  };

  // public
  proto.pointerUp = function (event, pointer) {
    this.emitEvent('pointerUp', [event, pointer]);
  };

  // ----- pointer done ----- //

  // triggered on pointer up & pointer cancel
  proto._pointerDone = function () {
    this._pointerReset();
    this._unbindPostStartEvents();
    this.pointerDone();
  };

  proto._pointerReset = function () {
    // reset properties
    this.isPointerDown = false;
    delete this.pointerIdentifier;
  };

  proto.pointerDone = noop;

  // ----- pointer cancel ----- //

  proto.onpointercancel = function (event) {
    if (event.pointerId == this.pointerIdentifier) {
      this._pointerCancel(event, event);
    }
  };

  proto.ontouchcancel = function (event) {
    var touch = this.getTouch(event.changedTouches);
    if (touch) {
      this._pointerCancel(event, touch);
    }
  };

  /**
   * pointer cancel
   * @param {Event} event
   * @param {Event or Touch} pointer
   * @private
   */
  proto._pointerCancel = function (event, pointer) {
    this._pointerDone();
    this.pointerCancel(event, pointer);
  };

  // public
  proto.pointerCancel = function (event, pointer) {
    this.emitEvent('pointerCancel', [event, pointer]);
  };

  // -----  ----- //

  // utility function for getting x/y coords from event
  Unipointer.getPointerPoint = function (pointer) {
    return {
      x: pointer.pageX,
      y: pointer.pageY
    };
  };

  // -----  ----- //

  return Unipointer;
});

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

(function (global, factory) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if (true) {
    // AMD - RequireJS
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(typeof window != 'undefined' ? window : this, function () {

  "use strict";

  function EvEmitter() {}

  var proto = EvEmitter.prototype;

  proto.on = function (eventName, listener) {
    if (!eventName || !listener) {
      return;
    }
    // set events hash
    var events = this._events = this._events || {};
    // set listeners array
    var listeners = events[eventName] = events[eventName] || [];
    // only add once
    if (listeners.indexOf(listener) == -1) {
      listeners.push(listener);
    }

    return this;
  };

  proto.once = function (eventName, listener) {
    if (!eventName || !listener) {
      return;
    }
    // add event
    this.on(eventName, listener);
    // set once flag
    // set onceEvents hash
    var onceEvents = this._onceEvents = this._onceEvents || {};
    // set onceListeners object
    var onceListeners = onceEvents[eventName] = onceEvents[eventName] || {};
    // set flag
    onceListeners[listener] = true;

    return this;
  };

  proto.off = function (eventName, listener) {
    var listeners = this._events && this._events[eventName];
    if (!listeners || !listeners.length) {
      return;
    }
    var index = listeners.indexOf(listener);
    if (index != -1) {
      listeners.splice(index, 1);
    }

    return this;
  };

  proto.emitEvent = function (eventName, args) {
    var listeners = this._events && this._events[eventName];
    if (!listeners || !listeners.length) {
      return;
    }
    // copy over to avoid interference if .off() in listener
    listeners = listeners.slice(0);
    args = args || [];
    // once stuff
    var onceListeners = this._onceEvents && this._onceEvents[eventName];

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      var isOnce = onceListeners && onceListeners[listener];
      if (isOnce) {
        // remove listener
        // remove before trigger to prevent recursion
        this.off(eventName, listener);
        // unset once flag
        delete onceListeners[listener];
      }
      // trigger listener
      listener.apply(this, args);
    }

    return this;
  };

  proto.allOff = function () {
    delete this._events;
    delete this._onceEvents;
  };

  return EvEmitter;
});

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var pip = function pip() {
  var _this = this;

  var player = this;
  function onPipBtnClick() {
    if (player.video !== document.pictureInPictureElement) {
      player.video.requestPictureInPicture();
    } else {
      document.exitPictureInPicture();
    }
  }
  player.on('pipBtnClick', onPipBtnClick);

  var onWebkitpresentationmodechanged = function onWebkitpresentationmodechanged(e) {
    var mode = player.video.webkitPresentationMode;
    _this.pMode = mode;
    if (mode === _util.PresentationMode.PIP) {
      // 进入pip模式
      player.emit('requestPictureInPicture', e.pictureInPictureWindow);
    } else if (mode === _util.PresentationMode.INLINE) {
      // 退出pip，进去inline模式
      player.emit('exitPictureInPicture');
    }
  };

  player.video.addEventListener('enterpictureinpicture', function (pipWindow) {
    player.emit('requestPictureInPicture', pipWindow);
  });

  player.video.addEventListener('leavepictureinpicture', function () {
    player.emit('exitPictureInPicture');
  });

  (0, _util.checkWebkitSetPresentationMode)(player.video) && player.video.addEventListener('webkitpresentationmodechanged', onWebkitpresentationmodechanged);

  function onDestroy() {
    player.off('pipBtnClick', onPipBtnClick);
    player.off('destroy', onDestroy);
    (0, _util.checkWebkitSetPresentationMode)(player.video) && player.video.removeEventListener('webkitpresentationmodechanged', onWebkitpresentationmodechanged);
  }
  player.once('destroy', onDestroy);
};

exports.default = {
  name: 'pip',
  method: pip
};
module.exports = exports['default'];

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var playNext = function playNext() {
  var player = this;
  var nextBtn = player.config.playNext;
  player.currentVideoIndex = -1;

  function onPlayNextBtnClick() {
    if (player.currentVideoIndex + 1 < nextBtn.urlList.length) {
      player.currentVideoIndex++;
      player.video.autoplay = true;
      player.src = nextBtn.urlList[player.currentVideoIndex];
      player.emit('playerNext', player.currentVideoIndex + 1);
      if (player.currentVideoIndex + 1 === nextBtn.urlList.length) {
        player.emit('urlListEnd');
      }
    }
  }
  player.on('playNextBtnClick', onPlayNextBtnClick);

  function onDestroy() {
    player.off('playNextBtnClick', onPlayNextBtnClick);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

exports.default = {
  name: 'playNext',
  method: playNext
};
module.exports = exports['default'];

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var reload = function reload() {
  var player = this;
  var reloadConfig = player.config.reload;
  if (!reloadConfig) {
    return;
  }

  function onReloadBtnClick() {
    (0, _util.removeClass)(player.root, 'xgplayer-is-error');
    player.src = player.config.url;
  }
  player.on('reloadBtnClick', onReloadBtnClick);

  function onDestroy() {
    player.off('reloadBtnClick', onReloadBtnClick);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

exports.default = {
  name: 'reload',
  method: reload
};
module.exports = exports['default'];

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
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

  player.updateRotateDeg = function () {
    var player = this;
    if (!player.rotateDeg) {
      player.rotateDeg = 0;
    }

    var width = player.root.offsetWidth;
    var height = player.root.offsetHeight;
    var targetWidth = player.video.videoWidth;
    var targetHeight = player.video.videoHeight;

    if (!player.config.rotate.innerRotate && player.config.rotate.controlsFix) {
      player.root.style.width = height + 'px';
      player.root.style.height = width + 'px';
    }

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
      scale = Number(scale.toFixed(5));
    } else {
      scale = 1;
    }

    if (player.config.rotate.innerRotate) {
      player.video.style.transformOrigin = 'center center';
      player.video.style.transform = 'rotate(' + player.rotateDeg + 'turn) scale(' + scale + ')';
      player.video.style.webKitTransform = 'rotate(' + player.rotateDeg + 'turn) scale(' + scale + ')';
    } else {
      if (player.config.rotate.controlsFix) {
        player.video.style.transformOrigin = 'center center';
        player.video.style.transform = 'rotate(' + player.rotateDeg + 'turn) scale(' + scale + ')';
        player.video.style.webKitTransform = 'rotate(' + player.rotateDeg + 'turn) scale(' + scale + ')';
      } else {
        player.root.style.transformOrigin = 'center center';
        player.root.style.transform = 'rotate(' + player.rotateDeg + 'turn) scale(' + 1 + ')';
        player.root.style.webKitTransform = 'rotate(' + player.rotateDeg + 'turn) scale(' + 1 + ')';
      }
    }
  };

  player.rotate = function () {
    var clockwise = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var innerRotate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var times = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    var player = this;
    if (!player.rotateDeg) {
      player.rotateDeg = 0;
    }
    var factor = clockwise ? 1 : -1;

    player.rotateDeg = (player.rotateDeg + 1 + factor * 0.25 * times) % 1;
    this.updateRotateDeg();

    player.emit('rotate', player.rotateDeg * 360);
  };
};

exports.default = {
  name: 'rotate',
  method: rotate
};
module.exports = exports['default'];

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var screenShot = function screenShot() {
  var player = this;
  var screenShotOptions = player.config.screenShot;
  if (!screenShotOptions) {
    return;
  }

  player.video.setAttribute('crossOrigin', 'anonymous');

  var encoderOptions = 0.92;
  if (screenShotOptions.quality || screenShotOptions.quality === 0) {
    encoderOptions = screenShotOptions.quality;
  }
  var type = screenShotOptions.type === undefined ? 'image/png' : screenShotOptions.type;
  var format = screenShotOptions.format === undefined ? '.png' : screenShotOptions.format;

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

  player.screenShot = function () {
    var save = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    save = screenShotOptions.saveImg === undefined ? save : screenShotOptions.saveImg;
    canvas.width = player.video.videoWidth || 600;
    canvas.height = player.video.videoHeight || 337.5;
    img.onload = function () {
      canvasCtx.drawImage(player.video, 0, 0, canvas.width, canvas.height);
      img.src = canvas.toDataURL(type, encoderOptions).replace(type, 'image/octet-stream');
      var screenShotImg = img.src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
      player.emit('screenShot', screenShotImg);
      save && saveScreenShot(screenShotImg, '截图' + format);
    }();
  };
  player.on('screenShotBtnClick', player.screenShot);

  function onDestroy() {
    player.off('screenShotBtnClick', player.screenShot);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

exports.default = {
  name: 'screenShot',
  method: screenShot
};
module.exports = exports['default'];

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _error = __webpack_require__(4);

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function stallCheck() {
  var player = this;
  if (!player.config.enableStallCheck) return;
  var lastCurrentTime = 0;
  var stallFlag = void 0,
      stallCheckTimer = void 0,
      progressTimer = void 0;
  player.once('complete', function () {
    progressTimer = setInterval(function () {
      if (player.currentTime - (lastCurrentTime || 0) > 0.1 || player.paused) {
        if (stallFlag === 1 || stallFlag === 2) {
          stallFlag = 0;
          clearTimeout(stallCheckTimer);
          stallCheckTimer = null;
        }
      } else {
        if (!stallFlag) {
          stallFlag = 1;
          stallCheckTimer = setTimeout(function () {
            if (stallFlag === 1) {
              stallFlag = 2;
              player.emit('error', new _error2.default('STALL'));
            }
            stallCheckTimer = null;
          }, 20000);
        }
      }
      lastCurrentTime = player.currentTime;
    }, 1000);
  });
}

exports.default = {
  name: 'stallCheck',
  method: stallCheck
};
module.exports = exports['default'];

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var _sniffer = __webpack_require__(5);

var _sniffer2 = _interopRequireDefault(_sniffer);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var volume = function volume() {
  var player = this;
  var root = player.root;
  var container = void 0,
      slider = void 0,
      bar = void 0,
      selected = void 0;
  function onCanplay() {
    // player.volume = sniffer.device === 'mobile' ? 1 : player.config.volume
    if (!player.controls) return;
    player.volume = player.config.volume;
    container = player.controls.querySelector('.xgplayer-volume');
    if (!container) return;
    slider = container.querySelector('.xgplayer-slider');
    bar = container.querySelector('.xgplayer-bar');
    selected = container.querySelector('.xgplayer-drag');
    if (_sniffer2.default.device === 'mobile') {
      if (player.volume === 0) {
        player.video.muted = true;
      }
      onVolumeChange();
    }
  }
  player.once('canplay', onCanplay);

  function onVolumeBarClick(e) {
    if (!slider) return;
    player.video.muted = false;
    slider.focus();
    (0, _util.event)(e);

    var barRect = bar.getBoundingClientRect();
    var pos = { x: e.clientX, y: e.clientY };
    var height = selected.getBoundingClientRect().height;
    var isMove = false;
    var onMove = function onMove(e) {
      e.preventDefault();
      e.stopPropagation();
      (0, _util.event)(e);
      isMove = true;
      var w = height - e.clientY + pos.y;
      var now = w / barRect.height;
      selected.style.height = w + 'px';
      player.volume = Math.max(Math.min(now, 1), 0);
    };
    var onUp = function onUp(e) {
      e.preventDefault();
      e.stopPropagation();
      (0, _util.event)(e);
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
    if (_sniffer2.default.device === 'mobile') {
      if (player.video.muted) {
        player.video.muted = false;
        player.emit('unmute');
        player.volume = 1;
      } else {
        player.video.muted = true;
        player.emit('mute');
        player.volume = 0;
      }
    } else {
      if (!slider) return;
      player.video.muted = false;
      if (player.volume < 0.1) {
        if (slider.volume < 0.1) {
          player.volume = 0.6;
        } else {
          player.volume = slider.volume;
        }
        player.emit('unmute');
      } else {
        player.volume = 0;
        player.emit('mute');
      }
    }
    // onVolumeChange ()
  }
  player.on('volumeIconClick', onVolumeIconClick);

  function onVolumeIconEnter() {
    (0, _util.addClass)(root, 'xgplayer-volume-active');
    if (container) {
      container.focus();
    }
  }
  player.on('volumeIconEnter', onVolumeIconEnter);

  function onVolumeIconLeave() {
    (0, _util.removeClass)(root, 'xgplayer-volume-active');
  }
  player.on('volumeIconLeave', onVolumeIconLeave);

  var _changeTimer = null;
  function onVolumeChange() {
    if (_changeTimer) {
      clearTimeout(_changeTimer);
    }
    _changeTimer = setTimeout(function () {
      if (_sniffer2.default.device === 'mobile') {
        (0, _util.removeClass)(root, 'xgplayer-volume-muted');
        (0, _util.removeClass)(root, 'xgplayer-volume-large');
        if (player.video.muted || player.video.defaultMuted) {
          if (!player.video.muted) {
            player.video.muted = true;
          }
          player.video.defaultMuted = false;
          (0, _util.addClass)(root, 'xgplayer-volume-muted');
        } else {
          (0, _util.addClass)(root, 'xgplayer-volume-large');
        }
      } else {
        (0, _util.removeClass)(root, 'xgplayer-volume-muted');
        (0, _util.removeClass)(root, 'xgplayer-volume-small');
        (0, _util.removeClass)(root, 'xgplayer-volume-large');
        if (player.volume === 0 || player.muted) {
          (0, _util.addClass)(root, 'xgplayer-volume-muted');
        } else if (player.volume < 0.5) {
          (0, _util.addClass)(root, 'xgplayer-volume-small');
        } else {
          (0, _util.addClass)(root, 'xgplayer-volume-large');
        }
        if (!bar) return;
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
    if (_changeTimer) {
      clearTimeout(_changeTimer);
      _changeTimer = null;
    }
  }
  player.once('destroy', onDestroy);
};

exports.default = {
  name: 'volume',
  method: volume
};
module.exports = exports['default'];

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _xgplayerSubtitles = __webpack_require__(106);

var _xgplayerSubtitles2 = _interopRequireDefault(_xgplayerSubtitles);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var defaultStyle = {
  follow: true, // 是否跟随控制栏调整位置
  mode: 'stroke', // 字体显示模式，默认是描边
  followBottom: 50, // 跟随底部控制栏的高度
  fitVideo: true, // 是否跟随视频自动调整字号
  offsetBottom: 2, // 字幕距离画面底部百分比，默认2%
  baseSizeX: 49, // 横屏视频适配基准字号
  baseSizeY: 28, // 竖屏视频适配基准字号
  minSize: 16, // pc端最小字号
  minMobileSize: 13, // 移动端最小字号
  line: 'double', // 最大显示行数 single/double/three
  fontColor: '#fff' // 字体颜色


  // function createSubTitle (textTrack, style = {}, defaultOpen = true) {
  //   const config = {
  //     subTitles: textTrack,
  //     defaultOpen: defaultOpen
  //   }

  //   Object.keys(style).map(key => {
  //     config[key] = style[key]
  //   })
  //   return new SubTitles(config)
  // }

};
var XgSubtitles = function () {
  function XgSubtitles(player, list, style) {
    var _this = this;

    _classCallCheck(this, XgSubtitles);

    var subtitle = this.create(list, style, player.textTrackShowDefault);
    subtitle.attachPlayer(player);
    this.subtitle = subtitle;
    this.player = player;
    this.positionData = {
      vBottom: 0,
      marginBottom: 0
    };
    this.isActive = false;
    this.followBottom = style.followBottom;
    ['onSubtitleResize', 'onFocus', 'onBlur'].map(function (item) {
      _this[item] = _this[item].bind(_this);
    });

    if (player.controls && style.follow) {
      this.subtitle.on('resize', this.onSubtitleResize);
      player.on('focus', this.onFocus);
      player.on('blur', this.onBlur);
    }
  }

  _createClass(XgSubtitles, [{
    key: 'create',
    value: function create(textTrack) {
      var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var defaultOpen = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      var config = {
        subTitles: textTrack,
        defaultOpen: defaultOpen
      };
      Object.keys(style).map(function (key) {
        config[key] = style[key];
      });
      return new _xgplayerSubtitles2.default(config);
    }
  }, {
    key: 'switch',
    value: function _switch(subtitle) {
      return this.subtitle.switch(subtitle);
    }
  }, {
    key: 'switchOff',
    value: function switchOff() {
      return this.subtitle.switchOff();
    }
  }, {
    key: 'setSubTitles',
    value: function setSubTitles(subtitles, showDefault, isNeedMove) {
      return this.subtitle.setSubTitles(subtitles, showDefault, isNeedMove);
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      var _positionData = this.positionData,
          marginBottom = _positionData.marginBottom,
          vBottom = _positionData.vBottom;

      if (this.isActive || !marginBottom) {
        return;
      }
      this.isActive = true;
      var bottom = marginBottom + vBottom;
      if (this.followBottom > bottom) {
        bottom = this.followBottom;
      }
      this.subtitle && (this.subtitle.root.style.bottom = bottom + 'px');
    }
  }, {
    key: 'onBlur',
    value: function onBlur() {
      this.isActive = false;
      var bottom = this.positionData.vBottom + this.positionData.marginBottom;
      this.subtitle && (this.subtitle.root.style.bottom = bottom + 'px');
    }
  }, {
    key: 'onSubtitleResize',
    value: function onSubtitleResize(data) {
      this.positionData.vBottom = data.vBottom;
      this.positionData.marginBottom = data.marginBottom;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.subtitle.off('resize', this.onSubtitleResize);
      this.player.off('focus', this.onFocus);
      this.player.off('blur', this.onBlur);
      this.subtitle.destroy();
      this.subtitle = null;
    }
  }]);

  return XgSubtitles;
}();

var textTrack = function textTrack() {
  var _this2 = this;

  var player = this;
  var textTrack = player.config.textTrack;

  if (!textTrack) {
    return;
  }
  var textTrackStyle = player.config.textTrackStyle || {};
  Object.keys(defaultStyle).map(function (key) {
    if (textTrackStyle[key] === undefined) {
      textTrackStyle[key] = defaultStyle[key];
    }
  });
  player.textTrackShowDefault = false;
  player.config.textTrack.map(function (item, index) {
    if (!item.id && !item.language) {
      item.id = index;
    }
    !item.url && (item.url = item.src);
    !item.language && (item.language = item.srclang);
    item.isDefault === undefined && (item.isDefault = item.default);
    !player.textTrackShowDefault && (player.textTrackShowDefault = item.isDefault || item.default);
  });

  this.subTitles = new XgSubtitles(player, player.config.textTrack, textTrackStyle);

  player.setSubTitles = function (textTrack) {
    var needRemove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var showDefault = false;
    textTrack.map(function (item, index) {
      if (!item.id && !item.language) {
        item.id = index;
      }
      !item.url && (item.url = item.src);
      !item.language && (item.language = item.srclang);
      item.isDefault === undefined && (item.isDefault = item.default);
      item.isDefault && (showDefault = true);
    });
    player.textTrackShowDefault = showDefault;
    _this2.subTitles.setSubTitles(textTrack, showDefault, needRemove);
    player.emit('subtitle_change', {
      off: false,
      isListUpdate: true,
      list: textTrack
    });
  };

  player.switchSubTitle = function () {
    var subtitle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { id: '', language: '' };

    _this2.subTitles.switch(subtitle).then(function (data) {
      if (data.code === 0) {
        subtitle.off = false;
        subtitle.isListUpdate = false;
        subtitle.list = [];
        player.emit('subtitle_change', subtitle);
      }
    });
  };

  player.switchOffSubtile = function () {
    _this2.subTitles.switchOff();
    player.emit('subtitle_change', {
      off: true,
      isListUpdate: false,
      list: []
    });
  };

  function onDestroy() {
    this.subTitles.destroy();
    this.subTitles = null;
  }
  player.once('destroy', onDestroy);
};

exports.default = {
  name: 'textTrack',
  method: textTrack
};
module.exports = exports['default'];

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

!function (t, e) {
   true ? module.exports = e() : undefined;
}(this, function () {
  "use strict";
  function t(t) {
    return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
  }function e(t, e) {
    return e = { exports: {} }, t(e, e.exports), e.exports;
  }function n(t) {
    var e, n;this.promise = new t(function (t, r) {
      if (void 0 !== e || void 0 !== n) throw TypeError("Bad Promise constructor");e = t, n = r;
    }), this.resolve = F(e), this.reject = F(n);
  }function r(t) {
    var e = t.length;return 3 === e ? (60 * (60 * Number(t[0]) + Number(t[1])) * 1e3 + 1e3 * Number(t[2])) / 1e3 : 2 === e ? (60 * Number(t[0]) * 1e3 + 1e3 * Number(t[1])) / 1e3 : Number(t[0]);
  }function i(t) {
    return (/^(\-|\+)?\d+(\.\d+)?$/.test(t)
    );
  }function o(t) {
    return t;
  }function s(t, e) {
    return t >= 0 && t < e.length ? e[t] : "";
  }function a(t, e) {
    if (!t) return !1;if (t.classList) return Array.prototype.some.call(t.classList, function (t) {
      return t === e;
    });var n = t.className && "object" === Je(t.className) ? t.getAttribute("class") : t.className;return n && !!n.match(new RegExp("(\\s|^)" + e + "(\\s|$)"));
  }function u(t, e) {
    t && (t.classList ? e.replace(/(^\s+|\s+$)/g, "").split(/\s+/g).forEach(function (e) {
      e && t.classList.add(e);
    }) : a(t, e) || (t.className && "object" === Je(t.className) ? t.setAttribute("class", t.getAttribute("class") + " " + e) : t.className += " " + e));
  }function c(t, e) {
    t && (t.classList ? e.split(/\s+/g).forEach(function (e) {
      t.classList.remove(e);
    }) : a(t, e) && e.split(/\s+/g).forEach(function (e) {
      var n = new RegExp("(\\s|^)" + e + "(\\s|$)");t.className && "object" === Je(t.className) ? t.setAttribute("class", t.getAttribute("class").replace(n, " ")) : t.className = t.className.replace(n, " ");
    }));
  }function l(t, e, n) {
    var r = e.length;if (r < 1) return -1;if (n = n < 0 ? 0 : n >= r ? r - 1 : n, e[n].start <= t && t < e[n].end) return n;for (var i = e[n].end <= t ? n + 1 : 0; i < r; i++) {
      if (e[i].start <= t && t < e[i].end) return i;if (t > e[i].end && i + 1 < r && t < e[i + 1].start) return -1;if (t > e[i].end && i + 1 >= r) return -1;
    }return -1;
  }function f(t, e, n) {
    var r = e.length;if (r < 1) return [];var i = [];if ((n = n < 0 ? 0 : n >= r ? r - 1 : n) < r) for (var o = e[n].end <= t ? n : 0; o < r && (e[o].start <= t && t < e[o].end && i.push(o), !(t < e[o].start)); o++);return i;
  }function h(t) {
    return Object.prototype.toString.call(t).match(/([^\s.*]+)(?=]$)/g)[0];
  }function d() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "div",
        e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
        n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
        r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "",
        i = document.createElement(t);return i.className = r, i.innerHTML = e, kr(n).forEach(function (e) {
      var r = e,
          o = n[e];"video" === t || "audio" === t || "live-video" === t ? o && i.setAttribute(r, o) : i.setAttribute(r, o);
    }), i;
  }function p() {
    var t = navigator.userAgent,
        e = /(?:Windows Phone)/.test(t),
        n = /(?:SymbianOS)/.test(t) || e,
        r = /(?:Android)/.test(t),
        i = /(?:Firefox)/.test(t),
        o = /(?:iPad|PlayBook)/.test(t) || r && !/(?:Mobile)/.test(t) || i && /(?:Tablet)/.test(t);return (/(?:iPhone)/.test(t) && !o || r || n || o
    );
  }function v(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
        n = "";t.map(function (t) {
      n += " " + e + " " + t.key + " {" + t.style + "}";
    });var r = document.createElement("style"),
        i = document.head || document.getElementsByTagName("head")[0];if (r.type = "text/css", r.id = "ssss", r.styleSheet) {
      var o = function () {
        try {
          r.styleSheet.cssText = n;
        } catch (t) {}
      };r.styleSheet.disabled ? setTimeout(o, 10) : o();
    } else {
      var s = document.createTextNode(n);r.appendChild(s);
    }i.appendChild(r);
  }function y(t, e) {
    Ir || (Ir = new Lr()), Ir.addObserver(t, e);
  }function g(t, e) {
    Ir && Ir.unObserver(t, e);
  }function m(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        n = { code: Fr[t].code, msg: Fr[t].msg };return kr(e).map(function (t) {
      n[t] = e[t];
    }), n;
  }function _(t, e, n, r, i) {
    i ? n(m(2, i), { format: r.format }) : r.format ? (t.list = r.list, t.format = r.format, t.styles = r.styles, e(t)) : n(m(3));
  }function x(t) {
    return new xr(function (e, n) {
      if (t.list) return void e(t);if (t.json) {
        var r = Nr.parseJson(t.json);return t.list = r, t.format = "json", void e(t);
      }if (t.stringContent && !t.url) Nr.parse(t.stringContent, function (r, i) {
        _(t, e, n, r, i);
      });else if (t.url) new Tr({ url: t.url, type: "text" }).then(function (r) {
        Nr.parse(r.res.response, function (r, i) {
          _(t, e, n, r, i);
        });
      }).catch(function (e) {
        var r = m(1, { statusText: e.statusText, status: e.status, type: e.type, message: "http load error", url: t.url });n(r);
      });else {
        var i = m(8);n(i);
      }
    });
  }function b(t, e) {
    return !!(t.id && t.id === e.id || t.language && t.language === e.language);
  }var k = function (t) {
    if (void 0 == t) throw TypeError("Can't call method on  " + t);return t;
  },
      w = function (t) {
    return Object(k(t));
  },
      T = {}.hasOwnProperty,
      S = function (t, e) {
    return T.call(t, e);
  },
      O = e(function (t) {
    var e = t.exports = { version: "2.6.12" };"number" == typeof __e && (__e = e);
  }),
      E = (O.version, e(function (t) {
    var e = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();"number" == typeof __g && (__g = e);
  })),
      P = e(function (t) {
    var e = E["__core-js_shared__"] || (E["__core-js_shared__"] = {});(t.exports = function (t, n) {
      return e[t] || (e[t] = void 0 !== n ? n : {});
    })("versions", []).push({ version: O.version, mode: "pure", copyright: "© 2020 Denis Pushkarev (zloirock.ru)" });
  }),
      j = 0,
      M = Math.random(),
      A = function (t) {
    return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++j + M).toString(36));
  },
      C = P("keys"),
      R = function (t) {
    return C[t] || (C[t] = A(t));
  },
      N = R("IE_PROTO"),
      L = Object.prototype,
      I = Object.getPrototypeOf || function (t) {
    return t = w(t), S(t, N) ? t[N] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? L : null;
  },
      F = function (t) {
    if ("function" != typeof t) throw TypeError(t + " is not a function!");return t;
  },
      z = function (t, e, n) {
    if (F(t), void 0 === e) return t;switch (n) {case 1:
        return function (n) {
          return t.call(e, n);
        };case 2:
        return function (n, r) {
          return t.call(e, n, r);
        };case 3:
        return function (n, r, i) {
          return t.call(e, n, r, i);
        };}return function () {
      return t.apply(e, arguments);
    };
  },
      B = function (t) {
    return "object" == typeof t ? null !== t : "function" == typeof t;
  },
      D = function (t) {
    if (!B(t)) throw TypeError(t + " is not an object!");return t;
  },
      H = function (t) {
    try {
      return !!t();
    } catch (t) {
      return !0;
    }
  },
      V = !H(function () {
    return 7 != Object.defineProperty({}, "a", { get: function () {
        return 7;
      } }).a;
  }),
      W = E.document,
      G = B(W) && B(W.createElement),
      U = function (t) {
    return G ? W.createElement(t) : {};
  },
      $ = !V && !H(function () {
    return 7 != Object.defineProperty(U("div"), "a", { get: function () {
        return 7;
      } }).a;
  }),
      K = function (t, e) {
    if (!B(t)) return t;var n, r;if (e && "function" == typeof (n = t.toString) && !B(r = n.call(t))) return r;if ("function" == typeof (n = t.valueOf) && !B(r = n.call(t))) return r;if (!e && "function" == typeof (n = t.toString) && !B(r = n.call(t))) return r;throw TypeError("Can't convert object to primitive value");
  },
      J = Object.defineProperty,
      Y = { f: V ? Object.defineProperty : function (t, e, n) {
      if (D(t), e = K(e, !0), D(n), $) try {
        return J(t, e, n);
      } catch (t) {}if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");return "value" in n && (t[e] = n.value), t;
    } },
      X = function (t, e) {
    return { enumerable: !(1 & t), configurable: !(2 & t), writable: !(4 & t), value: e };
  },
      q = V ? function (t, e, n) {
    return Y.f(t, e, X(1, n));
  } : function (t, e, n) {
    return t[e] = n, t;
  },
      Z = function (t, e, n) {
    var r,
        i,
        o,
        s = t & Z.F,
        a = t & Z.G,
        u = t & Z.S,
        c = t & Z.P,
        l = t & Z.B,
        f = t & Z.W,
        h = a ? O : O[e] || (O[e] = {}),
        d = h.prototype,
        p = a ? E : u ? E[e] : (E[e] || {}).prototype;a && (n = e);for (r in n) (i = !s && p && void 0 !== p[r]) && S(h, r) || (o = i ? p[r] : n[r], h[r] = a && "function" != typeof p[r] ? n[r] : l && i ? z(o, E) : f && p[r] == o ? function (t) {
      var e = function (e, n, r) {
        if (this instanceof t) {
          switch (arguments.length) {case 0:
              return new t();case 1:
              return new t(e);case 2:
              return new t(e, n);}return new t(e, n, r);
        }return t.apply(this, arguments);
      };return e.prototype = t.prototype, e;
    }(o) : c && "function" == typeof o ? z(Function.call, o) : o, c && ((h.virtual || (h.virtual = {}))[r] = o, t & Z.R && d && !d[r] && q(d, r, o)));
  };Z.F = 1, Z.G = 2, Z.S = 4, Z.P = 8, Z.B = 16, Z.W = 32, Z.U = 64, Z.R = 128;var Q = Z,
      tt = function (t, e) {
    var n = (O.Object || {})[t] || Object[t],
        r = {};r[t] = e(n), Q(Q.S + Q.F * H(function () {
      n(1);
    }), "Object", r);
  };tt("getPrototypeOf", function () {
    return function (t) {
      return I(w(t));
    };
  });var et = O.Object.getPrototypeOf,
      nt = t(e(function (t) {
    t.exports = { default: et, __esModule: !0 };
  })),
      rt = t(e(function (t, e) {
    e.__esModule = !0, e.default = function (t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    };
  })),
      it = Math.ceil,
      ot = Math.floor,
      st = function (t) {
    return isNaN(t = +t) ? 0 : (t > 0 ? ot : it)(t);
  },
      at = q,
      ut = {},
      ct = {}.toString,
      lt = function (t) {
    return ct.call(t).slice(8, -1);
  },
      ft = Object("z").propertyIsEnumerable(0) ? Object : function (t) {
    return "String" == lt(t) ? t.split("") : Object(t);
  },
      ht = function (t) {
    return ft(k(t));
  },
      dt = Math.min,
      pt = function (t) {
    return t > 0 ? dt(st(t), 9007199254740991) : 0;
  },
      vt = Math.max,
      yt = Math.min,
      gt = function (t, e) {
    return t = st(t), t < 0 ? vt(t + e, 0) : yt(t, e);
  },
      mt = function (t) {
    return function (e, n, r) {
      var i,
          o = ht(e),
          s = pt(o.length),
          a = gt(r, s);if (t && n != n) {
        for (; s > a;) if ((i = o[a++]) != i) return !0;
      } else for (; s > a; a++) if ((t || a in o) && o[a] === n) return t || a || 0;return !t && -1;
    };
  }(!1),
      _t = R("IE_PROTO"),
      xt = function (t, e) {
    var n,
        r = ht(t),
        i = 0,
        o = [];for (n in r) n != _t && S(r, n) && o.push(n);for (; e.length > i;) S(r, n = e[i++]) && (~mt(o, n) || o.push(n));return o;
  },
      bt = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(","),
      kt = Object.keys || function (t) {
    return xt(t, bt);
  },
      wt = V ? Object.defineProperties : function (t, e) {
    D(t);for (var n, r = kt(e), i = r.length, o = 0; i > o;) Y.f(t, n = r[o++], e[n]);return t;
  },
      Tt = E.document,
      St = Tt && Tt.documentElement,
      Ot = R("IE_PROTO"),
      Et = function () {},
      Pt = function () {
    var t,
        e = U("iframe"),
        n = bt.length;for (e.style.display = "none", St.appendChild(e), e.src = "javascript:", (t = e.contentWindow.document).open(), t.write("<script>document.F=Object<\/script>"), t.close(), Pt = t.F; n--;) delete Pt.prototype[bt[n]];return Pt();
  },
      jt = Object.create || function (t, e) {
    var n;return null !== t ? (Et.prototype = D(t), n = new Et(), Et.prototype = null, n[Ot] = t) : n = Pt(), void 0 === e ? n : wt(n, e);
  },
      Mt = e(function (t) {
    var e = P("wks"),
        n = E.Symbol,
        r = "function" == typeof n;(t.exports = function (t) {
      return e[t] || (e[t] = r && n[t] || (r ? n : A)("Symbol." + t));
    }).store = e;
  }),
      At = Y.f,
      Ct = Mt("toStringTag"),
      Rt = function (t, e, n) {
    t && !S(t = n ? t : t.prototype, Ct) && At(t, Ct, { configurable: !0, value: e });
  },
      Nt = {};q(Nt, Mt("iterator"), function () {
    return this;
  });var Lt = function (t, e, n) {
    t.prototype = jt(Nt, { next: X(1, n) }), Rt(t, e + " Iterator");
  },
      It = Mt("iterator"),
      Ft = !([].keys && "next" in [].keys()),
      zt = function () {
    return this;
  },
      Bt = function (t, e, n, r, i, o, s) {
    Lt(n, e, r);var a,
        u,
        c,
        l = function (t) {
      if (!Ft && t in p) return p[t];switch (t) {case "keys":case "values":
          return function () {
            return new n(this, t);
          };}return function () {
        return new n(this, t);
      };
    },
        f = e + " Iterator",
        h = "values" == i,
        d = !1,
        p = t.prototype,
        v = p[It] || p["@@iterator"] || i && p[i],
        y = v || l(i),
        g = i ? h ? l("entries") : y : void 0,
        m = "Array" == e ? p.entries || v : v;if (m && (c = I(m.call(new t()))) !== Object.prototype && c.next && Rt(c, f, !0), h && v && "values" !== v.name && (d = !0, y = function () {
      return v.call(this);
    }), s && (Ft || d || !p[It]) && q(p, It, y), ut[e] = y, ut[f] = zt, i) if (a = { values: h ? y : l("values"), keys: o ? y : l("keys"), entries: g }, s) for (u in a) u in p || at(p, u, a[u]);else Q(Q.P + Q.F * (Ft || d), e, a);return a;
  },
      Dt = function (t) {
    return function (e, n) {
      var r,
          i,
          o = String(k(e)),
          s = st(n),
          a = o.length;return s < 0 || s >= a ? t ? "" : void 0 : (r = o.charCodeAt(s), r < 55296 || r > 56319 || s + 1 === a || (i = o.charCodeAt(s + 1)) < 56320 || i > 57343 ? t ? o.charAt(s) : r : t ? o.slice(s, s + 2) : i - 56320 + (r - 55296 << 10) + 65536);
    };
  }(!0);Bt(String, "String", function (t) {
    this._t = String(t), this._i = 0;
  }, function () {
    var t,
        e = this._t,
        n = this._i;return n >= e.length ? { value: void 0, done: !0 } : (t = Dt(e, n), this._i += t.length, { value: t, done: !1 });
  });var Ht = function (t, e) {
    return { value: e, done: !!t };
  };Bt(Array, "Array", function (t, e) {
    this._t = ht(t), this._i = 0, this._k = e;
  }, function () {
    var t = this._t,
        e = this._k,
        n = this._i++;return !t || n >= t.length ? (this._t = void 0, Ht(1)) : "keys" == e ? Ht(0, n) : "values" == e ? Ht(0, t[n]) : Ht(0, [n, t[n]]);
  }, "values");ut.Arguments = ut.Array;for (var Vt = Mt("toStringTag"), Wt = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), Gt = 0; Gt < Wt.length; Gt++) {
    var Ut = Wt[Gt],
        $t = E[Ut],
        Kt = $t && $t.prototype;Kt && !Kt[Vt] && q(Kt, Vt, Ut), ut[Ut] = ut.Array;
  }var Jt = { f: Mt },
      Yt = Jt.f("iterator"),
      Xt = e(function (t) {
    t.exports = { default: Yt, __esModule: !0 };
  });t(Xt);var qt = e(function (t) {
    var e = A("meta"),
        n = Y.f,
        r = 0,
        i = Object.isExtensible || function () {
      return !0;
    },
        o = !H(function () {
      return i(Object.preventExtensions({}));
    }),
        s = function (t) {
      n(t, e, { value: { i: "O" + ++r, w: {} } });
    },
        a = function (t, n) {
      if (!B(t)) return "symbol" == typeof t ? t : ("string" == typeof t ? "S" : "P") + t;if (!S(t, e)) {
        if (!i(t)) return "F";if (!n) return "E";s(t);
      }return t[e].i;
    },
        u = function (t, n) {
      if (!S(t, e)) {
        if (!i(t)) return !0;if (!n) return !1;s(t);
      }return t[e].w;
    },
        c = function (t) {
      return o && l.NEED && i(t) && !S(t, e) && s(t), t;
    },
        l = t.exports = { KEY: e, NEED: !1, fastKey: a, getWeak: u, onFreeze: c };
  }),
      Zt = (qt.KEY, qt.NEED, qt.fastKey, qt.getWeak, qt.onFreeze, Y.f),
      Qt = function (t) {
    var e = O.Symbol || (O.Symbol = {});"_" == t.charAt(0) || t in e || Zt(e, t, { value: Jt.f(t) });
  },
      te = { f: Object.getOwnPropertySymbols },
      ee = { f: {}.propertyIsEnumerable },
      ne = function (t) {
    var e = kt(t),
        n = te.f;if (n) for (var r, i = n(t), o = ee.f, s = 0; i.length > s;) o.call(t, r = i[s++]) && e.push(r);return e;
  },
      re = Array.isArray || function (t) {
    return "Array" == lt(t);
  },
      ie = bt.concat("length", "prototype"),
      oe = { f: Object.getOwnPropertyNames || function (t) {
      return xt(t, ie);
    } },
      se = oe.f,
      ae = {}.toString,
      ue = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
      ce = function (t) {
    try {
      return se(t);
    } catch (t) {
      return ue.slice();
    }
  },
      le = { f: function (t) {
      return ue && "[object Window]" == ae.call(t) ? ce(t) : se(ht(t));
    } },
      fe = Object.getOwnPropertyDescriptor,
      he = { f: V ? fe : function (t, e) {
      if (t = ht(t), e = K(e, !0), $) try {
        return fe(t, e);
      } catch (t) {}if (S(t, e)) return X(!ee.f.call(t, e), t[e]);
    } },
      de = qt.KEY,
      pe = he.f,
      ve = Y.f,
      ye = le.f,
      ge = E.Symbol,
      me = E.JSON,
      _e = me && me.stringify,
      xe = Mt("_hidden"),
      be = Mt("toPrimitive"),
      ke = {}.propertyIsEnumerable,
      we = P("symbol-registry"),
      Te = P("symbols"),
      Se = P("op-symbols"),
      Oe = Object.prototype,
      Ee = "function" == typeof ge && !!te.f,
      Pe = E.QObject,
      je = !Pe || !Pe.prototype || !Pe.prototype.findChild,
      Me = V && H(function () {
    return 7 != jt(ve({}, "a", { get: function () {
        return ve(this, "a", { value: 7 }).a;
      } })).a;
  }) ? function (t, e, n) {
    var r = pe(Oe, e);r && delete Oe[e], ve(t, e, n), r && t !== Oe && ve(Oe, e, r);
  } : ve,
      Ae = function (t) {
    var e = Te[t] = jt(ge.prototype);return e._k = t, e;
  },
      Ce = Ee && "symbol" == typeof ge.iterator ? function (t) {
    return "symbol" == typeof t;
  } : function (t) {
    return t instanceof ge;
  },
      Re = function (t, e, n) {
    return t === Oe && Re(Se, e, n), D(t), e = K(e, !0), D(n), S(Te, e) ? (n.enumerable ? (S(t, xe) && t[xe][e] && (t[xe][e] = !1), n = jt(n, { enumerable: X(0, !1) })) : (S(t, xe) || ve(t, xe, X(1, {})), t[xe][e] = !0), Me(t, e, n)) : ve(t, e, n);
  },
      Ne = function (t, e) {
    D(t);for (var n, r = ne(e = ht(e)), i = 0, o = r.length; o > i;) Re(t, n = r[i++], e[n]);return t;
  },
      Le = function (t, e) {
    return void 0 === e ? jt(t) : Ne(jt(t), e);
  },
      Ie = function (t) {
    var e = ke.call(this, t = K(t, !0));return !(this === Oe && S(Te, t) && !S(Se, t)) && (!(e || !S(this, t) || !S(Te, t) || S(this, xe) && this[xe][t]) || e);
  },
      Fe = function (t, e) {
    if (t = ht(t), e = K(e, !0), t !== Oe || !S(Te, e) || S(Se, e)) {
      var n = pe(t, e);return !n || !S(Te, e) || S(t, xe) && t[xe][e] || (n.enumerable = !0), n;
    }
  },
      ze = function (t) {
    for (var e, n = ye(ht(t)), r = [], i = 0; n.length > i;) S(Te, e = n[i++]) || e == xe || e == de || r.push(e);return r;
  },
      Be = function (t) {
    for (var e, n = t === Oe, r = ye(n ? Se : ht(t)), i = [], o = 0; r.length > o;) !S(Te, e = r[o++]) || n && !S(Oe, e) || i.push(Te[e]);return i;
  };Ee || (at((ge = function () {
    if (this instanceof ge) throw TypeError("Symbol is not a constructor!");var t = A(arguments.length > 0 ? arguments[0] : void 0),
        e = function (n) {
      this === Oe && e.call(Se, n), S(this, xe) && S(this[xe], t) && (this[xe][t] = !1), Me(this, t, X(1, n));
    };return V && je && Me(Oe, t, { configurable: !0, set: e }), Ae(t);
  }).prototype, "toString", function () {
    return this._k;
  }), he.f = Fe, Y.f = Re, oe.f = le.f = ze, ee.f = Ie, te.f = Be, Jt.f = function (t) {
    return Ae(Mt(t));
  }), Q(Q.G + Q.W + Q.F * !Ee, { Symbol: ge });for (var De = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), He = 0; De.length > He;) Mt(De[He++]);for (var Ve = kt(Mt.store), We = 0; Ve.length > We;) Qt(Ve[We++]);Q(Q.S + Q.F * !Ee, "Symbol", { for: function (t) {
      return S(we, t += "") ? we[t] : we[t] = ge(t);
    }, keyFor: function (t) {
      if (!Ce(t)) throw TypeError(t + " is not a symbol!");for (var e in we) if (we[e] === t) return e;
    }, useSetter: function () {
      je = !0;
    }, useSimple: function () {
      je = !1;
    } }), Q(Q.S + Q.F * !Ee, "Object", { create: Le, defineProperty: Re, defineProperties: Ne, getOwnPropertyDescriptor: Fe, getOwnPropertyNames: ze, getOwnPropertySymbols: Be });var Ge = H(function () {
    te.f(1);
  });Q(Q.S + Q.F * Ge, "Object", { getOwnPropertySymbols: function (t) {
      return te.f(w(t));
    } }), me && Q(Q.S + Q.F * (!Ee || H(function () {
    var t = ge();return "[null]" != _e([t]) || "{}" != _e({ a: t }) || "{}" != _e(Object(t));
  })), "JSON", { stringify: function (t) {
      for (var e, n, r = [t], i = 1; arguments.length > i;) r.push(arguments[i++]);if (n = e = r[1], (B(e) || void 0 !== t) && !Ce(t)) return re(e) || (e = function (t, e) {
        if ("function" == typeof n && (e = n.call(this, t, e)), !Ce(e)) return e;
      }), r[1] = e, _e.apply(me, r);
    } }), ge.prototype[be] || q(ge.prototype, be, ge.prototype.valueOf), Rt(ge, "Symbol"), Rt(Math, "Math", !0), Rt(E.JSON, "JSON", !0), Qt("asyncIterator"), Qt("observable");var Ue = O.Symbol,
      $e = e(function (t) {
    t.exports = { default: Ue, __esModule: !0 };
  });t($e);var Ke = e(function (t, e) {
    function n(t) {
      return t && t.__esModule ? t : { default: t };
    }e.__esModule = !0;var r = n(Xt),
        i = n($e),
        o = "function" == typeof i.default && "symbol" == typeof r.default ? function (t) {
      return typeof t;
    } : function (t) {
      return t && "function" == typeof i.default && t.constructor === i.default && t !== i.default.prototype ? "symbol" : typeof t;
    };e.default = "function" == typeof i.default && "symbol" === o(r.default) ? function (t) {
      return void 0 === t ? "undefined" : o(t);
    } : function (t) {
      return t && "function" == typeof i.default && t.constructor === i.default && t !== i.default.prototype ? "symbol" : void 0 === t ? "undefined" : o(t);
    };
  }),
      Je = t(Ke),
      Ye = t(e(function (t, e) {
    e.__esModule = !0;var n = function (t) {
      return t && t.__esModule ? t : { default: t };
    }(Ke);e.default = function (t, e) {
      if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" !== (void 0 === e ? "undefined" : (0, n.default)(e)) && "function" != typeof e ? t : e;
    };
  }));Q(Q.S + Q.F * !V, "Object", { defineProperty: Y.f });var Xe = O.Object,
      qe = function (t, e, n) {
    return Xe.defineProperty(t, e, n);
  },
      Ze = e(function (t) {
    t.exports = { default: qe, __esModule: !0 };
  });t(Ze);var Qe = t(e(function (t, e) {
    e.__esModule = !0;var n = function (t) {
      return t && t.__esModule ? t : { default: t };
    }(Ze);e.default = function () {
      function t(t, e) {
        for (var r = 0; r < e.length; r++) {
          var i = e[r];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), (0, n.default)(t, i.key, i);
        }
      }return function (e, n, r) {
        return n && t(e.prototype, n), r && t(e, r), e;
      };
    }();
  })),
      tn = function (t, e) {
    if (D(t), !B(e) && null !== e) throw TypeError(e + ": can't set as prototype!");
  },
      en = { set: Object.setPrototypeOf || ("__proto__" in {} ? function (t, e, n) {
      try {
        (n = z(Function.call, he.f(Object.prototype, "__proto__").set, 2))(t, []), e = !(t instanceof Array);
      } catch (t) {
        e = !0;
      }return function (t, r) {
        return tn(t, r), e ? t.__proto__ = r : n(t, r), t;
      };
    }({}, !1) : void 0), check: tn };Q(Q.S, "Object", { setPrototypeOf: en.set });var nn = O.Object.setPrototypeOf,
      rn = e(function (t) {
    t.exports = { default: nn, __esModule: !0 };
  });t(rn), Q(Q.S, "Object", { create: jt });var on = O.Object,
      sn = function (t, e) {
    return on.create(t, e);
  },
      an = e(function (t) {
    t.exports = { default: sn, __esModule: !0 };
  });t(an);var un,
      cn,
      ln,
      fn = t(e(function (t, e) {
    function n(t) {
      return t && t.__esModule ? t : { default: t };
    }e.__esModule = !0;var r = n(rn),
        i = n(an),
        o = n(Ke);e.default = function (t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === e ? "undefined" : (0, o.default)(e)));t.prototype = (0, i.default)(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (r.default ? (0, r.default)(t, e) : t.__proto__ = e);
    };
  })),
      hn = Mt("toStringTag"),
      dn = "Arguments" == lt(function () {
    return arguments;
  }()),
      pn = function (t, e) {
    try {
      return t[e];
    } catch (t) {}
  },
      vn = function (t) {
    var e, n, r;return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (n = pn(e = Object(t), hn)) ? n : dn ? lt(e) : "Object" == (r = lt(e)) && "function" == typeof e.callee ? "Arguments" : r;
  },
      yn = function (t, e, n, r) {
    if (!(t instanceof e) || void 0 !== r && r in t) throw TypeError(n + ": incorrect invocation!");return t;
  },
      gn = function (t, e, n, r) {
    try {
      return r ? e(D(n)[0], n[1]) : e(n);
    } catch (e) {
      var i = t.return;throw void 0 !== i && D(i.call(t)), e;
    }
  },
      mn = Mt("iterator"),
      _n = Array.prototype,
      xn = function (t) {
    return void 0 !== t && (ut.Array === t || _n[mn] === t);
  },
      bn = Mt("iterator"),
      kn = O.getIteratorMethod = function (t) {
    if (void 0 != t) return t[bn] || t["@@iterator"] || ut[vn(t)];
  },
      wn = e(function (t) {
    var e = {},
        n = {},
        r = t.exports = function (t, r, i, o, s) {
      var a,
          u,
          c,
          l,
          f = s ? function () {
        return t;
      } : kn(t),
          h = z(i, o, r ? 2 : 1),
          d = 0;if ("function" != typeof f) throw TypeError(t + " is not iterable!");if (xn(f)) {
        for (a = pt(t.length); a > d; d++) if ((l = r ? h(D(u = t[d])[0], u[1]) : h(t[d])) === e || l === n) return l;
      } else for (c = f.call(t); !(u = c.next()).done;) if ((l = gn(c, h, u.value, r)) === e || l === n) return l;
    };r.BREAK = e, r.RETURN = n;
  }),
      Tn = Mt("species"),
      Sn = function (t, e) {
    var n,
        r = D(t).constructor;return void 0 === r || void 0 == (n = D(r)[Tn]) ? e : F(n);
  },
      On = function (t, e, n) {
    var r = void 0 === n;switch (e.length) {case 0:
        return r ? t() : t.call(n);case 1:
        return r ? t(e[0]) : t.call(n, e[0]);case 2:
        return r ? t(e[0], e[1]) : t.call(n, e[0], e[1]);case 3:
        return r ? t(e[0], e[1], e[2]) : t.call(n, e[0], e[1], e[2]);case 4:
        return r ? t(e[0], e[1], e[2], e[3]) : t.call(n, e[0], e[1], e[2], e[3]);}return t.apply(n, e);
  },
      En = E.process,
      Pn = E.setImmediate,
      jn = E.clearImmediate,
      Mn = E.MessageChannel,
      An = E.Dispatch,
      Cn = 0,
      Rn = {},
      Nn = function () {
    var t = +this;if (Rn.hasOwnProperty(t)) {
      var e = Rn[t];delete Rn[t], e();
    }
  },
      Ln = function (t) {
    Nn.call(t.data);
  };Pn && jn || (Pn = function (t) {
    for (var e = [], n = 1; arguments.length > n;) e.push(arguments[n++]);return Rn[++Cn] = function () {
      On("function" == typeof t ? t : Function(t), e);
    }, un(Cn), Cn;
  }, jn = function (t) {
    delete Rn[t];
  }, "process" == lt(En) ? un = function (t) {
    En.nextTick(z(Nn, t, 1));
  } : An && An.now ? un = function (t) {
    An.now(z(Nn, t, 1));
  } : Mn ? (ln = (cn = new Mn()).port2, cn.port1.onmessage = Ln, un = z(ln.postMessage, ln, 1)) : E.addEventListener && "function" == typeof postMessage && !E.importScripts ? (un = function (t) {
    E.postMessage(t + "", "*");
  }, E.addEventListener("message", Ln, !1)) : un = "onreadystatechange" in U("script") ? function (t) {
    St.appendChild(U("script")).onreadystatechange = function () {
      St.removeChild(this), Nn.call(t);
    };
  } : function (t) {
    setTimeout(z(Nn, t, 1), 0);
  });var In = { set: Pn, clear: jn },
      Fn = In.set,
      zn = E.MutationObserver || E.WebKitMutationObserver,
      Bn = E.process,
      Dn = E.Promise,
      Hn = "process" == lt(Bn),
      Vn = { f: function (t) {
      return new n(t);
    } },
      Wn = function (t) {
    try {
      return { e: !1, v: t() };
    } catch (t) {
      return { e: !0, v: t };
    }
  },
      Gn = E.navigator,
      Un = Gn && Gn.userAgent || "",
      $n = function (t, e) {
    if (D(t), B(e) && e.constructor === t) return e;var n = Vn.f(t);return (0, n.resolve)(e), n.promise;
  },
      Kn = Mt("species"),
      Jn = Mt("iterator"),
      Yn = !1;try {
    var Xn = [7][Jn]();Xn.return = function () {
      Yn = !0;
    }, Array.from(Xn, function () {
      throw 2;
    });
  } catch (t) {}var qn,
      Zn,
      Qn,
      tr,
      er = In.set,
      nr = function () {
    var t,
        e,
        n,
        r = function () {
      var r, i;for (Hn && (r = Bn.domain) && r.exit(); t;) {
        i = t.fn, t = t.next;try {
          i();
        } catch (r) {
          throw t ? n() : e = void 0, r;
        }
      }e = void 0, r && r.enter();
    };if (Hn) n = function () {
      Bn.nextTick(r);
    };else if (!zn || E.navigator && E.navigator.standalone) {
      if (Dn && Dn.resolve) {
        var i = Dn.resolve(void 0);n = function () {
          i.then(r);
        };
      } else n = function () {
        Fn.call(E, r);
      };
    } else {
      var o = !0,
          s = document.createTextNode("");new zn(r).observe(s, { characterData: !0 }), n = function () {
        s.data = o = !o;
      };
    }return function (r) {
      var i = { fn: r, next: void 0 };e && (e.next = i), t || (t = i, n()), e = i;
    };
  }(),
      rr = E.TypeError,
      ir = E.process,
      or = ir && ir.versions,
      sr = or && or.v8 || "",
      ar = E.Promise,
      ur = "process" == vn(ir),
      cr = function () {},
      lr = Zn = Vn.f,
      fr = !!function () {
    try {
      var t = ar.resolve(1),
          e = (t.constructor = {})[Mt("species")] = function (t) {
        t(cr, cr);
      };return (ur || "function" == typeof PromiseRejectionEvent) && t.then(cr) instanceof e && 0 !== sr.indexOf("6.6") && -1 === Un.indexOf("Chrome/66");
    } catch (t) {}
  }(),
      hr = function (t) {
    var e;return !(!B(t) || "function" != typeof (e = t.then)) && e;
  },
      dr = function (t, e) {
    if (!t._n) {
      t._n = !0;var n = t._c;nr(function () {
        for (var r = t._v, i = 1 == t._s, o = 0; n.length > o;) !function (e) {
          var n,
              o,
              s,
              a = i ? e.ok : e.fail,
              u = e.resolve,
              c = e.reject,
              l = e.domain;try {
            a ? (i || (2 == t._h && yr(t), t._h = 1), !0 === a ? n = r : (l && l.enter(), n = a(r), l && (l.exit(), s = !0)), n === e.promise ? c(rr("Promise-chain cycle")) : (o = hr(n)) ? o.call(n, u, c) : u(n)) : c(r);
          } catch (t) {
            l && !s && l.exit(), c(t);
          }
        }(n[o++]);t._c = [], t._n = !1, e && !t._h && pr(t);
      });
    }
  },
      pr = function (t) {
    er.call(E, function () {
      var e,
          n,
          r,
          i = t._v,
          o = vr(t);if (o && (e = Wn(function () {
        ur ? ir.emit("unhandledRejection", i, t) : (n = E.onunhandledrejection) ? n({ promise: t, reason: i }) : (r = E.console) && r.error && r.error("Unhandled promise rejection", i);
      }), t._h = ur || vr(t) ? 2 : 1), t._a = void 0, o && e.e) throw e.v;
    });
  },
      vr = function (t) {
    return 1 !== t._h && 0 === (t._a || t._c).length;
  },
      yr = function (t) {
    er.call(E, function () {
      var e;ur ? ir.emit("rejectionHandled", t) : (e = E.onrejectionhandled) && e({ promise: t, reason: t._v });
    });
  },
      gr = function (t) {
    var e = this;e._d || (e._d = !0, (e = e._w || e)._v = t, e._s = 2, e._a || (e._a = e._c.slice()), dr(e, !0));
  },
      mr = function (t) {
    var e,
        n = this;if (!n._d) {
      n._d = !0, n = n._w || n;try {
        if (n === t) throw rr("Promise can't be resolved itself");(e = hr(t)) ? nr(function () {
          var r = { _w: n, _d: !1 };try {
            e.call(t, z(mr, r, 1), z(gr, r, 1));
          } catch (t) {
            gr.call(r, t);
          }
        }) : (n._v = t, n._s = 1, dr(n, !1));
      } catch (t) {
        gr.call({ _w: n, _d: !1 }, t);
      }
    }
  };fr || (ar = function (t) {
    yn(this, ar, "Promise", "_h"), F(t), qn.call(this);try {
      t(z(mr, this, 1), z(gr, this, 1));
    } catch (t) {
      gr.call(this, t);
    }
  }, (qn = function (t) {
    this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1;
  }).prototype = function (t, e, n) {
    for (var r in e) n && t[r] ? t[r] = e[r] : q(t, r, e[r]);return t;
  }(ar.prototype, { then: function (t, e) {
      var n = lr(Sn(this, ar));return n.ok = "function" != typeof t || t, n.fail = "function" == typeof e && e, n.domain = ur ? ir.domain : void 0, this._c.push(n), this._a && this._a.push(n), this._s && dr(this, !1), n.promise;
    }, catch: function (t) {
      return this.then(void 0, t);
    } }), Qn = function () {
    var t = new qn();this.promise = t, this.resolve = z(mr, t, 1), this.reject = z(gr, t, 1);
  }, Vn.f = lr = function (t) {
    return t === ar || t === tr ? new Qn(t) : Zn(t);
  }), Q(Q.G + Q.W + Q.F * !fr, { Promise: ar }), Rt(ar, "Promise"), function (t) {
    var e = "function" == typeof O[t] ? O[t] : E[t];V && e && !e[Kn] && Y.f(e, Kn, { configurable: !0, get: function () {
        return this;
      } });
  }("Promise"), tr = O.Promise, Q(Q.S + Q.F * !fr, "Promise", { reject: function (t) {
      var e = lr(this);return (0, e.reject)(t), e.promise;
    } }), Q(Q.S + !0 * Q.F, "Promise", { resolve: function (t) {
      return $n(this === tr ? ar : this, t);
    } }), Q(Q.S + Q.F * !(fr && function (t, e) {
    if (!e && !Yn) return !1;var n = !1;try {
      var r = [7],
          i = r[Jn]();i.next = function () {
        return { done: n = !0 };
      }, r[Jn] = function () {
        return i;
      }, t(r);
    } catch (t) {}return n;
  }(function (t) {
    ar.all(t).catch(cr);
  })), "Promise", { all: function (t) {
      var e = this,
          n = lr(e),
          r = n.resolve,
          i = n.reject,
          o = Wn(function () {
        var n = [],
            o = 0,
            s = 1;wn(t, !1, function (t) {
          var a = o++,
              u = !1;n.push(void 0), s++, e.resolve(t).then(function (t) {
            u || (u = !0, n[a] = t, --s || r(n));
          }, i);
        }), --s || r(n);
      });return o.e && i(o.v), n.promise;
    }, race: function (t) {
      var e = this,
          n = lr(e),
          r = n.reject,
          i = Wn(function () {
        wn(t, !1, function (t) {
          e.resolve(t).then(n.resolve, r);
        });
      });return i.e && r(i.v), n.promise;
    } }), Q(Q.P + Q.R, "Promise", { finally: function (t) {
      var e = Sn(this, O.Promise || E.Promise),
          n = "function" == typeof t;return this.then(n ? function (n) {
        return $n(e, t()).then(function () {
          return n;
        });
      } : t, n ? function (n) {
        return $n(e, t()).then(function () {
          throw n;
        });
      } : t);
    } }), Q(Q.S, "Promise", { try: function (t) {
      var e = Vn.f(this),
          n = Wn(t);return (n.e ? e.reject : e.resolve)(n.v), e.promise;
    } });var _r = O.Promise,
      xr = t(e(function (t) {
    t.exports = { default: _r, __esModule: !0 };
  }));tt("keys", function () {
    return function (t) {
      return kt(w(t));
    };
  });var br = O.Object.keys,
      kr = t(e(function (t) {
    t.exports = { default: br, __esModule: !0 };
  })),
      wr = e(function (t) {
    function e() {}function n(t, e, n) {
      this.fn = t, this.context = e, this.once = n || !1;
    }function r(t, e, r, i, o) {
      if ("function" != typeof r) throw new TypeError("The listener must be a function");var s = new n(r, i || t, o),
          u = a ? a + e : e;return t._events[u] ? t._events[u].fn ? t._events[u] = [t._events[u], s] : t._events[u].push(s) : (t._events[u] = s, t._eventsCount++), t;
    }function i(t, n) {
      0 == --t._eventsCount ? t._events = new e() : delete t._events[n];
    }function o() {
      this._events = new e(), this._eventsCount = 0;
    }var s = Object.prototype.hasOwnProperty,
        a = "~";Object.create && (e.prototype = Object.create(null), new e().__proto__ || (a = !1)), o.prototype.eventNames = function () {
      var t,
          e,
          n = [];if (0 === this._eventsCount) return n;for (e in t = this._events) s.call(t, e) && n.push(a ? e.slice(1) : e);return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(t)) : n;
    }, o.prototype.listeners = function (t) {
      var e = a ? a + t : t,
          n = this._events[e];if (!n) return [];if (n.fn) return [n.fn];for (var r = 0, i = n.length, o = new Array(i); r < i; r++) o[r] = n[r].fn;return o;
    }, o.prototype.listenerCount = function (t) {
      var e = a ? a + t : t,
          n = this._events[e];return n ? n.fn ? 1 : n.length : 0;
    }, o.prototype.emit = function (t, e, n, r, i, o) {
      var s = a ? a + t : t;if (!this._events[s]) return !1;var u,
          c,
          l = this._events[s],
          f = arguments.length;if (l.fn) {
        switch (l.once && this.removeListener(t, l.fn, void 0, !0), f) {case 1:
            return l.fn.call(l.context), !0;case 2:
            return l.fn.call(l.context, e), !0;case 3:
            return l.fn.call(l.context, e, n), !0;case 4:
            return l.fn.call(l.context, e, n, r), !0;case 5:
            return l.fn.call(l.context, e, n, r, i), !0;case 6:
            return l.fn.call(l.context, e, n, r, i, o), !0;}for (c = 1, u = new Array(f - 1); c < f; c++) u[c - 1] = arguments[c];l.fn.apply(l.context, u);
      } else {
        var h,
            d = l.length;for (c = 0; c < d; c++) switch (l[c].once && this.removeListener(t, l[c].fn, void 0, !0), f) {case 1:
            l[c].fn.call(l[c].context);break;case 2:
            l[c].fn.call(l[c].context, e);break;case 3:
            l[c].fn.call(l[c].context, e, n);break;case 4:
            l[c].fn.call(l[c].context, e, n, r);break;default:
            if (!u) for (h = 1, u = new Array(f - 1); h < f; h++) u[h - 1] = arguments[h];l[c].fn.apply(l[c].context, u);}
      }return !0;
    }, o.prototype.on = function (t, e, n) {
      return r(this, t, e, n, !1);
    }, o.prototype.once = function (t, e, n) {
      return r(this, t, e, n, !0);
    }, o.prototype.removeListener = function (t, e, n, r) {
      var o = a ? a + t : t;if (!this._events[o]) return this;if (!e) return i(this, o), this;var s = this._events[o];if (s.fn) s.fn !== e || r && !s.once || n && s.context !== n || i(this, o);else {
        for (var u = 0, c = [], l = s.length; u < l; u++) (s[u].fn !== e || r && !s[u].once || n && s[u].context !== n) && c.push(s[u]);c.length ? this._events[o] = 1 === c.length ? c[0] : c : i(this, o);
      }return this;
    }, o.prototype.removeAllListeners = function (t) {
      var n;return t ? (n = a ? a + t : t, this._events[n] && i(this, n)) : (this._events = new e(), this._eventsCount = 0), this;
    }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = a, o.EventEmitter = o, t.exports = o;
  }),
      Tr = function t() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        n = e.url,
        r = e.method,
        i = void 0 === r ? "GET" : r,
        o = e.type,
        s = void 0 === o ? "arraybuffer" : o,
        a = e.timeout,
        u = void 0 === a ? 1e4 : a,
        c = e.data,
        l = void 0 === c ? {} : c,
        f = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};return rt(this, t), new xr(function (t, e) {
      var r = new window.XMLHttpRequest(),
          o = i.toUpperCase(),
          a = [];s && (r.responseType = s), u && (r.timeout = u);for (var c in l) a.push("k=" + l[c]);if (r.onload = function () {
        200 === r.status || 206 === r.status ? t({ context: f, res: r }) : e(new Error({ context: f, res: r, type: "error" }));
      }, r.onerror = function (t) {
        e(new Error({ context: f, res: r, type: "error" }));
      }, r.ontimeout = function (t) {
        e(new Error({ context: f, res: r, type: "error" }));
      }, r.onabort = function () {
        e(new Error({ context: f, res: r, type: "error" }));
      }, "GET" === o) r.open(o, "" + n), r.send();else {
        if ("post" !== o) throw new Error("xhr " + o + " is not supported");r.open(o, n), r.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), r.send(a.join("&"));
      }
    });
  },
      Sr = /^WEBVTT/,
      Or = /^STYLE+$/,
      Er = /^\:\:cue/,
      Pr = /^}+$/,
      jr = /^\[Script Info\].*/,
      Mr = [/[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}-->[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}/, /[0-9]{2}:[0-9]{2}\.[0-9]{3}-->[0-9]{2}:[0-9]{2}\.[0-9]{3}/, /[0-9]{2}\.[0-9]{3}-->[0-9]{2}\.[0-9]{3}/],
      Ar = /^Format:\s/,
      Cr = /^Style:\s/,
      Rr = /^Dialogue:\s/,
      Nr = function () {
    function t() {
      rt(this, t);
    }return Qe(t, null, [{ key: "parseJson", value: function (t) {
        for (var e = [], n = 0, r = 0; r < t.length; r++) {
          if (n >= 50 && (n = 0), 0 === n) {
            var i = { start: t[r].start, list: [t[r]], end: t[r].end };e.push(i);
          } else e[e.length - 1].list.push(t[r]), e[e.length - 1].end = t[r].end;n++;
        }return e;
      } }, { key: "parse", value: function (e, n) {
        var r = t.checkFormat(e);r || n({ format: r });try {
          var i = [];"ass" === r ? i = t.parseASS(e) : "vtt" === r && (i = t.parseVTT(e)), n({ format: r, list: i.list, styles: i.styles });
        } catch (t) {
          console.error(t), n({ format: r }, t);
        }
      } }, { key: "parseASSItem", value: function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
            n = t.split(","),
            i = {},
            s = "";try {
          var a = n.length - e.length;return s = a > 0 ? n.splice(e.length - 1, a + 1).join(",") + "" : n[n.length - 1] + "", s = s.replace(/\\n+/g, ""), s = o(s), n[e.length - 1] = s, e.map(function (t, e) {
            "end" === t || "start" === t ? i[t] = r(n[e].split(":")) : "text" === t ? i[t] = [n[e]] : "layer" === t ? (i[t] = [n[e]], i.textTag = [n[e]]) : i[t] = "style" === t ? [n[e]] : Number(n[e]) ? Number(n[e]) : n[e];
          }), i;
        } catch (t) {
          return console.error(t), {};
        }
      } }, { key: "parseASS", value: function (e) {
        for (var n = e.split("\n"), r = [], i = 0, o = 0, s = [], a = [], u = null; i < n.length;) {
          if (Ar.test(n[i])) a = (a = n[i].replace(Ar, "").replace(/\s+/g, "").split(",")).map(function (t) {
            return t.toLocaleLowerCase();
          });else if (Cr.test(n[i])) s.push(n[i].replace(Cr, "").replace(/\s+/g, ""));else if (Rr.test(n[i])) {
            var c = t.parseASSItem(n[i].replace(Rr, ""), a);if (u && c.start === u.start && c.end === u.end) try {
              var l = u,
                  f = l.text,
                  h = l.textTag,
                  d = l.style;f.push(c.text[0]), h.push(c.textTag[0]), d.push(c.style[0]);
            } catch (t) {
              console.error(t);
            } else {
              u = c;var p = null;o % 50 == 0 ? ((p = { start: u.start, end: u.end, list: [] }).list.push(u), r.push(p)) : ((p = r[r.length - 1]).end = u.end, p.list.push(u)), o++;
            }
          }i++;
        }return { list: r, style: {} };
      } }, { key: "parseVTTStyle", value: function (t, e) {
        var n = t.split(":");if (n.length > 1) {
          var r = n[0].trim().split("-"),
              i = "";r.length > 1 ? r.map(function (t, e) {
            i += 0 === e ? t : t.charAt(0).toUpperCase() + t.slice(1);
          }) : i = r[0], e[i] = n[1].trim().replace(/;$/, "");
        }return e;
      } }, { key: "parseVTT", value: function (t) {
        for (var e = (t = t.replace(Sr, "")).split("\n"), n = [], r = 0, o = 0, a = null, u = !1, c = !1, l = null, f = null, h = []; r < e.length;) {
          var d = s(r, e).trim();if (!d || u && i(d)) u = !d;else if (Er.test(d) && Or.test(s(r - 1, e).trim())) {
            c = !0;var p = /\((.+?)\)/g.exec(d);f = p ? p[1] : "", l = "";
          } else if (c) Pr.test(d) ? (h.push({ key: f, style: l }), l = null, f = null, c = !1) : l += d;else if (d) {
            u = !1;var v = this.checkIsTime(e[r]);if (v) {
              var y = this.parseVttTime(v);if (!a || y.start !== a.start || y.end !== a.end) {
                (a = y).text = [], a.textTag = [];var g = null;o % 50 == 0 ? ((g = { start: a.start, end: a.end, list: [] }).list.push(a), n.push(g)) : ((g = n[n.length - 1]).end = a.end, g.list.push(a)), o++;
              }
            } else if (a) {
              var m = a,
                  _ = m.text,
                  x = m.textTag,
                  b = this.parseVttText(e[r]);_.push(b.text), x.push(b.tag);
            }u = !1;
          }r++;
        }return { list: n, styles: h };
      } }, { key: "checkIsTime", value: function (t) {
        t = t.replace(/\s+/g, "");for (var e = 0, n = null; e < Mr.length && !(n = Mr[e].exec(t));) e++;return n ? n[0] : null;
      } }, { key: "parseVttText", value: function (t) {
        var e = /^(<?.+?>)/g.exec(t),
            n = "",
            r = "default";if (e) {
          r = e[0].replace(/\<|\>|\&/g, "");var i = RegExp("^<" + r + ">(([\\s\\S])*?)</" + r + ">$").exec(t);i ? n = i[1] : (n = t, r = "");
        } else n = t;for (var s = /<(\w+).(\w+)>/g, a = s.exec(n); a && a.length > 2;) n = n.replace(a[0], "<" + a[1] + ' class="' + a[2] + '">'), a = s.exec(n);return { tag: r, text: o(n.replace(/\\n+/g, "<br/>")) };
      } }, { key: "parseVttTime", value: function (t) {
        var e = t.split("--\x3e"),
            n = void 0,
            i = 0;if (2 === e.length) {
          var o = e[0].split(":"),
              s = e[1].split(":");n = r(o), i = r(s);
        }return { start: n, end: i, time: t };
      } }, { key: "isVTT", value: function (t) {
        return Sr.test(t);
      } }, { key: "isASS", value: function (t) {
        return jr.test(t);
      } }, { key: "checkFormat", value: function (t) {
        return t ? Sr.test(t) ? "vtt" : jr.test(t) ? "ass" : null : null;
      } }]), t;
  }(),
      Lr = function () {
    function t() {
      var e = this;rt(this, t), this.__handlers = [], window.ResizeObserver && (this.observer = new window.ResizeObserver(function (t) {
        e.__trigger(t);
      }));
    }return Qe(t, [{ key: "addObserver", value: function (t, e) {
        if (this.observer) {
          this.observer && this.observer.observe(t);for (var n = this.__handlers, r = -1, i = 0; i < n.length; i++) n[i] && t === n[i].target && (r = i);r > -1 ? this.__handlers[r].handler.push(e) : this.__handlers.push({ target: t, handler: [e] });
        }
      } }, { key: "unObserver", value: function (t) {
        var e = -1;this.__handlers.map(function (n, r) {
          t === n.target && (e = r);
        }), this.observer && this.observer.unobserve(t), e > -1 && this.__handlers.splice(e, 1);
      } }, { key: "destroyObserver", value: function () {
        this.observer && this.observer.disconnect(), this.observer = null, this.__handlers = null;
      } }, { key: "__runHandler", value: function (t, e) {
        for (var n = this.__handlers, r = 0; r < n.length; r++) if (n[r] && t === n[r].target) {
          n[r].handler && n[r].handler.map(function (n) {
            try {
              n(t, e);
            } catch (t) {
              console.error(t);
            }
          });break;
        }
      } }, { key: "__trigger", value: function (t) {
        var e = this;t.map(function (t) {
          var n = t.contentRect;e.__runHandler(t.target, n);
        });
      } }]), t;
  }(),
      Ir = null;!function (t, e) {
    void 0 === e && (e = {});var n = e.insertAt;if (t && "undefined" != typeof document) {
      var r = document.head || document.getElementsByTagName("head")[0],
          i = document.createElement("style");i.type = "text/css", "top" === n && r.firstChild ? r.insertBefore(i, r.firstChild) : r.appendChild(i), i.styleSheet ? i.styleSheet.cssText = t : i.appendChild(document.createTextNode(t));
    }
  }('xg-text-track.xg-text-track {\n  font-family: "PingFang SC","SF Pro SC","SF Pro Text","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif;\n  -webkit-font-smoothing: antialiased;\n  position: absolute;\n  bottom: 0;\n  color: #fff;\n  left: 0;\n  right: 0;\n  pointer-events: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n  xg-text-track.xg-text-track.text-track-no-fitvideo {\n    margin-bottom: 2%; }\n  xg-text-track.xg-text-track.text-track-hide {\n    opacity: 0;\n    visibility: hidden; }\n  xg-text-track.xg-text-track.text-track-show {\n    opacity: 1;\n    visibility: visible; }\n  xg-text-track.xg-text-track xg-text-track-inner {\n    display: block;\n    max-width: 92%; }\n  xg-text-track.xg-text-track xg-text-track-span {\n    display: -webkit-box;\n    text-align: center;\n    text-overflow: ellipsis;\n    -webkit-box-orient: vertical;\n    overflow: hidden;\n    padding: 1px 4px;\n    -webkit-line-clamp: 1;\n    line-height: 120%;\n    word-break: break-word; }\n    xg-text-track.xg-text-track xg-text-track-span.text-track-deputy {\n      font-size: 75%; }\n    xg-text-track.xg-text-track xg-text-track-span.text-track-single {\n      -webkit-line-clamp: 1; }\n    xg-text-track.xg-text-track xg-text-track-span.text-track-double {\n      -webkit-line-clamp: 2; }\n    xg-text-track.xg-text-track xg-text-track-span.text-track-three {\n      -webkit-line-clamp: 3; }\n  xg-text-track.xg-text-track.text-track-bg xg-text-track-inner {\n    background-color: rgba(0, 0, 0, .54);\n    border-radius: 2px; }\n  xg-text-track.xg-text-track.text-track-stroke xg-text-track-inner {\n    background-color: none;\n    border-radius: 0;\n    text-shadow: -1px 1px 0 rgba(0, 0, 0, .7), 1px 1px 0 rgba(0, 0, 0, .7), 1px -1px 0 rgba(0, 0, 0, .7), -1px -1px 0 rgba(0, 0, 0, .7); }\n');var Fr = [{ code: 0, msg: "SUCCESS" }, { code: 1, msg: "LOAD_ERROR" }, { code: 2, msg: "PARSER_ERROR" }, { code: 3, msg: "FORMAT_NOT_SUPPORTED" }, { code: 4, msg: "ID_OR_LANGUAGE_NOT_EXIST" }, { code: 5, msg: "PARAMETERS_ERROR" }, { code: 6, msg: "ABORT" }, { code: 7, msg: "UNKNOWN" }, { code: 8, msg: "DATA_ERROR:subtitle.url is null" }],
      zr = { RESIZE: "resize" },
      Br = !1;return function (t) {
    function e(t) {
      rt(this, e);var n = Ye(this, (e.__proto__ || nt(e)).call(this));return Br = p(), n.currentText = null, n.textTrack = [], n._cid = -1, n._gid = -1, n._cids = [], n._iId = null, n._iC = 0, n.player = null, n.root = null, n.config = { line: "double", bottom: 0, mode: "stroke", defaultOpen: !1, baseSizeX: 49, baseSizeY: 28, minSize: 16, minMobileSize: 13, fitVideo: !0, offsetBottom: 2, fontColor: "#fff" }, n._ctime = 0, n._loadingTrack = {}, kr(n.config).map(function (e) {
        void 0 !== t[e] && null !== t[e] && (n.config[e] = t[e]);
      }), n._isOpen = !1, n._videoMeta = { scale: 0, videoHeight: 0, videoWidth: 0, lwidth: 0, lheight: 0, vWidth: 0, vHeight: 0, vBottom: 0, vLeft: 0, marginBottom: 0 }, t.subTitles && "Array" === h(t.subTitles) ? (t.player && n.attachPlayer(t.player), n.setSubTitles(t.subTitles, n.config.defaultOpen), n) : Ye(n);
    }return fn(e, t), Qe(e, [{ key: "version", get: function () {
        return "1.0.12";
      } }]), Qe(e, [{ key: "setSubTitles", value: function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
            e = this,
            n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            r = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
            i = this._isOpen || n;r && this.innerRoot && this.switchOff(), this.currentText = null, this.textTrack = [], t.map(function (t) {
          var n = {};kr(t).map(function (e) {
            n[e] = t[e];
          }), n.isDefault && (e.currentText = n), e.textTrack.push(n);
        }), this.currentText && x(this.currentText).then(function (t) {
          e.addStyles(t), i && e.switch();
        });
      } }, { key: "addStyles", value: function (t) {
        var e = t.styles,
            n = t.format;e && "vtt" === n && (e.map(function (t) {
          t.key || (t.key = "xg-text-track-span");
        }), v(e, "xg-text-track"));
      } }, { key: "attachPlayer", value: function (t) {
        var e = this;if (t) {
          this.player && this.detachPlayer();var n = this.config,
              r = n.fontColor,
              i = n.mode,
              o = n.fitVideo;this.player = t, this.root = document.createElement("xg-text-track"), this.root.className = "xg-text-track", !this._isOpen && u(this.root, "text-track-hide"), !o && u(this.root, "text-track-no-fitvideo"), i && u(this.root, "text-track-" + i), this.innerRoot = document.createElement("xg-text-track-inner"), this.root.appendChild(this.innerRoot), r && (this.root.style.color = r), this.currentText && ["language", "id", "label"].map(function (t) {
            e.root.setAttribute("data-" + t, e.currentText[t] || "");
          }), this.player.root.appendChild(this.root), ["destroy", "__onTimeupdate", "_onResize"].map(function (t) {
            e[t] = e[t].bind(e);
          }), this.player.on("destroy", this.destroy), this.player.on("timeupdate", this.__onTimeupdate), this._isOpen && this.switch(), y(t.root, this._onResize);
        }
      } }, { key: "detachPlayer", value: function () {
        var t = this.player;t && (t.off("destroy", this.destroy), t.off("timeupdate", this.__onTimeupdate), t.root && (g(t.root, this._onResize), t.root.removeChild(this.root)), this.innerRoot = null, this.root = null, this.player = null);
      } }, { key: "switch", value: function () {
        var t = this,
            e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : { id: "", language: "" };return this._loadingTrack = e, new xr(function (n, r) {
          if (!e.id && !e.language) {
            if (t.currentText) {
              t._loadingTrack = {}, t._updateCurrent(t.currentText), t._isOpen = !0, t.show();var i = m(0, { message: "switch default subtitle success" });return void n(i);
            }var o = m(5, { message: "no default subtitle" });return void r(o);
          }if (t.currentText && b(e, t.currentText)) t._loadingTrack = {}, t._updateCurrent(t.currentText), t._isOpen = !0, t.show(), n(m(0));else {
            for (var s = null, a = 0; a < t.textTrack.length; a++) if (b(e, t.textTrack[a])) {
              s = t.textTrack[a];break;
            }if (s) s.list ? (t._loadingTrack = {}, t._updateCurrent(s), t._isOpen = !0, t.show(), n(m(0))) : x(s).then(function (e) {
              if (t.addStyles(e), t._loadingTrack.id === s.id || t._loadingTrack.language === e.language) t._loadingTrack = {}, t._updateCurrent(e), t._isOpen = !0, t.show(), n(m(0));else {
                var i = m(6, { message: "check _loadingTrack fail id: " + t._loadingTrack.id + "  nextSubtitle:" + e.id });console.trace(i), r(i);
              }
            }).catch(function (t) {
              r(t);
            });else {
              var u = m(4, new Error("The is no subtitle with id:[{" + e.id + "}] or language:[" + e.language + "]"));console.trace(u), r(u);
            }
          }
        });
      } }, { key: "switchOff", value: function () {
        this._isOpen = !1, this.hide();
      } }, { key: "_updateCurrent", value: function (t) {
        var e = this;if (this.root) {
          this.currentText = t, ["language", "id", "label"].map(function (t) {
            e.root.setAttribute("data-" + t, e.currentText[t] || "");
          }), this.__remove(this._cids);var n = this.player.currentTime;this._cids = [], this._gid = -1, this._cid = -1, this._update(n);
        }
      } }, { key: "__loadAll", value: function () {
        this.textTrack.map(function (t) {
          x(t);
        });
      } }, { key: "getDelCid", value: function (t, e) {
        for (var n = [], r = 0; r < t.length; r++) e.includes(t[r]) || n.push(t[r]);return n;
      } }, { key: "getNewCid", value: function (t, e) {
        for (var n = [], r = 0; r < e.length; r++) t.includes(e[r]) || n.push(e[r]);return n;
      } }, { key: "_update", value: function (t) {
        var e = this,
            n = l(t, this.currentText.list, this._gid),
            r = [];if (n > -1 && (r = f(t, this.currentText.list[n].list, this._cid)), r.length < 1) return this._cids.length > 0 && this.__remove(this._cids), void (this._cids = []);if (this._cids !== r || n !== this._gid) {
          this._gid = n, this._cid = r[0];var i = this.getDelCid(this._cids, r),
              o = this.getNewCid(this._cids, r);this._cids = r, this.__remove(i);var s = [];o.map(function (t) {
            var r = e.currentText.list[n].list[t];r.index = t, s.push(r);
          }), this.__render(s, t);
        }
      } }, { key: "__onTimeupdate", value: function () {
        if (this._isOpen) {
          var t = this.player.video,
              e = t.videoWidth,
              n = t.videoHeight;!this._videoMeta.scale && e && n && this._onResize(this.player.root);var r = this.player.currentTime;Math.round(Math.abs(1e3 * r - this._ctime)) < 200 || (this._ctime = 1e3 * r, this.currentText && this.currentText.list && this._update(r));
        }
      } }, { key: "_onResize", value: function (t) {
        var e = this._videoMeta;if (t && t instanceof window.Element || (t = this.player.root), this._iId && (clearTimeout(this._iId), this._iId = null), !e.scale) {
          if (!this.player.video) return;var n = this.player.video,
              r = n.videoWidth,
              i = n.videoHeight;if (!r || !i) return;e.videoWidth = r, e.videoHeight = i, e.scale = parseInt(i / r * 100, 10);
        }this.__startResize(t);
      } }, { key: "resize", value: function (t, e) {
        var n = this,
            r = this.config,
            i = r.baseSizeX,
            o = r.baseSizeY,
            s = r.minMobileSize,
            a = r.minSize,
            u = r.fitVideo,
            c = r.offsetBottom,
            l = this._videoMeta.scale;this._videoMeta.lwidth = t, this._videoMeta.lheight = e;var f = void 0,
            h = 0;e / t * 100 >= l ? (h = parseInt(l * t, 10) / 100, f = t) : (h = e, f = parseInt(e / l * 100, 10)), this._videoMeta.vWidth = f, this._videoMeta.vHeight = h;var d = 0,
            p = 0;l > 120 ? (d = o, p = parseInt(d * h / 1080, 10)) : (d = i, p = parseInt(d * f / 1920, 10));var v = Br ? s : a,
            y = { fontSize: p = p < v ? v : p > d ? d : p },
            g = parseInt((e - h) / 2, 10),
            m = parseInt((t - f) / 2, 10),
            _ = parseInt(h * c, 10) / 100;this._videoMeta.vBottom = g, this._videoMeta.vLeft = m, this._videoMeta.marginBottom = _, u && (y.bottom = g + _, y.left = y.right = m), kr(y).map(function (t) {
          n.root.style[t] = y[t] + "px";
        }), this.emit(zr.RESIZE, { vLeft: m, vBottom: g, marginBottom: _, vWidth: f, vHeight: h, fontSize: p, scale: l });
      } }, { key: "__startResize", value: function (t) {
        var e = this,
            n = t.getBoundingClientRect(),
            r = this._videoMeta,
            i = n.width,
            o = n.height;if (this._iId && (clearTimeout(this._iId), this._iId = null), i > 0 && o > 0 && (i !== r.lwidth || o !== r.lheight)) this._iC = 0, this.resize(i, o);else {
          if (this._iC >= 5) return void (this._iC = 0);this._iC++, this._iId = setTimeout(function () {
            e.__startResize(t);
          }, 50);
        }
      } }, { key: "__remove", value: function (t) {
        var e = this;if (t && !(t.length < 1)) {
          for (var n = this.innerRoot.children, r = [], i = 0; i < n.length; i++) {
            var o = Number(n[i].getAttribute("data-index"));t.includes(o) && r.push(n[i]);
          }r.map(function (t) {
            e.innerRoot.removeChild(t);
          });
        }
      } }, { key: "__render", value: function () {
        var t = this,
            e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];e.length > 0 && e.map(function (e) {
          var n = "text-track-" + t.config.line;e.text.map(function (r, i) {
            i > 0 && (n += " text-track-deputy");var o = { "data-start": e.start, "data-end": e.end, "data-index": e.index };t.innerRoot.appendChild(d("xg-text-track-span", r, o, n));
          });
        });
      } }, { key: "show", value: function () {
        c(this.root, "text-track-hide");
      } }, { key: "hide", value: function () {
        u(this.root, "text-track-hide"), this.innerRoot.innerHTML = "";
      } }, { key: "destroy", value: function () {
        this.detachPlayer(), this.removeAllListeners(), this.player = null, this.textTrack = null;
      } }, { key: "marginBottom", get: function () {
        var t = this._videoMeta,
            e = t.bottom,
            n = t.marginBottom;return this.config.fitVideo ? e + n : n;
      } }]), e;
  }(wr);
});
//# sourceMappingURL=index.min.js.map

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _player = __webpack_require__(9);

var _player2 = _interopRequireDefault(_player);

var _i18n = __webpack_require__(10);

var _i18n2 = _interopRequireDefault(_i18n);

var _enter = __webpack_require__(108);

var _enter2 = _interopRequireDefault(_enter);

var _play = __webpack_require__(48);

var _play2 = _interopRequireDefault(_play);

var _start = __webpack_require__(40);

var _start2 = _interopRequireDefault(_start);

var _poster = __webpack_require__(53);

var _poster2 = _interopRequireDefault(_poster);

var _flex = __webpack_require__(56);

var _flex2 = _interopRequireDefault(_flex);

var _fullscreen = __webpack_require__(59);

var _fullscreen2 = _interopRequireDefault(_fullscreen);

var _cssFullscreen = __webpack_require__(111);

var _cssFullscreen2 = _interopRequireDefault(_cssFullscreen);

var _volume = __webpack_require__(116);

var _volume2 = _interopRequireDefault(_volume);

var _definition = __webpack_require__(122);

var _definition2 = _interopRequireDefault(_definition);

var _loading = __webpack_require__(64);

var _loading2 = _interopRequireDefault(_loading);

var _progress = __webpack_require__(68);

var _progress2 = _interopRequireDefault(_progress);

var _time = __webpack_require__(71);

var _time2 = _interopRequireDefault(_time);

var _replay = __webpack_require__(74);

var _replay2 = _interopRequireDefault(_replay);

var _playbackRate = __webpack_require__(125);

var _playbackRate2 = _interopRequireDefault(_playbackRate);

var _localPreview = __webpack_require__(128);

var _localPreview2 = _interopRequireDefault(_localPreview);

var _download = __webpack_require__(129);

var _download2 = _interopRequireDefault(_download);

var _danmu = __webpack_require__(133);

var _danmu2 = _interopRequireDefault(_danmu);

var _pip = __webpack_require__(139);

var _pip2 = _interopRequireDefault(_pip);

var _miniplayer = __webpack_require__(142);

var _miniplayer2 = _interopRequireDefault(_miniplayer);

var _playNext = __webpack_require__(145);

var _playNext2 = _interopRequireDefault(_playNext);

var _rotate = __webpack_require__(149);

var _rotate2 = _interopRequireDefault(_rotate);

var _reload = __webpack_require__(153);

var _reload2 = _interopRequireDefault(_reload);

var _screenShot = __webpack_require__(157);

var _screenShot2 = _interopRequireDefault(_screenShot);

var _nativeTextTrack = __webpack_require__(160);

var _nativeTextTrack2 = _interopRequireDefault(_nativeTextTrack);

var _textTrack = __webpack_require__(162);

var _textTrack2 = _interopRequireDefault(_textTrack);

var _error = __webpack_require__(163);

var _error2 = _interopRequireDefault(_error);

var _memoryPlay = __webpack_require__(166);

var _memoryPlay2 = _interopRequireDefault(_memoryPlay);

var _airplay = __webpack_require__(169);

var _airplay2 = _interopRequireDefault(_airplay);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_player2.default.installAll([_i18n2.default, _enter2.default, _play2.default, _start2.default, _poster2.default, _flex2.default, _fullscreen2.default, _cssFullscreen2.default, _volume2.default, _definition2.default, _loading2.default, _progress2.default, _time2.default, _replay2.default, _playbackRate2.default, _localPreview2.default, _download2.default, _danmu2.default, _pip2.default, _miniplayer2.default, _playNext2.default, _rotate2.default, _reload2.default, _screenShot2.default, _nativeTextTrack2.default, _textTrack2.default, _error2.default, _memoryPlay2.default, _airplay2.default]);

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

__webpack_require__(109);

var s_enter = function s_enter() {
  var player = this;
  var root = player.root;

  var barStr = '';
  for (var i = 1; i <= 12; i++) {
    barStr += '<div class="xgplayer-enter-bar' + i + '"></div>';
  }
  var enter = (0, _util.createDom)('xg-enter', '<div class="xgplayer-enter-spinner">\n                                                  ' + barStr + '\n                                                </div>', {}, 'xgplayer-enter');
  root.appendChild(enter);
};

exports.default = {
  name: 's_enter',
  method: s_enter
};
module.exports = exports['default'];

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(110);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".xgplayer-skin-default .xgplayer-enter{display:none;position:absolute;left:0;top:0;width:100%;height:100%;background:#000;z-index:120}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner{display:block;position:absolute;left:50%;top:50%;height:100px;width:100px;position:relative;-webkit-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div{width:12%;height:26%;background-color:hsla(0,0%,100%,.7);position:absolute;left:44%;top:37%;opacity:0;border-radius:30px;-webkit-animation:fade 1s linear infinite;animation:fade 1s linear infinite}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar1{-webkit-transform:rotate(0deg) translateY(-142%);-ms-transform:rotate(0deg) translateY(-142%);transform:rotate(0deg) translateY(-142%);-webkit-animation-delay:0s;animation-delay:0s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar2{-webkit-transform:rotate(30deg) translateY(-142%);-ms-transform:rotate(30deg) translateY(-142%);transform:rotate(30deg) translateY(-142%);-webkit-animation-delay:-.9163s;animation-delay:-.9163s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar3{-webkit-transform:rotate(60deg) translateY(-142%);-ms-transform:rotate(60deg) translateY(-142%);transform:rotate(60deg) translateY(-142%);-webkit-animation-delay:-.833s;animation-delay:-.833s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar4{-webkit-transform:rotate(90deg) translateY(-142%);-ms-transform:rotate(90deg) translateY(-142%);transform:rotate(90deg) translateY(-142%);-webkit-animation-delay:-.7497s;animation-delay:-.7497s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar5{-webkit-transform:rotate(120deg) translateY(-142%);-ms-transform:rotate(120deg) translateY(-142%);transform:rotate(120deg) translateY(-142%);-webkit-animation-delay:-.6664s;animation-delay:-.6664s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar6{-webkit-transform:rotate(150deg) translateY(-142%);-ms-transform:rotate(150deg) translateY(-142%);transform:rotate(150deg) translateY(-142%);-webkit-animation-delay:-.5831s;animation-delay:-.5831s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar7{-webkit-transform:rotate(180deg) translateY(-142%);-ms-transform:rotate(180deg) translateY(-142%);transform:rotate(180deg) translateY(-142%);-webkit-animation-delay:-.4998s;animation-delay:-.4998s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar8{-webkit-transform:rotate(210deg) translateY(-142%);-ms-transform:rotate(210deg) translateY(-142%);transform:rotate(210deg) translateY(-142%);-webkit-animation-delay:-.4165s;animation-delay:-.4165s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar9{-webkit-transform:rotate(240deg) translateY(-142%);-ms-transform:rotate(240deg) translateY(-142%);transform:rotate(240deg) translateY(-142%);-webkit-animation-delay:-.3332s;animation-delay:-.3332s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar10{-webkit-transform:rotate(270deg) translateY(-142%);-ms-transform:rotate(270deg) translateY(-142%);transform:rotate(270deg) translateY(-142%);-webkit-animation-delay:-.2499s;animation-delay:-.2499s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar11{-webkit-transform:rotate(300deg) translateY(-142%);-ms-transform:rotate(300deg) translateY(-142%);transform:rotate(300deg) translateY(-142%);-webkit-animation-delay:-.1666s;animation-delay:-.1666s}.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner div.xgplayer-enter-bar12{-webkit-transform:rotate(330deg) translateY(-142%);-ms-transform:rotate(330deg) translateY(-142%);transform:rotate(330deg) translateY(-142%);-webkit-animation-delay:-.0833s;animation-delay:-.0833s}@-webkit-keyframes fade{0%{opacity:1}to{opacity:.25}}@keyframes fade{0%{opacity:1}to{opacity:.25}}.xgplayer-skin-default.xgplayer-is-enter .xgplayer-enter{display:block}", ""]);

// exports


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var _requestCssFull = __webpack_require__(112);

var _requestCssFull2 = _interopRequireDefault(_requestCssFull);

var _exitCssFull = __webpack_require__(113);

var _exitCssFull2 = _interopRequireDefault(_exitCssFull);

__webpack_require__(114);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var s_cssFullscreen = function s_cssFullscreen() {
  var player = this;
  if (!player.config.cssFullscreen) {
    return;
  }
  var btn = (0, _util.createDom)('xg-cssfullscreen', '<xg-icon class="xgplayer-icon">\n                                             <div class="xgplayer-icon-requestfull">' + _requestCssFull2.default + '</div>\n                                             <div class="xgplayer-icon-exitfull">' + _exitCssFull2.default + '</div>\n                                           </xg-icon>', {}, 'xgplayer-cssfullscreen');

  var tipsText = {};
  tipsText.requestfull = player.lang.CSSFULLSCREEN_TIPS;
  tipsText.exitfull = player.lang.EXITCSSFULLSCREEN_TIPS;
  var tips = (0, _util.createDom)('xg-tips', '<span class="xgplayer-tip-requestfull">' + tipsText.requestfull + '</span>\n                                        <span class="xgplayer-tip-exitfull">' + tipsText.exitfull + '</span>', {}, 'xgplayer-tips');
  btn.appendChild(tips);
  player.once('ready', function () {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.userGestureTrigEvent('cssFullscreenBtnClick');
    });
  });
};

exports.default = {
  name: 's_cssFullscreen',
  method: s_cssFullscreen
};
module.exports = exports['default'];

/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\">\n  <path transform=\"scale(0.028 0.028)\" d=\"M843.617212 67.898413 175.411567 67.898413c-61.502749 0-111.367437 49.856501-111.367437 111.367437l0 668.205645c0 61.510936 49.864688 111.367437 111.367437 111.367437L843.617212 958.838931c61.510936 0 111.367437-49.856501 111.367437-111.367437L954.984648 179.26585C954.984648 117.754914 905.12917 67.898413 843.617212 67.898413zM398.146441 736.104057c15.380292 0 27.842115 12.461823 27.842115 27.842115 0 15.379269-12.461823 27.841092-27.842115 27.841092L259.725858 791.787264c-7.785314 0-14.781658-3.217275-19.838837-8.365528-5.383614-4.577249-8.791224-11.228739-8.791224-19.475564L231.095797 624.736621c0-15.371082 12.471033-27.842115 27.842115-27.842115 15.380292 0 27.842115 12.471033 27.842115 27.842115l-0.61603 71.426773 133.036969-133.037992 39.378869 39.378869L324.962651 736.113267 398.146441 736.104057zM419.199942 463.611943 286.162974 330.565764l0.61603 71.435982c0 15.380292-12.461823 27.842115-27.842115 27.842115-15.371082 0-27.842115-12.461823-27.842115-27.842115L231.094774 262.791172c0-8.256034 3.40761-14.908548 8.791224-19.476587 5.057179-5.148253 12.053524-8.374738 19.838837-8.374738l138.420583 0.00921c15.380292 0 27.842115 12.461823 27.842115 27.842115s-12.461823 27.842115-27.842115 27.842115l-73.175603-0.00921 133.607974 133.607974L419.199942 463.611943zM787.932981 763.946172c0 8.247848-3.40761 14.899338-8.791224 19.475564-5.057179 5.148253-12.053524 8.365528-19.839861 8.365528L620.881314 791.787264c-15.379269 0-27.841092-12.461823-27.841092-27.841092 0-15.380292 12.461823-27.842115 27.841092-27.842115l73.185836 0.00921L560.449967 602.50427l39.378869-39.378869L732.875015 696.163393l-0.62524-71.426773c0-15.371082 12.462846-27.842115 27.842115-27.842115 15.380292 0 27.842115 12.471033 27.842115 27.842115L787.934005 763.946172zM787.932981 402.000724c0 15.380292-12.461823 27.842115-27.842115 27.842115-15.379269 0-27.842115-12.461823-27.842115-27.842115l0.62524-71.435982L599.828836 463.611943l-39.378869-39.378869 133.617184-133.607974-73.185836 0.00921c-15.379269 0-27.841092-12.461823-27.841092-27.842115s12.461823-27.842115 27.841092-27.842115l138.421606-0.00921c7.785314 0 14.781658 3.226484 19.839861 8.374738 5.383614 4.568039 8.791224 11.219529 8.791224 19.476587L787.934005 402.000724z\"></path>\n</svg>\n");

/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\">\n  <path transform=\"scale(0.028 0.028)\" d=\"M834.56 81.92H189.44c-59.392 0-107.52 48.128-107.52 107.52v645.12c0 59.392 48.128 107.52 107.52 107.52h645.12c59.392 0 107.52-48.128 107.52-107.52V189.44c0-59.392-48.128-107.52-107.52-107.52zM458.24 727.04c0 14.848-12.288 26.624-26.624 26.624S404.48 741.888 404.48 727.04v-69.632L289.28 773.12c-10.752 10.24-27.648 10.24-37.888 0-10.24-10.752-10.24-27.648 0-37.888L366.592 619.52H296.96c-14.848 0-26.624-12.288-26.624-26.624s12.288-26.624 26.624-26.624h134.144c14.848 0 26.624 12.288 26.624 26.624V727.04z m0-295.936c0 14.848-12.288 26.624-26.624 26.624H296.96c-14.848 0-26.624-12.288-26.624-26.624S282.112 404.48 296.96 404.48h69.632L251.392 289.28c-10.24-10.752-10.24-27.648 0-37.888 5.12-5.12 12.288-7.68 18.944-7.68 6.656 0 13.824 2.56 18.944 7.68L404.48 366.592V296.96c0-14.848 12.288-26.624 26.624-26.624s26.624 12.288 26.624 26.624v134.144zM773.12 773.12c-10.752 10.24-27.648 10.24-37.888 0L619.52 657.408V727.04c0 14.848-12.288 26.624-26.624 26.624s-26.624-11.776-26.624-26.624v-134.144c0-14.848 12.288-26.624 26.624-26.624H727.04c14.848 0 26.624 12.288 26.624 26.624s-12.288 26.624-26.624 26.624h-69.632l115.2 115.2c10.752 10.752 10.752 27.648 0.512 38.4z m0-483.84L657.408 404.48H727.04c14.848 0 26.624 12.288 26.624 26.624 0 14.848-12.288 26.624-26.624 26.624h-134.144c-14.848 0-26.624-12.288-26.624-26.624V296.96c0-14.848 12.288-26.624 26.624-26.624s26.624 12.288 26.624 26.624v69.632L734.72 250.88c5.12-5.12 12.288-7.68 18.944-7.68s13.824 2.56 18.944 7.68c10.752 10.752 10.752 27.648 0.512 38.4z\"></path>\n</svg>\n");

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(115);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".xgplayer-skin-default .xgplayer-cssfullscreen,.xgplayer-skin-default .xgplayer-cssfullscreen-img{position:relative;-webkit-order:12;-moz-box-ordinal-group:13;order:12;display:block;cursor:pointer}.xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-icon,.xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-icon{width:32px;margin-top:5px}.xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-icon div,.xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-icon div{position:absolute}.xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-icon .xgplayer-icon-requestfull,.xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-icon .xgplayer-icon-requestfull{display:block}.xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-icon .xgplayer-icon-exitfull,.xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-icon .xgplayer-icon-exitfull{display:none}.xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-tips,.xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-tips{margin-left:-40px}.xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-tips .xgplayer-tip-requestfull,.xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-tips .xgplayer-tip-requestfull{display:block}.xgplayer-skin-default .xgplayer-cssfullscreen-img .xgplayer-tips .xgplayer-tip-exitfull,.xgplayer-skin-default .xgplayer-cssfullscreen .xgplayer-tips .xgplayer-tip-exitfull{display:none}.xgplayer-skin-default .xgplayer-cssfullscreen-img:hover,.xgplayer-skin-default .xgplayer-cssfullscreen:hover{opacity:.85}.xgplayer-skin-default .xgplayer-cssfullscreen-img:hover .xgplayer-tips,.xgplayer-skin-default .xgplayer-cssfullscreen:hover .xgplayer-tips{display:block}.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-icon .xgplayer-icon-requestfull,.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-icon .xgplayer-icon-requestfull{display:none}.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-icon .xgplayer-icon-exitfull,.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-icon .xgplayer-icon-exitfull{display:block}.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-tips,.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-tips{margin-left:-47px}.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-tips .xgplayer-tip-requestfull,.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-tips .xgplayer-tip-requestfull{display:none}.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-tips .xgplayer-tip-exitfull,.xgplayer-skin-default.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-tips .xgplayer-tip-exitfull{display:block}.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-cssfullscreen,.xgplayer-skin-default.xgplayer-is-fullscreen .xgplayer-cssfullscreen-img{display:none}.xgplayer-skin-default.xgplayer-is-cssfullscreen{position:fixed!important;left:0!important;top:0!important;width:100%!important;height:100%!important;z-index:99999!important}.xgplayer-lang-is-en .xgplayer-cssfullscreen-img .xgplayer-tips,.xgplayer-lang-is-en .xgplayer-cssfullscreen .xgplayer-tips,.xgplayer-lang-is-en.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-tips,.xgplayer-lang-is-en.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-tips{margin-left:-46px}.lang-is-jp .xgplayer-cssfullscreen-img .xgplayer-tips,.lang-is-jp .xgplayer-cssfullscreen .xgplayer-tips{margin-left:-120px}.lang-is-jp.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen-img .xgplayer-tips,.lang-is-jp.xgplayer-is-cssfullscreen .xgplayer-cssfullscreen .xgplayer-tips{margin-left:-60px}", ""]);

// exports


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var _volumeMuted = __webpack_require__(117);

var _volumeMuted2 = _interopRequireDefault(_volumeMuted);

var _volumeSmall = __webpack_require__(118);

var _volumeSmall2 = _interopRequireDefault(_volumeSmall);

var _volumeLarge = __webpack_require__(119);

var _volumeLarge2 = _interopRequireDefault(_volumeLarge);

__webpack_require__(120);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var s_volume = function s_volume() {
  var player = this;
  var container = (0, _util.createDom)('xg-volume', '<xg-icon class="xgplayer-icon">\n                                         <div class="xgplayer-icon-large">' + _volumeLarge2.default + '</div>\n                                         <div class="xgplayer-icon-small">' + _volumeSmall2.default + '</div>\n                                         <div class="xgplayer-icon-muted">' + _volumeMuted2.default + '</div>\n                                       </xg-icon>\n                                       <xg-slider class="xgplayer-slider" tabindex="2">\n                                         <xg-bar class="xgplayer-bar">\n                                           <xg-drag class="xgplayer-drag"></xg-drag>\n                                         </xg-bar>\n                                       </xg-slider>', {}, 'xgplayer-volume');
  player.once('ready', function () {
    if (player.controls) {
      player.controls.appendChild(container);
    }
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
    player.userGestureTrigEvent('volumeBarClick', e);
  });

  ['click', 'touchend'].forEach(function (item) {
    icon.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.userGestureTrigEvent('volumeIconClick');
    });
  });

  icon.addEventListener('mouseenter', function (e) {
    e.preventDefault();
    e.stopPropagation();
    player.userGestureTrigEvent('volumeIconEnter');
  });

  ['blur', 'mouseleave'].forEach(function (item) {
    container.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.userGestureTrigEvent('volumeIconLeave');
    });
  });
};

exports.default = {
  name: 's_volume',
  method: s_volume
};
module.exports = exports['default'];

/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"28\" viewBox=\"0 0 28 28\">\n  <path transform=\"scale(0.0220625 0.0220625)\" d=\"M358.4 358.4h-204.8v307.2h204.8l256 256v-819.2l-256 256z\"></path>\n  <path transform=\"scale(0.0220625 0.0220625)\" d=\"M920.4 439.808l-108.544-109.056-72.704 72.704 109.568 108.544-109.056 108.544 72.704 72.704 108.032-109.568 108.544 109.056 72.704-72.704-109.568-108.032 109.056-108.544-72.704-72.704-108.032 109.568z\"></path>\n</svg>\n");

/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"28\" viewBox=\"0 0 28 28\">\n  <path transform=\"scale(0.0220625 0.0220625)\" d=\"M358.4 358.4h-204.8v307.2h204.8l256 256v-819.2l-256 256z\"></path>\n  <path transform=\"scale(0.0220625 0.0220625)\" d=\"M795.648 693.248l-72.704-72.704c27.756-27.789 44.921-66.162 44.921-108.544s-17.165-80.755-44.922-108.546l0.002 0.002 72.704-72.704c46.713 46.235 75.639 110.363 75.639 181.248s-28.926 135.013-75.617 181.227l-0.021 0.021zM795.648 693.248l-72.704-72.704c27.756-27.789 44.921-66.162 44.921-108.544s-17.165-80.755-44.922-108.546l0.002 0.002 72.704-72.704c46.713 46.235 75.639 110.363 75.639 181.248s-28.926 135.013-75.617 181.227l-0.021 0.021z\"></path>\n</svg>\n");

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"28\" viewBox=\"0 0 28 28\">\n  <path transform=\"scale(0.0220625 0.0220625)\" d=\"M358.4 358.4h-204.8v307.2h204.8l256 256v-819.2l-256 256z\"></path>\n  <path transform=\"scale(0.0220625 0.0220625)\" d=\"M940.632 837.632l-72.192-72.192c65.114-64.745 105.412-154.386 105.412-253.44s-40.299-188.695-105.396-253.424l-0.016-0.016 72.192-72.192c83.639 83.197 135.401 198.37 135.401 325.632s-51.762 242.434-135.381 325.612l-0.020 0.020zM795.648 693.248l-72.704-72.704c27.756-27.789 44.921-66.162 44.921-108.544s-17.165-80.755-44.922-108.546l0.002 0.002 72.704-72.704c46.713 46.235 75.639 110.363 75.639 181.248s-28.926 135.013-75.617 181.227l-0.021 0.021z\"></path>\n</svg>\n");

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(121);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".xgplayer-skin-default .xgplayer-volume{outline:none;-webkit-order:4;-moz-box-ordinal-group:5;order:4;width:40px;height:40px;display:block;position:relative;z-index:18}.xgplayer-skin-default .xgplayer-volume .xgplayer-icon{margin-top:8px;cursor:pointer;position:absolute;bottom:-9px}.xgplayer-skin-default .xgplayer-volume .xgplayer-icon div{position:absolute}.xgplayer-skin-default .xgplayer-volume .xgplayer-icon .xgplayer-icon-large{display:block}.xgplayer-skin-default .xgplayer-volume .xgplayer-icon .xgplayer-icon-muted,.xgplayer-skin-default .xgplayer-volume .xgplayer-icon .xgplayer-icon-small{display:none}.xgplayer-skin-default .xgplayer-slider{display:none;position:absolute;width:28px;height:92px;background:rgba(0,0,0,.54);border-radius:1px;bottom:42px;outline:none}.xgplayer-skin-default .xgplayer-slider:after{content:\" \";display:block;height:15px;width:28px;position:absolute;bottom:-15px;left:0;z-index:20}.xgplayer-skin-default .xgplayer-bar,.xgplayer-skin-default .xgplayer-drag{display:block;position:absolute;bottom:6px;left:12px;background:hsla(0,0%,100%,.3);border-radius:100px;width:4px;height:76px;outline:none;cursor:pointer}.xgplayer-skin-default .xgplayer-drag{bottom:0;left:0;background:#fa1f41;max-height:76px}.xgplayer-skin-default .xgplayer-drag:after{content:\" \";display:inline-block;width:8px;height:8px;background:#fff;box-shadow:0 0 5px 0 rgba(0,0,0,.26);position:absolute;border-radius:50%;left:-2px;top:-6px}.xgplayer-skin-default.xgplayer-volume-active .xgplayer-slider,.xgplayer-skin-default.xgplayer-volume-large .xgplayer-volume .xgplayer-icon .xgplayer-icon-large{display:block}.xgplayer-skin-default.xgplayer-volume-large .xgplayer-volume .xgplayer-icon .xgplayer-icon-muted,.xgplayer-skin-default.xgplayer-volume-large .xgplayer-volume .xgplayer-icon .xgplayer-icon-small,.xgplayer-skin-default.xgplayer-volume-small .xgplayer-volume .xgplayer-icon .xgplayer-icon-large{display:none}.xgplayer-skin-default.xgplayer-volume-small .xgplayer-volume .xgplayer-icon .xgplayer-icon-small{display:block}.xgplayer-skin-default.xgplayer-volume-muted .xgplayer-volume .xgplayer-icon .xgplayer-icon-large,.xgplayer-skin-default.xgplayer-volume-muted .xgplayer-volume .xgplayer-icon .xgplayer-icon-small,.xgplayer-skin-default.xgplayer-volume-small .xgplayer-volume .xgplayer-icon .xgplayer-icon-muted{display:none}.xgplayer-skin-default.xgplayer-volume-muted .xgplayer-volume .xgplayer-icon .xgplayer-icon-muted{display:block}.xgplayer-skin-default.xgplayer-mobile .xgplayer-volume .xgplayer-slider{display:none}", ""]);

// exports


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var _sniffer = __webpack_require__(5);

var _sniffer2 = _interopRequireDefault(_sniffer);

__webpack_require__(123);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var s_definition = function s_definition() {
  var player = this;
  var root = player.root;
  var paused = void 0;
  var container = (0, _util.createDom)('xg-definition', '', { tabindex: 3 }, 'xgplayer-definition');
  if (_sniffer2.default.device === 'mobile') {
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
          if (item === 'hls') {
            a.href = player[item].originUrl || player[item].url;
            src = a.href;
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
          (0, _util.addClass)(player.root, 'xgplayer-definition-active');
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
          (0, _util.addClass)(player.root, 'xgplayer-definition-active');
          container.focus();
        });
      }
      player.controls.appendChild(container);
    }
  }
  function onResourceReady(list) {
    player.definitionList = list;
    if (list && list instanceof Array && list.length > 0) {
      (0, _util.addClass)(root, 'xgplayer-is-definition');
      player.once('canplay', onCanplayResourceReady);
    }
  }
  player.on('resourceReady', onResourceReady);

  function onPlayingChangeDefinition() {
    player.currentTime = player.curTime;
    if (paused) {
      player.pause();
    } else {
      var playPromise = player.play();
      if (playPromise !== undefined && playPromise) {
        playPromise.catch(function (err) {});
      }
    }
  };
  function onTimeupdateChangeDefinition() {
    player.once('timeupdate', onPlayingChangeDefinition);
  };
  ['touchend', 'click'].forEach(function (item) {
    container.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      var list = player.definitionList;
      var li = e.target || e.srcElement,
          a = document.createElement('a');
      if (li && li.tagName.toLocaleLowerCase() === 'li') {
        var from = void 0,
            to = void 0;
        Array.prototype.forEach.call(li.parentNode.childNodes, function (item) {
          if ((0, _util.hasClass)(item, 'selected')) {
            from = item.getAttribute('cname');
            (0, _util.removeClass)(item, 'selected');
            player.emit('beforeDefinitionChange', item.getAttribute('url'));
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

        (0, _util.addClass)(li, 'selected');
        to = li.getAttribute('cname');
        li.parentNode.nextSibling.innerHTML = '' + li.getAttribute('cname');
        a.href = li.getAttribute('url');
        paused = player.paused;
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
              if (item === 'hls') {
                curRUL.href = player[item].originUrl || player[item].url;
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
            player.curTime = player.currentTime;
            if (!player.ended) {
              player.src = a.href;
            }
          }
        }
        if (navigator.userAgent.toLowerCase().indexOf('android') > -1) {
          player.once('timeupdate', onTimeupdateChangeDefinition);
        } else {
          player.once('loadedmetadata', onPlayingChangeDefinition);
        }
        player.emit('definitionChange', { from: from, to: to });
        if (_sniffer2.default.device === 'mobile') {
          (0, _util.removeClass)(player.root, 'xgplayer-definition-active');
        }
      } else if (player.config.definitionActive === 'click' && li && (li.tagName.toLocaleLowerCase() === 'p' || li.tagName.toLocaleLowerCase() === 'em')) {
        if (_sniffer2.default.device === 'mobile') {
          (0, _util.toggleClass)(player.root, 'xgplayer-definition-active');
        } else {
          (0, _util.addClass)(player.root, 'xgplayer-definition-active');
        }
        container.focus();
      }
      player.emit('focus');
    }, false);
  });

  container.addEventListener('mouseleave', function (e) {
    e.preventDefault();
    e.stopPropagation();
    (0, _util.removeClass)(root, 'xgplayer-definition-active');
  });

  function onBlur() {
    (0, _util.removeClass)(root, 'xgplayer-definition-active');
  }
  player.on('blur', onBlur);

  function onDestroy() {
    player.off('resourceReady', onResourceReady);
    player.off('canplay', onCanplayResourceReady);
    if (navigator.userAgent.toLowerCase().indexOf('android') > -1) {
      player.off('timeupdate', onTimeupdateChangeDefinition);
      player.off('timeupdate', onPlayingChangeDefinition);
    } else {
      player.off('loadedmetadata', onPlayingChangeDefinition);
    }
    player.off('blur', onBlur);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);

  player.getCurrentDefinition = function () {
    var liList = player.controls.querySelectorAll('.xgplayer-definition ul li');
    for (var i = 0; i < liList.length; i++) {
      if (liList[i].className && liList[i].className.indexOf('selected') > -1) {
        return {
          name: liList[i].getAttribute('cname'),
          url: liList[i].getAttribute('url')
        };
      }
    }
    return {
      name: liList[0].getAttribute('cname'),
      url: liList[0].getAttribute('url')
    };
  };

  player.switchDefinition = function () {
    var definitionObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var liList = player.controls.querySelectorAll('.xgplayer-definition ul li');
    for (var i = 0; i < liList.length; i++) {
      if (liList[i].getAttribute('cname') === definitionObj.name || liList[i].getAttribute('url') === definitionObj.url || i === definitionObj.index) {
        liList[i].click();
      }
    }
  };
};

exports.default = {
  name: 's_definition',
  method: s_definition
};
module.exports = exports['default'];

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(124);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".xgplayer-skin-default .xgplayer-definition{-webkit-order:5;-moz-box-ordinal-group:6;order:5;width:60px;height:150px;z-index:18;position:relative;outline:none;display:none;cursor:default;margin-left:10px;margin-top:-119px}.xgplayer-skin-default .xgplayer-definition ul{display:none;list-style:none;width:78px;background:rgba(0,0,0,.54);border-radius:1px;position:absolute;bottom:30px;left:0;text-align:center;white-space:nowrap;margin-left:-10px;z-index:26;cursor:pointer}.xgplayer-skin-default .xgplayer-definition ul li{opacity:.7;font-family:PingFangSC-Regular;font-size:11px;color:hsla(0,0%,100%,.8);padding:6px 13px}.xgplayer-skin-default .xgplayer-definition ul li.selected,.xgplayer-skin-default .xgplayer-definition ul li:hover{color:#fff;opacity:1}.xgplayer-skin-default .xgplayer-definition .name{text-align:center;font-family:PingFangSC-Regular;font-size:13px;cursor:pointer;color:hsla(0,0%,100%,.8);position:absolute;bottom:0;width:60px;height:20px;line-height:20px;background:rgba(0,0,0,.38);border-radius:10px;display:inline-block;vertical-align:middle}.xgplayer-skin-default.xgplayer-definition-active .xgplayer-definition ul,.xgplayer-skin-default.xgplayer-is-definition .xgplayer-definition{display:block}", ""]);

// exports


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var _sniffer = __webpack_require__(5);

var _sniffer2 = _interopRequireDefault(_sniffer);

__webpack_require__(126);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var s_playbackRate = function s_playbackRate() {
  var player = this;
  var playbackRateList = [];
  if (player.config.playbackRate) {
    playbackRateList = [].concat(player.config.playbackRate);
    playbackRateList.sort(function (a, b) {
      return b - a;
    });
  } else {
    return false;
  }
  var unit = player.config.playbackRateUnit !== undefined ? player.config.playbackRateUnit : 'x';
  var container = (0, _util.createDom)('xg-playbackrate', " ", {}, 'xgplayer-playbackrate');
  if (_sniffer2.default.device === 'mobile') {
    player.config.playbackRateActive = 'click';
  }

  var list = [];
  playbackRateList.forEach(function (item) {
    list.push({ name: '' + item, rate: '' + item + unit, selected: false });
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
  tmp.push('</ul><p class=\'name\'>' + selectedSpeed + unit + '</p>');
  var playbackDom = player.root.querySelector('.xgplayer-playbackrate');
  if (playbackDom) {
    playbackDom.innerHTML = tmp.join('');
    var cur = playbackDom.querySelector('.name');
    if (!player.config.playbackRateActive || player.config.playbackRateActive === 'hover') {
      cur.addEventListener('mouseenter', function (e) {
        e.preventDefault();
        e.stopPropagation();
        (0, _util.addClass)(player.root, 'xgplayer-playbackrate-active');
        playbackDom.focus();
      });
    }
  } else {
    container.innerHTML = tmp.join('');
    var _cur = container.querySelector('.name');
    if (!player.config.playbackRateActive || player.config.playbackRateActive === 'hover') {
      _cur.addEventListener('mouseenter', function (e) {
        e.preventDefault();
        e.stopPropagation();
        (0, _util.addClass)(player.root, 'xgplayer-playbackrate-active');
        container.focus();
      });
    }
    player.once('ready', function () {
      player.controls.appendChild(container);
    });
  }

  var ev = ['touchend', 'click'];
  ev.forEach(function (item) {
    container.addEventListener(item, function (e) {
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
              if ((0, _util.hasClass)(item, 'selected')) {
                from = Number(item.getAttribute('cname'));
                (0, _util.removeClass)(item, 'selected');
              }
            });
            item.selected = true;
            player.video.playbackRate = item.name * 1;
            selectedSpeed = item.name * 1;
          }
        });
        (0, _util.addClass)(li, 'selected');
        to = Number(li.getAttribute('cname'));
        li.parentNode.nextSibling.innerHTML = '' + li.getAttribute('cname') + unit;
        player.emit('playbackrateChange', { from: from, to: to });
        if (_sniffer2.default.device === 'mobile') {
          (0, _util.removeClass)(player.root, 'xgplayer-playbackrate-active');
        }
      } else if (player.config.playbackRateActive === 'click' && li && (li.tagName.toLocaleLowerCase() === 'p' || li.tagName.toLocaleLowerCase() === 'span')) {
        if (_sniffer2.default.device === 'mobile') {
          (0, _util.toggleClass)(player.root, 'xgplayer-playbackrate-active');
        } else {
          (0, _util.addClass)(player.root, 'xgplayer-playbackrate-active');
        }
        container.focus();
      }
      player.emit('focus');
    }, false);
  });
  container.addEventListener('mouseleave', function (e) {
    e.preventDefault();
    e.stopPropagation();
    (0, _util.removeClass)(player.root, 'xgplayer-playbackrate-active');
  });

  function onBlur() {
    (0, _util.removeClass)(player.root, 'xgplayer-playbackrate-active');
  }
  player.on('blur', onBlur);

  player.on('play', function () {
    if (player.video.playbackRate.toFixed(1) !== selectedSpeed.toFixed(1)) {
      player.video.playbackRate = selectedSpeed;
    }
  });

  player.switchPlaybackRate = function () {
    var playbackRateObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var liList = player.controls.querySelectorAll('.xgplayer-playbackrate ul li');
    for (var i = 0; i < liList.length; i++) {
      if (!(0, _util.hasClass)(liList[i], 'selected') && (liList[i].getAttribute('cname') === '' + playbackRateObj.playbackRate || i === playbackRateObj.index)) {
        liList[i].click();
      }
    }
  };

  player.on('ratechange', function () {
    player.switchPlaybackRate({ playbackRate: player.playbackRate });
  });
};

exports.default = {
  name: 's_playbackRate',
  method: s_playbackRate
};
module.exports = exports['default'];

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(127);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".xgplayer-skin-default .xgplayer-playbackrate{-webkit-order:8;-moz-box-ordinal-group:9;order:8;width:60px;height:150px;z-index:18;position:relative;display:inline-block;cursor:default;margin-top:-119px}.xgplayer-skin-default .xgplayer-playbackrate ul{display:none;list-style:none;width:78px;background:rgba(0,0,0,.54);border-radius:1px;position:absolute;bottom:30px;left:50%;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%);text-align:left;white-space:nowrap;z-index:26;cursor:pointer}.xgplayer-skin-default .xgplayer-playbackrate ul li{opacity:.7;font-family:PingFangSC-Regular;font-size:11px;color:hsla(0,0%,100%,.8);position:relative;padding:4px 0;text-align:center}.xgplayer-skin-default .xgplayer-playbackrate ul li.selected,.xgplayer-skin-default .xgplayer-playbackrate ul li:hover{color:#fff;opacity:1}.xgplayer-skin-default .xgplayer-playbackrate ul li:first-child{position:relative;margin-top:12px}.xgplayer-skin-default .xgplayer-playbackrate ul li:last-child{position:relative;margin-bottom:12px}.xgplayer-skin-default .xgplayer-playbackrate .name{width:60px;height:20px;position:absolute;bottom:0;text-align:center;font-family:PingFangSC-Regular;font-size:13px;background:rgba(0,0,0,.38);color:hsla(0,0%,100%,.8);border-radius:10px;line-height:20px}.xgplayer-skin-default .xgplayer-playbackrate span{position:relative;top:19px;font-weight:700;text-shadow:0 0 4px rgba(0,0,0,.6)}.xgplayer-skin-default .xgplayer-playbackrate:hover{opacity:1}.xgplayer-skin-default.xgplayer-playbackrate-active .xgplayer-playbackrate ul{display:block}", ""]);

// exports


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var s_localPreview = function s_localPreview() {
  var player = this;
  if (player.config.preview && player.config.preview.uploadEl) {
    var preview = (0, _util.createDom)('xg-preview', '<input type="file">', {}, 'xgplayer-preview');
    var upload = preview.querySelector('input');
    player.config.preview.uploadEl.appendChild(preview);
    upload.onchange = function () {
      player.emit('upload', upload);
    };
  }
};

exports.default = {
  name: 's_localPreview',
  method: s_localPreview
};
module.exports = exports['default'];

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var _download = __webpack_require__(130);

var _download2 = _interopRequireDefault(_download);

__webpack_require__(131);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var s_download = function s_download() {
  var player = this;
  if (!player.config.download) {
    return;
  }
  var btn = (0, _util.createDom)('xg-download', '<xg-icon class="xgplayer-icon">' + _download2.default + '</xg-icon>', {}, 'xgplayer-download');

  var tipsText = player.lang.DOWNLOAD_TIPS;
  var tips = (0, _util.createDom)('xg-tips', '<span class="xgplayer-tip-download">' + tipsText + '</span>', {}, 'xgplayer-tips');
  btn.appendChild(tips);
  player.once('ready', function () {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.userGestureTrigEvent('downloadBtnClick');
    });
  });
};

exports.default = {
  name: 's_download',
  method: s_download
};
module.exports = exports['default'];

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\">\n  <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n    <g transform=\"translate(-488.000000, -340.000000)\" fill=\"#FFFFFF\">\n      <g id=\"Group-2\">\n        <g id=\"volme_big-copy\" transform=\"translate(488.000000, 340.000000)\">\n          <rect id=\"Rectangle-18\" x=\"11\" y=\"4\" width=\"2\" height=\"12\" rx=\"1\"></rect>\n          <rect id=\"Rectangle-2\" x=\"3\" y=\"18\" width=\"18\" height=\"2\" rx=\"1\"></rect>\n          <rect id=\"Rectangle-2\" transform=\"translate(4.000000, 17.500000) rotate(90.000000) translate(-4.000000, -17.500000) \" x=\"1.5\" y=\"16.5\" width=\"5\" height=\"2\" rx=\"1\"></rect><rect id=\"Rectangle-2-Copy-3\" transform=\"translate(20.000000, 17.500000) rotate(90.000000) translate(-20.000000, -17.500000) \" x=\"17.5\" y=\"16.5\" width=\"5\" height=\"2\" rx=\"1\"></rect>\n          <path d=\"M9.48791171,8.26502656 L9.48791171,14.2650266 C9.48791171,14.8173113 9.04019646,15.2650266 8.48791171,15.2650266 C7.93562696,15.2650266 7.48791171,14.8173113 7.48791171,14.2650266 L7.48791171,7.26502656 C7.48791171,6.71274181 7.93562696,6.26502656 8.48791171,6.26502656 L15.4879117,6.26502656 C16.0401965,6.26502656 16.4879117,6.71274181 16.4879117,7.26502656 C16.4879117,7.81731131 16.0401965,8.26502656 15.4879117,8.26502656 L9.48791171,8.26502656 Z\" id=\"Combined-Shape\" transform=\"translate(11.987912, 10.765027) scale(1, -1) rotate(45.000000) translate(-11.987912, -10.765027) \"></path>\n        </g>\n      </g>\n    </g>\n  </g>\n</svg>\n");

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(132);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".xgplayer-skin-default .xgplayer-download{position:relative;-webkit-order:9;-moz-box-ordinal-group:10;order:9;display:block;cursor:pointer}.xgplayer-skin-default .xgplayer-download .xgplayer-icon{margin-top:3px}.xgplayer-skin-default .xgplayer-download .xgplayer-icon div{position:absolute}.xgplayer-skin-default .xgplayer-download .xgplayer-icon svg{position:relative;top:5px;left:5px}.xgplayer-skin-default .xgplayer-download .xgplayer-tips{margin-left:-20px}.xgplayer-skin-default .xgplayer-download .xgplayer-tips .xgplayer-tip-download{display:block}.xgplayer-skin-default .xgplayer-download:hover{opacity:.85}.xgplayer-skin-default .xgplayer-download:hover .xgplayer-tips{display:block}.xgplayer-lang-is-en .xgplayer-download .xgplayer-tips{margin-left:-32px}.xgplayer-lang-is-jp .xgplayer-download .xgplayer-tips{margin-left:-40px}", ""]);

// exports


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var _danmu = __webpack_require__(134);

var _danmu2 = _interopRequireDefault(_danmu);

var _panel = __webpack_require__(136);

var _panel2 = _interopRequireDefault(_panel);

__webpack_require__(137);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var s_danmu = function s_danmu() {
  var player = this;
  var root = player.root;
  if (!player.config.danmu) {
    return;
  }
  var container = (0, _util.createDom)('xg-danmu', '', {}, 'xgplayer-danmu');
  player.once('ready', function () {
    root.appendChild(container);
  });
  var config = (0, _util.deepCopy)({
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
    panelBtn = (0, _util.createDom)('xg-panel', '<xg-panel-icon class="xgplayer-panel-icon">\n                                                ' + _panel2.default + '\n                                              </xg-panel-icon>\n                                              <xg-panel-slider class="xgplayer-panel-slider">\n                                                <xg-hidemode class="xgplayer-hidemode">\n                                                  <p class="xgplayer-hidemode-font">\u5C4F\u853D\u7C7B\u578B</p>\n                                                  <ul class="xgplayer-hidemode-radio">\n                                                    <li class="xgplayer-hidemode-scroll" id="false">\u6EDA\u52A8</li><li class="xgplayer-hidemode-top" id="false">\u9876\u90E8</li><li class="xgplayer-hidemode-bottom" id="false">\u5E95\u90E8</li><li class="xgplayer-hidemode-color" id="false">\u8272\u5F69</li>\n                                                  </ul>\n                                                </xg-hidemode>\n                                                <xg-transparency class="xgplayer-transparency">\n                                                  <span>\u4E0D\u900F\u660E\u5EA6</span>\n                                                  <input class="xgplayer-transparency-line xgplayer-transparency-color xgplayer-transparency-bar xgplayer-transparency-gradient" type="range" min="0" max="100" step="0.1" value="50"></input>\n                                                </xg-transparency>\n                                                <xg-showarea class="xgplayer-showarea">\n                                                  <div class="xgplayer-showarea-name">\u663E\u793A\u533A\u57DF</div>\n                                                  <div class="xgplayer-showarea-control">\n                                                    <div class="xgplayer-showarea-control-up">\n                                                      <span class="xgplayer-showarea-control-up-item xgplayer-showarea-onequarters">1/4</span>\n                                                      <span class="xgplayer-showarea-control-up-item xgplayer-showarea-twoquarters selected-color">1/2</span>\n                                                      <span class="xgplayer-showarea-control-up-item xgplayer-showarea-threequarters">3/4</span>\n                                                      <span class="xgplayer-showarea-control-up-item xgplayer-showarea-full">1</span>\n                                                    </div>\n                                                    <div class="xgplayer-showarea-control-down">\n                                                      <div class="xgplayer-showarea-control-down-dots">\n                                                        <span class="xgplayer-showarea-onequarters-dot"></span>\n                                                        <span class="xgplayer-showarea-twoquarters-dot"></span>\n                                                        <span class="xgplayer-showarea-threequarters-dot"></span>\n                                                        <span class="xgplayer-showarea-full-dot"></span>\n                                                      </div>\n                                                      <input class="xgplayer-showarea-line xgplayer-showarea-color xgplayer-showarea-bar xgplayer-gradient" type="range" min="1" max="4" step="1" value="1">\n                                                    </div>\n                                                  </div>\n                                                </xg-showarea>\n                                                <xg-danmuspeed class="xgplayer-danmuspeed">\n                                                  <div class="xgplayer-danmuspeed-name">\u5F39\u5E55\u901F\u5EA6</div>\n                                                  <div class="xgplayer-danmuspeed-control">\n                                                    <div class="xgplayer-danmuspeed-control-up">\n                                                      <span class="xgplayer-danmuspeed-control-up-item xgplayer-danmuspeed-small">\u6162</span>\n                                                      <span class="xgplayer-danmuspeed-control-up-item xgplayer-danmuspeed-middle selected-color">\u4E2D</span>\n                                                      <span class="xgplayer-danmuspeed-control-up-item xgplayer-danmuspeed-large">\u5FEB</span>\n                                                    </div>\n                                                    <div class="xgplayer-danmuspeed-control-down">\n                                                      <div class="xgplayer-danmuspeed-control-down-dots">\n                                                        <span class="xgplayer-danmuspeed-small-dot"></span>\n                                                        <span class="xgplayer-danmuspeed-middle-dot"></span>\n                                                        <span class="xgplayer-danmuspeed-large-dot"></span>\n                                                      </div>\n                                                      <input class="xgplayer-danmuspeed-line xgplayer-danmuspeed-color xgplayer-danmuspeed-bar xgplayer-gradient" type="range" min="50" max="150" step="50" value="100">\n                                                    </div>\n                                                  </div>\n                                                </xg-danmuspeed>\n                                                <xg-danmufont class="xgplayer-danmufont">\n                                                  <div class="xgplayer-danmufont-name">\u5B57\u4F53\u5927\u5C0F</div>\n                                                  <div class="xgplayer-danmufont-control">\n                                                    <div class="xgplayer-danmufont-control-up">\n                                                      <span class="xgplayer-danmufont-control-up-item xgplayer-danmufont-small">\u5C0F</span>\n                                                      <span class="xgplayer-danmufont-control-up-item xgplayer-danmufont-middle">\u4E2D</span>\n                                                      <span class="xgplayer-danmufont-control-up-item xgplayer-danmufont-large selected-color">\u5927</span>\n                                                    </div>\n                                                    <div class="xgplayer-danmufont-control-down">\n                                                      <div class="xgplayer-danmufont-control-down-dots">\n                                                        <span class="xgplayer-danmufont-small-dot"></span>\n                                                        <span class="xgplayer-danmufont-middle-dot"></span>\n                                                        <span class="xgplayer-danmufont-large-dot"></span>\n                                                      </div>\n                                                      <input class="xgplayer-danmufont-line xgplayer-danmufont-color xgplayer-danmufont-bar xgplayer-gradient" type="range" min="20" max="30" step="5" value="25">\n                                                    </div>\n                                                  </div>\n                                                </xg-danmufont>\n                                              </xg-panel-slider>', { tabindex: 7 }, 'xgplayer-panel');
    player.once('ready', function () {
      player.controls.appendChild(panelBtn);
    });
  }
  player.once('complete', function () {
    var danmujs = new _danmu2.default(config);
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
        (0, _util.addClass)(slider, 'xgplayer-panel-active');
        panelBtn.focus();
        focusStatus = true;
      });
    });
    panelBtn.addEventListener('mouseleave', function (e) {
      e.preventDefault();
      e.stopPropagation();
      (0, _util.removeClass)(slider, 'xgplayer-panel-active');
      focusStatus = false;
    });
    slider.addEventListener('mouseleave', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (focusStatus === false) {
        (0, _util.removeClass)(slider, 'xgplayer-panel-active');
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

exports.default = {
  name: 's_danmu',
  method: s_danmu
};
module.exports = exports['default'];

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (e, t) {
  "object" == ( false ? undefined : _typeof(exports)) && "object" == ( false ? undefined : _typeof(module)) ? module.exports = t() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(window, function () {
  return function (e) {
    var t = {};function n(i) {
      if (t[i]) return t[i].exports;var o = t[i] = { i: i, l: !1, exports: {} };return e[i].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
    }return n.m = e, n.c = t, n.d = function (e, t, i) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: i });
    }, n.r = function (e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
    }, n.t = function (e, t) {
      if (1 & t && (e = n(e)), 8 & t) return e;if (4 & t && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e && e.__esModule) return e;var i = Object.create(null);if (n.r(i), Object.defineProperty(i, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) for (var o in e) {
        n.d(i, o, function (t) {
          return e[t];
        }.bind(null, o));
      }return i;
    }, n.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default;
      } : function () {
        return e;
      };return n.d(t, "a", t), t;
    }, n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, n.p = "", n(n.s = 4);
  }([function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var i = { createDom: function createDom() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "div",
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
            n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "",
            o = document.createElement(e);return o.className = i, o.innerHTML = t, Object.keys(n).forEach(function (t) {
          var i = t,
              r = n[t];"video" === e || "audio" === e ? r && o.setAttribute(i, r) : o.setAttribute(i, r);
        }), o;
      }, hasClass: function hasClass(e, t) {
        return e.classList ? Array.prototype.some.call(e.classList, function (e) {
          return e === t;
        }) : !!e.className.match(new RegExp("(\\s|^)" + t + "(\\s|$)"));
      }, addClass: function addClass(e, t) {
        e.classList ? t.replace(/(^\s+|\s+$)/g, "").split(/\s+/g).forEach(function (t) {
          t && e.classList.add(t);
        }) : i.hasClass(e, t) || (e.className += " " + t);
      }, removeClass: function removeClass(e, t) {
        e.classList ? t.split(/\s+/g).forEach(function (t) {
          e.classList.remove(t);
        }) : i.hasClass(e, t) && t.split(/\s+/g).forEach(function (t) {
          var n = new RegExp("(\\s|^)" + t + "(\\s|$)");e.className = e.className.replace(n, " ");
        });
      }, toggleClass: function toggleClass(e, t) {
        t.split(/\s+/g).forEach(function (t) {
          i.hasClass(e, t) ? i.removeClass(e, t) : i.addClass(e, t);
        });
      }, findDom: function findDom() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document,
            t = arguments[1],
            n = void 0;try {
          n = e.querySelector(t);
        } catch (i) {
          t.startsWith("#") && (n = e.getElementById(t.slice(1)));
        }return n;
      }, deepCopy: function deepCopy(e, t) {
        if ("Object" === i.typeOf(t) && "Object" === i.typeOf(e)) return Object.keys(t).forEach(function (n) {
          "Object" !== i.typeOf(t[n]) || t[n] instanceof Node ? "Array" === i.typeOf(t[n]) ? e[n] = "Array" === i.typeOf(e[n]) ? e[n].concat(t[n]) : t[n] : e[n] = t[n] : e[n] ? i.deepCopy(e[n], t[n]) : e[n] = t[n];
        }), e;
      }, typeOf: function typeOf(e) {
        return Object.prototype.toString.call(e).match(/([^\s.*]+)(?=]$)/g)[0];
      }, copyDom: function copyDom(e) {
        if (e && 1 === e.nodeType) {
          var t = document.createElement(e.tagName);return Array.prototype.forEach.call(e.attributes, function (e) {
            t.setAttribute(e.name, e.value);
          }), e.innerHTML && (t.innerHTML = e.innerHTML), t;
        }return "";
      }, formatTime: function formatTime(e) {
        var t = Math.floor(e);return 1e3 * t + (e - t);
      }, offInDestroy: function offInDestroy(e, t, n, i) {
        e.once(i, function o() {
          e.off(t, n), e.off(i, o);
        });
      }, on: function on(e, t, n, o) {
        if (o) e.on(t, n), i.offInDestroy(e, t, n, o);else {
          e.on(t, function i(o) {
            n(o), e.off(t, i);
          });
        }
      }, style: function style(e, t, n) {
        var i = e.style;try {
          i[t] = n;
        } catch (e) {
          i.setProperty(t, n);
        }
      } };t.default = i, e.exports = t.default;
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var i,
        o = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
      }return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
      };
    }(),
        r = n(26),
        a = (i = r) && i.__esModule ? i : { default: i };var s = function () {
      function e() {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e);
      }return o(e, [{ key: "setLogger", value: function value() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";this.logger = new a.default(e + ".js");
        } }]), e;
    }();t.default = s, e.exports = t.default;
  }, function (e, t, n) {
    "use strict";
    var i = n(19)();e.exports = function (e) {
      return e !== i && null !== e;
    };
  }, function (e, t, n) {
    "use strict";
    e.exports = function (e) {
      return null != e;
    };
  }, function (e, t, n) {
    e.exports = n(5);
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var i,
        o = n(6),
        r = (i = o) && i.__esModule ? i : { default: i };n(34), t.default = r.default, e.exports = t.default;
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var i = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
      }return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
      };
    }(),
        o = f(n(7)),
        r = f(n(1)),
        a = f(n(27)),
        s = f(n(31)),
        l = f(n(0)),
        u = n(32),
        c = n(33);function f(e) {
      return e && e.__esModule ? e : { default: e };
    }function h(e, t) {
      if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && "function" != typeof t ? e : t;
    }var d = function (e) {
      function t(e) {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, t);var n = h(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));n.setLogger("danmu"), n.logger && n.logger.info("danmu.js version: " + u.version);var i = n;if (i.config = l.default.deepCopy({ overlap: !1, area: { start: 0, end: 1 }, live: !1, comments: [], direction: "r2l", needResizeObserver: !1 }, e), i.hideArr = [], i.domObj = new s.default(), (0, o.default)(i), i.config.comments.forEach(function (e) {
          e.duration = e.duration ? e.duration : 5e3, e.mode || (e.mode = "scroll");
        }), !i.config.container || 1 !== i.config.container.nodeType) return i.emit("error", "container id can't be empty"), !1, h(n, !1);if (i.container = i.config.container, i.config.containerStyle) {
          var r = i.config.containerStyle;Object.keys(r).forEach(function (e) {
            i.container.style[e] = r[e];
          });
        }return i.live = i.config.live, i.player = i.config.player, i.direction = i.config.direction, l.default.addClass(i.container, "danmu"), i.bulletBtn = new a.default(i), i.isReady = !0, i.emit("ready"), n.logger && n.logger.info("ready"), n.addResizeObserver(), n;
      }return function (e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : _typeof(t)));e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
      }(t, e), i(t, [{ key: "addResizeObserver", value: function value() {
          var e = this;this.config.needResizeObserver && (0, c.addObserver)(this.container, function () {
            e.logger && e.logger.info("needResizeObserver"), e.resize();
          });
        } }, { key: "start", value: function value() {
          this.logger && this.logger.info("start"), this.bulletBtn.main.start();
        } }, { key: "pause", value: function value() {
          this.logger && this.logger.info("pause"), this.bulletBtn.main.pause();
        } }, { key: "play", value: function value() {
          this.logger && this.logger.info("play"), this.bulletBtn.main.play();
        } }, { key: "stop", value: function value() {
          this.logger && this.logger.info("stop"), this.bulletBtn.main.stop();
        } }, { key: "clear", value: function value() {
          this.logger && this.logger.info("clear"), this.bulletBtn.main.clear();
        } }, { key: "destroy", value: function value() {
          for (var e in (0, c.unObserver)(this.container), this.logger && this.logger.info("destroy"), this.stop(), this.bulletBtn.destroy(), this.domObj.destroy(), this) {
            delete this[e];
          }this.emit("destroy");
        } }, { key: "sendComment", value: function value(e) {
          this.logger && this.logger.info("sendComment: " + (e.txt || "[DOM Element]")), e.duration || (e.duration = 15e3), e && e.id && e.duration && (e.el || e.txt) && (e.duration = e.duration ? e.duration : 5e3, e.style || (e.style = { opacity: void 0, fontSize: void 0 }), e.style && (this.opacity && this.opacity !== e.style.opacity && (e.style.opacity = this.opacity), this.fontSize && this.fontSize !== e.style.fontSize && (e.style.fontSize = this.fontSize), this.like && (e.like = e.like ? e.like : this.like)), e.prior || e.realTime ? (this.bulletBtn.main.data.unshift(e), e.realTime && (this.bulletBtn.main.readData(), this.bulletBtn.main.dataHandle())) : this.bulletBtn.main.data.push(e));
        } }, { key: "setCommentID", value: function value(e, t) {
          var n = this;this.logger && this.logger.info("setCommentID: oldID " + e + " newID " + t);var i = this.container.getBoundingClientRect();e && t && (this.bulletBtn.main.data.some(function (n) {
            return n.id === e && (n.id = t, !0);
          }), this.bulletBtn.main.queue.some(function (o) {
            return o.id === e && (o.id = t, o.pauseMove(i), "paused" !== n.bulletBtn.main.status && o.startMove(i), !0);
          }));
        } }, { key: "setCommentDuration", value: function value(e, t) {
          var n = this;this.logger && this.logger.info("setCommentDuration: id " + e + " duration " + t);var i = this.container.getBoundingClientRect();e && t && (t = t || 5e3, this.bulletBtn.main.data.some(function (n) {
            return n.id === e && (n.duration = t, !0);
          }), this.bulletBtn.main.queue.some(function (o) {
            return o.id === e && (o.duration = t, o.pauseMove(i), "paused" !== n.bulletBtn.main.status && o.startMove(i), !0);
          }));
        } }, { key: "setCommentLike", value: function value(e, t) {
          this.logger && this.logger.info("setCommentLike: id " + e + " like " + t);var n = this.container.getBoundingClientRect();this.like = t, e && t && (this.bulletBtn.main.data.some(function (n) {
            return n.id === e && (n.like = t, !0);
          }), this.bulletBtn.main.queue.some(function (i) {
            return i.id === e && (i.pauseMove(n), i.setLikeDom(t.el, t.style), "paused" !== i.danmu.bulletBtn.main.status && i.startMove(n), !0);
          }));
        } }, { key: "restartComment", value: function value(e) {
          this.logger && this.logger.info("restartComment: id " + e), this.mouseControl = !1;var t = this.container.getBoundingClientRect();e && this.bulletBtn.main.queue.some(function (n) {
            return n.id === e && ("paused" !== n.danmu.bulletBtn.main.status ? n.startMove(t, !0) : n.status = "paused", !0);
          });
        } }, { key: "freezeComment", value: function value(e) {
          this.logger && this.logger.info("freezeComment: id " + e), this.mouseControl = !0;var t = this.container.getBoundingClientRect();e && this.bulletBtn.main.queue.some(function (n) {
            return n.id === e && (n.status = "forcedPause", n.pauseMove(t), n.el && n.el.style && l.default.style(n.el, "zIndex", 10), !0);
          });
        } }, { key: "removeComment", value: function value(e) {
          this.logger && this.logger.info("removeComment: id " + e), e && (this.bulletBtn.main.queue.some(function (t) {
            return t.id === e && (t.remove(), !0);
          }), this.bulletBtn.main.data = this.bulletBtn.main.data.filter(function (t) {
            return t.id !== e;
          }));
        } }, { key: "updateComments", value: function value(e) {
          var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];t && (this.bulletBtn.main.data = []), this.bulletBtn.main.data = this.bulletBtn.main.data.concat(e);
        } }, { key: "setAllDuration", value: function value() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "scroll",
              t = arguments[1],
              n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];this.logger && this.logger.info("setAllDuration: mode " + e + " duration " + t + " force " + n);var i = this.container.getBoundingClientRect();t && (t = t || 5e3, n && (this.bulletBtn.main.forceDuration = t), this.bulletBtn.main.data.forEach(function (n) {
            e === n.mode && (n.duration = t);
          }), this.bulletBtn.main.queue.forEach(function (n) {
            e === n.mode && (n.duration = t, n.pauseMove(i), "paused" !== n.danmu.bulletBtn.main.status && n.startMove(i));
          }));
        } }, { key: "setOpacity", value: function value(e) {
          this.logger && this.logger.info("setOpacity: opacity " + e), this.container.style.opacity = e;
        } }, { key: "setFontSize", value: function value(e, t) {
          var n = this;this.logger && this.logger.info("setFontSize: size " + e + " channelSize " + t), this.fontSize = e + "px", e && (this.bulletBtn.main.data.forEach(function (e) {
            e.style && (e.style.fontSize = n.fontSize);
          }), this.bulletBtn.main.queue.forEach(function (e) {
            e.options.style || (e.options.style = {}), e.options.style.fontSize = n.fontSize, e.setFontSize(n.fontSize), t && (e.top = e.channel_id[0] * t, e.topInit());
          })), t && (this.config.channelSize = t, this.bulletBtn.main.channel.resize(!0));
        } }, { key: "setArea", value: function value(e) {
          this.logger && this.logger.info("setArea: area " + e), this.config.area = e, this.bulletBtn.main.channel.resize(!0);
        } }, { key: "hide", value: function value() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "scroll";this.logger && this.logger.info("hide: mode " + e), this.hideArr.indexOf(e) < 0 && this.hideArr.push(e);var t = this.bulletBtn.main.queue.filter(function (t) {
            return e === t.mode || "color" === e && t.color;
          });t.forEach(function (e) {
            return e.remove();
          });
        } }, { key: "show", value: function value() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "scroll";this.logger && this.logger.info("show: mode " + e);var t = this.hideArr.indexOf(e);t > -1 && this.hideArr.splice(t, 1);
        } }, { key: "setDirection", value: function value() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "r2l";this.logger && this.logger.info("setDirection: direction " + e), this.emit("changeDirection", e);
        } }, { key: "resize", value: function value() {
          this.logger && this.logger.info("resize"), this.emit("channel_resize");
        } }]), t;
    }(r.default);t.default = d, e.exports = t.default;
  }, function (e, t, n) {
    "use strict";
    var i,
        o,
        r,
        a,
        s,
        l,
        u,
        c = n(8),
        f = n(25),
        h = Function.prototype.apply,
        d = Function.prototype.call,
        g = Object.create,
        p = Object.defineProperty,
        m = Object.defineProperties,
        v = Object.prototype.hasOwnProperty,
        b = { configurable: !0, enumerable: !1, writable: !0 };o = function o(e, t) {
      var _n, o;return f(t), o = this, i.call(this, e, _n = function n() {
        r.call(o, e, _n), h.call(t, this, arguments);
      }), _n.__eeOnceListener__ = t, this;
    }, s = { on: i = function i(e, t) {
        var n;return f(t), v.call(this, "__ee__") ? n = this.__ee__ : (n = b.value = g(null), p(this, "__ee__", b), b.value = null), n[e] ? "object" == _typeof(n[e]) ? n[e].push(t) : n[e] = [n[e], t] : n[e] = t, this;
      }, once: o, off: r = function r(e, t) {
        var n, i, o, r;if (f(t), !v.call(this, "__ee__")) return this;if (!(n = this.__ee__)[e]) return this;if ("object" == _typeof(i = n[e])) for (r = 0; o = i[r]; ++r) {
          o !== t && o.__eeOnceListener__ !== t || (2 === i.length ? n[e] = i[r ? 0 : 1] : i.splice(r, 1));
        } else i !== t && i.__eeOnceListener__ !== t || delete n[e];return this;
      }, emit: a = function a(e) {
        var t, n, i, o, r;if (v.call(this, "__ee__") && (o = this.__ee__[e])) if ("object" == (typeof o === "undefined" ? "undefined" : _typeof(o))) {
          for (n = arguments.length, r = new Array(n - 1), t = 1; t < n; ++t) {
            r[t - 1] = arguments[t];
          }for (o = o.slice(), t = 0; i = o[t]; ++t) {
            h.call(i, this, r);
          }
        } else switch (arguments.length) {case 1:
            d.call(o, this);break;case 2:
            d.call(o, this, arguments[1]);break;case 3:
            d.call(o, this, arguments[1], arguments[2]);break;default:
            for (n = arguments.length, r = new Array(n - 1), t = 1; t < n; ++t) {
              r[t - 1] = arguments[t];
            }h.call(o, this, r);}
      } }, l = { on: c(i), once: c(o), off: c(r), emit: c(a) }, u = m({}, l), e.exports = t = function t(e) {
      return null == e ? g(u) : m(Object(e), l);
    }, t.methods = s;
  }, function (e, t, n) {
    "use strict";
    var i = n(3),
        o = n(9),
        r = n(13),
        a = n(21),
        s = n(22);(e.exports = function (e, t) {
      var n, o, l, u, c;return arguments.length < 2 || "string" != typeof e ? (u = t, t = e, e = null) : u = arguments[2], i(e) ? (n = s.call(e, "c"), o = s.call(e, "e"), l = s.call(e, "w")) : (n = l = !0, o = !1), c = { value: t, configurable: n, enumerable: o, writable: l }, u ? r(a(u), c) : c;
    }).gs = function (e, t, n) {
      var l, u, c, f;return "string" != typeof e ? (c = n, n = t, t = e, e = null) : c = arguments[3], i(t) ? o(t) ? i(n) ? o(n) || (c = n, n = void 0) : n = void 0 : (c = t, t = n = void 0) : t = void 0, i(e) ? (l = s.call(e, "c"), u = s.call(e, "e")) : (l = !0, u = !1), f = { get: t, set: n, configurable: l, enumerable: u }, c ? r(a(c), f) : f;
    };
  }, function (e, t, n) {
    "use strict";
    var i = n(10),
        o = /^\s*class[\s{/}]/,
        r = Function.prototype.toString;e.exports = function (e) {
      return !!i(e) && !o.test(r.call(e));
    };
  }, function (e, t, n) {
    "use strict";
    var i = n(11);e.exports = function (e) {
      if ("function" != typeof e) return !1;if (!hasOwnProperty.call(e, "length")) return !1;try {
        if ("number" != typeof e.length) return !1;if ("function" != typeof e.call) return !1;if ("function" != typeof e.apply) return !1;
      } catch (e) {
        return !1;
      }return !i(e);
    };
  }, function (e, t, n) {
    "use strict";
    var i = n(12);e.exports = function (e) {
      if (!i(e)) return !1;try {
        return !!e.constructor && e.constructor.prototype === e;
      } catch (e) {
        return !1;
      }
    };
  }, function (e, t, n) {
    "use strict";
    var i = n(3),
        o = { object: !0, function: !0, undefined: !0 };e.exports = function (e) {
      return !!i(e) && hasOwnProperty.call(o, typeof e === "undefined" ? "undefined" : _typeof(e));
    };
  }, function (e, t, n) {
    "use strict";
    e.exports = n(14)() ? Object.assign : n(15);
  }, function (e, t, n) {
    "use strict";
    e.exports = function () {
      var e,
          t = Object.assign;return "function" == typeof t && (t(e = { foo: "raz" }, { bar: "dwa" }, { trzy: "trzy" }), e.foo + e.bar + e.trzy === "razdwatrzy");
    };
  }, function (e, t, n) {
    "use strict";
    var i = n(16),
        o = n(20),
        r = Math.max;e.exports = function (e, t) {
      var n,
          a,
          s,
          l = r(arguments.length, 2);for (e = Object(o(e)), s = function s(i) {
        try {
          e[i] = t[i];
        } catch (e) {
          n || (n = e);
        }
      }, a = 1; a < l; ++a) {
        i(t = arguments[a]).forEach(s);
      }if (void 0 !== n) throw n;return e;
    };
  }, function (e, t, n) {
    "use strict";
    e.exports = n(17)() ? Object.keys : n(18);
  }, function (e, t, n) {
    "use strict";
    e.exports = function () {
      try {
        return Object.keys("primitive"), !0;
      } catch (e) {
        return !1;
      }
    };
  }, function (e, t, n) {
    "use strict";
    var i = n(2),
        o = Object.keys;e.exports = function (e) {
      return o(i(e) ? Object(e) : e);
    };
  }, function (e, t, n) {
    "use strict";
    e.exports = function () {};
  }, function (e, t, n) {
    "use strict";
    var i = n(2);e.exports = function (e) {
      if (!i(e)) throw new TypeError("Cannot use null or undefined");return e;
    };
  }, function (e, t, n) {
    "use strict";
    var i = n(2),
        o = Array.prototype.forEach,
        r = Object.create,
        a = function a(e, t) {
      var n;for (n in e) {
        t[n] = e[n];
      }
    };e.exports = function (e) {
      var t = r(null);return o.call(arguments, function (e) {
        i(e) && a(Object(e), t);
      }), t;
    };
  }, function (e, t, n) {
    "use strict";
    e.exports = n(23)() ? String.prototype.contains : n(24);
  }, function (e, t, n) {
    "use strict";
    var i = "razdwatrzy";e.exports = function () {
      return "function" == typeof i.contains && !0 === i.contains("dwa") && !1 === i.contains("foo");
    };
  }, function (e, t, n) {
    "use strict";
    var i = String.prototype.indexOf;e.exports = function (e) {
      return i.call(this, e, arguments[1]) > -1;
    };
  }, function (e, t, n) {
    "use strict";
    e.exports = function (e) {
      if ("function" != typeof e) throw new TypeError(e + " is not a function");return e;
    };
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var i = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
      }return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
      };
    }();var o = "undefined" != typeof window && window.location.href.indexOf("danmu-debug") > -1,
        r = function () {
      function e(t) {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.constructorName = t || "";
      }return i(e, [{ key: "info", value: function value(e) {
          for (var t, n = arguments.length, i = Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++) {
            i[r - 1] = arguments[r];
          }o && (t = console).log.apply(t, ["[Danmu Log][" + this.constructorName + "]", e].concat(i));
        } }]), e;
    }();t.default = r, e.exports = t.default;
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var i = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
      }return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
      };
    }(),
        o = s(n(1)),
        r = s(n(0)),
        a = s(n(28));function s(e) {
      return e && e.__esModule ? e : { default: e };
    }var l = function (e) {
      function t(e) {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, t);var n = function (e, t) {
          if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && "function" != typeof t ? e : t;
        }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));return n.setLogger("control"), n.danmu = e, n.main = new a.default(e), e.config.defaultOff || n.main.start(), n;
      }return function (e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : _typeof(t)));e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
      }(t, e), i(t, [{ key: "createSwitch", value: function value() {
          var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];return this.logger && this.logger.info("createSwitch"), this.switchBtn = r.default.createDom("dk-switch", '<span class="txt">弹</span>', {}, "danmu-switch " + (e ? "danmu-switch-active" : "")), this.switchBtn;
        } }, { key: "destroy", value: function value() {
          for (var e in this.logger && this.logger.info("destroy"), this.main.destroy(), this) {
            delete this[e];
          }
        } }]), t;
    }(o.default);t.default = l, e.exports = t.default;
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var i = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
      }return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
      };
    }(),
        o = l(n(1)),
        r = l(n(29)),
        a = l(n(30)),
        s = l(n(0));function l(e) {
      return e && e.__esModule ? e : { default: e };
    }var u = function (e) {
      function t(e) {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, t);var n = function (e, t) {
          if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && "function" != typeof t ? e : t;
        }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));n.setLogger("main"), n.danmu = e, n.container = e.container, n.channel = new r.default(e), n.data = [].concat(e.config.comments), n.playedData = [], n.queue = [], n.timer = null, n.retryTimer = null, n.retryStatus = "normal", n.interval = e.config.interval || 2e3, n.status = "idle", s.default.on(e, "bullet_remove", n.updateQueue.bind(n), "destroy");var i = n;return s.default.on(n.danmu, "changeDirection", function (e) {
          i.danmu.direction = e;
        }, "destroy"), n.nums = 0, n;
      }return function (e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : _typeof(t)));e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
      }(t, e), i(t, [{ key: "destroy", value: function value() {
          for (var e in this.logger && this.logger.info("destroy"), clearTimeout(this.dataHandleTimer), this.channel.destroy(), this.data = [], this) {
            delete this[e];
          }
        } }, { key: "updateQueue", value: function value(e) {
          this.logger && this.logger.info("updateQueue");var t = this;t.queue.some(function (n, i) {
            return n.id === e.bullet.id && (t.queue.splice(i, 1), !0);
          }), t.data.some(function (t, n) {
            return t.id === e.bullet.id && (t.hasAttached = !1, !0);
          });
        } }, { key: "init", value: function value(e, t) {
          t.logger && t.logger.info("init"), t || (t = this), t.retryStatus = "normal", t.data.sort(function (e, t) {
            return e.start - t.start;
          });t.retryTimer || function e() {
            "closed" === t.status && "stop" === t.retryStatus || ("playing" === t.status && (t.readData(), t.dataHandle()), "stop" === t.retryStatus && "paused" !== t.status || (t.dataHandleTimer = setTimeout(function () {
              e();
            }, t.interval - 1e3)));
          }();
        } }, { key: "start", value: function value() {
          this.logger && this.logger.info("start");this.status = "playing", this.queue = [], this.container.innerHTML = "", this.channel.resetWithCb(this.init, this);
        } }, { key: "stop", value: function value() {
          this.logger && this.logger.info("stop");this.status = "closed", this.retryTimer = null, this.retryStatus = "stop", this.channel.reset(), this.queue = [], this.container.innerHTML = "";
        } }, { key: "clear", value: function value() {
          this.logger && this.logger.info("clear"), this.channel.reset(), this.data = [], this.queue = [], this.container.innerHTML = "";
        } }, { key: "play", value: function value() {
          var e = this;this.logger && this.logger.info("play"), this.status = "playing";var t = this.channel.channels,
              n = this.danmu.container.getBoundingClientRect();t && t.length > 0 && ["scroll", "top", "bottom"].forEach(function (i) {
            e.queue.forEach(function (e) {
              e.startMove(n), e.resized = !0;
            });for (var o = 0; o < t.length; o++) {
              t[o].queue[i].forEach(function (e) {
                e.resized = !1;
              });
            }
          });
        } }, { key: "pause", value: function value() {
          this.logger && this.logger.info("pause"), this.status = "paused";var e = this.channel.channels,
              t = this.danmu.container.getBoundingClientRect();e && e.length > 0 && this.queue.forEach(function (e) {
            e.pauseMove(t);
          });
        } }, { key: "dataHandle", value: function value() {
          var e = this;"paused" !== this.status && "closed" !== this.status && e.queue.length && e.queue.forEach(function (t) {
            "waiting" === t.status && t.startMove(e.channel.containerPos);
          });
        } }, { key: "readData", value: function value() {
          var e = this,
              t = this.danmu;if (t.isReady) {
            var n = 0;t.player && t.player.currentTime && (n = s.default.formatTime(t.player.currentTime));var i = void 0,
                o = e.interval,
                r = e.channel,
                l = void 0;t.player ? (l = e.data.filter(function (t) {
              return !t.start && e.danmu.hideArr.indexOf(t.mode) < 0 && (!t.color || e.danmu.hideArr.indexOf("color") < 0) && (t.start = n), e.danmu.hideArr.indexOf(t.mode) < 0 && (!t.color || e.danmu.hideArr.indexOf("color") < 0) && t.start - o <= n && n <= t.start + o;
            }), t.live && (e.data = [])) : 0 === (l = e.data.splice(0, 1)).length && (l = e.playedData.splice(0, 1)), l.length > 0 && l.forEach(function (n) {
              if (e.forceDuration && e.forceDuration != n.duration && (n.duration = e.forceDuration), i = new a.default(t, n), n.hasAttached) {
                for (var o in i.detach(), i) {
                  delete i[o];
                }i = null, n.hasAttached = !1, n.noDiscard && (n.prior ? e.data.unshift(n) : e.data.push(n));
              } else if (i.attach(), n.hasAttached = !0, r.addBullet(i).result) e.queue.push(i), e.nums++, i.topInit();else {
                for (var s in i.detach(), i) {
                  delete i[s];
                }i = null, n.hasAttached = !1, n.noDiscard && (n.prior ? e.data.unshift(n) : e.data.push(n));
              }
            });
          }
        } }]), t;
    }(o.default);t.default = u, e.exports = t.default;
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var i = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
      }return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
      };
    }(),
        o = a(n(1)),
        r = a(n(0));function a(e) {
      return e && e.__esModule ? e : { default: e };
    }var s = function (e) {
      function t(e) {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, t);var n = function (e, t) {
          if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && "function" != typeof t ? e : t;
        }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));n.setLogger("channel"), n.danmu = e, n.reset(!0);var i = n;return r.default.on(n.danmu, "bullet_remove", function (e) {
          i.removeBullet(e.bullet);
        }, "destroy"), n.direction = e.direction, r.default.on(n.danmu, "changeDirection", function (e) {
          i.direction = e;
        }, "destroy"), n.containerPos = n.danmu.container.getBoundingClientRect(), n.containerWidth = n.containerPos.width, n.containerHeight = n.containerPos.height, n.containerLeft = n.containerPos.left, n.containerRight = n.containerPos.right, r.default.on(n.danmu, "channel_resize", function () {
          i.containerPos = i.danmu.container.getBoundingClientRect(), i.resizing || (i.containerWidth = i.containerPos.width, i.containerHeight = i.containerPos.height, i.containerLeft = i.containerPos.left, i.containerRight = i.containerPos.right, i.resize(!0));
        }, "destroy"), n;
      }return function (e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : _typeof(t)));e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
      }(t, e), i(t, [{ key: "destroy", value: function value() {
          for (var e in this.logger && this.logger.info("destroy"), clearTimeout(this.resizeTimer), this.channels = [], this) {
            delete this[e];
          }
        } }, { key: "resize", value: function value() {
          var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];this.logger && this.logger.info("resize");var t = this.danmu.container,
              n = this;n.resizing || (n.resizing = !0, this.resizeTimer = setTimeout(function () {
            n.danmu.bulletBtn.main.data && n.danmu.bulletBtn.main.data.forEach(function (e) {
              e.bookChannelId && (delete e.bookChannelId, n.logger && n.logger.info("resize导致" + e.id + "号优先弹幕预定取消"));
            }), n.logger && n.logger.info("resize导致所有轨道恢复正常使用");var i = t.getBoundingClientRect();n.width = i.width, n.height = i.height, n.danmu.config.area && n.danmu.config.area.start >= 0 && n.danmu.config.area.end >= n.danmu.config.area.start && ("b2t" === n.direction ? n.width = n.width * (n.danmu.config.area.end - n.danmu.config.area.start) : n.height = n.height * (n.danmu.config.area.end - n.danmu.config.area.start)), n.container = t;var o = n.danmu.config.channelSize || (/mobile/gi.test(navigator.userAgent) ? 10 : 12),
                r = void 0;r = "b2t" === n.direction ? Math.floor(n.width / o) : Math.floor(n.height / o);for (var a = [], s = 0; s < r; s++) {
              a[s] = { id: s, queue: { scroll: [], top: [], bottom: [] }, operating: { scroll: !1, top: !1, bottom: !1 }, bookId: {} };
            }if (n.channels && n.channels.length <= a.length) {
              for (var l = function l(t) {
                a[t] = { id: t, queue: { scroll: [], top: [], bottom: [] }, operating: { scroll: !1, top: !1, bottom: !1 }, bookId: {} }, ["scroll", "top"].forEach(function (i) {
                  n.channels[t].queue[i].forEach(function (o) {
                    o.el && (a[t].queue[i].push(o), o.resized || (o.pauseMove(n.containerPos, e), "paused" !== o.danmu.bulletBtn.main.status && o.startMove(n.containerPos), o.resized = !0));
                  });
                }), n.channels[t].queue.bottom.forEach(function (i) {
                  if (i.el) {
                    if (a[t + a.length - n.channels.length].queue.bottom.push(i), i.channel_id[0] + i.channel_id[1] - 1 === t) {
                      var r = [].concat(i.channel_id);i.channel_id = [r[0] - n.channels.length + a.length, r[1]], i.top = i.channel_id[0] * o, n.danmu.config.area && n.danmu.config.area.start && (i.top += n.containerHeight * n.danmu.config.area.start), i.topInit();
                    }i.resized || (i.pauseMove(n.containerPos, e), "paused" !== i.danmu.bulletBtn.main.status && i.startMove(n.containerPos), i.resized = !0);
                  }
                });
              }, u = 0; u < n.channels.length; u++) {
                l(u);
              }for (var c = function c(e) {
                ["scroll", "top", "bottom"].forEach(function (t) {
                  a[e].queue[t].forEach(function (e) {
                    e.resized = !1;
                  });
                });
              }, f = 0; f < a.length; f++) {
                c(f);
              }n.channels = a, "b2t" === n.direction ? n.channelWidth = o : n.channelHeight = o;
            } else if (n.channels && n.channels.length > a.length) {
              for (var h = function h(t) {
                a[t] = { id: t, queue: { scroll: [], top: [], bottom: [] }, operating: { scroll: !1, top: !1, bottom: !1 }, bookId: {} }, ["scroll", "top", "bottom"].forEach(function (i) {
                  if ("top" === i && t > Math.floor(a.length / 2)) ;else if ("bottom" === i && t <= Math.floor(a.length / 2)) ;else {
                    var r = "bottom" === i ? t - a.length + n.channels.length : t;n.channels[r].queue[i].forEach(function (s, l) {
                      if (s.el) {
                        if (a[t].queue[i].push(s), "bottom" === i && s.channel_id[0] + s.channel_id[1] - 1 === r) {
                          var u = [].concat(s.channel_id);s.channel_id = [u[0] - n.channels.length + a.length, u[1]], s.top = s.channel_id[0] * o, n.danmu.config.area && n.danmu.config.area.start && (s.top += n.containerHeight * n.danmu.config.area.start), s.topInit();
                        }s.pauseMove(n.containerPos, e), "paused" !== s.danmu.bulletBtn.main.status && s.startMove(n.containerPos), s.resized || (s.resized = !0);
                      }n.channels[r].queue[i].splice(l, 1);
                    });
                  }
                });
              }, d = 0; d < a.length; d++) {
                h(d);
              }for (var g = function g(e) {
                ["scroll", "top", "bottom"].forEach(function (t) {
                  a[e].queue[t].forEach(function (e) {
                    e.resized = !1;
                  });
                });
              }, p = 0; p < a.length; p++) {
                g(p);
              }n.channels = a, "b2t" === n.direction ? n.channelWidth = o : n.channelHeight = o;
            }n.resizing = !1;
          }, 10));
        } }, { key: "addBullet", value: function value(e) {
          var t = this,
              n = this.danmu,
              i = this.channels,
              o = void 0,
              r = void 0,
              a = void 0;if ("b2t" === t.direction ? (r = this.channelWidth, a = Math.ceil(e.width / r)) : (o = this.channelHeight, a = Math.ceil(e.height / o)), a > i.length) return { result: !1, message: "exceed channels.length, occupy=" + a + ",channelsSize=" + i.length };for (var s = !0, l = void 0, u = -1, c = 0, f = i.length; c < f; c++) {
            if (i[c].queue[e.mode].some(function (t) {
              return t.id === e.id;
            })) return { result: !1, message: "exsited, channelOrder=" + c + ",danmu_id=" + e.id };
          }if ("scroll" === e.mode) for (var h = 0, d = i.length - a; h <= d; h++) {
            s = !0;for (var g = h; g < h + a; g++) {
              if ((l = i[g]).operating.scroll) {
                s = !1;break;
              }if (l.bookId.scroll && l.bookId.scroll !== e.id) {
                s = !1;break;
              }l.operating.scroll = !0;var p = l.queue.scroll[0];if (p) {
                var m = p.el.getBoundingClientRect();if ("b2t" === t.direction) {
                  if (m.bottom > t.containerPos.bottom) {
                    s = !1, l.operating.scroll = !1;break;
                  }
                } else if (m.right > t.containerPos.right) {
                  s = !1, l.operating.scroll = !1;break;
                }var v,
                    b = void 0,
                    y = void 0,
                    w = void 0,
                    _ = void 0;if ("b2t" === t.direction ? (y = (m.top - t.containerPos.top + m.height) / (b = (t.containerPos.height + m.height) / p.duration), w = t.containerPos.height, _ = (t.containerPos.height + e.height) / e.duration) : (y = (m.left - t.containerPos.left + m.width) / (b = (t.containerPos.width + m.width) / p.duration), w = t.containerPos.width, _ = (t.containerPos.width + e.width) / e.duration), v = w / _, n.config.bOffset || (n.config.bOffset = 0), b < _ && y + n.config.bOffset > v) {
                  s = !1, l.operating.scroll = !1;break;
                }
              }l.operating.scroll = !1;
            }if (s) {
              u = h;break;
            }
          } else if ("top" === e.mode) for (var O = 0, k = i.length - a; O <= k; O++) {
            s = !0;for (var x = O; x < O + a; x++) {
              if (x > Math.floor(i.length / 2)) {
                s = !1;break;
              }if ((l = i[x]).operating[e.mode]) {
                s = !1;break;
              }if ((l.bookId[e.mode] || e.prior) && l.bookId[e.mode] !== e.id) {
                s = !1;break;
              }if (l.operating[e.mode] = !0, l.queue[e.mode].length > 0) {
                s = !1, l.operating[e.mode] = !1;break;
              }l.operating[e.mode] = !1;
            }if (s) {
              u = O;break;
            }
          } else if ("bottom" === e.mode) for (var M = i.length - a; M >= 0; M--) {
            s = !0;for (var C = M; C < M + a; C++) {
              if (C <= Math.floor(i.length / 2)) {
                s = !1;break;
              }if ((l = i[C]).operating[e.mode]) {
                s = !1;break;
              }if ((l.bookId[e.mode] || e.prior) && l.bookId[e.mode] !== e.id) {
                s = !1;break;
              }if (l.operating[e.mode] = !0, l.queue[e.mode].length > 0) {
                s = !1, l.operating[e.mode] = !1;break;
              }l.operating[e.mode] = !1;
            }if (s) {
              u = M;break;
            }
          }if (-1 !== u) {
            for (var E = u, j = u + a; E < j; E++) {
              (l = i[E]).operating[e.mode] = !0, l.queue[e.mode].unshift(e), e.prior && (delete l.bookId[e.mode], t.logger && t.logger.info(E + "号轨道恢复正常使用")), l.operating[e.mode] = !1;
            }if (e.prior) if (t.logger && t.logger.info(e.id + "号优先弹幕运行完毕"), delete e.bookChannelId, n.player) n.bulletBtn.main.data.some(function (t) {
              return t.id === e.id && (delete t.bookChannelId, !0);
            });return e.channel_id = [u, a], "b2t" === t.direction ? (e.top = u * r, t.danmu.config.area && t.danmu.config.area.start && (e.top += t.containerWidth * t.danmu.config.area.start)) : (e.top = u * o, t.danmu.config.area && t.danmu.config.area.start && (e.top += t.containerHeight * t.danmu.config.area.start)), { result: e, message: "success" };
          }if (e.options.realTime) {
            var B = 0,
                T = -1,
                P = null;if (t.danmu.bulletBtn.main.queue.forEach(function (e, n) {
              !e.prior && !e.options.realTime && e.el && e.el.getBoundingClientRect().left > t.containerPos.right && e.start >= B && (B = e.start, T = n, P = e);
            }), P) {
              P.remove(), t.removeBullet(P), t.danmu.bulletBtn.main.queue.splice(T, 1), e.channel_id = P.channel_id;for (var z = P.channel_id[0], S = P.channel_id[0] + P.channel_id[1]; z < S; z++) {
                (l = i[z]).operating[e.mode] = !0, l.queue[e.mode].unshift(e), e.prior && delete l.bookId[e.mode], l.operating[e.mode] = !1;
              }return e.top = P.top, t.danmu.config.area && t.danmu.config.area.start && (e.top += t.containerHeight * t.danmu.config.area.start), { result: e, message: "success" };
            }
          }if (e.prior) if (e.bookChannelId || t.danmu.live) {
            if (n.player) n.bulletBtn.main.data.some(function (n) {
              return n.id === e.id && (t.logger && t.logger.info(e.id + "号优先弹幕将于2秒后再次请求注册"), n.start += 2e3, !0);
            });
          } else {
            u = -1;for (var L = 0, D = i.length - a; L <= D; L++) {
              s = !0;for (var q = L; q < L + a; q++) {
                if (i[q].bookId[e.mode]) {
                  s = !1;break;
                }
              }if (s) {
                u = L;break;
              }
            }if (-1 !== u) {
              for (var R = u; R < u + a; R++) {
                i[R].bookId[e.mode] = e.id, t.logger && t.logger.info(R + "号轨道被" + e.id + "号优先弹幕预定");
              }if (n.player) n.bulletBtn.main.data.some(function (n) {
                return n.id === e.id && (t.logger && t.logger.info(e.id + "号优先弹幕将于2秒后再次请求注册"), n.start += 2e3, n.bookChannelId = [u, a], t.logger && t.logger.info(e.id + "号优先弹幕预定了" + u + "~" + (u + a - 1) + "号轨道"), !0);
              });
            }
          }return { result: !1, message: "no surplus will right" };
        } }, { key: "removeBullet", value: function value(e) {
          this.logger && this.logger.info("removeBullet " + (e.options.txt || "[DOM Element]"));for (var t = this.channels, n = e.channel_id, i = void 0, o = n[0], r = n[0] + n[1]; o < r; o++) {
            if (i = t[o]) {
              i.operating[e.mode] = !0;var a = -1;i.queue[e.mode].some(function (t, n) {
                return t.id === e.id && (a = n, !0);
              }), a > -1 && i.queue[e.mode].splice(a, 1), i.operating[e.mode] = !1;
            }
          }e.options.loop && this.danmu.bulletBtn.main.playedData.push(e.options);
        } }, { key: "resetArea", value: function value() {
          this.logger && this.logger.info("resetArea");var e = this.danmu.container,
              t = this,
              n = e.getBoundingClientRect();t.width = n.width, t.height = n.height, t.danmu.config.area && t.danmu.config.area.start >= 0 && t.danmu.config.area.end >= t.danmu.config.area.start && ("b2t" === t.direction ? t.width = t.width * (t.danmu.config.area.end - t.danmu.config.area.start) : t.height = t.height * (t.danmu.config.area.end - t.danmu.config.area.start)), t.container = e;var i = t.danmu.config.channelSize || (/mobile/gi.test(navigator.userAgent) ? 10 : 12),
              o = void 0;o = "b2t" === t.direction ? Math.floor(t.width / i) : Math.floor(t.height / i);for (var r = [], a = 0; a < o; a++) {
            r[a] = { id: a, queue: { scroll: [], top: [], bottom: [] }, operating: { scroll: !1, top: !1, bottom: !1 }, bookId: {} };
          }if (t.channels && t.channels.length <= r.length) {
            for (var s = function s(e) {
              r[e] = { id: e, queue: { scroll: [], top: [], bottom: [] }, operating: { scroll: !1, top: !1, bottom: !1 }, bookId: {} }, ["scroll", "top"].forEach(function (n) {
                t.channels[e].queue[n].forEach(function (i) {
                  i.el && (r[e].queue[n].push(i), i.resized || (i.pauseMove(t.containerPos, !1), i.startMove(t.containerPos), i.resized = !0));
                });
              }), t.channels[e].queue.bottom.forEach(function (n) {
                if (n.el) {
                  if (r[e + r.length - t.channels.length].queue.bottom.push(n), n.channel_id[0] + n.channel_id[1] - 1 === e) {
                    var o = [].concat(n.channel_id);n.channel_id = [o[0] - t.channels.length + r.length, o[1]], n.top = n.channel_id[0] * i, t.danmu.config.area && t.danmu.config.area.start && (n.top += t.containerHeight * t.danmu.config.area.start), n.topInit();
                  }n.resized || (n.pauseMove(t.containerPos, !1), n.startMove(t.containerPos), n.resized = !0);
                }
              });
            }, l = 0; l < t.channels.length; l++) {
              s(l);
            }for (var u = function u(e) {
              ["scroll", "top", "bottom"].forEach(function (t) {
                r[e].queue[t].forEach(function (e) {
                  e.resized = !1;
                });
              });
            }, c = 0; c < r.length; c++) {
              u(c);
            }t.channels = r, "b2t" === t.direction ? t.channelWidth = i : t.channelHeight = i;
          } else if (t.channels && t.channels.length > r.length) {
            for (var f = function f(e) {
              r[e] = { id: e, queue: { scroll: [], top: [], bottom: [] }, operating: { scroll: !1, top: !1, bottom: !1 }, bookId: {} }, ["scroll", "top", "bottom"].forEach(function (n) {
                if ("top" === n && e > Math.floor(r.length / 2)) ;else if ("bottom" === n && e <= Math.floor(r.length / 2)) ;else {
                  var o = "bottom" === n ? e - r.length + t.channels.length : e;t.channels[o].queue[n].forEach(function (a, s) {
                    if (a.el) {
                      if (r[e].queue[n].push(a), "bottom" === n && a.channel_id[0] + a.channel_id[1] - 1 === o) {
                        var l = [].concat(a.channel_id);a.channel_id = [l[0] - t.channels.length + r.length, l[1]], a.top = a.channel_id[0] * i, t.danmu.config.area && t.danmu.config.area.start && (a.top += t.containerHeight * t.danmu.config.area.start), a.topInit();
                      }a.resized || (a.pauseMove(t.containerPos, !1), a.startMove(t.containerPos), a.resized = !0);
                    }t.channels[o].queue[n].splice(s, 1);
                  });
                }
              });
            }, h = 0; h < r.length; h++) {
              f(h);
            }for (var d = function d(e) {
              ["scroll", "top", "bottom"].forEach(function (t) {
                r[e].queue[t].forEach(function (e) {
                  e.resized = !1;
                });
              });
            }, g = 0; g < r.length; g++) {
              d(g);
            }t.channels = r, "b2t" === t.direction ? t.channelWidth = i : t.channelHeight = i;
          }
        } }, { key: "reset", value: function value() {
          var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];this.logger && this.logger.info("reset");var t = this.danmu.container,
              n = this;function i() {
            var e = t.getBoundingClientRect();n.width = e.width, n.height = e.height, n.danmu.config.area && n.danmu.config.area.start >= 0 && n.danmu.config.area.end >= n.danmu.config.area.start && ("b2t" === n.direction ? n.width = n.width * (n.danmu.config.area.end - n.danmu.config.area.start) : n.height = n.height * (n.danmu.config.area.end - n.danmu.config.area.start)), n.container = t;var i = n.danmu.config.channelSize || (/mobile/gi.test(navigator.userAgent) ? 10 : 12),
                o = void 0;o = "b2t" === n.direction ? Math.floor(n.width / i) : Math.floor(n.height / i);for (var r = [], a = 0; a < o; a++) {
              r[a] = { id: a, queue: { scroll: [], top: [], bottom: [] }, operating: { scroll: !1, top: !1, bottom: !1 }, bookId: {} };
            }n.channels = r, "b2t" === n.direction ? n.channelWidth = i : n.channelHeight = i;
          }n.danmu.bulletBtn && n.danmu.bulletBtn.main && n.danmu.bulletBtn.main.queue.forEach(function (e) {
            e.pauseMove(n.containerPos), e.remove();
          }), n.channels && n.channels.length > 0 && ["scroll", "top", "bottom"].forEach(function (e) {
            for (var t = 0; t < n.channels.length; t++) {
              n.channels[t].queue[e].forEach(function (e) {
                e.pauseMove(n.containerPos), e.remove();
              });
            }
          }), n.danmu.bulletBtn && n.danmu.bulletBtn.main && n.danmu.bulletBtn.main.data && n.danmu.bulletBtn.main.data.forEach(function (e) {
            e.hasAttached = !1;
          }), e ? this.resetTimer = setTimeout(i, 200) : i();
        } }, { key: "resetWithCb", value: function value(e, t) {
          this.logger && this.logger.info("resetWithCb");var n = this.danmu.container,
              i = this;i.channels && i.channels.length > 0 && ["scroll", "top", "bottom"].forEach(function (e) {
            for (var t = 0; t < i.channels.length; t++) {
              i.channels[t].queue[e].forEach(function (e) {
                e.pauseMove(i.containerPos), e.remove();
              });
            }
          });var o = n.getBoundingClientRect();i.width = o.width, i.height = o.height, i.danmu.config.area && i.danmu.config.area.start >= 0 && i.danmu.config.area.end >= i.danmu.config.area.start && ("b2t" === i.direction ? i.width = i.width * (i.danmu.config.area.end - i.danmu.config.area.start) : i.height = i.height * (i.danmu.config.area.end - i.danmu.config.area.start)), i.container = n;var r = i.danmu.config.channelSize || (/mobile/gi.test(navigator.userAgent) ? 10 : 12),
              a = void 0;a = "b2t" === i.direction ? Math.floor(i.width / r) : Math.floor(i.height / r);for (var s = [], l = 0; l < a; l++) {
            s[l] = { id: l, queue: { scroll: [], top: [], bottom: [] }, operating: { scroll: !1, top: !1, bottom: !1 }, bookId: {} };
          }i.channels = s, i.channelHeight = r, e && e(!0, t);
        } }]), t;
    }(o.default);t.default = s, e.exports = t.default;
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var i = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
      }return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
      };
    }(),
        o = a(n(1)),
        r = a(n(0));function a(e) {
      return e && e.__esModule ? e : { default: e };
    }var s = function (e) {
      function t(e, n) {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, t);var i = function (e, t) {
          if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !t || "object" != (typeof t === "undefined" ? "undefined" : _typeof(t)) && "function" != typeof t ? e : t;
        }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));i.setLogger("bullet"), i.danmu = e, i.options = n, i.duration = n.duration, i.moveV = n.moveV, i.id = n.id, i.container = e.container, i.start = n.start, i.prior = n.prior, i.color = n.color, i.bookChannelId = n.bookChannelId, i.direction = e.direction;var o = i;i.onChangeDirection = function (e) {
          o.direction = e;
        }, i.danmu.on("changeDirection", i.onChangeDirection);var a = void 0;if (i.domObj = e.domObj, n.el && 1 === n.el.nodeType) {
          a = i.domObj.use();var s = r.default.copyDom(n.el);n.eventListeners && n.eventListeners.length > 0 && n.eventListeners.forEach(function (e) {
            s.addEventListener(e.event, e.listener, e.useCapture || !1);
          }), a.appendChild(s);
        } else (a = i.domObj.use()).textContent = n.txt;if (n.style) {
          var l = n.style;Object.keys(l).forEach(function (e) {
            r.default.style(a, e, l[e]);
          });
        }"top" === n.mode || "bottom" === n.mode ? i.mode = n.mode : i.mode = "scroll", i.el = a, n.like && n.like.el && i.setLikeDom(n.like.el, n.like.style), i.status = "waiting";var u = i.container.getBoundingClientRect(),
            c = Math.floor(Math.random() * (u.width / 10 > 100 ? 200 : u.width / 10));n.realTime && (c = 0);var f = u.width + c + "px";return r.default.style(i.el, "left", f), i.containerPos = u, i;
      }return function (e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + (typeof t === "undefined" ? "undefined" : _typeof(t)));e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
      }(t, e), i(t, [{ key: "attach", value: function value() {
          if (this.container.appendChild(this.el), this.elPos = this.el.getBoundingClientRect(), "b2t" === this.direction ? (this.width = this.elPos.height, this.height = this.elPos.width) : (this.width = this.elPos.width, this.height = this.elPos.height), this.moveV) {
            var e = this.containerPos;this.duration = (e.width + this.width) / this.moveV * 1e3;
          }this.danmu.config && this.danmu.config.mouseControl && (this.mouseoverFunWrapper = this.mouseoverFun.bind(this), this.el.addEventListener("mouseover", this.mouseoverFunWrapper, !1)), this.danmu.config && this.danmu.config.mouseEnterControl && (this.mouseEnterFunWrapper = this.mouseoverFun.bind(this), this.el.addEventListener("mouseenter", this.mouseEnterFunWrapper, !1));
        } }, { key: "mouseoverFun", value: function value(e) {
          this.danmu && this.danmu.mouseControl && this.danmu.config.mouseControlPause || "waiting" === this.status || "end" === this.status || this.danmu && this.danmu.emit("bullet_hover", { bullet: this, event: e });
        } }, { key: "detach", value: function value() {
          this.el && (this.danmu.config && this.danmu.config.mouseControl && this.el.removeEventListener("mouseover", this.mouseoverFunWrapper, !1), this.danmu.config && this.danmu.config.mouseEnterControl && this.el.removeEventListener("mouseenter", this.mouseEnterFunWrapper, !1), this.el.parentNode && this.el.parentNode.removeChild(this.el), this.domObj.unuse(this.el), this.el = null), this.danmu.off("changeDirection", this.onChangeDirection);
        } }, { key: "topInit", value: function value() {
          if (this.logger && this.logger.info("topInit #" + (this.options.txt || "[DOM Element]") + "#"), "b2t" === this.direction) {
            var e = this.containerPos;r.default.style(this.el, "transformOrigin", "left top"), r.default.style(this.el, "transform", "translateX(-" + this.top + "px) translateY(" + e.height + "px) translateZ(0px) rotate(90deg)"), r.default.style(this.el, "transition", "transform 0s linear 0s");
          } else r.default.style(this.el, "top", this.top + "px");
        } }, { key: "pauseMove", value: function value(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];this.logger && this.logger.info("pauseMove #" + (this.options.txt || "[DOM Element]") + "#");var n = this;if ("paused" !== this.status && ("forcedPause" !== n.status && (this.status = "paused"), clearTimeout(n.removeTimer), this.el)) if (r.default.style(this.el, "willChange", "auto"), "scroll" === this.mode) {
            if (t) {
              var i = (new Date().getTime() - n.moveTime) / 1e3,
                  o = i * this.moveV,
                  a = 0;a = n.moveMoreS - o >= 0 ? "b2t" === this.direction ? (n.moveMoreS - o) / n.moveContainerHeight * e.height : (n.moveMoreS - o) / n.moveContainerWidth * e.width : n.moveMoreS - o, "b2t" === this.direction ? r.default.style(this.el, "transform", "translateX(-" + this.top + "px) translateY(" + a + "px) translateZ(0px) rotate(90deg)") : r.default.style(this.el, "left", a + "px");
            } else "b2t" === this.direction ? r.default.style(this.el, "transform", "translateX(-" + this.top + "px) translateY(" + (this.el.getBoundingClientRect().top - e.top) + "px) translateZ(0px) rotate(90deg)") : r.default.style(this.el, "left", this.el.getBoundingClientRect().left - e.left + "px");"b2t" === this.direction || r.default.style(this.el, "transform", "translateX(0px) translateY(0px) translateZ(0px)"), r.default.style(this.el, "transition", "transform 0s linear 0s");
          } else this.pastDuration && this.startTime ? this.pastDuration = this.pastDuration + new Date().getTime() - this.startTime : this.pastDuration = 1;
        } }, { key: "startMove", value: function value(e, t) {
          this.logger && this.logger.info("startMove #" + (this.options.txt || "[DOM Element]") + "#");var n = this;if (n.hasMove || (n.danmu.emit("bullet_start", n), n.hasMove = !0), ("forcedPause" !== n.status || t) && this.el && "start" !== this.status) if (this.status = "start", r.default.style(this.el, "willChange", "transform"), "scroll" === this.mode) {
            if ("b2t" === this.direction) {
              this.moveV = (e.height + this.height) / this.duration * 1e3;var i = (n.el.getBoundingClientRect().bottom - e.top) / this.moveV;r.default.style(this.el, "transition", "transform " + i + "s linear 0s"), this.startMoveTimer = setTimeout(function () {
                n.el && (r.default.style(n.el, "transform", "translateX(-" + n.top + "px) translateY(-" + n.height + "px) translateZ(0px) rotate(90deg)"), n.moveTime = new Date().getTime(), n.moveMoreS = n.el.getBoundingClientRect().top - e.top, n.moveContainerHeight = e.height, n.removeTimer = setTimeout(l, 1e3 * i));
              }, 20);
            } else {
              var o = this.el.getBoundingClientRect();this.moveV = (e.width + this.width) / this.duration * 1e3;var a = (o.right - e.left) / this.moveV;r.default.style(this.el, "transition", "transform " + a + "s linear 0s"), this.startMoveTimer = setTimeout(function () {
                if (n.el) {
                  var t = n.el.getBoundingClientRect(),
                      i = (t.right - e.left) / a;t.right > e.left && i > n.moveV - 1 && i < n.moveV + 1 ? (r.default.style(n.el, "transform", "translateX(-" + (t.right - e.left) + "px) translateY(0px) translateZ(0px)"), n.moveTime = new Date().getTime(), n.moveMoreS = t.left - e.left, n.moveContainerWidth = e.width, n.removeTimer = setTimeout(l, 1e3 * a)) : (n.status = "end", n.remove());
                }
              }, 0);
            }
          } else {
            r.default.style(this.el, "left", "50%"), r.default.style(this.el, "margin", "0 0 0 -" + this.width / 2 + "px"), this.pastDuration || (this.pastDuration = 1);var s = this.duration >= this.pastDuration ? this.duration - this.pastDuration : 0;this.removeTimer = setTimeout(l, s), this.startTime = new Date().getTime();
          }function l() {
            if (n.el) if ("scroll" === n.mode) {
              var e = n.containerPos,
                  t = n.el.getBoundingClientRect();"b2t" === n.direction ? t && t.bottom <= e.top + 100 ? (n.status = "end", n.remove()) : (n.pauseMove(e), "paused" !== n.danmu.bulletBtn.main.status && n.startMove(e)) : t && t.right <= e.left + 100 ? (n.status = "end", n.remove()) : (n.pauseMove(e), "paused" !== n.danmu.bulletBtn.main.status && n.startMove(e));
            } else n.status = "end", n.remove();
          }
        } }, { key: "remove", value: function value() {
          this.logger && this.logger.info("remove #" + (this.options.txt || "[DOM Element]") + "#");this.removeTimer && clearTimeout(this.removeTimer), this.startMoveTimer && clearTimeout(this.startMoveTimer), this.el && this.el.parentNode && (r.default.style(this.el, "willChange", "auto"), this.detach(), this.danmu.emit("bullet_remove", { bullet: this }));
        } }, { key: "setFontSize", value: function value(e) {
          this.el && (this.el.style.fontSize = e);
        } }, { key: "setLikeDom", value: function value(e, t) {
          if (e) {
            Object.keys(t).forEach(function (n) {
              e.style[n] = t[n];
            });if (e.className = "danmu-like", this.el) {
              var n = this.el.querySelector(".danmu-like");n && this.el.removeChild(n), this.el.innerHTML = "" + this.el.innerHTML + e.outerHTML;
            }
          }return e;
        } }]), t;
    }(o.default);t.default = s, e.exports = t.default;
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var i,
        o = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
      }return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
      };
    }(),
        r = n(0),
        a = (i = r) && i.__esModule ? i : { default: i };var s = function () {
      function e(t) {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), t = { initDOM: function initDOM() {
            return document.createElement("div");
          }, initSize: 10 }, this.init(t);
      }return o(e, [{ key: "init", value: function value(e) {
          this.idleList = [], this.usingList = [], this._id = 0, this.options = e, this._expand(e.initSize);
        } }, { key: "use", value: function value() {
          this.idleList.length || this._expand(1);var e = this.idleList.shift();return this.usingList.push(e), e;
        } }, { key: "unuse", value: function value(e) {
          var t = this.usingList.indexOf(e);t < 0 || (this.usingList.splice(t, 1), e.innerHTML = "", e.textcontent = "", this.clearElementStyle(e), this.idleList.push(e));
        } }, { key: "_expand", value: function value(e) {
          for (var t = 0; t < e; t++) {
            this.idleList.push(this.options.initDOM(this._id++));
          }
        } }, { key: "destroy", value: function value() {
          for (var e = 0; e < this.idleList.length; e++) {
            this.idleList[e].innerHTML = "", this.idleList[e].textcontent = "", this.clearElementStyle(this.idleList[e]);
          }for (var t = 0; t < this.usingList.length; t++) {
            this.usingList[t].innerHTML = "", this.usingList[t].textcontent = "", this.clearElementStyle(this.usingList[t]);
          }for (var n in this) {
            delete this[n];
          }
        } }, { key: "clearElementStyle", value: function value(e) {
          var t = "undefined" != typeof window ? window.navigator.userAgent : null;t && (t.indexOf("MSIE ") > -1 || t.indexOf("Trident/") > -1 ? a.default.style(e, "transform", "none") : e.setAttribute("style", ""));
        } }]), e;
    }();t.default = s, e.exports = t.default;
  }, function (e) {
    e.exports = JSON.parse('{"version":"0.5.10"}');
  }, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });var i = function () {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
        }
      }return function (t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
      };
    }();var o = new (function () {
      function e() {
        var t = this;if (function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.__handlers = [], window.ResizeObserver) try {
          this.observer = new window.ResizeObserver(function (e) {
            var n = new Date().getTime();n - t.timeStampe < 200 || (t.timeStampe = n, t.__trigger(e));
          }), this.timeStampe = new Date().getTime();
        } catch (e) {}
      }return i(e, [{ key: "addObserver", value: function value(e, t) {
          if (this.observer) {
            this.observer && this.observer.observe(e);for (var n = this.__handlers, i = -1, o = 0; o < n.length; o++) {
              n[o] && e === n[o].target && (i = o);
            }i > -1 ? this.__handlers[i].handler.push(t) : this.__handlers.push({ target: e, handler: [t] });
          }
        } }, { key: "unObserver", value: function value(e) {
          var t = -1;this.__handlers.map(function (n, i) {
            e === n.target && (t = i);
          }), this.observer && this.observer.unobserve(e), t > -1 && this.__handlers.splice(t, 1);
        } }, { key: "destroyObserver", value: function value() {
          this.observer && this.observer.disconnect(), this.observer = null, this.__handlers = null;
        } }, { key: "__runHandler", value: function value(e) {
          for (var t = this.__handlers, n = 0; n < t.length; n++) {
            if (t[n] && e === t[n].target) {
              t[n].handler && t[n].handler.map(function (e) {
                try {
                  e();
                } catch (e) {
                  console.error(e);
                }
              });break;
            }
          }
        } }, { key: "__trigger", value: function value(e) {
          var t = this;e.map(function (e) {
            t.__runHandler(e.target);
          });
        } }]), e;
    }())();t.addObserver = function (e, t) {
      o.addObserver(e, t);
    }, t.unObserver = function (e, t) {
      o.unObserver(e, t);
    }, t.destroyObserver = function (e, t) {
      o.destroyObserver(e, t);
    };
  }, function (e, t, n) {
    var i = n(35);"string" == typeof i && (i = [[e.i, i, ""]]);var o = { hmr: !0, transform: void 0, insertInto: void 0 };n(37)(i, o);i.locals && (e.exports = i.locals);
  }, function (e, t, n) {
    (e.exports = n(36)(!1)).push([e.i, ".danmu{overflow:hidden;-webkit-user-select:none;-moz-user-select:none;user-select:none;-ms-user-select:none}.danmu>*{position:absolute;white-space:nowrap}.danmu-switch{width:32px;height:20px;border-radius:100px;background-color:#ccc;-webkit-box-sizing:border-box;box-sizing:border-box;outline:none;cursor:pointer;position:relative;text-align:center;margin:10px auto}.danmu-switch.danmu-switch-active{padding-left:12px;background-color:#f85959}.danmu-switch span.txt{width:20px;height:20px;line-height:20px;text-align:center;display:block;border-radius:100px;background-color:#ffffff;-webkit-box-shadow:-2px 0 0 0 rgba(0, 0, 0, .04);box-shadow:-2px 0 0 0 rgba(0, 0, 0, .04);font-family:PingFangSC;font-size:10px;font-weight:500;color:#f44336}\n", ""]);
  }, function (e, t) {
    e.exports = function (e) {
      var t = [];return t.toString = function () {
        return this.map(function (t) {
          var n = function (e, t) {
            var n = e[1] || "",
                i = e[3];if (!i) return n;if (t && "function" == typeof btoa) {
              var o = (a = i, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(a)))) + " */"),
                  r = i.sources.map(function (e) {
                return "/*# sourceURL=" + i.sourceRoot + e + " */";
              });return [n].concat(r).concat([o]).join("\n");
            }var a;return [n].join("\n");
          }(t, e);return t[2] ? "@media " + t[2] + "{" + n + "}" : n;
        }).join("");
      }, t.i = function (e, n) {
        "string" == typeof e && (e = [[null, e, ""]]);for (var i = {}, o = 0; o < this.length; o++) {
          var r = this[o][0];"number" == typeof r && (i[r] = !0);
        }for (o = 0; o < e.length; o++) {
          var a = e[o];"number" == typeof a[0] && i[a[0]] || (n && !a[2] ? a[2] = n : n && (a[2] = "(" + a[2] + ") and (" + n + ")"), t.push(a));
        }
      }, t;
    };
  }, function (e, t, n) {
    var i,
        o,
        r = {},
        a = (i = function i() {
      return window && document && document.all && !window.atob;
    }, function () {
      return void 0 === o && (o = i.apply(this, arguments)), o;
    }),
        s = function s(e) {
      return document.querySelector(e);
    },
        l = function (e) {
      var t = {};return function (e) {
        if ("function" == typeof e) return e();if (void 0 === t[e]) {
          var n = s.call(this, e);if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement) try {
            n = n.contentDocument.head;
          } catch (e) {
            n = null;
          }t[e] = n;
        }return t[e];
      };
    }(),
        u = null,
        c = 0,
        f = [],
        h = n(38);function d(e, t) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n],
            o = r[i.id];if (o) {
          o.refs++;for (var a = 0; a < o.parts.length; a++) {
            o.parts[a](i.parts[a]);
          }for (; a < i.parts.length; a++) {
            o.parts.push(y(i.parts[a], t));
          }
        } else {
          var s = [];for (a = 0; a < i.parts.length; a++) {
            s.push(y(i.parts[a], t));
          }r[i.id] = { id: i.id, refs: 1, parts: s };
        }
      }
    }function g(e, t) {
      for (var n = [], i = {}, o = 0; o < e.length; o++) {
        var r = e[o],
            a = t.base ? r[0] + t.base : r[0],
            s = { css: r[1], media: r[2], sourceMap: r[3] };i[a] ? i[a].parts.push(s) : n.push(i[a] = { id: a, parts: [s] });
      }return n;
    }function p(e, t) {
      var n = l(e.insertInto);if (!n) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var i = f[f.length - 1];if ("top" === e.insertAt) i ? i.nextSibling ? n.insertBefore(t, i.nextSibling) : n.appendChild(t) : n.insertBefore(t, n.firstChild), f.push(t);else if ("bottom" === e.insertAt) n.appendChild(t);else {
        if ("object" != _typeof(e.insertAt) || !e.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o = l(e.insertInto + " " + e.insertAt.before);n.insertBefore(t, o);
      }
    }function m(e) {
      if (null === e.parentNode) return !1;e.parentNode.removeChild(e);var t = f.indexOf(e);t >= 0 && f.splice(t, 1);
    }function v(e) {
      var t = document.createElement("style");return void 0 === e.attrs.type && (e.attrs.type = "text/css"), b(t, e.attrs), p(e, t), t;
    }function b(e, t) {
      Object.keys(t).forEach(function (n) {
        e.setAttribute(n, t[n]);
      });
    }function y(e, t) {
      var n, i, o, r;if (t.transform && e.css) {
        if (!(r = t.transform(e.css))) return function () {};e.css = r;
      }if (t.singleton) {
        var a = c++;n = u || (u = v(t)), i = O.bind(null, n, a, !1), o = O.bind(null, n, a, !0);
      } else e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (n = function (e) {
        var t = document.createElement("link");return void 0 === e.attrs.type && (e.attrs.type = "text/css"), e.attrs.rel = "stylesheet", b(t, e.attrs), p(e, t), t;
      }(t), i = x.bind(null, n, t), o = function o() {
        m(n), n.href && URL.revokeObjectURL(n.href);
      }) : (n = v(t), i = k.bind(null, n), o = function o() {
        m(n);
      });return i(e), function (t) {
        if (t) {
          if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;i(e = t);
        } else o();
      };
    }e.exports = function (e, t) {
      if ("undefined" != typeof DEBUG && DEBUG && "object" != (typeof document === "undefined" ? "undefined" : _typeof(document))) throw new Error("The style-loader cannot be used in a non-browser environment");(t = t || {}).attrs = "object" == _typeof(t.attrs) ? t.attrs : {}, t.singleton || "boolean" == typeof t.singleton || (t.singleton = a()), t.insertInto || (t.insertInto = "head"), t.insertAt || (t.insertAt = "bottom");var n = g(e, t);return d(n, t), function (e) {
        for (var i = [], o = 0; o < n.length; o++) {
          var a = n[o];(s = r[a.id]).refs--, i.push(s);
        }e && d(g(e, t), t);for (o = 0; o < i.length; o++) {
          var s;if (0 === (s = i[o]).refs) {
            for (var l = 0; l < s.parts.length; l++) {
              s.parts[l]();
            }delete r[s.id];
          }
        }
      };
    };var w,
        _ = (w = [], function (e, t) {
      return w[e] = t, w.filter(Boolean).join("\n");
    });function O(e, t, n, i) {
      var o = n ? "" : i.css;if (e.styleSheet) e.styleSheet.cssText = _(t, o);else {
        var r = document.createTextNode(o),
            a = e.childNodes;a[t] && e.removeChild(a[t]), a.length ? e.insertBefore(r, a[t]) : e.appendChild(r);
      }
    }function k(e, t) {
      var n = t.css,
          i = t.media;if (i && e.setAttribute("media", i), e.styleSheet) e.styleSheet.cssText = n;else {
        for (; e.firstChild;) {
          e.removeChild(e.firstChild);
        }e.appendChild(document.createTextNode(n));
      }
    }function x(e, t, n) {
      var i = n.css,
          o = n.sourceMap,
          r = void 0 === t.convertToAbsoluteUrls && o;(t.convertToAbsoluteUrls || r) && (i = h(i)), o && (i += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + " */");var a = new Blob([i], { type: "text/css" }),
          s = e.href;e.href = URL.createObjectURL(a), s && URL.revokeObjectURL(s);
    }
  }, function (e, t) {
    e.exports = function (e) {
      var t = "undefined" != typeof window && window.location;if (!t) throw new Error("fixUrls requires window.location");if (!e || "string" != typeof e) return e;var n = t.protocol + "//" + t.host,
          i = n + t.pathname.replace(/\/[^\/]*$/, "/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (e, t) {
        var o,
            r = t.trim().replace(/^"(.*)"$/, function (e, t) {
          return t;
        }).replace(/^'(.*)'$/, function (e, t) {
          return t;
        });return (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(r) ? e : (o = 0 === r.indexOf("//") ? r : 0 === r.indexOf("/") ? n + r : i + r.replace(/^\.\//, ""), "url(" + JSON.stringify(o) + ")")
        );
      });
    };
  }]);
});
//# sourceMappingURL=index.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(135)(module)))

/***/ }),
/* 135 */
/***/ (function(module, exports) {

module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function () {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function () {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 40 40\" width=\"40\" height=\"40\">\n  <path fill=\"#f85959\" transform=\"scale(0.8 0.8)\" d=\"M36.5,18.73a1.19,1.19,0,0,0,1-1.14V16.33a1.2,1.2,0,0,0-1-1.13l-.61-.08a1.75,1.75,0,0,1-1.3-.86l-.21-.36-.2-.36A1.72,1.72,0,0,1,34,12l.23-.58a1.18,1.18,0,0,0-.5-1.42l-1.1-.62a1.18,1.18,0,0,0-1.47.3l-.39.51a1.82,1.82,0,0,1-1.41.72c-.44,0-1.88-.27-2.22-.7l-.39-.49a1.18,1.18,0,0,0-1.48-.28l-1.09.64a1.19,1.19,0,0,0-.47,1.43l.25.59a1.87,1.87,0,0,1-.08,1.58c-.26.37-1.17,1.5-1.71,1.58l-.63.09a1.19,1.19,0,0,0-1,1.14l0,1.27a1.17,1.17,0,0,0,1,1.12l.61.08a1.74,1.74,0,0,1,1.3.87l.21.36.2.35A1.69,1.69,0,0,1,24,22.08l-.23.59a1.19,1.19,0,0,0,.5,1.42l1.1.62a1.19,1.19,0,0,0,1.48-.31l.38-.5a1.83,1.83,0,0,1,1.41-.72c.44,0,1.88.25,2.22.69l.39.49a1.18,1.18,0,0,0,1.48.28L33.86,24a1.19,1.19,0,0,0,.47-1.43L34.09,22a1.84,1.84,0,0,1,.07-1.58c.26-.37,1.17-1.5,1.72-1.58ZM31,18.94a2.76,2.76,0,0,1-4.65-1.2A2.71,2.71,0,0,1,27,15.13a2.76,2.76,0,0,1,4.64,1.2A2.7,2.7,0,0,1,31,18.94Z\"/>\n  <path fill=\"#f85959\" transform=\"scale(0.8 0.8)\" d=\"M32,0H3.59A3.59,3.59,0,0,0,0,3.59v17A3.59,3.59,0,0,0,3.59,24.2H19.72a12.59,12.59,0,0,1-.81-1.2A11.73,11.73,0,0,1,35.54,7.28V3.59A3.59,3.59,0,0,0,32,0ZM13,14.18H4.29a1.52,1.52,0,0,1,0-3H13a1.52,1.52,0,0,1,0,3ZM16.45,8H4.29a1.51,1.51,0,0,1,0-3H16.45a1.51,1.51,0,1,1,0,3Z\"/>\n</svg>\n");

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(138);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".xgplayer-skin-default .danmu-switch{-webkit-order:6;-moz-box-ordinal-group:7;order:6;z-index:26}.xgplayer-skin-default .xgplayer-danmu{display:none;position:absolute;top:0;left:0;right:0;height:100%;overflow:hidden;z-index:9;outline:none}.xgplayer-skin-default .xgplayer-danmu>*{position:absolute;white-space:nowrap;z-index:9}.xgplayer-skin-default .xgplayer-danmu.xgplayer-has-danmu{display:block}.xgplayer-skin-default .xgplayer-panel{outline:none;-webkit-order:7;-moz-box-ordinal-group:8;order:7;width:40px;height:40px;display:inline-block;position:relative;font-family:PingFangSC-Regular;font-size:13px;color:hsla(0,0%,100%,.8);z-index:36}.xgplayer-skin-default .xgplayer-panel .xgplayer-panel-icon{cursor:pointer;position:absolute;margin-left:5px;top:10px}.xgplayer-skin-default .xgplayer-panel-active{display:block!important;bottom:30px}.xgplayer-skin-default .xgplayer-panel-slider{z-index:36;display:none;position:absolute;width:230px;height:230px;background:rgba(0,0,0,.54);border-radius:1px;padding:10px 20px;outline:none;left:-115px;bottom:40px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-hidemode{padding-bottom:10px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-hidemode-radio li{display:inline;list-style:none;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-hidemode ul{display:-webkit-flex;display:-moz-box;display:flex;-webkit-justify-content:space-around;justify-content:space-around}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-hidemode li{margin:0 12px;font-size:11px;color:#aaa}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-hidemode-font{margin-bottom:10px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency{display:block;margin-top:10px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-line{-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;outline:none;width:150px;height:4px;background:#aaa;border-radius:4px;border-style:none;margin-left:10px;margin-top:-2px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-line::-moz-focus-outer{border:0!important}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-color::-webkit-slider-runnable-track{outline:none;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-color::-moz-range-track{outline:none;background-color:#aaa;border-color:transparent;cursor:pointer;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-color::-ms-track{outline:none;background-color:#aaa;color:transparent;border-color:transparent;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-bar::-webkit-slider-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:6px;width:6px;margin-top:-4px;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-bar::-moz-range-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:0;width:0;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-bar::-ms-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:6px;width:6px;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-transparency .xgplayer-transparency-bar::-moz-range-progress{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;height:4px;border-radius:4px;background:linear-gradient(90deg,#f85959,#f85959 100%,#aaa)}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea{display:block;margin-top:8px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-name{display:inline-block;position:relative;top:-10px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-control{display:inline-block}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-control-up{width:150px;margin-left:10px;display:-moz-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-between;-moz-box-pack:justify;justify-content:space-between;color:#aaa}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-control-down{position:relative;top:-10px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-control-down-dots{display:-webkit-flex;display:-moz-box;display:flex;width:150px;margin-left:10px;-webkit-justify-content:space-between;-moz-box-pack:justify;justify-content:space-between}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-threequarters,.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-twoquarters{margin-left:-6px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea-full{margin-right:3px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-line{-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;outline:none;width:150px;height:4px;background:#aaa;border-radius:4px;border-style:none;margin-left:10px;margin-top:-2px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-line::-moz-focus-outer{border:0!important}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-color::-webkit-slider-runnable-track{outline:none;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-color::-moz-range-track{outline:none;background-color:#aaa;border-color:transparent;cursor:pointer;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-color::-ms-track{outline:none;background-color:#aaa;color:transparent;border-color:transparent;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-bar::-webkit-slider-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:6px;width:6px;margin-top:-4px;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-bar::-moz-range-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:0;width:0;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-bar::-ms-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:6px;width:6px;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-full-dot,.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-onequarters-dot,.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-threequarters-dot,.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-twoquarters-dot,.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-showarea .xgplayer-showarea-zero-dot{width:3px;height:3px;border:3px solid #aaa;border-radius:50%;background-color:#aaa;position:relative;top:16px;z-index:-1}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed{display:block}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed-name{display:inline-block;position:relative;top:-10px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed-control{display:inline-block}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed-control-up{width:150px;margin-left:10px;display:-moz-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-between;-moz-box-pack:justify;justify-content:space-between;color:#aaa}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed-control-down{position:relative;top:-10px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed-control-down-dots{display:-webkit-flex;display:-moz-box;display:flex;width:150px;margin-left:10px;-webkit-justify-content:space-between;-moz-box-pack:justify;justify-content:space-between}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-line{-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;outline:none;width:150px;height:4px;background:#aaa;border-radius:4px;border-style:none;margin-left:10px;margin-top:-2px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-line::-moz-focus-outer{border:0!important}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-color::-webkit-slider-runnable-track{outline:none;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-color::-moz-range-track{outline:none;background-color:#aaa;border-color:transparent;cursor:pointer;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-color::-ms-track{outline:none;background-color:#aaa;color:transparent;border-color:transparent;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-bar::-webkit-slider-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:6px;width:6px;margin-top:-4px;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-bar::-moz-range-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:0;width:0;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-bar::-ms-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:6px;width:6px;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-large-dot,.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-middle-dot,.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmuspeed .xgplayer-danmuspeed-small-dot{width:3px;height:3px;border:3px solid #aaa;border-radius:50%;background-color:#aaa;position:relative;top:16px;z-index:-1}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont{display:block}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont-name{display:inline-block;position:relative;top:-10px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont-control{display:inline-block}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont-control-up{width:150px;margin-left:10px;display:-moz-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-between;-moz-box-pack:justify;justify-content:space-between;color:#aaa}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont-control-down{position:relative;top:-10px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont-control-down-dots{display:-webkit-flex;display:-moz-box;display:flex;width:150px;margin-left:10px;-webkit-justify-content:space-between;-moz-box-pack:justify;justify-content:space-between}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-line{-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;outline:none;width:150px;height:4px;background:#aaa;border-radius:4px;border-style:none;margin-left:10px;margin-top:-2px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-line::-moz-focus-outer{border:0!important}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-color::-webkit-slider-runnable-track{outline:none;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-color::-moz-range-track{outline:none;background-color:#aaa;border-color:transparent;cursor:pointer;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-color::-ms-track{outline:none;background-color:#aaa;color:transparent;border-color:transparent;width:150px;height:4px;border-radius:4px}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-bar::-webkit-slider-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:6px;width:6px;margin-top:-4px;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-bar::-moz-range-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:0;width:0;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-bar::-ms-thumb{outline:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;border:6px solid #f85959;height:6px;width:6px;border-radius:6px;cursor:pointer}.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-large-dot,.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-middle-dot,.xgplayer-skin-default .xgplayer-panel-slider .xgplayer-danmufont .xgplayer-danmufont-small-dot{width:3px;height:3px;border:3px solid #aaa;border-radius:50%;background-color:#aaa;position:relative;top:16px;z-index:-1}", ""]);

// exports


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

__webpack_require__(140);

var s_pip = function s_pip() {
  var player = this;
  if (!player.config.pip || typeof player.video.requestPictureInPicture !== 'function') {
    return;
  }
  var pip = player.lang.PIP;
  var btn = (0, _util.createDom)('xg-pip', '<p class="name"><span>' + pip + '</span></p>', { tabindex: 9 }, 'xgplayer-pip');

  player.once('ready', function () {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.userGestureTrigEvent('pipBtnClick');
    });
  });
};

exports.default = {
  name: 's_pip',
  method: s_pip
};
module.exports = exports['default'];

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(141);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".xgplayer-skin-default .xgplayer-pip{-webkit-order:9;-moz-box-ordinal-group:10;order:9;position:relative;outline:none;display:block;cursor:pointer;height:20px;top:10px}.xgplayer-skin-default .xgplayer-pip .name{text-align:center;font-family:PingFangSC-Regular;font-size:13px;line-height:20px;height:20px;color:hsla(0,0%,100%,.8)}.xgplayer-skin-default .xgplayer-pip .name span{width:60px;height:20px;line-height:20px;background:rgba(0,0,0,.38);border-radius:10px;display:inline-block;vertical-align:middle}.lang-is-jp .xgplayer-pip .name span{width:70px;height:20px}", ""]);

// exports


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

__webpack_require__(143);

var s_miniplayer = function s_miniplayer() {
  var player = this;
  if (!player.config.miniplayer) {
    return;
  }
  var miniplayer = player.lang.MINIPLAYER;
  var btn = (0, _util.createDom)('xg-miniplayer', '<p class="name"><span>' + miniplayer + '</span></p>', { tabindex: 9 }, 'xgplayer-miniplayer');

  player.once('ready', function () {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.userGestureTrigEvent('miniplayerBtnClick');
    });
  });
};

exports.default = {
  name: 's_miniplayer',
  method: s_miniplayer
};
module.exports = exports['default'];

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(144);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".xgplayer-skin-default .xgplayer-miniplayer{-webkit-order:9;-moz-box-ordinal-group:10;order:9;position:relative;outline:none;display:block;cursor:pointer;height:20px;top:10px}.xgplayer-skin-default .xgplayer-miniplayer .name{text-align:center;font-family:PingFangSC-Regular;font-size:13px;line-height:20px;height:20px;color:hsla(0,0%,100%,.8)}.xgplayer-skin-default .xgplayer-miniplayer .name span{width:80px;height:20px;line-height:20px;background:rgba(0,0,0,.38);border-radius:10px;display:inline-block;vertical-align:middle}.xgplayer-skin-default .xgplayer-miniplayer-lay{position:absolute;top:26px;left:0;width:100%;height:100%;z-index:130;cursor:pointer;background-color:transparent;display:none}.xgplayer-skin-default .xgplayer-miniplayer-lay div{width:100%;height:100%}.xgplayer-skin-default .xgplayer-miniplayer-drag{cursor:move;position:absolute;top:0;left:0;width:100%;height:26px;line-height:26px;background-image:linear-gradient(rgba(0,0,0,.3),transparent);z-index:130;display:none}.xgplayer-skin-default .xgplayer-miniplayer-drag .drag-handle{width:100%}.xgplayer-skin-default.xgplayer-miniplayer-active{position:fixed;right:0;bottom:200px;width:320px;height:180px;z-index:110}.xgplayer-skin-default.xgplayer-miniplayer-active .xgplayer-controls,.xgplayer-skin-default.xgplayer-miniplayer-active .xgplayer-danmu{display:none}.xgplayer-skin-default.xgplayer-miniplayer-active .xgplayer-miniplayer-lay{display:block}.xgplayer-skin-default.xgplayer-miniplayer-active .xgplayer-miniplayer-drag{display:-webkit-flex;display:-moz-box;display:flex}.xgplayer-skin-default.xgplayer-inactive .xgplayer-miniplayer-drag{display:none}.lang-is-jp .xgplayer-miniplayer .name span{width:70px;height:20px}", ""]);

// exports


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var _playNext = __webpack_require__(146);

var _playNext2 = _interopRequireDefault(_playNext);

__webpack_require__(147);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var s_playNext = function s_playNext() {
  var player = this;
  var nextBtn = player.config.playNext;
  if (!nextBtn || !nextBtn.urlList) {
    return;
  }
  var btn = (0, _util.createDom)('xg-playnext', '<xg-icon class="xgplayer-icon">' + _playNext2.default + '</xg-icon>', {}, 'xgplayer-playnext');
  var tipsText = player.lang.PLAYNEXT_TIPS;
  var tips = (0, _util.createDom)('xg-tips', '<span class="xgplayer-tip-playnext">' + tipsText + '</span>', {}, 'xgplayer-tips');
  btn.appendChild(tips);
  player.once('ready', function () {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      (0, _util.addClass)(player.root, 'xgplayer-is-enter');
      player.userGestureTrigEvent('playNextBtnClick');
    });
  });

  var onUrlListEnd = function onUrlListEnd() {
    (0, _util.addClass)(player.root, 'xgplayer-playnext-inactive');
  };
  player.on('urlListEnd', onUrlListEnd);

  function onDestroy() {
    player.off('urlListEnd', onUrlListEnd);
    player.off('destroy', onDestroy);
  }
  player.once('destroy', onDestroy);
};

exports.default = {
  name: 's_playNext',
  method: s_playNext
};
module.exports = exports['default'];

/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\">\n  <path transform=\"scale(0.038 0.028)\" d=\"M800 380v768h-128v-352l-320 320v-704l320 320v-352z\"></path>\n</svg>\n");

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(148);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".xgplayer-skin-default .xgplayer-playnext{position:relative;-webkit-order:1;-moz-box-ordinal-group:2;order:1;display:block;cursor:pointer;top:-2px}.xgplayer-skin-default .xgplayer-playnext .xgplayer-icon div{position:absolute}.xgplayer-skin-default .xgplayer-playnext .xgplayer-tips .xgplayer-tip-playnext{display:block}.xgplayer-skin-default .xgplayer-playnext:hover{opacity:.85}.xgplayer-skin-default .xgplayer-playnext:hover .xgplayer-tips{display:block}.xgplayer-lang-is-en .xgplayer-playnext .xgplayer-tips{margin-left:-25px}.xgplayer-lang-is-jp .xgplayer-playnext .xgplayer-tips{margin-left:-38px}.xgplayer-skin-default.xgplayer-playnext-inactive .xgplayer-playnext{display:none}", ""]);

// exports


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var _rotate = __webpack_require__(150);

var _rotate2 = _interopRequireDefault(_rotate);

__webpack_require__(151);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var s_rotate = function s_rotate() {
  var player = this;
  if (!player.config.rotate) {
    return;
  }
  var btn = (0, _util.createDom)('xg-rotate', '<xg-icon class="xgplayer-icon">' + _rotate2.default + '</xg-icon>', {}, 'xgplayer-rotate');

  var tipsText = player.lang.ROTATE_TIPS;
  var tips = (0, _util.createDom)('xg-tips', '<span class="xgplayer-tip-rotate">' + tipsText + '</span>', {}, 'xgplayer-tips');
  btn.appendChild(tips);
  player.once('ready', function () {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.userGestureTrigEvent('rotateBtnClick');
    });
  });
};

exports.default = {
  name: 's_rotate',
  method: s_rotate
};
module.exports = exports['default'];

/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 40 40\" fill=\"none\">\n  <g clip-path=\"url(#clip0)\">\n    <path transform=\"scale(1.5 1.5)\" d=\"M11.6665 9.16663H4.1665C2.78579 9.16663 1.6665 10.2859 1.6665 11.6666V15.8333C1.6665 17.214 2.78579 18.3333 4.1665 18.3333H11.6665C13.0472 18.3333 14.1665 17.214 14.1665 15.8333V11.6666C14.1665 10.2859 13.0472 9.16663 11.6665 9.16663Z\" fill=\"white\"/>\n    <path transform=\"scale(1.5 1.5)\" fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.88148 4.06298C3.75371 4.21005 3.67667 4.40231 3.67749 4.61242C3.67847 4.87253 3.79852 5.10435 3.98581 5.25646L6.99111 8.05895C7.32771 8.37283 7.85502 8.35443 8.16891 8.01782C8.48279 7.68122 8.46437 7.15391 8.12778 6.84003L6.62061 5.43457L9.8198 5.4224C9.82848 5.42239 9.8372 5.42221 9.84591 5.4219C10.9714 5.38233 12.0885 5.6285 13.0931 6.13744C14.0976 6.64635 14.957 7.40148 15.5908 8.33234C16.2246 9.2632 16.6122 10.3394 16.7177 11.4606C16.823 12.5819 16.6427 13.7115 16.1934 14.7442C16.0098 15.1661 16.203 15.6571 16.6251 15.8408C17.0471 16.0243 17.5381 15.8311 17.7216 15.4091C18.2833 14.1183 18.5087 12.7063 18.3771 11.3047C18.2453 9.90318 17.7607 8.55792 16.9684 7.39433C16.1761 6.23073 15.1021 5.28683 13.8463 4.65065C12.5946 4.01651 11.203 3.70872 9.80072 3.75583L6.43415 3.76862L7.96326 2.12885C8.27715 1.79225 8.25872 1.26494 7.92213 0.951061C7.58553 0.63718 7.05822 0.655585 6.74433 0.99219L3.90268 4.0395C3.89545 4.04724 3.88841 4.05509 3.88154 4.06303L3.88148 4.06298Z\" fill=\"white\"/>\n  </g>\n  <defs>\n    <clipPath id=\"clip0\">\n      <rect width=\"40\" height=\"40\" fill=\"white\"/>\n    </clipPath>\n  </defs>\n</svg>\n");

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(152);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".xgplayer-skin-default .xgplayer-rotate{position:relative;-webkit-order:10;-moz-box-ordinal-group:11;order:10;display:block;cursor:pointer}.xgplayer-skin-default .xgplayer-rotate .xgplayer-icon{margin-top:7px;width:26px}.xgplayer-skin-default .xgplayer-rotate .xgplayer-icon div{position:absolute}.xgplayer-skin-default .xgplayer-rotate .xgplayer-tips{margin-left:-22px}.xgplayer-skin-default .xgplayer-rotate .xgplayer-tips .xgplayer-tip-rotate{display:block}.xgplayer-skin-default .xgplayer-rotate:hover{opacity:.85}.xgplayer-skin-default .xgplayer-rotate:hover .xgplayer-tips{display:block}.xgplayer-lang-is-en .xgplayer-rotate .xgplayer-tips{margin-left:-26px}.xgplayer-lang-is-jp .xgplayer-rotate .xgplayer-tips{margin-left:-38px}", ""]);

// exports


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var _reload = __webpack_require__(154);

var _reload2 = _interopRequireDefault(_reload);

__webpack_require__(155);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var s_reload = function s_reload() {
  var player = this;
  if (!player.config.reload) {
    return;
  }
  var btn = (0, _util.createDom)('xg-reload', '<xg-icon class="xgplayer-icon">' + _reload2.default + '</xg-icon>', {}, 'xgplayer-reload');

  var tipsText = player.lang.RELOAD_TIPS;
  var tips = (0, _util.createDom)('xg-tips', '<span class="xgplayer-tip-reload">' + tipsText + '</span>', {}, 'xgplayer-tips');
  btn.appendChild(tips);
  player.once('ready', function () {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.userGestureTrigEvent('reloadBtnClick');
    });
  });
};

exports.default = {
  name: 's_reload',
  method: s_reload
};
module.exports = exports['default'];

/***/ }),
/* 154 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"28\" viewBox=\"0 0 28 28\">\n    <path fill=\"#FFF\" fill-opacity=\"1\" fill-rule=\"nonzero\" d=\"M18.17 19.988a7.182 7.182 0 0 1-4.256 1.318 7.806 7.806 0 0 1-.595-.03c-.08-.008-.16-.021-.242-.031a8.004 8.004 0 0 1-.458-.071c-.094-.018-.185-.042-.276-.063a7.743 7.743 0 0 1-.439-.113c-.068-.022-.136-.047-.205-.07a7.03 7.03 0 0 1-.492-.181c-.037-.015-.072-.032-.108-.049a7.295 7.295 0 0 1-.554-.269l-.025-.012a7.347 7.347 0 0 1-2.111-1.753c-.03-.036-.057-.074-.086-.11a7.305 7.305 0 0 1-1.594-4.557h1.686a.123.123 0 0 0 .108-.064.119.119 0 0 0-.006-.125L5.684 9.532a.123.123 0 0 0-.103-.056.123.123 0 0 0-.102.056l-2.834 4.276a.121.121 0 0 0-.005.125c.022.04.064.064.107.064h1.687c0 2.025.627 3.902 1.693 5.454.013.021.022.044.037.066.11.159.233.305.352.455.043.057.085.116.13.171.175.213.36.413.55.61.02.018.036.038.054.055a9.447 9.447 0 0 0 2.91 1.996c.058.026.115.054.175.079.202.084.41.158.619.228.098.034.196.069.296.1.183.054.37.1.558.145.125.029.249.06.376.085.052.01.102.027.155.035.177.032.355.05.533.071.064.007.128.018.19.026.32.03.639.052.956.052a9.46 9.46 0 0 0 5.47-1.746 1.16 1.16 0 0 0 .282-1.608 1.143 1.143 0 0 0-1.6-.283zm5.397-5.991a9.604 9.604 0 0 0-1.685-5.441c-.016-.027-.026-.054-.043-.078-.132-.19-.276-.366-.419-.543-.017-.022-.032-.044-.05-.065a9.467 9.467 0 0 0-3.571-2.7l-.114-.051a11.2 11.2 0 0 0-.673-.248c-.082-.027-.163-.057-.247-.082a9.188 9.188 0 0 0-.6-.156c-.113-.026-.224-.055-.337-.077-.057-.011-.109-.028-.164-.037-.151-.027-.304-.039-.455-.058-.104-.013-.208-.03-.313-.04a10.05 10.05 0 0 0-.759-.039c-.045 0-.09-.007-.136-.007l-.025.003a9.45 9.45 0 0 0-5.46 1.737 1.16 1.16 0 0 0-.284 1.608c.363.523 1.08.65 1.6.284a7.182 7.182 0 0 1 4.222-1.32c.217.002.429.013.639.033.065.007.129.017.193.025.173.021.344.046.513.08.075.014.149.033.221.05.166.037.331.077.494.127l.152.051c.185.061.366.127.545.201l.054.025a7.308 7.308 0 0 1 2.741 2.067l.013.018a7.302 7.302 0 0 1 1.652 4.633h-1.686a.123.123 0 0 0-.108.064.12.12 0 0 0 .006.124l2.834 4.277c.022.033.06.054.103.054.042 0 .08-.021.102-.054l2.833-4.277a.12.12 0 0 0 .005-.124.123.123 0 0 0-.108-.064h-1.685z\"/>\n</svg>\n");

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(156);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".xgplayer-skin-default .xgplayer-reload{position:relative;-webkit-order:1;-moz-box-ordinal-group:2;order:1;display:block;width:40px;height:40px;cursor:pointer}.xgplayer-skin-default .xgplayer-reload .xgplayer-icon{margin-top:7px;width:26px}.xgplayer-skin-default .xgplayer-reload .xgplayer-icon div{position:absolute}.xgplayer-skin-default .xgplayer-reload .xgplayer-tips{margin-left:-22px}.xgplayer-skin-default .xgplayer-reload .xgplayer-tips .xgplayer-tip-reload{display:block}.xgplayer-skin-default .xgplayer-reload:hover{opacity:.85}.xgplayer-skin-default .xgplayer-reload:hover .xgplayer-tips{display:block}.xgplayer-lang-is-en .xgplayer-reload .xgplayer-tips{margin-left:-26px}.xgplayer-lang-is-jp .xgplayer-reload .xgplayer-tips{margin-left:-38px}", ""]);

// exports


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

__webpack_require__(158);

var s_screenShot = function s_screenShot() {
  var player = this;
  if (!player.config.screenShot || player.config.screenShot.hideButton) {
    return;
  }
  var screenShotText = player.lang.SCREENSHOT;
  var btn = (0, _util.createDom)('xg-screenshot', '<p class="name"><span>' + (player.config.screenShot.iconText || screenShotText) + '</span></p>', { tabindex: 11 }, 'xgplayer-screenshot');
  player.once('ready', function () {
    player.controls.appendChild(btn);
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.userGestureTrigEvent('screenShotBtnClick');
    });
  });
};

exports.default = {
  name: 's_screenShot',
  method: s_screenShot
};
module.exports = exports['default'];

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(159);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".xgplayer-skin-default .xgplayer-screenshot{-webkit-order:11;-moz-box-ordinal-group:12;order:11;position:relative;outline:none;display:block;cursor:pointer;height:20px;top:10px}.xgplayer-skin-default .xgplayer-screenshot .name{text-align:center;font-family:PingFangSC-Regular;font-size:13px;line-height:20px;height:20px;color:hsla(0,0%,100%,.8)}.xgplayer-skin-default .xgplayer-screenshot .name span{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;padding:0 10px;height:20px;line-height:20px;background:rgba(0,0,0,.38);border-radius:10px;display:inline-block;vertical-align:middle}.xgplayer-lang-is-en .xgplayer-screenshot .name span,.xgplayer-lang-is-jp .xgplayer-screenshot .name span{width:75px;height:20px}", ""]);

// exports


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _player = __webpack_require__(9);

var _player2 = _interopRequireDefault(_player);

__webpack_require__(78);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var s_nativeTextTrack = function s_nativeTextTrack() {
  if (!this.config.nativeTextTrack) {
    return;
  }
  var player = this;
  var root = player.root;
  var util = _player2.default.util;
  var container = util.createDom('xg-texttrack', '', { tabindex: 7 }, 'xgplayer-texttrack');
  var list = player.config.nativeTextTrack;
  if (list && Array.isArray(list) && list.length > 0) {
    util.addClass(player.root, 'xgplayer-is-texttrack');
    player.once('canplay', function () {
      var _this = this;

      var tmp = ['<ul>'];
      tmp.push('<li class=\'' + (this.textTrackShowDefault ? '' : 'selected') + '\'}\'>' + player.lang.OFF + '</li>');
      list.forEach(function (item) {
        tmp.push('<li class=\'' + (item.default && _this.textTrackShowDefault ? 'selected' : '') + '\'>' + item.label + '</li>');
      });
      var controlText = player.lang.TEXTTRACK;
      tmp.push('</ul><p class="name">' + controlText + '</p>');

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
  };

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
        if (li.innerHTML === player.lang.OFF) {
          trackDoms[0].track.mode = 'hidden';
          trackDoms[0].src = '';
          util.removeClass(player.root, 'xgplayer-texttrack-active');
        } else {
          trackDoms[0].style.display = 'block';
          util.addClass(player.root, 'xgplayer-texttrack-active');
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

  player.on('play', function () {
    var ul = root.querySelector('.xgplayer-texttrack ul');
    var trackDoms = root.getElementsByTagName('Track');
    if (!player['hls'] || !ul || !trackDoms) return;
    trackDoms[0].src = '';
    Array.prototype.forEach.call(ul.childNodes, function (li) {
      if (util.hasClass(li, 'selected')) {
        if (li.innerHTML === player.lang.OFF) {
          trackDoms[0].track.mode = 'hidden';
          trackDoms[0].src = '';
        } else {
          trackDoms[0].track.mode = 'hidden';

          list.some(function (item) {
            if (item.label !== li.innerHTML) {
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

          list.some(function (item) {
            if (item.label === li.innerHTML) {
              setTimeout(function () {
                trackDoms[0].src = item.src;
                if (item.kind) {
                  trackDoms[0].kind = item.kind;
                }
                trackDoms[0].label = item.label;
                if (item.srclang) {
                  trackDoms[0].srclang = item.srclang;
                }
                trackDoms[0].track.mode = 'showing';
              });
              return true;
            }
          });
        }
      }
    });
    util.removeClass(player.root, 'xgplayer-texttrack-active');
  });

  container.addEventListener('mouseleave', function (e) {
    e.preventDefault();
    e.stopPropagation();
    util.removeClass(player.root, 'xgplayer-texttrack-active');
  });
};

exports.default = {
  name: 's_nativeTextTrack',
  method: s_nativeTextTrack
};
module.exports = exports['default'];

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".xgplayer-skin-default .xgplayer-texttrack{-webkit-order:7;-moz-box-ordinal-group:8;order:7;width:60px;height:150px;z-index:18;position:relative;outline:none;display:none;cursor:default;margin-top:-119px}.xgplayer-skin-default .xgplayer-texttrack ul{display:none;list-style:none;min-width:78px;background:rgba(0,0,0,.54);border-radius:1px;position:absolute;bottom:30px;text-align:center;white-space:nowrap;left:50%;-webkit-transform:translateX(-50%);-ms-transform:translateX(-50%);transform:translateX(-50%);width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;z-index:26;cursor:pointer}.xgplayer-skin-default .xgplayer-texttrack ul li{opacity:.7;font-family:PingFangSC-Regular;font-size:11px;color:hsla(0,0%,100%,.8);width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;margin:auto;padding:6px 13px}.xgplayer-skin-default .xgplayer-texttrack ul li.selected,.xgplayer-skin-default .xgplayer-texttrack ul li:hover{color:#fff;opacity:1}.xgplayer-skin-default .xgplayer-texttrack .name{text-align:center;font-family:PingFangSC-Regular;font-size:13px;cursor:pointer;color:hsla(0,0%,100%,.8);position:absolute;bottom:0;width:60px;height:20px;line-height:20px;background:rgba(0,0,0,.38);border-radius:10px;display:inline-block;vertical-align:middle}.xgplayer-skin-default .xgplayer-texttrack.xgplayer-texttrack-hide{display:none}xg-text-track{transition:bottom .3s ease}.xgplayer-skin-default.xgplayer-is-texttrack .xgplayer-texttrack,.xgplayer-skin-default.xgplayer-texttrack-active .xgplayer-texttrack ul{display:block}", ""]);

// exports


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

__webpack_require__(78);

function renderList(root, textTrack, offText, isDefaultShow) {
  if (textTrack.length === 0) {
    root.innerHTML = '';
    return;
  }
  var tmp = [];
  tmp.push('<li data-type="off" class="' + (isDefaultShow ? '' : 'selected') + '">' + offText + '</li>');
  textTrack.forEach(function (item) {
    tmp.push('<li data-id=' + item.id + ' data-language=' + item.language + ' class="' + (item.isDefault && isDefaultShow ? 'selected' : '') + '">' + item.label + '</li>');
  });
  root.innerHTML = tmp.join('');
}

// eslint-disable-next-line camelcase
var s_textTrack = function s_textTrack() {
  var player = this;
  if (!this.config.textTrack) {
    return;
  }
  var textTrack = this.config.textTrack;
  var controlText = player.lang.TEXTTRACK;
  var container = (0, _util.createDom)('xg-texttrack', '<ul></ul><p class="name">' + controlText + '</p>', { tabindex: 7 }, 'xgplayer-texttrack');

  function onCanPlay() {
    var urlInRoot = player.root.querySelector('.xgplayer-texttrack');
    if (!urlInRoot) {
      player.controls.appendChild(container);
      var cur = container.querySelector('.name');
      if (!player.config.textTrackActive || player.config.textTrackActive === 'hover') {
        cur.addEventListener('mouseenter', function (e) {
          e.preventDefault();
          e.stopPropagation();
          (0, _util.addClass)(player.root, 'xgplayer-texttrack-active');
          container.focus();
        });
        container.addEventListener('mouseleave', function (e) {
          e.preventDefault();
          e.stopPropagation();
          (0, _util.removeClass)(player.root, 'xgplayer-texttrack-active');
        });
      } else {
        cur.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          if ((0, _util.hasClass)(player.root, 'xgplayer-texttrack-active')) {
            (0, _util.removeClass)(player.root, 'xgplayer-texttrack-active');
          } else {
            (0, _util.addClass)(player.root, 'xgplayer-texttrack-active');
          }
        });
      }
    }

    ['touchend', 'click'].forEach(function (item) {
      container.addEventListener(item, function (e) {
        e.preventDefault();
        e.stopPropagation();
        var li = e.target || e.srcElement;
        if (li && li.tagName.toLocaleLowerCase() === 'li') {
          var id = li.getAttribute('data-id');
          var type = li.getAttribute('data-type');
          var language = li.getAttribute('data-language');
          Array.prototype.forEach.call(li.parentNode.childNodes, function (item) {
            (0, _util.removeClass)(item, 'selected');
          });
          (0, _util.addClass)(li, 'selected');
          if (type === 'off') {
            player.switchOffSubtile();
            (0, _util.removeClass)(player.root, 'xgplayer-texttrack-active');
          } else {
            player.switchSubTitle({ id: id, language: language });
            (0, _util.addClass)(player.root, 'xgplayer-texttrack-active');
          }
        }
      });
    });

    var ul = container.getElementsByTagName('ul')[0];
    renderList(ul, textTrack, player.lang.OFF, player.textTrackShowDefault);
    if (textTrack.length === 0) {
      (0, _util.addClass)(container, 'xgplayer-texttrack-hide');
    } else {
      (0, _util.removeClass)(container, 'xgplayer-texttrack-hide');
    }
  }

  var onListUpdate = function onListUpdate(data) {
    if (!data.isListUpdate) return;
    var ul = container.getElementsByTagName('ul')[0];
    textTrack = data.list;
    renderList(ul, data.list, player.lang.OFF, player.textTrackShowDefault);
    data.list.length > 0 ? (0, _util.addClass)(player.root, 'xgplayer-is-texttrack') : (0, _util.removeClass)(player.root, 'xgplayer-is-texttrack');
    if (data.list.length === 0) {
      (0, _util.addClass)(container, 'xgplayer-texttrack-hide');
    } else {
      (0, _util.removeClass)(container, 'xgplayer-texttrack-hide');
    }
  };

  if (textTrack && Array.isArray(textTrack)) {
    textTrack.length > 0 && (0, _util.addClass)(player.root, 'xgplayer-is-texttrack');
    player.once('canplay', onCanPlay);
    player.on('subtitle_change', onListUpdate);
  }
};

exports.default = {
  name: 's_textTrack',
  method: s_textTrack
};
module.exports = exports['default'];

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

__webpack_require__(164);

var s_error = function s_error() {
  var player = this;
  var root = player.root;

  var error = (0, _util.createDom)('xg-error', '<span class="xgplayer-error-text">请<span class="xgplayer-error-refresh">刷新</span>试试</span>', {}, 'xgplayer-error');
  player.once('ready', function () {
    root.appendChild(error);
  });

  var text = error.querySelector('.xgplayer-error-text');
  if (player.config.lang && player.config.lang === 'zh-cn') {
    text.innerHTML = player.config.errorTips || '\u8BF7<span class="xgplayer-error-refresh">\u5237\u65B0</span>\u8BD5\u8BD5';
  } else {
    text.innerHTML = player.config.errorTips || 'please try to <span class="xgplayer-error-refresh">refresh</span>';
  }
  var refresh = null;

  function onError() {
    // player.controls.style.display = 'none'
    // if (player.error) {
    //   text.innerHTML = player.error
    // } else {

    // }
    (0, _util.addClass)(player.root, 'xgplayer-is-error');
    refresh = error.querySelector('.xgplayer-error-refresh');
    if (refresh) {
      ['touchend', 'click'].forEach(function (item) {
        refresh.addEventListener(item, function (e) {
          e.preventDefault();
          e.stopPropagation();
          player.autoplay = true;
          var currentTime = player.currentTime;
          player.once('playing', function () {
            player.currentTime = currentTime;
            (0, _util.removeClass)(player.root, 'xgplayer-is-error');
          });
          player.src = player.config.url;
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

exports.default = {
  name: 's_error',
  method: s_error
};
module.exports = exports['default'];

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(165);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".xgplayer-skin-default .xgplayer-error{background:#000;display:none;position:absolute;left:0;top:0;width:100%;height:100%;z-index:125;font-family:PingFangSC-Regular;font-size:14px;color:#fff;text-align:center;line-height:100%;-webkit-justify-content:center;-moz-box-pack:center;justify-content:center;-webkit-align-items:center;-moz-box-align:center;align-items:center}.xgplayer-skin-default .xgplayer-error .xgplayer-error-refresh{color:#fa1f41;padding:0 3px;cursor:pointer}.xgplayer-skin-default .xgplayer-error .xgplayer-error-text{line-height:18px;margin:auto 6px}.xgplayer-skin-default.xgplayer-is-error .xgplayer-error{display:-webkit-flex;display:-moz-box;display:flex}", ""]);

// exports


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

__webpack_require__(167);

var s_memoryPlay = function s_memoryPlay() {
  var player = this;
  var lastPlayTime = player.config.lastPlayTime || 0;
  var lastPlayTimeHideDelay = player.config.lastPlayTimeHideDelay || 0;
  var dom = null;
  if (lastPlayTime <= 0) {
    return;
  }
  dom = (0, _util.createDom)('xg-memoryplay', '<div class="xgplayer-memoryplay-spot"><div class="xgplayer-progress-tip">\u60A8\u4E0A\u6B21\u89C2\u770B\u5230 <span class="xgplayer-lasttime">' + (0, _util.format)(lastPlayTime) + '</span> \uFF0C\u4E3A\u60A8\u81EA\u52A8\u7EED\u64AD <span class="btn-close"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg></span></div></div>', {}, 'xgplayer-memoryplay');
  dom.addEventListener('mouseover', function (e) {
    e.stopPropagation();
  });
  var removeFunc = function removeFunc() {
    dom && dom.parentNode && dom.parentNode.removeChild(dom);
    dom = null;
  };
  dom.querySelector('.xgplayer-progress-tip .btn-close').addEventListener('click', removeFunc);
  var handlePlay = function handlePlay() {
    if (lastPlayTimeHideDelay > 0) {
      player.root.appendChild(dom);
    }
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

exports.default = {
  name: 's_memoryPlay',
  method: s_memoryPlay
};
module.exports = exports['default'];

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(168);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".xgplayer-skin-default .xgplayer-memoryplay-spot{position:absolute;height:32px;left:10px;bottom:46px;background:rgba(0,0,0,.5);border-radius:32px;line-height:32px;color:#ddd;z-index:15;padding:0 32px 0 16px}.xgplayer-skin-default .xgplayer-memoryplay-spot .xgplayer-lasttime{color:red;font-weight:700}.xgplayer-skin-default .xgplayer-memoryplay-spot .btn-close{position:absolute;width:16px;height:16px;right:10px;top:2px;cursor:pointer;color:#fff;font-size:16px}", ""]);

// exports


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(0);

var _airplay = __webpack_require__(170);

var _airplay2 = _interopRequireDefault(_airplay);

__webpack_require__(171);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var s_airplay = function s_airplay() {
  var player = this;
  if (!player.config.airplay || !window.WebKitPlaybackTargetAvailabilityEvent) return;

  var btn = (0, _util.createDom)('xg-airplay', '<xg-icon class="xgplayer-icon">\n    <div class="xgplayer-icon-airplay">' + _airplay2.default + '</div>\n  </xg-icon>', {}, 'xgplayer-airplay');

  var tips = (0, _util.createDom)('xg-tips', '<span class="xgplayer-tip-airplay">' + player.lang.AIRPLAY_TIPS + '</span>', {}, 'xgplayer-tips');
  btn.appendChild(tips);
  player.once('ready', function () {
    player.controls.appendChild(btn);
    player.video.addEventListener('webkitplaybacktargetavailabilitychanged', function (event) {
      switch (event.availability) {
        case "available":
          btn.hidden = false;
          btn.disabled = false;
          break;
        case "not-available":
          btn.hidden = true;
          btn.disabled = true;
          break;
      }
    });
  });

  ['click', 'touchend'].forEach(function (item) {
    btn.addEventListener(item, function (e) {
      e.preventDefault();
      e.stopPropagation();
      player.userGestureTrigEvent('airplayBtnClick');
    });
  });
};

exports.default = {
  name: 's_airplay',
  method: s_airplay
};
module.exports = exports['default'];

/***/ }),
/* 170 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<svg t=\"1600422191774\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"3100\" width=\"28\" height=\"28\"><path d=\"M256 938.666667h512L512 597.333333 256 938.666667z m170.666667-85.333334l85.333333-113.781333L597.333333 853.333333H426.666667zM853.333333 85.333333H170.666667C99.946667 85.333333 42.666667 142.613333 42.666667 213.333333v426.666667c0 70.72 57.28 128 128 128h106.666666l64-85.333333H170.666667c-23.573333 0-42.666667-19.093333-42.666667-42.666667V213.333333c0-23.573333 19.093333-42.666667 42.666667-42.666666h682.666666c23.573333 0 42.666667 19.093333 42.666667 42.666666v426.666667c0 23.573333-19.093333 42.666667-42.666667 42.666667H682.666667l64 85.333333h106.666666c70.72 0 128-57.28 128-128V213.333333c0-70.72-57.28-128-128-128z\" p-id=\"3101\" fill=\"#ffffff\"></path></svg>");

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(172);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(2)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".xgplayer-skin-default .xgplayer-airplay{position:relative;-webkit-order:11;-moz-box-ordinal-group:12;order:11;display:block;cursor:pointer;margin-left:5px;margin-right:3px}.xgplayer-skin-default .xgplayer-airplay .xgplayer-icon{margin-top:6px;margin-left:6px}.xgplayer-skin-default .xgplayer-airplay .xgplayer-icon div{position:absolute}.xgplayer-skin-default .xgplayer-airplay .xgplayer-icon .xgplayer-icon-airplay{display:block}.xgplayer-skin-default .xgplayer-airplay .xgplayer-tips{position:absolute;right:0;left:auto}.xgplayer-skin-default .xgplayer-airplay .xgplayer-tips .xgplayer-tip-airplay{display:block}.xgplayer-skin-default .xgplayer-airplay:hover{opacity:.85}.xgplayer-skin-default .xgplayer-airplay:hover .xgplayer-tips{display:block}", ""]);

// exports


/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map