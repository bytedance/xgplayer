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
/******/ 	return __webpack_require__(__webpack_require__.s = 175);
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
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(176);


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _player = __webpack_require__(9);

var _player2 = _interopRequireDefault(_player);

var _mobile = __webpack_require__(37);

var _mobile2 = _interopRequireDefault(_mobile);

var _pc = __webpack_require__(38);

var _pc2 = _interopRequireDefault(_pc);

var _start = __webpack_require__(39);

var _start2 = _interopRequireDefault(_start);

var _start3 = __webpack_require__(40);

var _start4 = _interopRequireDefault(_start3);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var controlLst = [_mobile2.default, _pc2.default, _start2.default, _start4.default];
controlLst.forEach(function (control) {
    _player2.default.install(control.name, control.method);
});

exports.default = _player2.default;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=core_player.js.map