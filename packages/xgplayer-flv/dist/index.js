(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("xgplayer"));
	else if(typeof define === 'function' && define.amd)
		define(["xgplayer"], factory);
	else if(typeof exports === 'object')
		exports["xgplayer-flv"] = factory(require("xgplayer"));
	else
		root["xgplayer-flv"] = factory(root["xgplayer"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_xgplayer__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/concat-typed-array/lib/concat.js":
/*!*******************************************************!*\
  !*** ./node_modules/concat-typed-array/lib/concat.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (ResultConstructor) {
  var totalLength = 0;

  for (var _len = arguments.length, arrays = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    arrays[_key - 1] = arguments[_key];
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = arrays[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var arr = _step.value;

      totalLength += arr.length;
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

  var result = new ResultConstructor(totalLength);
  var offset = 0;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = arrays[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _arr = _step2.value;

      result.set(_arr, offset);
      offset += _arr.length;
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

  return result;
};

/***/ }),

/***/ "./node_modules/concat-typed-array/lib/index.js":
/*!******************************************************!*\
  !*** ./node_modules/concat-typed-array/lib/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _concat = __webpack_require__(/*! ./concat */ "./node_modules/concat-typed-array/lib/concat.js");

var _concat2 = _interopRequireDefault(_concat);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = _concat2.default;

/***/ }),

/***/ "./node_modules/d/index.js":
/*!*********************************!*\
  !*** ./node_modules/d/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign = __webpack_require__(/*! es5-ext/object/assign */ "./node_modules/es5-ext/object/assign/index.js"),
    normalizeOpts = __webpack_require__(/*! es5-ext/object/normalize-options */ "./node_modules/es5-ext/object/normalize-options.js"),
    isCallable = __webpack_require__(/*! es5-ext/object/is-callable */ "./node_modules/es5-ext/object/is-callable.js"),
    contains = __webpack_require__(/*! es5-ext/string/#/contains */ "./node_modules/es5-ext/string/#/contains/index.js"),
    d;

d = module.exports = function (dscr, value /*, options*/) {
	var c, e, w, options, desc;
	if (arguments.length < 2 || typeof dscr !== 'string') {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set /*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

/***/ }),

/***/ "./node_modules/es5-ext/function/noop.js":
/*!***********************************************!*\
  !*** ./node_modules/es5-ext/function/noop.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// eslint-disable-next-line no-empty-function

module.exports = function () {};

/***/ }),

/***/ "./node_modules/es5-ext/object/assign/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/es5-ext/object/assign/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! ./is-implemented */ "./node_modules/es5-ext/object/assign/is-implemented.js")() ? Object.assign : __webpack_require__(/*! ./shim */ "./node_modules/es5-ext/object/assign/shim.js");

/***/ }),

/***/ "./node_modules/es5-ext/object/assign/is-implemented.js":
/*!**************************************************************!*\
  !*** ./node_modules/es5-ext/object/assign/is-implemented.js ***!
  \**************************************************************/
/*! no static exports found */
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

/***/ "./node_modules/es5-ext/object/assign/shim.js":
/*!****************************************************!*\
  !*** ./node_modules/es5-ext/object/assign/shim.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = __webpack_require__(/*! ../keys */ "./node_modules/es5-ext/object/keys/index.js"),
    value = __webpack_require__(/*! ../valid-value */ "./node_modules/es5-ext/object/valid-value.js"),
    max = Math.max;

module.exports = function (dest, src /*, …srcn*/) {
	var error,
	    i,
	    length = max(arguments.length, 2),
	    assign;
	dest = Object(value(dest));
	assign = function assign(key) {
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

/***/ "./node_modules/es5-ext/object/is-callable.js":
/*!****************************************************!*\
  !*** ./node_modules/es5-ext/object/is-callable.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Deprecated



module.exports = function (obj) {
  return typeof obj === "function";
};

/***/ }),

/***/ "./node_modules/es5-ext/object/is-value.js":
/*!*************************************************!*\
  !*** ./node_modules/es5-ext/object/is-value.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _undefined = __webpack_require__(/*! ../function/noop */ "./node_modules/es5-ext/function/noop.js")(); // Support ES3 engines

module.exports = function (val) {
  return val !== _undefined && val !== null;
};

/***/ }),

/***/ "./node_modules/es5-ext/object/keys/index.js":
/*!***************************************************!*\
  !*** ./node_modules/es5-ext/object/keys/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! ./is-implemented */ "./node_modules/es5-ext/object/keys/is-implemented.js")() ? Object.keys : __webpack_require__(/*! ./shim */ "./node_modules/es5-ext/object/keys/shim.js");

/***/ }),

/***/ "./node_modules/es5-ext/object/keys/is-implemented.js":
/*!************************************************************!*\
  !*** ./node_modules/es5-ext/object/keys/is-implemented.js ***!
  \************************************************************/
/*! no static exports found */
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

/***/ "./node_modules/es5-ext/object/keys/shim.js":
/*!**************************************************!*\
  !*** ./node_modules/es5-ext/object/keys/shim.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(/*! ../is-value */ "./node_modules/es5-ext/object/is-value.js");

var keys = Object.keys;

module.exports = function (object) {
  return keys(isValue(object) ? Object(object) : object);
};

/***/ }),

/***/ "./node_modules/es5-ext/object/normalize-options.js":
/*!**********************************************************!*\
  !*** ./node_modules/es5-ext/object/normalize-options.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(/*! ./is-value */ "./node_modules/es5-ext/object/is-value.js");

var forEach = Array.prototype.forEach,
    create = Object.create;

var process = function process(src, obj) {
	var key;
	for (key in src) {
		obj[key] = src[key];
	}
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

/***/ "./node_modules/es5-ext/object/valid-callable.js":
/*!*******************************************************!*\
  !*** ./node_modules/es5-ext/object/valid-callable.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (fn) {
	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
	return fn;
};

/***/ }),

/***/ "./node_modules/es5-ext/object/valid-value.js":
/*!****************************************************!*\
  !*** ./node_modules/es5-ext/object/valid-value.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isValue = __webpack_require__(/*! ./is-value */ "./node_modules/es5-ext/object/is-value.js");

module.exports = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};

/***/ }),

/***/ "./node_modules/es5-ext/string/#/contains/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/es5-ext/string/#/contains/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(/*! ./is-implemented */ "./node_modules/es5-ext/string/#/contains/is-implemented.js")() ? String.prototype.contains : __webpack_require__(/*! ./shim */ "./node_modules/es5-ext/string/#/contains/shim.js");

/***/ }),

/***/ "./node_modules/es5-ext/string/#/contains/is-implemented.js":
/*!******************************************************************!*\
  !*** ./node_modules/es5-ext/string/#/contains/is-implemented.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.contains !== "function") return false;
	return str.contains("dwa") === true && str.contains("foo") === false;
};

/***/ }),

/***/ "./node_modules/es5-ext/string/#/contains/shim.js":
/*!********************************************************!*\
  !*** ./node_modules/es5-ext/string/#/contains/shim.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var indexOf = String.prototype.indexOf;

module.exports = function (searchString /*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};

/***/ }),

/***/ "./node_modules/event-emitter/index.js":
/*!*********************************************!*\
  !*** ./node_modules/event-emitter/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var d = __webpack_require__(/*! d */ "./node_modules/d/index.js"),
    callable = __webpack_require__(/*! es5-ext/object/valid-callable */ "./node_modules/es5-ext/object/valid-callable.js"),
    apply = Function.prototype.apply,
    call = Function.prototype.call,
    create = Object.create,
    defineProperty = Object.defineProperty,
    defineProperties = Object.defineProperties,
    hasOwnProperty = Object.prototype.hasOwnProperty,
    descriptor = { configurable: true, enumerable: false, writable: true },
    on,
    _once2,
    off,
    emit,
    methods,
    descriptors,
    base;

on = function on(type, listener) {
	var data;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) {
		data = descriptor.value = create(null);
		defineProperty(this, '__ee__', descriptor);
		descriptor.value = null;
	} else {
		data = this.__ee__;
	}
	if (!data[type]) data[type] = listener;else if (_typeof(data[type]) === 'object') data[type].push(listener);else data[type] = [data[type], listener];

	return this;
};

_once2 = function once(type, listener) {
	var _once, self;

	callable(listener);
	self = this;
	on.call(this, type, _once = function once() {
		off.call(self, type, _once);
		apply.call(listener, this, arguments);
	});

	_once.__eeOnceListener__ = listener;
	return this;
};

off = function off(type, listener) {
	var data, listeners, candidate, i;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) return this;
	data = this.__ee__;
	if (!data[type]) return this;
	listeners = data[type];

	if ((typeof listeners === 'undefined' ? 'undefined' : _typeof(listeners)) === 'object') {
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

emit = function emit(type) {
	var i, l, listener, listeners, args;

	if (!hasOwnProperty.call(this, '__ee__')) return;
	listeners = this.__ee__[type];
	if (!listeners) return;

	if ((typeof listeners === 'undefined' ? 'undefined' : _typeof(listeners)) === 'object') {
		l = arguments.length;
		args = new Array(l - 1);
		for (i = 1; i < l; ++i) {
			args[i - 1] = arguments[i];
		}listeners = listeners.slice();
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
	once: _once2,
	off: off,
	emit: emit
};

descriptors = {
	on: d(on),
	once: d(_once2),
	off: d(off),
	emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function exports(o) {
	return o == null ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, description, main, scripts, repository, keywords, author, license, devDependencies, peerDependency, dependencies, default */
/***/ (function(module) {

module.exports = {"name":"xgplayer-flv","version":"1.1.0","description":"flv demuxer for xgplayer","main":"./dist/index.js","scripts":{"test":"echo \"Error: no test specified\" && exit 1","prepare":"npm run build","dev":"webpack --progress --display-chunks --watch --config ./webpack.config.dev.js","build":"webpack --progress --display-chunks -p","watch":"webpack --progress --display-chunks -p --watch"},"repository":{"type":"git","url":"git+https://github.com/bytedance/xgplayer.git"},"keywords":[],"author":"leo","license":"MIT","devDependencies":{"babel":"^6.23.0","babel-env":"^2.4.1","babel-eslint":"^8.2.2","babel-loader":"^7.1.2","babel-plugin-transform-react-constant-elements":"^6.23.0","babel-preset-es2015":"^6.24.1","clean-webpack-plugin":"^0.1.17","css-loader":"^0.28.10","extract-text-webpack-plugin":"^3.0.2","html-loader":"^0.5.5","html-webpack-plugin":"^2.30.1","style-loader":"^0.20.2","webpack":"^4.12.0","webpack-dev-server":"^2.11.1"},"peerDependency":{"xgplayer":"^0.1.0"},"dependencies":{"babel-plugin-transform-class-properties":"^6.24.1","babel-plugin-transform-decorators":"^6.24.1","babel-plugin-transform-react-inline-elements":"^6.22.0","concat-typed-array":"^1.0.2","event-emitter":"^0.3.5"}};

/***/ }),

/***/ "./src/Flv.js":
/*!********************!*\
  !*** ./src/Flv.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author fuyuhao
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _MainParser = __webpack_require__(/*! ./parse/MainParser */ "./src/parse/MainParser.js");

var _MainParser2 = _interopRequireDefault(_MainParser);

var _MSE = __webpack_require__(/*! ./parse/MSE */ "./src/parse/MSE.js");

var _MSE2 = _interopRequireDefault(_MSE);

var _VodTask = __webpack_require__(/*! ./tasks/VodTask */ "./src/tasks/VodTask.js");

var _VodTask2 = _interopRequireDefault(_VodTask);

var _config = __webpack_require__(/*! ./constants/config */ "./src/constants/config.js");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable no-unused-vars */
var Flv = function () {
  function Flv(options, player) {
    _classCallCheck(this, Flv);

    this._player = player;
    this._options = Object.assign({}, (0, _config2.default)(), options);
    this.flvPlayer = new _MainParser2.default(this._options, player);
    this.mse = new _MSE2.default();
    this.isSeeking = false;
    this.isDataLoading = false;
    this.tempCurrentTime = 0;
    this.tempFlvPlayer = null;
    this.isChangingSrc = false;
    this.initPlayerEvents(player, this._options);
    this.initFlvPlayerEvents(this.flvPlayer, this.mse);
    this.initMseEvents(this.mse, this.flvPlayer);
  }

  _createClass(Flv, [{
    key: 'load',
    value: function load() {
      this.flvPlayer.startLoadData();
    }
  }, {
    key: 'initPlayerEvents',
    value: function initPlayerEvents(player, options) {
      var _this = this;

      var mse = this.mse;

      player.mse = mse;
      this.handleSeeking = function () {
        if (_this.isChangingSrc) {
          _this.isChangingSrc = false;
          return;
        }
        var buffered = player.buffered,
            currentTime = player.currentTime;

        var isBuffered = false;
        if (buffered.length) {
          for (var i = 0, len = buffered.length; i < len; i++) {
            if (currentTime > buffered.start(i) && currentTime < buffered.end(i)) {
              isBuffered = true;
              break;
            }
          }
        }
        if (isBuffered) {
          return;
        }
        _VodTask2.default.clear();
        if (!_this.isSeekable) {
          _this._player.currentTime = _this.tempCurrentTime;
          return;
        }
        _this.flvPlayer.seek(player.currentTime);
        _this.isSeeking = true;
      };
      if (!options.isLive) {
        player.on('seeking', function () {
          _this.handleSeeking();
        });
      }
      this.handleTimeUpdate = function () {
        _this.tempCurrentTime = player.currentTime;
        if (!_this.isSeeking && _this.flvPlayer.isMediaInfoReady && !_this.tempFlvPlayer) {
          _this.progressChecker(player);
        }
        _this.isEnded(player, _this.flvPlayer);
      };
      player.on('timeupdate', function () {
        _this.handleTimeUpdate();
      });
      player._replay = function () {
        player.mse.destroy();
        _VodTask2.default.clear();
        var _mse = new _MSE2.default();
        _this.flvPlayer.replay();

        mse.on('sourceopen', function () {
          _this.flvPlayer.isSourceOpen = true;
          mse.appendBuffer(_this.flvPlayer.ftyp_moov.buffer);
          setTimeout(function () {
            player.play();
          }, 0);
          mse.on('updateend', function () {
            var _flvPlayer = _this.flvPlayer,
                pendingFragments = _flvPlayer.pendingFragments,
                hasPendingFragments = _flvPlayer.hasPendingFragments;

            _this.isSeeking = false;
            if (hasPendingFragments) {
              var fragment = pendingFragments.shift();
              if (!mse.appendBuffer(fragment.data)) {
                pendingFragments.unshift(fragment);
              } else {
                player.emit('cacheupdate', player);
              }
            }
          });
        });
        mse.on('error', function (e) {
          player.emit('error', e);
        });

        player.mse = mse;
        player.video.src = _this.mse.url;
        return true;
      };

      player.switchURL = function (url) {
        _this._options.url = url;
        // this.flvPlayer.unbindEvents()

        if (!player.config.isLive) {
          _VodTask2.default.clear();
          var tempFlvPlayer = _this.tempFlvPlayer = new _MainParser2.default(_this._options, player);

          tempFlvPlayer.isSourceOpen = true;
          tempFlvPlayer.isTempPlayer = true;
          _this.initFlvPlayerEvents(tempFlvPlayer, mse);
          tempFlvPlayer.handleMediaFragment = function () {
            _this.isSeeking = false;
            _this.unbindFlvPlayerEvents(_this.flvPlayer);
            _this.flvPlayer.destroy();
            _this.flvPlayer = tempFlvPlayer;
            _this.tempFlvPlayer = null;

            mse.appendBuffer(tempFlvPlayer.ftyp_moov);
            tempFlvPlayer.handleMediaFragment = function (fragment) {
              return mse.appendBuffer(fragment.data);
            };
            return false;
          };
          tempFlvPlayer.startLoadData();
        }
      };
    }
  }, {
    key: 'unbindFlvPlayerEvents',
    value: function unbindFlvPlayerEvents(flvPlayer) {
      flvPlayer.handleSeekEnd = function () {
        return null;
      };
      flvPlayer.handleError = function () {
        return null;
      };
      flvPlayer.handleMediaFragment = function () {
        return null;
      };
    }
  }, {
    key: 'initFlvPlayerEvents',
    value: function initFlvPlayerEvents(flvPlayer, mse) {
      var _this2 = this;

      var handleFtypMoov = function handleFtypMoov(ftypMoov) {
        if (flvPlayer.isSourceOpen && !_this2.tempFlvPlayer) {
          mse.appendBuffer(ftypMoov.buffer);
        } else if (!_this2.isChangingSrc) {
          _this2.isSeeking = true;
          flvPlayer.seek(_this2._player.currentTime);
        }
      };
      flvPlayer.once('ready', handleFtypMoov);
      flvPlayer.handleSeekEnd = function () {
        _this2.isSeeking = false;
      };
      flvPlayer.handleError = function (e) {
        this._player.emit('error', e);
      };
      if (!this.tempFlvPlayer) {
        flvPlayer.handleMediaFragment = function (fragment) {
          return _this2.tempFlvPlayer ? false : mse.appendBuffer(fragment.data);
        };
      }
    }
  }, {
    key: 'initMseEvents',
    value: function initMseEvents(mse) {
      var _this3 = this;

      mse.on('error', function (e) {
        _this3._player.emit('error', e);
      });
      var onSourceOpen = function onSourceOpen() {
        _this3.flvPlayer.isSourceOpen = true;
        if (_this3.flvPlayer.ftyp_moov !== null) {
          mse.appendBuffer(_this3.flvPlayer.ftyp_moov.buffer);
        }

        mse.on('updateend', function () {
          var _flvPlayer2 = _this3.flvPlayer,
              pendingFragments = _flvPlayer2.pendingFragments,
              hasPendingFragments = _flvPlayer2.hasPendingFragments;


          if (hasPendingFragments) {
            var fragment = pendingFragments.shift();
            if (!mse.appendBuffer(fragment.data)) {
              pendingFragments.unshift(fragment);
            } else {
              _this3._player.emit('cacheupdate', _this3._player);
            }
          }
        });
      };
      mse.on('sourceopen', onSourceOpen);
    }
  }, {
    key: 'loadData',
    value: function loadData(currentTime) {
      return this.flvPlayer.loadSegments(true, currentTime, this._options.preloadTime);
    }
  }, {
    key: 'progressChecker',
    value: function progressChecker(player) {
      var _this4 = this;

      var _options = this._options,
          minCachedTime = _options.minCachedTime,
          preloadTime = _options.preloadTime;

      var range = player.getBufferedRange();
      if (this.flvPlayer.videoDuration - range[1] * this.flvPlayer.videoTimeScale < 0.1 * this.flvPlayer.videoTimeScale) {
        return;
      }
      if (range[1] - player.currentTime < minCachedTime && !this.isDataLoading) {
        this.isDataLoading = true;
        this.flvPlayer.loadSegments(true, player.currentTime, preloadTime).then(function () {
          _this4.isDataLoading = false;
        });
      }
    }
  }, {
    key: 'clearPlayerCache',
    value: function clearPlayerCache() {
      var range = this._player.getBufferedRange();
      if (range.length === 2) {
        // this.mse.removeBuffer(range[0], range[1])
      }
    }
  }, {
    key: 'isEnded',
    value: function isEnded(player, flv) {
      if (flv.videoDuration - player.currentTime * flv.videoTimeScale < 2 * flv.videoTimeScale) {
        var range = player.getBufferedRange();
        if (player.currentTime - range[1] < 0.1) {
          this.mse.endOfStream();
        }
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      _VodTask2.default.clear();
      this._options = {};
      this.mse = null;
      this.isSeeking = false;
      this.isDataLoading = false;
      this.tempCurrentTime = 0;
      this.tempFlvPlayer = null;
      this.isChangingSrc = false;
      this.handleTimeUpdate = function () {};
      this.handleSeeking = function () {};
      this.flvPlayer.destroy();
      this._player.pause();
    }
  }, {
    key: 'isSeekable',
    get: function get() {
      return this.flvPlayer.isSeekable;
    }
  }]);

  return Flv;
}();

exports.default = Flv;

/***/ }),

/***/ "./src/constants/config.js":
/*!*********************************!*\
  !*** ./src/constants/config.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getDefaultConf = function getDefaultConf() {
  return {
    preloadTime: 30,
    minCachedTime: 5,
    autoCleanSourceBuffer: true,
    autoCleanMaxBackTime: 30,
    isLive: false,
    cors: true
  };
};

exports.default = getDefaultConf;

/***/ }),

/***/ "./src/constants/metaFields.js":
/*!*************************************!*\
  !*** ./src/constants/metaFields.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var fields = [{
  name: 'duration',
  type: Boolean,
  parser: function parser(target, origin) {
    target.mediaInfo.duration = origin.duration;
  }
}, {
  name: 'hasAudio',
  type: Boolean,
  parser: function parser(target, origin) {
    target.mediaInfo.hasAudio = origin.hasAudio;
  }
}, {
  name: 'hasVideo',
  type: Boolean,
  parser: function parser(target, origin) {
    target.mediaInfo.hasVideo = origin.hasVideo;
  }
}, {
  name: 'audiodatarate',
  type: Number,
  parser: function parser(target, origin) {
    target.mediaInfo.audioDataRate = origin.audiodatarate;
  }
}, {
  name: 'videodatarate',
  type: Number,
  parser: function parser(target, origin) {
    target.mediaInfo.videoDataRate = origin.videodatarate;
  }
}, {
  name: 'width',
  type: Number,
  parser: function parser(target, origin) {
    target.mediaInfo.width = origin.width;
  }
}, {
  name: 'height',
  type: Number,
  parser: function parser(target, origin) {
    target.mediaInfo.height = origin.height;
  }
}, {
  name: 'duration',
  type: Number,
  parser: function parser(target, origin) {
    if (!target.state.duration) {
      var duration = Math.floor(origin.duration * target.state.timeScale);
      target.state.duration = target.mediaInfo.duration = duration;
    }
  },
  onTypeErr: function onTypeErr(target) {
    target.mediaInfo.duration = 0;
  }
}, {
  name: 'framerate',
  type: Number,
  parser: function parser(target, origin) {
    var fpsNum = Math.floor(origin.framerate * 1000);
    if (fpsNum > 0) {
      var fps = fpsNum / 1000;
      var referFrameRate = target.referFrameRate,
          mediaInfo = target.mediaInfo;

      referFrameRate.fixed = true;
      referFrameRate.fps = fps;
      referFrameRate.fpsNum = fpsNum;
      referFrameRate.fpsDen = 1000;
      mediaInfo.fps = fps;
    }
  }
}, {
  name: 'keyframes',
  type: Object,
  parser: function parser(target, origin) {
    var keyframes = origin.keyframes;

    target.mediaInfo.hasKeyframes = !!keyframes;
    if (keyframes) {
      target.mediaInfo.keyframes = this._parseKeyframes(keyframes);
    }
    origin.keyframes = null;
  },
  onTypeErr: function onTypeErr(target) {
    target.mediaInfo.hasKeyframes = false;
  }
}];
exports.default = fields;

/***/ }),

/***/ "./src/constants/types.js":
/*!********************************!*\
  !*** ./src/constants/types.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var MetaTypes = exports.MetaTypes = {
  NUMBER: 0,
  BOOLEAN: 1,
  STRING: 2,
  OBJECT: 3,
  MIX_ARRAY: 8,
  OBJECT_END: 9,
  STRICT_ARRAY: 10,
  DATE: 11,
  LONE_STRING: 12
};

var EventTypes = exports.EventTypes = {
  DATA_READY: 'data_ready',
  META_DATA_READY: 'meta_data_ready',
  TRACK_META_READY: 'track_meta_ready',
  MEDIA_INFO_READY: 'media_info_ready',
  META_END_POSITION: 'meta_end_position',
  ERROR: 'error'
};

var soundRateTypes = exports.soundRateTypes = [5500, 11000, 22000, 4400];

var AudioObjectTypes = exports.AudioObjectTypes = {
  0: 'Null',
  1: 'AAC Main',
  2: 'AAC LC',
  3: 'AAC SSR(Scalable Sample Rate)',
  4: 'AAC LTP(Long Term Prediction)',
  5: 'HE-AAC / SBR(Spectral Band Replication)',
  6: 'AAC Scalable'
};

var samplingFrequencyTypes = exports.samplingFrequencyTypes = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000];

var browserTypes = exports.browserTypes = {
  IE: 'ie',
  FIRE_FOX: 'firefox',
  CHROME: 'chrome',
  OPERA: 'opera',
  SAFARI: 'safari'
};

var mp3Versions = exports.mp3Versions = {
  V25: 0,
  RESERVED: 1,
  V20: 2,
  V10: 3
};

var audioSampleRate = exports.audioSampleRate = {
  V10: [44100, 48000, 32000, 0],
  V20: [22050, 24000, 16000, 0],
  V25: [11025, 12000, 8000, 0]
};

var mp3BitRate = exports.mp3BitRate = {
  Layer1: [0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, -1],
  Layer2: [0, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, -1],
  Layer3: [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, -1]
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _xgplayer = __webpack_require__(/*! xgplayer */ "xgplayer");

var _xgplayer2 = _interopRequireDefault(_xgplayer);

var _VodTask = __webpack_require__(/*! ./tasks/VodTask */ "./src/tasks/VodTask.js");

var _VodTask2 = _interopRequireDefault(_VodTask);

var _Flv = __webpack_require__(/*! ./Flv */ "./src/Flv.js");

var _Flv2 = _interopRequireDefault(_Flv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlvPlayer = function (_Player) {
  _inherits(FlvPlayer, _Player);

  function FlvPlayer(options) {
    _classCallCheck(this, FlvPlayer);

    var _this = _possibleConstructorReturn(this, (FlvPlayer.__proto__ || Object.getPrototypeOf(FlvPlayer)).call(this, options));

    _this._options = options;
    _this.__flv__ = null;
    _this.init(options);

    Object.defineProperty(_this, 'src', {
      set: function set(val) {
        if (typeof val === 'string' && val.startsWith('blob:')) {
          return;
        }
        _this._options.url = val;
        _this.__flv__.destroy();
        _this.__flv__ = new _Flv2.default(_this._options, _this);
        _this.__flv__.load();
        _this.video.src = _this.__flv__.mse.url;
        _this.currentTime = 0;
        setTimeout(function () {
          _this.play();
        }, 0);
      },
      get: function get() {
        return _this._options.url;
      },
      configurable: true
    });

    if (options.autoplay) {
      _this.start();
    }
    return _this;
  }

  _createClass(FlvPlayer, [{
    key: 'init',
    value: function init(options) {
      var player = this;
      var isLive = options.isLive;

      player.__flv__ = new _Flv2.default(options, player);
      player.once('complete', function () {
        player.createInstance(player.__flv__);
      });
      player.on('pause', function () {
        !isLive && _VodTask2.default.clear();
      });
      this.once('destroy', function () {
        _VodTask2.default.clear();
        player.__flv__.destroy();
        player.__flv__.mse = null;
        player.video.src = '';
        player.__flv__ = null;
      });
    }
  }, {
    key: 'createInstance',
    value: function createInstance(flv) {
      var player = this;
      if (this._options.isLive) {
        _xgplayer2.default.util.addClass(player.root, 'xgplayer-is-live');
        var live = _xgplayer2.default.util.createDom('xg-live', '正在直播', {}, 'xgplayer-live');
        player.controls.appendChild(live);
      }
      flv.load();
    }
  }, {
    key: 'start',
    value: function start() {
      if (!this.inited) {
        return;
      }
      var flvPlayer = this.__flv__;
      _get(FlvPlayer.prototype.__proto__ || Object.getPrototypeOf(FlvPlayer.prototype), 'start', this).call(this, flvPlayer.mse.url);
      this.src = flvPlayer.mse.url;
      return true;
    }
  }, {
    key: 'inited',
    get: function get() {
      return this.__flv__ !== undefined;
    }
  }]);

  return FlvPlayer;
}(_xgplayer2.default);

module.exports = FlvPlayer;

/***/ }),

/***/ "./src/models/MediaInfo.js":
/*!*********************************!*\
  !*** ./src/models/MediaInfo.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MediaInfo = function () {
    function MediaInfo(data) {
        var _this = this;

        _classCallCheck(this, MediaInfo);

        var _default = {
            mimeType: null,
            codec: '',
            duration: null,
            hasAudio: false,
            hasVideo: false,
            audioCodec: null,
            videoCodec: null,

            videoDataRate: null,
            audioDataRate: null,
            audioSampleRate: null,
            audioChannelCount: null,
            audioConfig: null,

            width: null,
            height: null,
            fps: null,
            profile: null,
            level: null,
            chromaFormat: null,

            pixelRatio: [],

            _metaData: null,
            segments: [],
            hasKeyframes: null,
            keyframes: []
        };

        var initData = Object.assign({}, _default, data);
        Object.entries(initData).forEach(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                k = _ref2[0],
                v = _ref2[1];

            _this[k] = v;
        });
    }

    _createClass(MediaInfo, [{
        key: 'isComplete',
        get: function get() {
            var mimeType = this.mimeType,
                duration = this.duration,
                hasKeyframes = this.hasKeyframes;

            return mimeType !== null && duration !== null && hasKeyframes !== null && this.isVideoInfoFilled && this.isAudioInfoFilled;
        }
    }, {
        key: 'isAudioInfoFilled',
        get: function get() {
            var hasAudio = this.hasAudio,
                audioCodec = this.audioCodec,
                audioSampleRate = this.audioSampleRate,
                audioChannelCount = this.audioChannelCount;


            return !!(!hasAudio || hasAudio && audioCodec && audioSampleRate && audioChannelCount);
        }
    }, {
        key: 'isVideoInfoFilled',
        get: function get() {
            var notNullFields = ['videoCodec', 'width', 'height', 'fps', 'profile', 'level', 'chromaFormat'];
            for (var i = 0, len = notNullFields.length; i < len; i++) {
                if (this[notNullFields[i]] === null) {
                    return false;
                }
            }

            return this.hasVideo;
        }
    }]);

    return MediaInfo;
}();

exports.default = MediaInfo;

/***/ }),

/***/ "./src/models/MediaSample.js":
/*!***********************************!*\
  !*** ./src/models/MediaSample.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MediaSample = function () {
    function MediaSample(info) {
        var _this = this;

        _classCallCheck(this, MediaSample);

        var _default = MediaSample.getDefaultInf();

        if (!info || Object.prototype.toString.call(info) !== '[object Object]') {
            return _default;
        }
        var sample = Object.assign({}, _default, info);

        Object.entries(sample).forEach(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                k = _ref2[0],
                v = _ref2[1];

            _this[k] = v;
        });
    }

    _createClass(MediaSample, null, [{
        key: 'getDefaultInf',
        value: function getDefaultInf() {
            return {
                dts: null,
                pts: null,
                duration: null,
                position: null,
                isRAP: false, // is Random access point
                originDts: null
            };
        }
    }]);

    return MediaSample;
}();

exports.default = MediaSample;

/***/ }),

/***/ "./src/models/MediaSegment.js":
/*!************************************!*\
  !*** ./src/models/MediaSegment.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MediaSegment = function () {
    function MediaSegment() {
        _classCallCheck(this, MediaSegment);

        this.startDts = -1;
        this.endDts = -1;
        this.startPts = -1;
        this.endPts = -1;
        this.originStartDts = -1;
        this.originEndDts = -1;
        this.randomAccessPoints = [];
        this.firstSample = null;
        this.lastSample = null;
    }

    _createClass(MediaSegment, [{
        key: "addRAP",
        value: function addRAP(sample) {
            sample.isRAP = true;
            this.randomAccessPoints.push(sample);
        }
    }]);

    return MediaSegment;
}();

exports.default = MediaSegment;

/***/ }),

/***/ "./src/models/MediaSegmentList.js":
/*!****************************************!*\
  !*** ./src/models/MediaSegmentList.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MediaSegmentList = function () {
    function MediaSegmentList(type) {
        _classCallCheck(this, MediaSegmentList);

        this._type = type;
        this._list = [];
        this._lastAppendLocation = -1; // cached last insert location
    }

    _createClass(MediaSegmentList, [{
        key: "isEmpty",
        value: function isEmpty() {
            return this._list.length === 0;
        }
    }, {
        key: "clear",
        value: function clear() {
            this._list = [];
            this._lastAppendLocation = -1;
        }
    }, {
        key: "_searchNearestSegmentBefore",
        value: function _searchNearestSegmentBefore(beginDts) {
            var list = this._list;
            if (list.length === 0) {
                return -2;
            }
            var last = list.length - 1;
            var mid = 0;
            var lbound = 0;
            var ubound = last;

            var idx = 0;

            if (beginDts < list[0].originDts) {
                idx = -1;
                return idx;
            }

            while (lbound <= ubound) {
                mid = lbound + Math.floor((ubound - lbound) / 2);
                if (mid === last || beginDts > list[mid].lastSample.originDts && beginDts < list[mid + 1].originDts) {
                    idx = mid;
                    break;
                } else if (list[mid].originDts < beginDts) {
                    lbound = mid + 1;
                } else {
                    ubound = mid - 1;
                }
            }
            return idx;
        }
    }, {
        key: "_searchNearestSegmentAfter",
        value: function _searchNearestSegmentAfter(beginDts) {
            return this._searchNearestSegmentBefore(beginDts) + 1;
        }
    }, {
        key: "append",
        value: function append(segment) {
            var list = this._list;
            var lastAppendIdx = this._lastAppendLocation;
            var insertIdx = 0;

            if (lastAppendIdx !== -1 && lastAppendIdx < list.length && segment.originStartDts >= list[lastAppendIdx].lastSample.originDts && (lastAppendIdx === list.length - 1 || lastAppendIdx < list.length - 1 && segment.originStartDts < list[lastAppendIdx + 1].originStartDts)) {
                insertIdx = lastAppendIdx + 1; // use cached location idx
            } else {
                if (list.length > 0) {
                    insertIdx = this._searchNearestSegmentBefore(segment.originStartDts) + 1;
                }
            }

            this._lastAppendLocation = insertIdx;
            this._list.splice(insertIdx, 0, segment);
        }
    }, {
        key: "getLastSegmentBefore",
        value: function getLastSegmentBefore(beginDts) {
            var idx = this._searchNearestSegmentBefore(beginDts);
            if (idx >= 0) {
                return this._list[idx];
            } else {
                // -1
                return null;
            }
        }
    }, {
        key: "getLastSampleBefore",
        value: function getLastSampleBefore(beginDts) {
            var segment = this.getLastSegmentBefore(beginDts);
            if (segment !== null) {
                return segment.lastSample;
            } else {
                return null;
            }
        }
    }, {
        key: "getLastRAPBefore",
        value: function getLastRAPBefore(beginDts) {
            var segmentIdx = this._searchNearestSegmentBefore(beginDts);
            var randomAccessPoints = this._list[segmentIdx].randomAccessPoints;
            while (randomAccessPoints.length === 0 && segmentIdx > 0) {
                segmentIdx--;
                randomAccessPoints = this._list[segmentIdx].randomAccessPoints;
            }
            if (randomAccessPoints.length > 0) {
                return randomAccessPoints[randomAccessPoints.length - 1];
            } else {
                return null;
            }
        }
    }, {
        key: "type",
        get: function get() {
            return this._type;
        }
    }, {
        key: "length",
        get: function get() {
            return this._list.length;
        }
    }]);

    return MediaSegmentList;
}();

exports.default = MediaSegmentList;

/***/ }),

/***/ "./src/models/Store.js":
/*!*****************************!*\
  !*** ./src/models/Store.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MediaInfo = __webpack_require__(/*! ./MediaInfo */ "./src/models/MediaInfo.js");

var _MediaInfo2 = _interopRequireDefault(_MediaInfo);

var _sniffer = __webpack_require__(/*! ../utils/sniffer */ "./src/utils/sniffer.js");

var _sniffer2 = _interopRequireDefault(_sniffer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = function () {
  function Store() {
    _classCallCheck(this, Store);

    this.state = {
      isLe: _sniffer2.default.isLe,
      _hasAudio: false,
      _hasVideo: false,
      _mediaInfo: new _MediaInfo2.default(),
      _metaData: null,
      _videoTrack: { type: 'video', id: 1, samples: [], length: 0 },
      _audioTrack: { type: 'audio', id: 2, samples: [], length: 0 },
      _videoMetaData: null,
      _audioMetaData: null,
      _audioInitialMetadataDispatched: false,
      _videoInitialMetadataDispatched: false,
      tags: [],
      timeStampBase: 0,
      hasVideoFlagOverrided: false,
      hasAudioFlagOverrided: false,
      timeScale: 1000,
      duration: 0,
      isLive: false,
      durationOverrided: false,
      naluLengthSize: 4,
      _referFrameRate: {
        fixed: true,
        fps: 23.976,
        fpsNum: 23976,
        fpsDen: 1000
      },
      metaEndPosition: -1
    };

    this.methods = {
      _isInitialMetadataDispatched: function () {
        var _state = this.state,
            _hasAudio = _state._hasAudio,
            _hasVideo = _state._hasVideo,
            _audioInitialMetadataDispatched = _state._audioInitialMetadataDispatched,
            _videoInitialMetadataDispatched = _state._videoInitialMetadataDispatched;

        if (_hasAudio && _hasVideo) {
          // both audio & video
          return _audioInitialMetadataDispatched && _videoInitialMetadataDispatched;
        }
        if (_hasAudio && !_hasVideo) {
          // audio only
          return this._audioInitialMetadataDispatched;
        }
        if (!_hasAudio && _hasVideo) {
          // video only
          return _videoInitialMetadataDispatched;
        }
        return false;
      }.bind(this)
    };
  }

  _createClass(Store, [{
    key: 'clearTags',
    value: function clearTags() {
      this.state.tags = [];
    }
  }, {
    key: 'referFrameRate',
    get: function get() {
      return this.state._referFrameRate;
    },
    set: function set(val) {
      this.state._referFrameRate = val;
    }
  }, {
    key: 'mediaInfo',
    set: function set(mediaInfo) {
      this.state._mediaInfo = mediaInfo;
    },
    get: function get() {
      return this.state._mediaInfo;
    }
  }, {
    key: 'metaData',
    get: function get() {
      return this.state._metaData;
    },
    set: function set(v) {
      this.state._metaData = v;
    }
  }, {
    key: 'hasMetaData',
    get: function get() {
      return this.state._metaData !== null;
    }
  }, {
    key: 'audioTrack',
    set: function set(val) {
      this.state._audioTrack = val;
    },
    get: function get() {
      return this.state._audioTrack;
    }
  }, {
    key: 'videoTrack',
    set: function set(val) {
      this.state._videoTrack = val;
    },
    get: function get() {
      return this.state._videoTrack;
    }
  }, {
    key: 'hasAudio',
    set: function set(val) {
      this.state._hasAudio = val;
      this.state._mediaInfo.hasAudio = val;
    },
    get: function get() {
      return this.state._hasAudio;
    }
  }, {
    key: 'hasVideo',
    set: function set(val) {
      this.state._hasVideo = val;
      this.state._mediaInfo.hasVideo = val;
    },
    get: function get() {
      return this.state._hasVideo;
    }
  }, {
    key: 'videoMetaData',
    set: function set(val) {
      this.state._videoMetaData = val;
    },
    get: function get() {
      return this.state._videoMetaData;
    }
  }, {
    key: 'audioMetaData',
    set: function set(val) {
      this.state._audioMetaData = val;
    },
    get: function get() {
      return this.state._audioMetaData;
    }
  }, {
    key: 'keyframes',
    get: function get() {
      return this.state._mediaInfo.keyframes;
    }
  }, {
    key: 'isSeekable',
    get: function get() {
      return this.state._mediaInfo.hasKeyframes;
    }
  }, {
    key: 'isLe',
    get: function get() {
      return this.state.isLe;
    }
  }, {
    key: 'hasInitialMetaDispatched',
    get: function get() {
      var _state2 = this.state,
          _hasAudio = _state2._hasAudio,
          _hasVideo = _state2._hasVideo,
          _audioInitialMetadataDispatched = _state2._audioInitialMetadataDispatched,
          _videoInitialMetadataDispatched = _state2._videoInitialMetadataDispatched;

      if (_hasAudio && _hasVideo) {
        return _audioInitialMetadataDispatched && _videoInitialMetadataDispatched;
      }
      if (_hasAudio && !_hasVideo) {
        return this._audioInitialMetadataDispatched;
      }
      if (!_hasAudio && _hasVideo) {
        return _videoInitialMetadataDispatched;
      }
      return false;
    }
  }, {
    key: 'videoTimeScale',
    get: function get() {
      return this.state.timeScale;
    }
  }, {
    key: 'metaEndPosition',
    get: function get() {
      return this.state.metaEndPosition;
    },
    set: function set(pos) {
      this.state.metaEndPosition = pos;
    }
  }, {
    key: 'isLive',
    get: function get() {
      return this.state.isLive;
    },
    set: function set(val) {
      this.state.isLive = val;
    }
  }]);

  return Store;
}();

exports.default = Store;

/***/ }),

/***/ "./src/models/Tag.js":
/*!***************************!*\
  !*** ./src/models/Tag.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FlvTag = function () {
    function FlvTag() {
        _classCallCheck(this, FlvTag);

        this.tagType = -1;
        this.bodySize = -1;
        this.tagSize = -1;
        this.position = -1;
        this.Timestamp = -1;
        this.StreamID = -1;
        this.body = -1;
        this.time = -1;
        this.arr = [];
    }

    _createClass(FlvTag, [{
        key: 'getTime',
        value: function getTime() {
            this.arr = [];
            for (var i = 0; i < this.Timestamp.length; i++) {
                this.arr.push(this.Timestamp[i].toString(16).length === 1 ? '0' + this.Timestamp[i].toString(16) : this.Timestamp[i].toString(16));
            }
            this.arr.pop();
            var time = this.arr.join('');
            this.time = parseInt(time, 16);
            return parseInt(time, 16);
        }
    }]);

    return FlvTag;
}();

exports.default = FlvTag;

/***/ }),

/***/ "./src/models/error.js":
/*!*****************************!*\
  !*** ./src/models/error.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _package = __webpack_require__(/*! ../../package.json */ "./package.json");

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
  r.playerVersion = _package.version; // 播放器版本
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

exports.default = Errors;

/***/ }),

/***/ "./src/parse/FlvParser.js":
/*!********************************!*\
  !*** ./src/parse/FlvParser.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Demuxer2 = __webpack_require__(/*! ./demux/Demuxer */ "./src/parse/demux/Demuxer.js");

var _Demuxer3 = _interopRequireDefault(_Demuxer2);

var _Buffer = __webpack_require__(/*! ../write/Buffer */ "./src/write/Buffer.js");

var _Buffer2 = _interopRequireDefault(_Buffer);

var _Tag = __webpack_require__(/*! ../models/Tag */ "./src/models/Tag.js");

var _Tag2 = _interopRequireDefault(_Tag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlvParser = function (_Demuxer) {
  _inherits(FlvParser, _Demuxer);

  function FlvParser(store) {
    _classCallCheck(this, FlvParser);

    var _this = _possibleConstructorReturn(this, (FlvParser.__proto__ || Object.getPrototypeOf(FlvParser)).call(this, store));

    _this.CLASS_NAME = _this.constructor.name;
    _this.temp_u8a = null;
    _this.dataLen = 0;
    _this.stop = false;
    _this.index = 0; // record the position in single round
    _this.offset = 0;
    _this.filePosition = 0; // record current file position
    _this.firstFlag = true;
    return _this;
  }

  _createClass(FlvParser, [{
    key: 'seek',
    value: function seek() {
      this.offset = 0;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.temp_u8a = null;
      this.dataLen = 0;
      this.stop = false;
      this.index = 0; // record the position in single round
      this.offset = 0;
      this.filePosition = 0;
    }
  }, {
    key: 'setFlv',
    value: function setFlv(flvU8a) {
      this.stop = false;
      this.index = 0;
      this.offset = 0;
      var tempU8a = this.temp_u8a = flvU8a;
      this.dataLen = this.temp_u8a.length;

      if (!this.firstFlag) {
        return this.parseData();
      } else if (tempU8a.length > 13 && FlvParser.isFlvHead(tempU8a)) {
        this.parseHead();
        this.readData(9); // 跳过头部
        this.readData(4); // 跳过下一个记录头部size的 int32
        this.parseData();
        this.firstFlag = false;
        this.filePosition += this.offset;
        return this.offset;
      } else {
        return this.offset;
      }
    }
  }, {
    key: 'parseData',
    value: function parseData() {
      var u8aLength = this.temp_u8a.length;

      while (this.index < u8aLength && !this.stop) {
        this.offset = this.index;
        var tag = new _Tag2.default();
        if (this.unreadLength >= 11) {
          // 可以读出头部信息
          tag.position = this.filePosition + this.offset;
          tag.tagType = this.readData(1)[0];
          tag.bodySize = this.readData(3);
          tag.Timestamp = this.readData(4);
          tag.StramId = this.readData(3);
        } else {
          this.stop = true;
          continue;
        }
        if (this.unreadLength >= this.getBodySize(tag.bodySize) + 4) {
          tag.body = this.readData(this.getBodySize(tag.bodySize));
          tag.tagSize = this.readData(4);
          var _store$state = this._store.state,
              tags = _store$state.tags,
              _hasVideo = _store$state._hasVideo,
              _hasAudio = _store$state._hasAudio;

          switch (tag.tagType) {
            case 9:
              _hasVideo && tags.push(tag);
              break;
            case 8:
              _hasAudio && tags.push(tag);
              break;
            case 18:
              tags.push(tag);
              break;
          }
        } else {
          this.stop = true;
          continue;
        }

        this.offset = this.index;
      }
      this.filePosition += this.offset;
      this.temp_u8a = null;
      return this.offset;
    }

    /**
     * @param sizeArr
     * @return
     */

  }, {
    key: 'getBodySize',
    value: function getBodySize(sizeArr) {
      return _Buffer2.default.readAsInt(sizeArr);
    }
  }, {
    key: 'parseHead',
    value: function parseHead() {
      var tempU8a = this.temp_u8a,
          _store = this._store;

      var result = {
        match: false
      };
      if (tempU8a[3] !== 1) {
        return result;
      }
      var flag = tempU8a[4];
      var hasAudio = (flag & 4) >>> 2 !== 0;
      var hasVideo = (flag & 1) !== 0;

      if (!hasAudio && !hasVideo) {
        return result;
      }

      _store.hasAudio = hasAudio;
      _store.hasVideo = hasVideo;
    }
  }, {
    key: 'readData',
    value: function readData(length) {
      var _index = this.index;
      this.index += length;
      return this.temp_u8a.slice(_index, _index + length);
    }
  }, {
    key: 'unreadLength',
    get: function get() {
      return this.dataLen - this.index;
    }
  }], [{
    key: 'isFlvHead',
    value: function isFlvHead(tempU8a) {
      var firstThreeChars = [tempU8a[0], tempU8a[1], tempU8a[2]];
      return String.fromCharCode.apply(String, firstThreeChars) === 'FLV';
    }
  }]);

  return FlvParser;
}(_Demuxer3.default);

exports.default = FlvParser;

/***/ }),

/***/ "./src/parse/MSE.js":
/*!**************************!*\
  !*** ./src/parse/MSE.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventEmitter = __webpack_require__(/*! event-emitter */ "./node_modules/event-emitter/index.js");

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var count = 0;

var MSE = function () {
  function MSE() {
    var codecs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'video/mp4; codecs="avc1.64001E, mp4a.40.5"';

    _classCallCheck(this, MSE);

    this.count = count++;
    var self = this;
    (0, _eventEmitter2.default)(this);
    this.codecs = codecs;
    this.mediaSource = new window.MediaSource();
    this.url = window.URL.createObjectURL(this.mediaSource);

    this.handleSourceOpen = this.onSourceOpen.bind(this);
    this.mediaSource.addEventListener('sourceopen', this.handleSourceOpen);

    this.mediaSource.addEventListener('sourceclose', function () {
      self.emit('sourceclose');
    });
  }

  _createClass(MSE, [{
    key: 'onSourceOpen',
    value: function onSourceOpen() {
      var self = this;
      self.sourceBuffer = self.mediaSource.addSourceBuffer(self.codecs);
      self.sourceBuffer.addEventListener('error', function (e) {
        self.emit('error', {
          type: 'sourceBuffer',
          error: e
        });
      });
      self.sourceBuffer.addEventListener('updateend', function (e) {
        self.emit('updateend');
      });
      self.emit('sourceopen');
      self.sourceBuffer.addEventListener('error', function (e) {
        self.emit('error', {
          type: 'mediaSource',
          error: e
        });
      });
    }
  }, {
    key: 'appendBuffer',
    value: function appendBuffer(buffer) {
      var sourceBuffer = this.sourceBuffer;
      if (sourceBuffer.updating === false && this.state === 'open') {
        sourceBuffer.appendBuffer(buffer);
        return true;
      } else {
        if (this.state === 'closed') {
          this.emit('error', {
            type: 'sourceBuffer',
            error: new Error('mediaSource is not attached to video or mediaSource is closed')
          });
        } else if (this.state === 'ended') {
          this.emit('error', {
            type: 'sourceBuffer',
            error: new Error('mediaSource is closed')
          });
        } else {
          if (sourceBuffer.updating === true) {
            this.emit('warn', {
              type: 'sourceBuffer',
              error: new Error('mediaSource is busy')
            });
          }
          return false;
        }
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      // this.mediaSource.removeEventListener('sourceopen', this.handleSourceOpen)
      this.__ee__ = {};
      // this.mediaSource = null
      // this.endOfStream()
    }
  }, {
    key: 'removeBuffer',
    value: function removeBuffer(start, end) {
      this.sourceBuffer.remove(start, end);
    }
  }, {
    key: 'endOfStream',
    value: function endOfStream() {
      if (this.mediaSource.readyState === 'open') {
        this.mediaSource.endOfStream();
      }
    }
  }, {
    key: 'state',
    get: function get() {
      return this.mediaSource.readyState;
    }
  }, {
    key: 'duration',
    get: function get() {
      return this.mediaSource.duration;
    },
    set: function set(value) {
      this.mediaSource.duration = value;
    }
  }], [{
    key: 'isSupported',
    value: function isSupported(codecs) {
      return window.MediaSource && window.MediaSource.isTypeSupported(codecs);
    }
  }]);

  return MSE;
}();

exports.default = MSE;

/***/ }),

/***/ "./src/parse/MainParser.js":
/*!*********************************!*\
  !*** ./src/parse/MainParser.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mp4remux = __webpack_require__(/*! ./remux/Mp4remux */ "./src/parse/remux/Mp4remux.js");

var _Mp4remux2 = _interopRequireDefault(_Mp4remux);

var _FlvParser = __webpack_require__(/*! ./FlvParser */ "./src/parse/FlvParser.js");

var _FlvParser2 = _interopRequireDefault(_FlvParser);

var _TagDemuxer = __webpack_require__(/*! ./demux/TagDemuxer */ "./src/parse/demux/TagDemuxer.js");

var _TagDemuxer2 = _interopRequireDefault(_TagDemuxer);

var _Store = __webpack_require__(/*! ../models/Store */ "./src/models/Store.js");

var _Store2 = _interopRequireDefault(_Store);

var _VodTask = __webpack_require__(/*! ../tasks/VodTask */ "./src/tasks/VodTask.js");

var _VodTask2 = _interopRequireDefault(_VodTask);

var _LiveTask = __webpack_require__(/*! ../tasks/LiveTask */ "./src/tasks/LiveTask.js");

var _LiveTask2 = _interopRequireDefault(_LiveTask);

var _Buffer = __webpack_require__(/*! ../write/Buffer */ "./src/write/Buffer.js");

var _Buffer2 = _interopRequireDefault(_Buffer);

var _TransCoder2 = __webpack_require__(/*! ./TransCoder */ "./src/parse/TransCoder.js");

var _TransCoder3 = _interopRequireDefault(_TransCoder2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NOOP = function NOOP() {};

var MainParser = function (_TransCoder) {
  _inherits(MainParser, _TransCoder);

  function MainParser(config, player) {
    _classCallCheck(this, MainParser);

    var _this = _possibleConstructorReturn(this, (MainParser.__proto__ || Object.getPrototypeOf(MainParser)).call(this));

    _this.CLASS_NAME = _this.constructor.name;
    _this._config = config;
    _this._player = player;
    _this._tempBaseTime = 0;
    _this.firstFlag = true;
    _this._store = new _Store2.default();
    _this._store.isLive = config.isLive || false;
    _this._store.player = player;
    _this.flvParser = new _FlvParser2.default(_this._store);
    _this.tagDemuxer = new _TagDemuxer2.default(_this._store);
    _this.mp4remuxer = new _Mp4remux2.default(_this._store);
    _this.buffer = new _Buffer2.default();
    _this.bufferKeyframes = new Set();
    _this.META_CHUNK_SIZE = Math.pow(10, 6);
    _this.CHUNK_SIZE = Math.pow(10, 6);
    _this.ftyp_moov = null;
    _this.isSourceOpen = false;
    _this._isNewSegmentsArrival = false;
    _this.isSeeking = false;
    _this.loadTask = null;
    _this.range = {
      start: -1,
      end: -1
    };
    _this._pendingFragments = [];
    _this._pendingRemoveRange = [];
    _this.err_cnt = 0;
    _this.requestConfig = {
      mode: _this._config.cors ? 'cors' : 'same-origin'
    };
    _this.initEventBind();
    return _this;
  }

  _createClass(MainParser, [{
    key: 'startLoadData',
    value: function startLoadData() {
      if (!this._config.isLive) {
        this.initMeta();
      } else {
        this.initLiveStream();
      }
    }
  }, {
    key: 'initLiveStream',
    value: function initLiveStream() {
      new _LiveTask2.default(this._config.url, this.requestConfig).run(this.loadLiveData.bind(this));
    }
  }, {
    key: 'loadLiveData',
    value: function loadLiveData(buffer) {
      if (buffer === undefined) {
        this.emit('live-end');
      }
      try {
        this.buffer.write(new Uint8Array(buffer));
        var offset = this.setFlv(this.buffer.buffer);
        this.buffer.buffer = this.buffer.buffer.slice(offset);
      } catch (e) {
        console.log(e.message);
      }
    }
  }, {
    key: 'initMeta',
    value: function initMeta() {
      var _this2 = this;

      var self = this;
      var Resolver = {
        resolveChunk: function resolveChunk(_ref) {
          var timeStamp = _ref.timeStamp,
              buffer = _ref.buffer;

          if (timeStamp !== self.loadTask.timeStamp) return;
          self.err_cnt = 0;
          self.buffer.write(new Uint8Array(buffer));
          var offset = self.setFlv(self.buffer.buffer);
          self.buffer.buffer = self.buffer.buffer.slice(offset);
          if (!self.isMediaInfoReady) {
            self.initMeta();
          }
        }
      };
      this.range = {
        start: this.range.end + 1,
        end: this.range.end + this.META_CHUNK_SIZE
      };
      var loadData = function loadData() {
        return _this2.loadMetaData(_this2.range.start, _this2.range.end).then(Resolver.resolveChunk).catch(function (e) {
          console.log(e);
          if (_this2.err_cnt >= 3) {
            _this2._player.emit('error', e);
            _this2.destroy();
            return;
          }
          _this2.err_cnt += 1;
          loadData();
        });
      };
      return loadData();
    }
  }, {
    key: 'loadSegments',
    value: function loadSegments(changeRange) {
      var _this3 = this;

      var currentTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var preloadTime = arguments[2];

      this._isNewSegmentsArrival = false;
      var resolveChunk = function resolveChunk(_ref2) {
        var timeStamp = _ref2.timeStamp,
            buffer = _ref2.buffer;

        if (_this3.isTempPlayer) {
          _this3.isTempPlayer = false;
        }
        if (timeStamp !== _this3.loadTask.timeStamp) return;
        _this3.err_cnt = 0;
        _this3.buffer.write(new Uint8Array(buffer));
        if (_this3.isSeeking) {
          _this3._pendingFragments = [];
        }
        var offset = _this3.setFlv(_this3.buffer.buffer);
        _this3.buffer.buffer = _this3.buffer.buffer.slice(offset);
        if (!_this3._isNewSegmentsArrival) {
          _this3.loadSegments(true);
        } else {
          _this3.isSeeking = false;
        }
      };
      if (changeRange) {
        var _range = this.range;

        if (this.getNextRangeEnd(currentTime, preloadTime) <= _range.end) {
          return Promise.resolve();
        }

        this.range = {
          start: this.range.end + 1,
          end: currentTime === undefined ? this.range.end + this.CHUNK_SIZE - 1 : this.getNextRangeEnd(currentTime, preloadTime) - 1
        };

        if (this.range.start >= this.range.end || !this.range.end) {
          this.range = _range;
          return Promise.resolve();
        }
      }
      var loadData = function loadData() {
        if (_this3.stop) return;
        return _this3._loadSegmentsData(_this3.range.start, _this3.range.end).then(resolveChunk).catch(function (e) {
          if (_this3.err_cnt >= 3) {
            _this3._player.emit('error', '加载视频失败');
            _this3.destroy();
            return;
          }
          _this3.err_cnt += 1;
          loadData();
        });
      };
      return loadData();
    }
  }, {
    key: 'getNextRangeEnd',
    value: function getNextRangeEnd(start, preloadTime) {
      var _store = this._store,
          _store$keyframes = _store.keyframes,
          times = _store$keyframes.times,
          filePositions = _store$keyframes.filePositions,
          videoTimeScale = _store.videoTimeScale;

      if (!times || !filePositions) {
        return this.range.end + this.CHUNK_SIZE;
      }
      start *= videoTimeScale;

      var expectEnd = start + preloadTime * videoTimeScale;
      if (expectEnd > times[times.length - 1]) {
        return filePositions[filePositions.length - 1];
      }
      var left = 0;
      var right = times.length - 1;
      var index = void 0;

      while (left <= right) {
        var mid = Math.floor((right + left) / 2);
        if (times[mid] <= expectEnd && expectEnd <= times[mid + 1]) {
          index = mid + 1;
          break;
        } else if (left === right) {
          index = mid;
          break;
        } else if (expectEnd < times[mid]) {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      }

      return index ? filePositions[index] : undefined;
    }
  }, {
    key: '_loadSegmentsData',
    value: function _loadSegmentsData() {
      var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : start + this.CHUNK_SIZE;

      this.loadTask = new _VodTask2.default(this._config.url, [start, end], this.requestConfig);
      return this.loadTask.promise;
    }
  }, {
    key: 'loadMetaData',
    value: function loadMetaData() {
      var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : start + this.META_CHUNK_SIZE;

      this.loadTask = new _VodTask2.default(this._config.url, [start, end], this.requestConfig);
      return this.loadTask.promise;
    }
  }, {
    key: 'setFlvFirst',
    value: function setFlvFirst(arrayBuff, baseTime) {
      var offset = this.flvParser.setFlv(new Uint8Array(arrayBuff));
      var tags = this._store.state.tags;


      if (tags.length) {
        if (tags[0].tagType !== 18) {
          throw new Error('flv file without metadata tag');
        }

        if (this._tempBaseTime !== 0 && this._tempBaseTime === tags[0].getTime()) {
          this._store.state._timestampBase = 0;
        }

        this.tagDemuxer.resolveTags(tags);
      }

      this.firstFlag = false;
      return offset;
    }
  }, {
    key: 'setFlvUsually',
    value: function setFlvUsually(arrayBuff, baseTime) {
      this.isParsing = true;
      var offset = this.flvParser.setFlv(new Uint8Array(arrayBuff));
      var tags = this._store.state.tags;

      if (tags.length) {
        this.tagDemuxer.resolveTags(tags);
      }
      return offset;
    }
  }, {
    key: 'handleDataReady',
    value: function handleDataReady(audioTrack, videoTrack) {
      this.mp4remuxer.remux(audioTrack, videoTrack);
    }
  }, {
    key: 'handleMetaDataReady',
    value: function handleMetaDataReady(type, meta) {
      this.mp4remuxer.onMetaDataReady(type, meta);
    }
  }, {
    key: 'handleError',
    value: function handleError(e) {
      this.error(e);
    }
  }, {
    key: 'handleNewMediaFragment',
    value: function handleNewMediaFragment(newFrag) {
      var _this4 = this;

      this._isNewSegmentsArrival = true;
      this._pendingFragments.push(newFrag);
      var randomAccessPoints = newFrag.fragment.randomAccessPoints;

      if (randomAccessPoints && randomAccessPoints.length) {
        randomAccessPoints.forEach(function (rap) {
          _this4.bufferKeyframes.add(rap.dts);
        });
      }
      if (!this.isSourceOpen) {
        return;
      }
      if (this._pendingFragments.length) {
        var fragment = this._pendingFragments.shift();
        if (!this.handleMediaFragment(fragment)) {
          this._pendingFragments.unshift(fragment);
        } else {
          this.handleSeekEnd();
          this._player.emit('cacheupdate', this._player);
        }
      }
    }
  }, {
    key: 'handleMediaInfoReady',
    value: function handleMediaInfoReady(mediaInfo) {
      var FTYP_MOOV = this.mp4remuxer.onMediaInfoReady(mediaInfo);
      if (!this.ftyp_moov) {
        this.ftyp_moov = FTYP_MOOV;
        this.emit('ready', FTYP_MOOV);
      }
    }
  }, {
    key: 'initEventBind',
    value: function initEventBind() {
      this.tagDemuxer.handleDataReady = this.handleDataReady.bind(this);
      this.tagDemuxer.handleMediaInfoReady = this.handleMediaInfoReady.bind(this);
      this.tagDemuxer.handleMetaDataReady = this.handleMetaDataReady.bind(this);
      this.tagDemuxer.setEventBind();
      this.mp4remuxer.handleMediaFragment = this.handleNewMediaFragment.bind(this);
    }
  }, {
    key: 'replay',
    value: function replay() {
      this.isSourceOpen = false;
      this.range = {
        start: this._store.metaEndPosition,
        end: this.getNextRangeEnd(0, this._config.preloadTime) - 1
      };
      this.mp4remuxer.seek();
      this.flvParser.seek();
      this.clearBuffer();
      this.loadSegments(false);
    }
  }, {
    key: 'clearBuffer',
    value: function clearBuffer() {
      this._pendingFragments = [];
      this._pendingRemoveRange = [];
    }
  }, {
    key: 'unbindEvents',
    value: function unbindEvents() {
      this.tagDemuxer.handleDataReady = NOOP;
      this.tagDemuxer.handleMediaInfoReady = NOOP;
      this.tagDemuxer.handleMetaDataReady = NOOP;
      this.tagDemuxer.setEventBind();
      this.mp4remuxer.handleMediaFragment = NOOP;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.mp4remuxer.destroy();
      this.flvParser.destroy();
      this.tagDemuxer.destroy();
      this.mp4remuxer = null;
      this.flvParser = null;
      this.tagDemuxer = null;
      this.loadSegments = function () {
        return null;
      };
      this._store = null;
      this.clearBuffer();
      this.stop = true;
    }
  }, {
    key: 'seek',
    value: function seek(target) {
      this.loadTask.cancel();
      var _store2 = this._store,
          _store2$keyframes = _store2.keyframes,
          keyframes = _store2$keyframes === undefined ? {} : _store2$keyframes,
          videoTimeScale = _store2.videoTimeScale;

      var seekStart = target * videoTimeScale;
      var startFilePos = void 0;
      var endFilePos = void 0;
      var length = Math.min(keyframes.filePositions.length, keyframes.times.length);
      var preloadTime = this._config.preloadTime;


      function getEndFilePos(time, idx) {
        if (idx === keyframes.times.length) {
          endFilePos = idx;
          return false;
        }
        if (time <= preloadTime && preloadTime <= keyframes.times[idx + 1]) {
          endFilePos = idx;
          return false;
          // 需要处理EOF的情况
        }
        return true;
      }

      var lo = 0;
      var hi = length - 2;
      while (lo <= hi) {
        var mid = Math.floor((lo + hi) / 2);
        var currentTime = keyframes.times[mid];
        var nextTime = keyframes.times[mid + 1] ? keyframes.times[mid + 1] : Number.MAX_SAFE_INTEGER;
        if (currentTime <= seekStart && seekStart <= nextTime || lo === hi) {
          startFilePos = mid;
          preloadTime = preloadTime * videoTimeScale + seekStart;
          keyframes.times.every(getEndFilePos);
          break;
        } else if (seekStart < currentTime) {
          hi = mid - 1;
        } else {
          lo = mid + 1;
        }
      }

      if (!this.isSeeking) {
        this.isSeeking = true;
      } else {
        this._store.clearTags();
      }
      this._pendingFragments = [];
      this.mp4remuxer.seek();
      this.flvParser.seek();
      _VodTask2.default.clear();
      var _range = this.range;
      if (keyframes.filePositions[startFilePos] < _range.end) {
        startFilePos += 1;
        endFilePos += 1;
      }
      this.range = {
        start: keyframes.filePositions[startFilePos],
        end: keyframes.filePositions[endFilePos] - 1 || ''
      };
      this.buffer = new _Buffer2.default();
      this.loadSegments(false);
    }
  }, {
    key: 'setFlv',
    get: function get() {
      return this.firstFlag ? this.setFlvFirst : this.setFlvUsually;
    }
  }, {
    key: 'isMediaInfoReady',
    get: function get() {
      return this._store.mediaInfo.isComplete;
    }
  }, {
    key: 'videoDuration',
    get: function get() {
      return this._store.mediaInfo.duration;
    }
  }, {
    key: 'hasPendingFragments',
    get: function get() {
      return !!this._pendingFragments.length;
    }
  }, {
    key: 'pendingFragments',
    get: function get() {
      return this._pendingFragments;
    }
  }, {
    key: 'videoTimeScale',
    get: function get() {
      return this._store.videoTimeScale;
    }
  }, {
    key: 'hasPendingRemoveRanges',
    get: function get() {
      return this._pendingRemoveRange.length;
    }
  }, {
    key: 'pendingRemoveRanges',
    get: function get() {
      return this._pendingRemoveRange;
    }
  }, {
    key: 'isSeekable',
    get: function get() {
      return this._store.isSeekable;
    }
  }]);

  return MainParser;
}(_TransCoder3.default);

exports.default = MainParser;

/***/ }),

/***/ "./src/parse/SPSParser.js":
/*!********************************!*\
  !*** ./src/parse/SPSParser.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ExpGolomb = __webpack_require__(/*! ../utils/ExpGolomb */ "./src/utils/ExpGolomb.js");

var _ExpGolomb2 = _interopRequireDefault(_ExpGolomb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SPSParser = function () {
    function SPSParser() {
        _classCallCheck(this, SPSParser);
    }

    _createClass(SPSParser, null, [{
        key: 'getProfileStr',
        value: function getProfileStr(profileIdc) {
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
        key: 'getLevelStr',
        value: function getLevelStr(levelIdc) {
            return (levelIdc / 10).toFixed(1);
        }
    }, {
        key: 'getChromaFormatStr',
        value: function getChromaFormatStr(chroma) {
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

        /**
         * read SPS
         * @param originArr
         */

    }, {
        key: 'parseSPS',
        value: function parseSPS(originArr) {

            var rbsp = SPSParser._ebsp2rbsp(originArr);

            var stream = new _ExpGolomb2.default(rbsp);
            var spsConfig = stream.readSPS();
            var chromaFormat = spsConfig.chromaFormat,
                levelIdc = spsConfig.levelIdc,
                profileIdc = spsConfig.profileIdc;

            spsConfig.profileString = SPSParser.getProfileStr(profileIdc);
            spsConfig.levelString = SPSParser.getLevelStr(levelIdc);
            spsConfig.chromaFormatString = SPSParser.getChromaFormatStr(chromaFormat);

            return spsConfig;
        }

        //

    }, {
        key: '_ebsp2rbsp',
        value: function _ebsp2rbsp(originArr) {
            var originLen = originArr.byteLength;
            var dist = new Uint8Array(originArr.byteLength);
            var distSize = 0;

            for (var i = 0, len = originLen; i < len; i++) {
                if (i > 2 && originArr[i] === 3 && originArr[i - 1] === 0 && originArr[i - 2] === 0) {
                    continue;
                }
                dist[distSize++] = originArr[i];
            }

            return new Uint8Array(dist.buffer, 0, distSize);
        }
    }]);

    return SPSParser;
}();

exports.default = SPSParser;

/***/ }),

/***/ "./src/parse/TransCoder.js":
/*!*********************************!*\
  !*** ./src/parse/TransCoder.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observer = __webpack_require__(/*! ../utils/Observer */ "./src/utils/Observer.js");

var _Observer2 = _interopRequireDefault(_Observer);

var _error = __webpack_require__(/*! ../models/error */ "./src/models/error.js");

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 转码器基类
 */
var TransCoder = function () {
  function TransCoder(store) {
    _classCallCheck(this, TransCoder);

    if (store) {
      this._store = store;
    }
    this._observer = _Observer2.default;
    this.on = _Observer2.default.on.bind(_Observer2.default);
    this.emit = _Observer2.default.emit.bind(_Observer2.default);
    this.off = _Observer2.default.off.bind(_Observer2.default);
    this.flush = _Observer2.default.flush.bind(_Observer2.default);
    this.once = _Observer2.default.once.bind(_Observer2.default);
  }

  _createClass(TransCoder, [{
    key: 'emitError',
    value: function emitError(type) {
      var errorDetail = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { line: '', handle: '', msg: '', version: '' };
      var _store = this._store,
          player = _store.player,
          state = _store.state;

      if (player) {
        var errorToEmit = new _error2.default(type, player.currentTime, state.duration, '', true, player.config.url, player.config.url, player.ended, errorDetail);
        player.emit('error', errorToEmit);
      }
    }
  }]);

  return TransCoder;
}();

exports.default = TransCoder;

/***/ }),

/***/ "./src/parse/demux/AudioDemuxer.js":
/*!*****************************************!*\
  !*** ./src/parse/demux/AudioDemuxer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Demuxer2 = __webpack_require__(/*! ./Demuxer */ "./src/parse/demux/Demuxer.js");

var _Demuxer3 = _interopRequireDefault(_Demuxer2);

var _DataView4Read = __webpack_require__(/*! ../../utils/DataView4Read */ "./src/utils/DataView4Read.js");

var _DataView4Read2 = _interopRequireDefault(_DataView4Read);

var _types = __webpack_require__(/*! ../../constants/types */ "./src/constants/types.js");

var _sniffer = __webpack_require__(/*! ../../utils/sniffer */ "./src/utils/sniffer.js");

var _sniffer2 = _interopRequireDefault(_sniffer);

var _Buffer = __webpack_require__(/*! ../../write/Buffer */ "./src/write/Buffer.js");

var _Buffer2 = _interopRequireDefault(_Buffer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // refrence: https://github.com/video-dev/hls.js/blob/master/src/demux/adts.js

// import { mp3Versions, mp3BitRate, audioSampleRate } from '../../constants/types';


var AudioDemuxer = function (_Demuxer) {
  _inherits(AudioDemuxer, _Demuxer);

  function AudioDemuxer(store) {
    _classCallCheck(this, AudioDemuxer);

    var _this = _possibleConstructorReturn(this, (AudioDemuxer.__proto__ || Object.getPrototypeOf(AudioDemuxer)).call(this, store));

    _this.CLASS_NAME = _this.constructor.name;
    _this.currentTag = null;
    _this.data = new Uint8Array(0);
    _this.readOffset = 0;
    _this._store.audioMetaData = null;
    _this.handleDataReady = function () {};
    _this.handleMetaDataReady = function () {};
    _this.handleMediaInfoReady = function () {};
    return _this;
  }

  _createClass(AudioDemuxer, [{
    key: 'resolve',
    value: function resolve(tag) {
      this.readOffset = 0;
      var store = this._store;
      var track = store.audioTrack;

      this.currentTag = tag;
      this.data = tag.body;
      var meta = store.audioMetaData;


      if (!meta) {
        meta = store.audioMetaData = {};
        store.audioMetaData = this.initAudioMeta(meta);
      }

      var dv = new _DataView4Read2.default(tag.body.buffer, this);

      var sound = dv.getUint8();

      var soundFormatIdx = sound >>> 4; //  UInt4
      var soundRate = (sound & 12) >>> 2; //  UInt2
      // const soundSize = (sound & 2) >>> 1 //   UInt1
      var soundType = sound % 1; // UInt1

      meta.audioSampleRate = _types.soundRateTypes[soundRate];
      meta.channelCount = soundType === 0 ? 1 : 2;

      if (soundFormatIdx !== 10 && soundFormatIdx !== 2) {
        this.error('only support AAC Audio format so far');
        return;
      } else if (soundFormatIdx === 10) {
        // AAC
        var aacInfo = this._parseAACAudio();
        if (!aacInfo) {
          return;
        }

        var aacData = aacInfo.data,
            sampleFreq = aacInfo.data.sampleFreq;

        if (aacInfo.packetType === 0) {
          // AAC sequence header
          meta.sampleRate = sampleFreq;
          meta.channelCount = aacData.channelCount;
          meta.codec = aacData.codec;
          meta.manifestCodec = aacData.manifestCodec;
          meta.config = aacData.config;
          meta.refSampleDuration = 1024 / sampleFreq * meta.timeScale;
          if (store.hasInitialMetaDispatched) {
            if (store.videoTrack.length || store.audioTrack.length) {
              this.handleDataReady(store.videoTrack, store.audioTrack);
            }
          } else {
            store.state._audioInitialMetadataDispatched = true;
          }

          this.handleMetaDataReady('audio', meta);

          var mi = store.mediaInfo;

          mi.audioCodec = meta.codec;
          mi.audioSampleRate = meta.sampleRate;
          mi.audioChannelCount = meta.channelCount;
          mi.audioConfig = meta.config;
          if (mi.hasVideo) {
            if (mi.videoCodec) {
              mi.mimeType = 'video/x-flv; codecs="' + mi.videoCodec + ',' + mi.audioCodec + '"';
              mi.codec = mi.mimeType.replace('x-flv', 'mp4');
            }
          } else {
            mi.mimeType = 'video/x-flv; codecs="' + mi.audioCodec + '"';
            mi.codec = mi.mimeType.replace('x-flv', 'mp4');
          }

          if (mi.isComplete) {
            this.handleMediaInfoReady(mi);
          }
        } else if (aacInfo.packetType === 1) {
          // AAC raw frame data
          var dts = store.state.timeStampBase + this.currentTag.getTime();
          var aacSample = { unit: aacInfo.data, length: aacInfo.data.byteLength, dts: dts, pts: dts };
          track.samples.push(aacSample);
          track.length += aacInfo.data.length;
        }
      }

      this.resetStatus();
    }
  }, {
    key: '_parseAACAudio',
    value: function _parseAACAudio() {
      if (this.unreadLength <= 1) {
        return;
      }
      var aacData = {};
      var aacArray = new Uint8Array(this.data.buffer, this.readOffset, this.unreadLength);
      var packetType = aacArray[0];
      this.readOffset += 1;
      aacData.packetType = packetType;
      if (!packetType) {
        var _currentTag = this.currentTag,
            position = _currentTag.position,
            tagSize = _currentTag.tagSize;

        this._store.metaEndPosition = position + _Buffer2.default.readAsInt(tagSize) + 4;
        aacData.data = this._parseAACAudioSpecificConfig(); // AAC Sequence header
      } else {
        aacData.data = aacArray.slice(1);
      }

      return aacData;
    }
  }, {
    key: '_parseAACAudioSpecificConfig',
    value: function _parseAACAudioSpecificConfig() {
      var dv = new _DataView4Read2.default(this.data.buffer, this);
      var getAndNum = _DataView4Read2.default.getAndNum;


      var resultObj = {
        samplingFrequency: null,
        extAudioObjectType: null,
        extAudioSamplingIdx: null
      };
      var config = {};
      var UInt0 = dv.getUint8();
      var UInt1 = dv.getUint8();

      var tempAudioObjectType = void 0;
      var audioObjectType = tempAudioObjectType = UInt0 >>> 3; // UInt5
      var samplingIdx = (UInt0 & getAndNum(5, 7)) << 1 | UInt1 >>> 7; // UInt4
      if (samplingIdx < 0 || samplingIdx > _types.samplingFrequencyTypes.length) {
        this.emitError('decoder', {
          line: '141',
          handle: '_parseAACAudioSpecificConfig',
          msg: 'invalid samplingFrequencyIndex ' + samplingIdx
        });
        this.dispatch(_types.EventTypes.ERROR, 'error samplingFrequencyIndex: ' + samplingIdx);
        return;
      }

      resultObj.samplingFrequency = _types.samplingFrequencyTypes[samplingIdx];

      var channelCount = resultObj.channelCount = (UInt1 & getAndNum(1, 4)) >>> 3;
      if (channelCount < 0 || channelCount > 7) {
        this.emitError('decoder', {
          line: '154',
          handle: '_parseAACAudioSpecificConfig',
          msg: 'invalid Audio Channel Count: ' + channelCount
        });
        this.dispatch(_types.EventTypes.ERROR, 'error Audio Channel Count: ' + channelCount);
        return;
      }

      if (audioObjectType === 5) {
        // HE-AAC
        var UInt2 = dv.getUint8();
        resultObj.extAudioSamplingIdx = (UInt1 & getAndNum(5, 7)) << 1 | UInt2 >>> 7;
        resultObj.extAudioObjectType = (UInt2 & getAndNum(1, 5)) >>> 2;
      }

      if (_sniffer2.default.browser === _types.browserTypes.FIRE_FOX) {
        if (samplingIdx >= 6) {
          // HE-AAC uses SBR, high frequencies are constructed from low frequencies
          audioObjectType = 5;
          config = new Array(4);
          resultObj.extAudioSamplingIdx = samplingIdx - 3;
        } else {
          audioObjectType = 2;
          config = new Array(2);
          resultObj.extAudioSamplingIdx = samplingIdx;
        }
      } else if (_sniffer2.default.os.isAndroid) {
        // Android : always use AAC
        audioObjectType = 2;
        config = new Array(2);
        resultObj.extAudioSamplingIdx = samplingIdx;
      } else {
        /*  for other browsers (Chrome/Vivaldi/Opera ...)
                  always force audio type to be HE-AAC SBR, as some browsers do not support audio codec switch properly (like Chrome ...)
              */
        audioObjectType = 5;
        resultObj.extensionSamplingIndex = samplingIdx;
        config = new Array(4);

        if (samplingIdx >= 6) {
          resultObj.extensionSamplingIdx = samplingIdx - 3;
        } else if (channelCount === 1) {
          audioObjectType = 2;
          config = new Array(2);
          resultObj.extensionSamplingIndex = samplingIdx;
        }
      }

      config[0] = audioObjectType << 3;
      config[0] |= (samplingIdx & 0x0E) >> 1;
      config[1] |= (samplingIdx & 0x01) << 7;
      config[1] |= channelCount << 3;
      if (audioObjectType === 5) {
        config[1] |= (resultObj.extAudioSamplingIdx & 0x0E) >> 1;
        config[2] = (resultObj.extensionSamplingIdx & 0x01) << 7;
        // adtsObjectType (force to 2, chrome is checking that object type is less than 5 ???
        //    https://chromium.googlesource.com/chromium/src.git/+/master/media/formats/mp4/aac.cc
        config[2] |= 2 << 2;
        config[3] = 0;
      }

      return {
        config: config,
        sampleFreq: resultObj.samplingFrequency,
        channelCount: channelCount,
        codec: 'mp4a.40.' + audioObjectType,
        manifestCodec: 'mp4a.40.' + tempAudioObjectType
      };
    }
  }, {
    key: 'initAudioMeta',
    value: function initAudioMeta(meta) {
      var _store = this._store,
          state = _store.state,
          track = _store.audioTrack;


      meta.duration = state.duration;
      meta.timeScale = state.timeScale;
      meta.type = 'audio';
      meta.id = track.id;

      return meta;
    }
  }, {
    key: 'resetStatus',
    value: function resetStatus() {
      this.currentTag = null;
      this.data = new Uint8Array(0);
      this.readOffset = 0;
    }
  }, {
    key: 'dataSize',
    get: function get() {
      return this.data.length;
    }
  }, {
    key: 'unreadLength',
    get: function get() {
      return this.dataSize - this.readOffset;
    }
  }]);

  return AudioDemuxer;
}(_Demuxer3.default);

exports.default = AudioDemuxer;

/***/ }),

/***/ "./src/parse/demux/Demuxer.js":
/*!************************************!*\
  !*** ./src/parse/demux/Demuxer.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Log = __webpack_require__(/*! ../../utils/Log */ "./src/utils/Log.js");

var _Log2 = _interopRequireDefault(_Log);

var _TransCoder2 = __webpack_require__(/*! ../TransCoder */ "./src/parse/TransCoder.js");

var _TransCoder3 = _interopRequireDefault(_TransCoder2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Demuxer = function (_TransCoder) {
  _inherits(Demuxer, _TransCoder);

  function Demuxer() {
    _classCallCheck(this, Demuxer);

    return _possibleConstructorReturn(this, (Demuxer.__proto__ || Object.getPrototypeOf(Demuxer)).apply(this, arguments));
  }

  _createClass(Demuxer, [{
    key: 'dispatch',
    value: function dispatch(type) {
      var _observer;

      var prefix = 'demuxer_';

      for (var _len = arguments.length, payload = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        payload[_key - 1] = arguments[_key];
      }

      (_observer = this._observer).emit.apply(_observer, ['' + prefix + type].concat(payload));
    }
  }, {
    key: 'error',
    value: function error(message) {
      var _CLASS_NAME = this.CLASS_NAME,
          CLASS_NAME = _CLASS_NAME === undefined ? 'Demuxer' : _CLASS_NAME;

      _Log2.default.error('[' + CLASS_NAME + ' error] ', message);
    }
  }, {
    key: 'info',
    value: function info(message) {
      var _CLASS_NAME2 = this.CLASS_NAME,
          CLASS_NAME = _CLASS_NAME2 === undefined ? 'Demuxer' : _CLASS_NAME2;

      _Log2.default.info('[' + CLASS_NAME + ' info] ', message);
    }
  }, {
    key: 'log',
    value: function log(message) {
      var _CLASS_NAME3 = this.CLASS_NAME,
          CLASS_NAME = _CLASS_NAME3 === undefined ? 'Demuxer' : _CLASS_NAME3;

      _Log2.default.log('[' + CLASS_NAME + ' log] ', message);
    }
  }, {
    key: 'warn',
    value: function warn(message) {
      var _CLASS_NAME4 = this.CLASS_NAME,
          CLASS_NAME = _CLASS_NAME4 === undefined ? 'Demuxer' : _CLASS_NAME4;

      _Log2.default.warn('[' + CLASS_NAME + ' warn] ', message);
    }
  }]);

  return Demuxer;
}(_TransCoder3.default);

exports.default = Demuxer;

/***/ }),

/***/ "./src/parse/demux/MetaDemuxer.js":
/*!****************************************!*\
  !*** ./src/parse/demux/MetaDemuxer.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _types = __webpack_require__(/*! ../../constants/types */ "./src/constants/types.js");

var _UTF = __webpack_require__(/*! ../../utils/UTF8 */ "./src/utils/UTF8.js");

var _UTF2 = _interopRequireDefault(_UTF);

var _Demuxer2 = __webpack_require__(/*! ./Demuxer */ "./src/parse/demux/Demuxer.js");

var _Demuxer3 = _interopRequireDefault(_Demuxer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * meta信息解析
 */
var MetaDemuxer = function (_Demuxer) {
    _inherits(MetaDemuxer, _Demuxer);

    function MetaDemuxer(store) {
        _classCallCheck(this, MetaDemuxer);

        var _this = _possibleConstructorReturn(this, (MetaDemuxer.__proto__ || Object.getPrototypeOf(MetaDemuxer)).call(this, store));

        _this.offset = 0;
        _this.readOffset = _this.offset;
        return _this;
    }

    _createClass(MetaDemuxer, [{
        key: 'resolve',
        value: function resolve(meta, size) {
            if (size < 3) {
                throw 'not enough data for metainfo';
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
            var strLen = dv.getUint16(0, !this.isLe);
            var str = '';
            if (strLen > 0) {
                str = _UTF2.default.decode(new Uint8Array(buffer, this.readOffset + 2, strLen));
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
            var isLe = this.isLe;

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
            var strLen = dv.getUint32(0, !this.isLe);
            var str = '';
            if (strLen > 0) {
                str = _UTF2.default.decode(new Uint8Array(buffer, this.readOffset + 2, strLen));
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
            var isLe = this.isLe;
            var NUMBER = _types.MetaTypes.NUMBER,
                BOOLEAN = _types.MetaTypes.BOOLEAN,
                STRING = _types.MetaTypes.STRING,
                OBJECT = _types.MetaTypes.OBJECT,
                MIX_ARRAY = _types.MetaTypes.MIX_ARRAY,
                OBJECT_END = _types.MetaTypes.OBJECT_END,
                STRICT_ARRAY = _types.MetaTypes.STRICT_ARRAY,
                DATE = _types.MetaTypes.DATE,
                LONE_STRING = _types.MetaTypes.LONE_STRING;

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
    }, {
        key: 'isLe',
        get: function get() {
            return this._store.isLe;
        }
    }]);

    return MetaDemuxer;
}(_Demuxer3.default);

exports.default = MetaDemuxer;

/***/ }),

/***/ "./src/parse/demux/TagDemuxer.js":
/*!***************************************!*\
  !*** ./src/parse/demux/TagDemuxer.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Demuxer2 = __webpack_require__(/*! ./Demuxer */ "./src/parse/demux/Demuxer.js");

var _Demuxer3 = _interopRequireDefault(_Demuxer2);

var _MetaDemuxer = __webpack_require__(/*! ./MetaDemuxer */ "./src/parse/demux/MetaDemuxer.js");

var _MetaDemuxer2 = _interopRequireDefault(_MetaDemuxer);

var _VideoDemuxer = __webpack_require__(/*! ./VideoDemuxer */ "./src/parse/demux/VideoDemuxer.js");

var _VideoDemuxer2 = _interopRequireDefault(_VideoDemuxer);

var _AudioDemuxer = __webpack_require__(/*! ./AudioDemuxer */ "./src/parse/demux/AudioDemuxer.js");

var _AudioDemuxer2 = _interopRequireDefault(_AudioDemuxer);

var _Log = __webpack_require__(/*! ../../utils/Log */ "./src/utils/Log.js");

var _Log2 = _interopRequireDefault(_Log);

var _metaFields = __webpack_require__(/*! ../../constants/metaFields */ "./src/constants/metaFields.js");

var _metaFields2 = _interopRequireDefault(_metaFields);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var nativeHasProp = Object.prototype.hasOwnProperty;

var Tagdemux = function (_Demuxer) {
  _inherits(Tagdemux, _Demuxer);

  function Tagdemux(store) {
    _classCallCheck(this, Tagdemux);

    var _this = _possibleConstructorReturn(this, (Tagdemux.__proto__ || Object.getPrototypeOf(Tagdemux)).call(this, store));

    _this.CLASS_NAME = _this.constructor.name;
    _this._metaDemuxer = new _MetaDemuxer2.default(store);
    _this._videoDemuxer = new _VideoDemuxer2.default(store);
    _this._audioDemuxer = new _AudioDemuxer2.default(store);
    _this._firstParse = true;
    _this._dataOffset = 0;
    _this.handleMediaInfoReady = function () {};
    _this.handleDataReady = function () {};
    _this.handleMetaDataReady = function () {};
    return _this;
  }

  _createClass(Tagdemux, [{
    key: 'setEventBind',
    value: function setEventBind() {
      this._videoDemuxer.handleDataReady = this.handleDataReady;
      this._videoDemuxer.handleMetaDataReady = this.handleMetaDataReady;
      this._videoDemuxer.handleMediaInfoReady = this.handleMediaInfoReady;
      this._audioDemuxer.handleDataReady = this.handleDataReady;
      this._audioDemuxer.handleMetaDataReady = this.handleMetaDataReady;
      this._audioDemuxer.handleMediaInfoReady = this.handleMediaInfoReady;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this._metaDemuxer = null;
      this._videoDemuxer = null;
      this._audioDemuxer = null;
    }
  }, {
    key: 'resolveTags',
    value: function resolveTags() {
      var _this2 = this;

      var tags = this._store.state.tags;
      var store = this._store;
      var videoTrack = store.videoTrack,
          audioTrack = store.audioTrack;


      tags.forEach(function (tag) {
        _this2.resolveTag(tag);
      });

      if (this._store.hasInitialMetaDispatched) {
        if (videoTrack.length || audioTrack.length) {
          this.handleDataReady(audioTrack, videoTrack);
        }
      }

      this._store.state.tags = [];
    }
  }, {
    key: 'resolveTag',
    value: function resolveTag(tag) {
      switch (String(tag.tagType)) {
        case '8':
          // audio
          this._resolveAudioTag(tag);
          break;
        case '9':
          // video
          this._resolveVideoTag(tag);
          break;
        case '18':
          // metadata
          this._resolveMetaTag(tag);
          break;
      }
    }
  }, {
    key: '_resolveAudioTag',
    value: function _resolveAudioTag(tag) {
      if (tag.bodySize <= 1) {
        this.warn('Not enough data for audio tag body');
      }
      this._audioDemuxer.resolve(tag);
    }
  }, {
    key: '_resolveVideoTag',
    value: function _resolveVideoTag(tag) {
      if (tag.bodySize <= 1) {
        this.error('Not enough data for video tag body');
        return;
      }
      var _hasVideo = this._hasVideo,
          hasVideoFlagOverrided = this.hasVideoFlagOverrided;

      if (hasVideoFlagOverrided && !_hasVideo) {
        return;
      }

      this._videoDemuxer.resolve(tag);
    }
  }, {
    key: '_initMetaData',
    value: function _initMetaData(metaData) {
      var _this3 = this;

      var s = this._store;

      if (nativeHasProp.call(metaData, 'onMetaData')) {
        if (s.hasMetaData) {
          _Log2.default.log('[' + this.CLASS_NAME + ']', 'found another meta tag');
        }
        s.metaData = metaData;
        var onMetaData = metaData.onMetaData;

        _metaFields2.default.forEach(function (field) {
          var name = field.name,
              type = field.type,
              parser = field.parser,
              onTypeErr = field.onTypeErr;

          if (Object(onMetaData[name]) instanceof type) {
            parser.call(_this3, s, onMetaData);
          } else {
            if (onTypeErr && onTypeErr instanceof Function) {
              onTypeErr(s, onMetaData);
            }
          }
        });

        this._store.mediaInfo._metaData = metaData;
        // 同步到共享store
        if (this._store.mediaInfo.isComplete) {
          this.handleMediaInfoReady(this._store.mediaInfo);
        }
      }
    }
  }, {
    key: '_resolveMetaTag',
    value: function _resolveMetaTag(tag) {
      var body = tag.body;

      var metaObj = this._metaDemuxer.resolve(body, body.length);
      this._initMetaData(metaObj);
    }
  }, {
    key: '_parseKeyframes',
    value: function _parseKeyframes(keyframes) {
      var times = [];
      var filePositions = [];
      var _store = this._store,
          videoTimeScale = _store.videoTimeScale,
          state = _store.state;

      for (var i = 1; i < keyframes.times.length; i++) {
        times[times.length] = state.timeStampBase + Math.floor(keyframes.times[i] * videoTimeScale);
        filePositions[filePositions.length] = keyframes.filepositions[i];
      }

      return {
        times: times,
        filePositions: filePositions
      };
    }
  }]);

  return Tagdemux;
}(_Demuxer3.default);

exports.default = Tagdemux;

/***/ }),

/***/ "./src/parse/demux/VideoDemuxer.js":
/*!*****************************************!*\
  !*** ./src/parse/demux/VideoDemuxer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Demuxer2 = __webpack_require__(/*! ./Demuxer */ "./src/parse/demux/Demuxer.js");

var _Demuxer3 = _interopRequireDefault(_Demuxer2);

var _SPSParser = __webpack_require__(/*! ../SPSParser */ "./src/parse/SPSParser.js");

var _SPSParser2 = _interopRequireDefault(_SPSParser);

var _DataView4Read = __webpack_require__(/*! ../../utils/DataView4Read */ "./src/utils/DataView4Read.js");

var _DataView4Read2 = _interopRequireDefault(_DataView4Read);

var _types = __webpack_require__(/*! ../../constants/types */ "./src/constants/types.js");

var _Buffer = __webpack_require__(/*! ../../write/Buffer */ "./src/write/Buffer.js");

var _Buffer2 = _interopRequireDefault(_Buffer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VideoDemuxer = function (_Demuxer) {
  _inherits(VideoDemuxer, _Demuxer);

  function VideoDemuxer(store) {
    _classCallCheck(this, VideoDemuxer);

    var _this = _possibleConstructorReturn(this, (VideoDemuxer.__proto__ || Object.getPrototypeOf(VideoDemuxer)).call(this, store));

    _this.CLASS_NAME = _this.constructor.name;
    _this.readOffset = 0;
    _this.data = new Uint8Array(0);
    _this.currentTag = null;
    _this._store.videoMetaData = null;
    return _this;
  }

  _createClass(VideoDemuxer, [{
    key: 'resetStatus',
    value: function resetStatus() {
      this.readOffset = 0;
      this.data = new Uint8Array(0);
      this.currentTag = null;
    }
  }, {
    key: 'resolve',
    value: function resolve(tag) {
      this.data = tag.body;
      this.currentTag = tag;
      var firstUI8 = this.readData(1)[0];
      var frameType = (firstUI8 & 0xF0) >>> 4;
      var codecId = firstUI8 & 0x0F;
      if (codecId !== 7) {
        /** 1: JPEG
              * 2: H263
              * 3: Screen video
              * 4: On2 VP6
              * 5: On2 VP6
              * 6: Screen videoversion 2
              * 7: AVC
              */
        this.error('unsupported codecId: ' + codecId);
        return;
      }
      this._parseAVCPacket(frameType);

      this.resetStatus();
    }
  }, {
    key: '_parseAVCPacket',
    value: function _parseAVCPacket(frameType) {
      if (this.unreadLength < 4) {
        this.error('Invalid Avc Tag');
      }
      var isLe = this._store.isLe;
      var buffer = this.data.buffer;

      var dv = new DataView(buffer, this.readOffset, this.unreadLength);
      var packageType = dv.getUint8(0);

      var cpsTime = dv.getUint32(0, !isLe) & 0x00FFFFFF;
      cpsTime = cpsTime << 8 >> 8;
      this.readOffset += 4;

      switch (packageType) {
        case 0:
          {
            var _currentTag = this.currentTag,
                position = _currentTag.position,
                tagSize = _currentTag.tagSize;


            this._store.metaEndPosition = position + _Buffer2.default.readAsInt(tagSize) + 4; // 缓存scriptTag结束的位置，replay使用
            this._parseAVCDecoderConfigurationRecord();
            break;
          }
        case 1:
          {
            this._parseAVCVideoData(frameType, cpsTime);
            break;
          }
        case 2:
          {
            break;
          }
        default:
          {
            // 报错
          }
      }
    }
  }, {
    key: '_parseAVCDecoderConfigurationRecord',
    value: function _parseAVCDecoderConfigurationRecord() {
      if (this.unreadLength < 7) {
        this.error('Invalid AVCDecoderConfigurationRecord, lack of data!');
        return;
      }

      var mi = this._store.mediaInfo;
      // stash offset&unreadSize before parsing sps&pps
      // const tempOffset = this.readOffset
      // const tempUnreadLength = this.unreadLength

      var store = this._store;

      var meta = this._store.videoMetaData;
      var track = this._store.videoTrack;
      var dv = new _DataView4Read2.default(this.data.buffer, this);
      if (meta) {
        if (meta.avcc !== undefined) {
          this.error('found another AVCDecoderConfigurationRecord!');
        }
      } else {
        if (!store.state._hasVideo && !store.state.hasVideoFlagOverrided) {
          store.state._hasVideo = true;
          store._mediaInfo.hasVideo = true;
        }
        meta = store.videoMetaData = {};
        meta.type = 'video';
        meta.id = track.id;
        meta.timeScale = store.videoTimeScale;
        meta.duration = store.state.duration;
        mi.timescale = store.videoTimeScale;
      }

      var version = dv.getUint8();
      var avcProfile = dv.getUint8();
      dv.getUint8();
      dv.getUint8();
      if (version !== 1 || avcProfile === 0) {
        // 处理错误
        return;
      }

      var naluLengthSize = store.state.naluLengthSize = dv.getUint(2, this.readOffset, false) + 1;
      if (naluLengthSize !== 3 && naluLengthSize !== 4) {
        // 处理错误
        return;
      }

      var spsLength = dv.getUint(5, null, false);
      if (spsLength === 0) {
        this.emitError('decoder', {
          line: 128,
          handler: '_parseAVCDecoderConfigurationRecord',
          msg: 'no sps in this video'
        });
        // 处理错误
        return;
      } else if (spsLength > 1) {
        this.emitError('decoder', {
          line: 132,
          handler: '_parseAVCDecoderConfigurationRecord',
          msg: 'spsLength > 1'
        });
        this.warn('AVCDecoderConfigurationRecord: spsLength > 1');
      }
      var sps = void 0;
      for (var i = 0; i < spsLength; i++) {
        var len = dv.getUint16();

        if (len === 0) {
          continue;
        }
        sps = new Uint8Array(this.data.buffer, this.readOffset, len);
        this.readOffset += len;
        var spsConfig = _SPSParser2.default.parseSPS(sps);

        if (i !== 0) {
          continue;
        }

        var codecSize = spsConfig.codecSize,
            presentSize = spsConfig.presentSize,
            profileString = spsConfig.profileString,
            levelString = spsConfig.levelString,
            chromaFormat = spsConfig.chromaFormat,
            pixelRatio = spsConfig.pixelRatio,
            frameRate = spsConfig.frameRate,
            refFrames = spsConfig.refFrames,
            bitDepth = spsConfig.bitDepth;


        meta.width = codecSize.width;
        meta.height = codecSize.height;
        meta.presentWidth = presentSize.width;
        meta.presentHeight = presentSize.height;

        meta.profile = profileString;
        meta.level = levelString;
        // meta.profileCompatibility = profileCompatibility;
        // meta.naluLengthSize = naluLengthSize;

        meta.bitDepth = bitDepth;
        meta.chromaFormat = chromaFormat;
        meta.pixelRatio = pixelRatio;
        meta.frameRate = frameRate;

        if (!frameRate.fixed || frameRate.fpsNum === 0 || frameRate.fpsDen === 0) {
          meta.frameRate = store.referFrameRate;
        }

        var _meta$frameRate = meta.frameRate,
            fpsDen = _meta$frameRate.fpsDen,
            fpsNum = _meta$frameRate.fpsNum;

        meta.refSampleDuration = meta.timeScale * (fpsDen / fpsNum);

        var codecArr = sps.subarray(1, 4);
        var codecStr = 'avc1.';
        for (var j = 0; j < 3; j++) {
          var hex = codecArr[j].toString(16);
          hex = hex.padStart(2, '0');
          codecStr += hex;
        }

        meta.codec = codecStr;

        var _mi = this._store.mediaInfo;

        _mi.width = meta.width;
        _mi.height = meta.height;
        _mi.fps = meta.frameRate.fps;
        _mi.profile = meta.profile;
        _mi.level = meta.level;
        _mi.refFrames = refFrames;
        _mi.pixelRatio = pixelRatio;
        _mi.videoCodec = codecStr;
        _mi.chromaFormat = chromaFormat;
        if (_mi.hasAudio) {
          if (_mi.audioCodec) {
            _mi.mimeType = 'video/x-flv; codecs="' + _mi.videoCodec + ',' + _mi.audioCodec + '"';
            _mi.codec = _mi.mimeType.replace('x-flv', 'mp4');
          }
        } else {
          _mi.mimeType = 'video/x-flv; codecs="' + _mi.videoCodec + '"';
          _mi.codec = _mi.mimeType.replace('x-flv', 'mp4');
        }

        if (_mi.isComplete) {
          this.handleMediaInfoReady(_mi);
        }
      }
      var pps = void 0;
      var ppsCount = dv.getUint8();
      if (!ppsCount) {
        this.emitError('decoder', {
          line: 227,
          handler: '_parseAVCDecoderConfigurationRecord',
          msg: 'no pps in this video'
        });
        this.dispatch(_types.EventTypes.ERROR, 'no pps in this video');
        return;
      } else if (ppsCount > 1) {
        this.warn('AVCDecoderConfigurationRecord has ppsCount: ' + ppsCount);
      }

      for (var _i = 0; _i < ppsCount; _i++) {
        var ppsSize = dv.getUint16();

        if (!ppsSize) {
          continue;
        }

        pps = new Uint8Array(this.data.buffer, this.readOffset, ppsSize);
        this.readOffset += ppsSize;
      }

      mi.sps = meta.sps = sps;
      mi.pps = meta.pps = pps;
      if (store.hasInitialMetaDispatched) {
        if (store.videoTrack.length || store.audioTrack.length) {
          this.handleDataReady(store.videoTrack, store.audioTrack);
        }
      } else {
        store.state._videoInitialMetadataDispatched = true;
      }

      this.handleMetaDataReady('video', meta);
    }
  }, {
    key: '_parseAVCVideoData',
    value: function _parseAVCVideoData(frameType, cpsTime) {
      var dv = new _DataView4Read2.default(this.data.buffer, this);

      var naluList = [];
      var dataLen = 0;
      var naluLenSize = this._store.state.naluLengthSize;

      var ts = this._store.state.timeStampBase + this.currentTag.getTime();
      var isKeyframe = frameType === 1;
      while (this.unreadLength > 0) {
        if (this.unreadLength < 4) {
          this.warn('not enough data for parsing AVC');
          break;
        }
        var tempReadOffset = this.readOffset;
        var naluSize = naluLenSize === 4 ? dv.getUint32() : dv.getUint24();
        if (naluSize > this.unreadLength) {
          return;
        }

        var unitType = dv.getUint(5, this.readOffset, false);

        if (unitType === 5) {
          isKeyframe = true;
        }

        var data = new Uint8Array(this.data.buffer, tempReadOffset, naluLenSize + naluSize);
        this.readOffset = tempReadOffset + naluLenSize + naluSize;
        var naluUnit = {
          type: unitType,
          data: data
        };
        naluList.push(naluUnit);
        dataLen += data.byteLength;
      }
      dv = null;
      if (naluList.length) {
        var videoTrack = this._store.videoTrack;

        var videoSample = {
          units: naluList,
          length: dataLen,
          dts: ts,
          cps: cpsTime,
          pts: ts + cpsTime,
          isKeyframe: isKeyframe,
          position: isKeyframe ? this.currentTag.position : undefined
        };
        videoTrack.samples.push(videoSample);
        videoTrack.length += dataLen;
      }
    }
  }, {
    key: 'readData',
    value: function readData(num) {
      var data = this.data,
          readOffset = this.readOffset;

      if (this.dataSize > readOffset + num) {
        this.readOffset += num;
        return data.slice(readOffset, num);
      }
      return [];
    }
  }, {
    key: 'dataSize',
    get: function get() {
      return this.data.length;
    }
  }, {
    key: 'unreadLength',
    get: function get() {
      return this.dataSize - this.readOffset;
    }
  }]);

  return VideoDemuxer;
}(_Demuxer3.default);

exports.default = VideoDemuxer;

/***/ }),

/***/ "./src/parse/remux/Fmp4.js":
/*!*********************************!*\
  !*** ./src/parse/remux/Fmp4.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
// const UINT32_MAX = Math.pow(2, 32) - 1;


var _Buffer = __webpack_require__(/*! ../../write/Buffer */ "./src/write/Buffer.js");

var _Buffer2 = _interopRequireDefault(_Buffer);

var _funcUtils = __webpack_require__(/*! ../../utils/funcUtils */ "./src/utils/funcUtils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FMP4 = function () {
    function FMP4() {
        _classCallCheck(this, FMP4);
    }

    _createClass(FMP4, null, [{
        key: 'size',
        value: function size(value) {
            return _Buffer2.default.writeUint32(value);
        }
    }, {
        key: 'initBox',
        value: function initBox(size, name) {
            var buffer = new _Buffer2.default();

            for (var _len = arguments.length, content = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                content[_key - 2] = arguments[_key];
            }

            buffer.write.apply(buffer, [FMP4.size(size), FMP4.type(name)].concat(content));
            return buffer.buffer;
        }
    }, {
        key: 'extension',
        value: function extension(version, flag) {
            return new Uint8Array([version, flag >> 16 & 0xff, flag >> 8 & 0xff, flag & 0xff]);
        }
    }, {
        key: 'ftyp',
        value: function ftyp() {
            return FMP4.initBox(24, 'ftyp', new Uint8Array([0x69, 0x73, 0x6F, 0x6D, // isom,
            0x0, 0x0, 0x00, 0x01, // minor_version: 0x01
            0x69, 0x73, 0x6F, 0x6D, // isom
            0x61, 0x76, 0x63, 0x31]) // avc1
            );
        }
    }, {
        key: 'moov',
        value: function moov(data) {
            var size = 8;
            var mvhd = FMP4.mvhd(data.duration, data.timescale);
            var trak1 = FMP4.videoTrak(data);
            var trak2 = FMP4.audioTrak(data);
            var mvex = FMP4.mvex(data.duration, data.timescale);
            [mvhd, trak1, trak2, mvex].forEach(function (item) {
                size += item.byteLength;
            });
            return FMP4.initBox(size, 'moov', mvhd, trak1, trak2, mvex);
        }
    }, {
        key: 'mvhd',
        value: function mvhd(duration, timeScale) {
            var timescale = timeScale || 1000;
            // duration *= timescale;
            var bytes = new Uint8Array([0x00, 0x00, 0x00, 0x00, // version(0) + flags     1位的box版本+3位flags   box版本，0或1，一般为0。（以下字节数均按version=0）
            0x00, 0x00, 0x00, 0x00, // creation_time    创建时间  （相对于UTC时间1904-01-01零点的秒数）
            0x00, 0x00, 0x00, 0x00, // modification_time   修改时间

            /**
             * timescale: 4 bytes文件媒体在1秒时间内的刻度值，可以理解为1秒长度
             */
            timescale >>> 24 & 0xFF, timescale >>> 16 & 0xFF, timescale >>> 8 & 0xFF, timescale & 0xFF,

            /**
             * duration: 4 bytes该track的时间长度，用duration和time scale值可以计算track时长，比如audio track的time scale = 8000,
             * duration = 560128，时长为70.016，video track的time scale = 600, duration = 42000，时长为70
             */
            duration >>> 24 & 0xFF, duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, 0x00, 0x01, 0x00, 0x00, // Preferred rate: 1.0   推荐播放速率，高16位和低16位分别为小数点整数部分和小数部分，即[16.16] 格式，该值为1.0（0x00010000）表示正常前向播放
            /**
             * PreferredVolume(1.0, 2bytes) + reserved(2bytes)
             * 与rate类似，[8.8] 格式，1.0（0x0100）表示最大音量
             */
            0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, //  reserved: 4 + 4 bytes保留位
            0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, // ----begin composition matrix----
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // 视频变换矩阵   线性代数
            0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, // ----end composition matrix----
            0x00, 0x00, 0x00, 0x00, // ----begin pre_defined 6 * 4 bytes----
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // pre-defined 保留位
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // ----end pre_defined 6 * 4 bytes----
            0xFF, 0xFF, 0xFF, 0xFF]);
            return FMP4.initBox(8 + bytes.length, 'mvhd', new Uint8Array(bytes));
        }
    }, {
        key: 'videoTrak',
        value: function videoTrak(data) {
            var size = 8;
            var tkhd = FMP4.tkhd({
                id: 1,
                duration: data.duration,
                timescale: data.timescale,
                width: data.width,
                height: data.height,
                type: 'video'
            });
            var mdia = FMP4.mdia({
                type: 'video',
                timescale: data.timescale,
                duration: data.duration,
                sps: data.sps,
                pps: data.pps,
                pixelRatio: data.pixelRatio,
                width: data.width,
                height: data.height
            });
            [tkhd, mdia].forEach(function (item) {
                size += item.byteLength;
            });
            return FMP4.initBox(size, 'trak', tkhd, mdia);
        }
    }, {
        key: 'audioTrak',
        value: function audioTrak(data) {
            var size = 8;
            var tkhd = FMP4.tkhd({
                id: 2,
                duration: data.duration,
                timescale: data.timescale,
                width: 0,
                height: 0,
                type: 'audio'
            });
            var mdia = FMP4.mdia({
                type: 'audio',
                timescale: data.timescale,
                duration: data.duration,
                channelCount: data.audioChannelCount,
                samplerate: data.audioSampleRate,
                config: data.audioConfig
            });
            [tkhd, mdia].forEach(function (item) {
                size += item.byteLength;
            });
            return FMP4.initBox(size, 'trak', tkhd, mdia);
        }
    }, {
        key: 'tkhd',
        value: function tkhd(data) {
            var id = data.id,
                duration = data.duration,
                width = data.width,
                height = data.height;
            var content = new Uint8Array([0x00, 0x00, 0x00, 0x07, // version(0) + flags 1位版本 box版本，0或1，一般为0。（以下字节数均按version=0）按位或操作结果值，预定义如下：
            // 0x000001 track_enabled，否则该track不被播放；
            // 0x000002 track_in_movie，表示该track在播放中被引用；
            // 0x000004 track_in_preview，表示该track在预览时被引用。
            // 一般该值为7，1+2+4 如果一个媒体所有track均未设置track_in_movie和track_in_preview，将被理解为所有track均设置了这两项；对于hint track，该值为0
            // hint track 这个特殊的track并不包含媒体数据，而是包含了一些将其他数据track打包成流媒体的指示信息。
            0x00, 0x00, 0x00, 0x00, // creation_time创建时间（相对于UTC时间1904-01-01零点的秒数）
            0x00, 0x00, 0x00, 0x00, // modification time 修改时间
            id >>> 24 & 0xFF, // track_ID: 4 bytes id号，不能重复且不能为0
            id >>> 16 & 0xFF, id >>> 8 & 0xFF, id & 0xFF, 0x00, 0x00, 0x00, 0x00, // reserved: 4 bytes    保留位
            duration >>> 24 & 0xFF, // duration: 4 bytes track的时间长度
            duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, 0x00, 0x00, 0x00, 0x00, // reserved: 2 * 4 bytes    保留位
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // layer(2bytes) + alternate_group(2bytes)  视频层，默认为0，值小的在上层.track分组信息，默认为0表示该track未与其他track有群组关系
            0x00, 0x00, 0x00, 0x00, // volume(2bytes) + reserved(2bytes)    [8.8] 格式，如果为音频track，1.0（0x0100）表示最大音量；否则为0   +保留位
            0x00, 0x01, 0x00, 0x00, // ----begin composition matrix----
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, // 视频变换矩阵
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, // ----end composition matrix----
            width >>> 8 & 0xFF, // //宽度
            width & 0xFF, 0x00, 0x00, height >>> 8 & 0xFF, // 高度
            height & 0xFF, 0x00, 0x00]);
            return FMP4.initBox(8 + content.byteLength, 'tkhd', content);
        }
    }, {
        key: 'edts',
        value: function edts(data) {
            var buffer = new _Buffer2.default(),
                duration = data.duration,
                mediaTime = data.mediaTime;
            buffer.write(FMP4.size(36), FMP4.type('edts'));
            // elst
            buffer.write(FMP4.size(28), FMP4.type('elst'));
            buffer.write(new Uint8Array([0x00, 0x00, 0x00, 0x01, // entry count
            duration >> 24 & 0xff, duration >> 16 & 0xff, duration >> 8 & 0xff, duration & 0xff, mediaTime >> 24 & 0xff, mediaTime >> 16 & 0xff, mediaTime >> 8 & 0xff, mediaTime & 0xff, 0x00, 0x00, 0x00, 0x01]) // media rate
            );
            return buffer.buffer;
        }
    }, {
        key: 'mdia',
        value: function mdia(data) {
            var size = 8;
            var mdhd = FMP4.mdhd(data.timescale, data.duration);
            var hdlr = FMP4.hdlr(data.type);
            var minf = FMP4.minf(data);
            [mdhd, hdlr, minf].forEach(function (item) {
                size += item.byteLength;
            });
            return FMP4.initBox(size, 'mdia', mdhd, hdlr, minf);
        }
    }, {
        key: 'mdhd',
        value: function mdhd(timescale, duration) {
            var content = new Uint8Array([0x00, 0x00, 0x00, 0x00, // creation_time    创建时间
            0x00, 0x00, 0x00, 0x00, // modification_time修改时间
            timescale >>> 24 & 0xFF, // timescale: 4 bytes    文件媒体在1秒时间内的刻度值，可以理解为1秒长度
            timescale >>> 16 & 0xFF, timescale >>> 8 & 0xFF, timescale & 0xFF, duration >>> 24 & 0xFF, // duration: 4 bytes  track的时间长度
            duration >>> 16 & 0xFF, duration >>> 8 & 0xFF, duration & 0xFF, 0x55, 0xC4, // language: und (undetermined) 媒体语言码。最高位为0，后面15位为3个字符（见ISO 639-2/T标准中定义）
            0x00, 0x00]);
            return FMP4.initBox(12 + content.byteLength, 'mdhd', FMP4.extension(0, 0), content);
        }
    }, {
        key: 'hdlr',
        value: function hdlr(type) {
            var buffer = new _Buffer2.default();
            var value = [0x00, // version 0
            0x00, 0x00, 0x00, // flags
            0x00, 0x00, 0x00, 0x00, // pre_defined
            0x76, 0x69, 0x64, 0x65, // handler_type: 'vide'
            0x00, 0x00, 0x00, 0x00, // reserved
            0x00, 0x00, 0x00, 0x00, // reserved
            0x00, 0x00, 0x00, 0x00, // reserved
            0x56, 0x69, 0x64, 0x65, 0x6f, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00];
            if (type === 'audio') {
                value.splice.apply(value, [8, 4].concat([0x73, 0x6f, 0x75, 0x6e]));
                value.splice.apply(value, [24, 13].concat([0x53, 0x6f, 0x75, 0x6e, 0x64, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00]));
            }
            return FMP4.initBox(8 + value.length, 'hdlr', new Uint8Array(value));
        }
    }, {
        key: 'minf',
        value: function minf(data) {
            var buffer = new _Buffer2.default(),
                size = 8;
            var vmhd = data.type === 'video' ? FMP4.vmhd() : FMP4.smhd();
            var dinf = FMP4.dinf();
            var stbl = FMP4.stbl(data);
            [vmhd, dinf, stbl].forEach(function (item) {
                size += item.byteLength;
            });
            return FMP4.initBox(size, 'minf', vmhd, dinf, stbl);
        }
    }, {
        key: 'vmhd',
        value: function vmhd() {
            return FMP4.initBox(20, 'vmhd', new Uint8Array([0x00, // version
            0x00, 0x00, 0x01, // flags
            0x00, 0x00, // graphicsmode
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00]) // opcolor
            );
        }
    }, {
        key: 'smhd',
        value: function smhd() {
            return FMP4.initBox(16, 'smhd', new Uint8Array([0x00, // version
            0x00, 0x00, 0x00, // flags
            0x00, 0x00, // balance
            0x00, 0x00]) // reserved
            );
        }
    }, {
        key: 'dinf',
        value: function dinf() {
            var buffer = new _Buffer2.default();
            var dref = [0x00, // version 0
            0x00, 0x00, 0x00, // flags
            0x00, 0x00, 0x00, 0x01, // entry_count
            0x00, 0x00, 0x00, 0x0c, // entry_size
            0x75, 0x72, 0x6c, 0x20, // 'url' type
            0x00, // version 0
            0x00, 0x00, 0x01];
            buffer.write(FMP4.size(36), FMP4.type('dinf'), FMP4.size(28), FMP4.type('dref'), new Uint8Array(dref));
            return buffer.buffer;
        }
    }, {
        key: 'stbl',
        value: function stbl(data) {
            var size = 8;
            var stsd = FMP4.stsd(data);
            var stts = FMP4.stts();
            var stsc = FMP4.stsc();
            var stsz = FMP4.stsz();
            var stco = FMP4.stco();
            [stsd, stts, stsc, stsz, stco].forEach(function (item) {
                size += item.byteLength;
            });
            return FMP4.initBox(size, 'stbl', stsd, stts, stsc, stsz, stco);
        }
    }, {
        key: 'stsd',
        value: function stsd(data) {
            var content = void 0;
            if (data.type === 'audio') {
                // if (!data.isAAC && data.codec === 'mp4') {
                //     content = FMP4.mp3(data);
                // } else {
                //
                // }
                // 支持mp4a
                content = FMP4.mp4a(data);
            } else {
                content = FMP4.avc1(data);
            }
            return FMP4.initBox(16 + content.byteLength, 'stsd', FMP4.extension(0, 0), new Uint8Array([0x00, 0x00, 0x00, 0x01]), content);
        }
    }, {
        key: 'mp4a',
        value: function mp4a(data) {
            var buffer = new _Buffer2.default();
            var content = new Uint8Array([0x00, 0x00, 0x00, // reserved
            0x00, 0x00, 0x00, // reserved
            0x00, 0x01, // data_reference_index
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // reserved
            0x00, data.channelCount, // channelcount
            0x00, 0x10, // sampleSize:16bits
            0x00, 0x00, 0x00, 0x00, // reserved2
            data.samplerate >> 8 & 0xff, data.samplerate & 0xff, //
            0x00, 0x00]);
            var esds = FMP4.esds(data.config);
            return FMP4.initBox(8 + content.byteLength + esds.byteLength, 'mp4a', content, esds);
        }
    }, {
        key: 'esds',
        value: function esds() {
            var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [43, 146, 8, 0];

            var configlen = config.length;
            var buffer = new _Buffer2.default();
            var content = new Uint8Array([0x00, // version 0
            0x00, 0x00, 0x00, // flags

            0x03, // descriptor_type
            0x17 + configlen, // length
            0x00, 0x01, // es_id
            0x00, // stream_priority

            0x04, // descriptor_type
            0x0f + configlen, // length
            0x40, // codec : mpeg4_audio
            0x15, // stream_type
            0x00, 0x00, 0x00, // buffer_size
            0x00, 0x00, 0x00, 0x00, // maxBitrate
            0x00, 0x00, 0x00, 0x00, // avgBitrate

            0x05].concat([configlen]).concat(config).concat([0x06, 0x01, 0x02]));
            buffer.write(FMP4.size(8 + content.byteLength), FMP4.type('esds'), content);
            return buffer.buffer;
        }
    }, {
        key: 'avc1',
        value: function avc1(data) {
            var buffer = new _Buffer2.default(),
                size = 40; // 8(avc1)+8(avcc)+8(btrt)+16(pasp)
            var sps = data.sps,
                pps = data.pps,
                width = data.width,
                height = data.height,
                hSpacing = data.pixelRatio[0],
                vSpacing = data.pixelRatio[1];
            var avccBuffer = new _Buffer2.default();
            avccBuffer.write(new Uint8Array([0x01, // version
            sps[1], // profile
            sps[2], // profile compatible
            sps[3], // level
            0xfc | 3, 0xE0 | 1].concat([sps.length >>> 8 & 0xff, sps.length & 0xff])));
            avccBuffer.write(sps, new Uint8Array([1, pps.length >>> 8 & 0xff, pps.length & 0xff]), pps);

            var avcc = avccBuffer.buffer;
            var avc1 = new Uint8Array([0x00, 0x00, 0x00, // reserved
            0x00, 0x00, 0x00, // reserved
            0x00, 0x01, // data_reference_index
            0x00, 0x00, // pre_defined
            0x00, 0x00, // reserved
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // pre_defined
            width >> 8 & 0xff, width & 0xff, // width
            height >> 8 & 0xff, height & 0xff, // height
            0x00, 0x48, 0x00, 0x00, // horizresolution
            0x00, 0x48, 0x00, 0x00, // vertresolution
            0x00, 0x00, 0x00, 0x00, // reserved
            0x00, 0x01, // frame_count
            0x12, 0x64, 0x61, 0x69, 0x6C, // dailymotion/hls.js
            0x79, 0x6D, 0x6F, 0x74, 0x69, 0x6F, 0x6E, 0x2F, 0x68, 0x6C, 0x73, 0x2E, 0x6A, 0x73, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // compressorname
            0x00, 0x18, // depth = 24
            0x11, 0x11]); // pre_defined = -1
            var btrt = new Uint8Array([0x00, 0x1c, 0x9c, 0x80, // bufferSizeDB
            0x00, 0x2d, 0xc6, 0xc0, // maxBitrate
            0x00, 0x2d, 0xc6, 0xc0]);
            var pasp = new Uint8Array([hSpacing >> 24, // hSpacing
            hSpacing >> 16 & 0xff, hSpacing >> 8 & 0xff, hSpacing & 0xff, vSpacing >> 24, // vSpacing
            vSpacing >> 16 & 0xff, vSpacing >> 8 & 0xff, vSpacing & 0xff]);

            buffer.write(FMP4.size(size + avc1.byteLength + avcc.byteLength + btrt.byteLength), FMP4.type('avc1'), avc1, FMP4.size(8 + avcc.byteLength), FMP4.type('avcC'), avcc, FMP4.size(20), FMP4.type('btrt'), btrt, FMP4.size(16), FMP4.type('pasp'), pasp);
            return buffer.buffer;
        }
    }, {
        key: 'stts',
        value: function stts() {
            var content = new Uint8Array([0x00, // version
            0x00, 0x00, 0x00, // flags
            0x00, 0x00, 0x00, 0x00]);
            return FMP4.initBox(16, 'stts', content);
        }
    }, {
        key: 'stsc',
        value: function stsc() {
            var content = new Uint8Array([0x00, // version
            0x00, 0x00, 0x00, // flags
            0x00, 0x00, 0x00, 0x00]);
            return FMP4.initBox(16, 'stsc', content);
        }
    }, {
        key: 'stco',
        value: function stco() {
            var content = new Uint8Array([0x00, // version
            0x00, 0x00, 0x00, // flags
            0x00, 0x00, 0x00, 0x00]);
            return FMP4.initBox(16, 'stco', content);
        }
    }, {
        key: 'stsz',
        value: function stsz() {
            var content = new Uint8Array([0x00, // version
            0x00, 0x00, 0x00, // flags
            0x00, 0x00, 0x00, 0x00, // sample_size
            0x00, 0x00, 0x00, 0x00]);
            return FMP4.initBox(20, 'stsz', content);
        }
    }, {
        key: 'mvex',
        value: function mvex(duration) {
            var buffer = new _Buffer2.default();
            var mehd = _Buffer2.default.writeUint32(duration);
            buffer.write(FMP4.size(88), FMP4.type('mvex'), FMP4.size(16), FMP4.type('mehd'), FMP4.extension(0, 0), mehd, FMP4.trex(1), FMP4.trex(2));
            return buffer.buffer;
        }
    }, {
        key: 'trex',
        value: function trex(id) {
            var content = new Uint8Array([0x00, // version 0
            0x00, 0x00, 0x00, // flags
            id >> 24, id >> 16 & 0xff, id >> 8 & 0xff, id & 0xff, // track_ID
            0x00, 0x00, 0x00, 0x01, // default_sample_description_index
            0x00, 0x00, 0x00, 0x00, // default_sample_duration
            0x00, 0x00, 0x00, 0x00, // default_sample_size
            0x00, 0x01, 0x00, 0x01]);
            return FMP4.initBox(8 + content.byteLength, 'trex', content);
        }
    }, {
        key: 'moof',
        value: function moof(data) {
            var size = 8;
            var mfhd = FMP4.mfhd();
            var traf = FMP4.traf(data);
            [mfhd, traf].forEach(function (item) {
                size += item.byteLength;
            });
            return FMP4.initBox(size, 'moof', mfhd, traf);
        }
    }, {
        key: 'mfhd',
        value: function mfhd() {
            var content = _Buffer2.default.writeUint32(FMP4.sequence);
            FMP4.sequence += 1;
            return FMP4.initBox(16, 'mfhd', FMP4.extension(0, 0), content);
        }
    }, {
        key: 'traf',
        value: function traf(data) {
            var size = 8;
            var tfhd = FMP4.tfhd(data.id);
            var tfdt = FMP4.tfdt(data.time);
            var sdtp = FMP4.sdtp(data);
            var trun = FMP4.trun(data, sdtp.byteLength);
            [tfhd, tfdt, sdtp, trun].forEach(function (item) {
                size += item.byteLength;
            });
            return FMP4.initBox(size, 'traf', tfhd, tfdt, sdtp, trun);
        }
    }, {
        key: 'tfhd',
        value: function tfhd(id) {
            var content = _Buffer2.default.writeUint32(id);
            return FMP4.initBox(16, 'tfhd', FMP4.extension(0, 0), content);
        }
    }, {
        key: 'tfdt',
        value: function tfdt(time) {
            // let upper = Math.floor(time / (UINT32_MAX + 1)),
            //     lower = Math.floor(time % (UINT32_MAX + 1));
            return FMP4.initBox(16, 'tfdt', FMP4.extension(0, 0), _Buffer2.default.writeUint32(time));
        }
    }, {
        key: 'trun',
        value: function trun(data, sdtpLength) {
            // let id = data.id;
            // let ceil = id === 1 ? 16 : 12;
            var buffer = new _Buffer2.default();
            var sampleCount = _Buffer2.default.writeUint32(data.samples.length);
            // mdat-header 8
            // moof-header 8
            // mfhd 16
            // traf-header 8
            // thhd 16
            // tfdt 20
            // trun-header 12
            // sampleCount 4
            // data-offset 4
            // samples.length
            var offset = _Buffer2.default.writeUint32(8 + 8 + 16 + 8 + 16 + 16 + 12 + 4 + 4 + 16 * data.samples.length + sdtpLength);
            buffer.write(FMP4.size(20 + 16 * data.samples.length), FMP4.type('trun'), new Uint8Array([0x00, 0x00, 0x0F, 0x01]), sampleCount, offset);

            var size = buffer.buffer.byteLength,
                writeOffset = 0;
            data.samples.forEach(function () {
                size += 16;
            });

            var trunBox = new Uint8Array(size);

            trunBox.set(buffer.buffer, 0);
            writeOffset += buffer.buffer.byteLength;
            data.samples.forEach(function (item) {

                trunBox.set(_Buffer2.default.writeUint32(item.duration), writeOffset);
                writeOffset += 4;
                trunBox.set(_Buffer2.default.writeUint32(item.size), writeOffset);
                writeOffset += 4;

                if (data.id === 1) {
                    trunBox.set(_Buffer2.default.writeUint32(item.isKeyframe ? 0x02000000 : 0x01010000), writeOffset);
                    writeOffset += 4;
                    trunBox.set(_Buffer2.default.writeUint32(item.cps), writeOffset);
                    writeOffset += 4;
                } else {
                    trunBox.set(_Buffer2.default.writeUint32(0x01000000), writeOffset);
                    writeOffset += 4;
                    trunBox.set(_Buffer2.default.writeUint32(0), writeOffset);
                    writeOffset += 4;
                }

                // buffer.write(Buffer.writeUint32(0));
            });
            return trunBox;
        }
    }, {
        key: 'sdtp',
        value: function sdtp(data) {
            var buffer = new _Buffer2.default();
            buffer.write(FMP4.size(12 + data.samples.length), FMP4.type('sdtp'), FMP4.extension(0, 0));
            data.samples.forEach(function (item) {
                buffer.write(new Uint8Array(data.id === 1 ? [item.key ? 32 : 16] : [16]));
            });
            return buffer.buffer;
        }
    }, {
        key: 'mdat',
        value: function mdat(data) {
            var buffer = new _Buffer2.default(),
                size = 8;
            data.samples.forEach(function (item) {
                size += item.size;
            });
            buffer.write(FMP4.size(size), FMP4.type('mdat'));
            var mdatBox = new Uint8Array(size);
            var offset = 0;
            mdatBox.set(buffer.buffer, offset);
            offset += 8;
            data.samples.forEach(function (item) {
                item.buffer.forEach(function (unit) {
                    mdatBox.set(unit.data, offset);
                    offset += unit.data.byteLength;
                    // buffer.write(unit.data);
                });
            });
            return mdatBox;
        }
    }]);

    return FMP4;
}();

FMP4.type = (0, _funcUtils.cacheWrapper)(function (name) {
    return new Uint8Array([name.charCodeAt(0), name.charCodeAt(1), name.charCodeAt(2), name.charCodeAt(3)]);
});
FMP4.sequence = 1;

exports.default = FMP4;

/***/ }),

/***/ "./src/parse/remux/Mp4remux.js":
/*!*************************************!*\
  !*** ./src/parse/remux/Mp4remux.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MediaSegmentList = __webpack_require__(/*! ../../models/MediaSegmentList */ "./src/models/MediaSegmentList.js");

var _MediaSegmentList2 = _interopRequireDefault(_MediaSegmentList);

var _MediaSegment = __webpack_require__(/*! ../../models/MediaSegment */ "./src/models/MediaSegment.js");

var _MediaSegment2 = _interopRequireDefault(_MediaSegment);

var _MediaSample = __webpack_require__(/*! ../../models/MediaSample */ "./src/models/MediaSample.js");

var _MediaSample2 = _interopRequireDefault(_MediaSample);

var _sniffer = __webpack_require__(/*! ../../utils/sniffer */ "./src/utils/sniffer.js");

var _sniffer2 = _interopRequireDefault(_sniffer);

var _Buffer = __webpack_require__(/*! ../../write/Buffer */ "./src/write/Buffer.js");

var _Buffer2 = _interopRequireDefault(_Buffer);

var _Fmp = __webpack_require__(/*! ./Fmp4 */ "./src/parse/remux/Fmp4.js");

var _Fmp2 = _interopRequireDefault(_Fmp);

var _Remuxer2 = __webpack_require__(/*! ./Remuxer */ "./src/parse/remux/Remuxer.js");

var _Remuxer3 = _interopRequireDefault(_Remuxer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mp4Remuxer = function (_Remuxer) {
  _inherits(Mp4Remuxer, _Remuxer);

  function Mp4Remuxer(store) {
    _classCallCheck(this, Mp4Remuxer);

    var _this = _possibleConstructorReturn(this, (Mp4Remuxer.__proto__ || Object.getPrototypeOf(Mp4Remuxer)).call(this, store));

    _this._dtsBase = 0;
    _this._isDtsBaseInited = false;
    _this._videoMeta = null;
    _this._audioMeta = null;
    _this._audioNextDts = null;
    _this._videoNextDts = null;
    _this._videoSegmentList = new _MediaSegmentList2.default('video');
    _this._audioSegmentList = new _MediaSegmentList2.default('audio');
    var browser = _sniffer2.default.browser;

    _this._fillSilenceFrame = browser === 'ie';
    _this.handleMediaFragment = function () {};
    return _this;
  }

  _createClass(Mp4Remuxer, [{
    key: 'destroy',
    value: function destroy() {
      this._dtsBase = -1;
      this._dtsBaseInited = false;
      this._audioMeta = null;
      this._videoMeta = null;
      this._videoNextDts = null;
      this._audioNextDts = null;
      this._videoSegmentList.clear();
      this._audioSegmentList.clear();
      this._videoSegmentList = null;
      this._audioSegmentList = null;
    }
  }, {
    key: 'remux',
    value: function remux(audioTrack, videoTrack) {
      !this._isDtsBaseInited && this.calcDtsBase(audioTrack, videoTrack);

      this._remuxVideo(videoTrack);
      this._remuxAudio(audioTrack);
    }
  }, {
    key: 'seek',
    value: function seek() {
      this._videoNextDts = null;
      this._audioNextDts = null;
      this._videoSegmentList.clear();
      this._audioSegmentList.clear();
    }
  }, {
    key: 'onMetaDataReady',
    value: function onMetaDataReady(type, meta) {
      this['_' + type + 'Meta'] = meta;
    }
  }, {
    key: 'onMediaInfoReady',
    value: function onMediaInfoReady(mediaInfo) {
      var ftypMoov = new _Buffer2.default();
      var ftyp = _Fmp2.default.ftyp();
      var moov = _Fmp2.default.moov(mediaInfo);
      ftypMoov.write(ftyp, moov);
      return ftypMoov.buffer;
    }
  }, {
    key: 'calcDtsBase',
    value: function calcDtsBase(audioTrack, videoTrack) {
      var audioBase = Infinity;
      var videoBase = Infinity;
      if (audioTrack.samples && audioTrack.samples.length) {
        audioBase = audioTrack.samples[0].dts;
      }
      if (videoTrack.samples && videoTrack.samples.length) {
        videoBase = videoTrack.samples[0].dts;
      }

      this._dtsBase = Math.min(audioBase, videoBase);
      this._isDtsBaseInited = true;
    }
  }, {
    key: '_remuxVideo',
    value: function _remuxVideo(videoTrack) {
      if (!this._videoMeta) {
        return;
      }
      var track = videoTrack;
      if (!videoTrack.samples || !videoTrack.samples.length) {
        return;
      }
      var samples = track.samples;

      var dtsCorrection = void 0;
      var firstDts = -1;
      var lastDts = -1;
      var firstPts = -1;
      var lastPts = -1;

      var mp4Samples = [];
      var mdatBox = {
        samples: []
      };
      var videoSegment = new _MediaSegment2.default();
      while (samples.length) {
        var avcSample = samples.shift();
        var isKeyframe = avcSample.isKeyframe,
            cps = avcSample.cps;

        var dts = avcSample.dts - this._dtsBase;

        if (dtsCorrection === undefined) {
          if (!this._videoNextDts) {
            var lastSegment = this._videoSegmentList.getLastSegmentBefore(dts);
            if (lastSegment) {
              var gap = void 0;
              var _lastDts = lastSegment.lastDts,
                  lastGap = lastSegment.gap;

              gap = dts - (_lastDts + lastGap) > 3 ? dts - (_lastDts + lastGap) : 0;
              dtsCorrection = dts - (_lastDts + gap);
            } else {
              dtsCorrection = 0;
            }
          } else {
            dtsCorrection = dts - this._videoNextDts >= 1000 ? 0 : dts - this._videoNextDts;
          }
        }
        var originDts = dts;
        dts -= dtsCorrection;
        var pts = dts + cps;

        if (firstDts === -1) {
          firstDts = dts;
          firstPts = pts;
        }
        var _units = [];
        while (avcSample.units.length) {
          var mdatSample = {
            buffer: [],
            size: 0
          };
          var unit = avcSample.units.shift();
          _units.push(unit);
          mdatSample.buffer.push(unit);
          mdatSample.size += unit.data.byteLength;

          mdatBox.samples.push(mdatSample);
        }

        var sampleDuration = 0;

        if (samples.length >= 1) {
          var nextDts = samples[0].dts - this._dtsBase - dtsCorrection;
          sampleDuration = nextDts - dts;
        } else {
          if (mp4Samples.length >= 1) {
            // lastest sample, use second last duration
            sampleDuration = mp4Samples[mp4Samples.length - 1].duration;
          } else {
            // the only one sample, use reference duration
            sampleDuration = this._videoMeta.refSampleDuration;
          }
        }

        if (isKeyframe) {
          var rap = new _MediaSample2.default({
            dts: dts,
            pts: pts,
            duration: sampleDuration,
            originDts: avcSample.dts,
            position: avcSample.position,
            isRAP: true
          });
          videoSegment.addRAP(rap);
        }

        mp4Samples.push({
          dts: dts,
          cps: cps,
          pts: pts,
          units: _units,
          size: avcSample.length,
          isKeyframe: isKeyframe,
          duration: sampleDuration,
          originDts: originDts
        });
      }
      var first = mp4Samples[0];
      var last = mp4Samples[mp4Samples.length - 1];
      lastDts = last.dts + last.duration;
      lastPts = last.pts + last.duration;

      this._videoNextDts = lastDts;

      videoSegment.startDts = firstDts;
      videoSegment.endDts = lastDts;
      videoSegment.startPts = firstPts;
      videoSegment.endPts = lastPts;
      videoSegment.originStartDts = first.originDts;
      videoSegment.originEndDts = last.originDts + last.duration;
      videoSegment.gap = dtsCorrection;
      var firstSample = new _MediaSample2.default({
        dts: first.dts,
        pts: first.pts,
        duration: first.duration,
        isKeyframe: first.isKeyframe,
        originDts: first.originDts
      });
      var lastSample = new _MediaSample2.default({
        dts: last.dts,
        pts: last.pts,
        duration: last.duration,
        isKeyframe: last.isKeyframe,
        originDts: last.originDts
      });
      videoSegment.firstSample = firstSample;
      videoSegment.lastSample = lastSample;
      var moofMdat = new _Buffer2.default();

      track.samples = mp4Samples;
      track.time = firstDts;
      var moof = _Fmp2.default.moof(track);
      var mdat = _Fmp2.default.mdat(mdatBox);
      moofMdat.write(moof, mdat);

      if (!this._store.isLive) {
        this._videoSegmentList.append(videoSegment);
      }

      track.samples = [];
      track.length = 0;

      this.handleMediaFragment({
        type: 'video',
        data: moofMdat.buffer.buffer,
        sampleCount: mp4Samples.length,
        fragment: videoSegment
      });
    }
  }, {
    key: '_remuxAudio',
    value: function _remuxAudio(track) {
      if (!this._audioMeta) {
        return;
      }
      var samples = track.samples;

      var dtsCorrection = void 0;
      var firstDts = -1;
      var lastDts = -1;
      // let firstPts = -1
      // let lastPts = -1
      var silentDuration = void 0;
      var mp4Samples = [];

      var mdatBox = {
        samples: []
      };
      if (!samples || !samples.length) {
        return;
      }
      var isFirstDtsInited = false;
      while (samples.length) {
        var sample = samples.shift();
        var unit = sample.unit;

        var dts = sample.dts - this._dtsBase;

        var needSilentFrame = false;
        if (dtsCorrection === undefined) {
          if (!this._audioNextDts) {
            var lastSegment = this._audioSegmentList.getLastSegmentBefore(dts);
            if (lastSegment) {
              var gap = void 0;
              var _lastDts2 = lastSegment.lastDts,
                  lastGap = lastSegment.gap;

              gap = dts - (_lastDts2 + lastGap) > 3 ? dts - (_lastDts2 + lastGap) : 0;
              dtsCorrection = dts - (_lastDts2 + gap);
            } else {
              needSilentFrame = this._fillSilenceFrame && !this._videoSegmentList.isEmpty();
              dtsCorrection = 0;
            }
          } else {
            dtsCorrection = dts - this._audioNextDts >= 1000 ? 0 : dts - this._audioNextDts;
          }
        }
        var originDts = dts;
        dts -= dtsCorrection;

        if (needSilentFrame) {
          var videoSegment = this._videoSegmentList.getLastSampleBefore(originDts);

          if (videoSegment && videoSegment.startDts < dts) {
            silentDuration = dts - videoSegment.startDts;
            dts = videoSegment.startDts;
          } else {
            needSilentFrame = false;
          }
        }

        if (!isFirstDtsInited) {
          firstDts = dts;
          isFirstDtsInited = true;
        }

        if (needSilentFrame) {
          samples.unshift(sample);
          var silentFrame = this.initSilentAudio(dts, silentDuration);
          mp4Samples.push(silentFrame);

          var _mdatSample = {
            buffer: [],
            size: 0
          };
          _mdatSample.buffer.push({
            data: silentFrame.unit
          });
          _mdatSample.size += silentFrame.unit.byteLength;

          mdatBox.samples.push(_mdatSample);
          continue;
        }

        var sampleDuration = 0;

        if (samples.length >= 1) {
          var nextDts = samples[0].dts - this._dtsBase - dtsCorrection;
          sampleDuration = nextDts - dts;
        } else {
          if (mp4Samples.length >= 1) {
            // use second last sample duration
            sampleDuration = mp4Samples[mp4Samples.length - 1].duration;
          } else {
            // the only one sample, use reference sample duration
            sampleDuration = this._audioMeta.refSampleDuration;
          }
        }

        var mp4Sample = {
          dts: dts,
          pts: dts,
          cts: 0,
          size: unit.byteLength,
          duration: sampleDuration,
          originDts: originDts
        };

        var mdatSample = {
          buffer: [],
          size: 0
        };
        mdatSample.buffer.push({
          data: unit
        });
        mdatSample.size += unit.byteLength;

        mdatBox.samples.push(mdatSample);

        mp4Samples.push(mp4Sample);
      }

      var last = mp4Samples[mp4Samples.length - 1];
      lastDts = last.dts + last.duration;

      this._audioNextDts = lastDts;

      var audioSegment = new _MediaSegment2.default();
      audioSegment.startDts = firstDts;
      audioSegment.endDts = lastDts;
      audioSegment.startPts = firstDts;
      audioSegment.endPts = lastDts;
      audioSegment.originStartDts = mp4Samples[0].originDts;
      audioSegment.originEndDts = last.originDts + last.duration;
      audioSegment.gap = dtsCorrection;
      audioSegment.firstSample = new _MediaSample2.default({
        dts: mp4Samples[0].dts,
        pts: mp4Samples[0].pts,
        duration: mp4Samples[0].duration,
        originDts: mp4Samples[0].originDts
      });
      audioSegment.lastSample = new _MediaSample2.default({
        dts: last.dts,
        pts: last.pts,
        duration: last.duration,
        originDts: last.originDts
      });

      track.samples = mp4Samples;
      var moofMdat = new _Buffer2.default();
      track.time = firstDts;
      var moof = _Fmp2.default.moof(track, firstDts);
      var mdat = _Fmp2.default.mdat(mdatBox);
      moofMdat.write(moof, mdat);

      if (!this._store.isLive) {
        this._audioSegmentList.append(audioSegment);
      }
      track.samples = [];
      track.length = 0;
      this.handleMediaFragment({
        type: 'audio',
        data: moofMdat.buffer.buffer,
        sampleCount: mp4Samples.length,
        fragment: audioSegment
      });
    }
  }, {
    key: 'initSilentAudio',
    value: function initSilentAudio(dts, duration) {
      var unit = Mp4Remuxer.getSilentFrame(this._audioMeta.channelCount);
      return {
        dts: dts,
        pts: dts,
        cps: 0,
        duration: duration,
        unit: unit,
        size: unit.byteLength,
        originDts: dts
      };
    }
  }], [{
    key: 'getSilentFrame',
    value: function getSilentFrame(channelCount) {
      if (channelCount === 1) {
        return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x23, 0x80]);
      } else if (channelCount === 2) {
        return new Uint8Array([0x21, 0x00, 0x49, 0x90, 0x02, 0x19, 0x00, 0x23, 0x80]);
      } else if (channelCount === 3) {
        return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x8e]);
      } else if (channelCount === 4) {
        return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x80, 0x2c, 0x80, 0x08, 0x02, 0x38]);
      } else if (channelCount === 5) {
        return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x82, 0x30, 0x04, 0x99, 0x00, 0x21, 0x90, 0x02, 0x38]);
      } else if (channelCount === 6) {
        return new Uint8Array([0x00, 0xc8, 0x00, 0x80, 0x20, 0x84, 0x01, 0x26, 0x40, 0x08, 0x64, 0x00, 0x82, 0x30, 0x04, 0x99, 0x00, 0x21, 0x90, 0x02, 0x00, 0xb2, 0x00, 0x20, 0x08, 0xe0]);
      }
      return null;
    }
  }]);

  return Mp4Remuxer;
}(_Remuxer3.default);

exports.default = Mp4Remuxer;

/***/ }),

/***/ "./src/parse/remux/Remuxer.js":
/*!************************************!*\
  !*** ./src/parse/remux/Remuxer.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Log = __webpack_require__(/*! ../../utils/Log */ "./src/utils/Log.js");

var _Log2 = _interopRequireDefault(_Log);

var _TransCoder2 = __webpack_require__(/*! ../TransCoder */ "./src/parse/TransCoder.js");

var _TransCoder3 = _interopRequireDefault(_TransCoder2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Remuxer = function (_TransCoder) {
  _inherits(Remuxer, _TransCoder);

  function Remuxer() {
    _classCallCheck(this, Remuxer);

    return _possibleConstructorReturn(this, (Remuxer.__proto__ || Object.getPrototypeOf(Remuxer)).apply(this, arguments));
  }

  _createClass(Remuxer, [{
    key: 'dispatch',
    value: function dispatch(type) {
      var _observer;

      var prefix = 'remuxer_';

      for (var _len = arguments.length, payload = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        payload[_key - 1] = arguments[_key];
      }

      (_observer = this._observer).emit.apply(_observer, ['' + prefix + type].concat(payload));
    }
  }, {
    key: 'error',
    value: function error(message) {
      var _CLASS_NAME = this.CLASS_NAME,
          CLASS_NAME = _CLASS_NAME === undefined ? 'Remuxer' : _CLASS_NAME;

      _Log2.default.error('[' + CLASS_NAME + ' error] ', message);
    }
  }, {
    key: 'info',
    value: function info(message) {
      var _CLASS_NAME2 = this.CLASS_NAME,
          CLASS_NAME = _CLASS_NAME2 === undefined ? 'Remuxer' : _CLASS_NAME2;

      _Log2.default.info('[' + CLASS_NAME + ' info] ', message);
    }
  }, {
    key: 'log',
    value: function log(message) {
      var _CLASS_NAME3 = this.CLASS_NAME,
          CLASS_NAME = _CLASS_NAME3 === undefined ? 'Remuxer' : _CLASS_NAME3;

      _Log2.default.log('[' + CLASS_NAME + ' log] ', message);
    }
  }, {
    key: 'warn',
    value: function warn(message) {
      var _CLASS_NAME4 = this.CLASS_NAME,
          CLASS_NAME = _CLASS_NAME4 === undefined ? 'Remuxer' : _CLASS_NAME4;

      _Log2.default.warn('[' + CLASS_NAME + ' warn] ', message);
    }
  }]);

  return Remuxer;
}(_TransCoder3.default);

exports.default = Remuxer;

/***/ }),

/***/ "./src/tasks/LiveTask.js":
/*!*******************************!*\
  !*** ./src/tasks/LiveTask.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LiveTask = function () {
    function LiveTask(url, config) {
        _classCallCheck(this, LiveTask);

        var _headers = new window.Headers();
        var _config = {
            headers: Object.assign({}, _headers),
            method: 'GET',
            cache: 'default',
            mode: 'cors'
        };
        this.request = new Request(url, Object.assign({}, _config, config));
    }

    _createClass(LiveTask, [{
        key: 'run',
        value: function run(callback) {

            function resolve(reader) {
                reader.read().then(function (result) {
                    callback(result.done ? undefined : result.value);
                    resolve(reader);
                });
            }
            fetch(this.request).then(function (res) {
                var reader = res.body.getReader();
                resolve(reader);
            });
        }
    }]);

    return LiveTask;
}();

exports.default = LiveTask;

/***/ }),

/***/ "./src/tasks/VodTask.js":
/*!******************************!*\
  !*** ./src/tasks/VodTask.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _XHRLoader = __webpack_require__(/*! ./loaders/XHRLoader */ "./src/tasks/loaders/XHRLoader.js");

var _XHRLoader2 = _interopRequireDefault(_XHRLoader);

var _FetchLoader = __webpack_require__(/*! ./loaders/FetchLoader */ "./src/tasks/loaders/FetchLoader.js");

var _FetchLoader2 = _interopRequireDefault(_FetchLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoadCls = function (window) {
  if (window.fetch) {
    return _FetchLoader2.default;
  }
  return _XHRLoader2.default;
}(window);

var VodTask = function () {
  function VodTask(url, range, headers) {
    _classCallCheck(this, VodTask);

    this.url = url;
    this.range = range;
    this.id = range.join('-');
    this.on = false;
    this.loader = new LoadCls(url, range, headers);
    this.isCanceled = false;
    VodTask.queue.push(this);
    VodTask.update();
  }

  _createClass(VodTask, [{
    key: 'cancel',
    value: function cancel() {
      this.isCanceled = true;
      this.loader.cancel();
    }
  }, {
    key: 'run',
    value: function run() {
      if (this.loader.readyState === 1) {
        this.on = true;
        this.loader.run();
      } else {
        VodTask.remove();
      }
    }
  }, {
    key: 'promise',
    get: function get() {
      return this.loader.promise;
    }
  }, {
    key: 'timeStamp',
    get: function get() {
      return this.loader.timeStamp;
    }
  }], [{
    key: 'remove',
    value: function remove(loader) {
      VodTask.queue.filter(function (item, idx) {
        if (item.url === loader.url && item.id === loader.id) {
          VodTask.queue.splice(idx, 1);
          return true;
        } else {
          return false;
        }
      });
      VodTask.update();
    }
  }, {
    key: 'update',
    value: function update() {
      var Queue = VodTask.queue;
      var sended = Queue.filter(function (item) {
        return item.on;
      });
      var wait = Queue.filter(function (item) {
        return !item.on;
      });
      var max = VodTask.limit - sended.length;
      wait.forEach(function (item, idx) {
        if (idx < max) {
          item.run();
        }
      });
    }
  }, {
    key: 'clear',
    value: function clear() {
      VodTask.queue.forEach(function (item) {
        if (!item.loader.complete) {
          item.cancel();
        }
      });
      VodTask.queue.length = 0;
    }
  }]);

  return VodTask;
}();

VodTask.queue = [];
VodTask.limit = 2;
window.VodTask = VodTask;

exports.default = VodTask;

/***/ }),

/***/ "./src/tasks/loaders/FetchLoader.js":
/*!******************************************!*\
  !*** ./src/tasks/loaders/FetchLoader.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _VodTask = __webpack_require__(/*! ../VodTask */ "./src/tasks/VodTask.js");

var _VodTask2 = _interopRequireDefault(_VodTask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FetchLoader = function () {
  function FetchLoader(url, range) {
    var _this = this;

    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, FetchLoader);

    this.url = url;
    this.on = false;
    this.complete = false;
    this.isStopped = false;
    this.timeStamp = Date.now();
    var _config = {
      headers: {
        Range: 'bytes=' + range[0] + '-' + range[1]
      },
      method: 'GET',
      cache: 'default',
      mode: 'cors'
    };

    this.request = function () {
      _this.on = true;
      return window.fetch(url, Object.assign({}, _config, config)).then(function (res) {
        if (res.status > 299 || res.status < 200 || !res.ok) {
          _this.complete = true;
          _VodTask2.default.remove(_this);
          return Promise.reject(new Error('url ' + res.status + ' ' + res.statusText));
        }
        return Promise.resolve(res);
      }).then(function (res) {
        return res.arrayBuffer();
      }).then(function (buffer) {
        _this.complete = true;
        _this.byteLength = buffer.byteLength;
        _VodTask2.default.remove(_this);
        if (_this.isStopped) return {};
        return {
          buffer: buffer,
          timeStamp: _this.timeStamp
        };
      });
    };
  }

  _createClass(FetchLoader, [{
    key: 'run',
    value: function run() {
      this._promise = this.request();
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      this.isStopped = true;
    }
  }, {
    key: 'readyState',
    get: function get() {
      return 1;
    }
  }, {
    key: 'promise',
    get: function get() {
      return this.on ? this._promise : this.request();
    }
  }]);

  return FetchLoader;
}();

exports.default = FetchLoader;

/***/ }),

/***/ "./src/tasks/loaders/XHRLoader.js":
/*!****************************************!*\
  !*** ./src/tasks/loaders/XHRLoader.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _VodTask = __webpack_require__(/*! ../VodTask */ "./src/tasks/VodTask.js");

var _VodTask2 = _interopRequireDefault(_VodTask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var XHRLoader = function () {
    function XHRLoader(url, range) {
        var _this = this;

        _classCallCheck(this, XHRLoader);

        this.url = url;
        var xhr = new XMLHttpRequest();
        xhr.open('get', url);
        xhr.responseType = 'arraybuffer';
        xhr.setRequestHeader('Range', 'bytes=' + range[0] + '-' + range[1]);
        xhr.onabort = function () {
            _VodTask2.default.remove(_this);
        };
        this._promise = new Promise(function (resolve, reject) {
            xhr.onload = function () {
                if (xhr.status === 200 || xhr.status === 206) {
                    resolve(xhr.response);
                }
                _VodTask2.default.remove(this);
            };
            xhr.onerror = function (e) {
                reject(e);
                _VodTask2.default.remove(_this);
            };
        });

        this._xhr = xhr;
    }

    _createClass(XHRLoader, [{
        key: 'run',
        value: function run() {
            this._xhr.send();
        }
    }, {
        key: 'cancel',
        value: function cancel() {
            this._xhr.abort();
        }
    }, {
        key: 'promise',
        get: function get() {
            return this._promise;
        }
    }, {
        key: 'readyState',
        get: function get() {
            return this._xhr.readyState;
        }
    }]);

    return XHRLoader;
}();

exports.default = XHRLoader;

/***/ }),

/***/ "./src/utils/DataView4Read.js":
/*!************************************!*\
  !*** ./src/utils/DataView4Read.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataView4Read = function () {
    function DataView4Read(buffer, context) {
        _classCallCheck(this, DataView4Read);

        this._dv = new DataView(buffer);
        this._context = context;
        this.initProxy();
    }

    _createClass(DataView4Read, [{
        key: 'initProxy',
        value: function initProxy() {
            var _this = this;

            var sizeArr = [8, 16, 32];
            var self = this;
            var _store = this._context._store;

            sizeArr.forEach(function (size) {
                _this['getUint' + size] = function (offset) {
                    if (!offset) {
                        offset = self._context.readOffset;
                    }
                    if (offset === self._context.readOffset) {
                        self._context.readOffset += size / 8;
                    }
                    return self._dv['getUint' + size](offset, !_store.isLe);
                };
            });

            /**
             * 显式声明一个比其它位数更常用读取24位整数方法
             * @param offset
             * @param isHigh
             */
            this.getUint24 = function (offset) {
                var result = this.getUint(24, offset, false); // 会读取Uint32,做 and 操作之后回退一位。
                self._context.readOffset -= 1;
                return result;
            };

            this.getUint = function (size, offset) {
                var isHigh = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

                if (size > 32) {
                    throw 'not supported read size';
                }
                var readSize = 32;
                if (!this['getUint' + size]) {
                    for (var i = 0, len = sizeArr.length; i < len; i++) {
                        if (size < sizeArr[i]) {
                            readSize = sizeArr[i];
                            break;
                        }
                    }

                    var numToAnd = isHigh ? DataView4Read.getAndNum(0, size - 1, readSize) : DataView4Read.getAndNum(readSize - size, readSize - 1, readSize);
                    return self['getUint' + readSize](offset, !_store.isLe) & numToAnd;
                } else {
                    return self['getUint' + readSize](offset, !_store.isLe);
                }
            };
        }
    }], [{
        key: 'getAndNum',
        value: function getAndNum(begin, end) {
            var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 8;

            var result = 0;
            var index = --size;
            while (index > 0) {
                if (index > end || index < begin) {
                    index--;
                    continue;
                } else {
                    result += Math.pow(2, size - index);
                    index--;
                }
            }

            return result;
        }
    }]);

    return DataView4Read;
}();

exports.default = DataView4Read;

/***/ }),

/***/ "./src/utils/ExpGolomb.js":
/*!********************************!*\
  !*** ./src/utils/ExpGolomb.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Log = __webpack_require__(/*! ./Log */ "./src/utils/Log.js");

var _Log2 = _interopRequireDefault(_Log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExpGolomb = function () {
    function ExpGolomb(data) {
        _classCallCheck(this, ExpGolomb);

        this.data = data;
        // the number of bytes left to examine in this.data
        this.bytesAvailable = data.byteLength;
        // the current word being examined
        this.word = 0; // :uint
        // the number of bits left to examine in the current word
        this.bitsAvailable = 0; // :uint
    }
    // ():void


    _createClass(ExpGolomb, [{
        key: 'loadWord',
        value: function loadWord() {
            var data = this.data,
                bytesAvailable = this.bytesAvailable,
                position = data.byteLength - bytesAvailable,
                workingBytes = new Uint8Array(4),
                availableBytes = Math.min(4, bytesAvailable);
            if (availableBytes === 0) {
                throw new Error('no bytes available');
            }
            workingBytes.set(data.subarray(position, position + availableBytes));
            this.word = new DataView(workingBytes.buffer).getUint32(0);
            // track the amount of this.data that has been processed
            this.bitsAvailable = availableBytes * 8;
            this.bytesAvailable -= availableBytes;
        }

        // (count:int):void

    }, {
        key: 'skipBits',
        value: function skipBits(count) {
            var skipBytes; // :int
            if (this.bitsAvailable > count) {
                this.word <<= count;
                this.bitsAvailable -= count;
            } else {
                count -= this.bitsAvailable;
                skipBytes = count >> 3;
                count -= skipBytes >> 3;
                this.bytesAvailable -= skipBytes;
                this.loadWord();
                this.word <<= count;
                this.bitsAvailable -= count;
            }
            return skipBytes;
        }

        // (size:int):uint

    }, {
        key: 'readBits',
        value: function readBits(size) {
            var bits = Math.min(this.bitsAvailable, size),
                // :uint
            valu = this.word >>> 32 - bits; // :uint
            if (size > 32) {
                _Log2.default.error('Cannot read more than 32 bits at a time');
            }
            this.bitsAvailable -= bits;
            if (this.bitsAvailable > 0) {
                this.word <<= bits;
            } else if (this.bytesAvailable > 0) {
                this.loadWord();
            }
            bits = size - bits;
            if (bits > 0 && this.bitsAvailable) {
                return valu << bits | this.readBits(bits);
            } else {
                return valu;
            }
        }

        // ():uint

    }, {
        key: 'skipLZ',
        value: function skipLZ() {
            var leadingZeroCount; // :uint
            for (leadingZeroCount = 0; leadingZeroCount < this.bitsAvailable; ++leadingZeroCount) {
                if (0 !== (this.word & 0x80000000 >>> leadingZeroCount)) {
                    // the first bit of working word is 1
                    this.word <<= leadingZeroCount;
                    this.bitsAvailable -= leadingZeroCount;
                    return leadingZeroCount;
                }
            }
            // we exhausted word and still have not found a 1
            this.loadWord();
            return leadingZeroCount + this.skipLZ();
        }

        // ():void

    }, {
        key: 'skipUEG',
        value: function skipUEG() {
            this.skipBits(1 + this.skipLZ());
        }

        // ():void

    }, {
        key: 'skipEG',
        value: function skipEG() {
            this.skipBits(1 + this.skipLZ());
        }

        // ():uint

    }, {
        key: 'readUEG',
        value: function readUEG() {
            var clz = this.skipLZ(); // :uint
            return this.readBits(clz + 1) - 1;
        }

        // ():int

    }, {
        key: 'readEG',
        value: function readEG() {
            var valu = this.readUEG(); // :int
            if (0x01 & valu) {
                // the number is odd if the low order bit is set
                return 1 + valu >>> 1; // add 1 to make it even, and divide by 2
            } else {
                return -1 * (valu >>> 1); // divide by two then make it negative
            }
        }

        // Some convenience functions
        // :Boolean

    }, {
        key: 'readBoolean',
        value: function readBoolean() {
            return 1 === this.readBits(1);
        }

        // ():int

    }, {
        key: 'readUByte',
        value: function readUByte() {
            return this.readBits(8);
        }

        // ():int

    }, {
        key: 'readUShort',
        value: function readUShort() {
            return this.readBits(16);
        }
        // ():int

    }, {
        key: 'readUInt',
        value: function readUInt() {
            return this.readBits(32);
        }

        /**
         * Advance the ExpGolomb decoder past a scaling list. The scaling
         * list is optionally transmitted as part of a sequence parameter
         * set and is not relevant to transmuxing.
         * @param count {number} the number of entries in this scaling list
         * @see Recommendation ITU-T H.264, Section 7.3.2.1.1.1
         */

    }, {
        key: 'skipScalingList',
        value: function skipScalingList(count) {
            var lastScale = 8,
                nextScale = 8,
                j,
                deltaScale;
            for (j = 0; j < count; j++) {
                if (nextScale !== 0) {
                    deltaScale = this.readEG();
                    nextScale = (lastScale + deltaScale + 256) % 256;
                }
                lastScale = nextScale === 0 ? lastScale : nextScale;
            }
        }

        /**
         * Read a sequence parameter set and return some interesting video
         * properties. A sequence parameter set is the H264 metadata that
         * describes the properties of upcoming video frames.
         * @param data {Uint8Array} the bytes of a sequence parameter set
         * @return {object} an object with configuration parsed from the
         * sequence parameter set, including the dimensions of the
         * associated video frames.
         */

    }, {
        key: 'readSPS',
        value: function readSPS() {
            var frameCropLeftOffset = 0,
                frameCropRightOffset = 0,
                frameCropTopOffset = 0,
                frameCropBottomOffset = 0,
                profileIdc,

            // profileCompat,
            levelIdc,
                codecWidth,
                codecHeight,
                presentWidth,
                numRefFramesInPicOrderCntCycle,
                picWidthInMbsMinus1,
                picHeightInMapUnitsMinus1,
                frameMbsOnlyFlag,
                scalingListCount,
                i,
                readUByte = this.readUByte.bind(this),
                readBits = this.readBits.bind(this),
                readUEG = this.readUEG.bind(this),
                readBoolean = this.readBoolean.bind(this),
                skipBits = this.skipBits.bind(this),
                skipEG = this.skipEG.bind(this),
                skipUEG = this.skipUEG.bind(this),
                skipScalingList = this.skipScalingList.bind(this);

            readUByte();
            profileIdc = readUByte(); // profile_idc
            readBits(5); // profileCompat constraint_set[0-4]_flag, u(5)
            skipBits(3); // reserved_zero_3bits u(3),
            levelIdc = readUByte(); // level_idc u(8)
            skipUEG(); // seq_parameter_set_id
            var chromaFormatIdc = 1;
            var chromaFormat = 420;
            var chromaFormats = [0, 420, 422, 444];
            var bitDepthLuma = 8;
            var profileIdcs = [100, 110, 122, 244, 44, 83, 86, 118, 128];
            // some profiles have more optional data we don't need
            if (profileIdcs.includes(profileIdc)) {
                chromaFormatIdc = readUEG();
                if (chromaFormatIdc === 3) {
                    skipBits(1); // separate_colour_plane_flag
                }
                if (chromaFormatIdc <= 3) {
                    chromaFormat = chromaFormats[chromaFormatIdc];
                }
                bitDepthLuma = readUEG() + 8; // bit_depth_luma_minus8
                skipUEG(); // bit_depth_chroma_minus8
                skipBits(1); // qpprime_y_zero_transform_bypass_flag
                if (readBoolean()) {
                    // seq_scaling_matrix_present_flag
                    scalingListCount = chromaFormatIdc !== 3 ? 8 : 12;
                    for (i = 0; i < scalingListCount; i++) {
                        if (readBoolean()) {
                            // seq_scaling_list_present_flag[ i ]
                            i < 6 ? skipScalingList(16) : skipScalingList(64);
                        }
                    }
                }
            }
            skipUEG(); // log2_max_frame_num_minus4
            var picOrderCntType = readUEG();
            if (picOrderCntType === 0) {
                readUEG(); // log2_max_pic_order_cnt_lsb_minus4
            } else if (picOrderCntType === 1) {
                skipBits(1); // delta_pic_order_always_zero_flag
                skipEG(); // offset_for_non_ref_pic
                skipEG(); // offset_for_top_to_bottom_field
                numRefFramesInPicOrderCntCycle = readUEG();
                for (i = 0; i < numRefFramesInPicOrderCntCycle; i++) {
                    skipEG(); // offset_for_ref_frame[ i ]
                }
            }
            var refFrames = readUEG(); // max_num_ref_frames
            skipBits(1); // gaps_in_frame_num_value_allowed_flag
            picWidthInMbsMinus1 = readUEG();
            picHeightInMapUnitsMinus1 = readUEG();
            frameMbsOnlyFlag = readBits(1);
            if (frameMbsOnlyFlag === 0) {
                skipBits(1); // mb_adaptive_frame_field_flag
            }
            skipBits(1); // direct_8x8_inference_flag
            if (readBoolean()) {
                // frame_cropping_flag
                frameCropLeftOffset = readUEG();
                frameCropRightOffset = readUEG();
                frameCropTopOffset = readUEG();
                frameCropBottomOffset = readUEG();
            }
            var frameRate = {
                fps: 0,
                fpsFixed: true,
                fpsNum: 0,
                fpsDen: 0
            };
            var pixelRatio = [1, 1];
            if (readBoolean()) {
                // vui_parameters_present_flag
                if (readBoolean()) {
                    // aspect_ratio_info_present_flag
                    var aspectRatioIdc = readUByte();
                    switch (aspectRatioIdc) {
                        case 1:
                            pixelRatio = [1, 1];
                            break;
                        case 2:
                            pixelRatio = [12, 11];
                            break;
                        case 3:
                            pixelRatio = [10, 11];
                            break;
                        case 4:
                            pixelRatio = [16, 11];
                            break;
                        case 5:
                            pixelRatio = [40, 33];
                            break;
                        case 6:
                            pixelRatio = [24, 11];
                            break;
                        case 7:
                            pixelRatio = [20, 11];
                            break;
                        case 8:
                            pixelRatio = [32, 11];
                            break;
                        case 9:
                            pixelRatio = [80, 33];
                            break;
                        case 10:
                            pixelRatio = [18, 11];
                            break;
                        case 11:
                            pixelRatio = [15, 11];
                            break;
                        case 12:
                            pixelRatio = [64, 33];
                            break;
                        case 13:
                            pixelRatio = [160, 99];
                            break;
                        case 14:
                            pixelRatio = [4, 3];
                            break;
                        case 15:
                            pixelRatio = [3, 2];
                            break;
                        case 16:
                            pixelRatio = [2, 1];
                            break;
                        case 255:
                            {
                                pixelRatio = [readUByte() << 8 | readUByte(), readUByte() << 8 | readUByte()];
                                break;
                            }
                    }
                }
                if (readBoolean()) {
                    // overscan_info_present_flag
                    readBoolean(); // overscan_appropriate_flag
                }
                if (readBoolean()) {
                    // video_signal_type_present_flag
                    readBits(4); // video_format & video_full_range_flag
                    if (readBoolean()) {
                        // colour_description_present_flag
                        readBits(24); // colour_primaries & transfer_characteristics & matrix_coefficients
                    }
                }
                if (readBoolean()) {
                    // chroma_loc_info_present_flag
                    readUEG(); // chroma_sample_loc_type_top_field
                    readUEG(); // chroma_sample_loc_type_bottom_field
                }

                if (readBoolean()) {
                    // timing_info_present_flag
                    var numUnitInTick = readBits(32);
                    frameRate.fpsNum = readBits(32);
                    frameRate.fixed = this.readBoolean();
                    frameRate.fpsDen = numUnitInTick * 2;
                    frameRate.fps = frameRate.fpsNum / frameRate.fpsDen;
                }
                var cropUnitX = 0,
                    cropUnitY = 0;
                if (chromaFormatIdc === 0) {
                    cropUnitX = 1;
                    cropUnitX = 2 - frameMbsOnlyFlag;
                } else {
                    var subWc = chromaFormatIdc === 3 ? 1 : 2;
                    var subHc = chromaFormatIdc === 1 ? 2 : 1;
                    cropUnitX = subWc;
                    cropUnitY = subHc * (2 - frameMbsOnlyFlag);
                }

                codecWidth = (picWidthInMbsMinus1 + 1) * 16;
                codecHeight = (2 - frameMbsOnlyFlag) * ((picHeightInMapUnitsMinus1 + 1) * 16);

                codecWidth -= (frameCropLeftOffset + frameCropRightOffset) * cropUnitX;
                codecHeight -= (frameCropTopOffset + frameCropBottomOffset) * cropUnitY;

                var pixelScale = pixelRatio[0] === 1 || pixelRatio[1] === 1 ? 1 : pixelRatio[0] / pixelRatio[1];

                presentWidth = pixelScale * codecWidth;
            }
            return {
                profileIdc: profileIdc,
                levelIdc: levelIdc,
                refFrames: refFrames,
                chromaFormat: chromaFormat,
                bitDepth: bitDepthLuma,
                frameRate: frameRate,
                codecSize: {
                    width: codecWidth,
                    height: codecHeight
                },
                presentSize: {
                    width: presentWidth,
                    height: codecHeight
                },
                width: Math.ceil((picWidthInMbsMinus1 + 1) * 16 - frameCropLeftOffset * 2 - frameCropRightOffset * 2),
                height: (2 - frameMbsOnlyFlag) * (picHeightInMapUnitsMinus1 + 1) * 16 - (frameMbsOnlyFlag ? 2 : 4) * (frameCropTopOffset + frameCropBottomOffset),
                pixelRatio: pixelRatio
            };
        }
    }, {
        key: 'readSliceType',
        value: function readSliceType() {
            // skip NALu type
            this.readUByte();
            // discard first_mb_in_slice
            this.readUEG();
            // return slice_type
            return this.readUEG();
        }
    }]);

    return ExpGolomb;
}();

exports.default = ExpGolomb;

/***/ }),

/***/ "./src/utils/Log.js":
/*!**************************!*\
  !*** ./src/utils/Log.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Logger = function () {
    function Logger() {
        _classCallCheck(this, Logger);
    }

    _createClass(Logger, null, [{
        key: "log",
        value: function log() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            window.console.log.apply(window, args);
        }
    }, {
        key: "info",
        value: function info() {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            window.console.info.apply(window, args);
        }
    }, {
        key: "error",
        value: function error() {
            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
            }

            window.console.error.apply(window, args);
        }
    }, {
        key: "warn",
        value: function warn() {
            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4];
            }

            window.console.warn.apply(window, args);
        }
    }]);

    return Logger;
}();

exports.default = Logger;

/***/ }),

/***/ "./src/utils/Observer.js":
/*!*******************************!*\
  !*** ./src/utils/Observer.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author fuyuhao
 */

var nativeSlice = Array.prototype.slice;

var Observer = function () {
  function Observer() {
    _classCallCheck(this, Observer);

    this.fnId = 1;
    this._listenerIdMap = {};
    this._listeners = {};
  }

  _createClass(Observer, [{
    key: "on",
    value: function on(key, fn) {
      var fnId = this.fnId++;
      var listeners = this._getListenersByKey(key);
      this._listenerIdMap[fnId] = fn;
      if (listeners) {
        listeners.unshift(fnId);
        return fnId;
      }
      this._listeners[key] = [fnId];
      return fnId;
    }
  }, {
    key: "emit",
    value: function emit(key) {
      var args = nativeSlice.call(arguments, 1);
      var listeners = this._getListenersByKey(key) || [];
      for (var i = 0, len = listeners.length; i < len; i++) {
        var fn = this._getListenerById(listeners[i]);
        fn && fn.apply(null, args);
      }
    }
  }, {
    key: "once",
    value: function once(key, fn) {
      var fnId = this.fnId++;
      var listeners = this._getListenersByKey(key);
      var _this = this;

      function onceFunc() {
        var args = nativeSlice.call(arguments);
        fn.apply(null, args);
        _this.off(key, fnId);
      }
      this._listenerIdMap[fnId] = onceFunc;
      if (listeners) {
        listeners.unshift(fnId);
        return fnId;
      }
      this._listeners[key] = [fnId];
      return fnId;
    }
  }, {
    key: "off",
    value: function off(key, fnId) {
      var listeners = this._getListenersByKey(key);
      var fn = this._getListenerById(fnId);
      if (!fn || !listeners || listeners.indexOf(fnId) < 0) {
        return;
      }
      delete this._listenerIdMap[fnId];
      if (listeners.length === 1) {
        delete this._listeners[key];
      } else {
        listeners[listeners.indexOf(fnId)] = undefined;
      }
    }
  }, {
    key: "_getListenersByKey",
    value: function _getListenersByKey(key) {
      return this._listeners[key];
    }
  }, {
    key: "_getListenerById",
    value: function _getListenerById(fnId) {
      return this._listenerIdMap[fnId];
    }
  }, {
    key: "flush",
    value: function flush(key) {
      var _this2 = this;

      var listeners = this._getListenersByKey(key);
      if (listeners) {
        listeners.forEach(function (fnId) {
          delete _this2._listenerIdMap[fnId];
        });
        delete this._listeners[key];
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._listeners = null;
      this._listenerIdMap = null;
    }
  }]);

  return Observer;
}();

exports.default = new Observer();

/***/ }),

/***/ "./src/utils/UTF8.js":
/*!***************************!*\
  !*** ./src/utils/UTF8.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable */
var UTF8 = function () {
    function UTF8() {
        _classCallCheck(this, UTF8);
    }

    _createClass(UTF8, null, [{
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
                } else if (input[i] < 0xC0) {
                    // fallthrough
                } else if (input[i] < 0xE0) {
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
                    if ((array[++start] & 0xC0) !== 0x80) return false;
                }
                return true;
            } else {
                return false;
            }
        }
    }]);

    return UTF8;
}();

exports.default = UTF8;

/***/ }),

/***/ "./src/utils/funcUtils.js":
/*!********************************!*\
  !*** ./src/utils/funcUtils.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.debounce = debounce;
function debounce(func, wait, immediate) {
    var timeout, result;

    var debounced = function debounced(args) {
        if (timeout) {
            clearTimeout(timeout);
        }
        if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(func, wait);
            if (callNow) {
                result = func();
            }
        } else {
            timeout = setTimeout(func, wait);
        }

        return result;
    };

    debounced.cancel = function () {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
}

var cacheWrapper = exports.cacheWrapper = function cacheWrapper(fn) {

    var cache = {};
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var key = args.reduce(function (pre, cur) {
            return pre + '_' + cur;
        }, '');
        var result = fn.apply(undefined, args);
        if (cache[key] !== undefined) {
            return cache[key];
        } else {
            cache[key] = result;
            return result;
        }
    };
};

/***/ }),

/***/ "./src/utils/sniffer.js":
/*!******************************!*\
  !*** ./src/utils/sniffer.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
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
        var ua = navigator.userAgent,
            isWindowsPhone = /(?:Windows Phone)/.test(ua),
            isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
            isAndroid = /(?:Android)/.test(ua),
            isFireFox = /(?:Firefox)/.test(ua),
            isTablet = /(?:iPad|PlayBook)/.test(ua) || isAndroid && !/(?:Mobile)/.test(ua) || isFireFox && /(?:Tablet)/.test(ua),
            isPhone = /(?:iPhone)/.test(ua) && !isTablet,
            isPc = !isPhone && !isAndroid && !isSymbian;
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

exports.default = sniffer;

/***/ }),

/***/ "./src/write/Buffer.js":
/*!*****************************!*\
  !*** ./src/write/Buffer.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _concatTypedArray = __webpack_require__(/*! concat-typed-array */ "./node_modules/concat-typed-array/lib/index.js");

var _concatTypedArray2 = _interopRequireDefault(_concatTypedArray);

var _Log = __webpack_require__(/*! ../utils/Log */ "./src/utils/Log.js");

var _Log2 = _interopRequireDefault(_Log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = function () {
    function Buffer(buffer) {
        _classCallCheck(this, Buffer);

        this.buffer = buffer || new Uint8Array(0);
    }

    _createClass(Buffer, [{
        key: 'write',
        value: function write() {
            var _this = this;

            for (var _len = arguments.length, buffer = Array(_len), _key = 0; _key < _len; _key++) {
                buffer[_key] = arguments[_key];
            }

            buffer.forEach(function (item) {
                if (item) {
                    _this.buffer = (0, _concatTypedArray2.default)(Uint8Array, _this.buffer, item);
                } else {
                    _Log2.default.error(item);
                }
            });
        }
    }], [{
        key: 'writeUint32',
        value: function writeUint32(value) {
            return new Uint8Array([value >> 24, value >> 16 & 0xff, value >> 8 & 0xff, value & 0xff]);
        }
    }, {
        key: 'readAsInt',
        value: function readAsInt(arr) {
            var temp = '';
            function padStart4Hex(hexNum) {
                var hexStr = hexNum.toString(16);
                return hexStr.padStart(2, '0');
            }
            arr.forEach(function (num) {
                temp += padStart4Hex(num);
            });
            return parseInt(temp, 16);
        }
    }]);

    return Buffer;
}();

exports.default = Buffer;

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/index.js */"./src/index.js");


/***/ }),

/***/ "xgplayer":
/*!***************************!*\
  !*** external "xgplayer" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_xgplayer__;

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly94Z3BsYXllci1mbHYvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3hncGxheWVyLWZsdi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly94Z3BsYXllci1mbHYvLi9ub2RlX21vZHVsZXMvY29uY2F0LXR5cGVkLWFycmF5L2xpYi9jb25jYXQuanMiLCJ3ZWJwYWNrOi8veGdwbGF5ZXItZmx2Ly4vbm9kZV9tb2R1bGVzL2NvbmNhdC10eXBlZC1hcnJheS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8veGdwbGF5ZXItZmx2Ly4vbm9kZV9tb2R1bGVzL2QvaW5kZXguanMiLCJ3ZWJwYWNrOi8veGdwbGF5ZXItZmx2Ly4vbm9kZV9tb2R1bGVzL2VzNS1leHQvZnVuY3Rpb24vbm9vcC5qcyIsIndlYnBhY2s6Ly94Z3BsYXllci1mbHYvLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvYXNzaWduL2luZGV4LmpzIiwid2VicGFjazovL3hncGxheWVyLWZsdi8uL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9hc3NpZ24vaXMtaW1wbGVtZW50ZWQuanMiLCJ3ZWJwYWNrOi8veGdwbGF5ZXItZmx2Ly4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2Fzc2lnbi9zaGltLmpzIiwid2VicGFjazovL3hncGxheWVyLWZsdi8uL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9pcy1jYWxsYWJsZS5qcyIsIndlYnBhY2s6Ly94Z3BsYXllci1mbHYvLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvaXMtdmFsdWUuanMiLCJ3ZWJwYWNrOi8veGdwbGF5ZXItZmx2Ly4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2tleXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8veGdwbGF5ZXItZmx2Ly4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2tleXMvaXMtaW1wbGVtZW50ZWQuanMiLCJ3ZWJwYWNrOi8veGdwbGF5ZXItZmx2Ly4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2tleXMvc2hpbS5qcyIsIndlYnBhY2s6Ly94Z3BsYXllci1mbHYvLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3Qvbm9ybWFsaXplLW9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8veGdwbGF5ZXItZmx2Ly4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L3ZhbGlkLWNhbGxhYmxlLmpzIiwid2VicGFjazovL3hncGxheWVyLWZsdi8uL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC92YWxpZC12YWx1ZS5qcyIsIndlYnBhY2s6Ly94Z3BsYXllci1mbHYvLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucy9pbmRleC5qcyIsIndlYnBhY2s6Ly94Z3BsYXllci1mbHYvLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucy9pcy1pbXBsZW1lbnRlZC5qcyIsIndlYnBhY2s6Ly94Z3BsYXllci1mbHYvLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucy9zaGltLmpzIiwid2VicGFjazovL3hncGxheWVyLWZsdi8uL25vZGVfbW9kdWxlcy9ldmVudC1lbWl0dGVyL2luZGV4LmpzIiwid2VicGFjazovL3hncGxheWVyLWZsdi8uL3NyYy9GbHYuanMiLCJ3ZWJwYWNrOi8veGdwbGF5ZXItZmx2Ly4vc3JjL2NvbnN0YW50cy9jb25maWcuanMiLCJ3ZWJwYWNrOi8veGdwbGF5ZXItZmx2Ly4vc3JjL2NvbnN0YW50cy9tZXRhRmllbGRzLmpzIiwid2VicGFjazovL3hncGxheWVyLWZsdi8uL3NyYy9jb25zdGFudHMvdHlwZXMuanMiLCJ3ZWJwYWNrOi8veGdwbGF5ZXItZmx2Ly4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3hncGxheWVyLWZsdi8uL3NyYy9tb2RlbHMvTWVkaWFJbmZvLmpzIiwid2VicGFjazovL3hncGxheWVyLWZsdi8uL3NyYy9tb2RlbHMvTWVkaWFTYW1wbGUuanMiLCJ3ZWJwYWNrOi8veGdwbGF5ZXItZmx2Ly4vc3JjL21vZGVscy9NZWRpYVNlZ21lbnQuanMiLCJ3ZWJwYWNrOi8veGdwbGF5ZXItZmx2Ly4vc3JjL21vZGVscy9NZWRpYVNlZ21lbnRMaXN0LmpzIiwid2VicGFjazovL3hncGxheWVyLWZsdi8uL3NyYy9tb2RlbHMvU3RvcmUuanMiLCJ3ZWJwYWNrOi8veGdwbGF5ZXItZmx2Ly4vc3JjL21vZGVscy9UYWcuanMiLCJ3ZWJwYWNrOi8veGdwbGF5ZXItZmx2Ly4vc3JjL21vZGVscy9lcnJvci5qcyIsIndlYnBhY2s6Ly94Z3BsYXllci1mbHYvLi9zcmMvcGFyc2UvRmx2UGFyc2VyLmpzIiwid2VicGFjazovL3hncGxheWVyLWZsdi8uL3NyYy9wYXJzZS9NU0UuanMiLCJ3ZWJwYWNrOi8veGdwbGF5ZXItZmx2Ly4vc3JjL3BhcnNlL01haW5QYXJzZXIuanMiLCJ3ZWJwYWNrOi8veGdwbGF5ZXItZmx2Ly4vc3JjL3BhcnNlL1NQU1BhcnNlci5qcyIsIndlYnBhY2s6Ly94Z3BsYXllci1mbHYvLi9zcmMvcGFyc2UvVHJhbnNDb2Rlci5qcyIsIndlYnBhY2s6Ly94Z3BsYXllci1mbHYvLi9zcmMvcGFyc2UvZGVtdXgvQXVkaW9EZW11eGVyLmpzIiwid2VicGFjazovL3hncGxheWVyLWZsdi8uL3NyYy9wYXJzZS9kZW11eC9EZW11eGVyLmpzIiwid2VicGFjazovL3hncGxheWVyLWZsdi8uL3NyYy9wYXJzZS9kZW11eC9NZXRhRGVtdXhlci5qcyIsIndlYnBhY2s6Ly94Z3BsYXllci1mbHYvLi9zcmMvcGFyc2UvZGVtdXgvVGFnRGVtdXhlci5qcyIsIndlYnBhY2s6Ly94Z3BsYXllci1mbHYvLi9zcmMvcGFyc2UvZGVtdXgvVmlkZW9EZW11eGVyLmpzIiwid2VicGFjazovL3hncGxheWVyLWZsdi8uL3NyYy9wYXJzZS9yZW11eC9GbXA0LmpzIiwid2VicGFjazovL3hncGxheWVyLWZsdi8uL3NyYy9wYXJzZS9yZW11eC9NcDRyZW11eC5qcyIsIndlYnBhY2s6Ly94Z3BsYXllci1mbHYvLi9zcmMvcGFyc2UvcmVtdXgvUmVtdXhlci5qcyIsIndlYnBhY2s6Ly94Z3BsYXllci1mbHYvLi9zcmMvdGFza3MvTGl2ZVRhc2suanMiLCJ3ZWJwYWNrOi8veGdwbGF5ZXItZmx2Ly4vc3JjL3Rhc2tzL1ZvZFRhc2suanMiLCJ3ZWJwYWNrOi8veGdwbGF5ZXItZmx2Ly4vc3JjL3Rhc2tzL2xvYWRlcnMvRmV0Y2hMb2FkZXIuanMiLCJ3ZWJwYWNrOi8veGdwbGF5ZXItZmx2Ly4vc3JjL3Rhc2tzL2xvYWRlcnMvWEhSTG9hZGVyLmpzIiwid2VicGFjazovL3hncGxheWVyLWZsdi8uL3NyYy91dGlscy9EYXRhVmlldzRSZWFkLmpzIiwid2VicGFjazovL3hncGxheWVyLWZsdi8uL3NyYy91dGlscy9FeHBHb2xvbWIuanMiLCJ3ZWJwYWNrOi8veGdwbGF5ZXItZmx2Ly4vc3JjL3V0aWxzL0xvZy5qcyIsIndlYnBhY2s6Ly94Z3BsYXllci1mbHYvLi9zcmMvdXRpbHMvT2JzZXJ2ZXIuanMiLCJ3ZWJwYWNrOi8veGdwbGF5ZXItZmx2Ly4vc3JjL3V0aWxzL1VURjguanMiLCJ3ZWJwYWNrOi8veGdwbGF5ZXItZmx2Ly4vc3JjL3V0aWxzL2Z1bmNVdGlscy5qcyIsIndlYnBhY2s6Ly94Z3BsYXllci1mbHYvLi9zcmMvdXRpbHMvc25pZmZlci5qcyIsIndlYnBhY2s6Ly94Z3BsYXllci1mbHYvLi9zcmMvd3JpdGUvQnVmZmVyLmpzIiwid2VicGFjazovL3hncGxheWVyLWZsdi9leHRlcm5hbCBcInhncGxheWVyXCIiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJkZWZhdWx0IiwiUmVzdWx0Q29uc3RydWN0b3IiLCJ0b3RhbExlbmd0aCIsIl9sZW4iLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJhcnJheXMiLCJBcnJheSIsIl9rZXkiLCJfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uIiwiX2RpZEl0ZXJhdG9yRXJyb3IiLCJfaXRlcmF0b3JFcnJvciIsInVuZGVmaW5lZCIsIl9pdGVyYXRvciIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiX3N0ZXAiLCJuZXh0IiwiZG9uZSIsImFyciIsImVyciIsInJldHVybiIsInJlc3VsdCIsIm9mZnNldCIsIl9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yIiwiX2RpZEl0ZXJhdG9yRXJyb3IyIiwiX2l0ZXJhdG9yRXJyb3IyIiwiX2l0ZXJhdG9yMiIsIl9zdGVwMiIsIl9hcnIiLCJzZXQiLCJfY29uY2F0IiwicmVxdWlyZSIsIl9jb25jYXQyIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIm9iaiIsIl9fZXNNb2R1bGUiLCJtb2R1bGUiLCJhc3NpZ24iLCJub3JtYWxpemVPcHRzIiwiaXNDYWxsYWJsZSIsImNvbnRhaW5zIiwiZCIsImRzY3IiLCJjIiwiZSIsInciLCJvcHRpb25zIiwiZGVzYyIsImNhbGwiLCJjb25maWd1cmFibGUiLCJlbnVtZXJhYmxlIiwid3JpdGFibGUiLCJncyIsImdldCIsImZvbyIsImJhciIsInRyenkiLCJrZXlzIiwibWF4IiwiTWF0aCIsImRlc3QiLCJzcmMiLCJlcnJvciIsImkiLCJrZXkiLCJmb3JFYWNoIiwiX3VuZGVmaW5lZCIsInZhbCIsImlzVmFsdWUiLCJvYmplY3QiLCJwcm90b3R5cGUiLCJjcmVhdGUiLCJwcm9jZXNzIiwib3B0czEiLCJmbiIsIlR5cGVFcnJvciIsIlN0cmluZyIsInN0ciIsImluZGV4T2YiLCJzZWFyY2hTdHJpbmciLCJjYWxsYWJsZSIsImFwcGx5IiwiRnVuY3Rpb24iLCJkZWZpbmVQcm9wZXJ0aWVzIiwiaGFzT3duUHJvcGVydHkiLCJkZXNjcmlwdG9yIiwib24iLCJvbmNlIiwib2ZmIiwiZW1pdCIsIm1ldGhvZHMiLCJkZXNjcmlwdG9ycyIsImJhc2UiLCJ0eXBlIiwibGlzdGVuZXIiLCJkYXRhIiwiX19lZV9fIiwicHVzaCIsInNlbGYiLCJfX2VlT25jZUxpc3RlbmVyX18iLCJsaXN0ZW5lcnMiLCJjYW5kaWRhdGUiLCJzcGxpY2UiLCJsIiwiYXJncyIsInNsaWNlIiwibyIsIkZsdiIsInBsYXllciIsIl9wbGF5ZXIiLCJfb3B0aW9ucyIsImZsdlBsYXllciIsIk1haW5QYXJzZXIiLCJtc2UiLCJNU0UiLCJpc1NlZWtpbmciLCJpc0RhdGFMb2FkaW5nIiwidGVtcEN1cnJlbnRUaW1lIiwidGVtcEZsdlBsYXllciIsImlzQ2hhbmdpbmdTcmMiLCJpbml0UGxheWVyRXZlbnRzIiwiaW5pdEZsdlBsYXllckV2ZW50cyIsImluaXRNc2VFdmVudHMiLCJzdGFydExvYWREYXRhIiwiaGFuZGxlU2Vla2luZyIsImJ1ZmZlcmVkIiwiY3VycmVudFRpbWUiLCJpc0J1ZmZlcmVkIiwibGVuIiwic3RhcnQiLCJlbmQiLCJWb2RUYXNrIiwiY2xlYXIiLCJpc1NlZWthYmxlIiwic2VlayIsImlzTGl2ZSIsImhhbmRsZVRpbWVVcGRhdGUiLCJpc01lZGlhSW5mb1JlYWR5IiwicHJvZ3Jlc3NDaGVja2VyIiwiaXNFbmRlZCIsIl9yZXBsYXkiLCJkZXN0cm95IiwiX21zZSIsInJlcGxheSIsImlzU291cmNlT3BlbiIsImFwcGVuZEJ1ZmZlciIsImZ0eXBfbW9vdiIsImJ1ZmZlciIsInNldFRpbWVvdXQiLCJwbGF5IiwicGVuZGluZ0ZyYWdtZW50cyIsImhhc1BlbmRpbmdGcmFnbWVudHMiLCJmcmFnbWVudCIsInNoaWZ0IiwidW5zaGlmdCIsInZpZGVvIiwidXJsIiwic3dpdGNoVVJMIiwiY29uZmlnIiwiaXNUZW1wUGxheWVyIiwiaGFuZGxlTWVkaWFGcmFnbWVudCIsInVuYmluZEZsdlBsYXllckV2ZW50cyIsImhhbmRsZVNlZWtFbmQiLCJoYW5kbGVFcnJvciIsImhhbmRsZUZ0eXBNb292IiwiZnR5cE1vb3YiLCJvblNvdXJjZU9wZW4iLCJsb2FkU2VnbWVudHMiLCJwcmVsb2FkVGltZSIsIm1pbkNhY2hlZFRpbWUiLCJyYW5nZSIsImdldEJ1ZmZlcmVkUmFuZ2UiLCJ2aWRlb0R1cmF0aW9uIiwidmlkZW9UaW1lU2NhbGUiLCJ0aGVuIiwiZmx2IiwiZW5kT2ZTdHJlYW0iLCJwYXVzZSIsImdldERlZmF1bHRDb25mIiwiYXV0b0NsZWFuU291cmNlQnVmZmVyIiwiYXV0b0NsZWFuTWF4QmFja1RpbWUiLCJjb3JzIiwiZmllbGRzIiwibmFtZSIsIkJvb2xlYW4iLCJwYXJzZXIiLCJ0YXJnZXQiLCJvcmlnaW4iLCJtZWRpYUluZm8iLCJkdXJhdGlvbiIsImhhc0F1ZGlvIiwiaGFzVmlkZW8iLCJOdW1iZXIiLCJhdWRpb0RhdGFSYXRlIiwiYXVkaW9kYXRhcmF0ZSIsInZpZGVvRGF0YVJhdGUiLCJ2aWRlb2RhdGFyYXRlIiwid2lkdGgiLCJoZWlnaHQiLCJzdGF0ZSIsImZsb29yIiwidGltZVNjYWxlIiwib25UeXBlRXJyIiwiZnBzTnVtIiwiZnJhbWVyYXRlIiwiZnBzIiwicmVmZXJGcmFtZVJhdGUiLCJmaXhlZCIsImZwc0RlbiIsImtleWZyYW1lcyIsImhhc0tleWZyYW1lcyIsIl9wYXJzZUtleWZyYW1lcyIsIk1ldGFUeXBlcyIsIk5VTUJFUiIsIkJPT0xFQU4iLCJTVFJJTkciLCJPQkpFQ1QiLCJNSVhfQVJSQVkiLCJPQkpFQ1RfRU5EIiwiU1RSSUNUX0FSUkFZIiwiREFURSIsIkxPTkVfU1RSSU5HIiwiRXZlbnRUeXBlcyIsIkRBVEFfUkVBRFkiLCJNRVRBX0RBVEFfUkVBRFkiLCJUUkFDS19NRVRBX1JFQURZIiwiTUVESUFfSU5GT19SRUFEWSIsIk1FVEFfRU5EX1BPU0lUSU9OIiwiRVJST1IiLCJzb3VuZFJhdGVUeXBlcyIsIkF1ZGlvT2JqZWN0VHlwZXMiLCJzYW1wbGluZ0ZyZXF1ZW5jeVR5cGVzIiwiYnJvd3NlclR5cGVzIiwiSUUiLCJGSVJFX0ZPWCIsIkNIUk9NRSIsIk9QRVJBIiwiU0FGQVJJIiwibXAzVmVyc2lvbnMiLCJWMjUiLCJSRVNFUlZFRCIsIlYyMCIsIlYxMCIsImF1ZGlvU2FtcGxlUmF0ZSIsIm1wM0JpdFJhdGUiLCJMYXllcjEiLCJMYXllcjIiLCJMYXllcjMiLCJGbHZQbGF5ZXIiLCJfX2Zsdl9fIiwiaW5pdCIsInN0YXJ0c1dpdGgiLCJsb2FkIiwiYXV0b3BsYXkiLCJjcmVhdGVJbnN0YW5jZSIsIlBsYXllciIsInV0aWwiLCJhZGRDbGFzcyIsInJvb3QiLCJsaXZlIiwiY3JlYXRlRG9tIiwiY29udHJvbHMiLCJhcHBlbmRDaGlsZCIsImluaXRlZCIsIk1lZGlhSW5mbyIsIl9kZWZhdWx0IiwibWltZVR5cGUiLCJjb2RlYyIsImF1ZGlvQ29kZWMiLCJ2aWRlb0NvZGVjIiwiYXVkaW9DaGFubmVsQ291bnQiLCJhdWRpb0NvbmZpZyIsInByb2ZpbGUiLCJsZXZlbCIsImNocm9tYUZvcm1hdCIsInBpeGVsUmF0aW8iLCJfbWV0YURhdGEiLCJzZWdtZW50cyIsImluaXREYXRhIiwiZW50cmllcyIsImsiLCJ2IiwiaXNWaWRlb0luZm9GaWxsZWQiLCJpc0F1ZGlvSW5mb0ZpbGxlZCIsIm5vdE51bGxGaWVsZHMiLCJNZWRpYVNhbXBsZSIsImluZm8iLCJnZXREZWZhdWx0SW5mIiwidG9TdHJpbmciLCJzYW1wbGUiLCJkdHMiLCJwdHMiLCJwb3NpdGlvbiIsImlzUkFQIiwib3JpZ2luRHRzIiwiTWVkaWFTZWdtZW50Iiwic3RhcnREdHMiLCJlbmREdHMiLCJzdGFydFB0cyIsImVuZFB0cyIsIm9yaWdpblN0YXJ0RHRzIiwib3JpZ2luRW5kRHRzIiwicmFuZG9tQWNjZXNzUG9pbnRzIiwiZmlyc3RTYW1wbGUiLCJsYXN0U2FtcGxlIiwiTWVkaWFTZWdtZW50TGlzdCIsIl90eXBlIiwiX2xpc3QiLCJfbGFzdEFwcGVuZExvY2F0aW9uIiwiYmVnaW5EdHMiLCJsaXN0IiwibGFzdCIsIm1pZCIsImxib3VuZCIsInVib3VuZCIsImlkeCIsIl9zZWFyY2hOZWFyZXN0U2VnbWVudEJlZm9yZSIsInNlZ21lbnQiLCJsYXN0QXBwZW5kSWR4IiwiaW5zZXJ0SWR4IiwiZ2V0TGFzdFNlZ21lbnRCZWZvcmUiLCJzZWdtZW50SWR4IiwiU3RvcmUiLCJpc0xlIiwic25pZmZlciIsIl9oYXNBdWRpbyIsIl9oYXNWaWRlbyIsIl9tZWRpYUluZm8iLCJfdmlkZW9UcmFjayIsImlkIiwic2FtcGxlcyIsIl9hdWRpb1RyYWNrIiwiX3ZpZGVvTWV0YURhdGEiLCJfYXVkaW9NZXRhRGF0YSIsIl9hdWRpb0luaXRpYWxNZXRhZGF0YURpc3BhdGNoZWQiLCJfdmlkZW9Jbml0aWFsTWV0YWRhdGFEaXNwYXRjaGVkIiwidGFncyIsInRpbWVTdGFtcEJhc2UiLCJoYXNWaWRlb0ZsYWdPdmVycmlkZWQiLCJoYXNBdWRpb0ZsYWdPdmVycmlkZWQiLCJkdXJhdGlvbk92ZXJyaWRlZCIsIm5hbHVMZW5ndGhTaXplIiwiX3JlZmVyRnJhbWVSYXRlIiwibWV0YUVuZFBvc2l0aW9uIiwiX2lzSW5pdGlhbE1ldGFkYXRhRGlzcGF0Y2hlZCIsImJpbmQiLCJwb3MiLCJGbHZUYWciLCJ0YWdUeXBlIiwiYm9keVNpemUiLCJ0YWdTaXplIiwiVGltZXN0YW1wIiwiU3RyZWFtSUQiLCJib2R5IiwidGltZSIsInBvcCIsImpvaW4iLCJwYXJzZUludCIsIkVycm9yVHlwZXMiLCJuZXR3b3JrIiwiY29kZSIsIm1zZyIsInJlbWFyayIsInBhcnNlIiwiZm9ybWF0IiwiZGVjb2RlciIsInJ1bnRpbWUiLCJ0aW1lb3V0Iiwib3RoZXIiLCJFcnJvcnMiLCJuZXR3b3JrU3RhdGUiLCJyZWFkeVN0YXRlIiwiY3VycmVudFNyYyIsImVuZGVkIiwiZXJyZCIsImxpbmUiLCJoYW5kbGUiLCJ2ZXJzaW9uIiwiciIsInBsYXllclZlcnNpb24iLCJlcnJvclR5cGUiLCJkb21haW4iLCJkb2N1bWVudCIsImV4IiwiRmx2UGFyc2VyIiwic3RvcmUiLCJDTEFTU19OQU1FIiwiY29uc3RydWN0b3IiLCJ0ZW1wX3U4YSIsImRhdGFMZW4iLCJzdG9wIiwiaW5kZXgiLCJmaWxlUG9zaXRpb24iLCJmaXJzdEZsYWciLCJmbHZVOGEiLCJ0ZW1wVThhIiwicGFyc2VEYXRhIiwiaXNGbHZIZWFkIiwicGFyc2VIZWFkIiwicmVhZERhdGEiLCJ1OGFMZW5ndGgiLCJ0YWciLCJUYWciLCJ1bnJlYWRMZW5ndGgiLCJTdHJhbUlkIiwiZ2V0Qm9keVNpemUiLCJfc3RvcmUiLCJzaXplQXJyIiwiQnVmZmVyIiwicmVhZEFzSW50IiwibWF0Y2giLCJmbGFnIiwiX2luZGV4IiwiZmlyc3RUaHJlZUNoYXJzIiwiZnJvbUNoYXJDb2RlIiwiRGVtdXhlciIsImNvdW50IiwiY29kZWNzIiwibWVkaWFTb3VyY2UiLCJ3aW5kb3ciLCJNZWRpYVNvdXJjZSIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsImhhbmRsZVNvdXJjZU9wZW4iLCJhZGRFdmVudExpc3RlbmVyIiwic291cmNlQnVmZmVyIiwiYWRkU291cmNlQnVmZmVyIiwidXBkYXRpbmciLCJFcnJvciIsInJlbW92ZSIsImlzVHlwZVN1cHBvcnRlZCIsIk5PT1AiLCJfY29uZmlnIiwiX3RlbXBCYXNlVGltZSIsImZsdlBhcnNlciIsInRhZ0RlbXV4ZXIiLCJUYWdEZW11eGVyIiwibXA0cmVtdXhlciIsIk1wNFJlbXV4ZXIiLCJidWZmZXJLZXlmcmFtZXMiLCJTZXQiLCJNRVRBX0NIVU5LX1NJWkUiLCJwb3ciLCJDSFVOS19TSVpFIiwiX2lzTmV3U2VnbWVudHNBcnJpdmFsIiwibG9hZFRhc2siLCJfcGVuZGluZ0ZyYWdtZW50cyIsIl9wZW5kaW5nUmVtb3ZlUmFuZ2UiLCJlcnJfY250IiwicmVxdWVzdENvbmZpZyIsIm1vZGUiLCJpbml0RXZlbnRCaW5kIiwiaW5pdE1ldGEiLCJpbml0TGl2ZVN0cmVhbSIsIkxpdmVUYXNrIiwicnVuIiwibG9hZExpdmVEYXRhIiwid3JpdGUiLCJVaW50OEFycmF5Iiwic2V0Rmx2IiwiY29uc29sZSIsImxvZyIsIm1lc3NhZ2UiLCJSZXNvbHZlciIsInJlc29sdmVDaHVuayIsInRpbWVTdGFtcCIsImxvYWREYXRhIiwibG9hZE1ldGFEYXRhIiwiY2F0Y2giLCJjaGFuZ2VSYW5nZSIsIl9yYW5nZSIsImdldE5leHRSYW5nZUVuZCIsIlByb21pc2UiLCJyZXNvbHZlIiwiX2xvYWRTZWdtZW50c0RhdGEiLCJ0aW1lcyIsImZpbGVQb3NpdGlvbnMiLCJleHBlY3RFbmQiLCJsZWZ0IiwicmlnaHQiLCJwcm9taXNlIiwiYXJyYXlCdWZmIiwiYmFzZVRpbWUiLCJnZXRUaW1lIiwiX3RpbWVzdGFtcEJhc2UiLCJyZXNvbHZlVGFncyIsImlzUGFyc2luZyIsImF1ZGlvVHJhY2siLCJ2aWRlb1RyYWNrIiwicmVtdXgiLCJtZXRhIiwib25NZXRhRGF0YVJlYWR5IiwibmV3RnJhZyIsImFkZCIsInJhcCIsIkZUWVBfTU9PViIsIm9uTWVkaWFJbmZvUmVhZHkiLCJoYW5kbGVEYXRhUmVhZHkiLCJoYW5kbGVNZWRpYUluZm9SZWFkeSIsImhhbmRsZU1ldGFEYXRhUmVhZHkiLCJzZXRFdmVudEJpbmQiLCJoYW5kbGVOZXdNZWRpYUZyYWdtZW50IiwiY2xlYXJCdWZmZXIiLCJjYW5jZWwiLCJzZWVrU3RhcnQiLCJzdGFydEZpbGVQb3MiLCJlbmRGaWxlUG9zIiwibWluIiwiZ2V0RW5kRmlsZVBvcyIsImxvIiwiaGkiLCJuZXh0VGltZSIsIk1BWF9TQUZFX0lOVEVHRVIiLCJldmVyeSIsImNsZWFyVGFncyIsInNldEZsdkZpcnN0Iiwic2V0Rmx2VXN1YWxseSIsImlzQ29tcGxldGUiLCJUcmFuc0NvZGVyIiwiU1BTUGFyc2VyIiwicHJvZmlsZUlkYyIsImxldmVsSWRjIiwidG9GaXhlZCIsImNocm9tYSIsIm9yaWdpbkFyciIsInJic3AiLCJfZWJzcDJyYnNwIiwic3RyZWFtIiwiRXhwR29sb21iIiwic3BzQ29uZmlnIiwicmVhZFNQUyIsInByb2ZpbGVTdHJpbmciLCJnZXRQcm9maWxlU3RyIiwibGV2ZWxTdHJpbmciLCJnZXRMZXZlbFN0ciIsImNocm9tYUZvcm1hdFN0cmluZyIsImdldENocm9tYUZvcm1hdFN0ciIsIm9yaWdpbkxlbiIsImJ5dGVMZW5ndGgiLCJkaXN0IiwiZGlzdFNpemUiLCJfb2JzZXJ2ZXIiLCJvYnNlcnZlciIsImZsdXNoIiwiZXJyb3JEZXRhaWwiLCJlcnJvclRvRW1pdCIsIkF1ZGlvRGVtdXhlciIsImN1cnJlbnRUYWciLCJyZWFkT2Zmc2V0IiwiYXVkaW9NZXRhRGF0YSIsInRyYWNrIiwiaW5pdEF1ZGlvTWV0YSIsImR2IiwiRGF0YVZpZXc0UmVhZCIsInNvdW5kIiwiZ2V0VWludDgiLCJzb3VuZEZvcm1hdElkeCIsInNvdW5kUmF0ZSIsInNvdW5kVHlwZSIsImNoYW5uZWxDb3VudCIsImFhY0luZm8iLCJfcGFyc2VBQUNBdWRpbyIsImFhY0RhdGEiLCJzYW1wbGVGcmVxIiwicGFja2V0VHlwZSIsInNhbXBsZVJhdGUiLCJtYW5pZmVzdENvZGVjIiwicmVmU2FtcGxlRHVyYXRpb24iLCJoYXNJbml0aWFsTWV0YURpc3BhdGNoZWQiLCJtaSIsInJlcGxhY2UiLCJhYWNTYW1wbGUiLCJ1bml0IiwicmVzZXRTdGF0dXMiLCJhYWNBcnJheSIsIl9wYXJzZUFBQ0F1ZGlvU3BlY2lmaWNDb25maWciLCJnZXRBbmROdW0iLCJyZXN1bHRPYmoiLCJzYW1wbGluZ0ZyZXF1ZW5jeSIsImV4dEF1ZGlvT2JqZWN0VHlwZSIsImV4dEF1ZGlvU2FtcGxpbmdJZHgiLCJVSW50MCIsIlVJbnQxIiwidGVtcEF1ZGlvT2JqZWN0VHlwZSIsImF1ZGlvT2JqZWN0VHlwZSIsInNhbXBsaW5nSWR4IiwiZW1pdEVycm9yIiwiZGlzcGF0Y2giLCJVSW50MiIsImJyb3dzZXIiLCJvcyIsImlzQW5kcm9pZCIsImV4dGVuc2lvblNhbXBsaW5nSW5kZXgiLCJleHRlbnNpb25TYW1wbGluZ0lkeCIsImRhdGFTaXplIiwicHJlZml4IiwicGF5bG9hZCIsIkxvZyIsIndhcm4iLCJNZXRhRGVtdXhlciIsInNpemUiLCJtZXRhRGF0YSIsInBhcnNlVmFsdWUiLCJEYXRhVmlldyIsInN0ckxlbiIsImdldFVpbnQxNiIsIlVURjgiLCJkZWNvZGUiLCJ0cyIsImdldEZsb2F0NjQiLCJ0aW1lT2Zmc2V0IiwiZ2V0SW50MTYiLCJEYXRlIiwicGFyc2VTdHJpbmciLCJpc09iakVuZCIsImdldFVpbnQzMiIsIkFycmF5QnVmZmVyIiwiZGF0YVZpZXciLCJib29sTnVtIiwib2JqRW5kU2l6ZSIsImFtZk9iaiIsInBhcnNlT2JqZWN0IiwiaXNPYmplY3RFbmQiLCJtYXJrIiwiYW1mVmFyIiwibWFya2VyIiwiYXJyTGVuZ3RoIiwic2NyaXB0IiwiZGF0ZSIsInBhcnNlRGF0ZSIsImxvbmdTdHIiLCJwYXJzZUxvbmdTdHJpbmciLCJuYXRpdmVIYXNQcm9wIiwiVGFnZGVtdXgiLCJfbWV0YURlbXV4ZXIiLCJfdmlkZW9EZW11eGVyIiwiVmlkZW9EZW11eGVyIiwiX2F1ZGlvRGVtdXhlciIsIl9maXJzdFBhcnNlIiwiX2RhdGFPZmZzZXQiLCJyZXNvbHZlVGFnIiwiX3Jlc29sdmVBdWRpb1RhZyIsIl9yZXNvbHZlVmlkZW9UYWciLCJfcmVzb2x2ZU1ldGFUYWciLCJzIiwiaGFzTWV0YURhdGEiLCJMb2dnZXIiLCJvbk1ldGFEYXRhIiwibWV0YUZpZWxkcyIsImZpZWxkIiwibWV0YU9iaiIsIl9pbml0TWV0YURhdGEiLCJmaWxlcG9zaXRpb25zIiwidmlkZW9NZXRhRGF0YSIsImZpcnN0VUk4IiwiZnJhbWVUeXBlIiwiY29kZWNJZCIsIl9wYXJzZUFWQ1BhY2tldCIsInBhY2thZ2VUeXBlIiwiY3BzVGltZSIsIl9wYXJzZUFWQ0RlY29kZXJDb25maWd1cmF0aW9uUmVjb3JkIiwiX3BhcnNlQVZDVmlkZW9EYXRhIiwiYXZjYyIsInRpbWVzY2FsZSIsImF2Y1Byb2ZpbGUiLCJnZXRVaW50Iiwic3BzTGVuZ3RoIiwiaGFuZGxlciIsInNwcyIsInBhcnNlU1BTIiwiY29kZWNTaXplIiwicHJlc2VudFNpemUiLCJmcmFtZVJhdGUiLCJyZWZGcmFtZXMiLCJiaXREZXB0aCIsInByZXNlbnRXaWR0aCIsInByZXNlbnRIZWlnaHQiLCJjb2RlY0FyciIsInN1YmFycmF5IiwiY29kZWNTdHIiLCJqIiwiaGV4IiwicGFkU3RhcnQiLCJwcHMiLCJwcHNDb3VudCIsInBwc1NpemUiLCJuYWx1TGlzdCIsIm5hbHVMZW5TaXplIiwiaXNLZXlmcmFtZSIsInRlbXBSZWFkT2Zmc2V0IiwibmFsdVNpemUiLCJnZXRVaW50MjQiLCJ1bml0VHlwZSIsIm5hbHVVbml0IiwidmlkZW9TYW1wbGUiLCJ1bml0cyIsImNwcyIsIm51bSIsIkZNUDQiLCJ3cml0ZVVpbnQzMiIsImNvbnRlbnQiLCJpbml0Qm94IiwibXZoZCIsInRyYWsxIiwidmlkZW9UcmFrIiwidHJhazIiLCJhdWRpb1RyYWsiLCJtdmV4IiwiaXRlbSIsImJ5dGVzIiwidGtoZCIsIm1kaWEiLCJzYW1wbGVyYXRlIiwibWVkaWFUaW1lIiwibWRoZCIsImhkbHIiLCJtaW5mIiwiZXh0ZW5zaW9uIiwidm1oZCIsInNtaGQiLCJkaW5mIiwic3RibCIsImRyZWYiLCJzdHNkIiwic3R0cyIsInN0c2MiLCJzdHN6Iiwic3RjbyIsIm1wNGEiLCJhdmMxIiwiZXNkcyIsImNvbmZpZ2xlbiIsImNvbmNhdCIsImhTcGFjaW5nIiwidlNwYWNpbmciLCJhdmNjQnVmZmVyIiwiYnRydCIsInBhc3AiLCJtZWhkIiwidHJleCIsIm1maGQiLCJ0cmFmIiwic2VxdWVuY2UiLCJ0ZmhkIiwidGZkdCIsInNkdHAiLCJ0cnVuIiwic2R0cExlbmd0aCIsInNhbXBsZUNvdW50Iiwid3JpdGVPZmZzZXQiLCJ0cnVuQm94IiwibWRhdEJveCIsImNoYXJDb2RlQXQiLCJfZHRzQmFzZSIsIl9pc0R0c0Jhc2VJbml0ZWQiLCJfdmlkZW9NZXRhIiwiX2F1ZGlvTWV0YSIsIl9hdWRpb05leHREdHMiLCJfdmlkZW9OZXh0RHRzIiwiX3ZpZGVvU2VnbWVudExpc3QiLCJfYXVkaW9TZWdtZW50TGlzdCIsIl9maWxsU2lsZW5jZUZyYW1lIiwiX2R0c0Jhc2VJbml0ZWQiLCJjYWxjRHRzQmFzZSIsIl9yZW11eFZpZGVvIiwiX3JlbXV4QXVkaW8iLCJmdHlwIiwibW9vdiIsImF1ZGlvQmFzZSIsIkluZmluaXR5IiwidmlkZW9CYXNlIiwiZHRzQ29ycmVjdGlvbiIsImZpcnN0RHRzIiwibGFzdER0cyIsImZpcnN0UHRzIiwibGFzdFB0cyIsIm1wNFNhbXBsZXMiLCJ2aWRlb1NlZ21lbnQiLCJhdmNTYW1wbGUiLCJsYXN0U2VnbWVudCIsImdhcCIsImxhc3RHYXAiLCJfdW5pdHMiLCJtZGF0U2FtcGxlIiwic2FtcGxlRHVyYXRpb24iLCJuZXh0RHRzIiwiYWRkUkFQIiwiZmlyc3QiLCJtb29mTWRhdCIsIm1vb2YiLCJtZGF0IiwiYXBwZW5kIiwic2lsZW50RHVyYXRpb24iLCJpc0ZpcnN0RHRzSW5pdGVkIiwibmVlZFNpbGVudEZyYW1lIiwiaXNFbXB0eSIsImdldExhc3RTYW1wbGVCZWZvcmUiLCJzaWxlbnRGcmFtZSIsImluaXRTaWxlbnRBdWRpbyIsIm1wNFNhbXBsZSIsImN0cyIsImF1ZGlvU2VnbWVudCIsImdldFNpbGVudEZyYW1lIiwiUmVtdXhlciIsIl9oZWFkZXJzIiwiSGVhZGVycyIsImhlYWRlcnMiLCJtZXRob2QiLCJjYWNoZSIsInJlcXVlc3QiLCJSZXF1ZXN0IiwiY2FsbGJhY2siLCJyZWFkZXIiLCJyZWFkIiwiZmV0Y2giLCJyZXMiLCJnZXRSZWFkZXIiLCJMb2FkQ2xzIiwiRmV0Y2hMb2FkZXIiLCJYSFJMb2FkZXIiLCJsb2FkZXIiLCJpc0NhbmNlbGVkIiwicXVldWUiLCJ1cGRhdGUiLCJmaWx0ZXIiLCJRdWV1ZSIsInNlbmRlZCIsIndhaXQiLCJsaW1pdCIsImNvbXBsZXRlIiwiaXNTdG9wcGVkIiwibm93IiwiUmFuZ2UiLCJzdGF0dXMiLCJvayIsInJlamVjdCIsInN0YXR1c1RleHQiLCJhcnJheUJ1ZmZlciIsIl9wcm9taXNlIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwicmVzcG9uc2VUeXBlIiwic2V0UmVxdWVzdEhlYWRlciIsIm9uYWJvcnQiLCJvbmxvYWQiLCJyZXNwb25zZSIsIm9uZXJyb3IiLCJfeGhyIiwic2VuZCIsImFib3J0IiwiY29udGV4dCIsIl9kdiIsIl9jb250ZXh0IiwiaW5pdFByb3h5IiwiaXNIaWdoIiwicmVhZFNpemUiLCJudW1Ub0FuZCIsImJlZ2luIiwiYnl0ZXNBdmFpbGFibGUiLCJ3b3JkIiwiYml0c0F2YWlsYWJsZSIsIndvcmtpbmdCeXRlcyIsImF2YWlsYWJsZUJ5dGVzIiwic2tpcEJ5dGVzIiwibG9hZFdvcmQiLCJiaXRzIiwidmFsdSIsInJlYWRCaXRzIiwibGVhZGluZ1plcm9Db3VudCIsInNraXBMWiIsInNraXBCaXRzIiwiY2x6IiwicmVhZFVFRyIsImxhc3RTY2FsZSIsIm5leHRTY2FsZSIsImRlbHRhU2NhbGUiLCJyZWFkRUciLCJmcmFtZUNyb3BMZWZ0T2Zmc2V0IiwiZnJhbWVDcm9wUmlnaHRPZmZzZXQiLCJmcmFtZUNyb3BUb3BPZmZzZXQiLCJmcmFtZUNyb3BCb3R0b21PZmZzZXQiLCJjb2RlY1dpZHRoIiwiY29kZWNIZWlnaHQiLCJudW1SZWZGcmFtZXNJblBpY09yZGVyQ250Q3ljbGUiLCJwaWNXaWR0aEluTWJzTWludXMxIiwicGljSGVpZ2h0SW5NYXBVbml0c01pbnVzMSIsImZyYW1lTWJzT25seUZsYWciLCJzY2FsaW5nTGlzdENvdW50IiwicmVhZFVCeXRlIiwicmVhZEJvb2xlYW4iLCJza2lwRUciLCJza2lwVUVHIiwic2tpcFNjYWxpbmdMaXN0IiwiY2hyb21hRm9ybWF0SWRjIiwiY2hyb21hRm9ybWF0cyIsImJpdERlcHRoTHVtYSIsInByb2ZpbGVJZGNzIiwiaW5jbHVkZXMiLCJwaWNPcmRlckNudFR5cGUiLCJmcHNGaXhlZCIsImFzcGVjdFJhdGlvSWRjIiwibnVtVW5pdEluVGljayIsImNyb3BVbml0WCIsImNyb3BVbml0WSIsInN1YldjIiwic3ViSGMiLCJwaXhlbFNjYWxlIiwiY2VpbCIsIm5hdGl2ZVNsaWNlIiwiT2JzZXJ2ZXIiLCJmbklkIiwiX2xpc3RlbmVySWRNYXAiLCJfbGlzdGVuZXJzIiwiX2dldExpc3RlbmVyc0J5S2V5IiwiX2dldExpc3RlbmVyQnlJZCIsIl90aGlzIiwib25jZUZ1bmMiLCJ1aW50OGFycmF5Iiwib3V0IiwiaW5wdXQiLCJfY2hlY2tDb250aW51YXRpb24iLCJ1Y3M0IiwiY2hlY2tMZW5ndGgiLCJhcnJheSIsImRlYm91bmNlIiwiZnVuYyIsImltbWVkaWF0ZSIsImRlYm91bmNlZCIsImNsZWFyVGltZW91dCIsImNhbGxOb3ciLCJjYWNoZVdyYXBwZXIiLCJyZWR1Y2UiLCJwcmUiLCJjdXIiLCJsZSIsImJ1ZiIsInNldEludDE2IiwiSW50MTZBcnJheSIsImRldmljZSIsImlzUGMiLCJpc1RhYmxldCIsInVhIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwidG9Mb3dlckNhc2UiLCJyZWciLCJpZSIsImZpcmZveCIsImNocm9tZSIsIm9wZXJhIiwic2FmYXJpIiwidGVzdCIsImlzV2luZG93c1Bob25lIiwiaXNTeW1iaWFuIiwiaXNGaXJlRm94IiwiaXNQaG9uZSIsInRlbXAiLCJwYWRTdGFydDRIZXgiLCJoZXhOdW0iLCJoZXhTdHIiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBOztBQUVBQSxPQUFP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T3BWLFNBQVN3bEIsSUFBVCxFQUFlLEVBQWYsQ0FBUDtBQUNIOzs7Ozs7a0JBR1VyaUIsTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQ2Ysc0QiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJ4Z3BsYXllclwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJ4Z3BsYXllclwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ4Z3BsYXllci1mbHZcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJ4Z3BsYXllclwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wieGdwbGF5ZXItZmx2XCJdID0gZmFjdG9yeShyb290W1wieGdwbGF5ZXJcIl0pO1xufSkod2luZG93LCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3hncGxheWVyX18pIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKFJlc3VsdENvbnN0cnVjdG9yKSB7XG4gIHZhciB0b3RhbExlbmd0aCA9IDA7XG5cbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFycmF5cyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBhcnJheXNbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gYXJyYXlzW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXA7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IChfc3RlcCA9IF9pdGVyYXRvci5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZSkge1xuICAgICAgdmFyIGFyciA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICB0b3RhbExlbmd0aCArPSBhcnIubGVuZ3RoO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2RpZEl0ZXJhdG9yRXJyb3IgPSB0cnVlO1xuICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yLnJldHVybikge1xuICAgICAgICBfaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcikge1xuICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgcmVzdWx0ID0gbmV3IFJlc3VsdENvbnN0cnVjdG9yKHRvdGFsTGVuZ3RoKTtcbiAgdmFyIG9mZnNldCA9IDA7XG4gIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gIHZhciBfZGlkSXRlcmF0b3JFcnJvcjIgPSBmYWxzZTtcbiAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSBhcnJheXNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgIHZhciBfYXJyID0gX3N0ZXAyLnZhbHVlO1xuXG4gICAgICByZXN1bHQuc2V0KF9hcnIsIG9mZnNldCk7XG4gICAgICBvZmZzZXQgKz0gX2Fyci5sZW5ndGg7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyLnJldHVybikge1xuICAgICAgICBfaXRlcmF0b3IyLnJldHVybigpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfY29uY2F0ID0gcmVxdWlyZSgnLi9jb25jYXQnKTtcblxudmFyIF9jb25jYXQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29uY2F0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxubW9kdWxlLmV4cG9ydHMgPSBfY29uY2F0Mi5kZWZhdWx0OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFzc2lnbiAgICAgICAgPSByZXF1aXJlKCdlczUtZXh0L29iamVjdC9hc3NpZ24nKVxuICAsIG5vcm1hbGl6ZU9wdHMgPSByZXF1aXJlKCdlczUtZXh0L29iamVjdC9ub3JtYWxpemUtb3B0aW9ucycpXG4gICwgaXNDYWxsYWJsZSAgICA9IHJlcXVpcmUoJ2VzNS1leHQvb2JqZWN0L2lzLWNhbGxhYmxlJylcbiAgLCBjb250YWlucyAgICAgID0gcmVxdWlyZSgnZXM1LWV4dC9zdHJpbmcvIy9jb250YWlucycpXG5cbiAgLCBkO1xuXG5kID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZHNjciwgdmFsdWUvKiwgb3B0aW9ucyovKSB7XG5cdHZhciBjLCBlLCB3LCBvcHRpb25zLCBkZXNjO1xuXHRpZiAoKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB8fCAodHlwZW9mIGRzY3IgIT09ICdzdHJpbmcnKSkge1xuXHRcdG9wdGlvbnMgPSB2YWx1ZTtcblx0XHR2YWx1ZSA9IGRzY3I7XG5cdFx0ZHNjciA9IG51bGw7XG5cdH0gZWxzZSB7XG5cdFx0b3B0aW9ucyA9IGFyZ3VtZW50c1syXTtcblx0fVxuXHRpZiAoZHNjciA9PSBudWxsKSB7XG5cdFx0YyA9IHcgPSB0cnVlO1xuXHRcdGUgPSBmYWxzZTtcblx0fSBlbHNlIHtcblx0XHRjID0gY29udGFpbnMuY2FsbChkc2NyLCAnYycpO1xuXHRcdGUgPSBjb250YWlucy5jYWxsKGRzY3IsICdlJyk7XG5cdFx0dyA9IGNvbnRhaW5zLmNhbGwoZHNjciwgJ3cnKTtcblx0fVxuXG5cdGRlc2MgPSB7IHZhbHVlOiB2YWx1ZSwgY29uZmlndXJhYmxlOiBjLCBlbnVtZXJhYmxlOiBlLCB3cml0YWJsZTogdyB9O1xuXHRyZXR1cm4gIW9wdGlvbnMgPyBkZXNjIDogYXNzaWduKG5vcm1hbGl6ZU9wdHMob3B0aW9ucyksIGRlc2MpO1xufTtcblxuZC5ncyA9IGZ1bmN0aW9uIChkc2NyLCBnZXQsIHNldC8qLCBvcHRpb25zKi8pIHtcblx0dmFyIGMsIGUsIG9wdGlvbnMsIGRlc2M7XG5cdGlmICh0eXBlb2YgZHNjciAhPT0gJ3N0cmluZycpIHtcblx0XHRvcHRpb25zID0gc2V0O1xuXHRcdHNldCA9IGdldDtcblx0XHRnZXQgPSBkc2NyO1xuXHRcdGRzY3IgPSBudWxsO1xuXHR9IGVsc2Uge1xuXHRcdG9wdGlvbnMgPSBhcmd1bWVudHNbM107XG5cdH1cblx0aWYgKGdldCA9PSBudWxsKSB7XG5cdFx0Z2V0ID0gdW5kZWZpbmVkO1xuXHR9IGVsc2UgaWYgKCFpc0NhbGxhYmxlKGdldCkpIHtcblx0XHRvcHRpb25zID0gZ2V0O1xuXHRcdGdldCA9IHNldCA9IHVuZGVmaW5lZDtcblx0fSBlbHNlIGlmIChzZXQgPT0gbnVsbCkge1xuXHRcdHNldCA9IHVuZGVmaW5lZDtcblx0fSBlbHNlIGlmICghaXNDYWxsYWJsZShzZXQpKSB7XG5cdFx0b3B0aW9ucyA9IHNldDtcblx0XHRzZXQgPSB1bmRlZmluZWQ7XG5cdH1cblx0aWYgKGRzY3IgPT0gbnVsbCkge1xuXHRcdGMgPSB0cnVlO1xuXHRcdGUgPSBmYWxzZTtcblx0fSBlbHNlIHtcblx0XHRjID0gY29udGFpbnMuY2FsbChkc2NyLCAnYycpO1xuXHRcdGUgPSBjb250YWlucy5jYWxsKGRzY3IsICdlJyk7XG5cdH1cblxuXHRkZXNjID0geyBnZXQ6IGdldCwgc2V0OiBzZXQsIGNvbmZpZ3VyYWJsZTogYywgZW51bWVyYWJsZTogZSB9O1xuXHRyZXR1cm4gIW9wdGlvbnMgPyBkZXNjIDogYXNzaWduKG5vcm1hbGl6ZU9wdHMob3B0aW9ucyksIGRlc2MpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZW1wdHktZnVuY3Rpb25cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge307XG4iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9pcy1pbXBsZW1lbnRlZFwiKSgpXG5cdD8gT2JqZWN0LmFzc2lnblxuXHQ6IHJlcXVpcmUoXCIuL3NoaW1cIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBhc3NpZ24gPSBPYmplY3QuYXNzaWduLCBvYmo7XG5cdGlmICh0eXBlb2YgYXNzaWduICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBmYWxzZTtcblx0b2JqID0geyBmb286IFwicmF6XCIgfTtcblx0YXNzaWduKG9iaiwgeyBiYXI6IFwiZHdhXCIgfSwgeyB0cnp5OiBcInRyenlcIiB9KTtcblx0cmV0dXJuIChvYmouZm9vICsgb2JqLmJhciArIG9iai50cnp5KSA9PT0gXCJyYXpkd2F0cnp5XCI7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBrZXlzICA9IHJlcXVpcmUoXCIuLi9rZXlzXCIpXG4gICwgdmFsdWUgPSByZXF1aXJlKFwiLi4vdmFsaWQtdmFsdWVcIilcbiAgLCBtYXggICA9IE1hdGgubWF4O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkZXN0LCBzcmMgLyosIOKApnNyY24qLykge1xuXHR2YXIgZXJyb3IsIGksIGxlbmd0aCA9IG1heChhcmd1bWVudHMubGVuZ3RoLCAyKSwgYXNzaWduO1xuXHRkZXN0ID0gT2JqZWN0KHZhbHVlKGRlc3QpKTtcblx0YXNzaWduID0gZnVuY3Rpb24gKGtleSkge1xuXHRcdHRyeSB7XG5cdFx0XHRkZXN0W2tleV0gPSBzcmNba2V5XTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGU7XG5cdFx0fVxuXHR9O1xuXHRmb3IgKGkgPSAxOyBpIDwgbGVuZ3RoOyArK2kpIHtcblx0XHRzcmMgPSBhcmd1bWVudHNbaV07XG5cdFx0a2V5cyhzcmMpLmZvckVhY2goYXNzaWduKTtcblx0fVxuXHRpZiAoZXJyb3IgIT09IHVuZGVmaW5lZCkgdGhyb3cgZXJyb3I7XG5cdHJldHVybiBkZXN0O1xufTtcbiIsIi8vIERlcHJlY2F0ZWRcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuIHJldHVybiB0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCI7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfdW5kZWZpbmVkID0gcmVxdWlyZShcIi4uL2Z1bmN0aW9uL25vb3BcIikoKTsgLy8gU3VwcG9ydCBFUzMgZW5naW5lc1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWwpIHtcbiByZXR1cm4gKHZhbCAhPT0gX3VuZGVmaW5lZCkgJiYgKHZhbCAhPT0gbnVsbCk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vaXMtaW1wbGVtZW50ZWRcIikoKSA/IE9iamVjdC5rZXlzIDogcmVxdWlyZShcIi4vc2hpbVwiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0dHJ5IHtcblx0XHRPYmplY3Qua2V5cyhcInByaW1pdGl2ZVwiKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaXNWYWx1ZSA9IHJlcXVpcmUoXCIuLi9pcy12YWx1ZVwiKTtcblxudmFyIGtleXMgPSBPYmplY3Qua2V5cztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0KSB7IHJldHVybiBrZXlzKGlzVmFsdWUob2JqZWN0KSA/IE9iamVjdChvYmplY3QpIDogb2JqZWN0KTsgfTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaXNWYWx1ZSA9IHJlcXVpcmUoXCIuL2lzLXZhbHVlXCIpO1xuXG52YXIgZm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLCBjcmVhdGUgPSBPYmplY3QuY3JlYXRlO1xuXG52YXIgcHJvY2VzcyA9IGZ1bmN0aW9uIChzcmMsIG9iaikge1xuXHR2YXIga2V5O1xuXHRmb3IgKGtleSBpbiBzcmMpIG9ialtrZXldID0gc3JjW2tleV07XG59O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9wdHMxIC8qLCDigKZvcHRpb25zKi8pIHtcblx0dmFyIHJlc3VsdCA9IGNyZWF0ZShudWxsKTtcblx0Zm9yRWFjaC5jYWxsKGFyZ3VtZW50cywgZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0XHRpZiAoIWlzVmFsdWUob3B0aW9ucykpIHJldHVybjtcblx0XHRwcm9jZXNzKE9iamVjdChvcHRpb25zKSwgcmVzdWx0KTtcblx0fSk7XG5cdHJldHVybiByZXN1bHQ7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuKSB7XG5cdGlmICh0eXBlb2YgZm4gIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihmbiArIFwiIGlzIG5vdCBhIGZ1bmN0aW9uXCIpO1xuXHRyZXR1cm4gZm47XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpc1ZhbHVlID0gcmVxdWlyZShcIi4vaXMtdmFsdWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG5cdGlmICghaXNWYWx1ZSh2YWx1ZSkpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgdXNlIG51bGwgb3IgdW5kZWZpbmVkXCIpO1xuXHRyZXR1cm4gdmFsdWU7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vaXMtaW1wbGVtZW50ZWRcIikoKVxuXHQ/IFN0cmluZy5wcm90b3R5cGUuY29udGFpbnNcblx0OiByZXF1aXJlKFwiLi9zaGltXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHIgPSBcInJhemR3YXRyenlcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG5cdGlmICh0eXBlb2Ygc3RyLmNvbnRhaW5zICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBmYWxzZTtcblx0cmV0dXJuIChzdHIuY29udGFpbnMoXCJkd2FcIikgPT09IHRydWUpICYmIChzdHIuY29udGFpbnMoXCJmb29cIikgPT09IGZhbHNlKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGluZGV4T2YgPSBTdHJpbmcucHJvdG90eXBlLmluZGV4T2Y7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHNlYXJjaFN0cmluZy8qLCBwb3NpdGlvbiovKSB7XG5cdHJldHVybiBpbmRleE9mLmNhbGwodGhpcywgc2VhcmNoU3RyaW5nLCBhcmd1bWVudHNbMV0pID4gLTE7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZCAgICAgICAgPSByZXF1aXJlKCdkJylcbiAgLCBjYWxsYWJsZSA9IHJlcXVpcmUoJ2VzNS1leHQvb2JqZWN0L3ZhbGlkLWNhbGxhYmxlJylcblxuICAsIGFwcGx5ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LCBjYWxsID0gRnVuY3Rpb24ucHJvdG90eXBlLmNhbGxcbiAgLCBjcmVhdGUgPSBPYmplY3QuY3JlYXRlLCBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eVxuICAsIGRlZmluZVByb3BlcnRpZXMgPSBPYmplY3QuZGVmaW5lUHJvcGVydGllc1xuICAsIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuICAsIGRlc2NyaXB0b3IgPSB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlIH1cblxuICAsIG9uLCBvbmNlLCBvZmYsIGVtaXQsIG1ldGhvZHMsIGRlc2NyaXB0b3JzLCBiYXNlO1xuXG5vbiA9IGZ1bmN0aW9uICh0eXBlLCBsaXN0ZW5lcikge1xuXHR2YXIgZGF0YTtcblxuXHRjYWxsYWJsZShsaXN0ZW5lcik7XG5cblx0aWYgKCFoYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMsICdfX2VlX18nKSkge1xuXHRcdGRhdGEgPSBkZXNjcmlwdG9yLnZhbHVlID0gY3JlYXRlKG51bGwpO1xuXHRcdGRlZmluZVByb3BlcnR5KHRoaXMsICdfX2VlX18nLCBkZXNjcmlwdG9yKTtcblx0XHRkZXNjcmlwdG9yLnZhbHVlID0gbnVsbDtcblx0fSBlbHNlIHtcblx0XHRkYXRhID0gdGhpcy5fX2VlX187XG5cdH1cblx0aWYgKCFkYXRhW3R5cGVdKSBkYXRhW3R5cGVdID0gbGlzdGVuZXI7XG5cdGVsc2UgaWYgKHR5cGVvZiBkYXRhW3R5cGVdID09PSAnb2JqZWN0JykgZGF0YVt0eXBlXS5wdXNoKGxpc3RlbmVyKTtcblx0ZWxzZSBkYXRhW3R5cGVdID0gW2RhdGFbdHlwZV0sIGxpc3RlbmVyXTtcblxuXHRyZXR1cm4gdGhpcztcbn07XG5cbm9uY2UgPSBmdW5jdGlvbiAodHlwZSwgbGlzdGVuZXIpIHtcblx0dmFyIG9uY2UsIHNlbGY7XG5cblx0Y2FsbGFibGUobGlzdGVuZXIpO1xuXHRzZWxmID0gdGhpcztcblx0b24uY2FsbCh0aGlzLCB0eXBlLCBvbmNlID0gZnVuY3Rpb24gKCkge1xuXHRcdG9mZi5jYWxsKHNlbGYsIHR5cGUsIG9uY2UpO1xuXHRcdGFwcGx5LmNhbGwobGlzdGVuZXIsIHRoaXMsIGFyZ3VtZW50cyk7XG5cdH0pO1xuXG5cdG9uY2UuX19lZU9uY2VMaXN0ZW5lcl9fID0gbGlzdGVuZXI7XG5cdHJldHVybiB0aGlzO1xufTtcblxub2ZmID0gZnVuY3Rpb24gKHR5cGUsIGxpc3RlbmVyKSB7XG5cdHZhciBkYXRhLCBsaXN0ZW5lcnMsIGNhbmRpZGF0ZSwgaTtcblxuXHRjYWxsYWJsZShsaXN0ZW5lcik7XG5cblx0aWYgKCFoYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMsICdfX2VlX18nKSkgcmV0dXJuIHRoaXM7XG5cdGRhdGEgPSB0aGlzLl9fZWVfXztcblx0aWYgKCFkYXRhW3R5cGVdKSByZXR1cm4gdGhpcztcblx0bGlzdGVuZXJzID0gZGF0YVt0eXBlXTtcblxuXHRpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ29iamVjdCcpIHtcblx0XHRmb3IgKGkgPSAwOyAoY2FuZGlkYXRlID0gbGlzdGVuZXJzW2ldKTsgKytpKSB7XG5cdFx0XHRpZiAoKGNhbmRpZGF0ZSA9PT0gbGlzdGVuZXIpIHx8XG5cdFx0XHRcdFx0KGNhbmRpZGF0ZS5fX2VlT25jZUxpc3RlbmVyX18gPT09IGxpc3RlbmVyKSkge1xuXHRcdFx0XHRpZiAobGlzdGVuZXJzLmxlbmd0aCA9PT0gMikgZGF0YVt0eXBlXSA9IGxpc3RlbmVyc1tpID8gMCA6IDFdO1xuXHRcdFx0XHRlbHNlIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGlmICgobGlzdGVuZXJzID09PSBsaXN0ZW5lcikgfHxcblx0XHRcdFx0KGxpc3RlbmVycy5fX2VlT25jZUxpc3RlbmVyX18gPT09IGxpc3RlbmVyKSkge1xuXHRcdFx0ZGVsZXRlIGRhdGFbdHlwZV07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG5lbWl0ID0gZnVuY3Rpb24gKHR5cGUpIHtcblx0dmFyIGksIGwsIGxpc3RlbmVyLCBsaXN0ZW5lcnMsIGFyZ3M7XG5cblx0aWYgKCFoYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMsICdfX2VlX18nKSkgcmV0dXJuO1xuXHRsaXN0ZW5lcnMgPSB0aGlzLl9fZWVfX1t0eXBlXTtcblx0aWYgKCFsaXN0ZW5lcnMpIHJldHVybjtcblxuXHRpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ29iamVjdCcpIHtcblx0XHRsID0gYXJndW1lbnRzLmxlbmd0aDtcblx0XHRhcmdzID0gbmV3IEFycmF5KGwgLSAxKTtcblx0XHRmb3IgKGkgPSAxOyBpIDwgbDsgKytpKSBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcblxuXHRcdGxpc3RlbmVycyA9IGxpc3RlbmVycy5zbGljZSgpO1xuXHRcdGZvciAoaSA9IDA7IChsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXSk7ICsraSkge1xuXHRcdFx0YXBwbHkuY2FsbChsaXN0ZW5lciwgdGhpcywgYXJncyk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuXHRcdGNhc2UgMTpcblx0XHRcdGNhbGwuY2FsbChsaXN0ZW5lcnMsIHRoaXMpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAyOlxuXHRcdFx0Y2FsbC5jYWxsKGxpc3RlbmVycywgdGhpcywgYXJndW1lbnRzWzFdKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMzpcblx0XHRcdGNhbGwuY2FsbChsaXN0ZW5lcnMsIHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcblx0XHRcdGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRsID0gYXJndW1lbnRzLmxlbmd0aDtcblx0XHRcdGFyZ3MgPSBuZXcgQXJyYXkobCAtIDEpO1xuXHRcdFx0Zm9yIChpID0gMTsgaSA8IGw7ICsraSkge1xuXHRcdFx0XHRhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdH1cblx0XHRcdGFwcGx5LmNhbGwobGlzdGVuZXJzLCB0aGlzLCBhcmdzKTtcblx0XHR9XG5cdH1cbn07XG5cbm1ldGhvZHMgPSB7XG5cdG9uOiBvbixcblx0b25jZTogb25jZSxcblx0b2ZmOiBvZmYsXG5cdGVtaXQ6IGVtaXRcbn07XG5cbmRlc2NyaXB0b3JzID0ge1xuXHRvbjogZChvbiksXG5cdG9uY2U6IGQob25jZSksXG5cdG9mZjogZChvZmYpLFxuXHRlbWl0OiBkKGVtaXQpXG59O1xuXG5iYXNlID0gZGVmaW5lUHJvcGVydGllcyh7fSwgZGVzY3JpcHRvcnMpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBmdW5jdGlvbiAobykge1xuXHRyZXR1cm4gKG8gPT0gbnVsbCkgPyBjcmVhdGUoYmFzZSkgOiBkZWZpbmVQcm9wZXJ0aWVzKE9iamVjdChvKSwgZGVzY3JpcHRvcnMpO1xufTtcbmV4cG9ydHMubWV0aG9kcyA9IG1ldGhvZHM7XG4iLCIvKipcbiAqIEBhdXRob3IgZnV5dWhhb1xuICovXG5pbXBvcnQgTWFpblBhcnNlciBmcm9tICcuL3BhcnNlL01haW5QYXJzZXInXG5pbXBvcnQgTVNFIGZyb20gJy4vcGFyc2UvTVNFJ1xuaW1wb3J0IFZvZFRhc2sgZnJvbSAnLi90YXNrcy9Wb2RUYXNrJ1xuaW1wb3J0IGdldERlZmF1bHRDb25mIGZyb20gJy4vY29uc3RhbnRzL2NvbmZpZydcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbHYge1xuICBjb25zdHJ1Y3RvciAob3B0aW9ucywgcGxheWVyKSB7XG4gICAgdGhpcy5fcGxheWVyID0gcGxheWVyXG4gICAgdGhpcy5fb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIGdldERlZmF1bHRDb25mKCksIG9wdGlvbnMpXG4gICAgdGhpcy5mbHZQbGF5ZXIgPSBuZXcgTWFpblBhcnNlcih0aGlzLl9vcHRpb25zLCBwbGF5ZXIpXG4gICAgdGhpcy5tc2UgPSBuZXcgTVNFKClcbiAgICB0aGlzLmlzU2Vla2luZyA9IGZhbHNlXG4gICAgdGhpcy5pc0RhdGFMb2FkaW5nID0gZmFsc2VcbiAgICB0aGlzLnRlbXBDdXJyZW50VGltZSA9IDBcbiAgICB0aGlzLnRlbXBGbHZQbGF5ZXIgPSBudWxsXG4gICAgdGhpcy5pc0NoYW5naW5nU3JjID0gZmFsc2VcbiAgICB0aGlzLmluaXRQbGF5ZXJFdmVudHMocGxheWVyLCB0aGlzLl9vcHRpb25zKVxuICAgIHRoaXMuaW5pdEZsdlBsYXllckV2ZW50cyh0aGlzLmZsdlBsYXllciwgdGhpcy5tc2UpXG4gICAgdGhpcy5pbml0TXNlRXZlbnRzKHRoaXMubXNlLCB0aGlzLmZsdlBsYXllcilcbiAgfVxuXG4gIGxvYWQgKCkge1xuICAgIHRoaXMuZmx2UGxheWVyLnN0YXJ0TG9hZERhdGEoKVxuICB9XG5cbiAgaW5pdFBsYXllckV2ZW50cyAocGxheWVyLCBvcHRpb25zKSB7XG4gICAgY29uc3QgeyBtc2UgfSA9IHRoaXNcbiAgICBwbGF5ZXIubXNlID0gbXNlXG4gICAgdGhpcy5oYW5kbGVTZWVraW5nID0gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNDaGFuZ2luZ1NyYykge1xuICAgICAgICB0aGlzLmlzQ2hhbmdpbmdTcmMgPSBmYWxzZVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IHsgYnVmZmVyZWQsIGN1cnJlbnRUaW1lIH0gPSBwbGF5ZXJcbiAgICAgIGxldCBpc0J1ZmZlcmVkID0gZmFsc2VcbiAgICAgIGlmIChidWZmZXJlZC5sZW5ndGgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGJ1ZmZlcmVkLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnRUaW1lID4gYnVmZmVyZWQuc3RhcnQoaSkgJiYgY3VycmVudFRpbWUgPCBidWZmZXJlZC5lbmQoaSkpIHtcbiAgICAgICAgICAgIGlzQnVmZmVyZWQgPSB0cnVlXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGlzQnVmZmVyZWQpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICBWb2RUYXNrLmNsZWFyKClcbiAgICAgIGlmICghdGhpcy5pc1NlZWthYmxlKSB7XG4gICAgICAgIHRoaXMuX3BsYXllci5jdXJyZW50VGltZSA9IHRoaXMudGVtcEN1cnJlbnRUaW1lXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcy5mbHZQbGF5ZXIuc2VlayhwbGF5ZXIuY3VycmVudFRpbWUpXG4gICAgICB0aGlzLmlzU2Vla2luZyA9IHRydWVcbiAgICB9XG4gICAgaWYgKCFvcHRpb25zLmlzTGl2ZSkge1xuICAgICAgcGxheWVyLm9uKCdzZWVraW5nJywgKCkgPT4ge1xuICAgICAgICB0aGlzLmhhbmRsZVNlZWtpbmcoKVxuICAgICAgfSlcbiAgICB9XG4gICAgdGhpcy5oYW5kbGVUaW1lVXBkYXRlID0gKCkgPT4ge1xuICAgICAgdGhpcy50ZW1wQ3VycmVudFRpbWUgPSBwbGF5ZXIuY3VycmVudFRpbWVcbiAgICAgIGlmICghdGhpcy5pc1NlZWtpbmcgJiYgdGhpcy5mbHZQbGF5ZXIuaXNNZWRpYUluZm9SZWFkeSAmJiAhdGhpcy50ZW1wRmx2UGxheWVyKSB7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3NDaGVja2VyKHBsYXllcilcbiAgICAgIH1cbiAgICAgIHRoaXMuaXNFbmRlZChwbGF5ZXIsIHRoaXMuZmx2UGxheWVyKVxuICAgIH1cbiAgICBwbGF5ZXIub24oJ3RpbWV1cGRhdGUnLCAoKSA9PiB7XG4gICAgICB0aGlzLmhhbmRsZVRpbWVVcGRhdGUoKVxuICAgIH0pXG4gICAgcGxheWVyLl9yZXBsYXkgPSAoKSA9PiB7XG4gICAgICBwbGF5ZXIubXNlLmRlc3Ryb3koKVxuICAgICAgVm9kVGFzay5jbGVhcigpXG4gICAgICBjb25zdCBfbXNlID0gbmV3IE1TRSgpXG4gICAgICB0aGlzLmZsdlBsYXllci5yZXBsYXkoKVxuXG4gICAgICBtc2Uub24oJ3NvdXJjZW9wZW4nLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuZmx2UGxheWVyLmlzU291cmNlT3BlbiA9IHRydWVcbiAgICAgICAgbXNlLmFwcGVuZEJ1ZmZlcih0aGlzLmZsdlBsYXllci5mdHlwX21vb3YuYnVmZmVyKVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBwbGF5ZXIucGxheSgpXG4gICAgICAgIH0sIDApXG4gICAgICAgIG1zZS5vbigndXBkYXRlZW5kJywgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHtwZW5kaW5nRnJhZ21lbnRzLCBoYXNQZW5kaW5nRnJhZ21lbnRzfSA9IHRoaXMuZmx2UGxheWVyXG4gICAgICAgICAgdGhpcy5pc1NlZWtpbmcgPSBmYWxzZVxuICAgICAgICAgIGlmIChoYXNQZW5kaW5nRnJhZ21lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCBmcmFnbWVudCA9IHBlbmRpbmdGcmFnbWVudHMuc2hpZnQoKVxuICAgICAgICAgICAgaWYgKCFtc2UuYXBwZW5kQnVmZmVyKGZyYWdtZW50LmRhdGEpKSB7XG4gICAgICAgICAgICAgIHBlbmRpbmdGcmFnbWVudHMudW5zaGlmdChmcmFnbWVudClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHBsYXllci5lbWl0KCdjYWNoZXVwZGF0ZScsIHBsYXllcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgICAgbXNlLm9uKCdlcnJvcicsIChlKSA9PiB7XG4gICAgICAgIHBsYXllci5lbWl0KCdlcnJvcicsIGUpXG4gICAgICB9KVxuXG4gICAgICBwbGF5ZXIubXNlID0gbXNlXG4gICAgICBwbGF5ZXIudmlkZW8uc3JjID0gdGhpcy5tc2UudXJsXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHBsYXllci5zd2l0Y2hVUkwgPSAodXJsKSA9PiB7XG4gICAgICB0aGlzLl9vcHRpb25zLnVybCA9IHVybFxuICAgICAgLy8gdGhpcy5mbHZQbGF5ZXIudW5iaW5kRXZlbnRzKClcblxuICAgICAgaWYgKCFwbGF5ZXIuY29uZmlnLmlzTGl2ZSkge1xuICAgICAgICBWb2RUYXNrLmNsZWFyKClcbiAgICAgICAgY29uc3QgdGVtcEZsdlBsYXllciA9IHRoaXMudGVtcEZsdlBsYXllciA9IG5ldyBNYWluUGFyc2VyKHRoaXMuX29wdGlvbnMsIHBsYXllcilcblxuICAgICAgICB0ZW1wRmx2UGxheWVyLmlzU291cmNlT3BlbiA9IHRydWVcbiAgICAgICAgdGVtcEZsdlBsYXllci5pc1RlbXBQbGF5ZXIgPSB0cnVlXG4gICAgICAgIHRoaXMuaW5pdEZsdlBsYXllckV2ZW50cyh0ZW1wRmx2UGxheWVyLCBtc2UpXG4gICAgICAgIHRlbXBGbHZQbGF5ZXIuaGFuZGxlTWVkaWFGcmFnbWVudCA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmlzU2Vla2luZyA9IGZhbHNlXG4gICAgICAgICAgdGhpcy51bmJpbmRGbHZQbGF5ZXJFdmVudHModGhpcy5mbHZQbGF5ZXIpXG4gICAgICAgICAgdGhpcy5mbHZQbGF5ZXIuZGVzdHJveSgpXG4gICAgICAgICAgdGhpcy5mbHZQbGF5ZXIgPSB0ZW1wRmx2UGxheWVyXG4gICAgICAgICAgdGhpcy50ZW1wRmx2UGxheWVyID0gbnVsbFxuXG4gICAgICAgICAgbXNlLmFwcGVuZEJ1ZmZlcih0ZW1wRmx2UGxheWVyLmZ0eXBfbW9vdilcbiAgICAgICAgICB0ZW1wRmx2UGxheWVyLmhhbmRsZU1lZGlhRnJhZ21lbnQgPSAoZnJhZ21lbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBtc2UuYXBwZW5kQnVmZmVyKGZyYWdtZW50LmRhdGEpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIHRlbXBGbHZQbGF5ZXIuc3RhcnRMb2FkRGF0YSgpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHVuYmluZEZsdlBsYXllckV2ZW50cyAoZmx2UGxheWVyKSB7XG4gICAgZmx2UGxheWVyLmhhbmRsZVNlZWtFbmQgPSAoKSA9PiBudWxsXG4gICAgZmx2UGxheWVyLmhhbmRsZUVycm9yID0gKCkgPT4gbnVsbFxuICAgIGZsdlBsYXllci5oYW5kbGVNZWRpYUZyYWdtZW50ID0gKCkgPT4gbnVsbFxuICB9XG4gIGluaXRGbHZQbGF5ZXJFdmVudHMgKGZsdlBsYXllciwgbXNlKSB7XG4gICAgY29uc3QgaGFuZGxlRnR5cE1vb3YgPSAoZnR5cE1vb3YpID0+IHtcbiAgICAgIGlmIChmbHZQbGF5ZXIuaXNTb3VyY2VPcGVuICYmICF0aGlzLnRlbXBGbHZQbGF5ZXIpIHtcbiAgICAgICAgbXNlLmFwcGVuZEJ1ZmZlcihmdHlwTW9vdi5idWZmZXIpXG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLmlzQ2hhbmdpbmdTcmMpIHtcbiAgICAgICAgdGhpcy5pc1NlZWtpbmcgPSB0cnVlXG4gICAgICAgIGZsdlBsYXllci5zZWVrKHRoaXMuX3BsYXllci5jdXJyZW50VGltZSlcbiAgICAgIH1cbiAgICB9XG4gICAgZmx2UGxheWVyLm9uY2UoJ3JlYWR5JywgaGFuZGxlRnR5cE1vb3YpXG4gICAgZmx2UGxheWVyLmhhbmRsZVNlZWtFbmQgPSAoKSA9PiB7XG4gICAgICB0aGlzLmlzU2Vla2luZyA9IGZhbHNlXG4gICAgfVxuICAgIGZsdlBsYXllci5oYW5kbGVFcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICB0aGlzLl9wbGF5ZXIuZW1pdCgnZXJyb3InLCBlKVxuICAgIH1cbiAgICBpZiAoIXRoaXMudGVtcEZsdlBsYXllcikge1xuICAgICAgZmx2UGxheWVyLmhhbmRsZU1lZGlhRnJhZ21lbnQgPSAoZnJhZ21lbnQpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGVtcEZsdlBsYXllciA/IGZhbHNlIDogbXNlLmFwcGVuZEJ1ZmZlcihmcmFnbWVudC5kYXRhKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGluaXRNc2VFdmVudHMgKG1zZSkge1xuICAgIG1zZS5vbignZXJyb3InLCAoZSkgPT4ge1xuICAgICAgdGhpcy5fcGxheWVyLmVtaXQoJ2Vycm9yJywgZSlcbiAgICB9KVxuICAgIGNvbnN0IG9uU291cmNlT3BlbiA9ICgpID0+IHtcbiAgICAgIHRoaXMuZmx2UGxheWVyLmlzU291cmNlT3BlbiA9IHRydWVcbiAgICAgIGlmICh0aGlzLmZsdlBsYXllci5mdHlwX21vb3YgIT09IG51bGwpIHtcbiAgICAgICAgbXNlLmFwcGVuZEJ1ZmZlcih0aGlzLmZsdlBsYXllci5mdHlwX21vb3YuYnVmZmVyKVxuICAgICAgfVxuXG4gICAgICBtc2Uub24oJ3VwZGF0ZWVuZCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgeyBwZW5kaW5nRnJhZ21lbnRzLCBoYXNQZW5kaW5nRnJhZ21lbnRzIH0gPSB0aGlzLmZsdlBsYXllclxuXG4gICAgICAgIGlmIChoYXNQZW5kaW5nRnJhZ21lbnRzKSB7XG4gICAgICAgICAgY29uc3QgZnJhZ21lbnQgPSBwZW5kaW5nRnJhZ21lbnRzLnNoaWZ0KClcbiAgICAgICAgICBpZiAoIW1zZS5hcHBlbmRCdWZmZXIoZnJhZ21lbnQuZGF0YSkpIHtcbiAgICAgICAgICAgIHBlbmRpbmdGcmFnbWVudHMudW5zaGlmdChmcmFnbWVudClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcGxheWVyLmVtaXQoJ2NhY2hldXBkYXRlJywgdGhpcy5fcGxheWVyKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgbXNlLm9uKCdzb3VyY2VvcGVuJywgb25Tb3VyY2VPcGVuKVxuICB9XG5cbiAgbG9hZERhdGEgKGN1cnJlbnRUaW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuZmx2UGxheWVyLmxvYWRTZWdtZW50cyh0cnVlLCBjdXJyZW50VGltZSwgdGhpcy5fb3B0aW9ucy5wcmVsb2FkVGltZSlcbiAgfVxuXG4gIHByb2dyZXNzQ2hlY2tlciAocGxheWVyKSB7XG4gICAgY29uc3QgeyBtaW5DYWNoZWRUaW1lLCBwcmVsb2FkVGltZSB9ID0gdGhpcy5fb3B0aW9uc1xuICAgIGNvbnN0IHJhbmdlID0gcGxheWVyLmdldEJ1ZmZlcmVkUmFuZ2UoKVxuICAgIGlmICh0aGlzLmZsdlBsYXllci52aWRlb0R1cmF0aW9uIC0gcmFuZ2VbMV0gKiB0aGlzLmZsdlBsYXllci52aWRlb1RpbWVTY2FsZSA8IDAuMSAqIHRoaXMuZmx2UGxheWVyLnZpZGVvVGltZVNjYWxlKSB7IHJldHVybiB9XG4gICAgaWYgKHJhbmdlWzFdIC0gcGxheWVyLmN1cnJlbnRUaW1lIDwgbWluQ2FjaGVkVGltZSAmJiAhdGhpcy5pc0RhdGFMb2FkaW5nKSB7XG4gICAgICB0aGlzLmlzRGF0YUxvYWRpbmcgPSB0cnVlXG4gICAgICB0aGlzLmZsdlBsYXllci5sb2FkU2VnbWVudHModHJ1ZSwgcGxheWVyLmN1cnJlbnRUaW1lLCBwcmVsb2FkVGltZSkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuaXNEYXRhTG9hZGluZyA9IGZhbHNlXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBjbGVhclBsYXllckNhY2hlICgpIHtcbiAgICBjb25zdCByYW5nZSA9IHRoaXMuX3BsYXllci5nZXRCdWZmZXJlZFJhbmdlKClcbiAgICBpZiAocmFuZ2UubGVuZ3RoID09PSAyKSB7XG4gICAgICAvLyB0aGlzLm1zZS5yZW1vdmVCdWZmZXIocmFuZ2VbMF0sIHJhbmdlWzFdKVxuICAgIH1cbiAgfVxuICBpc0VuZGVkIChwbGF5ZXIsIGZsdikge1xuICAgIGlmIChmbHYudmlkZW9EdXJhdGlvbiAtIHBsYXllci5jdXJyZW50VGltZSAqIGZsdi52aWRlb1RpbWVTY2FsZSA8IDIgKiBmbHYudmlkZW9UaW1lU2NhbGUpIHtcbiAgICAgIGNvbnN0IHJhbmdlID0gcGxheWVyLmdldEJ1ZmZlcmVkUmFuZ2UoKVxuICAgICAgaWYgKHBsYXllci5jdXJyZW50VGltZSAtIHJhbmdlWzFdIDwgMC4xKSB7XG4gICAgICAgIHRoaXMubXNlLmVuZE9mU3RyZWFtKClcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZGVzdHJveSAoKSB7XG4gICAgVm9kVGFzay5jbGVhcigpXG4gICAgdGhpcy5fb3B0aW9ucyA9IHt9XG4gICAgdGhpcy5tc2UgPSBudWxsXG4gICAgdGhpcy5pc1NlZWtpbmcgPSBmYWxzZVxuICAgIHRoaXMuaXNEYXRhTG9hZGluZyA9IGZhbHNlXG4gICAgdGhpcy50ZW1wQ3VycmVudFRpbWUgPSAwXG4gICAgdGhpcy50ZW1wRmx2UGxheWVyID0gbnVsbFxuICAgIHRoaXMuaXNDaGFuZ2luZ1NyYyA9IGZhbHNlXG4gICAgdGhpcy5oYW5kbGVUaW1lVXBkYXRlID0gKCkgPT4ge31cbiAgICB0aGlzLmhhbmRsZVNlZWtpbmcgPSAoKSA9PiB7fVxuICAgIHRoaXMuZmx2UGxheWVyLmRlc3Ryb3koKVxuICAgIHRoaXMuX3BsYXllci5wYXVzZSgpXG4gIH1cbiAgZ2V0IGlzU2Vla2FibGUgKCkge1xuICAgIHJldHVybiB0aGlzLmZsdlBsYXllci5pc1NlZWthYmxlXG4gIH1cbn1cbiIsImNvbnN0IGdldERlZmF1bHRDb25mID0gKCkgPT4gKHtcbiAgcHJlbG9hZFRpbWU6IDMwLFxuICBtaW5DYWNoZWRUaW1lOiA1LFxuICBhdXRvQ2xlYW5Tb3VyY2VCdWZmZXI6IHRydWUsXG4gIGF1dG9DbGVhbk1heEJhY2tUaW1lOiAzMCxcbiAgaXNMaXZlOiBmYWxzZSxcbiAgY29yczogdHJ1ZVxufSlcblxuZXhwb3J0IGRlZmF1bHQgZ2V0RGVmYXVsdENvbmZcbiIsImNvbnN0IGZpZWxkcyA9IFt7XG4gIG5hbWU6ICdkdXJhdGlvbicsXG4gIHR5cGU6IEJvb2xlYW4sXG4gIHBhcnNlciAodGFyZ2V0LCBvcmlnaW4pIHtcbiAgICB0YXJnZXQubWVkaWFJbmZvLmR1cmF0aW9uID0gb3JpZ2luLmR1cmF0aW9uXG4gIH1cbn0sIHtcbiAgbmFtZTogJ2hhc0F1ZGlvJyxcbiAgdHlwZTogQm9vbGVhbixcbiAgcGFyc2VyICh0YXJnZXQsIG9yaWdpbikge1xuICAgIHRhcmdldC5tZWRpYUluZm8uaGFzQXVkaW8gPSBvcmlnaW4uaGFzQXVkaW9cbiAgfVxufSwge1xuICBuYW1lOiAnaGFzVmlkZW8nLFxuICB0eXBlOiBCb29sZWFuLFxuICBwYXJzZXIgKHRhcmdldCwgb3JpZ2luKSB7XG4gICAgdGFyZ2V0Lm1lZGlhSW5mby5oYXNWaWRlbyA9IG9yaWdpbi5oYXNWaWRlb1xuICB9XG59LCB7XG4gIG5hbWU6ICdhdWRpb2RhdGFyYXRlJyxcbiAgdHlwZTogTnVtYmVyLFxuICBwYXJzZXIgKHRhcmdldCwgb3JpZ2luKSB7XG4gICAgdGFyZ2V0Lm1lZGlhSW5mby5hdWRpb0RhdGFSYXRlID0gb3JpZ2luLmF1ZGlvZGF0YXJhdGVcbiAgfVxufSwge1xuICBuYW1lOiAndmlkZW9kYXRhcmF0ZScsXG4gIHR5cGU6IE51bWJlcixcbiAgcGFyc2VyICh0YXJnZXQsIG9yaWdpbikge1xuICAgIHRhcmdldC5tZWRpYUluZm8udmlkZW9EYXRhUmF0ZSA9IG9yaWdpbi52aWRlb2RhdGFyYXRlXG4gIH1cbn0sIHtcbiAgbmFtZTogJ3dpZHRoJyxcbiAgdHlwZTogTnVtYmVyLFxuICBwYXJzZXIgKHRhcmdldCwgb3JpZ2luKSB7XG4gICAgdGFyZ2V0Lm1lZGlhSW5mby53aWR0aCA9IG9yaWdpbi53aWR0aFxuICB9XG59LCB7XG4gIG5hbWU6ICdoZWlnaHQnLFxuICB0eXBlOiBOdW1iZXIsXG4gIHBhcnNlciAodGFyZ2V0LCBvcmlnaW4pIHtcbiAgICB0YXJnZXQubWVkaWFJbmZvLmhlaWdodCA9IG9yaWdpbi5oZWlnaHRcbiAgfVxufSwge1xuICBuYW1lOiAnZHVyYXRpb24nLFxuICB0eXBlOiBOdW1iZXIsXG4gIHBhcnNlciAodGFyZ2V0LCBvcmlnaW4pIHtcbiAgICBpZiAoIXRhcmdldC5zdGF0ZS5kdXJhdGlvbikge1xuICAgICAgY29uc3QgZHVyYXRpb24gPSBNYXRoLmZsb29yKG9yaWdpbi5kdXJhdGlvbiAqIHRhcmdldC5zdGF0ZS50aW1lU2NhbGUpXG4gICAgICB0YXJnZXQuc3RhdGUuZHVyYXRpb24gPSB0YXJnZXQubWVkaWFJbmZvLmR1cmF0aW9uID0gZHVyYXRpb25cbiAgICB9XG4gIH0sXG4gIG9uVHlwZUVyciAodGFyZ2V0KSB7XG4gICAgdGFyZ2V0Lm1lZGlhSW5mby5kdXJhdGlvbiA9IDBcbiAgfVxufSwge1xuICBuYW1lOiAnZnJhbWVyYXRlJyxcbiAgdHlwZTogTnVtYmVyLFxuICBwYXJzZXIgKHRhcmdldCwgb3JpZ2luKSB7XG4gICAgY29uc3QgZnBzTnVtID0gTWF0aC5mbG9vcihvcmlnaW4uZnJhbWVyYXRlICogMTAwMClcbiAgICBpZiAoZnBzTnVtID4gMCkge1xuICAgICAgY29uc3QgZnBzID0gZnBzTnVtIC8gMTAwMFxuICAgICAgY29uc3QgeyByZWZlckZyYW1lUmF0ZSwgbWVkaWFJbmZvIH0gPSB0YXJnZXRcbiAgICAgIHJlZmVyRnJhbWVSYXRlLmZpeGVkID0gdHJ1ZVxuICAgICAgcmVmZXJGcmFtZVJhdGUuZnBzID0gZnBzXG4gICAgICByZWZlckZyYW1lUmF0ZS5mcHNOdW0gPSBmcHNOdW1cbiAgICAgIHJlZmVyRnJhbWVSYXRlLmZwc0RlbiA9IDEwMDBcbiAgICAgIG1lZGlhSW5mby5mcHMgPSBmcHNcbiAgICB9XG4gIH1cbn0sIHtcbiAgbmFtZTogJ2tleWZyYW1lcycsXG4gIHR5cGU6IE9iamVjdCxcbiAgcGFyc2VyICh0YXJnZXQsIG9yaWdpbikge1xuICAgIGNvbnN0IHsga2V5ZnJhbWVzIH0gPSBvcmlnaW5cbiAgICB0YXJnZXQubWVkaWFJbmZvLmhhc0tleWZyYW1lcyA9ICEha2V5ZnJhbWVzXG4gICAgaWYgKGtleWZyYW1lcykge1xuICAgICAgdGFyZ2V0Lm1lZGlhSW5mby5rZXlmcmFtZXMgPSB0aGlzLl9wYXJzZUtleWZyYW1lcyhrZXlmcmFtZXMpXG4gICAgfVxuICAgIG9yaWdpbi5rZXlmcmFtZXMgPSBudWxsXG4gIH0sXG4gIG9uVHlwZUVyciAodGFyZ2V0KSB7XG4gICAgdGFyZ2V0Lm1lZGlhSW5mby5oYXNLZXlmcmFtZXMgPSBmYWxzZVxuICB9XG59XVxuZXhwb3J0IGRlZmF1bHQgZmllbGRzXG4iLCJleHBvcnQgY29uc3QgTWV0YVR5cGVzID0ge1xuICBOVU1CRVI6IDAsXG4gIEJPT0xFQU46IDEsXG4gIFNUUklORzogMixcbiAgT0JKRUNUOiAzLFxuICBNSVhfQVJSQVk6IDgsXG4gIE9CSkVDVF9FTkQ6IDksXG4gIFNUUklDVF9BUlJBWTogMTAsXG4gIERBVEU6IDExLFxuICBMT05FX1NUUklORzogMTJcbn1cblxuZXhwb3J0IGNvbnN0IEV2ZW50VHlwZXMgPSB7XG4gIERBVEFfUkVBRFk6ICdkYXRhX3JlYWR5JyxcbiAgTUVUQV9EQVRBX1JFQURZOiAnbWV0YV9kYXRhX3JlYWR5JyxcbiAgVFJBQ0tfTUVUQV9SRUFEWTogJ3RyYWNrX21ldGFfcmVhZHknLFxuICBNRURJQV9JTkZPX1JFQURZOiAnbWVkaWFfaW5mb19yZWFkeScsXG4gIE1FVEFfRU5EX1BPU0lUSU9OOiAnbWV0YV9lbmRfcG9zaXRpb24nLFxuICBFUlJPUjogJ2Vycm9yJ1xufVxuXG5leHBvcnQgY29uc3Qgc291bmRSYXRlVHlwZXMgPSBbXG4gIDU1MDAsXG4gIDExMDAwLFxuICAyMjAwMCxcbiAgNDQwMFxuXVxuXG5leHBvcnQgY29uc3QgQXVkaW9PYmplY3RUeXBlcyA9IHtcbiAgMDogJ051bGwnLFxuICAxOiAnQUFDIE1haW4nLFxuICAyOiAnQUFDIExDJyxcbiAgMzogJ0FBQyBTU1IoU2NhbGFibGUgU2FtcGxlIFJhdGUpJyxcbiAgNDogJ0FBQyBMVFAoTG9uZyBUZXJtIFByZWRpY3Rpb24pJyxcbiAgNTogJ0hFLUFBQyAvIFNCUihTcGVjdHJhbCBCYW5kIFJlcGxpY2F0aW9uKScsXG4gIDY6ICdBQUMgU2NhbGFibGUnXG59XG5cbmV4cG9ydCBjb25zdCBzYW1wbGluZ0ZyZXF1ZW5jeVR5cGVzID0gW1xuICA5NjAwMCwgODgyMDAsXG4gIDY0MDAwLCA0ODAwMCxcbiAgNDQxMDAsIDMyMDAwLFxuICAyNDAwMCwgMjIwNTAsXG4gIDE2MDAwLCAxMjAwMCxcbiAgMTEwMjUsIDgwMDBcbl1cblxuZXhwb3J0IGNvbnN0IGJyb3dzZXJUeXBlcyA9IHtcbiAgSUU6ICdpZScsXG4gIEZJUkVfRk9YOiAnZmlyZWZveCcsXG4gIENIUk9NRTogJ2Nocm9tZScsXG4gIE9QRVJBOiAnb3BlcmEnLFxuICBTQUZBUkk6ICdzYWZhcmknXG59XG5cbmV4cG9ydCBjb25zdCBtcDNWZXJzaW9ucyA9IHtcbiAgVjI1OiAwLFxuICBSRVNFUlZFRDogMSxcbiAgVjIwOiAyLFxuICBWMTA6IDNcbn1cblxuZXhwb3J0IGNvbnN0IGF1ZGlvU2FtcGxlUmF0ZSA9IHtcbiAgVjEwOiBbNDQxMDAsIDQ4MDAwLCAzMjAwMCwgMF0sXG4gIFYyMDogWzIyMDUwLCAyNDAwMCwgMTYwMDAsIDBdLFxuICBWMjU6IFsxMTAyNSwgMTIwMDAsIDgwMDAsIDBdXG59XG5cbmV4cG9ydCBjb25zdCBtcDNCaXRSYXRlID0ge1xuICBMYXllcjE6IFswLCAzMiwgNjQsIDk2LCAxMjgsIDE2MCwgMTkyLCAyMjQsIDI1NiwgMjg4LCAzMjAsIDM1MiwgMzg0LCA0MTYsIDQ0OCwgLTFdLFxuICBMYXllcjI6IFswLCAzMiwgNDgsIDU2LCA2NCwgODAsIDk2LCAxMTIsIDEyOCwgMTYwLCAxOTIsIDIyNCwgMjU2LCAzMjAsIDM4NCwgLTFdLFxuICBMYXllcjM6IFswLCAzMiwgNDAsIDQ4LCA1NiwgNjQsIDgwLCA5NiwgMTEyLCAxMjgsIDE2MCwgMTkyLCAyMjQsIDI1NiwgMzIwLCAtMV1cbn1cbiIsImltcG9ydCBQbGF5ZXIgZnJvbSAneGdwbGF5ZXInXG5pbXBvcnQgVm9kVGFzayBmcm9tICcuL3Rhc2tzL1ZvZFRhc2snXG5pbXBvcnQgRmx2IGZyb20gJy4vRmx2J1xuXG5jbGFzcyBGbHZQbGF5ZXIgZXh0ZW5kcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvciAob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLl9fZmx2X18gPSBudWxsXG4gICAgdGhpcy5pbml0KG9wdGlvbnMpXG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3NyYycsIHtcbiAgICAgIHNldDogKHZhbCkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgJiYgdmFsLnN0YXJ0c1dpdGgoJ2Jsb2I6JykpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9vcHRpb25zLnVybCA9IHZhbFxuICAgICAgICB0aGlzLl9fZmx2X18uZGVzdHJveSgpXG4gICAgICAgIHRoaXMuX19mbHZfXyA9IG5ldyBGbHYodGhpcy5fb3B0aW9ucywgdGhpcylcbiAgICAgICAgdGhpcy5fX2Zsdl9fLmxvYWQoKVxuICAgICAgICB0aGlzLnZpZGVvLnNyYyA9IHRoaXMuX19mbHZfXy5tc2UudXJsXG4gICAgICAgIHRoaXMuY3VycmVudFRpbWUgPSAwXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMucGxheSgpXG4gICAgICAgIH0sIDApXG4gICAgICB9LFxuICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zLnVybFxuICAgICAgfSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pXG5cbiAgICBpZiAob3B0aW9ucy5hdXRvcGxheSkge1xuICAgICAgdGhpcy5zdGFydCgpXG4gICAgfVxuICB9XG5cbiAgaW5pdCAob3B0aW9ucykge1xuICAgIGNvbnN0IHBsYXllciA9IHRoaXNcbiAgICBjb25zdCB7IGlzTGl2ZSB9ID0gb3B0aW9uc1xuICAgIHBsYXllci5fX2Zsdl9fID0gbmV3IEZsdihvcHRpb25zLCBwbGF5ZXIpXG4gICAgcGxheWVyLm9uY2UoJ2NvbXBsZXRlJywgKCkgPT4ge1xuICAgICAgcGxheWVyLmNyZWF0ZUluc3RhbmNlKHBsYXllci5fX2Zsdl9fKVxuICAgIH0pXG4gICAgcGxheWVyLm9uKCdwYXVzZScsICgpID0+IHtcbiAgICAgICFpc0xpdmUgJiYgVm9kVGFzay5jbGVhcigpXG4gICAgfSlcbiAgICB0aGlzLm9uY2UoJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgICBWb2RUYXNrLmNsZWFyKClcbiAgICAgIHBsYXllci5fX2Zsdl9fLmRlc3Ryb3koKVxuICAgICAgcGxheWVyLl9fZmx2X18ubXNlID0gbnVsbFxuICAgICAgcGxheWVyLnZpZGVvLnNyYyA9ICcnXG4gICAgICBwbGF5ZXIuX19mbHZfXyA9IG51bGxcbiAgICB9KVxuICB9XG5cbiAgY3JlYXRlSW5zdGFuY2UgKGZsdikge1xuICAgIGNvbnN0IHBsYXllciA9IHRoaXNcbiAgICBpZiAodGhpcy5fb3B0aW9ucy5pc0xpdmUpIHtcbiAgICAgIFBsYXllci51dGlsLmFkZENsYXNzKHBsYXllci5yb290LCAneGdwbGF5ZXItaXMtbGl2ZScpXG4gICAgICBjb25zdCBsaXZlID0gUGxheWVyLnV0aWwuY3JlYXRlRG9tKCd4Zy1saXZlJywgJ+ato+WcqOebtOaSrScsIHt9LCAneGdwbGF5ZXItbGl2ZScpXG4gICAgICBwbGF5ZXIuY29udHJvbHMuYXBwZW5kQ2hpbGQobGl2ZSlcbiAgICB9XG4gICAgZmx2LmxvYWQoKVxuICB9XG5cbiAgc3RhcnQgKCkge1xuICAgIGlmICghdGhpcy5pbml0ZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBmbHZQbGF5ZXIgPSB0aGlzLl9fZmx2X19cbiAgICBzdXBlci5zdGFydChmbHZQbGF5ZXIubXNlLnVybClcbiAgICB0aGlzLnNyYyA9IGZsdlBsYXllci5tc2UudXJsXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGdldCBpbml0ZWQgKCkge1xuICAgIHJldHVybiB0aGlzLl9fZmx2X18gIT09IHVuZGVmaW5lZFxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRmx2UGxheWVyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNZWRpYUluZm8ge1xuICAgIGNvbnN0cnVjdG9yIChkYXRhKSB7XG4gICAgICAgIGNvbnN0IF9kZWZhdWx0ID0ge1xuICAgICAgICAgICAgbWltZVR5cGU6IG51bGwsXG4gICAgICAgICAgICBjb2RlYzogJycsXG4gICAgICAgICAgICBkdXJhdGlvbjogbnVsbCxcbiAgICAgICAgICAgIGhhc0F1ZGlvOiBmYWxzZSxcbiAgICAgICAgICAgIGhhc1ZpZGVvOiBmYWxzZSxcbiAgICAgICAgICAgIGF1ZGlvQ29kZWM6IG51bGwsXG4gICAgICAgICAgICB2aWRlb0NvZGVjOiBudWxsLFxuXG4gICAgICAgICAgICB2aWRlb0RhdGFSYXRlOiBudWxsLFxuICAgICAgICAgICAgYXVkaW9EYXRhUmF0ZTogbnVsbCxcbiAgICAgICAgICAgIGF1ZGlvU2FtcGxlUmF0ZTogbnVsbCxcbiAgICAgICAgICAgIGF1ZGlvQ2hhbm5lbENvdW50OiBudWxsLFxuICAgICAgICAgICAgYXVkaW9Db25maWc6IG51bGwsXG5cbiAgICAgICAgICAgIHdpZHRoOiBudWxsLFxuICAgICAgICAgICAgaGVpZ2h0OiBudWxsLFxuICAgICAgICAgICAgZnBzOiBudWxsLFxuICAgICAgICAgICAgcHJvZmlsZTogbnVsbCxcbiAgICAgICAgICAgIGxldmVsOiBudWxsLFxuICAgICAgICAgICAgY2hyb21hRm9ybWF0OiBudWxsLFxuXG4gICAgICAgICAgICBwaXhlbFJhdGlvOiBbXSxcblxuICAgICAgICAgICAgX21ldGFEYXRhOiBudWxsLFxuICAgICAgICAgICAgc2VnbWVudHM6IFtdLFxuICAgICAgICAgICAgaGFzS2V5ZnJhbWVzOiBudWxsLFxuICAgICAgICAgICAga2V5ZnJhbWVzOiBbXSxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBpbml0RGF0YSA9ICBPYmplY3QuYXNzaWduKHt9LCBfZGVmYXVsdCwgZGF0YSk7XG4gICAgICAgIE9iamVjdC5lbnRyaWVzKGluaXREYXRhKS5mb3JFYWNoKChbaywgdl0pPT4ge1xuICAgICAgICAgICAgdGhpc1trXSA9IHY7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuICAgIGdldCBpc0NvbXBsZXRlICgpIHtcbiAgICAgICAgY29uc3QgeyBtaW1lVHlwZSwgZHVyYXRpb24sIGhhc0tleWZyYW1lcyB9ID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG1pbWVUeXBlICE9PSBudWxsXG4gICAgICAgICAgICAmJiBkdXJhdGlvbiAhPT0gbnVsbFxuICAgICAgICAgICAgJiYgaGFzS2V5ZnJhbWVzICE9PSBudWxsXG4gICAgICAgICAgICAmJiB0aGlzLmlzVmlkZW9JbmZvRmlsbGVkXG4gICAgICAgICAgICAmJiB0aGlzLmlzQXVkaW9JbmZvRmlsbGVkO1xuICAgIH1cbiAgICBnZXQgaXNBdWRpb0luZm9GaWxsZWQgKCkge1xuICAgICAgICBjb25zdCB7IGhhc0F1ZGlvLFxuICAgICAgICAgICAgYXVkaW9Db2RlYyxcbiAgICAgICAgICAgIGF1ZGlvU2FtcGxlUmF0ZSxcbiAgICAgICAgICAgIGF1ZGlvQ2hhbm5lbENvdW50LFxuICAgICAgICB9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gISEoIWhhc0F1ZGlvIHx8IChoYXNBdWRpbyAmJiBhdWRpb0NvZGVjICYmIGF1ZGlvU2FtcGxlUmF0ZSAmJiBhdWRpb0NoYW5uZWxDb3VudCkpO1xuXG4gICAgfVxuXG4gICAgZ2V0IGlzVmlkZW9JbmZvRmlsbGVkICgpIHtcbiAgICAgICAgY29uc3Qgbm90TnVsbEZpZWxkcyA9IFtcbiAgICAgICAgICAgICd2aWRlb0NvZGVjJyxcbiAgICAgICAgICAgICd3aWR0aCcsXG4gICAgICAgICAgICAnaGVpZ2h0JyxcbiAgICAgICAgICAgICdmcHMnLFxuICAgICAgICAgICAgJ3Byb2ZpbGUnLFxuICAgICAgICAgICAgJ2xldmVsJyxcbiAgICAgICAgICAgICdjaHJvbWFGb3JtYXQnLFxuICAgICAgICBdO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gbm90TnVsbEZpZWxkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXNbbm90TnVsbEZpZWxkc1tpXV0gPT09IG51bGwpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5oYXNWaWRlbztcbiAgICB9XG5cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNZWRpYVNhbXBsZSB7XG4gICAgY29uc3RydWN0b3IgKGluZm8pIHtcbiAgICAgICAgbGV0IF9kZWZhdWx0ID0gTWVkaWFTYW1wbGUuZ2V0RGVmYXVsdEluZigpO1xuXG4gICAgICAgIGlmICghaW5mbyB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5mbykgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgICAgICByZXR1cm4gX2RlZmF1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNhbXBsZSA9IE9iamVjdC5hc3NpZ24oe30sIF9kZWZhdWx0LCBpbmZvKTtcblxuICAgICAgICBPYmplY3QuZW50cmllcyhzYW1wbGUpLmZvckVhY2goKFtrLCB2XSkgPT4ge1xuICAgICAgICAgICAgdGhpc1trXSA9IHY7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgc3RhdGljIGdldERlZmF1bHRJbmYgKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZHRzOiBudWxsLFxuICAgICAgICAgICAgcHRzOiBudWxsLFxuICAgICAgICAgICAgZHVyYXRpb246IG51bGwsXG4gICAgICAgICAgICBwb3NpdGlvbjogbnVsbCxcbiAgICAgICAgICAgIGlzUkFQOiBmYWxzZSwgLy8gaXMgUmFuZG9tIGFjY2VzcyBwb2ludFxuICAgICAgICAgICAgb3JpZ2luRHRzOiBudWxsLFxuICAgICAgICB9O1xuICAgIH1cblxufVxuXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNZWRpYVNlZ21lbnQge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgdGhpcy5zdGFydER0cyA9IC0xO1xuICAgICAgICB0aGlzLmVuZER0cyA9IC0xO1xuICAgICAgICB0aGlzLnN0YXJ0UHRzID0gLTE7XG4gICAgICAgIHRoaXMuZW5kUHRzID0gLTE7XG4gICAgICAgIHRoaXMub3JpZ2luU3RhcnREdHMgPSAtMTtcbiAgICAgICAgdGhpcy5vcmlnaW5FbmREdHMgPSAtMTtcbiAgICAgICAgdGhpcy5yYW5kb21BY2Nlc3NQb2ludHMgPSBbXTtcbiAgICAgICAgdGhpcy5maXJzdFNhbXBsZSA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdFNhbXBsZSA9IG51bGw7XG4gICAgfVxuXG4gICAgYWRkUkFQIChzYW1wbGUpIHtcbiAgICAgICAgc2FtcGxlLmlzUkFQID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yYW5kb21BY2Nlc3NQb2ludHMucHVzaChzYW1wbGUpO1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNZWRpYVNlZ21lbnRMaXN0IHtcblxuICAgIGNvbnN0cnVjdG9yICh0eXBlKSB7XG4gICAgICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLl9saXN0ID0gW107XG4gICAgICAgIHRoaXMuX2xhc3RBcHBlbmRMb2NhdGlvbiA9IC0xOyAvLyBjYWNoZWQgbGFzdCBpbnNlcnQgbG9jYXRpb25cbiAgICB9XG5cbiAgICBnZXQgdHlwZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90eXBlO1xuICAgIH1cblxuICAgIGdldCBsZW5ndGggKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGlzdC5sZW5ndGg7XG4gICAgfVxuXG4gICAgaXNFbXB0eSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0Lmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICBjbGVhciAoKSB7XG4gICAgICAgIHRoaXMuX2xpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5fbGFzdEFwcGVuZExvY2F0aW9uID0gLTE7XG4gICAgfVxuXG4gICAgX3NlYXJjaE5lYXJlc3RTZWdtZW50QmVmb3JlIChiZWdpbkR0cykge1xuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuX2xpc3Q7XG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIC0yO1xuICAgICAgICB9XG4gICAgICAgIGxldCBsYXN0ID0gbGlzdC5sZW5ndGggLSAxO1xuICAgICAgICBsZXQgbWlkID0gMDtcbiAgICAgICAgbGV0IGxib3VuZCA9IDA7XG4gICAgICAgIGxldCB1Ym91bmQgPSBsYXN0O1xuXG4gICAgICAgIGxldCBpZHggPSAwO1xuXG4gICAgICAgIGlmIChiZWdpbkR0cyA8IGxpc3RbMF0ub3JpZ2luRHRzKSB7XG4gICAgICAgICAgICBpZHggPSAtMTtcbiAgICAgICAgICAgIHJldHVybiBpZHg7XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAobGJvdW5kIDw9IHVib3VuZCkge1xuICAgICAgICAgICAgbWlkID0gbGJvdW5kICsgTWF0aC5mbG9vcigodWJvdW5kIC0gbGJvdW5kKSAvIDIpO1xuICAgICAgICAgICAgaWYgKG1pZCA9PT0gbGFzdCB8fCAoYmVnaW5EdHMgPiBsaXN0W21pZF0ubGFzdFNhbXBsZS5vcmlnaW5EdHNcbiAgICAgICAgICAgICAgICAgICAgJiYgKGJlZ2luRHRzIDwgbGlzdFttaWQgKyAxXS5vcmlnaW5EdHMpKSkge1xuICAgICAgICAgICAgICAgIGlkeCA9IG1pZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGlzdFttaWRdLm9yaWdpbkR0cyA8IGJlZ2luRHRzKSB7XG4gICAgICAgICAgICAgICAgbGJvdW5kID0gbWlkICsgMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdWJvdW5kID0gbWlkIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaWR4O1xuICAgIH1cblxuICAgIF9zZWFyY2hOZWFyZXN0U2VnbWVudEFmdGVyIChiZWdpbkR0cykge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUoYmVnaW5EdHMpICsgMTtcbiAgICB9XG5cbiAgICBhcHBlbmQgKHNlZ21lbnQpIHtcbiAgICAgICAgbGV0IGxpc3QgPSB0aGlzLl9saXN0O1xuICAgICAgICBsZXQgbGFzdEFwcGVuZElkeCA9IHRoaXMuX2xhc3RBcHBlbmRMb2NhdGlvbjtcbiAgICAgICAgbGV0IGluc2VydElkeCA9IDA7XG5cbiAgICAgICAgaWYgKGxhc3RBcHBlbmRJZHggIT09IC0xICYmIGxhc3RBcHBlbmRJZHggPCBsaXN0Lmxlbmd0aFxuICAgICAgICAgICAgJiYgc2VnbWVudC5vcmlnaW5TdGFydER0cyA+PSBsaXN0W2xhc3RBcHBlbmRJZHhdLmxhc3RTYW1wbGUub3JpZ2luRHRzXG4gICAgICAgICAgICAmJiAoKGxhc3RBcHBlbmRJZHggPT09IGxpc3QubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgICAgICB8fCAobGFzdEFwcGVuZElkeCA8IGxpc3QubGVuZ3RoIC0gMVxuICAgICAgICAgICAgICAgICAgICAmJiBzZWdtZW50Lm9yaWdpblN0YXJ0RHRzIDwgbGlzdFtsYXN0QXBwZW5kSWR4ICsgMV0ub3JpZ2luU3RhcnREdHMpKSkge1xuICAgICAgICAgICAgaW5zZXJ0SWR4ID0gbGFzdEFwcGVuZElkeCArIDE7IC8vIHVzZSBjYWNoZWQgbG9jYXRpb24gaWR4XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAobGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaW5zZXJ0SWR4ID0gdGhpcy5fc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUoc2VnbWVudC5vcmlnaW5TdGFydER0cykgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbGFzdEFwcGVuZExvY2F0aW9uID0gaW5zZXJ0SWR4O1xuICAgICAgICB0aGlzLl9saXN0LnNwbGljZShpbnNlcnRJZHgsIDAsIHNlZ21lbnQpO1xuICAgIH1cblxuICAgIGdldExhc3RTZWdtZW50QmVmb3JlIChiZWdpbkR0cykge1xuICAgICAgICBsZXQgaWR4ID0gdGhpcy5fc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUoYmVnaW5EdHMpO1xuICAgICAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0W2lkeF07XG4gICAgICAgIH0gZWxzZSB7IC8vIC0xXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldExhc3RTYW1wbGVCZWZvcmUgKGJlZ2luRHRzKSB7XG4gICAgICAgIGxldCBzZWdtZW50ID0gdGhpcy5nZXRMYXN0U2VnbWVudEJlZm9yZShiZWdpbkR0cyk7XG4gICAgICAgIGlmIChzZWdtZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VnbWVudC5sYXN0U2FtcGxlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRMYXN0UkFQQmVmb3JlIChiZWdpbkR0cykge1xuICAgICAgICBsZXQgc2VnbWVudElkeCA9IHRoaXMuX3NlYXJjaE5lYXJlc3RTZWdtZW50QmVmb3JlKGJlZ2luRHRzKTtcbiAgICAgICAgbGV0IHJhbmRvbUFjY2Vzc1BvaW50cyA9IHRoaXMuX2xpc3Rbc2VnbWVudElkeF0ucmFuZG9tQWNjZXNzUG9pbnRzO1xuICAgICAgICB3aGlsZSAocmFuZG9tQWNjZXNzUG9pbnRzLmxlbmd0aCA9PT0gMCAmJiBzZWdtZW50SWR4ID4gMCkge1xuICAgICAgICAgICAgc2VnbWVudElkeC0tO1xuICAgICAgICAgICAgcmFuZG9tQWNjZXNzUG9pbnRzID0gdGhpcy5fbGlzdFtzZWdtZW50SWR4XS5yYW5kb21BY2Nlc3NQb2ludHM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhbmRvbUFjY2Vzc1BvaW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gcmFuZG9tQWNjZXNzUG9pbnRzW3JhbmRvbUFjY2Vzc1BvaW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG59IiwiaW1wb3J0IE1lZGlhSW5mbyBmcm9tICcuL01lZGlhSW5mbydcbmltcG9ydCBzbmlmZmVyIGZyb20gJy4uL3V0aWxzL3NuaWZmZXInXG5jbGFzcyBTdG9yZSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcblxuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzTGU6IHNuaWZmZXIuaXNMZSxcbiAgICAgIF9oYXNBdWRpbzogZmFsc2UsXG4gICAgICBfaGFzVmlkZW86IGZhbHNlLFxuICAgICAgX21lZGlhSW5mbzogbmV3IE1lZGlhSW5mbygpLFxuICAgICAgX21ldGFEYXRhOiBudWxsLFxuICAgICAgX3ZpZGVvVHJhY2s6IHt0eXBlOiAndmlkZW8nLCBpZDogMSwgc2FtcGxlczogW10sIGxlbmd0aDogMH0sXG4gICAgICBfYXVkaW9UcmFjazoge3R5cGU6ICdhdWRpbycsIGlkOiAyLCBzYW1wbGVzOiBbXSwgbGVuZ3RoOiAwfSxcbiAgICAgIF92aWRlb01ldGFEYXRhOiBudWxsLFxuICAgICAgX2F1ZGlvTWV0YURhdGE6IG51bGwsXG4gICAgICBfYXVkaW9Jbml0aWFsTWV0YWRhdGFEaXNwYXRjaGVkOiBmYWxzZSxcbiAgICAgIF92aWRlb0luaXRpYWxNZXRhZGF0YURpc3BhdGNoZWQ6IGZhbHNlLFxuICAgICAgdGFnczogW10sXG4gICAgICB0aW1lU3RhbXBCYXNlOiAwLFxuICAgICAgaGFzVmlkZW9GbGFnT3ZlcnJpZGVkOiBmYWxzZSxcbiAgICAgIGhhc0F1ZGlvRmxhZ092ZXJyaWRlZDogZmFsc2UsXG4gICAgICB0aW1lU2NhbGU6IDEwMDAsXG4gICAgICBkdXJhdGlvbjogMCxcbiAgICAgIGlzTGl2ZTogZmFsc2UsXG4gICAgICBkdXJhdGlvbk92ZXJyaWRlZDogZmFsc2UsXG4gICAgICBuYWx1TGVuZ3RoU2l6ZTogNCxcbiAgICAgIF9yZWZlckZyYW1lUmF0ZToge1xuICAgICAgICBmaXhlZDogdHJ1ZSxcbiAgICAgICAgZnBzOiAyMy45NzYsXG4gICAgICAgIGZwc051bTogMjM5NzYsXG4gICAgICAgIGZwc0RlbjogMTAwMFxuICAgICAgfSxcbiAgICAgIG1ldGFFbmRQb3NpdGlvbjogLTFcbiAgICB9XG5cbiAgICB0aGlzLm1ldGhvZHMgPSB7XG4gICAgICBfaXNJbml0aWFsTWV0YWRhdGFEaXNwYXRjaGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBfaGFzQXVkaW8sXG4gICAgICAgICAgX2hhc1ZpZGVvLFxuICAgICAgICAgIF9hdWRpb0luaXRpYWxNZXRhZGF0YURpc3BhdGNoZWQsXG4gICAgICAgICAgX3ZpZGVvSW5pdGlhbE1ldGFkYXRhRGlzcGF0Y2hlZFxuICAgICAgICB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICBpZiAoX2hhc0F1ZGlvICYmIF9oYXNWaWRlbykgeyAvLyBib3RoIGF1ZGlvICYgdmlkZW9cbiAgICAgICAgICByZXR1cm4gX2F1ZGlvSW5pdGlhbE1ldGFkYXRhRGlzcGF0Y2hlZCAmJiBfdmlkZW9Jbml0aWFsTWV0YWRhdGFEaXNwYXRjaGVkXG4gICAgICAgIH1cbiAgICAgICAgaWYgKF9oYXNBdWRpbyAmJiAhX2hhc1ZpZGVvKSB7IC8vIGF1ZGlvIG9ubHlcbiAgICAgICAgICByZXR1cm4gdGhpcy5fYXVkaW9Jbml0aWFsTWV0YWRhdGFEaXNwYXRjaGVkXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFfaGFzQXVkaW8gJiYgX2hhc1ZpZGVvKSB7IC8vIHZpZGVvIG9ubHlcbiAgICAgICAgICByZXR1cm4gX3ZpZGVvSW5pdGlhbE1ldGFkYXRhRGlzcGF0Y2hlZFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgfVxuICB9XG5cbiAgY2xlYXJUYWdzICgpIHtcbiAgICB0aGlzLnN0YXRlLnRhZ3MgPSBbXVxuICB9XG4gIGdldCByZWZlckZyYW1lUmF0ZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuX3JlZmVyRnJhbWVSYXRlXG4gIH1cblxuICBzZXQgcmVmZXJGcmFtZVJhdGUgKHZhbCkge1xuICAgIHRoaXMuc3RhdGUuX3JlZmVyRnJhbWVSYXRlID0gdmFsXG4gIH1cblxuICBzZXQgbWVkaWFJbmZvIChtZWRpYUluZm8pIHtcbiAgICB0aGlzLnN0YXRlLl9tZWRpYUluZm8gPSBtZWRpYUluZm9cbiAgfVxuXG4gIGdldCBtZWRpYUluZm8gKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLl9tZWRpYUluZm9cbiAgfVxuXG4gIGdldCBtZXRhRGF0YSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuX21ldGFEYXRhXG4gIH1cblxuICBnZXQgaGFzTWV0YURhdGEgKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLl9tZXRhRGF0YSAhPT0gbnVsbFxuICB9XG5cbiAgc2V0IG1ldGFEYXRhICh2KSB7XG4gICAgdGhpcy5zdGF0ZS5fbWV0YURhdGEgPSB2XG4gIH1cblxuICBzZXQgYXVkaW9UcmFjayAodmFsKSB7XG4gICAgdGhpcy5zdGF0ZS5fYXVkaW9UcmFjayA9IHZhbFxuICB9XG5cbiAgZ2V0IGF1ZGlvVHJhY2sgKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLl9hdWRpb1RyYWNrXG4gIH1cblxuICBzZXQgdmlkZW9UcmFjayAodmFsKSB7XG4gICAgdGhpcy5zdGF0ZS5fdmlkZW9UcmFjayA9IHZhbFxuICB9XG5cbiAgZ2V0IHZpZGVvVHJhY2sgKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLl92aWRlb1RyYWNrXG4gIH1cblxuICBzZXQgaGFzQXVkaW8gKHZhbCkge1xuICAgIHRoaXMuc3RhdGUuX2hhc0F1ZGlvID0gdmFsXG4gICAgdGhpcy5zdGF0ZS5fbWVkaWFJbmZvLmhhc0F1ZGlvID0gdmFsXG4gIH1cblxuICBnZXQgaGFzQXVkaW8gKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLl9oYXNBdWRpb1xuICB9XG5cbiAgc2V0IGhhc1ZpZGVvICh2YWwpIHtcbiAgICB0aGlzLnN0YXRlLl9oYXNWaWRlbyA9IHZhbFxuICAgIHRoaXMuc3RhdGUuX21lZGlhSW5mby5oYXNWaWRlbyA9IHZhbFxuICB9XG5cbiAgZ2V0IGhhc1ZpZGVvICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5faGFzVmlkZW9cbiAgfVxuXG4gIHNldCB2aWRlb01ldGFEYXRhICh2YWwpIHtcbiAgICB0aGlzLnN0YXRlLl92aWRlb01ldGFEYXRhID0gdmFsXG4gIH1cblxuICBnZXQgdmlkZW9NZXRhRGF0YSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuX3ZpZGVvTWV0YURhdGFcbiAgfVxuXG4gIHNldCBhdWRpb01ldGFEYXRhICh2YWwpIHtcbiAgICB0aGlzLnN0YXRlLl9hdWRpb01ldGFEYXRhID0gdmFsXG4gIH1cblxuICBnZXQgYXVkaW9NZXRhRGF0YSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuX2F1ZGlvTWV0YURhdGFcbiAgfVxuXG4gIGdldCBrZXlmcmFtZXMgKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLl9tZWRpYUluZm8ua2V5ZnJhbWVzXG4gIH1cbiAgZ2V0IGlzU2Vla2FibGUgKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLl9tZWRpYUluZm8uaGFzS2V5ZnJhbWVzXG4gIH1cblxuICBnZXQgaXNMZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuaXNMZVxuICB9XG4gIGdldCBoYXNJbml0aWFsTWV0YURpc3BhdGNoZWQgKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIF9oYXNBdWRpbyxcbiAgICAgIF9oYXNWaWRlbyxcbiAgICAgIF9hdWRpb0luaXRpYWxNZXRhZGF0YURpc3BhdGNoZWQsXG4gICAgICBfdmlkZW9Jbml0aWFsTWV0YWRhdGFEaXNwYXRjaGVkXG4gICAgfSA9IHRoaXMuc3RhdGVcbiAgICBpZiAoX2hhc0F1ZGlvICYmIF9oYXNWaWRlbykge1xuICAgICAgcmV0dXJuIF9hdWRpb0luaXRpYWxNZXRhZGF0YURpc3BhdGNoZWQgJiYgX3ZpZGVvSW5pdGlhbE1ldGFkYXRhRGlzcGF0Y2hlZFxuICAgIH1cbiAgICBpZiAoX2hhc0F1ZGlvICYmICFfaGFzVmlkZW8pIHtcbiAgICAgIHJldHVybiB0aGlzLl9hdWRpb0luaXRpYWxNZXRhZGF0YURpc3BhdGNoZWRcbiAgICB9XG4gICAgaWYgKCFfaGFzQXVkaW8gJiYgX2hhc1ZpZGVvKSB7XG4gICAgICByZXR1cm4gX3ZpZGVvSW5pdGlhbE1ldGFkYXRhRGlzcGF0Y2hlZFxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGdldCB2aWRlb1RpbWVTY2FsZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUudGltZVNjYWxlXG4gIH1cblxuICBnZXQgbWV0YUVuZFBvc2l0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5tZXRhRW5kUG9zaXRpb25cbiAgfVxuXG4gIHNldCBtZXRhRW5kUG9zaXRpb24gKHBvcykge1xuICAgIHRoaXMuc3RhdGUubWV0YUVuZFBvc2l0aW9uID0gcG9zXG4gIH1cblxuICBnZXQgaXNMaXZlICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5pc0xpdmVcbiAgfVxuXG4gIHNldCBpc0xpdmUgKHZhbCkge1xuICAgIHRoaXMuc3RhdGUuaXNMaXZlID0gdmFsXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RvcmVcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEZsdlRhZyB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICB0aGlzLnRhZ1R5cGUgPSAtMTtcbiAgICAgICAgdGhpcy5ib2R5U2l6ZSA9IC0xO1xuICAgICAgICB0aGlzLnRhZ1NpemUgPSAtMTtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IC0xO1xuICAgICAgICB0aGlzLlRpbWVzdGFtcCA9IC0xO1xuICAgICAgICB0aGlzLlN0cmVhbUlEID0gLTE7XG4gICAgICAgIHRoaXMuYm9keSA9IC0xO1xuICAgICAgICB0aGlzLnRpbWUgPSAtMTtcbiAgICAgICAgdGhpcy5hcnIgPSBbXTtcbiAgICB9XG5cbiAgICBnZXRUaW1lICgpIHtcbiAgICAgICAgdGhpcy5hcnIgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLlRpbWVzdGFtcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5hcnIucHVzaCgodGhpcy5UaW1lc3RhbXBbaV0udG9TdHJpbmcoMTYpLmxlbmd0aCA9PT0gMSA/ICcwJyArIHRoaXMuVGltZXN0YW1wW2ldLnRvU3RyaW5nKDE2KSA6IHRoaXMuVGltZXN0YW1wW2ldLnRvU3RyaW5nKDE2KSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXJyLnBvcCgpO1xuICAgICAgICBjb25zdCB0aW1lID0gdGhpcy5hcnIuam9pbignJyk7XG4gICAgICAgIHRoaXMudGltZSA9IHBhcnNlSW50KHRpbWUsIDE2KTtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRpbWUsIDE2KTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyB2ZXJzaW9uIH0gZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJ1xuY29uc3QgRXJyb3JUeXBlcyA9IHtcbiAgbmV0d29yazoge1xuICAgIGNvZGU6IDEsXG4gICAgbXNnOiAn6KeG6aKR5LiL6L296ZSZ6K+vJyxcbiAgICByZW1hcms6ICflj6ropoHop4bpopHkuIvovb3plJnor6/lsLHkvb/nlKjmraTnsbvlnovvvIzml6DorrrmmK92aWRlb+acrOi6q+eahOi2heaXtui/mOaYr3hocueahOWIhuauteivt+axgui2heaXtuaIluiAhei1hOa6kOS4jeWtmOWcqCdcbiAgfSxcbiAgbXNlOiB7XG4gICAgY29kZTogMixcbiAgICBtc2c6ICfmtYHov73liqDplJnor68nLFxuICAgIHJlbWFyazogJ+i/veWKoOa1geeahOaXtuWAmeWmguaenOexu+Wei+S4jeWvueOAgeaXoOazleiiq+ato+ehruino+eggeWImeS8muinpuWPkeatpOexu+mUmeivrydcbiAgfSxcbiAgcGFyc2U6IHtcbiAgICBjb2RlOiAzLFxuICAgIG1zZzogJ+ino+aekOmUmeivrycsXG4gICAgcmVtYXJrOiAnbXA044CBaGxz44CBZmx25oiR5Lus6YO95piv5L2/55SoanPov5vooYzmoLzlvI/op6PmnpDvvIzlpoLmnpzop6PmnpDlpLHotKXliJnkvJrop6blj5HmraTnsbvplJnor68nXG4gIH0sXG4gIGZvcm1hdDoge1xuICAgIGNvZGU6IDQsXG4gICAgbXNnOiAn5qC85byP6ZSZ6K+vJyxcbiAgICByZW1hcms6ICflpoLmnpzmtY/op4jlmajkuI3mlK/mjIHnmoTmoLzlvI/lr7zoh7Tmkq3mlL7plJnor68nXG4gIH0sXG4gIGRlY29kZXI6IHtcbiAgICBjb2RlOiA1LFxuICAgIG1zZzogJ+ino+eggemUmeivrycsXG4gICAgcmVtYXJrOiAn5rWP6KeI5Zmo6Kej56CB5byC5bi45Lya5oqb5Ye65q2k57G75Z6L6ZSZ6K+vJ1xuICB9LFxuICBydW50aW1lOiB7XG4gICAgY29kZTogNixcbiAgICBtc2c6ICfor63ms5XplJnor68nLFxuICAgIHJlbWFyazogJ+aSreaUvuWZqOivreazlemUmeivrydcbiAgfSxcbiAgdGltZW91dDoge1xuICAgIGNvZGU6IDcsXG4gICAgbXNnOiAn5pKt5pS+6LaF5pe2JyxcbiAgICByZW1hcms6ICfmkq3mlL7ov4fnqIvkuK3ml6Dms5XmraPluLjor7fmsYLkuIvkuIDkuKrliIbmrrXlr7zoh7Tmkq3mlL7kuK3mlq0nXG4gIH0sXG4gIG90aGVyOiB7XG4gICAgY29kZTogOCxcbiAgICBtc2c6ICflhbbku5bplJnor68nLFxuICAgIHJlbWFyazogJ+S4jeWPr+efpeeahOmUmeivr+aIluiiq+W/veeVpeeahOmUmeivr+exu+WeiydcbiAgfVxufVxuXG5jbGFzcyBFcnJvcnMge1xuICBjb25zdHJ1Y3RvciAodHlwZSwgY3VycmVudFRpbWUsIGR1cmF0aW9uLCBuZXR3b3JrU3RhdGUsIHJlYWR5U3RhdGUsIHNyYywgY3VycmVudFNyYyxcbiAgICBlbmRlZCwgZXJyZCA9IHtsaW5lOiAnJywgaGFuZGxlOiAnJywgbXNnOiAnJywgdmVyc2lvbjogJyd9KSB7XG4gICAgbGV0IHIgPSB7fVxuICAgIHIucGxheWVyVmVyc2lvbiA9IHZlcnNpb24gLy8g5pKt5pS+5Zmo54mI5pysXG4gICAgci5lcnJvclR5cGUgPSB0eXBlXG4gICAgci5kb21haW4gPSBkb2N1bWVudC5kb21haW4gLy8gZG9tYWluXG4gICAgci5kdXJhdGlvbiA9IGR1cmF0aW9uIC8vIOinhumikeaXtumVv1xuICAgIHIuY3VycmVudFRpbWUgPSBjdXJyZW50VGltZVxuICAgIHIubmV0d29ya1N0YXRlID0gbmV0d29ya1N0YXRlXG4gICAgci5yZWFkeVN0YXRlID0gcmVhZHlTdGF0ZVxuICAgIHIuY3VycmVudFNyYyA9IGN1cnJlbnRTcmNcbiAgICByLnNyYyA9IHNyY1xuICAgIHIuZW5kZWQgPSBlbmRlZFxuICAgIHIuZXJyZCA9IGVycmQgLy8g6ZSZ6K+v6K+m5oOFXG4gICAgci5leCA9IChFcnJvclR5cGVzW3R5cGVdIHx8IHt9KS5tc2cgLy8g6KGl5YWF5L+h5oGvXG4gICAgcmV0dXJuIHJcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFcnJvcnNcbiIsImltcG9ydCBEZW11eGVyIGZyb20gJy4vZGVtdXgvRGVtdXhlcidcbmltcG9ydCBCdWZmZXIgZnJvbSAnLi4vd3JpdGUvQnVmZmVyJ1xuaW1wb3J0IFRhZyBmcm9tICcuLi9tb2RlbHMvVGFnJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbHZQYXJzZXIgZXh0ZW5kcyBEZW11eGVyIHtcbiAgY29uc3RydWN0b3IgKHN0b3JlKSB7XG4gICAgc3VwZXIoc3RvcmUpXG4gICAgdGhpcy5DTEFTU19OQU1FID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lXG4gICAgdGhpcy50ZW1wX3U4YSA9IG51bGxcbiAgICB0aGlzLmRhdGFMZW4gPSAwXG4gICAgdGhpcy5zdG9wID0gZmFsc2VcbiAgICB0aGlzLmluZGV4ID0gMCAvLyByZWNvcmQgdGhlIHBvc2l0aW9uIGluIHNpbmdsZSByb3VuZFxuICAgIHRoaXMub2Zmc2V0ID0gMFxuICAgIHRoaXMuZmlsZVBvc2l0aW9uID0gMCAvLyByZWNvcmQgY3VycmVudCBmaWxlIHBvc2l0aW9uXG4gICAgdGhpcy5maXJzdEZsYWcgPSB0cnVlXG4gIH1cblxuICBzZWVrICgpIHtcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMudGVtcF91OGEgPSBudWxsXG4gICAgdGhpcy5kYXRhTGVuID0gMFxuICAgIHRoaXMuc3RvcCA9IGZhbHNlXG4gICAgdGhpcy5pbmRleCA9IDAgLy8gcmVjb3JkIHRoZSBwb3NpdGlvbiBpbiBzaW5nbGUgcm91bmRcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgICB0aGlzLmZpbGVQb3NpdGlvbiA9IDBcbiAgfVxuXG4gIHNldEZsdiAoZmx2VThhKSB7XG4gICAgdGhpcy5zdG9wID0gZmFsc2VcbiAgICB0aGlzLmluZGV4ID0gMFxuICAgIHRoaXMub2Zmc2V0ID0gMFxuICAgIGNvbnN0IHRlbXBVOGEgPSB0aGlzLnRlbXBfdThhID0gZmx2VThhXG4gICAgdGhpcy5kYXRhTGVuID0gdGhpcy50ZW1wX3U4YS5sZW5ndGhcblxuICAgIGlmICghdGhpcy5maXJzdEZsYWcpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcnNlRGF0YSgpXG4gICAgfSBlbHNlIGlmICh0ZW1wVThhLmxlbmd0aCA+IDEzICYmIEZsdlBhcnNlci5pc0ZsdkhlYWQodGVtcFU4YSkpIHtcbiAgICAgIHRoaXMucGFyc2VIZWFkKClcbiAgICAgIHRoaXMucmVhZERhdGEoOSkgLy8g6Lez6L+H5aS06YOoXG4gICAgICB0aGlzLnJlYWREYXRhKDQpIC8vIOi3s+i/h+S4i+S4gOS4quiusOW9leWktOmDqHNpemXnmoQgaW50MzJcbiAgICAgIHRoaXMucGFyc2VEYXRhKClcbiAgICAgIHRoaXMuZmlyc3RGbGFnID0gZmFsc2VcbiAgICAgIHRoaXMuZmlsZVBvc2l0aW9uICs9IHRoaXMub2Zmc2V0XG4gICAgICByZXR1cm4gdGhpcy5vZmZzZXRcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMub2Zmc2V0XG4gICAgfVxuICB9XG5cbiAgcGFyc2VEYXRhICgpIHtcbiAgICBjb25zdCB7bGVuZ3RoOiB1OGFMZW5ndGh9ID0gdGhpcy50ZW1wX3U4YVxuICAgIHdoaWxlICh0aGlzLmluZGV4IDwgdThhTGVuZ3RoICYmICF0aGlzLnN0b3ApIHtcbiAgICAgIHRoaXMub2Zmc2V0ID0gdGhpcy5pbmRleFxuICAgICAgY29uc3QgdGFnID0gbmV3IFRhZygpXG4gICAgICBpZiAodGhpcy51bnJlYWRMZW5ndGggPj0gMTEpIHtcbiAgICAgICAgLy8g5Y+v5Lul6K+75Ye65aS06YOo5L+h5oGvXG4gICAgICAgIHRhZy5wb3NpdGlvbiA9IHRoaXMuZmlsZVBvc2l0aW9uICsgdGhpcy5vZmZzZXRcbiAgICAgICAgdGFnLnRhZ1R5cGUgPSB0aGlzLnJlYWREYXRhKDEpWzBdXG4gICAgICAgIHRhZy5ib2R5U2l6ZSA9IHRoaXMucmVhZERhdGEoMylcbiAgICAgICAgdGFnLlRpbWVzdGFtcCA9IHRoaXMucmVhZERhdGEoNClcbiAgICAgICAgdGFnLlN0cmFtSWQgPSB0aGlzLnJlYWREYXRhKDMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0b3AgPSB0cnVlXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICBpZiAodGhpcy51bnJlYWRMZW5ndGggPj0gdGhpcy5nZXRCb2R5U2l6ZSh0YWcuYm9keVNpemUpICsgNCkge1xuICAgICAgICB0YWcuYm9keSA9IHRoaXMucmVhZERhdGEodGhpcy5nZXRCb2R5U2l6ZSh0YWcuYm9keVNpemUpKVxuICAgICAgICB0YWcudGFnU2l6ZSA9IHRoaXMucmVhZERhdGEoNClcbiAgICAgICAgY29uc3Qge3RhZ3MsIF9oYXNWaWRlbywgX2hhc0F1ZGlvfSA9IHRoaXMuX3N0b3JlLnN0YXRlXG4gICAgICAgIHN3aXRjaCAodGFnLnRhZ1R5cGUpIHtcbiAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICBfaGFzVmlkZW8gJiYgdGFncy5wdXNoKHRhZylcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgX2hhc0F1ZGlvICYmIHRhZ3MucHVzaCh0YWcpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgMTg6XG4gICAgICAgICAgICB0YWdzLnB1c2godGFnKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdG9wID0gdHJ1ZVxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICB0aGlzLm9mZnNldCA9IHRoaXMuaW5kZXhcbiAgICB9XG4gICAgdGhpcy5maWxlUG9zaXRpb24gKz0gdGhpcy5vZmZzZXRcbiAgICB0aGlzLnRlbXBfdThhID0gbnVsbFxuICAgIHJldHVybiB0aGlzLm9mZnNldFxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBzaXplQXJyXG4gICAqIEByZXR1cm5cbiAgICovXG4gIGdldEJvZHlTaXplIChzaXplQXJyKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5yZWFkQXNJbnQoc2l6ZUFycilcbiAgfVxuXG4gIHBhcnNlSGVhZCAoKSB7XG4gICAgY29uc3Qge3RlbXBfdThhOiB0ZW1wVThhLCBfc3RvcmV9ID0gdGhpc1xuICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgIG1hdGNoOiBmYWxzZVxuICAgIH1cbiAgICBpZiAodGVtcFU4YVszXSAhPT0gMSkge1xuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cbiAgICBjb25zdCBmbGFnID0gdGVtcFU4YVs0XVxuICAgIGNvbnN0IGhhc0F1ZGlvID0gKChmbGFnICYgNCkgPj4+IDIpICE9PSAwXG4gICAgY29uc3QgaGFzVmlkZW8gPSAoZmxhZyAmIDEpICE9PSAwXG5cbiAgICBpZiAoIWhhc0F1ZGlvICYmICFoYXNWaWRlbykge1xuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cblxuICAgIF9zdG9yZS5oYXNBdWRpbyA9IGhhc0F1ZGlvXG4gICAgX3N0b3JlLmhhc1ZpZGVvID0gaGFzVmlkZW9cbiAgfVxuXG4gIHJlYWREYXRhIChsZW5ndGgpIHtcbiAgICBjb25zdCBfaW5kZXggPSB0aGlzLmluZGV4XG4gICAgdGhpcy5pbmRleCArPSBsZW5ndGhcbiAgICByZXR1cm4gdGhpcy50ZW1wX3U4YS5zbGljZShfaW5kZXgsIF9pbmRleCArIGxlbmd0aClcbiAgfVxuXG4gIGdldCB1bnJlYWRMZW5ndGggKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGFMZW4gLSB0aGlzLmluZGV4XG4gIH1cblxuICBzdGF0aWMgaXNGbHZIZWFkICh0ZW1wVThhKSB7XG4gICAgbGV0IGZpcnN0VGhyZWVDaGFycyA9IFt0ZW1wVThhWzBdLCB0ZW1wVThhWzFdLCB0ZW1wVThhWzJdXVxuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgZmlyc3RUaHJlZUNoYXJzKSA9PT0gJ0ZMVidcbiAgfVxufVxuIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICdldmVudC1lbWl0dGVyJ1xubGV0IGNvdW50ID0gMFxuY2xhc3MgTVNFIHtcbiAgY29uc3RydWN0b3IgKGNvZGVjcyA9ICd2aWRlby9tcDQ7IGNvZGVjcz1cImF2YzEuNjQwMDFFLCBtcDRhLjQwLjVcIicpIHtcbiAgICB0aGlzLmNvdW50ID0gY291bnQrK1xuICAgIGxldCBzZWxmID0gdGhpc1xuICAgIEV2ZW50RW1pdHRlcih0aGlzKVxuICAgIHRoaXMuY29kZWNzID0gY29kZWNzXG4gICAgdGhpcy5tZWRpYVNvdXJjZSA9IG5ldyB3aW5kb3cuTWVkaWFTb3VyY2UoKVxuICAgIHRoaXMudXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwodGhpcy5tZWRpYVNvdXJjZSlcblxuICAgIHRoaXMuaGFuZGxlU291cmNlT3BlbiA9IHRoaXMub25Tb3VyY2VPcGVuLmJpbmQodGhpcylcbiAgICB0aGlzLm1lZGlhU291cmNlLmFkZEV2ZW50TGlzdGVuZXIoJ3NvdXJjZW9wZW4nLCB0aGlzLmhhbmRsZVNvdXJjZU9wZW4pXG5cbiAgICB0aGlzLm1lZGlhU291cmNlLmFkZEV2ZW50TGlzdGVuZXIoJ3NvdXJjZWNsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5lbWl0KCdzb3VyY2VjbG9zZScpXG4gICAgfSlcbiAgfVxuXG4gIG9uU291cmNlT3BlbiAoKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICBzZWxmLnNvdXJjZUJ1ZmZlciA9IHNlbGYubWVkaWFTb3VyY2UuYWRkU291cmNlQnVmZmVyKHNlbGYuY29kZWNzKVxuICAgIHNlbGYuc291cmNlQnVmZmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIHNlbGYuZW1pdCgnZXJyb3InLCB7XG4gICAgICAgIHR5cGU6ICdzb3VyY2VCdWZmZXInLFxuICAgICAgICBlcnJvcjogZVxuICAgICAgfSlcbiAgICB9KVxuICAgIHNlbGYuc291cmNlQnVmZmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3VwZGF0ZWVuZCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBzZWxmLmVtaXQoJ3VwZGF0ZWVuZCcpXG4gICAgfSlcbiAgICBzZWxmLmVtaXQoJ3NvdXJjZW9wZW4nKVxuICAgIHNlbGYuc291cmNlQnVmZmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIHNlbGYuZW1pdCgnZXJyb3InLCB7XG4gICAgICAgIHR5cGU6ICdtZWRpYVNvdXJjZScsXG4gICAgICAgIGVycm9yOiBlXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbiAgZ2V0IHN0YXRlICgpIHtcbiAgICByZXR1cm4gdGhpcy5tZWRpYVNvdXJjZS5yZWFkeVN0YXRlXG4gIH1cblxuICBnZXQgZHVyYXRpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm1lZGlhU291cmNlLmR1cmF0aW9uXG4gIH1cblxuICBzZXQgZHVyYXRpb24gKHZhbHVlKSB7XG4gICAgdGhpcy5tZWRpYVNvdXJjZS5kdXJhdGlvbiA9IHZhbHVlXG4gIH1cblxuICBhcHBlbmRCdWZmZXIgKGJ1ZmZlcikge1xuICAgIGxldCBzb3VyY2VCdWZmZXIgPSB0aGlzLnNvdXJjZUJ1ZmZlclxuICAgIGlmIChzb3VyY2VCdWZmZXIudXBkYXRpbmcgPT09IGZhbHNlICYmIHRoaXMuc3RhdGUgPT09ICdvcGVuJykge1xuICAgICAgc291cmNlQnVmZmVyLmFwcGVuZEJ1ZmZlcihidWZmZXIpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIHtcbiAgICAgICAgICB0eXBlOiAnc291cmNlQnVmZmVyJyxcbiAgICAgICAgICBlcnJvcjogbmV3IEVycm9yKCdtZWRpYVNvdXJjZSBpcyBub3QgYXR0YWNoZWQgdG8gdmlkZW8gb3IgbWVkaWFTb3VyY2UgaXMgY2xvc2VkJylcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZSA9PT0gJ2VuZGVkJykge1xuICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywge1xuICAgICAgICAgIHR5cGU6ICdzb3VyY2VCdWZmZXInLFxuICAgICAgICAgIGVycm9yOiBuZXcgRXJyb3IoJ21lZGlhU291cmNlIGlzIGNsb3NlZCcpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc291cmNlQnVmZmVyLnVwZGF0aW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgdGhpcy5lbWl0KCd3YXJuJywge1xuICAgICAgICAgICAgdHlwZTogJ3NvdXJjZUJ1ZmZlcicsXG4gICAgICAgICAgICBlcnJvcjogbmV3IEVycm9yKCdtZWRpYVNvdXJjZSBpcyBidXN5JylcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIC8vIHRoaXMubWVkaWFTb3VyY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcignc291cmNlb3BlbicsIHRoaXMuaGFuZGxlU291cmNlT3BlbilcbiAgICB0aGlzLl9fZWVfXyA9IHt9XG4gICAgLy8gdGhpcy5tZWRpYVNvdXJjZSA9IG51bGxcbiAgICAvLyB0aGlzLmVuZE9mU3RyZWFtKClcbiAgfVxuICByZW1vdmVCdWZmZXIgKHN0YXJ0LCBlbmQpIHtcbiAgICB0aGlzLnNvdXJjZUJ1ZmZlci5yZW1vdmUoc3RhcnQsIGVuZClcbiAgfVxuXG4gIGVuZE9mU3RyZWFtICgpIHtcbiAgICBpZiAodGhpcy5tZWRpYVNvdXJjZS5yZWFkeVN0YXRlID09PSAnb3BlbicpIHtcbiAgICAgIHRoaXMubWVkaWFTb3VyY2UuZW5kT2ZTdHJlYW0oKVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBpc1N1cHBvcnRlZCAoY29kZWNzKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5NZWRpYVNvdXJjZSAmJiB3aW5kb3cuTWVkaWFTb3VyY2UuaXNUeXBlU3VwcG9ydGVkKGNvZGVjcylcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNU0VcbiIsImltcG9ydCBNcDRSZW11eGVyIGZyb20gJy4vcmVtdXgvTXA0cmVtdXgnXG5pbXBvcnQgRmx2UGFyc2VyIGZyb20gJy4vRmx2UGFyc2VyJ1xuaW1wb3J0IFRhZ0RlbXV4ZXIgZnJvbSAnLi9kZW11eC9UYWdEZW11eGVyJ1xuaW1wb3J0IFN0b3JlIGZyb20gJy4uL21vZGVscy9TdG9yZSdcbmltcG9ydCBWb2RUYXNrIGZyb20gJy4uL3Rhc2tzL1ZvZFRhc2snXG5pbXBvcnQgTGl2ZVRhc2sgZnJvbSAnLi4vdGFza3MvTGl2ZVRhc2snXG5pbXBvcnQgQnVmZmVyIGZyb20gJy4uL3dyaXRlL0J1ZmZlcidcbmltcG9ydCBUcmFuc0NvZGVyIGZyb20gJy4vVHJhbnNDb2RlcidcblxuY29uc3QgTk9PUCA9ICgpID0+IHt9XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluUGFyc2VyIGV4dGVuZHMgVHJhbnNDb2RlciB7XG4gIGNvbnN0cnVjdG9yIChjb25maWcsIHBsYXllcikge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLkNMQVNTX05BTUUgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWVcbiAgICB0aGlzLl9jb25maWcgPSBjb25maWdcbiAgICB0aGlzLl9wbGF5ZXIgPSBwbGF5ZXJcbiAgICB0aGlzLl90ZW1wQmFzZVRpbWUgPSAwXG4gICAgdGhpcy5maXJzdEZsYWcgPSB0cnVlXG4gICAgdGhpcy5fc3RvcmUgPSBuZXcgU3RvcmUoKVxuICAgIHRoaXMuX3N0b3JlLmlzTGl2ZSA9IGNvbmZpZy5pc0xpdmUgfHwgZmFsc2VcbiAgICB0aGlzLl9zdG9yZS5wbGF5ZXIgPSBwbGF5ZXJcbiAgICB0aGlzLmZsdlBhcnNlciA9IG5ldyBGbHZQYXJzZXIodGhpcy5fc3RvcmUpXG4gICAgdGhpcy50YWdEZW11eGVyID0gbmV3IFRhZ0RlbXV4ZXIodGhpcy5fc3RvcmUpXG4gICAgdGhpcy5tcDRyZW11eGVyID0gbmV3IE1wNFJlbXV4ZXIodGhpcy5fc3RvcmUpXG4gICAgdGhpcy5idWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICB0aGlzLmJ1ZmZlcktleWZyYW1lcyA9IG5ldyBTZXQoKVxuICAgIHRoaXMuTUVUQV9DSFVOS19TSVpFID0gTWF0aC5wb3coMTAsIDYpXG4gICAgdGhpcy5DSFVOS19TSVpFID0gTWF0aC5wb3coMTAsIDYpXG4gICAgdGhpcy5mdHlwX21vb3YgPSBudWxsXG4gICAgdGhpcy5pc1NvdXJjZU9wZW4gPSBmYWxzZVxuICAgIHRoaXMuX2lzTmV3U2VnbWVudHNBcnJpdmFsID0gZmFsc2VcbiAgICB0aGlzLmlzU2Vla2luZyA9IGZhbHNlXG4gICAgdGhpcy5sb2FkVGFzayA9IG51bGxcbiAgICB0aGlzLnJhbmdlID0ge1xuICAgICAgc3RhcnQ6IC0xLFxuICAgICAgZW5kOiAtMVxuICAgIH1cbiAgICB0aGlzLl9wZW5kaW5nRnJhZ21lbnRzID0gW11cbiAgICB0aGlzLl9wZW5kaW5nUmVtb3ZlUmFuZ2UgPSBbXVxuICAgIHRoaXMuZXJyX2NudCA9IDBcbiAgICB0aGlzLnJlcXVlc3RDb25maWcgPSB7XG4gICAgICBtb2RlOiB0aGlzLl9jb25maWcuY29ycyA/ICdjb3JzJyA6ICdzYW1lLW9yaWdpbidcbiAgICB9XG4gICAgdGhpcy5pbml0RXZlbnRCaW5kKClcbiAgfVxuXG4gIHN0YXJ0TG9hZERhdGEgKCkge1xuICAgIGlmICghdGhpcy5fY29uZmlnLmlzTGl2ZSkge1xuICAgICAgdGhpcy5pbml0TWV0YSgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5pdExpdmVTdHJlYW0oKVxuICAgIH1cbiAgfVxuXG4gIGluaXRMaXZlU3RyZWFtICgpIHtcbiAgICBuZXcgTGl2ZVRhc2sodGhpcy5fY29uZmlnLnVybCwgdGhpcy5yZXF1ZXN0Q29uZmlnKS5ydW4odGhpcy5sb2FkTGl2ZURhdGEuYmluZCh0aGlzKSlcbiAgfVxuXG4gIGxvYWRMaXZlRGF0YSAoYnVmZmVyKSB7XG4gICAgaWYgKGJ1ZmZlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmVtaXQoJ2xpdmUtZW5kJylcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYnVmZmVyLndyaXRlKG5ldyBVaW50OEFycmF5KGJ1ZmZlcikpXG4gICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5zZXRGbHYodGhpcy5idWZmZXIuYnVmZmVyKVxuICAgICAgdGhpcy5idWZmZXIuYnVmZmVyID0gdGhpcy5idWZmZXIuYnVmZmVyLnNsaWNlKG9mZnNldClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGluaXRNZXRhICgpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgIGNvbnN0IFJlc29sdmVyID0ge1xuICAgICAgcmVzb2x2ZUNodW5rICh7dGltZVN0YW1wLCBidWZmZXJ9KSB7XG4gICAgICAgIGlmICh0aW1lU3RhbXAgIT09IHNlbGYubG9hZFRhc2sudGltZVN0YW1wKSByZXR1cm5cbiAgICAgICAgc2VsZi5lcnJfY250ID0gMFxuICAgICAgICBzZWxmLmJ1ZmZlci53cml0ZShuZXcgVWludDhBcnJheShidWZmZXIpKVxuICAgICAgICBsZXQgb2Zmc2V0ID0gc2VsZi5zZXRGbHYoc2VsZi5idWZmZXIuYnVmZmVyKVxuICAgICAgICBzZWxmLmJ1ZmZlci5idWZmZXIgPSBzZWxmLmJ1ZmZlci5idWZmZXIuc2xpY2Uob2Zmc2V0KVxuICAgICAgICBpZiAoIXNlbGYuaXNNZWRpYUluZm9SZWFkeSkge1xuICAgICAgICAgIHNlbGYuaW5pdE1ldGEoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucmFuZ2UgPSB7XG4gICAgICBzdGFydDogdGhpcy5yYW5nZS5lbmQgKyAxLFxuICAgICAgZW5kOiB0aGlzLnJhbmdlLmVuZCArIHRoaXMuTUVUQV9DSFVOS19TSVpFXG4gICAgfVxuICAgIGNvbnN0IGxvYWREYXRhID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMubG9hZE1ldGFEYXRhKHRoaXMucmFuZ2Uuc3RhcnQsIHRoaXMucmFuZ2UuZW5kKS50aGVuKFJlc29sdmVyLnJlc29sdmVDaHVuaykuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgICAgaWYgKHRoaXMuZXJyX2NudCA+PSAzKSB7XG4gICAgICAgICAgdGhpcy5fcGxheWVyLmVtaXQoJ2Vycm9yJywgZSlcbiAgICAgICAgICB0aGlzLmRlc3Ryb3koKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXJyX2NudCArPSAxXG4gICAgICAgIGxvYWREYXRhKClcbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiBsb2FkRGF0YSgpXG4gIH1cblxuICBsb2FkU2VnbWVudHMgKGNoYW5nZVJhbmdlLCBjdXJyZW50VGltZSA9IDAsIHByZWxvYWRUaW1lKSB7XG4gICAgdGhpcy5faXNOZXdTZWdtZW50c0Fycml2YWwgPSBmYWxzZVxuICAgIGNvbnN0IHJlc29sdmVDaHVuayA9ICh7dGltZVN0YW1wLCBidWZmZXJ9KSA9PiB7XG4gICAgICBpZiAodGhpcy5pc1RlbXBQbGF5ZXIpIHtcbiAgICAgICAgdGhpcy5pc1RlbXBQbGF5ZXIgPSBmYWxzZVxuICAgICAgfVxuICAgICAgaWYgKHRpbWVTdGFtcCAhPT0gdGhpcy5sb2FkVGFzay50aW1lU3RhbXApIHJldHVyblxuICAgICAgdGhpcy5lcnJfY250ID0gMFxuICAgICAgdGhpcy5idWZmZXIud3JpdGUobmV3IFVpbnQ4QXJyYXkoYnVmZmVyKSlcbiAgICAgIGlmICh0aGlzLmlzU2Vla2luZykge1xuICAgICAgICB0aGlzLl9wZW5kaW5nRnJhZ21lbnRzID0gW11cbiAgICAgIH1cbiAgICAgIGxldCBvZmZzZXQgPSB0aGlzLnNldEZsdih0aGlzLmJ1ZmZlci5idWZmZXIpXG4gICAgICB0aGlzLmJ1ZmZlci5idWZmZXIgPSB0aGlzLmJ1ZmZlci5idWZmZXIuc2xpY2Uob2Zmc2V0KVxuICAgICAgaWYgKCF0aGlzLl9pc05ld1NlZ21lbnRzQXJyaXZhbCkge1xuICAgICAgICB0aGlzLmxvYWRTZWdtZW50cyh0cnVlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pc1NlZWtpbmcgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2hhbmdlUmFuZ2UpIHtcbiAgICAgIGxldCBfcmFuZ2UgPSB0aGlzLnJhbmdlXG5cbiAgICAgIGlmICh0aGlzLmdldE5leHRSYW5nZUVuZChjdXJyZW50VGltZSwgcHJlbG9hZFRpbWUpIDw9IF9yYW5nZS5lbmQpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gICAgICB9XG5cbiAgICAgIHRoaXMucmFuZ2UgPSB7XG4gICAgICAgIHN0YXJ0OiB0aGlzLnJhbmdlLmVuZCArIDEsXG4gICAgICAgIGVuZDogY3VycmVudFRpbWUgPT09IHVuZGVmaW5lZCA/IHRoaXMucmFuZ2UuZW5kICsgdGhpcy5DSFVOS19TSVpFIC0gMSA6IHRoaXMuZ2V0TmV4dFJhbmdlRW5kKGN1cnJlbnRUaW1lLCBwcmVsb2FkVGltZSkgLSAxXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnJhbmdlLnN0YXJ0ID49IHRoaXMucmFuZ2UuZW5kIHx8ICF0aGlzLnJhbmdlLmVuZCkge1xuICAgICAgICB0aGlzLnJhbmdlID0gX3JhbmdlXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBsb2FkRGF0YSA9ICgpID0+IHtcbiAgICAgIGlmICh0aGlzLnN0b3ApIHJldHVyblxuICAgICAgcmV0dXJuIHRoaXMuX2xvYWRTZWdtZW50c0RhdGEodGhpcy5yYW5nZS5zdGFydCwgdGhpcy5yYW5nZS5lbmQpLnRoZW4ocmVzb2x2ZUNodW5rKS5jYXRjaChlID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZXJyX2NudCA+PSAzKSB7XG4gICAgICAgICAgdGhpcy5fcGxheWVyLmVtaXQoJ2Vycm9yJywgJ+WKoOi9veinhumikeWksei0pScpXG4gICAgICAgICAgdGhpcy5kZXN0cm95KClcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVycl9jbnQgKz0gMVxuICAgICAgICBsb2FkRGF0YSgpXG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gbG9hZERhdGEoKVxuICB9XG5cbiAgZ2V0TmV4dFJhbmdlRW5kIChzdGFydCwgcHJlbG9hZFRpbWUpIHtcbiAgICBjb25zdCB7a2V5ZnJhbWVzOiB7dGltZXMsIGZpbGVQb3NpdGlvbnN9LCB2aWRlb1RpbWVTY2FsZX0gPSB0aGlzLl9zdG9yZVxuICAgIGlmICghdGltZXMgfHwgIWZpbGVQb3NpdGlvbnMpIHtcbiAgICAgIHJldHVybiB0aGlzLnJhbmdlLmVuZCArIHRoaXMuQ0hVTktfU0laRVxuICAgIH1cbiAgICBzdGFydCAqPSB2aWRlb1RpbWVTY2FsZVxuXG4gICAgbGV0IGV4cGVjdEVuZCA9IHN0YXJ0ICsgKHByZWxvYWRUaW1lICogdmlkZW9UaW1lU2NhbGUpXG4gICAgaWYgKGV4cGVjdEVuZCA+IHRpbWVzW3RpbWVzLmxlbmd0aCAtIDFdKSB7XG4gICAgICByZXR1cm4gZmlsZVBvc2l0aW9uc1tmaWxlUG9zaXRpb25zLmxlbmd0aCAtIDFdXG4gICAgfVxuICAgIGxldCBsZWZ0ID0gMFxuICAgIGxldCByaWdodCA9IHRpbWVzLmxlbmd0aCAtIDFcbiAgICBsZXQgaW5kZXhcblxuICAgIHdoaWxlIChsZWZ0IDw9IHJpZ2h0KSB7XG4gICAgICBsZXQgbWlkID0gTWF0aC5mbG9vcigocmlnaHQgKyBsZWZ0KSAvIDIpXG4gICAgICBpZiAodGltZXNbbWlkXSA8PSBleHBlY3RFbmQgJiYgZXhwZWN0RW5kIDw9IHRpbWVzW21pZCArIDFdKSB7XG4gICAgICAgIGluZGV4ID0gbWlkICsgMVxuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIGlmIChsZWZ0ID09PSByaWdodCkge1xuICAgICAgICBpbmRleCA9IG1pZFxuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIGlmIChleHBlY3RFbmQgPCB0aW1lc1ttaWRdKSB7XG4gICAgICAgIHJpZ2h0ID0gbWlkIC0gMVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGVmdCA9IG1pZCArIDFcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaW5kZXggPyBmaWxlUG9zaXRpb25zW2luZGV4XSA6IHVuZGVmaW5lZFxuICB9XG5cbiAgX2xvYWRTZWdtZW50c0RhdGEgKHN0YXJ0ID0gMCwgZW5kID0gc3RhcnQgKyB0aGlzLkNIVU5LX1NJWkUpIHtcbiAgICB0aGlzLmxvYWRUYXNrID0gbmV3IFZvZFRhc2sodGhpcy5fY29uZmlnLnVybCwgW3N0YXJ0LCBlbmRdLCB0aGlzLnJlcXVlc3RDb25maWcpXG4gICAgcmV0dXJuIHRoaXMubG9hZFRhc2sucHJvbWlzZVxuICB9XG5cbiAgbG9hZE1ldGFEYXRhIChzdGFydCA9IDAsIGVuZCA9IHN0YXJ0ICsgdGhpcy5NRVRBX0NIVU5LX1NJWkUpIHtcbiAgICB0aGlzLmxvYWRUYXNrID0gbmV3IFZvZFRhc2sodGhpcy5fY29uZmlnLnVybCwgW3N0YXJ0LCBlbmRdLCB0aGlzLnJlcXVlc3RDb25maWcpXG4gICAgcmV0dXJuIHRoaXMubG9hZFRhc2sucHJvbWlzZVxuICB9XG5cbiAgc2V0Rmx2Rmlyc3QgKGFycmF5QnVmZiwgYmFzZVRpbWUpIHtcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLmZsdlBhcnNlci5zZXRGbHYobmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmKSlcbiAgICBjb25zdCB7dGFnc30gPSB0aGlzLl9zdG9yZS5zdGF0ZVxuXG4gICAgaWYgKHRhZ3MubGVuZ3RoKSB7XG4gICAgICBpZiAodGFnc1swXS50YWdUeXBlICE9PSAxOCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZsdiBmaWxlIHdpdGhvdXQgbWV0YWRhdGEgdGFnJylcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX3RlbXBCYXNlVGltZSAhPT0gMCAmJiB0aGlzLl90ZW1wQmFzZVRpbWUgPT09IHRhZ3NbMF0uZ2V0VGltZSgpKSB7XG4gICAgICAgIHRoaXMuX3N0b3JlLnN0YXRlLl90aW1lc3RhbXBCYXNlID0gMFxuICAgICAgfVxuXG4gICAgICB0aGlzLnRhZ0RlbXV4ZXIucmVzb2x2ZVRhZ3ModGFncylcbiAgICB9XG5cbiAgICB0aGlzLmZpcnN0RmxhZyA9IGZhbHNlXG4gICAgcmV0dXJuIG9mZnNldFxuICB9XG5cbiAgc2V0Rmx2VXN1YWxseSAoYXJyYXlCdWZmLCBiYXNlVGltZSkge1xuICAgIHRoaXMuaXNQYXJzaW5nID0gdHJ1ZVxuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMuZmx2UGFyc2VyLnNldEZsdihuZXcgVWludDhBcnJheShhcnJheUJ1ZmYpKVxuICAgIGNvbnN0IHt0YWdzfSA9IHRoaXMuX3N0b3JlLnN0YXRlXG4gICAgaWYgKHRhZ3MubGVuZ3RoKSB7XG4gICAgICB0aGlzLnRhZ0RlbXV4ZXIucmVzb2x2ZVRhZ3ModGFncylcbiAgICB9XG4gICAgcmV0dXJuIG9mZnNldFxuICB9XG5cbiAgaGFuZGxlRGF0YVJlYWR5IChhdWRpb1RyYWNrLCB2aWRlb1RyYWNrKSB7XG4gICAgdGhpcy5tcDRyZW11eGVyLnJlbXV4KGF1ZGlvVHJhY2ssIHZpZGVvVHJhY2spXG4gIH1cblxuICBoYW5kbGVNZXRhRGF0YVJlYWR5ICh0eXBlLCBtZXRhKSB7XG4gICAgdGhpcy5tcDRyZW11eGVyLm9uTWV0YURhdGFSZWFkeSh0eXBlLCBtZXRhKVxuICB9XG5cbiAgaGFuZGxlRXJyb3IgKGUpIHtcbiAgICB0aGlzLmVycm9yKGUpXG4gIH1cblxuICBoYW5kbGVOZXdNZWRpYUZyYWdtZW50IChuZXdGcmFnKSB7XG4gICAgdGhpcy5faXNOZXdTZWdtZW50c0Fycml2YWwgPSB0cnVlXG4gICAgdGhpcy5fcGVuZGluZ0ZyYWdtZW50cy5wdXNoKG5ld0ZyYWcpXG4gICAgY29uc3Qge3JhbmRvbUFjY2Vzc1BvaW50c30gPSBuZXdGcmFnLmZyYWdtZW50XG4gICAgaWYgKHJhbmRvbUFjY2Vzc1BvaW50cyAmJiByYW5kb21BY2Nlc3NQb2ludHMubGVuZ3RoKSB7XG4gICAgICByYW5kb21BY2Nlc3NQb2ludHMuZm9yRWFjaChyYXAgPT4ge1xuICAgICAgICB0aGlzLmJ1ZmZlcktleWZyYW1lcy5hZGQocmFwLmR0cylcbiAgICAgIH0pXG4gICAgfVxuICAgIGlmICghdGhpcy5pc1NvdXJjZU9wZW4pIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAodGhpcy5fcGVuZGluZ0ZyYWdtZW50cy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGZyYWdtZW50ID0gdGhpcy5fcGVuZGluZ0ZyYWdtZW50cy5zaGlmdCgpXG4gICAgICBpZiAoIXRoaXMuaGFuZGxlTWVkaWFGcmFnbWVudChmcmFnbWVudCkpIHtcbiAgICAgICAgdGhpcy5fcGVuZGluZ0ZyYWdtZW50cy51bnNoaWZ0KGZyYWdtZW50KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5oYW5kbGVTZWVrRW5kKClcbiAgICAgICAgdGhpcy5fcGxheWVyLmVtaXQoJ2NhY2hldXBkYXRlJywgdGhpcy5fcGxheWVyKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZU1lZGlhSW5mb1JlYWR5IChtZWRpYUluZm8pIHtcbiAgICBjb25zdCBGVFlQX01PT1YgPSB0aGlzLm1wNHJlbXV4ZXIub25NZWRpYUluZm9SZWFkeShtZWRpYUluZm8pXG4gICAgaWYgKCF0aGlzLmZ0eXBfbW9vdikge1xuICAgICAgdGhpcy5mdHlwX21vb3YgPSBGVFlQX01PT1ZcbiAgICAgIHRoaXMuZW1pdCgncmVhZHknLCBGVFlQX01PT1YpXG4gICAgfVxuICB9XG5cbiAgaW5pdEV2ZW50QmluZCAoKSB7XG4gICAgdGhpcy50YWdEZW11eGVyLmhhbmRsZURhdGFSZWFkeSA9IHRoaXMuaGFuZGxlRGF0YVJlYWR5LmJpbmQodGhpcylcbiAgICB0aGlzLnRhZ0RlbXV4ZXIuaGFuZGxlTWVkaWFJbmZvUmVhZHkgPSB0aGlzLmhhbmRsZU1lZGlhSW5mb1JlYWR5LmJpbmQodGhpcylcbiAgICB0aGlzLnRhZ0RlbXV4ZXIuaGFuZGxlTWV0YURhdGFSZWFkeSA9IHRoaXMuaGFuZGxlTWV0YURhdGFSZWFkeS5iaW5kKHRoaXMpXG4gICAgdGhpcy50YWdEZW11eGVyLnNldEV2ZW50QmluZCgpXG4gICAgdGhpcy5tcDRyZW11eGVyLmhhbmRsZU1lZGlhRnJhZ21lbnQgPSB0aGlzLmhhbmRsZU5ld01lZGlhRnJhZ21lbnQuYmluZCh0aGlzKVxuICB9XG5cbiAgcmVwbGF5ICgpIHtcbiAgICB0aGlzLmlzU291cmNlT3BlbiA9IGZhbHNlXG4gICAgdGhpcy5yYW5nZSA9IHtcbiAgICAgIHN0YXJ0OiB0aGlzLl9zdG9yZS5tZXRhRW5kUG9zaXRpb24sXG4gICAgICBlbmQ6IHRoaXMuZ2V0TmV4dFJhbmdlRW5kKDAsIHRoaXMuX2NvbmZpZy5wcmVsb2FkVGltZSkgLSAxXG4gICAgfVxuICAgIHRoaXMubXA0cmVtdXhlci5zZWVrKClcbiAgICB0aGlzLmZsdlBhcnNlci5zZWVrKClcbiAgICB0aGlzLmNsZWFyQnVmZmVyKClcbiAgICB0aGlzLmxvYWRTZWdtZW50cyhmYWxzZSlcbiAgfVxuXG4gIGNsZWFyQnVmZmVyICgpIHtcbiAgICB0aGlzLl9wZW5kaW5nRnJhZ21lbnRzID0gW11cbiAgICB0aGlzLl9wZW5kaW5nUmVtb3ZlUmFuZ2UgPSBbXVxuICB9XG4gIHVuYmluZEV2ZW50cyAoKSB7XG4gICAgdGhpcy50YWdEZW11eGVyLmhhbmRsZURhdGFSZWFkeSA9IE5PT1BcbiAgICB0aGlzLnRhZ0RlbXV4ZXIuaGFuZGxlTWVkaWFJbmZvUmVhZHkgPSBOT09QXG4gICAgdGhpcy50YWdEZW11eGVyLmhhbmRsZU1ldGFEYXRhUmVhZHkgPSBOT09QXG4gICAgdGhpcy50YWdEZW11eGVyLnNldEV2ZW50QmluZCgpXG4gICAgdGhpcy5tcDRyZW11eGVyLmhhbmRsZU1lZGlhRnJhZ21lbnQgPSBOT09QXG4gIH1cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5tcDRyZW11eGVyLmRlc3Ryb3koKVxuICAgIHRoaXMuZmx2UGFyc2VyLmRlc3Ryb3koKVxuICAgIHRoaXMudGFnRGVtdXhlci5kZXN0cm95KClcbiAgICB0aGlzLm1wNHJlbXV4ZXIgPSBudWxsXG4gICAgdGhpcy5mbHZQYXJzZXIgPSBudWxsXG4gICAgdGhpcy50YWdEZW11eGVyID0gbnVsbFxuICAgIHRoaXMubG9hZFNlZ21lbnRzID0gKCkgPT4gbnVsbFxuICAgIHRoaXMuX3N0b3JlID0gbnVsbFxuICAgIHRoaXMuY2xlYXJCdWZmZXIoKVxuICAgIHRoaXMuc3RvcCA9IHRydWVcbiAgfVxuXG4gIHNlZWsgKHRhcmdldCkge1xuICAgIHRoaXMubG9hZFRhc2suY2FuY2VsKClcbiAgICBjb25zdCB7a2V5ZnJhbWVzID0ge30sIHZpZGVvVGltZVNjYWxlfSA9IHRoaXMuX3N0b3JlXG4gICAgbGV0IHNlZWtTdGFydCA9IHRhcmdldCAqIHZpZGVvVGltZVNjYWxlXG4gICAgbGV0IHN0YXJ0RmlsZVBvc1xuICAgIGxldCBlbmRGaWxlUG9zXG4gICAgY29uc3QgbGVuZ3RoID0gTWF0aC5taW4oa2V5ZnJhbWVzLmZpbGVQb3NpdGlvbnMubGVuZ3RoLCBrZXlmcmFtZXMudGltZXMubGVuZ3RoKVxuICAgIGxldCB7cHJlbG9hZFRpbWV9ID0gdGhpcy5fY29uZmlnXG5cbiAgICBmdW5jdGlvbiBnZXRFbmRGaWxlUG9zICh0aW1lLCBpZHgpIHtcbiAgICAgIGlmIChpZHggPT09IGtleWZyYW1lcy50aW1lcy5sZW5ndGgpIHtcbiAgICAgICAgZW5kRmlsZVBvcyA9IGlkeFxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICAgIGlmICh0aW1lIDw9IHByZWxvYWRUaW1lICYmIHByZWxvYWRUaW1lIDw9IGtleWZyYW1lcy50aW1lc1tpZHggKyAxXSkge1xuICAgICAgICBlbmRGaWxlUG9zID0gaWR4XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAvLyDpnIDopoHlpITnkIZFT0bnmoTmg4XlhrVcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgbGV0IGxvID0gMFxuICAgIGxldCBoaSA9IGxlbmd0aCAtIDJcbiAgICB3aGlsZSAobG8gPD0gaGkpIHtcbiAgICAgIGxldCBtaWQgPSBNYXRoLmZsb29yKChsbyArIGhpKSAvIDIpXG4gICAgICBsZXQgY3VycmVudFRpbWUgPSBrZXlmcmFtZXMudGltZXNbbWlkXVxuICAgICAgbGV0IG5leHRUaW1lID0ga2V5ZnJhbWVzLnRpbWVzW21pZCArIDFdID8ga2V5ZnJhbWVzLnRpbWVzW21pZCArIDFdIDogTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJcbiAgICAgIGlmICgoY3VycmVudFRpbWUgPD0gc2Vla1N0YXJ0ICYmIHNlZWtTdGFydCA8PSBuZXh0VGltZSkgfHwgbG8gPT09IGhpKSB7XG4gICAgICAgIHN0YXJ0RmlsZVBvcyA9IG1pZFxuICAgICAgICBwcmVsb2FkVGltZSA9IHByZWxvYWRUaW1lICogdmlkZW9UaW1lU2NhbGUgKyBzZWVrU3RhcnRcbiAgICAgICAga2V5ZnJhbWVzLnRpbWVzLmV2ZXJ5KGdldEVuZEZpbGVQb3MpXG4gICAgICAgIGJyZWFrXG4gICAgICB9IGVsc2UgaWYgKHNlZWtTdGFydCA8IGN1cnJlbnRUaW1lKSB7XG4gICAgICAgIGhpID0gbWlkIC0gMVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG8gPSBtaWQgKyAxXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmlzU2Vla2luZykge1xuICAgICAgdGhpcy5pc1NlZWtpbmcgPSB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3N0b3JlLmNsZWFyVGFncygpXG4gICAgfVxuICAgIHRoaXMuX3BlbmRpbmdGcmFnbWVudHMgPSBbXVxuICAgIHRoaXMubXA0cmVtdXhlci5zZWVrKClcbiAgICB0aGlzLmZsdlBhcnNlci5zZWVrKClcbiAgICBWb2RUYXNrLmNsZWFyKClcbiAgICBjb25zdCBfcmFuZ2UgPSB0aGlzLnJhbmdlXG4gICAgaWYgKGtleWZyYW1lcy5maWxlUG9zaXRpb25zW3N0YXJ0RmlsZVBvc10gPCBfcmFuZ2UuZW5kKSB7XG4gICAgICBzdGFydEZpbGVQb3MgKz0gMVxuICAgICAgZW5kRmlsZVBvcyArPSAxXG4gICAgfVxuICAgIHRoaXMucmFuZ2UgPSB7XG4gICAgICBzdGFydDoga2V5ZnJhbWVzLmZpbGVQb3NpdGlvbnNbc3RhcnRGaWxlUG9zXSxcbiAgICAgIGVuZDoga2V5ZnJhbWVzLmZpbGVQb3NpdGlvbnNbZW5kRmlsZVBvc10gLSAxIHx8ICcnXG4gICAgfVxuICAgIHRoaXMuYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgdGhpcy5sb2FkU2VnbWVudHMoZmFsc2UpXG4gIH1cblxuICBnZXQgc2V0Rmx2ICgpIHtcbiAgICByZXR1cm4gdGhpcy5maXJzdEZsYWcgPyB0aGlzLnNldEZsdkZpcnN0IDogdGhpcy5zZXRGbHZVc3VhbGx5XG4gIH1cblxuICBnZXQgaXNNZWRpYUluZm9SZWFkeSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0b3JlLm1lZGlhSW5mby5pc0NvbXBsZXRlXG4gIH1cblxuICBnZXQgdmlkZW9EdXJhdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0b3JlLm1lZGlhSW5mby5kdXJhdGlvblxuICB9XG5cbiAgZ2V0IGhhc1BlbmRpbmdGcmFnbWVudHMgKCkge1xuICAgIHJldHVybiAhIXRoaXMuX3BlbmRpbmdGcmFnbWVudHMubGVuZ3RoXG4gIH1cblxuICBnZXQgcGVuZGluZ0ZyYWdtZW50cyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BlbmRpbmdGcmFnbWVudHNcbiAgfVxuXG4gIGdldCB2aWRlb1RpbWVTY2FsZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0b3JlLnZpZGVvVGltZVNjYWxlXG4gIH1cblxuICBnZXQgaGFzUGVuZGluZ1JlbW92ZVJhbmdlcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BlbmRpbmdSZW1vdmVSYW5nZS5sZW5ndGhcbiAgfVxuXG4gIGdldCBwZW5kaW5nUmVtb3ZlUmFuZ2VzICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcGVuZGluZ1JlbW92ZVJhbmdlXG4gIH1cblxuICBnZXQgaXNTZWVrYWJsZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0b3JlLmlzU2Vla2FibGVcbiAgfVxufVxuIiwiaW1wb3J0IEV4cEdvbG9tYiBmcm9tICAnLi4vdXRpbHMvRXhwR29sb21iJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNQU1BhcnNlciB7XG4gICAgc3RhdGljIGdldFByb2ZpbGVTdHIgKHByb2ZpbGVJZGMpIHtcbiAgICAgICAgc3dpdGNoIChwcm9maWxlSWRjKSB7XG4gICAgICAgICAgICBjYXNlIDY2OlxuICAgICAgICAgICAgICAgIHJldHVybiAnQmFzZWxpbmUnO1xuICAgICAgICAgICAgY2FzZSA3NzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ01haW4nO1xuICAgICAgICAgICAgY2FzZSA4ODpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ0V4dGVuZGVkJztcbiAgICAgICAgICAgIGNhc2UgMTAwOlxuICAgICAgICAgICAgICAgIHJldHVybiAnSGlnaCc7XG4gICAgICAgICAgICBjYXNlIDExMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ0hpZ2gxMCc7XG4gICAgICAgICAgICBjYXNlIDEyMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ0hpZ2g0MjInO1xuICAgICAgICAgICAgY2FzZSAyNDQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdIaWdoNDQ0JztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdVbmtub3duJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXRMZXZlbFN0ciAobGV2ZWxJZGMpIHtcbiAgICAgICAgcmV0dXJuIChsZXZlbElkYyAvIDEwKS50b0ZpeGVkKDEpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRDaHJvbWFGb3JtYXRTdHIgKGNocm9tYSkge1xuICAgICAgICBzd2l0Y2ggKGNocm9tYSkge1xuICAgICAgICAgICAgY2FzZSA0MjA6XG4gICAgICAgICAgICAgICAgcmV0dXJuICc0OjI6MCc7XG4gICAgICAgICAgICBjYXNlIDQyMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gJzQ6MjoyJztcbiAgICAgICAgICAgIGNhc2UgNDQ0OlxuICAgICAgICAgICAgICAgIHJldHVybiAnNDo0OjQnO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1Vua25vd24nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVhZCBTUFNcbiAgICAgKiBAcGFyYW0gb3JpZ2luQXJyXG4gICAgICovXG4gICAgc3RhdGljIHBhcnNlU1BTIChvcmlnaW5BcnIpIHtcblxuICAgICAgICBsZXQgcmJzcCA9IFNQU1BhcnNlci5fZWJzcDJyYnNwKG9yaWdpbkFycik7XG5cbiAgICAgICAgY29uc3Qgc3RyZWFtID0gbmV3IEV4cEdvbG9tYihyYnNwKTtcbiAgICAgICAgY29uc3Qgc3BzQ29uZmlnID0gc3RyZWFtLnJlYWRTUFMoKTtcbiAgICAgICAgY29uc3QgeyBjaHJvbWFGb3JtYXQsIGxldmVsSWRjLCBwcm9maWxlSWRjIH0gPSBzcHNDb25maWc7XG4gICAgICAgIHNwc0NvbmZpZy5wcm9maWxlU3RyaW5nID0gU1BTUGFyc2VyLmdldFByb2ZpbGVTdHIocHJvZmlsZUlkYyk7XG4gICAgICAgIHNwc0NvbmZpZy5sZXZlbFN0cmluZyA9IFNQU1BhcnNlci5nZXRMZXZlbFN0cihsZXZlbElkYyk7XG4gICAgICAgIHNwc0NvbmZpZy5jaHJvbWFGb3JtYXRTdHJpbmcgPSBTUFNQYXJzZXIuZ2V0Q2hyb21hRm9ybWF0U3RyKGNocm9tYUZvcm1hdCk7XG5cbiAgICAgICAgcmV0dXJuIHNwc0NvbmZpZztcblxuICAgIH1cblxuICAgIC8vXG4gICAgc3RhdGljIF9lYnNwMnJic3AgKG9yaWdpbkFycikge1xuICAgICAgICBjb25zdCBvcmlnaW5MZW4gPSAgb3JpZ2luQXJyLmJ5dGVMZW5ndGg7XG4gICAgICAgIGNvbnN0IGRpc3QgPSBuZXcgVWludDhBcnJheShvcmlnaW5BcnIuYnl0ZUxlbmd0aCk7XG4gICAgICAgIGxldCBkaXN0U2l6ZSA9IDA7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IG9yaWdpbkxlbjsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA+IDIgJiYgb3JpZ2luQXJyW2ldID09PSAzICYmIG9yaWdpbkFycltpIC0gMV0gPT09IDAgJiYgb3JpZ2luQXJyW2kgLSAyXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGlzdFtkaXN0U2l6ZSsrXSA9IG9yaWdpbkFycltpXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShkaXN0LmJ1ZmZlciwgMCwgZGlzdFNpemUpO1xuICAgIH1cbn0iLCJpbXBvcnQgb2JzZXJ2ZXIgZnJvbSAnLi4vdXRpbHMvT2JzZXJ2ZXInXG5pbXBvcnQgRXJyb3JzIGZyb20gJy4uL21vZGVscy9lcnJvcidcblxuLyoqXG4gKiDovaznoIHlmajln7rnsbtcbiAqL1xuY2xhc3MgVHJhbnNDb2RlciB7XG4gIGNvbnN0cnVjdG9yIChzdG9yZSkge1xuICAgIGlmIChzdG9yZSkge1xuICAgICAgdGhpcy5fc3RvcmUgPSBzdG9yZVxuICAgIH1cbiAgICB0aGlzLl9vYnNlcnZlciA9IG9ic2VydmVyXG4gICAgdGhpcy5vbiA9IG9ic2VydmVyLm9uLmJpbmQob2JzZXJ2ZXIpXG4gICAgdGhpcy5lbWl0ID0gb2JzZXJ2ZXIuZW1pdC5iaW5kKG9ic2VydmVyKVxuICAgIHRoaXMub2ZmID0gb2JzZXJ2ZXIub2ZmLmJpbmQob2JzZXJ2ZXIpXG4gICAgdGhpcy5mbHVzaCA9IG9ic2VydmVyLmZsdXNoLmJpbmQob2JzZXJ2ZXIpXG4gICAgdGhpcy5vbmNlID0gb2JzZXJ2ZXIub25jZS5iaW5kKG9ic2VydmVyKVxuICB9XG4gIGVtaXRFcnJvciAodHlwZSwgZXJyb3JEZXRhaWwgPSB7bGluZTogJycsIGhhbmRsZTogJycsIG1zZzogJycsIHZlcnNpb246ICcnfSkge1xuICAgIGNvbnN0IHsgcGxheWVyLCBzdGF0ZSB9ID0gdGhpcy5fc3RvcmVcbiAgICBpZiAocGxheWVyKSB7XG4gICAgICBjb25zdCBlcnJvclRvRW1pdCA9IG5ldyBFcnJvcnModHlwZSwgcGxheWVyLmN1cnJlbnRUaW1lLCBzdGF0ZS5kdXJhdGlvbiwgJycsIHRydWUsIHBsYXllci5jb25maWcudXJsLCBwbGF5ZXIuY29uZmlnLnVybCwgcGxheWVyLmVuZGVkLCBlcnJvckRldGFpbClcbiAgICAgIHBsYXllci5lbWl0KCdlcnJvcicsIGVycm9yVG9FbWl0KVxuICAgIH1cbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgVHJhbnNDb2RlclxuIiwiLy8gcmVmcmVuY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS92aWRlby1kZXYvaGxzLmpzL2Jsb2IvbWFzdGVyL3NyYy9kZW11eC9hZHRzLmpzXG5pbXBvcnQgRGVtdXhlciBmcm9tICcuL0RlbXV4ZXInXG5pbXBvcnQgRGF0YVZpZXc0UmVhZCBmcm9tICcuLi8uLi91dGlscy9EYXRhVmlldzRSZWFkJ1xuLy8gaW1wb3J0IHsgbXAzVmVyc2lvbnMsIG1wM0JpdFJhdGUsIGF1ZGlvU2FtcGxlUmF0ZSB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5pbXBvcnQge1xuICBzb3VuZFJhdGVUeXBlcyxcbiAgc2FtcGxpbmdGcmVxdWVuY3lUeXBlcyxcbiAgRXZlbnRUeXBlcyxcbiAgYnJvd3NlclR5cGVzXG59IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcydcbmltcG9ydCBzbmlmZmVyIGZyb20gJy4uLy4uL3V0aWxzL3NuaWZmZXInXG5pbXBvcnQgQnVmZmVyIGZyb20gJy4uLy4uL3dyaXRlL0J1ZmZlcidcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1ZGlvRGVtdXhlciBleHRlbmRzIERlbXV4ZXIge1xuICBjb25zdHJ1Y3RvciAoc3RvcmUpIHtcbiAgICBzdXBlcihzdG9yZSlcbiAgICB0aGlzLkNMQVNTX05BTUUgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWVcbiAgICB0aGlzLmN1cnJlbnRUYWcgPSBudWxsXG4gICAgdGhpcy5kYXRhID0gbmV3IFVpbnQ4QXJyYXkoMClcbiAgICB0aGlzLnJlYWRPZmZzZXQgPSAwXG4gICAgdGhpcy5fc3RvcmUuYXVkaW9NZXRhRGF0YSA9IG51bGxcbiAgICB0aGlzLmhhbmRsZURhdGFSZWFkeSA9ICgpID0+IHt9XG4gICAgdGhpcy5oYW5kbGVNZXRhRGF0YVJlYWR5ID0gKCkgPT4ge31cbiAgICB0aGlzLmhhbmRsZU1lZGlhSW5mb1JlYWR5ID0gKCkgPT4ge31cbiAgfVxuICByZXNvbHZlICh0YWcpIHtcbiAgICB0aGlzLnJlYWRPZmZzZXQgPSAwXG4gICAgY29uc3QgeyBfc3RvcmU6IHN0b3JlIH0gPSB0aGlzXG4gICAgY29uc3QgeyBhdWRpb1RyYWNrOiB0cmFjayB9ID0gc3RvcmVcbiAgICB0aGlzLmN1cnJlbnRUYWcgPSB0YWdcbiAgICB0aGlzLmRhdGEgPSB0YWcuYm9keVxuICAgIGxldCB7XG4gICAgICBhdWRpb01ldGFEYXRhOiBtZXRhXG4gICAgfSA9IHN0b3JlXG5cbiAgICBpZiAoIW1ldGEpIHtcbiAgICAgIG1ldGEgPSBzdG9yZS5hdWRpb01ldGFEYXRhID0ge31cbiAgICAgIHN0b3JlLmF1ZGlvTWV0YURhdGEgPSB0aGlzLmluaXRBdWRpb01ldGEobWV0YSlcbiAgICB9XG5cbiAgICBjb25zdCBkdiA9IG5ldyBEYXRhVmlldzRSZWFkKHRhZy5ib2R5LmJ1ZmZlciwgdGhpcylcblxuICAgIGNvbnN0IHNvdW5kID0gZHYuZ2V0VWludDgoKVxuXG4gICAgY29uc3Qgc291bmRGb3JtYXRJZHggPSBzb3VuZCA+Pj4gNCAvLyAgVUludDRcbiAgICBjb25zdCBzb3VuZFJhdGUgPSAoc291bmQgJiAxMikgPj4+IDIgLy8gIFVJbnQyXG4gICAgLy8gY29uc3Qgc291bmRTaXplID0gKHNvdW5kICYgMikgPj4+IDEgLy8gICBVSW50MVxuICAgIGNvbnN0IHNvdW5kVHlwZSA9IChzb3VuZCAlIDEpIC8vIFVJbnQxXG5cbiAgICBtZXRhLmF1ZGlvU2FtcGxlUmF0ZSA9IHNvdW5kUmF0ZVR5cGVzW3NvdW5kUmF0ZV1cbiAgICBtZXRhLmNoYW5uZWxDb3VudCA9IHNvdW5kVHlwZSA9PT0gMCA/IDEgOiAyXG5cbiAgICBpZiAoc291bmRGb3JtYXRJZHggIT09IDEwICYmIHNvdW5kRm9ybWF0SWR4ICE9PSAyKSB7XG4gICAgICB0aGlzLmVycm9yKCdvbmx5IHN1cHBvcnQgQUFDIEF1ZGlvIGZvcm1hdCBzbyBmYXInKVxuICAgICAgcmV0dXJuXG4gICAgfSBlbHNlIGlmIChzb3VuZEZvcm1hdElkeCA9PT0gMTApIHsgLy8gQUFDXG4gICAgICBjb25zdCBhYWNJbmZvID0gdGhpcy5fcGFyc2VBQUNBdWRpbygpXG4gICAgICBpZiAoIWFhY0luZm8pIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgZGF0YTogYWFjRGF0YSwgZGF0YTogeyBzYW1wbGVGcmVxIH0gfSA9IGFhY0luZm9cbiAgICAgIGlmIChhYWNJbmZvLnBhY2tldFR5cGUgPT09IDApIHsgLy8gQUFDIHNlcXVlbmNlIGhlYWRlclxuICAgICAgICBtZXRhLnNhbXBsZVJhdGUgPSBzYW1wbGVGcmVxXG4gICAgICAgIG1ldGEuY2hhbm5lbENvdW50ID0gYWFjRGF0YS5jaGFubmVsQ291bnRcbiAgICAgICAgbWV0YS5jb2RlYyA9IGFhY0RhdGEuY29kZWNcbiAgICAgICAgbWV0YS5tYW5pZmVzdENvZGVjID0gYWFjRGF0YS5tYW5pZmVzdENvZGVjXG4gICAgICAgIG1ldGEuY29uZmlnID0gYWFjRGF0YS5jb25maWdcbiAgICAgICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA9IDEwMjQgLyBzYW1wbGVGcmVxICogbWV0YS50aW1lU2NhbGVcbiAgICAgICAgaWYgKHN0b3JlLmhhc0luaXRpYWxNZXRhRGlzcGF0Y2hlZCkge1xuICAgICAgICAgIGlmIChzdG9yZS52aWRlb1RyYWNrLmxlbmd0aCB8fCBzdG9yZS5hdWRpb1RyYWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVEYXRhUmVhZHkoc3RvcmUudmlkZW9UcmFjaywgc3RvcmUuYXVkaW9UcmFjaylcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RvcmUuc3RhdGUuX2F1ZGlvSW5pdGlhbE1ldGFkYXRhRGlzcGF0Y2hlZCA9IHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaGFuZGxlTWV0YURhdGFSZWFkeSgnYXVkaW8nLCBtZXRhKVxuXG4gICAgICAgIGNvbnN0IHsgbWVkaWFJbmZvOiBtaSB9ID0gc3RvcmVcbiAgICAgICAgbWkuYXVkaW9Db2RlYyA9IG1ldGEuY29kZWNcbiAgICAgICAgbWkuYXVkaW9TYW1wbGVSYXRlID0gbWV0YS5zYW1wbGVSYXRlXG4gICAgICAgIG1pLmF1ZGlvQ2hhbm5lbENvdW50ID0gbWV0YS5jaGFubmVsQ291bnRcbiAgICAgICAgbWkuYXVkaW9Db25maWcgPSBtZXRhLmNvbmZpZ1xuICAgICAgICBpZiAobWkuaGFzVmlkZW8pIHtcbiAgICAgICAgICBpZiAobWkudmlkZW9Db2RlYykge1xuICAgICAgICAgICAgbWkubWltZVR5cGUgPSBgdmlkZW8veC1mbHY7IGNvZGVjcz1cIiR7bWkudmlkZW9Db2RlY30sJHttaS5hdWRpb0NvZGVjfVwiYFxuICAgICAgICAgICAgbWkuY29kZWMgPSBtaS5taW1lVHlwZS5yZXBsYWNlKCd4LWZsdicsICdtcDQnKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtaS5taW1lVHlwZSA9IGB2aWRlby94LWZsdjsgY29kZWNzPVwiJHttaS5hdWRpb0NvZGVjfVwiYFxuICAgICAgICAgIG1pLmNvZGVjID0gbWkubWltZVR5cGUucmVwbGFjZSgneC1mbHYnLCAnbXA0JylcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtaS5pc0NvbXBsZXRlKSB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVNZWRpYUluZm9SZWFkeShtaSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChhYWNJbmZvLnBhY2tldFR5cGUgPT09IDEpIHsgLy8gQUFDIHJhdyBmcmFtZSBkYXRhXG4gICAgICAgIGxldCBkdHMgPSBzdG9yZS5zdGF0ZS50aW1lU3RhbXBCYXNlICsgdGhpcy5jdXJyZW50VGFnLmdldFRpbWUoKVxuICAgICAgICBsZXQgYWFjU2FtcGxlID0geyB1bml0OiBhYWNJbmZvLmRhdGEsIGxlbmd0aDogYWFjSW5mby5kYXRhLmJ5dGVMZW5ndGgsIGR0czogZHRzLCBwdHM6IGR0cyB9XG4gICAgICAgIHRyYWNrLnNhbXBsZXMucHVzaChhYWNTYW1wbGUpXG4gICAgICAgIHRyYWNrLmxlbmd0aCArPSBhYWNJbmZvLmRhdGEubGVuZ3RoXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5yZXNldFN0YXR1cygpXG4gIH1cblxuICBfcGFyc2VBQUNBdWRpbyAoKSB7XG4gICAgaWYgKHRoaXMudW5yZWFkTGVuZ3RoIDw9IDEpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBhYWNEYXRhID0ge31cbiAgICBsZXQgYWFjQXJyYXkgPSBuZXcgVWludDhBcnJheSh0aGlzLmRhdGEuYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQsIHRoaXMudW5yZWFkTGVuZ3RoKVxuICAgIGNvbnN0IHBhY2tldFR5cGUgPSBhYWNBcnJheVswXVxuICAgIHRoaXMucmVhZE9mZnNldCArPSAxXG4gICAgYWFjRGF0YS5wYWNrZXRUeXBlID0gcGFja2V0VHlwZVxuICAgIGlmICghcGFja2V0VHlwZSkge1xuICAgICAgY29uc3QgeyBwb3NpdGlvbiwgdGFnU2l6ZSB9ID0gdGhpcy5jdXJyZW50VGFnXG4gICAgICB0aGlzLl9zdG9yZS5tZXRhRW5kUG9zaXRpb24gPSBwb3NpdGlvbiArIEJ1ZmZlci5yZWFkQXNJbnQodGFnU2l6ZSkgKyA0XG4gICAgICBhYWNEYXRhLmRhdGEgPSB0aGlzLl9wYXJzZUFBQ0F1ZGlvU3BlY2lmaWNDb25maWcoKSAvLyBBQUMgU2VxdWVuY2UgaGVhZGVyXG4gICAgfSBlbHNlIHtcbiAgICAgIGFhY0RhdGEuZGF0YSA9IGFhY0FycmF5LnNsaWNlKDEpXG4gICAgfVxuXG4gICAgcmV0dXJuIGFhY0RhdGFcbiAgfVxuICBfcGFyc2VBQUNBdWRpb1NwZWNpZmljQ29uZmlnICgpIHtcbiAgICBjb25zdCBkdiA9IG5ldyBEYXRhVmlldzRSZWFkKHRoaXMuZGF0YS5idWZmZXIsIHRoaXMpXG4gICAgY29uc3QgeyBnZXRBbmROdW0gfSA9IERhdGFWaWV3NFJlYWRcblxuICAgIGxldCByZXN1bHRPYmogPSB7XG4gICAgICBzYW1wbGluZ0ZyZXF1ZW5jeTogbnVsbCxcbiAgICAgIGV4dEF1ZGlvT2JqZWN0VHlwZTogbnVsbCxcbiAgICAgIGV4dEF1ZGlvU2FtcGxpbmdJZHg6IG51bGxcbiAgICB9XG4gICAgbGV0IGNvbmZpZyA9IHt9XG4gICAgY29uc3QgVUludDAgPSBkdi5nZXRVaW50OCgpXG4gICAgY29uc3QgVUludDEgPSBkdi5nZXRVaW50OCgpXG5cbiAgICBsZXQgdGVtcEF1ZGlvT2JqZWN0VHlwZVxuICAgIGxldCBhdWRpb09iamVjdFR5cGUgPSB0ZW1wQXVkaW9PYmplY3RUeXBlID0gVUludDAgPj4+IDMgLy8gVUludDVcbiAgICBsZXQgc2FtcGxpbmdJZHggPSAoKFVJbnQwICYgZ2V0QW5kTnVtKDUsIDcpKSA8PCAxKSB8IChVSW50MSA+Pj4gNykgLy8gVUludDRcbiAgICBpZiAoc2FtcGxpbmdJZHggPCAwIHx8IHNhbXBsaW5nSWR4ID4gc2FtcGxpbmdGcmVxdWVuY3lUeXBlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZW1pdEVycm9yKCdkZWNvZGVyJywge1xuICAgICAgICBsaW5lOiAnMTQxJyxcbiAgICAgICAgaGFuZGxlOiAnX3BhcnNlQUFDQXVkaW9TcGVjaWZpY0NvbmZpZycsXG4gICAgICAgIG1zZzogYGludmFsaWQgc2FtcGxpbmdGcmVxdWVuY3lJbmRleCAke3NhbXBsaW5nSWR4fWBcbiAgICAgIH0pXG4gICAgICB0aGlzLmRpc3BhdGNoKEV2ZW50VHlwZXMuRVJST1IsIGBlcnJvciBzYW1wbGluZ0ZyZXF1ZW5jeUluZGV4OiAke3NhbXBsaW5nSWR4fWApXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICByZXN1bHRPYmouc2FtcGxpbmdGcmVxdWVuY3kgPSBzYW1wbGluZ0ZyZXF1ZW5jeVR5cGVzW3NhbXBsaW5nSWR4XVxuXG4gICAgbGV0IGNoYW5uZWxDb3VudCA9IHJlc3VsdE9iai5jaGFubmVsQ291bnQgPSAoVUludDEgJiBnZXRBbmROdW0oMSwgNCkpID4+PiAzXG4gICAgaWYgKGNoYW5uZWxDb3VudCA8IDAgfHwgY2hhbm5lbENvdW50ID4gNykge1xuICAgICAgdGhpcy5lbWl0RXJyb3IoJ2RlY29kZXInLCB7XG4gICAgICAgIGxpbmU6ICcxNTQnLFxuICAgICAgICBoYW5kbGU6ICdfcGFyc2VBQUNBdWRpb1NwZWNpZmljQ29uZmlnJyxcbiAgICAgICAgbXNnOiBgaW52YWxpZCBBdWRpbyBDaGFubmVsIENvdW50OiAke2NoYW5uZWxDb3VudH1gXG4gICAgICB9KVxuICAgICAgdGhpcy5kaXNwYXRjaChFdmVudFR5cGVzLkVSUk9SLCBgZXJyb3IgQXVkaW8gQ2hhbm5lbCBDb3VudDogJHtjaGFubmVsQ291bnR9YClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChhdWRpb09iamVjdFR5cGUgPT09IDUpIHsgLy8gSEUtQUFDXG4gICAgICBjb25zdCBVSW50MiA9IGR2LmdldFVpbnQ4KClcbiAgICAgIHJlc3VsdE9iai5leHRBdWRpb1NhbXBsaW5nSWR4ID0gKChVSW50MSAmIGdldEFuZE51bSg1LCA3KSkgPDwgMSkgfCBVSW50MiA+Pj4gN1xuICAgICAgcmVzdWx0T2JqLmV4dEF1ZGlvT2JqZWN0VHlwZSA9IChVSW50MiAmIGdldEFuZE51bSgxLCA1KSkgPj4+IDJcbiAgICB9XG5cbiAgICBpZiAoc25pZmZlci5icm93c2VyID09PSBicm93c2VyVHlwZXMuRklSRV9GT1gpIHtcbiAgICAgIGlmIChzYW1wbGluZ0lkeCA+PSA2KSB7XG4gICAgICAgIC8vIEhFLUFBQyB1c2VzIFNCUiwgaGlnaCBmcmVxdWVuY2llcyBhcmUgY29uc3RydWN0ZWQgZnJvbSBsb3cgZnJlcXVlbmNpZXNcbiAgICAgICAgYXVkaW9PYmplY3RUeXBlID0gNVxuICAgICAgICBjb25maWcgPSBuZXcgQXJyYXkoNClcbiAgICAgICAgcmVzdWx0T2JqLmV4dEF1ZGlvU2FtcGxpbmdJZHggPSBzYW1wbGluZ0lkeCAtIDNcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF1ZGlvT2JqZWN0VHlwZSA9IDJcbiAgICAgICAgY29uZmlnID0gbmV3IEFycmF5KDIpXG4gICAgICAgIHJlc3VsdE9iai5leHRBdWRpb1NhbXBsaW5nSWR4ID0gc2FtcGxpbmdJZHhcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNuaWZmZXIub3MuaXNBbmRyb2lkKSB7XG4gICAgICAvLyBBbmRyb2lkIDogYWx3YXlzIHVzZSBBQUNcbiAgICAgIGF1ZGlvT2JqZWN0VHlwZSA9IDJcbiAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSgyKVxuICAgICAgcmVzdWx0T2JqLmV4dEF1ZGlvU2FtcGxpbmdJZHggPSBzYW1wbGluZ0lkeFxuICAgIH0gZWxzZSB7XG4gICAgICAvKiAgZm9yIG90aGVyIGJyb3dzZXJzIChDaHJvbWUvVml2YWxkaS9PcGVyYSAuLi4pXG4gICAgICAgICAgICAgICAgYWx3YXlzIGZvcmNlIGF1ZGlvIHR5cGUgdG8gYmUgSEUtQUFDIFNCUiwgYXMgc29tZSBicm93c2VycyBkbyBub3Qgc3VwcG9ydCBhdWRpbyBjb2RlYyBzd2l0Y2ggcHJvcGVybHkgKGxpa2UgQ2hyb21lIC4uLilcbiAgICAgICAgICAgICovXG4gICAgICBhdWRpb09iamVjdFR5cGUgPSA1XG4gICAgICByZXN1bHRPYmouZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCA9IHNhbXBsaW5nSWR4XG4gICAgICBjb25maWcgPSBuZXcgQXJyYXkoNClcblxuICAgICAgaWYgKHNhbXBsaW5nSWR4ID49IDYpIHtcbiAgICAgICAgcmVzdWx0T2JqLmV4dGVuc2lvblNhbXBsaW5nSWR4ID0gc2FtcGxpbmdJZHggLSAzXG4gICAgICB9IGVsc2UgaWYgKGNoYW5uZWxDb3VudCA9PT0gMSkge1xuICAgICAgICBhdWRpb09iamVjdFR5cGUgPSAyXG4gICAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSgyKVxuICAgICAgICByZXN1bHRPYmouZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCA9IHNhbXBsaW5nSWR4XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uZmlnWzBdID0gYXVkaW9PYmplY3RUeXBlIDw8IDNcbiAgICBjb25maWdbMF0gfD0gKHNhbXBsaW5nSWR4ICYgMHgwRSkgPj4gMVxuICAgIGNvbmZpZ1sxXSB8PSAoc2FtcGxpbmdJZHggJiAweDAxKSA8PCA3XG4gICAgY29uZmlnWzFdIHw9IGNoYW5uZWxDb3VudCA8PCAzXG4gICAgaWYgKGF1ZGlvT2JqZWN0VHlwZSA9PT0gNSkge1xuICAgICAgY29uZmlnWzFdIHw9IChyZXN1bHRPYmouZXh0QXVkaW9TYW1wbGluZ0lkeCAmIDB4MEUpID4+IDFcbiAgICAgIGNvbmZpZ1syXSA9IChyZXN1bHRPYmouZXh0ZW5zaW9uU2FtcGxpbmdJZHggJiAweDAxKSA8PCA3XG4gICAgICAvLyBhZHRzT2JqZWN0VHlwZSAoZm9yY2UgdG8gMiwgY2hyb21lIGlzIGNoZWNraW5nIHRoYXQgb2JqZWN0IHR5cGUgaXMgbGVzcyB0aGFuIDUgPz8/XG4gICAgICAvLyAgICBodHRwczovL2Nocm9taXVtLmdvb2dsZXNvdXJjZS5jb20vY2hyb21pdW0vc3JjLmdpdC8rL21hc3Rlci9tZWRpYS9mb3JtYXRzL21wNC9hYWMuY2NcbiAgICAgIGNvbmZpZ1syXSB8PSAyIDw8IDJcbiAgICAgIGNvbmZpZ1szXSA9IDBcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgY29uZmlnLFxuICAgICAgc2FtcGxlRnJlcTogcmVzdWx0T2JqLnNhbXBsaW5nRnJlcXVlbmN5LFxuICAgICAgY2hhbm5lbENvdW50LFxuICAgICAgY29kZWM6IGBtcDRhLjQwLiR7YXVkaW9PYmplY3RUeXBlfWAsXG4gICAgICBtYW5pZmVzdENvZGVjOiBgbXA0YS40MC4ke3RlbXBBdWRpb09iamVjdFR5cGV9YFxuICAgIH1cbiAgfVxuXG4gIGluaXRBdWRpb01ldGEgKG1ldGEpIHtcbiAgICBjb25zdCB7IHN0YXRlLCBhdWRpb1RyYWNrOiB0cmFjayB9ID0gdGhpcy5fc3RvcmVcblxuICAgIG1ldGEuZHVyYXRpb24gPSBzdGF0ZS5kdXJhdGlvblxuICAgIG1ldGEudGltZVNjYWxlID0gc3RhdGUudGltZVNjYWxlXG4gICAgbWV0YS50eXBlID0gJ2F1ZGlvJ1xuICAgIG1ldGEuaWQgPSB0cmFjay5pZFxuXG4gICAgcmV0dXJuIG1ldGFcbiAgfVxuXG4gIHJlc2V0U3RhdHVzICgpIHtcbiAgICB0aGlzLmN1cnJlbnRUYWcgPSBudWxsXG4gICAgdGhpcy5kYXRhID0gbmV3IFVpbnQ4QXJyYXkoMClcbiAgICB0aGlzLnJlYWRPZmZzZXQgPSAwXG4gIH1cbiAgZ2V0IGRhdGFTaXplICgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLmxlbmd0aFxuICB9XG5cbiAgZ2V0IHVucmVhZExlbmd0aCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVNpemUgLSB0aGlzLnJlYWRPZmZzZXRcbiAgfVxufVxuIiwiaW1wb3J0IExvZyBmcm9tICcuLi8uLi91dGlscy9Mb2cnXG5pbXBvcnQgVHJhbnNDb2RlciBmcm9tICcuLi9UcmFuc0NvZGVyJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVtdXhlciBleHRlbmRzIFRyYW5zQ29kZXIge1xuICBkaXNwYXRjaCAodHlwZSwgLi4ucGF5bG9hZCkge1xuICAgIGNvbnN0IHByZWZpeCA9ICdkZW11eGVyXydcbiAgICB0aGlzLl9vYnNlcnZlci5lbWl0KGAke3ByZWZpeH0ke3R5cGV9YCwgLi4ucGF5bG9hZClcbiAgfVxuICBlcnJvciAobWVzc2FnZSkge1xuICAgIGNvbnN0IHsgQ0xBU1NfTkFNRSA9ICdEZW11eGVyJyB9ID0gdGhpc1xuICAgIExvZy5lcnJvcihgWyR7Q0xBU1NfTkFNRX0gZXJyb3JdIGAsIG1lc3NhZ2UpXG4gIH1cblxuICBpbmZvIChtZXNzYWdlKSB7XG4gICAgY29uc3QgeyBDTEFTU19OQU1FID0gJ0RlbXV4ZXInIH0gPSB0aGlzXG4gICAgTG9nLmluZm8oYFske0NMQVNTX05BTUV9IGluZm9dIGAsIG1lc3NhZ2UpXG4gIH1cblxuICBsb2cgKG1lc3NhZ2UpIHtcbiAgICBjb25zdCB7IENMQVNTX05BTUUgPSAnRGVtdXhlcicgfSA9IHRoaXNcbiAgICBMb2cubG9nKGBbJHtDTEFTU19OQU1FfSBsb2ddIGAsIG1lc3NhZ2UpXG4gIH1cblxuICB3YXJuIChtZXNzYWdlKSB7XG4gICAgY29uc3QgeyBDTEFTU19OQU1FID0gJ0RlbXV4ZXInIH0gPSB0aGlzXG4gICAgTG9nLndhcm4oYFske0NMQVNTX05BTUV9IHdhcm5dIGAsIG1lc3NhZ2UpXG4gIH1cbn1cbiIsImltcG9ydCB7IE1ldGFUeXBlcyB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy90eXBlcyc7XG5pbXBvcnQgVVRGOCBmcm9tICcuLi8uLi91dGlscy9VVEY4JztcbmltcG9ydCBEZW11eGVyIGZyb20gJy4vRGVtdXhlcic7XG5cbi8qKlxuICogbWV0YeS/oeaBr+ino+aekFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXRhRGVtdXhlciBleHRlbmRzIERlbXV4ZXIge1xuICAgIGNvbnN0cnVjdG9yIChzdG9yZSkge1xuICAgICAgICBzdXBlcihzdG9yZSk7XG4gICAgICAgIHRoaXMub2Zmc2V0ID0gMDtcbiAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgfVxuICAgIGdldCBpc0xlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0b3JlLmlzTGU7XG4gICAgfVxuICAgIHJlc29sdmUgKG1ldGEsIHNpemUpIHtcbiAgICAgICAgaWYgKHNpemUgPCAzKSB7XG4gICAgICAgICAgICB0aHJvdyAnbm90IGVub3VnaCBkYXRhIGZvciBtZXRhaW5mbyc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWV0YURhdGEgPSB7fTtcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMucGFyc2VWYWx1ZShtZXRhKTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnBhcnNlVmFsdWUobWV0YSwgc2l6ZSAtIG5hbWUuYm9keVNpemUpO1xuICAgICAgICBtZXRhRGF0YVtuYW1lLmRhdGFdID0gdmFsdWUuZGF0YTtcblxuICAgICAgICB0aGlzLnJlc2V0U3RhdHVzKCk7XG4gICAgICAgIHJldHVybiBtZXRhRGF0YTtcbiAgICB9XG5cbiAgICByZXNldFN0YXR1cyAoKSB7XG4gICAgICAgIHRoaXMub2Zmc2V0ID0gMDtcbiAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgfVxuXG4gICAgcGFyc2VTdHJpbmcgKGJ1ZmZlcikge1xuICAgICAgICBjb25zdCBkdiA9IG5ldyBEYXRhVmlldyhidWZmZXIsIHRoaXMucmVhZE9mZnNldCk7XG4gICAgICAgIGNvbnN0IHN0ckxlbiA9IGR2LmdldFVpbnQxNigwLCAhdGhpcy5pc0xlKTtcbiAgICAgICAgbGV0IHN0ciA9ICcnO1xuICAgICAgICBpZiAoc3RyTGVuID4gMCkge1xuICAgICAgICAgICAgc3RyID0gVVRGOC5kZWNvZGUobmV3IFVpbnQ4QXJyYXkoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQgKyAyLCBzdHJMZW4pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0ciA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzaXplID0gc3RyTGVuICsgMjtcbiAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IHNpemU7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhOiBzdHIsXG4gICAgICAgICAgICBib2R5U2l6ZTogc3RyTGVuICsgMixcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwYXJzZURhdGUgKGJ1ZmZlciwgc2l6ZSkge1xuICAgICAgICBjb25zdCB7IGlzTGUgfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IGR2ID0gbmV3IERhdGFWaWV3KGJ1ZmZlciwgdGhpcy5yZWFkT2Zmc2V0LCBzaXplKTtcbiAgICAgICAgbGV0IHRzID0gZHYuZ2V0RmxvYXQ2NCgwLCAhaXNMZSk7XG4gICAgICAgIGNvbnN0IHRpbWVPZmZzZXQgPSBkdi5nZXRJbnQxNig4LCAhaXNMZSk7XG4gICAgICAgIHRzICs9IHRpbWVPZmZzZXQgKiA2MCAqIDEwMDA7XG5cbiAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDEwO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF0YTogbmV3IERhdGUodHMpLFxuICAgICAgICAgICAgYm9keVNpemU6IDEwLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHBhcnNlT2JqZWN0IChidWZmZXIsIHNpemUpIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMucGFyc2VTdHJpbmcoYnVmZmVyLCBzaXplKTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnBhcnNlVmFsdWUoYnVmZmVyLCBzaXplIC0gbmFtZS5ib2R5U2l6ZSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZS5kYXRhLFxuICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZS5kYXRhLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHlTaXplOiBuYW1lLmJvZHlTaXplICsgdmFsdWUuYm9keVNpemUsXG4gICAgICAgICAgICBpc09iakVuZDogdmFsdWUuaXNPYmpFbmQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcGFyc2VMb25nU3RyaW5nIChidWZmZXIpIHtcbiAgICAgICAgY29uc3QgZHYgPSBuZXcgRGF0YVZpZXcoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQpO1xuICAgICAgICBjb25zdCBzdHJMZW4gPSBkdi5nZXRVaW50MzIoMCwgIXRoaXMuaXNMZSk7XG4gICAgICAgIGxldCBzdHIgPSAnJztcbiAgICAgICAgaWYgKHN0ckxlbiA+IDApIHtcbiAgICAgICAgICAgIHN0ciA9IFVURjguZGVjb2RlKG5ldyBVaW50OEFycmF5KGJ1ZmZlciwgdGhpcy5yZWFkT2Zmc2V0ICsgMiwgc3RyTGVuKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHIgPSAnJztcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zdCBzaXplID0gc3RyTGVuICsgNDtcbiAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IHN0ckxlbiArIDQ7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhOiBzdHIsXG4gICAgICAgICAgICBib2R5U2l6ZTogc3RyTGVuICsgNCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDop6PmnpBtZXRh5Lit55qE5Y+Y6YePXG4gICAgICovXG4gICAgcGFyc2VWYWx1ZSAoZGF0YSwgc2l6ZSkge1xuICAgICAgICBsZXQgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKCk7XG4gICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICAgIGJ1ZmZlciA9IGRhdGE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBidWZmZXIgPSBkYXRhLmJ1ZmZlcjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IGlzTGUgfSA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIE5VTUJFUixcbiAgICAgICAgICAgIEJPT0xFQU4sXG4gICAgICAgICAgICBTVFJJTkcsXG4gICAgICAgICAgICBPQkpFQ1QsXG4gICAgICAgICAgICBNSVhfQVJSQVksXG4gICAgICAgICAgICBPQkpFQ1RfRU5ELFxuICAgICAgICAgICAgU1RSSUNUX0FSUkFZLFxuICAgICAgICAgICAgREFURSxcbiAgICAgICAgICAgIExPTkVfU1RSSU5HLFxuICAgICAgICB9ID0gTWV0YVR5cGVzO1xuICAgICAgICBjb25zdCBkYXRhVmlldyA9IG5ldyBEYXRhVmlldyhidWZmZXIsIHRoaXMucmVhZE9mZnNldCwgc2l6ZSk7XG4gICAgICAgIGxldCBpc09iakVuZCA9IGZhbHNlO1xuICAgICAgICBjb25zdCB0eXBlID0gZGF0YVZpZXcuZ2V0VWludDgoMCk7XG4gICAgICAgIGxldCBvZmZzZXQgPSAxO1xuICAgICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gMTtcbiAgICAgICAgbGV0IHZhbHVlID0gbnVsbDtcblxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgTlVNQkVSOiB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBkYXRhVmlldy5nZXRGbG9hdDY0KDEsICFpc0xlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gODtcbiAgICAgICAgICAgICAgICBvZmZzZXQgKz0gODtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgQk9PTEVBTjoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJvb2xOdW0gPSBkYXRhVmlldy5nZXRVaW50OCgxKTtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9ICEhYm9vbE51bTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gMTtcbiAgICAgICAgICAgICAgICBvZmZzZXQgKz0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgU1RSSU5HOiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RyID0gdGhpcy5wYXJzZVN0cmluZyhidWZmZXIpO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gc3RyLmRhdGE7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ICs9IHN0ci5ib2R5U2l6ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgT0JKRUNUOiB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB7fTtcbiAgICAgICAgICAgICAgICBsZXQgb2JqRW5kU2l6ZSA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGFWaWV3LmdldFVpbnQzMihzaXplIC0gNCwgIWlzTGUpICYgMHgwMEZGRkZGRikge1xuICAgICAgICAgICAgICAgICAgICBvYmpFbmRTaXplID0gMztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5yZWFkT2Zmc2V0ICs9IG9mZnNldCAtIDE7XG4gICAgICAgICAgICAgICAgd2hpbGUgKG9mZnNldCA8IHNpemUgLSA0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYW1mT2JqID0gdGhpcy5wYXJzZU9iamVjdChidWZmZXIsIHNpemUgLSBvZmZzZXQgLSBvYmpFbmRTaXplKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFtZk9iai5pc09iamVjdEVuZCkgeyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZVthbWZPYmouZGF0YS5uYW1lXSA9IGFtZk9iai5kYXRhLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgKz0gYW1mT2JqLmJvZHlTaXplO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAob2Zmc2V0IDw9IHNpemUgLSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hcmsgPSBkYXRhVmlldy5nZXRVaW50MzIob2Zmc2V0IC0gMSwgIWlzTGUpICYgMHgwMEZGRkZGRjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hcmsgPT09IDkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVhZE9mZnNldCArPSAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ICs9IDM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIE1JWF9BUlJBWToge1xuICAgICAgICAgICAgICAgIHZhbHVlID0ge307XG4gICAgICAgICAgICAgICAgb2Zmc2V0ICs9IDQ7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDQ7XG4gICAgICAgICAgICAgICAgbGV0IG9iakVuZFNpemUgPSAwO1xuICAgICAgICAgICAgICAgIGlmICgoZGF0YVZpZXcuZ2V0VWludDMyKHNpemUgLSA0LCAhaXNMZSkgJiAweDAwRkZGRkZGKSA9PT0gOSkge1xuICAgICAgICAgICAgICAgICAgICBvYmpFbmRTaXplID0gMztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB3aGlsZSAob2Zmc2V0IDwgc2l6ZSAtIDgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYW1mVmFyID0gdGhpcy5wYXJzZU9iamVjdChidWZmZXIsIHNpemUgLSBvZmZzZXQgLSBvYmpFbmRTaXplKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFtZlZhci5pc09iamVjdEVuZCkgeyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZVthbWZWYXIuZGF0YS5uYW1lXSA9IGFtZlZhci5kYXRhLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgKz0gYW1mVmFyLmJvZHlTaXplO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgPD0gc2l6ZSAtIDMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFya2VyID0gZGF0YVZpZXcuZ2V0VWludDMyKG9mZnNldCAtIDEsICFpc0xlKSAmIDB4MDBGRkZGRkY7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXJrZXIgPT09IDkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCArPSAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgT0JKRUNUX0VORDoge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpc09iakVuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgU1RSSUNUX0FSUkFZOiB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBbXTtcbiAgICAgICAgICAgICAgICBjb25zdCBhcnJMZW5ndGggPSBkYXRhVmlldy5nZXRVaW50MzIoMSwgIWlzTGUpO1xuICAgICAgICAgICAgICAgIG9mZnNldCArPSA0O1xuICAgICAgICAgICAgICAgIHRoaXMucmVhZE9mZnNldCArPSA0O1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyTGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzY3JpcHQgPSB0aGlzLnBhcnNlVmFsdWUoYnVmZmVyLCBzaXplIC0gb2Zmc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUucHVzaChzY3JpcHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCArPSBzY3JpcHQuYm9keVNpemU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYXNlIERBVEU6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gdGhpcy5wYXJzZURhdGUoYnVmZmVyLCBzaXplIC0gMSk7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBkYXRlLmRhdGE7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ICs9IGRhdGUuYm9keVNpemU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgTE9ORV9TVFJJTkc6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBsb25nU3RyID0gdGhpcy5wYXJzZUxvbmdTdHJpbmcoYnVmZmVyLCBzaXplIC0gMSk7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBsb25nU3RyLmRhdGE7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ICs9IGxvbmdTdHIuYm9keVNpemU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSBzaXplO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGE6IHZhbHVlLFxuICAgICAgICAgICAgYm9keVNpemU6IG9mZnNldCxcbiAgICAgICAgICAgIGlzT2JqRW5kOiBpc09iakVuZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbn1cblxuIiwiaW1wb3J0IERlbXV4ZXIgZnJvbSAnLi9EZW11eGVyJ1xuaW1wb3J0IE1ldGFEZW11eGVyIGZyb20gJy4vTWV0YURlbXV4ZXInXG5pbXBvcnQgVmlkZW9EZW11eGVyIGZyb20gJy4vVmlkZW9EZW11eGVyJ1xuaW1wb3J0IEF1ZGlvRGVtdXhlciBmcm9tICcuL0F1ZGlvRGVtdXhlcidcbmltcG9ydCBMb2dnZXIgZnJvbSAnLi4vLi4vdXRpbHMvTG9nJ1xuaW1wb3J0IG1ldGFGaWVsZHMgZnJvbSAnLi4vLi4vY29uc3RhbnRzL21ldGFGaWVsZHMnXG5cbmNvbnN0IG5hdGl2ZUhhc1Byb3AgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhZ2RlbXV4IGV4dGVuZHMgRGVtdXhlciB7XG4gIGNvbnN0cnVjdG9yIChzdG9yZSkge1xuICAgIHN1cGVyKHN0b3JlKVxuICAgIHRoaXMuQ0xBU1NfTkFNRSA9IHRoaXMuY29uc3RydWN0b3IubmFtZVxuICAgIHRoaXMuX21ldGFEZW11eGVyID0gbmV3IE1ldGFEZW11eGVyKHN0b3JlKVxuICAgIHRoaXMuX3ZpZGVvRGVtdXhlciA9IG5ldyBWaWRlb0RlbXV4ZXIoc3RvcmUpXG4gICAgdGhpcy5fYXVkaW9EZW11eGVyID0gbmV3IEF1ZGlvRGVtdXhlcihzdG9yZSlcbiAgICB0aGlzLl9maXJzdFBhcnNlID0gdHJ1ZVxuICAgIHRoaXMuX2RhdGFPZmZzZXQgPSAwXG4gICAgdGhpcy5oYW5kbGVNZWRpYUluZm9SZWFkeSA9ICgpID0+IHt9XG4gICAgdGhpcy5oYW5kbGVEYXRhUmVhZHkgPSAoKSA9PiB7fVxuICAgIHRoaXMuaGFuZGxlTWV0YURhdGFSZWFkeSA9ICgpID0+IHt9XG4gIH1cbiAgc2V0RXZlbnRCaW5kICgpIHtcbiAgICB0aGlzLl92aWRlb0RlbXV4ZXIuaGFuZGxlRGF0YVJlYWR5ID0gdGhpcy5oYW5kbGVEYXRhUmVhZHlcbiAgICB0aGlzLl92aWRlb0RlbXV4ZXIuaGFuZGxlTWV0YURhdGFSZWFkeSA9IHRoaXMuaGFuZGxlTWV0YURhdGFSZWFkeVxuICAgIHRoaXMuX3ZpZGVvRGVtdXhlci5oYW5kbGVNZWRpYUluZm9SZWFkeSA9IHRoaXMuaGFuZGxlTWVkaWFJbmZvUmVhZHlcbiAgICB0aGlzLl9hdWRpb0RlbXV4ZXIuaGFuZGxlRGF0YVJlYWR5ID0gdGhpcy5oYW5kbGVEYXRhUmVhZHlcbiAgICB0aGlzLl9hdWRpb0RlbXV4ZXIuaGFuZGxlTWV0YURhdGFSZWFkeSA9IHRoaXMuaGFuZGxlTWV0YURhdGFSZWFkeVxuICAgIHRoaXMuX2F1ZGlvRGVtdXhlci5oYW5kbGVNZWRpYUluZm9SZWFkeSA9IHRoaXMuaGFuZGxlTWVkaWFJbmZvUmVhZHlcbiAgfVxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLl9tZXRhRGVtdXhlciA9IG51bGxcbiAgICB0aGlzLl92aWRlb0RlbXV4ZXIgPSBudWxsXG4gICAgdGhpcy5fYXVkaW9EZW11eGVyID0gbnVsbFxuICB9XG5cbiAgcmVzb2x2ZVRhZ3MgKCkge1xuICAgIGNvbnN0IHt0YWdzfSA9IHRoaXMuX3N0b3JlLnN0YXRlXG5cbiAgICBjb25zdCB7X3N0b3JlOiBzdG9yZX0gPSB0aGlzXG4gICAgY29uc3Qge3ZpZGVvVHJhY2ssIGF1ZGlvVHJhY2t9ID0gc3RvcmVcblxuICAgIHRhZ3MuZm9yRWFjaCgodGFnKSA9PiB7XG4gICAgICB0aGlzLnJlc29sdmVUYWcodGFnKVxuICAgIH0pXG5cbiAgICBpZiAodGhpcy5fc3RvcmUuaGFzSW5pdGlhbE1ldGFEaXNwYXRjaGVkKSB7XG4gICAgICBpZiAodmlkZW9UcmFjay5sZW5ndGggfHwgYXVkaW9UcmFjay5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVEYXRhUmVhZHkoYXVkaW9UcmFjaywgdmlkZW9UcmFjaylcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9zdG9yZS5zdGF0ZS50YWdzID0gW11cbiAgfVxuXG4gIHJlc29sdmVUYWcgKHRhZykge1xuICAgIHN3aXRjaCAoU3RyaW5nKHRhZy50YWdUeXBlKSkge1xuICAgICAgY2FzZSAnOCc6IC8vIGF1ZGlvXG4gICAgICAgIHRoaXMuX3Jlc29sdmVBdWRpb1RhZyh0YWcpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICc5JzogLy8gdmlkZW9cbiAgICAgICAgdGhpcy5fcmVzb2x2ZVZpZGVvVGFnKHRhZylcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJzE4JzogLy8gbWV0YWRhdGFcbiAgICAgICAgdGhpcy5fcmVzb2x2ZU1ldGFUYWcodGFnKVxuICAgICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIF9yZXNvbHZlQXVkaW9UYWcgKHRhZykge1xuICAgIGlmICh0YWcuYm9keVNpemUgPD0gMSkge1xuICAgICAgdGhpcy53YXJuKCdOb3QgZW5vdWdoIGRhdGEgZm9yIGF1ZGlvIHRhZyBib2R5JylcbiAgICB9XG4gICAgdGhpcy5fYXVkaW9EZW11eGVyLnJlc29sdmUodGFnKVxuICB9XG5cbiAgX3Jlc29sdmVWaWRlb1RhZyAodGFnKSB7XG4gICAgaWYgKHRhZy5ib2R5U2l6ZSA8PSAxKSB7XG4gICAgICB0aGlzLmVycm9yKCdOb3QgZW5vdWdoIGRhdGEgZm9yIHZpZGVvIHRhZyBib2R5JylcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCB7X2hhc1ZpZGVvLCBoYXNWaWRlb0ZsYWdPdmVycmlkZWR9ID0gdGhpc1xuICAgIGlmIChoYXNWaWRlb0ZsYWdPdmVycmlkZWQgJiYgIV9oYXNWaWRlbykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5fdmlkZW9EZW11eGVyLnJlc29sdmUodGFnKVxuICB9XG5cbiAgX2luaXRNZXRhRGF0YSAobWV0YURhdGEpIHtcbiAgICBjb25zdCB7X3N0b3JlOiBzfSA9IHRoaXNcbiAgICBpZiAobmF0aXZlSGFzUHJvcC5jYWxsKG1ldGFEYXRhLCAnb25NZXRhRGF0YScpKSB7XG4gICAgICBpZiAocy5oYXNNZXRhRGF0YSkge1xuICAgICAgICBMb2dnZXIubG9nKGBbJHt0aGlzLkNMQVNTX05BTUV9XWAsICdmb3VuZCBhbm90aGVyIG1ldGEgdGFnJylcbiAgICAgIH1cbiAgICAgIHMubWV0YURhdGEgPSBtZXRhRGF0YVxuICAgICAgY29uc3Qgb25NZXRhRGF0YSA9IG1ldGFEYXRhLm9uTWV0YURhdGFcblxuICAgICAgbWV0YUZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgICAgY29uc3Qge25hbWUsIHR5cGUsIHBhcnNlciwgb25UeXBlRXJyfSA9IGZpZWxkXG4gICAgICAgIGlmIChPYmplY3Qob25NZXRhRGF0YVtuYW1lXSkgaW5zdGFuY2VvZiB0eXBlKSB7XG4gICAgICAgICAgcGFyc2VyLmNhbGwodGhpcywgcywgb25NZXRhRGF0YSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAob25UeXBlRXJyICYmIG9uVHlwZUVyciBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICBvblR5cGVFcnIocywgb25NZXRhRGF0YSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIHRoaXMuX3N0b3JlLm1lZGlhSW5mby5fbWV0YURhdGEgPSBtZXRhRGF0YVxuICAgICAgLy8g5ZCM5q2l5Yiw5YWx5Lqrc3RvcmVcbiAgICAgIGlmICh0aGlzLl9zdG9yZS5tZWRpYUluZm8uaXNDb21wbGV0ZSkge1xuICAgICAgICB0aGlzLmhhbmRsZU1lZGlhSW5mb1JlYWR5KHRoaXMuX3N0b3JlLm1lZGlhSW5mbylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfcmVzb2x2ZU1ldGFUYWcgKHRhZykge1xuICAgIGNvbnN0IHtib2R5fSA9IHRhZ1xuICAgIGNvbnN0IG1ldGFPYmogPSB0aGlzLl9tZXRhRGVtdXhlci5yZXNvbHZlKGJvZHksIGJvZHkubGVuZ3RoKVxuICAgIHRoaXMuX2luaXRNZXRhRGF0YShtZXRhT2JqKVxuICB9XG5cbiAgX3BhcnNlS2V5ZnJhbWVzIChrZXlmcmFtZXMpIHtcbiAgICBsZXQgdGltZXMgPSBbXVxuICAgIGxldCBmaWxlUG9zaXRpb25zID0gW11cbiAgICBjb25zdCB7dmlkZW9UaW1lU2NhbGUsIHN0YXRlfSA9IHRoaXMuX3N0b3JlXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBrZXlmcmFtZXMudGltZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRpbWVzW3RpbWVzLmxlbmd0aF0gPSBzdGF0ZS50aW1lU3RhbXBCYXNlICsgTWF0aC5mbG9vcihrZXlmcmFtZXMudGltZXNbaV0gKiB2aWRlb1RpbWVTY2FsZSlcbiAgICAgIGZpbGVQb3NpdGlvbnNbZmlsZVBvc2l0aW9ucy5sZW5ndGhdID0ga2V5ZnJhbWVzLmZpbGVwb3NpdGlvbnNbaV1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgdGltZXMsXG4gICAgICBmaWxlUG9zaXRpb25zXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgRGVtdXhlciBmcm9tICcuL0RlbXV4ZXInXG5pbXBvcnQgU1BTUGFyc2VyIGZyb20gJy4uL1NQU1BhcnNlcidcbmltcG9ydCBEYXRhVmlldzRSZWFkIGZyb20gJy4uLy4uL3V0aWxzL0RhdGFWaWV3NFJlYWQnXG5pbXBvcnQgeyBFdmVudFR5cGVzIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJ1xuaW1wb3J0IEJ1ZmZlciBmcm9tICcuLi8uLi93cml0ZS9CdWZmZXInXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWRlb0RlbXV4ZXIgZXh0ZW5kcyBEZW11eGVyIHtcbiAgY29uc3RydWN0b3IgKHN0b3JlKSB7XG4gICAgc3VwZXIoc3RvcmUpXG4gICAgdGhpcy5DTEFTU19OQU1FID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lXG4gICAgdGhpcy5yZWFkT2Zmc2V0ID0gMFxuICAgIHRoaXMuZGF0YSA9IG5ldyBVaW50OEFycmF5KDApXG4gICAgdGhpcy5jdXJyZW50VGFnID0gbnVsbFxuICAgIHRoaXMuX3N0b3JlLnZpZGVvTWV0YURhdGEgPSBudWxsXG4gIH1cblxuICByZXNldFN0YXR1cyAoKSB7XG4gICAgdGhpcy5yZWFkT2Zmc2V0ID0gMFxuICAgIHRoaXMuZGF0YSA9IG5ldyBVaW50OEFycmF5KDApXG4gICAgdGhpcy5jdXJyZW50VGFnID0gbnVsbFxuICB9XG5cbiAgcmVzb2x2ZSAodGFnKSB7XG4gICAgdGhpcy5kYXRhID0gdGFnLmJvZHlcbiAgICB0aGlzLmN1cnJlbnRUYWcgPSB0YWdcbiAgICBjb25zdCBmaXJzdFVJOCA9IHRoaXMucmVhZERhdGEoMSlbMF1cbiAgICBjb25zdCBmcmFtZVR5cGUgPSAoZmlyc3RVSTggJiAweEYwKSA+Pj4gNFxuICAgIGNvbnN0IGNvZGVjSWQgPSBmaXJzdFVJOCAmIDB4MEZcbiAgICBpZiAoY29kZWNJZCAhPT0gNykge1xuICAgICAgLyoqIDE6IEpQRUdcbiAgICAgICAgICAgICogMjogSDI2M1xuICAgICAgICAgICAgKiAzOiBTY3JlZW4gdmlkZW9cbiAgICAgICAgICAgICogNDogT24yIFZQNlxuICAgICAgICAgICAgKiA1OiBPbjIgVlA2XG4gICAgICAgICAgICAqIDY6IFNjcmVlbiB2aWRlb3ZlcnNpb24gMlxuICAgICAgICAgICAgKiA3OiBBVkNcbiAgICAgICAgICAgICovXG4gICAgICB0aGlzLmVycm9yKGB1bnN1cHBvcnRlZCBjb2RlY0lkOiAke2NvZGVjSWR9YClcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB0aGlzLl9wYXJzZUFWQ1BhY2tldChmcmFtZVR5cGUpXG5cbiAgICB0aGlzLnJlc2V0U3RhdHVzKClcbiAgfVxuXG4gIF9wYXJzZUFWQ1BhY2tldCAoZnJhbWVUeXBlKSB7XG4gICAgaWYgKHRoaXMudW5yZWFkTGVuZ3RoIDwgNCkge1xuICAgICAgdGhpcy5lcnJvcignSW52YWxpZCBBdmMgVGFnJylcbiAgICB9XG4gICAgY29uc3QgaXNMZSA9IHRoaXMuX3N0b3JlLmlzTGVcbiAgICBjb25zdCB7IGJ1ZmZlciB9ID0gdGhpcy5kYXRhXG4gICAgY29uc3QgZHYgPSBuZXcgRGF0YVZpZXcoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQsIHRoaXMudW5yZWFkTGVuZ3RoKVxuICAgIGNvbnN0IHBhY2thZ2VUeXBlID0gZHYuZ2V0VWludDgoMClcblxuICAgIGxldCBjcHNUaW1lID0gZHYuZ2V0VWludDMyKDAsICFpc0xlKSAmIDB4MDBGRkZGRkZcbiAgICBjcHNUaW1lID0gKGNwc1RpbWUgPDwgOCkgPj4gOFxuICAgIHRoaXMucmVhZE9mZnNldCArPSA0XG5cbiAgICBzd2l0Y2ggKHBhY2thZ2VUeXBlKSB7XG4gICAgICBjYXNlIDA6IHtcbiAgICAgICAgY29uc3QgeyBwb3NpdGlvbiwgdGFnU2l6ZSB9ID0gdGhpcy5jdXJyZW50VGFnXG5cbiAgICAgICAgdGhpcy5fc3RvcmUubWV0YUVuZFBvc2l0aW9uID0gcG9zaXRpb24gKyBCdWZmZXIucmVhZEFzSW50KHRhZ1NpemUpICsgNCAvLyDnvJPlrZhzY3JpcHRUYWfnu5PmnZ/nmoTkvY3nva7vvIxyZXBsYXnkvb/nlKhcbiAgICAgICAgdGhpcy5fcGFyc2VBVkNEZWNvZGVyQ29uZmlndXJhdGlvblJlY29yZCgpXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjYXNlIDE6IHtcbiAgICAgICAgdGhpcy5fcGFyc2VBVkNWaWRlb0RhdGEoZnJhbWVUeXBlLCBjcHNUaW1lKVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgY2FzZSAyOiB7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIC8vIOaKpemUmVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9wYXJzZUFWQ0RlY29kZXJDb25maWd1cmF0aW9uUmVjb3JkICgpIHtcbiAgICBpZiAodGhpcy51bnJlYWRMZW5ndGggPCA3KSB7XG4gICAgICB0aGlzLmVycm9yKCdJbnZhbGlkIEFWQ0RlY29kZXJDb25maWd1cmF0aW9uUmVjb3JkLCBsYWNrIG9mIGRhdGEhJylcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHsgbWVkaWFJbmZvOiBtaSB9ID0gdGhpcy5fc3RvcmVcbiAgICAvLyBzdGFzaCBvZmZzZXQmdW5yZWFkU2l6ZSBiZWZvcmUgcGFyc2luZyBzcHMmcHBzXG4gICAgLy8gY29uc3QgdGVtcE9mZnNldCA9IHRoaXMucmVhZE9mZnNldFxuICAgIC8vIGNvbnN0IHRlbXBVbnJlYWRMZW5ndGggPSB0aGlzLnVucmVhZExlbmd0aFxuXG4gICAgY29uc3QgeyBfc3RvcmU6IHN0b3JlIH0gPSB0aGlzXG4gICAgbGV0IG1ldGEgPSB0aGlzLl9zdG9yZS52aWRlb01ldGFEYXRhXG4gICAgbGV0IHRyYWNrID0gdGhpcy5fc3RvcmUudmlkZW9UcmFja1xuICAgIGNvbnN0IGR2ID0gbmV3IERhdGFWaWV3NFJlYWQodGhpcy5kYXRhLmJ1ZmZlciwgdGhpcylcbiAgICBpZiAobWV0YSkge1xuICAgICAgaWYgKG1ldGEuYXZjYyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuZXJyb3IoJ2ZvdW5kIGFub3RoZXIgQVZDRGVjb2RlckNvbmZpZ3VyYXRpb25SZWNvcmQhJylcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFzdG9yZS5zdGF0ZS5faGFzVmlkZW8gJiYgIXN0b3JlLnN0YXRlLmhhc1ZpZGVvRmxhZ092ZXJyaWRlZCkge1xuICAgICAgICBzdG9yZS5zdGF0ZS5faGFzVmlkZW8gPSB0cnVlXG4gICAgICAgIHN0b3JlLl9tZWRpYUluZm8uaGFzVmlkZW8gPSB0cnVlXG4gICAgICB9XG4gICAgICBtZXRhID0gc3RvcmUudmlkZW9NZXRhRGF0YSA9IHt9XG4gICAgICBtZXRhLnR5cGUgPSAndmlkZW8nXG4gICAgICBtZXRhLmlkID0gdHJhY2suaWRcbiAgICAgIG1ldGEudGltZVNjYWxlID0gc3RvcmUudmlkZW9UaW1lU2NhbGVcbiAgICAgIG1ldGEuZHVyYXRpb24gPSBzdG9yZS5zdGF0ZS5kdXJhdGlvblxuICAgICAgbWkudGltZXNjYWxlID0gc3RvcmUudmlkZW9UaW1lU2NhbGVcbiAgICB9XG5cbiAgICBjb25zdCB2ZXJzaW9uID0gZHYuZ2V0VWludDgoKVxuICAgIGNvbnN0IGF2Y1Byb2ZpbGUgPSBkdi5nZXRVaW50OCgpXG4gICAgZHYuZ2V0VWludDgoKVxuICAgIGR2LmdldFVpbnQ4KClcbiAgICBpZiAodmVyc2lvbiAhPT0gMSB8fCBhdmNQcm9maWxlID09PSAwKSB7XG4gICAgICAvLyDlpITnkIbplJnor69cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IG5hbHVMZW5ndGhTaXplID0gc3RvcmUuc3RhdGUubmFsdUxlbmd0aFNpemUgPSBkdi5nZXRVaW50KDIsIHRoaXMucmVhZE9mZnNldCwgZmFsc2UpICsgMVxuICAgIGlmIChuYWx1TGVuZ3RoU2l6ZSAhPT0gMyAmJiBuYWx1TGVuZ3RoU2l6ZSAhPT0gNCkge1xuICAgICAgLy8g5aSE55CG6ZSZ6K+vXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBzcHNMZW5ndGggPSBkdi5nZXRVaW50KDUsIG51bGwsIGZhbHNlKVxuICAgIGlmIChzcHNMZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuZW1pdEVycm9yKCdkZWNvZGVyJywge1xuICAgICAgICBsaW5lOiAxMjgsXG4gICAgICAgIGhhbmRsZXI6ICdfcGFyc2VBVkNEZWNvZGVyQ29uZmlndXJhdGlvblJlY29yZCcsXG4gICAgICAgIG1zZzogJ25vIHNwcyBpbiB0aGlzIHZpZGVvJ1xuICAgICAgfSlcbiAgICAgIC8vIOWkhOeQhumUmeivr1xuICAgICAgcmV0dXJuXG4gICAgfSBlbHNlIGlmIChzcHNMZW5ndGggPiAxKSB7XG4gICAgICB0aGlzLmVtaXRFcnJvcignZGVjb2RlcicsIHtcbiAgICAgICAgbGluZTogMTMyLFxuICAgICAgICBoYW5kbGVyOiAnX3BhcnNlQVZDRGVjb2RlckNvbmZpZ3VyYXRpb25SZWNvcmQnLFxuICAgICAgICBtc2c6ICdzcHNMZW5ndGggPiAxJ1xuICAgICAgfSlcbiAgICAgIHRoaXMud2FybignQVZDRGVjb2RlckNvbmZpZ3VyYXRpb25SZWNvcmQ6IHNwc0xlbmd0aCA+IDEnKVxuICAgIH1cbiAgICBsZXQgc3BzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcHNMZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgbGVuID0gZHYuZ2V0VWludDE2KClcblxuICAgICAgaWYgKGxlbiA9PT0gMCkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgc3BzID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5kYXRhLmJ1ZmZlciwgdGhpcy5yZWFkT2Zmc2V0LCBsZW4pXG4gICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gbGVuXG4gICAgICBjb25zdCBzcHNDb25maWcgPSBTUFNQYXJzZXIucGFyc2VTUFMoc3BzKVxuXG4gICAgICBpZiAoaSAhPT0gMCkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBjb25zdCB7XG4gICAgICAgIGNvZGVjU2l6ZSxcbiAgICAgICAgcHJlc2VudFNpemUsXG4gICAgICAgIHByb2ZpbGVTdHJpbmcsXG4gICAgICAgIGxldmVsU3RyaW5nLFxuICAgICAgICBjaHJvbWFGb3JtYXQsXG4gICAgICAgIHBpeGVsUmF0aW8sXG4gICAgICAgIGZyYW1lUmF0ZSxcbiAgICAgICAgcmVmRnJhbWVzLFxuICAgICAgICBiaXREZXB0aFxuICAgICAgfSA9IHNwc0NvbmZpZ1xuXG4gICAgICBtZXRhLndpZHRoID0gY29kZWNTaXplLndpZHRoXG4gICAgICBtZXRhLmhlaWdodCA9IGNvZGVjU2l6ZS5oZWlnaHRcbiAgICAgIG1ldGEucHJlc2VudFdpZHRoID0gcHJlc2VudFNpemUud2lkdGhcbiAgICAgIG1ldGEucHJlc2VudEhlaWdodCA9IHByZXNlbnRTaXplLmhlaWdodFxuXG4gICAgICBtZXRhLnByb2ZpbGUgPSBwcm9maWxlU3RyaW5nXG4gICAgICBtZXRhLmxldmVsID0gbGV2ZWxTdHJpbmdcbiAgICAgIC8vIG1ldGEucHJvZmlsZUNvbXBhdGliaWxpdHkgPSBwcm9maWxlQ29tcGF0aWJpbGl0eTtcbiAgICAgIC8vIG1ldGEubmFsdUxlbmd0aFNpemUgPSBuYWx1TGVuZ3RoU2l6ZTtcblxuICAgICAgbWV0YS5iaXREZXB0aCA9IGJpdERlcHRoXG4gICAgICBtZXRhLmNocm9tYUZvcm1hdCA9IGNocm9tYUZvcm1hdFxuICAgICAgbWV0YS5waXhlbFJhdGlvID0gcGl4ZWxSYXRpb1xuICAgICAgbWV0YS5mcmFtZVJhdGUgPSBmcmFtZVJhdGVcblxuICAgICAgaWYgKCFmcmFtZVJhdGUuZml4ZWQgfHxcbiAgICAgICAgICAgICAgICBmcmFtZVJhdGUuZnBzTnVtID09PSAwIHx8XG4gICAgICAgICAgICAgICAgZnJhbWVSYXRlLmZwc0RlbiA9PT0gMCkge1xuICAgICAgICBtZXRhLmZyYW1lUmF0ZSA9IHN0b3JlLnJlZmVyRnJhbWVSYXRlXG4gICAgICB9XG5cbiAgICAgIGxldCB7IGZwc0RlbiwgZnBzTnVtIH0gPSBtZXRhLmZyYW1lUmF0ZVxuICAgICAgbWV0YS5yZWZTYW1wbGVEdXJhdGlvbiA9IG1ldGEudGltZVNjYWxlICogKGZwc0RlbiAvIGZwc051bSlcblxuICAgICAgbGV0IGNvZGVjQXJyID0gc3BzLnN1YmFycmF5KDEsIDQpXG4gICAgICBsZXQgY29kZWNTdHIgPSAnYXZjMS4nXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDM7IGorKykge1xuICAgICAgICBsZXQgaGV4ID0gY29kZWNBcnJbal0udG9TdHJpbmcoMTYpXG4gICAgICAgIGhleCA9IGhleC5wYWRTdGFydCgyLCAnMCcpXG4gICAgICAgIGNvZGVjU3RyICs9IGhleFxuICAgICAgfVxuXG4gICAgICBtZXRhLmNvZGVjID0gY29kZWNTdHJcblxuICAgICAgY29uc3QgeyBtZWRpYUluZm86IG1pIH0gPSB0aGlzLl9zdG9yZVxuICAgICAgbWkud2lkdGggPSBtZXRhLndpZHRoXG4gICAgICBtaS5oZWlnaHQgPSBtZXRhLmhlaWdodFxuICAgICAgbWkuZnBzID0gbWV0YS5mcmFtZVJhdGUuZnBzXG4gICAgICBtaS5wcm9maWxlID0gbWV0YS5wcm9maWxlXG4gICAgICBtaS5sZXZlbCA9IG1ldGEubGV2ZWxcbiAgICAgIG1pLnJlZkZyYW1lcyA9IHJlZkZyYW1lc1xuICAgICAgbWkucGl4ZWxSYXRpbyA9IHBpeGVsUmF0aW9cbiAgICAgIG1pLnZpZGVvQ29kZWMgPSBjb2RlY1N0clxuICAgICAgbWkuY2hyb21hRm9ybWF0ID0gY2hyb21hRm9ybWF0XG4gICAgICBpZiAobWkuaGFzQXVkaW8pIHtcbiAgICAgICAgaWYgKG1pLmF1ZGlvQ29kZWMpIHtcbiAgICAgICAgICBtaS5taW1lVHlwZSA9IGB2aWRlby94LWZsdjsgY29kZWNzPVwiJHttaS52aWRlb0NvZGVjfSwke21pLmF1ZGlvQ29kZWN9XCJgXG4gICAgICAgICAgbWkuY29kZWMgPSBtaS5taW1lVHlwZS5yZXBsYWNlKCd4LWZsdicsICdtcDQnKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtaS5taW1lVHlwZSA9IGB2aWRlby94LWZsdjsgY29kZWNzPVwiJHttaS52aWRlb0NvZGVjfVwiYFxuICAgICAgICBtaS5jb2RlYyA9IG1pLm1pbWVUeXBlLnJlcGxhY2UoJ3gtZmx2JywgJ21wNCcpXG4gICAgICB9XG5cbiAgICAgIGlmIChtaS5pc0NvbXBsZXRlKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlTWVkaWFJbmZvUmVhZHkobWkpXG4gICAgICB9XG4gICAgfVxuICAgIGxldCBwcHNcbiAgICBjb25zdCBwcHNDb3VudCA9IGR2LmdldFVpbnQ4KClcbiAgICBpZiAoIXBwc0NvdW50KSB7XG4gICAgICB0aGlzLmVtaXRFcnJvcignZGVjb2RlcicsIHtcbiAgICAgICAgbGluZTogMjI3LFxuICAgICAgICBoYW5kbGVyOiAnX3BhcnNlQVZDRGVjb2RlckNvbmZpZ3VyYXRpb25SZWNvcmQnLFxuICAgICAgICBtc2c6ICdubyBwcHMgaW4gdGhpcyB2aWRlbydcbiAgICAgIH0pXG4gICAgICB0aGlzLmRpc3BhdGNoKEV2ZW50VHlwZXMuRVJST1IsICdubyBwcHMgaW4gdGhpcyB2aWRlbycpXG4gICAgICByZXR1cm5cbiAgICB9IGVsc2UgaWYgKHBwc0NvdW50ID4gMSkge1xuICAgICAgdGhpcy53YXJuKGBBVkNEZWNvZGVyQ29uZmlndXJhdGlvblJlY29yZCBoYXMgcHBzQ291bnQ6ICR7cHBzQ291bnR9YClcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBwc0NvdW50OyBpKyspIHtcbiAgICAgIGxldCBwcHNTaXplID0gZHYuZ2V0VWludDE2KClcblxuICAgICAgaWYgKCFwcHNTaXplKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIHBwcyA9IG5ldyBVaW50OEFycmF5KHRoaXMuZGF0YS5idWZmZXIsIHRoaXMucmVhZE9mZnNldCwgcHBzU2l6ZSlcbiAgICAgIHRoaXMucmVhZE9mZnNldCArPSBwcHNTaXplXG4gICAgfVxuXG4gICAgbWkuc3BzID0gbWV0YS5zcHMgPSBzcHNcbiAgICBtaS5wcHMgPSBtZXRhLnBwcyA9IHBwc1xuICAgIGlmIChzdG9yZS5oYXNJbml0aWFsTWV0YURpc3BhdGNoZWQpIHtcbiAgICAgIGlmIChzdG9yZS52aWRlb1RyYWNrLmxlbmd0aCB8fCBzdG9yZS5hdWRpb1RyYWNrLmxlbmd0aCkge1xuICAgICAgICB0aGlzLmhhbmRsZURhdGFSZWFkeShzdG9yZS52aWRlb1RyYWNrLCBzdG9yZS5hdWRpb1RyYWNrKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdG9yZS5zdGF0ZS5fdmlkZW9Jbml0aWFsTWV0YWRhdGFEaXNwYXRjaGVkID0gdHJ1ZVxuICAgIH1cblxuICAgIHRoaXMuaGFuZGxlTWV0YURhdGFSZWFkeSgndmlkZW8nLCBtZXRhKVxuICB9XG5cbiAgX3BhcnNlQVZDVmlkZW9EYXRhIChmcmFtZVR5cGUsIGNwc1RpbWUpIHtcbiAgICBsZXQgZHYgPSBuZXcgRGF0YVZpZXc0UmVhZCh0aGlzLmRhdGEuYnVmZmVyLCB0aGlzKVxuXG4gICAgbGV0IG5hbHVMaXN0ID0gW11cbiAgICBsZXQgZGF0YUxlbiA9IDBcbiAgICBjb25zdCB7IG5hbHVMZW5ndGhTaXplOiBuYWx1TGVuU2l6ZSB9ID0gdGhpcy5fc3RvcmUuc3RhdGVcbiAgICBsZXQgdHMgPSB0aGlzLl9zdG9yZS5zdGF0ZS50aW1lU3RhbXBCYXNlICsgdGhpcy5jdXJyZW50VGFnLmdldFRpbWUoKVxuICAgIGxldCBpc0tleWZyYW1lID0gKGZyYW1lVHlwZSA9PT0gMSlcbiAgICB3aGlsZSAodGhpcy51bnJlYWRMZW5ndGggPiAwKSB7XG4gICAgICBpZiAodGhpcy51bnJlYWRMZW5ndGggPCA0KSB7XG4gICAgICAgIHRoaXMud2Fybignbm90IGVub3VnaCBkYXRhIGZvciBwYXJzaW5nIEFWQycpXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjb25zdCB0ZW1wUmVhZE9mZnNldCA9IHRoaXMucmVhZE9mZnNldFxuICAgICAgbGV0IG5hbHVTaXplID0gbmFsdUxlblNpemUgPT09IDQgPyBkdi5nZXRVaW50MzIoKSA6IGR2LmdldFVpbnQyNCgpXG4gICAgICBpZiAobmFsdVNpemUgPiB0aGlzLnVucmVhZExlbmd0aCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgbGV0IHVuaXRUeXBlID0gZHYuZ2V0VWludCg1LCB0aGlzLnJlYWRPZmZzZXQsIGZhbHNlKVxuXG4gICAgICBpZiAodW5pdFR5cGUgPT09IDUpIHtcbiAgICAgICAgaXNLZXlmcmFtZSA9IHRydWVcbiAgICAgIH1cblxuICAgICAgbGV0IGRhdGEgPSBuZXcgVWludDhBcnJheSh0aGlzLmRhdGEuYnVmZmVyLCB0ZW1wUmVhZE9mZnNldCwgbmFsdUxlblNpemUgKyBuYWx1U2l6ZSlcbiAgICAgIHRoaXMucmVhZE9mZnNldCA9IHRlbXBSZWFkT2Zmc2V0ICsgbmFsdUxlblNpemUgKyBuYWx1U2l6ZVxuICAgICAgY29uc3QgbmFsdVVuaXQgPSB7XG4gICAgICAgIHR5cGU6IHVuaXRUeXBlLFxuICAgICAgICBkYXRhXG4gICAgICB9XG4gICAgICBuYWx1TGlzdC5wdXNoKG5hbHVVbml0KVxuICAgICAgZGF0YUxlbiArPSBkYXRhLmJ5dGVMZW5ndGhcbiAgICB9XG4gICAgZHYgPSBudWxsXG4gICAgaWYgKG5hbHVMaXN0Lmxlbmd0aCkge1xuICAgICAgY29uc3QgeyB2aWRlb1RyYWNrIH0gPSB0aGlzLl9zdG9yZVxuICAgICAgY29uc3QgdmlkZW9TYW1wbGUgPSB7XG4gICAgICAgIHVuaXRzOiBuYWx1TGlzdCxcbiAgICAgICAgbGVuZ3RoOiBkYXRhTGVuLFxuICAgICAgICBkdHM6IHRzLFxuICAgICAgICBjcHM6IGNwc1RpbWUsXG4gICAgICAgIHB0czogKHRzICsgY3BzVGltZSksXG4gICAgICAgIGlzS2V5ZnJhbWUsXG4gICAgICAgIHBvc2l0aW9uOiBpc0tleWZyYW1lID8gdGhpcy5jdXJyZW50VGFnLnBvc2l0aW9uIDogdW5kZWZpbmVkXG4gICAgICB9XG4gICAgICB2aWRlb1RyYWNrLnNhbXBsZXMucHVzaCh2aWRlb1NhbXBsZSlcbiAgICAgIHZpZGVvVHJhY2subGVuZ3RoICs9IGRhdGFMZW5cbiAgICB9XG4gIH1cblxuICByZWFkRGF0YSAobnVtKSB7XG4gICAgY29uc3QgeyBkYXRhLCByZWFkT2Zmc2V0IH0gPSB0aGlzXG4gICAgaWYgKHRoaXMuZGF0YVNpemUgPiByZWFkT2Zmc2V0ICsgbnVtKSB7XG4gICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gbnVtXG4gICAgICByZXR1cm4gZGF0YS5zbGljZShyZWFkT2Zmc2V0LCBudW0pXG4gICAgfVxuICAgIHJldHVybiBbXVxuICB9XG5cbiAgZ2V0IGRhdGFTaXplICgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLmxlbmd0aFxuICB9XG4gIGdldCB1bnJlYWRMZW5ndGggKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGFTaXplIC0gdGhpcy5yZWFkT2Zmc2V0XG4gIH1cbn1cbiIsImltcG9ydCBCdWZmZXIgZnJvbSAnLi4vLi4vd3JpdGUvQnVmZmVyJztcbi8vIGNvbnN0IFVJTlQzMl9NQVggPSBNYXRoLnBvdygyLCAzMikgLSAxO1xuaW1wb3J0IHsgY2FjaGVXcmFwcGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvZnVuY1V0aWxzJztcbmNsYXNzIEZNUDQge1xuICAgIHN0YXRpYyBzaXplICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gQnVmZmVyLndyaXRlVWludDMyKHZhbHVlKTtcbiAgICB9XG4gICAgc3RhdGljIGluaXRCb3ggKHNpemUsIG5hbWUsIC4uLmNvbnRlbnQpIHtcbiAgICAgICAgY29uc3QgYnVmZmVyID0gbmV3IEJ1ZmZlcigpO1xuICAgICAgICBidWZmZXIud3JpdGUoRk1QNC5zaXplKHNpemUpLCBGTVA0LnR5cGUobmFtZSksIC4uLmNvbnRlbnQpO1xuICAgICAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlcjtcbiAgICB9XG4gICAgc3RhdGljIGV4dGVuc2lvbiAodmVyc2lvbiwgZmxhZykge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAgICAgdmVyc2lvbixcbiAgICAgICAgICAgIChmbGFnID4+IDE2KSAmIDB4ZmYsXG4gICAgICAgICAgICAoZmxhZyA+PiA4KSAmIDB4ZmYsXG4gICAgICAgICAgICBmbGFnICYgMHhmZixcbiAgICAgICAgXSk7XG4gICAgfVxuICAgIHN0YXRpYyBmdHlwICgpIHtcbiAgICAgICAgcmV0dXJuIEZNUDQuaW5pdEJveCgyNCwgJ2Z0eXAnLCBuZXcgVWludDhBcnJheShbXG4gICAgICAgICAgICAweDY5LCAweDczLCAweDZGLCAweDZELCAvLyBpc29tLFxuICAgICAgICAgICAgMHgwLCAweDAsIDB4MDAsIDB4MDEsIC8vIG1pbm9yX3ZlcnNpb246IDB4MDFcbiAgICAgICAgICAgIDB4NjksIDB4NzMsIDB4NkYsIDB4NkQsIC8vIGlzb21cbiAgICAgICAgICAgIDB4NjEsIDB4NzYsIDB4NjMsIDB4MzEsIC8vIGF2YzFcbiAgICAgICAgXSkpO1xuICAgIH1cbiAgICBzdGF0aWMgbW9vdiAoZGF0YSkge1xuICAgICAgICBsZXQgc2l6ZSA9IDg7XG4gICAgICAgIGxldCBtdmhkID0gRk1QNC5tdmhkKGRhdGEuZHVyYXRpb24sIGRhdGEudGltZXNjYWxlKTtcbiAgICAgICAgbGV0IHRyYWsxID0gRk1QNC52aWRlb1RyYWsoZGF0YSk7XG4gICAgICAgIGxldCB0cmFrMiA9IEZNUDQuYXVkaW9UcmFrKGRhdGEpO1xuICAgICAgICBsZXQgbXZleCA9IEZNUDQubXZleChkYXRhLmR1cmF0aW9uLCBkYXRhLnRpbWVzY2FsZSk7XG4gICAgICAgIFttdmhkLCB0cmFrMSwgdHJhazIsIG12ZXhdLmZvckVhY2goaXRlbT0+e1xuICAgICAgICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGg7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gRk1QNC5pbml0Qm94KHNpemUsICdtb292JywgbXZoZCwgdHJhazEsIHRyYWsyLCBtdmV4KTtcbiAgICB9XG4gICAgc3RhdGljIG12aGQgKGR1cmF0aW9uLCB0aW1lU2NhbGUpIHtcbiAgICAgICAgbGV0IHRpbWVzY2FsZSA9IHRpbWVTY2FsZSB8fCAxMDAwO1xuICAgICAgICAvLyBkdXJhdGlvbiAqPSB0aW1lc2NhbGU7XG4gICAgICAgIGxldCBieXRlcyA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHZlcnNpb24oMCkgKyBmbGFncyAgICAgMeS9jeeahGJveOeJiOacrCsz5L2NZmxhZ3MgICBib3jniYjmnKzvvIww5oiWMe+8jOS4gOiIrOS4ujDjgILvvIjku6XkuIvlrZfoioLmlbDlnYfmjIl2ZXJzaW9uPTDvvIlcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGNyZWF0aW9uX3RpbWUgICAg5Yib5bu65pe26Ze0ICDvvIjnm7jlr7nkuo5VVEPml7bpl7QxOTA0LTAxLTAx6Zu254K555qE56eS5pWw77yJXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBtb2RpZmljYXRpb25fdGltZSAgIOS/ruaUueaXtumXtFxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIHRpbWVzY2FsZTogNCBieXRlc+aWh+S7tuWqkuS9k+WcqDHnp5Lml7bpl7TlhoXnmoTliLvluqblgLzvvIzlj6/ku6XnkIbop6PkuLox56eS6ZW/5bqmXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICh0aW1lc2NhbGUgPj4+IDI0KSAmIDB4RkYsXG4gICAgICAgICAgICAodGltZXNjYWxlID4+PiAxNikgJiAweEZGLFxuICAgICAgICAgICAgKHRpbWVzY2FsZSA+Pj4gOCkgJiAweEZGLFxuICAgICAgICAgICAgKHRpbWVzY2FsZSkgJiAweEZGLFxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIGR1cmF0aW9uOiA0IGJ5dGVz6K+ldHJhY2vnmoTml7bpl7Tplb/luqbvvIznlKhkdXJhdGlvbuWSjHRpbWUgc2NhbGXlgLzlj6/ku6XorqHnrpd0cmFja+aXtumVv++8jOavlOWmgmF1ZGlvIHRyYWNr55qEdGltZSBzY2FsZSA9IDgwMDAsXG4gICAgICAgICAgICAgKiBkdXJhdGlvbiA9IDU2MDEyOO+8jOaXtumVv+S4ujcwLjAxNu+8jHZpZGVvIHRyYWNr55qEdGltZSBzY2FsZSA9IDYwMCwgZHVyYXRpb24gPSA0MjAwMO+8jOaXtumVv+S4ujcwXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIChkdXJhdGlvbiA+Pj4gMjQpICYgMHhGRixcbiAgICAgICAgICAgIChkdXJhdGlvbiA+Pj4gMTYpICYgMHhGRixcbiAgICAgICAgICAgIChkdXJhdGlvbiA+Pj4gOCkgJiAweEZGLFxuICAgICAgICAgICAgKGR1cmF0aW9uKSAmIDB4RkYsXG4gICAgICAgICAgICAweDAwLCAweDAxLCAweDAwLCAweDAwLCAvLyBQcmVmZXJyZWQgcmF0ZTogMS4wICAg5o6o6I2Q5pKt5pS+6YCf546H77yM6auYMTbkvY3lkozkvY4xNuS9jeWIhuWIq+S4uuWwj+aVsOeCueaVtOaVsOmDqOWIhuWSjOWwj+aVsOmDqOWIhu+8jOWNs1sxNi4xNl0g5qC85byP77yM6K+l5YC85Li6MS4w77yIMHgwMDAxMDAwMO+8ieihqOekuuato+W4uOWJjeWQkeaSreaUvlxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBQcmVmZXJyZWRWb2x1bWUoMS4wLCAyYnl0ZXMpICsgcmVzZXJ2ZWQoMmJ5dGVzKVxuICAgICAgICAgICAgICog5LiOcmF0Zeexu+S8vO+8jFs4LjhdIOagvOW8j++8jDEuMO+8iDB4MDEwMO+8ieihqOekuuacgOWkp+mfs+mHj1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICAweDAxLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gIHJlc2VydmVkOiA0ICsgNCBieXRlc+S/neeVmeS9jVxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgICAgICAgIDB4MDAsIDB4MDEsIDB4MDAsIDB4MDAsIC8vIC0tLS1iZWdpbiBjb21wb3NpdGlvbiBtYXRyaXgtLS0tXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8g6KeG6aKR5Y+Y5o2i55+p6Zi1ICAg57q/5oCn5Luj5pWwXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgICAgICAgMHgwMCwgMHgwMSwgMHgwMCwgMHgwMCxcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgICAgICAgIDB4NDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIC0tLS1lbmQgY29tcG9zaXRpb24gbWF0cml4LS0tLVxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gLS0tLWJlZ2luIHByZV9kZWZpbmVkIDYgKiA0IGJ5dGVzLS0tLVxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHByZS1kZWZpbmVkIOS/neeVmeS9jVxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyAtLS0tZW5kIHByZV9kZWZpbmVkIDYgKiA0IGJ5dGVzLS0tLVxuICAgICAgICAgICAgMHhGRiwgMHhGRiwgMHhGRiwgMHhGRiwgLy8gbmV4dF90cmFja19JRCDkuIvkuIDkuKp0cmFja+S9v+eUqOeahGlk5Y+3XG4gICAgICAgIF0pO1xuICAgICAgICByZXR1cm4gRk1QNC5pbml0Qm94KDggKyBieXRlcy5sZW5ndGgsICdtdmhkJywgbmV3IFVpbnQ4QXJyYXkoYnl0ZXMpKTtcbiAgICB9XG4gICAgc3RhdGljIHZpZGVvVHJhayAoZGF0YSkge1xuICAgICAgICBsZXQgc2l6ZSA9IDg7XG4gICAgICAgIGxldCB0a2hkID0gRk1QNC50a2hkKHtcbiAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgZHVyYXRpb246IGRhdGEuZHVyYXRpb24sXG4gICAgICAgICAgICB0aW1lc2NhbGU6IGRhdGEudGltZXNjYWxlLFxuICAgICAgICAgICAgd2lkdGg6IGRhdGEud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGRhdGEuaGVpZ2h0LFxuICAgICAgICAgICAgdHlwZTogJ3ZpZGVvJyxcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBtZGlhID0gRk1QNC5tZGlhKHtcbiAgICAgICAgICAgIHR5cGU6ICd2aWRlbycsXG4gICAgICAgICAgICB0aW1lc2NhbGU6IGRhdGEudGltZXNjYWxlLFxuICAgICAgICAgICAgZHVyYXRpb246IGRhdGEuZHVyYXRpb24sXG4gICAgICAgICAgICBzcHM6IGRhdGEuc3BzLFxuICAgICAgICAgICAgcHBzOiBkYXRhLnBwcyxcbiAgICAgICAgICAgIHBpeGVsUmF0aW86IGRhdGEucGl4ZWxSYXRpbyxcbiAgICAgICAgICAgIHdpZHRoOiBkYXRhLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBkYXRhLmhlaWdodCxcbiAgICAgICAgfSk7XG4gICAgICAgIFt0a2hkLCBtZGlhXS5mb3JFYWNoKGl0ZW09PntcbiAgICAgICAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIEZNUDQuaW5pdEJveChzaXplLCAndHJhaycsIHRraGQsIG1kaWEpO1xuICAgIH1cbiAgICBzdGF0aWMgYXVkaW9UcmFrIChkYXRhKSB7XG4gICAgICAgIGxldCBzaXplID0gODtcbiAgICAgICAgbGV0IHRraGQgPSBGTVA0LnRraGQoe1xuICAgICAgICAgICAgaWQ6IDIsXG4gICAgICAgICAgICBkdXJhdGlvbjogZGF0YS5kdXJhdGlvbixcbiAgICAgICAgICAgIHRpbWVzY2FsZTogZGF0YS50aW1lc2NhbGUsXG4gICAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgICAgIHR5cGU6ICdhdWRpbycsXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgbWRpYSA9IEZNUDQubWRpYSh7XG4gICAgICAgICAgICB0eXBlOiAnYXVkaW8nLFxuICAgICAgICAgICAgdGltZXNjYWxlOiBkYXRhLnRpbWVzY2FsZSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkYXRhLmR1cmF0aW9uLFxuICAgICAgICAgICAgY2hhbm5lbENvdW50OiBkYXRhLmF1ZGlvQ2hhbm5lbENvdW50LFxuICAgICAgICAgICAgc2FtcGxlcmF0ZTogZGF0YS5hdWRpb1NhbXBsZVJhdGUsXG4gICAgICAgICAgICBjb25maWc6IGRhdGEuYXVkaW9Db25maWcsXG4gICAgICAgIH0pO1xuICAgICAgICBbdGtoZCwgbWRpYV0uZm9yRWFjaChpdGVtPT57XG4gICAgICAgICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBGTVA0LmluaXRCb3goc2l6ZSwgJ3RyYWsnLCB0a2hkLCBtZGlhKTtcbiAgICB9XG4gICAgc3RhdGljIHRraGQgKGRhdGEpIHtcbiAgICAgICAgbGV0IGlkID0gZGF0YS5pZCxcbiAgICAgICAgICAgIGR1cmF0aW9uID0gZGF0YS5kdXJhdGlvbixcbiAgICAgICAgICAgIHdpZHRoID0gZGF0YS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodCA9IGRhdGEuaGVpZ2h0O1xuICAgICAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDcsIC8vIHZlcnNpb24oMCkgKyBmbGFncyAx5L2N54mI5pysIGJveOeJiOacrO+8jDDmiJYx77yM5LiA6Iis5Li6MOOAgu+8iOS7peS4i+Wtl+iKguaVsOWdh+aMiXZlcnNpb249MO+8ieaMieS9jeaIluaTjeS9nOe7k+aenOWAvO+8jOmihOWumuS5ieWmguS4i++8mlxuICAgICAgICAgICAgLy8gMHgwMDAwMDEgdHJhY2tfZW5hYmxlZO+8jOWQpuWImeivpXRyYWNr5LiN6KKr5pKt5pS+77ybXG4gICAgICAgICAgICAvLyAweDAwMDAwMiB0cmFja19pbl9tb3ZpZe+8jOihqOekuuivpXRyYWNr5Zyo5pKt5pS+5Lit6KKr5byV55So77ybXG4gICAgICAgICAgICAvLyAweDAwMDAwNCB0cmFja19pbl9wcmV2aWV377yM6KGo56S66K+ldHJhY2vlnKjpooTop4jml7booqvlvJXnlKjjgIJcbiAgICAgICAgICAgIC8vIOS4gOiIrOivpeWAvOS4ujfvvIwxKzIrNCDlpoLmnpzkuIDkuKrlqpLkvZPmiYDmnIl0cmFja+Wdh+acquiuvue9rnRyYWNrX2luX21vdmll5ZKMdHJhY2tfaW5fcHJldmlld++8jOWwhuiiq+eQhuino+S4uuaJgOaciXRyYWNr5Z2H6K6+572u5LqG6L+Z5Lik6aG577yb5a+55LqOaGludCB0cmFja++8jOivpeWAvOS4ujBcbiAgICAgICAgICAgIC8vIGhpbnQgdHJhY2sg6L+Z5Liq54m55q6K55qEdHJhY2vlubbkuI3ljIXlkKvlqpLkvZPmlbDmja7vvIzogIzmmK/ljIXlkKvkuobkuIDkupvlsIblhbbku5bmlbDmja50cmFja+aJk+WMheaIkOa1geWqkuS9k+eahOaMh+ekuuS/oeaBr+OAglxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gY3JlYXRpb25fdGltZeWIm+W7uuaXtumXtO+8iOebuOWvueS6jlVUQ+aXtumXtDE5MDQtMDEtMDHpm7bngrnnmoTnp5LmlbDvvIlcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIG1vZGlmaWNhdGlvbiB0aW1lIOS/ruaUueaXtumXtFxuICAgICAgICAgICAgKGlkID4+PiAyNCkgJiAweEZGLCAvLyB0cmFja19JRDogNCBieXRlcyBpZOWPt++8jOS4jeiDvemHjeWkjeS4lOS4jeiDveS4ujBcbiAgICAgICAgICAgIChpZCA+Pj4gMTYpICYgMHhGRixcbiAgICAgICAgICAgIChpZCA+Pj4gOCkgJiAweEZGLFxuICAgICAgICAgICAgKGlkKSAmIDB4RkYsXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZDogNCBieXRlcyAgICDkv53nlZnkvY1cbiAgICAgICAgICAgIChkdXJhdGlvbiA+Pj4gMjQpICYgMHhGRiwgLy8gZHVyYXRpb246IDQgYnl0ZXMgdHJhY2vnmoTml7bpl7Tplb/luqZcbiAgICAgICAgICAgIChkdXJhdGlvbiA+Pj4gMTYpICYgMHhGRixcbiAgICAgICAgICAgIChkdXJhdGlvbiA+Pj4gOCkgJiAweEZGLFxuICAgICAgICAgICAgKGR1cmF0aW9uKSAmIDB4RkYsXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZDogMiAqIDQgYnl0ZXMgICAg5L+d55WZ5L2NXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gbGF5ZXIoMmJ5dGVzKSArIGFsdGVybmF0ZV9ncm91cCgyYnl0ZXMpICDop4bpopHlsYLvvIzpu5jorqTkuLow77yM5YC85bCP55qE5Zyo5LiK5bGCLnRyYWNr5YiG57uE5L+h5oGv77yM6buY6K6k5Li6MOihqOekuuivpXRyYWNr5pyq5LiO5YW25LuWdHJhY2vmnInnvqTnu4TlhbPns7tcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHZvbHVtZSgyYnl0ZXMpICsgcmVzZXJ2ZWQoMmJ5dGVzKSAgICBbOC44XSDmoLzlvI/vvIzlpoLmnpzkuLrpn7PpopF0cmFja++8jDEuMO+8iDB4MDEwMO+8ieihqOekuuacgOWkp+mfs+mHj++8m+WQpuWImeS4ujAgICAr5L+d55WZ5L2NXG4gICAgICAgICAgICAweDAwLCAweDAxLCAweDAwLCAweDAwLCAvLyAtLS0tYmVnaW4gY29tcG9zaXRpb24gbWF0cml4LS0tLVxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgICAgICAgMHgwMCwgMHgwMSwgMHgwMCwgMHgwMCwgLy8g6KeG6aKR5Y+Y5o2i55+p6Zi1XG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAgICAgICAweDQwLCAweDAwLCAweDAwLCAweDAwLCAvLyAtLS0tZW5kIGNvbXBvc2l0aW9uIG1hdHJpeC0tLS1cbiAgICAgICAgICAgICh3aWR0aCA+Pj4gOCkgJiAweEZGLCAvLyAvL+WuveW6plxuICAgICAgICAgICAgKHdpZHRoKSAmIDB4RkYsXG4gICAgICAgICAgICAweDAwLCAweDAwLFxuICAgICAgICAgICAgKGhlaWdodCA+Pj4gOCkgJiAweEZGLCAvLyDpq5jluqZcbiAgICAgICAgICAgIChoZWlnaHQpICYgMHhGRixcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsXG4gICAgICAgIF0pO1xuICAgICAgICByZXR1cm4gRk1QNC5pbml0Qm94KDggKyBjb250ZW50LmJ5dGVMZW5ndGgsICd0a2hkJywgY29udGVudCk7XG4gICAgfVxuICAgIHN0YXRpYyBlZHRzIChkYXRhKSB7XG4gICAgICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKCksIGR1cmF0aW9uID0gZGF0YS5kdXJhdGlvbiwgbWVkaWFUaW1lID0gZGF0YS5tZWRpYVRpbWU7XG4gICAgICAgIGJ1ZmZlci53cml0ZShGTVA0LnNpemUoMzYpLCBGTVA0LnR5cGUoJ2VkdHMnKSk7XG4gICAgICAgIC8vIGVsc3RcbiAgICAgICAgYnVmZmVyLndyaXRlKEZNUDQuc2l6ZSgyOCksIEZNUDQudHlwZSgnZWxzdCcpKTtcbiAgICAgICAgYnVmZmVyLndyaXRlKG5ldyBVaW50OEFycmF5KFtcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDEsIC8vIGVudHJ5IGNvdW50XG4gICAgICAgICAgICAoZHVyYXRpb24gPj4gMjQpICYgMHhmZiwgKGR1cmF0aW9uID4+IDE2KSAmIDB4ZmYsIChkdXJhdGlvbiA+PiA4KSAmIDB4ZmYsIGR1cmF0aW9uICYgMHhmZixcbiAgICAgICAgICAgIChtZWRpYVRpbWUgPj4gMjQpICYgMHhmZiwgKG1lZGlhVGltZSA+PiAxNikgJiAweGZmLCAobWVkaWFUaW1lID4+IDgpICYgMHhmZiwgbWVkaWFUaW1lICYgMHhmZixcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDEsIC8vIG1lZGlhIHJhdGVcbiAgICAgICAgXSkpO1xuICAgICAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlcjtcbiAgICB9XG4gICAgc3RhdGljIG1kaWEgKGRhdGEpIHtcbiAgICAgICAgbGV0IHNpemUgPSA4O1xuICAgICAgICBsZXQgbWRoZCA9IEZNUDQubWRoZChkYXRhLnRpbWVzY2FsZSwgZGF0YS5kdXJhdGlvbik7XG4gICAgICAgIGxldCBoZGxyID0gRk1QNC5oZGxyKGRhdGEudHlwZSk7XG4gICAgICAgIGxldCBtaW5mID0gRk1QNC5taW5mKGRhdGEpO1xuICAgICAgICBbbWRoZCwgaGRsciwgbWluZl0uZm9yRWFjaChpdGVtPT57XG4gICAgICAgICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBGTVA0LmluaXRCb3goc2l6ZSwgJ21kaWEnLCBtZGhkLCBoZGxyLCBtaW5mKTtcbiAgICB9XG4gICAgc3RhdGljIG1kaGQgKHRpbWVzY2FsZSwgZHVyYXRpb24pIHtcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBjcmVhdGlvbl90aW1lICAgIOWIm+W7uuaXtumXtFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gbW9kaWZpY2F0aW9uX3RpbWXkv67mlLnml7bpl7RcbiAgICAgICAgICAgICh0aW1lc2NhbGUgPj4+IDI0KSAmIDB4RkYsIC8vIHRpbWVzY2FsZTogNCBieXRlcyAgICDmlofku7blqpLkvZPlnKgx56eS5pe26Ze05YaF55qE5Yi75bqm5YC877yM5Y+v5Lul55CG6Kej5Li6MeenkumVv+W6plxuICAgICAgICAgICAgKHRpbWVzY2FsZSA+Pj4gMTYpICYgMHhGRixcbiAgICAgICAgICAgICh0aW1lc2NhbGUgPj4+IDgpICYgMHhGRixcbiAgICAgICAgICAgICh0aW1lc2NhbGUpICYgMHhGRixcbiAgICAgICAgICAgIChkdXJhdGlvbiA+Pj4gMjQpICYgMHhGRiwgLy8gZHVyYXRpb246IDQgYnl0ZXMgIHRyYWNr55qE5pe26Ze06ZW/5bqmXG4gICAgICAgICAgICAoZHVyYXRpb24gPj4+IDE2KSAmIDB4RkYsXG4gICAgICAgICAgICAoZHVyYXRpb24gPj4+IDgpICYgMHhGRixcbiAgICAgICAgICAgIChkdXJhdGlvbikgJiAweEZGLFxuICAgICAgICAgICAgMHg1NSwgMHhDNCwgLy8gbGFuZ3VhZ2U6IHVuZCAodW5kZXRlcm1pbmVkKSDlqpLkvZPor63oqIDnoIHjgILmnIDpq5jkvY3kuLow77yM5ZCO6Z2iMTXkvY3kuLoz5Liq5a2X56ym77yI6KeBSVNPIDYzOS0yL1TmoIflh4bkuK3lrprkuYnvvIlcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIC8vIHByZV9kZWZpbmVkID0gMFxuICAgICAgICBdKTtcbiAgICAgICAgcmV0dXJuIEZNUDQuaW5pdEJveCgxMiArIGNvbnRlbnQuYnl0ZUxlbmd0aCwgJ21kaGQnLCBGTVA0LmV4dGVuc2lvbigwLCAwKSwgY29udGVudCk7XG4gICAgfVxuICAgIHN0YXRpYyBoZGxyICh0eXBlKSB7XG4gICAgICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKCk7XG4gICAgICAgIGxldCB2YWx1ZSA9IFsweDAwLCAvLyB2ZXJzaW9uIDBcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBwcmVfZGVmaW5lZFxuICAgICAgICAgICAgMHg3NiwgMHg2OSwgMHg2NCwgMHg2NSwgLy8gaGFuZGxlcl90eXBlOiAndmlkZSdcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgICAgICAgIDB4NTYsIDB4NjksIDB4NjQsIDB4NjUsXG4gICAgICAgICAgICAweDZmLCAweDQ4LCAweDYxLCAweDZlLFxuICAgICAgICAgICAgMHg2NCwgMHg2YywgMHg2NSwgMHg3MiwgMHgwMCwgLy8gbmFtZTogJ1ZpZGVvSGFuZGxlcidcbiAgICAgICAgXTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgICAgICAgIHZhbHVlLnNwbGljZSg4LCA0LCAuLi5bMHg3MywgMHg2ZiwgMHg3NSwgMHg2ZV0pO1xuICAgICAgICAgICAgdmFsdWUuc3BsaWNlKDI0LCAxMywgLi4uWzB4NTMsIDB4NmYsIDB4NzUsIDB4NmUsXG4gICAgICAgICAgICAgICAgMHg2NCwgMHg0OCwgMHg2MSwgMHg2ZSxcbiAgICAgICAgICAgICAgICAweDY0LCAweDZjLCAweDY1LCAweDcyLCAweDAwXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEZNUDQuaW5pdEJveCg4ICsgdmFsdWUubGVuZ3RoLCAnaGRscicsIG5ldyBVaW50OEFycmF5KHZhbHVlKSk7XG4gICAgfVxuICAgIHN0YXRpYyBtaW5mIChkYXRhKSB7XG4gICAgICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKCksIHNpemUgPSA4O1xuICAgICAgICBsZXQgdm1oZCA9IGRhdGEudHlwZSA9PT0gJ3ZpZGVvJyA/IEZNUDQudm1oZCgpIDogRk1QNC5zbWhkKCk7XG4gICAgICAgIGxldCBkaW5mID0gRk1QNC5kaW5mKCk7XG4gICAgICAgIGxldCBzdGJsID0gRk1QNC5zdGJsKGRhdGEpO1xuICAgICAgICBbdm1oZCwgZGluZiwgc3RibF0uZm9yRWFjaChpdGVtPT57XG4gICAgICAgICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBGTVA0LmluaXRCb3goc2l6ZSwgJ21pbmYnLCB2bWhkLCBkaW5mLCBzdGJsKTtcbiAgICB9XG4gICAgc3RhdGljIHZtaGQgKCkge1xuICAgICAgICByZXR1cm4gRk1QNC5pbml0Qm94KDIwLCAndm1oZCcsIG5ldyBVaW50OEFycmF5KFtcbiAgICAgICAgICAgIDB4MDAsIC8vIHZlcnNpb25cbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDEsIC8vIGZsYWdzXG4gICAgICAgICAgICAweDAwLCAweDAwLCAvLyBncmFwaGljc21vZGVcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsXG4gICAgICAgICAgICAweDAwLCAweDAwLFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgLy8gb3Bjb2xvclxuICAgICAgICBdKSk7XG4gICAgfVxuICAgIHN0YXRpYyBzbWhkICgpIHtcbiAgICAgICAgcmV0dXJuIEZNUDQuaW5pdEJveCgxNiwgJ3NtaGQnLCBuZXcgVWludDhBcnJheShbXG4gICAgICAgICAgICAweDAwLCAvLyB2ZXJzaW9uXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgICAgICAgMHgwMCwgMHgwMCwgLy8gYmFsYW5jZVxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgICAgXSkpO1xuICAgIH1cbiAgICBzdGF0aWMgZGluZiAoKSB7XG4gICAgICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKCk7XG4gICAgICAgIGxldCBkcmVmID0gWzB4MDAsIC8vIHZlcnNpb24gMFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDEsIC8vIGVudHJ5X2NvdW50XG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDBjLCAvLyBlbnRyeV9zaXplXG4gICAgICAgICAgICAweDc1LCAweDcyLCAweDZjLCAweDIwLCAvLyAndXJsJyB0eXBlXG4gICAgICAgICAgICAweDAwLCAvLyB2ZXJzaW9uIDBcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDEsIC8vIGVudHJ5X2ZsYWdzXG4gICAgICAgIF07XG4gICAgICAgIGJ1ZmZlci53cml0ZShGTVA0LnNpemUoMzYpLCBGTVA0LnR5cGUoJ2RpbmYnKSwgRk1QNC5zaXplKDI4KSwgRk1QNC50eXBlKCdkcmVmJyksIG5ldyBVaW50OEFycmF5KGRyZWYpKTtcbiAgICAgICAgcmV0dXJuIGJ1ZmZlci5idWZmZXI7XG4gICAgfVxuICAgIHN0YXRpYyBzdGJsIChkYXRhKSB7XG4gICAgICAgIGxldCBzaXplID0gODtcbiAgICAgICAgbGV0IHN0c2QgPSBGTVA0LnN0c2QoZGF0YSk7XG4gICAgICAgIGxldCBzdHRzID0gRk1QNC5zdHRzKCk7XG4gICAgICAgIGxldCBzdHNjID0gRk1QNC5zdHNjKCk7XG4gICAgICAgIGxldCBzdHN6ID0gRk1QNC5zdHN6KCk7XG4gICAgICAgIGxldCBzdGNvID0gRk1QNC5zdGNvKCk7XG4gICAgICAgIFtzdHNkLCBzdHRzLCBzdHNjLCBzdHN6LCBzdGNvXS5mb3JFYWNoKGl0ZW09PntcbiAgICAgICAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIEZNUDQuaW5pdEJveChzaXplLCAnc3RibCcsIHN0c2QsIHN0dHMsIHN0c2MsIHN0c3osIHN0Y28pO1xuICAgIH1cbiAgICBzdGF0aWMgc3RzZCAoZGF0YSkge1xuICAgICAgICBsZXQgY29udGVudDtcbiAgICAgICAgaWYgKGRhdGEudHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgICAgICAgLy8gaWYgKCFkYXRhLmlzQUFDICYmIGRhdGEuY29kZWMgPT09ICdtcDQnKSB7XG4gICAgICAgICAgICAvLyAgICAgY29udGVudCA9IEZNUDQubXAzKGRhdGEpO1xuICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyDmlK/mjIFtcDRhXG4gICAgICAgICAgICBjb250ZW50ID0gRk1QNC5tcDRhKGRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGVudCA9IEZNUDQuYXZjMShkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRk1QNC5pbml0Qm94KDE2ICsgY29udGVudC5ieXRlTGVuZ3RoLCAnc3RzZCcsIEZNUDQuZXh0ZW5zaW9uKDAsIDApLCBuZXcgVWludDhBcnJheShbMHgwMCwgMHgwMCwgMHgwMCwgMHgwMV0pLCBjb250ZW50KTtcbiAgICB9XG4gICAgc3RhdGljIG1wNGEgKGRhdGEpIHtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKTtcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgICAgICAgIDB4MDAsIDB4MDEsIC8vIGRhdGFfcmVmZXJlbmNlX2luZGV4XG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgICAgICAgIDB4MDAsIGRhdGEuY2hhbm5lbENvdW50LCAvLyBjaGFubmVsY291bnRcbiAgICAgICAgICAgIDB4MDAsIDB4MTAsIC8vIHNhbXBsZVNpemU6MTZiaXRzXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZDJcbiAgICAgICAgICAgIChkYXRhLnNhbXBsZXJhdGUgPj4gOCkgJiAweGZmLFxuICAgICAgICAgICAgZGF0YS5zYW1wbGVyYXRlICYgMHhmZiwgLy9cbiAgICAgICAgICAgIDB4MDAsIDB4MDAsXG4gICAgICAgIF0pO1xuICAgICAgICBsZXQgZXNkcyA9IEZNUDQuZXNkcyhkYXRhLmNvbmZpZyk7XG4gICAgICAgIHJldHVybiBGTVA0LmluaXRCb3goOCArIGNvbnRlbnQuYnl0ZUxlbmd0aCArIGVzZHMuYnl0ZUxlbmd0aCwgJ21wNGEnLCBjb250ZW50LCBlc2RzKTtcbiAgICB9XG4gICAgc3RhdGljIGVzZHMgKGNvbmZpZyA9IFs0MywgMTQ2LCA4LCAwXSkge1xuICAgICAgICBjb25zdCBjb25maWdsZW4gPSBjb25maWcubGVuZ3RoO1xuICAgICAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpO1xuICAgICAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgICAgICAgIDB4MDAsIC8vIHZlcnNpb24gMFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcblxuICAgICAgICAgICAgMHgwMywgLy8gZGVzY3JpcHRvcl90eXBlXG4gICAgICAgICAgICAweDE3ICsgY29uZmlnbGVuLCAvLyBsZW5ndGhcbiAgICAgICAgICAgIDB4MDAsIDB4MDEsIC8vIGVzX2lkXG4gICAgICAgICAgICAweDAwLCAvLyBzdHJlYW1fcHJpb3JpdHlcblxuICAgICAgICAgICAgMHgwNCwgLy8gZGVzY3JpcHRvcl90eXBlXG4gICAgICAgICAgICAweDBmICsgY29uZmlnbGVuLCAvLyBsZW5ndGhcbiAgICAgICAgICAgIDB4NDAsIC8vIGNvZGVjIDogbXBlZzRfYXVkaW9cbiAgICAgICAgICAgIDB4MTUsIC8vIHN0cmVhbV90eXBlXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBidWZmZXJfc2l6ZVxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gbWF4Qml0cmF0ZVxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gYXZnQml0cmF0ZVxuXG4gICAgICAgICAgICAweDA1LCAvLyBkZXNjcmlwdG9yX3R5cGVcbiAgICAgICAgXS5jb25jYXQoW2NvbmZpZ2xlbl0pLmNvbmNhdChjb25maWcpLmNvbmNhdChbMHgwNiwgMHgwMSwgMHgwMl0pKTtcbiAgICAgICAgYnVmZmVyLndyaXRlKEZNUDQuc2l6ZSg4ICsgY29udGVudC5ieXRlTGVuZ3RoKSwgRk1QNC50eXBlKCdlc2RzJyksIGNvbnRlbnQpO1xuICAgICAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlcjtcbiAgICB9XG4gICAgc3RhdGljIGF2YzEgKGRhdGEpIHtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKSwgc2l6ZSA9IDQwOy8vIDgoYXZjMSkrOChhdmNjKSs4KGJ0cnQpKzE2KHBhc3ApXG4gICAgICAgIGxldCBzcHMgPSBkYXRhLnNwcywgcHBzID0gZGF0YS5wcHMsIHdpZHRoID0gZGF0YS53aWR0aCwgaGVpZ2h0ID0gZGF0YS5oZWlnaHQsIGhTcGFjaW5nID0gZGF0YS5waXhlbFJhdGlvWzBdLCB2U3BhY2luZyA9IGRhdGEucGl4ZWxSYXRpb1sxXTtcbiAgICAgICAgbGV0IGF2Y2NCdWZmZXIgPSBuZXcgQnVmZmVyKCk7XG4gICAgICAgIGF2Y2NCdWZmZXIud3JpdGUobmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAgICAgMHgwMSwgLy8gdmVyc2lvblxuICAgICAgICAgICAgc3BzWzFdLCAvLyBwcm9maWxlXG4gICAgICAgICAgICBzcHNbMl0sIC8vIHByb2ZpbGUgY29tcGF0aWJsZVxuICAgICAgICAgICAgc3BzWzNdLCAvLyBsZXZlbFxuICAgICAgICAgICAgMHhmYyB8IDMsXG4gICAgICAgICAgICAweEUwIHwgMSwgLy8g55uu5YmN5Y+q5aSE55CG5LiA5Liqc3BzXG4gICAgICAgIF0uY29uY2F0KFtzcHMubGVuZ3RoID4+PiA4ICYgMHhmZiwgc3BzLmxlbmd0aCAmIDB4ZmZdKSkpO1xuICAgICAgICBhdmNjQnVmZmVyLndyaXRlKHNwcywgbmV3IFVpbnQ4QXJyYXkoWzEsIHBwcy5sZW5ndGggPj4+IDggJiAweGZmLCBwcHMubGVuZ3RoICYgMHhmZl0pLCBwcHMpO1xuXG4gICAgICAgIGxldCBhdmNjID0gYXZjY0J1ZmZlci5idWZmZXI7XG4gICAgICAgIGxldCBhdmMxID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAgICAgICAweDAwLCAweDAxLCAvLyBkYXRhX3JlZmVyZW5jZV9pbmRleFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgLy8gcHJlX2RlZmluZWRcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHByZV9kZWZpbmVkXG4gICAgICAgICAgICAod2lkdGggPj4gOCkgJiAweGZmLFxuICAgICAgICAgICAgd2lkdGggJiAweGZmLCAvLyB3aWR0aFxuICAgICAgICAgICAgKGhlaWdodCA+PiA4KSAmIDB4ZmYsXG4gICAgICAgICAgICBoZWlnaHQgJiAweGZmLCAvLyBoZWlnaHRcbiAgICAgICAgICAgIDB4MDAsIDB4NDgsIDB4MDAsIDB4MDAsIC8vIGhvcml6cmVzb2x1dGlvblxuICAgICAgICAgICAgMHgwMCwgMHg0OCwgMHgwMCwgMHgwMCwgLy8gdmVydHJlc29sdXRpb25cbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAgICAgICAweDAwLCAweDAxLCAvLyBmcmFtZV9jb3VudFxuICAgICAgICAgICAgMHgxMixcbiAgICAgICAgICAgIDB4NjQsIDB4NjEsIDB4NjksIDB4NkMsIC8vIGRhaWx5bW90aW9uL2hscy5qc1xuICAgICAgICAgICAgMHg3OSwgMHg2RCwgMHg2RiwgMHg3NCxcbiAgICAgICAgICAgIDB4NjksIDB4NkYsIDB4NkUsIDB4MkYsXG4gICAgICAgICAgICAweDY4LCAweDZDLCAweDczLCAweDJFLFxuICAgICAgICAgICAgMHg2QSwgMHg3MywgMHgwMCwgMHgwMCxcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gY29tcHJlc3Nvcm5hbWVcbiAgICAgICAgICAgIDB4MDAsIDB4MTgsIC8vIGRlcHRoID0gMjRcbiAgICAgICAgICAgIDB4MTEsIDB4MTFdKTsgLy8gcHJlX2RlZmluZWQgPSAtMVxuICAgICAgICBsZXQgYnRydCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgICAgICAgIDB4MDAsIDB4MWMsIDB4OWMsIDB4ODAsIC8vIGJ1ZmZlclNpemVEQlxuICAgICAgICAgICAgMHgwMCwgMHgyZCwgMHhjNiwgMHhjMCwgLy8gbWF4Qml0cmF0ZVxuICAgICAgICAgICAgMHgwMCwgMHgyZCwgMHhjNiwgMHhjMCwgLy8gYXZnQml0cmF0ZVxuICAgICAgICBdKTtcbiAgICAgICAgbGV0IHBhc3AgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAgICAgICAoaFNwYWNpbmcgPj4gMjQpLCAvLyBoU3BhY2luZ1xuICAgICAgICAgICAgKGhTcGFjaW5nID4+IDE2KSAmIDB4ZmYsXG4gICAgICAgICAgICAoaFNwYWNpbmcgPj4gOCkgJiAweGZmLFxuICAgICAgICAgICAgaFNwYWNpbmcgJiAweGZmLFxuICAgICAgICAgICAgKHZTcGFjaW5nID4+IDI0KSwgLy8gdlNwYWNpbmdcbiAgICAgICAgICAgICh2U3BhY2luZyA+PiAxNikgJiAweGZmLFxuICAgICAgICAgICAgKHZTcGFjaW5nID4+IDgpICYgMHhmZixcbiAgICAgICAgICAgIHZTcGFjaW5nICYgMHhmZixcbiAgICAgICAgXSk7XG5cbiAgICAgICAgYnVmZmVyLndyaXRlKFxuICAgICAgICAgICAgRk1QNC5zaXplKHNpemUgKyBhdmMxLmJ5dGVMZW5ndGggKyBhdmNjLmJ5dGVMZW5ndGggKyBidHJ0LmJ5dGVMZW5ndGgpLCBGTVA0LnR5cGUoJ2F2YzEnKSwgYXZjMSxcbiAgICAgICAgICAgIEZNUDQuc2l6ZSg4ICsgYXZjYy5ieXRlTGVuZ3RoKSwgRk1QNC50eXBlKCdhdmNDJyksIGF2Y2MsXG4gICAgICAgICAgICBGTVA0LnNpemUoMjApLCBGTVA0LnR5cGUoJ2J0cnQnKSwgYnRydCxcbiAgICAgICAgICAgIEZNUDQuc2l6ZSgxNiksIEZNUDQudHlwZSgncGFzcCcpLCBwYXNwXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBidWZmZXIuYnVmZmVyO1xuICAgIH1cbiAgICBzdGF0aWMgc3R0cyAoKSB7XG4gICAgICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAgICAgMHgwMCwgLy8gdmVyc2lvblxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGVudHJ5X2NvdW50XG4gICAgICAgIF0pO1xuICAgICAgICByZXR1cm4gRk1QNC5pbml0Qm94KDE2LCAnc3R0cycsIGNvbnRlbnQpO1xuICAgIH1cbiAgICBzdGF0aWMgc3RzYyAoKSB7XG4gICAgICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAgICAgMHgwMCwgLy8gdmVyc2lvblxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGVudHJ5X2NvdW50XG4gICAgICAgIF0pO1xuICAgICAgICByZXR1cm4gRk1QNC5pbml0Qm94KDE2LCAnc3RzYycsIGNvbnRlbnQpO1xuICAgIH1cbiAgICBzdGF0aWMgc3RjbyAoKSB7XG4gICAgICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAgICAgMHgwMCwgLy8gdmVyc2lvblxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGVudHJ5X2NvdW50XG4gICAgICAgIF0pO1xuICAgICAgICByZXR1cm4gRk1QNC5pbml0Qm94KDE2LCAnc3RjbycsIGNvbnRlbnQpO1xuICAgIH1cbiAgICBzdGF0aWMgc3RzeiAoKSB7XG4gICAgICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAgICAgMHgwMCwgLy8gdmVyc2lvblxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHNhbXBsZV9zaXplXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBzYW1wbGVfY291bnRcbiAgICAgICAgXSk7XG4gICAgICAgIHJldHVybiBGTVA0LmluaXRCb3goMjAsICdzdHN6JywgY29udGVudCk7XG4gICAgfVxuICAgIHN0YXRpYyBtdmV4IChkdXJhdGlvbikge1xuICAgICAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpO1xuICAgICAgICBsZXQgbWVoZCA9IEJ1ZmZlci53cml0ZVVpbnQzMihkdXJhdGlvbik7XG4gICAgICAgIGJ1ZmZlci53cml0ZShGTVA0LnNpemUoODgpLCBGTVA0LnR5cGUoJ212ZXgnKSwgRk1QNC5zaXplKDE2KSwgRk1QNC50eXBlKCdtZWhkJyksIEZNUDQuZXh0ZW5zaW9uKDAsIDApLCBtZWhkLCBGTVA0LnRyZXgoMSksIEZNUDQudHJleCgyKSk7XG4gICAgICAgIHJldHVybiBidWZmZXIuYnVmZmVyO1xuICAgIH1cbiAgICBzdGF0aWMgdHJleCAoaWQpIHtcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAgICAgICAweDAwLCAvLyB2ZXJzaW9uIDBcbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAgICAgICAoaWQgPj4gMjQpLFxuICAgICAgICAgICAgKGlkID4+IDE2KSAmIDB4ZmYsXG4gICAgICAgICAgICAoaWQgPj4gOCkgJiAweGZmLFxuICAgICAgICAgICAgKGlkICYgMHhmZiksIC8vIHRyYWNrX0lEXG4gICAgICAgICAgICAweDAwLCAweDAwLCAweDAwLCAweDAxLCAvLyBkZWZhdWx0X3NhbXBsZV9kZXNjcmlwdGlvbl9pbmRleFxuICAgICAgICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZGVmYXVsdF9zYW1wbGVfZHVyYXRpb25cbiAgICAgICAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGRlZmF1bHRfc2FtcGxlX3NpemVcbiAgICAgICAgICAgIDB4MDAsIDB4MDEsIDB4MDAsIDB4MDEsIC8vIGRlZmF1bHRfc2FtcGxlX2ZsYWdzXG4gICAgICAgIF0pO1xuICAgICAgICByZXR1cm4gRk1QNC5pbml0Qm94KDggKyBjb250ZW50LmJ5dGVMZW5ndGgsICd0cmV4JywgY29udGVudCk7XG4gICAgfVxuICAgIHN0YXRpYyBtb29mIChkYXRhKSB7XG4gICAgICAgIGxldCBzaXplID0gODtcbiAgICAgICAgbGV0IG1maGQgPSBGTVA0Lm1maGQoKTtcbiAgICAgICAgbGV0IHRyYWYgPSBGTVA0LnRyYWYoZGF0YSk7XG4gICAgICAgIFttZmhkLCB0cmFmXS5mb3JFYWNoKGl0ZW09PntcbiAgICAgICAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIEZNUDQuaW5pdEJveChzaXplLCAnbW9vZicsIG1maGQsIHRyYWYpO1xuICAgIH1cbiAgICBzdGF0aWMgbWZoZCAoKSB7XG4gICAgICAgIGxldCBjb250ZW50ID0gQnVmZmVyLndyaXRlVWludDMyKEZNUDQuc2VxdWVuY2UpO1xuICAgICAgICBGTVA0LnNlcXVlbmNlICs9IDE7XG4gICAgICAgIHJldHVybiBGTVA0LmluaXRCb3goMTYsICdtZmhkJywgRk1QNC5leHRlbnNpb24oMCwgMCksIGNvbnRlbnQpO1xuICAgIH1cbiAgICBzdGF0aWMgdHJhZiAoZGF0YSkge1xuICAgICAgICBsZXQgc2l6ZSA9IDg7XG4gICAgICAgIGxldCB0ZmhkID0gRk1QNC50ZmhkKGRhdGEuaWQpO1xuICAgICAgICBsZXQgdGZkdCA9IEZNUDQudGZkdChkYXRhLnRpbWUpO1xuICAgICAgICBsZXQgc2R0cCA9IEZNUDQuc2R0cChkYXRhKTtcbiAgICAgICAgbGV0IHRydW4gPSBGTVA0LnRydW4oZGF0YSwgc2R0cC5ieXRlTGVuZ3RoKTtcbiAgICAgICAgW3RmaGQsIHRmZHQsIHNkdHAsIHRydW5dLmZvckVhY2goaXRlbT0+e1xuICAgICAgICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGg7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gRk1QNC5pbml0Qm94KHNpemUsICd0cmFmJywgdGZoZCwgdGZkdCwgc2R0cCwgdHJ1bik7XG4gICAgfVxuICAgIHN0YXRpYyB0ZmhkIChpZCkge1xuICAgICAgICBsZXQgY29udGVudCA9IEJ1ZmZlci53cml0ZVVpbnQzMihpZCk7XG4gICAgICAgIHJldHVybiBGTVA0LmluaXRCb3goMTYsICd0ZmhkJywgRk1QNC5leHRlbnNpb24oMCwgMCksIGNvbnRlbnQpO1xuICAgIH1cbiAgICBzdGF0aWMgdGZkdCAodGltZSkge1xuICAgICAgICAvLyBsZXQgdXBwZXIgPSBNYXRoLmZsb29yKHRpbWUgLyAoVUlOVDMyX01BWCArIDEpKSxcbiAgICAgICAgLy8gICAgIGxvd2VyID0gTWF0aC5mbG9vcih0aW1lICUgKFVJTlQzMl9NQVggKyAxKSk7XG4gICAgICAgIHJldHVybiBGTVA0LmluaXRCb3goMTYsICd0ZmR0JywgRk1QNC5leHRlbnNpb24oMCwgMCksIEJ1ZmZlci53cml0ZVVpbnQzMih0aW1lKSk7XG4gICAgfVxuICAgIHN0YXRpYyB0cnVuIChkYXRhLCBzZHRwTGVuZ3RoKSB7XG4gICAgICAgIC8vIGxldCBpZCA9IGRhdGEuaWQ7XG4gICAgICAgIC8vIGxldCBjZWlsID0gaWQgPT09IDEgPyAxNiA6IDEyO1xuICAgICAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpO1xuICAgICAgICBsZXQgc2FtcGxlQ291bnQgPSBCdWZmZXIud3JpdGVVaW50MzIoZGF0YS5zYW1wbGVzLmxlbmd0aCk7XG4gICAgICAgIC8vIG1kYXQtaGVhZGVyIDhcbiAgICAgICAgLy8gbW9vZi1oZWFkZXIgOFxuICAgICAgICAvLyBtZmhkIDE2XG4gICAgICAgIC8vIHRyYWYtaGVhZGVyIDhcbiAgICAgICAgLy8gdGhoZCAxNlxuICAgICAgICAvLyB0ZmR0IDIwXG4gICAgICAgIC8vIHRydW4taGVhZGVyIDEyXG4gICAgICAgIC8vIHNhbXBsZUNvdW50IDRcbiAgICAgICAgLy8gZGF0YS1vZmZzZXQgNFxuICAgICAgICAvLyBzYW1wbGVzLmxlbmd0aFxuICAgICAgICBsZXQgb2Zmc2V0ID0gQnVmZmVyLndyaXRlVWludDMyKDggKyA4ICsgMTYgKyA4ICsgMTYgKyAxNiArIDEyICsgNCArIDQgKyAxNiAqIGRhdGEuc2FtcGxlcy5sZW5ndGggKyBzZHRwTGVuZ3RoKTtcbiAgICAgICAgYnVmZmVyLndyaXRlKEZNUDQuc2l6ZSgyMCArIDE2ICogZGF0YS5zYW1wbGVzLmxlbmd0aCksIEZNUDQudHlwZSgndHJ1bicpLCBuZXcgVWludDhBcnJheShbMHgwMCwgMHgwMCwgMHgwRiwgMHgwMV0pLCBzYW1wbGVDb3VudCwgb2Zmc2V0KTtcblxuICAgICAgICBsZXQgc2l6ZSA9IGJ1ZmZlci5idWZmZXIuYnl0ZUxlbmd0aCwgd3JpdGVPZmZzZXQgPSAwO1xuICAgICAgICBkYXRhLnNhbXBsZXMuZm9yRWFjaCgoKSA9PiB7XG4gICAgICAgICAgICBzaXplICs9IDE2O1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgdHJ1bkJveCA9IG5ldyBVaW50OEFycmF5KHNpemUpO1xuXG4gICAgICAgIHRydW5Cb3guc2V0KGJ1ZmZlci5idWZmZXIsIDApO1xuICAgICAgICB3cml0ZU9mZnNldCArPSBidWZmZXIuYnVmZmVyLmJ5dGVMZW5ndGg7XG4gICAgICAgIGRhdGEuc2FtcGxlcy5mb3JFYWNoKChpdGVtKT0+e1xuXG5cbiAgICAgICAgICAgIHRydW5Cb3guc2V0KEJ1ZmZlci53cml0ZVVpbnQzMihpdGVtLmR1cmF0aW9uKSwgd3JpdGVPZmZzZXQpO1xuICAgICAgICAgICAgd3JpdGVPZmZzZXQgKz0gNDtcbiAgICAgICAgICAgIHRydW5Cb3guc2V0KEJ1ZmZlci53cml0ZVVpbnQzMihpdGVtLnNpemUpLCB3cml0ZU9mZnNldCk7XG4gICAgICAgICAgICB3cml0ZU9mZnNldCArPSA0O1xuXG4gICAgICAgICAgICBpZiAoZGF0YS5pZCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRydW5Cb3guc2V0KEJ1ZmZlci53cml0ZVVpbnQzMihpdGVtLmlzS2V5ZnJhbWUgPyAweDAyMDAwMDAwIDogMHgwMTAxMDAwMCksIHdyaXRlT2Zmc2V0KTtcbiAgICAgICAgICAgICAgICB3cml0ZU9mZnNldCArPSA0O1xuICAgICAgICAgICAgICAgIHRydW5Cb3guc2V0KEJ1ZmZlci53cml0ZVVpbnQzMihpdGVtLmNwcyksIHdyaXRlT2Zmc2V0KTtcbiAgICAgICAgICAgICAgICB3cml0ZU9mZnNldCArPSA0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cnVuQm94LnNldChCdWZmZXIud3JpdGVVaW50MzIoMHgwMTAwMDAwMCksIHdyaXRlT2Zmc2V0KTtcbiAgICAgICAgICAgICAgICB3cml0ZU9mZnNldCArPSA0O1xuICAgICAgICAgICAgICAgIHRydW5Cb3guc2V0KEJ1ZmZlci53cml0ZVVpbnQzMigwKSwgd3JpdGVPZmZzZXQpO1xuICAgICAgICAgICAgICAgIHdyaXRlT2Zmc2V0ICs9IDQ7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gYnVmZmVyLndyaXRlKEJ1ZmZlci53cml0ZVVpbnQzMigwKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdHJ1bkJveDtcbiAgICB9XG4gICAgc3RhdGljIHNkdHAgKGRhdGEpIHtcbiAgICAgICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKTtcbiAgICAgICAgYnVmZmVyLndyaXRlKEZNUDQuc2l6ZSgxMiArIGRhdGEuc2FtcGxlcy5sZW5ndGgpLCBGTVA0LnR5cGUoJ3NkdHAnKSwgRk1QNC5leHRlbnNpb24oMCwgMCkpO1xuICAgICAgICBkYXRhLnNhbXBsZXMuZm9yRWFjaChpdGVtPT57XG4gICAgICAgICAgICBidWZmZXIud3JpdGUobmV3IFVpbnQ4QXJyYXkoZGF0YS5pZCA9PT0gMSA/IFtpdGVtLmtleSA/IDMyIDogMTZdIDogWzE2XSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGJ1ZmZlci5idWZmZXI7XG4gICAgfVxuICAgIHN0YXRpYyBtZGF0IChkYXRhKSB7XG4gICAgICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKCksIHNpemUgPSA4O1xuICAgICAgICBkYXRhLnNhbXBsZXMuZm9yRWFjaChpdGVtPT57XG4gICAgICAgICAgICBzaXplICs9IGl0ZW0uc2l6ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGJ1ZmZlci53cml0ZShGTVA0LnNpemUoc2l6ZSksIEZNUDQudHlwZSgnbWRhdCcpKTtcbiAgICAgICAgbGV0IG1kYXRCb3ggPSBuZXcgVWludDhBcnJheShzaXplKTtcbiAgICAgICAgbGV0IG9mZnNldCA9IDA7XG4gICAgICAgIG1kYXRCb3guc2V0KGJ1ZmZlci5idWZmZXIsIG9mZnNldCk7XG4gICAgICAgIG9mZnNldCArPSA4O1xuICAgICAgICBkYXRhLnNhbXBsZXMuZm9yRWFjaChpdGVtPT57XG4gICAgICAgICAgICBpdGVtLmJ1ZmZlci5mb3JFYWNoKCh1bml0KSA9PiB7XG4gICAgICAgICAgICAgICAgbWRhdEJveC5zZXQodW5pdC5kYXRhLCBvZmZzZXQpO1xuICAgICAgICAgICAgICAgIG9mZnNldCArPSB1bml0LmRhdGEuYnl0ZUxlbmd0aDtcbiAgICAgICAgICAgICAgICAvLyBidWZmZXIud3JpdGUodW5pdC5kYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG1kYXRCb3g7XG4gICAgfVxufVxuRk1QNC50eXBlID0gY2FjaGVXcmFwcGVyKChuYW1lKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFtuYW1lLmNoYXJDb2RlQXQoMCksIG5hbWUuY2hhckNvZGVBdCgxKSwgbmFtZS5jaGFyQ29kZUF0KDIpLCBuYW1lLmNoYXJDb2RlQXQoMyldKTtcbn0pO1xuRk1QNC5zZXF1ZW5jZSA9IDE7XG5cbmV4cG9ydCBkZWZhdWx0IEZNUDQ7XG4iLCJpbXBvcnQgTWVkaWFTZWdtZW50TGlzdCBmcm9tICcuLi8uLi9tb2RlbHMvTWVkaWFTZWdtZW50TGlzdCdcbmltcG9ydCBNZWRpYVNlZ21lbnQgZnJvbSAnLi4vLi4vbW9kZWxzL01lZGlhU2VnbWVudCdcbmltcG9ydCBNZWRpYVNhbXBsZSBmcm9tICcuLi8uLi9tb2RlbHMvTWVkaWFTYW1wbGUnXG5pbXBvcnQgc25pZmZlciBmcm9tICcuLi8uLi91dGlscy9zbmlmZmVyJ1xuaW1wb3J0IEJ1ZmZlciBmcm9tICcuLi8uLi93cml0ZS9CdWZmZXInXG5pbXBvcnQgRk1QNCBmcm9tICcuL0ZtcDQnXG5pbXBvcnQgUmVtdXhlciBmcm9tICcuL1JlbXV4ZXInXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1wNFJlbXV4ZXIgZXh0ZW5kcyBSZW11eGVyIHtcbiAgY29uc3RydWN0b3IgKHN0b3JlKSB7XG4gICAgc3VwZXIoc3RvcmUpXG4gICAgdGhpcy5fZHRzQmFzZSA9IDBcbiAgICB0aGlzLl9pc0R0c0Jhc2VJbml0ZWQgPSBmYWxzZVxuICAgIHRoaXMuX3ZpZGVvTWV0YSA9IG51bGxcbiAgICB0aGlzLl9hdWRpb01ldGEgPSBudWxsXG4gICAgdGhpcy5fYXVkaW9OZXh0RHRzID0gbnVsbFxuICAgIHRoaXMuX3ZpZGVvTmV4dER0cyA9IG51bGxcbiAgICB0aGlzLl92aWRlb1NlZ21lbnRMaXN0ID0gbmV3IE1lZGlhU2VnbWVudExpc3QoJ3ZpZGVvJylcbiAgICB0aGlzLl9hdWRpb1NlZ21lbnRMaXN0ID0gbmV3IE1lZGlhU2VnbWVudExpc3QoJ2F1ZGlvJylcbiAgICBjb25zdCB7YnJvd3Nlcn0gPSBzbmlmZmVyXG4gICAgdGhpcy5fZmlsbFNpbGVuY2VGcmFtZSA9IGJyb3dzZXIgPT09ICdpZSdcbiAgICB0aGlzLmhhbmRsZU1lZGlhRnJhZ21lbnQgPSAoKSA9PiB7fVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5fZHRzQmFzZSA9IC0xXG4gICAgdGhpcy5fZHRzQmFzZUluaXRlZCA9IGZhbHNlXG4gICAgdGhpcy5fYXVkaW9NZXRhID0gbnVsbFxuICAgIHRoaXMuX3ZpZGVvTWV0YSA9IG51bGxcbiAgICB0aGlzLl92aWRlb05leHREdHMgPSBudWxsXG4gICAgdGhpcy5fYXVkaW9OZXh0RHRzID0gbnVsbFxuICAgIHRoaXMuX3ZpZGVvU2VnbWVudExpc3QuY2xlYXIoKVxuICAgIHRoaXMuX2F1ZGlvU2VnbWVudExpc3QuY2xlYXIoKVxuICAgIHRoaXMuX3ZpZGVvU2VnbWVudExpc3QgPSBudWxsXG4gICAgdGhpcy5fYXVkaW9TZWdtZW50TGlzdCA9IG51bGxcbiAgfVxuXG4gIHJlbXV4IChhdWRpb1RyYWNrLCB2aWRlb1RyYWNrKSB7XG4gICAgIXRoaXMuX2lzRHRzQmFzZUluaXRlZCAmJiB0aGlzLmNhbGNEdHNCYXNlKGF1ZGlvVHJhY2ssIHZpZGVvVHJhY2spXG5cbiAgICB0aGlzLl9yZW11eFZpZGVvKHZpZGVvVHJhY2spXG4gICAgdGhpcy5fcmVtdXhBdWRpbyhhdWRpb1RyYWNrKVxuICB9XG5cbiAgc2VlayAoKSB7XG4gICAgdGhpcy5fdmlkZW9OZXh0RHRzID0gbnVsbFxuICAgIHRoaXMuX2F1ZGlvTmV4dER0cyA9IG51bGxcbiAgICB0aGlzLl92aWRlb1NlZ21lbnRMaXN0LmNsZWFyKClcbiAgICB0aGlzLl9hdWRpb1NlZ21lbnRMaXN0LmNsZWFyKClcbiAgfVxuXG4gIG9uTWV0YURhdGFSZWFkeSAodHlwZSwgbWV0YSkge1xuICAgIHRoaXNbYF8ke3R5cGV9TWV0YWBdID0gbWV0YVxuICB9XG5cbiAgb25NZWRpYUluZm9SZWFkeSAobWVkaWFJbmZvKSB7XG4gICAgbGV0IGZ0eXBNb292ID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IGZ0eXAgPSBGTVA0LmZ0eXAoKVxuICAgIGxldCBtb292ID0gRk1QNC5tb292KG1lZGlhSW5mbylcbiAgICBmdHlwTW9vdi53cml0ZShmdHlwLCBtb292KVxuICAgIHJldHVybiBmdHlwTW9vdi5idWZmZXJcbiAgfVxuXG4gIGNhbGNEdHNCYXNlIChhdWRpb1RyYWNrLCB2aWRlb1RyYWNrKSB7XG4gICAgbGV0IGF1ZGlvQmFzZSA9IEluZmluaXR5XG4gICAgbGV0IHZpZGVvQmFzZSA9IEluZmluaXR5XG4gICAgaWYgKGF1ZGlvVHJhY2suc2FtcGxlcyAmJiBhdWRpb1RyYWNrLnNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICBhdWRpb0Jhc2UgPSBhdWRpb1RyYWNrLnNhbXBsZXNbMF0uZHRzXG4gICAgfVxuICAgIGlmICh2aWRlb1RyYWNrLnNhbXBsZXMgJiYgdmlkZW9UcmFjay5zYW1wbGVzLmxlbmd0aCkge1xuICAgICAgdmlkZW9CYXNlID0gdmlkZW9UcmFjay5zYW1wbGVzWzBdLmR0c1xuICAgIH1cblxuICAgIHRoaXMuX2R0c0Jhc2UgPSBNYXRoLm1pbihhdWRpb0Jhc2UsIHZpZGVvQmFzZSlcbiAgICB0aGlzLl9pc0R0c0Jhc2VJbml0ZWQgPSB0cnVlXG4gIH1cblxuICBfcmVtdXhWaWRlbyAodmlkZW9UcmFjaykge1xuICAgIGlmICghdGhpcy5fdmlkZW9NZXRhKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgdHJhY2sgPSB2aWRlb1RyYWNrXG4gICAgaWYgKCF2aWRlb1RyYWNrLnNhbXBsZXMgfHwgIXZpZGVvVHJhY2suc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBsZXQge3NhbXBsZXN9ID0gdHJhY2tcbiAgICBsZXQgZHRzQ29ycmVjdGlvblxuICAgIGxldCBmaXJzdER0cyA9IC0xXG4gICAgbGV0IGxhc3REdHMgPSAtMVxuICAgIGxldCBmaXJzdFB0cyA9IC0xXG4gICAgbGV0IGxhc3RQdHMgPSAtMVxuXG4gICAgY29uc3QgbXA0U2FtcGxlcyA9IFtdXG4gICAgY29uc3QgbWRhdEJveCA9IHtcbiAgICAgIHNhbXBsZXM6IFtdXG4gICAgfVxuICAgIGNvbnN0IHZpZGVvU2VnbWVudCA9IG5ldyBNZWRpYVNlZ21lbnQoKVxuICAgIHdoaWxlIChzYW1wbGVzLmxlbmd0aCkge1xuICAgICAgY29uc3QgYXZjU2FtcGxlID0gc2FtcGxlcy5zaGlmdCgpXG4gICAgICBjb25zdCB7aXNLZXlmcmFtZSwgY3BzfSA9IGF2Y1NhbXBsZVxuICAgICAgbGV0IGR0cyA9IGF2Y1NhbXBsZS5kdHMgLSB0aGlzLl9kdHNCYXNlXG5cbiAgICAgIGlmIChkdHNDb3JyZWN0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKCF0aGlzLl92aWRlb05leHREdHMpIHtcbiAgICAgICAgICBjb25zdCBsYXN0U2VnbWVudCA9IHRoaXMuX3ZpZGVvU2VnbWVudExpc3QuZ2V0TGFzdFNlZ21lbnRCZWZvcmUoZHRzKVxuICAgICAgICAgIGlmIChsYXN0U2VnbWVudCkge1xuICAgICAgICAgICAgbGV0IGdhcFxuICAgICAgICAgICAgY29uc3Qge2xhc3REdHMsIGdhcDogbGFzdEdhcH0gPSBsYXN0U2VnbWVudFxuICAgICAgICAgICAgZ2FwID0gZHRzIC0gKGxhc3REdHMgKyBsYXN0R2FwKSA+IDMgPyBkdHMgLSAobGFzdER0cyArIGxhc3RHYXApIDogMFxuICAgICAgICAgICAgZHRzQ29ycmVjdGlvbiA9IGR0cyAtIChsYXN0RHRzICsgZ2FwKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkdHNDb3JyZWN0aW9uID0gMFxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkdHNDb3JyZWN0aW9uID0gZHRzIC0gdGhpcy5fdmlkZW9OZXh0RHRzID49IDEwMDAgPyAwIDogZHRzIC0gdGhpcy5fdmlkZW9OZXh0RHRzXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IG9yaWdpbkR0cyA9IGR0c1xuICAgICAgZHRzIC09IGR0c0NvcnJlY3Rpb25cbiAgICAgIGNvbnN0IHB0cyA9IGR0cyArIGNwc1xuXG4gICAgICBpZiAoZmlyc3REdHMgPT09IC0xKSB7XG4gICAgICAgIGZpcnN0RHRzID0gZHRzXG4gICAgICAgIGZpcnN0UHRzID0gcHRzXG4gICAgICB9XG4gICAgICBsZXQgX3VuaXRzID0gW11cbiAgICAgIHdoaWxlIChhdmNTYW1wbGUudW5pdHMubGVuZ3RoKSB7XG4gICAgICAgIGxldCBtZGF0U2FtcGxlID0ge1xuICAgICAgICAgIGJ1ZmZlcjogW10sXG4gICAgICAgICAgc2l6ZTogMFxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVuaXQgPSBhdmNTYW1wbGUudW5pdHMuc2hpZnQoKVxuICAgICAgICBfdW5pdHMucHVzaCh1bml0KVxuICAgICAgICBtZGF0U2FtcGxlLmJ1ZmZlci5wdXNoKHVuaXQpXG4gICAgICAgIG1kYXRTYW1wbGUuc2l6ZSArPSB1bml0LmRhdGEuYnl0ZUxlbmd0aFxuXG4gICAgICAgIG1kYXRCb3guc2FtcGxlcy5wdXNoKG1kYXRTYW1wbGUpXG4gICAgICB9XG5cbiAgICAgIGxldCBzYW1wbGVEdXJhdGlvbiA9IDBcblxuICAgICAgaWYgKHNhbXBsZXMubGVuZ3RoID49IDEpIHtcbiAgICAgICAgY29uc3QgbmV4dER0cyA9IHNhbXBsZXNbMF0uZHRzIC0gdGhpcy5fZHRzQmFzZSAtIGR0c0NvcnJlY3Rpb25cbiAgICAgICAgc2FtcGxlRHVyYXRpb24gPSBuZXh0RHRzIC0gZHRzXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAobXA0U2FtcGxlcy5sZW5ndGggPj0gMSkgeyAvLyBsYXN0ZXN0IHNhbXBsZSwgdXNlIHNlY29uZCBsYXN0IGR1cmF0aW9uXG4gICAgICAgICAgc2FtcGxlRHVyYXRpb24gPSBtcDRTYW1wbGVzW21wNFNhbXBsZXMubGVuZ3RoIC0gMV0uZHVyYXRpb25cbiAgICAgICAgfSBlbHNlIHsgLy8gdGhlIG9ubHkgb25lIHNhbXBsZSwgdXNlIHJlZmVyZW5jZSBkdXJhdGlvblxuICAgICAgICAgIHNhbXBsZUR1cmF0aW9uID0gdGhpcy5fdmlkZW9NZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGlzS2V5ZnJhbWUpIHtcbiAgICAgICAgY29uc3QgcmFwID0gbmV3IE1lZGlhU2FtcGxlKHtcbiAgICAgICAgICBkdHMsXG4gICAgICAgICAgcHRzLFxuICAgICAgICAgIGR1cmF0aW9uOiBzYW1wbGVEdXJhdGlvbixcbiAgICAgICAgICBvcmlnaW5EdHM6IGF2Y1NhbXBsZS5kdHMsXG4gICAgICAgICAgcG9zaXRpb246IGF2Y1NhbXBsZS5wb3NpdGlvbixcbiAgICAgICAgICBpc1JBUDogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgICB2aWRlb1NlZ21lbnQuYWRkUkFQKHJhcClcbiAgICAgIH1cblxuICAgICAgbXA0U2FtcGxlcy5wdXNoKHtcbiAgICAgICAgZHRzLFxuICAgICAgICBjcHMsXG4gICAgICAgIHB0cyxcbiAgICAgICAgdW5pdHM6IF91bml0cyxcbiAgICAgICAgc2l6ZTogYXZjU2FtcGxlLmxlbmd0aCxcbiAgICAgICAgaXNLZXlmcmFtZSxcbiAgICAgICAgZHVyYXRpb246IHNhbXBsZUR1cmF0aW9uLFxuICAgICAgICBvcmlnaW5EdHNcbiAgICAgIH0pXG4gICAgfVxuICAgIGNvbnN0IGZpcnN0ID0gbXA0U2FtcGxlc1swXVxuICAgIGNvbnN0IGxhc3QgPSBtcDRTYW1wbGVzW21wNFNhbXBsZXMubGVuZ3RoIC0gMV1cbiAgICBsYXN0RHRzID0gbGFzdC5kdHMgKyBsYXN0LmR1cmF0aW9uXG4gICAgbGFzdFB0cyA9IGxhc3QucHRzICsgbGFzdC5kdXJhdGlvblxuXG4gICAgdGhpcy5fdmlkZW9OZXh0RHRzID0gbGFzdER0c1xuXG4gICAgdmlkZW9TZWdtZW50LnN0YXJ0RHRzID0gZmlyc3REdHNcbiAgICB2aWRlb1NlZ21lbnQuZW5kRHRzID0gbGFzdER0c1xuICAgIHZpZGVvU2VnbWVudC5zdGFydFB0cyA9IGZpcnN0UHRzXG4gICAgdmlkZW9TZWdtZW50LmVuZFB0cyA9IGxhc3RQdHNcbiAgICB2aWRlb1NlZ21lbnQub3JpZ2luU3RhcnREdHMgPSBmaXJzdC5vcmlnaW5EdHNcbiAgICB2aWRlb1NlZ21lbnQub3JpZ2luRW5kRHRzID0gbGFzdC5vcmlnaW5EdHMgKyBsYXN0LmR1cmF0aW9uXG4gICAgdmlkZW9TZWdtZW50LmdhcCA9IGR0c0NvcnJlY3Rpb25cbiAgICBjb25zdCBmaXJzdFNhbXBsZSA9IG5ldyBNZWRpYVNhbXBsZSh7XG4gICAgICBkdHM6IGZpcnN0LmR0cyxcbiAgICAgIHB0czogZmlyc3QucHRzLFxuICAgICAgZHVyYXRpb246IGZpcnN0LmR1cmF0aW9uLFxuICAgICAgaXNLZXlmcmFtZTogZmlyc3QuaXNLZXlmcmFtZSxcbiAgICAgIG9yaWdpbkR0czogZmlyc3Qub3JpZ2luRHRzXG4gICAgfSlcbiAgICBjb25zdCBsYXN0U2FtcGxlID0gbmV3IE1lZGlhU2FtcGxlKHtcbiAgICAgIGR0czogbGFzdC5kdHMsXG4gICAgICBwdHM6IGxhc3QucHRzLFxuICAgICAgZHVyYXRpb246IGxhc3QuZHVyYXRpb24sXG4gICAgICBpc0tleWZyYW1lOiBsYXN0LmlzS2V5ZnJhbWUsXG4gICAgICBvcmlnaW5EdHM6IGxhc3Qub3JpZ2luRHRzXG4gICAgfSlcbiAgICB2aWRlb1NlZ21lbnQuZmlyc3RTYW1wbGUgPSBmaXJzdFNhbXBsZVxuICAgIHZpZGVvU2VnbWVudC5sYXN0U2FtcGxlID0gbGFzdFNhbXBsZVxuICAgIGxldCBtb29mTWRhdCA9IG5ldyBCdWZmZXIoKVxuXG4gICAgdHJhY2suc2FtcGxlcyA9IG1wNFNhbXBsZXNcbiAgICB0cmFjay50aW1lID0gZmlyc3REdHNcbiAgICBjb25zdCBtb29mID0gRk1QNC5tb29mKHRyYWNrKVxuICAgIGNvbnN0IG1kYXQgPSBGTVA0Lm1kYXQobWRhdEJveClcbiAgICBtb29mTWRhdC53cml0ZShtb29mLCBtZGF0KVxuXG4gICAgaWYgKCF0aGlzLl9zdG9yZS5pc0xpdmUpIHtcbiAgICAgIHRoaXMuX3ZpZGVvU2VnbWVudExpc3QuYXBwZW5kKHZpZGVvU2VnbWVudClcbiAgICB9XG5cbiAgICB0cmFjay5zYW1wbGVzID0gW11cbiAgICB0cmFjay5sZW5ndGggPSAwXG5cbiAgICB0aGlzLmhhbmRsZU1lZGlhRnJhZ21lbnQoe1xuICAgICAgdHlwZTogJ3ZpZGVvJyxcbiAgICAgIGRhdGE6IG1vb2ZNZGF0LmJ1ZmZlci5idWZmZXIsXG4gICAgICBzYW1wbGVDb3VudDogbXA0U2FtcGxlcy5sZW5ndGgsXG4gICAgICBmcmFnbWVudDogdmlkZW9TZWdtZW50XG4gICAgfSlcbiAgfVxuXG4gIF9yZW11eEF1ZGlvICh0cmFjaykge1xuICAgIGlmICghdGhpcy5fYXVkaW9NZXRhKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3Qge3NhbXBsZXN9ID0gdHJhY2tcbiAgICBsZXQgZHRzQ29ycmVjdGlvblxuICAgIGxldCBmaXJzdER0cyA9IC0xXG4gICAgbGV0IGxhc3REdHMgPSAtMVxuICAgIC8vIGxldCBmaXJzdFB0cyA9IC0xXG4gICAgLy8gbGV0IGxhc3RQdHMgPSAtMVxuICAgIGxldCBzaWxlbnREdXJhdGlvblxuICAgIGxldCBtcDRTYW1wbGVzID0gW11cblxuICAgIGNvbnN0IG1kYXRCb3ggPSB7XG4gICAgICBzYW1wbGVzOiBbXVxuICAgIH1cbiAgICBpZiAoIXNhbXBsZXMgfHwgIXNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgbGV0IGlzRmlyc3REdHNJbml0ZWQgPSBmYWxzZVxuICAgIHdoaWxlIChzYW1wbGVzLmxlbmd0aCkge1xuICAgICAgbGV0IHNhbXBsZSA9IHNhbXBsZXMuc2hpZnQoKVxuICAgICAgY29uc3Qge3VuaXR9ID0gc2FtcGxlXG4gICAgICBsZXQgZHRzID0gc2FtcGxlLmR0cyAtIHRoaXMuX2R0c0Jhc2VcblxuICAgICAgbGV0IG5lZWRTaWxlbnRGcmFtZSA9IGZhbHNlXG4gICAgICBpZiAoZHRzQ29ycmVjdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICghdGhpcy5fYXVkaW9OZXh0RHRzKSB7XG4gICAgICAgICAgY29uc3QgbGFzdFNlZ21lbnQgPSB0aGlzLl9hdWRpb1NlZ21lbnRMaXN0LmdldExhc3RTZWdtZW50QmVmb3JlKGR0cylcbiAgICAgICAgICBpZiAobGFzdFNlZ21lbnQpIHtcbiAgICAgICAgICAgIGxldCBnYXBcbiAgICAgICAgICAgIGNvbnN0IHtsYXN0RHRzLCBnYXA6IGxhc3RHYXB9ID0gbGFzdFNlZ21lbnRcbiAgICAgICAgICAgIGdhcCA9IGR0cyAtIChsYXN0RHRzICsgbGFzdEdhcCkgPiAzID8gZHRzIC0gKGxhc3REdHMgKyBsYXN0R2FwKSA6IDBcbiAgICAgICAgICAgIGR0c0NvcnJlY3Rpb24gPSBkdHMgLSAobGFzdER0cyArIGdhcClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmVlZFNpbGVudEZyYW1lID0gdGhpcy5fZmlsbFNpbGVuY2VGcmFtZSAmJiAhdGhpcy5fdmlkZW9TZWdtZW50TGlzdC5pc0VtcHR5KClcbiAgICAgICAgICAgIGR0c0NvcnJlY3Rpb24gPSAwXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGR0c0NvcnJlY3Rpb24gPSBkdHMgLSB0aGlzLl9hdWRpb05leHREdHMgPj0gMTAwMCA/IDAgOiBkdHMgLSB0aGlzLl9hdWRpb05leHREdHNcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3Qgb3JpZ2luRHRzID0gZHRzXG4gICAgICBkdHMgLT0gZHRzQ29ycmVjdGlvblxuXG4gICAgICBpZiAobmVlZFNpbGVudEZyYW1lKSB7XG4gICAgICAgIGNvbnN0IHZpZGVvU2VnbWVudCA9IHRoaXMuX3ZpZGVvU2VnbWVudExpc3QuZ2V0TGFzdFNhbXBsZUJlZm9yZShvcmlnaW5EdHMpXG5cbiAgICAgICAgaWYgKHZpZGVvU2VnbWVudCAmJiB2aWRlb1NlZ21lbnQuc3RhcnREdHMgPCBkdHMpIHtcbiAgICAgICAgICBzaWxlbnREdXJhdGlvbiA9IGR0cyAtIHZpZGVvU2VnbWVudC5zdGFydER0c1xuICAgICAgICAgIGR0cyA9IHZpZGVvU2VnbWVudC5zdGFydER0c1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5lZWRTaWxlbnRGcmFtZSA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFpc0ZpcnN0RHRzSW5pdGVkKSB7XG4gICAgICAgIGZpcnN0RHRzID0gZHRzXG4gICAgICAgIGlzRmlyc3REdHNJbml0ZWQgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkU2lsZW50RnJhbWUpIHtcbiAgICAgICAgc2FtcGxlcy51bnNoaWZ0KHNhbXBsZSlcbiAgICAgICAgY29uc3Qgc2lsZW50RnJhbWUgPSB0aGlzLmluaXRTaWxlbnRBdWRpbyhkdHMsIHNpbGVudER1cmF0aW9uKVxuICAgICAgICBtcDRTYW1wbGVzLnB1c2goc2lsZW50RnJhbWUpXG5cbiAgICAgICAgbGV0IG1kYXRTYW1wbGUgPSB7XG4gICAgICAgICAgYnVmZmVyOiBbXSxcbiAgICAgICAgICBzaXplOiAwXG4gICAgICAgIH1cbiAgICAgICAgbWRhdFNhbXBsZS5idWZmZXIucHVzaCh7XG4gICAgICAgICAgZGF0YTogc2lsZW50RnJhbWUudW5pdFxuICAgICAgICB9KVxuICAgICAgICBtZGF0U2FtcGxlLnNpemUgKz0gc2lsZW50RnJhbWUudW5pdC5ieXRlTGVuZ3RoXG5cbiAgICAgICAgbWRhdEJveC5zYW1wbGVzLnB1c2gobWRhdFNhbXBsZSlcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgbGV0IHNhbXBsZUR1cmF0aW9uID0gMFxuXG4gICAgICBpZiAoc2FtcGxlcy5sZW5ndGggPj0gMSkge1xuICAgICAgICBjb25zdCBuZXh0RHRzID0gc2FtcGxlc1swXS5kdHMgLSB0aGlzLl9kdHNCYXNlIC0gZHRzQ29ycmVjdGlvblxuICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IG5leHREdHMgLSBkdHNcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChtcDRTYW1wbGVzLmxlbmd0aCA+PSAxKSB7IC8vIHVzZSBzZWNvbmQgbGFzdCBzYW1wbGUgZHVyYXRpb25cbiAgICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IG1wNFNhbXBsZXNbbXA0U2FtcGxlcy5sZW5ndGggLSAxXS5kdXJhdGlvblxuICAgICAgICB9IGVsc2UgeyAvLyB0aGUgb25seSBvbmUgc2FtcGxlLCB1c2UgcmVmZXJlbmNlIHNhbXBsZSBkdXJhdGlvblxuICAgICAgICAgIHNhbXBsZUR1cmF0aW9uID0gdGhpcy5fYXVkaW9NZXRhLnJlZlNhbXBsZUR1cmF0aW9uXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgbXA0U2FtcGxlID0ge1xuICAgICAgICBkdHMsXG4gICAgICAgIHB0czogZHRzLFxuICAgICAgICBjdHM6IDAsXG4gICAgICAgIHNpemU6IHVuaXQuYnl0ZUxlbmd0aCxcbiAgICAgICAgZHVyYXRpb246IHNhbXBsZUR1cmF0aW9uLFxuICAgICAgICBvcmlnaW5EdHNcbiAgICAgIH1cblxuICAgICAgbGV0IG1kYXRTYW1wbGUgPSB7XG4gICAgICAgIGJ1ZmZlcjogW10sXG4gICAgICAgIHNpemU6IDBcbiAgICAgIH1cbiAgICAgIG1kYXRTYW1wbGUuYnVmZmVyLnB1c2goe1xuICAgICAgICBkYXRhOiB1bml0XG4gICAgICB9KVxuICAgICAgbWRhdFNhbXBsZS5zaXplICs9IHVuaXQuYnl0ZUxlbmd0aFxuXG4gICAgICBtZGF0Qm94LnNhbXBsZXMucHVzaChtZGF0U2FtcGxlKVxuXG4gICAgICBtcDRTYW1wbGVzLnB1c2gobXA0U2FtcGxlKVxuICAgIH1cblxuICAgIGNvbnN0IGxhc3QgPSBtcDRTYW1wbGVzW21wNFNhbXBsZXMubGVuZ3RoIC0gMV1cbiAgICBsYXN0RHRzID0gbGFzdC5kdHMgKyBsYXN0LmR1cmF0aW9uXG5cbiAgICB0aGlzLl9hdWRpb05leHREdHMgPSBsYXN0RHRzXG5cbiAgICBjb25zdCBhdWRpb1NlZ21lbnQgPSBuZXcgTWVkaWFTZWdtZW50KClcbiAgICBhdWRpb1NlZ21lbnQuc3RhcnREdHMgPSBmaXJzdER0c1xuICAgIGF1ZGlvU2VnbWVudC5lbmREdHMgPSBsYXN0RHRzXG4gICAgYXVkaW9TZWdtZW50LnN0YXJ0UHRzID0gZmlyc3REdHNcbiAgICBhdWRpb1NlZ21lbnQuZW5kUHRzID0gbGFzdER0c1xuICAgIGF1ZGlvU2VnbWVudC5vcmlnaW5TdGFydER0cyA9IG1wNFNhbXBsZXNbMF0ub3JpZ2luRHRzXG4gICAgYXVkaW9TZWdtZW50Lm9yaWdpbkVuZER0cyA9IGxhc3Qub3JpZ2luRHRzICsgbGFzdC5kdXJhdGlvblxuICAgIGF1ZGlvU2VnbWVudC5nYXAgPSBkdHNDb3JyZWN0aW9uXG4gICAgYXVkaW9TZWdtZW50LmZpcnN0U2FtcGxlID0gbmV3IE1lZGlhU2FtcGxlKHtcbiAgICAgIGR0czogbXA0U2FtcGxlc1swXS5kdHMsXG4gICAgICBwdHM6IG1wNFNhbXBsZXNbMF0ucHRzLFxuICAgICAgZHVyYXRpb246IG1wNFNhbXBsZXNbMF0uZHVyYXRpb24sXG4gICAgICBvcmlnaW5EdHM6IG1wNFNhbXBsZXNbMF0ub3JpZ2luRHRzXG4gICAgfSlcbiAgICBhdWRpb1NlZ21lbnQubGFzdFNhbXBsZSA9IG5ldyBNZWRpYVNhbXBsZSh7XG4gICAgICBkdHM6IGxhc3QuZHRzLFxuICAgICAgcHRzOiBsYXN0LnB0cyxcbiAgICAgIGR1cmF0aW9uOiBsYXN0LmR1cmF0aW9uLFxuICAgICAgb3JpZ2luRHRzOiBsYXN0Lm9yaWdpbkR0c1xuICAgIH0pXG5cbiAgICB0cmFjay5zYW1wbGVzID0gbXA0U2FtcGxlc1xuICAgIGNvbnN0IG1vb2ZNZGF0ID0gbmV3IEJ1ZmZlcigpXG4gICAgdHJhY2sudGltZSA9IGZpcnN0RHRzXG4gICAgY29uc3QgbW9vZiA9IEZNUDQubW9vZih0cmFjaywgZmlyc3REdHMpXG4gICAgY29uc3QgbWRhdCA9IEZNUDQubWRhdChtZGF0Qm94KVxuICAgIG1vb2ZNZGF0LndyaXRlKG1vb2YsIG1kYXQpXG5cbiAgICBpZiAoIXRoaXMuX3N0b3JlLmlzTGl2ZSkge1xuICAgICAgdGhpcy5fYXVkaW9TZWdtZW50TGlzdC5hcHBlbmQoYXVkaW9TZWdtZW50KVxuICAgIH1cbiAgICB0cmFjay5zYW1wbGVzID0gW11cbiAgICB0cmFjay5sZW5ndGggPSAwXG4gICAgdGhpcy5oYW5kbGVNZWRpYUZyYWdtZW50KHtcbiAgICAgIHR5cGU6ICdhdWRpbycsXG4gICAgICBkYXRhOiBtb29mTWRhdC5idWZmZXIuYnVmZmVyLFxuICAgICAgc2FtcGxlQ291bnQ6IG1wNFNhbXBsZXMubGVuZ3RoLFxuICAgICAgZnJhZ21lbnQ6IGF1ZGlvU2VnbWVudFxuICAgIH0pXG4gIH1cblxuICBpbml0U2lsZW50QXVkaW8gKGR0cywgZHVyYXRpb24pIHtcbiAgICBjb25zdCB1bml0ID0gTXA0UmVtdXhlci5nZXRTaWxlbnRGcmFtZSh0aGlzLl9hdWRpb01ldGEuY2hhbm5lbENvdW50KVxuICAgIHJldHVybiB7XG4gICAgICBkdHMsXG4gICAgICBwdHM6IGR0cyxcbiAgICAgIGNwczogMCxcbiAgICAgIGR1cmF0aW9uLFxuICAgICAgdW5pdCxcbiAgICAgIHNpemU6IHVuaXQuYnl0ZUxlbmd0aCxcbiAgICAgIG9yaWdpbkR0czogZHRzXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldFNpbGVudEZyYW1lIChjaGFubmVsQ291bnQpIHtcbiAgICBpZiAoY2hhbm5lbENvdW50ID09PSAxKSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjMsIDB4ODBdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSAyKSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MjEsIDB4MDAsIDB4NDksIDB4OTAsIDB4MDIsIDB4MTksIDB4MDAsIDB4MjMsIDB4ODBdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSAzKSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4OGVdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSA0KSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4ODAsIDB4MmMsIDB4ODAsIDB4MDgsIDB4MDIsIDB4MzhdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSA1KSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4ODIsIDB4MzAsIDB4MDQsIDB4OTksIDB4MDAsIDB4MjEsIDB4OTAsIDB4MDIsIDB4MzhdKVxuICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSA2KSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4YzgsIDB4MDAsIDB4ODAsIDB4MjAsIDB4ODQsIDB4MDEsIDB4MjYsIDB4NDAsIDB4MDgsIDB4NjQsIDB4MDAsIDB4ODIsIDB4MzAsIDB4MDQsIDB4OTksIDB4MDAsIDB4MjEsIDB4OTAsIDB4MDIsIDB4MDAsIDB4YjIsIDB4MDAsIDB4MjAsIDB4MDgsIDB4ZTBdKVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG4iLCJpbXBvcnQgTG9nIGZyb20gJy4uLy4uL3V0aWxzL0xvZydcbmltcG9ydCBUcmFuc0NvZGVyIGZyb20gJy4uL1RyYW5zQ29kZXInXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW11eGVyIGV4dGVuZHMgVHJhbnNDb2RlciB7XG4gIGRpc3BhdGNoICh0eXBlLCAuLi5wYXlsb2FkKSB7XG4gICAgY29uc3QgcHJlZml4ID0gJ3JlbXV4ZXJfJ1xuICAgIHRoaXMuX29ic2VydmVyLmVtaXQoYCR7cHJlZml4fSR7dHlwZX1gLCAuLi5wYXlsb2FkKVxuICB9XG4gIGVycm9yIChtZXNzYWdlKSB7XG4gICAgY29uc3QgeyBDTEFTU19OQU1FID0gJ1JlbXV4ZXInIH0gPSB0aGlzXG4gICAgTG9nLmVycm9yKGBbJHtDTEFTU19OQU1FfSBlcnJvcl0gYCwgbWVzc2FnZSlcbiAgfVxuXG4gIGluZm8gKG1lc3NhZ2UpIHtcbiAgICBjb25zdCB7IENMQVNTX05BTUUgPSAnUmVtdXhlcicgfSA9IHRoaXNcbiAgICBMb2cuaW5mbyhgWyR7Q0xBU1NfTkFNRX0gaW5mb10gYCwgbWVzc2FnZSlcbiAgfVxuXG4gIGxvZyAobWVzc2FnZSkge1xuICAgIGNvbnN0IHsgQ0xBU1NfTkFNRSA9ICdSZW11eGVyJyB9ID0gdGhpc1xuICAgIExvZy5sb2coYFske0NMQVNTX05BTUV9IGxvZ10gYCwgbWVzc2FnZSlcbiAgfVxuXG4gIHdhcm4gKG1lc3NhZ2UpIHtcbiAgICBjb25zdCB7IENMQVNTX05BTUUgPSAnUmVtdXhlcicgfSA9IHRoaXNcbiAgICBMb2cud2FybihgWyR7Q0xBU1NfTkFNRX0gd2Fybl0gYCwgbWVzc2FnZSlcbiAgfVxufVxuIiwiY2xhc3MgTGl2ZVRhc2sge1xuICAgIGNvbnN0cnVjdG9yKHVybCwgY29uZmlnKSB7XG4gICAgICAgIGNvbnN0IF9oZWFkZXJzID0gbmV3IHdpbmRvdy5IZWFkZXJzKCk7XG4gICAgICAgIGNvbnN0IF9jb25maWcgPSB7XG4gICAgICAgICAgICBoZWFkZXJzOiBPYmplY3QuYXNzaWduKHt9LCBfaGVhZGVycyksXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgY2FjaGU6ICdkZWZhdWx0JyxcbiAgICAgICAgICAgIG1vZGU6ICdjb3JzJyxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsLCBPYmplY3QuYXNzaWduKHt9LCBfY29uZmlnLCBjb25maWcpKTtcbiAgICB9XG5cbiAgICBydW4gKGNhbGxiYWNrKSB7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVzb2x2ZSAocmVhZGVyKSB7XG4gICAgICAgICAgICByZWFkZXIucmVhZCgpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXN1bHQuZG9uZSA/IHVuZGVmaW5lZCA6IHJlc3VsdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZWFkZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZmV0Y2godGhpcy5yZXF1ZXN0KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICBjb25zdCByZWFkZXIgPSByZXMuYm9keS5nZXRSZWFkZXIoKTtcbiAgICAgICAgICAgIHJlc29sdmUocmVhZGVyKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExpdmVUYXNrOyIsImltcG9ydCBYSFJMb2FkZXIgZnJvbSAnLi9sb2FkZXJzL1hIUkxvYWRlcidcbmltcG9ydCBGZXRjaExvYWRlciBmcm9tICcuL2xvYWRlcnMvRmV0Y2hMb2FkZXInXG5jb25zdCBMb2FkQ2xzID0gKGZ1bmN0aW9uICh3aW5kb3cpIHtcbiAgaWYgKHdpbmRvdy5mZXRjaCkge1xuICAgIHJldHVybiBGZXRjaExvYWRlclxuICB9XG4gIHJldHVybiBYSFJMb2FkZXJcbn0pKHdpbmRvdylcbmNsYXNzIFZvZFRhc2sge1xuICBjb25zdHJ1Y3RvciAodXJsLCByYW5nZSwgaGVhZGVycykge1xuICAgIHRoaXMudXJsID0gdXJsXG4gICAgdGhpcy5yYW5nZSA9IHJhbmdlXG4gICAgdGhpcy5pZCA9IHJhbmdlLmpvaW4oJy0nKVxuICAgIHRoaXMub24gPSBmYWxzZVxuICAgIHRoaXMubG9hZGVyID0gbmV3IExvYWRDbHModXJsLCByYW5nZSwgaGVhZGVycylcbiAgICB0aGlzLmlzQ2FuY2VsZWQgPSBmYWxzZVxuICAgIFZvZFRhc2sucXVldWUucHVzaCh0aGlzKVxuICAgIFZvZFRhc2sudXBkYXRlKClcbiAgfVxuXG4gIGNhbmNlbCAoKSB7XG4gICAgdGhpcy5pc0NhbmNlbGVkID0gdHJ1ZVxuICAgIHRoaXMubG9hZGVyLmNhbmNlbCgpXG4gIH1cblxuICBzdGF0aWMgcmVtb3ZlIChsb2FkZXIpIHtcbiAgICBWb2RUYXNrLnF1ZXVlLmZpbHRlcigoaXRlbSwgaWR4KSA9PiB7XG4gICAgICBpZiAoaXRlbS51cmwgPT09IGxvYWRlci51cmwgJiYgaXRlbS5pZCA9PT0gbG9hZGVyLmlkKSB7XG4gICAgICAgIFZvZFRhc2sucXVldWUuc3BsaWNlKGlkeCwgMSlcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gICAgVm9kVGFzay51cGRhdGUoKVxuICB9XG5cbiAgc3RhdGljIHVwZGF0ZSAoKSB7XG4gICAgbGV0IFF1ZXVlID0gVm9kVGFzay5xdWV1ZVxuICAgIGxldCBzZW5kZWQgPSBRdWV1ZS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ub24pXG4gICAgbGV0IHdhaXQgPSBRdWV1ZS5maWx0ZXIoaXRlbSA9PiAhaXRlbS5vbilcbiAgICBsZXQgbWF4ID0gVm9kVGFzay5saW1pdCAtIHNlbmRlZC5sZW5ndGhcbiAgICB3YWl0LmZvckVhY2goKGl0ZW0sIGlkeCkgPT4ge1xuICAgICAgaWYgKGlkeCA8IG1heCkge1xuICAgICAgICBpdGVtLnJ1bigpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHJ1biAoKSB7XG4gICAgaWYgKHRoaXMubG9hZGVyLnJlYWR5U3RhdGUgPT09IDEpIHtcbiAgICAgIHRoaXMub24gPSB0cnVlXG4gICAgICB0aGlzLmxvYWRlci5ydW4oKVxuICAgIH0gZWxzZSB7XG4gICAgICBWb2RUYXNrLnJlbW92ZSgpXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGNsZWFyICgpIHtcbiAgICBWb2RUYXNrLnF1ZXVlLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoIWl0ZW0ubG9hZGVyLmNvbXBsZXRlKSB7XG4gICAgICAgIGl0ZW0uY2FuY2VsKClcbiAgICAgIH1cbiAgICB9KVxuICAgIFZvZFRhc2sucXVldWUubGVuZ3RoID0gMFxuICB9XG5cbiAgZ2V0IHByb21pc2UgKCkge1xuICAgIHJldHVybiB0aGlzLmxvYWRlci5wcm9taXNlXG4gIH1cbiAgZ2V0IHRpbWVTdGFtcCAoKSB7XG4gICAgcmV0dXJuIHRoaXMubG9hZGVyLnRpbWVTdGFtcFxuICB9XG59XG5cblZvZFRhc2sucXVldWUgPSBbXVxuVm9kVGFzay5saW1pdCA9IDJcbndpbmRvdy5Wb2RUYXNrID0gVm9kVGFza1xuXG5leHBvcnQgZGVmYXVsdCBWb2RUYXNrXG4iLCJpbXBvcnQgVm9kVGFzayBmcm9tICcuLi9Wb2RUYXNrJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmV0Y2hMb2FkZXIge1xuICBjb25zdHJ1Y3RvciAodXJsLCByYW5nZSwgY29uZmlnID0ge30pIHtcbiAgICB0aGlzLnVybCA9IHVybFxuICAgIHRoaXMub24gPSBmYWxzZVxuICAgIHRoaXMuY29tcGxldGUgPSBmYWxzZVxuICAgIHRoaXMuaXNTdG9wcGVkID0gZmFsc2VcbiAgICB0aGlzLnRpbWVTdGFtcCA9IERhdGUubm93KClcbiAgICBjb25zdCBfY29uZmlnID0ge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICBSYW5nZTogYGJ5dGVzPSR7cmFuZ2VbMF19LSR7cmFuZ2VbMV19YFxuICAgICAgfSxcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBjYWNoZTogJ2RlZmF1bHQnLFxuICAgICAgbW9kZTogJ2NvcnMnXG4gICAgfVxuXG4gICAgdGhpcy5yZXF1ZXN0ID0gKCkgPT4ge1xuICAgICAgdGhpcy5vbiA9IHRydWVcbiAgICAgIHJldHVybiB3aW5kb3cuZmV0Y2godXJsLCBPYmplY3QuYXNzaWduKHt9LCBfY29uZmlnLCBjb25maWcpKS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuc3RhdHVzID4gMjk5IHx8IHJlcy5zdGF0dXMgPCAyMDAgfHwgIXJlcy5vaykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUgPSB0cnVlXG4gICAgICAgICAgVm9kVGFzay5yZW1vdmUodGhpcylcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKGB1cmwgJHtyZXMuc3RhdHVzfSAke3Jlcy5zdGF0dXNUZXh0fWApKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVzKVxuICAgICAgfSkudGhlbihyZXMgPT4gcmVzLmFycmF5QnVmZmVyKCkpLnRoZW4oYnVmZmVyID0+IHtcbiAgICAgICAgdGhpcy5jb21wbGV0ZSA9IHRydWVcbiAgICAgICAgdGhpcy5ieXRlTGVuZ3RoID0gYnVmZmVyLmJ5dGVMZW5ndGhcbiAgICAgICAgVm9kVGFzay5yZW1vdmUodGhpcylcbiAgICAgICAgaWYgKHRoaXMuaXNTdG9wcGVkKSByZXR1cm4ge31cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBidWZmZXIsXG4gICAgICAgICAgdGltZVN0YW1wOiB0aGlzLnRpbWVTdGFtcFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIHJ1biAoKSB7XG4gICAgdGhpcy5fcHJvbWlzZSA9IHRoaXMucmVxdWVzdCgpXG4gIH1cblxuICBnZXQgcmVhZHlTdGF0ZSAoKSB7XG4gICAgcmV0dXJuIDFcbiAgfVxuXG4gIGNhbmNlbCAoKSB7XG4gICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlXG4gIH1cblxuICBnZXQgcHJvbWlzZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMub24gPyB0aGlzLl9wcm9taXNlIDogdGhpcy5yZXF1ZXN0KClcbiAgfVxufVxuIiwiaW1wb3J0IFZvZFRhc2sgZnJvbSAnLi4vVm9kVGFzayc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBYSFJMb2FkZXIge1xuICAgIGNvbnN0cnVjdG9yICh1cmwsIHJhbmdlKSB7XG4gICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgeGhyLm9wZW4oJ2dldCcsIHVybCk7XG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignUmFuZ2UnLCBgYnl0ZXM9JHtyYW5nZVswXX0tJHtyYW5nZVsxXX1gKTtcbiAgICAgICAgeGhyLm9uYWJvcnQgPSAoKSA9PiB7XG4gICAgICAgICAgICBWb2RUYXNrLnJlbW92ZSh0aGlzKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT09IDIwMCB8fCB4aHIuc3RhdHVzID09PSAyMDYpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBWb2RUYXNrLnJlbW92ZSh0aGlzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB4aHIub25lcnJvciA9IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgIFZvZFRhc2sucmVtb3ZlKHRoaXMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5feGhyID0geGhyO1xuICAgIH1cblxuICAgIGdldCBwcm9taXNlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2U7XG4gICAgfVxuXG4gICAgZ2V0IHJlYWR5U3RhdGUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feGhyLnJlYWR5U3RhdGU7XG4gICAgfVxuXG4gICAgcnVuICgpIHtcbiAgICAgICAgdGhpcy5feGhyLnNlbmQoKTtcbiAgICB9XG5cbiAgICBjYW5jZWwgKCkge1xuICAgICAgICB0aGlzLl94aHIuYWJvcnQoKTtcbiAgICB9XG5cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhVmlldzRSZWFkIHtcbiAgICBjb25zdHJ1Y3RvciAoYnVmZmVyLCBjb250ZXh0KSB7XG4gICAgICAgIHRoaXMuX2R2ID0gbmV3IERhdGFWaWV3KGJ1ZmZlcik7XG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLmluaXRQcm94eSgpO1xuICAgIH1cblxuICAgIGluaXRQcm94eSAoKSB7XG4gICAgICAgIGNvbnN0IHNpemVBcnIgPSBbOCwgMTYsIDMyXTtcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHsgX3N0b3JlIH0gPSB0aGlzLl9jb250ZXh0O1xuICAgICAgICBzaXplQXJyLmZvckVhY2goc2l6ZSA9PiB7XG4gICAgICAgICAgICB0aGlzW2BnZXRVaW50JHtzaXplfWBdID0gZnVuY3Rpb24gKG9mZnNldCkge1xuICAgICAgICAgICAgICAgIGlmICghb2Zmc2V0KSB7IG9mZnNldCA9IHNlbGYuX2NvbnRleHQucmVhZE9mZnNldDsgfVxuICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgPT09IHNlbGYuX2NvbnRleHQucmVhZE9mZnNldCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl9jb250ZXh0LnJlYWRPZmZzZXQgKz0gc2l6ZSAvIDg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLl9kdltgZ2V0VWludCR7c2l6ZX1gXShvZmZzZXQsICFfc3RvcmUuaXNMZSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiDmmL7lvI/lo7DmmI7kuIDkuKrmr5TlhbblroPkvY3mlbDmm7TluLjnlKjor7vlj5YyNOS9jeaVtOaVsOaWueazlVxuICAgICAgICAgKiBAcGFyYW0gb2Zmc2V0XG4gICAgICAgICAqIEBwYXJhbSBpc0hpZ2hcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZ2V0VWludDI0ID0gZnVuY3Rpb24gKG9mZnNldCkge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5nZXRVaW50KDI0LCBvZmZzZXQsIGZhbHNlKTsgLy8g5Lya6K+75Y+WVWludDMyLOWBmiBhbmQg5pON5L2c5LmL5ZCO5Zue6YCA5LiA5L2N44CCXG4gICAgICAgICAgICBzZWxmLl9jb250ZXh0LnJlYWRPZmZzZXQgLT0gMTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5nZXRVaW50ID0gZnVuY3Rpb24gKHNpemUsIG9mZnNldCwgaXNIaWdoID0gdHJ1ZSkge1xuICAgICAgICAgICAgaWYgKHNpemUgPiAzMikge1xuICAgICAgICAgICAgICAgIHRocm93ICdub3Qgc3VwcG9ydGVkIHJlYWQgc2l6ZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcmVhZFNpemUgPSAzMjtcbiAgICAgICAgICAgIGlmICghdGhpc1tgZ2V0VWludCR7c2l6ZX1gXSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBzaXplQXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaXplIDwgc2l6ZUFycltpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZFNpemUgPSBzaXplQXJyW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IG51bVRvQW5kID0gaXNIaWdoID8gRGF0YVZpZXc0UmVhZC5nZXRBbmROdW0oMCwgc2l6ZSAtIDEsIHJlYWRTaXplKSA6IERhdGFWaWV3NFJlYWQuZ2V0QW5kTnVtKHJlYWRTaXplIC0gc2l6ZSwgcmVhZFNpemUgLSAxLCByZWFkU2l6ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGZbYGdldFVpbnQke3JlYWRTaXplfWBdKG9mZnNldCwgIV9zdG9yZS5pc0xlKSAmIG51bVRvQW5kO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmW2BnZXRVaW50JHtyZWFkU2l6ZX1gXShvZmZzZXQsICFfc3RvcmUuaXNMZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc3RhdGljIGdldEFuZE51bSAoYmVnaW4sIGVuZCwgc2l6ZSA9IDgpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IDA7XG4gICAgICAgIGxldCBpbmRleCA9IC0tc2l6ZTtcbiAgICAgICAgd2hpbGUgKGluZGV4ID4gMCkge1xuICAgICAgICAgICAgaWYgKGluZGV4ID4gZW5kIHx8IGluZGV4IDwgYmVnaW4pIHtcbiAgICAgICAgICAgICAgICBpbmRleC0tO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gTWF0aC5wb3coMiwgc2l6ZSAtIGluZGV4KTtcbiAgICAgICAgICAgICAgICBpbmRleC0tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59IiwiaW1wb3J0IExvZ2dlciBmcm9tICcuL0xvZyc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeHBHb2xvbWIge1xuICAgIGNvbnN0cnVjdG9yIChkYXRhKSB7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIC8vIHRoZSBudW1iZXIgb2YgYnl0ZXMgbGVmdCB0byBleGFtaW5lIGluIHRoaXMuZGF0YVxuICAgICAgICB0aGlzLmJ5dGVzQXZhaWxhYmxlID0gZGF0YS5ieXRlTGVuZ3RoO1xuICAgICAgICAvLyB0aGUgY3VycmVudCB3b3JkIGJlaW5nIGV4YW1pbmVkXG4gICAgICAgIHRoaXMud29yZCA9IDA7IC8vIDp1aW50XG4gICAgICAgIC8vIHRoZSBudW1iZXIgb2YgYml0cyBsZWZ0IHRvIGV4YW1pbmUgaW4gdGhlIGN1cnJlbnQgd29yZFxuICAgICAgICB0aGlzLmJpdHNBdmFpbGFibGUgPSAwOyAvLyA6dWludFxuICAgIH1cbiAgICAvLyAoKTp2b2lkXG4gICAgbG9hZFdvcmQgKCkge1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZGF0YSxcbiAgICAgICAgICAgIGJ5dGVzQXZhaWxhYmxlID0gdGhpcy5ieXRlc0F2YWlsYWJsZSxcbiAgICAgICAgICAgIHBvc2l0aW9uID0gZGF0YS5ieXRlTGVuZ3RoIC0gYnl0ZXNBdmFpbGFibGUsXG4gICAgICAgICAgICB3b3JraW5nQnl0ZXMgPSBuZXcgVWludDhBcnJheSg0KSxcbiAgICAgICAgICAgIGF2YWlsYWJsZUJ5dGVzID0gTWF0aC5taW4oNCwgYnl0ZXNBdmFpbGFibGUpO1xuICAgICAgICBpZiAoYXZhaWxhYmxlQnl0ZXMgPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbm8gYnl0ZXMgYXZhaWxhYmxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgd29ya2luZ0J5dGVzLnNldChkYXRhLnN1YmFycmF5KHBvc2l0aW9uLCBwb3NpdGlvbiArIGF2YWlsYWJsZUJ5dGVzKSk7XG4gICAgICAgIHRoaXMud29yZCA9IG5ldyBEYXRhVmlldyh3b3JraW5nQnl0ZXMuYnVmZmVyKS5nZXRVaW50MzIoMCk7XG4gICAgICAgIC8vIHRyYWNrIHRoZSBhbW91bnQgb2YgdGhpcy5kYXRhIHRoYXQgaGFzIGJlZW4gcHJvY2Vzc2VkXG4gICAgICAgIHRoaXMuYml0c0F2YWlsYWJsZSA9IGF2YWlsYWJsZUJ5dGVzICogODtcbiAgICAgICAgdGhpcy5ieXRlc0F2YWlsYWJsZSAtPSBhdmFpbGFibGVCeXRlcztcbiAgICB9XG5cbiAgICAvLyAoY291bnQ6aW50KTp2b2lkXG4gICAgc2tpcEJpdHMgKGNvdW50KSB7XG4gICAgICAgIHZhciBza2lwQnl0ZXM7IC8vIDppbnRcbiAgICAgICAgaWYgKHRoaXMuYml0c0F2YWlsYWJsZSA+IGNvdW50KSB7XG4gICAgICAgICAgICB0aGlzLndvcmQgPDw9IGNvdW50O1xuICAgICAgICAgICAgdGhpcy5iaXRzQXZhaWxhYmxlIC09IGNvdW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY291bnQgLT0gdGhpcy5iaXRzQXZhaWxhYmxlO1xuICAgICAgICAgICAgc2tpcEJ5dGVzID0gY291bnQgPj4gMztcbiAgICAgICAgICAgIGNvdW50IC09IChza2lwQnl0ZXMgPj4gMyk7XG4gICAgICAgICAgICB0aGlzLmJ5dGVzQXZhaWxhYmxlIC09IHNraXBCeXRlcztcbiAgICAgICAgICAgIHRoaXMubG9hZFdvcmQoKTtcbiAgICAgICAgICAgIHRoaXMud29yZCA8PD0gY291bnQ7XG4gICAgICAgICAgICB0aGlzLmJpdHNBdmFpbGFibGUgLT0gY291bnQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNraXBCeXRlcztcbiAgICB9XG5cbiAgICAvLyAoc2l6ZTppbnQpOnVpbnRcbiAgICByZWFkQml0cyAoc2l6ZSkge1xuICAgICAgICBsZXQgYml0cyA9IE1hdGgubWluKHRoaXMuYml0c0F2YWlsYWJsZSwgc2l6ZSksIC8vIDp1aW50XG4gICAgICAgICAgICB2YWx1ID0gdGhpcy53b3JkID4+PiAoMzIgLSBiaXRzKTsgLy8gOnVpbnRcbiAgICAgICAgaWYgKHNpemUgPiAzMikge1xuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKCdDYW5ub3QgcmVhZCBtb3JlIHRoYW4gMzIgYml0cyBhdCBhIHRpbWUnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJpdHNBdmFpbGFibGUgLT0gYml0cztcbiAgICAgICAgaWYgKHRoaXMuYml0c0F2YWlsYWJsZSA+IDApIHtcbiAgICAgICAgICAgIHRoaXMud29yZCA8PD0gYml0cztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmJ5dGVzQXZhaWxhYmxlID4gMCkge1xuICAgICAgICAgICAgdGhpcy5sb2FkV29yZCgpO1xuICAgICAgICB9XG4gICAgICAgIGJpdHMgPSBzaXplIC0gYml0cztcbiAgICAgICAgaWYgKGJpdHMgPiAwICYmIHRoaXMuYml0c0F2YWlsYWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHUgPDwgYml0cyB8IHRoaXMucmVhZEJpdHMoYml0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vICgpOnVpbnRcbiAgICBza2lwTFogKCkge1xuICAgICAgICB2YXIgbGVhZGluZ1plcm9Db3VudDsgLy8gOnVpbnRcbiAgICAgICAgZm9yIChsZWFkaW5nWmVyb0NvdW50ID0gMDsgbGVhZGluZ1plcm9Db3VudCA8IHRoaXMuYml0c0F2YWlsYWJsZTsgKytsZWFkaW5nWmVyb0NvdW50KSB7XG4gICAgICAgICAgICBpZiAoMCAhPT0gKHRoaXMud29yZCAmICgweDgwMDAwMDAwID4+PiBsZWFkaW5nWmVyb0NvdW50KSkpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGUgZmlyc3QgYml0IG9mIHdvcmtpbmcgd29yZCBpcyAxXG4gICAgICAgICAgICAgICAgdGhpcy53b3JkIDw8PSBsZWFkaW5nWmVyb0NvdW50O1xuICAgICAgICAgICAgICAgIHRoaXMuYml0c0F2YWlsYWJsZSAtPSBsZWFkaW5nWmVyb0NvdW50O1xuICAgICAgICAgICAgICAgIHJldHVybiBsZWFkaW5nWmVyb0NvdW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHdlIGV4aGF1c3RlZCB3b3JkIGFuZCBzdGlsbCBoYXZlIG5vdCBmb3VuZCBhIDFcbiAgICAgICAgdGhpcy5sb2FkV29yZCgpO1xuICAgICAgICByZXR1cm4gbGVhZGluZ1plcm9Db3VudCArIHRoaXMuc2tpcExaKCk7XG4gICAgfVxuXG4gICAgLy8gKCk6dm9pZFxuICAgIHNraXBVRUcgKCkge1xuICAgICAgICB0aGlzLnNraXBCaXRzKDEgKyB0aGlzLnNraXBMWigpKTtcbiAgICB9XG5cbiAgICAvLyAoKTp2b2lkXG4gICAgc2tpcEVHICgpIHtcbiAgICAgICAgdGhpcy5za2lwQml0cygxICsgdGhpcy5za2lwTFooKSk7XG4gICAgfVxuXG4gICAgLy8gKCk6dWludFxuICAgIHJlYWRVRUcgKCkge1xuICAgICAgICB2YXIgY2x6ID0gdGhpcy5za2lwTFooKTsgLy8gOnVpbnRcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZEJpdHMoY2x6ICsgMSkgLSAxO1xuICAgIH1cblxuICAgIC8vICgpOmludFxuICAgIHJlYWRFRyAoKSB7XG4gICAgICAgIHZhciB2YWx1ID0gdGhpcy5yZWFkVUVHKCk7IC8vIDppbnRcbiAgICAgICAgaWYgKDB4MDEgJiB2YWx1KSB7XG4gICAgICAgICAgICAvLyB0aGUgbnVtYmVyIGlzIG9kZCBpZiB0aGUgbG93IG9yZGVyIGJpdCBpcyBzZXRcbiAgICAgICAgICAgIHJldHVybiAoMSArIHZhbHUpID4+PiAxOyAvLyBhZGQgMSB0byBtYWtlIGl0IGV2ZW4sIGFuZCBkaXZpZGUgYnkgMlxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIC0xICogKHZhbHUgPj4+IDEpOyAvLyBkaXZpZGUgYnkgdHdvIHRoZW4gbWFrZSBpdCBuZWdhdGl2ZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gU29tZSBjb252ZW5pZW5jZSBmdW5jdGlvbnNcbiAgICAvLyA6Qm9vbGVhblxuICAgIHJlYWRCb29sZWFuICgpIHtcbiAgICAgICAgcmV0dXJuIDEgPT09IHRoaXMucmVhZEJpdHMoMSk7XG4gICAgfVxuXG4gICAgLy8gKCk6aW50XG4gICAgcmVhZFVCeXRlICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZEJpdHMoOCk7XG4gICAgfVxuXG4gICAgLy8gKCk6aW50XG4gICAgcmVhZFVTaG9ydCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWRCaXRzKDE2KTtcbiAgICB9XG4gICAgLy8gKCk6aW50XG4gICAgcmVhZFVJbnQgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkQml0cygzMik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWR2YW5jZSB0aGUgRXhwR29sb21iIGRlY29kZXIgcGFzdCBhIHNjYWxpbmcgbGlzdC4gVGhlIHNjYWxpbmdcbiAgICAgKiBsaXN0IGlzIG9wdGlvbmFsbHkgdHJhbnNtaXR0ZWQgYXMgcGFydCBvZiBhIHNlcXVlbmNlIHBhcmFtZXRlclxuICAgICAqIHNldCBhbmQgaXMgbm90IHJlbGV2YW50IHRvIHRyYW5zbXV4aW5nLlxuICAgICAqIEBwYXJhbSBjb3VudCB7bnVtYmVyfSB0aGUgbnVtYmVyIG9mIGVudHJpZXMgaW4gdGhpcyBzY2FsaW5nIGxpc3RcbiAgICAgKiBAc2VlIFJlY29tbWVuZGF0aW9uIElUVS1UIEguMjY0LCBTZWN0aW9uIDcuMy4yLjEuMS4xXG4gICAgICovXG4gICAgc2tpcFNjYWxpbmdMaXN0IChjb3VudCkge1xuICAgICAgICB2YXIgbGFzdFNjYWxlID0gOCxcbiAgICAgICAgICAgIG5leHRTY2FsZSA9IDgsXG4gICAgICAgICAgICBqLFxuICAgICAgICAgICAgZGVsdGFTY2FsZTtcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IGNvdW50OyBqKyspIHtcbiAgICAgICAgICAgIGlmIChuZXh0U2NhbGUgIT09IDApIHtcbiAgICAgICAgICAgICAgICBkZWx0YVNjYWxlID0gdGhpcy5yZWFkRUcoKTtcbiAgICAgICAgICAgICAgICBuZXh0U2NhbGUgPSAobGFzdFNjYWxlICsgZGVsdGFTY2FsZSArIDI1NikgJSAyNTY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXN0U2NhbGUgPSAobmV4dFNjYWxlID09PSAwKVxuICAgICAgICAgICAgICAgID8gbGFzdFNjYWxlXG4gICAgICAgICAgICAgICAgOiBuZXh0U2NhbGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWFkIGEgc2VxdWVuY2UgcGFyYW1ldGVyIHNldCBhbmQgcmV0dXJuIHNvbWUgaW50ZXJlc3RpbmcgdmlkZW9cbiAgICAgKiBwcm9wZXJ0aWVzLiBBIHNlcXVlbmNlIHBhcmFtZXRlciBzZXQgaXMgdGhlIEgyNjQgbWV0YWRhdGEgdGhhdFxuICAgICAqIGRlc2NyaWJlcyB0aGUgcHJvcGVydGllcyBvZiB1cGNvbWluZyB2aWRlbyBmcmFtZXMuXG4gICAgICogQHBhcmFtIGRhdGEge1VpbnQ4QXJyYXl9IHRoZSBieXRlcyBvZiBhIHNlcXVlbmNlIHBhcmFtZXRlciBzZXRcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9IGFuIG9iamVjdCB3aXRoIGNvbmZpZ3VyYXRpb24gcGFyc2VkIGZyb20gdGhlXG4gICAgICogc2VxdWVuY2UgcGFyYW1ldGVyIHNldCwgaW5jbHVkaW5nIHRoZSBkaW1lbnNpb25zIG9mIHRoZVxuICAgICAqIGFzc29jaWF0ZWQgdmlkZW8gZnJhbWVzLlxuICAgICAqL1xuICAgIHJlYWRTUFMgKCkge1xuICAgICAgICB2YXIgZnJhbWVDcm9wTGVmdE9mZnNldCA9IDAsXG4gICAgICAgICAgICBmcmFtZUNyb3BSaWdodE9mZnNldCA9IDAsXG4gICAgICAgICAgICBmcmFtZUNyb3BUb3BPZmZzZXQgPSAwLFxuICAgICAgICAgICAgZnJhbWVDcm9wQm90dG9tT2Zmc2V0ID0gMCxcbiAgICAgICAgICAgIHByb2ZpbGVJZGMsXG4gICAgICAgICAgICAvLyBwcm9maWxlQ29tcGF0LFxuICAgICAgICAgICAgbGV2ZWxJZGMsXG4gICAgICAgICAgICBjb2RlY1dpZHRoLFxuICAgICAgICAgICAgY29kZWNIZWlnaHQsXG4gICAgICAgICAgICBwcmVzZW50V2lkdGgsXG4gICAgICAgICAgICBudW1SZWZGcmFtZXNJblBpY09yZGVyQ250Q3ljbGUsXG4gICAgICAgICAgICBwaWNXaWR0aEluTWJzTWludXMxLFxuICAgICAgICAgICAgcGljSGVpZ2h0SW5NYXBVbml0c01pbnVzMSxcbiAgICAgICAgICAgIGZyYW1lTWJzT25seUZsYWcsXG4gICAgICAgICAgICBzY2FsaW5nTGlzdENvdW50LFxuICAgICAgICAgICAgaSxcbiAgICAgICAgICAgIHJlYWRVQnl0ZSA9IHRoaXMucmVhZFVCeXRlLmJpbmQodGhpcyksXG4gICAgICAgICAgICByZWFkQml0cyA9IHRoaXMucmVhZEJpdHMuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHJlYWRVRUcgPSB0aGlzLnJlYWRVRUcuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHJlYWRCb29sZWFuID0gdGhpcy5yZWFkQm9vbGVhbi5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgc2tpcEJpdHMgPSB0aGlzLnNraXBCaXRzLmJpbmQodGhpcyksXG4gICAgICAgICAgICBza2lwRUcgPSB0aGlzLnNraXBFRy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgc2tpcFVFRyA9IHRoaXMuc2tpcFVFRy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgc2tpcFNjYWxpbmdMaXN0ID0gdGhpcy5za2lwU2NhbGluZ0xpc3QuYmluZCh0aGlzKTtcblxuICAgICAgICByZWFkVUJ5dGUoKTtcbiAgICAgICAgcHJvZmlsZUlkYyA9IHJlYWRVQnl0ZSgpOyAvLyBwcm9maWxlX2lkY1xuICAgICAgICByZWFkQml0cyg1KTsgLy8gcHJvZmlsZUNvbXBhdCBjb25zdHJhaW50X3NldFswLTRdX2ZsYWcsIHUoNSlcbiAgICAgICAgc2tpcEJpdHMoMyk7IC8vIHJlc2VydmVkX3plcm9fM2JpdHMgdSgzKSxcbiAgICAgICAgbGV2ZWxJZGMgPSByZWFkVUJ5dGUoKTsgLy8gbGV2ZWxfaWRjIHUoOClcbiAgICAgICAgc2tpcFVFRygpOyAvLyBzZXFfcGFyYW1ldGVyX3NldF9pZFxuICAgICAgICBsZXQgY2hyb21hRm9ybWF0SWRjID0gMTtcbiAgICAgICAgbGV0IGNocm9tYUZvcm1hdCA9IDQyMDtcbiAgICAgICAgbGV0IGNocm9tYUZvcm1hdHMgPSBbMCwgNDIwLCA0MjIsIDQ0NF07XG4gICAgICAgIGxldCBiaXREZXB0aEx1bWEgPSA4O1xuICAgICAgICBjb25zdCBwcm9maWxlSWRjcyA9IFsxMDAsIDExMCwgMTIyLCAyNDQsIDQ0LCA4MywgODYsIDExOCwgMTI4XTtcbiAgICAgICAgLy8gc29tZSBwcm9maWxlcyBoYXZlIG1vcmUgb3B0aW9uYWwgZGF0YSB3ZSBkb24ndCBuZWVkXG4gICAgICAgIGlmIChwcm9maWxlSWRjcy5pbmNsdWRlcyhwcm9maWxlSWRjKSkge1xuICAgICAgICAgICAgY2hyb21hRm9ybWF0SWRjID0gcmVhZFVFRygpO1xuICAgICAgICAgICAgaWYgKGNocm9tYUZvcm1hdElkYyA9PT0gMykge1xuICAgICAgICAgICAgICAgIHNraXBCaXRzKDEpOyAvLyBzZXBhcmF0ZV9jb2xvdXJfcGxhbmVfZmxhZ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNocm9tYUZvcm1hdElkYyA8PSAzKSB7XG4gICAgICAgICAgICAgICAgY2hyb21hRm9ybWF0ID0gY2hyb21hRm9ybWF0c1tjaHJvbWFGb3JtYXRJZGNdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYml0RGVwdGhMdW1hID0gcmVhZFVFRygpICsgODsgLy8gYml0X2RlcHRoX2x1bWFfbWludXM4XG4gICAgICAgICAgICBza2lwVUVHKCk7IC8vIGJpdF9kZXB0aF9jaHJvbWFfbWludXM4XG4gICAgICAgICAgICBza2lwQml0cygxKTsgLy8gcXBwcmltZV95X3plcm9fdHJhbnNmb3JtX2J5cGFzc19mbGFnXG4gICAgICAgICAgICBpZiAocmVhZEJvb2xlYW4oKSkgeyAvLyBzZXFfc2NhbGluZ19tYXRyaXhfcHJlc2VudF9mbGFnXG4gICAgICAgICAgICAgICAgc2NhbGluZ0xpc3RDb3VudCA9IChjaHJvbWFGb3JtYXRJZGMgIT09IDMpXG4gICAgICAgICAgICAgICAgICAgID8gOFxuICAgICAgICAgICAgICAgICAgICA6IDEyO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzY2FsaW5nTGlzdENvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlYWRCb29sZWFuKCkpIHsgLy8gc2VxX3NjYWxpbmdfbGlzdF9wcmVzZW50X2ZsYWdbIGkgXVxuICAgICAgICAgICAgICAgICAgICAgICAgaSA8IDYgPyBza2lwU2NhbGluZ0xpc3QoMTYpIDogc2tpcFNjYWxpbmdMaXN0KDY0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBza2lwVUVHKCk7IC8vIGxvZzJfbWF4X2ZyYW1lX251bV9taW51czRcbiAgICAgICAgdmFyIHBpY09yZGVyQ250VHlwZSA9IHJlYWRVRUcoKTtcbiAgICAgICAgaWYgKHBpY09yZGVyQ250VHlwZSA9PT0gMCkge1xuICAgICAgICAgICAgcmVhZFVFRygpOyAvLyBsb2cyX21heF9waWNfb3JkZXJfY250X2xzYl9taW51czRcbiAgICAgICAgfSBlbHNlIGlmIChwaWNPcmRlckNudFR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgIHNraXBCaXRzKDEpOyAvLyBkZWx0YV9waWNfb3JkZXJfYWx3YXlzX3plcm9fZmxhZ1xuICAgICAgICAgICAgc2tpcEVHKCk7IC8vIG9mZnNldF9mb3Jfbm9uX3JlZl9waWNcbiAgICAgICAgICAgIHNraXBFRygpOyAvLyBvZmZzZXRfZm9yX3RvcF90b19ib3R0b21fZmllbGRcbiAgICAgICAgICAgIG51bVJlZkZyYW1lc0luUGljT3JkZXJDbnRDeWNsZSA9IHJlYWRVRUcoKTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBudW1SZWZGcmFtZXNJblBpY09yZGVyQ250Q3ljbGU7IGkrKykge1xuICAgICAgICAgICAgICAgIHNraXBFRygpOyAvLyBvZmZzZXRfZm9yX3JlZl9mcmFtZVsgaSBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlZkZyYW1lcyA9IHJlYWRVRUcoKTsgLy8gbWF4X251bV9yZWZfZnJhbWVzXG4gICAgICAgIHNraXBCaXRzKDEpOyAvLyBnYXBzX2luX2ZyYW1lX251bV92YWx1ZV9hbGxvd2VkX2ZsYWdcbiAgICAgICAgcGljV2lkdGhJbk1ic01pbnVzMSA9IHJlYWRVRUcoKTtcbiAgICAgICAgcGljSGVpZ2h0SW5NYXBVbml0c01pbnVzMSA9IHJlYWRVRUcoKTtcbiAgICAgICAgZnJhbWVNYnNPbmx5RmxhZyA9IHJlYWRCaXRzKDEpO1xuICAgICAgICBpZiAoZnJhbWVNYnNPbmx5RmxhZyA9PT0gMCkge1xuICAgICAgICAgICAgc2tpcEJpdHMoMSk7IC8vIG1iX2FkYXB0aXZlX2ZyYW1lX2ZpZWxkX2ZsYWdcbiAgICAgICAgfVxuICAgICAgICBza2lwQml0cygxKTsgLy8gZGlyZWN0Xzh4OF9pbmZlcmVuY2VfZmxhZ1xuICAgICAgICBpZiAocmVhZEJvb2xlYW4oKSkgeyAvLyBmcmFtZV9jcm9wcGluZ19mbGFnXG4gICAgICAgICAgICBmcmFtZUNyb3BMZWZ0T2Zmc2V0ID0gcmVhZFVFRygpO1xuICAgICAgICAgICAgZnJhbWVDcm9wUmlnaHRPZmZzZXQgPSByZWFkVUVHKCk7XG4gICAgICAgICAgICBmcmFtZUNyb3BUb3BPZmZzZXQgPSByZWFkVUVHKCk7XG4gICAgICAgICAgICBmcmFtZUNyb3BCb3R0b21PZmZzZXQgPSByZWFkVUVHKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGZyYW1lUmF0ZSA9IHtcbiAgICAgICAgICAgIGZwczogMCxcbiAgICAgICAgICAgIGZwc0ZpeGVkOiB0cnVlLFxuICAgICAgICAgICAgZnBzTnVtOiAwLFxuICAgICAgICAgICAgZnBzRGVuOiAwLFxuICAgICAgICB9O1xuICAgICAgICBsZXQgcGl4ZWxSYXRpbyA9IFsxLCAxXTtcbiAgICAgICAgaWYgKHJlYWRCb29sZWFuKCkpIHtcbiAgICAgICAgICAgIC8vIHZ1aV9wYXJhbWV0ZXJzX3ByZXNlbnRfZmxhZ1xuICAgICAgICAgICAgaWYgKHJlYWRCb29sZWFuKCkpIHtcbiAgICAgICAgICAgICAgICAvLyBhc3BlY3RfcmF0aW9faW5mb19wcmVzZW50X2ZsYWdcbiAgICAgICAgICAgICAgICBjb25zdCBhc3BlY3RSYXRpb0lkYyA9IHJlYWRVQnl0ZSgpO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoYXNwZWN0UmF0aW9JZGMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcGl4ZWxSYXRpbyA9IFsxLCAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBwaXhlbFJhdGlvID0gWzEyLCAxMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgcGl4ZWxSYXRpbyA9IFsxMCwgMTFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpeGVsUmF0aW8gPSBbMTYsIDExXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICBwaXhlbFJhdGlvID0gWzQwLCAzM107XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICAgICAgcGl4ZWxSYXRpbyA9IFsyNCwgMTFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpeGVsUmF0aW8gPSBbMjAsIDExXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgICAgICAgICBwaXhlbFJhdGlvID0gWzMyLCAxMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgICAgICAgICAgICAgcGl4ZWxSYXRpbyA9IFs4MCwgMzNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgICAgICAgICAgICBwaXhlbFJhdGlvID0gWzE4LCAxMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpeGVsUmF0aW8gPSBbMTUsIDExXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDEyOlxuICAgICAgICAgICAgICAgICAgICAgICAgcGl4ZWxSYXRpbyA9IFs2NCwgMzNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTM6XG4gICAgICAgICAgICAgICAgICAgICAgICBwaXhlbFJhdGlvID0gWzE2MCwgOTldO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBwaXhlbFJhdGlvID0gWzQsIDNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTU6XG4gICAgICAgICAgICAgICAgICAgICAgICBwaXhlbFJhdGlvID0gWzMsIDJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTY6XG4gICAgICAgICAgICAgICAgICAgICAgICBwaXhlbFJhdGlvID0gWzIsIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjU1OlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwaXhlbFJhdGlvID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRVQnl0ZSgpIDw8IDggfCByZWFkVUJ5dGUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFkVUJ5dGUoKSA8PCA4IHwgcmVhZFVCeXRlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVhZEJvb2xlYW4oKSkgeyAvLyBvdmVyc2Nhbl9pbmZvX3ByZXNlbnRfZmxhZ1xuICAgICAgICAgICAgICAgIHJlYWRCb29sZWFuKCk7IC8vIG92ZXJzY2FuX2FwcHJvcHJpYXRlX2ZsYWdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZWFkQm9vbGVhbigpKSB7IC8vIHZpZGVvX3NpZ25hbF90eXBlX3ByZXNlbnRfZmxhZ1xuICAgICAgICAgICAgICAgIHJlYWRCaXRzKDQpOyAvLyB2aWRlb19mb3JtYXQgJiB2aWRlb19mdWxsX3JhbmdlX2ZsYWdcbiAgICAgICAgICAgICAgICBpZiAocmVhZEJvb2xlYW4oKSkgeyAvLyBjb2xvdXJfZGVzY3JpcHRpb25fcHJlc2VudF9mbGFnXG4gICAgICAgICAgICAgICAgICAgIHJlYWRCaXRzKDI0KTsgLy8gY29sb3VyX3ByaW1hcmllcyAmIHRyYW5zZmVyX2NoYXJhY3RlcmlzdGljcyAmIG1hdHJpeF9jb2VmZmljaWVudHNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVhZEJvb2xlYW4oKSkgeyAvLyBjaHJvbWFfbG9jX2luZm9fcHJlc2VudF9mbGFnXG4gICAgICAgICAgICAgICAgcmVhZFVFRygpOyAvLyBjaHJvbWFfc2FtcGxlX2xvY190eXBlX3RvcF9maWVsZFxuICAgICAgICAgICAgICAgIHJlYWRVRUcoKTsgLy8gY2hyb21hX3NhbXBsZV9sb2NfdHlwZV9ib3R0b21fZmllbGRcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJlYWRCb29sZWFuKCkpIHsgLy8gdGltaW5nX2luZm9fcHJlc2VudF9mbGFnXG4gICAgICAgICAgICAgICAgY29uc3QgbnVtVW5pdEluVGljayA9IChyZWFkQml0cygzMikpO1xuICAgICAgICAgICAgICAgIGZyYW1lUmF0ZS5mcHNOdW0gPSAocmVhZEJpdHMoMzIpKTtcbiAgICAgICAgICAgICAgICBmcmFtZVJhdGUuZml4ZWQgPSB0aGlzLnJlYWRCb29sZWFuKCk7XG4gICAgICAgICAgICAgICAgZnJhbWVSYXRlLmZwc0RlbiA9IG51bVVuaXRJblRpY2sgKiAyO1xuICAgICAgICAgICAgICAgIGZyYW1lUmF0ZS5mcHMgPSBmcmFtZVJhdGUuZnBzTnVtIC8gZnJhbWVSYXRlLmZwc0RlbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBjcm9wVW5pdFggPSAwLCBjcm9wVW5pdFkgPSAwO1xuICAgICAgICAgICAgaWYgKGNocm9tYUZvcm1hdElkYyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGNyb3BVbml0WCA9IDE7XG4gICAgICAgICAgICAgICAgY3JvcFVuaXRYID0gMiAtIGZyYW1lTWJzT25seUZsYWc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBzdWJXYyA9IGNocm9tYUZvcm1hdElkYyA9PT0gMyA/IDEgOiAyO1xuICAgICAgICAgICAgICAgIGxldCBzdWJIYyA9IGNocm9tYUZvcm1hdElkYyA9PT0gMSA/IDIgOiAxO1xuICAgICAgICAgICAgICAgIGNyb3BVbml0WCA9IHN1YldjO1xuICAgICAgICAgICAgICAgIGNyb3BVbml0WSA9IHN1YkhjICogKDIgLSBmcmFtZU1ic09ubHlGbGFnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29kZWNXaWR0aCA9IChwaWNXaWR0aEluTWJzTWludXMxICsgMSkgKiAxNjtcbiAgICAgICAgICAgIGNvZGVjSGVpZ2h0ID0gKDIgLSBmcmFtZU1ic09ubHlGbGFnKSAqICgocGljSGVpZ2h0SW5NYXBVbml0c01pbnVzMSArIDEpICogMTYpO1xuXG4gICAgICAgICAgICBjb2RlY1dpZHRoIC09IChmcmFtZUNyb3BMZWZ0T2Zmc2V0ICsgZnJhbWVDcm9wUmlnaHRPZmZzZXQpICogY3JvcFVuaXRYO1xuICAgICAgICAgICAgY29kZWNIZWlnaHQgLT0gKGZyYW1lQ3JvcFRvcE9mZnNldCArIGZyYW1lQ3JvcEJvdHRvbU9mZnNldCkgKiBjcm9wVW5pdFk7XG5cbiAgICAgICAgICAgIGNvbnN0IHBpeGVsU2NhbGUgPSBwaXhlbFJhdGlvWzBdID09PSAxIHx8IHBpeGVsUmF0aW9bMV0gPT09IDFcbiAgICAgICAgICAgICAgICA/IDFcbiAgICAgICAgICAgICAgICA6IHBpeGVsUmF0aW9bMF0gLyBwaXhlbFJhdGlvWzFdO1xuXG4gICAgICAgICAgICBwcmVzZW50V2lkdGggPSBwaXhlbFNjYWxlICogY29kZWNXaWR0aDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcHJvZmlsZUlkYyxcbiAgICAgICAgICAgIGxldmVsSWRjLFxuICAgICAgICAgICAgcmVmRnJhbWVzLFxuICAgICAgICAgICAgY2hyb21hRm9ybWF0LFxuICAgICAgICAgICAgYml0RGVwdGg6IGJpdERlcHRoTHVtYSxcbiAgICAgICAgICAgIGZyYW1lUmF0ZSxcbiAgICAgICAgICAgIGNvZGVjU2l6ZToge1xuICAgICAgICAgICAgICAgIHdpZHRoOiBjb2RlY1dpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodDogY29kZWNIZWlnaHQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJlc2VudFNpemU6IHtcbiAgICAgICAgICAgICAgICB3aWR0aDogcHJlc2VudFdpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodDogY29kZWNIZWlnaHQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgd2lkdGg6IE1hdGguY2VpbCgoKChwaWNXaWR0aEluTWJzTWludXMxICsgMSkgKiAxNikgLSBmcmFtZUNyb3BMZWZ0T2Zmc2V0ICogMiAtIGZyYW1lQ3JvcFJpZ2h0T2Zmc2V0ICogMikpLFxuICAgICAgICAgICAgaGVpZ2h0OiAoKDIgLSBmcmFtZU1ic09ubHlGbGFnKSAqIChwaWNIZWlnaHRJbk1hcFVuaXRzTWludXMxICsgMSkgKiAxNikgLSAoKFxuICAgICAgICAgICAgICAgIGZyYW1lTWJzT25seUZsYWdcbiAgICAgICAgICAgICAgICAgICAgPyAyXG4gICAgICAgICAgICAgICAgICAgIDogNCkgKiAoZnJhbWVDcm9wVG9wT2Zmc2V0ICsgZnJhbWVDcm9wQm90dG9tT2Zmc2V0KSksXG4gICAgICAgICAgICBwaXhlbFJhdGlvOiBwaXhlbFJhdGlvLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlYWRTbGljZVR5cGUgKCkge1xuICAgICAgICAvLyBza2lwIE5BTHUgdHlwZVxuICAgICAgICB0aGlzLnJlYWRVQnl0ZSgpO1xuICAgICAgICAvLyBkaXNjYXJkIGZpcnN0X21iX2luX3NsaWNlXG4gICAgICAgIHRoaXMucmVhZFVFRygpO1xuICAgICAgICAvLyByZXR1cm4gc2xpY2VfdHlwZVxuICAgICAgICByZXR1cm4gdGhpcy5yZWFkVUVHKCk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9nZ2VyIHtcbiAgICBzdGF0aWMgbG9nICguLi5hcmdzKSB7XG4gICAgICAgIHdpbmRvdy5jb25zb2xlLmxvZy5hcHBseSh3aW5kb3csIGFyZ3MpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpbmZvICguLi5hcmdzKSB7XG4gICAgICAgIHdpbmRvdy5jb25zb2xlLmluZm8uYXBwbHkod2luZG93LCBhcmdzKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXJyb3IgKC4uLmFyZ3MpIHtcbiAgICAgICAgd2luZG93LmNvbnNvbGUuZXJyb3IuYXBwbHkod2luZG93LCBhcmdzKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgd2FybiAoLi4uYXJncykge1xuICAgICAgICB3aW5kb3cuY29uc29sZS53YXJuLmFwcGx5KHdpbmRvdywgYXJncyk7XG4gICAgfVxufVxuIiwiLyoqXG4gKiBAYXV0aG9yIGZ1eXVoYW9cbiAqL1xuXG5jb25zdCBuYXRpdmVTbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZVxuXG5jbGFzcyBPYnNlcnZlciB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLmZuSWQgPSAxXG4gICAgdGhpcy5fbGlzdGVuZXJJZE1hcCA9IHt9XG4gICAgdGhpcy5fbGlzdGVuZXJzID0ge31cbiAgfVxuICBvbiAoa2V5LCBmbikge1xuICAgIGNvbnN0IGZuSWQgPSB0aGlzLmZuSWQrK1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2dldExpc3RlbmVyc0J5S2V5KGtleSlcbiAgICB0aGlzLl9saXN0ZW5lcklkTWFwW2ZuSWRdID0gZm5cbiAgICBpZiAobGlzdGVuZXJzKSB7XG4gICAgICBsaXN0ZW5lcnMudW5zaGlmdChmbklkKVxuICAgICAgcmV0dXJuIGZuSWRcbiAgICB9XG4gICAgdGhpcy5fbGlzdGVuZXJzW2tleV0gPSBbZm5JZF1cbiAgICByZXR1cm4gZm5JZFxuICB9XG4gIGVtaXQgKGtleSkge1xuICAgIGNvbnN0IGFyZ3MgPSBuYXRpdmVTbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9nZXRMaXN0ZW5lcnNCeUtleShrZXkpIHx8IFtdXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgZm4gPSB0aGlzLl9nZXRMaXN0ZW5lckJ5SWQobGlzdGVuZXJzW2ldKVxuICAgICAgZm4gJiYgZm4uYXBwbHkobnVsbCwgYXJncylcbiAgICB9XG4gIH1cbiAgb25jZSAoa2V5LCBmbikge1xuICAgIGNvbnN0IGZuSWQgPSB0aGlzLmZuSWQrK1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2dldExpc3RlbmVyc0J5S2V5KGtleSlcbiAgICBjb25zdCBfdGhpcyA9IHRoaXNcblxuICAgIGZ1bmN0aW9uIG9uY2VGdW5jICgpIHtcbiAgICAgIGNvbnN0IGFyZ3MgPSBuYXRpdmVTbGljZS5jYWxsKGFyZ3VtZW50cylcbiAgICAgIGZuLmFwcGx5KG51bGwsIGFyZ3MpXG4gICAgICBfdGhpcy5vZmYoa2V5LCBmbklkKVxuICAgIH1cbiAgICB0aGlzLl9saXN0ZW5lcklkTWFwW2ZuSWRdID0gb25jZUZ1bmNcbiAgICBpZiAobGlzdGVuZXJzKSB7XG4gICAgICBsaXN0ZW5lcnMudW5zaGlmdChmbklkKVxuICAgICAgcmV0dXJuIGZuSWRcbiAgICB9XG4gICAgdGhpcy5fbGlzdGVuZXJzW2tleV0gPSBbZm5JZF1cbiAgICByZXR1cm4gZm5JZFxuICB9XG4gIG9mZiAoa2V5LCBmbklkKSB7XG4gICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fZ2V0TGlzdGVuZXJzQnlLZXkoa2V5KVxuICAgIGNvbnN0IGZuID0gdGhpcy5fZ2V0TGlzdGVuZXJCeUlkKGZuSWQpXG4gICAgaWYgKCFmbiB8fCAhbGlzdGVuZXJzIHx8IGxpc3RlbmVycy5pbmRleE9mKGZuSWQpIDwgMCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGRlbGV0ZSB0aGlzLl9saXN0ZW5lcklkTWFwW2ZuSWRdXG4gICAgaWYgKGxpc3RlbmVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLl9saXN0ZW5lcnNba2V5XVxuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0ZW5lcnNbbGlzdGVuZXJzLmluZGV4T2YoZm5JZCldID0gdW5kZWZpbmVkXG4gICAgfVxuICB9XG4gIF9nZXRMaXN0ZW5lcnNCeUtleSAoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyc1trZXldXG4gIH1cbiAgX2dldExpc3RlbmVyQnlJZCAoZm5JZCkge1xuICAgIHJldHVybiB0aGlzLl9saXN0ZW5lcklkTWFwW2ZuSWRdXG4gIH1cbiAgZmx1c2ggKGtleSkge1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2dldExpc3RlbmVyc0J5S2V5KGtleSlcbiAgICBpZiAobGlzdGVuZXJzKSB7XG4gICAgICBsaXN0ZW5lcnMuZm9yRWFjaChmbklkID0+IHtcbiAgICAgICAgZGVsZXRlIHRoaXMuX2xpc3RlbmVySWRNYXBbZm5JZF1cbiAgICAgIH0pXG4gICAgICBkZWxldGUgdGhpcy5fbGlzdGVuZXJzW2tleV1cbiAgICB9XG4gIH1cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5fbGlzdGVuZXJzID0gbnVsbFxuICAgIHRoaXMuX2xpc3RlbmVySWRNYXAgPSBudWxsXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IE9ic2VydmVyKClcbiIsIi8qIGVzbGludC1kaXNhYmxlICovXG5jbGFzcyBVVEY4IHtcbiAgICBzdGF0aWMgZGVjb2RlKHVpbnQ4YXJyYXkpIHtcbiAgICAgICAgY29uc3Qgb3V0ID0gW107XG4gICAgICAgIGNvbnN0IGlucHV0ID0gdWludDhhcnJheTtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBjb25zdCBsZW5ndGggPSB1aW50OGFycmF5Lmxlbmd0aDtcblxuICAgICAgICB3aGlsZSAoaSA8IGxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGlucHV0W2ldIDwgMHg4MCkge1xuICAgICAgICAgICAgICAgIG91dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoaW5wdXRbaV0pKTtcbiAgICAgICAgICAgICAgICArK2k7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlucHV0W2ldIDwgMHhDMCkge1xuICAgICAgICAgICAgICAgIC8vIGZhbGx0aHJvdWdoXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlucHV0W2ldIDwgMHhFMCkge1xuICAgICAgICAgICAgICAgIGlmIChVVEY4Ll9jaGVja0NvbnRpbnVhdGlvbihpbnB1dCwgaSwgMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdWNzNCA9IChpbnB1dFtpXSAmIDB4MUYpIDw8IDYgfCAoaW5wdXRbaSArIDFdICYgMHgzRik7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1Y3M0ID49IDB4ODApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUodWNzNCAmIDB4RkZGRikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaSArPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlucHV0W2ldIDwgMHhGMCkge1xuICAgICAgICAgICAgICAgIGlmIChVVEY4Ll9jaGVja0NvbnRpbnVhdGlvbihpbnB1dCwgaSwgMikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdWNzNCA9IChpbnB1dFtpXSAmIDB4RikgPDwgMTIgfCAoaW5wdXRbaSArIDFdICYgMHgzRikgPDwgNiB8IGlucHV0W2kgKyAyXSAmIDB4M0Y7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1Y3M0ID49IDB4ODAwICYmICh1Y3M0ICYgMHhGODAwKSAhPT0gMHhEODAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKHVjczQgJiAweEZGRkYpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gMztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChpbnB1dFtpXSA8IDB4RjgpIHtcbiAgICAgICAgICAgICAgICBpZiAoVVRGOC5fY2hlY2tDb250aW51YXRpb24oaW5wdXQsIGksIDMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB1Y3M0ID0gKGlucHV0W2ldICYgMHg3KSA8PCAxOCB8IChpbnB1dFtpICsgMV0gJiAweDNGKSA8PCAxMiB8XG4gICAgICAgICAgICAgICAgICAgICAgICAoaW5wdXRbaSArIDJdICYgMHgzRikgPDwgNiB8IChpbnB1dFtpICsgM10gJiAweDNGKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVjczQgPiAweDEwMDAwICYmIHVjczQgPCAweDExMDAwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdWNzNCAtPSAweDEwMDAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgodWNzNCA+Pj4gMTApIHwgMHhEODAwKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKCh1Y3M0ICYgMHgzRkYpIHwgMHhEQzAwKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpICs9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG91dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoMHhGRkZEKSk7XG4gICAgICAgICAgICArK2k7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb3V0LmpvaW4oJycpO1xuICAgIH1cblxuICAgIHN0YXRpYyBfY2hlY2tDb250aW51YXRpb24odWludDhhcnJheSwgc3RhcnQsIGNoZWNrTGVuZ3RoKSB7XG4gICAgICAgIGxldCBhcnJheSA9IHVpbnQ4YXJyYXk7XG4gICAgICAgIGlmIChzdGFydCArIGNoZWNrTGVuZ3RoIDwgYXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICB3aGlsZSAoY2hlY2tMZW5ndGgtLSkge1xuICAgICAgICAgICAgICAgIGlmICgoYXJyYXlbKytzdGFydF0gJiAweEMwKSAhPT0gMHg4MClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFVURjg7IiwiZXhwb3J0IGZ1bmN0aW9uIGRlYm91bmNlIChmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgICB2YXIgdGltZW91dCwgcmVzdWx0O1xuXG5cbiAgICB2YXIgZGVib3VuY2VkID0gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgaWYgKHRpbWVvdXQpIHsgY2xlYXJUaW1lb3V0KHRpbWVvdXQpOyB9XG4gICAgICAgIGlmIChpbW1lZGlhdGUpIHtcbiAgICAgICAgICAgIHZhciBjYWxsTm93ID0gIXRpbWVvdXQ7XG4gICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jLCB3YWl0KTtcbiAgICAgICAgICAgIGlmIChjYWxsTm93KSB7IHJlc3VsdCA9IGZ1bmMoKTsgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuYywgd2FpdCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cbiAgICBkZWJvdW5jZWQuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgIH07XG5cbiAgICByZXR1cm4gZGVib3VuY2VkO1xuXG59XG5cbmV4cG9ydCBjb25zdCBjYWNoZVdyYXBwZXIgPSAoZm4pID0+IHtcblxuICAgIGNvbnN0IGNhY2hlID0ge307XG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IGFyZ3MucmVkdWNlKChwcmUsIGN1cikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGAke3ByZX1fJHtjdXJ9YDtcbiAgICAgICAgfSwgJycpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSBmbiguLi5hcmdzKTtcbiAgICAgICAgaWYgKGNhY2hlW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNhY2hlW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZVtrZXldID0gcmVzdWx0O1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH07XG59OyIsImNvbnN0IGxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBidWYgPSBuZXcgQXJyYXlCdWZmZXIoMik7XG4gICAgKG5ldyBEYXRhVmlldyhidWYpKS5zZXRJbnQxNigwLCAyNTYsIHRydWUpIC8vIGxpdHRsZS1lbmRpYW4gd3JpdGVcbiAgICByZXR1cm4gKG5ldyBJbnQxNkFycmF5KGJ1ZikpWzBdID09PSAyNTYgLy8gcGxhdGZvcm0tc3BlYyByZWFkLCBpZiBlcXVhbCB0aGVuIExFXG59KSgpXG5jb25zdCBzbmlmZmVyID0ge1xuICAgIGdldCBkZXZpY2UgKCkge1xuICAgICAgICBsZXQgciA9IHNuaWZmZXIub3M7XG4gICAgICAgIHJldHVybiByLmlzUGMgPyAncGMnIDogci5pc1RhYmxldCA/ICd0YWJsZXQnIDogJ21vYmlsZSc7XG4gICAgfSxcbiAgICBnZXQgYnJvd3NlciAoKSB7XG4gICAgICAgIGxldCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgbGV0IHJlZyA9IHtcbiAgICAgICAgICAgIGllOiAvcnY6KFtcXGQuXSspXFwpIGxpa2UgZ2Vja28vLFxuICAgICAgICAgICAgZmlyZm94OiAvZmlyZWZveFxcLyhbXFxkLl0rKS8sXG4gICAgICAgICAgICBjaHJvbWU6IC9jaHJvbWVcXC8oW1xcZC5dKykvLFxuICAgICAgICAgICAgb3BlcmE6IC9vcGVyYS4oW1xcZC5dKykvLFxuICAgICAgICAgICAgc2FmYXJpOiAvdmVyc2lvblxcLyhbXFxkLl0rKS4qc2FmYXJpLyxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFtdLmNvbmNhdChPYmplY3Qua2V5cyhyZWcpLmZpbHRlcihrZXkgPT4gcmVnW2tleV0udGVzdCh1YSkpKVswXTtcbiAgICB9LFxuICAgIGdldCBvcyAoKSB7XG4gICAgICAgIGxldCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQsXG4gICAgICAgICAgICBpc1dpbmRvd3NQaG9uZSA9IC8oPzpXaW5kb3dzIFBob25lKS8udGVzdCh1YSksXG4gICAgICAgICAgICBpc1N5bWJpYW4gPSAvKD86U3ltYmlhbk9TKS8udGVzdCh1YSkgfHwgaXNXaW5kb3dzUGhvbmUsXG4gICAgICAgICAgICBpc0FuZHJvaWQgPSAvKD86QW5kcm9pZCkvLnRlc3QodWEpLFxuICAgICAgICAgICAgaXNGaXJlRm94ID0gLyg/OkZpcmVmb3gpLy50ZXN0KHVhKSxcbiAgICAgICAgICAgIGlzVGFibGV0ID0gLyg/OmlQYWR8UGxheUJvb2spLy50ZXN0KHVhKSB8fCAoaXNBbmRyb2lkICYmICEvKD86TW9iaWxlKS8udGVzdCh1YSkpIHx8IChpc0ZpcmVGb3ggJiYgLyg/OlRhYmxldCkvLnRlc3QodWEpKSxcbiAgICAgICAgICAgIGlzUGhvbmUgPSAvKD86aVBob25lKS8udGVzdCh1YSkgJiYgIWlzVGFibGV0LFxuICAgICAgICAgICAgaXNQYyA9ICFpc1Bob25lICYmICFpc0FuZHJvaWQgJiYgIWlzU3ltYmlhbjtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGlzVGFibGV0LFxuICAgICAgICAgICAgaXNQaG9uZSxcbiAgICAgICAgICAgIGlzQW5kcm9pZCxcbiAgICAgICAgICAgIGlzUGMsXG4gICAgICAgICAgICBpc1N5bWJpYW4sXG4gICAgICAgICAgICBpc1dpbmRvd3NQaG9uZSxcbiAgICAgICAgICAgIGlzRmlyZUZveCxcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldCBpc0xlKCkge1xuICAgICAgICByZXR1cm4gbGVcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBzbmlmZmVyO1xuIiwiaW1wb3J0IENvbmNhdCBmcm9tICdjb25jYXQtdHlwZWQtYXJyYXknO1xuaW1wb3J0IExvZ2dlciBmcm9tICcuLi91dGlscy9Mb2cnO1xuY2xhc3MgQnVmZmVyIHtcbiAgICBjb25zdHJ1Y3RvciAoYnVmZmVyKSB7XG4gICAgICAgIHRoaXMuYnVmZmVyID0gYnVmZmVyIHx8IG5ldyBVaW50OEFycmF5KDApO1xuICAgIH1cbiAgICB3cml0ZSAoLi4uYnVmZmVyKSB7XG4gICAgICAgIGJ1ZmZlci5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlciA9IENvbmNhdChVaW50OEFycmF5LCB0aGlzLmJ1ZmZlciwgaXRlbSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIExvZ2dlci5lcnJvcihpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyB3cml0ZVVpbnQzMiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KFtcbiAgICAgICAgICAgIHZhbHVlID4+IDI0LFxuICAgICAgICAgICAgKHZhbHVlID4+IDE2KSAmIDB4ZmYsXG4gICAgICAgICAgICAodmFsdWUgPj4gOCkgJiAweGZmLFxuICAgICAgICAgICAgdmFsdWUgJiAweGZmLFxuICAgICAgICBdKTtcbiAgICB9XG4gICAgc3RhdGljIHJlYWRBc0ludCAoYXJyKSB7XG4gICAgICAgIGxldCB0ZW1wID0gJyc7XG4gICAgICAgIGZ1bmN0aW9uIHBhZFN0YXJ0NEhleCAoaGV4TnVtKSB7XG4gICAgICAgICAgICBsZXQgaGV4U3RyID0gaGV4TnVtLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgICAgIHJldHVybiBoZXhTdHIucGFkU3RhcnQoMiwgJzAnKTtcbiAgICAgICAgfVxuICAgICAgICBhcnIuZm9yRWFjaChudW0gPT4ge1xuICAgICAgICAgICAgdGVtcCArPSBwYWRTdGFydDRIZXgobnVtKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwYXJzZUludCh0ZW1wLCAxNik7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCdWZmZXI7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfeGdwbGF5ZXJfXzsiXSwic291cmNlUm9vdCI6IiJ9