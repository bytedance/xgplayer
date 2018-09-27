window["FlvPlayer"] =
/******/ (function(modules) { // webpackBootstrap
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
        if (_this._options.isLive) {
          return;
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
      0x61, 0x76, 0x63, 0x31 // avc1
      ]));
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
      0xFF, 0xFF, 0xFF, 0xFF // next_track_ID 下一个track使用的id号
      ]);
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
      duration >> 24 & 0xff, duration >> 16 & 0xff, duration >> 8 & 0xff, duration & 0xff, mediaTime >> 24 & 0xff, mediaTime >> 16 & 0xff, mediaTime >> 8 & 0xff, mediaTime & 0xff, 0x00, 0x00, 0x00, 0x01 // media rate
      ]));
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
      0x00, 0x00 // pre_defined = 0
      ]);
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
      0x56, 0x69, 0x64, 0x65, 0x6f, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x00 // name: 'VideoHandler'
      ];
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
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00 // opcolor
      ]));
    }
  }, {
    key: 'smhd',
    value: function smhd() {
      return FMP4.initBox(16, 'smhd', new Uint8Array([0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, // balance
      0x00, 0x00 // reserved
      ]));
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
      0x00, 0x00, 0x01 // entry_flags
      ];
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

      0x05 // descriptor_type
      ].concat([configlen]).concat(config).concat([0x06, 0x01, 0x02]));
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
      0xfc | 3, 0xE0 | 1 // 目前只处理一个sps
      ].concat([sps.length >>> 8 & 0xff, sps.length & 0xff])));
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
      0x00, 0x2d, 0xc6, 0xc0 // avgBitrate
      ]);
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
      0x00, 0x00, 0x00, 0x00 // entry_count
      ]);
      return FMP4.initBox(16, 'stts', content);
    }
  }, {
    key: 'stsc',
    value: function stsc() {
      var content = new Uint8Array([0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00 // entry_count
      ]);
      return FMP4.initBox(16, 'stsc', content);
    }
  }, {
    key: 'stco',
    value: function stco() {
      var content = new Uint8Array([0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00 // entry_count
      ]);
      return FMP4.initBox(16, 'stco', content);
    }
  }, {
    key: 'stsz',
    value: function stsz() {
      var content = new Uint8Array([0x00, // version
      0x00, 0x00, 0x00, // flags
      0x00, 0x00, 0x00, 0x00, // sample_size
      0x00, 0x00, 0x00, 0x00 // sample_count
      ]);
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
      0x00, 0x01, 0x00, 0x01 // default_sample_flags
      ]);
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
        console.log(item.duration);
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
            if (this._videoSegmentList.isEmpty()) {
              dtsCorrection = 0;
            } else {
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
            if (this._audioSegmentList.isEmpty()) {
              dtsCorrection = 0;
            } else {
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
/*!*************************!*\
  !*** external "Player" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["Player"]; }());

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9GbHZQbGF5ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vbm9kZV9tb2R1bGVzL2NvbmNhdC10eXBlZC1hcnJheS9saWIvY29uY2F0LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL25vZGVfbW9kdWxlcy9jb25jYXQtdHlwZWQtYXJyYXkvbGliL2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL25vZGVfbW9kdWxlcy9kL2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL25vZGVfbW9kdWxlcy9lczUtZXh0L2Z1bmN0aW9uL25vb3AuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2Fzc2lnbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvYXNzaWduL2lzLWltcGxlbWVudGVkLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9hc3NpZ24vc2hpbS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvaXMtY2FsbGFibGUuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L2lzLXZhbHVlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9rZXlzL2luZGV4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9rZXlzL2lzLWltcGxlbWVudGVkLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC9rZXlzL3NoaW0uanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvb2JqZWN0L25vcm1hbGl6ZS1vcHRpb25zLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL25vZGVfbW9kdWxlcy9lczUtZXh0L29iamVjdC92YWxpZC1jYWxsYWJsZS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9ub2RlX21vZHVsZXMvZXM1LWV4dC9vYmplY3QvdmFsaWQtdmFsdWUuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvaXMtaW1wbGVtZW50ZWQuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vbm9kZV9tb2R1bGVzL2VzNS1leHQvc3RyaW5nLyMvY29udGFpbnMvc2hpbS5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9ub2RlX21vZHVsZXMvZXZlbnQtZW1pdHRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9zcmMvRmx2LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy9jb25zdGFudHMvY29uZmlnLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy9jb25zdGFudHMvbWV0YUZpZWxkcy5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9zcmMvY29uc3RhbnRzL3R5cGVzLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9zcmMvbW9kZWxzL01lZGlhSW5mby5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9zcmMvbW9kZWxzL01lZGlhU2FtcGxlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy9tb2RlbHMvTWVkaWFTZWdtZW50LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy9tb2RlbHMvTWVkaWFTZWdtZW50TGlzdC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9zcmMvbW9kZWxzL1N0b3JlLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy9tb2RlbHMvVGFnLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy9tb2RlbHMvZXJyb3IuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL3BhcnNlL0ZsdlBhcnNlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9zcmMvcGFyc2UvTVNFLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy9wYXJzZS9NYWluUGFyc2VyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy9wYXJzZS9TUFNQYXJzZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL3BhcnNlL1RyYW5zQ29kZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL3BhcnNlL2RlbXV4L0F1ZGlvRGVtdXhlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9zcmMvcGFyc2UvZGVtdXgvRGVtdXhlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9zcmMvcGFyc2UvZGVtdXgvTWV0YURlbXV4ZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL3BhcnNlL2RlbXV4L1RhZ0RlbXV4ZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL3BhcnNlL2RlbXV4L1ZpZGVvRGVtdXhlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9zcmMvcGFyc2UvcmVtdXgvRm1wNC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9zcmMvcGFyc2UvcmVtdXgvTXA0cmVtdXguanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL3BhcnNlL3JlbXV4L1JlbXV4ZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL3Rhc2tzL0xpdmVUYXNrLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy90YXNrcy9Wb2RUYXNrLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy90YXNrcy9sb2FkZXJzL0ZldGNoTG9hZGVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy90YXNrcy9sb2FkZXJzL1hIUkxvYWRlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9zcmMvdXRpbHMvRGF0YVZpZXc0UmVhZC5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvLi9zcmMvdXRpbHMvRXhwR29sb21iLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy91dGlscy9Mb2cuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL3V0aWxzL09ic2VydmVyLmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy91dGlscy9VVEY4LmpzIiwid2VicGFjazovL0ZsdlBsYXllci8uL3NyYy91dGlscy9mdW5jVXRpbHMuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL3V0aWxzL3NuaWZmZXIuanMiLCJ3ZWJwYWNrOi8vRmx2UGxheWVyLy4vc3JjL3dyaXRlL0J1ZmZlci5qcyIsIndlYnBhY2s6Ly9GbHZQbGF5ZXIvZXh0ZXJuYWwgXCJQbGF5ZXJcIiJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsImRlZmF1bHQiLCJSZXN1bHRDb25zdHJ1Y3RvciIsInRvdGFsTGVuZ3RoIiwiX2xlbiIsImFyZ3VtZW50cyIsImxlbmd0aCIsImFycmF5cyIsIkFycmF5IiwiX2tleSIsIl9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24iLCJfZGlkSXRlcmF0b3JFcnJvciIsIl9pdGVyYXRvckVycm9yIiwidW5kZWZpbmVkIiwiX2l0ZXJhdG9yIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJfc3RlcCIsIm5leHQiLCJkb25lIiwiYXJyIiwiZXJyIiwicmV0dXJuIiwicmVzdWx0Iiwib2Zmc2V0IiwiX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIiLCJfZGlkSXRlcmF0b3JFcnJvcjIiLCJfaXRlcmF0b3JFcnJvcjIiLCJfaXRlcmF0b3IyIiwiX3N0ZXAyIiwiX2FyciIsInNldCIsIl9jb25jYXQiLCJyZXF1aXJlIiwiX2NvbmNhdDIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib2JqIiwiX19lc01vZHVsZSIsIm1vZHVsZSIsImFzc2lnbiIsIm5vcm1hbGl6ZU9wdHMiLCJpc0NhbGxhYmxlIiwiY29udGFpbnMiLCJkIiwiZHNjciIsImMiLCJlIiwidyIsIm9wdGlvbnMiLCJkZXNjIiwiY2FsbCIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJ3cml0YWJsZSIsImdzIiwiZ2V0IiwiZm9vIiwiYmFyIiwidHJ6eSIsImtleXMiLCJtYXgiLCJNYXRoIiwiZGVzdCIsInNyYyIsImVycm9yIiwiaSIsImtleSIsImZvckVhY2giLCJfdW5kZWZpbmVkIiwidmFsIiwiaXNWYWx1ZSIsIm9iamVjdCIsInByb3RvdHlwZSIsImNyZWF0ZSIsInByb2Nlc3MiLCJvcHRzMSIsImZuIiwiVHlwZUVycm9yIiwiU3RyaW5nIiwic3RyIiwiaW5kZXhPZiIsInNlYXJjaFN0cmluZyIsImNhbGxhYmxlIiwiYXBwbHkiLCJGdW5jdGlvbiIsImRlZmluZVByb3BlcnRpZXMiLCJoYXNPd25Qcm9wZXJ0eSIsImRlc2NyaXB0b3IiLCJvbiIsIm9uY2UiLCJvZmYiLCJlbWl0IiwibWV0aG9kcyIsImRlc2NyaXB0b3JzIiwiYmFzZSIsInR5cGUiLCJsaXN0ZW5lciIsImRhdGEiLCJfX2VlX18iLCJwdXNoIiwic2VsZiIsIl9fZWVPbmNlTGlzdGVuZXJfXyIsImxpc3RlbmVycyIsImNhbmRpZGF0ZSIsInNwbGljZSIsImwiLCJhcmdzIiwic2xpY2UiLCJvIiwiRmx2IiwicGxheWVyIiwiX3BsYXllciIsIl9vcHRpb25zIiwiZmx2UGxheWVyIiwiTWFpblBhcnNlciIsIm1zZSIsIk1TRSIsImlzU2Vla2luZyIsImlzRGF0YUxvYWRpbmciLCJ0ZW1wQ3VycmVudFRpbWUiLCJ0ZW1wRmx2UGxheWVyIiwiaXNDaGFuZ2luZ1NyYyIsImluaXRQbGF5ZXJFdmVudHMiLCJpbml0Rmx2UGxheWVyRXZlbnRzIiwiaW5pdE1zZUV2ZW50cyIsInN0YXJ0TG9hZERhdGEiLCJoYW5kbGVTZWVraW5nIiwiYnVmZmVyZWQiLCJjdXJyZW50VGltZSIsImlzQnVmZmVyZWQiLCJsZW4iLCJzdGFydCIsImVuZCIsIlZvZFRhc2siLCJjbGVhciIsImlzU2Vla2FibGUiLCJzZWVrIiwiaXNMaXZlIiwiaGFuZGxlVGltZVVwZGF0ZSIsImlzTWVkaWFJbmZvUmVhZHkiLCJwcm9ncmVzc0NoZWNrZXIiLCJpc0VuZGVkIiwiX3JlcGxheSIsImRlc3Ryb3kiLCJfbXNlIiwicmVwbGF5IiwiaXNTb3VyY2VPcGVuIiwiYXBwZW5kQnVmZmVyIiwiZnR5cF9tb292IiwiYnVmZmVyIiwic2V0VGltZW91dCIsInBsYXkiLCJwZW5kaW5nRnJhZ21lbnRzIiwiaGFzUGVuZGluZ0ZyYWdtZW50cyIsImZyYWdtZW50Iiwic2hpZnQiLCJ1bnNoaWZ0IiwidmlkZW8iLCJ1cmwiLCJzd2l0Y2hVUkwiLCJjb25maWciLCJpc1RlbXBQbGF5ZXIiLCJoYW5kbGVNZWRpYUZyYWdtZW50IiwidW5iaW5kRmx2UGxheWVyRXZlbnRzIiwiaGFuZGxlU2Vla0VuZCIsImhhbmRsZUVycm9yIiwiaGFuZGxlRnR5cE1vb3YiLCJmdHlwTW9vdiIsIm9uU291cmNlT3BlbiIsImxvYWRTZWdtZW50cyIsInByZWxvYWRUaW1lIiwibWluQ2FjaGVkVGltZSIsInJhbmdlIiwiZ2V0QnVmZmVyZWRSYW5nZSIsInZpZGVvRHVyYXRpb24iLCJ2aWRlb1RpbWVTY2FsZSIsInRoZW4iLCJmbHYiLCJlbmRPZlN0cmVhbSIsInBhdXNlIiwiZ2V0RGVmYXVsdENvbmYiLCJhdXRvQ2xlYW5Tb3VyY2VCdWZmZXIiLCJhdXRvQ2xlYW5NYXhCYWNrVGltZSIsImNvcnMiLCJmaWVsZHMiLCJuYW1lIiwiQm9vbGVhbiIsInBhcnNlciIsInRhcmdldCIsIm9yaWdpbiIsIm1lZGlhSW5mbyIsImR1cmF0aW9uIiwiaGFzQXVkaW8iLCJoYXNWaWRlbyIsIk51bWJlciIsImF1ZGlvRGF0YVJhdGUiLCJhdWRpb2RhdGFyYXRlIiwidmlkZW9EYXRhUmF0ZSIsInZpZGVvZGF0YXJhdGUiLCJ3aWR0aCIsImhlaWdodCIsInN0YXRlIiwiZmxvb3IiLCJ0aW1lU2NhbGUiLCJvblR5cGVFcnIiLCJmcHNOdW0iLCJmcmFtZXJhdGUiLCJmcHMiLCJyZWZlckZyYW1lUmF0ZSIsImZpeGVkIiwiZnBzRGVuIiwia2V5ZnJhbWVzIiwiaGFzS2V5ZnJhbWVzIiwiX3BhcnNlS2V5ZnJhbWVzIiwiTWV0YVR5cGVzIiwiTlVNQkVSIiwiQk9PTEVBTiIsIlNUUklORyIsIk9CSkVDVCIsIk1JWF9BUlJBWSIsIk9CSkVDVF9FTkQiLCJTVFJJQ1RfQVJSQVkiLCJEQVRFIiwiTE9ORV9TVFJJTkciLCJFdmVudFR5cGVzIiwiREFUQV9SRUFEWSIsIk1FVEFfREFUQV9SRUFEWSIsIlRSQUNLX01FVEFfUkVBRFkiLCJNRURJQV9JTkZPX1JFQURZIiwiTUVUQV9FTkRfUE9TSVRJT04iLCJFUlJPUiIsInNvdW5kUmF0ZVR5cGVzIiwiQXVkaW9PYmplY3RUeXBlcyIsInNhbXBsaW5nRnJlcXVlbmN5VHlwZXMiLCJicm93c2VyVHlwZXMiLCJJRSIsIkZJUkVfRk9YIiwiQ0hST01FIiwiT1BFUkEiLCJTQUZBUkkiLCJtcDNWZXJzaW9ucyIsIlYyNSIsIlJFU0VSVkVEIiwiVjIwIiwiVjEwIiwiYXVkaW9TYW1wbGVSYXRlIiwibXAzQml0UmF0ZSIsIkxheWVyMSIsIkxheWVyMiIsIkxheWVyMyIsIkZsdlBsYXllciIsIl9fZmx2X18iLCJpbml0Iiwic3RhcnRzV2l0aCIsImxvYWQiLCJhdXRvcGxheSIsImNyZWF0ZUluc3RhbmNlIiwiUGxheWVyIiwidXRpbCIsImFkZENsYXNzIiwicm9vdCIsImxpdmUiLCJjcmVhdGVEb20iLCJjb250cm9scyIsImFwcGVuZENoaWxkIiwiaW5pdGVkIiwiTWVkaWFJbmZvIiwiX2RlZmF1bHQiLCJtaW1lVHlwZSIsImNvZGVjIiwiYXVkaW9Db2RlYyIsInZpZGVvQ29kZWMiLCJhdWRpb0NoYW5uZWxDb3VudCIsImF1ZGlvQ29uZmlnIiwicHJvZmlsZSIsImxldmVsIiwiY2hyb21hRm9ybWF0IiwicGl4ZWxSYXRpbyIsIl9tZXRhRGF0YSIsInNlZ21lbnRzIiwiaW5pdERhdGEiLCJlbnRyaWVzIiwiayIsInYiLCJpc1ZpZGVvSW5mb0ZpbGxlZCIsImlzQXVkaW9JbmZvRmlsbGVkIiwibm90TnVsbEZpZWxkcyIsIk1lZGlhU2FtcGxlIiwiaW5mbyIsImdldERlZmF1bHRJbmYiLCJ0b1N0cmluZyIsInNhbXBsZSIsImR0cyIsInB0cyIsInBvc2l0aW9uIiwiaXNSQVAiLCJvcmlnaW5EdHMiLCJNZWRpYVNlZ21lbnQiLCJzdGFydER0cyIsImVuZER0cyIsInN0YXJ0UHRzIiwiZW5kUHRzIiwib3JpZ2luU3RhcnREdHMiLCJvcmlnaW5FbmREdHMiLCJyYW5kb21BY2Nlc3NQb2ludHMiLCJmaXJzdFNhbXBsZSIsImxhc3RTYW1wbGUiLCJNZWRpYVNlZ21lbnRMaXN0IiwiX3R5cGUiLCJfbGlzdCIsIl9sYXN0QXBwZW5kTG9jYXRpb24iLCJiZWdpbkR0cyIsImxpc3QiLCJsYXN0IiwibWlkIiwibGJvdW5kIiwidWJvdW5kIiwiaWR4IiwiX3NlYXJjaE5lYXJlc3RTZWdtZW50QmVmb3JlIiwic2VnbWVudCIsImxhc3RBcHBlbmRJZHgiLCJpbnNlcnRJZHgiLCJnZXRMYXN0U2VnbWVudEJlZm9yZSIsInNlZ21lbnRJZHgiLCJTdG9yZSIsImlzTGUiLCJzbmlmZmVyIiwiX2hhc0F1ZGlvIiwiX2hhc1ZpZGVvIiwiX21lZGlhSW5mbyIsIl92aWRlb1RyYWNrIiwiaWQiLCJzYW1wbGVzIiwiX2F1ZGlvVHJhY2siLCJfdmlkZW9NZXRhRGF0YSIsIl9hdWRpb01ldGFEYXRhIiwiX2F1ZGlvSW5pdGlhbE1ldGFkYXRhRGlzcGF0Y2hlZCIsIl92aWRlb0luaXRpYWxNZXRhZGF0YURpc3BhdGNoZWQiLCJ0YWdzIiwidGltZVN0YW1wQmFzZSIsImhhc1ZpZGVvRmxhZ092ZXJyaWRlZCIsImhhc0F1ZGlvRmxhZ092ZXJyaWRlZCIsImR1cmF0aW9uT3ZlcnJpZGVkIiwibmFsdUxlbmd0aFNpemUiLCJfcmVmZXJGcmFtZVJhdGUiLCJtZXRhRW5kUG9zaXRpb24iLCJfaXNJbml0aWFsTWV0YWRhdGFEaXNwYXRjaGVkIiwiYmluZCIsInBvcyIsIkZsdlRhZyIsInRhZ1R5cGUiLCJib2R5U2l6ZSIsInRhZ1NpemUiLCJUaW1lc3RhbXAiLCJTdHJlYW1JRCIsImJvZHkiLCJ0aW1lIiwicG9wIiwiam9pbiIsInBhcnNlSW50IiwiRXJyb3JUeXBlcyIsIm5ldHdvcmsiLCJjb2RlIiwibXNnIiwicmVtYXJrIiwicGFyc2UiLCJmb3JtYXQiLCJkZWNvZGVyIiwicnVudGltZSIsInRpbWVvdXQiLCJvdGhlciIsIkVycm9ycyIsIm5ldHdvcmtTdGF0ZSIsInJlYWR5U3RhdGUiLCJjdXJyZW50U3JjIiwiZW5kZWQiLCJlcnJkIiwibGluZSIsImhhbmRsZSIsInZlcnNpb24iLCJyIiwicGxheWVyVmVyc2lvbiIsImVycm9yVHlwZSIsImRvbWFpbiIsImRvY3VtZW50IiwiZXgiLCJGbHZQYXJzZXIiLCJzdG9yZSIsIkNMQVNTX05BTUUiLCJjb25zdHJ1Y3RvciIsInRlbXBfdThhIiwiZGF0YUxlbiIsInN0b3AiLCJpbmRleCIsImZpbGVQb3NpdGlvbiIsImZpcnN0RmxhZyIsImZsdlU4YSIsInRlbXBVOGEiLCJwYXJzZURhdGEiLCJpc0ZsdkhlYWQiLCJwYXJzZUhlYWQiLCJyZWFkRGF0YSIsInU4YUxlbmd0aCIsInRhZyIsIlRhZyIsInVucmVhZExlbmd0aCIsIlN0cmFtSWQiLCJnZXRCb2R5U2l6ZSIsIl9zdG9yZSIsInNpemVBcnIiLCJCdWZmZXIiLCJyZWFkQXNJbnQiLCJtYXRjaCIsImZsYWciLCJfaW5kZXgiLCJmaXJzdFRocmVlQ2hhcnMiLCJmcm9tQ2hhckNvZGUiLCJEZW11eGVyIiwiY291bnQiLCJjb2RlY3MiLCJtZWRpYVNvdXJjZSIsIndpbmRvdyIsIk1lZGlhU291cmNlIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwiaGFuZGxlU291cmNlT3BlbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJzb3VyY2VCdWZmZXIiLCJhZGRTb3VyY2VCdWZmZXIiLCJ1cGRhdGluZyIsIkVycm9yIiwicmVtb3ZlIiwiaXNUeXBlU3VwcG9ydGVkIiwiTk9PUCIsIl9jb25maWciLCJfdGVtcEJhc2VUaW1lIiwiZmx2UGFyc2VyIiwidGFnRGVtdXhlciIsIlRhZ0RlbXV4ZXIiLCJtcDRyZW11eGVyIiwiTXA0UmVtdXhlciIsImJ1ZmZlcktleWZyYW1lcyIsIlNldCIsIk1FVEFfQ0hVTktfU0laRSIsInBvdyIsIkNIVU5LX1NJWkUiLCJfaXNOZXdTZWdtZW50c0Fycml2YWwiLCJsb2FkVGFzayIsIl9wZW5kaW5nRnJhZ21lbnRzIiwiX3BlbmRpbmdSZW1vdmVSYW5nZSIsImVycl9jbnQiLCJyZXF1ZXN0Q29uZmlnIiwibW9kZSIsImluaXRFdmVudEJpbmQiLCJpbml0TWV0YSIsImluaXRMaXZlU3RyZWFtIiwiTGl2ZVRhc2siLCJydW4iLCJsb2FkTGl2ZURhdGEiLCJ3cml0ZSIsIlVpbnQ4QXJyYXkiLCJzZXRGbHYiLCJjb25zb2xlIiwibG9nIiwibWVzc2FnZSIsIlJlc29sdmVyIiwicmVzb2x2ZUNodW5rIiwidGltZVN0YW1wIiwibG9hZERhdGEiLCJsb2FkTWV0YURhdGEiLCJjYXRjaCIsImNoYW5nZVJhbmdlIiwiX3JhbmdlIiwiZ2V0TmV4dFJhbmdlRW5kIiwiUHJvbWlzZSIsInJlc29sdmUiLCJfbG9hZFNlZ21lbnRzRGF0YSIsInRpbWVzIiwiZmlsZVBvc2l0aW9ucyIsImV4cGVjdEVuZCIsImxlZnQiLCJyaWdodCIsInByb21pc2UiLCJhcnJheUJ1ZmYiLCJiYXNlVGltZSIsImdldFRpbWUiLCJfdGltZXN0YW1wQmFzZSIsInJlc29sdmVUYWdzIiwiaXNQYXJzaW5nIiwiYXVkaW9UcmFjayIsInZpZGVvVHJhY2siLCJyZW11eCIsIm1ldGEiLCJvbk1ldGFEYXRhUmVhZHkiLCJuZXdGcmFnIiwiYWRkIiwicmFwIiwiRlRZUF9NT09WIiwib25NZWRpYUluZm9SZWFkeSIsImhhbmRsZURhdGFSZWFkeSIsImhhbmRsZU1lZGlhSW5mb1JlYWR5IiwiaGFuZGxlTWV0YURhdGFSZWFkeSIsInNldEV2ZW50QmluZCIsImhhbmRsZU5ld01lZGlhRnJhZ21lbnQiLCJjbGVhckJ1ZmZlciIsImNhbmNlbCIsInNlZWtTdGFydCIsInN0YXJ0RmlsZVBvcyIsImVuZEZpbGVQb3MiLCJtaW4iLCJnZXRFbmRGaWxlUG9zIiwibG8iLCJoaSIsIm5leHRUaW1lIiwiTUFYX1NBRkVfSU5URUdFUiIsImV2ZXJ5IiwiY2xlYXJUYWdzIiwic2V0Rmx2Rmlyc3QiLCJzZXRGbHZVc3VhbGx5IiwiaXNDb21wbGV0ZSIsIlRyYW5zQ29kZXIiLCJTUFNQYXJzZXIiLCJwcm9maWxlSWRjIiwibGV2ZWxJZGMiLCJ0b0ZpeGVkIiwiY2hyb21hIiwib3JpZ2luQXJyIiwicmJzcCIsIl9lYnNwMnJic3AiLCJzdHJlYW0iLCJFeHBHb2xvbWIiLCJzcHNDb25maWciLCJyZWFkU1BTIiwicHJvZmlsZVN0cmluZyIsImdldFByb2ZpbGVTdHIiLCJsZXZlbFN0cmluZyIsImdldExldmVsU3RyIiwiY2hyb21hRm9ybWF0U3RyaW5nIiwiZ2V0Q2hyb21hRm9ybWF0U3RyIiwib3JpZ2luTGVuIiwiYnl0ZUxlbmd0aCIsImRpc3QiLCJkaXN0U2l6ZSIsIl9vYnNlcnZlciIsIm9ic2VydmVyIiwiZmx1c2giLCJlcnJvckRldGFpbCIsImVycm9yVG9FbWl0IiwiQXVkaW9EZW11eGVyIiwiY3VycmVudFRhZyIsInJlYWRPZmZzZXQiLCJhdWRpb01ldGFEYXRhIiwidHJhY2siLCJpbml0QXVkaW9NZXRhIiwiZHYiLCJEYXRhVmlldzRSZWFkIiwic291bmQiLCJnZXRVaW50OCIsInNvdW5kRm9ybWF0SWR4Iiwic291bmRSYXRlIiwic291bmRUeXBlIiwiY2hhbm5lbENvdW50IiwiYWFjSW5mbyIsIl9wYXJzZUFBQ0F1ZGlvIiwiYWFjRGF0YSIsInNhbXBsZUZyZXEiLCJwYWNrZXRUeXBlIiwic2FtcGxlUmF0ZSIsIm1hbmlmZXN0Q29kZWMiLCJyZWZTYW1wbGVEdXJhdGlvbiIsImhhc0luaXRpYWxNZXRhRGlzcGF0Y2hlZCIsIm1pIiwicmVwbGFjZSIsImFhY1NhbXBsZSIsInVuaXQiLCJyZXNldFN0YXR1cyIsImFhY0FycmF5IiwiX3BhcnNlQUFDQXVkaW9TcGVjaWZpY0NvbmZpZyIsImdldEFuZE51bSIsInJlc3VsdE9iaiIsInNhbXBsaW5nRnJlcXVlbmN5IiwiZXh0QXVkaW9PYmplY3RUeXBlIiwiZXh0QXVkaW9TYW1wbGluZ0lkeCIsIlVJbnQwIiwiVUludDEiLCJ0ZW1wQXVkaW9PYmplY3RUeXBlIiwiYXVkaW9PYmplY3RUeXBlIiwic2FtcGxpbmdJZHgiLCJlbWl0RXJyb3IiLCJkaXNwYXRjaCIsIlVJbnQyIiwiYnJvd3NlciIsIm9zIiwiaXNBbmRyb2lkIiwiZXh0ZW5zaW9uU2FtcGxpbmdJbmRleCIsImV4dGVuc2lvblNhbXBsaW5nSWR4IiwiZGF0YVNpemUiLCJwcmVmaXgiLCJwYXlsb2FkIiwiTG9nIiwid2FybiIsIk1ldGFEZW11eGVyIiwic2l6ZSIsIm1ldGFEYXRhIiwicGFyc2VWYWx1ZSIsIkRhdGFWaWV3Iiwic3RyTGVuIiwiZ2V0VWludDE2IiwiVVRGOCIsImRlY29kZSIsInRzIiwiZ2V0RmxvYXQ2NCIsInRpbWVPZmZzZXQiLCJnZXRJbnQxNiIsIkRhdGUiLCJwYXJzZVN0cmluZyIsImlzT2JqRW5kIiwiZ2V0VWludDMyIiwiQXJyYXlCdWZmZXIiLCJkYXRhVmlldyIsImJvb2xOdW0iLCJvYmpFbmRTaXplIiwiYW1mT2JqIiwicGFyc2VPYmplY3QiLCJpc09iamVjdEVuZCIsIm1hcmsiLCJhbWZWYXIiLCJtYXJrZXIiLCJhcnJMZW5ndGgiLCJzY3JpcHQiLCJkYXRlIiwicGFyc2VEYXRlIiwibG9uZ1N0ciIsInBhcnNlTG9uZ1N0cmluZyIsIm5hdGl2ZUhhc1Byb3AiLCJUYWdkZW11eCIsIl9tZXRhRGVtdXhlciIsIl92aWRlb0RlbXV4ZXIiLCJWaWRlb0RlbXV4ZXIiLCJfYXVkaW9EZW11eGVyIiwiX2ZpcnN0UGFyc2UiLCJfZGF0YU9mZnNldCIsInJlc29sdmVUYWciLCJfcmVzb2x2ZUF1ZGlvVGFnIiwiX3Jlc29sdmVWaWRlb1RhZyIsIl9yZXNvbHZlTWV0YVRhZyIsInMiLCJoYXNNZXRhRGF0YSIsIkxvZ2dlciIsIm9uTWV0YURhdGEiLCJtZXRhRmllbGRzIiwiZmllbGQiLCJtZXRhT2JqIiwiX2luaXRNZXRhRGF0YSIsImZpbGVwb3NpdGlvbnMiLCJ2aWRlb01ldGFEYXRhIiwiZmlyc3RVSTgiLCJmcmFtZVR5cGUiLCJjb2RlY0lkIiwiX3BhcnNlQVZDUGFja2V0IiwicGFja2FnZVR5cGUiLCJjcHNUaW1lIiwiX3BhcnNlQVZDRGVjb2RlckNvbmZpZ3VyYXRpb25SZWNvcmQiLCJfcGFyc2VBVkNWaWRlb0RhdGEiLCJhdmNjIiwidGltZXNjYWxlIiwiYXZjUHJvZmlsZSIsImdldFVpbnQiLCJzcHNMZW5ndGgiLCJoYW5kbGVyIiwic3BzIiwicGFyc2VTUFMiLCJjb2RlY1NpemUiLCJwcmVzZW50U2l6ZSIsImZyYW1lUmF0ZSIsInJlZkZyYW1lcyIsImJpdERlcHRoIiwicHJlc2VudFdpZHRoIiwicHJlc2VudEhlaWdodCIsImNvZGVjQXJyIiwic3ViYXJyYXkiLCJjb2RlY1N0ciIsImoiLCJoZXgiLCJwYWRTdGFydCIsInBwcyIsInBwc0NvdW50IiwicHBzU2l6ZSIsIm5hbHVMaXN0IiwibmFsdUxlblNpemUiLCJpc0tleWZyYW1lIiwidGVtcFJlYWRPZmZzZXQiLCJuYWx1U2l6ZSIsImdldFVpbnQyNCIsInVuaXRUeXBlIiwibmFsdVVuaXQiLCJ2aWRlb1NhbXBsZSIsInVuaXRzIiwiY3BzIiwibnVtIiwiRk1QNCIsIndyaXRlVWludDMyIiwiY29udGVudCIsImluaXRCb3giLCJtdmhkIiwidHJhazEiLCJ2aWRlb1RyYWsiLCJ0cmFrMiIsImF1ZGlvVHJhayIsIm12ZXgiLCJpdGVtIiwiYnl0ZXMiLCJ0a2hkIiwibWRpYSIsInNhbXBsZXJhdGUiLCJtZWRpYVRpbWUiLCJtZGhkIiwiaGRsciIsIm1pbmYiLCJleHRlbnNpb24iLCJ2bWhkIiwic21oZCIsImRpbmYiLCJzdGJsIiwiZHJlZiIsInN0c2QiLCJzdHRzIiwic3RzYyIsInN0c3oiLCJzdGNvIiwibXA0YSIsImF2YzEiLCJlc2RzIiwiY29uZmlnbGVuIiwiY29uY2F0IiwiaFNwYWNpbmciLCJ2U3BhY2luZyIsImF2Y2NCdWZmZXIiLCJidHJ0IiwicGFzcCIsIm1laGQiLCJ0cmV4IiwibWZoZCIsInRyYWYiLCJzZXF1ZW5jZSIsInRmaGQiLCJ0ZmR0Iiwic2R0cCIsInRydW4iLCJzZHRwTGVuZ3RoIiwic2FtcGxlQ291bnQiLCJ3cml0ZU9mZnNldCIsInRydW5Cb3giLCJtZGF0Qm94IiwiY2hhckNvZGVBdCIsIl9kdHNCYXNlIiwiX2lzRHRzQmFzZUluaXRlZCIsIl92aWRlb01ldGEiLCJfYXVkaW9NZXRhIiwiX2F1ZGlvTmV4dER0cyIsIl92aWRlb05leHREdHMiLCJfdmlkZW9TZWdtZW50TGlzdCIsIl9hdWRpb1NlZ21lbnRMaXN0IiwiX2ZpbGxTaWxlbmNlRnJhbWUiLCJfZHRzQmFzZUluaXRlZCIsImNhbGNEdHNCYXNlIiwiX3JlbXV4VmlkZW8iLCJfcmVtdXhBdWRpbyIsImZ0eXAiLCJtb292IiwiYXVkaW9CYXNlIiwiSW5maW5pdHkiLCJ2aWRlb0Jhc2UiLCJkdHNDb3JyZWN0aW9uIiwiZmlyc3REdHMiLCJsYXN0RHRzIiwiZmlyc3RQdHMiLCJsYXN0UHRzIiwibXA0U2FtcGxlcyIsInZpZGVvU2VnbWVudCIsImF2Y1NhbXBsZSIsImlzRW1wdHkiLCJsYXN0U2VnbWVudCIsImdhcCIsImxhc3RHYXAiLCJfdW5pdHMiLCJtZGF0U2FtcGxlIiwic2FtcGxlRHVyYXRpb24iLCJuZXh0RHRzIiwiYWRkUkFQIiwiZmlyc3QiLCJtb29mTWRhdCIsIm1vb2YiLCJtZGF0IiwiYXBwZW5kIiwic2lsZW50RHVyYXRpb24iLCJpc0ZpcnN0RHRzSW5pdGVkIiwibmVlZFNpbGVudEZyYW1lIiwiZ2V0TGFzdFNhbXBsZUJlZm9yZSIsInNpbGVudEZyYW1lIiwiaW5pdFNpbGVudEF1ZGlvIiwibXA0U2FtcGxlIiwiY3RzIiwiYXVkaW9TZWdtZW50IiwiZ2V0U2lsZW50RnJhbWUiLCJSZW11eGVyIiwiX2hlYWRlcnMiLCJIZWFkZXJzIiwiaGVhZGVycyIsIm1ldGhvZCIsImNhY2hlIiwicmVxdWVzdCIsIlJlcXVlc3QiLCJjYWxsYmFjayIsInJlYWRlciIsInJlYWQiLCJmZXRjaCIsInJlcyIsImdldFJlYWRlciIsIkxvYWRDbHMiLCJGZXRjaExvYWRlciIsIlhIUkxvYWRlciIsImxvYWRlciIsImlzQ2FuY2VsZWQiLCJxdWV1ZSIsInVwZGF0ZSIsImZpbHRlciIsIlF1ZXVlIiwic2VuZGVkIiwid2FpdCIsImxpbWl0IiwiY29tcGxldGUiLCJpc1N0b3BwZWQiLCJub3ciLCJSYW5nZSIsInN0YXR1cyIsIm9rIiwicmVqZWN0Iiwic3RhdHVzVGV4dCIsImFycmF5QnVmZmVyIiwiX3Byb21pc2UiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJyZXNwb25zZVR5cGUiLCJzZXRSZXF1ZXN0SGVhZGVyIiwib25hYm9ydCIsIm9ubG9hZCIsInJlc3BvbnNlIiwib25lcnJvciIsIl94aHIiLCJzZW5kIiwiYWJvcnQiLCJjb250ZXh0IiwiX2R2IiwiX2NvbnRleHQiLCJpbml0UHJveHkiLCJpc0hpZ2giLCJyZWFkU2l6ZSIsIm51bVRvQW5kIiwiYmVnaW4iLCJieXRlc0F2YWlsYWJsZSIsIndvcmQiLCJiaXRzQXZhaWxhYmxlIiwid29ya2luZ0J5dGVzIiwiYXZhaWxhYmxlQnl0ZXMiLCJza2lwQnl0ZXMiLCJsb2FkV29yZCIsImJpdHMiLCJ2YWx1IiwicmVhZEJpdHMiLCJsZWFkaW5nWmVyb0NvdW50Iiwic2tpcExaIiwic2tpcEJpdHMiLCJjbHoiLCJyZWFkVUVHIiwibGFzdFNjYWxlIiwibmV4dFNjYWxlIiwiZGVsdGFTY2FsZSIsInJlYWRFRyIsImZyYW1lQ3JvcExlZnRPZmZzZXQiLCJmcmFtZUNyb3BSaWdodE9mZnNldCIsImZyYW1lQ3JvcFRvcE9mZnNldCIsImZyYW1lQ3JvcEJvdHRvbU9mZnNldCIsImNvZGVjV2lkdGgiLCJjb2RlY0hlaWdodCIsIm51bVJlZkZyYW1lc0luUGljT3JkZXJDbnRDeWNsZSIsInBpY1dpZHRoSW5NYnNNaW51czEiLCJwaWNIZWlnaHRJbk1hcFVuaXRzTWludXMxIiwiZnJhbWVNYnNPbmx5RmxhZyIsInNjYWxpbmdMaXN0Q291bnQiLCJyZWFkVUJ5dGUiLCJyZWFkQm9vbGVhbiIsInNraXBFRyIsInNraXBVRUciLCJza2lwU2NhbGluZ0xpc3QiLCJjaHJvbWFGb3JtYXRJZGMiLCJjaHJvbWFGb3JtYXRzIiwiYml0RGVwdGhMdW1hIiwicHJvZmlsZUlkY3MiLCJpbmNsdWRlcyIsInBpY09yZGVyQ250VHlwZSIsImZwc0ZpeGVkIiwiYXNwZWN0UmF0aW9JZGMiLCJudW1Vbml0SW5UaWNrIiwiY3JvcFVuaXRYIiwiY3JvcFVuaXRZIiwic3ViV2MiLCJzdWJIYyIsInBpeGVsU2NhbGUiLCJjZWlsIiwibmF0aXZlU2xpY2UiLCJPYnNlcnZlciIsImZuSWQiLCJfbGlzdGVuZXJJZE1hcCIsIl9saXN0ZW5lcnMiLCJfZ2V0TGlzdGVuZXJzQnlLZXkiLCJfZ2V0TGlzdGVuZXJCeUlkIiwiX3RoaXMiLCJvbmNlRnVuYyIsInVpbnQ4YXJyYXkiLCJvdXQiLCJpbnB1dCIsIl9jaGVja0NvbnRpbnVhdGlvbiIsInVjczQiLCJjaGVja0xlbmd0aCIsImFycmF5IiwiZGVib3VuY2UiLCJmdW5jIiwiaW1tZWRpYXRlIiwiZGVib3VuY2VkIiwiY2xlYXJUaW1lb3V0IiwiY2FsbE5vdyIsImNhY2hlV3JhcHBlciIsInJlZHVjZSIsInByZSIsImN1ciIsImxlIiwiYnVmIiwic2V0SW50MTYiLCJJbnQxNkFycmF5IiwiZGV2aWNlIiwiaXNQYyIsImlzVGFibGV0IiwidWEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJ0b0xvd2VyQ2FzZSIsInJlZyIsImllIiwiZmlyZm94IiwiY2hyb21lIiwib3BlcmEiLCJzYWZhcmkiLCJ0ZXN0IiwiaXNXaW5kb3dzUGhvbmUiLCJpc1N5bWJpYW4iLCJpc0ZpcmVGb3giLCJpc1Bob25lIiwidGVtcCIsInBhZFN0YXJ0NEhleCIsImhleE51bSIsImhleFN0ciJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7O0FBRUFBLE9BQU9DLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDO0FBQzNDQyxTQUFPO0FBRG9DLENBQTdDOztBQUlBRCxRQUFRRSxPQUFSLEdBQWtCLFVBQVVDLGlCQUFWLEVBQTZCO0FBQzdDLE1BQUlDLGNBQWMsQ0FBbEI7O0FBRUEsT0FBSyxJQUFJQyxPQUFPQyxVQUFVQyxNQUFyQixFQUE2QkMsU0FBU0MsTUFBTUosT0FBTyxDQUFQLEdBQVdBLE9BQU8sQ0FBbEIsR0FBc0IsQ0FBNUIsQ0FBdEMsRUFBc0VLLE9BQU8sQ0FBbEYsRUFBcUZBLE9BQU9MLElBQTVGLEVBQWtHSyxNQUFsRyxFQUEwRztBQUN4R0YsV0FBT0Us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b2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoUmVzdWx0Q29uc3RydWN0b3IpIHtcbiAgdmFyIHRvdGFsTGVuZ3RoID0gMDtcblxuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJyYXlzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFycmF5c1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cblxuICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWU7XG4gIHZhciBfZGlkSXRlcmF0b3JFcnJvciA9IGZhbHNlO1xuICB2YXIgX2l0ZXJhdG9yRXJyb3IgPSB1bmRlZmluZWQ7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBhcnJheXNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICB2YXIgYXJyID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgIHRvdGFsTGVuZ3RoICs9IGFyci5sZW5ndGg7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZGlkSXRlcmF0b3JFcnJvciA9IHRydWU7XG4gICAgX2l0ZXJhdG9yRXJyb3IgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiAmJiBfaXRlcmF0b3IucmV0dXJuKSB7XG4gICAgICAgIF9pdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yKSB7XG4gICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciByZXN1bHQgPSBuZXcgUmVzdWx0Q29uc3RydWN0b3IodG90YWxMZW5ndGgpO1xuICB2YXIgb2Zmc2V0ID0gMDtcbiAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICB2YXIgX2l0ZXJhdG9yRXJyb3IyID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IGFycmF5c1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMjsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IChfc3RlcDIgPSBfaXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZSkge1xuICAgICAgdmFyIF9hcnIgPSBfc3RlcDIudmFsdWU7XG5cbiAgICAgIHJlc3VsdC5zZXQoX2Fyciwgb2Zmc2V0KTtcbiAgICAgIG9mZnNldCArPSBfYXJyLmxlbmd0aDtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kaWRJdGVyYXRvckVycm9yMiA9IHRydWU7XG4gICAgX2l0ZXJhdG9yRXJyb3IyID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjIucmV0dXJuKSB7XG4gICAgICAgIF9pdGVyYXRvcjIucmV0dXJuKCk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjIpIHtcbiAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IyO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jb25jYXQgPSByZXF1aXJlKCcuL2NvbmNhdCcpO1xuXG52YXIgX2NvbmNhdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb25jYXQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jb25jYXQyLmRlZmF1bHQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXNzaWduICAgICAgICA9IHJlcXVpcmUoJ2VzNS1leHQvb2JqZWN0L2Fzc2lnbicpXG4gICwgbm9ybWFsaXplT3B0cyA9IHJlcXVpcmUoJ2VzNS1leHQvb2JqZWN0L25vcm1hbGl6ZS1vcHRpb25zJylcbiAgLCBpc0NhbGxhYmxlICAgID0gcmVxdWlyZSgnZXM1LWV4dC9vYmplY3QvaXMtY2FsbGFibGUnKVxuICAsIGNvbnRhaW5zICAgICAgPSByZXF1aXJlKCdlczUtZXh0L3N0cmluZy8jL2NvbnRhaW5zJylcblxuICAsIGQ7XG5cbmQgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChkc2NyLCB2YWx1ZS8qLCBvcHRpb25zKi8pIHtcblx0dmFyIGMsIGUsIHcsIG9wdGlvbnMsIGRlc2M7XG5cdGlmICgoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHx8ICh0eXBlb2YgZHNjciAhPT0gJ3N0cmluZycpKSB7XG5cdFx0b3B0aW9ucyA9IHZhbHVlO1xuXHRcdHZhbHVlID0gZHNjcjtcblx0XHRkc2NyID0gbnVsbDtcblx0fSBlbHNlIHtcblx0XHRvcHRpb25zID0gYXJndW1lbnRzWzJdO1xuXHR9XG5cdGlmIChkc2NyID09IG51bGwpIHtcblx0XHRjID0gdyA9IHRydWU7XG5cdFx0ZSA9IGZhbHNlO1xuXHR9IGVsc2Uge1xuXHRcdGMgPSBjb250YWlucy5jYWxsKGRzY3IsICdjJyk7XG5cdFx0ZSA9IGNvbnRhaW5zLmNhbGwoZHNjciwgJ2UnKTtcblx0XHR3ID0gY29udGFpbnMuY2FsbChkc2NyLCAndycpO1xuXHR9XG5cblx0ZGVzYyA9IHsgdmFsdWU6IHZhbHVlLCBjb25maWd1cmFibGU6IGMsIGVudW1lcmFibGU6IGUsIHdyaXRhYmxlOiB3IH07XG5cdHJldHVybiAhb3B0aW9ucyA/IGRlc2MgOiBhc3NpZ24obm9ybWFsaXplT3B0cyhvcHRpb25zKSwgZGVzYyk7XG59O1xuXG5kLmdzID0gZnVuY3Rpb24gKGRzY3IsIGdldCwgc2V0LyosIG9wdGlvbnMqLykge1xuXHR2YXIgYywgZSwgb3B0aW9ucywgZGVzYztcblx0aWYgKHR5cGVvZiBkc2NyICE9PSAnc3RyaW5nJykge1xuXHRcdG9wdGlvbnMgPSBzZXQ7XG5cdFx0c2V0ID0gZ2V0O1xuXHRcdGdldCA9IGRzY3I7XG5cdFx0ZHNjciA9IG51bGw7XG5cdH0gZWxzZSB7XG5cdFx0b3B0aW9ucyA9IGFyZ3VtZW50c1szXTtcblx0fVxuXHRpZiAoZ2V0ID09IG51bGwpIHtcblx0XHRnZXQgPSB1bmRlZmluZWQ7XG5cdH0gZWxzZSBpZiAoIWlzQ2FsbGFibGUoZ2V0KSkge1xuXHRcdG9wdGlvbnMgPSBnZXQ7XG5cdFx0Z2V0ID0gc2V0ID0gdW5kZWZpbmVkO1xuXHR9IGVsc2UgaWYgKHNldCA9PSBudWxsKSB7XG5cdFx0c2V0ID0gdW5kZWZpbmVkO1xuXHR9IGVsc2UgaWYgKCFpc0NhbGxhYmxlKHNldCkpIHtcblx0XHRvcHRpb25zID0gc2V0O1xuXHRcdHNldCA9IHVuZGVmaW5lZDtcblx0fVxuXHRpZiAoZHNjciA9PSBudWxsKSB7XG5cdFx0YyA9IHRydWU7XG5cdFx0ZSA9IGZhbHNlO1xuXHR9IGVsc2Uge1xuXHRcdGMgPSBjb250YWlucy5jYWxsKGRzY3IsICdjJyk7XG5cdFx0ZSA9IGNvbnRhaW5zLmNhbGwoZHNjciwgJ2UnKTtcblx0fVxuXG5cdGRlc2MgPSB7IGdldDogZ2V0LCBzZXQ6IHNldCwgY29uZmlndXJhYmxlOiBjLCBlbnVtZXJhYmxlOiBlIH07XG5cdHJldHVybiAhb3B0aW9ucyA/IGRlc2MgOiBhc3NpZ24obm9ybWFsaXplT3B0cyhvcHRpb25zKSwgZGVzYyk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eS1mdW5jdGlvblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7fTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL2lzLWltcGxlbWVudGVkXCIpKClcblx0PyBPYmplY3QuYXNzaWduXG5cdDogcmVxdWlyZShcIi4vc2hpbVwiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIGFzc2lnbiA9IE9iamVjdC5hc3NpZ24sIG9iajtcblx0aWYgKHR5cGVvZiBhc3NpZ24gIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGZhbHNlO1xuXHRvYmogPSB7IGZvbzogXCJyYXpcIiB9O1xuXHRhc3NpZ24ob2JqLCB7IGJhcjogXCJkd2FcIiB9LCB7IHRyenk6IFwidHJ6eVwiIH0pO1xuXHRyZXR1cm4gKG9iai5mb28gKyBvYmouYmFyICsgb2JqLnRyenkpID09PSBcInJhemR3YXRyenlcIjtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGtleXMgID0gcmVxdWlyZShcIi4uL2tleXNcIilcbiAgLCB2YWx1ZSA9IHJlcXVpcmUoXCIuLi92YWxpZC12YWx1ZVwiKVxuICAsIG1heCAgID0gTWF0aC5tYXg7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRlc3QsIHNyYyAvKiwg4oCmc3JjbiovKSB7XG5cdHZhciBlcnJvciwgaSwgbGVuZ3RoID0gbWF4KGFyZ3VtZW50cy5sZW5ndGgsIDIpLCBhc3NpZ247XG5cdGRlc3QgPSBPYmplY3QodmFsdWUoZGVzdCkpO1xuXHRhc3NpZ24gPSBmdW5jdGlvbiAoa2V5KSB7XG5cdFx0dHJ5IHtcblx0XHRcdGRlc3Rba2V5XSA9IHNyY1trZXldO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZTtcblx0XHR9XG5cdH07XG5cdGZvciAoaSA9IDE7IGkgPCBsZW5ndGg7ICsraSkge1xuXHRcdHNyYyA9IGFyZ3VtZW50c1tpXTtcblx0XHRrZXlzKHNyYykuZm9yRWFjaChhc3NpZ24pO1xuXHR9XG5cdGlmIChlcnJvciAhPT0gdW5kZWZpbmVkKSB0aHJvdyBlcnJvcjtcblx0cmV0dXJuIGRlc3Q7XG59O1xuIiwiLy8gRGVwcmVjYXRlZFxuXG5cInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqKSB7XG4gcmV0dXJuIHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIjtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF91bmRlZmluZWQgPSByZXF1aXJlKFwiLi4vZnVuY3Rpb24vbm9vcFwiKSgpOyAvLyBTdXBwb3J0IEVTMyBlbmdpbmVzXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbCkge1xuIHJldHVybiAodmFsICE9PSBfdW5kZWZpbmVkKSAmJiAodmFsICE9PSBudWxsKTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9pcy1pbXBsZW1lbnRlZFwiKSgpID8gT2JqZWN0LmtleXMgOiByZXF1aXJlKFwiLi9zaGltXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuXHR0cnkge1xuXHRcdE9iamVjdC5rZXlzKFwicHJpbWl0aXZlXCIpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpc1ZhbHVlID0gcmVxdWlyZShcIi4uL2lzLXZhbHVlXCIpO1xuXG52YXIga2V5cyA9IE9iamVjdC5rZXlzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QpIHsgcmV0dXJuIGtleXMoaXNWYWx1ZShvYmplY3QpID8gT2JqZWN0KG9iamVjdCkgOiBvYmplY3QpOyB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpc1ZhbHVlID0gcmVxdWlyZShcIi4vaXMtdmFsdWVcIik7XG5cbnZhciBmb3JFYWNoID0gQXJyYXkucHJvdG90eXBlLmZvckVhY2gsIGNyZWF0ZSA9IE9iamVjdC5jcmVhdGU7XG5cbnZhciBwcm9jZXNzID0gZnVuY3Rpb24gKHNyYywgb2JqKSB7XG5cdHZhciBrZXk7XG5cdGZvciAoa2V5IGluIHNyYykgb2JqW2tleV0gPSBzcmNba2V5XTtcbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3B0czEgLyosIOKApm9wdGlvbnMqLykge1xuXHR2YXIgcmVzdWx0ID0gY3JlYXRlKG51bGwpO1xuXHRmb3JFYWNoLmNhbGwoYXJndW1lbnRzLCBmdW5jdGlvbiAob3B0aW9ucykge1xuXHRcdGlmICghaXNWYWx1ZShvcHRpb25zKSkgcmV0dXJuO1xuXHRcdHByb2Nlc3MoT2JqZWN0KG9wdGlvbnMpLCByZXN1bHQpO1xuXHR9KTtcblx0cmV0dXJuIHJlc3VsdDtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4pIHtcblx0aWYgKHR5cGVvZiBmbiAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKGZuICsgXCIgaXMgbm90IGEgZnVuY3Rpb25cIik7XG5cdHJldHVybiBmbjtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGlzVmFsdWUgPSByZXF1aXJlKFwiLi9pcy12YWx1ZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0aWYgKCFpc1ZhbHVlKHZhbHVlKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB1c2UgbnVsbCBvciB1bmRlZmluZWRcIik7XG5cdHJldHVybiB2YWx1ZTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9pcy1pbXBsZW1lbnRlZFwiKSgpXG5cdD8gU3RyaW5nLnByb3RvdHlwZS5jb250YWluc1xuXHQ6IHJlcXVpcmUoXCIuL3NoaW1cIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0ciA9IFwicmF6ZHdhdHJ6eVwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKHR5cGVvZiBzdHIuY29udGFpbnMgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIGZhbHNlO1xuXHRyZXR1cm4gKHN0ci5jb250YWlucyhcImR3YVwiKSA9PT0gdHJ1ZSkgJiYgKHN0ci5jb250YWlucyhcImZvb1wiKSA9PT0gZmFsc2UpO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgaW5kZXhPZiA9IFN0cmluZy5wcm90b3R5cGUuaW5kZXhPZjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2VhcmNoU3RyaW5nLyosIHBvc2l0aW9uKi8pIHtcblx0cmV0dXJuIGluZGV4T2YuY2FsbCh0aGlzLCBzZWFyY2hTdHJpbmcsIGFyZ3VtZW50c1sxXSkgPiAtMTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBkICAgICAgICA9IHJlcXVpcmUoJ2QnKVxuICAsIGNhbGxhYmxlID0gcmVxdWlyZSgnZXM1LWV4dC9vYmplY3QvdmFsaWQtY2FsbGFibGUnKVxuXG4gICwgYXBwbHkgPSBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHksIGNhbGwgPSBGdW5jdGlvbi5wcm90b3R5cGUuY2FsbFxuICAsIGNyZWF0ZSA9IE9iamVjdC5jcmVhdGUsIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5XG4gICwgZGVmaW5lUHJvcGVydGllcyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzXG4gICwgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5XG4gICwgZGVzY3JpcHRvciA9IHsgY29uZmlndXJhYmxlOiB0cnVlLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUgfVxuXG4gICwgb24sIG9uY2UsIG9mZiwgZW1pdCwgbWV0aG9kcywgZGVzY3JpcHRvcnMsIGJhc2U7XG5cbm9uID0gZnVuY3Rpb24gKHR5cGUsIGxpc3RlbmVyKSB7XG5cdHZhciBkYXRhO1xuXG5cdGNhbGxhYmxlKGxpc3RlbmVyKTtcblxuXHRpZiAoIWhhc093blByb3BlcnR5LmNhbGwodGhpcywgJ19fZWVfXycpKSB7XG5cdFx0ZGF0YSA9IGRlc2NyaXB0b3IudmFsdWUgPSBjcmVhdGUobnVsbCk7XG5cdFx0ZGVmaW5lUHJvcGVydHkodGhpcywgJ19fZWVfXycsIGRlc2NyaXB0b3IpO1xuXHRcdGRlc2NyaXB0b3IudmFsdWUgPSBudWxsO1xuXHR9IGVsc2Uge1xuXHRcdGRhdGEgPSB0aGlzLl9fZWVfXztcblx0fVxuXHRpZiAoIWRhdGFbdHlwZV0pIGRhdGFbdHlwZV0gPSBsaXN0ZW5lcjtcblx0ZWxzZSBpZiAodHlwZW9mIGRhdGFbdHlwZV0gPT09ICdvYmplY3QnKSBkYXRhW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuXHRlbHNlIGRhdGFbdHlwZV0gPSBbZGF0YVt0eXBlXSwgbGlzdGVuZXJdO1xuXG5cdHJldHVybiB0aGlzO1xufTtcblxub25jZSA9IGZ1bmN0aW9uICh0eXBlLCBsaXN0ZW5lcikge1xuXHR2YXIgb25jZSwgc2VsZjtcblxuXHRjYWxsYWJsZShsaXN0ZW5lcik7XG5cdHNlbGYgPSB0aGlzO1xuXHRvbi5jYWxsKHRoaXMsIHR5cGUsIG9uY2UgPSBmdW5jdGlvbiAoKSB7XG5cdFx0b2ZmLmNhbGwoc2VsZiwgdHlwZSwgb25jZSk7XG5cdFx0YXBwbHkuY2FsbChsaXN0ZW5lciwgdGhpcywgYXJndW1lbnRzKTtcblx0fSk7XG5cblx0b25jZS5fX2VlT25jZUxpc3RlbmVyX18gPSBsaXN0ZW5lcjtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG5vZmYgPSBmdW5jdGlvbiAodHlwZSwgbGlzdGVuZXIpIHtcblx0dmFyIGRhdGEsIGxpc3RlbmVycywgY2FuZGlkYXRlLCBpO1xuXG5cdGNhbGxhYmxlKGxpc3RlbmVyKTtcblxuXHRpZiAoIWhhc093blByb3BlcnR5LmNhbGwodGhpcywgJ19fZWVfXycpKSByZXR1cm4gdGhpcztcblx0ZGF0YSA9IHRoaXMuX19lZV9fO1xuXHRpZiAoIWRhdGFbdHlwZV0pIHJldHVybiB0aGlzO1xuXHRsaXN0ZW5lcnMgPSBkYXRhW3R5cGVdO1xuXG5cdGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnb2JqZWN0Jykge1xuXHRcdGZvciAoaSA9IDA7IChjYW5kaWRhdGUgPSBsaXN0ZW5lcnNbaV0pOyArK2kpIHtcblx0XHRcdGlmICgoY2FuZGlkYXRlID09PSBsaXN0ZW5lcikgfHxcblx0XHRcdFx0XHQoY2FuZGlkYXRlLl9fZWVPbmNlTGlzdGVuZXJfXyA9PT0gbGlzdGVuZXIpKSB7XG5cdFx0XHRcdGlmIChsaXN0ZW5lcnMubGVuZ3RoID09PSAyKSBkYXRhW3R5cGVdID0gbGlzdGVuZXJzW2kgPyAwIDogMV07XG5cdFx0XHRcdGVsc2UgbGlzdGVuZXJzLnNwbGljZShpLCAxKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0aWYgKChsaXN0ZW5lcnMgPT09IGxpc3RlbmVyKSB8fFxuXHRcdFx0XHQobGlzdGVuZXJzLl9fZWVPbmNlTGlzdGVuZXJfXyA9PT0gbGlzdGVuZXIpKSB7XG5cdFx0XHRkZWxldGUgZGF0YVt0eXBlXTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdGhpcztcbn07XG5cbmVtaXQgPSBmdW5jdGlvbiAodHlwZSkge1xuXHR2YXIgaSwgbCwgbGlzdGVuZXIsIGxpc3RlbmVycywgYXJncztcblxuXHRpZiAoIWhhc093blByb3BlcnR5LmNhbGwodGhpcywgJ19fZWVfXycpKSByZXR1cm47XG5cdGxpc3RlbmVycyA9IHRoaXMuX19lZV9fW3R5cGVdO1xuXHRpZiAoIWxpc3RlbmVycykgcmV0dXJuO1xuXG5cdGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnb2JqZWN0Jykge1xuXHRcdGwgPSBhcmd1bWVudHMubGVuZ3RoO1xuXHRcdGFyZ3MgPSBuZXcgQXJyYXkobCAtIDEpO1xuXHRcdGZvciAoaSA9IDE7IGkgPCBsOyArK2kpIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuXG5cdFx0bGlzdGVuZXJzID0gbGlzdGVuZXJzLnNsaWNlKCk7XG5cdFx0Zm9yIChpID0gMDsgKGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldKTsgKytpKSB7XG5cdFx0XHRhcHBseS5jYWxsKGxpc3RlbmVyLCB0aGlzLCBhcmdzKTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0c3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG5cdFx0Y2FzZSAxOlxuXHRcdFx0Y2FsbC5jYWxsKGxpc3RlbmVycywgdGhpcyk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDI6XG5cdFx0XHRjYWxsLmNhbGwobGlzdGVuZXJzLCB0aGlzLCBhcmd1bWVudHNbMV0pO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAzOlxuXHRcdFx0Y2FsbC5jYWxsKGxpc3RlbmVycywgdGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdGwgPSBhcmd1bWVudHMubGVuZ3RoO1xuXHRcdFx0YXJncyA9IG5ldyBBcnJheShsIC0gMSk7XG5cdFx0XHRmb3IgKGkgPSAxOyBpIDwgbDsgKytpKSB7XG5cdFx0XHRcdGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0fVxuXHRcdFx0YXBwbHkuY2FsbChsaXN0ZW5lcnMsIHRoaXMsIGFyZ3MpO1xuXHRcdH1cblx0fVxufTtcblxubWV0aG9kcyA9IHtcblx0b246IG9uLFxuXHRvbmNlOiBvbmNlLFxuXHRvZmY6IG9mZixcblx0ZW1pdDogZW1pdFxufTtcblxuZGVzY3JpcHRvcnMgPSB7XG5cdG9uOiBkKG9uKSxcblx0b25jZTogZChvbmNlKSxcblx0b2ZmOiBkKG9mZiksXG5cdGVtaXQ6IGQoZW1pdClcbn07XG5cbmJhc2UgPSBkZWZpbmVQcm9wZXJ0aWVzKHt9LCBkZXNjcmlwdG9ycyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGZ1bmN0aW9uIChvKSB7XG5cdHJldHVybiAobyA9PSBudWxsKSA/IGNyZWF0ZShiYXNlKSA6IGRlZmluZVByb3BlcnRpZXMoT2JqZWN0KG8pLCBkZXNjcmlwdG9ycyk7XG59O1xuZXhwb3J0cy5tZXRob2RzID0gbWV0aG9kcztcbiIsIi8qKlxuICogQGF1dGhvciBmdXl1aGFvXG4gKi9cbmltcG9ydCBNYWluUGFyc2VyIGZyb20gJy4vcGFyc2UvTWFpblBhcnNlcidcbmltcG9ydCBNU0UgZnJvbSAnLi9wYXJzZS9NU0UnXG5pbXBvcnQgVm9kVGFzayBmcm9tICcuL3Rhc2tzL1ZvZFRhc2snXG5pbXBvcnQgZ2V0RGVmYXVsdENvbmYgZnJvbSAnLi9jb25zdGFudHMvY29uZmlnJ1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZsdiB7XG4gIGNvbnN0cnVjdG9yIChvcHRpb25zLCBwbGF5ZXIpIHtcbiAgICB0aGlzLl9wbGF5ZXIgPSBwbGF5ZXJcbiAgICB0aGlzLl9vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZ2V0RGVmYXVsdENvbmYoKSwgb3B0aW9ucylcbiAgICB0aGlzLmZsdlBsYXllciA9IG5ldyBNYWluUGFyc2VyKHRoaXMuX29wdGlvbnMsIHBsYXllcilcbiAgICB0aGlzLm1zZSA9IG5ldyBNU0UoKVxuICAgIHRoaXMuaXNTZWVraW5nID0gZmFsc2VcbiAgICB0aGlzLmlzRGF0YUxvYWRpbmcgPSBmYWxzZVxuICAgIHRoaXMudGVtcEN1cnJlbnRUaW1lID0gMFxuICAgIHRoaXMudGVtcEZsdlBsYXllciA9IG51bGxcbiAgICB0aGlzLmlzQ2hhbmdpbmdTcmMgPSBmYWxzZVxuICAgIHRoaXMuaW5pdFBsYXllckV2ZW50cyhwbGF5ZXIsIHRoaXMuX29wdGlvbnMpXG4gICAgdGhpcy5pbml0Rmx2UGxheWVyRXZlbnRzKHRoaXMuZmx2UGxheWVyLCB0aGlzLm1zZSlcbiAgICB0aGlzLmluaXRNc2VFdmVudHModGhpcy5tc2UsIHRoaXMuZmx2UGxheWVyKVxuICB9XG5cbiAgbG9hZCAoKSB7XG4gICAgdGhpcy5mbHZQbGF5ZXIuc3RhcnRMb2FkRGF0YSgpXG4gIH1cblxuICBpbml0UGxheWVyRXZlbnRzIChwbGF5ZXIsIG9wdGlvbnMpIHtcbiAgICBjb25zdCB7IG1zZSB9ID0gdGhpc1xuICAgIHBsYXllci5tc2UgPSBtc2VcbiAgICB0aGlzLmhhbmRsZVNlZWtpbmcgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5pc0NoYW5naW5nU3JjKSB7XG4gICAgICAgIHRoaXMuaXNDaGFuZ2luZ1NyYyA9IGZhbHNlXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgY29uc3QgeyBidWZmZXJlZCwgY3VycmVudFRpbWUgfSA9IHBsYXllclxuICAgICAgbGV0IGlzQnVmZmVyZWQgPSBmYWxzZVxuICAgICAgaWYgKGJ1ZmZlcmVkLmxlbmd0aCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYnVmZmVyZWQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICBpZiAoY3VycmVudFRpbWUgPiBidWZmZXJlZC5zdGFydChpKSAmJiBjdXJyZW50VGltZSA8IGJ1ZmZlcmVkLmVuZChpKSkge1xuICAgICAgICAgICAgaXNCdWZmZXJlZCA9IHRydWVcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoaXNCdWZmZXJlZCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIFZvZFRhc2suY2xlYXIoKVxuICAgICAgaWYgKCF0aGlzLmlzU2Vla2FibGUpIHtcbiAgICAgICAgdGhpcy5fcGxheWVyLmN1cnJlbnRUaW1lID0gdGhpcy50ZW1wQ3VycmVudFRpbWVcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICB0aGlzLmZsdlBsYXllci5zZWVrKHBsYXllci5jdXJyZW50VGltZSlcbiAgICAgIHRoaXMuaXNTZWVraW5nID0gdHJ1ZVxuICAgIH1cbiAgICBpZiAoIW9wdGlvbnMuaXNMaXZlKSB7XG4gICAgICBwbGF5ZXIub24oJ3NlZWtpbmcnLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuaGFuZGxlU2Vla2luZygpXG4gICAgICB9KVxuICAgIH1cbiAgICB0aGlzLmhhbmRsZVRpbWVVcGRhdGUgPSAoKSA9PiB7XG4gICAgICB0aGlzLnRlbXBDdXJyZW50VGltZSA9IHBsYXllci5jdXJyZW50VGltZVxuICAgICAgaWYgKCF0aGlzLmlzU2Vla2luZyAmJiB0aGlzLmZsdlBsYXllci5pc01lZGlhSW5mb1JlYWR5ICYmICF0aGlzLnRlbXBGbHZQbGF5ZXIpIHtcbiAgICAgICAgdGhpcy5wcm9ncmVzc0NoZWNrZXIocGxheWVyKVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX29wdGlvbnMuaXNMaXZlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuaXNFbmRlZChwbGF5ZXIsIHRoaXMuZmx2UGxheWVyKVxuICAgIH1cbiAgICBwbGF5ZXIub24oJ3RpbWV1cGRhdGUnLCAoKSA9PiB7XG4gICAgICB0aGlzLmhhbmRsZVRpbWVVcGRhdGUoKVxuICAgIH0pXG4gICAgcGxheWVyLl9yZXBsYXkgPSAoKSA9PiB7XG4gICAgICBwbGF5ZXIubXNlLmRlc3Ryb3koKVxuICAgICAgVm9kVGFzay5jbGVhcigpXG4gICAgICBjb25zdCBfbXNlID0gbmV3IE1TRSgpXG4gICAgICB0aGlzLmZsdlBsYXllci5yZXBsYXkoKVxuXG4gICAgICBtc2Uub24oJ3NvdXJjZW9wZW4nLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuZmx2UGxheWVyLmlzU291cmNlT3BlbiA9IHRydWVcbiAgICAgICAgbXNlLmFwcGVuZEJ1ZmZlcih0aGlzLmZsdlBsYXllci5mdHlwX21vb3YuYnVmZmVyKVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBwbGF5ZXIucGxheSgpXG4gICAgICAgIH0sIDApXG4gICAgICAgIG1zZS5vbigndXBkYXRlZW5kJywgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHtwZW5kaW5nRnJhZ21lbnRzLCBoYXNQZW5kaW5nRnJhZ21lbnRzfSA9IHRoaXMuZmx2UGxheWVyXG4gICAgICAgICAgdGhpcy5pc1NlZWtpbmcgPSBmYWxzZVxuICAgICAgICAgIGlmIChoYXNQZW5kaW5nRnJhZ21lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCBmcmFnbWVudCA9IHBlbmRpbmdGcmFnbWVudHMuc2hpZnQoKVxuICAgICAgICAgICAgaWYgKCFtc2UuYXBwZW5kQnVmZmVyKGZyYWdtZW50LmRhdGEpKSB7XG4gICAgICAgICAgICAgIHBlbmRpbmdGcmFnbWVudHMudW5zaGlmdChmcmFnbWVudClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHBsYXllci5lbWl0KCdjYWNoZXVwZGF0ZScsIHBsYXllcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgICAgbXNlLm9uKCdlcnJvcicsIChlKSA9PiB7XG4gICAgICAgIHBsYXllci5lbWl0KCdlcnJvcicsIGUpXG4gICAgICB9KVxuXG4gICAgICBwbGF5ZXIubXNlID0gbXNlXG4gICAgICBwbGF5ZXIudmlkZW8uc3JjID0gdGhpcy5tc2UudXJsXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHBsYXllci5zd2l0Y2hVUkwgPSAodXJsKSA9PiB7XG4gICAgICB0aGlzLl9vcHRpb25zLnVybCA9IHVybFxuICAgICAgLy8gdGhpcy5mbHZQbGF5ZXIudW5iaW5kRXZlbnRzKClcblxuICAgICAgaWYgKCFwbGF5ZXIuY29uZmlnLmlzTGl2ZSkge1xuICAgICAgICBWb2RUYXNrLmNsZWFyKClcbiAgICAgICAgY29uc3QgdGVtcEZsdlBsYXllciA9IHRoaXMudGVtcEZsdlBsYXllciA9IG5ldyBNYWluUGFyc2VyKHRoaXMuX29wdGlvbnMsIHBsYXllcilcblxuICAgICAgICB0ZW1wRmx2UGxheWVyLmlzU291cmNlT3BlbiA9IHRydWVcbiAgICAgICAgdGVtcEZsdlBsYXllci5pc1RlbXBQbGF5ZXIgPSB0cnVlXG4gICAgICAgIHRoaXMuaW5pdEZsdlBsYXllckV2ZW50cyh0ZW1wRmx2UGxheWVyLCBtc2UpXG4gICAgICAgIHRlbXBGbHZQbGF5ZXIuaGFuZGxlTWVkaWFGcmFnbWVudCA9ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmlzU2Vla2luZyA9IGZhbHNlXG4gICAgICAgICAgdGhpcy51bmJpbmRGbHZQbGF5ZXJFdmVudHModGhpcy5mbHZQbGF5ZXIpXG4gICAgICAgICAgdGhpcy5mbHZQbGF5ZXIuZGVzdHJveSgpXG4gICAgICAgICAgdGhpcy5mbHZQbGF5ZXIgPSB0ZW1wRmx2UGxheWVyXG4gICAgICAgICAgdGhpcy50ZW1wRmx2UGxheWVyID0gbnVsbFxuXG4gICAgICAgICAgbXNlLmFwcGVuZEJ1ZmZlcih0ZW1wRmx2UGxheWVyLmZ0eXBfbW9vdilcbiAgICAgICAgICB0ZW1wRmx2UGxheWVyLmhhbmRsZU1lZGlhRnJhZ21lbnQgPSAoZnJhZ21lbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBtc2UuYXBwZW5kQnVmZmVyKGZyYWdtZW50LmRhdGEpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIHRlbXBGbHZQbGF5ZXIuc3RhcnRMb2FkRGF0YSgpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHVuYmluZEZsdlBsYXllckV2ZW50cyAoZmx2UGxheWVyKSB7XG4gICAgZmx2UGxheWVyLmhhbmRsZVNlZWtFbmQgPSAoKSA9PiBudWxsXG4gICAgZmx2UGxheWVyLmhhbmRsZUVycm9yID0gKCkgPT4gbnVsbFxuICAgIGZsdlBsYXllci5oYW5kbGVNZWRpYUZyYWdtZW50ID0gKCkgPT4gbnVsbFxuICB9XG4gIGluaXRGbHZQbGF5ZXJFdmVudHMgKGZsdlBsYXllciwgbXNlKSB7XG4gICAgY29uc3QgaGFuZGxlRnR5cE1vb3YgPSAoZnR5cE1vb3YpID0+IHtcbiAgICAgIGlmIChmbHZQbGF5ZXIuaXNTb3VyY2VPcGVuICYmICF0aGlzLnRlbXBGbHZQbGF5ZXIpIHtcbiAgICAgICAgbXNlLmFwcGVuZEJ1ZmZlcihmdHlwTW9vdi5idWZmZXIpXG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLmlzQ2hhbmdpbmdTcmMpIHtcbiAgICAgICAgdGhpcy5pc1NlZWtpbmcgPSB0cnVlXG4gICAgICAgIGZsdlBsYXllci5zZWVrKHRoaXMuX3BsYXllci5jdXJyZW50VGltZSlcbiAgICAgIH1cbiAgICB9XG4gICAgZmx2UGxheWVyLm9uY2UoJ3JlYWR5JywgaGFuZGxlRnR5cE1vb3YpXG4gICAgZmx2UGxheWVyLmhhbmRsZVNlZWtFbmQgPSAoKSA9PiB7XG4gICAgICB0aGlzLmlzU2Vla2luZyA9IGZhbHNlXG4gICAgfVxuICAgIGZsdlBsYXllci5oYW5kbGVFcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICB0aGlzLl9wbGF5ZXIuZW1pdCgnZXJyb3InLCBlKVxuICAgIH1cbiAgICBpZiAoIXRoaXMudGVtcEZsdlBsYXllcikge1xuICAgICAgZmx2UGxheWVyLmhhbmRsZU1lZGlhRnJhZ21lbnQgPSAoZnJhZ21lbnQpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGVtcEZsdlBsYXllciA/IGZhbHNlIDogbXNlLmFwcGVuZEJ1ZmZlcihmcmFnbWVudC5kYXRhKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGluaXRNc2VFdmVudHMgKG1zZSkge1xuICAgIG1zZS5vbignZXJyb3InLCAoZSkgPT4ge1xuICAgICAgdGhpcy5fcGxheWVyLmVtaXQoJ2Vycm9yJywgZSlcbiAgICB9KVxuICAgIGNvbnN0IG9uU291cmNlT3BlbiA9ICgpID0+IHtcbiAgICAgIHRoaXMuZmx2UGxheWVyLmlzU291cmNlT3BlbiA9IHRydWVcbiAgICAgIGlmICh0aGlzLmZsdlBsYXllci5mdHlwX21vb3YgIT09IG51bGwpIHtcbiAgICAgICAgbXNlLmFwcGVuZEJ1ZmZlcih0aGlzLmZsdlBsYXllci5mdHlwX21vb3YuYnVmZmVyKVxuICAgICAgfVxuXG4gICAgICBtc2Uub24oJ3VwZGF0ZWVuZCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgeyBwZW5kaW5nRnJhZ21lbnRzLCBoYXNQZW5kaW5nRnJhZ21lbnRzIH0gPSB0aGlzLmZsdlBsYXllclxuXG4gICAgICAgIGlmIChoYXNQZW5kaW5nRnJhZ21lbnRzKSB7XG4gICAgICAgICAgY29uc3QgZnJhZ21lbnQgPSBwZW5kaW5nRnJhZ21lbnRzLnNoaWZ0KClcbiAgICAgICAgICBpZiAoIW1zZS5hcHBlbmRCdWZmZXIoZnJhZ21lbnQuZGF0YSkpIHtcbiAgICAgICAgICAgIHBlbmRpbmdGcmFnbWVudHMudW5zaGlmdChmcmFnbWVudClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcGxheWVyLmVtaXQoJ2NhY2hldXBkYXRlJywgdGhpcy5fcGxheWVyKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgbXNlLm9uKCdzb3VyY2VvcGVuJywgb25Tb3VyY2VPcGVuKVxuICB9XG5cbiAgbG9hZERhdGEgKGN1cnJlbnRUaW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuZmx2UGxheWVyLmxvYWRTZWdtZW50cyh0cnVlLCBjdXJyZW50VGltZSwgdGhpcy5fb3B0aW9ucy5wcmVsb2FkVGltZSlcbiAgfVxuXG4gIHByb2dyZXNzQ2hlY2tlciAocGxheWVyKSB7XG4gICAgY29uc3QgeyBtaW5DYWNoZWRUaW1lLCBwcmVsb2FkVGltZSB9ID0gdGhpcy5fb3B0aW9uc1xuICAgIGNvbnN0IHJhbmdlID0gcGxheWVyLmdldEJ1ZmZlcmVkUmFuZ2UoKVxuICAgIGlmICh0aGlzLmZsdlBsYXllci52aWRlb0R1cmF0aW9uIC0gcmFuZ2VbMV0gKiB0aGlzLmZsdlBsYXllci52aWRlb1RpbWVTY2FsZSA8IDAuMSAqIHRoaXMuZmx2UGxheWVyLnZpZGVvVGltZVNjYWxlKSB7IHJldHVybiB9XG4gICAgaWYgKHJhbmdlWzFdIC0gcGxheWVyLmN1cnJlbnRUaW1lIDwgbWluQ2FjaGVkVGltZSAmJiAhdGhpcy5pc0RhdGFMb2FkaW5nKSB7XG4gICAgICB0aGlzLmlzRGF0YUxvYWRpbmcgPSB0cnVlXG4gICAgICB0aGlzLmZsdlBsYXllci5sb2FkU2VnbWVudHModHJ1ZSwgcGxheWVyLmN1cnJlbnRUaW1lLCBwcmVsb2FkVGltZSkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuaXNEYXRhTG9hZGluZyA9IGZhbHNlXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBjbGVhclBsYXllckNhY2hlICgpIHtcbiAgICBjb25zdCByYW5nZSA9IHRoaXMuX3BsYXllci5nZXRCdWZmZXJlZFJhbmdlKClcbiAgICBpZiAocmFuZ2UubGVuZ3RoID09PSAyKSB7XG4gICAgICAvLyB0aGlzLm1zZS5yZW1vdmVCdWZmZXIocmFuZ2VbMF0sIHJhbmdlWzFdKVxuICAgIH1cbiAgfVxuICBpc0VuZGVkIChwbGF5ZXIsIGZsdikge1xuICAgIGlmIChmbHYudmlkZW9EdXJhdGlvbiAtIHBsYXllci5jdXJyZW50VGltZSAqIGZsdi52aWRlb1RpbWVTY2FsZSA8IDIgKiBmbHYudmlkZW9UaW1lU2NhbGUpIHtcbiAgICAgIGNvbnN0IHJhbmdlID0gcGxheWVyLmdldEJ1ZmZlcmVkUmFuZ2UoKVxuICAgICAgaWYgKHBsYXllci5jdXJyZW50VGltZSAtIHJhbmdlWzFdIDwgMC4xKSB7XG4gICAgICAgIHRoaXMubXNlLmVuZE9mU3RyZWFtKClcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZGVzdHJveSAoKSB7XG4gICAgVm9kVGFzay5jbGVhcigpXG4gICAgdGhpcy5fb3B0aW9ucyA9IHt9XG4gICAgdGhpcy5tc2UgPSBudWxsXG4gICAgdGhpcy5pc1NlZWtpbmcgPSBmYWxzZVxuICAgIHRoaXMuaXNEYXRhTG9hZGluZyA9IGZhbHNlXG4gICAgdGhpcy50ZW1wQ3VycmVudFRpbWUgPSAwXG4gICAgdGhpcy50ZW1wRmx2UGxheWVyID0gbnVsbFxuICAgIHRoaXMuaXNDaGFuZ2luZ1NyYyA9IGZhbHNlXG4gICAgdGhpcy5oYW5kbGVUaW1lVXBkYXRlID0gKCkgPT4ge31cbiAgICB0aGlzLmhhbmRsZVNlZWtpbmcgPSAoKSA9PiB7fVxuICAgIHRoaXMuZmx2UGxheWVyLmRlc3Ryb3koKVxuICAgIHRoaXMuX3BsYXllci5wYXVzZSgpXG4gIH1cbiAgZ2V0IGlzU2Vla2FibGUgKCkge1xuICAgIHJldHVybiB0aGlzLmZsdlBsYXllci5pc1NlZWthYmxlXG4gIH1cbn1cbiIsImNvbnN0IGdldERlZmF1bHRDb25mID0gKCkgPT4gKHtcbiAgcHJlbG9hZFRpbWU6IDMwLFxuICBtaW5DYWNoZWRUaW1lOiA1LFxuICBhdXRvQ2xlYW5Tb3VyY2VCdWZmZXI6IHRydWUsXG4gIGF1dG9DbGVhbk1heEJhY2tUaW1lOiAzMCxcbiAgaXNMaXZlOiBmYWxzZSxcbiAgY29yczogdHJ1ZVxufSlcblxuZXhwb3J0IGRlZmF1bHQgZ2V0RGVmYXVsdENvbmZcbiIsImNvbnN0IGZpZWxkcyA9IFt7XG4gIG5hbWU6ICdkdXJhdGlvbicsXG4gIHR5cGU6IEJvb2xlYW4sXG4gIHBhcnNlciAodGFyZ2V0LCBvcmlnaW4pIHtcbiAgICB0YXJnZXQubWVkaWFJbmZvLmR1cmF0aW9uID0gb3JpZ2luLmR1cmF0aW9uXG4gIH1cbn0sIHtcbiAgbmFtZTogJ2hhc0F1ZGlvJyxcbiAgdHlwZTogQm9vbGVhbixcbiAgcGFyc2VyICh0YXJnZXQsIG9yaWdpbikge1xuICAgIHRhcmdldC5tZWRpYUluZm8uaGFzQXVkaW8gPSBvcmlnaW4uaGFzQXVkaW9cbiAgfVxufSwge1xuICBuYW1lOiAnaGFzVmlkZW8nLFxuICB0eXBlOiBCb29sZWFuLFxuICBwYXJzZXIgKHRhcmdldCwgb3JpZ2luKSB7XG4gICAgdGFyZ2V0Lm1lZGlhSW5mby5oYXNWaWRlbyA9IG9yaWdpbi5oYXNWaWRlb1xuICB9XG59LCB7XG4gIG5hbWU6ICdhdWRpb2RhdGFyYXRlJyxcbiAgdHlwZTogTnVtYmVyLFxuICBwYXJzZXIgKHRhcmdldCwgb3JpZ2luKSB7XG4gICAgdGFyZ2V0Lm1lZGlhSW5mby5hdWRpb0RhdGFSYXRlID0gb3JpZ2luLmF1ZGlvZGF0YXJhdGVcbiAgfVxufSwge1xuICBuYW1lOiAndmlkZW9kYXRhcmF0ZScsXG4gIHR5cGU6IE51bWJlcixcbiAgcGFyc2VyICh0YXJnZXQsIG9yaWdpbikge1xuICAgIHRhcmdldC5tZWRpYUluZm8udmlkZW9EYXRhUmF0ZSA9IG9yaWdpbi52aWRlb2RhdGFyYXRlXG4gIH1cbn0sIHtcbiAgbmFtZTogJ3dpZHRoJyxcbiAgdHlwZTogTnVtYmVyLFxuICBwYXJzZXIgKHRhcmdldCwgb3JpZ2luKSB7XG4gICAgdGFyZ2V0Lm1lZGlhSW5mby53aWR0aCA9IG9yaWdpbi53aWR0aFxuICB9XG59LCB7XG4gIG5hbWU6ICdoZWlnaHQnLFxuICB0eXBlOiBOdW1iZXIsXG4gIHBhcnNlciAodGFyZ2V0LCBvcmlnaW4pIHtcbiAgICB0YXJnZXQubWVkaWFJbmZvLmhlaWdodCA9IG9yaWdpbi5oZWlnaHRcbiAgfVxufSwge1xuICBuYW1lOiAnZHVyYXRpb24nLFxuICB0eXBlOiBOdW1iZXIsXG4gIHBhcnNlciAodGFyZ2V0LCBvcmlnaW4pIHtcbiAgICBpZiAoIXRhcmdldC5zdGF0ZS5kdXJhdGlvbikge1xuICAgICAgY29uc3QgZHVyYXRpb24gPSBNYXRoLmZsb29yKG9yaWdpbi5kdXJhdGlvbiAqIHRhcmdldC5zdGF0ZS50aW1lU2NhbGUpXG4gICAgICB0YXJnZXQuc3RhdGUuZHVyYXRpb24gPSB0YXJnZXQubWVkaWFJbmZvLmR1cmF0aW9uID0gZHVyYXRpb25cbiAgICB9XG4gIH0sXG4gIG9uVHlwZUVyciAodGFyZ2V0KSB7XG4gICAgdGFyZ2V0Lm1lZGlhSW5mby5kdXJhdGlvbiA9IDBcbiAgfVxufSwge1xuICBuYW1lOiAnZnJhbWVyYXRlJyxcbiAgdHlwZTogTnVtYmVyLFxuICBwYXJzZXIgKHRhcmdldCwgb3JpZ2luKSB7XG4gICAgY29uc3QgZnBzTnVtID0gTWF0aC5mbG9vcihvcmlnaW4uZnJhbWVyYXRlICogMTAwMClcbiAgICBpZiAoZnBzTnVtID4gMCkge1xuICAgICAgY29uc3QgZnBzID0gZnBzTnVtIC8gMTAwMFxuICAgICAgY29uc3QgeyByZWZlckZyYW1lUmF0ZSwgbWVkaWFJbmZvIH0gPSB0YXJnZXRcbiAgICAgIHJlZmVyRnJhbWVSYXRlLmZpeGVkID0gdHJ1ZVxuICAgICAgcmVmZXJGcmFtZVJhdGUuZnBzID0gZnBzXG4gICAgICByZWZlckZyYW1lUmF0ZS5mcHNOdW0gPSBmcHNOdW1cbiAgICAgIHJlZmVyRnJhbWVSYXRlLmZwc0RlbiA9IDEwMDBcbiAgICAgIG1lZGlhSW5mby5mcHMgPSBmcHNcbiAgICB9XG4gIH1cbn0sIHtcbiAgbmFtZTogJ2tleWZyYW1lcycsXG4gIHR5cGU6IE9iamVjdCxcbiAgcGFyc2VyICh0YXJnZXQsIG9yaWdpbikge1xuICAgIGNvbnN0IHsga2V5ZnJhbWVzIH0gPSBvcmlnaW5cbiAgICB0YXJnZXQubWVkaWFJbmZvLmhhc0tleWZyYW1lcyA9ICEha2V5ZnJhbWVzXG4gICAgaWYgKGtleWZyYW1lcykge1xuICAgICAgdGFyZ2V0Lm1lZGlhSW5mby5rZXlmcmFtZXMgPSB0aGlzLl9wYXJzZUtleWZyYW1lcyhrZXlmcmFtZXMpXG4gICAgfVxuICAgIG9yaWdpbi5rZXlmcmFtZXMgPSBudWxsXG4gIH0sXG4gIG9uVHlwZUVyciAodGFyZ2V0KSB7XG4gICAgdGFyZ2V0Lm1lZGlhSW5mby5oYXNLZXlmcmFtZXMgPSBmYWxzZVxuICB9XG59XVxuZXhwb3J0IGRlZmF1bHQgZmllbGRzXG4iLCJleHBvcnQgY29uc3QgTWV0YVR5cGVzID0ge1xuICBOVU1CRVI6IDAsXG4gIEJPT0xFQU46IDEsXG4gIFNUUklORzogMixcbiAgT0JKRUNUOiAzLFxuICBNSVhfQVJSQVk6IDgsXG4gIE9CSkVDVF9FTkQ6IDksXG4gIFNUUklDVF9BUlJBWTogMTAsXG4gIERBVEU6IDExLFxuICBMT05FX1NUUklORzogMTJcbn1cblxuZXhwb3J0IGNvbnN0IEV2ZW50VHlwZXMgPSB7XG4gIERBVEFfUkVBRFk6ICdkYXRhX3JlYWR5JyxcbiAgTUVUQV9EQVRBX1JFQURZOiAnbWV0YV9kYXRhX3JlYWR5JyxcbiAgVFJBQ0tfTUVUQV9SRUFEWTogJ3RyYWNrX21ldGFfcmVhZHknLFxuICBNRURJQV9JTkZPX1JFQURZOiAnbWVkaWFfaW5mb19yZWFkeScsXG4gIE1FVEFfRU5EX1BPU0lUSU9OOiAnbWV0YV9lbmRfcG9zaXRpb24nLFxuICBFUlJPUjogJ2Vycm9yJ1xufVxuXG5leHBvcnQgY29uc3Qgc291bmRSYXRlVHlwZXMgPSBbXG4gIDU1MDAsXG4gIDExMDAwLFxuICAyMjAwMCxcbiAgNDQwMFxuXVxuXG5leHBvcnQgY29uc3QgQXVkaW9PYmplY3RUeXBlcyA9IHtcbiAgMDogJ051bGwnLFxuICAxOiAnQUFDIE1haW4nLFxuICAyOiAnQUFDIExDJyxcbiAgMzogJ0FBQyBTU1IoU2NhbGFibGUgU2FtcGxlIFJhdGUpJyxcbiAgNDogJ0FBQyBMVFAoTG9uZyBUZXJtIFByZWRpY3Rpb24pJyxcbiAgNTogJ0hFLUFBQyAvIFNCUihTcGVjdHJhbCBCYW5kIFJlcGxpY2F0aW9uKScsXG4gIDY6ICdBQUMgU2NhbGFibGUnXG59XG5cbmV4cG9ydCBjb25zdCBzYW1wbGluZ0ZyZXF1ZW5jeVR5cGVzID0gW1xuICA5NjAwMCwgODgyMDAsXG4gIDY0MDAwLCA0ODAwMCxcbiAgNDQxMDAsIDMyMDAwLFxuICAyNDAwMCwgMjIwNTAsXG4gIDE2MDAwLCAxMjAwMCxcbiAgMTEwMjUsIDgwMDBcbl1cblxuZXhwb3J0IGNvbnN0IGJyb3dzZXJUeXBlcyA9IHtcbiAgSUU6ICdpZScsXG4gIEZJUkVfRk9YOiAnZmlyZWZveCcsXG4gIENIUk9NRTogJ2Nocm9tZScsXG4gIE9QRVJBOiAnb3BlcmEnLFxuICBTQUZBUkk6ICdzYWZhcmknXG59XG5cbmV4cG9ydCBjb25zdCBtcDNWZXJzaW9ucyA9IHtcbiAgVjI1OiAwLFxuICBSRVNFUlZFRDogMSxcbiAgVjIwOiAyLFxuICBWMTA6IDNcbn1cblxuZXhwb3J0IGNvbnN0IGF1ZGlvU2FtcGxlUmF0ZSA9IHtcbiAgVjEwOiBbNDQxMDAsIDQ4MDAwLCAzMjAwMCwgMF0sXG4gIFYyMDogWzIyMDUwLCAyNDAwMCwgMTYwMDAsIDBdLFxuICBWMjU6IFsxMTAyNSwgMTIwMDAsIDgwMDAsIDBdXG59XG5cbmV4cG9ydCBjb25zdCBtcDNCaXRSYXRlID0ge1xuICBMYXllcjE6IFswLCAzMiwgNjQsIDk2LCAxMjgsIDE2MCwgMTkyLCAyMjQsIDI1NiwgMjg4LCAzMjAsIDM1MiwgMzg0LCA0MTYsIDQ0OCwgLTFdLFxuICBMYXllcjI6IFswLCAzMiwgNDgsIDU2LCA2NCwgODAsIDk2LCAxMTIsIDEyOCwgMTYwLCAxOTIsIDIyNCwgMjU2LCAzMjAsIDM4NCwgLTFdLFxuICBMYXllcjM6IFswLCAzMiwgNDAsIDQ4LCA1NiwgNjQsIDgwLCA5NiwgMTEyLCAxMjgsIDE2MCwgMTkyLCAyMjQsIDI1NiwgMzIwLCAtMV1cbn1cbiIsImltcG9ydCBQbGF5ZXIgZnJvbSAneGdwbGF5ZXInXG5pbXBvcnQgVm9kVGFzayBmcm9tICcuL3Rhc2tzL1ZvZFRhc2snXG5pbXBvcnQgRmx2IGZyb20gJy4vRmx2J1xuXG5jbGFzcyBGbHZQbGF5ZXIgZXh0ZW5kcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvciAob3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLl9fZmx2X18gPSBudWxsXG4gICAgdGhpcy5pbml0KG9wdGlvbnMpXG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3NyYycsIHtcbiAgICAgIHNldDogKHZhbCkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgJiYgdmFsLnN0YXJ0c1dpdGgoJ2Jsb2I6JykpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9vcHRpb25zLnVybCA9IHZhbFxuICAgICAgICB0aGlzLl9fZmx2X18uZGVzdHJveSgpXG4gICAgICAgIHRoaXMuX19mbHZfXyA9IG5ldyBGbHYodGhpcy5fb3B0aW9ucywgdGhpcylcbiAgICAgICAgdGhpcy5fX2Zsdl9fLmxvYWQoKVxuICAgICAgICB0aGlzLnZpZGVvLnNyYyA9IHRoaXMuX19mbHZfXy5tc2UudXJsXG4gICAgICAgIHRoaXMuY3VycmVudFRpbWUgPSAwXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMucGxheSgpXG4gICAgICAgIH0sIDApXG4gICAgICB9LFxuICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vcHRpb25zLnVybFxuICAgICAgfSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pXG5cbiAgICBpZiAob3B0aW9ucy5hdXRvcGxheSkge1xuICAgICAgdGhpcy5zdGFydCgpXG4gICAgfVxuICB9XG5cbiAgaW5pdCAob3B0aW9ucykge1xuICAgIGNvbnN0IHBsYXllciA9IHRoaXNcbiAgICBjb25zdCB7IGlzTGl2ZSB9ID0gb3B0aW9uc1xuICAgIHBsYXllci5fX2Zsdl9fID0gbmV3IEZsdihvcHRpb25zLCBwbGF5ZXIpXG4gICAgcGxheWVyLm9uY2UoJ2NvbXBsZXRlJywgKCkgPT4ge1xuICAgICAgcGxheWVyLmNyZWF0ZUluc3RhbmNlKHBsYXllci5fX2Zsdl9fKVxuICAgIH0pXG4gICAgcGxheWVyLm9uKCdwYXVzZScsICgpID0+IHtcbiAgICAgICFpc0xpdmUgJiYgVm9kVGFzay5jbGVhcigpXG4gICAgfSlcbiAgICB0aGlzLm9uY2UoJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgICBWb2RUYXNrLmNsZWFyKClcbiAgICAgIHBsYXllci5fX2Zsdl9fLmRlc3Ryb3koKVxuICAgICAgcGxheWVyLl9fZmx2X18ubXNlID0gbnVsbFxuICAgICAgcGxheWVyLnZpZGVvLnNyYyA9ICcnXG4gICAgICBwbGF5ZXIuX19mbHZfXyA9IG51bGxcbiAgICB9KVxuICB9XG5cbiAgY3JlYXRlSW5zdGFuY2UgKGZsdikge1xuICAgIGNvbnN0IHBsYXllciA9IHRoaXNcbiAgICBpZiAodGhpcy5fb3B0aW9ucy5pc0xpdmUpIHtcbiAgICAgIFBsYXllci51dGlsLmFkZENsYXNzKHBsYXllci5yb290LCAneGdwbGF5ZXItaXMtbGl2ZScpXG4gICAgICBjb25zdCBsaXZlID0gUGxheWVyLnV0aWwuY3JlYXRlRG9tKCd4Zy1saXZlJywgJ+ato+WcqOebtOaSrScsIHt9LCAneGdwbGF5ZXItbGl2ZScpXG4gICAgICBwbGF5ZXIuY29udHJvbHMuYXBwZW5kQ2hpbGQobGl2ZSlcbiAgICB9XG4gICAgZmx2LmxvYWQoKVxuICB9XG5cbiAgc3RhcnQgKCkge1xuICAgIGlmICghdGhpcy5pbml0ZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCBmbHZQbGF5ZXIgPSB0aGlzLl9fZmx2X19cbiAgICBzdXBlci5zdGFydChmbHZQbGF5ZXIubXNlLnVybClcbiAgICB0aGlzLnNyYyA9IGZsdlBsYXllci5tc2UudXJsXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGdldCBpbml0ZWQgKCkge1xuICAgIHJldHVybiB0aGlzLl9fZmx2X18gIT09IHVuZGVmaW5lZFxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRmx2UGxheWVyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNZWRpYUluZm8ge1xuICAgIGNvbnN0cnVjdG9yIChkYXRhKSB7XG4gICAgICAgIGNvbnN0IF9kZWZhdWx0ID0ge1xuICAgICAgICAgICAgbWltZVR5cGU6IG51bGwsXG4gICAgICAgICAgICBjb2RlYzogJycsXG4gICAgICAgICAgICBkdXJhdGlvbjogbnVsbCxcbiAgICAgICAgICAgIGhhc0F1ZGlvOiBmYWxzZSxcbiAgICAgICAgICAgIGhhc1ZpZGVvOiBmYWxzZSxcbiAgICAgICAgICAgIGF1ZGlvQ29kZWM6IG51bGwsXG4gICAgICAgICAgICB2aWRlb0NvZGVjOiBudWxsLFxuXG4gICAgICAgICAgICB2aWRlb0RhdGFSYXRlOiBudWxsLFxuICAgICAgICAgICAgYXVkaW9EYXRhUmF0ZTogbnVsbCxcbiAgICAgICAgICAgIGF1ZGlvU2FtcGxlUmF0ZTogbnVsbCxcbiAgICAgICAgICAgIGF1ZGlvQ2hhbm5lbENvdW50OiBudWxsLFxuICAgICAgICAgICAgYXVkaW9Db25maWc6IG51bGwsXG5cbiAgICAgICAgICAgIHdpZHRoOiBudWxsLFxuICAgICAgICAgICAgaGVpZ2h0OiBudWxsLFxuICAgICAgICAgICAgZnBzOiBudWxsLFxuICAgICAgICAgICAgcHJvZmlsZTogbnVsbCxcbiAgICAgICAgICAgIGxldmVsOiBudWxsLFxuICAgICAgICAgICAgY2hyb21hRm9ybWF0OiBudWxsLFxuXG4gICAgICAgICAgICBwaXhlbFJhdGlvOiBbXSxcblxuICAgICAgICAgICAgX21ldGFEYXRhOiBudWxsLFxuICAgICAgICAgICAgc2VnbWVudHM6IFtdLFxuICAgICAgICAgICAgaGFzS2V5ZnJhbWVzOiBudWxsLFxuICAgICAgICAgICAga2V5ZnJhbWVzOiBbXSxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBpbml0RGF0YSA9ICBPYmplY3QuYXNzaWduKHt9LCBfZGVmYXVsdCwgZGF0YSk7XG4gICAgICAgIE9iamVjdC5lbnRyaWVzKGluaXREYXRhKS5mb3JFYWNoKChbaywgdl0pPT4ge1xuICAgICAgICAgICAgdGhpc1trXSA9IHY7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuICAgIGdldCBpc0NvbXBsZXRlICgpIHtcbiAgICAgICAgY29uc3QgeyBtaW1lVHlwZSwgZHVyYXRpb24sIGhhc0tleWZyYW1lcyB9ID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG1pbWVUeXBlICE9PSBudWxsXG4gICAgICAgICAgICAmJiBkdXJhdGlvbiAhPT0gbnVsbFxuICAgICAgICAgICAgJiYgaGFzS2V5ZnJhbWVzICE9PSBudWxsXG4gICAgICAgICAgICAmJiB0aGlzLmlzVmlkZW9JbmZvRmlsbGVkXG4gICAgICAgICAgICAmJiB0aGlzLmlzQXVkaW9JbmZvRmlsbGVkO1xuICAgIH1cbiAgICBnZXQgaXNBdWRpb0luZm9GaWxsZWQgKCkge1xuICAgICAgICBjb25zdCB7IGhhc0F1ZGlvLFxuICAgICAgICAgICAgYXVkaW9Db2RlYyxcbiAgICAgICAgICAgIGF1ZGlvU2FtcGxlUmF0ZSxcbiAgICAgICAgICAgIGF1ZGlvQ2hhbm5lbENvdW50LFxuICAgICAgICB9ID0gdGhpcztcblxuICAgICAgICByZXR1cm4gISEoIWhhc0F1ZGlvIHx8IChoYXNBdWRpbyAmJiBhdWRpb0NvZGVjICYmIGF1ZGlvU2FtcGxlUmF0ZSAmJiBhdWRpb0NoYW5uZWxDb3VudCkpO1xuXG4gICAgfVxuXG4gICAgZ2V0IGlzVmlkZW9JbmZvRmlsbGVkICgpIHtcbiAgICAgICAgY29uc3Qgbm90TnVsbEZpZWxkcyA9IFtcbiAgICAgICAgICAgICd2aWRlb0NvZGVjJyxcbiAgICAgICAgICAgICd3aWR0aCcsXG4gICAgICAgICAgICAnaGVpZ2h0JyxcbiAgICAgICAgICAgICdmcHMnLFxuICAgICAgICAgICAgJ3Byb2ZpbGUnLFxuICAgICAgICAgICAgJ2xldmVsJyxcbiAgICAgICAgICAgICdjaHJvbWFGb3JtYXQnLFxuICAgICAgICBdO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gbm90TnVsbEZpZWxkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXNbbm90TnVsbEZpZWxkc1tpXV0gPT09IG51bGwpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5oYXNWaWRlbztcbiAgICB9XG5cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNZWRpYVNhbXBsZSB7XG4gICAgY29uc3RydWN0b3IgKGluZm8pIHtcbiAgICAgICAgbGV0IF9kZWZhdWx0ID0gTWVkaWFTYW1wbGUuZ2V0RGVmYXVsdEluZigpO1xuXG4gICAgICAgIGlmICghaW5mbyB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5mbykgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICAgICAgICByZXR1cm4gX2RlZmF1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNhbXBsZSA9IE9iamVjdC5hc3NpZ24oe30sIF9kZWZhdWx0LCBpbmZvKTtcblxuICAgICAgICBPYmplY3QuZW50cmllcyhzYW1wbGUpLmZvckVhY2goKFtrLCB2XSkgPT4ge1xuICAgICAgICAgICAgdGhpc1trXSA9IHY7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgc3RhdGljIGdldERlZmF1bHRJbmYgKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZHRzOiBudWxsLFxuICAgICAgICAgICAgcHRzOiBudWxsLFxuICAgICAgICAgICAgZHVyYXRpb246IG51bGwsXG4gICAgICAgICAgICBwb3NpdGlvbjogbnVsbCxcbiAgICAgICAgICAgIGlzUkFQOiBmYWxzZSwgLy8gaXMgUmFuZG9tIGFjY2VzcyBwb2ludFxuICAgICAgICAgICAgb3JpZ2luRHRzOiBudWxsLFxuICAgICAgICB9O1xuICAgIH1cblxufVxuXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNZWRpYVNlZ21lbnQge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgdGhpcy5zdGFydER0cyA9IC0xO1xuICAgICAgICB0aGlzLmVuZER0cyA9IC0xO1xuICAgICAgICB0aGlzLnN0YXJ0UHRzID0gLTE7XG4gICAgICAgIHRoaXMuZW5kUHRzID0gLTE7XG4gICAgICAgIHRoaXMub3JpZ2luU3RhcnREdHMgPSAtMTtcbiAgICAgICAgdGhpcy5vcmlnaW5FbmREdHMgPSAtMTtcbiAgICAgICAgdGhpcy5yYW5kb21BY2Nlc3NQb2ludHMgPSBbXTtcbiAgICAgICAgdGhpcy5maXJzdFNhbXBsZSA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdFNhbXBsZSA9IG51bGw7XG4gICAgfVxuXG4gICAgYWRkUkFQIChzYW1wbGUpIHtcbiAgICAgICAgc2FtcGxlLmlzUkFQID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yYW5kb21BY2Nlc3NQb2ludHMucHVzaChzYW1wbGUpO1xuICAgIH1cbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBNZWRpYVNlZ21lbnRMaXN0IHtcblxuICAgIGNvbnN0cnVjdG9yICh0eXBlKSB7XG4gICAgICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLl9saXN0ID0gW107XG4gICAgICAgIHRoaXMuX2xhc3RBcHBlbmRMb2NhdGlvbiA9IC0xOyAvLyBjYWNoZWQgbGFzdCBpbnNlcnQgbG9jYXRpb25cbiAgICB9XG5cbiAgICBnZXQgdHlwZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90eXBlO1xuICAgIH1cblxuICAgIGdldCBsZW5ndGggKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGlzdC5sZW5ndGg7XG4gICAgfVxuXG4gICAgaXNFbXB0eSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0Lmxlbmd0aCA9PT0gMDtcbiAgICB9XG5cbiAgICBjbGVhciAoKSB7XG4gICAgICAgIHRoaXMuX2xpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5fbGFzdEFwcGVuZExvY2F0aW9uID0gLTE7XG4gICAgfVxuXG4gICAgX3NlYXJjaE5lYXJlc3RTZWdtZW50QmVmb3JlIChiZWdpbkR0cykge1xuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuX2xpc3Q7XG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIC0yO1xuICAgICAgICB9XG4gICAgICAgIGxldCBsYXN0ID0gbGlzdC5sZW5ndGggLSAxO1xuICAgICAgICBsZXQgbWlkID0gMDtcbiAgICAgICAgbGV0IGxib3VuZCA9IDA7XG4gICAgICAgIGxldCB1Ym91bmQgPSBsYXN0O1xuXG4gICAgICAgIGxldCBpZHggPSAwO1xuXG4gICAgICAgIGlmIChiZWdpbkR0cyA8IGxpc3RbMF0ub3JpZ2luRHRzKSB7XG4gICAgICAgICAgICBpZHggPSAtMTtcbiAgICAgICAgICAgIHJldHVybiBpZHg7XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAobGJvdW5kIDw9IHVib3VuZCkge1xuICAgICAgICAgICAgbWlkID0gbGJvdW5kICsgTWF0aC5mbG9vcigodWJvdW5kIC0gbGJvdW5kKSAvIDIpO1xuICAgICAgICAgICAgaWYgKG1pZCA9PT0gbGFzdCB8fCAoYmVnaW5EdHMgPiBsaXN0W21pZF0ubGFzdFNhbXBsZS5vcmlnaW5EdHNcbiAgICAgICAgICAgICAgICAgICAgJiYgKGJlZ2luRHRzIDwgbGlzdFttaWQgKyAxXS5vcmlnaW5EdHMpKSkge1xuICAgICAgICAgICAgICAgIGlkeCA9IG1pZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGlzdFttaWRdLm9yaWdpbkR0cyA8IGJlZ2luRHRzKSB7XG4gICAgICAgICAgICAgICAgbGJvdW5kID0gbWlkICsgMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdWJvdW5kID0gbWlkIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaWR4O1xuICAgIH1cblxuICAgIF9zZWFyY2hOZWFyZXN0U2VnbWVudEFmdGVyIChiZWdpbkR0cykge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUoYmVnaW5EdHMpICsgMTtcbiAgICB9XG5cbiAgICBhcHBlbmQgKHNlZ21lbnQpIHtcbiAgICAgICAgbGV0IGxpc3QgPSB0aGlzLl9saXN0O1xuICAgICAgICBsZXQgbGFzdEFwcGVuZElkeCA9IHRoaXMuX2xhc3RBcHBlbmRMb2NhdGlvbjtcbiAgICAgICAgbGV0IGluc2VydElkeCA9IDA7XG5cbiAgICAgICAgaWYgKGxhc3RBcHBlbmRJZHggIT09IC0xICYmIGxhc3RBcHBlbmRJZHggPCBsaXN0Lmxlbmd0aFxuICAgICAgICAgICAgJiYgc2VnbWVudC5vcmlnaW5TdGFydER0cyA+PSBsaXN0W2xhc3RBcHBlbmRJZHhdLmxhc3RTYW1wbGUub3JpZ2luRHRzXG4gICAgICAgICAgICAmJiAoKGxhc3RBcHBlbmRJZHggPT09IGxpc3QubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgICAgICB8fCAobGFzdEFwcGVuZElkeCA8IGxpc3QubGVuZ3RoIC0gMVxuICAgICAgICAgICAgICAgICAgICAmJiBzZWdtZW50Lm9yaWdpblN0YXJ0RHRzIDwgbGlzdFtsYXN0QXBwZW5kSWR4ICsgMV0ub3JpZ2luU3RhcnREdHMpKSkge1xuICAgICAgICAgICAgaW5zZXJ0SWR4ID0gbGFzdEFwcGVuZElkeCArIDE7IC8vIHVzZSBjYWNoZWQgbG9jYXRpb24gaWR4XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAobGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaW5zZXJ0SWR4ID0gdGhpcy5fc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUoc2VnbWVudC5vcmlnaW5TdGFydER0cykgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbGFzdEFwcGVuZExvY2F0aW9uID0gaW5zZXJ0SWR4O1xuICAgICAgICB0aGlzLl9saXN0LnNwbGljZShpbnNlcnRJZHgsIDAsIHNlZ21lbnQpO1xuICAgIH1cblxuICAgIGdldExhc3RTZWdtZW50QmVmb3JlIChiZWdpbkR0cykge1xuICAgICAgICBsZXQgaWR4ID0gdGhpcy5fc2VhcmNoTmVhcmVzdFNlZ21lbnRCZWZvcmUoYmVnaW5EdHMpO1xuICAgICAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0W2lkeF07XG4gICAgICAgIH0gZWxzZSB7IC8vIC0xXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldExhc3RTYW1wbGVCZWZvcmUgKGJlZ2luRHRzKSB7XG4gICAgICAgIGxldCBzZWdtZW50ID0gdGhpcy5nZXRMYXN0U2VnbWVudEJlZm9yZShiZWdpbkR0cyk7XG4gICAgICAgIGlmIChzZWdtZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VnbWVudC5sYXN0U2FtcGxlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRMYXN0UkFQQmVmb3JlIChiZWdpbkR0cykge1xuICAgICAgICBsZXQgc2VnbWVudElkeCA9IHRoaXMuX3NlYXJjaE5lYXJlc3RTZWdtZW50QmVmb3JlKGJlZ2luRHRzKTtcbiAgICAgICAgbGV0IHJhbmRvbUFjY2Vzc1BvaW50cyA9IHRoaXMuX2xpc3Rbc2VnbWVudElkeF0ucmFuZG9tQWNjZXNzUG9pbnRzO1xuICAgICAgICB3aGlsZSAocmFuZG9tQWNjZXNzUG9pbnRzLmxlbmd0aCA9PT0gMCAmJiBzZWdtZW50SWR4ID4gMCkge1xuICAgICAgICAgICAgc2VnbWVudElkeC0tO1xuICAgICAgICAgICAgcmFuZG9tQWNjZXNzUG9pbnRzID0gdGhpcy5fbGlzdFtzZWdtZW50SWR4XS5yYW5kb21BY2Nlc3NQb2ludHM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJhbmRvbUFjY2Vzc1BvaW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gcmFuZG9tQWNjZXNzUG9pbnRzW3JhbmRvbUFjY2Vzc1BvaW50cy5sZW5ndGggLSAxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG59IiwiaW1wb3J0IE1lZGlhSW5mbyBmcm9tICcuL01lZGlhSW5mbydcbmltcG9ydCBzbmlmZmVyIGZyb20gJy4uL3V0aWxzL3NuaWZmZXInXG5jbGFzcyBTdG9yZSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcblxuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzTGU6IHNuaWZmZXIuaXNMZSxcbiAgICAgIF9oYXNBdWRpbzogZmFsc2UsXG4gICAgICBfaGFzVmlkZW86IGZhbHNlLFxuICAgICAgX21lZGlhSW5mbzogbmV3IE1lZGlhSW5mbygpLFxuICAgICAgX21ldGFEYXRhOiBudWxsLFxuICAgICAgX3ZpZGVvVHJhY2s6IHt0eXBlOiAndmlkZW8nLCBpZDogMSwgc2FtcGxlczogW10sIGxlbmd0aDogMH0sXG4gICAgICBfYXVkaW9UcmFjazoge3R5cGU6ICdhdWRpbycsIGlkOiAyLCBzYW1wbGVzOiBbXSwgbGVuZ3RoOiAwfSxcbiAgICAgIF92aWRlb01ldGFEYXRhOiBudWxsLFxuICAgICAgX2F1ZGlvTWV0YURhdGE6IG51bGwsXG4gICAgICBfYXVkaW9Jbml0aWFsTWV0YWRhdGFEaXNwYXRjaGVkOiBmYWxzZSxcbiAgICAgIF92aWRlb0luaXRpYWxNZXRhZGF0YURpc3BhdGNoZWQ6IGZhbHNlLFxuICAgICAgdGFnczogW10sXG4gICAgICB0aW1lU3RhbXBCYXNlOiAwLFxuICAgICAgaGFzVmlkZW9GbGFnT3ZlcnJpZGVkOiBmYWxzZSxcbiAgICAgIGhhc0F1ZGlvRmxhZ092ZXJyaWRlZDogZmFsc2UsXG4gICAgICB0aW1lU2NhbGU6IDEwMDAsXG4gICAgICBkdXJhdGlvbjogMCxcbiAgICAgIGlzTGl2ZTogZmFsc2UsXG4gICAgICBkdXJhdGlvbk92ZXJyaWRlZDogZmFsc2UsXG4gICAgICBuYWx1TGVuZ3RoU2l6ZTogNCxcbiAgICAgIF9yZWZlckZyYW1lUmF0ZToge1xuICAgICAgICBmaXhlZDogdHJ1ZSxcbiAgICAgICAgZnBzOiAyMy45NzYsXG4gICAgICAgIGZwc051bTogMjM5NzYsXG4gICAgICAgIGZwc0RlbjogMTAwMFxuICAgICAgfSxcbiAgICAgIG1ldGFFbmRQb3NpdGlvbjogLTFcbiAgICB9XG5cbiAgICB0aGlzLm1ldGhvZHMgPSB7XG4gICAgICBfaXNJbml0aWFsTWV0YWRhdGFEaXNwYXRjaGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBfaGFzQXVkaW8sXG4gICAgICAgICAgX2hhc1ZpZGVvLFxuICAgICAgICAgIF9hdWRpb0luaXRpYWxNZXRhZGF0YURpc3BhdGNoZWQsXG4gICAgICAgICAgX3ZpZGVvSW5pdGlhbE1ldGFkYXRhRGlzcGF0Y2hlZFxuICAgICAgICB9ID0gdGhpcy5zdGF0ZVxuICAgICAgICBpZiAoX2hhc0F1ZGlvICYmIF9oYXNWaWRlbykgeyAvLyBib3RoIGF1ZGlvICYgdmlkZW9cbiAgICAgICAgICByZXR1cm4gX2F1ZGlvSW5pdGlhbE1ldGFkYXRhRGlzcGF0Y2hlZCAmJiBfdmlkZW9Jbml0aWFsTWV0YWRhdGFEaXNwYXRjaGVkXG4gICAgICAgIH1cbiAgICAgICAgaWYgKF9oYXNBdWRpbyAmJiAhX2hhc1ZpZGVvKSB7IC8vIGF1ZGlvIG9ubHlcbiAgICAgICAgICByZXR1cm4gdGhpcy5fYXVkaW9Jbml0aWFsTWV0YWRhdGFEaXNwYXRjaGVkXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFfaGFzQXVkaW8gJiYgX2hhc1ZpZGVvKSB7IC8vIHZpZGVvIG9ubHlcbiAgICAgICAgICByZXR1cm4gX3ZpZGVvSW5pdGlhbE1ldGFkYXRhRGlzcGF0Y2hlZFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgfVxuICB9XG5cbiAgY2xlYXJUYWdzICgpIHtcbiAgICB0aGlzLnN0YXRlLnRhZ3MgPSBbXVxuICB9XG4gIGdldCByZWZlckZyYW1lUmF0ZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuX3JlZmVyRnJhbWVSYXRlXG4gIH1cblxuICBzZXQgcmVmZXJGcmFtZVJhdGUgKHZhbCkge1xuICAgIHRoaXMuc3RhdGUuX3JlZmVyRnJhbWVSYXRlID0gdmFsXG4gIH1cblxuICBzZXQgbWVkaWFJbmZvIChtZWRpYUluZm8pIHtcbiAgICB0aGlzLnN0YXRlLl9tZWRpYUluZm8gPSBtZWRpYUluZm9cbiAgfVxuXG4gIGdldCBtZWRpYUluZm8gKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLl9tZWRpYUluZm9cbiAgfVxuXG4gIGdldCBtZXRhRGF0YSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuX21ldGFEYXRhXG4gIH1cblxuICBnZXQgaGFzTWV0YURhdGEgKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLl9tZXRhRGF0YSAhPT0gbnVsbFxuICB9XG5cbiAgc2V0IG1ldGFEYXRhICh2KSB7XG4gICAgdGhpcy5zdGF0ZS5fbWV0YURhdGEgPSB2XG4gIH1cblxuICBzZXQgYXVkaW9UcmFjayAodmFsKSB7XG4gICAgdGhpcy5zdGF0ZS5fYXVkaW9UcmFjayA9IHZhbFxuICB9XG5cbiAgZ2V0IGF1ZGlvVHJhY2sgKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLl9hdWRpb1RyYWNrXG4gIH1cblxuICBzZXQgdmlkZW9UcmFjayAodmFsKSB7XG4gICAgdGhpcy5zdGF0ZS5fdmlkZW9UcmFjayA9IHZhbFxuICB9XG5cbiAgZ2V0IHZpZGVvVHJhY2sgKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLl92aWRlb1RyYWNrXG4gIH1cblxuICBzZXQgaGFzQXVkaW8gKHZhbCkge1xuICAgIHRoaXMuc3RhdGUuX2hhc0F1ZGlvID0gdmFsXG4gICAgdGhpcy5zdGF0ZS5fbWVkaWFJbmZvLmhhc0F1ZGlvID0gdmFsXG4gIH1cblxuICBnZXQgaGFzQXVkaW8gKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLl9oYXNBdWRpb1xuICB9XG5cbiAgc2V0IGhhc1ZpZGVvICh2YWwpIHtcbiAgICB0aGlzLnN0YXRlLl9oYXNWaWRlbyA9IHZhbFxuICAgIHRoaXMuc3RhdGUuX21lZGlhSW5mby5oYXNWaWRlbyA9IHZhbFxuICB9XG5cbiAgZ2V0IGhhc1ZpZGVvICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5faGFzVmlkZW9cbiAgfVxuXG4gIHNldCB2aWRlb01ldGFEYXRhICh2YWwpIHtcbiAgICB0aGlzLnN0YXRlLl92aWRlb01ldGFEYXRhID0gdmFsXG4gIH1cblxuICBnZXQgdmlkZW9NZXRhRGF0YSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuX3ZpZGVvTWV0YURhdGFcbiAgfVxuXG4gIHNldCBhdWRpb01ldGFEYXRhICh2YWwpIHtcbiAgICB0aGlzLnN0YXRlLl9hdWRpb01ldGFEYXRhID0gdmFsXG4gIH1cblxuICBnZXQgYXVkaW9NZXRhRGF0YSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuX2F1ZGlvTWV0YURhdGFcbiAgfVxuXG4gIGdldCBrZXlmcmFtZXMgKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLl9tZWRpYUluZm8ua2V5ZnJhbWVzXG4gIH1cbiAgZ2V0IGlzU2Vla2FibGUgKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLl9tZWRpYUluZm8uaGFzS2V5ZnJhbWVzXG4gIH1cblxuICBnZXQgaXNMZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuaXNMZVxuICB9XG4gIGdldCBoYXNJbml0aWFsTWV0YURpc3BhdGNoZWQgKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIF9oYXNBdWRpbyxcbiAgICAgIF9oYXNWaWRlbyxcbiAgICAgIF9hdWRpb0luaXRpYWxNZXRhZGF0YURpc3BhdGNoZWQsXG4gICAgICBfdmlkZW9Jbml0aWFsTWV0YWRhdGFEaXNwYXRjaGVkXG4gICAgfSA9IHRoaXMuc3RhdGVcbiAgICBpZiAoX2hhc0F1ZGlvICYmIF9oYXNWaWRlbykge1xuICAgICAgcmV0dXJuIF9hdWRpb0luaXRpYWxNZXRhZGF0YURpc3BhdGNoZWQgJiYgX3ZpZGVvSW5pdGlhbE1ldGFkYXRhRGlzcGF0Y2hlZFxuICAgIH1cbiAgICBpZiAoX2hhc0F1ZGlvICYmICFfaGFzVmlkZW8pIHtcbiAgICAgIHJldHVybiB0aGlzLl9hdWRpb0luaXRpYWxNZXRhZGF0YURpc3BhdGNoZWRcbiAgICB9XG4gICAgaWYgKCFfaGFzQXVkaW8gJiYgX2hhc1ZpZGVvKSB7XG4gICAgICByZXR1cm4gX3ZpZGVvSW5pdGlhbE1ldGFkYXRhRGlzcGF0Y2hlZFxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGdldCB2aWRlb1RpbWVTY2FsZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUudGltZVNjYWxlXG4gIH1cblxuICBnZXQgbWV0YUVuZFBvc2l0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5tZXRhRW5kUG9zaXRpb25cbiAgfVxuXG4gIHNldCBtZXRhRW5kUG9zaXRpb24gKHBvcykge1xuICAgIHRoaXMuc3RhdGUubWV0YUVuZFBvc2l0aW9uID0gcG9zXG4gIH1cblxuICBnZXQgaXNMaXZlICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5pc0xpdmVcbiAgfVxuXG4gIHNldCBpc0xpdmUgKHZhbCkge1xuICAgIHRoaXMuc3RhdGUuaXNMaXZlID0gdmFsXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU3RvcmVcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEZsdlRhZyB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICB0aGlzLnRhZ1R5cGUgPSAtMTtcbiAgICAgICAgdGhpcy5ib2R5U2l6ZSA9IC0xO1xuICAgICAgICB0aGlzLnRhZ1NpemUgPSAtMTtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IC0xO1xuICAgICAgICB0aGlzLlRpbWVzdGFtcCA9IC0xO1xuICAgICAgICB0aGlzLlN0cmVhbUlEID0gLTE7XG4gICAgICAgIHRoaXMuYm9keSA9IC0xO1xuICAgICAgICB0aGlzLnRpbWUgPSAtMTtcbiAgICAgICAgdGhpcy5hcnIgPSBbXTtcbiAgICB9XG5cbiAgICBnZXRUaW1lICgpIHtcbiAgICAgICAgdGhpcy5hcnIgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLlRpbWVzdGFtcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5hcnIucHVzaCgodGhpcy5UaW1lc3RhbXBbaV0udG9TdHJpbmcoMTYpLmxlbmd0aCA9PT0gMSA/ICcwJyArIHRoaXMuVGltZXN0YW1wW2ldLnRvU3RyaW5nKDE2KSA6IHRoaXMuVGltZXN0YW1wW2ldLnRvU3RyaW5nKDE2KSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXJyLnBvcCgpO1xuICAgICAgICBjb25zdCB0aW1lID0gdGhpcy5hcnIuam9pbignJyk7XG4gICAgICAgIHRoaXMudGltZSA9IHBhcnNlSW50KHRpbWUsIDE2KTtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRpbWUsIDE2KTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgeyB2ZXJzaW9uIH0gZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJ1xuY29uc3QgRXJyb3JUeXBlcyA9IHtcbiAgbmV0d29yazoge1xuICAgIGNvZGU6IDEsXG4gICAgbXNnOiAn6KeG6aKR5LiL6L296ZSZ6K+vJyxcbiAgICByZW1hcms6ICflj6ropoHop4bpopHkuIvovb3plJnor6/lsLHkvb/nlKjmraTnsbvlnovvvIzml6DorrrmmK92aWRlb+acrOi6q+eahOi2heaXtui/mOaYr3hocueahOWIhuauteivt+axgui2heaXtuaIluiAhei1hOa6kOS4jeWtmOWcqCdcbiAgfSxcbiAgbXNlOiB7XG4gICAgY29kZTogMixcbiAgICBtc2c6ICfmtYHov73liqDplJnor68nLFxuICAgIHJlbWFyazogJ+i/veWKoOa1geeahOaXtuWAmeWmguaenOexu+Wei+S4jeWvueOAgeaXoOazleiiq+ato+ehruino+eggeWImeS8muinpuWPkeatpOexu+mUmeivrydcbiAgfSxcbiAgcGFyc2U6IHtcbiAgICBjb2RlOiAzLFxuICAgIG1zZzogJ+ino+aekOmUmeivrycsXG4gICAgcmVtYXJrOiAnbXA044CBaGxz44CBZmx25oiR5Lus6YO95piv5L2/55SoanPov5vooYzmoLzlvI/op6PmnpDvvIzlpoLmnpzop6PmnpDlpLHotKXliJnkvJrop6blj5HmraTnsbvplJnor68nXG4gIH0sXG4gIGZvcm1hdDoge1xuICAgIGNvZGU6IDQsXG4gICAgbXNnOiAn5qC85byP6ZSZ6K+vJyxcbiAgICByZW1hcms6ICflpoLmnpzmtY/op4jlmajkuI3mlK/mjIHnmoTmoLzlvI/lr7zoh7Tmkq3mlL7plJnor68nXG4gIH0sXG4gIGRlY29kZXI6IHtcbiAgICBjb2RlOiA1LFxuICAgIG1zZzogJ+ino+eggemUmeivrycsXG4gICAgcmVtYXJrOiAn5rWP6KeI5Zmo6Kej56CB5byC5bi45Lya5oqb5Ye65q2k57G75Z6L6ZSZ6K+vJ1xuICB9LFxuICBydW50aW1lOiB7XG4gICAgY29kZTogNixcbiAgICBtc2c6ICfor63ms5XplJnor68nLFxuICAgIHJlbWFyazogJ+aSreaUvuWZqOivreazlemUmeivrydcbiAgfSxcbiAgdGltZW91dDoge1xuICAgIGNvZGU6IDcsXG4gICAgbXNnOiAn5pKt5pS+6LaF5pe2JyxcbiAgICByZW1hcms6ICfmkq3mlL7ov4fnqIvkuK3ml6Dms5XmraPluLjor7fmsYLkuIvkuIDkuKrliIbmrrXlr7zoh7Tmkq3mlL7kuK3mlq0nXG4gIH0sXG4gIG90aGVyOiB7XG4gICAgY29kZTogOCxcbiAgICBtc2c6ICflhbbku5bplJnor68nLFxuICAgIHJlbWFyazogJ+S4jeWPr+efpeeahOmUmeivr+aIluiiq+W/veeVpeeahOmUmeivr+exu+WeiydcbiAgfVxufVxuXG5jbGFzcyBFcnJvcnMge1xuICBjb25zdHJ1Y3RvciAodHlwZSwgY3VycmVudFRpbWUsIGR1cmF0aW9uLCBuZXR3b3JrU3RhdGUsIHJlYWR5U3RhdGUsIHNyYywgY3VycmVudFNyYyxcbiAgICBlbmRlZCwgZXJyZCA9IHtsaW5lOiAnJywgaGFuZGxlOiAnJywgbXNnOiAnJywgdmVyc2lvbjogJyd9KSB7XG4gICAgbGV0IHIgPSB7fVxuICAgIHIucGxheWVyVmVyc2lvbiA9IHZlcnNpb24gLy8g5pKt5pS+5Zmo54mI5pysXG4gICAgci5lcnJvclR5cGUgPSB0eXBlXG4gICAgci5kb21haW4gPSBkb2N1bWVudC5kb21haW4gLy8gZG9tYWluXG4gICAgci5kdXJhdGlvbiA9IGR1cmF0aW9uIC8vIOinhumikeaXtumVv1xuICAgIHIuY3VycmVudFRpbWUgPSBjdXJyZW50VGltZVxuICAgIHIubmV0d29ya1N0YXRlID0gbmV0d29ya1N0YXRlXG4gICAgci5yZWFkeVN0YXRlID0gcmVhZHlTdGF0ZVxuICAgIHIuY3VycmVudFNyYyA9IGN1cnJlbnRTcmNcbiAgICByLnNyYyA9IHNyY1xuICAgIHIuZW5kZWQgPSBlbmRlZFxuICAgIHIuZXJyZCA9IGVycmQgLy8g6ZSZ6K+v6K+m5oOFXG4gICAgci5leCA9IChFcnJvclR5cGVzW3R5cGVdIHx8IHt9KS5tc2cgLy8g6KGl5YWF5L+h5oGvXG4gICAgcmV0dXJuIHJcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBFcnJvcnNcbiIsImltcG9ydCBEZW11eGVyIGZyb20gJy4vZGVtdXgvRGVtdXhlcidcbmltcG9ydCBCdWZmZXIgZnJvbSAnLi4vd3JpdGUvQnVmZmVyJ1xuaW1wb3J0IFRhZyBmcm9tICcuLi9tb2RlbHMvVGFnJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbHZQYXJzZXIgZXh0ZW5kcyBEZW11eGVyIHtcbiAgY29uc3RydWN0b3IgKHN0b3JlKSB7XG4gICAgc3VwZXIoc3RvcmUpXG4gICAgdGhpcy5DTEFTU19OQU1FID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lXG4gICAgdGhpcy50ZW1wX3U4YSA9IG51bGxcbiAgICB0aGlzLmRhdGFMZW4gPSAwXG4gICAgdGhpcy5zdG9wID0gZmFsc2VcbiAgICB0aGlzLmluZGV4ID0gMCAvLyByZWNvcmQgdGhlIHBvc2l0aW9uIGluIHNpbmdsZSByb3VuZFxuICAgIHRoaXMub2Zmc2V0ID0gMFxuICAgIHRoaXMuZmlsZVBvc2l0aW9uID0gMCAvLyByZWNvcmQgY3VycmVudCBmaWxlIHBvc2l0aW9uXG4gICAgdGhpcy5maXJzdEZsYWcgPSB0cnVlXG4gIH1cblxuICBzZWVrICgpIHtcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMudGVtcF91OGEgPSBudWxsXG4gICAgdGhpcy5kYXRhTGVuID0gMFxuICAgIHRoaXMuc3RvcCA9IGZhbHNlXG4gICAgdGhpcy5pbmRleCA9IDAgLy8gcmVjb3JkIHRoZSBwb3NpdGlvbiBpbiBzaW5nbGUgcm91bmRcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgICB0aGlzLmZpbGVQb3NpdGlvbiA9IDBcbiAgfVxuXG4gIHNldEZsdiAoZmx2VThhKSB7XG4gICAgdGhpcy5zdG9wID0gZmFsc2VcbiAgICB0aGlzLmluZGV4ID0gMFxuICAgIHRoaXMub2Zmc2V0ID0gMFxuICAgIGNvbnN0IHRlbXBVOGEgPSB0aGlzLnRlbXBfdThhID0gZmx2VThhXG4gICAgdGhpcy5kYXRhTGVuID0gdGhpcy50ZW1wX3U4YS5sZW5ndGhcblxuICAgIGlmICghdGhpcy5maXJzdEZsYWcpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcnNlRGF0YSgpXG4gICAgfSBlbHNlIGlmICh0ZW1wVThhLmxlbmd0aCA+IDEzICYmIEZsdlBhcnNlci5pc0ZsdkhlYWQodGVtcFU4YSkpIHtcbiAgICAgIHRoaXMucGFyc2VIZWFkKClcbiAgICAgIHRoaXMucmVhZERhdGEoOSkgLy8g6Lez6L+H5aS06YOoXG4gICAgICB0aGlzLnJlYWREYXRhKDQpIC8vIOi3s+i/h+S4i+S4gOS4quiusOW9leWktOmDqHNpemXnmoQgaW50MzJcbiAgICAgIHRoaXMucGFyc2VEYXRhKClcbiAgICAgIHRoaXMuZmlyc3RGbGFnID0gZmFsc2VcbiAgICAgIHRoaXMuZmlsZVBvc2l0aW9uICs9IHRoaXMub2Zmc2V0XG4gICAgICByZXR1cm4gdGhpcy5vZmZzZXRcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMub2Zmc2V0XG4gICAgfVxuICB9XG5cbiAgcGFyc2VEYXRhICgpIHtcbiAgICBjb25zdCB7bGVuZ3RoOiB1OGFMZW5ndGh9ID0gdGhpcy50ZW1wX3U4YVxuICAgIHdoaWxlICh0aGlzLmluZGV4IDwgdThhTGVuZ3RoICYmICF0aGlzLnN0b3ApIHtcbiAgICAgIHRoaXMub2Zmc2V0ID0gdGhpcy5pbmRleFxuICAgICAgY29uc3QgdGFnID0gbmV3IFRhZygpXG4gICAgICBpZiAodGhpcy51bnJlYWRMZW5ndGggPj0gMTEpIHtcbiAgICAgICAgLy8g5Y+v5Lul6K+75Ye65aS06YOo5L+h5oGvXG4gICAgICAgIHRhZy5wb3NpdGlvbiA9IHRoaXMuZmlsZVBvc2l0aW9uICsgdGhpcy5vZmZzZXRcbiAgICAgICAgdGFnLnRhZ1R5cGUgPSB0aGlzLnJlYWREYXRhKDEpWzBdXG4gICAgICAgIHRhZy5ib2R5U2l6ZSA9IHRoaXMucmVhZERhdGEoMylcbiAgICAgICAgdGFnLlRpbWVzdGFtcCA9IHRoaXMucmVhZERhdGEoNClcbiAgICAgICAgdGFnLlN0cmFtSWQgPSB0aGlzLnJlYWREYXRhKDMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0b3AgPSB0cnVlXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICBpZiAodGhpcy51bnJlYWRMZW5ndGggPj0gdGhpcy5nZXRCb2R5U2l6ZSh0YWcuYm9keVNpemUpICsgNCkge1xuICAgICAgICB0YWcuYm9keSA9IHRoaXMucmVhZERhdGEodGhpcy5nZXRCb2R5U2l6ZSh0YWcuYm9keVNpemUpKVxuICAgICAgICB0YWcudGFnU2l6ZSA9IHRoaXMucmVhZERhdGEoNClcbiAgICAgICAgY29uc3Qge3RhZ3MsIF9oYXNWaWRlbywgX2hhc0F1ZGlvfSA9IHRoaXMuX3N0b3JlLnN0YXRlXG4gICAgICAgIHN3aXRjaCAodGFnLnRhZ1R5cGUpIHtcbiAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICBfaGFzVmlkZW8gJiYgdGFncy5wdXNoKHRhZylcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgX2hhc0F1ZGlvICYmIHRhZ3MucHVzaCh0YWcpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIGNhc2UgMTg6XG4gICAgICAgICAgICB0YWdzLnB1c2godGFnKVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdG9wID0gdHJ1ZVxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICB0aGlzLm9mZnNldCA9IHRoaXMuaW5kZXhcbiAgICB9XG4gICAgdGhpcy5maWxlUG9zaXRpb24gKz0gdGhpcy5vZmZzZXRcbiAgICB0aGlzLnRlbXBfdThhID0gbnVsbFxuICAgIHJldHVybiB0aGlzLm9mZnNldFxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBzaXplQXJyXG4gICAqIEByZXR1cm5cbiAgICovXG4gIGdldEJvZHlTaXplIChzaXplQXJyKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5yZWFkQXNJbnQoc2l6ZUFycilcbiAgfVxuXG4gIHBhcnNlSGVhZCAoKSB7XG4gICAgY29uc3Qge3RlbXBfdThhOiB0ZW1wVThhLCBfc3RvcmV9ID0gdGhpc1xuICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgIG1hdGNoOiBmYWxzZVxuICAgIH1cbiAgICBpZiAodGVtcFU4YVszXSAhPT0gMSkge1xuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cbiAgICBjb25zdCBmbGFnID0gdGVtcFU4YVs0XVxuICAgIGNvbnN0IGhhc0F1ZGlvID0gKChmbGFnICYgNCkgPj4+IDIpICE9PSAwXG4gICAgY29uc3QgaGFzVmlkZW8gPSAoZmxhZyAmIDEpICE9PSAwXG5cbiAgICBpZiAoIWhhc0F1ZGlvICYmICFoYXNWaWRlbykge1xuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cblxuICAgIF9zdG9yZS5oYXNBdWRpbyA9IGhhc0F1ZGlvXG4gICAgX3N0b3JlLmhhc1ZpZGVvID0gaGFzVmlkZW9cbiAgfVxuXG4gIHJlYWREYXRhIChsZW5ndGgpIHtcbiAgICBjb25zdCBfaW5kZXggPSB0aGlzLmluZGV4XG4gICAgdGhpcy5pbmRleCArPSBsZW5ndGhcbiAgICByZXR1cm4gdGhpcy50ZW1wX3U4YS5zbGljZShfaW5kZXgsIF9pbmRleCArIGxlbmd0aClcbiAgfVxuXG4gIGdldCB1bnJlYWRMZW5ndGggKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGFMZW4gLSB0aGlzLmluZGV4XG4gIH1cblxuICBzdGF0aWMgaXNGbHZIZWFkICh0ZW1wVThhKSB7XG4gICAgbGV0IGZpcnN0VGhyZWVDaGFycyA9IFt0ZW1wVThhWzBdLCB0ZW1wVThhWzFdLCB0ZW1wVThhWzJdXVxuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgZmlyc3RUaHJlZUNoYXJzKSA9PT0gJ0ZMVidcbiAgfVxufVxuIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICdldmVudC1lbWl0dGVyJ1xubGV0IGNvdW50ID0gMFxuY2xhc3MgTVNFIHtcbiAgY29uc3RydWN0b3IgKGNvZGVjcyA9ICd2aWRlby9tcDQ7IGNvZGVjcz1cImF2YzEuNjQwMDFFLCBtcDRhLjQwLjVcIicpIHtcbiAgICB0aGlzLmNvdW50ID0gY291bnQrK1xuICAgIGxldCBzZWxmID0gdGhpc1xuICAgIEV2ZW50RW1pdHRlcih0aGlzKVxuICAgIHRoaXMuY29kZWNzID0gY29kZWNzXG4gICAgdGhpcy5tZWRpYVNvdXJjZSA9IG5ldyB3aW5kb3cuTWVkaWFTb3VyY2UoKVxuICAgIHRoaXMudXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwodGhpcy5tZWRpYVNvdXJjZSlcblxuICAgIHRoaXMuaGFuZGxlU291cmNlT3BlbiA9IHRoaXMub25Tb3VyY2VPcGVuLmJpbmQodGhpcylcbiAgICB0aGlzLm1lZGlhU291cmNlLmFkZEV2ZW50TGlzdGVuZXIoJ3NvdXJjZW9wZW4nLCB0aGlzLmhhbmRsZVNvdXJjZU9wZW4pXG5cbiAgICB0aGlzLm1lZGlhU291cmNlLmFkZEV2ZW50TGlzdGVuZXIoJ3NvdXJjZWNsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5lbWl0KCdzb3VyY2VjbG9zZScpXG4gICAgfSlcbiAgfVxuXG4gIG9uU291cmNlT3BlbiAoKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICBzZWxmLnNvdXJjZUJ1ZmZlciA9IHNlbGYubWVkaWFTb3VyY2UuYWRkU291cmNlQnVmZmVyKHNlbGYuY29kZWNzKVxuICAgIHNlbGYuc291cmNlQnVmZmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIHNlbGYuZW1pdCgnZXJyb3InLCB7XG4gICAgICAgIHR5cGU6ICdzb3VyY2VCdWZmZXInLFxuICAgICAgICBlcnJvcjogZVxuICAgICAgfSlcbiAgICB9KVxuICAgIHNlbGYuc291cmNlQnVmZmVyLmFkZEV2ZW50TGlzdGVuZXIoJ3VwZGF0ZWVuZCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBzZWxmLmVtaXQoJ3VwZGF0ZWVuZCcpXG4gICAgfSlcbiAgICBzZWxmLmVtaXQoJ3NvdXJjZW9wZW4nKVxuICAgIHNlbGYuc291cmNlQnVmZmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIHNlbGYuZW1pdCgnZXJyb3InLCB7XG4gICAgICAgIHR5cGU6ICdtZWRpYVNvdXJjZScsXG4gICAgICAgIGVycm9yOiBlXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbiAgZ2V0IHN0YXRlICgpIHtcbiAgICByZXR1cm4gdGhpcy5tZWRpYVNvdXJjZS5yZWFkeVN0YXRlXG4gIH1cblxuICBnZXQgZHVyYXRpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm1lZGlhU291cmNlLmR1cmF0aW9uXG4gIH1cblxuICBzZXQgZHVyYXRpb24gKHZhbHVlKSB7XG4gICAgdGhpcy5tZWRpYVNvdXJjZS5kdXJhdGlvbiA9IHZhbHVlXG4gIH1cblxuICBhcHBlbmRCdWZmZXIgKGJ1ZmZlcikge1xuICAgIGxldCBzb3VyY2VCdWZmZXIgPSB0aGlzLnNvdXJjZUJ1ZmZlclxuICAgIGlmIChzb3VyY2VCdWZmZXIudXBkYXRpbmcgPT09IGZhbHNlICYmIHRoaXMuc3RhdGUgPT09ICdvcGVuJykge1xuICAgICAgc291cmNlQnVmZmVyLmFwcGVuZEJ1ZmZlcihidWZmZXIpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIHtcbiAgICAgICAgICB0eXBlOiAnc291cmNlQnVmZmVyJyxcbiAgICAgICAgICBlcnJvcjogbmV3IEVycm9yKCdtZWRpYVNvdXJjZSBpcyBub3QgYXR0YWNoZWQgdG8gdmlkZW8gb3IgbWVkaWFTb3VyY2UgaXMgY2xvc2VkJylcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZSA9PT0gJ2VuZGVkJykge1xuICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywge1xuICAgICAgICAgIHR5cGU6ICdzb3VyY2VCdWZmZXInLFxuICAgICAgICAgIGVycm9yOiBuZXcgRXJyb3IoJ21lZGlhU291cmNlIGlzIGNsb3NlZCcpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc291cmNlQnVmZmVyLnVwZGF0aW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgdGhpcy5lbWl0KCd3YXJuJywge1xuICAgICAgICAgICAgdHlwZTogJ3NvdXJjZUJ1ZmZlcicsXG4gICAgICAgICAgICBlcnJvcjogbmV3IEVycm9yKCdtZWRpYVNvdXJjZSBpcyBidXN5JylcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIC8vIHRoaXMubWVkaWFTb3VyY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcignc291cmNlb3BlbicsIHRoaXMuaGFuZGxlU291cmNlT3BlbilcbiAgICB0aGlzLl9fZWVfXyA9IHt9XG4gICAgLy8gdGhpcy5tZWRpYVNvdXJjZSA9IG51bGxcbiAgICAvLyB0aGlzLmVuZE9mU3RyZWFtKClcbiAgfVxuICByZW1vdmVCdWZmZXIgKHN0YXJ0LCBlbmQpIHtcbiAgICB0aGlzLnNvdXJjZUJ1ZmZlci5yZW1vdmUoc3RhcnQsIGVuZClcbiAgfVxuXG4gIGVuZE9mU3RyZWFtICgpIHtcbiAgICBpZiAodGhpcy5tZWRpYVNvdXJjZS5yZWFkeVN0YXRlID09PSAnb3BlbicpIHtcbiAgICAgIHRoaXMubWVkaWFTb3VyY2UuZW5kT2ZTdHJlYW0oKVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBpc1N1cHBvcnRlZCAoY29kZWNzKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5NZWRpYVNvdXJjZSAmJiB3aW5kb3cuTWVkaWFTb3VyY2UuaXNUeXBlU3VwcG9ydGVkKGNvZGVjcylcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNU0VcbiIsImltcG9ydCBNcDRSZW11eGVyIGZyb20gJy4vcmVtdXgvTXA0cmVtdXgnXG5pbXBvcnQgRmx2UGFyc2VyIGZyb20gJy4vRmx2UGFyc2VyJ1xuaW1wb3J0IFRhZ0RlbXV4ZXIgZnJvbSAnLi9kZW11eC9UYWdEZW11eGVyJ1xuaW1wb3J0IFN0b3JlIGZyb20gJy4uL21vZGVscy9TdG9yZSdcbmltcG9ydCBWb2RUYXNrIGZyb20gJy4uL3Rhc2tzL1ZvZFRhc2snXG5pbXBvcnQgTGl2ZVRhc2sgZnJvbSAnLi4vdGFza3MvTGl2ZVRhc2snXG5pbXBvcnQgQnVmZmVyIGZyb20gJy4uL3dyaXRlL0J1ZmZlcidcbmltcG9ydCBUcmFuc0NvZGVyIGZyb20gJy4vVHJhbnNDb2RlcidcblxuY29uc3QgTk9PUCA9ICgpID0+IHt9XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluUGFyc2VyIGV4dGVuZHMgVHJhbnNDb2RlciB7XG4gIGNvbnN0cnVjdG9yIChjb25maWcsIHBsYXllcikge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLkNMQVNTX05BTUUgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWVcbiAgICB0aGlzLl9jb25maWcgPSBjb25maWdcbiAgICB0aGlzLl9wbGF5ZXIgPSBwbGF5ZXJcbiAgICB0aGlzLl90ZW1wQmFzZVRpbWUgPSAwXG4gICAgdGhpcy5maXJzdEZsYWcgPSB0cnVlXG4gICAgdGhpcy5fc3RvcmUgPSBuZXcgU3RvcmUoKVxuICAgIHRoaXMuX3N0b3JlLmlzTGl2ZSA9IGNvbmZpZy5pc0xpdmUgfHwgZmFsc2VcbiAgICB0aGlzLl9zdG9yZS5wbGF5ZXIgPSBwbGF5ZXJcbiAgICB0aGlzLmZsdlBhcnNlciA9IG5ldyBGbHZQYXJzZXIodGhpcy5fc3RvcmUpXG4gICAgdGhpcy50YWdEZW11eGVyID0gbmV3IFRhZ0RlbXV4ZXIodGhpcy5fc3RvcmUpXG4gICAgdGhpcy5tcDRyZW11eGVyID0gbmV3IE1wNFJlbXV4ZXIodGhpcy5fc3RvcmUpXG4gICAgdGhpcy5idWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICB0aGlzLmJ1ZmZlcktleWZyYW1lcyA9IG5ldyBTZXQoKVxuICAgIHRoaXMuTUVUQV9DSFVOS19TSVpFID0gTWF0aC5wb3coMTAsIDYpXG4gICAgdGhpcy5DSFVOS19TSVpFID0gTWF0aC5wb3coMTAsIDYpXG4gICAgdGhpcy5mdHlwX21vb3YgPSBudWxsXG4gICAgdGhpcy5pc1NvdXJjZU9wZW4gPSBmYWxzZVxuICAgIHRoaXMuX2lzTmV3U2VnbWVudHNBcnJpdmFsID0gZmFsc2VcbiAgICB0aGlzLmlzU2Vla2luZyA9IGZhbHNlXG4gICAgdGhpcy5sb2FkVGFzayA9IG51bGxcbiAgICB0aGlzLnJhbmdlID0ge1xuICAgICAgc3RhcnQ6IC0xLFxuICAgICAgZW5kOiAtMVxuICAgIH1cbiAgICB0aGlzLl9wZW5kaW5nRnJhZ21lbnRzID0gW11cbiAgICB0aGlzLl9wZW5kaW5nUmVtb3ZlUmFuZ2UgPSBbXVxuICAgIHRoaXMuZXJyX2NudCA9IDBcbiAgICB0aGlzLnJlcXVlc3RDb25maWcgPSB7XG4gICAgICBtb2RlOiB0aGlzLl9jb25maWcuY29ycyA/ICdjb3JzJyA6ICdzYW1lLW9yaWdpbidcbiAgICB9XG4gICAgdGhpcy5pbml0RXZlbnRCaW5kKClcbiAgfVxuXG4gIHN0YXJ0TG9hZERhdGEgKCkge1xuICAgIGlmICghdGhpcy5fY29uZmlnLmlzTGl2ZSkge1xuICAgICAgdGhpcy5pbml0TWV0YSgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5pdExpdmVTdHJlYW0oKVxuICAgIH1cbiAgfVxuXG4gIGluaXRMaXZlU3RyZWFtICgpIHtcbiAgICBuZXcgTGl2ZVRhc2sodGhpcy5fY29uZmlnLnVybCwgdGhpcy5yZXF1ZXN0Q29uZmlnKS5ydW4odGhpcy5sb2FkTGl2ZURhdGEuYmluZCh0aGlzKSlcbiAgfVxuXG4gIGxvYWRMaXZlRGF0YSAoYnVmZmVyKSB7XG4gICAgaWYgKGJ1ZmZlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmVtaXQoJ2xpdmUtZW5kJylcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuYnVmZmVyLndyaXRlKG5ldyBVaW50OEFycmF5KGJ1ZmZlcikpXG4gICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5zZXRGbHYodGhpcy5idWZmZXIuYnVmZmVyKVxuICAgICAgdGhpcy5idWZmZXIuYnVmZmVyID0gdGhpcy5idWZmZXIuYnVmZmVyLnNsaWNlKG9mZnNldClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpXG4gICAgfVxuICB9XG5cbiAgaW5pdE1ldGEgKCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgY29uc3QgUmVzb2x2ZXIgPSB7XG4gICAgICByZXNvbHZlQ2h1bmsgKHt0aW1lU3RhbXAsIGJ1ZmZlcn0pIHtcbiAgICAgICAgaWYgKHRpbWVTdGFtcCAhPT0gc2VsZi5sb2FkVGFzay50aW1lU3RhbXApIHJldHVyblxuICAgICAgICBzZWxmLmVycl9jbnQgPSAwXG4gICAgICAgIHNlbGYuYnVmZmVyLndyaXRlKG5ldyBVaW50OEFycmF5KGJ1ZmZlcikpXG4gICAgICAgIGxldCBvZmZzZXQgPSBzZWxmLnNldEZsdihzZWxmLmJ1ZmZlci5idWZmZXIpXG4gICAgICAgIHNlbGYuYnVmZmVyLmJ1ZmZlciA9IHNlbGYuYnVmZmVyLmJ1ZmZlci5zbGljZShvZmZzZXQpXG4gICAgICAgIGlmICghc2VsZi5pc01lZGlhSW5mb1JlYWR5KSB7XG4gICAgICAgICAgc2VsZi5pbml0TWV0YSgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5yYW5nZSA9IHtcbiAgICAgIHN0YXJ0OiB0aGlzLnJhbmdlLmVuZCArIDEsXG4gICAgICBlbmQ6IHRoaXMucmFuZ2UuZW5kICsgdGhpcy5NRVRBX0NIVU5LX1NJWkVcbiAgICB9XG4gICAgY29uc3QgbG9hZERhdGEgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5sb2FkTWV0YURhdGEodGhpcy5yYW5nZS5zdGFydCwgdGhpcy5yYW5nZS5lbmQpLnRoZW4oUmVzb2x2ZXIucmVzb2x2ZUNodW5rKS5jYXRjaCgoZSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgICBpZiAodGhpcy5lcnJfY250ID49IDMpIHtcbiAgICAgICAgICB0aGlzLl9wbGF5ZXIuZW1pdCgnZXJyb3InLCBlKVxuICAgICAgICAgIHRoaXMuZGVzdHJveSgpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lcnJfY250ICs9IDFcbiAgICAgICAgbG9hZERhdGEoKVxuICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIGxvYWREYXRhKClcbiAgfVxuXG4gIGxvYWRTZWdtZW50cyAoY2hhbmdlUmFuZ2UsIGN1cnJlbnRUaW1lID0gMCwgcHJlbG9hZFRpbWUpIHtcbiAgICB0aGlzLl9pc05ld1NlZ21lbnRzQXJyaXZhbCA9IGZhbHNlXG4gICAgY29uc3QgcmVzb2x2ZUNodW5rID0gKHt0aW1lU3RhbXAsIGJ1ZmZlcn0pID0+IHtcbiAgICAgIGlmICh0aGlzLmlzVGVtcFBsYXllcikge1xuICAgICAgICB0aGlzLmlzVGVtcFBsYXllciA9IGZhbHNlXG4gICAgICB9XG4gICAgICBpZiAodGltZVN0YW1wICE9PSB0aGlzLmxvYWRUYXNrLnRpbWVTdGFtcCkgcmV0dXJuXG4gICAgICB0aGlzLmVycl9jbnQgPSAwXG4gICAgICB0aGlzLmJ1ZmZlci53cml0ZShuZXcgVWludDhBcnJheShidWZmZXIpKVxuICAgICAgaWYgKHRoaXMuaXNTZWVraW5nKSB7XG4gICAgICAgIHRoaXMuX3BlbmRpbmdGcmFnbWVudHMgPSBbXVxuICAgICAgfVxuICAgICAgbGV0IG9mZnNldCA9IHRoaXMuc2V0Rmx2KHRoaXMuYnVmZmVyLmJ1ZmZlcilcbiAgICAgIHRoaXMuYnVmZmVyLmJ1ZmZlciA9IHRoaXMuYnVmZmVyLmJ1ZmZlci5zbGljZShvZmZzZXQpXG4gICAgICBpZiAoIXRoaXMuX2lzTmV3U2VnbWVudHNBcnJpdmFsKSB7XG4gICAgICAgIHRoaXMubG9hZFNlZ21lbnRzKHRydWUpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmlzU2Vla2luZyA9IGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjaGFuZ2VSYW5nZSkge1xuICAgICAgbGV0IF9yYW5nZSA9IHRoaXMucmFuZ2VcblxuICAgICAgaWYgKHRoaXMuZ2V0TmV4dFJhbmdlRW5kKGN1cnJlbnRUaW1lLCBwcmVsb2FkVGltZSkgPD0gX3JhbmdlLmVuZCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgIH1cblxuICAgICAgdGhpcy5yYW5nZSA9IHtcbiAgICAgICAgc3RhcnQ6IHRoaXMucmFuZ2UuZW5kICsgMSxcbiAgICAgICAgZW5kOiBjdXJyZW50VGltZSA9PT0gdW5kZWZpbmVkID8gdGhpcy5yYW5nZS5lbmQgKyB0aGlzLkNIVU5LX1NJWkUgLSAxIDogdGhpcy5nZXROZXh0UmFuZ2VFbmQoY3VycmVudFRpbWUsIHByZWxvYWRUaW1lKSAtIDFcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMucmFuZ2Uuc3RhcnQgPj0gdGhpcy5yYW5nZS5lbmQgfHwgIXRoaXMucmFuZ2UuZW5kKSB7XG4gICAgICAgIHRoaXMucmFuZ2UgPSBfcmFuZ2VcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGxvYWREYXRhID0gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuc3RvcCkgcmV0dXJuXG4gICAgICByZXR1cm4gdGhpcy5fbG9hZFNlZ21lbnRzRGF0YSh0aGlzLnJhbmdlLnN0YXJ0LCB0aGlzLnJhbmdlLmVuZCkudGhlbihyZXNvbHZlQ2h1bmspLmNhdGNoKGUgPT4ge1xuICAgICAgICBpZiAodGhpcy5lcnJfY250ID49IDMpIHtcbiAgICAgICAgICB0aGlzLl9wbGF5ZXIuZW1pdCgnZXJyb3InLCAn5Yqg6L296KeG6aKR5aSx6LSlJylcbiAgICAgICAgICB0aGlzLmRlc3Ryb3koKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXJyX2NudCArPSAxXG4gICAgICAgIGxvYWREYXRhKClcbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiBsb2FkRGF0YSgpXG4gIH1cblxuICBnZXROZXh0UmFuZ2VFbmQgKHN0YXJ0LCBwcmVsb2FkVGltZSkge1xuICAgIGNvbnN0IHtrZXlmcmFtZXM6IHt0aW1lcywgZmlsZVBvc2l0aW9uc30sIHZpZGVvVGltZVNjYWxlfSA9IHRoaXMuX3N0b3JlXG4gICAgaWYgKCF0aW1lcyB8fCAhZmlsZVBvc2l0aW9ucykge1xuICAgICAgcmV0dXJuIHRoaXMucmFuZ2UuZW5kICsgdGhpcy5DSFVOS19TSVpFXG4gICAgfVxuICAgIHN0YXJ0ICo9IHZpZGVvVGltZVNjYWxlXG5cbiAgICBsZXQgZXhwZWN0RW5kID0gc3RhcnQgKyAocHJlbG9hZFRpbWUgKiB2aWRlb1RpbWVTY2FsZSlcbiAgICBpZiAoZXhwZWN0RW5kID4gdGltZXNbdGltZXMubGVuZ3RoIC0gMV0pIHtcbiAgICAgIHJldHVybiBmaWxlUG9zaXRpb25zW2ZpbGVQb3NpdGlvbnMubGVuZ3RoIC0gMV1cbiAgICB9XG4gICAgbGV0IGxlZnQgPSAwXG4gICAgbGV0IHJpZ2h0ID0gdGltZXMubGVuZ3RoIC0gMVxuICAgIGxldCBpbmRleFxuXG4gICAgd2hpbGUgKGxlZnQgPD0gcmlnaHQpIHtcbiAgICAgIGxldCBtaWQgPSBNYXRoLmZsb29yKChyaWdodCArIGxlZnQpIC8gMilcbiAgICAgIGlmICh0aW1lc1ttaWRdIDw9IGV4cGVjdEVuZCAmJiBleHBlY3RFbmQgPD0gdGltZXNbbWlkICsgMV0pIHtcbiAgICAgICAgaW5kZXggPSBtaWQgKyAxXG4gICAgICAgIGJyZWFrXG4gICAgICB9IGVsc2UgaWYgKGxlZnQgPT09IHJpZ2h0KSB7XG4gICAgICAgIGluZGV4ID0gbWlkXG4gICAgICAgIGJyZWFrXG4gICAgICB9IGVsc2UgaWYgKGV4cGVjdEVuZCA8IHRpbWVzW21pZF0pIHtcbiAgICAgICAgcmlnaHQgPSBtaWQgLSAxXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZWZ0ID0gbWlkICsgMVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpbmRleCA/IGZpbGVQb3NpdGlvbnNbaW5kZXhdIDogdW5kZWZpbmVkXG4gIH1cblxuICBfbG9hZFNlZ21lbnRzRGF0YSAoc3RhcnQgPSAwLCBlbmQgPSBzdGFydCArIHRoaXMuQ0hVTktfU0laRSkge1xuICAgIHRoaXMubG9hZFRhc2sgPSBuZXcgVm9kVGFzayh0aGlzLl9jb25maWcudXJsLCBbc3RhcnQsIGVuZF0sIHRoaXMucmVxdWVzdENvbmZpZylcbiAgICByZXR1cm4gdGhpcy5sb2FkVGFzay5wcm9taXNlXG4gIH1cblxuICBsb2FkTWV0YURhdGEgKHN0YXJ0ID0gMCwgZW5kID0gc3RhcnQgKyB0aGlzLk1FVEFfQ0hVTktfU0laRSkge1xuICAgIHRoaXMubG9hZFRhc2sgPSBuZXcgVm9kVGFzayh0aGlzLl9jb25maWcudXJsLCBbc3RhcnQsIGVuZF0sIHRoaXMucmVxdWVzdENvbmZpZylcbiAgICByZXR1cm4gdGhpcy5sb2FkVGFzay5wcm9taXNlXG4gIH1cblxuICBzZXRGbHZGaXJzdCAoYXJyYXlCdWZmLCBiYXNlVGltZSkge1xuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMuZmx2UGFyc2VyLnNldEZsdihuZXcgVWludDhBcnJheShhcnJheUJ1ZmYpKVxuICAgIGNvbnN0IHt0YWdzfSA9IHRoaXMuX3N0b3JlLnN0YXRlXG5cbiAgICBpZiAodGFncy5sZW5ndGgpIHtcbiAgICAgIGlmICh0YWdzWzBdLnRhZ1R5cGUgIT09IDE4KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZmx2IGZpbGUgd2l0aG91dCBtZXRhZGF0YSB0YWcnKVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fdGVtcEJhc2VUaW1lICE9PSAwICYmIHRoaXMuX3RlbXBCYXNlVGltZSA9PT0gdGFnc1swXS5nZXRUaW1lKCkpIHtcbiAgICAgICAgdGhpcy5fc3RvcmUuc3RhdGUuX3RpbWVzdGFtcEJhc2UgPSAwXG4gICAgICB9XG5cbiAgICAgIHRoaXMudGFnRGVtdXhlci5yZXNvbHZlVGFncyh0YWdzKVxuICAgIH1cblxuICAgIHRoaXMuZmlyc3RGbGFnID0gZmFsc2VcbiAgICByZXR1cm4gb2Zmc2V0XG4gIH1cblxuICBzZXRGbHZVc3VhbGx5IChhcnJheUJ1ZmYsIGJhc2VUaW1lKSB7XG4gICAgdGhpcy5pc1BhcnNpbmcgPSB0cnVlXG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5mbHZQYXJzZXIuc2V0Rmx2KG5ldyBVaW50OEFycmF5KGFycmF5QnVmZikpXG4gICAgY29uc3Qge3RhZ3N9ID0gdGhpcy5fc3RvcmUuc3RhdGVcbiAgICBpZiAodGFncy5sZW5ndGgpIHtcbiAgICAgIHRoaXMudGFnRGVtdXhlci5yZXNvbHZlVGFncyh0YWdzKVxuICAgIH1cbiAgICByZXR1cm4gb2Zmc2V0XG4gIH1cblxuICBoYW5kbGVEYXRhUmVhZHkgKGF1ZGlvVHJhY2ssIHZpZGVvVHJhY2spIHtcbiAgICB0aGlzLm1wNHJlbXV4ZXIucmVtdXgoYXVkaW9UcmFjaywgdmlkZW9UcmFjaylcbiAgfVxuXG4gIGhhbmRsZU1ldGFEYXRhUmVhZHkgKHR5cGUsIG1ldGEpIHtcbiAgICB0aGlzLm1wNHJlbXV4ZXIub25NZXRhRGF0YVJlYWR5KHR5cGUsIG1ldGEpXG4gIH1cblxuICBoYW5kbGVFcnJvciAoZSkge1xuICAgIHRoaXMuZXJyb3IoZSlcbiAgfVxuXG4gIGhhbmRsZU5ld01lZGlhRnJhZ21lbnQgKG5ld0ZyYWcpIHtcbiAgICB0aGlzLl9pc05ld1NlZ21lbnRzQXJyaXZhbCA9IHRydWVcbiAgICB0aGlzLl9wZW5kaW5nRnJhZ21lbnRzLnB1c2gobmV3RnJhZylcbiAgICBjb25zdCB7cmFuZG9tQWNjZXNzUG9pbnRzfSA9IG5ld0ZyYWcuZnJhZ21lbnRcbiAgICBpZiAocmFuZG9tQWNjZXNzUG9pbnRzICYmIHJhbmRvbUFjY2Vzc1BvaW50cy5sZW5ndGgpIHtcbiAgICAgIHJhbmRvbUFjY2Vzc1BvaW50cy5mb3JFYWNoKHJhcCA9PiB7XG4gICAgICAgIHRoaXMuYnVmZmVyS2V5ZnJhbWVzLmFkZChyYXAuZHRzKVxuICAgICAgfSlcbiAgICB9XG4gICAgaWYgKCF0aGlzLmlzU291cmNlT3Blbikge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmICh0aGlzLl9wZW5kaW5nRnJhZ21lbnRzLmxlbmd0aCkge1xuICAgICAgY29uc3QgZnJhZ21lbnQgPSB0aGlzLl9wZW5kaW5nRnJhZ21lbnRzLnNoaWZ0KClcbiAgICAgIGlmICghdGhpcy5oYW5kbGVNZWRpYUZyYWdtZW50KGZyYWdtZW50KSkge1xuICAgICAgICB0aGlzLl9wZW5kaW5nRnJhZ21lbnRzLnVuc2hpZnQoZnJhZ21lbnQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmhhbmRsZVNlZWtFbmQoKVxuICAgICAgICB0aGlzLl9wbGF5ZXIuZW1pdCgnY2FjaGV1cGRhdGUnLCB0aGlzLl9wbGF5ZXIpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlTWVkaWFJbmZvUmVhZHkgKG1lZGlhSW5mbykge1xuICAgIGNvbnN0IEZUWVBfTU9PViA9IHRoaXMubXA0cmVtdXhlci5vbk1lZGlhSW5mb1JlYWR5KG1lZGlhSW5mbylcbiAgICBpZiAoIXRoaXMuZnR5cF9tb292KSB7XG4gICAgICB0aGlzLmZ0eXBfbW9vdiA9IEZUWVBfTU9PVlxuICAgICAgdGhpcy5lbWl0KCdyZWFkeScsIEZUWVBfTU9PVilcbiAgICB9XG4gIH1cblxuICBpbml0RXZlbnRCaW5kICgpIHtcbiAgICB0aGlzLnRhZ0RlbXV4ZXIuaGFuZGxlRGF0YVJlYWR5ID0gdGhpcy5oYW5kbGVEYXRhUmVhZHkuYmluZCh0aGlzKVxuICAgIHRoaXMudGFnRGVtdXhlci5oYW5kbGVNZWRpYUluZm9SZWFkeSA9IHRoaXMuaGFuZGxlTWVkaWFJbmZvUmVhZHkuYmluZCh0aGlzKVxuICAgIHRoaXMudGFnRGVtdXhlci5oYW5kbGVNZXRhRGF0YVJlYWR5ID0gdGhpcy5oYW5kbGVNZXRhRGF0YVJlYWR5LmJpbmQodGhpcylcbiAgICB0aGlzLnRhZ0RlbXV4ZXIuc2V0RXZlbnRCaW5kKClcbiAgICB0aGlzLm1wNHJlbXV4ZXIuaGFuZGxlTWVkaWFGcmFnbWVudCA9IHRoaXMuaGFuZGxlTmV3TWVkaWFGcmFnbWVudC5iaW5kKHRoaXMpXG4gIH1cblxuICByZXBsYXkgKCkge1xuICAgIHRoaXMuaXNTb3VyY2VPcGVuID0gZmFsc2VcbiAgICB0aGlzLnJhbmdlID0ge1xuICAgICAgc3RhcnQ6IHRoaXMuX3N0b3JlLm1ldGFFbmRQb3NpdGlvbixcbiAgICAgIGVuZDogdGhpcy5nZXROZXh0UmFuZ2VFbmQoMCwgdGhpcy5fY29uZmlnLnByZWxvYWRUaW1lKSAtIDFcbiAgICB9XG4gICAgdGhpcy5tcDRyZW11eGVyLnNlZWsoKVxuICAgIHRoaXMuZmx2UGFyc2VyLnNlZWsoKVxuICAgIHRoaXMuY2xlYXJCdWZmZXIoKVxuICAgIHRoaXMubG9hZFNlZ21lbnRzKGZhbHNlKVxuICB9XG5cbiAgY2xlYXJCdWZmZXIgKCkge1xuICAgIHRoaXMuX3BlbmRpbmdGcmFnbWVudHMgPSBbXVxuICAgIHRoaXMuX3BlbmRpbmdSZW1vdmVSYW5nZSA9IFtdXG4gIH1cbiAgdW5iaW5kRXZlbnRzICgpIHtcbiAgICB0aGlzLnRhZ0RlbXV4ZXIuaGFuZGxlRGF0YVJlYWR5ID0gTk9PUFxuICAgIHRoaXMudGFnRGVtdXhlci5oYW5kbGVNZWRpYUluZm9SZWFkeSA9IE5PT1BcbiAgICB0aGlzLnRhZ0RlbXV4ZXIuaGFuZGxlTWV0YURhdGFSZWFkeSA9IE5PT1BcbiAgICB0aGlzLnRhZ0RlbXV4ZXIuc2V0RXZlbnRCaW5kKClcbiAgICB0aGlzLm1wNHJlbXV4ZXIuaGFuZGxlTWVkaWFGcmFnbWVudCA9IE5PT1BcbiAgfVxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLm1wNHJlbXV4ZXIuZGVzdHJveSgpXG4gICAgdGhpcy5mbHZQYXJzZXIuZGVzdHJveSgpXG4gICAgdGhpcy50YWdEZW11eGVyLmRlc3Ryb3koKVxuICAgIHRoaXMubXA0cmVtdXhlciA9IG51bGxcbiAgICB0aGlzLmZsdlBhcnNlciA9IG51bGxcbiAgICB0aGlzLnRhZ0RlbXV4ZXIgPSBudWxsXG4gICAgdGhpcy5sb2FkU2VnbWVudHMgPSAoKSA9PiBudWxsXG4gICAgdGhpcy5fc3RvcmUgPSBudWxsXG4gICAgdGhpcy5jbGVhckJ1ZmZlcigpXG4gICAgdGhpcy5zdG9wID0gdHJ1ZVxuICB9XG5cbiAgc2VlayAodGFyZ2V0KSB7XG4gICAgdGhpcy5sb2FkVGFzay5jYW5jZWwoKVxuICAgIGNvbnN0IHtrZXlmcmFtZXMgPSB7fSwgdmlkZW9UaW1lU2NhbGV9ID0gdGhpcy5fc3RvcmVcbiAgICBsZXQgc2Vla1N0YXJ0ID0gdGFyZ2V0ICogdmlkZW9UaW1lU2NhbGVcbiAgICBsZXQgc3RhcnRGaWxlUG9zXG4gICAgbGV0IGVuZEZpbGVQb3NcbiAgICBjb25zdCBsZW5ndGggPSBNYXRoLm1pbihrZXlmcmFtZXMuZmlsZVBvc2l0aW9ucy5sZW5ndGgsIGtleWZyYW1lcy50aW1lcy5sZW5ndGgpXG4gICAgbGV0IHtwcmVsb2FkVGltZX0gPSB0aGlzLl9jb25maWdcblxuICAgIGZ1bmN0aW9uIGdldEVuZEZpbGVQb3MgKHRpbWUsIGlkeCkge1xuICAgICAgaWYgKGlkeCA9PT0ga2V5ZnJhbWVzLnRpbWVzLmxlbmd0aCkge1xuICAgICAgICBlbmRGaWxlUG9zID0gaWR4XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgICAgaWYgKHRpbWUgPD0gcHJlbG9hZFRpbWUgJiYgcHJlbG9hZFRpbWUgPD0ga2V5ZnJhbWVzLnRpbWVzW2lkeCArIDFdKSB7XG4gICAgICAgIGVuZEZpbGVQb3MgPSBpZHhcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIC8vIOmcgOimgeWkhOeQhkVPRueahOaDheWGtVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBsZXQgbG8gPSAwXG4gICAgbGV0IGhpID0gbGVuZ3RoIC0gMlxuICAgIHdoaWxlIChsbyA8PSBoaSkge1xuICAgICAgbGV0IG1pZCA9IE1hdGguZmxvb3IoKGxvICsgaGkpIC8gMilcbiAgICAgIGxldCBjdXJyZW50VGltZSA9IGtleWZyYW1lcy50aW1lc1ttaWRdXG4gICAgICBsZXQgbmV4dFRpbWUgPSBrZXlmcmFtZXMudGltZXNbbWlkICsgMV0gPyBrZXlmcmFtZXMudGltZXNbbWlkICsgMV0gOiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUlxuICAgICAgaWYgKChjdXJyZW50VGltZSA8PSBzZWVrU3RhcnQgJiYgc2Vla1N0YXJ0IDw9IG5leHRUaW1lKSB8fCBsbyA9PT0gaGkpIHtcbiAgICAgICAgc3RhcnRGaWxlUG9zID0gbWlkXG4gICAgICAgIHByZWxvYWRUaW1lID0gcHJlbG9hZFRpbWUgKiB2aWRlb1RpbWVTY2FsZSArIHNlZWtTdGFydFxuICAgICAgICBrZXlmcmFtZXMudGltZXMuZXZlcnkoZ2V0RW5kRmlsZVBvcylcbiAgICAgICAgYnJlYWtcbiAgICAgIH0gZWxzZSBpZiAoc2Vla1N0YXJ0IDwgY3VycmVudFRpbWUpIHtcbiAgICAgICAgaGkgPSBtaWQgLSAxXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsbyA9IG1pZCArIDFcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaXNTZWVraW5nKSB7XG4gICAgICB0aGlzLmlzU2Vla2luZyA9IHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc3RvcmUuY2xlYXJUYWdzKClcbiAgICB9XG4gICAgdGhpcy5fcGVuZGluZ0ZyYWdtZW50cyA9IFtdXG4gICAgdGhpcy5tcDRyZW11eGVyLnNlZWsoKVxuICAgIHRoaXMuZmx2UGFyc2VyLnNlZWsoKVxuICAgIFZvZFRhc2suY2xlYXIoKVxuICAgIGNvbnN0IF9yYW5nZSA9IHRoaXMucmFuZ2VcbiAgICBpZiAoa2V5ZnJhbWVzLmZpbGVQb3NpdGlvbnNbc3RhcnRGaWxlUG9zXSA8IF9yYW5nZS5lbmQpIHtcbiAgICAgIHN0YXJ0RmlsZVBvcyArPSAxXG4gICAgICBlbmRGaWxlUG9zICs9IDFcbiAgICB9XG4gICAgdGhpcy5yYW5nZSA9IHtcbiAgICAgIHN0YXJ0OiBrZXlmcmFtZXMuZmlsZVBvc2l0aW9uc1tzdGFydEZpbGVQb3NdLFxuICAgICAgZW5kOiBrZXlmcmFtZXMuZmlsZVBvc2l0aW9uc1tlbmRGaWxlUG9zXSAtIDEgfHwgJydcbiAgICB9XG4gICAgdGhpcy5idWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICB0aGlzLmxvYWRTZWdtZW50cyhmYWxzZSlcbiAgfVxuXG4gIGdldCBzZXRGbHYgKCkge1xuICAgIHJldHVybiB0aGlzLmZpcnN0RmxhZyA/IHRoaXMuc2V0Rmx2Rmlyc3QgOiB0aGlzLnNldEZsdlVzdWFsbHlcbiAgfVxuXG4gIGdldCBpc01lZGlhSW5mb1JlYWR5ICgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RvcmUubWVkaWFJbmZvLmlzQ29tcGxldGVcbiAgfVxuXG4gIGdldCB2aWRlb0R1cmF0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RvcmUubWVkaWFJbmZvLmR1cmF0aW9uXG4gIH1cblxuICBnZXQgaGFzUGVuZGluZ0ZyYWdtZW50cyAoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5fcGVuZGluZ0ZyYWdtZW50cy5sZW5ndGhcbiAgfVxuXG4gIGdldCBwZW5kaW5nRnJhZ21lbnRzICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcGVuZGluZ0ZyYWdtZW50c1xuICB9XG5cbiAgZ2V0IHZpZGVvVGltZVNjYWxlICgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RvcmUudmlkZW9UaW1lU2NhbGVcbiAgfVxuXG4gIGdldCBoYXNQZW5kaW5nUmVtb3ZlUmFuZ2VzICgpIHtcbiAgICByZXR1cm4gdGhpcy5fcGVuZGluZ1JlbW92ZVJhbmdlLmxlbmd0aFxuICB9XG5cbiAgZ2V0IHBlbmRpbmdSZW1vdmVSYW5nZXMgKCkge1xuICAgIHJldHVybiB0aGlzLl9wZW5kaW5nUmVtb3ZlUmFuZ2VcbiAgfVxuXG4gIGdldCBpc1NlZWthYmxlICgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RvcmUuaXNTZWVrYWJsZVxuICB9XG59XG4iLCJpbXBvcnQgRXhwR29sb21iIGZyb20gICcuLi91dGlscy9FeHBHb2xvbWInO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU1BTUGFyc2VyIHtcbiAgICBzdGF0aWMgZ2V0UHJvZmlsZVN0ciAocHJvZmlsZUlkYykge1xuICAgICAgICBzd2l0Y2ggKHByb2ZpbGVJZGMpIHtcbiAgICAgICAgICAgIGNhc2UgNjY6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdCYXNlbGluZSc7XG4gICAgICAgICAgICBjYXNlIDc3OlxuICAgICAgICAgICAgICAgIHJldHVybiAnTWFpbic7XG4gICAgICAgICAgICBjYXNlIDg4OlxuICAgICAgICAgICAgICAgIHJldHVybiAnRXh0ZW5kZWQnO1xuICAgICAgICAgICAgY2FzZSAxMDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdIaWdoJztcbiAgICAgICAgICAgIGNhc2UgMTEwOlxuICAgICAgICAgICAgICAgIHJldHVybiAnSGlnaDEwJztcbiAgICAgICAgICAgIGNhc2UgMTIyOlxuICAgICAgICAgICAgICAgIHJldHVybiAnSGlnaDQyMic7XG4gICAgICAgICAgICBjYXNlIDI0NDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ0hpZ2g0NDQnO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ1Vua25vd24nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldExldmVsU3RyIChsZXZlbElkYykge1xuICAgICAgICByZXR1cm4gKGxldmVsSWRjIC8gMTApLnRvRml4ZWQoMSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldENocm9tYUZvcm1hdFN0ciAoY2hyb21hKSB7XG4gICAgICAgIHN3aXRjaCAoY2hyb21hKSB7XG4gICAgICAgICAgICBjYXNlIDQyMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJzQ6MjowJztcbiAgICAgICAgICAgIGNhc2UgNDIyOlxuICAgICAgICAgICAgICAgIHJldHVybiAnNDoyOjInO1xuICAgICAgICAgICAgY2FzZSA0NDQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuICc0OjQ6NCc7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAnVW5rbm93bic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZWFkIFNQU1xuICAgICAqIEBwYXJhbSBvcmlnaW5BcnJcbiAgICAgKi9cbiAgICBzdGF0aWMgcGFyc2VTUFMgKG9yaWdpbkFycikge1xuXG4gICAgICAgIGxldCByYnNwID0gU1BTUGFyc2VyLl9lYnNwMnJic3Aob3JpZ2luQXJyKTtcblxuICAgICAgICBjb25zdCBzdHJlYW0gPSBuZXcgRXhwR29sb21iKHJic3ApO1xuICAgICAgICBjb25zdCBzcHNDb25maWcgPSBzdHJlYW0ucmVhZFNQUygpO1xuICAgICAgICBjb25zdCB7IGNocm9tYUZvcm1hdCwgbGV2ZWxJZGMsIHByb2ZpbGVJZGMgfSA9IHNwc0NvbmZpZztcbiAgICAgICAgc3BzQ29uZmlnLnByb2ZpbGVTdHJpbmcgPSBTUFNQYXJzZXIuZ2V0UHJvZmlsZVN0cihwcm9maWxlSWRjKTtcbiAgICAgICAgc3BzQ29uZmlnLmxldmVsU3RyaW5nID0gU1BTUGFyc2VyLmdldExldmVsU3RyKGxldmVsSWRjKTtcbiAgICAgICAgc3BzQ29uZmlnLmNocm9tYUZvcm1hdFN0cmluZyA9IFNQU1BhcnNlci5nZXRDaHJvbWFGb3JtYXRTdHIoY2hyb21hRm9ybWF0KTtcblxuICAgICAgICByZXR1cm4gc3BzQ29uZmlnO1xuXG4gICAgfVxuXG4gICAgLy9cbiAgICBzdGF0aWMgX2Vic3AycmJzcCAob3JpZ2luQXJyKSB7XG4gICAgICAgIGNvbnN0IG9yaWdpbkxlbiA9ICBvcmlnaW5BcnIuYnl0ZUxlbmd0aDtcbiAgICAgICAgY29uc3QgZGlzdCA9IG5ldyBVaW50OEFycmF5KG9yaWdpbkFyci5ieXRlTGVuZ3RoKTtcbiAgICAgICAgbGV0IGRpc3RTaXplID0gMDtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gb3JpZ2luTGVuOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpID4gMiAmJiBvcmlnaW5BcnJbaV0gPT09IDMgJiYgb3JpZ2luQXJyW2kgLSAxXSA9PT0gMCAmJiBvcmlnaW5BcnJbaSAtIDJdID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkaXN0W2Rpc3RTaXplKytdID0gb3JpZ2luQXJyW2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGRpc3QuYnVmZmVyLCAwLCBkaXN0U2l6ZSk7XG4gICAgfVxufSIsImltcG9ydCBvYnNlcnZlciBmcm9tICcuLi91dGlscy9PYnNlcnZlcidcbmltcG9ydCBFcnJvcnMgZnJvbSAnLi4vbW9kZWxzL2Vycm9yJ1xuXG4vKipcbiAqIOi9rOeggeWZqOWfuuexu1xuICovXG5jbGFzcyBUcmFuc0NvZGVyIHtcbiAgY29uc3RydWN0b3IgKHN0b3JlKSB7XG4gICAgaWYgKHN0b3JlKSB7XG4gICAgICB0aGlzLl9zdG9yZSA9IHN0b3JlXG4gICAgfVxuICAgIHRoaXMuX29ic2VydmVyID0gb2JzZXJ2ZXJcbiAgICB0aGlzLm9uID0gb2JzZXJ2ZXIub24uYmluZChvYnNlcnZlcilcbiAgICB0aGlzLmVtaXQgPSBvYnNlcnZlci5lbWl0LmJpbmQob2JzZXJ2ZXIpXG4gICAgdGhpcy5vZmYgPSBvYnNlcnZlci5vZmYuYmluZChvYnNlcnZlcilcbiAgICB0aGlzLmZsdXNoID0gb2JzZXJ2ZXIuZmx1c2guYmluZChvYnNlcnZlcilcbiAgICB0aGlzLm9uY2UgPSBvYnNlcnZlci5vbmNlLmJpbmQob2JzZXJ2ZXIpXG4gIH1cbiAgZW1pdEVycm9yICh0eXBlLCBlcnJvckRldGFpbCA9IHtsaW5lOiAnJywgaGFuZGxlOiAnJywgbXNnOiAnJywgdmVyc2lvbjogJyd9KSB7XG4gICAgY29uc3QgeyBwbGF5ZXIsIHN0YXRlIH0gPSB0aGlzLl9zdG9yZVxuICAgIGlmIChwbGF5ZXIpIHtcbiAgICAgIGNvbnN0IGVycm9yVG9FbWl0ID0gbmV3IEVycm9ycyh0eXBlLCBwbGF5ZXIuY3VycmVudFRpbWUsIHN0YXRlLmR1cmF0aW9uLCAnJywgdHJ1ZSwgcGxheWVyLmNvbmZpZy51cmwsIHBsYXllci5jb25maWcudXJsLCBwbGF5ZXIuZW5kZWQsIGVycm9yRGV0YWlsKVxuICAgICAgcGxheWVyLmVtaXQoJ2Vycm9yJywgZXJyb3JUb0VtaXQpXG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBUcmFuc0NvZGVyXG4iLCIvLyByZWZyZW5jZTogaHR0cHM6Ly9naXRodWIuY29tL3ZpZGVvLWRldi9obHMuanMvYmxvYi9tYXN0ZXIvc3JjL2RlbXV4L2FkdHMuanNcbmltcG9ydCBEZW11eGVyIGZyb20gJy4vRGVtdXhlcidcbmltcG9ydCBEYXRhVmlldzRSZWFkIGZyb20gJy4uLy4uL3V0aWxzL0RhdGFWaWV3NFJlYWQnXG4vLyBpbXBvcnQgeyBtcDNWZXJzaW9ucywgbXAzQml0UmF0ZSwgYXVkaW9TYW1wbGVSYXRlIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcbmltcG9ydCB7XG4gIHNvdW5kUmF0ZVR5cGVzLFxuICBzYW1wbGluZ0ZyZXF1ZW5jeVR5cGVzLFxuICBFdmVudFR5cGVzLFxuICBicm93c2VyVHlwZXNcbn0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJ1xuaW1wb3J0IHNuaWZmZXIgZnJvbSAnLi4vLi4vdXRpbHMvc25pZmZlcidcbmltcG9ydCBCdWZmZXIgZnJvbSAnLi4vLi4vd3JpdGUvQnVmZmVyJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXVkaW9EZW11eGVyIGV4dGVuZHMgRGVtdXhlciB7XG4gIGNvbnN0cnVjdG9yIChzdG9yZSkge1xuICAgIHN1cGVyKHN0b3JlKVxuICAgIHRoaXMuQ0xBU1NfTkFNRSA9IHRoaXMuY29uc3RydWN0b3IubmFtZVxuICAgIHRoaXMuY3VycmVudFRhZyA9IG51bGxcbiAgICB0aGlzLmRhdGEgPSBuZXcgVWludDhBcnJheSgwKVxuICAgIHRoaXMucmVhZE9mZnNldCA9IDBcbiAgICB0aGlzLl9zdG9yZS5hdWRpb01ldGFEYXRhID0gbnVsbFxuICAgIHRoaXMuaGFuZGxlRGF0YVJlYWR5ID0gKCkgPT4ge31cbiAgICB0aGlzLmhhbmRsZU1ldGFEYXRhUmVhZHkgPSAoKSA9PiB7fVxuICAgIHRoaXMuaGFuZGxlTWVkaWFJbmZvUmVhZHkgPSAoKSA9PiB7fVxuICB9XG4gIHJlc29sdmUgKHRhZykge1xuICAgIHRoaXMucmVhZE9mZnNldCA9IDBcbiAgICBjb25zdCB7IF9zdG9yZTogc3RvcmUgfSA9IHRoaXNcbiAgICBjb25zdCB7IGF1ZGlvVHJhY2s6IHRyYWNrIH0gPSBzdG9yZVxuICAgIHRoaXMuY3VycmVudFRhZyA9IHRhZ1xuICAgIHRoaXMuZGF0YSA9IHRhZy5ib2R5XG4gICAgbGV0IHtcbiAgICAgIGF1ZGlvTWV0YURhdGE6IG1ldGFcbiAgICB9ID0gc3RvcmVcblxuICAgIGlmICghbWV0YSkge1xuICAgICAgbWV0YSA9IHN0b3JlLmF1ZGlvTWV0YURhdGEgPSB7fVxuICAgICAgc3RvcmUuYXVkaW9NZXRhRGF0YSA9IHRoaXMuaW5pdEF1ZGlvTWV0YShtZXRhKVxuICAgIH1cblxuICAgIGNvbnN0IGR2ID0gbmV3IERhdGFWaWV3NFJlYWQodGFnLmJvZHkuYnVmZmVyLCB0aGlzKVxuXG4gICAgY29uc3Qgc291bmQgPSBkdi5nZXRVaW50OCgpXG5cbiAgICBjb25zdCBzb3VuZEZvcm1hdElkeCA9IHNvdW5kID4+PiA0IC8vICBVSW50NFxuICAgIGNvbnN0IHNvdW5kUmF0ZSA9IChzb3VuZCAmIDEyKSA+Pj4gMiAvLyAgVUludDJcbiAgICAvLyBjb25zdCBzb3VuZFNpemUgPSAoc291bmQgJiAyKSA+Pj4gMSAvLyAgIFVJbnQxXG4gICAgY29uc3Qgc291bmRUeXBlID0gKHNvdW5kICUgMSkgLy8gVUludDFcblxuICAgIG1ldGEuYXVkaW9TYW1wbGVSYXRlID0gc291bmRSYXRlVHlwZXNbc291bmRSYXRlXVxuICAgIG1ldGEuY2hhbm5lbENvdW50ID0gc291bmRUeXBlID09PSAwID8gMSA6IDJcblxuICAgIGlmIChzb3VuZEZvcm1hdElkeCAhPT0gMTAgJiYgc291bmRGb3JtYXRJZHggIT09IDIpIHtcbiAgICAgIHRoaXMuZXJyb3IoJ29ubHkgc3VwcG9ydCBBQUMgQXVkaW8gZm9ybWF0IHNvIGZhcicpXG4gICAgICByZXR1cm5cbiAgICB9IGVsc2UgaWYgKHNvdW5kRm9ybWF0SWR4ID09PSAxMCkgeyAvLyBBQUNcbiAgICAgIGNvbnN0IGFhY0luZm8gPSB0aGlzLl9wYXJzZUFBQ0F1ZGlvKClcbiAgICAgIGlmICghYWFjSW5mbykge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBkYXRhOiBhYWNEYXRhLCBkYXRhOiB7IHNhbXBsZUZyZXEgfSB9ID0gYWFjSW5mb1xuICAgICAgaWYgKGFhY0luZm8ucGFja2V0VHlwZSA9PT0gMCkgeyAvLyBBQUMgc2VxdWVuY2UgaGVhZGVyXG4gICAgICAgIG1ldGEuc2FtcGxlUmF0ZSA9IHNhbXBsZUZyZXFcbiAgICAgICAgbWV0YS5jaGFubmVsQ291bnQgPSBhYWNEYXRhLmNoYW5uZWxDb3VudFxuICAgICAgICBtZXRhLmNvZGVjID0gYWFjRGF0YS5jb2RlY1xuICAgICAgICBtZXRhLm1hbmlmZXN0Q29kZWMgPSBhYWNEYXRhLm1hbmlmZXN0Q29kZWNcbiAgICAgICAgbWV0YS5jb25maWcgPSBhYWNEYXRhLmNvbmZpZ1xuICAgICAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uID0gMTAyNCAvIHNhbXBsZUZyZXEgKiBtZXRhLnRpbWVTY2FsZVxuICAgICAgICBpZiAoc3RvcmUuaGFzSW5pdGlhbE1ldGFEaXNwYXRjaGVkKSB7XG4gICAgICAgICAgaWYgKHN0b3JlLnZpZGVvVHJhY2subGVuZ3RoIHx8IHN0b3JlLmF1ZGlvVHJhY2subGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZURhdGFSZWFkeShzdG9yZS52aWRlb1RyYWNrLCBzdG9yZS5hdWRpb1RyYWNrKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdG9yZS5zdGF0ZS5fYXVkaW9Jbml0aWFsTWV0YWRhdGFEaXNwYXRjaGVkID0gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oYW5kbGVNZXRhRGF0YVJlYWR5KCdhdWRpbycsIG1ldGEpXG5cbiAgICAgICAgY29uc3QgeyBtZWRpYUluZm86IG1pIH0gPSBzdG9yZVxuICAgICAgICBtaS5hdWRpb0NvZGVjID0gbWV0YS5jb2RlY1xuICAgICAgICBtaS5hdWRpb1NhbXBsZVJhdGUgPSBtZXRhLnNhbXBsZVJhdGVcbiAgICAgICAgbWkuYXVkaW9DaGFubmVsQ291bnQgPSBtZXRhLmNoYW5uZWxDb3VudFxuICAgICAgICBtaS5hdWRpb0NvbmZpZyA9IG1ldGEuY29uZmlnXG4gICAgICAgIGlmIChtaS5oYXNWaWRlbykge1xuICAgICAgICAgIGlmIChtaS52aWRlb0NvZGVjKSB7XG4gICAgICAgICAgICBtaS5taW1lVHlwZSA9IGB2aWRlby94LWZsdjsgY29kZWNzPVwiJHttaS52aWRlb0NvZGVjfSwke21pLmF1ZGlvQ29kZWN9XCJgXG4gICAgICAgICAgICBtaS5jb2RlYyA9IG1pLm1pbWVUeXBlLnJlcGxhY2UoJ3gtZmx2JywgJ21wNCcpXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1pLm1pbWVUeXBlID0gYHZpZGVvL3gtZmx2OyBjb2RlY3M9XCIke21pLmF1ZGlvQ29kZWN9XCJgXG4gICAgICAgICAgbWkuY29kZWMgPSBtaS5taW1lVHlwZS5yZXBsYWNlKCd4LWZsdicsICdtcDQnKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1pLmlzQ29tcGxldGUpIHtcbiAgICAgICAgICB0aGlzLmhhbmRsZU1lZGlhSW5mb1JlYWR5KG1pKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGFhY0luZm8ucGFja2V0VHlwZSA9PT0gMSkgeyAvLyBBQUMgcmF3IGZyYW1lIGRhdGFcbiAgICAgICAgbGV0IGR0cyA9IHN0b3JlLnN0YXRlLnRpbWVTdGFtcEJhc2UgKyB0aGlzLmN1cnJlbnRUYWcuZ2V0VGltZSgpXG4gICAgICAgIGxldCBhYWNTYW1wbGUgPSB7IHVuaXQ6IGFhY0luZm8uZGF0YSwgbGVuZ3RoOiBhYWNJbmZvLmRhdGEuYnl0ZUxlbmd0aCwgZHRzOiBkdHMsIHB0czogZHRzIH1cbiAgICAgICAgdHJhY2suc2FtcGxlcy5wdXNoKGFhY1NhbXBsZSlcbiAgICAgICAgdHJhY2subGVuZ3RoICs9IGFhY0luZm8uZGF0YS5sZW5ndGhcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnJlc2V0U3RhdHVzKClcbiAgfVxuXG4gIF9wYXJzZUFBQ0F1ZGlvICgpIHtcbiAgICBpZiAodGhpcy51bnJlYWRMZW5ndGggPD0gMSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IGFhY0RhdGEgPSB7fVxuICAgIGxldCBhYWNBcnJheSA9IG5ldyBVaW50OEFycmF5KHRoaXMuZGF0YS5idWZmZXIsIHRoaXMucmVhZE9mZnNldCwgdGhpcy51bnJlYWRMZW5ndGgpXG4gICAgY29uc3QgcGFja2V0VHlwZSA9IGFhY0FycmF5WzBdXG4gICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDFcbiAgICBhYWNEYXRhLnBhY2tldFR5cGUgPSBwYWNrZXRUeXBlXG4gICAgaWYgKCFwYWNrZXRUeXBlKSB7XG4gICAgICBjb25zdCB7IHBvc2l0aW9uLCB0YWdTaXplIH0gPSB0aGlzLmN1cnJlbnRUYWdcbiAgICAgIHRoaXMuX3N0b3JlLm1ldGFFbmRQb3NpdGlvbiA9IHBvc2l0aW9uICsgQnVmZmVyLnJlYWRBc0ludCh0YWdTaXplKSArIDRcbiAgICAgIGFhY0RhdGEuZGF0YSA9IHRoaXMuX3BhcnNlQUFDQXVkaW9TcGVjaWZpY0NvbmZpZygpIC8vIEFBQyBTZXF1ZW5jZSBoZWFkZXJcbiAgICB9IGVsc2Uge1xuICAgICAgYWFjRGF0YS5kYXRhID0gYWFjQXJyYXkuc2xpY2UoMSlcbiAgICB9XG5cbiAgICByZXR1cm4gYWFjRGF0YVxuICB9XG4gIF9wYXJzZUFBQ0F1ZGlvU3BlY2lmaWNDb25maWcgKCkge1xuICAgIGNvbnN0IGR2ID0gbmV3IERhdGFWaWV3NFJlYWQodGhpcy5kYXRhLmJ1ZmZlciwgdGhpcylcbiAgICBjb25zdCB7IGdldEFuZE51bSB9ID0gRGF0YVZpZXc0UmVhZFxuXG4gICAgbGV0IHJlc3VsdE9iaiA9IHtcbiAgICAgIHNhbXBsaW5nRnJlcXVlbmN5OiBudWxsLFxuICAgICAgZXh0QXVkaW9PYmplY3RUeXBlOiBudWxsLFxuICAgICAgZXh0QXVkaW9TYW1wbGluZ0lkeDogbnVsbFxuICAgIH1cbiAgICBsZXQgY29uZmlnID0ge31cbiAgICBjb25zdCBVSW50MCA9IGR2LmdldFVpbnQ4KClcbiAgICBjb25zdCBVSW50MSA9IGR2LmdldFVpbnQ4KClcblxuICAgIGxldCB0ZW1wQXVkaW9PYmplY3RUeXBlXG4gICAgbGV0IGF1ZGlvT2JqZWN0VHlwZSA9IHRlbXBBdWRpb09iamVjdFR5cGUgPSBVSW50MCA+Pj4gMyAvLyBVSW50NVxuICAgIGxldCBzYW1wbGluZ0lkeCA9ICgoVUludDAgJiBnZXRBbmROdW0oNSwgNykpIDw8IDEpIHwgKFVJbnQxID4+PiA3KSAvLyBVSW50NFxuICAgIGlmIChzYW1wbGluZ0lkeCA8IDAgfHwgc2FtcGxpbmdJZHggPiBzYW1wbGluZ0ZyZXF1ZW5jeVR5cGVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5lbWl0RXJyb3IoJ2RlY29kZXInLCB7XG4gICAgICAgIGxpbmU6ICcxNDEnLFxuICAgICAgICBoYW5kbGU6ICdfcGFyc2VBQUNBdWRpb1NwZWNpZmljQ29uZmlnJyxcbiAgICAgICAgbXNnOiBgaW52YWxpZCBzYW1wbGluZ0ZyZXF1ZW5jeUluZGV4ICR7c2FtcGxpbmdJZHh9YFxuICAgICAgfSlcbiAgICAgIHRoaXMuZGlzcGF0Y2goRXZlbnRUeXBlcy5FUlJPUiwgYGVycm9yIHNhbXBsaW5nRnJlcXVlbmN5SW5kZXg6ICR7c2FtcGxpbmdJZHh9YClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHJlc3VsdE9iai5zYW1wbGluZ0ZyZXF1ZW5jeSA9IHNhbXBsaW5nRnJlcXVlbmN5VHlwZXNbc2FtcGxpbmdJZHhdXG5cbiAgICBsZXQgY2hhbm5lbENvdW50ID0gcmVzdWx0T2JqLmNoYW5uZWxDb3VudCA9IChVSW50MSAmIGdldEFuZE51bSgxLCA0KSkgPj4+IDNcbiAgICBpZiAoY2hhbm5lbENvdW50IDwgMCB8fCBjaGFubmVsQ291bnQgPiA3KSB7XG4gICAgICB0aGlzLmVtaXRFcnJvcignZGVjb2RlcicsIHtcbiAgICAgICAgbGluZTogJzE1NCcsXG4gICAgICAgIGhhbmRsZTogJ19wYXJzZUFBQ0F1ZGlvU3BlY2lmaWNDb25maWcnLFxuICAgICAgICBtc2c6IGBpbnZhbGlkIEF1ZGlvIENoYW5uZWwgQ291bnQ6ICR7Y2hhbm5lbENvdW50fWBcbiAgICAgIH0pXG4gICAgICB0aGlzLmRpc3BhdGNoKEV2ZW50VHlwZXMuRVJST1IsIGBlcnJvciBBdWRpbyBDaGFubmVsIENvdW50OiAke2NoYW5uZWxDb3VudH1gKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKGF1ZGlvT2JqZWN0VHlwZSA9PT0gNSkgeyAvLyBIRS1BQUNcbiAgICAgIGNvbnN0IFVJbnQyID0gZHYuZ2V0VWludDgoKVxuICAgICAgcmVzdWx0T2JqLmV4dEF1ZGlvU2FtcGxpbmdJZHggPSAoKFVJbnQxICYgZ2V0QW5kTnVtKDUsIDcpKSA8PCAxKSB8IFVJbnQyID4+PiA3XG4gICAgICByZXN1bHRPYmouZXh0QXVkaW9PYmplY3RUeXBlID0gKFVJbnQyICYgZ2V0QW5kTnVtKDEsIDUpKSA+Pj4gMlxuICAgIH1cblxuICAgIGlmIChzbmlmZmVyLmJyb3dzZXIgPT09IGJyb3dzZXJUeXBlcy5GSVJFX0ZPWCkge1xuICAgICAgaWYgKHNhbXBsaW5nSWR4ID49IDYpIHtcbiAgICAgICAgLy8gSEUtQUFDIHVzZXMgU0JSLCBoaWdoIGZyZXF1ZW5jaWVzIGFyZSBjb25zdHJ1Y3RlZCBmcm9tIGxvdyBmcmVxdWVuY2llc1xuICAgICAgICBhdWRpb09iamVjdFR5cGUgPSA1XG4gICAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSg0KVxuICAgICAgICByZXN1bHRPYmouZXh0QXVkaW9TYW1wbGluZ0lkeCA9IHNhbXBsaW5nSWR4IC0gM1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXVkaW9PYmplY3RUeXBlID0gMlxuICAgICAgICBjb25maWcgPSBuZXcgQXJyYXkoMilcbiAgICAgICAgcmVzdWx0T2JqLmV4dEF1ZGlvU2FtcGxpbmdJZHggPSBzYW1wbGluZ0lkeFxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc25pZmZlci5vcy5pc0FuZHJvaWQpIHtcbiAgICAgIC8vIEFuZHJvaWQgOiBhbHdheXMgdXNlIEFBQ1xuICAgICAgYXVkaW9PYmplY3RUeXBlID0gMlxuICAgICAgY29uZmlnID0gbmV3IEFycmF5KDIpXG4gICAgICByZXN1bHRPYmouZXh0QXVkaW9TYW1wbGluZ0lkeCA9IHNhbXBsaW5nSWR4XG4gICAgfSBlbHNlIHtcbiAgICAgIC8qICBmb3Igb3RoZXIgYnJvd3NlcnMgKENocm9tZS9WaXZhbGRpL09wZXJhIC4uLilcbiAgICAgICAgICAgICAgICBhbHdheXMgZm9yY2UgYXVkaW8gdHlwZSB0byBiZSBIRS1BQUMgU0JSLCBhcyBzb21lIGJyb3dzZXJzIGRvIG5vdCBzdXBwb3J0IGF1ZGlvIGNvZGVjIHN3aXRjaCBwcm9wZXJseSAobGlrZSBDaHJvbWUgLi4uKVxuICAgICAgICAgICAgKi9cbiAgICAgIGF1ZGlvT2JqZWN0VHlwZSA9IDVcbiAgICAgIHJlc3VsdE9iai5leHRlbnNpb25TYW1wbGluZ0luZGV4ID0gc2FtcGxpbmdJZHhcbiAgICAgIGNvbmZpZyA9IG5ldyBBcnJheSg0KVxuXG4gICAgICBpZiAoc2FtcGxpbmdJZHggPj0gNikge1xuICAgICAgICByZXN1bHRPYmouZXh0ZW5zaW9uU2FtcGxpbmdJZHggPSBzYW1wbGluZ0lkeCAtIDNcbiAgICAgIH0gZWxzZSBpZiAoY2hhbm5lbENvdW50ID09PSAxKSB7XG4gICAgICAgIGF1ZGlvT2JqZWN0VHlwZSA9IDJcbiAgICAgICAgY29uZmlnID0gbmV3IEFycmF5KDIpXG4gICAgICAgIHJlc3VsdE9iai5leHRlbnNpb25TYW1wbGluZ0luZGV4ID0gc2FtcGxpbmdJZHhcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25maWdbMF0gPSBhdWRpb09iamVjdFR5cGUgPDwgM1xuICAgIGNvbmZpZ1swXSB8PSAoc2FtcGxpbmdJZHggJiAweDBFKSA+PiAxXG4gICAgY29uZmlnWzFdIHw9IChzYW1wbGluZ0lkeCAmIDB4MDEpIDw8IDdcbiAgICBjb25maWdbMV0gfD0gY2hhbm5lbENvdW50IDw8IDNcbiAgICBpZiAoYXVkaW9PYmplY3RUeXBlID09PSA1KSB7XG4gICAgICBjb25maWdbMV0gfD0gKHJlc3VsdE9iai5leHRBdWRpb1NhbXBsaW5nSWR4ICYgMHgwRSkgPj4gMVxuICAgICAgY29uZmlnWzJdID0gKHJlc3VsdE9iai5leHRlbnNpb25TYW1wbGluZ0lkeCAmIDB4MDEpIDw8IDdcbiAgICAgIC8vIGFkdHNPYmplY3RUeXBlIChmb3JjZSB0byAyLCBjaHJvbWUgaXMgY2hlY2tpbmcgdGhhdCBvYmplY3QgdHlwZSBpcyBsZXNzIHRoYW4gNSA/Pz9cbiAgICAgIC8vICAgIGh0dHBzOi8vY2hyb21pdW0uZ29vZ2xlc291cmNlLmNvbS9jaHJvbWl1bS9zcmMuZ2l0LysvbWFzdGVyL21lZGlhL2Zvcm1hdHMvbXA0L2FhYy5jY1xuICAgICAgY29uZmlnWzJdIHw9IDIgPDwgMlxuICAgICAgY29uZmlnWzNdID0gMFxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBjb25maWcsXG4gICAgICBzYW1wbGVGcmVxOiByZXN1bHRPYmouc2FtcGxpbmdGcmVxdWVuY3ksXG4gICAgICBjaGFubmVsQ291bnQsXG4gICAgICBjb2RlYzogYG1wNGEuNDAuJHthdWRpb09iamVjdFR5cGV9YCxcbiAgICAgIG1hbmlmZXN0Q29kZWM6IGBtcDRhLjQwLiR7dGVtcEF1ZGlvT2JqZWN0VHlwZX1gXG4gICAgfVxuICB9XG5cbiAgaW5pdEF1ZGlvTWV0YSAobWV0YSkge1xuICAgIGNvbnN0IHsgc3RhdGUsIGF1ZGlvVHJhY2s6IHRyYWNrIH0gPSB0aGlzLl9zdG9yZVxuXG4gICAgbWV0YS5kdXJhdGlvbiA9IHN0YXRlLmR1cmF0aW9uXG4gICAgbWV0YS50aW1lU2NhbGUgPSBzdGF0ZS50aW1lU2NhbGVcbiAgICBtZXRhLnR5cGUgPSAnYXVkaW8nXG4gICAgbWV0YS5pZCA9IHRyYWNrLmlkXG5cbiAgICByZXR1cm4gbWV0YVxuICB9XG5cbiAgcmVzZXRTdGF0dXMgKCkge1xuICAgIHRoaXMuY3VycmVudFRhZyA9IG51bGxcbiAgICB0aGlzLmRhdGEgPSBuZXcgVWludDhBcnJheSgwKVxuICAgIHRoaXMucmVhZE9mZnNldCA9IDBcbiAgfVxuICBnZXQgZGF0YVNpemUgKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGEubGVuZ3RoXG4gIH1cblxuICBnZXQgdW5yZWFkTGVuZ3RoICgpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhU2l6ZSAtIHRoaXMucmVhZE9mZnNldFxuICB9XG59XG4iLCJpbXBvcnQgTG9nIGZyb20gJy4uLy4uL3V0aWxzL0xvZydcbmltcG9ydCBUcmFuc0NvZGVyIGZyb20gJy4uL1RyYW5zQ29kZXInXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZW11eGVyIGV4dGVuZHMgVHJhbnNDb2RlciB7XG4gIGRpc3BhdGNoICh0eXBlLCAuLi5wYXlsb2FkKSB7XG4gICAgY29uc3QgcHJlZml4ID0gJ2RlbXV4ZXJfJ1xuICAgIHRoaXMuX29ic2VydmVyLmVtaXQoYCR7cHJlZml4fSR7dHlwZX1gLCAuLi5wYXlsb2FkKVxuICB9XG4gIGVycm9yIChtZXNzYWdlKSB7XG4gICAgY29uc3QgeyBDTEFTU19OQU1FID0gJ0RlbXV4ZXInIH0gPSB0aGlzXG4gICAgTG9nLmVycm9yKGBbJHtDTEFTU19OQU1FfSBlcnJvcl0gYCwgbWVzc2FnZSlcbiAgfVxuXG4gIGluZm8gKG1lc3NhZ2UpIHtcbiAgICBjb25zdCB7IENMQVNTX05BTUUgPSAnRGVtdXhlcicgfSA9IHRoaXNcbiAgICBMb2cuaW5mbyhgWyR7Q0xBU1NfTkFNRX0gaW5mb10gYCwgbWVzc2FnZSlcbiAgfVxuXG4gIGxvZyAobWVzc2FnZSkge1xuICAgIGNvbnN0IHsgQ0xBU1NfTkFNRSA9ICdEZW11eGVyJyB9ID0gdGhpc1xuICAgIExvZy5sb2coYFske0NMQVNTX05BTUV9IGxvZ10gYCwgbWVzc2FnZSlcbiAgfVxuXG4gIHdhcm4gKG1lc3NhZ2UpIHtcbiAgICBjb25zdCB7IENMQVNTX05BTUUgPSAnRGVtdXhlcicgfSA9IHRoaXNcbiAgICBMb2cud2FybihgWyR7Q0xBU1NfTkFNRX0gd2Fybl0gYCwgbWVzc2FnZSlcbiAgfVxufVxuIiwiaW1wb3J0IHsgTWV0YVR5cGVzIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL3R5cGVzJztcbmltcG9ydCBVVEY4IGZyb20gJy4uLy4uL3V0aWxzL1VURjgnO1xuaW1wb3J0IERlbXV4ZXIgZnJvbSAnLi9EZW11eGVyJztcblxuLyoqXG4gKiBtZXRh5L+h5oGv6Kej5p6QXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1ldGFEZW11eGVyIGV4dGVuZHMgRGVtdXhlciB7XG4gICAgY29uc3RydWN0b3IgKHN0b3JlKSB7XG4gICAgICAgIHN1cGVyKHN0b3JlKTtcbiAgICAgICAgdGhpcy5vZmZzZXQgPSAwO1xuICAgICAgICB0aGlzLnJlYWRPZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICB9XG4gICAgZ2V0IGlzTGUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RvcmUuaXNMZTtcbiAgICB9XG4gICAgcmVzb2x2ZSAobWV0YSwgc2l6ZSkge1xuICAgICAgICBpZiAoc2l6ZSA8IDMpIHtcbiAgICAgICAgICAgIHRocm93ICdub3QgZW5vdWdoIGRhdGEgZm9yIG1ldGFpbmZvJztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBtZXRhRGF0YSA9IHt9O1xuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5wYXJzZVZhbHVlKG1ldGEpO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMucGFyc2VWYWx1ZShtZXRhLCBzaXplIC0gbmFtZS5ib2R5U2l6ZSk7XG4gICAgICAgIG1ldGFEYXRhW25hbWUuZGF0YV0gPSB2YWx1ZS5kYXRhO1xuXG4gICAgICAgIHRoaXMucmVzZXRTdGF0dXMoKTtcbiAgICAgICAgcmV0dXJuIG1ldGFEYXRhO1xuICAgIH1cblxuICAgIHJlc2V0U3RhdHVzICgpIHtcbiAgICAgICAgdGhpcy5vZmZzZXQgPSAwO1xuICAgICAgICB0aGlzLnJlYWRPZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICB9XG5cbiAgICBwYXJzZVN0cmluZyAoYnVmZmVyKSB7XG4gICAgICAgIGNvbnN0IGR2ID0gbmV3IERhdGFWaWV3KGJ1ZmZlciwgdGhpcy5yZWFkT2Zmc2V0KTtcbiAgICAgICAgY29uc3Qgc3RyTGVuID0gZHYuZ2V0VWludDE2KDAsICF0aGlzLmlzTGUpO1xuICAgICAgICBsZXQgc3RyID0gJyc7XG4gICAgICAgIGlmIChzdHJMZW4gPiAwKSB7XG4gICAgICAgICAgICBzdHIgPSBVVEY4LmRlY29kZShuZXcgVWludDhBcnJheShidWZmZXIsIHRoaXMucmVhZE9mZnNldCArIDIsIHN0ckxlbikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RyID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNpemUgPSBzdHJMZW4gKyAyO1xuICAgICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gc2l6ZTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGE6IHN0cixcbiAgICAgICAgICAgIGJvZHlTaXplOiBzdHJMZW4gKyAyLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHBhcnNlRGF0ZSAoYnVmZmVyLCBzaXplKSB7XG4gICAgICAgIGNvbnN0IHsgaXNMZSB9ID0gdGhpcztcbiAgICAgICAgY29uc3QgZHYgPSBuZXcgRGF0YVZpZXcoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQsIHNpemUpO1xuICAgICAgICBsZXQgdHMgPSBkdi5nZXRGbG9hdDY0KDAsICFpc0xlKTtcbiAgICAgICAgY29uc3QgdGltZU9mZnNldCA9IGR2LmdldEludDE2KDgsICFpc0xlKTtcbiAgICAgICAgdHMgKz0gdGltZU9mZnNldCAqIDYwICogMTAwMDtcblxuICAgICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gMTA7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhOiBuZXcgRGF0ZSh0cyksXG4gICAgICAgICAgICBib2R5U2l6ZTogMTAsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcGFyc2VPYmplY3QgKGJ1ZmZlciwgc2l6ZSkge1xuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5wYXJzZVN0cmluZyhidWZmZXIsIHNpemUpO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMucGFyc2VWYWx1ZShidWZmZXIsIHNpemUgLSBuYW1lLmJvZHlTaXplKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLmRhdGEsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLmRhdGEsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keVNpemU6IG5hbWUuYm9keVNpemUgKyB2YWx1ZS5ib2R5U2l6ZSxcbiAgICAgICAgICAgIGlzT2JqRW5kOiB2YWx1ZS5pc09iakVuZCxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwYXJzZUxvbmdTdHJpbmcgKGJ1ZmZlcikge1xuICAgICAgICBjb25zdCBkdiA9IG5ldyBEYXRhVmlldyhidWZmZXIsIHRoaXMucmVhZE9mZnNldCk7XG4gICAgICAgIGNvbnN0IHN0ckxlbiA9IGR2LmdldFVpbnQzMigwLCAhdGhpcy5pc0xlKTtcbiAgICAgICAgbGV0IHN0ciA9ICcnO1xuICAgICAgICBpZiAoc3RyTGVuID4gMCkge1xuICAgICAgICAgICAgc3RyID0gVVRGOC5kZWNvZGUobmV3IFVpbnQ4QXJyYXkoYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQgKyAyLCBzdHJMZW4pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0ciA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnN0IHNpemUgPSBzdHJMZW4gKyA0O1xuICAgICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gc3RyTGVuICsgNDtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGE6IHN0cixcbiAgICAgICAgICAgIGJvZHlTaXplOiBzdHJMZW4gKyA0LFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOino+aekG1ldGHkuK3nmoTlj5jph49cbiAgICAgKi9cbiAgICBwYXJzZVZhbHVlIChkYXRhLCBzaXplKSB7XG4gICAgICAgIGxldCBidWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoKTtcbiAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgICAgICAgYnVmZmVyID0gZGF0YTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJ1ZmZlciA9IGRhdGEuYnVmZmVyO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHsgaXNMZSB9ID0gdGhpcztcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgTlVNQkVSLFxuICAgICAgICAgICAgQk9PTEVBTixcbiAgICAgICAgICAgIFNUUklORyxcbiAgICAgICAgICAgIE9CSkVDVCxcbiAgICAgICAgICAgIE1JWF9BUlJBWSxcbiAgICAgICAgICAgIE9CSkVDVF9FTkQsXG4gICAgICAgICAgICBTVFJJQ1RfQVJSQVksXG4gICAgICAgICAgICBEQVRFLFxuICAgICAgICAgICAgTE9ORV9TVFJJTkcsXG4gICAgICAgIH0gPSBNZXRhVHlwZXM7XG4gICAgICAgIGNvbnN0IGRhdGFWaWV3ID0gbmV3IERhdGFWaWV3KGJ1ZmZlciwgdGhpcy5yZWFkT2Zmc2V0LCBzaXplKTtcbiAgICAgICAgbGV0IGlzT2JqRW5kID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IHR5cGUgPSBkYXRhVmlldy5nZXRVaW50OCgwKTtcbiAgICAgICAgbGV0IG9mZnNldCA9IDE7XG4gICAgICAgIHRoaXMucmVhZE9mZnNldCArPSAxO1xuICAgICAgICBsZXQgdmFsdWUgPSBudWxsO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBOVU1CRVI6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGRhdGFWaWV3LmdldEZsb2F0NjQoMSwgIWlzTGUpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVhZE9mZnNldCArPSA4O1xuICAgICAgICAgICAgICAgIG9mZnNldCArPSA4O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBCT09MRUFOOiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYm9vbE51bSA9IGRhdGFWaWV3LmdldFVpbnQ4KDEpO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gISFib29sTnVtO1xuICAgICAgICAgICAgICAgIHRoaXMucmVhZE9mZnNldCArPSAxO1xuICAgICAgICAgICAgICAgIG9mZnNldCArPSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBTVFJJTkc6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdHIgPSB0aGlzLnBhcnNlU3RyaW5nKGJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBzdHIuZGF0YTtcbiAgICAgICAgICAgICAgICBvZmZzZXQgKz0gc3RyLmJvZHlTaXplO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBPQkpFQ1Q6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHt9O1xuICAgICAgICAgICAgICAgIGxldCBvYmpFbmRTaXplID0gMDtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVZpZXcuZ2V0VWludDMyKHNpemUgLSA0LCAhaXNMZSkgJiAweDAwRkZGRkZGKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iakVuZFNpemUgPSAzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyB0aGlzLnJlYWRPZmZzZXQgKz0gb2Zmc2V0IC0gMTtcbiAgICAgICAgICAgICAgICB3aGlsZSAob2Zmc2V0IDwgc2l6ZSAtIDQpIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbWZPYmogPSB0aGlzLnBhcnNlT2JqZWN0KGJ1ZmZlciwgc2l6ZSAtIG9mZnNldCAtIG9iakVuZFNpemUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYW1mT2JqLmlzT2JqZWN0RW5kKSB7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlW2FtZk9iai5kYXRhLm5hbWVdID0gYW1mT2JqLmRhdGEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCArPSBhbWZPYmouYm9keVNpemU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgPD0gc2l6ZSAtIDMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFyayA9IGRhdGFWaWV3LmdldFVpbnQzMihvZmZzZXQgLSAxLCAhaXNMZSkgJiAweDAwRkZGRkZGO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWFyayA9PT0gOSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDM7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgKz0gMztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgTUlYX0FSUkFZOiB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB7fTtcbiAgICAgICAgICAgICAgICBvZmZzZXQgKz0gNDtcbiAgICAgICAgICAgICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gNDtcbiAgICAgICAgICAgICAgICBsZXQgb2JqRW5kU2l6ZSA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKChkYXRhVmlldy5nZXRVaW50MzIoc2l6ZSAtIDQsICFpc0xlKSAmIDB4MDBGRkZGRkYpID09PSA5KSB7XG4gICAgICAgICAgICAgICAgICAgIG9iakVuZFNpemUgPSAzO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHdoaWxlIChvZmZzZXQgPCBzaXplIC0gOCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbWZWYXIgPSB0aGlzLnBhcnNlT2JqZWN0KGJ1ZmZlciwgc2l6ZSAtIG9mZnNldCAtIG9iakVuZFNpemUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYW1mVmFyLmlzT2JqZWN0RW5kKSB7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlW2FtZlZhci5kYXRhLm5hbWVdID0gYW1mVmFyLmRhdGEudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCArPSBhbWZWYXIuYm9keVNpemU7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG9mZnNldCA8PSBzaXplIC0gMykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXJrZXIgPSBkYXRhVmlldy5nZXRVaW50MzIob2Zmc2V0IC0gMSwgIWlzTGUpICYgMHgwMEZGRkZGRjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hcmtlciA9PT0gOSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ICs9IDM7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlYWRPZmZzZXQgKz0gMztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSBPQkpFQ1RfRU5EOiB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlzT2JqRW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSBTVFJJQ1RfQVJSQVk6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IFtdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGFyckxlbmd0aCA9IGRhdGFWaWV3LmdldFVpbnQzMigxLCAhaXNMZSk7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ICs9IDQ7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDQ7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNjcmlwdCA9IHRoaXMucGFyc2VWYWx1ZShidWZmZXIsIHNpemUgLSBvZmZzZXQpO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5wdXNoKHNjcmlwdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ICs9IHNjcmlwdC5ib2R5U2l6ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhc2UgREFURToge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSB0aGlzLnBhcnNlRGF0ZShidWZmZXIsIHNpemUgLSAxKTtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGRhdGUuZGF0YTtcbiAgICAgICAgICAgICAgICBvZmZzZXQgKz0gZGF0ZS5ib2R5U2l6ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2FzZSBMT05FX1NUUklORzoge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxvbmdTdHIgPSB0aGlzLnBhcnNlTG9uZ1N0cmluZyhidWZmZXIsIHNpemUgLSAxKTtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGxvbmdTdHIuZGF0YTtcbiAgICAgICAgICAgICAgICBvZmZzZXQgKz0gbG9uZ1N0ci5ib2R5U2l6ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICAgIG9mZnNldCA9IHNpemU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF0YTogdmFsdWUsXG4gICAgICAgICAgICBib2R5U2l6ZTogb2Zmc2V0LFxuICAgICAgICAgICAgaXNPYmpFbmQ6IGlzT2JqRW5kLFxuICAgICAgICB9O1xuICAgIH1cblxufVxuXG4iLCJpbXBvcnQgRGVtdXhlciBmcm9tICcuL0RlbXV4ZXInXG5pbXBvcnQgTWV0YURlbXV4ZXIgZnJvbSAnLi9NZXRhRGVtdXhlcidcbmltcG9ydCBWaWRlb0RlbXV4ZXIgZnJvbSAnLi9WaWRlb0RlbXV4ZXInXG5pbXBvcnQgQXVkaW9EZW11eGVyIGZyb20gJy4vQXVkaW9EZW11eGVyJ1xuaW1wb3J0IExvZ2dlciBmcm9tICcuLi8uLi91dGlscy9Mb2cnXG5pbXBvcnQgbWV0YUZpZWxkcyBmcm9tICcuLi8uLi9jb25zdGFudHMvbWV0YUZpZWxkcydcblxuY29uc3QgbmF0aXZlSGFzUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHlcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFnZGVtdXggZXh0ZW5kcyBEZW11eGVyIHtcbiAgY29uc3RydWN0b3IgKHN0b3JlKSB7XG4gICAgc3VwZXIoc3RvcmUpXG4gICAgdGhpcy5DTEFTU19OQU1FID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lXG4gICAgdGhpcy5fbWV0YURlbXV4ZXIgPSBuZXcgTWV0YURlbXV4ZXIoc3RvcmUpXG4gICAgdGhpcy5fdmlkZW9EZW11eGVyID0gbmV3IFZpZGVvRGVtdXhlcihzdG9yZSlcbiAgICB0aGlzLl9hdWRpb0RlbXV4ZXIgPSBuZXcgQXVkaW9EZW11eGVyKHN0b3JlKVxuICAgIHRoaXMuX2ZpcnN0UGFyc2UgPSB0cnVlXG4gICAgdGhpcy5fZGF0YU9mZnNldCA9IDBcbiAgICB0aGlzLmhhbmRsZU1lZGlhSW5mb1JlYWR5ID0gKCkgPT4ge31cbiAgICB0aGlzLmhhbmRsZURhdGFSZWFkeSA9ICgpID0+IHt9XG4gICAgdGhpcy5oYW5kbGVNZXRhRGF0YVJlYWR5ID0gKCkgPT4ge31cbiAgfVxuICBzZXRFdmVudEJpbmQgKCkge1xuICAgIHRoaXMuX3ZpZGVvRGVtdXhlci5oYW5kbGVEYXRhUmVhZHkgPSB0aGlzLmhhbmRsZURhdGFSZWFkeVxuICAgIHRoaXMuX3ZpZGVvRGVtdXhlci5oYW5kbGVNZXRhRGF0YVJlYWR5ID0gdGhpcy5oYW5kbGVNZXRhRGF0YVJlYWR5XG4gICAgdGhpcy5fdmlkZW9EZW11eGVyLmhhbmRsZU1lZGlhSW5mb1JlYWR5ID0gdGhpcy5oYW5kbGVNZWRpYUluZm9SZWFkeVxuICAgIHRoaXMuX2F1ZGlvRGVtdXhlci5oYW5kbGVEYXRhUmVhZHkgPSB0aGlzLmhhbmRsZURhdGFSZWFkeVxuICAgIHRoaXMuX2F1ZGlvRGVtdXhlci5oYW5kbGVNZXRhRGF0YVJlYWR5ID0gdGhpcy5oYW5kbGVNZXRhRGF0YVJlYWR5XG4gICAgdGhpcy5fYXVkaW9EZW11eGVyLmhhbmRsZU1lZGlhSW5mb1JlYWR5ID0gdGhpcy5oYW5kbGVNZWRpYUluZm9SZWFkeVxuICB9XG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuX21ldGFEZW11eGVyID0gbnVsbFxuICAgIHRoaXMuX3ZpZGVvRGVtdXhlciA9IG51bGxcbiAgICB0aGlzLl9hdWRpb0RlbXV4ZXIgPSBudWxsXG4gIH1cblxuICByZXNvbHZlVGFncyAoKSB7XG4gICAgY29uc3Qge3RhZ3N9ID0gdGhpcy5fc3RvcmUuc3RhdGVcblxuICAgIGNvbnN0IHtfc3RvcmU6IHN0b3JlfSA9IHRoaXNcbiAgICBjb25zdCB7dmlkZW9UcmFjaywgYXVkaW9UcmFja30gPSBzdG9yZVxuXG4gICAgdGFncy5mb3JFYWNoKCh0YWcpID0+IHtcbiAgICAgIHRoaXMucmVzb2x2ZVRhZyh0YWcpXG4gICAgfSlcblxuICAgIGlmICh0aGlzLl9zdG9yZS5oYXNJbml0aWFsTWV0YURpc3BhdGNoZWQpIHtcbiAgICAgIGlmICh2aWRlb1RyYWNrLmxlbmd0aCB8fCBhdWRpb1RyYWNrLmxlbmd0aCkge1xuICAgICAgICB0aGlzLmhhbmRsZURhdGFSZWFkeShhdWRpb1RyYWNrLCB2aWRlb1RyYWNrKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX3N0b3JlLnN0YXRlLnRhZ3MgPSBbXVxuICB9XG5cbiAgcmVzb2x2ZVRhZyAodGFnKSB7XG4gICAgc3dpdGNoIChTdHJpbmcodGFnLnRhZ1R5cGUpKSB7XG4gICAgICBjYXNlICc4JzogLy8gYXVkaW9cbiAgICAgICAgdGhpcy5fcmVzb2x2ZUF1ZGlvVGFnKHRhZylcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJzknOiAvLyB2aWRlb1xuICAgICAgICB0aGlzLl9yZXNvbHZlVmlkZW9UYWcodGFnKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnMTgnOiAvLyBtZXRhZGF0YVxuICAgICAgICB0aGlzLl9yZXNvbHZlTWV0YVRhZyh0YWcpXG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgX3Jlc29sdmVBdWRpb1RhZyAodGFnKSB7XG4gICAgaWYgKHRhZy5ib2R5U2l6ZSA8PSAxKSB7XG4gICAgICB0aGlzLndhcm4oJ05vdCBlbm91Z2ggZGF0YSBmb3IgYXVkaW8gdGFnIGJvZHknKVxuICAgIH1cbiAgICB0aGlzLl9hdWRpb0RlbXV4ZXIucmVzb2x2ZSh0YWcpXG4gIH1cblxuICBfcmVzb2x2ZVZpZGVvVGFnICh0YWcpIHtcbiAgICBpZiAodGFnLmJvZHlTaXplIDw9IDEpIHtcbiAgICAgIHRoaXMuZXJyb3IoJ05vdCBlbm91Z2ggZGF0YSBmb3IgdmlkZW8gdGFnIGJvZHknKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IHtfaGFzVmlkZW8sIGhhc1ZpZGVvRmxhZ092ZXJyaWRlZH0gPSB0aGlzXG4gICAgaWYgKGhhc1ZpZGVvRmxhZ092ZXJyaWRlZCAmJiAhX2hhc1ZpZGVvKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLl92aWRlb0RlbXV4ZXIucmVzb2x2ZSh0YWcpXG4gIH1cblxuICBfaW5pdE1ldGFEYXRhIChtZXRhRGF0YSkge1xuICAgIGNvbnN0IHtfc3RvcmU6IHN9ID0gdGhpc1xuICAgIGlmIChuYXRpdmVIYXNQcm9wLmNhbGwobWV0YURhdGEsICdvbk1ldGFEYXRhJykpIHtcbiAgICAgIGlmIChzLmhhc01ldGFEYXRhKSB7XG4gICAgICAgIExvZ2dlci5sb2coYFske3RoaXMuQ0xBU1NfTkFNRX1dYCwgJ2ZvdW5kIGFub3RoZXIgbWV0YSB0YWcnKVxuICAgICAgfVxuICAgICAgcy5tZXRhRGF0YSA9IG1ldGFEYXRhXG4gICAgICBjb25zdCBvbk1ldGFEYXRhID0gbWV0YURhdGEub25NZXRhRGF0YVxuXG4gICAgICBtZXRhRmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgICBjb25zdCB7bmFtZSwgdHlwZSwgcGFyc2VyLCBvblR5cGVFcnJ9ID0gZmllbGRcbiAgICAgICAgaWYgKE9iamVjdChvbk1ldGFEYXRhW25hbWVdKSBpbnN0YW5jZW9mIHR5cGUpIHtcbiAgICAgICAgICBwYXJzZXIuY2FsbCh0aGlzLCBzLCBvbk1ldGFEYXRhKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChvblR5cGVFcnIgJiYgb25UeXBlRXJyIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIG9uVHlwZUVycihzLCBvbk1ldGFEYXRhKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgdGhpcy5fc3RvcmUubWVkaWFJbmZvLl9tZXRhRGF0YSA9IG1ldGFEYXRhXG4gICAgICAvLyDlkIzmraXliLDlhbHkuqtzdG9yZVxuICAgICAgaWYgKHRoaXMuX3N0b3JlLm1lZGlhSW5mby5pc0NvbXBsZXRlKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlTWVkaWFJbmZvUmVhZHkodGhpcy5fc3RvcmUubWVkaWFJbmZvKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9yZXNvbHZlTWV0YVRhZyAodGFnKSB7XG4gICAgY29uc3Qge2JvZHl9ID0gdGFnXG4gICAgY29uc3QgbWV0YU9iaiA9IHRoaXMuX21ldGFEZW11eGVyLnJlc29sdmUoYm9keSwgYm9keS5sZW5ndGgpXG4gICAgdGhpcy5faW5pdE1ldGFEYXRhKG1ldGFPYmopXG4gIH1cblxuICBfcGFyc2VLZXlmcmFtZXMgKGtleWZyYW1lcykge1xuICAgIGxldCB0aW1lcyA9IFtdXG4gICAgbGV0IGZpbGVQb3NpdGlvbnMgPSBbXVxuICAgIGNvbnN0IHt2aWRlb1RpbWVTY2FsZSwgc3RhdGV9ID0gdGhpcy5fc3RvcmVcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IGtleWZyYW1lcy50aW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGltZXNbdGltZXMubGVuZ3RoXSA9IHN0YXRlLnRpbWVTdGFtcEJhc2UgKyBNYXRoLmZsb29yKGtleWZyYW1lcy50aW1lc1tpXSAqIHZpZGVvVGltZVNjYWxlKVxuICAgICAgZmlsZVBvc2l0aW9uc1tmaWxlUG9zaXRpb25zLmxlbmd0aF0gPSBrZXlmcmFtZXMuZmlsZXBvc2l0aW9uc1tpXVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB0aW1lcyxcbiAgICAgIGZpbGVQb3NpdGlvbnNcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBEZW11eGVyIGZyb20gJy4vRGVtdXhlcidcbmltcG9ydCBTUFNQYXJzZXIgZnJvbSAnLi4vU1BTUGFyc2VyJ1xuaW1wb3J0IERhdGFWaWV3NFJlYWQgZnJvbSAnLi4vLi4vdXRpbHMvRGF0YVZpZXc0UmVhZCdcbmltcG9ydCB7IEV2ZW50VHlwZXMgfSBmcm9tICcuLi8uLi9jb25zdGFudHMvdHlwZXMnXG5pbXBvcnQgQnVmZmVyIGZyb20gJy4uLy4uL3dyaXRlL0J1ZmZlcidcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZGVvRGVtdXhlciBleHRlbmRzIERlbXV4ZXIge1xuICBjb25zdHJ1Y3RvciAoc3RvcmUpIHtcbiAgICBzdXBlcihzdG9yZSlcbiAgICB0aGlzLkNMQVNTX05BTUUgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWVcbiAgICB0aGlzLnJlYWRPZmZzZXQgPSAwXG4gICAgdGhpcy5kYXRhID0gbmV3IFVpbnQ4QXJyYXkoMClcbiAgICB0aGlzLmN1cnJlbnRUYWcgPSBudWxsXG4gICAgdGhpcy5fc3RvcmUudmlkZW9NZXRhRGF0YSA9IG51bGxcbiAgfVxuXG4gIHJlc2V0U3RhdHVzICgpIHtcbiAgICB0aGlzLnJlYWRPZmZzZXQgPSAwXG4gICAgdGhpcy5kYXRhID0gbmV3IFVpbnQ4QXJyYXkoMClcbiAgICB0aGlzLmN1cnJlbnRUYWcgPSBudWxsXG4gIH1cblxuICByZXNvbHZlICh0YWcpIHtcbiAgICB0aGlzLmRhdGEgPSB0YWcuYm9keVxuICAgIHRoaXMuY3VycmVudFRhZyA9IHRhZ1xuICAgIGNvbnN0IGZpcnN0VUk4ID0gdGhpcy5yZWFkRGF0YSgxKVswXVxuICAgIGNvbnN0IGZyYW1lVHlwZSA9IChmaXJzdFVJOCAmIDB4RjApID4+PiA0XG4gICAgY29uc3QgY29kZWNJZCA9IGZpcnN0VUk4ICYgMHgwRlxuICAgIGlmIChjb2RlY0lkICE9PSA3KSB7XG4gICAgICAvKiogMTogSlBFR1xuICAgICAgICAgICAgKiAyOiBIMjYzXG4gICAgICAgICAgICAqIDM6IFNjcmVlbiB2aWRlb1xuICAgICAgICAgICAgKiA0OiBPbjIgVlA2XG4gICAgICAgICAgICAqIDU6IE9uMiBWUDZcbiAgICAgICAgICAgICogNjogU2NyZWVuIHZpZGVvdmVyc2lvbiAyXG4gICAgICAgICAgICAqIDc6IEFWQ1xuICAgICAgICAgICAgKi9cbiAgICAgIHRoaXMuZXJyb3IoYHVuc3VwcG9ydGVkIGNvZGVjSWQ6ICR7Y29kZWNJZH1gKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHRoaXMuX3BhcnNlQVZDUGFja2V0KGZyYW1lVHlwZSlcblxuICAgIHRoaXMucmVzZXRTdGF0dXMoKVxuICB9XG5cbiAgX3BhcnNlQVZDUGFja2V0IChmcmFtZVR5cGUpIHtcbiAgICBpZiAodGhpcy51bnJlYWRMZW5ndGggPCA0KSB7XG4gICAgICB0aGlzLmVycm9yKCdJbnZhbGlkIEF2YyBUYWcnKVxuICAgIH1cbiAgICBjb25zdCBpc0xlID0gdGhpcy5fc3RvcmUuaXNMZVxuICAgIGNvbnN0IHsgYnVmZmVyIH0gPSB0aGlzLmRhdGFcbiAgICBjb25zdCBkdiA9IG5ldyBEYXRhVmlldyhidWZmZXIsIHRoaXMucmVhZE9mZnNldCwgdGhpcy51bnJlYWRMZW5ndGgpXG4gICAgY29uc3QgcGFja2FnZVR5cGUgPSBkdi5nZXRVaW50OCgwKVxuXG4gICAgbGV0IGNwc1RpbWUgPSBkdi5nZXRVaW50MzIoMCwgIWlzTGUpICYgMHgwMEZGRkZGRlxuICAgIGNwc1RpbWUgPSAoY3BzVGltZSA8PCA4KSA+PiA4XG4gICAgdGhpcy5yZWFkT2Zmc2V0ICs9IDRcblxuICAgIHN3aXRjaCAocGFja2FnZVR5cGUpIHtcbiAgICAgIGNhc2UgMDoge1xuICAgICAgICBjb25zdCB7IHBvc2l0aW9uLCB0YWdTaXplIH0gPSB0aGlzLmN1cnJlbnRUYWdcblxuICAgICAgICB0aGlzLl9zdG9yZS5tZXRhRW5kUG9zaXRpb24gPSBwb3NpdGlvbiArIEJ1ZmZlci5yZWFkQXNJbnQodGFnU2l6ZSkgKyA0IC8vIOe8k+WtmHNjcmlwdFRhZ+e7k+adn+eahOS9jee9ru+8jHJlcGxheeS9v+eUqFxuICAgICAgICB0aGlzLl9wYXJzZUFWQ0RlY29kZXJDb25maWd1cmF0aW9uUmVjb3JkKClcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGNhc2UgMToge1xuICAgICAgICB0aGlzLl9wYXJzZUFWQ1ZpZGVvRGF0YShmcmFtZVR5cGUsIGNwc1RpbWUpXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBjYXNlIDI6IHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgLy8g5oql6ZSZXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX3BhcnNlQVZDRGVjb2RlckNvbmZpZ3VyYXRpb25SZWNvcmQgKCkge1xuICAgIGlmICh0aGlzLnVucmVhZExlbmd0aCA8IDcpIHtcbiAgICAgIHRoaXMuZXJyb3IoJ0ludmFsaWQgQVZDRGVjb2RlckNvbmZpZ3VyYXRpb25SZWNvcmQsIGxhY2sgb2YgZGF0YSEnKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgeyBtZWRpYUluZm86IG1pIH0gPSB0aGlzLl9zdG9yZVxuICAgIC8vIHN0YXNoIG9mZnNldCZ1bnJlYWRTaXplIGJlZm9yZSBwYXJzaW5nIHNwcyZwcHNcbiAgICAvLyBjb25zdCB0ZW1wT2Zmc2V0ID0gdGhpcy5yZWFkT2Zmc2V0XG4gICAgLy8gY29uc3QgdGVtcFVucmVhZExlbmd0aCA9IHRoaXMudW5yZWFkTGVuZ3RoXG5cbiAgICBjb25zdCB7IF9zdG9yZTogc3RvcmUgfSA9IHRoaXNcbiAgICBsZXQgbWV0YSA9IHRoaXMuX3N0b3JlLnZpZGVvTWV0YURhdGFcbiAgICBsZXQgdHJhY2sgPSB0aGlzLl9zdG9yZS52aWRlb1RyYWNrXG4gICAgY29uc3QgZHYgPSBuZXcgRGF0YVZpZXc0UmVhZCh0aGlzLmRhdGEuYnVmZmVyLCB0aGlzKVxuICAgIGlmIChtZXRhKSB7XG4gICAgICBpZiAobWV0YS5hdmNjICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5lcnJvcignZm91bmQgYW5vdGhlciBBVkNEZWNvZGVyQ29uZmlndXJhdGlvblJlY29yZCEnKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXN0b3JlLnN0YXRlLl9oYXNWaWRlbyAmJiAhc3RvcmUuc3RhdGUuaGFzVmlkZW9GbGFnT3ZlcnJpZGVkKSB7XG4gICAgICAgIHN0b3JlLnN0YXRlLl9oYXNWaWRlbyA9IHRydWVcbiAgICAgICAgc3RvcmUuX21lZGlhSW5mby5oYXNWaWRlbyA9IHRydWVcbiAgICAgIH1cbiAgICAgIG1ldGEgPSBzdG9yZS52aWRlb01ldGFEYXRhID0ge31cbiAgICAgIG1ldGEudHlwZSA9ICd2aWRlbydcbiAgICAgIG1ldGEuaWQgPSB0cmFjay5pZFxuICAgICAgbWV0YS50aW1lU2NhbGUgPSBzdG9yZS52aWRlb1RpbWVTY2FsZVxuICAgICAgbWV0YS5kdXJhdGlvbiA9IHN0b3JlLnN0YXRlLmR1cmF0aW9uXG4gICAgICBtaS50aW1lc2NhbGUgPSBzdG9yZS52aWRlb1RpbWVTY2FsZVxuICAgIH1cblxuICAgIGNvbnN0IHZlcnNpb24gPSBkdi5nZXRVaW50OCgpXG4gICAgY29uc3QgYXZjUHJvZmlsZSA9IGR2LmdldFVpbnQ4KClcbiAgICBkdi5nZXRVaW50OCgpXG4gICAgZHYuZ2V0VWludDgoKVxuICAgIGlmICh2ZXJzaW9uICE9PSAxIHx8IGF2Y1Byb2ZpbGUgPT09IDApIHtcbiAgICAgIC8vIOWkhOeQhumUmeivr1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgbmFsdUxlbmd0aFNpemUgPSBzdG9yZS5zdGF0ZS5uYWx1TGVuZ3RoU2l6ZSA9IGR2LmdldFVpbnQoMiwgdGhpcy5yZWFkT2Zmc2V0LCBmYWxzZSkgKyAxXG4gICAgaWYgKG5hbHVMZW5ndGhTaXplICE9PSAzICYmIG5hbHVMZW5ndGhTaXplICE9PSA0KSB7XG4gICAgICAvLyDlpITnkIbplJnor69cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHNwc0xlbmd0aCA9IGR2LmdldFVpbnQoNSwgbnVsbCwgZmFsc2UpXG4gICAgaWYgKHNwc0xlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5lbWl0RXJyb3IoJ2RlY29kZXInLCB7XG4gICAgICAgIGxpbmU6IDEyOCxcbiAgICAgICAgaGFuZGxlcjogJ19wYXJzZUFWQ0RlY29kZXJDb25maWd1cmF0aW9uUmVjb3JkJyxcbiAgICAgICAgbXNnOiAnbm8gc3BzIGluIHRoaXMgdmlkZW8nXG4gICAgICB9KVxuICAgICAgLy8g5aSE55CG6ZSZ6K+vXG4gICAgICByZXR1cm5cbiAgICB9IGVsc2UgaWYgKHNwc0xlbmd0aCA+IDEpIHtcbiAgICAgIHRoaXMuZW1pdEVycm9yKCdkZWNvZGVyJywge1xuICAgICAgICBsaW5lOiAxMzIsXG4gICAgICAgIGhhbmRsZXI6ICdfcGFyc2VBVkNEZWNvZGVyQ29uZmlndXJhdGlvblJlY29yZCcsXG4gICAgICAgIG1zZzogJ3Nwc0xlbmd0aCA+IDEnXG4gICAgICB9KVxuICAgICAgdGhpcy53YXJuKCdBVkNEZWNvZGVyQ29uZmlndXJhdGlvblJlY29yZDogc3BzTGVuZ3RoID4gMScpXG4gICAgfVxuICAgIGxldCBzcHNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNwc0xlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBsZW4gPSBkdi5nZXRVaW50MTYoKVxuXG4gICAgICBpZiAobGVuID09PSAwKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICBzcHMgPSBuZXcgVWludDhBcnJheSh0aGlzLmRhdGEuYnVmZmVyLCB0aGlzLnJlYWRPZmZzZXQsIGxlbilcbiAgICAgIHRoaXMucmVhZE9mZnNldCArPSBsZW5cbiAgICAgIGNvbnN0IHNwc0NvbmZpZyA9IFNQU1BhcnNlci5wYXJzZVNQUyhzcHMpXG5cbiAgICAgIGlmIChpICE9PSAwKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY29kZWNTaXplLFxuICAgICAgICBwcmVzZW50U2l6ZSxcbiAgICAgICAgcHJvZmlsZVN0cmluZyxcbiAgICAgICAgbGV2ZWxTdHJpbmcsXG4gICAgICAgIGNocm9tYUZvcm1hdCxcbiAgICAgICAgcGl4ZWxSYXRpbyxcbiAgICAgICAgZnJhbWVSYXRlLFxuICAgICAgICByZWZGcmFtZXMsXG4gICAgICAgIGJpdERlcHRoXG4gICAgICB9ID0gc3BzQ29uZmlnXG5cbiAgICAgIG1ldGEud2lkdGggPSBjb2RlY1NpemUud2lkdGhcbiAgICAgIG1ldGEuaGVpZ2h0ID0gY29kZWNTaXplLmhlaWdodFxuICAgICAgbWV0YS5wcmVzZW50V2lkdGggPSBwcmVzZW50U2l6ZS53aWR0aFxuICAgICAgbWV0YS5wcmVzZW50SGVpZ2h0ID0gcHJlc2VudFNpemUuaGVpZ2h0XG5cbiAgICAgIG1ldGEucHJvZmlsZSA9IHByb2ZpbGVTdHJpbmdcbiAgICAgIG1ldGEubGV2ZWwgPSBsZXZlbFN0cmluZ1xuICAgICAgLy8gbWV0YS5wcm9maWxlQ29tcGF0aWJpbGl0eSA9IHByb2ZpbGVDb21wYXRpYmlsaXR5O1xuICAgICAgLy8gbWV0YS5uYWx1TGVuZ3RoU2l6ZSA9IG5hbHVMZW5ndGhTaXplO1xuXG4gICAgICBtZXRhLmJpdERlcHRoID0gYml0RGVwdGhcbiAgICAgIG1ldGEuY2hyb21hRm9ybWF0ID0gY2hyb21hRm9ybWF0XG4gICAgICBtZXRhLnBpeGVsUmF0aW8gPSBwaXhlbFJhdGlvXG4gICAgICBtZXRhLmZyYW1lUmF0ZSA9IGZyYW1lUmF0ZVxuXG4gICAgICBpZiAoIWZyYW1lUmF0ZS5maXhlZCB8fFxuICAgICAgICAgICAgICAgIGZyYW1lUmF0ZS5mcHNOdW0gPT09IDAgfHxcbiAgICAgICAgICAgICAgICBmcmFtZVJhdGUuZnBzRGVuID09PSAwKSB7XG4gICAgICAgIG1ldGEuZnJhbWVSYXRlID0gc3RvcmUucmVmZXJGcmFtZVJhdGVcbiAgICAgIH1cblxuICAgICAgbGV0IHsgZnBzRGVuLCBmcHNOdW0gfSA9IG1ldGEuZnJhbWVSYXRlXG4gICAgICBtZXRhLnJlZlNhbXBsZUR1cmF0aW9uID0gbWV0YS50aW1lU2NhbGUgKiAoZnBzRGVuIC8gZnBzTnVtKVxuXG4gICAgICBsZXQgY29kZWNBcnIgPSBzcHMuc3ViYXJyYXkoMSwgNClcbiAgICAgIGxldCBjb2RlY1N0ciA9ICdhdmMxLidcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMzsgaisrKSB7XG4gICAgICAgIGxldCBoZXggPSBjb2RlY0FycltqXS50b1N0cmluZygxNilcbiAgICAgICAgaGV4ID0gaGV4LnBhZFN0YXJ0KDIsICcwJylcbiAgICAgICAgY29kZWNTdHIgKz0gaGV4XG4gICAgICB9XG5cbiAgICAgIG1ldGEuY29kZWMgPSBjb2RlY1N0clxuXG4gICAgICBjb25zdCB7IG1lZGlhSW5mbzogbWkgfSA9IHRoaXMuX3N0b3JlXG4gICAgICBtaS53aWR0aCA9IG1ldGEud2lkdGhcbiAgICAgIG1pLmhlaWdodCA9IG1ldGEuaGVpZ2h0XG4gICAgICBtaS5mcHMgPSBtZXRhLmZyYW1lUmF0ZS5mcHNcbiAgICAgIG1pLnByb2ZpbGUgPSBtZXRhLnByb2ZpbGVcbiAgICAgIG1pLmxldmVsID0gbWV0YS5sZXZlbFxuICAgICAgbWkucmVmRnJhbWVzID0gcmVmRnJhbWVzXG4gICAgICBtaS5waXhlbFJhdGlvID0gcGl4ZWxSYXRpb1xuICAgICAgbWkudmlkZW9Db2RlYyA9IGNvZGVjU3RyXG4gICAgICBtaS5jaHJvbWFGb3JtYXQgPSBjaHJvbWFGb3JtYXRcbiAgICAgIGlmIChtaS5oYXNBdWRpbykge1xuICAgICAgICBpZiAobWkuYXVkaW9Db2RlYykge1xuICAgICAgICAgIG1pLm1pbWVUeXBlID0gYHZpZGVvL3gtZmx2OyBjb2RlY3M9XCIke21pLnZpZGVvQ29kZWN9LCR7bWkuYXVkaW9Db2RlY31cImBcbiAgICAgICAgICBtaS5jb2RlYyA9IG1pLm1pbWVUeXBlLnJlcGxhY2UoJ3gtZmx2JywgJ21wNCcpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1pLm1pbWVUeXBlID0gYHZpZGVvL3gtZmx2OyBjb2RlY3M9XCIke21pLnZpZGVvQ29kZWN9XCJgXG4gICAgICAgIG1pLmNvZGVjID0gbWkubWltZVR5cGUucmVwbGFjZSgneC1mbHYnLCAnbXA0JylcbiAgICAgIH1cblxuICAgICAgaWYgKG1pLmlzQ29tcGxldGUpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVNZWRpYUluZm9SZWFkeShtaSlcbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IHBwc1xuICAgIGNvbnN0IHBwc0NvdW50ID0gZHYuZ2V0VWludDgoKVxuICAgIGlmICghcHBzQ291bnQpIHtcbiAgICAgIHRoaXMuZW1pdEVycm9yKCdkZWNvZGVyJywge1xuICAgICAgICBsaW5lOiAyMjcsXG4gICAgICAgIGhhbmRsZXI6ICdfcGFyc2VBVkNEZWNvZGVyQ29uZmlndXJhdGlvblJlY29yZCcsXG4gICAgICAgIG1zZzogJ25vIHBwcyBpbiB0aGlzIHZpZGVvJ1xuICAgICAgfSlcbiAgICAgIHRoaXMuZGlzcGF0Y2goRXZlbnRUeXBlcy5FUlJPUiwgJ25vIHBwcyBpbiB0aGlzIHZpZGVvJylcbiAgICAgIHJldHVyblxuICAgIH0gZWxzZSBpZiAocHBzQ291bnQgPiAxKSB7XG4gICAgICB0aGlzLndhcm4oYEFWQ0RlY29kZXJDb25maWd1cmF0aW9uUmVjb3JkIGhhcyBwcHNDb3VudDogJHtwcHNDb3VudH1gKVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHBzQ291bnQ7IGkrKykge1xuICAgICAgbGV0IHBwc1NpemUgPSBkdi5nZXRVaW50MTYoKVxuXG4gICAgICBpZiAoIXBwc1NpemUpIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgcHBzID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5kYXRhLmJ1ZmZlciwgdGhpcy5yZWFkT2Zmc2V0LCBwcHNTaXplKVxuICAgICAgdGhpcy5yZWFkT2Zmc2V0ICs9IHBwc1NpemVcbiAgICB9XG5cbiAgICBtaS5zcHMgPSBtZXRhLnNwcyA9IHNwc1xuICAgIG1pLnBwcyA9IG1ldGEucHBzID0gcHBzXG4gICAgaWYgKHN0b3JlLmhhc0luaXRpYWxNZXRhRGlzcGF0Y2hlZCkge1xuICAgICAgaWYgKHN0b3JlLnZpZGVvVHJhY2subGVuZ3RoIHx8IHN0b3JlLmF1ZGlvVHJhY2subGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlRGF0YVJlYWR5KHN0b3JlLnZpZGVvVHJhY2ssIHN0b3JlLmF1ZGlvVHJhY2spXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0b3JlLnN0YXRlLl92aWRlb0luaXRpYWxNZXRhZGF0YURpc3BhdGNoZWQgPSB0cnVlXG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGVNZXRhRGF0YVJlYWR5KCd2aWRlbycsIG1ldGEpXG4gIH1cblxuICBfcGFyc2VBVkNWaWRlb0RhdGEgKGZyYW1lVHlwZSwgY3BzVGltZSkge1xuICAgIGxldCBkdiA9IG5ldyBEYXRhVmlldzRSZWFkKHRoaXMuZGF0YS5idWZmZXIsIHRoaXMpXG5cbiAgICBsZXQgbmFsdUxpc3QgPSBbXVxuICAgIGxldCBkYXRhTGVuID0gMFxuICAgIGNvbnN0IHsgbmFsdUxlbmd0aFNpemU6IG5hbHVMZW5TaXplIH0gPSB0aGlzLl9zdG9yZS5zdGF0ZVxuICAgIGxldCB0cyA9IHRoaXMuX3N0b3JlLnN0YXRlLnRpbWVTdGFtcEJhc2UgKyB0aGlzLmN1cnJlbnRUYWcuZ2V0VGltZSgpXG4gICAgbGV0IGlzS2V5ZnJhbWUgPSAoZnJhbWVUeXBlID09PSAxKVxuICAgIHdoaWxlICh0aGlzLnVucmVhZExlbmd0aCA+IDApIHtcbiAgICAgIGlmICh0aGlzLnVucmVhZExlbmd0aCA8IDQpIHtcbiAgICAgICAgdGhpcy53YXJuKCdub3QgZW5vdWdoIGRhdGEgZm9yIHBhcnNpbmcgQVZDJylcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRlbXBSZWFkT2Zmc2V0ID0gdGhpcy5yZWFkT2Zmc2V0XG4gICAgICBsZXQgbmFsdVNpemUgPSBuYWx1TGVuU2l6ZSA9PT0gNCA/IGR2LmdldFVpbnQzMigpIDogZHYuZ2V0VWludDI0KClcbiAgICAgIGlmIChuYWx1U2l6ZSA+IHRoaXMudW5yZWFkTGVuZ3RoKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBsZXQgdW5pdFR5cGUgPSBkdi5nZXRVaW50KDUsIHRoaXMucmVhZE9mZnNldCwgZmFsc2UpXG5cbiAgICAgIGlmICh1bml0VHlwZSA9PT0gNSkge1xuICAgICAgICBpc0tleWZyYW1lID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBsZXQgZGF0YSA9IG5ldyBVaW50OEFycmF5KHRoaXMuZGF0YS5idWZmZXIsIHRlbXBSZWFkT2Zmc2V0LCBuYWx1TGVuU2l6ZSArIG5hbHVTaXplKVxuICAgICAgdGhpcy5yZWFkT2Zmc2V0ID0gdGVtcFJlYWRPZmZzZXQgKyBuYWx1TGVuU2l6ZSArIG5hbHVTaXplXG4gICAgICBjb25zdCBuYWx1VW5pdCA9IHtcbiAgICAgICAgdHlwZTogdW5pdFR5cGUsXG4gICAgICAgIGRhdGFcbiAgICAgIH1cbiAgICAgIG5hbHVMaXN0LnB1c2gobmFsdVVuaXQpXG4gICAgICBkYXRhTGVuICs9IGRhdGEuYnl0ZUxlbmd0aFxuICAgIH1cbiAgICBkdiA9IG51bGxcbiAgICBpZiAobmFsdUxpc3QubGVuZ3RoKSB7XG4gICAgICBjb25zdCB7IHZpZGVvVHJhY2sgfSA9IHRoaXMuX3N0b3JlXG4gICAgICBjb25zdCB2aWRlb1NhbXBsZSA9IHtcbiAgICAgICAgdW5pdHM6IG5hbHVMaXN0LFxuICAgICAgICBsZW5ndGg6IGRhdGFMZW4sXG4gICAgICAgIGR0czogdHMsXG4gICAgICAgIGNwczogY3BzVGltZSxcbiAgICAgICAgcHRzOiAodHMgKyBjcHNUaW1lKSxcbiAgICAgICAgaXNLZXlmcmFtZSxcbiAgICAgICAgcG9zaXRpb246IGlzS2V5ZnJhbWUgPyB0aGlzLmN1cnJlbnRUYWcucG9zaXRpb24gOiB1bmRlZmluZWRcbiAgICAgIH1cbiAgICAgIHZpZGVvVHJhY2suc2FtcGxlcy5wdXNoKHZpZGVvU2FtcGxlKVxuICAgICAgdmlkZW9UcmFjay5sZW5ndGggKz0gZGF0YUxlblxuICAgIH1cbiAgfVxuXG4gIHJlYWREYXRhIChudW0pIHtcbiAgICBjb25zdCB7IGRhdGEsIHJlYWRPZmZzZXQgfSA9IHRoaXNcbiAgICBpZiAodGhpcy5kYXRhU2l6ZSA+IHJlYWRPZmZzZXQgKyBudW0pIHtcbiAgICAgIHRoaXMucmVhZE9mZnNldCArPSBudW1cbiAgICAgIHJldHVybiBkYXRhLnNsaWNlKHJlYWRPZmZzZXQsIG51bSlcbiAgICB9XG4gICAgcmV0dXJuIFtdXG4gIH1cblxuICBnZXQgZGF0YVNpemUgKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGEubGVuZ3RoXG4gIH1cbiAgZ2V0IHVucmVhZExlbmd0aCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVNpemUgLSB0aGlzLnJlYWRPZmZzZXRcbiAgfVxufVxuIiwiaW1wb3J0IEJ1ZmZlciBmcm9tICcuLi8uLi93cml0ZS9CdWZmZXInXG4vLyBjb25zdCBVSU5UMzJfTUFYID0gTWF0aC5wb3coMiwgMzIpIC0gMTtcbmltcG9ydCB7IGNhY2hlV3JhcHBlciB9IGZyb20gJy4uLy4uL3V0aWxzL2Z1bmNVdGlscydcbmNsYXNzIEZNUDQge1xuICBzdGF0aWMgc2l6ZSAodmFsdWUpIHtcbiAgICByZXR1cm4gQnVmZmVyLndyaXRlVWludDMyKHZhbHVlKVxuICB9XG4gIHN0YXRpYyBpbml0Qm94IChzaXplLCBuYW1lLCAuLi5jb250ZW50KSB7XG4gICAgY29uc3QgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgYnVmZmVyLndyaXRlKEZNUDQuc2l6ZShzaXplKSwgRk1QNC50eXBlKG5hbWUpLCAuLi5jb250ZW50KVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIGV4dGVuc2lvbiAodmVyc2lvbiwgZmxhZykge1xuICAgIHJldHVybiBuZXcgVWludDhBcnJheShbXG4gICAgICB2ZXJzaW9uLFxuICAgICAgKGZsYWcgPj4gMTYpICYgMHhmZixcbiAgICAgIChmbGFnID4+IDgpICYgMHhmZixcbiAgICAgIGZsYWcgJiAweGZmXG4gICAgXSlcbiAgfVxuICBzdGF0aWMgZnR5cCAoKSB7XG4gICAgcmV0dXJuIEZNUDQuaW5pdEJveCgyNCwgJ2Z0eXAnLCBuZXcgVWludDhBcnJheShbXG4gICAgICAweDY5LCAweDczLCAweDZGLCAweDZELCAvLyBpc29tLFxuICAgICAgMHgwLCAweDAsIDB4MDAsIDB4MDEsIC8vIG1pbm9yX3ZlcnNpb246IDB4MDFcbiAgICAgIDB4NjksIDB4NzMsIDB4NkYsIDB4NkQsIC8vIGlzb21cbiAgICAgIDB4NjEsIDB4NzYsIDB4NjMsIDB4MzEgLy8gYXZjMVxuICAgIF0pKVxuICB9XG4gIHN0YXRpYyBtb292IChkYXRhKSB7XG4gICAgbGV0IHNpemUgPSA4XG4gICAgbGV0IG12aGQgPSBGTVA0Lm12aGQoZGF0YS5kdXJhdGlvbiwgZGF0YS50aW1lc2NhbGUpXG4gICAgbGV0IHRyYWsxID0gRk1QNC52aWRlb1RyYWsoZGF0YSlcbiAgICBsZXQgdHJhazIgPSBGTVA0LmF1ZGlvVHJhayhkYXRhKVxuICAgIGxldCBtdmV4ID0gRk1QNC5tdmV4KGRhdGEuZHVyYXRpb24sIGRhdGEudGltZXNjYWxlKTtcbiAgICBbbXZoZCwgdHJhazEsIHRyYWsyLCBtdmV4XS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGhcbiAgICB9KVxuICAgIHJldHVybiBGTVA0LmluaXRCb3goc2l6ZSwgJ21vb3YnLCBtdmhkLCB0cmFrMSwgdHJhazIsIG12ZXgpXG4gIH1cbiAgc3RhdGljIG12aGQgKGR1cmF0aW9uLCB0aW1lU2NhbGUpIHtcbiAgICBsZXQgdGltZXNjYWxlID0gdGltZVNjYWxlIHx8IDEwMDBcbiAgICAvLyBkdXJhdGlvbiAqPSB0aW1lc2NhbGU7XG4gICAgbGV0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gdmVyc2lvbigwKSArIGZsYWdzICAgICAx5L2N55qEYm9454mI5pysKzPkvY1mbGFncyAgIGJveOeJiOacrO+8jDDmiJYx77yM5LiA6Iis5Li6MOOAgu+8iOS7peS4i+Wtl+iKguaVsOWdh+aMiXZlcnNpb249MO+8iVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gY3JlYXRpb25fdGltZSAgICDliJvlu7rml7bpl7QgIO+8iOebuOWvueS6jlVUQ+aXtumXtDE5MDQtMDEtMDHpm7bngrnnmoTnp5LmlbDvvIlcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIG1vZGlmaWNhdGlvbl90aW1lICAg5L+u5pS55pe26Ze0XG5cbiAgICAgIC8qKlxuICAgICAgICAgICAgICogdGltZXNjYWxlOiA0IGJ5dGVz5paH5Lu25aqS5L2T5ZyoMeenkuaXtumXtOWGheeahOWIu+W6puWAvO+8jOWPr+S7peeQhuino+S4ujHnp5Lplb/luqZcbiAgICAgICAgICAgICAqL1xuICAgICAgKHRpbWVzY2FsZSA+Pj4gMjQpICYgMHhGRixcbiAgICAgICh0aW1lc2NhbGUgPj4+IDE2KSAmIDB4RkYsXG4gICAgICAodGltZXNjYWxlID4+PiA4KSAmIDB4RkYsXG4gICAgICAodGltZXNjYWxlKSAmIDB4RkYsXG5cbiAgICAgIC8qKlxuICAgICAgICAgICAgICogZHVyYXRpb246IDQgYnl0ZXPor6V0cmFja+eahOaXtumXtOmVv+W6pu+8jOeUqGR1cmF0aW9u5ZKMdGltZSBzY2FsZeWAvOWPr+S7peiuoeeul3RyYWNr5pe26ZW/77yM5q+U5aaCYXVkaW8gdHJhY2vnmoR0aW1lIHNjYWxlID0gODAwMCxcbiAgICAgICAgICAgICAqIGR1cmF0aW9uID0gNTYwMTI477yM5pe26ZW/5Li6NzAuMDE277yMdmlkZW8gdHJhY2vnmoR0aW1lIHNjYWxlID0gNjAwLCBkdXJhdGlvbiA9IDQyMDAw77yM5pe26ZW/5Li6NzBcbiAgICAgICAgICAgICAqL1xuICAgICAgKGR1cmF0aW9uID4+PiAyNCkgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uID4+PiAxNikgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uID4+PiA4KSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24pICYgMHhGRixcbiAgICAgIDB4MDAsIDB4MDEsIDB4MDAsIDB4MDAsIC8vIFByZWZlcnJlZCByYXRlOiAxLjAgICDmjqjojZDmkq3mlL7pgJ/njofvvIzpq5gxNuS9jeWSjOS9jjE25L2N5YiG5Yir5Li65bCP5pWw54K55pW05pWw6YOo5YiG5ZKM5bCP5pWw6YOo5YiG77yM5Y2zWzE2LjE2XSDmoLzlvI/vvIzor6XlgLzkuLoxLjDvvIgweDAwMDEwMDAw77yJ6KGo56S65q2j5bi45YmN5ZCR5pKt5pS+XG4gICAgICAvKipcbiAgICAgICAgICAgICAqIFByZWZlcnJlZFZvbHVtZSgxLjAsIDJieXRlcykgKyByZXNlcnZlZCgyYnl0ZXMpXG4gICAgICAgICAgICAgKiDkuI5yYXRl57G75Ly877yMWzguOF0g5qC85byP77yMMS4w77yIMHgwMTAw77yJ6KGo56S65pyA5aSn6Z+z6YePXG4gICAgICAgICAgICAgKi9cbiAgICAgIDB4MDEsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyAgcmVzZXJ2ZWQ6IDQgKyA0IGJ5dGVz5L+d55WZ5L2NXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMSwgMHgwMCwgMHgwMCwgLy8gLS0tLWJlZ2luIGNvbXBvc2l0aW9uIG1hdHJpeC0tLS1cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyDop4bpopHlj5jmjaLnn6npmLUgICDnur/mgKfku6PmlbBcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAxLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHg0MCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gLS0tLWVuZCBjb21wb3NpdGlvbiBtYXRyaXgtLS0tXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyAtLS0tYmVnaW4gcHJlX2RlZmluZWQgNiAqIDQgYnl0ZXMtLS0tXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcHJlLWRlZmluZWQg5L+d55WZ5L2NXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIC0tLS1lbmQgcHJlX2RlZmluZWQgNiAqIDQgYnl0ZXMtLS0tXG4gICAgICAweEZGLCAweEZGLCAweEZGLCAweEZGIC8vIG5leHRfdHJhY2tfSUQg5LiL5LiA5LiqdHJhY2vkvb/nlKjnmoRpZOWPt1xuICAgIF0pXG4gICAgcmV0dXJuIEZNUDQuaW5pdEJveCg4ICsgYnl0ZXMubGVuZ3RoLCAnbXZoZCcsIG5ldyBVaW50OEFycmF5KGJ5dGVzKSlcbiAgfVxuICBzdGF0aWMgdmlkZW9UcmFrIChkYXRhKSB7XG4gICAgbGV0IHNpemUgPSA4XG4gICAgbGV0IHRraGQgPSBGTVA0LnRraGQoe1xuICAgICAgaWQ6IDEsXG4gICAgICBkdXJhdGlvbjogZGF0YS5kdXJhdGlvbixcbiAgICAgIHRpbWVzY2FsZTogZGF0YS50aW1lc2NhbGUsXG4gICAgICB3aWR0aDogZGF0YS53aWR0aCxcbiAgICAgIGhlaWdodDogZGF0YS5oZWlnaHQsXG4gICAgICB0eXBlOiAndmlkZW8nXG4gICAgfSlcbiAgICBsZXQgbWRpYSA9IEZNUDQubWRpYSh7XG4gICAgICB0eXBlOiAndmlkZW8nLFxuICAgICAgdGltZXNjYWxlOiBkYXRhLnRpbWVzY2FsZSxcbiAgICAgIGR1cmF0aW9uOiBkYXRhLmR1cmF0aW9uLFxuICAgICAgc3BzOiBkYXRhLnNwcyxcbiAgICAgIHBwczogZGF0YS5wcHMsXG4gICAgICBwaXhlbFJhdGlvOiBkYXRhLnBpeGVsUmF0aW8sXG4gICAgICB3aWR0aDogZGF0YS53aWR0aCxcbiAgICAgIGhlaWdodDogZGF0YS5oZWlnaHRcbiAgICB9KTtcbiAgICBbdGtoZCwgbWRpYV0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRk1QNC5pbml0Qm94KHNpemUsICd0cmFrJywgdGtoZCwgbWRpYSlcbiAgfVxuICBzdGF0aWMgYXVkaW9UcmFrIChkYXRhKSB7XG4gICAgbGV0IHNpemUgPSA4XG4gICAgbGV0IHRraGQgPSBGTVA0LnRraGQoe1xuICAgICAgaWQ6IDIsXG4gICAgICBkdXJhdGlvbjogZGF0YS5kdXJhdGlvbixcbiAgICAgIHRpbWVzY2FsZTogZGF0YS50aW1lc2NhbGUsXG4gICAgICB3aWR0aDogMCxcbiAgICAgIGhlaWdodDogMCxcbiAgICAgIHR5cGU6ICdhdWRpbydcbiAgICB9KVxuICAgIGxldCBtZGlhID0gRk1QNC5tZGlhKHtcbiAgICAgIHR5cGU6ICdhdWRpbycsXG4gICAgICB0aW1lc2NhbGU6IGRhdGEudGltZXNjYWxlLFxuICAgICAgZHVyYXRpb246IGRhdGEuZHVyYXRpb24sXG4gICAgICBjaGFubmVsQ291bnQ6IGRhdGEuYXVkaW9DaGFubmVsQ291bnQsXG4gICAgICBzYW1wbGVyYXRlOiBkYXRhLmF1ZGlvU2FtcGxlUmF0ZSxcbiAgICAgIGNvbmZpZzogZGF0YS5hdWRpb0NvbmZpZ1xuICAgIH0pO1xuICAgIFt0a2hkLCBtZGlhXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGhcbiAgICB9KVxuICAgIHJldHVybiBGTVA0LmluaXRCb3goc2l6ZSwgJ3RyYWsnLCB0a2hkLCBtZGlhKVxuICB9XG4gIHN0YXRpYyB0a2hkIChkYXRhKSB7XG4gICAgbGV0IGlkID0gZGF0YS5pZCxcbiAgICAgIGR1cmF0aW9uID0gZGF0YS5kdXJhdGlvbixcbiAgICAgIHdpZHRoID0gZGF0YS53aWR0aCxcbiAgICAgIGhlaWdodCA9IGRhdGEuaGVpZ2h0XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDA3LCAvLyB2ZXJzaW9uKDApICsgZmxhZ3MgMeS9jeeJiOacrCBib3jniYjmnKzvvIww5oiWMe+8jOS4gOiIrOS4ujDjgILvvIjku6XkuIvlrZfoioLmlbDlnYfmjIl2ZXJzaW9uPTDvvInmjInkvY3miJbmk43kvZznu5PmnpzlgLzvvIzpooTlrprkuYnlpoLkuIvvvJpcbiAgICAgIC8vIDB4MDAwMDAxIHRyYWNrX2VuYWJsZWTvvIzlkKbliJnor6V0cmFja+S4jeiiq+aSreaUvu+8m1xuICAgICAgLy8gMHgwMDAwMDIgdHJhY2tfaW5fbW92aWXvvIzooajnpLror6V0cmFja+WcqOaSreaUvuS4reiiq+W8leeUqO+8m1xuICAgICAgLy8gMHgwMDAwMDQgdHJhY2tfaW5fcHJldmlld++8jOihqOekuuivpXRyYWNr5Zyo6aKE6KeI5pe26KKr5byV55So44CCXG4gICAgICAvLyDkuIDoiKzor6XlgLzkuLo377yMMSsyKzQg5aaC5p6c5LiA5Liq5aqS5L2T5omA5pyJdHJhY2vlnYfmnKrorr7nva50cmFja19pbl9tb3ZpZeWSjHRyYWNrX2luX3ByZXZpZXfvvIzlsIbooqvnkIbop6PkuLrmiYDmnIl0cmFja+Wdh+iuvue9ruS6hui/meS4pOmhue+8m+WvueS6jmhpbnQgdHJhY2vvvIzor6XlgLzkuLowXG4gICAgICAvLyBoaW50IHRyYWNrIOi/meS4queJueauiueahHRyYWNr5bm25LiN5YyF5ZCr5aqS5L2T5pWw5o2u77yM6ICM5piv5YyF5ZCr5LqG5LiA5Lqb5bCG5YW25LuW5pWw5o2udHJhY2vmiZPljIXmiJDmtYHlqpLkvZPnmoTmjIfnpLrkv6Hmga/jgIJcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGNyZWF0aW9uX3RpbWXliJvlu7rml7bpl7TvvIjnm7jlr7nkuo5VVEPml7bpl7QxOTA0LTAxLTAx6Zu254K555qE56eS5pWw77yJXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBtb2RpZmljYXRpb24gdGltZSDkv67mlLnml7bpl7RcbiAgICAgIChpZCA+Pj4gMjQpICYgMHhGRiwgLy8gdHJhY2tfSUQ6IDQgYnl0ZXMgaWTlj7fvvIzkuI3og73ph43lpI3kuJTkuI3og73kuLowXG4gICAgICAoaWQgPj4+IDE2KSAmIDB4RkYsXG4gICAgICAoaWQgPj4+IDgpICYgMHhGRixcbiAgICAgIChpZCkgJiAweEZGLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWQ6IDQgYnl0ZXMgICAg5L+d55WZ5L2NXG4gICAgICAoZHVyYXRpb24gPj4+IDI0KSAmIDB4RkYsIC8vIGR1cmF0aW9uOiA0IGJ5dGVzIHRyYWNr55qE5pe26Ze06ZW/5bqmXG4gICAgICAoZHVyYXRpb24gPj4+IDE2KSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24gPj4+IDgpICYgMHhGRixcbiAgICAgIChkdXJhdGlvbikgJiAweEZGLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWQ6IDIgKiA0IGJ5dGVzICAgIOS/neeVmeS9jVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGxheWVyKDJieXRlcykgKyBhbHRlcm5hdGVfZ3JvdXAoMmJ5dGVzKSAg6KeG6aKR5bGC77yM6buY6K6k5Li6MO+8jOWAvOWwj+eahOWcqOS4iuWxgi50cmFja+WIhue7hOS/oeaBr++8jOm7mOiupOS4ujDooajnpLror6V0cmFja+acquS4juWFtuS7lnRyYWNr5pyJ576k57uE5YWz57O7XG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyB2b2x1bWUoMmJ5dGVzKSArIHJlc2VydmVkKDJieXRlcykgICAgWzguOF0g5qC85byP77yM5aaC5p6c5Li66Z+z6aKRdHJhY2vvvIwxLjDvvIgweDAxMDDvvInooajnpLrmnIDlpKfpn7Pph4/vvJvlkKbliJnkuLowICAgK+S/neeVmeS9jVxuICAgICAgMHgwMCwgMHgwMSwgMHgwMCwgMHgwMCwgLy8gLS0tLWJlZ2luIGNvbXBvc2l0aW9uIG1hdHJpeC0tLS1cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDEsIDB4MDAsIDB4MDAsIC8vIOinhumikeWPmOaNouefqemYtVxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHg0MCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gLS0tLWVuZCBjb21wb3NpdGlvbiBtYXRyaXgtLS0tXG4gICAgICAod2lkdGggPj4+IDgpICYgMHhGRiwgLy8gLy/lrr3luqZcbiAgICAgICh3aWR0aCkgJiAweEZGLFxuICAgICAgMHgwMCwgMHgwMCxcbiAgICAgIChoZWlnaHQgPj4+IDgpICYgMHhGRiwgLy8g6auY5bqmXG4gICAgICAoaGVpZ2h0KSAmIDB4RkYsXG4gICAgICAweDAwLCAweDAwXG4gICAgXSlcbiAgICByZXR1cm4gRk1QNC5pbml0Qm94KDggKyBjb250ZW50LmJ5dGVMZW5ndGgsICd0a2hkJywgY29udGVudClcbiAgfVxuICBzdGF0aWMgZWR0cyAoZGF0YSkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKCksIGR1cmF0aW9uID0gZGF0YS5kdXJhdGlvbiwgbWVkaWFUaW1lID0gZGF0YS5tZWRpYVRpbWVcbiAgICBidWZmZXIud3JpdGUoRk1QNC5zaXplKDM2KSwgRk1QNC50eXBlKCdlZHRzJykpXG4gICAgLy8gZWxzdFxuICAgIGJ1ZmZlci53cml0ZShGTVA0LnNpemUoMjgpLCBGTVA0LnR5cGUoJ2Vsc3QnKSlcbiAgICBidWZmZXIud3JpdGUobmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMSwgLy8gZW50cnkgY291bnRcbiAgICAgIChkdXJhdGlvbiA+PiAyNCkgJiAweGZmLCAoZHVyYXRpb24gPj4gMTYpICYgMHhmZiwgKGR1cmF0aW9uID4+IDgpICYgMHhmZiwgZHVyYXRpb24gJiAweGZmLFxuICAgICAgKG1lZGlhVGltZSA+PiAyNCkgJiAweGZmLCAobWVkaWFUaW1lID4+IDE2KSAmIDB4ZmYsIChtZWRpYVRpbWUgPj4gOCkgJiAweGZmLCBtZWRpYVRpbWUgJiAweGZmLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMSAvLyBtZWRpYSByYXRlXG4gICAgXSkpXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgbWRpYSAoZGF0YSkge1xuICAgIGxldCBzaXplID0gOFxuICAgIGxldCBtZGhkID0gRk1QNC5tZGhkKGRhdGEudGltZXNjYWxlLCBkYXRhLmR1cmF0aW9uKVxuICAgIGxldCBoZGxyID0gRk1QNC5oZGxyKGRhdGEudHlwZSlcbiAgICBsZXQgbWluZiA9IEZNUDQubWluZihkYXRhKTtcbiAgICBbbWRoZCwgaGRsciwgbWluZl0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRk1QNC5pbml0Qm94KHNpemUsICdtZGlhJywgbWRoZCwgaGRsciwgbWluZilcbiAgfVxuICBzdGF0aWMgbWRoZCAodGltZXNjYWxlLCBkdXJhdGlvbikge1xuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gY3JlYXRpb25fdGltZSAgICDliJvlu7rml7bpl7RcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIG1vZGlmaWNhdGlvbl90aW1l5L+u5pS55pe26Ze0XG4gICAgICAodGltZXNjYWxlID4+PiAyNCkgJiAweEZGLCAvLyB0aW1lc2NhbGU6IDQgYnl0ZXMgICAg5paH5Lu25aqS5L2T5ZyoMeenkuaXtumXtOWGheeahOWIu+W6puWAvO+8jOWPr+S7peeQhuino+S4ujHnp5Lplb/luqZcbiAgICAgICh0aW1lc2NhbGUgPj4+IDE2KSAmIDB4RkYsXG4gICAgICAodGltZXNjYWxlID4+PiA4KSAmIDB4RkYsXG4gICAgICAodGltZXNjYWxlKSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24gPj4+IDI0KSAmIDB4RkYsIC8vIGR1cmF0aW9uOiA0IGJ5dGVzICB0cmFja+eahOaXtumXtOmVv+W6plxuICAgICAgKGR1cmF0aW9uID4+PiAxNikgJiAweEZGLFxuICAgICAgKGR1cmF0aW9uID4+PiA4KSAmIDB4RkYsXG4gICAgICAoZHVyYXRpb24pICYgMHhGRixcbiAgICAgIDB4NTUsIDB4QzQsIC8vIGxhbmd1YWdlOiB1bmQgKHVuZGV0ZXJtaW5lZCkg5aqS5L2T6K+t6KiA56CB44CC5pyA6auY5L2N5Li6MO+8jOWQjumdojE15L2N5Li6M+S4quWtl+espu+8iOingUlTTyA2MzktMi9U5qCH5YeG5Lit5a6a5LmJ77yJXG4gICAgICAweDAwLCAweDAwIC8vIHByZV9kZWZpbmVkID0gMFxuICAgIF0pXG4gICAgcmV0dXJuIEZNUDQuaW5pdEJveCgxMiArIGNvbnRlbnQuYnl0ZUxlbmd0aCwgJ21kaGQnLCBGTVA0LmV4dGVuc2lvbigwLCAwKSwgY29udGVudClcbiAgfVxuICBzdGF0aWMgaGRsciAodHlwZSkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgdmFsdWUgPSBbMHgwMCwgLy8gdmVyc2lvbiAwXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcHJlX2RlZmluZWRcbiAgICAgIDB4NzYsIDB4NjksIDB4NjQsIDB4NjUsIC8vIGhhbmRsZXJfdHlwZTogJ3ZpZGUnXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDU2LCAweDY5LCAweDY0LCAweDY1LFxuICAgICAgMHg2ZiwgMHg0OCwgMHg2MSwgMHg2ZSxcbiAgICAgIDB4NjQsIDB4NmMsIDB4NjUsIDB4NzIsIDB4MDAgLy8gbmFtZTogJ1ZpZGVvSGFuZGxlcidcbiAgICBdXG4gICAgaWYgKHR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgIHZhbHVlLnNwbGljZSg4LCA0LCAuLi5bMHg3MywgMHg2ZiwgMHg3NSwgMHg2ZV0pXG4gICAgICB2YWx1ZS5zcGxpY2UoMjQsIDEzLCAuLi5bMHg1MywgMHg2ZiwgMHg3NSwgMHg2ZSxcbiAgICAgICAgMHg2NCwgMHg0OCwgMHg2MSwgMHg2ZSxcbiAgICAgICAgMHg2NCwgMHg2YywgMHg2NSwgMHg3MiwgMHgwMF0pXG4gICAgfVxuICAgIHJldHVybiBGTVA0LmluaXRCb3goOCArIHZhbHVlLmxlbmd0aCwgJ2hkbHInLCBuZXcgVWludDhBcnJheSh2YWx1ZSkpXG4gIH1cbiAgc3RhdGljIG1pbmYgKGRhdGEpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpLCBzaXplID0gOFxuICAgIGxldCB2bWhkID0gZGF0YS50eXBlID09PSAndmlkZW8nID8gRk1QNC52bWhkKCkgOiBGTVA0LnNtaGQoKVxuICAgIGxldCBkaW5mID0gRk1QNC5kaW5mKClcbiAgICBsZXQgc3RibCA9IEZNUDQuc3RibChkYXRhKTtcbiAgICBbdm1oZCwgZGluZiwgc3RibF0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRk1QNC5pbml0Qm94KHNpemUsICdtaW5mJywgdm1oZCwgZGluZiwgc3RibClcbiAgfVxuICBzdGF0aWMgdm1oZCAoKSB7XG4gICAgcmV0dXJuIEZNUDQuaW5pdEJveCgyMCwgJ3ZtaGQnLCBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uXG4gICAgICAweDAwLCAweDAwLCAweDAxLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgLy8gZ3JhcGhpY3Ntb2RlXG4gICAgICAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAgLy8gb3Bjb2xvclxuICAgIF0pKVxuICB9XG4gIHN0YXRpYyBzbWhkICgpIHtcbiAgICByZXR1cm4gRk1QNC5pbml0Qm94KDE2LCAnc21oZCcsIG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIC8vIHZlcnNpb25cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAweDAwLCAweDAwLCAvLyBiYWxhbmNlXG4gICAgICAweDAwLCAweDAwIC8vIHJlc2VydmVkXG4gICAgXSkpXG4gIH1cbiAgc3RhdGljIGRpbmYgKCkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgZHJlZiA9IFsweDAwLCAvLyB2ZXJzaW9uIDBcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAxLCAvLyBlbnRyeV9jb3VudFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwYywgLy8gZW50cnlfc2l6ZVxuICAgICAgMHg3NSwgMHg3MiwgMHg2YywgMHgyMCwgLy8gJ3VybCcgdHlwZVxuICAgICAgMHgwMCwgLy8gdmVyc2lvbiAwXG4gICAgICAweDAwLCAweDAwLCAweDAxIC8vIGVudHJ5X2ZsYWdzXG4gICAgXVxuICAgIGJ1ZmZlci53cml0ZShGTVA0LnNpemUoMzYpLCBGTVA0LnR5cGUoJ2RpbmYnKSwgRk1QNC5zaXplKDI4KSwgRk1QNC50eXBlKCdkcmVmJyksIG5ldyBVaW50OEFycmF5KGRyZWYpKVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIHN0YmwgKGRhdGEpIHtcbiAgICBsZXQgc2l6ZSA9IDhcbiAgICBsZXQgc3RzZCA9IEZNUDQuc3RzZChkYXRhKVxuICAgIGxldCBzdHRzID0gRk1QNC5zdHRzKClcbiAgICBsZXQgc3RzYyA9IEZNUDQuc3RzYygpXG4gICAgbGV0IHN0c3ogPSBGTVA0LnN0c3ooKVxuICAgIGxldCBzdGNvID0gRk1QNC5zdGNvKCk7XG4gICAgW3N0c2QsIHN0dHMsIHN0c2MsIHN0c3osIHN0Y29dLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBzaXplICs9IGl0ZW0uYnl0ZUxlbmd0aFxuICAgIH0pXG4gICAgcmV0dXJuIEZNUDQuaW5pdEJveChzaXplLCAnc3RibCcsIHN0c2QsIHN0dHMsIHN0c2MsIHN0c3osIHN0Y28pXG4gIH1cbiAgc3RhdGljIHN0c2QgKGRhdGEpIHtcbiAgICBsZXQgY29udGVudFxuICAgIGlmIChkYXRhLnR5cGUgPT09ICdhdWRpbycpIHtcbiAgICAgIC8vIGlmICghZGF0YS5pc0FBQyAmJiBkYXRhLmNvZGVjID09PSAnbXA0Jykge1xuICAgICAgLy8gICAgIGNvbnRlbnQgPSBGTVA0Lm1wMyhkYXRhKTtcbiAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAvL1xuICAgICAgLy8gfVxuICAgICAgLy8g5pSv5oyBbXA0YVxuICAgICAgY29udGVudCA9IEZNUDQubXA0YShkYXRhKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb250ZW50ID0gRk1QNC5hdmMxKGRhdGEpXG4gICAgfVxuICAgIHJldHVybiBGTVA0LmluaXRCb3goMTYgKyBjb250ZW50LmJ5dGVMZW5ndGgsICdzdHNkJywgRk1QNC5leHRlbnNpb24oMCwgMCksIG5ldyBVaW50OEFycmF5KFsweDAwLCAweDAwLCAweDAwLCAweDAxXSksIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIG1wNGEgKGRhdGEpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIDB4MDEsIC8vIGRhdGFfcmVmZXJlbmNlX2luZGV4XG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIGRhdGEuY2hhbm5lbENvdW50LCAvLyBjaGFubmVsY291bnRcbiAgICAgIDB4MDAsIDB4MTAsIC8vIHNhbXBsZVNpemU6MTZiaXRzXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyByZXNlcnZlZDJcbiAgICAgIChkYXRhLnNhbXBsZXJhdGUgPj4gOCkgJiAweGZmLFxuICAgICAgZGF0YS5zYW1wbGVyYXRlICYgMHhmZiwgLy9cbiAgICAgIDB4MDAsIDB4MDBcbiAgICBdKVxuICAgIGxldCBlc2RzID0gRk1QNC5lc2RzKGRhdGEuY29uZmlnKVxuICAgIHJldHVybiBGTVA0LmluaXRCb3goOCArIGNvbnRlbnQuYnl0ZUxlbmd0aCArIGVzZHMuYnl0ZUxlbmd0aCwgJ21wNGEnLCBjb250ZW50LCBlc2RzKVxuICB9XG4gIHN0YXRpYyBlc2RzIChjb25maWcgPSBbNDMsIDE0NiwgOCwgMF0pIHtcbiAgICBjb25zdCBjb25maWdsZW4gPSBjb25maWcubGVuZ3RoXG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgLy8gdmVyc2lvbiAwXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuXG4gICAgICAweDAzLCAvLyBkZXNjcmlwdG9yX3R5cGVcbiAgICAgIDB4MTcgKyBjb25maWdsZW4sIC8vIGxlbmd0aFxuICAgICAgMHgwMCwgMHgwMSwgLy8gZXNfaWRcbiAgICAgIDB4MDAsIC8vIHN0cmVhbV9wcmlvcml0eVxuXG4gICAgICAweDA0LCAvLyBkZXNjcmlwdG9yX3R5cGVcbiAgICAgIDB4MGYgKyBjb25maWdsZW4sIC8vIGxlbmd0aFxuICAgICAgMHg0MCwgLy8gY29kZWMgOiBtcGVnNF9hdWRpb1xuICAgICAgMHgxNSwgLy8gc3RyZWFtX3R5cGVcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGJ1ZmZlcl9zaXplXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBtYXhCaXRyYXRlXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBhdmdCaXRyYXRlXG5cbiAgICAgIDB4MDUgLy8gZGVzY3JpcHRvcl90eXBlXG4gICAgXS5jb25jYXQoW2NvbmZpZ2xlbl0pLmNvbmNhdChjb25maWcpLmNvbmNhdChbMHgwNiwgMHgwMSwgMHgwMl0pKVxuICAgIGJ1ZmZlci53cml0ZShGTVA0LnNpemUoOCArIGNvbnRlbnQuYnl0ZUxlbmd0aCksIEZNUDQudHlwZSgnZXNkcycpLCBjb250ZW50KVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIGF2YzEgKGRhdGEpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpLCBzaXplID0gNDAvLyA4KGF2YzEpKzgoYXZjYykrOChidHJ0KSsxNihwYXNwKVxuICAgIGxldCBzcHMgPSBkYXRhLnNwcywgcHBzID0gZGF0YS5wcHMsIHdpZHRoID0gZGF0YS53aWR0aCwgaGVpZ2h0ID0gZGF0YS5oZWlnaHQsIGhTcGFjaW5nID0gZGF0YS5waXhlbFJhdGlvWzBdLCB2U3BhY2luZyA9IGRhdGEucGl4ZWxSYXRpb1sxXVxuICAgIGxldCBhdmNjQnVmZmVyID0gbmV3IEJ1ZmZlcigpXG4gICAgYXZjY0J1ZmZlci53cml0ZShuZXcgVWludDhBcnJheShbXG4gICAgICAweDAxLCAvLyB2ZXJzaW9uXG4gICAgICBzcHNbMV0sIC8vIHByb2ZpbGVcbiAgICAgIHNwc1syXSwgLy8gcHJvZmlsZSBjb21wYXRpYmxlXG4gICAgICBzcHNbM10sIC8vIGxldmVsXG4gICAgICAweGZjIHwgMyxcbiAgICAgIDB4RTAgfCAxIC8vIOebruWJjeWPquWkhOeQhuS4gOS4qnNwc1xuICAgIF0uY29uY2F0KFtzcHMubGVuZ3RoID4+PiA4ICYgMHhmZiwgc3BzLmxlbmd0aCAmIDB4ZmZdKSkpXG4gICAgYXZjY0J1ZmZlci53cml0ZShzcHMsIG5ldyBVaW50OEFycmF5KFsxLCBwcHMubGVuZ3RoID4+PiA4ICYgMHhmZiwgcHBzLmxlbmd0aCAmIDB4ZmZdKSwgcHBzKVxuXG4gICAgbGV0IGF2Y2MgPSBhdmNjQnVmZmVyLmJ1ZmZlclxuICAgIGxldCBhdmMxID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gcmVzZXJ2ZWRcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAxLCAvLyBkYXRhX3JlZmVyZW5jZV9pbmRleFxuICAgICAgMHgwMCwgMHgwMCwgLy8gcHJlX2RlZmluZWRcbiAgICAgIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHByZV9kZWZpbmVkXG4gICAgICAod2lkdGggPj4gOCkgJiAweGZmLFxuICAgICAgd2lkdGggJiAweGZmLCAvLyB3aWR0aFxuICAgICAgKGhlaWdodCA+PiA4KSAmIDB4ZmYsXG4gICAgICBoZWlnaHQgJiAweGZmLCAvLyBoZWlnaHRcbiAgICAgIDB4MDAsIDB4NDgsIDB4MDAsIDB4MDAsIC8vIGhvcml6cmVzb2x1dGlvblxuICAgICAgMHgwMCwgMHg0OCwgMHgwMCwgMHgwMCwgLy8gdmVydHJlc29sdXRpb25cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIHJlc2VydmVkXG4gICAgICAweDAwLCAweDAxLCAvLyBmcmFtZV9jb3VudFxuICAgICAgMHgxMixcbiAgICAgIDB4NjQsIDB4NjEsIDB4NjksIDB4NkMsIC8vIGRhaWx5bW90aW9uL2hscy5qc1xuICAgICAgMHg3OSwgMHg2RCwgMHg2RiwgMHg3NCxcbiAgICAgIDB4NjksIDB4NkYsIDB4NkUsIDB4MkYsXG4gICAgICAweDY4LCAweDZDLCAweDczLCAweDJFLFxuICAgICAgMHg2QSwgMHg3MywgMHgwMCwgMHgwMCxcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gY29tcHJlc3Nvcm5hbWVcbiAgICAgIDB4MDAsIDB4MTgsIC8vIGRlcHRoID0gMjRcbiAgICAgIDB4MTEsIDB4MTFdKSAvLyBwcmVfZGVmaW5lZCA9IC0xXG4gICAgbGV0IGJ0cnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAweDFjLCAweDljLCAweDgwLCAvLyBidWZmZXJTaXplREJcbiAgICAgIDB4MDAsIDB4MmQsIDB4YzYsIDB4YzAsIC8vIG1heEJpdHJhdGVcbiAgICAgIDB4MDAsIDB4MmQsIDB4YzYsIDB4YzAgLy8gYXZnQml0cmF0ZVxuICAgIF0pXG4gICAgbGV0IHBhc3AgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAoaFNwYWNpbmcgPj4gMjQpLCAvLyBoU3BhY2luZ1xuICAgICAgKGhTcGFjaW5nID4+IDE2KSAmIDB4ZmYsXG4gICAgICAoaFNwYWNpbmcgPj4gOCkgJiAweGZmLFxuICAgICAgaFNwYWNpbmcgJiAweGZmLFxuICAgICAgKHZTcGFjaW5nID4+IDI0KSwgLy8gdlNwYWNpbmdcbiAgICAgICh2U3BhY2luZyA+PiAxNikgJiAweGZmLFxuICAgICAgKHZTcGFjaW5nID4+IDgpICYgMHhmZixcbiAgICAgIHZTcGFjaW5nICYgMHhmZlxuICAgIF0pXG5cbiAgICBidWZmZXIud3JpdGUoXG4gICAgICBGTVA0LnNpemUoc2l6ZSArIGF2YzEuYnl0ZUxlbmd0aCArIGF2Y2MuYnl0ZUxlbmd0aCArIGJ0cnQuYnl0ZUxlbmd0aCksIEZNUDQudHlwZSgnYXZjMScpLCBhdmMxLFxuICAgICAgRk1QNC5zaXplKDggKyBhdmNjLmJ5dGVMZW5ndGgpLCBGTVA0LnR5cGUoJ2F2Y0MnKSwgYXZjYyxcbiAgICAgIEZNUDQuc2l6ZSgyMCksIEZNUDQudHlwZSgnYnRydCcpLCBidHJ0LFxuICAgICAgRk1QNC5zaXplKDE2KSwgRk1QNC50eXBlKCdwYXNwJyksIHBhc3BcbiAgICApXG4gICAgcmV0dXJuIGJ1ZmZlci5idWZmZXJcbiAgfVxuICBzdGF0aWMgc3R0cyAoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCAvLyBlbnRyeV9jb3VudFxuICAgIF0pXG4gICAgcmV0dXJuIEZNUDQuaW5pdEJveCgxNiwgJ3N0dHMnLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyBzdHNjICgpIHtcbiAgICBsZXQgY29udGVudCA9IG5ldyBVaW50OEFycmF5KFtcbiAgICAgIDB4MDAsIC8vIHZlcnNpb25cbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGZsYWdzXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwIC8vIGVudHJ5X2NvdW50XG4gICAgXSlcbiAgICByZXR1cm4gRk1QNC5pbml0Qm94KDE2LCAnc3RzYycsIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIHN0Y28gKCkge1xuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgLy8gdmVyc2lvblxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgLy8gZmxhZ3NcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAgLy8gZW50cnlfY291bnRcbiAgICBdKVxuICAgIHJldHVybiBGTVA0LmluaXRCb3goMTYsICdzdGNvJywgY29udGVudClcbiAgfVxuICBzdGF0aWMgc3RzeiAoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgVWludDhBcnJheShbXG4gICAgICAweDAwLCAvLyB2ZXJzaW9uXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgLy8gc2FtcGxlX3NpemVcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAgLy8gc2FtcGxlX2NvdW50XG4gICAgXSlcbiAgICByZXR1cm4gRk1QNC5pbml0Qm94KDIwLCAnc3RzeicsIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIG12ZXggKGR1cmF0aW9uKSB7XG4gICAgbGV0IGJ1ZmZlciA9IG5ldyBCdWZmZXIoKVxuICAgIGxldCBtZWhkID0gQnVmZmVyLndyaXRlVWludDMyKGR1cmF0aW9uKVxuICAgIGJ1ZmZlci53cml0ZShGTVA0LnNpemUoODgpLCBGTVA0LnR5cGUoJ212ZXgnKSwgRk1QNC5zaXplKDE2KSwgRk1QNC50eXBlKCdtZWhkJyksIEZNUDQuZXh0ZW5zaW9uKDAsIDApLCBtZWhkLCBGTVA0LnRyZXgoMSksIEZNUDQudHJleCgyKSlcbiAgICByZXR1cm4gYnVmZmVyLmJ1ZmZlclxuICB9XG4gIHN0YXRpYyB0cmV4IChpZCkge1xuICAgIGxldCBjb250ZW50ID0gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgMHgwMCwgLy8gdmVyc2lvbiAwXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAvLyBmbGFnc1xuICAgICAgKGlkID4+IDI0KSxcbiAgICAgIChpZCA+PiAxNikgJiAweGZmLFxuICAgICAgKGlkID4+IDgpICYgMHhmZixcbiAgICAgIChpZCAmIDB4ZmYpLCAvLyB0cmFja19JRFxuICAgICAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMSwgLy8gZGVmYXVsdF9zYW1wbGVfZGVzY3JpcHRpb25faW5kZXhcbiAgICAgIDB4MDAsIDB4MDAsIDB4MDAsIDB4MDAsIC8vIGRlZmF1bHRfc2FtcGxlX2R1cmF0aW9uXG4gICAgICAweDAwLCAweDAwLCAweDAwLCAweDAwLCAvLyBkZWZhdWx0X3NhbXBsZV9zaXplXG4gICAgICAweDAwLCAweDAxLCAweDAwLCAweDAxIC8vIGRlZmF1bHRfc2FtcGxlX2ZsYWdzXG4gICAgXSlcbiAgICByZXR1cm4gRk1QNC5pbml0Qm94KDggKyBjb250ZW50LmJ5dGVMZW5ndGgsICd0cmV4JywgY29udGVudClcbiAgfVxuICBzdGF0aWMgbW9vZiAoZGF0YSkge1xuICAgIGxldCBzaXplID0gOFxuICAgIGxldCBtZmhkID0gRk1QNC5tZmhkKClcbiAgICBsZXQgdHJhZiA9IEZNUDQudHJhZihkYXRhKTtcbiAgICBbbWZoZCwgdHJhZl0uZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIHNpemUgKz0gaXRlbS5ieXRlTGVuZ3RoXG4gICAgfSlcbiAgICByZXR1cm4gRk1QNC5pbml0Qm94KHNpemUsICdtb29mJywgbWZoZCwgdHJhZilcbiAgfVxuICBzdGF0aWMgbWZoZCAoKSB7XG4gICAgbGV0IGNvbnRlbnQgPSBCdWZmZXIud3JpdGVVaW50MzIoRk1QNC5zZXF1ZW5jZSlcbiAgICBGTVA0LnNlcXVlbmNlICs9IDFcbiAgICByZXR1cm4gRk1QNC5pbml0Qm94KDE2LCAnbWZoZCcsIEZNUDQuZXh0ZW5zaW9uKDAsIDApLCBjb250ZW50KVxuICB9XG4gIHN0YXRpYyB0cmFmIChkYXRhKSB7XG4gICAgbGV0IHNpemUgPSA4XG4gICAgbGV0IHRmaGQgPSBGTVA0LnRmaGQoZGF0YS5pZClcbiAgICBsZXQgdGZkdCA9IEZNUDQudGZkdChkYXRhLnRpbWUpXG4gICAgbGV0IHNkdHAgPSBGTVA0LnNkdHAoZGF0YSlcbiAgICBsZXQgdHJ1biA9IEZNUDQudHJ1bihkYXRhLCBzZHRwLmJ5dGVMZW5ndGgpO1xuICAgIFt0ZmhkLCB0ZmR0LCBzZHRwLCB0cnVuXS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLmJ5dGVMZW5ndGhcbiAgICB9KVxuICAgIHJldHVybiBGTVA0LmluaXRCb3goc2l6ZSwgJ3RyYWYnLCB0ZmhkLCB0ZmR0LCBzZHRwLCB0cnVuKVxuICB9XG4gIHN0YXRpYyB0ZmhkIChpZCkge1xuICAgIGxldCBjb250ZW50ID0gQnVmZmVyLndyaXRlVWludDMyKGlkKVxuICAgIHJldHVybiBGTVA0LmluaXRCb3goMTYsICd0ZmhkJywgRk1QNC5leHRlbnNpb24oMCwgMCksIGNvbnRlbnQpXG4gIH1cbiAgc3RhdGljIHRmZHQgKHRpbWUpIHtcbiAgICAvLyBsZXQgdXBwZXIgPSBNYXRoLmZsb29yKHRpbWUgLyAoVUlOVDMyX01BWCArIDEpKSxcbiAgICAvLyAgICAgbG93ZXIgPSBNYXRoLmZsb29yKHRpbWUgJSAoVUlOVDMyX01BWCArIDEpKTtcbiAgICByZXR1cm4gRk1QNC5pbml0Qm94KDE2LCAndGZkdCcsIEZNUDQuZXh0ZW5zaW9uKDAsIDApLCBCdWZmZXIud3JpdGVVaW50MzIodGltZSkpXG4gIH1cbiAgc3RhdGljIHRydW4gKGRhdGEsIHNkdHBMZW5ndGgpIHtcbiAgICAvLyBsZXQgaWQgPSBkYXRhLmlkO1xuICAgIC8vIGxldCBjZWlsID0gaWQgPT09IDEgPyAxNiA6IDEyO1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBsZXQgc2FtcGxlQ291bnQgPSBCdWZmZXIud3JpdGVVaW50MzIoZGF0YS5zYW1wbGVzLmxlbmd0aClcbiAgICAvLyBtZGF0LWhlYWRlciA4XG4gICAgLy8gbW9vZi1oZWFkZXIgOFxuICAgIC8vIG1maGQgMTZcbiAgICAvLyB0cmFmLWhlYWRlciA4XG4gICAgLy8gdGhoZCAxNlxuICAgIC8vIHRmZHQgMjBcbiAgICAvLyB0cnVuLWhlYWRlciAxMlxuICAgIC8vIHNhbXBsZUNvdW50IDRcbiAgICAvLyBkYXRhLW9mZnNldCA0XG4gICAgLy8gc2FtcGxlcy5sZW5ndGhcbiAgICBsZXQgb2Zmc2V0ID0gQnVmZmVyLndyaXRlVWludDMyKDggKyA4ICsgMTYgKyA4ICsgMTYgKyAxNiArIDEyICsgNCArIDQgKyAxNiAqIGRhdGEuc2FtcGxlcy5sZW5ndGggKyBzZHRwTGVuZ3RoKVxuICAgIGJ1ZmZlci53cml0ZShGTVA0LnNpemUoMjAgKyAxNiAqIGRhdGEuc2FtcGxlcy5sZW5ndGgpLCBGTVA0LnR5cGUoJ3RydW4nKSwgbmV3IFVpbnQ4QXJyYXkoWzB4MDAsIDB4MDAsIDB4MEYsIDB4MDFdKSwgc2FtcGxlQ291bnQsIG9mZnNldClcblxuICAgIGxldCBzaXplID0gYnVmZmVyLmJ1ZmZlci5ieXRlTGVuZ3RoLCB3cml0ZU9mZnNldCA9IDBcbiAgICBkYXRhLnNhbXBsZXMuZm9yRWFjaCgoKSA9PiB7XG4gICAgICBzaXplICs9IDE2XG4gICAgfSlcblxuICAgIGxldCB0cnVuQm94ID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSlcblxuICAgIHRydW5Cb3guc2V0KGJ1ZmZlci5idWZmZXIsIDApXG4gICAgd3JpdGVPZmZzZXQgKz0gYnVmZmVyLmJ1ZmZlci5ieXRlTGVuZ3RoXG4gICAgZGF0YS5zYW1wbGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGl0ZW0uZHVyYXRpb24pXG4gICAgICB0cnVuQm94LnNldChCdWZmZXIud3JpdGVVaW50MzIoaXRlbS5kdXJhdGlvbiksIHdyaXRlT2Zmc2V0KVxuICAgICAgd3JpdGVPZmZzZXQgKz0gNFxuICAgICAgdHJ1bkJveC5zZXQoQnVmZmVyLndyaXRlVWludDMyKGl0ZW0uc2l6ZSksIHdyaXRlT2Zmc2V0KVxuICAgICAgd3JpdGVPZmZzZXQgKz0gNFxuXG4gICAgICBpZiAoZGF0YS5pZCA9PT0gMSkge1xuICAgICAgICB0cnVuQm94LnNldChCdWZmZXIud3JpdGVVaW50MzIoaXRlbS5pc0tleWZyYW1lID8gMHgwMjAwMDAwMCA6IDB4MDEwMTAwMDApLCB3cml0ZU9mZnNldClcbiAgICAgICAgd3JpdGVPZmZzZXQgKz0gNFxuICAgICAgICB0cnVuQm94LnNldChCdWZmZXIud3JpdGVVaW50MzIoaXRlbS5jcHMpLCB3cml0ZU9mZnNldClcbiAgICAgICAgd3JpdGVPZmZzZXQgKz0gNFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJ1bkJveC5zZXQoQnVmZmVyLndyaXRlVWludDMyKDB4MDEwMDAwMDApLCB3cml0ZU9mZnNldClcbiAgICAgICAgd3JpdGVPZmZzZXQgKz0gNFxuICAgICAgICB0cnVuQm94LnNldChCdWZmZXIud3JpdGVVaW50MzIoMCksIHdyaXRlT2Zmc2V0KVxuICAgICAgICB3cml0ZU9mZnNldCArPSA0XG4gICAgICB9XG5cbiAgICAgIC8vIGJ1ZmZlci53cml0ZShCdWZmZXIud3JpdGVVaW50MzIoMCkpO1xuICAgIH0pXG4gICAgcmV0dXJuIHRydW5Cb3hcbiAgfVxuICBzdGF0aWMgc2R0cCAoZGF0YSkge1xuICAgIGxldCBidWZmZXIgPSBuZXcgQnVmZmVyKClcbiAgICBidWZmZXIud3JpdGUoRk1QNC5zaXplKDEyICsgZGF0YS5zYW1wbGVzLmxlbmd0aCksIEZNUDQudHlwZSgnc2R0cCcpLCBGTVA0LmV4dGVuc2lvbigwLCAwKSlcbiAgICBkYXRhLnNhbXBsZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGJ1ZmZlci53cml0ZShuZXcgVWludDhBcnJheShkYXRhLmlkID09PSAxID8gW2l0ZW0ua2V5ID8gMzIgOiAxNl0gOiBbMTZdKSlcbiAgICB9KVxuICAgIHJldHVybiBidWZmZXIuYnVmZmVyXG4gIH1cbiAgc3RhdGljIG1kYXQgKGRhdGEpIHtcbiAgICBsZXQgYnVmZmVyID0gbmV3IEJ1ZmZlcigpLCBzaXplID0gOFxuICAgIGRhdGEuc2FtcGxlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgc2l6ZSArPSBpdGVtLnNpemVcbiAgICB9KVxuICAgIGJ1ZmZlci53cml0ZShGTVA0LnNpemUoc2l6ZSksIEZNUDQudHlwZSgnbWRhdCcpKVxuICAgIGxldCBtZGF0Qm94ID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSlcbiAgICBsZXQgb2Zmc2V0ID0gMFxuICAgIG1kYXRCb3guc2V0KGJ1ZmZlci5idWZmZXIsIG9mZnNldClcbiAgICBvZmZzZXQgKz0gOFxuICAgIGRhdGEuc2FtcGxlcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaXRlbS5idWZmZXIuZm9yRWFjaCgodW5pdCkgPT4ge1xuICAgICAgICBtZGF0Qm94LnNldCh1bml0LmRhdGEsIG9mZnNldClcbiAgICAgICAgb2Zmc2V0ICs9IHVuaXQuZGF0YS5ieXRlTGVuZ3RoXG4gICAgICAgIC8vIGJ1ZmZlci53cml0ZSh1bml0LmRhdGEpO1xuICAgICAgfSlcbiAgICB9KVxuICAgIHJldHVybiBtZGF0Qm94XG4gIH1cbn1cbkZNUDQudHlwZSA9IGNhY2hlV3JhcHBlcigobmFtZSkgPT4ge1xuICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoW25hbWUuY2hhckNvZGVBdCgwKSwgbmFtZS5jaGFyQ29kZUF0KDEpLCBuYW1lLmNoYXJDb2RlQXQoMiksIG5hbWUuY2hhckNvZGVBdCgzKV0pXG59KVxuRk1QNC5zZXF1ZW5jZSA9IDFcblxuZXhwb3J0IGRlZmF1bHQgRk1QNFxuIiwiaW1wb3J0IE1lZGlhU2VnbWVudExpc3QgZnJvbSAnLi4vLi4vbW9kZWxzL01lZGlhU2VnbWVudExpc3QnXG5pbXBvcnQgTWVkaWFTZWdtZW50IGZyb20gJy4uLy4uL21vZGVscy9NZWRpYVNlZ21lbnQnXG5pbXBvcnQgTWVkaWFTYW1wbGUgZnJvbSAnLi4vLi4vbW9kZWxzL01lZGlhU2FtcGxlJ1xuaW1wb3J0IHNuaWZmZXIgZnJvbSAnLi4vLi4vdXRpbHMvc25pZmZlcidcbmltcG9ydCBCdWZmZXIgZnJvbSAnLi4vLi4vd3JpdGUvQnVmZmVyJ1xuaW1wb3J0IEZNUDQgZnJvbSAnLi9GbXA0J1xuaW1wb3J0IFJlbXV4ZXIgZnJvbSAnLi9SZW11eGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNcDRSZW11eGVyIGV4dGVuZHMgUmVtdXhlciB7XG4gIGNvbnN0cnVjdG9yIChzdG9yZSkge1xuICAgIHN1cGVyKHN0b3JlKVxuICAgIHRoaXMuX2R0c0Jhc2UgPSAwXG4gICAgdGhpcy5faXNEdHNCYXNlSW5pdGVkID0gZmFsc2VcbiAgICB0aGlzLl92aWRlb01ldGEgPSBudWxsXG4gICAgdGhpcy5fYXVkaW9NZXRhID0gbnVsbFxuICAgIHRoaXMuX2F1ZGlvTmV4dER0cyA9IG51bGxcbiAgICB0aGlzLl92aWRlb05leHREdHMgPSBudWxsXG4gICAgdGhpcy5fdmlkZW9TZWdtZW50TGlzdCA9IG5ldyBNZWRpYVNlZ21lbnRMaXN0KCd2aWRlbycpXG4gICAgdGhpcy5fYXVkaW9TZWdtZW50TGlzdCA9IG5ldyBNZWRpYVNlZ21lbnRMaXN0KCdhdWRpbycpXG4gICAgY29uc3Qge2Jyb3dzZXJ9ID0gc25pZmZlclxuICAgIHRoaXMuX2ZpbGxTaWxlbmNlRnJhbWUgPSBicm93c2VyID09PSAnaWUnXG4gICAgdGhpcy5oYW5kbGVNZWRpYUZyYWdtZW50ID0gKCkgPT4ge31cbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuX2R0c0Jhc2UgPSAtMVxuICAgIHRoaXMuX2R0c0Jhc2VJbml0ZWQgPSBmYWxzZVxuICAgIHRoaXMuX2F1ZGlvTWV0YSA9IG51bGxcbiAgICB0aGlzLl92aWRlb01ldGEgPSBudWxsXG4gICAgdGhpcy5fdmlkZW9OZXh0RHRzID0gbnVsbFxuICAgIHRoaXMuX2F1ZGlvTmV4dER0cyA9IG51bGxcbiAgICB0aGlzLl92aWRlb1NlZ21lbnRMaXN0LmNsZWFyKClcbiAgICB0aGlzLl9hdWRpb1NlZ21lbnRMaXN0LmNsZWFyKClcbiAgICB0aGlzLl92aWRlb1NlZ21lbnRMaXN0ID0gbnVsbFxuICAgIHRoaXMuX2F1ZGlvU2VnbWVudExpc3QgPSBudWxsXG4gIH1cblxuICByZW11eCAoYXVkaW9UcmFjaywgdmlkZW9UcmFjaykge1xuICAgICF0aGlzLl9pc0R0c0Jhc2VJbml0ZWQgJiYgdGhpcy5jYWxjRHRzQmFzZShhdWRpb1RyYWNrLCB2aWRlb1RyYWNrKVxuXG4gICAgdGhpcy5fcmVtdXhWaWRlbyh2aWRlb1RyYWNrKVxuICAgIHRoaXMuX3JlbXV4QXVkaW8oYXVkaW9UcmFjaylcbiAgfVxuXG4gIHNlZWsgKCkge1xuICAgIHRoaXMuX3ZpZGVvTmV4dER0cyA9IG51bGxcbiAgICB0aGlzLl9hdWRpb05leHREdHMgPSBudWxsXG4gICAgdGhpcy5fdmlkZW9TZWdtZW50TGlzdC5jbGVhcigpXG4gICAgdGhpcy5fYXVkaW9TZWdtZW50TGlzdC5jbGVhcigpXG4gIH1cblxuICBvbk1ldGFEYXRhUmVhZHkgKHR5cGUsIG1ldGEpIHtcbiAgICB0aGlzW2BfJHt0eXBlfU1ldGFgXSA9IG1ldGFcbiAgfVxuXG4gIG9uTWVkaWFJbmZvUmVhZHkgKG1lZGlhSW5mbykge1xuICAgIGxldCBmdHlwTW9vdiA9IG5ldyBCdWZmZXIoKVxuICAgIGxldCBmdHlwID0gRk1QNC5mdHlwKClcbiAgICBsZXQgbW9vdiA9IEZNUDQubW9vdihtZWRpYUluZm8pXG4gICAgZnR5cE1vb3Yud3JpdGUoZnR5cCwgbW9vdilcbiAgICByZXR1cm4gZnR5cE1vb3YuYnVmZmVyXG4gIH1cblxuICBjYWxjRHRzQmFzZSAoYXVkaW9UcmFjaywgdmlkZW9UcmFjaykge1xuICAgIGxldCBhdWRpb0Jhc2UgPSBJbmZpbml0eVxuICAgIGxldCB2aWRlb0Jhc2UgPSBJbmZpbml0eVxuICAgIGlmIChhdWRpb1RyYWNrLnNhbXBsZXMgJiYgYXVkaW9UcmFjay5zYW1wbGVzLmxlbmd0aCkge1xuICAgICAgYXVkaW9CYXNlID0gYXVkaW9UcmFjay5zYW1wbGVzWzBdLmR0c1xuICAgIH1cbiAgICBpZiAodmlkZW9UcmFjay5zYW1wbGVzICYmIHZpZGVvVHJhY2suc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHZpZGVvQmFzZSA9IHZpZGVvVHJhY2suc2FtcGxlc1swXS5kdHNcbiAgICB9XG5cbiAgICB0aGlzLl9kdHNCYXNlID0gTWF0aC5taW4oYXVkaW9CYXNlLCB2aWRlb0Jhc2UpXG4gICAgdGhpcy5faXNEdHNCYXNlSW5pdGVkID0gdHJ1ZVxuICB9XG5cbiAgX3JlbXV4VmlkZW8gKHZpZGVvVHJhY2spIHtcbiAgICBpZiAoIXRoaXMuX3ZpZGVvTWV0YSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGNvbnN0IHRyYWNrID0gdmlkZW9UcmFja1xuICAgIGlmICghdmlkZW9UcmFjay5zYW1wbGVzIHx8ICF2aWRlb1RyYWNrLnNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgbGV0IHtzYW1wbGVzfSA9IHRyYWNrXG4gICAgbGV0IGR0c0NvcnJlY3Rpb25cbiAgICBsZXQgZmlyc3REdHMgPSAtMVxuICAgIGxldCBsYXN0RHRzID0gLTFcbiAgICBsZXQgZmlyc3RQdHMgPSAtMVxuICAgIGxldCBsYXN0UHRzID0gLTFcblxuICAgIGNvbnN0IG1wNFNhbXBsZXMgPSBbXVxuICAgIGNvbnN0IG1kYXRCb3ggPSB7XG4gICAgICBzYW1wbGVzOiBbXVxuICAgIH1cbiAgICBjb25zdCB2aWRlb1NlZ21lbnQgPSBuZXcgTWVkaWFTZWdtZW50KClcbiAgICB3aGlsZSAoc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGF2Y1NhbXBsZSA9IHNhbXBsZXMuc2hpZnQoKVxuICAgICAgY29uc3Qge2lzS2V5ZnJhbWUsIGNwc30gPSBhdmNTYW1wbGVcbiAgICAgIGxldCBkdHMgPSBhdmNTYW1wbGUuZHRzIC0gdGhpcy5fZHRzQmFzZVxuXG4gICAgICBpZiAoZHRzQ29ycmVjdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICghdGhpcy5fdmlkZW9OZXh0RHRzKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX3ZpZGVvU2VnbWVudExpc3QuaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICBkdHNDb3JyZWN0aW9uID0gMFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBsYXN0U2VnbWVudCA9IHRoaXMuX3ZpZGVvU2VnbWVudExpc3QuZ2V0TGFzdFNlZ21lbnRCZWZvcmUoZHRzKVxuICAgICAgICAgICAgaWYgKGxhc3RTZWdtZW50KSB7XG4gICAgICAgICAgICAgIGxldCBnYXBcbiAgICAgICAgICAgICAgY29uc3Qge2xhc3REdHMsIGdhcDogbGFzdEdhcH0gPSBsYXN0U2VnbWVudFxuICAgICAgICAgICAgICBnYXAgPSBkdHMgLSAobGFzdER0cyArIGxhc3RHYXApID4gMyA/IGR0cyAtIChsYXN0RHRzICsgbGFzdEdhcCkgOiAwXG4gICAgICAgICAgICAgIGR0c0NvcnJlY3Rpb24gPSBkdHMgLSAobGFzdER0cyArIGdhcClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGR0c0NvcnJlY3Rpb24gPSAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGR0c0NvcnJlY3Rpb24gPSBkdHMgLSB0aGlzLl92aWRlb05leHREdHMgPj0gMTAwMCA/IDAgOiBkdHMgLSB0aGlzLl92aWRlb05leHREdHNcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3Qgb3JpZ2luRHRzID0gZHRzXG4gICAgICBkdHMgLT0gZHRzQ29ycmVjdGlvblxuICAgICAgY29uc3QgcHRzID0gZHRzICsgY3BzXG5cbiAgICAgIGlmIChmaXJzdER0cyA9PT0gLTEpIHtcbiAgICAgICAgZmlyc3REdHMgPSBkdHNcbiAgICAgICAgZmlyc3RQdHMgPSBwdHNcbiAgICAgIH1cbiAgICAgIGxldCBfdW5pdHMgPSBbXVxuICAgICAgd2hpbGUgKGF2Y1NhbXBsZS51bml0cy5sZW5ndGgpIHtcbiAgICAgICAgbGV0IG1kYXRTYW1wbGUgPSB7XG4gICAgICAgICAgYnVmZmVyOiBbXSxcbiAgICAgICAgICBzaXplOiAwXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdW5pdCA9IGF2Y1NhbXBsZS51bml0cy5zaGlmdCgpXG4gICAgICAgIF91bml0cy5wdXNoKHVuaXQpXG4gICAgICAgIG1kYXRTYW1wbGUuYnVmZmVyLnB1c2godW5pdClcbiAgICAgICAgbWRhdFNhbXBsZS5zaXplICs9IHVuaXQuZGF0YS5ieXRlTGVuZ3RoXG5cbiAgICAgICAgbWRhdEJveC5zYW1wbGVzLnB1c2gobWRhdFNhbXBsZSlcbiAgICAgIH1cblxuICAgICAgbGV0IHNhbXBsZUR1cmF0aW9uID0gMFxuXG4gICAgICBpZiAoc2FtcGxlcy5sZW5ndGggPj0gMSkge1xuICAgICAgICBjb25zdCBuZXh0RHRzID0gc2FtcGxlc1swXS5kdHMgLSB0aGlzLl9kdHNCYXNlIC0gZHRzQ29ycmVjdGlvblxuICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IG5leHREdHMgLSBkdHNcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChtcDRTYW1wbGVzLmxlbmd0aCA+PSAxKSB7IC8vIGxhc3Rlc3Qgc2FtcGxlLCB1c2Ugc2Vjb25kIGxhc3QgZHVyYXRpb25cbiAgICAgICAgICBzYW1wbGVEdXJhdGlvbiA9IG1wNFNhbXBsZXNbbXA0U2FtcGxlcy5sZW5ndGggLSAxXS5kdXJhdGlvblxuICAgICAgICB9IGVsc2UgeyAvLyB0aGUgb25seSBvbmUgc2FtcGxlLCB1c2UgcmVmZXJlbmNlIGR1cmF0aW9uXG4gICAgICAgICAgc2FtcGxlRHVyYXRpb24gPSB0aGlzLl92aWRlb01ldGEucmVmU2FtcGxlRHVyYXRpb25cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaXNLZXlmcmFtZSkge1xuICAgICAgICBjb25zdCByYXAgPSBuZXcgTWVkaWFTYW1wbGUoe1xuICAgICAgICAgIGR0cyxcbiAgICAgICAgICBwdHMsXG4gICAgICAgICAgZHVyYXRpb246IHNhbXBsZUR1cmF0aW9uLFxuICAgICAgICAgIG9yaWdpbkR0czogYXZjU2FtcGxlLmR0cyxcbiAgICAgICAgICBwb3NpdGlvbjogYXZjU2FtcGxlLnBvc2l0aW9uLFxuICAgICAgICAgIGlzUkFQOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICAgIHZpZGVvU2VnbWVudC5hZGRSQVAocmFwKVxuICAgICAgfVxuXG4gICAgICBtcDRTYW1wbGVzLnB1c2goe1xuICAgICAgICBkdHMsXG4gICAgICAgIGNwcyxcbiAgICAgICAgcHRzLFxuICAgICAgICB1bml0czogX3VuaXRzLFxuICAgICAgICBzaXplOiBhdmNTYW1wbGUubGVuZ3RoLFxuICAgICAgICBpc0tleWZyYW1lLFxuICAgICAgICBkdXJhdGlvbjogc2FtcGxlRHVyYXRpb24sXG4gICAgICAgIG9yaWdpbkR0c1xuICAgICAgfSlcbiAgICB9XG4gICAgY29uc3QgZmlyc3QgPSBtcDRTYW1wbGVzWzBdXG4gICAgY29uc3QgbGFzdCA9IG1wNFNhbXBsZXNbbXA0U2FtcGxlcy5sZW5ndGggLSAxXVxuICAgIGxhc3REdHMgPSBsYXN0LmR0cyArIGxhc3QuZHVyYXRpb25cbiAgICBsYXN0UHRzID0gbGFzdC5wdHMgKyBsYXN0LmR1cmF0aW9uXG5cbiAgICB0aGlzLl92aWRlb05leHREdHMgPSBsYXN0RHRzXG5cbiAgICB2aWRlb1NlZ21lbnQuc3RhcnREdHMgPSBmaXJzdER0c1xuICAgIHZpZGVvU2VnbWVudC5lbmREdHMgPSBsYXN0RHRzXG4gICAgdmlkZW9TZWdtZW50LnN0YXJ0UHRzID0gZmlyc3RQdHNcbiAgICB2aWRlb1NlZ21lbnQuZW5kUHRzID0gbGFzdFB0c1xuICAgIHZpZGVvU2VnbWVudC5vcmlnaW5TdGFydER0cyA9IGZpcnN0Lm9yaWdpbkR0c1xuICAgIHZpZGVvU2VnbWVudC5vcmlnaW5FbmREdHMgPSBsYXN0Lm9yaWdpbkR0cyArIGxhc3QuZHVyYXRpb25cbiAgICB2aWRlb1NlZ21lbnQuZ2FwID0gZHRzQ29ycmVjdGlvblxuICAgIGNvbnN0IGZpcnN0U2FtcGxlID0gbmV3IE1lZGlhU2FtcGxlKHtcbiAgICAgIGR0czogZmlyc3QuZHRzLFxuICAgICAgcHRzOiBmaXJzdC5wdHMsXG4gICAgICBkdXJhdGlvbjogZmlyc3QuZHVyYXRpb24sXG4gICAgICBpc0tleWZyYW1lOiBmaXJzdC5pc0tleWZyYW1lLFxuICAgICAgb3JpZ2luRHRzOiBmaXJzdC5vcmlnaW5EdHNcbiAgICB9KVxuICAgIGNvbnN0IGxhc3RTYW1wbGUgPSBuZXcgTWVkaWFTYW1wbGUoe1xuICAgICAgZHRzOiBsYXN0LmR0cyxcbiAgICAgIHB0czogbGFzdC5wdHMsXG4gICAgICBkdXJhdGlvbjogbGFzdC5kdXJhdGlvbixcbiAgICAgIGlzS2V5ZnJhbWU6IGxhc3QuaXNLZXlmcmFtZSxcbiAgICAgIG9yaWdpbkR0czogbGFzdC5vcmlnaW5EdHNcbiAgICB9KVxuICAgIHZpZGVvU2VnbWVudC5maXJzdFNhbXBsZSA9IGZpcnN0U2FtcGxlXG4gICAgdmlkZW9TZWdtZW50Lmxhc3RTYW1wbGUgPSBsYXN0U2FtcGxlXG4gICAgbGV0IG1vb2ZNZGF0ID0gbmV3IEJ1ZmZlcigpXG5cbiAgICB0cmFjay5zYW1wbGVzID0gbXA0U2FtcGxlc1xuICAgIHRyYWNrLnRpbWUgPSBmaXJzdER0c1xuICAgIGNvbnN0IG1vb2YgPSBGTVA0Lm1vb2YodHJhY2spXG4gICAgY29uc3QgbWRhdCA9IEZNUDQubWRhdChtZGF0Qm94KVxuICAgIG1vb2ZNZGF0LndyaXRlKG1vb2YsIG1kYXQpXG5cbiAgICBpZiAoIXRoaXMuX3N0b3JlLmlzTGl2ZSkge1xuICAgICAgdGhpcy5fdmlkZW9TZWdtZW50TGlzdC5hcHBlbmQodmlkZW9TZWdtZW50KVxuICAgIH1cblxuICAgIHRyYWNrLnNhbXBsZXMgPSBbXVxuICAgIHRyYWNrLmxlbmd0aCA9IDBcblxuICAgIHRoaXMuaGFuZGxlTWVkaWFGcmFnbWVudCh7XG4gICAgICB0eXBlOiAndmlkZW8nLFxuICAgICAgZGF0YTogbW9vZk1kYXQuYnVmZmVyLmJ1ZmZlcixcbiAgICAgIHNhbXBsZUNvdW50OiBtcDRTYW1wbGVzLmxlbmd0aCxcbiAgICAgIGZyYWdtZW50OiB2aWRlb1NlZ21lbnRcbiAgICB9KVxuICB9XG5cbiAgX3JlbXV4QXVkaW8gKHRyYWNrKSB7XG4gICAgaWYgKCF0aGlzLl9hdWRpb01ldGEpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBjb25zdCB7c2FtcGxlc30gPSB0cmFja1xuICAgIGxldCBkdHNDb3JyZWN0aW9uXG4gICAgbGV0IGZpcnN0RHRzID0gLTFcbiAgICBsZXQgbGFzdER0cyA9IC0xXG4gICAgLy8gbGV0IGZpcnN0UHRzID0gLTFcbiAgICAvLyBsZXQgbGFzdFB0cyA9IC0xXG4gICAgbGV0IHNpbGVudER1cmF0aW9uXG4gICAgbGV0IG1wNFNhbXBsZXMgPSBbXVxuXG4gICAgY29uc3QgbWRhdEJveCA9IHtcbiAgICAgIHNhbXBsZXM6IFtdXG4gICAgfVxuICAgIGlmICghc2FtcGxlcyB8fCAhc2FtcGxlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBsZXQgaXNGaXJzdER0c0luaXRlZCA9IGZhbHNlXG4gICAgd2hpbGUgKHNhbXBsZXMubGVuZ3RoKSB7XG4gICAgICBsZXQgc2FtcGxlID0gc2FtcGxlcy5zaGlmdCgpXG4gICAgICBjb25zdCB7dW5pdH0gPSBzYW1wbGVcbiAgICAgIGxldCBkdHMgPSBzYW1wbGUuZHRzIC0gdGhpcy5fZHRzQmFzZVxuXG4gICAgICBsZXQgbmVlZFNpbGVudEZyYW1lID0gZmFsc2VcbiAgICAgIGlmIChkdHNDb3JyZWN0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hdWRpb05leHREdHMpIHtcbiAgICAgICAgICBpZiAodGhpcy5fYXVkaW9TZWdtZW50TGlzdC5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgIGR0c0NvcnJlY3Rpb24gPSAwXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTZWdtZW50ID0gdGhpcy5fYXVkaW9TZWdtZW50TGlzdC5nZXRMYXN0U2VnbWVudEJlZm9yZShkdHMpXG4gICAgICAgICAgICBpZiAobGFzdFNlZ21lbnQpIHtcbiAgICAgICAgICAgICAgbGV0IGdhcFxuICAgICAgICAgICAgICBjb25zdCB7bGFzdER0cywgZ2FwOiBsYXN0R2FwfSA9IGxhc3RTZWdtZW50XG4gICAgICAgICAgICAgIGdhcCA9IGR0cyAtIChsYXN0RHRzICsgbGFzdEdhcCkgPiAzID8gZHRzIC0gKGxhc3REdHMgKyBsYXN0R2FwKSA6IDBcbiAgICAgICAgICAgICAgZHRzQ29ycmVjdGlvbiA9IGR0cyAtIChsYXN0RHRzICsgZ2FwKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbmVlZFNpbGVudEZyYW1lID0gdGhpcy5fZmlsbFNpbGVuY2VGcmFtZSAmJiAhdGhpcy5fdmlkZW9TZWdtZW50TGlzdC5pc0VtcHR5KClcbiAgICAgICAgICAgICAgZHRzQ29ycmVjdGlvbiA9IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZHRzQ29ycmVjdGlvbiA9IGR0cyAtIHRoaXMuX2F1ZGlvTmV4dER0cyA+PSAxMDAwID8gMCA6IGR0cyAtIHRoaXMuX2F1ZGlvTmV4dER0c1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCBvcmlnaW5EdHMgPSBkdHNcbiAgICAgIGR0cyAtPSBkdHNDb3JyZWN0aW9uXG5cbiAgICAgIGlmIChuZWVkU2lsZW50RnJhbWUpIHtcbiAgICAgICAgY29uc3QgdmlkZW9TZWdtZW50ID0gdGhpcy5fdmlkZW9TZWdtZW50TGlzdC5nZXRMYXN0U2FtcGxlQmVmb3JlKG9yaWdpbkR0cylcblxuICAgICAgICBpZiAodmlkZW9TZWdtZW50ICYmIHZpZGVvU2VnbWVudC5zdGFydER0cyA8IGR0cykge1xuICAgICAgICAgIHNpbGVudER1cmF0aW9uID0gZHRzIC0gdmlkZW9TZWdtZW50LnN0YXJ0RHRzXG4gICAgICAgICAgZHRzID0gdmlkZW9TZWdtZW50LnN0YXJ0RHRzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmVlZFNpbGVudEZyYW1lID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIWlzRmlyc3REdHNJbml0ZWQpIHtcbiAgICAgICAgZmlyc3REdHMgPSBkdHNcbiAgICAgICAgaXNGaXJzdER0c0luaXRlZCA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRTaWxlbnRGcmFtZSkge1xuICAgICAgICBzYW1wbGVzLnVuc2hpZnQoc2FtcGxlKVxuICAgICAgICBjb25zdCBzaWxlbnRGcmFtZSA9IHRoaXMuaW5pdFNpbGVudEF1ZGlvKGR0cywgc2lsZW50RHVyYXRpb24pXG4gICAgICAgIG1wNFNhbXBsZXMucHVzaChzaWxlbnRGcmFtZSlcblxuICAgICAgICBsZXQgbWRhdFNhbXBsZSA9IHtcbiAgICAgICAgICBidWZmZXI6IFtdLFxuICAgICAgICAgIHNpemU6IDBcbiAgICAgICAgfVxuICAgICAgICBtZGF0U2FtcGxlLmJ1ZmZlci5wdXNoKHtcbiAgICAgICAgICBkYXRhOiBzaWxlbnRGcmFtZS51bml0XG4gICAgICAgIH0pXG4gICAgICAgIG1kYXRTYW1wbGUuc2l6ZSArPSBzaWxlbnRGcmFtZS51bml0LmJ5dGVMZW5ndGhcblxuICAgICAgICBtZGF0Qm94LnNhbXBsZXMucHVzaChtZGF0U2FtcGxlKVxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBsZXQgc2FtcGxlRHVyYXRpb24gPSAwXG5cbiAgICAgIGlmIChzYW1wbGVzLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgIGNvbnN0IG5leHREdHMgPSBzYW1wbGVzWzBdLmR0cyAtIHRoaXMuX2R0c0Jhc2UgLSBkdHNDb3JyZWN0aW9uXG4gICAgICAgIHNhbXBsZUR1cmF0aW9uID0gbmV4dER0cyAtIGR0c1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG1wNFNhbXBsZXMubGVuZ3RoID49IDEpIHsgLy8gdXNlIHNlY29uZCBsYXN0IHNhbXBsZSBkdXJhdGlvblxuICAgICAgICAgIHNhbXBsZUR1cmF0aW9uID0gbXA0U2FtcGxlc1ttcDRTYW1wbGVzLmxlbmd0aCAtIDFdLmR1cmF0aW9uXG4gICAgICAgIH0gZWxzZSB7IC8vIHRoZSBvbmx5IG9uZSBzYW1wbGUsIHVzZSByZWZlcmVuY2Ugc2FtcGxlIGR1cmF0aW9uXG4gICAgICAgICAgc2FtcGxlRHVyYXRpb24gPSB0aGlzLl9hdWRpb01ldGEucmVmU2FtcGxlRHVyYXRpb25cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBtcDRTYW1wbGUgPSB7XG4gICAgICAgIGR0cyxcbiAgICAgICAgcHRzOiBkdHMsXG4gICAgICAgIGN0czogMCxcbiAgICAgICAgc2l6ZTogdW5pdC5ieXRlTGVuZ3RoLFxuICAgICAgICBkdXJhdGlvbjogc2FtcGxlRHVyYXRpb24sXG4gICAgICAgIG9yaWdpbkR0c1xuICAgICAgfVxuXG4gICAgICBsZXQgbWRhdFNhbXBsZSA9IHtcbiAgICAgICAgYnVmZmVyOiBbXSxcbiAgICAgICAgc2l6ZTogMFxuICAgICAgfVxuICAgICAgbWRhdFNhbXBsZS5idWZmZXIucHVzaCh7XG4gICAgICAgIGRhdGE6IHVuaXRcbiAgICAgIH0pXG4gICAgICBtZGF0U2FtcGxlLnNpemUgKz0gdW5pdC5ieXRlTGVuZ3RoXG5cbiAgICAgIG1kYXRCb3guc2FtcGxlcy5wdXNoKG1kYXRTYW1wbGUpXG5cbiAgICAgIG1wNFNhbXBsZXMucHVzaChtcDRTYW1wbGUpXG4gICAgfVxuXG4gICAgY29uc3QgbGFzdCA9IG1wNFNhbXBsZXNbbXA0U2FtcGxlcy5sZW5ndGggLSAxXVxuICAgIGxhc3REdHMgPSBsYXN0LmR0cyArIGxhc3QuZHVyYXRpb25cblxuICAgIHRoaXMuX2F1ZGlvTmV4dER0cyA9IGxhc3REdHNcblxuICAgIGNvbnN0IGF1ZGlvU2VnbWVudCA9IG5ldyBNZWRpYVNlZ21lbnQoKVxuICAgIGF1ZGlvU2VnbWVudC5zdGFydER0cyA9IGZpcnN0RHRzXG4gICAgYXVkaW9TZWdtZW50LmVuZER0cyA9IGxhc3REdHNcbiAgICBhdWRpb1NlZ21lbnQuc3RhcnRQdHMgPSBmaXJzdER0c1xuICAgIGF1ZGlvU2VnbWVudC5lbmRQdHMgPSBsYXN0RHRzXG4gICAgYXVkaW9TZWdtZW50Lm9yaWdpblN0YXJ0RHRzID0gbXA0U2FtcGxlc1swXS5vcmlnaW5EdHNcbiAgICBhdWRpb1NlZ21lbnQub3JpZ2luRW5kRHRzID0gbGFzdC5vcmlnaW5EdHMgKyBsYXN0LmR1cmF0aW9uXG4gICAgYXVkaW9TZWdtZW50LmdhcCA9IGR0c0NvcnJlY3Rpb25cbiAgICBhdWRpb1NlZ21lbnQuZmlyc3RTYW1wbGUgPSBuZXcgTWVkaWFTYW1wbGUoe1xuICAgICAgZHRzOiBtcDRTYW1wbGVzWzBdLmR0cyxcbiAgICAgIHB0czogbXA0U2FtcGxlc1swXS5wdHMsXG4gICAgICBkdXJhdGlvbjogbXA0U2FtcGxlc1swXS5kdXJhdGlvbixcbiAgICAgIG9yaWdpbkR0czogbXA0U2FtcGxlc1swXS5vcmlnaW5EdHNcbiAgICB9KVxuICAgIGF1ZGlvU2VnbWVudC5sYXN0U2FtcGxlID0gbmV3IE1lZGlhU2FtcGxlKHtcbiAgICAgIGR0czogbGFzdC5kdHMsXG4gICAgICBwdHM6IGxhc3QucHRzLFxuICAgICAgZHVyYXRpb246IGxhc3QuZHVyYXRpb24sXG4gICAgICBvcmlnaW5EdHM6IGxhc3Qub3JpZ2luRHRzXG4gICAgfSlcblxuICAgIHRyYWNrLnNhbXBsZXMgPSBtcDRTYW1wbGVzXG4gICAgY29uc3QgbW9vZk1kYXQgPSBuZXcgQnVmZmVyKClcbiAgICB0cmFjay50aW1lID0gZmlyc3REdHNcbiAgICBjb25zdCBtb29mID0gRk1QNC5tb29mKHRyYWNrLCBmaXJzdER0cylcbiAgICBjb25zdCBtZGF0ID0gRk1QNC5tZGF0KG1kYXRCb3gpXG4gICAgbW9vZk1kYXQud3JpdGUobW9vZiwgbWRhdClcblxuICAgIGlmICghdGhpcy5fc3RvcmUuaXNMaXZlKSB7XG4gICAgICB0aGlzLl9hdWRpb1NlZ21lbnRMaXN0LmFwcGVuZChhdWRpb1NlZ21lbnQpXG4gICAgfVxuICAgIHRyYWNrLnNhbXBsZXMgPSBbXVxuICAgIHRyYWNrLmxlbmd0aCA9IDBcbiAgICB0aGlzLmhhbmRsZU1lZGlhRnJhZ21lbnQoe1xuICAgICAgdHlwZTogJ2F1ZGlvJyxcbiAgICAgIGRhdGE6IG1vb2ZNZGF0LmJ1ZmZlci5idWZmZXIsXG4gICAgICBzYW1wbGVDb3VudDogbXA0U2FtcGxlcy5sZW5ndGgsXG4gICAgICBmcmFnbWVudDogYXVkaW9TZWdtZW50XG4gICAgfSlcbiAgfVxuXG4gIGluaXRTaWxlbnRBdWRpbyAoZHRzLCBkdXJhdGlvbikge1xuICAgIGNvbnN0IHVuaXQgPSBNcDRSZW11eGVyLmdldFNpbGVudEZyYW1lKHRoaXMuX2F1ZGlvTWV0YS5jaGFubmVsQ291bnQpXG4gICAgcmV0dXJuIHtcbiAgICAgIGR0cyxcbiAgICAgIHB0czogZHRzLFxuICAgICAgY3BzOiAwLFxuICAgICAgZHVyYXRpb24sXG4gICAgICB1bml0LFxuICAgICAgc2l6ZTogdW5pdC5ieXRlTGVuZ3RoLFxuICAgICAgb3JpZ2luRHRzOiBkdHNcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0U2lsZW50RnJhbWUgKGNoYW5uZWxDb3VudCkge1xuICAgIGlmIChjaGFubmVsQ291bnQgPT09IDEpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMywgMHg4MF0pXG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDIpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgyMSwgMHgwMCwgMHg0OSwgMHg5MCwgMHgwMiwgMHgxOSwgMHgwMCwgMHgyMywgMHg4MF0pXG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDMpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4ZV0pXG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDQpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4MCwgMHgyYywgMHg4MCwgMHgwOCwgMHgwMiwgMHgzOF0pXG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDUpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4MiwgMHgzMCwgMHgwNCwgMHg5OSwgMHgwMCwgMHgyMSwgMHg5MCwgMHgwMiwgMHgzOF0pXG4gICAgfSBlbHNlIGlmIChjaGFubmVsQ291bnQgPT09IDYpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShbMHgwMCwgMHhjOCwgMHgwMCwgMHg4MCwgMHgyMCwgMHg4NCwgMHgwMSwgMHgyNiwgMHg0MCwgMHgwOCwgMHg2NCwgMHgwMCwgMHg4MiwgMHgzMCwgMHgwNCwgMHg5OSwgMHgwMCwgMHgyMSwgMHg5MCwgMHgwMiwgMHgwMCwgMHhiMiwgMHgwMCwgMHgyMCwgMHgwOCwgMHhlMF0pXG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cbn1cbiIsImltcG9ydCBMb2cgZnJvbSAnLi4vLi4vdXRpbHMvTG9nJ1xuaW1wb3J0IFRyYW5zQ29kZXIgZnJvbSAnLi4vVHJhbnNDb2RlcidcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbXV4ZXIgZXh0ZW5kcyBUcmFuc0NvZGVyIHtcbiAgZGlzcGF0Y2ggKHR5cGUsIC4uLnBheWxvYWQpIHtcbiAgICBjb25zdCBwcmVmaXggPSAncmVtdXhlcl8nXG4gICAgdGhpcy5fb2JzZXJ2ZXIuZW1pdChgJHtwcmVmaXh9JHt0eXBlfWAsIC4uLnBheWxvYWQpXG4gIH1cbiAgZXJyb3IgKG1lc3NhZ2UpIHtcbiAgICBjb25zdCB7IENMQVNTX05BTUUgPSAnUmVtdXhlcicgfSA9IHRoaXNcbiAgICBMb2cuZXJyb3IoYFske0NMQVNTX05BTUV9IGVycm9yXSBgLCBtZXNzYWdlKVxuICB9XG5cbiAgaW5mbyAobWVzc2FnZSkge1xuICAgIGNvbnN0IHsgQ0xBU1NfTkFNRSA9ICdSZW11eGVyJyB9ID0gdGhpc1xuICAgIExvZy5pbmZvKGBbJHtDTEFTU19OQU1FfSBpbmZvXSBgLCBtZXNzYWdlKVxuICB9XG5cbiAgbG9nIChtZXNzYWdlKSB7XG4gICAgY29uc3QgeyBDTEFTU19OQU1FID0gJ1JlbXV4ZXInIH0gPSB0aGlzXG4gICAgTG9nLmxvZyhgWyR7Q0xBU1NfTkFNRX0gbG9nXSBgLCBtZXNzYWdlKVxuICB9XG5cbiAgd2FybiAobWVzc2FnZSkge1xuICAgIGNvbnN0IHsgQ0xBU1NfTkFNRSA9ICdSZW11eGVyJyB9ID0gdGhpc1xuICAgIExvZy53YXJuKGBbJHtDTEFTU19OQU1FfSB3YXJuXSBgLCBtZXNzYWdlKVxuICB9XG59XG4iLCJjbGFzcyBMaXZlVGFzayB7XG4gICAgY29uc3RydWN0b3IodXJsLCBjb25maWcpIHtcbiAgICAgICAgY29uc3QgX2hlYWRlcnMgPSBuZXcgd2luZG93LkhlYWRlcnMoKTtcbiAgICAgICAgY29uc3QgX2NvbmZpZyA9IHtcbiAgICAgICAgICAgIGhlYWRlcnM6IE9iamVjdC5hc3NpZ24oe30sIF9oZWFkZXJzKSxcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICBjYWNoZTogJ2RlZmF1bHQnLFxuICAgICAgICAgICAgbW9kZTogJ2NvcnMnLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSBuZXcgUmVxdWVzdCh1cmwsIE9iamVjdC5hc3NpZ24oe30sIF9jb25maWcsIGNvbmZpZykpO1xuICAgIH1cblxuICAgIHJ1biAoY2FsbGJhY2spIHtcblxuICAgICAgICBmdW5jdGlvbiByZXNvbHZlIChyZWFkZXIpIHtcbiAgICAgICAgICAgIHJlYWRlci5yZWFkKCkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlc3VsdC5kb25lID8gdW5kZWZpbmVkIDogcmVzdWx0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlYWRlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmZXRjaCh0aGlzLnJlcXVlc3QpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJlYWRlciA9IHJlcy5ib2R5LmdldFJlYWRlcigpO1xuICAgICAgICAgICAgcmVzb2x2ZShyZWFkZXIpO1xuICAgICAgICB9KTtcblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGl2ZVRhc2s7IiwiaW1wb3J0IFhIUkxvYWRlciBmcm9tICcuL2xvYWRlcnMvWEhSTG9hZGVyJ1xuaW1wb3J0IEZldGNoTG9hZGVyIGZyb20gJy4vbG9hZGVycy9GZXRjaExvYWRlcidcbmNvbnN0IExvYWRDbHMgPSAoZnVuY3Rpb24gKHdpbmRvdykge1xuICBpZiAod2luZG93LmZldGNoKSB7XG4gICAgcmV0dXJuIEZldGNoTG9hZGVyXG4gIH1cbiAgcmV0dXJuIFhIUkxvYWRlclxufSkod2luZG93KVxuY2xhc3MgVm9kVGFzayB7XG4gIGNvbnN0cnVjdG9yICh1cmwsIHJhbmdlLCBoZWFkZXJzKSB7XG4gICAgdGhpcy51cmwgPSB1cmxcbiAgICB0aGlzLnJhbmdlID0gcmFuZ2VcbiAgICB0aGlzLmlkID0gcmFuZ2Uuam9pbignLScpXG4gICAgdGhpcy5vbiA9IGZhbHNlXG4gICAgdGhpcy5sb2FkZXIgPSBuZXcgTG9hZENscyh1cmwsIHJhbmdlLCBoZWFkZXJzKVxuICAgIHRoaXMuaXNDYW5jZWxlZCA9IGZhbHNlXG4gICAgVm9kVGFzay5xdWV1ZS5wdXNoKHRoaXMpXG4gICAgVm9kVGFzay51cGRhdGUoKVxuICB9XG5cbiAgY2FuY2VsICgpIHtcbiAgICB0aGlzLmlzQ2FuY2VsZWQgPSB0cnVlXG4gICAgdGhpcy5sb2FkZXIuY2FuY2VsKClcbiAgfVxuXG4gIHN0YXRpYyByZW1vdmUgKGxvYWRlcikge1xuICAgIFZvZFRhc2sucXVldWUuZmlsdGVyKChpdGVtLCBpZHgpID0+IHtcbiAgICAgIGlmIChpdGVtLnVybCA9PT0gbG9hZGVyLnVybCAmJiBpdGVtLmlkID09PSBsb2FkZXIuaWQpIHtcbiAgICAgICAgVm9kVGFzay5xdWV1ZS5zcGxpY2UoaWR4LCAxKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSlcbiAgICBWb2RUYXNrLnVwZGF0ZSgpXG4gIH1cblxuICBzdGF0aWMgdXBkYXRlICgpIHtcbiAgICBsZXQgUXVldWUgPSBWb2RUYXNrLnF1ZXVlXG4gICAgbGV0IHNlbmRlZCA9IFF1ZXVlLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5vbilcbiAgICBsZXQgd2FpdCA9IFF1ZXVlLmZpbHRlcihpdGVtID0+ICFpdGVtLm9uKVxuICAgIGxldCBtYXggPSBWb2RUYXNrLmxpbWl0IC0gc2VuZGVkLmxlbmd0aFxuICAgIHdhaXQuZm9yRWFjaCgoaXRlbSwgaWR4KSA9PiB7XG4gICAgICBpZiAoaWR4IDwgbWF4KSB7XG4gICAgICAgIGl0ZW0ucnVuKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcnVuICgpIHtcbiAgICBpZiAodGhpcy5sb2FkZXIucmVhZHlTdGF0ZSA9PT0gMSkge1xuICAgICAgdGhpcy5vbiA9IHRydWVcbiAgICAgIHRoaXMubG9hZGVyLnJ1bigpXG4gICAgfSBlbHNlIHtcbiAgICAgIFZvZFRhc2sucmVtb3ZlKClcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgY2xlYXIgKCkge1xuICAgIFZvZFRhc2sucXVldWUuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmICghaXRlbS5sb2FkZXIuY29tcGxldGUpIHtcbiAgICAgICAgaXRlbS5jYW5jZWwoKVxuICAgICAgfVxuICAgIH0pXG4gICAgVm9kVGFzay5xdWV1ZS5sZW5ndGggPSAwXG4gIH1cblxuICBnZXQgcHJvbWlzZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMubG9hZGVyLnByb21pc2VcbiAgfVxuICBnZXQgdGltZVN0YW1wICgpIHtcbiAgICByZXR1cm4gdGhpcy5sb2FkZXIudGltZVN0YW1wXG4gIH1cbn1cblxuVm9kVGFzay5xdWV1ZSA9IFtdXG5Wb2RUYXNrLmxpbWl0ID0gMlxud2luZG93LlZvZFRhc2sgPSBWb2RUYXNrXG5cbmV4cG9ydCBkZWZhdWx0IFZvZFRhc2tcbiIsImltcG9ydCBWb2RUYXNrIGZyb20gJy4uL1ZvZFRhc2snXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGZXRjaExvYWRlciB7XG4gIGNvbnN0cnVjdG9yICh1cmwsIHJhbmdlLCBjb25maWcgPSB7fSkge1xuICAgIHRoaXMudXJsID0gdXJsXG4gICAgdGhpcy5vbiA9IGZhbHNlXG4gICAgdGhpcy5jb21wbGV0ZSA9IGZhbHNlXG4gICAgdGhpcy5pc1N0b3BwZWQgPSBmYWxzZVxuICAgIHRoaXMudGltZVN0YW1wID0gRGF0ZS5ub3coKVxuICAgIGNvbnN0IF9jb25maWcgPSB7XG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFJhbmdlOiBgYnl0ZXM9JHtyYW5nZVswXX0tJHtyYW5nZVsxXX1gXG4gICAgICB9LFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGNhY2hlOiAnZGVmYXVsdCcsXG4gICAgICBtb2RlOiAnY29ycydcbiAgICB9XG5cbiAgICB0aGlzLnJlcXVlc3QgPSAoKSA9PiB7XG4gICAgICB0aGlzLm9uID0gdHJ1ZVxuICAgICAgcmV0dXJuIHdpbmRvdy5mZXRjaCh1cmwsIE9iamVjdC5hc3NpZ24oe30sIF9jb25maWcsIGNvbmZpZykpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5zdGF0dXMgPiAyOTkgfHwgcmVzLnN0YXR1cyA8IDIwMCB8fCAhcmVzLm9rKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZSA9IHRydWVcbiAgICAgICAgICBWb2RUYXNrLnJlbW92ZSh0aGlzKVxuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoYHVybCAke3Jlcy5zdGF0dXN9ICR7cmVzLnN0YXR1c1RleHR9YCkpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXMpXG4gICAgICB9KS50aGVuKHJlcyA9PiByZXMuYXJyYXlCdWZmZXIoKSkudGhlbihidWZmZXIgPT4ge1xuICAgICAgICB0aGlzLmNvbXBsZXRlID0gdHJ1ZVxuICAgICAgICB0aGlzLmJ5dGVMZW5ndGggPSBidWZmZXIuYnl0ZUxlbmd0aFxuICAgICAgICBWb2RUYXNrLnJlbW92ZSh0aGlzKVxuICAgICAgICBpZiAodGhpcy5pc1N0b3BwZWQpIHJldHVybiB7fVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGJ1ZmZlcixcbiAgICAgICAgICB0aW1lU3RhbXA6IHRoaXMudGltZVN0YW1wXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcnVuICgpIHtcbiAgICB0aGlzLl9wcm9taXNlID0gdGhpcy5yZXF1ZXN0KClcbiAgfVxuXG4gIGdldCByZWFkeVN0YXRlICgpIHtcbiAgICByZXR1cm4gMVxuICB9XG5cbiAgY2FuY2VsICgpIHtcbiAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWVcbiAgfVxuXG4gIGdldCBwcm9taXNlICgpIHtcbiAgICByZXR1cm4gdGhpcy5vbiA/IHRoaXMuX3Byb21pc2UgOiB0aGlzLnJlcXVlc3QoKVxuICB9XG59XG4iLCJpbXBvcnQgVm9kVGFzayBmcm9tICcuLi9Wb2RUYXNrJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFhIUkxvYWRlciB7XG4gICAgY29uc3RydWN0b3IgKHVybCwgcmFuZ2UpIHtcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHIub3BlbignZ2V0JywgdXJsKTtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdSYW5nZScsIGBieXRlcz0ke3JhbmdlWzBdfS0ke3JhbmdlWzFdfWApO1xuICAgICAgICB4aHIub25hYm9ydCA9ICgpID0+IHtcbiAgICAgICAgICAgIFZvZFRhc2sucmVtb3ZlKHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9wcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PT0gMjAwIHx8IHhoci5zdGF0dXMgPT09IDIwNikge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFZvZFRhc2sucmVtb3ZlKHRoaXMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHhoci5vbmVycm9yID0gKGUpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgVm9kVGFzay5yZW1vdmUodGhpcyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl94aHIgPSB4aHI7XG4gICAgfVxuXG4gICAgZ2V0IHByb21pc2UgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJvbWlzZTtcbiAgICB9XG5cbiAgICBnZXQgcmVhZHlTdGF0ZSAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl94aHIucmVhZHlTdGF0ZTtcbiAgICB9XG5cbiAgICBydW4gKCkge1xuICAgICAgICB0aGlzLl94aHIuc2VuZCgpO1xuICAgIH1cblxuICAgIGNhbmNlbCAoKSB7XG4gICAgICAgIHRoaXMuX3hoci5hYm9ydCgpO1xuICAgIH1cblxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGFWaWV3NFJlYWQge1xuICAgIGNvbnN0cnVjdG9yIChidWZmZXIsIGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5fZHYgPSBuZXcgRGF0YVZpZXcoYnVmZmVyKTtcbiAgICAgICAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMuaW5pdFByb3h5KCk7XG4gICAgfVxuXG4gICAgaW5pdFByb3h5ICgpIHtcbiAgICAgICAgY29uc3Qgc2l6ZUFyciA9IFs4LCAxNiwgMzJdO1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgY29uc3QgeyBfc3RvcmUgfSA9IHRoaXMuX2NvbnRleHQ7XG4gICAgICAgIHNpemVBcnIuZm9yRWFjaChzaXplID0+IHtcbiAgICAgICAgICAgIHRoaXNbYGdldFVpbnQke3NpemV9YF0gPSBmdW5jdGlvbiAob2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFvZmZzZXQpIHsgb2Zmc2V0ID0gc2VsZi5fY29udGV4dC5yZWFkT2Zmc2V0OyB9XG4gICAgICAgICAgICAgICAgaWYgKG9mZnNldCA9PT0gc2VsZi5fY29udGV4dC5yZWFkT2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2NvbnRleHQucmVhZE9mZnNldCArPSBzaXplIC8gODtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuX2R2W2BnZXRVaW50JHtzaXplfWBdKG9mZnNldCwgIV9zdG9yZS5pc0xlKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIOaYvuW8j+WjsOaYjuS4gOS4quavlOWFtuWug+S9jeaVsOabtOW4uOeUqOivu+WPljI05L2N5pW05pWw5pa55rOVXG4gICAgICAgICAqIEBwYXJhbSBvZmZzZXRcbiAgICAgICAgICogQHBhcmFtIGlzSGlnaFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5nZXRVaW50MjQgPSBmdW5jdGlvbiAob2Zmc2V0KSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLmdldFVpbnQoMjQsIG9mZnNldCwgZmFsc2UpOyAvLyDkvJror7vlj5ZVaW50MzIs5YGaIGFuZCDmk43kvZzkuYvlkI7lm57pgIDkuIDkvY3jgIJcbiAgICAgICAgICAgIHNlbGYuX2NvbnRleHQucmVhZE9mZnNldCAtPSAxO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmdldFVpbnQgPSBmdW5jdGlvbiAoc2l6ZSwgb2Zmc2V0LCBpc0hpZ2ggPSB0cnVlKSB7XG4gICAgICAgICAgICBpZiAoc2l6ZSA+IDMyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgJ25vdCBzdXBwb3J0ZWQgcmVhZCBzaXplJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCByZWFkU2l6ZSA9IDMyO1xuICAgICAgICAgICAgaWYgKCF0aGlzW2BnZXRVaW50JHtzaXplfWBdKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHNpemVBcnIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpemUgPCBzaXplQXJyW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkU2l6ZSA9IHNpemVBcnJbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgbnVtVG9BbmQgPSBpc0hpZ2ggPyBEYXRhVmlldzRSZWFkLmdldEFuZE51bSgwLCBzaXplIC0gMSwgcmVhZFNpemUpIDogRGF0YVZpZXc0UmVhZC5nZXRBbmROdW0ocmVhZFNpemUgLSBzaXplLCByZWFkU2l6ZSAtIDEsIHJlYWRTaXplKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZltgZ2V0VWludCR7cmVhZFNpemV9YF0ob2Zmc2V0LCAhX3N0b3JlLmlzTGUpICYgbnVtVG9BbmQ7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGZbYGdldFVpbnQke3JlYWRTaXplfWBdKG9mZnNldCwgIV9zdG9yZS5pc0xlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0QW5kTnVtIChiZWdpbiwgZW5kLCBzaXplID0gOCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gMDtcbiAgICAgICAgbGV0IGluZGV4ID0gLS1zaXplO1xuICAgICAgICB3aGlsZSAoaW5kZXggPiAwKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPiBlbmQgfHwgaW5kZXggPCBiZWdpbikge1xuICAgICAgICAgICAgICAgIGluZGV4LS07XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBNYXRoLnBvdygyLCBzaXplIC0gaW5kZXgpO1xuICAgICAgICAgICAgICAgIGluZGV4LS07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn0iLCJpbXBvcnQgTG9nZ2VyIGZyb20gJy4vTG9nJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4cEdvbG9tYiB7XG4gICAgY29uc3RydWN0b3IgKGRhdGEpIHtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgLy8gdGhlIG51bWJlciBvZiBieXRlcyBsZWZ0IHRvIGV4YW1pbmUgaW4gdGhpcy5kYXRhXG4gICAgICAgIHRoaXMuYnl0ZXNBdmFpbGFibGUgPSBkYXRhLmJ5dGVMZW5ndGg7XG4gICAgICAgIC8vIHRoZSBjdXJyZW50IHdvcmQgYmVpbmcgZXhhbWluZWRcbiAgICAgICAgdGhpcy53b3JkID0gMDsgLy8gOnVpbnRcbiAgICAgICAgLy8gdGhlIG51bWJlciBvZiBiaXRzIGxlZnQgdG8gZXhhbWluZSBpbiB0aGUgY3VycmVudCB3b3JkXG4gICAgICAgIHRoaXMuYml0c0F2YWlsYWJsZSA9IDA7IC8vIDp1aW50XG4gICAgfVxuICAgIC8vICgpOnZvaWRcbiAgICBsb2FkV29yZCAoKSB7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5kYXRhLFxuICAgICAgICAgICAgYnl0ZXNBdmFpbGFibGUgPSB0aGlzLmJ5dGVzQXZhaWxhYmxlLFxuICAgICAgICAgICAgcG9zaXRpb24gPSBkYXRhLmJ5dGVMZW5ndGggLSBieXRlc0F2YWlsYWJsZSxcbiAgICAgICAgICAgIHdvcmtpbmdCeXRlcyA9IG5ldyBVaW50OEFycmF5KDQpLFxuICAgICAgICAgICAgYXZhaWxhYmxlQnl0ZXMgPSBNYXRoLm1pbig0LCBieXRlc0F2YWlsYWJsZSk7XG4gICAgICAgIGlmIChhdmFpbGFibGVCeXRlcyA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBieXRlcyBhdmFpbGFibGUnKTtcbiAgICAgICAgfVxuICAgICAgICB3b3JraW5nQnl0ZXMuc2V0KGRhdGEuc3ViYXJyYXkocG9zaXRpb24sIHBvc2l0aW9uICsgYXZhaWxhYmxlQnl0ZXMpKTtcbiAgICAgICAgdGhpcy53b3JkID0gbmV3IERhdGFWaWV3KHdvcmtpbmdCeXRlcy5idWZmZXIpLmdldFVpbnQzMigwKTtcbiAgICAgICAgLy8gdHJhY2sgdGhlIGFtb3VudCBvZiB0aGlzLmRhdGEgdGhhdCBoYXMgYmVlbiBwcm9jZXNzZWRcbiAgICAgICAgdGhpcy5iaXRzQXZhaWxhYmxlID0gYXZhaWxhYmxlQnl0ZXMgKiA4O1xuICAgICAgICB0aGlzLmJ5dGVzQXZhaWxhYmxlIC09IGF2YWlsYWJsZUJ5dGVzO1xuICAgIH1cblxuICAgIC8vIChjb3VudDppbnQpOnZvaWRcbiAgICBza2lwQml0cyAoY291bnQpIHtcbiAgICAgICAgdmFyIHNraXBCeXRlczsgLy8gOmludFxuICAgICAgICBpZiAodGhpcy5iaXRzQXZhaWxhYmxlID4gY291bnQpIHtcbiAgICAgICAgICAgIHRoaXMud29yZCA8PD0gY291bnQ7XG4gICAgICAgICAgICB0aGlzLmJpdHNBdmFpbGFibGUgLT0gY291bnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb3VudCAtPSB0aGlzLmJpdHNBdmFpbGFibGU7XG4gICAgICAgICAgICBza2lwQnl0ZXMgPSBjb3VudCA+PiAzO1xuICAgICAgICAgICAgY291bnQgLT0gKHNraXBCeXRlcyA+PiAzKTtcbiAgICAgICAgICAgIHRoaXMuYnl0ZXNBdmFpbGFibGUgLT0gc2tpcEJ5dGVzO1xuICAgICAgICAgICAgdGhpcy5sb2FkV29yZCgpO1xuICAgICAgICAgICAgdGhpcy53b3JkIDw8PSBjb3VudDtcbiAgICAgICAgICAgIHRoaXMuYml0c0F2YWlsYWJsZSAtPSBjb3VudDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2tpcEJ5dGVzO1xuICAgIH1cblxuICAgIC8vIChzaXplOmludCk6dWludFxuICAgIHJlYWRCaXRzIChzaXplKSB7XG4gICAgICAgIGxldCBiaXRzID0gTWF0aC5taW4odGhpcy5iaXRzQXZhaWxhYmxlLCBzaXplKSwgLy8gOnVpbnRcbiAgICAgICAgICAgIHZhbHUgPSB0aGlzLndvcmQgPj4+ICgzMiAtIGJpdHMpOyAvLyA6dWludFxuICAgICAgICBpZiAoc2l6ZSA+IDMyKSB7XG4gICAgICAgICAgICBMb2dnZXIuZXJyb3IoJ0Nhbm5vdCByZWFkIG1vcmUgdGhhbiAzMiBiaXRzIGF0IGEgdGltZScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYml0c0F2YWlsYWJsZSAtPSBiaXRzO1xuICAgICAgICBpZiAodGhpcy5iaXRzQXZhaWxhYmxlID4gMCkge1xuICAgICAgICAgICAgdGhpcy53b3JkIDw8PSBiaXRzO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYnl0ZXNBdmFpbGFibGUgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRXb3JkKCk7XG4gICAgICAgIH1cbiAgICAgICAgYml0cyA9IHNpemUgLSBiaXRzO1xuICAgICAgICBpZiAoYml0cyA+IDAgJiYgdGhpcy5iaXRzQXZhaWxhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdSA8PCBiaXRzIHwgdGhpcy5yZWFkQml0cyhiaXRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gKCk6dWludFxuICAgIHNraXBMWiAoKSB7XG4gICAgICAgIHZhciBsZWFkaW5nWmVyb0NvdW50OyAvLyA6dWludFxuICAgICAgICBmb3IgKGxlYWRpbmdaZXJvQ291bnQgPSAwOyBsZWFkaW5nWmVyb0NvdW50IDwgdGhpcy5iaXRzQXZhaWxhYmxlOyArK2xlYWRpbmdaZXJvQ291bnQpIHtcbiAgICAgICAgICAgIGlmICgwICE9PSAodGhpcy53b3JkICYgKDB4ODAwMDAwMDAgPj4+IGxlYWRpbmdaZXJvQ291bnQpKSkge1xuICAgICAgICAgICAgICAgIC8vIHRoZSBmaXJzdCBiaXQgb2Ygd29ya2luZyB3b3JkIGlzIDFcbiAgICAgICAgICAgICAgICB0aGlzLndvcmQgPDw9IGxlYWRpbmdaZXJvQ291bnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5iaXRzQXZhaWxhYmxlIC09IGxlYWRpbmdaZXJvQ291bnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxlYWRpbmdaZXJvQ291bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gd2UgZXhoYXVzdGVkIHdvcmQgYW5kIHN0aWxsIGhhdmUgbm90IGZvdW5kIGEgMVxuICAgICAgICB0aGlzLmxvYWRXb3JkKCk7XG4gICAgICAgIHJldHVybiBsZWFkaW5nWmVyb0NvdW50ICsgdGhpcy5za2lwTFooKTtcbiAgICB9XG5cbiAgICAvLyAoKTp2b2lkXG4gICAgc2tpcFVFRyAoKSB7XG4gICAgICAgIHRoaXMuc2tpcEJpdHMoMSArIHRoaXMuc2tpcExaKCkpO1xuICAgIH1cblxuICAgIC8vICgpOnZvaWRcbiAgICBza2lwRUcgKCkge1xuICAgICAgICB0aGlzLnNraXBCaXRzKDEgKyB0aGlzLnNraXBMWigpKTtcbiAgICB9XG5cbiAgICAvLyAoKTp1aW50XG4gICAgcmVhZFVFRyAoKSB7XG4gICAgICAgIHZhciBjbHogPSB0aGlzLnNraXBMWigpOyAvLyA6dWludFxuICAgICAgICByZXR1cm4gdGhpcy5yZWFkQml0cyhjbHogKyAxKSAtIDE7XG4gICAgfVxuXG4gICAgLy8gKCk6aW50XG4gICAgcmVhZEVHICgpIHtcbiAgICAgICAgdmFyIHZhbHUgPSB0aGlzLnJlYWRVRUcoKTsgLy8gOmludFxuICAgICAgICBpZiAoMHgwMSAmIHZhbHUpIHtcbiAgICAgICAgICAgIC8vIHRoZSBudW1iZXIgaXMgb2RkIGlmIHRoZSBsb3cgb3JkZXIgYml0IGlzIHNldFxuICAgICAgICAgICAgcmV0dXJuICgxICsgdmFsdSkgPj4+IDE7IC8vIGFkZCAxIHRvIG1ha2UgaXQgZXZlbiwgYW5kIGRpdmlkZSBieSAyXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gLTEgKiAodmFsdSA+Pj4gMSk7IC8vIGRpdmlkZSBieSB0d28gdGhlbiBtYWtlIGl0IG5lZ2F0aXZlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTb21lIGNvbnZlbmllbmNlIGZ1bmN0aW9uc1xuICAgIC8vIDpCb29sZWFuXG4gICAgcmVhZEJvb2xlYW4gKCkge1xuICAgICAgICByZXR1cm4gMSA9PT0gdGhpcy5yZWFkQml0cygxKTtcbiAgICB9XG5cbiAgICAvLyAoKTppbnRcbiAgICByZWFkVUJ5dGUgKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWFkQml0cyg4KTtcbiAgICB9XG5cbiAgICAvLyAoKTppbnRcbiAgICByZWFkVVNob3J0ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVhZEJpdHMoMTYpO1xuICAgIH1cbiAgICAvLyAoKTppbnRcbiAgICByZWFkVUludCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWRCaXRzKDMyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZHZhbmNlIHRoZSBFeHBHb2xvbWIgZGVjb2RlciBwYXN0IGEgc2NhbGluZyBsaXN0LiBUaGUgc2NhbGluZ1xuICAgICAqIGxpc3QgaXMgb3B0aW9uYWxseSB0cmFuc21pdHRlZCBhcyBwYXJ0IG9mIGEgc2VxdWVuY2UgcGFyYW1ldGVyXG4gICAgICogc2V0IGFuZCBpcyBub3QgcmVsZXZhbnQgdG8gdHJhbnNtdXhpbmcuXG4gICAgICogQHBhcmFtIGNvdW50IHtudW1iZXJ9IHRoZSBudW1iZXIgb2YgZW50cmllcyBpbiB0aGlzIHNjYWxpbmcgbGlzdFxuICAgICAqIEBzZWUgUmVjb21tZW5kYXRpb24gSVRVLVQgSC4yNjQsIFNlY3Rpb24gNy4zLjIuMS4xLjFcbiAgICAgKi9cbiAgICBza2lwU2NhbGluZ0xpc3QgKGNvdW50KSB7XG4gICAgICAgIHZhciBsYXN0U2NhbGUgPSA4LFxuICAgICAgICAgICAgbmV4dFNjYWxlID0gOCxcbiAgICAgICAgICAgIGosXG4gICAgICAgICAgICBkZWx0YVNjYWxlO1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgY291bnQ7IGorKykge1xuICAgICAgICAgICAgaWYgKG5leHRTY2FsZSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGRlbHRhU2NhbGUgPSB0aGlzLnJlYWRFRygpO1xuICAgICAgICAgICAgICAgIG5leHRTY2FsZSA9IChsYXN0U2NhbGUgKyBkZWx0YVNjYWxlICsgMjU2KSAlIDI1NjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxhc3RTY2FsZSA9IChuZXh0U2NhbGUgPT09IDApXG4gICAgICAgICAgICAgICAgPyBsYXN0U2NhbGVcbiAgICAgICAgICAgICAgICA6IG5leHRTY2FsZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlYWQgYSBzZXF1ZW5jZSBwYXJhbWV0ZXIgc2V0IGFuZCByZXR1cm4gc29tZSBpbnRlcmVzdGluZyB2aWRlb1xuICAgICAqIHByb3BlcnRpZXMuIEEgc2VxdWVuY2UgcGFyYW1ldGVyIHNldCBpcyB0aGUgSDI2NCBtZXRhZGF0YSB0aGF0XG4gICAgICogZGVzY3JpYmVzIHRoZSBwcm9wZXJ0aWVzIG9mIHVwY29taW5nIHZpZGVvIGZyYW1lcy5cbiAgICAgKiBAcGFyYW0gZGF0YSB7VWludDhBcnJheX0gdGhlIGJ5dGVzIG9mIGEgc2VxdWVuY2UgcGFyYW1ldGVyIHNldFxuICAgICAqIEByZXR1cm4ge29iamVjdH0gYW4gb2JqZWN0IHdpdGggY29uZmlndXJhdGlvbiBwYXJzZWQgZnJvbSB0aGVcbiAgICAgKiBzZXF1ZW5jZSBwYXJhbWV0ZXIgc2V0LCBpbmNsdWRpbmcgdGhlIGRpbWVuc2lvbnMgb2YgdGhlXG4gICAgICogYXNzb2NpYXRlZCB2aWRlbyBmcmFtZXMuXG4gICAgICovXG4gICAgcmVhZFNQUyAoKSB7XG4gICAgICAgIHZhciBmcmFtZUNyb3BMZWZ0T2Zmc2V0ID0gMCxcbiAgICAgICAgICAgIGZyYW1lQ3JvcFJpZ2h0T2Zmc2V0ID0gMCxcbiAgICAgICAgICAgIGZyYW1lQ3JvcFRvcE9mZnNldCA9IDAsXG4gICAgICAgICAgICBmcmFtZUNyb3BCb3R0b21PZmZzZXQgPSAwLFxuICAgICAgICAgICAgcHJvZmlsZUlkYyxcbiAgICAgICAgICAgIC8vIHByb2ZpbGVDb21wYXQsXG4gICAgICAgICAgICBsZXZlbElkYyxcbiAgICAgICAgICAgIGNvZGVjV2lkdGgsXG4gICAgICAgICAgICBjb2RlY0hlaWdodCxcbiAgICAgICAgICAgIHByZXNlbnRXaWR0aCxcbiAgICAgICAgICAgIG51bVJlZkZyYW1lc0luUGljT3JkZXJDbnRDeWNsZSxcbiAgICAgICAgICAgIHBpY1dpZHRoSW5NYnNNaW51czEsXG4gICAgICAgICAgICBwaWNIZWlnaHRJbk1hcFVuaXRzTWludXMxLFxuICAgICAgICAgICAgZnJhbWVNYnNPbmx5RmxhZyxcbiAgICAgICAgICAgIHNjYWxpbmdMaXN0Q291bnQsXG4gICAgICAgICAgICBpLFxuICAgICAgICAgICAgcmVhZFVCeXRlID0gdGhpcy5yZWFkVUJ5dGUuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHJlYWRCaXRzID0gdGhpcy5yZWFkQml0cy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgcmVhZFVFRyA9IHRoaXMucmVhZFVFRy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgcmVhZEJvb2xlYW4gPSB0aGlzLnJlYWRCb29sZWFuLmJpbmQodGhpcyksXG4gICAgICAgICAgICBza2lwQml0cyA9IHRoaXMuc2tpcEJpdHMuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIHNraXBFRyA9IHRoaXMuc2tpcEVHLmJpbmQodGhpcyksXG4gICAgICAgICAgICBza2lwVUVHID0gdGhpcy5za2lwVUVHLmJpbmQodGhpcyksXG4gICAgICAgICAgICBza2lwU2NhbGluZ0xpc3QgPSB0aGlzLnNraXBTY2FsaW5nTGlzdC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHJlYWRVQnl0ZSgpO1xuICAgICAgICBwcm9maWxlSWRjID0gcmVhZFVCeXRlKCk7IC8vIHByb2ZpbGVfaWRjXG4gICAgICAgIHJlYWRCaXRzKDUpOyAvLyBwcm9maWxlQ29tcGF0IGNvbnN0cmFpbnRfc2V0WzAtNF1fZmxhZywgdSg1KVxuICAgICAgICBza2lwQml0cygzKTsgLy8gcmVzZXJ2ZWRfemVyb18zYml0cyB1KDMpLFxuICAgICAgICBsZXZlbElkYyA9IHJlYWRVQnl0ZSgpOyAvLyBsZXZlbF9pZGMgdSg4KVxuICAgICAgICBza2lwVUVHKCk7IC8vIHNlcV9wYXJhbWV0ZXJfc2V0X2lkXG4gICAgICAgIGxldCBjaHJvbWFGb3JtYXRJZGMgPSAxO1xuICAgICAgICBsZXQgY2hyb21hRm9ybWF0ID0gNDIwO1xuICAgICAgICBsZXQgY2hyb21hRm9ybWF0cyA9IFswLCA0MjAsIDQyMiwgNDQ0XTtcbiAgICAgICAgbGV0IGJpdERlcHRoTHVtYSA9IDg7XG4gICAgICAgIGNvbnN0IHByb2ZpbGVJZGNzID0gWzEwMCwgMTEwLCAxMjIsIDI0NCwgNDQsIDgzLCA4NiwgMTE4LCAxMjhdO1xuICAgICAgICAvLyBzb21lIHByb2ZpbGVzIGhhdmUgbW9yZSBvcHRpb25hbCBkYXRhIHdlIGRvbid0IG5lZWRcbiAgICAgICAgaWYgKHByb2ZpbGVJZGNzLmluY2x1ZGVzKHByb2ZpbGVJZGMpKSB7XG4gICAgICAgICAgICBjaHJvbWFGb3JtYXRJZGMgPSByZWFkVUVHKCk7XG4gICAgICAgICAgICBpZiAoY2hyb21hRm9ybWF0SWRjID09PSAzKSB7XG4gICAgICAgICAgICAgICAgc2tpcEJpdHMoMSk7IC8vIHNlcGFyYXRlX2NvbG91cl9wbGFuZV9mbGFnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2hyb21hRm9ybWF0SWRjIDw9IDMpIHtcbiAgICAgICAgICAgICAgICBjaHJvbWFGb3JtYXQgPSBjaHJvbWFGb3JtYXRzW2Nocm9tYUZvcm1hdElkY107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBiaXREZXB0aEx1bWEgPSByZWFkVUVHKCkgKyA4OyAvLyBiaXRfZGVwdGhfbHVtYV9taW51czhcbiAgICAgICAgICAgIHNraXBVRUcoKTsgLy8gYml0X2RlcHRoX2Nocm9tYV9taW51czhcbiAgICAgICAgICAgIHNraXBCaXRzKDEpOyAvLyBxcHByaW1lX3lfemVyb190cmFuc2Zvcm1fYnlwYXNzX2ZsYWdcbiAgICAgICAgICAgIGlmIChyZWFkQm9vbGVhbigpKSB7IC8vIHNlcV9zY2FsaW5nX21hdHJpeF9wcmVzZW50X2ZsYWdcbiAgICAgICAgICAgICAgICBzY2FsaW5nTGlzdENvdW50ID0gKGNocm9tYUZvcm1hdElkYyAhPT0gMylcbiAgICAgICAgICAgICAgICAgICAgPyA4XG4gICAgICAgICAgICAgICAgICAgIDogMTI7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHNjYWxpbmdMaXN0Q291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVhZEJvb2xlYW4oKSkgeyAvLyBzZXFfc2NhbGluZ19saXN0X3ByZXNlbnRfZmxhZ1sgaSBdXG4gICAgICAgICAgICAgICAgICAgICAgICBpIDwgNiA/IHNraXBTY2FsaW5nTGlzdCgxNikgOiBza2lwU2NhbGluZ0xpc3QoNjQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNraXBVRUcoKTsgLy8gbG9nMl9tYXhfZnJhbWVfbnVtX21pbnVzNFxuICAgICAgICB2YXIgcGljT3JkZXJDbnRUeXBlID0gcmVhZFVFRygpO1xuICAgICAgICBpZiAocGljT3JkZXJDbnRUeXBlID09PSAwKSB7XG4gICAgICAgICAgICByZWFkVUVHKCk7IC8vIGxvZzJfbWF4X3BpY19vcmRlcl9jbnRfbHNiX21pbnVzNFxuICAgICAgICB9IGVsc2UgaWYgKHBpY09yZGVyQ250VHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgc2tpcEJpdHMoMSk7IC8vIGRlbHRhX3BpY19vcmRlcl9hbHdheXNfemVyb19mbGFnXG4gICAgICAgICAgICBza2lwRUcoKTsgLy8gb2Zmc2V0X2Zvcl9ub25fcmVmX3BpY1xuICAgICAgICAgICAgc2tpcEVHKCk7IC8vIG9mZnNldF9mb3JfdG9wX3RvX2JvdHRvbV9maWVsZFxuICAgICAgICAgICAgbnVtUmVmRnJhbWVzSW5QaWNPcmRlckNudEN5Y2xlID0gcmVhZFVFRygpO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG51bVJlZkZyYW1lc0luUGljT3JkZXJDbnRDeWNsZTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc2tpcEVHKCk7IC8vIG9mZnNldF9mb3JfcmVmX2ZyYW1lWyBpIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVmRnJhbWVzID0gcmVhZFVFRygpOyAvLyBtYXhfbnVtX3JlZl9mcmFtZXNcbiAgICAgICAgc2tpcEJpdHMoMSk7IC8vIGdhcHNfaW5fZnJhbWVfbnVtX3ZhbHVlX2FsbG93ZWRfZmxhZ1xuICAgICAgICBwaWNXaWR0aEluTWJzTWludXMxID0gcmVhZFVFRygpO1xuICAgICAgICBwaWNIZWlnaHRJbk1hcFVuaXRzTWludXMxID0gcmVhZFVFRygpO1xuICAgICAgICBmcmFtZU1ic09ubHlGbGFnID0gcmVhZEJpdHMoMSk7XG4gICAgICAgIGlmIChmcmFtZU1ic09ubHlGbGFnID09PSAwKSB7XG4gICAgICAgICAgICBza2lwQml0cygxKTsgLy8gbWJfYWRhcHRpdmVfZnJhbWVfZmllbGRfZmxhZ1xuICAgICAgICB9XG4gICAgICAgIHNraXBCaXRzKDEpOyAvLyBkaXJlY3RfOHg4X2luZmVyZW5jZV9mbGFnXG4gICAgICAgIGlmIChyZWFkQm9vbGVhbigpKSB7IC8vIGZyYW1lX2Nyb3BwaW5nX2ZsYWdcbiAgICAgICAgICAgIGZyYW1lQ3JvcExlZnRPZmZzZXQgPSByZWFkVUVHKCk7XG4gICAgICAgICAgICBmcmFtZUNyb3BSaWdodE9mZnNldCA9IHJlYWRVRUcoKTtcbiAgICAgICAgICAgIGZyYW1lQ3JvcFRvcE9mZnNldCA9IHJlYWRVRUcoKTtcbiAgICAgICAgICAgIGZyYW1lQ3JvcEJvdHRvbU9mZnNldCA9IHJlYWRVRUcoKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZnJhbWVSYXRlID0ge1xuICAgICAgICAgICAgZnBzOiAwLFxuICAgICAgICAgICAgZnBzRml4ZWQ6IHRydWUsXG4gICAgICAgICAgICBmcHNOdW06IDAsXG4gICAgICAgICAgICBmcHNEZW46IDAsXG4gICAgICAgIH07XG4gICAgICAgIGxldCBwaXhlbFJhdGlvID0gWzEsIDFdO1xuICAgICAgICBpZiAocmVhZEJvb2xlYW4oKSkge1xuICAgICAgICAgICAgLy8gdnVpX3BhcmFtZXRlcnNfcHJlc2VudF9mbGFnXG4gICAgICAgICAgICBpZiAocmVhZEJvb2xlYW4oKSkge1xuICAgICAgICAgICAgICAgIC8vIGFzcGVjdF9yYXRpb19pbmZvX3ByZXNlbnRfZmxhZ1xuICAgICAgICAgICAgICAgIGNvbnN0IGFzcGVjdFJhdGlvSWRjID0gcmVhZFVCeXRlKCk7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChhc3BlY3RSYXRpb0lkYykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBwaXhlbFJhdGlvID0gWzEsIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpeGVsUmF0aW8gPSBbMTIsIDExXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBwaXhlbFJhdGlvID0gWzEwLCAxMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgcGl4ZWxSYXRpbyA9IFsxNiwgMTFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpeGVsUmF0aW8gPSBbNDAsIDMzXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgICAgICBwaXhlbFJhdGlvID0gWzI0LCAxMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgICAgICAgICAgcGl4ZWxSYXRpbyA9IFsyMCwgMTFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpeGVsUmF0aW8gPSBbMzIsIDExXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgICAgICAgICBwaXhlbFJhdGlvID0gWzgwLCAzM107XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpeGVsUmF0aW8gPSBbMTgsIDExXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDExOlxuICAgICAgICAgICAgICAgICAgICAgICAgcGl4ZWxSYXRpbyA9IFsxNSwgMTFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgICAgICAgICAgICBwaXhlbFJhdGlvID0gWzY0LCAzM107XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpeGVsUmF0aW8gPSBbMTYwLCA5OV07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpeGVsUmF0aW8gPSBbNCwgM107XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxNTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpeGVsUmF0aW8gPSBbMywgMl07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxNjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpeGVsUmF0aW8gPSBbMiwgMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyNTU6XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpeGVsUmF0aW8gPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhZFVCeXRlKCkgPDwgOCB8IHJlYWRVQnl0ZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRVQnl0ZSgpIDw8IDggfCByZWFkVUJ5dGUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZWFkQm9vbGVhbigpKSB7IC8vIG92ZXJzY2FuX2luZm9fcHJlc2VudF9mbGFnXG4gICAgICAgICAgICAgICAgcmVhZEJvb2xlYW4oKTsgLy8gb3ZlcnNjYW5fYXBwcm9wcmlhdGVfZmxhZ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlYWRCb29sZWFuKCkpIHsgLy8gdmlkZW9fc2lnbmFsX3R5cGVfcHJlc2VudF9mbGFnXG4gICAgICAgICAgICAgICAgcmVhZEJpdHMoNCk7IC8vIHZpZGVvX2Zvcm1hdCAmIHZpZGVvX2Z1bGxfcmFuZ2VfZmxhZ1xuICAgICAgICAgICAgICAgIGlmIChyZWFkQm9vbGVhbigpKSB7IC8vIGNvbG91cl9kZXNjcmlwdGlvbl9wcmVzZW50X2ZsYWdcbiAgICAgICAgICAgICAgICAgICAgcmVhZEJpdHMoMjQpOyAvLyBjb2xvdXJfcHJpbWFyaWVzICYgdHJhbnNmZXJfY2hhcmFjdGVyaXN0aWNzICYgbWF0cml4X2NvZWZmaWNpZW50c1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZWFkQm9vbGVhbigpKSB7IC8vIGNocm9tYV9sb2NfaW5mb19wcmVzZW50X2ZsYWdcbiAgICAgICAgICAgICAgICByZWFkVUVHKCk7IC8vIGNocm9tYV9zYW1wbGVfbG9jX3R5cGVfdG9wX2ZpZWxkXG4gICAgICAgICAgICAgICAgcmVhZFVFRygpOyAvLyBjaHJvbWFfc2FtcGxlX2xvY190eXBlX2JvdHRvbV9maWVsZFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVhZEJvb2xlYW4oKSkgeyAvLyB0aW1pbmdfaW5mb19wcmVzZW50X2ZsYWdcbiAgICAgICAgICAgICAgICBjb25zdCBudW1Vbml0SW5UaWNrID0gKHJlYWRCaXRzKDMyKSk7XG4gICAgICAgICAgICAgICAgZnJhbWVSYXRlLmZwc051bSA9IChyZWFkQml0cygzMikpO1xuICAgICAgICAgICAgICAgIGZyYW1lUmF0ZS5maXhlZCA9IHRoaXMucmVhZEJvb2xlYW4oKTtcbiAgICAgICAgICAgICAgICBmcmFtZVJhdGUuZnBzRGVuID0gbnVtVW5pdEluVGljayAqIDI7XG4gICAgICAgICAgICAgICAgZnJhbWVSYXRlLmZwcyA9IGZyYW1lUmF0ZS5mcHNOdW0gLyBmcmFtZVJhdGUuZnBzRGVuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGNyb3BVbml0WCA9IDAsIGNyb3BVbml0WSA9IDA7XG4gICAgICAgICAgICBpZiAoY2hyb21hRm9ybWF0SWRjID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY3JvcFVuaXRYID0gMTtcbiAgICAgICAgICAgICAgICBjcm9wVW5pdFggPSAyIC0gZnJhbWVNYnNPbmx5RmxhZztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IHN1YldjID0gY2hyb21hRm9ybWF0SWRjID09PSAzID8gMSA6IDI7XG4gICAgICAgICAgICAgICAgbGV0IHN1YkhjID0gY2hyb21hRm9ybWF0SWRjID09PSAxID8gMiA6IDE7XG4gICAgICAgICAgICAgICAgY3JvcFVuaXRYID0gc3ViV2M7XG4gICAgICAgICAgICAgICAgY3JvcFVuaXRZID0gc3ViSGMgKiAoMiAtIGZyYW1lTWJzT25seUZsYWcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb2RlY1dpZHRoID0gKHBpY1dpZHRoSW5NYnNNaW51czEgKyAxKSAqIDE2O1xuICAgICAgICAgICAgY29kZWNIZWlnaHQgPSAoMiAtIGZyYW1lTWJzT25seUZsYWcpICogKChwaWNIZWlnaHRJbk1hcFVuaXRzTWludXMxICsgMSkgKiAxNik7XG5cbiAgICAgICAgICAgIGNvZGVjV2lkdGggLT0gKGZyYW1lQ3JvcExlZnRPZmZzZXQgKyBmcmFtZUNyb3BSaWdodE9mZnNldCkgKiBjcm9wVW5pdFg7XG4gICAgICAgICAgICBjb2RlY0hlaWdodCAtPSAoZnJhbWVDcm9wVG9wT2Zmc2V0ICsgZnJhbWVDcm9wQm90dG9tT2Zmc2V0KSAqIGNyb3BVbml0WTtcblxuICAgICAgICAgICAgY29uc3QgcGl4ZWxTY2FsZSA9IHBpeGVsUmF0aW9bMF0gPT09IDEgfHwgcGl4ZWxSYXRpb1sxXSA9PT0gMVxuICAgICAgICAgICAgICAgID8gMVxuICAgICAgICAgICAgICAgIDogcGl4ZWxSYXRpb1swXSAvIHBpeGVsUmF0aW9bMV07XG5cbiAgICAgICAgICAgIHByZXNlbnRXaWR0aCA9IHBpeGVsU2NhbGUgKiBjb2RlY1dpZHRoO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwcm9maWxlSWRjLFxuICAgICAgICAgICAgbGV2ZWxJZGMsXG4gICAgICAgICAgICByZWZGcmFtZXMsXG4gICAgICAgICAgICBjaHJvbWFGb3JtYXQsXG4gICAgICAgICAgICBiaXREZXB0aDogYml0RGVwdGhMdW1hLFxuICAgICAgICAgICAgZnJhbWVSYXRlLFxuICAgICAgICAgICAgY29kZWNTaXplOiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IGNvZGVjV2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBjb2RlY0hlaWdodCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcmVzZW50U2l6ZToge1xuICAgICAgICAgICAgICAgIHdpZHRoOiBwcmVzZW50V2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBjb2RlY0hlaWdodCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB3aWR0aDogTWF0aC5jZWlsKCgoKHBpY1dpZHRoSW5NYnNNaW51czEgKyAxKSAqIDE2KSAtIGZyYW1lQ3JvcExlZnRPZmZzZXQgKiAyIC0gZnJhbWVDcm9wUmlnaHRPZmZzZXQgKiAyKSksXG4gICAgICAgICAgICBoZWlnaHQ6ICgoMiAtIGZyYW1lTWJzT25seUZsYWcpICogKHBpY0hlaWdodEluTWFwVW5pdHNNaW51czEgKyAxKSAqIDE2KSAtICgoXG4gICAgICAgICAgICAgICAgZnJhbWVNYnNPbmx5RmxhZ1xuICAgICAgICAgICAgICAgICAgICA/IDJcbiAgICAgICAgICAgICAgICAgICAgOiA0KSAqIChmcmFtZUNyb3BUb3BPZmZzZXQgKyBmcmFtZUNyb3BCb3R0b21PZmZzZXQpKSxcbiAgICAgICAgICAgIHBpeGVsUmF0aW86IHBpeGVsUmF0aW8sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVhZFNsaWNlVHlwZSAoKSB7XG4gICAgICAgIC8vIHNraXAgTkFMdSB0eXBlXG4gICAgICAgIHRoaXMucmVhZFVCeXRlKCk7XG4gICAgICAgIC8vIGRpc2NhcmQgZmlyc3RfbWJfaW5fc2xpY2VcbiAgICAgICAgdGhpcy5yZWFkVUVHKCk7XG4gICAgICAgIC8vIHJldHVybiBzbGljZV90eXBlXG4gICAgICAgIHJldHVybiB0aGlzLnJlYWRVRUcoKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dnZXIge1xuICAgIHN0YXRpYyBsb2cgKC4uLmFyZ3MpIHtcbiAgICAgICAgd2luZG93LmNvbnNvbGUubG9nLmFwcGx5KHdpbmRvdywgYXJncyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGluZm8gKC4uLmFyZ3MpIHtcbiAgICAgICAgd2luZG93LmNvbnNvbGUuaW5mby5hcHBseSh3aW5kb3csIGFyZ3MpO1xuICAgIH1cblxuICAgIHN0YXRpYyBlcnJvciAoLi4uYXJncykge1xuICAgICAgICB3aW5kb3cuY29uc29sZS5lcnJvci5hcHBseSh3aW5kb3csIGFyZ3MpO1xuICAgIH1cblxuICAgIHN0YXRpYyB3YXJuICguLi5hcmdzKSB7XG4gICAgICAgIHdpbmRvdy5jb25zb2xlLndhcm4uYXBwbHkod2luZG93LCBhcmdzKTtcbiAgICB9XG59XG4iLCIvKipcbiAqIEBhdXRob3IgZnV5dWhhb1xuICovXG5cbmNvbnN0IG5hdGl2ZVNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlXG5cbmNsYXNzIE9ic2VydmVyIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMuZm5JZCA9IDFcbiAgICB0aGlzLl9saXN0ZW5lcklkTWFwID0ge31cbiAgICB0aGlzLl9saXN0ZW5lcnMgPSB7fVxuICB9XG4gIG9uIChrZXksIGZuKSB7XG4gICAgY29uc3QgZm5JZCA9IHRoaXMuZm5JZCsrXG4gICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fZ2V0TGlzdGVuZXJzQnlLZXkoa2V5KVxuICAgIHRoaXMuX2xpc3RlbmVySWRNYXBbZm5JZF0gPSBmblxuICAgIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAgIGxpc3RlbmVycy51bnNoaWZ0KGZuSWQpXG4gICAgICByZXR1cm4gZm5JZFxuICAgIH1cbiAgICB0aGlzLl9saXN0ZW5lcnNba2V5XSA9IFtmbklkXVxuICAgIHJldHVybiBmbklkXG4gIH1cbiAgZW1pdCAoa2V5KSB7XG4gICAgY29uc3QgYXJncyA9IG5hdGl2ZVNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2dldExpc3RlbmVyc0J5S2V5KGtleSkgfHwgW11cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb25zdCBmbiA9IHRoaXMuX2dldExpc3RlbmVyQnlJZChsaXN0ZW5lcnNbaV0pXG4gICAgICBmbiAmJiBmbi5hcHBseShudWxsLCBhcmdzKVxuICAgIH1cbiAgfVxuICBvbmNlIChrZXksIGZuKSB7XG4gICAgY29uc3QgZm5JZCA9IHRoaXMuZm5JZCsrXG4gICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fZ2V0TGlzdGVuZXJzQnlLZXkoa2V5KVxuICAgIGNvbnN0IF90aGlzID0gdGhpc1xuXG4gICAgZnVuY3Rpb24gb25jZUZ1bmMgKCkge1xuICAgICAgY29uc3QgYXJncyA9IG5hdGl2ZVNsaWNlLmNhbGwoYXJndW1lbnRzKVxuICAgICAgZm4uYXBwbHkobnVsbCwgYXJncylcbiAgICAgIF90aGlzLm9mZihrZXksIGZuSWQpXG4gICAgfVxuICAgIHRoaXMuX2xpc3RlbmVySWRNYXBbZm5JZF0gPSBvbmNlRnVuY1xuICAgIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAgIGxpc3RlbmVycy51bnNoaWZ0KGZuSWQpXG4gICAgICByZXR1cm4gZm5JZFxuICAgIH1cbiAgICB0aGlzLl9saXN0ZW5lcnNba2V5XSA9IFtmbklkXVxuICAgIHJldHVybiBmbklkXG4gIH1cbiAgb2ZmIChrZXksIGZuSWQpIHtcbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9nZXRMaXN0ZW5lcnNCeUtleShrZXkpXG4gICAgY29uc3QgZm4gPSB0aGlzLl9nZXRMaXN0ZW5lckJ5SWQoZm5JZClcbiAgICBpZiAoIWZuIHx8ICFsaXN0ZW5lcnMgfHwgbGlzdGVuZXJzLmluZGV4T2YoZm5JZCkgPCAwKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgZGVsZXRlIHRoaXMuX2xpc3RlbmVySWRNYXBbZm5JZF1cbiAgICBpZiAobGlzdGVuZXJzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgZGVsZXRlIHRoaXMuX2xpc3RlbmVyc1trZXldXG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3RlbmVyc1tsaXN0ZW5lcnMuaW5kZXhPZihmbklkKV0gPSB1bmRlZmluZWRcbiAgICB9XG4gIH1cbiAgX2dldExpc3RlbmVyc0J5S2V5IChrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXJzW2tleV1cbiAgfVxuICBfZ2V0TGlzdGVuZXJCeUlkIChmbklkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVySWRNYXBbZm5JZF1cbiAgfVxuICBmbHVzaCAoa2V5KSB7XG4gICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fZ2V0TGlzdGVuZXJzQnlLZXkoa2V5KVxuICAgIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAgIGxpc3RlbmVycy5mb3JFYWNoKGZuSWQgPT4ge1xuICAgICAgICBkZWxldGUgdGhpcy5fbGlzdGVuZXJJZE1hcFtmbklkXVxuICAgICAgfSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9saXN0ZW5lcnNba2V5XVxuICAgIH1cbiAgfVxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMgPSBudWxsXG4gICAgdGhpcy5fbGlzdGVuZXJJZE1hcCA9IG51bGxcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgT2JzZXJ2ZXIoKVxuIiwiLyogZXNsaW50LWRpc2FibGUgKi9cbmNsYXNzIFVURjgge1xuICAgIHN0YXRpYyBkZWNvZGUodWludDhhcnJheSkge1xuICAgICAgICBjb25zdCBvdXQgPSBbXTtcbiAgICAgICAgY29uc3QgaW5wdXQgPSB1aW50OGFycmF5O1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IHVpbnQ4YXJyYXkubGVuZ3RoO1xuXG4gICAgICAgIHdoaWxlIChpIDwgbGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaW5wdXRbaV0gPCAweDgwKSB7XG4gICAgICAgICAgICAgICAgb3V0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShpbnB1dFtpXSkpO1xuICAgICAgICAgICAgICAgICsraTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5wdXRbaV0gPCAweEMwKSB7XG4gICAgICAgICAgICAgICAgLy8gZmFsbHRocm91Z2hcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5wdXRbaV0gPCAweEUwKSB7XG4gICAgICAgICAgICAgICAgaWYgKFVURjguX2NoZWNrQ29udGludWF0aW9uKGlucHV0LCBpLCAxKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB1Y3M0ID0gKGlucHV0W2ldICYgMHgxRikgPDwgNiB8IChpbnB1dFtpICsgMV0gJiAweDNGKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVjczQgPj0gMHg4MCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3V0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSh1Y3M0ICYgMHhGRkZGKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpICs9IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5wdXRbaV0gPCAweEYwKSB7XG4gICAgICAgICAgICAgICAgaWYgKFVURjguX2NoZWNrQ29udGludWF0aW9uKGlucHV0LCBpLCAyKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB1Y3M0ID0gKGlucHV0W2ldICYgMHhGKSA8PCAxMiB8IChpbnB1dFtpICsgMV0gJiAweDNGKSA8PCA2IHwgaW5wdXRbaSArIDJdICYgMHgzRjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVjczQgPj0gMHg4MDAgJiYgKHVjczQgJiAweEY4MDApICE9PSAweEQ4MDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUodWNzNCAmIDB4RkZGRikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaSArPSAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlucHV0W2ldIDwgMHhGOCkge1xuICAgICAgICAgICAgICAgIGlmIChVVEY4Ll9jaGVja0NvbnRpbnVhdGlvbihpbnB1dCwgaSwgMykpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVjczQgPSAoaW5wdXRbaV0gJiAweDcpIDw8IDE4IHwgKGlucHV0W2kgKyAxXSAmIDB4M0YpIDw8IDEyIHxcbiAgICAgICAgICAgICAgICAgICAgICAgIChpbnB1dFtpICsgMl0gJiAweDNGKSA8PCA2IHwgKGlucHV0W2kgKyAzXSAmIDB4M0YpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodWNzNCA+IDB4MTAwMDAgJiYgdWNzNCA8IDB4MTEwMDAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1Y3M0IC09IDB4MTAwMDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBvdXQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKCh1Y3M0ID4+PiAxMCkgfCAweEQ4MDApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoKHVjczQgJiAweDNGRikgfCAweERDMDApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0LnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSgweEZGRkQpKTtcbiAgICAgICAgICAgICsraTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvdXQuam9pbignJyk7XG4gICAgfVxuXG4gICAgc3RhdGljIF9jaGVja0NvbnRpbnVhdGlvbih1aW50OGFycmF5LCBzdGFydCwgY2hlY2tMZW5ndGgpIHtcbiAgICAgICAgbGV0IGFycmF5ID0gdWludDhhcnJheTtcbiAgICAgICAgaWYgKHN0YXJ0ICsgY2hlY2tMZW5ndGggPCBhcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHdoaWxlIChjaGVja0xlbmd0aC0tKSB7XG4gICAgICAgICAgICAgICAgaWYgKChhcnJheVsrK3N0YXJ0XSAmIDB4QzApICE9PSAweDgwKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVVRGODsiLCJleHBvcnQgZnVuY3Rpb24gZGVib3VuY2UgKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xuICAgIHZhciB0aW1lb3V0LCByZXN1bHQ7XG5cblxuICAgIHZhciBkZWJvdW5jZWQgPSBmdW5jdGlvbiAoYXJncykge1xuICAgICAgICBpZiAodGltZW91dCkgeyBjbGVhclRpbWVvdXQodGltZW91dCk7IH1cbiAgICAgICAgaWYgKGltbWVkaWF0ZSkge1xuICAgICAgICAgICAgdmFyIGNhbGxOb3cgPSAhdGltZW91dDtcbiAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmMsIHdhaXQpO1xuICAgICAgICAgICAgaWYgKGNhbGxOb3cpIHsgcmVzdWx0ID0gZnVuYygpOyB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jLCB3YWl0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxuICAgIGRlYm91bmNlZC5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgfTtcblxuICAgIHJldHVybiBkZWJvdW5jZWQ7XG5cbn1cblxuZXhwb3J0IGNvbnN0IGNhY2hlV3JhcHBlciA9IChmbikgPT4ge1xuXG4gICAgY29uc3QgY2FjaGUgPSB7fTtcbiAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgY29uc3Qga2V5ID0gYXJncy5yZWR1Y2UoKHByZSwgY3VyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYCR7cHJlfV8ke2N1cn1gO1xuICAgICAgICB9LCAnJyk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGZuKC4uLmFyZ3MpO1xuICAgICAgICBpZiAoY2FjaGVba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlW2tleV0gPSByZXN1bHQ7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgfTtcbn07IiwiY29uc3QgbGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcigyKTtcbiAgICAobmV3IERhdGFWaWV3KGJ1ZikpLnNldEludDE2KDAsIDI1NiwgdHJ1ZSkgLy8gbGl0dGxlLWVuZGlhbiB3cml0ZVxuICAgIHJldHVybiAobmV3IEludDE2QXJyYXkoYnVmKSlbMF0gPT09IDI1NiAvLyBwbGF0Zm9ybS1zcGVjIHJlYWQsIGlmIGVxdWFsIHRoZW4gTEVcbn0pKClcbmNvbnN0IHNuaWZmZXIgPSB7XG4gICAgZ2V0IGRldmljZSAoKSB7XG4gICAgICAgIGxldCByID0gc25pZmZlci5vcztcbiAgICAgICAgcmV0dXJuIHIuaXNQYyA/ICdwYycgOiByLmlzVGFibGV0ID8gJ3RhYmxldCcgOiAnbW9iaWxlJztcbiAgICB9LFxuICAgIGdldCBicm93c2VyICgpIHtcbiAgICAgICAgbGV0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBsZXQgcmVnID0ge1xuICAgICAgICAgICAgaWU6IC9ydjooW1xcZC5dKylcXCkgbGlrZSBnZWNrby8sXG4gICAgICAgICAgICBmaXJmb3g6IC9maXJlZm94XFwvKFtcXGQuXSspLyxcbiAgICAgICAgICAgIGNocm9tZTogL2Nocm9tZVxcLyhbXFxkLl0rKS8sXG4gICAgICAgICAgICBvcGVyYTogL29wZXJhLihbXFxkLl0rKS8sXG4gICAgICAgICAgICBzYWZhcmk6IC92ZXJzaW9uXFwvKFtcXGQuXSspLipzYWZhcmkvLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gW10uY29uY2F0KE9iamVjdC5rZXlzKHJlZykuZmlsdGVyKGtleSA9PiByZWdba2V5XS50ZXN0KHVhKSkpWzBdO1xuICAgIH0sXG4gICAgZ2V0IG9zICgpIHtcbiAgICAgICAgbGV0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudCxcbiAgICAgICAgICAgIGlzV2luZG93c1Bob25lID0gLyg/OldpbmRvd3MgUGhvbmUpLy50ZXN0KHVhKSxcbiAgICAgICAgICAgIGlzU3ltYmlhbiA9IC8oPzpTeW1iaWFuT1MpLy50ZXN0KHVhKSB8fCBpc1dpbmRvd3NQaG9uZSxcbiAgICAgICAgICAgIGlzQW5kcm9pZCA9IC8oPzpBbmRyb2lkKS8udGVzdCh1YSksXG4gICAgICAgICAgICBpc0ZpcmVGb3ggPSAvKD86RmlyZWZveCkvLnRlc3QodWEpLFxuICAgICAgICAgICAgaXNUYWJsZXQgPSAvKD86aVBhZHxQbGF5Qm9vaykvLnRlc3QodWEpIHx8IChpc0FuZHJvaWQgJiYgIS8oPzpNb2JpbGUpLy50ZXN0KHVhKSkgfHwgKGlzRmlyZUZveCAmJiAvKD86VGFibGV0KS8udGVzdCh1YSkpLFxuICAgICAgICAgICAgaXNQaG9uZSA9IC8oPzppUGhvbmUpLy50ZXN0KHVhKSAmJiAhaXNUYWJsZXQsXG4gICAgICAgICAgICBpc1BjID0gIWlzUGhvbmUgJiYgIWlzQW5kcm9pZCAmJiAhaXNTeW1iaWFuO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaXNUYWJsZXQsXG4gICAgICAgICAgICBpc1Bob25lLFxuICAgICAgICAgICAgaXNBbmRyb2lkLFxuICAgICAgICAgICAgaXNQYyxcbiAgICAgICAgICAgIGlzU3ltYmlhbixcbiAgICAgICAgICAgIGlzV2luZG93c1Bob25lLFxuICAgICAgICAgICAgaXNGaXJlRm94LFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgZ2V0IGlzTGUoKSB7XG4gICAgICAgIHJldHVybiBsZVxuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNuaWZmZXI7XG4iLCJpbXBvcnQgQ29uY2F0IGZyb20gJ2NvbmNhdC10eXBlZC1hcnJheSc7XG5pbXBvcnQgTG9nZ2VyIGZyb20gJy4uL3V0aWxzL0xvZyc7XG5jbGFzcyBCdWZmZXIge1xuICAgIGNvbnN0cnVjdG9yIChidWZmZXIpIHtcbiAgICAgICAgdGhpcy5idWZmZXIgPSBidWZmZXIgfHwgbmV3IFVpbnQ4QXJyYXkoMCk7XG4gICAgfVxuICAgIHdyaXRlICguLi5idWZmZXIpIHtcbiAgICAgICAgYnVmZmVyLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVyID0gQ29uY2F0KFVpbnQ4QXJyYXksIHRoaXMuYnVmZmVyLCBpdGVtKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIHdyaXRlVWludDMyICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAgICAgdmFsdWUgPj4gMjQsXG4gICAgICAgICAgICAodmFsdWUgPj4gMTYpICYgMHhmZixcbiAgICAgICAgICAgICh2YWx1ZSA+PiA4KSAmIDB4ZmYsXG4gICAgICAgICAgICB2YWx1ZSAmIDB4ZmYsXG4gICAgICAgIF0pO1xuICAgIH1cbiAgICBzdGF0aWMgcmVhZEFzSW50IChhcnIpIHtcbiAgICAgICAgbGV0IHRlbXAgPSAnJztcbiAgICAgICAgZnVuY3Rpb24gcGFkU3RhcnQ0SGV4IChoZXhOdW0pIHtcbiAgICAgICAgICAgIGxldCBoZXhTdHIgPSBoZXhOdW0udG9TdHJpbmcoMTYpO1xuICAgICAgICAgICAgcmV0dXJuIGhleFN0ci5wYWRTdGFydCgyLCAnMCcpO1xuICAgICAgICB9XG4gICAgICAgIGFyci5mb3JFYWNoKG51bSA9PiB7XG4gICAgICAgICAgICB0ZW1wICs9IHBhZFN0YXJ0NEhleChudW0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRlbXAsIDE2KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJ1ZmZlcjtcbiIsIihmdW5jdGlvbigpIHsgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3dbXCJQbGF5ZXJcIl07IH0oKSk7Il0sInNvdXJjZVJvb3QiOiIifQ==